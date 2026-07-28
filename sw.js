// Re:Lefela service worker.
// Strategy:
//   - navigations + app code (html/js/manifest/paths ending "/") -> NETWORK-FIRST,
//     falling back to cache only when offline. Fixes "old version still shows".
//   - images/icons -> cache-first with a quiet background refresh.
//   - audio/*.mp3 -> separate PERSISTENT cache (relefela-audio-vN), cache-first,
//     never wiped on app version bumps (clips are immutable once published);
//     bump its own vN only when a clip's content changes under the same filename.
//   - precache uses {cache:'reload'} so install never reads a stale HTTP-cached
//     index.html (GitHub Pages serves max-age=600).
//   - non-GET and cross-origin (Supabase, CDN) requests pass straight through.
const CACHE = 'relefela-v36';
// Bump AUDIO_CACHE's version suffix ONLY when an existing audio file's content
// changes (re-record/re-splice under the same filename). App version bumps
// (CACHE above) must never evict audio.
const AUDIO_CACHE = 'relefela-audio-v3';
const CORE = ['./', 'index.html', 'content.js', 'dialogues.js', 'builder-bank.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png',
  'img/katse-home.png', 'img/katse-awake.png', 'img/katse-rest.png',
  'img/katse-happy.png', 'img/katse-curious.png', 'img/katse-oops.png', 'img/katse-sleep.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k =>
      (k.startsWith('relefela-v') && k !== CACHE) ||
      (k.startsWith('relefela-audio-') && k !== AUDIO_CACHE)
    ).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

const isAppCode = url => /\.(?:html|js)$/.test(url.pathname) || url.pathname.endsWith('/') || url.pathname.endsWith('manifest.webmanifest');
const isAudio = url => /\/audio\//.test(url.pathname);

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return; // non-GET passes through
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // Supabase + CDN go to network

  // Audio: persistent cache-first, no version-bump eviction.
  if (isAudio(url)) {
    e.respondWith(caches.open(AUDIO_CACHE).then(async cache => {
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.status === 200) cache.put(req, res.clone());
      return res;
    }));
    return;
  }

  // App code + navigations: network-first, cache fallback offline only.
  if (req.mode === 'navigate' || isAppCode(url)) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const res = await fetch(req);
        if (res.ok) {
          cache.put(req, res.clone());
          return res;
        }
        const cached = (await cache.match(req)) || (req.mode === 'navigate' ? await cache.match('index.html') : undefined);
        return cached || res;
      } catch {
        return (await cache.match(req)) || (req.mode === 'navigate' ? cache.match('index.html') : Response.error());
      }
    })());
    return;
  }

  // Images/icons: cache-first, refresh quietly in the background.
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(req);
    const network = fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; }).catch(() => cached);
    return cached || network;
  }));
});
