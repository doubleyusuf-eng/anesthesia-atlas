'use strict';
/* İleri Monitörizasyon Atlası · katalog sayfası: arama ve tür süzgeci, kategorilere göre açılır kapanır liste
   Aynı anda tek kategori açık kalır. Açık kategori oturum boyunca hatırlanır; cihaz sayfasından dönünce aynı yer açılır. */
(() => {
  const OPEN_KEY = 'ica-open-cat';
  const readOpen = () => { try { return sessionStorage.getItem(OPEN_KEY); } catch (e) { return null; } };
  const saveOpen = v => { try { v ? sessionStorage.setItem(OPEN_KEY, v) : sessionStorage.removeItem(OPEN_KEY); } catch (e) {} };
  const state = {q: '', kind: 'all', only3d: false, open: readOpen()};
  const results = $('#results'), count = $('#count');

  /* İş istasyonları bölümü Anestezi Makinesi Atlası'na taşındı: bağlantı sayfa diline göre */
  const wsl = $('#wsMovedLink'); if (wsl) wsl.href = 'https://atlas.anesthesiabriefs.com/anesthesia-machine/' + (ICA.lang === 'tr' ? '' : ICA.lang + '/') + 'istasyonlar.html';
  /* Üst bilgiler */
  const n3d = DB.devices.filter(DB.has3D).length;
  $('#facts').innerHTML = [
    ICA.fill(ICA.t('hero.f.devices'), {n: `<b>${DB.devices.length}</b>`}),
    ICA.fill(ICA.t('hero.f.cats'), {n: `<b>${DB.cats.length}</b>`}),
    ICA.t('hero.f.langs'),
    ICA.fill(ICA.t('hero.f.3d'), {n: `<b>${n3d}</b>`})
  ].map(s => `<li>${s}</li>`).join('');
  mountStage($('#heroStage'), el => ICA3D.mountShowcase(el, 'forehead-eeg'));

  /* 3B sahne listesi: her uygulama bölgesi, kapsadığı cihaz sayısı ve ilk cihazın sahnesine bağlantı */
  if (typeof ICA3D !== 'undefined' && ICA3D) {
    const html = ICA3D.keys().map(k => {
      const list = DB.devices.filter(d => d.placement === k); if (!list.length) return '';
      return `<a class="scene-card" href="${DB.url(list[0].id)}#uygulama"><b>${esc(ICA.t('pl.' + k))}</b><span>${esc(list.map(DB.name).slice(0, 4).join(' · '))}${list.length > 4 ? ' …' : ''}</span><em>${esc(ICA.fill(ICA.t('cat.count'), {n: list.length}))}</em></a>`;
    }).join('');
    $('#scenes').innerHTML = html;
  }

  /* Tür seçici: yalnızca kullanılan türler */
  const usedKinds = Object.keys(DB.kinds).filter(k => DB.devices.some(d => d.kind === k));
  $('#kind').innerHTML = `<option value="all">${esc(ICA.t('cat.kindAll'))}</option>` + usedKinds.map(k => `<option value="${k}">${esc(ICA.pick(DB.kinds[k]))}</option>`).join('');

  /* Arama dizini: ad, üretici, ölçümler, açıklama ve kategori adları, üç dilde */
  const hay = new Map(DB.devices.map(d => {
    const parts = [d.id, d.maker, ...(d.measures || []), ...((window.ICA_ALIASES || {})[d.id] || []), ...ICA.LANGS.map(l => typeof d.name === 'object' ? d.name[l] : d.name), ICA.pick(d.desc), ICA.pick(DB.cat(d.cat).name)];
    return [d.id, ICA.fold(parts.filter(Boolean).join(' '))];
  }));
  const filtering = () => !!state.q || state.kind !== 'all' || state.only3d;

  function matches(d) {
    if (state.kind !== 'all' && d.kind !== state.kind) return false;
    if (state.only3d && !DB.has3D(d)) return false;
    if (state.q) return ICA.fold(state.q).split(/\s+/).filter(Boolean).every(w => hay.get(d.id).includes(w));
    return true;
  }

  function groupBody(c, items) {
    if (c.id !== 'other') return items.map(cardHTML).join('');
    return DB.areas.map(a => {
      const sub = items.filter(d => d.area === a.id);
      return sub.length ? `<p class="area">${esc(ICA.pick(a.name))}</p>` + sub.map(cardHTML).join('') : '';
    }).join('');
  }

  /* Kategori başlığında doğru yanıtlanan soru sayısı (ilerleme başladıysa) */
  function progBadge(items) {
    if (typeof PROG === 'undefined') return '';
    const c = PROG.counts(items.map(d => d.id)); if (!c.viewed) return '';
    return `<span class="badge prog${c.done === c.total ? ' full' : ''}" title="${esc(ICA.t('prog.title'))}">✓ ${c.done}/${c.total}</span>`;
  }

  function render() {
    const groups = DB.cats.map(c => ({c, items: DB.devices.filter(d => DB.inCat(d, c.id) && matches(d))})).filter(g => g.items.length);
    /* Süzgeç açıkken, açık kategoride eşleşme kalmadıysa eşleşen ilk kategoriyi aç */
    if (filtering() && groups.length && !groups.some(g => g.c.id === state.open)) state.open = groups[0].c.id;
    results.innerHTML = groups.map(({c, items}) => {
      const open = state.open === c.id, n3 = items.filter(DB.has3D).length;
      const preview = items.slice(0, 4).map(DB.name).join(' · ') + (items.length > 4 ? ' …' : '');
      return `<details class="group" name="ica-cats" data-cat="${c.id}"${open ? ' open' : ''}>
        <summary>
          <span class="n">${String(c.n).padStart(2, '0')}</span>
          <span class="g-title"><h3>${esc(ICA.pick(c.name))}</h3><span class="g-preview">${esc(preview)}</span></span>
          <span class="g-meta"><span class="badge">${esc(ICA.fill(ICA.t('cat.count'), {n: items.length}))}</span>${n3 ? `<span class="badge b3d">${esc(ICA.t('card.3d'))} · ${n3}</span>` : ''}${progBadge(items)}</span>
          <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </summary>
        <div class="grid">${open ? groupBody(c, items) : ''}</div>
      </details>`;
    }).join('') || `<p class="empty">${esc(ICA.t('cat.empty'))}</p>`;
    count.textContent = ICA.fill(ICA.t('cat.count'), {n: new Set(groups.flatMap(g => g.items.map(d => d.id))).size});
  }

  /* Açılan kategoriyi doldur, diğerlerini kapat; başlığı görünür alana getir */
  results.addEventListener('toggle', e => {
    const el = e.target; if (!el.matches || !el.matches('details.group')) return;
    const id = el.dataset.cat;
    if (el.open) {
      state.open = id; saveOpen(id);
      $$('details.group[open]', results).forEach(o => { if (o !== el) o.open = false; });
      const grid = $('.grid', el);
      if (!grid.innerHTML.trim()) { const c = DB.cat(id); grid.innerHTML = groupBody(c, DB.devices.filter(d => DB.inCat(d, id) && matches(d))); }
      if (userToggle) requestAnimationFrame(() => {
        const top = $('.toolbar').getBoundingClientRect().bottom + 8, r = el.getBoundingClientRect();
        if (r.top < top || r.top > innerHeight * .6) window.scrollBy({top: r.top - top, behavior: REDUCED_MOTION ? 'auto' : 'smooth'});
      });
    } else if (state.open === id) { state.open = null; saveOpen(null); }
    userToggle = false;
  }, true);
  /* Kaydırma yalnızca kullanıcı bir başlığa tıkladığında yapılır, arama sırasında değil */
  let userToggle = false;
  results.addEventListener('click', e => { if (e.target.closest('summary')) userToggle = true; });

  /* Ana sayfadaki "Kendini sına" özeti */
  function summary() {
    const host = $('#progSummary'); if (!host || typeof PROG === 'undefined') return;
    const c = PROG.counts(DB.devices.map(d => d.id)), w = PROG.wrong().length;
    host.innerHTML = `<p class="qt-num"><b>${c.done}</b> / ${c.total}</p><p class="muted">${esc(ICA.t('quiz.teaserDone'))}</p>
      <span class="bar"><span class="seen" style="width:${c.viewed / c.total * 100}%"></span><span class="ok" style="width:${c.done / c.total * 100}%"></span></span>
      <p class="qt-legend muted"><span class="lg seen"></span>${esc(ICA.fill(ICA.t('prog.viewed'), {n: c.viewed}))} <span class="lg ok"></span>${esc(ICA.fill(ICA.t('prog.done'), {n: c.done}))}</p>
      <p class="qmore"><a class="btn primary" href="${PROG.quizHref(c.done ? 'new' : '')}">${esc(ICA.t(c.done ? 'quiz.continue' : 'quiz.start'))}</a>${w ? ` <a class="btn" href="${PROG.quizHref('wrong')}">${esc(ICA.fill(ICA.t('prog.retry'), {n: w}))}</a>` : ''}</p>`;
  }
  summary();
  /* İlerleme değişince (başka sekme, geri dönüş) kartları ve özeti tazele */
  document.addEventListener('ica:progress', () => { summary(); render(); });
  $('#q').addEventListener('input', e => { state.q = e.target.value.trim(); render(); });
  $('#kind').addEventListener('change', e => { state.kind = e.target.value; render(); });
  $('#only3d').addEventListener('change', e => { state.only3d = e.target.checked; render(); });
  render();
})();
