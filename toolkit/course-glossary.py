# Parse the Peace Corps course text into a per-lesson glossary for the tagger's
# reference panel. The audio (BW_Setswana_Lesson_N.mp3) is the announcer reading
# THIS course, so its spellings are the authority — not Google Translate.
#
#   python toolkit/course-glossary.py
#
# Output: toolkit/course-glossary.js  window.RL_GLOSSARY = { "5": {title, pairs:[[tsw,eng],...]}, ... }
# Pairs are best-effort (Setswana line then English line); category headers and
# notes are kept as single-column rows so nothing is silently dropped or mis-paired.

import json
import re
from pathlib import Path

SRC = Path(__file__).resolve().parent.parent / 'corpus' / 'peace-corps-full-course.txt'
OUT = Path(__file__).resolve().parent / 'course-glossary.js'

NOISE = re.compile(
    r'^\s*$'
    r'|^=== PAGE'
    r'|Hosted for free'
    r'|^Introduction to Setswana'
    r'|Course hosted'
    r'|livelingua'
    r'|^Back to Top'
    r'|^\d+\s*$'          # bare page numbers
    r'|^\s*9\s*$'         # OCR bullet artefact (checkmark → "9")
)

# lines that are section labels inside a lesson, not a Setswana term
HEADERS = {
    'kitchen', 'bedroom', 'general items', 'places', 'english', 'high tone',
    'low tone', 'greeting a group', 'commanding expressions', 'present',
    'negative present', 'past', 'negative past', 'negative future', 'future',
    'verb to be (-nna)', 'verb to have (-na le)', "(formal)- dialogue",
    '(informal)- dialogue',
}

LESSON_RE = re.compile(r'^Lesson\s+(\d+)\s*:?\s*(.*)$', re.I)

# house rule: normalise ê/ô → e/o everywhere (standard SA orthography, matches the app)
NORM = str.maketrans({'ê': 'e', 'Ê': 'E', 'ô': 'o', 'Ô': 'O'})


def norm(s):
    return s.translate(NORM) if s else s


def looks_english(s):
    """Heuristic: an English gloss line — starts capitalised or is plainly English."""
    t = s.strip()
    if not t:
        return False
    # Setswana cues: slash-separated verb forms, ê/ô, leading lowercase Setswana
    if '/' in t and re.search(r'[a-zêô]', t):
        return False
    return bool(re.match(r'^[A-Z]', t)) or t.lower() in HEADERS


def main():
    lines = SRC.read_text(encoding='utf-8').splitlines()
    lessons, cur = {}, None
    for raw in lines:
        line = raw.strip()
        if NOISE.match(line):
            continue
        m = LESSON_RE.match(line)
        if m:
            cur = m.group(1)
            lessons[cur] = {'title': m.group(2).strip(), 'lines': []}
            continue
        if cur:
            lessons[cur]['lines'].append(line)

    out = {}
    for lid, d in lessons.items():
        ls = d['lines']
        pairs, i = [], 0
        while i < len(ls):
            a = ls[i]
            b = ls[i + 1] if i + 1 < len(ls) else None
            if b is not None and not looks_english(a) and looks_english(b):
                pairs.append([norm(a), norm(b)])   # Setswana, English
                i += 2
            else:
                pairs.append([norm(a), None])  # header / note / unpaired line
                i += 1
        out[lid] = {'title': d['title'], 'pairs': pairs}

    OUT.write_text('window.RL_GLOSSARY = ' + json.dumps(out, ensure_ascii=False) + ';\n',
                   encoding='utf-8')
    print(f'wrote {OUT}')
    for lid in ('5', '6', '7'):
        print(f'\n--- Lesson {lid}: {out[lid]["title"]} ({len(out[lid]["pairs"])} rows) ---')
        for a, b in out[lid]['pairs'][:14]:
            print(f'  {a!r:40} {b!r}')


if __name__ == '__main__':
    main()
