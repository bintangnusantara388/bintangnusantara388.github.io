// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js');

// Konfigurasi Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBRmkOrvu7p2X66AANqKI12ge7iG_CBiGI",
  authDomain: "portofolio-bintangfn.firebaseapp.com",
  projectId: "portofolio-bintangfn",
  storageBucket: "portofolio-bintangfn.firebasestorage.app",
  messagingSenderId: "551358110138",
  appId: "1:551358110138:web:50a238cd6d1ca733616583"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Pesan di terima', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
