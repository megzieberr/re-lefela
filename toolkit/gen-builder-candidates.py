# ============================================================================
#   DRAFTS ONLY — NOTHING HERE SHIPS TO builder-bank.js UNCHECKED.
#
#   This script mechanically glues existing content.js pieces (concords,
#   verb stems, nouns) into candidate Setswana sentences using a handful of
#   attested SENTENCE FRAMES (SPEC-sentence-builder.md §2 step 1). It has no
#   grammar knowledge beyond "paste these strings together in this order" —
#   a candidate can be well-formed nonsense, mis-conjugated, or simply not
#   idiomatic Setswana. That is expected.
#
#   Every candidate MUST be checked by a human against toolkit/GRAMMAR.md,
#   toolkit/sentence-bank.tsv and the Peace Corps corpus (corpus/) — same
#   "no unsourced Setswana" bar as content.js itself — before it is
#   hand-copied into builder-bank.js. toolkit/verify-builder-bank.py then
#   cross-checks the shipped entries' shape, not their grammar.
# ============================================================================
#
#   python toolkit/gen-builder-candidates.py [--out toolkit/candidates.tsv]
#
# Reads content.js and combines pieces using ONLY these attested frames
# (one function per frame, kept dumb and transparent on purpose):
#
#   a) concord + 'a' + verb-stem, for concords ke/o/re/ba
#        e.g. verb u1l6-01 'go ja' -> stem 'ja' -> 'Ke a ja'
#   b) 'Ke batla' + noun                          -> 'Ke batla buka'
#   c) 'Ga ke na' + noun                          -> 'Ga ke na buka'
#   d) 'Ke na le' + noun                          -> 'Ke na le buka'
#   e) 'A o na le' + noun + '?'                   -> 'A o na le buka?'
#
# Nouns are drawn from content.js items with kind:'word' that carry a cls
# field (noun-class field — its presence is what marks an item as a real
# countable noun rather than a plain vocab word like a greeting).
#
# Each output row (tab-separated):
#   candidate sentence <TAB> gloss-guess <TAB> content ids used <TAB> frame name
#
# The gloss-guess is NOT a translation — it's a dumb concatenation of the
# pieces' own `eng` fields, so a human reviewer can see exactly what was
# glued together without re-deriving it. Treat it as a hint, not an answer.

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / 'content.js'

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

BANNER = (
    "=" * 78 + "\n"
    "DRAFT OUTPUT ONLY. These are mechanically-glued candidate sentences, not\n"
    "checked Setswana. A human MUST verify each one against GRAMMAR.md /\n"
    "sentence-bank.tsv / the corpus before it is copied into builder-bank.js.\n"
    "Never paste a row from this script straight into the shipped bank.\n"
    + "=" * 78
)

# Subject-concord -> rough English gloss for the pieces this script assembles.
# This is a fixed, hand-checked mapping of grammar markers (SPEC-sentence-
# builder.md §2), not something read out of content.js — the same "concords
# are compulsory little words" rule as content.js's own u1l4-00 rule card.
CONCORD_GLOSS = {
    'Ke': 'I',
    'O': 'you/he-she',
    'Re': 'we',
    'Ba': 'they',
}


def _block_at(src, brace_pos):
    """Slice the balanced {...} starting at brace_pos, ignoring braces inside strings.

    Same depth-count approach as missing-audio.py / verify-builder-bank.py —
    content.js items can nest (concordSlot is an object), so a naive
    [^{}]* regex would silently truncate any entry that has one.
    """
    depth, i, quote = 0, brace_pos, None
    while i < len(src):
        c = src[i]
        if quote:
            if c == '\\':
                i += 2
                continue
            if c == quote:
                quote = None
        elif c in '"\'':
            quote = c
        elif c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return src[brace_pos:i + 1]
        i += 1
    return src[brace_pos:]


def parse_content():
    """Return (verbs, nouns) — lists of {id, tsw, eng} dicts.

    verbs: kind:'verb' items, tsw like 'go ja'.
    nouns: kind:'word' items that carry a cls field (real countable nouns).
    """
    src = CONTENT.read_text(encoding='utf-8')
    verbs, nouns = [], []
    for im in re.finditer(r"\{\s*id:\s*'(u\d+l\d+-\d+)'", src):
        blk = _block_at(src, im.start())
        kind_m = re.search(r"kind:\s*'([^']*)'", blk)
        tsw_m = re.search(r"tsw:\s*'((?:[^'\\]|\\.)*)'", blk)
        eng_m = re.search(r"eng:\s*'((?:[^'\\]|\\.)*)'", blk)
        if not kind_m or not tsw_m or not tsw_m.group(1):
            continue
        kind = kind_m.group(1)
        item = {
            'id': im.group(1),
            'tsw': tsw_m.group(1).replace("\\'", "'"),
            'eng': eng_m.group(1).replace("\\'", "'") if eng_m else '',
        }
        if kind == 'verb' and item['tsw'].startswith('go '):
            verbs.append(item)
        elif kind == 'word' and re.search(r"cls:\s*\d+", blk):
            nouns.append(item)
    return verbs, nouns


def frame_concord_a_verb(verbs):
    """a) concord + 'a' + verb-stem, for concords ke/o/re/ba."""
    rows = []
    for v in verbs:
        stem = v['tsw'][len('go '):]
        for concord, subj_gloss in CONCORD_GLOSS.items():
            sentence = f'{concord} a {stem}'
            gloss = f"{subj_gloss} + {v['eng']}"
            rows.append((sentence, gloss, [v['id']], 'concord-a-verb'))
    return rows


def frame_ke_batla_noun(nouns):
    """b) 'Ke batla' + noun."""
    rows = []
    for n in nouns:
        sentence = f"Ke batla {n['tsw']}"
        gloss = f"I want + {n['eng']}"
        rows.append((sentence, gloss, [n['id']], 'ke-batla-noun'))
    return rows


def frame_ga_ke_na_noun(nouns):
    """c) 'Ga ke na' + noun."""
    rows = []
    for n in nouns:
        sentence = f"Ga ke na {n['tsw']}"
        gloss = f"I don't have + {n['eng']}"
        rows.append((sentence, gloss, [n['id']], 'ga-ke-na-noun'))
    return rows


def frame_ke_na_le_noun(nouns):
    """d) 'Ke na le' + noun."""
    rows = []
    for n in nouns:
        sentence = f"Ke na le {n['tsw']}"
        gloss = f"I have + {n['eng']}"
        rows.append((sentence, gloss, [n['id']], 'ke-na-le-noun'))
    return rows


def frame_a_o_na_le_noun(nouns):
    """e) 'A o na le' + noun + '?'."""
    rows = []
    for n in nouns:
        sentence = f"A o na le {n['tsw']}?"
        gloss = f"Do you have + {n['eng']}?"
        rows.append((sentence, gloss, [n['id']], 'a-o-na-le-noun'))
    return rows


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--out', type=Path, default=None,
                     help='optional path to also write the TSV rows to (clean, no banner)')
    args = ap.parse_args()

    verbs, nouns = parse_content()

    rows = []
    rows += frame_concord_a_verb(verbs)
    rows += frame_ke_batla_noun(nouns)
    rows += frame_ga_ke_na_noun(nouns)
    rows += frame_ke_na_le_noun(nouns)
    rows += frame_a_o_na_le_noun(nouns)

    print(BANNER)
    print(f'{len(verbs)} verb items, {len(nouns)} noun items found in content.js — '
          f'{len(rows)} draft candidates generated.\n')

    tsv_lines = []
    for sentence, gloss, ids, frame in rows:
        line = f"{sentence}\t{gloss}\t{','.join(ids)}\t{frame}"
        tsv_lines.append(line)
        print(line)

    if args.out:
        # Path.write_text() translates '\n' -> os.linesep on Windows (CRLF),
        # which this repo has been bitten by before (builder-bank.js/content.js
        # must stay LF-only). Use open() with an explicit newline='\n' instead
        # so no translation happens, regardless of platform.
        with open(args.out, 'w', encoding='utf-8', newline='\n') as f:
            f.write('\n'.join(tsv_lines) + '\n')
        print(f'\nwrote {len(tsv_lines)} rows to {args.out}', file=sys.stderr)


if __name__ == '__main__':
    main()
