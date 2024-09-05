const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
// sw will attempt to server content from cache first
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// the method takes an array of URLs to precache and the self holds the list to precache
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      // this is 30 days 24 hours 60 mins in an hour and 60 secs in a min
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});
// makes urls like index.html and root preload into cache to make available offline 
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(

  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new CacheFirst({
    cacheName: 'asset-cache',
    plugins: [
      CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
