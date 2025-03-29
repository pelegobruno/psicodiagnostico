const CACHE_NAME = "psicodiagnostico-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js"
];

// Instalando o Service Worker e armazenando os arquivos em cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Fazendo cache dos arquivos...");
      return cache.addAll(urlsToCache);
    }).catch((err) => console.error("Erro ao fazer cache:", err))
  );
});

// Ativação do Service Worker (removendo caches antigos)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: Removendo cache antigo", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interceptando requisições e servindo do cache (modo offline)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      console.error("Erro ao buscar recurso:", event.request.url);
    })
  );
});
