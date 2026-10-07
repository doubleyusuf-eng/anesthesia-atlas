'use strict';
/* İleri Monitörizasyon Atlası · sayfalar arası ortak yardımcılar */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));

const DB = (() => {
  const devices = window.ICA_DEVICES || [], cats = window.ICA_CATEGORIES || [], areas = window.ICA_AREAS || [], kinds = window.ICA_KINDS || {};
  const byId = new Map(devices.map(d => [d.id, d]));
  const cat = id => cats.find(c => c.id === id);
  const area = id => areas.find(a => a.id === id);
  const name = d => ICA.pick(d.name);
  const inCat = (d, c) => d.cat === c || (d.also || []).includes(c);
  const has3D = d => !!(d.placement && typeof ICA3D !== "undefined" && ICA3D && ICA3D.ready(d.placement));
  const hasContent = d => !!(window.ICA_CONTENT_INDEX || []).includes(d.id);
  const url = id => 'cihaz.html?id=' + encodeURIComponent(id);
  return {devices, cats, areas, kinds, byId, cat, area, name, inCat, has3D, hasContent, url};
})();

function cardHTML(d) {
  const kind = ICA.pick(DB.kinds[d.kind]);
  const ms = (d.measures || []).slice(0, 4).map(m => `<span class="badge">${esc(m)}</span>`).join('');
  const b3d = DB.has3D(d) ? `<span class="badge b3d">${esc(ICA.t('card.3d'))}</span>` : '';
  const bm = typeof DEV3D !== 'undefined' && DEV3D.has(d.id) ? `<span class="badge b3d">${esc(ICA.t('card.model'))}</span>` : '';
  const wsr = ((window.ICA_WS || {}).bySite || {})[d.id];
  const bev = wsr ? `<span class="badge ev-${wsr.ev}" title="${esc(ICA.t('dev.ev.' + wsr.ev))}">${esc(ICA.t('card.ev.' + wsr.ev))}</span>` : '';
  const st = (window.ICA_CONTENT_STATUS || {})[d.id];
  const status = DB.hasContent(d) ? `<span class="badge ${st === 'verified' ? 'ready' : 'draft'}">${esc(ICA.t(st === 'verified' ? 'card.verified' : 'card.ready'))}</span>` : '';
  const th = (window.ICA_CONTENT_THUMB || {})[d.id];
  /* İlerleme işareti: incelendi · soru denendi · doğru yanıtlandı */
  const ps = typeof PROG !== 'undefined' ? PROG.stage(d.id) : 0;
  const pl = ps ? ICA.t(['', 'prog.st1', 'prog.st2', 'prog.st3'][ps]) : '';
  const pm = ps ? `<span class="pmark p${ps}" title="${esc(pl)}" aria-label="${esc(pl)}">${ps === 3 ? '✓' : ''}</span>` : '';
  return `<a class="card${th ? ' has-thumb' : ''}" href="${DB.url(d.id)}">
    ${th ? `<span class="thumb"><img src="${ICA.root + th}" alt="" loading="lazy"></span>` : ''}${pm}
    <h4>${esc(DB.name(d))}</h4>
    ${d.maker ? `<span class="maker">${esc(d.maker)}</span>` : ''}
    <p>${esc(ICA.pick(d.desc))}</p>
    <span class="badges"><span class="badge">${esc(kind)}</span>${bm}${b3d}${bev}${status}${ms}</span>
  </a>`;
}

function mountStage(stage, mount) {
  if (typeof ICA3D === "undefined" || !ICA3D) { const d = document.createElement('div'); d.className = 'stage-fail'; d.textContent = ICA.t('stage.fail'); stage.appendChild(d); return null; }
  try { return mount(stage); } catch (e) { console.error(e); const d = document.createElement('div'); d.className = 'stage-fail'; d.textContent = ICA.t('stage.fail'); stage.appendChild(d); return null; }
}

document.addEventListener('DOMContentLoaded', () => ICA.applyStatic());

/* Anonymous visitor counters on the last line of the footer. Shares the atlas.anesthesiabriefs.com
   counter (siteStats/atlas) with the hub and the other atlases, so one browser counts once a day. */
(function setupVisitors() {
  const foot = document.querySelector('footer');
  if (!foot || document.getElementById('visitor-stats')) return;
  const box = document.createElement('div');
  box.className = 'visitor-stats'; box.id = 'visitor-stats'; box.dataset.site = 'atlas'; box.hidden = true;
  box.innerHTML = `<span data-k="active"><i class="live" aria-hidden="true"></i><b class="v">–</b> ${esc(ICA.t('foot.visActive'))}</span><span data-k="today">${esc(ICA.t('foot.visToday'))} <b class="v">–</b></span><span data-k="month">${esc(ICA.t('foot.visMonth'))} <b class="v">–</b></span>`;
  (foot.querySelector('.wrap:last-child') || foot).append(box);
  const sc = document.createElement('script'); sc.src = ICA.root + 'visitors.js'; sc.defer = true; document.body.append(sc);
})();
