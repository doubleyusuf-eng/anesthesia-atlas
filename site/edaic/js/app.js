/* EDAIC’e Hazırlık Atlası · yönlendirici. #/grup/sekme adreslerini data/sayfalar.js'teki sayfalara bağlar,
   [data-viz] alanlarına js/viz.js bileşenlerini kurar, kaynak işaretleri için açılır kutu gösterir. */
(function () {
  'use strict';
  const view = document.getElementById('view');
  const SITE = 'EDAIC’e Hazırlık Atlası';
  const VARSAYILAN = { sinav: 'sinav/genel', hazirlik: 'hazirlik/bilgi' };
  let temizle = [];

  function anahtar() {
    const h = decodeURIComponent(location.hash.replace(/^#\/?/, '')).replace(/\/+$/, '');
    if (!h) return 'giris';
    if (VARSAYILAN[h]) return VARSAYILAN[h];
    return SAYFALAR[h] ? h : 'giris';
  }

  function sekmeler(grup, aktif) {
    const G = GRUPLAR[grup];
    if (!G) return '';
    return `<nav class="subtabs" aria-label="${G.ad}">${G.sekmeler.map(([id, ad]) => `<a href="#/${grup}/${id}"${grup + '/' + id === aktif ? ' aria-current="page"' : ''}>${ad}</a>`).join('')}</nav>`;
  }

  function ciz() {
    temizle.forEach((f) => { try { f(); } catch (e) { /* bileşen zaten durmuş */ } });
    temizle = [];
    kapatPop();
    const k = anahtar(), S = SAYFALAR[k];
    const bas = S.grup
      ? `<header class="wrap page-head"><p class="eyebrow">${S.eyebrow || ''}</p><h1>${S.baslik}</h1>${S.lede ? `<p class="lede">${REF(S.lede)}</p>` : ''}${sekmeler(S.grup, k)}</header>`
      : '';
    view.innerHTML = `<div class="page">${bas}${REF(S.html)}</div>`;
    view.querySelectorAll('[data-viz]').forEach((el) => {
      const f = VIZ[el.dataset.viz];
      if (!f) { el.textContent = 'Bileşen bulunamadı: ' + el.dataset.viz; return; }
      try { temizle.push(f(el) || (() => {})); } catch (e) { console.error('[EDAIC] ' + el.dataset.viz, e); el.textContent = 'Bu bileşen yüklenemedi.'; }
    });
    document.querySelectorAll('.topnav a[data-tab]').forEach((a) => { if (a.dataset.tab === S.grup) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    document.title = k === 'giris' ? SITE : S.baslik + ' · ' + SITE;
    window.scrollTo(0, 0);
  }

  /* kaynak açılır kutusu */
  let pop = null;
  function kapatPop() { if (pop) { pop.remove(); pop = null; } }
  function acPop(btn) {
    kapatPop();
    const K = KAYNAKLAR[btn.dataset.k];
    if (!K) return;
    pop = document.createElement('div');
    pop.className = 'ref-pop'; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', 'Kaynak');
    pop.innerHTML = `<b>${btn.dataset.k}${btn.dataset.s ? ' · ' + btn.dataset.s : ''}</b><div>${K.ad}</div><div class="muted">${K.tur} · ${K.tarih}</div>${K.url ? `<a href="${K.url}" target="_blank" rel="noopener">Belgeyi aç ↗</a> · ` : ''}<a href="#/kaynaklar">Tüm kaynaklar</a>`;
    document.body.appendChild(pop);
    const r = btn.getBoundingClientRect(), w = pop.offsetWidth;
    const left = Math.max(12, Math.min(window.scrollX + r.left - 20, window.scrollX + document.documentElement.clientWidth - w - 12));
    pop.style.left = left + 'px';
    pop.style.top = window.scrollY + r.bottom + 8 + 'px';
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.ref');
    if (b) { e.stopPropagation(); if (pop && pop.dataset.for === b.dataset.k + b.dataset.s) { kapatPop(); return; } acPop(b); if (pop) pop.dataset.for = b.dataset.k + b.dataset.s; return; }
    if (pop && !e.target.closest('.ref-pop')) kapatPop();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') kapatPop(); });
  /* sayfa içi bağlantılar: adres çubuğundaki #/rota bozulmasın diye kaydırma düğmeyle yapılır */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-scroll]'); if (!b) return;
    const h = document.getElementById(b.dataset.scroll); if (h) h.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  window.addEventListener('resize', kapatPop);

  window.addEventListener('hashchange', ciz);
  ciz();
  window.EDAIC_APP = { ciz };
})();
