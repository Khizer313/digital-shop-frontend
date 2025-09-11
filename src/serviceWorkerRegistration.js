const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/
    )
);

export function register(config) {
  if ('serviceWorker' in navigator) {
    const swUrl = '/service-worker.js'; // ✅ public folder

    return navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Worker registered:', registration);
        if (config && config.onSuccess) config.onSuccess(registration);
        return registration;
      })
      .catch((err) => {
        console.error('SW registration failed:', err);
      });
  }
  return Promise.resolve();
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => registration.unregister())
      .catch((error) => console.error(error.message));
  }
}
