# Autshumato parallel-corpus lookup for Re:Lefela.
# The Bible corpus (see SOURCES.md "Usage-checking corpus greps") verifies glosses against
# formal/religious register; this is its conversational-register sibling. Autshumato is
# government/news/professional-translation register - closer to the everyday phrases the
# app teaches. Grep a candidate Setswana word or phrase here, read the aligned English line,
# and confirm the gloss is actually used that way before it goes in content.js.
#
#   python toolkit/autshumato-lookup.py batla
#   python toolkit/autshumato-lookup.py "ke a go rata"
#
# Source data: corpus/autshumato/Autshumato English-Setswana Parallel Corpora/
#   Three aligned pairs of UTF-8 text files (Translated / ReliableSources / Other),
#   each split into a .tn.txt (Setswana) and .en.txt (English) file with one sentence
#   per line - line N of the .tn file aligns with line N of the .en file. Not tab-separated.
# Re-download: https://hdl.handle.net/20.500.12185/404 (CC BY 2.5 ZA, see corpus/autshumato/
#   Autshumato English-Setswana Parallel Corpora/README.txt for full attribution).

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CORPUS_DIR = ROOT / 'corpus' / 'autshumato' / 'Autshumato English-Setswana Parallel Corpora'

SETS = [
    'Corpus.DACB3.BilingualData_Translated.2.0.0',
    'Corpus.DACB3.BilingualData_ReliableSources.2.0.0',
    'Corpus.DACB3.BilingualData_Other.2.0.0',
]

MAX_HITS = 20


def load_pairs():
    """Yield (setswana_line, english_line, set_name) for every aligned pair on disk."""
    for name in SETS:
        tn_path = CORPUS_DIR / f'{name}.tn.txt'
        en_path = CORPUS_DIR / f'{name}.en.txt'
        if not tn_path.exists() or not en_path.exists():
            print(f'warning: missing {name} files under {CORPUS_DIR}', file=sys.stderr)
            continue
        tn_lines = tn_path.read_text(encoding='utf-8', errors='replace').splitlines()
        en_lines = en_path.read_text(encoding='utf-8', errors='replace').splitlines()
        if len(tn_lines) != len(en_lines):
            print(f'warning: {name} .tn/.en line counts differ '
                  f'({len(tn_lines)} vs {len(en_lines)}) - aligning by shortest', file=sys.stderr)
        for tn, en in zip(tn_lines, en_lines):
            yield tn, en, name


def main():
    ap = argparse.ArgumentParser(description='Grep the Autshumato parallel corpus for a Setswana word/phrase.')
    ap.add_argument('query', help='Setswana word or phrase to search for (case-insensitive substring)')
    ap.add_argument('-n', '--max-hits', type=int, default=MAX_HITS)
    args = ap.parse_args()

    needle = args.query.lower()
    hits = 0
    for tn, en, set_name in load_pairs():
        if needle in tn.lower():
            hits += 1
            print(f'[{set_name}]')
            print(f'  TN: {tn}')
            print(f'  EN: {en}')
            if hits >= args.max_hits:
                print(f'\n... stopped at {args.max_hits} hits (use -n to raise the cap)', file=sys.stderr)
                break
    if hits == 0:
        print(f'no matches for {args.query!r}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
