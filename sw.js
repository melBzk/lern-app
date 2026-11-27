// Speichert die App fürs Offline-Lernen.
// Wenn du Fragen änderst: VERSION hochzählen, damit das Handy die neue Fassung lädt.
// Neues Fach? Dessen Dateien hier ebenfalls eintragen.
importScripts("faecher/module-dateien.js"); // Bilder der Lernmodule (automatisch erzeugt)
const VERSION = "v29";
const FILES = ["./", "index.html", "style.css", "app.js", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png",
  "faecher/wiso/fragen.js", "faecher/wiso/wissensbasis.md",
  "faecher/ite1/fragen.js", "faecher/ite1/wissensbasis.md",
  "faecher/coa1/fragen.js", "faecher/coa1/wissensbasis.md", "faecher/coa1/module.js",
  ...["von-neumann", "speicherpyramide", "usb-stecker", "usb-baum-kette", "raid", "startvorgang", "heimnetz", "datensicherung", "netzgroessen"]
    .map(n => "faecher/coa1/bilder/" + n + ".svg"),
  ...["usb-a", "usb-a3", "usb-b", "usb-b3", "usb-mini", "usb-micro", "usb-c", "struktur-baum", "struktur-kette",
      "raid-a", "raid-b", "raid-c", "pyramide-luecke", "vonneumann-luecke", "bus-richtung",
      "sicherung-a", "sicherung-b", "start-luecke", "ip-luecke", "netz-luecke"]
    .map(n => "faecher/coa1/bilder/quiz/" + n + ".svg"),
  "faecher/kare/fragen.js", "faecher/kare/wissensbasis.md",
  ...(self.MODULE_DATEIEN || [])];

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
