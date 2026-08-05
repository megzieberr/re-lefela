"""Composite each sliced animation onto the app's background as a looping GIF."""
from PIL import Image
import json
import os

KATSE = r'C:\Users\megzi\Desktop\Claude Code Projects\re-lefela\Katse'
FRAMES = os.path.join(KATSE, 'frames')
GIFS = os.path.join(KATSE, 'gifs')
BG = (253, 247, 249)   # --bg from index.html
MAX_H = 240

# ms per frame — lazy poses linger, talky ones stay a touch quicker
DURATION = {
    'sleeping': 500,
    'tail-moving': 450,
    'tail-waving': 400,
    'tail-waving-option-2': 400,
    'tails-and-paws': 400,
    'moving-ears': 380,
    'stretch-closed-eyes': 400,
    'stretch-open-eyes': 400,
    'sliding': 350,
    'moving-head': 350,
    'walking': 350,
    'angry': 320,
    'talking': 280,
    'talking-option-2': 280,
    'talking-curious-katse': 280,
}
DEFAULT_DURATION = 350

os.makedirs(GIFS, exist_ok=True)
manifest = json.load(open(os.path.join(FRAMES, 'manifest.json')))

for e in sorted(manifest, key=lambda m: m['slug']):
    slug = e['slug']
    d = os.path.join(FRAMES, slug)
    names = sorted(os.listdir(d))
    scale = min(1.0, MAX_H / e['h'])
    size = (max(1, int(e['w'] * scale)), max(1, int(e['h'] * scale)))
    flat = []
    for n in names:
        im = Image.open(os.path.join(d, n)).convert('RGBA').resize(size, Image.LANCZOS)
        plate = Image.new('RGB', size, BG)
        plate.paste(im, (0, 0), im)
        flat.append(plate)
    out = os.path.join(GIFS, slug + ('.png' if len(flat) == 1 else '.gif'))
    if len(flat) == 1:
        flat[0].save(out)
    else:
        flat[0].save(out, save_all=True, append_images=flat[1:],
                     duration=DURATION.get(slug, DEFAULT_DURATION),
                     loop=0, optimize=True)
    print('%-22s %s  %dx%d  %d frames  %.0f kB'
          % (slug, os.path.basename(out), size[0], size[1], len(flat),
             os.path.getsize(out) / 1024))
