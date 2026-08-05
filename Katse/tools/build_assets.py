"""Turn the chosen sliced frames into animated WebP files for the app.

Katse is an <img> whose src gets swapped, so an animated file needs no JS at
all — it just plays. Sized for the largest on-screen Katse (200px wide) at 2x.
"""
from PIL import Image
import os

FRAMES = r'C:\Users\megzi\Desktop\Claude Code Projects\re-lefela\Katse\frames'
IMG = r'C:\Users\megzi\Desktop\Claude Code Projects\re-lefela\img'
MAX = 340          # px, longest side — matches the existing katse-*.png stills
QUALITY = 90       # checked against lossless at 3x zoom: no edge fringing
LOOP_FOREVER = 0

# pose name in the app  ->  (sliced folder, ms per frame, loop count)
BUILD = {
    'home':    ('tail-waving',           420, LOOP_FOREVER),
    'awake':   ('moving-ears',           380, LOOP_FOREVER),
    'rest':    ('tail-moving',           450, LOOP_FOREVER),
    'happy':   ('tails-and-paws',        400, LOOP_FOREVER),
    'curious': ('talking-curious-katse', 280, LOOP_FOREVER),
    'sleep':   ('sleeping',              500, LOOP_FOREVER),
    'talk':    ('talking-option-2',      280, LOOP_FOREVER),
    'tilt':    ('moving-head',           350, LOOP_FOREVER),
    'angry':   ('angry',                 320, LOOP_FOREVER),
    'stretch': ('stretch-open-eyes',     400, LOOP_FOREVER),
    'slide':   ('sliding',               350, LOOP_FOREVER),
    'walk':    ('walking',               350, 1),   # an entrance — plays once
}

# stretch-open-eyes ends on a slightly redrawn, chunkier cat; dropping that one
# frame makes it loop cleanly (Megan's call: keep this take, not the twin)
SKIP_LAST = {'stretch'}

# Poses that swap into each other mid-screen must share one canvas, or the <img>
# changes shape and the layout jumps. `home` is the reference; `talk` and `tilt`
# are padded to it and aligned on the cat's own box, so only the cat changes.
SHARE_CANVAS_WITH_HOME = {'talk', 'tilt'}


def cat_box(im):
    import numpy as np
    a = np.array(im)[:, :, 3]
    ys, xs = np.where(a >= 40)
    return xs.min(), xs.max(), ys.min(), ys.max()


def repad(frames, canvas_w, canvas_h, ref_cx, ref_bottom):
    """Centre these frames' cat on the reference cat's x-centre and baseline."""
    x0, x1, y0, y1 = cat_box(frames[0])
    dx = int(round(ref_cx - (x0 + x1) / 2))
    dy = int(round(ref_bottom - y1))
    out = []
    for f in frames:
        canvas = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
        canvas.alpha_composite(f, (max(0, dx), max(0, dy)))
        out.append(canvas)
    return out

def load_frames(slug, pose):
    d = os.path.join(FRAMES, slug)
    names = sorted(os.listdir(d))
    if pose in SKIP_LAST:
        names = names[:-1]
    out = []
    for n in names:
        im = Image.open(os.path.join(d, n)).convert('RGBA')
        scale = min(1.0, MAX / max(im.size))
        if scale < 1.0:
            im = im.resize((max(1, round(im.width * scale)),
                            max(1, round(im.height * scale))), Image.LANCZOS)
        out.append(im)
    return out


# the reference canvas + cat position every sitting pose is aligned to
_home = load_frames(BUILD['home'][0], 'home')
HOME_W, HOME_H = _home[0].size
_hx0, _hx1, _hy0, _hy1 = cat_box(_home[0])
HOME_CX, HOME_BOTTOM = (_hx0 + _hx1) / 2, _hy1

total = 0
for pose, (slug, ms, loop) in sorted(BUILD.items()):
    frames = load_frames(slug, pose)
    if pose in SHARE_CANVAS_WITH_HOME:
        frames = repad(frames, HOME_W, HOME_H, HOME_CX, HOME_BOTTOM)
    out = os.path.join(IMG, 'katse-%s.webp' % pose)
    frames[0].save(out, format='WEBP', save_all=True, append_images=frames[1:],
                   duration=ms, loop=loop, quality=QUALITY, method=4)
    kb = os.path.getsize(out) / 1024
    total += kb
    print('%-9s %-22s %d frames  %dx%d  loop=%s  %6.1f kB'
          % (pose, slug, len(frames), frames[0].width, frames[0].height,
             'forever' if loop == 0 else loop, kb))

print('total %.0f kB' % total)
