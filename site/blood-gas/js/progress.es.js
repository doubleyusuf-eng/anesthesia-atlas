/* Otomatik üretildi: node tools/i18n.cjs apply — elle düzenlemeyin. Kaynak: js/progress.js + content-src/i18n/es */
'use strict';
/* Kan Gazı Atlası · ilerleme takibi (kardeş atlaslarla aynı görünüm)
   Öğeler: dersler ("l:<id>") ve sentetik olgular ("c:<id>"). Aşamalar: 1 açıldı, 2 tamamlandı
   (ders: sayfanın sonu görüldü; olgu: gerekçeli yanıt açıldı). Aşamalar yalnızca yükselir.
   Veriler yalnızca bu tarayıcıda (localStorage) saklanır; erişilemiyorsa oturum boyunca bellekte tutulur.
   Girilen kan gazı değerleri ilerlemeye ya da depolamaya hiçbir zaman yazılmaz. */
const PROG = (() => {
  const LS = 'kg-progress-v1', C = window.KG_CONTENT;
  const {esc} = KGI;
  const GROUPS = [
    {id: 'adult', title: "Lecciones básicas (adultos)", ids: C.lessons.filter(l => l.group === 'adult').map(l => 'l:' + l.id), href: id => '#/ogren/' + id.slice(2)},
    {id: 'sample', title: "Lecciones de muestra y medición", ids: C.lessons.filter(l => l.group === 'sample').map(l => 'l:' + l.id), href: id => '#/ogren/' + id.slice(2)},
    {id: 'serial', title: "Lecciones de evaluación seriada", ids: C.lessons.filter(l => l.group === 'serial').map(l => 'l:' + l.id), href: id => '#/ogren/' + id.slice(2)},
    {id: 'koah', title: "Lecciones de EPOC e hipercapnia", ids: C.lessons.filter(l => l.group === 'koah').map(l => 'l:' + l.id), href: id => '#/ogren/' + id.slice(2)},
    {id: 'renal', title: "Lecciones de riñón y diálisis", ids: C.lessons.filter(l => l.group === 'renal').map(l => 'l:' + l.id), href: id => '#/ogren/' + id.slice(2)},
    {id: 'tox', title: "Lecciones de toxicología", ids: C.lessons.filter(l => l.group === 'tox').map(l => 'l:' + l.id), href: id => '#/ogren/' + id.slice(2)},
    {id: 'mixed', title: "Lecciones de ácido–base mixto", ids: C.lessons.filter(l => l.group === 'mixed').map(l => 'l:' + l.id), href: id => '#/ogren/' + id.slice(2)},
    {id: 'ped', title: "Lecciones de pediatría y neonatos", ids: C.lessons.filter(l => l.group === 'ped').map(l => 'l:' + l.id), href: id => '#/ogren/' + id.slice(2)},
    {id: 'preg', title: "Lecciones de embarazo", ids: C.lessons.filter(l => l.group === 'preg').map(l => 'l:' + l.id), href: id => '#/ogren/' + id.slice(2)},
    {id: 'cases', title: "Casos", ids: C.cases.map(c => 'c:' + c.id), href: id => '#/olgu/' + id.slice(2)}
  ];
  const VALID = new Set(GROUPS.flatMap(g => g.ids));
  let available = true;
  const blank = () => ({v: 1, items: {}, updated: 0});
  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(LS) || 'null'), out = blank();
      if (raw && raw.items) for (const [id, s] of Object.entries(raw.items)) if (VALID.has(id)) out.items[id] = Math.max(1, Math.min(2, Number(s) || 1));
      return out;
    } catch (e) { available = false; return blank(); }
  }
  let st = load();
  function save() { st.updated = Date.now(); try { localStorage.setItem(LS, JSON.stringify(st)); } catch (e) { available = false; } document.dispatchEvent(new CustomEvent('kg:progress')); }
  const stage = id => st.items[id] || 0;
  const mark = (id, s) => { if (!VALID.has(id) || stage(id) >= s) return; st.items[id] = s; save(); };
  const seen = id => mark(id, 1), done = id => mark(id, 2);
  const counts = ids => ({seen: ids.filter(i => stage(i) >= 1).length, done: ids.filter(i => stage(i) >= 2).length, total: ids.length});
  const all = () => [...VALID];
  const pct = (ids = all()) => { const c = counts(ids); return c.total ? Math.round(c.done / c.total * 100) : 0; };
  const reset = () => { st = blank(); save(); };
  /* Ders menüsü ve olgu kartları için küçük işaret */
  const markHTML = id => { const s = stage(id); return s ? `<span class="pmark ${s >= 2 ? 'done' : 'seen'}" title="${s >= 2 ? "Completado" : "Abierto"}"></span>` : ''; };

  let btn = null, panel = null;
  function render() {
    if (!btn) return;
    const p = pct();
    btn.querySelector('.prog-ring').style.setProperty('--p', p);
    btn.querySelector('.prog-lbl').textContent = `${p}%`;
    btn.setAttribute('aria-label', `İlerleme: %${p}`);
    if (panel.hidden) return;
    const c = counts(all());
    panel.innerHTML = `<div class="prog-top"><div><p class="eyebrow">Progreso</p><h3>${c.done} / ${c.total} completado</h3></div>
        <button type="button" class="btn ghost sm" data-close>Cerrar</button></div>
      <p class="muted prog-note">Una lección se considera completada cuando se ve el final de la página; un caso, cuando se abre la respuesta razonada. ${available ? "El progreso se guarda solo en este navegador; los valores de gasometría que introduces no se guardan." : "El almacenamiento del navegador no está disponible; el progreso se borrará al cerrar la página."}</p>
      <p class="prog-sum"><span>Abiertos: ${c.seen}</span><span>Completados: ${c.done}</span></p>
      <div class="prog-rows">${GROUPS.map(g => {
        const k = counts(g.ids), next = g.ids.find(i => stage(i) < 2) || g.ids[0];
        return `<a class="prog-row" href="${g.href(next)}">
          <span class="prog-head"><span>${esc(g.title)}</span><b>${k.done} / ${k.total}</b></span>
          <span class="bar"><span class="seen" style="width:${k.seen / k.total * 100}%"></span><span class="ok" style="width:${k.done / k.total * 100}%"></span></span></a>`;
      }).join('')}</div>
      <div class="prog-foot"><button class="linkbtn" type="button" data-reset>Restablecer el progreso</button>
        <span class="prog-confirm" hidden>¿Estás seguro? <button class="linkbtn" type="button" data-yes>Sí, restablecer</button> · <button class="linkbtn" type="button" data-no>Cancelar</button></span></div>`;
  }
  function close() { if (!panel || panel.hidden) return; panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
  function ui() {
    const bar = document.querySelector('.topbar .wrap'); if (!bar) return;
    btn = document.createElement('button'); btn.type = 'button'; btn.className = 'prog-btn';
    btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'progPanel');
    btn.innerHTML = '<span class="prog-ring" aria-hidden="true"></span><span class="prog-lbl"></span>';
    bar.append(btn);
    panel = document.createElement('aside'); panel.id = 'progPanel'; panel.className = 'prog-panel'; panel.hidden = true;
    panel.setAttribute('aria-label', 'İlerleme'); document.body.append(panel);
    btn.addEventListener('click', () => { panel.hidden = !panel.hidden; btn.setAttribute('aria-expanded', String(!panel.hidden)); render(); if (!panel.hidden) panel.querySelector('[data-close]').focus(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    document.addEventListener('click', e => { if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) close(); });
    panel.addEventListener('click', e => {
      if (e.target.closest('a.prog-row')) { close(); return; }
      const b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-close')) close();
      if (b.hasAttribute('data-reset')) { panel.querySelector('.prog-confirm').hidden = false; panel.querySelector('[data-no]').focus(); }
      if (b.hasAttribute('data-no')) panel.querySelector('.prog-confirm').hidden = true;
      if (b.hasAttribute('data-yes')) reset();
    });
    render();
  }
  document.addEventListener('kg:progress', render);
  /* Başka sekmede yapılan değişiklikleri al */
  addEventListener('storage', e => { if (e.key === LS) { st = load(); document.dispatchEvent(new CustomEvent('kg:progress')); } });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ui); else ui();
  return {seen, done, stage, counts, pct, reset, markHTML, get available() { return available; }};
})();
