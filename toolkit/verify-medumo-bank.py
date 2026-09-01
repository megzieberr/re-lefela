#!/usr/bin/env python
"""Ship gate for medumo-bank.js and lediri-bank.js (session 43, 2026-09-01).

Same bar as verify-builder-bank.py and verify-dict-bank.py: the banks are evaluated IN
NODE, never regex-scraped, because a regex over a JS literal is how 57 items with a
nested object once vanished silently from a content.js parser.

What it refuses to let ship:
  * a word with no source, or a source that does not name the handout it came from
  * junk headwords — spaces, brackets, absurd length (the extractor produced all three)
  * a duplicate headword, accent-blind (sekôlô and sekolo are one word, not two)
  * a "minimal pair" whose options are not actually the same word bar the accents —
    that is the definition of the round, and a pair that fails it would teach nonsense
  * a Lediri drill whose stated answer is not in its own accept list
  * a Lediri drill built on a sentence that is not in that verb's grid — i.e. a shape
    the handout never printed, which would mean the app invented Setswana
  * CRLF or a BOM (core.autocrlf hides the first; Git Bash grep lies about it)
"""
import json, re, subprocess, sys, unicodedata
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parent.parent
problems = []
def fail(m): problems.append(m)

def deacc(w):
    return ''.join(c for c in unicodedata.normalize('NFD', w.lower())
                   if unicodedata.category(c) != 'Mn')

def load(fname, var):
    js = ("const fs=require('fs');"
          f"const v=eval(fs.readFileSync(process.argv[1],'utf8')+'; {var}');"
          "process.stdout.write(JSON.stringify(v));")
    r = subprocess.run(['node', '-e', js, str(ROOT / fname)],
                       capture_output=True, text=True, encoding='utf-8')
    if r.returncode != 0:
        print(f'{fname} would not evaluate in node:\n{r.stderr}')
        sys.exit(1)
    return json.loads(r.stdout)

def check_bytes(fname):
    d = (ROOT / fname).read_bytes()
    if d.count(b'\r'):
        fail(f'{fname} has {d.count(chr(13).encode())} CR bytes — this repo is LF-only')
    if d[:3] == b'\xef\xbb\xbf':
        fail(f'{fname} starts with a UTF-8 BOM')

# ── 🔊 Medumo ────────────────────────────────────────────────────────────────────────
sets = load('medumo-bank.js', 'RL_MEDUMO')
pairs = load('medumo-bank.js', 'RL_MEDUMO_PAIRS')
check_bytes('medumo-bank.js')

seen = {}
words = 0
for s in sets:
    if not re.fullmatch(r'md\d\d', s['id']):
        fail(f"set id {s['id']!r} is not mdNN")
    if not s.get('words'):
        fail(f"set {s['id']} has no words")
    if len(s['words']) > 5:
        fail(f"set {s['id']} has {len(s['words'])} words — a set is at most five")
    for w in s['words']:
        words += 1
        where = f"{s['id']}/{w.get('t')!r}"
        if not w.get('t') or not w.get('e'):
            fail(f'{where}: missing the Setswana or the gloss')
            continue
        if ' ' in w['t'] or re.search(r'[()\[\]]', w['t']) or len(w['t']) > 16:
            fail(f'{where}: that is not a headword — the extractor ran into his prose')
        if 'zerwick-2024' not in (w.get('src') or []):
            fail(f'{where}: every Medumo word must name the handout it came from')
        k = deacc(w['t'])
        if k in seen:
            fail(f"{where}: duplicate of {seen[k]} once the accents are stripped")
        seen[k] = where

for p in pairs:
    opts = p.get('opts') or []
    if len(opts) < 2:
        fail(f"pair {p.get('id')}: needs at least two spellings to choose between")
        continue
    if opts[0]['e'] != p['ask']:
        fail(f"pair {p['id']}: the asked meaning must be opts[0] — the round grades on that")
    base = deacc(opts[0]['t'])
    for o in opts[1:]:
        if deacc(o['t']) != base:
            fail(f"pair {p['id']}: {o['t']!r} is not the same word as {opts[0]['t']!r} "
                 "with the accents stripped — that is not a minimal pair")
    if len({o['t'] for o in opts}) != len(opts):
        fail(f"pair {p['id']}: two options are spelled identically")
    for o in opts:
        if not o.get('src'):
            fail(f"pair {p['id']}: option {o['t']!r} has no source")
    if not re.search(r'[êôÊÔ]', ''.join(o['t'] for o in opts)):
        fail(f"pair {p['id']}: no option carries a circumflex — nothing to tell apart")

# ── 🗣️ Lediri ────────────────────────────────────────────────────────────────────────
verbs = load('lediri-bank.js', 'RL_LEDIRI')
check_bytes('lediri-bank.js')

if len(verbs) != 2:
    fail(f'{len(verbs)} verbs — the handout paradigms exactly two (sega, raga). A third '
         'means forms were generated. Her ruling 2026-09-01: ship only what he wrote.')
for v in verbs:
    grid = {g['tsw'] for g in v.get('grid') or []}
    if not grid:
        fail(f"verb {v.get('id')}: no grid")
    if 'zerwick-commands-2024' not in (v.get('src') or []):
        fail(f"verb {v['id']}: must name the Commands handout as its source")
    for d in v.get('drills') or []:
        if d['from'] not in grid:
            fail(f"{d['id']}: builds on {d['from']!r}, which is not in {v['id']}'s grid")
        if d['answer'] not in grid:
            fail(f"{d['id']}: answer {d['answer']!r} is not a line the handout prints — "
                 'a drill may only ask for a shape he actually wrote')
        if not any(deacc(a) == deacc(d['answer'].rstrip('!?.')) for a in d['accept']):
            fail(f"{d['id']}: its own answer {d['answer']!r} is not in its accept list")
        if not d.get('why'):
            fail(f"{d['id']}: no explanation — a reveal with no reason teaches nothing")

odd = [g for v in verbs for g in v['grid'] if g.get('handoutOdd')]
if len(odd) != 1:
    fail(f'{len(odd)} rows flagged handoutOdd — expected exactly the one the handout '
         'prints without its circumflex (Se segeng ka sekere!). If his table was '
         'retyped, re-check it against the PDF rather than adjusting this number.')
elif odd[0]['tsw'] != 'Se segeng ka sekere!':
    fail(f"handoutOdd is on {odd[0]['tsw']!r} — expected 'Se segeng ka sekere!'")

print(f'\U0001F50A Medumo: {words} words in {len(sets)} sets, {len(pairs)} minimal pairs')
print(f'\U0001F5E3️  Lediri: {len(verbs)} verbs, '
      f"{sum(len(v['grid']) for v in verbs)} printed shapes, "
      f"{sum(len(v['drills']) for v in verbs)} build-it-yourself drills")
if problems:
    print(f'\nFAILED — {len(problems)} problem(s):')
    for m in problems:
        print('  ✗ ' + m)
    sys.exit(1)
print('\nOK — Medumo + Lediri banks green.')
