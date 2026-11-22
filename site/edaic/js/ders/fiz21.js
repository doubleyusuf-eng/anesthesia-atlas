/* Fizyoloji Bölüm 21 · Solunum işi · bileşenler (K1 s. 88–92). Tarif: docs/tasarim/fiz21.md
   Bütün modeller şematiktir: kitaptan gelen değerler (Re eşikleri, 1/r⁴, −5 cmH₂O, 0,2 L/cmH₂O, %65) ile atlas
   değerleri sayfadaki viz-foot notlarında ayrılır. Bileşen yalnız data-viz öğesine çizer, açıklamayı .viz-cap'e yazar. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const txt = (parent, x, y, s, cls, attrs) => { const t = mk('text', Object.assign({ x, y }, cls ? { class: cls } : {}, attrs || {}), parent); t.textContent = s; return t; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const yak = (c, h, dt, tau) => (RM ? h : c + (h - c) * (1 - Math.exp(-dt / tau)));
  const fmt = (v, d = 1) => (Math.abs(v) < 0.5 * Math.pow(10, -d) ? 0 : v).toFixed(d).replace('.', ',').replace('-', '−');
  const binlik = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const kat = (x) => '×' + fmt(x, x >= 9.995 ? 1 : 2);
  const kisa = (x) => (Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : fmt(x, 2).replace(/0+$/, '').replace(/,$/, ''));
  const yolD = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const sonuc = (R) => (R <= 1.2 ? 'ok' : R <= 3 ? 'warn' : 'crit'); // direnç sonucu rengi (tarifteki sözlük)
  const rnd = (() => { let s = 21; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();
  const segHtml = (ad, key, opts, cur, cls) => `<div class="seg${cls ? ' ' + cls : ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (root, key, v) => root.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(v !== null && b.dataset[key] === String(v))));
  /* sayfadaki .viz-cap'e yaz (yalnız metin değişince) */
  function capOf(el) {
    const viz = el.closest('.viz'), c = viz ? viz.querySelector('.viz-cap') : null;
    let son = null;
    return { yaz(h) { if (!c || h === son) return; c.innerHTML = REF(h); son = h; } };
  }
  /* dar/geniş yerleşim: el.clientWidth < 560 değişince cb(dar) */
  function genislik(el, cb) {
    let dar = null;
    const bak = () => { const d = el.clientWidth < 560; if (d !== dar) { dar = d; cb(d); } };
    const ro = 'ResizeObserver' in window ? new ResizeObserver(bak) : null;
    if (ro) ro.observe(el);
    bak();
    return () => { if (ro) ro.disconnect(); };
  }
  /* kısa geçiş (ms): hedef değerlere ease-out ile kayar; RM'de anında */
  function yumusak(sure, uygula) {
    let cur = null, bas = null, hedef = null, raf = 0, t0 = 0;
    const adim = (t) => {
      const f = Math.min(1, (t - t0) / sure), e = 1 - Math.pow(1 - f, 3);
      for (const k in hedef) cur[k] = lerp(bas[k] === undefined ? hedef[k] : bas[k], hedef[k], e);
      uygula(cur);
      raf = f < 1 ? requestAnimationFrame(adim) : 0;
    };
    return {
      set(h, ani = true) {
        hedef = Object.assign({}, h);
        if (!cur || RM || !ani) { cancelAnimationFrame(raf); raf = 0; cur = Object.assign({}, hedef); uygula(cur); return; }
        bas = Object.assign({}, cur); t0 = performance.now();
        if (!raf) raf = requestAnimationFrame(adim);
      },
      simdi: () => cur,
      dur() { cancelAnimationFrame(raf); raf = 0; },
    };
  }
  /* eğri üzerinde küçük ok başı (pts sırası = hareket yönü) */
  function okBasi(parent, pts, i, cls, boy = 7) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)], p = pts[i];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), c = Math.cos(ang), s = Math.sin(ang);
    const q = (dx, dy) => (p[0] + dx * c - dy * s).toFixed(1) + ',' + (p[1] + dx * s + dy * c).toFixed(1);
    return mk('polygon', { points: [q(boy * 0.6, 0), q(-boy * 0.6, boy * 0.55), q(-boy * 0.6, -boy * 0.55)].join(' '), class: cls }, parent);
  }

  /* ================= 1 · Reynolds sayısı: laminer mi, türbülan mı? ================= */
  VIZ.f21_reynolds = (el) => {
    const cap = capOf(el);
    const GAZ = {
      hava: { ad: 'Hava', rho: 1.2, eta: 1.8e-5, rT: '1,2', eT: '1,8×10⁻⁵' },
      helioks: { ad: 'Helioks', rho: 0.41, eta: 2.0e-5, rT: '0,41', eT: '2,0×10⁻⁵' },
      des: { ad: '%10 desfluran', rho: 1.78, eta: 1.8e-5, rT: '1,78', eT: '1,8×10⁻⁵' },
      dalis: { ad: 'Dalış (30 m)', rho: 4.8, eta: 1.8e-5, rT: '4,8', eT: '1,8×10⁻⁵' },
    };
    const HZ = [
      { id: 'trakea', ad: 'Sakin · trakea', gaz: 'hava', Q: 0.5, d: 18, c: 'Normal tidal solunumda akım genellikle yalnız trakeada türbülandır. [[K1 s. 88]]' },
      { id: 'bronş', ad: 'Sakin · ana bronş', gaz: 'hava', Q: 0.25, d: 12, c: 'Büyük bronşlarda akım tepe inspiratuvar akım sırasında türbülanlaşabilir. [[K1 s. 88]]' },
      { id: 'hizli', ad: 'Hızlı solunum', gaz: 'hava', Q: 0.75, d: 12, c: 'RR artınca gaz hızı artar; büyük bronşlarda akım döngünün daha uzun bir bölümünde türbülan olur. [[K1 s. 88–89]]' },
      { id: 'obs', ad: 'Üst hava yolu obstrüksiyonu', gaz: 'hava', Q: 0.5, d: 6, c: 'Laringeal ödem ya da yabancı cisim: daralmanın çevresinde artan gaz hızı türbülansa yol açar. [[K1 s. 89]]' },
      { id: 'obshe', ad: 'Obstrüksiyon + helioks', gaz: 'helioks', Q: 0.5, d: 6, c: "Helioksun düşük yoğunluğu Re'yi aynı koşuldaki havanın yaklaşık üçte birine indirir ve türbülansı azaltır. [[K1 s. 89]]" },
      { id: 'dalis', ad: 'Dalış · ana bronş', gaz: 'dalis', Q: 0.25, d: 12, c: 'Derinlikte gazın yoğunluğu artar; Re türbülansı daha düşük hızda öngörür ve normal tidal solunumda bile bronşlarda akım türbülanlaşır. Dalgıçlar bu yüzden He–O₂ karışımı kullanır. [[K1 s. 89]]' },
      { id: 'des', ad: '%10 desfluran', gaz: 'des', Q: 0.5, d: 18, c: 'Volatil anestezikler, özellikle yüksek konsantrasyonda, gaz karışımının yoğunluğunu belirgin artırır; Re ve türbülans artar. [[K1 s. 91]]' },
    ];
    const BOLGE = {
      lam: { ad: 'laminer', k: 'ok', c: "Akım düzenli katmanlar hâlinde, direnç düşük. Kitaba göre Re 200'de akımın laminer olma olasılığı %80'dir. [[K1 s. 89]]" },
      gec: { ad: 'geçiş', k: 'warn', c: "Re 200 ile 2000 arasında kitap kesin bir sınır vermez: Re büyüdükçe akımın türbülan olma olasılığı artar. [[K1 s. 89]]" },
      tur: { ad: 'türbülan', k: 'crit', c: "Kitaba göre Re 2000'de akımın türbülan olma olasılığı %80'dir; türbülan akım laminerden çok daha yüksek direnç demektir. [[K1 s. 88–89]]" },
    };
    const st = { h: 'trakea', gaz: 'hava', Q: 0.5, d: 18 };
    const hesap = (gaz, Q, d) => { const g = GAZ[gaz], D = d / 1000, v = Q / 1000 / (Math.PI * D * D / 4); return { v, re: g.rho * v * D / g.eta }; };
    const bolge = (re) => (re < 200 ? 'lam' : re < 2000 ? 'gec' : 'tur');
    const reYaz = (re) => binlik(re < 1000 ? re : Math.round(re / 10) * 10);

    el.innerHTML = `<div class="f21-ust">
        <div class="f21-grup"><span class="f21-gl">Hazır durum</span>${segHtml('Hazır durum', 'h', HZ.map((h) => [h.id, h.ad]), st.h)}</div>
        <div class="f21-grup"><span class="f21-gl">Gaz</span>${segHtml('Gaz', 'g', Object.keys(GAZ).map((g) => [g, GAZ[g].ad]), st.gaz)}</div>
        <div class="f21-rngs">
          <label class="f21-rng"><span>Akım Q̇ <output data-o="Q"></output></span><input type="range" min="0.1" max="2" step="0.05" value="0.5" data-r="Q"></label>
          <label class="f21-rng"><span>Hava yolu çapı d <output data-o="d"></output></span><input type="range" min="4" max="20" step="1" value="18" data-r="d"></label>
        </div>
      </div>
      <div class="f21-svgk"></div>`;
    const $ = (s) => el.querySelector(s);
    const kap = $('.f21-svgk');
    let G = null, E = {};
    // parçacıklar: 10 şerit × 4; rank → geçiş bölgesinde hangisinin türbülan davranacağı
    const PAR = Array.from({ length: 40 }, (_, i) => { const y0 = ((i % 10) + 0.5) / 10 * 2 - 1; return { x: rnd(), y: y0, y0, ty: y0, rank: rnd(), sx: rnd(), sy: rnd() * 2 - 1 }; });
    const GIR = Array.from({ length: 6 }, () => ({ on: false, x: 0, y: 0, r: 10, a: 0, yas: 0, omur: Infinity, sinif: 'tur' }));
    let hD = null, ixD = null, gxD = null, girT = 0, yanT = 0, ilk = true;

    const kur = (dar) => {
      G = dar
        ? { dar, W: 360, H: 314, x0: 16, x1: 344, yc: 84, hk: 2, hmax: 40, xb: 262, Lm: 62, ty: 22, n1: 158, n2: 178, reY: 212, cmpY: 234, bY: 252, bH: 16, tkY: 284, rgY: 304, ticks: [200, 2000, 20000] }
        : { dar, W: 720, H: 330, x0: 40, x1: 680, yc: 112, hk: 3, hmax: 60, xb: 586, Lm: 74, ty: 26, n1: 226, n2: null, reY: 232, cmpY: 250, bY: 270, bH: 18, tkY: 305, rgY: null, ticks: [100, 200, 1000, 2000, 10000, 100000] };
      kap.innerHTML = '';
      const svg = mk('svg', { class: 'f21-svg' + (dar ? ' dar' : ''), viewBox: `0 0 ${G.W} ${G.H}`, role: 'img', 'aria-label': 'Boyuna kesitte hava yolu: gaz parçacıkları düzenli katmanlar hâlinde ya da girdaplı akar; altta Reynolds sayısının logaritmik ölçekteki yeri' }, kap);
      E.svg = svg;
      E.lumen = mk('rect', { class: 'f21-re-lumen', x: G.x0, width: G.x1 - G.x0 }, svg);
      E.akim = mk('g', { class: 'f21-re-akim' }, svg); // RM akım çizgileri
      E.cizgi = Array.from({ length: 5 }, () => mk('line', { class: 'f21-re-cizgi', x1: G.x0 + 26, x2: G.x1 - 4 }, E.akim));
      E.parG = mk('g', {}, svg);
      E.par = PAR.map(() => mk('circle', { r: 2.5, class: 'f21-re-par' }, E.parG));
      E.girG = mk('g', {}, svg);
      E.gir = GIR.map(() => { const g = mk('g', { class: 'f21-re-gir', opacity: 0 }, E.girG); mk('path', {}, g); mk('polygon', {}, g); return g; });
      E.duvarU = mk('path', { class: 'f21-re-duvar' }, svg);
      E.duvarA = mk('path', { class: 'f21-re-duvar' }, svg);
      E.prof = mk('g', { class: 'f21-re-prof' }, svg);
      E.profTaban = mk('line', { class: 'f21-re-ptaban', x1: G.xb, x2: G.xb }, E.prof);
      E.profZarf = mk('path', { class: 'f21-re-pzarf' }, E.prof);
      E.oklar = Array.from({ length: 7 }, () => { const g = mk('g', {}, E.prof); mk('line', { x1: G.xb }, g); mk('polygon', {}, g); return g; });
      E.etk = txt(svg, G.x0, G.ty, '', 'f21-t f21-re-etk');
      // sayılar
      E.n1 = txt(svg, G.x0, G.n1, '', 'f21-mono f21-re-n');
      E.n2 = G.dar ? txt(svg, G.x0, G.n2, '', 'f21-mono f21-re-n') : null;
      E.re = txt(svg, dar ? G.x0 : G.x1, G.reY, '', 'f21-re-big', dar ? {} : { 'text-anchor': 'end' });
      E.bad = txt(svg, G.x1, dar ? G.reY : G.reY + 20, '', 'f21-re-bad', { 'text-anchor': 'end' });
      E.cmp = txt(svg, G.x0, G.cmpY, '', 'f21-t f21-re-cmp');
      // Re ölçeği (log, 100 → 100 000)
      const xr = (re) => G.x0 + (Math.log10(clamp(re, 100, 100000)) - 2) / 3 * (G.x1 - G.x0);
      E.xr = xr;
      const bnd = [[100, 200, 'ok', 'laminer'], [200, 2000, 'warn', 'geçiş'], [2000, 100000, 'crit', 'türbülan']];
      bnd.forEach(([a, b, k, ad]) => {
        mk('rect', { x: xr(a), y: G.bY, width: xr(b) - xr(a), height: G.bH, class: 'f21-re-bnd ' + k }, svg);
        if (!dar) txt(svg, (xr(a) + xr(b)) / 2, G.bY + G.bH / 2 + 4, ad, 'f21-t f21-re-bndt', { 'text-anchor': 'middle' });
      });
      if (dar) {
        txt(svg, G.x0, G.rgY, 'laminer', 'f21-t f21-re-rg ok');
        txt(svg, (xr(200) + xr(2000)) / 2, G.rgY, 'geçiş', 'f21-t f21-re-rg warn', { 'text-anchor': 'middle' });
        txt(svg, (xr(2000) + xr(100000)) / 2, G.rgY, 'türbülan', 'f21-t f21-re-rg crit', { 'text-anchor': 'middle' });
      }
      G.ticks.forEach((t) => {
        const x = xr(t), kal = t === 200 || t === 2000;
        mk('line', { x1: x, x2: x, y1: G.bY - (kal ? 4 : 0), y2: G.bY + G.bH + (kal ? 4 : 2), class: kal ? 'f21-re-esik' : 'f21-re-tk' }, svg);
        txt(svg, x, G.tkY, binlik(t), 'f21-t f21-tk', { 'text-anchor': t === 100 ? 'start' : t === 100000 ? 'end' : 'middle' });
        if (!dar && kal) txt(svg, x, G.tkY + 16, t === 200 ? 'kitap: %80 laminer' : 'kitap: %80 türbülan', 'f21-t f21-re-kit', { 'text-anchor': 'middle' });
      });
      if (dar) [200, 2000].forEach((t) => mk('line', { x1: xr(t), x2: xr(t), y1: G.bY - 4, y2: G.bY + G.bH + 4, class: 'f21-re-esik' }, svg));
      E.hg = mk('g', { class: 'f21-re-gost hayal' }, svg);
      mk('polygon', { points: `-6,${G.bY - 11} 6,${G.bY - 11} 0,${G.bY - 2}` }, E.hg);
      mk('line', { x1: 0, x2: 0, y1: G.bY - 2, y2: G.bY + G.bH + 2 }, E.hg);
      E.ig = mk('g', { class: 'f21-re-gost' }, svg);
      mk('polygon', { points: `-7,${G.bY - 12} 7,${G.bY - 12} 0,${G.bY - 2}` }, E.ig);
      mk('line', { x1: 0, x2: 0, y1: G.bY - 2, y2: G.bY + G.bH + 3 }, E.ig);
      E.asim = txt(svg, G.x1 - 10, G.bY - 4, '> 100 000', 'f21-t f21-re-asim', { 'text-anchor': 'end' });
      hD = null; ixD = null; gxD = null; ilk = true;
      yaz(false);
      if (RM) statik();
    };

    const duvarCiz = (h) => {
      const { x0, x1, yc } = G, f = Math.min(12, h * 0.4);
      E.duvarU.setAttribute('d', `M${x0} ${yc - h - f} Q${x0 + 12} ${yc - h} ${x0 + 26} ${yc - h} L${x1} ${yc - h}`);
      E.duvarA.setAttribute('d', `M${x0} ${yc + h + f} Q${x0 + 12} ${yc + h} ${x0 + 26} ${yc + h} L${x1} ${yc + h}`);
      E.lumen.setAttribute('y', yc - h); E.lumen.setAttribute('height', 2 * h);
      E.cizgi.forEach((c, i) => { const y = yc + ((i + 0.5) / 5 * 2 - 1) * h * 0.82; c.setAttribute('y1', y); c.setAttribute('y2', y); });
    };
    let durum = null; // hesaplanmış güncel değerler
    const profilCiz = (h, f) => {
      // f: 0 = parabolik (laminer), 1 = düz (türbülan)
      const { xb, Lm, yc } = G, zarf = [];
      E.profTaban.setAttribute('y1', yc - h); E.profTaban.setAttribute('y2', yc + h);
      const L = (yr) => Lm * ((1 - f) * (1 - yr * yr) + f * (1 - 0.2 * yr * yr) * (1 - Math.pow(Math.abs(yr), 20)));
      for (let i = 0; i <= 40; i++) { const yr = i / 20 - 1; zarf.push([xb + L(yr), yc + yr * h]); }
      E.profZarf.setAttribute('d', yolD(zarf));
      E.oklar.forEach((g, k) => {
        const yr = (k - 3) / 3.5, y = yc + yr * h, x2 = xb + L(yr);
        const ln = g.firstChild, pg = g.lastChild;
        ln.setAttribute('y1', y); ln.setAttribute('y2', y); ln.setAttribute('x2', Math.max(xb, x2 - 5));
        const s = Math.min(4, h / 6 + 1);
        pg.setAttribute('points', `${x2},${y} ${x2 - 6},${y - s} ${x2 - 6},${y + s}`);
      });
    };
    const girdapYap = (g, r) => {
      const a = 290 * Math.PI / 180, ex = r * Math.cos(a), ey = r * Math.sin(a), tx = -Math.sin(a), ty = Math.cos(a);
      g.firstChild.setAttribute('d', `M${r} 0 A${r} ${r} 0 1 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`);
      const hx = ex + tx * 4, hy = ey + ty * 4, nx = -ty, ny = tx;
      g.lastChild.setAttribute('points', `${hx.toFixed(1)},${hy.toFixed(1)} ${(ex + nx * 3).toFixed(1)},${(ey + ny * 3).toFixed(1)} ${(ex - nx * 3).toFixed(1)},${(ey - ny * 3).toFixed(1)}`);
    };
    const ekranHiz = (v) => clamp(40 + 60 * Math.log10(v / 0.3), 30, 260) * (G.dar ? 0.6 : 1);
    const turbP = (b, re) => (b === 'lam' ? 0 : b === 'tur' ? 1 : clamp(0.8 * (Math.log10(re) - Math.log10(200)), 0, 0.8));

    const yaz = (ani = true) => {
      const g = GAZ[st.gaz], { v, re } = hesap(st.gaz, st.Q, st.d), b = bolge(re), B = BOLGE[b];
      durum = { v, re, b, p: turbP(b, re) };
      $('[data-o="Q"]').textContent = fmt(st.Q, 2) + ' L/s';
      $('[data-o="d"]').textContent = st.d + ' mm';
      basSec(el, 'h', st.h); basSec(el, 'g', st.gaz);
      const hz = HZ.find((h) => h.id === st.h);
      E.etk.textContent = hz ? hz.ad + ' · ' + st.d + ' mm' : st.d + ' mm hava yolu';
      const vT = fmt(v, v >= 100 ? 1 : 2) + ' m/s';
      if (G.dar) { E.n1.textContent = `v = ${vT} · d = ${st.d} mm`; E.n2.textContent = `ρ = ${g.rT} kg/m³ · η = ${g.eT} Pa·s`; }
      else E.n1.textContent = `v = ${vT} · ρ = ${g.rT} kg/m³ · d = ${st.d} mm · η = ${g.eT} Pa·s`;
      E.re.textContent = 'Re ≈ ' + reYaz(re);
      E.re.setAttribute('class', 'f21-re-big ' + B.k);
      E.bad.textContent = B.ad; E.bad.setAttribute('class', 'f21-re-bad ' + B.k);
      const hv = st.gaz !== 'hava' ? hesap('hava', st.Q, st.d).re : null;
      E.cmp.textContent = hv ? 'aynı koşulda hava: Re ≈ ' + reYaz(hv) : '';
      E.hg.style.display = hv ? '' : 'none';
      E.asim.style.display = re > 100000 ? '' : 'none';
      E.oklar.forEach((o) => o.setAttribute('class', 'f21-re-ok ' + B.k));
      E.profZarf.setAttribute('class', 'f21-re-pzarf ' + B.k);
      const hT = Math.min(G.hmax, G.hk * st.d);
      if (hD === null || !ani || RM) { hD = hT; ixD = E.xr(re); gxD = hv ? E.xr(hv) : ixD; duvarCiz(hD); }
      durum.hT = hT; durum.ixT = E.xr(re); durum.gxT = hv ? E.xr(hv) : E.xr(re);
      E.ig.setAttribute('transform', `translate(${ixD.toFixed(1)} 0)`); E.hg.setAttribute('transform', `translate(${gxD.toFixed(1)} 0)`);
      profilCiz(hD, b === 'lam' ? 0 : b === 'tur' ? 1 : durum.p / 0.8);
      cap.yaz(`<b>${g.ad}, ${fmt(st.Q, 2)} L/s, ${st.d} mm: Re ≈ ${reYaz(re)} (${B.ad}).</b> ${B.c}${hz ? ' ' + hz.c : ''}`);
      if (RM) statik();
    };

    /* azaltılmış hareket: donuk görünüm */
    const statik = () => {
      if (!G || !durum) return;
      const { b } = durum, h = hD, { yc, x0, x1 } = G;
      E.akim.style.display = b === 'tur' ? 'none' : '';
      E.par.forEach((c, i) => {
        const P = PAR[i], on = b === 'tur';
        c.style.display = on ? '' : 'none';
        if (on) { c.setAttribute('cx', (x0 + 30 + P.sx * (x1 - x0 - 40)).toFixed(1)); c.setAttribute('cy', (yc + P.sy * h * 0.85).toFixed(1)); }
      });
      const n = b === 'tur' ? 4 : b === 'gec' ? 2 : 0;
      E.gir.forEach((g, i) => {
        if (i >= n) { g.setAttribute('opacity', 0); return; }
        const r = (b === 'tur' ? 10 : 9) * Math.min(1, h / 30);
        girdapYap(g, r);
        g.setAttribute('class', 'f21-re-gir ' + (b === 'tur' ? 'crit' : 'warn'));
        g.setAttribute('transform', `translate(${(x0 + 60 + i * (G.xb - x0 - 80) / Math.max(1, n - 1 || 1)).toFixed(1)} ${(yc + (i % 2 ? 0.35 : -0.35) * h).toFixed(1)})`);
        g.setAttribute('opacity', 1);
      });
    };

    const adim = (dt) => {
      if (!G || !durum) return;
      const { b, p, v } = durum, { x0, x1, yc } = G;
      E.akim.style.display = 'none';
      // geçişler (≈400 ms)
      const hEski = hD;
      hD = yak(hD, durum.hT, dt, 0.1); ixD = yak(ixD, durum.ixT, dt, 0.1); gxD = yak(gxD, durum.gxT, dt, 0.1);
      if (Math.abs(hD - hEski) > 0.01) { duvarCiz(hD); profilCiz(hD, b === 'lam' ? 0 : b === 'tur' ? 1 : p / 0.8); }
      E.ig.setAttribute('transform', `translate(${ixD.toFixed(1)} 0)`); E.hg.setAttribute('transform', `translate(${gxD.toFixed(1)} 0)`);
      const s = ekranHiz(v), h = hD;
      yanT += dt; const yeniYon = yanT > 0.1; if (yeniYon) yanT = 0;
      PAR.forEach((P, i) => {
        const tur = P.rank < p;
        if (tur) { if (yeniYon) P.ty = clamp(P.y + (rnd() * 2 - 1) * 0.3, -0.92, 0.92); P.y += (P.ty - P.y) * Math.min(1, dt * 8); }
        else P.y += (P.y0 - P.y) * Math.min(1, dt * 1.5);
        const hz = tur ? s * (1 - 0.2 * P.y * P.y) : 1.5 * s * (1 - P.y * P.y);
        P.x += (hz * dt) / (x1 - x0);
        if (P.x > 1) { P.x -= 1; if (tur) { P.y = rnd() * 1.8 - 0.9; P.ty = P.y; } }
        const c = E.par[i];
        c.style.display = '';
        c.setAttribute('cx', (x0 + 8 + P.x * (x1 - x0 - 10)).toFixed(1));
        c.setAttribute('cy', (yc + P.y * h * 0.88).toFixed(1));
      });
      // girdaplar
      const olc = Math.min(1, h / 30);
      const yeni = (x, sinif, omur) => {
        const g = GIR.find((q) => !q.on); if (!g) return;
        Object.assign(g, { on: true, x, y: rnd() * 1.2 - 0.6, r: (sinif === 'tur' ? 8 + rnd() * 4 : 9) * olc, a: rnd() * 360, yas: 0, omur, sinif, olum: undefined });
        const el2 = E.gir[GIR.indexOf(g)]; girdapYap(el2, Math.max(3, g.r)); el2.setAttribute('class', 'f21-re-gir ' + (sinif === 'tur' ? 'crit' : 'warn'));
      };
      if (b === 'tur') {
        const n = GIR.filter((q) => q.on && q.omur === Infinity && q.olum === undefined).length;
        girT += dt;
        if (ilk) { for (let k = n; k < 5; k++) yeni(x0 + 40 + rnd() * (G.xb - x0 - 80), 'tur', Infinity); ilk = false; }
        else if (n < 5 && girT > 0.35) { yeni(x0 + 30, 'tur', Infinity); girT = 0; }
      } else {
        ilk = true;
        GIR.forEach((q) => { if (q.on && q.omur === Infinity && q.olum === undefined) q.olum = q.yas; });
        if (b === 'gec') { girT += dt; if (girT > 1.5) { girT = 0; if (rnd() < p) yeni(x0 + 40 + rnd() * ((x0 + x1) / 2 - x0 - 40), 'gec', 1); } }
      }
      GIR.forEach((q, i) => {
        const g = E.gir[i];
        if (!q.on) { g.setAttribute('opacity', 0); return; }
        q.yas += dt; q.x += s * 0.9 * dt; q.a += 220 * dt;
        let op = q.omur === Infinity ? Math.min(1, q.yas / 0.3) : Math.max(0, Math.sin(Math.PI * clamp(q.yas / q.omur, 0, 1)));
        if (q.olum !== undefined) { op *= Math.max(0, 1 - (q.yas - q.olum) / 0.4); if (q.yas - q.olum > 0.4) { q.on = false; op = 0; } }
        if (q.omur !== Infinity && q.yas > q.omur) { q.on = false; op = 0; }
        if (q.x > G.xb - 14) { q.on = false; op = 0; }
        g.setAttribute('opacity', op.toFixed(2));
        g.setAttribute('transform', `translate(${q.x.toFixed(1)} ${(yc + q.y * h * 0.7).toFixed(1)}) rotate(${q.a.toFixed(0)})`);
      });
    };

    el.addEventListener('click', (e) => {
      const hb = e.target.closest('[data-h]'), gb = e.target.closest('[data-g]');
      if (hb) { const h = HZ.find((q) => q.id === hb.dataset.h); Object.assign(st, { h: h.id, gaz: h.gaz, Q: h.Q, d: h.d }); $('[data-r="Q"]').value = h.Q; $('[data-r="d"]').value = h.d; yaz(); }
      else if (gb) { st.gaz = gb.dataset.g; st.h = null; yaz(); }
    });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      st[r.dataset.r] = +r.value; st.h = null; yaz();
    });
    const birak = genislik(el, kur);
    const dur = RM ? () => {} : ticker(el, adim);
    return () => { dur(); birak(); };
  };

  /* ================= 2 · Yarıçapın dördüncü kuvveti ================= */
  VIZ.f21_yaricap = (el) => {
    const cap = capOf(el);
    const ETT = { eriskin: { ad: 'Erişkin', boy: [6, 7, 8, 9], ref: 8 }, cocuk: { ad: 'Çocuk', boy: [3, 3.5, 4, 4.5], ref: 4 } };
    const NLER = [1, 2, 4, 8, 16, 32, 64];
    const st = { kip: 'A', p: 100, grup: 'eriskin', ett: { eriskin: 7, cocuk: 3 }, ni: 4 };
    const mm = (x) => fmt(x, 1);
    el.innerHTML = `<div class="f21-ust">
        ${segHtml('Kip', 'k', [['A', 'Yarıçap'], ['B', 'ETT'], ['C', 'Paralel dallar']], st.kip)}
        <div class="f21-kp" data-kp="A"><label class="f21-rng"><span>Yarıçap (başlangıca göre) <output data-o="p"></output></span><input type="range" min="50" max="120" step="5" value="100" data-r="p"></label></div>
        <div class="f21-kp" data-kp="B" hidden>
          <div class="f21-grup"><span class="f21-gl">Hasta</span>${segHtml('Hasta', 'grup', [['eriskin', 'Erişkin'], ['cocuk', 'Çocuk']], st.grup)}</div>
          <div class="f21-grup"><span class="f21-gl">ETT iç çapı</span><div class="f21-ettseg"></div></div>
        </div>
        <div class="f21-kp" data-kp="C" hidden><label class="f21-rng"><span>Dal sayısı N <output data-o="N"></output></span><input type="range" min="0" max="6" step="1" value="4" data-r="ni"></label></div>
      </div>
      <div class="f21-svgk"></div>`;
    const $ = (s) => el.querySelector(s);
    const kap = $('.f21-svgk');
    let G = null, E = {};
    const yum = yumusak(300, (c) => uygula(c));
    const ettSeg = () => {
      const g = ETT[st.grup];
      $('.f21-ettseg').innerHTML = segHtml('ETT iç çapı', 'ett', g.boy.map((b) => [b, mm(b) + ' mm']), st.ett[st.grup], 'f21-mono');
    };
    const bar = (svg, x, y, h, cls) => mk('rect', { x, y, height: h, width: 0, rx: 3, class: 'f21-yr-bar ' + (cls || '') }, svg);

    const kur = (dar) => {
      G = { dar };
      kap.innerHTML = '';
      const W = dar ? 360 : 720, H = dar ? { A: 396, B: 328, C: 420 }[st.kip] : 300;
      const svg = mk('svg', { class: 'f21-svg' + (dar ? ' dar' : ''), viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Yarıçap ile direnç arasındaki dördüncü kuvvet ilişkisi: kesitler ve göreli direnç çubukları' }, kap);
      E = { svg };
      yum.dur();
      if (st.kip === 'A') {
        const c = dar ? { cx: 180, cy: 92, r0: 60, lY: 186, eqX: 180, eqY: 222, nY: 246, bx: 20, s: 18, b1: 268, b2: 318, dpY: 368 } : { cx: 150, cy: 150, r0: 70, lY: 264, eqX: 345, eqY: 132, nY: 166, bx: 440, s: 14, b1: 94, b2: 152, dpY: 204 };
        G.c = c;
        mk('circle', { cx: c.cx, cy: c.cy, r: c.r0, class: 'f21-yr-ref' }, svg);
        E.kes = mk('circle', { cx: c.cx, cy: c.cy, r: c.r0, class: 'f21-yr-kes' }, svg);
        E.kesL = txt(svg, c.cx, c.lY, '', 'f21-lb', { 'text-anchor': 'middle' });
        const eq = txt(svg, c.eqX, c.eqY, 'R = 8ηl / π ', 'f21-mono f21-yr-eq', { 'text-anchor': 'middle' });
        const ts = mk('tspan', { class: 'f21-yr-r4' }, eq); ts.textContent = 'r⁴';
        E.num = txt(svg, c.eqX, c.nY, '', 'f21-mono f21-yr-num', { 'text-anchor': 'middle' });
        txt(svg, c.bx, c.b1 - 6, 'başlangıç', 'f21-t');
        E.b0 = bar(svg, c.bx, c.b1, 24, 'ok'); E.b0v = txt(svg, 0, c.b1 + 17, '', 'f21-mono f21-yr-bv');
        txt(svg, c.bx, c.b2 - 6, 'şimdi', 'f21-t');
        E.b1 = bar(svg, c.bx, c.b2, 24); E.b1v = txt(svg, 0, c.b2 + 17, '', 'f21-mono f21-yr-bv');
        E.dp = txt(svg, c.bx, c.dpY, '', 'f21-t');
      } else if (st.kip === 'B') {
        const c = dar ? { xs: [50, 130, 210, 290], cy: 62, k: 3.2, lY: 114, rY: 130, lx: 20, bx: 20, s: 80, b1: 168, b2: 222, cY: [272, 294, 314] } : { xs: [150, 290, 430, 570], cy: 70, k: 4, lY: 130, rY: 147, lx: 40, bx: 210, s: 110, b1: 176, b2: 222, cY: [282] };
        G.c = c;
        E.tup = c.xs.map((x, i) => {
          const g = mk('g', { class: 'f21-yr-tup', 'data-ti': i }, svg);
          mk('circle', { cx: x, cy: c.cy, r: 10, class: 'f21-yr-tdis' }, g);
          mk('circle', { cx: x, cy: c.cy, r: 8, class: 'f21-yr-tic' }, g);
          txt(g, x, c.lY, '', 'f21-mono f21-yr-tl', { 'text-anchor': 'middle' });
          txt(g, x, c.rY, '', 'f21-t f21-yr-rf', { 'text-anchor': 'middle' });
          return g;
        });
        E.l0 = txt(svg, c.lx, dar ? c.b1 - 6 : c.b1 + 16, '', 'f21-t');
        E.b0 = bar(svg, c.bx, c.b1, 22, 'ok'); E.b0v = txt(svg, 0, c.b1 + 16, '', 'f21-mono f21-yr-bv');
        E.l1 = txt(svg, c.lx, dar ? c.b2 - 6 : c.b2 + 16, '', 'f21-t');
        E.b1 = bar(svg, c.bx, c.b2, 22); E.b1v = txt(svg, 0, c.b2 + 16, '', 'f21-mono f21-yr-bv');
        if (dar) {
          txt(svg, 20, c.cY[0], 'Aynı 1 mm küçültme:', 'f21-lb');
          txt(svg, 20, c.cY[1], 'erişkinde 8,0 → 7,0 mm ×1,71', 'f21-mono f21-yr-cmp');
          txt(svg, 20, c.cY[2], 'çocukta 4,0 → 3,0 mm ×3,16', 'f21-mono f21-yr-cmp');
        } else txt(svg, 360, c.cY[0], 'Aynı 1 mm: erişkinde 8,0 → 7,0 mm ×1,71 · çocukta 4,0 → 3,0 mm ×3,16', 'f21-mono f21-yr-cmp', { 'text-anchor': 'middle' });
      } else {
        const c = dar
          ? { tx0: 20, tx1: 120, ty: 100, th: 30, fx1: 300, fy0: 22, fy1: 178, nlY: 206, hcY: 224, carpX: 306, bx: 20, s: 16, bys: [248, 296, 344], alY: 396 }
          : { tx0: 40, tx1: 220, ty: 150, th: 40, fx1: 420, fy0: 40, fy1: 260, nlY: 24, hcY: 288, carpX: 428, bx: 470, s: 13, bys: [70, 136, 202], alY: 262 };
        G.c = c;
        E.dalG = mk('g', { class: 'f21-yr-dallar' }, svg);
        mk('rect', { x: c.tx0, y: c.ty - c.th / 2, width: c.tx1 - c.tx0 + 2, height: c.th, rx: 4, class: 'f21-yr-ana' }, svg);
        txt(svg, (c.tx0 + c.tx1) / 2, c.ty + 5, 'ana tüp', 'f21-t f21-yr-anat', { 'text-anchor': 'middle' });
        E.nl = txt(svg, dar ? 180 : (c.tx1 + c.fx1) / 2, c.nlY, '', 'f21-lb', { 'text-anchor': 'middle' });
        E.hc = txt(svg, dar ? 180 : (c.tx1 + c.fx1) / 2, c.hcY, '', 'f21-t', { 'text-anchor': 'middle' });
        E.carp = txt(svg, c.carpX, c.ty + 6, '', 'f21-mono f21-yr-carp');
        const ad = ['ana tüp', 'tek dal (r/2)', ''];
        E.bl = []; E.bb = []; E.bv = [];
        c.bys.forEach((y, i) => { E.bl.push(txt(svg, c.bx, y - 6, ad[i], 'f21-t')); E.bb.push(bar(svg, c.bx, y, 20)); E.bv.push(txt(svg, 0, y + 15, '', 'f21-mono f21-yr-bv')); });
        E.al1 = txt(svg, c.bx, c.alY, 'toplam kesit alanı:', 'f21-t');
        E.al2 = txt(svg, c.bx, c.alY + 17, '', 'f21-mono f21-yr-al');
      }
      yaz(false);
    };

    const barKoy = (r, vtx, x0, s, w) => { r.setAttribute('width', Math.max(1.5, w * s).toFixed(1)); vtx.setAttribute('x', (x0 + Math.max(1.5, w * s) + 6).toFixed(1)); };
    const uygula = (c) => {
      const g = G.c;
      if (st.kip === 'A') {
        E.kes.setAttribute('r', (g.r0 * c.f).toFixed(1));
        barKoy(E.b0, E.b0v, g.bx, g.s, 1);
        barKoy(E.b1, E.b1v, g.bx, g.s, c.R);
      } else if (st.kip === 'B') {
        barKoy(E.b0, E.b0v, g.bx, g.s, 1);
        barKoy(E.b1, E.b1v, g.bx, g.s, c.R);
      } else {
        barKoy(E.bb[0], E.bv[0], g.bx, g.s, 1);
        barKoy(E.bb[1], E.bv[1], g.bx, g.s, 16);
        barKoy(E.bb[2], E.bv[2], g.bx, g.s, c.R);
      }
    };

    const yaz = (ani = true) => {
      basSec(el, 'k', st.kip);
      el.querySelectorAll('[data-kp]').forEach((d) => { d.hidden = d.dataset.kp !== st.kip; });
      const g = G.c;
      if (st.kip === 'A') {
        const f = st.p / 100, R = Math.pow(1 / f, 4), k = sonuc(R);
        $('[data-o="p"]').textContent = '%' + st.p;
        E.kesL.textContent = 'kesit · yarıçap %' + st.p;
        E.num.textContent = `(1 / ${fmt(f, 2)})⁴ = ${fmt(R, R >= 9.995 ? 1 : 2)}`;
        E.b0v.textContent = '×1,00'; E.b1v.textContent = kat(R);
        E.b1.setAttribute('class', 'f21-yr-bar ' + k);
        E.dp.textContent = 'aynı akım için gereken ΔP de ' + kat(R);
        yum.set({ f, R }, ani);
        const ek = st.p === 90 ? "yarıçaptaki %10'luk kayıp direnci yaklaşık %50 artırır" : st.p === 50 ? 'yarıçap yarıya inince direnç 16 kat artar' : st.p === 100 ? 'başlangıç tüpü' : st.p > 100 ? 'yarıçap biraz artınca direnç belirgin düşer' : 'küçük yarıçap kaybı, büyük direnç artışı';
        cap.yaz(`<b>Yarıçap %${st.p}: direnç ${kat(R)}.</b> Direnç yarıçapın dördüncü kuvvetiyle ters orantılıdır: ${ek}. Aynı akımı sürdürmek için gereken basınç farkı da aynı oranda artar (ΔP = Q̇ × R). [[K1 s. 89]]`);
      } else if (st.kip === 'B') {
        const T = ETT[st.grup], x = st.ett[st.grup], R = Math.pow(T.ref / x, 4), k = sonuc(R);
        basSec(el, 'grup', st.grup);
        if (!$('.f21-ettseg').firstChild || $('.f21-ettseg').dataset.g !== st.grup) { ettSeg(); $('.f21-ettseg').dataset.g = st.grup; }
        basSec(el, 'ett', x);
        E.tup.forEach((t, i) => {
          const b = T.boy[i], rr = b * g.k, sec = b === x;
          t.classList.toggle('sec', sec);
          t.children[0].setAttribute('r', (rr + (G.dar ? 3 : 4)).toFixed(1));
          t.children[1].setAttribute('r', rr.toFixed(1));
          t.children[2].textContent = mm(b) + ' mm';
          t.children[3].textContent = b === T.ref ? 'başvuru' : '';
        });
        E.l0.textContent = `başvuru · ${mm(T.ref)} mm`; E.l1.textContent = `seçili · ${mm(x)} mm`;
        E.b0v.textContent = '×1,00'; E.b1v.textContent = kat(R);
        E.b1.setAttribute('class', 'f21-yr-bar ' + k);
        yum.set({ R }, ani);
        const son = st.grup === 'cocuk'
          ? 'ETT yarıçapı küçük çocuklarda bu yüzden özellikle önemlidir: artmış solunum işi nedeniyle entübe çocuklara çoğu zaman spontan soluma izni verilmez. [[K1 s. 91]]'
          : 'Kritik hastaların, ventilatörden ayırmada direnç olabildiğince düşük olsun diye olabildiğince geniş tüple entübe edilmesinin nedeni budur. [[K1 s. 91]]';
        cap.yaz(`<b>ETT iç çapı ${mm(x)} mm: ${mm(T.ref)} mm'lik tüpe göre direnç ${kat(R)}.</b> Küçük tüpte aynı milimetre, yarıçapın çok daha büyük bir oranıdır. ${son}`);
      } else {
        const N = NLER[st.ni], R = 16 / N, k = sonuc(R), cizN = Math.min(N, 16), w = Math.max(2, (G.dar ? 15 : 20) * Math.min(1, 8 / N));
        $('[data-o="N"]').textContent = String(N);
        E.dalG.innerHTML = '';
        for (let i = 0; i < cizN; i++) {
          const ye = cizN === 1 ? g.ty : g.fy0 + i * (g.fy1 - g.fy0) / (cizN - 1), mx = (g.tx1 + g.fx1) / 2;
          mk('path', { d: `M${g.tx1 - 2} ${g.ty} C${mx - 10} ${g.ty} ${mx + 10} ${ye} ${g.fx1} ${ye}`, class: 'f21-yr-dal', 'stroke-width': w.toFixed(1) }, E.dalG);
        }
        E.nl.textContent = `N = ${N} dal, her biri r/2`;
        E.hc.textContent = N > 16 ? `her çizgi ${N / 16} dal` : '';
        E.carp.textContent = N > 16 ? '×' + N / 16 : '';
        E.bl[2].textContent = `${N} dal birlikte`;
        E.bv[0].textContent = '×1'; E.bv[1].textContent = '×16'; E.bv[2].textContent = '×' + kisa(R);
        E.bb[0].setAttribute('class', 'f21-yr-bar ok'); E.bb[1].setAttribute('class', 'f21-yr-bar crit'); E.bb[2].setAttribute('class', 'f21-yr-bar ' + k);
        E.al2.textContent = 'ana tüpün ×' + kisa(N / 4);
        yum.set({ R }, ani);
        cap.yaz(`<b>${N} paralel dal: toplam direnç ×${kisa(R)}.</b> Her dal tek başına ana tüpten 16 kat dirençlidir, ama dallar paraleldir ve toplam kesit alanı büyür. Terminal bronşiyoller tek tek en dar hava yollarıdır; çok sayıda ve paralel oldukları için toplam kesit alanları çok büyüktür ve direncin esas yeri değildir. Direnç esas olarak lober ile subsegmental bronşlar arasında oluşur. [[K1 s. 89]]`);
      }
    };

    el.addEventListener('click', (e) => {
      const kb = e.target.closest('[data-k]'), gb = e.target.closest('[data-grup]'), tb = e.target.closest('[data-ett]'), tu = e.target.closest('.f21-yr-tup');
      if (kb) { if (st.kip !== kb.dataset.k) { st.kip = kb.dataset.k; kur(G.dar); } }
      else if (gb) { if (st.grup !== gb.dataset.grup) { st.grup = gb.dataset.grup; yaz(true); } }
      else if (tb) { st.ett[st.grup] = +tb.dataset.ett; yaz(); }
      else if (tu) { st.ett[st.grup] = ETT[st.grup].boy[+tu.dataset.ti]; yaz(); }
    });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      st[r.dataset.r] = +r.value; yaz();
    });
    const birak = genislik(el, kur);
    return () => { yum.dur(); birak(); };
  };

  /* ================= 3 · Radyal çekim ve dinamik hava yolu kompresyonu ================= */
  VIZ.f21_cekim = (el) => {
    const cap = capOf(el);
    const DUR = [
      { id: 'insp', ad: 'İnspirasyon', v: 0.6, z: 0, k: 0, c: '<b>İnspirasyon: yarıçap ×1,15, direnç ×0,57.</b> Akciğer genişlerken parankimin radyal çekimi küçük hava yolunu dışa doğru açar; yarıçap artar, direnç düşer. [[K1 s. 89]]' },
      { id: 'eksp', ad: 'Ekspirasyon', v: 0.4, z: 0, k: 0, c: '<b>Ekspirasyon sonu (FRC): yarıçap ×1,00, direnç ×1,00, inspirasyon sonundakinin ≈1,75 katı.</b> Hacim azalınca radyal çekim azalır, yarıçap küçülür ve direnç artar. Astım ve KOAH hastalarının ekspirasyonda inspirasyondan daha çok zorlanmasının bir nedeni budur. [[K1 s. 89]]' },
      { id: 'zorlu', ad: 'Zorlu ekspirasyon', v: 0.4, z: 1, k: 0, c: '<b>Zorlu ekspirasyon: bronşiyol ×0,73, direnç ×3,5; kıkırdaklı bronş açık.</b> Ekspiratuvar kaslar intraplevral basıncı pozitif yapar; kıkırdak desteği olmayan hava yolları, özellikle bronşiyoller, sıkışır: dinamik hava yolu kompresyonu. [[K1 s. 89–90]]' },
      { id: 'koah', ad: 'KOAH + zorlu eksp.', v: 0.4, z: 1, k: 1, c: '<b>KOAH + zorlu ekspirasyon: yarıçap ×0,49, direnç ≈ ×17.</b> Destekleyici elastik doku yıkıldığı için radyal çekim zayıftır; aynı pozitif basınç hava yolunu çok daha fazla daraltır. KOAH hastaları dinamik kompresyona özellikle yatkındır. [[K1 s. 90]]' },
      { id: 'anes', ad: 'Anestezi: düşük hacim', v: 0.2, z: 0, k: 0, c: "<b>Genel anestezi: düşük akciğer hacmi, direnç ×1,9.</b> Solunum kası tonusunun kaybı, sırtüstü pozisyon ve fizyolojik PEEP'in kaybı akciğer hacmini düşürür; radyal çekim azalır, hava yolu direnci artar. [[K1 s. 91]]" },
      { id: 'peep', ad: '+ PEEP', v: 0.4, z: 0, k: 0, c: '<b>Ekstrinsik PEEP: hacim geri gelir, direnç ×1,0.</b> PEEP akciğer hacmini artırır; radyal çekim hava yolu yarıçapını büyütür ve direnç azalır. [[K1 s. 91]]' },
    ];
    const TIDAL = '<b>Sakin tidal solunum.</b> İnspirasyonda akciğer hacmi artar ve parankimin radyal çekimi küçük hava yolunu açar; ekspirasyonda hacim azalır, yarıçap küçülür ve direnç artar. Kıkırdaklı bronş hacimden etkilenmez. [[K1 s. 89]]';
    const st = { d: 'eksp', v: 0.4, z: 0, k: 0, oyna: false, t: 0 };
    const model = (v, z, k) => { const T = lerp(1, 0.35, k); let r = 0.7 + 0.75 * T * v; r *= 1 - 0.45 * z * (1 - T * v); return Math.max(0.25, r); };
    el.innerHTML = `<div class="f21-ust">
        <div class="f21-grup"><span class="f21-gl">Durum</span>${segHtml('Durum', 'd', DUR.map((d) => [d.id, d.ad]), st.d)}</div>
        <div class="f21-cek-ctl">
          <div class="f21-rng f21-hacim"><label for="f21-hacim-r"><span>Akciğer hacmi <output data-o="v"></output></span></label>
            <input id="f21-hacim-r" type="range" min="0" max="100" step="1" value="40" data-r="v">
            <div class="f21-hacim-et" aria-hidden="true"><span><i class="u">düşük (RV'ye yakın)</i><i class="k">RV'ye yakın</i></span><span style="left:40%">FRC</span><span><i class="u">yüksek (TLC'ye yakın)</i><i class="k">TLC'ye yakın</i></span></div></div>
          <div class="btn-row">
            <button type="button" class="btn ghost f21-tg" data-t="z" aria-pressed="false">Zorlu ekspirasyon</button>
            <button type="button" class="btn ghost f21-tg" data-t="k" aria-pressed="false">KOAH: elastik doku kaybı</button>
            ${RM ? '' : '<button type="button" class="btn ghost" data-a="oyna" aria-pressed="false">Oynat</button>'}
          </div>
        </div>
      </div>
      <div class="f21-svgk"></div>`;
    const $ = (s) => el.querySelector(s);
    const kap = $('.f21-svgk'), rng = $('[data-r="v"]');
    let G = null, E = {};
    const D = { v: st.v, z: st.z, k: st.k }; // ekranda gösterilen (yumuşatılmış)

    const kur = (dar) => {
      G = dar
        ? { dar, W: 360, H: 642, L: { cx: 180, cy: 210, tY: 20, ring: 82, ringV: 12, ra: 12, raV: 6, rk: 20, rkV: 6, lum: 36, wall: 7, okA: 146, okB: 124, rdY: 372, rd2: 390 }, B: { cx: 180, cy: 520, tY: 418, lum: 42, kik: 7, kikW: 8, okA: 90, okB: 68, rdY: 630 }, etX: 12, etY: [44, 60] }
        : { dar, W: 720, H: 408, L: { cx: 222, cy: 208, tY: 22, ring: 100, ringV: 14, ra: 15, raV: 7, rk: 24, rkV: 7, lum: 46, wall: 8, okA: 162, okB: 141, rdY: 382, rd2: 400 }, B: { cx: 560, cy: 208, tY: 22, lum: 60, kik: 8, kikW: 10, okA: 120, okB: 96, rdY: 382 }, etX: 20, etY: [46, 62] };
      kap.innerHTML = '';
      const svg = mk('svg', { class: 'f21-svg' + (dar ? ' dar' : ''), viewBox: `0 0 ${G.W} ${G.H}`, role: 'img', 'aria-label': 'Solda alveollerle çevrili kıkırdaksız bronşiyolün kesiti ve radyal çekim lifleri, sağda kıkırdak destekli büyük bronşun kesiti' }, kap);
      E = { svg };
      const L = G.L, B = G.B;
      // sol panel
      txt(svg, L.cx, L.tY, 'Küçük hava yolu · bronşiyol (kıkırdaksız)', 'f21-baslik', { 'text-anchor': 'middle' });
      E.lCek = txt(svg, G.etX, G.etY[0], 'radyal çekim', 'f21-t f21-ck-lc');
      E.lKoah = txt(svg, G.etX, G.etY[1], 'elastik doku kaybı', 'f21-t f21-ck-lk');
      E.lBas = txt(svg, dar ? 344 : 404, G.etY[0], 'pozitif intraplevral basınç', 'f21-t f21-ck-lp', { 'text-anchor': 'end' });
      E.alvK = Array.from({ length: 12 }, () => mk('circle', { class: 'f21-ck-alv' }, svg));
      E.alvB = Array.from({ length: 6 }, () => mk('circle', { class: 'f21-ck-alv' }, svg));
      E.lif = Array.from({ length: 8 }, () => mk('path', { class: 'f21-ck-lif' }, svg));
      E.kop = Array.from({ length: 8 }, () => mk('path', { class: 'f21-ck-kop' }, svg));
      E.duvar = mk('circle', { cx: L.cx, cy: L.cy, class: 'f21-ck-duvar' }, svg);
      E.lumen = mk('circle', { cx: L.cx, cy: L.cy, class: 'f21-ck-lumen' }, svg);
      E.okL = mk('g', { class: 'f21-ck-oklar' }, svg);
      E.okB = mk('g', { class: 'f21-ck-oklar' }, svg);
      const oklar = (g, cx, cy, a, b) => { for (let i = 0; i < 8; i++) { const t = (i * 45 + 22.5) * Math.PI / 180, c = Math.cos(t), s = Math.sin(t); mk('line', { x1: cx + a * c, y1: cy + a * s, x2: cx + (b + 7) * c, y2: cy + (b + 7) * s }, g); const q = (r, o) => `${(cx + r * c - o * s).toFixed(1)},${(cy + r * s + o * c).toFixed(1)}`; mk('polygon', { points: `${q(b, 0)} ${q(b + 9, 4.5)} ${q(b + 9, -4.5)}` }, g); } };
      oklar(E.okL, L.cx, L.cy, L.okA, L.okB);
      E.rdL = txt(svg, L.cx, L.rdY, '', 'f21-mono f21-ck-rd', { 'text-anchor': 'middle' });
      E.rd2 = txt(svg, L.cx, L.rd2, '', 'f21-t f21-ck-rd2', { 'text-anchor': 'middle' });
      // hacim göstergesi (geniş)
      if (!dar) {
        const gy0 = 100, gy1 = 340;
        G.gauge = { gy0, gy1 };
        txt(svg, 38, gy0 - 10, 'hacim', 'f21-t', { 'text-anchor': 'middle' });
        mk('rect', { x: 32, y: gy0, width: 12, height: gy1 - gy0, rx: 3, class: 'f21-ck-gz' }, svg);
        E.gDol = mk('rect', { x: 32, width: 12, rx: 3, class: 'f21-ck-gd' }, svg);
        const fy = gy1 - 0.4 * (gy1 - gy0);
        mk('line', { x1: 28, x2: 48, y1: fy, y2: fy, class: 'f21-ck-gfrc' }, svg);
        txt(svg, 52, fy + 4, 'FRC', 'f21-t');
      }
      // sağ panel / alt panel: büyük bronş
      txt(svg, B.cx, B.tY, 'Büyük bronş · kıkırdak destekli', 'f21-baslik', { 'text-anchor': 'middle' });
      const rk = B.lum + B.kik;
      E.bDuvar = mk('circle', { cx: B.cx, cy: B.cy, r: rk + B.kikW / 2, class: 'f21-ck-duvar' }, svg);
      const a0 = 120 * Math.PI / 180, a1 = 60 * Math.PI / 180;
      mk('path', { d: `M${B.cx + rk * Math.cos(a0)} ${B.cy + rk * Math.sin(a0)} A${rk} ${rk} 0 1 1 ${B.cx + rk * Math.cos(a1)} ${B.cy + rk * Math.sin(a1)}`, class: 'f21-ck-kik', 'stroke-width': B.kikW }, svg);
      E.bLumen = mk('path', { class: 'f21-ck-lumen' }, svg);
      E.bMem = mk('path', { class: 'f21-ck-mem' }, svg);
      oklar(E.okB, B.cx, B.cy, B.okA, B.okB);
      const mx = B.cx + rk * 0.5 + 22, my = B.cy + rk + 4;
      mk('line', { x1: mx - 4, y1: my - 4, x2: B.cx + 8, y2: B.cy + B.lum + 1, class: 'f21-ck-memc' }, svg);
      txt(svg, mx, my, 'membranöz duvar', 'f21-t f21-ck-memt');
      E.rdB = txt(svg, B.cx, B.rdY, '', 'f21-mono f21-ck-rd', { 'text-anchor': 'middle' });
      ciz();
      yaz();
    };

    const ciz = () => {
      if (!G) return;
      const L = G.L, B = G.B, { v, z, k } = D, T = lerp(1, 0.35, k), r = model(v, z, k);
      const rl = L.lum * r, ring = L.ring + L.ringV * v;
      E.lumen.setAttribute('r', rl.toFixed(1));
      E.duvar.setAttribute('r', (rl + L.wall).toFixed(1));
      const ra = L.ra + L.raV * v, rb = L.rk + L.rkV * v;
      E.alvK.forEach((c, i) => { const t = (i * 30 + 15) * Math.PI / 180; c.setAttribute('cx', (L.cx + ring * Math.cos(t)).toFixed(1)); c.setAttribute('cy', (L.cy + ring * Math.sin(t)).toFixed(1)); c.setAttribute('r', ra.toFixed(1)); c.setAttribute('opacity', (1 - k).toFixed(2)); });
      E.alvB.forEach((c, i) => { const t = (i * 60 + 30) * Math.PI / 180; c.setAttribute('cx', (L.cx + ring * Math.cos(t)).toFixed(1)); c.setAttribute('cy', (L.cy + ring * Math.sin(t)).toFixed(1)); c.setAttribute('r', rb.toFixed(1)); c.setAttribute('opacity', k.toFixed(2)); });
      // lifler: duvar dış kenarından alveol halkasına; gerildikçe (T·v) zikzak düzleşir
      const a = rl + L.wall, b = ring - lerp(ra, rb, k) * 0.75, amp = (G.dar ? 5 : 6.5) * (1 - 0.85 * clamp(T * v, 0, 1)), n = 7;
      const KOPUK = [0, 1, 3, 5, 6];
      E.lif.forEach((p, i) => {
        const t = i * 45 * Math.PI / 180, c = Math.cos(t), s = Math.sin(t), pts = [];
        for (let j = 0; j <= n; j++) { const rr = lerp(a, b, j / n), o = j === 0 || j === n ? 0 : (j % 2 ? amp : -amp); pts.push([L.cx + rr * c - o * s, L.cy + rr * s + o * c]); }
        p.setAttribute('d', yolD(pts));
        const kop = KOPUK.includes(i);
        p.setAttribute('opacity', kop ? (1 - k).toFixed(2) : '1');
        const q = E.kop[i];
        if (kop && k > 0.01) {
          const m = (a + b) / 2, h1 = [[L.cx + a * c, L.cy + a * s], [L.cx + (m - 6) * c, L.cy + (m - 6) * s]], h2 = [[L.cx + (m + 6) * c, L.cy + (m + 6) * s], [L.cx + b * c, L.cy + b * s]];
          q.setAttribute('d', yolD(h1) + ' ' + yolD(h2)); q.setAttribute('opacity', (0.55 * k).toFixed(2));
        } else q.setAttribute('opacity', 0);
      });
      E.okL.setAttribute('opacity', z.toFixed(2)); E.okB.setAttribute('opacity', z.toFixed(2));
      E.lBas.setAttribute('opacity', z.toFixed(2));
      E.lKoah.setAttribute('opacity', k.toFixed(2));
      // büyük bronş: kıkırdak lümeni açık tutar; zorlu ekspirasyonda yalnız membranöz duvar içe kavislenir
      const rbB = 1 - 0.05 * z, rlB = B.lum * rbB, a0 = 120 * Math.PI / 180, a1 = 60 * Math.PI / 180;
      const p0 = [B.cx + rlB * Math.cos(a0), B.cy + rlB * Math.sin(a0)], p1 = [B.cx + rlB * Math.cos(a1), B.cy + rlB * Math.sin(a1)];
      const kirisY = B.cy + rlB * Math.sin(a1), sapma = lerp(rlB * (1 - Math.sin(a1)), -6, z), kontY = kirisY + 2 * sapma;
      E.bLumen.setAttribute('d', `M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A${rlB.toFixed(1)} ${rlB.toFixed(1)} 0 1 1 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} Q${B.cx} ${kontY.toFixed(1)} ${p0[0].toFixed(1)} ${p0[1].toFixed(1)}Z`);
      E.bMem.setAttribute('d', `M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} Q${B.cx} ${kontY.toFixed(1)} ${p0[0].toFixed(1)} ${p0[1].toFixed(1)}`);
      if (E.gDol) { const { gy0, gy1 } = G.gauge, h = v * (gy1 - gy0); E.gDol.setAttribute('y', (gy1 - h).toFixed(1)); E.gDol.setAttribute('height', h.toFixed(1)); }
    };

    const yaz = () => {
      const r = model(st.v, st.z, st.k), R = 1 / Math.pow(r, 4), rb = st.z ? 0.95 : 1, Rb = 1 / Math.pow(rb, 4);
      $('[data-o="v"]').textContent = '%' + Math.round(st.v * 100);
      basSec(el, 'd', st.d);
      el.querySelectorAll('[data-t]').forEach((b) => b.setAttribute('aria-pressed', String(!!st[b.dataset.t])));
      const ob = $('[data-a="oyna"]'); if (ob) { ob.textContent = st.oyna ? 'Durdur' : 'Oynat'; ob.setAttribute('aria-pressed', String(st.oyna)); }
      if (E.rdL) {
        E.rdL.innerHTML = '';
        const t1 = mk('tspan', {}, E.rdL); t1.textContent = `yarıçap ×${fmt(r, 2)} · `;
        const t2 = mk('tspan', { class: sonuc(R) }, E.rdL); t2.textContent = 'direnç ' + kat(R);
        E.rd2.textContent = r < 0.5 ? 'kapanmaya yakın' : '';
        E.rdB.innerHTML = '';
        const u1 = mk('tspan', {}, E.rdB); u1.textContent = `yarıçap ×${fmt(rb, 2)} · `;
        const u2 = mk('tspan', { class: sonuc(Rb) }, E.rdB); u2.textContent = 'direnç ' + kat(Rb);
      }
      if (st.oyna) cap.yaz(TIDAL);
      else {
        const d = DUR.find((q) => q.id === st.d);
        cap.yaz(d ? d.c : `<b>Akciğer hacmi %${Math.round(st.v * 100)}${st.z ? ', zorlu ekspirasyon' : ''}${st.k ? ', KOAH' : ''}: bronşiyol yarıçapı ×${fmt(r, 2)}, direnç ${kat(R)}.</b> Hacim arttıkça radyal çekim hava yolunu açar; zorlu ekspirasyonda pozitif intraplevral basınç kıkırdaksız hava yolunu sıkıştırır; KOAH'ta çekim zayıftır. [[K1 s. 89–90]]`);
      }
      if (RM) { Object.assign(D, { v: st.v, z: st.z, k: st.k }); ciz(); }
    };

    const durdur = () => { if (st.oyna) { st.oyna = false; } };
    el.addEventListener('click', (e) => {
      const db = e.target.closest('[data-d]'), tb = e.target.closest('[data-t]'), ob = e.target.closest('[data-a="oyna"]');
      if (db) { const d = DUR.find((q) => q.id === db.dataset.d); durdur(); Object.assign(st, { d: d.id, v: d.v, z: d.z, k: d.k }); rng.value = Math.round(d.v * 100); yaz(); }
      else if (tb) { durdur(); st[tb.dataset.t] = st[tb.dataset.t] ? 0 : 1; st.d = null; yaz(); }
      else if (ob) {
        if (st.oyna) { st.oyna = false; }
        else { st.oyna = true; st.z = 0; st.d = null; st.t = Math.acos(clamp((0.5 - st.v) / 0.1, -1, 1)) / (2 * Math.PI) * 4; }
        yaz();
      }
    });
    el.addEventListener('input', (e) => { if (e.target !== rng) return; durdur(); st.v = +rng.value / 100; st.d = null; yaz(); });
    const adim = (dt) => {
      if (st.oyna) {
        st.t += dt;
        st.v = 0.5 - 0.1 * Math.cos(2 * Math.PI * st.t / 4); // 4 s'lik tidal döngü: FRC 0,40 → 0,60 → 0,40
        const yeni = Math.round(st.v * 100);
        if (+rng.value !== yeni) { rng.value = yeni; yaz(); }
      }
      const once = D.v + D.z + D.k;
      D.v = yak(D.v, st.v, dt, st.oyna ? 0.05 : 0.15); D.z = yak(D.z, st.z, dt, 0.15); D.k = yak(D.k, st.k, dt, 0.15);
      if (Math.abs(D.v + D.z + D.k - once) > 1e-4) ciz();
    };
    const birak = genislik(el, kur);
    const dur = RM ? () => {} : ticker(el, adim);
    return () => { dur(); birak(); };
  };

  /* ================= ortak basınç–hacim modeli (4 ve 5) =================
     v: FRC üstü hacim (L), u = v / VT. P_d ideal diyagonal; P_i inspirasyon; P_e ekspirasyon (cmH₂O). */
  const VT = 0.5, J = 98.0665; // 1 cmH₂O·L = 98,0665 mJ
  const PV = {
    Pd: (v, C) => -5 - v / C,
    Pi: (v, C, R) => -5 - v / C - R * 1.06 * Math.sin(Math.PI * v / VT),
    Pe: (v, C, R) => { const u = v / VT; return -5 - v / C + R * 0.8 * 6.75 * u * u * (1 - u); },
    X: (C) => (VT * VT) / (2 * C), Y: (R) => R * 1.06 * VT * 2 / Math.PI, Z: (R) => R * 0.8 * VT * 0.5625,
    A: (C, R) => { let a = 0; const N = 200; for (let i = 0; i < N; i++) { const v = (i + 0.5) / N * VT; a += Math.max(0, PV.Pe(v, C, R) + 5) * VT / N; } return a; },
    Rk: (C) => 0.3704 / C,
  };
  const eksen = (svg, G, x, y, dar, etiketler) => {
    mk('line', { x1: G.ax0, x2: G.ax1, y1: G.axY, y2: G.axY, class: 'f21-eksen' }, svg);
    mk('line', { x1: G.ax0, x2: G.ax0, y1: G.axY, y2: y(VT) - 14, class: 'f21-eksen' }, svg);
    for (let P = G.pMin; P >= G.pMax; P--) {
      const xx = x(P), et = etiketler.includes(P);
      mk('line', { x1: xx, x2: xx, y1: G.axY, y2: G.axY + (et ? 6 : 3), class: 'f21-eksen' }, svg);
      if (et) txt(svg, xx, G.axY + 20, fmt(P, 0), 'f21-t f21-tk', { 'text-anchor': 'middle' });
    }
    if (dar) { // dar ekranda tek satır sığmıyor: iki satır
      txt(svg, (G.ax0 + G.ax1) / 2, G.axY + 38, 'İntraplevral basınç (cmH₂O),', 'f21-t f21-eksad', { 'text-anchor': 'middle' });
      txt(svg, (G.ax0 + G.ax1) / 2, G.axY + 54, 'sağa: daha negatif', 'f21-t f21-eksad', { 'text-anchor': 'middle' });
    } else txt(svg, (G.ax0 + G.ax1) / 2, G.axY + 40, 'İntraplevral basınç (cmH₂O) · sağa doğru daha negatif', 'f21-t f21-eksad', { 'text-anchor': 'middle' });
    txt(svg, G.ax0 - 6, y(0) + 4, 'FRC', 'f21-t f21-eksad', { 'text-anchor': 'end' });
    txt(svg, G.ax0 - 6, y(VT) + 1, 'FRC', 'f21-t f21-eksad', { 'text-anchor': 'end' });
    txt(svg, G.ax0 - 6, y(VT) + 15, '+ VT', 'f21-t f21-eksad', { 'text-anchor': 'end' });
    if (!dar) txt(svg, G.yadX, (y(0) + y(VT)) / 2, 'Akciğer hacmi', 'f21-t f21-eksad', { 'text-anchor': 'middle', transform: `rotate(-90 ${G.yadX} ${(y(0) + y(VT)) / 2})` });
  };
  const tarama = (svg, id, cls) => {
    const defs = mk('defs', {}, svg);
    const p = mk('pattern', { id, width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    mk('line', { x1: 0, y1: 0, x2: 0, y2: 6, class: cls }, p);
  };
  const ornek = (f, n = 60) => Array.from({ length: n + 1 }, (_, i) => { const v = i / n * VT; return [v, f(v)]; });

  /* ================= 4 · Bir soluğun işi: halkayı adım adım okuyun ================= */
  VIZ.f21_halka = (el) => {
    const cap = capOf(el);
    const C = 0.2, R = 1;
    const mJ = { X: PV.X(C) * J, Y: PV.Y(R) * J, Z: PV.Z(R) * J };
    mJ.U = mJ.X - mJ.Z; mJ.kas = mJ.X + mJ.Y;
    const r0 = (x) => String(Math.round(x));
    const ADIM = [
      "<b>1 · İdeal akciğer.</b> Kesikli diyagonal, direnç kuvvetleri olmasaydı inspirasyonun izleyeceği yoldur: intraplevral basınç −5 cmH₂O'dan, 0,5 L'lik VT'ye ulaşınca −7,5 cmH₂O'ya iner. Eğimi kompliyanstır (0,2 L/cmH₂O). [[K1 s. 27, 82, 90]]",
      '<b>2 · Gerçek inspirasyon.</b> Hava yolu ve doku direnci yüzünden intraplevral basınç diyagonalden daha negatif olur (en çok ≈ −7,6 cmH₂O). Gerçek eğrinin diyagonalden sapması, akciğerin şişmesine karşı ne kadar direnç olduğunu gösterir. [[K1 s. 27, 90]]',
      `<b>3 · X: elastik iş, ${r0(mJ.X)} mJ.</b> Üçgen alan elastik kuvvetlere karşı yapılan iştir; ısıya dönüşmez, potansiyel enerji olarak depolanır. [[K1 s. 90]]`,
      `<b>4 · Y: inspiratuvar rezistif iş, ${r0(mJ.Y)} mJ.</b> Kalan alan sürtünmeye harcanır ve ısı olarak dağılır. İnspirasyonda kasların toplam işi ${r0(mJ.kas)} mJ; bunun ≈%65'i elastiktir. [[K1 s. 88, 90]]`,
      `<b>5 · Ekspirasyon ve Z, ${r0(mJ.Z)} mJ.</b> Depolanan X enerjisi geri verilir ve ekspirasyonun rezistif işi Z bu enerjiden karşılanır. Z, X'in içinde kaldığı için ekspirasyon pasiftir: kas çabası gerekmez. [[K1 s. 90]]`,
      `<b>6 · Döngünün sonu.</b> Ekspirasyonda kullanılmayan potansiyel enerji (≈${r0(mJ.U)} mJ) ısı olarak boşa gider. İki eğri arasındaki halka alanı (Y + Z ≈ ${r0(mJ.Y + mJ.Z)} mJ) dirence harcanan enerjidir. Soluğun sonunda kasların yaptığı işin tamamı (${r0(mJ.kas)} mJ) ısıya dönüşmüş olur. [[K1 s. 90]]`,
    ];
    const st = { adim: RM ? 6 : 1, oyna: false, oT: 0, an: null, vurgu: 0 };
    el.innerHTML = `<div class="f21-ust f21-adimlar">
        <div class="btn-row">
          <button type="button" class="btn ghost" data-a="geri" aria-label="Geri"><span aria-hidden="true">◀</span><span class="f21-bt"> Geri</span></button>
          <button type="button" class="btn" data-a="ileri" aria-label="İleri"><span class="f21-bt">İleri </span><span aria-hidden="true">▶</span></button>
          <button type="button" class="btn ghost" data-a="bas">Baştan</button>
          ${RM ? '' : '<button type="button" class="btn ghost" data-a="oyna" aria-pressed="false">Oynat</button>'}
        </div>
        <span class="f21-sayac" aria-live="polite"></span>
      </div>
      <div class="f21-svgk"></div>`;
    const $ = (s) => el.querySelector(s);
    const kap = $('.f21-svgk');
    let G = null, E = {};
    const BAR = { kX: 0, kY: 0, iY: 0, iZ: 0, iU: 0 }; // gösterilen dilim kesirleri (0–1)

    const kur = (dar) => {
      G = dar
        ? { dar, W: 360, H: 488, ax0: 50, ax1: 330, axY: 312, pMin: -4, pMax: -8, kx: 70, vy0: 300, ky: 480, yadX: 0 }
        : { dar, W: 720, H: 400, ax0: 90, ax1: 450, axY: 352, pMin: -4, pMax: -8, kx: 90, vy0: 340, ky: 540, yadX: 24 };
      const x = (P) => G.ax0 + (-4 - P) * G.kx, y = (v) => G.vy0 - G.ky * v;
      G.x = x; G.y = y;
      kap.innerHTML = '';
      const svg = mk('svg', { class: 'f21-svg' + (dar ? ' dar' : ''), viewBox: `0 0 ${G.W} ${G.H}`, role: 'img', 'aria-label': 'Bir tidal soluğun intraplevral basınç–hacim halkası: ideal diyagonal, inspirasyon ve ekspirasyon eğrileri, X, Y ve Z alanları ve enerji çubukları' }, kap);
      E = { svg };
      tarama(svg, 'f21-tarama-h', 'f21-tarama-c warn');
      eksen(svg, G, x, y, dar, [-4, -5, -6, -7, -8]);
      mk('line', { x1: x(-5), x2: x(-5), y1: y(0), y2: y(VT) - 10, class: 'f21-yard' }, svg);
      // alanlar
      const pi = ornek((v) => PV.Pi(v, C, R)), pe = ornek((v) => PV.Pe(v, C, R)), pd = ornek((v) => PV.Pd(v, C));
      G.pi = pi.map(([v, P]) => [x(P), y(v)]); G.pe = pe.map(([v, P]) => [x(P), y(v)]); G.pd = pd.map(([v, P]) => [x(P), y(v)]);
      E.X = mk('path', { d: yolD([[x(-5), y(0)], [x(-5), y(VT)], [x(PV.Pd(VT, C)), y(VT)]]) + 'Z', class: 'f21-alan x' }, svg);
      E.Y = mk('path', { class: 'f21-alan y' }, svg);
      E.Z = mk('path', { class: 'f21-alan z' }, svg);
      E.U = mk('path', { d: yolD([[x(-5), y(0)], [x(-5), y(VT)]].concat(G.pe.slice().reverse())) + 'Z', class: 'f21-alan u', fill: 'url(#f21-tarama-h)' }, svg);
      // çizgiler
      E.diag = mk('line', { x1: x(-5), y1: y(0), x2: x(PV.Pd(VT, C)), y2: y(VT), class: 'f21-diag' }, svg);
      E.pi = mk('path', { class: 'f21-egri' }, svg);
      E.pe = mk('path', { class: 'f21-egri' }, svg);
      E.piOk = okBasi(svg, G.pi, 36, 'f21-okb');
      E.peOk = okBasi(svg, G.pe.slice().reverse(), 30, 'f21-okb');
      mk('circle', { cx: x(-5), cy: y(0), r: 4, class: 'f21-nokta' }, svg);
      mk('circle', { cx: x(PV.Pd(VT, C)), cy: y(VT), r: 4, class: 'f21-nokta' }, svg);
      // etiketler
      const dx = x(PV.Pd(VT, C)) - x(-5), dy = y(VT) - y(0), len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len, aci = Math.atan2(dy, dx) * 180 / Math.PI;
      const ideal = (t, off, s, cls) => { const px = x(-5) + ux * len * t + uy * off, py = y(0) + uy * len * t - ux * off; return txt(svg, px.toFixed(1), py.toFixed(1), s, cls, { transform: `rotate(${aci.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})` }); };
      E.idl = ideal(0.1, -14, dar ? 'ideal · eğim = C' : 'ideal akciğer · eğim = C 0,2 L/cmH₂O', 'f21-t f21-idl f21-halo');
      // insp. etiketi: eğrinin sağında, alt bölümde (halkanın dışında)
      const yi = y(0.075), xi = x(PV.Pi(0.11, C, R)) + 6;
      E.piL = txt(svg, xi, yi + 4, 'inspirasyon', 'f21-t f21-egrl f21-halo');
      E.peL = txt(svg, x(PV.Pe(0.16, C, R)) - 8, y(0.16) + 4, 'ekspirasyon', 'f21-t f21-egrl f21-halo', { 'text-anchor': 'end' });
      const harf = (s, P, v, cls, alt) => { const g = mk('g', { class: 'f21-harf ' + cls }, svg); txt(g, x(P), y(v) + 7, s, 'f21-harfT f21-halo', { 'text-anchor': 'middle' }); if (alt && !dar) alt.forEach((a, i) => txt(g, x(P) + 14, y(v) - 4 + i * 13, a, 'f21-t f21-harfA f21-halo')); return g; };
      E.hX = harf('X', -5.25, 0.44, 'x', ['elastik,', 'depolanır']);
      const vy = 0.28;
      E.hY = harf('Y', (PV.Pd(vy, C) + PV.Pi(vy, C, R)) / 2, vy, 'y');
      E.hZ = harf('Z', (PV.Pd(vy, C) + PV.Pe(vy, C, R)) / 2, vy, 'z');
      E.uL = txt(svg, x(-5) + 6, y(dar ? 0.475 : 0.489) + 4, 'kullanılmayan → ısı', 'f21-t f21-uL f21-halo');
      // rozetler (grafiğin üstü)
      const rozet = (x0, y0, s, cls) => {
        const g = mk('g', { class: 'f21-rozet ' + cls }, svg), r = mk('rect', { x: x0, y: y0, height: 20, rx: 10 }, g), t = txt(g, x0 + 9, y0 + 14, s, 'f21-rozetT');
        let w = 0; try { w = t.getComputedTextLength(); } catch (e) { /* çizilmemiş */ }
        r.setAttribute('width', ((w || s.length * 6.6) + 18).toFixed(1));
        return g;
      };
      E.r1 = rozet(dar ? 6 : G.ax0 + 6, dar ? 2 : 14, "Z, X'in içinde → pasif", 'ok');
      E.r2 = rozet(dar ? 6 : G.ax0 + 186, dar ? 26 : 14, `halka alanı Y + Z ≈ ${r0(mJ.Y + mJ.Z)} mJ`, 'acc');
      E.dot = mk('circle', { r: 6, class: 'f21-dot', cx: x(-5), cy: y(0) }, svg);
      // enerji çubukları
      E.bar = {};
      const dil = (k, cls, harfS, deger, hatch) => {
        const g = mk('g', { class: 'f21-dil ' + cls }, svg);
        const r = mk('rect', {}, g);
        const h = hatch ? mk('rect', { fill: 'url(#f21-tarama-h)', class: 'f21-dil-h' }, g) : null;
        const t = txt(g, 0, 0, harfS + ' ' + r0(deger), 'f21-dilT', { 'text-anchor': 'middle' });
        E.bar[k] = { g, r, h, t, deger };
      };
      if (!dar) {
        G.bars = { taban: 340, olc: 250 / mJ.kas, k: [525, 60], i: [630, 60] };
        txt(svg, 555, 56, 'Kas işi', 'f21-lb', { 'text-anchor': 'middle' });
        txt(svg, 660, 56, 'Isı', 'f21-lb', { 'text-anchor': 'middle' });
        E.kTop = txt(svg, 555, 74, '', 'f21-mono f21-btop', { 'text-anchor': 'middle' });
        E.iTop = txt(svg, 660, 74, '', 'f21-mono f21-btop', { 'text-anchor': 'middle' });
        mk('line', { x1: 510, x2: 705, y1: 340, y2: 340, class: 'f21-eksen' }, svg);
        txt(svg, 615, 362, 'taralı: kullanılmayan X → ısı', 'f21-t f21-bnot', { 'text-anchor': 'middle' });
        txt(svg, 615, 378, 'mJ · model', 'f21-t f21-bnot', { 'text-anchor': 'middle' });
      } else {
        G.bars = { x0: 70, olc: 260 / mJ.kas, k: [382, 24], i: [432, 24] };
        txt(svg, 8, 392, 'Kas işi', 'f21-lb'); E.kTop = txt(svg, 8, 407, '', 'f21-mono f21-btop');
        txt(svg, 8, 442, 'Isı', 'f21-lb'); E.iTop = txt(svg, 8, 457, '', 'f21-mono f21-btop');
        txt(svg, 180, 480, 'taralı: kullanılmayan X → ısı · mJ · model', 'f21-t f21-bnot', { 'text-anchor': 'middle' });
      }
      dil('kX', 'x', 'X', mJ.X); dil('kY', 'y', 'Y', mJ.Y);
      dil('iY', 'y', 'Y', mJ.Y); dil('iZ', 'z', 'Z', mJ.Z); dil('iU', 'u', 'X−Z', mJ.U, true);
      goster(false);
    };

    /* çubukları gösterilen kesirlere göre yerleştir */
    const barCiz = () => {
      const b = G.bars, sira = { k: ['kX', 'kY'], i: ['iY', 'iZ', 'iU'] };
      ['k', 'i'].forEach((s) => {
        let top = 0;
        sira[s].forEach((k) => {
          const d = E.bar[k], f = BAR[k], uz = d.deger * b.olc * f;
          let x0, y0, w, h;
          if (!G.dar) { w = b[s][1]; h = uz; x0 = b[s][0]; y0 = b.taban - top - uz; }
          else { h = b[s][1]; w = uz; y0 = b[s][0]; x0 = b.x0 + top; }
          [d.r, d.h].forEach((r) => { if (!r) return; r.setAttribute('x', x0.toFixed(1)); r.setAttribute('y', y0.toFixed(1)); r.setAttribute('width', Math.max(0, w).toFixed(1)); r.setAttribute('height', Math.max(0, h).toFixed(1)); });
          d.g.setAttribute('opacity', f > 0.02 ? 1 : 0);
          d.t.setAttribute('x', (x0 + w / 2).toFixed(1)); d.t.setAttribute('y', (y0 + h / 2 + 4.5).toFixed(1));
          d.t.setAttribute('opacity', f > 0.9 && uz >= 26 ? 1 : 0);
          top += uz;
        });
      });
      const kas = (BAR.kX > 0.5 ? mJ.X : 0) + (BAR.kY > 0.5 ? mJ.Y : 0), isi = (BAR.iY > 0.5 ? mJ.Y : 0) + (BAR.iZ > 0.5 ? mJ.Z : 0) + (BAR.iU > 0.5 ? mJ.U : 0);
      E.kTop.textContent = kas ? r0(kas) + ' mJ' : '';
      E.iTop.textContent = isi ? r0(isi) + ' mJ' : '';
    };
    const hedefBar = () => { const a = st.adim; return { kX: a >= 3 ? 1 : 0, kY: a >= 4 ? 1 : 0, iY: a >= 4 ? 1 : 0, iZ: a >= 5 ? 1 : 0, iU: a >= 6 ? 1 : 0 }; };
    /* eğri ve dolgu yolları: kesir f (0–1) kadar çizilmiş */
    const piCiz = (f) => { const n = Math.round(f * (G.pi.length - 1)); E.pi.setAttribute('d', n > 0 ? yolD(G.pi.slice(0, n + 1)) : ''); return n; };
    const peCiz = (f) => { const n = Math.round(f * (G.pe.length - 1)), N = G.pe.length - 1; E.pe.setAttribute('d', n > 0 ? yolD(G.pe.slice(N - n)) : ''); return N - n; };
    const yCiz = (f) => { const n = Math.round(f * (G.pi.length - 1)); E.Y.setAttribute('d', n > 0 ? yolD(G.pi.slice(0, n + 1).concat(G.pd.slice(0, n + 1).reverse())) + 'Z' : ''); };
    const zCiz = (f) => { const N = G.pe.length - 1, n = Math.round(f * N); E.Z.setAttribute('d', n > 0 ? yolD(G.pd.slice(N - n).concat(G.pe.slice(N - n).reverse())) + 'Z' : ''); };
    const gor = (e, on) => { if (e) e.style.opacity = on ? '' : '0'; };

    /* adımın durağan görünümü; ani = ileri giderken animasyon başlatılsın mı */
    const goster = (ani) => {
      const a = st.adim;
      st.an = null;
      gor(E.piL, a >= 2); gor(E.piOk, a >= 2);
      piCiz(a >= 2 ? 1 : 0);
      gor(E.X, a >= 3); gor(E.hX, a >= 3);
      yCiz(a >= 4 ? 1 : 0); gor(E.hY, a >= 4);
      peCiz(a >= 5 ? 1 : 0); zCiz(a >= 5 ? 1 : 0); gor(E.peL, a >= 5); gor(E.peOk, a >= 5); gor(E.hZ, a >= 5); gor(E.r1, a >= 5);
      gor(E.U, a >= 6); gor(E.uL, a >= 6); gor(E.r2, a >= 6);
      E.dot.setAttribute('cx', G.x(-5)); E.dot.setAttribute('cy', G.y(0)); gor(E.dot, !RM && a >= 2 && a <= 5);
      if (a === 5) { E.dot.setAttribute('cx', G.pe[0][0]); E.dot.setAttribute('cy', G.pe[0][1]); }
      if (a >= 2 && a < 5) { const p = G.pi[G.pi.length - 1]; E.dot.setAttribute('cx', p[0]); E.dot.setAttribute('cy', p[1]); }
      E.pi.classList.remove('vurgu'); E.pe.classList.remove('vurgu');
      if (ani && !RM) {
        if (a === 2) { st.an = { tur: 'pi', t: 0, sure: 2 }; piCiz(0); gor(E.piL, false); gor(E.piOk, false); }
        else if (a === 4) { st.an = { tur: 'y', t: 0, sure: 0.9 }; yCiz(0); gor(E.hY, false); }
        else if (a === 5) { st.an = { tur: 'pe', t: 0, sure: 2.5 }; peCiz(0); zCiz(0); gor(E.peL, false); gor(E.peOk, false); gor(E.hZ, false); gor(E.r1, false); E.dot.setAttribute('cx', G.pi[G.pi.length - 1][0]); E.dot.setAttribute('cy', G.pi[G.pi.length - 1][1]); }
        else if (a === 6) { st.vurgu = 1; E.pi.classList.add('vurgu'); E.pe.classList.add('vurgu'); }
      }
      const h = hedefBar();
      if (!ani || RM) { Object.assign(BAR, h); }
      else for (const k in h) if (h[k] < BAR[k]) BAR[k] = h[k]; // geri giderken anında kaldır
      barCiz();
      $('.f21-sayac').textContent = `Adım ${a} / 6`;
      $('[data-a="geri"]').disabled = a <= 1;
      $('[data-a="ileri"]').disabled = a >= 6;
      const ob = $('[data-a="oyna"]'); if (ob) { ob.textContent = st.oyna ? 'Durdur' : 'Oynat'; ob.setAttribute('aria-pressed', String(st.oyna)); }
      cap.yaz(ADIM[a - 1]);
    };
    const git = (a, ani) => { st.adim = clamp(a, 1, 6); if (st.adim >= 6) st.oyna = false; goster(ani); };

    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-a]'); if (!b) return;
      const a = b.dataset.a;
      if (a === 'ileri') { st.oyna = false; git(st.adim + 1, true); }
      else if (a === 'geri') { st.oyna = false; git(st.adim - 1, false); }
      else if (a === 'bas') { st.oyna = false; git(1, false); }
      else if (a === 'oyna') {
        if (st.oyna) { st.oyna = false; goster(false); }
        else { st.oyna = true; st.oT = 0; if (st.adim >= 6) git(1, false); git(st.adim + 1, true); st.oyna = st.adim < 6; goster2(); }
      }
    });
    const goster2 = () => { const ob = $('[data-a="oyna"]'); if (ob) { ob.textContent = st.oyna ? 'Durdur' : 'Oynat'; ob.setAttribute('aria-pressed', String(st.oyna)); } };
    const adim = (dt) => {
      if (!G) return;
      if (st.an) {
        const A = st.an; A.t += dt; const f = clamp(A.t / A.sure, 0, 1), e = A.tur === 'y' ? 1 - Math.pow(1 - f, 2) : f;
        if (A.tur === 'pi') { const n = piCiz(e); const p = G.pi[n]; E.dot.setAttribute('cx', p[0]); E.dot.setAttribute('cy', p[1]); if (f >= 1) { gor(E.piL, true); gor(E.piOk, true); } }
        else if (A.tur === 'y') { yCiz(e); if (f >= 1) gor(E.hY, true); }
        else { const n = peCiz(e); zCiz(e); const p = G.pe[n]; E.dot.setAttribute('cx', p[0]); E.dot.setAttribute('cy', p[1]); if (f >= 1) { gor(E.peL, true); gor(E.peOk, true); gor(E.hZ, true); gor(E.r1, true); } }
        if (f >= 1) st.an = null;
      }
      if (st.vurgu > 0) { st.vurgu -= dt; if (st.vurgu <= 0) { E.pi.classList.remove('vurgu'); E.pe.classList.remove('vurgu'); } }
      // çubuklar (adım animasyonundan sonra dolar)
      const h = hedefBar(); let deg = false;
      for (const k in h) {
        const bekle = st.an && ((k === 'iZ' && st.an.tur === 'pe') || ((k === 'kY' || k === 'iY') && st.an.tur === 'y'));
        if (bekle) continue;
        const yeni = yak(BAR[k], h[k], dt, 0.12);
        if (Math.abs(yeni - BAR[k]) > 1e-4) { BAR[k] = Math.abs(yeni - h[k]) < 0.002 ? h[k] : yeni; deg = true; }
      }
      if (deg) barCiz();
      if (st.oyna) {
        st.oT += dt;
        if (st.oT >= 2.8) { st.oT = 0; git(st.adim + 1, true); goster2(); }
      }
    };
    const birak = genislik(el, (d) => { kur(d); });
    const dur = RM ? () => {} : ticker(el, adim);
    return () => { dur(); birak(); };
  };

  /* ================= 5 · Kompliyans ve direnç: halkayı kendiniz değiştirin ================= */
  VIZ.f21_hastalik = (el) => {
    const cap = capOf(el);
    const TIP = {
      normal: { ad: 'Normal', C: 0.2, R: 1, c: '<b>Normal: X 61, Y 33, Z 22 mJ.</b> Elastik iş inspirasyon işinin ≈%65\'i; Z, X\'in içinde kalır ve ekspirasyon pasiftir. [[K1 s. 88, 90]]' },
      restriktif: { ad: 'Restriktif', C: 0.1, R: 1, c: "<b>Restriktif: kompliyans 0,10 L/cmH₂O.</b> Diyagonal yatıklaşır; 0,5 L'lik VT için intraplevral basınç −10 cmH₂O'ya iner. Elastik iş (X) iki katına çıkar (123 mJ), rezistif iş değişmez; Z, X'in içinde kalır ve ekspirasyon pasiftir. [[K1 s. 90]]" },
      obstruktif: { ad: 'Obstrüktif', C: 0.2, R: 1.8, c: "<b>Obstrüktif: direnç ×1,8.</b> Hem Y hem Z büyür, halka genişler (kas işi 121 mJ). Z hâlâ X'in içinde ama sınırda: direnç biraz daha artarsa ekspirasyon eğrisi sola taşar. [[K1 s. 90–91]]" },
      koah: { ad: 'KOAH', C: 0.3, R: 2, c: "<b>KOAH: direnç ×2,0 ve kompliyans 0,30 L/cmH₂O.</b> Yüksek kompliyans X'i küçültür (41 mJ), artmış direnç Z'yi büyütür (44 mJ): ekspirasyon eğrisi −5 cmH₂O çizgisinin soluna bombeleşir. Taşan A alanı (≈10 mJ) ekspiratuvar kasların aktif işidir. [[K1 s. 82, 90–91]]" },
    };
    const st = { tip: 'normal', C: 0.2, R: 1 };
    el.innerHTML = `<div class="f21-ust">
        <div class="f21-grup"><span class="f21-gl">Hasta tipi</span>${segHtml('Hasta tipi', 'tip', Object.keys(TIP).map((k) => [k, TIP[k].ad]), st.tip)}</div>
        <div class="f21-rngs">
          <label class="f21-rng"><span>Akciğer kompliyansı C <output data-o="C"></output></span><input type="range" min="0.08" max="0.4" step="0.01" value="0.2" data-r="C"></label>
          <label class="f21-rng"><span>Hava yolu direnci <output data-o="R"></output></span><input type="range" min="0.5" max="3" step="0.1" value="1" data-r="R"></label>
        </div>
      </div>
      <div class="f21-hs">
        <div class="f21-svgk"></div>
        <div class="f21-istat" aria-live="polite">
          <div class="f21-is" style="--k:var(--c-basic)"><i></i><span>X elastik</span><b data-s="X"></b></div>
          <div class="f21-is" style="--k:var(--warn)"><i></i><span>Y insp. rezistif</span><b data-s="Y"></b></div>
          <div class="f21-is" style="--k:var(--c-clin)"><i></i><span>Z eksp. rezistif</span><b data-s="Z"></b></div>
          <div class="f21-is" style="--k:var(--crit)"><i class="tr"></i><span>A aktif eksp.</span><b data-s="A"></b></div>
          <div class="f21-is kalin"><span>Kas işi / soluk</span><b data-s="kas"></b></div>
          <div class="f21-is"><span>Güç (12/dk)</span><b data-s="guc"></b></div>
          <div class="f21-is"><span>Elastik pay (insp.)</span><b data-s="pay"></b></div>
          <div class="f21-hukum"><b></b><span></span></div>
          <p class="f21-sinir"></p>
        </div>
      </div>`;
    const $ = (s) => el.querySelector(s);
    const kap = $('.f21-svgk'), hs = $('.f21-hs');
    let G = null, E = {};
    const yum = yumusak(400, (c) => ciz(c.C, c.R));

    const kur = (dar) => {
      hs.classList.toggle('dar', dar);
      G = dar
        ? { dar, W: 360, H: 414, ax0: 40, ax1: 340, axY: 350, pMin: -2, pMax: -13, kx: 300 / 11, vy0: 340, ky: 540, yadX: 0, et: [-2, -5, -8, -11] }
        : { dar, W: 540, H: 430, ax0: 70, ax1: 510, axY: 372, pMin: -2, pMax: -13, kx: 40, vy0: 360, ky: 560, yadX: 22, et: [-2, -4, -6, -8, -10, -12] };
      const x = (P) => G.ax0 + (-2 - P) * G.kx, y = (v) => G.vy0 - G.ky * v;
      G.x = x; G.y = y;
      kap.innerHTML = '';
      const svg = mk('svg', { class: 'f21-svg f21-hs-svg' + (dar ? ' dar' : ''), viewBox: `0 0 ${G.W} ${G.H}`, role: 'img', 'aria-label': 'Seçilen kompliyans ve dirence göre intraplevral basınç–hacim halkası; X, Y, Z ve aktif ekspirasyon alanı A' }, kap);
      E = { svg };
      tarama(svg, 'f21-tarama-d', 'f21-tarama-c crit');
      eksen(svg, G, x, y, dar, G.et);
      mk('line', { x1: x(-5), x2: x(-5), y1: G.axY, y2: y(VT) - 12, class: 'f21-yard k' }, svg);
      txt(svg, x(-5), y(VT) - 18, "FRC'de −5", 'f21-t f21-eksad', { 'text-anchor': 'middle' });
      // normal halka hayaleti
      E.hayal = mk('g', { class: 'f21-hayal' }, svg);
      mk('path', { d: yolD(ornek((v) => PV.Pi(v, 0.2, 1)).map(([v, P]) => [x(P), y(v)])) }, E.hayal);
      mk('path', { d: yolD(ornek((v) => PV.Pe(v, 0.2, 1)).map(([v, P]) => [x(P), y(v)])) }, E.hayal);
      const lx = dar ? 344 : 510, ly = dar ? 18 : 26, lw = dar ? 116 : 88;
      mk('line', { x1: lx - lw - 30, x2: lx - lw - 6, y1: ly - 4, y2: ly - 4, class: 'f21-diag' }, svg);
      txt(svg, lx - lw, ly, 'ideal (eğim = C)', 'f21-t f21-hayalT');
      E.hayalL = mk('g', { class: 'f21-hayal' }, svg);
      mk('path', { d: `M${lx - lw - 30} ${ly + 14} h24` }, E.hayalL);
      txt(E.hayalL, lx - lw, ly + 18, 'normal halka', 'f21-t f21-hayalT');
      E.X = mk('path', { class: 'f21-alan x' }, svg);
      E.Y = mk('path', { class: 'f21-alan y' }, svg);
      E.Z = mk('path', { class: 'f21-alan z' }, svg);
      E.A = mk('path', { class: 'f21-alan a' }, svg);
      E.Ah = mk('path', { class: 'f21-alan ah', fill: 'url(#f21-tarama-d)' }, svg);
      E.diag = mk('line', { class: 'f21-diag' }, svg);
      E.pi = mk('path', { class: 'f21-egri' }, svg);
      E.pe = mk('path', { class: 'f21-egri' }, svg);
      E.ok = mk('g', {}, svg);
      mk('circle', { cx: x(-5), cy: y(0), r: 4, class: 'f21-nokta' }, svg);
      E.son = mk('circle', { r: 4, class: 'f21-nokta' }, svg);
      const harf = (s, cls) => txt(svg, 0, 0, s, 'f21-harfT2 f21-halo ' + cls, { 'text-anchor': 'middle' });
      E.hX = harf('X', 'x'); E.hY = harf('Y', 'y'); E.hZ = harf('Z', 'z'); E.hA = harf('A', 'a');
      E.aL = dar ? null : mk('g', { class: 'f21-aL' }, svg);
      if (E.aL) { mk('rect', { x: x(-2) + 8, y: y(0.47) - 10, width: 12, height: 12, class: 'f21-alan a' }, E.aL); mk('rect', { x: x(-2) + 8, y: y(0.47) - 10, width: 12, height: 12, fill: 'url(#f21-tarama-d)' }, E.aL); txt(E.aL, x(-2) + 26, y(0.47), 'A · aktif', 'f21-t f21-aLT'); txt(E.aL, x(-2) + 8, y(0.47) + 15, 'ekspirasyon', 'f21-t f21-aLT'); }
      const c = yum.simdi();
      ciz(c ? c.C : st.C, c ? c.R : st.R);
    };

    const ciz = (C, R) => {
      if (!G) return;
      const { x, y } = G;
      const pi = ornek((v) => PV.Pi(v, C, R)).map(([v, P]) => [x(P), y(v)]);
      const pe = ornek((v) => PV.Pe(v, C, R)).map(([v, P]) => [x(P), y(v)]);
      const pd = ornek((v) => PV.Pd(v, C)).map(([v, P]) => [x(P), y(v)]);
      const peA = ornek((v) => Math.max(-5, PV.Pe(v, C, R)), 120).map(([v, P]) => [x(P), y(v)]);
      const xe = x(PV.Pd(VT, C));
      E.X.setAttribute('d', yolD([[x(-5), y(0)], [x(-5), y(VT)], [xe, y(VT)]]) + 'Z');
      E.Y.setAttribute('d', yolD(pi.concat(pd.slice().reverse())) + 'Z');
      E.Z.setAttribute('d', yolD(pd.concat(pe.slice().reverse())) + 'Z');
      const Av = PV.A(C, R);
      const aD = Av > 1e-5 ? yolD(peA.concat([[x(-5), y(VT)], [x(-5), y(0)]])) + 'Z' : '';
      E.A.setAttribute('d', aD); E.Ah.setAttribute('d', aD);
      E.diag.setAttribute('x1', x(-5)); E.diag.setAttribute('y1', y(0)); E.diag.setAttribute('x2', xe); E.diag.setAttribute('y2', y(VT));
      E.son.setAttribute('cx', xe); E.son.setAttribute('cy', y(VT));
      E.pi.setAttribute('d', yolD(pi)); E.pe.setAttribute('d', yolD(pe));
      E.ok.innerHTML = '';
      okBasi(E.ok, pi, 36, 'f21-okb'); okBasi(E.ok, pe.slice().reverse(), 30, 'f21-okb');
      // harfler (bölge 14 px'ten darsa gizli)
      const vy = 0.28, Pd = PV.Pd(vy, C), Pi = PV.Pi(vy, C, R), Pe = PV.Pe(vy, C, R), PeK = Math.min(Pe, -5);
      const koy = (t, P, v, w) => { t.setAttribute('x', x(P).toFixed(1)); t.setAttribute('y', (y(v) + 6).toFixed(1)); t.style.display = w >= 14 ? '' : 'none'; };
      koy(E.hY, (Pd + Pi) / 2, vy, (Pd - Pi) * G.kx);
      koy(E.hZ, (Pd + PeK) / 2, vy, (PeK - Pd) * G.kx);
      // X: üçgenin sol üst köşesi (kullanılmayan bölüm), yer yoksa gizli
      const vX = 0.455, PeX = PV.Pe(vX, C, R), wX = Math.max(0, -5 - PeX) * G.kx;
      E.hX.setAttribute('x', (x(-5) + (G.dar ? 9 : 11)).toFixed(1)); E.hX.setAttribute('y', (y(vX) + 6).toFixed(1)); E.hX.style.display = wX >= 22 ? '' : 'none';
      // A harfi: en geniş taşma yerinde
      let best = 0, bv = 0;
      for (let i = 1; i < 100; i++) { const v = i / 100 * VT, d = PV.Pe(v, C, R) + 5; if (d > best) { best = d; bv = v; } }
      E.hA.setAttribute('x', x(-5 + best / 2).toFixed(1)); E.hA.setAttribute('y', (y(bv) + 6).toFixed(1)); E.hA.style.display = best * G.kx >= 14 ? '' : 'none';
      if (E.aL) E.aL.style.display = Av > 1e-5 ? '' : 'none';
    };

    const yaz = (ani = true) => {
      const { C, R } = st;
      const X = PV.X(C) * J, Y = PV.Y(R) * J, Z = PV.Z(R) * J, A = PV.A(C, R) * J, kas = X + Y + A, guc = kas * 12 / 60, Rk = PV.Rk(C), aktif = A > 0.05;
      const r0 = (v) => String(Math.round(v));
      $('[data-o="C"]').textContent = fmt(C, 2) + ' L/cmH₂O';
      $('[data-o="R"]').textContent = '×' + fmt(R, 1);
      basSec(el, 'tip', st.tip);
      $('[data-s="X"]').textContent = r0(X) + ' mJ'; $('[data-s="Y"]').textContent = r0(Y) + ' mJ'; $('[data-s="Z"]').textContent = r0(Z) + ' mJ';
      $('[data-s="A"]').textContent = r0(A) + ' mJ'; $('[data-s="kas"]').textContent = r0(kas) + ' mJ';
      $('[data-s="guc"]').textContent = (guc >= 10 ? r0(guc) : fmt(guc, 1)) + ' mW';
      $('[data-s="pay"]').textContent = '%' + Math.round(X / (X + Y) * 100);
      const hk = $('.f21-hukum');
      hk.className = 'f21-hukum ' + (aktif ? 'crit' : 'ok');
      hk.querySelector('b').textContent = aktif ? 'Ekspirasyon AKTİF' : 'Ekspirasyon PASİF';
      hk.querySelector('span').textContent = aktif ? "Z, X'in dışına taşıyor" : "Z, X'in içinde";
      $('.f21-sinir').textContent = Rk > 3 ? "bu C'de aralığın tamamında pasif" : 'pasif sınır: direnç ≤ ×' + fmt(Rk, 2);
      if (E.hayal) { const nrm = st.tip === 'normal'; E.hayal.style.display = nrm ? 'none' : ''; E.hayalL.style.display = nrm ? 'none' : ''; }
      yum.set({ C, R }, ani);
      if (st.tip) cap.yaz(TIP[st.tip].c);
      else cap.yaz(`<b>C ${fmt(C, 2)} L/cmH₂O, direnç ×${fmt(R, 1)}: ekspirasyon ${aktif ? 'aktif' : 'pasif'}.</b> X ${r0(X)}, Y ${r0(Y)}, Z ${r0(Z)}${aktif ? ', A ' + r0(A) : ''} mJ. ${aktif ? "Z, X'in dışına taşıyor; aradaki fark (A) ekspiratuvar kaslarca karşılanır." : "Z, X'in içinde: depolanan enerji ekspirasyona yetiyor."} ${Rk > 3 ? 'Bu kompliyansta ekspirasyon direnç aralığının tamamında pasif kalır.' : 'Bu kompliyansta ekspirasyonun pasif kaldığı en yüksek direnç ×' + fmt(Rk, 2) + '.'} [[K1 s. 90–91]]`);
    };
    const eslesen = () => Object.keys(TIP).find((k) => Math.abs(TIP[k].C - st.C) < 1e-6 && Math.abs(TIP[k].R - st.R) < 1e-6) || null;
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-tip]'); if (!b) return;
      const T = TIP[b.dataset.tip];
      Object.assign(st, { tip: b.dataset.tip, C: T.C, R: T.R });
      $('[data-r="C"]').value = T.C; $('[data-r="R"]').value = T.R;
      yaz(true);
    });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      st[r.dataset.r] = Math.round(+r.value * 100) / 100; st.tip = eslesen(); yaz(false);
    });
    const birak = genislik(el, (d) => { kur(d); yaz(false); });
    return () => { yum.dur(); birak(); };
  };

  /* ================= 6 · Kasların enerjisi nereye gider? (durağan, etiketli şema; dokununca vurgu) =================
     Bütün oranlar kitaptandır [K1 s. 88]: elastik ≈%65, doku direnci rezistif işin ≈%10'u, sakin solunum < %2 BMR, hastalıkta %30'a kadar.
     Elastik kutuların sırası göğüs duvarı → yüzey gerilimi → parankim: parankim kutusu doku direnci kutusunun yanına gelsin
     (pulmoner fibrozis ikisini birden artırır; aradaki kesikli bağ kısa kalır). */
  VIZ.f21_bilesen = (el) => {
    const viz = el.closest('.viz'), capEl = viz ? viz.querySelector('.viz-cap') : null;
    const ilkCap = capEl ? capEl.innerHTML : '';
    let sonCap = '';
    const capYaz = (h) => { const k = h || ''; if (!capEl || k === sonCap) return; sonCap = k; capEl.innerHTML = h ? REF(h) : ilkCap; };
    const HAS = {
      obezite: { on: ['gogus', 'segE'], c: '<b>Obezite</b> göğüs duvarının dışa doğru elastik geri çekilmesine karşı koyar; elastik iş artar. [[K1 s. 88]]' },
      fibrozis: { on: ['parankim', 'doku', 'segE', 'segR'], c: '<b>Pulmoner fibrozis iki bileşeni birden artırır:</b> parankimin kompliyansını azaltarak elastik işi, interstisyel doku miktarını artırarak doku direncine karşı yapılan rezistif işi. [[K1 s. 88]]' },
      sss: { on: ['yuzey', 'segE'], c: '<b>Yenidoğanın solunum sıkıntısı sendromu:</b> pulmoner sürfaktan yetersizdir, alveoler yüzey gerilimi artar; elastik iş artar. [[K1 s. 88]]' },
    };
    const OGE = {
      formul: { ad: 'Formül: iş eşittir basınç çarpı hacim; solunum işi aslında güçtür', c: '<b>İş = basınç × hacim</b> (tek soluk). "Solunum işi" çoğu zaman işin hızıdır, yani güçtür: birimi watt (J/s). [[K1 s. 88]]' },
      olcek: { ad: 'Enerji maliyeti ölçeği', c: '<b>Sakin tidal solunum verimlidir:</b> BMR\'nin %2\'sinden azını harcar. Akciğer hastalığında bu pay %30\'a kadar çıkabilir; solunum kası yorgunluğu ve solunum yetmezliği gelişebilir. [[K1 s. 88]]' },
      gogus: { ad: 'Göğüs duvarı', c: '<b>Göğüs duvarı:</b> inspirasyonda yenilen üç elastik kuvvetten biri, dışa doğrudur. Obezite artırır. [[K1 s. 88]]' },
      yuzey: { ad: 'Alveoler yüzey gerilimi', c: '<b>Alveoler yüzey gerilimi:</b> içe doğru elastik kuvvet. Sürfaktan yetersizliğinde (yenidoğanın solunum sıkıntısı sendromu) artar. [[K1 s. 88]]' },
      parankim: { ad: 'Akciğer parankimi', c: '<b>Akciğer parankimi:</b> içe doğru elastik kuvvet. Pulmoner fibrozis parankimin kompliyansını azaltır. [[K1 s. 88]]' },
      doku: { ad: 'Doku direnci', c: '<b>Doku direnci:</b> akciğer şişip sönerken dokular birbirine sürtünür; toplam rezistif işin ≈%10\'u. İnterstisyel doku artınca (pulmoner fibrozis) artar. [[K1 s. 88]]' },
      havayolu: { ad: 'Hava yolu direnci', c: '<b>Hava yolu direnci:</b> gaz molekülleri birbirleriyle ve hava yolu duvarlarıyla etkileşirken sürtünür. Büyüklüğünü türbülans ve yarıçap belirler. [[K1 s. 88]]' },
      depo: { ad: 'Depolanan enerji', c: '<b>Elastik işin bir kısmı boşa gitmez:</b> potansiyel enerji olarak depolanır ve ekspirasyonda kullanılır; basınç–hacim halkasında X üçgenidir. [[K1 s. 88, 90]]' },
      isi: { ad: 'Isı olarak dağılan enerji', c: '<b>Rezistif iş sürtünmeye harcanır:</b> enerji ısı (ve ses) olarak dağılır, bu anlamda "boşa" gider. [[K1 s. 88]]' },
    };
    const KUTU = [
      { k: 'gogus', t: 'e', ad: ['Göğüs duvarı'], yon: ['dışa doğru'], cip: ['Obezite'] },
      { k: 'yuzey', t: 'e', ad: ['Alveoler yüzey', 'gerilimi'], yon: ['içe doğru'], cip: ['Yenidoğanın SSS', 'sürfaktan ↓'] },
      { k: 'parankim', t: 'e', ad: ['Akciğer', 'parankimi'], yon: ['içe doğru'], cip: ['Pulmoner fibrozis', 'kompliyans ↓'] },
      { k: 'doku', t: 'r', ad: ['Doku direnci'], yon: ['dokular birbirine', 'sürtünür'], cip: ['Pulmoner fibrozis', 'interstisyel doku ↑'] },
      { k: 'havayolu', t: 'r', ad: ['Hava yolu', 'direnci'], yon: ['gaz–gaz, gaz–duvar', 'sürtünmesi'], not: ['türbülans + yarıçap', '→ sonraki bölümler'] },
    ];
    const ARIA = 'Solunum işinin bileşenleri: elastik iş üç kuvvete karşı yapılır ve kısmen depolanır, rezistif iş doku ve hava yolu direncine karşı yapılır ve ısı olarak dağılır';

    el.innerHTML = `<div class="f21-ust">
        <div class="f21-grup"><span class="f21-gl">Hastalık</span>${segHtml('Hastalık', 'h', [['yok', 'Hiçbiri'], ['obezite', 'Obezite'], ['fibrozis', 'Pulmoner fibrozis'], ['sss', 'Yenidoğanın SSS']], 'yok')}</div>
      </div>
      <div class="f21-svgk"></div>`;
    const kap = el.querySelector('.f21-svgk');
    let E = null, sabit = { tip: 'has', k: 'yok' }, gecici = null, olu = false;
    const mid = { 'text-anchor': 'middle' }, son = { 'text-anchor': 'end' };

    /* metin sığmazsa sıkıştır (yazı tipi gelmeden önce ve sonra) */
    const sigdir = () => {
      if (!E) return;
      for (const [t, w] of E.fit) {
        t.removeAttribute('textLength'); t.removeAttribute('lengthAdjust');
        let n = 0; try { n = t.getComputedTextLength(); } catch (_) { n = 0; }
        if (n > w) { t.setAttribute('textLength', w); t.setAttribute('lengthAdjust', 'spacingAndGlyphs'); }
      }
    };
    const yazi = (g, x, y, s, cls, attrs, maxW) => { const t = txt(g, x, y, s, cls, attrs); if (maxW) E.fit.push([t, maxW]); return t; };
    const okc = (g, x1, y1, x2, y2, t, boy = 5) => {
      const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), s = Math.sin(a);
      mk('line', { x1, y1, x2: (x2 - boy * 0.7 * c).toFixed(1), y2: (y2 - boy * 0.7 * s).toFixed(1), class: 'f21-bl-ik ' + t }, g);
      const q = (dx, dy) => (x2 + dx * c - dy * s).toFixed(1) + ',' + (y2 + dx * s + dy * c).toFixed(1);
      mk('polygon', { points: [q(1, 0), q(-boy, boy * 0.75), q(-boy, -boy * 0.75)].join(' '), class: 'f21-bl-okb ' + t }, g);
    };
    /* simgeler: (0,0) çevresinde ≈ 48 × 36 */
    const ikon = (par, k, cx, cy, s) => {
      const g = mk('g', { transform: `translate(${cx} ${cy}) scale(${s})`, 'aria-hidden': 'true' }, par);
      if (k === 'gogus') { // iki kaburga yayı, dışa bakan oklar
        mk('path', { d: 'M-4 -16 Q-17 0 -4 16', class: 'f21-bl-ik e' }, g);
        mk('path', { d: 'M4 -16 Q17 0 4 16', class: 'f21-bl-ik e' }, g);
        okc(g, -13, 0, -24, 0, 'e'); okc(g, 13, 0, 24, 0, 'e');
      } else if (k === 'parankim') { // akciğer lobu, içe bakan iki ok
        mk('path', { d: 'M-2 -17 C8 -16 13 -4 13 9 C13 15 8 17 1 15 C-4 13.5 -8 13 -9 9 C-10 3 -6 -3 -6 -9 C-6 -14 -4.5 -17 -2 -17 Z', class: 'f21-bl-ikd e' }, g);
        okc(g, -24, 3, -12, 3, 'e'); okc(g, 25, 3, 16, 3, 'e');
      } else if (k === 'yuzey') { // alveol; kenarında içe bakan dört ok
        mk('circle', { cx: 0, cy: 0, r: 9, class: 'f21-bl-ikd e' }, g);
        [45, 135, 225, 315].forEach((d) => { const a = d * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a); okc(g, c * 21, sn * 21, c * 11.5, sn * 11.5, 'e', 4.5); });
      } else if (k === 'doku') { // üst üste kayan iki doku katmanı ve sürtünme çizgileri
        mk('rect', { x: -19, y: -12, width: 28, height: 8.5, rx: 2.5, class: 'f21-bl-ikd r' }, g);
        mk('rect', { x: -9, y: 3.5, width: 28, height: 8.5, rx: 2.5, class: 'f21-bl-ikd r' }, g);
        mk('path', { d: 'M-9 0 l3 -1.8 l3 1.8 l3 -1.8 l3 1.8 l3 -1.8 l3 1.8', class: 'f21-bl-ik r ince' }, g);
        okc(g, 4, -16.5, -12, -16.5, 'r', 4); okc(g, -4, 16.5, 12, 16.5, 'r', 4);
      } else if (k === 'havayolu') { // kısa tüp; duvara ve birbirine çarpan gaz molekülleri
        mk('path', { d: 'M-22 -11 H22 M-22 11 H22', class: 'f21-bl-ik r' }, g);
        [[-14, -3], [-6, 5], [1, -6.5], [8, 2], [15, -4]].forEach(([x, y], i) => {
          mk('line', { x1: x - 6, y1: y + (i % 2 ? -2 : 2), x2: x - 2.6, y2: y + (i % 2 ? -0.8 : 0.8), class: 'f21-bl-ik r ince iz' }, g);
          mk('circle', { cx: x, cy: y, r: 2.3, class: 'f21-bl-mol' }, g);
        });
        mk('path', { d: 'M1 -9.2 l-2 -1.4 M1 -9.2 l2 -1.4', class: 'f21-bl-ik r ince' }, g);
      } else if (k === 'isi') { // ısı dalgaları
        [-6, 0, 6].forEach((dx) => mk('path', { d: `M${dx} 10 q4 -3.3 0 -6.7 q-4 -3.3 0 -6.7 q4 -3.3 0 -6.7`, class: 'f21-bl-ik r' }, g));
      }
      return g;
    };
    const grup = (svg, k) => { const g = mk('g', { class: 'f21-bl-g', 'data-k': k, tabindex: 0, role: 'button', 'aria-label': OGE[k].ad, 'aria-pressed': 'false' }, svg); E.g[k] = g; return g; };
    const pasif = (svg, k) => { const g = mk('g', { class: 'f21-bl-g' }, svg); E.g[k] = g; return g; };
    const cip = (g, x, y, w, lines, dar) => { // hastalık çipi (1–2 satır)
      const lh = dar ? 15 : 14, h = 8 + lines.length * lh;
      const r = mk('rect', { x, y, width: w, height: h, rx: 7, class: 'f21-bl-cip' }, g);
      const ts = lines.map((s, j) => yazi(g, dar ? x + 7 : x + w / 2, y + 4 + lh * (j + 0.78), s, 'f21-bl-cipt', dar ? {} : mid, w - 10));
      return { r, ts };
    };

    const kurGenis = (svg) => {
      // 1 · üst şerit: formül hapları
      const f = grup(svg, 'formul');
      [['Tek soluk · iş = basınç × hacim (J)', 6], ['Solunum işi ≈ güç = iş / zaman (W = J/s)', 36]].forEach(([s, y]) => {
        mk('rect', { x: 20, y, width: 310, height: 24, rx: 12, class: 'f21-bl-hap f21-bl-cer' }, f);
        yazi(f, 32, y + 16.5, s, 'f21-bl-hapt', {}, 288);
      });
      // enerji maliyeti ölçeği (11 px / %)
      const o = grup(svg, 'olcek'), px = (p) => 370 + p * 11;
      mk('rect', { x: 358, y: 0, width: 360, height: 72, rx: 8, class: 'f21-bl-hit f21-bl-cer' }, o);
      yazi(o, 370, 12, "Enerji maliyeti (BMR'nin %'si)", 'f21-bl-bas');
      yazi(o, 370, 27, 'sakin solunum < %2', 'f21-bl-k ok');
      mk('rect', { x: px(2), y: 32, width: px(30) - px(2), height: 8, class: 'f21-bl-hast' }, o);
      mk('line', { x1: px(0), y1: 36, x2: px(30), y2: 36, class: 'f21-bl-eks' }, o);
      mk('rect', { x: px(0), y: 31, width: px(2) - px(0), height: 10, rx: 2, class: 'f21-bl-sakin' }, o);
      mk('line', { x1: px(30), y1: 29, x2: px(30), y2: 43, class: 'f21-bl-centik' }, o);
      yazi(o, px(0), 54, '0', 'f21-bl-k', mid);
      yazi(o, px(30), 54, '%30', 'f21-bl-k', mid);
      yazi(o, 684, 54, "akciğer hastalığında %30'a kadar", 'f21-bl-k crit', son);
      yazi(o, 684, 67, '→ kas yorgunluğu, solunum yetmezliği', 'f21-bl-k crit', son);
      // 2 · toplam iş çubuğu
      yazi(svg, 20, 82, 'Toplam solunum işi · normal akciğer', 'f21-bl-bas');
      const sE = pasif(svg, 'segE');
      mk('rect', { x: 20, y: 88, width: 441, height: 40, rx: 6, class: 'f21-bl-e f21-bl-cer' }, sE);
      yazi(sE, 240.5, 113.5, 'Elastik iş ≈ %65', 'f21-bl-segt', mid);
      const sR = pasif(svg, 'segR');
      mk('rect', { x: 463, y: 88, width: 237, height: 40, rx: 6, class: 'f21-bl-r f21-bl-cer' }, sR);
      yazi(sR, 581.5, 113.5, 'Rezistif iş · geri kalan', 'f21-bl-segt', mid, 222);
      mk('rect', { x: 463, y: 132, width: 23.7, height: 16, class: 'f21-bl-doku' }, sR);
      mk('rect', { x: 486.7, y: 132, width: 213.3, height: 16, class: 'f21-bl-hy' }, sR);
      yazi(sR, 593, 144, 'hava yolu · geri kalan', 'f21-bl-k ink', mid);
      yazi(sR, 450, 144, 'doku ≈ %10', 'f21-bl-k ink', son);
      mk('line', { x1: 454, y1: 140, x2: 470, y2: 140, class: 'f21-bl-kk' }, sR);
      // kılavuz çizgiler
      const XS = [20, 157, 294, 436, 573], BW = 127, Y0 = 174, H = 168;
      mk('path', { d: 'M240.5 128 V162 M83.5 162 H357.5 M83.5 162 V174 M220.5 162 V174 M357.5 162 V174', class: 'f21-bl-kil' }, svg);
      mk('path', { d: 'M474.8 148 V158 H499.5 V174 M636.5 148 V174', class: 'f21-bl-kil' }, svg);
      // 3 · kutular
      KUTU.forEach((b, i) => {
        const x = XS[i], cx = x + BW / 2, g = grup(svg, b.k);
        mk('rect', { x, y: Y0, width: BW, height: H, rx: 10, class: 'f21-bl-kutu f21-bl-cer ' + b.t }, g);
        ikon(g, b.k, cx, Y0 + 28, 1);
        b.ad.forEach((s, j) => yazi(g, cx, Y0 + 66 + j * 16, s, 'f21-bl-ad', mid, BW - 10));
        b.yon.forEach((s, j) => yazi(g, cx, Y0 + 101 + j * 14, s, 'f21-bl-yon', mid, BW - 10));
        if (b.cip) { const c = cip(g, x + 6, Y0 + 124, BW - 12, b.cip, false); if (b.k === 'parankim') E.cP = c; if (b.k === 'doku') E.cD = c; }
        else b.not.forEach((s, j) => yazi(g, cx, Y0 + 138 + j * 14, s, 'f21-bl-yon', mid, BW - 10));
      });
      // pulmoner fibrozis: iki kutu arasındaki bağ
      E.bag = mk('path', { d: `M${XS[2] + BW - 6} ${Y0 + 142} H${XS[3] + 6}`, class: 'f21-bl-bag' }, svg);
      // 4 · enerjinin akıbeti
      const yA = Y0 + H; // 342
      const d = grup(svg, 'depo');
      mk('line', { x1: 220.5, y1: yA, x2: 220.5, y2: yA + 15, class: 'f21-bl-okc e', 'marker-end': 'url(#f21-bl-ok)' }, d);
      mk('rect', { x: 20, y: yA + 18, width: 401, height: 48, rx: 9, class: 'f21-bl-depo f21-bl-cer' }, d);
      yazi(d, 34, yA + 38, 'Bir kısmı potansiyel enerji olarak depolanır', 'f21-bl-dt', {}, 375);
      const t2 = yazi(d, 34, yA + 56, '→ ekspirasyonda kullanılır ', 'f21-bl-dt');
      const ts = mk('tspan', { class: 'f21-bl-dk' }, t2); ts.textContent = '(halkada X üçgeni)';
      const s = grup(svg, 'isi');
      mk('line', { x1: 568, y1: yA, x2: 568, y2: yA + 15, class: 'f21-bl-okc r', 'marker-end': 'url(#f21-bl-okr)' }, s);
      mk('rect', { x: 436, y: yA + 18, width: 264, height: 48, rx: 9, class: 'f21-bl-isi f21-bl-cer' }, s);
      ikon(s, 'isi', 458, yA + 42, 1);
      yazi(s, 478, yA + 38, 'Isı (ve ses) olarak dağılır', 'f21-bl-dt', {}, 214);
      yazi(s, 478, yA + 56, 'enerji "boşa" gider', 'f21-bl-dk');
      return yA + 72; // 414
    };

    const kurDar = (svg) => {
      const X0 = 16, X1 = 344, Wd = X1 - X0;
      const f = grup(svg, 'formul');
      [['Tek soluk · iş = basınç × hacim (J)', 6], ['Solunum işi ≈ güç = iş / zaman (W = J/s)', 36]].forEach(([s, y]) => {
        mk('rect', { x: X0, y, width: Wd, height: 24, rx: 12, class: 'f21-bl-hap f21-bl-cer' }, f);
        yazi(f, X0 + 11, y + 16.5, s, 'f21-bl-hapt', {}, Wd - 20);
      });
      const o = grup(svg, 'olcek'), px = (p) => X0 + p * (Wd / 30);
      mk('rect', { x: 6, y: 66, width: 348, height: 80, rx: 8, class: 'f21-bl-hit f21-bl-cer' }, o);
      yazi(o, X0, 81, "Enerji maliyeti (BMR'nin %'si)", 'f21-bl-bas');
      yazi(o, X0, 97, 'sakin solunum < %2', 'f21-bl-k ok');
      mk('rect', { x: px(2), y: 102, width: px(30) - px(2), height: 8, class: 'f21-bl-hast' }, o);
      mk('line', { x1: px(0), y1: 106, x2: px(30), y2: 106, class: 'f21-bl-eks' }, o);
      mk('rect', { x: px(0), y: 101, width: px(2) - px(0), height: 10, rx: 2, class: 'f21-bl-sakin' }, o);
      mk('line', { x1: px(30), y1: 99, x2: px(30), y2: 113, class: 'f21-bl-centik' }, o);
      yazi(o, px(0), 126, '0', 'f21-bl-k', mid);
      yazi(o, px(30), 97, '%30', 'f21-bl-k', son);
      yazi(o, px(30), 126, "akciğer hastalığında %30'a kadar", 'f21-bl-k crit', son, 300);
      yazi(o, px(30), 141, '→ kas yorgunluğu, solunum yetmezliği', 'f21-bl-k crit', son, 320);
      // toplam iş çubuğu
      const xE = X0 + Wd * 0.65; // 229,2
      yazi(svg, X0, 163, 'Toplam solunum işi · normal akciğer', 'f21-bl-bas', {}, Wd);
      const sE = pasif(svg, 'segE');
      mk('rect', { x: X0, y: 169, width: xE - X0 - 1, height: 38, rx: 6, class: 'f21-bl-e f21-bl-cer' }, sE);
      yazi(sE, (X0 + xE) / 2, 185, 'Elastik', 'f21-bl-segt', mid); yazi(sE, (X0 + xE) / 2, 200, '≈ %65', 'f21-bl-segt', mid);
      const sR = pasif(svg, 'segR');
      mk('rect', { x: xE + 1, y: 169, width: X1 - xE - 1, height: 38, rx: 6, class: 'f21-bl-r f21-bl-cer' }, sR);
      yazi(sR, (xE + X1) / 2, 185, 'Rezistif', 'f21-bl-segt', mid); yazi(sR, (xE + X1) / 2, 200, 'geri kalan', 'f21-bl-segt', mid);
      const xD = xE + 1 + (X1 - xE - 1) * 0.1;
      mk('rect', { x: xE + 1, y: 211, width: xD - xE - 1, height: 13, class: 'f21-bl-doku' }, sR);
      mk('rect', { x: xD, y: 211, width: X1 - xD, height: 13, class: 'f21-bl-hy' }, sR);
      yazi(sR, xE - 12, 222, 'doku ≈ %10', 'f21-bl-k ink', son);
      mk('line', { x1: xE - 9, y1: 218, x2: xE + 5, y2: 218, class: 'f21-bl-kk' }, sR);
      yazi(sR, X1, 240, 'hava yolu · geri kalan', 'f21-bl-k ink', son);
      // satırlar
      let y = 262;
      const RH = 66;
      const satir = (b) => {
        const g = grup(svg, b.k);
        mk('rect', { x: X0, y, width: Wd, height: RH, rx: 10, class: 'f21-bl-kutu f21-bl-cer ' + b.t }, g);
        ikon(g, b.k, X0 + 30, y + 33, 0.92);
        const tx = X0 + 62, tw = X1 - tx - 8;
        yazi(g, tx, y + 20, b.ad.join(' '), 'f21-bl-ad', {}, tw);
        yazi(g, tx, y + 37, b.yon.join(' '), 'f21-bl-yon', {}, tw);
        if (b.cip) {
          const s = b.cip.join(' · ');
          const c = cip(g, tx, y + 43, tw, [s], true);
          let n = 0; try { n = c.ts[0].getComputedTextLength(); } catch (_) { n = 0; }
          if (n > 0) c.r.setAttribute('width', Math.min(tw, n + 14).toFixed(1));
          if (b.k === 'parankim') E.yP = y; if (b.k === 'doku') E.yD = y;
        } else yazi(g, tx, y + 56, b.not.join(' '), 'f21-bl-yon', {}, tw);
        y += RH + 6;
      };
      const baslik = (s) => { yazi(svg, X0, y + 6, s, 'f21-bl-gb'); y += 14; };
      baslik('ELASTİK İŞ · İNSPİRASYONDA YENİLİR');
      KUTU.filter((b) => b.t === 'e').forEach(satir);
      // depolama
      const d = grup(svg, 'depo');
      mk('rect', { x: X0, y, width: Wd, height: 64, rx: 9, class: 'f21-bl-depo f21-bl-cer' }, d);
      yazi(d, X0 + 12, y + 20, '↓ Bir kısmı potansiyel enerji olarak', 'f21-bl-dt', {}, Wd - 24);
      yazi(d, X0 + 12, y + 37, 'depolanır → ekspirasyonda kullanılır', 'f21-bl-dt', {}, Wd - 24);
      yazi(d, X0 + 12, y + 54, '(halkada X üçgeni)', 'f21-bl-dk');
      y += 64 + 16;
      baslik('REZİSTİF İŞ · SÜRTÜNMEYE KARŞI');
      KUTU.filter((b) => b.t === 'r').forEach(satir);
      const s = grup(svg, 'isi');
      mk('rect', { x: X0, y, width: Wd, height: 46, rx: 9, class: 'f21-bl-isi f21-bl-cer' }, s);
      ikon(s, 'isi', X0 + 30, y + 24, 1);
      yazi(s, X0 + 62, y + 20, '↓ Isı (ve ses) olarak dağılır', 'f21-bl-dt', {}, Wd - 70);
      yazi(s, X0 + 62, y + 37, 'enerji "boşa" gider', 'f21-bl-dk');
      y += 46;
      // pulmoner fibrozis bağı: parankim satırı ↔ doku satırı (sağ kenar)
      const a = E.yP + RH / 2, b = E.yD + RH / 2;
      E.bag = mk('path', { d: `M${X1 - 4} ${a} H${X1 + 9} V${b} H${X1 - 4}`, class: 'f21-bl-bag' }, svg);
      return y + 6;
    };

    const kur = (dar) => {
      kap.innerHTML = '';
      E = { g: {}, fit: [], dar };
      const svg = mk('svg', { class: 'f21-svg f21-bl' + (dar ? ' dar' : ''), viewBox: `0 0 ${dar ? 360 : 720} 400`, role: 'group', 'aria-label': ARIA }, kap);
      const defs = mk('defs', {}, svg);
      const pat = mk('pattern', { id: 'f21-bl-tarama', width: 5, height: 5, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
      mk('rect', { width: 5, height: 5, class: 'f21-bl-tz' }, pat);
      mk('line', { x1: 0, y1: 0, x2: 0, y2: 5, class: 'f21-bl-tc' }, pat);
      [['f21-bl-ok', 'e'], ['f21-bl-okr', 'r']].forEach(([id, t]) => {
        const m = mk('marker', { id, viewBox: '0 0 10 10', refX: 7, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto' }, defs);
        mk('path', { d: 'M0 0 L10 5 L0 10 Z', class: 'f21-bl-okb ' + t }, m);
      });
      const H = dar ? kurDar(svg) : kurGenis(svg);
      svg.setAttribute('viewBox', `0 0 ${dar ? 360 : 720} ${H}`);
      sigdir();
      uygula();
    };

    const uygula = () => {
      if (!E) return;
      const a = gecici ? { tip: 'oge', k: gecici } : sabit;
      let on = null, c = null;
      if (a.tip === 'has' && a.k !== 'yok') { on = HAS[a.k].on; c = HAS[a.k].c; }
      else if (a.tip === 'oge') { on = [a.k]; c = OGE[a.k].c; }
      for (const k in E.g) {
        const g = E.g[k], v = !!on && on.includes(k);
        g.classList.toggle('on', v); g.classList.toggle('off', !!on && !v);
        if (g.hasAttribute('role')) g.setAttribute('aria-pressed', String(sabit.tip === 'oge' && sabit.k === k));
      }
      if (E.bag) E.bag.style.display = a.tip === 'has' && a.k === 'fibrozis' ? '' : 'none';
      basSec(el, 'h', a.tip === 'has' ? a.k : 'yok');
      capYaz(c);
    };
    const sec = (k) => { sabit = sabit.tip === 'oge' && sabit.k === k ? { tip: 'has', k: 'yok' } : { tip: 'oge', k }; gecici = null; uygula(); };
    const onClick = (e) => {
      const b = e.target.closest('[data-h]');
      if (b && el.contains(b)) { sabit = { tip: 'has', k: b.dataset.h }; gecici = null; uygula(); return; }
      const g = e.target.closest('[data-k]');
      if (g && el.contains(g)) sec(g.dataset.k);
    };
    const onKey = (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const g = e.target.closest && e.target.closest('[data-k]');
      if (!g || !el.contains(g)) return;
      e.preventDefault(); sec(g.dataset.k);
    };
    const onOver = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      const g = e.target.closest('[data-k]');
      const k = g && el.contains(g) ? g.dataset.k : null;
      if (k !== gecici) { gecici = k; uygula(); }
    };
    const onOut = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      const g = e.target.closest('[data-k]'); if (!g) return;
      if (e.relatedTarget && g.contains(e.relatedTarget)) return;
      gecici = null; uygula();
    };
    el.addEventListener('click', onClick);
    el.addEventListener('keydown', onKey);
    el.addEventListener('pointerover', onOver);
    el.addEventListener('pointerout', onOut);

    // dar/geniş yerleşim (bu şemada 11 px etiketler çok: eşik 640 px)
    let dar = null;
    const bak = () => { const d = el.clientWidth < 640; if (d !== dar) { dar = d; kur(d); } };
    const ro = 'ResizeObserver' in window ? new ResizeObserver(bak) : null;
    if (ro) ro.observe(el);
    bak();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!olu) sigdir(); });
    return () => {
      olu = true; if (ro) ro.disconnect();
      el.removeEventListener('click', onClick); el.removeEventListener('keydown', onKey);
      el.removeEventListener('pointerover', onOver); el.removeEventListener('pointerout', onOut);
    };
  };
})();
