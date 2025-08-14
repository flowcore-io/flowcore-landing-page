// Flowcore Service Worker - Advanced Caching & Offline Support
const CACHE_NAME = 'flowcore-v1.2.0';
const STATIC_CACHE = 'flowcore-static-v1.2.0';
const DYNAMIC_CACHE = 'flowcore-dynamic-v1.2.0';

// Critical resources for immediate loading
const CRITICAL_RESOURCES = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/styles/base.css',
    '/public/images/logo-text-sidebyside-white.png',
    '/public/images/logo-text-sidebyside-dark.png',
    '/scripts/main.js'
];

// Static assets for caching
const STATIC_ASSETS = [
    '/styles/components/',
    '/public/images/',
    '/scripts/',
    '/animations/'
];

// Install event - cache critical resources
self.addEventListener('install', event => {
    console.log('🔄 Flowcore Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('📦 Caching critical resources');
                return cache.addAll(CRITICAL_RESOURCES);
            })
            .then(() => {
                console.log('✅ Critical resources cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Cache installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('🚀 Flowcore Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('🗑️ Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests and external resources
    if (request.method !== 'GET' || !url.origin.includes(location.origin)) {
        return;
    }
    
    // Handle different resource types with appropriate strategies
    if (isCriticalResource(request)) {
        event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
    } else if (isStaticAsset(request)) {
        event.respondWith(staleWhileRevalidateStrategy(request, STATIC_CACHE));
    } else if (isImage(request)) {
        event.respondWith(imageCacheStrategy(request));
    } else {
        event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
    }
});

// Cache First Strategy - for critical resources
async function cacheFirstStrategy(request, cacheName) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('Cache first strategy failed:', error);
        return new Response('Offline - Critical resource unavailable', { status: 503 });
    }
}

// Stale While Revalidate Strategy - for static assets
async function staleWhileRevalidateStrategy(request, cacheName) {
    try {
        const cachedResponse = await caches.match(request);
        const fetchPromise = fetch(request).then(networkResponse => {
            if (networkResponse.ok) {
                caches.open(cacheName).then(cache => {
                    cache.put(request, networkResponse.clone());
                });
            }
            return networkResponse;
        });
        
        return cachedResponse || fetchPromise;
    } catch (error) {
        console.error('Stale while revalidate failed:', error);
        return caches.match(request);
    }
}

// Network First Strategy - for dynamic content
async function networkFirstStrategy(request, cacheName) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('Network first failed, falling back to cache:', error);
        const cachedResponse = await caches.match(request);
        return cachedResponse || new Response('Offline - Content unavailable', { status: 503 });
    }
}

// Image Cache Strategy - optimized for images
async function imageCacheStrategy(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            // Return cached image immediately
            return cachedResponse;
        }
        
        // Try to fetch from network
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('Image cache strategy failed:', error);
        // Return a placeholder image or fallback
        return new Response('Image unavailable', { status: 404 });
    }
}

// Helper functions to determine resource types
function isCriticalResource(request) {
    const criticalPaths = ['/', '/index.html', '/styles/main.css', '/scripts/main.js'];
    return criticalPaths.some(path => request.url.includes(path));
}

function isStaticAsset(request) {
    return STATIC_ASSETS.some(path => request.url.includes(path));
}

function isImage(request) {
    return request.destination === 'image' || 
           /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(request.url);
}

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        console.log('🔄 Performing background sync...');
        // Implement background sync logic here
        // For example, sync form submissions, analytics data, etc.
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notification handling
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body || 'New update from Flowcore',
            icon: '/public/images/Just-Logo_-_Transparent.png',
            badge: '/public/images/favicon-32x32.png',
            vibrate: [200, 100, 200],
            data: {
                url: data.url || '/'
            }
        };
        
        event.waitUntil(
            self.registration.showNotification('Flowcore', options)
        );
    }
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

console.log('🛠️ Flowcore Service Worker loaded successfully');





