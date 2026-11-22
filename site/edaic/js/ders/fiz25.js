/* Fizyoloji Bölüm 25 · Ventilatuvar yetmezlik · bileşenler (K1 s. 104–105). Tarif: docs/tasarim/fiz25.md
   1 f25_harita    kan gazı haritası: alveoler gaz denklemi, A–a gradyanı, tip 1 / tip 2, FiO₂ (K1 s. 77–79, 104)
   2 f25_koruk     körük ve gaz değişimi: PaCO₂ geri bildirim döngüsü, arıza yerleri (K1 s. 104)
   3 f25_yuzeyel   miyastenik kriz: aynı V̇E ile yüzeyel hızlı solunum, ölü boşluk payı, PaCO₂ (K1 s. 45–47, 105)
   4 f25_hiperinf  hiperinflasyon: kubbe, Laplace, uzunluk–kuvvet, ön–arka çap (K1 s. 51–52, 83, 105)
   5 f25_pepi      intrinsik PEEP, eşik yükü ve NIV (K1 s. 90, 105)
   6 f25_secim     kronik hiperkapni: istemli hiperventilasyon denemesi, merkezin seçimi (K1 s. 104–105; durağan şema)
   Modeller şematiktir; sayfadaki viz-foot notları bunu söyler. Hesaplar tam duyarlıkla yapılır, gösterirken yuvarlanır. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;

  /* ---------- ortak ---------- */
  const DAR = 560; // bileşen bu genişliğin altındaysa telefon yerleşimi
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2);
  const fmt = (v, d = 1) => {
    const m = Math.pow(10, d);
    let s = (Math.round(v * m) / m).toFixed(d);
    if (/^-0(\.0+)?$/.test(s)) s = s.slice(1);
    return s.replace('.', ',').replace('-', '−');
  };
  const n0 = (v) => fmt(v, 0);
  const fmtK = (v) => (Math.abs(v - Math.round(v)) < 0.05 ? fmt(v, 0) : fmt(v, 1)); // tam sayıysa ondalıksız
  const r1 = (v) => Math.round(v * 10) / 10;
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  /* açıklama yazıcı: null → sayfadaki varsayılan metin; ek → sona eklenen cümle */
  const capYazici = (el) => {
    const v = el.closest('.viz'), cap = v && v.querySelector('.viz-cap');
    const ilk = cap ? cap.innerHTML : '';
    let son = null;
    return (h, ek) => {
      const html = (h == null ? ilk : REF(h)) + (ek ? ' ' + REF(ek) : '');
      if (cap && html !== son) { cap.innerHTML = html; son = html; }
    };
  };
  const genislikIzle = (el, cb) => {
    if (!('ResizeObserver' in window)) return () => {};
    let son = el.clientWidth < DAR;
    const ro = new ResizeObserver(() => { const d = el.clientWidth < DAR; if (d !== son) { son = d; cb(); } });
    ro.observe(el);
    return () => ro.disconnect();
  };
  const T = (x, y, cls, s, a, ek = '') => `<text x="${r1(x)}" y="${r1(y)}" class="${cls}"${a ? ` text-anchor="${a}"` : ''}${ek}>${s}</text>`;
  const Ln = (x1, y1, x2, y2, cls, ek = '') => `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" class="${cls}"${ek}/>`;
  const Rc = (x, y, w, h, cls, ek = '') => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" class="${cls}"${ek}/>`;
  const at = (e, o) => { if (e) for (const k in o) e.setAttribute(k, typeof o[k] === 'number' ? r1(o[k]) : o[k]); };
  const gor = (e, on) => { if (e) e.style.display = on ? '' : 'none'; };
  const svgAc = (W, H, cls, etiket, ic) => `<svg class="f25-svg ${cls}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${etiket}">${ic}</svg>`;
  const okMarker = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="8.6" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 1 L9 5 L0 9 z" class="${cls}"/></marker>`;
  const tarama = (id, zc, cc, w = 6) => `<pattern id="${id}" patternUnits="userSpaceOnUse" width="${w}" height="${w}" patternTransform="rotate(45)"><rect width="${w}" height="${w}" class="${zc}"/><line x1="1.5" y1="0" x2="1.5" y2="${w}" class="${cc}"/></pattern>`;
  const VA = (k = 'A') => `<tspan class="f25-govde">V̇<tspan baseline-shift="sub" font-size="70%">${k}</tspan></tspan>`;
  /* sayısal geçiş (300 ms); RM'de anında */
  const tween = (ciz, sure = 300) => {
    let raf = 0, cur = null;
    const f = (hedef, aninda) => {
      cancelAnimationFrame(raf);
      if (RM || !cur || aninda) { cur = { ...hedef }; ciz(cur); return; }
      const bas = { ...cur }, t0 = performance.now();
      const adim = (t) => {
        const k = ease(Math.min(1, (t - t0) / sure));
        for (const key in hedef) cur[key] = lerp(bas[key], hedef[key], k);
        ciz(cur);
        if (k < 1) raf = requestAnimationFrame(adim);
      };
      raf = requestAnimationFrame(adim);
    };
    f.dur = () => cancelAnimationFrame(raf);
    return f;
  };

  /* ---------- 1 · Kan gazı haritası: tip 1, tip 2 ve oksijenin etkisi ---------- */
  VIZ.f25_harita = (el) => {
    const capY = capYazici(el);
    const PBH = 101.325 - 6.3; // P_B − PH₂O = 95,025 kPa; R 0,8 (K1 s. 77)
    const FI = { '0.21': 0.2093, '0.30': 0.3, '0.40': 0.4 };
    const FI_ET = { '0.21': '0,21', '0.30': '0,30', '0.40': '0,40' };
    const FI_F = { '0.21': '0,2093', '0.30': '0,30', '0.40': '0,40' };
    const FSIRA = ['0.21', '0.30', '0.40'];
    const ORN = {
      normal: { ad: 'Normal', fi: '0.21', pc: 5.3, aa: 1, cap: null },
      opioid: { ad: 'Opioid aşırı dozu', fi: '0.21', pc: 9, aa: 1, cap: "<b>Opioid aşırı dozu (kitabın örneği).</b> Solunum merkezi baskılanır, V̇<sub>A</sub> düşer ve PaCO₂ 9 kPa'ya çıkar. Oda havasında alveoler gaz denklemi PAO₂'yi 8,6 kPa verir: hipoksemi yalnız hipoventilasyondan doğar, A–a gradyanı normaldir. [[K1 s. 78]]" },
      opo2: { ad: 'Opioid + O₂ (FiO₂ 0,30)', fi: '0.30', pc: 9, aa: 1, cap: "<b>Aynı hasta, FiO₂ 0,30.</b> PaCO₂ hâlâ 9 kPa, yani ventilasyon yetersizliği sürüyor; ama PAO₂ 17,3 kPa'ya çıktığı için PaO₂ 8 kPa'nın çok üstündedir. Ek oksijen hipoventilasyonu düzeltmez, gizler (aşağıdaki Atlas notu). [[K1 s. 77–79]]" },
      pnom: { ad: 'Pnömoni', fi: '0.21', pc: 4.5, aa: 7, cap: "<b>Pnömoni.</b> V̇/Q̇ uyumsuzluğu A–a gradyanını büyütür: PAO₂ yüksek olsa da PaO₂ 8 kPa'nın altına iner. Bu örnekte PaCO₂ düşüktür: tip 1 solunum yetmezliği, yani gaz değişim sisteminin yetersizliği. [[K1 s. 78, 104]]" },
      mg: { ad: 'Miyastenik kriz + aspirasyon', fi: '0.21', pc: 8, aa: 4, cap: "<b>Miyastenik kriz ve aspirasyon.</b> Hipoventilasyon PaCO₂'yi yükseltir ve PAO₂'yi düşürür; aspirasyonun eklediği V̇/Q̇ uyumsuzluğu A–a gradyanını da büyütür. İki mekanizma toplanır ve PaO₂ belirgin düşer: tip 2 yetmezlik. [[K1 s. 78, 105]]" },
    };
    const SIRA = ['normal', 'opioid', 'opo2', 'pnom', 'mg'];
    const BOL = {
      A: { ad: ['Yetmezlik yok'], adD: ['Yetmezlik yok'], ust: 'Kan gazına göre yetmezlik yok', cum: 'Kan gazına göre solunum yetmezliği yok.' },
      B: { ad: ['Tip 1'], adD: ['Tip 1'], ust: 'Tip 1 · oksijenasyon yetmezliği', cum: "PaO₂ 8 kPa'nın altında, PaCO₂ yükselmemiş: tip 1 solunum yetmezliği." },
      C: { ad: ['Tip 2'], adD: ['Tip 2'], ust: 'Tip 2 · ventilatuvar yetmezlik', cum: "PaO₂ 8 kPa'nın altında ve PaCO₂ 6 kPa'nın üstünde: tip 2 solunum yetmezliği." },
      D: { ad: ['Hiperkapni,', 'PaO₂ ≥ 8 kPa'], adD: ['Gizli', 'hipoventilasyon'], ust: 'PaCO₂ yüksek, PaO₂ ≥ 8 kPa · hipoventilasyon gizli', cum: "PaCO₂ 6 kPa'nın üstünde ama PaO₂ 8 kPa'nın üstünde: alveoler ventilasyon yetersiz, PaO₂ yetmezlik eşiğinin üstünde; oksijen alan hastada hipoventilasyon böyle gizlenir." },
    };
    const LW = { W: 520, H: 400, x0: 64, x1: 500, y0: 350, y1: 24, xt: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], yt: [0, 5, 10, 15, 20, 25, 30, 35], dar: false };
    const LN = { W: 360, H: 380, x0: 44, x1: 348, y0: 340, y1: 20, xt: [3, 6, 9, 12], yt: [0, 15, 25, 35], dar: true };
    const s = { orn: 'normal', fi: '0.21', pc: 5.3, aa: 1 };
    let L = null;
    const E = { ln: {}, lt: {} };

    el.innerHTML = `<div class="f25-ctl">
        <div class="f25-segk"><span>Örnek</span>${segHtml('Örnek', 'orn', SIRA.map((k) => [k, ORN[k].ad]), s.orn)}</div>
        <div class="f25-segk"><span>FiO₂</span>${segHtml('FiO₂', 'fi', FSIRA.map((k) => [k, FI_ET[k]]), s.fi)}</div>
      </div>
      <div class="f25-rngs">
        <label class="f25-rng"><span>PaCO₂ <b data-o="pc"></b></span><input type="range" min="3" max="12" step="0.1" value="5.3" aria-label="PaCO₂, kPa" data-r="pc"></label>
        <label class="f25-rng"><span>A–a gradyanı <b data-o="aa"></b></span><input type="range" min="0.5" max="10" step="0.5" value="1" aria-label="A–a gradyanı, kPa" data-r="aa"></label>
      </div>
      <div class="f25-h-izgara"><div class="f25-h-graf"></div>
        <div class="f25-h-yan"><div class="f25-formul" role="group" aria-label="Alveoler gaz denklemi"></div><div class="f25-okuma f25-h-oku"></div><div class="f25-sinif"></div></div>
      </div>`;
    const graf = el.querySelector('.f25-h-graf'), formul = el.querySelector('.f25-formul'), oku = el.querySelector('.f25-h-oku'), sinif = el.querySelector('.f25-sinif');
    const rPC = el.querySelector('[data-r="pc"]'), rAA = el.querySelector('[data-r="aa"]');
    const oPC = el.querySelector('[data-o="pc"]'), oAA = el.querySelector('[data-o="aa"]');

    const hesap = () => {
      const pio = FI[s.fi] * PBH, pA = pio - s.pc / 0.8, paHam = pA - s.aa, pa = Math.max(0, paHam);
      const paR = Math.round(pa * 10) / 10;
      const b = paR >= 8 ? (s.pc <= 6 ? 'A' : 'D') : (s.pc <= 6 ? 'B' : 'C');
      return { pio, pA, pa, paHam, paR, b };
    };

    const ciz = (D) => {
      if (!L) return;
      const X = L.X, Y = L.Y;
      FSIRA.forEach((k) => {
        const f = FI[k] * PBH - D.aa;
        at(E.ln[k], { x1: X(3), y1: Y(f - 3 / 0.8), x2: X(12), y2: Y(f - 12 / 0.8) });
        E.ln[k].classList.toggle('on', k === s.fi);
        let cL = 12;
        if (f - 12 / 0.8 < 1.5) cL = (f - 1.5) * 0.8;
        const lt = E.lt[k];
        if (cL < 4.4 || (L.dar && k !== s.fi)) gor(lt, false);
        else { gor(lt, true); at(lt, { x: Math.min(X(cL), L.x1 - 2), y: Y(f - cL / 0.8) - 6 }); lt.classList.toggle('on', k === s.fi); }
      });
      const pA = D.fiv * PBH - D.pc / 0.8, pa = Math.max(0, pA - D.aa);
      const x = X(D.pc), yA = Y(pA), ya = Y(pa);
      at(E.pA, { cx: x, cy: yA });
      at(E.pAT, { x, y: yA - 11 });
      if (ya - yA > 26) { gor(E.ok, true); at(E.ok, { x1: x, y1: yA + 8, x2: x, y2: ya - 10 }); } else gor(E.ok, false);
      const solda = x - L.x0 > 74;
      at(E.okT, { x: solda ? x - 16 : x + 16, y: ya - yA > 26 ? (yA + ya) / 2 + 4 : ya + 15, 'text-anchor': solda ? 'end' : 'start' });
      at(E.nok, { cx: x, cy: ya });
    };
    const tw = tween(ciz);

    const kur = () => {
      const dar = el.clientWidth < DAR;
      L = { ...(dar ? LN : LW) };
      el.classList.toggle('f25-dar', dar);
      L.X = (c) => L.x0 + ((c - 3) / 9) * (L.x1 - L.x0);
      L.Y = (p) => L.y0 - (p / 35) * (L.y0 - L.y1);
      const X = L.X, Y = L.Y, x6 = X(6), y8 = Y(8);
      let h = `<defs><clipPath id="f25-harita-clip"><rect x="${L.x0}" y="${L.y1}" width="${L.x1 - L.x0}" height="${L.y0 - L.y1}"/></clipPath>${okMarker('f25-harita-ok', 'f25-mk-clin')}</defs>`;
      h += Rc(L.x0, L.y1, x6 - L.x0, y8 - L.y1, 'f25-hz f25-hz-A');
      h += Rc(L.x0, y8, x6 - L.x0, L.y0 - y8, 'f25-hz f25-hz-B');
      h += Rc(x6, y8, L.x1 - x6, L.y0 - y8, 'f25-hz f25-hz-C');
      h += Rc(x6, L.y1, L.x1 - x6, y8 - L.y1, 'f25-hz f25-hz-D');
      L.xt.forEach((c) => { h += Ln(X(c), L.y1, X(c), L.y0, 'f25-izg'); });
      L.yt.forEach((p) => { h += Ln(L.x0, Y(p), L.x1, Y(p), 'f25-izg'); });
      h += Ln(L.x0, L.y0, L.x1, L.y0, 'f25-eks') + Ln(L.x0, L.y1, L.x0, L.y0, 'f25-eks');
      L.xt.forEach((c) => { h += Ln(X(c), L.y0, X(c), L.y0 + 4, 'f25-eks') + T(X(c), L.y0 + 17, 'f25-tk', c, 'middle'); });
      L.yt.forEach((p) => { h += Ln(L.x0 - 4, Y(p), L.x0, Y(p), 'f25-eks') + T(L.x0 - 7, Y(p) + 4, 'f25-tk', p, 'end'); });
      h += Ln(L.x0 - 7, y8, L.x0, y8, 'f25-eks8') + T(L.x0 - 9, y8 + 4, 'f25-tk f25-tk8', 8, 'end');
      h += T((L.x0 + L.x1) / 2, L.y0 + 36, 'f25-ax', 'PaCO₂ (kPa)', 'middle');
      h += `<text class="f25-ax" text-anchor="middle" transform="translate(${dar ? 12 : 16} ${(L.y0 + L.y1) / 2}) rotate(-90)">PaO₂ (kPa)</text>`;
      // eşikler
      h += Ln(L.x0, y8, L.x1, y8, 'f25-esik') + Ln(x6, L.y1, x6, L.y0, 'f25-esik');
      h += T(L.x0 + 6, y8 - 6, 'f25-lb f25-halo', 'PaO₂ 8,0 kPa') + T(x6 + 6, L.y1 + 14, 'f25-lb f25-halo', 'PaCO₂ 6,0 kPa');
      // bölge adları
      const ad = (k) => (dar ? BOL[k].adD : BOL[k].ad);
      h += T(L.x0 + 8, L.y1 + 32, 'f25-zad f25-zt-A f25-halo', ad('A')[0]);
      h += T(L.x0 + 8, L.y0 - 10, 'f25-zad f25-zt-B f25-halo', ad('B')[0]);
      h += T(L.x1 - 8, L.y0 - 10, 'f25-zad f25-zt-C f25-halo', ad('C')[0], 'end');
      h += `<text class="f25-zad f25-zt-D f25-halo" text-anchor="end"><tspan x="${L.x1 - 8}" y="${L.y1 + 32}">${ad('D')[0]}</tspan><tspan x="${L.x1 - 8}" y="${L.y1 + 47}">${ad('D')[1]}</tspan></text>`;
      // hipoventilasyon çizgileri
      h += `<g clip-path="url(#f25-harita-clip)">${FSIRA.map((k) => `<line class="f25-h-ln" data-ln="${k}"/>`).join('')}</g>`;
      h += FSIRA.map((k) => `<text class="f25-h-lt f25-halo" data-lt="${k}" text-anchor="end">${k === s.fi || true ? '' : ''}</text>`).join('');
      h += `<line class="f25-h-ok" marker-start="url(#f25-harita-ok)" marker-end="url(#f25-harita-ok)"/>`;
      h += `<circle class="f25-h-pA" r="6"/><text class="f25-lb f25-halo" data-pat text-anchor="middle">PAO₂</text>`;
      h += `<text class="f25-h-okT f25-halo"></text><circle class="f25-h-nok" r="8"/>`;
      graf.innerHTML = svgAc(L.W, L.H, '', 'PaO₂–PaCO₂ düzleminde tip 1 ve tip 2 solunum yetmezliği bölgeleri, hipoventilasyon çizgisi ve hastanın konumu', h);
      FSIRA.forEach((k) => { E.ln[k] = graf.querySelector(`[data-ln="${k}"]`); E.lt[k] = graf.querySelector(`[data-lt="${k}"]`); });
      E.pA = graf.querySelector('.f25-h-pA'); E.pAT = graf.querySelector('[data-pat]');
      E.ok = graf.querySelector('.f25-h-ok'); E.okT = graf.querySelector('.f25-h-okT'); E.nok = graf.querySelector('.f25-h-nok');
      guncelle(true);
    };

    const guncelle = (aninda) => {
      const H = hesap();
      oPC.textContent = fmt(s.pc) + ' kPa';
      oAA.textContent = fmt(s.aa) + ' kPa';
      basSec(el, 'orn', s.orn);
      basSec(el, 'fi', s.fi);
      const sinir = H.paHam < 0;
      formul.innerHTML = [
        'PAO₂ = FiO₂ × (P<sub>B</sub> − PH₂O) − PaCO₂ / R',
        `     = ${FI_F[s.fi]} × (101,3 − 6,3) − ${fmt(s.pc)} / 0,8`,
        `     = ${fmt(H.pio, 2)} − ${fmt(s.pc / 0.8, 2)} = ${fmt(H.pA)} kPa`,
        `PaO₂ = PAO₂ − A–a = ${fmt(H.pA)} − ${fmt(s.aa)} = ${sinir ? '0 (model sınırı)' : fmt(H.pa) + ' kPa'}`,
      ].map((t) => `<div>${t}</div>`).join('');
      const aaArt = s.aa >= 1.5;
      oku.innerHTML = `<div><span>PAO₂</span><b>${fmt(H.pA)} kPa</b></div>
        <div class="${aaArt ? 'basic' : ''}"><span>A–a gradyanı</span><b>${fmt(s.aa)} kPa · ${aaArt ? 'artmış' : 'normal'}</b></div>
        <div class="${H.paR < 8 ? 'crit' : ''}"><span>PaO₂</span><b>${fmt(H.pa)} kPa</b></div>
        <div class="${s.pc > 6 ? 'crit' : ''}"><span>PaCO₂</span><b>${fmt(s.pc)} kPa</b></div>`;
      const aaSatir = !aaArt ? 'A–a normal: gaz değişimi sağlam (saf hipoventilasyon ya da normal)' : s.pc <= 6 ? 'A–a artmış: gaz değişim sistemi sorunu' : 'A–a artmış ve PaCO₂ yüksek: hipoventilasyon + gaz değişim sorunu';
      sinif.className = 'f25-sinif f25-z-' + H.b;
      sinif.innerHTML = `<b>${BOL[H.b].ust}</b><span>${aaSatir}</span>`;
      if (E.nok) E.nok.setAttribute('class', 'f25-h-nok f25-z-' + H.b);
      if (E.okT) E.okT.textContent = 'A–a ' + fmt(s.aa);
      FSIRA.forEach((k) => { if (E.lt[k]) E.lt[k].textContent = k === s.fi ? 'FiO₂ ' + FI_ET[k] : FI_ET[k]; });
      if (s.orn) capY(ORN[s.orn].cap);
      else {
        let c = `<b>Seçilen değerler.</b> FiO₂ ${FI_ET[s.fi]}, PaCO₂ ${fmt(s.pc)} kPa: PAO₂ ${fmt(H.pA)} kPa, A–a ${fmt(s.aa)} kPa ile PaO₂ ${sinir ? '0' : fmt(H.pa)} kPa. ${BOL[H.b].cum} `;
        c += aaArt ? 'A–a gradyanı artmış: V̇/Q̇ uyumsuzluğu, şant ya da ağır difüzyon bozukluğu gibi bir gaz değişim sorunu var.' : 'A–a gradyanı normal: hipoksemi varsa nedeni hipoventilasyondur.';
        if (sinir) c += " (Model sınırı: A–a gradyanı PAO₂'yi aşamaz; PaO₂ 0'da tutuldu.)";
        capY(c + ' [[K1 s. 77–78, 104]]');
      }
      tw({ fiv: FI[s.fi], pc: s.pc, aa: s.aa }, aninda);
    };

    const onClick = (e) => {
      const o = e.target.closest('[data-orn]'), f = e.target.closest('[data-fi]');
      if (o) {
        const O = ORN[o.dataset.orn];
        Object.assign(s, { orn: o.dataset.orn, fi: O.fi, pc: O.pc, aa: O.aa });
        rPC.value = O.pc; rAA.value = O.aa;
        guncelle();
      } else if (f) { s.fi = f.dataset.fi; s.orn = null; guncelle(); }
    };
    const onInput = (e) => {
      if (e.target === rPC) s.pc = Math.round(parseFloat(rPC.value) * 10) / 10;
      else if (e.target === rAA) s.aa = Math.round(parseFloat(rAA.value) * 10) / 10;
      else return;
      s.orn = null;
      guncelle();
    };
    el.addEventListener('click', onClick);
    el.addEventListener('input', onInput);
    kur();
    const izle = genislikIzle(el, kur);
    return () => { tw.dur(); izle(); el.removeEventListener('click', onClick); el.removeEventListener('input', onInput); };
  };

  /* ---------- 2 · Körük ve gaz değişimi: arıza nerede? ---------- */
  VIZ.f25_koruk = (el) => {
    const capY = capYazici(el);
    const G_MER = 'Solunum merkezi uygun yanıt vermiyor', G_GD = 'Göğüs duvarı hareketinde sorun', KG_T2 = 'PaCO₂ ↑, PaO₂ ↓, A–a normal → tip 2';
    const DUR = {
      normal: { ad: 'Normal', dug: null, durt: 0.4, il: 1, pc: 5.3, pa: 12.3, grup: '—', kg: 'PaCO₂ ve PaO₂ normal', tip: 0, cap: null },
      opioid: { ad: 'Opioid / genel anestezi', dug: 'N2', roz: 'baskılanmış', durt: 0.15, il: 1, pc: 9, pa: 7.6, grup: G_MER, kg: KG_T2, tip: 2,
        cap: "<b>Opioid ya da genel anestezi.</b> Solunum merkezi baskılanır: PaCO₂ yükselse de merkezin kaslara gönderdiği uyarı azdır. V̇<sub>A</sub> düşer, PaCO₂ 6 kPa'nın üzerine çıkar; hipoventilasyon PAO₂'yi de düşürür. Opioidler ve anestezik ajanlar CO₂ yanıt eğrisini sağa kaydırır. [[K1 s. 104]] [[K1 s. 96]]" },
      refleks: { ad: 'Refleks duyarsızlaşma', dug: 'N2', roz: 'yüksek PaCO₂ kabul', durt: 0.3, il: 1, pc: 9, pa: 7.6, grup: G_MER, kg: 'PaCO₂ ↑ (kronik), PaO₂ ↓ → tip 2', tip: 2,
        cap: '<b>Refleks duyarsızlaşma.</b> Döngü yapısal olarak sağlamdır, ama solunum merkezi yüksek PaCO₂\'yi kabullenir: normal PaCO₂ için gereken ventilasyon solunum kaslarını yoracağından merkez hipoventilasyonu "seçer". Kronik hiperkapnik KOAH\'ta görülür (aşağıda). [[K1 s. 104–105]]' },
      yelken: { ad: 'Yelken göğüs', dug: 'N5', roz: 'mekanik', durt: 0.9, il: 0.3, pc: 9, pa: 7.6, grup: G_GD, kg: KG_T2, tip: 2,
        cap: '<b>Yelken göğüs: mekanik sorun.</b> Solunum merkezinin dürtüsü yüksektir, sinirler ve kaslar çalışır; ama göğüs duvarı hareketi bozuk olduğu için kas kasılması yeterli hacim değişikliğine dönüşmez. V̇<sub>A</sub> düşer, PaCO₂ yükselir. [[K1 s. 104]]' },
      gbs: { ad: 'Guillain–Barré', dug: 'N3', roz: 'nöropatik', durt: 0.9, il: 0.3, pc: 9, pa: 7.6, grup: G_GD, kg: KG_T2, tip: 2,
        cap: '<b>Guillain–Barré sendromu: nöropatik sorun.</b> Merkezin uyarısı solunum kaslarına iletilemez. Merkez ve kaslar sağlam olsa da göğüs duvarı yeterince hareket etmez; V̇<sub>A</sub> düşer, PaCO₂ yükselir. [[K1 s. 104]]' },
      miyo: { ad: 'Miyopati', dug: 'N4', roz: 'kas kaynaklı', durt: 0.9, il: 0.3, pc: 9, pa: 7.6, grup: G_GD, kg: KG_T2, tip: 2,
        cap: '<b>Miyopati: kas kaynaklı sorun.</b> Uyarı kaslara ulaşır ama hastalıklı kas yeterli kuvvet üretemez; göğüs duvarı yeterince hareket etmez ve PaCO₂ yükselir. [[K1 s. 104]]' },
      yorg: { ad: 'Kas yorgunluğu', dug: 'N4', roz: 'ATP yetmiyor', yorg: true, durt: [0.4, 1], il: [1, 0.3], pc: [5.3, 9], pa: [12.3, 7.6], grup: 'Solunum kası yorgunluğu', kg: 'PaCO₂ giderek ↑, PaO₂ ↓ → tip 2', tip: 2,
        cap: "<b>Solunum kası yorgunluğu.</b> Dürtü ve göğüs duvarı sağlamdır; kaslar başta yanıt verir, ama kasılmanın gerektirdiği ATP'yi sentezleyemedikçe güçleri azalır. Merkez dürtüyü artırsa da V̇<sub>A</sub> düşer ve PaCO₂ giderek yükselir. Solunum işi akciğer hastalığında bazal metabolizma hızının %30'una çıkabilir. [[K1 s. 104]] [[K1 s. 88]]" },
      gaz: { ad: 'Alveol–kapiller ünite (ör. pnömoni)', dug: 'G1', roz: '<tspan class="f25-govde">V̇/Q̇</tspan> uyumsuzluğu', durt: 0.6, il: 1, pc: 4.5, pa: 7.3, grup: 'Gaz değişim sisteminin yetersizliği', kg: 'PaCO₂ normal/düşük, PaO₂ ↓, A–a artmış → tip 1', tip: 1,
        cap: '<b>Gaz değişim sisteminin yetersizliği.</b> Körük sağlamdır ve V̇<sub>A</sub> yeterlidir: PaCO₂ normal ya da düşüktür. Bozulan oksijenasyondur: V̇/Q̇ uyumsuzluğu (ör. pnömoni) A–a gradyanını büyütür ve PaO₂ 8 kPa\'nın altına iner: tip 1 solunum yetmezliği. [[K1 s. 104]] [[K1 s. 78]]' },
    };
    const KSIRA = ['normal', 'opioid', 'refleks', 'yelken', 'gbs', 'miyo', 'yorg'];
    const YER = { N2: 'Solunum merkezi', N3: 'Sinirler', N4: 'Solunum kasları', N5: 'Göğüs duvarı ve plevra', G1: 'Alveol–kapiller üniteler' };
    const NS = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7'];
    const BAS = { N1: ['Kemoreseptörler', 'periferik + merkezi'], N2: ['Solunum merkezi', 'medulla oblongata'], N3: ['Sinirler'], N4: ['Solunum kasları'], N5: ['Göğüs duvarı', 've plevra'], N6: ['Hava yolları'], N7: ['Alveoler', `ventilasyon (${VA()})`] };
    const LW = {
      W: 760, H: 440, dar: false, nw: 140, nh: 56, fs: 14, fss: 11.5,
      bolK: [10, 10, 500, 420], bolG: [530, 10, 220, 420], tK: [26, 34], tG: [546, 34],
      n: { N1: [360, 56], N2: [195, 56], N3: [30, 56], N4: [30, 172], N5: [30, 290], N6: [195, 290], N7: [360, 290] },
      P: [360, 150, 140, 100],
      ok: [[360, 84, 335, 84], [195, 84, 170, 84], [100, 112, 100, 172], [100, 228, 100, 290], [170, 318, 195, 318], [335, 318, 360, 318], [430, 290, 430, 250], [430, 150, 430, 112]],
      eksi: [430, 270], eksiT: [414, 266],
      yol: [[430, 84], [265, 84], [100, 84], [100, 200], [100, 318], [265, 318], [430, 318], [430, 200], [430, 84]], yolN: [0, 1, 2, 3, 4, 5, 6],
      durt: [200, 188, 130], durtT: [265, 177],
      gPC: { x: 370, y: 190, w: 120, min: 3, max: 11, esik: 6, ticks: [4, 6, 8, 10], tx: 430, ty: 168, ety: 185, tly: 222, sy: 241, ad: 'PaCO₂ (kPa)' },
      gPA: { x: 570, y: 98, w: 140, min: 4, max: 14, esik: 8, ticks: [4, 6, 8, 10, 12], tx: 640, ty: 76, ety: 93, tly: 128, sy: 150, ad: 'PaO₂ (kPa)' },
      G0: [548, 56, 184, 110], G2: [548, 196, 184, 56], G1: [548, 282, 184, 72],
      kan: [640, 252, 640, 282], kanT: [648, 266, 'start'], g1g0: 'M732 318 H742 V181 H700 V167', o2: [500, 318, 548, 318], o2T: [524, 310],
      ikon: [706, 312], g1T: [620, 312, 330], pil: [148, 182, 12, 24], pilT: [154, 221], n4x: 58,
    };
    const LN = {
      W: 360, H: 770, dar: true, nw: 140, nh: 50, fs: 13.5, fss: 12,
      bolK: [8, 8, 344, 504], bolG: [8, 524, 344, 238], tK: [20, 30], tG: [20, 544],
      n: { N1: [200, 44], N2: [200, 110], N3: [200, 176], N4: [200, 242], N5: [200, 308], N6: [200, 374], N7: [200, 440] },
      P: [20, 230, 160, 100],
      ok: [[270, 94, 270, 110], [270, 160, 270, 176], [270, 226, 270, 242], [270, 292, 270, 308], [270, 358, 270, 374], [270, 424, 270, 440], 'M200 465 H100 V330', 'M100 230 V69 H200'],
      eksi: [100, 398], eksiT: null,
      yol: [[270, 69], [270, 135], [270, 201], [270, 267], [270, 333], [270, 399], [270, 465], [100, 465], [100, 280], [100, 69], [270, 69]], yolN: [0, 1, 2, 3, 4, 5, 6],
      durt: null,
      gPC: { x: 35, y: 270, w: 130, min: 3, max: 11, esik: 6, ticks: [4, 6, 8, 10], tx: 100, ty: 250, ety: 265, tly: 300, sy: 320, ad: 'PaCO₂ (kPa)' },
      gPA: { x: 40, y: 690, w: 280, min: 4, max: 14, esik: 8, ticks: [4, 6, 8, 10, 12], tx: 180, ty: 670, ety: 685, tly: 720, sy: 739, ad: 'PaO₂ (kPa)' },
      G0: [20, 650, 320, 96], G2: [20, 563, 136, 50], G1: [182, 560, 158, 62],
      kan: [156, 588, 182, 588], kanT: [169, 580, 'middle'], g1g0: 'M261 622 V650', o2: [270, 490, 270, 560], o2T: [278, 530],
      ikon: [318, 586], g1T: [241, 586, 604], pil: [318, 249, 11, 22], pilT: [323.5, 285], n4x: 260,
    };
    let sec = 'normal', L = null, tY = 0, dD = 0.4, dPC = 5.3, dPA = 12.3, acc = 0, em = 0;
    let noktalar = [], yol = null;
    const E = {};

    el.innerHTML = `<div class="f25-ctl f25-k-ctl">
        <div class="f25-segk"><span>Körük arızası</span>${segHtml('Körük arızası', 'dur', KSIRA.map((k) => [k, DUR[k].ad]), sec)}</div>
        <div class="f25-segk"><span>Gaz değişimi arızası</span>${segHtml('Gaz değişimi arızası', 'dur', [['gaz', DUR.gaz.ad]], sec)}</div>
        <button type="button" class="btn ghost f25-k-yeniden" hidden>Yeniden oynat</button>
      </div>
      <div class="f25-k-sahne"></div>
      <dl class="kv f25-k-oku">
        <dt class="f25-k-ddt">Solunum dürtüsü</dt><dd class="f25-k-ddd"><span>düşük</span><i><s></s></i><span>yüksek</span></dd>
        <dt>Arıza yeri</dt><dd data-o="yer"></dd>
        <dt>Kitaptaki grup</dt><dd data-o="grup"></dd>
        <dt>Kan gazı</dt><dd data-o="kg"></dd>
      </dl>`;
    const sahne = el.querySelector('.f25-k-sahne'), yenB = el.querySelector('.f25-k-yeniden');
    const oYer = el.querySelector('[data-o="yer"]'), oGrup = el.querySelector('[data-o="grup"]'), oKg = el.querySelector('[data-o="kg"]');
    const dHtml = el.querySelector('.f25-k-ddd s');
    if (RM) yenB.remove();

    const hedef = () => {
      const S = DUR[sec];
      if (!S.yorg) return { durt: S.durt, il: S.il, pc: S.pc, pa: S.pa, pil: 1 };
      const f = clamp(tY / 8, 0, 1);
      return { durt: lerp(S.durt[0], S.durt[1], f), il: lerp(S.il[0], S.il[1], f), pc: lerp(S.pc[0], S.pc[1], f), pa: lerp(S.pa[0], S.pa[1], f), pil: 1 - 0.8 * f };
    };
    const gosterge = (g, key) => {
      const X = (v) => g.x + ((v - g.min) / (g.max - g.min)) * g.w;
      let h = T(g.tx, g.ty, 'f25-k-gt', g.ad, 'middle');
      h += Rc(g.x, g.y, g.w, 14, 'f25-k-trk', ' rx="4"') + Rc(g.x, g.y, 0, 14, 'f25-k-fl', ` rx="4" data-g="${key}"`);
      g.ticks.forEach((v) => {
        if (v === g.esik) h += Ln(X(v), g.y - 4, X(v), g.y + 20, 'f25-k-te') + T(X(v), g.ety, 'f25-k-tek', v, 'middle');
        else h += Ln(X(v), g.y + 14, X(v), g.y + 19, 'f25-eks') + T(X(v), g.tly, 'f25-tk', v, 'middle');
      });
      h += T(g.tx, g.sy, 'f25-k-dur', '', 'middle', ` data-gs="${key}"`);
      return h;
    };
    const kur = () => {
      const dar = el.clientWidth < DAR;
      L = dar ? LN : LW;
      el.classList.toggle('f25-dar', dar);
      const { nw, nh } = L;
      let h = `<defs>${okMarker('f25-koruk-ok', 'f25-mk-clin')}${okMarker('f25-koruk-okb', 'f25-mk-basic')}${okMarker('f25-koruk-oko', 'f25-mk-ok')}${tarama('f25-koruk-tarama', 'f25-tz-crit', 'f25-tc-crit', 5)}<linearGradient id="f25-koruk-o2g" gradientUnits="userSpaceOnUse" x1="${L.o2[0]}" y1="${L.o2[1]}" x2="${L.o2[2]}" y2="${L.o2[3]}"><stop offset="0" class="f25-k-st"/><stop offset="1" class="f25-k-st" stop-opacity="0.06"/></linearGradient></defs>`;
      h += Rc(...L.bolK, 'f25-k-bol', ' rx="16"') + Rc(...L.bolG, 'f25-k-bol', ' rx="16"');
      h += T(L.tK[0], L.tK[1], 'f25-k-bt f25-k-bt-c', 'KÖRÜK SİSTEMİ · VENTİLASYON') + T(L.tG[0], L.tG[1], 'f25-k-bt f25-k-bt-b', 'GAZ DEĞİŞİMİ · OKSİJENASYON');
      // döngü okları
      L.ok.forEach((o, i) => {
        h += typeof o === 'string' ? `<path d="${o}" class="f25-k-ok" data-ok="${i}" marker-end="url(#f25-koruk-ok)"/>` : Ln(o[0], o[1], o[2], o[3], 'f25-k-ok', ` data-ok="${i}" marker-end="url(#f25-koruk-ok)"`);
      });
      // impuls noktaları: kutuların altında; oklar boyunca görünür, düğümün içinden geçer
      h += '<g class="f25-k-noklar"></g>';
      // düğüm kutuları
      NS.forEach((k) => { const [x, y] = L.n[k]; h += Rc(x, y, nw, nh, 'f25-k-n', ` rx="10" data-nr="${k}"`); });
      h += Rc(...L.P, 'f25-k-g', ' rx="10"');
      [['G0', L.G0], ['G2', L.G2], ['G1', L.G1]].forEach(([k, r]) => { h += Rc(...r, 'f25-k-gn', ` rx="10" data-nr="${k}"`); });
      // gaz değişim okları
      h += Ln(...L.kan, 'f25-k-okb', ' marker-end="url(#f25-koruk-okb)"') + T(L.kanT[0], L.kanT[1], 'f25-k-kc', 'kan', L.kanT[2]);
      h += `<path d="${L.g1g0}" class="f25-k-okb" marker-end="url(#f25-koruk-okb)"/>`;
      h += Ln(...L.o2, 'f25-k-o2', ' marker-end="url(#f25-koruk-oko)"') + T(L.o2T[0], L.o2T[1], 'f25-k-o2t', 'O₂', L.dar ? 'start' : 'middle');
      // düğüm yazıları
      NS.forEach((k) => {
        const [x, y] = L.n[k], b = BAS[k], cx = x + nw / 2, iki = k === 'N7';
        let t;
        if (iki) t = T(cx, y + (L.dar ? 21 : 24), 'f25-k-nt', b[0], 'middle') + T(cx, y + (L.dar ? 38 : 43), 'f25-k-nt', b[1], 'middle');
        else if (b[1]) t = T(cx, y + (L.dar ? 21 : 24), 'f25-k-nt', b[0], 'middle') + T(cx, y + (L.dar ? 38 : 42), 'f25-k-ns', b[1], 'middle');
        else t = T(cx, y + nh / 2 + 5, 'f25-k-nt', b[0], 'middle', k === 'N4' ? ' data-n4t' : '');
        h += `<g data-nt="${k}">${t}</g>`;
      });
      h += T(L.G2[0] + L.G2[2] / 2, L.G2[1] + L.G2[3] / 2 + 5, 'f25-k-nt', 'Pulmoner dolaşım', 'middle');
      h += T(L.g1T[0], L.g1T[1], 'f25-k-nt', 'Alveol–kapiller', 'middle') + T(L.g1T[0], L.g1T[2], 'f25-k-nt', 'üniteler', 'middle');
      const [ix, iy] = L.ikon;
      h += `<circle cx="${ix}" cy="${iy}" r="12" class="f25-k-alv"/><path d="M${ix - 17} ${iy + 15} Q${ix} ${iy + 28} ${ix + 17} ${iy + 15}" class="f25-k-kap"/>`;
      // göstergeler
      h += gosterge(L.gPC, 'pc') + gosterge(L.gPA, 'pa');
      if (L.durt) {
        const [dx, dy, dw] = L.durt;
        h += T(L.durtT[0], L.durtT[1], 'f25-k-gt f25-k-gtm', 'Solunum dürtüsü', 'middle');
        h += Rc(dx, dy, dw, 12, 'f25-k-trk', ' rx="6"') + Rc(dx, dy, 0, 12, 'f25-k-dfl', ' rx="6" data-durt');
        h += T(dx, dy + 28, 'f25-k-kc', 'düşük', 'start') + T(dx + dw, dy + 28, 'f25-k-kc', 'yüksek', 'end');
      }
      // negatif geri bildirim işareti
      const [ex, ey] = L.eksi;
      h += `<circle cx="${ex}" cy="${ey}" r="10" class="f25-k-eksi"/>` + Ln(ex - 5, ey, ex + 5, ey, 'f25-k-eksic');
      if (L.eksiT) h += `<text class="f25-k-kc" text-anchor="end"><tspan x="${L.eksiT[0]}" y="${L.eksiT[1]}">alveoler ventilasyon ↑</tspan><tspan x="${L.eksiT[0]}" y="${L.eksiT[1] + 13}">PaCO₂ ↓</tspan></text>`;
      // pil (yorgunluk)
      const [px, py, pw, ph] = L.pil;
      h += `<g class="f25-k-pil">${Rc(px + pw / 2 - 3, py - 3, 6, 3, 'f25-k-pilb', ' rx="1"')}${Rc(px, py, pw, ph, 'f25-k-pilg', ' rx="2"')}${Rc(px + 2, py + 2, pw - 4, ph - 4, 'f25-k-pild', ' data-pil')}${T(L.pilT[0], L.pilT[1], 'f25-k-pilt', 'ATP', 'middle')}</g>`;
      h += '<g class="f25-k-rozet"></g>';
      sahne.innerHTML = svgAc(L.W, L.H, '', 'Solunum sistemi şeması: körük sistemindeki PaCO₂ geri bildirim döngüsü ve gaz değişim sistemi; seçilen arızanın yeri işaretli', h);
      E.svg = sahne.querySelector('svg');
      E.nok = sahne.querySelector('.f25-k-noklar');
      E.nr = {}; E.nt = {};
      sahne.querySelectorAll('[data-nr]').forEach((r) => { E.nr[r.dataset.nr] = r; });
      sahne.querySelectorAll('[data-nt]').forEach((r) => { E.nt[r.dataset.nt] = r; });
      E.ok = [...sahne.querySelectorAll('[data-ok]')];
      E.fl = { pc: sahne.querySelector('[data-g="pc"]'), pa: sahne.querySelector('[data-g="pa"]') };
      E.gs = { pc: sahne.querySelector('[data-gs="pc"]'), pa: sahne.querySelector('[data-gs="pa"]') };
      E.durt = sahne.querySelector('[data-durt]');
      E.pil = sahne.querySelector('.f25-k-pil'); E.pild = sahne.querySelector('[data-pil]');
      E.n4t = sahne.querySelector('[data-n4t]');
      E.rozet = sahne.querySelector('.f25-k-rozet');
      E.o2 = sahne.querySelector('.f25-k-o2'); E.alv = sahne.querySelector('.f25-k-alv');
      // nokta yolu
      const pts = L.yol, cum = [0];
      for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      yol = { pts, cum, top: cum[cum.length - 1], sN: L.yolN.map((i) => cum[i]) };
      noktalar = [];
      uygula();
      ciz();
    };
    const yolNokta = (s) => {
      const { pts, cum } = yol;
      let i = 1;
      while (i < cum.length - 1 && cum[i] < s) i++;
      const f = clamp((s - cum[i - 1]) / (cum[i] - cum[i - 1] || 1), 0, 1);
      return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)];
    };
    const uygula = () => {
      const S = DUR[sec];
      basSec(el, 'dur', sec);
      if (!RM) yenB.hidden = !S.yorg;
      // arıza işareti
      Object.keys(E.nr).forEach((k) => E.nr[k].classList.toggle('ariza', k === S.dug));
      E.pil.style.display = S.yorg ? '' : 'none';
      if (E.n4t) at(E.n4t, { x: S.yorg ? L.n.N4[0] + L.n4x - (L.dar ? 200 : 0) : L.n.N4[0] + L.nw / 2 });
      const gaz = sec === 'gaz';
      E.alv.classList.toggle('ariza', gaz);
      E.o2.classList.toggle('sonuk', gaz);
      E.o2.setAttribute('marker-end', gaz ? '' : 'url(#f25-koruk-oko)');
      E.rozet.innerHTML = '';
      if (S.dug) {
        const r = S.dug[0] === 'G' ? L[S.dug] : [...L.n[S.dug], L.nw, L.nh];
        const fs = L.dar ? 12 : 11;
        E.rozet.innerHTML = `<rect class="f25-k-rz" rx="10" height="20"/><text class="f25-k-rzt" style="font-size:${fs}px" text-anchor="middle">× ${S.roz}</text>`;
        const tx = E.rozet.querySelector('text'), rc = E.rozet.querySelector('rect');
        let w = 0;
        try { w = tx.getComputedTextLength(); } catch (e) { w = 0; }
        if (!w) w = S.roz.replace(/<[^>]+>/g, '').length * fs * 0.58 + 10;
        const bw = w + 16, x2 = r[0] + r[2] + 4, x1 = x2 - bw, y1 = r[1] - 11;
        at(rc, { x: x1, y: y1, width: bw });
        at(tx, { x: x1 + bw / 2, y: y1 + 14 });
      }
      oYer.textContent = S.dug ? YER[S.dug] : 'yok';
      oGrup.textContent = S.grup;
      oKg.textContent = S.kg;
      oKg.className = S.tip === 2 ? 'f25-crit' : S.tip === 1 ? 'f25-basic' : '';
      capY(S.cap);
      if (RM) { tY = 8; const hd = hedef(); dD = hd.durt; dPC = hd.pc; dPA = hd.pa; }
    };
    const ciz = () => {
      const hd = hedef(), S = DUR[sec];
      const g1 = L.gPC, g2 = L.gPA;
      at(E.fl.pc, { width: clamp((dPC - g1.min) / (g1.max - g1.min), 0, 1) * g1.w });
      E.fl.pc.classList.toggle('yuksek', dPC > 6);
      at(E.fl.pa, { width: clamp((dPA - g2.min) / (g2.max - g2.min), 0, 1) * g2.w });
      E.fl.pa.classList.toggle('yuksek', dPA < 8);
      E.gs.pc.textContent = dPC > 6 ? 'hiperkapni' : 'normal';
      E.gs.pc.classList.toggle('kotu', dPC > 6);
      E.gs.pa.textContent = dPA < 8 ? 'hipoksemi' : dPA < 10.5 ? 'düşük' : 'normal';
      E.gs.pa.classList.toggle('kotu', dPA < 8);
      if (E.durt) at(E.durt, { width: dD * L.durt[2] });
      dHtml.style.width = (dD * 100).toFixed(1) + '%';
      // arızadan sonraki düğümler soluklaşır
      const fi = S.dug && S.dug[0] === 'N' ? NS.indexOf(S.dug) : -1;
      const op = 1 - (0.6 * (1 - hd.il)) / 0.7;
      NS.forEach((k, i) => {
        const o = fi >= 0 && i > fi ? op : 1;
        E.nr[k].style.opacity = o.toFixed(2); E.nt[k].style.opacity = o.toFixed(2);
      });
      E.ok.forEach((o, i) => { o.style.opacity = (fi >= 0 && i >= fi && i < 6 ? op : 1).toFixed(2); });
      if (S.yorg) {
        at(E.pild, { height: (L.pil[3] - 4) * hd.pil, y: L.pil[1] + 2 + (L.pil[3] - 4) * (1 - hd.pil) });
        E.pild.setAttribute('class', 'f25-k-pild ' + (hd.pil > 0.6 ? 'ok' : hd.pil > 0.35 ? 'warn' : 'crit'));
      }
    };
    const adim = (dt) => {
      const S = DUR[sec];
      if (S.yorg) tY = Math.min(8, tY + dt);
      const hd = hedef();
      dD += (hd.durt - dD) * (1 - Math.exp(-dt / 0.13));
      dPC += (hd.pc - dPC) * (1 - Math.exp(-dt / 1.2));
      dPA += (hd.pa - dPA) * (1 - Math.exp(-dt / 1.2));
      // impuls noktaları: N1'den çıkar, arıza düğümünde iletim oranı kadarı devam eder
      em += dt * (0.5 + 2.5 * dD);
      while (em >= 1) {
        em -= 1;
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('r', '4'); c.setAttribute('class', 'f25-k-imp');
        E.nok.appendChild(c);
        noktalar.push({ s: 0, el: c, karar: false, son: -1 });
      }
      const fi = S.dug && S.dug[0] === 'N' ? NS.indexOf(S.dug) : -1, sF = fi >= 0 ? yol.sN[fi] : Infinity;
      noktalar = noktalar.filter((n) => {
        if (n.son >= 0) {
          n.son += dt;
          if (n.son >= 0.2) { n.el.remove(); return false; }
          n.el.style.opacity = (1 - n.son / 0.2).toFixed(2);
          return true;
        }
        n.s += 120 * dt;
        if (!n.karar && n.s >= sF) {
          n.karar = true;
          acc += hd.il;
          if (acc >= 0.999) acc -= 1;
          else { n.s = sF; n.son = 0; }
        }
        if (n.s >= yol.top) { n.el.remove(); return false; }
        const [x, y] = yolNokta(n.s);
        n.el.setAttribute('cx', r1(x)); n.el.setAttribute('cy', r1(y));
        return true;
      });
      ciz();
    };
    const sec_ = (k) => {
      sec = k; tY = 0; acc = 0;
      if (DUR[k].yorg && !RM) { dPC = 5.3; dPA = 12.3; }
      uygula(); ciz();
    };
    const onClick = (e) => {
      const b = e.target.closest('[data-dur]');
      if (b) { sec_(b.dataset.dur); return; }
      if (e.target.closest('.f25-k-yeniden')) sec_('yorg');
    };
    el.addEventListener('click', onClick);
    kur();
    const durT = RM ? () => {} : ticker(el, adim);
    const izle = genislikIzle(el, kur);
    return () => { durT(); izle(); el.removeEventListener('click', onClick); };
  };

  /* ---------- 3 · Yüzeyel ve hızlı solunum ---------- */
  VIZ.f25_yuzeyel = (el) => {
    const capY = capYazici(el);
    const VE = 7500, VD = 150; // mL/dk, mL (K1 s. 45, 47)
    const hesap = (rr) => { const vt = VE / rr, vdm = VD * rr, va = VE - vdm; return { vt, vdm, va, oran: (VD / vt) * 100, pc: 23 / (va / 1000) }; };
    const CAP2 = "<b>Hasta 2: miyastenik krizdeki soluk düzeni.</b> V<sub>T</sub> 250 mL × 30/dk: V̇<sub>E</sub> yine 7,5 L/dk, ama her soluğun 150 mL'si ölü boşlukta kaldığı için V̇<sub>A</sub> 3,0 L/dk'ya, yani Hasta 1'inkinin yaklaşık %57'sine iner ve PaCO₂ yükselir: tip 2 tablosu. [[K1 s. 47, 105]]";
    const PN_EK = 'Öksürük ve sekresyon temizliği zayıf olduğu için eşlik eden pnömoni ya da aspirasyon V̇/Q̇ uyumsuzluğu ekler: hiperkapniye hipoksemi de eklenir. [[K1 s. 105]]';
    const SW = { W: 640, H: 210, x0: 40, x1: 620, yb: 180, min: 0 };
    const SN = { W: 360, H: 200, x0: 20, x1: 340, yb: 175, min: 5 };
    const K = 0.26; // px/mL
    let rr = 15, pn = false, L = null, tc = 0;
    const E = {};
    el.innerHTML = `<div class="f25-ctl">
        <div class="f25-segk"><span>Hazır durumlar</span>${segHtml('Hazır durumlar', 'hz', [['15', 'Hasta 1 · 500 mL × 15/dk'], ['30', 'Hasta 2 · 250 mL × 30/dk']], '15')}</div>
        <button type="button" class="btn ghost f25-y-pn" aria-pressed="false">+ Pnömoni / aspirasyon</button>
      </div>
      <label class="f25-rng f25-y-rng"><span>Solunum sayısı (dakika ventilasyonu 7,5 L/dk sabit) <b data-o="rr"></b></span><input type="range" min="15" max="36" step="1" value="15" aria-label="Solunum sayısı, dakikada"></label>
      <div class="f25-y-serit"></div>
      <p class="f25-y-tnot" hidden>tarama: pnömonili/aspire edilmiş bölgeler (şematik)</p>
      <div class="f25-y-izgara">
        <div class="f25-y-sol">
          <div class="f25-y-bas">Dakikada: 7,5 L</div>
          <div class="f25-y-yigin" aria-hidden="true"><span class="d"></span><span class="a"></span></div>
          <div class="f25-y-yet"><span class="d"></span><span class="a"></span></div>
          <div class="f25-okuma f25-y-oku"></div>
        </div>
        <div class="f25-y-sag"></div>
      </div>
      <div class="f25-y-zincir"><p class="f25-zn f25-zn-warn" hidden></p><p class="f25-zn f25-zn-crit" hidden></p></div>`;
    const serit = el.querySelector('.f25-y-serit'), sag = el.querySelector('.f25-y-sag'), rng = el.querySelector('input[type=range]');
    const oRR = el.querySelector('[data-o="rr"]'), pnB = el.querySelector('.f25-y-pn'), tnot = el.querySelector('.f25-y-tnot');
    const yD = el.querySelector('.f25-y-yigin .d'), yA = el.querySelector('.f25-y-yigin .a');
    const yeD = el.querySelector('.f25-y-yet .d'), yeA = el.querySelector('.f25-y-yet .a'), oku = el.querySelector('.f25-y-oku');
    const zW = el.querySelector('.f25-zn-warn'), zC = el.querySelector('.f25-zn-crit');
    zW.innerHTML = REF('Küçük soluklar → mikroatelektazi → kompliyans ↓ → solunum işi ↑ [[K1 s. 105]]');
    zC.innerHTML = REF('Zayıf öksürük, sekresyon birikimi → pnömoni ya da aspirasyon → V̇/Q̇ uyumsuzluğu → hipoksemi [[K1 s. 105]]');

    /* hiperbol: x 50–340 ↔ V̇A 1–8 L/dk, y 210–20 ↔ PaCO₂ 0–14 kPa */
    const HX = (v) => 50 + ((v - 1) / 7) * 290, HY = (p) => 210 - (p / 14) * 190;
    const hiperbolKur = () => {
      let h = '';
      for (let v = 1; v <= 8; v++) h += Ln(HX(v), 20, HX(v), 210, 'f25-izg') + Ln(HX(v), 210, HX(v), 214, 'f25-eks') + T(HX(v), 227, 'f25-tk', v, 'middle');
      for (let p = 0; p <= 14; p += 2) h += Ln(50, HY(p), 340, HY(p), 'f25-izg') + Ln(46, HY(p), 50, HY(p), 'f25-eks') + T(43, HY(p) + 4, 'f25-tk', p, 'end');
      h += Ln(50, 210, 340, 210, 'f25-eks') + Ln(50, 20, 50, 210, 'f25-eks');
      h += T(195, 246, 'f25-ax', 'alveoler ventilasyon (L/dk)', 'middle');
      h += `<text class="f25-ax" text-anchor="middle" transform="translate(13 115) rotate(-90)">PaCO₂ (kPa)</text>`;
      let d = '';
      for (let v = 23 / 14; v <= 8.0001; v += 0.05) d += (d ? ' L' : 'M') + r1(HX(v)) + ' ' + r1(HY(23 / v));
      h += `<path d="${d}" class="f25-y-egri"/>`;
      h += Ln(50, HY(6), 340, HY(6), 'f25-y-esik') + T(338, HY(6) - 5, 'f25-y-esikt', '6 kPa', 'end');
      [[5.25, 'Hasta 1'], [3, 'Hasta 2']].forEach(([v, a]) => { h += `<circle cx="${r1(HX(v))}" cy="${r1(HY(23 / v))}" r="5" class="f25-y-sabit"/>` + T(HX(v) + 8, HY(23 / v) - 8, 'f25-y-hst f25-halo', a); });
      h += '<line class="f25-y-dik"/><circle r="7" class="f25-y-nok"/>';
      sag.innerHTML = svgAc(360, 250, '', 'Alveoler ventilasyon ile PaCO₂ arasındaki hiperbolik ilişki; seçilen solunum sayısındaki nokta', h);
      E.dik = sag.querySelector('.f25-y-dik'); E.nok = sag.querySelector('.f25-y-nok');
    };
    const noktaCiz = (D) => {
      const x = HX(D.va), y = HY(23 / D.va);
      at(E.nok, { cx: x, cy: y });
      at(E.dik, { x1: x, y1: y + 7, x2: x, y2: 210 });
    };
    const tw = tween(noktaCiz);

    const seritKur = () => {
      const dar = el.clientWidth < DAR;
      L = dar ? SN : SW;
      el.classList.toggle('f25-dar', dar);
      const H = hesap(rr), span = L.x1 - L.x0, adim = span / rr, bw = Math.max(0.6 * adim, L.min);
      let h = `<defs>${tarama('f25-yuzeyel-tarama', 'f25-tz-crit', 'f25-tc-crit', 5)}</defs>`;
      // gösterge
      if (dar) {
        h += Rc(20, 6, 11, 11, 'f25-y-d') + T(36, 16, 'f25-y-leg', 'ölü boşluk (her solukta ≈150 mL)');
        h += Rc(20, 23, 11, 11, 'f25-y-a') + T(36, 33, 'f25-y-leg', 'alveollere ulaşan');
        h += T(340, 33, 'f25-y-leg f25-y-legm', 'zaman ölçeği: 1 dk = 12 s', 'end');
      } else {
        h += Rc(40, 14, 12, 12, 'f25-y-d') + T(58, 24.5, 'f25-y-leg', 'ölü boşluk (her solukta ≈150 mL)');
        h += Rc(292, 14, 12, 12, 'f25-y-a') + T(310, 24.5, 'f25-y-leg', 'alveollere ulaşan');
        h += T(620, 24.5, 'f25-y-leg f25-y-legm', 'zaman ölçeği: 1 dk = 12 s', 'end');
      }
      h += '<g class="f25-y-cub">';
      for (let i = 0; i < rr; i++) {
        const cx = L.x0 + (i + 0.5) * adim, x = cx - bw / 2;
        const tar = pn && i >= rr - 3;
        h += `<g data-i="${i}" data-cx="${r1(cx)}">${Rc(x, L.yb - VD * K, bw, VD * K, 'f25-y-d')}${Rc(x, L.yb - H.vt * K, bw, (H.vt - VD) * K, tar ? 'f25-y-a f25-y-tar' : 'f25-y-a')}</g>`;
      }
      h += '</g>';
      h += Ln(L.x0, L.yb - VD * K, L.x1, L.yb - VD * K, 'f25-y-vd');
      h += Ln(L.x0, L.yb, L.x1, L.yb, 'f25-eks');
      h += T(L.x0, L.yb + 17, 'f25-tk', '0 s', 'start') + T(L.x1, L.yb + 17, 'f25-tk', '60 s', 'end') + T((L.x0 + L.x1) / 2, L.yb + 17, 'f25-tk', '1 dakika', 'middle');
      h += Ln(L.x0, L.yb - 140, L.x0, L.yb + 2, 'f25-y-imlec', ' data-imlec');
      serit.innerHTML = svgAc(L.W, L.H, '', `Bir dakikadaki ${rr} soluk: her soluğun alt 150 mL'si ölü boşlukta kalır, üst kısmı alveollere ulaşır`, h);
      E.cub = [...serit.querySelectorAll('[data-i]')].map((g) => ({ g, cx: +g.dataset.cx }));
      E.imlec = serit.querySelector('[data-imlec]');
      if (RM) E.imlec.style.display = 'none';
      seritBoya();
    };
    const seritBoya = () => {
      if (!E.cub) return;
      const xc = L.x0 + (tc / 12) * (L.x1 - L.x0);
      E.cub.forEach((c) => { c.g.style.opacity = RM || c.cx <= xc ? '1' : '0.35'; });
      if (!RM) at(E.imlec, { x1: xc, x2: xc });
    };
    const guncelle = (aninda) => {
      const H = hesap(rr);
      oRR.textContent = rr + ' /dk';
      basSec(el, 'hz', rr === 15 ? '15' : rr === 30 ? '30' : '');
      pnB.setAttribute('aria-pressed', String(pn));
      tnot.hidden = !pn;
      const pD = (H.vdm / VE) * 100;
      yD.style.width = pD.toFixed(2) + '%'; yA.style.width = (100 - pD).toFixed(2) + '%';
      yeD.textContent = `ölü boşluk ${fmt(H.vdm / 1000, 2)} L/dk`;
      yeA.textContent = `alveoler ${fmt(H.va / 1000, 2)} L/dk`;
      const ust = H.pc > 6;
      oku.innerHTML = `<div><span>Solunum sayısı</span><b>${rr} /dk</b></div>
        <div><span>Tidal hacim</span><b>${n0(H.vt)} mL</b></div>
        <div><span>Dakika ventilasyonu</span><b>7,5 L/dk <small>(sabit)</small></b></div>
        <div class="warn"><span>Ölü boşluk ventilasyonu</span><b>${fmt(H.vdm / 1000, 2)} L/dk</b></div>
        <div class="ok"><span>Alveoler ventilasyon</span><b>${fmt(H.va / 1000, 2)} L/dk</b></div>
        <div><span>Ölü boşluk / tidal hacim</span><b>%${n0(H.oran)}</b></div>
        <div class="f25-y-pco ${ust ? 'crit' : ''}"><span>PaCO₂ (model)</span><b>${fmt(H.pc)} kPa${ust ? ' <small>eşik aşıldı</small>' : ''}</b></div>`;
      zW.hidden = rr < 25;
      zC.hidden = !pn;
      E.nok && E.nok.classList.toggle('ust', ust);
      let c;
      if (rr === 15) c = null;
      else if (rr === 30) c = CAP2;
      else {
        c = `<b>Solunum sayısı ${rr}/dk, V<sub>T</sub> ${n0(H.vt)} mL.</b> Ölü boşluğun dakika ventilasyonundaki payı %${n0(H.oran)}; V̇<sub>A</sub> ${fmt(H.va / 1000, 2)} L/dk.`;
        if (ust) c += ' PaCO₂ 6 kPa eşiğini aştı.';
        if (rr >= 25) c += ' Bu kadar küçük soluklar mikroatelektaziye yol açar; kompliyans azalır ve solunum işi daha da artar.';
        c += ' [[K1 s. 47, 105]]';
      }
      capY(c, pn ? PN_EK : '');
      tw({ va: H.va / 1000 }, aninda);
    };
    const onClick = (e) => {
      const b = e.target.closest('[data-hz]');
      if (b) { rr = +b.dataset.hz; rng.value = rr; seritKur(); guncelle(); return; }
      if (e.target.closest('.f25-y-pn')) { pn = !pn; seritKur(); guncelle(); }
    };
    const onInput = (e) => { if (e.target !== rng) return; rr = +rng.value; seritKur(); guncelle(); };
    el.addEventListener('click', onClick);
    el.addEventListener('input', onInput);
    hiperbolKur();
    seritKur();
    guncelle(true);
    const durT = RM ? () => {} : ticker(el, (dt) => { tc = (tc + dt) % 12; seritBoya(); });
    const izle = genislikIzle(el, () => { seritKur(); });
    return () => { durT(); tw.dur(); izle(); el.removeEventListener('click', onClick); el.removeEventListener('input', onInput); };
  };

  /* ---------- 4 · Hiperinflasyon: diyafram neden daha çok çalışır? ---------- */
  VIZ.f25_hiperinf = (el) => {
    const capY = capYazici(el);
    const CAP2 = '<b>Hiperinflasyon artıyor.</b> Elastik doku yıkımı ve küçük hava yolu obstrüksiyonu akciğeri daha yüksek bir hacimde tutar; kubbe alçalır, eğrilik yarıçapı büyür. Laplace yasasına göre aynı basınç için daha büyük gerim gerekir. [[K1 s. 83, 105]]';
    const CAP3 = '<b>Stabil KOAH.</b> Diyafram düzleşmiştir: aynı negatif intraplevral basıncı oluşturmak için daha büyük kuvvetle kasılmalıdır, ama kısalmış lifleri daha az kuvvet üretir ve apozisyon bölgesi küçülmüştür. Göğüs kafesinin ön–arka çapı artmıştır, interkostal kaslar da optimal uzunlukta çalışmaz. Alevlenme olmadan da inspiratuvar iş artmıştır. [[K1 s. 105]]';
    const C = 125, R0 = (C * C + 80 * 80) / 160; // kiriş yarı uzunluğu, normal yarıçap 137,7
    const geo = (H) => {
      const h0 = 80 - 45 * H, z = 60 - 45 * H, r = (C * C + h0 * h0) / (2 * h0), oran = r / R0;
      const Lf = 100 - 20 * H, F = 100 * Math.exp(-Math.pow((Lf - 100) / 30, 2));
      return { h0, z, r, oran, Lf, F, efor: oran / (F / 100), e: (24 * (F / 100)) / oran, d: 100 + 30 * H, aci: 25 - 17 * H };
    };
    const Fk = (Lf) => 100 * Math.exp(-Math.pow((Lf - 100) / 30, 2));
    const BW = { H: 300, vy0: 52, vs: 24, vh: 18, yb: [60, 95, 130, 165, 200], st: [70, 220], ap: 250, apT: 270, om: 44 };
    const BN = { H: 260, vy0: 40, vs: 21, vh: 16, yb: [50, 80, 110, 140, 170], st: [58, 190], ap: 218, apT: 238, om: 32 };
    let H = 0, oyna = !RM, tb = 0, dar = false;
    const E = {};
    el.innerHTML = `<div class="f25-ctl">
        <label class="f25-rng f25-hi-rng"><span>Hiperinflasyon (şematik) <b data-o="h"></b></span><input type="range" min="0" max="100" step="1" value="0" aria-label="Hiperinflasyon derecesi"></label>
        <div class="f25-segk"><span>Hazır</span>${segHtml('Hazır durumlar', 'hz', [['0', 'Normal'], ['100', 'Stabil KOAH']], '0')}</div>
        ${RM ? '' : '<button type="button" class="btn ghost f25-hi-oyna" aria-pressed="true">❚❚ Duraklat</button>'}
      </div>
      <div class="f25-hi-ust">
        <figure class="f25-pan"><figcaption>Ön görünüm: diyafram</figcaption><div class="f25-hi-A"></div></figure>
        <figure class="f25-pan"><figcaption>Yan görünüm <span class="tag warn f25-fici" hidden>fıçı göğüs</span></figcaption><div class="f25-hi-B"></div></figure>
      </div>
      <div class="f25-hi-alt">
        <figure class="f25-pan"><figcaption>Diyafram lifi: uzunluk–kuvvet ilişkisi</figcaption><div class="f25-hi-C"></div></figure>
        <div class="f25-hi-yan">
          <div class="f25-sark"><div class="f25-sark-t">Sarkomer</div><div class="f25-hi-S"></div><div class="f25-sark-e"></div></div>
          <div class="f25-okuma f25-hi-oku"></div>
        </div>
      </div>`;
    const rng = el.querySelector('input[type=range]'), oH = el.querySelector('[data-o="h"]'), oyB = el.querySelector('.f25-hi-oyna');
    const pA = el.querySelector('.f25-hi-A'), pB = el.querySelector('.f25-hi-B'), pC = el.querySelector('.f25-hi-C'), pS = el.querySelector('.f25-hi-S');
    const fici = el.querySelector('.f25-fici'), sarkE = el.querySelector('.f25-sark-e'), oku = el.querySelector('.f25-hi-oku');

    const kurA = () => {
      let h = `<defs>${okMarker('f25-hiperinf-okc', 'f25-mk-crit')}${okMarker('f25-hiperinf-okb', 'f25-mk-basic')}</defs>`;
      h += '<path d="M92 30 L268 30 Q300 32 302 92 L305 262 L55 262 L58 92 Q60 32 92 30 Z" class="f25-hi-kafes"/>';
      h += '<path class="f25-hi-akc" data-akc="0"/><path class="f25-hi-akc" data-akc="1"/>';
      for (let i = 0; i < 5; i++) { const y = 64 + i * 37; h += `<path d="M60 ${y} Q180 ${y + 30} 300 ${y}" class="f25-hi-kab"/>`; }
      h += '<path class="f25-hi-dyf" data-dyf/>';
      h += '<line class="f25-hi-T" data-t="0" marker-end="url(#f25-hiperinf-okc)"/><line class="f25-hi-T" data-t="1" marker-end="url(#f25-hiperinf-okc)"/>';
      h += '<line class="f25-hi-P" data-p="0" marker-end="url(#f25-hiperinf-okb)"/><line class="f25-hi-P" data-p="1" marker-end="url(#f25-hiperinf-okb)"/>';
      h += '<text class="f25-hi-lb f25-hi-tt f25-halo" data-tt>T</text>';
      h += '<text class="f25-hi-lb f25-hi-pt f25-halo" data-pt text-anchor="middle">P (aynı)</text>';
      h += '<text class="f25-hi-lb f25-halo" data-kub text-anchor="middle">kubbe</text>';
      h += '<text class="f25-hi-lb f25-hi-apz f25-halo" data-apz text-anchor="end"><tspan x="296" dy="0">apozisyon</tspan><tspan x="296" dy="13">bölgesi</tspan></text>';
      h += '<text class="f25-hi-r" data-r x="352" y="292" text-anchor="end"></text>';
      if (!RM) h += '<text class="f25-hi-not" data-not x="8" y="292">aynı çabayla diyaframın inişi</text>';
      pA.innerHTML = svgAc(360, 300, '', 'Ön görünümde göğüs kafesi, akciğerler ve diyafram kubbesi; gerim ve basınç okları', h);
      ['akc', 'dyf', 'tt', 'pt', 'kub', 'apz', 'r', 'not'].forEach((k) => { E[k] = pA.querySelectorAll(`[data-${k}]`); });
      E.T = pA.querySelectorAll('[data-t]'); E.P = pA.querySelectorAll('[data-p]');
    };
    const cizA = (G, ini) => {
      const h = G.h0 - ini, yc = 262 - G.z, ay = yc - h, rr = (C * C + h * h) / (2 * h), cy = ay + rr;
      const dy = (x) => cy - Math.sqrt(Math.max(0, rr * rr - (x - 180) * (x - 180)));
      E.dyf[0].setAttribute('d', `M55 262 L55 ${r1(yc)} A${r1(rr)} ${r1(rr)} 0 0 1 305 ${r1(yc)} L305 262`);
      // akciğerler: alt sınır kubbeyi izler
      const akc = (ayna) => {
        const X = (x) => (ayna ? 360 - x : x);
        let d = `M${X(166)} 58 C${X(150)} 34 ${X(94)} 34 ${X(72)} 72 L${X(63)} 120 L${X(62)} ${r1(dy(62) - 4)}`;
        for (let x = 70; x <= 166; x += 8) d += ` L${X(x)} ${r1(dy(x) - 4)}`;
        return d + ' Z';
      };
      E.akc[0].setAttribute('d', akc(false)); E.akc[1].setAttribute('d', akc(true));
      // gerim okları: uçlara doğru, teğet
      const L = 28 * G.oran;
      [[64, -1], [296, 1]].forEach(([x, yon], i) => {
        const y = dy(x), ux = (x - 180) / rr, uy = (y - cy) / rr;
        const tx = yon < 0 ? uy : -uy, ty = yon < 0 ? -ux : ux;
        const hx = x - ux * 10, hy = y - uy * 10;
        at(E.T[i], { x1: hx - tx * L, y1: hy - ty * L, x2: hx, y2: hy });
        if (i === 0) at(E.tt[0], { x: hx - tx * L + 2, y: hy - ty * L + 18 });
      });
      [168, 192].forEach((x, i) => at(E.P[i], { x1: x, y1: ay + 46, x2: x, y2: ay + 20 }));
      at(E.pt[0], { x: 180, y: ay + 62 });
      at(E.kub[0], { x: 180, y: ay - 9 });
      const ym = (yc + 262) / 2;
      at(E.apz[0], { y: ym - 3 });
      E.apz[0].querySelector('tspan').setAttribute('y', r1(ym - 3));
      E.r[0].textContent = 'r ×' + fmt(G.oran, 2);
    };
    const kurB = () => {
      const B = dar ? BN : BW;
      let h = `<defs>${okMarker('f25-hiperinf-oki', 'f25-mk-ink')}</defs>`;
      for (let i = 0; i < 8; i++) h += Rc(168, B.vy0 + i * B.vs, 14, B.vh, 'f25-hi-omur', ' rx="4"');
      h += T(175, B.om, 'f25-hi-lbm', 'omurga', 'middle');
      h += '<g data-kab></g><g data-tar></g>';
      h += '<line class="f25-hi-st" data-st/>';
      h += '<text class="f25-hi-lbm" data-stt text-anchor="middle">sternum</text>';
      h += '<text class="f25-hi-ikt f25-halo" data-ikt text-anchor="middle">interkostal kaslar</text>';
      h += `<line class="f25-hi-ap" data-ap marker-start="url(#f25-hiperinf-oki)" marker-end="url(#f25-hiperinf-oki)"/>`;
      h += '<text class="f25-hi-lb" data-apt text-anchor="middle"></text>';
      pB.innerHTML = svgAc(220, B.H, '', 'Yan görünümde göğüs kafesi: omurga, kaburgalar, sternum ve ön–arka çap', h);
      ['kab', 'tar', 'st', 'stt', 'ikt', 'ap', 'apt'].forEach((k) => { E['b' + k] = pB.querySelector(`[data-${k}]`); });
    };
    const cizB = (G) => {
      const B = dar ? BN : BW, sx = 175 - G.d, tn = Math.tan((G.aci * Math.PI) / 180);
      const kab = (yb) => { const yf = yb + G.d * tn; return { yb, yf, c: [(168 + sx) / 2, (yb + yf) / 2 + 8] }; };
      const ks = B.yb.map(kab);
      E.bkab.innerHTML = ks.map((k) => `<path d="M168 ${k.yb} Q${r1(k.c[0])} ${r1(k.c[1])} ${r1(sx)} ${r1(k.yf)}" class="f25-hi-kb"/>`).join('');
      const nokta = (k, f) => { const u = 1 - f; return [u * u * 168 + 2 * u * f * k.c[0] + f * f * sx, u * u * k.yb + 2 * u * f * k.c[1] + f * f * k.yf]; };
      let t = '';
      for (let f = 0.08; f < 0.95; f += 0.075) { const a = nokta(ks[2], f), b = nokta(ks[3], f + 0.05); t += Ln(a[0], a[1] + 2, b[0], b[1] - 2, 'f25-hi-ik'); }
      E.btar.innerHTML = t;
      at(E.bst, { x1: sx, y1: B.st[0], x2: sx, y2: B.st[1] });
      at(E.bstt, { x: sx, y: B.st[0] - 7 });
      const m = nokta(ks[2], 0.5), m2 = nokta(ks[3], 0.5);
      at(E.bikt, { x: (m[0] + m2[0]) / 2, y: (m[1] + m2[1]) / 2 + 4 });
      at(E.bap, { x1: sx + 2, y1: B.ap, x2: 166, y2: B.ap });
      at(E.bapt, { x: (sx + 168) / 2, y: B.apT });
      E.bapt.textContent = 'ön–arka çap ×' + fmt(G.d / 100, 2);
    };
    /* uzunluk–kuvvet: x 44–340 ↔ %60–140, y 196–28 ↔ %0–100 */
    const CX = (l) => 44 + ((l - 60) / 80) * 296, CY = (f) => 196 - (f / 100) * 168;
    const kurC = () => {
      let h = '';
      [60, 80, 100, 120, 140].forEach((l) => { h += Ln(CX(l), 28, CX(l), 196, 'f25-izg') + Ln(CX(l), 196, CX(l), 200, 'f25-eks') + T(CX(l), 212, 'f25-tk', l, 'middle'); });
      [0, 25, 50, 75, 100].forEach((f) => { h += Ln(44, CY(f), 340, CY(f), 'f25-izg') + Ln(40, CY(f), 44, CY(f), 'f25-eks') + T(37, CY(f) + 4, 'f25-tk', f, 'end'); });
      h += Ln(44, 196, 340, 196, 'f25-eks') + Ln(44, 28, 44, 196, 'f25-eks');
      h += T(192, 228, 'f25-ax', 'lif uzunluğu (optimal = %100)', 'middle');
      h += `<text class="f25-ax" text-anchor="middle" transform="translate(11 112) rotate(-90)">üretilebilen kuvvet (%)</text>`;
      h += Ln(CX(100), 22, CX(100), 196, 'f25-hi-opt') + T(CX(100) + 5, 20, 'f25-hi-lbm', 'optimal');
      let d = '';
      for (let l = 60; l <= 140.001; l += 1) d += (d ? ' L' : 'M') + r1(CX(l)) + ' ' + r1(CY(Fk(l)));
      h += `<path d="${d}" class="f25-hi-egri"/>`;
      h += T(CX(74), CY(Fk(74)) + 26, 'f25-hi-lbm f25-halo', 'kısalmış', 'middle') + T(CX(126), CY(Fk(126)) + 26, 'f25-hi-lbm f25-halo', 'uzamış', 'middle');
      h += '<line class="f25-hi-iz" data-izx/><line class="f25-hi-iz" data-izy/><circle r="7" class="f25-hi-cn" data-cn/>';
      pC.innerHTML = svgAc(360, 232, '', 'Diyafram lif uzunluğu ile üretilebilen kuvvet eğrisi ve çalışma noktası', h);
      E.izx = pC.querySelector('[data-izx]'); E.izy = pC.querySelector('[data-izy]'); E.cn = pC.querySelector('[data-cn]');
      pS.innerHTML = svgAc(160, 60, 'f25-sark-svg', 'Sarkomer: Z çizgileri, miyozin ve aktin örtüşmesi', '<line class="f25-sk-z" data-z="0"/><line class="f25-sk-z" data-z="1"/><line class="f25-sk-a" data-a="0"/><line class="f25-sk-a" data-a="1"/><line class="f25-sk-a" data-a="2"/><line class="f25-sk-a" data-a="3"/><line class="f25-sk-m" data-m/>');
      E.z = pS.querySelectorAll('[data-z]'); E.a = pS.querySelectorAll('[data-a]'); E.m = pS.querySelector('[data-m]');
    };
    const cizC = (G) => {
      const x = CX(G.Lf), y = CY(G.F);
      at(E.cn, { cx: x, cy: y });
      at(E.izx, { x1: x, y1: y + 7, x2: x, y2: 196 });
      at(E.izy, { x1: 44, y1: y, x2: x - 7, y2: y });
      // sarkomer: Z–Z = 2,2 × L/100 birim, 1 birim = 40 px; miyozin 1,6, aktin 1,0
      const S = (2.2 * G.Lf) / 100, zL = 80 - S * 20, zR = 80 + S * 20;
      [zL, zR].forEach((zx, i) => at(E.z[i], { x1: zx, y1: 8, x2: zx, y2: 52 }));
      at(E.a[0], { x1: zL, y1: 20, x2: zL + 40, y2: 20 }); at(E.a[1], { x1: zL, y1: 40, x2: zL + 40, y2: 40 });
      at(E.a[2], { x1: zR, y1: 20, x2: zR - 40, y2: 20 }); at(E.a[3], { x1: zR, y1: 40, x2: zR - 40, y2: 40 });
      at(E.m, { x1: 48, y1: 30, x2: 112, y2: 30 });
      sarkE.textContent = G.Lf >= 98 ? 'ideal örtüşme' : 'örtüşme ideal değil';
      sarkE.classList.toggle('kotu', G.Lf < 98);
    };
    const guncelle = () => {
      const G = geo(H);
      oH.textContent = '%' + Math.round(H * 100);
      basSec(el, 'hz', H === 0 ? '0' : H === 1 ? '100' : '');
      fici.hidden = H <= 0.6;
      const kub = H < 0.3 ? 'kubbe biçimli' : H <= 0.7 ? 'basıklaşıyor' : 'düzleşmiş';
      oku.innerHTML = `<div><span>Kubbe</span><b>${kub}</b></div>
        <div><span>Eğrilik yarıçapı</span><b>×${fmt(G.oran, 2)}</b></div>
        <div class="${G.oran > 1.005 ? 'crit' : ''}"><span>Aynı basınç için gereken gerim</span><b>×${fmt(G.oran, 2)}</b></div>
        <div><span>Diyafram lif uzunluğu</span><b>%${n0(G.Lf)}</b></div>
        <div class="${G.F < 99.5 ? 'crit' : ''}"><span>Üretilebilen kuvvet</span><b>%${n0(G.F)}</b></div>
        <div class="f25-genis"><span>Aynı basınç için gereken çaba</span><i class="f25-bar"><s style="width:${((G.efor / 3) * 100).toFixed(1)}%"></s></i><em><span>normal</span><span>artmış</span></em></div>`;
      capY(H === 0 ? null : H <= 0.6 ? CAP2 : CAP3);
      cizA(G, oyna ? inis(G) : 0);
      cizB(G);
      cizC(G);
    };
    const inis = (G) => {
      if (!oyna) return 0;
      const t = tb % 4;
      return t < 1.6 ? (G.e * (1 - Math.cos((Math.PI * t) / 1.6))) / 2 : (G.e * (1 + Math.cos((Math.PI * (t - 1.6)) / 2.4))) / 2;
    };
    const kur = () => {
      dar = el.clientWidth < DAR;
      el.classList.toggle('f25-dar', dar);
      kurA(); kurB(); kurC();
      gor(E.not[0], oyna);
      guncelle();
    };
    const onInput = (e) => { if (e.target !== rng) return; H = +rng.value / 100; guncelle(); };
    const onClick = (e) => {
      const b = e.target.closest('[data-hz]');
      if (b) { H = +b.dataset.hz / 100; rng.value = b.dataset.hz; guncelle(); return; }
      if (oyB && e.target.closest('.f25-hi-oyna')) {
        oyna = !oyna;
        oyB.setAttribute('aria-pressed', String(oyna));
        oyB.textContent = oyna ? '❚❚ Duraklat' : '▶ Soluk';
        gor(E.not[0], oyna);
        cizA(geo(H), 0);
      }
    };
    el.addEventListener('input', onInput);
    el.addEventListener('click', onClick);
    kur();
    const durT = RM ? () => {} : ticker(el, (dt) => { if (!oyna) return; tb = (tb + dt) % 4; cizA(geo(H), inis(geo(H))); });
    const izle = genislikIzle(el, kur);
    return () => { durT(); izle(); el.removeEventListener('input', onInput); el.removeEventListener('click', onClick); };
  };

  /* ---------- 5 · İntrinsik PEEP ve noninvaziv ventilasyon ---------- */
  VIZ.f25_pepi = (el) => {
    const capY = capYazici(el);
    const PEEPI = 8, PKAP = 16, TI = 1.3, TE = 2.7;
    const ADLAR = ['Normal', 'Obstrüksiyon', 'İntrinsik PEEP', 'Eşik yükü', 'NIV'];
    const CAP = {
      2: '<b>2 · Alevlenme: dinamik hava yolu obstrüksiyonu.</b> Ekspirasyonda daralan küçük hava yolları akımı yavaşlatır; bir sonraki soluk, akciğer dinlenme hacmine dönmeden başlar. Her soluktan biraz hava kalır ve ekspirasyon sonu hacmi birkaç solukta yeni bir düzeye çıkar: dinamik hiperinflasyon. Solunumun rezistif ve elastik işi de artmıştır: kas, kapasitesinin sınırında çalışır. [[K1 s. 90, 105]]',
      3: "<b>3 · İntrinsik PEEP.</b> Ekspirasyon sonunda alveollerde kalan hava, alveoler basıncı ağız basıncının üzerinde tutar (burada 8 cmH₂O). Bu, ventilatörde ayarlanmamış, hastanın kendi oluşturduğu bir PEEP'tir: intrinsik PEEP. Gereken basınç çubuğu, 500 mL'lik bir soluk için gereken basıncın artık kas kapasitesini aştığını gösterir. [[K1 s. 105]]",
      4: "<b>4 · Eşik yükü.</b> Bir sonraki inspirasyonda akım başlayabilmesi için kasların önce alveoler basıncı ağız basıncının altına indirmesi, yani 8 cmH₂O'luk intrinsik PEEP'i aşması gerekir. Bu çaba hacim kazandırmaz ve artmış rezistif ve elastik işin üstüne eklenir; kas kapasitesi yetmez, V<sub>T</sub> 250 mL'ye düşer. V̇<sub>A</sub> azalır, PaCO₂ yükselir. [[K1 s. 105]]",
    };
    const LW = {
      dar: false,
      v: { W: 720, x0: 60, x1: 700, yb: 150, pen: 12, tY: 14, tl: 166, ax: 184 },
      p: { x0: 60, x1: 380, y0: 352, k: 10, tY: 206, ie: 405, mx: 384 },
      b: { x0: 420, x1: 700, base: 380, k: 6.5, bx: [440, 552], bw: 70, tY: 206, lab: 398 },
    };
    const LN = {
      dar: true,
      v: { W: 360, H: 190, x0: 44, x1: 350, yb: 150, pen: 8, tY: 14, tl: 166, ax: 184 },
      p: { W: 360, H: 200, x0: 44, x1: 318, y0: 145, k: 8.5, tY: 14, ie: 196, mx: 322 },
      b: { W: 360, H: 212, x0: 0, x1: 352, base: 186, k: 6, bx: [100, 200], bw: 60, tY: 14, lab: 205 },
    };
    let adim = 1, pe = 0, ps = 0, degisti = false, L = null, t = 0, kayit = new Map(), tCiz = 0;
    const E = {};

    const model = () => {
      if (adim === 1) return { esik: 0, E: 5, R: 2, vt: 500, pkas: 7, psK: 0, yuk: (7 / 16) * 100, eelv: 0 };
      if (adim === 2) return { esik: 0, E: 8, R: 8, vt: 500, pkas: 16, psK: 0, yuk: 100, eelv: 257, gizli: true };
      if (adim === 3) return { esik: 8, E: 8, R: 8, vt: 500, pkas: 16, psK: 0, yuk: 100, eelv: 257, hedef: true };
      if (adim === 4) return { esik: 8, E: 8, R: 8, vt: 250, pkas: 16, psK: 0, yuk: 100, eelv: 257 };
      const esik = Math.max(PEEPI - pe, 0), Ee = 8 + 2 * Math.max(pe - PEEPI, 0), gerek = Ee + 8;
      const vt = 500 * clamp((PKAP + ps - esik) / gerek, 0, 1), G = (gerek * vt) / 500;
      const pkas = esik + Math.max(G - ps, 0);
      return { esik, E: Ee, R: 8, vt, pkas, psK: Math.min(ps, G), yuk: (pkas / PKAP) * 100, eelv: 257 + 40 * Math.max(pe - PEEPI, 0) };
    };
    const solukPar = (a, m) => (a === 1 ? { vt: 500, tau: 0.4, hedef: null } : a === 2 ? { vt: 500, tau: 2.5, hedef: null } : { vt: m.vt, tau: 2.5, hedef: m.eelv });
    const yap = (e0, p) => ({ e0, vt: p.vt, tau: p.tau, e1: p.hedef == null ? (e0 + p.vt) * Math.exp(-TE / p.tau) : p.hedef });
    const rec = (k) => {
      if (kayit.has(k)) return kayit.get(k);
      const once = kayit.has(k - 1) ? kayit.get(k - 1) : rec(k - 1);
      const r = yap(once.e1, solukPar(adim, model()));
      kayit.set(k, r);
      return r;
    };
    const sifirla = () => {
      kayit = new Map(); t = 0; tCiz = 0;
      const m = model(), n = 4;
      if (RM && adim === 2) {
        let e = 0;
        for (let k = -n; k < 0; k++) { const r = yap(e, solukPar(2, m)); kayit.set(k, r); e = r.e1; }
        // pencere birikimi göstersin: en eski soluk 0'dan başlar
        const ks = [...kayit.keys()].sort((a, b) => a - b), pen = L.v.pen, ilk = -Math.ceil(pen / 4);
        const yeni = new Map(); let e2 = 0;
        for (let k = ilk; k < 0; k++) { const r = yap(e2, solukPar(2, m)); yeni.set(k, r); e2 = r.e1; }
        yeni.set(ilk - 1, { e0: 0, vt: 500, tau: 0.4, e1: 0 });
        kayit = yeni; void ks;
        return;
      }
      const gecmis = adim === 2 ? solukPar(1, m) : solukPar(adim, m);
      let e = adim <= 2 ? 0 : m.eelv;
      for (let k = -n; k < 0; k++) { const r = yap(e, gecmis); kayit.set(k, r); e = r.e1; }
    };
    const hacim = (tau) => {
      const k = Math.floor(tau / 4), r = rec(k), u = tau - 4 * k;
      if (u < TI) return r.e0 + (r.vt * u) / TI;
      const kk = Math.exp(-TE / r.tau), tt = u - TI;
      return r.e1 + (r.e0 + r.vt - r.e1) * ((Math.exp(-tt / r.tau) - kk) / (1 - kk));
    };
    const basinc = (u, m) => {
      if (adim === 1) {
        if (u < TI) return -2 * Math.sin((Math.PI * u) / TI);
        const tt = u - TI;
        return 2.6 * (1 - Math.exp(-tt / 0.03)) * Math.exp(-tt / 0.4);
      }
      const Pm = adim === 5 ? pe : 0, Pee = Math.max(PEEPI, Pm), esik = Pee - Pm, d = (0.6 * esik) / PEEPI;
      if (u < d) return Pee - esik * (u / d);
      if (u < TI) return adim === 5 && ps > 0 ? Pm + (Pee - Pm) * Math.pow(Math.sin((Math.PI / 2) * ((u - d) / (TI - d))), 2) : Pm - 2 * Math.sin((Math.PI * (u - d)) / (TI - d)); // basınç desteğinde alveoler basınç EPAP'ın altına inmez, dolan hacimle yükselir
      const tt = u - TI, kk = Math.exp(-TE / 2.5);
      return Pee + 4 * (1 - Math.exp(-tt / 0.03)) * ((Math.exp(-tt / 2.5) - kk) / (1 - kk));
      void m;
    };

    el.innerHTML = `<div class="f25-p-ust">
        <div class="f25-faz" role="group" aria-label="Adımlar">${ADLAR.map((a, i) => `<button type="button" data-adim="${i + 1}" aria-pressed="${i === 0}" aria-label="Adım ${i + 1}: ${a}"><b>${i + 1}</b><span> · ${a}</span></button>`).join('')}</div>
        <div class="btn-row"><button type="button" class="btn ghost" data-a="geri">‹ Önceki</button><button type="button" class="btn ghost" data-a="ileri">Sonraki ›</button></div>
      </div>
      <div class="f25-p-sahne"></div>
      <div class="legend f25-p-leg"><span><i class="f25-li-crit"></i>eşik</span><span><i class="f25-li-basic"></i>elastik</span><span><i class="f25-li-warn"></i>rezistif</span><span><i class="f25-li-clin"></i>kas</span><span><i class="f25-li-acc"></i>basınç desteği</span><span><i class="f25-li-cap"></i>kas kapasitesi</span></div>
      <div class="f25-p-oku"></div>
      <p class="f25-uyari" hidden>Ekstrinsik PEEP intrinsik PEEP'i aştı: eşik zaten sıfır, fazlası akciğeri daha da şişirir (Atlas notu).</p>`;
    const ctl = document.createElement('div');
    ctl.className = 'f25-p-ctl';
    ctl.innerHTML = `<label class="f25-rng"><span>Ekstrinsik PEEP (EPAP) <b data-o="pe"></b></span><input type="range" min="0" max="10" step="1" value="0" aria-label="Ekstrinsik PEEP, cmH₂O"></label>
      <div class="f25-segk"><span>Basınç desteği (cmH₂O)</span>${segHtml('Basınç desteği', 'ps', [['0', '0'], ['5', '5'], ['10', '10']], '0')}</div>`;
    const sahne = el.querySelector('.f25-p-sahne'), oku = el.querySelector('.f25-p-oku'), uyari = el.querySelector('.f25-uyari');
    const rng = ctl.querySelector('input[type=range]'), oPe = ctl.querySelector('[data-o="pe"]');
    const bGeri = el.querySelector('[data-a="geri"]'), bIleri = el.querySelector('[data-a="ileri"]');

    const vPanel = (V, ox, oy) => {
      let h = T(ox + 0, oy + V.tY, 'f25-pt', 'Akciğer hacmi', 'start');
      [0, 300, 600, 900].forEach((v) => { const y = oy + V.yb - v * 0.14; h += Ln(V.x0, y, V.x1, y, 'f25-izg') + T(V.x0 - 6, y + 4, 'f25-tk', v, 'end'); });
      const pen = V.pen, xs = (V.x1 - V.x0) / pen;
      for (let s = 0; s <= pen; s += 4) { const x = V.x0 + s * xs; h += Ln(x, oy + V.yb, x, oy + V.yb + 4, 'f25-eks') + T(x, oy + V.tl, 'f25-tk', s === pen ? 'şimdi' : '−' + (pen - s) + ' s', s === 0 ? 'start' : s === pen ? 'end' : 'middle'); }
      h += T((V.x0 + V.x1) / 2, oy + V.ax, 'f25-ax', 'zaman (s)', 'middle');
      h += `<text class="f25-ax" text-anchor="middle" transform="translate(${V.x0 - 44} ${oy + 87}) rotate(-90)">FRK üstü hacim (mL)</text>`;
      h += '<path class="f25-p-band" data-band/><path class="f25-p-eelv" data-eelv/>';
      h += Ln(V.x0, oy + V.yb, V.x1, oy + V.yb, 'f25-p-frk');
      h += '<path class="f25-p-v" data-v/>';
      h += T(V.x0 + 4, oy + V.yb - 5, 'f25-p-lb f25-halo', 'FRK (dinlenme hacmi)');
      h += `<text class="f25-p-bt f25-halo" data-bt text-anchor="end">dinamik hiperinflasyon</text><text class="f25-p-bt f25-p-btv f25-halo" data-btv text-anchor="end"></text>`;
      return h;
    };
    const pPanel = (P, oy) => {
      const Y = (v) => oy + P.y0 - v * P.k, X = (u) => P.x0 + (u / 4) * (P.x1 - P.x0);
      let h = T(P.x0, oy + P.tY, 'f25-pt', 'Alveoler basınç (bir soluk)', 'start');
      h += Rc(X(0), Y(14), X(TI) - X(0), Y(-4) - Y(14), 'f25-p-insp');
      [-4, 0, 4, 8, 12].forEach((v) => { h += Ln(P.x0, Y(v), P.x1, Y(v), v === 0 ? 'f25-p-sifir' : 'f25-izg') + T(P.x0 - 6, Y(v) + 4, 'f25-tk', fmt(v, 0), 'end'); });
      h += `<text class="f25-ax" text-anchor="middle" transform="translate(${P.x0 - 40} ${r1((Y(14) + Y(-4)) / 2)}) rotate(-90)">alveoler basınç (cmH₂O)</text>`;
      h += T(X(TI / 2), oy + P.ie, 'f25-tk', 'inspirasyon', 'middle') + T(X(TI + TE / 2), oy + P.ie, 'f25-tk', 'ekspirasyon', 'middle');
      h += '<g data-pg><path class="f25-p-esf" data-esf/><line class="f25-p-agiz" data-agiz/><path class="f25-p-iz" data-iz/><path class="f25-p-esz" data-esz/><circle r="4.5" class="f25-p-kal" data-kal/>';
      h += `<line class="f25-p-pi" data-pi marker-start="url(#f25-pepi-okc)" marker-end="url(#f25-pepi-okc)"/><text class="f25-p-lbc f25-halo" data-pit text-anchor="end">intrinsik PEEP 8</text>`;
      h += '<text class="f25-p-lbc f25-halo" data-est>eşik: akım yok</text><text class="f25-p-lb f25-halo" data-akt text-anchor="middle">akım başlar</text><circle r="3" class="f25-p-akn" data-akn/>';
      h += `<text class="f25-p-agt" data-agt x="${P.mx}"></text></g>`;
      h += `<text class="f25-p-say" data-say x="${r1((P.x0 + P.x1) / 2)}" y="${r1(Y(6))}" text-anchor="middle"></text><text class="f25-p-says" data-says x="${r1((P.x0 + P.x1) / 2)}" y="${r1(Y(6) + 24)}" text-anchor="middle">her soluktan biraz hava kalır</text>`;
      return h;
    };
    const bPanel = (B, oy) => {
      const Y = (v) => oy + B.base - v * B.k;
      let h = T(B.x0, oy + B.tY, 'f25-pt', 'Bir soluk için gereken basınç', 'start');
      h += Ln(B.bx[0] - 10, oy + B.base, B.bx[1] + B.bw + 10, oy + B.base, 'f25-eks');
      h += '<g data-cg></g>';
      h += Ln(B.bx[0] - 12, Y(PKAP), B.x1, Y(PKAP), 'f25-p-kap');
      h += `<text class="f25-p-kapt" text-anchor="end"><tspan x="${B.x1}" y="${r1(Y(PKAP) - 18)}">kas kapasitesi</tspan><tspan x="${B.x1}" y="${r1(Y(PKAP) - 6)}">(şematik)</tspan></text>`;
      h += T(B.bx[0] + B.bw / 2, oy + B.lab, 'f25-p-cad', 'Gereken', 'middle') + T(B.bx[1] + B.bw / 2, oy + B.lab, 'f25-p-cad', 'Karşılayan', 'middle');
      return h;
    };
    const defs = () => `<defs>${okMarker('f25-pepi-okc', 'f25-mk-crit')}${tarama('f25-pepi-tarama', 'f25-tz-crit', 'f25-tc-crit', 6)}</defs>`;
    const kur = () => {
      const dar = el.clientWidth < DAR;
      L = dar ? LN : LW;
      el.classList.toggle('f25-dar', dar);
      if (dar) {
        sahne.innerHTML = `<div data-sv></div><div data-sc></div><div data-sp></div><div data-sb></div>`;
        sahne.querySelector('[data-sv]').innerHTML = svgAc(L.v.W, L.v.H, '', 'Akciğer hacmi: kayan zaman penceresinde soluklar ve ekspirasyon sonu hacmi', vPanel(L.v, 0, 0));
        sahne.querySelector('[data-sc]').appendChild(ctl);
        sahne.querySelector('[data-sp]').innerHTML = svgAc(L.p.W, L.p.H, '', 'Bir soluk boyunca alveoler basınç ve ağız basıncı', defs() + pPanel(L.p, 0));
        sahne.querySelector('[data-sb]').innerHTML = svgAc(L.b.W, L.b.H, '', 'Bir soluk için gereken basınç ve onu karşılayan kas basıncı ile basınç desteği', defs().replace(/id="f25-pepi-/g, 'id="f25-pepi-b-') + bPanel(L.b, 0));
      } else {
        sahne.innerHTML = '';
        sahne.appendChild(ctl);
        const d = document.createElement('div');
        d.innerHTML = svgAc(720, 410, '', 'İntrinsik PEEP: akciğer hacmi, alveoler basınç ve bir soluk için gereken basınç', defs() + vPanel(L.v, 0, 0) + pPanel(L.p, 0) + bPanel(L.b, 0));
        sahne.appendChild(d);
      }
      ['band', 'eelv', 'v', 'bt', 'btv', 'pg', 'esf', 'agiz', 'iz', 'esz', 'kal', 'pi', 'pit', 'est', 'akt', 'akn', 'agt', 'say', 'says', 'cg'].forEach((k) => { E[k] = sahne.querySelector(`[data-${k}]`); });
      sifirla();
      guncelle();
      if (RM) volCiz();
    };
    const volCiz = () => {
      const V = L.v, pen = V.pen, X = (tau) => V.x0 + ((tau - (t - pen)) / pen) * (V.x1 - V.x0), Y = (v) => V.yb - v * 0.14;
      let d = '';
      for (let tau = t - pen; tau <= t + 1e-6; tau += 0.04) d += (d ? ' L' : 'M') + r1(X(tau)) + ' ' + r1(Y(hacim(tau)));
      E.v.setAttribute('d', d);
      // dinamik hiperinflasyon bandı: her soluğun başlangıç hacmi
      if (adim >= 2) {
        let b = '', ust = '';
        const k0 = Math.floor((t - pen) / 4), k1 = Math.floor(t / 4);
        for (let k = k0; k <= k1; k++) {
          const r = rec(k), xa = X(Math.max(4 * k, t - pen)), xb = X(Math.min(4 * k + 4, t)), y = Y(r.e0);
          b += `M${r1(xa)} ${V.yb} L${r1(xa)} ${r1(y)} L${r1(xb)} ${r1(y)} L${r1(xb)} ${V.yb} Z `;
          ust += `${ust ? 'L' : 'M'}${r1(xa)} ${r1(y)} L${r1(xb)} ${r1(y)} `;
        }
        E.band.setAttribute('d', b); E.eelv.setAttribute('d', ust);
        const ec = rec(k1).e0, hpx = ec * 0.14;
        gor(E.bt, hpx >= 16); gor(E.btv, hpx >= 16);
        at(E.bt, { x: V.x1 - (L.dar ? 66 : 76), y: V.yb - hpx / 2 + 4 });
        at(E.btv, { x: V.x1 - 6, y: V.yb - hpx / 2 + 4 });
        E.btv.textContent = '+' + n0(ec) + ' mL';
        if (adim === 2) E.say.textContent = 'Ekspirasyon sonu hacmi: ' + n0(ec) + ' mL';
        if (adim === 2 && RM) E.say.textContent = 'Ekspirasyon sonu hacmi: 170 → 227 → 247 → … ≈ 257 mL';
      } else { E.band.setAttribute('d', ''); E.eelv.setAttribute('d', ''); gor(E.bt, false); gor(E.btv, false); }
    };
    const izCiz = (m, kesir) => {
      const P = L.p, Y = (v) => P.y0 - v * P.k, X = (u) => P.x0 + (u / 4) * (P.x1 - P.x0);
      const son = 4 * kesir;
      let d = '';
      for (let u = 0; u <= son + 1e-6; u += 0.02) d += (d ? ' L' : 'M') + r1(X(u)) + ' ' + r1(Y(basinc(u, m)));
      E.iz.setAttribute('d', d);
      const u = Math.min(son, 4), ku = u >= 3.999 ? 0 : u;
      return { X, Y, u: ku };
    };
    const pStatik = (m) => {
      if (!E.pg) return;
      const P = L.p, Y = (v) => P.y0 - v * P.k, X = (u) => P.x0 + (u / 4) * (P.x1 - P.x0);
      const gizle = adim === 2;
      gor(E.pg, !gizle); gor(E.say, gizle); gor(E.says, gizle);
      if (gizle) return;
      const Pm = adim === 5 ? pe : 0, Pee = adim === 1 ? 0 : Math.max(PEEPI, Pm), es = Pee - Pm, dd = (0.6 * es) / PEEPI;
      at(E.agiz, { x1: P.x0, y1: Y(Pm), x2: P.x1, y2: Y(Pm) });
      E.agt.innerHTML = adim === 5 ? `<tspan x="${P.mx}" y="${r1(Y(Pm) - 2)}">ağız</tspan><tspan x="${P.mx}" y="${r1(Y(Pm) + 11)}">EPAP</tspan>` : `<tspan x="${P.mx}" y="${r1(Y(Pm) + 4)}">ağız</tspan>`;
      const alev = adim >= 3 && es > 0.01;
      // eşik parçası: kalın kırmızı, altı dolgulu
      if (alev) {
        let dz = '', df = `M${r1(X(0))} ${r1(Y(Pm))}`;
        for (let u = 0; u <= dd + 1e-6; u += dd / 12) { const p = `${r1(X(u))} ${r1(Y(basinc(u, m)))}`; dz += (dz ? ' L' : 'M') + p; df += ' L' + p; }
        E.esz.setAttribute('d', dz); E.esf.setAttribute('d', df + ' Z');
      } else { E.esz.setAttribute('d', ''); E.esf.setAttribute('d', ''); }
      gor(E.est, alev);
      if (alev) at(E.est, { x: X(0) + 4, y: Y(Pee) - 8 });
      const akim = adim >= 3;
      gor(E.akt, akim); gor(E.akn, akim);
      if (akim) {
        const umin = dd + (TI - dd) / 2;
        at(E.akn, { cx: X(dd), cy: Y(Pm) });
        at(E.akt, { x: X(umin), y: Y(Pm - 2) + 15 });
      }
      // intrinsik PEEP işareti (ekspirasyon sonu: alveoler > ağız)
      const piVar = adim >= 3;
      gor(E.pit, piVar);
      const bosluk = (Pee - Pm) * P.k;
      gor(E.pi, piVar && bosluk >= 12);
      if (piVar) {
        const xe = P.x1 - 5;
        at(E.pi, { x1: xe, y1: Y(Pm) - 1, x2: xe, y2: Y(Pee) + 1 });
        if (bosluk >= 26) at(E.pit, { x: xe - 7, y: (Y(Pm) + Y(Pee)) / 2 + 4 });
        else at(E.pit, { x: xe - 7, y: Y(Pm) + 16 });
        E.pit.textContent = es > 0.01 ? 'intrinsik PEEP 8' : 'eşik yok';
      }
    };
    const cubukCiz = (m) => {
      const B = L.b, Y = (v) => B.base - v * B.k;
      let seg;
      if (adim === 1) seg = { g: [0, 5, 2], k: [7, 0] };
      else if (adim === 2) seg = { g: [0, 8, 8], k: [16, 0] };
      else if (adim === 3) seg = { g: [8, 8, 8], k: [16, 0] };
      else if (adim === 4) seg = { g: [8, 4, 4], k: [16, 0] };
      else { const f = m.vt / 500; seg = { g: [m.esik, m.E * f, 8 * f], k: [m.pkas, m.psK] }; }
      const yigin = (x, vals, cls, solda) => {
        let h = '', y0 = 0;
        vals.forEach((v, i) => {
          if (v < 0.05) return;
          h += Rc(x, Y(y0 + v), B.bw, v * B.k, cls[i]);
          const ym = Y(y0 + v / 2) + 4;
          h += solda ? T(x - 6, ym, 'f25-p-sv', fmtK(v), 'end') : T(x + B.bw + 6, ym, 'f25-p-sv', fmtK(v), 'start');
          y0 += v;
        });
        return { h, top: y0 };
      };
      const g = yigin(B.bx[0], seg.g, ['f25-pc-crit', 'f25-pc-basic', 'f25-pc-warn'], true);
      const k = yigin(B.bx[1], seg.k, ['f25-pc-clin', 'f25-pc-acc'], false);
      let h = g.h + k.h;
      if (adim === 3) {
        h += Rc(B.bx[0], Y(g.top), B.bw, (g.top - PKAP) * B.k, 'f25-p-eksik', ' fill="url(#f25-pepi' + (L.dar ? '-b' : '') + '-tarama)"');
        const ym = Y((g.top + PKAP) / 2);
        h += Rc(B.bx[0] + B.bw / 2 - 30, ym - 10, 60, 19, 'f25-p-pil', ' rx="9"') + T(B.bx[0] + B.bw / 2, ym + 4, 'f25-p-eksikt', 'eksik ' + n0(g.top - PKAP), 'middle');
      }
      E.cg.innerHTML = h;
    };
    const okuCiz = (m) => {
      const yk = Math.round(m.yuk), kc = yk >= 90 ? 'crit' : yk >= 60 ? 'warn' : 'ok', vt = Math.round(m.vt);
      const vtNot = adim === 3 ? '<small>hedef; kapasite yetmez</small>' : vt < 500 ? '<small>normal 500</small>' : '';
      oku.innerHTML = `<div><span>Eşik yükü</span><b>${m.gizli ? '—' : n0(m.esik) + ' cmH₂O'}</b></div>
        <div><span>Kas basıncı</span><b>${n0(m.pkas)} cmH₂O</b></div>
        <div class="${kc}"><span>Kas yükü</span><b>%${yk}</b><i class="f25-bar"><s style="width:${clamp(yk, 0, 100)}%"></s></i></div>
        <div class="${vt < 500 ? 'crit' : ''}"><span>Tidal hacim</span><b>${vt} mL</b>${vtNot}</div>`;
    };
    const guncelle = () => {
      const m = model();
      el.querySelectorAll('[data-adim]').forEach((b) => {
        const n = +b.dataset.adim;
        b.setAttribute('aria-pressed', String(n === adim));
        b.classList.toggle('past', n < adim);
      });
      bGeri.disabled = adim === 1; bIleri.disabled = adim === 5;
      ctl.hidden = adim !== 5;
      oPe.textContent = pe + ' cmH₂O';
      basSec(ctl, 'ps', String(ps));
      uyari.hidden = !(adim === 5 && pe > PEEPI);
      okuCiz(m);
      cubukCiz(m);
      pStatik(m);
      if (adim !== 4 || RM) izCiz(m, 1);
      if (adim === 1) capY(null);
      else if (adim < 5) capY(CAP[adim]);
      else {
        let c = "<b>5 · Noninvaziv ventilasyon.</b> Ekstrinsik PEEP'i ve basınç desteğini değiştirin.";
        if (degisti) {
          c += ` Şu an: eşik ${n0(m.esik)} cmH₂O, V<sub>T</sub> ${n0(m.vt)} mL, kas yükü %${n0(m.yuk)}.`;
          if (pe > PEEPI) c += " Ekstrinsik PEEP intrinsik PEEP'i aştı: kazanç kaybolur, hiperinflasyon artar (Atlas notu).";
          if (Math.round(m.vt) === 500 && m.yuk <= 60) c += ' V<sub>T</sub> normale döndü ve kasların yükü kapasitenin yarısı dolayında: yorgunluk riski azaldı.';
        }
        capY(c + " Ekstrinsik PEEP eşik yükünü küçültür; basınç desteği artmış inspiratuvar direnci karşılayarak V<sub>T</sub>'yi normale döndürür. [[K1 s. 105]]");
      }
    };
    const git = (n) => {
      n = clamp(n, 1, 5);
      if (n === adim && n !== 2) return;
      adim = n;
      sifirla();
      guncelle();
      if (RM) volCiz();
    };
    const adimF = (dt) => {
      t += dt;
      // eski kayıtları temizle
      const kmin = Math.floor((t - L.v.pen) / 4) - 2;
      for (const k of kayit.keys()) if (k < kmin) kayit.delete(k);
      volCiz();
      const m = model(), u = ((t % 4) + 4) % 4;
      if (adim === 4) {
        tCiz = (tCiz + dt) % 4;
        const kesir = Math.min(1, tCiz / 3);
        const { X, Y } = izCiz(m, kesir);
        const uu = 4 * kesir;
        at(E.kal, { cx: X(uu), cy: Y(basinc(Math.min(uu, 3.999), m)) });
      } else if (adim !== 2) {
        const P = L.p, Y = (v) => P.y0 - v * P.k, X = (q) => P.x0 + (q / 4) * (P.x1 - P.x0);
        at(E.kal, { cx: X(u), cy: Y(basinc(u, m)) });
      }
    };
    const onClick = (e) => {
      const a = e.target.closest('[data-adim]');
      if (a) { git(+a.dataset.adim); return; }
      const b = e.target.closest('[data-a]');
      if (b) { git(adim + (b.dataset.a === 'ileri' ? 1 : -1)); return; }
      const p = e.target.closest('[data-ps]');
      if (p) { ps = +p.dataset.ps; degisti = true; guncelle(); if (RM) { sifirla(); volCiz(); } }
    };
    const onInput = (e) => { if (e.target !== rng) return; pe = +rng.value; degisti = true; guncelle(); if (RM) { sifirla(); volCiz(); } };
    el.addEventListener('click', onClick);
    el.addEventListener('input', onInput);
    kur();
    if (RM) gor(E.kal, false);
    const durT = RM ? () => {} : ticker(el, adimF);
    const izle = genislikIzle(el, () => { kur(); if (RM) gor(E.kal, false); });
    return () => { durT(); izle(); el.removeEventListener('click', onClick); el.removeEventListener('input', onInput); };
  };

  /* ---------- 6 · İstemli hiperventilasyon denemesi: normal PaCO₂ mü, dinlenen kaslar mı? (durağan şema, K1 s. 105) ---------- */
  VIZ.f25_secim = (el) => {
    /* A · zaman çizelgesi (geniş / dar). Sayı yok: tek sayı 6,0 kPa eşiği (K1 s. 104). */
    const AW = {
      W: 640, H: 270, x0: 70, xs: 190, xf: 440, x1: 620, bt: 26, bb: 250,
      t1: [[130, 18, 'Kendi solunumu']], t2: [405, 18, 'İstemli hiperventilasyon'],
      pY: [40, 140], esik: 100, nb: [100, 140], yH: 58, yN: 120, kx: 28,
      axP: [60, 90], axK: [[60, 196, 'solunum'], [60, 210, 'kasları']],
      kron: [78, 50], norm: [78, 134], esT: [618, 94],
      g1: [246, [[92, 'Gözlem 1', ' · PaCO₂ normale iner']]],
      g2: [448, [[157, 'Gözlem 2', ''], [172, '', 'solunum kası yorgunluğu']]],
      sy: [180, 216], kT: ['dinlenik', 'iş artmış', 'yorgunluk başlar'],
      br: 224, brT: 248, ok: 258, zmn: [612, 253],
    };
    const AN = {
      W: 360, H: 300, x0: 56, xs: 120, xf: 262, x1: 350, bt: 34, bb: 272,
      t1: [[88, 14, 'Kendi'], [88, 27, 'solunumu']], t2: [235, 21, 'İstemli hiperventilasyon'],
      pY: [44, 150], esik: 106, nb: [106, 146], yH: 66, yN: 126, kx: 14,
      axP: [50, 100], axK: [[50, 218, 'kaslar']],
      kron: [60, 56], norm: [62, 141], esT: [348, 100],
      g1: [136, [[82, 'Gözlem 1', ''], [96, '', 'PaCO₂ normale iner']]],
      g2: [268, [[160, 'Gözlem 2', ''], [173, '', 'solunum kası'], [186, '', 'yorgunluğu']]],
      sy: [196, 232], kT: ['dinlenik', 'iş artmış', 'yorgunluk'],
      br: 238, brT: 262, ok: 286, zmn: [342, 281],
    };
    /* B · merkezin seçimi */
    const BW = {
      W: 640, H: 230, dug: [230, 8, 180, 40],
      sag: [330, 78, 290, 100], sol: [20, 78, 290, 100], tx: 16, ty: [24, 48, 68],
      okS: 'M320 48 L475 76', okL: 'M320 48 L165 76',
      alt: [20, 190, 600, 32], altT: [[211, true]],
    };
    const BN = {
      W: 360, H: 380, dug: [90, 8, 180, 40],
      sag: [16, 78, 328, 90], sol: [16, 186, 328, 90], tx: 14, ty: [24, 47, 66],
      okS: 'M180 48 L180 76', okL: 'M270 28 H352 V231 H347',
      alt: [16, 292, 328, 72], altT: [[322, 'a'], [346, 'b']],
    };
    let dar = null, hover = null, sabit = null;
    el.innerHTML = '<div class="f25-secim"><div class="f25-s-A"></div><div class="f25-s-B"></div></div>';
    const pA = el.querySelector('.f25-s-A'), pB = el.querySelector('.f25-s-B');

    const kurA = (A) => {
      const yP = (x) => (x <= A.xs ? A.yH : A.yN - (A.yN - A.yH) * Math.exp(-(x - A.xs) / A.kx));
      let d = `M${A.x0} ${A.yH}`;
      for (let x = A.xs; x <= A.x1 + 0.01; x += 2) d += ` L${r1(x)} ${r1(yP(x))}`;
      const bandT = (k, b) => `<text class="f25-s-bt" text-anchor="middle" x="${b[0]}" y="${b[1]}">${b[2]}</text>`;
      let h = `<defs>${okMarker('f25-secim-ok', 'f25-mk-muted')}${tarama('f25-secim-tarama', 'f25-tz-crit', 'f25-tc-crit', 6)}</defs>`;
      // evre bantları (odaklanabilir)
      h += `<g class="f25-s-p" data-p="e1" tabindex="0" role="button" aria-label="Evre 1: kendi solunumu">${Rc(A.x0, A.bt, A.xs - A.x0, A.bb - A.bt, 'f25-s-band f25-s-band1')}${A.t1.map((b) => bandT('e1', b)).join('')}</g>`;
      h += `<g class="f25-s-p" data-p="e2" tabindex="0" role="button" aria-label="Evre 2: istemli hiperventilasyon">${Rc(A.xs, A.bt, A.x1 - A.xs, A.bb - A.bt, 'f25-s-band f25-s-band2')}${bandT('e2', A.t2)}</g>`;
      h += Ln(A.xs, A.bt, A.xs, A.bb, 'f25-s-sinir');
      // PaCO₂ izi
      h += Rc(A.x0, A.nb[0], A.x1 - A.x0, A.nb[1] - A.nb[0], 'f25-s-normal');
      h += T(A.norm[0], A.norm[1], 'f25-s-lbn', 'normal');
      h += Ln(A.x0, A.pY[0], A.x0, A.pY[1], 'f25-s-eks');
      h += T(A.axP[0], A.axP[1], 'f25-s-ax', 'PaCO₂', 'end');
      h += Ln(A.x0, A.esik, A.x1, A.esik, 'f25-s-esik');
      h += T(A.esT[0], A.esT[1], 'f25-s-est f25-halo', '6,0 kPa', 'end');
      h += `<path d="${d}" class="f25-s-egri"/>`;
      h += T(A.kron[0], A.kron[1], 'f25-s-kron f25-halo', 'kronik hiperkapni');
      const etiket = (g, cls) => `<text class="${cls} f25-halo">${g[1].map(([y, b, s]) => `<tspan x="${g[0]}" y="${y}">${b ? `<tspan class="f25-s-kalin">${b}</tspan>` : ''}${s}</tspan>`).join('')}</text>`;
      h += etiket(A.g1, 'f25-s-gz');
      // solunum kasları şeridi
      A.axK.forEach(([x, y, s]) => { h += T(x, y, 'f25-s-ax', s, 'end'); });
      const [y0, y1] = A.sy, ym = (y0 + y1) / 2 + 4.5;
      const parca = (k, xa, xb, cls, s, tcls, ad) => `<g class="f25-s-p" data-p="${k}" tabindex="0" role="button" aria-label="${ad}">${Rc(xa, y0, xb - xa, y1 - y0, 'f25-s-kas ' + cls, ' rx="6"')}${T((xa + xb) / 2, ym, tcls, s, 'middle')}</g>`;
      h += parca('k1', A.x0, A.xs, 'f25-s-k1', A.kT[0], 'f25-s-kt f25-s-kt1', 'Solunum kasları: dinlenik');
      h += parca('k2', A.xs, A.xf, 'f25-s-k2', A.kT[1], 'f25-s-kt f25-s-kt2', 'Solunum kasları: istemli hiperventilasyonda iş artmış');
      h += parca('k3', A.xf, A.x1, 'f25-s-k3', A.kT[2], 'f25-s-kt f25-s-kt3 f25-halo', 'Solunum kasları: birkaç dakika sonra yorgunluk başlar');
      // yorgunluk anı
      h += Ln(A.xf, A.bt + 4, A.xf, y1, 'f25-s-yorg');
      h += etiket(A.g2, 'f25-s-gz');
      // "birkaç dakika" parantezi
      const xa = A.xs, xb = A.xf, xm = (xa + xb) / 2, b0 = A.br, b1 = A.br + 5, b2 = A.br + 10;
      h += `<path class="f25-s-par" d="M${xa} ${b0} Q${xa} ${b1} ${xa + 6} ${b1} H${xm - 6} Q${xm} ${b1} ${xm} ${b2} Q${xm} ${b1} ${xm + 6} ${b1} H${xb - 6} Q${xb} ${b1} ${xb} ${b0}"/>`;
      h += T(xm, A.brT, 'f25-s-lbm', 'birkaç dakika', 'middle');
      // zaman oku
      h += Ln(A.x0, A.ok, A.x1, A.ok, 'f25-s-zok', ' marker-end="url(#f25-secim-ok)"');
      h += T(A.zmn[0], A.zmn[1], 'f25-s-zt', 'zaman', 'end');
      pA.innerHTML = svgAc(A.W, A.H, 'f25-s-svgA', 'Kronik hiperkapnik KOAH hastası: istemli hiperventilasyonla PaCO₂ normale iner, birkaç dakika sonra solunum kası yorgunluğu başlar', h);
    };

    const kurB = (B) => {
      const [dx, dy, dw, dh] = B.dug;
      let h = `<defs>${okMarker('f25-secim-ok2', 'f25-mk-clin')}${okMarker('f25-secim-ok3', 'f25-mk-line')}</defs>`;
      h += `<path d="${B.okL}" class="f25-s-okL" marker-end="url(#f25-secim-ok3)"/><path d="${B.okS}" class="f25-s-okS" marker-end="url(#f25-secim-ok2)"/>`;
      h += Rc(dx, dy, dw, dh, 'f25-s-dug', ' rx="10"') + T(dx + dw / 2, dy + 25, 'f25-s-dugt', 'Solunum merkezi', 'middle');
      const kart = (k, r, cls, bas, sat, roz, rozCls, ad) => {
        const [x, y, w, hh] = r, tx = x + B.tx;
        return `<g class="f25-s-p" data-p="${k}" tabindex="0" role="button" aria-label="${ad}">${Rc(x, y, w, hh, 'f25-s-kart ' + cls, ' rx="12"')}`
          + T(tx, y + B.ty[0], 'f25-s-kb ' + cls + '-t', bas)
          + sat.map((s, i) => `<text x="${tx}" y="${y + B.ty[i + 1]}" class="f25-s-ks ${cls}-s">${s}</text>`).join('')
          + `<g class="f25-s-roz ${rozCls}" data-roz="${x + w - 10}" data-rozy="${y + 9}"><rect rx="9" height="18"/><text text-anchor="middle">${roz}</text></g></g>`;
      };
      h += kart('sag', B.sag, 'f25-s-sec', 'Yüksek PaCO₂ kabul edilir', ['hipoventilasyon: kronik hiperkapni', 'kaslar yorulmaz'], '✓ seçilen', 'f25-s-roz-ok', 'Seçilen: yüksek PaCO₂ kabul edilir, hipoventilasyon ve kronik hiperkapni, kaslar yorulmaz');
      h += kart('sol', B.sol, 'f25-s-red', 'Normal PaCO₂ (homeostaz)', ['normal PaCO₂ için ventilasyon ↑', 'bedeli: <tspan class="f25-s-krit">solunum kası yorgunluğu</tspan> riski'], '× seçilmez', 'f25-s-roz-no', 'Seçilmeyen: normal PaCO₂ için ventilasyon artar, bedeli solunum kası yorgunluğu riski');
      const [ax, ay, aw, ah] = B.alt;
      h += Rc(ax, ay, aw, ah, 'f25-s-alt', ' rx="8"');
      if (B.altT.length === 1) h += `<text class="f25-s-altt" x="${ax + aw / 2}" y="${B.altT[0][0]}" text-anchor="middle"><tspan class="f25-s-rd">refleks duyarsızlaşma</tspan> · homeostaz yerine optimizasyon</text>`;
      else h += `<text class="f25-s-altt f25-s-rd" x="${ax + aw / 2}" y="${B.altT[0][0]}" text-anchor="middle">refleks duyarsızlaşma</text><text class="f25-s-altt" x="${ax + aw / 2}" y="${B.altT[1][0]}" text-anchor="middle">homeostaz yerine optimizasyon</text>`;
      pB.innerHTML = svgAc(B.W, B.H, 'f25-s-svgB', 'Solunum merkezinin seçimi: normal PaCO₂ ve kas yorgunluğu riski yerine yüksek PaCO₂ ve dinlenen kaslar; refleks duyarsızlaşma, homeostaz yerine optimizasyon', h);
      // rozetler: metin genişliğine göre, sağa yaslı
      pB.querySelectorAll('.f25-s-roz').forEach((g) => {
        const t = g.querySelector('text'), r = g.querySelector('rect');
        let w = 0;
        try { w = t.getComputedTextLength(); } catch (e) { w = 0; }
        if (!w) w = t.textContent.length * 6.4;
        const bw = w + 14, x2 = +g.dataset.roz, y = +g.dataset.rozy;
        at(r, { x: x2 - bw, y, width: bw });
        at(t, { x: x2 - bw / 2, y: y + 13 });
      });
    };

    const boya = () => {
      const a = hover || sabit;
      el.querySelectorAll('svg').forEach((s) => s.classList.toggle('f25-s-odak', !!a && !!s.querySelector(`[data-p="${a}"]`)));
      el.querySelectorAll('[data-p]').forEach((g) => { g.classList.toggle('on', g.dataset.p === a); g.setAttribute('aria-pressed', String(g.dataset.p === sabit)); });
    };
    const kur = () => {
      dar = el.clientWidth < DAR;
      el.classList.toggle('f25-dar', dar);
      kurA(dar ? AN : AW);
      kurB(dar ? BN : BW);
      boya();
    };
    const onOver = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      const g = e.target.closest('[data-p]');
      const p = g ? g.dataset.p : null;
      if (p !== hover) { hover = p; boya(); }
    };
    const onLeave = () => { if (hover) { hover = null; boya(); } };
    const sec = (p) => { sabit = sabit === p ? null : p; hover = null; boya(); };
    const onClick = (e) => { const g = e.target.closest('[data-p]'); sec(g ? g.dataset.p : sabit); };
    const onKey = (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const g = e.target.closest('[data-p]');
      if (g) { e.preventDefault(); sec(g.dataset.p); }
    };
    const onFocusIn = (e) => { const g = e.target.closest('[data-p]'); if (g) { hover = g.dataset.p; boya(); } };
    const onFocusOut = () => { hover = null; boya(); };
    const onDisari = (e) => { if (sabit && !el.contains(e.target)) { sabit = null; boya(); } };
    el.addEventListener('pointerover', onOver);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('click', onClick);
    el.addEventListener('keydown', onKey);
    el.addEventListener('focusin', onFocusIn);
    el.addEventListener('focusout', onFocusOut);
    document.addEventListener('pointerdown', onDisari);
    kur();
    const izle = genislikIzle(el, kur);
    return () => {
      izle();
      el.removeEventListener('pointerover', onOver); el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('click', onClick); el.removeEventListener('keydown', onKey);
      el.removeEventListener('focusin', onFocusIn); el.removeEventListener('focusout', onFocusOut);
      document.removeEventListener('pointerdown', onDisari);
    };
  };
})();
