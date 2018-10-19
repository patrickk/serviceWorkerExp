let CACHE_NAME = 'my-site-cache-v1';

let urlsToCache = [
    // '/abc123',
    // '/abc456',
    // '/abc789'
    'randID.js'
]

// function randomGen() {
//     return Math.floor(Math.random() * 100 +1);
// }

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// self.addEventListener('sync', function(event) {
//     if (event.tag == 'myFirstSync') {
//       event.waitUntil(doSomeStuff());
//     }
//   });

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request)
        .then(function(response) {
            if(response) {
                console.log(`Successfully fetched from cache: ${e.request.url}`);
                return response;
            } else {
                console.error(`Failed to fetch src: ${e.request.url}`);
            }
            return fetch(e.request);
        })
    );
});