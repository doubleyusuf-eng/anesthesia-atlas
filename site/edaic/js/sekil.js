/* SEKIL — ders şekilleri için ortak kit (Bölüm 72'den itibaren).
   Bölüm dosyası yalnız ayar yazar:  VIZ.f72_ad = (el) => SEKIL.adim(el, {...});
   Üç kalıp:
     SEKIL.adim(el, cfg)   adım adım şema (düğmeler + Önceki/Sonraki/Oynat)
     SEKIL.grafik(el, cfg) kaydırıcılı eğri grafiği
     SEKIL.sahne(el, cfg)  serbest çizim: kaydırıcı / seçenek / zamanla hareket
   Çizim işlevleri ciz(S, t, p) bir SVG dizgesi döndürür. S = çizim yardımcıları, S.dar = dar ekran (< 560 px).
   Hepsi temizleme işlevi döndürür, RM (azaltılmış hareket) açıkken hareketi durdurur, renkler CSS değişkenlerinden gelir. */
(function () {
  'use strict';
  const { ticker, RM } = window.VIZ_YARDIM;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, u) => a + (b - a) * u;
  const f = (v) => (Math.round(+v * 10) / 10).toString();
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const RENK = { ink: 1, muted: 1, line: 1, paper: 1, bg: 1, chip: 1, accent: 1, 'accent-soft': 1, basic: 'c-basic', 'basic-soft': 'c-basic-soft', clin: 'c-clin', 'clin-soft': 'c-clin-soft', ok: 1, 'ok-soft': 1, warn: 1, 'warn-soft': 1, crit: 1, 'crit-soft': 1 };
  const renk = (r) => (!r ? 'none' : r.startsWith('#') || r.startsWith('var(') || r === 'none' ? r : `var(--${RENK[r] === 1 || !RENK[r] ? r : RENK[r]})`);

  /* ---------- çizim yardımcıları ---------- */
  function yardim(dar) {
    const S = { dar, f, esc, renk, lerp, clamp };
    /* yazı: s dizge ya da satır dizisi; o: {c:'b|k|m|a' (kalın/küçük/soluk/vurgu), a:'middle|end', renk, r: döndürme, lh} */
    S.t = (x, y, s, o = {}) => {
      const sat = Array.isArray(s) ? s : [s];
      const lh = o.lh || 17;
      const body = sat.map((l, i) => `<tspan x="${f(x)}" dy="${i ? lh : 0}">${l}</tspan>`).join('');
      const c = (o.c || '').split(' ').filter(Boolean).map((k) => 'sk-' + k).join(' ');
      return `<text x="${f(x)}" y="${f(y)}" class="sk-t ${c}"${o.a ? ` text-anchor="${o.a}"` : ''}${o.renk ? ` style="fill:${renk(o.renk)}"` : ''}${o.r ? ` transform="rotate(${o.r} ${f(x)} ${f(y)})"` : ''}>${body}</text>`;
    };
    /* kutu: o {renk (çizgi), dolgu, r, yazi (orta), yc (yazı sınıfı), soluk, kesik, w} */
    S.kutu = (x, y, w, h, o = {}) => {
      const op = o.soluk ? 0.3 : 1;
      let s = `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${o.r ?? 8}" style="fill:${renk(o.dolgu || 'paper')};stroke:${renk(o.renk || 'line')};stroke-width:${o.w || 1.6};opacity:${op}${o.kesik ? ';stroke-dasharray:5 4' : ''}"/>`;
      if (o.yazi != null) {
        const sat = Array.isArray(o.yazi) ? o.yazi : [o.yazi];
        const lh = o.lh || 17;
        s += `<g style="opacity:${op}">${S.t(x + w / 2, y + h / 2 + 5 - ((sat.length - 1) * lh) / 2, sat, { a: 'middle', c: o.yc || 'b', lh })}</g>`;
      }
      return s;
    };
    S.daire = (x, y, r, o = {}) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" style="fill:${renk(o.dolgu || 'paper')};stroke:${renk(o.renk || 'ink')};stroke-width:${o.w || 1.6};opacity:${o.soluk ? 0.3 : 1}"/>`;
    S.cizgi = (pts, o = {}) => `<path d="${S.d(pts)}" style="fill:${renk(o.dolgu || 'none')};stroke:${renk(o.renk || 'ink')};stroke-width:${o.w || 2};opacity:${o.soluk ? 0.25 : 1};stroke-linejoin:round;stroke-linecap:round${o.kesik ? ';stroke-dasharray:6 5' : ''}"/>`;
    S.d = (pts) => 'M' + pts.map((p) => f(p[0]) + ' ' + f(p[1])).join('L');
    /* ok: nokta dizisi; o {renk, w, soluk, kesik, cift (iki uçlu)} */
    const uc = (a, b, col, op) => {
      const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), s = 8;
      const p = (da) => [b[0] - s * Math.cos(ang + da), b[1] - s * Math.sin(ang + da)];
      const q1 = p(0.45), q2 = p(-0.45);
      return `<path d="M${f(b[0])} ${f(b[1])}L${f(q1[0])} ${f(q1[1])}L${f(q2[0])} ${f(q2[1])}Z" style="fill:${renk(col)};opacity:${op}"/>`;
    };
    S.ok = (pts, o = {}) => {
      const col = o.renk || 'ink', op = o.soluk ? 0.25 : 1;
      let s = S.cizgi(pts, { ...o, renk: col });
      s += uc(pts[pts.length - 2], pts[pts.length - 1], col, op);
      if (o.cift) s += uc(pts[1], pts[0], col, op);
      return s;
    };
    S.boyunca = (pts, u) => {
      const seg = []; let L = 0;
      for (let i = 1; i < pts.length; i++) { const dd = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(dd); L += dd; }
      let s = clamp(u, 0, 1) * L;
      for (let i = 0; i < seg.length; i++) {
        if (s <= seg[i] || i === seg.length - 1) { const k = seg[i] ? s / seg[i] : 0; return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)]; }
        s -= seg[i];
      }
      return pts[pts.length - 1];
    };
    /* akış: yol boyunca kayan noktalar (hareket gösterimi); o {renk, n, hiz, r, ters} ; t saniye */
    S.akis = (pts, t, o = {}) => {
      const n = o.n || 4; let s = '';
      for (let k = 0; k < n; k++) {
        const u = RM ? (k + 0.5) / n : ((t || 0) * (o.hiz || 0.4) + k / n) % 1;
        const p = S.boyunca(pts, o.ters ? 1 - u : u);
        s += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${o.r || 4.5}" style="fill:${renk(o.renk || 'accent')};stroke:${renk('paper')};stroke-width:1.2"/>`;
      }
      return s;
    };
    /* etiket: kısa yazılı küçük rozet */
    S.rozet = (x, y, s, o = {}) => {
      const w = (o.w || String(s).replace(/<[^>]+>/g, '').length * 7.6 + 16), h = 24;
      return `<rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${h}" rx="12" style="fill:${renk(o.dolgu || 'accent-soft')};stroke:${renk(o.renk || 'accent')};stroke-width:1.2"/>` + S.t(x, y + 5, s, { a: 'middle', c: 'b k', renk: o.yazi || 'ink' });
    };
    return S;
  }

  /* ---------- ortak iskelet ---------- */
  function iskelet(el, cfg) {
    el.classList.add('sk');
    el.innerHTML = `<div class="sk-ust"></div><div class="sk-svgw"></div><div class="sk-alt"></div>${cfg.okumaYeri ? '<div class="sk-okuma" aria-live="polite"></div>' : ''}`;
    const viz = el.closest('.viz');
    const cap = (viz && viz.querySelector('.viz-cap')) || null;
    const q = (s) => el.querySelector(s);
    const vb = () => { const dar = el.clientWidth > 0 && el.clientWidth < 560; const v = typeof cfg.vb === 'function' ? cfg.vb(dar) : (dar && cfg.vbDar) || cfg.vb || [640, 360]; return { dar, w: v[0], h: v[1] }; };
    const yaz = (html) => { if (html == null) return; if (window.REF) html = window.REF(html); if (cap) cap.innerHTML = html; else if (q('.sk-okuma')) q('.sk-okuma').innerHTML = html; };
    const ciz = (svg, V) => { q('.sk-svgw').innerHTML = `<svg viewBox="0 0 ${V.w} ${V.h}" class="sk-svg" role="img"${cfg.baslik ? ` aria-label="${esc(cfg.baslik)}"` : ''}>${svg}</svg>`; };
    return { q, vb, yaz, ciz, cap };
  }
  function boyutIzle(el, fn) {
    let son = null;
    const chk = () => { const dar = el.clientWidth > 0 && el.clientWidth < 560; if (dar !== son) { son = dar; fn(); } };
    const ro = window.ResizeObserver ? new ResizeObserver(chk) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  }
  const oynatBtn = (on) => `<button type="button" class="btn ghost sk-oyn" aria-pressed="${on}">${on ? '❚❚ Duraklat' : '▶ Oynat'}</button>`;
  function kaydiricilar(param, p) {
    return `<div class="sk-param">${param.map((k) => `<label class="sk-rng"><span>${k.ad}: <b data-o="${k.id}">${bicim(p[k.id], k)}</b></span><input type="range" min="${k.min}" max="${k.max}" step="${k.adim || (k.max - k.min) / 100}" value="${p[k.id]}" data-k="${k.id}" aria-label="${esc(k.ad.replace(/<[^>]+>/g, ''))}"></label>`).join('')}</div>`;
  }
  function bicim(v, k) { const n = k.ondalik ?? (k.adim && k.adim < 1 ? String(k.adim).split('.')[1].length : 0); return (+v).toFixed(n).replace('.', ',') + (k.birim ? ' ' + k.birim : ''); }
  function secenekler(sec, p) {
    return `<div class="seg" role="group" aria-label="${esc(sec.ad || 'Seçenek')}">${sec.liste.map((o) => `<button type="button" data-s="${o.d}" aria-pressed="${p[sec.id] === o.d}">${o.ad}</button>`).join('')}</div>`;
  }

  /* ---------- 1) adım adım şema ----------
     cfg = { vb:[w,h] | (dar)=>[w,h], baslik, adimlar:[{ad:'kısa düğme adı', metin:'açıklama HTML', ciz:(S,t)=>svg}],
             ortak:(S,i,t)=>svg (her adımda çizilen zemin, isteğe bağlı), hareket:true (adım içinde t akar), oto:true (adımlar kendiliğinden ilerler), sure: saniye/adım } */
  function adim(el, cfg) {
    const A = cfg.adimlar, n = A.length;
    const I = iskelet(el, cfg);
    let i = 0, t = 0, oyn = !!cfg.oto && !RM, gecen = 0;
    const sure = cfg.sure || 4;
    I.q('.sk-ust').innerHTML = `<div class="seg sk-adimlar" role="group" aria-label="Adımlar">${A.map((a, k) => `<button type="button" data-i="${k}" aria-pressed="${k === 0}"><b>${k + 1}</b> ${a.ad}</button>`).join('')}</div>`;
    I.q('.sk-alt').innerHTML = `<div class="btn-row"><button type="button" class="btn ghost" data-y="-1">← Önceki</button><button type="button" class="btn" data-y="1">Sonraki →</button>${cfg.oto !== false && n > 1 ? oynatBtn(oyn) : ''}</div>`;
    const draw = () => {
      const V = I.vb(), S = yardim(V.dar); S.w = V.w; S.h = V.h;
      const tt = RM ? 99 : t;
      I.ciz((cfg.ortak ? cfg.ortak(S, i, tt) : '') + (A[i].ciz ? A[i].ciz(S, tt) : ''), V);
    };
    const git = (k) => {
      i = (k + n) % n; t = 0; gecen = 0;
      I.q('.sk-ust').querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-pressed', j === i));
      I.q('[data-y="-1"]').disabled = i === 0 && !oyn;
      I.yaz(`<b>${i + 1}/${n} · ${A[i].ad}.</b> ${A[i].metin || ''}`);
      draw();
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.i) { oyn = false; syncOyn(); git(+b.dataset.i); }
      else if (b.dataset.y) { oyn = false; syncOyn(); git(i + +b.dataset.y); }
      else if (b.classList.contains('sk-oyn')) { oyn = !oyn; syncOyn(); }
    });
    const syncOyn = () => { const b = I.q('.sk-oyn'); if (b) b.outerHTML = oynatBtn(oyn); };
    const dur = RM || (!cfg.hareket && !cfg.oto) ? () => {} : ticker(el, (dt) => {
      if (cfg.hareket) { t += dt; draw(); }
      if (oyn) { gecen += dt; if (gecen >= sure) git(i + 1); }
    });
    const bz = boyutIzle(el, draw);
    git(0);
    return () => { dur(); bz(); };
  }

  /* ---------- 2) kaydırıcılı grafik ----------
     cfg = { vb, baslik, x:{min,max,ad,adimlar:[...] (eksen işaretleri)}, y:{min,max,ad,adimlar:[...]},
             param:[{id,ad,min,max,adim,deger,birim}], egriler:[{f:(x,p)=>y, renk, ad, kesik, w}],
             noktalar:(p)=>[{x,y,ad,renk}], dikey:(p)=>[{x,ad,renk}], yatay:(p)=>[{y,ad,renk}],
             bolgeler:(p)=>[{x1,x2,renk,ad}], okuma:(p)=>'HTML (viz-cap içine)', ek:(S,p,X,Y)=>svg (ek çizim; X(x),Y(y) dönüştürücüler) } */
  function grafik(el, cfg) {
    const I = iskelet(el, cfg);
    const p = {}; (cfg.param || []).forEach((k) => { p[k.id] = k.deger; });
    if (cfg.secenek) p[cfg.secenek.id] = cfg.secenek.liste[0].d;
    I.q('.sk-ust').innerHTML = cfg.secenek ? secenekler(cfg.secenek, p) : '';
    I.q('.sk-alt').innerHTML = cfg.param ? kaydiricilar(cfg.param, p) : '';
    const draw = () => {
      const V = I.vb(), S = yardim(V.dar);
      const m = { l: V.dar ? 52 : 64, r: 18, t: 18, b: V.dar ? 56 : 54 };
      const W = V.w - m.l - m.r, H = V.h - m.t - m.b;
      const X = (x) => m.l + ((x - cfg.x.min) / (cfg.x.max - cfg.x.min)) * W;
      const Y = (y) => m.t + H - ((clamp(y, cfg.y.min - (cfg.y.max - cfg.y.min) * 0.05, cfg.y.max * 1.05) - cfg.y.min) / (cfg.y.max - cfg.y.min)) * H;
      let s = '';
      (cfg.bolgeler ? cfg.bolgeler(p) : []).forEach((b) => { s += `<rect x="${f(X(b.x1))}" y="${m.t}" width="${f(X(b.x2) - X(b.x1))}" height="${H}" style="fill:${renk(b.renk || 'accent-soft')};opacity:.7"/>`; if (b.ad) s += S.t((X(b.x1) + X(b.x2)) / 2, m.t + 16, b.ad, { a: 'middle', c: 'k m' }); });
      (cfg.x.adimlar || []).forEach((v) => { s += `<line x1="${f(X(v))}" x2="${f(X(v))}" y1="${m.t}" y2="${m.t + H}" class="sk-izgara"/>` + S.t(X(v), m.t + H + 18, String(v).replace('.', ','), { a: 'middle', c: 'k m' }); });
      (cfg.y.adimlar || []).forEach((v) => { s += `<line x1="${m.l}" x2="${m.l + W}" y1="${f(Y(v))}" y2="${f(Y(v))}" class="sk-izgara"/>` + S.t(m.l - 8, Y(v) + 5, String(v).replace('.', ','), { a: 'end', c: 'k m' }); });
      s += `<path d="M${m.l} ${m.t}V${m.t + H}H${m.l + W}" class="sk-eksen"/>`;
      s += S.t(m.l + W / 2, V.h - 8, cfg.x.ad, { a: 'middle', c: 'k' });
      s += S.t(15, m.t + H / 2, cfg.y.ad, { a: 'middle', c: 'k', r: -90 });
      const N = 160;
      (cfg.egriler || []).forEach((e) => {
        if (e.goster && !e.goster(p)) return;
        const pts = [];
        for (let k = 0; k <= N; k++) { const x = lerp(cfg.x.min, cfg.x.max, k / N); const y = e.f(x, p); if (Number.isFinite(y)) pts.push([X(x), Y(y)]); }
        if (pts.length > 1) s += S.cizgi(pts, { renk: e.renk || 'accent', w: e.w || 3, kesik: e.kesik });
        if (e.ad && pts.length) { const q = pts[Math.round(pts.length * (e.adYer ?? 0.85)) - 1] || pts[pts.length - 1]; s += S.t(q[0], q[1] - 9, e.ad, { a: 'middle', c: 'b k', renk: e.renk || 'accent' }); }
      });
      (cfg.dikey ? cfg.dikey(p) : []).forEach((d) => { s += S.cizgi([[X(d.x), m.t], [X(d.x), m.t + H]], { renk: d.renk || 'muted', w: 1.5, kesik: true }); if (d.ad) s += S.t(X(d.x) + 5, m.t + 30, d.ad, { c: 'k', renk: d.renk || 'muted' }); });
      (cfg.yatay ? cfg.yatay(p) : []).forEach((d) => { s += S.cizgi([[m.l, Y(d.y)], [m.l + W, Y(d.y)]], { renk: d.renk || 'muted', w: 1.5, kesik: true }); if (d.ad) s += S.t(m.l + W - 4, Y(d.y) - 6, d.ad, { a: 'end', c: 'k', renk: d.renk || 'muted' }); });
      if (cfg.ek) s += cfg.ek(S, p, X, Y);
      (cfg.noktalar ? cfg.noktalar(p) : []).forEach((q) => { s += S.daire(X(q.x), Y(q.y), 6, { dolgu: q.renk || 'accent', renk: 'paper', w: 2 }); if (q.ad) s += S.t(X(q.x) + 10, Y(q.y) - 10, q.ad, { c: 'b k' }); });
      I.ciz(s, V);
      if (cfg.okuma) I.yaz(cfg.okuma(p));
    };
    el.addEventListener('input', (e) => { const k = e.target.dataset.k; if (!k) return; p[k] = +e.target.value; const d = cfg.param.find((z) => z.id === k); el.querySelector(`[data-o="${k}"]`).textContent = bicim(p[k], d); draw(); });
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-s]'); if (!b) return; p[cfg.secenek.id] = b.dataset.s; el.querySelectorAll('[data-s]').forEach((z) => z.setAttribute('aria-pressed', z === b)); draw(); });
    const bz = boyutIzle(el, draw);
    draw();
    return bz;
  }

  /* ---------- 3) serbest sahne ----------
     cfg = { vb, baslik, param:[...] (kaydırıcılar), secenek:{id, ad, liste:[{d, ad}]}, hareket:true (t akar; Oynat/Duraklat düğmesi),
             ciz:(S,t,p)=>svg, metin:(p,t)=>'HTML (viz-cap)', sure: (hareket döngüsü saniye, isteğe bağlı; t 0..sure arasında döner) } */
  function sahne(el, cfg) {
    const I = iskelet(el, cfg);
    const p = {}; (cfg.param || []).forEach((k) => { p[k.id] = k.deger; });
    if (cfg.secenek) p[cfg.secenek.id] = cfg.secenek.liste[0].d;
    let t = 0, oyn = !!cfg.hareket && !RM;
    I.q('.sk-ust').innerHTML = cfg.secenek ? secenekler(cfg.secenek, p) : '';
    I.q('.sk-alt').innerHTML = (cfg.param ? kaydiricilar(cfg.param, p) : '') + (cfg.hareket && !RM ? `<div class="btn-row">${oynatBtn(oyn)}<button type="button" class="btn ghost sk-bas">↺ Baştan</button></div>` : '');
    let sonMetin = null;
    const draw = () => {
      const V = I.vb(), S = yardim(V.dar); S.w = V.w; S.h = V.h;
      const tt = RM ? (cfg.sure || 99) : t;
      I.ciz(cfg.ciz(S, tt, p), V);
      if (cfg.metin) { const m = cfg.metin(p, tt); if (m !== sonMetin) { sonMetin = m; I.yaz(m); } }
    };
    el.addEventListener('input', (e) => { const k = e.target.dataset.k; if (!k) return; p[k] = +e.target.value; const d = cfg.param.find((z) => z.id === k); el.querySelector(`[data-o="${k}"]`).textContent = bicim(p[k], d); draw(); });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.s) { p[cfg.secenek.id] = b.dataset.s; el.querySelectorAll('[data-s]').forEach((z) => z.setAttribute('aria-pressed', z === b)); t = 0; draw(); }
      else if (b.classList.contains('sk-oyn')) { oyn = !oyn; b.outerHTML = oynatBtn(oyn); }
      else if (b.classList.contains('sk-bas')) { t = 0; draw(); }
    });
    const dur = cfg.hareket && !RM ? ticker(el, (dt) => { if (!oyn) return; t += dt; if (cfg.sure && t > cfg.sure) t = cfg.dongu === false ? cfg.sure : 0; draw(); }) : () => {};
    const bz = boyutIzle(el, draw);
    draw();
    return () => { dur(); bz(); };
  }

  /* ---------- 4) anatomik çizim: resim + numaralı noktalar + lejant ----------
     cfg = { baslik, gorunumler:[{ ad:'Önden', resim:'img/anatomi/01c-larinks-on.webp', en:1024, boy:1536,
               kirp:[x,y,w,h] (isteğe bağlı; resim koordinatında görünen alan),
               noktalar:[{ x, y, ad:'Krikoid kıkırdak', metin:'açıklama HTML [[K5 s. n]]' }] }],
             giris:'nokta seçilmeden viz-cap metni' }
     Koordinatlar resmin piksel koordinatıdır (sol üst 0,0). Sına kipi adları gizler; nokta seçilince ad görünür. */
  function cizim(el, cfg) {
    const G = cfg.gorunumler;
    el.classList.add('sk', 'sk-cz');
    el.innerHTML = `${G.length > 1 ? `<div class="seg sk-cz-g" role="group" aria-label="Görünüm">${G.map((g, k) => `<button type="button" data-g="${k}" aria-pressed="${k === 0}">${g.ad}</button>`).join('')}</div>` : ''}
      <div class="sk-cz-ic"><div class="sk-cz-res"></div><div class="sk-cz-yan"><ol class="sk-cz-l"></ol><button type="button" class="btn ghost sk-cz-sina" aria-pressed="false">Kendini sına</button></div></div>`;
    const viz = el.closest('.viz'), cap = viz && viz.querySelector('.viz-cap');
    const yaz = (h) => { if (cap && h != null) cap.innerHTML = window.REF ? window.REF(h) : h; };
    let g = 0, sec = -1, sina = false, acik = new Set();
    const draw = () => {
      const V = G[g], [kx, ky, kw, kh] = V.kirp || [0, 0, V.en, V.boy], r = Math.max(kw, kh) / 42;
      const pin = (n, k) => { const on = k === sec, ad = !sina || acik.has(k);
        return `<g class="sk-cz-p${on ? ' on' : ''}" data-p="${k}" role="button" tabindex="0" aria-label="${k + 1}${ad ? ' ' + esc(n.ad) : ''}"><circle cx="${f(n.x)}" cy="${f(n.y)}" r="${f(on ? r * 1.25 : r)}"/><text x="${f(n.x)}" y="${f(n.y + r * 0.42)}" text-anchor="middle" style="font-size:${f(r * 1.15)}px">${k + 1}</text></g>`; };
      el.querySelector('.sk-cz-res').innerHTML = `<svg viewBox="${kx} ${ky} ${kw} ${kh}" class="sk-cz-svg" role="img" aria-label="${esc(cfg.baslik || V.ad || 'Anatomik çizim')}"><image href="${V.resim}" x="0" y="0" width="${V.en}" height="${V.boy}"/>${V.noktalar.map(pin).join('')}</svg>`;
      el.querySelector('.sk-cz-l').innerHTML = V.noktalar.map((n, k) => `<li><button type="button" data-p="${k}" aria-pressed="${k === sec}"><b>${k + 1}</b><span>${!sina || acik.has(k) ? n.ad : '?'}</span></button></li>`).join('');
    };
    const sein = (k) => { sec = k; if (sina) acik.add(k); draw(); yaz(k < 0 ? cfg.giris || '' : `<b>${G[g].noktalar[k].ad}.</b> ${G[g].noktalar[k].metin || ''}`); };
    el.addEventListener('click', (e) => {
      const p = e.target.closest('[data-p]'), b = e.target.closest('button');
      if (p) { sein(+p.dataset.p === sec ? -1 : +p.dataset.p); return; }
      if (!b) return;
      if (b.dataset.g) { g = +b.dataset.g; sec = -1; acik.clear(); el.querySelectorAll('[data-g]').forEach((z) => z.setAttribute('aria-pressed', z === b)); sein(-1); }
      else if (b.classList.contains('sk-cz-sina')) { sina = !sina; acik.clear(); b.setAttribute('aria-pressed', sina); b.textContent = sina ? 'Adları göster' : 'Kendini sına'; sein(-1); }
    });
    el.addEventListener('keydown', (e) => { const p = e.target.closest('g[data-p]'); if (p && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sein(+p.dataset.p); } });
    sein(-1);
    return () => {};
  }

  window.SEKIL = { adim, grafik, sahne, cizim, yardim, renk };
})();
