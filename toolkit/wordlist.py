# Build a frequency wordlist of REAL, correctly-spelled Setswana words, so the tagger
# can offer spelling suggestions for words the announcer says that aren't in the course
# vocab tables. Sources (all local corpus): the BSSA Bible (huge, clean SA-standard
# Setswana), the Peace Corps course, and the vetted sentence bank.
#
#   python toolkit/wordlist.py
#
# Output: toolkit/wordlist.js  window.RL_WORDLIST = ["word", ...]  (descending frequency)
# Note: derived from local-only corpora — the .js is gitignored, never deployed.

import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CORPUS = ROOT / 'corpus'
TOOLKIT = Path(__file__).resolve().parent
OUT = TOOLKIT / 'wordlist.js'

NORM = str.maketrans({'ê': 'e', 'Ê': 'e', 'ô': 'o', 'Ô': 'o'})
TOKEN = re.compile(r'[a-z]+')
MAX_WORDS = 22000

# obvious English/OCR contaminants from page headers/footers in the scans
STOP = {
    'the', 'of', 'and', 'to', 'in', 'a', 'is', 'for', 'setswana', 'bible',
    'society', 'south', 'africa', 'page', 'peace', 'corps', 'botswana',
    'introduction', 'hosted', 'free', 'on', 'lesson', 'back', 'top',
    'english', 'university', 'iowa', 'casas', 'copyright', 'all', 'rights',
    'reserved', 'ditirafalo',
}


def tokens_from(text):
    for raw in text.split():
        raw = raw.strip().translate(NORM).lower()
        raw = re.sub(r'^[0-9]+', '', raw)        # strip leading verse numbers
        for tok in TOKEN.findall(raw):
            if len(tok) >= 2 and tok not in STOP:
                yield tok


def main():
    counts = Counter()

    bible = CORPUS / 'beibele-bssa-full.txt'
    if bible.exists():
        counts.update(tokens_from(bible.read_text(encoding='utf-8', errors='ignore')))
    course = CORPUS / 'peace-corps-full-course.txt'
    if course.exists():
        # weight course words so they always survive the frequency cut
        for _ in range(5):
            counts.update(tokens_from(course.read_text(encoding='utf-8', errors='ignore')))
    sb = TOOLKIT / 'sentence-bank.tsv'
    if sb.exists():
        for _ in range(5):
            counts.update(tokens_from(sb.read_text(encoding='utf-8', errors='ignore')))

    # drop hapaxes (mostly OCR noise), keep the rest by descending frequency
    words = [w for w, c in counts.most_common() if c >= 3][:MAX_WORDS]
    OUT.write_text('window.RL_WORDLIST = ' + str(words).replace("'", '"') + ';\n',
                   encoding='utf-8')
    print(f'wrote {OUT}  ({len(words)} words, from {len(counts)} raw tokens)')
    print('sample top-30:', words[:30])
    for probe in ('kgona', 'dumela', 'tsamaya', 'batla', 'lefela'):
        near = [w for w in words if probe[:4] in w][:8]
        print(f'  "{probe[:4]}…" →', near)


if __name__ == '__main__':
    main()
