import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.scss';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';
import { fetchDataFromApi } from './utils/api.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// console.log("Before SW register");

// ✅ Register Service Worker
serviceWorkerRegistration.register().then(async () => {
  // console.log("SW registered");

  const registration = await navigator.serviceWorker.ready;
  // console.log("SW ready:", registration);

  try {
    // Fetch notifications from Strapi
    const res = await fetchDataFromApi('/api/notifications?populate=*');
    const notifications = res?.data?.map((n) => ({
      id: n.id,
      title: n.title,
      mint: n.mint,
    })) || [];

    // console.log("Notifications to send SW:", notifications);

    // Send notifications to SW
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SET_NOTIFICATIONS',
        notifications,
      });
    } else {
      console.warn("No service worker controller yet");
    }
  } catch (err) {
    console.error("Failed to fetch notifications:", err);
  }
});

// console.log("End of index.js");
