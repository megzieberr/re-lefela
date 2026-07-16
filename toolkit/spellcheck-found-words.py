# Spell-check the Setswana in a tagger mapping (item + free-text "note" tags) against the
# real-word corpus (wordlist.js) and the course glossary. Flags only tokens that look
# mis-spelled, with the closest real word as a suggestion — so Megan fixes only what's wrong.
#
#   python toolkit/spellcheck-found-words.py "C:\path\to\relefela-audio-mapping-round2.json"

import difflib
import json
import re
import sys
from pathlib import Path

TOOLKIT = Path(__file__).resolve().parent
NORM = str.maketrans({'ê': 'e', 'ô': 'o'})

# valid Setswana words: corpus wordlist + every token in the course glossary
words = json.loads(TOOLKIT.joinpath('wordlist.js').read_text(encoding='utf-8')
                   .split('=', 1)[1].strip().rstrip(';'))
VALID = set(words)
gloss = TOOLKIT / 'course-glossary.js'
if gloss.exists():
    g = json.loads(gloss.read_text(encoding='utf-8').split('=', 1)[1].strip().rstrip(';'))
    for d in g.values():
        for tsw, _eng in d['pairs']:
            for tok in re.findall(r'[a-z]+', tsw.lower().translate(NORM)):
                VALID.add(tok)

# bucket real words by first letter for fast fuzzy lookup
BUCKET = {}
for w in VALID:
    BUCKET.setdefault(w[:1], []).append(w)


def check_token(tok):
    if tok in VALID or len(tok) <= 1:
        return None                       # fine
    near = difflib.get_close_matches(tok, BUCKET.get(tok[:1], []), n=1, cutoff=0.8)
    return ('likely: ' + near[0]) if near else 'unknown — check by ear'


def phrase_text(t):
    return t.get('text') or t.get('tsw') or ''


def main():
    if len(sys.argv) < 2:
        sys.exit('usage: spellcheck-found-words.py <mapping.json>')
    tags = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))['tags']
    checkable = [t for t in tags if t['action'] in ('item', 'note') and phrase_text(t)]
    flagged = []
    for t in checkable:
        toks = re.findall(r'[a-z]+', phrase_text(t).lower().translate(NORM))
        issues = [(tok, sug) for tok in toks if (sug := check_token(tok))]
        if issues:
            flagged.append((t, issues))

    print(f'Checked {len(checkable)} Setswana entries · {len(flagged)} need a look '
          f'({len(checkable) - len(flagged)} look correct)\n')
    by_lesson = {}
    for t, issues in flagged:
        by_lesson.setdefault(t['lesson'], []).append((t, issues))
    for lesson in sorted(by_lesson, key=lambda x: (len(x), x)):
        rows = by_lesson[lesson]
        print(f'— Lesson {lesson} ({len(rows)}):')
        for t, issues in rows:
            notes = '; '.join(f'{tok} -> {sug}' for tok, sug in issues)
            eng = f'  ({t["eng"]})' if t.get('eng') else ''
            print(f'    seg {t["seg"]:>3}: "{phrase_text(t)}"{eng}   [{notes}]')
    print()


if __name__ == '__main__':
    main()
