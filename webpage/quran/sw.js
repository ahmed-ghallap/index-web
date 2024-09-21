// بسم الله الرحمن الرحيم
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open("static")
        .then(cache => {
            return cache.addAll([
                "./", "./master.js", "./helpers.js",
                "./bootstrap.js", "./bootstrap.rtl.min.css"
            ]);
        })
    );
});


self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            return response || fetch(e.request);
        })
    );
});