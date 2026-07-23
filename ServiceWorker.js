const cacheName = "AruanaEstudio-Petisquinho-1.0.9";
const contentToCache = [
    "Build/9153f9efe3d6220f80d5dec24b2290ed.loader.js",
    "Build/185f3be041cd8cfbd9c10e3839d5e7c8.framework.js",
    "Build/eb2f06b4ec5b3a6624ed91e3f8c6a077.data",
    "Build/be4101495df9f7010179ed2380bd3584.wasm",
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
