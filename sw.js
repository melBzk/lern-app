// Speichert die App fürs Offline-Lernen.
// Wenn du Fragen änderst: VERSION hochzählen, damit das Handy die neue Fassung lädt.
// Neues Fach? Dessen Dateien hier ebenfalls eintragen.
const VERSION = "v6";
const FILES = ["./", "index.html", "style.css", "app.js", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png",
  "faecher/wiso/fragen.js", "faecher/wiso/wissensbasis.md",
  "faecher/ite1/fragen.js", "faecher/ite1/wissensbasis.md",
  "faecher/coa1/fragen.js", "faecher/coa1/wissensbasis.md"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))));
  self.clients.claim();
});
// Erst online versuchen (damit neue Fragen ankommen), sonst aus dem Speicher
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
