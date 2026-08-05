"""Slice Megan's Katse sprite sheets into aligned frames.

Rules that matter (learned on the Blipwork sheets):
  - frames are measured off the CAT'S BODY, never the transparent box
  - every frame in a sheet lands on one canvas at one scale, aligned by
    maximising overlap with frame 0, so only the animated part moves
  - baked-in frame numbers are dropped; paws, whiskers and motion lines are not
"""
from PIL import Image
import numpy as np
from scipy import ndimage
import json
import os

SRC = r'C:\Users\megzi\Desktop\Claude Code Projects\re-lefela\Katse\new'
OUT = r'C:\Users\megzi\Desktop\Claude Code Projects\re-lefela\Katse\frames'

CAT_AREA_FRACTION = 0.25   # a component this big relative to the largest IS a cat
GLOW_ALPHA_FLOOR = 60      # below this an edge pixel is glow, not antialiasing
PAD = 12                   # breathing room around the union body box
SEARCH = 70                # +/- px offset searched when aligning to frame 0
NUMBER_MAX_DIM = 80        # a stray blob smaller than this in both directions is
                           # a baked-in frame number; Sliding's motion lines are
                           # ~250px tall and survive this test
REACH = 12                 # px a detached eye/whisker may sit from the body

# first-generation sheets replaced by better re-draws on 2026-08-05 —
# the files stay in the folder, they just no longer feed the pipeline
SUPERSEDED = {'Extended Body.png', 'Head turning.png', 'Head Turning 2.png',
              'Stretching Sprite.png'}

# sheets whose grid order is not the play order: reading-order index -> sequence.
# Walking's crouch was drawn mid-row; the entrance is strides, crouch, side sit,
# seated facing front.
REORDER = {'walking': [0, 1, 3, 4, 5, 2, 6, 7]}


def load(path):
    im = Image.open(path).convert('RGBA')
    arr = np.array(im)
    # kill the soft dark glow baked into the RGB of near-transparent pixels
    arr[arr[:, :, 3] < GLOW_ALPHA_FLOOR] = 0
    return arr


def components(arr):
    solid = arr[:, :, 3] >= 128
    lab, n = ndimage.label(solid, structure=np.ones((3, 3)))
    out = []
    for i, sl in enumerate(ndimage.find_objects(lab)):
        if sl is None:
            continue
        area = int((lab[sl] == i + 1).sum())
        out.append(dict(area=area, y0=sl[0].start, y1=sl[0].stop,
                        x0=sl[1].start, x1=sl[1].stop, label=i + 1))
    return out, lab


def grid_of(cats):
    """Order cat components reading-order: rows top to bottom, then left to right."""
    def cluster(vals, gap):
        order = sorted(range(len(vals)), key=lambda i: vals[i])
        groups, cur = [], [order[0]]
        for a, b in zip(order, order[1:]):
            if vals[b] - vals[a] > gap:
                groups.append(cur)
                cur = []
            cur.append(b)
        groups.append(cur)
        return groups

    cy = [(c['y0'] + c['y1']) / 2 for c in cats]
    cx = [(c['x0'] + c['x1']) / 2 for c in cats]
    heights = [c['y1'] - c['y0'] for c in cats]
    rows = cluster(cy, max(heights) * 0.6)
    ordered = []
    for row in sorted(rows, key=lambda r: min(cy[i] for i in r)):
        ordered.extend(sorted(row, key=lambda i: cx[i]))
    return ordered


def build_frames(name):
    arr = load(os.path.join(SRC, name))
    comps, lab = components(arr)
    if not comps:
        raise SystemExit(name + ': nothing solid found')
    biggest = max(c['area'] for c in comps)
    cats = [c for c in comps if c['area'] >= biggest * CAT_AREA_FRACTION]
    extras = [c for c in comps if c['area'] < biggest * CAT_AREA_FRACTION]

    # A stray blob is a baked-in frame number when it sits clear of every cat's
    # SILHOUETTE (not merely its bounding box — a digit above the head is inside
    # the box but nowhere near the cat) AND is small in both directions. Paws,
    # eyes and whiskers fail the first test; Sliding's tall motion lines fail
    # the second; both are kept.
    near_cat = ndimage.binary_dilation(
        np.isin(lab, [c['label'] for c in cats]), iterations=REACH)
    kept, dropped = [], []
    for e in extras:
        touching = bool(near_cat[e['y0']:e['y1'], e['x0']:e['x1']].any())
        tiny = max(e['x1'] - e['x0'], e['y1'] - e['y0']) < NUMBER_MAX_DIM
        (dropped if (not touching and tiny) else kept).append(e)

    cats = [cats[i] for i in grid_of(cats)]

    # every kept extra joins the cat it sits nearest to
    members = {i: [c] for i, c in enumerate(cats)}
    for e in kept:
        ecx = (e['x0'] + e['x1']) / 2
        ecy = (e['y0'] + e['y1']) / 2
        best = min(range(len(cats)), key=lambda i: (
            abs(ecx - (cats[i]['x0'] + cats[i]['x1']) / 2) +
            abs(ecy - (cats[i]['y0'] + cats[i]['y1']) / 2) * 0.5))
        members[best].append(e)

    # cut each frame out at the tight box around everything that belongs to it
    raw, bodies = [], []
    for i in range(len(cats)):
        ms = members[i]
        y0 = min(m['y0'] for m in ms)
        y1 = max(m['y1'] for m in ms)
        x0 = min(m['x0'] for m in ms)
        x1 = max(m['x1'] for m in ms)
        patch = arr[y0:y1, x0:x1].copy()
        keep_labels = [m['label'] for m in ms]
        sub = lab[y0:y1, x0:x1]
        patch[(sub != 0) & ~np.isin(sub, keep_labels)] = 0
        raw.append(patch)
        # the cat itself, used to align — motion lines must not steer the fit
        bodies.append(sub == cats[i]['label'])

    return raw, bodies, len(dropped)


def align(raw, bodies):
    """Put every frame on one canvas, offset so its BODY overlaps frame 0 best."""
    h = max(p.shape[0] for p in raw) + PAD * 2 + SEARCH * 2
    w = max(p.shape[1] for p in raw) + PAD * 2 + SEARCH * 2

    # Start every frame with its BODY centred, not its whole box: a lengthening
    # tail or a growing motion line would otherwise shove the cat sideways
    # before the search even begins.
    anchors = []
    for body in bodies:
        ys, xs = np.where(body)
        anchors.append(((ys.min() + ys.max()) // 2, (xs.min() + xs.max()) // 2))

    def place(patch, anchor, dy, dx, chan=4):
        canvas = np.zeros((h, w, chan), np.uint8) if chan == 4 \
            else np.zeros((h, w), bool)
        y = h // 2 - anchor[0] + dy
        x = w // 2 - anchor[1] + dx
        if y < 0 or x < 0 or y + patch.shape[0] > h or x + patch.shape[1] > w:
            return None
        canvas[y:y + patch.shape[0], x:x + patch.shape[1]] = patch
        return canvas

    ref_body = place(bodies[0], anchors[0], 0, 0, chan=1)
    out, offsets = [place(raw[0], anchors[0], 0, 0)], [(0, 0)]

    for patch, body, anchor in zip(raw[1:], bodies[1:], anchors[1:]):
        best_score = -1.0
        cy = cx = ny = nx = 0
        step = 8
        while step >= 1:
            for dy in range(cy - SEARCH, cy + SEARCH + 1, step):
                for dx in range(cx - SEARCH, cx + SEARCH + 1, step):
                    m = place(body, anchor, dy, dx, chan=1)
                    if m is None:
                        continue
                    union = np.count_nonzero(m | ref_body)
                    score = np.count_nonzero(m & ref_body) / union if union else 0.0
                    if score > best_score:
                        best_score, ny, nx = score, dy, dx
            cy, cx = ny, nx
            step //= 2
        out.append(place(patch, anchor, cy, cx))
        offsets.append((cy, cx))
    return out, offsets


def trim(frames):
    """One final crop, identical for every frame, so nothing shifts."""
    stack = np.zeros(frames[0].shape[:2], bool)
    for f in frames:
        stack |= f[:, :, 3] > 0
    ys, xs = np.where(stack)
    y0 = max(int(ys.min()) - PAD, 0)
    y1 = min(int(ys.max()) + PAD + 1, stack.shape[0])
    x0 = max(int(xs.min()) - PAD, 0)
    x1 = min(int(xs.max()) + PAD + 1, stack.shape[1])
    return [f[y0:y1, x0:x1] for f in frames]


def main():
    os.makedirs(OUT, exist_ok=True)
    manifest = []
    for name in sorted(os.listdir(SRC)):
        if not name.lower().endswith('.png') or name in SUPERSEDED:
            continue
        slug = (name.rsplit('.', 1)[0].lower()
                .replace(' sprite', '').replace(' ', '-'))
        raw, bodies, dropped = build_frames(name)
        if len(raw) > 1:
            frames, offsets = align(raw, bodies)
        else:
            frames = [np.pad(raw[0], ((PAD, PAD), (PAD, PAD), (0, 0)))]
            offsets = [(0, 0)]
        frames = trim(frames)
        if slug in REORDER:
            frames = [frames[i] for i in REORDER[slug]]
        d = os.path.join(OUT, slug)
        os.makedirs(d, exist_ok=True)
        for old in os.listdir(d):
            os.remove(os.path.join(d, old))
        for i, f in enumerate(frames):
            Image.fromarray(f).save(os.path.join(d, '%02d.png' % i))
        drift_y = max(abs(o[0]) for o in offsets)
        drift_x = max(abs(o[1]) for o in offsets)
        manifest.append(dict(slug=slug, source=name, frames=len(frames),
                             w=int(frames[0].shape[1]), h=int(frames[0].shape[0]),
                             numbers_removed=dropped,
                             drift_y=int(drift_y), drift_x=int(drift_x)))
        print('%-22s %d frames  %dx%d  numbers dropped=%d  drift y%d x%d'
              % (slug, len(frames), frames[0].shape[1], frames[0].shape[0],
                 dropped, drift_y, drift_x))
    with open(os.path.join(OUT, 'manifest.json'), 'w') as fh:
        json.dump(manifest, fh, indent=2)


main()
