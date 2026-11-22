/* Fizyoloji Bölüm 23 · Pulmoner dolaşım · bileşenler (K1 s. 97–101). Tarif: docs/tasarim/fiz23.md
   Modeller şematiktir; sayfadaki viz-foot notları bunu söyler. Renkler yalnız site.css değişkenleriyle (css/fiz23.css).
   Bileşen kutusu 520 px'ten darsa her bileşen telefon yerleşimine geçer (ResizeObserver ile). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;

  /* ---------- ortak ---------- */
  const DAR = 520;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2);
  const fmt = (v, d = 1) => { let s = (+v).toFixed(d); if (/^-0(\.0+)?$/.test(s)) s = s.slice(1); return s.replace('.', ',').replace('-', '−'); };
  const r1 = (v) => Math.round(v * 10) / 10;
  const yol = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + r1(p[0]) + ' ' + r1(p[1])).join(' ');
  const T = (x, y, cls, s, a = 'start', ek = '') => `<text x="${r1(x)}" y="${r1(y)}" class="${cls}" text-anchor="${a}"${ek}>${s}</text>`;
  const at = (e, o) => { if (e) for (const k in o) e.setAttribute(k, typeof o[k] === 'number' ? r1(o[k]) : o[k]); };
  const gor = (e, on) => { if (e) e.style.display = on ? '' : 'none'; };
  const segHtml = (ad, key, opts, cur, ek = '') => `<div class="seg"${ek} role="group" aria-label="${ad}">${opts.map(([v, l, t]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}"${t ? ` title="${t}"` : ''}>${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const capYazici = (el, ilk) => {
    const v = el.closest('.viz'), cap = v && v.querySelector('.viz-cap');
    let son = ilk || null;
    return (h) => { if (cap && h !== son) { cap.innerHTML = REF(h); son = h; } };
  };
  const genislikIzle = (el, cb) => {
    let son = el.clientWidth > 0 && el.clientWidth < DAR;
    const bak = () => { const d = el.clientWidth > 0 && el.clientWidth < DAR; if (d !== son) { son = d; cb(); } };
    if ('ResizeObserver' in window) { const ro = new ResizeObserver(bak); ro.observe(el); return () => ro.disconnect(); }
    window.addEventListener('resize', bak);
    return () => window.removeEventListener('resize', bak);
  };
  const darMi = (el) => el.clientWidth > 0 && el.clientWidth < DAR;
  // eksen, ızgara ve çentik yazıları (G: {x0, x1, y0, y1, tkY})
  const eksen = (G, xs, ys, X, Y, xe = (t) => fmt(t, t % 1 ? 1 : 0)) => {
    let h = '';
    ys.forEach((t) => { h += `<line class="f23-izg" x1="${G.x0}" x2="${G.x1}" y1="${r1(Y(t))}" y2="${r1(Y(t))}"/>` + T(G.x0 - 6, Y(t) + 4, 'f23-tk', t, 'end'); });
    xs.forEach((t) => { h += `<line class="f23-eks" x1="${r1(X(t))}" x2="${r1(X(t))}" y1="${G.y1}" y2="${G.y1 + 4}"/>` + T(X(t), G.tkY, 'f23-tk', xe(t), 'middle'); });
    return h + `<line class="f23-eks" x1="${G.x0}" x2="${G.x0}" y1="${G.y0}" y2="${G.y1}"/><line class="f23-eks" x1="${G.x0}" x2="${G.x1}" y1="${G.y1}" y2="${G.y1}"/>`;
  };
  // SVG yolunu örnekle: uzunluk ve konum tablosu (akış noktaları için)
  const ornekle = (p, adim = 2) => {
    let L = 0;
    try { L = p.getTotalLength(); } catch (e) { L = 0; }
    const n = Math.max(2, Math.ceil(L / adim)), pts = [];
    for (let i = 0; i <= n; i++) { let q = { x: 0, y: 0 }; try { q = p.getPointAtLength((i / n) * L); } catch (e) { /* çizilmemiş */ } pts.push([q.x, q.y]); }
    return { L, at(s) { const f = clamp(s / (L || 1), 0, 1) * n, i = Math.min(n - 1, Math.floor(f)), r = f - i; return [lerp(pts[i][0], pts[i + 1][0], r), lerp(pts[i][1], pts[i + 1][1], r)]; } };
  };
  // N noktayı M yuvaya olabildiğince eşit dağıt (akım değişince yalnız birkaç nokta yanıp söner)
  const yuvaAcik = (k, M, N) => Math.floor(((k + 1) * N) / M) > Math.floor((k * N) / M);

  // basit geçiş (RM'de anında)
  const Gecis = (v0) => {
    let from = v0, to = v0, t = 1, dur = 0.8, val = v0;
    return {
      get v() { return val; },
      get hedef() { return to; },
      get aktif() { return t < 1; },
      set(x, d = 0.8) { if (RM || d <= 0) { from = to = val = x; t = 1; return; } from = val; to = x; t = 0; dur = d; },
      adim(dt) { if (t >= 1) return false; t = Math.min(1, t + dt / dur); val = lerp(from, to, ease(t)); return true; },
    };
  };

  /* oksihemoglobin eğrisi (Severinghaus); satürasyon %, basınç kPa */
  const S_O2 = (kPa) => { const p = kPa * 7.50062; return 100 / (1 + 23400 / (p * p * p + 150 * p)); };
  const P_O2 = (sat) => { let a = 0.5, b = 80; for (let i = 0; i < 40; i++) { const m = (a + b) / 2; if (S_O2(m) < sat) a = m; else b = m; } return (a + b) / 2; };

  /* Türkçe sayı ekleri: %159'u, %120'si, %25'e, %36'ya */
  const SESLI = 'aeıioöuü';
  const sonSozcuk = (n) => {
    n = Math.abs(Math.round(n));
    if (n === 0) return 'sıfır';
    if (n % 10) return ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'][n % 10];
    if (n % 100) return ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'][(n % 100) / 10];
    return n % 1000 ? 'yüz' : 'bin';
  };
  const sonSesli = (w) => { for (let i = w.length - 1; i >= 0; i--) if (SESLI.includes(w[i])) return w[i]; return 'e'; };
  const ekIyelik = (n) => { const w = sonSozcuk(n), v = sonSesli(w); return "'" + (SESLI.includes(w[w.length - 1]) ? 's' : '') + { a: 'ı', ı: 'ı', e: 'i', i: 'i', o: 'u', u: 'u', ö: 'ü', ü: 'ü' }[v]; };
  const ekYonelme = (n) => { const w = sonSozcuk(n), v = sonSesli(w); return "'" + (SESLI.includes(w[w.length - 1]) ? 'y' : '') + ('aıou'.includes(v) ? 'a' : 'e'); };

  /* ================================================================
     1 · Kalp debisi artınca: açılma (recruitment) ve genişleme (distansiyon)
     ================================================================ */
  VIZ.f23_acilma = (el) => {
    const PCWP = 5, F0 = 0.7, CMAX = 1 / F0, K = 5;
    const iletk = (co) => Math.pow(co / 5, 0.45);
    const pvr = (co) => 160 / iletk(co);
    const mpap = (co) => PCWP + (pvr(co) * co) / 80;
    const acikOran = (co) => Math.min(1, F0 * iletk(co));
    const yaricap = (co) => { const c = iletk(co); return Math.pow(c / Math.min(c, CMAX), 0.25); };
    const sabit = (co) => 5 + 2 * co;
    const CO_ESIK = 5 * Math.pow(CMAX, 1 / 0.45); // ≈ 11,05 L/dk: bütün kapillerler açık
    const MP_ESIK = mpap(CO_ESIK); // ≈ 20,5 mmHg
    const SIRA = [4, 5, 3, 6, 2, 7, 1, 8, 0, 9];
    const HAZIR = { dusuk: 2.5, ist: 5, orta: 15, agir: 25 };
    const CAP = {
      ist: "<b>İstirahat.</b> Kalp debisi 5 L/dk, MPAP 15 mmHg, PCWP 5 mmHg: PVR = 80 × (15 − 5) / 5 = 160 dyn·s·cm⁻⁵. Kapillerlerin bir bölümü kapalıdır. Kalp debisini artırın: önce kapalı kapillerler açılır, hepsi açıldıktan sonra açık kapillerler genişler; PVR düştüğü için MPAP yalnızca ılımlı yükselir. [[K1 s. 98]]",
      dusuk: "<b>Düşük debi, düşük basınç.</b> Kalp debisi 2,5 L/dk iken modelde MPAP ≈ 11,8 mmHg; kapillerlerin yarısı kapalı olduğu için PVR yüksektir (≈219 dyn·s·cm⁻⁵). Düşük basınçta PVR'yi en çok değiştiren mekanizma kapalı kapillerlerin açılmasıdır. [[K1 s. 98]]",
      orta: "<b>Orta egzersiz.</b> Kalp debisi üç katına (15 L/dk) çıktı, ama MPAP yalnızca ≈23 mmHg'ye yükseldi: bütün kapillerler açıldı ve genişlemeye başladı, PVR ≈98 dyn·s·cm⁻⁵'e düştü. Direnç sabit kalsaydı MPAP 35 mmHg olurdu. [[K1 s. 98]]",
      agir: "<b>Ağır egzersiz.</b> Kalp debisi 25 L/dk: açılma tamamlandığı için PVR'yi artık yalnızca genişleme düşürür (≈78 dyn·s·cm⁻⁵); MPAP ≈29 mmHg. Bu yedeğin bir sınırı vardır: yarış atlarında sınıra orta egzersizde ulaşılır ve ağır egzersiz pulmoner kanamaya yol açabilir; insanda bu sık değildir. [[K1 s. 98–99]]",
    };
    const serbest = (co) => `Kalp debisi ${fmt(co)} L/dk: MPAP ${fmt(mpap(co))} mmHg, PVR ${Math.round(pvr(co))} dyn·s·cm⁻⁵ (direnç sabit olsaydı MPAP ${fmt(sabit(co))} mmHg). `
      + (co < CO_ESIK ? 'Kapalı kapillerler açılıyor (açılma, recruitment): düşük basınçta en önemli mekanizma budur. [[K1 s. 98]]'
        : "Bütün kapillerler açık; PVR'yi artık açık kapillerlerin genişlemesi (distansiyon) düşürüyor: yüksek basınçta en önemli mekanizma budur. [[K1 s. 98]]");
    const LW = {
      W: 720, H: 330, dar: false, ar: [24, 30, 20, 260], ve: [272, 30, 20, 260], kx: [44, 272], ky: (i) => 44 + i * 24, alvR: 7, alvA: 22, etY: 23, alt: [158, 318],
      A: { x0: 392, x1: 700, y0: 28, y1: 130, tY: 17, tkY: 145, xtY: 161 }, B: { x0: 392, x1: 700, y0: 196, y1: 290, tY: 185, tkY: 305, xtY: 322 },
      bant: ['açılma baskın', 'genişleme baskın'], gAlt: 18,
    };
    const LN = {
      W: 360, H: 622, dar: true, ar: [12, 22, 16, 226], ve: [332, 22, 16, 226], kx: [28, 332], ky: (i) => 36 + i * 22, alvR: 6.5, alvA: 22, etY: 15, alt: [180, 272],
      A: { x0: 50, x1: 346, y0: 306, y1: 410, tY: 294, tkY: 428, xtY: 446 }, B: { x0: 50, x1: 346, y0: 484, y1: 580, tY: 472, tkY: 598, xtY: 616 },
      bant: ['açılma', 'genişleme'], gAlt: 22,
    };
    const capY = capYazici(el, CAP.ist);
    let co = 5, mod = 'ist', oyn = null, L = LW, E = {}, sonYaz = '', sonSn = -1;
    const gc = Gecis(5);
    const acik = Array.from({ length: 10 }, (_, i) => (SIRA.indexOf(i) < 7 ? 1 : 0));
    const faz = Array.from({ length: 10 }, (_, i) => (i * 0.137) % 1);

    el.innerHTML = `<div class="f23-ctl">${segHtml('Hazır durum', 'h', [['dusuk', 'Düşük debi · 2,5'], ['ist', 'İstirahat · 5'], ['orta', 'Orta egzersiz · 15'], ['agir', 'Ağır egzersiz · 25']], 'ist')}
        <button type="button" class="btn ghost f23-oyna">Oynat: istirahatten ağır egzersize</button></div>
      <label class="f23-rng"><span>Kalp debisi (L/dk) <b data-o="co"></b></span><input type="range" min="2.5" max="25" step="0.5" value="5" aria-label="Kalp debisi"></label>
      <div class="f23-sahne"></div>
      <p class="f23-denk" data-o="denk"></p>
      <dl class="f23-oku f23-oku-4">
        <div><dt>Kalp debisi</dt><dd data-o="kco"></dd></div><div><dt>MPAP</dt><dd data-o="kmp"></dd></div>
        <div><dt>PVR</dt><dd data-o="kpvr"></dd></div><div><dt>Baskın mekanizma</dt><dd data-o="kmek"></dd></div>
      </dl>`;
    const sahne = el.querySelector('.f23-sahne'), rng = el.querySelector('input[type=range]'), oyB = el.querySelector('.f23-oyna');
    const o = (k) => el.querySelector(`[data-o="${k}"]`);

    const kur = () => {
      const dar = darMi(el);
      L = dar ? LN : LW;
      el.classList.toggle('f23-dar', dar);
      const { A, B } = L;
      const xA = (m) => A.x0 + ((m - 10) / 20) * (A.x1 - A.x0), yA = (p) => A.y1 - (p / 250) * (A.y1 - A.y0);
      const xB = (c) => B.x0 + (c / 25) * (B.x1 - B.x0), yB = (m) => B.y1 - (m / 60) * (B.y1 - B.y0);
      Object.assign(L, { xA, yA, xB, yB });
      const [ax, ay, aw, ah] = L.ar, [vx, vy, vw, vh] = L.ve;
      let h = `<defs><linearGradient id="f23-kap-grad" gradientUnits="userSpaceOnUse" x1="${L.kx[0]}" y1="0" x2="${L.kx[1]}" y2="0"><stop offset="0" class="f23-st-az"/><stop offset="1" class="f23-st-o2"/></linearGradient></defs>`;
      h += '<g class="f23-alv">';
      for (let i = 0; i < 9; i++) { const y = (L.ky(i) + L.ky(i + 1)) / 2; for (let x = L.kx[0] + 16; x <= L.kx[1] - 12; x += L.alvA) h += `<circle cx="${x}" cy="${y}" r="${L.alvR}"/>`; }
      h += '</g>';
      h += `<rect class="f23-art" x="${ax}" y="${ay}" width="${aw}" height="${ah}" rx="${aw / 2}"/><rect class="f23-ven" x="${vx}" y="${vy}" width="${vw}" height="${vh}" rx="${vw / 2}"/>`;
      h += dar ? T(ax - 4, L.etY, 'f23-tk', 'arteriyol', 'start') + T(vx + vw + 4, L.etY, 'f23-tk', 'venül', 'end')
        : T(ax + aw / 2, L.etY, 'f23-tk', 'arteriyol', 'middle') + T(vx + vw / 2, L.etY, 'f23-tk', 'venül', 'middle');
      for (let i = 0; i < 10; i++) {
        const y = L.ky(i);
        h += `<line class="f23-kap-k" x1="${L.kx[0]}" x2="${L.kx[1]}" y1="${y}" y2="${y}"/><line class="f23-kap-a" data-k="${i}" x1="${L.kx[0] + 3}" x2="${L.kx[1] - 3}" y1="${y}" y2="${y}"/><g class="f23-eri" data-e="${i}">${'<circle r="2.4"/>'.repeat(K)}</g>`;
      }
      h += T(L.alt[0], L.alt[1], 'f23-lb', '', 'middle', ' data-x="alt"');
      // grafik A: PVR – MPAP
      h += `<rect class="f23-bant-a" x="${r1(xA(10))}" y="${A.y0}" width="${r1(xA(MP_ESIK) - xA(10))}" height="${A.y1 - A.y0}"/><rect class="f23-bant-g" x="${r1(xA(MP_ESIK))}" y="${A.y0}" width="${r1(xA(30) - xA(MP_ESIK))}" height="${A.y1 - A.y0}"/>`;
      h += eksen(A, [10, 15, 20, 25, 30], [0, 50, 100, 150, 200, 250], xA, yA);
      h += T((xA(10) + xA(MP_ESIK)) / 2, A.y1 - 8, 'f23-bt f23-bt-a', L.bant[0], 'middle') + T((xA(MP_ESIK) + xA(30)) / 2, A.y1 - 8, 'f23-bt f23-bt-g', L.bant[1], 'middle');
      h += T(A.x0, A.tY, 'f23-et', 'PVR (dyn·s·cm⁻⁵)', 'start') + T(A.x1, A.xtY, 'f23-et', 'MPAP (mmHg)', 'end');
      const pa = [], pb = [];
      for (let c = 2.5; c <= 25.001; c += 0.25) { pa.push([xA(mpap(c)), yA(pvr(c))]); pb.push([xB(c), yB(mpap(c))]); }
      h += `<path class="f23-egri" d="${yol(pa)}"/>`;
      h += `<circle class="f23-ist" cx="${r1(xA(15))}" cy="${r1(yA(160))}" r="3.5"/>` + T(xA(15) - 7, yA(160) + 16, 'f23-tk2', 'istirahat', 'end');
      h += `<circle class="f23-nok" r="5" data-x="pA"/>` + T(0, 0, 'f23-nok-t', '', 'start', ' data-x="pAt"');
      // grafik B: MPAP – kalp debisi
      h += eksen(B, [0, 5, 10, 15, 20, 25], [0, 15, 30, 45, 60], xB, yB);
      h += T(B.x0, B.tY, 'f23-et', 'MPAP (mmHg)', 'start') + T(B.x1, B.xtY, 'f23-et', 'Kalp debisi (L/dk)', 'end');
      h += `<line class="f23-sabit" x1="${r1(xB(2.5))}" y1="${r1(yB(sabit(2.5)))}" x2="${r1(xB(25))}" y2="${r1(yB(sabit(25)))}"/><path class="f23-egri-b" d="${yol(pb)}"/>`;
      h += T(xB(25), yB(55) - 9, 'f23-tk2 f23-mut', 'direnç sabit olsaydı', 'end') + T(xB(25), yB(mpap(25)) + L.gAlt, 'f23-tk2 f23-acc', 'gerçek: PVR düşer', 'end');
      h += '<line class="f23-fark" data-x="fark"/><circle class="f23-nok-s" r="4" data-x="pS"/><circle class="f23-nok" r="5" data-x="pB"/>';
      sahne.innerHTML = `<svg class="f23-svg" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Pulmoner kapiller yatağı ile PVR–MPAP ve MPAP–kalp debisi grafikleri: kalp debisi artınca kapalı kapillerler açılır, sonra açık kapillerler genişler">${h}</svg>`;
      E = { kapA: [...sahne.querySelectorAll('.f23-kap-a')], kapK: [...sahne.querySelectorAll('.f23-kap-k')], eri: [...sahne.querySelectorAll('.f23-eri')].map((g) => [...g.children]) };
      ['alt', 'pA', 'pAt', 'fark', 'pS', 'pB'].forEach((k) => { E[k] = sahne.querySelector(`[data-x="${k}"]`); });
      sonYaz = '';
      ciz();
    };

    const yaz = () => {
      const k = fmt(co);
      if (k === sonYaz) return;
      sonYaz = k;
      const mp = mpap(co), pv = Math.round(pvr(co)), n = Math.round(10 * acikOran(co)), r = yaricap(co);
      o('co').textContent = `${fmt(co)} L/dk`;
      o('kco').textContent = `${fmt(co)} L/dk`; o('kmp').textContent = `${fmt(mp)} mmHg`; o('kpvr').textContent = `${pv} dyn·s·cm⁻⁵`;
      o('kmek').textContent = co < CO_ESIK ? 'açılma (recruitment)' : 'genişleme (distansiyon)';
      o('denk').innerHTML = `PVR = 80 × (MPAP − PCWP) / CO = 80 × (${fmt(mp)} − 5) / ${fmt(co)} = <b>${pv} dyn·s·cm⁻⁵</b>`;
      E.alt.textContent = `Açık kapiller: ${n} / 10 · yarıçap ×${fmt(r, 2)}`;
      if (Math.abs(+rng.value - co) > 0.01) rng.value = co;
      // grafik noktaları
      const { xA, yA, xB, yB } = L, px = xA(mp), py = yA(pvr(co));
      at(E.pA, { cx: px, cy: py });
      if (mp > 24) at(E.pAt, { x: px - 8, y: py + 17, 'text-anchor': 'end' }); else at(E.pAt, { x: px + 8, y: py - 8, 'text-anchor': 'start' });
      E.pAt.textContent = `PVR ${pv}`;
      at(E.pB, { cx: xB(co), cy: yB(mp) }); at(E.pS, { cx: xB(co), cy: yB(sabit(co)) });
      at(E.fark, { x1: xB(co), x2: xB(co), y1: yB(sabit(co)) + 4, y2: yB(mp) - 5 });
    };

    const ciz = () => {
      yaz();
      const n = Math.round(10 * acikOran(co)), r = yaricap(co), wTam = 6 * (1 + 5 * (r - 1));
      const Lk = L.kx[1] - L.kx[0];
      E.kapA.forEach((ln, i) => {
        const a = acik[i];
        ln.setAttribute('stroke-width', r1(wTam * (0.3 + 0.7 * a)));
        ln.style.opacity = a.toFixed(2);
        E.kapK[i].style.opacity = (1 - a).toFixed(2);
        E.eri[i].forEach((c, k) => {
          if (RM || a < 0.05) { c.style.display = 'none'; return; }
          const f = (k / K + faz[i]) % 1, x = L.kx[0] + f * Lk;
          c.style.display = '';
          at(c, { cx: x, cy: L.ky(i) });
          c.style.opacity = (a * clamp(Math.min(f, 1 - f) * 12, 0, 1)).toFixed(2);
        });
      });
      void n;
    };

    const capGuncelle = () => {
      if (CAP[mod]) capY(CAP[mod]);
      else capY(serbest(co));
    };

    const adim = (dt) => {
      if (oyn) {
        oyn.t += dt;
        co = 5 + 20 * Math.min(1, oyn.t / 8);
        const sn = Math.floor(oyn.t);
        if (oyn.t >= 8) { oyn = null; mod = 'agir'; gc.set(25, 0); basSec(el, 'h', 'agir'); capGuncelle(); }
        else if (sn !== sonSn) { sonSn = sn; capY(serbest(co)); }
      } else if (gc.adim(dt)) co = gc.v;
      const n = Math.round(10 * acikOran(co));
      for (let i = 0; i < 10; i++) {
        const hedef = SIRA.indexOf(i) < n ? 1 : 0;
        acik[i] = RM ? hedef : acik[i] < hedef ? Math.min(hedef, acik[i] + dt / 0.4) : Math.max(hedef, acik[i] - dt / 0.4);
      }
      if (!RM) {
        const r = yaricap(co), hiz = (40 * (co / 5)) / (Math.max(1, n) / 7) / (r * r) * ((L.kx[1] - L.kx[0]) / 228);
        for (let i = 0; i < 10; i++) faz[i] = (faz[i] + (dt * hiz) / (L.kx[1] - L.kx[0])) % 1;
      }
    };

    const anlik = () => { if (RM) { adim(0); ciz(); } };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-h]');
      if (b) { oyn = null; mod = b.dataset.h; basSec(el, 'h', mod); gc.set(HAZIR[mod], 0.8); if (RM) co = HAZIR[mod]; capGuncelle(); anlik(); return; }
      if (e.target.closest('.f23-oyna')) {
        basSec(el, 'h', '');
        if (RM) { oyn = null; mod = 'agir'; co = 25; gc.set(25, 0); basSec(el, 'h', 'agir'); capGuncelle(); anlik(); return; }
        mod = 'oynat'; co = 5; gc.set(5, 0); oyn = { t: 0 }; sonSn = -1; capY(serbest(5));
      }
    });
    rng.addEventListener('input', () => { oyn = null; co = +rng.value; gc.set(co, 0); mod = 'serbest'; basSec(el, 'h', ''); capY(serbest(co)); anlik(); });
    void oyB;

    kur();
    const izle = genislikIzle(el, kur);
    const dur = RM ? () => {} : ticker(el, (dt) => { adim(dt); ciz(); });
    return () => { dur(); izle(); };
  };

  /* ================================================================
     2 · Akciğer hacmi ve PVR: U biçimli eğri
     ================================================================ */
  VIZ.f23_hacim = (el) => {
    const Ralv = (v) => 50 * Math.pow(v / 3, 1.5), Rext = (v) => 50 * Math.pow(3 / v, 1.5), Rtop = (v) => Ralv(v) + Rext(v);
    const HAZIR = { rv: 1.5, sirt: 2, frk: 3, tidal: 3, tlc: 6 };
    const CAP = {
      frk: "<b>FRK (3,0 L).</b> İki damar grubunun toplam direnci en düşüktür. Hacmi azaltın: ekstra-alveoler damarlar daralır ve PVR yükselir. Hacmi artırın: alveoler kapillerler gerilip yassılaşır ve PVR yine yükselir. [[K1 s. 99]]",
      rv: "<b>Rezidüel volüm (1,5 L).</b> PVR yüksektir; başlıca neden ekstra-alveoler damarlardır: radyal çekim azaldığı için çok daralırlar ve akıma yüksek direnç gösterirler. Alveoler kapillerler bu hacimde gerilmemiştir. [[K1 s. 50, 99]]",
      sirt: "<b>Sırtüstü FRK (≈2,0 L).</b> Sırtüstü yatışta FRK yaklaşık 1000 mL azalır; anestezi ve karın içi basınç artışı onu daha da azaltır. Modelde tidal solunum artık eğrinin en düşük noktasında değildir: ekstra-alveoler damarlar daralmış, PVR yükselmiştir. [[K1 s. 51, 99]]",
      tidal: "<b>Tidal solunum (3,0–3,5 L).</b> Soluk alıp verme FRK çevresinde gerçekleştiği için PVR zamanın büyük bölümünde en düşük düzeyine yakın kalır ve sağ ventrikülün iş yükü azalır. Kitap bunu yararlı bir tasarım olarak niteler. [[K1 s. 50, 99]]",
      tlc: "<b>Total akciğer kapasitesi (6,0 L).</b> PVR yeniden yüksektir; bu kez başlıca neden alveoler kapillerlerdir: gerilip biçimi bozulan kapillerlerin akıma direnci belirgin artar. Ekstra-alveoler damarlar radyal çekimle genişlemiştir ve dirence az katkıda bulunur. [[K1 s. 50, 99]]",
    };
    const yv = (v) => Math.round(v * 100) / 100;
    const serbest = (v) => {
      const R = Math.round(Rtop(v)), q = yv(v);
      return `Akciğer hacmi ${fmt(v)} L: toplam PVR FRK'dekinin %${R}${ekIyelik(R)}. `
        + (q < 2.95 ? 'FRK\'nin altında artışın kaynağı daralan ekstra-alveoler damarlardır. [[K1 s. 99]]'
          : q <= 3.05 ? 'Eğrinin en düşük noktası: FRK. [[K1 s. 99]]' : 'FRK\'nin üstünde artışın kaynağı gerilen alveoler kapillerlerdir. [[K1 s. 99]]');
    };
    const durum1 = (v) => (v < 2.6 ? ['geniş,', 'direnç düşük'] : v <= 3.6 ? ['orta'] : ['gerilmiş, yassı:', 'direnç yüksek']);
    const durum2 = (v) => (v < 2.6 ? ['dar:', 'direnç yüksek'] : v <= 3.6 ? ['orta'] : ['radyal çekimle açık:', 'direnç düşük']);
    const LW = {
      W: 720, H: 320, dar: false,
      b1: { x: 16, y: 10, w: 284, h: 146, t: [[28, 33, 'Alveoler damar (kapiller)']], cx: 158, cy: 92, sc: 1, st: [158, 150, 'middle'], tek: true },
      b2: { x: 16, y: 164, w: 284, h: 146, t: [[28, 187, 'Ekstra-alveoler damar']], cx: 220, cy: 240, R: 60, st: [28, 270, 'start'] },
      g: { x0: 384, x1: 616, y0: 40, y1: 250, tY: 27, tkY: 266, r2Y: 284, lx: 622 },
    };
    const LN = {
      W: 360, H: 566, dar: true,
      b1: { x: 6, y: 8, w: 172, h: 200, t: [[14, 27, 'Alveoler damar'], [14, 43, '(kapiller)']], cx: 92, cy: 106, sc: 0.6, st: [92, 172, 'middle'] },
      b2: { x: 182, y: 8, w: 172, h: 200, t: [[190, 27, 'Ekstra-alveoler'], [190, 43, 'damar']], cx: 268, cy: 116, R: 50, st: [268, 184, 'middle'] },
      g: { x0: 50, x1: 346, y0: 264, y1: 516, tY: 252, tkY: 534, r2Y: 552, ly: 232 },
    };
    const capY = capYazici(el, CAP.frk);
    let v = 3, mod = 'frk', tidT = 0, tidal = false, L = LW, E = {}, son = '';
    const gc = Gecis(3);
    el.innerHTML = `<div class="f23-ctl">${segHtml('Hazır durum', 'h', [['rv', 'Rezidüel volüm'], ['sirt', 'Sırtüstü FRK'], ['frk', 'FRK'], ['tidal', 'Tidal solunum'], ['tlc', 'TLC']], 'frk')}</div>
      <label class="f23-rng"><span>Akciğer hacmi (L) <b data-o="v"></b></span><input type="range" min="1.5" max="6" step="0.1" value="3" aria-label="Akciğer hacmi"></label>
      <div class="f23-sahne"></div>
      <dl class="f23-oku f23-oku-4">
        <div><dt>Akciğer hacmi</dt><dd data-o="kv"></dd></div><div><dt>Toplam PVR</dt><dd data-o="kt"></dd></div>
        <div><dt>Alveoler · ekstra-alveoler</dt><dd data-o="kae"></dd></div><div><dt>Artışın kaynağı</dt><dd data-o="kk"></dd></div>
      </dl>`;
    const sahne = el.querySelector('.f23-sahne'), rng = el.querySelector('input[type=range]');
    const o = (k) => el.querySelector(`[data-o="${k}"]`);
    const satirlar = (e, x, sat, lh) => { e.innerHTML = sat.map((s, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${s}</tspan>`).join(''); };

    const kur = () => {
      const dar = darMi(el);
      L = dar ? LN : LW;
      el.classList.toggle('f23-dar', dar);
      const { b1, b2, g } = L;
      const X = (q) => g.x0 + ((q - 1.5) / 4.5) * (g.x1 - g.x0), Y = (r) => g.y1 - (r / 200) * (g.y1 - g.y0);
      Object.assign(L, { X, Y });
      let h = '';
      [b1, b2].forEach((b) => { h += `<rect class="f23-kutu" x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="12"/>`; b.t.forEach(([x, y, s]) => { h += T(x, y, 'f23-bas', s); }); });
      // alveoler damar kutucuğu: 3 alveol ve aralarındaki 2 kapiller
      h += '<g data-x="alv">' + '<circle class="f23-alveol"/>'.repeat(3) + '</g><g data-x="kap">' + '<rect class="f23-kapr"/>'.repeat(2) + '</g>';
      h += T(b1.st[0], b1.st[1], 'f23-durum', '', b1.st[2], ' data-x="d1"');
      // ekstra-alveoler damar: kesit, 8 radyal bağ, dış halka
      h += `<circle class="f23-halka" cx="${b2.cx}" cy="${b2.cy}" r="${b2.R}"/><g data-x="bag">${'<line class="f23-bag"/>'.repeat(8)}</g><circle class="f23-damar" data-x="dam" cx="${b2.cx}" cy="${b2.cy}"/>`;
      h += T(b2.st[0], b2.st[1], 'f23-durum', '', b2.st[2], ' data-x="d2"');
      // grafik
      h += `<rect class="f23-tidal" data-x="tid" x="${r1(X(3))}" y="${g.y0}" width="${r1(X(3.5) - X(3))}" height="${g.y1 - g.y0}"/>`;
      h += eksen(g, [1.5, 2, 3, 4, 5, 6], [0, 50, 100, 150, 200], X, Y);
      h += `<line class="f23-sirt" x1="${r1(X(2))}" x2="${r1(X(2))}" y1="${g.y0}" y2="${g.y1}"/>`;
      h += `<text class="f23-tk2 f23-mut f23-hale" x="${r1(X(2) + 4)}" y="${g.y0 + 28}"><tspan x="${r1(X(2) + 4)}">sırtüstü</tspan><tspan x="${r1(X(2) + 4)}" dy="13">FRK</tspan></text>`;
      h += T(X(3.25), g.y0 + 11, 'f23-tk2 f23-okt f23-hale', 'tidal solunum', 'middle');
      h += T(X(1.5), g.r2Y, 'f23-r2', 'RV', 'middle') + T(X(3), g.r2Y, 'f23-r2', 'FRK', 'middle') + T(X(6), g.r2Y, 'f23-r2', 'TLC', dar ? 'end' : 'middle');
      h += T(X(4.5), g.r2Y, 'f23-tk', 'akciğer hacmi (L)', 'middle');
      h += T(g.x0, g.tY, 'f23-et', 'PVR (göreli; FRK = 100)', 'start');
      const pa = [], pe = [], pt = [];
      for (let q = 1.5; q <= 6.0001; q += 0.05) { pa.push([X(q), Y(Ralv(q))]); pe.push([X(q), Y(Rext(q))]); pt.push([X(q), Y(Rtop(q))]); }
      h += `<path class="f23-c-ext" d="${yol(pe)}"/><path class="f23-c-alv" d="${yol(pa)}"/><path class="f23-c-top" d="${yol(pt)}"/>`;
      if (dar) {
        const lg = [['f23-c-alv', 'alveoler', 50], ['f23-c-ext', 'ekstra-alveoler', 138], ['f23-c-top', 'toplam PVR', 262]];
        lg.forEach(([c, s, x]) => { h += `<line class="${c}" x1="${x}" x2="${x + 18}" y1="${g.ly - 4}" y2="${g.ly - 4}"/>` + T(x + 23, g.ly, 'f23-lej', s); });
      } else {
        h += T(g.lx, Y(Rtop(6)) + 4, 'f23-ce f23-ce-top', 'toplam PVR') + T(g.lx, Y(Ralv(6)) + 4, 'f23-ce f23-ce-alv', 'alveoler') + T(g.lx, Y(Rext(6)) + 4, 'f23-ce f23-ce-ext', 'ekstra-alveoler');
      }
      h += `<line class="f23-imlec" data-x="im" y1="${g.y0}" y2="${g.y1}"/><circle class="f23-n-ext" r="3.5" data-x="ne"/><circle class="f23-n-alv" r="3.5" data-x="na"/><circle class="f23-n-top" r="5" data-x="nt"/>`;
      sahne.innerHTML = `<svg class="f23-svg" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Akciğer hacmine göre alveoler ve ekstra-alveoler damarların direnci; toplam PVR FRK'de en düşüktür">${h}</svg>`;
      E = { alv: [...sahne.querySelectorAll('[data-x="alv"] circle')], kap: [...sahne.querySelectorAll('[data-x="kap"] rect')], bag: [...sahne.querySelectorAll('[data-x="bag"] line')] };
      ['d1', 'd2', 'dam', 'tid', 'im', 'ne', 'na', 'nt'].forEach((k) => { E[k] = sahne.querySelector(`[data-x="${k}"]`); });
      son = '';
      ciz();
    };

    const ciz = () => {
      const { b1, b2, X, Y } = L;
      // alveoller ve kapillerler
      const ra = b1.sc * 34 * Math.pow(v / 3, 1 / 3), d = 2 * ra + 4 * b1.sc;
      E.alv.forEach((c, i) => at(c, { cx: b1.cx + (i - 1) * d, cy: b1.cy, r: ra }));
      const w = b1.sc * 12 * Math.pow(3 / v, 0.8), hk = 1.6 * ra;
      E.kap.forEach((rc, i) => at(rc, { x: b1.cx + (i - 0.5) * d - w / 2, y: b1.cy - hk / 2, width: w, height: hk, rx: w / 2 }));
      // ekstra-alveoler damar
      const re = (b2.R / 60) * (6 + 18 * Math.pow((v - 1.5) / 4.5, 0.7)), sw = 1.5 + (2 * (v - 1.5)) / 4.5;
      at(E.dam, { r: re });
      E.bag.forEach((ln, i) => { const a = ((i * 45 + 22.5) * Math.PI) / 180; at(ln, { x1: b2.cx + re * Math.cos(a), y1: b2.cy + re * Math.sin(a), x2: b2.cx + b2.R * Math.cos(a), y2: b2.cy + b2.R * Math.sin(a), 'stroke-width': sw }); });
      // imleç
      const x = X(v);
      at(E.im, { x1: x, x2: x });
      at(E.ne, { cx: x, cy: Y(Rext(v)) }); at(E.na, { cx: x, cy: Y(Ralv(v)) }); at(E.nt, { cx: x, cy: Y(Rtop(v)) });
      E.tid.classList.toggle('on', mod === 'tidal');
      // yazılar (yalnız değişince)
      const k = fmt(v, 2) + mod;
      if (k === son) return;
      son = k;
      const d1 = durum1(v), d2 = durum2(v), lh = 16;
      if (L.dar || d1.length === 1) satirlar(E.d1, b1.st[0], L.dar ? d1 : [d1.join(' ')], lh); else satirlar(E.d1, b1.st[0], [d1.join(' ')], lh);
      satirlar(E.d2, b2.st[0], d2, lh);
      const ql = yv(v), A = Math.round(Ralv(v)), Ex = Math.round(Rext(v));
      o('v').textContent = `${fmt(v)} L`;
      o('kv').textContent = `${fmt(v)} L`; o('kt').textContent = `${Math.round(Rtop(v))} (göreli)`; o('kae').textContent = `${A} · ${Ex}`;
      o('kk').textContent = ql < 2.95 ? 'ekstra-alveoler damarlar' : ql <= 3.05 ? 'en düşük nokta (FRK)' : 'alveoler damarlar';
      if (!tidal && Math.abs(+rng.value - v) > 0.01) rng.value = v;
    };

    const capG = () => capY(CAP[mod] || serbest(v));
    const adim = (dt) => {
      if (gc.adim(dt)) v = gc.v;
      else if (tidal && !RM) { tidT += dt; v = 3.25 - 0.25 * Math.cos((2 * Math.PI * tidT) / 5); }
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-h]'); if (!b) return;
      mod = b.dataset.h; basSec(el, 'h', mod);
      tidal = mod === 'tidal'; tidT = 0;
      gc.set(HAZIR[mod], 0.8); if (RM) v = HAZIR[mod];
      capG(); if (RM) ciz();
    });
    rng.addEventListener('input', () => { tidal = false; v = +rng.value; gc.set(v, 0); mod = 'serbest'; basSec(el, 'h', ''); capG(); if (RM) ciz(); });
    kur();
    const izle = genislikIzle(el, kur);
    const dur = RM ? () => {} : ticker(el, (dt) => { adim(dt); ciz(); });
    return () => { dur(); izle(); };
  };

  /* ================================================================
     3 · HPV: iki birimli model
     ================================================================ */
  VIZ.f23_hpv = (el) => {
    const SA = S_O2(13);
    const KIP = {
      normal: { ad: 'Normal', m: 1, not: 'TİVA, N₂O, volatil ≤ 1 MAC' },
      azal: { ad: 'Azalmış', m: 0.5, not: 'volatil > 1 MAC, alkaloz, hipokapni, vazodilatatörler (nitratlar, sodyum nitroprussid, NO), bronkodilatatörler' },
      guc: { ad: 'Güçlenmiş', m: 1.2, not: 'asidoz, hiperkapni' },
      yok: { ad: 'Yok (kuramsal)', m: 0, not: 'karşılaştırma için' },
    };
    const HAZIR = { normal: 13, pnom: 6.5, tek: 5.3 };
    const model = (pa, m) => { const h = clamp((8 - pa) / (8 - 5.3), 0, 1), fB = 0.5 * (1 - 0.5 * h * m), SB = S_O2(pa), Sa = (1 - fB) * SA + fB * SB; return { h, fB, SB, Sa }; };
    const KIPEK = {
      azal: "<b>HPV azalmış:</b> volatil ajanlar 1 MAC'ın üzerinde, alkaloz, hipokapni, vazodilatatörler ve bronkodilatatörler HPV'yi azaltır; hipoksik bölgeye daha çok kan gider. Kitaba göre volatil ajanlarla belirgin inhibisyon yalnız 1 MAC'ın üzerinde görülür; N₂O'nun etkisi az, intravenöz ajanların yoktur. [[K1 s. 100]]",
      guc: "<b>HPV güçlenmiş:</b> asidoz ve hiperkapni HPV'yi artırır. [[K1 s. 100]]",
      yok: "<b>HPV yok (kuramsal):</b> kan iki birime eşit gider; hipoksik birimden geçen kan arteriyel kanı seyreltir. HPV inhibe edilirse V̇/Q̇ uyumsuzluğu ve hipoksemi ortaya çıkabilir. [[K1 s. 100]]",
    };
    const CAP0 = "<b>İki birim de normal ventile.</b> PAO₂ iki birimde de 13 kPa; kan akımı eşit bölünür ve arteriyel kan iyi oksijenlenir. B biriminin PAO₂'sini 8 kPa'nın altına indirin ya da bir hazır durum seçin: HPV, B'ye giden arteriyolü daraltır ve kanı A'ya yönlendirir. [[K1 s. 99]]";
    const HW = {
      W: 720, H: 320, dar: false,
      giris: 'M16 160 L120 160', govde: 'M575 160 L598 160', r: 52, grad: [0, 0, 1, 0], nokF: 0.86,
      A: { dal: 'M120 160 C160 160 165 80 205 80 L250 80', kap: 'M250 80 A60 60 0 0 0 370 80', ven: 'M370 80 L500 80 C540 80 540 160 575 160', c: [310, 80] },
      B: { dal: 'M120 160 C160 160 165 240 205 240 L250 240', kap: 'M250 240 A60 60 0 0 1 370 240', ven: 'M370 240 L500 240 C540 240 540 160 575 160', c: [310, 240] },
      girisEt: [[16, 127, 'pulmoner arter', 'start'], [16, 142, 'miks venöz kan', 'start']],
      venEt: [[651, 88, 'pulmoner ven', 'middle'], [651, 103, '→ sol kalp', 'middle']],
      hpvEt: [[116, 278, 'HPV: arteriyol daralır', 'start']],
      kutu: [598, 112, 106, 98], kt: [651, 135], kd: [651, 170], kp: [651, 195],
    };
    const HN = {
      W: 360, H: 470, dar: true,
      giris: 'M180 0 L180 46', govde: 'M180 292 L180 342', r: 46, grad: [0, 0, 0, 1], nokF: 0.62,
      A: { dal: 'M180 46 C180 74 95 64 95 90 L95 96', kap: 'M95 96 A54 54 0 0 0 95 204', ven: 'M95 204 C95 250 180 244 180 292', c: [95, 150] },
      B: { dal: 'M180 46 C180 74 265 64 265 90 L265 96', kap: 'M265 96 A54 54 0 0 1 265 204', ven: 'M265 204 C265 250 180 244 180 292', c: [265, 150] },
      girisEt: [[161, 15, 'pulmoner arter', 'end'], [161, 31, 'miks venöz kan', 'end']],
      venEt: [[192, 322, 'pulmoner ven → sol kalp', 'start']],
      hpvEt: [[199, 15, 'HPV:', 'start'], [199, 31, 'arteriyol daralır', 'start']],
      kutu: [100, 342, 160, 106], kt: [180, 365], kd: [180, 403], kp: [180, 430],
    };
    const capY = capYazici(el, CAP0);
    let pa = 13, kip = 'normal', hz = 'normal', L = HW, E = {}, son = '', fBd = 0.5, akis = 0;
    el.innerHTML = `<div class="f23-ctl">${segHtml('Hazır durum', 'h', [['normal', 'Normal'], ['pnom', 'Pnömoni (bir bölge)'], ['tek', 'Tek akciğer ventilasyonu']], 'normal')}</div>
      <div class="f23-kip"><span class="f23-kip-et">HPV:</span>${segHtml('HPV kipi', 'k', Object.keys(KIP).map((k) => [k, KIP[k].ad, KIP[k].not]), 'normal')}</div>
      <p class="f23-kip-not" data-o="kipnot"></p>
      <label class="f23-rng f23-rng-esik"><span>B biriminin PAO₂'si (kPa) <b data-o="pa"></b></span>
        <span class="f23-esik-ray"><input type="range" min="5.3" max="13" step="0.1" value="13" aria-label="B biriminin alveoler O₂ basıncı"><i class="f23-esik-cent" aria-hidden="true"></i></span>
        <span class="f23-esik-et" aria-hidden="true">HPV eşiği 8 kPa</span></label>
      <div class="f23-sahne"></div>
      <div class="f23-akim"><div class="f23-akim-bar" aria-hidden="true"><span class="f23-akim-a" data-o="ba"></span><span class="f23-akim-b" data-o="bb"></span></div><span class="f23-akim-not" data-o="bnot"></span></div>
      <dl class="f23-oku f23-oku-4">
        <div><dt>PAO₂ (B)</dt><dd data-o="kpa"></dd></div><div><dt>B'ye giden akım</dt><dd data-o="kfb"></dd></div>
        <div><dt>B'den çıkan kan SO₂</dt><dd data-o="ksb"></dd></div><div><dt>Arteriyel SaO₂ · PaO₂</dt><dd data-o="ksa"></dd></div>
      </dl>`;
    const sahne = el.querySelector('.f23-sahne'), rng = el.querySelector('input[type=range]');
    const o = (k) => el.querySelector(`[data-o="${k}"]`);
    const esikYuzde = ((8 - 5.3) / (13 - 5.3)) * 100;
    el.querySelector('.f23-esik-cent').style.left = `calc(8px + (100% - 16px) * ${(esikYuzde / 100).toFixed(4)})`;
    el.querySelector('.f23-esik-et').style.left = `calc(8px + (100% - 16px) * ${(esikYuzde / 100).toFixed(4)})`;
    const op = (s) => clamp((s - 75) / 22.6, 0, 1);

    const tup = (cls, d, w) => `<path class="${cls}" d="${d}" stroke-width="${w}"/>`;
    const kur = () => {
      const dar = darMi(el);
      L = dar ? HN : HW;
      el.classList.toggle('f23-dar', dar);
      const [g1, g2, g3, g4] = L.grad;
      let h = '<defs>';
      ['A', 'B'].forEach((u) => {
        h += `<linearGradient id="f23-hpv-go${u}" x1="${g1}" y1="${g2}" x2="${g3}" y2="${g4}"><stop offset="0" class="f23-st-o2" stop-opacity="0"/><stop offset="1" class="f23-st-o2" data-x="so${u}"/></linearGradient>`;
        h += `<linearGradient id="f23-hpv-gi${u}" x1="${g1}" y1="${g2}" x2="${g3}" y2="${g4}"><stop offset="0" class="f23-st-o2s" stop-opacity="0"/><stop offset="1" class="f23-st-o2s" data-x="si${u}"/></linearGradient>`;
      });
      h += '</defs>';
      // alveoller
      ['A', 'B'].forEach((u) => {
        const [cx, cy] = L[u].c;
        h += `<circle class="f23-alveol" cx="${cx}" cy="${cy}" r="${L.r}"/>`;
        if (u === 'B') h += `<circle class="f23-alv-hip" data-x="hip" cx="${cx}" cy="${cy}" r="${L.r}"/>`;
        h += T(cx, cy - 9, 'f23-birim', u, 'middle') + T(cx, cy + 11, 'f23-lb', '', 'middle', ` data-x="pa${u}"`);
        if (u === 'B') h += T(cx, cy + 28, 'f23-tk2 f23-mut', 'ventile değil', 'middle', ' data-x="vd"');
      });
      // damarlar: giriş, dallar, kapillerler, venüller, gövde. Önce bütün dış çizgiler, sonra iç dolgular
      // (birleşim yerlerinde dikiş görünmesin); oksijenli kan katmanı en üstte, opaklığı satürasyonla.
      let bo = tup('f23-t-az-o', L.giris, 26), bi = tup('f23-t-az-i', L.giris, 21), oo = '', oi = '';
      ['A', 'B'].forEach((u) => {
        const U = L[u];
        bo += `<path class="f23-t-az-o" data-x="ao${u}" d="${U.dal}"/>` + tup('f23-t-az-o', U.kap, 12) + tup('f23-t-az-o', U.ven, 14);
        bi += `<path class="f23-t-az-i" data-x="ai${u}" d="${U.dal}"/>` + tup('f23-t-az-i', U.kap, 8) + tup('f23-t-az-i', U.ven, 10);
        oo += `<path class="f23-t-ov" d="${U.kap}" stroke-width="12" stroke="url(#f23-hpv-go${u})"/><path class="f23-t-o2-o" data-x="vo${u}" d="${U.ven}" stroke-width="14"/>`;
        oi += `<path class="f23-t-ov" d="${U.kap}" stroke-width="8" stroke="url(#f23-hpv-gi${u})"/><path class="f23-t-o2-i" data-x="vi${u}" d="${U.ven}" stroke-width="10"/>`;
      });
      bo += tup('f23-t-az-o', L.govde, 18); bi += tup('f23-t-az-i', L.govde, 13);
      oo += `<path class="f23-t-o2-o" data-x="go" d="${L.govde}" stroke-width="18"/>`; oi += `<path class="f23-t-o2-i" data-x="gi" d="${L.govde}" stroke-width="13"/>`;
      h += bo + bi + oo + oi;
      h += '<path class="f23-centik" data-x="c1"/><path class="f23-centik" data-x="c2"/>';
      h += '<g data-x="nok"></g>';
      L.girisEt.forEach(([x, y, s, a]) => { h += T(x, y, 'f23-tk', s, a); });
      L.venEt.forEach(([x, y, s, a]) => { h += T(x, y, 'f23-tk', s, a); });
      h += '<g data-x="hpvet">'; L.hpvEt.forEach(([x, y, s, a]) => { h += T(x, y, 'f23-lb f23-crt', s, a); }); h += '</g>';
      const [kx, ky, kw, kh] = L.kutu;
      h += `<rect class="f23-sonuc" x="${kx}" y="${ky}" width="${kw}" height="${kh}" rx="10"/>` + T(L.kt[0], L.kt[1], 'f23-tk', 'SaO₂', 'middle') + T(L.kd[0], L.kd[1], 'f23-buyuk', '', 'middle', ' data-x="sa"') + T(L.kp[0], L.kp[1], 'f23-lb', '', 'middle', ' data-x="pa"');
      sahne.innerHTML = `<svg class="f23-svg" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="İki alveol birimi: B biriminin PAO₂'si düşünce HPV onun arteriyolünü daraltır ve kanı A birimine yönlendirir">${h}</svg>`;
      const q = (k) => sahne.querySelector(`[data-x="${k}"]`);
      E = {};
      ['soA', 'siA', 'soB', 'siB', 'hip', 'paA', 'paB', 'vd', 'aoB', 'aiB', 'aoA', 'aiA', 'voA', 'viA', 'voB', 'viB', 'go', 'gi', 'c1', 'c2', 'nok', 'hpvet', 'sa', 'pa'].forEach((k) => { E[k] = q(k); });
      // akış yolları: giriş + dal + kapiller + venül + gövde (ölçüm için geçici yollar)
      const NS = 'http://www.w3.org/2000/svg', svg = sahne.querySelector('svg');
      const olc = (d) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('fill', 'none'); p.style.visibility = 'hidden'; svg.appendChild(p); const r = ornekle(p, 2); p.remove(); return r; };
      const gi = olc(L.giris), go = olc(L.govde);
      E.yol = {};
      ['A', 'B'].forEach((u) => {
        const U = L[u], pr = [gi, olc(U.dal), olc(U.kap), olc(U.ven), go];
        const sinir = []; let t = 0; pr.forEach((p) => { sinir.push(t); t += p.L; });
        E.yol[u] = { pr, sinir, L: t, dal: pr[1] };
      });
      // akış noktaları (her dalda 40 yuva; iki katman: miks venöz + oksijenli)
      let nh = '';
      for (let i = 0; i < 80; i++) nh += '<g><circle class="f23-nk-az" r="3"/><circle class="f23-nk-o2" r="3"/></g>';
      E.nok.innerHTML = nh;
      E.nk = [...E.nok.children].map((g) => [g.children[0], g.children[1], g]);
      son = '';
      ciz();
    };

    const konum = (Y, s) => {
      let i = Y.sinir.length - 1;
      while (i > 0 && s < Y.sinir[i]) i--;
      return { i, p: Y.pr[i].at(s - Y.sinir[i]), f: (s - Y.sinir[i]) / (Y.pr[i].L || 1) };
    };

    const ciz = () => {
      const M = model(pa, KIP[kip].m), Sd = (1 - fBd) * SA + fBd * M.SB;
      const oA = op(SA), oB = op(M.SB), oM = op(Sd);
      at(E.soA, { 'stop-opacity': oA.toFixed(2) }); at(E.siA, { 'stop-opacity': oA.toFixed(2) });
      at(E.soB, { 'stop-opacity': oB.toFixed(2) }); at(E.siB, { 'stop-opacity': oB.toFixed(2) });
      E.voA.style.opacity = E.viA.style.opacity = oA.toFixed(2);
      E.voB.style.opacity = E.viB.style.opacity = oB.toFixed(2);
      E.go.style.opacity = E.gi.style.opacity = oM.toFixed(2);
      E.hip.style.opacity = clamp((13 - pa) / 7.7, 0, 1).toFixed(2);
      gor(E.vd, pa <= 5.31);
      // arteriyoller
      const kA = 18, kB = 18 * (fBd / 0.5);
      at(E.aoA, { 'stroke-width': kA + 4 }); at(E.aiA, { 'stroke-width': kA });
      at(E.aoB, { 'stroke-width': kB + 4 }); at(E.aiB, { 'stroke-width': Math.max(1, kB) });
      const daral = M.h * KIP[kip].m > 0;
      const Y = E.yol.B, nf = Y.dal.L * L.nokF, p0 = Y.dal.at(nf - 2), p1 = Y.dal.at(nf + 2);
      let tx = p1[0] - p0[0], ty = p1[1] - p0[1]; const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
      const nx = -ty, ny = tx, pm = Y.dal.at(nf), off = kB / 2 + 6;
      [1, -1].forEach((sg, j) => {
        const cx = pm[0] + sg * nx * off, cy = pm[1] + sg * ny * off, ix = pm[0] + sg * nx * (off - 4.5), iy = pm[1] + sg * ny * (off - 4.5);
        at(E['c' + (j + 1)], { d: `M${r1(cx - tx * 9)} ${r1(cy - ty * 9)} Q${r1(ix)} ${r1(iy)} ${r1(cx + tx * 9)} ${r1(cy + ty * 9)}` });
        gor(E['c' + (j + 1)], daral);
      });
      gor(E.hpvet, daral);
      // akış noktaları
      ['A', 'B'].forEach((u, ui) => {
        const Yu = E.yol[u], f = u === 'A' ? 1 - fBd : fBd, N = Math.round(40 * f), oU = u === 'A' ? oA : oB;
        for (let k = 0; k < 40; k++) {
          const [c0, c1, g] = E.nk[ui * 40 + k];
          if (RM || !yuvaAcik(k, 40, N)) { g.style.display = 'none'; continue; }
          g.style.display = '';
          const s = ((k / 40) * Yu.L + akis + ui * 9) % Yu.L, kn = konum(Yu, s);
          const ov = kn.i < 2 ? 0 : kn.i === 2 ? oU * kn.f : kn.i === 3 ? oU : oM;
          at(c0, { cx: kn.p[0], cy: kn.p[1] }); at(c1, { cx: kn.p[0], cy: kn.p[1] });
          c1.style.opacity = ov.toFixed(2);
        }
      });
      // yazılar
      const Sa = Math.round(Sd), Pa = P_O2(Sd), fp = Math.round(fBd * 100);
      const k = `${fmt(pa)}|${fp}|${Sa}|${fmt(Pa)}|${kip}`;
      if (k === son) return;
      son = k;
      E.paA.textContent = 'PAO₂ 13,0 kPa'; E.paB.textContent = `PAO₂ ${fmt(pa)} kPa`;
      E.sa.textContent = `%${Sa}`;
      E.sa.classList.toggle('f23-crt', Sa < 90); E.sa.classList.toggle('f23-wrn', Sa >= 90 && Sa < 95);
      E.pa.textContent = `PaO₂ ${fmt(Pa)} kPa`;
      o('pa').textContent = `${fmt(pa)} kPa`;
      if (Math.abs(+rng.value - pa) > 0.01) rng.value = pa;
      o('ba').style.width = `${100 - fp}%`; o('bb').style.width = `${fp}%`;
      o('ba').textContent = `A %${100 - fp}`; o('bb').textContent = `B %${fp}`;
      const nrm = Math.round(fBd * 200);
      o('bnot').textContent = `B'ye giden akım normalin %${nrm}${ekIyelik(nrm)}`;
      o('kpa').textContent = `${fmt(pa)} kPa`; o('kfb').textContent = `%${fp}`; o('ksb').textContent = `%${Math.round(M.SB)}`; o('ksa').textContent = `%${Sa} · ${fmt(Pa)} kPa`;
      o('kipnot').textContent = `${KIP[kip].ad}: ${KIP[kip].not}`;
    };

    const capG = () => {
      const M = model(pa, KIP[kip].m), Sa = Math.round(M.Sa), fp = Math.round(M.fB * 100);
      let c;
      if (hz === 'normal') c = CAP0 + (kip !== 'normal' ? ' B normal ventile olduğu sürece HPV devreye girmez.' : '');
      else {
        if (hz === 'pnom') c = `<b>Pnömoni.</b> B bölgesinin alveolleri kötü ventile (PAO₂ 6,5 kPa). HPV bu bölgenin arteriyollerinin direncini artırır ve kanı daha iyi ventile olan alveollere yönlendirir: V̇/Q̇ uyumsuzluğu azalır, SaO₂ %${Sa}. HPV olmasaydı SaO₂ %91 olurdu. [[K1 s. 100]]`;
        else if (hz === 'tek') c = `<b>Tek akciğer ventilasyonu.</b> B ventile edilmiyor; içinden geçen kan oksijen almadan sol kalbe döner (şant). HPV kanı ventile edilmeyen akciğerden ventile edilen akciğere yönlendirir ve hipoksemiyi en aza indirir: SaO₂ %${Sa}; HPV olmasaydı %86. [[K1 s. 100]]`;
        else if (pa >= 8) c = `B biriminin PAO₂'si ${fmt(pa)} kPa. HPV eşiğinin (8 kPa) üstünde: arteriyol daralmaz, akım eşit bölünür. [[K1 s. 99]]`;
        else if (kip === 'yok') c = `B biriminin PAO₂'si ${fmt(pa)} kPa. Eşiğin altında, ama HPV olmadığı için akım eşit bölünür (%50); arteriyel SaO₂ %${Sa}. [[K1 s. 99]]`;
        else c = `B biriminin PAO₂'si ${fmt(pa)} kPa. Eşiğin altında: HPV B'ye giden akımı %${fp}${ekYonelme(fp)} indirdi, arteriyel SaO₂ %${Sa}. [[K1 s. 99]]`;
        if (kip !== 'normal') c += ' ' + (pa >= 8 ? 'Eşiğin üstünde HPV devreye girmediği için seçilen kip sonucu değiştirmez.' : KIPEK[kip]);
      }
      capY(c);
    };
    const hedefFB = () => model(pa, KIP[kip].m).fB;
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-h]'), k = e.target.closest('[data-k]');
      if (b) { hz = b.dataset.h; pa = HAZIR[hz]; basSec(el, 'h', hz); }
      else if (k) { kip = k.dataset.k; basSec(el, 'k', kip); }
      else return;
      if (RM) fBd = hedefFB();
      capG(); son = ''; ciz();
    });
    rng.addEventListener('input', () => { pa = +rng.value; hz = 'serbest'; basSec(el, 'h', ''); if (RM) fBd = hedefFB(); capG(); ciz(); });
    kur();
    const izle = genislikIzle(el, kur);
    const dur = RM ? () => {} : ticker(el, (dt) => {
      const hd = hedefFB();
      fBd = Math.abs(hd - fBd) < 0.0005 ? hd : fBd + (hd - fBd) * (1 - Math.exp(-dt / 0.3));
      akis += 60 * dt;
      ciz();
    });
    return () => { dur(); izle(); };
  };

  /* ================================================================
     4 · Tek akciğer ventilasyonu: alttaki akciğere PEEP, üstteki akciğere CPAP, KOAH
     ================================================================ */
  VIZ.f23_tak = (el) => {
    const SV = S_O2(13), SS = S_O2(5.3);
    const comp = (p) => 1 + 0.03 * Math.pow(p, 1.5);
    const atel = (p) => 0.3 * Math.exp(-p / 4);
    const model = (peep, cpap, koah) => {
      const peff = peep + (koah ? 5 : 0), GL = 1.5 / comp(peff), GU = 0.375 / comp(cpap ? peep : 0);
      const fU = GU / (GL + GU), a = atel(peff), Qs = fU + (1 - fU) * a, Sa = (1 - Qs) * SV + Qs * SS;
      return { peff, fU, a, Qs, Sa };
    };
    const ADIM = [
      { ad: '1 · PEEP yok', peep: 0, cpap: false, koah: false },
      { ad: '2 · PEEP 5', peep: 5, cpap: false, koah: false },
      { ad: '3 · Fazla PEEP (15)', peep: 15, cpap: false, koah: false },
      { ad: '4 · + Üst akciğere CPAP', peep: 15, cpap: true, koah: false },
      { ad: "5 · KOAH'lı hasta", peep: 0, cpap: false, koah: true },
    ];
    const yz = (f) => Math.round(f * 100);
    const capMetin = (ad, M) => {
      const Qs = yz(M.Qs), Sa = Math.round(M.Sa), fU = yz(M.fU), a = yz(M.a);
      switch (ad) {
        case 0: return "<b>PEEP yok.</b> Lateral pozisyonda alttaki akciğer ventile edilir, üstteki edilmez. Üst akciğerden geçen kan şanttır; alttaki akciğerin atelektatik kesiminden geçen kan da şanta katılır. PEEP'i adım adım artırın, sonra üst akciğere CPAP ekleyin. [[K1 s. 100]]";
        case 1: return `<b>Uygun PEEP.</b> Mediastenin ve üst akciğerin ağırlığı alttaki akciğerin hacmini azaltır ve atelektazi düşük hacimde kolay gelişir. Alttaki akciğere PEEP atelektaziyi azaltır: şant %${Qs}, SaO₂ %${Sa}. [[K1 s. 100]]`;
        case 2: return `<b>Fazla PEEP.</b> Alveoler basınç alttaki akciğerin kapillerlerini sıkıştırır ve PVR'sini yükseltir. Kan ventile edilmeyen üst akciğere kayar (%${fU}); V̇/Q̇ uyumsuzluğu artar ve hipoksemi ağırlaşır: şant %${Qs}, SaO₂ %${Sa}. [[K1 s. 100]]`;
        case 3: return `<b>Üst akciğere aynı basınçta CPAP.</b> Üst akciğerin PVR'si de artar ve kan alttaki akciğere geri yönlenir: şant %${Qs}, SaO₂ %${Sa}. Tek sakıncası üst akciğerin şişip cerrahı rahatsız edebilmesidir; kitaba göre bu yine de iki akciğer ventilasyonuna dönmekten daha az rahatsız edicidir. [[K1 s. 100]]`;
        case 4: return `<b>KOAH'lı hasta, PEEP yok.</b> Hava hapsi alttaki akciğerde intrinsik PEEP oluşturur, hacmini artırır ve atelektaziyi azaltır: SaO₂ %${Sa}, aynı koşuldaki "normal" akciğerden yüksek. Ameliyat öncesi spirometrisi iyi hastaların tek akciğer ventilasyonunda daha sık desatüre olması paradoksunun olası açıklaması budur; kesin kanıtlanmamıştır. [[K1 s. 100]]`;
        default: return `PEEP ${st.peep} cmH₂O${st.cpap ? `, üst akciğere CPAP ${st.peep} cmH₂O` : ''}${st.koah ? ', KOAH (intrinsik PEEP 5)' : ''}: üst akciğere giden akım %${fU}, atelektazi %${a}, toplam şant %${Qs}, SaO₂ %${Sa}. [[K1 s. 100]]`;
      }
    };
    const TW = {
      W: 720, H: 340, dar: false, ust: { cx: 200, cy: 85, rx: 140, ry: 55 }, med: { x: 160, y: 150, w: 80, h: 36 }, alt: { cx: 200, cy: 250, rx: 160, ry: 60 }, atK: 120,
      govde: 'M160 168 L34 168', dalU: 'M34 168 Q22 168 22 152 L22 104 Q22 86 40 86 L72 86', dalL: 'M34 168 Q22 168 22 184 L22 232 Q22 250 40 250 L56 250', gW: 28, dW: [4, 24],
      paEt: [64, 150, 'start'], pU: [80, 91], pL: [64, 255], ustEt: [200, 80], cpEt: [[200, 104]], altEt: [170, 236, 254, 270], agir: [252, 152, 184, 258, 172],
      sik: { xs: [286, 308, 330], y: 246, et: [308, 285] }, hava: 'M352 240 L378 226', atelEt: [200, 296, 280, 300],
      // sonuç paneli
      bar: { x: 410, y: 40, w: 48, h: 264, dik: true }, barBas: [404, 15, true], sb: 466,
      mg: { x0: 540, x1: 696, y0: 40, y1: 176, tkY: 192, bas: [520, 24, 'Şant oranı (%)'], xt: [696, 209] },
      lej: [[510, 232], [510, 248], [510, 264]], kutu: [510, 274, 194, 52], sa: [607, 301], paK: [607, 319],
    };
    const TN = {
      W: 360, H: 562, dar: true, ust: { cx: 192, cy: 74, rx: 150, ry: 50 }, med: { x: 156, y: 138, w: 72, h: 32 }, alt: { cx: 192, cy: 236, rx: 156, ry: 58 }, atK: 110,
      govde: 'M156 154 L30 154', dalU: 'M30 154 Q16 154 16 138 L16 92 Q16 74 32 74 L54 74', dalL: 'M30 154 Q16 154 16 170 L16 218 Q16 236 32 236 L48 236', gW: 19, dW: [3, 16],
      paEt: [52, 140, 'start'], pU: [62, 79], pL: [56, 241], ustEt: [192, 66], cpEt: [[192, 88], [192, 105]], altEt: [160, 224, 242, 259], agir: [238, 140, 168, 244, 159],
      sik: { xs: [270, 292, 314], y: 230, et: [292, 268] }, hava: 'M340 228 L356 214', atelEt: [192, 280, 276, 286],
      bar: { x: 16, y: 320, w: 328, h: 26, dik: false }, barBas: [16, 312], sb: 352,
      mg: { x0: 44, x1: 336, y0: 428, y1: 494, tkY: 511, bas: [16, 418, 'Şant oranı (%) · PEEP (cmH₂O)'], xt: null },
      lej: [[16, 394], [118, 394], [232, 394]], kutu: [16, 520, 328, 38], sa: [124, 546], paK: [262, 545],
    };
    let adim = 0, st = { peep: 0, cpap: false, koah: false }, L = TW, E = {}, son = '', akis = 0;
    const m0 = model(0, false, false);
    const D = { fU: Gecis(m0.fU), a: Gecis(m0.a), cp: Gecis(0), cm: Gecis(1), ag: Gecis(1) };
    const capY = capYazici(el, capMetin(0, m0));
    el.innerHTML = `<div class="f23-ctl">${segHtml('Anlatı adımları', 'a', ADIM.map((a, i) => [String(i), a.ad]), '0', ' data-adimlar')}</div>
      <div class="f23-serbest">
        <div class="f23-alan"><span>PEEP, alttaki akciğer (cmH₂O)</span>${segHtml('PEEP (alttaki akciğer), cmH₂O', 'p', [['0', '0'], ['5', '5'], ['10', '10'], ['15', '15']], '0')}</div>
        <button type="button" class="f23-tog" data-t="cpap" aria-pressed="false" disabled title="CPAP, alttaki akciğere uygulanan PEEP ile aynı basınçta verilir">Üst akciğere CPAP (aynı basınçta)</button>
        <button type="button" class="f23-tog" data-t="koah" aria-pressed="false">KOAH (intrinsik PEEP)</button>
      </div>
      <div class="f23-sahne f23-sahne-tak"></div>`;
    const sahne = el.querySelector('.f23-sahne');
    const elips = (e, cls, ek = '') => `<ellipse class="${cls}" cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}"${ek}/>`;

    const kur = () => {
      const dar = darMi(el);
      L = dar ? TN : TW;
      el.classList.toggle('f23-dar', dar);
      const { ust, med, alt, mg } = L;
      const X = (p) => mg.x0 + (p / 15) * (mg.x1 - mg.x0), Y = (s) => mg.y1 - (s / 60) * (mg.y1 - mg.y0);
      Object.assign(L, { X, Y });
      let h = `<defs><clipPath id="f23-tak-clip"><ellipse cx="${alt.cx}" cy="${alt.cy}" rx="${alt.rx}" ry="${alt.ry}"/></clipPath></defs>`;
      if (!dar) h += T(16, 13, 'f23-tk', 'lateral pozisyon · önden şematik görünüm', 'start');
      // akciğerler
      h += elips(ust, 'f23-akc', ' data-x="ust"') + elips(ust, 'f23-akc-cpap', ' data-x="ustc"');
      h += elips(alt, 'f23-akc');
      h += `<g clip-path="url(#f23-tak-clip)"><rect class="f23-atel" data-x="atel" x="${alt.cx - alt.rx}" width="${2 * alt.rx}"/><line class="f23-atel-c" data-x="atelc" x1="${alt.cx - alt.rx}" x2="${alt.cx + alt.rx}"/></g>`;
      h += `<path class="f23-hava-o" d="${L.hava}"/><path class="f23-hava-i" d="${L.hava}"/>`;
      // mediasten ve ağırlık oku
      h += `<rect class="f23-med" x="${med.x}" y="${med.y}" width="${med.w}" height="${med.h}" rx="10"/>` + T(med.x + med.w / 2, med.y + med.h / 2 + 4, 'f23-tk2 f23-mut', 'mediasten', 'middle');
      const [ax, ay0, ay1, atx, aty] = L.agir;
      h += `<g data-x="agir"><path class="f23-ok" d="M${ax} ${ay0} L${ax} ${ay1} M${ax - 4} ${ay1 - 6} L${ax} ${ay1} L${ax + 4} ${ay1 - 6}"/>${T(atx, aty, 'f23-tk2', 'ağırlık', 'start')}</g>`;
      // kan akımı: gövde ve iki dal
      h += `<path class="f23-t-az-o" d="${L.govde}" stroke-width="${L.gW + 4}"/><path class="f23-t-az-o" data-x="duo" d="${L.dalU}"/><path class="f23-t-az-o" data-x="dlo" d="${L.dalL}"/>`;
      h += `<path class="f23-t-az-i" d="${L.govde}" stroke-width="${L.gW}"/><path class="f23-t-az-i" data-x="dui" d="${L.dalU}"/><path class="f23-t-az-i" data-x="dli" d="${L.dalL}"/>`;
      h += '<g data-x="nok"></g>';
      h += T(L.paEt[0], L.paEt[1], 'f23-tk', 'pulmoner arter', L.paEt[2]);
      h += T(L.pU[0], L.pU[1], 'f23-yuz', '', 'start', ' data-x="pU"') + T(L.pL[0], L.pL[1], 'f23-yuz', '', 'start', ' data-x="pL"');
      // akciğer yazıları
      h += T(L.ustEt[0], L.ustEt[1], 'f23-bas', 'Üst akciğer · ventile değil', 'middle');
      h += dar ? T(L.cpEt[0][0], L.cpEt[0][1], 'f23-lb f23-bsc', '', 'middle', ' data-x="cp1"') + T(L.cpEt[1][0], L.cpEt[1][1], 'f23-tk2 f23-wrn', 'cerrahi alan daralabilir', 'middle', ' data-x="cp2"')
        : `<text x="${L.cpEt[0][0]}" y="${L.cpEt[0][1]}" text-anchor="middle" data-x="cp1g"><tspan class="f23-lb f23-bsc" data-x="cp1"></tspan><tspan class="f23-tk2 f23-wrn" data-x="cp2"> · cerrahi alan daralabilir</tspan></text>`;
      const [lx, ly1, ly2, ly3] = L.altEt;
      h += T(lx, ly1, 'f23-bas', 'Alt akciğer', 'middle') + T(lx, ly2, 'f23-lb', '', 'middle', ' data-x="ve"') + T(lx, ly3, 'f23-tk2 f23-mut', '+ intrinsik PEEP 5', 'middle', ' data-x="ko"');
      h += T(L.atelEt[0], L.atelEt[1], 'f23-tk2 f23-wrn', '', 'middle', ' data-x="atelt"');
      // kapiller sıkışması
      h += '<g data-x="sik">';
      L.sik.xs.forEach((x) => { h += `<line class="f23-sik-k" x1="${x - 6}" x2="${x + 6}" y1="${L.sik.y}" y2="${L.sik.y}"/><path class="f23-ok f23-sik-o" data-s="u"/><path class="f23-ok f23-sik-o" data-s="d"/>`; });
      h += T(L.sik.et[0], L.sik.et[1], 'f23-tk2', 'kapillerler sıkışır', 'middle') + '</g>';
      // sonuç paneli: yığılmış çubuk
      const B = L.bar;
      h += L.barBas[2] ? `<text class="f23-bas2" x="${L.barBas[0]}" y="${L.barBas[1]}"><tspan x="${L.barBas[0]}">Kalp debisinin</tspan><tspan x="${L.barBas[0]}" dy="14">gittiği yer</tspan></text>` : T(L.barBas[0], L.barBas[1], 'f23-bas2', 'Kalp debisinin gittiği yer', 'start');
      h += `<rect class="f23-bar-z" x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="6"/>`;
      h += '<rect class="f23-bar-v" data-x="bv"/><rect class="f23-bar-a" data-x="ba"/><rect class="f23-bar-u" data-x="bu"/>';
      h += T(0, 0, 'f23-yuz2', '', 'middle', ' data-x="tv"') + T(0, 0, 'f23-yuz2', '', 'middle', ' data-x="ta"') + T(0, 0, 'f23-yuz2', '', 'middle', ' data-x="tu"');
      h += '<path class="f23-parantez" data-x="par"/>' + T(0, 0, 'f23-sant', '', 'start', ' data-x="st"');
      // lejant
      [['f23-bar-v', 'ventile alveoller'], ['f23-bar-a', 'atelektazi (şant)'], ['f23-bar-u', 'üst akciğer (şant)']].forEach(([c, s], i) => {
        const [x, y] = L.lej[i];
        h += `<rect class="${c}" x="${x}" y="${y - 10}" width="12" height="12" rx="3"/>` + T(x + 17, y, 'f23-tk2', dar ? s.replace(' (şant)', '').replace(' alveoller', '') : s, 'start');
      });
      // mini grafik
      h += T(mg.bas[0], mg.bas[1], 'f23-bas2', mg.bas[2], 'start');
      h += eksen(mg, [0, 5, 10, 15], [0, 20, 40, 60], X, Y);
      if (mg.xt) h += T(mg.xt[0], mg.xt[1], 'f23-tk', 'PEEP (cmH₂O)', 'end');
      h += '<path class="f23-mg-soluk" data-x="mgs"/><path class="f23-mg" data-x="mgc"/><g data-x="mgn">' + '<circle class="f23-mg-n" r="3"/>'.repeat(4) + '</g><circle class="f23-mg-sec" r="5.5" data-x="mgsec"/>';
      // SaO₂ kutusu
      const [kx, ky, kw, kh] = L.kutu;
      h += `<rect class="f23-sonuc" x="${kx}" y="${ky}" width="${kw}" height="${kh}" rx="10"/>` + T(L.sa[0], L.sa[1], 'f23-buyuk2', '', 'middle', ' data-x="sa"') + T(L.paK[0], L.paK[1], 'f23-lb', '', 'middle', ' data-x="pa"');
      sahne.innerHTML = `<svg class="f23-svg" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Lateral pozisyonda tek akciğer ventilasyonu: alttaki akciğere PEEP, üstteki akciğere CPAP; kalp debisinin dağılımı, şant oranı ve SaO₂">${h}</svg>`;
      const q = (k) => sahne.querySelector(`[data-x="${k}"]`);
      E = {};
      ['ust', 'ustc', 'atel', 'atelc', 'agir', 'duo', 'dui', 'dlo', 'dli', 'nok', 'pU', 'pL', 'cp1', 'cp2', 've', 'ko', 'atelt', 'sik', 'bv', 'ba', 'bu', 'tv', 'ta', 'tu', 'par', 'st', 'mgs', 'mgc', 'mgn', 'mgsec', 'sa', 'pa'].forEach((k) => { E[k] = q(k); });
      E.sikO = [...E.sik.querySelectorAll('.f23-sik-o')];
      E.mgN = [...E.mgn.children];
      // akış yolları ve noktalar
      const NS = 'http://www.w3.org/2000/svg', svg = sahne.querySelector('svg');
      const olc = (d) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('fill', 'none'); p.style.visibility = 'hidden'; svg.appendChild(p); const r = ornekle(p, 2); p.remove(); return r; };
      const go = olc(L.govde), du = olc(L.dalU), dl = olc(L.dalL);
      E.yol = { U: { pr: [go, du], L: go.L + du.L }, D: { pr: [go, dl], L: go.L + dl.L } };
      let nh = ''; for (let i = 0; i < 48; i++) nh += '<circle class="f23-nk-az" r="2.6"/>';
      E.nok.innerHTML = nh; E.nk = [...E.nok.children];
      son = '';
      ciz();
    };

    const ciz = () => {
      const { ust, alt, bar: B, X, Y } = L;
      const fU = D.fU.v, fL = 1 - fU, a = D.a.v, Qs = fU + fL * a, Sa = (1 - Qs) * SV + Qs * SS;
      // üst akciğer (CPAP)
      const ry = ust.ry * (1 + 0.15 * D.cp.v);
      at(E.ust, { ry }); at(E.ustc, { ry }); E.ustc.style.opacity = D.cp.v.toFixed(2);
      gor(E.cp1, st.cpap); gor(E.cp2, st.cpap);
      // atelektazi şeridi
      const hA = a * L.atK, yb = alt.cy + alt.ry;
      at(E.atel, { y: yb - hA, height: Math.max(0, hA) }); at(E.atelc, { y1: yb - hA, y2: yb - hA });
      gor(E.atelc, hA > 0.8);
      at(E.atelt, { y: hA >= 18 ? yb - hA / 2 + 4.5 : Math.min(yb - hA - 5, yb - 7) });
      E.agir.style.opacity = (0.3 + 0.7 * D.ag.v).toFixed(2);
      // dallar
      const [w0, w1] = L.dW, wu = w0 + w1 * fU, wl = w0 + w1 * fL;
      at(E.duo, { 'stroke-width': wu + 4 }); at(E.dui, { 'stroke-width': wu }); at(E.dlo, { 'stroke-width': wl + 4 }); at(E.dli, { 'stroke-width': wl });
      // kapiller sıkışması (etkin PEEP ≥ 10)
      const cmp = D.cm.v, la = 4 + 5 * (cmp - 1);
      gor(E.sik, st.peep + (st.koah ? 5 : 0) >= 10);
      E.sikO.forEach((p, i) => {
        const x = L.sik.xs[Math.floor(i / 2)], yu = L.sik.y, s = i % 2 ? 1 : -1, y0 = yu + s * (4 + la), y1 = yu + s * 4;
        at(p, { d: `M${x} ${r1(y0)} L${x} ${r1(y1)} M${x - 3.5} ${r1(y1 + s * 5)} L${x} ${r1(y1)} L${x + 3.5} ${r1(y1 + s * 5)}` });
      });
      // akış noktaları (24 yuva üst, 24 yuva alt)
      [['U', fU], ['D', fL]].forEach(([k, f], ui) => {
        const Yk = E.yol[k], N = Math.round(24 * f);
        for (let i = 0; i < 24; i++) {
          const c = E.nk[ui * 24 + i];
          if (RM || !yuvaAcik(i, 24, N)) { c.style.display = 'none'; continue; }
          c.style.display = '';
          const s = ((i / 24) * Yk.L + akis + ui * 7) % Yk.L, p = s < Yk.pr[0].L ? Yk.pr[0].at(s) : Yk.pr[1].at(s - Yk.pr[0].L);
          at(c, { cx: p[0], cy: p[1] });
        }
      });
      // yığılmış çubuk
      const pv = fL * (1 - a), pA = fL * a, pu = fU;
      if (B.dik) {
        const y2 = B.y + B.h, hv = B.h * pv, ha = B.h * pA, hu = B.h * pu;
        at(E.bv, { x: B.x, width: B.w, y: y2 - hv, height: hv }); at(E.ba, { x: B.x, width: B.w, y: y2 - hv - ha, height: ha }); at(E.bu, { x: B.x, width: B.w, y: B.y, height: hu });
        const yaz = (e, y, hh, p) => { at(e, { x: B.x + B.w / 2, y: y + hh / 2 + 4.5 }); e.textContent = `%${yz(p)}`; gor(e, hh >= 16); };
        yaz(E.tv, y2 - hv, hv, pv); yaz(E.ta, y2 - hv - ha, ha, pA); yaz(E.tu, B.y, hu, pu);
        const sy0 = B.y, sy1 = y2 - hv, sx = L.sb;
        at(E.par, { d: `M${sx - 4} ${r1(sy0 + 1)} L${sx} ${r1(sy0 + 1)} L${sx} ${r1(sy1 - 1)} L${sx - 4} ${r1(sy1 - 1)}` });
        const my = clamp((sy0 + sy1) / 2, B.y + 14, y2 - 24);
        E.st.innerHTML = `<tspan x="${sx + 6}" y="${r1(my)}">şant</tspan><tspan x="${sx + 6}" dy="17">%${yz(Qs)}</tspan>`;
      } else {
        const wv = B.w * pv, wa = B.w * pA, wu2 = B.w * pu;
        at(E.bv, { y: B.y, height: B.h, x: B.x, width: wv }); at(E.ba, { y: B.y, height: B.h, x: B.x + wv, width: wa }); at(E.bu, { y: B.y, height: B.h, x: B.x + wv + wa, width: wu2 });
        const yaz = (e, x, ww, p) => { at(e, { x: x + ww / 2, y: B.y + B.h / 2 + 4.5 }); e.textContent = `%${yz(p)}`; gor(e, ww >= 34); };
        yaz(E.tv, B.x, wv, pv); yaz(E.ta, B.x + wv, wa, pA); yaz(E.tu, B.x + wv + wa, wu2, pu);
        const sx0 = B.x + wv, sx1 = B.x + B.w, sy = L.sb;
        at(E.par, { d: `M${r1(sx0 + 1)} ${sy - 4} L${r1(sx0 + 1)} ${sy} L${r1(sx1 - 1)} ${sy} L${r1(sx1 - 1)} ${sy - 4}` });
        const mx = clamp((sx0 + sx1) / 2, B.x + 40, B.x + B.w - 40);
        E.st.innerHTML = `<tspan x="${r1(mx)}" y="${sy + 18}" text-anchor="middle">şant %${yz(Qs)}</tspan>`;
      }
      // mini grafik
      const nokta = (cp) => [0, 5, 10, 15].map((p) => [X(p), Y(model(p, cp && p > 0, st.koah).Qs * 100)]);
      const cur = nokta(st.cpap);
      at(E.mgc, { d: yol(cur) });
      E.mgN.forEach((c, i) => at(c, { cx: cur[i][0], cy: cur[i][1] }));
      gor(E.mgs, st.cpap);
      if (st.cpap) at(E.mgs, { d: yol(nokta(false)) });
      at(E.mgsec, { cx: X(st.peep), cy: Y(model(st.peep, st.cpap, st.koah).Qs * 100) });
      // yazılar
      const SaR = Math.round(Sa), k = `${yz(fU)}|${yz(fL)}|${SaR}|${fmt(P_O2(Sa))}|${st.peep}|${st.cpap}|${st.koah}|${yz(a)}`;
      if (k === son) return;
      son = k;
      E.pU.textContent = `%${yz(fU)}`; E.pL.textContent = `%${yz(fL)}`;
      E.cp1.textContent = `CPAP ${st.peep} cmH₂O`;
      E.ve.textContent = `ventile · PEEP ${st.peep} cmH₂O`;
      gor(E.ko, st.koah);
      E.atelt.textContent = `atelektazi %${yz(a)}`;
      E.sa.textContent = `SaO₂ %${SaR}`;
      E.sa.classList.toggle('f23-crt', SaR < 88); E.sa.classList.toggle('f23-wrn', SaR >= 88 && SaR < 92);
      E.pa.textContent = `PaO₂ ${fmt(P_O2(Sa))} kPa`;
    };

    const kontroller = () => {
      basSec(el, 'a', adim < 0 ? '' : String(adim));
      basSec(el, 'p', String(st.peep));
      const cb = el.querySelector('[data-t="cpap"]'), kb = el.querySelector('[data-t="koah"]');
      cb.disabled = st.peep === 0; cb.setAttribute('aria-pressed', String(st.cpap)); kb.setAttribute('aria-pressed', String(st.koah));
    };
    const uygula = () => {
      if (st.peep === 0) st.cpap = false;
      const M = model(st.peep, st.cpap, st.koah);
      D.fU.set(M.fU); D.a.set(M.a); D.cp.set(st.cpap ? 1 : 0); D.cm.set(comp(M.peff)); D.ag.set(st.peep === 0 ? 1 : 0);
      kontroller();
      capY(capMetin(adim, M));
      son = '';
      ciz();
    };
    el.addEventListener('click', (e) => {
      const a = e.target.closest('[data-a]'), p = e.target.closest('[data-p]'), t = e.target.closest('[data-t]');
      if (a) { adim = +a.dataset.a; const A = ADIM[adim]; st = { peep: A.peep, cpap: A.cpap, koah: A.koah }; }
      else if (p) { adim = -1; st.peep = +p.dataset.p; }
      else if (t && !t.disabled) { adim = -1; st[t.dataset.t] = !st[t.dataset.t]; }
      else return;
      uygula();
    });
    kur(); kontroller();
    const izle = genislikIzle(el, kur);
    const dur = RM ? () => {} : ticker(el, (dt) => { Object.values(D).forEach((g) => g.adim(dt)); akis += 50 * dt; ciz(); });
    return () => { dur(); izle(); };
  };

  /* ================================================================
     5 · PAC'ı yüzdürmek: RA → RV → PA → kama
     ================================================================ */
  VIZ.f23_pac = (el) => {
    // dalga düğümleri (t s, mmHg); kalp hızı 60/dk
    const DUG = {
      RA: [[0, 1.6], [0.10, 2.0], [0.16, 3.8], [0.22, 2.4], [0.28, 3.0], [0.42, 0.8], [0.64, 3.2], [0.76, 0.9], [1, 1.6]],
      RV: [[0, 1.0], [0.12, 1.5], [0.16, 2.5], [0.20, 2.0], [0.24, 17], [0.30, 25], [0.40, 22], [0.47, 8], [0.52, 0.5], [0.62, 0.3], [0.85, 1.0], [1, 1.0]],
      PA: [[0, 11.0], [0.20, 8.0], [0.25, 16], [0.31, 25], [0.42, 23], [0.47, 18.5], [0.49, 17.2], [0.51, 18.6], [0.62, 16.5], [0.82, 13], [1, 11.0]],
      PCWP: [[0, 4.4], [0.18, 4.4], [0.27, 6.4], [0.38, 4.0], [0.70, 6.8], [0.82, 3.8], [1, 4.4]],
    };
    // monoton kübik ara değer (Fritsch–Carlson; aşırı salınım yok), 400 noktalık tablo
    const monoton = (pts) => {
      const n = pts.length, x = pts.map((p) => p[0]), y = pts.map((p) => p[1]), d = [], m = new Array(n);
      for (let i = 0; i < n - 1; i++) d.push((y[i + 1] - y[i]) / (x[i + 1] - x[i]));
      const uc = d[n - 2] * d[0] <= 0 ? 0 : (d[n - 2] + d[0]) / 2;
      m[0] = m[n - 1] = uc;
      for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
      for (let i = 0; i < n - 1; i++) {
        if (d[i] === 0) { m[i] = 0; m[i + 1] = 0; continue; }
        const a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
        if (s > 9) { const t = 3 / Math.sqrt(s); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; }
      }
      const f = (t) => {
        let i = 0; while (i < n - 2 && t > x[i + 1]) i++;
        const h = x[i + 1] - x[i], u = (t - x[i]) / h, u2 = u * u, u3 = u2 * u;
        return (2 * u3 - 3 * u2 + 1) * y[i] + (u3 - 2 * u2 + u) * h * m[i] + (-2 * u3 + 3 * u2) * y[i + 1] + (u3 - u2) * h * m[i + 1];
      };
      const N = 400, tab = Array.from({ length: N + 1 }, (_, i) => f(i / N));
      return (t) => { const q = (((t % 1) + 1) % 1) * N, i = Math.floor(q), r = q - i; return lerp(tab[i], tab[Math.min(N, i + 1)], r); };
    };
    const DALGA = {}; Object.keys(DUG).forEach((k) => { DALGA[k] = monoton(DUG[k]); });
    const TEPE = { RA: [['a', 0.16, 3.8], ['c', 0.28, 3.0], ['v', 0.64, 3.2]], PCWP: [['a', 0.27, 6.4], ['v', 0.70, 6.8]] };
    const BASINC = { RA: 'ortalama ≈ 2 mmHg · a, c, v dalgaları', RV: '25/0–2 mmHg', PA: '25/8 mmHg · ortalama 15', PCWP: 'ortalama ≈ 5 mmHg (PCWP)' };
    const ADIM = [
      { yer: 'Sağ atriyum', d: 20, b: false, w: 'RA', n: 2,
        cap: '<b>Sağ atriyum.</b> Düşük basınçlı atriyum dalgası: a, c ve v dalgaları, ortalama yaklaşık 2 mmHg. Balonu şişirin ve kateteri adım adım ilerletin. [[K1 s. 98, 101, 166]]',
        ip: 'a dalgası atriyum kasılması, c triküspit kapağın atriyuma kabarması, v kapalı kapağa karşı atriyumun dolmasıdır.' },
      { yer: 'Sağ atriyum', d: 20, b: true, w: 'RA', n: 2,
        cap: '<b>Balon şişirildi.</b> Uç sağ atriyumdayken balon şişirilir; bundan sonra kateteri kan akımı taşır. Kitap balonun sağ ventrikülde (yaklaşık 20 cm) şişirildiğini yazar; uygulamada balon atriyumda şişirilir ve triküspit kapaktan şişik balonla geçilir (Atlas notu). [[K1 s. 101]]',
        ip: 'Dalga değişmez: uç hâlâ atriyumda.' },
      { yer: 'Sağ ventrikül', d: 30, b: true, w: 'RV', n: 4,
        cap: '<b>Sağ ventrikül.</b> Sistolik basınç birden yükselir (≈25 mmHg), diyastolde sıfıra yakın düşer. Ucu kan akımı pulmoner kapağa doğru yönlendirir. [[K1 s. 101, 146]]',
        ip: 'Tanı işareti: yüksek sistolik, sıfıra yakın diyastolik basınç.' },
      { yer: 'Pulmoner arter', d: 40, b: true, w: 'PA', n: 7,
        cap: '<b>Pulmoner arter.</b> Sistolik basınç aynı (25 mmHg), ama diyastolik basınç yükseldi (8 mmHg) ve dikrotik çentik belirdi: uç pulmoner kapağı geçti. Ortalama 15 mmHg. [[K1 s. 101, 146]]',
        ip: 'Tanı işareti: diyastolik basıncın yükselmesi; pulmoner kapak kapanınca basınç sıfıra inmez (Atlas notu).' },
      { yer: 'Kama (pulmoner arter dalı)', d: 50, b: true, w: 'PCWP', n: 9,
        cap: '<b>Kama.</b> Uç pulmoner arterin bir dalına kama oldu; şişik balon akımı kesti. Okunan düşük basınçlı a–v dalgası PCWP\'dir (≈5 mmHg). Doğru bir PCWP için uç West zon 3\'te olmalıdır. [[K1 s. 72, 98, 101]]',
        ip: 'Tanı işareti: pulmoner arter dalgası kaybolur, atriyum benzeri düşük basınçlı dalga görülür.' },
      { yer: 'Pulmoner arter dalı', d: 50, b: false, w: 'PA', n: 9,
        cap: '<b>Balon indirildi.</b> Pulmoner arter dalgası geri geldi. Ölçümden sonra balon indirilir (Atlas notu); kitabın saydığı ciddi komplikasyonlar arasında pulmoner enfarktüs ve pulmoner arter rüptürü vardır. [[K1 s. 101]]',
        ip: 'Balon inikken uç kama konumunda kalmamalıdır; PA dalgası görülmelidir.' },
    ];
    // kalp şeması (önden bakış, şematik; hastanın sağı izleyicinin solunda). Dar yerleşimde aynı çizim kaydırılır.
    const KALP = {
      ijv: 'M70 18 L70 116', ijvW: 18, kilif: [63, 12, 14, 18], kilifEt: [86, 27],
      ra: [80, 150, 42], raEt: [58, 162],
      rv: 'M86 190 C120 168 170 160 202 172 C206 212 188 254 150 284 C122 262 98 228 86 190 Z', rvEt: [142, 256],
      tri: ['M88 189 L98 183.5', 'M109 178.5 L119 174.5'],
      gov: 'M186 184 C192 150 204 108 222 72', govW: 18, pk: ['M179 166 L185 166', 'M193 166 L199 166'], paEt: [215, 142],
      dalSag: [[222, 72, 8], [256, 38, 2]], dalSol: [[222, 72, 7], [198, 38, 3]], kama: [244, 50], dalEt: [254, 66],
      kat: [[70, 20], [70, 100], [80, 150], [103, 181], [148, 226], [182, 200], [189, 166], [204, 120], [222, 76], [244, 51]],
    };
    const PW = { W: 720, H: 330, dar: false, kT: '', kx: 0, ky: 0, mon: { x: 280, y: 16, w: 424, h: 254 }, pl: { x0: 314, x1: 696, y0: 30, y1: 256 }, ys: [0, 5, 10, 15, 20, 25, 30] };
    const PN = { W: 360, H: 550, dar: true, kT: 'translate(33 -4)', kx: 33, ky: -4, mon: { x: 8, y: 290, w: 344, h: 252 }, pl: { x0: 40, x1: 344, y0: 304, y1: 528 }, ys: [0, 10, 20, 30] };
    const HIZ = 70; // px/s
    const capY = capYazici(el, ADIM[0].cap);
    let adim = 0, L = PW, E = {}, Tn = 0, seg = [{ t0: -100, w: 'RA' }], olay = [], son = -1;
    const uc = Gecis(0);
    el.innerHTML = `<div class="f23-pac-btn">
        <button type="button" class="btn ghost" data-b="balon" aria-pressed="false">Balonu şişir</button>
        <button type="button" class="btn" data-b="ileri">İlerlet ▸</button>
        <button type="button" class="btn ghost" data-b="geri">Geri ◂</button>
        <button type="button" class="btn ghost" data-b="bas">Baştan</button>
      </div>
      <div class="f23-sahne f23-sahne-pac"></div>
      <dl class="f23-oku f23-oku-4">
        <div><dt>Konum</dt><dd data-o="yer"></dd></div><div><dt>Derinlik ≈</dt><dd data-o="der"></dd></div>
        <div><dt>Balon</dt><dd data-o="bal"></dd></div><div><dt>Basınç</dt><dd data-o="bas"></dd></div>
      </dl>
      <p class="f23-ipucu" data-o="ip" aria-live="polite"></p>`;
    const sahne = el.querySelector('.f23-sahne');
    const o = (k) => el.querySelector(`[data-o="${k}"]`);
    const btn = (k) => el.querySelector(`[data-b="${k}"]`);

    // Catmull–Rom ile yumuşatılmış kateter yolu: yoğun nokta dizisi + birikimli uzunluk
    const katYol = (P) => {
      const pts = [], dur = [];
      for (let i = 0; i < P.length - 1; i++) {
        const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
        dur.push(pts.length);
        for (let k = 0; k < 16; k++) {
          const t = k / 16, t2 = t * t, t3 = t2 * t;
          pts.push([0, 1].map((j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
        }
      }
      dur.push(pts.length); pts.push(P[P.length - 1]);
      const s = [0]; for (let i = 1; i < pts.length; i++) s.push(s[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      return { pts, s, sAt: (n) => s[dur[n]] };
    };
    const dalPoly = (a, b) => {
      const [x0, y0, w0] = a, [x1, y1, w1] = b, dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy), nx = -dy / l, ny = dx / l;
      return `M${r1(x0 + nx * w0)} ${r1(y0 + ny * w0)} L${r1(x1 + nx * w1)} ${r1(y1 + ny * w1)} L${r1(x1 - nx * w1)} ${r1(y1 - ny * w1)} L${r1(x0 - nx * w0)} ${r1(y0 - ny * w0)} Z`;
    };

    const kur = () => {
      const dar = darMi(el);
      L = dar ? PN : PW;
      el.classList.toggle('f23-dar', dar);
      L.yol = katYol(KALP.kat);
      const { mon, pl } = L, Y = (p) => pl.y1 - (p / 30) * (pl.y1 - pl.y0);
      L.Y = Y;
      const K = KALP, [rx, ry, rr] = K.ra, dalP = dalPoly(K.dalSag[0], [K.kama[0], K.kama[1], 5]), dalD = dalPoly([K.kama[0], K.kama[1], 5], K.dalSag[1]), dalS = dalPoly(...K.dalSol);
      // birleşik çizim: önce bütün dış çizgiler, sonra dolgular (odalar ve damarlar tek boşluk gibi görünür)
      let h = `<g${L.kT ? ` transform="${L.kT}"` : ''}>`;
      h += `<path class="f23-t-ln-o" d="${K.ijv}" stroke-width="${K.ijvW + 3}"/><circle class="f23-oda-o" cx="${rx}" cy="${ry}" r="${rr}"/><path class="f23-oda-o" d="${K.rv}"/>`;
      h += `<path class="f23-t-az-o" d="${K.gov}" stroke-width="${K.govW + 3}"/><path class="f23-oda-o" d="${dalS}"/><path class="f23-oda-o" d="${dalP}"/>`;
      h += `<path class="f23-t-az-i" d="${K.ijv}" stroke-width="${K.ijvW}"/><circle class="f23-oda-i" cx="${rx}" cy="${ry}" r="${rr}"/><path class="f23-oda-i" d="${K.rv}"/>`;
      h += `<path class="f23-t-az-i" d="${K.gov}" stroke-width="${K.govW}"/><path class="f23-oda-i" d="${dalS}"/><path class="f23-oda-i" d="${dalP}"/>`;
      h += `<path class="f23-dal" data-x="dalD" d="${dalD}"/>`;
      const [kx, ky, kw, kh] = K.kilif;
      h += `<rect class="f23-kilif" x="${kx}" y="${ky}" width="${kw}" height="${kh}" rx="3"/>` + T(K.kilifEt[0], K.kilifEt[1], 'f23-tk2', 'sağ IJV · kılıf', 'start');
      K.tri.concat(K.pk).forEach((d) => { h += `<path class="f23-kapak" d="${d}"/>`; });
      h += T(K.raEt[0], K.raEt[1], 'f23-bas', 'RA', 'middle') + T(K.rvEt[0], K.rvEt[1], 'f23-bas', 'RV', 'middle') + T(K.paEt[0], K.paEt[1], 'f23-bas', 'PA', 'start') + T(K.dalEt[0], K.dalEt[1], 'f23-tk2', 'dal', 'start');
      h += '<polyline class="f23-kateter" data-x="kat"/><circle class="f23-balon" data-x="bal"/></g>';
      // monitör
      h += `<rect class="f23-mon" x="${mon.x}" y="${mon.y}" width="${mon.w}" height="${mon.h}" rx="12"/>`;
      L.ys.forEach((p) => { h += `<line class="f23-mon-izg" x1="${pl.x0}" x2="${pl.x1}" y1="${r1(Y(p))}" y2="${r1(Y(p))}"/>` + T(pl.x0 - 6, Y(p) + 4, 'f23-tk', p, 'end'); });
      h += T(pl.x1, mon.y + mon.h - 2, 'f23-tk', '', 'end', ' data-x="birim"');
      h += `<clipPath id="f23-pac-clip"><rect x="${pl.x0}" y="${mon.y + 2}" width="${pl.x1 - pl.x0}" height="${mon.h - 4}"/></clipPath>`;
      h += '<g clip-path="url(#f23-pac-clip)"><g data-x="isr"></g><g data-x="olay"></g><g data-x="ozet"></g><path class="f23-iz" data-x="iz"/><g data-x="et"></g><g data-x="tepe"></g></g>';
      sahne.innerHTML = `<svg class="f23-svg" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Pulmoner arter kateteri sağ internal juguler venden sağ atriyum, sağ ventrikül ve pulmoner artere ilerletilirken monitördeki basınç dalgası">${h}</svg>`;
      const q = (k) => sahne.querySelector(`[data-x="${k}"]`);
      E = {}; ['kat', 'bal', 'dalD', 'isr', 'olay', 'ozet', 'iz', 'et', 'tepe', 'birim'].forEach((k) => { E[k] = q(k); });
      E.birim.textContent = 'mmHg';
      if (RM) ozet();
      ciz();
    };

    // RM: dört kesimli durağan özet iz
    const ozet = () => {
      const { pl } = L, w = (pl.x1 - pl.x0) / 4, sira = ['RA', 'RV', 'PA', 'PCWP'], hl = ADIM[adim].w;
      let h = '';
      sira.forEach((k, j) => {
        const pts = [], x0 = pl.x0 + j * w;
        for (let px = 0; px <= w; px += 2) pts.push([x0 + px, L.Y(DALGA[k]((px / w) * 1.5))]);
        h += `<path class="f23-iz-oz${k === hl ? ' on' : ''}" d="${yol(pts)}"/>` + T(x0 + 6, pl.y0 + 14, `f23-iz-et${k === hl ? ' on' : ''}`, k, 'start');
        if (j) h += `<line class="f23-ayrac" x1="${r1(x0)}" x2="${r1(x0)}" y1="${pl.y0}" y2="${pl.y1}"/>`;
      });
      E.ozet.innerHTML = h;
      gor(E.iz, false);
    };

    const basincAt = (tau) => {
      let i = seg.length - 1;
      while (i > 0 && tau < seg[i].t0) i--;
      return DALGA[seg[i].w](tau - Math.floor(tau));
    };
    const izCiz = () => {
      const { pl } = L, W = pl.x1 - pl.x0, Ws = W / HIZ, t0 = Tn - Ws;
      const pts = [];
      for (let px = 0; px <= W; px += 2) { const tau = t0 + px / HIZ; pts.push([pl.x0 + px, L.Y(basincAt(tau))]); }
      at(E.iz, { d: yol(pts) });
      const X = (tau) => pl.x0 + (tau - t0) * HIZ;
      // kesim etiketleri
      let h = '';
      for (let i = 0; i < seg.length; i++) {
        const s = seg[i], son2 = i + 1 < seg.length ? seg[i + 1].t0 : Infinity;
        if (s.t0 > Tn || son2 < t0) continue;
        let x = X(s.t0);
        if (x < pl.x0 + 4) { if (X(son2) < pl.x0 + 60) continue; x = pl.x0 + 4; }
        h += T(x + 4, pl.y0 + 14, 'f23-iz-et on', s.w, 'start');
        if (s.t0 > t0 && i > 0) h += `<line class="f23-ayrac" x1="${r1(X(s.t0))}" x2="${r1(X(s.t0))}" y1="${pl.y0}" y2="${pl.y1}"/>`;
      }
      E.et.innerHTML = h;
      // balon işaretleri
      h = '';
      olay.forEach((ev) => { if (ev.t < t0 || ev.t > Tn) return; const x = X(ev.t); h += `<line class="f23-olay" x1="${r1(x)}" x2="${r1(x)}" y1="${pl.y0 + 20}" y2="${pl.y1}"/>` + T(x + 3, pl.y1 - 6, 'f23-olay-t', ev.s, 'start'); });
      E.olay.innerHTML = h;
      // a, c, v etiketleri: ekrandaki son tam RA ya da PCWP döngüsü
      h = '';
      for (let k = Math.floor(Tn) - 1; k >= Math.ceil(t0); k--) {
        const w = (() => { let i = seg.length - 1; while (i > 0 && k + 0.5 < seg[i].t0) i--; return seg[i].w; })();
        if (TEPE[w]) { TEPE[w].forEach(([s, tp]) => { const tau = k + tp; h += T(X(tau), L.Y(DALGA[w](tp)) - 7, 'f23-tepe', s, 'middle'); }); break; }
      }
      E.tepe.innerHTML = h;
    };

    const ciz = () => {
      // kateter ve balon
      const Y = L.yol, s = uc.v;
      const pts = [Y.pts[0]];
      let i = 1;
      for (; i < Y.pts.length && Y.s[i] <= s; i++) pts.push(Y.pts[i]);
      let tip = Y.pts[Math.min(i, Y.pts.length) - 1];
      if (i < Y.pts.length) { const f = (s - Y.s[i - 1]) / (Y.s[i] - Y.s[i - 1] || 1); tip = [lerp(Y.pts[i - 1][0], Y.pts[i][0], f), lerp(Y.pts[i - 1][1], Y.pts[i][1], f)]; pts.push(tip); }
      at(E.kat, { points: pts.map((p) => `${r1(p[0])},${r1(p[1])}`).join(' ') });
      const A = ADIM[adim], sisik = A.b;
      at(E.bal, { cx: tip[0], cy: tip[1], r: sisik ? 7 : 2.5 });
      E.bal.classList.toggle('on', sisik);
      E.dalD.classList.toggle('kapali', adim === 4 && !uc.aktif);
      if (!RM) izCiz();
      if (son === adim) return;
      son = adim;
      o('yer').textContent = A.yer;
      o('der').innerHTML = `${A.d} cm <small>(sağ IJV, yaklaşık)</small>`;
      o('bal').textContent = sisik ? 'şişik' : 'inik';
      o('bas').textContent = BASINC[A.w];
      o('ip').textContent = A.ip;
      // düğmeler
      const bb = btn('balon'), ib = btn('ileri'), gb = btn('geri'), sb = btn('bas');
      bb.textContent = sisik ? 'Balonu indir' : 'Balonu şişir';
      bb.setAttribute('aria-pressed', String(sisik));
      bb.disabled = adim === 2 || adim === 3;
      bb.title = bb.disabled ? 'Kateter ilerletilirken balon şişik kalır' : '';
      ib.disabled = !(adim >= 1 && adim <= 3);
      ib.title = adim === 0 ? 'Önce balonu şişirin' : adim >= 4 ? 'Uç kama konumunda; daha ileri gitmez' : '';
      gb.disabled = adim === 0; sb.disabled = adim === 0;
      capY(A.cap);
    };

    const git = (yeni) => {
      if (yeni === adim) return;
      const eski = ADIM[adim], A = ADIM[yeni];
      if (eski.b !== A.b) olay.push({ t: Tn, s: A.b ? 'balon ↑' : 'balon ↓' });
      adim = yeni;
      // yeni dalga bir sonraki döngü başından başlar
      const t0 = Math.floor(Tn) + 1, sonS = seg[seg.length - 1];
      if (sonS.t0 > Tn) { sonS.w = A.w; if (seg.length > 1 && seg[seg.length - 2].w === A.w) seg.pop(); }
      else if (sonS.w !== A.w) seg.push({ t0, w: A.w });
      uc.set(L.yol.sAt(A.n), 1.2);
      if (RM) ozet();
      ciz();
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-b]'); if (!b || b.disabled) return;
      const k = b.dataset.b;
      if (k === 'balon') git(adim === 0 ? 1 : adim === 1 ? 0 : adim === 4 ? 5 : adim === 5 ? 4 : adim);
      else if (k === 'ileri' && adim >= 1 && adim <= 3) git(adim + 1);
      else if (k === 'geri' && adim > 0) git(adim - 1);
      else if (k === 'bas') git(0);
    });
    kur();
    uc.set(L.yol.sAt(ADIM[0].n), 0);
    son = -1; ciz();
    const izle = genislikIzle(el, () => { kur(); uc.set(L.yol.sAt(ADIM[adim].n), 0); son = -1; ciz(); });
    const dur = RM ? () => {} : ticker(el, (dt) => {
      Tn += dt; uc.adim(dt);
      const W = (L.pl.x1 - L.pl.x0) / HIZ;
      while (seg.length > 1 && seg[1].t0 < Tn - W - 1) seg.shift();
      olay = olay.filter((ev) => ev.t > Tn - W - 1);
      ciz();
    });
    return () => { dur(); izle(); };
  };

  /* ---------- yeni bileşenler için küçük yardımcılar ---------- */
  // genişlik eşiği izleyici (ör. 760 px: üç sütun / iki sütun); değişince cb(yeniDurum)
  const esikIzle = (el, esik, cb) => {
    let son = null;
    const bak = () => { const w = el.clientWidth; if (!w) return; const d = w >= esik; if (d !== son) { son = d; cb(d); } };
    bak();
    if ('ResizeObserver' in window) { const ro = new ResizeObserver(bak); ro.observe(el); return () => ro.disconnect(); }
    window.addEventListener('resize', bak);
    return () => window.removeEventListener('resize', bak);
  };
  // çok satırlı SVG yazısı: satırlar dizisi, satır aralığı dy
  const TS = (x, y, cls, satirlar, a = 'start', dy = 13, ek = '') => satirlar.map((s, i) => T(x, y + i * dy, cls, s, a, ek)).join('');
  // dokunma ve klavye ile seçim (Enter/Space)
  const secimBagla = (el, sec, cb) => {
    const tik = (e) => { const p = e.target.closest(sec); if (p && el.contains(p)) cb(p, e); };
    const tus = (e) => { if (e.key !== 'Enter' && e.key !== ' ') return; const p = e.target.closest(sec); if (p && el.contains(p) && p.tagName !== 'BUTTON') { e.preventDefault(); cb(p, e); } };
    el.addEventListener('click', tik); el.addEventListener('keydown', tus);
    return () => { el.removeEventListener('click', tik); el.removeEventListener('keydown', tus); };
  };

  /* ================================================================
     6 · Yapı: dallanma, kapiller ve bronşiyal dolaşım (durağan üç panel)
     ================================================================ */
  VIZ.f23_yapi = (el) => {
    const CAP = [
      "<b>Dallanma.</b> Her akciğere bir pulmoner arter girer, her akciğerden ikişer, toplam en az dört pulmoner ven çıkar. Arter, ven ve bronş önce yan yana seyreder ve aynı noktalarda dallanır; çevrede ayrılırlar: arter ve bronş lobülün merkezine gider, ven lobüller arasından geçer. Öbür iki panele dokunun. [[K1 s. 97]]",
      "<b>Kapiller.</b> Pulmoner kapiller neredeyse bütünüyle alveol gazıyla çevrilidir; 7–10 µm çapındadır, eritrosit ancak sıkışarak geçer. Bağ dokusu az ve kırılgan olduğundan kolay genişler ya da çöker. Kapiller ile alveol arasındaki basınç farkı (transmural basınç) sıvıyı alveole iter; alveoler basınç çok düşük olduğundan kapiller basınç da düşük olmalıdır. Sürfaktan da sıvı geçişini önlemeye katkıda bulunur. [[K1 s. 97]]",
      "<b>Bronşiyal dolaşım.</b> İletici hava yollarını bronşiyal arterler besler (kalp debisinin %3–5'i). Oksijeni azalmış bronşiyal kanın bir bölümü pulmoner venlere dökülür ve oksijenli kanla karışıp sistemik dolaşıma girer: anatomik şantın nedenlerinden biri. Nakilde donör bronşiyal arteri bağlanmadığında bazı hastalarda iskemik bronşiyolitis obliterans gelişir; bugün doğrudan revaskülarizasyona doğru bir eğilim vardır. [[K1 s. 97]]",
    ];
    const capY = capYazici(el, CAP[0]);
    const W = 240, H = 390;
    const svg = (lab, ic) => `<svg class="f23-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">${ic}</svg>`;
    const ok = (x, y, yon, cls) => { // küçük üçgen ok başı (yon: 'u' yukarı, 'd' aşağı)
      const s = yon === 'u' ? -1 : 1;
      return `<path class="${cls}" d="M${x - 4.5} ${y - s * 3} L${x} ${y + s * 4} L${x + 4.5} ${y - s * 3} Z"/>`;
    };

    /* --- panel 1: dallanma --- */
    const agac = (ayna) => { // hilustan çevreye iki düzey dallanma; üç paralel çizgi
      const X = (x) => (ayna ? W - x : x);
      const segs = [[[96, 108], [72, 108]], [[72, 108], [50, 84]], [[72, 108], [50, 132]], [[50, 84], [33, 74]], [[50, 84], [36, 93]], [[50, 132], [36, 123]], [[50, 132], [33, 142]]];
      const kat = [['f23-y-br', -3], ['f23-y-ar', 0], ['f23-y-vn', 3]];
      return kat.map(([c, d]) => `<path class="${c}" d="${segs.map(([a, b]) => `M${X(a[0])} ${a[1] + d} L${X(b[0])} ${b[1] + d}`).join(' ')}"/>`).join('');
    };
    const hex = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => { const a = (Math.PI / 180) * (60 * i - 90); return `${r1(cx + r * Math.cos(a))},${r1(cy + r * Math.sin(a))}`; }).join(' ');
    const lobul = (cx, cy, r, sol) => `<polygon class="f23-y-hex${sol ? ' f23-y-soluk' : ''}" points="${hex(cx, cy, r)}"/><g${sol ? ' class="f23-y-soluk"' : ''}><circle class="f23-y-ark" cx="${cx - 6}" cy="${cy}" r="${sol ? 4 : 5}"/><circle class="f23-y-bro" cx="${cx + 7}" cy="${cy}" r="${sol ? 4.5 : 6}"/></g>`;
    const HX = 120, HY = 318, HR = 26, hw = HR * 0.866;
    const p1 = svg('Pulmoner arterler, venler ve bronşların dallanması',
      T(12, 22, 'f23-y-bas', '1 · Dallanma')
      + `<ellipse class="f23-y-akc" cx="64" cy="108" rx="44" ry="64"/><ellipse class="f23-y-akc" cx="176" cy="108" rx="44" ry="64"/>`
      + agac(false) + agac(true)
      // trakea ve ana bronşlar
      + `<path class="f23-y-trk" d="M120 30 L120 64 L92 90 M120 64 L148 90"/>` + T(126, 40, 'f23-y-k f23-mut', 'trakea')
      // pulmoner gövde ve arterler (yukarı akış)
      + `<path class="f23-y-pa" d="M120 186 L120 138 L90 124 M120 138 L150 124"/>` + `<path class="f23-y-okA" d="M115.5 162 L120 156 L124.5 162"/>`
      // pulmoner venler (aşağı, sol atriyuma)
      + `<path class="f23-y-pv" d="M80 140 L102 202 M82 160 L102 210 M160 140 L138 202 M158 160 L138 210"/>`
      + `<rect class="f23-y-la" x="100" y="196" width="40" height="20" rx="5"/>` + T(120, 210, 'f23-y-k2', 'Sol A', 'middle')
      + T(50, 190, 'f23-y-k f23-mut', 'sağ akciğer', 'middle') + T(190, 190, 'f23-y-k f23-mut', 'sol akciğer', 'middle')
      // birlikte dallanma işareti
      + `<circle class="f23-y-isaret" cx="168" cy="108" r="9"/><line class="f23-y-kilavuz" x1="172" y1="79" x2="169" y2="98"/>`
      + TS(176, 62, 'f23-y-k f23-hale', ['aynı noktalarda', 'dallanır'], 'middle', 12)
      // lejant
      + `<line class="f23-y-br" x1="18" x2="30" y1="232" y2="232"/>` + T(36, 236, 'f23-y-k', 'bronş')
      + `<line class="f23-y-ar" x1="18" x2="30" y1="247" y2="247"/>` + T(36, 251, 'f23-y-k', 'pulmoner arter: 2 (her akciğere 1)')
      + `<line class="f23-y-vn" x1="18" x2="30" y1="262" y2="262"/>` + T(36, 266, 'f23-y-k', 'pulmoner ven: ≥ 4 (her akciğerden 2)')
      // çevre: lobül kesiti
      + `<path class="f23-y-kilavuz" d="M33 142 L8 168 L8 304 L48 318"/>`
      + T(124, 286, 'f23-y-k2', 'lobül kesiti · çevrede ayrılırlar', 'middle')
      + lobul(HX - 2 * hw, HY, HR, true) + lobul(HX + 2 * hw, HY, HR, true) + lobul(HX, HY, HR, false)
      + `<path class="f23-y-pvL" d="M${r1(HX + hw)} ${r1(HY - HR / 2 + 2)} L${r1(HX + hw)} ${r1(HY + HR / 2 - 2)} M${r1(HX - hw)} ${r1(HY - HR / 2 + 2)} L${r1(HX - hw)} ${r1(HY + HR / 2 - 2)} M${r1(HX + 3)} ${r1(HY - HR + 2)} L${r1(HX + hw - 3)} ${r1(HY - HR / 2 - 1)}"/>`
      + T(120, 362, 'f23-y-k', 'arter + bronşiyol: lobül merkezinde', 'middle')
      + T(120, 376, 'f23-y-k', 'ven: lobüller arasında', 'middle'));

    /* --- panel 2: kapiller --- */
    const p2 = svg('Alveol gazıyla çevrili pulmoner kapiller ve transmural basınç',
      T(12, 22, 'f23-y-bas', '2 · Kapiller')
      + `<rect class="f23-y-alv" x="20" y="36" width="200" height="106" rx="30"/><rect class="f23-y-alv" x="20" y="186" width="200" height="104" rx="30"/>`
      + `<rect class="f23-y-alv" x="2" y="146" width="16" height="36" rx="8"/><rect class="f23-y-alv" x="222" y="146" width="16" height="36" rx="8"/>`
      + T(206, 56, 'f23-y-k2 f23-mut', 'alveol gazı', 'end')
      + TS(206, 74, 'f23-y-k', ['kapiller neredeyse', 'bütünüyle gazla çevrili'], 'end', 13)
      // kapiller tüpü
      + `<rect class="f23-y-kapic" x="22" y="154" width="196" height="20"/>`
      + `<line class="f23-y-cep" x1="22" x2="218" y1="154" y2="154"/><path class="f23-y-cep" d="M22 174 L34 174 M84 174 L218 174"/><line class="f23-y-cepK" x1="34" x2="84" y1="174" y2="174"/>`
      + `<ellipse class="f23-y-eri" cx="64" cy="164" rx="10" ry="8"/><ellipse class="f23-y-eri" cx="120" cy="164" rx="14" ry="6.5"/><ellipse class="f23-y-eri" cx="178" cy="164" rx="10" ry="8"/>`
      // çap oku
      + `<line class="f23-y-cap" x1="150" x2="150" y1="157" y2="171"/>${ok(150, 157, 'u', 'f23-y-okI')}${ok(150, 171, 'd', 'f23-y-okI')}`
      // transmural basınç: kapillerden alveole sıvı
      + `<line class="f23-y-tm" x1="50" x2="50" y1="152" y2="114"/>${ok(50, 110, 'u', 'f23-y-okB')}`
      + `<circle class="f23-y-dam" cx="42" cy="96" r="3.2"/><circle class="f23-y-dam" cx="56" cy="88" r="2.8"/><circle class="f23-y-dam" cx="46" cy="80" r="2.4"/>`
      + TS(64, 106, 'f23-y-k', ['P kapiller − P alveol', '= transmural basınç', '→ sıvı geçişi (ödem)'], 'start', 13)
      // alt alveol yazıları
      + T(30, 205, 'f23-y-k', '↑ kırılgan duvar') + T(160, 206, 'f23-y-buyuk', '7–10 µm', 'middle')
      + T(120, 226, 'f23-y-k', 'eritrosit ancak sıkışarak geçer', 'middle')
      + TS(120, 250, 'f23-y-k', ['bağ dokusu az → kolay', 'genişler ya da çöker'], 'middle', 13)
      + T(206, 282, 'f23-y-k2 f23-mut', 'alveol gazı', 'end')
      // alt kutu
      + `<rect class="f23-y-uyari" x="10" y="302" width="220" height="80" rx="9"/>`
      + TS(120, 322, 'f23-y-k2', ['P alveol çok düşük →', 'P kapiller de düşük olmalı'], 'middle', 15)
      + TS(120, 356, 'f23-y-k', ['sürfaktan da sıvı geçişini', 'önlemeye katkıda bulunur'], 'middle', 13));

    /* --- panel 3: bronşiyal dolaşım --- */
    const bY = (x, ust) => (ust ? 54 + (x - 16) * 0.0896 : 82 + (x - 16) * 0.0896);
    let halka = '';
    [40, 68, 96, 124].forEach((x) => { halka += `<line class="f23-y-hlk" x1="${x}" x2="${x}" y1="${r1(bY(x, true) + 3)}" y2="${r1(bY(x, false) - 3)}"/>`; });
    const p3 = svg('Bronşiyal dolaşım ve anatomik şant',
      `<defs><linearGradient id="f23-bron-grad" gradientUnits="userSpaceOnUse" x1="98" y1="0" x2="142" y2="0"><stop offset="0" class="f23-st-o2"/><stop offset="1" class="f23-st-az"/></linearGradient></defs>`
      + T(12, 22, 'f23-y-bas', '3 · Bronşiyal dolaşım')
      + T(16, 44, 'f23-y-k f23-mut', 'iletici hava yolu')
      + `<polygon class="f23-y-bron" points="16,54 150,66 150,94 16,82"/>` + halka
      // alveoller ve pulmoner ven
      + `<circle class="f23-y-alv" cx="186" cy="64" r="13"/><circle class="f23-y-alv" cx="212" cy="58" r="13"/><circle class="f23-y-alv" cx="200" cy="86" r="13"/><circle class="f23-y-alv" cx="224" cy="82" r="10"/>`
      + T(198, 40, 'f23-y-k f23-mut', 'alveoller', 'middle')
      + `<line class="f23-y-pvK" x1="204" x2="204" y1="98" y2="222"/>${ok(204, 228, 'd', 'f23-y-okV')}`
      + T(219, 112, 'f23-y-k f23-crt', 'pulmoner ven', 'start', ' transform="rotate(90 219 112)"')
      // bronşiyal arter, çeper kapiller ağı, bronşiyal ven
      + `<path class="f23-y-bart" d="M8 89 L98 97"/>`
      + `<path class="f23-y-bkap" d="M98 97 q6 -9 12 -1 t12 0 t12 1 t8 4 M98 97 q6 8 12 2 t12 1 t12 0 t8 1"/>`
      + `<path class="f23-y-bven" d="M142 101 C170 108 198 140 202 166"/>`
      + `<path class="f23-y-kar-a" d="M204 163 A7 7 0 0 0 204 177 Z"/><path class="f23-y-kar-o" d="M204 163 A7 7 0 0 1 204 177 Z"/>`
      + T(12, 118, 'f23-y-k2 f23-crt', 'bronşiyal arter') + T(12, 131, 'f23-y-k', "kalp debisinin %3–5'i")
      + T(182, 150, 'f23-y-k f23-acc', 'bronşiyal ven', 'end')
      + TS(194, 192, 'f23-y-k', ['bir bölümü pulmoner', 'vene dökülür'], 'end', 13)
      + T(228, 246, 'f23-y-k', 'sol kalp → sistemik dolaşım', 'end')
      + T(228, 262, 'f23-y-k2', '= anatomik şant (Bölüm 14)', 'end')
      // nakil: kesim işareti ve kutu
      + T(10, 80, 'f23-y-kes', '×', 'middle')
      + `<rect class="f23-y-nakil" x="8" y="274" width="224" height="110" rx="9"/>`
      + `<rect class="f23-y-etk" x="16" y="282" width="84" height="17" rx="8.5"/>` + T(58, 294.5, 'f23-y-etk-t', 'Akciğer nakli', 'middle')
      + T(108, 294.5, 'f23-y-k f23-mut', '(× = bağlanmayan arter)')
      + TS(18, 314, 'f23-y-k', ['donör bronşiyal arteri bağlanmazdı', '(greftlerin çoğu yaşadı)'], 'start', 12.5)
      + TS(18, 343, 'f23-y-k', ['↓ bazı hastalarda iskemik', '   bronşiyolitis obliterans'], 'start', 12.5)
      + TS(18, 368, 'f23-y-k', ['↓ bugün: doğrudan revaskülarizasyon'], 'start', 12.5));

    const AD = ['1 · Dallanma', '2 · Kapiller', '3 · Bronşiyal dolaşım'];
    let sec = 0;
    el.innerHTML = `<div class="f23-ctl">${segHtml('Panel', 'p', AD.map((a, i) => [String(i), a]), '0')}</div>
      <div class="f23-y-grid">${[p1, p2, p3].map((s, i) => `<div class="f23-y-pan" data-pan="${i}" role="button" tabindex="0" aria-pressed="${i === 0}" aria-label="${AD[i]}: panele dokunun">${s}</div>`).join('')}</div>`;
    const panlar = [...el.querySelectorAll('.f23-y-pan')];
    const sec_ = (i) => {
      sec = i;
      basSec(el, 'p', String(i));
      panlar.forEach((p, k) => { p.classList.toggle('on', k === i); p.setAttribute('aria-pressed', String(k === i)); });
      capY(CAP[i]);
    };
    sec_(0);
    const coz = secimBagla(el, '[data-p], .f23-y-pan', (p) => { const i = p.dataset.p != null ? +p.dataset.p : +p.dataset.pan; if (i !== sec) sec_(i); });
    const izle = esikIzle(el, 760, (g) => el.classList.toggle('f23-y-genis', g));
    return () => { coz(); izle(); };
  };

  /* ================================================================
     7 · Aynı akım, onda bir direnç: Darcy yasası, SVR ve PVR (durağan şema)
     ================================================================ */
  VIZ.f23_direnc = (el) => {
    const CAP = {
      iki: "<b>PVR = 80 × (MPAP − PCWP) / CO</b> = 80 × (15 − 5) / 5 = 160 dyn·s·cm⁻⁵. <b>SVR ≈ 80 × (MAP − ortalama sağ atriyum basıncı) / CO</b> = 80 × (100 − 2) / 5 = 1568 dyn·s·cm⁻⁵. Basınçlar mmHg, CO L/dk; 80 birim dönüşüm sabitidir. [[K1 s. 98]]",
      sis: "<b>Sistemik devre.</b> MAP 100 mmHg, ortalama sağ atriyum basıncı 2 mmHg, kalp debisi 5 L/dk: SVR = 80 × (100 − 2) / 5 = 1568 dyn·s·cm⁻⁵. Hesaptaki değerlerden yalnız MAP pulmoner arter kateteriyle ölçülmez. [[K1 s. 98]]",
      pul: "<b>Pulmoner devre.</b> MPAP 15 mmHg, PCWP 5 mmHg, kalp debisi 5 L/dk: PVR = 80 × (15 − 5) / 5 = 160 dyn·s·cm⁻⁵; değerlerin hepsi pulmoner arter kateteriyle ölçülür. Aynı akım için basınç düşüşü onda bir olduğundan PVR, SVR'nin yaklaşık onda biridir. [[K1 s. 98]]",
    };
    const capY = capYazici(el, CAP.iki);
    const DEV = {
      sis: { ad: 'Sistemik devre', gir: ['MAP', '', '100 mmHg'], gPac: false, cik: ['Sağ atriyum', '(ortalama)', '2 mmHg'], p0: 100, p1: 2, amp: 14, n: 10, boru: 'f23-d-boruS', f: ['SVR = 80 × 98 / 5', '= 1568 dyn·s·cm⁻⁵'], dp: 'ΔP = 98 mmHg' },
      pul: { ad: 'Pulmoner devre', gir: ['MPAP', '', '15 mmHg'], gPac: true, cik: ['PCWP', '', '5 mmHg'], p0: 15, p1: 5, amp: 4, n: 3, boru: 'f23-d-boruP', f: ['PVR = 80 × 10 / 5', '= 160 dyn·s·cm⁻⁵'], dp: 'ΔP = 10 mmHg' },
    };
    const zz = (x0, x1, y, amp, n) => { const p = [[x0, y]]; for (let i = 0; i < n; i++) p.push([x0 + ((i + 0.5) * (x1 - x0)) / n, y + (i % 2 ? amp : -amp)]); p.push([x1, y]); return yol(p); };
    const rozet = (x, y, w, pac, dar) => {
      const t = pac ? 'PAC' : 'PAC ile ölçülmez';
      const ww = pac ? (dar ? 40 : 34) : w;
      return `<rect class="${pac ? 'f23-d-roz-ok' : 'f23-d-roz-no'}" x="${r1(x - ww / 2)}" y="${y}" width="${ww}" height="${dar ? 18 : 16}" rx="8"/>` + T(x, y + (dar ? 13 : 11.6), 'f23-d-roz-t', t, 'middle');
    };
    const kutu = (x, y, w, h, s, dar) => {
      const [a, b, c] = s;
      let t = `<rect class="f23-d-kutu" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
      if (b) t += T(x + w / 2, y + (dar ? 16 : 15), 'f23-d-kad', a, 'middle') + T(x + w / 2, y + (dar ? 30 : 28), 'f23-d-kalt', b, 'middle') + T(x + w / 2, y + h - 8, 'f23-d-kdeg', c, 'middle');
      else t += T(x + w / 2, y + (dar ? 20 : 19), 'f23-d-kad', a, 'middle') + T(x + w / 2, y + h - 10, 'f23-d-kdeg', c, 'middle');
      return t;
    };
    const devreW = (k, y0) => { // geniş yerleşim satırı
      const D = DEV[k], yb = y0 + 44, pr0 = y0 + 104, prS = 30, P = (p) => pr0 - (p / 100) * prS;
      let h = `<g class="f23-d-satir" data-sat="${k}" role="button" tabindex="0" aria-label="${D.ad}">`;
      h += `<rect class="f23-d-zemin" x="8" y="${y0 - 4}" width="608" height="${y0 === 76 ? 112 : 112}" rx="10"/>`;
      h += T(20, y0 + 10, 'f23-d-ad', D.ad);
      h += `<line class="${D.boru}" x1="120" x2="180" y1="${yb}" y2="${yb}"/><line class="${D.boru}" x1="270" x2="330" y1="${yb}" y2="${yb}"/>`;
      h += `<path class="f23-d-zz" d="${zz(180, 270, yb, D.amp, D.n)}"/>`;
      h += `<path class="f23-d-okb" d="M304 ${yb - 6} L314 ${yb} L304 ${yb + 6}"/>`;
      h += T(207, y0 + 12, 'f23-d-co', 'CO 5 L/dk →', 'middle') + rozet(268, y0 + 1, 34, true, false);
      h += kutu(20, y0 + 18, 100, 52, D.gir, false) + kutu(330, y0 + 18, 100, 52, D.cik, false);
      h += rozet(70, y0 + 74, 96, D.gPac, false) + rozet(380, y0 + 74, 96, true, false);
      // basınç profili (ortak ölçek)
      h += `<line class="f23-d-taban" x1="120" x2="330" y1="${pr0}" y2="${pr0}"/>`;
      h += `<path class="f23-d-pro ${k === 'sis' ? 'f23-d-proS' : 'f23-d-proP'}" d="M120 ${r1(P(D.p0))} L180 ${r1(P(D.p0))} L270 ${r1(P(D.p1))} L330 ${r1(P(D.p1))}"/>`;
      h += `<path class="f23-d-ayr" d="M276 ${r1(P(D.p0))} L281 ${r1(P(D.p0))} L281 ${r1(P(D.p1))} L276 ${r1(P(D.p1))}"/>`;
      h += T(126, pr0 - (k === 'sis' ? 5 : 11), 'f23-d-dp', D.dp) + T(334, pr0 + 3, 'f23-d-tk', 'basınç');
      h += T(445, y0 + 40, 'f23-d-f', D.f[0]) + T(445, y0 + 60, 'f23-d-f f23-d-fb', D.f[1]);
      return h + '</g>';
    };
    const devreN = (k, y0) => { // dar yerleşim satırı
      const D = DEV[k], yb = y0 + 48, pr0 = y0 + 146, prS = 40, P = (p) => pr0 - (p / 100) * prS;
      let h = `<g class="f23-d-satir" data-sat="${k}" role="button" tabindex="0" aria-label="${D.ad}">`;
      h += `<rect class="f23-d-zemin" x="2" y="${y0 - 2}" width="356" height="216" rx="10"/>`;
      h += T(10, y0 + 14, 'f23-d-ad', D.ad);
      h += `<line class="${D.boru}" x1="106" x2="140" y1="${yb}" y2="${yb}"/><line class="${D.boru}" x1="220" x2="254" y1="${yb}" y2="${yb}"/>`;
      h += `<path class="f23-d-zz" d="${zz(140, 220, yb, D.amp, D.n)}"/>`;
      h += `<path class="f23-d-okb" d="M232 ${yb - 6} L242 ${yb} L232 ${yb + 6}"/>`;
      h += T(180, y0 + 82, 'f23-d-co', 'CO 5 L/dk →', 'middle') + rozet(180, y0 + 88, 40, true, true);
      h += kutu(10, y0 + 22, 96, 58, D.gir, true) + kutu(254, y0 + 22, 96, 58, D.cik, true);
      h += rozet(58, y0 + 84, 96, D.gPac, true) + rozet(302, y0 + 84, 96, true, true);
      h += `<line class="f23-d-taban" x1="106" x2="254" y1="${pr0}" y2="${pr0}"/>`;
      h += `<path class="f23-d-pro ${k === 'sis' ? 'f23-d-proS' : 'f23-d-proP'}" d="M106 ${r1(P(D.p0))} L140 ${r1(P(D.p0))} L220 ${r1(P(D.p1))} L254 ${r1(P(D.p1))}"/>`;
      h += `<path class="f23-d-ayr" d="M226 ${r1(P(D.p0))} L231 ${r1(P(D.p0))} L231 ${r1(P(D.p1))} L226 ${r1(P(D.p1))}"/>`;
      h += T(100, pr0 - 22, 'f23-d-tk', 'basınç', 'end') + T(180, pr0 + 18, 'f23-d-dp', D.dp, 'middle');
      h += T(180, y0 + 186, 'f23-d-f', D.f[0], 'middle') + T(180, y0 + 205, 'f23-d-f f23-d-fb', D.f[1], 'middle');
      return h + '</g>';
    };
    const devreSimge = (x, y) => // pil (V), direnç (R), akım oku (I)
      `<g class="f23-d-sim"><path d="M${x} ${y + 8} L${x} ${y} L${x + 18} ${y} M${x + 52} ${y} L${x + 70} ${y} L${x + 70} ${y + 34} L${x} ${y + 34} L${x} ${y + 22}"/>`
      + `<path d="${zz(x + 18, x + 52, y, 5, 6)}"/><path class="f23-d-pil" d="M${x - 8} ${y + 8} L${x + 8} ${y + 8} M${x - 4} ${y + 13} L${x + 4} ${y + 13}"/><path d="M${x} ${y + 13} L${x} ${y + 22}"/>`
      + `<path d="M${x + 30} ${y + 30} L${x + 38} ${y + 34} L${x + 30} ${y + 38}"/></g>`
      + T(x - 12, y + 14, 'f23-d-tk', 'V', 'end') + T(x + 35, y - 8, 'f23-d-tk', 'R', 'middle') + T(x + 35, y + 50, 'f23-d-tk', 'I', 'middle');
    const ciz = (dar) => {
      el.classList.toggle('f23-dar', dar);
      let h;
      if (!dar) {
        h = devreSimge(30, 18)
          + T(124, 40, 'f23-d-ohm', 'V = I × R') + T(236, 40, 'f23-d-ohm', '≙', 'middle')
          + T(262, 34, 'f23-d-ohm', 'ΔP = akım × direnç ⇒ direnç = ΔP / akım') + T(262, 52, 'f23-d-tk', 'Darcy yasası (Ohm yasasının damar karşılığı)')
          + devreW('sis', 76) + devreW('pul', 200);
        const yS = 200, yP = (200 * 160) / 1568;
        h += `<g class="f23-d-cub" data-cub="sis"><rect class="f23-d-cubS" x="638" y="${300 - yS}" width="28" height="${yS}" rx="3"/>${T(652, 300 - yS - 6, 'f23-d-cubT', '1568', 'middle')}${T(652, 316, 'f23-d-cubA', 'SVR', 'middle')}</g>`;
        h += `<g class="f23-d-cub" data-cub="pul"><rect class="f23-d-cubP" x="678" y="${r1(300 - yP)}" width="28" height="${r1(yP)}" rx="3"/>${T(692, 300 - yP - 6, 'f23-d-cubT', '160', 'middle')}${T(692, 316, 'f23-d-cubA', 'PVR', 'middle')}</g>`;
        h += T(692, 250, 'f23-d-oran', '≈ 1/10', 'middle') + `<line class="f23-d-taban" x1="630" x2="714" y1="300" y2="300"/>`;
        h += TS(672, 58, 'f23-d-tk', ['direnç', '(dyn·s·cm⁻⁵)'], 'middle', 12);
        return `<svg class="f23-svg" viewBox="0 0 720 330" role="img" aria-label="Sistemik ve pulmoner devre: aynı akımda basınç düşüşü 98 ve 10 mmHg, SVR 1568 ve PVR 160 dyn·s·cm⁻⁵">${h}</svg>`;
      }
      h = devreSimge(22, 18)
        + T(108, 26, 'f23-d-ohm', 'V = I × R') + T(350, 26, 'f23-d-tk', 'Darcy yasası', 'end')
        + T(108, 46, 'f23-d-ohm', '≙ ΔP = akım × direnç') + T(108, 66, 'f23-d-ohm', '⇒ direnç = ΔP / akım')
        + devreN('sis', 84) + devreN('pul', 310);
      const lP = (300 * 160) / 1568;
      h += T(10, 548, 'f23-d-tk', 'direnç (dyn·s·cm⁻⁵)');
      h += `<g class="f23-d-cub" data-cub="sis">${T(10, 573, 'f23-d-cubA', 'SVR')}<rect class="f23-d-cubS" x="48" y="559" width="300" height="20" rx="3"/>${T(342, 573, 'f23-d-cubT f23-d-cubIc', '1568', 'end')}</g>`;
      h += `<g class="f23-d-cub" data-cub="pul">${T(10, 603, 'f23-d-cubA', 'PVR')}<rect class="f23-d-cubP" x="48" y="589" width="${r1(lP)}" height="20" rx="3"/>${T(48 + lP + 6, 603, 'f23-d-cubT', '160')}</g>`;
      h += T(348, 603, 'f23-d-oran', '≈ 1/10', 'end');
      return `<svg class="f23-svg" viewBox="0 0 360 620" role="img" aria-label="Sistemik ve pulmoner devre: aynı akımda basınç düşüşü 98 ve 10 mmHg, SVR 1568 ve PVR 160 dyn·s·cm⁻⁵">${h}</svg>`;
    };
    let mod = 'iki';
    el.innerHTML = `<div class="f23-ctl">${segHtml('Gösterilen devre', 'd', [['iki', 'İkisi'], ['sis', 'Sistemik'], ['pul', 'Pulmoner']], 'iki')}</div>
      <div class="f23-sahne f23-d-sahne"></div>
      <p class="f23-d-not">PAC = pulmoner arter kateteriyle ölçülür · 80 = birim dönüşüm sabiti</p>`;
    const sahne = el.querySelector('.f23-sahne');
    const uygula = () => {
      basSec(el, 'd', mod);
      sahne.querySelectorAll('[data-sat]').forEach((g) => { g.classList.toggle('f23-d-soluk', mod !== 'iki' && g.dataset.sat !== mod); g.setAttribute('aria-pressed', String(g.dataset.sat === mod)); });
      sahne.querySelectorAll('[data-cub]').forEach((g) => g.classList.toggle('f23-d-soluk', mod !== 'iki' && g.dataset.cub !== mod));
      capY(CAP[mod]);
    };
    const kur = () => { sahne.innerHTML = ciz(darMi(el)); uygula(); };
    kur();
    const coz = secimBagla(el, '[data-d], [data-sat]', (b) => { const k = b.dataset.d || b.dataset.sat; mod = b.dataset.sat && mod === k ? 'iki' : k; uygula(); });
    const izle = genislikIzle(el, kur);
    return () => { coz(); izle(); };
  };

  /* ================================================================
     8 · HPV'nin iki yüzü: bölgesel ve yaygın (sınıflama haritası)
     ================================================================ */
  VIZ.f23_klinik = (el) => {
    const ILK = "Solda bölgesel hipoksi: kan iyi ventile olan alana yönelir. Sağda yaygın hipoksi: bütün akciğerde damarlar daralır ve PVR yükselir. Alttaki şerit HPV'yi güçlendiren ve azaltan etkenlerdir. Bir duruma dokunun. [[K1 s. 99–100]]";
    const CAP = {
      1: "<b>Pnömoni.</b> HPV hipoksik alveollerin yakınındaki arteriyollerin direncini artırır, kanı daha iyi ventile olan alveollere yönlendirir ve V̇/Q̇ uyumsuzluğunu azaltır. Volatil ajanla ameliyat sırasında inhibe edilirse belirgin şant ve hipoksemi olabilir. [[K1 s. 100]]",
      2: "<b>Tek akciğer anestezisi.</b> HPV olmasaydı tek akciğer ventilasyonu belirgin bir V̇/Q̇ uyumsuzluğu yaratırdı; HPV kanı ventile edilmeyen akciğerden ventile edilene yönlendirir ve hipoksemiyi en aza indirir. [[K1 s. 100]]",
      3: "<b>Üst loblara yönelme.</b> Sol ventrikül yetmezliğinde sol ventrikülün diyastol sonu basıncı ve pulmoner venöz basınç yükselir. West zonları nedeniyle venöz basınç tabanlarda daha yüksektir ve orada ödem yapar; hipoksik bazal alveollerden HPV kanı apekslere yönlendirir. [[K1 s. 100]]",
      4: "<b>Fetal dolaşım.</b> Akciğerler açılmamıştır (PAO₂ sıfır): yaygın HPV PVR'yi yükseltir, fetal kalp debisinin yalnızca %10'u akciğerlerden geçer ve kan duktus arteriyozusa yönelir. İlk solukla O₂ alveollere girer, PVR çarpıcı biçimde düşer ve pulmoner akım artar. [[K1 s. 99]]",
      5: "<b>Yenidoğanın solunum sıkıntısı sendromu.</b> Sürfaktan eksikliği yüzey gerilimini artırır ve yaygın atelektazi yapar; HPV ile yüksek kalan PVR alveol perfüzyonunu bozar ve pnömositler ölür. Nekrotik pnömositlerin oluşturduğu hiyalen membran difüzyonu bozar ve HPV'yi daha da artırır: kısır döngü. [[K1 s. 99–100]]",
      6: "<b>Yüksek irtifa.</b> Düşük barometrik basınç bütün akciğerde alveoler hipoksi yapar: yaygın pulmoner vazokonstriksiyon ve venokonstriksiyon. Venokonstriksiyonun yüksek irtifa pulmoner ödeminde rolü vardır (Bölüm 87). [[K1 s. 100]]",
      7: "<b>Kronik hipoksemi.</b> HPV'nin bir bölümü arteriyel hipoksemiye yanıttır. Pulmoner fibrozis ya da KOAH'a bağlı arteriyel hipoksemisi olan bazı hastalarda yaygın HPV'ye bağlanan pulmoner arteriyel hipertansiyon ve sağ ventrikül yetmezliği (kor pulmonale) gelişir. [[K1 s. 100]]",
      8: "<b>Değiştiren etkenler.</b> Asidoz ve hiperkapni HPV'yi artırır; alkaloz, hipokapni, vazodilatatörler (nitratlar, sodyum nitroprussid, NO), bronkodilatatörler ve volatil anestezikler azaltır. Volatil ajanlarla belirgin inhibisyon ancak 1 MAC'ın üzerinde görülür; N₂O'nun etkisi azdır, intravenöz ajanların yoktur. [[K1 s. 100]]",
    };
    const capY = capYazici(el, ILK);
    const tara = (id) => `<defs><pattern id="${id}" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="5" class="f23-k-tz"/><line x1="0" y1="0" x2="0" y2="5" class="f23-k-tc"/></pattern></defs>`;
    const simBolge = `<svg class="f23-k-sim" viewBox="0 0 120 60" role="img" aria-label="Bölgesel hipoksi: hipoksik alveolün arteriyolü daralır, kan normal alveole yönelir">${tara('f23-k-tara1')}
      <path class="f23-k-dmr" d="M60 50 C60 42 88 48 88 37" stroke-width="1.5"/><path class="f23-k-dmr" d="M60 58 C60 46 40 50 40 40" stroke-width="5"/>
      <path class="f23-k-okc" d="M34 41 L40 33 L46 41 Z"/>
      <circle class="f23-k-alv" cx="40" cy="20" r="14"/><circle class="f23-k-alvH" cx="88" cy="20" r="14" fill="url(#f23-k-tara1)"/></svg>`;
    const simYaygin = `<svg class="f23-k-sim" viewBox="0 0 120 60" role="img" aria-label="Yaygın hipoksi: bütün alveoller hipoksik, bütün arteriyoller daralır, PVR yükselir">${tara('f23-k-tara2')}
      <path class="f23-k-dmr" d="M54 58 L54 46 M54 46 Q54 40 22 36 M54 46 L54 35 M54 46 Q54 40 86 36" stroke-width="1.5"/>
      <circle class="f23-k-alvH" cx="22" cy="20" r="13" fill="url(#f23-k-tara2)"/><circle class="f23-k-alvH" cx="54" cy="20" r="13" fill="url(#f23-k-tara2)"/><circle class="f23-k-alvH" cx="86" cy="20" r="13" fill="url(#f23-k-tara2)"/>
      <text x="118" y="56" class="f23-k-pvr" text-anchor="end">PVR ↑</text></svg>`;
    const simOdem = `<svg class="f23-k-mini f23-k-odem" viewBox="0 0 60 80" role="img" aria-label="Dik akciğer: tabanda ödem, kan apekse yönelir">
      <path class="f23-k-akc" d="M30 4 C14 6 8 30 7 52 C6 66 10 76 22 76 L44 76 C54 76 56 64 54 50 C52 28 46 6 30 4 Z"/>
      ${[[16, 62], [24, 66], [32, 62], [40, 67], [48, 62], [20, 71], [36, 71], [44, 71], [28, 58]].map(([x, y]) => `<circle class="f23-k-odm" cx="${x}" cy="${y}" r="2"/>`).join('')}
      <path class="f23-k-okl" d="M40 56 C46 40 42 24 32 16"/><path class="f23-k-okc" d="M28 14 L36 12 L33 20 Z"/></svg>`;
    const fetusCub = `<div class="f23-k-cub" aria-hidden="true">
      <div class="f23-k-cubS"><span>fetus</span><i><b style="width:10%"></b></i><em>akciğer yalnız %10</em></div>
      <div class="f23-k-cubS"><span>ilk soluktan sonra</span><i><b class="f23-k-cubC"></b></i><em>akciğer akımı ↑</em></div></div>`;
    // RDS kısır döngüsü (beş kutu; saat yönünde oklar)
    const dongu = (() => {
      const B = [[160, 28, ['HPV → PVR', 'yüksek']], [258, 76, ['alveol', 'perfüzyonu kötü']], [220, 142, ['pnömosit', 'ölümü']], [100, 142, ['hiyalen', 'membran']], [62, 76, ['difüzyon', 'bozulur']]];
      const bw = 100, bh = 34, C = [160, 86];
      const kes = (a, b) => { // a merkezinden b'ye: a kutusundan çıkış ve b kutusuna giriş noktaları
        const dx = b[0] - a[0], dy = b[1] - a[1];
        const t = (q) => Math.min(Math.abs((bw / 2 + 4) / (dx || 1e-9)), Math.abs((bh / 2 + 4) / (dy || 1e-9)));
        const ta = t(a), tb = t(b);
        return [[a[0] + dx * ta, a[1] + dy * ta], [b[0] - dx * tb, b[1] - dy * tb]];
      };
      let h = '';
      B.forEach((a, i) => {
        const b = B[(i + 1) % B.length];
        const [p, q] = kes(a, b), m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
        const vx = m[0] - C[0], vy = m[1] - C[1], L = Math.hypot(vx, vy) || 1, c = [m[0] + (vx / L) * 12, m[1] + (vy / L) * 12];
        h += `<path class="f23-k-dok" d="M${r1(p[0])} ${r1(p[1])} Q${r1(c[0])} ${r1(c[1])} ${r1(q[0])} ${r1(q[1])}" marker-end="url(#f23-k-ucu)"/>`;
      });
      B.forEach(([x, y, s]) => { h += `<rect class="f23-k-dk" x="${x - bw / 2}" y="${y - bh / 2}" width="${bw}" height="${bh}" rx="9"/>` + TS(x, y - 3, 'f23-k-dt', s, 'middle', 14); });
      h += T(160, 90, 'f23-k-dm', 'kısır döngü', 'middle') + T(52, 34, 'f23-k-dh', 'HPV ↑', 'end');
      return `<svg class="f23-k-dongu" viewBox="0 0 320 168" role="img" aria-label="Yenidoğan solunum sıkıntısı sendromunda kısır döngü: HPV ve yüksek PVR, kötü alveol perfüzyonu, pnömosit ölümü, hiyalen membran, bozulmuş difüzyon ve daha fazla HPV">
        <defs><marker id="f23-k-ucu" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="f23-k-ucu"/></marker></defs>${h}</svg>`;
    })();
    const kart = (n, bas, zincir, ek = '', yan = '') => `<button type="button" class="f23-k-kart${yan ? ' f23-k-yanli' : ''}" data-k="${n}" aria-pressed="false"><span class="f23-k-metin"><b>${bas}</b><span class="f23-k-zin">${zincir}</span>${ek}</span>${yan}</button>`;
    el.innerHTML = `<div class="f23-k-grid">
      <div class="f23-k-kol">
        <div class="f23-k-bas">${simBolge}<div><b>Bölgesel hipoksi</b><span>kan iyi ventile olan alana yönelir</span></div></div>
        ${kart(1, 'Pnömoni', 'hipoksik alveol yanındaki arteriyolün direnci ↑ → kan iyi ventile alveole → V̇/Q̇ uyumsuzluğu ↓')}
        ${kart(2, 'Tek akciğer anestezisi', 'kan ventile edilmeyen akciğerden ventile edilene → hipoksemi en aza iner')}
        ${kart(3, 'Kardiyojenik ödemde üst loblara yönelme', 'sol ventrikül yetmezliği → sol ventrikül diyastol sonu ve pulmoner venöz basınç ↑ → (West zonları) tabanda daha yüksek → bazal ödem → bazal alveoller hipoksik → kan apekslere', '', simOdem)}
      </div>
      <div class="f23-k-kol">
        <div class="f23-k-bas">${simYaygin}<div><b>Yaygın hipoksi</b><span>bütün akciğerde damarlar daralır, PVR yükselir</span></div></div>
        ${kart(4, 'Fetus ve ilk soluk', 'PAO₂ = 0 → yaygın HPV → PVR yüksek → fetal kalp debisinin yalnız %10\'u akciğerden, kan duktus arteriyozusa yönelir · ilk soluk: O₂ girer → PVR çarpıcı düşer → akciğer akımı ↑', fetusCub)}
        ${kart(5, 'Yenidoğanın solunum sıkıntısı sendromu: kısır döngü', 'sürfaktan yok → yüzey gerilimi ↑ → yaygın atelektazi, ilk soluk çok güç', dongu)}
        ${kart(6, 'Yüksek irtifa', 'düşük barometrik basınç → bütün akciğerde alveoler hipoksi → yaygın vazo- ve venokonstriksiyon → venokonstriksiyon: yüksek irtifa pulmoner ödemi (Bölüm 87)')}
        ${kart(7, 'Kronik hipoksemi (pulmoner fibrozis, KOAH)', 'arteriyel hipoksemi → yaygın HPV → pulmoner arteriyel hipertansiyon → sağ ventrikül yetmezliği (kor pulmonale)', '<span class="f23-k-not">HPV\'nin bir bölümü arteriyel hipoksemiye yanıttır</span>')}
      </div></div>
      <button type="button" class="f23-k-kart f23-k-serit" data-k="8" aria-pressed="false"><b>HPV'yi değiştirenler</b>
        <span class="f23-k-grup"><span class="f23-k-gad">Güçlendirir ↑</span><span class="f23-k-cip f23-k-cipG">asidoz</span><span class="f23-k-cip f23-k-cipG">hiperkapni</span></span>
        <span class="f23-k-grup"><span class="f23-k-gad">Azaltır ↓</span><span class="f23-k-cip f23-k-cipA">alkaloz</span><span class="f23-k-cip f23-k-cipA">hipokapni</span><span class="f23-k-cip f23-k-cipA">vazodilatatörler (nitratlar, sodyum nitroprussid, NO)</span><span class="f23-k-cip f23-k-cipA">bronkodilatatörler</span><span class="f23-k-cip f23-k-cipA">volatil anestezikler <small>belirgin &gt; 1 MAC</small></span></span>
        <span class="f23-k-grup"><span class="f23-k-gad">Etkisi az ya da yok</span><span class="f23-k-cip">N₂O (az)</span><span class="f23-k-cip">intravenöz ajanlar (yok)</span></span>
      </button>`;
    let sec = 0;
    const kartlar = [...el.querySelectorAll('.f23-k-kart')];
    const uygula = () => {
      kartlar.forEach((k) => { const on = +k.dataset.k === sec; k.classList.toggle('on', on); k.setAttribute('aria-pressed', String(on)); });
      capY(sec ? CAP[sec] : ILK);
    };
    const coz = secimBagla(el, '.f23-k-kart', (k) => { const n = +k.dataset.k; sec = sec === n ? 0 : n; uygula(); });
    const izle = esikIzle(el, 760, (g) => el.classList.toggle('f23-k-genis', g));
    const izle2 = genislikIzle(el, () => el.classList.toggle('f23-dar', darMi(el)));
    el.classList.toggle('f23-dar', darMi(el));
    return () => { coz(); izle(); izle2(); };
  };
})();
