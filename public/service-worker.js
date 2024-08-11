const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/icon-512.png',
    '/icon-192.png',
    '/icon-180.png',
    '/icon-120.png',
    '/icon-96.png',
    '/icon-60.png',
    '/icon-48.png',
    '/cardholder',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/icon-512.png',
    '/icon-192.png',
    '/icon-180.png',
    '/icon-120.png',
    '/icon-96.png',
    '/icon-60.png',
    '/icon-48.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                    return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});
