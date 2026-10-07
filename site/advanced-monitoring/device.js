'use strict';
/* İleri Monitörizasyon Atlası · cihaz sayfası
   Kayıt bilgisi data/devices-*.js'ten gelir. Ayrıntılı içerik varsa content/<id>.js dosyasından yüklenir
   (window.ICA_CONTENT[id], tools/import-content.cjs ile üretilir); yoksa bölümler "hazırlanıyor" olarak gösterilir.
   İçerik taslak durumundadır: [DOĞRULANMALI] işaretleri, içerik durumu ve kanıt boşlukları görünür tutulur. */
(() => {
  const main = $('#device');
  const id = new URLSearchParams(location.search).get('id');
  const d = DB.byId.get(id);
  if (!d) { main.innerHTML = `<div class="wrap"><p class="crumb"><a href="index.html#katalog">${esc(ICA.t('dev.back'))}</a></p><p class="empty">${esc(ICA.t('dev.notfound'))}</p></div>`; return; }
  document.title = `${DB.name(d)} · ${ICA.t('site.name')}`;

  /* Sınırlı Markdown: paragraf, madde ve numaralı liste, tablo, **kalın**, *italik*, bağlantı,
     kaynak numaraları [n] → kaynakça bağlantısı, [DOĞRULANMALI] → uyarı rozeti */
  let refNums = new Set();
  function inline(s) {
    return esc(s)
      .replace(/\*{0,2}\[DOĞRULANMALI\]\*{0,2}/g, `<span class="verify" title="${esc(ICA.t('dev.verifyTitle'))}">${esc(ICA.t('dev.verify'))}</span>`)
      .replace(/\[(\d+(?:\s*[,–-]\s*\d+)*)\]/g, (m, list) => `<sup class="cite">[${list.split(/\s*,\s*/).map(n => refNums.has(+n) ? `<a href="#ref-${+n}">${n}</a>` : n).join(', ')}]</sup>`)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, '$1<em>$2</em>')
      .replace(/(https?:\/\/[^\s<)]+)/g, '<a href="$1" rel="noopener">$1</a>');
  }
  function md(src) {
    const out = [], lines = String(src || '').replace(/\r/g, '').split('\n');
    let i = 0;
    const take = re => { const g = []; while (i < lines.length && re.test(lines[i])) g.push(lines[i++]); return g; };
    while (i < lines.length) {
      const l = lines[i];
      if (!l.trim()) { i++; continue; }
      if (/^\s*\|/.test(l)) {
        const rows = take(/^\s*\|/).filter(r => !/^\s*\|?\s*:?-{2,}/.test(r)).map(r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
        const [head, ...body] = rows;
        out.push(`<div class="ptable-wrap"><table class="ptable"><thead><tr>${head.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${body.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      } else if (/^\s*[-*•]\s+/.test(l)) out.push('<ul>' + take(/^\s*[-*•]\s+/).map(x => `<li>${inline(x.replace(/^\s*[-*•]\s+/, ''))}</li>`).join('') + '</ul>');
      else if (/^\s*\d+[.)]\s+/.test(l)) out.push('<ol>' + take(/^\s*\d+[.)]\s+/).map(x => `<li>${inline(x.replace(/^\s*\d+[.)]\s+/, ''))}</li>`).join('') + '</ol>');
      else { const p = take(/^(?!\s*$)(?!\s*\|)(?!\s*[-*•]\s)(?!\s*\d+[.)]\s)/); out.push(/^\s*(\[\d+\]\s*)+$/.test(p.join(' ')) ? `<p class="cites">${inline(p.join(' '))}</p>` : `<p>${inline(p.join(' '))}</p>`); }
    }
    return out.join('');
  }
  /* Uygulama şemasının bu dildeki sürümü (tools/svg-i18n.cjs ile üretilir: <kimlik>-sema-en.svg / -es.svg) */
  const semaSrc = im => im.kind === 'schematic' && ICA.lang !== 'tr' ? im.src.replace(/-sema\.svg$/, `-sema-${ICA.lang}.svg`) : im.src;
  const pending = (key = 'dev.pending') => `<p class="pending">${esc(ICA.t(key))}</p>`;
  const human = s => String(s || '').replace(/_/g, ' ');
  /* Dilden bağımsız kodların (sayısal referans türü, popülasyon) çevirisi; tanımsızsa okunur hale getirilmiş kod */
  const code = (pre, v) => { const k = pre + v, t = ICA.t(k); return t === k ? human(v) : t; };

  const SECTIONS = [
    {id: 'genel', key: 'overview'},
    {id: 'model', key: 'model'},
    {id: 'prensip', key: 'principle'},
    {id: 'uygulama', key: 'placement'},
    {id: 'kullanim', key: 'use'},
    {id: 'parametreler', key: 'params'},
    {id: 'degerlendirme', key: 'eval'},
    {id: 'sorunlar', key: 'trouble'},
    {id: 'ozel', key: 'special'},
    {id: 'roller', key: 'roles'},
    {id: 'sinav', key: 'quiz'},
    {id: 'gorseller', key: 'images'},
    {id: 'kaynaklar', key: 'refs'}
  ];

  function render(content) {
    const c = content || {}, S = c.sections || {};
    refNums = new Set((c.references || []).map(r => r.n));
    const cat = DB.cat(d.cat), kind = ICA.pick(DB.kinds[d.kind]);
    const siteName = d.placement ? ICA.t('pl.' + d.placement) : ICA.t('dev.none');
    const also = (d.also || []).map(x => ICA.pick(DB.cat(x).short)).join(', ');
    const measures = (d.measures || []).map(m => `<span class="badge">${esc(m)}</span>`).join('') || esc(ICA.t('dev.none'));
    const prose = key => S[key] ? `<div class="prose">${md(ICA.pick(S[key]))}</div>` : '';

    /* Parametre ayrıntıları: yorum, bağlam ve sayısal referansın türü (evrensel hedef değildir) */
    const paramDetails = (c.params || []).filter(p => p.interpretation || p.context).map(p => `
      <details class="pdet"><summary><b>${esc(ICA.pick(p.label))}</b>${ICA.pick(p.unit) ? ` <span class="muted">· ${esc(ICA.pick(p.unit))}</span>` : ''}</summary>
        <dl>
          ${p.meaning ? `<dt>${esc(ICA.t('dev.p.meaning'))}</dt><dd>${inline(ICA.pick(p.meaning))}</dd>` : ''}
          ${p.interpretation ? `<dt>${esc(ICA.t('dev.p.interp'))}</dt><dd>${inline(ICA.pick(p.interpretation))}</dd>` : ''}
          ${p.context ? `<dt>${esc(ICA.t('dev.p.context'))}</dt><dd>${inline(ICA.pick(p.context))}</dd>` : ''}
          ${p.numeric ? `<dt>${esc(ICA.t('dev.p.numeric'))}</dt><dd>${esc(code('dev.nt.', p.numeric.type))}${p.numeric.population ? ` · ${esc(code('dev.np.', p.numeric.population))}` : ''}</dd>` : ''}
        </dl></details>`).join('');

    const body = {
      overview: S.overview ? prose('overview') : `<div class="prose"><p>${esc(ICA.pick(d.desc))}</p></div>` + pending(),
      principle: prose('principle'), use: prose('use'), eval: prose('eval'), trouble: prose('trouble'), special: prose('special'), roles: prose('roles'),
      params: S.params ? prose('params') + (paramDetails ? `<h3 class="sub">${esc(ICA.t('dev.p.details'))}</h3><div class="pdets">${paramDetails}</div>` : '') : '',
      images: (c.images && c.images.length) || (c.external && c.external.length)
        ? `<div class="figs">${(c.images || []).map(im => `<figure class="fig${im.kind === 'photo' ? ' photo' : ''}"><img src="${esc(/^https?:/.test(im.src) ? im.src : ICA.root + semaSrc(im))}" alt="${esc(ICA.pick(im.alt))}" loading="lazy"><figcaption><span class="badge">${esc(ICA.t(im.kind === 'photo' ? 'dev.img.maker' : 'dev.img.schematic'))}</span> ${esc(ICA.pick(im.caption))}${im.kind === 'photo' ? `<br><span class="credit">© ${esc(im.credit || '')}${im.sourceUrl ? ` · <a href="${esc(im.sourceUrl)}" rel="noopener">${esc(ICA.t('dev.img.source'))}</a>` : ''}</span>` : ''}</figcaption></figure>`).join('')}</div>` +
          ((c.external || []).length ? `<p class="ext-note">${esc(ICA.t('dev.img.externalNote'))}</p><ul class="ext">${c.external.map(x => `<li><a href="${esc(x.url)}" rel="noopener">${esc(x.source || new URL(x.url).hostname)}</a></li>`).join('')}</ul>` : '') +
          ((c.images || []).some(i => i.kind === 'photo') ? '' : pending(c.photoWithheld ? 'dev.img.withheld' : 'dev.imgPending'))
        : pending(c.photoWithheld ? 'dev.img.withheld' : 'dev.imgPending'),
      refs: c.references && c.references.length ? `<ol class="refs">${c.references.map(r => `<li id="ref-${r.n}" value="${r.n}">${esc(r.title)}${r.publisher ? `. <span class="muted">${esc(r.publisher)}</span>` : ''}, ${r.year ? esc(r.year) : `<span class="muted">${esc(ICA.t('dev.ref.noYear'))}</span>`}.${r.doi ? ` <a href="https://doi.org/${esc(r.doi)}" rel="noopener">doi:${esc(r.doi)}</a>` : r.url ? ` <a href="${esc(r.url)}" rel="noopener">${esc(new URL(r.url).hostname.replace(/^www\./, ''))}</a>` : ''}</li>`).join('')}</ol>` : ''
    };

    /* 3B cihaz modeli: döndürülebilir model, numaralı parçalar ve parça açıklamaları */
    const hasModel = typeof DEV3D !== 'undefined' && DEV3D && DEV3D.has(d.id);
    const variantsWithModel = () => typeof DEV3D === 'undefined' ? [] : DB.devices.filter(x => x.family === d.id && DEV3D.has(x.id));
    body.model = hasModel ? `<div class="workbench">
        <div class="stage" id="modelStage"><div class="pins"></div>
          <div class="stage-tools">
            <button type="button" data-act="in" aria-label="${esc(ICA.t('stage.in'))}" title="${esc(ICA.t('stage.in'))}">+</button>
            <button type="button" data-act="out" aria-label="${esc(ICA.t('stage.out'))}" title="${esc(ICA.t('stage.out'))}">−</button>
            <button type="button" data-act="reset" aria-label="${esc(ICA.t('stage.reset'))}" title="${esc(ICA.t('stage.reset'))}">⟲</button>
          </div>
          <span class="stage-hint">${esc(ICA.t('stage.hint'))}</span>
        </div>
        <aside class="steps parts-panel" aria-live="polite">
          <p class="eyebrow">${esc(ICA.t('dev.parts'))}</p>
          <div class="part-list" id="partList"></div>
          <div class="part-info" id="partInfo"><p class="muted">${esc(ICA.t('dev.partHint'))}</p></div>
          <p class="proto">${esc(ICA.t('dev.modelNote'))}</p>
        </aside>
      </div>` : variantsWithModel().length ? `<p class="pending">${esc(ICA.t('dev.familyModels'))} ${variantsWithModel().map(v => `<a href="${DB.url(v.id)}#model">${esc(DB.name(v))}</a>`).join(' · ')}</p>` : `<p class="pending">${esc(ICA.t('dev.modelPending'))}</p>`;
    /* Kendini sına: cihaz başına bir soru (data/quiz-*.js) */
    body.quiz = `<div class="quiz-host" id="quizHost"></div>`;
    const has3D = d.placement && DB.has3D(d);
    const animNote = c.animation && !c.animation.ready ? ` ${ICA.t('dev.anim.notReady')}` : '';
    body.placement = (has3D
      ? `<div class="workbench">
          <div class="stage" id="placeStage"><div class="pins"></div>
            <div class="stage-tools">
              <button type="button" data-act="in" aria-label="${esc(ICA.t('stage.in'))}" title="${esc(ICA.t('stage.in'))}">+</button>
              <button type="button" data-act="out" aria-label="${esc(ICA.t('stage.out'))}" title="${esc(ICA.t('stage.out'))}">−</button>
              <button type="button" data-act="reset" aria-label="${esc(ICA.t('stage.reset'))}" title="${esc(ICA.t('stage.reset'))}">⟲</button>
            </div>
            <span class="stage-hint">${esc(ICA.t('stage.hint'))}</span>
          </div>
          <aside class="steps" aria-live="polite">
            <p class="eyebrow" id="stepNo"></p>
            <h3 id="stepTitle"></h3>
            <p id="stepText"></p>
            <div class="dots" id="stepDots"></div>
            <div class="nav-btns"><button type="button" class="btn" id="stepPrev"></button><button type="button" class="btn primary" id="stepNext"></button></div>
            <p class="proto">${esc(ICA.t('dev.proto') + animNote)}</p>
          </aside>
        </div>`
      : `<p class="pending">${esc(d.placement ? ICA.fill(ICA.t('dev.placePending'), {site: siteName}) : ICA.t('dev.placeNone'))}</p>`) +
      (S.placement ? `<h3 class="sub">${esc(ICA.t('dev.placeText'))}</h3>${prose('placement')}` : '');

    /* İçerik durumu: kaynaklarla doğrulandı ve gözden geçirme ayı. Ayrıntılı denetim alanları (origin.unverified,
       gaps) içerik dosyalarında kalır, sayfada gösterilmez; genel kılavuz uyarısı alt bilgidedir. */
    const O = c.origin;
    const reviewed = O && O.reviewed ? new Date(O.reviewed + 'T12:00:00').toLocaleDateString(ICA.locale, {month: 'long', year: 'numeric'}) : '';
    const status = O ? `<div class="wrap"><div class="status done">
        <p><span class="okb">✓ ${esc(ICA.t('dev.st.verified'))}</span>${reviewed ? ` · <span class="muted">${esc(reviewed)}</span>` : ''}</p>
        ${(c.langs || []).includes(ICA.lang) ? '' : `<p class="muted">${esc(ICA.t('dev.trOnly'))}</p>`}
      </div></div>` : '';

    /* İş istasyonu kayıtları: kullanım kanıtı (K/P/S), kapsam, kaynaklar ve 3B model durumu (data/ws-registry.js) */
    const W = (window.ICA_WS || {}).bySite || {}, ws = W[d.id];
    const fam = d.family ? DB.byId.get(d.family) : null, variants = DB.devices.filter(x => x.family === d.id);
    const famLinks = (fam ? `<p class="fam">${esc(ICA.t('dev.family'))}: <a href="${DB.url(fam.id)}">${esc(DB.name(fam))}</a></p>` : '') +
      (variants.length ? `<p class="fam">${esc(ICA.t('dev.variants'))}: ${variants.map(v => `<a href="${DB.url(v.id)}">${esc(DB.name(v))}</a>`).join(' · ')}</p>` : '');
    const evBox = ws ? `<div class="wrap"><div class="evbox">
        <p class="eyebrow">${esc(ICA.t('dev.ev.title'))}</p>
        <p><span class="evcode ev-${ws.ev}">${esc(ws.ev)}</span> ${esc(ICA.t('dev.ev.' + ws.ev))}</p>
        ${ws.region && ICA.pick(ws.region) ? `<p class="muted">${esc(ICA.t('dev.ev.scope'))}: ${esc(ICA.pick(ws.region))}</p>` : ''}
        <p class="muted">${esc(ICA.t(ws.nVerified ? 'dev.ev.modelPart' : 'dev.ev.model'))}</p>
        ${ws.src.length ? `<ul class="evsrc">${ws.src.map(k => { const x = (window.ICA_WS.sources || {})[k] || {}; return `<li><b>[${esc(k)}]</b> <a href="${esc(x.url || '#')}" rel="noopener">${esc(x.title || k)}</a>${x.publisher ? ` · <span class="muted">${esc(x.publisher)}${x.year ? ', ' + esc(x.year) : ''}</span>` : ''}</li>`; }).join('')}</ul>` : ''}
        ${(ws.docs || []).length ? `<details class="evdocs"><summary>${esc(ICA.fill(ICA.t('dev.ev.docs'), {n: ws.docs.length}))}</summary><ul class="evsrc">${ws.docs.map(u => `<li><a href="${esc(u)}" rel="noopener">${esc(u.replace(/^https?:\/\/(www\.)?/, '').slice(0, 90))}</a></li>`).join('')}</ul></details>` : ''}
        <p class="muted small">${esc(ICA.t('dev.ev.note'))}</p>${famLinks}
      </div></div>` : (famLinks ? `<div class="wrap"><div class="evbox">${famLinks}</div></div>` : '');

    main.innerHTML = `
      <div class="wrap">
        <p class="crumb"><a href="index.html#katalog">${esc(ICA.t('dev.back'))}</a></p>
        <div class="dev-head">
          <div>
            <p class="eyebrow">${String(cat.n).padStart(2, '0')} · ${esc(ICA.pick(cat.name))}</p>
            <h1>${esc(DB.name(d))}</h1>
            ${d.maker ? `<p class="maker">${esc(d.maker)}</p>` : ''}
            <p class="lede">${esc(ICA.pick(d.desc))}</p>
            ${d.note ? `<p class="note">${esc(ICA.pick(d.note))}</p>` : ''}
          </div>
          <div class="facts-card"><dl>
            <div><dt>${esc(ICA.t('dev.kind'))}</dt><dd>${esc(kind)}</dd></div>
            <div><dt>${esc(ICA.t('dev.cat'))}</dt><dd>${esc(ICA.pick(cat.short))}${also ? `<br><span class="muted">${esc(ICA.fill(ICA.t('card.also'), {c: also}))}</span>` : ''}</dd></div>
            ${d.maker ? `<div><dt>${esc(ICA.t('dev.maker'))}</dt><dd>${esc(d.maker)}</dd></div>` : ''}
            <div><dt>${esc(ICA.t('dev.measures'))}</dt><dd>${measures}</dd></div>
            <div><dt>${esc(ICA.t('dev.site'))}</dt><dd>${esc(siteName)}</dd></div>
          </dl></div>
        </div>
      </div>
      <nav class="toc" aria-label="${esc(ICA.t('dev.toc'))}"><div class="wrap">${SECTIONS.map(s => `<a href="#${s.id}">${esc(ICA.t('dev.sec.' + s.key))}</a>`).join('')}</div></nav>
      ${status}
      ${evBox}
      ${['ultrasound', 'tee', 'tte'].includes(d.id) ? `<div class="wrap"><p class="moved-note">${esc(ICA.t('dev.usPage'))} <a href="ultrason.html">${esc(ICA.t('dev.usPageLink'))}</a></p></div>` : ''}
      ${SECTIONS.map(s => `<section class="sec" id="${s.id}"><div class="wrap"><h2>${esc(ICA.t('dev.sec.' + s.key))}</h2>${body[s.key] || pending()}</div></section>`).join('')}
      <section class="related"><div class="wrap"><h2>${esc(ICA.t('dev.related'))}</h2><div class="grid">${
        DB.devices.filter(x => x.id !== d.id && DB.inCat(x, d.cat)).slice(0, 8).map(cardHTML).join('')}</div></div></section>`;

    if (typeof QUIZ !== 'undefined') QUIZ.mountDevice($('#quizHost'), d.id);
    if (typeof PROG !== 'undefined') PROG.seen(d.id);
    if (hasModel) setupModel();
    if (has3D) setupSteps();
    if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) requestAnimationFrame(() => t.scrollIntoView()); }
    spy();
  }

  function setupModel() {
    const list = $('#partList'), info = $('#partInfo');
    const show = (key, i) => {
      $$('#partList button').forEach((b, k) => b.setAttribute('aria-pressed', k === i));
      info.innerHTML = key ? `<h3>${i + 1}. ${esc(DEV3D.part(key, 0))}</h3><p>${esc(DEV3D.part(key, 1))}</p>` : `<p class="muted">${esc(ICA.t('dev.partHint'))}</p>`;
    };
    const ctl = mountStage($('#modelStage'), el => DEV3D.mount(el, d.id, show));
    if (!ctl) return;
    list.innerHTML = ctl.parts.map((p, i) => `<button type="button" data-i="${i}" aria-pressed="false"><b>${i + 1}</b> ${esc(DEV3D.part(p.key, 0))}</button>`).join('');
    list.addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b) ctl.select(+b.dataset.i); });
  }

  function setupSteps() {
    const ctl = mountStage($('#placeStage'), el => ICA3D.mountPlacement(el, d.placement));
    if (!ctl) return;
    const n = ctl.count; let i = 0;
    const text = (k, f) => ICA.t(`pl.${ctl.id}.${k}.${f}`);
    $('#stepDots').innerHTML = Array.from({length: n}, (_, k) => `<button type="button" data-k="${k}" aria-label="${esc(ICA.fill(ICA.t('dev.step'), {i: k + 1, n}))}">${k + 1}</button>`).join('');
    function show(k) {
      i = clamp(k, 0, n - 1); ctl.go(i);
      $('#stepNo').textContent = ICA.fill(ICA.t('dev.step'), {i: i + 1, n});
      $('#stepTitle').textContent = text(i, 't'); $('#stepText').textContent = text(i, 'd');
      $$('#stepDots button').forEach((b, k) => { if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); b.classList.toggle('done', k < i); });
      $('#stepPrev').disabled = i === 0;
      $('#stepPrev').textContent = ICA.t('dev.prev');
      $('#stepNext').textContent = i === n - 1 ? ICA.t('dev.again') : ICA.t('dev.next');
    }
    $('#stepPrev').addEventListener('click', () => show(i - 1));
    $('#stepNext').addEventListener('click', () => show(i === n - 1 ? 0 : i + 1));
    $('#stepDots').addEventListener('click', e => { const b = e.target.closest('button[data-k]'); if (b) show(+b.dataset.k); });
    /* ?adim=N ile doğrudan bir adıma bağlantı verilebilir (1'den başlar) */
    show((parseInt(new URLSearchParams(location.search).get('adim'), 10) || 1) - 1);
  }

  /* İçindekiler çubuğunda görünen bölümü vurgula */
  function spy() {
    const links = new Map($$('.toc a').map(a => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { links.forEach(a => a.classList.remove('active')); links.get(e.target.id)?.classList.add('active'); } }), {rootMargin: '-45% 0px -50% 0px'});
    $$('.sec').forEach(s => io.observe(s));
  }

  /* İçerik dosyası yalnızca dizinde varsa yüklenir */
  if (DB.hasContent(d)) {
    const s = document.createElement('script'); s.src = ICA.root + 'content/' + d.id + '.js';
    s.onload = () => render((window.ICA_CONTENT || {})[d.id]); s.onerror = () => render(null);
    document.body.appendChild(s);
  } else render(null);
})();
