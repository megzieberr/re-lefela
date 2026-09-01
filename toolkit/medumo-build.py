#!/usr/bin/env python
"""Build medumo-bank.js — the 🔊 Medumo tab's word sets, from Zerwick's SECL121 handout.

GENERATED FILE — never hand-edit medumo-bank.js. Rebuild with:
    python toolkit/medumo-build.py && python toolkit/verify-medumo-bank.py

SOURCE. "1 Sound values of Setswana 121-521 2024" (Johan Zerwick, SECL121/SECF521),
read as corpus/zerwick-sound-values-2024.txt. corpus/ is GITIGNORED, so the handout
itself is never published from this public repo — only the vocabulary it teaches, which
is what the tab needs. 114 of the 150 words are independently corroborated in
dict-bank.js (African Wordnet / Autshumato / the app's own cards); the build records
that per word in `src` so the app can show her where each one comes from.

SETS. Five words each, in the handout's own order, so a set is the sounds he teaches
next ("teach it in the app like he teaches it in his handouts"). Grouping strictly per
sound was tried first and rejected: it left sets of one word, because several of his
sounds carry a single example. Each set is labelled with the sound(s) it spans instead.

ALREADY-KNOWN WORDS stay in. Some of his examples are already app cards (rata, batla,
motho). Dropping them would leave holes in the sounds he is demonstrating, so they are
kept and flagged `k:1` — the teach step shows them as familiar anchors, and the drill
prefers the new words so her time goes on what she does not know yet.

THE EXTRACTION IS NOT TRUSTED. A previous session scrambled this document's accents with
a naive text extractor. Two explicit tables below fix what a regex gets wrong, and every
one of them was checked back against the handout line it came from:
  * REPAIR   — the syllabic-consonant section writes "nna > n-na(I/me)". The REAL spelling
               is on the LEFT of the '>'; the hyphenated form is beat notation, not how
               the word is written. A regex grabs the right-hand side.
  * DROP     — surnames, a place in Sweden, and the bare vowel/letter rows. Not vocabulary.
Anything the parser finds that is not covered here still has to survive the verify gate.
"""
import re, json, sys, unicodedata
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'corpus' / 'zerwick-sound-values-2024.txt'
OUT = ROOT / 'medumo-bank.js'
MAX_PER_SET = 5

# hyphenated beat-notation -> the spelling the handout itself gives on the left of '>'
REPAIR = {
    'l-lere': 'llere', 'l-lôtô': 'llôtô', 'r-ra': 'rra', 'r-remogolo': 'rremogolo',
    'm-mala': 'mmala', 'm-mele': 'mmele', 'm-mê': 'mmê', 'n-na': 'nna',
    'n-tlisa': 'ntlisa', 'mo-n-na': 'monna', 'boja-n-nye': 'bojannye',
    'fê-n-ngwa': 'fenngwa', 'n – nyatsa': 'nnyatsa', 'n – ngapa': 'nngapa',
    'Le-ng': 'leng', 'Te-ng': 'teng', 'e-ng': 'eng',
}
# not vocabulary: two surnames, a Swedish place name used as a sound example, and the
# bare letters the handout lists when it says which letters Setswana does not use.
# thabô is dropped too: it is a person's name, and Megan ruled on 2026-09-01 that the
# app keeps the card spelling Thabo plain — teaching Thabô here would contradict it.
DROP = {'mokoena', 'rapoo', 'njavve', 'thabo', 'v', 'c', 'x', 'q', 'z'}

# Three lines defeat any regex, so the words they teach are stated outright and each one
# is quoted with the handout line it comes from. Checked by eye against the document.
#   'i' vowel row runs the prose into the examples with no separator:
#       "i  modiri (labourer), more or less as in the English thief - more examples
#        moruti (reverend), itse (know), itaya (strike / hit)"
#   'n' row leaves a paren unbalanced:  "namane (calf (n),"
#   'ny' row runs an aside into the example: "...if the food is tasty or Njavve..."
BAD_PARSE = {
    'more or less as in the english thief – more examples': ('moruti', 'reverend'),
    'calf': ('namane', 'calf'),
    'if the food is tasty or njavve': None,        # aside, not a word
    'ngapa': ('nngapa', 'scratch me'),
}

def deacc(w):
    return ''.join(c for c in unicodedata.normalize('NFD', w.lower())
                   if unicodedata.category(c) != 'Mn')

def app_headwords():
    """Setswana strings the app already teaches as cards, accent-blind."""
    js = (ROOT / 'content.js').read_text(encoding='utf-8')
    out = set()
    for t in re.findall(r"tsw: '([^']*)'", js):
        for w in t.split():
            out.add(deacc(w))
    return out


def corroboration():
    """headword -> the open sources dict-bank.js already holds for it."""
    bank = (ROOT / 'dict-bank.js').read_text(encoding='utf-8')
    rows = json.loads('[' + bank.split('const RL_DICT = [', 1)[1].rsplit('];', 1)[0] + ']')
    out = {}
    for e in rows:
        out.setdefault(deacc(e['t']), set()).update(e.get('s') or [])
    return out

# ─── Minimal pairs: the hat changes which WORD it is ─────────────────────────────────
# Megan's ask (2026-09-01): "add them as rounds to this tab where I need to distinguish
# between the 2 different meanings, one with the hat and one without."
#
# The first two are the pairs that fell out of the respell — words the app already
# teaches WITHOUT a hat that are a different word WITH one. They are the reason the
# respell shrank from 10 words to 7, so they are exactly the confusion to head off.
# The rest are the handout's own table ("it can make a big difference in meaning").
# Every option carries its own source: the plain member is usually an app card, the
# hatted member is his handout.
PAIRS = [
    {'id': 'mp1', 'ask': 'mother',
     'opts': [{'t': 'mmê', 'e': 'mother', 'src': ['zerwick-2024']},
              {'t': 'mme', 'e': 'but', 'src': ['peace-corps-L9']}],
     'note': 'The app teaches mme = "but" (u4l5-03). With the hat it is a different word '
             'entirely — mmê, mother. Same three letters, nothing else shared.'},
    {'id': 'mp2', 'ask': 'this one (this man)',
     'opts': [{'t': 'yô', 'e': 'this one (this man)', 'src': ['zerwick-2024']},
              {'t': 'yo', 'e': 'who (the one that…)', 'src': ['beibele']}],
     'note': 'Plain yo is the joining word "who" — Ke Modisa yo o Molemo, "the shepherd '
             'WHO is good" (u5l4-05). Hatted yô points at someone: this one, this man.'},
    {'id': 'mp3', 'ask': 'healing, cooling',
     'opts': [{'t': 'phôlô', 'e': 'healing, cooling', 'src': ['zerwick-2024']},
              {'t': 'pholo', 'e': 'ox', 'src': ['zerwick-2024']},
              {'t': 'pholô', 'e': 'harvest', 'src': ['zerwick-2024']}],
     'note': 'His three-way example, and the sharpest one in the handout: one hat moved '
             'gives you an ox, healing, or a harvest.'},
    {'id': 'mp4', 'ask': 'hip / pelvis',
     'opts': [{'t': 'nôka', 'e': 'hip / pelvis', 'src': ['zerwick-2024']},
              {'t': 'noka', 'e': 'river', 'src': ['zerwick-2024']}],
     'note': 'noka is a river; nôka is your hip.'},
    {'id': 'mp5', 'ask': 'pour',
     'opts': [{'t': 'tshêla', 'e': 'pour', 'src': ['zerwick-2024']},
              {'t': 'tshela', 'e': 'live', 'src': ['zerwick-2024']}],
     'note': 'tshela = live, tshêla = pour.'},
    {'id': 'mp6', 'ask': 'develop a habit / grow horns',
     'opts': [{'t': 'lêma', 'e': 'develop a habit / grow horns', 'src': ['zerwick-2024']},
              {'t': 'lema', 'e': 'plough', 'src': ['zerwick-2024']}],
     'note': 'lema is to plough — the everyday one. lêma is to grow horns, or to pick up '
             'a habit.'},
    {'id': 'mp7', 'ask': 'stop street',
     'opts': [{'t': 'setôpô', 'e': 'stop street', 'src': ['zerwick-2024']},
              {'t': 'setopo', 'e': 'corpse', 'src': ['zerwick-2024']}],
     'note': 'Worth getting right: setopo is a corpse, setôpô is a stop street.'},
]

WORD = re.compile(r'([A-Za-zêôšÊÔŠ][A-Za-zêôšÊÔŠ–\- ]*?)\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)')

def parse(text):
    """(sound, word, gloss) in handout order, from every line that teaches words."""
    found = []
    for raw in text.split('\n'):
        line = raw.strip()
        if not line or line.startswith('The ') or line.lower().startswith('although'):
            continue
        m = re.match(r'^([A-Za-zêôšŠ]{1,4})\s*[\t]+\s*-?(.*)$', line)   # "kg\t-kgalema (…)"
        if m:
            sound, body = m.group(1), m.group(2)
        else:
            m2 = re.match(r'^([A-Za-zêôšŠ]{1,4})\s+as in the words?\s+(.*)$', line)
            if not m2:
                continue
            sound, body = m2.group(1), m2.group(2)
        for w, g in WORD.findall(body):
            w = w.strip().strip('-').strip()
            if '>' in w:
                w = w.split('>')[-1].strip()
            w = REPAIR.get(w, w)
            g = ' '.join(g.split()).rstrip(',;')
            if ' ' in w and deacc(w.split()[-1]) in BAD_PARSE:
                w = w.split()[-1]
            fix = BAD_PARSE.get(deacc(w))
            if deacc(w) in BAD_PARSE:
                if fix is None:
                    continue
                w, g = fix
            if not w or deacc(w) in DROP or len(deacc(w)) < 2:
                continue
            # A multi-word capture means the regex ran back into his prose ("…more
            # examples moruti"). The headword is the token sitting against the gloss,
            # so keep the last one and let DROP judge it.
            if ' ' in w:
                w = w.split()[-1]
                if deacc(w) in DROP:
                    continue
            found.append((sound, w, g))
    return found

def main():
    if not SRC.exists():
        sys.exit(f'missing source: {SRC}\n(corpus/ is gitignored — copy the extracted '
                 'handout text there before rebuilding)')
    corr = corroboration()
    seen, entries = {}, []
    for sound, w, g in parse(SRC.read_text(encoding='utf-8')):
        key = deacc(w)
        if key in seen:                       # keep the first teaching of a word, but
            prev = entries[seen[key]]         # prefer the spelling that carries the hat
            if re.search(r'[êôÊÔ]', w) and not re.search(r'[êôÊÔ]', prev['t']):
                prev['t'] = w
            continue
        src = ['zerwick-2024'] + sorted(corr.get(key, set()) - {'app'})
        seen[key] = len(entries)
        entries.append({'t': w, 'e': g, 'snd': sound, 'src': src})

    known = app_headwords()
    for e in entries:
        if deacc(e['t']) in known:
            e['k'] = 1

    sets = []
    for n in range(0, len(entries), MAX_PER_SET):
        ch = entries[n:n + MAX_PER_SET]
        sounds = list(dict.fromkeys(e['snd'] for e in ch))
        sets.append({
            'id': f'md{len(sets) + 1:02d}',
            'label': ' · '.join(sounds),
            'words': [{k: e[k] for k in ('t', 'e', 'src', 'k') if k in e} for e in ch],
        })

    body = ',\n'.join('  ' + json.dumps(s, ensure_ascii=False, sort_keys=True) for s in sets)
    pbody = ',\n'.join('  ' + json.dumps(x, ensure_ascii=False, sort_keys=True) for x in PAIRS)
    OUT.write_text(
        '// Re:Lefela — 🔊 Medumo word sets. GENERATED FILE — do not hand-edit.\n'
        '// Rebuild: python toolkit/medumo-build.py && python toolkit/verify-medumo-bank.py\n'
        '//\n'
        '// Source: "1 Sound values of Setswana 121-521 2024" (Johan Zerwick, SECL121).\n'
        '// Glosses are his, copied verbatim — never improved or re-translated. Words the\n'
        '// app can corroborate from an open source carry that source too (afwn = African\n'
        '// Wordnet, auts = Autshumato). The handout itself stays in gitignored corpus/.\n'
        '//\n'
        '// Sets follow the handout\'s own order: one sound, the words that demonstrate it.\n'
        f'// {len(sets)} sets, {len(entries)} words.\n'
        f'const RL_MEDUMO = [\n{body}\n];\n\n'
        '// Minimal pairs — the circumflex changes which word it is. Drilled as their own\n'
        '// round at the end of the tab (her ask, 2026-09-01).\n'
        f'const RL_MEDUMO_PAIRS = [\n{pbody}\n];\n',
        encoding='utf-8', newline='\n')
    print(f'{len(entries)} words in {len(sets)} sets -> {OUT.name}')
    print(f'corroborated by an open source: {sum(1 for e in entries if len(e["src"]) > 1)}')

if __name__ == '__main__':
    main()
