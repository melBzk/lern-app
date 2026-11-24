// ===================== Lern-App =====================
// Fächer melden sich über registerFach() an (siehe faecher/<fach>/fragen.js).
// Fortschritt wird nur auf dem Gerät gespeichert (localStorage).

const STORE_KEY = "lernapp-v2";
const ROUND_SIZE = 10;
// Lernkartei: Fach 1–5 → nach wie vielen Tagen die Frage wiederkommt
const INTERVAL = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };
// Ab wann ein Thema als Schwachstelle gilt
const WEAK_MIN_ANSWERS = 4;
const WEAK_QUOTE = 0.6;
const L = ["A", "B", "C", "D", "E", "F"];

const FAECHER = [];
const ALL = []; // alle Fragen aller Fächer

function registerFach(f) {
  f.fragen.forEach(Q => {
    Q.fach = f.id;
    // hd = frühere Themen-Nummer, damit der Lernstand nach einer Umsortierung erhalten bleibt
    Q.id = f.id + ":" + hash((Q.hd ?? Q.d) + "|" + (Q.key || Q.q));
    ALL.push(Q);
  });
  FAECHER.push(f);
}

// Lernmodule (Lernkarten) – erzeugt von werkzeuge/module-uebernehmen.py als faecher/<fach>/module.js
const MODULE = [];
function registerModule(fid, list) {
  list.forEach(m => {
    m.fach = fid;
    // jede Karte beginnt mit „## Typ: Titel“ (Trennlinien --- sind optional)
    m.karten = m.md.replace(/^-{3,}[ \t]*$/gm, "").split(/\n(?=##\s)/).map(s => s.trim()).filter(Boolean);
    MODULE.push(m);
  });
  MODULE.sort((a, b) => a.fach.localeCompare(b.fach) || a.nr.split("-")[0].localeCompare(b.nr.split("-")[0]) || a.reihenfolge - b.reihenfolge);
}
const modulKey = m => m.fach + ":" + m.nr;
const modulById = (fid, nr) => MODULE.find(m => m.fach === fid && m.nr === nr);
const modulFragen = m => ALL.filter(Q => Q.fach === m.fach && Q.m === m.nr);
function modulZuThema(f, d) {
  const Q = ALL.find(Q => Q.fach === f.id && Q.d === +d && Q.m);
  return Q ? modulById(f.id, Q.m) : null;
}
const minuten = m => Math.max(3, Math.round(m.karten.length * 0.6)); // ca. 35 s je Karte

const app = document.getElementById("app");
const heading = document.getElementById("heading");
const eyebrow = document.getElementById("eyebrow");
const backBtn = document.getElementById("back");

// ---------- Hilfsfunktionen ----------
function hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}
function today(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function shuffle(a) {
  a = a.slice();
  for (let k = a.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; }
  return a;
}
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function parseGermanNumber(str) {
  str = (str || "").replace(/\s|€|%|Mrd\.?|Mio\.?/gi, "");
  if (str === "") return NaN;
  if (str.indexOf(",") !== -1) return parseFloat(str.replace(/\./g, "").replace(",", "."));
  if (/^-?\d{1,3}(\.\d{3})+$/.test(str)) return parseFloat(str.replace(/\./g, ""));
  return parseFloat(str);
}
function fmt(n) { return n.toLocaleString("de-DE", { maximumFractionDigits: 4 }); } // 4 Stellen, z. B. für Wechselkurse
function correctText(Q) {
  if (Q.t === "calc") return `${fmt(Q.a)} ${Q.unit || ""}`;
  if (Q.t === "text") return Q.loesung || Q.accept[0].replace(/^\p{Ll}/u, c => c.toUpperCase());
  if (Q.t === "multi") return Q.k.map(i => Q.o[i]).join(" + ");
  return Q.o[0];
}
// Text einer Frage ausgeben: Fächer mit html:true dürfen <b>/<i> enthalten
function show(Q, s) { return fachById(Q.fach).html ? String(s) : esc(s); }
function plain(s) { const d = document.createElement("div"); d.innerHTML = s; return d.textContent; }
function norm(s) { return s.toLowerCase().replace(/[„“"'().,!?]/g, "").replace(/\s+/g, " ").trim(); }
// Freitext großzügig vergleichen: Bindestriche/Leerzeichen egal ("ASCII-Tabelle" = "ascii tabelle"),
// Klammerzusatz darf fehlen oder allein stehen ("1 Byte (8 Bit)", "Kibibyte (KiB)")
function textKey(s) {
  return s.toLowerCase().trim().replace(/^(der|die|das|den|dem|des|ein|eine|einen|the|a|an)\s+/, "")
    .replace(/[„“"'.,!?()]/g, "").replace(/[-–_\/\s]+/g, "");
}
function textMatch(input, accept) {
  const varianten = [input, input.replace(/\([^)]*\)/g, " "), ...(input.match(/\(([^)]*)\)/g) || [])];
  const keys = new Set(varianten.map(textKey).filter(Boolean));
  return accept.some(a => keys.has(textKey(a)));
}
function fachById(id) { return FAECHER.find(f => f.id === id); }
function themaName(Q) { return fachById(Q.fach).themen[Q.d] || ""; }
function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }

// ---------- Speicher ----------
function load() {
  let s;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch { s = null; }
  s = s || { cards: {}, days: {} };
  s.read = s.read || {};   // Lernmodule: { "coa1:T02-11": { karte: 3, fertig: "2026-11-24" } }
  s.prefs = Object.assign({ sicherheit: true, quellen: false }, s.prefs || {});
  return s;
}
let state = load();
const gelesen = m => !!(state.read[modulKey(m)] || {}).fertig;
// Neue Fragen eines Lernmoduls erst, wenn das Modul gelesen ist (erst verstehen, dann abfragen)
const neuErlaubt = Q => !Q.m || !modulById(Q.fach, Q.m) || gelesen(modulById(Q.fach, Q.m));
// Nächstes ungelesenes Lernmodul (Fächer in Kursreihenfolge, innerhalb in Lernreihenfolge)
function naechstesModul(fid) {
  const reihe = FAECHER.map(f => f.id).filter(id => !fid || id === fid);
  return reihe.flatMap(id => MODULE.filter(m => m.fach === id)).find(m => !gelesen(m)) || null;
}
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }

const card = Q => state.cards[Q.id];
const isDue = Q => card(Q) && card(Q).due <= today();
const isNew = Q => !card(Q);
const isMastered = Q => card(Q) && card(Q).box >= 4;
// zuletzt falsch beantwortet (ältere Lernstände ohne „last“: Fach 1)
const isWrongLast = Q => card(Q) && (card(Q).last === undefined ? card(Q).box === 1 : card(Q).last === false);
const isHyper = Q => card(Q) && card(Q).hyper;

function streak() {
  let n = 0;
  let off = state.days[today()] ? 0 : -1; // heute zählt mit, wenn schon gelernt
  while (state.days[today(off)]) { n++; off--; }
  return n;
}

function record(Q, ok, conf) {
  const c = card(Q) || { box: 0, right: 0, wrong: 0, first: today() };
  if (ok && conf && conf !== "sicher") {
    // richtig, aber unsicher/geraten → noch nicht aufsteigen, morgen wieder
    c.box = Math.max(c.box, 1);
    c.due = today(1);
  } else {
    // Fach 1 = "zuletzt falsch"; richtig beantwortet geht es mindestens in Fach 2
    c.box = ok ? Math.min(Math.max(c.box, 1) + 1, 5) : 1;
    c.due = today(INTERVAL[c.box]);
  }
  // sicher, aber falsch → besonders wichtig zum Nachüben (Fehler-Stapel, kommt zuerst)
  c.hyper = !ok && conf === "sicher" ? true : ok ? false : !!c.hyper;
  c.last = ok;
  if (conf) { c.conf = c.conf || {}; const k = conf + (ok ? "+" : "-"); c.conf[k] = (c.conf[k] || 0) + 1; }
  ok ? c.right++ : c.wrong++;
  state.cards[Q.id] = c;
  state.days[today()] = (state.days[today()] || 0) + 1;
  save();
}

// Auswertung für eine Fragenmenge (ganzes Fach oder ein Thema)
function stats(list) {
  let right = 0, wrong = 0;
  list.forEach(Q => { const c = card(Q); if (c) { right += c.right; wrong += c.wrong; } });
  const answers = right + wrong;
  return {
    total: list.length,
    seen: list.filter(Q => !isNew(Q)).length,
    mastered: list.filter(isMastered).length,
    due: list.filter(isDue).length,
    wrongLast: list.filter(isWrongLast).length,
    quote: answers ? right / answers : null,
    weak: answers >= WEAK_MIN_ANSWERS && right / answers < WEAK_QUOTE
  };
}
const themaFragen = (f, d) => ALL.filter(Q => Q.fach === f.id && Q.d === +d);
const fachFragen = f => ALL.filter(Q => Q.fach === f.id);

// ---------- Navigation ----------
const history = [];
function go(view, ...args) {
  history.push([view, args]);
  render();
}
function render() {
  const [view, args] = history[history.length - 1];
  backBtn.hidden = history.length <= 1;
  view(...args);
  window.scrollTo(0, 0);
}
backBtn.onclick = () => {
  if (S && !S.finished && S.firstTry.size > 0 && history[history.length - 1][0] === quizView &&
      !confirm("Runde abbrechen? Bereits beantwortete Fragen bleiben gespeichert.")) return;
  if (history[history.length - 1][0] === quizView) S = null;
  history.pop();
  render();
};
function setTitle(top, title) { eyebrow.textContent = top; heading.textContent = title; }

// ---------- Startseite ----------
function homeView() {
  setTitle("Umschulung", "Lern-App");
  const due = ALL.filter(isDue);
  const fresh = ALL.filter(isNew);
  const weakQ = ALL.filter(isWrongLast);
  const s = stats(ALL);
  const nm = naechstesModul();
  const hyper = ALL.filter(isHyper);

  const weakTopics = [];
  FAECHER.forEach(f => Object.keys(f.themen).forEach(d => {
    if (stats(themaFragen(f, d)).weak) weakTopics.push([f, d]);
  }));

  app.innerHTML = `
    <div class="card">
      <div class="stats">
        <div class="stat hl"><div class="num">${streak()}🔥</div><div class="lbl">Tage in Folge</div></div>
        <div class="stat"><div class="num">${state.days[today()] || 0}</div><div class="lbl">heute beantwortet</div></div>
        <div class="stat"><div class="num">${pct(s.mastered, s.total)}%</div><div class="lbl">sicher gelernt</div></div>
      </div>
      <h2 class="heute">Heute lernen – wie viel Zeit hast du?</h2>
      <div class="zeitwahl">
        ${[[5, 8], [15, 20], [30, 35]].map(([min, n]) => `<button class="btn primary" data-n="${n}">${min} Min.<small>≈ ${n} Fragen</small></button>`).join("")}
      </div>
      <p class="muted klein">${due.length} fällig · ${weakQ.length} Fehler · neue Fragen nur aus Themen, die du schon gelesen hast</p>
      ${nm ? `<button class="btn dark" id="neu">🃏 Nächstes Thema lesen <small>${esc(fachById(nm.fach).name)} · ${esc(nm.titel)} · ca. ${minuten(nm)} Min.</small></button>` : ""}
      ${weakQ.length ? `<button class="btn ghost" id="weak">Fehler-Stapel üben <small>${weakQ.length} Fragen, die zuletzt falsch waren${hyper.length ? ` · ${hyper.length} davon warst du dir sicher` : ""}</small></button>` : ""}
    </div>

    ${weakTopics.length ? `<div class="card warn">
      <h2>⚠ Schwachstellen</h2>
      <p class="muted">Hier liegst du oft daneben. Lies erst den Lernzettel, dann nochmal üben.</p>
      ${weakTopics.map(([f, d]) => `<div class="row" data-f="${f.id}" data-d="${d}">
        <div class="name">${esc(f.themen[d])}<div class="meta">${f.name} · ${pct(stats(themaFragen(f, d)).quote * 100, 100)}% richtig</div></div><div class="chev">›</div></div>`).join("")}
    </div>` : ""}

    ${bereiche().map(([b, fs]) => {
      const bs = stats(fs.flatMap(fachFragen));
      return `<div class="card">
        <div class="bereich-head">
          <h2>${esc(b)}</h2>
          <span class="meta">${fs.length} Module · ${pct(bs.mastered, bs.total)}% sicher</span>
        </div>
        ${fs.map(f => {
          const st = stats(fachFragen(f));
          return `<div class="row fach" data-f="${f.id}">
            <div class="badge">${esc(f.name.slice(0, 4))}</div>
            <div class="name"><b>${esc(f.name)}</b> <span class="meta">${esc(f.langname || "")}</span>
              <div class="meta">${Object.keys(f.themen).length} Themen · ${st.total} Fragen${st.due ? ` · <span class="hl">${st.due} fällig</span>` : ""}</div>
              <div class="bar"><div class="fill" style="width:${pct(st.mastered, st.total)}%"></div></div>
            </div><div class="chev">›</div></div>`;
        }).join("")}
      </div>`;
    }).join("")}

    <div class="card">
      <h2>📖 Wissensbasis</h2>
      <p class="muted">Kein Quiz gerade? Hier kannst du alles in Ruhe nachlesen oder nach einem Begriff suchen.</p>
      <button class="btn dark" id="wissen">Wissensbasis öffnen</button>
    </div>

    <div class="card">
      <h2>So funktioniert's</h2>
      <p class="muted">1. <b>Lernkarten lesen</b> (ein Thema, ca. 10 Min.) – danach gleich das Quiz dazu.<br>
      2. <b>Jeden Tag „Heute lernen“</b> – kurz und regelmäßig wirkt am stärksten.<br>
      Jede Frage liegt in einem von 5 Fächern der Lernkartei. Richtig und sicher → ein Fach weiter (1, 2, 4, 8, 16 Tage). Richtig, aber unsicher → morgen nochmal. Falsch → zurück in Fach 1 und in derselben Runde wieder, bis es sitzt. Ab Fach 4 gilt eine Frage als „sicher“.</p>
      <label class="schalter"><input type="checkbox" id="pref-sicher" ${state.prefs.sicherheit ? "checked" : ""}> Vor der Auflösung fragen: „Wie sicher bist du?“</label>
      <label class="schalter"><input type="checkbox" id="pref-quellen" ${state.prefs.quellen ? "checked" : ""}> In Lernkarten Quellen anzeigen</label>
      <div class="boxes">${[1, 2, 3, 4, 5].map(b => `<div class="b"><span>${ALL.filter(Q => card(Q)?.box === b).length}</span>Fach ${b}</div>`).join("")}</div>
      <button class="btn ghost small danger" id="reset">Fortschritt zurücksetzen</button>
    </div>`;

  on("wissen", () => go(wissenView));
  app.querySelectorAll(".zeitwahl button").forEach(b => b.onclick = () => {
    const list = heuteRunde(+b.dataset.n);
    if (list.length) startQuiz("Heute · " + b.textContent.trim().split(/\s/)[0] + " Min.", list);
    else alert(nm ? "Für heute ist alles wiederholt 🎉 Lies als Nächstes ein neues Thema." : "Für heute ist alles erledigt 🎉");
  });
  on("neu", () => go(kartenView, nm));
  on("weak", () => startQuiz("Fehler-Stapel", shuffle(weakQ).sort((a, b) => isHyper(b) - isHyper(a)).slice(0, 15)));
  document.getElementById("pref-sicher").onchange = e => { state.prefs.sicherheit = e.target.checked; save(); };
  document.getElementById("pref-quellen").onchange = e => { state.prefs.quellen = e.target.checked; save(); };
  on("reset", () => {
    if (confirm("Wirklich den gesamten Lernfortschritt löschen?")) { state = { cards: {}, days: {}, read: {}, prefs: state.prefs }; save(); render(); }
  });
  app.querySelectorAll(".row").forEach(el => el.onclick = () => {
    const f = fachById(el.dataset.f);
    el.dataset.d ? go(themaView, f, el.dataset.d) : go(fachView, f);
  });
}

// Fächer nach Überkategorie (bereich) gruppieren, Reihenfolge wie in index.html
function bereiche() {
  const map = new Map();
  FAECHER.forEach(f => {
    const b = f.bereich || "Weitere Fächer";
    if (!map.has(b)) map.set(b, []);
    map.get(b).push(f);
  });
  return [...map.entries()];
}

// ---------- Wissensbasis (Lesen ohne Quiz) ----------
// Kapitelliste einer Wissensbasis: "## 3. Titel" → { key: "3", title: "Titel" }
function chapterList(md) {
  return md.split(/\r?\n/).map(l => l.match(/^##\s+(\d+)\.\s*(.*)/)).filter(Boolean)
    .map(m => ({ key: m[1], title: m[2].replace(/\*\*/g, "") }));
}

function wissenView() {
  setTitle("Nachlesen", "Wissensbasis");
  app.innerHTML = `
    <div class="card">
      <input id="suche" class="suche" type="search" placeholder="🔍 Begriff suchen, z. B. USB, Inflation, Dreisatz" autocomplete="off">
      <div id="treffer"></div>
    </div>
    ${bereiche().map(([b, fs]) => `<div class="card">
      <h2>${esc(b)}</h2>
      ${fs.filter(f => f.wissensbasis).map(f => `<div class="row" data-f="${f.id}">
        <div class="badge">${esc(f.name.slice(0, 4))}</div>
        <div class="name"><b>${esc(f.name)}</b> <span class="meta">${esc(f.langname || "")}</span></div>
        <div class="chev">›</div></div>`).join("")}
    </div>`).join("")}`;
  app.querySelectorAll(".row").forEach(el => el.onclick = () => go(kapitelView, fachById(el.dataset.f)));

  // Volltextsuche über alle Wissensbasen
  const inp = document.getElementById("suche"), out = document.getElementById("treffer");
  let timer;
  inp.oninput = () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const term = inp.value.trim().toLowerCase();
      if (term.length < 2) { out.innerHTML = ""; return; }
      const hits = [];
      for (const f of FAECHER.filter(f => f.wissensbasis)) {
        let md; try { md = await loadMd(f); } catch { continue; }
        const ch = chapters(md);
        chapterList(md).forEach(c => {
          const n = ch[c.key].toLowerCase().split(term).length - 1;
          if (n) hits.push({ f, c, n });
        });
      }
      if (inp.value.trim().toLowerCase() !== term) return; // inzwischen weitergetippt
      hits.sort((a, b) => b.n - a.n);
      out.innerHTML = hits.length
        ? `<p class="muted">${hits.length} Kapitel gefunden</p>` + hits.slice(0, 15).map((h, i) => `<div class="row" data-i="${i}">
            <div class="name">${esc(h.c.title)}<div class="meta">${esc(h.f.name)} · ${h.n}× gefunden</div></div><div class="chev">›</div></div>`).join("")
        : `<p class="muted">Nichts gefunden.</p>`;
      out.querySelectorAll(".row").forEach(el => el.onclick = () => {
        const h = hits[+el.dataset.i];
        openNotes(h.f, [h.c.key], h.c.title, null, term);
      });
    }, 250);
  };
}

async function kapitelView(f) {
  setTitle("Wissensbasis", f.name);
  app.innerHTML = '<p class="muted">Lade …</p>';
  let md;
  try { md = await loadMd(f); } catch { app.innerHTML = '<div class="card"><p class="muted">Die Wissensbasis konnte nicht geladen werden.</p></div>'; return; }
  const list = chapterList(md);
  const allg = new Set(f.allgemein || []);
  const row = c => `<div class="row" data-k="${c.key}"><div class="name">${esc(c.title)}</div><div class="chev">›</div></div>`;
  app.innerHTML = `
    ${list.some(c => allg.has(c.key)) ? `<div class="card"><h2>Klausurtipps & Fallen</h2>${list.filter(c => allg.has(c.key)).map(row).join("")}</div>` : ""}
    <div class="card"><h2>Inhalt</h2>${list.filter(c => !allg.has(c.key)).map(row).join("")}</div>
    <button class="btn ghost" id="alles">Alles am Stück lesen</button>`;
  app.querySelectorAll(".row").forEach(el => el.onclick = () => {
    const c = list.find(c => c.key === el.dataset.k);
    openNotes(f, [c.key], c.title);
  });
  on("alles", () => openNotes(f, list.map(c => c.key), f.name + " · komplett"));
}

// „Heute lernen“: n Fragen – erst Sicher-aber-falsch, dann Fehler, dann Fällige, dann Neue (gemischt aus allen Themen)
function heuteRunde(n) {
  const liste = [];
  const add = qs => qs.forEach(Q => { if (liste.length < n && !liste.includes(Q)) liste.push(Q); });
  add(shuffle(ALL.filter(isHyper)));
  add(shuffle(ALL.filter(isWrongLast)));
  add(ALL.filter(isDue).sort((a, b) => card(a).box - card(b).box));
  const neuHeute = Object.values(state.cards).filter(c => c.first === today()).length;
  const platz = Math.max(0, Math.min(n - liste.length, 2 * ROUND_SIZE - neuHeute));
  // neue Fragen: zuerst aus gelesenen Lernmodulen, dann abwechselnd aus den Fächern (Thema für Thema)
  const ausModulen = MODULE.filter(gelesen).flatMap(m => modulFragen(m).filter(isNew));
  const queues = FAECHER.map(f => fachFragen(f).filter(Q => isNew(Q) && neuErlaubt(Q) && !ausModulen.includes(Q)));
  const neu = ausModulen.slice(0, platz);
  for (let k = 0; neu.length < platz && queues.some(q => q.length); k++) {
    const q = queues[k % queues.length];
    if (q.length) neu.push(q.shift());
  }
  return shuffle(liste.concat(neu));
}

function on(id, fn) { const el = document.getElementById(id); if (el) el.onclick = fn; }

// ---------- Fach-Seite ----------
const openGroups = new Set(); // welche Gruppen aufgeklappt sind (bleibt beim Zurückgehen erhalten)

function themenListe(f, ds) {
  return ds.map(d => {
    const ts = stats(themaFragen(f, d));
    const mod = modulZuThema(f, d);
    const lese = mod ? (gelesen(mod) ? "🃏 gelesen ✓ · " : '<span class="hl">🃏 noch lesen</span> · ') : "";
    return `<div class="row" data-d="${d}">
      <div class="name">${esc(f.themen[d])}${ts.weak ? ' <span class="pill">⚠ üben</span>' : ""}
        <div class="meta">${lese}${ts.total} Fragen · ${ts.seen} gesehen · ${ts.mastered} sicher${ts.due ? ` · <span class="hl">${ts.due} fällig</span>` : ""}</div>
        <div class="bar"><div class="fill" style="width:${pct(ts.mastered, ts.total)}%"></div></div>
      </div><div class="chev">›</div></div>`;
  }).join("");
}

function fachView(f) {
  setTitle(f.langname || "", f.name);
  const list = fachFragen(f);
  const fs = stats(list);
  app.innerHTML = `
    <div class="card">
      <div class="stats">
        <div class="stat"><div class="num">${fs.seen}/${fs.total}</div><div class="lbl">gesehen</div></div>
        <div class="stat hl"><div class="num">${fs.mastered}</div><div class="lbl">sicher</div></div>
        <div class="stat"><div class="num">${fs.quote === null ? "–" : pct(fs.quote * 100, 100) + "%"}</div><div class="lbl">Trefferquote</div></div>
      </div>
      <button class="btn primary" id="mix">${f.name} gemischt üben <small>${ROUND_SIZE} Fragen, Fällige zuerst</small></button>
      ${f.wissensbasis && f.allgemein ? `<button class="btn ghost" id="general">📖 Klausurtipps & Fallen</button>` : ""}
    </div>
    ${f.bloecke ? `<div class="card">
      <h2>🗓 Nach Unterrichtstag</h2>
      <p class="muted">Quiz und Lernzettel zu einem Themenblock aus dem Roten Faden.</p>
      ${f.bloecke.slice().reverse().map(b => {
        const i = f.bloecke.indexOf(b), bs = stats(blockFragen(f, b));
        return `<div class="row" data-b="${i}">
          <div class="name">${esc(b.name)}${bs.weak ? ' <span class="pill">⚠ üben</span>' : ""}
            <div class="meta">${esc(b.datum || "")} · ${bs.total} Fragen · ${bs.seen} gesehen · ${bs.mastered} sicher</div>
            <div class="bar"><div class="fill" style="width:${pct(bs.mastered, bs.total)}%"></div></div>
          </div><div class="chev">›</div></div>`;
      }).join("")}
    </div>` : ""}
    ${f.gruppen ? f.gruppen.map(([name, ds], g) => {
      const gs = stats(list.filter(Q => ds.includes(Q.d)));
      const open = openGroups.has(f.id + g) || gs.weak;
      return `<details class="card group" data-g="${f.id + g}" ${open ? "open" : ""}>
        <summary><div class="name"><b>${esc(name)}</b>${gs.weak ? ' <span class="pill">⚠ üben</span>' : ""}
          <div class="meta">${ds.length} Themen · ${gs.total} Fragen · ${gs.mastered} sicher${gs.due ? ` · <span class="hl">${gs.due} fällig</span>` : ""}</div>
          <div class="bar"><div class="fill" style="width:${pct(gs.mastered, gs.total)}%"></div></div>
        </div><div class="chev">›</div></summary>
        ${themenListe(f, ds)}
      </details>`;
    }).join("") : `<div class="card"><h2>Themen</h2>${themenListe(f, Object.keys(f.themen))}</div>`}`;
  app.querySelectorAll("details.group").forEach(el => el.ontoggle = () => {
    el.open ? openGroups.add(el.dataset.g) : openGroups.delete(el.dataset.g);
  });
  on("mix", () => {
    const due = shuffle(list.filter(isDue));
    const rest = shuffle(list.filter(Q => !isDue(Q)));
    startQuiz(f.name + " gemischt", due.concat(rest).slice(0, ROUND_SIZE));
  });
  on("general", () => openNotes(f, f.allgemein, "Klausurtipps & Fallen"));
  app.querySelectorAll(".row").forEach(el => el.onclick = () =>
    el.dataset.b ? go(blockView, f, +el.dataset.b) : go(themaView, f, el.dataset.d));
}

// ---------- Themenblock (Roter Faden) ----------
const blockFragen = (f, b) => fachFragen(f).filter(Q => b.themen.includes(Q.d));

function blockView(f, i) {
  const b = f.bloecke[i];
  const list = blockFragen(f, b);
  const ts = stats(list);
  const wrong = list.filter(isWrongLast);
  const [kurz, ...rest] = b.name.split("·");
  const blockModule = b.themen.map(d => modulZuThema(f, d)).filter(Boolean);
  const naechstes = blockModule.find(m => !gelesen(m));
  setTitle(f.name + " · " + kurz.trim() + (b.datum ? " (" + b.datum + ")" : ""), rest.join("·").trim() || kurz.trim());
  app.innerHTML = `
    <div class="card">
      <div class="stats">
        <div class="stat"><div class="num">${ts.seen}/${ts.total}</div><div class="lbl">gesehen</div></div>
        <div class="stat hl"><div class="num">${ts.mastered}</div><div class="lbl">sicher</div></div>
        <div class="stat"><div class="num">${ts.quote === null ? "–" : pct(ts.quote * 100, 100) + "%"}</div><div class="lbl">Trefferquote</div></div>
      </div>
      ${blockModule.length ? (naechstes ? modulKnopf(naechstes, "karten").replace("Lernkarten lesen", "Lernkarten der Reihe nach") : `<button class="btn ghost" id="karten">🃏 Lernkarten <small>alle ${blockModule.length} Themen gelesen ✓ – nochmal von vorn</small></button>`) : ""}
      <button class="btn ${naechstes ? "dark" : "primary"}" id="quiz">Quiz: 20 Fragen <small>Fehler, Fällige und Neue zuerst, aus allen Themen gemischt</small></button>
      ${f.wissensbasis && b.themen.some(d => (f.kapitel || {})[d]) ? `<button class="btn ghost" id="notes">📖 Lernzettel zum Block lesen</button>` : ""}
      <button class="btn dark" id="all">Alle ${ts.total} Fragen üben</button>
      ${wrong.length ? `<button class="btn dark" id="wrong">Nur Fehler üben <small>${wrong.length} Fragen</small></button>` : ""}
    </div>
    <div class="card"><h2>Themen in diesem Block</h2>${themenListe(f, b.themen)}</div>`;
  on("quiz", () => {
    // Reihenfolge: zuletzt falsch → fällig → neu → Rest; je Gruppe gemischt
    const rang = Q => isWrongLast(Q) ? 0 : isDue(Q) ? 1 : isNew(Q) ? 2 : 3;
    const pick = [0, 1, 2, 3].flatMap(r => shuffle(list.filter(Q => rang(Q) === r))).slice(0, 20);
    startQuiz(kurz.trim() + " · Quiz", shuffle(pick));
  });
  on("notes", () => openNotes(f, b.themen.map(d => (f.kapitel || {})[d]).filter(Boolean), b.name));
  on("karten", () => go(kartenView, naechstes || blockModule[0]));
  on("all", () => startQuiz(kurz.trim() + " · alle", shuffle(list)));
  on("wrong", () => startQuiz(kurz.trim() + " · Fehler", shuffle(wrong)));
  app.querySelectorAll(".row").forEach(el => el.onclick = () => go(themaView, f, el.dataset.d));
}

// ---------- Themen-Seite ----------
function themaView(f, d) {
  const list = themaFragen(f, d);
  const ts = stats(list);
  const [kurz, ...rest] = f.themen[d].split("·");
  setTitle(f.name + " · " + kurz.trim(), rest.join("·").trim() || kurz.trim());
  const hasNotes = f.wissensbasis && f.kapitel && f.kapitel[d];
  const wrong = list.filter(isWrongLast);
  const mod = modulZuThema(f, d);

  app.innerHTML = `
    ${ts.weak ? `<div class="card warn">
      <h2>⚠ Hier hakt es noch</h2>
      <p>Du hast in diesem Thema nur <b>${pct(ts.quote * 100, 100)}%</b> richtig. Lies am besten zuerst den Lernzettel und übe dann die falschen Fragen.</p>
    </div>` : ""}
    <div class="card">
      <div class="stats">
        <div class="stat"><div class="num">${ts.seen}/${ts.total}</div><div class="lbl">gesehen</div></div>
        <div class="stat hl"><div class="num">${ts.mastered}</div><div class="lbl">sicher</div></div>
        <div class="stat"><div class="num">${ts.quote === null ? "–" : pct(ts.quote * 100, 100) + "%"}</div><div class="lbl">Trefferquote</div></div>
      </div>
      ${mod ? modulKnopf(mod, "karten") : ""}
      ${hasNotes ? `<button class="btn ${ts.weak ? "primary" : "ghost"}" id="notes">📖 Lernzettel lesen <small>aus deiner Wissensbasis</small></button>` : ""}
      <button class="btn ${ts.weak || (mod && !gelesen(mod)) ? "dark" : "primary"}" id="all">Alle ${ts.total} Fragen üben</button>
      ${wrong.length ? `<button class="btn dark" id="wrong">Nur Fehler üben <small>${wrong.length} Fragen</small></button>` : ""}
    </div>`;
  on("notes", () => openNotes(f, [f.kapitel[d]], f.themen[d]));
  on("karten", () => go(kartenView, mod));
  on("all", () => startQuiz(kurz.trim(), shuffle(list)));
  on("wrong", () => startQuiz(kurz.trim() + " · Fehler", shuffle(wrong)));
}

// ---------- Lernkarten (ein Lernmodul Karte für Karte) ----------
const KARTENTYP = { Vorab: "🤔 Rate mal", Begriffe: "🔤 Neue Wörter", Bild: "🖼 Bild", Alltag: "🏠 Aus dem Alltag",
  Erklärung: "💬 Erklärung", Beispiel: "✏️ Beispiel", Merke: "⭐ Merke", Verwechslung: "⚖️ Nicht verwechseln",
  Wozu: "🎯 Wofür brauche ich das?", Praxisfall: "🛠 Praxisfall", Warum: "❓ Erklär es dir selbst", Auflösung: "✅ Auflösung" };

function karteHtml(text) {
  const lines = text.split("\n");
  const m = (lines[0] || "").match(/^##\s+([^:]+):\s*(.*)/);
  if (!m) return markdown(text);
  return `<span class="kartentyp">${esc(KARTENTYP[m[1].trim()] || m[1].trim())}</span>
    <h2 class="kartentitel">${inline(m[2])}</h2>${markdown(lines.slice(1).join("\n"))}`;
}

function kartenView(m) {
  const key = modulKey(m);
  const r = state.read[key] = state.read[key] || { karte: 0 };
  let i = Math.min(r.karte || 0, m.karten.length - 1);
  if (r.fertig && i >= m.karten.length - 1) i = 0; // schon fertig gelesen → von vorn
  const fragen = modulFragen(m);

  const zeige = () => {
    r.karte = i; save();
    const letzte = i === m.karten.length - 1;
    setTitle(`Lernkarten · ${m.reihenfolge}. Thema`, m.titel);
    document.body.classList.toggle("quellen", !!state.prefs.quellen);
    app.innerHTML = `
      <div class="progress"><div class="bar"><div class="fill" style="width:${pct(i + 1, m.karten.length)}%"></div></div>${i + 1}/${m.karten.length}</div>
      <div class="card lernkarte md" id="karte">${karteHtml(m.karten[i])}</div>
      ${letzte ? `<div class="card">
        <h2>🎉 Geschafft!</h2>
        <p class="muted">Jetzt gleich abfragen – das festigt das Gelesene am stärksten.</p>
        ${fragen.length ? `<button class="btn primary" id="mquiz">Quiz zu diesem Thema <small>${fragen.length} Fragen</small></button>` : ""}
        <button class="btn ghost" id="zurueck">Zur Übersicht</button>
        ${state.prefs.quellen ? `<div class="quellenliste"><b>Quellen dieses Themas</b>${Object.entries(m.quellen || {}).map(([k, v]) => `<div>${esc(k)} = ${esc(v)}</div>`).join("")}</div>` : ""}
      </div>` : ""}
      <div class="kartennav">
        <button class="btn ghost" id="vor" ${i === 0 ? "disabled" : ""}>‹ Zurück</button>
        <button class="btn ${letzte ? "ghost" : "primary"}" id="weiter" ${letzte ? "disabled" : ""}>Weiter ›</button>
      </div>
      <label class="schalter"><input type="checkbox" id="qz" ${state.prefs.quellen ? "checked" : ""}> Quellen anzeigen (wo steht das?)</label>`;
    window.scrollTo(0, 0);
    if (letzte && !r.fertig) { r.fertig = today(); save(); }
    on("vor", () => { if (i > 0) { i--; zeige(); } });
    on("weiter", () => { if (i < m.karten.length - 1) { i++; zeige(); } });
    on("mquiz", () => { history.pop(); startQuiz(m.titel, fragen.slice().sort((a, b) => (a.lv || 1) - (b.lv || 1))); });
    on("zurueck", () => { history.pop(); render(); });
    document.getElementById("qz").onchange = e => { state.prefs.quellen = e.target.checked; save(); zeige(); };
    // Wischen auf dem iPhone
    const k = document.getElementById("karte");
    let x0 = null, y0 = null;
    k.ontouchstart = e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; };
    k.ontouchend = e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0 && i < m.karten.length - 1) { i++; zeige(); }
        if (dx > 0 && i > 0) { i--; zeige(); }
      }
    };
  };
  zeige();
}
document.addEventListener("keydown", e => {
  if (!document.getElementById("karte") || e.target.tagName === "INPUT") return;
  if (e.key === "ArrowRight") document.getElementById("weiter")?.click();
  if (e.key === "ArrowLeft") document.getElementById("vor")?.click();
});

// Ganzes Lernmodul zum Nachlesen (z. B. aus einer Quizfrage heraus)
function openModul(m, Q) {
  document.getElementById("sheet-title").textContent = m.titel;
  const body = document.getElementById("sheet-body");
  document.body.classList.toggle("quellen", !!state.prefs.quellen);
  body.innerHTML = m.karten.map(karteHtml).join("<hr>");
  sheet.hidden = false;
  document.body.style.overflow = "hidden";
  sheet.scrollTop = 0;
  if (Q) highlight(body, Q);
}

function modulKnopf(m, id) {
  const r = state.read[modulKey(m)] || {};
  const info = r.fertig ? `gelesen ✓ · ${m.karten.length} Karten` :
    r.karte ? `weiter bei Karte ${r.karte + 1} von ${m.karten.length}` : `${m.karten.length} Karten · ca. ${minuten(m)} Min.`;
  return `<button class="btn ${r.fertig ? "ghost" : "primary"}" id="${id}">🃏 Lernkarten lesen <small>${info}</small></button>`;
}

// ---------- Lernrunde ----------
let S = null;

function startQuiz(name, list) {
  if (!list.length) return;
  S = { name, queue: list.slice(), total: list.length, i: 0, firstTry: new Map(), retried: new Map(), finished: false };
  go(quizView);
}

function quizView() {
  setTitle("Lernrunde", S.name);
  if (S.i >= S.queue.length) return resultView();
  const Q = S.queue[S.i];
  const f = fachById(Q.fach);
  const done = S.firstTry.size;
  const repeat = S.firstTry.has(Q.id);
  let body;
  if (Q.t === "calc") {
    body = `<div class="calc">
        <input id="inp" inputmode="decimal" autocomplete="off" placeholder="Ergebnis">
        <span class="unit">${esc(Q.unit || "")}</span>
      </div>
      <button class="btn primary" id="check">Prüfen</button>`;
  } else if (Q.t === "text") {
    body = `<div class="calc">
        <input id="inp" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Antwort eintippen">
      </div>
      <button class="btn primary" id="check">Prüfen</button>`;
  } else if (Q.t === "multi") {
    Q._opts = shuffle(Q.o.map((t, k) => ({ t, ok: Q.k.includes(k) })));
    body = `<p class="muted">Mehrere Antworten möglich, dann „Prüfen“.</p>` +
      Q._opts.map((o, k) => `<button class="opt multi" data-k="${k}"><span class="l">${L[k] || k + 1}</span><span>${show(Q, o.t)}</span></button>`).join("") +
      `<button class="btn primary" id="check">Prüfen</button>`;
  } else {
    Q._opts = shuffle(Q.o.map((t, k) => ({ t, ok: k === 0 })));
    body = Q._opts.map((o, k) => `<button class="opt" data-k="${k}"><span class="l">${L[k]}</span><span>${show(Q, o.t)}</span></button>`).join("");
  }
  app.innerHTML = `
    <div class="progress"><div class="bar"><div class="fill" style="width:${pct(done, S.total)}%"></div></div>${done}/${S.total}</div>
    <div class="card">
      <span class="tag">${FAECHER.length > 1 ? esc(f.name) + " · " : ""}${esc(themaName(Q))}${repeat ? " · Nochmal" : ""}</span>
      ${Q.kontext ? `<div class="kontext">${show(Q, Q.kontext)}</div>` : ""}
      ${Q.img ? `<img class="qimg" src="${esc(Q.img)}" alt="Bild zur Frage">` : ""}
      <p class="q">${show(Q, Q.q)}</p>
      ${body}
      <div id="conf"></div>
      <div id="fb"></div>
    </div>
    <button class="btn dark" id="next" hidden>Weiter</button>`;

  if (Q.t === "calc") {
    const inp = document.getElementById("inp");
    const check = () => {
      const v = parseGermanNumber(inp.value);
      if (isNaN(v)) { const fb = document.getElementById("fb"); fb.className = "feedback no"; fb.innerHTML = "<b>Bitte eine Zahl eingeben.</b>"; return; }
      inp.disabled = true;
      document.getElementById("check").remove();
      sicherheit(repeat, conf => {
        const ok = Math.abs(v - Q.a) <= (Q.tol || 0.01);
        inp.style.borderColor = ok ? "var(--ok)" : "var(--bad)";
        answer(Q, ok, conf);
      });
    };
    on("check", check);
    inp.onkeydown = e => { if (e.key === "Enter") check(); };
  } else if (Q.t === "text") {
    const inp = document.getElementById("inp");
    const check = () => {
      if (!inp.value.trim()) return;
      inp.disabled = true;
      document.getElementById("check").remove();
      sicherheit(repeat, conf => {
        const ok = textMatch(inp.value, Q.accept);
        inp.style.borderColor = ok ? "var(--ok)" : "var(--bad)";
        answer(Q, ok, conf);
      });
    };
    on("check", check);
    inp.onkeydown = e => { if (e.key === "Enter") check(); };
  } else if (Q.t === "multi") {
    const opts = [...app.querySelectorAll(".opt")];
    opts.forEach(b => b.onclick = () => b.classList.toggle("sel"));
    on("check", () => {
      if (!opts.some(b => b.classList.contains("sel"))) return;
      opts.forEach(b => b.disabled = true);
      document.getElementById("check").remove();
      sicherheit(repeat, conf => {
        let ok = true;
        opts.forEach(b => {
          const right = Q._opts[+b.dataset.k].ok, chosen = b.classList.contains("sel");
          if (right !== chosen) ok = false;
          if (right) b.classList.add("correct"); else if (chosen) b.classList.add("wrong");
          b.classList.remove("sel");
        });
        answer(Q, ok, conf);
      });
    });
  } else {
    app.querySelectorAll(".opt").forEach(b => b.onclick = () => {
      const k = +b.dataset.k;
      const right = Q._opts.findIndex(o => o.ok);
      app.querySelectorAll(".opt").forEach(x => x.disabled = true);
      b.classList.add("sel");
      sicherheit(repeat, conf => {
        b.classList.remove("sel");
        app.querySelectorAll(".opt").forEach(x => {
          const n = +x.dataset.k;
          if (n === right) x.classList.add("correct"); else if (n === k) x.classList.add("wrong");
        });
        answer(Q, k === right, conf);
      });
    });
  }
}

// Vor der Auflösung: Wie sicher warst du? (stärkt das Lernen, steuert die Wiederholung)
function sicherheit(repeat, weiter) {
  const el = document.getElementById("conf");
  if (!state.prefs.sicherheit || repeat || !el) return weiter(null);
  el.innerHTML = `<p class="muted">Wie sicher bist du?</p><div class="confwahl">
    <button class="btn ghost" data-c="sicher">💪 Sicher</button>
    <button class="btn ghost" data-c="unsicher">🤏 Unsicher</button>
    <button class="btn ghost" data-c="geraten">🎲 Geraten</button></div>`;
  el.querySelectorAll("button").forEach(b => b.onclick = () => { el.innerHTML = ""; weiter(b.dataset.c); });
}

function answer(Q, ok, conf) {
  if (!S.firstTry.has(Q.id)) {
    S.firstTry.set(Q.id, { Q, ok, conf });
    record(Q, ok, conf);
  }
  // Falsche Fragen kommen in derselben Runde wieder, bis sie sitzen (höchstens 3-mal)
  const wdh = S.retried.get(Q.id) || 0;
  if (!ok && wdh < 3) { S.retried.set(Q.id, wdh + 1); S.queue.push(Q); }
  const hinweis = conf === "sicher" && !ok ? "<br><i>Sicher, aber falsch – gut, dass es jetzt auffällt: Solche Fehler merkt man sich nach der Korrektur besonders gut.</i>"
    : ok && conf && conf !== "sicher" ? "<br><i>Richtig – aber noch nicht sicher. Die Frage kommt morgen wieder.</i>" : "";

  const f = fachById(Q.fach);
  const hasNotes = f.wissensbasis && f.kapitel && f.kapitel[Q.d];
  const mod = Q.m ? modulById(Q.fach, Q.m) : null;
  const fb = document.getElementById("fb");
  fb.className = "feedback " + (ok ? "ok" : "no");
  fb.innerHTML = `<b>${ok ? "Richtig!" : "Leider falsch – richtig ist: " + show(Q, correctText(Q))}</b><br>${show(Q, Q.e || "")}${hinweis}
    ${Q.s ? `<span class="src">${esc(Q.s)}</span>` : ""}
    ${mod ? `<button class="link" id="read">🃏 In den Lernkarten nachlesen</button>` : hasNotes ? `<button class="link" id="read">📖 Im Lernzettel nachlesen</button>` : ""}`;
  on("read", () => mod ? openModul(mod, Q) : openNotes(f, [f.kapitel[Q.d]], themaName(Q), Q));

  const n = document.getElementById("next");
  n.hidden = false;
  n.onclick = () => { S.i++; render(); };
}

function resultView() {
  S.finished = true;
  const res = [...S.firstTry.values()];
  const right = res.filter(r => r.ok).length;
  const wrong = res.filter(r => !r.ok);
  setTitle("Geschafft", S.name);
  app.innerHTML = `
    <div class="card center">
      <div class="big">${pct(right, res.length)}%</div>
      <p>${right} von ${res.length} beim ersten Versuch richtig</p>
      <p class="muted">${streak()}🔥 Tage in Folge gelernt</p>
    </div>
    ${wrong.length ? `<div class="card review"><h2>Das solltest du dir merken</h2>${wrong.map(r => `<div>${show(r.Q, r.Q.q)}<span class="sol">✓ ${show(r.Q, correctText(r.Q))}</span><span class="src">${show(r.Q, r.Q.e || "")}</span></div>`).join("")}</div>` : ""}
    <button class="btn primary" id="done">Fertig</button>`;
  on("done", () => { S = null; history.pop(); render(); });
}

// ---------- Lernzettel (Wissensbasis) ----------
const mdCache = {};
async function loadMd(f) {
  if (!mdCache[f.id]) {
    const r = await fetch(f.wissensbasis);
    if (!r.ok) throw new Error("nicht gefunden");
    mdCache[f.id] = await r.text();
  }
  return mdCache[f.id];
}
// Zerlegt die Wissensbasis in Kapitel ("## 3. Titel" → Schlüssel "3")
function chapters(md) {
  const out = {};
  let key = null;
  md.split(/\r?\n/).forEach(line => {
    const m = line.match(/^##\s+(\d+)\./);
    if (m) key = m[1];
    else if (/^#\s/.test(line)) key = null;
    if (key !== null) (out[key] = out[key] || []).push(line);
  });
  Object.keys(out).forEach(k => out[k] = out[k].join("\n"));
  return out;
}

const sheet = document.getElementById("sheet");
document.getElementById("sheet-close").onclick = () => { sheet.hidden = true; document.body.style.overflow = ""; };

async function openNotes(f, keys, title, Q, term) {
  document.getElementById("sheet-title").textContent = title;
  const body = document.getElementById("sheet-body");
  body.innerHTML = '<p class="muted">Lade …</p>';
  sheet.hidden = false;
  document.body.style.overflow = "hidden";
  try {
    const ch = chapters(await loadMd(f));
    body.innerHTML = keys.map(k => ch[k] ? markdown(ch[k]) : "").join("<hr>") || '<p class="muted">Kein Kapitel gefunden.</p>';
    sheet.scrollTop = 0;
    if (Q) highlight(body, Q);
    else if (term) markTerm(body, term);
  } catch (e) {
    body.innerHTML = '<p class="muted">Der Lernzettel konnte nicht geladen werden.</p>';
  }
}

// Springt zum Abschnitt, der am besten zur Frage passt (gemeinsame Schlüsselwörter)
function highlight(body, Q) {
  const text = plain(Q.q + " " + correctText(Q));
  const words = (text.toLowerCase().match(/[a-zäöüß]{5,}/g) || [])
    .concat((text.match(/\b[A-ZÄÖÜ][A-Z0-9ÄÖÜ\/-]{1,}\b|\b\d[\d.,]{1,}\b/g) || []).map(w => w.toLowerCase())); // Abkürzungen (USB, SSD) und Zahlen
  const uniq = [...new Set(words)];
  let best = null, bestScore = 0;
  // einzelne Zeilen (Aufzählungspunkt, Tabellenzeile, Absatz) bewerten
  body.querySelectorAll("li, tr, p, blockquote").forEach(el => {
    const text = el.textContent.toLowerCase();
    const score = uniq.filter(w => text.includes(w)).length;
    if (score > bestScore) { bestScore = score; best = el; }
  });
  if (best && bestScore >= 2) markAndScroll(best);
}

function markAndScroll(el) {
  el.classList.add("mark");
  setTimeout(() => {
    const top = el.getBoundingClientRect().top + sheet.scrollTop - 120;
    sheet.scrollTo({ top, behavior: "smooth" });
  }, 50);
}

// Suchbegriff: alle Zeilen markieren, die ihn enthalten, und zur ersten springen
function markTerm(body, term) {
  const els = [...body.querySelectorAll("h3, li, tr, p, blockquote")]
    .filter(el => el.textContent.toLowerCase().includes(term) && !el.querySelector("li, tr"));
  els.forEach(el => el.classList.add("mark"));
  if (els[0]) markAndScroll(els[0]);
}

// Kleiner Markdown-Umwandler (Überschriften, Listen, Tabellen, Zitate, fett/kursiv)
function inline(s) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, "$1<i>$2</i>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/〔([^〕]*)〕/g, '<span class="qz">$1</span>') // Quellenzeichen – nur sichtbar, wenn eingeschaltet
    .replace(/&lt;(\/?(?:b|i|strong|em|br\s*\/?))&gt;/g, "<$1>"); // einfache Formatierung erlauben
}
function markdown(md) {
  const lines = md.split("\n");
  let html = "", i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    let m;
    if ((m = line.match(/^(#{1,4})\s+(.*)/))) {
      const lvl = Math.min(m[1].length + 0, 4);
      html += `<h${lvl}>${inline(m[2])}</h${lvl}>`; i++; continue;
    }
    if (/^---+\s*$/.test(line)) { html += "<hr>"; i++; continue; }
    // Aufklappen über mehrere Zeilen: <details><summary>Lösung</summary> … </details>
    if ((m = line.match(/^\s*<details>\s*<summary>(.*?)<\/summary>\s*$/))) {
      const inhalt = [];
      i++;
      while (i < lines.length && !/<\/details>/.test(lines[i])) { inhalt.push(lines[i]); i++; }
      if (i < lines.length) inhalt.push(lines[i].replace(/<\/details>.*$/, "")); // Rest der Schlusszeile
      i++;
      html += `<details><summary>${inline(m[1])}</summary><div>${markdown(inhalt.join("\n"))}</div></details>`;
      continue;
    }
    // Aufklappen in einer Zeile: <details><summary>Tipp 1</summary>Text</details>
    if ((m = line.match(/^\s*<details>\s*<summary>(.*?)<\/summary>(.*?)<\/details>(.*)$/))) {
      html += `<details><summary>${inline(m[1])}</summary><div>${inline(m[2])}</div></details>${m[3].trim() ? `<p>${inline(m[3])}</p>` : ""}`;
      i++; continue;
    }
    // Bild: ![Bildunterschrift](faecher/…/bild.svg)
    if ((m = line.match(/^!\[(.*)\]\(([^)\s]+)\)\s*$/))) {
      html += `<figure><a href="${esc(m[2])}" target="_blank"><img src="${esc(m[2])}" alt="${esc(m[1])}"></a><figcaption>${inline(m[1])} · antippen zum Vergrößern</figcaption></figure>`;
      i++; continue;
    }
    if (line.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) { rows.push(lines[i]); i++; }
      const cells = r => r.replace(/^\||\|\s*$/g, "").split("|").map(c => c.trim());
      const body = rows.filter(r => !/^\|[\s:|-]+\|?\s*$/.test(r));
      html += `<div class="tbl"><table>${body.map((r, n) => `<tr>${cells(r).map(c => n === 0 ? `<th>${inline(c)}</th>` : `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</table></div>`;
      continue;
    }
    if (line.startsWith(">")) {
      const q = [];
      while (i < lines.length && lines[i].startsWith(">")) { q.push(lines[i].replace(/^>\s?/, "")); i++; }
      html += `<blockquote>${q.filter(x => x.trim()).map(inline).join("<br>")}</blockquote>`;
      continue;
    }
    if (/^\s*([-*]|\d+\.)\s/.test(line)) {
      html += "<ul>";
      while (i < lines.length && /^\s*([-*]|\d+\.)\s/.test(lines[i])) {
        const mm = lines[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)/);
        const depth = Math.floor(mm[1].length / 2);
        html += `<li class="d${Math.min(depth, 3)}${/\d/.test(mm[2]) ? " num" : ""}">${/\d/.test(mm[2]) ? `<span class="n">${mm[2]}</span> ` : ""}${inline(mm[3])}</li>`;
        i++;
      }
      html += "</ul>";
      continue;
    }
    const p = [lines[i]]; i++; // erste Zeile immer übernehmen (sonst Endlosschleife bei unbekanntem Format)
    while (i < lines.length && lines[i].trim() && !/^(#|\||>|---|!\[|\s*<details|\s*([-*]|\d+\.)\s)/.test(lines[i])) { p.push(lines[i]); i++; }
    html += `<p>${p.map(inline).join("<br>")}</p>`;
  }
  return html;
}

// ---------- Start ----------
function start() {
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js");
  }
  go(homeView);
}
