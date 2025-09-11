// src/subscribe.js
export async function subscribeUser() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "<VAPID_PUBLIC_KEY>" // backend se milega
      });

      // Subscription ko apne backend (Strapi) par save karna
      await fetch("http://localhost:1337/api/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: { "Content-Type": "application/json" }
      });

      console.log("User subscribed:", subscription);
    } catch (err) {
      console.error("Subscription failed", err);
    }
  }
}
