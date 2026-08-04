# Ship gate for dict-bank.js — same role as verify-builder-bank.py.
#
#   python toolkit/verify-dict-bank.py
#
# Exits 1 on any failure. Run before every push that touches the dictionary.
#
# What it pins, and why each check exists:
#   - shape/types, so a pipeline change cannot ship a malformed entry
#   - no duplicate (headword, part of speech): two entries that look identical to
#     a searcher but disagree on meaning
#   - every example genuinely contains its headword — the whole promise of the
#     panel is "here is this word used in a sentence"
#   - every example has an English translation and a known source tag
#   - no example is just the bare infinitive ("go ja" under ja)
#   - source tags are all known and legally cleared
#   - Python norm() still agrees with index.html's norm(); if the two drift, entries
#     that look distinct at build time collide in the browser's search
#   - LF-only, no BOM, by BINARY read (Git Bash grep strips CR and lies)

import json
import re
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from dict_common import ROOT, norm
from dict_lang import setswana_fraction, english_fraction

BANK = ROOT / 'dict-bank.js'
INDEX = ROOT / 'index.html'
# ⚠️ Three places must agree on the source-tag set: this pair, dict_common.py's
# SOURCE_LABELS, and DICT_SRC_LABEL in index.html. dbe-maths is reserved for the
# wave-2 DBE maths dictionary import.
KNOWN_SRC = {'app', 'pc', 'wikt', 'dbe-maths', 'desk', 'afwn'}
KNOWN_EX_SRC = {'app', 'pc', 'wikt', 'dbe-maths', 'autshumato', 'bible-nt', 'desk', 'afwn'}
# Sources whose example sentences ship WITHOUT an English translation.
UNTRANSLATED_EX_SRC = {'afwn'}

fails = []


def check(cond, msg):
    if not cond:
        fails.append(msg)
    return cond


def load_bank():
    """Read the bank the way the browser does — via node, not a regex."""
    out = subprocess.run(
        ['node', '-e',
         "const fs=require('fs');"
         "process.stdout.write(JSON.stringify(new Function("
         "fs.readFileSync(process.argv[1],'utf8')+'; return RL_DICT;')()));",
         str(BANK)],
        capture_output=True, text=True, encoding='utf-8')
    if out.returncode != 0:
        print('FAIL: dict-bank.js does not parse as JS:\n' + out.stderr)
        sys.exit(1)
    return json.loads(out.stdout)


def check_norm_agrees():
    """index.html's norm() and dict_common.norm() must agree.

    The panel searches with the browser's norm(); this pipeline de-duplicates with
    Python's. Drift means two entries can collide in search that looked distinct
    at build time — so pin the cases that actually differ between naive
    implementations (slashes, diacritics, punctuation, spacing).
    """
    cases = ['Ke a go rata', 'she/he', 'Ga ke itse', 'kgôna', 'Tlhôla  sentle',
             "what's", 'MADI', 'go-ja', 'ntša', 'Re teng, a lona le teng?']
    src = INDEX.read_text(encoding='utf-8')
    m = re.search(r'function norm\(s\)\{.*?\n\}', src, re.S)
    if not check(m, 'could not find norm() in index.html'):
        return
    out = subprocess.run(
        ['node', '-e', m.group(0) + ';process.stdout.write(JSON.stringify('
         + json.dumps(cases) + '.map(norm)));'],
        capture_output=True, text=True, encoding='utf-8')
    if not check(out.returncode == 0, 'node could not run index.html norm(): ' + out.stderr):
        return
    browser = json.loads(out.stdout)
    for case, got in zip(cases, browser):
        check(got == norm(case),
              f'norm() drift on {case!r}: browser={got!r} python={norm(case)!r}')


def main():
    raw = BANK.read_bytes()
    check(b'\r' not in raw, 'dict-bank.js contains CR — must be LF-only')
    check(not raw.startswith(b'\xef\xbb\xbf'), 'dict-bank.js starts with a BOM')

    bank = load_bank()
    check(isinstance(bank, list) and bank, 'RL_DICT is not a non-empty array')

    seen = {}
    for i, e in enumerate(bank):
        where = f'entry {i} ({e.get("t", "?")!r})'
        if not check(isinstance(e.get('t'), str) and e['t'].strip(), where + ': missing headword'):
            continue
        key = (norm(e['t']), e.get('p') or '')
        check(key not in seen, f'{where}: duplicate of entry {seen.get(key)} — same headword and part of speech')
        seen.setdefault(key, i)
        check(norm(e['t']), where + ': headword normalises to nothing (unsearchable)')
        check(isinstance(e.get('e'), list) and e['e'], where + ': no meanings')
        for m in e.get('e', []):
            letters = re.sub(r'[^a-zA-Z]', '', m or '')
            # "I" and "a" are real one-letter meanings (nna = I/me); anything else
            # one letter long is OCR debris, which is what this catches.
            check(isinstance(m, str) and (len(letters) >= 2 or letters.lower() in ('i', 'a')),
                  f'{where}: meaning {m!r} is not a word')
            # A meaning is an ENGLISH gloss. "Re ne re" (Setswana, "we were")
            # shipped as an English meaning of batla in the first build — a
            # misparsed conjugation table. The signal is Setswana-ness MINUS
            # English-ness: plain fraction alone flagged "to go" and "Go back",
            # because go/gape are real words in BOTH languages. "Re ne re"
            # scores 1.0 − 0.0; "to go" scores 0.5 − 0.5.
            if isinstance(m, str) and len(m.split()) >= 2:
                check(setswana_fraction(m) - english_fraction(m) < 0.5,
                      f'{where}: meaning {m!r} reads as Setswana, not an English gloss')
        for tag in e.get('s', []):
            check(tag in KNOWN_SRC, f'{where}: unknown source tag {tag!r}')
        check(e.get('s'), where + ': no source tag')
        for x in e.get('x', []):
            check(isinstance(x.get('t'), str) and x['t'].strip(), where + ': example with no Setswana')
            # Most sources are parallel corpora, so a missing translation there means
            # the miner dropped one and the check must stay loud. The African Wordnet
            # publishes Setswana usage sentences with no translation at all, so it is
            # exempt BY NAME — never by relaxing the rule for everyone.
            if x.get('s') in UNTRANSLATED_EX_SRC:
                check(not x.get('e'),
                      f'{where}: example {x.get("t")!r} from {x.get("s")} carries a '
                      'translation, but that source has none — check where it came from')
            else:
                check(isinstance(x.get('e'), str) and x['e'].strip(),
                      f'{where}: example {x.get("t")!r} has no English translation')
            check(x.get('s') in KNOWN_EX_SRC,
                  f'{where}: example has unknown source {x.get("s")!r}')
            # the example must actually show the word — allowing only the
            # alternate forms a source recorded (entry field `f`), never a form
            # the pipeline guessed. Multi-word forms are matched space-padded so
            # the match is token-anchored: a raw substring check would accept
            # "ke tla" inside "...bake tlaela..." (letters straddling two words),
            # passing an example that contains no such phrase at all — a hole
            # found in code review 2026-08-04.
            forms = {norm(e['t'])} | {norm(f) for f in e.get('f', [])}
            text = norm(x.get('t', ''))
            toks = set(text.split())
            padded = ' ' + text + ' '
            check(any(f in toks for f in forms)
                  or any(' ' in f and (' ' + f + ' ') in padded for f in forms),
                  f'{where}: example {x.get("t")!r} does not contain the headword')
            check(norm(x.get('t', '')) not in (norm(e['t']), 'go ' + norm(e['t'])),
                  f'{where}: example {x.get("t")!r} is just the bare infinitive')

    check_norm_agrees()

    if fails:
        print(f'FAIL — {len(fails)} problem(s):')
        for f in fails[:40]:
            print('  -', f)
        if len(fails) > 40:
            print(f'  … and {len(fails) - 40} more')
        sys.exit(1)
    ex = sum(len(e.get('x', [])) for e in bank)
    print(f'OK — {len(bank)} entries, {ex} examples, '
          f'{sum(1 for e in bank if e.get("k"))} human-checked, '
          f'{BANK.stat().st_size/1024:.0f} kB, LF-only, no BOM.')


if __name__ == '__main__':
    main()
