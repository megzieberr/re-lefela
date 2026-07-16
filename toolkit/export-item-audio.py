# Phase B: export tagged per-item clips as MP3s + wire them into content.js.
# Inputs:  toolkit/audio-mapping-unit1.json  (Megan's ear-tagged Peace Corps segments)
#          toolkit/nchlt-item-audio.json     (NCHLT exact-match items, from nchlt-item-audio.py)
# Output:  audio/items/<itemId>.mp3 (mono 64k) + audio: fields inserted in content.js
# Rule: if an itemId was tagged more than once, the LAST tag wins.
# Idempotent: re-running re-exports clips and skips items that already have an audio: field.

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MAPPING = Path(__file__).resolve().parent / 'audio-mapping-unit1.json'
NCHLT = Path(__file__).resolve().parent / 'nchlt-item-audio.json'
AUDIO_SRC = ROOT / 'corpus' / 'audio'
OUT_DIR = ROOT / 'audio' / 'items'
CONTENT = ROOT / 'content.js'

OUT_DIR.mkdir(parents=True, exist_ok=True)

# items Megan retracted after tagging (clip text ≠ card text)
EXCLUDE = {'u1l2-01'}   # announcer says "…ke Itumeleng", card says "…ke Megan" (2026-07-16)

# 1. winning Peace Corps tag per item (last wins)
mapping = json.loads(MAPPING.read_text(encoding='utf-8'))
winner = {}
for t in mapping['tags']:
    if t['action'] == 'item' and t['itemId'] not in EXCLUDE:
        winner[t['itemId']] = t

# 2. NCHLT items never override an ear-tagged Peace Corps clip
nchlt = json.loads(NCHLT.read_text(encoding='utf-8')) if NCHLT.exists() else []
jobs = []
for t in winner.values():
    jobs.append((t['itemId'], AUDIO_SRC / t['file'], t['start'], t['end'], f"PC L{t['lesson']}"))
for e in nchlt:
    if e['itemId'] not in winner:
        jobs.append((e['itemId'], Path(e['wav']), None, None, 'NCHLT'))

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
CONTENT.write_text(src_js, encoding='utf-8')
print(f'\n{len(jobs)} clips exported; audio: added to {len(added)} items'
      + (f', {len(already)} already wired' if already else ''))
