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
	  {
		urlPattern: ({ url }) => url.pathname.includes('functions/getCardHolderData'),
		handler: 'NetworkOnly',
		options: {
		  plugins: [
			new workbox.backgroundSync.BackgroundSyncPlugin('sync-queue', {
			  maxRetentionTime: 24 * 60 // Retry for a max of 24 hours
			})
		  ]
		},
	  },
	],
	// Optional: Other configuration options for Workbox
  };
  