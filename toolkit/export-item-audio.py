# Phase B: export tagged per-item clips as MP3s + wire them into content.js.
# Inputs:  toolkit/audio-mapping-*.json      (Megan's ear-tagged Peace Corps segments;
#                                             unit1 = round 1, later rounds win conflicts)
#          toolkit/nchlt-item-audio.json     (NCHLT exact-match items, from nchlt-item-audio.py)
# Output:  audio/items/<itemId>.mp3 (mono 64k) + audio: fields inserted in content.js
# Rule: if an itemId was tagged more than once, the LAST tag wins.
# Idempotent: re-running re-exports clips and skips items that already have an audio: field.

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--allow-unwire', action='store_true',
                     help='allow this run to un-wire currently-live items (dangerous; normally refused)')
args = parser.parse_args()

ROOT = Path(__file__).resolve().parent.parent
# round 1 (unit1) first, then later rounds alphabetically — tags later in the list win
MAPPINGS = sorted(Path(__file__).resolve().parent.glob('audio-mapping-*.json'),
                  key=lambda p: (p.name != 'audio-mapping-unit1.json', p.name))
NCHLT = Path(__file__).resolve().parent / 'nchlt-item-audio.json'
AUDIO_SRC = ROOT / 'corpus' / 'audio'
OUT_DIR = ROOT / 'audio' / 'items'
CONTENT = ROOT / 'content.js'

OUT_DIR.mkdir(parents=True, exist_ok=True)

# items Megan retracted after tagging (clip text ≠ card text)
# u1l2-01 lived here 2026-07-16..17: the announcer says "…ke Itumeleng" but the card said
# "…ke Megan". Resolved 2026-07-17 (session 16) by fixing the CARD, not dropping the clip —
# the deck already teaches this frame with Setswana names (u1l2-03 Moeng, u1l2-08 Thabo),
# and the app is shared with the second learner, for whom "ke Megan" was simply wrong.
EXCLUDE = set()

# PERMANENT guard — do NOT remove, ever. (Supersedes the session-15 note that said to
# remove it together with the corpus recording; the guard STAYS.) Megan's 2026-07-17
# decision (session 17) dropped cards u2l6-13..19, deleted corpus/audio/Colours.mp3
# and stripped the 7 ★ Colours tags from the committed mapping — but her TAGGER's
# localStorage still holds those tags, so any future raw round-2 download would
# resurrect them, pointing at deleted cards and a deleted, music-laden recording.
# This guard makes that harmless forever: ★ Colours tags are ignored on sight.
# Never re-add the u2l6-13..19 cards from a tagger download. (2026-07-17, session 17)
SKIP_LESSONS = {'★ Colours (native)'}

# 1. winning Peace Corps tag per item.
#    Step 1: per SEGMENT, the latest tag across all mapping files wins — a round-2
#    re-tag/junk of a segment supersedes what round 1 said about that same segment
#    (that's how Megan corrects mis-tags; "Keep as tagged" records nothing).
#    Step 2: per ITEM, the latest surviving tag wins.
#    Alongside this, track every itemId that appears in ANY tag of ANY loaded mapping
#    file (any action, winning or not) — this is the "mapping-managed" set, used below
#    to tell a real un-wire hazard apart from an item that was never mapping-tracked
#    at all (see the 2.5 guard comment).
seg_last = {}
managed_ids = set()
order = 0
for mp in MAPPINGS:
    mapping = json.loads(mp.read_text(encoding='utf-8'))
    print(f'mapping: {mp.name} ({len(mapping["tags"])} tags)')
    for t in mapping['tags']:
        if t['lesson'] in SKIP_LESSONS:
            continue
        if t.get('itemId'):
            managed_ids.add(t['itemId'])
        seg_last[(t['lesson'], t['seg'], t.get('sub'))] = (order, t)
        order += 1
winner = {}
for _, t in sorted(seg_last.values()):
    if t['action'] == 'item' and t['itemId'] not in EXCLUDE:
        winner[t['itemId']] = t

# 2. NCHLT items never override an ear-tagged Peace Corps clip
nchlt = json.loads(NCHLT.read_text(encoding='utf-8')) if NCHLT.exists() else []
managed_ids |= {e['itemId'] for e in nchlt}
jobs = []
for t in winner.values():
    jobs.append((t['itemId'], AUDIO_SRC / t['file'], t['start'], t['end'], f"PC L{t['lesson']}"))
for e in nchlt:
    if e['itemId'] not in winner:
        jobs.append((e['itemId'], Path(e['wav']), None, None, 'NCHLT'))

# 2.5 guard: refuse to silently un-wire a currently-live MAPPING-MANAGED item. A
#     regressed/partial mapping download can look like a clean run but actually drops
#     clips that are only tagged in an older file — the tagger's known Lesson-2 drop is
#     the recurring case (round2 lesson '2' missing silently un-wires u1l1-13/15/19).
#     Diff against content.js's CURRENT wiring before touching anything: clip cutting,
#     content.js writes, and mp3 deletion all happen after this point.
#     Scope: this guard (and the un-wire step below) only ever look at items in
#     `managed_ids` — ids named by some tag, any action, in some loaded mapping file or
#     nchlt-item-audio.json. An id wired straight into content.js's audio: field with NO
#     tag anywhere in the mapping corpus (e.g. the 64 native-recording clips wired by
#     hand in the session-17 wiring wave) is EXTERNALLY MANAGED — this script has no tag
#     for it and so has no opinion on it: never flagged here, never un-wired below, never
#     counted among stale clips to delete. (2026-07-17, session 18)
have = {item_id for item_id, *_ in jobs}
currently_wired = dict(re.findall(
    r"\{ id: '([^']+)', audio: 'items/([^']+)',", CONTENT.read_text(encoding='utf-8')))
would_unwire = {i: f for i, f in currently_wired.items() if i not in have and i in managed_ids}
if would_unwire and not args.allow_unwire:
    print(f'\nREFUSING TO RUN: this export would UN-WIRE {len(would_unwire)} '
          f'currently-live item(s) — nothing has been changed:')
    for item_id in sorted(would_unwire):
        print(f"  {item_id}  (currently items/{would_unwire[item_id]})")
    print("\nLikely cause: a regressed/partial mapping download (the tagger's known "
          "Lesson-2 drop is the recurring case), not a real retraction of these clips.\n"
          'Re-run with --allow-unwire if this un-wiring is actually intended.')
    sys.exit(1)

# 3. export
for item_id, src, start, end, origin in sorted(jobs):
    dst = OUT_DIR / f'{item_id}.mp3'
    cmd = ['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', str(src)]
    if start is not None:
        cmd += ['-ss', f'{start}', '-to', f'{end}']
    cmd += ['-ac', '1', '-b:a', '64k', str(dst)]
    subprocess.run(cmd, check=True)
    print(f'{item_id}.mp3  {dst.stat().st_size // 1024} KB  ({origin})')

# 4. wire audio: fields into content.js
src_js = CONTENT.read_text(encoding='utf-8')
added, already = [], []
for item_id, *_ in jobs:
    if re.search(r"id: '" + re.escape(item_id) + r"', audio:", src_js):
        already.append(item_id)
        continue
    new_js, n = re.subn(
        r"(\{ id: '" + re.escape(item_id) + r"',)",
        rf"\1 audio: 'items/{item_id}.mp3',",
        src_js)
    if n != 1:
        sys.exit(f'PATCH FAILED for {item_id}: {n} matches')
    src_js = new_js
    added.append(item_id)

# 5. un-wire MAPPING-MANAGED items whose tag was corrected away (re-tagged to another
#    item / junked) and delete their orphaned MP3s, so Katse goes back to sleep on them.
#    Externally-managed ids (not in managed_ids — no tag anywhere) are skipped: this
#    script never touches a clip it has no tag for.
removed = []
for wired_id in re.findall(r"\{ id: '([^']+)', audio: 'items/", src_js):
    if wired_id in have:
        continue
    if wired_id not in managed_ids:
        continue
    src_js, n = re.subn(
        r"(\{ id: '" + re.escape(wired_id) + r"',) audio: '[^']*',",
        r'\1', src_js)
    if n != 1:
        sys.exit(f'UNPATCH FAILED for {wired_id}: {n} matches')
    removed.append(wired_id)
for mp3 in OUT_DIR.glob('*.mp3'):
    if mp3.stem in have or mp3.stem not in managed_ids:
        continue
    mp3.unlink()
    if mp3.stem not in removed:
        removed.append(mp3.stem)

CONTENT.write_text(src_js, encoding='utf-8')
print(f'\n{len(jobs)} clips exported; audio: added to {len(added)} items'
      + (f', {len(already)} already wired' if already else '')
      + (f'; REMOVED stale audio from {len(removed)}: {", ".join(sorted(removed))}' if removed else ''))
