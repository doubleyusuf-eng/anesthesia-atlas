/* Bölüm 69 · Su ve elektrolit dengesinin böbrekte düzenlenmesi — bileşenler (tarif: docs/tasarim/fiz69.md; K1 s. 318–328).
   Şematik modeller; sayılar kitaptaki değerlere oturtulmuştur, geri kalanı viz-foot'ta temsilî olarak belirtilir. */
(() => {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  let UID = 0;
  const S = (tag, at, par, txt) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (txt != null) e.textContent = txt; if (par) par.appendChild(e); return e; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const fmt = (v, d = 0) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const mix = (c, p, b = 'var(--paper)') => `color-mix(in srgb, ${c} ${p}%, ${b})`;
  const osmRenk = (v) => (v >= 300 ? mix('var(--warn)', Math.round(((clamp(v, 300, 1200) - 100) / 1100) * 55)) : mix('var(--accent)', Math.round(((300 - clamp(v, 100, 300)) / 200) * 30)));
  const md = (s) => s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const rnd = (() => { let s = 11; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();
  const ease = (f) => f * f * (3 - 2 * f);

  function mkCap(el) {
    const c = el.closest('.viz').querySelector('.viz-cap');
    const def = c.innerHTML;
    return { set: (t) => { c.innerHTML = REF(md(t)); }, reset: () => { c.innerHTML = def; } };
  }
  // dar/geniş yerleşim: kapsayıcı genişliği değişince yeniden kurar; durum bileşenin kendi kapanışında kalır
  function mount(el, build) {
    let mode = null, clean = null, ro = null;
    const go = () => {
      const w = el.clientWidth; if (!w) return;
      const d = w < 560; if (d === mode) return;
      mode = d; if (clean) clean(); el.innerHTML = ''; clean = build(d) || (() => {});
    };
    if ('ResizeObserver' in window) { ro = new ResizeObserver(go); ro.observe(el); }
    go();
    return () => { if (ro) ro.disconnect(); if (clean) clean(); };
  }
  function seg(label, opts, cur, on) {
    const d = document.createElement('div'); d.className = 'seg f69-seg'; d.setAttribute('role', 'group'); d.setAttribute('aria-label', label);
    opts.forEach(([v, l]) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = l; b.dataset.v = v; b.setAttribute('aria-pressed', String(v === cur)); b.addEventListener('click', () => { d.set(v); on(v); }); d.appendChild(b); });
    d.set = (v) => d.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.v === String(v))));
    return d;
  }
  function range(label, min, max, step, val, unit, on, dec = 0) {
    const w = document.createElement('label'); w.className = 'f69-rng';
    w.innerHTML = `<span>${label} <b></b></span><input type="range" min="${min}" max="${max}" step="${step}" value="${val}" aria-label="${label}">`;
    const inp = w.querySelector('input'), out = w.querySelector('b');
    const show = () => { out.textContent = fmt(+inp.value, dec) + ' ' + unit; };
    inp.addEventListener('input', () => { show(); on(+inp.value); }); show();
    return { w, inp, set: (v) => { inp.value = v; show(); } };
  }
  const svgRoot = (W, H, label, dar, par) => S('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': label, class: 'f69-svg' + (dar ? ' f69-dar' : '') }, par);
  const T = (par, x, y, txt, cls = 'f69-t', anchor) => { const e = S('text', { x, y, class: cls }, par, txt); if (anchor) e.setAttribute('text-anchor', anchor); return e; };
  const wrapT = (par, x, y, txt, max, cls = 'f69-s', lh = 15, anchor) => { const e = S('text', { x, y, class: cls }, par); if (anchor) e.setAttribute('text-anchor', anchor); const words = txt.split(' '); let line = '', n = 0; const flush = () => { const t = S('tspan', { x, dy: n ? lh : 0 }, e, line); n++; line = ''; return t; }; words.forEach((w) => { if ((line + ' ' + w).trim().length > max) flush(); line = (line + ' ' + w).trim(); }); if (line) flush(); e.f69n = n; return e; };
  const defs = (svg) => S('defs', {}, svg);
  function marker(svg, color, id) { const d = defs(svg); const m = S('marker', { id, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto-start-reverse' }, d); S('path', { d: 'M0 0L10 5L0 10z', fill: color }, m); }
  function arrow(par, x1, y1, x2, y2, th, color, op = 1) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, px = -uy, py = ux;
    const hl = Math.min(L * 0.6, Math.max(th * 1.3, 8)), hw = th / 2 + Math.max(th * 0.6, 3.5), bx = x2 - ux * hl, by = y2 - uy * hl, h = th / 2;
    const pts = [[x1 + px * h, y1 + py * h], [bx + px * h, by + py * h], [bx + px * hw, by + py * hw], [x2, y2], [bx - px * hw, by - py * hw], [bx - px * h, by - py * h], [x1 - px * h, y1 - py * h]];
    return S('polygon', { points: pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' '), fill: color, opacity: op }, par);
  }
  const hatch = (svg, id, color) => { const p = S('pattern', { id, width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs(svg)); S('rect', { width: 6, height: 6, fill: mix(color, 18) }, p); S('rect', { width: 3, height: 6, fill: color }, p); };
  const btn = (txt, cls = 'btn ghost') => { const b = document.createElement('button'); b.type = 'button'; b.className = cls; b.textContent = txt; return b; };
  const div = (cls, par) => { const d = document.createElement('div'); if (cls) d.className = cls; if (par) par.appendChild(d); return d; };

  /* ---------- 1 · Bölmeler ve indikatör seçimi ---------- */
  VIZ.f69_bolme = (el) => {
    const cap = mkCap(el); let mode = 'bos';
    const CAP = {
      alb: '**İşaretli albümin → plazma hacmi.** Damara verildikten sonra kapiller endotelden geçemez; yalnız plazmada dağılır. [[K1 s. 318]]',
      tio: '**Tiyosülfat → HDS hacmi.** Kapiller endotelden geçer, hücrelerin fosfolipit çift tabakasını geçemez. İnterstisyel hacim = HDS − plazma. [[K1 s. 318]]',
      d2o: '**Döteryumlu su → toplam vücut suyu.** Hem endotelden hem hücre zarından geçer. HİS doğrudan ölçülemez: toplam su − HDS. [[K1 s. 318]]',
    };
    const ROZ = { alb: 'Ölçülen: plazma ≈ 3 L', tio: 'Ölçülen: HDS ≈ 14 L', d2o: 'Ölçülen: toplam su 42 L' };
    return mount(el, (dar) => {
      const W = dar ? 360 : 640, H = dar ? 432 : 312;
      const svg = svgRoot(W, H, 'Vücut suyu bölmeleri: hücre içi 28 L, interstisyel 10 L, plazma 3 L, transsellüler 1 L', dar, el);
      let R, bHis, bPlz;
      if (!dar) { R = { his: [20, 44, 400, 176], int: [420, 44, 142.9, 176], plz: [562.9, 44, 42.9, 176], trs: [605.8, 44, 14.2, 176] }; }
      else { R = { his: [10, 56, 340, 190], int: [10, 246, 340, 85.7], plz: [10, 331.7, 340, 25.7], trs: [10, 357.4, 340, 8.6] }; }
      const rc = (k, cls) => S('rect', { x: R[k][0], y: R[k][1], width: R[k][2], height: R[k][3], class: cls }, svg);
      rc('his', 'f69-bo-his'); rc('int', 'f69-bo-int'); rc('plz', 'f69-bo-plz'); rc('trs', 'f69-bo-trs');
      for (let i = 0; i < 9; i++) { const [x, y, w, h] = R.his; S('circle', { cx: x + 40 + (i % 3) * (w - 80) / 2 + (dar ? 0 : 0), cy: y + 30 + Math.floor(i / 3) * (h - 60) / 2, r: dar ? 14 : 18, class: 'f69-bo-cell' }, svg); }
      for (let i = 0; i < 5; i++) S('circle', { cx: dar ? (i < 3 ? R.plz[0] + 14 + i * 16 : R.plz[0] + 290 + (i - 3) * 18) : R.plz[0] + R.plz[2] / 2 + (i % 2 ? 6 : -6), cy: dar ? R.plz[1] + 13 : R.plz[1] + 100 + i * 14, r: 3.5, class: 'f69-bo-rbc' }, svg);
      // sınırlar
      const mem = dar ? S('line', { x1: 10, x2: 350, y1: 246, y2: 246, class: 'f69-bo-mem' }, svg) : S('line', { x1: 420, x2: 420, y1: 40, y2: 224, class: 'f69-bo-mem' }, svg);
      const end = dar ? S('line', { x1: 10, x2: 350, y1: 331.7, y2: 331.7, class: 'f69-bo-end' }, svg) : S('line', { x1: 562.9, x2: 562.9, y1: 40, y2: 224, class: 'f69-bo-end' }, svg);
      const flash = { mem: 0, end: 0 };
      // etiketler
      T(svg, dar ? 10 : 20, dar ? 16 : 22, 'Toplam vücut suyu = %60 × 70 kg = 42 L', 'f69-t f69-b');
      const roz = T(svg, dar ? 10 : 620, dar ? 36 : 22, '', 'f69-t f69-acc', dar ? undefined : 'end');
      if (!dar) {
        T(svg, 220, 140, 'Hücre içi sıvı · 28 L', 'f69-t f69-b', 'middle');
        T(svg, 491, 128, 'İnterstisyel', 'f69-t f69-b', 'middle'); T(svg, 491, 146, '10 L', 'f69-t', 'middle');
        T(svg, 584, 72, 'Plazma', 'f69-s f69-b', 'middle'); T(svg, 584, 87, '3 L', 'f69-s', 'middle');
        S('line', { x1: 613, x2: 613, y1: 224, y2: 236, class: 'f69-bo-ln' }, svg);
        T(svg, 620, 250, 'Transsellüler · 1 L', 'f69-s f69-b', 'end'); T(svg, 620, 264, 'BOS, göz, eklem sıvısı', 'f69-s', 'end');
        T(svg, 420, 232, 'hücre zarı (fosfolipit çift tabaka)', 'f69-s', 'end'); T(svg, 566, 232, 'kapiller endotel', 'f69-s', 'start');
      } else {
        T(svg, 180, 156, 'Hücre içi sıvı · 28 L', 'f69-t f69-b', 'middle');
        T(svg, 180, 282, 'İnterstisyel · 10 L', 'f69-t f69-b', 'middle');
        T(svg, 180, 348, 'Plazma · 3 L', 'f69-s f69-b', 'middle');
        T(svg, 10, 382, 'Transsellüler · 1 L (BOS, göz, eklem)', 'f69-s f69-b');
        T(svg, 346, 241, 'hücre zarı', 'f69-s', 'end'); T(svg, 346, 327, 'kapiller endotel', 'f69-s', 'end');
      }
      const l1 = T(svg, dar ? 10 : 20, dar ? 406 : 290, 'İnterstisyel = HDS − plazma', 'f69-t');
      const l2 = T(svg, dar ? 10 : 20, dar ? 424 : 308, 'HİS = toplam su − HDS = 42 − 14 = 28 L', 'f69-t');
      // noktacıklar
      const area = (k) => R[k][2] * R[k][3];
      const pick = (keys, n) => { const tot = keys.reduce((a, k) => a + area(k), 0); const out = []; keys.forEach((k) => { const c = Math.max(3, Math.round(n * area(k) / tot)); for (let i = 0; i < c; i++) out.push([k, R[k][0] + 6 + rnd() * (R[k][2] - 12), R[k][1] + 6 + rnd() * (R[k][3] - 12)]); }); return out; };
      const plzC = [R.plz[0] + R.plz[2] / 2, R.plz[1] + R.plz[3] / 2];
      const gDots = S('g', {}, svg);
      let dots = [], prog = 1;
      const build = () => {
        gDots.innerHTML = ''; dots = [];
        if (mode === 'bos') return;
        let tg, blocked = [], n;
        if (mode === 'alb') { tg = pick(['plz'], 16); n = 8; for (let i = 0; i < n; i++) blocked.push(dar ? [R.int[0] + 20 + rnd() * (R.int[2] - 40), R.plz[1] - 5 - rnd() * 8, 'end'] : [R.plz[0] - 5 - rnd() * 8, R.int[1] + 14 + rnd() * (R.int[3] - 28), 'end']); }
        else if (mode === 'tio') { tg = pick(['plz', 'int', 'trs'], 56); n = 8; for (let i = 0; i < n; i++) blocked.push(dar ? [R.his[0] + 20 + rnd() * (R.his[2] - 40), R.int[1] + 5 + rnd() * 8, 'mem'] : [R.int[0] + 5 + rnd() * 8, R.int[1] + 14 + rnd() * (R.int[3] - 28), 'mem']); }
        else tg = pick(['his', 'int', 'plz', 'trs'], 96);
        tg.concat(blocked.map((b) => [b[2], b[0], b[1]])).forEach(([k, x, y]) => { const c = S('circle', { r: 3.2, class: 'f69-bo-dot' + (k === 'trs' && mode === 'tio' ? ' soluk' : '') }, gDots); dots.push({ c, x, y, d: rnd() * 0.25 }); });
        prog = RM ? 1 : 0; flash.mem = flash.end = 0; upd();
      };
      const upd = () => {
        dots.forEach((d) => { const f = ease(clamp((prog - d.d) / 0.75, 0, 1)); d.c.setAttribute('cx', (lerp(plzC[0], d.x, f)).toFixed(1)); d.c.setAttribute('cy', (lerp(plzC[1], d.y, f)).toFixed(1)); });
        mem.style.stroke = flash.mem > 0 ? 'var(--crit)' : ''; mem.style.opacity = flash.mem > 0 ? 0.4 + 0.6 * flash.mem : ''; end.style.stroke = flash.end > 0 ? 'var(--crit)' : ''; end.style.opacity = flash.end > 0 ? 0.4 + 0.6 * flash.end : '';
        roz.textContent = ROZ[mode] || '';
        l1.setAttribute('class', 'f69-t' + (mode === 'alb' || mode === 'tio' ? ' f69-b' : ' f69-dim')); l2.setAttribute('class', 'f69-t' + (mode === 'tio' || mode === 'd2o' ? ' f69-b' : ' f69-dim'));
      };
      build();
      const ctl = div('f69-ctl', el);
      const sg = seg('İndikatör', [['bos', 'Bölmeler'], ['alb', 'İşaretli albümin'], ['tio', 'Tiyosülfat'], ['d2o', 'Döteryumlu su (²H₂O)']], mode, (v) => { mode = v; v === 'bos' ? cap.reset() : cap.set(CAP[v]); build(); });
      ctl.appendChild(sg);
      const stop = RM ? () => {} : ticker(el, (dt) => {
        if (prog < 1) { prog = Math.min(1, prog + dt / 1.2); if (prog > 0.6) { if (mode === 'alb') flash.end = Math.max(flash.end, 1); if (mode === 'tio') flash.mem = Math.max(flash.mem, 1); } upd(); }
        else if (flash.mem > 0 || flash.end > 0) { flash.mem = Math.max(0, flash.mem - dt / 1.5); flash.end = Math.max(0, flash.end - dt / 1.5); upd(); }
      });
      return stop;
    });
  };

  /* ---------- 2 · Na⁺ dengesi ve HDS hacmi ---------- */
  VIZ.f69_nadenge = (el) => {
    const cap = mkCap(el); let mode = 'denge', lvl = 0.6;
    const LV = { az: 0.84, denge: 0.6, cok: 0.36 }, TH = { az: 2, denge: 9, cok: 20 };
    const CAP = {
      az: '**Net böbrek Na⁺ kazancı → HDS genişler.** Fazla hacim kalp kasını gerer (sol ventrikül yetmezliği) ve böbrek, kalp, retinaya zarar veren hipertansiyon yapar. [[K1 s. 318–319]]',
      cok: '**Net böbrek Na⁺ kaybı → HDS küçülür.** Venöz dönüş, ön yük ve kalp debisi düşer; hipotansiyon ve organ iskemisi gelir. [[K1 s. 318–319]]',
    };
    return mount(el, (dar) => {
      const W = dar ? 360 : 640, H = dar ? 372 : 262;
      const svg = svgRoot(W, H, 'HDS kovası: Na⁺ alımı, böbrek dışı kayıp ve böbrek atılımı', dar, el);
      const bx = dar ? 130 : 240, by = dar ? 74 : 40, bw = dar ? 100 : 160, bh = dar ? 140 : 170;
      const water = S('rect', { x: bx, class: 'f69-na-su', width: bw }, svg);
      const gd = S('g', {}, svg); const nd = [];
      for (let i = 0; i < 30; i++) { const x = bx + 10 + rnd() * (bw - 20), y = by + 10 + rnd() * (bh - 20); nd.push([x, y, S('circle', { cx: x, cy: y, r: 3.4, class: 'f69-na-dot' }, gd)]); }
      S('path', { d: `M${bx} ${by} V${by + bh} H${bx + bw} V${by}`, class: 'f69-na-kova' }, svg);
      T(svg, bx + bw / 2, by + bh / 2 + 4, 'HDS', 'f69-t f69-b f69-onsu', 'middle');
      // oklar
      if (!dar) {
        arrow(svg, 70, 70, bx - 4, 70, 9, 'var(--muted)'); T(svg, 70, 54, 'Alım (diyet, damar yolu)', 'f69-s');
        arrow(svg, bx + bw + 4, 100, 590, 100, 3, 'var(--muted)'); T(svg, bx + bw + 6, 86, 'Böbrek dışı kayıp (terleme, dışkı)', 'f69-s');
      } else {
        arrow(svg, 16, 100, bx - 4, 100, 9, 'var(--muted)'); T(svg, 10, 56, 'Alım (diyet, damar yolu)', 'f69-s');
        arrow(svg, bx + bw + 4, 100, 340, 100, 3, 'var(--muted)'); T(svg, 350, 70, 'Böbrek dışı', 'f69-s', 'end'); T(svg, 350, 84, 'kayıp', 'f69-s', 'end');
      }
      const ay = by + bh + 2; const gArr = S('g', {}, svg);
      T(svg, bx + bw / 2 + 24, ay + 36, 'Böbrek atılımı', 'f69-s f69-b'); 
      const nt = wrapT(svg, 12, dar ? 296 : 150, 'Su pompası yok: su Na⁺\'u izler. Na⁺ + anyon = ozmotik etkinliğin > %90\'ı.', dar ? 50 : 30, 'f69-s', 15);
      const res = S('g', {}, svg);
      const draw = () => {
        const top = by + bh - lvl * bh; water.setAttribute('y', top); water.setAttribute('height', by + bh - top);
        nd.forEach(([x, y, c]) => { c.style.opacity = y > top + 6 ? 1 : 0; });
        gArr.innerHTML = ''; const th = lerp(TH.az, TH.cok, clamp((0.84 - lvl) / 0.48, 0, 1)); arrow(gArr, bx + bw / 2, ay, bx + bw / 2, ay + 32, th, 'var(--warn)');
        res.innerHTML = ''; const x0 = dar ? 12 : 420, y0 = dar ? 322 : 150, mx = dar ? 50 : 32;
        if (mode !== 'denge') {
          const up = mode === 'az';
          T(res, x0, y0, up ? 'HDS hacmi ↑' : 'HDS hacmi ↓', 'f69-t f69-b ' + (up ? 'f69-warn' : 'f69-crit'));
          wrapT(res, x0, y0 + 16, up ? 'ön yük ↑ → hipertansiyon, sol ventrikül yetmezliği riski' : 'venöz dönüş ↓ → kalp debisi ↓ → hipotansiyon, organ iskemisi', mx, 'f69-s', 15);
        }
      };
      draw();
      const ctl = div('f69-ctl', el);
      ctl.appendChild(seg('Böbrek Na⁺ atılımı', [['az', 'Az (net kazanç)'], ['denge', 'Denge'], ['cok', 'Çok (net kayıp)']], mode, (v) => { mode = v; v === 'denge' ? cap.reset() : cap.set(CAP[v]); if (RM) { lvl = LV[v]; draw(); } }));
      if (RM) return () => {};
      return ticker(el, (dt) => { const t = LV[mode]; if (Math.abs(lvl - t) > 0.002) { lvl += (t - lvl) * Math.min(1, dt * 3.2); draw(); } });
    });
  };

  /* ---------- 3 · Ozmolarite hesaplayıcısı ve ozmolar açık ---------- */
  VIZ.f69_osmol = (el) => {
    const cap = mkCap(el); const st = { na: 140, k: 4, glu: 5, ure: 5, ek: 'yok' };
    const EK = { yok: [0, ''], alkol: [25, 'Alkol'], metanol: [25, 'Metanol'], etilen: [25, 'Etilen glikol'], trig: [25, 'Hipertrigliseridemi'] };
    return mount(el, (dar) => {
      const wrap = div('f69-osm' + (dar ? ' f69-osm-dar' : ''), el);
      const left = div('f69-osm-l', wrap), right = div('f69-osm-r', wrap);
      const rs = [['na', 'Na⁺', 110, 170, 1, 'mmol/L', 0], ['k', 'K⁺', 2, 8, 0.1, 'mmol/L', 1], ['glu', 'Glukoz', 2, 40, 1, 'mmol/L', 0], ['ure', 'Üre', 2, 40, 1, 'mmol/L', 0]];
      const ctr = {};
      rs.forEach(([k, l, a, b, s, u, d]) => { const r = range(l, a, b, s, st[k], u, (v) => { st[k] = v; draw(); }, d); ctr[k] = r; left.appendChild(r.w); });
      left.appendChild(seg('Ölçülmeyen madde', [['yok', 'Yok'], ['alkol', 'Alkol'], ['metanol', 'Metanol'], ['etilen', 'Etilen glikol'], ['trig', 'Hipertrigliseridemi']], st.ek, (v) => { st.ek = v; draw(true); }));
      // beherler
      const bsv = svgRoot(300, 72, 'NaCl iki, glukoz bir ozmol verir', dar, right); bsv.setAttribute('class', 'f69-svg f69-osm-bh');
      const beher = (x, n) => { S('path', { d: `M${x} 6 V56 Q${x} 64 ${x + 8} 64 H${x + 52} Q${x + 60} 64 ${x + 60} 56 V6`, class: 'f69-na-kova' }, bsv); S('rect', { x: x + 1, y: 26, width: 58, height: 37, class: 'f69-na-su' }, bsv); for (let i = 0; i < n; i++) S('circle', { cx: x + 12 + (i % 3) * 18, cy: 38 + Math.floor(i / 3) * 14, r: 4, class: i % 2 && n === 6 ? 'f69-osm-cl' : 'f69-na-dot' }, bsv); };
      beher(8, 6); beher(158, 3);
      ['1 mol NaCl', '→ Na⁺ + Cl⁻', '= 2 Osmol'].forEach((t, i) => T(bsv, 74, 24 + i * 16, t, 'f69-s' + (i === 2 ? ' f69-b' : ''), 'start')); ['1 mol glukoz', '= 1 Osmol'].forEach((t, i) => T(bsv, 224, 24 + i * 16, t, 'f69-s' + (i === 1 ? ' f69-b' : ''), 'start'));
      const W = 300, H = 150; const sv = svgRoot(W, H, 'Hesaplanan ozmolarite ve ölçülen ozmolalite çubukları', dar, right);
      hatch(sv, 'f69-osm-h', 'var(--crit)');
      const sx = (v) => 10 + v / 460 * 280;
      S('rect', { x: sx(285), y: 8, width: sx(295) - sx(285), height: 108, class: 'f69-osm-bant' }, sv);
      const g = S('g', {}, sv);
      const draw = (fromEk) => {
        g.innerHTML = '';
        const parts = [['2×Na⁺', 2 * st.na, 'f69-osm-na'], ['2×K⁺', 2 * st.k, 'f69-osm-k'], ['glu', st.glu, 'f69-osm-glu'], ['üre', st.ure, 'f69-osm-ure']];
        const calc = parts.reduce((a, p) => a + p[1], 0), ek = EK[st.ek][0];
        let x = 10; T(g, 10, 22, 'Hesaplanan ozmolarite = ' + fmt(calc, 0) + ' mOsmol/L', 'f69-s f69-b');
        parts.forEach(([l, v, c]) => { const w = v / 460 * 280; S('rect', { x, y: 30, width: Math.max(w, 1), height: 24, class: c }, g); if (w > 24) T(g, x + w / 2, 46, l, 'f69-s f69-onc', 'middle'); x += w; });
        T(g, 10, 76, 'Ölçülen ozmolalite (donma noktası alçalması) = ' + fmt(calc + ek, 0), 'f69-s f69-b');
        x = 10; parts.forEach(([l, v, c]) => { const w = v / 460 * 280; S('rect', { x, y: 84, width: Math.max(w, 1), height: 24, class: c }, g); x += w; });
        if (ek) { S('rect', { x, y: 84, width: ek / 460 * 280, height: 24, fill: 'url(#f69-osm-h)', stroke: 'var(--crit)' }, g); T(g, Math.min(x, 150), 128, 'Ozmolar açık = ' + ek + ' (' + EK[st.ek][1] + ')', 'f69-s f69-b f69-crit'); }
        else T(g, 10, 128, 'Ozmolar açık = 0', 'f69-s');
        T(g, 10, 146, '2×' + st.na + ' + 2×' + fmt(st.k, 1) + ' + ' + st.glu + ' + ' + st.ure + ' = ' + fmt(calc, 0), 'f69-s f69-mono');
        const f = Math.round(calc * 10) / 10, sc = fmt(f, f % 1 ? 1 : 0);
        if (st.ek !== 'yok') cap.set(`**Ozmolar açık ${ek}.** Ölçülen ozmolalite − hesaplanan ozmolarite; ${EK[st.ek][1].toLocaleLowerCase('tr')} formüle girmeyen ozmotik etkin parçacık ekler. Nedenler: alkol, hipertrigliseridemi, metanol, etilen glikol. [[K1 s. 319]]`);
        else if (st.na === 140 && st.k === 4 && st.glu === 5 && st.ure === 5) cap.reset();
        else cap.set(`**Hesaplanan ozmolarite ${sc} mOsmol/L.** Na⁺ ve K⁺ eş anyonları için ikiyle çarpılır. Normal plazma 285–295 mOsmol/L. [[K1 s. 319–320]]`);
      };
      draw();
      return () => {};
    });
  };

  /* ---------- 4 · Alyuvar ve tonisite ---------- */
  VIZ.f69_tonisite = (el) => {
    const cap = mkCap(el); let mode = 'izo', stage = 1, t = 0, dRaw = 1, auto = null;
    const OSM = { izo: 290, hiper: 380, hipo: 150, su: 0, dek: 278 };
    const D = { izo: 1, hiper: 0.75, hipo: 1.2, dek: 1.02 };
    const SPK = { hiper: 0.07 };
    const CAP = {
      hiper: '**Hipertonik HDS.** Su ozmozla hücreden çıkar; hücre büzülür. [[K1 s. 319]]',
      hipo: '**Hipotonik HDS.** Su ozmozla hücreye girer; hücre şişer. Ağır hiponatremide beyinde bu şişme kafa içi basınç artışı, nöbet, bilinç değişikliği ve herniasyon yapabilir. [[K1 s. 319–320]]',
      su: '**Periferik vene steril su.** Venöz kan akut hipotonik olur; alyuvar sınırlı fazla suyu aşınca hemolize olur. [[K1 s. 319–320]]',
      dek: '**%5 dekstroz: 278 mOsmol/L**, plazmaya (285–295) yakın, yani yaklaşık izotonik. Glukoz metabolize olunca serbest su verilmiş gibidir, ama ozmolarite akut düşmez. [[K1 s. 320]]',
    };
    const target = () => (mode === 'su' ? (t < 2 ? lerp(1, 1.35, t / 2) : 1.35) : mode === 'dek' ? 1.02 : D[mode]);
    return mount(el, (dar) => {
      const uid = ++UID, mk = 'f69-mk' + uid;
      const W = dar ? 360 : 640, H = dar ? 318 : 262;
      const svg = svgRoot(W, H, 'Alyuvarın ortam ozmolaritesine göre şişmesi ya da büzülmesi', dar, el);
      marker(svg, 'var(--accent)', mk);
      const cx = dar ? 180 : 235, cy = dar ? 104 : 130, R0 = dar ? 46 : 58;
      const bg = S('rect', dar ? { x: 8, y: 8, width: 344, height: 192, rx: 14, class: 'f69-to-bg' } : { x: 20, y: 18, width: 430, height: 224, rx: 14, class: 'f69-to-bg' }, svg);
      const gl = S('g', {}, svg), body = S('path', { class: 'f69-to-cell' }, svg), dimple = S('ellipse', { class: 'f69-to-dim', cx, cy }, svg);
      const gp = S('g', {}, svg), ga = S('g', {}, svg), lab = T(svg, cx, dar ? 196 : 232, '', 'f69-t f69-b', 'middle');
      lab.setAttribute('y', dar ? 192 : 230);
      // glukoz noktaları
      const gdots = []; for (let i = 0; i < 14; i++) { const a = rnd() * 6.283, r = R0 * 1.55 + rnd() * 30; gdots.push(S('circle', { cx: cx + Math.cos(a) * r * (dar ? 1.3 : 1.5), cy: cy + Math.sin(a) * r * 0.8, r: 3.2, class: 'f69-na-dot' }, gl)); }
      const parts = []; for (let i = 0; i < 18; i++) parts.push({ a: rnd() * 6.283, v: 25 + rnd() * 35, c: S('circle', { r: 3, class: 'f69-to-hb' }, gp) });
      // ozmolarite ölçeği
      const sg = S('g', {}, svg); const mrk = S('g', {}, svg);
      const sc = dar ? (v) => 20 + v / 400 * 320 : (v) => 232 - v / 400 * 200;
      if (!dar) {
        S('rect', { x: 494, y: sc(295), width: 14, height: sc(285) - sc(295), class: 'f69-bant' }, sg); S('line', { x1: 501, x2: 501, y1: sc(400), y2: sc(0), class: 'f69-ax' }, sg);
        [0, 100, 200, 300, 400].forEach((v) => T(sg, 488, sc(v) + 4, v, 'f69-s', 'end'));
        T(sg, 466, 20, 'mOsmol/L', 'f69-s', 'start').setAttribute('x', 462);
      } else {
        S('rect', { x: sc(285), y: 224, width: sc(295) - sc(285), height: 14, class: 'f69-bant' }, sg); S('line', { x1: sc(0), x2: sc(400), y1: 231, y2: 231, class: 'f69-ax' }, sg);
        [0, 100, 200, 300, 400].forEach((v) => T(sg, sc(v), 258, v, 'f69-s', 'middle')); T(sg, 20, 276, 'mOsmol/L · bant: plazma 285–295', 'f69-s');
      }
      const pathCell = (d) => { const sp = SPK[mode] || 0, R = R0 * d, pts = []; for (let i = 0; i < 90; i++) { const th = i / 90 * 6.2832, r = R * (1 + (mode === 'hiper' ? sp * Math.cos(18 * th) : 0)); pts.push((cx + Math.cos(th) * r).toFixed(1) + ' ' + (cy + Math.sin(th) * r).toFixed(1)); } return 'M' + pts.join('L') + 'Z'; };
      const draw = () => {
        const d = dRaw, burst = mode === 'su' && t >= 2;
        body.setAttribute('d', pathCell(Math.min(d, 1.35)));
        body.style.strokeDasharray = burst ? '5 4' : ''; body.style.fillOpacity = burst ? 0.35 : '';
        const dr = R0 * d * 0.45 * clamp((1.38 - d) / 0.38, 0, 1); dimple.setAttribute('rx', dr.toFixed(1)); dimple.setAttribute('ry', (dr * 0.85).toFixed(1)); dimple.style.opacity = burst ? 0 : 1;
        const o = mode === 'dek' && stage === 2 ? 'serbest' : OSM[mode];
        bg.style.fill = osmRenk(mode === 'dek' && stage === 2 ? 290 : OSM[mode]);
        gdots.forEach((c) => { c.style.opacity = mode === 'dek' && stage === 1 ? 1 : 0; });
        gp.style.display = burst ? '' : 'none';
        parts.forEach((p) => { const f = RM ? 1 : clamp((t - 2) / 1.4, 0, 1), r = R0 * 1.35 + f * p.v * 1.2; p.c.setAttribute('cx', (cx + Math.cos(p.a) * r).toFixed(1)); p.c.setAttribute('cy', (cy + Math.sin(p.a) * r * 0.85).toFixed(1)); p.c.style.opacity = burst ? 1 - f * 0.4 : 0; });
        ga.innerHTML = '';
        const dir = burst ? 0 : mode === 'hiper' ? 1 : mode === 'hipo' || mode === 'su' ? -1 : 0;
        for (let i = 0; i < 8; i++) { const a = i / 8 * 6.2832 + 0.39, r1 = R0 * d + 8, L = dir === 0 ? 0 : 20 * Math.abs(dir) + 6; const ux = Math.cos(a), uy = Math.sin(a) * 0.9; if (dir === 0 && !burst) { S('line', { x1: cx + ux * (r1 + 6), y1: cy + uy * (r1 + 6), x2: cx + ux * (r1 + 20), y2: cy + uy * (r1 + 20), class: 'f69-to-eq' }, ga); } else if (dir > 0) S('line', { x1: cx + ux * r1, y1: cy + uy * r1, x2: cx + ux * (r1 + L), y2: cy + uy * (r1 + L), class: 'f69-to-ar', 'marker-end': `url(#${mk})` }, ga); else if (dir < 0) S('line', { x1: cx + ux * (r1 + L), y1: cy + uy * (r1 + L), x2: cx + ux * r1, y2: cy + uy * r1, class: 'f69-to-ar', 'marker-end': `url(#${mk})` }, ga); }
        lab.textContent = burst ? 'Hemoliz' : mode === 'hiper' ? 'Hücre büzülür (krenasyon)' : mode === 'hipo' ? 'Hücre şişer' : mode === 'dek' ? (stage === 2 ? 'Serbest su · ozmolarite akut düşmedi' : 'Glukoz ortamda: yaklaşık izotonik') : mode === 'su' ? 'Su girer, hücre şişiyor…' : 'Su girişi = su çıkışı';
        lab.setAttribute('class', 'f69-t f69-b' + (burst ? ' f69-crit' : ''));
        // ölçek işareti
        mrk.innerHTML = ''; const v = mode === 'dek' && stage === 2 ? 0 : OSM[mode]; const lbl = mode === 'izo' ? 'Plazma ile aynı' : mode === 'dek' && stage === 2 ? 'serbest su' : '' + v;
        if (!dar) { S('path', { d: `M${516} ${sc(v)} l12 -7 v14z`, class: 'f69-to-mk' }, mrk); T(mrk, 532, sc(v) + (mode === 'izo' ? 22 : 4), mode === 'izo' ? '≈ 290 (seçilen)' : (mode === 'su' ? '0 (steril su)' : mode === 'dek' ? '278' : '' + v), 'f69-s f69-b'); T(mrk, 532, sc(290) - 8, '', 'f69-s'); }
        else { S('path', { d: `M${sc(v)} 222 l-7 -12 h14z`, class: 'f69-to-mk' }, mrk); }
      };
      const ctl = div('f69-ctl', el);
      const setMode = (v) => { mode = v; stage = 1; t = 0; dRaw = v === 'su' ? 1 : target(); clearTimeout(auto); v === 'izo' ? cap.reset() : cap.set(CAP[v]); next.style.display = v === 'dek' ? '' : 'none'; if (RM && v === 'su') { t = 5; dRaw = 1.35; } if (v === 'dek' && !RM) auto = setTimeout(() => go2(), 2200); draw(); };
      const go2 = () => { if (mode !== 'dek' || stage === 2) return; stage = 2; cap.set('**Glukoz metabolize oldu.** %5 dekstroz serbest su vermiş gibi olur; ama hücre dışı ozmolarite akut olarak düşmediği için alyuvar hemolize olmaz. [[K1 s. 320]]'); draw(); };
      ctl.appendChild(seg('Çözelti', [['izo', 'İzotonik'], ['hiper', 'Hipertonik'], ['hipo', 'Hipotonik'], ['su', 'Steril su (IV)'], ['dek', '%5 dekstroz']], mode, setMode));
      const next = btn('Glukoz metabolize oldu →'); next.style.display = mode === 'dek' ? '' : 'none'; next.addEventListener('click', go2); ctl.appendChild(next);
      dRaw = target(); draw();
      const stop = RM ? () => {} : ticker(el, (dt) => { if (mode === 'su') t += dt; const tg = target(); if (Math.abs(dRaw - tg) > 0.001 || mode === 'su') { dRaw = mode === 'su' ? tg : dRaw + (tg - dRaw) * Math.min(1, dt * 4); draw(); } });
      return () => { clearTimeout(auto); stop(); };
    });
  };

  /* ---------- 5 · Ozmolarite → ADH → aquaporin 2 → idrar ---------- */
  VIZ.f69_adh = (el) => {
    const cap = mkCap(el); let P = 290, ac = null, pulse = 0;
    const aOf = (p) => clamp((p - 280) / 20, 0, 1);
    const capFor = (p) => (p >= 285 && p <= 295 ? null : p > 295 ? `**Ozmolarite yükseldi (${p}).** OVLT ve subfornikal organdaki ozmoreseptörler %1'lik değişikliği bile algılar. Hipotalamus susuzluğu uyarır ve arka hipofizden ADH salgılatır; ADH V2 → cAMP yoluyla aquaporin 2 yerleştirir, su medüllaya geçer, idrar yoğunlaşır. [[K1 s. 320]]` : `**Ozmolarite düştü (${p}).** Susuzluk azalır, ADH baskılanır; toplayıcı kanal suya geçirgen değildir, filtrat seyreltik idrar olarak atılır. [[K1 s. 320]]`);
    return mount(el, (dar) => {
      const W = dar ? 360 : 640, H = dar ? 636 : 352;
      const svg = svgRoot(W, H, 'ADH döngüsü: hipotalamus ve hipofizden toplayıcı kanalda aquaporin 2 yerleşmesine ve idrar yoğunluğuna', dar, el);
      const uid = ++UID, gid = 'f69-gadh' + uid;
      const gr = S('linearGradient', { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 }, defs(svg));
      [300, 600, 900, 1200].forEach((v, i) => S('stop', { offset: i / 3, style: 'stop-color:' + osmRenk(v) }, gr));
      const L = S('g', { transform: `translate(${dar ? 30 : 10} ${dar ? 22 : 24})` }, svg);
      const Rg = S('g', { transform: `translate(${dar ? 30 : 330} ${dar ? 310 : 24})` }, svg);
      // --- sol panel
      T(L, 0, -8, 'Beyin ve arka hipofiz', 'f69-t f69-b');
      S('path', { d: 'M8 26 h22 l-3 24 q-1 6 -8 6 q-7 0 -8 -6z', class: 'f69-ad-cup' }, L);
      const thFill = S('rect', { x: 9, y: 50, width: 20, height: 0, class: 'f69-ad-cupf' }, L);
      T(L, 42, 30, 'Susuzluk', 'f69-s'); S('rect', { x: 42, y: 38, width: 80, height: 7, rx: 3, class: 'f69-ad-mtr' }, L); const thM = S('rect', { x: 42, y: 38, width: 0, height: 7, rx: 3, class: 'f69-ad-mtrf' }, L);
      S('circle', { cx: 150, cy: 98, r: 40, class: 'f69-ad-hyp' }, L); T(L, 150, 122, 'Hipotalamus', 'f69-s f69-b', 'middle');
      const o1 = S('circle', { cx: 134, cy: 90, r: 6, class: 'f69-ad-rec' }, L), o2 = S('circle', { cx: 166, cy: 90, r: 6, class: 'f69-ad-rec' }, L);
      S('line', { x1: 134, y1: 84, x2: 100, y2: 70, class: 'f69-ad-ld' }, L); T(L, 98, 69, 'OVLT', 'f69-s', 'end');
      S('line', { x1: 166, y1: 84, x2: 204, y2: 70, class: 'f69-ad-ld' }, L); T(L, 207, 67, 'Subfornikal', 'f69-s'); T(L, 207, 80, 'organ', 'f69-s');
      S('line', { x1: 150, y1: 138, x2: 150, y2: 172, class: 'f69-ad-ax' }, L);
      S('rect', { x: 105, y: 172, width: 90, height: 44, rx: 12, class: 'f69-ad-hip' }, L);
      const gran = []; for (let i = 0; i < 8; i++) gran.push(S('circle', { cx: 120 + (i % 4) * 20, cy: 186 + Math.floor(i / 4) * 16, r: 4, class: 'f69-ad-gr' }, L));
      T(L, 150, 234, 'Arka hipofiz', 'f69-s f69-b', 'middle');
      S('line', { x1: 195, y1: 194, x2: 292, y2: 194, class: 'f69-ad-damar' }, L); T(L, 292, 216, 'ADH dolaşımda', 'f69-s', 'end'); T(L, 292, 230, '→ böbreğe', 'f69-s', 'end');
      const dr = []; for (let i = 0; i < 6; i++) dr.push(S('path', { d: 'M0 -5 q4 5 0 8 q-4 -3 0 -8z', class: 'f69-ad-adh' }, L));
      // --- sağ panel
      T(Rg, 0, -8, 'Toplayıcı kanal', 'f69-t f69-b');
      S('rect', { x: 0, y: 0, width: 300, height: 46, class: 'f69-ad-ko' }, Rg); T(Rg, 6, 16, 'Korteks', 'f69-s');
      S('rect', { x: 0, y: 46, width: 300, height: 232, style: `fill:url(#${gid})` }, Rg); T(Rg, 6, 62, 'Medülla', 'f69-s f69-b');
      S('line', { x1: 0, x2: 300, y1: 46, y2: 46, class: 'f69-ad-kes' }, Rg);
      [[300, 'r'], [600, 'r'], [900, 'r'], [1200, 'r']].forEach(([v], i) => T(Rg, 296, 62 + i * 70, v + (i === 0 ? ' mOsmol/L' : ''), 'f69-s f69-onm', 'end'));
      S('rect', { x: 150, y: 0, width: 34, height: 270, class: 'f69-ad-lumen' }, Rg); T(Rg, 167, 14, 'Lümen', 'f69-s', 'middle').setAttribute('class', 'f69-s f69-onp');
      S('rect', { x: 112, y: 76, width: 38, height: 130, rx: 6, class: 'f69-ad-cell' }, Rg); T(Rg, 131, 224, 'Esas hücre', 'f69-s f69-b f69-onm', 'middle');
      S('path', { d: 'M106 130 l8 -6 v12z M106 130 l-6 -5 M106 130 l-6 5', class: 'f69-ad-v2' }, Rg); T(Rg, 98, 126, 'V2', 'f69-s f69-b f69-onm', 'end'); T(Rg, 98, 141, 'reseptörü', 'f69-s f69-onm', 'end');
      const camp = T(Rg, 131, 118, 'cAMP', 'f69-s f69-b f69-clin', 'middle');
      const aq = []; for (let i = 0; i < 8; i++) aq.push(S('rect', { x: 146, y: 82 + i * 15, width: 8, height: 10, rx: 3, class: 'f69-ad-aq' }, Rg));
      T(Rg, 192, 92, 'aquaporin 2', 'f69-s f69-b f69-onm'); S('line', { x1: 190, y1: 90, x2: 156, y2: 88, class: 'f69-ad-ld' }, Rg);
      const wa = S('g', {}, Rg); const fl = []; for (let i = 0; i < 9; i++) fl.push({ y: i * 30, x: 156 + (i % 3) * 9, c: S('circle', { r: 2.8, class: 'f69-na-dot' }, Rg) });
      const drop = S('path', { d: 'M0 0 C-14 14 -14 30 0 30 C14 30 14 14 0 0z', class: 'f69-ad-drop' }, Rg); const dl = T(Rg, 196, 296, '', 'f69-s f69-b'); const dl2 = T(Rg, 196, 311, '', 'f69-s');
      const draw = (c, tm) => {
        const a = aOf(c);
        const thirst = clamp((c - 290) / 15, 0, 1); thFill.setAttribute('height', 8 * thirst); thFill.setAttribute('y', 50 - 8 * thirst); thM.setAttribute('width', 80 * thirst);
        const glow = RM ? a : a * (0.55 + 0.45 * Math.sin(tm * 5)); [o1, o2].forEach((o) => { o.style.opacity = 0.35 + 0.65 * glow; o.setAttribute('r', 6 + 2.5 * glow); });
        gran.forEach((g, i) => { g.style.opacity = 1 - clamp(a * 8 - i, 0, 1) * 0.75; });
        dr.forEach((d, i) => { const on = i < Math.round(a * 6); d.style.opacity = on ? 1 : 0; const f = RM ? (i + 0.5) / 6 : ((tm * 0.35 + i / 6) % 1); d.setAttribute('transform', `translate(${(195 + f * 90).toFixed(1)} ${(190 + (i % 2) * 2)})`); });
        const n = a * 8; aq.forEach((q, i) => { const v = clamp(n - i, 0, 1); q.style.opacity = 0.12 + 0.88 * v; q.setAttribute('x', 146 + (1 - v) * -6); });
        camp.style.opacity = 0.25 + 0.75 * (RM ? a : a * (0.6 + 0.4 * Math.sin(tm * 5 + 1)));
        wa.innerHTML = ''; const nw = Math.round(6 * a); for (let i = 0; i < nw; i++) { const y = 89 + (i + 0.5) * 15 * (8 / 6) * 0.98; if (y < 200) arrow(wa, 176, y, 110, y, 2, 'var(--accent)'); }
        fl.forEach((p) => { const y = RM ? (p.y + 20) % 270 : (p.y + tm * (36 - 14 * a * 0)) % 270; p.c.setAttribute('cx', p.x); p.c.setAttribute('cy', 6 + y * 0.95); });
        const vol = 1.1 - 0.65 * a, uo = 100 + 1100 * a; drop.setAttribute('transform', `translate(168 ${272}) scale(${vol.toFixed(2)})`); drop.style.fill = osmRenk(uo);
        dl.textContent = a < 0.35 ? 'Seyreltik idrar' : a > 0.7 ? 'Yoğun idrar' : 'Orta yoğunlukta idrar'; dl2.textContent = '≈ ' + fmt(Math.round(uo / 10) * 10) + ' mOsmol/L';
      };
      if (ac == null) ac = P;
      draw(ac, 0);
      const ctl = div('f69-ctl', el);
      const r = range('Plazma ozmolaritesi', 270, 310, 1, P, 'mOsmol/L', (v) => { P = v; const t = capFor(v); t ? cap.set(t) : cap.reset(); if (RM) { ac = v; draw(ac, 0); } });
      r.w.classList.add('f69-rng-bant'); ctl.appendChild(r.w);
      if (RM) return () => {};
      let tm = 0;
      return ticker(el, (dt) => { tm += dt; ac += (P - ac) * Math.min(1, dt * 2.6); draw(ac, tm); });
    });
  };

  /* ---------- 6 · Karşı akım çoğaltıcı ---------- */
  const f6 = (v) => [v, v, v, v, v, v];
  const CARPAN = [
    { a: f6(300), b: f6(300), c: f6(300) },
    { a: f6(300), b: f6(400), c: f6(200) },
    { a: f6(350), b: f6(350), c: f6(200) },
    { a: [300, 300, 350, 350, 350, 350], b: f6(350), c: [200, 200, 200, 200, 350, 350] },
    { a: [300, 300, 350, 350, 350, 350], b: [375, 375, 400, 425, 450, 450], c: [125, 150, 175, 200, 250, 250] },
    { a: [300, 400, 600, 800, 1000, 1200], b: [300, 400, 600, 800, 1000, 1200], c: [100, 200, 300, 400, 600, 1000] },
  ];
  const CARPAN_CAP = [
    '**1 · Başlangıç.** PKT su, iyon, amino asit ve glukozu birlikte emdiği için kulpa giren sıvı plazmayla aynı ozmolaritededir: her yerde 300 mOsmol/L. "İleri"ye basın. [[K1 s. 321]]',
    '**2 · Kalın çıkan kol pompalar.** Na⁺/K⁺/2Cl⁻ kotransporteri Na⁺, K⁺ ve Cl⁻\'u filtrattan medüller interstisyuma taşır. Çıkan kol su geçirmediği için filtrat hipo-ozmolar (200), interstisyum hiper-ozmolar (400) olur. [[K1 s. 321]]',
    '**3 · İnen kolda su çıkar.** İnen kolun duvarı suya geçirgendir; su ozmotik gradyanla interstisyuma geçer ve kalan filtrat yoğunlaşır (350). [[K1 s. 321]]',
    '**4 · Filtrat ilerler.** Yoğunlaşmış sıvı kulp boyunca ince çıkan kola ulaşır; burada iyonlar derişim gradyanıyla interstisyuma çıkar. [[K1 s. 321]]',
    '**5 · Yeniden pompa.** Kalın çıkan kolda iyonlar sekonder aktif taşımayla çıkmayı sürdürür; fark kulp boyunca biraz daha büyür. [[K1 s. 321]]',
    '**6 · Kararlı gradyan.** Döngü tekrarlanınca kortekste 300\'den kulp ucunda 1200 mOsmol/L\'ye çıkan medüller gradyan oluşur; DKT\'ye seyreltik (≈ 100) sıvı gider. Bu, karşı akım çoğaltıcıdır. [[K1 s. 321–322]]',
  ];
  const STEPNAV = (ctl, n, getS, setS, onPlay) => {
    const row = div('btn-row f69-stp', ctl);
    const geri = btn('← Geri'), ileri = btn('İleri →', 'btn'), oyn = btn('▶ Oynat'); row.append(geri, ileri, oyn);
    const nums = div('f69-nums', ctl); const nb = [];
    for (let i = 0; i < n; i++) { const b = btn(String(i + 1), 'f69-nb'); b.setAttribute('aria-label', (i + 1) + '. adıma git'); b.addEventListener('click', () => { stopPlay(); setS(i); }); nums.appendChild(b); nb.push(b); }
    let playing = false, acc = 0;
    function stopPlay() { playing = false; acc = 0; oyn.textContent = '▶ Oynat'; }
    const sync = () => { const s = getS(); geri.disabled = s === 0; ileri.textContent = s === n - 1 ? '↺ Baştan' : 'İleri →'; nb.forEach((b, i) => { b.setAttribute('aria-pressed', String(i === s)); b.classList.toggle('on', i === s); }); };
    geri.addEventListener('click', () => { stopPlay(); setS(Math.max(0, getS() - 1)); });
    ileri.addEventListener('click', () => { stopPlay(); setS(getS() === n - 1 ? 0 : getS() + 1); });
    oyn.addEventListener('click', () => { if (playing) stopPlay(); else { playing = true; acc = 0; oyn.textContent = '❚❚ Duraklat'; if (getS() === n - 1) setS(0); } });
    return { sync, tick: (dt) => { if (!playing) return; acc += dt; if (acc >= 4) { acc = 0; if (getS() >= n - 1) stopPlay(); else setS(getS() + 1); } }, stopPlay };
  };
  VIZ.f69_carpan = (el) => {
    const cap = mkCap(el); let step = 0; let cur = CARPAN[0];
    cur = { a: CARPAN[0].a.slice(), b: CARPAN[0].b.slice(), c: CARPAN[0].c.slice() };
    return mount(el, (dar) => {
      const W = dar ? 360 : 640, H = dar ? 452 : 392;
      const svg = svgRoot(W, H, 'Karşı akım çoğaltıcı: inen kol, interstisyum ve çıkan kolda altı seviyede ozmolarite', dar, el);
      const cw = dar ? 56 : 84, xs = dar ? [34, 124, 214] : [100, 204, 308], y0 = dar ? 106 : 80, rh = dar ? 38 : 42;
      const cxs = xs.map((x) => x + cw / 2), yb = y0 + 6 * rh;
      // başlıklar
      T(svg, cxs[0], dar ? 18 : 22, "PKT'den ↓", 'f69-s', 'middle'); T(svg, cxs[2], dar ? 18 : 22, "↑ DKT'ye", 'f69-s', 'middle');
      T(svg, cxs[0], dar ? 50 : 52, 'İnen kol', 'f69-t f69-b', 'middle'); T(svg, cxs[1], dar ? 50 : 52, 'İnterstisyum', 'f69-t f69-b', 'middle'); T(svg, cxs[2], dar ? 50 : 52, 'Çıkan kol', 'f69-t f69-b', 'middle');
      if (dar) { T(svg, cxs[0], 66, 'suya geçirgen', 'f69-s', 'middle'); T(svg, cxs[2], 66, 'su geçmez', 'f69-s', 'middle'); }
      // U dönüşü
      const ub = yb + (dar ? 22 : 26);
      S('path', { d: `M${cxs[0]} ${yb} V${ub - 12} Q${cxs[0]} ${ub} ${cxs[0] + 14} ${ub} H${cxs[2] - 14} Q${cxs[2]} ${ub} ${cxs[2]} ${ub - 12} V${yb}`, class: 'f69-ca-u' }, svg);
      const cells = [[], [], []], txt = [[], [], []];
      for (let col = 0; col < 3; col++) for (let r = 0; r < 6; r++) {
        const rc = S('rect', { x: xs[col], y: y0 + r * rh, width: cw, height: rh, class: 'f69-ca-c' + (col === 2 && r < 3 ? ' kalin' : '') + (col === 2 && r >= 3 ? ' ince' : '') + (col === 0 ? ' inen' : '') + (col === 1 ? ' int' : '') }, svg);
        cells[col].push(rc); txt[col].push(T(svg, xs[col] + cw / 2, y0 + r * rh + rh / 2 + 4.5, '', 'f69-t f69-b', 'middle'));
      }
      const ky = y0 + 3 * rh; S('line', { x1: dar ? 4 : 10, x2: dar ? 350 : 404, y1: ky, y2: ky, class: 'f69-ad-kes' }, svg);
      if (!dar) {
        T(svg, 10, ky - 6, 'Korteks', 'f69-s'); T(svg, 10, ky + 14, 'Medülla', 'f69-s');
        wrapT(svg, 10, 112, 'İnen kol: suya geçirgen', 10, 'f69-s', 14);
        wrapT(svg, 408, y0 + 14, 'Kalın çıkan kol: Na⁺/K⁺/2Cl⁻ kotransporteri, su geçmez', 26, 'f69-s', 15);
        wrapT(svg, 408, y0 + 3 * rh + 14, 'İnce çıkan kol: iyon ve üreye geçirgen, su geçmez', 26, 'f69-s', 15);
      } else {
        T(svg, 280, y0 + 1.5 * rh + 4, 'kalın kol', 'f69-s'); T(svg, 280, y0 + 4.5 * rh + 4, 'ince kol', 'f69-s');
        T(svg, 280, ky - 5, 'Korteks', 'f69-s'); T(svg, 280, ky + 13, 'Medülla', 'f69-s');
      }
      const uTx = T(svg, (cxs[0] + cxs[2]) / 2, ub + 18, '', 'f69-t f69-b f69-warn', 'middle');
      const g1 = S('g', {}, svg), g2 = S('g', {}, svg);
      const gx = dar ? 20 : 408, gy = dar ? yb + 56 : yb - 32;
      const bd = S('g', {}, svg);
      const pts = []; for (let i = 0; i < 30; i++) pts.push({ r: Math.floor(rnd() * 6), p: rnd(), o: rnd(), c: S('circle', { r: 3, class: 'f69-na-dot' }, g1), k: i % 2 });
      const draw = (tm) => {
        for (let col = 0; col < 3; col++) { const arr = col === 0 ? cur.a : col === 1 ? cur.b : cur.c; for (let r = 0; r < 6; r++) { cells[col][r].style.fill = osmRenk(arr[r]); txt[col][r].textContent = Math.round(arr[r]); } }
        uTx.textContent = step === 5 ? '1200 mOsmol/L (kulp ucu)' : '';
        const ion = (step === 1 || step === 4 || step === 5) ? [0, 1, 2] : step === 3 ? [3, 4, 5] : step === 5 ? [0, 1, 2, 3, 4, 5] : [];
        const ionRows = step === 5 ? [0, 1, 2, 3, 4, 5] : ion, wRows = step === 2 || step === 5 ? [0, 1, 2, 3, 4, 5] : [];
        pts.forEach((p) => {
          const rows = p.k ? wRows : ionRows; if (!rows.length) { p.c.style.opacity = 0; return; }
          const r = rows[Math.floor(p.o * rows.length * 0.999)], f = RM ? 0.55 : (tm * 0.5 + p.p) % 1;
          const from = p.k ? xs[0] + cw : xs[2], to = cxs[1];
          p.c.setAttribute('cx', lerp(from, to, f).toFixed(1)); p.c.setAttribute('cy', (y0 + r * rh + 8 + (p.p * (rh - 16))).toFixed(1));
          p.c.style.opacity = Math.sin(f * 3.14159); p.c.setAttribute('class', p.k ? 'f69-ca-su' : 'f69-na-dot');
        });
        bd.innerHTML = '';
        const rows = []; if (step >= 1) rows.push('DKT\'ye giren: hipo-ozmolar'); if (step === 5) rows.push('Uç: 1200 mOsmol/L');
        rows.forEach((t, i) => { const w = dar ? 320 : 214; S('rect', { x: gx - 4, y: gy + i * 34 - 17, width: w, height: 26, rx: 8, class: i ? 'f69-ca-bd w' : 'f69-ca-bd' }, bd); T(bd, gx + 6, gy + i * 34, t, 'f69-s f69-b'); });
      };
      const setS = (i) => { const ch = i !== step; step = i; i === 0 ? cap.reset() : cap.set(CARPAN_CAP[i]); nav.sync(); target = CARPAN[i]; if (RM || !ch) { cur = { a: target.a.slice(), b: target.b.slice(), c: target.c.slice() }; draw(0); } };
      let target = CARPAN[step], tm = 0;
      const ctl = div('f69-ctl', el); const nav = STEPNAV(ctl, 6, () => step, setS);
      nav.sync(); cur = { a: target.a.slice(), b: target.b.slice(), c: target.c.slice() }; draw(0);
      if (RM) return () => {};
      const stop = ticker(el, (dt) => { tm += dt; nav.tick(dt); let mv = false; ['a', 'b', 'c'].forEach((k) => { for (let r = 0; r < 6; r++) { const d = target[k][r] - cur[k][r]; if (Math.abs(d) > 0.4) { cur[k][r] += d * Math.min(1, dt * 4); mv = true; } else cur[k][r] = target[k][r]; } }); draw(tm); });
      return () => { nav.stopPlay(); stop(); };
    });
  };

  /* ---------- 7 · Düz damar ile firkete vasa rekta ---------- */
  VIZ.f69_vasa = (el) => {
    const cap = mkCap(el); let mode = 'firkete', wash = 0;
    const CAP = {
      duz: '**Düz damar (varsayımsal).** Medülladan tek yönde geçen kan, çözünenleri taşıyıp götürür ve medüller ozmolar gradyanı yıkar. [[K1 s. 321]]',
      ure: '**Üre.** Süzülen ürenin yaklaşık %40\'ı idrarla atılır; geri emilen üre medüller interstisyum ozmolaritesinin yaklaşık yarısını sağlar. [[K1 s. 323]]',
    };
    return mount(el, (dar) => {
      const W = dar ? 360 : 640, H = dar ? 452 : 372;
      const svg = svgRoot(W, H, 'Medüllada firkete biçimli vasa rekta ve varsayımsal düz damar', dar, el);
      const uid = ++UID, gid = 'f69-gvasa' + uid;
      const gr = S('linearGradient', { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 }, defs(svg)); const stops = [0, 1, 2, 3].map((i) => S('stop', { offset: i / 3 }, gr));
      const bg = dar ? [40, 34, 310, 250] : [44, 38, 400, 276], inX = dar ? 110 : 170, outX = dar ? 200 : 300, topY = bg[1] + 16, ur = (outX - inX) / 2, cyU = bg[1] + bg[3] - 22 - ur, cxU = (inX + outX) / 2;
      S('rect', { x: bg[0], y: bg[1], width: bg[2], height: bg[3], rx: 10, style: `fill:url(#${gid})`, class: 'f69-va-bg' }, svg);
      [300, 600, 900, 1200].forEach((v, i) => T(svg, bg[0] - 6, bg[1] + 14 + i * (bg[3] - 28) / 3, v, 'f69-s', 'end'));
      T(svg, 6, bg[1] - 6, 'mOsmol/L', 'f69-s');
      const uPath = `M${inX} ${topY} V${cyU} A${ur} ${ur} 0 0 0 ${outX} ${cyU} V${topY}`;
      const dPath = `M${cxU} ${topY} V${bg[1] + bg[3] - 12}`;
      const gTube = S('g', {}, svg);
      const gArr = S('g', {}, svg), gLab = S('g', {}, svg), gRight = S('g', {}, svg);
      const cellsG = S('g', {}, svg);
      const hid = S('path', { d: uPath, fill: 'none', stroke: 'none' }, svg), hid2 = S('path', { d: dPath, fill: 'none', stroke: 'none' }, svg);
      const cells = []; for (let i = 0; i < 12; i++) cells.push(S('circle', { r: 3.6, class: 'f69-va-rbc' }, cellsG));
      let build = () => {
        gTube.innerHTML = ''; gArr.innerHTML = ''; gLab.innerHTML = ''; gRight.innerHTML = '';
        const d = mode === 'duz' ? dPath : uPath;
        S('path', { d, class: 'f69-va-tube' }, gTube); S('path', { d, class: 'f69-va-tube2' }, gTube);
        const dep = (y) => clamp((y - topY) / (cyU + ur - topY), 0, 1);
        if (mode !== 'duz') {
          [0.18, 0.4, 0.62, 0.84].forEach((f, i) => {
            const y = topY + f * (cyU - topY);
            arrow(gArr, inX - 34, y, inX - 12, y, 3, 'var(--warn)'); arrow(gArr, inX - 12, y + 12, inX - 34, y + 12, 3, 'var(--accent)');
            arrow(gArr, outX + 12, y, outX + 34, y, 3, 'var(--warn)'); arrow(gArr, outX + 34, y + 12, outX + 12, y + 12, 3, 'var(--accent)');
            const vin = 300 + dep(y) * 900, vout = vin + 20 * (1 - dep(y));
            T(gLab, inX - 38, y + 9, Math.round(vin / 10) * 10, 'f69-s f69-b', 'end'); T(gLab, outX + 38, y + 9, Math.round(vout / 10) * 10, 'f69-s f69-b');
          });
          if (!dar) { T(gLab, 70, topY + 10, 'Giriş 300', 'f69-s f69-b'); S('rect', { x: 330, y: topY - 2, width: 158, height: 26, rx: 8, class: 'f69-ca-bd w' }, gLab); T(gLab, 338, topY + 15, 'Çıkış ≈ 320 mOsmol/L', 'f69-s f69-b'); }
          else { T(gLab, 52, topY + 6, 'Giriş 300', 'f69-s f69-b'); S('rect', { x: 226, y: topY + 44, width: 120, height: 40, rx: 8, class: 'f69-ca-bd w' }, gLab); T(gLab, 232, topY + 61, 'Çıkış ≈ 320', 'f69-s f69-b'); T(gLab, 232, topY + 76, 'mOsmol/L', 'f69-s f69-b'); }
          T(gLab, cxU, cyU + ur - 8, '1200', 'f69-t f69-b', 'middle');
        } else {
          [0.2, 0.45, 0.7].forEach((f) => { const y = topY + f * (bg[1] + bg[3] - 12 - topY); arrow(gArr, cxU - 8, y, cxU - 40, y, 3, 'var(--warn)'); arrow(gArr, cxU + 8, y + 10, cxU + 40, y + 10, 3, 'var(--accent)'); });
          T(gLab, cxU + 14, topY + 10, 'Giriş 300', 'f69-s f69-b');
          wrapT(gLab, dar ? 224 : 330, topY + (dar ? 80 : 60), 'Kan çözüneni taşıyıp götürür; tek yönlü akışta gradyan korunamaz.', dar ? 18 : 30, 'f69-s', 15);
        }
        if (mode === 'ure') {
          const sx = dar ? 40 : 464, sy = dar ? 296 : 60;
          if (!dar) {
            S('rect', { x: sx, y: sy, width: 26, height: 70, class: 'f69-va-nacl' }, gRight); S('rect', { x: sx, y: sy + 70, width: 26, height: 70, class: 'f69-va-ure' }, gRight);
            T(gRight, sx + 34, sy + 38, 'Diğer ≈ yarı', 'f69-s f69-b'); T(gRight, sx + 34, sy + 108, 'Üre ≈ yarı', 'f69-s f69-b');
            T(gRight, sx - 4, sy - 8, 'Medüller ozmolarite', 'f69-s');
            T(gRight, sx, 232, 'Süzülen üre %100', 'f69-s f69-b'); S('rect', { x: sx, y: 238, width: 160, height: 12, rx: 3, class: 'f69-va-ure' }, gRight);
            T(gRight, sx, 272, 'İdrarla atılan ≈ %40', 'f69-s f69-b'); S('rect', { x: sx, y: 278, width: 64, height: 12, rx: 3, class: 'f69-va-ure' }, gRight);
            wrapT(gRight, sx, 316, 'Karaciğerde yapılır, glomerülde serbestçe süzülür, tübül boyunca geri emilir.', 26, 'f69-s', 15);
          } else {
            S('rect', { x: sx, y: sy, width: 90, height: 18, class: 'f69-va-nacl' }, gRight); S('rect', { x: sx + 90, y: sy, width: 90, height: 18, class: 'f69-va-ure' }, gRight);
            T(gRight, sx + 2, sy + 34, 'Diğer ≈ yarı', 'f69-s f69-b'); T(gRight, sx + 92, sy + 34, 'Üre ≈ yarı', 'f69-s f69-b');
            T(gRight, sx, sy + 56, 'Süzülen üre %100 → idrarla atılan ≈ %40', 'f69-s f69-b'); S('rect', { x: sx, y: sy + 62, width: 200, height: 10, rx: 3, class: 'f69-va-ure' }, gRight); S('rect', { x: sx, y: sy + 78, width: 80, height: 10, rx: 3, class: 'f69-va-ure' }, gRight);
            wrapT(gRight, sx, sy + 108, 'Karaciğerde yapılır, glomerülde serbestçe süzülür, tübül boyunca geri emilir.', 46, 'f69-s', 15);
          }
        }
        paint();
      };
      const paint = () => {
        const w = wash; [300, 600, 900, 1200].forEach((v, i) => { const vv = mode === 'duz' ? 300 + (v - 300) * (1 - 0.67 * w) : v; stops[i].setAttribute('style', 'stop-color:' + osmRenk(vv)); });
        gLab.querySelectorAll('.wash').forEach((n) => n.remove());
        if (mode === 'duz' && w > 0.35) { const t = T(gLab, bg[0] + bg[2] / 2, bg[1] + bg[3] - 8, "Gradyan yıkanır ('washout')", 'f69-t f69-b f69-crit wash', 'middle'); t.style.opacity = clamp((w - 0.35) / 0.4, 0, 1); }
      };
      const setH = () => svg.setAttribute('viewBox', `0 0 ${W} ${mode === 'ure' ? H : bg[1] + bg[3] + 14}`);
      build(); paint(); setH();
      const place = (tm) => { const p = mode === 'duz' ? hid2 : hid, L = p.getTotalLength(); cells.forEach((c, i) => { const f = RM ? (i + 0.5) / cells.length : ((tm * 0.07 + i / cells.length) % 1); const pt = p.getPointAtLength(f * L); c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1)); }); };
      place(0);
      const ctl = div('f69-ctl', el);
      ctl.appendChild(seg('Damar türü', [['firkete', 'Firkete (vasa rekta)'], ['duz', 'Düz damar (varsayımsal)'], ['ure', 'Üre']], mode, (v) => { mode = v; wash = RM && v === 'duz' ? 1 : 0; v === 'firkete' ? cap.reset() : cap.set(CAP[v]); build(); place(0); setH(); }));
      if (RM) { return () => {}; }
      let tm = 0;
      return ticker(el, (dt) => { tm += dt; const tw = mode === 'duz' ? 1 : 0; if (wash !== tw) { wash = tw ? Math.min(1, wash + dt / 3) : Math.max(0, wash - dt * 2); paint(); } place(tm); });
    });
  };

  /* ---------- 8 · Diyabet insipit ve SIADH ---------- */
  VIZ.f69_di = (el) => {
    const cap = mkCap(el); let mode = 'normal';
    const CAP = {
      santral: '**Santral DI.** Arka hipofiz yeterli ADH salgılamaz; su toplayıcı kanalda emilemez. Seyreltik bol idrar, hipernatremi, yüksek plazma ve uygunsuz düşük idrar ozmolaritesi. [[K1 s. 323]]',
      nefro: '**Nefrojenik DI.** ADH dolaşımda vardır ama toplayıcı kanal yanıt vermez (ör. lityum); klinik ve biyokimya santral DI ile aynıdır. [[K1 s. 323]]',
      siadh: '**SIADH.** ADH, normal ozmolarite için gerekenden fazladır (hipofiz ya da küçük hücreli akciğer kanseri gibi ektopik kaynak). Fazla su emilir: hiponatremi, düşük plazma ozmolaritesi, uygunsuz yüksek idrar ozmolaritesi. [[K1 s. 323]]',
    };
    const TBL = {
      normal: { v: [['Plazma Na⁺', '–', 'normal'], ['Plazma ozmolaritesi', '–', 'normal'], ['İdrar ozmolaritesi', '–', 'ihtiyaca uygun'], ['İdrar hacmi', '–', 'normal']], k: 'Arka hipofiz ihtiyaca göre ADH salgılar.' },
      santral: { v: [['Plazma Na⁺', '↑', 'hipernatremi'], ['Plazma ozmolaritesi', '↑', 'yüksek'], ['İdrar ozmolaritesi', '↓', 'uygunsuz düşük'], ['İdrar hacmi', '↑↑', 'çok']], k: 'Çok miktarda aşırı seyreltik idrar · hipovolemi bulguları. Tetik: ör. kafa travması.' },
      nefro: { v: [['Plazma Na⁺', '↑', 'hipernatremi'], ['Plazma ozmolaritesi', '↑', 'yüksek'], ['İdrar ozmolaritesi', '↓', 'uygunsuz düşük'], ['İdrar hacmi', '↑↑', 'çok']], k: 'Bulgular aynı, düzenek farklı. Tetik: ör. lityum.' },
      siadh: { v: [['Plazma Na⁺', '↓', 'hiponatremi'], ['Plazma ozmolaritesi', '↓', 'düşük'], ['İdrar ozmolaritesi', '↑', 'uygunsuz yüksek'], ['İdrar hacmi', '↓', 'az']], k: 'Baş ağrısı, bulantı, konfüzyon, nöbet, koma · bazen sıvı yüklenmesi.' },
    };
    return mount(el, (dar) => {
      const W = dar ? 360 : 640, H = dar ? 330 : 190;
      const svg = svgRoot(W, H, 'ADH ekseni: hipotalamus, arka hipofiz, toplayıcı kanal ve idrar', dar, el);
      const B = dar ? { hy: [20, 8, 130, 40], hp: [20, 82, 130, 40], tk: [20, 156, 130, 40], id: [20, 230, 130, 40] } : { hy: [10, 20, 120, 50], hp: [170, 20, 120, 50], tk: [350, 20, 130, 50], id: [520, 20, 110, 50] };
      const nm = { hy: 'Hipotalamus', hp: 'Arka hipofiz', tk: 'Toplayıcı kanal', id: 'İdrar' };
      const gB = S('g', {}, svg), gA = S('g', {}, svg), gX = S('g', {}, svg);
      Object.entries(B).forEach(([k, [x, y, w, h]]) => { S('rect', { x, y, width: w, height: h, rx: 10, class: 'f69-di-box' }, gB); T(gB, x + w / 2, y + h / 2 + 5, nm[k], 'f69-t f69-b', 'middle'); });
      const mid = (k) => [B[k][0] + B[k][2] / 2, B[k][1] + B[k][3] / 2];
      const ek = dar ? [190, 140, 160, 64] : [215, 118, 200, 56];
      const tbl = div('f69-di-tbl', el), kl = div('f69-di-kl', el);
      const draw = () => {
        gA.innerHTML = ''; gX.innerHTML = '';
        const adhTh = mode === 'siadh' ? 14 : mode === 'santral' ? 2 : 6, adhOp = mode === 'santral' ? 0.35 : 1;
        const ap = (k1, k2, th, op, label, col = 'var(--muted)') => {
          if (!dar) { const a = B[k1], b = B[k2]; arrow(gA, a[0] + a[2] + 4, a[1] + 25, b[0] - 4, b[1] + 25, th, col, op); if (label) T(gA, (a[0] + a[2] + b[0]) / 2, a[1] + 25 - th / 2 - 6, label, 'f69-s f69-b f69-clin', 'middle'); }
          else { const a = B[k1], b = B[k2]; arrow(gA, a[0] + 65, a[1] + 42, b[0] + 65, b[1] - 3, th, col, op); if (label) T(gA, a[0] + 65 + th / 2 + 8, (a[1] + 42 + b[1]) / 2 + 4, label, 'f69-s f69-b f69-clin'); }
        };
        ap('hy', 'hp', 4, 1); ap('hp', 'tk', adhTh, adhOp, 'ADH', 'var(--c-clin)'); ap('tk', 'id', mode === 'normal' ? 6 : mode === 'siadh' ? 3 : 14, 1);
        if (mode === 'siadh') {
          S('rect', { x: ek[0], y: ek[1], width: ek[2], height: ek[3], rx: 10, class: 'f69-di-ek' }, gX); wrapT(gX, ek[0] + ek[2] / 2, ek[1] + 22, 'Ektopik kaynak (küçük hücreli akciğer kanseri)', dar ? 22 : 28, 'f69-s f69-b', 15, 'middle');
          if (!dar) arrow(gX, ek[0] + ek[2] / 2 + 20, ek[1] - 2, ek[0] + ek[2] / 2 + 20, 76, 8, 'var(--c-clin)'); else arrow(gX, ek[0] + 20, ek[1] - 2, 150, 130, 8, 'var(--c-clin)');
        }
        const x = (k) => { const [x0, y0, w, h] = B[k]; S('line', { x1: x0 + 6, y1: y0 + 6, x2: x0 + w - 6, y2: y0 + h - 6, class: 'f69-di-x' }, gX); S('line', { x1: x0 + w - 6, y1: y0 + 6, x2: x0 + 6, y2: y0 + h - 6, class: 'f69-di-x' }, gX); };
        if (mode === 'santral') { x('hp'); T(gX, B.hp[0] + B.hp[2] / 2, B.hp[1] + B.hp[3] + 16, 'ADH yok', 'f69-s f69-b f69-crit', 'middle'); }
        if (mode === 'nefro') { x('tk'); T(gX, B.tk[0] + B.tk[2] / 2, B.tk[1] + B.tk[3] + 16, "ADH'ye yanıt yok", 'f69-s f69-b f69-crit', 'middle'); }
        if (mode === 'santral' && !dar) T(gX, 230, 100, 'ör. kafa travması', 'f69-s', 'middle');
        if (mode === 'nefro' && !dar) T(gX, 415, 100, 'ör. lityum', 'f69-s', 'middle');
        tbl.innerHTML = TBL[mode].v.map(([a, ar, n]) => `<div class="f69-di-g"><span>${a}</span><b class="${ar === '–' ? '' : ar.startsWith('↑') ? 'up' : 'dn'}">${ar}</b><small>${n}</small></div>`).join('');
        kl.innerHTML = '<b>Klinik:</b> ' + TBL[mode].k;
      };
      draw();
      const ctl = div('f69-ctl', el); ctl.appendChild(seg('Durum', [['normal', 'Normal'], ['santral', 'Santral DI'], ['nefro', 'Nefrojenik DI'], ['siadh', 'SIADH']], mode, (v) => { mode = v; v === 'normal' ? cap.reset() : cap.set(CAP[v]); draw(); }));
      el.insertBefore(ctl, tbl);
      return () => {};
    });
  };

  /* ---------- ortak nefron çizimi (§9) ---------- */
  const NEF_D = {
    pkt: 'M75 70 q11 -20 22 0 t22 0 t22 0 t22 0',
    inen: 'M163 70 H165 V270 A20 20 0 0 0 205 270',
    ince: 'M205 270 V190',
    kalin: 'M205 190 V110 H235',
    'dkt-erken': 'M235 110 q10 -20 20 0 t20 0 t20 0',
    'dkt-gec': 'M295 110 q10 -20 20 0 t20 0 H335',
    tk: 'M335 110 H345 V300',
  };
  const NEF_AD = { pkt: 'Proksimal kıvrımlı tübül', inen: 'İnen kol', ince: 'İnce çıkan kol', kalin: 'Kalın çıkan kol', 'dkt-erken': 'Erken distal kıvrımlı tübül', 'dkt-gec': 'Geç distal kıvrımlı tübül', tk: 'Toplayıcı kanal' };
  function nefronCiz(svg, dar, opt = {}) {
    const k = dar ? 0.8 : 1, ox = dar ? 8 : 0, oy = dar ? 22 : 0;
    const P = (x, y) => [+(ox + k * x).toFixed(1), +(oy + k * y).toFixed(1)];
    const bgG = S('g', { transform: `translate(${ox} ${oy}) scale(${k})` }, svg);
    const g = S('g', { transform: `translate(${ox} ${oy}) scale(${k})` }, svg);
    const parts = {}, hits = {};
    S('line', { x1: 8, x2: 360, y1: 140, y2: 140, class: 'f69-ad-kes' }, g);
    S('circle', { cx: 45, cy: 70, r: 28, class: 'f69-nf-bow' }, g); const glo = S('circle', { cx: 45, cy: 70, r: 15, class: 'f69-nf-glo' }, g);
    S('path', { d: 'M36 66 q6 -10 12 0 t8 6 M36 76 q8 6 14 -2', class: 'f69-nf-ty' }, g);
    S('path', { d: 'M45 98 V118 H198', class: 'f69-nf-jg-l' }, g); S('circle', { cx: 205, cy: 124, r: 6, class: 'f69-nf-jg' }, g);
    Object.keys(NEF_D).forEach((n) => { parts[n] = S('path', { d: NEF_D[n], class: 'f69-nf-p', 'data-parca': n }, g); });
    S('circle', { cx: 345, cy: 232, r: 7, class: 'f69-nf-hc' }, g); S('circle', { cx: 345, cy: 264, r: 7, class: 'f69-nf-hc b' }, g);
    [dar ? 'esas' : 'esas hücre', dar ? 'interkale' : 'interkale hücre'].forEach((t, i) => { const q = P(358, 236 + i * 32); T(svg, q[0], q[1], t, 'f69-s', 'start'); });
    Object.keys(NEF_D).forEach((n) => { const h = S('path', { d: NEF_D[n], class: 'f69-nf-hit', 'data-parca': n, tabindex: 0, role: 'button', 'aria-label': NEF_AD[n] }, g); h.style.strokeWidth = 34; hits[n] = h; });
    let q = P(8, 134); T(svg, q[0], q[1], 'Korteks', 'f69-s'); q = P(8, 156); T(svg, q[0], q[1] + 4, 'Medülla', 'f69-s');
    q = P(190, 142); T(svg, q[0] - 12, P(0, 128)[1] + 8, 'JG aygıt', 'f69-s', 'end');
    q = P(8, 22); T(svg, q[0], P(0, 32)[1] - 2, 'Glomerül', 'f69-s');
    return { g, bgG, P, k, parts, hits, glo, vurgu(list) { Object.entries(parts).forEach(([n, p]) => p.classList.toggle('on', list.includes(n))); glo.classList.toggle('on', list.includes('glo')); }, onPick(fn) { Object.entries(hits).forEach(([n, h]) => { h.addEventListener('click', () => fn(n)); h.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(n); } }); }); } };
  }
  function badge(par, x, y, txt, anchor = 'middle', cls = '') {
    const w = txt.length * 6.7 + 12, x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
    const gg = S('g', { class: 'f69-bdg ' + cls }, par); S('rect', { x: x0, y: y - 14, width: w, height: 20, rx: 10 }, gg); T(gg, x0 + w / 2, y, txt, 'f69-s f69-b', 'middle'); return gg;
  }
  const GRUP = { pkt: ['pkt'], inen: ['inen', 'ince', 'kalin'], ince: ['inen', 'ince', 'kalin'], kalin: ['inen', 'ince', 'kalin'], 'dkt-erken': ['dkt-erken'], 'dkt-gec': ['dkt-gec', 'tk'], tk: ['dkt-gec', 'tk'] };
  const GKEY = { pkt: 'pkt', inen: 'kulp', ince: 'kulp', kalin: 'kulp', 'dkt-erken': 'dkt', 'dkt-gec': 'tk', tk: 'tk' };
  function hucreSema(par, x, y, w, key) {
    const g = S('g', { transform: `translate(${x} ${y})` }, par), bw = (w - 20) / 3, h = 96;
    ['Lümen', 'Hücre', 'Kan'].forEach((t, i) => { S('rect', { x: i * (bw + 10), y: 18, width: bw, height: h, rx: 8, class: 'f69-hs-b' + i }, g); T(g, i * (bw + 10) + bw / 2, 12, t, 'f69-s f69-b', 'middle'); });
    const x1 = bw + 10, x2 = 2 * (bw + 10);
    S('circle', { cx: x2 - 5, cy: 18 + h / 2, r: 9, class: 'f69-hs-pump' }, g);
    const n = key === 'pkt' ? 3 : key === 'tk' || key === 'dkt' ? 2 : 1;
    for (let i = 0; i < n; i++) { const yy = 30 + i * 24; arrow(g, bw - 18, yy + 8, x1 + 14, yy + 8, 3, 'var(--warn)'); S('circle', { cx: 12, cy: yy + 8, r: 4, class: 'f69-na-dot' }, g); }
    arrow(g, x1 + bw - 22, 18 + h / 2 + 24, x2 - 20, 18 + h / 2 + 24, 3, 'var(--warn)');
    T(g, w / 2, 18 + h + 16, 'bazolateral Na⁺/K⁺-ATPaz (yuvarlak)', 'f69-s f69-acci', 'middle');
    return g;
  }
  const MECH = {
    pkt: ['lümenden girişi: pasif difüzyon', 'glukozla kotransport', 'H⁺ ile karşı taşıma'],
    kulp: ['Na⁺/K⁺/2Cl⁻ kotransporteri (kalın çıkan kol)'],
    dkt: ['Na⁺/Cl⁻ kotransporteri', 'sayısını aldosteron denetler'],
    tk: ['esas hücre: Na⁺ içeri / K⁺ dışarı', 'interkale hücre: Na⁺ içeri / H⁺ dışarı', 'üstte aldosteron'],
  };
  const BASLIK = { pkt: 'PKT · %60', kulp: 'Henle kulpu · %30', dkt: 'DKT · %5', tk: 'Geç DKT ve toplayıcı kanal · %1–2' };

  /* ---------- 9 · Na⁺ haritası ---------- */
  VIZ.f69_nefron = (el) => {
    const cap = mkCap(el); let sel = null, play = false, pt = 0, done = false;
    const CAP = {
      pkt: '**PKT · %60.** Bazolateral Na⁺/K⁺-ATPaz hücre içi Na⁺\'u düşük tutar; Na⁺ lümenden pasif difüzyon, glukoz gibi moleküllerle kotransport ve H⁺ ile karşı taşıma yoluyla girer. [[K1 s. 323]]',
      kulp: '**Henle kulpu · %30.** Kalın çıkan koldaki Na⁺/K⁺/2Cl⁻ kotransporteri; DKT\'ye varıldığında süzülen Na⁺\'un %90\'ı emilmiştir. [[K1 s. 323]]',
      dkt: '**DKT · %5.** Lümendeki Na⁺/Cl⁻ kotransporteriyle; aldosteron kotransporter sayısını denetler. [[K1 s. 323–324]]',
      tk: '**Geç DKT ve toplayıcı kanal · %1–2.** Aldosteron Na⁺ ve su emilimini, esas hücrelerde K⁺, interkale hücrelerde H⁺ sekresyonuyla takas ettirir. Atılan Na⁺ değişkendir; ağır hipovolemide idrar Na⁺\'u < 20 mmol/L. [[K1 s. 324]]',
      son: '**Filtrat idrara ulaştı.** 180 L/gün süzülen plazmadan ≈ 1,5 L/gün idrar kalır; Na⁺\'un çoğu, onunla birlikte su geri emilmiştir. [[K1 s. 323]]',
    };
    const ST = [['pkt', 0.14, 40], ['inen', 0.12, 40], ['ince', 0.1, 40], ['kalin', 0.14, 10], ['dkt-erken', 0.1, 7.5], ['dkt-gec', 0.08, 5], ['tk', 0.32, 3]];
    return mount(el, (dar) => {
      const hd = div('f69-nef-top', el); hd.textContent = '180 L/gün süzülür · idrar ≈ 1,5 L/gün';
      const W = dar ? 360 : 640, H = dar ? 600 : 342;
      const svg = svgRoot(W, H, 'Nefronda Na⁺ emilimi: PKT %60, kulp %30, DKT %5, toplayıcı kanal %1–2', dar, el);
      const nf = nefronCiz(svg, dar), P = nf.P;
      const bd = {}; let q = P(119, 44); bd.pkt = badge(svg, q[0], q[1] - (dar ? 10 : 0), 'PKT %60'); q = P(214, 172); bd.kulp = badge(svg, q[0], q[1], 'Kulp %30', 'start'); q = P(275, 84); bd.dkt = badge(svg, q[0], q[1], 'DKT %5'); q = P(356, 168); bd.tk = badge(svg, dar ? q[0] - 14 : q[0], q[1] - (dar ? 22 : 0), 'TK %1–2', 'start');
      const bar = S('g', {}, svg); let fillR, setBar;
      if (!dar) {
        T(bar, 301, 150, 'Kalan Na⁺', 'f69-s f69-b', 'middle');
        S('rect', { x: 292, y: 155, width: 18, height: 150, rx: 3, class: 'f69-nef-bar0' }, bar); fillR = S('rect', { x: 292, width: 18, class: 'f69-nef-bar1' }, bar);
        [[100, '%100'], [40, '%40'], [10, '%10']].forEach(([v, t]) => { const y = 305 - 1.5 * v; S('line', { x1: 288, x2: 292, y1: y, y2: y, class: 'f69-ax' }, bar); T(bar, 286, y + 4, t, 'f69-s', 'end'); });
        T(bar, 314, 301, '≈ %5', 'f69-s'); S('rect', { x: 292, y: 296, width: 18, height: 8, class: 'f69-nef-var' }, bar); T(bar, 314, 318, 'sonra değişken', 'f69-s');
        setBar = (v) => { fillR.setAttribute('y', 305 - 1.5 * v); fillR.setAttribute('height', 1.5 * v); };
      } else {
        T(bar, 20, 316, 'Kalan Na⁺', 'f69-s f69-b'); S('rect', { x: 20, y: 322, width: 310, height: 16, rx: 3, class: 'f69-nef-bar0' }, bar); fillR = S('rect', { x: 20, y: 322, height: 16, class: 'f69-nef-bar1' }, bar);
        [[100, '%100', 0], [40, '%40', 0], [10, '%10', 0], [5, '≈ %5', 1]].forEach(([v, t, up]) => { const x = 20 + 3.1 * v; S('line', { x1: x, x2: x, y1: 338, y2: 344, class: 'f69-ax' }, bar); T(bar, x, 356 + up * 14, t, 'f69-s', 'middle'); });
        S('rect', { x: 20, y: 322, width: 3.1 * 5, height: 16, class: 'f69-nef-var' }, bar);
        setBar = (v) => { fillR.setAttribute('width', 3.1 * v); };
      }
      const panel = S('g', {}, svg); const px = dar ? 20 : 440, py = dar ? 392 : 14, pw = dar ? 320 : 190;
      const drawPanel = () => {
        panel.innerHTML = ''; if (dar) svg.setAttribute('viewBox', `0 0 ${W} ${sel ? 600 : 440}`);
        if (!sel) { wrapT(panel, px, py + 20, 'Bir nefron parçasına dokunun ya da "Oynat" ile filtratı izleyin.', dar ? 40 : 24, 'f69-s', 15); return; }
        const key = GKEY[sel]; T(panel, px, py + 8, BASLIK[key], 'f69-t f69-b'); hucreSema(panel, px, py + 22, pw, key);
        let yy = py + 22 + 18 + 96 + 40; MECH[key].forEach((t) => { const e = wrapT(panel, px, yy, '• ' + t, dar ? 44 : 27, 'f69-s', 14); yy += 14 * e.f69n + 4; });
      };
      const drop = S('g', {}, svg), dots = []; const halo = S('circle', { r: 12, class: 'f69-nef-halo' }, drop); for (let i = 0; i < 10; i++) dots.push(S('circle', { r: 2.8, class: 'f69-na-dot' }, drop)); drop.style.display = 'none';
      const fly = []; for (let i = 0; i < 8; i++) fly.push({ c: S('circle', { r: 2.6, class: 'f69-na-dot', cx: 0, cy: 0 }, svg), life: 0, vx: 0, vy: 0 });
      const lens = {}; Object.keys(NEF_D).forEach((n) => { lens[n] = nf.parts[n].getTotalLength(); });
      let cum = 0; const tt = ST.map(([n, w, v]) => { const a = cum; cum += w; return [n, a, cum, v]; }); const tot = cum;
      let spawnAcc = 0, lastStage = -1;
      const place = (f) => {
        f = clamp(f, 0, 1) * tot; let idx = tt.findIndex(([, a, b]) => f <= b); if (idx < 0) idx = tt.length - 1; const [n, a, b, v] = tt[idx], prev = idx ? tt[idx - 1][3] : 100, ff = clamp((f - a) / (b - a), 0, 1);
        const p = nf.parts[n].getPointAtLength(ff * lens[n]), c = P(p.x, p.y), val = lerp(prev, v, ff);
        drop.style.display = ''; halo.setAttribute('cx', c[0]); halo.setAttribute('cy', c[1]); halo.setAttribute('r', 11 * nf.k);
        const cnt = val >= 7 ? Math.round(val / 10) : 1; dots.forEach((d, i) => { const an = i * 2.4; d.setAttribute('cx', (c[0] + Math.cos(an) * (3 + (i % 3) * 2.6) * nf.k).toFixed(1)); d.setAttribute('cy', (c[1] + Math.sin(an) * (3 + (i % 3) * 2.6) * nf.k).toFixed(1)); d.style.opacity = i < cnt ? (val < 7 ? 0.7 : 1) : 0; });
        setBar(val); return [n, idx, val];
      };
      const showFly = (dt) => { fly.forEach((o) => { if (o.life > 0) { o.life -= dt; o.c.setAttribute('cx', (+o.c.getAttribute('cx') + o.vx * dt).toFixed(1)); o.c.setAttribute('cy', (+o.c.getAttribute('cy') + o.vy * dt).toFixed(1)); o.c.style.opacity = clamp(o.life / 0.6, 0, 1); } else o.c.style.opacity = 0; }); };
      const spawn = (c, n) => { const o = fly.find((x) => x.life <= 0); if (!o) return; const out = { pkt: [0, -1], kalin: [1, 0], 'dkt-erken': [0, -1], 'dkt-gec': [0, -1], tk: [1, 0] }[n]; if (!out) return; o.life = 0.6; o.c.setAttribute('cx', c[0]); o.c.setAttribute('cy', c[1]); o.vx = out[0] * 40 + (rnd() - 0.5) * 14; o.vy = out[1] * 40 + (rnd() - 0.5) * 14; };
      const clearB = () => Object.values(bd).forEach((b) => b.classList.remove('on'));
      const pick = (n) => { play = false; done = false; sel = n; const key = GKEY[n]; nf.vurgu(GRUP[n]); clearB(); bd[key].classList.add('on'); cap.set(CAP[key]); drawPanel(); drop.style.display = 'none'; fly.forEach((o) => { o.life = 0; }); setBar(100); oyn.textContent = '▶ Oynat'; pt = 0; };
      nf.onPick(pick);
      const kv = div('f69-kv', el); kv.innerHTML = '<dl class="kv"><dt>Hacim ↑</dt><dd>GFR ↑ → Na⁺ atılımı ↑</dd><dt>Hacim ↓</dt><dd>GFR ↓ → Na⁺ korunur</dd></dl><p class="f69-kv-n">Övolemide ana düzenek: geri emilim.</p>';
      const ctl = div('f69-ctl', el); const oyn = btn('▶ Oynat', 'btn'); const sifir = btn('Sıfırla'); ctl.append(oyn, sifir);
      const finish = () => { play = false; done = true; place(1); oyn.textContent = '↺ Yeniden oynat'; cap.set(CAP.son); nf.vurgu([]); clearB(); drawPanel(); };
      oyn.addEventListener('click', () => { if (play) { play = false; oyn.textContent = '▶ Oynat'; return; } sel = null; nf.vurgu([]); clearB(); drawPanel(); if (RM) { finish(); return; } if (done || pt >= 1) pt = 0; done = false; play = true; oyn.textContent = '❚❚ Duraklat'; });
      sifir.addEventListener('click', () => { play = false; done = false; pt = 0; sel = null; nf.vurgu([]); clearB(); cap.reset(); drawPanel(); drop.style.display = 'none'; setBar(100); oyn.textContent = '▶ Oynat'; });
      setBar(100); drawPanel();
      if (RM) return () => {};
      return ticker(el, (dt) => {
        showFly(dt);
        if (!play) return;
        pt = Math.min(1, pt + dt / 8); const [n, idx] = place(pt); const key = GKEY[n];
        if (idx !== lastStage) { lastStage = idx; nf.vurgu(GRUP[n]); clearB(); bd[key].classList.add('on'); cap.set(CAP[key]); }
        spawnAcc += dt; if (spawnAcc > 0.16) { spawnAcc = 0; if (['pkt', 'kalin', 'dkt-erken', 'dkt-gec', 'tk'].includes(n)) spawn([+halo.getAttribute('cx'), +halo.getAttribute('cy')], n); }
        if (pt >= 1) { lastStage = -1; finish(); }
      });
    });
  };

  /* ---------- 10 · Diüretiklerin etki yerleri ---------- */
  VIZ.f69_diuretik = (el) => {
    const cap = mkCap(el); let sel = null;
    const D = {
      ozm: { v: ['glo', 'pkt', 'inen', 'ince', 'kalin', 'dkt-erken', 'dkt-gec', 'tk'], rozet: 'Mannitol', at: { su: 'up' }, p: [45, 38], not: 'Serbestçe süzülür, geri emilmez',
        cap: '**Ozmotik (mannitol).** Glomerülde serbestçe süzülür, tübülde emilmez; filtrat ozmolaritesi artar, daha az su emilir, idrar hacmi artar. [[K1 s. 325]]' },
      ka: { v: ['pkt'], rozet: 'Asetazolamid', at: { hco3: 'up' }, p: [119, 44], x: [119, 70], not: 'KA inhibisyonu',
        cap: '**KA inhibitörü (asetazolamid).** PKT\'deki karbonik anhidraz HCO₃⁻ emilimi için gerekir; inhibisyon HCO₃⁻ atılımını artırır (Bölüm 70). [[K1 s. 325]]' },
      kivrim: { v: ['kalin'], rozet: 'Furosemid, bumetanid', at: { na: 'up', k: 'up', cl: 'up' }, p: [214, 170], a: 'start', x: [205, 150], not: 'Na⁺/K⁺/2Cl⁻ ×',
        cap: '**Kıvrım diüretiği (furosemid, bumetanid).** Kalın çıkan koldaki Na⁺/K⁺/2Cl⁻ kotransporterini bloke eder; Na⁺, K⁺, Cl⁻ emilmez ve medüller gradyanı kuran karşı akım düzeneği bozulur: bu yüzden çok etkilidir. [[K1 s. 325]]' },
      tiyazid: { v: ['dkt-erken'], rozet: 'Bendroflumetiyazid', at: { na: 'up' }, p: [265, 76], x: [255, 110], not: 'Na⁺/Cl⁻ ×',
        cap: '**Tiyazid (bendroflumetiyazid).** Erken DKT\'deki Na⁺/Cl⁻ kotransporterini bloke eder. [[K1 s. 325]]' },
      ktut: { v: ['dkt-gec', 'tk'], rozet: 'Spironolakton, amilorid', at: { na: 'up', k: 'dn', h: 'dn' }, p: [225, 200], a: 'start', x: [345, 190], not: 'aldosteronun tersi',
        cap: '**K⁺ tutucu (spironolakton, amilorid).** Spironolakton DKT ve toplayıcı kanalda aldosteron reseptörünü, amilorid Na⁺ kanallarını bloke eder: Na⁺ atılımı artar, H⁺ ve K⁺ atılımı azalır. [[K1 s. 325]]' },
    };
    const ROWS = [['su', 'Su'], ['na', 'Na⁺'], ['k', 'K⁺'], ['h', 'H⁺'], ['hco3', 'HCO₃⁻'], ['cl', 'Cl⁻']];
    return mount(el, (dar) => {
      const W = dar ? 360 : 640, H = dar ? 560 : 352;
      const svg = svgRoot(W, H, 'Beş diüretik sınıfının nefrondaki etki yerleri', dar, el);
      const nf = nefronCiz(svg, dar), P = nf.P;
      const gid = 'f69-gdiu' + (++UID); const gr = S('linearGradient', { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 }, defs(svg)); const stops = [0, 1, 2].map((i) => S('stop', { offset: i / 2 }, gr));
      S('rect', { x: 8, y: 141, width: 352, height: 160, style: `fill:url(#${gid})`, opacity: 0.8 }, nf.bgG);
      const ov = S('g', {}, svg), panel = S('g', {}, svg);
      const heat = (flat) => [300, 750, 1200].forEach((v, i) => stops[i].setAttribute('style', 'stop-color:' + osmRenk(flat ? 300 + (v - 300) * 0.25 : v)));
      const draw = () => {
        ov.innerHTML = ''; panel.innerHTML = ''; heat(sel === 'kivrim');
        const d = sel ? D[sel] : null; nf.vurgu(d ? d.v : []);
        const px = dar ? 20 : 446, py = dar ? 340 : 14, pw = dar ? 320 : 184;
        T(panel, px, py + 8, 'Atılım', 'f69-t f69-b');
        const rows = ROWS.filter(([k]) => k !== 'cl' || (d && d.at.cl)); const st = dar ? 30 : 34;
        rows.forEach(([k, l], i) => { const y = py + 36 + i * st, a = d && d.at[k]; S('rect', { x: px, y: y - 18, width: pw, height: st - 6, rx: 8, class: 'f69-di-row' + (a ? ' on' : '') }, panel); T(panel, px + 10, y, l, 'f69-t f69-b' + (a ? '' : ' f69-dim')); T(panel, px + pw - 14, y + 1, a === 'up' ? '↑' : a === 'dn' ? '↓' : '', 'f69-t f69-b' + (a === 'up' ? ' f69-ok' : ' f69-crit'), 'end'); });
        const ny = py + 36 + rows.length * st + 6;
        if (!d) { wrapT(panel, px, ny + 8, 'Seçilen sınıfta kitabın bildirdiği değişiklikler gösterilir.', dar ? 46 : 24, 'f69-s', 14); return; }
        const q = P(d.p[0], d.p[1]); badge(ov, q[0], q[1], d.rozet, d.a || 'middle', 'on');
        if (d.x) { const c = P(d.x[0], d.x[1]); S('line', { x1: c[0] - 8, x2: c[0] + 8, y1: c[1] - 8, y2: c[1] + 8, class: 'f69-di-x' }, ov); S('line', { x1: c[0] + 8, x2: c[0] - 8, y1: c[1] - 8, y2: c[1] + 8, class: 'f69-di-x' }, ov); }
        const ee = wrapT(panel, px, ny + 8, d.not, dar ? 46 : 24, 'f69-s f69-b f69-acci', 14); let yy = ny + 8 + 14 * ee.f69n + 4;
        if (sel === 'kivrim') wrapT(panel, px, yy, 'Medüller gradyan bozulur → çok etkili', dar ? 46 : 24, 'f69-s f69-b f69-crit', 14);
        if (sel === 'ktut') { const e2 = wrapT(panel, px, yy, 'Spironolakton: aldosteron reseptörü ×', dar ? 46 : 24, 'f69-s', 14); wrapT(panel, px, yy + 14 * e2.f69n + 4, 'Amilorid: Na⁺ kanalı ×', dar ? 46 : 24, 'f69-s', 14); }
        if (sel === 'ozm') { const qq = P(215, 220); T(ov, qq[0], qq[1], 'lümende kalan', 'f69-s f69-acci'); T(ov, qq[0], qq[1] + 14, 'ozmotik parçacıklar', 'f69-s f69-acci'); }
      };
      draw();
      const ctl = div('f69-ctl', el);
      ctl.appendChild(seg('Diüretik sınıfı', [['ozm', 'Ozmotik'], ['ka', 'KA inhibitörü'], ['kivrim', 'Kıvrım'], ['tiyazid', 'Tiyazid'], ['ktut', 'K⁺ tutucu']], null, (v) => { sel = v; cap.set(D[v].cap); draw(); }));
      return () => {};
    });
  };

  /* ---------- 15 · Böbrekte K⁺ ---------- */
  VIZ.f69_kbobrek = (el) => {
    const cap = mkCap(el); let mode = 'norm', nNorm = 1, anim = 1, prev = null;
    const SET = {
      norm: { pkt: ['out', '%60 emilir'], kalin: ['out', '%30 emilir'], dkt: ['in', '%10–50 salgı'], tk: ['in', '%5–30 salgı'], at: 80, lab: "%80'e kadar" },
      dus: { pkt: ['out', '%60 emilir'], kalin: ['out', '%30 emilir'], dkt: ['out', '≈ %2–3 emilir'], tk: ['out', '≈ %5–7 emilir'], at: 1, lab: '≈ %1 atılır' },
    };
    return mount(el, (dar) => {
      const W = dar ? 360 : 640, H = dar ? 470 : 342;
      const svg = svgRoot(W, H, 'Böbrekte K⁺: proksimal emilim sabit, distal işlem K⁺ durumuna göre yön değiştirir', dar, el);
      const nf = nefronCiz(svg, dar), P = nf.P, ov = S('g', {}, svg), side = S('g', {}, svg);
      const AN = { pkt: [119, 66, 0, -1], kalin: [205, 150, 1, 0], dkt: [265, 94, 0, -1], tk: [345, 170, 1, 0] };
      const BP = { pkt: [119, 18, 'middle'], kalin: [212, 190, 'start'], dkt: [265, 56, 'middle'], tk: [338, 252, 'end'] };
      let curAt = 80;
      const draw = () => {
        ov.innerHTML = ''; side.innerHTML = '';
        const S1 = SET[mode], S0 = prev || S1;
        Object.keys(AN).forEach((k) => {
          const [x, y, dx, dy] = AN[k], [dirN] = S1[k], [dirO] = S0[k];
          let dir = dirN, s = 1; if (anim < 1) { if (dirN !== dirO) { if (anim < 0.5) { dir = dirO; s = 1 - anim * 2; } else { s = (anim - 0.5) * 2; } } }
          const L = 30 * s; if (L > 4) {
            const a = P(x + dx * 4, y + dy * 4), b = P(x + dx * (4 + 30), y + dy * (4 + 30));
            if (dir === 'out') arrow(ov, a[0], a[1], a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s, 4, 'var(--ok)'); else arrow(ov, b[0], b[1], b[0] + (a[0] - b[0]) * s, b[1] + (a[1] - b[1]) * s, 4, 'var(--c-basic)');
          }
          const q = P(BP[k][0], BP[k][1]); badge(ov, q[0], q[1] + (dar && k === 'pkt' ? -6 : 0), S1[k][1], BP[k][2], dir === 'out' ? 'ok' : 'bas');
        });
        // sabit işareti
                const v = lerp(S0.at, S1.at, ease(anim)); curAt = v;
        if (!dar) {
          T(side, 470, 18, 'Atılan K⁺', 'f69-t f69-b', 'middle'); T(side, 470, 34, '(süzülene göre)', 'f69-s', 'middle');
          S('rect', { x: 456, y: 50, width: 28, height: 190, rx: 4, class: 'f69-nef-bar0' }, side); S('rect', { x: 456, y: 240 - 1.9 * Math.max(v, 0.8), width: 28, height: 1.9 * Math.max(v, 0.8), rx: 3, class: 'f69-kb-bar' }, side);
          T(side, 492, 240 - 1.9 * v - 6, S1.lab, 'f69-s f69-b'); T(side, 470, 258, '0', 'f69-s', 'middle');
          if (mode === 'dus') { T(side, 446, 286, 'Toplam emilim', 'f69-s f69-b'); T(side, 446, 301, "%99'a kadar", 'f69-s f69-b'); }
          else { S('circle', { cx: 458, cy: 286, r: 9, class: 'f69-kb-adr' }, side); T(side, 474, 282, 'Adrenal: K⁺ ↑ →', 'f69-s f69-b f69-clin'); T(side, 474, 297, 'aldosteron (doğrudan)', 'f69-s f69-b f69-clin'); }
          wrapT(side, 446, 326, 'PKT ve kulpta emilim durumdan bağımsızdır (sabit).', 26, 'f69-s f69-acci', 14);
        } else {
          T(side, 20, 322, 'Atılan K⁺ (süzülene göre)', 'f69-s f69-b'); S('rect', { x: 20, y: 330, width: 310, height: 16, rx: 3, class: 'f69-nef-bar0' }, side); S('rect', { x: 20, y: 330, width: 3.1 * Math.max(v, 1), height: 16, rx: 3, class: 'f69-kb-bar' }, side);
          T(side, 20, 366, S1.lab, 'f69-s f69-b'); wrapT(side, 20, 434, 'PKT ve kulpta emilim durumdan bağımsızdır (sabit).', 46, 'f69-s f69-acci', 14);
          if (mode === 'dus') { T(side, 20, 392, "Toplam emilim %99'a kadar", 'f69-s f69-b'); } else { S('circle', { cx: 30, cy: 396, r: 9, class: 'f69-kb-adr' }, side); T(side, 46, 392, 'Adrenal: K⁺ ↑ → aldosteron', 'f69-s f69-b f69-clin'); T(side, 46, 407, '(doğrudan uyarı)', 'f69-s f69-b f69-clin'); }
        }
      };
      draw();
      const ctl = div('f69-ctl', el);
      ctl.appendChild(seg('K⁺ durumu', [['norm', 'Normal/yüksek K⁺'], ['dus', 'Düşük K⁺']], mode, (v) => {
        if (v === 'norm') { nNorm++; cap.set(nNorm > 2 || v === mode && false ? '' : nNorm === 2 ? '**Normal/yüksek K⁺.** PKT %60, kulp %30 emer; DKT %10–50, toplayıcı kanal %5–30 salgılar; süzülenin %80\'e kadarı atılır. Yüksek K⁺ adrenal korteksi doğrudan uyarır; aldosteron Na⁺ ve suyu emerken K⁺ ve H⁺ salgılatır. [[K1 s. 326]]' : '**Normal/yüksek K⁺.** PKT %60, kulp %30 emer; DKT %10–50, toplayıcı kanal %5–30 salgılar; süzülenin %80\'e kadarı atılır. Yüksek K⁺ adrenal korteksi doğrudan uyarır; aldosteron Na⁺ ve suyu emerken K⁺ ve H⁺ salgılatır. [[K1 s. 326–327]]'); }
        else cap.set('**Düşük K⁺.** Proksimal emilim aynı kalır; DKT (muhtemelen H⁺/K⁺-ATPaz ile) ≈ %2–3, toplayıcı kanal ≈ %5–7 emer. Toplam %99\'a kadar emilir, ≈ %1 atılır. [[K1 s. 326–327]]');
        prev = SET[mode]; mode = v; anim = RM ? 1 : 0; draw();
      }));
      if (RM) return () => {};
      return ticker(el, (dt) => { if (anim < 1) { anim = Math.min(1, anim + dt / 0.6); draw(); } });
    });
  };

  /* ---------- 11 · Hipovolemi zinciri ---------- */
  VIZ.f69_hipo = (el) => {
    const cap = mkCap(el); let step = 0;
    const CAPS = [
      null,
      '**2 · İletim.** ANP ve BNP salgısı azalır; afferent sinir uyarıları medulla oblongata ve hipotalamusa ulaşır. [[K1 s. 324]]',
      '**3 · Üç hipovolemi hormonu ve susuzluk.** Noradrenalin, ADH ve renin salınır; susuzluk uyarılır. [[K1 s. 324]]',
      '**4 · Böbrekteki etkiler.** Noradrenalin iki arteriyolü büzer (GFR ↓). Renin, sempatik uyarı ve jukstaglomerüler aygıtın algıladığı düşük filtrat Na⁺\'uyla salınır; anjiyotensin II PKT\'de Na⁺ emer ve GFR\'yi düşürür, aldosteron distalde Na⁺ ve su emip K⁺ ve H⁺ salgılatır. ADH toplayıcı kanalı suya geçirgen yapar. [[K1 s. 324–325]]',
      '**5 · Sonuç.** Böbrek Na⁺ atılımı azalır ve sıvı korunur. [[K1 s. 325]]',
      '**6 · Taban.** İdrar en çok 1200 mOsmol/L olabilir ve günde ≈ 600 mOsmol atık atılmalıdır: en az idrar 500 mL/gün. Hissedilmeyen ≈ 500 mL eklenince övolemi için en az 1000 mL/gün su gerekir. [[K1 s. 325]]',
    ];
    // id, adım, [x,y,w], başlık, alt, sınıf
    const BX = [
      ['b1', 1, [160, 10, 320], 'Atriyum ve pulmoner damar gerilme reseptörleri (düşük basınç)', 'gerilme ↓', ''],
      ['b2a', 2, [20, 84, 150], 'ANP, BNP ↓', '', 'clin'],
      ['b2b', 2, [230, 84, 380], 'Afferent uyarı → medulla oblongata + hipotalamus', '', ''],
      ['na', 3, [10, 146, 150], 'Noradrenalin', '', 'clin'],
      ['ren', 3, [170, 146, 170], 'Renin', 'sempatik uyarı + JG: filtrat Na⁺ ↓', 'clin'],
      ['sus', 3, [350, 146, 130], 'Susuzluk', '', ''],
      ['adh', 3, [490, 146, 140], 'ADH', '', 'clin'],
      ['t1', 4, [10, 222, 150], 'Afferent + eferent arteriyol büzülür → BKA ↓, GFR ↓', '', 'tg'],
      ['ang', 4, [170, 222, 170], 'Anjiyotensin II', '', 'clin'],
      ['t2', 4, [170, 266, 170], 'PKT Na⁺ emilimi ↑; arteriyoller büzülür, GFR ↓', '', 'tg'],
      ['ald', 4, [350, 222, 130], 'Aldosteron', '', 'clin'],
      ['t3', 4, [350, 266, 130], 'DKT/toplayıcı kanal: Na⁺ + su emilimi ↑, K⁺ + H⁺ salgısı ↑', '', 'tg'],
      ['t4', 4, [490, 222, 140], 'Toplayıcı kanal suya geçirgen; medüller gradyan kullanılır', '', 'tg'],
      ['son', 5, [150, 376, 340], 'Na⁺ atılımı ↓ → sıvı korunur', '', 'son'],
      ['hes', 6, [10, 440, 620], 'En çok idrar 1200 mOsmol/L · atık ≈ 600 mOsmol/gün → en az idrar = 600 / 1200 = 0,5 L = 500 mL/gün', 'Hissedilmeyen kayıplar ≈ 500 mL/gün (terleme, dışkı, solunum) → en az su alımı = 1000 mL/gün', 'hes'],
    ];
    const AR = [['b1', 'b2a', 2], ['b1', 'b2b', 2], ['b2b', 'na', 3], ['b2b', 'ren', 3], ['b2b', 'sus', 3], ['b2b', 'adh', 3], ['na', 't1', 4], ['ren', 'ang', 4], ['ang', 't2', 4], ['ang', 'ald', 4], ['ald', 't3', 4], ['adh', 't4', 4], ['t1', 'son', 5], ['t2', 'son', 5], ['t3', 'son', 5], ['t4', 'son', 5], ['son', 'hes', 6]];
    return mount(el, (dar) => {
      const cw = dar ? 330 : 0; const per = (w) => Math.max(10, Math.floor((w - 16) / 6.5));
      // yerleşim: kutu yüksekliklerini hesapla
      const lay = {}; let yN = 8;
      BX.forEach(([id, s, [x, y, w], t, sub]) => {
        const cntL = (txt, max) => { let line = '', n = 0; txt.split(' ').forEach((wd) => { if ((line + ' ' + wd).trim().length > max) { n++; line = ''; } line = (line + ' ' + wd).trim(); }); return n + (line ? 1 : 0); };
        const ww = dar ? cw : w, lt = cntL(t, per(ww)), ls = sub ? cntL(sub, per(ww)) : 0, h = 14 + lt * 15 + ls * 14 + (ls ? 4 : 0) + 4 + (id === 'hes' ? 18 : 0);
        if (dar) { lay[id] = [15, yN, ww, h, lt, ls]; yN += h + 20; } else lay[id] = [x, y, ww, h, lt, ls];
      });
      const H = dar ? yN + 4 : 440 + lay.hes[3] + 8;
      const svg = svgRoot(dar ? 360 : 640, H, 'Hipovolemiye böbrek yanıtı: algılamadan sıvı korunmasına ve en az idrar hesabına', dar, el);
      const gArr = S('g', {}, svg), gB = S('g', {}, svg);
      const draw = () => {
        gArr.innerHTML = ''; gB.innerHTML = '';
        BX.forEach(([id, s, , t, sub, cl]) => {
          if (s > step + 1) return; const [x, y, w, h, lt] = lay[id];
          const g = S('g', { class: 'f69-hp-b ' + cl + (s < step + 1 ? ' old' : ' new') }, gB);
          S('rect', { x, y, width: w, height: h, rx: 9 }, g);
          wrapT(g, x + 8, y + 18, t, per(w), 'f69-s f69-b', 15);
          if (sub) wrapT(g, x + 8, y + 18 + lt * 15 + 2, sub, per(w), 'f69-s', 14);
        });
        if (step === 5) {
          const [x, y, w, h] = lay.hes, by = y + h - 18; const sc = (w - 24) / 1000;
          S('rect', { x: x + 12, y: by, width: 500 * sc, height: 10, rx: 3, class: 'f69-hp-i' }, gB); S('rect', { x: x + 12 + 500 * sc, y: by, width: 500 * sc, height: 10, rx: 3, class: 'f69-hp-h' }, gB);
        }
        AR.forEach(([a, b, s]) => {
          if (s > step + 1) return; const A = lay[a], B = lay[b];
          if (!dar && b === 'son') return;
          let x1, y1, x2, y2;
          if (dar) { if (A[1] > B[1] || Math.abs(BX.findIndex((q) => q[0] === a) - BX.findIndex((q) => q[0] === b)) !== 1) return; x1 = x2 = 180; y1 = A[1] + A[3]; y2 = B[1]; }
          else { x1 = A[0] + A[2] / 2; y1 = A[1] + A[3]; x2 = B[0] + B[2] / 2; y2 = B[1]; if (a === 'ren' && b === 'ang' || a === 'ang' && b === 'ald') { if (b === 'ald') { x1 = A[0] + A[2]; y1 = A[1] + A[3] / 2; x2 = B[0]; y2 = y1; } } }
          S('line', { x1, y1, x2, y2: y2 - 5, class: 'f69-hp-l' }, gArr); arrow(gArr, x2, y2 - 8, x2, y2 - 1 + (x1 === x2 && y1 === y2 ? 0 : 0), 2, 'var(--muted)');
          if (!dar && y2 === y1) {}
        });
        if (!dar && step >= 4) { const bus = lay.son[1] - 14, xs = ['t1', 't2', 't3', 't4'].map((k) => lay[k][0] + lay[k][2] / 2); ['t1', 't2', 't3', 't4'].forEach((k) => { const L = lay[k]; S('line', { x1: L[0] + L[2] / 2, y1: L[1] + L[3], x2: L[0] + L[2] / 2, y2: bus, class: 'f69-hp-l' }, gArr); }); S('line', { x1: Math.min(...xs), x2: Math.max(...xs), y1: bus, y2: bus, class: 'f69-hp-l' }, gArr); S('line', { x1: lay.son[0] + lay.son[2] / 2, y1: bus, x2: lay.son[0] + lay.son[2] / 2, y2: lay.son[1] - 8, class: 'f69-hp-l' }, gArr); arrow(gArr, lay.son[0] + lay.son[2] / 2, lay.son[1] - 9, lay.son[0] + lay.son[2] / 2, lay.son[1] - 1, 2, 'var(--muted)'); }
      };
      const fitH = () => { let m = 0; BX.forEach(([id, s]) => { if (s <= step + 1) m = Math.max(m, lay[id][1] + lay[id][3]); }); svg.setAttribute('viewBox', `0 0 ${dar ? 360 : 640} ${m + 12}`); };
      draw(); fitH();
      const ctl = div('f69-ctl', el);
      const setS = (i) => { step = i; i === 0 ? cap.reset() : cap.set(CAPS[i]); nav.sync(); draw(); fitH(); };
      const nav = STEPNAV(ctl, 6, () => step, setS); nav.sync();
      const stop = RM ? () => {} : ticker(el, (dt) => nav.tick(dt));
      return () => { nav.stopPlay(); stop(); };
    });
  };

  /* ---------- 12 · ADH: ozmolarite mi, hacim mi? ---------- */
  VIZ.f69_oncelik = (el) => {
    const cap = mkCap(el); let o = 0, v = 0, salin = false;
    const ozm = (x) => 1 / (1 + Math.exp(-(x - 2.5) * 2.2)), hac = (x) => 1 / (1 + Math.exp(-(x - 8.5) * 1.4));
    return mount(el, (dar) => {
      const W = dar ? 360 : 640, H = dar ? 330 : 300;
      const svg = svgRoot(W, H, 'ADH yanıtı: ozmolarite eşiği %2–3, hacim eşiği %7–10', dar, el);
      const px = dar ? 50 : 70, py = dar ? 30 : 30, pw = dar ? 230 : 380, ph = dar ? 200 : 190, bx = dar ? 304 : 500;
      const X = (t) => px + t / 15 * pw, Y = (a) => py + ph - a * ph;
      S('rect', { x: X(2), y: py, width: X(3) - X(2), height: ph, class: 'f69-on-b1' }, svg); S('rect', { x: X(7), y: py, width: X(10) - X(7), height: ph, class: 'f69-on-b2' }, svg);
      S('line', { x1: px, y1: py + ph, x2: px + pw, y2: py + ph, class: 'f69-ax' }, svg); S('line', { x1: px, y1: py, x2: px, y2: py + ph, class: 'f69-ax' }, svg);
      [0, 5, 10, 15].forEach((t) => T(svg, X(t), py + ph + 16, t, 'f69-s', 'middle')); [0, 1].forEach((a) => T(svg, px - 6, Y(a) + 4, a, 'f69-s', 'end'));
      T(svg, px + pw / 2, py + ph + 34, 'Uyarıdaki değişiklik (%)', 'f69-s', 'middle'); const yl = T(svg, 14, py + ph / 2, 'ADH yanıtı', 'f69-s', 'middle'); yl.setAttribute('transform', `rotate(-90 14 ${py + ph / 2})`);
      const path = (f) => { const p = []; for (let i = 0; i <= 60; i++) { const t = i / 60 * 15; p.push((i ? 'L' : 'M') + X(t).toFixed(1) + ' ' + Y(f(t)).toFixed(1)); } return p.join(''); };
      S('path', { d: path(ozm), class: 'f69-on-c1' }, svg); S('path', { d: path(hac), class: 'f69-on-c2' }, svg);
      const d1 = S('circle', { r: 6, class: 'f69-on-d1' }, svg), d2 = S('circle', { r: 6, class: 'f69-on-d2' }, svg);
      S('rect', { x: bx, y: py, width: 28, height: ph, rx: 4, class: 'f69-nef-bar0' }, svg); const nb = S('rect', { x: bx, width: 28, rx: 4, class: 'f69-on-net' }, svg);
      T(svg, bx + 14, py - 8, 'Net ADH', 'f69-s f69-b', 'middle'); const st = S('text', { x: dar ? 20 : 470, y: py + ph + 16, class: 'f69-s f69-b' }, svg);
      const leg = div('legend', el); leg.innerHTML = '<span><i style="background:var(--c-clin)"></i>Ozmolarite artışı</span><span><i style="background:var(--accent)"></i>Kan hacmi azalması</span><span><i style="background:var(--c-clin-soft)"></i>eşik %2–3</span><span><i style="background:var(--accent-soft)"></i>eşik %7–10</span>';
      const notes = div('f69-on-n', el); notes.innerHTML = '<p><b>Kafatası.</b> Küçük ozmolarite değişikliği beyin hücresini şişirir (kapalı kafatası).</p><p><b>Damar.</b> Küçük hacim değişikliğini yüksek kompliyanslı venöz depo tolere eder.</p>';
      const ctl = div('f69-ctl', el); const so = range('Ozmolarite değişikliği', -5, 10, 0.5, o, '%', (x) => { o = x; salin = false; upd(); }, 1), sv = range('Kan hacmi kaybı', 0, 15, 0.5, v, '%', (x) => { v = x; salin = false; upd(); }, 1);
      const bs = btn('Hipertonik salin'); const tag = document.createElement('span'); tag.className = 'f69-tag'; ctl.append(so.w, sv.w, bs, tag);
      bs.addEventListener('click', () => { o = 4; v = 0; salin = true; so.set(4); sv.set(0); upd(); });
      function upd() {
        const oc = clamp(o, 0, 15), net = Math.max(o > 0 ? ozm(o) : 0, hac(v));
        d1.setAttribute('cx', X(oc)); d1.setAttribute('cy', Y(ozm(oc))); d1.classList.toggle('neg', o < 0); d2.setAttribute('cx', X(v)); d2.setAttribute('cy', Y(hac(v)));
        nb.setAttribute('y', Y(net)); nb.setAttribute('height', net * ph); tag.textContent = salin ? 'hacim ↑' : '';
        let t = '', c = null;
        if (salin) { t = 'Hacim artmasına karşın ADH salgılanır'; c = '**Hipertonik salin.** Hacim artar ama ozmolarite de artar; ADH salgılanır ve ozmolariteyi düzeltmek için su tutulur. [[K1 s. 325]]'; }
        else if (v > 7) { t = 'Hacim önceliği (doku iskemisi riski)'; c = '**Hacim önceliği.** %7\'yi aşan kayıpta doku iskemisi tehlikesi nedeniyle hacim düzenlemesi öne geçer; ozmolarite düşük olsa da ADH salgılanır. [[K1 s. 325]]'; }
        else if (o < 0) t = 'Ozmolarite düşük → ADH baskılanır';
        else if (v > 0) c = '**Ozmolarite önce korunur.** Küçük hacim değişikliği venöz depo sayesinde tolere edilir; ADH\'yi ozmolarite belirler. [[K1 s. 325]]';
        st.textContent = ''; st.setAttribute('x', dar ? 20 : bx - 30); st.setAttribute('y', dar ? py + ph + 52 : py + ph + 20);
        if (t) { const e = wrapT(svg, dar ? 20 : bx - 36, dar ? py + ph + 56 : py + ph + 22, t, dar ? 44 : 14, 'f69-s f69-b', 14); e.setAttribute('class', 'f69-s f69-b wr'); svg.querySelectorAll('.wr').forEach((n) => { if (n !== e) n.remove(); }); } else svg.querySelectorAll('.wr').forEach((n) => n.remove());
        c ? cap.set(c) : cap.reset();
      }
      upd();
      return () => {};
    });
  };

  /* ---------- 13 · ANP ve BNP ---------- */
  VIZ.f69_anp = (el) => {
    const cap = mkCap(el); let sel = null, wa = 14, we = 14, mz = 1, prot = 1;
    const E = {
      afe: { aff: 26, eff: 6, mz: 1, prot: 1, cap: '**Afferent dilatasyon, eferent konstriksiyon.** Glomerül kapiller hidrostatik basıncı artar; GFR ve Na⁺ atılımı artar. [[K1 s. 326]]', not: 'yumak basıncı ↑ → GFR ↑' },
      mez: { aff: 14, eff: 14, mz: 0.45, prot: 1, cap: '**Mezangiyal hücre gevşemesi.** Filtrasyon yüzeyi büyür; GFR ve Na⁺ atılımı artar. [[K1 s. 326]]', not: 'filtrasyon yüzeyi ↑ → GFR ↑' },
      kan: { aff: 14, eff: 14, mz: 1, prot: 1, cap: '**DKT ve toplayıcı kanalda Na⁺ kanalı inhibisyonu.** Na⁺ emilimi doğrudan azalır. [[K1 s. 326]]', not: 'Na⁺ emilimi ↓', ch: 1 },
      ren: { aff: 14, eff: 14, mz: 1, prot: 1, cap: '**Renin ve aldosteron inhibisyonu.** Granüler hücrelerden renin, adrenalden aldosteron salgısı baskılanır. [[K1 s. 326]]', not: 'renin ↓ · aldosteron ↓', rn: 1 },
      onk: { aff: 14, eff: 14, mz: 1, prot: 0.35, cap: '**Onkotik basınç düşer.** Hacim artışı plazma proteinlerini göreceli seyreltir; glomerülde Starling kuvvetleri filtrasyon fraksiyonunu artıracak yönde değişir. [[K1 s. 325–326]]', not: 'πGC ↓ → filtrasyon fraksiyonu ↑' },
    };
    const CAP0 = 'Bir etkiye dokunun; glomerül ve nefronda yeri vurgulanır. Hepsi Na⁺ atılımını artırır. [[K1 s. 326]]';
    return mount(el, (dar) => {
      const W = dar ? 360 : 640, H = dar ? 430 : 350;
      const svg = svgRoot(W, H, 'Natriüretik peptitlerin glomerül ve nefrondaki dört etkisi ve onkotik basınç', dar, el);
      const sc = dar ? 0.8 : 1;
      const M = dar ? (x, y) => [(x - 150) * sc + 20, (y - 100) * sc + 112] : (x, y) => [x, y];
      const M2 = dar ? (x, y) => [(x - 575) * 0.8 + 290, (y - 120) * 0.8 + 250] : (x, y) => [x, y];
      const tr = (fn, x, y) => { const [a, b] = fn(x, y); return `translate(${a} ${b}) scale(${dar ? sc : 1}) translate(${-x} ${-y})`; };
      // kalp
      const hx = dar ? 10 : 20, hy = dar ? 8 : 12;
      S('path', { d: `M${hx + 40} ${hy + 20} C${hx + 40} ${hy} ${hx} ${hy} ${hx} ${hy + 28} C${hx} ${hy + 52} ${hx + 40} ${hy + 72} ${hx + 40} ${hy + 86} C${hx + 40} ${hy + 72} ${hx + 80} ${hy + 52} ${hx + 80} ${hy + 28} C${hx + 80} ${hy} ${hx + 40} ${hy} ${hx + 40} ${hy + 20}z`, class: 'f69-an-kalp' }, svg);
      T(svg, hx + 40, hy + 34, 'ANP', 'f69-s f69-b f69-onc', 'middle'); T(svg, hx + 40, hy + 58, 'BNP', 'f69-s f69-b f69-onc', 'middle');
      wrapT(svg, dar ? 100 : 20, dar ? 22 : 112, 'Gerilme reseptörleri → medulla oblongataya afferent ↓ → noradrenalin, ADH, renin ↓', dar ? 30 : 22, 'f69-s', 14);
      // adrenal
      const ax = dar ? 288 : 560, ay = dar ? 46 : 38; const adr = S('ellipse', { cx: ax, cy: ay, rx: 26, ry: 14, class: 'f69-an-adr' }, svg); const adt = T(svg, ax, ay + 32, 'Adrenal (aldosteron)', 'f69-s', 'middle');
      // glomerül
      const gg = S('g', { transform: dar ? `translate(${M(150, 100)[0]} ${M(150, 100)[1]}) scale(${sc}) translate(-150 -100)` : '' }, svg);
      S('circle', { cx: 300, cy: 200, r: 74, class: 'f69-nf-bow' }, gg); S('circle', { cx: 300, cy: 200, r: 56, class: 'f69-an-tuft' }, gg);
      S('path', { d: 'M260 190 q14 -34 30 -4 t30 -8 t24 20 M262 222 q18 20 34 0 t32 -4', class: 'f69-an-cap' }, gg);
      const aff = S('rect', { x: 160, class: 'f69-an-art' }, gg), eff = S('rect', { x: 368, class: 'f69-an-art' }, gg);
      const mzs = [[278, 180], [322, 178], [292, 224], [318, 220]].map(([x, y]) => S('circle', { cx: x, cy: y, class: 'f69-an-mz' }, gg));
      const prs = []; for (let i = 0; i < 16; i++) prs.push(S('circle', { cx: 262 + rnd() * 76, cy: 168 + rnd() * 64, r: 2.6, class: 'f69-an-pr' }, gg));
      const jgs = [[236, 168], [248, 166], [242, 178]].map(([x, y]) => S('circle', { cx: x, cy: y, r: 5, class: 'f69-an-jg' }, gg));
      // nefron parçası
      const gn = S('g', { transform: dar ? tr(M2, 575, 120) : '' }, svg); S('rect', { x: 560, y: 120, width: 30, height: 180, rx: 8, class: 'f69-an-tube' }, gn);
      const chs = []; for (let i = 0; i < 5; i++) { chs.push(S('rect', { x: 555, y: 140 + i * 30, width: 6, height: 12, class: 'f69-an-ch' }, gn)); chs.push(S('rect', { x: 589, y: 140 + i * 30, width: 6, height: 12, class: 'f69-an-ch' }, gn)); }
      const xs = S('g', {}, svg);
      // etiketler (ölçeksiz)
      let q = M(165, 196); T(svg, q[0], q[1] + 2, 'afferent', 'f69-s');
      q = M(372, 246); T(svg, dar ? q[0] - 6 : q[0], q[1] + (dar ? 6 : 8), 'eferent', 'f69-s');
      q = M(236, 150); T(svg, dar ? q[0] - 36 : q[0] - 70, q[1] - (dar ? 18 : 6), 'granüler hücreler', 'f69-s f69-clin');
      q = M2(575, 112); T(svg, q[0], q[1] - 6, 'DKT / toplayıcı kanal', 'f69-s', 'middle');
      q = M(300, 286); T(svg, q[0], q[1] + 8, 'glomerül', 'f69-s', 'middle');
      const nt = T(svg, dar ? 20 : 20, H - (dar ? 54 : 42), '', 'f69-t f69-b f69-acci'); const rs = T(svg, dar ? 20 : 20, H - (dar ? 34 : 20), '', 'f69-s f69-b');
      const draw = () => {
        const d = sel ? E[sel] : null;
        aff.setAttribute('width', 76); aff.setAttribute('height', wa); aff.setAttribute('y', 168 - wa / 2); eff.setAttribute('width', 84); eff.setAttribute('height', we); eff.setAttribute('y', 224 - we / 2);
        mzs.forEach((m) => m.setAttribute('r', 6 * mz)); prs.forEach((p, i) => { p.style.opacity = i < 16 * prot ? 1 : 0; });
        chs.forEach((c) => c.classList.toggle('x', !!(d && d.ch))); [adr].forEach((a) => a.classList.toggle('off', !!(d && d.rn))); jgs.forEach((j) => j.classList.toggle('off', !!(d && d.rn)));
        xs.innerHTML = '';
        const X = (a, b) => { S('line', { x1: a - 7, y1: b - 7, x2: a + 7, y2: b + 7, class: 'f69-di-x' }, xs); S('line', { x1: a + 7, y1: b - 7, x2: a - 7, y2: b + 7, class: 'f69-di-x' }, xs); };
        if (d && d.ch) [[558, 170], [558, 230], [592, 200], [592, 260]].forEach(([x, y]) => { const c = M2(x, y); X(c[0], c[1]); });
        if (d && d.rn) { X(ax, ay); const c = M(242, 172); X(c[0], c[1]); }
        nt.textContent = d ? d.not : ''; rs.textContent = d ? 'Sonuç: Na⁺ ve su atılımı ↑' : '';
        gg.classList.toggle('hl', sel === 'afe' || sel === 'mez' || sel === 'onk'); gn.classList.toggle('hl', sel === 'kan');
      };
      draw();
      const ctl = div('f69-ctl', el);
      const target = () => (sel ? E[sel] : { aff: 14, eff: 14, mz: 1, prot: 1 });
      ctl.appendChild(seg('Hipervolemide böbrek yanıtı', [['afe', 'Afferent dilatasyon + eferent konstriksiyon'], ['mez', 'Mezangiyal gevşeme'], ['kan', 'Na⁺ kanalı inhibisyonu'], ['ren', 'Renin ve aldosteron inhibisyonu'], ['onk', 'Onkotik basınç']], null, (v) => { sel = v; cap.set(E[v].cap); if (RM) { const t = target(); wa = t.aff; we = t.eff; mz = t.mz; prot = t.prot; } draw(); }));
      if (RM) return () => {};
      return ticker(el, (dt) => { const t = target(), k = Math.min(1, dt * 4); const nwa = lerp(wa, t.aff, k), nwe = lerp(we, t.eff, k), nm = lerp(mz, t.mz, k), np = lerp(prot, t.prot, k); if (Math.abs(nwa - wa) + Math.abs(nwe - we) + Math.abs(nm - mz) + Math.abs(np - prot) > 0.001) { wa = nwa; we = nwe; mz = nm; prot = np; draw(); } });
    });
  };

  /* ---------- 14 · K⁺ dağılımı ve kayma ---------- */
  VIZ.f69_kkayma = (el) => {
    const cap = mkCap(el); let mode = 'dag', val = 4.5;
    const M = {
      dag: { v: 4.5, t: '' },
      ins: { v: 4.5, t: 'Bağırsaktan 70 mmol/gün K⁺ girer; insülin Na⁺/K⁺-ATPazı hızlandırır → plazma K⁺ sıçramaz.', cap: '**Yemek ve insülin.** Batı diyeti günde 70 mmol K⁺ (gerekenin 10 katı) verir ve neredeyse tamamı emilir; glukoza yanıt salınan insülin Na⁺/K⁺-ATPazı uyarıp K⁺\'u hücreye alır, plazma K⁺\'u sabit kalır. [[K1 s. 326]]' },
      b2: { v: 3.4, t: 'K⁺ hücre içine → plazma K⁺ ↓ (hipokalemi).', cap: '**β₂-adrenoseptör.** K⁺\'u hücre içine alır; akut stres yanıtında ve salbutamolla hipokalemi görülmesinin bir nedenidir. [[K1 s. 326]]' },
      a: { v: 5.2, t: 'K⁺ hücre dışına → plazma K⁺ ↑. Çalışan kasta yerel hiperkalemi: glikojenoliz, vazodilatasyon.', cap: '**α-adrenoseptör.** Hücreden K⁺ çıkarır; çalışan kasta yerel hiperkalemi glikojenoliz ve vazodilatasyonu uyarır. [[K1 s. 326]]' },
      asid: { v: 6.2, t: 'H⁺ hücreye girip tamponlanır; Na⁺/K⁺-ATPaz bozulur, K⁺ dışarı sızar → hiperkalemi.', cap: '**Metabolik asidoz.** Fazla H⁺\'un çoğu hücre içinde tamponlanır; hücre içi asidoz Na⁺/K⁺-ATPazı bozar, K⁺ dışarı sızar: hiperkalemi. [[K1 s. 326]]' },
      alk: { v: 3.4, t: 'Tersi: K⁺ hücreye geçer, plazma K⁺ ↓.', cap: '**Metabolik alkaloz.** Tersi olur: K⁺ hücreye geçer, plazma K⁺\'u düşer. [[K1 s. 326]]' },
    };
    return mount(el, (dar) => {
      const W = dar ? 360 : 640, H = dar ? 436 : 320;
      const svg = svgRoot(W, H, 'K⁺ dağılımı: hücre içinde %98, hücre dışında %2; kaydıran etkenler', dar, el);
      const uid = ++UID, mk1 = 'f69-mka' + uid, mk2 = 'f69-mkb' + uid, mk3 = 'f69-mkc' + uid; marker(svg, 'var(--c-basic)', mk1); marker(svg, 'var(--crit)', mk2); marker(svg, 'var(--accent-ink)', mk3);
      const cx = dar ? 112 : 170, cy = dar ? 104 : 138, R = dar ? 78 : 100;
      S('circle', { cx, cy, r: R, class: 'f69-kk-hucre' }, svg); S('circle', { cx, cy, r: R, class: 'f69-kk-zar' }, svg);
      for (let i = 0; i < 34; i++) { const a = rnd() * 6.283, r = Math.sqrt(rnd()) * (R - 14); S('circle', { cx: cx + Math.cos(a) * r, cy: cy + Math.sin(a) * r, r: 3.4, class: 'f69-kk-k' }, svg); }
      const hx = dar ? 236 : 300; for (let i = 0; i < 9; i++) S('circle', { cx: hx + rnd() * (dar ? 100 : 230), cy: (dar ? 74 : 60) + rnd() * (dar ? 80 : 150), r: 3.4, class: 'f69-kk-k' }, svg);
      T(svg, cx, cy + R + 20, 'HİS · %98 · 150 mmol/L', 'f69-t f69-b', 'middle');
      T(svg, hx - 4, dar ? 22 : 24, 'HDS · %2', 'f69-t f69-b'); T(svg, hx - 4, dar ? 38 : 42, '3,5–5,5 mmol/L', 'f69-s');
      const pa = cx + R; const pump = S('g', {}, svg); S('circle', { cx: pa, cy: cy, r: 13, class: 'f69-hs-pump' }, pump);
      T(svg, pa + 8, cy + 4, 'Na⁺/K⁺-ATPaz', 'f69-s f69-b', 'start').setAttribute('x', pa + 18);
      const ov = S('g', {}, svg), mt = S('g', {}, svg), tx = S('g', {}, svg);
      const draw = () => {
        ov.innerHTML = ''; mt.innerHTML = ''; tx.innerHTML = '';
        const ang = [-0.85, -0.5, 0.5, 0.85];
        const dirIn = mode === 'ins' || mode === 'b2' || mode === 'alk', dirOut = mode === 'a' || mode === 'asid';
        ang.forEach((a) => { const x0 = cx + Math.cos(a) * (R + 4), y0 = cy + Math.sin(a) * (R + 4), x1 = cx + Math.cos(a) * (R + 38), y1 = cy + Math.sin(a) * (R + 38); if (dirIn) S('line', { x1, y1, x2: x0, y2: y0, class: 'f69-kk-ar', 'marker-end': `url(#${mk1})` }, ov); if (dirOut) S('line', { x1: x0 - 8, y1: y0, x2: x1, y2: y1, class: 'f69-kk-ar o', 'marker-end': `url(#${mk2})` }, ov); });
        if (mode === 'asid') { [[-0.68, 0], [0.68, 1], [1.05, 2]].forEach(([a, i]) => { const x = cx + Math.cos(a) * (R + 22), y = cy + Math.sin(a) * (R + 22); S('circle', { cx: x, cy: y, r: 5, class: 'f69-kk-h' }, ov); T(ov, x + 8, y + 4, 'H⁺', 'f69-s f69-crit f69-b'); }); }
        if (mode === 'ins') { const x = dar ? 20 : 280; wrapT(ov, x, dar ? 250 : 290, '', 20); }
        pump.classList.toggle('pulse', mode === 'ins'); pump.classList.toggle('dead', mode === 'asid');
        // metre
        const v = val;
        if (!dar) {
          const my = (k) => 262 - (k - 2) / 6 * 210; S('rect', { x: 580, y: my(5.5), width: 22, height: my(3.5) - my(5.5), class: 'f69-bant' }, mt); S('line', { x1: 591, x2: 591, y1: my(8), y2: my(2), class: 'f69-ax' }, mt);
          [2, 4, 6, 8].forEach((k) => T(mt, 574, my(k) + 4, k, 'f69-s', 'end')); T(mt, 591, 36, 'Plazma K⁺', 'f69-s f69-b', 'middle');
          S('path', { d: `M562 ${my(v)} l12 -7 v14z`, class: 'f69-to-mk' }, mt); T(mt, 591, 284, fmt(v, 1) + ' mmol/L', 'f69-s f69-b', 'middle');
        } else {
          const mx = (k) => 20 + (k - 2) / 6 * 320; S('rect', { x: mx(3.5), y: 258, width: mx(5.5) - mx(3.5), height: 14, class: 'f69-bant' }, mt); S('line', { x1: mx(2), x2: mx(8), y1: 265, y2: 265, class: 'f69-ax' }, mt);
          [2, 4, 6, 8].forEach((k) => T(mt, mx(k), 292, k, 'f69-s', 'middle')); T(mt, 20, 246, 'Plazma K⁺ (mmol/L)', 'f69-s f69-b');
          S('path', { d: `M${mx(v)} 256 l-7 -12 h14z`, class: 'f69-to-mk' }, mt); T(mt, mx(v), 312, fmt(v, 1), 'f69-s f69-b', 'middle');
        }
        const tt = M[mode].t; if (tt) wrapT(tx, dar ? 20 : 290, dar ? 340 : 232, tt, dar ? 46 : 36, 'f69-s', 14);
        T(tx, dar ? 20 : 20, dar ? 414 : 304, 'Hızlı değişiklik: kayma · toplam denge: böbrek (yavaş)', 'f69-s f69-b f69-acci');
      };
      draw();
      const ctl = div('f69-ctl', el);
      ctl.appendChild(seg('K⁺ kaydıran etken', [['dag', 'Dağılım'], ['ins', 'Yemek + insülin'], ['b2', 'β₂ (stres, salbutamol)'], ['a', 'α-adrenerjik'], ['asid', 'Metabolik asidoz'], ['alk', 'Metabolik alkaloz']], mode, (v) => { mode = v; v === 'dag' ? cap.reset() : cap.set(M[v].cap); if (RM) val = M[v].v; draw(); }));
      if (RM) return () => {};
      return ticker(el, (dt) => { const t = M[mode].v; if (Math.abs(val - t) > 0.01) { val += (t - val) * Math.min(1, dt * 3); draw(); } else if (val !== t) { val = t; draw(); } });
    });
  };

  /* ---------- 16 · Plazma K⁺, EKG ve tedavi ---------- */
  VIZ.f69_kklinik = (el) => {
    const cap = mkCap(el); let K = 4.5, tm = 0, ted = null;
    const gs = (x, c, s, a) => a * Math.exp(-((x - c) * (x - c)) / (2 * s * s));
    // temsilî dalga biçimi: t 0–1
    const beat = (t, k) => {
      const hi = clamp((k - 5.5) / 1.5, 0, 1.6), wide = clamp((k - 6.8) / 1.0, 0, 1), lo = clamp((3.5 - k) / 1.0, 0, 1.6), vlo = clamp((3 - k) / 0.8, 0, 1);
      const pAmp = 0.13 * (1 - clamp((k - 6.2) / 1.6, 0, 1)), pc = 0.12 - 0.05 * vlo, qrs = 0.011 * (1 + 3.2 * wide), c = 0.31 + 0.02 * wide;
      const tAmp = lo > 0 ? 0.32 * (1 - lo * 1.1) - 0.1 * vlo : 0.3 + 0.47 * hi, tSig = hi > 0 ? 0.05 - 0.016 * Math.min(hi, 1) : 0.05, tc = 0.56 - 0.1 * wide;
      let y = gs(t, pc, 0.022, pAmp);
      y += gs(t, c - qrs * 1.6, qrs * 0.7, -0.14) + gs(t, c, qrs, 1) + gs(t, c + qrs * 1.7, qrs * 0.8, -0.2);
      y += gs(t, c + 0.12, 0.07, -0.28 * vlo - 0.08 * Math.min(lo, 1));
      y += gs(t, tc, tSig * (1 + wide * 0.6), tAmp);
      y += gs(t, 0.76, 0.03, 0.2 * vlo);
      return y;
    };
    const LBL = (k) => { const a = []; if (k >= 5.5 && k < 7) a.push(['T', 'sivri T', 'up']); if (k >= 7) { a.push(['T', 'sivri T', 'up']); a.push(['Q', 'geniş QRS', 'up']); } if (k < 3.5 && k >= 3) a.push(['T', 'düzleşen T', 'up']); if (k < 3) { a.push(['T', 'düz/ters T', 'dn']); a.push(['P', 'uzun PR', 'up']); a.push(['U', 'U dalgası', 'up']); a.push(['S', 'ST çökmesi', 'dn']); } return a; };
    const TED = {
      ca: { ad: 'Ca²⁺', cap: '**Kalsiyum (%10 CaCl₂ 10 mL).** Ca²⁺ zarın dış yüzüne bağlanır, yerel pozitif yük yoğunluğu hücre içini göreceli daha negatif yapar ve RMP stabilleşir; K⁺ değişmez. [[K1 s. 327]]', rozet: 'Kardiyoproteksiyon: K⁺ değişmez · doz: %10 CaCl₂ 10 mL', d: 0, tip: 'ca' },
      ins: { ad: 'İnsülin/dekstroz', cap: '**İnsülin/dekstroz.** Hücresel K⁺ alımını artırır; total vücut K⁺\'u değişmez. [[K1 s. 327]]', rozet: 'Total vücut K⁺\'u değişmez', d: 0.9, tip: 'kay' },
      sal: { ad: 'Salbutamol', cap: '**Salbutamol.** β₂ etkisiyle K⁺\'u hücre içine geçirir; total vücut K⁺\'u değişmez. [[K1 s. 327]]', rozet: 'Total vücut K⁺\'u değişmez', d: 0.6, tip: 'kay' },
      bik: { ad: 'NaHCO₃', cap: '**Sodyum bikarbonat (hiperkalemi + metabolik asidoz).** HDS pH\'ı yükselince hücrede tutulan H⁺ dışarı çıkar, K⁺ içeri girer; total vücut K⁺\'u değişmez. [[K1 s. 327]]', rozet: 'Total vücut K⁺\'u değişmez', d: 0.5, tip: 'kay' },
      rez: { ad: 'Rezonyum / diyaliz', cap: '**Kalsiyum rezonyum ya da hemodiyaliz/hemofiltrasyon.** Uzun dönemde K⁺ vücuttan atılır; total vücut K⁺\'u azalır. [[K1 s. 327]]', rozet: 'Total vücut K⁺\'u azalır', d: 1.0, tip: 'at' },
    };
    return mount(el, (dar) => {
      const kr = range('Plazma K⁺', 2, 8, 0.1, K, 'mmol/L', (v) => { K = Math.round(v * 10) / 10; if (K <= 6) ted = null; upd(); }, 1);
      kr.w.classList.add('f69-rng-k'); el.appendChild(kr.w);
      const row = div('f69-kk-row' + (dar ? ' dar' : ''), el);
      const W = dar ? 360 : 460, H = dar ? 128 : 170;
      const svg = svgRoot(W, H, 'Plazma K⁺ düzeyine göre EKG biçimi', dar, row);
      const base = H * 0.64, amp = dar ? 62 : 74, Lb = dar ? 120 : 150, nb = Math.ceil(W / Lb) + 2;
      S('line', { x1: 0, x2: W, y1: base, y2: base, class: 'f69-ek-0' }, svg);
      const line = S('path', { class: 'f69-ek' }, svg); const lab = S('g', {}, svg); const warn = S('g', {}, svg);
      const draw = (off) => {
        let d = ''; const N = 28; for (let b = 0; b < nb; b++) for (let i = 0; i <= N; i++) { const t = i / N, x = b * Lb + t * Lb - off; if (x < -4 || x > W + 4) continue; const y = base - beat(t, K) * amp; d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); }
        line.setAttribute('d', d); lab.innerHTML = '';
        const b0 = Math.round(W * 0.5 / Lb - 0.5), posX = (t) => b0 * Lb + t * Lb - off;
        LBL(K).forEach(([n, txt, dir]) => { const t = n === 'T' ? 0.56 - 0.1 * clamp(K - 6.8, 0, 1) : n === 'Q' ? 0.3 : n === 'P' ? 0.1 : n === 'U' ? 0.76 : 0.43; let x = posX(t); while (x < 40) x += Lb; while (x > W - 40) x -= Lb; const y = dir === 'up' ? (n === 'T' ? base - beat(t, K) * amp - 10 : n === 'Q' ? 14 : n === 'P' ? base - 50 : base - 22) : base + 26; T(lab, x, dir === 'up' ? Math.max(14, y) : y, txt, 'f69-s f69-b f69-acci', 'middle'); });
        warn.innerHTML = ''; if (K > 6) { S('rect', { x: W - 96, y: 6, width: 90, height: 22, rx: 11, class: 'f69-ek-vf' }, warn); T(warn, W - 51, 21, 'VF riski', 'f69-s f69-b f69-crit', 'middle'); }
      };
      const zs = svgRoot(160, 130, 'Zar potansiyeli: hiperkalemide depolarizasyon, hipokalemide hiperpolarizasyon', dar, row); zs.setAttribute('class', 'f69-svg f69-ek-zar');
      S('line', { x1: 14, x2: 150, y1: 38, y2: 38, class: 'f69-ek-th' }, zs); T(zs, 148, 32, 'eşik', 'f69-s', 'end'); const rmpL = S('line', { x1: 14, x2: 150, class: 'f69-ek-rmp' }, zs); const rmpT = T(zs, 14, 0, 'RMP', 'f69-s f69-b'); const zt = T(zs, 80, 122, '', 'f69-s f69-b', 'middle');
      const zdraw = () => { const y = clamp(86 - (K - 4.5) * 10, 50, 108); rmpL.setAttribute('y1', y); rmpL.setAttribute('y2', y); rmpT.setAttribute('y', y - 6); zt.textContent = K > 6 ? 'depolarizasyon' : K < 3 ? 'hiperpolarizasyon' : ''; };
      const ctl = div('f69-ctl', el); const panel = div('f69-kk-panel', el);
      const body = (tip) => {
        const s = svgRoot(300, 110, 'Hücre ve plazma arasında K⁺ hareketi', dar, panel); s.setAttribute('class', 'f69-svg f69-kk-body'); const m1 = 'f69-mkk' + (++UID); marker(s, 'var(--c-basic)', m1);
        S('circle', { cx: 60, cy: 58, r: 46, class: 'f69-kk-hucre' }, s); T(s, 60, 62, 'hücre', 'f69-s f69-b', 'middle'); S('rect', { x: 130, y: 12, width: 164, height: 92, rx: 12, class: 'f69-bo-int' }, s); T(s, 212, 30, 'plazma (K⁺ yüksek)', 'f69-s f69-b', 'middle');
        for (let i = 0; i < 7; i++) S('circle', { cx: 150 + rnd() * 124, cy: 42 + rnd() * 34, r: 3.4, class: 'f69-kk-k' }, s);
        if (tip === 'kay') { S('line', { x1: 132, y1: 58, x2: 108, y2: 58, class: 'f69-kk-ar', 'marker-end': `url(#${m1})` }, s); S('line', { x1: 132, y1: 78, x2: 106, y2: 74, class: 'f69-kk-ar', 'marker-end': `url(#${m1})` }, s); T(s, 118, 102, 'hücre içine', 'f69-s f69-acci', 'middle'); }
        if (tip === 'ca') { for (let i = 0; i < 7; i++) { const a = -0.9 + i * 0.3; S('circle', { cx: 60 + Math.cos(a) * 52, cy: 58 + Math.sin(a) * 52, r: 4.4, class: 'f69-kk-ca' }, s); } T(s, 212, 96, 'Ca²⁺ zar dış yüzünde', 'f69-s f69-acci', 'middle'); }
        if (tip === 'at') { arrow(s, 230, 58, 296, 58, 6, 'var(--accent-ink)'); T(s, 250, 102, 'vücuttan atılır', 'f69-s f69-acci', 'middle'); }
      };
      const upd = () => {
        kr.set(K); zdraw(); draw(RM ? 0 : (tm * 55) % Lb);
        panel.innerHTML = ''; ctl.innerHTML = '';
        const hi = K > 6, lo = K < 3; let c;
        if (hi) {
          ctl.appendChild(seg('Tedavi', Object.entries(TED).map(([k, v]) => [k, v.ad]), ted, (v) => { ted = v; upd(); }));
          if (ted) { const t = TED[ted]; body(t.tip); const p = document.createElement('p'); p.className = 'f69-kk-roz'; p.innerHTML = `<b>${t.rozet}</b>` + (t.d ? ` · tedavi sonrası ≈ ${fmt(Math.max(5, K - t.d), 1)} mmol/L (temsilî)` : ''); panel.appendChild(p); c = t.cap; }
          else c = `**Anlamlı hiperkalemi (${fmt(K, 1)} mmol/L).** Zar depolarize olur; uzun sivri T, sonra geniş QRS; ventrikül fibrilasyonu gibi ölümcül aritmi riski. Bir tedavi seçin. [[K1 s. 326–327]]`;
          const n = document.createElement('p'); n.className = 'f69-kk-n'; n.innerHTML = '<b>Nedenler:</b> akut böbrek yetmezliği, ağır metabolik asidoz, ilaçlar (spironolakton, süksametonyum), Addison, hücre yıkımı (hemoliz, rabdomiyoliz).'; panel.appendChild(n);
        } else if (lo) {
          panel.insertAdjacentHTML('beforeend', '<div class="f69-kk-bars"><div><span>Periferik ven</span><i style="--w:50%"></i><b>10 mmol/sa</b></div><div><span>Santral ven (monitörizasyonla)</span><i style="--w:100%"></i><b>20 mmol/sa\'e kadar</b></div></div><p class="f69-kk-uy">Hızlı IV: ventriküler taşiaritmi.</p><p class="f69-kk-roz"><b>Hastaların yarısında hipomagnezemi</b> → Mg²⁺ olmadan Na⁺/K⁺-ATPaz çalışmaz, ikisini de düzeltin.</p><p class="f69-kk-n"><b>Klinik:</b> kas güçsüzlüğü, miyalji → flask paralizi, solunum yetmezliği.<br><b>Nedenler:</b> az alım · ishal · alkaloz · Conn sendromu.</p>');
          c = `**Anlamlı hipokalemi (${fmt(K, 1)} mmol/L).** Zar hiperpolarize olur, depolarize olmak güçleşir: güçsüzlük, ağırsa flask paralizi ve solunum yetmezliği. EKG: düz/ters T, uzun PR, U dalgası, ST çökmesi. [[K1 s. 327–328]]`;
        } else {
          panel.insertAdjacentHTML('beforeend', '<p class="f69-kk-n">Normal ya da hafif sapma.</p>');
          c = K >= 5.5 ? `**Hafif yüksek K⁺ (${fmt(K, 1)} mmol/L).** Anlamlı hiperkalemi eşiği 6 mmol/L'dir. [[K1 s. 326]]` : K < 3.5 ? `**Hafif düşük K⁺ (${fmt(K, 1)} mmol/L).** Anlamlı hipokalemi eşiği 3 mmol/L'dir. [[K1 s. 327]]` : (K === 4.5 ? null : `**Normal (${fmt(K, 1)} mmol/L).** EKG olağan. K⁺'u değiştirin ya da hiperkalemide bir tedavi seçin. [[K1 s. 326–328]]`);
        }
        c ? cap.set(c) : cap.reset();
      };
      row.insertBefore(svg, row.firstChild);
      upd();
      if (RM) return () => {};
      return ticker(el, (dt) => { tm += dt; draw((tm * 55) % Lb); });
    });
  };
})();
