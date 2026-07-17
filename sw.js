// Re:Lefela service worker
const CACHE = 'relefela-v13';
const CORE = ['./', 'index.html', 'content.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png',
  'img/katse-home.png', 'img/katse-awake.png', 'img/katse-rest.png',
  'img/katse-happy.png', 'img/katse-curious.png', 'img/katse-oops.png', 'img/katse-sleep.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return; // Supabase + CDN go to network
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match('index.html')))
  );
});
