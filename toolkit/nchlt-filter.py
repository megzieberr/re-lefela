# NCHLT listening-clip selector for Re:Lefela.
# Finds corpus clips whose transcription uses ONLY words already taught in content.js,
# so the Listening gym never plays a word the learner hasn't met.
# Re-run after adding a unit: python toolkit/nchlt-filter.py
# Output: prints ffmpeg commands + writes toolkit/nchlt-clips.json (id, tsw, audio, spk).

import json, re, sys, unicodedata
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / 'content.js'
TRN = Path(r'C:\Users\megzi\Desktop\NWU Semester 2\SECL121\Corpus\nchlt_tsn\transcriptions\nchlt_tsn.trn.xml')
MAX_CLIPS = 40
MAX_TOKENS = 6

def norm(s):
    s = unicodedata.normalize('NFD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^a-z\s]", '', s.lower()).strip()

# 1. known vocabulary from content.js (tsw + plural fields)
src = CONTENT.read_text(encoding='utf-8')
vocab = set()
for m in re.finditer(r"(?:tsw|plural):\s*'((?:[^'\\]|\\.)*)'", src):
    for tok in norm(m.group(1).replace("\\'", "'")).split():
        vocab.add(tok)
vocab.discard('')
print(f'known vocabulary: {len(vocab)} tokens', file=sys.stderr)

# 2. filter corpus
tree = ET.parse(TRN)
cands = []
for spk in tree.getroot():
    for rec in spk:
        orth = rec.findtext('orth', '').strip()
        toks = norm(orth).split()
        if not toks or len(toks) > MAX_TOKENS:
            continue
        if all(t in vocab for t in toks):
            cands.append({
                'orth': orth, 'ntok': len(toks),
                'audio': rec.get('audio'), 'dur': float(rec.get('duration')),
                'pdp': float(rec.get('pdp_score')),
                'spk': f"{spk.get('id')} ({spk.get('gender')}, {spk.get('age')}, {spk.get('location')})",
            })
print(f'clips fully covered by known vocab: {len(cands)}', file=sys.stderr)

# 3. best recording per distinct transcription (highest pdp = cleanest read).
#    Require at least one CONTENT word (else it's a run of concords/particles),
#    spread across content words (max 3 clips each), prefer content-rich clips.
FUNCTION = {'a','e','o','i','ba','le','ka','se','ke','re','go','ya','wa','na','mo','di',
            'tla','tlaa','sa','ga','kwa','fa','jwa','ya','tse','yo','lo','ne','mme','gore',
            'jaaka','kgotsa','fela','gape','nnyaa','ee'}
best = {}
for c in cands:
    k = norm(c['orth'])
    if k not in best or c['pdp'] > best[k]['pdp']:
        best[k] = c
scored = []
for c in best.values():
    content = [t for t in norm(c['orth']).split() if t not in FUNCTION]
    if not content:
        continue
    c['content'] = content
    scored.append(c)
scored.sort(key=lambda c: (-len(c['content']), -c['pdp']))
picked, used = [], {}
for c in scored:
    if len(picked) >= MAX_CLIPS:
        break
    if any(used.get(t, 0) >= 3 for t in c['content']):
        continue
    for t in c['content']:
        used[t] = used.get(t, 0) + 1
    picked.append(c)

out = []
for c in picked:
    base = Path(c['audio']).stem
    out.append({'id': base, 'tsw': c['orth'], 'audio': f'nchlt/{base}.mp3', 'spk': c['spk'], 'wav': c['audio']})

(Path(__file__).parent / 'nchlt-clips.json').write_text(json.dumps(out, indent=1), encoding='utf-8')
print(f'picked {len(out)} clips -> toolkit/nchlt-clips.json', file=sys.stderr)
for c in out:
    print(c['tsw'])
