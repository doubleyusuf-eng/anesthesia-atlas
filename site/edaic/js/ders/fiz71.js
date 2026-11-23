/* Bölüm 71 · Miksiyon · bileşenler (K1 s. 338–340).
   Şematik modeller: basınç, direnç ve zaman eksenleri nitel; kitabın verdiği sayılar dışında sayı yazılmaz. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, u) => a + (b - a) * u;
  const ease = (u) => { u = clamp(u, 0, 1); return u * u * (3 - 2 * u); };
  const f = (v) => (+v).toFixed(1);
  const cv = (n) => `var(--${n})`;

  /* ---------- ortak çizim yardımcıları ---------- */
  const T = (x, y, s, o) => {
    o = o || {};
    const body = Array.isArray(s) ? s.map((l, i) => `<tspan x="${f(x)}" dy="${i ? (o.lh || 15) : 0}">${l}</tspan>`).join('') : s;
    return `<text x="${f(x)}" y="${f(y)}" class="f71-t ${o.c || ''}"${o.a ? ` text-anchor="${o.a}"` : ''}${o.st ? ` style="${o.st}"` : ''}${o.r ? ` transform="rotate(${o.r} ${f(x)} ${f(y)})"` : ''}>${body}</text>`;
  };
  const pl = (pts) => 'M' + pts.map((p) => f(p[0]) + ' ' + f(p[1])).join('L');
  function along(pts, u) {
    const seg = []; let L = 0;
    for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    let s = clamp(u, 0, 1) * L;
    for (let i = 0; i < seg.length; i++) {
      if (s <= seg[i] || i === seg.length - 1) { const k = seg[i] ? s / seg[i] : 0; return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)]; }
      s -= seg[i];
    }
    return pts[pts.length - 1];
  }
  const head = (pts, col, on) => {
    const a = pts[pts.length - 2], b = pts[pts.length - 1];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), s = 7;
    const p = (da, r) => [b[0] - r * Math.cos(ang + da), b[1] - r * Math.sin(ang + da)];
    const q1 = p(0.5, s), q2 = p(-0.5, s);
    return `<path d="M${f(b[0])} ${f(b[1])}L${f(q1[0])} ${f(q1[1])}L${f(q2[0])} ${f(q2[1])}Z" style="fill:${cv(col)};opacity:${on ? 1 : 0.25}"/>`;
  };
  /* yol: noktalar, renk, etkin mi, nabız noktaları (t, hız) */
  function yol(pts, col, o) {
    o = o || {};
    const on = !!o.on;
    let s = `<path d="${pl(pts)}" fill="none" style="stroke:${cv(col)};stroke-width:${on ? (o.w || 3.6) : 2};opacity:${on ? 1 : (o.faint || 0.22)}${o.dash || !on ? ';stroke-dasharray:' + (o.dash || '5 4') : ''};stroke-linejoin:round"/>`;
    s += head(pts, col, on);
    if (on && o.dots !== false) {
      for (let k = 0; k < 4; k++) {
        const u = RM ? (k + 0.5) / 4 : ((o.t || 0) * (o.hiz || 0.5) + k / 4) % 1;
        const p = along(pts, o.rev ? 1 - u : u);
        s += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="4" style="fill:${cv(col)};stroke:${cv('paper')};stroke-width:1.2"/>`;
      }
    }
    return s;
  }
  const lbl = (e) => (e.closest('.viz') || document).querySelector('.viz-cap');
  const izle = (el, esik, fn) => {
    let k = null;
    const chk = () => { const n = el.clientWidth < esik; if (n !== k) { k = n; fn(n); } };
    chk();
    const ro = window.ResizeObserver ? new ResizeObserver(chk) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const seg = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));

  /* Mesane: önden görünen kese + boyun + IUS (iki yarım daire) + EUS (iki dikdörtgen) + üretra. */
  const mPath = (x, cy, R, nw, ny) => {
    const a = R * 0.5, b = cy + R * 0.866;
    return `M${f(x - nw)} ${f(ny)}L${f(x - a)} ${f(b)}A${f(R)} ${f(R)} 0 1 1 ${f(x + a)} ${f(b)}L${f(x + nw)} ${f(ny)}Z`;
  };
  function mesane(o) {
    const x = o.x, ny = o.ny, d = o.dolum;
    let R = o.r * (0.55 + 0.45 * d);
    if (o.detrusor === 'kasilmis') R *= 0.92;
    const cy = ny - R - 14, len = o.len || 70;
    const wall = o.wall != null ? o.wall : (o.detrusor === 'kasilmis' ? 5 : 2.6);
    const sel = o.sel, op = (k) => (sel ? (sel === k ? 1 : 0.45) : 1);
    const p = mPath(x, cy, R, 7, ny), p2 = mPath(x, cy, R - 6, 4.5, ny - 1);
    const H = 2 * R + 14, lf = clamp(d, 0, 1.05) * 0.92;
    const yl = ny - H * lf;
    const cid = o.id;
    let s = '';
    const iusGap = o.iusKapali ? 4 : 15, eusGap = o.eusKapali ? 4 : 15;
    const iy = ny + 6, ey = ny + 6 + (o.eusOff || 30);
    if (o.prostata) s += `<ellipse cx="${f(x)}" cy="${f(ny + 26)}" rx="25" ry="21" style="fill:${cv('chip')};stroke:${cv('line')};stroke-width:2"/>`;
    // üretra
    s += `<rect x="${f(x - 8)}" y="${f(ny)}" width="16" height="${len}" rx="3" style="fill:${cv('paper')};stroke:${cv('line')};stroke-width:2"/>`;
    // mesane
    s += `<g data-p="detr" style="opacity:${op('detr')}"><path d="${p}" style="fill:${sel === 'detr' ? cv('chip') : cv('paper')}"/>`;
    s += `<clipPath id="${cid}"><path d="${p2}"/></clipPath>`;
    s += `<g clip-path="url(#${cid})"><rect x="${f(x - R)}" y="${f(yl)}" width="${f(2 * R)}" height="${f(ny - yl + 2)}" style="fill:${cv('accent')};opacity:0.28"/>`;
    s += `<line x1="${f(x - R)}" x2="${f(x + R)}" y1="${f(yl)}" y2="${f(yl)}" style="stroke:${cv('accent')};stroke-width:2"/>`;
    if (o.rez) s += `<rect x="${f(x - R)}" y="${f(ny - H * o.rez)}" width="${f(2 * R)}" height="${f(H * o.rez + 2)}" style="fill:${cv('crit')};opacity:0.4"/>`;
    s += `</g>`;
    s += `<path d="${p}" fill="none" style="stroke:${sel === 'detr' ? cv('accent-ink') : (o.wallC ? cv(o.wallC) : cv('ink'))};stroke-width:${sel === 'detr' ? wall + 2 : wall};stroke-linejoin:round"/>`;
    s += `<path d="${p}" fill="none" stroke="transparent" stroke-width="14" style="pointer-events:stroke"/></g>`;
    s += `<g data-p="uro" style="opacity:${op('uro')}"><path d="${p2}" fill="none" style="stroke:${sel === 'uro' ? cv('accent-ink') : cv('muted')};stroke-width:${sel === 'uro' ? 4 : 1.4}"/><path d="${p2}" fill="none" stroke="transparent" stroke-width="8" style="pointer-events:stroke"/></g>`;
    // akış damlaları
    if (o.akis) {
      for (let k = 0; k < 4; k++) {
        const u = RM ? (k + 0.5) / 4 : ((o.t || 0) * 0.9 + k / 4) % 1;
        const yy = ny + 4 + u * (len + 26);
        s += `<circle cx="${f(x)}" cy="${f(yy)}" r="3" style="fill:${cv(o.kacak ? 'crit' : 'accent')}"/>`;
      }
    }
    // IUS
    const hs = (cx, side, fillc, strc, sw) => `<path d="M${f(cx)} ${f(iy - 7)}A7 7 0 0 ${side} ${f(cx)} ${f(iy + 7)}Z" style="fill:${fillc};stroke:${strc};stroke-width:${sw}"/>`;
    const sw1 = sel === 'ius' ? 3.2 : 1.8;
    s += `<g data-p="ius" style="opacity:${op('ius')}">${hs(x - iusGap, 0, sel === 'ius' ? cv('chip') : cv('warn-soft'), sel === 'ius' ? cv('accent-ink') : cv('warn'), sw1)}${hs(x + iusGap, 1, sel === 'ius' ? cv('chip') : cv('warn-soft'), sel === 'ius' ? cv('accent-ink') : cv('warn'), sw1)}<rect x="${f(x - 26)}" y="${f(iy - 12)}" width="52" height="24" fill="transparent"/></g>`;
    // EUS
    const ew = o.eusKalin ? 11 : 8, sw2 = sel === 'eus' ? 3.2 : (o.eusKalin ? 3 : 1.8);
    const er = (xx) => `<rect x="${f(xx)}" y="${f(ey - 8)}" width="${ew}" height="16" rx="2" style="fill:${sel === 'eus' ? cv('chip') : cv('ok-soft')};stroke:${sel === 'eus' ? cv('accent-ink') : cv('ok')};stroke-width:${sw2}"/>`;
    s += `<g data-p="eus" style="opacity:${op('eus')}">${er(x - eusGap - ew)}${er(x + eusGap)}<rect x="${f(x - 26)}" y="${f(ey - 12)}" width="52" height="24" fill="transparent"/></g>`;
    return { s, cy, R, ny, iy, ey, x, top: cy - R, len };
  }

  /* ====================================================================
     1 · f71_yapi · Kim, hangi sinirle, istemli mi?
     ==================================================================== */
  const YAPI = {
    detr: { ad: 'Detrüsör', ren: ['warn', 'accent'], doku: 'Düz kas; spiral, longitudinal ve sirküler demetler', sinir: 'Sempatik: hipogastrik sinir · Parasempatik: pelvik splanknik sinirler', den: 'İstemsiz', gor: 'Depolar (gevşeyip gerilir, viskoelastisite) ve boşaltır (kasılır)',
      cap: '<b>Detrüsör.</b> Spiral, longitudinal ve sirküler demetlerden oluşan düz kas. Sempatik lifler hipogastrik sinirle, parasempatik lifler pelvik splanknik sinirlerle gelir: istemsiz denetim. Başka bir yapıya dokunun. [[K1 s. 338]]' },
    uro: { ad: 'Ürotelyum', ren: [], doku: 'Epitel (üreter, mesane, üretra iç yüzü)', sinir: '—', den: '—', gor: 'İyon, çözünen madde ve suya çok geçirimsiz engel',
      cap: '<b>Ürotelyum.</b> Üreterlerin, mesanenin ve üretranın iç yüzünü döşer; iyon, çözünen madde ve su geçişine karşı çok geçirimsiz bir engeldir. [[K1 s. 338]]' },
    ius: { ad: 'İnternal üretral sfinkter (IUS)', ren: ['warn'], doku: 'Düz kas: detrüsörün mesane boynundaki uzantısı', sinir: 'Sempatik (α1, mesane boynu)', den: 'İstemsiz', gor: 'Üretrayı mesaneyle birleştiği yerde kapatır',
      cap: '<b>İnternal üretral sfinkter.</b> Üretrayı mesaneyle birleştiği yerde saran, detrüsörün düz kas uzantısı; sempatik denetimdedir. [[K1 s. 338]]' },
    eus: { ad: 'Eksternal üretral sfinkter (EUS)', ren: ['ok'], doku: 'Çizgili kas', sinir: 'Pudendal sinir (somatik)', den: 'İstemli', gor: 'IUS\'nin distalinde (kadın) ya da prostatın distalinde (erkek) üretrayı sıkar',
      cap: '<b>Eksternal üretral sfinkter.</b> Çizgili kas; kadında IUS\'nin, erkekte prostatın distalinde üretrayı sarar. Pudendal sinirle istemli denetlenir. Kadın/Erkek düğmesiyle konumunu karşılaştırın. [[K1 s. 338]]' },
  };
  VIZ.f71_yapi = (el) => {
    let sel = 'detr', cins = 'k', dar = false;
    el.innerHTML = '';
    const cap = lbl(el);
    const kur = (n) => {
      dar = n;
      el.innerHTML = `<div class="f71-ctl">${seg('Yapı seçimi', 'y', [['detr', 'Detrüsör'], ['uro', 'Ürotelyum'], ['ius', 'IUS'], ['eus', 'EUS']], sel)}${seg('Üretra cinsiyeti', 'c', [['k', 'Kadın'], ['e', 'Erkek']], cins)}</div>
        <div class="f71-yg${n ? ' dar' : ''}"><svg class="f71-svg" viewBox="0 0 ${n ? 360 : 420} ${n ? 340 : 380}" role="img" aria-label="Alt üriner sistemin şematik kesiti: üreterler, mesane, ürotelyum, detrüsör, internal ve eksternal üretral sfinkter; seçilen yapıya giden sinir çizilir"></svg><div class="f71-kart"></div></div>`;
      el.querySelectorAll('[data-y]').forEach((b) => b.addEventListener('click', () => sec(b.dataset.y)));
      el.querySelectorAll('[data-c]').forEach((b) => b.addEventListener('click', () => { cins = b.dataset.c; sec('eus'); }));
      el.querySelector('svg').addEventListener('click', (e) => { const g = e.target.closest('[data-p]'); if (g) sec(g.dataset.p); });
      ciz();
    };
    const sec = (k) => { sel = k; cap.innerHTML = REF(YAPI[k].cap); ciz(); };
    function ciz() {
      basSec(el, 'y', sel); basSec(el, 'c', cins);
      const n = dar, W = n ? 360 : 420, bx = n ? 218 : 250, ny = n ? 205 : 235, r = n ? 68 : 90, len = n ? 108 : 120;
      const male = cins === 'e', eusOff = male ? (n ? 52 : 58) : (n ? 28 : 30);
      const m = mesane({ x: bx, ny, r, dolum: 0.8, iusKapali: true, eusKapali: true, sel, prostata: male, eusOff, len, id: 'f71-cl-yapi' });
      const cs = n ? 'f71-s' : 'f71-t';
      let s = '';
      // omurilik
      const y0 = n ? 22 : 24, y1 = n ? 322 : 360, yl = n ? 98 : 110, ys = n ? 282 : 300, x0 = n ? 8 : 12, w = 22;
      s += `<rect x="${x0}" y="${y0}" width="${w}" height="${y1 - y0}" rx="8" style="fill:${cv('chip')};stroke:${cv('line')};stroke-width:2"/>`;
      s += T(x0 + 11 + 4, yl, 'Lomber', { c: 'f71-s f71-m', a: 'middle', r: -90 }) + T(x0 + 11 + 4, ys, 'S2–S4', { c: 'f71-s f71-m', a: 'middle', r: -90 });
      // üreterler
      const ur = (sg) => `M${f(bx + sg * 112)} 14Q${f(bx + sg * 92)} 60 ${f(bx + sg * 0.766 * m.R)} ${f(m.cy - 0.643 * m.R)}`;
      s += `<path d="${ur(-1)}" fill="none" style="stroke:${cv('line')};stroke-width:7;stroke-linecap:round"/><path d="${ur(1)}" fill="none" style="stroke:${cv('line')};stroke-width:7;stroke-linecap:round"/>`;
      s += `<path d="${ur(-1)}" fill="none" style="stroke:${cv('paper')};stroke-width:3;stroke-linecap:round"/><path d="${ur(1)}" fill="none" style="stroke:${cv('paper')};stroke-width:3;stroke-linecap:round"/>`;
      s += T(bx - 118, 20, 'Üreter', { c: 'f71-s f71-m', a: 'end' });
      // sinirler
      const sinir = (a, tx, ty, col, ad, lx, ly) => `<path d="M${x0 + w} ${a}C${f((x0 + w + tx) / 2)} ${a} ${f((x0 + w + tx) / 2)} ${ty} ${f(tx)} ${f(ty)}" fill="none" style="stroke:${cv(col)};stroke-width:3.4"/><circle cx="${f(tx)}" cy="${f(ty)}" r="4.5" style="fill:${cv(col)}"/>${T(lx, ly, ad, { c: 'f71-s', st: `fill:${cv(col)}` })}`;
      const hip = (ty, tx) => sinir(yl, tx, ty, 'warn', 'hipogastrik', x0 + w + 6, yl - 8);
      if (sel === 'detr') {
        s += hip(m.cy - m.R * 0.35, bx - m.R * 0.93);
        s += sinir(ys, bx - m.R * 0.8, m.cy + m.R * 0.6, 'accent-ink', 'pelvik splanknik', x0 + w + 6, ys - 8);
      } else if (sel === 'ius') {
        s += `<path d="M${x0 + w} ${yl}C${n ? 70 : 90} ${yl} ${n ? 80 : 100} ${m.iy} ${f(bx - 14)} ${f(m.iy)}" fill="none" style="stroke:${cv('warn')};stroke-width:3.4"/><circle cx="${f(bx - 14)}" cy="${f(m.iy)}" r="4.5" style="fill:${cv('warn')}"/>${T(x0 + w + 6, yl - 8, 'hipogastrik', { c: 'f71-s', st: `fill:${cv('warn')}` })}`;
      } else if (sel === 'eus') {
        s += `<path d="M${x0 + w} ${ys}C${n ? 70 : 90} ${ys} ${n ? 70 : 90} ${m.ey} ${f(bx - 20)} ${f(m.ey)}" fill="none" style="stroke:${cv('ok')};stroke-width:3.4"/><circle cx="${f(bx - 20)}" cy="${f(m.ey)}" r="4.5" style="fill:${cv('ok')}"/>${T(x0 + w + 6, ys - 8, 'pudendal', { c: 'f71-s', st: `fill:${cv('ok')}` })}`;
      }
      s += m.s;
      s += T(bx + m.R + 6, m.cy - 4, 'Detrüsör', { c: cs, a: 'start' });
      s += T(bx, m.cy + 6, 'ürotelyum (iç yüz)', { c: 'f71-s f71-m', a: 'middle' });
      s += T(bx + 24, m.iy + 4, 'IUS', { c: cs });
      s += T(bx + 24, m.ey + 4, 'EUS', { c: cs });
      if (male) s += T(bx + 32, ny + 30, 'Prostat', { c: 'f71-s f71-m' });
      el.querySelector('svg').innerHTML = s;
      // kart
      const K = YAPI[sel];
      const sh = (k, ad, ac) => `<span class="f71-ch ${k}${ac ? ' on' : ''}">${ad}</span>`;
      el.querySelector('.f71-kart').innerHTML = `<div class="f71-rb">${sh('warn', 'Sempatik', K.ren.includes('warn'))}${sh('par', 'Parasempatik', K.ren.includes('accent'))}${sh('ok', 'Somatik', K.ren.includes('ok'))}</div>
        <h4>${K.ad}</h4><dl class="kv"><dt>Doku</dt><dd>${K.doku}</dd><dt>Sinir</dt><dd>${K.sinir}</dd><dt>Denetim</dt><dd>${K.den}</dd><dt>Görev</dt><dd>${K.gor}</dd></dl>`;
    }
    return izle(el, 700, kur);
  };

  /* ====================================================================
     2 · f71_depo · Depolama
     ==================================================================== */
  VIZ.f71_depo = (el) => {
    let sym = true, play = !RM, d = RM ? 0.9 : 0.3, tau = 0, tA = 0, res = 0.75, dar = false;
    const cap = lbl(el);
    const CAP = {
      on: '<b>Sempatik çıkış açık.</b> β3 uyarısı fundus ve gövdede detrüsörü gevşetir, α1 uyarısı mesane boynunda IUS\'yi tonik kasar: çıkış direnci basıncın üstünde, idrar kaçmaz. Sempatik çıkışı kapatıp farkı görün. [[K1 s. 338]]',
      off: '<b>Sempatik çıkış kapalı (düşünce deneyi).</b> Detrüsör gevşetilmez, IUS kapanmaz; dolan mesanede basınç çıkış direncini aşınca idrar kaçar. Depolamayı sağlayan, gevşeme ile kasılmanın eşgüdümüdür. [[K1 s. 338]]',
    };
    const kur = (n) => {
      dar = n;
      el.innerHTML = `<div class="f71-ctl">${seg('Sempatik çıkış', 's', [['1', 'Sempatik çıkış açık'], ['0', 'Sempatik çıkış kapalı']], sym ? '1' : '0')}<button type="button" class="btn ghost f71-play" aria-pressed="${play}"></button></div>
        <svg class="f71-svg" viewBox="0 0 ${n ? 360 : 720} ${n ? 440 : 340}" role="img" aria-label="Pons depolama merkezinden sempatik çıkış mesane ve boyuna gider; sağda intravezikal basınç ile çıkış direnci çubukları karşılaştırılır"></svg>
        <p class="f71-durum" aria-live="polite"></p>`;
      el.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => { sym = b.dataset.s === '1'; d = RM ? 0.9 : 0.3; tau = 0; res = sym ? 0.75 : 0.3; cap.innerHTML = REF(sym ? CAP.on : CAP.off); ciz(); }));
      const pb = el.querySelector('.f71-play');
      if (RM) pb.hidden = true;
      pb.addEventListener('click', () => { play = !play; if (play && d >= 0.9) { tau = 0; d = 0.3; } ciz(); });
      ciz();
    };
    const bas = () => sym ? 0.05 + 0.2 * d : 0.06 + 0.62 * Math.pow(d, 1.4);
    function ciz() {
      const n = dar, pb = el.querySelector('.f71-play');
      pb.setAttribute('aria-pressed', String(play)); pb.textContent = play ? 'Duraklat' : 'Doldur';
      basSec(el, 's', sym ? '1' : '0');
      const p = bas(), leak = p > res + 0.001 && !sym;
      const bx = n ? 200 : 350, ny = n ? 270 : 262, r = n ? 76 : 92;
      const m = mesane({ x: bx, ny, r, dolum: d, iusKapali: sym, eusKapali: true, wall: sym ? 2 : 4.8, akis: leak, kacak: leak, t: tA, len: n ? 56 : 62, id: 'f71-cl-depo' });
      const cs = n ? 'f71-s' : 'f71-t';
      let s = '';
      // pons
      if (n) s += `<rect x="14" y="8" width="332" height="38" rx="9" style="fill:${cv('chip')};stroke:${cv('line')};stroke-width:2"/>` + T(180, 32, 'Pons · depolama merkezi', { c: cs, a: 'middle' });
      else s += `<rect x="20" y="16" width="190" height="46" rx="10" style="fill:${cv('chip')};stroke:${cv('line')};stroke-width:2"/>` + T(115, 44, 'Pons · depolama merkezi', { c: cs, a: 'middle' });
      const px = n ? 56 : 60, py = n ? 46 : 62;
      const A = [[px, py], [px, m.cy], [bx - m.R - 3, m.cy]], B = [[px, m.cy], [px, m.iy], [bx - 17, m.iy]];
      s += yol(A, 'warn', { on: sym, t: tA, hiz: 0.45 }) + yol(B, 'warn', { on: sym, t: tA, hiz: 0.45, dots: false, w: 3 });
      s += T(px + 8, m.cy - 10, 'sempatik', { c: 'f71-s', st: `fill:${cv('warn')}`, a: 'start' });
      s += m.s;
      // rozetler
      const rz = (x, y, t) => `<g style="opacity:${sym ? 1 : 0.3}"><rect x="${f(x - 20)}" y="${f(y - 12)}" width="40" height="24" rx="7" style="fill:${cv('warn-soft')};stroke:${cv('warn')};stroke-width:1.8"/>${T(x, y + 5, t, { c: 'f71-s f71-b', a: 'middle', st: `fill:${cv('warn')}` })}</g>`;
      s += rz(bx + m.R * 0.72 + 8, m.cy - m.R * 0.72 - 6, 'β3') + rz(bx + 40, m.ny - 8, 'α1');
      // çubuklar
      const sign = p < res ? '&lt;' : '&gt;', col = leak ? 'crit' : 'accent';
      if (!n) {
        const base = 292, mh = 215, bw = 50;
        s += `<line x1="505" x2="700" y1="${base}" y2="${base}" style="stroke:${cv('line')};stroke-width:2"/>`;
        const hp = p * mh, he = Math.min(res, 0.3) * mh, hi = Math.max(0, res - 0.3) * mh;
        s += `<rect x="532" y="${f(base - hp)}" width="${bw}" height="${f(hp)}" rx="4" style="fill:${cv(col)};fill-opacity:0.2;stroke:${cv(col)};stroke-width:2.4"/>`;
        s += `<rect x="628" y="${f(base - he)}" width="${bw}" height="${f(he)}" rx="4" style="fill:${cv('ok-soft')};stroke:${cv('ok')};stroke-width:2.4"/>`;
        if (hi > 1) s += `<rect x="628" y="${f(base - he - hi)}" width="${bw}" height="${f(hi)}" rx="4" style="fill:${cv('warn-soft')};stroke:${cv('warn')};stroke-width:2.4"/>`;
        s += T(653, base - he / 2 + 4, 'EUS', { c: 'f71-s f71-b', a: 'middle', st: `fill:${cv('ok')}` });
        if (hi > 26) s += T(653, base - he - hi / 2 + 4, 'IUS', { c: 'f71-s f71-b', a: 'middle', st: `fill:${cv('warn')}` });
        s += T(557, base + 20, 'İntravezikal', { c: 'f71-s', a: 'middle' }) + T(557, base + 35, 'basınç', { c: 'f71-s', a: 'middle' });
        s += T(653, base + 20, 'Çıkış', { c: 'f71-s', a: 'middle' }) + T(653, base + 35, 'direnci', { c: 'f71-s', a: 'middle' });
        s += T(605, 170, sign, { a: 'middle', st: `font-size:34px;font-weight:800;fill:${cv(leak ? 'crit' : 'ink')}` });
      } else {
        const x0 = 108, ml = 216, bh = 24;
        const row = (y, nm, segs) => T(x0 - 6, y + 17, nm, { c: 'f71-s', a: 'end' }) + segs;
        const hp = p * ml, he = Math.min(res, 0.3) * ml, hi = Math.max(0, res - 0.3) * ml;
        s += `<line x1="${x0}" x2="${x0}" y1="352" y2="432" style="stroke:${cv('line')};stroke-width:2"/>`;
        s += row(358, 'Basınç', `<rect x="${x0}" y="358" width="${f(hp)}" height="${bh}" rx="4" style="fill:${cv(col)};fill-opacity:0.2;stroke:${cv(col)};stroke-width:2.4"/>`);
        s += row(398, 'Direnç', `<rect x="${x0}" y="398" width="${f(he)}" height="${bh}" rx="4" style="fill:${cv('ok-soft')};stroke:${cv('ok')};stroke-width:2.4"/>` + (hi > 1 ? `<rect x="${f(x0 + he)}" y="398" width="${f(hi)}" height="${bh}" rx="4" style="fill:${cv('warn-soft')};stroke:${cv('warn')};stroke-width:2.4"/>` : '') + T(x0 + he / 2, 415, 'EUS', { c: 'f71-s f71-b', a: 'middle', st: `fill:${cv('ok')}` }) + (hi > 30 ? T(x0 + he + hi / 2, 415, 'IUS', { c: 'f71-s f71-b', a: 'middle', st: `fill:${cv('warn')}` }) : ''));
        s += T(340, 400, sign, { a: 'middle', st: `font-size:30px;font-weight:800;fill:${cv(leak ? 'crit' : 'ink')}` });
      }
      el.querySelector('svg').innerHTML = s;
      const du = el.querySelector('.f71-durum');
      if (sym) { du.className = 'f71-durum ok'; du.textContent = 'Direnç > basınç: kontinans'; }
      else if (leak) { du.className = 'f71-durum crit'; du.textContent = 'Basınç > direnç: kaçak'; }
      else { du.className = 'f71-durum'; du.textContent = 'Basınç henüz direncin altında; dolmaya devam ediyor'; }
    }
    const stop = izle(el, 640, kur);
    const tk = ticker(el, (dt) => {
      tA += dt;
      res += ((sym ? 0.75 : 0.3) - res) * Math.min(1, dt * 3);
      if (play && !RM) { tau += dt; const u = tau % 5.2; d = u < 4 ? 0.3 + 0.6 * u / 4 : 0.9; }
      if (el.querySelector('svg')) ciz();
    });
    return () => { stop(); tk(); };
  };

  /* ====================================================================
     3 · f71_dolum · Hacim–basınç eğrisi
     ==================================================================== */
  VIZ.f71_dolum = (el) => {
    let V = 100, play = false, tA = 0, dar = false;
    const cap = lbl(el);
    const P = (v) => (v <= 400 ? 0.05 * v : 20 + 90 * (Math.exp((v - 400) / 150) - 1) / (Math.exp(350 / 150) - 1));
    const BAND = [[200, 350, 'accent-soft', 'accent', '≈ 200 mL · ilk işeme isteği'], [350, 400, 'warn-soft', 'warn', '350–400 mL · rahatsız edici derecede dolu'], [700, 750, 'crit-soft', 'crit', '700 mL · ağrı']];
    const capMetni = (v) => {
      if (v < 200) return `<b>${v} mL.</b> Kompliyans yüksek, basınç 10 cmH₂O'nun altında; gerilme reseptörleri sessiz. Hacmi artırın. [[K1 s. 338]]`;
      if (v < 350) return `<b>${v} mL.</b> Basınç 10 cmH₂O'yu aştı (≈ 200 mL): gerilme reseptörleri ateşleniyor, ilk işeme isteği duyuluyor. Afferent sinyal miksiyon ve koruyucu refleksleri başlatır (sonraki bölüm). [[K1 s. 338–339]]`;
      if (v <= 400) return `<b>${v} mL.</b> Mesane "rahatsız edici derecede dolu" hissediliyor; refleks kasılmalar daha sık ve güçlü. [[K1 s. 339]]`;
      if (v < 700) return `<b>${v} mL.</b> 400 mL'nin üstünde duvar kompliyansı belirgin düştü: küçük hacim artışı basıncı hızla yükseltir. [[K1 s. 338]]`;
      return `<b>${v} mL.</b> 700 mL kapasitede ağrı başlar. [[K1 s. 339]]`;
    };
    const kur = (n) => {
      dar = n;
      el.innerHTML = `<div class="f71-ctl"><button type="button" class="btn ghost f71-play" aria-pressed="false">Doldur</button></div>
        <svg class="f71-svg" viewBox="0 0 ${n ? 360 : 720} ${n ? 340 : 332}" role="img" aria-label="Mesane hacmine karşı intravezikal basınç eğrisi; 200 mL civarında gerilme reseptörü eşiği, 400 mL üstünde basıncın hızla yükselişi ve his eşikleri"></svg>
        <label class="f71-rng"><span>Mesane hacmi <b data-o="v"></b></span><input type="range" min="0" max="750" step="10" value="${V}" aria-label="Mesane hacmi (mL)"></label>
        <div class="legend f71-leg">${BAND.map((b, i) => `<span data-b="${i}"><i style="background:var(--${b[2]});border:1.5px solid var(--${b[3]})"></i>${b[4]}</span>`).join('')}</div>`;
      const rg = el.querySelector('input');
      rg.addEventListener('input', () => { V = +rg.value; play = false; yaz(); });
      const pb = el.querySelector('.f71-play');
      pb.addEventListener('click', () => {
        if (RM) { V = 750; rg.value = 750; play = false; yaz(); return; }
        play = !play; if (play && V >= 750) { V = 0; } yaz();
      });
      yaz();
    };
    let sonCap = '';
    function yaz() { const rg = el.querySelector('input'); rg.value = Math.round(V / 10) * 10; ciz(); const h = capMetni(Math.round(V / 10) * 10); if (h !== sonCap) { sonCap = h; cap.innerHTML = REF(h); } }
    function ciz() {
      const n = dar, pb = el.querySelector('.f71-play');
      pb.setAttribute('aria-pressed', String(play)); pb.textContent = play ? 'Duraklat' : 'Doldur';
      const Vr = Math.round(V / 10) * 10;
      el.querySelector('[data-o="v"]').textContent = Vr + ' mL';
      el.querySelectorAll('[data-b]').forEach((e) => { const b = BAND[+e.dataset.b]; e.classList.toggle('on', Vr >= b[0] && Vr <= b[1]); });
      const px0 = n ? 52 : 300, px1 = n ? 344 : 692, py0 = n ? 272 : 250, py1 = n ? 176 : 30;
      const X = (v) => px0 + (v / 750) * (px1 - px0), Y = (p) => py0 - (p / 110) * (py0 - py1);
      const cs = n ? 'f71-s' : 'f71-t';
      let s = '';
      // mesane
      const bx = n ? 70 : 110, ny = n ? 100 : 190, r = n ? 36 : 60;
      const m = mesane({ x: bx, ny, r, dolum: V / 750, iusKapali: true, eusKapali: true, len: n ? 14 : 40, id: 'f71-cl-dolum' });
      s += m.s;
      const act = V >= 200;
      for (let k = 0; k < 5; k++) {
        const a = (-155 + k * 42) * Math.PI / 180, cx = bx + m.R * Math.cos(a), cy = m.cy + m.R * Math.sin(a);
        const ph = RM ? 1 : 0.5 + 0.5 * Math.sin(tA * (2 + (V - 200) / 60) * Math.PI + k * 1.3);
        const o = act ? 0.35 + 0.65 * ph : 0.25;
        s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${act ? 5.5 : 4}" style="fill:${cv('c-basic')};opacity:${f(o)}"/>`;
        if (act) s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(8 + 3 * ph)}" fill="none" style="stroke:${cv('c-basic')};stroke-width:1.6;opacity:${f(o * 0.7)}"/>`;
      }
      if (n) s += T(122, 36, 'Laplace: yarıçap ↑', { c: 'f71-s f71-m' }) + T(122, 52, '→ duvar gerilimi ↑', { c: 'f71-s f71-m' }) + T(122, 76, 'Gerilme reseptörleri', { c: 'f71-s', st: `fill:${cv('c-basic')}` });
      else s += T(20, 296, 'Laplace: yarıçap ↑', { c: 'f71-s f71-m' }) + T(20, 312, '→ duvar gerilimi ↑', { c: 'f71-s f71-m' }) + T(150, 58, 'gerilme', { c: 'f71-s', st: `fill:${cv('c-basic')}` }) + T(150, 73, 'reseptörleri', { c: 'f71-s', st: `fill:${cv('c-basic')}` });
      // eksenler
      s += `<line x1="${px0}" x2="${px1}" y1="${py0}" y2="${py0}" style="stroke:${cv('line')};stroke-width:2"/><line x1="${px0}" x2="${px0}" y1="${py0}" y2="${py1 - 6}" style="stroke:${cv('line')};stroke-width:2"/>`;
      [0, 200, 400, 700].forEach((v) => { s += `<line x1="${f(X(v))}" x2="${f(X(v))}" y1="${py0}" y2="${py0 + 5}" style="stroke:${cv('muted')};stroke-width:1.6"/>` + T(X(v), py0 + 20, String(v), { c: 'f71-s f71-m', a: 'middle' }); });
      s += T((px0 + px1) / 2, py0 + 38, 'Hacim (mL)', { c: 'f71-s', a: 'middle' });
      if (n) s += T(14, py1 - 14, 'İntravezikal basınç (cmH₂O)', { c: 'f71-s', a: 'start' });
      else s += T(px0 - 38, (py0 + py1) / 2, 'İntravezikal basınç (cmH₂O)', { c: 'f71-s', a: 'middle', r: -90 });
      s += `<line x1="${px0 - 5}" x2="${px0}" y1="${f(Y(10))}" y2="${f(Y(10))}" style="stroke:${cv('muted')};stroke-width:1.6"/>` + T(px0 - 8, Y(10) + 4, '10', { c: 'f71-s f71-m', a: 'end' });
      // eşik çizgileri
      s += `<line x1="${px0}" x2="${px1}" y1="${f(Y(10))}" y2="${f(Y(10))}" style="stroke:${cv('c-basic')};stroke-width:1.8;stroke-dasharray:6 5"/>` + T(px1, Y(10) - 6, 'gerilme reseptörü eşiği', { c: 'f71-s', a: 'end', st: `fill:${cv('c-basic')}` });
      s += `<line x1="${f(X(400))}" x2="${f(X(400))}" y1="${py0}" y2="${py1 - 4}" style="stroke:${cv('muted')};stroke-width:1.6;stroke-dasharray:4 4"/>` + T(X(400) + 6, py1 + 8, 'kompliyans düşer', { c: 'f71-s f71-m', a: 'start' });
      // bantlar
      const by = py0 + (n ? 48 : 50);
      BAND.forEach((b) => { s += `<rect x="${f(X(b[0]))}" y="${by}" width="${f(X(b[1]) - X(b[0]))}" height="16" rx="3" style="fill:${cv(b[2])};stroke:${cv(b[3])};stroke-width:1.6"/>`; });
      // eğri
      let pts = []; for (let v = 0; v <= 750; v += 5) pts.push([X(v), Y(P(v))]);
      s += `<path d="${pl(pts)}" fill="none" style="stroke:${cv('ink')};stroke-width:2.8;stroke-linejoin:round"/>`;
      // imleç
      const cx = X(V), cyy = Y(P(V));
      s += `<line x1="${f(cx)}" x2="${f(cx)}" y1="${f(cyy)}" y2="${py0}" style="stroke:${cv('accent')};stroke-width:1.6;stroke-dasharray:4 3"/><line x1="${px0}" x2="${f(cx)}" y1="${f(cyy)}" y2="${f(cyy)}" style="stroke:${cv('accent')};stroke-width:1.6;stroke-dasharray:4 3"/>`;
      s += `<circle cx="${f(cx)}" cy="${f(cyy)}" r="7" style="fill:${cv('accent')};stroke:${cv('paper')};stroke-width:2.4"/>`;
      el.querySelector('svg').innerHTML = s;
    }
    const stop = izle(el, 640, kur);
    const tk = ticker(el, (dt) => {
      tA += dt;
      if (play) { V = Math.min(750, V + dt * 750 / 8); if (V >= 750) play = false; yaz(); } else if (V >= 200 && !RM && el.querySelector('svg')) ciz();
    });
    return () => { stop(); tk(); };
  };

  /* ====================================================================
     4 · f71_devre · Gerilmeden işemeye
     ==================================================================== */
  const STEPS = [
    { ad: 'Gerilme', cap: '<b>1 · Gerilme.</b> Basınç 10 cmH₂O\'yu aşınca duvardaki gerilme reseptörleri ateşlenir; afferent sinyal hipogastrik sinirle lomber omuriliğe gider. İleri düğmesine basın. [[K1 s. 338]]' },
    { ad: 'Miksiyon refleksi', cap: '<b>2 · Miksiyon refleksi.</b> S2–S4 kaynaklı parasempatik kolinerjik nöronlar ateşlenir; detrüsör geçici olarak kasılır. [[K1 s. 338]]' },
    { ad: 'Kendini yeniden üretme', cap: '<b>3 · Kendini yeniden üreten refleks.</b> Detrüsör kasılması gerilme reseptörlerini daha çok uyarır, o da daha güçlü kasılma doğurur. Mesane doldukça refleks daha sık ve daha güçlü gelir. [[K1 s. 338–339]]' },
    { ad: 'Koruyucu refleks', cap: '<b>4 · Koruyucu (guarding) refleks.</b> Bu geçici detrüsör kasılmaları sırasında EUS refleks olarak kasılır ve idrar kaçmaz. [[K1 s. 339]]' },
    { ad: 'İstemsiz miksiyon', cap: '<b>5 · İstemsiz miksiyon.</b> Refleks yeterince güçlenince, üst merkezler engellemezse EUS\'yi refleks olarak açar ve işeme olur. Pontin miksiyon merkezi olgunlaşmamış bebek ve küçük çocukta durum budur. [[K1 s. 339]]' },
    { ad: 'İstemli erteleme', cap: '<b>6 · İşemek uygun değil.</b> Frontal korteks pontin merkezlere sempatik çıkışı artırmasını, parasempatik çıkışı azaltmasını söyler: detrüsör gevşer, IUS kasılır, idrar kaçmaz. [[K1 s. 339]]' },
    { ad: 'EUS ile tutma', cap: '<b>7 · Refleks güçlenirken.</b> Pontin merkezler artan basınca karşı EUS\'yi tonik kastırır; üst merkezler EUS\'yi istemli olarak da sıkıp işemeyi önleyebilir. [[K1 s. 339]]' },
    { ad: 'İstemli işeme', cap: '<b>8 · İşemek uygun.</b> Karın kasları kasılıp mesane içi basıncı artırır ve duvarı gerer; pontin miksiyon merkezi aynı anda miksiyon refleksini tetikler ve EUS\'yi inhibe eder: işeme olur. [[K1 s. 339]]' },
  ];
  function durum(a, tau) {
    const c = { dol: 0.7, det: 'gevsek', ius: true, eus: true, eusK: false, akis: false, act: {}, ctxPons: false, ponsDep: false, ponsMik: false, bebek: false, karin: 0, inh: false, wall: null, tur: 0, hiz: 0.5 };
    const nab = (per, on) => { const u = tau % per; return RM ? true : u < on; };
    switch (a) {
      case 0: c.act = { aff: 1 }; break;
      case 1: c.act = { aff: 1, par: 1 }; if (nab(1.6, 0.6)) c.det = 'kasilmis'; break;
      case 2: { c.act = { aff: 1, par: 1 }; const u = RM ? 3.4 : tau % 4.5, lap = Math.min(2, Math.floor(u / 1.5)); c.tur = lap + 1; c.hiz = 0.6 + lap * 0.5; c.wall = 4.4 + lap * 1.3; if (RM || (u % 1.5) < 0.75) c.det = 'kasilmis'; break; }
      case 3: c.act = { aff: 1, som: 1 }; c.eusK = true; if (nab(1.6, 0.6)) c.det = 'kasilmis'; break;
      case 4: c.act = { par: 1 }; c.bebek = true; c.det = 'kasilmis'; c.ius = false; c.eus = false; c.akis = true; c.dol = 0.8 - 0.25 * (RM ? 1 : clamp(tau / 4, 0, 1)); c.hiz = 0.9; break;
      case 5: c.act = { cmdSym: 1, sym: 1 }; c.ctxPons = true; c.ponsDep = true; break;
      case 6: c.act = { cmdSom: 1, ctxCmd: 1, som: 1 }; c.eusK = true; c.dol = 0.85; break;
      case 7: c.act = { cmdMik: 1, par: 1 }; c.ctxPons = true; c.ponsMik = true; c.inh = true; c.det = 'kasilmis'; c.ius = false; c.eus = false; c.akis = true; c.dol = RM ? 0.2 : lerp(0.85, 0.2, ease(tau / 3.5)); c.karin = RM ? 1 : (0.5 + 0.5 * Math.sin(tau * 3.2)); c.hiz = 0.9; break;
    }
    return c;
  }
  VIZ.f71_devre = (el) => {
    let adim = 0, play = false, tau = 0, tA = 0, dar = false, tEsik = 0;
    const cap = lbl(el);
    const kur = (n) => {
      dar = n;
      el.innerHTML = `<div class="f71-ctl btn-row"><button type="button" class="btn ghost" data-g="-1" aria-label="Önceki adım">← Geri</button><b class="f71-no" aria-live="polite"></b><button type="button" class="btn ghost" data-g="1" aria-label="Sonraki adım">İleri →</button><button type="button" class="btn ghost f71-play" aria-pressed="false">Oynat</button></div>
        <div class="f71-dots" role="group" aria-label="Adımlar">${STEPS.map((s, i) => `<button type="button" data-i="${i}" aria-label="${i + 1}. adım: ${s.ad}" title="${s.ad}">${i + 1}</button>`).join('')}</div>
        <div class="f71-adim"></div>
        <svg class="f71-svg" viewBox="0 0 ${n ? 360 : 720} ${n ? 540 : 430}" role="img" aria-label="Sinir devresi: frontal korteks, pons, omurilik, mesane ve sfinkterler; seçili adımda etkin yollar kalın çizilir"></svg>
        <div class="f71-roz"></div>`;
      el.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', () => git(clamp(adim + +b.dataset.g, 0, 7), false)));
      el.querySelectorAll('[data-i]').forEach((b) => b.addEventListener('click', () => git(+b.dataset.i, false)));
      const pb = el.querySelector('.f71-play');
      if (RM) pb.hidden = true;
      pb.addEventListener('click', () => { play = !play; if (play && adim >= 7) git(0, true); tEsik = 0; ciz(); });
      ciz();
    };
    function git(i, kal) {
      adim = i; tau = 0; tEsik = 0;
      cap.innerHTML = REF(STEPS[i].cap);
      if (!kal && play) { /* elle gezince oynatma sürer */ }
      ciz();
    }
    function ciz() {
      const n = dar, c = durum(adim, tau);
      el.querySelector('.f71-no').textContent = `${adim + 1} / 8`;
      el.querySelector('.f71-adim').textContent = STEPS[adim].ad;
      const pb = el.querySelector('.f71-play'); pb.setAttribute('aria-pressed', String(play)); pb.textContent = play ? 'Duraklat' : 'Oynat';
      el.querySelectorAll('[data-i]').forEach((b) => { b.setAttribute('aria-current', String(+b.dataset.i === adim)); b.classList.toggle('past', +b.dataset.i < adim); });
      el.querySelector('[data-g="-1"]').disabled = adim === 0; el.querySelector('[data-g="1"]').disabled = adim === 7;
      const cs = n ? 'f71-s' : 'f71-t';
      // geometri
      const G = n
        ? { cx0: 12, cx1: 38, ct: 150, cb: 490, lz: [170, 250], sz: [350, 430], LS: 186, LA: 234, LP: 366, LO: 408, bx: 250, ny: 440, r: 56, len: 56,
            kor: [10, 8, 100, 42], pons: [130, 8, 220, 100], dep: [138, 44, 96, 50], mik: [244, 44, 96, 50], sx: 160, ox: 200, mx: 300, hs: [26, 30, 34], cx: 20 }
        : { cx0: 70, cx1: 110, ct: 150, cb: 410, lz: [165, 235], sz: [275, 350], LS: 177, LA: 217, LP: 292, LO: 330, bx: 520, ny: 330, r: 75, len: 60,
            kor: [380, 18, 140, 44], pons: [540, 14, 160, 96], dep: [548, 40, 68, 54], mik: [624, 40, 68, 54], sx: 560, ox: 600, mx: 650, hs: [86, 94, 102], cx: 76 };
      const m = mesane({ x: G.bx, ny: G.ny, r: G.r, dolum: c.dol, iusKapali: c.ius, eusKapali: c.eus, eusKalin: c.eusK, detrusor: c.det, wall: c.wall, akis: c.akis, t: tA, len: G.len, eusOff: 28, id: 'f71-cl-devre' });
      const a = c.act, T0 = tA;
      let s = '';
      // omurilik
      const cw = G.cx1 - G.cx0;
      const lumC = a.sym ? 'warn-soft' : (a.aff ? 'c-basic-soft' : 'chip'), sacC = a.par ? 'accent-soft' : (a.som ? 'ok-soft' : 'chip');
      s += `<rect x="${G.cx0}" y="${G.ct}" width="${cw}" height="${G.cb - G.ct}" rx="8" style="fill:${cv('chip')};stroke:${cv('line')};stroke-width:2"/>`;
      s += `<rect x="${G.cx0 + 2}" y="${G.lz[0]}" width="${cw - 4}" height="${G.lz[1] - G.lz[0]}" rx="4" style="fill:${cv(lumC)};stroke:${cv('line')};stroke-width:1"/><rect x="${G.cx0 + 2}" y="${G.sz[0]}" width="${cw - 4}" height="${G.sz[1] - G.sz[0]}" rx="4" style="fill:${cv(sacC)};stroke:${cv('line')};stroke-width:1"/>`;
      const cxm = (G.cx0 + G.cx1) / 2 + 4;
      s += T(cxm, (G.lz[0] + G.lz[1]) / 2, 'Lomber', { c: 'f71-s f71-b', a: 'middle', r: -90 }) + T(cxm, (G.sz[0] + G.sz[1]) / 2, 'S2–S4', { c: 'f71-s f71-b', a: 'middle', r: -90 });
      // yollar
      const wx = G.bx - m.R, aff = [[wx - 2, m.cy - 24], [n ? 150 : 330, m.cy - 24], [n ? 150 : 330, G.LA], [G.cx1, G.LA]];
      const symA = [[G.cx1, G.LS], [G.bx - 0.57 * m.R, G.LS], [G.bx - 0.57 * m.R, m.cy - 0.82 * m.R]];
      const symB = [[n ? 140 : 300, G.LS], [n ? 140 : 300, m.iy], [G.bx - 17, m.iy]];
      const par = [[G.cx1, G.LP], [G.bx - 0.77 * m.R, m.cy + 0.64 * m.R]];
      const som = [[G.cx1, G.LO], [n ? 170 : 400, G.LO], [n ? 170 : 400, m.ey], [G.bx - 18, m.ey]];
      const o0 = { t: T0, hiz: c.hiz };
      s += yol(aff, 'c-basic', { on: a.aff, dash: '7 5', ...o0 }) + yol(par, 'accent-ink', { on: a.par, faint: adim === 5 ? 0.18 : 0.22, ...o0 });
      s += yol(symA, 'warn', { on: a.sym, ...o0 }) + yol(symB, 'warn', { on: a.sym, dots: false, w: 3 });
      s += yol(som, 'ok', { on: a.som, ...o0 });
      // inhibisyon
      // yol etiketleri
      const ae = along(aff, 0.55);
      s += n ? T(52, G.LA - 8, 'hipogastrik sinir', { c: 'f71-s', st: `fill:${cv('c-basic')}` }) : T(214, G.LA - 8, 'hipogastrik sinir', { c: 'f71-s', st: `fill:${cv('c-basic')}`, a: 'middle' });
      s += n ? T(52, G.LP - 8, 'pelvik sinir (parasempatik)', { c: 'f71-s', st: `fill:${cv('accent-ink')}` }) : T(214, G.LP - 8, 'pelvik splanknik (parasempatik)', { c: 'f71-s', st: `fill:${cv('accent-ink')}`, a: 'middle' });
      s += n ? T(52, G.LO - 8, 'pudendal', { c: 'f71-s', st: `fill:${cv('ok')}` }) : T(214, G.LO - 8, 'pudendal', { c: 'f71-s', st: `fill:${cv('ok')}`, a: 'middle' });
      s += n ? T(52, G.LS - 8, 'sempatik', { c: 'f71-s', st: `fill:${cv('warn')}` }) : T(214, G.LS - 8, 'sempatik (hipogastrik)', { c: 'f71-s', st: `fill:${cv('warn')}`, a: 'middle' });
      // kortex + pons
      const [kx, ky, kw, kh] = G.kor, [pxx, pyy, pw, ph] = G.pons;
      const bebekO = c.bebek ? 0.45 : 1;
      s += `<g style="opacity:${bebekO}"><rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" rx="9" style="fill:${c.ctxPons ? cv('ok-soft') : cv('chip')};stroke:${c.ctxPons ? cv('ok') : cv('line')};stroke-width:${c.ctxPons ? 3 : 2}"/>`;
      s += T(kx + kw / 2, ky + (c.bebek ? 18 : 27), n ? 'Korteks' : 'Frontal korteks', { c: cs, a: 'middle' });
      if (c.bebek) s += T(kx + kw / 2, ky + 34, 'olgunlaşmamış', { c: 'f71-s', a: 'middle', st: `fill:${cv('warn')}` });
      s += `<rect x="${pxx}" y="${pyy}" width="${pw}" height="${ph}" rx="10" style="fill:${cv('paper')};stroke:${cv('line')};stroke-width:2"/>`;
      s += T(pxx + pw / 2, pyy + 20, c.bebek ? 'Pons · olgunlaşmamış' : 'Pons', { c: cs, a: 'middle', st: c.bebek ? `fill:${cv('warn')}` : '' });
      const sub = (b, ad, on, col) => `<rect x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" rx="7" style="fill:${on ? cv(col + '-soft') : cv('chip')};stroke:${on ? cv(col) : cv('line')};stroke-width:${on ? 3 : 1.6}"/>` + T(b[0] + b[2] / 2, b[1] + b[3] / 2 - 1, ad, { c: 'f71-s', a: 'middle', lh: 14 });
      s += sub(G.dep, ['depolama', 'merkezi'], c.ponsDep, 'warn') + sub(G.mik, ['miksiyon', 'merkezi'], c.ponsMik, 'accent') + '</g>';
      // kortex → pons oku
      const kp = n ? [[kx + kw, ky + kh / 2], [pxx, ky + kh / 2]] : [[kx + kw, ky + kh / 2], [pxx, ky + kh / 2]];
      s += yol(kp, 'ok', { on: c.ctxPons, dots: false, w: 3.6 });
      // komut yolları
      const [hSym, hSom, hMik] = G.hs, yH = n ? [118, 126, 134] : [112, 120, 128];
      const pbY = pyy + ph, dx = G.dep[0] + G.dep[2] / 2, mx2 = G.mik[0] + G.mik[2] / 2;
      const cSym = [[dx, pbY], [dx, yH[0]], [hSym, yH[0]], [hSym, G.ct + 2]];
      const cSom = [[n ? 230 : G.ox, pbY], [n ? 230 : G.ox, yH[1]], [hSom, yH[1]], [hSom, G.ct + 2]];
      const cMik = [[mx2, pbY], [mx2, yH[2]], [hMik, yH[2]], [hMik, G.ct + 2]];
      const cCtx = n ? [[G.cx, ky + kh], [G.cx, G.ct + 2]] : [[kx, ky + kh / 2], [30, ky + kh / 2], [30, G.ct + 40], [G.cx0 + 2, G.ct + 40]];
      s += yol(cSym, 'warn', { on: a.cmdSym, ...o0, hiz: 0.4 }) + yol(cSom, 'ok', { on: a.cmdSom, ...o0, hiz: 0.4 }) + yol(cMik, 'accent-ink', { on: a.cmdMik, ...o0, hiz: 0.4 }) + yol(cCtx, 'ok', { on: a.ctxCmd, ...o0, hiz: 0.4 });
      // tur sayacı (kendini yeniden üretme)
      if (c.tur) s += T(n ? 56 : 214, (n ? G.LP + 22 : G.LP + 20), `döngü · tur ${c.tur} / 3`, { c: 'f71-s f71-b', st: `fill:${cv('accent-ink')}` , a: n ? 'start' : 'middle' });
      // karın duvarı
      const wxx = n ? 336 : 640, off = c.karin * -22;
      s += `<path d="M${wxx + off} ${f(m.cy - 36)}Q${wxx + 14 + off} ${f(m.cy + 20)} ${wxx + off} ${f(m.cy + 76)}" fill="none" style="stroke:${cv('muted')};stroke-width:4;stroke-linecap:round"/><path d="M${wxx + 12 + off} ${f(m.cy - 36)}Q${wxx + 26 + off} ${f(m.cy + 20)} ${wxx + 12 + off} ${f(m.cy + 76)}" fill="none" style="stroke:${cv('muted')};stroke-width:4;stroke-linecap:round;opacity:0.5"/>`;
      s += T(n ? 354 : 712, n ? G.ny + 48 : m.cy + 98, 'karın duvarı', { c: 'f71-s f71-m', a: 'end' });
      if (c.karin) for (let k = 0; k < 3; k++) { const yy = m.cy - 10 + k * 28, x1 = wxx + off - 4, x2 = x1 - 22; s += `<path d="M${x1} ${f(yy)}L${x2} ${f(yy)}" style="stroke:${cv('crit')};stroke-width:3"/><path d="M${x2} ${f(yy)}l7 -5v10z" style="fill:${cv('crit')}"/>`; }
      s += m.s;
      if (c.inh) {
        const p = along(som, n ? 0.3 : 0.12);
        s += `<line x1="${f(p[0])}" x2="${f(p[0])}" y1="${f(p[1] - 9)}" y2="${f(p[1] + 9)}" style="stroke:${cv('crit')};stroke-width:5"/>` + T(p[0] + 9, p[1] + 21, 'inhibisyon', { c: 'f71-s f71-b', st: `fill:${cv('crit')}` });
      }
      el.querySelector('svg').innerHTML = s;
      const roz = (ad, v, ac) => `<span class="f71-ch ${ac ? 'on ' : ''}${ac === 2 ? 'crit' : ''}"><i>${ad}</i> ${v}</span>`;
      el.querySelector('.f71-roz').innerHTML = roz('Detrüsör', c.det === 'kasilmis' ? 'kasılı' : 'gevşek', c.det === 'kasilmis' ? 1 : 0) + roz('IUS', c.ius ? 'kapalı' : 'açık', c.ius ? 0 : 1) + roz('EUS', c.eus ? (c.eusK ? 'sıkı' : 'kapalı') : 'açık', c.eus ? 0 : 1) + (c.akis ? '<span class="f71-ch on ak">İşeme</span>' : '');
    }
    const stop = izle(el, 640, kur);
    const tk = ticker(el, (dt) => {
      tA += dt; tau += dt;
      if (play) { tEsik += dt; if (tEsik >= 3.5) { tEsik = 0; if (adim < 7) git(adim + 1, true); else { play = false; ciz(); } } }
      if (el.querySelector('svg')) ciz();
    });
    return () => { stop(); tk(); };
  };

  /* ====================================================================
     5 · f71_spinal · İki evre
     ==================================================================== */
  const SP = {
    saglam: { ad: 'Sağlam', det: 'normal', eus: 'istemli', his: 'var', son: 'Kontinans ve tam boşalma', cap: '<b>Sağlam omurilik.</b> Sempatik ve parasempatik girdi açık, beyin–pons bağlantısı sağlam: mesane kaçırmadan dolar ve tam boşalır. Evreleri sırayla seçin. [[K1 s. 339]]' },
    yara: { ad: 'Yaralanma', det: '—', eus: '—', his: '—', son: '—', cap: '<b>Sakral düzeyin üstünde tam yaralanma.</b> Mesaneye ve IUS\'ye giden otonom yollar kesilir; kontinans ve tam boşalma bu girdilere bağlıdır. [[K1 s. 339]]' },
    sok: { ad: 'Spinal şok', det: 'atonik (felçli)', eus: 'etkinliği belirgin artmış', his: 'yok', son: 'Akut retansiyon + taşma inkontinansı', cap: '<b>Spinal şok (ilk haftalar).</b> Yaralanma düzeyinin altında flask paralizi ve refleks kaybı. Mesane sempatik ve parasempatik girdisini yitirir, atonik olur; doluluk algısı kaybolur. EUS etkinliği ise belirgin artar: akut retansiyon gelişir, çok dolan mesanede basınç çıkış direncini aşınca taşma inkontinansı olur. [[K1 s. 339]]' },
    hiper: { ad: 'Hiperrefleksi', det: 'hiperrefleksik', eus: 'refleks kasılır (dissinerji)', his: 'yok', son: 'Otomatik mesane; eksik boşalma, enfeksiyon riski ↑', cap: '<b>Hiperrefleksi ve spastisite.</b> Spinal şoktan sonra refleksler anormal güçlüdür: detrüsör gerilmeye güçlü refleks kasılmayla yanıt verir, mesane kendiliğinden dolup boşalır (otomatik mesane). Kasılmalar sürmez ve EUS refleks olarak kasılır (detrüsör–sfinkter dissinerjisi); boşalma eksik kalır, üriner sistem enfeksiyonu riski artar. [[K1 s. 339]]' },
  };
  const KATETER = ' <b>Kateter</b> akut böbrek hasarını önler; bu hasar eskiden akut omurilik yaralanmasından sonra başlıca ölüm nedeniydi. [[K1 s. 339]]';
  VIZ.f71_spinal = (el) => {
    let ev = 'saglam', tau = 0, tA = 0, kat = -1, dar = false;
    const cap = lbl(el);
    const kur = (n) => {
      dar = n;
      el.innerHTML = `<div class="f71-ctl">${seg('Evre', 'e', [['saglam', 'Sağlam'], ['yara', 'Yaralanma'], ['sok', 'Spinal şok'], ['hiper', 'Hiperrefleksi']], ev)}<button type="button" class="btn ghost f71-kat" hidden>Kateter takın</button></div>
        <div class="f71-zam" aria-label="Zaman ekseni (nitel)"><span data-z="yara">yaralanma ●</span><em>── haftalar ──▶</em><span data-z="sok">spinal şok</span><em>──▶</em><span data-z="hiper">sonrası: hiperrefleksi</span></div>
        <div class="f71-yg${n ? ' dar' : ''}"><svg class="f71-svg" viewBox="0 0 ${n ? 360 : 520} ${n ? 360 : 370}" role="img" aria-label="Beyin, pons, omurilik ve mesane: sakral düzeyin üstündeki yaralanmanın mesane dolum ve boşalma döngüsüne etkisi"></svg><dl class="kv f71-tab"></dl></div>`;
      el.querySelectorAll('[data-e]').forEach((b) => b.addEventListener('click', () => { ev = b.dataset.e; tau = 0; kat = -1; cap.innerHTML = REF(SP[ev].cap); ciz(); }));
      el.querySelector('.f71-kat').addEventListener('click', () => { kat = 0; cap.innerHTML = REF(SP.sok.cap + KATETER); ciz(); });
      ciz();
    };
    const ease2 = ease;
    function sim() {
      const c = { d: 0.5, det: 'gevsek', ius: true, eus: true, eusKalin: false, akis: false, kacak: false, rez: 0, cut: 0, wall: null, cath: false };
      if (ev === 'saglam') {
        const u = RM ? 5.6 : tau % 6;
        if (u < 4.4) c.d = 0.2 + 0.7 * u / 4.4; else { const v = (u - 4.4) / 1.6; c.d = 0.9 - 0.7 * ease2(v); c.det = 'kasilmis'; c.ius = false; c.eus = false; c.akis = true; }
        if (RM) { c.d = 0.9; c.det = 'gevsek'; c.akis = false; c.ius = true; c.eus = true; }
      } else if (ev === 'yara') { c.d = 0.5; c.cut = RM ? 1 : ease2(tau / 1); }
      else if (ev === 'sok') {
        c.cut = 1; c.wall = 1.4; c.eusKalin = true;
        c.d = RM ? 1.08 : (tau < 8 ? 0.3 + 0.78 * ease2(tau / 8) : 1.08 + 0.02 * Math.sin(tau * 2.5));
        c.kacak = c.d > 1.0; c.akis = c.kacak;
        if (kat >= 0) { const k = RM ? 9 : kat; c.cath = true; c.d = lerp(1.08, 0.2, ease2(k / 2)); c.akis = k > 0 && k < 2; c.kacak = false; }
      } else {
        c.cut = 1;
        if (RM) { c.d = 0.7; c.det = 'kasilmis'; c.eusKalin = true; c.rez = 0.3; c.eus = true; return c; }
        const u = tau % 6.5; c.rez = 0.3;
        if (u < 4.5) c.d = 0.4 + 0.3 * u / 4.5;
        else if (u < 5.5) { const v = u - 4.5; c.d = 0.7 - 0.3 * ease2(v); c.det = 'kasilmis'; c.eusKalin = true; c.akis = v > 0.15 && v < 0.85; }
        else c.d = 0.4;
      }
      return c;
    }
    function ciz() {
      const n = dar, c = sim();
      basSec(el, 'e', ev);
      el.querySelector('.f71-kat').hidden = !(ev === 'sok');
      el.querySelectorAll('[data-z]').forEach((e) => e.classList.toggle('on', e.dataset.z === ev || (ev === 'yara' && e.dataset.z === 'yara')));
      const W = n ? 360 : 520, bx = n ? 262 : 380, ny = n ? 276 : 290, r = n ? 66 : 82;
      const m = mesane({ x: bx, ny, r, dolum: c.d, iusKapali: c.ius, eusKapali: c.eus, eusKalin: c.eusKalin, detrusor: c.det, wall: c.wall, akis: c.akis, kacak: c.kacak, rez: c.rez, t: tA, len: n ? 52 : 56, eusOff: 26, id: 'f71-cl-spinal' });
      const cs = n ? 'f71-s' : 'f71-t';
      const cx0 = n ? 54 : 120, cw = n ? 26 : 30, ct = n ? 52 : 62, cb = n ? 330 : 342, cutY = n ? 196 : 206, sz0 = n ? 250 : 256, sz1 = n ? 322 : 328;
      const cxm = cx0 + cw / 2;
      let s = '';
      s += `<rect x="${cxm - (n ? 48 : 62)}" y="${n ? 8 : 12}" width="${n ? 96 : 124}" height="32" rx="9" style="fill:${cv('chip')};stroke:${cv('line')};stroke-width:2"/>` + T(cxm, n ? 29 : 33, 'Beyin · pons', { c: cs, a: 'middle' });
      s += `<rect x="${cx0}" y="${ct}" width="${cw}" height="${cb - ct}" rx="8" style="fill:${cv('chip')};stroke:${cv('line')};stroke-width:2"/>`;
      s += `<rect x="${cx0 + 2}" y="${sz0}" width="${cw - 4}" height="${sz1 - sz0}" rx="4" style="fill:${cv('accent-soft')};stroke:${cv('accent-ink')};stroke-width:1.4"/>`;
      // beyin–sakral yol
      const kes = c.cut > 0.5;
      s += `<path d="M${cxm} ${n ? 40 : 44}V${sz0}" style="stroke:${cv(kes ? 'muted' : 'accent-ink')};stroke-width:3.6;opacity:${kes ? 0.35 : 1};${kes ? 'stroke-dasharray:5 4' : ''}"/>`;
      if (c.cut > 0) s += `<line x1="${cx0 - 16}" x2="${cx0 + cw + 16}" y1="${cutY}" y2="${cutY}" style="stroke:${cv('crit')};stroke-width:4.4;stroke-dasharray:7 4;opacity:${f(c.cut)}"/>` + T(n ? cx0 + cw + 18 : cx0 - 20, cutY + 4, 'tam yaralanma', { c: 'f71-s f71-b', a: n ? 'start' : 'end', st: `fill:${cv('crit')};opacity:${f(c.cut)}` });
      s += T(cx0 + cw + 8, (sz0 + sz1) / 2 + 4, 'S2–S4', { c: 'f71-s f71-b', st: `fill:${cv('accent-ink')}` });
      // refleks yolları
      const aktif = ev === 'saglam' || ev === 'yara' || ev === 'hiper';
      const A = [[cx0 + cw, sz0 + 14], [bx - 0.77 * m.R, m.cy + 0.64 * m.R]];
      const B = [[cx0 + cw, sz1 - 14], [n ? 120 : 200, sz1 - 14], [bx - 20, m.ey]];
      s += yol(A, 'accent-ink', { on: aktif && ev !== 'yara', t: tA, hiz: 0.4, faint: 0.3 }) + yol(B, 'ok', { on: aktif && ev !== 'yara', t: tA, hiz: 0.4, faint: 0.3 });
      s += m.s;
      if (c.cath) {
        const k = kat > 0 || RM ? 1 : 0;
        s += `<path d="M${bx} ${m.ny + m.len + 30}V${f(m.ny - 20)}" style="stroke:${cv('ink')};stroke-width:3.4;stroke-linecap:round"/>` + T(bx + 10, m.ny + m.len + 26, 'kateter', { c: 'f71-s f71-b', st: `fill:${cv('ink')}` });
      }
      if (c.kacak) s += T(bx + 18, m.ny + m.len + 16, 'taşma', { c: 'f71-s f71-b', st: `fill:${cv('crit')}` });
      if (c.rez) s += T(bx + m.R + 8, m.ny - 6, 'rezidü', { c: 'f71-s f71-b', st: `fill:${cv('crit')}` });
      if (ev === 'sok') s += T(bx, m.top - 12, 'atonik', { c: 'f71-s f71-m', a: 'middle' });
      el.querySelector('svg').innerHTML = s;
      const K = SP[ev];
      el.querySelector('.f71-tab').innerHTML = `<dt>Detrüsör</dt><dd>${K.det}</dd><dt>EUS</dt><dd>${K.eus}</dd><dt>Doluluk hissi</dt><dd>${K.his}</dd><dt>Sonuç</dt><dd><b>${K.son}</b></dd>`;
    }
    const stop = izle(el, 760, kur);
    const tk = ticker(el, (dt) => {
      tA += dt; tau += dt; if (kat >= 0 && kat < 2.1) kat += dt;
      if (el.querySelector('svg')) ciz();
    });
    return () => { stop(); tk(); };
  };

  /* ====================================================================
     6 · f71_pour · Tanı eşiği, risk etkenleri, kateter
     ==================================================================== */
  const FAK = [
    { k: 'oyku', ad: 'Alt üriner sistem semptomu öyküsü', k2: 'Semptom öyküsü', col: 'c-basic', u: 1, cap: 'Hasta etkeni: önceden alt üriner sistem semptomları. [[K1 s. 339]]' },
    { k: 'cer', ad: 'Anorektal / inguinal herni cerrahisi', k2: 'Anorektal / herni cerrahisi', col: 'c-clin', u: 1, cap: 'Cerrahi tipi: anorektal ve inguinal herni cerrahisi. [[K1 s. 339]]' },
    { k: 'sivi', ad: 'IV sıvı > 750 mL', k2: 'IV sıvı > 750 mL', col: 'accent', u: 1, cap: '750 mL\'yi aşan intraoperatif IV sıvı riski artırır. [[K1 s. 340]]' },
    { k: 'spin', ad: 'Spinal anestezi', k2: 'Spinal anestezi', col: 'warn', u: 2.4, cap: 'Spinal anestezi riski genel anesteziye göre belirgin artırır: detrüsöre otonom sinyal kesilir, omurilik yaralanmasına benzer bir durum oluşur. [[K1 s. 340]]' },
    { k: 'it', ad: 'İntratekal opioid', k2: 'İntratekal opioid', col: 'crit', u: 1.4, cap: 'İntratekal opioid eklenince risk daha da artar. [[K1 s. 340]]' },
    { k: 'opi', ad: 'Opioid analjezi', k2: 'Opioid analjezi ×1,5', col: 'muted', u: 1, cap: 'Opioid kullanımı riski 1,5 kat artırır. [[K1 s. 340]]' },
  ];
  const DOZ = 'Düşük dozlu ya da kısa etkili (ör. prilokain) intratekal lokal anestezik riski azaltır. [[K1 s. 340]]';
  VIZ.f71_pour = (el) => {
    let V = 350, doz = 'std', son = null, dar = false;
    const on = { oyku: false, cer: false, sivi: false, spin: false, it: false, opi: false };
    const cap = lbl(el);
    const hacimCap = () => {
      if (V <= 500) return `<b>Ultrasonla ${V} mL.</b> Dolu mesane kanıtı için eşik >500 mL'dir.${son ? '' : ' Hacmi artırın ve risk etkenlerini açın.'} [[K1 s. 339]]`;
      if (V <= 600) return `<b>${V} mL: dolu mesane kanıtı.</b> Ultrasonla ya da kateter sonrası rezidü >500 mL; tanı için doluluk hissi, suprapubik ağrı, ele gelen mesane gibi klinik ölçütler de aranır. [[K1 s. 339]]`;
      return `<b>${V} mL: kateterizasyon.</b> Standart tedavi, genellikle hacim 600 mL'yi aşınca kateterdir: rahatsızlığı giderir, böbrek hasarı ve üriner sistem enfeksiyonunu önler. [[K1 s. 340]]`;
    };
    const capYaz = () => {
      let h = hacimCap();
      if (son === 'doz') h += ' ' + DOZ;
      else if (son) { const F = FAK.find((x) => x.k === son); h += ' ' + F.cap; }
      cap.innerHTML = REF(h);
    };
    const kur = (n) => {
      dar = n;
      el.innerHTML = `<p class="f71-bilgi">POUR ≈ cerrahi girişimlerin %15'i · standart tanımı yok</p>
        <svg class="f71-svg" viewBox="0 0 ${n ? 360 : 720} ${n ? 404 : 300}" role="img" aria-label="Mesane hacim ölçeği: 500 mL dolu mesane kanıtı, 600 mL kateter eşiği; sağda nitel risk göstergesi"></svg>
        <label class="f71-rng"><span>Ultrasonla tahmini mesane hacmi <b data-o="v"></b></span><input type="range" min="100" max="900" step="10" value="${V}" aria-label="Ultrasonla tahmini mesane hacmi (mL)"></label>
        <div class="f71-tgs${n ? ' dar' : ''}">${FAK.map((x) => `<button type="button" class="btn ghost f71-tg" data-f="${x.k}" aria-pressed="false">${x.ad}</button>`).join('')}</div>
        <div class="f71-doz" hidden>${seg('Spinal doz', 'z', [['std', 'Standart doz'], ['dusuk', 'Düşük doz ya da kısa etkili (ör. prilokain)']], doz)}</div>
        <div class="legend f71-leg"></div>`;
      const rg = el.querySelector('input');
      rg.addEventListener('input', () => { V = +rg.value; capYaz(); ciz(); });
      el.querySelectorAll('[data-f]').forEach((b) => b.addEventListener('click', () => {
        const k = b.dataset.f;
        if (k === 'it' && !on.spin) return;
        on[k] = !on[k];
        if (k === 'spin' && !on.spin) on.it = false;
        son = on[k] ? k : (son === k ? null : son);
        capYaz(); ciz();
      }));
      el.querySelectorAll('[data-z]').forEach((b) => b.addEventListener('click', () => { doz = b.dataset.z; son = 'doz'; capYaz(); ciz(); }));
      ciz();
    };
    function ciz() {
      const n = dar;
      el.querySelector('[data-o="v"]').textContent = V + ' mL';
      el.querySelectorAll('[data-f]').forEach((b) => { b.setAttribute('aria-pressed', String(on[b.dataset.f])); if (b.dataset.f === 'it') b.disabled = !on.spin; });
      el.querySelector('.f71-doz').hidden = !on.spin; basSec(el, 'z', doz);
      const cs = n ? 'f71-s' : 'f71-t';
      const sx0 = n ? 22 : 30, sx1 = n ? 338 : 320, sy = n ? 216 : 226;
      const X = (v) => sx0 + ((v - 100) / 800) * (sx1 - sx0);
      let s = '';
      const bx = n ? 92 : 100, ny = n ? 150 : 150, r = n ? 52 : 60;
      const wc = V > 600 ? 'crit' : (V > 500 ? 'warn' : null);
      const m = mesane({ x: bx, ny, r, dolum: V / 900, iusKapali: true, eusKapali: true, wallC: wc, wall: wc ? 4.2 : 2.6, len: n ? 38 : 44, id: 'f71-cl-pour' });
      s += m.s;
      if (V > 600) s += `<path d="M${bx} ${m.ny + m.len + 18}V${f(m.ny - 14)}" style="stroke:${cv('crit')};stroke-width:3.4;stroke-linecap:round"/>` + T(bx + 12, m.ny + m.len + 14, 'kateter', { c: 'f71-s f71-b', st: `fill:${cv('crit')}` });
      // ölçek
      s += `<rect x="${sx0}" y="${sy - 5}" width="${f(X(500) - sx0)}" height="10" style="fill:${cv('chip')}"/><rect x="${f(X(500))}" y="${sy - 5}" width="${f(X(600) - X(500))}" height="10" style="fill:${cv('warn-soft')};stroke:${cv('warn')};stroke-width:1.4"/><rect x="${f(X(600))}" y="${sy - 5}" width="${f(sx1 - X(600))}" height="10" style="fill:${cv('crit-soft')};stroke:${cv('crit')};stroke-width:1.4"/>`;
      s += `<line x1="${f(X(500))}" x2="${f(X(500))}" y1="${sy - 5}" y2="${n ? 92 : 70}" style="stroke:${cv('warn')};stroke-width:2.4"/><line x1="${f(X(600))}" x2="${f(X(600))}" y1="${sy - 5}" y2="${n ? 92 : 70}" style="stroke:${cv('crit')};stroke-width:2.4"/>`;
      [[100, '100'], [500, '500'], [600, '600'], [900, '900 mL']].forEach(([v, t]) => { s += T(X(v), sy + 24, t, { c: 'f71-s f71-m', a: v === 900 ? 'end' : (v === 100 ? 'start' : 'middle') }); });
      if (n) {
        s += T(X(500) - 4, 262, ['Dolu mesane kanıtı', '> 500 mL'], { c: 'f71-s f71-b', a: 'end', st: `fill:${cv('warn')}` });
        s += T(X(600) + 4, 284, ['Kateter genellikle', '> 600 mL'], { c: 'f71-s f71-b', a: 'start', st: `fill:${cv('crit')}` });
      } else {
        s += T(X(500) - 6, 264, ['Dolu mesane kanıtı', '> 500 mL'], { c: 'f71-s f71-b', a: 'end', st: `fill:${cv('warn')}` });
        s += T(X(600) + 6, 264, ['Kateter genellikle', '> 600 mL'], { c: 'f71-s f71-b', a: 'start', st: `fill:${cv('crit')}` });
      }
      s += `<circle cx="${f(X(V))}" cy="${sy}" r="8" style="fill:${cv('accent')};stroke:${cv('paper')};stroke-width:2.4"/>`;
      // risk göstergesi
      const rx0 = n ? 22 : 366, rx1 = n ? 338 : 700, ry = n ? 322 : 96, rh = n ? 30 : 38;
      const dur = FAK.filter((x) => on[x.k]);
      const unit = (rx1 - rx0) / 7.8;
      s += T(rx0, ry - 12, 'Risk göstergesi (nitel)', { c: cs });
      s += `<rect x="${rx0}" y="${ry}" width="${rx1 - rx0}" height="${rh}" rx="6" style="fill:${cv('chip')};stroke:${cv('line')};stroke-width:2"/>`;
      let cx = rx0;
      dur.forEach((x) => {
        const u = x.k === 'spin' && doz === 'dusuk' ? 1.2 : x.u, w = u * unit;
        s += `<rect x="${f(cx)}" y="${ry}" width="${f(w)}" height="${rh}" style="fill:${cv(x.col)};fill-opacity:0.78;stroke:${cv('paper')};stroke-width:2.4"/>`;
        if (x.k === 'opi') s += T(cx + w / 2, ry + rh / 2 + 5, '×1,5', { c: 'f71-s f71-b', a: 'middle', st: `fill:${cv('paper')}` });
        if (x.k === 'spin' && w > 44) s += T(cx + w / 2, ry + rh / 2 + 5, 'Spinal', { c: 'f71-s f71-b', a: 'middle', st: `fill:${cv('paper')}` });
        cx += w;
      });
      s += `<path d="M${rx0} ${ry + rh + 18}H${rx1 - 2}" style="stroke:${cv('muted')};stroke-width:1.6"/><path d="M${rx1} ${ry + rh + 18}l-7 -4v8z" style="fill:${cv('muted')}"/>` + T(rx0, ry + rh + 38, 'düşük', { c: 'f71-s f71-m' }) + T(rx1, ry + rh + 38, 'yüksek', { c: 'f71-s f71-m', a: 'end' });
      el.querySelector('svg').innerHTML = s;
      el.querySelector('.f71-leg').innerHTML = dur.length ? dur.map((x) => `<span><i style="background:var(--${x.col});opacity:.8"></i>${x.k === 'spin' && doz === 'dusuk' ? 'Spinal (düşük doz/kısa etkili)' : x.k2}</span>`).join('') : '<span>Henüz risk etkeni açılmadı</span>';
    }
    return izle(el, 640, kur);
  };
})();
