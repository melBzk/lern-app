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
    Q.id = f.id + ":" + hash(Q.d + "|" + (Q.key || Q.q));
    ALL.push(Q);
  });
  FAECHER.push(f);
}

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
  if (Q.t === "text") return Q.accept[0];
  if (Q.t === "multi") return Q.k.map(i => Q.o[i]).join(" + ");
  return Q.o[0];
}
// Text einer Frage ausgeben: Fächer mit html:true dürfen <b>/<i> enthalten
function show(Q, s) { return fachById(Q.fach).html ? String(s) : esc(s); }
function plain(s) { const d = document.createElement("div"); d.innerHTML = s; return d.textContent; }
function norm(s) { return s.toLowerCase().replace(/[„“"'().,!?]/g, "").replace(/\s+/g, " ").trim(); }
function fachById(id) { return FAECHER.find(f => f.id === id); }
function themaName(Q) { return fachById(Q.fach).themen[Q.d] || ""; }
function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }

// ---------- Speicher ----------
function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { cards: {}, days: {} }; }
  catch { return { cards: {}, days: {} }; }
}
let state = load();
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }

const card = Q => state.cards[Q.id];
const isDue = Q => card(Q) && card(Q).due <= today();
const isNew = Q => !card(Q);
const isMastered = Q => card(Q) && card(Q).box >= 4;
const isWrongLast = Q => card(Q) && card(Q).box === 1;

function streak() {
  let n = 0;
  let off = state.days[today()] ? 0 : -1; // heute zählt mit, wenn schon gelernt
  while (state.days[today(off)]) { n++; off--; }
  return n;
}

function record(Q, ok) {
  const c = card(Q) || { box: 0, right: 0, wrong: 0, first: today() };
  // Fach 1 = "zuletzt falsch"; richtig beantwortet geht es mindestens in Fach 2
  c.box = ok ? Math.min(Math.max(c.box, 1) + 1, 5) : 1;
  c.due = today(INTERVAL[c.box]);
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
  const r = dailyRound();

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
      <button class="btn primary" id="daily" ${r.list.length ? "" : "disabled"}>
        Tägliche Runde starten
        <small>${r.list.length ? `${r.rep} Wiederholungen · ${r.neu} neue Fragen` : "Für heute ist alles erledigt 🎉"}</small>
      </button>
      ${weakQ.length ? `<button class="btn dark" id="weak">Fehler üben <small>${weakQ.length} Fragen, die zuletzt falsch waren</small></button>` : ""}
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
      <p class="muted">Jede Frage liegt in einem von 5 Fächern der Lernkartei. Richtig → ein Fach weiter, sie kommt erst später wieder (1, 2, 4, 8, 16 Tage). Falsch → zurück in Fach 1. Ab Fach 4 gilt eine Frage als „sicher“. Pro Tag kommen höchstens ${ROUND_SIZE} neue Fragen dazu.</p>
      <div class="boxes">${[1, 2, 3, 4, 5].map(b => `<div class="b"><span>${ALL.filter(Q => card(Q)?.box === b).length}</span>Fach ${b}</div>`).join("")}</div>
      <button class="btn ghost small danger" id="reset">Fortschritt zurücksetzen</button>
    </div>`;

  on("wissen", () => go(wissenView));
  on("daily", () => startQuiz("Tägliche Runde", r.list));
  on("weak", () => startQuiz("Fehler üben", shuffle(weakQ).slice(0, 15)));
  on("reset", () => {
    if (confirm("Wirklich den gesamten Lernfortschritt löschen?")) { state = { cards: {}, days: {} }; save(); render(); }
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
    <div class="card"><h2>Kapitel</h2>${list.filter(c => !allg.has(c.key)).map(row).join("")}</div>
    <button class="btn ghost" id="alles">Alles am Stück lesen</button>`;
  app.querySelectorAll(".row").forEach(el => el.onclick = () => {
    const c = list.find(c => c.key === el.dataset.k);
    openNotes(f, [c.key], c.title);
  });
  on("alles", () => openNotes(f, list.map(c => c.key), f.name + " · komplett"));
}

function dailyRound() {
  const due = ALL.filter(isDue).sort((a, b) => card(a).box - card(b).box);
  const newToday = Object.values(state.cards).filter(c => c.first === today()).length;
  const rep = shuffle(due.slice(0, ROUND_SIZE));
  const want = Math.max(0, Math.min(ROUND_SIZE - newToday, ROUND_SIZE - rep.length));
  // neue Fragen: abwechselnd aus jedem Fach, innerhalb des Fachs der Reihe nach (Thema für Thema)
  const queues = FAECHER.map(f => fachFragen(f).filter(isNew));
  const neu = [];
  for (let k = 0; neu.length < want && queues.some(q => q.length); k++) {
    const q = queues[k % queues.length];
    if (q.length) neu.push(q.shift());
  }
  return { list: shuffle(rep.concat(neu)), rep: rep.length, neu: neu.length };
}

function on(id, fn) { const el = document.getElementById(id); if (el) el.onclick = fn; }

// ---------- Fach-Seite ----------
const openGroups = new Set(); // welche Gruppen aufgeklappt sind (bleibt beim Zurückgehen erhalten)

function themenListe(f, ds) {
  return ds.map(d => {
    const ts = stats(themaFragen(f, d));
    return `<div class="row" data-d="${d}">
      <div class="name">${esc(f.themen[d])}${ts.weak ? ' <span class="pill">⚠ üben</span>' : ""}
        <div class="meta">${ts.total} Fragen · ${ts.seen} gesehen · ${ts.mastered} sicher${ts.due ? ` · <span class="hl">${ts.due} fällig</span>` : ""}</div>
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
      ${hasNotes ? `<button class="btn ${ts.weak ? "primary" : "ghost"}" id="notes">📖 Lernzettel lesen <small>aus deiner Wissensbasis</small></button>` : ""}
      <button class="btn ${ts.weak ? "dark" : "primary"}" id="all">Alle ${ts.total} Fragen üben</button>
      ${wrong.length ? `<button class="btn dark" id="wrong">Nur Fehler üben <small>${wrong.length} Fragen</small></button>` : ""}
    </div>`;
  on("notes", () => openNotes(f, [f.kapitel[d]], f.themen[d]));
  on("all", () => startQuiz(kurz.trim(), shuffle(list)));
  on("wrong", () => startQuiz(kurz.trim() + " · Fehler", shuffle(wrong)));
}

// ---------- Lernrunde ----------
let S = null;

function startQuiz(name, list) {
  if (!list.length) return;
  S = { name, queue: list.slice(), total: list.length, i: 0, firstTry: new Map(), retried: new Set(), finished: false };
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
      <p class="q">${show(Q, Q.q)}</p>
      ${body}
      <div id="fb"></div>
    </div>
    <button class="btn dark" id="next" hidden>Weiter</button>`;

  if (Q.t === "calc") {
    const inp = document.getElementById("inp");
    const check = () => {
      const v = parseGermanNumber(inp.value);
      if (isNaN(v)) { const fb = document.getElementById("fb"); fb.className = "feedback no"; fb.innerHTML = "<b>Bitte eine Zahl eingeben.</b>"; return; }
      const ok = Math.abs(v - Q.a) <= (Q.tol || 0.01);
      inp.disabled = true;
      inp.style.borderColor = ok ? "var(--ok)" : "var(--bad)";
      document.getElementById("check").remove();
      answer(Q, ok);
    };
    on("check", check);
    inp.onkeydown = e => { if (e.key === "Enter") check(); };
  } else if (Q.t === "text") {
    const inp = document.getElementById("inp");
    const check = () => {
      if (!inp.value.trim()) return;
      const ok = Q.accept.some(a => norm(a) === norm(inp.value));
      inp.disabled = true;
      inp.style.borderColor = ok ? "var(--ok)" : "var(--bad)";
      document.getElementById("check").remove();
      answer(Q, ok);
    };
    on("check", check);
    inp.onkeydown = e => { if (e.key === "Enter") check(); };
  } else if (Q.t === "multi") {
    const opts = [...app.querySelectorAll(".opt")];
    opts.forEach(b => b.onclick = () => b.classList.toggle("sel"));
    on("check", () => {
      if (!opts.some(b => b.classList.contains("sel"))) return;
      let ok = true;
      opts.forEach(b => {
        const right = Q._opts[+b.dataset.k].ok, chosen = b.classList.contains("sel");
        b.disabled = true;
        if (right !== chosen) ok = false;
        if (right) b.classList.add("correct"); else if (chosen) b.classList.add("wrong");
      });
      document.getElementById("check").remove();
      answer(Q, ok);
    });
  } else {
    app.querySelectorAll(".opt").forEach(b => b.onclick = () => {
      const k = +b.dataset.k;
      const right = Q._opts.findIndex(o => o.ok);
      app.querySelectorAll(".opt").forEach(x => {
        x.disabled = true;
        const n = +x.dataset.k;
        if (n === right) x.classList.add("correct"); else if (n === k) x.classList.add("wrong");
      });
      answer(Q, k === right);
    });
  }
}

function answer(Q, ok) {
  if (!S.firstTry.has(Q.id)) {
    S.firstTry.set(Q.id, { Q, ok });
    record(Q, ok);
  }
  // Falsche Fragen kommen am Ende der Runde einmal wieder
  if (!ok && !S.retried.has(Q.id)) { S.retried.add(Q.id); S.queue.push(Q); }

  const f = fachById(Q.fach);
  const hasNotes = f.wissensbasis && f.kapitel && f.kapitel[Q.d];
  const fb = document.getElementById("fb");
  fb.className = "feedback " + (ok ? "ok" : "no");
  fb.innerHTML = `<b>${ok ? "Richtig!" : "Leider falsch – richtig ist: " + show(Q, correctText(Q))}</b><br>${show(Q, Q.e || "")}
    ${Q.s ? `<span class="src">${esc(Q.s)}</span>` : ""}
    ${hasNotes ? `<button class="link" id="read">📖 Im Lernzettel nachlesen</button>` : ""}`;
  on("read", () => openNotes(f, [f.kapitel[Q.d]], themaName(Q), Q));

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
    .replace(/`([^`]+)`/g, "<code>$1</code>");
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
    const p = [];
    while (i < lines.length && lines[i].trim() && !/^(#|\||>|---|\s*([-*]|\d+\.)\s)/.test(lines[i])) { p.push(lines[i]); i++; }
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
