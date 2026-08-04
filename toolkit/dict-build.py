# Merge the extracted sources + mined examples into the shipped dict-bank.js.
#
#   python toolkit/dict-extract-sources.py
#   python toolkit/dict-mine-examples.py
#   python toolkit/dict-build.py
#   python toolkit/verify-dict-bank.py     <- ship gate, must pass
#
# One entry per (headword, part of speech). Meanings from every source that has
# the word are merged, best-checked first, and each entry records which sources it
# came from so the panel can show provenance and Megan can judge an entry she
# doubts. Nothing here writes Setswana that no source contains.

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from dict_common import ROOT, SRC_DIR, norm, sense_words, GUARD_MIN_LEN

OUT = ROOT / 'dict-bank.js'
# best-checked first; drives spelling + meaning order. afwn is last on purpose: it
# is wordnet-derived and unchecked, so where it meets a word the course already
# teaches, the course's spelling and its meanings lead.
SOURCE_ORDER = ['app', 'pc', 'wikt', 'afwn']

HEADER = """// Re:Lefela — dictionary bank (SPEC-dictionary-panel.md). GENERATED FILE.
// ─────────────────────────────────────────────────────────────────────────────
// Do not hand-edit: rebuild with
//   python toolkit/dict-extract-sources.py && python toolkit/dict-mine-examples.py
//   && python toolkit/dict-build.py && python toolkit/verify-dict-bank.py
//
// PROVENANCE (same bar as content.js — NO unsourced Setswana). Every headword,
// meaning and example is copied verbatim from a named open source:
//   app   Re:Lefela's own course cards + sentence bank — human-checked (chk:true)
//   pc    Peace Corps "Introduction to Setswana" — US government work, public domain
//   wikt  English Wiktionary Tswana lemmas — CC BY-SA 4.0
//   autshumato  Autshumato English-Setswana Parallel Corpora — CC BY 2.5 ZA
//   bible-nt    Tswana Living New Testament (Biblica) — CC BY-SA 4.0
//   afwn        African Wordnet, Setswana (Bosch & Griesel 2017) — CC BY 4.0, with
//               its English glosses joined in from the Open English Wordnet 2025
//               (CC BY 4.0) on the shared ILI meaning ids. NOT human-checked.
// The commercial desk dictionaries in dictionaries/ are NEVER bulk-imported: they
// are consulted one entry at a time to fill gaps she actually hits, and those
// entries arrive tagged src:['desk'] chk:true. dictionaries/ is gitignored.
//
// Entry shape: { t: headword (Setswana), e: [meanings], p: part of speech|null,
// c: noun class|null, n: usage note|'', f: [alternate forms a source recorded],
// x: [{t, e, s}] examples (s = source tag),
// s: [source tags], k: 1 when a human has checked the entry, a: audio file|null }
// Field names are short because this file is precached on her phone.
// ─────────────────────────────────────────────────────────────────────────────
"""


def load(name):
    p = SRC_DIR / (name + '.json')
    return json.load(open(p, encoding='utf-8')) if p.exists() else []


MAX_EXAMPLES = 3


def build_examples(key, grp, meanings, examples):
    """Examples for one entry: mined bilingual ones first, then AfWN's Setswana-only.

    Mined examples lead because they carry an English translation, which is what
    Megan said helped most. AfWN's only fill the remaining slots.

    Two different gates, deliberately, because the two sources fail differently:

    * Mined examples were matched on ENGLISH relevance, so they inherit the homonym
      problem — hence sense_words(), re-applied per entry (nna the pronoun must not
      borrow nna the verb's sentences).
    * AfWN examples were gated at extraction on the Setswana sentence actually
      containing the headword, and they ride with a record whose part of speech
      already put it in this group. They carry no English, so `e` is omitted and
      the panel renders the Setswana line alone.
    """
    out = []
    if sense_words(meanings, GUARD_MIN_LEN):
        out += [{'t': x['t'], 'e': x['e'], 's': x['src']}
                for x in examples.get(key, [])[:MAX_EXAMPLES]]
    if len(out) < MAX_EXAMPLES:
        have = {norm(x['t']) for x in out}
        for r in grp:
            for sent in r.get('examples_tsn') or []:
                if len(out) >= MAX_EXAMPLES or norm(sent) in have:
                    continue
                have.add(norm(sent))
                out.append({'t': sent, 's': r['_src']})
    return out


def main():
    records = []
    for name in SOURCE_ORDER:
        for r in load(name):
            r['_src'] = name
            records.append(r)
    examples = json.load(open(SRC_DIR / 'examples.json', encoding='utf-8'))

    buckets = {}
    for r in records:
        k = norm(r['tsw'])
        if k:
            buckets.setdefault(k, []).append(r)

    entries = []
    for key, rows in sorted(buckets.items()):
        # ⚠️ Determinism is load-bearing here, caught in code review 2026-08-04:
        # `{r.get('pos') ...}` is a set, and Python randomises string hashing per
        # process, so iteration order — and therefore which group won the spare-
        # merge tie below — depended on PYTHONHASHSEED. The same inputs shipped
        # rona's "We/us" row attached to the pronoun on one run and to the noun
        # on another, with different provenance lists, and the ship gate passed
        # both. sorted() everywhere + an explicit alphabetical tie-break makes
        # the build a pure function of its inputs.
        known = sorted(p for p in {r.get('pos') for r in rows} if p)
        groups = {}
        if len(known) <= 1:
            groups[known[0] if known else None] = rows
        else:
            for p in known:
                groups[p] = [r for r in rows if r.get('pos') == p]
            # records whose source did not record a part of speech ride with the
            # best-attested reading rather than inventing a second entry
            spare = [r for r in rows if not r.get('pos')]
            if spare:
                target = sorted(groups, key=lambda p: (-len(groups[p]), p or ''))[0]
                groups[target] += spare

        for pos, grp in groups.items():
            grp.sort(key=lambda r: SOURCE_ORDER.index(r['_src']))
            meanings, seen = [], set()
            for r in grp:
                for m in r['eng']:
                    m = m.strip()
                    if m and norm(m) not in seen:
                        seen.add(norm(m))
                        meanings.append(m)
            if not meanings:
                continue
            note = next((r['note'] for r in grp if r.get('note')), '')
            # Alternate forms a source actually recorded (the Peace Corps course
            # lists each verb's past tense). Shipped so search finds "tsene" ->
            # "tsêna", and so the ship gate knows an example using the past tense
            # really does contain the headword. Never a guessed conjugation.
            #
            # Collected across the WHOLE headword, not just this part-of-speech
            # group: an alternate form belongs to the word. Reading it per group
            # dropped Reetsa's "reeditse" into a different group than the example
            # that used it, and the ship gate failed the build (2026-08-04).
            forms = []
            for r in rows:
                fm = re.match(r'past tense: (.+)$', r.get('note') or '')
                if fm and norm(fm.group(1)) and norm(fm.group(1)) != key:
                    if fm.group(1).strip() not in forms:
                        forms.append(fm.group(1).strip())
            cls = next((r['cls'] for r in grp if r.get('cls')), None)
            audio = next((r.get('audio') for r in grp if r.get('audio')), None)
            entries.append({
                't': grp[0]['tsw'],                       # best-checked spelling
                'e': meanings[:6],
                'p': pos,
                'c': cls,
                'n': note,
                # ⚠️ The homonym guard again, re-applied per ENTRY. The miner works
                # per headword, pooling the meanings of every part of speech, but a
                # headword can split into two entries here — nna is the pronoun
                # "I/me" AND the verb "Live". Mining saw "Live", found relevant
                # sentences, and both entries inherited them, so the pronoun was
                # illustrated with "O nna kae?" ("Where do you live?"). Judge each
                # entry on its OWN meanings: if there is nothing to check relevance
                # against, that entry shows no example.
                'x': build_examples(key, grp, meanings, examples),
                'f': forms,
                's': sorted({r['_src'] for r in grp}),
                'k': 1 if any(r.get('chk') for r in grp) else 0,
                'a': audio,
            })

    # drop empty fields so the precached file stays small
    slim = []
    for e in entries:
        slim.append({k: v for k, v in e.items() if v not in (None, '', [], 0)})

    body = ',\n'.join(json.dumps(e, ensure_ascii=False, sort_keys=True) for e in slim)
    OUT.write_text(HEADER + 'const RL_DICT = [\n' + body + '\n];\n',
                   encoding='utf-8', newline='\n')

    withex = sum(1 for e in entries if e['x'])
    checked = sum(1 for e in entries if e['k'])
    print(f'{len(entries)} entries -> {OUT.name} ({OUT.stat().st_size/1024:.0f} kB)')
    print(f'  {withex} with an example ({100*withex//max(1,len(entries))}%) · '
          f'{checked} human-checked · '
          f'{sum(len(e["x"]) for e in entries)} examples total')


if __name__ == '__main__':
    main()
