const cacheName = "AruanaEstudio-Petisquinho-1.0.9";
const contentToCache = [
    "Build/5fdcfa6d5c2594aad84a691d71a67ec7.loader.js",
    "Build/185f3be041cd8cfbd9c10e3839d5e7c8.framework.js",
    "Build/e88cbc9bdb7282d0931c80dd2c921ecd.data",
    "Build/3c21abc82186819911850d4cce6ca29b.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
