const cacheName = "AruanaEstudio-Petisquinho-1.0.9";
const contentToCache = [
    "Build/8a8a38c0dc815eedf25cb1fe5df89304.loader.js",
    "Build/185f3be041cd8cfbd9c10e3839d5e7c8.framework.js",
    "Build/6be66edd1e3ea7526d2e9c38f1423a1e.data",
    "Build/9064292ed8b8d06be1aaf782f3a5dda2.wasm",
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
