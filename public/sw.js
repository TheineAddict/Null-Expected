// Minimal pass-through SW to make the site installable
self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
// No caching strategy: network passthrough
self.addEventListener('fetch', () => {});
