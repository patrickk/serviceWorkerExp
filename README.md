# SERVICE WORKER EXPERIMENT



## Notes

```




/* If wanting to cache new requests cumulatively, do so by handling the response of the fetch request then
   adding to cache:

   self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});



What we are doing is this:

Add a callback to .then() on the fetch request.
Once we get a response, we perform the following checks:
Ensure the response is valid.
Check the status is 200 on the response.
Make sure the response type is basic, which indicates that it's a request from our origin. This means that requests to third party assets aren't cached as well.
If we pass the checks, we clone the response. The reason for this is that because the response is a Stream, the body can only be consumed once. Since we want to return the response for the browser to use, as well as pass it to the
*/ 


/* UPDATING SERVICE WORKER 


Update your service worker JavaScript file. When the user navigates to your site, 
the browser tries to redownload the script file that defined the service worker in the background. 
If there is even a byte's difference in the service worker file compared to what it currently has, 
it considers it new.

Your new service worker will be started and the install event will be fired.

At this point the old service worker is still controlling the current pages so the new service worker will enter a waiting state.

When the currently open pages of your site are closed, the old service worker will be killed and the new service worker will take control.

Once your new service worker takes control, its activate event will be fired.










*/ 


```