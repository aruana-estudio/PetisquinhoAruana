const cacheName = "AruanaEstudio-Petisquinho-1.0.9";
const contentToCache = [
    "Build/9dd673395944efb815640791e3186bd1.loader.js",
    "Build/185f3be041cd8cfbd9c10e3839d5e7c8.framework.js",
    "Build/9627ef8e41cdefa9e49517e4857d9903.data",
    "Build/b670e69a2697bac4cc67c9bb21698413.wasm",
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
