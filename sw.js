
const cacheName = "v1";
const assets = [
  "/",
  "/tailwind.config.js",
  "/script.js",
  "/dist/img/Desain tanpa judul.png",
  "/dist/img/2.jpg",
  "/dist/js/script.js",
  "/dist/img/icon-192x192.jpg",
  "/dist/img/icon-512x512.jpg",
  ""
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets); // Menggunakan assets sebagai nama array yang benar
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheAllowlist = [cacheName]; // Hanya mengizinkan cache saat ini

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (!cacheAllowlist.includes(name)) {
            console.log(`Deleting old cache: ${name}`); // Perbaikan pada template literal
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(cacheName).then((cache) => {
      return fetch(event.request.url).then((fetchResponse) => {
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      }).catch(() => {
        return cache.match(event.request.url);
      });
    })
  );
});
