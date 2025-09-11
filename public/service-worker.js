// Service Worker
let notifications = [];
let lastShown = {}; // Track last shown timestamp per notification

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated!');
  self.clients.claim();
});

// Listen for messages from main thread
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SET_NOTIFICATIONS') {
    notifications = event.data.notifications || [];
    console.log('SW received notifications:', notifications);
    checkNotifications();
  }
});

// Check and show notifications if interval passed
function checkNotifications() {
  if (!notifications || notifications.length === 0) return;

  const now = Date.now();

  notifications.forEach((notif) => {
    const { id, title, mint } = notif;
    const interval = (mint || 1) * 60 * 1000; // default 1 min

    const last = lastShown[id] || 0;

    // Show notification if interval passed
    if (now - last >= interval) {
      self.registration.showNotification(title, {
        body: 'Check our latest update 🔔',
        icon: '/logo192.png',
      });
      lastShown[id] = now;
    }
  });

  // Schedule next check in 1 min
  setTimeout(checkNotifications, 60 * 1000);
}
