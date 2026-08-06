#!/usr/bin/env python3
"""Ship gate for the 🗂️ Ditlhopha round (SPEC-plurals-and-classes.md §4).

The round has no bank file of its own — its pool IS content.js, because every card
that carries a plural already carries its noun class. So this gate checks the DATA
the round runs on, and that index.html's fixed six-family table still agrees with it.

Run:  python toolkit/verify-forms-data.py
Exit 0 = green. Any failure is a ship blocker.

Why it shells out to node: a regex parser over content.js has bitten this repo before
(a `[^{}]*` pattern silently dropped all 57 items with a nested concordSlot). Letting
node evaluate the real file and hand back JSON means the gate sees exactly what the
app sees — the standing rule, "validate against the app's own RL_CONTENT".
"""
import json
import re
import subprocess
import sys
from pathlib import Path

# Force utf-8 stdout — the § and ✗ in this gate's own output otherwise kill the run
# under cp1252 (the standing trap in slice-lessons.py and export-item-audio.py).
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

ROOT = Path(__file__).resolve().parent.parent
FAIL = []
NOTE = []


def fail(msg):
    FAIL.append(msg)


# The four plural prefixes Setswana has. Step 2 shows all four every time.
PREFIXES = ["ba", "me", "ma", "di"]

# The six families, mirrored from index.html's FORMS_FAMILIES. Checked against that
# constant below, so the two can never drift apart silently.
FAMILIES = {
    1: ("mo-", "ba-", "1/2"),
    3: ("mo-", "me-", "3/4"),
    5: ("le-", "ma-", "5/6"),
    7: ("se-", "di-", "7/8"),
    9: ("", "di-", "9/10"),
    11: ("lo-", "di-", "11/10"),
}

# Known, deliberate exceptions. A card here is ALLOWED to disagree with its family;
# a card NOT here that disagrees is a ship blocker, because it means either new
# content arrived unchecked or a plural was typed wrong.
KNOWN_IRREGULAR = {"leino": "me-"}          # leino -> meno, not *maino
KNOWN_STEM_SHIFT = {"mmele", "leitlho", "leino", "loleme", "letsogo"}


def load_content():
    """Evaluate the real content.js in node and return its cards as dicts."""
    js = (
        "const fs=require('fs');"
        "const RL_CONTENT=eval(fs.readFileSync(process.argv[1],'utf8')+'; RL_CONTENT');"
        "const out=[];"
        "for(const u of RL_CONTENT.units) for(const l of u.lessons) for(const it of l.items)"
        " out.push({...it,_u:u.id,_l:l.id});"
        "process.stdout.write(JSON.stringify(out));"
    )
    r = subprocess.run(
        ["node", "-e", js, str(ROOT / "content.js")],
        capture_output=True, text=True, encoding="utf-8",
    )
    if r.returncode != 0:
        print("content.js would not evaluate in node:\n" + r.stderr)
        sys.exit(1)
    return json.loads(r.stdout)


def check_cards(cards):
    words = [c for c in cards if c.get("kind") != "rule"]
    pool = [c for c in words if c.get("plural")]

    if not pool:
        return fail("no cards carry a plural at all — the round would have an empty pool")

    for c in pool:
        tsw, pl, cls = c.get("tsw", ""), c["plural"], c.get("cls")
        where = f"{c['id']} ({tsw})"

        # 1. every card in the pool must resolve to a family
        if not cls:
            fail(f"{where}: has a plural but no cls — it cannot be placed in a family")
            continue
        if cls not in FAMILIES:
            fail(f"{where}: cls {cls} is not one of the six families {sorted(FAMILIES)}")
            continue

        # 2. every plural must start with a real plural prefix
        got = next((p for p in PREFIXES if pl.startswith(p)), None)
        if not got:
            fail(f"{where}: plural {pl!r} starts with none of {PREFIXES} — step 2 could not be graded")
            continue

        # 3. the plural must not contradict its class, unless it is a known exception
        expected = FAMILIES[cls][1]
        if got + "-" != expected:
            if KNOWN_IRREGULAR.get(tsw) == got + "-":
                NOTE.append(f"{where}: known irregular — class {cls} but takes {got}-")
            else:
                fail(f"{where}: class {cls} expects {expected} but the plural is {pl!r} ({got}-). "
                     f"Either the plural is wrong or it is a new irregular — check it, then add "
                     f"it to KNOWN_IRREGULAR.")

        # 4. a plural identical to its singular would make the card unanswerable
        if pl == tsw:
            fail(f"{where}: plural is identical to the singular")

        # 5. stem shifts are fine, but new ones should be looked at once
        sg_pre = FAMILIES[cls][0][:2]
        sg_stem = tsw[2:] if sg_pre and tsw.startswith(sg_pre) else tsw
        if sg_stem != pl[2:] and tsw not in KNOWN_STEM_SHIFT:
            fail(f"{where}: the stem changes as well as the prefix ({tsw} -> {pl}). That is real "
                 f"Setswana in five known cards; if this is a sixth, add it to KNOWN_STEM_SHIFT.")

    # 6. every card that has a plural must have a class (the fact the round rests on)
    missing = [c["id"] for c in pool if not c.get("cls")]
    if missing:
        fail(f"cards with a plural but no class: {missing}")

    # 7. the pool must not be so lopsided that a family is unreachable
    by_cls = {}
    for c in pool:
        by_cls.setdefault(c.get("cls"), []).append(c)
    for cls in FAMILIES:
        if cls not in by_cls:
            fail(f"class {cls} has no card at all — the round could never show that family")

    return pool, by_cls


def check_index(pool, by_cls):
    """index.html's fixed table must still describe the data."""
    src = (ROOT / "index.html").read_text(encoding="utf-8")

    m = re.search(r"const FORMS_FAMILIES = \[(.*?)\n\];", src, re.S)
    if not m:
        return fail("FORMS_FAMILIES not found in index.html")
    rows = re.findall(r"\{id:'f(\d+)',\s*sg:'([^']*)',\s*pl:'([^']*)',\s*cls:'([^']*)'", m.group(1))
    if len(rows) != len(FAMILIES):
        fail(f"index.html lists {len(rows)} families, this gate knows {len(FAMILIES)}")
    for cid, sg, pl, cls in rows:
        cid = int(cid)
        if cid not in FAMILIES:
            fail(f"index.html has a family f{cid} that is not in the data")
            continue
        if (sg, pl, cls) != FAMILIES[cid]:
            fail(f"family f{cid}: index.html says {(sg, pl, cls)}, the data says {FAMILIES[cid]}")

    m = re.search(r"const FORMS_PREFIXES = \[(.*?)\];", src)
    if not m:
        fail("FORMS_PREFIXES not found in index.html")
    else:
        listed = re.findall(r"'([^']+)'", m.group(1))
        if sorted(listed) != sorted(p + "-" for p in PREFIXES):
            fail(f"FORMS_PREFIXES is {listed}, the data needs {[p + '-' for p in PREFIXES]}")

    m = re.search(r"const FORMS_BY_CLS = \{(.*?)\};", src)
    if not m:
        fail("FORMS_BY_CLS not found in index.html")
    else:
        mapped = {int(k): int(v) for k, v in re.findall(r"(\d+):'f(\d+)'", m.group(1))}
        for cls in FAMILIES:
            if mapped.get(cls) != cls:
                fail(f"FORMS_BY_CLS is missing or wrong for class {cls}")

    # the no-SRS-writes claim, checked in the source as well as measured in the browser
    block = src[src.find("Ditlhopha — plurals & noun classes"):src.find("📖 Dictionary (SPEC-dictionary")]
    if not block:
        fail("could not find the Ditlhopha block in index.html")
    for banned in ("srsGrade", "state.srs["):
        if banned in block:
            fail(f"the Ditlhopha block calls {banned} — this round must never write SRS (spec §2.4)")
    if "addXP(2, 'forms')" not in block:
        fail("XP is not being awarded as +2 kind 'forms' (spec §2.4)")
    # spec §2.7: no audio in this round, so no clip is ever played from it
    for banned in ("playAudio", "playBtnsHTML"):
        if banned in block:
            fail(f"the Ditlhopha block calls {banned} — this round has no audio (spec §2.7)")

    if "'rl_forms'" not in src:
        fail("rl_forms is not listed in clearLearnerState() — a learner switch would leak progress")


def check_sw():
    sw = (ROOT / "sw.js").read_text(encoding="utf-8")
    m = re.search(r"const CACHE = 'relefela-v(\d+)'", sw)
    if not m:
        fail("could not read CACHE from sw.js")
    else:
        NOTE.append(f"sw.js CACHE is relefela-v{m.group(1)} — must be higher than the last shipped one")
    if "relefela-audio-v3" not in sw:
        fail("AUDIO_CACHE changed — this round adds no audio, so it must stay untouched (spec §2.7)")


def check_bytes():
    """LF only, no BOM — by BINARY read. Git Bash grep/tr strip CR and will lie."""
    for name in ("index.html", "content.js", "sw.js", "toolkit/verify-forms-data.py"):
        raw = (ROOT / name).read_bytes()
        if raw.startswith(b"\xef\xbb\xbf"):
            fail(f"{name}: starts with a UTF-8 BOM")
        crlf = raw.count(b"\r\n")
        if crlf:
            fail(f"{name}: contains {crlf} CRLF line endings")


def main():
    cards = load_content()
    got = check_cards(cards)
    if got:
        pool, by_cls = got
        check_index(pool, by_cls)
        print(f"pool: {len(pool)} cards with a plural, across {len(by_cls)} classes")
        print("      " + ", ".join(f"class {c}: {len(v)}" for c, v in sorted(by_cls.items())))
    check_sw()
    check_bytes()

    for n in NOTE:
        print(f"  note: {n}")
    if FAIL:
        print(f"\nFAILED — {len(FAIL)} problem(s):")
        for f in FAIL:
            print(f"  ✗ {f}")
        sys.exit(1)
    print("\nOK — Ditlhopha data gate green.")


if __name__ == "__main__":
    main()
