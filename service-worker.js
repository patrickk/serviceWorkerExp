// Check to see service worker exists in browser
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker
        navigator.serviceWorker.register('./sw.js').then(function(registration) {
            console.log('SW registration successful with scope: ', registration.scope);
        
        }).catch(function(err) {
            console.log('Sw registration failed: ', err);
        });
    });
// Requesting a one-off sync
    // navigator.serviceWorker.ready.then(function(swRegistration) {
    //     // Tag name should be unique ('myFirstSync') 
    //     // If you want separate sync events, use unique tags
    //     return swRegistration.sync.register('myFirstSync');
    //   });


    }

    