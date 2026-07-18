# Regenerate toolkit/missing-audio.md — the canonical recording to-do list.
#
#   python toolkit/missing-audio.py
#
# Reads content.js (the single source of truth) and emits two lists:
#
#   1. SILENT cards — no audio: field at all. These are what still needs a first recording.
#      Filenames are the exact tsw string, which is what the tagger/enhance-bot pipeline
#      expects; the card id is given so a clip can be traced back.
#
#   2. RE-RECORD cards — already voiced, but by Megan herself through the Adobe enhance bot
#      on 2026-07-17, and she judged that batch's quality poor (2026-07-18). They stay in the
#      app meanwhile. These are detected structurally, not from a hand-kept list: an item that
#      has an audio: field but is named by NO tag in any toolkit/audio-mapping-*.json (nor in
#      nchlt-item-audio.json) was wired directly by hand, which is exactly how that batch was
#      landed. export-item-audio.py calls the same set "externally managed" and refuses to
#      touch it. Cards that merely POINT at another card's file (reuse cards) are listed
#      separately — re-recording the source card fixes them for free.
#
# Rule of thumb when a native speaker is available: work list 2 first if the goal is quality,
# list 1 first if the goal is coverage.

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / 'content.js'
TOOLKIT = Path(__file__).resolve().parent
OUT = TOOLKIT / 'missing-audio.md'

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass


def mapping_managed_ids():
    """Every itemId named by any tag in any mapping file, plus the NCHLT exact-match list."""
    ids = set()
    for mp in TOOLKIT.glob('audio-mapping-*.json'):
        for t in json.loads(mp.read_text(encoding='utf-8'))['tags']:
            if t.get('itemId'):
                ids.add(t['itemId'])
    nchlt = TOOLKIT / 'nchlt-item-audio.json'
    if nchlt.exists():
        for e in json.loads(nchlt.read_text(encoding='utf-8')):
            ids.add(e['itemId'])
    return ids


def _block_at(src, brace_pos):
    """Slice the balanced {...} starting at brace_pos, ignoring braces inside strings.

    Item objects can nest (concordSlot is an object), so a naive [^{}]* regex silently
    drops every item that has one — that bug hid 57 items, the whole u3 paradigm among
    them, on this file's first run (2026-07-18). Depth-count instead.
    """
    depth, i, quote = 0, brace_pos, None
    while i < len(src):
        c = src[i]
        if quote:
            if c == '\\':
                i += 2
                continue
            if c == quote:
                quote = None
        elif c in '"\'':
            quote = c
        elif c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return src[brace_pos:i + 1]
        i += 1
    return src[brace_pos:]


def parse_content():
    """(unit id, unit title, lesson id, lesson title, item dict) for every real item."""
    src = CONTENT.read_text(encoding='utf-8')
    units = [(m.group(1), m.group(2), m.start())
             for m in re.finditer(r"id:\s*'(u\d+)',\s*title:\s*'([^']*)'", src)]
    lessons = [(m.group(1), m.group(2), m.start())
               for m in re.finditer(r"id:\s*'(u\d+l\d+)',\s*title:\s*'([^']*)'", src)]
    out = []
    for im in re.finditer(r"\{\s*id:\s*'(u\d+l\d+)-(\d+)'", src):
        lid, iid = im.group(1), f'{im.group(1)}-{im.group(2)}'
        blk = _block_at(src, im.start())
        tsw = re.search(r"tsw:\s*'((?:[^'\\]|\\.)*)'", blk)
        # Rule cards (id -00) carry tsw: '' — an EMPTY string, not a missing field — so test
        # the captured text, not the match object. The app's own filter is `.filter(i => i.tsw)`;
        # matching it exactly is what keeps this list equal to what the learner actually sees.
        if not tsw or not tsw.group(1):
            continue
        eng = re.search(r"eng:\s*'((?:[^'\\]|\\.)*)'", blk)
        aud = re.search(r"audio:\s*'([^']*)'", blk)
        ltitle = next((t for i, t, p in lessons if i == lid), lid)
        uid = lid.split('l')[0]
        utitle = next((t for i, t, p in units if i == uid), uid)
        out.append((uid, utitle, lid, ltitle, {
            'id': iid,
            'tsw': tsw.group(1).replace("\\'", "'"),
            'eng': eng.group(1).replace("\\'", "'") if eng else '',
            'audio': aud.group(1) if aud else None,
        }))
    return out


def table(rows, with_file=True):
    head = ('| filename | tsw | eng | card id |\n|---|---|---|---|\n' if with_file
            else '| tsw | eng | card id |\n|---|---|---|\n')
    body = []
    for it in rows:
        if with_file:
            body.append(f"| `{it['tsw']}.mp3` | {it['tsw']} | {it['eng']} | `{it['id']}` |")
        else:
            body.append(f"| {it['tsw']} | {it['eng']} | `{it['id']}` |")
    return head + '\n'.join(body) + '\n'


def group(rows):
    g = OrderedDict()
    for uid, utitle, lid, ltitle, it in rows:
        g.setdefault((uid, utitle, lid, ltitle), []).append(it)
    return g


def main():
    items = parse_content()
    managed = mapping_managed_ids()

    silent = [r for r in items if r[4]['audio'] is None]
    # voiced + no tag anywhere = wired by hand in the 2026-07-17 enhance-bot wave
    external = [r for r in items if r[4]['audio'] and r[4]['id'] not in managed]
    # a reuse card points at a DIFFERENT card's mp3; re-recording the source fixes it
    reuse = [r for r in external if r[4]['audio'] != f"items/{r[4]['id']}.mp3"]
    own = [r for r in external if r[4]['audio'] == f"items/{r[4]['id']}.mp3"]

    L = []
    L.append('# Missing / re-record audio — canonical list\n')
    L.append('**Generated by `python toolkit/missing-audio.py` — do not hand-edit.** '
             'Regenerate after every wiring wave; content.js is the source of truth.\n')
    L.append(f'- **{len(silent)}** cards are SILENT (never recorded)\n')
    L.append(f'- **{len(own)}** cards are voiced but flagged for RE-RECORDING by a native speaker\n')
    L.append(f'- **{len(reuse)}** further cards reuse one of those clips and are fixed for free\n')

    L.append('\n---\n')
    L.append('\n## 1. Silent — needs a first recording\n')
    L.append('\nFilename = the exact `tsw` string, which is what the tagger and enhance bot expect.\n')
    for (uid, utitle, lid, ltitle), rows in group(silent).items():
        L.append(f'\n### {lid} · {ltitle}  ({len(rows)})\n\n')
        L.append(table(rows))

    L.append('\n---\n')
    L.append('\n## 2. Re-record when a native speaker is available\n')
    L.append('\nMegan recorded these herself on 2026-07-17 and ran them through the Adobe enhance '
             'bot; on 2026-07-18 she judged that batch\'s quality poor. **They stay wired in the app '
             'meanwhile** — this is a quality upgrade, not a gap. Re-recording writes over the same '
             '`audio/items/<id>.mp3` filenames, so that wave **will** change existing bytes and '
             '**will** need `AUDIO_CACHE` (`relefela-audio-vN`) bumped in `sw.js` — unlike a '
             'new-files-only export, which must not bump it.\n')
    for (uid, utitle, lid, ltitle), rows in group(own).items():
        L.append(f'\n### {lid} · {ltitle}  ({len(rows)})\n\n')
        L.append(table(rows))

    if reuse:
        L.append('\n### Reuse cards — no separate recording needed\n')
        L.append('\nThese point at another card\'s clip, so they are fixed automatically when the '
                 'source card above is re-recorded.\n\n')
        L.append('| card id | tsw | plays |\n|---|---|---|\n')
        for _, _, _, _, it in reuse:
            L.append(f"| `{it['id']}` | {it['tsw']} | `{it['audio']}` |\n")

    OUT.write_text(''.join(L), encoding='utf-8', newline='\n')
    print(f'silent: {len(silent)}   re-record: {len(own)}   reuse (free): {len(reuse)}')
    print(f'wrote {OUT}')


if __name__ == '__main__':
    main()
