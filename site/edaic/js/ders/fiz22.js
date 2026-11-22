/* Fizyoloji Bölüm 22 · Ventilasyonun kontrolü · bileşenler (K1 s. 93–96). Tarif: docs/tasarim/fiz22.md
   Bileşen yalnız data-viz öğesine çizer; açıklamayı sayfadaki .viz-cap'e yazar. Modeller şematiktir (viz-foot).
   Renk sözlüğü: O₂/arteriyel --crit · CO₂ --accent · H⁺ --warn · normal --ok · sinir/vagus --c-basic · anestezik --c-clin */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const fmt = (v, d = 1) => (Math.abs(v) < 0.5 * Math.pow(10, -d) ? 0 : v).toFixed(d).replace('.', ',');
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (root, key, v) => root.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const T = (x, y, s, cls, ek) => `<text x="${x}" y="${y}"${cls ? ` class="${cls}"` : ''}${ek ? ' ' + ek : ''}>${s}</text>`;
  const R = (x, y, w, h, rx, cls, ek) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"${cls ? ` class="${cls}"` : ''}${ek ? ' ' + ek : ''}/>`;
  const MID = 'text-anchor="middle"', END = 'text-anchor="end"';
  const okMarker = (id, cls) => `<marker id="${id}" class="${cls}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z"/></marker>`;
  /* sayfadaki .viz-cap'e yaz (yalnız metin değişince) */
  function capOf(el) {
    const viz = el.closest('.viz'), c = viz ? viz.querySelector('.viz-cap') : null;
    let son = null;
    return { yaz(h) { if (!c || h === son) return; c.innerHTML = REF(h); son = h; } };
  }
  /* dar/geniş yerleşim: el.clientWidth < 520 değişince cb(dar) */
  function genislik(el, cb) {
    let dar = null;
    const bak = () => { const d = el.clientWidth < 520; if (d !== dar) { dar = d; cb(d); } };
    const ro = 'ResizeObserver' in window ? new ResizeObserver(bak) : null;
    if (ro) ro.observe(el);
    bak();
    return () => { if (ro) ro.disconnect(); };
  }
  /* kısa geçiş: hedef değerlere ease-out ile kayar; RM'de anında */
  function yumusak(uygula) {
    let cur = null, bas = null, hedef = null, raf = 0, t0 = 0, sure = 600;
    const adim = (t) => {
      const f = Math.min(1, (t - t0) / sure), e = 1 - Math.pow(1 - f, 3);
      for (const k in hedef) cur[k] = lerp(bas[k] === undefined ? hedef[k] : bas[k], hedef[k], e);
      uygula(cur);
      raf = f < 1 ? requestAnimationFrame(adim) : 0;
    };
    return {
      set(h, ms = 600) {
        hedef = Object.assign({}, h); sure = ms;
        if (!cur || RM || !ms) { cancelAnimationFrame(raf); raf = 0; cur = Object.assign({}, hedef); uygula(cur); return; }
        bas = Object.assign({}, cur); t0 = performance.now();
        if (!raf) raf = requestAnimationFrame(adim);
      },
      tazele() { if (cur) uygula(cur); },
      dur() { cancelAnimationFrame(raf); raf = 0; },
    };
  }
  /* çoklu doğru üzerinde uzunluğa göre nokta */
  function yol(pts) {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const top = L[L.length - 1];
    return {
      top,
      at(s) {
        s = clamp(s, 0, top);
        let i = 1; while (i < L.length - 1 && L[i] < s) i++;
        const f = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
        return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)];
      },
    };
  }
  const bezier = (p0, p1, p2, p3, n) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k]);
  });
  const dYol = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const satir = (lines, x, y, dy, cls, ek) => lines.map((s, i) => T(x, y + i * dy, s, cls, ek)).join('');

  /* ================= 1 · Döngü ve dört bölge ================= */
  VIZ.f22_devre = (el) => {
    const cap = capOf(el);
    const ADIM = {
      1: { ad: '1 · Döngü', A: 14, T: 4, a: 0.42, k: 0, bolge: null, efe: '', c: "<b>Döngü.</b> PaCO₂ artışı algılayıcılarda saptanır, beyin sapındaki solunum çekirdeklerinde bütünleştirilir, solunum kaslarına iletilir; artan alveoler ventilasyon PaCO₂'yi ayar noktasına geri götürür. Algılayıcılar, kontrol merkezi ve efektörler her geri bildirim döngüsünün üç öğesidir. [[K1 s. 93]]" },
      2: { ad: '2 · DRG', A: 14, T: 4, a: 0.42, k: 0, bolge: 'drg', efe: 'dia', cip: ['normal tidal', 'inspirasyon'], c: '<b>Dorsal solunum grubu (DRG).</b> Öncelikle diyaframı kontrol eder; normal tidal inspirasyondan sorumlu olan bölge budur. [[K1 s. 93]]' },
      3: { ad: '3 · VRG', A: 22, T: 3, a: 0.6, k: 0, bolge: 'vrg', efe: 'rib', cip: ['zorlu ekspirasyon +', 'inspirasyon gücü'], c: '<b>Ventral solunum grubu (VRG).</b> İnterkostal kasları kontrol eder: zorlu ekspirasyonu başlatır ve inspirasyonun gücünü artırır. İçindeki pre-Bötzinger kompleksinin solunumun ritim oluşturucusu olduğu düşünülür; bu nöronlar sinoatriyal düğümün ritim oluşturucu hücrelerindekiyle aynı kanalları eksprese eder. [[K1 s. 93]]' },
      4: { ad: '4 · Apnöstik', A: 14, T: 4, a: 0.42, k: 1, bolge: 'apn', efe: 'dia', c: '<b>Apnöstik merkez.</b> Akciğerlerin aşırı genişlemesini önlemek için DRG nöronlarının etkinliğini değiştirir. Akciğer gerilme reseptörlerinden vagusla gelen impulslar da buraya ulaşır ve inspirasyon derinliğini azaltır: Hering–Breuer refleksi. [[K1 s. 93, 95]]' },
      5: { ad: '5 · Pnömotaksik', A: 8, T: 2.2, a: 0.42, k: 0, bolge: 'pno', efe: 'dia', c: '<b>Pnömotaksik merkez.</b> DRG impulslarını değiştirerek inspirasyon derinliğini azaltır ve solunum örüntüsünün ince ayarını yapar; solunum sayısını da artırabilir. [[K1 s. 93]]' },
    };
    const BOLGE_ADIM = { drg: 2, vrg: 3, apn: 4, pno: 5 };
    const SENS = [['merkezi', 'kemoreseptörler'], ['periferik', 'kemoreseptörler'], ['pulmoner gerilme', 'reseptörleri'], ['J-reseptörleri'], ['irritan', 'reseptörler'], ['eklem', 'propriyoseptörleri']];
    const st = { s: 1 };
    el.innerHTML = `<div class="f22-ust">${segHtml('Adım', 'adim', Object.keys(ADIM).map((k) => [k, ADIM[k].ad]), st.s)}</div><div class="f22-svgk"></div>`;
    const kap = el.querySelector('.f22-svgk');
    let G = null, E = {}, Y = null;
    const cur = { A: 14, T: 4, a: 0.42, k: 0 };
    let faz = 0, fazG = 0, dotS = 0, dash = 0;

    const LW = {
      w: 720, h: 400, dar: false,
      sens: [12, 40, 176, 260], sensT: [100, 62],
      chip: (i) => [22, 74 + 36 * i, 156, 30],
      bs: { l0: 232, r0: 488, l1: 244, r1: 476, t: 24, b: 300 }, bsT: [360, 44, 'Beyin sapı · solunum çekirdekleri'],
      bz: { pno: [252, 56, 216, 40], apn: [252, 104, 216, 40], drg: [252, 170, 100, 88], vrg: [368, 170, 100, 88] },
      sep: [360, 161], pb: [380, 246],
      eff: [532, 40, 176, 260], effT: [[620, 62, 'Efektörler', 'f22-bas'], [620, 79, 'solunum kasları', 'f22-t']],
      dia: { x0: 552, x1: 688, yb: 150, h: 34, l: [620, 100] }, rib: { x0: 558, x1: 682, ys: [190, 212, 234], l: [620, 176] },
      cip: [540, 254, 160, 38],
      ok1: [190, 214, 230, 214], ok2: [486, 214, 530, 214],
      loop: 'M620 300 C620 334 100 334 100 300', loopPts: bezier([620, 300], [620, 334], [100, 334], [100, 300], 24), loopL: [495, 323, 0],
      vagus: 'M178 163 C214 163 216 124 250 124', vagusL: [204, 132],
      ritim: [380, 252, 380, 340], ritimL: [374, 336, END],
      pan: [12, 340, 696, 54], c: 367, pl: [[22, 362], [22, 378]], wx: [110, 596], ix: 606, iy: 360,
      dot: (lp) => [[150, 214], [234, 214], [360, 214], [486, 214], [560, 214], [620, 250], ...lp, [100, 280], [150, 214]],
      bolgeAlt: { pno: ['Pnömotaksik merkez', 'insp. derinliği ↓ · RR ↑'], apn: ['Apnöstik merkez', 'aşırı genişlemeyi önler'], drg: ['DRG', 'diyafram', 'tidal insp.'], vrg: ['VRG', 'interkostaller', 'zorlu eksp.'] },
    };
    const LN = {
      w: 360, h: 600, dar: true,
      sens: [8, 8, 328, 142], sensT: [172, 27],
      // dar: "pulmoner gerilme reseptörleri" sağ alt yuvada, vagus oku doğrudan apnöstik kutuya iner
      chip: (i) => { const k = [0, 1, 5, 2, 3, 4][i]; return [k % 2 ? 174 : 16, 36 + 38 * Math.floor(k / 2), 154, 32]; },
      bs: { l0: 8, r0: 336, l1: 18, r1: 326, t: 166, b: 370 }, bsT: [172, 186, 'Beyin sapı · solunum çekirdekleri'],
      bz: { pno: [24, 196, 142, 48], apn: [178, 196, 142, 48], drg: [24, 268, 142, 92], vrg: [178, 268, 142, 92] },
      sep: [172, 259], pb: [192, 348],
      eff: [8, 386, 328, 114], effT: [[172, 404, 'Efektörler · solunum kasları', 'f22-bas']],
      dia: { x0: 24, x1: 156, yb: 466, h: 30, l: [90, 424] }, rib: { x0: 202, x1: 322, ys: [436, 452, 468], l: [262, 424] },
      cip: [24, 476, 296, 20],
      ok1: [172, 151, 172, 164], ok2: [172, 371, 172, 384],
      loop: 'M336 443 H346 Q350 443 350 439 V75 Q350 71 346 71 H338', loopPts: [[336, 443], [350, 443], [350, 71], [336, 71]], loopL: [350, 260, -90],
      vagus: 'M302 144 C302 166 302 172 302 194', vagusL: [276, 164],
      ritim: [192, 353, 192, 512], ritimL: [186, 508, END],
      pan: [8, 512, 344, 80], c: 552, pl: [[16, 546], [16, 562]], wx: [92, 250], ix: 258, iy: 540,
      dot: (lp) => [[172, 128], [172, 166], [172, 256], [172, 372], [172, 443], ...lp, [172, 71], [172, 128]],
      bolgeAlt: { pno: ['Pnömotaksik', 'derinlik ↓ · RR ↑'], apn: ['Apnöstik', 'aşırı genişlemeyi önler'], drg: ['DRG', 'diyafram', 'tidal insp.'], vrg: ['VRG', 'interkostaller', 'zorlu eksp.'] },
    };
    const silu = ({ l0, r0, l1, r1, t, b }) => {
      const h = b - t;
      return `M${l0 + 18} ${t} H${r0 - 18} Q${r0} ${t} ${r0} ${t + 18} C${r0} ${t + h * 0.45} ${r1} ${t + h * 0.6} ${r1} ${b - 14} Q${r1} ${b} ${r1 - 14} ${b} H${l1 + 14} Q${l1} ${b} ${l1} ${b - 14} C${l1} ${t + h * 0.6} ${l0} ${t + h * 0.45} ${l0} ${t + 18} Q${l0} ${t} ${l0 + 18} ${t} Z`;
    };
    const kur = (dar) => {
      G = dar ? LN : LW;
      const g = G;
      const bz = (id) => {
        const [x, y, w, h] = g.bz[id], al = g.bolgeAlt[id], cx = x + w / 2;
        const ust = al.length === 2;
        const yazi = ust
          ? T(cx, y + (dar ? 20 : 17), al[0], 'f22-bzad', MID) + T(cx, y + (dar ? 37 : 32), al[1], 'f22-bzalt', MID)
          : T(cx, y + 24, al[0], 'f22-bzad', MID) + T(cx, y + 42, al[1], 'f22-bzalt', MID) + T(cx, y + 56, al[2], 'f22-bzalt', MID);
        const pb = id === 'vrg' ? `<g class="f22-pb"><circle cx="${g.pb[0]}" cy="${g.pb[1]}" r="4.5"/>${T(g.pb[0] + 8, g.pb[1] + 3.5, 'pre-Bötzinger', 'f22-t f22-pbt')}</g>` : '';
        return `<g class="f22-bz" data-bz="${id}" role="button" tabindex="0" aria-label="${al[0]}: adım ${BOLGE_ADIM[id]}">${R(x, y, w, h, 10, 'f22-bzr')}${yazi}${pb}</g>`;
      };
      const [px, py, pw, ph] = g.pan;
      const dl = g.loopL;
      kap.innerHTML = `<svg class="f22-svg${dar ? ' dar' : ''}" viewBox="0 0 ${g.w} ${g.h}" role="img" aria-label="Ventilasyonun geri bildirim döngüsü: algılayıcılar, beyin sapındaki dört solunum bölgesi, solunum kasları ve altta solunum örüntüsü">
        <defs>${okMarker('f22-dv-m', 'f22-mk-m')}${okMarker('f22-dv-a', 'f22-mk-a')}${okMarker('f22-dv-b', 'f22-mk-b')}</defs>
        <path class="f22-dv-loop" d="${g.loop}" marker-end="url(#f22-dv-m)"/>
        <g class="f22-dv-loopl" transform="translate(${dl[0]} ${dl[1]}) rotate(${dl[2]})">${R(-104, -10, 208, 20, 6, 'f22-dv-loopr')}${T(0, 4, 'alveoler ventilasyon ↑ → PaCO₂ ↓', 'f22-t f22-ink', MID)}</g>
        <rect class="f22-kutu f22-dv-z" data-z="sens" x="${g.sens[0]}" y="${g.sens[1]}" width="${g.sens[2]}" height="${g.sens[3]}" rx="14"/>
        ${T(g.sensT[0], g.sensT[1], 'Algılayıcılar', 'f22-bas', MID)}
        ${SENS.map((s, i) => { const [x, y, w, h] = g.chip(i); return `<g class="f22-dv-cip" data-c="${i}">${R(x, y, w, h, 8, 'f22-cipr')}${s.length === 2 ? T(x + w / 2, y + h / 2 - 2, s[0], 'f22-cipt', MID) + T(x + w / 2, y + h / 2 + 10, s[1], 'f22-cipt', MID) : T(x + w / 2, y + h / 2 + 4, s[0], 'f22-cipt', MID)}</g>`; }).join('')}
        <path class="f22-kutu f22-dv-z" data-z="bs" d="${silu(g.bs)}"/>
        ${T(g.bsT[0], g.bsT[1], g.bsT[2], 'f22-bas', MID)}
        ${T(g.sep[0], g.sep[1], 'pons ▲ · ▼ medulla', 'f22-t f22-kucuk', MID)}
        ${['pno', 'apn', 'drg', 'vrg'].map(bz).join('')}
        <rect class="f22-kutu f22-dv-z" data-z="eff" x="${g.eff[0]}" y="${g.eff[1]}" width="${g.eff[2]}" height="${g.eff[3]}" rx="14"/>
        ${g.effT.map(([x, y, s, c]) => T(x, y, s, c, MID)).join('')}
        <g class="f22-dv-dia">${T(g.dia.l[0], g.dia.l[1], 'Diyafram', 'f22-lb', MID)}<path class="f22-kas"/></g>
        <g class="f22-dv-rib">${T(g.rib.l[0], g.rib.l[1], 'İnterkostal kaslar', 'f22-lb', MID)}<g class="f22-ribs"></g></g>
        <line class="f22-dv-ok" x1="${g.ok1[0]}" y1="${g.ok1[1]}" x2="${g.ok1[2]}" y2="${g.ok1[3]}" marker-end="url(#f22-dv-m)"/>
        <line class="f22-dv-ok" x1="${g.ok2[0]}" y1="${g.ok2[1]}" x2="${g.ok2[2]}" y2="${g.ok2[3]}" marker-end="url(#f22-dv-m)"/>
        <g class="f22-dv-vag"><path d="${g.vagus}" marker-end="url(#f22-dv-b)"/>${T(g.vagusL[0], g.vagusL[1], 'vagus', 'f22-t f22-vagt', MID)}</g>
        <g class="f22-dv-rit"><line x1="${g.ritim[0]}" y1="${g.ritim[1]}" x2="${g.ritim[2]}" y2="${g.ritim[3]}"/>${T(g.ritimL[0], g.ritimL[1], 'ritim', 'f22-t f22-ritt', g.ritimL[2])}</g>
        <g class="f22-dv-cipg"><rect class="f22-dv-cipr" x="${g.cip[0]}" y="${g.cip[1]}" width="${g.cip[2]}" height="${g.cip[3]}" rx="8"/><text class="f22-dv-cipt"></text></g>
        ${R(px, py, pw, ph, 10, 'f22-dv-pan')}
        ${T(g.pl[0][0], g.pl[0][1], 'Tidal hacim', 'f22-t')}${T(g.pl[1][0], g.pl[1][1], 'zaman →', 'f22-t')}
        <line class="f22-dv-sinir" x1="${g.wx[0]}" x2="${g.wx[1]}" y1="${g.c - 8}" y2="${g.c - 8}"/>
        <g class="f22-dv-sinirl">${satir(['aşırı', 'genişleme', 'sınırı'], g.ix, g.iy - 6, 13, 'f22-t f22-crit')}</g>
        <g class="f22-dv-pnol">${R(g.ix - 2, g.iy - 18, dar ? 90 : 96, 34, 7, 'f22-dv-pnor')}${T(g.ix + 6, g.iy - 4, 'derinlik ↓', 'f22-t f22-ink')}${T(g.ix + 6, g.iy + 10, 'sayı ↑', 'f22-t f22-ink')}</g>
        <path class="f22-dv-hayal"/>
        <path class="f22-dv-dalga"/>
        <circle class="f22-dv-nokta" r="5" visibility="hidden"/>
      </svg>`;
      const $ = (s) => kap.querySelector(s);
      E = { svg: $('svg'), dia: $('.f22-dv-dia .f22-kas'), ribs: $('.f22-ribs'), dalga: $('.f22-dv-dalga'), hayal: $('.f22-dv-hayal'), nokta: $('.f22-dv-nokta'), loop: $('.f22-dv-loop'), loopl: $('.f22-dv-loopl'), cipt: $('.f22-dv-cipt'), z: {} };
      kap.querySelectorAll('.f22-dv-z').forEach((z) => { E.z[z.dataset.z] = z; });
      Y = yol(g.dot(g.loopPts));
      uygula(true);
    };

    // nefes biçimi: θ ∈ [0,1), a = inspirasyon oranı → 0..1
    const nefes = (th, a) => (th < a ? 0.5 - 0.5 * Math.cos(Math.PI * th / a) : 0.5 + 0.5 * Math.cos(Math.PI * (th - a) / (1 - a)));
    const frac = (x) => x - Math.floor(x);
    const dalgaD = (A, Tp, a, k, f) => {
      const [x0, x1] = G.wx, v = (x1 - x0) / 8, c = G.c, lim = c - 8, pts = [];
      for (let x = x0; x <= x1 + 0.1; x += 3) {
        const th = frac(f - (x1 - x) / v / Tp);
        let y = c + A - 2 * A * nefes(th, a);
        if (k > 0.01 && y < lim) y = lerp(y, lim, k);
        pts.push([x, y]);
      }
      return dYol(pts);
    };
    const kasCiz = (gv) => {
      const s = ADIM[st.s], d = G.dia, r = G.rib;
      const diaOn = s.efe === 'dia', ribOn = s.efe === 'rib';
      const hd = d.h - (diaOn ? 22 * gv : 0);
      E.dia.setAttribute('d', `M${d.x0} ${d.yb} Q${(d.x0 + d.x1) / 2} ${d.yb - 2 * hd} ${d.x1} ${d.yb}`);
      const off = ribOn ? 4 * gv : 0, ys = [r.ys[0] - off, r.ys[1], r.ys[2] + off];
      let h = ys.map((y) => `<path d="M${r.x0} ${y} Q${(r.x0 + r.x1) / 2} ${y - 6} ${r.x1} ${y}"/>`).join('');
      for (let i = 0; i < 2; i++) [0.3, 0.62].forEach((f) => { const x = lerp(r.x0, r.x1, f); h += `<line x1="${x}" y1="${ys[i] + 2}" x2="${x + 10}" y2="${ys[i + 1] - 3}"/>`; });
      E.ribs.innerHTML = h;
    };
    const uygula = (anlik) => {
      const s = ADIM[st.s];
      basSec(el, 'adim', st.s);
      kap.querySelectorAll('.f22-bz').forEach((b) => { const on = b.dataset.bz === s.bolge; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
      E.svg.classList.toggle('f22-a1', st.s === 1);
      E.svg.classList.toggle('f22-a3', st.s === 3);
      E.svg.classList.toggle('f22-a4', st.s === 4);
      E.svg.classList.toggle('f22-a5', st.s === 5);
      E.svg.querySelector('.f22-dv-dia').classList.toggle('on', s.efe === 'dia');
      E.svg.querySelector('.f22-dv-rib').classList.toggle('on', s.efe === 'rib');
      E.svg.querySelector('.f22-dv-rib').classList.toggle('yari', st.s === 4);
      const cg = E.svg.querySelector('.f22-dv-cipg');
      cg.classList.toggle('on', !!s.cip);
      if (s.cip) {
        const [x, y, w, h] = G.cip;
        E.cipt.innerHTML = G.dar ? `<tspan x="${x + w / 2}" y="${y + 14}">${s.cip.join(' ')}</tspan>` : s.cip.map((l, i) => `<tspan x="${x + w / 2}" y="${y + 16 + i * 14}">${l}</tspan>`).join('');
        E.cipt.setAttribute('text-anchor', 'middle');
      }
      if (anlik || RM) Object.assign(cur, { A: s.A, T: s.T, a: s.a, k: s.k });
      cap.yaz(s.c);
      if (RM) statik();
    };
    const statik = () => {
      // azaltılmış hareket: dalga ve kaslar sabit (inspirasyon sonu); akış noktası yok
      E.dalga.setAttribute('d', dalgaD(cur.A, cur.T, cur.a, cur.k, 0.3));
      E.hayal.setAttribute('d', dalgaD(14, 4, 0.42, 0, 0.3));
      kasCiz(1);
      E.nokta.setAttribute('visibility', 'hidden');
      Object.values(E.z).forEach((z) => z.classList.remove('parla'));
      E.loopl.classList.remove('parla');
    };
    const sec = (v) => { st.s = +v; uygula(false); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-adim]'); if (b) { sec(b.dataset.adim); return; }
      const z = e.target.closest('.f22-bz'); if (z) sec(BOLGE_ADIM[z.dataset.bz]);
    });
    el.addEventListener('keydown', (e) => {
      const z = e.target.closest('.f22-bz');
      if (z && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sec(BOLGE_ADIM[z.dataset.bz]); }
    });
    const durG = genislik(el, kur);
    if (RM) return durG;
    const durT = ticker(el, (dt) => {
      const s = ADIM[st.s], f = 1 - Math.exp(-dt / 0.17);
      cur.A = lerp(cur.A, s.A, f); cur.T = lerp(cur.T, s.T, f); cur.a = lerp(cur.a, s.a, f); cur.k = lerp(cur.k, s.k, f);
      faz += dt / cur.T; fazG += dt / 4;
      E.dalga.setAttribute('d', dalgaD(cur.A, cur.T, cur.a, cur.k, faz));
      if (st.s === 5) E.hayal.setAttribute('d', dalgaD(14, 4, 0.42, 0, fazG));
      kasCiz(nefes(frac(faz), cur.a));
      const pb = E.svg.querySelector('.f22-pb circle');
      if (pb) pb.style.opacity = st.s === 3 ? (frac(faz) < 0.15 ? 1 : 0.35) : '';
      if (st.s === 1) {
        dotS = (dotS + dt / 4 * Y.top) % Y.top;
        const [x, y] = Y.at(dotS);
        E.nokta.removeAttribute('visibility'); E.nokta.setAttribute('cx', x.toFixed(1)); E.nokta.setAttribute('cy', y.toFixed(1));
        const ic = (r) => x >= r[0] - 2 && x <= r[0] + r[2] + 2 && y >= r[1] - 2 && y <= r[1] + r[3] + 2;
        const bs = G.bs;
        E.z.sens.classList.toggle('parla', ic(G.sens));
        E.z.bs.classList.toggle('parla', ic([bs.l0, bs.t, bs.r0 - bs.l0, bs.b - bs.t]));
        E.z.eff.classList.toggle('parla', ic(G.eff));
        E.loopl.classList.toggle('parla', G.dar ? x > 340 : y > 301);
        dash = (dash - dt * 24) % 100;
        E.loop.style.strokeDashoffset = dash;
      } else {
        E.nokta.setAttribute('visibility', 'hidden');
        Object.values(E.z).forEach((z) => z.classList.remove('parla'));
        E.loopl.classList.remove('parla');
      }
    });
    return () => { durT(); durG(); };
  };

  /* ================= 2 · Periferik kemoreseptörler ================= */
  VIZ.f22_periferik = (el) => {
    const cap = capOf(el);
    const OPT = {
      ist: { ad: 'İstirahat', kar: 0, aort: 0, hiz: 28, ve: ['V̇E normal', 0], oku: ['ikisi de bazal', 'IX ve X', 'V̇E normal'], c: '<b>İstirahat.</b> Karotis ve aort cisimciklerinden bazal bir impuls akışı gelir. Karotis cisimcikleri karotis bifurkasyonundadır ve afferentleri glossofaringeal sinirle gider; aort cisimcikleri aort kavsindedir ve afferentleri vagusla gider. İkisinin de ağırlıklarına oranla kan akımı çok yüksektir. [[K1 s. 93]]' },
      o2: { ad: 'Düşük PaO₂', kar: 1, aort: 1, hiz: 95, ust: 'hipoksemiye yanıt veren tek kemoreseptörler', ve: ['V̇E ↑', 1], oku: ['karotis + aort', 'IX ve X', 'V̇E ↑ hızlı'], c: '<b>Düşük PaO₂.</b> Aort ve karotis cisimcikleri, vücutta hipoksemiye yanıt veren tek kemoreseptörlerdir. Solunumsal yanıtlar için en önemlisi karotis cisimcikleridir; aort cisimcikleri daha çok kardiyovasküler yanıtlarda rol oynar. [[K1 s. 93]]' },
      co2: { ad: 'Yüksek PaCO₂', kar: 1, aort: 1, hiz: 80, ve: ['V̇E ↑', 1], oku: ['karotis + aort', 'IX ve X', 'V̇E ↑ hızlı (1–3 s)'], c: "<b>Yüksek PaCO₂.</b> Periferik kemoreseptörler vücudun hiperkapniye yanıtının yalnız %20'sinden sorumludur; kalan %80 merkezi kemoreseptörlerindir. Buna karşılık en hızlı yanıt verenler bunlardır: 1–3 saniye. [[K1 s. 93]]" },
      asit: { ad: 'Asidemi', kar: 1, aort: -1, hiz: 85, ve: ['V̇E ↑', 1], oku: ['yalnız karotis', 'IX', 'V̇E ↑ hızlı'], c: '<b>Asidemi (pH < 7,35).</b> Asidemiyle yalnızca karotis cisimcikleri uyarılır. Derin metabolik asidozda (ör. diyabetik ketoasidoz) ventilasyon bu yolla uyarılır ve Kussmaul solunumu ortaya çıkar. [[K1 s. 93–94]]' },
      hipo: { ad: 'Hipotansiyon', kar: 1, aort: 1, hiz: 70, ince: true, ust: 'perfüzyon ↓ → nöronal çıktı ↑', not: 'septik şokta RR ↑', ve: ['V̇E ↑', 1], oku: ['karotis + aort', 'IX ve X', 'V̇E ↑ (RR ↑)'], c: '<b>Hipotansiyon.</b> Karotis ve aort cisimciklerinin perfüzyonunun azalması nöronal çıktılarını artırır. Gaz değişiminde hiç bozukluk olmasa bile septik şok gelişirken solunum sayısının artması bununla açıklanır. [[K1 s. 94]]' },
      anemi: { ad: 'Anemi · CO', kar: -1, aort: -1, hiz: 28, rozet: 'O₂ içeriği ↓ ama PaO₂ normal → uyarılmaz', ve: ['V̇E değişmez', 0], oku: ['—', '—', 'V̇E değişmez'], c: '<b>Anemi ve karbonmonoksit zehirlenmesi uyarmaz.</b> Periferik kemoreseptörleri uyaran düşük arteriyel oksijen <b>parsiyel basıncıdır</b>, düşük oksijen içeriği değil. Bu iki durumda içerik düşüktür ama PaO₂ normaldir, bu yüzden kemoreseptörler uyarılmaz. [[K1 s. 93]]' },
    };
    const st = { o: 'ist' };
    el.innerHTML = `<div class="f22-ust">${segHtml('Uyaran', 'u', Object.keys(OPT).map((k) => [k, OPT[k].ad]), st.o)}</div><div class="f22-svgk"></div>
      <dl class="f22-oku f22-oku3"><div><dt>Uyarılan cisimcik</dt><dd data-o="0"></dd></div><div><dt>Afferent sinir</dt><dd data-o="1"></dd></div><div><dt>Yanıt</dt><dd data-o="2"></dd></div></dl>`;
    const kap = el.querySelector('.f22-svgk');
    let G = null, E = {};
    const cur = { h1: 28, h2: 28 };
    let s1 = 0, s2 = 0, tt = 0;

    const LW = {
      w: 720, h: 356, dar: false,
      cx: 150, ay: 250, ar: 60, fy: 120, by: 40, bx: 40, legs: 280, sw: 6,
      kb: [150, 120], kbL: [[168, 128], [168, 142]], hp: [150, 82],
      ab: [[115, 198], [185, 198]], abL: [150, 262], abN: [150, 277],
      etk: [[62, 236, 'aort kavsi', END], [102, 36, 'a. karotis', END]],
      ix: 'M161 116 C 280 70 430 80 520 142', ixL: [395, 74],
      x: 'M115 198 Q150 176 185 198 C 300 236 440 222 520 180', xL: [430, 236],
      med: [520, 110, 188, 100], medT: [614, 146], medV: [614, 176], medN: [614, 228],
      ust: [205, 6], rozet: [205, 6],
      hz: { x0: 82, x1: 318, y1: 290, y2: 310, ax: 328, ad: [12, 0] }, pay: { x: 350, y: 296, w: 358 },
      rmL: [[330, 108], [360, 254]],
    };
    const LN = {
      w: 360, h: 460, dar: true,
      cx: 105, ay: 205, ar: 45, fy: 110, by: 40, bx: 30, legs: 236, sw: 5,
      kb: [105, 110], kbL: [[90, 128], [90, 141]], kbEnd: true, hp: [105, 76],
      ab: [[80, 165], [130, 165]], abL: [105, 256], abN: [105, 270],
      etk: [[56, 196, 'aort kavsi', END], [70, 36, 'a. karotis', END]],
      ix: 'M114 106 C 160 90 190 100 220 112', ixL: [222, 72],
      x: 'M80 165 Q105 150 130 165 C 165 178 195 160 220 146', xL: [222, 184],
      med: [220, 84, 132, 80], medT: [286, 112], medV: [286, 142], medN: [286, 202],
      ust: [10, 284], rozet: [10, 284],
      hz: { x0: 76, x1: 330, y1: 332, y2: 352, ax: 368, ad: [10, 0] }, pay: { x: 10, y: 412, w: 340 },
      rmL: [[222, 58], [222, 222]],
    };
    const kur = (dar) => {
      G = dar ? LN : LW;
      const g = G, { cx, ay, ar, fy, by } = g;
      const dx = (cx - (dar ? 75 : 110));
      const damar = `M${cx - ar} ${g.legs} V${ay} A${ar} ${ar} 0 0 1 ${cx + ar} ${ay} V${g.legs} M${cx} ${ay - ar} V${fy} L${cx - dx} ${by} M${cx} ${fy} L${cx + dx} ${by}`;
      const hz = g.hz, xs = (s) => hz.x0 + s / 12 * (hz.x1 - hz.x0), p = g.pay;
      const kbL = g.kbL.map(([x, y], i) => T(x, y, i ? 'cisimciği' : 'Karotis', 'f22-lb2', g.kbEnd ? END : '')).join('');
      kap.innerHTML = `<svg class="f22-svg${dar ? ' dar' : ''}" viewBox="0 0 ${g.w} ${g.h}" role="img" aria-label="Karotis ve aort cisimcikleri, glossofaringeal sinir ve vagus yoluyla medulladaki solunum merkezine giden impulslar; altta yanıt süresi ve hiperkapni yanıtının bölüşümü">
        <path class="f22-pf-damar" d="${damar}" style="stroke-width:${g.sw}"/>
        ${g.etk.map(([x, y, s, a]) => T(x, y, s, 'f22-t', a)).join('')}
        <path class="f22-pf-sinir ix" d="${g.ix}"/><path class="f22-pf-sinir x" d="${g.x}"/>
        ${dar ? T(g.ixL[0], g.ixL[1], 'IX · glossofaringeal', 'f22-t f22-basic') + T(g.xL[0], g.xL[1], 'X · vagus siniri', 'f22-t') : T(g.ixL[0], g.ixL[1], 'glossofaringeal sinir (IX)', 'f22-t f22-basic', MID) + T(g.xL[0], g.xL[1], 'vagus siniri (X)', 'f22-t', MID)}
        <g class="f22-pf-dots ix"></g><g class="f22-pf-dots x"></g>
        <g class="f22-pf-rml">${T(g.rmL[0][0], g.rmL[0][1], '', 'f22-t f22-pf-rm1')}${T(g.rmL[1][0], g.rmL[1][1], '', 'f22-t f22-pf-rm2')}</g>
        <g class="f22-pf-kb"><circle cx="${g.kb[0]}" cy="${g.kb[1]}" r="11"/></g>${kbL}
        <g class="f22-pf-ab">${g.ab.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7"/>`).join('')}</g>
        ${T(g.abL[0], g.abL[1], 'Aort cisimcikleri', 'f22-lb2', MID)}
        ${T(g.abN[0], g.abN[1], 'asidemiyle uyarılmaz', 'f22-t f22-kucuk f22-pf-abn', MID)}
        <g class="f22-pf-hp">${R(g.hp[0] - 15, g.hp[1] - 10, 30, 20, 6, 'f22-hpr')}${T(g.hp[0], g.hp[1] + 4.5, 'H⁺', 'f22-hpt', MID)}</g>
        <rect class="f22-kutu f22-pf-med" x="${g.med[0]}" y="${g.med[1]}" width="${g.med[2]}" height="${g.med[3]}" rx="12"/>
        ${T(g.medT[0], g.medT[1], 'Solunum merkezi', 'f22-bas', MID)}
        ${T(g.medV[0], g.medV[1], '', 'f22-pf-ve', MID)}
        ${T(g.medN[0], g.medN[1], 'septik şokta RR ↑', 'f22-t f22-warn f22-pf-not', MID)}
        <g class="f22-pf-ust"><rect class="f22-pf-ustr" rx="7" height="22"/><text class="f22-t f22-ink"></text></g>
        <g class="f22-pf-hz">
          ${T(hz.ad[0], hz.y1 + 4, 'periferik', 'f22-t f22-ink')}${T(hz.ad[0], hz.y2 + 4, 'merkezi', 'f22-t')}
          <line class="f22-eksen" x1="${hz.x0}" x2="${hz.x1}" y1="${hz.y2 + 14}" y2="${hz.y2 + 14}"/>
          ${[0, 3, 6, 9, 12].map((s) => `<line class="f22-eksen" x1="${xs(s)}" x2="${xs(s)}" y1="${hz.y2 + 14}" y2="${hz.y2 + 18}"/>` + T(xs(s), hz.y2 + 30, s + (s === 12 ? ' s' : ''), 'f22-t f22-kucuk', MID)).join('')}
          ${R(xs(1), hz.y1 - 4, xs(3) - xs(1), 8, 3, 'f22-pf-hzp')}${T(xs(3) + 6, hz.y1 + 4, '1–3 s', 'f22-t f22-acc f22-b')}
          ${R(xs(4), hz.y2 - 8, xs(12) - xs(4), 15, 4, 'f22-pf-hzm')}${T((xs(4) + xs(12)) / 2, hz.y2 + 3.5, 'daha yavaş (kitap sayı vermez)', 'f22-t f22-kucuk f22-ink', MID)}
        </g>
        <g class="f22-pf-pay">
          ${T(p.x, p.y - 6, 'hiperkapni yanıtının payı', 'f22-t')}
          ${R(p.x, p.y, p.w * 0.2, 22, 4, 'f22-pf-pay1')}${R(p.x + p.w * 0.2, p.y, p.w * 0.8, 22, 4, 'f22-pf-pay2')}
          ${T(p.x + p.w * 0.1, p.y + 15, '%20', 'f22-t f22-onacc f22-b', MID)}${T(p.x + p.w * 0.6, p.y + 15, 'merkezi %80', 'f22-t f22-ink', MID)}
          ${T(p.x, p.y + 38, 'periferik', 'f22-t f22-acc')}
        </g>
      </svg>`;
      const $ = (s) => kap.querySelector(s);
      E = { svg: $('svg'), ix: $('.f22-pf-sinir.ix'), x: $('.f22-pf-sinir.x'), dix: $('.f22-pf-dots.ix'), dx: $('.f22-pf-dots.x'), kb: $('.f22-pf-kb circle'), ab: [...kap.querySelectorAll('.f22-pf-ab circle')], ve: $('.f22-pf-ve'), med: $('.f22-pf-med'), ust: $('.f22-pf-ust'), rm1: $('.f22-pf-rm1'), rm2: $('.f22-pf-rm2'), damar: $('.f22-pf-damar') };
      E.L1 = E.ix.getTotalLength(); E.L2 = E.x.getTotalLength();
      const nd = (L) => Math.ceil(L / 14) + 1;
      E.dix.innerHTML = Array.from({ length: nd(E.L1) }, () => '<circle r="3.5"/>').join('');
      E.dx.innerHTML = Array.from({ length: nd(E.L2) }, () => '<circle r="3.5"/>').join('');
      uygula();
    };
    const dotsCiz = (g, path, L, s, ara) => {
      const cs = g.children;
      for (let i = 0; i < cs.length; i++) {
        const d = s + i * ara;
        if (d > L || i * ara > L) { cs[i].setAttribute('visibility', 'hidden'); continue; }
        const p = path.getPointAtLength(d % L);
        cs[i].removeAttribute('visibility');
        cs[i].setAttribute('cx', p.x.toFixed(1)); cs[i].setAttribute('cy', p.y.toFixed(1));
      }
    };
    const hizAra = () => {
      const o = OPT[st.o];
      return { h1: o.kar === 1 ? o.hiz : 28, h2: o.aort === 1 ? o.hiz : 28 };
    };
    const uygula = () => {
      const o = OPT[st.o], g = G;
      basSec(el, 'u', st.o);
      E.svg.classList.toggle('f22-k-on', o.kar === 1);
      E.svg.classList.toggle('f22-k-off', o.kar === -1);
      E.svg.classList.toggle('f22-a-on', o.aort === 1);
      E.svg.classList.toggle('f22-a-off', o.aort === -1);
      E.svg.classList.toggle('f22-asit', st.o === 'asit');
      E.svg.classList.toggle('f22-hipo', st.o === 'hipo');
      E.svg.classList.toggle('f22-co2', st.o === 'co2');
      E.damar.style.strokeWidth = o.ince ? (g.dar ? 3 : 3.5) : g.sw;
      E.ve.textContent = o.ve[0];
      E.ve.classList.toggle('on', !!o.ve[1]);
      const ust = o.ust || o.rozet;
      E.ust.classList.toggle('on', !!ust);
      E.ust.classList.toggle('rozet', !!o.rozet);
      if (ust) {
        const t = E.ust.querySelector('text'), r = E.ust.querySelector('rect'), [x, y] = o.rozet ? g.rozet : g.ust;
        t.textContent = ust; t.setAttribute('x', x + 9); t.setAttribute('y', y + 15);
        const w = t.getComputedTextLength ? t.getComputedTextLength() : ust.length * 6;
        r.setAttribute('x', x); r.setAttribute('y', y); r.setAttribute('width', (w || ust.length * 6) + 18);
      }
      el.querySelectorAll('[data-o]').forEach((d) => { d.textContent = o.oku[+d.dataset.o]; });
      el.querySelector('[data-o="2"]').className = o.ve[1] ? 'f22-acc' : '';
      cap.yaz(o.c);
      if (RM) statik();
    };
    const statik = () => {
      const h = hizAra();
      // azaltılmış hareket: sabit noktalar, sık = uyarılmış, seyrek = bazal
      dotsCiz(E.dix, E.ix, E.L1, 6, h.h1 > 28 ? 14 : 44);
      dotsCiz(E.dx, E.x, E.L2, 6, h.h2 > 28 ? 14 : 44);
      E.rm1.textContent = 'impuls sıklığı: ' + (h.h1 > 28 ? 'yüksek' : 'bazal');
      E.rm2.textContent = 'impuls sıklığı: ' + (h.h2 > 28 ? 'yüksek' : 'bazal');
      E.svg.classList.add('f22-rm');
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-u]'); if (b) { st.o = b.dataset.u; uygula(); } });
    const durG = genislik(el, kur);
    if (RM) return durG;
    const durT = ticker(el, (dt) => {
      const h = hizAra(), f = 1 - Math.exp(-dt / 0.13);
      cur.h1 = lerp(cur.h1, h.h1, f); cur.h2 = lerp(cur.h2, h.h2, f);
      const k = G.dar ? 0.75 : 1;
      s1 = (s1 + cur.h1 * k * dt) % 26; s2 = (s2 + cur.h2 * k * dt) % 26;
      dotsCiz(E.dix, E.ix, E.L1, s1, 26);
      dotsCiz(E.dx, E.x, E.L2, s2, 26);
      tt += dt;
      const o = OPT[st.o], nb = 1.5 * Math.sin(2 * Math.PI * tt);
      E.kb.setAttribute('r', (11 + (o.kar === 1 ? nb : 0)).toFixed(2));
      E.ab.forEach((c) => c.setAttribute('r', (7 + (o.aort === 1 ? nb * 0.8 : 0)).toFixed(2)));
      // uyarılan yoldan impuls ulaştıkça medulla kutusu kısa süre parlar
      const uyar = o.kar === 1 || o.aort === 1;
      E.med.classList.toggle('parla', uyar && ((tt * Math.max(cur.h1, cur.h2) / 26) % 1) < 0.35);
    });
    return () => { durT(); durG(); };
  };

  /* ================= 3 · Merkezi kemoreseptör: kan → BOS → ECF ================= */
  VIZ.f22_merkezi = (el) => {
    const cap = capOf(el);
    const ADIM = {
      1: { ad: '1 · CO₂ geçer', pa: 5.3, ph: 7.40, bos: 7.32, ve: 6, c: "<b>1 · CO₂ geçer.</b> CO₂ kandan BOS'a, oradan merkezi kemoreseptörleri çevreleyen hücre dışı sıvıya serbestçe difüze olur. H⁺ ve HCO₃⁻ iyonları kan–beyin bariyerini geçemez; bu yüzden plazma pH'sındaki değişiklikler ventilasyonu doğrudan etkilemez. [[K1 s. 94]]" },
      2: { ad: '2 · Tepkime', pa: 8.0, ph: 7.30, bos: 7.20, ve: 10, c: "<b>2 · Tepkime.</b> CO₂ suyla tepkimeye girip H₂CO₃ oluşturur; H₂CO₃ H⁺ ve HCO₃⁻'ye ayrışır. BOS'un protein konsantrasyonu plazmanınkinden çok düşük olduğu için tamponlama azdır: BOS pH'sı PCO₂'deki küçük değişikliklere plazmadan daha duyarlıdır. [[K1 s. 94]]" },
      3: { ad: '3 · Uyarılma', pa: 8.0, ph: 7.30, bos: 7.20, ve: 18, c: "<b>3 · Uyarılma.</b> H⁺ kemoreseptör dokusuna difüze olur ve reseptörleri doğrudan uyararak solunum merkezini etkinleştirir. Kemoreseptör ECF'sinin pH'sı böylece arteriyel PaCO₂'nin dolaylı bir ölçüsü olur: PaCO₂ arttıkça V̇<sub>E</sub> artar. [[K1 s. 94]]" },
      4: { ad: '4 · Asidoz tipi', pa: 3.8, ph: 7.15, bos: 7.33, ve: 20, c: '<b>4 · Solunumsal asidoz mu, metabolik asidoz mu?</b> Solunumsal asidoz merkezi kemoreseptörleri metabolik asidozdan daha fazla uyarır: CO₂ bariyeri geçebilir, H⁺ geçemez. Derin metabolik asidozda (ör. diyabetik ketoasidoz) ventilasyon karotis cisimcikleri yoluyla uyarılır; sonuç Kussmaul solunumudur. [[K1 s. 94]]' },
      5: { ad: '5 · Kronik hiperkapni', pa: 8.0, ph: 7.38, bos: 7.31, ve: 7, c: "<b>5 · Kronik hiperkapni.</b> pH değişimini tamponlamak için BOS'a etkin biçimde HCO₃⁻ salgılanır; BOS pH'sı normale döner, merkezi kemoreseptörler artık uyarılmaz ve V̇<sub>E</sub> normale yakın düzeye iner. Böbrekler de daha fazla HCO₃⁻ geri emerek arteriyel pH'yı normale döndürür ve karotis cisimciklerinden gelen uyarı azalır. Sonuç CO₂'ye duyarlılığın kaybıdır. [[K1 s. 94]]" },
    };
    const st = { s: 1 };
    el.innerHTML = `<div class="f22-ust">${segHtml('Adım', 'adim', Object.keys(ADIM).map((k) => [k, ADIM[k].ad]), st.s)}</div><div class="f22-svgk"></div>
      <dl class="f22-oku f22-oku4 f22-mz-dl"><div><dt>PaCO₂</dt><dd data-o="pa"></dd></div><div><dt>Arteriyel pH</dt><dd data-o="ph"></dd></div><div><dt>BOS pH</dt><dd data-o="bos"></dd></div><div><dt>V̇<sub>E</sub></dt><dd data-o="ve"></dd></div></dl>`;
    const kap = el.querySelector('.f22-svgk'), dl = el.querySelector('.f22-mz-dl');
    let G = null, E = {}, tt = 0, zaman = [];
    const TERIM = ['CO₂', ' + ', 'H₂O', ' ⇌ ', 'H₂CO₃', ' ⇌ ', 'H⁺', ' + ', 'HCO₃⁻'];
    const ion = (x, y, tur, ek = '') => {
      if (tur === 'co2') return `<g class="f22-ion co2 ${ek}" transform="translate(${x} ${y})"><circle r="13"/>${T(0, 3.5, 'CO₂', '', MID)}</g>`;
      if (tur === 'h') return `<g class="f22-ion h ${ek}" transform="translate(${x} ${y})"><circle r="9"/>${T(0, 3.5, 'H⁺', '', MID)}</g>`;
      return `<g class="f22-ion hco3 ${ek}" transform="translate(${x} ${y})"><rect x="-21" y="-11" width="42" height="22" rx="11"/>${T(0, 4, 'HCO₃⁻', '', MID)}</g>`;
    };
    const LW = {
      w: 720, h: 340, dar: false,
      k1: [12, 40, 208, 230], k1T: [30, 60], akim: [18, 52, 8, 206],
      co2: [[62, 96], [108, 124], [62, 156]], co2ek: [[108, 182], [148, 142]],
      hp: [[180, 162], [154, 146], [156, 182]], hco3: [186, 207], hAni: [0, 1, 26, 0],
      oku: [[30, 228], [30, 246], [30, 262]],
      bar: [220, 40, 28, 230], barT: [234, 30, MID], kapi: { co2: [90, 120], hp: [150, 175], hco3: [195, 220] }, yatay: false,
      gateL: [[256, 137, 'CO₂ serbestçe geçer', 'f22-ok'], [256, 167, 'geçemez', 'f22-crit'], [256, 212, 'geçemez', 'f22-crit']], gateA: '',
      k2: [248, 40, 272, 230], k2T: [262, 60], phNum: [262, 86],
      reak: [[384, 252, 0, 9]],
      gauge: { yatay: false, x: 482, a: 64, b: 204 },
      bosH: [[318, 196], [356, 214], [404, 200]],
      hco3Ok: [400, 70, 400, 124], hco3L: [[408, 86], [408, 99]], hco3ion: [[378, 146], [420, 166]],
      co2Yol: [[112, 70], [180, 92], [214, 105], [256, 105], [300, 105], [344, 112]],
      k3: [520, 40, 188, 230], k3T: [532, 60],
      nr: [560, 104], aks: [[560, 120], [560, 176]], den: [[540, 82], [560, 76], [580, 84]],
      sm: [530, 176, 160, 24], ve: [530, 230, 160, 12], veL: [530, 222], veN: 256,
      kr: [596, 66, 108, 76], krL: ['CO₂ duyarlılığı', 'kaybı →', 'hipoksemik dürtüye', 'bağımlılık'],
      yan: 'M116 272 C116 322 594 322 594 276', yanL: [356, 333, 0], kus: [604, 282, 104, 22],
      hYol: [[452, 240], [500, 170], [548, 112]],
    };
    const LN = {
      w: 360, h: 640, dar: true,
      k1: [8, 8, 328, 172], k1T: [26, 28], akim: [12, 36, 8, 136],
      co2: [[110, 60], [160, 100], [104, 126]], co2ek: [[214, 62], [262, 102]],
      hp: [[145, 152], [176, 126], [196, 152]], hco3: [235, 152], hAni: [0, 0, 0, 22],
      oku: null,
      bar: [8, 180, 328, 32], barT: [300, 194, MID], kapi: { co2: [30, 80], hp: [120, 170], hco3: [210, 260] }, yatay: true,
      gateL: [[84, 232, 'CO₂ serbestçe geçer', 'f22-ok'], [330, 232, 'H⁺ ve HCO₃⁻ geçemez', 'f22-crit', END]], gateA: '',
      k2: [8, 212, 328, 208], k2T: [22, 258], phNum: [22, 280],
      reak: [[172, 320, 0, 5], [172, 342, 5, 9]],
      gauge: { yatay: true, y: 384, a: 24, b: 320 },
      bosH: [[96, 296], [146, 290], [250, 296]],
      hco3Ok: [318, 242, 318, 288], hco3L: [[308, 262], [308, 275]], hco3ion: [[288, 298], [310, 322]],
      co2Yol: [[48, 46], [50, 150], [55, 172], [55, 212], [58, 242]],
      k3: [8, 436, 328, 196], k3T: [22, 458],
      nr: [52, 506], aks: [[68, 506], [96, 506]], den: [[34, 488], [52, 484], [36, 522]],
      sm: [96, 494, 140, 24], ve: [20, 558, 316, 12], veL: [20, 550], veN: 586,
      kr: [20, 594, 316, 32], krL: ['CO₂ duyarlılığı kaybı →', 'hipoksemik dürtüye bağımlılık'],
      yan: 'M336 100 H346 Q350 100 350 104 V502 Q350 506 346 506 H240', yanL: [350, 320, -90], kus: [228, 442, 106, 22],
      hYol: [[150, 342], [100, 420], [56, 492]],
    };
    const kur = (dar) => {
      G = dar ? LN : LW;
      const g = G, b = g.bar;
      const kapi = (id, acik) => {
        const [a, z] = g.kapi[id];
        if (!g.yatay) {
          const r = R(b[0], a, b[2], z - a, 0, 'f22-mz-kapi');
          return acik ? r + `<line class="f22-mz-acik" x1="${b[0]}" x2="${b[0] + b[2]}" y1="${a}" y2="${a}"/><line class="f22-mz-acik" x1="${b[0]}" x2="${b[0] + b[2]}" y1="${z}" y2="${z}"/>`
            : r + `<g class="f22-mz-x" data-k="${id}"><line x1="${b[0] + 6}" x2="${b[0] + b[2] - 6}" y1="${(a + z) / 2 - 8}" y2="${(a + z) / 2 + 8}"/><line x1="${b[0] + 6}" x2="${b[0] + b[2] - 6}" y1="${(a + z) / 2 + 8}" y2="${(a + z) / 2 - 8}"/></g>`;
        }
        const r = R(a, b[1], z - a, b[3], 0, 'f22-mz-kapi'), m = (a + z) / 2, c = b[1] + b[3] / 2;
        return acik ? r + `<line class="f22-mz-acik" y1="${b[1]}" y2="${b[1] + b[3]}" x1="${a}" x2="${a}"/><line class="f22-mz-acik" y1="${b[1]}" y2="${b[1] + b[3]}" x1="${z}" x2="${z}"/>`
          : r + `<g class="f22-mz-x" data-k="${id}"><line x1="${m - 9}" x2="${m + 9}" y1="${c - 9}" y2="${c + 9}"/><line x1="${m - 9}" x2="${m + 9}" y1="${c + 9}" y2="${c - 9}"/></g>`;
      };
      const reak = g.reak.map(([x, y, i0, i1]) => `<text class="f22-mz-reak" x="${x}" y="${y}" text-anchor="middle">${TERIM.slice(i0, i1).map((s, j) => `<tspan data-t="${i0 + j}"${i0 + j === 6 ? ' class="h"' : ''}>${s}</tspan>`).join('')}</text>`).join('');
      const ga = g.gauge;
      const gp = (v) => lerp(ga.a, ga.b, ga.yatay ? (v - 7.10) / 0.35 : (7.45 - v) / 0.35);
      const gauge = ga.yatay
        ? `<line class="f22-eksen f22-mz-gl" x1="${ga.a}" x2="${ga.b}" y1="${ga.y}" y2="${ga.y}"/>${[7.1, 7.2, 7.3, 7.4].map((v) => `<line class="f22-eksen" x1="${gp(v)}" x2="${gp(v)}" y1="${ga.y - 4}" y2="${ga.y + 4}"/>` + T(gp(v), ga.y + 18, fmt(v, 2), 'f22-t f22-kucuk', MID)).join('')}<line class="f22-mz-norm" x1="${gp(7.32)}" x2="${gp(7.32)}" y1="${ga.y - 10}" y2="${ga.y + 6}"/>${T(gp(7.32), ga.y - 13, 'normal 7,32', 'f22-t f22-ok f22-kucuk', MID)}<polygon class="f22-mz-ptr" points="-7,-15 7,-15 0,-3"/>`
        : `<line class="f22-eksen f22-mz-gl" x1="${ga.x}" x2="${ga.x}" y1="${ga.a}" y2="${ga.b}"/>${[7.1, 7.2, 7.3, 7.4].map((v) => `<line class="f22-eksen" x1="${ga.x - 4}" x2="${ga.x + 4}" y1="${gp(v)}" y2="${gp(v)}"/>` + T(ga.x + 9, gp(v) + 3.5, fmt(v, 2), 'f22-t f22-kucuk')).join('')}<line class="f22-mz-norm" x1="${ga.x - 14}" x2="${ga.x + 4}" y1="${gp(7.32)}" y2="${gp(7.32)}"/>${T(ga.x - 17, gp(7.32) + 3.5, 'normal', 'f22-t f22-ok f22-kucuk', END)}<polygon class="f22-mz-ptr" points="-16,-6 -16,6 -3,0"/>`;
      const veX = (v) => g.ve[0] + clamp(v, 0, 24) / 24 * g.ve[2];
      const yl = g.yanL;
      kap.innerHTML = `<svg class="f22-svg${dar ? ' dar' : ''}" viewBox="0 0 ${g.w} ${g.h}" role="img" aria-label="Kan, kan–beyin bariyeri, BOS ve merkezi kemoreseptör: CO₂ bariyeri geçer, H⁺ ve HCO₃⁻ geçemez; BOS'ta oluşan H⁺ kemoreseptörü uyarır">
        <defs>${okMarker('f22-mz-w', 'f22-mk-w')}${okMarker('f22-mz-b', 'f22-mk-b')}</defs>
        <rect class="f22-mz-k1" x="${g.k1[0]}" y="${g.k1[1]}" width="${g.k1[2]}" height="${g.k1[3]}" rx="12"/>
        <rect class="f22-mz-akim" x="${g.akim[0]}" y="${g.akim[1]}" width="${g.akim[2]}" height="${g.akim[3]}" rx="4"/>
        ${T(g.k1T[0], g.k1T[1], 'Kan (kapiller)', 'f22-bas')}
        <rect class="f22-kutu" x="${g.k2[0]}" y="${g.k2[1]}" width="${g.k2[2]}" height="${g.k2[3]}" rx="${dar ? 12 : 0}"/>
        <rect class="f22-kutu" x="${g.k3[0]}" y="${g.k3[1]}" width="${g.k3[2]}" height="${g.k3[3]}" rx="12"/>
        ${T(g.k2T[0], g.k2T[1], "BOS → kemoreseptör ECF'si", 'f22-bas')}
        ${T(g.k3T[0], g.k3T[1], 'Merkezi kemoreseptör', 'f22-bas')}
        <g class="f22-mz-yan"><path d="${g.yan}" marker-end="url(#f22-mz-w)"/><g transform="translate(${yl[0]} ${yl[1]}) rotate(${yl[2]})">${R(-96, -10, 192, 18, 5, 'f22-mz-yanr')}${T(0, 3.5, 'plazma H⁺ → karotis cisimcikleri', 'f22-t f22-warn', MID)}</g>
          ${R(g.kus[0], g.kus[1], g.kus[2], g.kus[3], 7, 'f22-mz-kusr')}${T(g.kus[0] + g.kus[2] / 2, g.kus[1] + 15, 'Kussmaul solunumu', 'f22-t f22-ink f22-kucuk', MID)}</g>
        <rect class="f22-mz-bar" x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}"/>
        ${dar ? T(g.barT[0], g.barT[1], 'kan–beyin', 'f22-t f22-ink f22-kucuk', MID) + T(g.barT[0], g.barT[1] + 12, 'bariyeri', 'f22-t f22-ink f22-kucuk', MID) : T(g.barT[0], g.barT[1], 'kan–beyin bariyeri', 'f22-t f22-ink', MID)}
        ${kapi('co2', true)}${kapi('hp', false)}${kapi('hco3', false)}
        ${g.gateL.map(([x, y, s, c, a]) => T(x, y, s, 'f22-t f22-kucuk ' + c, a || g.gateA)).join('')}
        ${g.co2.map(([x, y]) => ion(x, y, 'co2')).join('')}${g.co2ek.map(([x, y]) => ion(x, y, 'co2', 'ek')).join('')}
        ${g.hp.map(([x, y], i) => ion(x, y, 'h', i ? 'ek4' : 'ana')).join('')}${ion(g.hco3[0], g.hco3[1], 'hco3')}
        ${g.oku ? T(g.oku[0][0], g.oku[0][1], '', 'f22-mz-o1') + T(g.oku[1][0], g.oku[1][1], '', 'f22-t f22-mz-o2') + T(g.oku[2][0], g.oku[2][1], '↓ (artan ventilasyonla düşer)', 'f22-t f22-kucuk f22-mz-o3') : ''}
        ${reak}
        ${T(g.phNum[0], g.phNum[1], '', 'f22-mz-phn')}
        <g class="f22-mz-gauge">${gauge}</g>
        ${g.bosH.map(([x, y], i) => `<g class="f22-mz-bh" data-i="${i}">${ion(x, y, 'h')}</g>`).join('')}
        <g class="f22-mz-hok"><line x1="${g.hco3Ok[0]}" y1="${g.hco3Ok[1]}" x2="${g.hco3Ok[2]}" y2="${g.hco3Ok[3]}" marker-end="url(#f22-mz-b)"/>${g.hco3L.map(([x, y], i) => T(x, y, i ? 'salgılanması' : 'HCO₃⁻ etkin', 'f22-t f22-basic', dar ? END : '')).join('')}${g.hco3ion.map(([x, y]) => `<g class="f22-mz-hi" data-x="${x}" data-y="${y}">${ion(0, 0, 'hco3')}</g>`).join('')}</g>
        <g class="f22-mz-co2m">${[0, 1].map(() => ion(-40, -40, 'co2', 'm')).join('')}</g>
        <g class="f22-mz-hm">${[0, 1, 2].map(() => `<circle r="4"/>`).join('')}</g>
        <g class="f22-mz-nr">
          ${g.den.map(([x, y]) => `<line x1="${g.nr[0]}" y1="${g.nr[1]}" x2="${x}" y2="${y}"/>`).join('')}
          <line x1="${g.aks[0][0]}" y1="${g.aks[0][1]}" x2="${g.aks[1][0]}" y2="${g.aks[1][1]}"/>
          <circle cx="${g.nr[0]}" cy="${g.nr[1]}" r="16"/>
        </g>
        <g class="f22-mz-imp">${[0, 1, 2].map(() => '<circle r="3.5"/>').join('')}</g>
        ${R(g.sm[0], g.sm[1], g.sm[2], g.sm[3], 7, 'f22-mz-sm')}${T(g.sm[0] + g.sm[2] / 2, g.sm[1] + 16.5, 'Solunum merkezi', 'f22-lb', MID)}
        ${T(g.veL[0], g.veL[1], '', 'f22-mz-vel')}
        ${R(g.ve[0], g.ve[1], g.ve[2], g.ve[3], 4, 'f22-mz-vebg')}<rect class="f22-mz-vebar" x="${g.ve[0]}" y="${g.ve[1]}" height="${g.ve[3]}" rx="4"/>
        <line class="f22-mz-ven" x1="${veX(6)}" x2="${veX(6)}" y1="${g.ve[1] - 5}" y2="${g.ve[1] + g.ve[3] + 5}"/>
        ${T(veX(6), g.veN, 'normal 6', 'f22-t f22-kucuk', MID)}${T(g.ve[0], g.veN, '0', 'f22-t f22-kucuk')}${T(g.ve[0] + g.ve[2], g.veN, '24 L/dk', 'f22-t f22-kucuk', END)}
        <g class="f22-mz-kr">${R(g.kr[0], g.kr[1], g.kr[2], g.kr[3], 8, 'f22-mz-krr')}${g.krL.map((s, i) => T(g.kr[0] + (dar ? g.kr[2] / 2 : 8), g.kr[1] + 15 + i * 14, s, 'f22-t f22-ink f22-kucuk', dar ? MID : '')).join('')}</g>
      </svg>`;
      const $ = (s) => kap.querySelector(s);
      E = { svg: $('svg'), o1: $('.f22-mz-o1'), o2: $('.f22-mz-o2'), phn: $('.f22-mz-phn'), ptr: $('.f22-mz-ptr'), vel: $('.f22-mz-vel'), vebar: $('.f22-mz-vebar'), co2m: [...kap.querySelectorAll('.f22-mz-co2m .f22-ion')], hm: [...kap.querySelectorAll('.f22-mz-hm circle')], imp: [...kap.querySelectorAll('.f22-mz-imp circle')], hi: [...kap.querySelectorAll('.f22-mz-hi')], hAna: $('.f22-ion.h.ana'), gp, veX };
      E.co2Y = yol(g.co2Yol); E.hY = yol(g.hYol); E.akY = yol(g.aks);
      sayi.tazele();
      uygula(0);
      if (RM) statik();
    };
    const sayi = yumusak((v) => {
      if (!E.svg) return;
      if (E.o1) { E.o1.textContent = `PaCO₂ ${fmt(v.pa)} kPa`; E.o2.textContent = `arteriyel pH ${fmt(v.ph, 2)}`; }
      E.phn.textContent = `BOS pH ${fmt(v.bos, 2)}`;
      const ga = G.gauge, p = E.gp(clamp(v.bos, 7.1, 7.45));
      E.ptr.setAttribute('transform', ga.yatay ? `translate(${p} ${ga.y})` : `translate(${ga.x} ${p})`);
      E.ptr.classList.toggle('dusuk', v.bos < 7.27);
      E.vel.textContent = `V̇E ${Math.round(v.ve)} L/dk`;
      E.vebar.setAttribute('width', Math.max(0, E.veX(v.ve) - G.ve[0]).toFixed(1));
      el.querySelector('[data-o="pa"]').textContent = fmt(v.pa) + ' kPa';
      el.querySelector('[data-o="ph"]').textContent = fmt(v.ph, 2);
      el.querySelector('[data-o="bos"]').textContent = fmt(v.bos, 2);
      el.querySelector('[data-o="ve"]').textContent = Math.round(v.ve) + ' L/dk';
    });
    const reakGoster = (anim) => {
      zaman.forEach(clearTimeout); zaman = [];
      const ts = [...kap.querySelectorAll('.f22-mz-reak tspan')];
      if (st.s < 2) { ts.forEach((t) => t.classList.remove('on')); return; }
      if (!anim || RM) { ts.forEach((t) => t.classList.add('on')); return; }
      ts.forEach((t) => t.classList.remove('on'));
      // terimler soldan sağa 0,4 s aralıkla (iki terim + işaret bir grup)
      const grup = [[0], [1, 2], [3, 4], [5, 6], [7, 8]];
      grup.forEach((gr, i) => zaman.push(setTimeout(() => gr.forEach((k) => { const t = kap.querySelector(`.f22-mz-reak tspan[data-t="${k}"]`); if (t) t.classList.add('on'); }), 400 * i)));
    };
    let onceki = 1;
    const uygula = (ms) => {
      const s = ADIM[st.s], sv = E.svg;
      basSec(el, 'adim', st.s);
      ['a1', 'a2', 'a3', 'a4', 'a5'].forEach((c, i) => sv.classList.toggle('f22-' + c, st.s === i + 1));
      sv.classList.toggle('f22-pa8', s.pa > 6);
      sv.classList.toggle('f22-yan-on', st.s === 4);
      sv.classList.toggle('f22-yan-soluk', st.s === 5);
      sv.classList.toggle('f22-uyar', st.s === 3);
      const nh = { 1: 0, 2: 2, 3: 3, 4: 0, 5: 1 }[st.s];
      kap.querySelectorAll('.f22-mz-bh').forEach((b) => b.classList.toggle('on', +b.dataset.i < nh));
      dl.hidden = !G.dar;
      reakGoster(ms > 0 && onceki < 2 && st.s >= 2);
      onceki = st.s;
      sayi.set({ pa: s.pa, ph: s.ph, bos: s.bos, ve: s.ve }, ms);
      cap.yaz(s.c);
    };
    const statik = () => {
      // RM: hareketli parçacıklar sabit konumda (biri kapıda, biri BOS'ta)
      E.co2m.forEach((g, i) => { const p = E.co2Y.at(E.co2Y.top * (i ? 0.85 : 0.5)); g.setAttribute('transform', `translate(${p[0]} ${p[1]})`); });
      E.hm.forEach((c, i) => { const p = E.hY.at(E.hY.top * (0.25 + 0.3 * i)); c.setAttribute('cx', p[0]); c.setAttribute('cy', p[1]); c.setAttribute('visibility', st.s === 3 ? 'visible' : 'hidden'); });
      E.imp.forEach((c, i) => { const p = E.akY.at(E.akY.top * (0.2 + 0.3 * i)); c.setAttribute('cx', p[0]); c.setAttribute('cy', p[1]); c.setAttribute('visibility', st.s === 3 ? 'visible' : 'hidden'); });
      E.hi.forEach((g) => g.setAttribute('transform', `translate(${g.dataset.x} ${g.dataset.y})`));
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-adim]'); if (!b) return;
      const yeni = +b.dataset.adim, ms = yeni === 5 ? 1200 : 600;
      st.s = yeni; uygula(ms);
      if (RM) statik();
    });
    const durG = genislik(el, kur);
    if (RM) return () => { durG(); zaman.forEach(clearTimeout); sayi.dur(); };
    let hiT = 0;
    const durT = ticker(el, (dt) => {
      tt += dt;
      E.co2m.forEach((g, i) => {
        const f = ((tt / 3 + i * 0.5) % 1), p = E.co2Y.at(E.co2Y.top * f);
        g.setAttribute('transform', `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})`);
        g.style.opacity = f > 0.85 ? (1 - f) / 0.15 : f < 0.1 ? f / 0.1 : 1;
      });
      // H⁺ bariyere çarpıp geri döner
      const b = Math.abs(Math.sin(tt * 1.6)), ha = G.hAni, [hx, hy] = G.hp[0];
      if (E.hAna) E.hAna.setAttribute('transform', `translate(${(hx + ha[2] * b).toFixed(1)} ${(hy + ha[3] * b).toFixed(1)})`);
      // H⁺ BOS'tan kemoreseptöre (adım 3)
      E.hm.forEach((c, i) => {
        if (st.s !== 3) { c.setAttribute('visibility', 'hidden'); return; }
        c.removeAttribute('visibility');
        const f = (tt / 2.2 + i / 3) % 1, p = E.hY.at(E.hY.top * f);
        c.setAttribute('cx', p[0].toFixed(1)); c.setAttribute('cy', p[1].toFixed(1));
      });
      E.imp.forEach((c, i) => {
        if (st.s !== 3) { c.setAttribute('visibility', 'hidden'); return; }
        c.removeAttribute('visibility');
        const f = (tt / 0.9 + i / 3) % 1, p = E.akY.at(E.akY.top * f);
        c.setAttribute('cx', p[0].toFixed(1)); c.setAttribute('cy', p[1].toFixed(1));
      });
      // HCO₃⁻ salgılanması (adım 5)
      if (st.s === 5) hiT = Math.min(1, hiT + dt / 1.2); else hiT = 0;
      E.hi.forEach((g, i) => {
        const x0 = G.hco3Ok[0], y0 = G.hco3Ok[1], f = clamp(hiT * 1.4 - i * 0.3, 0, 1);
        g.setAttribute('transform', `translate(${lerp(x0, +g.dataset.x, f).toFixed(1)} ${lerp(y0, +g.dataset.y, f).toFixed(1)})`);
      });
    });
    return () => { durT(); durG(); zaman.forEach(clearTimeout); sayi.dur(); };
  };

  /* ================= 4 · Hipoksemiye ventilatuvar yanıt ================= */
  VIZ.f22_hipoksi = (el) => {
    const cap = capOf(el);
    const H = (P) => Math.exp((8 - P) / 2.2);
    const VN = (P) => 6 + H(P), VH = (P) => 10.5 + 1.55 * H(P), VP = (P) => Math.max(0.5, 6 - 0.6 * Math.max(0, H(P) - 1));
    const EG = { n: { f: VN, ad: 'normokapni · PaCO₂ 5,3 kPa', kisa: 'normokapni', cls: 'n' }, h: { f: VH, ad: 'hiperkapni · PaCO₂ 8 kPa', kisa: 'hiperkapni', cls: 'h' }, p: { f: VP, ad: 'periferik kemoreseptörler yok', kisa: 'periferik yok', cls: 'p' } };
    const ADIM = {
      1: { ad: '1 · Normokapni', g: ['n'], ana: 'n' },
      2: { ad: '2 · + Hiperkapni', g: ['n', 'h'], ana: 'h' },
      3: { ad: '3 · Periferik yok', g: ['p'], soluk: ['n'], ana: 'p' },
      4: { ad: '4 · Sinerji', g: ['n', 'h'], ana: 'h', P: 5 },
      5: { ad: '5 · Ağır hipoksemi', g: ['n'], ana: 'n', P: 4.5 },
    };
    const st = { s: 1, P: 13 };
    el.innerHTML = `<div class="f22-ust">${segHtml('Görünüm', 'adim', Object.keys(ADIM).map((k) => [k, ADIM[k].ad]), st.s)}
        <label class="f22-rng"><span>PaO₂ <output data-o="P"></output></span><input type="range" min="4" max="20" step="0.1" value="13" data-r="P" aria-label="PaO₂ (kPa)"></label></div>
      <div class="f22-leg" hidden></div><div class="f22-svgk"></div><div class="f22-sin-html" hidden></div>
      <dl class="f22-oku f22-oku3"><div><dt>PaO₂</dt><dd data-o="p"></dd></div><div><dt data-o="vl">V̇<sub>E</sub></dt><dd data-o="v"></dd></div><div><dt>Normale göre</dt><dd data-o="x"></dd></div></dl>`;
    const kap = el.querySelector('.f22-svgk'), rng = el.querySelector('[data-r="P"]'), leg = el.querySelector('.f22-leg'), sinH = el.querySelector('.f22-sin-html');
    let G = null, E = {};
    const LW = { w: 700, h: 360, dar: false, x0: 70, x1: 660, y0: 300, y1: 40, xt: [0, 5, 8, 10, 15, 20], vt: [0, 5, 10, 15, 20] };
    const LN = { w: 360, h: 340, dar: true, x0: 54, x1: 346, y0: 300, y1: 30, xt: [0, 5, 8, 10, 20], vt: [0, 5, 10, 15, 20] };
    const X = (P) => G.x0 + P / 20 * (G.x1 - G.x0), Yv = (v) => G.y0 - v / 22 * (G.y0 - G.y1);
    const egriD = (f) => { const pts = []; for (let i = 0; i <= 64; i++) { const P = 4 + 16 * i / 64; pts.push([X(P), Yv(f(P))]); } return dYol(pts); };
    const kur = (dar) => {
      G = dar ? LN : LW;
      const g = G;
      leg.hidden = !dar; sinH.hidden = true;
      leg.innerHTML = Object.keys(EG).map((k) => `<span class="f22-leg-${k}" data-g="${k}"><i></i>${EG[k].kisa}</span>`).join('');
      const xs = g.xt.map((P) => `<line class="f22-eksen" x1="${X(P)}" x2="${X(P)}" y1="${g.y0}" y2="${g.y0 + 5}"/>` + T(X(P), g.y0 + 19, String(P), 'f22-t' + (P === 8 ? ' f22-crit f22-b' : ''), MID)).join('');
      const vs = g.vt.map((v) => `<line class="f22-eksen" x1="${g.x0 - 5}" x2="${g.x0}" y1="${Yv(v)}" y2="${Yv(v)}"/><line class="f22-izgara" x1="${g.x0}" x2="${g.x1}" y1="${Yv(v)}" y2="${Yv(v)}"/>` + T(g.x0 - 9, Yv(v) + 4, String(v), 'f22-t', END)).join('');
      const etk = dar ? '' : Object.keys(EG).map((k) => { const v = EG[k].f(19.5); return T(656, Yv(v) + (k === 'p' ? 18 : -10), EG[k].ad, 'f22-lb2 f22-eg-l ' + k, END + ` data-g="${k}"`); }).join('');
      const bx = dar ? [60, 226, 190, 66] : [78, 222, 218, 68];
      const blines = dar ? ['şiddetli ve uzun süreli', 'hipoksemi → solunum', 'merkezi baskılanır, apne'] : ['şiddetli ve uzun süreli hipoksemi', '→ solunum merkezi baskılanır, apne'];
      kap.innerHTML = `<svg class="f22-svg f22-graf${dar ? ' dar' : ''}" viewBox="0 0 ${g.w} ${g.h}" role="img" aria-label="Dakika ventilasyonunun PaO₂ ile değişimi: 8 kPa'nın altında dik artış; hiperkapnide eğri yukarı kayar">
        <defs>${okMarker('f22-hk-c', 'f22-mk-c')}</defs>
        ${vs}
        <line class="f22-esik" x1="${X(8)}" x2="${X(8)}" y1="${g.y1}" y2="${g.y0}"/>
        ${T(X(8), dar ? 14 : 18, '8 kPa', 'f22-t f22-crit f22-b', MID)}${T(X(8), dar ? 27 : 32, 'eşiğin altında dik artış', 'f22-t f22-crit', MID)}
        <line class="f22-eksen" x1="${g.x0}" x2="${g.x1}" y1="${g.y0}" y2="${g.y0}"/><line class="f22-eksen" x1="${g.x0}" x2="${g.x0}" y1="${g.y0}" y2="${g.y1}"/>
        ${xs}
        ${T((g.x0 + g.x1) / 2, g.y0 + 36, 'PaO₂ (kPa)', 'f22-eksad', MID)}
        <text class="f22-eksad" transform="translate(${dar ? 14 : 22} ${(g.y0 + g.y1) / 2}) rotate(-90)" text-anchor="middle">${dar ? 'V̇E (L/dk)' : 'Dakika ventilasyonu V̇E (L/dk)'}</text>
        <line class="f22-kilavuz" data-k="x"/><line class="f22-kilavuz" data-k="y"/>
        <g class="f22-apne">${R(bx[0], bx[1], bx[2], bx[3], 10, 'f22-apner')}${satir(blines, bx[0] + bx[2] / 2, bx[1] + (dar ? 20 : 26), dar ? 15 : 17, 'f22-lb2 f22-crit', MID)}
          <line class="f22-apneok" x1="${X(5)}" y1="${Yv(VN(5)) + 9}" x2="${X(5)}" y2="${bx[1] - 2}" marker-end="url(#f22-hk-c)"/></g>
        ${Object.keys(EG).map((k) => `<path class="f22-egri ${k}" data-g="${k}" d="${egriD(EG[k].f)}"/>`).join('')}
        ${etk}
        ${Object.keys(EG).map((k) => `<circle class="f22-np ${k}" data-g="${k}" r="7"/>`).join('')}
        <g class="f22-sin">${dar ? '' : R(430, 48, 230, 98, 10, 'f22-sinr') + T(444, 68, '', 'f22-t f22-ink f22-sin-t') + [0, 1, 2, 3].map((i) => `<rect class="f22-sin-s s${i}" x="444" y="${80 + i * 18}" width="10" height="3"/>` + T(462, 85 + i * 18, '', 'f22-sin-r' + (i === 3 ? ' f22-b' : '') + ' r' + i)).join('')}</g>
        <rect class="f22-hit" x="${g.x0}" y="${g.y1}" width="${g.x1 - g.x0}" height="${g.y0 - g.y1}"/>
      </svg>`;
      E = { svg: kap.querySelector('svg'), kx: kap.querySelector('[data-k="x"]'), ky: kap.querySelector('[data-k="y"]') };
      const hit = kap.querySelector('.f22-hit');
      let surt = false;
      const al = (e) => {
        const r = E.svg.getBoundingClientRect(), sx = (e.clientX - r.left) / r.width * G.w;
        st.P = Math.round(clamp((sx - G.x0) / (G.x1 - G.x0) * 20, 4, 20) * 10) / 10; rng.value = st.P; ciz();
      };
      hit.addEventListener('pointerdown', (e) => { surt = true; hit.setPointerCapture(e.pointerId); al(e); });
      hit.addEventListener('pointermove', (e) => { if (surt) al(e); });
      hit.addEventListener('pointerup', () => { surt = false; });
      hit.addEventListener('pointercancel', () => { surt = false; });
      ciz();
    };
    const ciz = () => {
      const a = ADIM[st.s], P = st.P, g = G, sv = E.svg;
      basSec(el, 'adim', st.s);
      sv.querySelectorAll('[data-g]').forEach((n) => {
        const k = n.dataset.g, gor = a.g.includes(k), sol = (a.soluk || []).includes(k);
        n.classList.toggle('f22-gizli', !gor && !(sol && n.classList.contains('f22-egri')) && !(sol && n.classList.contains('f22-eg-l')));
        n.classList.toggle('soluk', sol);
      });
      leg.querySelectorAll('[data-g]').forEach((n) => { const k = n.dataset.g; n.hidden = !(a.g.includes(k) || (a.soluk || []).includes(k)); n.classList.toggle('soluk', (a.soluk || []).includes(k)); });
      a.g.forEach((k) => { const c = sv.querySelector(`.f22-np.${k}`); c.setAttribute('cx', X(P)); c.setAttribute('cy', Yv(EG[k].f(P))); });
      const va = EG[a.ana].f(P), ust = Math.max(...a.g.map((k) => EG[k].f(P)));
      E.kx.setAttribute('x1', X(P)); E.kx.setAttribute('x2', X(P)); E.kx.setAttribute('y1', g.y0); E.kx.setAttribute('y2', Yv(ust));
      E.ky.setAttribute('x1', g.x0); E.ky.setAttribute('x2', X(P)); E.ky.setAttribute('y1', Yv(va)); E.ky.setAttribute('y2', Yv(va));
      sv.classList.toggle('f22-s4', st.s === 4);
      sv.classList.toggle('f22-s5', st.s === 5);
      // sinerji (seçili PaO₂'de)
      // normal 6 L/dk'ya göre artış: yalnız hipoksemi (normokapni eğrisi), yalnız hiperkapni (yüksek PaO₂'de 10,5), birlikte (hiperkapni eğrisi)
      const r1 = (v) => Math.round(v * 10) / 10;
      const dH = r1(VN(P) - 6), dC = 4.5, dB = r1(VH(P) - 6);
      const satirlar = [`yalnız hipoksemi +${fmt(dH)}`, `yalnız hiperkapni +${fmt(dC)}`, `toplam ${fmt(dH + dC)}`, `birlikte +${fmt(dB)}` + (dB > dH + dC + 0.05 ? ' → sinerji' : '')];
      const bas = `PaO₂ ${fmt(P)} kPa'da artış (L/dk)`;
      if (!g.dar) { sv.querySelector('.f22-sin-t').textContent = bas; satirlar.forEach((s, i) => { sv.querySelector('.f22-sin-r.r' + i).textContent = s; }); }
      sinH.hidden = !(g.dar && st.s === 4);
      if (g.dar) sinH.innerHTML = `<b>${bas}</b>${satirlar.map((s, i) => `<span class="s${i}"><i></i>${s}</span>`).join('')}`;
      // okumalar
      el.querySelector('[data-o="P"]').textContent = fmt(P) + ' kPa';
      rng.setAttribute('aria-valuetext', fmt(P) + ' kPa');
      el.querySelector('[data-o="p"]').textContent = fmt(P) + ' kPa';
      el.querySelector('[data-o="vl"]').innerHTML = 'V̇<sub>E</sub> · ' + EG[a.ana].kisa;
      el.querySelector('[data-o="v"]').textContent = fmt(va) + ' L/dk';
      el.querySelector('[data-o="x"]').textContent = '×' + fmt(va / 6);
      const c = {
        1: `<b>Normokapni.</b> PaCO₂ 5,3 kPa iken PaO₂ ${fmt(P)} kPa için V̇<sub>E</sub> ≈ ${fmt(VN(P))} L/dk. ` + (P >= 8 ? "PaO₂ 8 kPa'nın üstünde ventilasyon neredeyse değişmez. [[K1 s. 95]]" : "PaO₂ 8 kPa'nın altına düştüğünde periferik kemoreseptörler solunum merkezini hızla uyarır ve ventilasyon belirgin biçimde artar. [[K1 s. 95]]"),
        2: `<b>Hiperkapni eklendi.</b> Hipoksemiye ventilatuvar yanıt hiperkapni varlığında daha da güçlenir: eğri yukarı kayar ve dikleşir. PaO₂ ${fmt(P)} kPa'da normokapnide ≈${fmt(VN(P))}, hiperkapnide ≈${fmt(VH(P))} L/dk. [[K1 s. 95]]`,
        3: "<b>Periferik kemoreseptörler yoksa.</b> Merkezi kemoreseptörler hipoksemiyle uyarılmaz; dahası, periferik kemoreseptörler yokken hipoksemi solunum merkezini baskılar. Eğri 8 kPa'nın altında yükselmek yerine iner. [[K1 s. 94]]",
        4: "<b>Sinerji.</b> Periferik ve merkezi kemoreseptör girdileri sinerjiktir: PaO₂ 5 kPa'da yalnız hipoksemi ventilasyonu ≈3,9 L/dk, yalnız hiperkapni ≈4,5 L/dk artırır; ikisi birlikteyken artış ≈10,6 L/dk, yani iki etkinin toplamından büyüktür (şematik model). [[K1 s. 94–95]]",
        5: '<b>Şiddetli ve uzun süreli hipoksemi.</b> Hipoksemi başlangıçta ventilasyonu artırır, ama şiddetli ve uzun sürerse solunum merkezi üzerindeki baskılayıcı etkisi baskınlaşır ve apneye yol açar. Bu, eğrinin kendisinde görünmez: zamana bağlı bir değişimdir. [[K1 s. 95]]',
      };
      cap.yaz(c[st.s]);
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-adim]'); if (!b) return;
      st.s = +b.dataset.adim;
      const a = ADIM[st.s]; if (a.P) { st.P = a.P; rng.value = a.P; }
      ciz();
    });
    rng.addEventListener('input', () => { st.P = +rng.value; ciz(); });
    return genislik(el, kur);
  };

  /* ================= 5 · CO₂ yanıt eğrisi ================= */
  VIZ.f22_co2 = (el) => {
    const cap = capOf(el);
    const VN = (P) => (P <= 10 ? 6 + 4.5 * (P - 5.3) : Math.max(0, 27.15 + 4.5 * (P - 10) - 1.8 * (P - 10) * (P - 10)));
    const EG = { n: { s: 0, ad: 'normal', cls: 'n' }, a: { s: 1.5, ad: 'anestezik ajanlar', cls: 'a' }, o: { s: 2.5, ad: 'opioidler', cls: 'o' } };
    const VS = (k, P) => (P - EG[k].s < 5 - 1e-9 ? null : VN(P - EG[k].s));
    const OPT = { n: { ad: 'Normal', g: ['n'] }, a: { ad: '+ Anestezik ajan', g: ['n', 'a'], k: 'a' }, o: { ad: '+ Opioid', g: ['n', 'o'], k: 'o' }, ucu: { ad: 'Üçü birlikte', g: ['n', 'a', 'o'] } };
    const st = { o: 'n', P: 8 };
    el.innerHTML = `<div class="f22-ust">${segHtml('Eğri', 'e', Object.keys(OPT).map((k) => [k, OPT[k].ad]), st.o)}
        <label class="f22-rng"><span>PaCO₂ <output data-o="P"></output></span><input type="range" min="5" max="16" step="0.1" value="8" data-r="P" aria-label="PaCO₂ (kPa)"></label></div>
      <div class="f22-leg" hidden></div><div class="f22-svgk"></div>
      <dl class="f22-oku f22-oku4"><div><dt>PaCO₂</dt><dd data-o="p"></dd></div><div><dt>V̇<sub>E</sub> · normal</dt><dd data-o="vn"></dd></div><div><dt>V̇<sub>E</sub> · ilaçla</dt><dd data-o="vi"></dd></div><div><dt>Bölge</dt><dd data-o="b"></dd></div></dl>`;
    const kap = el.querySelector('.f22-svgk'), rng = el.querySelector('[data-r="P"]'), leg = el.querySelector('.f22-leg');
    let G = null, E = {};
    const LW = { w: 700, h: 398, dar: false, x0: 72, x1: 660, y0: 330, y1: 80, xt: [5, 6, 8, 10, 12, 14, 16], vt: [0, 10, 20, 30] };
    const LN = { w: 360, h: 340, dar: true, x0: 56, x1: 346, y0: 300, y1: 44, xt: [5, 8, 10, 12, 16], vt: [0, 10, 20, 30] };
    const X = (P) => G.x0 + (P - 4) / 12 * (G.x1 - G.x0), Yv = (v) => G.y0 - v / 32 * (G.y0 - G.y1);
    const parca = (k, a, b) => { const s = EG[k].s, pts = []; const n = Math.max(2, Math.ceil((b - a) * 10)); for (let i = 0; i <= n; i++) { const P = a + (b - a) * i / n; pts.push([X(P), Yv(VN(P - s))]); } return dYol(pts); };
    const kur = (dar) => {
      G = dar ? LN : LW;
      const g = G;
      leg.hidden = !dar;
      leg.innerHTML = Object.keys(EG).map((k) => `<span class="f22-leg-${k}" data-g="${k}"><i></i>${EG[k].ad}</span>`).join('');
      const xs = g.xt.map((P) => `<line class="f22-eksen${P === 5 || P === 10 ? ' kalin' : ''}" x1="${X(P)}" x2="${X(P)}" y1="${g.y0}" y2="${g.y0 + (P === 5 || P === 10 ? 7 : 5)}"/>` + T(X(P), g.y0 + 19, String(P), 'f22-t' + (P === 5 || P === 10 ? ' f22-b f22-ink' : ''), MID)).join('');
      const vs = g.vt.map((v) => `<line class="f22-eksen" x1="${g.x0 - 5}" x2="${g.x0}" y1="${Yv(v)}" y2="${Yv(v)}"/><line class="f22-izgara" x1="${g.x0}" x2="${g.x1}" y1="${Yv(v)}" y2="${Yv(v)}"/>` + T(g.x0 - 9, Yv(v) + 4, String(v), 'f22-t', END)).join('');
      const egri = Object.keys(EG).map((k) => {
        const s = EG[k].s, a = 5 + s, b = Math.min(15.2 + s, 16);
        return `<g class="f22-c-eg ${k}" data-g="${k}"><path class="f22-egri ${k}" d="${parca(k, a, 10 + s)}"/><path class="f22-egri ${k} kesik" d="${parca(k, 10 + s, b)}"/></g>`;
      }).join('');
      const pk = (k) => X(11.25 + EG[k].s);
      const adlar = dar ? '' : Object.keys(EG).map((k, i) => T(pk(k), [87, 73, 59][i], EG[k].ad, 'f22-lb2 f22-eg-l ' + k, MID + ` data-g="${k}"`)).join('');
      kap.innerHTML = `<svg class="f22-svg f22-graf${dar ? ' dar' : ''}" viewBox="0 0 ${g.w} ${g.h}" role="img" aria-label="Dakika ventilasyonunun PaCO₂ ile değişimi: 5–10 kPa arasında doğrusal artış, yüksek PaCO₂'de düşüş; anestezik ajanlar ve opioidlerle eğri sağa kayar">
        <defs>${okMarker('f22-c2-m', 'f22-mk-m')}</defs>
        <rect class="f22-band ok" x="${X(5)}" y="${g.y1}" width="${X(10) - X(5)}" height="${g.y0 - g.y1}"/>
        <rect class="f22-band crit" x="${X(12.5)}" y="${g.y1}" width="${X(16) - X(12.5)}" height="${g.y0 - g.y1}"/>
        ${vs}
        ${dar ? T(X(7.5), g.y1 - 8, '5–10 kPa doğrusal', 'f22-t f22-ok f22-b', MID) + T(X(16), g.y1 - 8, 'depresyon', 'f22-t f22-crit f22-b', END)
          : T(X(7.5), 24, '5–10 kPa', 'f22-lb2 f22-ok', MID) + T(X(7.5), 38, 'doğrusal yanıt', 'f22-lb2 f22-ok', MID) + T(X(16), 24, "yüksek PaCO₂'de", 'f22-lb2 f22-crit', END) + T(X(16), 38, 'solunum depresyonu', 'f22-lb2 f22-crit', END)}
        <line class="f22-eksen" x1="${g.x0}" x2="${g.x1}" y1="${g.y0}" y2="${g.y0}"/><line class="f22-eksen" x1="${g.x0}" x2="${g.x0}" y1="${g.y0}" y2="${g.y1}"/>
        ${xs}
        ${T((g.x0 + g.x1) / 2, g.y0 + 36, 'PaCO₂ (kPa)', 'f22-eksad', MID)}
        <text class="f22-eksad" transform="translate(${dar ? 14 : 22} ${(g.y0 + g.y1) / 2}) rotate(-90)" text-anchor="middle">${dar ? 'V̇E (L/dk)' : 'Dakika ventilasyonu V̇E (L/dk)'}</text>
        ${dar ? '' : T(X(14) - 8, Yv(VN(14)) + 4, 'hayvan deneyleri', 'f22-t f22-kucuk', END)}
        <g class="f22-kilg">
          <line class="f22-kilavuz" data-k="v"/><line class="f22-kilavuz" data-k="h"/>
          <line class="f22-c-cift" data-k="c" marker-start="url(#f22-c2-m)" marker-end="url(#f22-c2-m)"/>
          <circle class="f22-c-hp" data-k="h1" r="4.5"/><circle class="f22-c-hp" data-k="h2" r="4.5"/>
        </g>
        <line class="f22-c-kay" data-k="kay" marker-end="url(#f22-c2-m)"/>
        ${egri}
        ${adlar}
        ${Object.keys(EG).map((k) => `<circle class="f22-np ${k}" data-g="${k}" data-p="${k}" r="6"/>`).join('')}
        ${dar ? '' : `<g class="f22-c-oku">
          <line class="f22-c-kay" x1="84" x2="104" y1="128" y2="128" marker-end="url(#f22-c2-m)"/>${T(114, 132, '', 'f22-t f22-ink f22-c-o1')}
          <line class="f22-kilavuz" x1="94" x2="94" y1="138" y2="154"/>${T(114, 150, '', 'f22-t f22-ink f22-c-o2')}
          <line class="f22-kilavuz" x1="84" x2="104" y1="164" y2="164"/>${T(114, 168, '', 'f22-t f22-ink f22-c-o3')}</g>`}
        <rect class="f22-hit" x="${g.x0}" y="${g.y1}" width="${g.x1 - g.x0}" height="${g.y0 - g.y1}"/>
      </svg>`;
      E = { svg: kap.querySelector('svg') };
      kap.querySelectorAll('[data-k]').forEach((n) => { E[n.dataset.k] = n; });
      const hit = kap.querySelector('.f22-hit');
      let surt = false;
      const al = (e) => {
        const r = E.svg.getBoundingClientRect(), sx = (e.clientX - r.left) / r.width * G.w;
        st.P = Math.round(clamp(4 + (sx - G.x0) / (G.x1 - G.x0) * 12, 5, 16) * 10) / 10; rng.value = st.P; ciz();
      };
      hit.addEventListener('pointerdown', (e) => { surt = true; hit.setPointerCapture(e.pointerId); al(e); });
      hit.addEventListener('pointermove', (e) => { if (surt) al(e); });
      hit.addEventListener('pointerup', () => { surt = false; });
      hit.addEventListener('pointercancel', () => { surt = false; });
      ciz();
    };
    const set = (n, o) => { for (const k in o) n.setAttribute(k, o[k]); };
    const ciz = () => {
      const o = OPT[st.o], P = st.P, g = G, sv = E.svg, k = o.k;
      basSec(el, 'e', st.o);
      sv.querySelectorAll('[data-g]').forEach((n) => n.classList.toggle('f22-gizli', !o.g.includes(n.dataset.g)));
      leg.querySelectorAll('[data-g]').forEach((n) => { n.hidden = !o.g.includes(n.dataset.g); });
      o.g.forEach((kk) => {
        const c = sv.querySelector(`[data-p="${kk}"]`), v = VS(kk, P);
        c.classList.toggle('f22-gizli', v === null);
        if (v !== null) set(c, { cx: X(P), cy: Yv(v) });
      });
      const vn = VN(P), vk = k ? VS(k, P) : null;
      sv.classList.toggle('f22-kay-on', !!k);
      if (k) {
        const s = EG[k].s, y8 = Yv(VN(8));
        set(E.kay, { x1: X(8) + 7, x2: X(8 + s) - 8, y1: y8, y2: y8 });
        const yTop = Yv(vn);
        set(E.v, { x1: X(P), x2: X(P), y1: g.y0, y2: Math.min(yTop, vk === null ? yTop : Yv(vk)) - 4 });
        const ok = vk !== null && Math.abs(Yv(vk) - yTop) > 22;
        E.c.classList.toggle('f22-gizli', !ok);
        if (ok) { const y1 = Math.min(yTop, Yv(vk)), y2 = Math.max(yTop, Yv(vk)); set(E.c, { x1: X(P) - 12, x2: X(P) - 12, y1: y1 + 8, y2: y2 - 8 }); }
        E.h.classList.toggle('f22-gizli', g.dar);
        set(E.h, { x1: g.x0, x2: X(5.3 + s), y1: Yv(6), y2: Yv(6) });
        set(E.h1, { cx: X(5.3), cy: Yv(6) }); set(E.h2, { cx: X(5.3 + s), cy: Yv(6) });
        E.h1.classList.toggle('f22-gizli', g.dar); E.h2.classList.toggle('f22-gizli', g.dar);
        if (!g.dar) {
          sv.querySelector('.f22-c-o1').textContent = `sağa kayma ${fmt(s)} kPa`;
          sv.querySelector('.f22-c-o2').textContent = vk === null ? `aynı PaCO₂'de: bu eğri ${fmt(5 + s)} kPa'dan başlar` : vk <= vn ? `aynı PaCO₂'de ${fmt(vn - vk)} L/dk daha az` : `burada normal eğri tepesini geçmiş, inişte`;
          sv.querySelector('.f22-c-o3').textContent = `aynı V̇E için PaCO₂ 5,3 → ${fmt(5.3 + s)} kPa`;
        }
      }
      // okumalar
      el.querySelector('[data-o="P"]').textContent = fmt(P) + ' kPa';
      rng.setAttribute('aria-valuetext', fmt(P) + ' kPa');
      el.querySelector('[data-o="p"]').textContent = fmt(P) + ' kPa';
      el.querySelector('[data-o="vn"]').textContent = fmt(vn) + ' L/dk';
      const vi = el.querySelector('[data-o="vi"]');
      if (st.o === 'ucu') { const a = VS('a', P), b = VS('o', P); vi.textContent = `anestezik ${a === null ? '—' : fmt(a)} · opioid ${b === null ? '—' : fmt(b)}`; }
      else vi.textContent = k ? (vk === null ? '—' : fmt(vk) + ' L/dk') : '—';
      const bd = el.querySelector('[data-o="b"]');
      const [bt, bc] = P <= 10 ? ['doğrusal 5–10 kPa', 'f22-ok'] : P <= 12.5 ? ['doğrusal aralığın üstü', ''] : ['solunum depresyonu', 'f22-crit'];
      bd.textContent = bt; bd.className = bc;
      let c;
      if (st.o === 'n') c = `<b>Normal yanıt.</b> PaCO₂ ${fmt(P)} kPa'da V̇<sub>E</sub> ≈ ${fmt(vn)} L/dk. ` + (P <= 10 ? "Ventilasyonun CO₂'ye yanıtı normal klinik sınırlar içinde (PaCO₂ 5–10 kPa) doğrusaldır. [[K1 s. 96]]" : P <= 12.5 ? 'Doğrusal aralığın üstünde eğri yatıklaşır. [[K1 s. 96]]' : "Hayvan deneyleri, ileri derecede hiperkapnide V̇<sub>E</sub>'nin azaldığını göstermiştir: eğrinin bu ucunda solunum depresyonu vardır. [[K1 s. 96]]");
      else if (st.o === 'ucu') c = "<b>Üç eğri birlikte.</b> Sağa kayma iki biçimde okunur: aynı PaCO₂'de daha az ventilasyon ve aynı ventilasyon için daha yüksek PaCO₂. Normal eğride 6 L/dk'lık ventilasyona karşılık gelen PaCO₂ 5,3 kPa iken, anestezik ajanla 6,8 kPa'ya, opioidle 7,8 kPa'ya çıkar (şematik model). [[K1 s. 96]]";
      else {
        const son = vk === null ? `PaCO₂ ${fmt(P)} kPa bu eğrinin çizim aralığının altında kalır.` : vk > vn
          ? `PaCO₂ ${fmt(P)} kPa doğrusal aralığın çok üstündedir: normal eğri tepesini geçip inerken kaymış eğri henüz tepesindedir; kaymanın anlamı doğrusal bölgede okunur.`
          : `PaCO₂ ${fmt(P)} kPa'da ventilasyon ${fmt(vn)} yerine ${fmt(vk)} L/dk${k === 'a' ? ' olur' : ''}.`;
        c = k === 'a'
          ? `<b>Anestezik ajanlar.</b> Bütün anestezik ajanlar hem solunum merkezi hem periferik kemoreseptörler üzerinde baskılayıcı etkiye sahiptir; hiperkapniye ve hipoksemiye ventilatuvar yanıt azalır. Grafikte eğri sağa kayar: ${son} [[K1 s. 96]]`
          : `<b>Opioidler.</b> Kitaba göre opioidlerin kemoreseptörlerin hipoksemi ya da hiperkapni yanıtı üzerinde etkisi yoktur; medüller solunum merkezini belirgin biçimde baskılarlar. Sonuç yine sağa kaymış bir CO₂ yanıt eğrisidir: ${son} [[K1 s. 96]]`;
      }
      cap.yaz(c);
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-e]'); if (b) { st.o = b.dataset.e; ciz(); } });
    rng.addEventListener('input', () => { st.P = +rng.value; ciz(); });
    return genislik(el, kur);
  };
  /* ================= 6 · Solunum merkezine gelen öbür girdiler ================= */
  VIZ.f22_girdiler = (el) => {
    const viz = el.closest('.viz'), capEl = viz ? viz.querySelector('.viz-cap') : null;
    const varsayilan = capEl ? capEl.innerHTML : '';
    let sonCap = -1;
    /* t: başlık · a: alt satır · e: [dar etiket, renk sınıfı, -, geniş etki satırı] · c: açıklama */
    const G = [
      { t: 'Serebral korteks', a: 'istemli kontrol; kırılma noktası', e: ['geçici bastırır', 'f22-warn', '', 'istemli olarak geçici bastırır'], c: '<b>Serebral korteks.</b> Öbür girdilerin hepsi istemli düşünceyle geçici olarak bastırılabilir. Ama kısa bir apneden sonra hipoksemi ya da hiperkapninin kemoreseptör uyarısı istemli kontrolü aşar: kırılma noktası. [[K1 s. 95]]' },
      { t: 'Limbik sistem', a: 'aşırı duygu', e: ['V̇E ↑', 'f22-ok', '', 'V̇E ↑ (hiperventilasyon)'], c: '<b>Limbik sistem.</b> Aşırı duygusal durumlar solunum merkezini uyarır ve hiperventilasyona yol açar. [[K1 s. 95]]' },
      { t: 'Talamus', a: 'çekirdek sıcaklık ↑', e: ['V̇E ↑', 'f22-ok'], c: '<b>Talamus.</b> Kitaba göre çekirdek vücut sıcaklığının artması ventilasyonu uyarır (sıcaklık merkezi hipotalamustur). [[K1 s. 95]]' },
      { t: 'Gerilme reseptörleri', a: 'akciğer · bronş düz kası · vagus', e: ['derinlik ↓', 'f22-acc', '', 'insp. derinliği ↓ (Hering–Breuer)'], soru: 1, apn: 1, c: '<b>Akciğer gerilme reseptörleri.</b> Bronşiyal düz kastadır. Aşırı şişme impulsları vagusla apnöstik merkeze taşır ve inspirasyon derinliği azalır: Hering–Breuer refleksi. Normal solunumda tetiklenmesi pek olası değildir; yenidoğanda ve ventilatördeki hastada önemli olabilir. [[K1 s. 94–95]]' },
      { t: 'J-reseptörleri', a: 'alveol duvarı · miyelinsiz C lifleri', e: ['V̇E ↑', 'f22-ok', '', 'V̇E ↑, dispne, bradikardi, hipotansiyon'], c: '<b>J-reseptörleri (jukstakapiller).</b> Alveol duvarındaki miyelinsiz C lifleri. Etkinleşince ventilasyon artar, dispne, bradikardi ve hipotansiyon olur; pulmoner ödem ve pulmoner emboliyle uyarıldıkları düşünülür. [[K1 s. 95]]' },
      { t: 'İrritan reseptörler', a: 'hava yolu epiteli · zararlı gaz', e: ['V̇E ↑', 'f22-ok', '', 'bronkokonstriksiyon + V̇E ↑'], c: '<b>İrritan reseptörler.</b> Hava yolu epitelindedir; zararlı gazlarda bronkokonstriksiyona yol açar ve ventilasyonu uyarır. [[K1 s. 95]]' },
      { t: 'Kas iğcikleri', a: 'egzersiz', e: ['V̇E ↑', 'f22-ok', '', 'V̇E ↑ (yanıtı başlatır)'], soru: 1, c: '<b>Kas iğcikleri.</b> Egzersize ventilatuvar yanıtı başlattığı düşünülür. [[K1 s. 95]]' },
      { t: 'Ağrı reseptörleri', a: 'ağrı', e: ['V̇E ↑', 'f22-ok'], c: '<b>Ağrı reseptörleri.</b> Etkinleşmeleri ventilasyonu uyarır. [[K1 s. 95]]' },
      { t: 'Eklem propriyoseptörleri', a: 'algılayıcılar arasında sayılır', e: ['', 'f22-gmut', '', 'etkisi kitapta ayrıca verilmez'], kes: 1, c: '<b>Eklem propriyoseptörleri.</b> Kitap onları ventilasyonun algılayıcıları arasında sayar. [[K1 s. 93]]' },
    ];
    const SERIT = ['Mekanoreseptörlerin katkısı tartışmalı: denervasyonlu nakledilmiş akciğerlerde ventilatuvar yanıt normaldir.'];
    const SERIT_D = ['Mekanoreseptörlerin katkısı tartışmalı:', 'denervasyonlu nakledilmiş akciğerlerde', 'ventilatuvar yanıt normaldir.'];
    let sec = -1, dar = null;
    el.innerHTML = '<div class="f22-svgk"></div>';
    const kap = el.querySelector('.f22-svgk');

    /* geniş yerleşim: kutu [x, y, w, h], ok yolu ve etiket konumu */
    const geniş = () => {
      const W = 200, H = 56, top = [[50, 12], [260, 12], [470, 12]], sol = [[8, 92], [8, 162], [8, 232]], sag = [[512, 92], [512, 162], [512, 232]];
      const kut = [...top, ...sol, ...sag].map(([x, y]) => [x, y, W, H]);
      const hedT = [[320, 162], [360, 162], [400, 162]], hedS = [[280, 175], [280, 194], [280, 212]], hedR = [[440, 175], [440, 194], [440, 212]];
      const ok = kut.map(([x, y, w, h], i) => {
        if (i < 3) { const [hx, hy] = hedT[i]; return [x + w / 2, y + h, hx, hy - 2]; }
        if (i < 6) { const [hx, hy] = hedS[i - 3]; return [x + w, y + h / 2, hx - 2, hy]; }
        const [hx, hy] = hedR[i - 6]; return [x, y + h / 2, hx + 2, hy];
      });
      return { w: 720, h: 352, kut, ok, dar: false,
        mz: [280, 162, 160, 60], mzT: [[360, 203, 'Solunum merkezi', 'f22-gb f22-gmt'], [360, 217, 'beyin sapı', 'f22-ga']], apn: [286, 167, 96, 16],
        kas: [360, 222, 360, 256], kasT: [360, 274], serit: [12, 300, 696, 44], seritT: SERIT, seritY: 326 };
    };
    const darY = () => {
      const kut = G.map((_, i) => [12, 86 + 60 * i, 300, 52]);
      const ok = kut.map(([x, y, w, h]) => `M${x + w} ${y + h / 2} H336 V40 H${266}`);
      return { w: 360, h: 708, kut, ok, dar: true,
        mz: [96, 8, 168, 64], mzT: [[180, 34, 'Solunum merkezi', 'f22-gb f22-gmt'], [180, 54, 'beyin sapı', 'f22-ga']], apn: null,
        kas: [94, 40, 16, 40], kasT: [52, 62], serit: [12, 632, 336, 70], seritT: SERIT_D, seritY: 656 };
    };
    const ciz = () => {
      const g = dar ? darY() : geniş();
      const kutuG = G.map((o, i) => {
        const [x, y, w, h] = g.kut[i];
        const tag = o.e ? (g.dar ? T(x + w - 12, y + 21, o.e[0], 'f22-gt ' + o.e[1], END) : T(x + w / 2, y + 49, o.e[3] || o.e[0], 'f22-gt ' + o.e[1], MID + ` data-mw="${w - 14}"`)) : '';
        const soru = o.soru ? `<g class="f22-g-soru"><circle cx="${x + 2}" cy="${y + 2}" r="8"/>${T(x + 2, y + 6, '?', 'f22-g-sorut', MID)}</g>` : '';
        const tx = g.dar ? x + 14 : x + w / 2, an = g.dar ? '' : MID;
        return `<g class="f22-g-kutu" data-g="${i}" role="button" tabindex="0" aria-pressed="false" aria-label="${o.t}">${R(x, y, w, h, 10, 'f22-g-r')}${T(tx, y + (g.dar ? 22 : 18), o.t, 'f22-gb', an + ` data-mw="${g.dar ? w - 28 - (o.e ? 90 : 0) : w - 16}"`)}${T(tx, y + (g.dar ? 41 : 33), o.a, 'f22-ga', an + ` data-mw="${w - (g.dar ? 28 : 16)}"`)}${tag}${soru}</g>`;
      });
      const oklar = G.map((o, i) => {
        const d = g.dar ? g.ok[i] : `M${g.ok[i][0]} ${g.ok[i][1]} L${g.ok[i][2]} ${g.ok[i][3]}`;
        return `<path class="f22-g-ok${o.kes ? ' kes' : ''}" data-go="${i}" d="${d}" marker-end="url(#f22-ok)"/>`;
      });
      const [mx, my, mw, mh] = g.mz;
      const apn = g.apn ? `<g class="f22-g-apn">${R(g.apn[0], g.apn[1], g.apn[2], g.apn[3], 6, 'f22-g-apnr')}${T(g.apn[0] + g.apn[2] / 2, g.apn[1] + 12, 'apnöstik merkez', 'f22-ga', MID)}</g>` : '';
      const kasOk = g.dar
        ? `<path class="f22-g-kas" d="M${mx} 40 H16" marker-end="url(#f22-okm)"/>${T(g.kasT[0], g.kasT[1], 'solunum', 'f22-ga', MID)}${T(g.kasT[0], g.kasT[1] + 15, 'kasları', 'f22-ga', MID)}`
        : `<path class="f22-g-kas" d="M${g.kas[0]} ${g.kas[1]} V${g.kas[3]}" marker-end="url(#f22-okm)"/>${T(g.kasT[0], g.kasT[1], '→ solunum kasları', 'f22-ga', MID)}`;
      const [sx, sy, sw, sh] = g.serit;
      kap.innerHTML = `<svg class="f22-svg f22-gird${g.dar ? ' dar' : ''}" viewBox="0 0 ${g.w} ${g.h}" role="img" aria-label="Kemoreseptör dışı dokuz girdinin solunum merkezine ulaşan yolları ve ventilasyona etkileri">
        <defs>${okMarker('f22-ok', 'f22-mk-m')}${okMarker('f22-oka', 'f22-mk-a')}${okMarker('f22-okm', 'f22-mk-m')}</defs>
        <g class="f22-g-oklar">${oklar.join('')}</g>
        <g class="f22-g-mz">${R(mx, my, mw, mh, 14, 'f22-g-mzr')}${g.mzT.map(([x, y, s, c]) => T(x, y, s, c, MID)).join('')}${apn}</g>
        ${kasOk}${kutuG.join('')}
        ${R(sx, sy, sw, sh, 10, 'f22-g-serit')}${g.seritT.map((s, i) => T(sx + sw / 2, g.seritY + i * 17, s, 'f22-g-seritt', MID)).join('')}
      </svg>`;
      /* uzun yazıyı kutuya sığdır */
      kap.querySelectorAll('text[data-mw]').forEach((t) => {
        try { const mw2 = +t.dataset.mw; if (t.getComputedTextLength() > mw2) { t.setAttribute('textLength', mw2); t.setAttribute('lengthAdjust', 'spacingAndGlyphs'); } } catch (e) { /* görünmüyor */ }
      });
      uygula();
    };
    const uygula = () => {
      const svg = kap.querySelector('svg');
      if (!svg) return;
      svg.classList.toggle('f22-g-secili', sec >= 0);
      svg.querySelectorAll('[data-g]').forEach((k) => { const on = +k.dataset.g === sec; k.classList.toggle('on', on); k.setAttribute('aria-pressed', String(on)); });
      svg.querySelectorAll('[data-go]').forEach((p) => {
        const on = +p.dataset.go === sec;
        p.classList.toggle('on', on);
        p.setAttribute('marker-end', on ? 'url(#f22-oka)' : 'url(#f22-ok)');
        if (on) p.parentNode.appendChild(p);
      });
      const apn = svg.querySelector('.f22-g-apn');
      if (apn) apn.classList.toggle('on', sec === 3);
      if (capEl && sonCap !== sec) { capEl.innerHTML = sec < 0 ? varsayilan : REF(G[sec].c); sonCap = sec; }
    };
    const sec_ = (i) => { sec = sec === i ? -1 : i; uygula(); };
    const tik = (e) => { const k = e.target.closest('[data-g]'); if (k) sec_(+k.dataset.g); };
    const tus = (e) => { if (e.key !== 'Enter' && e.key !== ' ') return; const k = e.target.closest('[data-g]'); if (k) { e.preventDefault(); sec_(+k.dataset.g); } };
    el.addEventListener('click', tik);
    el.addEventListener('keydown', tus);
    const bitir = genislik(el, (d) => { dar = d; ciz(); });
    return () => { bitir(); el.removeEventListener('click', tik); el.removeEventListener('keydown', tus); if (capEl) capEl.innerHTML = varsayilan; };
  };
})();
