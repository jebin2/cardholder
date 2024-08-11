const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/cardholder',
    '/cardholder/index.html',
    '/cardholder/css/styles.css',
    '/cardholder/js/app.js',
    '/cardholder/manifest.json',
    '/cardholder/icon-512.png',
    '/cardholder/icon-192.png',
    '/cardholder/icon-180.png',
    '/cardholder/icon-120.png',
    '/cardholder/icon-96.png',
    '/cardholder/icon-60.png',
    '/cardholder/icon-48.png',
    '/cardholder/images/screenshot-1920x1080.png',
    '/cardholder/images/screenshot-800x600.png'
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
