'use strict';
/* Mekanik Ventilasyon Atlası · V2 ayrıntı katmanları
   Mod ve klinik kartlarının katmanları ayrı sekmelerde okunur: kolay anlatım, ayrıntı, ayarlar, endikasyon/kanıt,
   başlangıç satırları, titrasyon/ayırma, hatalar, karşılaştırma, vaka.
   Kurallar:
   - Başlangıç tablosunda yaş, bağlam, ölçüm koşulu ve dayanak türü her zaman görünür; boş satır başka yerden doldurulmaz.
   - Kanıt türü (tasarım) ile sonuç etiketi ayrı gösterilir; üretici belgesi, derleme, uzlaşı, RCT, meta-analiz aynı görünmez.
   - Hasta sayısı yoksa sıfır yazılmaz. Vakalar kurgusal diye işaretlenir. */
const LAYERS = (() => {
  const T = k => MVA.t(k);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const cites = ids => ids && ids.length ? `<span class="cites">${ids.map(n => `<a class="cite" href="#/kaynaklar/${n}">${n}</a>`).join('')}</span>` : '';
  /* metin içinde zaten [n] atıfı varsa ayrıca ekleme */
  const withSrc = (html, ids) => html && html.includes('class="cite"') ? html : (html || '') + ' ' + cites(ids);
  /* Çeviride sınıf ve sözlük anahtarı olarak Türkçe asıl kullanılır (tools/i18n.cjs: _o) */
  const o = x => Object.assign({}, x, x && x._o);

  /* Kanıt düzeyi sınıfı (görsel ayrım için) */
  function tier(t) {
    const s = String(t || '').toLocaleLowerCase('tr');
    if (/meta|sistematik/.test(s)) return 'meta';
    if (/rct|randomize/.test(s)) return 'rct';
    if (/kılavuz/.test(s)) return 'guide';
    if (/uzlaşı/.test(s)) return 'cons';
    if (/gözlemsel/.test(s)) return 'obs';
    if (/üretici/.test(s)) return 'mfr';
    if (/derleme/.test(s)) return 'review';
    return 'other';
  }
  const evBadge = (t, k = t) => t ? `<span class="ev ev-${tier(k)}" title="${esc(T('ev.tier.' + tier(k)))}">${esc(t)}</span>` : `<span class="ev ev-other">${T('ev.unspecified')}</span>`;
  const grpBadge = (g, k = g) => g ? `<span class="agegrp ag-${esc(String(k).toLocaleLowerCase('tr').replace(/[^a-zçğıöşü]/g, ''))}">${esc(g)}</span>` : '';
  const legend = () => `<div class="ev-legend"><span class="muted small">${T('ev.legend')}</span>${['guide', 'meta', 'rct', 'cons', 'obs', 'review', 'mfr'].map(k => `<span class="ev ev-${k}">${T('ev.tier.' + k)}</span>`).join('')}</div>`;

  /* ---------- parçalar ---------- */
  const list = (items, cls = '') => items && items.length ? `<ul class="lx ${cls}">${items.map(x => `<li>${withSrc(x.html, x.src)}</li>`).join('')}</ul>` : `<p class="muted">${T('lx.none')}</p>`;

  function startTable(st, ctx) {
    const banner = `<div class="start-banner"><b>${T('st.none')}</b> ${st.note || ''}</div>`;
    if (!st.rows.length) return banner + `<div class="start-empty"><p><b>${T('st.empty.t')}</b></p><p>${T('st.empty.d')}</p>${ctx === 'mode' ? `<p>${T('st.empty.see')}</p>` : ''}</div>`;
    const H = ['st.age', 'st.ctx', 'st.par', 'st.val', 'st.cond', 'st.basis', 'st.note'].map(T);
    return banner + `<div class="tbl start-tbl"><table><thead><tr>${H.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${st.rows.map(r => `<tr>
      <td data-h="${esc(H[0])}">${grpBadge(r.yas, o(r).yas)}</td><td data-h="${esc(H[1])}">${esc(r.baglam)}</td><td data-h="${esc(H[2])}"><b>${esc(r.par)}</b></td>
      <td data-h="${esc(H[3])}" class="sv"><b>${esc(r.deger)}</b> <span class="muted">${esc(r.birim)}</span></td><td data-h="${esc(H[4])}">${esc(r.kosul)}</td>
      <td data-h="${esc(H[5])}">${evBadge(r.dayanak, o(r).dayanak)}</td><td data-h="${esc(H[6])}">${withSrc(r.not, r.src)}</td></tr>`).join('')}</tbody></table></div>
      <p class="muted small">${T('st.foot')}</p>`;
  }

  function studies(arr) {
    if (!arr || !arr.length) return `<p class="muted">${T('lx.none')}</p>`;
    const L = window.MVA_STUDY_LABELS || {};
    return `<div class="studies">${arr.map(s => `<article class="study">
      <header><h4>${esc(s.ad)}</h4><span class="muted">${s.yil ?? T('src.noyear')}</span></header>
      <div class="badges">${evBadge(s.tasarim, o(s).tasarim)}${(L[o(s).ad] || []).map(l => `<span class="out out-${l}">${T('out.' + l)}</span>`).join('')}</div>
      <dl>
        ${s.populasyon ? `<dt>${T('stu.pop')}</dt><dd>${esc(s.populasyon)}</dd>` : ''}
        <dt>${T('stu.n')}</dt><dd>${s.n != null ? esc(s.n) : `<span class="muted">${T('stu.nNull')}</span>`}</dd>
        ${s.kars ? `<dt>${T('stu.cmp')}</dt><dd>${esc(s.kars)}</dd>` : ''}
        ${s.sonuc ? `<dt>${T('stu.out')}</dt><dd>${esc(s.sonuc)}</dd>` : ''}
        <dt>${T('stu.find')}</dt><dd>${withSrc(s.bulgu, s.src)}</dd>
        ${s.sinir ? `<dt>${T('stu.lim')}</dt><dd>${s.sinir}</dd>` : ''}
      </dl></article>`).join('')}</div>`;
  }

  /* ---------- mod katmanları ---------- */
  const MODE_TABS = ['easy', 'detail', 'settings', 'evidence', 'start', 'titr', 'errors', 'cmp', 'case', 'summary', 'src', 'q'];
  function modeTab(k, m, ctx) {
    const x = m.x || {};
    const h2 = t => `<h2 class="h-sm">${esc(t)}</h2>`;
    switch (k) {
      case 'easy': return h2(T('lx.easy')) + `<div class="prose-lg">${x.easy || ''}</div>`;
      case 'detail': return h2(T('lx.detail')) + `<div class="prose-md">${x.detail || ''}</div>`;
      case 'settings': return h2(T('lx.settings')) + `<p class="muted small">${T('lx.settingsNote')}</p><div class="set-cards">${(x.settings || []).map(a => `<article class="setc">
          <header><h4>${esc(a.ad)}</h4><span class="unit">${esc(a.birim)}</span></header>
          <p>${a.ne}</p>
          <div class="updown"><p><span class="arr up">↑</span> ${a.up}</p><p><span class="arr dn">↓</span> ${a.down}</p></div>
          <p class="careful"><b>${T('lx.careful')}</b> ${a.dikkat}</p></article>`).join('')}</div>`;
      case 'evidence': return h2(T('lx.ind')) + legend() + `<div class="ind-list">${(x.ind || []).map(e => `<article class="ind">
          <div class="badges">${grpBadge(e.grup, o(e).grup)}${evBadge(e.tur, o(e).tur)}</div>
          <h4>${esc(e.durum)}</h4><p>${withSrc(e.oneri, e.src)}</p>
          <p class="muted small"><b>${T('lx.strength')}</b> ${e.guc ? esc(e.guc) : T('lx.strengthNone')}</p></article>`).join('')}</div>`
          + `<h3 class="h-xs">${T('lx.avoid')}</h3>` + list(x.avoid, 'avoid')
          + `<h3 class="h-xs">${T('lx.studies')}</h3><p class="muted small">${T('lx.studiesNote')}</p>` + studies(x.studies);
      case 'start': return h2(T('lx.start')) + startTable(x.start || {rows: []}, 'mode');
      case 'titr': return h2(T('lx.titr')) + list(x.titr) + `<h3 class="h-xs">${T('lx.wean')}</h3>` + (x.wean ? `<p>${withSrc(x.wean.html, x.wean.src)}</p>` : `<p class="muted">${T('lx.none')}</p>`);
      case 'errors': return h2(T('lx.errors')) + list(x.errors, 'errs');
      case 'cmp': return h2(T('lx.cmp')) + (x.cmp || []).map(c => { const o = ctx.MODE.get(c.mod); return `<article class="cmpc"><h4>${esc(ctx.shortName(m))} ↔ <a href="#/mod/${c.mod}">${esc(o ? ctx.shortName(o) : c.mod)}</a></h4><ul>${c.farklar.map(f => `<li>${f}</li>`).join('')}</ul>${cites(c.src)}</article>`; }).join('');
      case 'case': return h2(T('lx.case')) + `<div class="fiction"><b>${T('lx.fiction')}</b> ${T('lx.fictionNote')}</div><div class="prose-md">${x.vaka ? x.vaka.html : ''}</div>`;
    }
    return '';
  }

  /* ---------- klinik katmanları ---------- */
  const DIS_TABS = ['frame', 'modes', 'start', 'goals', 'titr', 'rescue', 'wean', 'studies', 'summary', 'src'];
  function disTab(k, d, ctx) {
    const x = d.x || d;
    const h2 = t => `<h2 class="h-sm">${esc(t)}</h2>`;
    switch (k) {
      case 'frame': return h2(T('dx.frame')) + `<div class="prose-md">${x.frame || ''}</div>`;
      case 'modes': return h2(T('dx.modes')) + `<div class="dmodes">${x.modes.map(h => { const o = ctx.MODE.get(h.mod); return `<a class="dmode" href="#/mod/${h.mod}"><b>${esc(o ? ctx.shortName(o) : h.mod)}</b><span>${h.html}</span></a>`; }).join('')}</div>`;
      case 'start': return h2(T('lx.start')) + startTable(x.start, 'dis');
      case 'goals': return h2(T('dx.goals')) + `<p class="muted small">${T('dx.goalsNote')}</p>` + list(x.goals);
      case 'titr': return h2(T('dx.titr')) + list(x.titr);
      case 'rescue': return h2(T('dx.rescue')) + list(x.rescue);
      case 'wean': return h2(T('lx.wean')) + (x.wean ? `<p>${withSrc(x.wean.html, x.wean.src)}</p>` : `<p class="muted">${T('lx.none')}</p>`);
      case 'studies': return h2(T('lx.studies')) + legend() + studies(x.studies);
    }
    return '';
  }

  return {MODE_TABS, DIS_TABS, modeTab, disTab, startTable, studies, evBadge, grpBadge, tier, cites};
})();
