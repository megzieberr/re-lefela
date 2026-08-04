# Extract dictionary headwords from the three wave-1 sources into toolkit/dict-src/.
#
#   python toolkit/dict-extract-sources.py
#
# Outputs (tracked, so the bank is reproducible and reviewable without the corpora):
#   toolkit/dict-src/app.json    — the app's own checked cards (content.js)
#   toolkit/dict-src/wikt.json   — English Wiktionary Tswana lemmas (CC BY-SA)
#   toolkit/dict-src/pc.json     — Peace Corps course glossary pairs (public domain)
#
# Inputs that are gitignored (corpus/, dictionaries/) are re-fetchable: see
# toolkit/SOURCES.md, and dict-fetch-wiktionary.py re-downloads the raw dump.
#
# Every record: {tsw, eng[], pos, cls, note, src, chk}. Nothing here composes
# Setswana — strings are copied verbatim from their source.

import json
import re
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from dict_common import (ROOT, SRC_DIR, CORPUS, DICTIONARIES, POS_FROM_WIKT,
                         norm, strip_wiki, parse_templates, looks_setswana, write_json)

# ---------------------------------------------------------------- the app itself

# content.js is a JS object literal; eval it in node rather than regexing it, so a
# formatting change in the content file can never silently drop cards.
DUMP_JS = r"""
const fs = require('fs');
const src = fs.readFileSync(process.argv[2], 'utf8');
const RL = new Function(src + '; return RL_CONTENT;')();
process.stdout.write(JSON.stringify(RL));
"""


def load_content():
    tmp = SRC_DIR / '_dump-content.js'
    tmp.parent.mkdir(parents=True, exist_ok=True)
    tmp.write_text(DUMP_JS, encoding='utf-8', newline='\n')
    out = subprocess.run(['node', str(tmp), str(ROOT / 'content.js')],
                         capture_output=True, text=True, encoding='utf-8')
    tmp.unlink()
    if out.returncode != 0:
        raise SystemExit('node failed to read content.js:\n' + out.stderr)
    return json.loads(out.stdout)


POS_FROM_KIND = {'word': None, 'verb': 'v', 'phrase': 'phrase'}


def extract_app():
    """The app's own 307 cards — already human-checked, so these ship chk=True.

    A card's `note` is often a real usage explanation ("Dumela works any time of
    day"), which is exactly what the panel wants as a definition line.
    """
    content = load_content()
    out = []
    for unit in content.get('units', []):
        for lesson in unit.get('lessons', []):
            for it in lesson.get('items', []):
                if it.get('kind') == 'rule':
                    continue          # explanation cards, not vocabulary
                tsw, eng = (it.get('tsw') or '').strip(), (it.get('eng') or '').strip()
                if not tsw or not eng:
                    continue
                pos = POS_FROM_KIND.get(it.get('kind'))
                if pos is None:
                    pos = 'phrase' if len(tsw.split()) > 1 else 'n'
                if len(tsw.split()) > 1 and pos != 'v':
                    pos = 'phrase'
                out.append({
                    'tsw': tsw,
                    'eng': [e.strip() for e in eng.split('/') if e.strip()] or [eng],
                    'pos': pos,
                    'cls': str(it['cls']) if it.get('cls') else None,
                    'note': (it.get('note') or '').strip(),
                    'audio': it.get('audio') or None,
                    'itemId': it.get('id'),
                    'src': ['app'],
                    'chk': True,
                })
    return out


# ------------------------------------------------------------------- wiktionary

GLOSS_LINE = re.compile(r'^#\s+(?!\*|:)(.+)$', re.M)
POS_HEADER = re.compile(r'^===+\s*([A-Za-z][A-Za-z ]*?)\s*===+\s*$', re.M)


def _clean_gloss(line):
    """Drop the templates a gloss line carries, keeping {{lb|..}} labels as text."""
    labels = []
    for name, args in parse_templates(line):
        if name in ('lb', 'label') and len(args) > 1:
            labels += [a for a in args[1:] if a and '=' not in a]
    line = re.sub(r'\{\{[^{}]*\}\}', '', line)
    while '{{' in line and '}}' in line:
        new = re.sub(r'\{\{[^{}]*\}\}', '', line)
        if new == line:
            break
        line = new
    text = strip_wiki(line).strip(' ,;')
    if not text:
        return None
    return (('(' + ', '.join(labels) + ') ') if labels else '') + text


def extract_wiktionary():
    raw = DICTIONARIES / 'wiktionary-tswana-raw.jsonl'
    if not raw.exists():
        raise SystemExit('missing ' + str(raw) + ' — run toolkit/dict-fetch-wiktionary.py first')
    out = []
    for line in raw.read_text(encoding='utf-8').splitlines():
        if not line.strip():
            continue
        rec = json.loads(line)
        word, wt = rec['word'], rec['wikitext']
        if not looks_setswana(word):
            continue
        # split the entry into (pos-header, body) blocks so glosses land on the
        # right part of speech instead of being pooled
        blocks, pos_marks = [], list(POS_HEADER.finditer(wt))
        for i, m in enumerate(pos_marks):
            end = pos_marks[i + 1].start() if i + 1 < len(pos_marks) else len(wt)
            blocks.append((m.group(1), wt[m.end():end]))
        cls = None
        for name, args in parse_templates(wt):
            if name == 'tn-noun':
                for a in args:
                    if a.startswith('cl='):
                        cls = a[3:].strip()
        for header, body in blocks:
            pos = POS_FROM_WIKT.get(header)
            if not pos:
                continue
            glosses = []
            for g in GLOSS_LINE.findall(body):
                cleaned = _clean_gloss(g)
                if cleaned and cleaned not in glosses:
                    glosses.append(cleaned)
            if not glosses:
                continue
            # {{ux|tn|Setswana sentence|English translation}} — a usage example the
            # Wiktionary editors wrote, translation included. Copied verbatim.
            examples = []
            for name, args in parse_templates(body):
                if name in ('ux', 'uxi', 'usex') and len(args) >= 3 and args[0] == 'tn':
                    t, e = strip_wiki(args[1]), strip_wiki(args[2])
                    if t and e:
                        examples.append({'t': t, 'e': e, 'src': 'wikt'})
            out.append({
                'tsw': word,
                'eng': glosses,
                'pos': pos,
                'cls': cls if pos == 'n' else None,
                'note': '',
                'ex': examples,
                'src': ['wikt'],
                'chk': False,
            })
    return out


# ------------------------------------------------------------------ peace corps

# The course text alternates: one Setswana line, then its English gloss. Section
# sub-headers ("Kitchen", "Bedroom") and page furniture break that alternation, and
# a parser that just walks in twos shifts every later pair by one — which is how
# course-glossary.js ended up with 'not want' -> 'They will'. This parser RESYNCS:
# a line that fails the Setswana test is skipped rather than consumed as half a
# pair, and dict_lang.plausible_pair drops anything still mis-shaped.
PC_NOISE = re.compile(
    r'^\s*$'
    r'|^=== PAGE'
    r'|Hosted for free'
    r'|livelingua'
    r'|^Back to Top'
    r'|^Introduction to Setswana'
    r'|^Lesson\s+\d+'
    r'|\.mp3\b'            # ToC audio-file names ("Bw_Setswana_Lesson_2.mp3")
    r'|^[\d,.\s]+$'        # page numbers and ToC page refs ("5,6,7")
    r'|^Setswana\s*$'
    r'|^English\s*$', re.I)

# Sub-headers, table-column headers and grammar labels that sit where a Setswana
# headword would. "lesson"/"topic"/"page"/"audio" are the ToC's column headers,
# which the first build shipped as dictionary entries (caught in code review).
PC_HEADERS = {
    'kitchen', 'bedroom', 'general items', 'places', 'family', 'high tone',
    'low tone', 'present', 'past', 'future', 'negative present', 'negative past',
    'negative future', 'greeting a group', 'commanding expressions', 'singular',
    'plural', 'to-', 'go-', 'vocabulary', 'pronouns', 'negation', 'questions',
    'lesson', 'topic', 'page', 'audio', 'alphabet', 'like', 'example',
}

# The 2-line alternation the parser relies on only holds in the vocabulary body.
# Two regions break it structurally and must be skipped whole:
#   - the pronunciation guide: a 3-column table (letter / sounds-like / example)
#     whose rows shipped "ch", "ph", "tlh" etc. as headwords in the first build —
#     "ph" even attracted a mined example about soil pH;
#   - everything before the first real lesson: the table of contents.
PC_SKIP_FROM = re.compile(r'guide to pronunciation', re.I)
PC_SKIP_UNTIL = re.compile(r'^Lesson\s+\d+', re.I)

# A single Setswana word is never a whole English clause: the concord would be
# there ("ke batla" = I want, bare "batla" is just "want"). Rows like
# "batla" / "I will not" are interleaved tense-table columns, not glossary pairs.
PC_CLAUSE_GLOSS = re.compile(r'^(I|You|We|They|He|She|It)\b', re.I)

# Interleaved-column debris on the English side: a subject pronoun jammed
# mid-string after a lowercase word ("I did want You did").
PC_INTERLEAVED = re.compile(r'[a-z] (I|You|We|They|He|She)\b')


def _pc_lines():
    path = CORPUS / 'peace-corps-full-course.txt'
    if not path.exists():
        raise SystemExit('missing ' + str(path) + ' — see toolkit/SOURCES.md')
    out, skipping = [], True          # skipping=True: we start inside the ToC
    for raw in path.read_text(encoding='utf-8', errors='replace').splitlines():
        line = raw.strip()
        # A Lesson header always re-decides the skip state — and the decision has
        # to look at the header itself: the pronunciation guide is literally
        # titled "Lesson 1: A Guide to Pronunciation", so the very line that ends
        # the ToC skip also starts the pronunciation skip. The first build missed
        # that and shipped the guide's digraph rows (ch, ph, tlh…) as headwords.
        if PC_SKIP_UNTIL.match(line):
            skipping = bool(PC_SKIP_FROM.search(line))
            continue
        if skipping or PC_SKIP_FROM.search(line):
            skipping = skipping or bool(PC_SKIP_FROM.search(line))
            continue
        if not line or PC_NOISE.match(line):
            continue
        out.append(line)
    return out


def extract_peacecorps():
    """Parse the Peace Corps course text into (Setswana, English) pairs.

    Public-domain US government work. Ships chk=False with src 'pc' so the panel
    shows the provenance and Megan can correct any survivor she spots.
    """
    from dict_lang import plausible_pair, setswana_fraction

    lines = _pc_lines()
    out, i, dropped = [], 0, 0
    while i < len(lines) - 1:
        tsw_line, eng_line = lines[i], lines[i + 1]
        low = tsw_line.lower().strip(' :')
        if low in PC_HEADERS or len(tsw_line) > 70:
            i += 1                       # sub-header / prose: resync, don't consume
            continue
        # A verbs row is "present / past"; keep the present form as the headword and
        # carry the past form verbatim as a note (it is real course data).
        # ⚠️ Only for SINGLE-WORD verbs. The course also writes alternatives with a
        # slash — "robala sentle / borôkô" is two ways to say good night, not a
        # tense pair — and reading that as a past tense taught the example miner a
        # form the headword does not have, which then illustrated "Robala sentle"
        # with a sentence about sleeplessness (caught by the ship gate, 2026-08-04).
        past = None
        head = tsw_line
        if '/' in head:
            left, _, right = head.partition('/')
            right = right.split('(')[0]
            if (len(left.split()) == 1 and looks_setswana(left)
                    and len(right.split()) == 1 and looks_setswana(right)):
                head, past = left.strip(), right.strip(' ,)')
            else:
                head = left
        head = re.split(r'[;(]', head)[0].strip(' ,')
        if not looks_setswana(head) or setswana_fraction(head) == 0 and len(head.split()) > 3:
            i += 1
            continue
        eng = re.sub(r'\s+', ' ', eng_line).strip()
        if not eng or len(eng) > 70 or eng.lower().strip(' :') in PC_HEADERS:
            i += 1
            continue
        if len(head.split()) == 1 and PC_CLAUSE_GLOSS.match(eng):
            dropped += 1                 # tense-table column row, not a pair
            i += 1
            continue
        if PC_INTERLEAVED.search(eng):
            dropped += 1                 # merged-column debris on the gloss side
            i += 1
            continue
        if not plausible_pair(head, eng):
            dropped += 1
            i += 1                       # resync on the suspect line
            continue
        # "Able, be" is the course's inverted gloss for "be able" — keep both so
        # searching either way finds it. English-side only; no Setswana is touched.
        meanings = [m.strip() for m in re.split(r'[;/]', eng) if m.strip()][:4]
        # A meaning has to be a word, not an OCR crumb ("r"), and the headword has
        # to survive norm() as something searchable.
        meanings = [m for m in meanings if len(re.sub(r'[^a-zA-Z]', '', m)) >= 2]
        if not meanings or not norm(head):
            i += 1
            continue
        extra = []
        for m in meanings:
            inv = re.match(r'^(.+),\s*(be|go|get|have|make|take|do)$', m, re.I)
            if inv:
                extra.append(inv.group(2).lower() + ' ' + inv.group(1).lower())
        out.append({
            'tsw': head,
            'eng': meanings + extra,
            'pos': ('v' if past or any(m.lower().startswith('to ') for m in meanings)
                    else ('phrase' if len(head.split()) > 1 else None)),
            'cls': None,
            'note': ('past tense: ' + past) if past else '',
            'src': ['pc'],
            'chk': False,
        })
        i += 2
    print(f'      (peace corps: {dropped} suspect rows dropped by the language filter)')
    return out


def main():
    SRC_DIR.mkdir(parents=True, exist_ok=True)
    for name, fn in (('app', extract_app), ('wikt', extract_wiktionary), ('pc', extract_peacecorps)):
        rows = fn()
        write_json(SRC_DIR / (name + '.json'), rows)
        heads = len({norm(r['tsw']) for r in rows})
        print(f'{name:5s} {len(rows):5d} records  {heads:5d} distinct headwords  -> dict-src/{name}.json')


if __name__ == '__main__':
    main()
