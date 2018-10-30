# SERVICE WORKER EXPERIMENT


## Instructions

1. Navigate to https://patrickk.github.io/serviceWorkerExp/
2. Open up console and see that a current date entry and a simple object returns.
    - Object: `{name: "typicode"}`
    - This is hitting an endpoint as defined on  https://rest-test-1234.herokuapp.com/profile
    - To see other endpoints, navigate to the url above without `profile`.
3. Close out of tab and wait about 10 seconds.
4. Re-open tab back up and check console.
    - Console should show that the SW was hitting this endpoint even with the tab closed, as the timestamp notes.



## TODO
1. Investigate using [Background Sync](https://developers.google.com/web/updates/2015/12/background-sync)
    - Aaron was saying this is what we'd want to use to phone home/keep in contact with MAD server
    - May want to look into using [Workbox](https://developers.google.com/web/tools/workbox/) since it comes with a whole lotta tools for Service Workers and makes it easier to set up SWs.
2. When user closes tab and opens tab back, it seems like the fetch api is hitting the endpoint several times at once. Investigate why this occurs. We wouldn't want SW to hit endpoint multiple times whenever a tab is closed then opened. 
3. Investigate how to "refresh" Service Worker every 24 hours.
4. Clean up code and take out unnecessary comments.




## Results
- On desktop Chrome/Brave, SWs seemed to work well in running in background, even with tabs closed. 
    - By running `heroku logs --tail` I was able to see that the endpoint was getting hit even with the tab closed. 
- Aaron's Android Chrome showed that the SW was running even when he closed out of his browser/phone. Only when he went on airplane mode did the SW stop hitting the endpoint. This was done w/out background sync, so it may be worthwhile to take a look at using background sync. 



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