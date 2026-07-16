# Native-corpus per-item audio miner for Re:Lefela (Phase B of per-item audio).
# For each content.js item, finds corpus clips whose transcription EXACTLY matches
# the item's Setswana (normalised). Sources: NCHLT (field recordings, CC BY 3.0) and
# OpenSLR 32 (NWU+Google studio TTS corpus, CC BY-SA 4.0). OpenSLR wins on overlap
# (studio quality); Megan's ear-tagged Peace Corps clips win over both (export script).
# Re-run after adding a unit: python toolkit/nchlt-item-audio.py
# Output: toolkit/nchlt-item-audio.json  [{itemId, tsw, wav, spk, src, dur}]

import json, re, sys, unicodedata
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / 'content.js'
TRN = Path(r'C:\Users\megzi\Desktop\NWU Semester 2\SECL121\Corpus\nchlt_tsn\transcriptions\nchlt_tsn.trn.xml')
AUDIO_ROOT = TRN.parent.parent.parent  # rec audio paths start with 'nchlt_tsn/'
OUT = Path(__file__).resolve().parent / 'nchlt-item-audio.json'

def norm(s):
    s = unicodedata.normalize('NFD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    return re.sub(r'[^a-z\s]', '', s.lower()).strip()

# 1. items from content.js: id + tsw (skip rules / empty tsw)
src = CONTENT.read_text(encoding='utf-8')
items = []
for m in re.finditer(r"id:\s*'(u\d+l\d+-\d+)'[^\n]*?tsw:\s*'((?:[^'\\]|\\.)*)'", src):
    iid, tsw = m.group(1), m.group(2).replace("\\'", "'")
    if tsw.strip():
        items.append((iid, tsw, norm(tsw)))
by_norm = {}
for iid, tsw, n in items:
    by_norm.setdefault(n, []).append((iid, tsw))
print(f'{len(items)} items, {len(by_norm)} distinct normalised forms', file=sys.stderr)

# 2. scan corpus for exact transcription matches
tree = ET.parse(TRN)
matches = {}   # norm -> best rec
for spk in tree.getroot():
    for rec in spk:
        orth = norm(rec.findtext('orth', ''))
        if orth in by_norm:
            pdp = float(rec.get('pdp_score'))
            if orth not in matches or pdp > matches[orth]['pdp']:
                matches[orth] = {
                    'wav': rec.get('audio'), 'pdp': pdp,
                    'dur': float(rec.get('duration')),
                    'spk': f"{spk.get('id')} ({spk.get('gender')}, {spk.get('age')}, {spk.get('location')})",
                }

# 3. OpenSLR 32 (studio quality) — overrides NCHLT on the same text
OPENSLR = ROOT / 'corpus' / 'tn_za' / 'za' / 'tsn'
slr_hits = {}
if OPENSLR.exists():
    for line in (OPENSLR / 'line_index.tsv').read_text(encoding='utf-8').splitlines():
        parts = line.split('\t')
        if len(parts) != 2:
            continue
        fid, text = parts
        n = norm(text)
        if n in by_norm and n not in slr_hits:
            wav = OPENSLR / 'wavs' / f'{fid.strip()}.wav'
            if wav.exists():
                slr_hits[n] = {'wav': str(wav), 'spk': f'OpenSLR32 {fid.strip()}'}
else:
    print('OpenSLR corpus not found — NCHLT only', file=sys.stderr)

# 4. emit one entry per item that has a match
out = []
for n in sorted(set(matches) | set(slr_hits)):
    if n in slr_hits:
        wav_path, spk, src, dur = slr_hits[n]['wav'], slr_hits[n]['spk'], 'openslr32', None
    else:
        rec = matches[n]
        wav_path, spk, src, dur = str(AUDIO_ROOT / rec['wav']), rec['spk'], 'nchlt', rec['dur']
        if not Path(wav_path).exists():
            print(f'MISSING WAV: {rec["wav"]}', file=sys.stderr)
            continue
    for iid, tsw in by_norm[n]:
        out.append({'itemId': iid, 'tsw': tsw, 'wav': wav_path, 'spk': spk, 'src': src, 'dur': dur})
out.sort(key=lambda e: e['itemId'])
OUT.write_text(json.dumps(out, indent=1), encoding='utf-8')
print(f'{len(out)} items matched -> {OUT}', file=sys.stderr)
for e in out:
    print(f"{e['itemId']}  {e['tsw']}  ({e['src']})")
