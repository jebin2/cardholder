const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||
	window.location.hostname === '[::1]' ||
	window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(config) {
	if ('serviceWorker' in navigator) {
		const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
		if (publicUrl.origin !== window.location.origin) {
			return; // Exit if the PUBLIC_URL is on a different origin
		}

		window.addEventListener('load', () => {
			const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
			if (isLocalhost) {
				checkServiceWorker(swUrl, config, true);
			} else {
				registerServiceWorker(swUrl, config);
			}
		});
	}
}

function registerServiceWorker(swUrl, config) {
	navigator.serviceWorker
		.register(swUrl, {type: "module"})
		.then((registration) => {
			handleServiceWorkerUpdate(registration, config);
		})
		.catch((error) => {
			console.error('Error during service worker registration:', error);
		});
}

function checkServiceWorker(swUrl, config, isLocalhost) {
	fetch(swUrl, { headers: { 'Service-Worker': 'script' } })
		.then((response) => {
			const contentType = response.headers.get('content-type');
			if (response.status === 404 || (contentType && !contentType.includes('javascript'))) {
				if (isLocalhost) {
					unregisterServiceWorker();
					// window.location.reload();
				}
			} else {
				registerServiceWorker(swUrl, config);
			}
		})
		.catch(() => {
			console.log('No internet connection found. App is running in offline mode.');
		});
}

function handleServiceWorkerUpdate(registration, config) {
	registration.onupdatefound = () => {
		const installingWorker = registration.installing;
		if (installingWorker == null) {
			return;
		}

		installingWorker.onstatechange = () => {
			if (installingWorker.state === 'installed') {
				if (navigator.serviceWorker.controller) {
					console.log('New content is available and will be used when all tabs for this page are closed.');

					if (config && config.onUpdate) {
						config.onUpdate(registration);
					}
				} else {
					console.log('Content is cached for offline use.');

					if (config && config.onSuccess) {
						config.onSuccess(registration);
					}
				}
			}
		};
	};
}

function unregisterServiceWorker() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready
			.then((registration) => registration.unregister())
			.catch((error) => {
				console.error(error.message);
			});
	}
}

export function unregister() {
	unregisterServiceWorker();
}
