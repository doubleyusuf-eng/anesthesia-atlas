/* Fizyoloji Bölüm 35 · Arteriyel basınç dalga biçimleri · bileşenler (K1 s. 155–157).
   Bütün dalgalar tek bir şematik üreteçten (dalga) çizilir; sayılar tarif ve kitapla uyumludur, biçimler temsilîdir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 0) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const gs = (x, m, s) => Math.exp(-(((x - m) / s) ** 2));
  const NS = 'http://www.w3.org/2000/svg';
  const rnd = (() => { let s = 35; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();

  /* ---------- ortak dalga üreteci ----------
     u = siklus içi konum (0–1): 0–tr yükseliş (yarım kosinüs), tr–tn sistolik iniş, tn'de çentik, sonra DBP'ye diyastolik iniş.
     k = 1 keskin çentik (kapak kapanması), k = 0 yumuşak dikrotik dalga (yansıma); bif = çift tepe (bisferiens). */
  const DEF = { T: 1, dbp: 80, sbp: 120, tr: 0.12, tn: 0.35, cY: 100, k: 1, kd: 1.5, sd: 1.0, bif: 0 };
  function dalga(t, p) {
    let u = (t / p.T) % 1; if (u < 0) u += 1;
    let P;
    if (u < p.tr) P = p.dbp + (p.sbp - p.dbp) * (1 - Math.cos(Math.PI * u / p.tr)) / 2;
    else if (u < p.tn) P = p.sbp - (p.sbp - p.cY) * Math.pow((u - p.tr) / (p.tn - p.tr), p.sd);
    else {
      const L = 1 - p.tn, x = u - p.tn, kd = p.kd;
      const f = Math.abs(kd) < 1e-3 ? 1 - x / L : (Math.exp(-kd * x) - Math.exp(-kd * L)) / (1 - Math.exp(-kd * L));
      P = p.dbp + (p.cY - p.dbp) * f;
    }
    const k = p.k;
    P += -4 * k * gs(u, p.tn, 0.012) + (3 + 3 * (1 - k)) * gs(u, p.tn + 0.03 + 0.03 * (1 - k), 0.02 + 0.03 * (1 - k));
    if (p.bif) P += p.bif * (-7 * gs(u, p.tr + 0.05, 0.025) + 2 * gs(u, p.tr + 0.11, 0.03));
    return P;
  }
  function istat(p) {
    let mx = -1e9, mn = 1e9, s = 0; const N = 500;
    for (let i = 0; i < N; i++) { const v = dalga((i / N) * p.T, p); if (v > mx) mx = v; if (v < mn) mn = v; s += v; }
    return { sbp: mx, dbp: mn, map: s / N };
  }
  // MAP'ı hedefe oturtmak için diyastolik iniş katsayısını ayarla (eğri altı alan / siklus süresi)
  function kalibre(p, hedef) {
    let a = -12, b = 25;
    for (let i = 0; i < 40; i++) { const m = (a + b) / 2; if (istat({ ...p, kd: m }).map > hedef) a = m; else b = m; }
    return { ...p, kd: (a + b) / 2 };
  }
  const karis = (a, b, f) => { const o = {}; for (const k in a) o[k] = typeof a[k] === 'number' ? lerp(a[k], b[k], f) : a[k]; return o; };

  /* ---------- ortak SVG yardımcıları ---------- */
  function olcek(o) {
    const X = (t) => o.x0 + ((t - o.t0) / (o.t1 - o.t0)) * (o.x1 - o.x0);
    const Y = (p) => o.y1 - ((p - o.p0) / (o.p1 - o.p0)) * (o.y1 - o.y0);
    return { X, Y };
  }
  // eksen + ızgara; o: {x0,x1,y0,y1,t0,t1,p0,p1,grid,xt,xlab}
  function eksen(o) {
    const { X, Y } = olcek(o);
    let s = '';
    for (const v of o.grid) s += `<line class="f35-grid" x1="${o.x0}" x2="${o.x1}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}"/><text class="f35-tk" x="${o.x0 - 6}" y="${(Y(v) + 4).toFixed(1)}" text-anchor="end">${v}</text>`;
    s += `<line class="f35-ax" x1="${o.x0}" x2="${o.x0}" y1="${o.y0}" y2="${o.y1}"/><line class="f35-ax" x1="${o.x0}" x2="${o.x1}" y1="${o.y1}" y2="${o.y1}"/>`;
    for (const t of o.xt) s += `<text class="f35-tk" x="${X(t).toFixed(1)}" y="${o.y1 + 15}" text-anchor="middle">${fmt(t, Number.isInteger(t) ? 0 : 1)}</text>`;
    if (o.ytit !== false) s += `<text class="f35-tk" transform="translate(${o.yx || 11} ${((o.y0 + o.y1) / 2).toFixed(1)}) rotate(-90)" text-anchor="middle">Basınç (mmHg)</text>`;
    if (o.xtit !== false) s += `<text class="f35-tk" x="${o.x1}" y="${o.y1 + (o.xty || 30)}" text-anchor="end">Zaman (s)</text>`;
    return s;
  }
  const yolDalga = (p, t0, t1, X, Y, n = 160, dx = 0) => {
    let d = '';
    for (let i = 0; i <= n; i++) { const t = t0 + ((t1 - t0) * i) / n; d += (i ? 'L' : 'M') + X(t).toFixed(1) + ' ' + Y(dalga(t - dx, p)).toFixed(1); }
    return d;
  };
  const capYaz = (el, html) => { const c = el.closest('.viz') && el.closest('.viz').querySelector('.viz-cap'); if (c && c.dataset.f35 !== html) { c.dataset.f35 = html; c.innerHTML = REF(html); } };
  const basSec = (root, key, v) => root.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  // genişliğe göre geniş/dar yerleşim; değişince yeniden çizer
  function duzen(el, ciz) {
    let dar = null;
    const bak = () => { const d = (el.clientWidth || 600) < 560; if (d !== dar) { dar = d; ciz(d); } };
    bak();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(bak) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  }
  const oynatBtn = () => (RM ? '' : '<button type="button" class="btn ghost" data-oyn aria-pressed="false">Duraklat</button>');

  /* =========================================================
     1 · Windkessel: aort gerilir, sonra geri yaylanır
     ========================================================= */
  VIZ.f35_windkessel = (el) => {
    const GENC = { ...DEF, sbp: 120, dbp: 80, cY: 100, kd: 1.2, sd: 1.2 };
    const SERT = { ...DEF, sbp: 160, dbp: 70, tr: 0.1, cY: 104, kd: 3.2, sd: 1.0, k: 0.8 };
    let c = 1, oyn = !RM, T = 0, dar = false, G = null, r = {};
    const N = 300, buf = new Float32Array(N).fill(NaN); let sonI = -1;
    const PRT = Array.from({ length: 34 }, () => ({ f: rnd(), o: rnd() * 1.6 - 0.8 }));
    const par = () => karis(SERT, GENC, c);
    const akim = (ph, p) => (ph < p.tn ? 1 : lerp(0.35 * Math.exp(-(ph - p.tn) * 4), 0.65 * Math.exp(-(ph - p.tn) * 0.8), c));
    el.innerHTML = `<div class="f35-ctl">
        <div class="seg" role="group" aria-label="Aort tipi"><button type="button" data-s="1" aria-pressed="true">Genç, esnek aort</button><button type="button" data-s="0" aria-pressed="false">Yaşlı, sert aort</button></div>
        <label class="f35-rng"><span>Aort kompliyansı <b data-o="c"></b></span><input type="range" min="0" max="100" step="1" value="100" aria-label="Aort kompliyansı (sağ yüksek, sol düşük)"></label>
        ${oynatBtn()}
      </div>
      <dl class="f35-kv" data-o="kv"></dl>
      <div class="f35-sv"></div>`;
    const sv = el.querySelector('.f35-sv'), rng = el.querySelector('input[type=range]');
    const kvYaz = () => {
      const s = istat(par());
      el.querySelector('[data-o=kv]').innerHTML = `<div><dt>Atım hacmi</dt><dd>70 mL</dd></div><div><dt>SBP</dt><dd>${fmt(s.sbp)} mmHg</dd></div><div><dt>DBP</dt><dd>${fmt(s.dbp)} mmHg</dd></div><div><dt>Nabız basıncı</dt><dd>${fmt(s.sbp - s.dbp)} mmHg</dd></div>`;
      el.querySelector('[data-o=c]').textContent = c > 0.8 ? 'yüksek' : c > 0.3 ? 'azalmış' : 'düşük';
    };
    const doldur = () => { const p = par(); for (let i = 0; i < N; i++) buf[i] = dalga(i / 100, p); sonI = -1; };
    const ciz = (d) => {
      dar = d;
      G = d
        ? { W: 360, H: 410, lv: [34, 78, 26, 30], vx: 64, x0: 68, x1: 318, yc: 78, R: 15, bmax: 16, v: 110, enY: 136, enX: 193, kinX: 193, ok: [320, 348], dokY: 50, dokX: 356, fz: [8, 22],
            ax: { x0: 44, x1: 292, y0: 186, y1: 350, t0: 0, t1: 3, p0: 60, p1: 170, grid: [60, 80, 100, 120, 140, 160], xt: [0, 1, 2, 3], xty: 30 }, bar: [312, 334], not: 396 }
        : { W: 560, H: 384, lv: [62, 88, 46, 40], vx: 116, x0: 120, x1: 500, yc: 88, R: 20, bmax: 22, v: 160, enY: 30, enX: 310, kinX: 310, ok: [502, 540], dokY: 124, dokX: 521, fz: [10, 22],
            ax: { x0: 52, x1: 470, y0: 184, y1: 330, t0: 0, t1: 3, p0: 60, p1: 170, grid: [60, 80, 100, 120, 140, 160], xt: [0, 1, 2, 3], xty: 30 }, bar: [500, 530], not: 378 };
      const [lx, ly, lrx, lry] = G.lv;
      sv.innerHTML = `<svg class="f35-svg" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="Sol ventrikül, aort kapağı ve esnek aort tüpü; altta aort basıncının zamana göre kaydı ve doku akımı çubuğu">
        <defs><marker id="f35-wk-ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="f35-okuc"/></marker></defs>
        <text class="f35-faz" data-r="faz" x="${G.fz[0]}" y="${G.fz[1]}">Sistol</text>
        <ellipse class="f35-lv" data-r="lv" cx="${lx}" cy="${ly}" rx="${lrx}" ry="${lry}"/>
        <text class="f35-lb f35-lvt" x="${lx}" y="${ly + 5}" text-anchor="middle">LV</text>
        <path class="f35-kan-ic" data-r="ic"/>
        <g data-r="prt"></g>
        <path class="f35-duvar" data-r="du"/><path class="f35-duvar" data-r="da"/>
        <path class="f35-yay" data-r="yay"/>
        <line class="f35-kapak" data-r="k1"/><line class="f35-kapak" data-r="k2"/>
        <line class="f35-okc" x1="${G.ok[0]}" x2="${G.ok[1]}" y1="${G.yc}" y2="${G.yc}" marker-end="url(#f35-wk-ok)"/>
        <text class="f35-tk" x="${G.dokX}" y="${G.dokY}" text-anchor="${d ? 'end' : 'middle'}">dokulara</text>
        <text class="f35-en" data-r="en" x="${G.enX}" y="${G.enY}" text-anchor="middle"></text>
        <text class="f35-kin" data-r="kin" x="${G.kinX}" y="${G.yc + 4}" text-anchor="middle">kinetik enerji</text>
        ${eksen(G.ax)}
        <path class="f35-iz" data-r="iz"/>
        <circle class="f35-imlec" data-r="im" r="4"/>
        <text class="f35-tk" x="${(G.bar[0] + G.bar[1]) / 2}" y="${G.ax.y0 - 6}" text-anchor="middle">${d ? 'akım' : 'doku akımı'}</text>
        <rect class="f35-bar0" x="${G.bar[0]}" y="${G.ax.y0}" width="${G.bar[1] - G.bar[0]}" height="${G.ax.y1 - G.ax.y0}" rx="4"/>
        <rect class="f35-bar" data-r="bar" x="${G.bar[0]}" width="${G.bar[1] - G.bar[0]}" rx="4"/>
        ${d ? `<text class="f35-not" x="${G.W / 2}" y="${G.not}" text-anchor="middle">Kapaklarla birlikte: kesikli pompa</text><text class="f35-not" x="${G.W / 2}" y="${G.not + 16}" text-anchor="middle">→ dokuda sürekli basınç (AC → DC gibi)</text>` : `<text class="f35-not" x="${G.W / 2}" y="${G.not}" text-anchor="middle">Kapaklarla birlikte: kesikli pompa → dokuda sürekli basınç (AC → DC gibi)</text>`}
      </svg>`;
      r = {}; sv.querySelectorAll('[data-r]').forEach((n) => { r[n.dataset.r] = n; });
      r.p = PRT.map(() => { const e = document.createElementNS(NS, 'circle'); e.setAttribute('r', d ? 2.6 : 3); e.setAttribute('class', 'f35-prt'); r.prt.appendChild(e); return e; });
      cizKare(0);
    };
    const { X, Y } = { X: (t) => olcek(G.ax).X(t), Y: (p) => olcek(G.ax).Y(p) };
    function cizKare(dt) {
      const p = par();
      const tt = RM ? p.tn - 0.02 : T, ph = ((tt % 1) + 1) % 1, P = dalga(tt, p), sis = ph < p.tn;
      const nrm = clamp((P - p.dbp) / (p.sbp - p.dbp), 0, 1.1);
      const A = nrm * G.bmax * (0.18 + 0.82 * c);
      const prof = (x) => Math.sin(Math.PI * clamp((x - G.x0) / (G.x1 - G.x0), 0, 1));
      const kas = sis ? Math.sin((Math.PI * ph) / p.tn) : 0;
      const [, , lrx, lry] = G.lv;
      r.lv.setAttribute('rx', (lrx * (1 - 0.12 * kas)).toFixed(1)); r.lv.setAttribute('ry', (lry * (1 - 0.16 * kas)).toFixed(1));
      const acik = sis && ph > 0.004;
      const kx = G.vx, h = G.R;
      if (acik) { r.k1.setAttribute('x1', kx); r.k1.setAttribute('y1', G.yc - h); r.k1.setAttribute('x2', kx + h * 0.9); r.k1.setAttribute('y2', G.yc - h + 3); r.k2.setAttribute('x1', kx); r.k2.setAttribute('y1', G.yc + h); r.k2.setAttribute('x2', kx + h * 0.9); r.k2.setAttribute('y2', G.yc + h - 3); }
      else { r.k1.setAttribute('x1', kx); r.k1.setAttribute('y1', G.yc - h); r.k1.setAttribute('x2', kx + 3); r.k1.setAttribute('y2', G.yc - 1); r.k2.setAttribute('x1', kx); r.k2.setAttribute('y1', G.yc + h); r.k2.setAttribute('x2', kx + 3); r.k2.setAttribute('y2', G.yc + 1); }
      // duvarlar
      let du = '', da = '', ust = [], alt = [];
      for (let x = G.x0; x <= G.x1 + 0.1; x += 8) { const b = A * prof(x); ust.push([x, G.yc - G.R - b]); alt.push([x, G.yc + G.R + b]); }
      ust.forEach(([x, y], i) => { du += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); });
      alt.forEach(([x, y], i) => { da += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); });
      r.du.setAttribute('d', du); r.da.setAttribute('d', da);
      r.ic.setAttribute('d', du + alt.slice().reverse().map(([x, y]) => 'L' + x.toFixed(1) + ' ' + y.toFixed(1)).join('') + 'Z');
      // yaylar: duvar üzerinde zigzag, gerildikçe dişler yassılaşır
      const amp = 5.5 * (1 - 0.75 * clamp(A / G.bmax, 0, 1));
      let yz = ''; const ya = G.x0 + (G.x1 - G.x0) * 0.3, yb = G.x0 + (G.x1 - G.x0) * 0.7, nd = 14;
      for (let i = 0; i <= nd; i++) { const x = lerp(ya, yb, i / nd); const y = G.yc - G.R - A * prof(x) - 5 - (i % 2 ? amp : 0); yz += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); }
      r.yay.setAttribute('d', yz);
      // kan parçacıkları
      const q = akim(ph, p), L = G.x1 - G.x0 - 8;
      PRT.forEach((k, i) => {
        if (!RM && oyn) k.f = (k.f + (q * G.v * dt) / L) % 1;
        const x = G.x0 + 4 + k.f * L, b = A * prof(x);
        r.p[i].setAttribute('cx', x.toFixed(1)); r.p[i].setAttribute('cy', (G.yc + k.o * (G.R + b - 5)).toFixed(1));
      });
      r.faz.textContent = sis ? 'Sistol: kapak açık' : 'Diyastol: kapak kapalı';
      r.en.textContent = sis ? 'potansiyel enerji depolanır' : 'geri yaylanma → kinetik enerji';
      r.kin.style.opacity = sis ? 1 : 0;
      // basınç kaydı (tarama)
      if (!RM && oyn) {
        const i = Math.floor((T % 3) * 100);
        if (sonI < 0) sonI = i;
        let j = sonI;
        while (j !== i) { j = (j + 1) % N; buf[j] = dalga(Math.floor(T / 3) * 3 + j / 100 - (j > i ? 3 : 0), p); }
        sonI = i;
      }
      const cur = RM || !oyn ? -1 : sonI;
      let d = '', pen = false;
      for (let i = 0; i < N; i++) {
        const bosluk = cur >= 0 && ((i - cur + N) % N) > 0 && ((i - cur + N) % N) < 12;
        if (isNaN(buf[i]) || bosluk) { pen = false; continue; }
        d += (pen ? 'L' : 'M') + X(i / 100).toFixed(1) + ' ' + Y(buf[i]).toFixed(1); pen = true;
      }
      r.iz.setAttribute('d', d);
      if (cur >= 0 && !isNaN(buf[cur])) { r.im.setAttribute('cx', X(cur / 100).toFixed(1)); r.im.setAttribute('cy', Y(buf[cur]).toFixed(1)); r.im.style.opacity = 1; } else r.im.style.opacity = 0;
      const bh = (G.ax.y1 - G.ax.y0) * q;
      r.bar.setAttribute('y', (G.ax.y1 - bh).toFixed(1)); r.bar.setAttribute('height', bh.toFixed(1));
    }
    const ayarla = (yeni) => {
      c = clamp(yeni, 0, 1); rng.value = Math.round(c * 100);
      basSec(el, 's', c > 0.5 ? 1 : 0);
      capYaz(el, c > 0.5
        ? '<b>Genç, esnek aort.</b> Sistolde LV yaklaşık 70 mL atım hacmi atar; aort genişler ve basınç 80\'den yalnız 120 mmHg\'ye çıkar. Diyastolde duvar geri yaylanır, akım sürer. Kompliyansı azaltın. [[K1 s. 155]]'
        : '<b>Yaşlı, sert aort.</b> Elastin dejenere olmuştur; aort aynı 70 mL\'yi büyük basınç artışı olmadan karşılayamaz. Sistolik basınç yükselir, diyastolde geri yaylanma zayıftır: yaşlıda sistolik hipertansiyon. [[K1 s. 155]]');
      kvYaz();
      if (RM || !oyn) doldur();
      cizKare(0);
    };
    el.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => ayarla(+b.dataset.s)));
    rng.addEventListener('input', () => ayarla(rng.value / 100));
    const ob = el.querySelector('[data-oyn]');
    if (ob) ob.addEventListener('click', () => { oyn = !oyn; ob.textContent = oyn ? 'Duraklat' : 'Oynat'; ob.setAttribute('aria-pressed', String(!oyn)); if (oyn) sonI = -1; cizKare(0); });
    const temizD = duzen(el, ciz);
    if (RM) doldur();
    kvYaz(); cizKare(0);
    const dur = RM ? () => {} : ticker(el, (dt) => { if (!oyn) return; T += dt; cizKare(dt); });
    return () => { dur(); temizD(); };
  };

  /* =========================================================
     2 · Yayılım: basınç dalgası ≈ 4 m/s, kan ≈ 20 cm/s
     ========================================================= */
  VIZ.f35_yayilim = (el) => {
    const ORAN = 20; // 4 m/s : 0,2 m/s
    let yavas = false, mod = RM ? 'son' : 'kos', tau = 0, s = RM ? 1 : 0, gen = 1, G = null, r = {};
    el.innerHTML = `<div class="f35-ctl"><button type="button" class="btn" data-bir>Bir atım</button>${RM ? '' : '<button type="button" class="btn ghost" data-yav aria-pressed="false">Yavaş çekim (×5)</button>'}</div>
      <div class="f35-sv"></div>
      <div class="f35-yol">
        <div><span>Basınç dalgasının aldığı yol</span><i class="f35-yol-t"><i class="f35-yol-b" data-o="b"></i></i><b data-o="bv"></b></div>
        <div><span>Kanın aldığı yol</span><i class="f35-yol-t"><i class="f35-yol-k" data-o="k"></i></i><b data-o="kv"></b></div>
      </div>`;
    const sv = el.querySelector('.f35-sv');
    const VARSAY = '<b>Bir atım.</b> Basınç dalgası (duvardaki şişkinlik) ≈ 4 m/s, kanın kendisi ortalama 20 cm/s ilerler. Basınç dalgası bilekteki parmağa çoktan ulaşmışken kan aorttan henüz çıkmamıştır. [[K1 s. 155]]';
    const VARDI = '<b>Nabız hissedildi.</b> Parmağın hissettiği, aort duvarının sistolde gerilmesiyle doğan basınç dalgasıdır; akım dalgası değil. Kan bu sürede yolun yalnız yirmide birini aldı. [[K1 s. 155]]';
    const ciz = (d) => {
      G = d
        ? { W: 360, H: 200, x0: 40, x1: 318, yc: 100, R: 8, kalp: [20, 100], dlY: 62, dlC: [100, 230], nbY: 24, nbX: 354, knY: 140, bol: [{ x: 70, t: 'aort' }, { x: 196, t: 'kol arteri' }, { x: 354, t: 'bilek', a: 'end' }], bgY: 180, pm: [306, 322] }
        : { W: 560, H: 200, x0: 58, x1: 504, yc: 96, R: 9, kalp: [30, 96], dlY: 54, dlC: [120, 400], nbY: 24, nbX: 552, knY: 136, bol: [{ x: 110, t: 'aort' }, { x: 300, t: 'kol arteri' }, { x: 552, t: 'radiyal arter (bilek)', a: 'end' }], bgY: 176, pm: [490, 508] };
      const [hx, hy] = G.kalp;
      sv.innerHTML = `<svg class="f35-svg" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="Kalpten bileğe uzanan arter; duvarda ilerleyen basınç dalgası ve içeride çok daha yavaş ilerleyen kan">
        <path class="f35-kalp" d="M${hx} ${hy + 14} C ${hx - 22} ${hy} ${hx - 14} ${hy - 16} ${hx} ${hy - 7} C ${hx + 14} ${hy - 16} ${hx + 22} ${hy} ${hx} ${hy + 14}Z"/>
        <path class="f35-kan-ic" data-r="ic"/>
        <rect class="f35-bolus" data-r="bol" height="${G.R * 2 - 4}" y="${G.yc - G.R + 2}" width="${d ? 12 : 16}" rx="3"/>
        <path class="f35-duvar" data-r="du"/><path class="f35-duvar" data-r="da"/>
        <ellipse class="f35-hale" data-r="hale" cy="${G.yc}" rx="30" ry="${G.R + 14}"/>
        <g data-r="parm" class="f35-parm"><rect x="${G.pm[0]}" y="${G.yc - G.R - 34}" width="11" height="30" rx="5.5"/><rect x="${G.pm[1]}" y="${G.yc - G.R - 32}" width="11" height="28" rx="5.5"/></g>
        <circle class="f35-halka" data-r="halka" cx="${(G.pm[0] + G.pm[1]) / 2 + 5}" cy="${G.yc - G.R - 6}" r="10"/>
        <text class="f35-lb f35-c-crit" data-r="dl" y="${G.dlY}" text-anchor="middle">basınç dalgası ≈ 4 m/s</text>
        <text class="f35-lb f35-c-basic" data-r="kn" y="${G.knY}">kan ≈ 20 cm/s${d ? '' : ' (ortalama aort hızı)'}</text>
        ${d ? `<text class="f35-tk" data-r="kn2" y="${G.knY + 15}">(ortalama aort hızı)</text>` : ''}
        <text class="f35-lb f35-c-acc" data-r="nb" x="${G.nbX}" y="${G.nbY}" text-anchor="end">Nabız hissedildi · radiyal nabız</text>
        ${G.bol.map((b) => `<text class="f35-tk" x="${b.x}" y="${G.bgY}" text-anchor="${b.a || 'middle'}">${b.t}</text>`).join('')}
      </svg>`;
      r = {}; sv.querySelectorAll('[data-r]').forEach((n) => { r[n.dataset.r] = n; });
      cizKare();
    };
    const o = (k) => el.querySelector(`[data-o="${k}"]`);
    function cizKare() {
      const L = G.x1 - G.x0, xb = G.x0 + s * L, kan = s / ORAN;
      let du = '', da = '', alt = [];
      for (let x = G.x0; x <= G.x1 + 0.1; x += 4) {
        const b = gen * 7 * gs(x, xb, 26);
        du += (x === G.x0 ? 'M' : 'L') + x.toFixed(1) + ' ' + (G.yc - G.R - b).toFixed(1);
        alt.push([x, G.yc + G.R + b]);
      }
      alt.forEach(([x, y], i) => { da += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); });
      r.du.setAttribute('d', du); r.da.setAttribute('d', da);
      r.ic.setAttribute('d', du + alt.slice().reverse().map(([x, y]) => 'L' + x.toFixed(1) + ' ' + y.toFixed(1)).join('') + 'Z');
      r.hale.setAttribute('cx', xb.toFixed(1)); r.hale.style.opacity = (0.55 * gen).toFixed(2);
      const bx = G.x0 + 4 + kan * L;
      r.bol.setAttribute('x', bx.toFixed(1));
      r.kn.setAttribute('x', (bx - 4).toFixed(1)); if (r.kn2) r.kn2.setAttribute('x', (bx - 4).toFixed(1));
      r.dl.setAttribute('x', clamp(xb, G.dlC[0], G.dlC[1]).toFixed(1)); r.dl.style.opacity = s >= 1 && mod !== 'kos' ? 0.35 : 1;
      const vardi = s >= 1;
      const atis = mod === 'bek' ? Math.max(0, Math.sin(Math.PI * clamp(tau / 0.45, 0, 1))) : 0;
      r.parm.setAttribute('transform', `translate(0 ${(-4 * atis).toFixed(1)})`);
      r.halka.style.opacity = vardi ? (mod === 'bek' ? 0.4 + 0.6 * atis : 0.5) : 0;
      r.halka.setAttribute('r', (10 + 6 * atis).toFixed(1));
      r.nb.style.opacity = vardi ? 1 : 0;
      o('b').style.width = (s * 100).toFixed(1) + '%'; o('k').style.width = (kan * 100).toFixed(2) + '%';
      o('bv').textContent = '%' + Math.round(s * 100); o('kv').textContent = '%' + fmt(kan * 100, 0);
      capYaz(el, vardi ? VARDI : VARSAY);
    }
    const bas = () => { if (RM) { s = 1; gen = 1; mod = 'son'; } else { mod = 'kos'; tau = 0; s = 0; gen = 1; } cizKare(); };
    el.querySelector('[data-bir]').addEventListener('click', bas);
    const yb = el.querySelector('[data-yav]');
    if (yb) yb.addEventListener('click', () => { yavas = !yavas; yb.setAttribute('aria-pressed', String(yavas)); });
    const temizD = duzen(el, ciz);
    const dur = RM ? () => {} : ticker(el, (dt) => {
      if (mod === 'son') return;
      const f = yavas ? 5 : 1; tau += dt;
      if (mod === 'kos') { s = clamp(tau / (1.2 * f), 0, 1); if (s >= 1) { mod = 'bek'; tau = 0; } }
      else if (mod === 'bek') { if (tau > 1.5 * (yavas ? 2 : 1)) { mod = 'son0'; tau = 0; } }
      else if (mod === 'son0') { gen = clamp(1 - tau / 0.6, 0, 1); if (gen <= 0) mod = 'son'; }
      cizKare();
    });
    return () => { dur(); temizD(); };
  };

  /* =========================================================
     3 · Aort dalga biçimi: adım adım
     ========================================================= */
  VIZ.f35_aort = (el) => {
    const P = { ...DEF, sd: 1.2, kd: 1.4 };
    const ADIM = [
      { t: 1.0, cap: '<b>1 · Diyastol sonu.</b> Basınç dipte, DBP 80 mmHg. Aort kapağı açılmak üzere. İleri düğmesiyle siklusu adım adım izleyin. [[K1 s. 155]]' },
      { t: 1.06, cap: '<b>2 · Aort kapağı açılır.</b> LV\'nin ürettiği basınç atım hacmini aorta atar; kan aorta girdikçe basınç hızla yükselir. [[K1 s. 155]]' },
      { t: 1.12, cap: '<b>3 · Sistolik tepe.</b> Aort içi basınç en yüksek değerine, SBP\'ye (120 mmHg) ulaşır. [[K1 s. 155]]' },
      { t: 1.35, cap: '<b>4 · Dikrotik çentik.</b> Aort kapağı kapanınca eğrinin düzgün inişi kısa bir çentikle kesilir. Sistol burada biter. [[K1 s. 155]]' },
      { t: 1.85, cap: '<b>5 · Diyastol.</b> Kan aorttan dokulara akıp gittikçe basınç yeniden DBP\'ye iner; sonra siklus yinelenir. [[K1 s. 155]]' },
    ];
    let n = 0, otomatik = false, sayac = 0, an = null, mt = 1.0, G = null, r = {}, dar = false;
    el.innerHTML = `<div class="f35-ctl">
        <div class="f35-step" role="group" aria-label="Adımlar"><button type="button" class="btn ghost" data-geri>← Geri</button><span class="f35-stepn" data-o="n" aria-live="polite">Adım 1 / 5</span><button type="button" class="btn" data-ileri>İleri →</button></div>
        ${RM ? '' : '<button type="button" class="btn ghost" data-oto aria-pressed="false">Otomatik</button>'}
      </div><div class="f35-sv"></div>`;
    const sv = el.querySelector('.f35-sv');
    const ciz = (d) => {
      dar = d;
      G = d
        ? { W: 360, H: 400, ax: { x0: 44, x1: 350, y0: 152, y1: 346, t0: 0, t1: 3, p0: 60, p1: 130, grid: [60, 80, 100, 120], xt: [0, 1, 2, 3], xty: 32 }, bandY: 126, sema: 'yatay' }
        : { W: 560, H: 300, ax: { x0: 206, x1: 548, y0: 46, y1: 250, t0: 0, t1: 3, p0: 60, p1: 130, grid: [60, 80, 100, 120], xt: [0, 1, 2, 3], yx: 172, xty: 34 }, bandY: 18, sema: 'dikey' };
      const { X, Y } = olcek(G.ax);
      const a = G.ax;
      const sema = d
        ? `<ellipse class="f35-lv" cx="36" cy="56" rx="28" ry="32"/><text class="f35-lb f35-lvt" x="36" y="61" text-anchor="middle">LV</text>
           <path class="f35-kan-ic" d="M70 40 H190 V72 H70Z"/><line class="f35-duvar" x1="70" x2="190" y1="40" y2="40"/><line class="f35-duvar" x1="70" x2="190" y1="72" y2="72"/>
           <text class="f35-tk" x="130" y="30" text-anchor="middle">aort</text>
           <line class="f35-kapak" data-r="k1"/><line class="f35-kapak" data-r="k2"/><circle class="f35-parla" data-r="par" cx="68" cy="56" r="9"/>
           <line class="f35-okk" data-r="okg" x1="42" x2="104" y1="56" y2="56" marker-end="url(#f35-ao-ok)"/>
           <line class="f35-okk" data-r="okc" x1="150" x2="206" y1="56" y2="56" marker-end="url(#f35-ao-ok)"/>
           <text class="f35-lb" data-r="st1" x="216" y="46"></text><text class="f35-lb" data-r="st2" x="216" y="64"></text>`
        : `<ellipse class="f35-lv" cx="56" cy="168" rx="40" ry="38"/><text class="f35-lb f35-lvt" x="56" y="173" text-anchor="middle">LV</text>
           <path class="f35-kan-ic" d="M40 128 V70 Q40 44 66 44 H148 V76 H76 Q72 76 72 80 V128Z"/>
           <path class="f35-duvar" d="M40 128 V70 Q40 44 66 44 H148"/><path class="f35-duvar" d="M72 128 V80 Q72 76 76 76 H148"/>
           <text class="f35-tk" x="104" y="36" text-anchor="middle">aort</text>
           <line class="f35-kapak" data-r="k1"/><line class="f35-kapak" data-r="k2"/><circle class="f35-parla" data-r="par" cx="56" cy="130" r="10"/>
           <line class="f35-okk" data-r="okg" x1="56" x2="56" y1="178" y2="96" marker-end="url(#f35-ao-ok)"/>
           <line class="f35-okk" data-r="okc" x1="96" x2="150" y1="60" y2="60" marker-end="url(#f35-ao-ok)"/>
           <text class="f35-lb" data-r="st1" x="6" y="232"></text><text class="f35-lb" data-r="st2" x="6" y="248"></text>
           <text class="f35-lb" data-r="st3" x="6" y="270"></text><text class="f35-lb" data-r="st4" x="6" y="286"></text>`;
      sv.innerHTML = `<svg class="f35-svg" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="Aort basıncı dalga biçimi; adım adım diyastol sonu, kapak açılması, sistolik tepe, dikrotik çentik ve diyastol">
        <defs><marker id="f35-ao-ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" class="f35-okuc2"/></marker></defs>
        ${sema}
        <rect class="f35-bant-s" x="${X(1)}" y="${G.bandY}" width="${X(1.35) - X(1)}" height="18" rx="4"/><rect class="f35-bant-d" x="${X(1.35)}" y="${G.bandY}" width="${X(2) - X(1.35)}" height="18" rx="4"/>
        <text class="f35-bt" x="${(X(1) + X(1.35)) / 2}" y="${G.bandY + 13}" text-anchor="middle">Sistol</text><text class="f35-bt" x="${(X(1.35) + X(2)) / 2}" y="${G.bandY + 13}" text-anchor="middle">Diyastol</text>
        ${eksen(a)}
        <path class="f35-egri-sol" d="${yolDalga(P, 0, 3, X, Y, 360)}"/>
        <path class="f35-egri" d="${yolDalga(P, 1, 2, X, Y, 140)}"/>
        <g data-r="e1"><line class="f35-kilav" x1="${X(1)}" x2="${X(1)}" y1="${Y(80)}" y2="${a.y1}"/><text class="f35-lb" x="${X(1) - 6}" y="${Y(73)}" text-anchor="end">DBP 80 mmHg</text></g>
        <g data-r="e2"><line class="f35-kilav f35-acc" x1="${X(1)}" x2="${X(1)}" y1="${Y(127)}" y2="${Y(80)}"/><text class="f35-lb f35-c-acc" x="${X(1) - 5}" y="${Y(126.5)}" text-anchor="end">Aort kapağı açılır</text></g>
        <g data-r="e3"><text class="f35-lb" x="${X(1.12) - 7}" y="${Y(120.5)}" text-anchor="end">SBP 120 mmHg</text></g>
        <g data-r="e4"><line class="f35-kilav f35-acc" x1="${X(1.35)}" x2="${X(1.35)}" y1="${Y(127)}" y2="${Y(100)}"/><text class="f35-lb f35-c-acc" x="${X(1.35) + 5}" y="${Y(126.5)}">Aort kapağı kapanır</text>
          <line class="f35-kilav f35-acc" x1="${X(1.35)}" x2="${X(1.35)}" y1="${Y(93)}" y2="${Y(72)}"/><text class="f35-lb f35-c-acc" x="${X(1.35) + 5}" y="${Y(68)}">Dikrotik çentik</text></g>
        <circle class="f35-isaret" data-r="im" r="6"/>
      </svg>`;
      r = {}; sv.querySelectorAll('[data-r]').forEach((q) => { r[q.dataset.r] = q; });
      goster(true);
    };
    const STAT = ['Basınç artar: kan aorta girer', 'Basınç düşer: kan aorttan çıkar'];
    const imlec = () => { const { X, Y } = olcek(G.ax); r.im.setAttribute('cx', X(mt).toFixed(1)); r.im.setAttribute('cy', Y(dalga(mt, P)).toFixed(1)); };
    function goster(anind) {
      const a = n + 1;
      el.querySelector('[data-o=n]').textContent = `Adım ${a} / 5`;
      el.querySelector('[data-geri]').disabled = n === 0;
      el.querySelector('[data-ileri]').textContent = n === 4 ? 'Başa dön ↺' : 'İleri →';
      ['e1', 'e2', 'e3', 'e4'].forEach((k, i) => { r[k].style.opacity = a >= i + 1 ? 1 : 0; });
      const acik = a === 2 || a === 3;
      const cx = dar ? 66 : 56, cy = dar ? 56 : 130;
      if (dar) {
        if (acik) { r.k1.setAttribute('x1', cx); r.k1.setAttribute('y1', 40); r.k1.setAttribute('x2', cx + 15); r.k1.setAttribute('y2', 43); r.k2.setAttribute('x1', cx); r.k2.setAttribute('y1', 72); r.k2.setAttribute('x2', cx + 15); r.k2.setAttribute('y2', 69); }
        else { r.k1.setAttribute('x1', cx); r.k1.setAttribute('y1', 40); r.k1.setAttribute('x2', cx + 2); r.k1.setAttribute('y2', 55); r.k2.setAttribute('x1', cx); r.k2.setAttribute('y1', 72); r.k2.setAttribute('x2', cx + 2); r.k2.setAttribute('y2', 57); }
      } else {
        if (acik) { r.k1.setAttribute('x1', 40); r.k1.setAttribute('y1', cy); r.k1.setAttribute('x2', 43); r.k1.setAttribute('y2', cy - 15); r.k2.setAttribute('x1', 72); r.k2.setAttribute('y1', cy); r.k2.setAttribute('x2', 69); r.k2.setAttribute('y2', cy - 15); }
        else { r.k1.setAttribute('x1', 40); r.k1.setAttribute('y1', cy); r.k1.setAttribute('x2', 55); r.k1.setAttribute('y2', cy - 2); r.k2.setAttribute('x1', 72); r.k2.setAttribute('y1', cy); r.k2.setAttribute('x2', 57); r.k2.setAttribute('y2', cy - 2); }
      }
      r.par.style.opacity = a === 4 ? 0.9 : 0;
      r.okg.style.opacity = acik ? 1 : 0;
      r.okc.style.opacity = a === 5 ? 1 : 0;
      if (dar) {
        const st = acik ? STAT[0] : a === 5 ? STAT[1] : '';
        const [s1, s2] = st ? st.split(': ') : ['', ''];
        r.st1.textContent = s1 ? s1 + ':' : ''; r.st2.textContent = s2;
        r.st1.setAttribute('class', 'f35-lb ' + (a === 5 ? 'f35-c-basic' : 'f35-c-crit')); r.st2.setAttribute('class', r.st1.getAttribute('class'));
      } else {
        r.st1.textContent = a >= 2 ? 'Basınç artar:' : ''; r.st2.textContent = a >= 2 ? 'kan aorta girer' : '';
        r.st3.textContent = a >= 5 ? 'Basınç düşer:' : ''; r.st4.textContent = a >= 5 ? 'kan aorttan çıkar' : '';
        const on12 = acik ? ' f35-c-crit' : ' f35-soluk', on34 = a === 5 ? ' f35-c-basic' : ' f35-soluk';
        r.st1.setAttribute('class', 'f35-lb' + on12); r.st2.setAttribute('class', 'f35-lb' + on12);
        r.st3.setAttribute('class', 'f35-lb' + on34); r.st4.setAttribute('class', 'f35-lb' + on34);
      }
      if (anind) { mt = ADIM[n].t; an = null; imlec(); }
      capYaz(el, ADIM[n].cap);
    }
    const git = (yeni) => {
      const eski = ADIM[n].t, sar = yeni > 4 || yeni < 0; n = (yeni + 5) % 5;
      if (RM || sar || n === 0) { goster(true); return; }
      an = { a: eski, b: ADIM[n].t, z: 0 };
      goster(false);
    };
    el.querySelector('[data-ileri]').addEventListener('click', () => { sayac = 0; git(n + 1); });
    el.querySelector('[data-geri]').addEventListener('click', () => { sayac = 0; if (n > 0) git(n - 1); });
    const ob = el.querySelector('[data-oto]');
    if (ob) ob.addEventListener('click', () => { otomatik = !otomatik; sayac = 0; ob.setAttribute('aria-pressed', String(otomatik)); ob.textContent = otomatik ? 'Otomatiği durdur' : 'Otomatik'; });
    const temizD = duzen(el, ciz);
    const dur = RM ? () => {} : ticker(el, (dt) => {
      if (otomatik) { sayac += dt; if (sayac >= 2.5) { sayac = 0; git(n + 1); } }
      if (an) { an.z = Math.min(1, an.z + dt / 0.45); const e = an.z < 0.5 ? 2 * an.z * an.z : 1 - 2 * (1 - an.z) ** 2; mt = lerp(an.a, an.b, e); imlec(); if (an.z >= 1) an = null; }
    });
    return () => { dur(); temizD(); };
  };

  /* =========================================================
     4 · Ölçüm yerine göre dalga biçimi (Şekil 35.2 düzeni)
     ========================================================= */
  const YER = [
    { id: 'aort', ad: 'Aort', p: { sbp: 120, dbp: 80, tr: 0.13, cY: 100, k: 1, sd: 1.0 }, map: 93, nk: [85, 74],
      cap: '<b>Aort.</b> Yükseliş görece yavaş, dikrotik çentik keskin ve yüksekte; aort kapağının kapanmasıyla oluşur. Ölçüm yerini distale kaydırın. [[K1 s. 155–156]]' },
    { id: 'brak', ad: 'Brakiyal', p: { sbp: 125, dbp: 78, tr: 0.11, cY: 96, k: 0.7, sd: 1.1 }, map: 93, nk: [121, 96],
      cap: '<b>Brakiyal arter.</b> Yükseliş dikleşmeye, SBP artmaya, DBP azalmaya başladı; MAP değişmedi. [[K1 s. 156]]' },
    { id: 'rad', ad: 'Radiyal', p: { sbp: 130, dbp: 76, tr: 0.09, cY: 90, k: 0.3, sd: 1.25 }, map: 93, nk: [132, 146],
      cap: '<b>Radiyal arter.</b> Daha dik yükseliş, daha yüksek SBP, daha düşük DBP. Çentik aşağı kaydı ve yumuşak bir dikrotik dalgaya dönüştü: kaynağı artık kapak değil, yansımalardır. [[K1 s. 156]]' },
    { id: 'fem', ad: 'Femoral', p: { sbp: 133, dbp: 75, tr: 0.085, cY: 87, k: 0.15, sd: 1.45 }, map: 92, nk: [96, 160],
      cap: '<b>Femoral arter.</b> Aynı eğilim sürer; MAP hâlâ aorttakiyle hemen aynı. [[K1 s. 156]]' },
    { id: 'dp', ad: 'Dorsalis pedis', p: { sbp: 138, dbp: 72, tr: 0.075, cY: 83, k: 0, sd: 1.8 }, map: 92, nk: [122, 284],
      cap: '<b>Dorsalis pedis.</b> En sivri dalga: SBP en yüksek, DBP en düşük, dikrotik dalga eğrinin en aşağısında. MAP görece sabit: kan basıncının en önemli ölçüsü olmasının bir nedeni. [[K1 s. 156]]' },
  ];
  let YERP = null;
  const yerPar = () => (YERP || (YERP = YER.map((y) => kalibre({ ...DEF, ...y.p }, y.map))));

  VIZ.f35_bolge = (el) => {
    const PP = yerPar();
    let sec = 0, cur = PP[0], an = null, G = null, r = {}, dar = false;
    el.innerHTML = `<div class="f35-ctl"><div class="seg" role="group" aria-label="Ölçüm yeri">${YER.map((y, i) => `<button type="button" data-y="${i}" aria-pressed="${i === 0}">${y.ad}</button>`).join('')}</div></div>
      <div class="f35-sv"></div><dl class="f35-kv" data-o="kv"></dl>`;
    const sv = el.querySelector('.f35-sv');
    const ciz = (d) => {
      dar = d;
      G = d ? { W: 360, H: 290, ax: { x0: 44, x1: 330, y0: 14, y1: 250, t0: 0, t1: 2, p0: 60, p1: 145, grid: [60, 80, 100, 120, 140], xt: [0, 1, 2], xty: 32 } }
        : { W: 560, H: 300, ax: { x0: 226, x1: 520, y0: 14, y1: 256, t0: 0, t1: 2, p0: 60, p1: 145, grid: [60, 80, 100, 120, 140], xt: [0, 1, 2], yx: 186, xty: 34 } };
      const { X, Y } = olcek(G.ax);
      const govde = d ? '' : `<g class="f35-govde"><circle cx="85" cy="28" r="15"/><path d="M85 44 V150 M56 60 H114 M56 60 L44 108 L38 146 M114 60 L126 108 L132 146 M85 150 L66 214 L62 278 L48 286 M85 150 L104 214 L110 278 L126 286"/></g>
        ${YER.map((y, i) => `<circle class="f35-nokta" data-n="${i}" cx="${y.nk[0]}" cy="${y.nk[1]}" r="7"><title>${y.ad}</title></circle>`).join('')}
        <text class="f35-tk" data-r="nkad" text-anchor="start"></text>`;
      sv.innerHTML = `<svg class="f35-svg" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="Seçilen ölçüm yerindeki arter basınç dalgası, arkada aort dalgası ve ortalama arter basıncı çizgisi">
        ${govde}
        ${eksen(G.ax)}
        <path class="f35-ref" data-r="ref" d="${yolDalga(PP[0], 0, 2, X, Y, 240)}"/>
        <text class="f35-tk" data-r="refl" x="${X(0.62)}" y="${Y(108)}">aort</text>
        <path class="f35-egri" data-r="eg"/>
        <line class="f35-map" data-r="map" x1="${G.ax.x0}" x2="${G.ax.x1}"/>
        <text class="f35-lb f35-c-ok" data-r="mapl" x="${G.ax.x1}" text-anchor="end"></text>
        <line class="f35-kilav f35-acc" data-r="ckl"/><circle class="f35-centik" data-r="ck" r="6"/>
        <text class="f35-lb f35-c-acc" data-r="ckt"></text>
      </svg>`;
      r = {}; sv.querySelectorAll('[data-r]').forEach((q) => { r[q.dataset.r] = q; });
      sv.querySelectorAll('[data-n]').forEach((q) => q.addEventListener('click', () => sec_(+q.dataset.n)));
      cizKare();
    };
    function cizKare() {
      const { X, Y } = olcek(G.ax);
      const s = istat(cur);
      r.eg.setAttribute('d', yolDalga(cur, 0, 2, X, Y, 260));
      const aortSecili = sec === 0 && !an;
      r.ref.style.opacity = aortSecili ? 0 : 1; r.refl.style.opacity = aortSecili ? 0 : 1;
      r.map.setAttribute('y1', Y(s.map).toFixed(1)); r.map.setAttribute('y2', Y(s.map).toFixed(1));
      r.mapl.setAttribute('y', (Y(s.map) - 6).toFixed(1)); r.mapl.textContent = `MAP ${fmt(s.map)}`;
      // çentik/dikrotik dalga noktası: keskin çentikte çukur, yumuşakta dalganın başı
      const tc = cur.tn + (1 - cur.k) * 0.01, pc = dalga(tc, cur);
      r.ck.setAttribute('cx', X(tc).toFixed(1)); r.ck.setAttribute('cy', Y(pc).toFixed(1));
      r.ckl.setAttribute('x1', X(tc).toFixed(1)); r.ckl.setAttribute('x2', X(tc).toFixed(1)); r.ckl.setAttribute('y1', (Y(pc) + 7).toFixed(1)); r.ckl.setAttribute('y2', Y(66.5).toFixed(1));
      r.ckt.setAttribute('x', (X(tc) - 4).toFixed(1)); r.ckt.setAttribute('y', Y(62).toFixed(1));
      r.ckt.textContent = cur.k > 0.5 ? (dar ? 'Dikrotik çentik (kapak kapanır)' : 'Dikrotik çentik (aort kapağı kapanır)') : 'Dikrotik dalga (yansıma)';
      el.querySelector('[data-o=kv]').innerHTML = `<div><dt>SBP</dt><dd>${fmt(s.sbp)}</dd></div><div><dt>DBP</dt><dd>${fmt(s.dbp)}</dd></div><div><dt>MAP</dt><dd>${fmt(s.map)}</dd></div><div><dt>Nabız basıncı</dt><dd>${fmt(s.sbp - s.dbp)} <small>mmHg</small></dd></div>`;
      if (!dar) {
        sv.querySelectorAll('[data-n]').forEach((q) => q.classList.toggle('on', +q.dataset.n === sec));
        const y = YER[sec];
        r.nkad.textContent = y.ad; r.nkad.setAttribute('x', y.nk[0] + (sec === 2 || sec === 4 ? -12 : 12)); r.nkad.setAttribute('y', y.nk[1] + (sec === 4 ? -12 : 4));
        r.nkad.setAttribute('text-anchor', sec === 2 || sec === 4 ? 'end' : 'start');
      }
    }
    function sec_(i) {
      if (i === sec && !an) return;
      const bas = cur; sec = i; basSec(el, 'y', i);
      capYaz(el, YER[i].cap);
      if (RM) { cur = PP[i]; an = null; cizKare(); return; }
      an = { a: bas, b: PP[i], z: 0 };
    }
    el.querySelectorAll('[data-y]').forEach((b) => b.addEventListener('click', () => sec_(+b.dataset.y)));
    const temizD = duzen(el, ciz);
    const dur = RM ? () => {} : ticker(el, (dt) => {
      if (!an) return;
      an.z = Math.min(1, an.z + dt / 0.4);
      cur = karis(an.a, an.b, an.z * an.z * (3 - 2 * an.z));
      if (an.z >= 1) { cur = an.b; an = null; }
      cizKare();
    });
    return () => { dur(); temizD(); };
  };

  /* =========================================================
     5 · Karakteristik dalga biçimleri (Şekil 35.3a)
     ========================================================= */
  const MOR = [
    { id: 'n', ad: '"Normal"', p: { sbp: 120, dbp: 80, tr: 0.12, cY: 100, k: 1, sd: 1.2, kd: 1.4 },
      et: [['egim', 'Yükseliş eğimi = kontraktilite'], ['centik', 'İniş ve çentik = SVR']],
      cap: '<b>"Normal".</b> Yükselişin eğimi kontraktiliteyi, inişin biçimi ve dikrotik çentiğin yüksekliği SVR\'yi yansıtır. Bir durum seçin. [[K1 s. 156–157]]' },
    { id: 'as', ad: 'Aort darlığı', p: { sbp: 105, dbp: 80, tr: 0.24, tn: 0.4, cY: 95, k: 0.6, sd: 1.4, kd: 1.4 },
      et: [['egim', 'Yükseliş eğimi azalmış'], ['pp', 'Nabız basıncı azalmış']],
      cap: '<b>Aort darlığı.</b> Yükselişin eğimi bazen azalır: birim zamanda daha az basınç üretilir gibi görünür. Nabız basıncı düşüktür. [[K1 s. 156–157]]' },
    { id: 'ar', ad: 'Aort yetmezliği', p: { sbp: 130, dbp: 60, tr: 0.08, tn: 0.38, cY: 80, k: 0.4, sd: 3, kd: 1.6, bif: 1 },
      et: [['bifid', 'Çift tepeli (bisferiens) dalga'], ['pp', 'Nabız basıncı artmış']],
      cap: '<b>Aort yetmezliği.</b> Kontraktilite genellikle normaldir; dalga çoğu kez çift tepeli (bisferiens) görünür ve nabız basıncı geniştir. [[K1 s. 156–157]]' },
    { id: 'ds', ad: 'Düşük SVR', p: { sbp: 115, dbp: 65, tr: 0.1, tn: 0.3, cY: 82, k: 1, sd: 0.8, kd: 3.5 },
      et: [['inis', 'Dik iniş'], ['centik', 'Alçak dikrotik çentik']],
      cap: '<b>Düşük SVR.</b> İniş diktir, dikrotik çentik aşağıdadır; dalga ince ve sivri görünür. [[K1 s. 156–157]]' },
    { id: 'ys', ad: 'Yüksek SVR', p: { sbp: 130, dbp: 90, tr: 0.12, tn: 0.36, cY: 112, k: 1, sd: 1.4, kd: 0.6 },
      et: [['centik', 'Yüksek dikrotik çentik']],
      cap: '<b>Yüksek SVR.</b> Dikrotik çentik yüksektedir; iniş yavaştır. [[K1 s. 156–157]]' },
  ];
  VIZ.f35_morfoloji = (el) => {
    const PM = MOR.map((m) => ({ ...DEF, ...m.p }));
    let sec = 0, G = null, r = {}, dar = false;
    const T0 = -0.15, T1 = 1.0;
    const mini = (p) => { const X = (t) => 4 + ((t - T0) / (T1 - T0)) * 82, Y = (v) => 46 - ((v - 55) / 80) * 42; return yolDalga(p, T0, T1, X, Y, 80); };
    el.innerHTML = `<div class="f35-ctl"><div class="seg" role="group" aria-label="Dalga biçimi">${MOR.map((m, i) => `<button type="button" data-m="${i}" aria-pressed="${i === 0}">${m.ad}</button>`).join('')}</div></div>
      <div class="f35-sv"></div>
      <div class="f35-mini" aria-hidden="true">${MOR.map((m, i) => `<button type="button" tabindex="-1" data-mm="${i}"><svg viewBox="0 0 90 50"><path class="f35-mini-ref" d="${mini(PM[0])}"/><path class="f35-mini-e" d="${mini(PM[i])}"/></svg><span>${m.ad}</span></button>`).join('')}</div>`;
    const sv = el.querySelector('.f35-sv');
    const ciz = (d) => {
      dar = d;
      el.querySelector('.f35-mini').hidden = d;
      G = d ? { W: 360, H: 300, ax: { x0: 44, x1: 302, y0: 12, y1: 256, t0: T0, t1: T1, p0: 50, p1: 145, grid: [60, 80, 100, 120, 140], xt: [0, 0.5, 1], xty: 32 }, br: 318 }
        : { W: 560, H: 290, ax: { x0: 56, x1: 470, y0: 12, y1: 248, t0: T0, t1: T1, p0: 50, p1: 145, grid: [60, 80, 100, 120, 140], xt: [0, 0.5, 1], xty: 32 }, br: 490 };
      const { X, Y } = olcek(G.ax);
      sv.innerHTML = `<svg class="f35-svg" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="Seçilen karakteristik arter dalga biçimi, arkada normal dalga">
        ${eksen(G.ax)}
        <path class="f35-ref" d="${yolDalga(PM[0], T0, T1, X, Y, 240)}"/>
        <text class="f35-tk f35-halo" data-r="refl" x="${X(0.9)}" y="${Y(dalga(0.9, PM[0])) - 7}" text-anchor="middle">normal</text>
        <path class="f35-egri-k" data-r="eg"/>
        <line class="f35-egim" data-r="egim"/>
        <g data-r="pp"><path class="f35-par" data-r="ppb"/><text class="f35-lb" data-r="ppt" text-anchor="middle"></text></g>
        <circle class="f35-centik" data-r="ck" r="6"/>
        <line class="f35-kilav f35-acc" data-r="l1"/><text class="f35-lb f35-c-acc" data-r="t1"></text>
        <line class="f35-kilav f35-acc" data-r="l2"/><text class="f35-lb f35-c-acc" data-r="t2"></text>
      </svg>`;
      r = {}; sv.querySelectorAll('[data-r]').forEach((q) => { r[q.dataset.r] = q; });
      cizKare();
    };
    function cizKare() {
      const { X, Y } = olcek(G.ax), p = PM[sec], m = MOR[sec], s = istat(p);
      r.eg.setAttribute('d', yolDalga(p, T0, T1, X, Y, 300));
      r.refl.style.opacity = sec === 0 ? 0 : 1;
      // en dik yükseliş noktası ve teğeti (piksel uzayında)
      let tb = 0, eb = 0;
      for (let t = 0.002; t < p.tr; t += 0.002) { const e = dalga(t + 0.001, p) - dalga(t - 0.001, p); if (e > eb) { eb = e; tb = t; } }
      const ex = X(tb), ey = Y(dalga(tb, p)), sx = X(tb + 0.001) - X(tb - 0.001), sy = Y(dalga(tb + 0.001, p)) - Y(dalga(tb - 0.001, p));
      const ln = Math.hypot(sx, sy), ux = sx / ln, uy = sy / ln, Lh = 34;
      const egimVar = m.et.some(([k]) => k === 'egim');
      r.egim.setAttribute('x1', (ex - ux * Lh).toFixed(1)); r.egim.setAttribute('y1', (ey - uy * Lh).toFixed(1));
      r.egim.setAttribute('x2', (ex + ux * Lh).toFixed(1)); r.egim.setAttribute('y2', (ey + uy * Lh).toFixed(1));
      r.egim.style.opacity = egimVar ? 1 : 0;
      // nabız basıncı parantezi
      const ppVar = m.et.some(([k]) => k === 'pp') || sec === 0;
      const bx = G.br, yt = Y(s.sbp), yb = Y(s.dbp);
      r.ppb.setAttribute('d', `M${bx - 6} ${yt.toFixed(1)}H${bx}V${yb.toFixed(1)}H${bx - 6}`);
      r.ppt.setAttribute('x', bx + (dar ? 18 : 26)); r.ppt.setAttribute('y', ((yt + yb) / 2 + 4).toFixed(1));
      r.ppt.textContent = fmt(s.sbp - s.dbp);
      r.pp.style.opacity = ppVar ? 1 : 0.35;
      // dikrotik çentik halkası
      const tc = p.tn, pc = dalga(tc, p);
      r.ck.setAttribute('cx', X(tc).toFixed(1)); r.ck.setAttribute('cy', Y(pc).toFixed(1));
      r.ck.style.opacity = m.et.some(([k]) => k === 'centik') || sec === 0 ? 1 : 0.35;
      // etiketler: üst sol (eğim/çift tepe/iniş), çentik yanı, üst sağ (nabız basıncı)
      const yaz = (i, tur, metin) => {
        const t = r['t' + i], l = r['l' + i];
        t.textContent = metin; t.setAttribute('text-anchor', 'start'); l.style.opacity = 1;
        const ust1 = Y(141), ust2 = Y(134);
        if (tur === 'egim' || tur === 'inis' || tur === 'bifid') {
          let ax, ay;
          if (tur === 'egim') { ax = ex + ux * 10; ay = ey + uy * 10; }
          else if (tur === 'bifid') { ax = X(p.tr + 0.05); ay = Y(dalga(p.tr + 0.05, p)) - 4; }
          else { const tt = (p.tr + p.tn) / 2; ax = X(tt); ay = Y(dalga(tt, p)); }
          const tx = Math.max(G.ax.x0 + 6, ax - 10);
          t.setAttribute('x', tx.toFixed(1)); t.setAttribute('y', ust1.toFixed(1));
          l.setAttribute('x1', ax.toFixed(1)); l.setAttribute('y1', (ay - 3).toFixed(1)); l.setAttribute('x2', (tx + 6).toFixed(1)); l.setAttribute('y2', (ust1 + 4).toFixed(1));
        } else if (tur === 'pp') {
          t.setAttribute('text-anchor', 'end'); const tx = G.br - 10, ty = dar ? ust2 + 12 : ust1;
          t.setAttribute('x', tx); t.setAttribute('y', ty.toFixed(1));
          l.style.opacity = 0;
        } else { // çentik
          const cx = X(tc), cy = Y(pc), tx = cx + 18, ty = cy - 30;
          t.setAttribute('x', tx.toFixed(1)); t.setAttribute('y', ty.toFixed(1));
          l.setAttribute('x1', (cx + 4).toFixed(1)); l.setAttribute('y1', (cy - 5).toFixed(1)); l.setAttribute('x2', (tx + 4).toFixed(1)); l.setAttribute('y2', (ty + 4).toFixed(1));
        }
      };
      [1, 2].forEach((i) => { const e = m.et[i - 1]; if (e) yaz(i, e[0], e[1]); else { r['t' + i].textContent = ''; r['l' + i].style.opacity = 0; } });
      el.querySelectorAll('[data-mm]').forEach((b) => b.classList.toggle('on', +b.dataset.mm === sec));
    }
    const sec_ = (i) => { sec = i; basSec(el, 'm', i); capYaz(el, MOR[i].cap); cizKare(); };
    el.querySelectorAll('[data-m]').forEach((b) => b.addEventListener('click', () => sec_(+b.dataset.m)));
    el.querySelectorAll('[data-mm]').forEach((b) => b.addEventListener('click', () => sec_(+b.dataset.mm)));
    const temizD = duzen(el, ciz);
    return () => { temizD(); };
  };

  /* =========================================================
     6 · PPV altında solunumsal salınım (Şekil 35.3b)
     ========================================================= */
  VIZ.f35_solunum = (el) => {
    const TB = 60 / 72, NB = 18, TS = 15;
    // durak değerleri: tepe ortası, tepe yarı genliği, DBP ortası, DBP'nin salınıma katılım oranı
    const DUR = [{ sm: 120, sa: 2, dm: 80, dr: 0.5 }, { sm: 114, sa: 6, dm: 78, dr: 0.65 }, { sm: 106.5, sa: 11.5, dm: 75, dr: 0.7 }];
    let v = 0, oyn = !RM, tz = 0, G = null, r = {}, dar = false, model = null;
    // solunum fazı: −1 (≈7. s, ekspiryum başı) → +1 (5. s, inspiryum sonu); yükselme 8 s, düşüş 2 s
    const faz = (t) => {
      const u = ((t % 10) + 10) % 10;
      if (u >= 5 && u < 7) return Math.cos((Math.PI * (u - 5)) / 2);
      const x = (u >= 7 ? u - 7 : u + 3) / 8; return -Math.cos(Math.PI * x);
    };
    const durak = () => { const f = v * 2, i = Math.min(1, Math.floor(f)), q = f - i; const a = DUR[i], b = DUR[i + 1]; return { sm: lerp(a.sm, b.sm, q), sa: lerp(a.sa, b.sa, q), dm: lerp(a.dm, b.dm, q), dr: lerp(a.dr, b.dr, q) }; };
    const kur = () => {
      const d = durak(), at = [];
      for (let i = 0; i < NB; i++) {
        const t0 = i * TB, f = faz(t0 + TB * 0.12);
        const sbp = d.sm + d.sa * f, dbp = d.dm + d.sa * d.dr * f;
        const p = { ...DEF, T: TB, sbp, dbp, cY: dbp + (sbp - dbp) * 0.5, tr: 0.15, tn: 0.4, sd: 1.2, kd: 1.4 };
        // sistolik alan: yükselişten çentiğe, atım başı basıncının üstü
        let A = 0; const n = 60; for (let j = 0; j < n; j++) { const t = (j / n) * p.tn * TB; A += Math.max(0, dalga(t, p) - dbp); } A *= (p.tn * TB) / n;
        at.push({ t0, p, A, sbp, dbp });
      }
      const ilk = at.filter((a) => a.t0 < 10);
      const b1 = ilk.reduce((m, a) => (a.A > m.A ? a : m)), b2 = ilk.reduce((m, a) => (a.A < m.A ? a : m));
      const ort = ilk.reduce((s, a) => s + a.A, 0) / ilk.length;
      const sp = Math.max(...ilk.map((a) => a.sbp)) - Math.min(...ilk.map((a) => a.sbp));
      model = { at, b1, b2, svv: ((b1.A - b2.A) / ort) * 100, sp };
    };
    const P = (t) => { const i = clamp(Math.floor(t / TB), 0, NB - 1), a = model.at[i]; return dalga(t - a.t0, a.p); };
    el.innerHTML = `<div class="f35-ctl">
        <label class="f35-rng f35-rng-g"><span>Damar içi volüm <b data-o="vad"></b></span><input type="range" min="0" max="100" step="1" value="0" aria-label="Damar içi volüm (sol normovolemi, sağ belirgin hipovolemi)"><em class="f35-rng-u"><i>Normovolemi</i><i>Belirgin hipovolemi</i></em></label>
        ${oynatBtn()}
      </div>
      <dl class="f35-kv" data-o="kv"></dl>
      <div class="f35-sv"></div>`;
    const sv = el.querySelector('.f35-sv'), rng = el.querySelector('input[type=range]');
    const ciz = (d) => {
      dar = d;
      G = d ? { W: 360, H: 330, ax: { x0: 40, x1: 352, y0: 34, y1: 240, t0: 0, t1: TS, p0: 60, p1: 130, grid: [60, 80, 100, 120], xt: [0, 5, 10, 15], xtit: false }, vy: [270, 290], fy: 24 }
        : { W: 560, H: 312, ax: { x0: 52, x1: 548, y0: 34, y1: 240, t0: 0, t1: TS, p0: 60, p1: 130, grid: [60, 80, 100, 120], xt: [0, 5, 10, 15], xtit: false }, vy: [268, 288], fy: 24 };
      const { X } = olcek(G.ax), a = G.ax;
      const bant = (t0, t1, ins) => `<rect class="${ins ? 'f35-bant-i' : 'f35-bant-e'}" x="${X(t0)}" y="${a.y0 - 22}" width="${X(t1) - X(t0)}" height="${a.y1 - a.y0 + 22}"/><text class="f35-bt" x="${(X(t0) + X(t1)) / 2}" y="${G.fy - 6}" text-anchor="middle">${ins ? 'İnspiryum' : 'Ekspiryum'}</text>`;
      sv.innerHTML = `<svg class="f35-svg" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="Pozitif basınçlı ventilasyon sırasında 15 saniyelik arter basıncı kaydı; inspiryum ve ekspiryum bantları, en büyük ve en küçük sistolik alanlar">
        ${bant(0, 5, true)}${bant(5, 10, false)}${bant(10, 15, true)}
        ${eksen(G.ax)}
        <path class="f35-alan1" data-r="a1"/><path class="f35-alan2" data-r="a2"/>
        <path class="f35-egri-gec" data-r="egs"/><path class="f35-egri" data-r="eg"/>
        <path class="f35-zarf" data-r="zarf"/>
        <line class="f35-tarama" data-r="tar" y1="${a.y0 - 22}" y2="${a.y1}"/>
        <line class="f35-kilav f35-acc" data-r="l1"/><text class="f35-lb f35-c-acc" data-r="t1" text-anchor="end"></text>
        <line class="f35-kilav f35-basic" data-r="l2"/><text class="f35-lb f35-c-basic" data-r="t2"></text>
        <path class="f35-vent" d="M${X(0)} ${G.vy[0]} H${X(5)} V${G.vy[1]} H${X(10)} V${G.vy[0]} H${X(15)}"/>
        <text class="f35-tk" x="${X(7.5)}" y="${G.vy[0] + 4}" text-anchor="middle">PPV</text>
        <text class="f35-tk" x="${a.x0}" y="${G.vy[1] + 18}">${d ? 'Havayolu basıncı (PPV)' : 'Havayolu basıncı: pozitif basınçlı ventilasyon'}</text>
        <text class="f35-tk" x="${X(12.5)}" y="${a.y1 + 15}" text-anchor="middle">Zaman (s)</text>
      </svg>`;
      r = {}; sv.querySelectorAll('[data-r]').forEach((q) => { r[q.dataset.r] = q; });
      statik(); kare();
    };
    function statik() {
      const { X, Y } = olcek(G.ax);
      // tepe zarfı
      r.zarf.setAttribute('d', model.at.map((a, i) => (i ? 'L' : 'M') + X(a.t0 + a.p.tr * TB).toFixed(1) + ' ' + Y(a.sbp).toFixed(1)).join(''));
      const alan = (b) => { let d = `M${X(b.t0).toFixed(1)} ${Y(b.dbp).toFixed(1)}`; const t1 = b.p.tn * TB; for (let j = 0; j <= 30; j++) { const t = (j / 30) * t1; d += 'L' + X(b.t0 + t).toFixed(1) + ' ' + Y(dalga(t, b.p)).toFixed(1); } return d + `L${X(b.t0 + t1).toFixed(1)} ${Y(b.dbp).toFixed(1)}Z`; };
      r.a1.setAttribute('d', alan(model.b1)); r.a2.setAttribute('d', alan(model.b2));
      const ly = Y(63), m1 = X(model.b1.t0 + 0.15), m2 = X(model.b2.t0 + 0.15);
      r.t1.textContent = dar ? 'Alan 1' : 'Alan 1 (en büyük atım hacmi)'; r.t1.setAttribute('x', (m1 + 8).toFixed(1)); r.t1.setAttribute('y', ly.toFixed(1));
      r.t2.textContent = dar ? 'Alan 2' : 'Alan 2 (en küçük)'; r.t2.setAttribute('x', (m2 - 8).toFixed(1)); r.t2.setAttribute('y', ly.toFixed(1));
      r.l1.setAttribute('x1', m1); r.l1.setAttribute('x2', m1 + 4); r.l1.setAttribute('y1', Y(model.b1.dbp + 4)); r.l1.setAttribute('y2', ly - 12);
      r.l2.setAttribute('x1', m2); r.l2.setAttribute('x2', m2 - 4); r.l2.setAttribute('y1', Y(model.b2.dbp + 4)); r.l2.setAttribute('y2', ly - 12);
      el.querySelector('[data-o=kv]').innerHTML = `<div><dt>Sistolik basınç salınımı</dt><dd>${fmt(model.sp)} mmHg</dd></div><div><dt>SVV</dt><dd>%${fmt(model.svv)}</dd></div>${dar ? '<div class="f35-kv-not"><dt>Alan 1 / Alan 2</dt><dd>en büyük / en küçük atım hacmi</dd></div>' : ''}`;
      el.querySelector('[data-o=vad]').textContent = v < 0.25 ? 'normovolemi' : v < 0.75 ? 'hafif hipovolemi' : 'belirgin hipovolemi';
    }
    function kare() {
      const { X, Y } = olcek(G.ax);
      const son = RM ? TS : tz;
      let d1 = '', d2 = ''; const n = 600;
      for (let i = 0; i <= n; i++) { const t = (TS * i) / n, k = X(t).toFixed(1) + ' ' + Y(P(t)).toFixed(1); if (t <= son) d1 += (d1 ? 'L' : 'M') + k; else d2 += (d2 ? 'L' : 'M') + k; }
      r.eg.setAttribute('d', d1); r.egs.setAttribute('d', d2);
      r.tar.style.opacity = RM ? 0 : 1; r.tar.setAttribute('x1', X(son).toFixed(1)); r.tar.setAttribute('x2', X(son).toFixed(1));
    }
    const ayarla = () => {
      v = rng.value / 100; kur(); statik(); kare();
      capYaz(el, v < 0.25
        ? '<b>Normovolemi.</b> Sistolik tepeler solunumla az değişir. Volümü azaltın: inspiryum ve ekspiryum arasında atımdan atıma fark büyür. Alan 1 en büyük, Alan 2 en küçük atım hacmidir. [[K1 s. 156–157]]'
        : v < 0.75 ? '<b>Hipovolemi.</b> Pozitif basınçlı solunum önyükü siklus boyunca değiştirir; sistolik basınç atımdan atıma salınır. Bu salınım hipovolemi göstergesidir. [[K1 s. 156]]'
          : '<b>Belirgin hipovolemi.</b> Salınım büyüdü; Alan 1 ile Alan 2 arasındaki fark, yani atım hacmi değişimi (SVV) arttı. Sistolik alan atım hacmiyle orantılıdır; nabız kontur analizi kalp debisini buradan hesaplar (Bölüm 29). [[K1 s. 156–157]]');
    };
    rng.addEventListener('input', ayarla);
    const ob = el.querySelector('[data-oyn]');
    if (ob) ob.addEventListener('click', () => { oyn = !oyn; ob.textContent = oyn ? 'Duraklat' : 'Oynat'; ob.setAttribute('aria-pressed', String(!oyn)); });
    kur();
    const temizD = duzen(el, ciz);
    const dur = RM ? () => {} : ticker(el, (dt) => { if (!oyn) return; tz = (tz + dt) % (TS + 0.6); kare(); });
    return () => { dur(); temizD(); };
  };

  // test/doğrulama için dışa açık (yalnız okuma)
  window.D35_MODEL = { dalga, istat, yerPar, YER, MOR };
})();
