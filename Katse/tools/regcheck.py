"""Registration check: frame 0 in red, last frame in blue, overlap in dark.

If the cat's body is aligned, only the animated part shows colour fringing.
Body drift shows up as a red/blue ghost along the whole silhouette.
"""
from PIL import Image
import numpy as np
import json
import os

OUT = r'C:\Users\megzi\Desktop\Claude Code Projects\re-lefela\Katse\frames'
DEST = r'C:\Users\megzi\AppData\Local\Temp\claude\C--Users-megzi--claude\2ed89290-1663-4e3c-81ea-6f4b63312e6d\scratchpad\regcheck'

os.makedirs(DEST, exist_ok=True)
manifest = json.load(open(os.path.join(OUT, 'manifest.json')))

rows = []
for entry in manifest:
    if entry['frames'] < 2:
        continue
    d = os.path.join(OUT, entry['slug'])
    names = sorted(os.listdir(d))
    a = np.array(Image.open(os.path.join(d, names[0])))[:, :, 3] >= 128
    b = np.array(Image.open(os.path.join(d, names[-1])))[:, :, 3] >= 128
    rgb = np.full(a.shape + (3,), 255, np.uint8)
    rgb[a & ~b] = (220, 40, 40)      # only in frame 0
    rgb[b & ~a] = (40, 90, 220)      # only in the last frame
    rgb[a & b] = (35, 35, 35)        # steady in both
    only_a = int(np.count_nonzero(a & ~b))
    only_b = int(np.count_nonzero(b & ~a))
    both = int(np.count_nonzero(a & b))
    moved = (only_a + only_b) / (both + only_a + only_b) * 100
    im = Image.fromarray(rgb)
    im.thumbnail((420, 420))
    im.save(os.path.join(DEST, entry['slug'] + '.png'))
    rows.append((entry['slug'], moved, entry['frames']))

for slug, moved, n in sorted(rows, key=lambda r: -r[1]):
    print('%-22s %d frames   %5.1f%% of the silhouette differs' % (slug, n, moved))
