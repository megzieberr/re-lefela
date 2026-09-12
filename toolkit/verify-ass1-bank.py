#!/usr/bin/env python
"""Ship gate for ass1-bank.js — 📼 Tiro 1, the SECL121 Assignment 1 tab (2026-09-11).

Same bar as verify-medumo-bank.py and verify-forms-data.py: the bank is evaluated IN
NODE, never regex-scraped. A regex over a JS literal is how 57 items with a nested
object once vanished silently from a content.js parser.

What it refuses to let ship:
  * a Setswana string that is not in the lecturer's own documents. Every `tsw` must
    occur in corpus/zerwick-ass1-2026.txt (the Assignment 1 .docx + his Phakwe le
    Mokoko story .docx, extracted once, gitignored like his other handouts). The match
    is ACCENT-EXACT — rêka must be rêka — and case-insensitive, because his word list
    prints Llere / Monna / Rre / Phiri capitalised at the start of a table row while
    the cards carry the plain word. Three cards check a declared stem instead, because
    the assignment itself prints a placeholder there (see CORPUS_STEM).
  * a card pointing at audio that is not on disk — `audio` (speaker one) or `audio2`
    (the second speaker, added 2026-09-12). Every card must carry `audio2`: she
    ear-checked all 48 v2 clips, so a card without one is a card that lost its file.
  * a1w-17 carrying `audio`. The FIRST speaker's take is clipped at source and wiring
    any v1 file to it would ship the buzz her ear rejected. It is no longer silent,
    though: the second speaker's take was ear-checked and kept, so it must have
    `audio2` — the card plays v2 whichever voice is selected.
  * the natural-pace read-through going missing, or growing a v1 file. This rule is the
    INVERSE of the 2026-09-11 one: the first speaker's tape holds one reading, slow, and
    always will, but the second speaker recorded a natural-pace read-through too. So
    `whole.nat` must EXIST, must carry `audio2`, and must never carry `audio`.
  * a phrase card whose text changed but whose old v1 clip is still wired to it. Four of
    the seven phrases were re-cut to different words on 2026-09-12; the mp3 sitting at
    their old filename says the OLD phrase. They carry `audio2` only, and this gate pins
    that — it is the one place in this bank where a wrong file would play a learner
    something other than what the card shows.
  * an intro line that lost its app audio. Five of the eight reuse clips the app
    already ships (a1i-02/03/06) or name-free cuts of them (a1i-04/05) — that is what
    keeps a name out of this public repo, so it is checked, not assumed.
  * a chunk whose words do not join back into the chunk, or a story card whose chunks
    do not join back into its sentence. That is the check that stops a word being
    silently dropped from the teach step — the whole point of the round is that every
    word gets glossed.
  * readOnly on the wrong cards. Exactly four: the two surnames, plus yoo and yole,
    which he never glosses. A readOnly card is never quizzed on a meaning nobody wrote.
  * CRLF or a BOM (core.autocrlf hides the first; Git Bash grep lies about it)
"""
import json, re, subprocess, sys, unicodedata
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parent.parent
problems = []
def fail(m): problems.append(m)

BANK = 'ass1-bank.js'
CORPUS = ROOT / 'corpus' / 'zerwick-ass1-2026.txt'

# The assignment prints a placeholder where the card carries the real line, so these
# three check the stem he actually typed rather than the whole sentence.
CORPUS_STEM = {
    'a1i-04': ('Leina la me ke', 'the .docx prints "Leina la me ke (YOUR NAME)"'),
    'a1i-05': ('Sefane sa me ke', 'the .docx prints "Sefane sa me ke (YOUR SURNAME)"'),
}
READ_ONLY = {'a1w-08', 'a1w-10', 'a1w-18', 'a1w-19'}
# no v1 take exists / may be used: yô was spoiled at the microphone. It still gets audio2.
V1_SILENT = {'a1w-17'}
# The seven phrase cards, after she practised against the first eight and picked again
# (2026-09-12): id, her text, and whether the v1 clip at items/<id>.mp3 still says it.
# The four False ones were re-cut to DIFFERENT words — their old mp3 is a wrong-clip trap.
PHRASES = [
    ('a1s-p01', 'Ga twe bogologolo', True),
    ('a1s-p02', 'fa ba ya go sela tsie', True),
    ('a1s-p03', 'e ne e le ditsala', False),
    ('a1s-p04', 'Ka letsatsi le lengwe', False),
    ('a1s-p05', 'fa ba ntse', False),
    ('a1s-p06', 'Nna ke na le lemao', True),
    ('a1s-p07', 'Nna ga ke na lemao', False),
]
# the five lines that must keep reusing audio the app already ships
APP_WIRED = {'a1i-02': 'items/u1l2-02.mp3', 'a1i-03': 'items/u1l1-01.mp3',
             'a1i-06': 'items/u1l2-09.mp3',
             'a1i-04': 'items/a1i-04.mp3', 'a1i-05': 'items/a1i-05.mp3'}


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


def norm(s):
    """Fold for matching: accents KEPT, case folded, curly quotes straightened,
    the space his typing leaves before a colon removed, whitespace collapsed."""
    s = unicodedata.normalize('NFC', s)
    s = s.replace('’', "'").replace('‘', "'")
    s = s.replace('“', '"').replace('”', '"')
    s = s.replace('–', '-').replace('—', '-')
    s = re.sub(r'\s+([,.:;!?])', r'\1', s)
    return re.sub(r'\s+', ' ', s).strip().lower()


def words_only(s):
    """Just the word sequence — punctuation gone. Used where two spellings of the same
    sentence differ only by his commas and quote marks."""
    s = norm(s)
    return re.sub(r'\s+', ' ', re.sub(r"[^\w\s'\-]", ' ', s)).strip()


if not CORPUS.exists():
    print(f'MISSING: {CORPUS}\nExtract it once from the Assignment 1 .docx and his '
          'Phakwe le mokoko story .docx (it stays gitignored, like his other handouts).')
    sys.exit(1)
CORPUS_TEXT = norm(CORPUS.read_text(encoding='utf-8'))

bank = load(BANK, 'RL_ASS1')
check_bytes(BANK)

words, intro, story, phrases = bank['words'], bank['intro'], bank['story'], bank['phrases']
allcards = words + intro + story + phrases

# ── shape ────────────────────────────────────────────────────────────────────────────
for name, got, want in (('words', len(words), 23), ('intro', len(intro), 8),
                        ('story', len(story), 8), ('phrases', len(phrases), 7)):
    if got != want:
        fail(f'{name}: {got} cards, expected {want} — 46 cards in all since the phrase '
             'set was re-picked (2026-09-12)')

seen = {}
for c in allcards:
    cid = c.get('id')
    if not cid:
        fail('a card with no id')
        continue
    if cid in seen:
        fail(f'duplicate id {cid}')
    seen[cid] = c
    if not c.get('tsw'):
        fail(f'{cid}: no Setswana')
    if not c.get('src'):
        fail(f'{cid}: no source — every string traces to one of his documents')

# ── the two whole-story read-throughs ────────────────────────────────────────────────
# INVERTED 2026-09-12. `slow` exists in both voices. `nat` exists ONLY in v2 — the first
# speaker's tape holds the slow reading and nothing else (her ruling 2026-09-11), so a v1
# file on `nat` would mean someone wired a clip that does not exist.
whole = bank.get('whole') or {}
for key, want_v1, want_v2 in (('slow', 'items/a1s-slow.mp3', 'items/a1s-slow-v2.mp3'),
                              ('nat', None, 'items/a1s-nat-v2.mp3')):
    w = whole.get(key)
    if not isinstance(w, dict):
        fail(f'whole.{key} is missing or is not a {{audio, audio2}} object — found {w!r}')
        continue
    if w.get('audio') != want_v1:
        fail(f'whole.{key}.audio must be {want_v1!r}, found {w.get("audio")!r}'
             + (' — the first speaker never recorded a natural-pace reading'
                if key == 'nat' else ''))
    if w.get('audio2') != want_v2:
        fail(f'whole.{key}.audio2 must be {want_v2!r}, found {w.get("audio2")!r}')
    for f in (w.get('audio'), w.get('audio2')):
        if f and not (ROOT / 'audio' / f).exists():
            fail(f'whole.{key}: audio/{f} is not on disk')

# ── audio, both voices ───────────────────────────────────────────────────────────────
# NO_V1 is the full list of cards allowed to have no `audio`: yô (spoiled take) plus the
# four phrases whose words changed. Everything else must have both fields, on disk.
NO_V1 = set(V1_SILENT) | {pid for pid, _t, keeps in PHRASES if not keeps}
v1, v2 = 0, 0
for c in allcards:
    a, a2 = c.get('audio'), c.get('audio2')
    if a:
        v1 += 1
        if c['id'] in NO_V1:
            fail(f"{c['id']}: must carry NO v1 audio, but is wired to {a!r} — "
                 + ('that take was clipped at source' if c['id'] in V1_SILENT
                    else 'the v1 clip at that filename says the OLD phrase'))
        elif not (ROOT / 'audio' / a).exists():
            fail(f"{c['id']}: audio/{a} is not on disk")
    elif c['id'] not in NO_V1:
        fail(f"{c['id']}: no v1 audio, and it is not one of the cards allowed none "
             f"({', '.join(sorted(NO_V1))})")
    if not a2:
        fail(f"{c['id']}: no audio2 — all 48 second-speaker clips were ear-checked and kept, "
             'so every card has one')
        continue
    v2 += 1
    if not (ROOT / 'audio' / a2).exists():
        fail(f"{c['id']}: audio/{a2} is not on disk")
for cid, want in APP_WIRED.items():
    got = (seen.get(cid) or {}).get('audio')
    if got != want:
        fail(f'{cid}: must reuse {want} (app audio / a name-free cut of it), found {got!r}')

# ── readOnly ─────────────────────────────────────────────────────────────────────────
ro = {c['id'] for c in allcards if c.get('readOnly')}
if ro != READ_ONLY:
    fail(f'readOnly is on {sorted(ro)} — expected exactly {sorted(READ_ONLY)} '
         '(the two surnames, plus yoo and yole, which he never glosses)')
for cid in READ_ONLY:
    c = seen.get(cid) or {}
    if cid in ('a1w-18', 'a1w-19') and 'no separate gloss' not in (c.get('eng') or ''):
        fail(f'{cid}: its gloss was filled in. He glosses only yô — inventing one here '
             'is inventing Setswana.')

# ── the phrase set she picked after practising (2026-09-12) ──────────────────────────
got_ph = [(p.get('id'), p.get('tsw')) for p in phrases]
want_ph = [(pid, tsw) for pid, tsw, _k in PHRASES]
if got_ph != want_ph:
    fail('the phrase set is not the one she picked on 2026-09-12.\n'
         f'      found  : {got_ph}\n      expected: {want_ph}')

# ── the lecturer's own words ─────────────────────────────────────────────────────────
def in_corpus(cid, tsw):
    stem = CORPUS_STEM.get(cid)
    needle = norm(stem[0]) if stem else norm(tsw).strip('"\'').rstrip('.,:;!?').strip('"\'')
    return needle in CORPUS_TEXT, needle

for c in allcards:
    ok, needle = in_corpus(c['id'], c['tsw'])
    if not ok:
        fail(f"{c['id']}: {c['tsw']!r} is not in corpus/zerwick-ass1-2026.txt "
             f'(looked for {needle!r}) — no invented Setswana, accents included')

# ── chunks: nothing may be dropped from the teach step ───────────────────────────────
chunks = 0
glossed = 0
for c in story:
    cs = c.get('chunks') or []
    if not cs:
        fail(f"{c['id']}: no chunks — the round has nothing to teach")
        continue
    joined = words_only(' '.join(ch['tsw'] for ch in cs))
    if joined != words_only(c['tsw']):
        fail(f"{c['id']}: the chunks do not rebuild the sentence.\n"
             f'      chunks   : {joined}\n      sentence : {words_only(c["tsw"])}')
    for ch in cs:
        chunks += 1
        if not ch.get('eng'):
            fail(f"{c['id']}: chunk {ch['tsw']!r} has no meaning")
        if not ch.get('src'):
            fail(f"{c['id']}: chunk {ch['tsw']!r} has no source")
        ws = ch.get('words') or []
        if not ws:
            fail(f"{c['id']}: chunk {ch['tsw']!r} lists no words")
            continue
        glossed += len(ws)
        if words_only(' '.join(w['w'] for w in ws)) != words_only(ch['tsw']):
            fail(f"{c['id']}: chunk {ch['tsw']!r} — its words do not rebuild it "
                 f"({' '.join(w['w'] for w in ws)!r}); a word would go unglossed")
        for w in ws:
            if not w.get('g'):
                fail(f"{c['id']}: {w['w']!r} in {ch['tsw']!r} has no gloss")

# ── sound families (the whole point of his word list) ────────────────────────────────
for w in words:
    if not w.get('sound'):
        fail(f"{w['id']}: no sound family — his list is organised by exactly that")

print(f'\U0001F4FC Tiro 1: {len(words)} words, {len(intro)} intro lines, '
      f'{len(story)} story sentences, {len(phrases)} phrases = {len(allcards)} cards')
print(f'    voice 1: {v1} / {len(allcards)} cards   voice 2: {v2} / {len(allcards)} cards')
print(f"    no v1 take, plays voice 2 in both modes: {', '.join(sorted(NO_V1))}")
print('    whole story: slow in both voices, natural pace in voice 2 only')
print(f'    {chunks} teaching chunks + {len(phrases)} phrases = {chunks + len(phrases)} '
      f'quiz pieces, {glossed} words glossed one by one')
print(f'    every Setswana string found in corpus/zerwick-ass1-2026.txt '
      f'({len(CORPUS_TEXT)} chars of his two documents)')
if problems:
    print(f'\nFAILED — {len(problems)} problem(s):')
    for m in problems:
        print('  ✗ ' + m)
    sys.exit(1)
print('\nOK — Tiro 1 bank green.')
