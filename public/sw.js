// Service Worker for Islamic Azan & Quran PWA
const CACHE_NAME = 'azan-quran-v3';
const STATIC_ASSETS = [
  '/manifest.json',
  '/icon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = event.request.url;

  // Never intercept dynamic modules, dev server scripts, vite internals, or API/audio
  if (
    url.includes('/@') ||
    url.includes('/src/') ||
    url.includes('node_modules') ||
    url.includes('.vite') ||
    url.includes('hot-update') ||
    url.includes('/api/') ||
    url.includes('audio')
  ) {
    return;
  }

  // For HTML documents/navigations: Always Network First so application is never stale!
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // For static icons and manifest: Cache First
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request);
    })
  );
});

