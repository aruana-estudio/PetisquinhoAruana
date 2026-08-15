const cacheName = "AruanaEstudio-Petisquinho-1.0.9";
const contentToCache = [
    "Build/3cc620dbec6fa64a2c35d236b90e75b6.loader.js",
    "Build/185f3be041cd8cfbd9c10e3839d5e7c8.framework.js",
    "Build/f608fb3b914f395422383bf459184905.data",
    "Build/cc02872c026aad56aca16b52fbdec1ee.wasm",
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
