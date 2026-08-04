# Extract Setswana headwords from the African Wordnet, glossed into English through
# the Open English Wordnet.
#
#   python toolkit/dict-extract-afwn.py
#
# Output (tracked): toolkit/dict-src/afwn.json
#
# ─────────────────────────────────────────────────────────────────────────────
# WHY TWO SOURCES, AND HOW THEY JOIN
#
# The African Wordnet (AfWN) groups Setswana words into synsets — sets of words
# that share one meaning. It was built on the "expand" model: the team took the
# Princeton Wordnet's meanings and attached Setswana words to them. So each AfWN
# synset carries an ILI number (Interlingual Index) naming the meaning, but the
# AfWN files contain NO English words at all.
#
# The Open English Wordnet (OEWN) carries the same ILI numbers together with the
# English words and definitions for each meaning. Joining the two on ILI is what
# turns "Setswana word → meaning-id" into "Setswana word → English words".
#
#   AfWN Setswana lemma ──sense──> AfWN synset ──ili──> OEWN synset ──> English
#
# Nothing here composes, conjugates or corrects any string. The Setswana comes
# verbatim from AfWN, the English verbatim from OEWN, and the pairing is AfWN's
# own claim, not ours.
#
# ⚠️ We use the 2017 AfWN release, NOT the 2022 one, and the reason is structural:
# the 2022 export replaced the ILI/Princeton ids with internal UUIDs and dropped
# every definition, so it cannot be joined to English at all. The 2017 file has
# 12 954 of 12 960 synsets carrying a real ILI. If a future AfWN release restores
# the ids, prefer it.
#
# ⚠️ LICENCE NOTE, READ BEFORE SHIPPING. The 2017 release's own Readme AND the
# `license=` attribute inside wntsn-lmf.xml both state CC BY 4.0. The SADiLaR
# catalogue page for that same item says CC BY-NC-SA 4.0. Two creator-authored
# statements against one catalogue field — but the discrepancy is real and is
# recorded in SOURCES.md. CC BY 4.0 is what the data itself declares.
#
# SOURCES
#   AfWN  African Wordnet, Setswana (2017). Bosch & Griesel. CC BY 4.0.
#         https://hdl.handle.net/20.500.12185/390
#   OEWN  Open English Wordnet 2025. CC BY 4.0.
#         https://github.com/globalwordnet/english-wordnet
# Both live in gitignored dictionaries/ and are re-fetchable — see SOURCES.md.

import gzip
import re
import sys
import collections
import xml.etree.ElementTree as ET
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from dict_common import DICTIONARIES, SRC_DIR, norm, write_json
from dict_lang import setswana_fraction, english_fraction

# utf-8 stdout: Setswana orthography carries ô/ê/š and the default Windows code
# page kills the run mid-write (same lesson as slice-lessons.py).
sys.stdout.reconfigure(encoding='utf-8')

AFWN = DICTIONARIES / 'afwn2017' / 'African Wordnet Setswana' / 'wntsn-lmf.xml'
OEWN = DICTIONARIES / 'oewn-2025.xml.gz'
OUT = SRC_DIR / 'afwn.json'

# AfWN uses Princeton's short codes; the bank uses its own set (dict_common).
POS_MAP = {'n': 'n', 'v': 'v', 'a': 'adj', 'r': 'adv', 's': 'adj'}

# How many English words one Setswana entry may carry. dict-build caps meanings at
# 6 anyway; capping here too keeps the ORDER meaningful — whatever we put first is
# what survives. A wordnet verb can otherwise drag in 70+ near-synonyms (senya had
# 72, from "bang up" to "burn down"), which reads as noise rather than a definition.
MAX_GLOSSES = 6
# Per synset, so one broad meaning cannot use up the whole budget on its own.
MAX_PER_SYNSET = 3


def load_oewn():
    """ili -> {'words': [...], 'defn': str, 'rank': int} from the Open English Wordnet.

    `rank` is how common the meaning is: wordnet lists a word's senses commonest
    first, and WN-LMF keeps that order, so a synset's rank is the best (lowest)
    position it holds among its own member words. Verified on the real file —
    "baby" runs sense 0 "a very young child" … sense 5 "a project of personal
    concern to someone".

    ⚠️ This is what stops an entry being defined by a figurative sense. Without it
    lesea ("baby") shipped glossed baby/babe/infant but *defined* as "a project of
    personal concern to someone", because both its synsets tied on every other
    signal and an arbitrary id decided it.
    """
    syn_ili, syn_def = {}, {}
    syn_words = collections.defaultdict(list)
    syn_rank = {}
    with gzip.open(OEWN, 'rb') as fh:
        for _, el in ET.iterparse(fh, events=('end',)):
            if el.tag == 'Synset':
                ili = (el.get('ili') or '').strip()
                if ili and ili != 'in':
                    syn_ili[el.get('id')] = ili
                    d = el.find('Definition')
                    if d is not None and (d.text or '').strip():
                        syn_def[el.get('id')] = ' '.join(d.text.split())
                el.clear()
            elif el.tag == 'LexicalEntry':
                lm = el.find('Lemma')
                if lm is not None:
                    w = lm.get('writtenForm')
                    for pos, se in enumerate(el.findall('Sense')):
                        sid = se.get('synset')
                        syn_words[sid].append(w)
                        syn_rank[sid] = min(syn_rank.get(sid, 99), pos)
                el.clear()
    out = {}
    for sid, ili in syn_ili.items():
        out[ili] = {'words': syn_words.get(sid, []), 'defn': syn_def.get(sid, ''),
                    'rank': syn_rank.get(sid, 99)}
    return out


BCS_RE = re.compile(r'BCS=(\d)')


def load_afwn():
    """AfWN synsets and lexical entries, straight off the XML."""
    lex = ET.parse(AFWN).getroot().find('Lexicon')
    syn = {}
    for s in lex.findall('Synset'):
        d = s.find('Definition')
        bcs = BCS_RE.search(s.get('note') or '')
        syn[s.get('id')] = {
            'ili': (s.get('ili') or '').strip(),
            'defn_tsn': ' '.join((d.text or '').split()) if d is not None else '',
            # Base Concept Set: 1 marks a core concept, 3 a peripheral one. AfWN's
            # own importance signal, and the only frequency-ish ranking in the file.
            'bcs': int(bcs.group(1)) if bcs else 9,
            'examples': [' '.join((x.text or '').split())
                         for x in s.findall('Example') if (x.text or '').strip()],
        }
    ents = []
    for e in lex.findall('LexicalEntry'):
        lm = e.find('Lemma')
        ents.append({
            'tsw': lm.get('writtenForm').strip(),
            'pos': lm.get('partOfSpeech'),
            'synsets': [se.get('synset') for se in e.findall('Sense')],
        })
    return syn, ents


def example_mentions(headword, sentence):
    """Does this sentence actually contain the headword, as a whole word?

    ⚠️ Load-bearing gate. AfWN attaches an example to the SYNSET, so the sentence
    illustrates whichever synonym its author picked — not necessarily our headword.
    Measured on the real file: 4 215 of 7 917 (word, example) pairs use a different
    word entirely, e.g. ditôpô ("demand") illustrated by a sentence whose only
    relevant word is ditlhokegô. Attaching those would put a sentence under a word
    that does not appear in it. Same family as the homonym guard in dict-build.py.

    ⚠️ Whole-token match, deliberately, and it must stay identical to the rule in
    verify-dict-bank.py — the ship gate re-checks every example the same way, so a
    looser rule here just fails the build later. A first pass accepted any token
    STARTING with the headword's stem, to allow for Setswana inflection; the gate
    caught it, because that also accepts genuinely different words: kata matched
    katakata, katisô matched katisa, kgoberô matched kgobera. Prefixes are not
    evidence of the same word. Losing an inflected example costs coverage; keeping
    a wrong one puts a sentence under a word that is not in it.
    """
    h = norm(headword).strip()
    if not h:
        return False
    toks = norm(sentence).split()
    if ' ' in h:
        return (' ' + ' '.join(toks) + ' ').find(' ' + h + ' ') >= 0
    return h in toks


def usable_gloss(word):
    """Would the ship gate accept this English meaning?

    Mirrors two checks in verify-dict-bank.py so failures surface here, where they
    can be dropped, instead of blocking the build:

    * one-letter meanings ("C" for carbon, "g" for gram) are OCR-debris shaped and
      the gate rejects everything but "I" and "a"; wordnet is full of chemical
      symbols and abbreviations.
    * the gate's Setswana-vs-English heuristic rejects a few real English phrases —
      "let go", "tee shirt", "turnover rate" — because go/tee/rate collide with
      Setswana words. Rather than weaken a check that guards the whole bank, drop
      the handful of glosses it dislikes. We cap at 6 anyway, so a synonym lost
      here costs nothing a reader would notice.
    """
    letters = re.sub(r'[^a-zA-Z]', '', word or '')
    if len(letters) < 2 and letters.lower() not in ('i', 'a'):
        return False
    if len(word.split()) >= 2 and setswana_fraction(word) - english_fraction(word) >= 0.5:
        return False
    return True


def main():
    for p in (AFWN, OEWN):
        if not p.exists():
            raise SystemExit(f'missing input: {p}\n  see toolkit/SOURCES.md to re-fetch')

    ili_en = load_oewn()
    print(f'OEWN  : {len(ili_en):,} meanings keyed by ILI')
    syn, ents = load_afwn()
    print(f'AfWN  : {len(ents):,} Setswana entries, {len(syn):,} synsets')

    out = []
    stats = collections.Counter()
    for e in ents:
        # Multiword AfWN lemmas are mostly wordnet paraphrases rather than fixed
        # expressions a learner would look up ("tshedisômelelwane e e lola"), and
        # the app's own phrase cards already cover the real ones. Single words only.
        if ' ' in e['tsw']:
            stats['skip_multiword'] += 1
            continue

        # Rank a word's meanings before spending the gloss budget, commonest first,
        # because whatever leads becomes the entry's definition and survives the cap:
        #   1. English sense rank — wordnet's own commonest-first ordering, the only
        #      real frequency signal available, and the one that keeps a figurative
        #      sense from defining the word.
        #   2. AfWN's Base Concept marker (1 = core concept, 3 = peripheral).
        #   3. Whether AfWN hand-wrote a Setswana definition — a sign the team
        #      worked this meaning properly rather than bulk-linking it.
        #   4. Richer synsets first: more synonyms usually means a better-established
        #      meaning than a one-word synset.
        #   5. Synset id, purely so ties break the same way on every run — the
        #      PYTHONHASHSEED lesson from the 2026-08-04 review.
        rows = [(sid, syn[sid]) for sid in e['synsets'] if sid in syn]
        rows.sort(key=lambda r: (
            ili_en.get(r[1]['ili'], {}).get('rank', 99),
            r[1]['bcs'],
            0 if r[1]['defn_tsn'] else 1,
            -len(ili_en.get(r[1]['ili'], {}).get('words', [])),
            r[0],
        ))

        glosses, seen, defn, tsn_defn, examples = [], set(), '', '', []
        for rank, (sid, s) in enumerate(rows):
            en = ili_en.get(s['ili']) if s['ili'].startswith('i') else None
            if s['defn_tsn'] and not tsn_defn:
                tsn_defn = s['defn_tsn']
            # ⚠️ Examples come ONLY from the best-ranked meaning — the one whose
            # definition the entry carries. AfWN attaches examples per synset, so a
            # word's other senses have their own sentences, and pooling them puts a
            # sentence under a definition it does not illustrate. lesea shipped
            # defined as "a very young child" beside "Go tlhatswa diaparô tsa bana
            # ba sekolo ke lesea la gagwe" — the *figurative* baby, a different
            # sense entirely. Containment cannot catch that: the word really is
            # there. Same principle as dict-build's homonym guard — with nothing to
            # check the sense against, show no example rather than a misleading one.
            if rank == 0:
                for x in s['examples']:
                    if example_mentions(e['tsw'], x) and x not in examples:
                        examples.append(x)
            if not en:
                continue
            took = 0
            for w in en['words']:
                if took >= MAX_PER_SYNSET or len(glosses) >= MAX_GLOSSES:
                    break
                if norm(w) not in seen and usable_gloss(w):
                    seen.add(norm(w))
                    glosses.append(w)
                    took += 1
            # The English definition of the best-ranked meaning that actually
            # contributed a word — this is what disambiguates a gloss list like
            # "seed, salt, disperse" down to the sense AfWN meant.
            if took and not defn:
                defn = en['defn']

        if not glosses:
            stats['skip_no_english'] += 1
            continue

        stats['kept'] += 1
        if examples:
            stats['kept_with_example'] += 1
        out.append({
            'tsw': e['tsw'],
            'eng': glosses,
            'pos': POS_MAP.get(e['pos']),
            'cls': None,
            # English definition reads as a usable dictionary line for a learner;
            # the Setswana one is kept behind it for the day she can read it.
            'note': defn or tsn_defn,
            'examples_tsn': examples[:2],
            'src': ['afwn'],
            # NOT human-checked: these are wordnet-derived, not vetted by Megan or
            # by the course. k stays 0 so the panel labels them honestly and the
            # search can rank her checked words first.
            'chk': False,
        })

    out.sort(key=lambda r: (norm(r['tsw']), r['tsw']))
    write_json(OUT, out)
    print(f"afwn  : {stats['kept']:,} records "
          f"({stats['kept_with_example']:,} with a gated Setswana example) -> {OUT.name}")
    print(f"        skipped {stats['skip_multiword']:,} multiword, "
          f"{stats['skip_no_english']:,} with no English join")


if __name__ == '__main__':
    main()
