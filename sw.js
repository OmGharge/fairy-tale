const CACHE_NAME = 'love-story-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand&display=swap',
  'https://cdn.pixabay.com/audio/2023/03/16/audio_a7c29a1f92.mp3',
  'https://i.imgur.com/mHfHg9e.gif',
  'https://i.imgur.com/5NLhIUh.png'
];

// Install the Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate the Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      );
    })
  );
});

// Fetch from Cache or Network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
