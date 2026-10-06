'use strict';
/* Anestezi Makinesi Atlası · İş istasyonları sayfası
   Marka süzgeci, model seçimi, 3B model (döndür/yakınlaştır, numaralı parçalar), genel tanıtım, kullanım kanıtı (K/P/S) ve kaynaklar.
   Veri: ws/ws-data.js (kayıtlar, kanıt), ws/ws-text.js (genel tanıtım metinleri), modeller ws/dm-*.js. */
(() => {
  const L = ICA.lang, P = ICA.pick, D = window.WS_DATA || {devices: [], sources: {}}, T = window.WS_TEXT || {};
  const U = {
    all: {tr: 'Tümü', en: 'All', es: 'Todos'},
    parts: {tr: 'Parçalar', en: 'Parts', es: 'Piezas'},
    partHint: {tr: 'Bir parçayı seçmek için listedeki ya da modeldeki numaraya dokunun.', en: 'Tap a number in the list or on the model to select a part.', es: 'Toque un número de la lista o del modelo para seleccionar una pieza.'},
    family: {tr: 'Aile', en: 'Family', es: 'Familia'},
    variants: {tr: 'Aynı ailedeki modeller', en: 'Models in the same family', es: 'Modelos de la misma familia'},
    evTitle: {tr: 'Kullanım kanıtı', en: 'Evidence of use', es: 'Evidencia de uso'},
    evK: {tr: 'Yakın tarihli klinik yayında kullanımı belgelenmiş.', en: 'Use documented in a recent clinical publication.', es: 'Uso documentado en una publicación clínica reciente.'},
    evP: {tr: 'Üretici portföyünde; hastanede aktif kullanım ayrıca doğrulanmalı.', en: 'In the manufacturer’s portfolio; active hospital use must be confirmed separately.', es: 'En la cartera del fabricante; el uso hospitalario activo debe confirmarse por separado.'},
    evS: {tr: 'Resmî destek kaydı mevcut; güncel hastane kullanımı ayrıca doğrulanmadı.', en: 'An official support record exists; current hospital use has not been confirmed separately.', es: 'Existe un registro oficial de soporte; el uso hospitalario actual no se ha confirmado por separado.'},
    scope: {tr: 'Kapsam', en: 'Scope', es: 'Alcance'},
    model: {tr: 'Bağımsız oluşturulmuş temsili eğitim modeli; ekrandaki değerler örnektir.', en: 'Independently created representative teaching model; on-screen values are examples.', es: 'Modelo docente representativo creado de forma independiente; los valores en pantalla son ejemplos.'},
    pending: {tr: 'Bu modelin genel tanıtımı hazırlanıyor.', en: 'The overview of this model is being prepared.', es: 'La presentación general de este modelo está en preparación.'},
    fail: {tr: '3B görüntüleme bu tarayıcıda başlatılamadı.', en: 'The 3D view could not be started in this browser.', es: 'La vista 3D no pudo iniciarse en este navegador.'}
  };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const name = d => P(d.name);
  const brandOf = d => d.maker.replace(/\s*\(.*\)$/, '').replace('GE HealthCare', 'GE HealthCare');
  const SHORT = {'Dräger': 'Dräger', 'GE HealthCare': 'GE', 'Mindray': 'Mindray', 'Getinge': 'Getinge', 'Löwenstein Medical': 'Löwenstein'};
  const ORDER = ['Dräger', 'GE HealthCare', 'Mindray', 'Getinge', 'Löwenstein Medical'];
  const models = D.devices.filter(d => typeof DEV3D !== 'undefined' && DEV3D.has(d.id))
    .sort((a, b) => (ORDER.indexOf(brandOf(a)) - ORDER.indexOf(brandOf(b))) || name(a).localeCompare(name(b), 'tr', {numeric: true}));
  const label = d => brand === 'all' && !name(d).startsWith(SHORT[brandOf(d)] || '#') ? `${SHORT[brandOf(d)] || brandOf(d)} ${name(d)}` : name(d);
  const byId = new Map(D.devices.map(d => [d.id, d]));
  const brands = [...new Set(models.map(brandOf))];
  let brand = 'all', cur = null, ctl = null;

  const elBrands = document.getElementById('wsBrands'), elModels = document.getElementById('wsModels'), stage = document.getElementById('wsStage');
  const info = document.getElementById('wsInfo'), plist = document.getElementById('wsPartList'), pinfo = document.getElementById('wsPartInfo');

  function chips() {
    elBrands.innerHTML = ['all', ...brands].map(b => `<button type="button" data-b="${esc(b)}" aria-pressed="${b === brand}">${esc(b === 'all' ? P(U.all) : b)}</button>`).join('');
    elModels.innerHTML = models.filter(d => brand === 'all' || brandOf(d) === brand)
      .map(d => `<button type="button" data-id="${d.id}" aria-pressed="${cur && d.id === cur.id}">${esc(label(d))}</button>`).join('');
  }
  elBrands.addEventListener('click', e => { const b = e.target.closest('button[data-b]'); if (!b) return; brand = b.dataset.b; chips(); });
  elModels.addEventListener('click', e => { const b = e.target.closest('button[data-id]'); if (b) show(b.dataset.id, true); });

  function dispose() {
    if (!ctl) return;
    try { const v = ctl.view, i = WK3.viewers.indexOf(v); if (i >= 0) WK3.viewers.splice(i, 1); v.renderer.dispose(); v.renderer.forceContextLoss && v.renderer.forceContextLoss(); } catch (e) {}
    stage.querySelectorAll('canvas.gl, .tag3d').forEach(n => n.remove()); stage.classList.remove('stage-tall'); ctl = null;
  }

  function infoHTML(d) {
    const t = T[d.id], fam = d.family ? byId.get(d.family) : null, ft = fam ? T[fam.id] : null, ev = d.ev;
    const sibs = fam ? models.filter(x => x.family === fam.id && x.id !== d.id) : [];
    return `<p class="eyebrow">${esc(d.maker)}</p><h3 class="ws-name">${esc(name(d))}</h3>
      ${t ? `<p>${esc(P(t.summary))}</p>${(t.points || []).length ? `<ul class="ws-points">${t.points.map(p => `<li>${esc(P(p))}</li>`).join('')}</ul>` : ''}` : `<p>${esc(P(d.desc))}</p><p class="muted">${esc(P(U.pending))}</p>`}
      ${fam ? `<div class="ws-fam"><p class="eyebrow">${esc(P(U.family))}: ${esc(name(fam))}</p>${ft ? `<p>${esc(P(ft.summary))}</p>` : ''}${sibs.length ? `<p>${esc(P(U.variants))}: ${sibs.map(s => `<a href="#${s.id}" data-id="${s.id}">${esc(name(s))}</a>`).join(' · ')}</p>` : ''}</div>` : ''}
      ${ev ? `<div class="ws-ev"><p class="eyebrow">${esc(P(U.evTitle))}</p><p><span class="evcode ev-${ev.ev}">${esc(ev.ev)}</span> ${esc(P(U['ev' + ev.ev]))}</p>
        ${ev.region && P(ev.region) ? `<p class="muted">${esc(P(U.scope))}: ${esc(P(ev.region))}</p>` : ''}
        ${(ev.src || []).length ? `<ul class="ws-src">${ev.src.map(k => { const x = D.sources[k] || {}; return `<li><a href="${esc(x.url || '#')}" rel="noopener">${esc(x.title || k)}</a>${x.publisher ? ` <span class="muted">· ${esc(x.publisher)}${x.year ? ', ' + esc(x.year) : ''}</span>` : ''}</li>`; }).join('')}</ul>` : ''}</div>` : ''}
      <p class="muted ws-note">${esc(P(U.model))}</p>`;
  }

  function show(id, user) {
    const d = byId.get(id); if (!d || !DEV3D.has(id)) return;
    cur = d; dispose(); chips();
    info.innerHTML = infoHTML(d);
    pinfo.innerHTML = `<p class="muted">${esc(P(U.partHint))}</p>`;
    try {
      ctl = DEV3D.mount(stage, id, (key, i) => {
        plist.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-pressed', k === i));
        pinfo.innerHTML = key ? `<h4>${i + 1}. ${esc(DEV3D.part(key, 0))}</h4><p>${esc(DEV3D.part(key, 1))}</p>` : `<p class="muted">${esc(P(U.partHint))}</p>`;
      });
    } catch (e) { console.error(e); ctl = null; }
    if (!ctl) { const f = document.createElement('div'); f.className = 'stage-fail'; f.textContent = P(U.fail); stage.appendChild(f); plist.innerHTML = ''; return; }
    plist.innerHTML = ctl.parts.map((p, i) => `<button type="button" data-i="${i}" aria-pressed="false"><b>${i + 1}</b> ${esc(DEV3D.part(p.key, 0))}</button>`).join('');
    if (user) history.replaceState(null, '', '#' + id);
    document.title = `${name(d)} · ${document.querySelector('meta[property="og:site_name"]').content}`;
  }
  plist.addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b && ctl) ctl.select(+b.dataset.i); });
  info.addEventListener('click', e => { const a = e.target.closest('a[data-id]'); if (a) { e.preventDefault(); show(a.dataset.id, true); } });
  addEventListener('hashchange', () => { const id = location.hash.slice(1); if (id && id !== (cur && cur.id)) show(id); });

  chips();
  const start = location.hash.slice(1);
  show(byId.has(start) && DEV3D.has(start) ? start : (models.find(d => d.id === 'drager-atlan-a350-xl') || models[0]).id);
})();
