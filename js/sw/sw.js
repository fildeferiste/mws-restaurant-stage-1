console.log('codage');
self.addEventListener('fetch', function() {
  console.log('fetched');
});
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('/sw.js').then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function(err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }
window.addEventListener('load', function(){
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
