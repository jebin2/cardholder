const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/cardholder',
    '/cardholder/index.html',
    '/cardholder/css/styles.css',
    '/cardholder/js/crypto-js.min.js',
    '/cardholder/js/app.js',
    '/cardholder/manifest.json',
    '/cardholder/images/icon-512.png',
    '/cardholder/images/icon-192.png',
    '/cardholder/images/icon-180.png',
    '/cardholder/images/icon-120.png',
    '/cardholder/images/icon-96.png',
    '/cardholder/images/icon-60.png',
    '/cardholder/images/icon-48.png',
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
