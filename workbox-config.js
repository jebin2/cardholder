module.exports = {
	globDirectory: 'build/',
	globPatterns: [
	  '**/*.{js,css,html,png,jpg,ico}'
	],
	swDest: 'build/service-worker.js',
	swSrc: 'public/service-worker.js',
	// Optional: Other configuration options for Workbox
  };
  