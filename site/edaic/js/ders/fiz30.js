/* Fizyoloji Bölüm 30 · Starling yasası ve kardiyak işlev bozukluğu · bileşenler (K1 s. 131–135). Tarif: docs/tasarim/fiz30.md
   1 f30_egri      Frank–Starling eğrisi: LVEDP ve inotropi (K1 s. 121, 131)
   2 f30_sarkomer  sarkomer uzunluğu → filaman örtüşmesi ve gerilim (K1 s. 131–132)
   3 f30_esleme    iki ventrikülün SV eşlemesi: akciğerde birikim (K1 s. 132)
   4 f30_sinif     kalp yetersizliği sınıflama haritası (K1 s. 132–133)
   5 f30_sisdia    sistolik ve diyastolik yetersizlik (K1 s. 132–133)
   6 f30_kompanse  sempatik uyarı + kan hacmi artışı, adım adım (K1 s. 133–134)
   7 f30_dekomp    inen kol ve Laplace yasası (K1 s. 83, 134)
   8 f30_sonuc     ileri ve geri yönde yetersizlik haritası (K1 s. 134–135)
   Modeller şematiktir; sayfadaki viz-foot notları bunu söyler. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;

  /* ---------- ortak ---------- */
  const DAR = 560;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2);
  const r1 = (v) => Math.round(v * 10) / 10;
  const fmt = (v, d = 1) => {
    const m = Math.pow(10, d);
    let s = (Math.round(v * m) / m).toFixed(d);
    if (/^-0(\.0+)?$/.test(s)) s = s.slice(1);
    return s.replace('.', ',').replace('-', '−');
  };
  const n0 = (v) => fmt(v, 0);
  const fmtK = (v) => (Math.abs(v - Math.round(v)) < 1e-6 ? n0(v) : fmt(v, 1)); // 70 · 69,5
  const hacim = (a) => (a >= 999.5 ? fmt(a / 1000, 1) + ' L' : n0(a) + ' mL');
  const capYazici = (el) => {
    const v = el.closest('.viz'), cap = v && v.querySelector('.viz-cap');
    const ilk = cap ? cap.innerHTML : '';
    let son = null;
    return (h) => {
      const html = h == null ? ilk : REF(h);
      if (cap && html !== son) { cap.innerHTML = html; son = html; }
    };
  };
  const darMi = (el) => el.clientWidth > 0 && el.clientWidth < DAR;
  const genislikIzle = (el, cb) => {
    if (!('ResizeObserver' in window)) return () => {};
    let son = darMi(el);
    const ro = new ResizeObserver(() => { const d = darMi(el); if (d !== son) { son = d; cb(); } });
    ro.observe(el);
    return () => ro.disconnect();
  };
  const T = (x, y, cls, s, a, ek = '') => `<text x="${r1(x)}" y="${r1(y)}" class="${cls}"${a ? ` text-anchor="${a}"` : ''}${ek}>${s}</text>`;
  const Ln = (x1, y1, x2, y2, cls, ek = '') => `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" class="${cls}"${ek}/>`;
  const Rc = (x, y, w, h, cls, ek = '') => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(Math.max(0, w))}" height="${r1(Math.max(0, h))}" class="${cls}"${ek}/>`;
  const C = (x, y, r, cls, ek = '') => `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" class="${cls}"${ek}/>`;
  const svgAc = (W, H, cls, etiket, ic) => `<svg class="f30-svg ${cls}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${etiket}">${ic}</svg>`;
  /* çoklu çizgi + ok başı (işaretleyici kimliği gerekmez) */
  const ok = (pts, cls, bas = 7, ek = '') => {
    const d = pts.map((p, i) => (i ? 'L' : 'M') + r1(p[0]) + ',' + r1(p[1])).join('');
    let h = '';
    if (bas) {
      const [x2, y2] = pts[pts.length - 1], [x1, y1] = pts[pts.length - 2];
      const a = Math.atan2(y2 - y1, x2 - x1), w = bas * 0.55;
      const p1 = [x2 - bas * Math.cos(a) + w * Math.sin(a), y2 - bas * Math.sin(a) - w * Math.cos(a)];
      const p2 = [x2 - bas * Math.cos(a) - w * Math.sin(a), y2 - bas * Math.sin(a) + w * Math.cos(a)];
      h = `<polygon points="${r1(x2)},${r1(y2)} ${r1(p1[0])},${r1(p1[1])} ${r1(p2[0])},${r1(p2[1])}" class="${cls} f30-okb"/>`;
    }
    return `<g class="${cls}"${ek}><path d="${d}" class="f30-oky"/>${h}</g>`;
  };
  /* grafik iskeleti */
  const grafik = (o) => {
    const pw = o.W - o.l - o.r, ph = o.H - o.t - o.b;
    const X = (v) => o.l + ((v - o.x[0]) / (o.x[1] - o.x[0])) * pw;
    const Y = (v) => o.H - o.b - ((v - o.y[0]) / (o.y[1] - o.y[0])) * ph;
    let s = '';
    (o.yt || []).forEach((v) => { s += Ln(o.l, Y(v), o.W - o.r, Y(v), 'f30-izg'); if (o.ysay !== false) s += T(o.l - 6, Y(v) + 4, 'f30-tk', o.yf ? o.yf(v) : n0(v), 'end'); });
    (o.xt || []).forEach((v) => { s += Ln(X(v), o.t, X(v), o.H - o.b, 'f30-izg'); s += T(X(v), o.H - o.b + 16, 'f30-tk', o.xf ? o.xf(v) : n0(v), 'middle'); });
    s += Ln(o.l, o.H - o.b, o.W - o.r, o.H - o.b, 'f30-eks') + Ln(o.l, o.t, o.l, o.H - o.b, 'f30-eks');
    s += T(o.l + pw / 2, o.H - 8, 'f30-ax', o.xl, 'middle');
    s += T(0, 0, 'f30-ax', o.yl, 'middle', ` transform="translate(${o.yx || 13} ${r1(o.t + ph / 2)}) rotate(-90)"`);
    return { X, Y, s, pw, ph };
  };
  const yol = (f, a, b, X, Y, n = 80, ymax = Infinity) => {
    let d = '';
    for (let i = 0; i <= n; i++) {
      const v = a + ((b - a) * i) / n, y = f(v);
      if (y > ymax) { break; }
      d += (i ? 'L' : 'M') + r1(X(v)) + ',' + r1(Y(y));
    }
    return d;
  };
  const P = (d, cls, ek = '') => `<path d="${d}" class="${cls}"${ek}/>`;
  /* sayısal geçiş; RM'de anında */
  const tween = (ciz, sure = 400) => {
    let raf = 0, cur = null;
    const f = (hedef, aninda, ms) => {
      cancelAnimationFrame(raf);
      if (RM || !cur || aninda) { cur = { ...cur, ...hedef }; ciz(cur); return; }
      const bas = { ...cur }, t0 = performance.now(), dur = ms || sure;
      const adim = (t) => {
        const k = ease(Math.min(1, (t - t0) / dur));
        for (const key in hedef) cur[key] = lerp(bas[key] ?? hedef[key], hedef[key], k);
        ciz(cur);
        if (k < 1) raf = requestAnimationFrame(adim);
      };
      raf = requestAnimationFrame(adim);
    };
    f.dur = () => cancelAnimationFrame(raf);
    f.cur = () => cur;
    f.yeniden = () => { if (cur) ciz(cur); };
    return f;
  };
  const segHtml = (ad, key, opts, cur) => `<div class="f30-segk"><span>${ad}</span><div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div></div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const rngHtml = (ad, key, min, max, step, val, vt, gos) => `<label class="f30-rng"><span>${ad}<b data-o="${key}">${gos}</b></span><input type="range" data-r="${key}" min="${min}" max="${max}" step="${step}" value="${val}" aria-label="${ad}" aria-valuetext="${vt}"></label>`;
  const rngYaz = (el, key, gos, vt) => {
    const o = el.querySelector(`[data-o="${key}"]`), r = el.querySelector(`[data-r="${key}"]`);
    if (o) o.textContent = gos;
    if (r) r.setAttribute('aria-valuetext', vt);
  };
  const okuHtml = (items) => items.map(([k, t]) => `<div data-k="${k}"><dt>${t}</dt><dd>–</dd></div>`).join('');
  const okuYaz = (el, k, v, cls) => {
    const d = el.querySelector(`.f30-oku [data-k="${k}"]`);
    if (!d) return;
    d.querySelector('dd').innerHTML = v;
    d.className = cls || '';
  };
  const sv90 = (V, S) => S * (1 - Math.exp(-V / 90)); // ortak SV–LVEDV modeli

  /* =====================================================================
     1 · Frank–Starling eğrisi
     ===================================================================== */
  VIZ.f30_egri = (el) => {
    const capY = capYazici(el);
    const SM = { neg: 55, nor: 85, poz: 100 };
    const AD = { neg: 'Negatif inotropi', nor: 'Normal', poz: 'Pozitif inotropi' };
    const CL = { neg: 'f30-c-neg', nor: 'f30-c-bsc', poz: 'f30-c-cln' };
    const TC = { neg: 'f30-t-mut', nor: 'f30-t-bsc', poz: 'f30-t-cln' };
    const sv = (p, S) => S * (1 - Math.exp(-p / 5));
    const s = { P: 10, ino: 'nor' };
    let dar = false;
    const kur = () => {
      dar = darMi(el);
      el.classList.toggle('f30-dar', dar);
      el.innerHTML = `<div class="f30-ctl">${rngHtml('LVEDP', 'p', 0, 20, 1, s.P, `LVEDP ${s.P} mmHg`, s.P + ' mmHg')}
        ${segHtml('İnotropi', 'ino', [['neg', 'Negatif'], ['nor', 'Normal'], ['poz', 'Pozitif']], s.ino)}</div>
        <div class="f30-g"></div>
        ${dar ? `<div class="legend"><span><i class="f30-li-cln"></i>Pozitif inotropi</span><span><i class="f30-li-bsc"></i>Normal</span><span><i class="f30-li-neg"></i>Negatif inotropi</span></div>` : ''}
        <dl class="f30-oku f30-oku-3">${okuHtml([['p', 'LVEDP'], ['sv', 'SV'], ['e', '1 mmHg daha']])}</dl>`;
      tw.yeniden();
    };
    const ciz = (cur) => {
      const g = el.querySelector('.f30-g');
      if (!g) return;
      const o = dar ? { W: 360, H: 300, l: 46, r: 14, t: 46, b: 44 } : { W: 560, H: 340, l: 56, r: 128, t: 36, b: 44 };
      const G = grafik({ ...o, x: [0, 20], y: [0, 100], xt: [0, 5, 10, 15, 20], yt: [0, 25, 50, 75, 100], xl: 'LVEDP (mmHg)', yl: 'Atım hacmi, SV (mL)' });
      const { X, Y } = G;
      let s2 = Rc(X(10), o.t, X(12) - X(10), G.ph, 'f30-bant-acc') + G.s;
      if (dar) s2 += T(X(11), 17, 'f30-sm', 'optimal sarkomer ≈ 2,2 μm', 'middle') + T(X(11), 32, 'f30-sm', '(LVEDP ≈ 10–12 mmHg)', 'middle');
      else s2 += T(X(11), 24, 'f30-sm', 'optimal sarkomer boyu ≈ 2,2 μm (LVEDP ≈ 10–12 mmHg)', 'middle');
      ['neg', 'nor', 'poz'].forEach((k) => {
        const on = k === s.ino;
        s2 += P(yol((p) => sv(p, SM[k]), 0, 20, X, Y), `${CL[k]} ${on ? 'f30-kalin' : 'f30-ince f30-soluk'}`);
        if (!dar) s2 += T(X(20) + 8, Y(sv(20, SM[k])) + 4, `f30-lb ${TC[k]}${on ? '' : ' f30-soluk2'}`, AD[k]);
      });
      const px = X(cur.P), py = Y(sv(cur.P, cur.S));
      s2 += Ln(px, py, px, Y(0), 'f30-kil') + Ln(X(0), py, px, py, 'f30-kil');
      s2 += C(px, py, 6, 'f30-nok');
      const lab = `SV ≈ ${n0(sv(cur.P, cur.S))} mL`;
      s2 += cur.P < 13 ? T(px + 10, py + 20, 'f30-lb f30-hale', lab) : T(px - 10, py + 22, 'f30-lb f30-hale', lab, 'end');
      g.innerHTML = svgAc(o.W, o.H, '', 'Frank–Starling eğrisi: LVEDP ile atım hacmi, üç inotropi durumunda', s2);
    };
    const tw = tween(ciz, 400);
    const guncelle = (aninda) => {
      tw({ P: s.P, S: SM[s.ino] }, aninda);
      const S = SM[s.ino], v = sv(s.P, S), e = Math.round(sv(s.P + 1, S) - v);
      rngYaz(el, 'p', s.P + ' mmHg', `LVEDP ${s.P} mmHg`);
      okuYaz(el, 'p', s.P + ' <small>mmHg</small>');
      okuYaz(el, 'sv', '≈ ' + n0(v) + ' <small>mL</small>');
      okuYaz(el, 'e', '+' + e + ' <small>mL</small>');
      let c = null;
      if (s.P <= 5) c = `<b>Düşük doluş (LVEDP ${s.P} mmHg).</b> Eğrinin dik bölümü: küçük bir basınç artışı SV'yi belirgin artırır. Bu içsel bir yanıttır; sinirsel ya da hümoral düzenleme gerekmez. [[K1 s. 131]]`;
      else if (s.P >= 15) c = `<b>Yüksek doluş (LVEDP ${s.P} mmHg).</b> Eğri düzleşir: aynı basınç artışı artık çok az SV kazandırır. SV ile LVEDP arasındaki ilişki doğrusal değildir. [[K1 s. 131]]`;
      else if (s.ino === 'poz') c = "<b>Pozitif inotropi.</b> Eğri yukarı kayar: aynı LVEDP'de daha çok SV atılır. Kontraktiliteyi artıran etkenler pozitif inotropik etki yapar. [[K1 s. 121, 131]]";
      else if (s.ino === 'neg') c = "<b>Negatif inotropi.</b> Eğri aşağı kayar: aynı LVEDP'de daha az SV. [[K1 s. 121, 131]]";
      else if (s.P !== 10) c = `<b>Normal ventrikül, LVEDP ${s.P} mmHg.</b> Eğri başta diktir, yüksek basınçlarda düzleşir. LVEDP'yi değiştirin, inotropiyi seçin: pozitif inotropi eğriyi yukarı, negatif inotropi aşağı taşır. [[K1 s. 131]]`;
      capY(c);
    };
    el.addEventListener('input', (e) => { const r = e.target.closest('[data-r="p"]'); if (r) { s.P = +r.value; guncelle(); } });
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-ino]'); if (b) { s.ino = b.dataset.ino; basSec(el, 'ino', s.ino); guncelle(); } });
    kur(); guncelle(true);
    const ro = genislikIzle(el, () => { kur(); guncelle(true); });
    return () => { ro(); tw.dur(); };
  };

  /* =====================================================================
     2 · Sarkomer: uzunluk–gerilim
     ===================================================================== */
  VIZ.f30_sarkomer = (el) => {
    const capY = capYazici(el);
    const Tn = (L) => (L <= 1.2 ? 0 : L <= 2.2 ? (L - 1.2) * 100 : Math.max(0, ((3.6 - L) / 1.4) * 100));
    const s = { L: 2.2, oyn: false, t: 0 };
    let dar = false, stop = null;
    const HZ = [['a', 1.6], ['b', 2.2], ['c', 3.0], ['d', 3.6]];
    const kur = () => {
      dar = darMi(el);
      el.classList.toggle('f30-dar', dar);
      el.innerHTML = `<div class="f30-ctl">${rngHtml('Sarkomer uzunluğu', 'l', 1.2, 3.6, 0.1, s.L.toFixed(1), `${fmt(s.L, 1)} μm`, fmt(s.L, 1) + ' μm')}
        <div class="btn-row f30-hiz">${HZ.map(([h, v]) => `<button type="button" class="btn ghost" data-l="${v}">${h} · ${fmt(v, 1)} μm</button>`).join('')}${RM ? '' : '<button type="button" class="btn" data-a="oyn" aria-pressed="false">▶ Oynat</button>'}</div></div>
        <div class="f30-sar"></div>
        <div class="legend"><span><i class="f30-li-z"></i>Z çizgisi</span><span><i class="f30-li-cln"></i>kalın filaman (miyozin)</span><span><i class="f30-li-bsc"></i>ince filaman (aktin)</span><span><i class="f30-li-acc"></i>çapraz köprü</span><span><i class="f30-li-wrn"></i>üst üste binen ince filaman</span></div>
        <div class="f30-ger"></div>`;
      ciz();
    };
    const sarSvg = (L) => {
      const W = dar ? 360 : 560, H = 170, cx = W / 2, k = dar ? 90 : 140;
      const zl = cx - (L / 2) * k, zr = cx + (L / 2) * k;
      const thL = Math.min(1.4, L - 0.06), tl = cx - (thL / 2) * k, tr = cx + (thL / 2) * k;
      const iL = zl + 1.1 * k, iR = zr - 1.1 * k; // ince filaman uçları
      let s2 = '';
      // ince filamanlar
      [30, 60, 90, 120].forEach((y) => {
        if (iL > cx + 0.5) { s2 += Ln(zl, y, cx, y, 'f30-aktin') + Ln(cx, y - 3, iL, y - 3, 'f30-aktin f30-bin'); }
        else s2 += Ln(zl, y, iL, y, 'f30-aktin');
        if (iR < cx - 0.5) { s2 += Ln(cx, y, zr, y, 'f30-aktin') + Ln(iR, y + 3, cx, y + 3, 'f30-aktin f30-bin'); }
        else s2 += Ln(iR, y, zr, y, 'f30-aktin');
      });
      // kalın filamanlar ve köprüler
      const bukuk = L <= 1.46;
      [45, 75, 105].forEach((y, ri) => {
        let d = `M${r1(tl)},${y}`;
        if (bukuk) { const n = 24; d = ''; for (let i = 0; i <= n; i++) { const x = tl + ((tr - tl) * i) / n; d += (i ? 'L' : 'M') + r1(x) + ',' + r1(y + 2.6 * Math.sin((i / n) * Math.PI * 4 + ri)); } }
        else d += `L${r1(tr)},${y}`;
        s2 += P(d, 'f30-miy');
        const ad = 0.1 * k;
        for (let x = tl + 3; x <= tr - 3; x += ad) {
          if (Math.abs(x - cx) < 0.08 * k) continue;
          const solda = x >= zl && x <= iL, sagda = x >= iR && x <= zr, bagli = solda || sagda;
          const yon = solda && !(sagda && x > cx) ? -1 : 1;
          [-1, 1].forEach((u) => {
            if (bagli) s2 += Ln(x, y + u * 4, x + yon * 4, y + u * 12, 'f30-kopru');
            else s2 += Ln(x, y + u * 4, x, y + u * 8, 'f30-dis');
          });
        }
      });
      s2 += Ln(zl, 20, zl, 130, 'f30-z') + Ln(zr, 20, zr, 130, 'f30-z');
      let ust = '';
      if (L <= 1.46) ust = 'sarkomer biçimini yitiriyor';
      else if (L < 2.15) ust = 'ince filamanlar üst üste biniyor';
      else if (L >= 3.55) ust = 'örtüşme yok';
      if (ust) s2 += T(cx, 13, `f30-lb ${L >= 3.55 ? 'f30-t-mut' : 'f30-t-wrn'}`, ust, 'middle');
      s2 += Ln(12, 150, 12 + k, 150, 'f30-olc') + Ln(12, 145, 12, 155, 'f30-olc') + Ln(12 + k, 145, 12 + k, 155, 'f30-olc');
      s2 += T(12 + k / 2, 166, 'f30-sm', '1 μm', 'middle');
      s2 += T(W - 8, 160, 'f30-lb', `L = ${fmt(L, 1)} μm`, 'end');
      return svgAc(W, H, '', `Sarkomer çizimi, uzunluk ${fmt(L, 1)} μm`, s2);
    };
    const gerSvg = (L) => {
      const o = dar ? { W: 360, H: 230, l: 46, r: 14, t: 48, b: 44 } : { W: 560, H: 236, l: 52, r: 20, t: 32, b: 44 };
      const G = grafik({ ...o, x: [1.0, 3.6], y: [0, 100], xt: [1.0, 1.5, 2.0, 2.5, 3.0, 3.5], yt: [0, 25, 50, 75, 100], xf: (v) => fmt(v, 1), xl: 'Sarkomer uzunluğu (μm)', yl: dar ? 'Gerilim (%)' : 'Gerilim (en yüksek %)' });
      const { X, Y } = G;
      let s2 = Rc(X(1.9), o.t, X(2.2) - X(1.9), G.ph, 'f30-bant-ok') + G.s;
      if (dar) s2 += T(X(1.87), Y(94), 'f30-sm f30-t-ok', 'normal kalpte', 'end') + T(X(1.87), Y(94) + 14, 'f30-sm f30-t-ok', 'sarkomer boyu', 'end');
      else s2 += T(X(1.87), Y(90), 'f30-sm f30-t-ok', 'normal kalpte sarkomer boyu', 'end');
      if (dar) s2 += T(X(2.2), 15, 'f30-sm', 'en yüksek gerilim', 'middle') + T(X(2.2), 29, 'f30-sm', 'LVEDP ≈ 10–12 mmHg', 'middle');
      else s2 += T(X(2.2), 20, 'f30-sm', 'en yüksek gerilim · LVEDP ≈ 10–12 mmHg', 'middle');
      s2 += P(yol(Tn, 1.0, 3.6, X, Y, 104), 'f30-c-bsc f30-kalin');
      const HP = { a: [-10, -6, 'end'], b: [9, 4, 'start'], c: [-10, 14, 'end'], d: [6, -6, 'start'] };
      HZ.forEach(([h, v]) => { s2 += T(X(v) + HP[h][0], Y(Tn(v)) + HP[h][1], 'f30-harf', h, HP[h][2]); });
      const t = Tn(L), px = X(L), py = Y(t);
      s2 += Ln(px, o.t, px, Y(0), 'f30-kil') + C(px, py, 6, 'f30-nok');
      const lab = '%' + n0(t);
      s2 += L < 2.9 ? T(px + 10, py + (L > 2.05 ? 26 : 18), 'f30-lb f30-hale', lab) : T(px - 10, py - 8, 'f30-lb f30-hale', lab, 'end');
      return svgAc(o.W, o.H, '', `Uzunluk–gerilim eğrisi: ${fmt(L, 1)} μm'de gerilim %${n0(t)}`, s2);
    };
    const ciz = () => {
      const a = el.querySelector('.f30-sar'), b = el.querySelector('.f30-ger');
      if (a) a.innerHTML = sarSvg(s.L);
      if (b) b.innerHTML = gerSvg(s.L);
      const Lr = Math.round(s.L * 10) / 10, t = Math.round(Tn(Lr));
      rngYaz(el, 'l', fmt(Lr, 1) + ' μm', `${fmt(Lr, 1)} μm, gerilim yüzde ${t}`);
      const r = el.querySelector('[data-r="l"]'); if (r && s.oyn) r.value = Lr.toFixed(1);
      let c = null;
      if (Math.abs(Lr - 2.2) < 0.01) c = null;
      else if (Lr < 2.2) c = `<b>${fmt(Lr, 1)} μm · kısa sarkomer (gerilim %${t}).</b> Diyastol sonu hacmi azalmış, sarkomer az gerilmiş: ince filamanlar üst üste biner. Kasılma enerjisi sürtünmeye karşı işte kaybolur ve sarkomer biçimini yitirir. [[K1 s. 131]]`;
      else if (Lr < 3.6) c = `<b>${fmt(Lr, 1)} μm · aşırı gerilmiş sarkomer (gerilim %${t}).</b> Daha az aktin–miyozin çapraz köprüsü kurulur, kasılma kuvveti azalır. Bu normal kalpte olmaz, ventrikül yetersizliğinde olabilir. [[K1 s. 131]]`;
      else c = '<b>3,6 μm · örtüşme yok.</b> Aktin ile miyozin hiç üst üste binmez; oluşan aktif gerilim sıfırdır. [[K1 s. 131]]';
      capY(c);
    };
    const oynDug = () => { const b = el.querySelector('[data-a="oyn"]'); if (b) { b.textContent = s.oyn ? '❚❚ Duraklat' : '▶ Oynat'; b.setAttribute('aria-pressed', String(s.oyn)); } };
    const durdur = () => { s.oyn = false; if (stop) { stop(); stop = null; } oynDug(); };
    const oynat = () => {
      s.oyn = true; s.t = 0; oynDug();
      stop = ticker(el, (dt) => {
        s.t += dt;
        s.L = s.t < 4 ? 1.2 + 2.4 * (s.t / 4) : Math.max(2.2, 3.6 - 1.4 * ((s.t - 4) / 2));
        if (s.t >= 6) { s.L = 2.2; durdur(); const r = el.querySelector('[data-r="l"]'); if (r) r.value = '2.2'; }
        ciz();
      });
    };
    el.addEventListener('input', (e) => { const r = e.target.closest('[data-r="l"]'); if (r) { durdur(); s.L = +r.value; ciz(); } });
    el.addEventListener('click', (e) => {
      const h = e.target.closest('[data-l]');
      if (h) { durdur(); s.L = +h.dataset.l; const r = el.querySelector('[data-r="l"]'); if (r) r.value = s.L.toFixed(1); ciz(); return; }
      if (e.target.closest('[data-a="oyn"]')) { if (s.oyn) durdur(); else oynat(); }
    });
    kur();
    const ro = genislikIzle(el, () => { const o = s.oyn; kur(); if (o) oynDug(); });
    return () => { ro(); durdur(); };
  };

  /* =====================================================================
     3 · İki ventrikülün eşlenmesi
     ===================================================================== */
  VIZ.f30_esleme = (el) => {
    const capY = capYazici(el);
    const K = 0.02, SAG = 70, AMAX = 7200;
    const s = { d: 1, hr: 60, on: false, t: 0, A: 0, oyn: false, faz: 0, pnd: 0 };
    let dar = false, stop = null, L = null;
    const sonuc = () => { // 60. dakika (analitik)
      s.t = 60;
      s.A = s.on ? (s.d / K) * (1 - Math.exp(-K * s.hr * 60)) : s.d * s.hr * 60;
    };
    const geo = () => (dar
      ? { W: 360, H: 340, rv: [80, 238], lv: [280, 238], rx: 62, ry: 38, pool: [36, 22, 288, 118],
        yol: [[80, 200], [80, 144]], yol2: [[280, 144], [280, 200]], alt: [[280, 276], [280, 312], [80, 312], [80, 276]], ay: 332, sx: 180 }
      : { W: 560, H: 300, rv: [95, 196], lv: [465, 196], rx: 56, ry: 38, pool: [170, 22, 220, 124],
        yol: [[95, 158], [95, 84], [168, 84]], yol2: [[392, 84], [465, 84], [465, 158]], alt: [[465, 234], [465, 270], [95, 270], [95, 234]], ay: 290, sx: 280 });
    const kur = () => {
      dar = darMi(el);
      el.classList.toggle('f30-dar', dar);
      L = geo();
      const [px, py, pw, ph] = L.pool;
      let s2 = `<defs><clipPath id="f30-esl-kap"><rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="22"/></clipPath></defs>`;
      s2 += `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="22" class="f30-havuz"/>`;
      s2 += `<g clip-path="url(#f30-esl-kap)"><rect class="f30-kan" x="${px}" y="${py + ph}" width="${pw}" height="0"/><line class="f30-duz" x1="${px}" x2="${px + pw}" y1="${py + ph}" y2="${py + ph}"/></g>`;
      s2 += T(px + pw / 2, py + 22, 'f30-lb', 'Pulmoner dolaşım · akciğerler', 'middle');
      s2 += T(px + pw - 14, py + ph - 10, 'f30-sm f30-t-crt f30-esl-et', '', 'end');
      s2 += ok(L.yol, 'f30-ok-mut', 8) + ok(L.yol2, 'f30-ok-mut', 8) + ok(L.alt, 'f30-ok-mut', 8);
      s2 += T(L.sx, L.ay, 'f30-sm', 'sistemik dolaşım', 'middle');
      [['rv', 'Sağ ventrikül'], ['lv', 'Sol ventrikül']].forEach(([k, ad]) => {
        const [cx, cy] = L[k];
        s2 += `<g class="f30-esl-${k}" transform="translate(${cx} ${cy})"><ellipse class="f30-vent" rx="${L.rx}" ry="${L.ry}"/></g>`;
        s2 += T(cx, cy - 4, 'f30-lb', ad, 'middle') + T(cx, cy + 14, 'f30-sm f30-esl-sv-' + k, 'SV 70 mL', 'middle');
      });
      s2 += '<g class="f30-pkler">' + Array.from({ length: 10 }, () => C(-20, -20, 4, 'f30-pk')).join('') + '</g>';
      el.innerHTML = `<div class="f30-ctl">${segHtml('Sol, sağdan her atımda … az atıyor', 'd', [[0, '0 mL'], [0.5, '0,5 mL'], [1, '1 mL'], [2, '2 mL']], s.d)}
        ${rngHtml('Kalp hızı', 'hr', 50, 100, 5, s.hr, `${s.hr} atım/dk`, s.hr + ' /dk')}
        <div class="btn-row"><button type="button" class="btn ghost f30-anah" data-a="st" aria-pressed="${s.on}">Starling mekanizması: ${s.on ? 'açık' : 'kapalı'}</button>
        ${RM ? '' : `<button type="button" class="btn" data-a="oyn" aria-pressed="${s.oyn}">${s.oyn ? '❚❚ Duraklat' : '▶ Oynat'}</button><button type="button" class="btn ghost" data-a="bas">↺ Baştan</button>`}</div></div>
        <div class="f30-esl-g">${svgAc(L.W, L.H, '', 'Sağ ventrikül, akciğer dolaşımı ve sol ventrikül; akciğerde biriken kan', s2)}</div>
        <dl class="f30-oku f30-oku-5">${okuHtml([['t', 'Geçen süre'], ['a', 'Akciğerde fazladan kan'], ['r', 'Sağ SV'], ['l', 'Sol SV'], ['e', 'LVEDV artışı']])}</dl>`;
      ciz();
    };
    const solSV = () => SAG - s.d + (s.on ? K * s.A : 0);
    const loop = () => { // dolaşım halkası: packets
      const p = [...L.yol, ...L.yol2, ...L.alt];
      const seg = []; let top = 0;
      for (let i = 1; i < p.length; i++) { const l = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); seg.push([p[i - 1], p[i], l]); top += l; }
      return { seg, top };
    };
    const nokta = (lp, f) => {
      let d = f * lp.top;
      for (const [a, b, l] of lp.seg) { if (d <= l) return [lerp(a[0], b[0], d / l), lerp(a[1], b[1], d / l)]; d -= l; }
      const z = lp.seg[lp.seg.length - 1][1]; return z;
    };
    const ciz = () => {
      if (!L) return;
      const [px, py, pw, ph] = L.pool;
      const f = clamp(s.A / AMAX, 0, 1), h = ph * f, yl = py + ph - h;
      const kan = el.querySelector('.f30-kan'), duz = el.querySelector('.f30-duz');
      if (kan) { kan.setAttribute('y', r1(yl)); kan.setAttribute('height', r1(h)); }
      if (duz) { duz.setAttribute('y1', r1(yl)); duz.setAttribute('y2', r1(yl)); duz.style.opacity = s.A > 0.5 ? 1 : 0; }
      const et = el.querySelector('.f30-esl-et');
      if (et) { et.textContent = s.A > 0.5 && f < 0.12 ? `birikim ≈ ${n0(s.A)} mL` : ''; et.setAttribute('y', r1(Math.min(py + ph - 10, yl - 6))); }
      // atım
      const fr = s.faz % 1, kas = s.oyn && fr < 0.375 ? 1 - 0.08 * Math.sin((Math.PI * fr) / 0.375) : 1;
      const lvB = s.on ? 1 + (Math.min(s.A, 150) / 150) * 0.18 : 1;
      const rv = el.querySelector('.f30-esl-rv'), lv = el.querySelector('.f30-esl-lv');
      if (rv) rv.setAttribute('transform', `translate(${L.rv[0]} ${L.rv[1]}) scale(${r1(kas * 100) / 100})`);
      if (lv) lv.setAttribute('transform', `translate(${L.lv[0]} ${L.lv[1]}) scale(${Math.round(kas * lvB * 1000) / 1000})`);
      const sl = solSV();
      const a = el.querySelector('.f30-esl-sv-rv'), b = el.querySelector('.f30-esl-sv-lv');
      if (a) a.textContent = `SV ${SAG} mL`;
      if (b) b.textContent = `SV ${fmtK(Math.round(sl * 10) / 10)} mL`;
      // paketler
      const lp = loop();
      el.querySelectorAll('.f30-pk').forEach((c, i) => {
        if (!s.oyn && s.t === 0) { c.setAttribute('cx', -20); return; }
        const [x, y] = nokta(lp, (s.faz * 0.16 + i / 10) % 1);
        c.setAttribute('cx', r1(x)); c.setAttribute('cy', r1(y));
      });
      okuYaz(el, 't', n0(Math.floor(s.t + 1e-6)) + ' <small>dk</small>');
      okuYaz(el, 'a', hacim(s.A).replace(/ (mL|L)$/, ' <small>$1</small>'), s.A > 1000 ? 'f30-kt-crt' : '');
      okuYaz(el, 'r', SAG + ' <small>mL</small>');
      okuYaz(el, 'l', fmtK(Math.round(sl * 10) / 10) + ' <small>mL</small>', Math.abs(sl - SAG) < 0.05 ? 'f30-kt-ok' : '');
      const e = el.querySelector('.f30-oku [data-k="e"]');
      if (e) { e.style.display = s.on ? '' : 'none'; e.querySelector('dd').innerHTML = '+' + n0(s.A) + ' <small>mL</small>'; }
      // açıklama
      const dS = fmtK(s.d);
      let c;
      if (s.d === 0) c = '<b>Eşit atım.</b> İki ventrikül aynı SV\'yi atıyor; akciğerde birikim yok. [[K1 s. 132]]';
      else if (s.on) c = `<b>Starling açık.</b> Akciğerde biriken kan sol ventrikülün doluşunu (LVEDV) artırır; daha çok gerilen ventrikül daha çok atar. Sol SV sağınkine eşitlenir ve birikim ≈ ${n0(s.d / K)} mL'de durur. Sağa venöz dönüş artınca da aynı zincir işler: sağ SV ↑ → pulmoner akım ↑ → LVEDV ↑ → sol SV ↑. [[K1 s. 132]]`;
      else if (s.t >= 60 - 1e-6) c = `<b>Bir saat sonra: ${hacim(s.A)} fazladan kan.</b> Sol ventrikül her atımda yalnızca ${dS} mL az attı; ${s.hr}/dk × 60 dk sonra akciğerlerde ${hacim(s.A)} birikti. Kitabın örneğinde 1 mL/atım bir saatte 3 L'yi aşar. [[K1 s. 132]]`;
      else if (s.d === 1 && s.hr === 60) c = null;
      else c = `<b>Starling kapalı · fark ${dS} mL/atım.</b> Sol ventrikül her atımda sağdan ${dS} mL az atıyor; fazlalık pulmoner dolaşımda birikir: ${s.hr}/dk'da bir saatte ${hacim(s.d * s.hr * 60)}. Starling'i açın: biriken kan LVEDV'yi artırır, sol ventrikül daha çok atar ve birikme durur. [[K1 s. 132]]`;
      capY(c);
    };
    const oynDug = () => { const b = el.querySelector('[data-a="oyn"]'); if (b) { b.textContent = s.oyn ? '❚❚ Duraklat' : '▶ Oynat'; b.setAttribute('aria-pressed', String(s.oyn)); } };
    const adim = (dt) => {
      if (!s.oyn) return;
      s.faz += dt * 1.5;
      let simdt = Math.min(dt * 5, 60 - s.t);
      const n = Math.max(1, Math.ceil(simdt / 0.004)), hh = simdt / n;
      for (let i = 0; i < n; i++) s.A = Math.max(0, s.A + (s.on ? s.d - K * s.A : s.d) * s.hr * hh);
      s.t += simdt;
      if (s.t >= 60 - 1e-9) { s.t = 60; s.oyn = false; oynDug(); }
      ciz();
    };
    stop = RM ? null : ticker(el, adim);
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r="hr"]');
      if (!r) return;
      s.hr = +r.value; rngYaz(el, 'hr', s.hr + ' /dk', `${s.hr} atım/dk`);
      if (RM) sonuc();
      ciz();
    });
    el.addEventListener('click', (e) => {
      const d = e.target.closest('[data-d]');
      if (d) { s.d = +d.dataset.d; basSec(el, 'd', s.d); if (RM) sonuc(); ciz(); return; }
      const b = e.target.closest('[data-a]');
      if (!b) return;
      const a = b.dataset.a;
      if (a === 'st') { s.on = !s.on; b.setAttribute('aria-pressed', String(s.on)); b.textContent = `Starling mekanizması: ${s.on ? 'açık' : 'kapalı'}`; if (RM) sonuc(); ciz(); }
      if (a === 'oyn') { if (!s.oyn && s.t >= 60) { s.t = 0; s.A = 0; } s.oyn = !s.oyn; oynDug(); ciz(); }
      if (a === 'bas') { s.t = 0; s.A = 0; s.oyn = false; oynDug(); ciz(); }
    });
    if (RM) sonuc();
    kur();
    const ro = genislikIzle(el, kur);
    return () => { ro(); if (stop) stop(); };
  };

  /* =====================================================================
     4 · Kalp yetersizliği haritası
     ===================================================================== */
  VIZ.f30_sinif = (el) => {
    const capY = capYazici(el);
    const CAP = {
      kok: null,
      yuk: '<b>Yüksek debili yetersizlik.</b> Debi normaldir ama dokuların O₂ gereksinimi yüksektir; örnekler tirotoksikoz ve gebelik. [[K1 s. 132]]',
      dus: '<b>Düşük debili yetersizlik.</b> Dokuların O₂ gereksinimi normaldir, debi bunu karşılamaya yetmez. Sağ ya da sol ventrikül tek başına etkilenebilir. [[K1 s. 132]]',
      tek: '<b>Sol ya da sağ ventrikül yetersizliği.</b> Düşük debili yetersizlikte ventriküllerden biri tek başına yetersiz olabilir: sol ventrikül yetersizliği ya da RVF. [[K1 s. 132]]',
      kon: '<b>Konjestif kalp yetersizliği.</b> Sol ventrikülün ilerleyici pompa yetersizliği sağ ventrikülü de yetersizliğe sürükler. [[K1 s. 132]]',
      sis: '<b>Sistolik yetersizlik.</b> Pompa işlevi bozuk, EF %45\'in altında. Yıllık mortalite ≈ %20, birçok kanserden yüksek; morbidite de belirgin. Nedenler: miyosit işlev bozukluğu ve süregen artmış ard yük. [[K1 s. 132]]',
      dia: '<b>Diyastolik yetersizlik.</b> Ventrikül kompliyansı azalmış: dolum bozulur, SV düşer. Giderek daha sık tanınır, sıklıkla sistolikle birlikte bulunur; yıllık mortalite %8, morbidite belirgin. [[K1 s. 132–133]]',
    };
    let sec = 'kok', dar = false;
    // kutu: [kimlik, cap anahtarı, ton, x, y, w, h, satırlar (ilk satır başlık)]
    const GEN = {
      W: 560, H: 334, fs: 12, cfs: 11, lh: 15,
      kutular: [
        ['kok', 'kok', 'ink', 140, 6, 280, 48, ['Kalp yetersizliği', 'debi doku gereksinimini karşılayamaz']],
        ['yuk', 'yuk', 'wrn', 8, 82, 196, 92, ['Yüksek debili', 'debi normal · gereksinim ↑']],
        ['dus', 'dus', 'crt', 226, 82, 326, 48, ['Düşük debili', 'gereksinim normal · debi yetersiz']],
        ['sol', 'tek', 'crt', 226, 148, 96, 62, ['Sol ventrikül', 'yetersizliği']],
        ['sag', 'tek', 'crt', 344, 148, 102, 62, ['Sağ ventrikül', 'yetersizliği', '(RVF)']],
        ['kon', 'kon', 'crt', 466, 148, 86, 62, ['Konjestif:', 'sol → sağ']],
        ['sis', 'sis', 'crt', 18, 250, 220, 70, ['Sistolik', 'kasılma yetersiz · EF < %45', 'yıllık mortalite ≈ %20']],
        ['dia', 'dia', 'cln', 322, 250, 220, 70, ['Diyastolik', 'kompliyans ↓ · dolum yetersiz', 'yıllık mortalite %8']],
      ],
      cips: [[24, 148, 'tirotoksikoz'], [118, 148, 'gebelik']],
      baglar: [[[280, 54], [280, 68], [106, 68], [106, 82]], [[280, 68], [389, 68], [389, 82]], [[389, 130], [389, 139], [274, 139], [274, 148]], [[389, 139], [395, 139], [395, 148]], [[395, 139], [509, 139], [509, 148]]],
      solsag: [[322, 179], [342, 179]],
      serit: [280, 236, 'Pompa bozukluğuna göre'], ciftOk: [[242, 285], [318, 285]], birlikte: [280, 270],
    };
    const NAR = {
      W: 360, H: 512, fs: 13, cfs: 12, lh: 16,
      kutular: [
        ['kok', 'kok', 'ink', 10, 6, 340, 50, ['Kalp yetersizliği', 'debi doku gereksinimini karşılayamaz']],
        ['yuk', 'yuk', 'wrn', 4, 84, 170, 104, ['Yüksek debili', 'debi normal ·', 'gereksinim ↑']],
        ['dus', 'dus', 'crt', 186, 84, 170, 104, ['Düşük debili', 'gereksinim normal ·', 'debi yetersiz']],
        ['sol', 'tek', 'crt', 4, 214, 108, 70, ['Sol ventrikül', 'yetersizliği']],
        ['sag', 'tek', 'crt', 126, 214, 112, 70, ['Sağ ventrikül', 'yetersizliği', '(RVF)']],
        ['kon', 'kon', 'crt', 252, 214, 104, 70, ['Konjestif:', 'sol → sağ']],
        ['sis', 'sis', 'crt', 4, 330, 352, 70, ['Sistolik', 'kasılma yetersiz · EF < %45', 'yıllık mortalite ≈ %20']],
        ['dia', 'dia', 'cln', 4, 436, 352, 70, ['Diyastolik', 'kompliyans ↓ · dolum yetersiz', 'yıllık mortalite %8']],
      ],
      cips: [[10, 158, 'tirotoksikoz'], [108, 158, 'gebelik']],
      baglar: [[[180, 56], [180, 70], [89, 70], [89, 84]], [[180, 70], [271, 70], [271, 84]], [[271, 188], [271, 200], [58, 200], [58, 214]], [[182, 200], [182, 214]], [[271, 200], [304, 200], [304, 214]]],
      solsag: [[112, 249], [124, 249]],
      serit: [180, 318, 'Pompa bozukluğuna göre'], ciftOk: [[180, 404], [180, 432]], birlikte: [250, 422],
    };
    const kur = () => {
      dar = darMi(el);
      el.classList.toggle('f30-dar', dar);
      const L = dar ? NAR : GEN;
      let s2 = '';
      L.baglar.forEach((b) => { s2 += P(b.map((p, i) => (i ? 'L' : 'M') + p[0] + ',' + p[1]).join(''), 'f30-bag'); });
      s2 += Ln(dar ? 4 : 8, L.serit[1] - 18, L.W - (dar ? 4 : 8), L.serit[1] - 18, 'f30-izg');
      s2 += T(L.serit[0], L.serit[1], 'f30-ax', L.serit[2], 'middle');
      L.kutular.forEach(([id, ck, ton, x, y, w, h, sat]) => {
        const n = sat.length, y0 = y + h / 2 - ((n - 1) * L.lh) / 2 + 4 - (id === 'yuk' ? 14 : 0);
        s2 += `<g class="f30-kt f30-k-${ton}" data-k="${id}" data-c="${ck}" role="button" tabindex="0" aria-pressed="false" aria-label="${sat.join(' ')}">${Rc(x, y, w, h, 'f30-kr', ' rx="10"')}`;
        sat.forEach((t, i) => { s2 += T(x + w / 2, y0 + i * L.lh, i ? 'f30-ks' : 'f30-kb', t, 'middle'); });
        if (id === 'yuk') L.cips.forEach(([cx, cy, t]) => { const cw = t.length * L.cfs * 0.56 + 12; s2 += Rc(cx, cy, cw, 22, 'f30-cip', ' rx="11"') + T(cx + cw / 2, cy + 15, 'f30-cipt', t, 'middle'); });
        s2 += '</g>';
      });
      s2 += ok(L.solsag, 'f30-ok-crt', 6);
      s2 += ok(L.ciftOk, 'f30-ok-mut', 7) + ok([L.ciftOk[1], L.ciftOk[0]], 'f30-ok-mut', 7);
      if (dar) s2 += T(L.birlikte[0] - 50, L.birlikte[1], 'f30-sm', 'sıklıkla birlikte', 'start');
      else s2 += T(L.birlikte[0], L.birlikte[1], 'f30-sm', 'sıklıkla', 'middle') + T(L.birlikte[0], L.birlikte[1] + 30, 'f30-sm', 'birlikte', 'middle');
      el.innerHTML = svgAc(L.W, L.H, 'f30-agac', 'Kalp yetersizliği sınıflama ağacı; ayrıntı için kutuya dokunun', s2);
      sec_(sec);
    };
    const sec_ = (k) => {
      sec = k;
      el.querySelectorAll('.f30-kt').forEach((g) => { const on = g.dataset.k === k; g.classList.toggle('on', on); g.setAttribute('aria-pressed', String(on)); });
      const g = el.querySelector(`.f30-kt[data-k="${k}"]`);
      capY(g ? CAP[g.dataset.c] : null);
    };
    el.addEventListener('click', (e) => { const g = e.target.closest('.f30-kt'); if (g) sec_(g.dataset.k); });
    el.addEventListener('keydown', (e) => { const g = e.target.closest('.f30-kt'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sec_(g.dataset.k); } });
    kur();
    const ro = genislikIzle(el, kur);
    return () => ro();
  };

  /* =====================================================================
     5 · Sistolik ve diyastolik yetersizlik
     ===================================================================== */
  VIZ.f30_sisdia = (el) => {
    const capY = capYazici(el);
    const s = { m: 'nor', hr: 70, af: false };
    let tm = 0;
    const hedef = () => {
      if (s.m === 'nor') return { V: 120, S: 95 };
      if (s.m === 'sis') return { V: 150, S: 60 };
      const f = Math.min(1, Math.max(0.5, 1 - (s.hr - 70) / 160));
      return { V: 68 * f + (s.af ? 0 : 22), S: 95, pas: 68 * f };
    };
    el.innerHTML = `<div class="f30-ctl">${segHtml('Ventrikül', 'm', [['nor', 'Normal'], ['sis', 'Sistolik yetersizlik'], ['dia', 'Diyastolik yetersizlik']], s.m)}
      <div class="f30-dia-ctl">${rngHtml('Kalp hızı', 'hr', 60, 150, 10, s.hr, `${s.hr} atım/dk`, s.hr + ' /dk')}
      <button type="button" class="btn ghost f30-anah" data-a="af" aria-pressed="false">Atriyal fibrilasyon: kapalı</button></div></div>
      <div class="f30-iki"><div class="f30-g1"></div><div><div class="f30-g2"></div><div class="f30-dolum"></div></div></div>
      <dl class="f30-oku f30-oku-3">${okuHtml([['v', 'LVEDV'], ['sv', 'SV'], ['ef', 'EF']])}</dl>`;
    const o = { W: 360, H: 280, l: 46, r: 12, t: 24, b: 44 };
    const ciz = (cur) => {
      const G = grafik({ ...o, x: [0, 200], y: [0, 100], xt: [0, 40, 80, 120, 160, 200], yt: [0, 25, 50, 75, 100], xl: 'LVEDV (mL)', yl: 'SV (mL)' });
      const { X, Y } = G;
      let a = G.s;
      a += P(yol((v) => sv90(v, 95), 0, 200, X, Y), `f30-c-bsc ${s.m === 'sis' ? 'f30-ince f30-soluk' : 'f30-kalin'}`);
      a += P(yol((v) => sv90(v, 60), 0, 200, X, Y), 'f30-c-crt f30-kalin', ` style="opacity:${r1(cur.op)}"`);
      if (cur.op > 0.05) a += T(X(200), Y(sv90(200, 60)) + 18, 'f30-sm f30-t-crt', 'yetersiz ventrikül', 'end', ` style="opacity:${r1(cur.op)}"`);
      a += C(X(120), Y(70), 9, 'f30-halka') + T(X(120) - 12, Y(70) - 12, 'f30-sm f30-hale', 'normal: 120 mL · 70 mL', 'end');
      const px = X(cur.V), py = Y(sv90(cur.V, cur.S));
      a += Ln(px, py, px, Y(0), 'f30-kil') + Ln(X(0), py, px, py, 'f30-kil') + C(px, py, 6, 'f30-nok');
      const lab = `SV ≈ ${n0(sv90(cur.V, cur.S))} mL`;
      a += s.m === 'sis' ? T(px - 10, py - 12, 'f30-lb f30-hale', lab, 'end') : T(px + 10, py + 22, 'f30-lb f30-hale', lab);
      el.querySelector('.f30-g1').innerHTML = svgAc(o.W, o.H, '', `Starling grafiği: LVEDV ${n0(cur.V)} mL, SV ${n0(sv90(cur.V, cur.S))} mL`, a);
      // dolum grafiği
      const G2 = grafik({ ...o, x: [0, 200], y: [0, 20], xt: [0, 40, 80, 120, 160, 200], yt: [0, 5, 10, 15, 20], ysay: false, xl: 'LVEDV (mL)', yl: 'Diyastolik basınç →' });
      const nP = (v) => Math.exp(v / 75) - 1, sP = (v) => Math.exp(v / 30) - 1, PB = 12;
      let b = G2.s;
      b += T(G2.X(0) + 4, G2.Y(PB) - 6, 'f30-sm', 'aynı dolum basıncı', 'start');
      b += Ln(G2.X(0), G2.Y(PB), G2.X(200), G2.Y(PB), 'f30-kes');
      b += P(yol(nP, 0, 200, G2.X, G2.Y), 'f30-c-bsc f30-kalin') + T(G2.X(198), G2.Y(nP(198)) - 8, 'f30-sm f30-t-bsc', 'normal', 'end');
      const vN = 75 * Math.log(PB + 1), vS = 30 * Math.log(PB + 1);
      b += Ln(G2.X(vN), G2.Y(PB), G2.X(vN), G2.Y(0), 'f30-kil');
      if (cur.st > 0.05) {
        b += `<g style="opacity:${r1(cur.st)}">${P(yol(sP, 0, 200, G2.X, G2.Y, 120, 20), 'f30-c-cln f30-kalin')}${T(G2.X(92), G2.Y(19), 'f30-sm f30-t-cln', 'sert ventrikül', 'start')}${Ln(G2.X(vS), G2.Y(PB), G2.X(vS), G2.Y(0), 'f30-kil')}${ok([[G2.X(vN) - 6, G2.Y(0) - 8], [G2.X(vS) + 6, G2.Y(0) - 8]], 'f30-ok-cln', 7)}${T(G2.X(146), G2.Y(0) - 17, 'f30-sm f30-t-cln f30-hale', 'daha az dolum', 'middle')}</g>`;
      }
      if (s.m === 'sis') b += T(G2.X(4), G2.Y(18.5), 'f30-lb f30-t-crt', 'dolum normal; sorun kasılmada', 'start');
      el.querySelector('.f30-g2').innerHTML = svgAc(o.W, o.H, '', 'Dolum grafiği: aynı basınçta kompliyant ve sert ventrikülün hacmi', b);
    };
    const tw = tween(ciz, 400);
    const yaz = () => {
      const h = hedef(), sv = sv90(h.V, h.S), ef = (sv / h.V) * 100;
      okuYaz(el, 'v', n0(h.V) + ' <small>mL</small>');
      okuYaz(el, 'sv', '≈ ' + n0(sv) + ' <small>mL</small>');
      okuYaz(el, 'ef', '%' + n0(ef) + (ef < 45 ? '<small class="f30-esik">< %45: sistolik yetersizlik eşiği</small>' : ''), ef < 45 ? 'f30-kt-crt' : '');
      const dia = s.m === 'dia';
      el.querySelector('.f30-dia-ctl').classList.toggle('f30-pasif', !dia);
      el.querySelector('[data-r="hr"]').disabled = !dia;
      el.querySelector('[data-a="af"]').disabled = !dia;
      const d = el.querySelector('.f30-dolum');
      if (dia) {
        const pw = (h.pas / 90) * 100, aw = (22 / 90) * 100;
        d.innerHTML = `<div class="f30-dol-b">Dolum</div><div class="f30-cubuk" role="img" aria-label="Dolum: pasif ${n0(h.pas)} mL, atriyal ${s.af ? '0' : '22'} mL"><span class="f30-pas" style="width:${r1(pw)}%"></span><span class="${s.af ? 'f30-atr f30-kayip' : 'f30-atr'}" style="width:${r1(aw)}%">${s.af ? 'AF: kayıp' : ''}</span></div>
          <div class="f30-dol-a"><span><i class="f30-li-pas"></i>pasif dolum ${n0(h.pas)} mL${s.hr >= 100 ? ' · diyastol süresi ↓' : ''}</span><span><i class="f30-li-atr${s.af ? ' f30-li-kayip' : ''}"></i>atriyal kasılma ${s.af ? '0 mL (AF)' : '22 mL'}</span></div>`;
      } else d.innerHTML = '';
      let c = null;
      if (s.m === 'sis') c = '<b>Sistolik yetersizlik.</b> Miyokard yeterince güçlü kasılamaz: aynı LVEDV\'de SV azalır. Düşen SV, LVEDV\'yi artırır ve kalp büyür (kardiyomegali); EF %45\'in altına iner. Nedenler: iskemi, miyokardit, Duchenne kas distrofisi, infarktüs sonrası skar ya da süregen ard yük (hipertansiyon, aort darlığı; önce konsantrik hipertrofi). [[K1 s. 132–133]]';
      else if (dia && s.af) c = '<b>Atriyal fibrilasyon.</b> Atriyal kasılmanın katkısı kaybolur; diyastolik yetersizlikte dolum belirgin azalır. Hız da yüksekse dolum süresi kısalır ve LVEDV daha da düşer; hız kontrolü (β-bloker, Ca²⁺ kanal blokeri) yardımcıdır. [[K1 s. 133]]';
      else if (dia && s.hr >= 100) c = '<b>Taşikardi.</b> Yüksek kalp hızı diyastolik dolum süresini kısaltır, LVEDV daha da düşer. β-bloker ya da Ca²⁺ kanal blokeriyle hız kontrolü bunu önlemeye yardım eder. [[K1 s. 133]]';
      else if (dia) c = '<b>Diyastolik yetersizlik.</b> Kasılma korunmuştur, eğri yerindedir; ama kompliyansı azalmış ventrikül aynı basınçta daha az dolar: LVEDV ve SV düşer, EF korunur. Atriyal kasılmanın doluma katkısı büyüktür; dördüncü kalp sesi duyulabilir. [[K1 s. 132–133]]';
      capY(c);
    };
    const guncelle = (ilk) => {
      clearTimeout(tm);
      const h = hedef(), op = s.m === 'sis' ? 1 : 0, st = s.m === 'dia' ? 1 : 0;
      if (ilk) tw({ V: h.V, S: h.S, op, st }, true);
      else if (s.m === 'sis' && !RM) {
        tw({ V: 120, S: 60, op, st }, false, 450);
        tm = setTimeout(() => tw({ V: 150, S: 60, op, st }, false, 600), 900);
      } else tw({ V: h.V, S: h.S, op, st });
      yaz();
    };
    el.addEventListener('input', (e) => { const r = e.target.closest('[data-r="hr"]'); if (r) { s.hr = +r.value; rngYaz(el, 'hr', s.hr + ' /dk', `${s.hr} atım/dk`); guncelle(); } });
    el.addEventListener('click', (e) => {
      const m = e.target.closest('[data-m]');
      if (m) { if (m.dataset.m !== s.m) { s.m = m.dataset.m; basSec(el, 'm', s.m); guncelle(); } return; }
      const a = e.target.closest('[data-a="af"]');
      if (a && !a.disabled) { s.af = !s.af; a.setAttribute('aria-pressed', String(s.af)); a.textContent = `Atriyal fibrilasyon: ${s.af ? 'açık' : 'kapalı'}`; guncelle(); }
    });
    el.classList.toggle('f30-dar', darMi(el));
    guncelle(true);
    const ro = genislikIzle(el, () => el.classList.toggle('f30-dar', darMi(el)));
    return () => { ro(); clearTimeout(tm); tw.dur(); };
  };

  /* =====================================================================
     6 · Kompansasyon: adım adım
     ===================================================================== */
  VIZ.f30_kompanse = (el) => {
    const capY = capYazici(el);
    const AD = ['Normal', 'Yetersiz', 'Sempatik', 'Hacim', 'ANP/BNP', 'Zamanla'];
    // [V, nokta eğrisi Smax, sempatik eğri Smax, HR, açık kutular, cap]
    const A = [
      { V: 120, S: 95, Ss: 82, hr: 70, on: [], c: null },
      { V: 120, S: 70, Ss: 82, hr: 70, on: ['debi'], c: '<b>2 · Ventrikül işlevi bozuldu.</b> Aynı LVEDV\'de (120 mL) SV ≈ 52 mL\'ye düşer, debi azalır. Vücut iki mekanizmayla yanıt verir. [[K1 s. 133]]' },
      { V: 120, S: 82, Ss: 82, hr: 80, on: ['sem', 'kon', 'kor'], c: '<b>3 · Sempatik uyarı.</b> Kontraktilite artar (eğri yukarı kayar) ve kalp hızı yükselir; SV hâlâ biraz düşük olsa da debi korunur. [[K1 s. 134]]' },
      { V: 140, S: 82, Ss: 82, hr: 75, on: ['debi', 'rbf', 'raa', 'hac', 'onyuk', 'sv'], c: '<b>4 · Kan hacmi artışı.</b> Düşen debi RBF\'yi azaltır; böbrekler RAA ekseniyle plazma hacmini artırır. Ön yük (LVEDV) yükselir ve Starling yasasıyla SV artar. LVEDV biraz artmıştır, ama sempatik uyarı olmasaydı gerekecek artıştan çok daha az. [[K1 s. 133–134]]' },
      { V: 135, S: 82, Ss: 82, hr: 75, on: ['anp'], c: '<b>5 · ANP ve BNP.</b> Kalbin ürettiği atriyal ve beyin natriüretik peptit natriürez yapar; RAA\'nın getirdiği hacim artışını bir ölçüde dengeler. [[K1 s. 134]]' },
      { V: 135, S: 74, Ss: 74, hr: 75, on: ['beta'], c: '<b>6 · Zamanla.</b> Kalp sempatik etkinliğe daha az yanıt verir, çünkü β-reseptörler azalır (downregulation). Hastalık ilerledikçe kompansasyon yetmez: dekompanse yetersizlik (sonraki bölüm). [[K1 s. 134]]' },
    ];
    let i = 0, dar = false, stop = null, oyn = false, birik = 0;
    const kutular = [ // [id, x, y, w, h, satırlar, ton]
      ['sem', 4, 8, 152, 30, ['Sempatik uyarı'], 'cln'],
      ['kon', 4, 56, 152, 44, ['kontraktilite ↑', 'kalp hızı ↑'], 'cln'],
      ['kor', 4, 118, 152, 30, ['debi korunur'], 'cln'],
      ['anp', 4, 186, 152, 44, ['ANP, BNP →', 'natriürez'], 'ok'],
      ['beta', 4, 270, 152, 44, ['zamanla β-reseptör', 'azalması'], 'cln'],
      ['debi', 176, 8, 160, 30, ['debi ↓'], 'wrn'],
      ['rbf', 176, 52, 160, 30, ['RBF ↓'], 'wrn'],
      ['raa', 176, 96, 160, 30, ['RAA ekseni'], 'wrn'],
      ['hac', 176, 140, 160, 30, ['plazma hacmi ↑'], 'wrn'],
      ['onyuk', 176, 184, 160, 30, ['ön yük (LVEDV) ↑'], 'wrn'],
      ['sv', 176, 228, 160, 30, ['Starling: SV ↑'], 'wrn'],
    ];
    const KB = Object.fromEntries(kutular.map((k) => [k[0], k]));
    const okSema = [['sem', 'kon'], ['kon', 'kor'], ['debi', 'rbf'], ['rbf', 'raa'], ['raa', 'hac'], ['hac', 'onyuk'], ['onyuk', 'sv']];
    const semaSvg = () => {
      let s2 = '';
      okSema.forEach(([a, b]) => { const A1 = KB[a], B1 = KB[b], x = A1[1] + A1[3] / 2; s2 += `<g data-ok="${b}">${ok([[x, A1[2] + A1[4]], [x, B1[2] - 2]], `f30-ok-${A1[6]}`, 7)}</g>`; });
      const an = KB.anp, hc = KB.hac;
      s2 += `<g data-ok="anp">${ok([[an[1] + an[3], an[2] + 14], [hc[1] - 3, hc[2] + 22]], 'f30-ok-ok', 7)}${T(an[1] + an[3] + 6, an[2] + 2, 'f30-kb f30-t-ok', '−', 'start')}</g>`;
      kutular.forEach(([id, x, y, w, h, sat, ton]) => {
        s2 += `<g class="f30-mk f30-k-${ton}" data-mk="${id}">${Rc(x, y, w, h, 'f30-kr', ' rx="8"')}${sat.map((t, j) => T(x + w / 2, y + h / 2 + 5 - ((sat.length - 1) * 16) / 2 + j * 16, 'f30-kb', t, 'middle')).join('')}</g>`;
      });
      s2 += T(80, 168, 'f30-sm f30-t-cln', 'sempatik kol', 'middle') + T(256, 290, 'f30-sm f30-t-wrn', 'hacim kolu', 'middle');
      return svgAc(340, 320, 'f30-sema', 'Kompansasyon mekanizmaları şeması', s2);
    };
    const kur = () => {
      dar = darMi(el);
      el.classList.toggle('f30-dar', dar);
      el.innerHTML = `<div class="f30-adim"><div class="btn-row f30-adim-dug"><button type="button" class="btn ghost" data-a="geri">← Önceki</button><button type="button" class="btn" data-a="ileri">Sonraki →</button>${RM ? '' : `<button type="button" class="btn ghost" data-a="oyn" aria-pressed="${oyn}">${oyn ? '❚❚ Duraklat' : '▶ Oynat'}</button>`}</div>
        <div class="phase f30-faz" role="group" aria-label="Adımlar">${AD.map((a, k) => `<button type="button" data-i="${k}" aria-pressed="${k === i}" aria-label="Adım ${k + 1}: ${a}"><b>${k + 1}</b><span>${a}</span></button>`).join('')}</div></div>
        <div class="f30-iki f30-iki-k"><div><div class="f30-g"></div><div class="legend"><span><i class="f30-li-bsc"></i>normal ventrikül</span><span><i class="f30-li-crt"></i>kompansasyonsuz yetersiz ventrikül</span><span><i class="f30-li-cln"></i>sempatik kompansasyonlu yetersiz ventrikül</span></div>
        <p class="f30-co" aria-live="polite"></p></div><div>${semaSvg()}</div></div>`;
      git(i, true);
    };
    const ciz = (cur) => {
      const g = el.querySelector('.f30-g');
      if (!g) return;
      const o = dar ? { W: 360, H: 290, l: 46, r: 12, t: 46, b: 44 } : { W: 400, H: 300, l: 48, r: 14, t: 46, b: 44 };
      const G = grafik({ ...o, x: [0, 200], y: [0, 100], xt: [0, 40, 80, 120, 160, 200], yt: [0, 25, 50, 75, 100], xl: 'LVEDV (mL)', yl: 'SV (mL)' });
      const { X, Y } = G;
      let s2 = G.s;
      s2 += P(yol((v) => sv90(v, 95), 0, 200, X, Y), `f30-c-bsc ${i ? 'f30-ince' : 'f30-kalin'}`);
      if (i >= 1) s2 += P(yol((v) => sv90(v, 70), 0, 200, X, Y), `f30-c-crt ${i === 1 ? 'f30-kalin' : 'f30-ince'}`);
      if (i >= 2) s2 += P(yol((v) => sv90(v, cur.Ss), 0, 200, X, Y), 'f30-c-cln f30-kalin');
      if (i === 2) s2 += ok([[X(175), Y(sv90(175, 70)) - 3], [X(175), Y(sv90(175, 82)) + 4]], 'f30-ok-cln', 7);
      const sv = sv90(cur.V, cur.S), px = X(cur.V), py = Y(sv);
      if (i === 3) {
        const xr = X(200) + 2;
        s2 += ok([[px + 8, py], [xr, py]], 'f30-ok-crt f30-kesik', 8);
        s2 += T(X(200), o.t - 26, 'f30-sm f30-t-crt', 'sempatik uyarı olmasaydı:', 'end') + T(X(200), o.t - 11, 'f30-sm f30-t-crt', '> 200 mL gerekirdi', 'end');
        s2 += C(X(120), Y(sv90(120, 82)), 5, 'f30-hayal') + ok([[X(120) + 7, Y(sv90(120, 82)) + 12], [px - 6, Y(sv90(120, 82)) + 12]], 'f30-ok-wrn', 6);
      }
      if (i === 4) s2 += C(X(140), Y(sv90(140, 82)), 5, 'f30-hayal') + ok([[X(142), py - 16], [X(132), py - 16]], 'f30-ok-ok', 7) + T(X(137), py - 24, 'f30-sm f30-t-ok', 'ANP/BNP', 'middle');
      s2 += Ln(px, py, px, Y(0), 'f30-kil') + Ln(X(0), py, px, py, 'f30-kil') + C(px, py, 6, 'f30-nok');
      if (i < 2) s2 += T(px + 12, py + 24, 'f30-lb f30-hale', `SV ≈ ${n0(sv)} mL`);
      g.innerHTML = svgAc(o.W, o.H, '', `Starling grafiği, adım ${i + 1}: LVEDV ${n0(cur.V)} mL, SV ${n0(sv)} mL`, s2);
      const co = (sv * cur.hr) / 1000, coEl = el.querySelector('.f30-co');
      if (coEl) coEl.innerHTML = `SV ${n0(sv)} mL × kalp hızı ${n0(cur.hr)} /dk = <b class="${co < 4.5 ? 'f30-t-crt' : 'f30-t-ok'}">CO ${fmt(co, 1)} L/dk</b>`;
    };
    const tw = tween(ciz, 500);
    const git = (k, aninda) => {
      i = clamp(k, 0, A.length - 1);
      const a = A[i];
      if (i === 5 && !aninda) tw({ V: a.V, S: a.S, Ss: a.Ss, hr: a.hr }, false, 1500);
      else tw({ V: a.V, S: a.S, Ss: a.Ss, hr: a.hr }, aninda);
      el.querySelectorAll('.f30-faz button').forEach((b, j) => { b.classList.toggle('on', j === i); b.classList.toggle('past', j < i); b.setAttribute('aria-pressed', String(j === i)); });
      const gecmis = new Set(); A.slice(0, i).forEach((x) => x.on.forEach((id) => gecmis.add(id)));
      el.querySelectorAll('[data-mk]').forEach((g) => { const id = g.dataset.mk; g.classList.toggle('on', a.on.includes(id)); g.classList.toggle('past', !a.on.includes(id) && gecmis.has(id)); });
      el.querySelectorAll('[data-ok]').forEach((g) => { const id = g.dataset.ok; g.classList.toggle('on', a.on.includes(id)); g.classList.toggle('past', !a.on.includes(id) && gecmis.has(id)); });
      const gb = el.querySelector('[data-a="geri"]'), ib = el.querySelector('[data-a="ileri"]');
      if (gb) gb.disabled = i === 0; if (ib) ib.disabled = i === A.length - 1;
      capY(a.c);
    };
    const oynDug = () => { const b = el.querySelector('[data-a="oyn"]'); if (b) { b.textContent = oyn ? '❚❚ Duraklat' : '▶ Oynat'; b.setAttribute('aria-pressed', String(oyn)); } };
    const durdur = () => { oyn = false; if (stop) { stop(); stop = null; } oynDug(); };
    el.addEventListener('click', (e) => {
      const f = e.target.closest('.f30-faz [data-i]');
      if (f) { durdur(); git(+f.dataset.i); return; }
      const b = e.target.closest('[data-a]');
      if (!b) return;
      if (b.dataset.a === 'geri') { durdur(); git(i - 1); }
      if (b.dataset.a === 'ileri') { durdur(); git(i + 1); }
      if (b.dataset.a === 'oyn') {
        if (oyn) { durdur(); return; }
        oyn = true; birik = 0; oynDug();
        if (i === A.length - 1) git(0);
        stop = ticker(el, (dt) => { birik += dt; if (birik >= 3) { birik = 0; git(i + 1); if (i === A.length - 1) durdur(); } });
      }
    });
    kur();
    const ro = genislikIzle(el, kur);
    return () => { ro(); durdur(); tw.dur(); };
  };

  /* =====================================================================
     7 · Dekompansasyon: inen kol ve Laplace
     ===================================================================== */
  VIZ.f30_dekomp = (el) => {
    const capY = capYazici(el);
    const SVd = (V) => 55 * (V / 130) * Math.exp(1 - V / 130);
    const rad = (V) => Math.cbrt((3 * V) / (4 * Math.PI));
    const s = { V: 120 };
    let dar = false;
    const kur = () => {
      dar = darMi(el);
      el.classList.toggle('f30-dar', dar);
      el.innerHTML = `<div class="f30-ctl">${rngHtml('LVEDV', 'v', 60, 200, 5, s.V, `LVEDV ${s.V} mL`, s.V + ' mL')}</div>
        <div class="f30-iki f30-iki-d"><div class="f30-g"></div><div><div class="f30-lap"></div><div class="f30-bar"><span>Aynı T ile oluşan basınç</span><div class="f30-bar-iz"><i></i><em class="f30-bar-100"></em></div><b></b></div></div></div>
        <dl class="f30-oku f30-oku-4">${okuHtml([['v', 'LVEDV'], ['sv', 'SV'], ['r', 'Yarıçap'], ['p', 'Basınç (aynı T)']])}</dl>`;
      tw.yeniden();
    };
    const ciz = (cur) => {
      const g = el.querySelector('.f30-g'), lp = el.querySelector('.f30-lap');
      if (!g) return;
      const V = cur.V;
      const o = dar ? { W: 360, H: 280, l: 46, r: 12, t: 46, b: 44 } : { W: 400, H: 280, l: 48, r: 14, t: 46, b: 44 };
      const G = grafik({ ...o, x: [0, 200], y: [0, 75], xt: [0, 40, 80, 120, 160, 200], yt: [0, 25, 50, 75], xl: 'LVEDV (mL)', yl: 'SV (mL)' });
      const { X, Y } = G;
      let s2 = Rc(X(130), o.t, X(200) - X(130), G.ph, 'f30-bant-crt') + G.s;
      s2 += Ln(X(130), o.t, X(130), Y(0), 'f30-kes');
      s2 += T(X(200), o.t - 26, 'f30-sm f30-t-crt', 'sarkomerler aşırı gerilmiş:', 'end') + T(X(200), o.t - 11, 'f30-sm f30-t-crt', 'LVEDV ↑ → SV ↓', 'end');
      s2 += P(yol(SVd, 0, 200, X, Y), 'f30-c-crt f30-kalin');
      s2 += T(X(4), Y(8), 'f30-sm f30-t-crt', 'dekompanse kalp yetersizliği', 'start');
      const px = X(V), py = Y(SVd(V));
      s2 += Ln(px, py, px, Y(0), 'f30-kil') + Ln(X(0), py, px, py, 'f30-kil') + C(px, py, 6, 'f30-nok');
      const lab = `SV ≈ ${n0(SVd(V))} mL`;
      s2 += V < 110 ? T(px + 10, py + 26, 'f30-lb f30-hale', lab) : T(px, py + 32, 'f30-lb f30-hale', lab, V > 175 ? 'end' : 'middle');
      g.innerHTML = svgAc(o.W, o.H, '', `Dekompanse eğri: LVEDV ${n0(V)} mL, SV ${n0(SVd(V))} mL`, s2);
      // Laplace paneli
      const r = rad(V), R = clamp(60 + ((r - 2.4) / 1.2) * 30, 56, 94), cx = 150, cy = 130, D = 14;
      const p = (rad(120) / r) * 100;
      let l2 = C(cx, cy, R + D / 2, 'f30-duvar', ` stroke-width="${D}"`) + C(cx, cy, R, 'f30-duvar-k') + C(cx, cy, R + D, 'f30-duvar-k');
      // teğet T okları (üstte)
      const yay = (a1, a2) => { const rr = R + D + 8, pts = []; for (let k = 0; k <= 10; k++) { const a = a1 + ((a2 - a1) * k) / 10; pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); } return pts; };
      l2 += ok(yay(-Math.PI / 2 - 0.15, -Math.PI / 2 - 0.75), 'f30-ok-crt', 7) + ok(yay(-Math.PI / 2 + 0.15, -Math.PI / 2 + 0.75), 'f30-ok-crt', 7);
      l2 += T(cx, cy - R - D - 18, 'f30-sm f30-t-crt', 'T (duvar gerilimi) sabit', 'middle');
      [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4].forEach((a) => {
        l2 += ok([[cx + (R - 4) * Math.cos(a), cy + (R - 4) * Math.sin(a)], [cx + (R - 26) * Math.cos(a), cy + (R - 26) * Math.sin(a)]], 'f30-ok-acc', 7);
      });
      l2 += T(cx, cy + 6, 'f30-kb f30-t-acc', 'P', 'middle');
      l2 += Ln(cx + 12, cy, cx + R, cy, 'f30-yaricap') + T(cx + R / 2 + 6, cy - 6, 'f30-sm', `r ≈ ${fmt(r, 1)} cm`, 'middle');
      l2 += T(cx, 262, 'f30-lb', 'P = 2T / r', 'middle');
      if (lp) lp.innerHTML = svgAc(300, 272, '', `Ventrikül kesiti: yarıçap ${fmt(r, 1)} cm, aynı duvar gerilimiyle basınç yüzde ${n0(p)}`, l2);
      const bar = el.querySelector('.f30-bar');
      if (bar) {
        bar.querySelector('i').style.width = r1((p / 130) * 100) + '%';
        bar.querySelector('.f30-bar-100').style.left = r1((100 / 130) * 100) + '%';
        bar.querySelector('b').textContent = '%' + n0(p);
      }
    };
    const tw = tween(ciz, 400);
    const guncelle = (aninda) => {
      tw({ V: s.V }, aninda);
      const r = rad(s.V), p = (rad(120) / r) * 100, sv = SVd(s.V);
      rngYaz(el, 'v', s.V + ' mL', `LVEDV ${s.V} mL`);
      okuYaz(el, 'v', s.V + ' <small>mL</small>');
      okuYaz(el, 'sv', '≈ ' + n0(sv) + ' <small>mL</small>', s.V > 130 ? 'f30-kt-crt' : '');
      okuYaz(el, 'r', '≈ ' + fmt(r, 1) + ' <small>cm</small>');
      okuYaz(el, 'p', '%' + n0(p), p < 100 ? 'f30-kt-crt' : '');
      let c = null;
      if (s.V >= 180) c = `<b>LVEDV ${s.V} mL · genişlemiş ventrikül.</b> Laplace yasasına göre aynı aktif duvar gerilimiyle büyük yarıçaplı ventrikül daha düşük basınç oluşturur (burada %${n0(p)}). Aynı basıncı üretmek için miyokard daha çok iş yapmalıdır. [[K1 s. 83, 134]]`;
      else if (s.V > 130) c = `<b>LVEDV ${s.V} mL · inen kol.</b> Sarkomerler optimum uzunluğun ötesine gerildi; kasılmada oluşan gerilim azalır ve ek ön yük SV'yi artık düşürür. Debi düşer: dekompanse kalp yetersizliği. [[K1 s. 134]]`;
      else if (s.V !== 120) c = `<b>LVEDV ${s.V} mL.</b> Sarkomerler optimuma yakın. LVEDV'yi artırın: tepe noktasından sonra sarkomerler aşırı gerilir ve her ek dolum SV'yi azaltır; aynı duvar gerilimiyle büyüyen ventrikül daha düşük basınç oluşturur. [[K1 s. 134]]`;
      capY(c);
    };
    el.addEventListener('input', (e) => { const r = e.target.closest('[data-r="v"]'); if (r) { s.V = +r.value; guncelle(); } });
    kur(); guncelle(true);
    const ro = genislikIzle(el, () => { kur(); guncelle(true); });
    return () => { ro(); tw.dur(); };
  };

  /* =====================================================================
     8 · İleri ve geri yönde yetersizlik
     ===================================================================== */
  VIZ.f30_sonuc = (el) => {
    const capY = capYazici(el);
    const CAP = {
      ileri: null,
      geri: '<b>Geri yönde yetersizlik.</b> LVEDV artışı atriyum basıncını anormal yükseltir; kan geride birikir. Akciğerlere ya da sağ kalbin gerisindeki organlara dokunun. [[K1 s. 134]]',
      bobrek: '<b>Böbrek yetersizliği.</b> Azalan RBF böbrek işlevini bozar ve RAA eksenini etkinleştirir; plazma hacmi daha da artar ve geri yönde yetersizlik ağırlaşır. [[K1 s. 134]]',
      kas: '<b>Egzersiz.</b> Sol ventrikül egzersizin artmış O₂ gereksinimini karşılayamaz: yorgunluk. Yetersizlik ağırlaştıkça yorgunluk önce en küçük eforla, sonra istirahatte başlar; NYHA sınıflaması bunu yansıtır. [[K1 s. 134]]',
      koroner: '<b>Koroner dolaşım.</b> Akut sol ventrikül işlev bozukluğu kardiyojenik şoka yol açabilir: düşen debi koroner akımı azaltır, miyokard iskemisi kontraktiliteyi ve debiyi daha da düşürür; kısır döngü. [[K1 s. 134]]',
      akciger: '<b>Pulmoner ödem.</b> Sol atriyum basıncı arttıkça pulmoner interstisyel basınç yükselir; Starling filtrasyon kuvvetleri sıvının akciğer tabanlarında damar dışına çıkmasını kolaylaştırır: pulmoner ödem ve dispne. [[K1 s. 134–135, 158]]',
      rv: '<b>Sağ ventrikül yetersizliği.</b> Süregen yüksek pulmoner venöz basınç sağ ventrikül ard yükünü artırır ve RVF\'ye yol açabilir. [[K1 s. 135]]',
      pnd: '<b>Paroksismal noktürnal dispne.</b> Gece sırtüstü yatınca bacaklardan gelen kan venöz dönüşü artırır; sol ventrikül debisini artıramadığı için bu kan akciğerde birikir ve ödem ağırlaşır. [[K1 s. 135]]',
      venler: '<b>Periferik ödem.</b> Sağ atriyum basıncı artınca santral venöz basınç yükselir; Starling kuvvetleri sıvıyı önce bağımlı bölgelerde damar dışına çıkarır: ayak bileği ve sakral ödem. [[K1 s. 135]]',
      karaciger: '<b>İlerlemiş RVF.</b> Asit ve hepatomegali gelişir; karaciğer işlev bozukluğu (ör. koagülopati) eşlik edebilir. [[K1 s. 135]]',
      bagirsak: '<b>Bağırsak duvarı ödemi.</b> Besin emilimi azalır (kardiyak kaşeksi), ilaç emilimi de azalır. Bakteri translokasyonu kolaylaşır; ortaya çıkan vazodilatör sitokinler yetersizliği daha da dekompanse edebilir. [[K1 s. 135]]',
    };
    // organ: [id, cap, yön, satırlar]
    const ORG = {
      koroner: ['koroner', 'ileri', ['Koroner damarlar', 'kısır döngü ↻']],
      bobrek: ['bobrek', 'ileri', ['Böbrek', 'RBF ↓ · RAA ↻']],
      kas: ['kas', 'ileri', ['İskelet kası', 'egzersiz']],
      venler: ['venler', 'geri', ['Sistemik venler', 'CVP ↑']],
      karaciger: ['karaciger', 'geri', ['Karaciğer', 'hepatomegali']],
      bagirsak: ['bagirsak', 'geri', ['Bağırsak', 'duvar ödemi']],
      karin: ['karaciger', 'geri', ['Karın', 'asit']],
      ayak: ['venler', 'geri', ['Ayak bileği ve sakrum', 'bağımlı ödem']],
    };
    const ADLAR = { akciger: 'Akciğerler', rv: 'Sağ ventrikül', koroner: 'Koroner', bobrek: 'Böbrek', kas: 'İskelet kası', venler: 'Sistemik venler', karaciger: 'Karaciğer', bagirsak: 'Bağırsak', karin: 'Karın (asit)', ayak: 'Ayak bileği, sakrum' };
    const GEN = {
      W: 560, H: 372,
      ak: [[222, 74], [338, 74]], akr: [48, 52], akEt: [280, 118],
      oda: { RA: [205, 150, 67, 48], LA: [288, 150, 67, 48], RV: [205, 222, 67, 48], LV: [288, 222, 67, 48] },
      org: { koroner: [424, 92, 130, 42], bobrek: [424, 158, 130, 42], kas: [424, 224, 130, 42], venler: [8, 150, 146, 42], karaciger: [8, 204, 146, 42], bagirsak: [8, 258, 146, 42], karin: [8, 312, 146, 42], ayak: [192, 318, 176, 42] },
      ileri: [[[355, 246], [394, 246], [394, 113], [422, 113]], [[394, 179], [422, 179]], [[394, 245], [422, 245]]],
      geri: [[[321, 222], [321, 200]], [[321, 150], [332, 127]], [[206, 116], [186, 138], [186, 246], [203, 246]], [[238, 222], [238, 200]], [[205, 171], [156, 171]],
        [[166, 175], [166, 333]], [[166, 225], [156, 225]], [[166, 279], [156, 279]], [[166, 333], [156, 333]], [[166, 333], [190, 333]]],
      pnd: [[280, 318], [280, 302], [176, 302], [176, 178], [238, 178], [238, 246], [190, 246], [190, 136], [214, 112]],
      lvEt: [322, 290], damla: [[222, 108], [338, 108], [380, 334], [140, 324]],
    };
    const NAR = {
      W: 360, H: 500,
      ak: [[128, 62], [232, 62]], akr: [44, 48], akEt: [180, 104],
      oda: { RA: [105, 134, 66, 46], LA: [189, 134, 66, 46], RV: [105, 202, 66, 46], LV: [189, 202, 66, 46] },
      org: { venler: [4, 290, 164, 42], karaciger: [4, 342, 164, 42], bagirsak: [4, 394, 164, 42], karin: [4, 446, 164, 42], koroner: [192, 290, 164, 42], bobrek: [192, 342, 164, 42], kas: [192, 394, 164, 42], ayak: [192, 446, 164, 42] },
      ileri: [[[222, 248], [222, 270], [274, 270], [274, 288]]],
      geri: [[[222, 202], [222, 180]], [[222, 134], [228, 112]], [[110, 104], [90, 124], [90, 225], [103, 225]], [[138, 202], [138, 180]], [[105, 168], [40, 168], [40, 288]]],
      pnd: [[274, 446], [274, 438], [180, 438], [180, 186], [138, 186], [138, 225], [94, 225], [94, 124], [112, 102]],
      lvEt: [306, 230], damla: [[128, 96], [232, 96], [348, 441], [154, 467]],
    };
    const s = { yon: 'ileri', sec: null, pnd: 0, pndOn: false };
    let dar = false, L = null, stop = null, tms = [];
    const kur = () => {
      dar = darMi(el);
      el.classList.toggle('f30-dar', dar);
      L = dar ? NAR : GEN;
      let s2 = `<defs><clipPath id="f30-akc">${L.ak.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="${L.akr[0]}" ry="${L.akr[1]}"/>`).join('')}</clipPath></defs>`;
      // akciğerler
      s2 += `<g class="f30-org f30-o-geri" data-o="akciger" role="button" tabindex="0" aria-label="Akciğerler">`;
      L.ak.forEach(([x, y]) => { s2 += `<ellipse cx="${x}" cy="${y}" rx="${L.akr[0]}" ry="${L.akr[1]}" class="f30-akc"/>`; });
      s2 += `<g clip-path="url(#f30-akc)"><rect class="f30-akc-sivi" x="0" y="${L.ak[0][1] + L.akr[1]}" width="${L.W}" height="0"/></g>`;
      L.ak.forEach(([x, y]) => { s2 += Ln(x - L.akr[0] * 0.7, y + L.akr[1] * 0.62, x + L.akr[0] * 0.7, y + L.akr[1] * 0.62, 'f30-taban'); });
      s2 += T(L.ak[0][0], L.ak[0][1] + 4, 'f30-kb', 'akciğer', 'middle') + T(L.ak[1][0], L.ak[1][1] + 4, 'f30-kb', 'akciğer', 'middle');
      s2 += T(L.akEt[0], L.akEt[1] + 4, 'f30-sm', 'tabanlar', 'middle');
      s2 += '</g>';
      // kalp
      Object.entries(L.oda).forEach(([ad, [x, y, w, h]]) => {
        const rv = ad === 'RV';
        s2 += rv ? `<g class="f30-org f30-o-geri" data-o="rv" role="button" tabindex="0" aria-label="Sağ ventrikül">` : '<g>';
        s2 += Rc(x, y, w, h, `f30-oda${ad === 'LV' ? ' f30-oda-lv' : ''}`, ' rx="10"') + T(x + w / 2, y + h / 2 + (ad === 'LV' ? 0 : 5), 'f30-kb', ad, 'middle');
        if (ad === 'LV') s2 += T(x + w / 2, y + h / 2 + 15, 'f30-sm f30-t-crt', 'yetersiz', 'middle');
        s2 += '</g>';
      });
      // oklar
      L.ileri.forEach((p) => { s2 += ok(p, 'f30-ok-crt f30-ileri-ok', 7); });
      L.geri.forEach((p, k) => { s2 += ok(p, `f30-ok-wrn f30-geri-ok${k > 4 ? ' f30-geri-ince' : ''}`, 9, ` style="--i:${Math.min(k, 5)}"`); });
      // organlar
      Object.entries(L.org).forEach(([id, [x, y, w, h]]) => {
        const [, yon, sat] = ORG[id];
        s2 += `<g class="f30-org f30-o-${yon}" data-o="${id}" role="button" tabindex="0" aria-label="${sat.join(', ')}">${Rc(x, y, w, h, 'f30-kr', ' rx="9"')}${T(x + w / 2, y + 17, 'f30-kb', sat[0], 'middle')}${T(x + w / 2, y + 33, 'f30-ks', sat[1], 'middle')}</g>`;
      });
      // damlalar (ödem)
      L.damla.forEach(([x, y]) => { s2 += `<path class="f30-damla" d="M${x},${y - 8} C${x + 6},${y - 1} ${x + 5},${y + 5} ${x},${y + 5} C${x - 5},${y + 5} ${x - 6},${y - 1} ${x},${y - 8}Z"/>`; });
      s2 += T(L.lvEt[0], L.lvEt[1], 'f30-sm f30-t-crt f30-lv-et', 'debi artamıyor', 'middle');
      s2 += '<g class="f30-pndp">' + Array.from({ length: 8 }, () => C(-20, -20, 4.5, 'f30-pk-b')).join('') + '</g>';
      el.innerHTML = `<div class="f30-ctl">${segHtml('Yön', 'yon', [['ileri', 'İleri yönde'], ['geri', 'Geri yönde']], s.yon)}
        <button type="button" class="btn ghost f30-pnd-d" data-a="pnd">☾ Gece sırtüstü yatınca</button></div>
        <div class="f30-son-g">${svgAc(L.W, L.H, 'f30-harita', 'Dolaşım haritası: yetersiz sol ventrikülün ileri ve geri yöndeki sonuçları; organlara dokunun', s2)}</div>
        <div class="btn-row f30-org-l" role="group" aria-label="Organlar">${Object.keys(ADLAR).map((k) => `<button type="button" class="btn ghost" data-ol="${k}" aria-pressed="false">${ADLAR[k]}</button>`).join('')}</div>`;
      uygula(true);
    };
    const yonDegis = (y, aninda) => {
      s.yon = y; basSec(el, 'yon', y);
      const root = el;
      root.classList.toggle('f30-ileri', y === 'ileri'); root.classList.toggle('f30-geri', y === 'geri');
      if (y !== 'geri') { s.pnd = 0; s.pndOn = false; }
      if (aninda || RM) root.classList.add('f30-rm'); else { root.classList.remove('f30-rm'); }
    };
    const uygula = (aninda) => {
      yonDegis(s.yon, aninda);
      el.querySelectorAll('[data-o]').forEach((g) => { const on = g.dataset.o === s.sec; g.classList.toggle('sec', on); g.setAttribute('aria-pressed', String(on)); });
      el.querySelectorAll('[data-ol]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.ol === s.sec)));
      const pb = el.querySelector('[data-a="pnd"]'); if (pb) { pb.disabled = s.yon !== 'geri'; pb.setAttribute('aria-pressed', String(s.pndOn)); }
      pndCiz();
      let c = CAP[s.yon];
      if (s.pndOn) c = CAP.pnd;
      else if (s.sec) c = CAP[s.sec === 'karin' ? 'karaciger' : s.sec === 'ayak' ? 'venler' : s.sec];
      capY(c);
    };
    const pndCiz = () => {
      if (!L) return;
      const f = s.pndOn ? clamp(s.pnd / 3, 0, 1) : 0;
      const taban = L.ak[0][1] + L.akr[1], hBaz = s.yon === 'geri' ? L.akr[1] * 0.42 : 0, h = hBaz + L.akr[1] * 0.4 * f;
      const sv = el.querySelector('.f30-akc-sivi');
      if (sv) { sv.setAttribute('y', r1(taban - h)); sv.setAttribute('height', r1(h)); }
      const et = el.querySelector('.f30-lv-et'); if (et) et.style.opacity = s.pndOn && f > 0.3 ? 1 : 0;
      const pts = L.pnd, seg = []; let top = 0;
      for (let k = 1; k < pts.length; k++) { const l = Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]); seg.push([pts[k - 1], pts[k], l]); top += l; }
      el.querySelectorAll('.f30-pk-b').forEach((c, k) => {
        if (!s.pndOn || f >= 1) { c.setAttribute('cx', -20); return; }
        let d = (((s.pnd * 0.55 + k / 8) % 1)) * top, x = -20, y = -20;
        for (const [a, b, l] of seg) { if (d <= l) { x = lerp(a[0], b[0], d / l); y = lerp(a[1], b[1], d / l); break; } d -= l; }
        c.setAttribute('cx', r1(x)); c.setAttribute('cy', r1(y));
      });
    };
    const pndBas = () => {
      if (stop) { stop(); stop = null; }
      s.pndOn = true; s.sec = null;
      if (RM) { s.pnd = 3; uygula(); return; }
      s.pnd = 0; uygula();
      stop = ticker(el, (dt) => { s.pnd += dt; pndCiz(); if (s.pnd >= 3) { s.pnd = 3; pndCiz(); stop(); stop = null; } });
    };
    const organ = (id) => {
      if (stop) { stop(); stop = null; }
      s.pndOn = false;
      const yon = id === 'akciger' || id === 'rv' ? 'geri' : ORG[id][1];
      const deg = yon !== s.yon;
      s.yon = yon; s.sec = id; uygula(!deg);
    };
    el.addEventListener('click', (e) => {
      const y = e.target.closest('[data-yon]');
      if (y) { if (stop) { stop(); stop = null; } s.pndOn = false; s.sec = null; const deg = y.dataset.yon !== s.yon; s.yon = y.dataset.yon; uygula(!deg); return; }
      if (e.target.closest('[data-a="pnd"]')) { pndBas(); return; }
      const o = e.target.closest('[data-o]') || e.target.closest('[data-ol]');
      if (o) organ(o.dataset.o || o.dataset.ol);
    });
    el.addEventListener('keydown', (e) => { const o = e.target.closest('[data-o]'); if (o && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); organ(o.dataset.o); } });
    kur();
    const ro = genislikIzle(el, kur);
    return () => { ro(); if (stop) stop(); tms.forEach(clearTimeout); };
  };
})();
