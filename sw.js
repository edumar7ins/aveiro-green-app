// ═══════════════════════════════════════════════════════════
// AVEIRO GREEN APP — Service Worker
// Permite funcionamento offline após primeira visita
// ═══════════════════════════════════════════════════════════

const CACHE_NAME = 'aveiro-green-v1';

// Ficheiros a guardar em cache para uso offline
const CACHE_FILES = [
  './',
  './index.html',
  './mapa.html',
  './guia.html',
  './calculadora.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// Instalar: guarda todos os ficheiros em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_FILES);
    })
  );
  self.skipWaiting();
});

// Ativar: limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: responde com cache, tenta rede se não encontrar
self.addEventListener('fetch', event => {
  // Ignora pedidos não-GET e external (Leaflet CDN, tiles de mapa)
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Para tiles do mapa (OpenStreetMap) — tenta rede, fallback silencioso
  if (url.hostname.includes('tile.openstreetmap') || url.hostname.includes('unpkg.com')) {
    event.respondWith(
      fetch(event.request).catch(() => new Response('', { status: 408 }))
    );
    return;
  }

  // Para ficheiros locais — cache primeiro, rede como fallback
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        // Guarda em cache para a próxima vez
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
