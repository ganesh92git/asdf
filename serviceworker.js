const staticAssets = [
    './',
    './app.js'
];

self.addEventListener('install', async event => {
    // #caches are http caches provided by service worker check Application >Cache > Cache Storage
    const cache = await caches.open('static-def'); // stores the shell part
    cache.addAll(staticAssets);
});


self.addEventListener('fetch', event => {
    const {request} = event;
    const url = new URL(request.url);
    if(mode==false)
    event.respondWith(cacheData(request));
    else{
        if(url.origin === location.origin) {
            event.respondWith(cacheData(request));
        } else {
            event.respondWith(networkFirst(request));
        }
    }
});

/*
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
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
*/
