/* Fizyoloji Bölüm 19 · Oksijen kaskadı · bileşenler.
   Modeller eğitim amaçlı ve şematiktir. Atmosfer, trakea, alveol, pulmoner kapiller, arter ve Pasteur noktası K1 s. 80–81'den;
   venöz uç 5,3 kPa Bölüm 8'den (K1 s. 30); diğer büyüklükler (mitokondri düzeyi, hastalık basamakları, akım, çap) şematiktir.
   Tarif: docs/tasarim/fiz19.md */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2);
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',');
  const r1 = (v) => +v.toFixed(1);
  const ESIK = 640; // bu genişliğin altında dar (telefon) yerleşimi: SVG yazıları ekranda ≈ 11 px'in altına inmesin

  /* ortak sabitler · K1 s. 80–81 */
  const PB_DENIZ = 101.325, FIO2 = 0.2093, PSVP = 6.3, R = 0.8, PACO2 = 5.3;
  const atm = (pb) => pb * FIO2;
  const karina = (pb) => (pb - PSVP) * FIO2;
  const pao2 = (pb, pc) => karina(pb) - pc / R;

  /* ---------- yardımcılar ---------- */
  const duyarli = (el, kur) => {
    let dar = null;
    const bak = () => { const w = el.clientWidth; const d = w > 0 && w < ESIK; if (d !== dar) { dar = d; kur(d); } };
    bak();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(bak) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const capci = (el) => {
    const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap');
    let son = null;
    return (h) => { if (c && h !== son) { c.innerHTML = REF(h); son = h; } };
  };
  const topla = (kok, ad) => { const o = {}; kok.querySelectorAll(`[${ad}]`).forEach((n) => { o[n.getAttribute(ad)] = n; }); return o; };
  const yaz = (n, s) => { if (n && n._t !== s) { n.textContent = s; n._t = s; } };
  const yazH = (n, s) => { if (n && n._h !== s) { n.innerHTML = s; n._h = s; } };
  const degYaz = (n, s) => { yazH(n, s); if (n) n.classList.toggle('f19-ok-i', s === '↓'); };
  const at = (n, k, v) => { if (n) n.setAttribute(k, typeof v === 'number' ? String(+v.toFixed(2)) : v); };
  const sinif = (n, c, on) => { if (n) n.classList.toggle(c, !!on); };
  const segH = (ad, key, list, ek = '') => `<div class="seg ${ek}" role="group" aria-label="${ad}">${list.map(([v, t]) => `<button type="button" data-${key}="${v}" aria-pressed="false">${t}</button>`).join('')}</div>`;
  const bas = (kok, key, v) => kok.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute(`data-${key}`) === String(v))));
  /* neden hapı: yuvarlatılmış kutu; kutu boyu yazı ölçülerek hapOlc ile ayarlanır */
  const hap = (x, y, satir, { an = 'middle', cls = '', ek = '' } = {}) => {
    const L = Array.isArray(satir) ? satir : [satir];
    const ts = L.map((s, i) => `<tspan x="${x}"${i ? ' dy="1.2em"' : ''}>${s}</tspan>`).join('');
    const y0 = y + 4 - (L.length - 1) * 6.6;
    return `<g class="f19-hap ${cls}" ${ek}><rect rx="8"/><text x="${x}" y="${y0.toFixed(1)}" text-anchor="${an}">${ts}</text></g>`;
  };
  const hapOlc = (kok) => {
    if (!kok) return;
    kok.querySelectorAll('.f19-hap').forEach((g) => {
      const t = g.querySelector('text'), r = g.querySelector('rect');
      if (!t || !r) return;
      let b; try { b = t.getBBox(); } catch (e) { return; }
      if (!b || !b.width) return;
      at(r, 'x', b.x - 7); at(r, 'width', b.width + 14); at(r, 'y', b.y - 2.5); at(r, 'height', b.height + 5);
    });
  };
  const fontSonra = (f) => { if (document.fonts && document.fonts.ready) document.fonts.ready.then(f).catch(() => {}); };
  /* çoklu doğru üzerinde uzunluk oranıyla nokta */
  const cizgi = (pts) => {
    const d = []; let L = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); d.push(l); L += l; }
    const nokta = (s) => {
      s = clamp(s, 0, L);
      for (let i = 0; i < d.length; i++) {
        if (s <= d[i] || i === d.length - 1) { const g = d[i] ? clamp(s / d[i], 0, 1) : 1; return [lerp(pts[i][0], pts[i + 1][0], g), lerp(pts[i][1], pts[i + 1][1], g)]; }
        s -= d[i];
      }
      return pts[pts.length - 1];
    };
    return { L, nokta };
  };
  const okMarker = (id, renk) => `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0L10 5L0 10z" style="fill:var(${renk})"/></marker>`;

  /* =====================================================================
     1 · atmosferden mitokondriye basamak basamak kaskad (adımlı)
     ===================================================================== */
  VIZ.f19_kaskad = (el) => {
    const cap = capci(el);
    const ATM = atm(PB_DENIZ), KAR = karina(PB_DENIZ), ALV = pao2(PB_DENIZ, PACO2), ART = 13.0, VEN = 5.3, MIT = 1.0;
    const DEG = [ATM, KAR, ALV, ALV, ART, ART, MIT];
    const TUR = ['gaz', 'gaz', 'gaz', 'kan', 'kan', 'kan', 'hucre'];
    const ADW = [['Atmosfer'], ['Trakea'], ['Alveol'], ['Pulmoner', 'kapiller'], ['Arter'], ['Doku', 'kapilleri'], ['Mitokondri']];
    const ADD = ['Atmosfer', 'Trakea', 'Alveol', 'Pulmoner kap.', 'Arter', 'Doku kap.', 'Mitokondri'];
    const ETK = {
      kpa: { v: ['21,2', '19,9', '13,3', '13,3', '13,0', '13,0', '&lt;5'], ven: '5,3', mitAlt: 'şekilde ≈1', past: '0,15–0,3 kPa', pastD: 'Pasteur 0,15–0,3 kPa' },
      mmhg: { v: ['159', '149', '100', '100', '98', '98', '&lt;38'], ven: '40', mitAlt: 'şekilde ≈8', past: '≈1–2 mmHg', pastD: 'Pasteur ≈1–2 mmHg' },
    };
    const CAP = {
      1: '<b>1 · Atmosfer.</b> Deniz seviyesinde PB 101,325 kPa, kuru havada FiO₂ %20,93: PO₂ = 101,325 × %20,93 = 21,2 kPa. Kaskadın başlangıç noktası budur. [[K1 s. 80]]',
      2: "<b>2 · Trakea: nemlendirme.</b> Hava karinaya ulaştığında su buharıyla tam doymuştur. Su buharı 37 °C'de 6,3 kPa'lık pay alır; O₂ fraksiyonu geri kalan basınca uygulanır: (101,325 − 6,3) × %20,93 = 19,9 kPa. Düşüş ≈1,3 kPa. [[K1 s. 80]]",
      3: '<b>3 · Alveol: alveoler gaz denklemi.</b> PAO₂ FiO₂, PB ve alveoler ventilasyona bağlıdır. PaCO₂ 5,3 kPa ve R 0,8 ile PAO₂ = 19,9 − 5,3/0,8 = 13,3 kPa. Gaz evresinin en büyük basamağı (6,6 kPa) PaCO₂/R terimidir. [[K1 s. 80–81]]',
      4: "<b>4 · Pulmoner kapiller: difüzyon.</b> Normalde O₂'nin bariyerden geçmesine yetecek zaman vardır; PAO₂ ile pulmoner kapiller PO₂ 13,3 kPa'da dengelenir. O₂ transferi perfüzyonla sınırlıdır; bu basamak normalde yok denecek kadar küçüktür. [[K1 s. 81]]",
      5: "<b>5 · Arter: fizyolojik şant.</b> Bronşiyal ve Thebesius venlerinden gelen anatomik şant ile V̇/Q̇ uyumsuzluğunun fonksiyonel şantı (toplam %2–5) PaO₂'yi 13,0 kPa'ya indirir. [[K1 s. 81]]",
      6: '<b>6 · Doku kapilleri: yokuş.</b> Dokular O₂ aldıkça PO₂ kapillerin arteriyel ucundan (13,0 kPa) venöz ucuna doğru giderek düşer; venöz kan ≈5,3 kPa. Kanın bir bölümü ise arteriyovenöz anastomozlarla kapillerleri atlar. [[K1 s. 30, 81]]',
      7: "<b>7 · Mitokondri.</b> Mitokondriyal PO₂ arteriyel kanınkinden çok daha düşüktür (&lt;5 kPa) ve dokunun metabolik etkinliğine bağlıdır; O₂ kapillerden mitokondriye bu gradyanla difüze olur. Büyüteçte: PO₂ 0,15–0,3 kPa'nın altına inerse anaerobik metabolizma baskın olur (Pasteur noktası). [[K1 s. 80–81]]",
      8: '<b>Bütün kaskad.</b> 21,2 → 19,9 → 13,3 → 13,3 → 13,0 kPa, ardından doku kapillerinde ≈5,3 kPa\'ya inen yokuş ve mitokondri. Her düşüşün yanında nedeni yazıyor: nemlendirme, alveoler gaz denklemi, difüzyon, fizyolojik şant, dokuların O₂ alması. [[K1 s. 80–81]]',
    };
    const HES = {
      1: 'PO₂ = PB × FiO₂ = 101,325 × 0,2093 = 21,2 kPa',
      2: 'PO₂ = (PB − P<sub>SVP</sub> su) × FiO₂ = (101,325 − 6,3) × 0,2093 = 19,9 kPa',
      3: 'PAO₂ = 19,9 − PaCO₂/R = 19,9 − 5,3/0,8 = 13,3 kPa',
      4: 'Pulmoner kapiller PO₂ ≈ PAO₂ = 13,3 kPa (dengelenme)',
      5: 'PaO₂ = 13,0 kPa (fizyolojik şant %2–5)',
      6: 'Arteriyel uç 13,0 kPa → venöz uç ≈5,3 kPa',
      7: 'Mitokondri &lt; 5 kPa · Pasteur noktası 0,15–0,3 kPa',
      8: '21,2 → 19,9 → 13,3 → 13,3 → 13,0 → 5,3 → &lt; 5 kPa',
    };
    const TOP = { 2: '−1,3 kPa', 3: '−7,9 kPa', 4: '−7,9 kPa', 5: '−8,2 kPa', 6: '−15,9 kPa (venöz uca kadar)', 7: '≈ −20 kPa' };

    /* geniş yerleşim: 1 kPa = 11,8 px, taban y 330 */
    const C = [[76, 140], [146, 210], [216, 280], [286, 350], [356, 420], [426, 530], [536, 596]];
    const yW = (p) => 330 - p * 11.818;
    const yb = (p) => 310 - 60 * p; // büyüteç 0–2 kPa
    const slopeY = (x) => lerp(yW(ART), yW(VEN), (x - 426) / 104);
    const RW = [[108, yW(ATM)], [178, yW(KAR)], [248, yW(ALV)], [318, yW(ALV)], [388, yW(ART)], [530, yW(VEN)], [566, yW(MIT)]];
    const gecW = (j) => {
      const a = RW[j - 1], b = RW[j];
      if (j === 5) return [a, [426, a[1]], b];
      if (j === 6) return [a, [531, 290], [535, 306], [545, 316], b];
      const dx = C[j][0] - 3; return [a, [dx, a[1]], [dx, b[1]], b];
    };
    /* dar yerleşim: yatay çubuk satırları, 0–22 kPa x 120–352 */
    const xD = (p) => 120 + p * 10.545;
    const TD = (i) => 4 + 50 * i;
    const endD = [xD(ATM), xD(KAR), xD(ALV), xD(ALV), xD(ART), xD(VEN), xD(MIT)];
    const RD = endD.map((e, i) => [i === 6 ? e + 1 : e - (i === 5 ? 5 : 8), TD(i) + (i === 5 ? 29 : 23)]);
    const gecD = (j) => { const a = RD[j - 1], b = RD[j]; return [a, [a[0], b[1]], b]; };

    let adim = RM ? 8 : 1, birim = 'kpa', oyn = false, oyT = 0, dar = false;
    const rise = DEG.map((_, k) => (k < Math.min(adim, 7) ? 1 : 0));
    let mol = null, kok = null, O = {};

    const svgW = () => {
      const y = yW, E = ETK[birim];
      let s = `<svg class="f19-svg" viewBox="0 0 760 390" role="img" aria-label="Oksijen kaskadı: atmosferden mitokondriye yedi konumda PO₂ (kPa) çubukları, her düşüşün nedeni ve mitokondri düzeyi için büyüteç">
        <defs>
          <linearGradient id="f19-ka-gf" gradientUnits="userSpaceOnUse" x1="426" y1="0" x2="530" y2="0"><stop offset="0" style="stop-color:var(--crit-soft)"/><stop offset="1" style="stop-color:var(--accent-soft)"/></linearGradient>
          <linearGradient id="f19-ka-gs" gradientUnits="userSpaceOnUse" x1="426" y1="0" x2="530" y2="0"><stop offset="0" style="stop-color:var(--crit)"/><stop offset="1" style="stop-color:var(--accent)"/></linearGradient>
          ${okMarker('f19-ka-ok', '--c-basic')}
        </defs>`;
      [0, 5, 10, 15, 20].forEach((p) => { s += `<line class="f19-izgara" x1="70" x2="600" y1="${y(p)}" y2="${y(p)}"/><text class="f19-tk" x="63" y="${(y(p) + 4).toFixed(1)}" text-anchor="end">${p}</text>`; });
      s += `<line class="f19-eksen" x1="70" x2="70" y1="${y(22)}" y2="330"/><line class="f19-eksen" x1="70" x2="602" y1="330" y2="330"/>
        <text class="f19-ad" transform="translate(24 200) rotate(-90)" text-anchor="middle" data-o="eksenAd">PO₂ (kPa)</text>`;
      C.forEach(([x0, x1], k) => {
        const cx = (x0 + x1) / 2;
        const bar = k === 5
          ? `<polygon points="${x0},330 ${x0},${y(ART).toFixed(1)} ${x1},${y(VEN).toFixed(1)} ${x1},330" fill="url(#f19-ka-gf)"/>`
          : `<rect class="f19-bar ${TUR[k]}" x="${x0}" y="${y(DEG[k]).toFixed(1)}" width="${x1 - x0}" height="${(330 - y(DEG[k])).toFixed(1)}"/>`;
        let etk;
        if (k === 5) etk = `<text class="f19-v" x="440" y="${(y(ART) - 8).toFixed(1)}" text-anchor="middle" data-v="5">${E.v[5]}</text><text class="f19-v" x="540" y="${(y(VEN) - 2).toFixed(1)}" data-o="ven">${E.ven}</text><text class="f19-k" x="540" y="${(y(VEN) + 11).toFixed(1)}">venöz uç</text>`;
        else if (k === 6) etk = `<text class="f19-v" x="567" y="294" text-anchor="middle" data-v="6">${E.v[6]}</text><text class="f19-k" x="567" y="307" text-anchor="middle" data-o="mitAlt">${E.mitAlt}</text>`;
        else etk = `<text class="f19-v" x="${cx}" y="${(y(DEG[k]) - 8).toFixed(1)}" text-anchor="middle" data-v="${k}">${E.v[k]}</text>`;
        s += `<g class="f19-k-el" data-k="${k}"><g data-o="rise${k}">${bar}</g><g data-o="etk${k}">${etk}</g></g>`;
      });
      const seg = [
        `M76 ${y(ATM)} H140`, `M140 ${y(ATM)} H143 V${y(KAR)} H210`, `M210 ${y(KAR)} H213 V${y(ALV)} H280`, `M280 ${y(ALV)} H350`,
        `M350 ${y(ALV)} H353 V${y(ART)} H420`, `M420 ${y(ART)} H426 L530 ${y(VEN)}`, `M536 ${y(MIT)} H596`,
      ];
      const segC = ['gaz', 'gaz', 'gaz', 'kan', 'kan', 'grad', 'hucre'];
      seg.forEach((d, k) => { s += `<path class="f19-cz ${segC[k]} f19-k-el" data-k="${k}" d="${d.replace(/(\d+\.\d{3,})/g, (m) => (+m).toFixed(1))}"${k === 5 ? ' stroke="url(#f19-ka-gs)"' : ''}/>`; });
      s += `<path class="f19-ok-yol f19-k-el" data-k="6" d="M531 272 Q531 302 543 315" marker-end="url(#f19-ka-ok)"/>`;
      const H = [
        null,
        { x: 143, y: 17, t: 'Nemlendirme −1,3', g: [143, 27, y(ATM) - 4] },
        { x: 213, y: 43, t: 'AGE: <tspan class="f19-mavi">↓</tspan> PaCO₂/R −6,6', g: [213, 53, y(KAR) - 4] },
        { x: 283, y: 17, t: 'Difüzyon ≈0', g: [283, 27, y(ALV) - 4] },
        { x: 360, y: 43, t: 'Fizyolojik şant −0,3', g: [353, 53, y(ALV) - 4] },
        { x: 500, y: 137, t: 'Dokuların O₂ alması', g: [478, 147, slopeY(478) - 5] },
        { x: 568, y: 222, t: ['Difüzyon →', 'mitokondri'], g: null },
      ];
      H.forEach((h, k) => {
        if (!h) return;
        s += `<g class="f19-k-el" data-k="${k}">${h.g ? `<line class="f19-kil" x1="${h.g[0]}" x2="${h.g[0]}" y1="${h.g[1]}" y2="${h.g[2].toFixed(1)}"/>` : ''}${hap(h.x, h.y, h.t)}</g>`;
      });
      /* büyüteç */
      s += `<g class="f19-yer" data-o="yer"><rect x="606" y="150" width="150" height="196" rx="10"/><text class="f19-k" x="681" y="244" text-anchor="middle">Büyüteç</text><text class="f19-k" x="681" y="258" text-anchor="middle">7. adımda açılır</text></g>
        <g class="f19-k-el" data-k="6">
          <line class="f19-huni" x1="596" y1="${y(MIT).toFixed(1)}" x2="606" y2="150"/><line class="f19-huni" x1="596" y1="330" x2="606" y2="346"/>
          <rect class="f19-buy-kutu" x="606" y="150" width="150" height="196" rx="10"/>
          <text class="f19-ad" x="681" y="168" text-anchor="middle">Büyüteç · 0–2 kPa</text>
          <rect class="f19-past" x="636" y="${yb(0.3)}" width="116" height="${yb(0.15) - yb(0.3)}"/>
          ${[0, 0.5, 1, 1.5, 2].map((p) => `<line class="f19-eksen" x1="630" x2="634" y1="${yb(p)}" y2="${yb(p)}"/><text class="f19-tk" x="628" y="${yb(p) + 3.5}" text-anchor="end">${fmt(p, p % 1 ? 1 : 0)}</text>`).join('')}
          <line class="f19-eksen" x1="634" x2="634" y1="${yb(2)}" y2="${yb(0)}"/><line class="f19-eksen" x1="634" x2="752" y1="${yb(0)}" y2="${yb(0)}"/>
          <rect class="f19-bar hucre f19-cerc" x="644" y="${yb(MIT)}" width="26" height="${yb(0) - yb(MIT)}"/>
          <text class="f19-k" x="676" y="${yb(MIT) + 4}">mitokondri</text><text class="f19-k" x="676" y="${yb(MIT) + 17}">şematik ≈1</text>
          <line class="f19-past-kil" x1="694" x2="694" y1="${yb(0) + 5}" y2="${yb(0.15) + 1}"/>
          <text class="f19-past-t" x="694" y="326" text-anchor="middle">Pasteur noktası</text>
          <text class="f19-past-t" x="694" y="339" text-anchor="middle" data-o="past">${E.past}</text>
        </g>`;
      C.forEach(([x0, x1], k) => {
        const cx = (x0 + x1) / 2, L = ADW[k];
        s += `<text class="f19-ad f19-yerad" data-ad="${k}" x="${cx}" y="348" text-anchor="middle">${L[0]}${L[1] ? `<tspan x="${cx}" dy="14">${L[1]}</tspan>` : ''}</text>`;
      });
      s += `<circle class="f19-mol" r="7" data-o="mol" cx="${RW[0][0]}" cy="${RW[0][1]}"/>`;
      C.forEach(([x0, x1], k) => { s += `<rect class="f19-hit" data-hit="${k}" x="${x0 - 2}" y="60" width="${x1 - x0 + 4}" height="308" tabindex="0" role="button" aria-label="Adım ${k + 1}: ${ADW[k].join(' ')}"/>`; });
      return s + '</svg>';
    };

    const svgD = () => {
      const E = ETK[birim];
      const HD = [null, 'Nemlendirme −1,3', 'PaCO₂/R −6,6', 'Difüzyon ≈0', 'Şant −0,3', 'O₂ alımı', 'Difüzyon'];
      let s = `<svg class="f19-svg" viewBox="0 0 360 472" role="img" aria-label="Oksijen kaskadı: atmosferden mitokondriye yedi konumda PO₂ (kPa) yatay çubukları, her düşüşün nedeni ve mitokondri düzeyi için büyüteç">`;
      [0, 5, 10, 15, 20].forEach((p) => { s += `<line class="f19-izgara" x1="${xD(p).toFixed(1)}" x2="${xD(p).toFixed(1)}" y1="2" y2="354"/><text class="f19-tk" x="${xD(p).toFixed(1)}" y="367" text-anchor="middle">${p}${p === 20 ? ' kPa' : ''}</text>`; });
      ADD.forEach((ad, k) => {
        const T = TD(k);
        s += `<text class="f19-ad f19-yerad" data-ad="${k}" x="6" y="${T + 19}">${ad}</text>`;
        if (HD[k]) s += `<g class="f19-k-el" data-k="${k}">${hap(13, T + 37, HD[k], { an: 'start' })}</g>`;
        let bar, etk;
        if (k === 5) {
          bar = `<rect class="f19-bar kan f19-cerc" x="120" y="${T + 11}" width="${(xD(ART) - 120).toFixed(1)}" height="8"/><rect class="f19-bar ven f19-cerc" x="120" y="${T + 25}" width="${(xD(VEN) - 120).toFixed(1)}" height="8"/>`;
          etk = `<text class="f19-v" x="${(xD(ART) + 6).toFixed(1)}" y="${T + 19.5}"><tspan data-v="5">${E.v[5]}</tspan><tspan class="f19-k" dx="4">arteriyel</tspan></text><text class="f19-v" x="${(xD(VEN) + 6).toFixed(1)}" y="${T + 33.5}"><tspan data-o="ven">${E.ven}</tspan><tspan class="f19-k" dx="4">venöz uç</tspan></text>`;
        } else {
          const e = endD[k], ic = k <= 1;
          bar = `<rect class="f19-bar ${TUR[k]} f19-cerc" x="120" y="${T + 14}" width="${(e - 120).toFixed(1)}" height="18"/>`;
          etk = k === 6
            ? `<text class="f19-v" x="${(e + 12).toFixed(1)}" y="${T + 27.5}"><tspan data-v="6">${E.v[6]}</tspan><tspan class="f19-k" dx="4" data-o="mitAltD">(${E.mitAlt})</tspan></text>`
            : `<text class="f19-v" x="${(ic ? e - 18 : e + 6).toFixed(1)}" y="${T + 27.5}"${ic ? ' text-anchor="end"' : ''} data-v="${k}">${E.v[k]}</text>`;
        }
        s += `<g class="f19-k-el" data-k="${k}"><g data-o="rise${k}">${bar}</g><g data-o="etk${k}">${etk}</g></g>`;
        if (k > 0) {
          const xs = endD[k - 1], y1 = TD(k - 1) + (k - 1 === 5 ? 33 : 32), y2 = T + (k === 5 ? 11 : 14);
          s += `<line class="f19-kil f19-k-el" data-k="${k}" x1="${xs.toFixed(1)}" x2="${xs.toFixed(1)}" y1="${y1}" y2="${y2}"/>`;
        }
      });
      const xb = (p) => 30 + 150 * p;
      s += `<g class="f19-yer" data-o="yer"><rect x="4" y="376" width="352" height="90" rx="10"/><text class="f19-k" x="180" y="425" text-anchor="middle">Büyüteç 7. adımda açılır</text></g>
        <g class="f19-k-el" data-k="6">
          <rect class="f19-buy-kutu" x="4" y="376" width="352" height="90" rx="10"/>
          <text class="f19-ad" x="14" y="393">Büyüteç · 0–2 kPa</text>
          <text class="f19-past-t" x="30" y="410" data-o="pastD">${E.pastD}</text>
          <rect class="f19-past" x="${xb(0.15)}" y="414" width="${xb(0.3) - xb(0.15)}" height="20"/>
          <line class="f19-eksen" x1="30" x2="330" y1="434" y2="434"/>
          ${[0, 0.5, 1, 1.5, 2].map((p) => `<line class="f19-eksen" x1="${xb(p)}" x2="${xb(p)}" y1="434" y2="439"/><text class="f19-tk" x="${xb(p)}" y="453" text-anchor="middle">${fmt(p, p % 1 ? 1 : 0)}</text>`).join('')}
          <path class="f19-isaret" d="M${xb(1) - 6} 417 H${xb(1) + 6} L${xb(1)} 429 Z"/><line class="f19-isaret-c" x1="${xb(1)}" x2="${xb(1)}" y1="429" y2="434"/>
          <text class="f19-k" x="${xb(1) + 11}" y="427">mitokondri (≈1)</text>
        </g>`;
      s += `<circle class="f19-mol" r="6" data-o="mol" cx="${RD[0][0]}" cy="${RD[0][1]}"/>`;
      ADD.forEach((ad, k) => { s += `<rect class="f19-hit" data-hit="${k}" x="0" y="${TD(k)}" width="360" height="50" tabindex="0" role="button" aria-label="Adım ${k + 1}: ${ad}"/>`; });
      return s + '</svg>';
    };

    const kur = (d) => {
      dar = d;
      el.innerHTML = `<div class="f19-kas${dar ? ' f19-dar' : ''}">
        <div class="f19-ctl">
          <div class="btn-row">
            <button type="button" class="btn ghost" data-a="geri" aria-label="Önceki adım">${dar ? '◀' : '◀ Geri'}</button>
            <button type="button" class="btn" data-a="ileri" aria-label="Sonraki adım">${dar ? '▶' : 'İleri ▶'}</button>
            ${RM ? '' : '<button type="button" class="btn ghost" data-a="oynat">Oynat</button>'}
            <button type="button" class="btn ghost" data-a="tumu" aria-pressed="false">Tümü</button>
          </div>
          <div class="f19-ctl-sag">${segH('Değer birimi', 'b', [['kpa', 'kPa'], ['mmhg', 'mmHg']], 'f19-seg-k')}<span class="f19-sayac" data-o="sayac"></span></div>
        </div>
        <div class="f19-sahne">${dar ? svgD() : svgW()}</div>
        <p class="f19-hesap" data-o="hesap"></p>
        <p class="f19-toplam" data-o="toplam"></p>
      </div>`;
      kok = el.firstElementChild;
      O = topla(kok, 'data-o');
      hapOlc(kok.querySelector('svg'));
      durum();
    };

    const kare = () => {
      const n = Math.min(adim, 7);
      for (let k = 0; k < 7; k++) {
        const g = O['rise' + k], e = O['etk' + k];
        if (!g) continue;
        const f = Math.max(0.001, ease(k < n ? rise[k] : 0));
        at(g, 'transform', dar ? `translate(120 0) scale(${f.toFixed(3)} 1) translate(-120 0)` : `translate(0 330) scale(1 ${f.toFixed(3)}) translate(0 -330)`);
        if (e) e.style.opacity = String(clamp((rise[k] - 0.55) / 0.45, 0, 1));
      }
      const R0 = dar ? RD : RW;
      let p = R0[n - 1];
      if (mol) p = mol.c.nokta(mol.c.L * ease(clamp(mol.t / mol.dur, 0, 1)));
      at(O.mol, 'cx', p[0]); at(O.mol, 'cy', p[1]);
    };

    const durum = () => {
      if (!kok) return;
      const n = Math.min(adim, 7), E = ETK[birim];
      kok.querySelectorAll('[data-k]').forEach((e) => e.classList.toggle('on', +e.dataset.k < n));
      kok.querySelectorAll('[data-ad]').forEach((e) => e.classList.toggle('kapali', +e.dataset.ad >= n));
      sinif(O.yer, 'on', n < 7);
      kok.querySelectorAll('[data-v]').forEach((e) => yazH(e, E.v[+e.dataset.v]));
      yaz(O.eksenAd, birim === 'mmhg' ? 'PO₂ · eksen kPa, değerler mmHg' : 'PO₂ (kPa)'); yaz(O.ven, E.ven); yaz(O.mitAlt, E.mitAlt); yaz(O.mitAltD, `(${E.mitAlt})`); yaz(O.past, E.past); yaz(O.pastD, E.pastD);
      yaz(O.sayac, adim === 8 ? 'Tümü' : `Adım ${adim} / 7`);
      const b = (a) => kok.querySelector(`[data-a="${a}"]`);
      b('geri').disabled = adim <= 1; b('ileri').disabled = adim >= 7;
      b('tumu').setAttribute('aria-pressed', String(adim === 8));
      const oy = b('oynat'); if (oy) yaz(oy, oyn ? 'Durdur' : 'Oynat');
      bas(kok, 'b', birim);
      yazH(O.hesap, HES[adim]);
      const tp = adim > 1 && adim < 8;
      O.toplam.hidden = !tp; if (tp) yaz(O.toplam, `Atmosferden bu noktaya: ${TOP[adim]}`);
      cap(CAP[adim]);
      kare();
    };

    const yol = (a, b) => {
      const gec = dar ? gecD : gecW, pts = [];
      if (b > a) for (let j = a + 1; j <= b; j++) { const g = gec(j); pts.push(...(pts.length ? g.slice(1) : g)); }
      else for (let j = a; j > b; j--) { const g = gec(j).slice().reverse(); pts.push(...(pts.length ? g.slice(1) : g)); }
      return pts;
    };
    const git = (yeni, anim = true) => {
      yeni = clamp(yeni, 1, 8);
      if (yeni === adim) return;
      const a = Math.min(adim, 7) - 1, b = Math.min(yeni, 7) - 1;
      adim = yeni;
      mol = !RM && anim && a !== b ? { c: cizgi(yol(a, b)), t: 0, dur: Math.min(1.6, 0.7 * Math.abs(b - a)) } : null;
      for (let k = 0; k < 7; k++) { if (k > b) rise[k] = 0; else if (k > a) rise[k] = RM || !anim ? 1 : 0; }
      durum();
    };

    el.addEventListener('click', (ev) => {
      const t = ev.target.closest('[data-a],[data-b],[data-hit]');
      if (!t || !el.contains(t)) return;
      if (t.dataset.b) { birim = t.dataset.b; durum(); return; }
      if (t.dataset.hit !== undefined) { oyn = false; git(+t.dataset.hit + 1); durum(); return; }
      const a = t.dataset.a;
      if (a === 'geri') { oyn = false; git(adim - 1); }
      else if (a === 'ileri') { oyn = false; git(adim + 1); }
      else if (a === 'tumu') { oyn = false; git(8); }
      else if (a === 'oynat') {
        if (oyn) oyn = false;
        else { if (adim >= 7) git(1, false); oyn = true; oyT = 0; }
      }
      durum();
    });
    el.addEventListener('keydown', (ev) => {
      const t = ev.target.closest('[data-hit]');
      if (t && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); oyn = false; git(+t.dataset.hit + 1); durum(); }
    });

    const roStop = duyarli(el, kur);
    fontSonra(() => hapOlc(kok && kok.querySelector('svg')));
    const stop = ticker(el, (dt) => {
      let deg = false;
      const n = Math.min(adim, 7);
      for (let k = 0; k < n; k++) if (rise[k] < 1) { rise[k] = Math.min(1, rise[k] + dt / 0.4); deg = true; }
      if (mol) { mol.t += dt; if (mol.t >= mol.dur) mol = null; deg = true; }
      if (oyn) {
        oyT += dt;
        if (oyT >= 3.5) { oyT = 0; git(adim + 1); if (adim >= 7) { oyn = false; durum(); } }
      }
      if (deg) kare();
    });
    return () => { stop(); roStop(); };
  };

  /* =====================================================================
     2 · alveolden artere: difüzyon, anatomik şant, V̇/Q̇ uyumsuzluğu
     ===================================================================== */
  VIZ.f19_aa = (el) => {
    const cap = capci(el);
    const CAP = {
      1: "<b>1 · Difüzyon.</b> Normal akciğerde kan pulmoner kapillerin sonuna varmadan alveoldeki PO₂ ile dengelenir: kapiller sonu da 13,3 kPa'dır. Basamağın bu kısmı normalde yoktur. [[K1 s. 81]]",
      2: '<b>2 · Anatomik şant.</b> Büyük hava yollarının venöz kanının çoğu doğrudan pulmoner venlere, koroner venöz kanın bir bölümü Thebesius venleriyle sol kalbe dökülür. Gaz değişimine hiç girmemiş bu kan oksijenli kana karışır. [[K1 s. 64, 81]]',
      3: "<b>3 · V̇/Q̇ uyumsuzluğu.</b> Ventilasyonuna göre perfüzyonu fazla olan birimden çıkan kan tam oksijenlenmemiştir: fonksiyonel sağdan sola şant. Anatomik ve fonksiyonel şant birlikte fizyolojik şanttır (%2–5, yaklaşık yarı yarıya) ve PaO₂'yi 13,0 kPa'ya indirir. [[K1 s. 64, 81]]",
      4: '<b>4 · Hastalıkta.</b> Bir ya da iki bozukluğu açın ve basamağın nerede büyüdüğüne bakın. [[K1 s. 81]]',
      kal: "<b>Difüzyonla sınırlı.</b> Alveol–kapiller bariyer kalınlaşmış ya da alveoler yüzey alanı azalmış: kan kapillerin sonuna kadar dengelenemez ve pulmoner kapiller PO₂ PAO₂'den bir basamak düşük kalır. Bu düşüş arter basamağına da taşınır. [[K1 s. 81]]",
      pn: '<b>Pnömoni.</b> Sıvıyla dolan alveoller perfüze olur ama gaz değişimine katılmaz; V̇/Q̇ uyumsuzluğu ve şant büyür, PaO₂ düşer. Alveol ile arter arasındaki fark, yani A–a gradyanı artar. [[K1 s. 64, 78, 81]]',
      iki: "<b>İkisi birlikte.</b> Difüzyon basamağı ve şant basamağı üst üste biner: kapiller sonu PAO₂'nin altında kalır, PaO₂ ise daha da aşağı iner. [[K1 s. 81]]",
    };
    let adim = 1, kal = false, pn = false, dar = false, t = 0, kok = null, O = {}, G = null, P = [], PT = null;
    const hedef = () => {
      const k4 = adim === 4;
      const kap = k4 && kal ? 12.3 : 13.3;
      let art = 13.0;
      if (k4) { if (kal && pn) art = 10.5; else if (kal) art = 12.0; else if (pn) art = 11.5; }
      return [13.3, kap, art];
    };
    let cur = hedef(), from = cur.slice(), to = cur.slice(), tw = 1;

    /* geometri: geniş ve dar */
    const GEN = {
      yv: (p) => 440 - (p - 10) * 27.5, base: 440,
      cols: [[100, 200], [230, 330], [360, 460]],
      yollar: {
        A: [[100, 118], [300, 118], [315, 126], [326, 148], [340, 161], [480, 161], [600, 161], [752, 161]],
        B: [[100, 204], [300, 204], [315, 196], [326, 174], [340, 161], [480, 161], [600, 161], [752, 161]],
        Br: [[400, 282], [400, 175], [408, 163], [420, 161], [480, 161], [600, 161], [752, 161]],
        Th: [[540, 22], [540, 116], [570, 150], [600, 161], [752, 161]],
      },
      kapL: 200, n: { A: 16, B: 6, Bp: 10, Br: 3, Th: 3 }, rr: 4,
      o2: { xs: [182, 194, 206, 218], y0: 84, y1: 114 },
    };
    const DAR = {
      yv: (p) => 576 - (p - 10) * 35, base: 576,
      cols: [[60, 138], [156, 234], [252, 330]],
      yollar: {
        A: [[16, 98], [160, 98], [174, 102], [180, 118], [180, 236], [180, 300], [180, 376]],
        B: [[344, 98], [200, 98], [186, 102], [180, 118], [180, 236], [180, 300], [180, 376]],
        Br: [[16, 196], [172, 196], [180, 206], [180, 236], [180, 300], [180, 376]],
        Th: [[344, 254], [252, 254], [215, 270], [180, 300], [180, 376]],
      },
      kapL: 144, n: { A: 10, B: 4, Bp: 7, Br: 2, Th: 2 }, rr: 3.6,
      o2: { xs: [74, 84, 96, 106], y0: 72, y1: 96 },
    };

    const altGrafik = (g, dar) => {
      const y = g.yv, [c0, c1, c2] = g.cols;
      const ex = dar ? 44 : 70, ex2 = dar ? 336 : 480, tkx = dar ? 38 : 64;
      let s = '';
      [10, 11, 12, 13, 14].forEach((p) => { s += `<line class="f19-izgara" x1="${ex}" x2="${ex2}" y1="${y(p)}" y2="${y(p)}"/><text class="f19-tk" x="${tkx}" y="${y(p) + 4}" text-anchor="end">${p}</text>`; });
      s += `<line class="f19-eksen" x1="${ex}" x2="${ex}" y1="${y(14) - 4}" y2="${g.base}"/><line class="f19-eksen" x1="${ex}" x2="${ex2}" y1="${g.base}" y2="${g.base}"/>
        <path class="f19-eksen" d="M${ex - 6} ${g.base + 7} l12 -4 M${ex - 6} ${g.base + 13} l12 -4" fill="none"/>`;
      s += dar ? `<text class="f19-k" x="336" y="${y(14) - 8}" text-anchor="end">eksen 10 kPa'dan başlar</text>` : `<text class="f19-k" x="76" y="300">eksen 10 kPa'dan başlar</text>`;
      const ad = dar ? [['Alveol', '(PAO₂)'], ['Kapiller', 'sonu'], ['Arter', '(PaO₂)']] : [['Alveol', '(PAO₂)'], ['Pulmoner', 'kapiller sonu'], ['Sistemik', 'arter (PaO₂)']];
      [c0, c1, c2].forEach(([x0, x1], i) => {
        const cx = (x0 + x1) / 2;
        s += `<g data-o="kol${i}"><rect class="f19-hayalet" data-o="hay${i}" x="${x0}" width="${x1 - x0}" y="${y(i === 2 ? 13 : 13.3)}" height="${g.base - y(i === 2 ? 13 : 13.3)}"/>
          <rect class="f19-bar ${i ? 'kan' : 'gaz'} f19-cerc" data-o="bar${i}" x="${x0}" width="${x1 - x0}" y="0" height="0"/>
          <text class="f19-v" data-o="v${i}" x="${cx}" text-anchor="middle"></text></g>
          <text class="f19-ad" x="${cx}" y="${g.base + 16}" text-anchor="middle">${ad[i][0]}<tspan x="${cx}" dy="13.5">${ad[i][1]}</tspan></text>`;
      });
      const hy = dar ? 404 : 314, h1x = (c0[1] + c1[0]) / 2, h2x = (c1[1] + c2[0]) / 2;
      s += `<line class="f19-kil" x1="${h1x}" x2="${h1x}" y1="${hy + 10}" y2="${y(13.3) - 4}"/>${hap(h1x, hy, 'difüzyon', { ek: 'data-o="hap1"' })}
        <g data-o="hap2g"><line class="f19-kil" x1="${h2x}" x2="${h2x}" y1="${hy + 10}" y2="${y(13.3) - 4}"/>${hap(h2x, hy, 'şant', { ek: 'data-o="hap2"' })}</g>`;
      return s;
    };

    const svgW = () => `<svg class="f19-svg" viewBox="0 0 760 476" role="img" aria-label="Alveolden sistemik artere kan akımı: normal ve düşük V̇/Q̇ birimleri, bronşiyal ve Thebesius venleri, sol kalp ve sistemik arter; altta alveol, pulmoner kapiller sonu ve arter PO₂ basamağı ve fizyolojik şant bileşimi">
      <defs>
        <pattern id="f19-aa-tar" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" style="fill:var(--crit-soft)"/><line x1="1" y1="0" x2="1" y2="6" style="stroke:var(--crit)" stroke-width="2"/></pattern>
        ${okMarker('f19-aa-ok', '--accent')}
      </defs>
      <text class="f19-k" x="10" y="157">miks</text><text class="f19-k" x="10" y="170">venöz kan</text>
      <path class="f19-aa-gir" d="M58 148 Q64 122 84 118" marker-end="url(#f19-aa-ok)"/><path class="f19-aa-gir" d="M66 175 Q72 202 84 204" marker-end="url(#f19-aa-ok)"/>
      <g class="f19-boru">
        <path class="dis" d="M100 118 H300 C320 118 320 161 340 161 M100 204 H300 C320 204 320 161 340 161 M330 161 H480 M600 161 H750" stroke-width="18"/>
        <path class="dis" data-o="brD" d="M400 282 V172 Q400 161 412 161" stroke-width="12"/>
        <path class="dis" data-o="thD" d="M540 22 V118" stroke-width="12"/>
        <path class="ic" d="M100 118 H300 C320 118 320 161 340 161 M100 204 H300 C320 204 320 161 340 161 M330 161 H480 M600 161 H750" stroke-width="14"/>
        <path class="ic" data-o="brI" d="M400 282 V172 Q400 161 412 161" stroke-width="8"/>
        <path class="ic" data-o="thI" d="M540 22 V118" stroke-width="8"/>
      </g>
      <g data-o="birA">
        <circle class="f19-alv" data-o="alvA" cx="200" cy="60" r="38"/>
        ${[[186, 46], [206, 40], [222, 56], [190, 70], [212, 74], [200, 58]].map(([x, y]) => `<circle class="f19-o2" cx="${x}" cy="${y}" r="3"/>`).join('')}
        <line class="f19-bar-cz" data-o="barA" x1="150" x2="250" y1="104" y2="104"/>
        <text class="f19-k" x="256" y="104">bariyer</text>
        <text class="f19-ad" x="246" y="36">Alveol · PAO₂ 13,3</text>
        <text class="f19-k" x="100" y="142">dengelenme ≈ ilk üçte birde</text>
      </g>
      <g class="f19-soluk" data-o="birB">
        <circle class="f19-alv" data-o="alvB" cx="200" cy="248" r="22"/>
        <g data-o="o2B"><circle class="f19-o2" cx="194" cy="244" r="3"/><circle class="f19-o2" cx="208" cy="254" r="3"/></g>
        <line class="f19-bar-cz" x1="172" x2="228" y1="220" y2="220"/>
        <text class="f19-ad" x="232" y="246">Düşük V̇/Q̇</text><text class="f19-k" x="232" y="261">perfüzyon &gt; ventilasyon</text>
      </g>
      <text class="f19-ad" x="350" y="146">Pulmoner venler</text>
      <g class="f19-soluk" data-o="brE"><text class="f19-ad" x="412" y="262">Bronşiyal venler</text><text class="f19-k" x="412" y="276">(büyük hava yolları)</text></g>
      <g class="f19-soluk" data-o="thE"><text class="f19-ad" x="552" y="40">Thebesius venleri</text><text class="f19-k" x="552" y="54">(koroner venöz kan)</text></g>
      <text class="f19-ad" x="610" y="146">Sistemik arter · PaO₂</text>
      <g data-o="o2hare"></g>
      <g data-o="par"></g>
      <rect class="f19-kalp" x="480" y="116" width="120" height="90" rx="14"/>
      <text class="f19-ad" x="540" y="156" text-anchor="middle">Sol atriyum</text><text class="f19-ad" x="540" y="176" text-anchor="middle">Sol ventrikül</text>
      ${altGrafik(GEN, false)}
      <g data-o="santG">
        <text class="f19-ad f19-kalin" x="510" y="318">Fizyolojik şant = %2–5</text><text class="f19-k" x="510" y="333">(kalp debisinin)</text>
        <rect class="f19-sant-a" data-o="sA" x="510" y="344" width="120" height="26" rx="4"/>
        <rect class="f19-sant-a" data-o="sF" x="630" y="344" width="120" height="26" rx="4"/>
        <rect class="f19-sant-p" data-o="sP" x="750" y="344" width="0" height="26" rx="4" fill="url(#f19-aa-tar)"/>
        <text class="f19-ad" data-o="sAt" x="570" y="387" text-anchor="middle">Anatomik</text>
        <text class="f19-ad" data-o="sFt" x="690" y="387" text-anchor="middle">Fonksiyonel</text>
        <text class="f19-past-t f19-kalin" data-o="sPt" x="0" y="387" text-anchor="middle">pnömoni: artmış</text>
        <text class="f19-k" x="510" y="407">Anatomik: bronşiyal ve Thebesius venleri</text>
        <text class="f19-k" x="510" y="422">Fonksiyonel: V̇/Q̇ uyumsuzluğu</text>
        <text class="f19-k" x="510" y="437">yaklaşık yarı yarıya (Bölüm 14)</text>
      </g>
    </svg>`;

    const svgD = () => `<svg class="f19-svg" viewBox="0 0 360 612" role="img" aria-label="Alveolden sistemik artere kan akımı: normal ve düşük V̇/Q̇ birimleri, bronşiyal ve Thebesius venleri, sol kalp ve sistemik arter; altta alveol, kapiller sonu ve arter PO₂ basamağı">
      <g class="f19-boru">
        <path class="dis" d="M16 98 H160 C172 98 180 106 180 118 M344 98 H200 C188 98 180 106 180 118 M180 112 V236 M180 300 V374" stroke-width="14"/>
        <path class="dis" data-o="brD" d="M16 196 H174" stroke-width="10"/>
        <path class="dis" data-o="thD" d="M344 254 H250" stroke-width="10"/>
        <path class="ic" d="M16 98 H160 C172 98 180 106 180 118 M344 98 H200 C188 98 180 106 180 118 M180 112 V236 M180 300 V374" stroke-width="10"/>
        <path class="ic" data-o="brI" d="M16 196 H174" stroke-width="6"/>
        <path class="ic" data-o="thI" d="M344 254 H250" stroke-width="6"/>
      </g>
      <g data-o="birA">
        <circle class="f19-alv" data-o="alvA" cx="90" cy="52" r="30"/>
        ${[[78, 42], [98, 38], [108, 56], [80, 62], [96, 66], [90, 50]].map(([x, y]) => `<circle class="f19-o2" cx="${x}" cy="${y}" r="2.8"/>`).join('')}
        <line class="f19-bar-cz" data-o="barA" x1="62" x2="118" y1="88" y2="88"/>
        <text class="f19-k" x="122" y="86">bariyer</text>
        <text class="f19-ad" x="6" y="13">Alveol · PAO₂ 13,3</text>
        <text class="f19-k" x="16" y="120">miks venöz</text>
        <text class="f19-k" x="16" y="136">dengelenme: ilk üçte bir</text>
      </g>
      <g class="f19-soluk" data-o="birB">
        <circle class="f19-alv" data-o="alvB" cx="272" cy="56" r="20"/>
        <g data-o="o2B"><circle class="f19-o2" cx="266" cy="52" r="2.8"/><circle class="f19-o2" cx="279" cy="61" r="2.8"/></g>
        <line class="f19-bar-cz" x1="254" x2="290" y1="88" y2="88"/>
        <text class="f19-ad" x="272" y="25" text-anchor="middle">Düşük V̇/Q̇</text>
        <text class="f19-k" x="344" y="120" text-anchor="end">miks venöz</text>
      </g>
      <text class="f19-ad" x="192" y="160">Pulmoner</text><text class="f19-ad" x="192" y="174">venler</text>
      <g class="f19-soluk" data-o="brE"><text class="f19-ad" x="16" y="185">Bronşiyal venler</text></g>
      <g class="f19-soluk" data-o="thE"><text class="f19-ad" x="344" y="243" text-anchor="end">Thebesius v.</text></g>
      <text class="f19-ad" x="192" y="330">Sistemik arter</text><text class="f19-k" x="192" y="345">PaO₂</text>
      <g data-o="o2hare"></g>
      <g data-o="par"></g>
      <rect class="f19-kalp" x="110" y="236" width="140" height="64" rx="14"/>
      <text class="f19-ad" x="180" y="263" text-anchor="middle">Sol atriyum</text><text class="f19-ad" x="180" y="283" text-anchor="middle">Sol ventrikül</text>
      ${altGrafik(DAR, true)}
    </svg>`;

    const santH = () => `<div class="f19-sant" data-o="santH">
        <div class="f19-sant-b">Fizyolojik şant = %2–5 <span>(kalp debisinin)</span></div>
        <div class="f19-sant-bar"><span class="an" data-o="hA"></span><span class="fo" data-o="hF"></span><span class="pn" data-o="hP"></span></div>
        <div class="f19-sant-et"><span data-o="hAt">Anatomik</span><span data-o="hFt">Fonksiyonel</span><span data-o="hPt">pnömoni: artmış</span></div>
        <p>Anatomik: bronşiyal ve Thebesius venleri · Fonksiyonel: V̇/Q̇ uyumsuzluğu · yaklaşık yarı yarıya (Bölüm 14)</p>
      </div>`;

    const kur = (d) => {
      dar = d; G = dar ? DAR : GEN;
      el.innerHTML = `<div class="f19-aa${dar ? ' f19-dar' : ''}">
        <div class="f19-ctl f19-ctl-sol">
          ${segH('Adım', 'adim', [['1', '1 · Difüzyon'], ['2', '2 · Anatomik şant'], ['3', '3 · V̇/Q̇ uyumsuzluğu'], ['4', '4 · Hastalıkta']])}
          <div class="btn-row f19-hast" data-o="hast">
            <button type="button" class="btn ghost f19-tog" data-a="kal" aria-pressed="false">Kalın bariyer / azalmış yüzey</button>
            <button type="button" class="btn ghost f19-tog" data-a="pn" aria-pressed="false">Pnömoni</button>
          </div>
        </div>
        <div class="f19-sahne">${dar ? svgD() : svgW()}</div>
        ${dar ? santH() : ''}
      </div>`;
      kok = el.firstElementChild;
      O = topla(kok, 'data-o');
      /* parçacık havuzu */
      const nmax = G.n.A + G.n.Bp + G.n.Br + G.n.Th;
      O.par.innerHTML = Array.from({ length: nmax }, () => `<g opacity="0"><circle class="f19-rbc-v" r="${G.rr}"/><circle class="f19-rbc-o" r="${G.rr}"/></g>`).join('');
      P = [...O.par.children].map((g) => ({ g, o: g.children[1], v: 0 }));
      O.o2hare.innerHTML = G.o2.xs.map(() => '<circle class="f19-o2" r="2.6" opacity="0"/>').join('');
      PT = {}; Object.entries(G.yollar).forEach(([k, pts]) => { PT[k] = cizgi(pts); });
      durum(true);
      hapOlc(kok.querySelector('svg'));
    };

    const durum = (ilk) => {
      if (!kok) return;
      const k4 = adim === 4;
      bas(kok, 'adim', adim);
      O.hast.hidden = !k4;
      kok.querySelector('[data-a="kal"]').setAttribute('aria-pressed', String(kal));
      kok.querySelector('[data-a="pn"]').setAttribute('aria-pressed', String(pn));
      sinif(O.birB, 'f19-soluk', adim < 3);
      ['brE', 'thE', 'brD', 'brI', 'thD', 'thI'].forEach((k) => sinif(O[k], 'f19-soluk', adim < 2));
      sinif(O.alvA, 'vurgu', adim === 1);
      sinif(O.barA, 'kalin', k4 && kal);
      sinif(O.alvB, 'sivi', k4 && pn);
      if (O.o2B) O.o2B.style.display = k4 && pn ? 'none' : '';
      /* basamak */
      const yeni = hedef();
      if (yeni.some((v, i) => Math.abs(v - to[i]) > 1e-6)) { from = cur.slice(); to = yeni; tw = RM || ilk ? 1 : 0; if (tw >= 1) cur = to.slice(); }
      sinif(O.kol2, 'f19-gizli', adim === 1);
      degYaz(O.v0, '13,3'); degYaz(O.v1, to[1] < 13.29 ? '↓' : '13,3'); degYaz(O.v2, to[2] < 12.99 ? '↓' : '13,0');
      sinif(O.hay1, 'on', to[1] < 13.29); sinif(O.hay2, 'on', adim > 1 && to[2] < 12.99);
      const h1 = O.hap1, h2 = O.hap2;
      const ht1 = k4 && kal ? (dar ? 'difüzyon sınırlı ↓' : 'difüzyonla sınırlı ↓') : (dar ? 'difüzyon ≈0' : 'difüzyon: normalde ≈0');
      const ht2 = adim === 2 ? 'anatomik şant' : k4 && pn ? (dar ? 'şant ↑' : 'şant ve V̇/Q̇ ↑') : (dar ? 'şant %2–5' : 'fizyolojik şant %2–5');
      yazH(h1.querySelector('text'), `<tspan x="${h1.querySelector('text').getAttribute('x')}">${ht1}</tspan>`);
      yazH(h2.querySelector('text'), `<tspan x="${h2.querySelector('text').getAttribute('x')}">${ht2}</tspan>`);
      sinif(h1, 'krit', k4 && kal); sinif(h2, 'krit', k4 && pn);
      sinif(O.hap2g, 'f19-gizli', adim === 1);
      hapOlc(kok.querySelector('svg'));
      /* şant bileşimi */
      const pnA = k4 && pn;
      if (!dar) {
        sinif(O.santG, 'f19-gizli', adim === 1);
        const wA = pnA ? 70 : 120, wF = pnA ? 70 : 120, wP = pnA ? 100 : 0;
        at(O.sA, 'width', wA - 2); at(O.sF, 'x', 510 + wA); at(O.sF, 'width', wF - 2); at(O.sP, 'x', 510 + wA + wF); at(O.sP, 'width', wP);
        O.sF.setAttribute('class', adim >= 3 ? 'f19-sant-a' : 'f19-sant-bos');
        at(O.sAt, 'x', 510 + wA / 2); at(O.sFt, 'x', 510 + wA + wF / 2); at(O.sPt, 'x', 510 + wA + wF + wP / 2);
        O.sPt.style.display = pnA ? '' : 'none'; O.sP.style.display = pnA ? '' : 'none';
      } else {
        O.santH.hidden = adim === 1;
        O.hA.style.flexGrow = pnA ? 7 : 12; O.hF.style.flexGrow = pnA ? 7 : 12; O.hP.style.flexGrow = pnA ? 10 : 0;
        O.hAt.style.flexGrow = O.hA.style.flexGrow; O.hFt.style.flexGrow = O.hF.style.flexGrow; O.hPt.style.flexGrow = O.hP.style.flexGrow;
        O.hP.hidden = !pnA; O.hPt.hidden = !pnA;
        sinif(O.hF, 'on', adim >= 3);
      }
      cap(k4 ? (kal && pn ? CAP.iki : kal ? CAP.kal : pn ? CAP.pn : CAP[4]) : CAP[adim]);
      kare();
    };

    /* kan parçacıklarının oksijenlenmesi (0 = miks venöz, 1 = tam oksijenli) */
    const oks = (yol, s) => {
      const L = G.kapL, k4 = adim === 4;
      if (yol === 'A') { const f = clamp(s / L, 0, 1); return k4 && kal ? 0.7 * Math.pow(f, 1.3) : clamp(s / (L / 3), 0, 1); }
      if (yol === 'B') return k4 && pn ? 0 : 0.5 * clamp(s / L, 0, 1);
      return 0;
    };
    const kare = () => {
      if (!kok) return;
      /* basamak çubukları */
      const y = G.yv;
      for (let i = 0; i < 3; i++) {
        const v = cur[i], top = y(v);
        at(O['bar' + i], 'y', top); at(O['bar' + i], 'height', G.base - top);
        at(O['v' + i], 'y', top - (dar ? 7 : 8));
      }
      /* parçacıklar */
      const k4 = adim === 4, sayi = { A: G.n.A, B: adim >= 3 ? (k4 && pn ? G.n.Bp : G.n.B) : 0, Br: adim >= 2 ? G.n.Br : 0, Th: adim >= 2 ? G.n.Th : 0 };
      const hiz = 48, zt = RM ? 0 : t;
      let j = 0;
      Object.keys(sayi).forEach((k) => {
        const n = sayi[k], yo = PT[k];
        for (let i = 0; i < n && j < P.length; i++, j++) {
          const s = ((i / n) * yo.L + hiz * zt + (k === 'B' ? 17 : k === 'Br' ? 41 : k === 'Th' ? 63 : 0)) % yo.L;
          const [px, py] = yo.nokta(s), p = P[j];
          const op = clamp(Math.min(s / 14, (yo.L - s) / 24), 0, 1);
          p.g.setAttribute('transform', `translate(${px.toFixed(1)} ${py.toFixed(1)})`);
          p.g.setAttribute('opacity', op.toFixed(2));
          p.o.setAttribute('opacity', oks(k, s).toFixed(2));
        }
      });
      for (; j < P.length; j++) P[j].g.setAttribute('opacity', '0');
      /* alveolden kapillere geçen O₂ */
      const o2 = O.o2hare.children, yavas = k4 && kal;
      for (let i = 0; i < o2.length; i++) {
        const c = o2[i];
        if (yavas && i % 2) { c.setAttribute('opacity', '0'); continue; }
        const ph = RM ? 0.5 : ((zt / (yavas ? 3.2 : 1.6)) + i / o2.length) % 1;
        c.setAttribute('cx', G.o2.xs[i]); c.setAttribute('cy', lerp(G.o2.y0, G.o2.y1, ph).toFixed(1));
        c.setAttribute('opacity', (Math.sin(Math.PI * ph) * 0.95).toFixed(2));
      }
    };

    el.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-adim],[data-a]');
      if (!b || !el.contains(b)) return;
      if (b.dataset.adim) adim = +b.dataset.adim;
      else if (b.dataset.a === 'kal') kal = !kal;
      else if (b.dataset.a === 'pn') pn = !pn;
      durum();
    });
    const roStop = duyarli(el, kur);
    fontSonra(() => hapOlc(kok && kok.querySelector('svg')));
    const stop = ticker(el, (dt) => {
      if (tw < 1) { tw = Math.min(1, tw + dt / 0.6); const f = ease(tw); cur = from.map((v, i) => lerp(v, to[i], f)); }
      if (!RM) t += dt;
      kare();
    });
    return () => { stop(); roStop(); };
  };

  /* =====================================================================
     3 · doku yatağı: kapiller boyunca düşüş, mitokondri gradyanı, akım, Pasteur bandı
     ===================================================================== */
  VIZ.f19_doku = (el) => {
    const cap = capci(el);
    const CAP = {
      ist: '<b>İstirahat.</b> Kan kapillere 13,0 kPa ile girer; O₂ dokulara bırakıldıkça PO₂ venöz uca doğru düşer. Mitokondriyal PO₂ arteriyel kanınkinden çok düşüktür ve kapillerden mitokondriye bir gradyan vardır. Kaydırıcıyla dokunun metabolik etkinliğini artırın. [[K1 s. 81]]',
      art: '<b>Metabolik etkinlik artıyor.</b> Mitokondriler daha çok O₂ kullanır ve mitokondriyal PO₂ düşer; kapiller kanla mitokondri arasındaki gradyan büyür, O₂ difüzyonu hızlanır. H⁺ ve CO₂ birikmeye başlar. [[K1 s. 81]]',
      egz: '<b>Egzersiz yapan kas.</b> O₂ kullanımı yüksek, mitokondriyal PO₂ çok düşük: büyük gradyan difüzyonu hızlandırır. H⁺ ve CO₂ gibi metabolitler arteriyolleri genişletir; yerel kan akımı ve O₂ sunumu artar. Dokular geçen kandan daha çok O₂ çektiği için venöz uçtaki PO₂ de düşer (Bölüm 17). [[K1 s. 75, 81]]',
      sf: '<b>Prekapiller sfinkter kapalı.</b> Bu kapiller ağa kan girmez; kan öbür kapillerlere ya da anastomoza yönelir. Sfinkterler her kapiller ağa ne kadar kan gireceğini denetler. [[K1 s. 81]]',
      av: '<b>Arteriyovenöz anastomoz açık.</b> Kanın bir bölümü kapillerleri atlayıp doğrudan venüle akar. Bu kan değişim yüzeyine uğramadığı için dokuya O₂ bırakmaz (atlas açıklaması). Kitaba göre bu yollar insanda büyük olasılıkla genişlemiş iskelet kası kapiller yataklarıdır. [[K1 s. 81]]',
    };
    let a = 0, sf = [true, true, true], av = false, mod = 'akt', dar = false, t = 0, kok = null, O = {}, G = null, titre = null;
    let KAP = [], AVY = null, RBC = [], ART = [], AVR = [], DOT = [], MET = [], ARR = [];

    const GEN = {
      vb: '0 0 760 360', caps: [90, 170, 250], gx0: 160, gx1: 500,
      capD: (y) => `M130 170 C146 170 144 ${y} 160 ${y} H500 C516 ${y} 514 170 532 170 H640`,
      avD: 'M124 178 C124 296 138 312 172 312 H520 C552 312 566 300 566 178 L566 170 H640',
      art: { x: 16, w: 122, y: 170, h0: 16, h1: 10, halka: [56, 92] },
      ven: [530, 160, 110, 20], tw: [12, 8], avw: [16, 11], rr: 3.4, sfx: 160, sfr: [8, 5], hitR: 14,
      hucre: [
        { x: 200, y: 108, w: 100, h: 44, m: [[226, 130, 0], [274, 130, 1]] },
        { x: 360, y: 108, w: 100, h: 44, m: [[386, 130, 0], [434, 130, 1]] },
        { x: 200, y: 188, w: 100, h: 44, m: [[226, 210, 1], [274, 210, 2]] },
        { x: 360, y: 188, w: 100, h: 44, m: [[386, 210, 1], [434, 210, 2]] },
        { x: 280, y: 32, w: 100, h: 40, m: [[306, 52, 0], [354, 52, 0]] },
        { x: 280, y: 266, w: 100, h: 34, m: [[306, 283, 2], [354, 283, 2]] },
      ],
      me: [18, 9], hedefM: [[112, 162], [118, 172], [106, 178], [122, 166]], ok: [1.5, 3.5],
    };
    const DAR = {
      vb: '0 0 360 412', caps: [58, 138, 218], gx0: 84, gx1: 252,
      capD: (y) => `M60 138 C72 138 72 ${y} 84 ${y} H252 C264 ${y} 264 138 276 138 H350`,
      avD: 'M54 146 C54 256 64 266 94 266 H266 C292 266 300 256 300 148 L300 138 H350',
      art: { x: 6, w: 58, y: 138, h0: 14, h1: 8, halka: [26, 46] },
      ven: [274, 128, 78, 20], tw: [11, 7.5], avw: [14, 9.5], rr: 3, sfx: 84, sfr: [8, 5], hitR: 12, ok: [1.2, 2.6],
      hucre: [
        { x: 100, y: 72, w: 64, h: 52, m: [[116, 98, 0], [148, 98, 1]] },
        { x: 188, y: 72, w: 64, h: 52, m: [[204, 98, 0], [236, 98, 1]] },
        { x: 100, y: 152, w: 64, h: 52, m: [[116, 178, 1], [148, 178, 2]] },
        { x: 188, y: 152, w: 64, h: 52, m: [[204, 178, 1], [236, 178, 2]] },
      ],
      me: [16, 8], hedefM: [[44, 132], [50, 142], [38, 146], [56, 136]],
    };
    const mito = () => 1.0 - 0.55 * a;

    const svgOrtak = (g) => {
      let s = `<defs>
          <linearGradient id="f19-do-gs" gradientUnits="userSpaceOnUse" x1="${g.gx0}" y1="0" x2="${g.gx1}" y2="0"><stop offset="0" style="stop-color:var(--crit)"/><stop offset="1" style="stop-color:var(--accent)"/></linearGradient>
          <linearGradient id="f19-do-gf" gradientUnits="userSpaceOnUse" x1="${g.gx0}" y1="0" x2="${g.gx1}" y2="0"><stop offset="0" style="stop-color:var(--crit-soft)"/><stop offset="1" style="stop-color:var(--accent-soft)"/></linearGradient>
          ${okMarker('f19-do-ok', '--c-basic')}
        </defs>`;
      /* hücreler ve mitokondriler */
      g.hucre.forEach((h) => {
        s += `<rect class="f19-hucre" x="${h.x}" y="${h.y}" width="${h.w}" height="${h.h}" rx="8"/>`;
        h.m.forEach(([mx, my]) => { const [ew, eh] = g.me; s += `<ellipse class="f19-mito" cx="${mx}" cy="${my}" rx="${ew / 2}" ry="${eh / 2}"/><path class="f19-mito-k" d="M${mx - ew / 2 + 3} ${my} q${ew / 8} ${-eh / 3} ${ew / 4} 0 t${ew / 4} 0 t${ew / 4} 0"/>`; });
      });
      /* AV anastomoz */
      s += `<g class="f19-av" data-o="avG"><path class="dis" d="${g.avD}" stroke-width="${g.avw[0]}"/><path class="ic" d="${g.avD}" stroke-width="${g.avw[1]}"/></g>`;
      /* arteriyol */
      s += `<rect class="f19-arteriyol" data-o="art" x="${g.art.x}" width="${g.art.w}" y="0" height="0"/>`;
      g.art.halka.forEach((hx, i) => { s += `<ellipse class="f19-halka" data-o="halka${i}" cx="${hx}" cy="${g.art.y}" rx="3.5" ry="10"/>`; });
      /* kapillerler */
      g.caps.forEach((y, i) => { s += `<g class="f19-kap" data-o="kap${i}"><path class="dis" d="${g.capD(y)}" stroke-width="${g.tw[0]}"/><path class="ic" d="${g.capD(y)}" stroke-width="${g.tw[1]}"/></g>`; });
      s += `<rect class="f19-venul" x="${g.ven[0]}" y="${g.ven[1]}" width="${g.ven[2]}" height="${g.ven[3]}" rx="6"/>`;
      /* difüzyon okları */
      g.hucre.forEach((h) => h.m.forEach(([mx, my, ci]) => {
        const yc = g.caps[ci], asagi = my > yc, y1 = yc + (asagi ? 1 : -1) * (g.tw[0] / 2 + 1), y2 = my - (asagi ? 1 : -1) * (g.me[1] / 2 + 2);
        s += `<line class="f19-dif" data-ok="${ci}" x1="${mx}" x2="${mx}" y1="${y1}" y2="${y2}" marker-end="url(#f19-do-ok)"/>`;
      }));
      s += '<g data-o="dots"></g><g data-o="rbc"></g><g data-o="met"></g>';
      /* sfinkterler */
      g.caps.forEach((y, i) => {
        s += `<circle class="f19-sf" data-o="sf${i}" cx="${g.sfx}" cy="${y}" r="${g.sfr[0]}"/>
          <rect class="f19-sf-hit" data-sf="${i}" x="${g.sfx - g.hitR}" y="${y - g.hitR}" width="${g.hitR * 2}" height="${g.hitR * 2}" rx="${g.hitR}" tabindex="0" role="button" aria-pressed="false" aria-label="Prekapiller sfinkter ${i + 1}"/>`;
      });
      return s;
    };

    const svgW = () => {
      const gy = (p) => 320 - 44 * p;
      return `<svg class="f19-svg" viewBox="${GEN.vb}" role="img" aria-label="Doku yatağı: arteriyol, prekapiller sfinkterli üç kapiller, arteriyovenöz anastomoz, venül, mitokondrili doku hücreleri ve mitokondriyal PO₂ göstergesi">
        ${svgOrtak(GEN)}
        <text class="f19-ad" x="73" y="146" text-anchor="middle">Arteriyol</text>
        <text class="f19-ad" x="585" y="152" text-anchor="middle">Venül</text>
        <g class="f19-lej"><ellipse class="f19-mito" cx="25" cy="11" rx="9" ry="4.5"/><text class="f19-k" x="40" y="15">mitokondri (hücre içinde)</text>
          <line class="f19-dif" x1="16" x2="33" y1="27" y2="27" stroke-width="2.5" marker-end="url(#f19-do-ok)"/><text class="f19-k" x="40" y="31">O₂ difüzyonu</text>
          <text class="f19-met" x="25" y="47" text-anchor="middle">H⁺</text><text class="f19-k" x="40" y="47">metabolitler (H⁺, CO₂)</text></g>
        <text class="f19-k" x="150" y="64" text-anchor="end">prekapiller sfinkter</text><line class="f19-kil" x1="146" y1="68" x2="155" y2="83"/>
        <text class="f19-v f19-po" data-o="poG" x="176" y="0">13,0 kPa</text>
        <text class="f19-v f19-po" data-o="poC" x="500" y="0" text-anchor="end">≈5,3 kPa</text>
        <text class="f19-k f19-av-t" data-o="avT" x="340" y="335" text-anchor="middle">arteriyovenöz anastomoz</text>
        <rect class="f19-buy-kutu" x="646" y="6" width="110" height="344" rx="10"/>
        <text class="f19-ad" x="701" y="24" text-anchor="middle">Mitokondriyal</text><text class="f19-ad" x="701" y="39" text-anchor="middle">PO₂</text>
        <text class="f19-k" x="701" y="58" text-anchor="middle">↑ kapiller kan</text><text class="f19-k" x="701" y="70" text-anchor="middle">13,0–5,3 kPa</text><text class="f19-k" x="701" y="82" text-anchor="middle">ölçeğin üstünde</text>
        <rect class="f19-past" x="718" y="${gy(0.3)}" width="24" height="${(gy(0.15) - gy(0.3)).toFixed(1)}"/>
        <line class="f19-eksen" x1="730" x2="730" y1="${gy(5)}" y2="${gy(0)}"/>
        ${[0, 1, 2, 3, 4, 5].map((p) => `<line class="f19-eksen" x1="730" x2="735" y1="${gy(p)}" y2="${gy(p)}"/><text class="f19-tk" x="738" y="${gy(p) + 3.5}">${p}</text>`).join('')}
        <g data-o="ibre"><path class="f19-isaret" d="M704 -6 L716 0 L704 6 Z"/><line class="f19-isaret-c" x1="716" x2="742" y1="0" y2="0"/><text class="f19-ad f19-ibre-t" data-o="ibreT" x="701" y="4" text-anchor="end">düşük</text></g>
        <text class="f19-past-t" x="752" y="340" text-anchor="end">Pasteur 0,15–0,3</text>
      </svg>`;
    };
    const svgD = () => {
      const gx = (p) => 24 + 62.4 * p;
      return `<svg class="f19-svg" viewBox="${DAR.vb}" role="img" aria-label="Doku yatağı: arteriyol, prekapiller sfinkterli üç kapiller, arteriyovenöz anastomoz, venül, mitokondrili doku hücreleri ve mitokondriyal PO₂ göstergesi">
        ${svgOrtak(DAR)}
        <text class="f19-ad" x="34" y="120" text-anchor="middle">Arteriyol</text>
        <text class="f19-ad" x="313" y="121" text-anchor="middle">Venül</text>
        <text class="f19-k" x="62" y="38" text-anchor="middle">sfinkter</text>
        <text class="f19-v f19-po" data-o="poG" x="100" y="0">13,0</text>
        <text class="f19-v f19-po" data-o="poC" x="252" y="0" text-anchor="end">≈5,3</text>
        <text class="f19-k f19-av-t" data-o="avT" x="180" y="290" text-anchor="middle">AV anastomoz</text>
        <text class="f19-ad f19-kalin" x="24" y="318">Mitokondriyal PO₂ (0–5 kPa)</text>
        <text class="f19-k" x="336" y="340" text-anchor="end">kapiller kan 5,3–13,0 kPa →</text>
        <rect class="f19-past" x="${gx(0.15).toFixed(1)}" y="352" width="${(gx(0.3) - gx(0.15)).toFixed(1)}" height="14"/>
        <line class="f19-eksen" x1="24" x2="336" y1="366" y2="366"/>
        ${[0, 1, 2, 3, 4, 5].map((p) => `<line class="f19-eksen" x1="${gx(p).toFixed(1)}" x2="${gx(p).toFixed(1)}" y1="366" y2="371"/><text class="f19-tk" x="${gx(p).toFixed(1)}" y="385" text-anchor="middle">${p}</text>`).join('')}
        <g data-o="ibre"><path class="f19-isaret" d="M-6 346 L6 346 L0 358 Z"/><line class="f19-isaret-c" x1="0" x2="0" y1="358" y2="366"/><text class="f19-ad" data-o="ibreT" x="0" y="341" text-anchor="middle">düşük</text></g>
        <text class="f19-past-t" x="24" y="404">Pasteur 0,15–0,3 kPa</text>
      </svg>`;
    };

    const okuH = () => `<div class="f19-oku">
        ${[['Mitokondriyal PO₂', 'hucre'], ['Kapiller → mitokondri gradyanı', 'mavi'], ['O₂ difüzyon hızı', 'mavi'], ['Arteriyol çapı · yerel akım', 'kirmizi']].map(([ad, c], i) => `<div><span class="f19-oku-ad">${ad}</span><span class="f19-oku-bar"><i class="${c}" data-o="ob${i}"></i></span><b data-o="ow${i}"></b></div>`).join('')}
      </div>`;

    const kur = (d) => {
      dar = d; G = dar ? DAR : GEN;
      el.innerHTML = `<div class="f19-doku${dar ? ' f19-dar' : ''}">
        <div class="f19-ctl f19-ctl-sol">
          ${segH('Hazır ayar', 'on', [['0', 'İstirahat'], ['1', 'Egzersiz yapan kas']])}
          <label class="f19-rng"><span>Dokunun metabolik etkinliği</span><input type="range" min="0" max="100" step="1" value="${Math.round(a * 100)}" data-s="a" aria-label="Dokunun metabolik etkinliği"><span class="f19-rng-uc"><i>istirahat</i><i>yoğun egzersiz</i></span></label>
          <div class="btn-row">
            <button type="button" class="btn ghost f19-tog" data-a="av" aria-pressed="false">Arteriyovenöz anastomoz</button>
            <button type="button" class="f19-link" data-a="sifir">Sfinkterleri sıfırla</button>
          </div>
        </div>
        <div class="f19-sahne">${dar ? svgD() : svgW()}</div>
        ${okuH()}
      </div>`;
      kok = el.firstElementChild;
      O = topla(kok, 'data-o');
      KAP = G.caps.map((_, i) => { const p = O['kap' + i].querySelector('.dis'); return { p, L: p.getTotalLength() }; });
      { const p = O.avG.querySelector('.dis'); AVY = { p, L: p.getTotalLength() }; }
      O.rbc.innerHTML = Array.from({ length: 21 + 4 + 7 }, () => `<g opacity="0"><circle class="f19-rbc-v" r="${G.rr}"/><circle class="f19-rbc-o" r="${G.rr}"/></g>`).join('');
      const gs = [...O.rbc.children].map((g) => ({ g, o: g.children[1] }));
      RBC = gs.slice(0, 21); ART = gs.slice(21, 25); AVR = gs.slice(25);
      ARR = [...kok.querySelectorAll('.f19-dif[data-ok]')].map((l) => ({ l, ci: +l.dataset.ok, x: +l.getAttribute('x1'), y1: +l.getAttribute('y1'), y2: +l.getAttribute('y2') }));
      O.dots.innerHTML = ARR.map(() => '<circle class="f19-o2" r="2.4"/><circle class="f19-o2" r="2.4"/>').join('');
      DOT = [...O.dots.children];
      O.met.innerHTML = Array.from({ length: 13 }, (_, j) => `<text class="f19-met" text-anchor="middle">${j % 2 ? 'CO₂' : 'H⁺'}</text>`).join('');
      MET = [...O.met.children];
      durum();
    };

    const durum = () => {
      if (!kok) return;
      const inp = kok.querySelector('[data-s="a"]'); if (inp && +inp.value !== Math.round(a * 100)) inp.value = Math.round(a * 100);
      kok.querySelectorAll('[data-on]').forEach((b) => b.setAttribute('aria-pressed', String((a === 0 && b.dataset.on === '0') || (a === 1 && b.dataset.on === '1'))));
      kok.querySelector('[data-a="av"]').setAttribute('aria-pressed', String(av));
      /* arteriyol çapı */
      const h = G.art.h0 + G.art.h1 * a;
      at(O.art, 'y', G.art.y - h / 2); at(O.art, 'height', h); at(O.art, 'rx', h / 2);
      G.art.halka.forEach((_, i) => at(O['halka' + i], 'ry', h / 2 + 3));
      /* sfinkterler, kapillerler, oklar */
      G.caps.forEach((_, i) => {
        sinif(O['kap' + i], 'kapali', !sf[i]);
        const c = O['sf' + i]; at(c, 'r', sf[i] ? G.sfr[0] : G.sfr[1]); sinif(c, 'kapali', !sf[i]);
        const hit = kok.querySelector(`[data-sf="${i}"]`);
        hit.setAttribute('aria-pressed', String(!sf[i]));
        hit.setAttribute('aria-label', `Prekapiller sfinkter ${i + 1}: ${sf[i] ? 'açık' : 'kapalı'}`);
      });
      const sw = G.ok[0] + G.ok[1] * a;
      ARR.forEach((r) => { r.l.style.display = sf[r.ci] ? '' : 'none'; r.l.style.strokeWidth = sw.toFixed(2); });
      sinif(O.avG, 'acik', av); sinif(O.avT, 'acik', av);
      /* PO₂ etiketleri: en üstteki açık kapillerde */
      const ilk = sf.indexOf(true), yk = G.caps[ilk] - (ilk === 0 ? (dar ? 10 : 11) : (dar ? 7 : 8)); // alttaki kapillerlerde etiket hücrelerle tüp arasındaki boşluğa
      at(O.poG, 'y', yk); at(O.poC, 'y', yk);
      yaz(O.poC, a > 0.1 ? (dar ? 'venöz ↓' : 'venöz uç ↓') : (dar ? '≈5,3' : '≈5,3 kPa'));
      /* mitokondri göstergesi */
      const m = mito();
      if (dar) at(O.ibre, 'transform', `translate(${(24 + 62.4 * m).toFixed(1)} 0)`);
      else at(O.ibre, 'transform', `translate(0 ${(320 - 44 * m).toFixed(1)})`);
      yaz(O.ibreT, a < 0.7 ? 'düşük' : 'çok düşük');
      /* okuma kutuları */
      const kel = a < 0.3 ? 'normal' : a < 0.7 ? 'artmış' : 'belirgin artmış';
      const dol = [0.5 * (1 - 0.55 * a), 0.4 + 0.6 * a, 0.4 + 0.6 * a, 0.4 + 0.6 * a]; // mitokondri: istirahatte yarım dolu ("düşük" okunsun), egzersizde daha az
      const soz = [a < 0.7 ? 'düşük' : 'çok düşük', kel, kel, a < 0.3 ? 'istirahat' : 'genişlemiş'];
      dol.forEach((v, i) => { O['ob' + i].style.width = (v * 100).toFixed(1) + '%'; yaz(O['ow' + i], soz[i]); });
      /* açıklama */
      if (mod === 'sf') cap(CAP.sf); else if (mod === 'av') cap(CAP.av); else cap(a >= 0.7 ? CAP.egz : a > 0 ? CAP.art : CAP.ist);
      kare();
    };

    const kare = () => {
      if (!kok) return;
      const zt = RM ? 0 : t, acik = sf.filter(Boolean).length;
      const v = 40 * (1 + 1.2 * a), vk = v * (1 + 0.3 * (3 - acik));
      const g0 = G.gx0, g1 = G.gx1, ek = 1 + 0.6 * a;
      /* kapiller eritrositleri */
      let j = 0;
      KAP.forEach((k, i) => {
        for (let q = 0; q < 7; q++, j++) {
          const r = RBC[j];
          if (!sf[i]) { r.g.setAttribute('opacity', '0'); continue; }
          const s = ((q / 7) * k.L + vk * zt + i * 23) % k.L, pt = k.p.getPointAtLength(s);
          const gg = clamp(((pt.x - g0) / (g1 - g0)) * ek, 0, 1);
          r.g.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
          r.g.setAttribute('opacity', clamp(Math.min(s / 10, (k.L - s) / 14), 0, 1).toFixed(2));
          r.o.setAttribute('opacity', (1 - gg).toFixed(2));
        }
      });
      /* arteriyol */
      const ah = G.art.h0 + G.art.h1 * a, aL = G.art.w - 8;
      ART.forEach((r, q) => {
        const s = ((q / ART.length) * aL + v * zt) % aL, x = G.art.x + 4 + s, y = G.art.y + [-1, 1, 0, -0.5][q] * (ah / 2 - G.rr - 1.5);
        r.g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
        r.g.setAttribute('opacity', clamp(Math.min(s / 8, (aL - s) / 8), 0, 1).toFixed(2));
        r.o.setAttribute('opacity', '1');
      });
      /* anastomoz: oksijenli kan hızla geçer */
      AVR.forEach((r, q) => {
        if (!av) { r.g.setAttribute('opacity', '0'); return; }
        const s = ((q / AVR.length) * AVY.L + v * 2.2 * zt) % AVY.L, pt = AVY.p.getPointAtLength(s);
        r.g.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
        r.g.setAttribute('opacity', clamp(Math.min(s / 10, (AVY.L - s) / 14), 0, 1).toFixed(2));
        r.o.setAttribute('opacity', '1');
      });
      /* difüzyon okları boyunca O₂ */
      const hz = (1 + 1.5 * a) * 0.6;
      ARR.forEach((r, i) => {
        for (let q = 0; q < 2; q++) {
          const c = DOT[i * 2 + q];
          if (!sf[r.ci]) { c.setAttribute('opacity', '0'); continue; }
          const ph = RM ? 0.3 + 0.4 * q : (zt * hz + q / 2 + i * 0.13) % 1;
          c.setAttribute('cx', r.x + (q ? 4 : -4)); c.setAttribute('cy', lerp(r.y1, r.y2, ph).toFixed(1));
          c.setAttribute('opacity', (Math.sin(Math.PI * ph) * 0.95).toFixed(2));
        }
      });
      /* metabolitler hücrelerden arteriyole */
      const n = Math.round(1 + 12 * a), D = 6 / (1 + a);
      MET.forEach((m, q) => {
        if (q >= n) { m.setAttribute('opacity', '0'); return; }
        const h = G.hucre[q % G.hucre.length], hm = G.hedefM[q % G.hedefM.length];
        const x0 = h.x + h.w * (0.3 + 0.4 * ((q * 7) % 5) / 4), y0 = h.y + h.h / 2 + ((q % 3) - 1) * 8;
        const ph = RM ? (q / n + 0.35) % 1 : (zt / D + q / n) % 1, f = ease(ph);
        m.setAttribute('x', lerp(x0, hm[0], f).toFixed(1)); m.setAttribute('y', lerp(y0, hm[1], f).toFixed(1));
        m.setAttribute('opacity', (Math.sin(Math.PI * ph) * 0.95).toFixed(2));
      });
    };

    const sec = (v) => { a = clamp(v, 0, 1); if (mod !== 'sf' && mod !== 'av') mod = 'akt'; };
    el.addEventListener('input', (ev) => {
      const s = ev.target.closest('[data-s="a"]'); if (!s) return;
      a = +s.value / 100; mod = 'akt'; durum();
    });
    const sfBas = (i) => {
      if (sf[i] && sf.filter(Boolean).length === 1) {
        const c = O['sf' + i]; sinif(c, 'titre', false); void c.getBBox(); sinif(c, 'titre', true);
        clearTimeout(titre); titre = setTimeout(() => sinif(c, 'titre', false), 450);
        return;
      }
      sf[i] = !sf[i]; mod = sf[i] ? 'akt' : 'sf'; durum();
    };
    el.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-on],[data-a],[data-sf]');
      if (!b || !el.contains(b)) return;
      if (b.dataset.on !== undefined) { sec(+b.dataset.on); mod = 'akt'; }
      else if (b.dataset.sf !== undefined) { sfBas(+b.dataset.sf); return; }
      else if (b.dataset.a === 'av') { av = !av; mod = av ? 'av' : 'akt'; }
      else if (b.dataset.a === 'sifir') { sf = [true, true, true]; mod = 'akt'; }
      durum();
    });
    el.addEventListener('keydown', (ev) => {
      const b = ev.target.closest('[data-sf]');
      if (b && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); sfBas(+b.dataset.sf); }
    });
    const roStop = duyarli(el, kur);
    const stop = ticker(el, (dt) => { if (RM) return; t += dt; kare(); });
    return () => { stop(); roStop(); clearTimeout(titre); };
  };

  /* =====================================================================
     4 · bir basamak bozulunca: irtifa, hipoventilasyon, pnömoni
     ===================================================================== */
  VIZ.f19_bozulma = (el) => {
    const cap = capci(el);
    const SEN = {
      deniz: { ad: 'Deniz seviyesi', pb: PB_DENIZ, pc: 5.3, ilk: -1 },
      irtifa: { ad: 'Yüksek irtifa', pb: 65, pc: 5.3, ilk: 0, neden: 'PB 65 kPa (FiO₂ aynı)', nedenD: 'PB 65 kPa', nk: 0, artE: '&lt; 5,7', paO2: '&lt; 5,7' },
      hv: { ad: 'İrtifa + hiperventilasyon', pb: 65, pc: 3.0, ilk: 0, telafi: 2, neden: 'PaCO₂/R = 3,0/0,8 = 3,8', nedenD: 'PaCO₂/R 3,8', nk: 2, artE: '&lt; 8,5', paO2: '&lt; 8,5' },
      hipo: { ad: 'Hipoventilasyon', pb: PB_DENIZ, pc: 9, ilk: 2, neden: 'PaCO₂/R = 9/0,8 = 11,3', nedenD: 'PaCO₂/R 11,3', nk: 2, artE: '&lt; 8,6', paO2: '&lt; 8,6 (A–a normal)' },
      pn: { ad: 'Pnömoni', pb: PB_DENIZ, pc: 5.3, ilk: 3, neden: 'V̇/Q̇ uyumsuzluğu: A–a ↑', nedenD: 'V̇/Q̇ ↑', nk: 3, pnomoni: true, artE: '↓', paO2: 'düşer (A–a artar)' },
    };
    const CAP = {
      deniz: '<b>Deniz seviyesi, sağlıklı akciğer.</b> 21,2 → 19,9 → 13,3 → 13,0 kPa; kapillerden mitokondriye yeterli gradyan var. Bir durum seçin ve bozulmanın hangi basamakta başlayıp aşağı doğru nasıl yayıldığını izleyin. [[K1 s. 80–81]]',
      irtifa: "<b>Yüksek irtifa: başlangıç noktası düşer.</b> FiO₂ aynı (%20,93), PB 65 kPa (Tibet Platosu): atmosferik PO₂ ≈13,6, karinada ≈12,3 kPa ve PaCO₂ 5,3 kPa kalırsa PAO₂ 5,7 kPa. Fizyolojik şant PaO₂'yi daha da düşürür; sonraki bütün basamaklar deniz seviyesindekinden düşüktür. [[K1 s. 78, 81]]",
      hv: "<b>İrtifada hiperventilasyon.</b> PaCO₂ 3,0 kPa'ya inince çıkarılan terim küçülür ve PAO₂ 8,5 kPa'ya yükselir: başlangıç noktası hâlâ düşük ama alveoler basamak kısalmıştır. Bedeli kronik solunumsal alkalozdur. [[K1 s. 78–79]]",
      hipo: '<b>Hipoventilasyon: alveoler basamak büyür.</b> Atmosfer ve karina normaldir. Opioid aşırı dozunda PaCO₂ 9 kPa: çıkarılan terim 9/0,8 = 11,3 kPa, PAO₂ 8,6 kPa. A–a gradyanı normaldir; düşüş arterden aşağıya olduğu gibi taşınır. [[K1 s. 78, 81]]',
      pn: "<b>Pnömoni: arteriyel basamak büyür.</b> PAO₂ normal olabilir ama V̇/Q̇ uyumsuzluğu PaO₂'yi düşürür; alveol ile arter arasındaki fark (A–a gradyanı) artar. Kitap bu basamak için sayı vermez. [[K1 s. 78, 81]]",
      agir: " <b>Ağır olgu (şematik):</b> kapiller PO₂, O₂'nin dokulara kolayca difüze olmasına yetmeyecek kadar düşerse mitokondriyal PO₂ Pasteur noktasının (0,15–0,3 kPa) altına iner ve ATP üretiminde anaerobik metabolizma baskın olur. [[K1 s. 81]]",
    };
    const BAS = ['Atmosfer', 'Trakea', 'Alveol', 'Arter', 'Doku kapilleri', 'Mitokondri'];
    const deger = (k, ag) => {
      const s = SEN[k], A = atm(s.pb), K = karina(s.pb), P = pao2(s.pb, s.pc);
      const art = k === 'deniz' ? 13.0 : s.pnomoni ? 10.8 : P - 0.3;
      let ven = 5.3 - (13.0 - art) * 0.25, mi = (1.0 * ven) / 5.3;
      if (ag && k !== 'deniz') { mi = 0.1; ven = 1.5; }
      return [A, K, P, art, ven, mi];
    };
    const NOR = deger('deniz', false);
    let sen = 'deniz', agir = false, tahmin = false, bekle = null, dar = false, T = 0, kok = null, O = {};
    let cur = NOR.slice(), from = cur.slice(), to = cur.slice(), st = cur.map(() => -1);

    /* geniş: kaskadla aynı ölçek */
    const C = [[80, 150], [160, 230], [240, 310], [320, 390], [400, 510], [520, 590]];
    const yW = (p) => 330 - p * 11.818, yb = (p) => 310 - 60 * p;
    const TUR = ['gaz', 'gaz', 'gaz', 'kan', 'kan', 'hucre'];
    /* dar: satırlar */
    const xD = (p) => 114 + p * 10.818, TD = (i) => 6 + 56 * i, xbD = (p) => 30 + 150 * p;

    const svgW = () => {
      const y = yW;
      let s = `<svg class="f19-svg" viewBox="0 0 760 390" role="img" aria-label="Oksijen kaskadı senaryoları: normal kaskadın kesikli hayaleti üzerinde seçilen durumun basamakları ve mitokondri için büyüteç">
        <defs>
          <linearGradient id="f19-bo-gf" gradientUnits="userSpaceOnUse" x1="400" y1="0" x2="510" y2="0"><stop offset="0" style="stop-color:var(--crit-soft)"/><stop offset="1" style="stop-color:var(--accent-soft)"/></linearGradient>
          <linearGradient id="f19-bo-gs" gradientUnits="userSpaceOnUse" x1="400" y1="0" x2="510" y2="0"><stop offset="0" style="stop-color:var(--crit)"/><stop offset="1" style="stop-color:var(--accent)"/></linearGradient>
        </defs>`;
      [0, 5, 10, 15, 20].forEach((p) => { s += `<line class="f19-izgara" x1="70" x2="600" y1="${y(p)}" y2="${y(p)}"/><text class="f19-tk" x="63" y="${(y(p) + 4).toFixed(1)}" text-anchor="end">${p}</text>`; });
      s += `<line class="f19-eksen" x1="70" x2="70" y1="${y(22)}" y2="330"/><line class="f19-eksen" x1="70" x2="602" y1="330" y2="330"/>
        <text class="f19-ad" transform="translate(24 200) rotate(-90)" text-anchor="middle">PO₂ (kPa)</text>`;
      /* hayalet */
      s += '<g data-o="hay">';
      C.forEach(([x0, x1], i) => {
        if (i === 4) s += `<polygon class="f19-hayalet" points="${x0},330 ${x0},${y(NOR[3]).toFixed(1)} ${x1},${y(NOR[4]).toFixed(1)} ${x1},330"/>`;
        else s += `<rect class="f19-hayalet" data-o="hr${i}" x="${x0}" y="${y(NOR[i]).toFixed(1)}" width="${x1 - x0}" height="${(330 - y(NOR[i])).toFixed(1)}"/>`;
      });
      s += '</g>';
      C.forEach(([x0, x1], i) => {
        s += i === 4 ? `<polygon data-o="b4" fill="url(#f19-bo-gf)"/><polygon class="f19-ilk-ol" data-o="ol4"/>`
          : `<rect class="f19-bar ${TUR[i]}" data-o="b${i}" x="${x0}" width="${x1 - x0}"/><rect class="f19-ilk-ol" data-o="ol${i}" x="${x0}" width="${x1 - x0}"/>`;
      });
      s += `<path class="f19-cz gaz" data-o="cz0"/><path class="f19-cz kan" data-o="cz1"/><path class="f19-cz grad" data-o="cz2" stroke="url(#f19-bo-gs)"/><path class="f19-cz hucre" data-o="cz3"/>`;
      C.forEach(([x0, x1], i) => {
        const cx = (x0 + x1) / 2;
        if (i < 4) s += `<text class="f19-hay-t" data-o="ht${i}" x="${cx}" text-anchor="middle">${fmt(NOR[i])}</text>`;
        s += `<text class="f19-v" data-o="v${i}" x="${i === 4 ? 514 : i === 5 ? 555 : cx}"${i === 4 ? '' : ' text-anchor="middle"'}></text>`;
      });
      /* hap satırları */
      s += `<g data-o="hapIlk">${hap(0, 17, 'ilk bozulan basamak', { cls: 'krit', ek: 'data-o="hIlk"' })}</g>
        <g data-o="hapTel">${hap(275, 17, 'hiperventilasyon telafisi', { cls: 'iyi' })}</g>
        <g data-o="hapNed"><line class="f19-kil" data-o="kilNed"/>${hap(0, 43, '', { ek: 'data-o="hNed"' })}</g>`;
      s += `<line class="f19-huni" x1="590" y1="${y(1).toFixed(1)}" x2="606" y2="150"/><line class="f19-huni" x1="590" y1="330" x2="606" y2="346"/>
        <rect class="f19-buy-kutu" x="606" y="150" width="150" height="196" rx="10"/>
        <text class="f19-ad" x="681" y="168" text-anchor="middle">Büyüteç · 0–2 kPa</text>
        <rect class="f19-past" x="636" y="${yb(0.3)}" width="116" height="${yb(0.15) - yb(0.3)}"/>
        ${[0, 0.5, 1, 1.5, 2].map((p) => `<line class="f19-eksen" x1="630" x2="634" y1="${yb(p)}" y2="${yb(p)}"/><text class="f19-tk" x="628" y="${yb(p) + 3.5}" text-anchor="end">${fmt(p, p % 1 ? 1 : 0)}</text>`).join('')}
        <line class="f19-eksen" x1="634" x2="634" y1="${yb(2)}" y2="${yb(0)}"/><line class="f19-eksen" x1="634" x2="752" y1="${yb(0)}" y2="${yb(0)}"/>
        <line class="f19-normal" x1="640" x2="752" y1="${yb(1)}" y2="${yb(1)}"/><text class="f19-k" x="752" y="${yb(1) - 5}" text-anchor="end">normal</text>
        <g data-o="ibre"><path class="f19-isaret" d="M636 -6 L648 0 L636 6 Z"/><line class="f19-isaret-c" x1="648" x2="752" y1="0" y2="0"/></g><text class="f19-k f19-yesil" data-o="ibreW" x="652">bu durum</text>
        <line class="f19-past-kil" x1="694" x2="694" y1="${yb(0) + 5}" y2="${yb(0.15) + 1}"/>
        <text class="f19-past-t" x="694" y="326" text-anchor="middle">Pasteur noktası</text><text class="f19-past-t" x="694" y="339" text-anchor="middle">0,15–0,3 kPa</text>`;
      const AD = [['Atmosfer'], ['Trakea'], ['Alveol'], ['Arter'], ['Doku', 'kapilleri'], ['Mitokondri']];
      C.forEach(([x0, x1], i) => { const cx = (x0 + x1) / 2; s += `<text class="f19-ad" x="${cx}" y="348" text-anchor="middle">${AD[i][0]}${AD[i][1] ? `<tspan x="${cx}" dy="14">${AD[i][1]}</tspan>` : ''}</text>`; });
      return s + '</svg>';
    };

    const svgD = () => {
      let s = `<svg class="f19-svg" viewBox="0 0 360 474" role="img" aria-label="Oksijen kaskadı senaryoları: normal kaskadın kesikli hayaleti üzerinde seçilen durumun basamakları (yatay çubuklar) ve mitokondri için büyüteç">`;
      [0, 5, 10, 15, 20].forEach((p) => { s += `<line class="f19-izgara" x1="${xD(p).toFixed(1)}" x2="${xD(p).toFixed(1)}" y1="2" y2="342"/><text class="f19-tk" x="${xD(p).toFixed(1)}" y="355" text-anchor="middle">${p}${p === 20 ? ' kPa' : ''}</text>`; });
      const AD = ['Atmosfer', 'Trakea', 'Alveol', 'Arter', 'Doku kap.', 'Mitokondri'];
      AD.forEach((ad, i) => {
        const T = TD(i);
        s += `<text class="f19-ad" x="6" y="${T + 18}">${ad}</text>`;
        if (i === 4) {
          s += `<rect class="f19-hayalet" x="114" y="${T + 6}" width="${(xD(NOR[3]) - 114).toFixed(1)}" height="8"/><rect class="f19-hayalet" x="114" y="${T + 19}" width="${(xD(NOR[4]) - 114).toFixed(1)}" height="8"/>
            <rect class="f19-bar kan f19-cerc" data-o="b4a" x="114" y="${T + 6}" height="8"/><rect class="f19-bar ven f19-cerc" data-o="b4" x="114" y="${T + 19}" height="8"/>
            <text class="f19-k" x="${(xD(NOR[3]) + 5).toFixed(1)}" y="${T + 14}">arteriyel uç</text>
            <text class="f19-v" x="${(xD(NOR[4]) + 5).toFixed(1)}" y="${T + 27}"><tspan class="f19-k" dx="0">venöz uç </tspan><tspan data-o="v4"></tspan></text>`;
        } else {
          s += `<rect class="f19-hayalet" data-o="hr${i}" x="114" y="${T + 8}" width="${(xD(NOR[i]) - 114).toFixed(1)}" height="20"/>
            <rect class="f19-bar ${TUR[i]} f19-cerc" data-o="b${i}" x="114" y="${T + 8}" height="20"/><rect class="f19-ilk-ol" data-o="ol${i}" x="114" y="${T + 8}" height="20"/>
            <text class="f19-v" data-o="v${i}" y="${T + 22.5}"></text>`;
        }
        s += `<g data-o="hapD${i}">${hap(13, T + 38, '', { an: 'start', ek: `data-o="hN${i}"` })}</g><text class="f19-etiket" data-o="et${i}" x="114" y="${T + 45}"></text>`;
      });
      s += `<rect class="f19-buy-kutu" x="4" y="362" width="352" height="106" rx="10"/>
        <text class="f19-ad" x="14" y="379">Büyüteç · mitokondri, 0–2 kPa</text>
        <rect class="f19-past" x="${xbD(0.15)}" y="412" width="${xbD(0.3) - xbD(0.15)}" height="18"/>
        <line class="f19-normal" x1="${xbD(1)}" x2="${xbD(1)}" y1="412" y2="430"/><text class="f19-k" x="${xbD(1)}" y="396" text-anchor="middle">normal</text>
        <line class="f19-eksen" x1="30" x2="330" y1="430" y2="430"/>
        ${[0, 0.5, 1, 1.5, 2].map((p) => `<line class="f19-eksen" x1="${xbD(p)}" x2="${xbD(p)}" y1="430" y2="435"/><text class="f19-tk" x="${xbD(p)}" y="447" text-anchor="middle">${fmt(p, p % 1 ? 1 : 0)}</text>`).join('')}
        <g data-o="ibre"><path class="f19-isaret" d="M-6 414 L6 414 L0 426 Z"/><line class="f19-isaret-c" x1="0" x2="0" y1="426" y2="430"/><text class="f19-k f19-yesil" data-o="ibreT" x="0" y="409" text-anchor="middle">bu durum</text></g>
        <text class="f19-past-t" x="30" y="462">Pasteur 0,15–0,3 kPa</text>`;
      return s + '</svg>';
    };

    const tabloH = () => dar ? '<dl class="f19-dl" data-o="tbl"></dl>' : `<div class="tbl-wrap f19-tbl-w"><table class="tbl f19-tbl"><thead><tr><th>kPa</th><th class="num">Bu durum</th><th class="num">Normal</th></tr></thead><tbody data-o="tbl"></tbody></table></div>`;

    const kur = (d) => {
      dar = d;
      el.innerHTML = `<div class="f19-boz${dar ? ' f19-dar' : ''}">
        <div class="f19-ctl f19-ctl-sol">
          ${segH('Durum', 'sen', Object.entries(SEN).map(([k, s]) => [k, s.ad]))}
          <div class="btn-row">
            <button type="button" class="btn ghost f19-tog" data-a="agir" aria-pressed="false">Ağır olgu</button>
            <label class="f19-onay"><input type="checkbox" data-a="tahmin"> Önce tahmin et</label>
          </div>
        </div>
        <div class="f19-tahmin" data-o="soru" hidden>
          <p class="f19-soru-t">Bu durumda kaskadın hangi basamağı ilk bozulur?</p>
          <div class="btn-row">${BAS.map((b, i) => `<button type="button" class="btn ghost f19-kucuk" data-cev="${i}">${b}</button>`).join('')}</div>
          <p class="f19-geri" data-o="geri" aria-live="polite"></p>
        </div>
        <div class="f19-sahne">${dar ? svgD() : svgW()}</div>
        <p class="f19-rozet" data-o="rozet" hidden>Pasteur noktasının altında: anaerobik metabolizma baskın</p>
        ${tabloH()}
      </div>`;
      kok = el.firstElementChild;
      O = topla(kok, 'data-o');
      kok.querySelector('[data-a="tahmin"]').checked = tahmin;
      durum();
    };

    const tabloDoldur = (k) => {
      const s = SEN[k], A = atm(s.pb), K = karina(s.pb), P = pao2(s.pb, s.pc);
      const sat = [['Atmosfer', fmt(A), '21,2'], ['Karina', fmt(K), '19,9'], ['PAO₂', fmt(P), '13,3'], ['PaO₂', k === 'deniz' ? '13,0' : s.paO2, '13,0']];
      if (dar) yazH(O.tbl, sat.map(([a, b, c]) => `<div><dt>${a}</dt><dd><b>${b}</b> <span>(normal ${c})</span></dd></div>`).join(''));
      else yazH(O.tbl, sat.map(([a, b, c]) => `<tr><th>${a}</th><td class="num"><b>${b}</b></td><td class="num">${c}</td></tr>`).join(''));
    };

    const uygula = () => {
      const yeni = deger(sen, agir);
      let i0 = yeni.findIndex((v, i) => Math.abs(v - cur[i]) > 0.005);
      if (i0 < 0) i0 = 0;
      from = cur.slice(); to = yeni;
      st = yeni.map((_, i) => (RM ? -99 : T + Math.max(0, i - i0) * 0.18));
      if (RM) cur = to.slice();
      durum();
    };

    const durum = () => {
      if (!kok) return;
      const s = SEN[sen], ag = agir && sen !== 'deniz', gos = bekle ? bekle.eski : sen, sg = SEN[gos];
      bas(kok, 'sen', sen);
      const ab = kok.querySelector('[data-a="agir"]'); ab.disabled = sen === 'deniz'; ab.setAttribute('aria-pressed', String(ag));
      O.soru.hidden = !(tahmin && (bekle || O.soru._cev));
      O.rozet.hidden = !(ag && !bekle);
      /* etiketler (gösterilen senaryo) */
      const vals = deger(gos, agir && gos !== 'deniz'), sn = gos === 'deniz';
      const etk = [fmt(vals[0]), fmt(vals[1]), fmt(vals[2]), sn ? '13,0' : sg.artE, sn ? '5,3' : '↓', sn ? '&lt;5' : '↓'];
      etk.forEach((e, i) => degYaz(O['v' + i], e));
      sinif(O.hay, 'f19-gizli', sn);
      for (let i = 0; i < 4; i++) { const fark = Math.abs(vals[i] - NOR[i]) > 0.05 && !sn; sinif(O['ht' + i], 'f19-gizli', !fark); sinif(O['hr' + i], 'f19-gizli', !fark); }
      for (let i = 0; i < 6; i++) { const ol = O['ol' + i]; if (!ol) continue; ol.setAttribute('class', 'f19-ilk-ol' + (sg.ilk === i ? ' ilk' : sg.telafi === i ? ' telafi' : '')); }
      if (dar) {
        for (let i = 0; i < 6; i++) {
          const hn = O['hN' + i]; yazH(hn.querySelector('text'), `<tspan x="13">${sg.nk === i ? sg.nedenD : ''}</tspan>`);
          sinif(O['hapD' + i], 'f19-gizli', sg.nk !== i);
          yaz(O['et' + i], sg.ilk === i ? 'ilk bozulan basamak' : sg.telafi === i ? 'hiperventilasyon telafisi' : '');
          if (O['et' + i]) O['et' + i].setAttribute('class', 'f19-etiket' + (sg.telafi === i ? ' iyi' : ''));
        }
      } else {
        const cxs = C.map(([a, b]) => (a + b) / 2);
        sinif(O.hapIlk, 'f19-gizli', sg.ilk < 0);
        sinif(O.hapTel, 'f19-gizli', sg.telafi === undefined);
        sinif(O.hapNed, 'f19-gizli', sg.ilk < 0);
        if (sg.ilk >= 0) {
          const xi = cxs[sg.ilk] + (sg.ilk === 0 ? 13 : 0);
          O.hIlk.querySelector('text').setAttribute('x', xi); yazH(O.hIlk.querySelector('text'), `<tspan x="${xi}">ilk bozulan basamak</tspan>`);
          const xn = cxs[sg.nk] + (sg.nk === 0 ? 13 : 0);
          yazH(O.hNed.querySelector('text'), `<tspan x="${xn}">${sg.neden}</tspan>`); O.hNed.querySelector('text').setAttribute('x', xn);
          const gx = C[sg.nk][0] + 12;
          at(O.kilNed, 'x1', gx); at(O.kilNed, 'x2', gx); at(O.kilNed, 'y1', 53); at(O.kilNed, 'y2', yW(NOR[sg.nk]) - 4);
        }
      }
      hapOlc(kok.querySelector('svg'));
      tabloDoldur(gos);
      if (!bekle) cap(CAP[sen] + (ag ? CAP.agir : ''));
      kare();
    };

    const kare = () => {
      if (!kok) return;
      const v = cur;
      if (dar) {
        for (let i = 0; i < 6; i++) {
          if (i === 4) { at(O.b4a, 'width', Math.max(0, xD(v[3]) - 114)); at(O.b4, 'width', Math.max(0, xD(v[4]) - 114)); continue; }
          const w = Math.max(0, xD(v[i]) - 114);
          at(O['b' + i], 'width', w); at(O['ol' + i], 'width', w);
          const ic = 114 + w > 296; // uzun çubukta değer içeride, sağda
          at(O['v' + i], 'x', ic ? 114 + w - 6 : 114 + w + 5); at(O['v' + i], 'text-anchor', ic ? 'end' : 'start');
        }
        at(O.ibre, 'transform', `translate(${xbD(v[5]).toFixed(1)} 0)`);
        sinif(O.ibreT, 'f19-gizli', sen === 'deniz' && !bekle);
        return;
      }
      const y = yW;
      for (let i = 0; i < 6; i++) {
        if (i === 4) {
          const pts = `400,330 400,${y(v[3]).toFixed(1)} 510,${y(v[4]).toFixed(1)} 510,330`;
          at(O.b4, 'points', pts); at(O.ol4, 'points', pts);
          at(O.v4, 'y', y(v[4]) + 4);
          continue;
        }
        const top = y(v[i]);
        at(O['b' + i], 'y', top); at(O['b' + i], 'height', 330 - top);
        at(O['ol' + i], 'y', top); at(O['ol' + i], 'height', 330 - top);
        at(O['v' + i], 'y', top - (i === 5 ? 6 : 8));
      }
      for (let i = 0; i < 4; i++) {
        const gt = y(NOR[i]), d = y(to[i]) - gt;
        at(O['ht' + i], 'y', d >= 34 ? gt + 14 : gt - 5);
      }
      const cz = (a, b) => { let d = ''; for (let i = a; i <= b; i++) { const [x0, x1] = C[i]; d += (d ? ` V${y(v[i]).toFixed(1)}` : `M${x0} ${y(v[i]).toFixed(1)}`) + ` H${x1}` + (i < b ? ` H${C[i + 1][0]}` : ''); } return d; };
      at(O.cz0, 'd', cz(0, 2));
      at(O.cz1, 'd', `M310 ${y(v[2]).toFixed(1)} H320 V${y(v[3]).toFixed(1)} H390`);
      at(O.cz2, 'd', `M390 ${y(v[3]).toFixed(1)} H400 L510 ${y(v[4]).toFixed(1)}`);
      at(O.cz3, 'd', `M520 ${y(v[5]).toFixed(1)} H590`);
      at(O.ibre, 'transform', `translate(0 ${yb(v[5]).toFixed(1)})`);
      at(O.ibreW, 'y', Math.min(yb(v[5]) - 5, yb(0.3) - 4)); // Pasteur bandının altına inerse etiket bandın üstünde kalsın
    };

    const sec = (k) => {
      if (tahmin && k !== 'deniz') {
        bekle = { yeni: k, eski: bekle ? bekle.eski : sen }; sen = k; O.soru._cev = false;
        yaz(O.geri, ''); O.geri.className = 'f19-geri';
        kok.querySelectorAll('[data-cev]').forEach((b) => { b.disabled = false; b.className = 'btn ghost f19-kucuk'; });
        durum(); return;
      }
      bekle = null; if (O.soru) O.soru._cev = false;
      sen = k; if (k === 'deniz') agir = false;
      uygula();
    };
    const cevap = (i) => {
      if (!bekle) return;
      const dogru = SEN[bekle.yeni].ilk;
      kok.querySelectorAll('[data-cev]').forEach((b) => { b.disabled = true; const j = +b.dataset.cev; b.className = 'btn ghost f19-kucuk' + (j === dogru ? ' dogru' : j === i ? ' yanlis' : ''); });
      O.geri.className = 'f19-geri ' + (i === dogru ? 'iyi' : 'kotu');
      yaz(O.geri, i === dogru ? 'Doğru.' : `Değil: ilk bozulan basamak ${BAS[dogru].toLocaleLowerCase('tr')}.`);
      O.soru._cev = true; bekle = null;
      uygula();
    };

    el.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-sen],[data-a="agir"],[data-cev]');
      if (!b || !el.contains(b)) return;
      if (b.dataset.sen) sec(b.dataset.sen);
      else if (b.dataset.cev !== undefined) cevap(+b.dataset.cev);
      else if (b.dataset.a === 'agir') { if (sen === 'deniz') return; agir = !agir; if (bekle) durum(); else uygula(); }
    });
    el.addEventListener('change', (ev) => {
      const c = ev.target.closest('[data-a="tahmin"]'); if (!c) return;
      tahmin = c.checked;
      if (!tahmin && bekle) { bekle = null; uygula(); } else { if (!tahmin && O.soru) O.soru._cev = false; durum(); }
    });

    const roStop = duyarli(el, kur);
    fontSonra(() => hapOlc(kok && kok.querySelector('svg')));
    const stop = ticker(el, (dt) => {
      T += dt;
      let deg = false;
      for (let i = 0; i < 6; i++) {
        if (cur[i] === to[i]) continue;
        const f = clamp((T - st[i]) / 0.35, 0, 1);
        cur[i] = f >= 1 ? to[i] : lerp(from[i], to[i], ease(f)); deg = true;
      }
      if (deg) kare();
    });
    return () => { stop(); roStop(); };
  };

  /* 5 · YENİ (okur-sade 2026-11-22): toplam basınçtan O₂'nin payı · tarif docs/tasarim/fiz19.md §5 */
  VIZ.f19_pay = (el) => {
    const ATM = atm(PB_DENIZ), KAR = karina(PB_DENIZ), ALV = pao2(PB_DENIZ, PACO2), CIK = PACO2 / R, KURU = PB_DENIZ - PSVP;
    const NOT = {
      '': 'Bir değişkene dokunun: şemadaki ve denklemdeki yeri vurgulanır. [[K1 s. 80]]',
      fio2: 'FiO₂ denklemde çarpandır: O₂\'nin toplam basınçtaki payını belirler. [[K1 s. 80]]',
      pb: 'PB toplam basınçtır: düşerse (yüksek irtifa) bütün O₂ payları küçülür ve kaskadın başlangıç noktası düşer. [[K1 s. 80–81]]',
      va: 'Alveoler ventilasyon denkleme PaCO₂ üzerinden girer: hipoventilasyonda PaCO₂ artar, çıkarılan PaCO₂/R büyür ve PAO₂ düşer. [[K1 s. 80–81]]',
    };
    const DUG = [['fio2', 'FiO₂'], ['pb', 'PB'], ['va', 'V̇A (PaCO₂ üzerinden)']];
    const ARIA = "Üç yatay çubuk: atmosferde, karinada ve alveolde toplam basınçtan O₂'nin payı; 21,2, 19,9 ve 13,3 kPa";
    let vurgu = '', dar = false, kok = null;

    /* hesap satırı parçaları: vurgulanabilen değişkenler ayrı tspan */
    const v = (k, s) => `<tspan class="f19-pv f19-pv-${k}">${s}</tspan>`;
    const svp = (fs) => `P<tspan font-size="${fs}" dy="3">SVP</tspan><tspan dy="-3"> su</tspan>`;
    const FI = v('fio2', 'FiO₂'), YZ = v('fio2', '%20,93'), PBt = v('pb', 'PB'), PBs = v('pb', '101,325');
    const PCR = v('va', 'PaCO₂/R'), PCRs = v('va', '5,3/0,8');
    const HES = (fs) => [
      [`PO₂ = ${PBt} × ${FI}`, `= ${PBs} × ${YZ} = 21,2 kPa`],
      [`PO₂ = (${PBt} − ${svp(fs)}) × ${FI}`, `= (${PBs} − 6,3) × ${YZ} = 19,9 kPa`],
      [`PAO₂ = ${FI} × (${PBt} − ${svp(fs)}) − ${PCR}`, `= 19,9 − ${PCRs} = 13,3 kPa`],
    ];
    const defs = `<defs><pattern id="f19-su" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" style="stroke:var(--warn)" stroke-width="1.2" stroke-opacity="0.5"/></pattern></defs>`;
    /* tek dilim: dikdörtgen + ipucu + isteğe bağlı orta yazı */
    const dilim = (x0, x1, y, h, cls, tip, yazi = '', ycls = 'f19-pay-dv') =>
      `<g><title>${tip}</title><rect class="${cls}" x="${x0.toFixed(1)}" y="${y}" width="${(x1 - x0).toFixed(1)}" height="${h}" rx="4"/>` +
      (yazi ? `<text class="${ycls}" x="${((x0 + x1) / 2).toFixed(1)}" y="${y + h / 2 + 4.5}" text-anchor="middle">${yazi}</text>` : '') + '</g>';
    const su = (x0, x1, y, h, yazi) => `<g><title>Su buharı 6,3 kPa (37 °C)</title><rect class="f19-pay-su" x="${x0.toFixed(1)}" y="${y}" width="${(x1 - x0).toFixed(1)}" height="${h}" rx="4"/><rect class="f19-pay-tar" x="${x0.toFixed(1)}" y="${y}" width="${(x1 - x0).toFixed(1)}" height="${h}" rx="4" fill="url(#f19-su)"/>` +
      (yazi ? `<text class="f19-pay-dv f19-pay-dv-k" x="${((x0 + x1) / 2).toFixed(1)}" y="${y + h / 2 + 4.5}" text-anchor="middle">${yazi}</text>` : '') + '</g>';
    const dis = (x0, x1, y, h) => `<rect class="f19-pay-dis" x="${x0}" y="${y}" width="${x1 - x0}" height="${h}" rx="4"/>`;
    const kiskac = (x0, x1, y, yon, cls = '') => `<path class="f19-pay-kis ${cls}" d="M${x0.toFixed(1)} ${y + yon}V${y}H${x1.toFixed(1)}V${y + yon}"/>`;
    const lejant = (pts) => {
      const O = [
        ['<rect class="f19-pay-o2" width="12" height="12" rx="2"/>', 'O₂'],
        ['<rect class="f19-pay-su" width="12" height="12" rx="2"/><rect class="f19-pay-tar" width="12" height="12" rx="2" fill="url(#f19-su)"/>', 'su buharı'],
        ['<rect class="f19-pay-hay" width="12" height="12" rx="2"/>', 'çıkarılan PaCO₂/R'],
        ['<rect class="f19-pay-dig" width="12" height="12" rx="2"/>', 'diğer gazlar'],
      ];
      return `<g class="f19-pay-lej">${O.map(([s, t], i) => `<g transform="translate(${pts[i][0]} ${pts[i][1]})">${s}<text class="f19-pay-lt" x="18" y="10.5">${t}</text></g>`).join('')}</g>`;
    };

    const svgW = () => {
      const s = 580 / PB_DENIZ, X = (p) => 150 + p * s;
      const xs = X(PSVP), xa = X(ATM), xk = X(PSVP + KAR), xl = X(PSVP + ALV), h = 32, H = HES(9);
      const hes = (y, i) => `<text class="f19-pay-hes" x="150" y="${y}">${H[i][0]} ${H[i][1]}</text>`;
      /* lejant: öğe genişliği yazıya göre, aralar 24 */
      const lw = [12 + 6 + 14, 12 + 6 + 52, 12 + 6 + 98, 12 + 6 + 70];
      let lx = 150; const lp = lw.map((w) => { const p = [lx, 284]; lx += w + 24; return p; });
      return `<svg class="f19-svg" viewBox="0 0 760 310" role="img" aria-label="${ARIA}">${defs}
        <line class="f19-pay-kil" x1="${xk.toFixed(1)}" y1="128" x2="${xk.toFixed(1)}" y2="182"/>
        ${kiskac(150, 730, 20, 6)}
        <text class="f19-pay-kt f19-pay-kis-t" x="440" y="14" text-anchor="middle">PB = 101,325 kPa (toplam basınç)</text>

        <text class="f19-pay-ad" x="10" y="42">Atmosfer</text><text class="f19-pay-alt" x="10" y="56">kuru hava</text>
        ${dilim(150, xa, 28, h, 'f19-pay-o2', 'O₂ 21,2 kPa (%20,93 × 101,325)', 'O₂ 21,2')}
        ${dilim(xa, 730, 28, h, 'f19-pay-dig', 'Diğer gazlar (kuru hava)', 'diğer gazlar (kuru)', 'f19-pay-dt')}
        ${dis(150, 730, 28, h)}
        ${hes(80, 0)}

        <text class="f19-pay-ad" x="10" y="110">Trakea · karina</text><text class="f19-pay-alt" x="10" y="124">37 °C, tam doymuş</text>
        ${hap(12, 141, '−1,3 · nemlendirme', { an: 'start' })}
        ${su(150, xs, 96, h, '6,3')}
        ${dilim(xs, xk, 96, h, 'f19-pay-o2', `O₂ 19,9 kPa (%20,93 × ${fmt(KURU)})`, 'O₂ 19,9')}
        ${dilim(xk, 730, 96, h, 'f19-pay-dig', 'Diğer kuru gazlar', 'diğer kuru gazlar', 'f19-pay-dt')}
        ${dis(150, 730, 96, h)}
        <text class="f19-pay-sut" x="150" y="146">su buharı</text>
        ${kiskac(xs, 730, 134, -5, 'f19-pay-kuru')}
        <text class="f19-pay-kt" x="458" y="146" text-anchor="middle">kuru gaz 101,325 − 6,3 = ${fmt(KURU)} kPa · %20,93'ü O₂</text>
        ${hes(166, 1)}

        <text class="f19-pay-ad" x="10" y="196">Alveol</text><text class="f19-pay-alt" x="10" y="210">gaz denklemi</text>
        ${hap(12, 227, '−6,6 · AGE', { an: 'start' })}
        ${su(150, xs, 182, h, '6,3')}
        ${dilim(xs, xl, 182, h, 'f19-pay-o2', 'O₂ 13,3 kPa', 'O₂ 13,3')}
        ${dilim(xl, xk, 182, h, 'f19-pay-hay', `Çıkarılan terim PaCO₂/R = 5,3/0,8 = ${fmt(CIK)} kPa`, '−6,6', 'f19-pay-dv f19-pay-dv-k f19-pay-cik')}
        ${dilim(xk, 730, 182, h, 'f19-pay-bos', 'Öbür alveoler gazlar çizilmedi', 'öbür alveoler gazlar çizilmedi', 'f19-pay-dt f19-pay-dt-k')}
        ${dis(150, 730, 182, h)}
        <text class="f19-pay-kt f19-pay-cik-t" x="${((xl + xk) / 2).toFixed(1)}" y="228" text-anchor="middle">PaCO₂/R = ${PCRs}</text>
        ${hes(252, 2)}
        ${lejant(lp)}
      </svg>`;
    };

    const svgD = () => {
      const s = 340 / PB_DENIZ, X = (p) => 10 + p * s;
      const xs = X(PSVP), xa = X(ATM), xk = X(PSVP + KAR), xl = X(PSVP + ALV), h = 28, H = HES(12);
      const hes = (y, i) => `<text class="f19-pay-hes" x="10" y="${y}">${H[i][0]}</text><text class="f19-pay-hes" x="10" y="${y + 17}">${H[i][1]}</text>`;
      return `<svg class="f19-svg" viewBox="0 0 360 486" role="img" aria-label="${ARIA}">${defs}
        <text class="f19-pay-ad" x="10" y="16">Atmosfer · kuru hava</text>
        ${kiskac(10, 350, 31, 5)}
        <text class="f19-pay-kt f19-pay-kis-t" x="350" y="25" text-anchor="end">PB 101,325 kPa</text>
        ${dilim(10, xa, 38, h, 'f19-pay-o2', 'O₂ 21,2 kPa (%20,93 × 101,325)', '21,2')}
        ${dilim(xa, 350, 38, h, 'f19-pay-dig', 'Diğer gazlar (kuru hava)', 'diğer gazlar', 'f19-pay-dt')}
        ${dis(10, 350, 38, h)}
        ${hes(88, 0)}

        <text class="f19-pay-ad" x="10" y="136">Trakea · karina (37 °C, tam doymuş)</text>
        ${su(10, xs, 146, h, '')}
        ${dilim(xs, xk, 146, h, 'f19-pay-o2', `O₂ 19,9 kPa (%20,93 × ${fmt(KURU)})`, '19,9')}
        ${dilim(xk, 350, 146, h, 'f19-pay-dig', 'Diğer kuru gazlar', 'diğer kuru gazlar', 'f19-pay-dt')}
        ${dis(10, 350, 146, h)}
        ${kiskac(xs, 350, 181, -5, 'f19-pay-kuru')}
        <text class="f19-pay-sut" x="10" y="196">H₂O 6,3</text>
        <text class="f19-pay-kt" x="350" y="196" text-anchor="end">kuru gaz ${fmt(KURU)} kPa · %20,93'ü O₂</text>
        ${hes(224, 1)}
        ${hap(12, 264, '−1,3 · nemlendirme', { an: 'start' })}

        <text class="f19-pay-ad" x="10" y="298">Alveol · alveoler gaz denklemi</text>
        ${su(10, xs, 306, h, '')}
        ${dilim(xs, xl, 306, h, 'f19-pay-o2', 'O₂ 13,3 kPa', '13,3')}
        ${dilim(xl, xk, 306, h, 'f19-pay-hay', `Çıkarılan terim PaCO₂/R = 5,3/0,8 = ${fmt(CIK)} kPa`)}
        ${dilim(xk, 350, 306, h, 'f19-pay-bos', 'Öbür alveoler gazlar çizilmedi', 'çizilmedi', 'f19-pay-dt f19-pay-dt-k')}
        ${dis(10, 350, 306, h)}
        <text class="f19-pay-kt f19-pay-cik-t" x="${((xl + xk) / 2).toFixed(1)}" y="351" text-anchor="middle">−6,6 = PaCO₂/R</text>
        ${hes(376, 2)}
        ${hap(12, 416, '−6,6 · AGE', { an: 'start' })}
        ${lejant([[10, 446], [180, 446], [10, 468], [180, 468]])}
      </svg>`;
    };

    const durum = () => {
      if (!kok) return;
      kok.dataset.vurgu = vurgu;
      kok.querySelectorAll('[data-pv]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.pv === vurgu)));
      const n = kok.querySelector('.f19-pay-not');
      if (n) n.innerHTML = REF(NOT[vurgu]);
    };
    const kur = (d) => {
      dar = d;
      el.innerHTML = `<div class="f19-pay${dar ? ' f19-dar' : ''}">
        <div class="f19-sahne">${dar ? svgD() : svgW()}</div>
        <div class="f19-pay-alt-k">
          <p class="f19-pay-bas">PAO₂'yi belirleyen üç değişken</p>
          <div class="btn-row" role="group" aria-label="PAO₂'yi belirleyen üç değişken">
            ${DUG.map(([k, t]) => `<button type="button" class="btn ghost f19-tog" data-pv="${k}" aria-pressed="false">${t}</button>`).join('')}
          </div>
          <p class="f19-pay-not" aria-live="polite"></p>
        </div>
      </div>`;
      kok = el.firstElementChild;
      hapOlc(kok.querySelector('svg'));
      durum();
    };
    const tik = (ev) => {
      const b = ev.target.closest('[data-pv]');
      if (!b || !el.contains(b)) return;
      vurgu = vurgu === b.dataset.pv ? '' : b.dataset.pv;
      durum();
    };
    el.addEventListener('click', tik);
    const roStop = duyarli(el, kur);
    fontSonra(() => hapOlc(kok && kok.querySelector('svg')));
    return () => { el.removeEventListener('click', tik); roStop(); };
  };
})();
