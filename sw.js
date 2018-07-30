let staticCacheName = 'restaurant-review-v1';

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


// Create Cache and files to be cached
self.addEventListener('install', function(event){
  const files = ['/',
                '/js',
                '/css',
                ];
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
    )})
  );
});
