/* Bölüm 55 · Kas iğcikleri ve Golgi tendon organları · bileşenler (tarif: docs/tasarim/fiz55.md; K1 s. 246–248).
   Şematik modeller; ateşleme sıklıkları ve açılar temsilîdir, kitap sayı vermez. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const txt = (parent, x, y, s, cls, anchor) => { const t = mk('text', { x, y, class: cls || 'f55-t' }, parent); if (anchor) t.setAttribute('text-anchor', anchor); t.textContent = s; return t; };
  const rnd = (() => { let s = 11; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();
  const seg = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const setSeg = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const capOf = (el) => el.closest('.viz').querySelector('.viz-cap');
  const setCap = (el, html) => { const c = capOf(el); if (c) c.innerHTML = REF(html); };
  const svgOf = (parent, W, H, label, y0) => { const s = mk('svg', { class: 'f55-svg', viewBox: `0 ${y0 || 0} ${W} ${H - (y0 || 0)}`, role: 'img', 'aria-label': label }, parent); return s; };

  /* Görünüm genişliğine göre geniş/dar yerleşim; durum S dışarıda tutulur, yeniden çizimde korunur. */
  function shell(el, make) {
    const S = {}; let cur = null, dar = null;
    const draw = () => {
      const d = el.clientWidth > 0 && el.clientWidth < 600;
      if (cur && d === dar) return;
      dar = d; if (cur) cur.destroy(); el.innerHTML = ''; cur = make(d, S);
    };
    draw();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(draw) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); if (cur) cur.destroy(); };
  }

  /* Aksiyon potansiyeli: bir yol üzerinde kayan küçük nokta (spike) havuzu. */
  function spk(parent, pathEl, color, n) {
    const dots = Array.from({ length: n || 6 }, () => ({ p: -1, c: mk('circle', { r: 3.4, class: 'f55-sp', style: `fill:${color}`, opacity: 0 }, parent) }));
    let acc = 0; const len = () => pathEl.getTotalLength();
    return {
      upd(dt, rate, speed) {
        acc += dt * rate;
        if (acc >= 1) { acc -= 1; const d = dots.find((x) => x.p < 0); if (d) d.p = 0; }
        const L = len();
        dots.forEach((d) => {
          if (d.p < 0) return;
          d.p += dt * (speed || 0.9);
          if (d.p >= 1) { d.p = -1; d.c.setAttribute('opacity', 0); return; }
          const pt = pathEl.getPointAtLength(d.p * L); d.c.setAttribute('cx', pt.x.toFixed(1)); d.c.setAttribute('cy', pt.y.toFixed(1)); d.c.setAttribute('opacity', 1);
        });
      },
      clear() { dots.forEach((d) => { d.p = -1; d.c.setAttribute('opacity', 0); }); acc = 0; },
    };
  }
  /* Kayan ateşleme izi paneli: sağdan sola akan dikey çizgiler. */
  function raster(parent, x, y, w, h, color, secs) {
    mk('rect', { x, y, width: w, height: h, rx: 6, class: 'f55-rbg' }, parent);
    const p = mk('path', { class: 'f55-rs', style: `stroke:${color}` }, parent);
    const ages = []; let acc = 0; const sp = (w - 8) / (secs || 3);
    return {
      upd(dt, rate) {
        acc += dt * rate; while (acc >= 1) { acc -= 1; ages.push(acc / Math.max(rate, 0.01)); }
        for (let i = ages.length - 1; i >= 0; i--) { ages[i] += dt; if (ages[i] * sp > w - 8) ages.splice(i, 1); }
        p.setAttribute('d', ages.map((a) => { const xx = (x + w - 4 - a * sp).toFixed(1); return `M${xx} ${y + 5}V${y + h - 5}`; }).join(''));
      },
      clear() { ages.length = 0; acc = 0; p.setAttribute('d', ''); },
    };
  }

  /* ---------- İğcik çizimi (ortak yardımcı): kapsül + nükleer torba lifi + nükleer zincir lifi ----------
     set({len, uc, slack}): len toplam boy çarpanı, uc kasılabilen uç uzunluğu çarpanı, slack orta bölümün gevşekliği (0 gergin). */
  function igcik(parent, o) {
    const { cx, cy, w, h } = o; const e0 = o.e0 || w * 0.2;
    const g = mk('g', { class: 'f55-ig' }, parent);
    const cap = mk('path', { class: 'f55-cap', 'data-tags': 'kapsul', 'data-c': 'kapsul' }, g);
    const yb = cy - h * 0.19, yc = cy + h * 0.19, tb = Math.max(6, h * 0.13), tc = Math.max(4.5, h * 0.09);
    const bagM = mk('path', { class: 'f55-mid', 'data-tags': 'torba torta', 'data-c': 'torba' }, g);
    const chM = mk('path', { class: 'f55-mid', 'data-tags': 'zincir zorta', 'data-c': 'zincir' }, g);
    const bulge = mk('ellipse', { class: 'f55-mid f55-bulge', 'data-tags': 'torba torta', 'data-c': 'torba' }, g);
    const ends = [['torba uc', yb, tb], ['torba uc', yb, tb], ['zincir uc', yc, tc], ['zincir uc', yc, tc]].map(([t, y, th]) => mk('rect', { class: 'f55-uc', 'data-tags': t, 'data-c': 'uc', rx: th / 2, height: th, y: y - th / 2 }, g));
    const nr = Math.max(1.5, h * 0.022);
    const bN = Array.from({ length: 9 }, () => ({ dx: (rnd() - 0.5) * 1.7, dy: (rnd() - 0.5) * 1.6, c: mk('circle', { r: nr, class: 'f55-nuc', 'data-tags': 'torba torta', 'data-c': 'torba' }, g) }));
    const cN = Array.from({ length: 8 }, () => mk('circle', { r: nr, class: 'f55-nuc', 'data-tags': 'zincir zorta', 'data-c': 'zincir' }, g));
    const geo = {};
    function set(s) {
      const len = s.len == null ? 1 : s.len, uc = s.uc == null ? 1 : s.uc, slack = s.slack || 0;
      const F = w * len, x0 = cx - F / 2, x1 = cx + F / 2, E = Math.min(e0 * uc, F * 0.45), xa = x0 + E, xb = x1 - E, mid = xb - xa;
      const cw = F * 0.9, c0 = cx - cw / 2, c1 = cx + cw / 2, k = cw * 0.16;
      cap.setAttribute('d', `M${c0} ${cy}C${c0 + k} ${cy - h * 0.667} ${c1 - k} ${cy - h * 0.667} ${c1} ${cy}C${c1 - k} ${cy + h * 0.667} ${c0 + k} ${cy + h * 0.667} ${c0} ${cy}Z`);
      const wav = (y) => { if (slack < 0.02) return `M${xa} ${y}H${xb}`; let d = `M${xa} ${y}`; const n = 24, amp = slack * h * 0.16; for (let i = 1; i <= n; i++) d += `L${(xa + (mid * i) / n).toFixed(1)} ${(y + Math.sin((i / n) * Math.PI * 6) * amp).toFixed(1)}`; return d; };
      bagM.setAttribute('d', wav(yb)); chM.setAttribute('d', wav(yc));
      const rx = Math.min(w * 0.085, mid * 0.28);
      bulge.setAttribute('cx', cx); bulge.setAttribute('cy', yb); bulge.setAttribute('rx', rx); bulge.setAttribute('ry', h * 0.15);
      const xs = [[x0, E], [x1 - E, E], [x0, E], [x1 - E, E]];
      ends.forEach((r, i) => { r.setAttribute('x', xs[i][0]); r.setAttribute('width', Math.max(1, xs[i][1])); });
      bN.forEach((n, i) => { n.c.setAttribute('cx', cx + n.dx * rx * 0.8); n.c.setAttribute('cy', yb + n.dy * h * 0.07); });
      cN.forEach((c, i) => { c.setAttribute('cx', xa + (mid * (i + 1)) / 9); c.setAttribute('cy', yc + (slack > 0.02 ? Math.sin(((i + 1) / 9) * Math.PI * 6) * slack * h * 0.16 : 0)); });
      Object.assign(geo, { x0, x1, xa, xb, yb, yc, F });
    }
    set({});
    return { g, set, geo, yb, yc };
  }
  const igInfo = (g) => g.geo;

  /* ---------- 1 · İğciğin yapısı (dokununca vurgulayan) ---------- */
  const IG_CAP = {
    kapsul: '<b>Kapsül.</b> İçinde 3–12 intrafuzal lif vardır; ekstrafuzal liflere paralel durur. Bir parçaya dokunun. [[K1 s. 246]]',
    ekstra: '<b>Ekstrafuzal lifler</b> kasın asıl kasılan lifleridir. İğcik onlara paralel olduğundan, onlar gerilince intrafuzal lifin boyu da değişir. [[K1 s. 246]]',
    torba: '<b>Nükleer torba lifi.</b> Çekirdekler lifin ortasındaki genişlemiş bölümde toplanır. [[K1 s. 246]]',
    zincir: '<b>Nükleer zincir lifi.</b> Genişleme yoktur; çekirdekler lif boyunca dizilir. [[K1 s. 246]]',
    orta: '<b>Orta bölüm</b> kasılmaz ve elastiktir; duyu lifleri buraya sarılır. [[K1 s. 246–247]]',
    uc: '<b>Dış uçlar</b> kasılabilir; γ-motor nöronlar bu uçları innerve eder. [[K1 s. 246–247]]',
    ia: '<b>Tip Ia afferent.</b> Hem nükleer torba hem nükleer zincir liflerinden girdi alır; statik boyu ve boyun değişim hızını bildirir. [[K1 s. 247]]',
    ii: '<b>Tip II afferent.</b> Yalnız nükleer zincir liflerinden girdi alır; yalnız statik boyu bildirir. [[K1 s. 247]]',
    gama: '<b>γ-motor nöron.</b> İntrafuzal liflerin kasılabilen dış uçlarını innerve eder; her biri birkaç iğciğe gider. [[K1 s. 247]]',
  };
  const IG_SETS = { kapsul: ['kapsul'], ekstra: ['ekstra'], torba: ['torba'], zincir: ['zincir'], uc: ['uc'], orta: ['torta', 'zorta'], ia: ['ia'], ii: ['ii'], gama: ['gama'] };
  const IG_NERV = { Ia: ['ia', 'torta', 'zorta'], II: ['ii', 'zorta'], G: ['gama', 'uc'] };
  const IG_CHIP = [['kapsul', 'Kapsül'], ['ekstra', 'Ekstrafuzal lifler'], ['torba', 'Torba lifi'], ['zincir', 'Zincir lifi'], ['uc', 'Kasılabilen uç'], ['orta', 'Orta bölüm'], ['ia', 'Ia'], ['ii', 'II'], ['gama', 'γ']];

  VIZ.f55_igcik = (el) => shell(el, (dar, S) => {
    if (S.sel === undefined) { S.sel = null; S.nerv = 'all'; }
    const W = dar ? 360 : 640, H = dar ? 352 : 312;
    const P = dar ? { cx: 180, cy: 175, w: 280, h: 130, s1: 20, s2: 308, sh: 22, bx: [4, 340], bw: 16, by: 16, bh: 318, yG: 84, yIa: 264, yII: 286, xl: 28 }
      : { cx: 320, cy: 160, w: 500, h: 120, s1: 24, s2: 268, sh: 26, bx: [8, 596], bw: 36, by: 20, bh: 280, yG: 80, yIa: 240, yII: 258, xl: 58 };
    el.innerHTML = `<div class="f55-ctl">${seg('Sinir', 'n', [['all', 'Hepsi'], ['Ia', 'Ia'], ['II', 'II'], ['G', 'γ']], S.nerv)}</div>
      <div class="f55-sv"></div>
      <div class="f55-chips" role="group" aria-label="Parça seç">${IG_CHIP.map(([k, l]) => `<button type="button" class="btn ghost" data-k="${k}" aria-pressed="false">${l}</button>`).join('')}</div>
      <div class="f55-leg"><span><i class="f55-sw uc"></i>kasılabilen uç</span><span><i class="f55-sw mid"></i>elastik orta bölüm</span><span><i class="f55-sw nuc"></i>çekirdek</span></div>`;
    const svg = svgOf(el.querySelector('.f55-sv'), W, H, 'Kas iğciği: kapsül içinde nükleer torba ve nükleer zincir lifi; Ia, II ve γ-motor sinirleri');
    const gE = mk('g', { 'data-tags': 'ekstra', 'data-c': 'ekstra' }, svg);
    [P.s1, P.s2].forEach((y) => mk('rect', { x: P.bx[0] + P.bw, y, width: P.bx[1] - P.bx[0] - P.bw, height: P.sh, rx: 6, class: 'f55-ext' }, gE));
    P.bx.forEach((x) => { mk('rect', { x, y: P.by, width: P.bw, height: P.bh, rx: 5, class: 'f55-ten' }, gE); });
    txt(gE, P.bx[0] + P.bw + 10, P.s1 + P.sh / 2 + 4, dar ? 'Ekstrafuzal lifler' : 'Ekstrafuzal lifler', 'f55-t f55-tin');
    const sp = igcik(svg, { cx: P.cx, cy: P.cy, w: P.w, h: P.h });
    const G = sp.geo, { yb, yc } = sp, tb = Math.max(6, P.h * 0.13), tc = Math.max(4.5, P.h * 0.09);
    // paralel bağlantılar
    [[yb], [yc]].forEach(([y]) => { mk('line', { x1: P.bx[0] + P.bw, x2: G.x0, y1: y, y2: y, class: 'f55-link', 'data-tags': 'ekstra', 'data-c': 'ekstra' }, svg); mk('line', { x1: G.x1, x2: P.bx[1], y1: y, y2: y, class: 'f55-link', 'data-tags': 'ekstra', 'data-c': 'ekstra' }, svg); });
    sp.g.parentNode.appendChild(sp.g); // iğcik bağlantıların üstünde
    const hit = (g, d, c) => mk('path', { d, class: 'f55-hit', 'data-c': c }, g);
    // Ia
    const gIa = mk('g', { 'data-tags': 'ia', 'data-c': 'ia' }, svg), xI = P.cx + 16, sl = [];
    for (let k = 0; k < 3; k++) { const x = P.cx - 14 + k * 10; sl.push(`M${x} ${yb - tb / 2 - 3}L${x + 8} ${yb + tb / 2 + 3}`); sl.push(`M${x} ${yc - tc / 2 - 3}L${x + 8} ${yc + tc / 2 + 3}`); }
    mk('path', { d: sl.join(''), class: 'f55-ia' }, gIa);
    const dIa = `M${xI} ${yb}V${P.yIa}H${P.cx + 120}`; mk('path', { d: dIa, class: 'f55-ia' }, gIa); hit(gIa, dIa, 'ia');
    txt(gIa, P.cx + 126, P.yIa + 4, dar ? 'Tip Ia' : 'Tip Ia afferent', 'f55-t f55-tia');
    // II
    const gII = mk('g', { 'data-tags': 'ii', 'data-c': 'ii' }, svg), xII = P.cx - 56;
    mk('path', { d: [0, 1].map((k) => `M${xII - 5 + k * 9} ${yc - tc / 2 - 3}L${xII + 3 + k * 9} ${yc + tc / 2 + 3}`).join(''), class: 'f55-ii' }, gII);
    const dII = `M${xII} ${yc + tc / 2 + 3}V${P.yII}H${P.cx - 120}`; mk('path', { d: dII, class: 'f55-ii f55-dash' }, gII); hit(gII, dII, 'ii');
    txt(gII, P.cx - 126, P.yII + 4, dar ? 'Tip II' : 'Tip II afferent', 'f55-t f55-tia', 'end');
    // γ
    const gG = mk('g', { 'data-tags': 'gama', 'data-c': 'gama' }, svg), xr = G.x1 + 12, xl = P.xl, pl = dar ? 16 : 22;
    const dG = `M${xl} ${P.yG}H${xr}M${xl} ${P.yG}V${yc}M${xl} ${yb}H${G.x0 + pl}M${xl} ${yc}H${G.x0 + pl}M${xr} ${P.yG}V${yc}M${xr} ${yb}H${G.x1 - pl}M${xr} ${yc}H${G.x1 - pl}`;
    mk('path', { d: dG, class: 'f55-gm' }, gG); hit(gG, dG, 'gama');
    [[G.x0 + pl, yb], [G.x0 + pl, yc], [G.x1 - pl, yb], [G.x1 - pl, yc]].forEach(([x, y]) => mk('circle', { cx: x, cy: y, r: 4.2, class: 'f55-plate' }, gG));
    txt(gG, xl, P.yG - 8, 'γ-motor nöron', 'f55-t f55-tg');
    const dx = dar ? 262 : 470;
    mk('path', { d: `M${dx} ${P.yG}V${P.yG - 24}`, class: 'f55-gm f55-dash' }, gG);
    mk('path', { d: `M${dx - 4} ${P.yG - 19}L${dx} ${P.yG - 25}L${dx + 4} ${P.yG - 19}`, class: 'f55-gm' }, gG);
    txt(gG, dx + 8, P.yG - 12, 'başka iğciklere', 'f55-tm');
    const all = [...svg.querySelectorAll('[data-tags]')];
    const info = el.closest('.viz');
    const apply = () => {
      const act = S.sel ? IG_SETS[S.sel] : (S.nerv !== 'all' ? IG_NERV[S.nerv] : null);
      all.forEach((n) => { const hitIt = act && n.dataset.tags.split(' ').some((t) => act.includes(t)); n.classList.toggle('dim', !!act && !hitIt); n.classList.toggle('on', !!act && !!hitIt); });
      setSeg(el, 'n', S.nerv);
      el.querySelectorAll('[data-k]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.k === S.sel)));
      const key = S.sel || (S.nerv === 'Ia' ? 'ia' : S.nerv === 'II' ? 'ii' : S.nerv === 'G' ? 'gama' : 'kapsul');
      if (S.capKey !== key || S.capDraw) setCap(el, IG_CAP[key]); S.capKey = key; S.capDraw = false;
    };
    svg.addEventListener('click', (e) => { const n = e.target.closest('[data-c]'); if (!n) return; const k = n.dataset.c; S.sel = S.sel === k ? null : k; S.nerv = 'all'; apply(); });
    el.querySelectorAll('[data-k]').forEach((b) => b.addEventListener('click', () => { S.sel = S.sel === b.dataset.k ? null : b.dataset.k; S.nerv = 'all'; apply(); }));
    el.querySelectorAll('[data-n]').forEach((b) => b.addEventListener('click', () => { S.nerv = b.dataset.n; S.sel = null; apply(); }));
    S.capDraw = false; if (S.sel || S.nerv !== 'all') apply(); else { all.forEach((n) => n.classList.remove('dim', 'on')); }
    return { destroy() {} };
  });

  /* ---------- 2 · Germe rampası: Ia boy + hız, II yalnız boy ---------- */
  const GT0 = 1.5, GTW = 6;
  const gDur = (s) => (s <= 2 ? lerp(2, 1, s - 1) : lerp(1, 0.4, s - 2));
  const gDyn = (s) => (s <= 2 ? lerp(6, 14, s - 1) : lerp(14, 30, s - 2));
  const gL = (t, d) => clamp((t - GT0) / d, 0, 1);
  const gIa = (t, s) => { const d = gDur(s); return t < GT0 ? 6 : t < GT0 + d ? 6 + 4 * gL(t, d) + gDyn(s) : 10; };
  const gII = (t, s) => 5 + 4 * gL(t, gDur(s));
  const GCAP = {
    taban: '<b>Sabit boy.</b> İki lif de o boya uyan taban düzeyde ateşler. [[K1 s. 247]]',
    rampa: '<b>Rampa.</b> Kas gerilirken Ia ateşlemesi hıza göre yükselir; boy sabitlenince iki lif de yeni boya uyan düzeyde kalır. Germe hızını değiştirin. [[K1 s. 247]]',
    plato: '<b>Yeni sabit boy.</b> Ia\'daki hız fazlası kaybolur; Ia ve II yeni boyu bildirir. II lifi rampanın hızını hiç yansıtmaz. [[K1 s. 247]]',
    ek: ' Hız arttıkça yalnız Ia\'nın rampa tepesi büyür; II aynı plato düzeyine aynı biçimde çıkar. [[K1 s. 247]]',
  };
  VIZ.f55_gerim = (el) => shell(el, (dar, S) => {
    if (S.hiz === undefined) { S.hiz = 2; S.t = RM ? GTW : 0; S.play = !RM; S.chg = false; S.key = null; S.bekle = 0; }
    const W = dar ? 360 : 640, H = dar ? 326 : 296;
    const X0 = dar ? 60 : 120, X1 = dar ? 350 : 620;
    const R = dar ? { boy: [66, 122], ia: [138, 184], ii: [198, 244], b1: 270, b2: 298 } : { boy: [14, 84], ia: [100, 152], ii: [166, 218], b1: 240, b2: 268 };
    const xT = (t) => X0 + (t / GTW) * (X1 - X0);
    el.innerHTML = `<div class="f55-ctl"><label class="f55-rng"><span>Germe hızı</span><input type="range" min="1" max="3" step="0.05" value="${S.hiz}" aria-label="Germe hızı"><em><i>yavaş</i><i>orta</i><i>hızlı</i></em></label>
      <div class="btn-row"><button type="button" class="btn" data-a="oyn">${S.play ? 'Duraklat' : 'Oynat'}</button><button type="button" class="btn ghost" data-a="bas">Baştan</button></div></div>
      <div class="f55-sv"></div>
      <div class="f55-leg"><span><i class="f55-sw ramp"></i>değişim (dinamik)</span><span><i class="f55-sw plat"></i>sabit boy (statik)</span></div>`;
    const svg = svgOf(el.querySelector('.f55-sv'), W, H, 'Germe rampasında kas boyu, tip Ia ve tip II afferentlerin ateşleme izi ve anlık sıklık göstergeleri');
    const cp = mk('clipPath', { id: 'f55-gc' + (dar ? 'd' : 'w') }, mk('defs', {}, svg)); const cr = mk('rect', { x: X0, y: 0, width: 0, height: H }, cp);
    const rowG = mk('g', {}, svg), bandG = mk('g', {}, svg);
    const ig = igcik(svg, dar ? { cx: 180, cy: 34, w: 220, h: 40, e0: 40 } : { cx: 60, cy: 49, w: 100, h: 44, e0: 20 });
    if (dar) { ig.g.setAttribute('transform', 'translate(0,0)'); }
    const lab = (txt_, y, anchor) => txt(svg, dar ? 52 : 112, y, txt_, 'f55-t f55-rl', 'end');
    lab('Boy', (R.boy[0] + R.boy[1]) / 2 + 4); lab('Ia', (R.ia[0] + R.ia[1]) / 2 + 4); lab('II', (R.ii[0] + R.ii[1]) / 2 + 4);
    [R.boy, R.ia, R.ii].forEach(([a, b]) => mk('rect', { x: X0, y: a, width: X1 - X0, height: b - a, rx: 6, class: 'f55-rbg' }, rowG));
    const clipped = mk('g', { 'clip-path': `url(#f55-gc${dar ? 'd' : 'w'})` }, svg);
    const boyP = mk('path', { class: 'f55-boy' }, clipped), iaP = mk('path', { class: 'f55-rs f55-rs-ia' }, clipped), iiP = mk('path', { class: 'f55-rs f55-rs-ii' }, clipped);
    const cur = mk('line', { y1: R.boy[0] - 4, y2: R.ii[1] + 4, class: 'f55-cur' }, svg);
    txt(svg, X0, R.b1 - 14, 'Anlık sıklık', 'f55-tm');
    txt(svg, X1, R.b1 - 14, 'düşük — yüksek', 'f55-tm', 'end');
    const bars = [['Ia', R.b1], ['II', R.b2]].map(([n, y]) => { txt(svg, dar ? 52 : 112, y + 11, n, 'f55-t f55-rl', 'end'); mk('rect', { x: X0, y, width: X1 - X0, height: 14, rx: 7, class: 'f55-trk' }, svg); return mk('rect', { x: X0, y, width: 0, height: 14, rx: 7, class: n === 'Ia' ? 'f55-bar f55-bar-ia' : 'f55-bar f55-bar-ii' }, svg); });
    function build() {
      const d = gDur(S.hiz);
      bandG.innerHTML = '';
      mk('rect', { x: xT(GT0), y: R.boy[0], width: xT(GT0 + d) - xT(GT0), height: R.ii[1] - R.boy[0], class: 'f55-bramp' }, bandG);
      mk('rect', { x: xT(GT0 + d), y: R.boy[0], width: X1 - xT(GT0 + d), height: R.ii[1] - R.boy[0], class: 'f55-bplat' }, bandG);
      let pb = '', sI = '', sII = '', ph1 = 0, ph2 = 0.4;
      for (let t = 0; t <= GTW; t += 0.02) { const L = gL(t, d); pb += (t ? 'L' : 'M') + xT(t).toFixed(1) + ' ' + (R.boy[1] - 8 - L * (R.boy[1] - R.boy[0] - 20)).toFixed(1); }
      for (let t = 0; t <= GTW; t += 0.004) {
        ph1 += gIa(t, S.hiz) * 0.004; if (ph1 >= 1) { ph1 -= 1; sI += `M${xT(t).toFixed(1)} ${R.ia[0] + 6}V${R.ia[1] - 6}`; }
        ph2 += gII(t, S.hiz) * 0.004; if (ph2 >= 1) { ph2 -= 1; sII += `M${xT(t).toFixed(1)} ${R.ii[0] + 6}V${R.ii[1] - 6}`; }
      }
      boyP.setAttribute('d', pb); iaP.setAttribute('d', sI); iiP.setAttribute('d', sII);
    }
    function draw() {
      const t = clamp(S.t, 0, GTW), d = gDur(S.hiz), L = gL(t, d);
      cr.setAttribute('width', xT(t) - X0); cur.setAttribute('x1', xT(t)); cur.setAttribute('x2', xT(t));
      bars[0].setAttribute('width', (gIa(t, S.hiz) / 44) * (X1 - X0)); bars[1].setAttribute('width', (gII(t, S.hiz) / 44) * (X1 - X0));
      ig.set({ len: 1 + 0.2 * L, uc: 1, slack: 0.6 * (1 - L) });
      const ph = t < GT0 ? 'taban' : t < GT0 + d ? 'rampa' : 'plato', key = ph + (S.chg ? '1' : '0');
      if (key !== S.key && !(S.key === null && ph === 'taban' && S.play && !RM && S.t < 0.05)) { S.key = key; setCap(el, GCAP[ph] + (S.chg && ph === 'plato' ? GCAP.ek : '')); }
    }
    build(); draw();
    const btn = el.querySelector('[data-a=oyn]');
    const rng = el.querySelector('input');
    rng.addEventListener('input', () => { S.hiz = +rng.value; S.chg = true; build(); if (RM) { S.t = GTW; S.key = null; } else { S.t = 0; S.play = true; S.key = null; btn.textContent = 'Duraklat'; } draw(); });
    btn.addEventListener('click', () => { if (RM) return; S.play = !S.play; if (S.play && S.t >= GTW) S.t = 0; btn.textContent = S.play ? 'Duraklat' : 'Oynat'; });
    el.querySelector('[data-a=bas]').addEventListener('click', () => { S.t = RM ? GTW : 0; S.key = null; S.play = !RM; btn.textContent = S.play ? 'Duraklat' : 'Oynat'; draw(); });
    if (RM) btn.disabled = true;
    const stop = RM ? () => {} : ticker(el, (dt) => {
      if (!S.play) return;
      if (S.t >= GTW) { S.bekle += dt; if (S.bekle > 1) { S.bekle = 0; S.t = 0; S.key = null; } return; }
      S.t = Math.min(GTW, S.t + dt); draw();
    });
    return { destroy() { stop(); } };
  });

  /* ---------- 3 · Koaktivasyon: yalnız α ve α + γ ---------- */
  const KCAP = {
    ag: '<b>α + γ.</b> Ekstrafuzal lifler kısalırken intrafuzal uçlar da kasılır; orta bölüm gergin kalır, Ia ateşlemesi sürer. [[K1 s. 247]]',
    a: '<b>Yalnız α.</b> İğcik paralel durduğu için kasla birlikte kısalır ve gevşer; orta bölüm gerilmez, Ia susar. Koaktivasyon bunu önler. [[K1 s. 246–247]]',
    agek: ' Duyarlılık, kas kısalsa ve yükü değişse de korunur. [[K1 s. 247]]',
  };
  const coSpring = (x0, x1, y, amp, n) => { let d = `M${x0} ${y}`; for (let i = 1; i <= n; i++) d += `L${(x0 + ((x1 - x0) * (i - 0.5)) / n).toFixed(1)} ${y + (i % 2 ? -amp : amp)}`; return d + `L${x1} ${y}`; };
  VIZ.f55_koakt = (el) => shell(el, (dar, S) => {
    if (S.mod === undefined) { S.mod = 'ag'; S.ph = RM ? 'done' : 'idle'; S.tp = 0; S.c = RM ? 1 : 0; }
    const W = dar ? 360 : 640, H = dar ? 372 : 276;
    const Pw = { aS: [69, 110], gS: [53, 190], wall: 140, x0: 152, L0: 300, cy: 150, st: [84, 182], sh: 34, ig: { cx: 302, w: 272, h: 56, e0: 54.4 }, ldw: 44, pan: [520, 56, 114, 58] };
    const Pn = { aS: [300, 34], gS: [90, 34], wall: 24, x0: 34, L0: 190, cy: 170, st: [112, 200], sh: 28, ig: { cx: 129, w: 170, h: 46, e0: 34 }, ldw: 44, pan: [56, 262, 284, 34] };
    const P = dar ? Pn : Pw;
    el.innerHTML = `<div class="f55-ctl">${seg('Uyarı', 'm', [['a', 'Yalnız α'], ['ag', 'α + γ']], S.mod)}<div class="btn-row"><button type="button" class="btn" data-a="oyn">Kas</button><button type="button" class="btn ghost" data-a="bas">Baştan</button></div></div><div class="f55-sv"></div>`;
    const svg = svgOf(el.querySelector('.f55-sv'), W, H, 'Ön boynuzdaki α ve γ-motor nöronlar; kas ve paralel iğcik; tip Ia ateşleme izi ve iğcik gerginliği', dar ? 0 : 44);
    // ön boynuz
    if (dar) { mk('rect', { x: 20, y: 8, width: 320, height: 56, rx: 12, class: 'f55-cord' }, svg); txt(svg, 180, 34, 'Ön boynuz', 'f55-tm', 'middle'); txt(svg, 180, 50, 'α ve γ-motor nöronlar', 'f55-tm', 'middle'); }
    else { mk('rect', { x: 14, y: 70, width: 78, height: 160, rx: 12, class: 'f55-cord' }, svg); txt(svg, 53, 62, 'Ön boynuz', 'f55-tm', 'middle'); }
    const aS = mk('circle', { cx: P.aS[0], cy: P.aS[1], r: 15, class: 'f55-soma f55-soma-a' }, svg), gS = mk('circle', { cx: P.gS[0], cy: P.gS[1], r: 14, class: 'f55-soma f55-soma-g' }, svg);
    txt(svg, P.aS[0], P.aS[1] + 5, 'α', 'f55-t f55-sl', 'middle'); txt(svg, P.gS[0], P.gS[1] + 5, 'γ', 'f55-t f55-sl', 'middle');
    // kas
    mk('rect', { x: P.wall, y: P.st[0] - 14, width: 12, height: P.st[1] + P.sh - P.st[0] + 28, rx: 3, class: 'f55-ten' }, svg);
    const strips = P.st.map((y) => mk('rect', { x: P.x0, y, height: P.sh, rx: 8, class: 'f55-ext' }, svg));
    const ten = mk('rect', { y: P.st[0] - 14, width: 14, height: P.st[1] + P.sh - P.st[0] + 28, rx: 3, class: 'f55-ten' }, svg);
    const load = mk('rect', { y: P.cy - 22, width: P.ldw, height: 44, rx: 8, class: 'f55-load' }, svg), loadT = txt(svg, 0, P.cy + 5, 'yük', 'f55-t', 'middle');
    const ig = igcik(svg, { cx: P.ig.cx, cy: P.cy, w: P.ig.w, h: P.ig.h, e0: P.ig.e0 });
    const lblG = txt(svg, 0, P.cy - P.ig.h * 0.75 - 6, 'gergin', 'f55-t f55-tg', 'middle');
    // aksonlar
    const xrOf = (c) => P.x0 + P.L0 * (1 - 0.25 * c);
    const dA = (xr) => dar ? [`M${P.aS[0]} ${P.aS[1] + 15}V${P.st[0] + P.sh / 2}H${xr - 10}`, `M${P.aS[0]} ${P.st[0] + P.sh / 2}V${P.st[1] + P.sh / 2}H${xr - 10}`]
      : [`M${P.aS[0]} ${P.aS[1]}H128V${P.st[0] + 17}H170`, `M128 ${P.aS[1]}V${P.st[1] + 17}H170`];
    const dG = (xr) => dar ? [`M${P.gS[0]} ${P.gS[1] + 14}V84H40V${P.cy}H62`, `M${P.gS[0]} 84H${xr - 30}V${P.cy - 8}`]
      : [`M${P.gS[0] + 14} ${P.gS[1]}H106V${P.cy}H172`, `M106 ${P.gS[1]}V250H${xr - 24}V${P.cy + 22}`];
    const axA = [0, 1].map(() => mk('path', { class: 'f55-ax f55-ax-a' }, svg)), axG = [0, 1].map(() => mk('path', { class: 'f55-ax f55-ax-g' }, svg));
    const sA = axA.map((p) => spk(svg, p, 'var(--c-clin)', 4)), sG = axG.map((p) => spk(svg, p, 'var(--accent)', 4));
    // Ia paneli
    const [px, py, pw, ph] = P.pan;
    txt(svg, px, py - 8, 'Tip Ia', 'f55-t f55-tia');
    const ras = raster(svg, px, py, pw, ph, 'var(--c-basic)', 3);
    const spr = mk('path', { class: 'f55-spring' }, svg);
    const sprX = dar ? [56, 250, 322] : [528, 626, 0], sprY = dar ? 322 : 188;
    const sprT = dar ? txt(svg, 262, sprY + 5, '', 'f55-t', 'start') : txt(svg, 577, sprY + 30, '', 'f55-t', 'middle');
    txt(svg, dar ? 56 : 577, dar ? sprY - 16 : sprY - 28, 'İğcik orta bölümü', 'f55-tm', dar ? 'start' : 'middle');
    const warn = txt(svg, dar ? 56 : 577, dar ? 358 : 252, '', 'f55-t f55-warn', dar ? 'start' : 'middle');
    function draw() {
      const c = S.c, xr = xrOf(c), ag = S.mod === 'ag';
      strips.forEach((s) => s.setAttribute('width', xr - P.x0)); ten.setAttribute('x', xr); load.setAttribute('x', xr + 14); loadT.setAttribute('x', xr + 14 + P.ldw / 2);
      const F0 = P.ig.w, F1 = F0 - 0.25 * P.L0 * c, uc = ag ? 1 - (0.25 * P.L0 * c) / (2 * P.ig.e0) : 1;
      ig.set({ len: F1 / F0, uc, slack: ag ? 0 : c });
      ig.g.setAttribute('transform', `translate(${(-(F0 - F1) / 2).toFixed(1)},0)`);
      lblG.setAttribute('x', P.ig.cx - (F0 - F1) / 2); lblG.textContent = c > 0.5 ? (ag ? 'gergin' : 'gevşek') : '';
      dA(xr).forEach((d, i) => axA[i].setAttribute('d', d)); dG(xr).forEach((d, i) => axG[i].setAttribute('d', d));
      const act = S.ph === 'up' || S.ph === 'hold' || (S.ph === 'done' && RM);
      axA.forEach((p) => p.classList.toggle('act', act)); axG.forEach((p) => { p.classList.toggle('act', act && ag); p.classList.toggle('off', !ag); });
      aS.classList.toggle('act', act); gS.classList.toggle('act', act && ag); gS.classList.toggle('off', !ag);
      // gerginlik yayı
      const gev = ag ? 0 : c; spr.setAttribute('d', coSpring(sprX[0], sprX[1], sprY, lerp(4, 14, gev), 9));
      sprT.textContent = gev > 0.5 ? 'gevşek' : 'gergin';
      warn.textContent = !ag && c > 0.6 ? 'iğcik duyarsız' : '';
    }
    const rate = () => { const c = S.c; return S.mod === 'ag' ? 4 : 4 * clamp(1 - c * 1.6, 0, 1); };
    const capNow = () => setCap(el, KCAP[S.mod] + (S.mod === 'ag' && (S.ph === 'hold' || S.ph === 'down' || S.ph === 'done') ? KCAP.agek : ''));
    const reset = () => { S.ph = RM ? 'done' : 'idle'; S.tp = 0; S.c = RM ? 1 : 0; sA.concat(sG).forEach((s) => s.clear()); ras.clear(); draw(); };
    if (RM) { /* son durum: yoğunluk kalınlıkla */ }
    el.querySelectorAll('[data-m]').forEach((b) => b.addEventListener('click', () => { S.mod = b.dataset.m; setSeg(el, 'm', S.mod); reset(); capNow(); }));
    el.querySelector('[data-a=oyn]').addEventListener('click', () => { if (RM) { S.ph = 'done'; S.c = 1; draw(); capNow(); return; } S.ph = 'up'; S.tp = 0; S.c = 0; capNow(); });
    el.querySelector('[data-a=bas]').addEventListener('click', () => { reset(); setCap(el, KCAP[S.mod]); });
    draw(); if (RM) { for (let i = 0; i < 12; i++) ras.upd(0.25, S.mod === 'ag' ? 4 : 0); }
    const stop = RM ? () => {} : ticker(el, (dt) => {
      if (S.ph === 'up') { S.tp += dt; S.c = Math.min(1, S.tp / 2); if (S.tp >= 2) { S.ph = 'hold'; S.tp = 0; capNow(); } }
      else if (S.ph === 'hold') { S.tp += dt; if (S.tp >= 1) { S.ph = 'down'; S.tp = 0; } }
      else if (S.ph === 'down') { S.tp += dt; S.c = Math.max(0, 1 - S.tp); if (S.tp >= 1) { S.ph = 'idle'; S.tp = 0; S.c = 0; } }
      draw();
      const act = S.ph === 'up' || S.ph === 'hold';
      sA.forEach((s) => s.upd(dt, act ? 5 : 0, 0.8)); sG.forEach((s) => s.upd(dt, act && S.mod === 'ag' ? 5 : 0, 0.8));
      ras.upd(dt, rate());
    });
    return { destroy() { stop(); } };
  });

  /* ---------- 4 · Paralel iğcik, seri tendon organı ---------- */
  const SCAP = {
    pasif: '<b>Pasif germe.</b> Kas uzar: paralel iğcik de seri tendon organı da gerilir. "İzometrik kasılma"yı seçin. [[K1 s. 246–247]]',
    iso: '<b>İzometrik kasılma.</b> Boy değişmez ama gerim artar: seri dizilen Golgi tendon organı uyarılır, paralel iğciğin boyu değişmez. Her tendon organı tek bir Ib lifiyle innerve edilir; motor siniri yoktur. [[K1 s. 247]]',
  };
  VIZ.f55_seri = (el) => shell(el, (dar, S) => {
    if (S.mod === undefined) { S.mod = 'pasif'; S.s = RM ? 1 : 0; S.play = false; }
    const W = dar ? 360 : 640, H = dar ? 322 : 304;
    const P = dar ? { r: [[4, 18, 170, 32], [186, 18, 170, 32]], bone: [4, 16], t1: [16, 54], gto: 71, gw: 32, mx0: 88, mx1: 268, tw: 30, wall: 330, cy: 164, st: [124, 182], sh: 22, spW: 140, spCx: 178, shift: 24, ibX: 71, iaPath: (cx) => `M${cx} 144V78H270V50`, axL: 112 }
      : { r: [[20, 20, 270, 36], [330, 20, 290, 36]], bone: [8, 34], t1: [34, 130], gto: 150, gw: 44, mx0: 172, mx1: 500, tw: 50, wall: 602, cy: 152, st: [108, 172], sh: 26, spW: 270, spCx: 336, shift: 40, ibX: 150, iaPath: (cx) => `M${cx} 134V76H420V58`, axL: 130 };
    el.innerHTML = `<div class="f55-ctl">${seg('Durum', 'm', [['pasif', 'Pasif germe'], ['iso', 'İzometrik kasılma']], S.mod)}<div class="btn-row"><button type="button" class="btn" data-a="oyn">Oynat</button></div></div><div class="f55-sv"></div>`;
    const svg = svgOf(el.querySelector('.f55-sv'), W, H, 'Kas–tendon birimi: tendon organı kas–tendon kavşağında seri, kas iğciği ekstrafuzal liflere paralel; Ib ve Ia ateşleme izleri');
    txt(svg, P.r[0][0], 12, 'Ib (gerim)', 'f55-t f55-tib'); txt(svg, P.r[1][0], 12, 'Ia (boy)', 'f55-t f55-tia');
    const rIb = raster(svg, ...P.r[0], 'var(--ok)', 3), rIa = raster(svg, ...P.r[1], 'var(--c-basic)', 3);
    const cy = P.cy;
    mk('rect', { x: P.bone[0], y: cy - 52, width: P.bone[1] - P.bone[0], height: 104, rx: 4, class: 'f55-bone' }, svg);
    mk('rect', { x: P.t1[0], y: cy - 30, width: P.t1[1] + (P.gto - P.gw / 2 - P.t1[1] > 0 ? P.gto - P.gw / 2 - P.t1[1] : 0) - P.t1[0], height: 60, class: 'f55-ten' }, svg);
    for (let i = 0; i < 4; i++) mk('line', { x1: P.t1[0] + 4, x2: P.gto - P.gw / 2, y1: cy - 21 + i * 14, y2: cy - 21 + i * 14, class: 'f55-fib' }, svg);
    const gtoBox = mk('rect', { x: P.gto - P.gw / 2, y: cy - 30, width: P.gw, height: 60, rx: 6, class: 'f55-gto' }, svg);
    const zig = mk('path', { class: 'f55-zig' }, svg);
    const strips = P.st.map((y) => mk('rect', { x: P.mx0, y, height: P.sh, rx: 8, class: 'f55-ext' }, svg));
    const ig = igcik(svg, { cx: P.spCx, cy, w: P.spW, h: dar ? 34 : 38, e0: P.spW * 0.2 });
    const tenR = mk('rect', { y: cy - 30, width: P.tw, height: 60, class: 'f55-ten' }, svg);
    const hook = mk('path', { class: 'f55-hook' }, svg), hookT = txt(svg, 0, 0, '', 'f55-tm', 'end');
    const wallG = mk('g', {}, svg);
    // Ib ve Ia aksonları
    mk('path', { d: `M${P.ibX} ${cy - 30}V${P.r[0][1] + P.r[0][3]}`, class: 'f55-ax f55-ax-ib act' }, svg);
    const iaP = mk('path', { class: 'f55-ax f55-ax-ia act' }, svg);
    mk('path', { d: `M${dar ? 130 : 232} ${cy + 78}V${cy + 18}`, class: 'f55-ax f55-ax-g off' }, svg);
    txt(svg, P.ibX + 6, dar ? 92 : 86, dar ? 'GTO · Ib' : 'Golgi tendon organı · Ib', 'f55-t f55-tib');
    txt(svg, P.ibX + 6, dar ? 106 : 100, 'motor siniri yok', 'f55-tm');
    const ikT = txt(svg, P.spCx, cy + (dar ? 56 : 62), '', 'f55-t f55-tia', 'middle');
    const gerT = txt(svg, dar ? 230 : 450, cy + (dar ? 56 : 62), '', 'f55-t f55-tib', 'middle');
    // seri / paralel simgeleri
    const iy = H - 40;
    const sx = P.ibX, px2 = P.spCx;
    mk('path', { d: `M${sx - 28} ${iy}H${sx - 4}M${sx + 4} ${iy}H${sx + 28}`, class: 'f55-ico' }, svg); txt(svg, sx, iy + 20, 'seri', 'f55-t', 'middle');
    mk('path', { d: `M${px2 - 24} ${iy - 6}H${px2 + 24}M${px2 - 24} ${iy + 6}H${px2 + 24}`, class: 'f55-ico' }, svg); txt(svg, px2, iy + 20, 'paralel', 'f55-t', 'middle');
    function draw() {
      const s = S.s, iso = S.mod === 'iso', sh = iso ? 0 : P.shift * s, mE = P.mx1 + sh, T = s;
      strips.forEach((r, i) => { r.setAttribute('width', mE - P.mx0); const th = P.sh + (iso ? 5 * s : 0); r.setAttribute('height', th); r.setAttribute('y', P.st[i] - (i ? 0 : iso ? 5 * s : 0)); r.classList.toggle('kas', iso && s > 0.1); });
      tenR.setAttribute('x', mE);
      const wM = mE - P.mx0, W0 = P.mx1 - P.mx0;
      ig.set({ len: wM / W0, uc: 1, slack: 0.3 * (1 - (iso ? 0 : s)) });
      ig.g.setAttribute('transform', `translate(${(P.mx0 + wM / 2 - (P.mx0 + W0 / 2) - 0).toFixed(1)},0)`);
      // GTO zikzağı: gerim arttıkça düzleşir
      const A = lerp(13, 3, T) * (dar ? 0.8 : 1), x0 = P.gto - P.gw / 2 + 3, x1 = P.gto + P.gw / 2 - 3; let d = `M${x0} ${cy}`;
      for (let i = 1; i <= 6; i++) d += `L${(x0 + ((x1 - x0) * i) / 6).toFixed(1)} ${cy + (i % 2 ? -A : A) * 2}`;
      zig.setAttribute('d', d + `L${x1} ${cy}`);
      const xe = mE + P.tw;
      hook.setAttribute('d', iso ? '' : `M${xe} ${cy}H${xe + 26}M${xe + 18} ${cy - 6}L${xe + 26} ${cy}L${xe + 18} ${cy + 6}`);
      hookT.setAttribute('x', dar ? 356 : 636); hookT.setAttribute('y', cy - (iso ? 58 : 38)); hookT.textContent = iso ? 'boy sabit' : (s > 0 ? 'dış çekme' : '');
      wallG.innerHTML = ''; if (iso) { mk('rect', { x: P.wall, y: cy - 52, width: dar ? 20 : 26, height: 104, rx: 4, class: 'f55-bone' }, wallG); mk('path', { d: `M${xe} ${cy}H${P.wall}`, class: 'f55-ico' }, wallG); const lx = P.wall + (dar ? 10 : 13); mk('rect', { x: lx - 6, y: cy - 4, width: 12, height: 10, rx: 2, class: 'f55-lock' }, wallG); mk('path', { d: `M${lx - 3.5} ${cy - 4}v-3a3.5 3.5 0 0 1 7 0v3`, class: 'f55-lockp' }, wallG); }
      iaP.setAttribute('d', P.iaPath(P.spCx + (wM - W0) / 2));
      ikT.textContent = iso ? 'İğcik · Ia · boy sabit' : 'İğcik · Ia'; gerT.textContent = iso && s > 0.3 ? 'gerim ↑' : '';
    }
    const rIb_ = () => (S.mod === 'iso' ? lerp(1.5, 7, S.s) : lerp(1.5, 4, S.s)), rIa_ = () => (S.mod === 'iso' ? 2 : lerp(2, 7, S.s));
    const btn = el.querySelector('[data-a=oyn]');
    el.querySelectorAll('[data-m]').forEach((b) => b.addEventListener('click', () => { S.mod = b.dataset.m; setSeg(el, 'm', S.mod); S.s = RM ? 1 : 0; S.play = false; rIb.clear(); rIa.clear(); draw(); setCap(el, SCAP[S.mod]); }));
    btn.addEventListener('click', () => { S.s = RM ? 1 : 0; S.play = !RM; rIb.clear(); rIa.clear(); draw(); setCap(el, SCAP[S.mod]); });
    draw();
    if (RM) { for (let i = 0; i < 14; i++) { rIb.upd(0.2, rIb_()); rIa.upd(0.2, rIa_()); } }
    const stop = RM ? () => {} : ticker(el, (dt) => {
      if (S.play) { S.s = Math.min(1, S.s + dt / 2); if (S.s >= 1) S.play = false; }
      draw(); rIb.upd(dt, rIb_()); rIa.upd(dt, rIa_());
    });
    return { destroy() { stop(); } };
  });

  /* ---------- 5 · Beş halkalı yay, iki sınıflama (HTML kartlar) ---------- */
  const SINIF = {
    def: '<b>En basit yay:</b> duyu alıcısı → afferent nöron → bir ya da daha çok sinaps → efferent nöron → efektör organ. Bir sınıfa dokunun. [[K1 s. 247]]',
    mono: '<b>Monosinaptik.</b> Afferent ile efferent nöron arasında tek sinaps vardır; klasik örnek diz refleksidir. [[K1 s. 247]]',
    poli: '<b>Polisinaptik.</b> Örnek çekme refleksi: sıcak cisme değen uzuv, birçok kas grubunun eşgüdümlü kasılıp gevşemesiyle bütünüyle uzaklaşır. [[K1 s. 247]]',
    per: '<b>Periferik duyu afferentinden:</b> diz refleksi. [[K1 s. 247]]',
    oto: '<b>Otonom sinir sisteminden:</b> baroreseptör refleksi. [[K1 s. 247]]',
    kra: '<b>Kraniyal sinirden:</b> öğürme refleksi. [[K1 s. 247]]',
  };
  VIZ.f55_sinif = (el) => {
    let sel = null;
    const kart = (k, a, b) => `<button type="button" class="f55-card${k === 'mono' || k === 'per' ? ' f55-pair' : ''}" data-s="${k}" aria-pressed="false"><b>${a}</b><span>${b}</span>${k === 'mono' || k === 'per' ? '<em>↔ aynı refleks</em>' : ''}</button>`;
    el.innerHTML = `<div class="f55-chain" aria-label="Refleks yayının beş halkası">
        <div class="f55-box" data-h="duyu"><span>1</span>Duyu alıcısı</div><i aria-hidden="true">→</i>
        <div class="f55-box" data-h="aff"><span>2</span>Afferent nöron<small data-src></small></div><i aria-hidden="true">→</i>
        <div class="f55-box" data-h="syn"><span>3</span>Sinaps(lar)<small data-sn>bir ya da daha çok</small><b class="f55-dots" data-dots></b></div><i aria-hidden="true">→</i>
        <div class="f55-box" data-h="eff"><span>4</span>Efferent nöron</div><i aria-hidden="true">→</i>
        <div class="f55-box" data-h="efe"><span>5</span>Efektör organ</div></div>
      <div class="f55-cards">
        <div class="f55-cg"><h4>Sinaps sayısına göre</h4>${kart('mono', 'Monosinaptik', 'Diz refleksi')}${kart('poli', 'Polisinaptik', 'Çekme refleksi')}</div>
        <div class="f55-cg"><h4>Sinyalin kaynağına göre</h4>${kart('per', 'Periferik duyu afferenti', 'Diz refleksi')}${kart('oto', 'Otonom sinir sistemi', 'Baroreseptör refleksi')}${kart('kra', 'Kraniyal sinir', 'Öğürme refleksi')}</div></div>`;
    const dots = el.querySelector('[data-dots]'), sn = el.querySelector('[data-sn]'), src = el.querySelector('[data-src]');
    const SRC = { per: 'periferik duyu afferenti', oto: 'otonom sinir sistemi', kra: 'kraniyal sinir' };
    const apply = () => {
      el.querySelectorAll('[data-s]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.s === sel)));
      el.querySelectorAll('.f55-pair').forEach((b) => b.classList.toggle('lit', sel === 'mono' || sel === 'per'));
      const hl = { aff: sel === 'per' || sel === 'oto' || sel === 'kra', syn: sel === 'mono' || sel === 'poli' };
      el.querySelectorAll('[data-h]').forEach((b) => b.classList.toggle('on', !!hl[b.dataset.h]));
      src.textContent = SRC[sel] ? '(' + SRC[sel] + ')' : '';
      sn.textContent = sel === 'mono' ? 'tek sinaps' : sel === 'poli' ? 'ara nöronlu zincir' : 'bir ya da daha çok';
      dots.innerHTML = sel === 'mono' ? '<i></i>' : sel === 'poli' ? '<i></i><i></i><i></i>' : '';
      setCap(el, SINIF[sel || 'def']);
    };
    el.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => { sel = sel === b.dataset.s ? null : b.dataset.s; apply(); }));
    return () => {};
  };

  /* ---------- 6 · Diz refleksi: adım adım ---------- */
  const DCAP = [
    '<b>1 · Vuruş.</b> Patellar tendona vurulunca kuadriseps, içindeki kas iğcikleriyle birlikte gerilir. "İleri"ye basın. [[K1 s. 247]]',
    '<b>2 · Afferent.</b> Tip Ia lifleri gerilmenin derecesini arka kökten omuriliğin ön boynuzuna taşır. [[K1 s. 247]]',
    '<b>3 · Sinaps.</b> Ön boynuzda Ia lifi α-motor nöronla doğrudan sinaps yapar; sinaps uyarıcıdır, nörotransmitteri glutamattır. [[K1 s. 247]]',
    '<b>4 · Efferent.</b> α-motor nöron ön boynuzdan spinal sinirle çıkar, kuadrisepste birkaç kas lifini innerve eder. [[K1 s. 247]]',
    '<b>5 · Efektör.</b> Kuadriseps α-motor nöron etkinliğine yanıt olarak kasılır. Tek sinaps olduğundan latent süre kısadır. [[K1 s. 247]]',
    '<b>6 · Antagonist.</b> Ia lifi dallanır; inhibitör ara nöron (glisin) hamstring α-motor nöronunu baskılar, hamstring gevşer. Bu kısım polisinaptiktir. [[K1 s. 247–248]]',
    '<b>7 · Diz ekstansiyonu.</b> Kuadriseps karşı konmadan kasılır ve diz ekstansiyona gelir. [[K1 s. 247–248]]',
  ];
  const DHIZLI = '<b>Hızlı tekrar.</b> Patellar tendona art arda hızla vurulursa refleks kaybolur: beyinden inen girdiler refleksin şiddetini ayarlar. [[K1 s. 248]]';
  const DJEN = '<b>Jendrassik manevrası.</b> Hasta dişlerini sıkar ya da kenetlediği ellerini ayırmaya çeker; γ-motor ateşlemesi artar, iğcikteki zemin gerimi yükselir ve refleks belirginleşir. [[K1 s. 248]]';
  VIZ.f55_diz = (el) => shell(el, (dar, S) => {
    if (S.step === undefined) { S.step = 1; S.tm = 0; S.mode = null; S.mt = 0; S.auto = false; S.th = 0; S.cap = null; }
    const W = dar ? 360 : 640, H = dar ? 600 : 362, LX = dar ? -330 : 0, LY = dar ? 248 : 0;
    const lp = (x, y) => [x + LX, y + LY];
    const Pia = dar ? 'M150 366V338H344V98H294L262 118L236 208' : 'M440 129H345V98H294L262 118L236 208';
    const Pbr = 'M249 164L180 182L128 222';
    const Pa = dar ? 'M230 250V314H60V358' : 'M230 250V285H372V150';
    const Ph = dar ? 'M125 250V296H8V420H20' : 'M125 250V305H420V190';
    const Pg = dar ? 'M178 259V324H238V377H190' : 'M178 259V318H470V142';
    el.innerHTML = `<div class="f55-ctl"><div class="btn-row"><button type="button" class="btn ghost" data-a="geri">← Geri</button><button type="button" class="btn" data-a="ileri">İleri →</button><button type="button" class="btn ghost" data-a="oyn">Oynat</button><button type="button" class="btn ghost" data-a="bas">Baştan</button></div><b class="f55-adim" data-adim></b></div>
      <div class="f55-sv"></div>
      <div class="btn-row f55-mod"><button type="button" class="btn ghost" data-md="jen">Jendrassik</button><button type="button" class="btn ghost" data-md="hizli">Hızlı tekrar</button></div>`;
    const svg = svgOf(el.querySelector('.f55-sv'), W, H, 'Diz refleksi: kuadriseps iğciği, Ia afferent, arka kök gangliyonu, omurilik ön boynuzundaki α-motor nöronlar, inhibitör ara nöron ve bacak');
    // omurilik
    mk('rect', { x: 40, y: 60, width: 250, height: 238, rx: 44, class: 'f55-cord' }, svg);
    mk('path', { d: 'M165 150C150 130 130 100 112 92C100 105 108 130 128 150C108 160 82 190 86 230C92 262 130 276 160 258C163 256 167 256 170 258C200 276 238 262 244 230C248 190 222 160 202 150C222 130 230 105 218 92C200 100 180 130 165 150Z', class: 'f55-gray' }, svg);
    txt(svg, 165, 134, 'gri madde', 'f55-tm', 'middle');
    mk('ellipse', { cx: 311, cy: 98, rx: 20, ry: 12, class: 'f55-drg' }, svg);
    txt(svg, dar ? 352 : 311, 72, 'Arka kök gangliyonu', 'f55-t', dar ? 'end' : 'middle');
    const inen = mk('path', { d: 'M165 6V62', class: 'f55-inen' }, svg); mk('path', { d: 'M159 54L165 62L171 54', class: 'f55-inen f55-inen-h' }, svg);
    txt(svg, 174, 22, 'inen girdiler (beyin)', 'f55-tm');
    // yollar (altta)
    const paths = {
      ia: mk('path', { d: Pia, class: 'f55-ax f55-ax-ia' }, svg), br: mk('path', { d: Pbr, class: 'f55-ax f55-ax-ia' }, svg),
      a: mk('path', { d: Pa, class: 'f55-ax f55-ax-a' }, svg), h: mk('path', { d: Ph, class: 'f55-ax f55-ax-a' }, svg), g: mk('path', { d: Pg, class: 'f55-ax f55-ax-g' }, svg),
    };
    // nöronlar
    const aq = mk('circle', { cx: 230, cy: 236, r: 14, class: 'f55-soma f55-soma-a' }, svg), ah = mk('circle', { cx: 125, cy: 236, r: 14, class: 'f55-soma f55-soma-a' }, svg);
    txt(svg, 230, 241, 'α', 'f55-t f55-sl', 'middle'); txt(svg, 125, 241, 'α', 'f55-t f55-sl', 'middle');
    txt(svg, 238, 268, 'α · kuadriseps', 'f55-t'); txt(svg, 117, 268, 'α · hamstring', 'f55-t', 'end');
    const inter = mk('circle', { cx: 180, cy: 182, r: 9, class: 'f55-soma f55-soma-i' }, svg); txt(svg, 180, 186, '−', 'f55-t f55-sl', 'middle'); txt(svg, 168, 176, 'ara nöron', 'f55-tm', 'end');
    const gsoma = mk('circle', { cx: 178, cy: 248, r: 11, class: 'f55-soma f55-soma-g f55-jen' }, svg), gtx = txt(svg, 178, 252, 'γ', 'f55-t f55-sl f55-jen', 'middle');
    // sinapslar
    const s1 = mk('g', { class: 'f55-syn' }, svg); mk('circle', { cx: 234, cy: 214, r: 8, class: 'f55-plus' }, s1); txt(s1, 234, 218, '+', 'f55-t f55-sl', 'middle'); const s1t = txt(s1, 246, 210, 'glutamat', 'f55-tm');
    const s0 = mk('g', { class: 'f55-syn f55-s0' }, svg); mk('circle', { cx: 214, cy: 172, r: 7, class: 'f55-plus' }, s0); txt(s0, 214, 176, '+', 'f55-t f55-sl', 'middle');
    const s2 = mk('g', { class: 'f55-syn' }, svg); mk('circle', { cx: 132, cy: 214, r: 8, class: 'f55-minus' }, s2); txt(s2, 132, 218, '−', 'f55-t f55-sl', 'middle'); txt(s2, 120, 208, 'glisin', 'f55-tm', 'end');
    // terminal dallar (α-kuadriseps)
    const tq = dar ? [60, 358] : [372, 150];
    mk('path', { d: `M${tq[0]} ${tq[1]}l-9 -9M${tq[0]} ${tq[1]}v-9M${tq[0]} ${tq[1]}l9 -9`, class: 'f55-ax f55-ax-a f55-term' }, svg);
    // bacak
    const leg = mk('g', { transform: `translate(${LX},${LY})` }, svg);
    mk('rect', { x: 350, y: 110, width: 210, height: 38, rx: 12, class: 'f55-mus' }, leg);
    const quadG = mk('g', {}, leg); const quad = mk('rect', { x: 350, y: 110, width: 210, height: 38, rx: 12, class: 'f55-mus f55-quad' }, quadG);
    const ham = mk('rect', { x: 350, y: 152, width: 210, height: 38, rx: 12, class: 'f55-mus f55-ham' }, leg);
    txt(leg, dar ? 410 : 354, 103, 'Kuadriseps', 'f55-t'); txt(leg, 354, 207, 'Hamstring', 'f55-t');
    const ig = igcik(leg, { cx: 480, cy: 129, w: 80, h: 24, e0: 16 });
    const calf = mk('g', {}, leg);
    mk('rect', { x: 560, y: 158, width: 36, height: 164, rx: 16, class: 'f55-bone2' }, calf); mk('rect', { x: 556, y: 312, width: 74, height: 18, rx: 8, class: 'f55-bone2' }, calf);
    mk('path', { d: 'M592 160L592 200', class: 'f55-tend' }, calf); mk('ellipse', { cx: 592, cy: 150, rx: 8, ry: 11, class: 'f55-pat' }, calf);
    mk('circle', { cx: 572, cy: 170, r: 15, class: 'f55-knee' }, leg);
    txt(leg, 556, 244, 'patellar tendon', 'f55-tm', 'end');
    const ham_ = mk('g', {}, leg); mk('rect', { x: 612, y: 182, width: 18, height: 22, rx: 4, class: 'f55-hamr' }, ham_); mk('path', { d: 'M621 182L636 138', class: 'f55-hamh' }, ham_); txt(leg, 634, 128, 'çekiç', 'f55-tm', 'end');
    // Jendrassik elleri
    const hands = mk('g', { class: 'f55-jen' }, leg);
    mk('rect', { x: 468, y: 40, width: 26, height: 16, rx: 7, class: 'f55-hand' }, hands); mk('rect', { x: 484, y: 46, width: 26, height: 16, rx: 7, class: 'f55-hand' }, hands);
    mk('path', { d: 'M458 52H444M450 46L444 52L450 58M520 56H534M528 50L534 56L528 62', class: 'f55-gm' }, hands);
    const hTx = txt(leg, 489, 86, 'kenetli eller · dişler sıkılı', 'f55-tm', 'middle'); hands.appendChild(hTx);
    const zg = txt(leg, 480, 224, 'zemin gerimi ↑', 'f55-t f55-tg f55-jen', 'middle');
    // kalkış göstergesi
    txt(leg, 350, 334, 'Baldırın kalkışı', 'f55-tm'); mk('rect', { x: 350, y: 340, width: 130, height: 10, rx: 5, class: 'f55-trk' }, leg); const thB = mk('rect', { x: 350, y: 340, width: 0, height: 10, rx: 5, class: 'f55-bar f55-bar-ia' }, leg);
    // noktalar
    const mkd = (c, n) => Array.from({ length: n }, () => mk('circle', { r: 3.6, class: 'f55-sp', style: `fill:${c}`, opacity: 0 }, svg));
    const dIa = mkd('var(--c-basic)', 5), dBr = mkd('var(--c-basic)', 5), dA = mkd('var(--c-clin)', 5), dG = mkd('var(--accent)', 5);
    const train = (cs, pathEl, p, gap) => { const L = pathEl.getTotalLength(); cs.forEach((c, i) => { const q = p - i * gap; if (p > 0 && q >= 0 && q <= 1) { const pt = pathEl.getPointAtLength(q * L); c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1)); c.setAttribute('opacity', 1); } else c.setAttribute('opacity', 0); }); };
    const qv = (a) => clamp(a, 0, 1);
    function view() {
      const v = { step: S.step, ham: 0, thT: 0, inen: 0, gam: false, p: { ia: -1, br: -1, a: -1, g: -1 }, gap: 0.12, kas: false };
      if (S.mode === 'hizli') {
        const T = [25, 18, 10, 4, 0], i = Math.min(4, Math.floor(S.mt / 0.8)), q = (S.mt - i * 0.8) / 0.8; v.step = 7; v.inen = 1; v.kas = true;
        if (S.mt < 4) { v.ham = q < 0.35 ? Math.sin(Math.PI * q / 0.35) : 0; v.thT = q >= 0.25 ? T[i] : (i ? T[i - 1] * 0.0 : 0); v.p.ia = (q - 0.05) / 0.4; v.p.a = (q - 0.45) / 0.4; if (T[i] === 0) { v.p.a = -1; } }
        v.thT = S.mt >= 4 ? 0 : v.thT; if (RM) { v.ham = 0; v.thT = 0; v.p.ia = v.p.a = -1; }
        v.tbar = S.mt >= 4 ? 0 : T[i];
      } else if (S.mode === 'jen') {
        v.step = 7; v.gam = true; v.kas = true;
        const t = S.mt; if (t >= 1.6 && t < 2.1) v.ham = Math.sin(Math.PI * (t - 1.6) / 0.5);
        v.thT = t >= 1.75 ? 40 : 0; v.p.g = t < 1.6 ? t / 1.4 : -1; v.p.ia = (t - 1.7) / 0.5; v.p.a = (t - 2.2) / 0.5; v.gap = 0.07; v.tbar = v.thT;
        if (RM) { v.ham = 0; v.thT = 40; v.p.g = v.p.ia = v.p.a = -1; v.tbar = 40; }
      } else {
        const n = S.step, p = S.tm / 1.6;
        if (n === 1) v.ham = S.tm < 0.7 ? Math.sin(Math.PI * S.tm / 0.7) : 0;
        v.p.ia = n === 2 ? p : -1; v.p.a = n === 4 ? p : -1; v.p.br = n === 6 ? p : -1; v.kas = n >= 5; v.thT = n >= 7 ? 25 : 0; v.tbar = v.thT;
        if (RM) v.p = { ia: -1, br: -1, a: -1, g: -1 };
      }
      return v;
    }
    const cl = (e, c, on) => e.classList.toggle(c, !!on);
    function draw() {
      const v = view(), n = v.step;
      S.th += (v.thT - S.th) * Math.min(1, 0.18); if (Math.abs(v.thT - S.th) < 0.05) S.th = v.thT;
      calf.setAttribute('transform', `rotate(${-S.th.toFixed(2)} 572 170)`);
      ham_.setAttribute('transform', `translate(${(-14 * v.ham).toFixed(1)},0)`);
      const sc = v.kas ? 1 + 0.22 * clamp(S.th / 25, 0.5, 1.5) : 1;
      quadG.setAttribute('transform', `translate(0,129) scale(1,${sc.toFixed(3)}) translate(0,-129)`); cl(quad, 'kas', v.kas);
      ig.set({ len: 1 + 0.22 * v.ham, uc: 1, slack: v.gam || n >= 2 && false ? 0 : 0.35 });
      const inh = n >= 6; cl(ham, 'inh', inh);
      cl(paths.ia, 'on', n >= 2); cl(paths.a, 'on', n >= 4); cl(paths.br, 'on', n >= 6); cl(paths.g, 'on', v.gam);
      paths.g.style.display = S.mode === 'jen' ? '' : 'none'; el.querySelectorAll('.f55-jen').forEach((e) => { e.style.display = S.mode === 'jen' ? '' : 'none'; });
      cl(s1, 'on', n >= 3); cl(s2, 'on', inh); cl(s0, 'on', inh); cl(aq, 'on', n >= 4); cl(ah, 'off', inh); cl(inter, 'on', inh);
      s1.style.opacity = n >= 3 ? 1 : 0.25; s2.style.opacity = inh ? 1 : 0.25; s0.style.opacity = inh ? 1 : 0.25;
      inen.classList.toggle('strong', !!v.inen);
      train(dIa, paths.ia, v.p.ia, v.gap); train(dBr, paths.br, v.p.br, 0.12); train(dA, paths.a, v.p.a, v.gap); train(dG, paths.g, v.p.g, 0.1);
      thB.setAttribute('width', (130 * clamp(v.tbar / 40, 0, 1)).toFixed(1));
      el.querySelector('[data-adim]').textContent = S.mode ? (S.mode === 'jen' ? 'Jendrassik' : 'Hızlı tekrar') : `Adım ${S.step}/7`;
      const ck = S.mode ? S.mode : 's' + S.step; if (ck !== S.cap) { S.cap = ck; setCap(el, S.mode === 'hizli' ? DHIZLI : S.mode === 'jen' ? DJEN : DCAP[S.step - 1]); }
      el.querySelector('[data-a=geri]').disabled = !S.mode && S.step === 1; el.querySelector('[data-a=ileri]').disabled = !S.mode && S.step === 7;
      el.querySelectorAll('[data-md]').forEach((b) => { b.disabled = S.step < 7 && !S.mode; b.setAttribute('aria-pressed', String(S.mode === b.dataset.md)); });
    }
    const go = (k) => { S.step = clamp(k, 1, 7); S.tm = 0; S.mode = null; S.cap = null; S.th = RM ? (S.step >= 7 ? 25 : 0) : S.th; draw(); };
    el.querySelector('[data-a=geri]').addEventListener('click', () => { S.auto = false; go(S.step - 1); });
    el.querySelector('[data-a=ileri]').addEventListener('click', () => { S.auto = false; if (S.mode) { go(7); return; } go(S.step + 1); });
    el.querySelector('[data-a=oyn]').addEventListener('click', () => { S.auto = !RM; S.step = 1; S.tm = 0; S.mode = null; S.cap = null; if (RM) { go(1); } draw(); });
    el.querySelector('[data-a=bas]').addEventListener('click', () => { S.auto = false; S.th = 0; go(1); });
    el.querySelectorAll('[data-md]').forEach((b) => b.addEventListener('click', () => { S.auto = false; S.mode = S.mode === b.dataset.md ? null : b.dataset.md; S.mt = RM ? 99 : 0; S.tm = 0; S.cap = null; if (!S.mode) S.step = 7; draw(); }));
    if (RM) S.th = S.mode === 'jen' ? 40 : S.step >= 7 ? 25 : 0;
    draw();
    const stop = RM ? () => {} : ticker(el, (dt) => {
      if (S.mode) { S.mt = Math.min(S.mt + dt, 8); }
      else { S.tm += dt; if (S.auto && S.tm >= 2.5) { if (S.step < 7) { S.step++; S.tm = 0; S.cap = null; } else S.auto = false; } }
      draw();
    });
    return { destroy() { stop(); } };
  });

  /* ---------- 7 · γ döngüsü: normal, spinal şok, spastisite ---------- */
  const TCAP = [
    '<b>Normal.</b> γ uyarısı intrafuzal uçları kısaltır, orta bölümü gerer ve Ia ateşlemesini artırır; Ia monosinaptik yayla α-motor nöronları uyarır, ekstrafuzal lifler kasılır: tonus. [[K1 s. 248]]',
    '<b>Spinal şok.</b> Akut omurilik hasarında supraspinal yollar kesilir; γ-motor nöronlar susar, kaslar hipotonik ya da flask olur. [[K1 s. 248]]',
    '<b>≈ 2 hafta sonra.</b> γ-motor etkinlik aşırı artar, tonus yükselir: spastisite. Bu artışın mekanizması bilinmemektedir. [[K1 s. 248]]',
  ];
  const TLV = [{ g: 0.5, i: 0.5, a: 0.5, t: 0.5 }, { g: 0, i: 0.04, a: 0.04, t: 0.04 }, { g: 1, i: 1, a: 1, t: 0.96 }];
  VIZ.f55_tonus = (el) => shell(el, (dar, S) => {
    if (S.ph === undefined) { S.ph = 0; S.play = false; S.pt = 0; S.lv = { ...TLV[0] }; S.cap = null; }
    const W = dar ? 360 : 640, H = dar ? 506 : 348;
    const P = dar ? {
      brain: [10, 8, 340, 40], cord: [10, 84, 190, 120], g: [50, 150], a: [150, 150], bx: 50, mx0: 34, mw: 296, wall: [24, 236, 10, 134], c1: 262, c2: 338, cy: 300, sp: { cx: 182, w: 200, h: 44, e0: 40 },
      pg: 'M50 165V212H58V300H92', pa: 'M150 165V226H70V250', pi: 'M182 278V150H166', syn: [166, 150], dmg: [30, 70, 100], dlab: [78, 104], bd: [[50, 192], [120, 276], [182, 204], [150, 196], [314, 300]],
      gau: [10, 404, 340], gy: 396, tl: [20, 340, 470], tx: [60, 190, 300], q: [138, 182], hint: 0,
    } : {
      brain: [20, 8, 240, 40], cord: [30, 84, 230, 196], g: [90, 200], a: [200, 200], bx: 90, mx0: 342, mw: 250, wall: [330, 90, 12, 120], c1: 109, c2: 191, cy: 150, sp: { cx: 467, w: 200, h: 44, e0: 40 },
      pg: 'M90 215V248H318V150H372', pa: 'M200 215V268H336V196H356', pi: 'M467 128V70H200V185', syn: [200, 185], dmg: [60, 120, 100], dlab: [128, 104], bd: [[150, 248], [400, 112], [330, 70], [226, 190], [612, 150]],
      gau: [340, 262, 280], gy: 252, tl: [30, 610, 318], tx: [70, 280, 480], q: [112, 176],
    };
    el.innerHTML = `<div class="f55-ctl">${seg('Evre', 'p', [['0', 'Normal'], ['1', dar ? 'Akut hasar' : 'Akut omurilik hasarı'], ['2', dar ? '≈ 2 hafta' : '≈ 2 hafta sonra']], String(S.ph))}<div class="btn-row"><button type="button" class="btn" data-a="oyn">Oynat</button></div></div>
      <div class="f55-sv"></div>
      <ol class="f55-halka"><li><b>1</b> γ uyarısı</li><li><b>2</b> uçlar kısalır, orta bölüm gerilir</li><li><b>3</b> Ia ateşlemesi ↑</li><li><b>4</b> α-motor nöron</li><li><b>5</b> ekstrafuzal kasılma = tonus</li></ol>`;
    const svg = svgOf(el.querySelector('.f55-sv'), W, H, 'İnen supraspinal nöronlar, γ-motor ve α-motor nöronlar, kas iğciği ve ekstrafuzal lifler; γ döngüsü ve kas tonusu göstergesi');
    const [bx0, by0, bw, bh] = P.brain; mk('rect', { x: bx0, y: by0, width: bw, height: bh, rx: 10, class: 'f55-brain' }, svg); txt(svg, bx0 + bw / 2, by0 + bh / 2 + 4, 'inen ekstrapiramidal supraspinal nöronlar', 'f55-t', 'middle');
    mk('rect', { x: P.cord[0], y: P.cord[1], width: P.cord[2], height: P.cord[3], rx: 30, class: 'f55-cord' }, svg); txt(svg, P.cord[0] + P.cord[2] - 14, P.cord[1] + 22, 'Omurilik', 'f55-tm', 'end');
    const inen = mk('path', { d: `M${P.bx} ${by0 + bh}V${P.g[1] - 16}`, class: 'f55-inen strong' }, svg); mk('path', { d: `M${P.bx - 6} ${P.g[1] - 24}L${P.bx} ${P.g[1] - 16}L${P.bx + 6} ${P.g[1] - 24}`, class: 'f55-inen f55-inen-h strong' }, svg);
    const dmg = mk('g', {}, svg); mk('path', { d: `M${P.dmg[0]} ${P.dmg[2]}H${P.dmg[1]}`, class: 'f55-dmg' }, dmg); txt(dmg, P.dlab[0], P.dlab[1], 'hasar', 'f55-t f55-dtx');
    // kas
    mk('rect', { x: P.wall[0], y: P.wall[1], width: P.wall[2], height: P.wall[3], rx: 3, class: 'f55-ten' }, svg);
    const strips = [0, 1].map(() => mk('rect', { x: P.mx0, width: P.mw, rx: 9, class: 'f55-ext' }, svg));
    const ig = igcik(svg, { cx: P.sp.cx, cy: P.cy, w: P.sp.w, h: P.sp.h, e0: P.sp.e0 });
    const pg = mk('path', { d: P.pg, class: 'f55-ax f55-ax-g' }, svg), pa = mk('path', { d: P.pa, class: 'f55-ax f55-ax-a' }, svg), pi = mk('path', { d: P.pi, class: 'f55-ax f55-ax-ia' }, svg);
    const gS = mk('circle', { cx: P.g[0], cy: P.g[1], r: 15, class: 'f55-soma f55-soma-g' }, svg), aS = mk('circle', { cx: P.a[0], cy: P.a[1], r: 15, class: 'f55-soma f55-soma-a' }, svg);
    txt(svg, P.g[0], P.g[1] + 5, 'γ', 'f55-t f55-sl', 'middle'); txt(svg, P.a[0], P.a[1] + 5, 'α', 'f55-t f55-sl', 'middle');
    const sy = mk('circle', { cx: P.syn[0], cy: P.syn[1], r: 7, class: 'f55-plus' }, svg); txt(svg, P.syn[0], P.syn[1] + 4, '+', 'f55-t f55-sl', 'middle');
    const q = mk('g', { tabindex: 0, role: 'img', 'aria-label': 'γ etkinliğindeki artışın mekanizması bilinmiyor' }, svg); mk('circle', { cx: P.g[0] + 26, cy: P.g[1] - 22, r: 9, class: 'f55-q' }, q); txt(q, P.g[0] + 26, P.g[1] - 18, '?', 'f55-t f55-sl', 'middle'); const qt = mk('title', {}, q); qt.textContent = 'mekanizma bilinmiyor';
    P.bd.forEach(([x, y], i) => { mk('circle', { cx: x, cy: y, r: 9, class: 'f55-bd' }, svg); txt(svg, x, y + 4, String(i + 1), 'f55-bdt', 'middle'); });
    const sg = spk(svg, pg, 'var(--accent)', 10), si = spk(svg, pi, 'var(--c-basic)', 10), sa = spk(svg, pa, 'var(--c-clin)', 10);
    // tonus göstergesi
    const [gx, gy0, gw] = [P.gau[0], P.gau[1], P.gau[2]], gy = P.gy;
    txt(svg, gx, gy, 'Kas tonusu', 'f55-t'); mk('rect', { x: gx, y: gy0 + (dar ? 0 : 4), width: gw, height: 12, rx: 6, class: 'f55-trk f55-trk3' }, svg);
    const ty = gy0 + (dar ? 6 : 10), mark = mk('circle', { cy: ty, r: 9, class: 'f55-mark' }, svg);
    txt(svg, gx, ty + 26, 'flask', 'f55-tm'); txt(svg, gx + gw / 2, ty + 26, 'normal', 'f55-tm', 'middle'); txt(svg, gx + gw, ty + 26, 'spastik', 'f55-tm', 'end');
    // zaman çizelgesi
    mk('line', { x1: P.tl[0], x2: P.tl[1], y1: P.tl[2], y2: P.tl[2], class: 'f55-axis' }, svg);
    ['normal', 'hasar', '≈ 2 hafta'].forEach((t, i) => { mk('line', { x1: P.tx[i], x2: P.tx[i], y1: P.tl[2] - 5, y2: P.tl[2] + 5, class: 'f55-axis' }, svg); txt(svg, P.tx[i], P.tl[2] + 22, t, 'f55-tm', 'middle'); });
    const tdot = mk('circle', { cy: P.tl[2], r: 6, class: 'f55-mark' }, svg);
    function draw() {
      const L = S.lv, ph = S.ph;
      const h = lerp(11, 32, L.t); strips.forEach((s, i) => { const c = i ? P.c2 : P.c1; s.setAttribute('y', c - h / 2); s.setAttribute('height', h); s.style.opacity = lerp(0.45, 1, L.t); });
      const gm = L.g; ig.set({ len: 1, uc: lerp(1, 0.55, gm), slack: clamp(0.8 - gm * 1.6, 0, 0.8) });
      mark.setAttribute('cx', gx + (L.t) * gw); tdot.setAttribute('cx', P.tx[ph]);
      pg.classList.toggle('off', ph === 1); pa.classList.toggle('off', ph === 1); pi.classList.toggle('off', ph === 1);
      [pg, pa, pi].forEach((p) => p.classList.toggle('hot', ph === 2)); gS.classList.toggle('hot', ph === 2); gS.classList.toggle('off', ph === 1); aS.classList.toggle('off', ph === 1);
      pg.style.strokeWidth = pa.style.strokeWidth = pi.style.strokeWidth = (RM ? 1 + L.g * 3 : 0) || '';
      inen.classList.toggle('off', ph >= 1); dmg.style.display = ph >= 1 ? '' : 'none'; q.style.display = ph === 2 ? '' : 'none';
      el.querySelectorAll('.f55-trk3').forEach((t) => t.classList.add('f55-trk3'));
      setSeg(el, 'p', ph); if (S.cap !== ph) { S.cap = ph; setCap(el, TCAP[ph]); }
    }
    draw();
    const btn = el.querySelector('[data-a=oyn]');
    el.querySelectorAll('[data-p]').forEach((b) => b.addEventListener('click', () => { S.ph = +b.dataset.p; S.play = false; S.pt = 0; if (RM) S.lv = { ...TLV[S.ph] }; draw(); }));
    btn.addEventListener('click', () => { if (RM) { S.ph = (S.ph + 1) % 3; S.lv = { ...TLV[S.ph] }; draw(); return; } S.ph = 0; S.play = true; S.pt = 0; draw(); });
    const stop = RM ? () => {} : ticker(el, (dt) => {
      if (S.play) { S.pt += dt; if (S.pt >= 4) { S.pt = 0; if (S.ph < 2) S.ph++; else S.play = false; } }
      const T = TLV[S.ph], k = Math.min(1, dt * 2.5); ['g', 'i', 'a', 't'].forEach((n) => { S.lv[n] += (T[n] - S.lv[n]) * k; });
      draw();
      sg.upd(dt, S.lv.g * 14, 1.5); si.upd(dt, S.lv.i * 14, 1.5); sa.upd(dt, S.lv.a * 14, 1.5);
    });
    return { destroy() { stop(); } };
  });
})();
