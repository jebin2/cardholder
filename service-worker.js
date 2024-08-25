/* eslint-disable no-restricted-globals */

// Import Workbox from CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.core.clientsClaim();

// Precache all assets
workbox.precaching.precacheAndRoute([{"revision":"710055d74e0b790711c731833daf8f88","url":"favicon.ico"},{"revision":"fde0a08f64c0f4fcd792cb40bda12370","url":"icon-120.png"},{"revision":"6d0706f06433ec89dfa3b9d0814ba0ae","url":"icon-180.png"},{"revision":"77bc9c6353c9b7e3a3900561ba4bf51f","url":"icon-192.png"},{"revision":"8e7f2b5cd68c9966352002cd6742668c","url":"icon-48.png"},{"revision":"5c6620ddf4e3bbf20f1e799d2ea27838","url":"icon-512.png"},{"revision":"7ea5ced2f5a8528f1fa7f79f4371d904","url":"icon-60.png"},{"revision":"ef1283b2289d8c3fc839e78d6955915a","url":"icon-96.png"},{"revision":"7a4231c7779f3de89fa15afab71b01ab","url":"index.html"},{"revision":"5a7a7243587cb1617a5023486aa5a175","url":"precache-manifest.5a7a7243587cb1617a5023486aa5a175.js"},{"revision":"2d190008e3d3a8dee62531482a461df6","url":"screenshot-1920x1080.png"},{"revision":"c6a390798d21f590232e88019256084c","url":"screenshot-800x600.png"},{"revision":"7aabcc70dd733c502178572b6206a18b","url":"static/css/main.69765cf6.chunk.css"},{"revision":"7aab279467d16099d6d0f57e78d1762a","url":"static/js/2.23ebe2fd.chunk.js"},{"revision":"03c5266363dac19854f6448c94b9b280","url":"static/js/main.159dd8b9.chunk.js"},{"revision":"3b558dde662852205ad7e600d8485cf6","url":"static/js/runtime-main.5be9f528.js"}] || []);