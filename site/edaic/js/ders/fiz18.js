/* Fizyoloji Bölüm 18 · Alveoler gaz denklemi · bileşenler (K1 s. 77–79). Tarif: docs/tasarim/fiz18.md
   Bütün hesaplar kitabın basitleştirilmiş denklemiyle yapılır: PAO₂ = FiO₂ × (PB − 6,3) − PaCO₂ / R (K1 s. 77).
   Hesap tam sayılarla yapılır, yalnız gösterirken bir ondalığa yuvarlanır. Hücre şeması, jeton paketleri ve
   V̇A–PaCO₂ modeli şematiktir; sayfadaki viz-foot notları bunu söyler. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;

  /* ---------- ortak ---------- */
  const FIO2_HAVA = 0.2093, PB_DENIZ = 101.325, PSVP = 6.3, R_DIYET = 0.8; // K1 s. 77
  const pio2 = (fi, pb) => fi * (pb - PSVP);
  const pao2 = (fi, pb, pc, r = R_DIYET) => pio2(fi, pb) - pc / r;
  const DAR = 600; // bileşen bu genişliğin altındaysa telefon yerleşimi
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2);
  const fmt = (v, d = 1) => { let s = v.toFixed(d); if (/^-0(\.0+)?$/.test(s)) s = s.slice(1); return s.replace('.', ',').replace('-', '−'); };
  const yuv = (v) => Math.round(v * 10) / 10;
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const capYazici = (el) => {
    const v = el.closest('.viz'), cap = v && v.querySelector('.viz-cap');
    let son = null;
    return (h) => { if (cap && h !== son) { cap.innerHTML = REF(h); son = h; } };
  };
  const genislikIzle = (el, cb) => {
    if (!('ResizeObserver' in window)) return () => {};
    let son = el.clientWidth < DAR;
    const ro = new ResizeObserver(() => { const d = el.clientWidth < DAR; if (d !== son) { son = d; cb(); } });
    ro.observe(el);
    return () => ro.disconnect();
  };
  const T = (x, y, cls, s, a, ek = '') => `<text x="${x}" y="${y}" class="${cls}"${a ? ` text-anchor="${a}"` : ''}${ek}>${s}</text>`;
  const svgAc = (L, etiket, ic) => `<svg class="f18-svg${L.dar ? ' f18-svg-dar' : ''}" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="${etiket}">${ic}</svg>`;
  const taramaDef = (id) => `<defs><pattern id="${id}" patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)"><rect width="7" height="7" class="f18-tar-z"/><line x1="1.5" y1="0" x2="1.5" y2="7" class="f18-tar-c"/></pattern></defs>`;
  const at = (e, o) => { if (e) for (const k in o) e.setAttribute(k, typeof o[k] === 'number' ? o[k].toFixed(1) : o[k]); };
  const satir = (e, x, sat, lh) => { if (e) e.innerHTML = sat.map((s, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${s}</tspan>`).join(''); };
  const gor = (e, on) => { if (e) e.style.display = on ? '' : 'none'; };
  const opak = (e, v) => { if (e) e.style.opacity = v.toFixed(2); };

  /* ---------- 1 · Solunum katsayısı: tüketilen O₂, üretilen CO₂ ---------- */
  VIZ.f18_rq = (el) => {
    const SUB = {
      kh: { ad: 'Karbonhidrat', et: 'C₆H₁₂O₆ (glukoz)', n: 6, m: 6, R: 1.0, su: true, tep: 'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O',
        cap: "<b>Karbonhidrat: R = 1,0.</b> Glukozun aerobik metabolizmasında 6 O₂ tüketilir, 6 CO₂ üretilir: 6/6 = 1,0. PaCO₂ 5,3 kPa'da çıkarılan terim 5,3 kPa, PAO₂ ≈ 14,6 kPa. [[K1 s. 77]]" },
      yag: { ad: 'Yağ', et: 'yağ asidi', n: 10, m: 7, R: 0.7, tep: 'her 10 O₂ için ≈ 7 CO₂ (şematik paket)',
        cap: "<b>Yağ: R = 0,7.</b> Tüketilen her 10 O₂ için yaklaşık 7 CO₂ üretilir. R küçük olduğu için çıkarılan terim büyür (5,3/0,7 ≈ 7,6 kPa) ve PAO₂ ≈ 12,3 kPa'ya iner. [[K1 s. 77]]" },
      pro: { ad: 'Protein', et: 'amino asit', n: 10, m: 9, R: 0.9, not: true, tep: 'her 10 O₂ için 9 CO₂ (şematik paket)',
        cap: "<b>Protein: R = 0,9 (kitabın değeri).</b> Her 10 O₂ için 9 CO₂; PAO₂ ≈ 14,0 kPa. Kaynakların çoğu protein için ≈ 0,8 kullanır (sayfadaki Atlas notu). [[K1 s. 77]]" },
      karma: { ad: 'Karma diyet', et: 'karma Batı diyeti', n: 10, m: 8, R: 0.8, tep: 'her 10 O₂ için 8 CO₂ (şematik paket)',
        cap: "<b>Batı tipi karma diyet: R = 0,8.</b> Denklemde genellikle kullanılan değer: 5,3/0,8 ≈ 6,6 kPa düşülür, PAO₂ 13,3 kPa. [[K1 s. 78]]" },
    };
    const SIRA = ['kh', 'yag', 'pro', 'karma'], RS = [0.7, 0.8, 0.9, 1.0];
    const PC = 5.3, PIO = pio2(FIO2_HAVA, PB_DENIZ);
    // döngü (s): jetonlar belirir, O₂ hücreye akar, CO₂ (ve H₂O) çıkar, bekler, söner
    const TA = 0.3, TD = 2.0, TR = 0.5, TC = 1.8, TH = 4.7, TP = 5.0;
    const LW = {
      W: 720, H: 334, dar: false, r: 11, hr: 10,
      sub: [360, 30], box: [260, 48, 200, 110], boxT: [[360, 99], [360, 119]], oranK: [540, 10, 166, 46],
      inX: (c) => (c === 3 ? [106, 140, 174] : [72, 106, 140, 174, 208]), inY: [90, 118], inE: [262, 104],
      outX: (c) => (c === 3 ? [546, 580, 614] : [512, 546, 580, 614, 648]), outY: [90, 118], outE: [458, 104],
      suE: [360, 158], suS: (k) => [300 + 24 * k, 177], tep: [360, 207], not: [706, 72, 'end'],
      s: { x0: 40, k: 32, lblY: 226, top: 231, bar: 246, bh: 18, hl: 241, n0: 268, n1: 276, nl: 296, ax: 312, tl: 327, rX: 401, nlx: [419, 455, 491, 527] },
    };
    const LN = {
      W: 360, H: 428, dar: true, r: 13, hr: 12,
      sub: [180, 20], box: [100, 108, 160, 66], boxT: [[180, 137], [180, 155]], oranK: [268, 112, 86, 58],
      inX: (c) => (c === 3 ? [144, 180, 216] : [108, 144, 180, 216, 252]), inY: [40, 70], inE: [180, 110],
      outX: (c) => (c === 3 ? [144, 180, 216] : [108, 144, 180, 216, 252]), outY: [200, 230], outE: [180, 172],
      suE: [102, 141], suS: (k) => [[20, 46, 72][k % 3], k < 3 ? 126 : 153], tep: [180, 278], not: [180, 297, 'middle'],
      s: { x0: 20, k: 16, lblY: 320, top: 324, bar: 346, bh: 18, hl: 340, n0: 366, n1: 372, nl: 390, ax: 404, tl: 420, rX: 178, nlx: [192, 222, 252, 282] },
    };
    const capY = capYazici(el);
    let sec = 'kh', t = TA, oyna = !RM, L = null, tw = null;
    let dPA = pao2(FIO2_HAVA, PB_DENIZ, PC, SUB.kh.R);
    const E = {};
    el.innerHTML = `<div class="f18-ctl">${segHtml('Besin substratı', 's', SIRA.map((k) => [k, SUB[k].ad]), sec)}${RM ? '' : '<button type="button" class="btn ghost f18-oyna">Duraklat</button>'}</div><div class="f18-sahne f18-rq"></div>`;
    const sahne = el.querySelector('.f18-sahne'), oyB = el.querySelector('.f18-oyna');
    const slotlar = (xs, ys, e, yakin) => {
      const s = [];
      xs.forEach((x) => ys.forEach((y) => s.push([x, y])));
      const d = (p) => Math.hypot(p[0] - e[0], p[1] - e[1]);
      return s.sort((p, q) => (yakin ? d(p) - d(q) : d(q) - d(p)));
    };
    const jeton = (k, r, lbl) => `<g class="f18-j f18-j-${k}"><circle r="${r}"/><text y="${(r * 0.32).toFixed(1)}" text-anchor="middle">${lbl}</text></g>`;
    const yer = (g, x, y, sc, op) => { g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${sc.toFixed(2)})`); g.style.opacity = op.toFixed(2); };

    const ciz = () => {
      const S = SUB[sec];
      let inN = 0;
      E.o2.forEach((g, i) => {
        const [sx, sy] = E.inS[i], dep = TA + (i * TD) / S.n;
        if (RM) { yer(g, sx, sy, 1, 1); inN++; return; }
        if (t < dep) yer(g, sx, sy, 1, t < TA ? t / TA : 1);
        else if (t < dep + TR) {
          const f = ease((t - dep) / TR);
          yer(g, lerp(sx, L.inE[0], f), lerp(sy, L.inE[1], f), 1 - 0.4 * f, f > 0.75 ? 1 - (f - 0.75) / 0.25 : 1);
        } else { yer(g, L.inE[0], L.inE[1], 0.6, 0); inN++; }
      });
      const cik = (arr, slots, e, adet) => {
        let k = 0;
        const son = t > TH ? 1 - (t - TH) / (TP - TH) : 1;
        arr.forEach((g, j) => {
          const [sx, sy] = slots[j], em = TC + (j * TD) / adet;
          if (RM) { yer(g, sx, sy, 1, 1); k++; return; }
          if (t < em) yer(g, e[0], e[1], 0.6, 0);
          else if (t < em + TR) { const f = ease((t - em) / TR); yer(g, lerp(e[0], sx, f), lerp(e[1], sy, f), 0.6 + 0.4 * f, Math.min(1, f / 0.3) * son); }
          else { yer(g, sx, sy, 1, son); k++; }
        });
        return k;
      };
      const outN = cik(E.co2, E.outS, L.outE, S.m);
      if (E.su.length) cik(E.su, E.suS, L.suE, 6);
      if (E.inN) E.inN.textContent = inN;
      if (E.outN) E.outN.textContent = outN;
    };

    const serit = () => {
      const S = SUB[sec], s = L.s, X = (p) => s.x0 + s.k * p, xa = X(dPA), xp = X(PIO);
      at(E.bar, { width: Math.max(0, xa - s.x0) });
      at(E.tar, { x: xa, width: Math.max(0, xp - xa) });
      at(E.barT, { x: xa - 6 });
      E.barT.textContent = `PAO₂ ${fmt(pao2(FIO2_HAVA, PB_DENIZ, PC, S.R))}`;
      at(E.tarT, { x: L.dar ? xp : (xa + xp) / 2 });
      E.tarT.textContent = `PaCO₂/R = 5,3/${fmt(S.R)} = ${fmt(PC / S.R)}`;
      E.cen.forEach((g) => g.classList.toggle('on', +g.dataset.r === S.R));
    };

    const kur = () => {
      const dar = el.clientWidth < DAR;
      L = dar ? LN : LW;
      el.classList.toggle('f18-dar', dar);
      const S = SUB[sec], c = S.n === 6 ? 3 : 5, s = L.s, X = (p) => s.x0 + s.k * p;
      E.inS = slotlar(L.inX(c), L.inY, L.inE, true);
      E.outS = slotlar(L.outX(c), L.outY, L.outE, false);
      E.suS = [0, 1, 2, 3, 4, 5].map(L.suS);
      const [bx, by, bw, bh] = L.box, [ox, oy, ow, oh] = L.oranK;
      let h = taramaDef('f18-tarama-rq');
      h += `<rect class="f18-hucre" x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="16"/>`;
      h += T(L.boxT[0][0], L.boxT[0][1], 'f18-lbm', 'aerobik', 'middle') + T(L.boxT[1][0], L.boxT[1][1], 'f18-lbm', 'metabolizma', 'middle');
      h += T(L.sub[0], L.sub[1], 'f18-sub', S.et, 'middle');
      h += `<rect class="f18-oran-k" x="${ox}" y="${oy}" width="${ow}" height="${oh}" rx="10"/>`;
      if (dar) {
        h += T(ox + ow / 2, oy + 21, 'f18-mn', `R = ${S.m}/${S.n}`, 'middle');
        h += T(ox + ow / 2, oy + 47, 'f18-oran f18-acct', fmt(S.R), 'middle');
      } else h += T(ox + ow / 2, oy + 30, 'f18-oran', `R = ${S.m}/${S.n} = <tspan class="f18-acct">${fmt(S.R)}</tspan>`, 'middle');
      if (S.not) h += T(L.not[0], L.not[1], 'f18-not', 'kitabın değeri; çoğu kaynak ≈ 0,8', L.not[2]);
      // boş yuvalar: girişte ve çıkışta n yer; çıkışta boş kalan yerler oranı gösterir
      h += E.inS.concat(E.outS).map(([x, y]) => `<circle class="f18-yuva" cx="${x}" cy="${y}" r="${L.r}"/>`).join('');
      if (dar) {
        h += T(8, 50, 'f18-lb f18-o2t', 'tüketilen O₂') + T(8, 76, 'f18-say', '0', '', ' data-k="inN"');
        h += T(8, 208, 'f18-lb f18-co2t', 'üretilen CO₂') + T(8, 234, 'f18-say', '0', '', ' data-k="outN"');
      } else {
        h += T(140, 154, 'f18-lb f18-o2t', 'tüketilen O₂: <tspan data-k="inN">0</tspan>', 'middle');
        h += T(580, 154, 'f18-lb f18-co2t', 'üretilen CO₂: <tspan data-k="outN">0</tspan>', 'middle');
      }
      h += T(L.tep[0], L.tep[1], 'f18-tep', S.tep, 'middle');
      h += '<g>' + E.inS.map(() => jeton('o2', L.r, 'O₂')).join('') + E.outS.slice(0, S.m).map(() => jeton('co2', L.r, 'CO₂')).join('') + (S.su ? E.suS.map(() => jeton('su', L.hr, 'H₂O')).join('') : '') + '</g>';
      // denkleme etkisi şeridi (oda havası, deniz seviyesi, PaCO₂ 5,3 kPa)
      const xp = X(PIO);
      h += T(s.x0, s.lblY, 'f18-tk', 'PAO₂ · oda havası, PaCO₂ 5,3 kPa');
      h += T(xp + 4, s.lblY, 'f18-tk f18-o2t', `PIO₂ ${fmt(PIO)}`, 'end');
      h += `<rect class="f18-pa-bar" data-k="bar" x="${s.x0}" y="${s.bar}" height="${s.bh}" rx="3"/>`;
      h += `<rect fill="url(#f18-tarama-rq)" class="f18-tar" data-k="tar" y="${s.bar}" height="${s.bh}"/>`;
      h += `<line class="f18-pio-l" x1="${xp}" x2="${xp}" y1="${s.top}" y2="${s.bar + s.bh + 6}"/>`;
      h += T(0, s.bar + 13, 'f18-mn f18-papt', '', 'end', ' data-k="barT"');
      h += T(0, s.hl, 'f18-mn f18-co2t f18-halo', '', dar ? 'end' : 'middle', ' data-k="tarT"');
      RS.forEach((r, i) => {
        const xn = X(pao2(FIO2_HAVA, PB_DENIZ, PC, r)).toFixed(1);
        h += `<g class="f18-centik" data-r="${r}"><line x1="${xn}" x2="${xn}" y1="${s.n0}" y2="${s.n1}"/><line class="f18-centik-ip" x1="${xn}" x2="${s.nlx[i]}" y1="${s.n1}" y2="${s.nl - 12}"/>${T(s.nlx[i], s.nl, 'f18-tk', fmt(r), 'middle')}</g>`;
      });
      h += T(s.rX, s.nl, 'f18-tk', 'R', 'end');
      h += `<line class="f18-eksen" x1="${s.x0}" x2="${X(20)}" y1="${s.ax}" y2="${s.ax}"/>`;
      [0, 5, 10, 15, 20].forEach((v) => {
        h += `<line class="f18-eksen" x1="${X(v)}" x2="${X(v)}" y1="${s.ax}" y2="${s.ax + 4}"/>`;
        h += v === 20 ? T(X(v) + 8, s.tl, 'f18-tk', '20 kPa', 'end') : T(X(v), s.tl, 'f18-tk', v, 'middle');
      });
      sahne.innerHTML = svgAc(L, `${S.ad}: tüketilen ${S.n} O₂, üretilen ${S.m} CO₂, R = ${fmt(S.R)}. Altta oda havasında hesaplanan PAO₂ şeridi`, h);
      const q = (k) => sahne.querySelector(`[data-k="${k}"]`);
      E.o2 = [...sahne.querySelectorAll('.f18-j-o2')];
      E.co2 = [...sahne.querySelectorAll('.f18-j-co2')];
      E.su = [...sahne.querySelectorAll('.f18-j-su')];
      E.inN = q('inN'); E.outN = q('outN'); E.bar = q('bar'); E.tar = q('tar'); E.barT = q('barT'); E.tarT = q('tarT');
      E.cen = [...sahne.querySelectorAll('.f18-centik')];
      ciz(); serit();
    };

    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-s]');
      if (b) {
        if (b.dataset.s === sec) return;
        const eski = dPA;
        sec = b.dataset.s; basSec(el, 's', sec); t = TA;
        const hedefPA = pao2(FIO2_HAVA, PB_DENIZ, PC, SUB[sec].R);
        if (RM) dPA = hedefPA; else tw = { a: eski, b: hedefPA, p: 0 };
        kur(); capY(SUB[sec].cap);
        return;
      }
      if (e.target.closest('.f18-oyna')) { oyna = !oyna; oyB.textContent = oyna ? 'Duraklat' : 'Oynat'; }
    });
    kur();
    const durRO = genislikIzle(el, kur);
    const dur = ticker(el, (dt) => {
      if (tw) { tw.p = Math.min(1, tw.p + dt / 0.5); dPA = lerp(tw.a, tw.b, ease(tw.p)); serit(); if (tw.p >= 1) tw = null; }
      if (oyna) { t += dt; if (t >= TP) t -= TP; ciz(); }
    });
    return () => { dur(); durRO(); };
  };

  /* ---------- 2 · Denklemi basamak basamak çözün ---------- */
  VIZ.f18_basamak = (el) => {
    const EX = {
      deniz: { ad: 'Deniz seviyesi', pb: PB_DENIZ, pbT: '101,325', pc: 5.3, pcT: '5,3', yer: 'deniz seviyesi',
        son: '<b>Sonuç: PAO₂ 13,3 kPa.</b> Deniz seviyesinde oda havası soluyan tipik hastanın alveoler O₂ basıncı (≈100 mmHg). [[K1 s. 78]]' },
      opioid: { ad: 'Opioid aşırı dozu', pb: PB_DENIZ, pbT: '101,325', pc: 9, pcT: '9', yer: 'deniz seviyesi',
        son: "<b>Sonuç: PAO₂ 8,6 kPa.</b> Opioid solunum merkezini baskılar, V̇A azalır ve PaCO₂ 9 kPa'ya yükselir; bu PAO₂ yaklaşık %91'lik SaO₂'ye karşılık gelir. Akciğer hastalığı gerekmez, A–a gradyanı normaldir. [[K1 s. 78]]" },
      tibet: { ad: 'Tibet, hiperventilasyonsuz', pb: 65, pbT: '65', pc: 5.3, pcT: '5,3', yer: 'Tibet Platosu',
        son: "<b>Sonuç: PAO₂ 5,7 kPa.</b> FiO₂ aynı, PB düşük. Fizyolojik şant PaO₂'yi bunun da altına indirir: belirgin hipoksemi. [[K1 s. 78]]" },
      tibetHV: { ad: 'Tibet, hiperventilasyonla', pb: 65, pbT: '65', pc: 3.0, pcT: '3,0', yer: 'Tibet Platosu',
        son: "<b>Sonuç: PAO₂ 8,5 kPa.</b> Hiperventilasyon PaCO₂'yi 3,0 kPa'ya indirir ve çıkarılan terim küçülür: yükseklikte yaşamaya yetecek PAO₂; bedeli kronik solunumsal alkaloz. [[K1 s. 78–79]]" },
    };
    const SIRA = ['deniz', 'opioid', 'tibet', 'tibetHV'];
    const LW = { W: 720, H: 400, dar: false, ax1: 70, y0: 360, k1: 3, top1: 30, c0: 110, c1: 210, sx: 220, ax2: 430, k2: 12, top2: 60, b0: 470, b1: 590, lx: 600, refE: 712 };
    const LN = { W: 360, H: 390, dar: true, ax1: 40, y0: 360, k1: 3, top1: 30, c0: 60, c1: 120, sx: 126, ax2: 215, k2: 12, top2: 60, b0: 235, b1: 295, lx: 300, refE: 352 };
    const capY = capYazici(el);
    let ex = 'deniz', adim = RM ? 5 : 1, oyna = false, acc = 0, L = null, tw = null;
    let gPB = EX.deniz.pb, gSUB = EX.deniz.pc / R_DIYET; // çizimde kullanılan (geçişli) değerler
    const ESIK = { lift: 2, a3: 3, dol: 4, a5: 5 }, SURE = { lift: 0.4, a3: 0.35, dol: 0.5, a5: 0.35 };
    const an = {};
    for (const n in ESIK) an[n] = adim >= ESIK[n] ? 1 : 0;
    const E = {};
    el.innerHTML = `
      <div class="f18-ctl">${segHtml('Kitabın örneği', 'e', SIRA.map((k) => [k, EX[k].ad]), ex)}</div>
      <div class="f18-ctl f18-adimlar">
        <div class="btn-row">
          <button type="button" class="btn ghost" data-a="geri" aria-label="Önceki adım">◀<span class="f18-uzun"> Geri</span></button>
          <button type="button" class="btn" data-a="ileri" aria-label="Sonraki adım"><span class="f18-uzun">İleri </span>▶</button>
          <button type="button" class="btn ghost" data-a="bas">Baştan</button>
          ${RM ? '' : '<button type="button" class="btn ghost" data-a="oyna">Oynat</button>'}
        </div>
        <span class="f18-adim" aria-live="polite"></span>
      </div>
      <p class="f18-denk" aria-live="polite"></p>
      <div class="f18-sahne f18-bs"></div>`;
    const $ = (s) => el.querySelector(s);
    const sahne = $('.f18-sahne'), denkEl = $('.f18-denk'), adimEl = $('.f18-adim'), oyB = $('[data-a="oyna"]');
    const hedef = () => { const e = EX[ex], kuru = e.pb - PSVP, pio = FIO2_HAVA * kuru, sub = e.pc / R_DIYET; return { e, kuru, pio, sub, pa: pio - sub }; };

    const adimCap = () => {
      const { e, kuru, pio, sub } = hedef(), deniz = e.pb > 100;
      return [
        null,
        `<b>1 · Barometrik basınç.</b> ${deniz ? 'Deniz seviyesinde PB 101,325 kPa (760 mmHg)' : "Tibet Platosu'nda PB 65 kPa"}. Yükseldikçe PB üstel olarak azalır. [[K1 s. 77–78]]`,
        `<b>2 · Su buharı.</b> İnspire edilen hava karinaya ulaştığında su buharıyla tam olarak doymuştur; vücut sıcaklığında su buharı 6,3 kPa'lık pay alır. Geriye ${fmt(kuru)} kPa kuru gaz kalır. [[K1 s. 77]]`,
        `<b>3 · O₂ fraksiyonu.</b> Kuru havanın %20,93'ü O₂'dir; bu oran yükseklikte de değişmez. Karinadaki nemlendirilmiş gazın PO₂'si (PIO₂) = ${fmt(kuru)} × 0,2093 = ${fmt(pio)} kPa. [[K1 s. 77–78, 80]]`,
        `<b>4 · PaCO₂/R çıkarılır.</b> Alveolde O₂ kana geçerken CO₂ alveole girer. PaCO₂ ${e.pcT} kPa ve R 0,8: ${e.pcT}/0,8 = ${fmt(sub)} kPa düşülür. [[K1 s. 77–78]]`,
        e.son,
      ][adim];
    };

    const yaz = () => {
      const { e, pio, sub, pa } = hedef();
      const on = (s, k) => `<span class="f18-dt${adim === k ? ' on' : ''}">${s}</span>`;
      if (adim === 5) denkEl.innerHTML = `<span class="f18-dg">PAO₂ = ${fmt(pio)} − ${fmt(sub)} = <span class="f18-dt on">${fmt(pa)} kPa</span></span>`;
      else {
        const fi = adim >= 3 ? on('0,2093', 3) : 'FiO₂', sv = adim >= 2 ? on('6,3', 2) : 'PSVP su';
        const pc = adim >= 4 ? on(e.pcT, 4) : 'PaCO₂', r = adim >= 4 ? on('0,8', 4) : 'R';
        denkEl.innerHTML = `<span class="f18-dg">PAO₂ = ${fi} × (${on(e.pbT, 1)} − ${sv})</span> <span class="f18-dg">− ${pc} / ${r}</span>`;
      }
      adimEl.textContent = `Adım ${adim} / 5`;
      $('[data-a="geri"]').disabled = adim <= 1;
      $('[data-a="ileri"]').disabled = adim >= 5;
      if (oyB) oyB.textContent = oyna ? 'Durdur' : 'Oynat';
    };

    const kur = () => {
      const dar = el.clientWidth < DAR;
      L = dar ? LN : LW;
      el.classList.toggle('f18-dar', dar);
      const y1 = (p) => L.y0 - L.k1 * p, y2 = (p) => L.y0 - L.k2 * p, cw = L.c1 - L.c0, bw = L.b1 - L.b0;
      let h = taramaDef('f18-tarama-bs');
      // sol: tam ölçek
      h += `<line class="f18-eksen" x1="${L.ax1}" x2="${L.ax1}" y1="${L.y0}" y2="${L.top1}"/>`;
      [0, 25, 50, 75, 100].forEach((v) => { h += `<line class="f18-eksen" x1="${L.ax1 - 4}" x2="${L.ax1}" y1="${y1(v)}" y2="${y1(v)}"/>` + T(L.ax1 - 7, y1(v) + 4, 'f18-tk', v, 'end'); });
      h += T(dar ? 6 : L.ax1 - 30, L.top1 - 10, 'f18-tk', 'kPa · tam ölçek');
      h += `<line class="f18-eksen" x1="${L.ax1}" x2="${L.c1 + 6}" y1="${L.y0}" y2="${L.y0}"/>`;
      h += `<rect class="f18-b-ana" data-k="ana" x="${L.c0}" width="${cw}"/>`;
      h += `<rect class="f18-b-su" data-k="su" x="${L.c0}" width="${cw}" height="${(L.k1 * PSVP).toFixed(1)}"/>`;
      h += `<rect class="f18-b-o2" data-k="o2" x="${L.c0}" width="${cw}"/>`;
      ['loc', 'pbIn', 'pbBas', 'suT', 'kuruT', 'n2T', 'o2T', 'o2bT'].forEach((k) => { h += `<text data-k="${k}"></text>`; });
      // huni (yakınlaştırma)
      h += `<g data-k="huni"><line class="f18-huni" data-k="h1"/><line class="f18-huni" x1="${L.c1}" y1="${L.y0}" x2="${L.b0}" y2="${L.y0}"/></g>`;
      // sağ: büyütülmüş O₂ ölçeği
      h += `<g data-k="sag"><line class="f18-eksen" x1="${L.ax2}" x2="${L.ax2}" y1="${L.y0}" y2="${L.top2}"/>`;
      [0, 5, 10, 15, 20, 25].forEach((v) => { h += `<line class="f18-eksen" x1="${L.ax2 - 4}" x2="${L.ax2}" y1="${y2(v)}" y2="${y2(v)}"/>` + T(L.ax2 - 7, y2(v) + 4, 'f18-tk f18-halo', v, 'end'); });
      h += T(L.ax2 - (dar ? 22 : 24), L.top2 - (dar ? 12 : 14), 'f18-tk', 'büyütülmüş ölçek (kPa)');
      h += `<line class="f18-eksen" x1="${L.ax2}" x2="${L.b1 + 6}" y1="${L.y0}" y2="${L.y0}"/>`;
      const ry = y2(13.3);
      h += `<line class="f18-ref" x1="${L.ax2}" x2="${L.refE}" y1="${ry}" y2="${ry}"/>`;
      h += dar
        ? T(L.ax2 - 7, ry + 4, 'f18-tk f18-acct f18-halo', '13,3', 'end') + T(L.ax2 - 7, ry + 16, 'f18-tk f18-halo', 'normal', 'end')
        : T(L.refE, ry - 5, 'f18-tk', 'normal PAO₂ 13,3', 'end');
      h += `<rect class="f18-b-bar" data-k="bar" x="${L.b0}" width="${bw}"/>`;
      h += `<rect fill="url(#f18-tarama-bs)" class="f18-tar" data-k="tar" x="${L.b0}" width="${bw}"/>`;
      h += `<rect class="f18-b-pa" data-k="pa" x="${L.b0}" width="${bw}"/>`;
      ['pioT', 'tarT', 'paT1', 'paT2', 'notT'].forEach((k) => { h += `<text data-k="${k}"></text>`; });
      h += '</g>';
      sahne.innerHTML = svgAc(L, 'Basınç merdiveni: barometrik basınçtan su buharı, O₂ fraksiyonu ve PaCO₂/R düşülerek PAO₂ bulunur; solda tam ölçek, sağda büyütülmüş O₂ ölçeği', h);
      sahne.querySelectorAll('[data-k]').forEach((n) => { E[n.dataset.k] = n; });
      ciz();
    };

    const ciz = () => {
      const t = hedef(), { e } = t, y1 = (p) => L.y0 - L.k1 * p, y2 = (p) => L.y0 - L.k2 * p, cx = (L.c0 + L.c1) / 2, bx = (L.b0 + L.b1) / 2;
      const pb = gPB, kuru = pb - PSVP, pio = FIO2_HAVA * kuru, sub = gSUB, pa = pio - sub, dar = L.dar;
      const lift = ease(an.lift) * 6, a3 = ease(an.a3), dol = ease(an.dol), a5 = ease(an.a5);
      const yaz1 = (k, cls, x, y, a, sat, lh) => { const n = E[k]; n.setAttribute('class', cls); at(n, { x, y }); n.setAttribute('text-anchor', a); if (Array.isArray(sat)) satir(n, x, sat, lh); else n.textContent = sat; };
      // sol sütun
      if (adim === 1) at(E.ana, { y: y1(pb), height: L.k1 * pb });
      else at(E.ana, { y: y1(kuru), height: L.k1 * kuru });
      gor(E.su, adim >= 2); at(E.su, { y: y1(pb) - lift });
      gor(E.o2, adim >= 3); at(E.o2, { y: y1(pio), height: L.k1 * pio }); opak(E.o2, a3);
      gor(E.loc, adim === 1); gor(E.pbIn, adim === 1);
      if (adim === 1) {
        if (dar) yaz1('loc', 'f18-lb', cx, y1(pb) - 8, 'middle', e.yer);
        else yaz1('loc', 'f18-lb', L.sx, y1(pb) + 16, 'start', e.yer);
        const m = (y1(pb) + L.y0) / 2;
        if (dar) yaz1('pbIn', 'f18-mn', cx, m - 14, 'middle', ['<tspan class="f18-lbk">PB</tspan>', e.pbT, 'kPa'], 15);
        else yaz1('pbIn', 'f18-mn', cx, m - 6, 'middle', ['<tspan class="f18-lbk">PB</tspan>', `${e.pbT} kPa`], 19);
      }
      gor(E.pbBas, adim >= 2); gor(E.suT, adim >= 2);
      if (adim >= 2) {
        yaz1('pbBas', 'f18-mn', cx, y1(pb) - lift - 8, 'middle', dar ? `PB ${e.pbT}` : `PB ${e.pbT} kPa`);
        if (dar) yaz1('suT', 'f18-lb f18-sut', L.sx, y1(pb) - lift + 5, 'start', ['su buharı', '6,3'], 14);
        else yaz1('suT', 'f18-lb f18-sut', L.sx, y1(pb) - lift + 14, 'start', 'su buharı 6,3');
      }
      gor(E.kuruT, adim === 2);
      if (adim === 2) {
        const m = (y1(kuru) + L.y0) / 2;
        if (dar) yaz1('kuruT', 'f18-lb', L.sx, m - 4, 'start', ['kuru gaz', fmt(t.kuru)], 15);
        else yaz1('kuruT', 'f18-lb', L.sx, m + 4, 'start', `kuru gaz ${fmt(t.kuru)}`);
      }
      gor(E.n2T, adim >= 3); gor(E.o2T, adim >= 3); gor(E.o2bT, adim >= 3 && dar);
      if (adim >= 3) {
        const n2 = fmt(t.kuru - t.pio), mo = (y1(pio) + L.y0) / 2;
        if (dar) {
          yaz1('n2T', 'f18-lb f18-mutt', cx, y1(kuru) + 18, 'middle', ['N₂ +', 'diğer', n2], 15);
          yaz1('o2T', 'f18-lb f18-papt', cx, mo - 3, 'middle', ['O₂', fmt(t.pio)], 14);
          yaz1('o2bT', 'f18-tk', L.sx, L.y0 - 8, 'start', '× %20,93');
        } else {
          yaz1('n2T', 'f18-lb f18-mutt', L.sx, y1(kuru) + 18, 'start', `N₂ ve diğer gazlar ${n2}`);
          yaz1('o2T', 'f18-lb f18-o2t', L.sx, mo + 4, 'start', `O₂ %20,93 = ${fmt(t.pio)}`);
        }
        [E.n2T, E.o2T, E.o2bT].forEach((n) => opak(n, a3));
      }
      // huni ve sağ panel
      gor(E.huni, adim >= 3); gor(E.sag, adim >= 3);
      opak(E.huni, a3); opak(E.sag, a3);
      at(E.h1, { x1: L.c1, y1: y1(pio), x2: L.b0, y2: y2(pio) });
      at(E.bar, { y: y2(pio), height: L.k2 * pio });
      yaz1('pioT', 'f18-mn f18-halo', bx, y2(pio) - 8, 'middle', dar ? `PIO₂ ${fmt(t.pio)}` : `PIO₂ ${fmt(t.pio)} kPa`);
      gor(E.tar, adim >= 4); gor(E.tarT, adim >= 4);
      at(E.tar, { y: y2(pio), height: L.k2 * sub * dol });
      if (adim >= 4) {
        let c = (y2(pio) + y2(pa)) / 2;
        const ry = y2(13.3);
        if (dar) {
          if (c > ry - 24 && c < ry + 24) c = c < ry ? ry - 26 : ry + 26; // kesik "normal" çizgisi yazının içinden geçmesin
          yaz1('tarT', 'f18-lb f18-co2t f18-halo', L.lx, c - 10, 'start', ['−PaCO₂/R', `${e.pcT}/0,8`, `= ${fmt(t.sub)}`], 14);
        } else {
          if (c > ry - 28 && c < ry + 17) c = c < ry - 5 ? ry - 32 : ry + 22; // "normal" etiketinin üstüne binmesin
          yaz1('tarT', 'f18-lb f18-co2t', L.lx, c - 4, 'start', ['− PaCO₂/R', `${e.pcT}/0,8 = ${fmt(t.sub)}`], 17);
        }
        opak(E.tarT, dol);
      }
      gor(E.pa, adim >= 5); gor(E.paT1, adim >= 5); gor(E.paT2, adim >= 5);
      at(E.pa, { y: y2(pa), height: Math.max(0, L.k2 * pa) });
      opak(E.pa, a5);
      if (adim >= 5) {
        const m = (y2(pa) + L.y0) / 2;
        yaz1('paT1', 'f18-lb f18-papt', bx, m - 5, 'middle', 'PAO₂');
        yaz1('paT2', 'f18-pa-t', bx, m + 15, 'middle', dar ? fmt(t.pa) : `${fmt(t.pa)} kPa`);
        opak(E.paT1, a5); opak(E.paT2, a5);
      }
      const fark = adim >= 5 && ex !== 'deniz';
      gor(E.notT, fark);
      if (fark) {
        const d = fmt(13.3 - yuv(t.pa));
        if (dar) yaz1('notT', 'f18-lb f18-mutt', L.lx, y2(pa) + 16, 'start', ['normalden', `${d} kPa`, 'düşük'], 14);
        else yaz1('notT', 'f18-lb f18-mutt', L.lx, y2(pa) + 18, 'start', ['normalden', `${d} kPa düşük`], 16);
        opak(E.notT, a5);
      }
    };

    const git = (k) => {
      const eski = adim;
      adim = clamp(k, 1, 5);
      for (const n in an) { if (adim < ESIK[n]) an[n] = 0; else if (RM || eski >= ESIK[n]) an[n] = 1; }
      yaz(); ciz(); capY(adimCap());
    };
    const durdur = () => { oyna = false; acc = 0; if (oyB) oyB.textContent = 'Oynat'; };
    el.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-e]');
      if (b) {
        if (b.dataset.e === ex) return;
        ex = b.dataset.e; basSec(el, 'e', ex);
        const { e } = hedef();
        if (RM) { gPB = e.pb; gSUB = e.pc / R_DIYET; } else tw = { pa: gPB, pb: e.pb, sa: gSUB, sb: e.pc / R_DIYET, p: 0 };
        yaz(); ciz(); capY(adimCap());
        return;
      }
      const a = ev.target.closest('[data-a]');
      if (!a) return;
      const k = a.dataset.a;
      if (k === 'oyna') {
        if (oyna) { durdur(); return; }
        oyna = true; acc = 0;
        if (adim >= 5) git(1); else yaz();
        return;
      }
      durdur();
      if (k === 'geri') git(adim - 1);
      else if (k === 'ileri') git(adim + 1);
      else if (k === 'bas') git(1);
    });
    yaz(); kur();
    const durRO = genislikIzle(el, kur);
    const dur = ticker(el, (dt) => {
      let kirli = false;
      for (const n in an) if (adim >= ESIK[n] && an[n] < 1) { an[n] = Math.min(1, an[n] + dt / SURE[n]); kirli = true; }
      if (tw) {
        tw.p = Math.min(1, tw.p + dt / 0.6);
        const f = ease(tw.p);
        gPB = lerp(tw.pa, tw.pb, f); gSUB = lerp(tw.sa, tw.sb, f); kirli = true;
        if (tw.p >= 1) tw = null;
      }
      if (oyna) {
        acc += dt;
        if (acc >= 2.2) { acc = 0; git(adim + 1); if (adim >= 5) durdur(); }
      }
      if (kirli) ciz();
    });
    return () => { dur(); durRO(); };
  };

  /* ---------- 3 · A–a gradyanıyla hipokseminin nedenini ayırın ---------- */
  VIZ.f18_aa = (el) => {
    const OLGU = {
      saglikli: { ad: 'Sağlıklı genç', fi: 0.21, pc: 5.3, pa: 12.8, yaprak: null,
        cap: "<b>Sağlıklı genç erişkin.</b> PAO₂ 13,3, PaO₂ 12,8 kPa: A–a 0,5 kPa. Bronşiyal ve Thebesius venlerinin küçük anatomik şantı yüzünden gradyan sıfır değildir, ama 1,5 kPa'nın altındadır. [[K1 s. 78]]" },
      cihaz: { ad: 'Arızalı cihaz', fi: 0.14, pc: 5.3, pa: 6.2, yaprak: 'pio2',
        cap: '<b>Hipoksik karışım.</b> FiO₂ 0,14 (örnek): PIO₂ 13,3, PAO₂ 6,7 kPa. PaO₂ düşük PAO₂\'yi izler; A–a 0,5 kPa, normal. Sorun akciğerde değil, solunan gazdadır. [[K1 s. 78]]' },
      opioid: { ad: 'Opioid', fi: 0.21, pc: 9.0, pa: 8.0, yaprak: 'paco2',
        cap: '<b>Alveoler hipoventilasyon.</b> PaCO₂ 9 kPa: PAO₂ 8,6 kPa. A–a 0,6 kPa, normal: denklem alveoler ventilasyonu PaCO₂ üzerinden zaten hesaba katar. [[K1 s. 78]]' },
      pnomoni: { ad: 'Pnömoni', fi: 0.21, pc: 4.5, pa: 7.5, yaprak: 'vq',
        cap: '<b>V̇/Q̇ uyumsuzluğu.</b> PAO₂ 14,3 kPa iken PaO₂ 7,5 kPa: A–a 6,8 kPa. Artmış gradyanın açık ara en sık nedeni; pnömoni, ARDS, atelektazi. [[K1 s. 78]]' },
      sant: { ad: 'İntrakardiyak şant', fi: 0.21, pc: 5.0, pa: 6.0, yaprak: 'sant',
        cap: '<b>Sağdan sola şant.</b> Kanın bir bölümü gaz değişimine katılmadan arteriyel tarafa geçer: A–a 7,6 kPa. Örnekler intrakardiyak şant ve pulmoner AVM. [[K1 s. 78]]' },
      fibrozis: { ad: 'Pulmoner fibrozis', fi: 0.21, pc: 4.6, pa: 8.0, yaprak: 'dif',
        cap: '<b>Ağır difüzyon bozukluğu.</b> Son dönem pulmoner fibroziste bariyer kalınlaşır: A–a 6,1 kPa. Difüzyon sınırlaması ancak ağır hastalıkta hipokseminin nedeni olur. [[K1 s. 63, 78]]' },
    };
    const SIRA = ['saglikli', 'cihaz', 'opioid', 'pnomoni', 'sant', 'fibrozis'];
    const LW = { W: 360, H: 324, dar: false, ax: 44, y0: 290, yT: 36, bx: [64, 140, 216], bw: 58, kx: 282, lx: 290, alt: [307, 320], leg: [170, 16] };
    const LN = { W: 330, H: 262, dar: true, ax: 38, y0: 226, yT: 30, bx: [56, 128, 200], bw: 54, kx: 260, lx: 267, alt: [243, 257], leg: [148, 15] };
    const capY = capYazici(el);
    let fi = 0.21, pc = 5.3, pa = 12.8, olgu = 'saglikli', L = null;
    const E = {}, g = {};
    const yap = (id, b, s, o, oK) => `<div class="f18-yap" data-y="${id}"><b>${b}</b>${s ? `<span>${s}</span>` : ''}<em>${oK ? `<span class="f18-uzun">${o}</span><span class="f18-kisa">${oK}</span>` : o}</em><i class="f18-bu-et">bu olgu</i></div>`;
    const rng = (k, ad, min, max, st, v) => `<label class="f18-rng"><span>${ad} <b data-v="${k}"></b></span><input type="range" min="${min}" max="${max}" step="${st}" value="${v}" data-r="${k}" aria-label="${ad}"></label>`;
    el.innerHTML = `
      <div class="f18-ctl">${segHtml('Olgu', 'o', SIRA.map((k) => [k, OLGU[k].ad]), olgu)}</div>
      <div class="f18-aa-rng">${rng('fi', 'FiO₂', 0.1, 0.4, 0.01, 0.21)}${rng('pc', 'PaCO₂', 3, 12, 0.1, 5.3)}${rng('pa', 'Ölçülen PaO₂', 2, 35, 0.1, 12.8)}</div>
      <div class="f18-cipler" aria-live="polite"><span class="f18-cip" data-c="pio"></span><span class="f18-cip" data-c="pA"></span><span class="f18-cip" data-c="pa"></span><span class="f18-cip" data-c="aa"></span></div>
      <div class="f18-aa-izgara">
        <div class="f18-sahne f18-aa-graf"></div>
        <div class="f18-akis" role="group" aria-label="Hipokseminin tanı akışı">
          <p class="f18-uyari" hidden>FiO₂ &gt; 0,21: 1,5 kPa sınırı yalnız oda havası için geçerlidir (Atlas notu).</p>
          <div class="f18-ak-k f18-ak-ust"><b>Hipoksemi</b></div>
          <div class="f18-ak-ok" aria-hidden="true"></div>
          <div class="f18-ak-k">PAO₂'yi AGE ile hesapla<br><span class="f18-ak-mono">A–a = PAO₂ − PaO₂</span></div>
          <div class="f18-ak-catal" aria-hidden="true"></div>
          <div class="f18-dallar">
            <div class="f18-dal" data-dal="n"><div class="f18-dal-b">A–a normal (&lt;1,5 kPa)<span class="f18-sinirli" hidden> (yorum sınırlı)</span></div>${yap('pio2', 'PIO₂ düşük', 'hipoksik karışım', 'ör. arızalı anestezi cihazı')}${yap('paco2', 'PaCO₂ yüksek', 'alveoler hipoventilasyon', 'hava yolu obstrüksiyonu, nöromüsküler hastalık, ilaca bağlı solunum depresyonu', 'obstrüksiyon · nöromüsküler · ilaç')}</div>
            <div class="f18-dal" data-dal="a"><div class="f18-dal-b">A–a artmış (≥1,5 kPa)<span class="f18-sinirli" hidden> (yorum sınırlı)</span></div>${yap('vq', 'V̇/Q̇ uyumsuzluğu', 'en sık', 'pnömoni, ARDS, atelektazi')}${yap('sant', 'Sağdan sola şant', '', 'pulmoner AVM, intrakardiyak şant')}${yap('dif', 'Ağır difüzyon bozukluğu', '', 'son dönem pulmoner fibrozis')}</div>
          </div>
        </div>
      </div>`;
    const $ = (s) => el.querySelector(s);
    const sahne = $('.f18-sahne'), uyari = $('.f18-uyari');
    const hesap = () => {
      const fiE = Math.abs(fi - 0.21) < 0.001 ? FIO2_HAVA : fi;
      const PIO = pio2(fiE, PB_DENIZ), PA = PIO - pc / R_DIYET, aa = PA - pa, aaR = yuv(aa);
      const durum = aaR < -0.05 ? 'ters' : aaR < 1.5 ? 'n' : 'a';
      return { fiE, PIO, PA, aa, durum, dusukFi: fi < 0.205, yuksekPc: pc > 6.0, yuksekFi: fi > 0.215 };
    };
    const ymHedef = (d) => { const m = Math.max(d.PIO, d.PA, pa); return m <= 20 ? 20 : m <= 30 ? 30 : 40; };

    const kurGraf = () => {
      const dar = el.clientWidth < DAR;
      L = dar ? LN : LW;
      el.classList.toggle('f18-dar', dar);
      const [x0, x1, x2] = L.bx, w = L.bw;
      let h = taramaDef('f18-tarama-aa');
      h += `<g data-k="izg"></g>`;
      h += `<line class="f18-ref" data-k="ref" x1="${L.ax}" x2="${L.kx - 4}"/>`;
      h += `<line class="f18-ref" x1="${L.leg[0]}" x2="${L.leg[0] + 20}" y1="${L.leg[1] - 4}" y2="${L.leg[1] - 4}"/>` + T(L.leg[0] + 25, L.leg[1], 'f18-tk', 'normal PAO₂ 13,3');
      h += T(L.ax - 6, L.yT - 14, 'f18-tk', 'kPa', 'end');
      h += `<rect class="f18-aa-pio" data-k="b0" x="${x0}" width="${w}"/>`;
      h += `<rect fill="url(#f18-tarama-aa)" class="f18-tar" data-k="gh" x="${x1}" width="${w}"/>`;
      h += `<rect class="f18-aa-pA" data-k="b1" x="${x1}" width="${w}"/>`;
      h += `<rect class="f18-aa-pa" data-k="b2" x="${x2}" width="${w}"/>`;
      h += `<line class="f18-eksen" x1="${L.ax}" x2="${L.ax}" y1="${L.y0}" y2="${L.yT}"/><line class="f18-eksen" x1="${L.ax}" x2="${L.kx}" y1="${L.y0}" y2="${L.y0}"/>`;
      h += `<rect class="f18-pill" data-k="ghR" rx="4" height="17"/>`;
      ['v0', 'v1', 'v2', 'ghT'].forEach((k) => { h += `<text data-k="${k}" text-anchor="middle"></text>`; });
      [['PIO₂', 'inspire'], ['PAO₂', 'hesaplanan'], ['PaO₂', 'ölçülen']].forEach(([a, b], i) => { h += T(L.bx[i] + w / 2, L.alt[0], 'f18-lb', a, 'middle') + T(L.bx[i] + w / 2, L.alt[1], 'f18-tk', b, 'middle'); });
      h += `<g class="f18-aa-g" data-k="aaG"><line class="f18-aa-l" data-k="aaL"/><path class="f18-aa-b" data-k="aaB"/>${T(L.lx, 0, 'f18-aa-t1', 'A–a', 'start', ' data-k="aaT1"')}${T(L.lx, 0, 'f18-aa-t2', '', 'start', ' data-k="aaT2"')}</g>`;
      sahne.innerHTML = svgAc(L, 'Çubuk grafiği: inspire PIO₂, hesaplanan PAO₂ ve ölçülen PaO₂; PAO₂ ile PaO₂ arasındaki fark A–a gradyanıdır', h);
      sahne.querySelectorAll('[data-k]').forEach((n) => { E[n.dataset.k] = n; });
      E.ymSon = null;
      cizGraf();
    };

    const cizGraf = () => {
      const d = hesap(), Y = (v) => L.y0 - (clamp(v, 0, g.ym) / g.ym) * (L.y0 - L.yT), [x0, x1, x2] = L.bx, w = L.bw;
      if (E.ymSon === null || Math.abs(g.ym - E.ymSon) > 0.01) {
        E.ymSon = g.ym;
        let s = '';
        for (let v = 0; v <= g.ym + 0.01; v += 5) { const y = Y(v).toFixed(1); s += `<line class="f18-izgara" x1="${L.ax}" x2="${L.kx - 4}" y1="${y}" y2="${y}"/>` + T(L.ax - 6, (+y + 4).toFixed(1), 'f18-tk', v, 'end'); }
        E.izg.innerHTML = s;
        const ry = Y(13.3);
        at(E.ref, { y1: ry, y2: ry });
      }
      const bar = (r, v) => { const y = Y(v); at(r, { y, height: L.y0 - y }); };
      bar(E.b0, g.pio); bar(E.b1, g.pA); bar(E.b2, g.paO);
      const yP = Y(g.pio), yA = Y(g.pA), ya = Y(g.paO);
      at(E.gh, { y: yP, height: Math.max(0, yA - yP) });
      const deger = (t, x, y, ic, txt) => {
        const icte = L.y0 - y >= 22;
        at(t, { x: x + w / 2, y: icte ? y + 15 : y - 5 });
        t.setAttribute('class', 'f18-mn ' + (icte ? ic : 'f18-inkt f18-halo'));
        t.textContent = txt;
      };
      deger(E.v0, x0, yP, 'f18-inkt', fmt(d.PIO));
      deger(E.v1, x1, yA, 'f18-papt', fmt(d.PA));
      deger(E.v2, x2, ya, 'f18-papt', fmt(pa));
      const ghOn = yA - yP >= 20 && L.y0 - yA >= 22, gy = (yP + yA) / 2;
      gor(E.ghT, ghOn); gor(E.ghR, ghOn);
      at(E.ghT, { x: x1 + w / 2, y: gy + 4 });
      E.ghT.setAttribute('class', 'f18-mn f18-co2t');
      E.ghT.textContent = `−${fmt(pc / R_DIYET)}`;
      if (ghOn) { const tl = E.ghT.getComputedTextLength() || 32; at(E.ghR, { x: x1 + w / 2 - tl / 2 - 4, y: gy - 8.5, width: tl + 8 }); }
      const xL = x1 + w, kx = L.kx;
      at(E.aaL, { x1: xL, x2: kx, y1: yA, y2: yA });
      E.aaB.setAttribute('d', `M${kx - 6} ${yA.toFixed(1)} H${kx} V${ya.toFixed(1)} H${kx - 6}`);
      const c = clamp((yA + ya) / 2, L.yT + 10, L.y0 - 20);
      at(E.aaT1, { y: c - 2 }); at(E.aaT2, { y: c + 14 });
      E.aaT2.textContent = L.dar ? fmt(d.aa) : `${fmt(d.aa)} kPa`;
      E.aaG.setAttribute('class', 'f18-aa-g ' + (d.durum === 'n' ? 'ok' : d.durum === 'a' ? 'crit' : 'warn'));
    };

    const yazDeger = () => {
      const d = hesap();
      $('[data-v="fi"]').textContent = Math.abs(fi - 0.21) < 0.001 ? '0,21' : fmt(fi, 2);
      $('[data-v="pc"]').textContent = `${fmt(pc)} kPa`;
      $('[data-v="pa"]').textContent = `${fmt(pa)} kPa`;
      const c = (k) => $(`[data-c="${k}"]`);
      c('pio').textContent = `PIO₂ ${fmt(d.PIO)} kPa`;
      c('pA').textContent = `PAO₂ ${fmt(d.PA)} kPa`;
      c('pa').textContent = `PaO₂ ${fmt(pa)} kPa`;
      c('aa').textContent = `A–a ${fmt(d.aa)} kPa (≈${fmt(Math.round(d.aa * 7.50062), 0)} mmHg)`;
      c('aa').className = 'f18-cip ' + (d.durum === 'n' ? 'ok' : d.durum === 'a' ? 'crit' : 'warn');
      // tanı akışı
      const dal = (k) => $(`[data-dal="${k}"]`), yp = (k) => $(`[data-y="${k}"]`);
      dal('n').classList.toggle('on', d.durum === 'n');
      dal('a').classList.toggle('on', d.durum === 'a');
      const yanar = { pio2: d.durum === 'n' && d.dusukFi, paco2: d.durum === 'n' && d.yuksekPc, vq: d.durum === 'a', sant: d.durum === 'a', dif: d.durum === 'a' };
      const kendi = olgu ? OLGU[olgu].yaprak : null;
      for (const k in yanar) {
        const n = yp(k);
        n.classList.toggle('on', yanar[k]);
        n.classList.toggle('bu', yanar[k] && k === kendi);
      }
      yp('paco2').classList.toggle('yumusak', d.durum === 'a' && d.yuksekPc);
      uyari.hidden = !d.yuksekFi;
      el.querySelectorAll('.f18-sinirli').forEach((s) => { s.hidden = !d.yuksekFi; });
      g.hedef = { pio: d.PIO, pA: d.PA, paO: pa, ym: ymHedef(d) };
      return d;
    };
    const genelCap = (d) => {
      if (d.durum === 'ters') return "<b>Ölçülen PaO₂ hesaplanan PAO₂'den yüksek olamaz.</b> FiO₂ ya da PaCO₂ değerini denetleyin. [[K1 s. 78]]";
      let ek;
      if (d.durum === 'n') {
        const p = [];
        if (d.dusukFi) p.push('PIO₂ düşük: hipoksik karışım.');
        if (d.yuksekPc) p.push('PaCO₂ yüksek: alveoler hipoventilasyon.');
        ek = p.length ? p.join(' ') : "Gradyan, PIO₂ ve PaCO₂ normal: akciğer O₂'yi normal aktarıyor.";
      } else {
        ek = 'Artmış gradyan V̇/Q̇ uyumsuzluğu, sağdan sola şant ya da ağır difüzyon bozukluğunu düşündürür; gradyan üçünü birbirinden ayırmaz.';
        if (d.yuksekPc) ek += ' PaCO₂ de yüksek: hipoventilasyon da katkıda bulunuyor.';
      }
      if (d.yuksekFi) ek += " FiO₂ 0,21'in üstünde: 1,5 kPa sınırıyla yorum sınırlıdır (Atlas notu).";
      const fiT = Math.abs(fi - 0.21) < 0.001 ? '0,2093' : fmt(fi, 2);
      return `<b>A–a ${fmt(d.aa)} kPa: ${d.durum === 'n' ? 'normal' : 'artmış'}.</b> PAO₂ = ${fiT} × (101,325 − 6,3) − ${fmt(pc)}/0,8 = ${fmt(d.PA)} kPa; ölçülen PaO₂ ${fmt(pa)} kPa. ${ek} [[K1 s. 77–78]]`;
    };
    const kaydiriciYaz = () => { $('[data-r="fi"]').value = fi; $('[data-r="pc"]').value = pc; $('[data-r="pa"]').value = pa; };

    el.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-o]');
      if (!b || b.tagName !== 'BUTTON') return;
      olgu = b.dataset.o; basSec(el, 'o', olgu);
      const O = OLGU[olgu];
      fi = O.fi; pc = O.pc; pa = O.pa; kaydiriciYaz();
      yazDeger(); capY(O.cap);
      if (RM) { Object.assign(g, g.hedef); cizGraf(); }
    });
    el.addEventListener('input', (ev) => {
      const r = ev.target.closest('[data-r]');
      if (!r) return;
      const v = +r.value;
      if (r.dataset.r === 'fi') fi = Math.round(v * 100) / 100; else if (r.dataset.r === 'pc') pc = Math.round(v * 10) / 10; else pa = Math.round(v * 10) / 10;
      if (olgu) { olgu = null; basSec(el, 'o', ''); }
      const d = yazDeger(); capY(genelCap(d));
      if (RM) { Object.assign(g, g.hedef); cizGraf(); }
    });
    yazDeger();
    Object.assign(g, g.hedef);
    kurGraf();
    const durRO = genislikIzle(el, kurGraf);
    const dur = ticker(el, (dt) => {
      const H = g.hedef;
      let kirli = false;
      for (const k of ['pio', 'pA', 'paO', 'ym']) {
        const fark = H[k] - g[k];
        if (Math.abs(fark) > 0.005) { g[k] += fark * (1 - Math.exp(-dt / (k === 'ym' ? 0.12 : 0.08))); kirli = true; }
        else if (g[k] !== H[k]) { g[k] = H[k]; kirli = true; }
      }
      if (kirli) cizGraf();
    });
    return () => { dur(); durRO(); };
  };

  /* ---------- 4 · Ventilasyon mu, O₂ mi? PAO₂ platosu ---------- */
  VIZ.f18_ventilasyon = (el) => {
    const FI = { '0.21': FIO2_HAVA, '0.3': 0.3, '0.4': 0.4 }, FIS = ['0.21', '0.3', '0.4'];
    const PB = { deniz: PB_DENIZ, tibet: 65 }; // Tibet Platosu, K1 s. 78
    const paco2 = (va) => 26.5 / va; // 5,3 kPa × 5 / V̇A: V̇A ×2 → PaCO₂ ÷2 (K1 s. 46–47)
    const PT = {
      normal: { ad: 'Normal', yer: 'deniz', va: 5.0 },
      opioid: { ad: 'Opioid', yer: 'deniz', va: 26.5 / 9, cap: '<b>Opioid aşırı dozu.</b> V̇A ≈ 2,9 L/dk, PaCO₂ 9 kPa: PAO₂ 8,6 kPa. [[K1 s. 78]]' },
      tibet: { ad: 'Tibet', yer: 'tibet', va: 5.0, cap: "<b>Tibet Platosu, hiperventilasyonsuz.</b> PB 65 kPa, PaCO₂ 5,3 kPa: PAO₂ 5,7 kPa; bütün eğriler aşağı iner, çünkü PIO₂ tavanları düşer (oda havasında 12,3 kPa). [[K1 s. 78]]" },
      tibetHV: { ad: 'Tibet + hiperventilasyon', yer: 'tibet', va: 26.5 / 3, cap: '<b>Tibet Platosu, hiperventilasyonla.</b> PaCO₂ 3,0 kPa (V̇A ≈ 8,8 L/dk): PAO₂ 8,5 kPa; bedeli kronik solunumsal alkaloz. [[K1 s. 78–79]]' },
    };
    const LW = { W: 720, H: 440, dar: false, x0: 70, kx: 560 / 15, uT: 20, uB: 130, aT: 160, aB: 400, rx: 636, tkY: 416, axY: 434 };
    const LN = { W: 360, H: 484, dar: true, x0: 44, kx: 18, uT: 20, uB: 120, aT: 150, aB: 440, rx: 318, tkY: 456, axY: 476 };
    const capY = capYazici(el);
    let yer = 'deniz', fiK = '0.21', pt = null, seq = null, kiyas = null, L = null, surukle = false, sonPB = null;
    const tw = { va: { v: 5, a: 5, b: 5, p: 1, d: 0.6 }, fi: { v: FIO2_HAVA, a: FIO2_HAVA, b: FIO2_HAVA, p: 1, d: 0.4 }, pb: { v: PB_DENIZ, a: PB_DENIZ, b: PB_DENIZ, p: 1, d: 0.6 } };
    const hedef = (k, b, d) => { const o = tw[k]; if (RM || !d) { o.v = o.a = o.b = b; o.p = 1; } else { o.a = o.v; o.b = b; o.p = 0; o.d = d; } };
    const E = {};
    el.innerHTML = `
      <div class="f18-v-ctl">
        <label class="f18-rng f18-v-va"><span>Alveoler ventilasyon V̇A <b data-o="va"></b></span><input type="range" min="2" max="15" step="0.1" value="5" data-r="va" aria-label="Alveoler ventilasyon V̇A, L/dk"></label>
        <div class="f18-v-seg">
          <div class="f18-segk"><span>FiO₂</span>${segHtml('FiO₂', 'f', FIS.map((k) => [k, k.replace('.', ',')]), fiK)}</div>
          <div class="f18-segk"><span>Yer</span>${segHtml('Yer', 'y', [['deniz', 'Deniz seviyesi'], ['tibet', 'Tibet Platosu (65 kPa)']], yer)}</div>
          <div class="f18-segk"><span>Kitabın noktaları</span>${segHtml('Kitabın noktaları', 'p', Object.keys(PT).map((k) => [k, PT[k].ad]), null)}</div>
          <button type="button" class="btn" data-a="kiyas">Kıyasla</button>
        </div>
        <div class="f18-cipler" aria-live="polite"><span class="f18-cip" data-c="va"></span><span class="f18-cip" data-c="pc"></span><span class="f18-cip" data-c="pio"></span><span class="f18-cip pa" data-c="pa"></span></div>
      </div>
      <div class="f18-sahne f18-v"></div>
      <div class="f18-kiyas" hidden>
        <div class="f18-ky f18-ky-va" hidden><span>V̇A ×2 · 5 → 10 L/dk</span><i><s></s></i><b></b></div>
        <div class="f18-ky f18-ky-fi" hidden><span>FiO₂ 0,21 → 0,3 · V̇A 5 L/dk</span><i><s></s></i><b></b></div>
      </div>`;
    const $ = (s) => el.querySelector(s);
    const sahne = $('.f18-sahne'), rngVA = $('[data-r="va"]'), kyKutu = $('.f18-kiyas'), ky1 = $('.f18-ky-va'), ky2 = $('.f18-ky-fi');
    const X = (va) => L.x0 + va * L.kx, Yc = (p) => L.uB - (p * (L.uB - L.uT)) / 14, Ya = (p) => L.aB - (p * (L.aB - L.aT)) / 40;

    const egri = (fi, pb) => {
      const PIO = pio2(fi, pb), va0 = 26.5 / (R_DIYET * PIO), pts = [];
      if (va0 > 1.9 && va0 < 15) pts.push([X(va0), Ya(0)]);
      for (let i = 0; i <= 262; i++) {
        const va = 1.9 + i * 0.05, p = pao2(fi, pb, paco2(va));
        if (p >= 0) pts.push([X(va), Ya(Math.min(p, 40))]);
      }
      return pts.length ? 'M' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L') : '';
    };

    const kur = () => {
      const dar = el.clientWidth < DAR;
      L = dar ? LN : LW;
      el.classList.toggle('f18-dar', dar);
      const xE = X(15);
      let h = '';
      // ızgara ve eksenler
      [5, 10, 15].forEach((v) => { h += `<line class="f18-izgara" x1="${X(v)}" x2="${X(v)}" y1="${L.uT}" y2="${L.uB}"/><line class="f18-izgara" x1="${X(v)}" x2="${X(v)}" y1="${L.aT}" y2="${L.aB}"/>`; });
      h += `<line class="f18-eksen" x1="${L.x0}" x2="${L.x0}" y1="${L.uT}" y2="${L.uB}"/><line class="f18-eksen" x1="${L.x0}" x2="${xE}" y1="${L.uB}" y2="${L.uB}"/>`;
      h += `<line class="f18-eksen" x1="${L.x0}" x2="${L.x0}" y1="${L.aT}" y2="${L.aB}"/><line class="f18-eksen" x1="${L.x0}" x2="${xE}" y1="${L.aB}" y2="${L.aB}"/>`;
      h += T(L.x0 + 4, L.uT - 7, 'f18-tk f18-co2t', 'PaCO₂ (kPa)') + T(L.x0 + 4, L.aT - 8, 'f18-tk f18-o2t', 'PAO₂ (kPa)');
      h += T(dar ? xE : xE - 4, L.uT + 14, 'f18-tk', 'V̇A ×2 → PaCO₂ ÷2', 'end');
      [0, 10].forEach((v) => { h += T(L.x0 - 6, Yc(v) + 4, 'f18-tk', v, 'end'); });
      h += `<line class="f18-ref" x1="${L.x0}" x2="${xE}" y1="${Yc(5.3)}" y2="${Yc(5.3)}"/>` + T(L.x0 - 6, Yc(5.3) + 4, 'f18-tk', '5,3', 'end');
      [0, 10, 20, 30, 40].forEach((v) => { h += T(L.x0 - 6, Ya(v) + 4, 'f18-tk', v, 'end'); });
      h += `<line class="f18-ref" x1="${L.x0}" x2="${xE}" y1="${Ya(13.3)}" y2="${Ya(13.3)}"/>`;
      h += dar ? T(L.x0 - 6, Ya(13.3) + 4, 'f18-tk f18-acct', '13,3', 'end') : T(L.x0 + 6, Ya(13.3) - 5, 'f18-tk f18-halo', 'normal 13,3');
      [0, 5, 10, 15].forEach((v) => { h += `<line class="f18-eksen" x1="${X(v)}" x2="${X(v)}" y1="${L.aB}" y2="${L.aB + 4}"/>` + T(X(v), L.tkY, 'f18-tk', v, 'middle'); });
      h += T((L.x0 + xE) / 2, L.axY, 'f18-lb', 'Alveoler ventilasyon V̇A (L/dk)', 'middle');
      // PaCO₂ hiperbolü (sabit)
      const pc = [];
      for (let i = 0; i <= 262; i++) { const va = 1.9 + i * 0.05; pc.push(X(va).toFixed(1) + ' ' + Yc(paco2(va)).toFixed(1)); }
      h += `<path class="f18-v-co2" d="M${pc.join(' L')}"/>`;
      // PAO₂ eğrileri, PIO₂ asimptotları, etiketler (PB'ye göre yeniden hesaplanır)
      FIS.forEach((k, i) => {
        h += `<line class="f18-v-asim" data-k="as${i}" x1="${L.x0}" x2="${xE}"/>`;
        h += `<path class="f18-v-egri" data-k="eg${i}"/>`;
      });
      FIS.forEach((k, i) => {
        h += `<text class="f18-tk f18-o2t f18-v-et" data-k="et${i}" x="${L.rx}">${dar ? k.replace('.', ',') : 'FiO₂ ' + k.replace('.', ',')}</text>`;
        h += `<text class="f18-tk${dar ? ' f18-halo' : ''}" data-k="at${i}" x="${dar ? L.x0 + 4 : L.rx}"></text>`;
      });
      h += `<g class="f18-v-plato" data-k="plato"><path data-k="plP"/><text class="f18-tk f18-acct f18-halo" data-k="plT" text-anchor="middle"></text></g>`;
      // kıyas çubukları
      h += `<rect class="f18-v-k1" data-k="k1" width="6"/><rect class="f18-v-k2" data-k="k2" width="6"/><circle class="f18-v-bas" data-k="bas" r="7"/>`;
      // imleç
      h += `<line class="f18-v-imlec" data-k="iml" y1="${L.uT}" y2="${L.aB}"/>`;
      h += `<circle class="f18-v-nc" data-k="nc" r="6"/><circle class="f18-v-na" data-k="na" r="7"/>`;
      h += `<text class="f18-mn f18-co2t f18-halo" data-k="ncT"></text><text class="f18-mn f18-acct f18-halo" data-k="naT"></text>`;
      h += `<rect class="f18-v-dokun" x="${L.x0 - 10}" y="${L.uT}" width="${xE - L.x0 + 20}" height="${L.aB - L.uT}"/>`;
      sahne.innerHTML = svgAc(L, 'Üstte PaCO₂, altta PAO₂ alveoler ventilasyona karşı; PAO₂ eğrileri PIO₂ tavanının altında platoya yatar, FiO₂ eğrileri birbirinden çok daha uzaktır', h);
      sahne.querySelectorAll('[data-k]').forEach((n) => { E[n.dataset.k] = n; });
      sonPB = null;
      ciz();
    };

    const ciz = () => {
      const va = tw.va.v, fi = tw.fi.v, pb = tw.pb.v, dar = L.dar, sec = FIS.indexOf(fiK);
      if (sonPB === null || Math.abs(pb - sonPB) > 0.001) {
        sonPB = pb;
        FIS.forEach((k, i) => {
          const f = FI[k], PIO = pio2(f, pb), yA = Ya(PIO), p15 = pao2(f, pb, paco2(15));
          E['eg' + i].setAttribute('d', egri(f, pb));
          at(E['as' + i], { y1: yA, y2: yA });
          at(E['et' + i], { y: Ya(Math.max(0, p15)) + 4 });
          if (dar) at(E['at' + i], { y: Math.abs(yA - Ya(13.3)) < 14 ? yA + 13 : yA - 4 }); else at(E['at' + i], { y: yA + 4 });
          E['at' + i].textContent = `PIO₂ ${fmt(PIO)}`;
        });
      }
      FIS.forEach((k, i) => {
        E['eg' + i].classList.toggle('on', i === sec);
        E['et' + i].classList.toggle('on', i === sec);
        gor(E['at' + i], !dar || i === sec);
      });
      // plato üçgeni (seçili eğri; kıyas sırasında gizli)
      const fS = FI[fiK], p10 = pao2(fS, pb, paco2(10)), p15 = pao2(fS, pb, paco2(15));
      const plOn = !seq && !kiyas && p10 > 0;
      gor(E.plato, plOn);
      if (plOn) {
        E.plP.setAttribute('d', `M${X(10).toFixed(1)} ${Ya(p10).toFixed(1)} H${X(15).toFixed(1)} V${Ya(p15).toFixed(1)}`);
        const fark = fmt(p15 - p10);
        if (dar) { const y = fiK === '0.21' ? Ya(p10) + 16 : Ya(p15) - 30; at(E.plT, { x: X(12.5), y }); satir(E.plT, X(12.5).toFixed(1), ['10 → 15 L/dk:', `yalnız +${fark} kPa`], 14); }
        else { at(E.plT, { x: X(12.5), y: Ya(p10) + 16 }); E.plT.textContent = `10 → 15 L/dk: yalnız +${fark} kPa`; }
      }
      // imleç ve noktalar
      const pc = paco2(va), PA = pao2(fi, pb, pc), x = X(va), sol = va > 12;
      at(E.iml, { x1: x, x2: x });
      at(E.nc, { cx: x, cy: Yc(pc) });
      gor(E.na, PA >= 0); at(E.na, { cx: x, cy: Ya(Math.max(0, PA)) });
      at(E.ncT, { x: sol ? x - 10 : x + 10, y: Yc(pc) - 8 }); E.ncT.setAttribute('text-anchor', sol ? 'end' : 'start'); E.ncT.textContent = fmt(pc);
      gor(E.naT, PA >= 0);
      at(E.naT, { x: sol ? x - 11 : x + 11, y: Ya(Math.max(0, PA)) - 10 }); E.naT.setAttribute('text-anchor', sol ? 'end' : 'start');
      E.naT.textContent = (kiyas && kiyas.faz === 0 ? 'başlangıç ' : '') + fmt(PA);
      // kıyas çubukları
      const k1 = kiyas && kiyas.faz >= 1, k2 = kiyas && kiyas.faz >= 3;
      gor(E.k1, k1); gor(E.k2, k2); gor(E.bas, k1);
      if (k1) {
        const S0 = kiyas.S0, ust = kiyas.faz === 1 ? PA : S0 + kiyas.d1, xk = kiyas.faz === 1 ? x + 10 : X(10) + 10;
        at(E.k1, { x: xk - 3, y: Ya(ust), height: Math.max(0, Ya(S0) - Ya(ust)) });
        at(E.bas, { cx: X(5), cy: Ya(S0) });
      }
      if (k2) {
        const S0 = kiyas.S0, ust = kiyas.faz === 3 ? PA : S0 + kiyas.d2;
        at(E.k2, { x: X(5) + 12 - 3, y: Ya(ust), height: Math.max(0, Ya(S0) - Ya(ust)) });
      }
      // çipler
      const c = (k) => $(`[data-c="${k}"]`);
      $('[data-o="va"]').textContent = `${fmt(va)} L/dk`;
      c('va').textContent = `V̇A ${fmt(va)} L/dk`;
      c('pc').textContent = `PaCO₂ ${fmt(pc)} kPa`;
      c('pio').textContent = `PIO₂ ${fmt(pio2(fi, pb))} kPa`;
      c('pa').textContent = PA >= 0 ? `PAO₂ ${fmt(PA)} kPa` : 'PAO₂ < 0 (model dışı)';
    };

    const vaCap = () => {
      const va = tw.va.b, fi = FI[fiK], pb = PB[yer], pc = paco2(va), PA = pao2(fi, pb, pc), PIO = pio2(fi, pb);
      if (va < 4) {
        if (PA <= 0) return `<b>Ağır hipoventilasyon.</b> V̇A ${fmt(va)} L/dk: PaCO₂ ${fmt(pc)} kPa; bu yükseklikte denklem PAO₂'yi sıfırın altında verir, eğri burada çizilmez. [[K1 s. 77]]`;
        return `<b>Hipoventilasyon.</b> V̇A ${fmt(va)} L/dk: PaCO₂ ${fmt(pc)} kPa'ya yükselir, PAO₂ ${fmt(PA)} kPa'ya düşer. [[K1 s. 77]]`;
      }
      if (va <= 6) return `<b>Normal bölge.</b> V̇A ${fmt(va)} L/dk, PaCO₂ ${fmt(pc)} kPa: PAO₂ ${fmt(PA)} kPa. [[K1 s. 77–78]]`;
      if (va < 10) return `<b>Hiperventilasyon.</b> PaCO₂ ${fmt(pc)} kPa'ya düşer, PAO₂ ${fmt(PA)} kPa'ya yükselir. [[K1 s. 77]]`;
      return `<b>Plato.</b> 10 L/dk'nın ötesinde V̇A'yı artırmak PaCO₂'yi az düşürür: PAO₂ ${fmt(PA)} kPa, tavan PIO₂ ${fmt(PIO)} kPa. [[K1 s. 79]]`;
    };
    const kiyasCap = () => `<b>O₂ vermek hiperventilasyondan çok daha etkilidir.</b> V̇A'yı ikiye katlamak PAO₂'yi ${fmt(kiyas.d1)} kPa, FiO₂'yi 0,3'e çıkarmak ${fmt(kiyas.d2)} kPa artırır. Hiperventilasyonun kazancı PIO₂ tavanıyla sınırlıdır, FiO₂ tavanın kendisini yükseltir. [[K1 s. 77, 79]]`;
    const satirYaz = (n, d) => { n.hidden = false; n.querySelector('b').textContent = `+${fmt(d)} kPa`; n.querySelector('s').style.width = clamp((d / 10) * 100, 0, 100).toFixed(1) + '%'; kyKutu.hidden = false; };
    const kiyasBitir = () => {
      seq = null; kiyas = null;
      kyKutu.hidden = true; ky1.hidden = true; ky2.hidden = true;
      ky1.querySelector('s').style.width = '0'; ky2.querySelector('s').style.width = '0';
    };
    const noktaBirak = () => { if (pt) { pt = null; basSec(el, 'p', ''); } };
    const vaAyarla = (v) => {
      kiyasBitir(); noktaBirak();
      hedef('va', clamp(v, 2, 15), 0);
      rngVA.value = tw.va.v.toFixed(1);
      ciz(); capY(vaCap());
    };
    const kiyasBasla = () => {
      kiyasBitir(); noktaBirak();
      const pb = PB[yer], S0 = pao2(FIO2_HAVA, pb, paco2(5));
      kiyas = { S0, d1: pao2(FIO2_HAVA, pb, paco2(10)) - S0, d2: pao2(0.3, pb, paco2(5)) - S0, faz: 0 };
      hedef('pb', pb, 0.6);
      if (RM) {
        kiyas.faz = 4; fiK = '0.3'; basSec(el, 'f', fiK);
        hedef('va', 5, 0); hedef('fi', 0.3, 0); rngVA.value = '5.0';
        satirYaz(ky1, kiyas.d1); satirYaz(ky2, kiyas.d2); ciz(); capY(kiyasCap());
        return;
      }
      fiK = '0.21'; basSec(el, 'f', fiK);
      hedef('va', 5, 0.6); hedef('fi', FIO2_HAVA, 0.4);
      seq = { t: 0 };
      ciz();
    };
    el.addEventListener('input', (ev) => { if (ev.target === rngVA) vaAyarla(+rngVA.value); });
    el.addEventListener('click', (ev) => {
      const f = ev.target.closest('[data-f]'), y = ev.target.closest('[data-y]'), p = ev.target.closest('[data-p]'), a = ev.target.closest('[data-a="kiyas"]');
      if (a) { kiyasBasla(); return; }
      if (f) { kiyasBitir(); noktaBirak(); fiK = f.dataset.f; basSec(el, 'f', fiK); hedef('fi', FI[fiK], 0.4); ciz(); capY(vaCap()); return; }
      if (y) { kiyasBitir(); noktaBirak(); yer = y.dataset.y; basSec(el, 'y', yer); hedef('pb', PB[yer], 0.6); ciz(); capY(vaCap()); return; }
      if (p) {
        kiyasBitir();
        pt = p.dataset.p; basSec(el, 'p', pt);
        const P = PT[pt];
        yer = P.yer; basSec(el, 'y', yer); fiK = '0.21'; basSec(el, 'f', fiK);
        hedef('va', P.va, 0.6); hedef('fi', FIO2_HAVA, 0.6); hedef('pb', PB[yer], 0.6);
        if (RM) rngVA.value = P.va.toFixed(1);
        ciz(); capY(P.cap || vaCap());
      }
    });
    // grafikte imleci sürükleme
    const surVA = (e) => {
      const svg = sahne.querySelector('svg');
      if (!svg) return;
      const r = svg.getBoundingClientRect(), xs = (e.clientX - r.left) * (L.W / r.width);
      vaAyarla(Math.round(((xs - L.x0) / L.kx) * 10) / 10);
    };
    sahne.addEventListener('pointerdown', (e) => {
      if (!e.target.closest('svg')) return;
      surukle = true;
      try { sahne.setPointerCapture(e.pointerId); } catch (_) { /* yok say */ }
      if (e.pointerType !== 'touch') surVA(e);
    });
    sahne.addEventListener('pointermove', (e) => { if (surukle) surVA(e); });
    const birak = () => { surukle = false; };
    sahne.addEventListener('pointerup', birak);
    sahne.addEventListener('pointercancel', birak);

    kur();
    const durRO = genislikIzle(el, kur);
    const dur = ticker(el, (dt) => {
      let kirli = false;
      for (const k in tw) {
        const o = tw[k];
        if (o.p < 1) { o.p = Math.min(1, o.p + dt / o.d); o.v = lerp(o.a, o.b, ease(o.p)); kirli = true; if (k === 'va') rngVA.value = o.v.toFixed(1); }
      }
      if (seq) {
        seq.t += dt;
        const s = seq.t;
        if (kiyas.faz === 0 && s >= 1.2) { kiyas.faz = 1; hedef('va', 10, 2.0); }
        if (kiyas.faz === 1 && s >= 3.2) { kiyas.faz = 2; hedef('va', 5, 0.6); satirYaz(ky1, kiyas.d1); }
        if (kiyas.faz === 2 && s >= 3.8) { kiyas.faz = 3; fiK = '0.3'; basSec(el, 'f', fiK); hedef('fi', 0.3, 0.4); }
        if (kiyas.faz === 3 && s >= 5.2) { kiyas.faz = 4; seq = null; satirYaz(ky2, kiyas.d2); capY(kiyasCap()); }
        kirli = true;
      }
      if (kirli) ciz();
    });
    return () => { dur(); durRO(); };
  };
  /* ---------- 5 · Üç değişken: PAO₂'yi ne yükseltir, ne düşürür? (durağan şema; K1 s. 77–78) ----------
     Animasyon yok: bir değişken seçilince paneli, denklemdeki terimi ve bariyer şeridi vurgulanır.
     Eğriler (üstel PB, hiperbolik PaCO₂) yalnız biçim olarak doğrudur, ölçeksizdir. */
  VIZ.f18_uc = (el) => {
    const v = el.closest('.viz'), capEl = v && v.querySelector('.viz-cap');
    const ilkCap = capEl ? capEl.innerHTML : '';
    // Örnek değerler kitabın denklemiyle (K1 s. 77–78): 13,3 · 21,9 · 5,7 · 8,6 kPa
    const PA0 = fmt(pao2(FIO2_HAVA, PB_DENIZ, 5.3)), PAFI = fmt(pao2(0.3, PB_DENIZ, 5.3));
    const PATIB = fmt(pao2(FIO2_HAVA, 65, 5.3)), PAOP = fmt(pao2(FIO2_HAVA, PB_DENIZ, 9));
    const CAP = {
      fi: `<b>FiO₂.</b> İnspire O₂ fraksiyonu artınca PAO₂ yükselir; alveol–kapiller basınç gradyanı büyür ve Fick yasası uyarınca O₂ difüzyon hızı artar (Bölüm 10). Örnek: FiO₂ 0,21'den 0,3'e çıkınca PAO₂ ${PA0}'ten ≈ ${PAFI} kPa'ya yükselir (kitabın denklemiyle). [[K1 s. 77]]`,
      pb: `<b>Barometrik basınç.</b> PB yükseklikle üstel olarak azalır (Bölüm 87); düşen PB PAO₂'yi ve O₂ difüzyon hızını azaltır. Tibet Platosu'nda (PB 65 kPa) PaCO₂ 5,3 kPa'da kalırsa PAO₂ ${PATIB} kPa'dır. [[K1 s. 77–78]]`,
      va: `<b>Alveoler ventilasyon.</b> PaCO₂ V̇A ile ters orantılıdır (Bölüm 11). Hiperventilasyon PaCO₂'yi düşürür, PAO₂'yi ve difüzyon hızını artırır; hipoventilasyon tersini yapar: opioid olgusunda PaCO₂ 9 kPa, PAO₂ ${PAOP} kPa. [[K1 s. 77–78]]`,
    };
    const ALT = {
      '': ['alveol–kapiller O₂ basınç farkı', '= difüzyonun itici gücü'],
      fi: ['FiO₂ ↑ → PAO₂ ↑', '→ gradyan ↑ → O₂ difüzyonu ↑'],
      pb: ['PB ↓ → PAO₂ ↓', '→ gradyan ↓ → O₂ difüzyonu ↓'],
      va: ['hiperventilasyon → difüzyon ↑', 'hipoventilasyon → difüzyon ↓'],
    };
    const PAT = { '': 'PAO₂', fi: 'PAO₂ ↑', pb: 'PAO₂ ↓', va: 'PAO₂ ↑ / ↓' };
    let sec = '', L = null;

    el.innerHTML = `
      <div class="f18-ctl f18-uc-ctl">${segHtml('Değişken seçin', 'p', [['fi', 'FiO₂'], ['pb', 'PB'], ['va', 'V̇A']], '')}</div>
      <p class="f18-uc-denk"><span class="f18-dg"><b class="f18-uc-pa">PAO₂</b> = <span class="f18-uc-t fi" data-t="fi">FiO₂</span> × (<span class="f18-uc-t pb" data-t="pb">PB</span> − <span class="f18-uc-sb">6,3<small>sabit · vücut ısısı</small></span>)</span> <span class="f18-dg">− <span class="f18-uc-t va" data-t="va">PaCO₂</span> / <span class="f18-uc-sb">R<small>≈ 0,8</small></span></span></p>
      <div class="f18-sahne f18-uc"></div>`;
    const sahne = el.querySelector('.f18-uc');

    // Biçim eğrileri; u = 0…1 grafiğin yatay konumu
    const pbY = (u, top, base) => base - (base - top - 6) * Math.exp(-u / 0.611);           // üstel azalma
    const pcY = (u, top, base) => top + (base - top) * (1 - 0.0973 / (u + 0.0432));         // PaCO₂ ∝ 1/V̇A
    const yol = (gx0, gx1, top, base, f, u0) => {
      let d = '';
      for (let i = 0; i <= 40; i++) { const u = u0 + (1 - u0) * i / 40; d += `${i ? 'L' : 'M'}${(gx0 + u * (gx1 - gx0)).toFixed(1)} ${f(u, top, base).toFixed(1)}`; }
      return d;
    };
    const nokta = (x, y, cls) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" class="${cls}"/>`;
    const eksen = (gx0, gx1, top, base, dik, yat, rx) => `<path class="f18-uc-eks" d="M${gx0} ${top}V${base}H${gx1}"/>`
      + `<text class="f18-uc-kn" text-anchor="middle" transform="translate(${rx} ${(top + base) / 2}) rotate(-90)">${dik}</text>`
      + T(gx1, base + 13, 'f18-uc-kn', yat, 'end');
    const kutu = (p, x, y, w, h) => `<rect class="f18-uc-kut" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`;
    const ok = (id, cls, s = 7) => `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="${s}" markerHeight="${s}" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0L10 5L0 10z" class="${cls}"/></marker>`;
    const defs = `<defs>${ok('f18-uc-ok', 'f18-uc-mk')}${ok('f18-uc-ok-fi', 'f18-uc-mk fi')}${ok('f18-uc-ok-pb', 'f18-uc-mk pb')}${ok('f18-uc-ok-va', 'f18-uc-mk va')}${ok('f18-uc-ok2', 'f18-uc-mk fi', 13)}</defs>`;

    const genis = () => {
      let h = defs;
      // panel 1 · FiO₂
      h += `<g class="f18-uc-p" data-p="fi">${kutu('fi', 10, 10, 226, 220)}`
        + T(24, 36, 'f18-uc-bas fi', 'FiO₂') + T(24, 54, 'f18-uc-alt', 'inspire O₂ fraksiyonu')
        + T(123, 93, 'f18-uc-zin', 'FiO₂ ↑ → PAO₂ ↑', 'middle')
        + `<rect class="f18-uc-orn-k" x="24" y="108" width="198" height="50" rx="6"/>`
        + T(123, 128, 'f18-uc-orn', 'FiO₂ 0,21 → 0,3', 'middle') + T(123, 149, 'f18-uc-orn', `PAO₂ ${PA0} → ${PAFI} kPa`, 'middle')
        + T(123, 174, 'f18-uc-kn', 'deniz seviyesi, PaCO₂ 5,3 kPa', 'middle') + T(123, 187, 'f18-uc-kn', 'kitabın denklemiyle hesap', 'middle')
        + T(123, 208, 'f18-uc-sat', 'gradyan ↑ → difüzyon ↑', 'middle') + T(123, 223, 'f18-uc-kn', 'Fick yasası (Bölüm 10)', 'middle') + '</g>';
      // panel 2 · PB
      {
        const gx0 = 270, gx1 = 450, top = 66, base = 150, X = (u) => gx0 + u * (gx1 - gx0), uT = 0.611 * Math.log(PB_DENIZ / 65);
        h += `<g class="f18-uc-p" data-p="pb">${kutu('pb', 247, 10, 226, 220)}`
          + T(261, 36, 'f18-uc-bas pb', 'PB') + T(261, 54, 'f18-uc-alt', 'barometrik basınç')
          + eksen(gx0, gx1, top, base, 'PB', 'yükseklik →', 261)
          + `<path class="f18-uc-egri pb" d="${yol(gx0, gx1, top, base, pbY, 0)}"/>`
          + nokta(X(0), pbY(0, top, base), 'f18-uc-n pb') + nokta(X(uT), pbY(uT, top, base), 'f18-uc-n pb')
          + T(X(0) + 9, 70, 'f18-uc-gl', 'deniz 101,3 kPa') + T(X(uT) + 8, pbY(uT, top, base) - 3, 'f18-uc-gl', 'Tibet Platosu 65 kPa')
          + T(gx1, 72, 'f18-uc-kn', 'üstel azalma', 'end') + T(gx1, 85, 'f18-uc-kn', '(Bölüm 87)', 'end')
          + T(360, 187, 'f18-uc-zin k15', 'PB ↓ → PAO₂ ↓', 'middle')
          + T(360, 208, 'f18-uc-sat', `Tibet: PAO₂ ${PA0} → ${PATIB} kPa`, 'middle') + T(360, 223, 'f18-uc-kn', "(PaCO₂ 5,3 kPa'da kalırsa)", 'middle') + '</g>';
      }
      // panel 3 · V̇A
      {
        const gx0 = 505, gx1 = 690, top = 66, base = 150, X = (u) => gx0 + u * (gx1 - gx0), u1 = 0.086, u2 = 0.9;
        h += `<g class="f18-uc-p" data-p="va">${kutu('va', 484, 10, 226, 220)}`
          + T(498, 36, 'f18-uc-bas va', 'V̇A') + T(498, 54, 'f18-uc-alt', 'alveoler ventilasyon')
          + eksen(gx0, gx1, top, base, 'PaCO₂', 'V̇A →', 496)
          + `<path class="f18-uc-egri va" d="${yol(gx0, gx1, top, base, pcY, 0.054)}"/>`
          + nokta(X(u1), pcY(u1, top, base), 'f18-uc-n va') + nokta(X(u2), pcY(u2, top, base), 'f18-uc-n va')
          + T(X(u1) + 9, pcY(u1, top, base) - 2, 'f18-uc-gl', 'hipoventilasyon') + T(gx1, pcY(u2, top, base) - 11, 'f18-uc-gl', 'hiperventilasyon', 'end')
          + T(gx1, 100, 'f18-uc-kn', 'PaCO₂ ∝ 1/V̇A', 'end') + T(gx1, 113, 'f18-uc-kn', '(Bölüm 11)', 'end')
          + T(597, 181, 'f18-uc-ok3', 'V̇A ↑ → PaCO₂ ↓ → PAO₂ ↑', 'middle') + T(597, 199, 'f18-uc-ok3', 'V̇A ↓ → PaCO₂ ↑ → PAO₂ ↓', 'middle')
          + T(597, 220, 'f18-uc-kn12', `opioid: PaCO₂ 9 → PAO₂ ${PAOP} kPa`, 'middle') + '</g>';
      }
      // bağlantılar: panellerden alveole
      const bag = (x) => `M${x} 230V241H225V258`;
      h += [123, 360, 597].map((x) => `<path class="f18-uc-bag" d="${bag(x)}" marker-end="url(#f18-uc-ok)"/>`).join('');
      h += `<path class="f18-uc-bag-on" data-k="bag" d=""/>`;
      // bariyer şeridi
      h += `<rect class="f18-uc-alv" x="110" y="262" width="220" height="90" rx="8"/>`
        + `<rect class="f18-uc-bar" x="340" y="262" width="12" height="90" rx="2"/>`
        + `<rect class="f18-uc-kap" x="362" y="262" width="248" height="90" rx="8"/>`
        + T(346, 256, 'f18-uc-kn', 'alveol–kapiller bariyer', 'middle')
        + T(122, 282, 'f18-uc-lb', 'alveol') + T(122, 301, 'f18-uc-orn', '', '', ' data-k="pa"')
        + T(374, 282, 'f18-uc-lb2', 'pulmoner kapiller kan')
        + `<line class="f18-uc-o2" x1="230" y1="318" x2="478" y2="318" marker-end="url(#f18-uc-ok2)"/>`
        + T(416, 306, 'f18-uc-o2t', 'O₂ difüzyonu', 'middle')
        + T(360, 372, 'f18-uc-sat', '', 'middle', ' data-k="alt"');
      return h;
    };

    const dar = () => {
      let h = defs;
      const P = [8, 194, 380], PH = 176;
      const baslik = (y0, p, ad, alt) => T(22, y0 + 26, `f18-uc-bas ${p}`, ad) + T(22, y0 + 43, 'f18-uc-alt', alt);
      // panel 1
      {
        const y0 = P[0];
        h += `<g class="f18-uc-p" data-p="fi">${kutu('fi', 8, y0, 324, PH)}` + baslik(y0, 'fi', 'FiO₂', 'inspire O₂ fraksiyonu')
          + T(170, y0 + 74, 'f18-uc-zin', 'FiO₂ ↑ → PAO₂ ↑', 'middle')
          + `<rect class="f18-uc-orn-k" x="22" y="${y0 + 86}" width="296" height="46" rx="6"/>`
          + T(170, y0 + 105, 'f18-uc-orn', 'FiO₂ 0,21 → 0,3', 'middle') + T(170, y0 + 124, 'f18-uc-orn', `PAO₂ ${PA0} → ${PAFI} kPa`, 'middle')
          + T(170, y0 + 148, 'f18-uc-kn', 'deniz, PaCO₂ 5,3 kPa · kitabın denklemiyle', 'middle')
          + T(170, y0 + 166, 'f18-uc-sat', 'gradyan ↑ → difüzyon ↑ (Fick, Bölüm 10)', 'middle') + '</g>';
      }
      // panel 2
      {
        const y0 = P[1], gx0 = 164, gx1 = 322, top = y0 + 36, base = y0 + 116, X = (u) => gx0 + u * (gx1 - gx0), uT = 0.611 * Math.log(PB_DENIZ / 65);
        h += `<g class="f18-uc-p" data-p="pb">${kutu('pb', 8, y0, 324, PH)}` + baslik(y0, 'pb', 'PB', 'barometrik basınç')
          + T(22, y0 + 76, 'f18-uc-zin k15', 'PB ↓ → PAO₂ ↓')
          + T(22, y0 + 96, 'f18-uc-kn', 'üstel azalma') + T(22, y0 + 110, 'f18-uc-kn', '(Bölüm 87)')
          + eksen(gx0, gx1, top, base, 'PB', 'yükseklik →', gx0 - 7)
          + `<path class="f18-uc-egri pb" d="${yol(gx0, gx1, top, base, pbY, 0)}"/>`
          + nokta(X(0), pbY(0, top, base), 'f18-uc-n pb') + nokta(X(uT), pbY(uT, top, base), 'f18-uc-n pb')
          + T(X(0) + 9, top + 4, 'f18-uc-gl', 'deniz 101,3 kPa') + T(X(uT) + 8, pbY(uT, top, base) - 4, 'f18-uc-gl', 'Tibet 65 kPa')
          + T(22, y0 + 150, 'f18-uc-sat', `Tibet: PAO₂ ${PA0} → ${PATIB} kPa`) + T(22, y0 + 166, 'f18-uc-kn', "(PaCO₂ 5,3 kPa'da kalırsa)") + '</g>';
      }
      // panel 3
      {
        const y0 = P[2], gx0 = 164, gx1 = 322, top = y0 + 36, base = y0 + 116, X = (u) => gx0 + u * (gx1 - gx0), u1 = 0.1, u2 = 0.9;
        h += `<g class="f18-uc-p" data-p="va">${kutu('va', 8, y0, 324, PH)}` + baslik(y0, 'va', 'V̇A', 'alveoler ventilasyon')
          + T(22, y0 + 76, 'f18-uc-ok3', 'PaCO₂ ∝ 1/V̇A') + T(22, y0 + 92, 'f18-uc-kn', '(Bölüm 11)')
          + eksen(gx0, gx1, top, base, 'PaCO₂', 'V̇A →', gx0 - 7)
          + `<path class="f18-uc-egri va" d="${yol(gx0, gx1, top, base, pcY, 0.054)}"/>`
          + nokta(X(u1), pcY(u1, top, base), 'f18-uc-n va') + nokta(X(u2), pcY(u2, top, base), 'f18-uc-n va')
          + T(X(u1) + 8, pcY(u1, top, base) - 3, 'f18-uc-gl', 'hipoventilasyon') + T(gx1, pcY(u2, top, base) - 22, 'f18-uc-gl', 'hiperventilasyon', 'end')
          + T(22, y0 + 136, 'f18-uc-ok3', 'V̇A ↑ → PaCO₂ ↓ → PAO₂ ↑') + T(22, y0 + 152, 'f18-uc-ok3', 'V̇A ↓ → PaCO₂ ↑ → PAO₂ ↓')
          + T(22, y0 + 168, 'f18-uc-kn12', `opioid: PaCO₂ 9 → PAO₂ ${PAOP} kPa`) + '</g>';
      }
      // bariyer şeridi
      h += `<rect class="f18-uc-alv" x="14" y="596" width="136" height="84" rx="8"/>`
        + `<rect class="f18-uc-bar" x="156" y="596" width="10" height="84" rx="2"/>`
        + `<rect class="f18-uc-kap" x="172" y="596" width="154" height="84" rx="8"/>`
        + T(161, 588, 'f18-uc-kn', 'alveol–kapiller bariyer', 'middle')
        + T(24, 616, 'f18-uc-lb', 'alveol') + T(24, 635, 'f18-uc-orn', '', '', ' data-k="pa"')
        + T(182, 616, 'f18-uc-lb2', 'pulmoner kapiller') + T(182, 632, 'f18-uc-lb2', 'kan')
        + `<line class="f18-uc-o2" x1="70" y1="660" x2="306" y2="660" marker-end="url(#f18-uc-ok2)"/>`
        + T(244, 651, 'f18-uc-o2t', 'O₂ difüzyonu', 'middle')
        + `<text x="170" y="704" class="f18-uc-sat" text-anchor="middle" data-k="alt"></text>`;
      return h;
    };

    const uygula = () => {
      el.querySelectorAll('button[data-p]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.p === sec)));
      el.querySelectorAll('[data-t]').forEach((s) => s.classList.toggle('on', s.dataset.t === sec));
      const svg = sahne.querySelector('svg');
      if (!svg) return;
      svg.setAttribute('data-sec', sec);
      svg.querySelectorAll('.f18-uc-p').forEach((g) => { g.classList.toggle('on', g.dataset.p === sec); g.classList.toggle('dim', !!sec && g.dataset.p !== sec); });
      const pa = svg.querySelector('[data-k="pa"]'); if (pa) pa.textContent = PAT[sec];
      const alt = svg.querySelector('[data-k="alt"]');
      if (alt) { if (L.dar) satir(alt, 170, ALT[sec], 16); else alt.textContent = ALT[sec].join(sec === 'va' ? ' · ' : ' '); }
      const bag = svg.querySelector('[data-k="bag"]');
      if (bag) {
        const x = { fi: 123, pb: 360, va: 597 }[sec];
        gor(bag, !!sec);
        if (sec) { bag.setAttribute('d', `M${x} 230V241H225V258`); bag.setAttribute('class', `f18-uc-bag-on ${sec}`); bag.setAttribute('marker-end', `url(#f18-uc-ok-${sec})`); }
      }
      if (capEl) capEl.innerHTML = sec ? REF(CAP[sec]) : ilkCap;
    };

    const kur = () => {
      const d = el.clientWidth < DAR;
      L = d ? { W: 340, H: 730, dar: true } : { W: 720, H: 382, dar: false };
      el.classList.toggle('f18-dar', d);
      sahne.innerHTML = svgAc(L, "PAO₂'yi belirleyen üç değişken: FiO₂ artınca, PB düşünce ve alveoler ventilasyon değişince PAO₂ ile alveol–kapiller O₂ difüzyonunun nasıl değiştiğini gösteren şema", d ? dar() : genis());
      uygula();
    };

    const tik = (e) => {
      const t = e.target.closest('[data-p]');
      if (!t || !el.contains(t)) return;
      sec = sec === t.dataset.p ? '' : t.dataset.p;
      uygula();
    };
    el.addEventListener('click', tik);
    if (RM) el.classList.add('f18-rm');
    kur();
    const durRO = genislikIzle(el, kur);
    return () => { durRO(); el.removeEventListener('click', tik); };
  };
})();

