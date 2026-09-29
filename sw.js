const CACHE_NAME = 'mon-studio-v1';
const assetsToCache = [
  './index.html',
  // Ajoutez ici vos autres fichiers CSS, JS ou images si nécessaire
];

// Installation du Service Worker et mise en cache des fichiers de base
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Interception des requêtes réseau pour servir le cache en mode hors-ligne
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
