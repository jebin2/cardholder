/* eslint-disable no-restricted-globals */

// Import Workbox from CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.core.clientsClaim();

// Precache all assets
workbox.precaching.precacheAndRoute([{"revision":"710055d74e0b790711c731833daf8f88","url":"favicon.ico"},{"revision":"fde0a08f64c0f4fcd792cb40bda12370","url":"icon-120.png"},{"revision":"6d0706f06433ec89dfa3b9d0814ba0ae","url":"icon-180.png"},{"revision":"77bc9c6353c9b7e3a3900561ba4bf51f","url":"icon-192.png"},{"revision":"8e7f2b5cd68c9966352002cd6742668c","url":"icon-48.png"},{"revision":"5c6620ddf4e3bbf20f1e799d2ea27838","url":"icon-512.png"},{"revision":"7ea5ced2f5a8528f1fa7f79f4371d904","url":"icon-60.png"},{"revision":"ef1283b2289d8c3fc839e78d6955915a","url":"icon-96.png"},{"revision":"bf7c10b84e74ad2dfb0fbe0f94027130","url":"index.html"},{"revision":"8aa40a99ac6c3082bc623157775c85fc","url":"precache-manifest.8aa40a99ac6c3082bc623157775c85fc.js"},{"revision":"2d190008e3d3a8dee62531482a461df6","url":"screenshot-1920x1080.png"},{"revision":"c6a390798d21f590232e88019256084c","url":"screenshot-800x600.png"},{"revision":"12300abdb0862174316ee3ac4f55efe5","url":"static/css/main.7fd10353.chunk.css"},{"revision":"4522b9ea158a1e08a6ec1f77f4450698","url":"static/js/2.5e5a06c9.chunk.js"},{"revision":"3949763d4f3cfd9f339e6c07401ef8d1","url":"static/js/main.cca8d339.chunk.js"},{"revision":"3b558dde662852205ad7e600d8485cf6","url":"static/js/runtime-main.5be9f528.js"}] || []);