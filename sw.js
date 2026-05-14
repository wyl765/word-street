const CACHE_NAME = 'word-street-v2';
const ASSETS = [
  './',
  'index.html',
  'pronunciation.js',
  'audio-index.json',
  'words-level1.js',
  'words-level2.js',
  'words-level2a.js',
  'words-level2b.js',
  'words-level2c.js',
  'words-level2d.js',
  'words-level3a.js',
  'words-level3b.js',
  'words-level3c.js',
  'words-level4a.js',
  'words-level4b.js',
  'words-level4c.js',
  'words-level5a.js',
  'words-level5b.js',
  'words-level5c.js',
  'words-level5d.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return response;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
