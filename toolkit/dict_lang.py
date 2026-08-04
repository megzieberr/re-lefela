# Language sniffing for the dictionary pipeline: "does this line look Setswana or
# English?" — built from corpora already on disk, no external dependency.
#
# WHY THIS EXISTS. toolkit/course-glossary.js pairs the Peace Corps course
# best-effort (Setswana line, then English line) and deliberately keeps rows it
# cannot pair, so nothing is silently dropped. That is right for a reference
# panel a human reads, but feeding those pairs straight into a dictionary produced
# visibly wrong entries on the first run (2026-08-04):
#
#     'not want'  -> ['They will']     both sides English, split mid-sentence
#     'sa batle'  -> ['O ne o']        both sides Setswana, split mid-sentence
#
# A learner cannot tell a wrong entry from a right one, so the fix is a filter
# that can PROVE a pair is the wrong shape and drop it, plus a parser that
# resyncs when the alternation breaks instead of shifting every later pair by one.
#
# Direction of evidence matters: we have a good Setswana lexicon (the Setswana NT
# plus the app's corpus-derived wordlist) and a good *common*-English lexicon (the
# English NT), but no broad English dictionary — "pencil" is in neither Bible. So
# we never demand positive proof of English; we demand
#   the Setswana side looks Setswana and is not common English, and
#   the English side does not look Setswana.
# That rejects both failures above without discarding legitimate rare English.

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
_TOKEN = re.compile(r"[a-zà-ÿ']+")
_cache = {}


def _words(text):
    return {t for t in _TOKEN.findall(text.lower()) if len(t) >= 2}


# The two Bibles' front-matter file is an English note about the recording script,
# in BOTH folders — including it would put "chapter", "verse", "audio" into the
# Setswana lexicon.
FRONT_MATTER = '_000_000_000_read.txt'

# ⚠️ toolkit/wordlist.js is deliberately NOT used here. It is built (wordlist.py)
# from the Setswana NT *plus the Peace Corps course*, and that course text is
# bilingual — so wordlist.js contains "table", "knife", "today", "tired". Feeding
# it in as a Setswana lexicon made the filter reject almost everything on the first
# run (765 of 774 Peace Corps rows, 2026-08-04). It is a fine spelling-suggestion
# list, which is what it was built for; it is not evidence of what is Setswana.


def _app_setswana_words():
    """Words from the app's own tsw: fields and sentence bank — Setswana by
    construction, since every one was human-checked into the course."""
    words = set()
    txt = (ROOT / 'content.js').read_text(encoding='utf-8')
    for m in re.finditer(r"tsw:\s*'([^']*)'", txt):
        words |= _words(m.group(1))
    sb = ROOT / 'toolkit' / 'sentence-bank.tsv'
    if sb.exists():
        for i, line in enumerate(sb.read_text(encoding='utf-8').splitlines()):
            if i == 0:
                continue
            cols = line.split('\t')
            if cols and cols[0].strip():
                words |= _words(cols[0])
    return words


def lexicons():
    """(english-only, setswana-only) word sets. Built once per process.

    Exclusive by construction: a word in both Bibles (proper nouns like "Jesu",
    loanwords) is evidence of nothing, so it is removed from both sides — EXCEPT
    when the app's own checked course vocabulary vouches for it as Setswana.
    Without that rescue, short common words like "re" (we) vanished from both
    lexicons because "re" also tokenises somewhere in the English Bible, and
    setswana_fraction("Re ne re") scored 0.33 — under every rejection threshold —
    which is how a Setswana conjugation-table row shipped as an ENGLISH meaning
    of batla in the first build (caught in code review, 2026-08-04).
    """
    if _cache:
        return _cache['eng'], _cache['tsw']
    eng, tsw = set(), set()
    for folder, bucket in ((ROOT / 'corpus' / 'bible-eng', eng),
                           (ROOT / 'corpus' / 'bible-tsn', tsw)):
        for f in folder.glob('*_read.txt'):
            if f.name.endswith(FRONT_MATTER):
                continue
            bucket |= _words(f.read_text(encoding='utf-8', errors='replace'))
    app = _app_setswana_words()
    _cache['eng'], _cache['tsw'] = eng - tsw - app, (tsw - eng) | app
    return _cache['eng'], _cache['tsw']


def _fraction(line, lex):
    toks = [t for t in _TOKEN.findall((line or '').lower()) if len(t) >= 2]
    if not toks:
        return 0.0
    return sum(1 for t in toks if t in lex) / len(toks)


def setswana_fraction(line):
    return _fraction(line, lexicons()[1])


def english_fraction(line):
    return _fraction(line, lexicons()[0])


def plausible_pair(tsw_side, eng_side, tsw_min_english_reject=0.5,
                   eng_max_setswana=0.5):
    """True when this looks like a real (Setswana, English) glossary row.

    Deliberately conservative: a dropped good pair costs one dictionary entry,
    a kept bad pair teaches a learner something false.
    """
    if english_fraction(tsw_side) >= tsw_min_english_reject:
        return False                      # 'not want' — the Setswana slot holds English
    if setswana_fraction(eng_side) >= eng_max_setswana:
        return False                      # 'O ne o' — the English slot holds Setswana
    return True
