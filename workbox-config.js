module.exports = {
	globDirectory: 'build/',
	globPatterns: [
	  '**/*.{js,css,html,png,jpg,ico}'
	],
	swDest: 'build/service-worker.js',
	swSrc: 'src/service-worker.js',
	runtimeCaching: [
	  {
		urlPattern: ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
		handler: 'StaleWhileRevalidate',
		options: {
		  cacheName: 'images',
		  expiration: {
			maxEntries: 50,
		  },
		},
	  },
	],
	// Optional: Other configuration options for Workbox
  };
  