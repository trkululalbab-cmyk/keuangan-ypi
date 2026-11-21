/* Service worker aplikasi Keuangan YPI.
   Hanya menyimpan berkas pembungkus (layar pembuka, ikon) agar
   aplikasi bisa dipasang dan tetap terbuka saat offline.
   Data keuangan TIDAK disimpan di perangkat: semua tetap diambil
   langsung dari web app Google Apps Script. */

const CACHE = "keuangan-ypi-v1";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/logo.webp",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CACHE).then(function (cache) { return cache.addAll(SHELL); }));
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  const request = event.request;
  const url = new URL(request.url);

  /* Jangan campuri permintaan ke Google (web app & data) */
  if (url.origin !== self.location.origin || request.method !== "GET") return;

  /* Halaman: ambil versi terbaru dulu, pakai simpanan bila offline */
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(function (response) {
        const copy = response.clone();
        caches.open(CACHE).then(function (cache) { cache.put("./index.html", copy); });
        return response;
      }).catch(function () { return caches.match("./index.html"); })
    );
    return;
  }

  /* Ikon dan berkas lain: dari simpanan, perbarui di belakang */
  event.respondWith(
    caches.match(request).then(function (cached) {
      const network = fetch(request).then(function (response) {
        const copy = response.clone();
        caches.open(CACHE).then(function (cache) { cache.put(request, copy); });
        return response;
      }).catch(function () { return cached; });
      return cached || network;
    })
  );
});
