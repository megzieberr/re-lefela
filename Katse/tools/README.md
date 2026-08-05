# Katse sprite-sheet pipeline

How the animated Katse in `img/katse-*.webp` is made, and how to add more.
Written 2026-08-05 (session 37). Needs `pillow`, `numpy`, `scipy`.

## The four steps

Run them from anywhere — the scripts use absolute paths into this repo.

| Script | Does | Writes |
|---|---|---|
| `slice_katse.py` | cuts each sprite sheet in `Katse/new/` into aligned frames | `Katse/frames/<slug>/NN.png` |
| `regcheck.py` | sanity check: how much of the silhouette moves between first and last frame | prints a table |
| `make_gifs.py` | looping GIF previews on the app's background | `Katse/gifs/` |
| `make_preview.py` | the pick-the-keepers page | `Katse/preview.html` |
| `build_assets.py` | the ones Megan kept → animated WebP for the app | `img/katse-*.webp` |

`Katse/frames/` and `Katse/gifs/` are **derived** — delete them freely, they rebuild
from `Katse/new/`. Only `Katse/new/` is irreplaceable.

## Things that will bite you

**Slice by the cat's body, never the transparent box.** Frames are aligned by
maximising overlap with frame 0 so only the animated part moves. `regcheck.py`
tells you if that worked: a clean tail-wag scores under 20%, a good head-turn
about 1%. The head-turn sheet that scored 69% was genuinely broken art.

**Sheets arrive with frame numbers drawn into them.** Three of the first
fourteen did. A stray blob is a number when it sits clear of every cat's
*silhouette* — a bounding-box test is not enough, because a digit above the
head is inside the box. There is a size test too, or Sliding's motion lines get
deleted as if they were numbers.

**Some sheets carry a dark glow in the RGB of transparent pixels.** Flooring
alpha below 60 removes it (`GLOW_ALPHA_FLOOR`).

**Frame order is not always play order.** The walking sheet drew its crouch in
the middle of a row; see `REORDER` in `slice_katse.py`.

## ⚠️ After changing any pose's artwork

Two things in `index.html` are hand-written numbers that nothing checks:

1. **`.kv-*{aspect-ratio:W/H}`** must match the real pixel size of the file.
   They reserve each pose's box before it decodes so the layout does not jump.
   Stale values caused the home cat to render 35px too tall in v41.
2. **`.katse-hero .katse.kv-walk{width:214px}`** is measured so the seated cat
   at the end of the walk-in is exactly as tall as the sitting cat it becomes.

`home`, `talk` and `tilt` are built onto **one shared canvas** (see
`SHARE_CANVAS_WITH_HOME`) so she can start talking mid-screen without the
`<img>` changing shape. Keep that if you add another sitting pose.

## The prompt wording that works

Generators keep redrawing Katse from scratch. What stopped it:

> Use the attached picture as a locked reference. Copy this exact cat: same
> shapes, same proportions, same thick black outline, same pink inner ears,
> same eye shape. Do NOT redraw or restyle it. **This is an edit of the
> attached image, not a new drawing.**

Then name what must not change ("in all 4 frames the body, legs and tail must
be IDENTICAL — only the head moves"), ask for 4 frames rather than 6 or 8, and
end with "do not add numbers, labels, captions, backgrounds, shadows or glow".

Tripo3D followed these noticeably better than ChatGPT did.
