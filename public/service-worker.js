/* eslint-disable no-restricted-globals */

// Import Workbox from CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.core.clientsClaim();

// Precache all assets
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);