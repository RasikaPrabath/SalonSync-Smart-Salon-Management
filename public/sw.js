const CACHE_NAME = 'salonsync-v1'
const URLS_TO_CACHE = [
  '/',
  '/dashboard',
  '/manifest.json',
  '/icons/icon.svg'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE)
    })
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        if (response) return response
        // If offline and not in cache, and it's a navigation request, could return offline page
      })
    })
  )
})
