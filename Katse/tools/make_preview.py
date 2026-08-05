"""Generate Katse/preview.html — every sliced animation looping, so Megan can
pick keepers before anything is wired into the app."""
import json
import os

KATSE = r'C:\Users\megzi\Desktop\Claude Code Projects\re-lefela\Katse'
manifest = json.load(open(os.path.join(KATSE, 'frames', 'manifest.json')))

# Closest pose already in the app, checked against img/katse-*.png by eye.
# '' means there is nothing like it in the app yet.
POSE = {
    'moving-ears':          ('awake',   'the peek-over-the-wall pose, animated'),
    'tail-moving':          ('rest',    'the draped winking pose, animated'),
    'tails-and-paws':       ('happy',   'the belly-up pose, animated'),
    'sleeping':             ('sleep',   'the curled-up pose, animated'),
    'tail-waving':          ('home',    'the sitting home pose, tail animated'),
    'tail-waving-option-2': ('home',    'same idea, second take'),
    'talking-option-2':     ('home',    'sitting, but the mouth moves'),
    'extended-body':        ('curious', 'the finished cat — a still, not an animation'),
    'angry':                ('',        'a new mood — cross'),
    'talking':              ('',        'new — standing and talking'),
    'sliding':              ('',        'new — sliding down, paws up'),
    'moving-head':          ('home',    'take two — sitting, only the head tilts'),
    'stretch-closed-eyes':  ('',        'take two — a stretch, happy closed eyes'),
    'stretch-open-eyes':    ('',        'take two — a stretch, eyes open'),
    'extended':             ('curious', 'take two — the finished cat, face intact'),
    'talking-curious-katse': ('curious', 'the finished cat talking — pairs with extended'),
    'walking': ('home', 'walks in and sits down — an entrance, plays once'),
}

cards = []
for e in sorted(manifest, key=lambda m: m['slug']):
    slug = e['slug']
    pose, blurb = POSE.get(slug, ('', ''))
    still = ('<figure class="still"><img src="../img/katse-%s.png" alt="">'
             '<figcaption>in the app now<br><b>%s</b></figcaption></figure>'
             % (pose, pose)) if pose else ''
    warn = ''
    strip = ''.join('<img src="frames/%s/%02d.png" alt="frame %d">'
                    % (slug, i, i + 1) for i in range(e['frames']))
    cards.append('''
  <article class="card" data-slug="{slug}" data-frames="{n}" data-w="{w}" data-h="{h}">
    <header>
      <h2>{title}</h2>
      <p class="blurb">{blurb}</p>
    </header>
    <div class="stage">
      <div class="anim"><img class="play" src="frames/{slug}/00.png" alt="{title}"></div>
      {still}
    </div>
    {warn}
    <p class="meta">{n} frame{s} &middot; {w}&times;{h} &middot; from <code>{src}</code>{nums}</p>
    <div class="verdict">
      <button data-v="keep">Keep it</button>
      <button data-v="maybe">Not sure</button>
      <button data-v="no">No</button>
    </div>
    <details><summary>See the {n} frame{s} on their own</summary>
      <div class="strip">{strip}</div>
    </details>
  </article>'''.format(
        slug=slug, n=e['frames'], w=e['w'], h=e['h'], src=e['source'],
        title=slug.replace('-', ' '), blurb=blurb, still=still, warn=warn,
        strip=strip, s='' if e['frames'] == 1 else 's',
        nums=(' &middot; %d frame number%s removed' %
              (e['numbers_removed'], '' if e['numbers_removed'] == 1 else 's'))
             if e['numbers_removed'] else ''))

html = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Katse sprite sheets &mdash; pick the keepers</title>
<style>
  :root {
    --bg:#fdf7f9; --card:#ffffff; --ink:#1a161d; --dim:#82717c;
    --pink:#f6a8c7; --deep:#d76a9b; --stage:#fdf7f9;
  }
  * { box-sizing:border-box; }
  body { margin:0; padding:0 0 6rem; background:var(--bg); color:var(--ink);
         font:16px/1.55 "Segoe UI", system-ui, sans-serif; }
  header.top { padding:2rem 1.5rem 1rem; max-width:1100px; margin:0 auto; }
  header.top h1 { margin:0 0 .35rem; font-size:1.7rem; }
  header.top p { margin:.2rem 0; color:var(--dim); max-width:62ch; }
  .controls { position:sticky; top:0; z-index:5; background:var(--card);
              border-bottom:2px solid var(--pink); padding:.75rem 1.5rem;
              display:flex; gap:1.5rem; align-items:center; flex-wrap:wrap; }
  .controls label { font-size:.9rem; display:flex; gap:.5rem; align-items:center; }
  .swatch { width:26px; height:26px; border-radius:50%; border:2px solid #0002;
            cursor:pointer; padding:0; }
  .swatch[aria-pressed="true"] { outline:3px solid var(--deep); outline-offset:2px; }
  main { max-width:1100px; margin:0 auto; padding:1.5rem;
         display:grid; gap:1.5rem; grid-template-columns:repeat(auto-fill,minmax(330px,1fr)); }
  .card { background:var(--card); border-radius:16px; padding:1rem 1.1rem 1.1rem;
          box-shadow:0 2px 10px #0000000f; display:flex; flex-direction:column; gap:.6rem; }
  .card h2 { margin:0; font-size:1.15rem; text-transform:capitalize; }
  .blurb { margin:0; color:var(--dim); font-size:.9rem; }
  .stage { background:var(--stage); border-radius:12px; padding:.75rem;
           display:flex; gap:.75rem; align-items:flex-end; justify-content:center;
           min-height:180px; transition:background .2s; }
  .anim { display:flex; align-items:flex-end; justify-content:center; }
  .anim img { height:var(--size,150px); width:auto; image-rendering:auto; display:block; }
  .still { margin:0; text-align:center; opacity:.55; }
  .still img { height:calc(var(--size,150px) * .55); width:auto; display:block; }
  .still figcaption { font-size:.7rem; color:var(--dim); margin-top:.3rem; }
  .meta { margin:0; font-size:.78rem; color:var(--dim); }
  .meta code { font-size:.95em; }
  .warn { margin:0; font-size:.85rem; background:#fff4e5; border-left:3px solid #e8a33d;
          padding:.5rem .7rem; border-radius:0 8px 8px 0; }
  .verdict { display:flex; gap:.4rem; }
  .verdict button { flex:1; padding:.45rem; border-radius:9px; cursor:pointer;
                    border:2px solid #0001; background:#fff; font-size:.85rem; }
  .verdict button[aria-pressed="true"] { background:var(--pink); border-color:var(--deep);
                                         font-weight:600; }
  details summary { cursor:pointer; font-size:.85rem; color:var(--deep); }
  .strip { display:flex; gap:.4rem; overflow-x:auto; padding:.6rem 0; }
  .strip img { height:90px; width:auto; background:#fdf7f9; border-radius:6px; }
  #summary { position:fixed; left:0; right:0; bottom:0; background:var(--ink);
             color:#fff; padding:.7rem 1.5rem; font-size:.87rem; }
  #summary b { color:var(--pink); }
</style>
</head>
<body>
<header class="top">
  <h1>Katse sprite sheets &mdash; pick the keepers</h1>
  <p>Every sheet cut into frames and lined up on the cat&rsquo;s body, so only the
     part that is meant to move actually moves. Nothing is wired into the app yet.</p>
  <p>Watch each one, then tap <b>Keep it</b>, <b>Not sure</b> or <b>No</b>. Your
     choices are remembered on this laptop and totalled at the bottom.</p>
</header>

<div class="controls">
  <label>Speed
    <input type="range" id="fps" min="1" max="16" value="3">
    <span id="fpsval">3 per second</span>
  </label>
  <label>Size
    <input type="range" id="size" min="80" max="300" value="150">
  </label>
  <label>Background
    <button class="swatch" data-bg="#fdf7f9" title="the app's background" style="background:#fdf7f9"></button>
    <button class="swatch" data-bg="#ffffff" title="white card" style="background:#ffffff"></button>
    <button class="swatch" data-bg="#1a161d" title="dark" style="background:#1a161d"></button>
    <button class="swatch" data-bg="#7ac6a8" title="a colour, to catch stray edges" style="background:#7ac6a8"></button>
  </label>
</div>

<main>__CARDS__</main>

<div id="summary">Nothing picked yet.</div>

<script>
const cards = [...document.querySelectorAll('.card')];

/* preload every frame so the loop never stutters mid-watch */
const sheets = cards.map(card => {
  const slug = card.dataset.slug, n = +card.dataset.frames;
  const imgs = [];
  for (let i = 0; i < n; i++) {
    const im = new Image();
    im.src = `frames/${slug}/${String(i).padStart(2,'0')}.png`;
    imgs.push(im);
  }
  return { card, slug, imgs, el: card.querySelector('.play'), i: 0 };
});

let timer = null;
function run(fps) {
  clearInterval(timer);
  timer = setInterval(() => {
    for (const s of sheets) {
      if (s.imgs.length < 2) continue;
      s.i = (s.i + 1) % s.imgs.length;
      s.el.src = s.imgs[s.i].src;
    }
  }, 1000 / fps);
}

const fps = document.getElementById('fps'), fpsval = document.getElementById('fpsval');
fps.oninput = () => { fpsval.textContent = fps.value + ' per second'; run(+fps.value); };
run(+fps.value);

document.getElementById('size').oninput = e =>
  document.documentElement.style.setProperty('--size', e.target.value + 'px');

document.querySelectorAll('.swatch').forEach(b => b.onclick = () => {
  document.querySelectorAll('.swatch').forEach(o => o.setAttribute('aria-pressed', o === b));
  document.documentElement.style.setProperty('--stage', b.dataset.bg);
});
document.querySelector('.swatch').setAttribute('aria-pressed', 'true');

/* verdicts, remembered between visits */
const KEY = 'katse-verdicts';
const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
/* drop votes for sheets that have since been retired or renamed */
for (const k of Object.keys(saved))
  if (!cards.some(c => c.dataset.slug === k)) delete saved[k];

function paint() {
  cards.forEach(card => {
    const v = saved[card.dataset.slug];
    card.querySelectorAll('.verdict button').forEach(b =>
      b.setAttribute('aria-pressed', b.dataset.v === v));
  });
  const tally = { keep: [], maybe: [], no: [] };
  for (const [slug, v] of Object.entries(saved)) if (tally[v]) tally[v].push(slug.replace(/-/g,' '));
  const undecided = cards.length - Object.keys(saved).length;
  document.getElementById('summary').innerHTML =
    `<b>Keep (${tally.keep.length}):</b> ${tally.keep.join(', ') || '—'} &nbsp;&nbsp;` +
    `<b>Not sure (${tally.maybe.length}):</b> ${tally.maybe.join(', ') || '—'} &nbsp;&nbsp;` +
    `<b>No (${tally.no.length}):</b> ${tally.no.join(', ') || '—'} &nbsp;&nbsp;` +
    `<b>Still to look at:</b> ${undecided}`;
}

cards.forEach(card => card.querySelectorAll('.verdict button').forEach(b => b.onclick = () => {
  const slug = card.dataset.slug;
  if (saved[slug] === b.dataset.v) delete saved[slug]; else saved[slug] = b.dataset.v;
  localStorage.setItem(KEY, JSON.stringify(saved));
  paint();
}));
paint();
</script>
</body>
</html>
'''.replace('__CARDS__', '\n'.join(cards))

dest = os.path.join(KATSE, 'preview.html')
with open(dest, 'w', encoding='utf-8') as fh:
    fh.write(html)
print('wrote', dest, '(%d cards)' % len(cards))
