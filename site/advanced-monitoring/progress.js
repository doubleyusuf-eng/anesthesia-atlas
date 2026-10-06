'use strict';
/* İleri Monitörizasyon Atlası · ilerleme takibi
   Her cihaz için üç aşama: 1 incelendi (sayfası açıldı), 2 sorusu denendi (yanlış), 3 sorusu doğru yanıtlandı.
   Aşamalar yalnızca yükselir; bir kez doğru yanıtlanan soru sonradan yanlış yanıtlansa da tamamlanmış sayılır,
   ancak son yanıt ayrıca tutulur ("yanlışları tekrar et" son yanıtı yanlış olanları getirir).
   Veriler yalnızca bu tarayıcıda (localStorage) saklanır; erişilemiyorsa oturum boyunca bellekte tutulur. */
const PROG = (() => {
  const LS = 'ica-progress-v1';
  let available = true;
  const blank = () => ({v: 1, items: {}, updated: 0});
  function normalize(raw) {
    const out = blank(); if (!raw || typeof raw !== 'object' || !raw.items) return out;
    for (const [id, x] of Object.entries(raw.items)) {
      if (!DB.byId.has(id) || !x || typeof x !== 'object') continue;
      out.items[id] = {stage: Math.max(1, Math.min(3, Number(x.stage) || 1)), last: x.last === true ? true : x.last === false ? false : null, n: Number(x.n) || 0, t: Number(x.t) || 0};
    }
    out.updated = Number(raw.updated) || 0; return out;
  }
  function load() { try { return normalize(JSON.parse(localStorage.getItem(LS) || 'null')); } catch (e) { available = false; return blank(); } }
  let st = load();
  function save() { st.updated = Date.now(); try { localStorage.setItem(LS, JSON.stringify(st)); } catch (e) { available = false; } document.dispatchEvent(new CustomEvent('ica:progress')); }
  const item = id => st.items[id] || (st.items[id] = {stage: 0, last: null, n: 0, t: 0});

  function seen(id) { if (!DB.byId.has(id)) return; const x = item(id); if (x.stage >= 1) return; x.stage = 1; x.t = Date.now(); save(); }
  function answer(id, ok) { if (!DB.byId.has(id)) return; const x = item(id); x.stage = Math.max(x.stage, ok ? 3 : 2); x.last = !!ok; x.n++; x.t = Date.now(); save(); }
  const stage = id => (st.items[id] && st.items[id].stage) || 0;
  const wrong = () => Object.entries(st.items).filter(([, x]) => x.last === false).map(([id]) => id);
  function counts(ids) {
    const s = ids.map(stage);
    return {viewed: s.filter(x => x >= 1).length, tried: s.filter(x => x >= 2).length, done: s.filter(x => x >= 3).length, total: ids.length};
  }
  const all = () => DB.devices.map(d => d.id);
  const pct = (ids = all()) => { const c = counts(ids); return c.total ? Math.round(c.done / c.total * 100) : 0; };
  function reset() { st = blank(); save(); }

  /* Üst çubuktaki ilerleme düğmesi ve paneli */
  let btn = null, panel = null;
  function render() {
    if (!btn) return;
    const p = pct();
    btn.querySelector('.prog-ring').style.setProperty('--p', p);
    btn.querySelector('.prog-lbl').textContent = `${p}%`;
    btn.setAttribute('aria-label', ICA.fill(ICA.t('prog.aria'), {p}));
    if (panel.hidden) return;
    const c = counts(all()), w = wrong().length;
    panel.innerHTML = `<div class="prog-top"><div><p class="eyebrow">${esc(ICA.t('prog.title'))}</p><h3>${esc(ICA.fill(ICA.t('prog.headline'), {d: c.done, n: c.total}))}</h3></div>
        <button type="button" class="btn" data-close>${esc(ICA.t('prog.close'))}</button></div>
      <p class="muted prog-note">${esc(ICA.t('prog.note'))} ${esc(ICA.t(available ? 'prog.local' : 'prog.volatile'))}</p>
      <p class="prog-sum"><span>${esc(ICA.fill(ICA.t('prog.viewed'), {n: c.viewed}))}</span><span>${esc(ICA.fill(ICA.t('prog.tried'), {n: c.tried}))}</span><span>${esc(ICA.fill(ICA.t('prog.done'), {n: c.done}))}</span></p>
      <div class="prog-rows">${DB.cats.map(cat => {
        const ids = DB.devices.filter(d => d.cat === cat.id).map(d => d.id), k = counts(ids);
        return `<a class="prog-row" href="${ICA.root}${ICA.lang === 'tr' ? '' : ICA.lang + '/'}sinav.html?k=${cat.id}">
          <span class="prog-head"><span>${esc(ICA.pick(cat.short))}</span><b>${k.done} / ${k.total}</b></span>
          <span class="bar"><span class="seen" style="width:${k.viewed / k.total * 100}%"></span><span class="ok" style="width:${k.done / k.total * 100}%"></span></span></a>`;
      }).join('')}</div>
      <div class="prog-actions">
        <a class="btn primary" href="${quizHref()}">${esc(ICA.t('prog.start'))}</a>
        ${w ? `<a class="btn" href="${quizHref('wrong')}">${esc(ICA.fill(ICA.t('prog.retry'), {n: w}))}</a>` : ''}
      </div>
      <div class="prog-foot"><button class="linkbtn" type="button" data-reset>${esc(ICA.t('prog.reset'))}</button>
        <span class="prog-confirm" hidden>${esc(ICA.t('prog.confirm'))} <button class="linkbtn" type="button" data-yes>${esc(ICA.t('prog.yes'))}</button> · <button class="linkbtn" type="button" data-no>${esc(ICA.t('prog.cancel'))}</button></span></div>`;
  }
  const quizHref = mode => ICA.root + (ICA.lang === 'tr' ? '' : ICA.lang + '/') + 'sinav.html' + (mode ? '?k=' + mode : '');
  function close() { if (!panel || panel.hidden) return; panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
  function ui() {
    const bar = document.querySelector('.topbar .wrap'); if (!bar) return;
    btn = document.createElement('button'); btn.type = 'button'; btn.className = 'prog-btn';
    btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'progPanel');
    btn.innerHTML = '<span class="prog-ring" aria-hidden="true"></span><span class="prog-lbl"></span>';
    bar.insertBefore(btn, bar.querySelector('.lang-switch'));
    panel = document.createElement('aside'); panel.id = 'progPanel'; panel.className = 'prog-panel'; panel.hidden = true;
    panel.setAttribute('aria-label', ICA.t('prog.title')); document.body.append(panel);
    btn.addEventListener('click', () => { panel.hidden = !panel.hidden; btn.setAttribute('aria-expanded', String(!panel.hidden)); render(); if (!panel.hidden) panel.querySelector('[data-close]').focus(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    document.addEventListener('click', e => { if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) close(); });
    panel.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-close')) close();
      if (b.hasAttribute('data-reset')) { panel.querySelector('.prog-confirm').hidden = false; panel.querySelector('[data-no]').focus(); }
      if (b.hasAttribute('data-no')) panel.querySelector('.prog-confirm').hidden = true;
      if (b.hasAttribute('data-yes')) reset();
    });
    render();
  }
  document.addEventListener('ica:progress', render);
  /* Başka sekmede yapılan değişiklikleri al */
  addEventListener('storage', e => { if (e.key === LS) { st = load(); document.dispatchEvent(new CustomEvent('ica:progress')); } });
  /* Geri tuşuyla önbellekten dönülen sayfada güncel durumu yükle */
  addEventListener('pageshow', e => { if (e.persisted) { st = load(); document.dispatchEvent(new CustomEvent('ica:progress')); } });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ui); else ui();
  return {seen, answer, stage, counts, pct, wrong, reset, quizHref, get available() { return available; }};
})();
