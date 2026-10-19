#!/usr/bin/env python3
"""Ship gate for 📝 Tiro 3, the quiz-words drill tab (SPEC-tiro3-tab.md §4).

Run:  python toolkit/verify-tiro3-bank.py
Exit 0 = green. Any failure is a ship blocker.

It evaluates tiro3-bank.js in node (the standing rule: the gate sees exactly what the
app sees, never a regex parse of the file) and checks:
  * ids unique and prefixed t3-; round ids unique; every round has cards
  * every card has a non-empty `src` array
  * word/phrase cards: non-empty tsw and eng, `alt` is an array
  * NO INVENTED SETSWANA: every tsw, and every alt, occurs accent-blind and on word
    boundaries in at least one of: corpus/zerwick-quiz-2024.txt (his practice quiz), the
    Smart Guide full text, content.js, or any corpus/**/*.txt (audio/zip/pdf skipped).
    The sources are checked in that order and the first hit wins, so the cheap, trusted
    ones answer most cards before the big corpus files are even opened.
  * quiz cards: a question, 2+ options, and either a valid `answer` index or
    `pending: true` (with `answer: null`, so the app can never show a confident tick)
  * no card string contains a name from corpus/private-names.txt (one per line, local
    and gitignored, because writing the names here would publish them: PUBLIC repo)
  * the file is LF, UTF-8, no BOM
SPEC §6 addendum (2026-10-19 evening, the Smart Guide's nine word-list rounds):
  * the 7 ORIGINAL rounds keep their ids, order, card ids and strings EXACTLY (hard-coded
    below from the bank as shipped in 167a617), so a rebuild can never reset her progress;
    the 9 guide rounds follow them in SPEC §6 order
  * ONE card per Setswana string across the whole bank: a duplicate tsw (accent-blind,
    the same fold() the source check uses) in any two rounds fails
  * every phrase card in the 9 guide rounds is copied from the guide's own lines (p83,
    p87 to 89), so it must be found in the Smart Guide text itself, verbatim accent-blind,
    not merely somewhere in the corpus
Then it prints how many cards resolve audio by the same rule as the app's tiro3Aud():
the first lesson card in content.js whose norm(tsw) equals this card's and has `audio`.
"""
import json
import re
import subprocess
import sys
import unicodedata
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

ROOT = Path(__file__).resolve().parent.parent
BANK = 'tiro3-bank.js'
QUIZ = ROOT / 'corpus' / 'zerwick-quiz-2024.txt'
GUIDE = Path(r'C:\Users\megzi\Desktop\NWU Semester 2\SECL121\Resources\smart-guide-full-text.md')
NAMES = ROOT / 'corpus' / 'private-names.txt'
SKIP_DIRS = {'audio'}
problems = []

# Two SPEC rows are knowingly not printed verbatim anywhere; the SPEC keeps them and says
# why. For these cards the gate checks the ATTESTED pieces instead of the whole string
# (the CORPUS_STEM move from verify-ass1-bank.py), so the exception is declared, narrow,
# and still fails if a piece is ever edited.
DECLARED = {
    't3-ani-19': (['ntšwa a bogola', 'e a bogola'],
                  'the guide prints "Ntšwa a bogola" (p87), his quiz "Pitse e a bogola"; '
                  'the card keeps the e-concord the app teaches (SPEC §3)'),
    't3-mad-18': (['e a lla'],
                  'his quiz prints "Tlou e a lla"; go + verb is the shape of every verb card'),
    # SPEC §6: four verbs the guide prints only as a bare stem in its word lists (p68 and
    # p84, one word per line), so "go <stem>" occurs nowhere; the stem itself is checked.
    't3-kit-20': (['faga'], "the guide's kitchen-verb list prints the bare stem (p84); go + verb is the card shape"),
    't3-kit-21': (['borai'], "the guide's kitchen-verb list prints the bare stem (p84); go + verb is the card shape"),
    't3-dil-38': (['sitwa'], "the guide's classroom verb list prints the bare stem (p68); go + verb is the card shape"),
    't3-dil-39': (['kgotlhola'], "the guide's classroom verb list prints the bare stem (p68); go + verb is the card shape"),
}


# The seven rounds as shipped on 2026-10-19 (commit 167a617), hard-coded so the gate fails
# if any id or string under them ever changes: her rl_tiro3 progress is keyed by these ids.
# (card id, tsw) for word/phrase cards, (card id, q) for the grammar round.
ORIGINAL = {
    'ani': [
        ('t3-ani-01', 'kgomo'),
        ('t3-ani-02', 'nku'),
        ('t3-ani-03', 'kolobe'),
        ('t3-ani-04', 'koko'),
        ('t3-ani-05', 'tlou'),
        ('t3-ani-06', 'pitse'),
        ('t3-ani-07', 'podi'),
        ('t3-ani-08', 'tau'),
        ('t3-ani-09', 'ntšwa'),
        ('t3-ani-10', 'katse'),
        ('t3-ani-11', 'nonyane'),
        ('t3-ani-12', 'kgabo'),
        ('t3-ani-13', 'legakabe'),
        ('t3-ani-14', 'serurubele'),
        ('t3-ani-15', 'notshe'),
        ('t3-ani-16', 'phologolo'),
        ('t3-ani-17', 'pholo'),
        ('t3-ani-18', 'Tlou e tlerebetsa.'),
        ('t3-ani-19', 'Ntšwa e a bogola.'),
        ('t3-ani-20', 'Koko e lela.'),
    ],
    'dij': [
        ('t3-dij-01', 'dijo'),
        ('t3-dij-02', 'nama'),
        ('t3-dij-03', 'bogobe'),
        ('t3-dij-04', 'borotho'),
        ('t3-dij-05', 'mašwi'),
        ('t3-dij-06', 'metsi'),
        ('t3-dij-07', 'tlhapi'),
        ('t3-dij-08', 'perekisi'),
        ('t3-dij-09', 'apole'),
        ('t3-dij-10', 'tapole'),
        ('t3-dij-11', 'dinawa'),
        ('t3-dij-12', 'merogo'),
        ('t3-dij-13', 'maungo'),
        ('t3-dij-14', 'lephutse'),
        ('t3-dij-15', 'magapu'),
        ('t3-dij-16', 'segwapa'),
    ],
    'sek': [
        ('t3-sek-01', 'buka'),
        ('t3-sek-02', 'dibuka'),
        ('t3-sek-03', 'letlapa la tshoko'),
        ('t3-sek-04', 'lekwalo'),
        ('t3-sek-05', 'setulo'),
        ('t3-sek-06', 'setlhare'),
        ('t3-sek-07', 'koloi'),
        ('t3-sek-08', 'lesaka'),
        ('t3-sek-09', 'morutabana'),
        ('t3-sek-10', 'barutwana'),
        ('t3-sek-11', 'modiri'),
        ('t3-sek-12', 'mothusi'),
        ('t3-sek-13', 'moagi'),
        ('t3-sek-14', 'Tlisa dibuka!'),
        ('t3-sek-15', 'Se tlisê bolo!'),
        ('t3-sek-16', 'Reetsang barutwana!'),
        ('t3-sek-17', 'Arabang dipotso!'),
        ('t3-sek-18', 'Araba potso!'),
        ('t3-sek-19', 'Raga bolo!'),
        ('t3-sek-20', 'Bula buka!'),
    ],
    'mme': [
        ('t3-mme-01', 'nko'),
        ('t3-mme-02', 'tsebe'),
        ('t3-mme-03', 'molomo'),
        ('t3-mme-04', 'tlhogo'),
        ('t3-mme-05', 'seatla'),
        ('t3-mme-06', 'matlho'),
        ('t3-mme-07', 'mala'),
        ('t3-mme-08', 'hutse'),
        ('t3-mme-09', 'Ke a lwala.'),
        ('t3-mme-10', 'Ke ja ka molomo.'),
        ('t3-mme-11', 'Ke leba ka matlho a me.'),
    ],
    'bat': [
        ('t3-bat-01', 'Dumela'),
        ('t3-bat-02', 'Dumelang'),
        ('t3-bat-03', 'Sala sentle'),
        ('t3-bat-04', 'Salang sentle'),
        ('t3-bat-05', 'tshwarelo'),
        ('t3-bat-06', 'tswee-tswee'),
        ('t3-bat-07', 'Leina la gago ke mang?'),
        ('t3-bat-08', 'Nthuse tswee-tswee!'),
        ('t3-bat-09', 'nkgono'),
        ('t3-bat-10', 'mmangwane'),
        ('t3-bat-11', 'rakgadi'),
        ('t3-bat-12', 'mme'),
        ('t3-bat-13', 'abuti'),
        ('t3-bat-14', 'monna'),
        ('t3-bat-15', 'banna'),
        ('t3-bat-16', 'mosadi'),
        ('t3-bat-17', 'basadi'),
        ('t3-bat-18', 'basetsana'),
        ('t3-bat-19', 'motho'),
        ('t3-bat-20', 'batho'),
    ],
    'mad': [
        ('t3-mad-01', 'go tsamaya'),
        ('t3-mad-02', 'go bina'),
        ('t3-mad-03', 'go tshameka'),
        ('t3-mad-04', 'go ja'),
        ('t3-mad-05', 'go nwa'),
        ('t3-mad-06', 'go reka'),
        ('t3-mad-07', 'go rekisa'),
        ('t3-mad-08', 'go robala'),
        ('t3-mad-09', 'go leba'),
        ('t3-mad-10', 'go utlwa'),
        ('t3-mad-11', 'go reetsa'),
        ('t3-mad-12', 'go tlisa'),
        ('t3-mad-13', 'go kwala'),
        ('t3-mad-14', 'go bula'),
        ('t3-mad-15', 'go araba'),
        ('t3-mad-16', 'go thusa'),
        ('t3-mad-17', 'go bogola'),
        ('t3-mad-18', 'go lla'),
        ('t3-mad-19', 'go ithuta'),
        ('t3-mad-20', 'go ruta'),
        ('t3-mad-21', 'go aga'),
        ('t3-mad-22', 'go dira'),
    ],
    'thu': [
        ('t3-thu-01', 'Concord -tlaa- represents which tense?'),
        ('t3-thu-02', 'Class 1 in Setswana grammar is…'),
        ('t3-thu-03', 'What words are in the Le- Ma- noun class?'),
        ('t3-thu-04', 'Which sentence is NOT in the plural?'),
        ('t3-thu-05', 'This sentence is incorrect.'),
        ('t3-thu-06', 'What part of the word motho determines its noun class and plural?'),
        ('t3-thu-07', '-ile is a concord used in the past tense.'),
        ('t3-thu-08', 'The word MOAGI is an example of a deverbative.'),
        ('t3-thu-09', 'Nouns in noun class number 9 are the nouns without a prefix.'),
        ('t3-thu-10', 'In Setswana the noun setulo does not have a prefix.'),
        ('t3-thu-11', 'Vegetables are called maungo.'),
        ('t3-thu-12', 'School bus in Setswana is "sekolo sa bese".'),
        ('t3-thu-13', 'A teacher in Setswana is "morutangana".'),
        ('t3-thu-14', 'Pitse e a bogola. Is the fact true or not?'),
        ('t3-thu-15', 'Translation for an elephant trumpet in Setswana is "Tlou e a lla".'),
        ('t3-thu-16', '"Ke tla tlisa dibuka" means "I will write the book".'),
        ('t3-thu-17', '"I want to learn Setswana" = "Ke batla go ruta Setswana".'),
    ],
}
GUIDE_ROUNDS = ['mau', 'kit', 'nag', 'pol', 'dil', 'meb', 'nak', 'dip', 'bop']


def fail(m):
    problems.append(m)


def load(fname, expr):
    js = ("const fs=require('fs');"
          f"const v=eval(fs.readFileSync(process.argv[1],'utf8')+'; {expr}');"
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
        fail(f'{fname} has {d.count(bytes([13]))} CR bytes — this repo is LF-only')
    if d[:3] == b'\xef\xbb\xbf':
        fail(f'{fname} starts with a UTF-8 BOM')
    try:
        d.decode('utf-8')
    except UnicodeDecodeError as e:
        fail(f'{fname} is not valid UTF-8: {e}')


def fold(s):
    """Accent-blind, case-blind fold for SEARCHING. NFD then drop the combining marks,
    which also folds the guide dump's stray U+0207/U+020F (ȇ/ȏ) to e/o."""
    s = unicodedata.normalize('NFD', s)
    s = ''.join(ch for ch in s if not unicodedata.combining(ch))
    s = s.replace('\u2019', "'").replace('\u2018', "'")
    return re.sub(r'\s+', ' ', s).lower()


def app_norm(s):
    """Mirror of index.html norm(): the rule tiro3Aud() matches cards by."""
    s = unicodedata.normalize('NFD', s.lower())
    s = re.sub(r'[\u0300-\u036f]', '', s)
    s = re.sub(r'[/\-\u2013\u2014]', ' ', s)
    s = re.sub(r'[^a-z0-9\s]', '', s)
    return re.sub(r'\s+', ' ', s).strip()


def needle_of(s):
    # a phrase card ends in his punctuation; the sources may not
    return fold(s).strip().rstrip('.!?').strip()


def pattern(needle):
    return re.compile(r'(?<![\w])' + re.escape(needle) + r'(?![\w])')


# ── load ────────────────────────────────────────────────────────────────────────────
for p, why in ((QUIZ, 'run toolkit/docx-to-txt.py on his practice quiz .docx once'),
               (GUIDE, 'the Smart Guide full-text dump lives with the SECL121 resources'),
               (NAMES, 'one name per line, local only (corpus/ is gitignored)')):
    if not p.exists():
        print(f'MISSING: {p}\n  {why}')
        sys.exit(1)

bank = load(BANK, 'RL_TIRO3')
check_bytes(BANK)
lessons = load('content.js',
               '(()=>{const o=[];for(const u of RL_CONTENT.units)for(const l of u.lessons)'
               'for(const it of l.items)o.push({id:it.id,tsw:it.tsw||"",audio:it.audio||null});return o;})()')

rounds = bank.get('rounds') or []
want_rounds = list(ORIGINAL) + GUIDE_ROUNDS
if [r.get('id') for r in rounds] != want_rounds:
    fail(f'rounds must be {want_rounds} in that order (the quiz weight, then SPEC §6), '
         f'found {[r.get("id") for r in rounds]}')

# ── the seven original rounds are frozen ────────────────────────────────────────────
by_id = {r.get('id'): r for r in rounds}
for rid, want in ORIGINAL.items():
    got = [(c.get('id'), c.get('tsw') or c.get('q')) for c in (by_id.get(rid) or {}).get('cards') or []]
    if got != want:
        diff = [f'{w} -> {g}' for w, g in zip(want, got) if w != g][:3]
        fail(f'round {rid}: the original cards changed (her progress is keyed by these ids): '
             f'{len(want)} expected, {len(got)} found; first differences {diff}')

cards = []
for r in rounds:
    if not r.get('cards'):
        fail(f"round {r.get('id')}: no cards")
    for c in r.get('cards') or []:
        cards.append((r['id'], c))

# ── shape ───────────────────────────────────────────────────────────────────────────
seen = set()
for rid, c in cards:
    cid = c.get('id', '?')
    if not re.fullmatch(rf't3-{rid}-\d\d', cid):
        fail(f'{cid}: id must be t3-{rid}-NN')
    if cid in seen:
        fail(f'{cid}: duplicate id')
    seen.add(cid)
    src = c.get('src')
    if not isinstance(src, list) or not src or not all(isinstance(s, str) and s for s in src):
        fail(f'{cid}: src must be a non-empty array of source ids')
    kind = c.get('kind')
    if rid == 'thu':
        if kind != 'quiz':
            fail(f'{cid}: the grammar round is pick-only, kind must be quiz')
            continue
        opts = c.get('options')
        if not c.get('q'):
            fail(f'{cid}: no question text')
        if not isinstance(opts, list) or len(opts) < 2:
            fail(f'{cid}: needs 2+ options')
            continue
        if c.get('pending') is True:
            if c.get('answer') is not None:
                fail(f'{cid}: pending cards carry answer: null (no confident tick before his memo)')
        elif not (isinstance(c.get('answer'), int) and 0 <= c['answer'] < len(opts)):
            fail(f'{cid}: answer {c.get("answer")!r} is not a valid option index')
        if not c.get('why'):
            fail(f'{cid}: no why line')
    else:
        if kind not in ('word', 'phrase'):
            fail(f'{cid}: kind must be word or phrase, found {kind!r}')
        if not c.get('tsw') or not c.get('eng'):
            fail(f'{cid}: tsw and eng are both required')
        if not isinstance(c.get('alt'), list):
            fail(f'{cid}: alt must be an array (empty is fine)')

# ── one card per Setswana string, across every round ───────────────────────────────
first = {}
for rid, c in cards:
    if c.get('kind') == 'quiz' or not c.get('tsw'):
        continue
    k = needle_of(c['tsw'])
    if k in first:
        fail(f"{c['id']}: {c['tsw']!r} is already a card ({first[k]}) — one card per Setswana string")
    else:
        first[k] = c['id']

pending = [c['id'] for _r, c in cards if c.get('pending') is True]
if pending != ['t3-thu-09', 't3-thu-15']:
    fail(f'pending cards must be exactly t3-thu-09 and t3-thu-15 (SPEC §2), found {pending}')

# ── no invented Setswana ────────────────────────────────────────────────────────────
need = {}   # needle -> [card ids]
for _r, c in cards:
    if c.get('kind') == 'quiz':
        continue
    if c['id'] in DECLARED:
        for piece in DECLARED[c['id']][0]:
            need.setdefault(needle_of(piece), []).append(c['id'] + ' (declared piece)')
        continue
    for s in [c['tsw']] + list(c.get('alt') or []):
        need.setdefault(needle_of(s), []).append(c['id'])

found_in = {}
tiers = [('his quiz', [QUIZ]), ('the Smart Guide', [GUIDE]), ('content.js', [ROOT / 'content.js'])]
corpus_txt = sorted(p for p in (ROOT / 'corpus').rglob('*.txt')
                    if not (SKIP_DIRS & set(p.relative_to(ROOT / 'corpus').parts[:-1])) and p != QUIZ)
tiers.append(('corpus/', corpus_txt))
for label, files in tiers:
    left = [n for n in need if n not in found_in]
    if not left:
        break
    for f in files:
        left = [n for n in left if n not in found_in]
        if not left:
            break
        text = fold(f.read_text(encoding='utf-8', errors='replace'))
        for n in left:
            if pattern(n).search(text):
                found_in[n] = label

guide_text = fold(GUIDE.read_text(encoding='utf-8', errors='replace'))
guide_phrases = [c for rid, c in cards if rid in GUIDE_ROUNDS and c.get('kind') == 'phrase']
for c in guide_phrases:
    if not pattern(needle_of(c['tsw'])).search(guide_text):
        fail(f"{c['id']}: phrase {c['tsw']!r} is not in the Smart Guide verbatim (accent-blind); "
             'the §6 phrases are copied from its own lines')

for n, ids in need.items():
    if n not in found_in:
        fail(f'{", ".join(ids)}: {n!r} is in none of his quiz, the Smart Guide, content.js or '
             'corpus/ — no invented Setswana')

# ── no names (PUBLIC repo) ──────────────────────────────────────────────────────────
names = [fold(l).strip() for l in NAMES.read_text(encoding='utf-8').splitlines()
         if l.strip() and not l.lstrip().startswith('#')]
if not names:
    fail('corpus/private-names.txt is empty — the name check would check nothing')
for _r, c in cards:
    strings = [c.get(k) or '' for k in ('tsw', 'eng', 'note', 'q', 'why')]
    strings += list(c.get('alt') or []) + list(c.get('options') or [])
    blob = fold(' | '.join(strings))
    for nm in names:
        if pattern(nm).search(blob):
            fail(f"{c['id']}: contains a private name (see corpus/private-names.txt)")

# ── audio, by the tiro3Aud() rule ───────────────────────────────────────────────────
def aud(c):
    # main spelling first, then the accepted alternatives: the app's tiro3Aud() since 322b804
    for s in [c.get('tsw') or ''] + list(c.get('alt') or []):
        t = app_norm(s)
        for it in lessons:
            if it['tsw'] and it['audio'] and app_norm(it['tsw']) == t:
                return it['audio']
    return None

word_cards = [c for _r, c in cards if c.get('kind') != 'quiz']
voiced = [c for c in word_cards if aud(c)]

# ── report ──────────────────────────────────────────────────────────────────────────
print(f'\U0001F4DD Tiro 3: {len(cards)} cards in {len(rounds)} rounds')
for r in rounds:
    print(f"    {r.get('emoji', '')} {r['id']}  {r.get('title', '')}: {len(r.get('cards') or [])}")
by = {}
for n, lab in found_in.items():
    by[lab] = by.get(lab, 0) + 1
print(f'    {len(need)} Setswana strings (tsw + alt), sourced: '
      + ', '.join(f'{v} in {k}' for k, v in by.items()))
for cid, (pieces, why) in DECLARED.items():
    if cid not in seen:
        fail(f'{cid}: declared in DECLARED but not in the bank — drop the exception')
    print(f'    declared: {cid} checks {pieces} ({why})')
print(f'    audio resolves for {len(voiced)} of {len(word_cards)} word/phrase cards '
      f'(the other {len(word_cards) - len(voiced)} show 🔇)')
print(f'    {len(guide_phrases)} guide-round phrases found verbatim in the Smart Guide; '
      f'{len(first)} distinct Setswana strings, no duplicates across rounds' if len(first) == len(word_cards)
      else f'    duplicate tsw across rounds (see failures)')
print(f'    original 7 rounds: {sum(len(v) for v in ORIGINAL.values())} card ids frozen')
print(f'    grammar round: {sum(1 for _r, c in cards if c.get("kind") == "quiz")} quiz cards, '
      f'pending {", ".join(pending)}')
if problems:
    print(f'\nFAILED — {len(problems)} problem(s):')
    for m in problems:
        print('  ✗ ' + m)
    sys.exit(1)
print('\nOK — Tiro 3 bank green.')
