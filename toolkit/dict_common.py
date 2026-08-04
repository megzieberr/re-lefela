# Shared helpers for the dictionary-panel pipeline (SPEC-dictionary-panel.md).
#
# Imported by dict-extract-sources.py / dict-mine-examples.py / dict-build.py /
# verify-dict-bank.py. Underscored filename because the hyphenated script names
# above cannot be imported.
#
# HOUSE RULE (toolkit/SOURCES.md): no unsourced Setswana. Nothing in this pipeline
# composes, conjugates or "corrects" Setswana — every string is copied verbatim from
# a named source and carries that source's tag through to the shipped bank.

import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TOOLKIT = ROOT / 'toolkit'
SRC_DIR = TOOLKIT / 'dict-src'
CORPUS = ROOT / 'corpus'
DICTIONARIES = ROOT / 'dictionaries'   # gitignored; desk reference + raw wiktionary dump

# Source tags. Kept short — they ship inside dict-bank.js and show in the panel.
SOURCE_LABELS = {
    'app':        'Re:Lefela course',
    'wikt':       'Wiktionary',
    'pc':         'Peace Corps',
    'dbe-maths':  'DBE maths dictionary',
    'bible-nt':   'Tswana NT',
    'desk':       'desk dictionary',
    'afwn':       'African Wordnet',
}

# Part-of-speech codes. Wiktionary's headers map into these; the app's own `kind`
# field maps in too (word/verb/phrase).
POS_FROM_WIKT = {
    'Noun': 'n', 'Verb': 'v', 'Adjective': 'adj', 'Adverb': 'adv',
    'Pronoun': 'pron', 'Numeral': 'num', 'Prefix': 'pref', 'Suffix': 'suf',
    'Proper noun': 'propn', 'Conjunction': 'conj', 'Interjection': 'interj',
    'Particle': 'part', 'Preposition': 'prep', 'Determiner': 'det',
}


def norm(s):
    """Byte-for-byte behaviour match of index.html's norm().

    The panel searches with the app's norm(); this pipeline de-duplicates and
    verifies with this one. If the two ever drift, entries could collide in the
    browser that looked distinct at build time — verify-dict-bank.py pins the
    shared cases so a drift fails the ship gate instead of shipping quietly.
    """
    s = (s or '').lower()
    s = unicodedata.normalize('NFD', s)
    s = ''.join(c for c in s if not 0x0300 <= ord(c) <= 0x036f)
    s = re.sub(r'[/\-–—]', ' ', s)
    s = re.sub(r'[^a-z0-9\s]', '', s)
    s = re.sub(r'\s+', ' ', s)
    return s.strip()


_LINK = re.compile(r'\[\[(?:[^\]|]*\|)?([^\]|]+)\]\]')
_BOLD_ITAL = re.compile(r"'{2,5}")


def strip_wiki(s):
    """[[link|shown]] -> shown, '''bold''' -> bold, stray markup dropped."""
    s = _LINK.sub(r'\1', s or '')
    s = _BOLD_ITAL.sub('', s)
    s = s.replace('&nbsp;', ' ')
    s = re.sub(r'<[^>]+>', '', s)
    return re.sub(r'\s+', ' ', s).strip()


def parse_templates(text):
    """Yield (name, [positional/raw args]) for each {{...}} at the top nesting level."""
    out = []
    i = 0
    while True:
        start = text.find('{{', i)
        if start < 0:
            break
        depth, j = 0, start
        while j < len(text) - 1:
            if text[j:j + 2] == '{{':
                depth += 1
                j += 2
            elif text[j:j + 2] == '}}':
                depth -= 1
                j += 2
                if depth == 0:
                    break
            else:
                j += 1
        if depth != 0:
            break
        body = text[start + 2:j - 2]
        parts, buf, d = [], '', 0
        for ch in body:
            if ch == '{':
                d += 1
            elif ch == '}':
                d -= 1
            if ch == '|' and d == 0:
                parts.append(buf)
                buf = ''
            else:
                buf += ch
        parts.append(buf)
        out.append((parts[0].strip(), [p.strip() for p in parts[1:]]))
        i = j
    return out


# A Setswana headword should look like a Setswana word: letters (plus the
# circumflex/caron vowels the sources use), optional spaces/apostrophes. This
# rejects OCR debris, page numbers and stray English that leaks out of the
# Peace Corps course glossary's best-effort pairing.
_TSW_OK = re.compile(r"^[a-zà-ÿā-ſ' ]+$")


def looks_setswana(s):
    if not s:
        return False
    s = s.strip()
    if len(s) < 2 or len(s) > 40:
        return False
    if not _TSW_OK.match(s.lower()):
        return False
    return bool(norm(s))


def sentence_ok(t, max_words=14):
    """Example sentences must be short enough to actually read at a glance."""
    if not t:
        return False
    w = t.split()
    return 2 <= len(w) <= max_words


# Words carrying no sense of their own. A headword whose meanings are ALL of these
# ("I", "me", "you") gives us nothing to check an example's relevance against — see
# the homonym guard in dict-mine-examples.py.
STOP = {'to', 'be', 'a', 'an', 'the', 'of', 'in', 'on', 'at', 'is', 'are', 'am',
        'it', 'i', 'you', 'he', 'she', 'we', 'they', 'and', 'or', 'not', 'do',
        'does', 'did', 'my', 'your', 'his', 'her', 'our', 'their', 'me', 'him',
        'us', 'them', 'this', 'that', 'with', 'for', 'from', 'go', 'get', 'have'}

# Corroborating an NT line's alignment needs specific words (measured: 4).
# Merely asking "is there anything here to check against?" does not (3).
SENSE_MIN_LEN = 4
GUARD_MIN_LEN = 3


def sense_words(meanings, min_len=SENSE_MIN_LEN):
    """Content words from a list of English meanings, in order, de-duplicated."""
    out = []
    for m in meanings:
        for w in norm(m).split():
            if w not in STOP and len(w) >= min_len and w not in out:
                out.append(w)
    return out


def load_jsonl(path):
    import json
    with open(path, encoding='utf-8') as f:
        return [json.loads(line) for line in f if line.strip()]


def write_json(path, obj):
    import json
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1, sort_keys=True)
        f.write('\n')
