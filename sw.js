/*
    - Initiate SW
    - Get ID in URL via self.Location.href(or target/etcetc)
    - Every time there is a change (IP change) track 


*/
console.log('global state');
// window.onclose = ( () => {
//     console.log('tab closed');
// })
let CACHE_NAME = 'my-site-cache-v1';

let urlsToCache = [
    // '/abc123',
    // '/abc456',
    // '/abc789'
    './randID.js'
];

/*
    Need to take following steps in the install callback
    1. Open a cache.
    2. Cache files.
    3. Confirm whether all the required assets are cached or not.

    IMPORTANT: If any of the files fail to download, then install step fails

    ALSO IMPORTANT: Do NOT use it to manage global state. If anything, define in top-level
                    service worker global scope (optionally waiting on a promise to resolve inside the fetch event)
*/

self.addEventListener('install', function(e) {
    console.log(e);
    // Prevents w`aiting, which means the SW will activate as soon as it's finished installing
    // Meaning new SW doesn't have to wait for old SW to stop controlling any of the clients?
    // self.skipWaiting();
    // Takes a promise and uses it to know how long installation takes, and whether it was
    // successful or not.
    e.waitUntil(
        cacheAssets()
    );

});

function cacheAssets() {
    // Call with desired cache name
    caches.open(CACHE_NAME)
        .then(function(cache){
            console.log('Opened cache');
            // Pass in array of files
             return cache.addAll(urlsToCache);
        });
}

// Activates once the old SW is gone and new SW is able to control clients
// Ideal time to do stuff taht you couldn't do while the old SW was still in use, 
// such as migrating DBs and clearing caches
self.addEventListener('activate', function(e) {
    console.log('Activated', e);
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});




self.addEventListener('sync', function(event) {
    if (event.tag == 'myFirstSync') {
      event.waitUntil(
        setInterval( () => {
            // fetch('https://jsonplaceholder.typicode.com/todos/1')
            fetch('https://rest-test-1234.herokuapp.com/profile')
                .then(response => response.json())
                .then(json => console.log(json))
                .then(() => console.log(`${new Date().toLocaleString()}`));
            }, 5000).then(() => console.log('done'))
      );
    }
  });

// Listen for sync event... Where should this be implemented?
// self.addEventListener('sync', function(event) {
//     if (event.tag == 'myFirstSync') {
//       event.waitUntil(doSomeStuff());
         // wait until url comes back 
//     }
//   });

/* 

// In serviceworker.js
self.addEventListener('fetch', (event) => {
  // Parse the URL
  const requestURL = new URL(event.request.url);
  // Handle article URLs
  if (/^\/article\//.test(requestURL.pathname)) {
    event.respondWith(/* some response strategy );
    return;
  }
  if (/\.webp$/.test(requestURL.pathname)) {
    event.respondWith(/* some other response strategy );
    return;
  }
});

*/
// console.log(self);
// console.log(caches);


/*
    After SW installed/user navigates to diff page or refreshes, SW will begin to receive fetch events



*/

// fetch('https://jsonplaceholder.typicode.com/todos/1')
// .then(response => response.json())
// .then(json => console.log(json));

// self.addEventListener('fetch', function(e) {
//     let i = 0;
//     console.log(e);
//     e.respondWith(
//         setInterval( () => {
//         // fetch('https://jsonplaceholder.typicode.com/todos/1')
//         fetch('https://rest-test-1234.herokuapp.com/profile')
//             .then(response => response.json())
//             .then(json => console.log(json))
//             .then(() => console.log(`${new Date().toLocaleString()}`));
//         }, 5000).then(
//             // .then(
//         // Looks at the request and finds any cached results from any of the caches your SW created
//         console.log(e.request),
//         // console.log(caches),
//         caches.match(e.request)
//         // If matching response, return the cached val. Else, return result of a call to fetch aka make
//         // a network request and return the data if anything can be retrieved from network
//             )
//         .then(function(response) {
//             console.log(response);
//             if(response) {
//                 console.log(`Successfully fetched from cache: ${e.request.url}`);
//                 return response;
//             } else {
//                 console.error(`Failed to fetch src: ${e.request.url}`);
//             }
//             return fetch(e.request);
//         })
//     );
// });

