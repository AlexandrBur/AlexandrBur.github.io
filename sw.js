/* Офлайн: статика прежде из кэша; HTML — сеть в приоритете (обновления без ручного сброса). */
const CACHE_VERSION = 'novosel-shell-v2';
const FALLBACK_HTML = './index.html';
const PRECACHE_URLS = [
  './index.html',
  './manifest.json',
  './logo-512.png',
  './qr-code.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

/** Документ: сначала сеть → обновляем кэш; офлайн — из кэша. */
async function networkFirstNavigate(request) {
  try {
    const networkResponse = await fetch(request);
    if (!networkResponse || !networkResponse.ok) {
      const stale =
        (await caches.match(request, { ignoreSearch: true })) ||
        (await caches.match(FALLBACK_HTML));
      return stale || networkResponse;
    }
    const copy = networkResponse.clone();
    const cache = await caches.open(CACHE_VERSION);
    await cache.put(request, copy);
    return networkResponse;
  } catch {
    const cached =
      (await caches.match(request, { ignoreSearch: true })) ||
      (await caches.match(FALLBACK_HTML));
    return cached;
  }
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirstNavigate(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (!response || !response.ok) return response;
          if (response.type !== 'basic' && response.type !== 'cors') return response;
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => {
          const url = new URL(event.request.url);
          const name = url.pathname.split('/').pop() || '';
          if (name === 'index.html' || (!name && url.pathname.endsWith('/'))) {
            return caches.match(FALLBACK_HTML);
          }
          return undefined;
        });
    })
  );
});
