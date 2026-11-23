/* Fizyoloji Bölüm 62 · Tükürük, özofagus ve yutma · bileşenler (K1 s. 279–281).
   Şematik modeller; sayılar yalnız kitaptaki değerlere (25 mL, pH 2,5, 20–30 / 5–10 mmHg, 1–2 s) oturur.
   Tek dar yerleşim (viewBox 360 geniş): telefonda 1:1, masaüstünde en çok 560 px. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (x) => x * x * (3 - 2 * x);
  const fmt = (v, d = 0) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const setCap = (el, html) => { const c = el.closest('.viz').querySelector('.viz-cap'); if (c) c.innerHTML = REF(html); };
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const MARK = (id) => `<marker id="${id}" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" fill="context-stroke"/></marker>`;

  /* ============ 1 · Bileşenden işleve ============ */
  VIZ.f62_islev = (el) => {
    const BIL = [
      ['el', 'Elektrolitler (HCO₃⁻)', 'ok', 'asit'], ['musin', 'Müsin', 'accent', 'kay'], ['amilaz', 'α-Amilaz', 'accent', 'sin'],
      ['lipaz', 'Lingual lipaz', 'accent', 'sin'], ['hapto', 'Haptokorrin', 'accent', 'sin'], ['bakt', 'Bakterisidal maddeler', 'c-clin', 'anti'],
    ];
    const ISL = [['asit', 'Asit nötralizasyonu', 76, 34], ['kay', 'Kayganlaştırma', 118, 34], ['sin', 'Sindirim', 190, 58], ['anti', 'Antibakteriyel etki', 286, 34]];
    const CAP = {
      musin: '<b>Müsin → kayganlaştırma.</b> Tükürüğün kayganlaştırıcı özelliği asıl müsinden gelir; lokma yutulurken farinks ve özofagus mukozası korunur. Bir bileşene dokunun. [[K1 s. 279]]',
      el: '<b>HCO₃⁻ → asit nötralizasyonu.</b> Reflüyle özofagusa ya da kusmada ağza gelen mide asidini seyreltip nötralize eder; kusmadan hemen önce salgı artar ve diş minesini korur. Tükürük hipotoniktir; pH istirahatte 7,0, HCO₃⁻ artınca 8,0. [[K1 s. 279]]',
      amilaz: '<b>α-Amilaz → sindirim.</b> Pankreas amilazıyla aynı enzim; pH 7\'de en iyi çalışır, midede denatüre olmadan önce nişastanın %75\'ine kadarını parçalar. [[K1 s. 279]]',
      lipaz: '<b>Lingual lipaz → sindirim.</b> Trigliserit sindirimini başlatır; pankreas lipazı olgunlaşmamış yenidoğanda süt yağı için özellikle lingual lipaz önemlidir. [[K1 s. 279]]',
      hapto: '<b>Haptokorrin → sindirim.</b> B₁₂ vitaminine bağlanır ve onu midenin düşük pH\'sından korur. [[K1 s. 279]]',
      bakt: '<b>Tiyosiyanat, lizozim, laktoferrin, IgA → antibakteriyel?</b> Bakterisidal bileşenlere karşın insanda anlamlı bakteriyostatik etkiye kanıt azdır (kesikli çizgi). [[K1 s. 279]]',
      sin: '<b>Sindirim.</b> Üç bileşen: α-amilaz (nişasta), lingual lipaz (trigliserit), haptokorrin (B₁₂\'yi korur). [[K1 s. 279]]',
    };
    const FCAP = { asit: 'el', kay: 'musin', sin: 'sin', anti: 'bakt' };
    let sel = ['c', 'musin'];
    const yc = (i) => 76 + i * 42 + 17;
    const fy = (id, k) => { const f = ISL.find((x) => x[0] === id); return k == null ? f[2] + f[3] / 2 : f[2] + 10 + k * 19; };
    let nS = 0;
    const baglar = BIL.map((b, i) => { const sameF = BIL.filter((x) => x[3] === b[3]); const k = sameF.indexOf(b); const ty = b[3] === 'sin' ? fy('sin', k) : fy(b[3]); return { id: b[0], f: b[3], d: `M170 ${yc(i)} C205 ${yc(i)} 205 ${ty} 240 ${ty}` }; });
    el.innerHTML = `<svg class="f62-svg" viewBox="0 0 360 358" role="group" aria-label="Tükürük bileşenlerinden işlevlerine eşleştirme haritası">
      <rect x="10" y="10" width="316" height="18" rx="4" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1"/>
      <rect x="326" y="10" width="24" height="18" rx="4" fill="var(--warn)"/>
      <text class="f62-t" x="168" y="23" text-anchor="middle">%98 su</text>
      <text class="f62-s" x="338" y="43" text-anchor="middle">%2</text><text class="f62-s" x="318" y="43" text-anchor="end">diğer bileşenler (ölçeksiz büyütüldü)</text>
      <text class="f62-t" x="10" y="64">Bileşen</text><text class="f62-t" x="240" y="64">İşlev</text>
      <g class="f62-bag">${baglar.map((b) => `<path data-b="${b.id}" data-f="${b.f}" d="${b.d}" fill="none" stroke="var(--muted)" stroke-width="2"${b.id === 'bakt' ? ' stroke-dasharray="6 4"' : ''}/>`).join('')}</g>
      ${BIL.map((b, i) => `<g class="f62-kut" data-c="${b[0]}" role="button" tabindex="0" aria-pressed="false" aria-label="${b[1]}">
        <rect class="f62-kr" x="10" y="${76 + i * 42}" width="160" height="34" rx="8"/><rect x="10" y="${76 + i * 42}" width="6" height="34" rx="3" fill="var(--${b[2]})"/>
        <text class="f62-t" x="24" y="${76 + i * 42 + 21}">${b[1]}</text></g>`).join('')}
      ${ISL.map((f) => `<g class="f62-kut" data-f="${f[0]}" role="button" tabindex="0" aria-pressed="false" aria-label="${f[1]}">
        <rect class="f62-kr" x="240" y="${f[2]}" width="110" height="${f[3]}" rx="8"/>
        ${f[1].split(' ').length > 1 ? f[1].split(' ').map((w, k, a) => `<text class="f62-t" x="295" y="${f[2] + f[3] / 2 + (k - (a.length - 1) / 2) * 14 + 4}" text-anchor="middle">${w}</text>`).join('') : `<text class="f62-t" x="295" y="${f[2] + f[3] / 2 + 4}" text-anchor="middle">${f[1]}</text>`}</g>`).join('')}
      <g class="f62-s"><rect x="10" y="338" width="9" height="9" fill="var(--ok)"/><text x="23" y="347">elektrolit</text>
      <rect x="92" y="338" width="9" height="9" fill="var(--accent)"/><text x="105" y="347">protein ve enzim</text>
      <rect x="228" y="338" width="9" height="9" fill="var(--c-clin)"/><text x="241" y="347">bakterisidal</text></g></svg>`;
    const svg = el.querySelector('svg');
    const ciz = () => {
      const [tip, id] = sel;
      const aktifC = new Set(), aktifF = new Set();
      if (tip === 'c') { aktifC.add(id); aktifF.add(BIL.find((b) => b[0] === id)[3]); }
      else { aktifF.add(id); BIL.forEach((b) => { if (b[3] === id) aktifC.add(b[0]); }); }
      svg.querySelectorAll('[data-c]').forEach((g) => { const on = aktifC.has(g.dataset.c); g.classList.toggle('on', on); g.classList.toggle('sol', !on); g.setAttribute('aria-pressed', String(on)); });
      svg.querySelectorAll('g[data-f]').forEach((g) => { const on = aktifF.has(g.dataset.f); g.classList.toggle('on', on); g.classList.toggle('sol', !on); g.setAttribute('aria-pressed', String(on)); });
      svg.querySelectorAll('path[data-b]').forEach((p) => { const on = aktifC.has(p.dataset.b) && aktifF.has(p.dataset.f); p.classList.toggle('on', on); p.classList.toggle('sol', !on); if (on) p.parentNode.appendChild(p); });
      setCap(el, CAP[tip === 'c' ? id : (id === 'sin' ? 'sin' : FCAP[id])]);
    };
    const sec = (g) => { sel = g.dataset.c ? ['c', g.dataset.c] : ['f', g.dataset.f]; ciz(); };
    svg.querySelectorAll('g.f62-kut').forEach((g) => {
      g.addEventListener('click', () => sec(g)); g.addEventListener('mouseenter', () => sec(g));
      g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sec(g); } });
    });
    ciz();
    return () => {};
  };

  /* ============ 2 · Kanal: iyon değişimi ve akım hızı ============ */
  VIZ.f62_kanal = (el) => {
    const NA = 'var(--c-basic)', K = 'var(--c-clin)', CL = 'var(--warn)', HCO = 'var(--ok)';
    const TAB = { na: [20, 60], k: [45, 15], cl: [45, 20], hco: [15, 55] };
    let h = 15, aldo = false;
    el.innerHTML = `<svg class="f62-svg" viewBox="0 0 360 346" role="img" aria-label="Asinüste birincil salgı, kanalda Na⁺ ve Cl⁻ geri emilimi, K⁺ ve HCO₃⁻ salgısı; ağza ulaşan tükürüğün göreli iyon payları">
      <defs>${MARK('f62-ok')}<linearGradient id="f62-ton" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".55"/><stop offset="1" stop-color="var(--accent)" stop-opacity=".1"/></linearGradient></defs>
      <circle cx="110" cy="58" r="46" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="3 3"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => { const a = i * Math.PI / 3; return `<circle cx="${(110 + 26 * Math.cos(a)).toFixed(1)}" cy="${(58 + 26 * Math.sin(a)).toFixed(1)}" r="14" fill="var(--chip)" stroke="var(--line)" stroke-width="1.5"/>`; }).join('')}
      <circle cx="110" cy="58" r="9" fill="var(--accent-soft)"/>
      <path d="M150 42 L139 50" stroke="var(--muted)" stroke-width="1.2"/>
      <text class="f62-s" x="152" y="40">miyoepitelyal hücre</text>
      <text class="f62-t" x="168" y="66">Asinüs: birincil</text><text class="f62-t" x="168" y="80">salgı (≈ izotonik)</text>
      <rect x="92" y="104" width="36" height="14" fill="url(#f62-ton)"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="72" y="${118 + 30 * i}" width="20" height="28" rx="3" fill="var(--chip)" stroke="var(--line)"/><rect x="128" y="${118 + 30 * i}" width="20" height="28" rx="3" fill="var(--chip)" stroke="var(--line)"/>`).join('')}
      <rect x="92" y="118" width="36" height="180" fill="url(#f62-ton)"/>
      <text class="f62-s" x="8" y="127">geri emilim</text><text class="f62-s" x="158" y="127">salgı</text>
      <path d="M106 160 L34 160" stroke="${NA}" stroke-width="4" marker-end="url(#f62-ok)"/><text class="f62-t" x="8" y="153" fill="${NA}" style="fill:${NA}">Na⁺</text>
      <path d="M106 215 L34 215" stroke="${CL}" stroke-width="4" marker-end="url(#f62-ok)"/><text class="f62-t" x="8" y="208" style="fill:${CL}">Cl⁻</text>
      <path d="M192 160 L134 160" stroke="${K}" stroke-width="2" marker-end="url(#f62-ok)"/><text class="f62-t" x="160" y="153" style="fill:${K}">K⁺</text>
      <path d="M192 215 L134 215" stroke="${HCO}" stroke-width="2" marker-end="url(#f62-ok)"/><text class="f62-t" x="150" y="208" style="fill:${HCO}">HCO₃⁻</text>
      <g class="f62-part"></g>
      <text class="f62-s" x="8" y="318">Kanal: Na⁺, Cl⁻ geri emilir;</text><text class="f62-s" x="8" y="332">K⁺, HCO₃⁻ salgılanır</text>
      <text class="f62-t" x="110" y="311" text-anchor="middle" style="fill:var(--accent-ink)">hipotonik ↓</text>
      <text class="f62-s" x="168" y="102">izotonik</text>
      <g transform="translate(228,0)"><text class="f62-t" x="0" y="118">Ağza ulaşan</text><text class="f62-t" x="0" y="132">tükürük</text><text class="f62-s" x="0" y="146">göreli, birimsiz</text>
      <line x1="-2" y1="300" x2="124" y2="300" stroke="var(--muted)"/>
      ${[['na', NA, 'Na⁺'], ['k', K, 'K⁺'], ['cl', CL, 'Cl⁻'], ['hco', HCO, 'HCO₃⁻']].map(([id, c, l], i) => `<rect data-bar="${id}" x="${i * 31}" y="300" width="22" height="0" rx="2" style="fill:${c}"/><text class="f62-s" x="${i * 31 + 11}" y="314" text-anchor="middle">${l}</text>`).join('')}</g></svg>
      <div class="f62-ctl"><label class="f62-rng"><span>Akım hızı <b data-o="hv"></b></span><input type="range" min="0" max="100" step="1" value="15" aria-label="Tükürük akım hızı"></label>
      <button type="button" class="btn ghost f62-btn" aria-pressed="false">Aldosteron: kapalı</button></div>
      <p class="f62-dkn" data-o="dk"></p>
      <p class="f62-s f62-sabit">Plazmaya göre her hızda: Na⁺ düşük, K⁺ yüksek (hipotonik).</p>`;
    const svg = el.querySelector('svg'), part = svg.querySelector('.f62-part'), rng = el.querySelector('input'), btn = el.querySelector('button');
    const dk = el.querySelector('[data-o=dk]'), hv = el.querySelector('[data-o=hv]');
    const TIP = ['na', 'cl', 'k', 'hco', 'su', 'su', 'su'];
    const PAR = Array.from({ length: 16 }, (_, i) => ({ y: 118 + (i / 16) * 180, x: 98 + ((i * 37) % 24), tip: TIP[i % TIP.length] }));
    const RENK = { na: NA, cl: CL, k: K, hco: HCO, su: 'var(--accent)' };
    const pc = PAR.map((p) => mk('circle', { r: p.tip === 'su' ? 2.6 : 3.4 }, part));
    const deger = () => { const f = h / 100, o = {}; for (const k in TAB) o[k] = lerp(TAB[k][0], TAB[k][1], f); if (aldo) { o.na -= 12; o.k += 12; } return o; };
    const ciz = () => {
      const o = deger();
      for (const k in o) { const b = svg.querySelector(`[data-bar=${k}]`), hh = o[k] * 2.2; b.setAttribute('y', 300 - hh); b.setAttribute('height', hh); }
      hv.textContent = h < 34 ? 'düşük' : h < 67 ? 'orta' : 'yüksek';
      dk.textContent = h < 40 ? 'Baskın iyonlar: K⁺ ve Cl⁻ payı yüksek' : h >= 60 ? 'Baskın iyonlar: Na⁺ ve HCO₃⁻ yönünden zengin' : 'Baskın iyonlar: geçiş';
      let t = h < 34 ? '<b>Düşük akım.</b> Kanal Na⁺ ve Cl⁻\'ü geri emip K⁺ ve HCO₃⁻ salgılar; ağza ulaşan tükürükte K⁺ ve Cl⁻ payı yüksektir. Akım hızını artırın ya da aldosteronu açın. [[K1 s. 279]]'
        : h < 67 ? '<b>Orta akım.</b> Geri emilim salgıdan hızlı olduğu için tükürük kanal boyunca ilerledikçe hipotonikleşir; asinüsün birincil salgısı ise plazmaya yakındır. [[K1 s. 279]]'
        : '<b>Yüksek akım.</b> Tükürük Na⁺ ve HCO₃⁻ yönünden zenginleşir; HCO₃⁻ salgısı artınca pH 7,0\'dan 8,0\'a çıkar. [[K1 s. 279]]';
      if (aldo) t += ' <b>Aldosteron.</b> Böbrekteki gibi kanalda Na⁺ geri emilimini ve K⁺ salgısını artırır. [[K1 s. 279]]';
      setCap(el, t);
    };
    const parcik = () => pc.forEach((c, i) => {
      const p = PAR[i], f = (p.y - 118) / 180;
      let op = 1;
      if (p.tip === 'na' || p.tip === 'cl') op = lerp(1, 0.2, f); else if (p.tip === 'k' || p.tip === 'hco') op = lerp(0.35, 1, f); else op = 0.8;
      if (RM) { c.setAttribute('opacity', 0); return; }
      c.setAttribute('cx', p.x); c.setAttribute('cy', p.y.toFixed(1)); c.setAttribute('opacity', op.toFixed(2)); c.style.fill = RENK[p.tip];
    });
    rng.addEventListener('input', () => { h = +rng.value; ciz(); });
    btn.addEventListener('click', () => { aldo = !aldo; btn.setAttribute('aria-pressed', String(aldo)); btn.textContent = 'Aldosteron: ' + (aldo ? 'açık' : 'kapalı'); ciz(); });
    ciz(); parcik();
    if (RM) return () => {};
    return ticker(el, (dt) => { PAR.forEach((p) => { p.y += (14 + h * 0.9) * dt; if (p.y > 298) p.y = 118; }); parcik(); });
  };

  /* ============ 3 · Parasempatik yollar ve sempatik uyarı ============ */
  VIZ.f62_sinir = (el) => {
    const YOL = {
      par: { pre: 'M250 62 L226 108', post: 'M226 108 L212 128', gl: [226, 108], ad: 'Parotis' },
      sub: { pre: 'M285 62 L285 200 L172 230', post: 'M172 230 L134 222', gl: [172, 230], ad: 'Submandibular' },
      sl: { pre: 'M285 62 L285 200 L172 230', post: 'M172 230 Q128 242 96 208', gl: [172, 230], ad: 'Sublingual' },
    };
    const CAP = {
      par: '<b>Parasempatik · parotis.</b> Glossofaringeal sinir (IX); preganglionik lifler otik gangliyonda sinaps yapar. Bir bez ya da sempatik uyarı seçin. [[K1 s. 280]]',
      sub: '<b>Parasempatik · submandibular bez.</b> Fasiyal sinir (VII); preganglionik lifler submandibular gangliyonda sinaps yapar, postganglionik lifler lingual sinirle bezlere gider. Uyarı vazodilatasyon ve miyoepitel kasılmasıyla bol, seröz, elektrolitten zengin tükürük yaptırır. [[K1 s. 280]]',
      sl: '<b>Parasempatik · sublingual bez.</b> Submandibular bezle aynı yol: VII → submandibular gangliyon → lingual sinir. [[K1 s. 280]]',
      sym: '<b>Sempatik uyarı.</b> Asinüs damarlarında vazokonstriksiyon, miyoepitelde kasılma: önce kısa süre çoğunlukla müköz, amilazdan zengin bir salgı artışı, ardından salgıda azalma. [[K1 s. 280]]',
    };
    let mod = 'par', t = 0;
    el.innerHTML = `<div class="f62-seg">${segHtml('Bez ya da uyarı', 'm', [['par', 'Parotis'], ['sub', 'Submandibular'], ['sl', 'Sublingual'], ['sym', 'Sempatik uyarı']], 'par')}</div>
      <svg class="f62-svg" viewBox="0 0 360 492" role="img" aria-label="Baş haritasında parasempatik yollar ve salgı–zaman eğrisi">
      <path d="M72 120 C72 62 140 44 210 46 C272 48 304 84 304 134 C304 180 290 214 262 236 L258 292 L152 292 L150 250 C116 248 88 226 82 192 C78 170 72 142 72 120 Z" fill="none" stroke="var(--line)" stroke-width="2"/>
      <rect x="226" y="28" width="86" height="34" rx="6" fill="var(--chip)" stroke="var(--line)"/><text class="f62-t" x="269" y="49" text-anchor="middle">Beyin sapı</text>
      <ellipse class="f62-bez" data-g="par" cx="206" cy="152" rx="24" ry="34" fill="var(--chip)" stroke="var(--muted)" stroke-width="1.5"/>
      <ellipse class="f62-bez" data-g="sub" cx="120" cy="226" rx="26" ry="13" fill="var(--chip)" stroke="var(--muted)" stroke-width="1.5"/>
      <ellipse class="f62-bez" data-g="sl" cx="86" cy="200" rx="14" ry="9" fill="var(--chip)" stroke="var(--muted)" stroke-width="1.5"/>
      <text class="f62-s" x="206" y="195" text-anchor="middle">parotis</text><text class="f62-s" x="116" y="256" text-anchor="middle">submandibular</text><text class="f62-s" x="80" y="178" text-anchor="middle">sublingual</text>
      <g class="f62-yol"></g>
      <circle cx="226" cy="108" r="5" fill="var(--paper)" stroke="var(--ok)" stroke-width="2"/><circle cx="172" cy="230" r="5" fill="var(--paper)" stroke="var(--ok)" stroke-width="2"/>
      <text class="f62-s" x="196" y="100" text-anchor="end">otik gangliyon</text>
      <text class="f62-s" x="204" y="270">submandibular</text><text class="f62-s" x="204" y="283">gangliyon</text>
      <text class="f62-t" x="236" y="86" style="fill:var(--ok)">IX</text><text class="f62-t" x="292" y="130" style="fill:var(--ok)">VII</text>
      <text class="f62-s" x="136" y="206" transform="rotate(14 136 206)">lingual sinir</text>
      <text class="f62-s" x="12" y="300"><tspan>—— pregangliyonik</tspan></text><text class="f62-s" x="150" y="300" opacity=".7">— postgangliyonik</text>
      <g class="f62-symet" opacity="0"><text class="f62-s" x="8" y="22">sempatik lifler (yol bu</text><text class="f62-s" x="8" y="35">bölümde ayrıntılanmaz)</text></g>
      <g class="f62-dot"><circle r="6" style="fill:var(--ok)"/></g>
      <g class="f62-dam"></g>
      <text class="f62-t" x="12" y="330">Salgı</text>
      <line x1="40" y1="340" x2="40" y2="470" stroke="var(--muted)"/><line x1="40" y1="470" x2="344" y2="470" stroke="var(--muted)"/>
      <text class="f62-s" x="46" y="352">tükürük akımı</text><text class="f62-s" x="344" y="486" text-anchor="end">zaman →</text>
      <line x1="40" y1="430" x2="344" y2="430" stroke="var(--line)" stroke-dasharray="4 4"/><text class="f62-s" x="340" y="424" text-anchor="end">başlangıç düzeyi</text>
      <path class="f62-eg" fill="none" stroke-width="3.5" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="0"/>
      <g class="f62-etk" opacity="0"><text class="f62-s" x="112" y="360" style="fill:var(--c-clin)">kısa müköz, amilazdan zengin salgı</text><text class="f62-t" x="190" y="446" style="fill:var(--c-clin)">salgı azalır</text></g></svg>
      <p class="f62-dkn" data-o="dv"></p><p class="f62-dkn" data-o="tk"></p>`;
    const svg = el.querySelector('svg'), yolG = svg.querySelector('.f62-yol'), dot = svg.querySelector('.f62-dot'), eg = svg.querySelector('.f62-eg');
    const symet = svg.querySelector('.f62-symet'), etk = svg.querySelector('.f62-etk'), dam = svg.querySelector('.f62-dam');
    const pPre = mk('path', { fill: 'none', 'stroke-width': 4, 'stroke-linecap': 'round' }, yolG), pPost = mk('path', { fill: 'none', 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: '.7' }, yolG);
    const EG = { par: 'M40 430 L60 430 C70 430 70 350 90 350 L344 350', sym: 'M40 430 L60 430 C75 430 80 360 104 360 C130 360 130 456 170 456 L344 456' };
    const damC = Array.from({ length: 5 }, () => mk('circle', { r: 2.6, style: 'fill:var(--accent)' }, dam));
    let L1 = 0, L2 = 0, dur = 1.5;
    const kur = () => {
      const sym = mod === 'sym', y = YOL[sym ? 'par' : mod];
      svg.querySelectorAll('.f62-bez').forEach((b) => { const on = sym || b.dataset.g === mod; b.style.stroke = sym ? 'var(--c-clin)' : on ? 'var(--ok)' : 'var(--muted)'; b.setAttribute('stroke-width', on ? 3 : 1.5); b.setAttribute('opacity', on ? 1 : 0.6); });
      yolG.setAttribute('opacity', sym ? 0.15 : 1);
      pPre.setAttribute('d', y.pre); pPost.setAttribute('d', y.post);
      pPre.style.stroke = pPost.style.stroke = 'var(--ok)';
      L1 = pPre.getTotalLength(); L2 = pPost.getTotalLength();
      symet.setAttribute('opacity', sym ? 1 : 0);
      dot.setAttribute('opacity', sym || RM ? 0 : 1);
      eg.setAttribute('d', sym ? EG.sym : EG.par); eg.style.stroke = sym ? 'var(--c-clin)' : 'var(--ok)';
      etk.setAttribute('opacity', sym ? 1 : 0);
      el.querySelector('[data-o=dv]').textContent = sym ? 'Damarlar: vazokonstriksiyon · miyoepitel kasılır' : 'Damarlar: vazodilatasyon · miyoepitel kasılır';
      el.querySelector('[data-o=tk]').textContent = sym ? 'Tükürük: kısa süre müköz, amilazdan zengin; sonra azalır' : 'Tükürük: çoğunlukla seröz, elektrolitten zengin';
      setCap(el, CAP[mod]); basSec(el, 'm', mod); t = 0; ciz(0);
    };
    const ciz = (dt) => {
      t += dt;
      const sym = mod === 'sym';
      if (sym) { const p = RM ? 1 : clamp(t / 3, 0, 1); eg.setAttribute('stroke-dashoffset', 1 - p); }
      else { eg.setAttribute('stroke-dashoffset', 0); }
      if (!sym && !RM) {
        const f = (t % dur) / dur, d = f * (L1 + L2), pt = d < L1 ? pPre.getPointAtLength(d) : pPost.getPointAtLength(d - L1);
        dot.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
      }
      const g = YOL[sym ? 'par' : mod].gl;
      damC.forEach((c, i) => {
        if (RM || sym) { c.setAttribute('opacity', 0); return; }
        const f = ((t * 0.7 + i / 5) % 1), tgt = mod === 'par' ? [150, 170] : mod === 'sub' ? [104, 238] : [80, 214];
        const sx = mod === 'par' ? 196 : mod === 'sub' ? 112 : 84, sy = mod === 'par' ? 160 : mod === 'sub' ? 228 : 202;
        c.setAttribute('cx', lerp(sx, tgt[0] - (mod === 'par' ? 40 : 14), f).toFixed(1)); c.setAttribute('cy', lerp(sy, sy + (mod === 'par' ? 14 : -4), f).toFixed(1)); c.setAttribute('opacity', (1 - f).toFixed(2));
      });
    };
    el.querySelectorAll('[data-m]').forEach((b) => b.addEventListener('click', () => { mod = b.dataset.m; kur(); }));
    kur();
    if (RM) return () => {};
    return ticker(el, ciz);
  };

  /* ============ 4 · Lokmanın yolu, adım adım ============ */
  VIZ.f62_yutma = (el) => {
    const ST = [
      '<b>1 · Oral evre (istemli).</b> Dil lokmayı sert damağa iter; damaktan gelen duyu medullaya iletilir ve istemsiz evreleri başlatır (kitap glossofaringeal sinir der; aşağıdaki nota bakın). "İleri"ye basın. [[K1 s. 280]]',
      '<b>2 · Faringeal evre (istemsiz): nazofarinks.</b> Medulla yutma merkezi yumuşak damakla nazofarinksi kapatır. [[K1 s. 280]]',
      '<b>3 · Hava yolu kapanır.</b> Önce vokal kordlar (lateral krikoaritenoid, oblik ve transvers aritenoid kaslar), sonra ariepiglottik kıvrımlar (ariepiglottik kaslar) addükte edilir; bu kasların hepsi rekürren laringeal sinirle çalışır. Gerçek ve yalancı vokal kordlar larinksi kapatır. [[K1 s. 280]]',
      '<b>4 · Larinks yukarı ve öne, epiglot aşağı.</b> Digastrik ve stilohiyoid kaslar hiyoidi kaldırır; epiglot aşağı inerek lokmayı larinksten uzağa, arka farinkse yönlendirir. [[K1 s. 280]]',
      '<b>5 · Lokma özofagusa.</b> Süperior ve orta farinks konstriktörleri ardışık kasılır; normalde kapalı inferior konstriktör (krikofaringeus, üst özofagus sfinkteri) gevşer. Lokma geçene dek larinks kapalı kalır: solunum merkezi 1–2 s\'lik apne düzenler. [[K1 s. 280]]',
      '<b>6 · Özofageal evre (istemsiz).</b> Lokma özofagusa girince üst özofagus sfinkteri kapanır, LOS kısmen gevşer; larinks yeniden açılır ve soluk alınır. Devamı aşağıdaki bölümde. [[K1 s. 280]]',
    ];
    const BAS = ['Oral evre', 'Nazofarinks kapanır', 'Larinks girişi korunur', 'Hiyoid kalkar, epiglot iner', 'Konstriktörler iter, krikofaringeus gevşer', 'Özofageal evre başlar'];
    // adım başına hedef değerler: dil, damak, kord, hiyoid, epiglot, konstriktör(0..3), krikofaringeus açıklığı, lokma x,y
    const HD = [
      { dil: 1, dam: 0, kord: 0, hy: 0, ep: 0, kons: 0, cp: 0, bx: 128, by: 152 },
      { dil: 1, dam: 1, kord: 0, hy: 0, ep: 0, kons: 0, cp: 0, bx: 188, by: 160 },
      { dil: 1, dam: 1, kord: 1, hy: 0, ep: 0, kons: 0, cp: 0, bx: 196, by: 176 },
      { dil: 1, dam: 1, kord: 1, hy: 1, ep: 1, kons: 0.5, cp: 0, bx: 202, by: 196 },
      { dil: 1, dam: 1, kord: 1, hy: 1, ep: 1, kons: 2, cp: 1, bx: 202, by: 238 },
      { dil: 0, dam: 0, kord: 0, hy: 0, ep: 0, kons: 0, cp: 0, bx: 202, by: 292 },
    ];
    const KEY = Object.keys(HD[0]);
    let adim = 0, oyna = false, bek = 0;
    const cur = Object.assign({}, HD[0]);
    el.innerHTML = `<div class="f62-evre"><span class="f62-rozet" data-o="ev"></span><b data-o="bas"></b><span class="f62-sn" data-o="sn"></span></div>
      <svg class="f62-svg" viewBox="0 0 360 340" role="img" aria-label="Baş ve boynun sagital kesitinde yutmanın evreleri">
      <defs>${MARK('f62-yo')}</defs>
      <path d="M215 40 L215 330" stroke="var(--line)" stroke-width="3"/>
      <rect x="150" y="40" width="62" height="72" rx="6" fill="var(--chip)" opacity=".7"/><text class="f62-s" x="181" y="72" text-anchor="middle">nazo-</text><text class="f62-s" x="181" y="85" text-anchor="middle">farinks</text>
      <rect class="f62-nzk" x="150" y="40" width="62" height="72" rx="6" fill="none" stroke="var(--ok)" stroke-width="3" opacity="0"/>
      <path d="M30 116 L150 116" stroke="var(--muted)" stroke-width="6" stroke-linecap="round"/><text class="f62-s" x="30" y="134">sert damak</text>
      <path class="f62-dm" d="M150 116 L196 152" fill="none" stroke="var(--muted)" stroke-width="7" stroke-linecap="round"/>
      <path d="M224 104 L205 116" stroke="var(--muted)" stroke-width="1"/><text class="f62-s" x="226" y="104">yumuşak damak</text>
      <path class="f62-dil" d="M30 200 C40 160 100 152 140 168 C160 176 166 192 160 206 L30 218 Z" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="1.5"/>
      <text class="f62-s" x="52" y="204">dil</text>
      <g class="f62-tra"><path d="M154 232 L154 322" stroke="var(--muted)" stroke-width="2"/><path d="M184 232 L184 322" stroke="var(--muted)" stroke-width="2"/><text class="f62-s" x="148" y="322" text-anchor="end">trakea</text></g>
      <rect class="f62-lar" x="150" y="196" width="40" height="36" rx="6" fill="var(--chip)" stroke="var(--muted)" stroke-width="1.5"/>
      <path class="f62-kd" d="M158 214 L182 214" stroke="var(--ok)" stroke-width="3" opacity="0"/>
      <path class="f62-ep" d="M158 200 Q160 184 166 172" fill="none" stroke="var(--muted)" stroke-width="4" stroke-linecap="round"/>
      <ellipse class="f62-hy" cx="124" cy="228" rx="6" ry="9" fill="var(--paper)" stroke="var(--muted)" stroke-width="2"/>
      <path d="M96 252 L120 232" stroke="var(--muted)" stroke-width="1"/><text class="f62-s" x="12" y="262">hiyoid</text>
      <path d="M102 276 L160 204" stroke="var(--muted)" stroke-width="1"/><text class="f62-s" x="12" y="288">epiglot</text>
      <g class="f62-ince" opacity="0"><path d="M120 222 L60 196" stroke="var(--crit)" stroke-width="1.5"/><path d="M122 226 L50 214" stroke="var(--crit)" stroke-width="1.5"/><text class="f62-s" x="12" y="308">digastrik, stilohiyoid</text></g>
      <rect class="f62-k1" x="209" y="118" width="12" height="32" rx="3" fill="var(--chip)" stroke="var(--line)"/><rect class="f62-k2" x="209" y="152" width="12" height="32" rx="3" fill="var(--chip)" stroke="var(--line)"/>
      <rect class="f62-cp" x="209" y="186" width="12" height="30" rx="3" fill="var(--crit)" stroke="var(--crit)"/>
      <text class="f62-s" x="226" y="138">süperior</text><text class="f62-s" x="226" y="172">orta</text><text class="f62-s" x="226" y="200">inferior =</text><text class="f62-s" x="226" y="213">krikofaringeus</text>
      <path d="M190 226 L190 322" fill="none" stroke="var(--muted)" stroke-width="2"/><path d="M214 222 L214 322" fill="none" stroke="var(--muted)" stroke-width="2"/>
      <text class="f62-s" x="226" y="290">özofagus</text>
      <path class="f62-duyu" d="M90 112 L90 72" fill="none" stroke="var(--accent-ink)" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#f62-yo)" opacity="0"/>
      <text class="f62-duyuT" x="24" y="62" style="fill:var(--accent-ink);opacity:0" font-size="11">duyu → medulla</text>
      <ellipse class="f62-lok" cx="128" cy="152" rx="11" ry="8" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="2"/>
      <g class="f62-ins" opacity="0"><rect x="224" y="6" width="128" height="86" rx="8" fill="var(--paper)" stroke="var(--line)"/><path class="f62-v" d="" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
      <text class="f62-s" x="232" y="22">glottis (üstten)</text><text class="f62-s" x="232" y="72">rekürren</text><text class="f62-s" x="232" y="85">laringeal sinir</text></g>
      </svg>
      <div class="f62-apne" data-o="ap"><span data-o="apt"></span></div>
      <div class="f62-ctl f62-stp"><button type="button" class="btn ghost" data-a="geri">Geri</button><button type="button" class="btn" data-a="ileri">İleri</button><button type="button" class="btn ghost" data-a="oyna">Oynat</button><button type="button" class="btn ghost" data-a="basa">Baştan</button><span class="f62-sn" data-o="n"></span></div>`;
    const $ = (s) => el.querySelector(s);
    const q = { dil: $('.f62-dil'), dm: $('.f62-dm'), nzk: $('.f62-nzk'), kd: $('.f62-kd'), ep: $('.f62-ep'), hy: $('.f62-hy'), lar: $('.f62-lar'), tra: $('.f62-tra'), ince: $('.f62-ince'), k1: $('.f62-k1'), k2: $('.f62-k2'), cp: $('.f62-cp'), lok: $('.f62-lok'), ins: $('.f62-ins'), v: $('.f62-v'), duyu: $('.f62-duyu'), duyuT: $('.f62-duyuT') };
    const tekrar = $('[data-a=oyna]'); if (RM) tekrar.style.display = 'none';
    const poz = () => {
      const c = cur;
      q.dil.setAttribute('transform', `translate(${(c.dil * 6).toFixed(1)} ${(-c.dil * 12).toFixed(1)})`);
      q.dm.setAttribute('d', `M150 116 L${lerp(196, 208, c.dam).toFixed(1)} ${lerp(152, 114, c.dam).toFixed(1)}`);
      q.nzk.setAttribute('opacity', clamp(c.dam, 0, 1).toFixed(2));
      const hx = -c.hy * 4, hy = -c.hy * 15, tr = `translate(${hx} ${hy})`;
      q.hy.setAttribute('transform', tr); q.lar.setAttribute('transform', tr); q.kd.setAttribute('transform', tr); q.ep.setAttribute('transform', tr);
      q.tra.setAttribute('transform', `translate(0 ${(hy * 0.3).toFixed(1)})`);
      q.ep.setAttribute('d', `M158 200 Q${lerp(160, 176, c.ep).toFixed(1)} ${lerp(184, 190, c.ep).toFixed(1)} ${lerp(166, 190, c.ep).toFixed(1)} ${lerp(172, 196, c.ep).toFixed(1)}`);
      q.kd.setAttribute('opacity', clamp(c.kord, 0, 1).toFixed(2));
      q.ince.setAttribute('opacity', clamp(c.hy, 0, 1).toFixed(2));
      const a1 = clamp(c.kons, 0, 1), a2 = clamp(c.kons - 0.5, 0, 1);
      q.k1.style.fill = a1 > 0.3 ? 'var(--crit)' : 'var(--chip)'; q.k2.style.fill = a2 > 0.3 || (c.kons > 0.4 && c.kons < 1.2) ? 'var(--crit)' : 'var(--chip)';
      q.k1.setAttribute('transform', `translate(${(-a1 * 3).toFixed(1)} 0)`); q.k2.setAttribute('transform', `translate(${(-a2 * 3).toFixed(1)} 0)`);
      q.cp.style.fill = c.cp > 0.5 ? 'var(--ok)' : 'var(--crit)'; q.cp.style.stroke = q.cp.style.fill; q.cp.setAttribute('height', 30 - c.cp * 16); q.cp.setAttribute('y', 186 + c.cp * 8);
      q.lok.setAttribute('cx', c.bx.toFixed(1)); q.lok.setAttribute('cy', c.by.toFixed(1));
      q.ins.setAttribute('opacity', adim >= 2 && adim <= 4 ? 1 : 0);
      const w = 22 * (1 - clamp(c.kord, 0, 1)) + 1; q.v.setAttribute('d', `M${(288 - w).toFixed(1)} 32 L288 62 L${(288 + w).toFixed(1)} 32`);
      const gor = adim === 0 ? 1 : 0; q.duyu.setAttribute('opacity', gor); q.duyuT.style.opacity = gor;
    };
    const yaz = () => {
      setCap(el, ST[adim]);
      $('[data-o=ev]').textContent = adim === 0 ? 'istemli' : 'istemsiz'; $('[data-o=ev]').classList.toggle('ist', adim === 0);
      $('[data-o=bas]').textContent = BAS[adim]; $('[data-o=n]').textContent = `Adım ${adim + 1}/6`; $('[data-o=sn]').textContent = '';
      const ap = adim >= 1 && adim <= 4, A = $('[data-o=ap]'); A.classList.toggle('apne', ap); $('[data-o=apt]').textContent = ap ? 'APNE 1–2 s' : 'soluk alınabilir';
      $('[data-a=geri]').disabled = adim === 0; $('[data-a=ileri]').disabled = adim === 5;
      tekrar.textContent = oyna ? 'Duraklat' : 'Oynat';
      if (RM) KEY.forEach((k) => { cur[k] = HD[adim][k]; });
      poz();
    };
    const git = (n) => { adim = clamp(n, 0, 5); bek = 0; yaz(); };
    el.querySelector('.f62-stp').addEventListener('click', (e) => {
      const b = e.target.closest('[data-a]'); if (!b) return; const a = b.dataset.a;
      if (a === 'geri') { oyna = false; git(adim - 1); } else if (a === 'ileri') { oyna = false; git(adim + 1); }
      else if (a === 'basa') { oyna = false; git(0); } else if (a === 'oyna') { oyna = !oyna; if (oyna && adim === 5) git(0); yaz(); }
    });
    yaz();
    if (RM) return () => {};
    return ticker(el, (dt) => {
      if (oyna) { bek += dt; if (bek >= 2.2) { bek = 0; if (adim < 5) git(adim + 1); else { oyna = false; yaz(); } } }
      let degisti = false; const k = 1 - Math.exp(-dt * 7);
      KEY.forEach((key) => { const d = HD[adim][key] - cur[key]; if (Math.abs(d) > 0.002) { cur[key] += d * k; degisti = true; } });
      if (degisti) poz();
    });
  };

  /* ============ 5 · Primer ve sekonder peristaltik dalga ============ */
  VIZ.f62_peristalsis = (el) => {
    const Y0 = 62, YL = 366, XC = 130;
    let mod = 'pri', takil = false, t = -1, bitti = true;
    el.innerHTML = `<div class="f62-ctl"><div class="f62-seg">${segHtml('Dalga tipi', 'm', [['pri', 'Primer dalga'], ['sek', 'Sekonder dalga']], 'pri')}</div>
      <button type="button" class="btn f62-btn" data-o="go">Yut</button>
      <label class="f62-chk"><input type="checkbox" data-o="tak"> Lokma ortada takılsın</label></div>
      <svg class="f62-svg" viewBox="0 0 360 540" role="img" aria-label="Özofagusta peristaltik dalga; alt özofagus sfinkterinin gevşeyip kasılması; basınç çubukları">
      <defs><pattern id="f62-cizgili" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 0 V5" stroke="var(--crit)" stroke-width="1" opacity=".5"/></pattern></defs>
      <rect x="100" y="${Y0}" width="60" height="113" fill="var(--crit-soft)"/><rect x="100" y="${Y0}" width="60" height="113" fill="url(#f62-cizgili)"/>
      <rect x="100" y="${Y0 + 113}" width="60" height="${YL + 44 - Y0 - 113}" fill="var(--warn-soft)"/>
      <rect x="100" y="${YL}" width="60" height="44" fill="var(--warn)" opacity=".28"/>
      <path class="f62-lum" fill="var(--paper)" stroke="var(--accent-ink)" stroke-width="1.6"/>
      <path class="f62-ghost" fill="none" stroke="var(--accent-ink)" stroke-width="1.4" stroke-dasharray="4 3" opacity="0"/>
      <rect x="40" y="388" width="60" height="12" fill="var(--muted)"/><rect x="160" y="388" width="60" height="12" fill="var(--muted)"/>
      <text class="f62-s" x="172" y="418">diyafram hiatusu</text>
      <path d="M100 444 C80 420 70 470 80 500 C90 530 170 530 180 500 C190 470 170 420 160 444" fill="var(--chip)" stroke="var(--line)" stroke-width="1.5" transform="translate(0 -12)"/><text class="f62-s" x="130" y="500" text-anchor="middle">mide</text>
      <circle class="f62-ues" cx="${XC}" cy="${Y0 - 2}" r="0" fill="none" stroke="var(--crit)" stroke-width="3"/>
      <path d="M96 ${Y0} H164" stroke="var(--crit)" stroke-width="5" class="f62-uesln"/>
      <text class="f62-s" x="170" y="${Y0 - 20}">ÜÖS (krikofaringeus)</text><text class="f62-s" x="170" y="${Y0 - 7}">istirahat basıncı 100 mmHg'ye kadar</text>
      <g class="f62-s"><path d="M92 ${Y0} V${Y0 + 111}" stroke="var(--crit)" stroke-width="2"/><text x="86" y="${Y0 + 52}" text-anchor="end">üst 1/3</text><text x="86" y="${Y0 + 66}" text-anchor="end">çizgili kas</text>
      <path d="M92 ${Y0 + 117} V${YL - 2}" stroke="var(--warn)" stroke-width="2"/><text x="86" y="${Y0 + 205}" text-anchor="end">alt 2/3</text><text x="86" y="${Y0 + 219}" text-anchor="end">düz kas</text></g>
      <text class="f62-t" x="168" y="${YL - 8}" style="fill:var(--warn)">LOS</text><text class="f62-s" x="168" y="${YL + 5}">distal 2–4 cm</text>
      <g class="f62-wallT" opacity="0"><text class="f62-s" x="172" y="0">duvar gerilmesi</text></g>
      <text class="f62-wv f62-s" x="172" y="0" opacity="0" style="fill:var(--accent-ink)">enterik sinir sistemi yayar</text>
      <ellipse class="f62-lok" rx="11" ry="9" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="2"/>
      <g class="f62-bars"></g>
      <text class="f62-s" x="232" y="86">basınç, göreli</text></svg>
      <p class="f62-dkn" data-o="du"></p>`;
    const $ = (s) => el.querySelector(s);
    const lum = $('.f62-lum'), ghost = $('.f62-ghost'), lok = $('.f62-lok'), bars = $('.f62-bars'), wv = $('.f62-wv'), wallT = $('.f62-wallT'), go = $('[data-o=go]');
    const ST = [['üst', 108], ['orta', 215], ['alt', 318], ['LOS', 388]];
    const bc = ST.map(([ad, y]) => {
      mk('text', { x: 232, y: y + 4, class: 'f62-s' }, bars).textContent = ad;
      return mk('rect', { x: 262, y: y - 6, height: 12, rx: 3, fill: ad === 'LOS' ? 'var(--warn)' : 'var(--accent)' }, bars);
    });
    // zaman çizelgesi: dalga y, lokma y, LOS gevşeme (0 kapalı..1 açık), ÜÖS açık, gerilme
    const sim = (m, tk, s) => {
      let wave = null, bol = null, los = 0, ues = 0, dis = 0, wy2 = null, ek = 0, ek2 = 0;
      const gec = (a, b, f) => lerp(a, b, ease(clamp(f, 0, 1)));
      const losFn = (w) => clamp((w - 190) / 70, 0, 1);
      if (m === 'pri') {
        ues = s < 0.6 ? Math.sin(clamp(s / 0.6, 0, 1) * Math.PI) : 0;
        const w = s < 0.6 ? Y0 : Y0 + (YL - Y0) * clamp((s - 0.6) / 4, 0, 1);
        wave = s < 0.6 ? null : w;
        bol = s < 0.6 ? 30 + s * 40 : (tk && w > 215 ? 215 : Math.min(w + 16, YL + 6));
        los = losFn(s < 0.6 ? 0 : w);
        if (s >= 4.6) { const f = clamp((s - 4.6) / 1.2, 0, 1); los = 1 - f; ek = Math.sin(f * Math.PI) * (1 - f * 0.4); if (!tk) bol = lerp(YL + 6, 450, ease(clamp((s - 4.6) / 1.5, 0, 1))); }
        if (tk && s >= 5.4) { const s2 = s - 5.4; dis = Math.sin(clamp(s2 / 0.8, 0, 1) * Math.PI / 2); const w2 = 210 + (YL - 210) * clamp((s2 - 0.8) / 2.4, 0, 1); wy2 = s2 < 0.8 ? null : w2; wave = wy2; bol = s2 < 0.8 ? 215 : Math.min(w2 + 12, YL + 6); const f2 = losFn(w2); los = s2 < 0.8 ? 0 : f2; if (s2 >= 3.2) { const f = clamp((s2 - 3.2) / 1.2, 0, 1); los = 1 - f; ek = Math.sin(f * Math.PI); bol = lerp(YL + 6, 450, ease(clamp((s2 - 3.2) / 1.5, 0, 1))); } }
        return { wave, bol, los, ues, dis: dis, disY: 215, ek, end: tk ? 5.4 + 5 : 6.4 };
      }
      dis = s < 0.8 ? Math.sin(clamp(s / 0.8, 0, 1) * Math.PI / 2) : (s < 3.8 ? 1 : 0);
      const w = 210 + (YL - 210) * clamp((s - 0.8) / 3, 0, 1);
      wave = s < 0.8 ? null : w;
      bol = s < 0.8 ? 215 : Math.min(w + 12, YL + 6);
      los = s < 0.8 ? 0 : losFn(w);
      if (s >= 3.8) { const f = clamp((s - 3.8) / 1.2, 0, 1); los = 1 - f; ek = Math.sin(f * Math.PI); bol = lerp(YL + 6, 450, ease(clamp((s - 3.8) / 1.5, 0, 1))); dis = 0; }
      return { wave, bol, los, ues: 0, dis, disY: 215, ek, end: 5.8 };
    };
    const lumenYol = (S, rm) => {
      const N = 66, L = [], R = [];
      for (let i = 0; i <= N; i++) {
        const y = Y0 + (YL + 44 - Y0) * i / N;
        let hw = 14;
        if (y < Y0 + 8) hw = lerp(3, 14, clamp(S.ues, 0, 1)) ;
        if (S.wave != null) hw -= 11 * Math.exp(-Math.pow((y - S.wave) / 14, 2));
        if (S.dis > 0) hw += 8 * S.dis * Math.exp(-Math.pow((y - S.disY) / 22, 2));
        if (y >= YL) { const open = clamp(S.los, 0, 1); const f = 1 - clamp((y - YL) / 44, 0, 1) * 0.0; hw = Math.min(hw, 3 + 11 * open) + (S.ek ? 0 : 0); hw = 3 + 11 * open; }
        hw = Math.max(2, hw);
        L.push([XC - hw, y]); R.push([XC + hw, y]);
      }
      return 'M' + L.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L') + ' L' + R.reverse().map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L') + ' Z';
    };
    const ciz = (S) => {
      lum.setAttribute('d', lumenYol(S)); lok.setAttribute('cx', XC); lok.setAttribute('cy', S.bol.toFixed(1)); lok.setAttribute('opacity', S.bol > 470 ? 0 : 1);
      wv.setAttribute('opacity', S.wave != null ? 1 : 0); wv.setAttribute('y', (S.wave != null ? clamp(S.wave, 90, 340) : 0) + 4);
      wallT.setAttribute('opacity', S.dis > 0.3 ? 1 : 0); wallT.firstChild.setAttribute('y', 219);
      const wx = (y, c) => { if (S.wave == null) return 0; return Math.exp(-Math.pow((y - S.wave) / 40, 2)) * c; };
      const basi = [20 + wx(108, 55), 20 + wx(215, 55), 20 + wx(318, 55), 25 - 22 * clamp(S.los, 0, 1) + 22 * S.ek];
      bc.forEach((b, i) => b.setAttribute('width', (basi[i] * 1.6).toFixed(1)));
    };
    const RMciz = () => {
      const S = sim(mod, false, 2.4); ciz(S);
      const g = [0.6, 2.6, 4.4].map((s) => sim(mod === 'pri' ? 'pri' : 'sek', false, mod === 'pri' ? s : s * 0.8 + 0.6)); void g;
      // yarı saydam üç an: yol kesikli konturlarla
      const yol = [Y0 + 30, 215, YL - 10].map((w) => lumenYol({ wave: w, bol: 0, los: 0.9, ues: 0, dis: 0, disY: 0, ek: 0 }));
      ghost.setAttribute('d', yol.join(' ')); ghost.setAttribute('opacity', 0.7);
      lok.setAttribute('opacity', 0);
    };
    const cap = () => {
      let c = mod === 'pri' ? (takil ? '<b>Primer dalga lokmayı geçti.</b> Dalga LOS\'ye kadar sürdü ama lokma ortada kaldı; duvarı geren lokma şimdi sekonder bir dalga başlatıyor. [[K1 s. 280]]' : '<b>Primer dalga.</b> Yutma merkezi başlatır; dalga özofagusun başından LOS\'ye kadar, lokma nerede olursa olsun ilerler. "Yut"a basın ya da sekonder dalgayı seçin. [[K1 s. 280]]')
        : '<b>Sekonder dalga.</b> Lokmanın özofagus duvarını germesiyle başlar; o noktadan LOS\'ye ilerler. İki dalga tipini de enterik sinir sistemi yayar. [[K1 s. 280]]';
      setCap(el, c);
      $('[data-o=du]').innerHTML = REF('Dalga vardığında LOS tamamen gevşemiştir; lokma geçince düz kası kasılır ve mide içeriğinin geri kaçmasını önler. Kas tipi değişse de peristaltizm kesintisiz ilerler. [[K1 s. 280–281]]');
    };
    let S0 = null;
    const baslat = () => { t = 0; bitti = false; if (RM) { RMciz(); } };
    const sifir = () => { S0 = sim(mod, false, 0); t = -1; bitti = true; ghost.setAttribute('opacity', 0); if (mod === 'sek') S0 = { ...sim('sek', false, 0.01), bol: 215, dis: 0, wave: null }; else S0.bol = 30; ciz(S0); lok.setAttribute('opacity', mod === 'sek' ? 0 : 0); if (RM) RMciz(); };
    const modGuncelle = () => { go.textContent = mod === 'pri' ? 'Yut' : 'Lokmayı bırak'; $('.f62-chk').style.visibility = mod === 'pri' ? 'visible' : 'hidden'; basSec(el, 'm', mod); cap(); sifir(); };
    el.querySelectorAll('[data-m]').forEach((b) => b.addEventListener('click', () => { mod = b.dataset.m; modGuncelle(); }));
    $('[data-o=tak]').addEventListener('change', (e) => { takil = e.target.checked; cap(); sifir(); });
    go.addEventListener('click', () => { ghost.setAttribute('opacity', 0); baslat(); if (RM) { cap(); } });
    modGuncelle();
    if (RM) return () => {};
    return ticker(el, (dt) => {
      if (bitti) return;
      t += dt; const S = sim(mod, takil && mod === 'pri', t);
      ciz(S);
      if (takil && mod === 'pri' && t > 5.4) setCap(el, '<b>Sekonder dalga başladı.</b> Duvarı geren lokma, bulunduğu yerden LOS\'ye uzanan ikinci bir dalga başlatıyor. [[K1 s. 280]]');
      else if (takil && mod === 'pri' && t > 4.6) setCap(el, '<b>Primer dalga lokmayı geçti.</b> Dalga LOS\'ye kadar sürdü ama lokma ortada kaldı; duvarı geren lokma şimdi sekonder bir dalga başlatıyor. [[K1 s. 280]]');
      if (t > S.end) { bitti = true; }
    });
  };

  /* ============ 6 · Bariyer basıncı ============ */
  VIZ.f62_bariyer = (el) => {
    const CAP = {
      normal: '<b>Normal.</b> LOS, diyafram hiatusundan geçen distal 2–4 cm\'lik düz kasın tonik kasılmasıdır; diyafram kasılması ona yardım eder, dar giriş açısı da reflüyü azaltır. Bir durum ya da ilaç seçin. [[K1 s. 281]]',
      yutma: '<b>Yutma.</b> Peristaltik dalga LOS\'ye ulaşınca düz kas gevşer ve lokma geçer: bariyer basıncı geçici olarak kaybolur. [[K1 s. 281]]',
      gebe: '<b>Gebelik.</b> Progesteron LOS tonusunu düşürür; gebe uterus karın içi basıncı artırarak bariyer basıncını daha da azaltır. [[K1 s. 281]]',
      hiat: '<b>Hiatus hernisi.</b> İki mekanizma: LOS diyafram açıklığıyla aynı hizada olmadığı için diyafram artık düz kas kasılmasına yardım edemez; özofagusun diyaframdan geçerken yaptığı dar açı kaybolur. [[K1 s. 281]]',
      az: '<b>LOS tonusunu azaltanlar.</b> Alkol, volatil anestezikler, propofol, tiyopental, opioidler, atropin, glikopirolat. [[K1 s. 281]]',
      art: '<b>LOS tonusunu artıranlar.</b> Metoklopramid, süksinilkolin ve antikolinesterazlar (neostigmin, edrofonyum). [[K1 s. 281]]',
      nd: '<b>Nondepolarizan kas gevşeticiler.</b> LOS tonusuna anlamlı etkileri yoktur. [[K1 s. 281]]',
    };
    let los = 25, mide = 8, durum = 'normal', ilac = 'yok', anim = 0, hiatF = 0, yutT = -1, son = 'normal';
    const SL = (ad, k, mn, mx, v) => `<label class="f62-rng"><span>${ad} <b data-o="${k}"></b></span><input type="range" min="${mn}" max="${mx}" step="1" value="${v}" data-r="${k}" aria-label="${ad}"></label>`;
    el.innerHTML = `<svg class="f62-svg" viewBox="0 0 360 560" role="img" aria-label="Alt özofagus sfinkteri, diyafram hiatusu ve mide; LOS ve mide içi basınç sütunları ile bariyer basıncı">
      <defs>${MARK('f62-bo')}</defs>
      <ellipse class="f62-ut" cx="150" cy="262" rx="90" ry="34" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5" opacity="0"/>
      <path class="f62-mide" fill="var(--chip)" stroke="var(--line)" stroke-width="2"/>
      <ellipse class="f62-sac" cx="136" cy="118" rx="30" ry="20" fill="var(--chip)" stroke="var(--line)" stroke-width="2" opacity="0"/>
      <rect x="112" y="12" width="36" height="96" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="1.5" opacity=".7" class="f62-oz"/>
      <rect x="20" y="138" width="92" height="16" rx="4" fill="var(--muted)"/><rect x="148" y="138" width="102" height="16" rx="4" fill="var(--muted)"/>
      <text class="f62-s" x="258" y="150">diyafram</text><text class="f62-s" x="20" y="132">hiatus</text>
      <rect class="f62-losr" x="108" width="44" rx="6" fill="var(--warn)" stroke="var(--ink)" stroke-width="1"/>
      <text class="f62-t" x="160" y="126" style="fill:var(--warn)">LOS</text>
      <g class="f62-yrd"><path d="M70 140 L100 140" stroke="var(--ok)" stroke-width="2.5" marker-end="url(#f62-bo)"/><path d="M200 140 L160 140" stroke="var(--ok)" stroke-width="2.5" marker-end="url(#f62-bo)"/><text class="f62-s" x="14" y="172">diyafram yardımı</text></g>
      <text class="f62-s f62-yrdx" x="14" y="172" opacity="0" style="fill:var(--crit)">× diyafram yardımı kayboldu</text>
      <path class="f62-his" fill="none" stroke="var(--ok)" stroke-width="2.5"/><text class="f62-s f62-hist" x="186" y="196">dar giriş açısı</text>
      <text class="f62-s f62-hist2" x="186" y="196" opacity="0" style="fill:var(--crit)">dar açı kayboldu</text>
      <text class="f62-t f62-mp" x="150" y="226" text-anchor="middle">mide içi 8 mmHg</text>
      <text class="f62-s f62-et1" x="150" y="262" text-anchor="middle" opacity="0">gebe uterus → mide içi basınç ↑</text>
      <text class="f62-s f62-et2" x="150" y="278" text-anchor="middle" opacity="0" style="fill:var(--accent-ink)">progesteron → LOS tonusu ↓</text>
      <g class="f62-ref" opacity="0"><path d="M120 200 C106 170 126 150 128 100" fill="none" stroke="var(--crit)" stroke-width="3" stroke-dasharray="5 4" marker-end="url(#f62-bo)"/><path d="M136 205 C150 170 138 140 140 90" fill="none" stroke="var(--crit)" stroke-width="3" stroke-dasharray="5 4" marker-end="url(#f62-bo)"/></g>
      <ellipse class="f62-lokm" cx="130" cy="30" rx="9" ry="7" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="2" opacity="0"/>
      <g transform="translate(0 0)">
      <text class="f62-t" x="180" y="312" text-anchor="middle">Basınç (mmHg)</text>
      ${[0, 10, 20, 30, 40].map((v) => `<line x1="52" x2="320" y1="${486 - v * 4}" y2="${486 - v * 4}" stroke="var(--line)"/><text class="f62-s" x="44" y="${490 - v * 4}" text-anchor="end">${v}</text>`).join('')}
      <rect x="82" y="${486 - 30 * 4}" width="70" height="${10 * 4}" fill="var(--ok-soft)"/><rect x="214" y="${486 - 10 * 4}" width="70" height="${5 * 4}" fill="var(--ok-soft)"/>
      <text class="f62-s" x="88" y="${486 - 30 * 4 + 12}" style="fill:var(--ok)">normal 20–30</text><text class="f62-s" x="218" y="${486 - 10 * 4 - 4}" style="fill:var(--ok)">normal 5–10</text>
      <rect class="f62-bl" x="92" width="50" rx="3" fill="var(--warn)"/><rect class="f62-bm" x="224" width="50" rx="3" fill="var(--accent)"/>
      <text class="f62-t" x="117" y="506" text-anchor="middle">LOS basıncı</text><text class="f62-t" x="249" y="506" text-anchor="middle">Mide içi basınç</text>
      <path class="f62-par" fill="none" stroke-width="2.5"/></g>
      <text class="f62-big" x="180" y="545" text-anchor="middle"></text></svg>
      <div class="f62-ctl f62-ctl2">${SL('LOS basıncı (mmHg)', 'los', 0, 40, 25)}${SL('Mide içi basınç (mmHg)', 'mide', 0, 30, 8)}</div>
      ${segHtml('Durum', 'd', [['normal', 'Normal'], ['yutma', 'Yutma'], ['gebe', 'Gebelik'], ['hiat', 'Hiatus hernisi']], 'normal')}
      ${segHtml('İlaç grubu', 'i', [['yok', 'İlaç yok'], ['az', 'Azaltan'], ['art', 'Artıran'], ['nd', 'Nondepolarizan']], 'yok')}`;
    const $ = (s) => el.querySelector(s);
    const q = { losr: $('.f62-losr'), mide: $('.f62-mide'), sac: $('.f62-sac'), oz: $('.f62-oz'), ut: $('.f62-ut'), his: $('.f62-his'), bl: $('.f62-bl'), bm: $('.f62-bm'), par: $('.f62-par'), big: $('.f62-big'), ref: $('.f62-ref'), lokm: $('.f62-lokm'), yrd: $('.f62-yrd'), yrdx: $('.f62-yrdx'), hist: $('.f62-hist'), hist2: $('.f62-hist2'), mp: $('.f62-mp'), et1: $('.f62-et1'), et2: $('.f62-et2') };
    const etkin = () => {
      let L = los, M = mide;
      if (durum === 'yutma') L = 2; else if (durum === 'gebe') { L -= 8; M += 8; } else if (durum === 'hiat') L -= 10;
      if (ilac === 'az') L -= 10; else if (ilac === 'art') L += 10;
      return { L: clamp(L, 0, 40), M: clamp(M, 0, 40) };
    };
    const ciz = () => {
      const { L, M } = etkin(), B = L - M, y0 = 486, f = hiatF, ly = lerp(146, 116, f);
      const th = 8 + L * 0.9; q.losr.setAttribute('height', th.toFixed(1)); q.losr.setAttribute('y', (ly - th / 2).toFixed(1));
      q.bl.setAttribute('y', y0 - L * 4); q.bl.setAttribute('height', L * 4); q.bm.setAttribute('y', y0 - M * 4); q.bm.setAttribute('height', M * 4);
      const lt = y0 - L * 4, mt = y0 - M * 4;
      q.par.setAttribute('d', `M155 ${lt} H165 V${mt} H210`); q.par.style.stroke = B <= 0 ? 'var(--crit)' : 'var(--ink)';
      q.big.textContent = `Bariyer basıncı = ${fmt(B)} mmHg` + (B <= 0 ? ' · reflü' : ''); q.big.style.fill = B <= 0 ? 'var(--crit)' : 'var(--ink)';
      $('[data-o=los]').textContent = fmt(los); $('[data-o=mide]').textContent = fmt(mide);
      q.mp.textContent = `mide içi ${fmt(M)} mmHg`;
      // mide gövdesi
      const top = lerp(158, 128, f), up = durum === 'gebe' ? 24 : 0;
      q.mide.setAttribute('d', `M126 ${top} C100 ${top + 10} 40 ${top + 20} 44 ${top + 70 - up} C48 ${242 - up} 130 ${252 - up} 200 ${236 - up} C260 ${222 - up} 270 ${top + 30} 220 ${top + 18} C190 ${top + 12} 170 ${top + 10} 154 ${top} Z`);
      q.sac.setAttribute('opacity', f > 0.05 ? f : 0); q.oz.setAttribute('height', f > 0.5 ? 70 : 96);
      q.ut.setAttribute('opacity', durum === 'gebe' ? 0.9 : 0); q.et1.setAttribute('opacity', durum === 'gebe' ? 1 : 0); q.et2.setAttribute('opacity', durum === 'gebe' ? 1 : 0);
      q.yrd.setAttribute('opacity', durum === 'hiat' ? 0.15 : 1); q.yrdx.setAttribute('opacity', durum === 'hiat' ? 1 : 0); q.yrdx.setAttribute('y', 172);
      q.yrd.querySelector('text').setAttribute('opacity', durum === 'hiat' ? 0 : 1);
      q.his.setAttribute('d', durum === 'hiat' ? 'M150 170 L176 188' : 'M150 166 Q150 186 178 190'); q.hist.setAttribute('opacity', durum === 'hiat' ? 0 : 1); q.hist2.setAttribute('opacity', durum === 'hiat' ? 1 : 0);
      q.his.style.stroke = durum === 'hiat' ? 'var(--crit)' : 'var(--ok)';
      q.ref.setAttribute('opacity', B <= 0 && durum !== 'yutma' ? 1 : (B <= 0 ? 0.8 : 0));
      q.mp.setAttribute('y', 226 - (durum === 'gebe' ? 24 : 0));
      if (yutT >= 0) { const p = clamp(yutT / 2, 0, 1); q.lokm.setAttribute('opacity', 1); q.lokm.setAttribute('cy', lerp(24, 200, p).toFixed(1)); } else q.lokm.setAttribute('opacity', 0);
    };
    const yaz = () => {
      const k = son; let t = CAP[k] || CAP.normal;
      const { L, M } = etkin(); if (L - M <= 0) t += ' Bariyer basıncı kalmadı: mide asidi özofagusa geçebilir. [[K1 s. 281]]';
      setCap(el, t); basSec(el, 'd', durum); basSec(el, 'i', ilac);
    };
    let hedefF = 0;
    const guncelle = () => { hedefF = durum === 'hiat' ? 1 : 0; if (RM) hiatF = hedefF; ciz(); yaz(); };
    el.querySelectorAll('[data-d]').forEach((b) => b.addEventListener('click', () => { durum = b.dataset.d; son = durum; if (durum === 'yutma') yutT = RM ? -1 : 0; else yutT = -1; guncelle(); }));
    el.querySelectorAll('[data-i]').forEach((b) => b.addEventListener('click', () => { ilac = b.dataset.i; son = ilac === 'yok' ? durum : ilac; guncelle(); }));
    el.querySelectorAll('[data-r]').forEach((r) => r.addEventListener('input', () => { if (r.dataset.r === 'los') los = +r.value; else mide = +r.value; ciz(); yaz(); }));
    guncelle();
    if (RM) return () => {};
    return ticker(el, (dt) => {
      let ch = false;
      if (Math.abs(hedefF - hiatF) > 0.003) { hiatF += clamp(hedefF - hiatF, -dt, dt); ch = true; }
      if (yutT >= 0) { yutT += dt; ch = true; if (yutT > 2.4) yutT = -1; }
      if (ch) ciz();
    });
  };

  /* ============ 7 · Mendelson eşiği ve önlemler ============ */
  VIZ.f62_aspirasyon = (el) => {
    const OL = [
      ['ac', 'Ameliyat öncesi açlık', 'hacim ↓', -30, 0, 'x'], ['ng', 'NG tüp (tıkanıklıkta)', 'hacim ↓', -20, 0, 'x'],
      ['h2', 'H₂ reseptör antagonisti', 'pH ↑', 0, 2.5, 'p'], ['na', 'Sodyum sitrat (partikülsüz antasit)', 'pH ↑', 0, 2, 'p'],
      ['rsi', 'Krikoid basılı hızlı ardışık indüksiyon', 'geçiş ↓', 0, 0, 'g'], ['oz', 'Yarı oturur pozisyonda indüksiyon', 'geçiş ↓', 0, 0, 'g'],
    ];
    const CAP = {
      yok: '<b>Önlem yok.</b> Aspire edilen mide sıvısı 25 mL\'den fazla ve pH\'sı 2,5\'ten düşükse ağır pnömonit için yeterli sayılır. Önlemleri tek tek açın. [[K1 s. 281]]',
      ac: '<b>Ameliyat öncesi açlık.</b> Midedeki hacmi azaltır. [[K1 s. 281]]',
      ng: '<b>Nazogastrik tüp.</b> Bağırsak tıkanıklığında serbest drene olur ve indüksiyondan önce aspire edilir. [[K1 s. 281]]',
      h2: '<b>H₂ reseptör antagonisti.</b> Premedikasyonla mide asidini azaltır, pH yükselir. [[K1 s. 281]]',
      na: '<b>Partikülsüz antasit.</b> Sodyum sitrat mevcut asidi nötralize eder. [[K1 s. 281]]',
      rsi: '<b>Krikoid basılı hızlı ardışık indüksiyon.</b> Hava yolu güvenceye alınana dek mide içeriğinin farinkse ve larinkse geçişini engellemeyi amaçlar. [[K1 s. 281]]',
      oz: '<b>Yarı oturur pozisyon.</b> İndüksiyonun bu pozisyonda yapılması, önlem paketinin parçasıdır. [[K1 s. 281]]',
      hepsi: '<b>Çok yönlü önlem.</b> Yüksek riskli hastada aspirasyonu önleme tek bir yönteme değil, hacmi, asiditeyi ve geçişi birlikte hedeflemeye dayanır. Mendelson sendromu genel anesteziyle ilişkili mide içeriği aspirasyonunun pnömonitidir. [[K1 s. 281]]',
    };
    const on = new Set(); let son = 'yok';
    const X0 = 52, X1 = 340, YB = 330, YT = 66;
    const px = (v) => X0 + (v / 100) * (X1 - X0), py = (p) => YB - (p / 7) * (YB - YT);
    let cx = 60, cy = 1.8, dx = 60, dy = 1.8, iz = [];
    el.innerHTML = `<svg class="f62-svg" viewBox="0 0 360 372" role="img" aria-label="Aspire edilen mide sıvısı hacmi ve pH düzleminde Mendelson bölgesi ve hasta noktası">
      <text class="f62-t" x="10" y="14">Hava yoluna geçiş</text>
      <rect x="10" y="20" width="340" height="12" rx="6" fill="var(--chip)"/><rect class="f62-gc" x="10" y="20" height="12" rx="6" fill="var(--crit)"/>
      <rect x="${px(25)}" y="${py(2.5)}" width="${X1 - px(25)}" height="${YB - py(2.5)}" fill="var(--crit-soft)" stroke="var(--crit)" stroke-dasharray="5 4"/>
      <text class="f62-s" x="${px(25) + 6}" y="${py(2.5) + 36}" style="fill:var(--crit)">ağır pnömonit</text><text class="f62-s" x="${px(25) + 6}" y="${py(2.5) + 49}" style="fill:var(--crit)">riski (Mendelson)</text>
      <line x1="${X0}" y1="${YB}" x2="${X1}" y2="${YB}" stroke="var(--muted)"/><line x1="${X0}" y1="${YT - 6}" x2="${X0}" y2="${YB}" stroke="var(--muted)"/>
      ${[0, 25, 50, 75, 100].map((v) => `<line x1="${px(v)}" y1="${YB}" x2="${px(v)}" y2="${YB + 4}" stroke="var(--muted)"/><text class="f62-s" x="${px(v)}" y="${YB + 17}" text-anchor="middle">${v}</text>`).join('')}
      ${[0, 1, 2.5, 4, 7].map((v) => `<line x1="${X0 - 4}" y1="${py(v)}" x2="${X0}" y2="${py(v)}" stroke="var(--muted)"/><text class="f62-s" x="${X0 - 7}" y="${py(v) + 4}" text-anchor="end">${fmt(v, v % 1 ? 1 : 0)}</text>`).join('')}
      <line x1="${px(25)}" y1="${YT - 6}" x2="${px(25)}" y2="${YB}" stroke="var(--crit)" stroke-width="1"/><text class="f62-s" x="${px(25) + 4}" y="${YT + 6}" style="fill:var(--crit)">25 mL</text>
      <line x1="${X0}" y1="${py(2.5)}" x2="${X1}" y2="${py(2.5)}" stroke="var(--crit)" stroke-width="1"/><text class="f62-s" x="${X0 + 4}" y="${py(2.5) - 4}" style="fill:var(--crit)">pH 2,5</text>
      <text class="f62-t" x="${(X0 + X1) / 2}" y="${YB + 36}" text-anchor="middle">Aspire edilen mide sıvısı (mL)</text>
      <text class="f62-t" x="12" y="52">pH</text>
      <path class="f62-iz" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="3 3" opacity=".6"/>
      <circle class="f62-nk" r="8" stroke-width="2.5" style="stroke:var(--ink)"/></svg>
      <p class="f62-dkn f62-dur" data-o="dr"></p><p class="f62-dkn" data-o="gc"></p>
      <div class="f62-ol">${OL.map((o) => `<button type="button" class="f62-ob" data-o2="${o[0]}" aria-pressed="false"><span>${o[1]}</span><i>${o[2]}</i></button>`).join('')}</div>`;
    const $ = (s) => el.querySelector(s);
    const nk = $('.f62-nk'), iz2 = $('.f62-iz'), gc = $('.f62-gc');
    const hedef = () => { let x = 60, p = 1.8; OL.forEach((o) => { if (on.has(o[0])) { x += o[3]; p += o[4]; } }); return [Math.max(5, x), Math.min(7, p)]; };
    const gecis = () => { const n = ['rsi', 'oz'].filter((k) => on.has(k)).length; return n === 0 ? [1, 'yüksek'] : n === 1 ? [0.55, 'azaldı'] : [0.25, 'düşük']; };
    const yaz = () => {
      const [tx, tp] = hedef(), kir = tx > 25 && tp < 2.5, [gf, gt] = gecis();
      const d = $('[data-o=dr]'); d.textContent = kir ? 'Eşik aşıldı: > 25 mL ve pH < 2,5' : 'Eşiğin dışında'; d.style.color = kir ? 'var(--crit)' : 'var(--ok)';
      $('[data-o=gc]').textContent = 'Hava yoluna geçiş: ' + gt;
      gc.setAttribute('width', (340 * gf).toFixed(1)); gc.style.fill = gf > 0.9 ? 'var(--crit)' : gf > 0.4 ? 'var(--warn)' : 'var(--ok)';
      setCap(el, on.size === 6 ? CAP.hepsi : CAP[son]);
      el.querySelectorAll('[data-o2]').forEach((b) => b.setAttribute('aria-pressed', String(on.has(b.dataset.o2))));
      dx = tx; dy = tp;
      if (RM) { cx = dx; cy = dy; iz2.setAttribute('opacity', 0); poz(); } else iz2.setAttribute('d', `M${px(cx).toFixed(1)} ${py(cy).toFixed(1)} L${px(dx).toFixed(1)} ${py(dy).toFixed(1)}`);
    };
    const poz = () => { nk.setAttribute('cx', px(cx).toFixed(1)); nk.setAttribute('cy', py(cy).toFixed(1)); nk.style.fill = (cx > 25 && cy < 2.5) ? 'var(--crit)' : 'var(--ok)'; };
    el.querySelectorAll('[data-o2]').forEach((b) => b.addEventListener('click', () => { const k = b.dataset.o2; if (on.has(k)) { on.delete(k); son = on.size ? [...on].pop() : 'yok'; } else { on.add(k); son = k; } yaz(); }));
    yaz(); poz();
    if (RM) return () => {};
    return ticker(el, (dt) => {
      const ddx = dx - cx, ddy = dy - cy;
      if (Math.abs(ddx) > 0.05 || Math.abs(ddy) > 0.005) { const k = 1 - Math.exp(-dt * 5); cx += ddx * k; cy += ddy * k; poz(); } else if (cx !== dx || cy !== dy) { cx = dx; cy = dy; poz(); iz2.setAttribute('d', ''); }
    });
  };
})();
