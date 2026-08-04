# Find a real example sentence for each dictionary headword.
#
#   python toolkit/dict-mine-examples.py
#
# Reads toolkit/dict-src/{app,wikt,pc}.json, writes toolkit/dict-src/examples.json
#   { "<normalised headword>": [ {t, e, src}, ... ] }
#
# THE POINT (Megan, 2026-08-04): she knew ema = "stand" and still could not tell
# whether "Ga ke batle ema" was right. A gloss alone does not teach usage; seeing
# the word inside a real sentence does.
#
# Priority, best register first:
#   1. sentence-bank.tsv  — course sentences, already human-checked
#   2. content.js phrases — the app's own cards (many voiced)
#   3. Peace Corps phrases — course register, from the course text
#   4. Wiktionary {{ux}}  — editor-written, translation included
#   5. Autshumato        — 159k professionally translated sentence pairs, modern
#                          register, genuinely line-aligned (CC BY 2.5 ZA)
#   6. Tswana NT          — archaic register and unproven alignment, so it fills
#                          gaps last and only under the corroboration rule below
#
# ⚠️ THE ALIGNMENT TRAP. corpus/bible-tsn and corpus/bible-eng look line-aligned,
# and are not: only 97 of 261 chapter files even have equal line counts, because
# the Setswana Living NT merges and splits verses. Pairing by line number would
# have printed confident English translations under unrelated Setswana sentences —
# the worst possible failure for a learner, who cannot spot it.
#
# So a Bible pair is only used when it CORROBORATES ITSELF: the Setswana line
# contains the headword AND the aligned English line contains that headword's own
# English meaning. Both halves have to agree before the example ships, which
# simultaneously proves the alignment held for this line and proves the sentence
# actually demonstrates the sense we are claiming.

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from dict_common import (ROOT, SRC_DIR, CORPUS, norm, sentence_ok, write_json,
                         STOP, SENSE_MIN_LEN, GUARD_MIN_LEN, sense_words)

MAX_PER_ENTRY = 3
# At most one NT verse per entry: it is the only source whose English side is not
# either human-checked or editor-written, and it is the only archaic register in
# the bank. Course sentences always come first, so a verse only ever appears where
# the course has nothing to show.
MAX_BIBLE_PER_ENTRY = 1
FRONT_MATTER = '_000_000_000_read.txt'



def tokens(s):
    return norm(s).split()


def stem_match(a, b):
    """Loose English stem comparison: 'stand' ~ 'stands'/'standing'."""
    if len(a) < 3 or len(b) < 3:
        return a == b
    n = max(3, min(len(a), len(b)) - 2)
    return a[:n] == b[:n]


# "go ja" is the infinitive of the headword, not a demonstration of it. Anything
# that is just the infinitive particle plus the word teaches nothing a learner
# reading the headword does not already have.
def is_bare_infinitive(text, head_key):
    return norm(text) in (head_key, 'go ' + head_key)


# Leftover editing marks and instructions in the corpus ("Translate)", "(sic)").
JUNK = re.compile(r'\bTranslate\b|\bsic\b|\.\.\.|_{2,}|\|', re.I)


def looks_like_sentence(t):
    """Starts like a sentence and ends with terminal punctuation."""
    t = (t or '').strip()
    return bool(t) and t[:1].isupper() and t[-1:] in '.!?'

# Setswana common nouns double as surnames — moloi is "witch", Moloi is a person.
# Left alone, the miner illustrated moloi with three sentences about a farmer.
def proper_noun_use(tsw_line, eng_line, form):
    """True when this sentence uses the headword as a name, not as the word."""
    # Carried through untranslated: "Samuel Moloi was born…" still says Moloi.
    if re.search(r'\b' + re.escape(form) + r'\b', norm(eng_line)):
        return True
    # Capitalised mid-sentence in the Setswana: a name, not the noun.
    for m in re.finditer(r'\b\w+\b', tsw_line):
        if norm(m.group(0)) != form:
            continue
        if m.group(0)[:1].isupper() and m.start() > 0:
            return True
    return False


# ------------------------------------------------------------------ course pools

def load_sentence_bank():
    path = ROOT / 'toolkit' / 'sentence-bank.tsv'
    out = []
    if not path.exists():
        return out
    for i, line in enumerate(path.read_text(encoding='utf-8').splitlines()):
        if i == 0 or not line.strip():
            continue
        cols = line.split('\t')
        if len(cols) < 2:
            continue
        t, e = cols[0].strip(), cols[1].strip()
        if t and e and sentence_ok(t):
            out.append({'t': t, 'e': e, 'src': 'app'})
    return out


def load_phrase_pool(records, src_tag):
    out = []
    for r in records:
        t = r['tsw']
        if len(t.split()) < 2 or not sentence_ok(t):
            continue
        out.append({'t': t, 'e': r['eng'][0], 'src': src_tag})
    return out


# ------------------------------------------------------------------- autshumato

AUTS_DIR = (CORPUS / 'autshumato' / 'Autshumato English-Setswana Parallel Corpora')
AUTS_SETS = ('Translated', 'ReliableSources', 'Other')


def load_autshumato():
    """Professionally translated sentence pairs, one sentence per line.

    Unlike the two Bibles this really is aligned — all three sets have identical
    line counts on both sides (31 376 / 54 431 / 73 193, checked 2026-08-04) and
    the corpus is distributed as an aligned parallel corpus. So corroboration is
    a quality preference here, not the safety net it has to be for the NT.
    """
    pairs = []
    if not AUTS_DIR.exists():
        return pairs
    for s in AUTS_SETS:
        tn = AUTS_DIR / f'Corpus.DACB3.BilingualData_{s}.2.0.0.tn.txt'
        en = AUTS_DIR / f'Corpus.DACB3.BilingualData_{s}.2.0.0.en.txt'
        if not tn.exists() or not en.exists():
            continue
        a = tn.read_text(encoding='utf-8', errors='replace').splitlines()
        b = en.read_text(encoding='utf-8', errors='replace').splitlines()
        if len(a) != len(b):
            print(f'  ! autshumato {s}: line counts differ ({len(a)}/{len(b)}) — set skipped')
            continue
        for ta, tb in zip(a, b):
            ta, tb = detokenise(ta), detokenise(tb)
            if not ta or not tb or ta.isupper() or tb.isupper():
                continue                      # ALL-CAPS lines are document headings
            if not sentence_ok(ta) or len(tb.split()) > 20:
                continue
            pairs.append((ta, tb))
    return pairs


# The corpus is tokenised — punctuation is spaced off ("lona ." / "to :"). Closing
# it up changes no word in either language; it just makes the sentence readable.
def detokenise(s):
    s = re.sub(r'\s+([,.;:!?])', r'\1', (s or '').strip())
    s = re.sub(r'\(\s+', '(', s)
    s = re.sub(r'\s+\)', ')', s)
    return re.sub(r'\s{2,}', ' ', s)


# -------------------------------------------------------------------- the bible

def load_bible():
    """Chapter files whose two languages have the same number of lines.

    The equal-count test is a cheap first gate, not the guarantee — per-line
    corroboration below is what actually protects the translations.
    """
    tsn_dir, eng_dir = CORPUS / 'bible-tsn', CORPUS / 'bible-eng'
    pairs = []
    if not tsn_dir.exists() or not eng_dir.exists():
        return pairs
    for f in sorted(tsn_dir.glob('tsn_*_read.txt')):
        if f.name.endswith(FRONT_MATTER):
            continue
        g = eng_dir / ('engwebp_' + f.name[len('tsn_'):])
        if not g.exists():
            continue
        a = f.read_text(encoding='utf-8', errors='replace').splitlines()
        b = g.read_text(encoding='utf-8', errors='replace').splitlines()
        if len(a) != len(b):
            continue
        for ta, tb in zip(a, b):
            ta, tb = ta.strip(), tb.strip()
            if ta and tb:
                pairs.append((ta, tb))
    return pairs


def bible_index(pairs):
    idx = {}
    for i, (ta, _tb) in enumerate(pairs):
        for w in set(tokens(ta)):
            idx.setdefault(w, []).append(i)
    return idx


def main():
    srcs = {}
    for name in ('app', 'wikt', 'pc'):
        p = SRC_DIR / (name + '.json')
        srcs[name] = json.load(open(p, encoding='utf-8')) if p.exists() else []

    course_pool = (load_sentence_bank()
                   + load_phrase_pool(srcs['app'], 'app')
                   + load_phrase_pool(srcs['pc'], 'pc'))
    # index the course pool by the words each sentence contains
    course_idx = {}
    for j, ex in enumerate(course_pool):
        for w in set(tokens(ex['t'])):
            course_idx.setdefault(w, []).append(j)

    wikt_ex = {}
    for r in srcs['wikt']:
        for ex in r.get('ex') or []:
            wikt_ex.setdefault(norm(r['tsw']), []).append(ex)

    auts = load_autshumato()
    a_idx = bible_index(auts)
    bible = load_bible()
    b_idx = bible_index(bible)
    print(f'pools: course {len(course_pool)} sentences · wiktionary '
          f'{sum(len(v) for v in wikt_ex.values())} · autshumato {len(auts)} pairs '
          f'({len(a_idx)} distinct words) · bible {len(bible)} usable lines '
          f'({len(b_idx)} distinct words)')

    # every headword, with its meanings and any past-tense form the course recorded
    heads = {}
    for name in ('app', 'wikt', 'pc'):
        for r in srcs[name]:
            k = norm(r['tsw'])
            if not k:
                continue
            h = heads.setdefault(k, {'tsw': r['tsw'], 'eng': [], 'forms': {k}})
            h['eng'] += [m for m in r['eng'] if m not in h['eng']]
            m = re.match(r'past tense: (.+)$', r.get('note') or '')
            if m and norm(m.group(1)):
                h['forms'].add(norm(m.group(1)))     # sourced form, not a guess

    out, counts = {}, {'app': 0, 'pc': 0, 'wikt': 0, 'bible-nt': 0}
    for key, h in heads.items():
        picked, seen = [], set()

        def take(ex, tag):
            t = ex['t'].strip()
            if norm(t) in seen or is_bare_infinitive(t, key):
                return False
            seen.add(norm(t))
            picked.append({'t': t, 'e': ex['e'].strip(), 'src': tag})
            counts[tag] = counts.get(tag, 0) + 1
            return True

        senses = sense_words(h['eng'], GUARD_MIN_LEN)

        # ⚠️ THE HOMONYM GUARD, and it applies to EVERY pool including the
        # human-checked course sentences. Matching is by word, so a headword whose
        # meanings are all stopwords ("I", "me", "you") gives us nothing to check
        # relevance against: nna is both the pronoun "I/me" and the verb "to stay",
        # and the course's own checked sentence "O nna kae?" ("Where do you live?")
        # was being offered as an example of the pronoun. The sentence is correct;
        # it is simply a different word. Those entries get no mined example — for a
        # learner who cannot spot the difference, nothing beats misleading.
        if not senses:
            if picked:
                out[key] = picked
            continue

        # 1-3. course register, shortest first
        cands = []
        for form in h['forms']:
            for j in course_idx.get(form, []):
                cands.append(course_pool[j])
        for ex in sorted(cands, key=lambda e: len(e['t'])):
            if len(picked) >= MAX_PER_ENTRY:
                break
            take(ex, ex['src'])

        # 4. wiktionary usage examples
        for ex in wikt_ex.get(key, []):
            if len(picked) >= MAX_PER_ENTRY:
                break
            take(ex, 'wikt')

        # 5. Autshumato. Alignment is sound, so corroborated sentences are taken
        # first and uncorroborated ones only top up — a sentence whose English
        # visibly contains the meaning teaches the word better than one that
        # merely contains it.
        #
        # ⚠️ Unless we cannot check relevance at all. When every meaning is a
        # stopword ("I", "me", "you"), `senses` is empty, nothing can corroborate,
        # and an uncorroborated hit is a coin flip on homonyms: nna is both the
        # pronoun "I/me" and the verb "to stay", and the miner illustrated the
        # pronoun with "O nna kae?" — "Where do you live?", the wrong word
        # entirely. No example beats a misleading one, so these entries take
        # course sentences only.
        if len(picked) < MAX_PER_ENTRY and auts and senses:
            hits = []
            for form in h['forms']:
                hits += a_idx.get(form, [])
            ranked = []
            for i in set(hits):
                ta, tb = auts[i]
                if JUNK.search(ta) or JUNK.search(tb):
                    continue
                if any(proper_noun_use(ta, tb, f) for f in h['forms']):
                    continue
                corro = any(stem_match(s, t) for s in senses for t in tokens(tb))
                # A whole sentence shows the word doing its job; a term-list
                # fragment ("saense ya botho") just repeats the gloss.
                ranked.append((0 if corro else 1, 0 if looks_like_sentence(ta) else 1,
                               len(ta), i))
            for _c, _s, _l, i in sorted(ranked)[:MAX_PER_ENTRY * 2]:
                if len(picked) >= MAX_PER_ENTRY:
                    break
                take({'t': auts[i][0], 'e': auts[i][1]}, 'autshumato')

        # 6. the NT — only where the pair corroborates itself (see header).
        # Uses the STRICTER measured threshold: here corroboration is the only
        # thing standing between a learner and a confidently wrong translation,
        # so a generic three-letter overlap is not good enough.
        senses_nt = sense_words(h['eng'], SENSE_MIN_LEN)
        if len(picked) < MAX_PER_ENTRY and bible and senses_nt:
            hits = []
            for form in h['forms']:
                hits += b_idx.get(form, [])
            taken_bible = 0
            for i in sorted(set(hits), key=lambda i: len(bible[i][0])):
                if len(picked) >= MAX_PER_ENTRY or taken_bible >= MAX_BIBLE_PER_ENTRY:
                    break
                ta, tb = bible[i]
                if not sentence_ok(ta, max_words=16):
                    continue
                etoks = tokens(tb)
                if not any(stem_match(s, t) for s in senses_nt for t in etoks):
                    continue                  # alignment unproven — skip it
                if take({'t': ta, 'e': tb}, 'bible-nt'):
                    taken_bible += 1
        if picked:
            out[key] = picked

    write_json(SRC_DIR / 'examples.json', out)
    total = sum(len(v) for v in out.values())
    print(f'headwords {len(heads)} · with at least one example {len(out)} '
          f'({100 * len(out) // max(1, len(heads))}%) · {total} examples')
    print('  by source:', ', '.join(f'{k}={v}' for k, v in counts.items() if v))


if __name__ == '__main__':
    main()
