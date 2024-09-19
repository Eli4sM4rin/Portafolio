;
// Nombre y versión del caché
const CACHE_NAME = 'v1_cache_virtual_folio';
// Archivos a almacenar en caché
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './css/style.min.css',
  './js/main.js',
  './img/about.jpg',
  './img/blog-1.jpg',
  './img/blog-2.jpg',
  './img/blog-3.jpg',
  './img/favicon.ico',
  './img/portfolio-1.jpg',
  './img/portfolio-2.jpg',
  './img/portfolio-3.jpg',
  './img/portfolio-4.jpg',
  './img/portfolio-5.jpg',
  './img/portfolio-6.jpg',
  './img/profile.jpg',
  './img/testimonial-1.jpg',
  './img/testimonial-2.jpg',
  './img/testimonial-3.jpg',
  './img/screenshots/screenshot1.png',
  './lib/easing/easing.js',
  './lib/easing/easing.min.js',
  './lib/isotope/isotope.pkgd.js',
  './lib/isotope/isotope.pkgd.min.js',
  './lib/lightbox/css/lightbox.css',
  './lib/lightbox/css/lightbox.min.css',
  './lib/lightbox/images/close.png',
  './lib/lightbox/images/loading.gif',
  './lib/lightbox/images/next.png',
  './lib/lightbox/images/prev.png',
  './lib/lightbox/js/lightbox.js',
  './lib/lightbox/js/lightbox.min.js',
  './lib/owlcarousel/owl.carousel.js',
  './lib/owlcarousel/owl.carousel.min.js',
  './lib/owlcarousel/assets/ajax-loader.gif',
  './lib/owlcarousel/assets/owl.carousel.css',
  './lib/owlcarousel/assets/owl.carousel.min.css',
  './lib/owlcarousel/assets/owl.theme.default.css',
  './lib/owlcarousel/assets/owl.theme.default.min.css',
  './lib/owlcarousel/assets/owl.theme.green.css',
  './lib/owlcarousel/assets/owl.theme.green.min.css',
  './lib/owlcarousel/assets/owl.video.play.png',
  './lib/typed/typed.js',
  './lib/typed/typed.min.js',
  './lib/waypoints/waypoints.min.js',
  './mail/contact.js',
  './mail/contact.php',
  './mail/jqBootstrapValidation.min.js',
  './lib/waypoints/links.php'
];

self.addEventListener('install', e => {
  console.log('Service Worker installing...');
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Skip waiting');
        self.skipWaiting();
      })
      .catch(err => console.error('Falló el almacenamiento en caché:', err))
  );
});

self.addEventListener('activate', e => {
  console.log('Service Worker activating...');
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  console.log('Fetching:', e.request.url);
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});
