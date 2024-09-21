;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_programador',
  urlsToCache = [
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
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})
