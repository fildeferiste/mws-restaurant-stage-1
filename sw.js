let staticCacheName = 'restaurant-review-v1';
// Create Cache
self.addEventListener('install', function(event){
  const files = ['/'];
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache){
      return cache.addAll(files);
    })
  );
});

//delete old caches, update caches
self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
      cacheNames.filter(function(cacheName){
        return cacheName.startsWith('restaurant-review') &&
               cacheName != staticCacheName;
      }).map(function(cacheName){
        return cache.delete(cacheName);
      })
    }))
  );
});

// Update from cache, if doesn't exist, get from server
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) return response;
      return fetch(event.request);
    })
  );
});

/*self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response){
      // returns promise - eventual response of promise
      if (response.status == 404) {
        new Response('nothingness');
      }

    })
    .catch(function() {
      new Response('oho!');
    })
  );
  if(event.request.url.endsWith('.jpg')) {
    event.respondWith(
      fetch('/img/1.jpg')
    );
  }

}); */

// Register Service Worker TODO: CHECK THIS! LOAD!
self.addEventListener('load', function(){
    console.log(navigator.serviceWorker);
    if(!navigator.serviceWorker) return;

    navigator.serviceWorker.register('/sw.js')
      .then(function(){
        console.log('Service Worker registered.');
      })
      .catch(function(){
        console.log('How did you end up here?');
      });
});
