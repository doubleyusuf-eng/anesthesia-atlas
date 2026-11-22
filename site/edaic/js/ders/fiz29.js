/* Fizyoloji Bölüm 29 · Kalp debisi ve ölçümü · bileşenler (K1 s. 121–130). Tarif: docs/tasarim/fiz29.md
   1 f29_belirleyen  CO = SV × HR; ön yük, kontraktilite, ard yük (K1 s. 121)
   2 f29_hiz         kalp hızı: siklus, otonom ayar, CO–HR eğrisi (K1 s. 122–123)
   3 f29_artyuk      ani ard yük artışı: vuru vuru SV, Anrep etkisi (K1 s. 121–123)
   4 f29_bowditch    Bowditch etkisi: Na⁺ ve Ca²⁺ birikimi, digoksin (K1 s. 123)
   5 f29_map         CI, SVI ve MAP ≈ CO × SVR (K1 s. 123)
   6 f29_as          aort darlığı: kompansasyon, bedel, sabit debi (K1 s. 123–124)
   7 f29_yontem      ölçüm yöntemleri haritası (K1 s. 124–129)
   8 f29_fick        doğrudan Fick (K1 s. 124–125)
   9 f29_dilusyon    indikatör ve termodilüsyon eğrileri (K1 s. 125–126)
  10 f29_kontur      nabız konturu, SVV (K1 s. 127–128)
  11 f29_doppler     özofageal Doppler ve TÖE (K1 s. 128–129)
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
    let s = (Math.round(v * m + (v >= 0 ? 1e-9 : -1e-9)) / m).toFixed(d);
    if (/^-0(\.0+)?$/.test(s)) s = s.slice(1);
    return s.replace('.', ',').replace('-', '−');
  };
  const n0 = (v) => fmt(v, 0);
  const capY = (el) => {
    const v = el.closest('.viz'), cap = v && v.querySelector('.viz-cap');
    const ilk = cap ? cap.innerHTML : '';
    let son = null;
    return (h) => { const html = h == null ? ilk : REF(h); if (cap && html !== son) { cap.innerHTML = html; son = html; } };
  };
  const darMi = (el) => (el.clientWidth || 700) < DAR;
  const izle = (el, cb) => {
    let son = darMi(el);
    el.classList.toggle('f29-dar', son);
    if (!('ResizeObserver' in window)) return () => {};
    const ro = new ResizeObserver(() => { const d = darMi(el); if (d !== son) { son = d; el.classList.toggle('f29-dar', d); cb(); } });
    ro.observe(el);
    return () => ro.disconnect();
  };
  const T = (x, y, s, cls = 'f29-t', a = '', ek = '') => `<text x="${r1(x)}" y="${r1(y)}" class="${cls}"${a ? ` text-anchor="${a}"` : ''}${ek}>${s}</text>`;
  const Ln = (x1, y1, x2, y2, st, ek = '') => `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" style="${st}"${ek}/>`;
  const Rc = (x, y, w, h, st, ek = '') => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(Math.max(0, w))}" height="${r1(Math.max(0, h))}" style="${st}"${ek}/>`;
  const Ci = (x, y, r, st, ek = '') => `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" style="${st}"${ek}/>`;
  const svgAc = (W, H, ic, etiket = '', ek = '') => `<svg class="f29-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${etiket}"${ek}>${ic}</svg>`;
  const sl = (k, ad, min, max, step, val, ek = '') => `<label class="f29-sl"><span><span>${ad}</span><b data-o="${k}"></b></span><input type="range" data-k="${k}" min="${min}" max="${max}" step="${step}" value="${val}"${ek}></label>`;
  const dugmeler = (liste, key) => liste.map(([v, l]) => `<button type="button" class="btn ghost" data-${key}="${v}" aria-pressed="false">${l}</button>`).join('');
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const sar = (s, n) => {
    const out = [];
    String(s).split('|').forEach((par) => {
      let cur = '';
      par.trim().split(/\s+/).forEach((w) => { if (!cur) cur = w; else if ((cur + ' ' + w).length <= n) cur += ' ' + w; else { out.push(cur); cur = w; } });
      if (cur) out.push(cur);
    });
    return out;
  };
  const cokSatir = (x, y, s, n, lh, cls = 'f29-s', a = '') => `<text class="${cls}"${a ? ` text-anchor="${a}"` : ''}>${sar(s, n).map((l, i) => `<tspan x="${r1(x)}" y="${r1(y + i * lh)}">${l}</tspan>`).join('')}</text>`;
  const ok = (x1, y1, x2, y2, renk, w = 2, bas = 7) => {
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), s = Math.sin(a);
    const bx = x2 - c * bas, by = y2 - s * bas;
    return `${Ln(x1, y1, bx, by, `stroke:${renk};stroke-width:${w}`)}<path d="M${r1(x2)},${r1(y2)} L${r1(bx - s * bas * 0.55)},${r1(by + c * bas * 0.55)} L${r1(bx + s * bas * 0.55)},${r1(by - c * bas * 0.55)}Z" style="fill:${renk}"/>`;
  };
  const yolD = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + r1(p[0]) + ',' + r1(p[1])).join(' ');
  /* monoton kübik (PCHIP) ara değer */
  const pchip = (xs, ys) => {
    const n = xs.length, h = [], d = [], m = new Array(n);
    for (let i = 0; i < n - 1; i++) { h[i] = xs[i + 1] - xs[i]; d[i] = (ys[i + 1] - ys[i]) / h[i]; }
    m[0] = d[0]; m[n - 1] = d[n - 2];
    for (let i = 1; i < n - 1; i++) {
      if (d[i - 1] * d[i] <= 0) m[i] = 0;
      else { const w1 = 2 * h[i] + h[i - 1], w2 = h[i] + 2 * h[i - 1]; m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]); }
    }
    return (x) => {
      if (x <= xs[0]) return ys[0];
      if (x >= xs[n - 1]) return ys[n - 1];
      let i = 0; while (x > xs[i + 1]) i++;
      const t = (x - xs[i]) / h[i], t2 = t * t, t3 = t2 * t;
      return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h[i] * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h[i] * m[i + 1];
    };
  };
  const tohum = (s) => () => { s |= 0; s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const kalpYolu = (cx, cy, k) => {
    const p = [[0, 30], [-40, 5], [-48, -28], [-24, -38], [-10, -44], [0, -34], [0, -24], [0, -34], [10, -44], [24, -38], [48, -28], [40, 5], [0, 30]].map(([x, y]) => [cx + x * k, cy + y * k]);
    const f = (q) => `${r1(q[0])},${r1(q[1])}`;
    return `M${f(p[0])} C${f(p[1])} ${f(p[2])} ${f(p[3])} C${f(p[4])} ${f(p[5])} ${f(p[6])} C${f(p[7])} ${f(p[8])} ${f(p[9])} C${f(p[10])} ${f(p[11])} ${f(p[12])}Z`;
  };
  const MUTED = 'var(--muted)', LINE = 'var(--line)', INK = 'var(--ink)';

  /* =====================================================================
     1 · Kalp debisini kuran çarpanlar
     ===================================================================== */
  VIZ.f29_belirleyen = (el) => {
    const cap = capY(el);
    const S = { sv: 70, hr: 75, sec: -1 };
    const TL = [
      { ad: 'Ön yük', alt: 'diyastol sonu gerilme', is: '↑ → SV ↑', ar: true, vt: 'Vekil ölçümler', vek: ['LVEDV (eko)', 'LVEDP (daha sık)', 'CVP (sağ)', 'PCWP (sol)'],
        cap: '<b>Ön yük.</b> Ventrikülü diyastol sonu boyutlarına geren intraluminal basınç; Starling yasasıyla ön yük artınca SV artar. Vekilleri: LVEDV (eko), daha sık LVEDP; sağda CVP, solda PCWP. [[K1 s. 121]]' },
      { ad: 'Kontraktilite', alt: 'intrinsik kasılma gücü', is: '↑ → SV ↑', ar: true, vt: 'İndeks', vek: ['dP/dt (izovolümetrik kasılma)', 'pozitif inotrop ↑', 'negatif inotrop ↓'],
        cap: '<b>Kontraktilite.</b> Belli bir ön yük ve ard yükte miyositin mekanik güç üretme yeteneği; artıranlar pozitif, azaltanlar negatif inotropik. İndeksi: izovolümetrik kasılmada basınç artış hızı (dP/dt). [[K1 s. 121]]' },
      { ad: 'Ard yük', alt: 'ejeksiyona karşı duvar gerilimi', is: '↑ → SV ↓', ar: false, vt: 'Vekil ölçümler', vek: ['MAP (sol)', 'SVR (sol)', 'PVR (sağ)'],
        cap: '<b>Ard yük.</b> Ejeksiyonda sol ventrikül duvarında gelişen gerilim; arttıkça sarkomer kısalmasının hızı ve miktarı, dolayısıyla SV azalır. Vekilleri: solda MAP ve SVR, sağda PVR. [[K1 s. 121]]' },
    ];
    el.innerHTML = `<div class="f29-sls">${sl('sv', 'Atım hacmi (SV)', 30, 120, 5, 70)}${sl('hr', 'Kalp hızı (HR)', 40, 190, 5, 75)}</div><div class="f29-fig"></div><div class="f29-panel" aria-live="polite"></div>`;
    const fig = el.querySelector('.f29-fig'), pan = el.querySelector('.f29-panel');
    const kutu = (x, y, w, h, renk, ust, deger, fsD) => `${Rc(x, y, w, h, `fill:var(--paper);stroke:${renk};stroke-width:3`, ' rx="12"')}${T(x + w / 2, y + 24, ust, 'f29-s', 'middle')}${T(x + w / 2, y + h - 18, deger, 'f29-big', 'middle', ` style="font-size:${fsD}px"`)}`;
    const tile = (i, x, y, w, h, fsA, fsS, n) => {
      const t = TL[i], on = S.sec === i;
      const satir = sar(t.alt, n);
      return `<g class="f29-tile" data-t="${i}" tabindex="0" role="button" aria-pressed="${on}" aria-label="${t.ad}">${Rc(x, y, w, h, `fill:${on ? 'var(--c-basic-soft)' : 'var(--paper)'};stroke:${on ? 'var(--c-basic)' : LINE};stroke-width:${on ? 3 : 1.5}`, ' rx="12"')}
        ${T(x + w / 2, y + 26, t.ad, 'f29-tb', 'middle', ` style="font-size:${fsA}px"`)}
        ${satir.map((l, k) => T(x + w / 2, y + 48 + k * (fsS + 3), l, 'f29-s', 'middle', ` style="font-size:${fsS}px"`)).join('')}
        ${T(x + w / 2, y + h - 12, t.is, 'f29-n', 'middle', ` style="fill:${t.ar ? 'var(--ok)' : 'var(--crit)'}"`)}</g>`;
    };
    const ciz = () => {
      const co = (S.sv * S.hr) / 1000, dar = darMi(el);
      let s = '';
      if (!dar) {
        s += kutu(30, 14, 200, 82, 'var(--c-basic)', 'Atım hacmi (SV)', `${S.sv} mL`, 24) + T(265, 64, '×', 'f29-big', 'middle')
          + kutu(300, 14, 200, 82, 'var(--accent)', 'Kalp hızı (HR)', `${S.hr} /dk`, 24) + T(535, 64, '=', 'f29-big', 'middle')
          + kutu(570, 14, 170, 82, 'var(--ok)', 'Kalp debisi (CO)', `${fmt(co, 2)} L/dk`, 24);
        // ağaç
        s += Ln(130, 96, 130, 126, `stroke:var(--c-basic);stroke-width:2`) + Ln(90, 126, 394, 126, `stroke:var(--c-basic);stroke-width:2`);
        [90, 242, 394].forEach((x) => { s += Ln(x, 126, x, 142, 'stroke:var(--c-basic);stroke-width:2'); });
        s += tile(0, 20, 142, 140, 112, 15, 13, 17) + tile(1, 172, 142, 140, 112, 15, 13, 17) + tile(2, 324, 142, 140, 112, 15, 13, 17);
        s += T(242, 278, 'SV\'nin üç belirleyicisi: dokunun', 'f29-s', 'middle');
        // CO ölçeği (dikey)
        const x = 540, yb = 270, yt = 140, Y = (v) => yb - ((yb - yt) * v) / 40;
        s += T(x - 10, 116, 'CO ölçeği (L/dk)', 'f29-s');
        s += Rc(x, yt, 16, yb - yt, `fill:var(--chip);stroke:${LINE}`, ' rx="4"') + Rc(x, Y(co), 16, yb - Y(co), 'fill:var(--ok)', ' rx="4"');
        [[0, '0'], [5.25, '5,25 istirahat'], [26, '≈ 26 maks. egzersiz (5 kat)'], [40, '40 seçkin sporcu']].forEach(([v, l]) => {
          s += Ln(x - 4, Y(v), x + 22, Y(v), `stroke:${INK};stroke-width:1.5`) + T(x + 28, Y(v) + 4.5, l, v === 0 ? 'f29-ax' : 'f29-s');
        });
        fig.innerHTML = svgAc(760, 290, s, 'SV çarpı HR eşittir CO; SV\'nin üç belirleyicisi');
      } else {
        s += kutu(2, 8, 106, 74, 'var(--c-basic)', 'SV', `${S.sv} mL`, 18) + T(118, 54, '×', 'f29-tb', 'middle')
          + kutu(128, 8, 104, 74, 'var(--accent)', 'HR', `${S.hr} /dk`, 18) + T(242, 54, '=', 'f29-tb', 'middle')
          + kutu(252, 8, 106, 74, 'var(--ok)', 'CO', `${fmt(co, 2)}`, 19) + T(305, 77, 'L/dk', 'f29-ax', 'middle');
        s += Ln(55, 82, 55, 100, 'stroke:var(--c-basic);stroke-width:2') + Ln(60, 100, 300, 100, 'stroke:var(--c-basic);stroke-width:2') + Ln(55, 100, 60, 100, 'stroke:var(--c-basic);stroke-width:2');
        [60, 180, 300].forEach((x) => { s += Ln(x, 100, x, 112, 'stroke:var(--c-basic);stroke-width:2'); });
        s += tile(0, 4, 112, 112, 116, 14, 12.5, 14) + tile(1, 124, 112, 112, 116, 14, 12.5, 14) + tile(2, 244, 112, 112, 116, 14, 12.5, 14);
        const x0 = 10, x1 = 350, y = 262, X = (v) => x0 + ((x1 - x0) * v) / 40;
        s += T(x0, 252, 'CO ölçeği (L/dk)', 'f29-s');
        s += Rc(x0, y, x1 - x0, 12, `fill:var(--chip);stroke:${LINE}`, ' rx="4"') + Rc(x0, y, X(co) - x0, 12, 'fill:var(--ok)', ' rx="4"');
        [[5.25, '5,25 istirahat', 290, 'start'], [26, '≈ 26 maks. egzersiz', 308, 'middle'], [40, '40 sporcu', 290, 'end']].forEach(([v, l, ly, a]) => {
          s += Ln(X(v), y - 3, X(v), y + 16, `stroke:${INK};stroke-width:1.5`) + T(a === 'start' ? X(v) - 4 : a === 'end' ? X(v) : X(v), ly, l, 'f29-s', a);
        });
        fig.innerHTML = svgAc(360, 318, s, 'SV çarpı HR eşittir CO; SV\'nin üç belirleyicisi');
      }
      el.querySelector('[data-o="sv"]').textContent = `${S.sv} mL`;
      el.querySelector('[data-o="hr"]').textContent = `${S.hr} /dk`;
      if (S.sec < 0) pan.innerHTML = 'Bir belirleyiciye dokunun: tanımı ve klinikte yerine kullanılan ölçüm burada görünür.';
      else { const t = TL[S.sec]; pan.innerHTML = `<b>${t.ad}</b> · ${t.alt}. <span class="f29-s">${t.vt}:</span> ${t.vek.map((v) => `<span class="f29-chip">${v}</span>`).join('')}`; }
    };
    el.addEventListener('input', (e) => {
      const k = e.target.dataset && e.target.dataset.k; if (!k) return;
      S[k] = +e.target.value; ciz();
      cap(`<b>SV ${S.sv} mL × HR ${S.hr}/dk = CO ${fmt((S.sv * S.hr) / 1000, 2)} L/dk.</b> İstirahat değeri 70 mL × 75/dk = 5,25 L/dk; maksimal egzersizde CO beş katına çıkabilir. [[K1 s. 121]]`);
    });
    const sec = (i) => { S.sec = i; ciz(); cap(TL[i].cap); const g = fig.querySelector(`[data-t="${i}"]`); if (g) g.focus({ preventScroll: true }); };
    el.addEventListener('click', (e) => { const g = e.target.closest('.f29-tile'); if (g) sec(+g.dataset.t); });
    el.addEventListener('keydown', (e) => { const g = e.target.closest && e.target.closest('.f29-tile'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sec(+g.dataset.t); } });
    const dW = izle(el, ciz);
    ciz();
    return () => dW();
  };

  /* =====================================================================
     2 · Hız arttıkça diyastol kısalır
     ===================================================================== */
  VIZ.f29_hiz = (el) => {
    const cap = capY(el);
    const COf = pchip([40, 60, 75, 100, 120, 140, 150, 165, 180, 200], [3.4, 4.4, 5.25, 6.6, 7.4, 7.8, 7.6, 6.8, 5.6, 4.0]);
    const S = { hr: 70 };
    const mdl = (hr) => { const T0 = 60 / hr, ts = 0.30 - 0.0006 * (hr - 75), td = T0 - ts, co = COf(hr); return { T0, ts, td, co, sv: (co * 1000) / hr }; };
    const durum = (hr) => (hr < 58 ? 0 : hr < 98 ? 1 : hr <= 122 ? 2 : hr < 148 ? 3 : 4);
    const CAP = [
      (h) => `<b>Bradikardi, ${h}/dk.</b> Diyastol uzun ama vuru sayısı az: CO düşer. [[K1 s. 122]]`,
      (h) => `<b>İstirahat, ${h}/dk.</b> Vagus uçlarından sürekli salınan asetilkolin, M2 reseptörleriyle sinüs düğümünü 100–120'den 60–70/dk'ya yavaşlatır; kalpte tonik etkin olan parasempatik koldur. [[K1 s. 122]]`,
      (h) => `<b>Denerve kalp, ${h}/dk.</b> Otonom etki yokken SA düğümün bazal hızı 100–120/dk'dır. [[K1 s. 122]]`,
      (h) => `<b>Egzersiz, ${h}/dk.</b> Vagal tonus çekilir; sempatik uçlardan noradrenalin, adrenal medulladan adrenalin β1 reseptörleriyle hızı artırır. Yaklaşık 140/dk'ya kadar CO artar. [[K1 s. 122]]`,
      (h) => `<b>Taşikardi, ${h}/dk.</b> Diyastolik dolum süresi ~0,15 s'ye ve altına iner; ventrikül yalnız diyastolde dolabildiği için SV ve CO düşer. Ventriküler taşikardide bu iskemi yapabilir, kontraktilite daha da düşer: kısır döngü. [[K1 s. 122]]`,
    ];
    el.innerHTML = `<div class="f29-sls">${sl('hr', 'Kalp hızı', 40, 200, 5, 70)}</div><div class="f29-ctl f29-seg">${dugmeler([[70, 'İstirahat 70'], [110, 'Denerve 110'], [140, 'Egzersiz 140'], [180, 'Taşikardi 180']], 'hz')}</div><div class="f29-fig"></div><p class="f29-oku" aria-live="off"></p>`;
    const fig = el.querySelector('.f29-fig'), oku = el.querySelector('.f29-oku'), inp = el.querySelector('input');
    let L = null, tc = 0, off = 0, imlec = null, sinirler = [];
    const ciz = () => {
      const m = mdl(S.hr), dar = darMi(el), d = durum(S.hr);
      L = dar ? { W: 360, H: 580, bx0: 10, bx1: 350, by: 30, bh: 34, gx0: 50, gx1: 345, gy0: 350, gy1: 148, ay: 395, hk: 1.05 }
        : { W: 760, H: 350, bx0: 20, bx1: 360, by: 34, bh: 36, gx0: 450, gx1: 735, gy0: 300, gy1: 34, ay: 120, hk: 1.35 };
      let s = '';
      // siklus çubuğu
      const bw = L.bx1 - L.bx0, kritik = m.td < 0.15;
      s += T(L.bx0, L.by - 10, 'Bir saniyelik pencere: art arda sikluslar', 'f29-s');
      for (let t = 0; t < 1 - 1e-6; t += m.T0) {
        const a = L.bx0 + t * bw, b = L.bx0 + Math.min(1, t + m.ts) * bw, c = L.bx0 + Math.min(1, t + m.T0) * bw;
        s += Rc(a, L.by, b - a, L.bh, `fill:var(--accent-soft);stroke:var(--accent);stroke-width:1`);
        if (c > b) s += Rc(b, L.by, c - b, L.bh, `fill:var(--chip);stroke:${kritik ? 'var(--crit)' : LINE};stroke-width:${kritik ? 2.5 : 1}`);
      }
      [0, 0.5, 1].forEach((v) => { s += Ln(L.bx0 + v * bw, L.by + L.bh, L.bx0 + v * bw, L.by + L.bh + 6, `stroke:${MUTED}`) + T(L.bx0 + v * bw, L.by + L.bh + 20, v === 1 ? '1,0 s' : fmt(v, 1), 'f29-ax', v === 0 ? 'start' : v === 1 ? 'end' : 'middle'); });
      const ly = L.by + L.bh + 42;
      const sisL = `sistol ${fmt(m.ts, 2)} s`, diL = kritik ? `diyastol ${fmt(m.td, 2)} s: dolum yetmiyor` : `diyastol ${fmt(m.td, 2)} s`;
      s += Rc(L.bx0, ly - 11, 13, 13, 'fill:var(--accent-soft);stroke:var(--accent)') + T(L.bx0 + 19, ly, sisL, 'f29-t');
      if (dar) s += Rc(L.bx0, ly + 9, 13, 13, `fill:var(--chip);stroke:${kritik ? 'var(--crit)' : MUTED}`) + T(L.bx0 + 19, ly + 20, diL, 'f29-t', '', kritik ? ' style="fill:var(--crit)"' : '');
      else s += Rc(L.bx0 + 130, ly - 11, 13, 13, `fill:var(--chip);stroke:${kritik ? 'var(--crit)' : MUTED}`) + T(L.bx0 + 149, ly, diL, 'f29-t', '', kritik ? ' style="fill:var(--crit)"' : '');
      s += `<line class="f29-iml" x1="${L.bx0}" x2="${L.bx0}" y1="${L.by - 4}" y2="${L.by + L.bh + 4}" style="stroke:var(--ink);stroke-width:2.5;${RM ? 'display:none' : ''}"/>`;
      // CO–HR grafiği
      const X = (h) => L.gx0 + ((L.gx1 - L.gx0) * (h - 40)) / 160, Y = (c) => L.gy0 - ((L.gy0 - L.gy1) * c) / 9;
      s += Rc(X(100), L.gy1, X(120) - X(100), L.gy0 - L.gy1, 'fill:var(--chip)') + Rc(X(150), L.gy1, X(200) - X(150), L.gy0 - L.gy1, 'fill:var(--crit);opacity:.1');
      s += `<text class="f29-s" transform="translate(${r1(X(110) + 4.5)},${r1(L.gy0 - 8)}) rotate(-90)">denerve kalp</text>`;
      s += cokSatir((X(150) + X(200)) / 2, L.gy1 + 16, 'diyastol çok kısa', 10, 15, 'f29-s', 'middle');
      [0, 3, 6, 9].forEach((c) => { s += Ln(L.gx0, Y(c), L.gx1, Y(c), `stroke:${LINE}`) + T(L.gx0 - 6, Y(c) + 4, c, 'f29-ax', 'end'); });
      [60, 100, 140, 180].forEach((h) => { s += Ln(X(h), L.gy0, X(h), L.gy0 + 5, `stroke:${MUTED}`) + T(X(h), L.gy0 + 19, h, 'f29-ax', 'middle'); });
      s += Ln(L.gx0, L.gy0, L.gx1, L.gy0, `stroke:${MUTED};stroke-width:1.4`) + Ln(L.gx0, L.gy0, L.gx0, L.gy1, `stroke:${MUTED};stroke-width:1.4`);
      s += T((L.gx0 + L.gx1) / 2, L.gy0 + 38, 'Kalp hızı (/dk)', 'f29-s', 'middle') + T(L.gx0 - 6, L.gy1 - 10, 'CO (L/dk)', 'f29-s', dar ? 'start' : 'end');
      const pts = []; for (let h = 40; h <= 200; h += 2) pts.push([X(h), Y(COf(h))]);
      s += `<path d="${yolD(pts)}" style="fill:none;stroke:var(--ok);stroke-width:3"/>`;
      s += T(X(140), Y(7.8) - 12, '≈ 140: tepe', 'f29-s f29-hale', 'middle');
      s += Ln(X(S.hr), L.gy0, X(S.hr), Y(m.co), `stroke:${INK};stroke-width:1.2;stroke-dasharray:4 4`) + Ci(X(S.hr), Y(m.co), 7, `fill:var(--ok);stroke:var(--paper);stroke-width:2.5`);
      // otonom şema
      const hx = dar ? 180 : 190, hy = dar ? L.ay + 92 : 248, k = L.hk;
      const sax = hx + 16 * k, say = hy - 30 * k;
      const vagOn = d <= 1, simOn = d >= 3, adrOn = d >= 3;
      const kol = (dd, renk, on) => `<path class="f29-sinir" d="${dd}" style="fill:none;stroke:${renk};stroke-width:${on ? 4.5 : 2};opacity:${on ? 1 : 0.25};stroke-linecap:round;${on && !RM ? 'stroke-dasharray:3 9' : ''}" data-on="${on ? 1 : 0}"/>`;
      if (dar) {
        s += T(10, L.ay, 'Vagus · ACh · M2', 'f29-t', '', ' style="fill:var(--c-basic)"') + T(350, L.ay, 'Sempatik · NA · β1', 'f29-t', 'end', ' style="fill:var(--warn)"');
        s += kol(`M30,${L.ay + 10} C40,${L.ay + 60} ${sax - 90},${say - 30} ${sax},${say}`, 'var(--c-basic)', vagOn);
        s += kol(`M330,${L.ay + 10} C320,${L.ay + 50} ${sax + 70},${say - 40} ${sax},${say}`, 'var(--warn)', simOn);
        s += kol(`M330,${L.ay + 165} C300,${L.ay + 150} ${hx + 70},${hy + 20} ${hx + 38 * k},${hy}`, 'var(--warn)', adrOn);
        s += T(350, L.ay + 182, 'Adrenal medulla · adrenalin', 'f29-t', 'end', ' style="fill:var(--warn)"');
      } else {
        s += T(20, 140, 'Vagus · ACh · M2', 'f29-t', '', ' style="fill:var(--c-basic)"') + T(360, 140, 'Sempatik · noradrenalin · β1', 'f29-t', 'end', ' style="fill:var(--warn)"');
        s += kol(`M40,150 C50,200 ${sax - 110},${say - 40} ${sax},${say}`, 'var(--c-basic)', vagOn);
        s += kol(`M340,150 C330,190 ${sax + 80},${say - 50} ${sax},${say}`, 'var(--warn)', simOn);
        s += kol(`M340,318 C300,300 ${hx + 80},${hy + 20} ${hx + 38 * k},${hy}`, 'var(--warn)', adrOn);
        s += T(360, 338, 'Adrenal medulla · adrenalin (kan yoluyla)', 'f29-t', 'end', ' style="fill:var(--warn)"');
      }
      s += `<path d="${kalpYolu(hx, hy, k)}" style="fill:var(--crit-soft);stroke:var(--crit);stroke-width:2"/>`;
      if (S.hr >= 170) s += `<ellipse cx="${r1(hx - 6 * k)}" cy="${r1(hy + 6 * k)}" rx="${r1(13 * k)}" ry="${r1(10 * k)}" style="fill:var(--crit);opacity:.55"/>` + T(hx - 6 * k, hy + 6 * k + 4, 'iskemi', 'f29-s f29-hale', 'middle', ' style="fill:var(--ink)"');
      s += Ci(sax, say, 6.5, 'fill:var(--accent);stroke:var(--paper);stroke-width:2') + T(sax + 10, say - 10, 'SA düğümü', 'f29-s f29-hale');
      s += T(hx, hy + 46 * k + 4, d === 2 ? 'otonom etki yok' : d >= 3 ? 'vagal çekilme + β1' : 'tonik vagus', 'f29-s', 'middle');
      fig.innerHTML = svgAc(L.W, L.H, s, 'Siklus çubuğu, CO–kalp hızı eğrisi ve otonom kollar');
      imlec = fig.querySelector('.f29-iml'); sinirler = [...fig.querySelectorAll('.f29-sinir[data-on="1"]')];
      el.querySelector('[data-o="hr"]').textContent = `${S.hr} /dk`;
      oku.textContent = `HR ${S.hr}/dk · siklus ${fmt(m.T0, 2)} s · sistol ${fmt(m.ts, 2)} s · diyastol ${fmt(m.td, 2)} s · SV ${n0(m.sv)} mL · CO ${fmt(m.co, 1)} L/dk`;
      basSec(el, 'hz', S.hr);
    };
    const ayarla = (h, yaz) => { S.hr = h; inp.value = h; ciz(); if (yaz) cap(CAP[durum(h)](h)); };
    el.addEventListener('input', (e) => { if (e.target === inp) ayarla(+inp.value, true); });
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-hz]'); if (b) ayarla(+b.dataset.hz, true); });
    const dur = RM ? () => {} : ticker(el, (dt) => {
      tc = (tc + dt * 0.5) % 1; off -= dt * 24;
      if (imlec && L) { const x = r1(L.bx0 + tc * (L.bx1 - L.bx0)); imlec.setAttribute('x1', x); imlec.setAttribute('x2', x); }
      sinirler.forEach((p) => { p.style.strokeDashoffset = r1(off); });
    });
    const dW = izle(el, ciz);
    ciz();
    return () => { dur(); dW(); };
  };

  /* =====================================================================
     3 · Ard yük aniden artınca: vuru vuru SV
     ===================================================================== */
  VIZ.f29_artyuk = (el) => {
    const cap = capY(el);
    const TB = {
      k: [[120, 70, 50], [120, 50, 70], [140, 62, 78], [148, 68, 80], [150, 70, 80], [150, 70, 80]],
      a: [[120, 70, 50], [120, 58, 62], [132, 66, 66], [136, 70, 66], [136, 70, 66], [136, 70, 66]],
    };
    const S = { b: 0, anrep: false, t: 9 };
    const ANR = ' <b>Anrep etkisi.</b> Ard yük artışı inotropiyi kendiliğinden artırır: SV, yalnız Frank–Starling mekanizmasından beklenenden daha az düşer ve daha küçük bir hacim artışıyla toparlanır. [[K1 s. 123]]';
    const capYaz = () => {
      const r = TB[S.anrep ? 'a' : 'k'][S.b];
      const h = S.b === 0 ? '<b>1 · Başlangıç.</b> Ventrikül her diyastolde aynı hacme dolar ve 70 mL atar. "Ard yükü artır" düğmesine basın ve vuruları izleyin. [[K1 s. 121–123]]'
        : S.b === 1 ? `<b>2 · Ard yük artar.</b> Sarkomer kısalmasının hızı ve miktarı azalır: bu vuruda daha az kan atılır, SV ${r[1]} mL'ye düşer, ventrikülde daha çok kan kalır. [[K1 s. 121–122]]`
          : S.b === 2 ? `<b>3 · Kalan kan + dolum.</b> Sistol sonunda kalan fazla kan, aynı venöz dönüşle birleşince LVEDV büyür (${r[0]} mL). [[K1 s. 122–123]]`
            : '<b>4 · Starling yasası.</b> Daha büyük LVEDV daha güçlü kasılma ve daha büyük SV verir; SV birkaç vuruda 70 mL\'ye döner, ventrikül artık daha büyük hacimle çalışır. [[K1 s. 123]]';
      cap(h + (S.anrep && S.b > 0 ? ANR : ''));
    };
    el.innerHTML = `<div class="f29-ctl f29-seg"><button type="button" class="btn" data-a="art">Ard yükü artır</button><button type="button" class="btn ghost" data-a="ileri">Sonraki vuru ▶</button><button type="button" class="btn ghost" data-a="oyn">Oynat</button><button type="button" class="btn ghost" data-a="anrep" aria-pressed="false">Anrep etkisi</button><button type="button" class="btn ghost" data-a="sil">Sıfırla</button></div><div class="f29-fig"></div>`;
    const fig = el.querySelector('.f29-fig');
    let L = null, gV = null, gB = null, timers = [];
    const hacim = () => {
      const tb = TB[S.anrep ? 'a' : 'k'], r = tb[S.b];
      const sonra = r[2] + 70; // sonraki dolum
      if (S.b === 0 || S.t >= 0.8) return Math.min(sonra, S.b === 0 ? 120 : sonra);
      const prev = r[0];
      return S.t < 0.35 ? lerp(prev, r[2], ease(S.t / 0.35)) : lerp(r[2], sonra, ease((S.t - 0.35) / 0.45));
    };
    const ventrikul = (V) => {
      const { vx, vy, a0, a1 } = L, rx = a0 + a1 * V, ry = rx * 1.18, rxb = a0 + a1 * 120;
      const r = TB[S.anrep ? 'a' : 'k'][S.b];
      const ust = L.dar ? 4 : 20;
      return `${Rc(vx - 13, ust, 26, vy - ry - ust + L.wall, `fill:var(--crit-soft);stroke:${MUTED};stroke-width:1.3`)}<ellipse cx="${vx}" cy="${vy}" rx="${r1(rxb)}" ry="${r1(rxb * 1.18)}" style="fill:none;stroke:${MUTED};stroke-width:1.3;stroke-dasharray:5 4"/>
        <ellipse cx="${vx}" cy="${vy}" rx="${r1(rx)}" ry="${r1(ry)}" style="fill:var(--c-basic);fill-opacity:.4;stroke:var(--crit);stroke-opacity:.45;stroke-width:${L.wall}"/>
        ${T(vx, vy - 4, `EDV ${r[0]} mL`, 'f29-n f29-hale', 'middle')}${T(vx, vy + 16, `ESV ${r[2]} mL`, 'f29-n f29-hale', 'middle')}
        ${T(vx, vy + 36, `şimdi ${n0(V)} mL`, 'f29-ax f29-hale', 'middle')}`;
    };
    const cubuklar = () => {
      const { px0, px1, py0, py1 } = L, slot = (px1 - px0) / 6, Y = (v) => py0 - ((py0 - py1) * v) / 90;
      let s = '';
      for (let i = 0; i <= S.b; i++) {
        const f = i === S.b && S.b > 0 ? ease(clamp(S.t / 0.8, 0, 1)) : 1;
        const cx = px0 + slot * (i + 0.5), r = TB[S.anrep ? 'a' : 'k'][i];
        if (S.anrep) {
          const g = TB.k[i][1];
          s += Rc(cx - 22, Y(g * f), 18, py0 - Y(g * f), 'fill:var(--c-basic);opacity:.25');
          s += Rc(cx - 2, Y(r[1] * f), 22, py0 - Y(r[1] * f), 'fill:var(--c-basic)') + T(cx + 9, Y(r[1] * f) - 6, r[1], 'f29-n', 'middle');
        } else s += Rc(cx - 13, Y(r[1] * f), 26, py0 - Y(r[1] * f), 'fill:var(--c-basic)') + T(cx, Y(r[1] * f) - 6, r[1], 'f29-n', 'middle');
        s += T(cx, py0 + 34, r[0], 'f29-ax', 'middle');
      }
      return s;
    };
    const ciz = () => {
      const dar = darMi(el);
      L = dar ? { dar: true, W: 360, H: 470, vx: 180, vy: 118, a0: 30, a1: 0.3, wall: 8, px0: 44, px1: 352, py0: 410, py1: 270 }
        : { W: 760, H: 345, vx: 160, vy: 200, a0: 30, a1: 0.38, wall: 10, px0: 400, px1: 735, py0: 290, py1: 44 };
      const r = TB[S.anrep ? 'a' : 'k'][S.b], art = S.b > 0;
      let s = '';
      // aort ve ard yük
      const cy = dar ? 24 : 54;
      if (art) s += `<path d="M${L.vx - 26},${cy - 9} L${L.vx - 5},${cy} L${L.vx - 26},${cy + 9}Z M${L.vx + 26},${cy - 9} L${L.vx + 5},${cy} L${L.vx + 26},${cy + 9}Z" style="fill:var(--c-clin)"/>`;
      s += T(L.vx + 32, cy + 5, art ? 'ard yük ↑' : 'ard yük', art ? 'f29-tb' : 'f29-s', '', art ? ' style="fill:var(--c-clin)"' : '');
      s += T(L.vx - 32, cy + 5, 'aort', 'f29-s', 'end');
      // venöz dönüş
      if (dar) s += ok(16, L.vy - 40, L.vx - 64, L.vy - 14, 'var(--c-basic)', 2.5) + T(6, 24, S.b === 0 ? 'başlangıç' : `vuru ${S.b}`, 'f29-tb') + T(180, 226, 'venöz dönüş: her diyastolde +70 mL', 'f29-s', 'middle');
      else s += ok(20, L.vy - 80, L.vx - 88, L.vy - 40, 'var(--c-basic)', 2.5) + T(20, L.vy - 32, 'mitral', 'f29-s') + T(20, 30, S.b === 0 ? 'başlangıç' : `vuru ${S.b}`, 'f29-tb') + T(L.vx, 338, 'venöz dönüş: her diyastolde +70 mL', 'f29-s', 'middle');
      s += `<g class="f29-v">${ventrikul(hacim())}</g>`;
      // çubuk grafik
      const { px0, px1, py0, py1 } = L, slot = (px1 - px0) / 6, Y = (v) => py0 - ((py0 - py1) * v) / 90;
      [0, 30, 60, 90].forEach((v) => { s += Ln(px0, Y(v), px1, Y(v), `stroke:${LINE}`) + T(px0 - 6, Y(v) + 4, v, 'f29-ax', 'end'); });
      s += Ln(px0, Y(70), px1, Y(70), `stroke:${INK};stroke-width:1.4;stroke-dasharray:6 4`) + T(px1, py1 - 14, '- - - başlangıç SV 70 mL', 'f29-s', 'end');
      for (let i = 0; i < 6; i++) s += T(px0 + slot * (i + 0.5), py0 + 17, i, 'f29-ax', 'middle');
      s += T(px0 - 6, py0 + 34, 'EDV', 'f29-ax', 'end');
      s += T(px0 - 6, py1 - 14, 'SV (mL)', 'f29-s', dar ? 'start' : 'end') + T((px0 + px1) / 2, py0 + 52, 'vuru (0 = başlangıç)', 'f29-s', 'middle');
      if (S.anrep) s += Rc(px0 + 4, py1 - 30, 12, 12, 'fill:var(--c-basic);opacity:.25') + T(px0 + 22, py1 - 20, 'Anrep kapalıyken', 'f29-ax');
      s += `<g class="f29-b">${cubuklar()}</g>`;
      fig.innerHTML = svgAc(L.W, L.H, s, 'Ventrikül hacmi ve vuru vuru atım hacmi');
      gV = fig.querySelector('.f29-v'); gB = fig.querySelector('.f29-b');
      el.querySelector('[data-a="anrep"]').setAttribute('aria-pressed', String(S.anrep));
      el.querySelector('[data-a="ileri"]').disabled = S.b >= 5;
      el.querySelector('[data-a="art"]').disabled = S.b > 0;
    };
    const vur = (b) => { S.b = b; S.t = RM ? 9 : 0; ciz(); capYaz(); };
    const temizle = () => { timers.forEach(clearTimeout); timers = []; };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-a]'); if (!b) return;
      const a = b.dataset.a;
      if (a === 'art') { temizle(); vur(1); }
      else if (a === 'ileri') { temizle(); if (S.b < 5) vur(S.b + 1); }
      else if (a === 'oyn') { temizle(); vur(0); for (let i = 1; i <= 5; i++) timers.push(setTimeout(() => vur(i), RM ? 0 : i * 1200)); }
      else if (a === 'anrep') { S.anrep = !S.anrep; S.t = 9; ciz(); capYaz(); }
      else if (a === 'sil') { temizle(); vur(0); }
    });
    const dur = RM ? () => {} : ticker(el, (dt) => {
      if (S.t >= 0.8 || !gV) return;
      S.t += dt; gV.innerHTML = ventrikul(hacim()); gB.innerHTML = cubuklar();
    });
    const dW = izle(el, ciz);
    if (RM) { S.b = 5; ciz(); capYaz(); } else ciz();
    return () => { dur(); dW(); temizle(); };
  };

  /* =====================================================================
     4 · Bowditch etkisi, adım adım
     ===================================================================== */
  VIZ.f29_bowditch = (el) => {
    const cap = capY(el);
    const ADIM = [
      { ad: 'Hız artar', cap: '<b>1 · Hız artar.</b> Her siklus kısalır; diyastolik aralık sistolik aralıktan daha çok kısalır. İyonların hücreden atılacağı süre azalır. [[K1 s. 123]]' },
      { ad: 'Ca²⁺ girer', cap: '<b>2 · Daha çok Ca²⁺ girer.</b> Yüksek hızda her sistolde L tipi Ca²⁺ kanallarından giren Ca²⁺ artar. [[K1 s. 123]]' },
      { ad: 'Na⁺ birikir', cap: '<b>3 · Na⁺ birikir.</b> Diyastolde Na⁺/K⁺-ATPaz\'ın Na⁺ atması, sistoldeki Na⁺ girişine yetişemez; sitozolik Na⁺ yükselir. [[K1 s. 123]]' },
      { ad: 'Kuvvet artar', cap: '<b>4 · Ca²⁺ atılamaz, kuvvet artar.</b> Normalde hücre içi Ca²⁺\'u düşük tutan Na⁺/Ca²⁺ değiştiricidir. Sitozolik Na⁺ ve Ca²⁺ artınca Ca²⁺ hücre içinde birikir: pozitif inotropik etki, kuvvet merdiven gibi yükselir. [[K1 s. 123]]' },
      { ad: 'Digoksin', cap: '<b>5 · Digoksinde de aynı yol.</b> Digoksin Na⁺/K⁺-ATPaz\'ı bloke eder: Na⁺ birikir, değiştirici Ca²⁺\'u atamaz, kontraktilite artar. [[K1 s. 123]]' },
    ];
    const NA = [1, 1, 3, 3, 3], CA = [1, 2, 2, 3, 3];
    const KUV = [1, 1, 1, 1.08, 1.15, 1.2, 1.23, 1.25];
    const S = { i: RM ? 4 : 0, t: 0, tm: 9 };
    el.innerHTML = `<div class="f29-ctl f29-seg"><button type="button" class="btn ghost" data-a="geri">◀ Geri</button><button type="button" class="btn" data-a="ileri">İleri ▶</button><button type="button" class="btn ghost" data-a="oyn">Oynat</button></div>
      <div class="f29-faz" role="group" aria-label="Adımlar">${ADIM.map((a, i) => `<button type="button" data-i="${i}" aria-label="Adım ${i + 1}: ${a.ad}">${i + 1}</button>`).join('')}</div><div class="f29-fig" style="margin-top:10px"></div>`;
    const fig = el.querySelector('.f29-fig');
    let L = null, gA = null, gK = null, timers = [];
    const rnd = tohum(29);
    const NOK = Array.from({ length: 40 }, () => [rnd(), rnd(), rnd() * 6.28]);
    const op = (on) => `opacity:${on ? 1 : 0.4};transition:opacity .3s`;
    const kuvvetler = () => {
      const { sx0, by, bk } = L;
      let s = '', x = sx0;
      KUV.forEach((f, j) => {
        const w = j < 3 ? L.wp : L.wq;
        let ff = 1;
        if (j >= 3) { const g = S.i >= 3 ? clamp((S.tm - (j - 3) * 0.3) / 0.3, 0, 1) : 0; ff = lerp(1, f, ease(g)); }
        const h = bk * ff, bw = w * 0.56;
        s += Rc(x + (w - bw) / 2, by - h, bw, h, `fill:var(--accent);opacity:${j >= 3 && S.i < 3 ? 0.4 : 1}`, ' rx="2"');
        if (j === 0 || j === 7) s += T(x + w / 2, by - h - 6, fmt(ff, 2), 'f29-ax', 'middle', ' style="fill:var(--ink)"');
        x += w;
      });
      return s;
    };
    const akis = () => {
      const { c } = L, st = S.i, t = S.t;
      let s = '';
      const dizi = (x1, y1, x2, y2, n, renk, hiz, r = 3.6) => { for (let k = 0; k < n; k++) { const f = ((t * hiz + k / n) % 1 + 1) % 1; s += Ci(lerp(x1, x2, f), lerp(y1, y2, f), r, `fill:${renk};opacity:${Math.sin(f * Math.PI).toFixed(2)}`); } };
      // L tipi kanal: Ca²⁺ içeri
      const lx = c.x + c.w * 0.2;
      dizi(lx, c.y - 30, lx, c.y + 34, st >= 1 ? 4 : 2, 'var(--accent)', 0.6);
      // pompa
      const px = c.x + c.w, py = c.y + c.h * 0.5;
      if (st < 4) { dizi(px - 34, py - 7, px + 30, py - 7, 3, 'var(--c-basic)', st === 2 ? 0.25 : 0.45); dizi(px + 30, py + 9, px - 34, py + 9, 2, 'var(--warn)', 0.45); }
      // değiştirici
      const nx = c.x + c.w * 0.62, ny = c.y + c.h;
      dizi(nx - 9, ny + 18, nx - 9, ny - 30, 3, 'var(--c-basic)', 0.5);
      dizi(nx + 9, ny - 30, nx + 9, ny + 18, st >= 3 ? 1 : 3, 'var(--accent)', 0.5);
      // sitozol noktaları
      const nNa = [0, 6, 10, 16][NA[st]], nCa = [0, 5, 9, 15][CA[st]];
      NOK.slice(0, nNa + nCa).forEach((p, k) => {
        const x = c.x + 26 + p[0] * (c.w - 80), y = c.y + 72 + p[1] * (c.h * 0.8 - 100) + Math.sin(t * 1.3 + p[2]) * 3;
        s += Ci(x, y, 3.2, `fill:${k < nNa ? 'var(--c-basic)' : 'var(--accent)'}`);
      });
      // sarkomer
      const A = [0, 5, 8, 13][CA[st]] * (0.5 - 0.5 * Math.cos(((t % 0.8) / 0.8) * Math.PI * 2));
      const sy = c.y + c.h * 0.8, sx0 = c.x + c.w * 0.18, sx1 = c.x + c.w * 0.82, mid = (sx0 + sx1) / 2;
      const z0 = sx0 + A, z1 = sx1 - A;
      s += Ln(z0, sy - 16, z0, sy + 16, `stroke:${INK};stroke-width:3`) + Ln(z1, sy - 16, z1, sy + 16, `stroke:${INK};stroke-width:3`);
      [-9, 0, 9].forEach((d) => { s += Ln(z0, sy + d, mid - 12 + A * 0.6, sy + d, 'stroke:var(--c-clin);stroke-width:2') + Ln(z1, sy + d, mid + 12 - A * 0.6, sy + d, 'stroke:var(--c-clin);stroke-width:2'); });
      [-4.5, 4.5].forEach((d) => { s += Ln(mid - (sx1 - sx0) * 0.22, sy + d, mid + (sx1 - sx0) * 0.22, sy + d, `stroke:${MUTED};stroke-width:4.5`); });
      return s;
    };
    const gostergeler = () => {
      const { c } = L, x = c.x + c.w * 0.38, y = c.y + (L.dar ? 20 : 26);
      let s = '';
      [['sitozolik Na⁺', NA[S.i], 'var(--c-basic)'], ['sitozolik Ca²⁺', CA[S.i], 'var(--accent)']].forEach(([ad, lv, renk], k) => {
        const yy = y + k * (L.dar ? 24 : 26);
        s += T(x, yy + 4, ad, 'f29-s');
        for (let j = 0; j < 3; j++) s += Rc(x + 92 + j * 24, yy - 8, 20, 12, `fill:${j < lv ? renk : 'var(--chip)'};stroke:${LINE}`, ' rx="2"');
      });
      return s;
    };
    const ciz = () => {
      const dar = darMi(el), st = S.i;
      L = dar ? { dar: true, W: 360, H: 490, c: { x: 26, y: 44, w: 300, h: 196 }, sx0: 20, sy: 302, wp: 46, wq: 36, by: 460, bk: 80, leg: 340 }
        : { W: 760, H: 340, c: { x: 28, y: 64, w: 420, h: 224 }, sx0: 512, sy: 70, wp: 34, wq: 24, by: 284, bk: 118, leg: 112 };
      const { c } = L;
      let s = '';
      s += Rc(c.x, c.y, c.w, c.h, `fill:var(--c-basic-soft);fill-opacity:.35;stroke:${MUTED};stroke-width:2`, ' rx="22"');
      s += T(c.x + 14, c.y + c.h - 12, 'miyosit', 'f29-ax');
      // L tipi kanal
      const lx = c.x + c.w * 0.2;
      s += `<g style="${op(st === 1)}">${Rc(lx - 15, c.y - 9, 9, 18, 'fill:var(--accent)', ' rx="2"')}${Rc(lx + 6, c.y - 9, 9, 18, 'fill:var(--accent)', ' rx="2"')}${T(lx + 22, c.y - 14, 'L tipi Ca²⁺ kanalı', 'f29-t', '', ' style="fill:var(--accent-ink)"')}${T(lx - 20, c.y + 26, 'Ca²⁺', 'f29-ax', 'end')}</g>`;
      // pompa
      const px = c.x + c.w, py = c.y + c.h * 0.5;
      s += `<g style="${op(st === 2 || st === 4)}">${Ci(px, py, 16, 'fill:var(--c-basic);stroke:var(--paper);stroke-width:2')}${T(px, py + 4.5, 'ATP', 'f29-ax', 'middle', ' style="fill:var(--paper);font-weight:700"')}
        ${T(px - 22, py - (L.dar ? 24 : 30), 'Na⁺/K⁺-ATPaz', 'f29-t', 'end', ' style="fill:var(--c-basic)"')}${T(px - 40, py - 3, 'Na⁺', 'f29-ax', 'end')}${T(px - 40, py + 14, 'K⁺', 'f29-ax', 'end')}
        ${st === 4 ? `${Ln(px - 13, py - 13, px + 13, py + 13, 'stroke:var(--crit);stroke-width:4')}${Ln(px - 13, py + 13, px + 13, py - 13, 'stroke:var(--crit);stroke-width:4')}${T(px - 22, py + 36, 'digoksin', 'f29-tb', 'end', ' style="fill:var(--crit)"')}` : ''}</g>`;
      // değiştirici
      const nx = c.x + c.w * 0.62, ny = c.y + c.h;
      s += `<g style="${op(st === 3)}">${Rc(nx - 20, ny - 9, 40, 18, 'fill:var(--ok)', ' rx="6"')}${T(nx, ny + 36, 'Na⁺/Ca²⁺ değiştirici', 'f29-t', 'middle', ' style="fill:var(--ok)"')}
        ${T(nx - 26, ny - 14, 'Na⁺ ↑', 'f29-ax', 'end')}${T(nx + 26, ny - 14, st >= 3 ? 'Ca²⁺ ↓ azalır' : 'Ca²⁺ ↓', 'f29-ax')}</g>`;
      s += `<g style="${op(st >= 2)}">${gostergeler()}</g>`;
      s += `<g class="f29-a">${akis()}</g>`;
      // zaman şeridi
      let x = L.sx0;
      const sh = 22;
      let sr = '';
      KUV.forEach((f, j) => {
        const w = j < 3 ? L.wp : L.wq, wsis = j < 3 ? w * 0.38 : w * 0.5;
        sr += Rc(x, L.sy, wsis, sh, 'fill:var(--accent-soft);stroke:var(--accent);stroke-width:1') + Rc(x + wsis, L.sy, w - wsis, sh, `fill:var(--chip);stroke:${LINE};stroke-width:1`);
        if (j === 3) sr += Ln(x - 1, L.sy - 16, x - 1, L.by + 4, `stroke:${INK};stroke-width:1.3;stroke-dasharray:4 4`) + T(x + 3, L.sy - 6, 'hız artar →', 'f29-s');
        x += w;
      });
      sr += T(L.sx0, L.sy - 6, 'zaman', 'f29-s');
      sr += Rc(L.sx0, L.leg - 10, 12, 12, 'fill:var(--accent-soft);stroke:var(--accent)') + T(L.sx0 + 17, L.leg, 'sistol', 'f29-ax') + Rc(L.sx0 + 76, L.leg - 10, 12, 12, `fill:var(--chip);stroke:${MUTED}`) + T(L.sx0 + 93, L.leg, 'diyastol', 'f29-ax');
      s += `<g style="${op(st === 0 || st === 3)}">${sr}</g>`;
      s += Ln(L.sx0, L.by, x, L.by, `stroke:${MUTED};stroke-width:1.4`) + T(L.sx0, L.by + 18, 'kasılma kuvveti (göreli)', 'f29-s');
      s += `<g class="f29-k" style="${op(st >= 3)}">${kuvvetler()}</g>`;
      fig.innerHTML = svgAc(L.W, L.H, s, 'Miyosit iyon akımları ve kasılma kuvveti merdiveni');
      gA = fig.querySelector('.f29-a'); gK = fig.querySelector('.f29-k');
      el.querySelectorAll('.f29-faz button').forEach((b, k) => { b.classList.toggle('on', k === st); b.classList.toggle('past', k < st); b.setAttribute('aria-pressed', String(k === st)); });
      el.querySelector('[data-a="geri"]').disabled = st === 0;
      el.querySelector('[data-a="ileri"]').disabled = st === 4;
    };
    const git = (i) => { S.i = clamp(i, 0, 4); S.tm = RM ? 9 : 0; ciz(); cap(ADIM[S.i].cap); };
    const temizle = () => { timers.forEach(clearTimeout); timers = []; };
    el.addEventListener('click', (e) => {
      const f = e.target.closest('.f29-faz button'); if (f) { temizle(); git(+f.dataset.i); return; }
      const b = e.target.closest('[data-a]'); if (!b) return;
      temizle();
      if (b.dataset.a === 'geri') git(S.i - 1);
      else if (b.dataset.a === 'ileri') git(S.i + 1);
      else if (b.dataset.a === 'oyn') { git(0); for (let i = 1; i <= 4; i++) timers.push(setTimeout(() => git(i), RM ? 0 : i * 3000)); }
    });
    const dur = RM ? () => {} : ticker(el, (dt) => {
      if (!gA) return;
      S.t += dt; S.tm += dt;
      gA.innerHTML = akis();
      if (S.i >= 3 && S.tm < 2) gK.innerHTML = kuvvetler();
    });
    const dW = izle(el, ciz);
    S.tm = 9; ciz(); if (RM) cap(ADIM[4].cap);
    return () => { dur(); dW(); temizle(); };
  };

  /* =====================================================================
     5 · İndeksler ve MAP ≈ CO × SVR
     ===================================================================== */
  VIZ.f29_map = (el) => {
    const cap = capY(el);
    const S = { bsa: 1.6, co: 5.25, r: 1, v: 1 };
    const HAZ = {
      ist: { co: 5.25, r: 1, v: 1, cap: null },
      vk: { co: 5.25, r: 0.9, v: 1, cap: '<b>Vazokonstriksiyon.</b> Aynı CO\'da arteriyoller daralır, SVR ve MAP yükselir; ör. katekolamin salınımı. SVR\'yi başlıca arteriyol yarıçapı belirler. [[K1 s. 123]]' },
      pol: { co: 5.25, r: 1, v: 1.35, cap: '<b>Viskozite artışı.</b> Paraproteinemi ve polisitemia rubra verada kan koyulaşır, SVR ve MAP artar; bu hastalar sıklıkla hipertansiftir. Viskozitenin etkisi yarıçapınkinden çok daha küçüktür. [[K1 s. 123]]' },
      vd: { co: 5.25, r: 1.12, v: 1, cap: '<b>Vazodilatasyon.</b> Septik şokta ya da genel anesteziden sonra arteriyoller genişler; aynı CO\'da MAP düşer. [[K1 s. 123]]' },
      an: { co: 5.25, r: 1, v: 0.75, cap: '<b>Viskozite azalması.</b> Aynı CO\'da SVR ve MAP düşer. [[K1 s. 123]]' },
    };
    el.innerHTML = `<div class="f29-sls">${sl('bsa', 'Vücut yüzey alanı (BSA)', 1, 2.2, 0.1, 1.6)}${sl('co', 'Kalp debisi (CO)', 3, 8, 0.25, 5.25)}${sl('r', 'Arteriyol yarıçapı (göreli)', 0.85, 1.15, 0.01, 1)}${sl('v', 'Kan viskozitesi (göreli)', 0.7, 1.5, 0.05, 1)}</div>
      <div class="f29-ctl f29-seg">${dugmeler([['ist', 'İstirahat'], ['vk', 'Vazokonstriksiyon (katekolamin)'], ['pol', 'Polisitemi / paraproteinemi'], ['vd', 'Vazodilatasyon (septik şok, genel anestezi)'], ['an', 'Düşük viskozite']], 'hz')}</div>
      <div class="f29-fig"></div><p class="f29-oku"></p><p class="f29-not">Geçerli olması için sağ atriyum basıncı MAP'ın yanında çok küçük kabul edilir. [[K1 s. 123]]</p>`;
    el.querySelector('.f29-not').innerHTML = REF(el.querySelector('.f29-not').innerHTML);
    const fig = el.querySelector('.f29-fig'), oku = el.querySelector('.f29-oku');
    let L = null, gN = null, tt = 0;
    const mdl = () => {
      const sv = (S.co * 1000) / 75, svr = S.v / Math.pow(S.r, 4), map = clamp(90 * (S.co / 5.25) * svr, 30, 200);
      return { sv, svr, map, ci: S.co / S.bsa, svi: sv / S.bsa };
    };
    const noktalar = () => {
      const { yolx, ay } = L, half = L.ah, n = Math.round(9 * S.v), hiz = 0.18 * (S.co / 5.25);
      let s = '';
      const op = (0.45 + (0.5 * (S.v - 0.7)) / 0.8).toFixed(2);
      for (let k = 0; k < n; k++) {
        const f = (((tt * hiz + k / n) % 1) + 1) % 1, x = lerp(yolx[0], yolx[1], f);
        const inA = x > L.a0 && x < L.a1, hh = inA ? Math.max(1.5, L.rh() - 3) : half - 4;
        const y = ay + Math.sin(k * 2.3) * hh * 0.7;
        s += Ci(x, y, 3.2, `fill:var(--crit);opacity:${op}`);
      }
      return s;
    };
    const ciz = () => {
      const m = mdl(), dar = darMi(el);
      L = dar ? { W: 360, H: 430, hx: 42, hy: 130, hk: 0.75, ay: 130, ah: 12, art0: 64, a0: 180, a1: 270, yolx: [64, 330], dx: 120, dy: 62, dr: 40, vy: 190, ix0: 10, ix1: 350, iy: 232 }
        : { W: 760, H: 330, hx: 408, hy: 210, hk: 0.95, ay: 200, ah: 14, art0: 440, a0: 545, a1: 650, yolx: [440, 720], dx: 490, dy: 120, dr: 52, vy: 290, ix0: 20, ix1: 320, iy: 34 };
      L.rh = () => 7 * Math.pow(S.r, 4);
      let s = '';
      // devre
      const { ay, ah, a0, a1 } = L, rh = L.rh(), xe = L.yolx[1];
      s += `<path d="M${a1},${ay} L${xe},${ay} L${xe},${L.vy} L${L.hx},${L.vy} L${L.hx},${L.hy + 24}" style="fill:none;stroke:var(--c-basic-soft);stroke-width:${2 * ah};stroke-linejoin:round"/>`;
      s += T((L.hx + xe) / 2, L.vy + 5, 'venöz dönüş', 'f29-s', 'middle');
      s += Rc(L.art0, ay - ah, a0 - L.art0, 2 * ah, `fill:var(--crit-soft);stroke:${MUTED}`);
      s += `<path d="M${a0},${ay - ah} C${a0 + 20},${ay - ah} ${a0 + 20},${r1(ay - rh)} ${a0 + 34},${r1(ay - rh)} L${a1 - 34},${r1(ay - rh)} C${a1 - 20},${r1(ay - rh)} ${a1 - 20},${ay - ah} ${a1},${ay - ah} L${a1},${ay + ah} C${a1 - 20},${ay + ah} ${a1 - 20},${r1(ay + rh)} ${a1 - 34},${r1(ay + rh)} L${a0 + 34},${r1(ay + rh)} C${a0 + 20},${r1(ay + rh)} ${a0 + 20},${ay + ah} ${a0},${ay + ah}Z" style="fill:var(--crit-soft);stroke:var(--c-clin);stroke-width:3"/>`;
      s += T((a0 + a1) / 2, ay - ah - 12, `SVR × ${fmt(m.svr, 2)}`, 'f29-tb', 'middle', ' style="fill:var(--c-clin)"');
      s += T((a0 + a1) / 2, ay + ah + 20, 'arteriyol', 'f29-s', 'middle');
      s += `<g class="f29-nk">${noktalar()}</g>`;
      s += `<path d="${kalpYolu(L.hx, L.hy, L.hk)}" style="fill:var(--ok-soft);stroke:var(--ok);stroke-width:2.5"/>`;
      s += T(L.hx, L.hy + 34 * L.hk + 22, `CO ${fmt(S.co, 2)} L/dk`, 'f29-tb', 'middle', ' style="fill:var(--ok)"');
      // kadran
      const { dx, dy, dr } = L, A = (p) => Math.PI * (1 - (clamp(p, 40, 180) - 40) / 140);
      const yay = (p1, p2, renk) => { const a = A(p1), b = A(p2); return `<path d="M${r1(dx + dr * Math.cos(a))},${r1(dy - dr * Math.sin(a))} A${dr},${dr} 0 0 1 ${r1(dx + dr * Math.cos(b))},${r1(dy - dr * Math.sin(b))}" style="fill:none;stroke:${renk};stroke-width:9"/>`; };
      s += yay(40, 180, 'var(--chip)') + yay(40, 65, 'var(--crit)') + yay(70, 105, 'var(--ok)') + yay(110, 180, 'var(--warn)');
      const an = A(m.map);
      s += Ln(dx, dy, dx + (dr - 6) * Math.cos(an), dy - (dr - 6) * Math.sin(an), `stroke:${INK};stroke-width:3;stroke-linecap:round`) + Ci(dx, dy, 5, `fill:${INK}`);
      s += T(dx - dr, dy + 16, '40', 'f29-ax', 'middle') + T(dx + dr, dy + 16, '180', 'f29-ax', 'middle');
      s += Ln(dx, dy + 6, dx, ay - ah, `stroke:${MUTED};stroke-width:1.5`);
      const mc = m.map < 65 ? 'var(--crit)' : m.map > 110 ? 'var(--warn)' : 'var(--ink)';
      if (dar) s += T(dx + dr + 14, dy - 14, 'MAP', 'f29-s') + T(dx + dr + 14, dy + 8, `${n0(m.map)} mmHg`, 'f29-big', '', ` style="fill:${mc};font-size:20px"`);
      else s += T(dx + dr + 16, dy - 16, 'MAP', 'f29-s') + T(dx + dr + 16, dy + 10, `${n0(m.map)} mmHg`, 'f29-big', '', ` style="fill:${mc}"`);
      // indeksler
      const gost = (y, ad, aralik, lo, hi, nlo, nhi, val, metin) => {
        const X = (v) => L.ix0 + ((L.ix1 - L.ix0) * (clamp(v, lo, hi) - lo)) / (hi - lo);
        return T(L.ix0, y, ad, 'f29-t') + T(L.ix1, y, `normal ${aralik}`, 'f29-s', 'end', ' style="fill:var(--ok)"')
          + Rc(L.ix0, y + 9, L.ix1 - L.ix0, 16, `fill:var(--chip);stroke:${LINE}`, ' rx="4"') + Rc(X(nlo), y + 9, X(nhi) - X(nlo), 16, 'fill:var(--ok-soft);stroke:var(--ok)')
          + Ln(X(val), y + 4, X(val), y + 30, `stroke:${INK};stroke-width:3`) + T(L.ix0, y + 46, metin, 'f29-n');
      };
      s += gost(L.iy, 'Kardiyak indeks (CI)', '3,0–3,5', 1, 6, 3, 3.5, m.ci, `CI = ${fmt(S.co, 2)} / ${fmt(S.bsa, 1)} = ${fmt(m.ci, 1)} L dk⁻¹ m⁻²`);
      s += gost(L.iy + 72, 'Atım hacmi indeksi (SVI)', '33–47', 15, 75, 33, 47, m.svi, `SVI = ${n0(m.sv)} / ${fmt(S.bsa, 1)} = ${n0(m.svi)} mL m⁻² atım⁻¹`);
      // siluet
      const k = 0.8 + (0.35 * (S.bsa - 1)) / 1.2, sx = dar ? 40 : 70, sb = dar ? 424 : 318, hh = (dar ? 62 : 120) * k;
      s += Ci(sx, sb - hh + hh * 0.09, hh * 0.09, 'fill:var(--muted)') + `<path d="M${r1(sx - hh * 0.13)},${r1(sb - hh * 0.8)} L${r1(sx + hh * 0.13)},${r1(sb - hh * 0.8)} L${r1(sx + hh * 0.1)},${r1(sb - hh * 0.42)} L${r1(sx + hh * 0.09)},${sb} L${r1(sx - hh * 0.09)},${sb} L${r1(sx - hh * 0.1)},${r1(sb - hh * 0.42)}Z" style="fill:var(--muted)"/>`;
      s += T(sx + 34, sb - (dar ? 26 : 50), `BSA ${fmt(S.bsa, 1)} m²`, 'f29-tb') + T(sx + 34, sb - (dar ? 6 : 28), `SV ${n0(m.sv)} mL (HR 75 sabit)`, 'f29-s');
      fig.innerHTML = svgAc(L.W, L.H, s, 'Kardiyak indeks, atım hacmi indeksi ve MAP devresi');
      gN = fig.querySelector('.f29-nk');
      ['bsa', 'co', 'r', 'v'].forEach((key) => { el.querySelector(`[data-o="${key}"]`).textContent = key === 'bsa' ? `${fmt(S.bsa, 1)} m²` : key === 'co' ? `${fmt(S.co, 2)} L/dk` : `× ${fmt(S[key], 2)}`; el.querySelector(`[data-k="${key}"]`).value = S[key]; });
      oku.textContent = `MAP ≈ CO × SVR: ${fmt(S.co, 2)} L/dk × SVR (göreli ${fmt(m.svr, 2)}) → ${n0(m.map)} mmHg`;
    };
    const capOn = () => { const m = mdl(); cap(`<b>CO ${fmt(S.co, 2)} L/dk ÷ BSA ${fmt(S.bsa, 1)} m² = CI ${fmt(m.ci, 1)} L dk⁻¹ m⁻²; SVI ${n0(m.svi)} mL m⁻² atım⁻¹.</b> MAP ≈ CO × SVR = ${n0(m.map)} mmHg. [[K1 s. 123]]`); };
    el.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (!k) return; S[k] = +e.target.value; basSec(el, 'hz', ''); ciz(); capOn(); });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-hz]'); if (!b) return;
      const h = HAZ[b.dataset.hz]; Object.assign(S, { co: h.co, r: h.r, v: h.v }); basSec(el, 'hz', b.dataset.hz); ciz();
      if (h.cap) cap(h.cap); else cap(null);
    });
    const dur = RM ? () => {} : ticker(el, (dt) => { tt += dt; if (gN) gN.innerHTML = noktalar(); });
    const dW = izle(el, ciz);
    ciz(); basSec(el, 'hz', 'ist');
    return () => { dur(); dW(); };
  };

  /* =====================================================================
     6 · Aort darlığı: kompansasyon ve bedeli
     ===================================================================== */
  VIZ.f29_as = (el) => {
    const cap = capY(el);
    const S = { A: 3.0, sen: null, t: 0, ts: 9 };
    const mdl = (A) => {
      const sev = clamp((3.0 - A) / 2.4, 0, 1);
      const duvar = A >= 2.6 ? 1 : A >= 1.5 ? lerp(1.6, 1.3, (A - 1.5) / 1.0) : A >= 1.0 ? lerp(2.0, 1.7, (A - 1.0) / 0.4) : 2.2;
      const atr = A >= 2.6 ? 15 : A >= 1.5 ? lerp(25, 15, (A - 1.5) / 1.0) : A >= 1.0 ? lerp(35, 25, (A - 1.0) / 0.4) : lerp(40, 35, (A - 0.6) / 0.3);
      return { sev, duvar, atr: clamp(atr, 15, 40), ihtiyac: 0.42 + 0.5 * sev, akim: 0.8 - 0.42 * sev, lvp: 0.35 + 0.6 * sev, ciddi: A < 1.0 };
    };
    const capA = (A) => {
      const a = fmt(A, 1);
      if (A > 2.55) return A >= 2.95 ? null : `<b>Normal kapak, ${a} cm².</b> Kapak alanını küçültün: sol ventrikül önce hipertrofiyle SV'yi korur, sonra bedelini öder. Ciddi darlıkta egzersizi ya da santral nöroaksiyel bloğu deneyin. [[K1 s. 124]]`;
      if (A >= 1.45) return `<b>Kompansatuvar hipertrofi, ${a} cm².</b> Sistolik işlev, SV ve CO korunur; ama kalın duvarın kompliyansı azalır, gevşeme ve diyastolik dolum bozulur, atriyum kasılması önem kazanır. [[K1 s. 124]]`;
      if (A >= 0.95) return `<b>Bedel: O₂ uyumsuzluğu, ${a} cm².</b> SV'yi korumak için daha yüksek LV basıncı gerekir, O₂ gereksinimi artar; artan kas kütlesi ve basınç ise koroner akımı azaltır. Koronerler normal olsa bile anjina gelişebilir. [[K1 s. 124]]`;
      return `<b>Ciddi aort darlığı, ${a} cm².</b> CO fiilen sabittir. Atriyum kasılması LVEDV'nin %40'ına kadar katkı yapar; atriyum gerildiği için sıklaşan AF yıkıcı olabilir. [[K1 s. 124]]`;
    };
    const SEN = {
      egz: { ad: 'Egzersiz (ciddi darlık)', svr: 0.3, co: 0.5, map: 0.26, coT: 'değişmez', mapT: 'düşer ↓↓', ek: 'Beyin kan akımı ↓ → efor senkopu',
        cap: '<b>Efor senkopu.</b> Egzersiz SVR\'yi düşürür; normalde CO artışı MAP\'ı korur. Burada artış gelmez: MAP ve beyin kan akımı düşer. [[K1 s. 124]]' },
      blok: { ad: 'Santral nöroaksiyel blok (ciddi darlık)', svr: 0.25, co: 0.5, map: 0.16, coT: 'değişmez', mapT: 'yıkıcı düşüş ↓↓', ek: 'MAP yıkıcı düşüş',
        cap: '<b>Santral nöroaksiyel blok.</b> Sempatik blokajın düşürdüğü SVR debi artışıyla karşılanamaz; MAP yıkıcı biçimde düşer. [[K1 s. 124]]' },
      norm: { ad: 'Normal kapak, SVR düşerse', svr: 0.3, co: 0.74, map: 0.48, coT: 'artar ↑', mapT: 'korunur', ek: '',
        cap: '<b>Normal kapak.</b> SVR düşünce CO artar ve MAP korunur. [[K1 s. 124]]' },
    };
    el.innerHTML = `<div class="f29-sls f29-as-r" style="grid-template-columns:minmax(0,1fr)"><label class="f29-sl"><span><span>Aort kapak alanı (sağa doğru daralır)</span><b data-o="A"></b></span><input type="range" data-k="A" min="0.6" max="3" step="0.1" value="3"><div class="f29-asol" aria-hidden="true"><i class="n" style="left:0;width:16.7%"></i><i class="c" style="left:83.3%;right:0"></i><span style="left:0">normal 2,6–3,5</span><span style="right:0">ciddi &lt; 1,0</span></div></label></div>
      <div class="f29-ctl f29-seg">${dugmeler([['egz', 'Egzersiz'], ['blok', 'Santral nöroaksiyel blok'], ['norm', 'Normal kapakla karşılaştır']], 'sn')}<span class="f29-not f29-ipucu" style="margin:0">ciddi darlıkta (&lt; 1,0 cm²) sınayın</span></div>
      <div class="f29-fig"></div><div class="f29-sen" hidden></div><p class="f29-not">Sıklık: yaşam boyu %1 · Neden: üç yaprakçıklı kapakta yinelenen mekanik stres → fibroz, kalsifikasyon (genellikle 70 yaş üstü) · Biküspit kapak: daha genç yaşta. [[K1 s. 123–124]]</p>`;
    const not = el.querySelectorAll('.f29-not')[1]; not.innerHTML = REF(not.innerHTML);
    const fig = el.querySelector('.f29-fig'), sen = el.querySelector('.f29-sen'), inp = el.querySelector('input');
    let L = null, gA = null;
    const P = (x, y) => [L.ox + x * L.k, L.oy + y * L.k];
    const kalp = (m) => {
      // kalp kesiti, 320 × 330 iç koordinat
      const A = S.A, t = S.t, k = L.k;
      const atrF = 1 - 0.06 * Math.max(0, Math.sin(((t % 1) - 0.7) / 0.3 * Math.PI)) * ((t % 1) > 0.7 ? 1 : 0);
      const ejF = (t % 1) < 0.35;
      let s = '';
      const pth = (pts, st) => `<path d="${pts}" style="${st}"/>`;
      const p = (x, y) => P(x, y).map(r1).join(',');
      // aort
      s += pth(`M${p(215, 140)} C${p(220, 90)} ${p(250, 60)} ${p(262, 14)}`, `fill:none;stroke:var(--crit-soft);stroke-width:${r1(34 * k)}`);
      s += pth(`M${p(198, 140)} C${p(203, 90)} ${p(233, 58)} ${p(245, 12)} M${p(232, 140)} C${p(237, 92)} ${p(267, 64)} ${p(279, 16)}`, `fill:none;stroke:${MUTED};stroke-width:1.4`);
      // sol atriyum
      s += pth(`M${p(112, 112)} L${p(140, 160)}`, `fill:none;stroke:var(--crit-soft);stroke-width:${r1(26 * k)}`);
      const [ax, ay] = P(100, 96);
      s += `<ellipse cx="${r1(ax)}" cy="${r1(ay)}" rx="${r1(56 * k * atrF)}" ry="${r1(40 * k * atrF)}" style="fill:var(--crit-soft);stroke:${m.atr >= 25 ? 'var(--warn)' : MUTED};stroke-width:${m.atr >= 25 ? 3.5 : 1.5}"/>`;
      // sol ventrikül
      const [vx, vy] = P(165, 232), sw = 7 + 9 * (m.duvar - 1);
      s += `<ellipse cx="${r1(vx)}" cy="${r1(vy)}" rx="${r1(72 * k)}" ry="${r1(92 * k)}" style="fill:var(--crit-soft);stroke:var(--c-clin);stroke-opacity:.75;stroke-width:${r1(sw * k * 1.4)}"/>`;
      // koroner
      s += pth(`M${p(196, 142)} C${p(140, 150)} ${p(96, 190)} ${p(102, 300)}`, `fill:none;stroke:var(--crit);stroke-width:${r1(3 * k + 1)}`);
      const nK = Math.max(1, Math.round(6 * m.akim));
      for (let i = 0; i < nK; i++) {
        const f = (((t * 0.35 + i / nK) % 1) + 1) % 1, u = 1 - f;
        const bx = u * u * u * 196 + 3 * u * u * f * 140 + 3 * u * f * f * 96 + f * f * f * 102, by = u * u * u * 142 + 3 * u * u * f * 150 + 3 * u * f * f * 190 + f * f * f * 300;
        const [qx, qy] = P(bx, by); s += Ci(qx, qy, 3.2, 'fill:var(--crit);stroke:var(--paper);stroke-width:1');
      }
      // kapak
      const ac = 6 + 26 * (A / 3) * (ejF || RM ? 1 : 0.15);
      s += pth(`M${p(198, 142)} L${p(215 - ac / 2, 120)} M${p(232, 142)} L${p(215 + ac / 2, 120)}`, `fill:none;stroke:${INK};stroke-width:${r1(4 * k + 1)};stroke-linecap:round`);
      if (A < 1.5) [[204, 134], [226, 134], [209, 127], [221, 127]].forEach(([x, y]) => { const [qx, qy] = P(x, y); s += Ci(qx, qy, 3, `fill:${MUTED}`); });
      // jet
      if (ejF || RM) {
        const w = (A / 3) * 22, hiz = 1.2 / Math.sqrt(A / 3);
        for (let i = 0; i < 7; i++) {
          const f = RM ? i / 7 : (((t * hiz * 2.2 + i / 7) % 1) + 1) % 1;
          const [qx, qy] = P(215 + (f * 40) + Math.sin(i * 2.1) * w * 0.5, 150 - f * 135);
          s += Ci(qx, qy, 3, 'fill:var(--crit);opacity:.8');
        }
      }
      return s;
    };
    const ciz = () => {
      const m = mdl(S.A), dar = darMi(el);
      L = dar ? { W: 360, H: 470, ox: 70, oy: 6, k: 0.7, gx0: 14, gx1: 346, gy: 262 } : { W: 760, H: 345, ox: 20, oy: 8, k: 1, gx0: 380, gx1: 730, gy: 30 };
      let s = `<g class="f29-k">${kalp(m)}</g>`;
      const lab = (x, y, t, a = 'start', st = '') => { const [qx, qy] = P(x, y); return T(qx, qy, t, 'f29-s f29-hale', a, st); };
      s += lab(100, 100, 'sol atriyum', 'middle') + lab(165, 236, 'sol ventrikül', 'middle') + lab(286, 40, 'aort') + lab(244, 126, 'aort kapağı') + lab(98, 322, 'koroner arter', 'middle');
      const [wx, wy] = P(240, 250), [wx2, wy2] = P(290, 262);
      s += Ln(wx, wy, wx2, wy2, `stroke:${MUTED}`) + T(wx2 + 3, wy2 + 4, 'duvar', 'f29-s') + T(wx2 + 3, wy2 + 20, `× ${fmt(m.duvar, 1)}`, 'f29-n');
      // göstergeler
      const G = (y, ad, f, renk, sag, sagRenk) => T(L.gx0, y, ad, 'f29-t') + (sag ? T(L.gx1, y, sag, 'f29-t', 'end', ` style="fill:${sagRenk || INK}"`) : '')
        + Rc(L.gx0, y + 8, L.gx1 - L.gx0, 14, `fill:var(--chip);stroke:${LINE}`, ' rx="4"') + Rc(L.gx0, y + 8, (L.gx1 - L.gx0) * clamp(f, 0, 1), 14, `fill:${renk}`, ' rx="4"');
      const y0 = L.gy, d = dar ? 50 : 56;
      s += G(y0, 'SV / CO', 1, 'var(--ok)', m.ciddi ? 'sabit debi' : 'korunur', m.ciddi ? 'var(--crit)' : 'var(--ok)');
      s += G(y0 + d, 'Atriyum katkısı (LVEDV)', m.atr / 50, 'var(--accent)', `%${n0(m.atr)}`);
      const x40 = L.gx0 + (L.gx1 - L.gx0) * 0.8;
      s += Ln(x40, y0 + d + 4, x40, y0 + d + 26, `stroke:${INK};stroke-width:1.5;stroke-dasharray:3 3`) + T(x40, y0 + d + 40, '%40\'a kadar', 'f29-ax', 'middle');
      s += G(y0 + 2 * d + 8, 'Miyokard O₂ gereksinimi', m.ihtiyac, 'var(--warn)', '');
      s += G(y0 + 3 * d - 4, 'Koroner akım', m.akim, 'var(--c-basic)', '');
      if (m.ihtiyac > m.akim) s += T(L.gx1, y0 + 2 * d + 8, m.ciddi ? 'uyumsuzluk → anjina' : 'makas açılıyor', 'f29-t', 'end', ` style="fill:${m.ciddi ? 'var(--crit)' : 'var(--warn)'}"`);
      s += G(y0 + 4 * d - 4, 'LV sistolik basıncı', m.lvp, 'var(--c-clin)', m.sev > 0.05 ? '↑' : '');
      fig.innerHTML = svgAc(L.W, L.H, s, 'Sol kalp kesiti ve aort darlığı göstergeleri');
      gA = fig.querySelector('.f29-k');
      el.querySelector('[data-o="A"]').textContent = `${fmt(S.A, 1)} cm²`;
      el.querySelectorAll('[data-sn]').forEach((b) => { b.disabled = !m.ciddi; });
      el.querySelector('.f29-ipucu').style.display = m.ciddi ? 'none' : '';
    };
    const senCiz = () => {
      if (!S.sen) { sen.hidden = true; return; }
      const d = SEN[S.sen];
      sen.hidden = false;
      const row = (ad, f, t, renk) => `<div class="f29-snr"><span>${ad}</span><i><b style="width:50%;background:${renk}"></b><em></em></i><span style="color:${renk}">${t}</span></div>`;
      sen.innerHTML = `<p class="f29-sn-h">${d.ad}</p>${row('SVR', d.svr, '↓', 'var(--c-clin)')}${row('CO', d.co, d.coT, 'var(--ok)')}${row('MAP', d.map, d.mapT, d.map < 0.4 ? 'var(--crit)' : 'var(--ink)')}${d.ek ? `<p class="f29-sn-e">${d.ek}</p>` : ''}`;
      const bars = sen.querySelectorAll('i b'), hed = [d.svr, d.co, d.map];
      const uygula = () => bars.forEach((b, i) => { b.style.width = hed[i] * 100 + '%'; });
      if (RM) uygula(); else requestAnimationFrame(() => requestAnimationFrame(uygula));
    };
    el.addEventListener('input', (e) => {
      if (e.target !== inp) return;
      S.A = Math.round(+inp.value * 10) / 10;
      if (S.A >= 1.0) { S.sen = null; basSec(el, 'sn', ''); senCiz(); }
      ciz(); cap(capA(S.A));
    });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-sn]'); if (!b || b.disabled) return;
      S.sen = b.dataset.sn; basSec(el, 'sn', S.sen); senCiz(); cap(SEN[S.sen].cap);
    });
    const dur = RM ? () => {} : ticker(el, (dt) => { S.t += dt; if (gA) gA.innerHTML = kalp(mdl(S.A)); });
    const dW = izle(el, ciz);
    ciz();
    return () => { dur(); dW(); };
  };

  /* =====================================================================
     7 · Yöntem haritası
     ===================================================================== */
  VIZ.f29_yontem = (el) => {
    const cap = capY(el);
    const Y = {
      fick: { ad: 'Doğrudan Fick', ly: ['spiro', 'pac', 'rad'], cap: '<b>Doğrudan Fick.</b> CO = V̇O₂ / (CaO₂ − CvO₂): spirometreyle O₂ alımı, arter ve PAC\'den karışık venöz örnek. Fizyolojik altın standart, ama klinikte pratik değil. [[K1 s. 125–126]]' },
      boya: { ad: 'Boya / lityum dilüsyonu', ly: ['pac', 'rad'], cap: '<b>İndikatör dilüsyonu.</b> İndikatör pulmoner artere verilir, periferik arterden örneklenir; CO = miktar / eğri altındaki alan. [[K1 s. 125]]' },
      termo: { ad: 'Termodilüsyon (PAC)', ly: ['pac', 'pacp'], cap: '<b>Termodilüsyon.</b> Sağ atriyuma 10–15 mL soğuk serum, pulmoner arterde sıcaklık–zaman eğrisi; altın standart. [[K1 s. 126]]' },
      picco: { ad: 'PiCCO', ly: ['cvc', 'fem'], cap: '<b>PiCCO (kalibre).</b> Arter dalgasından sürekli CO; transpulmoner termodilüsyonla kalibre edilir. [[K1 s. 127]]' },
      lidco: { ad: 'LiDCO', ly: ['cvc', 'rad'], cap: '<b>LiDCO (kalibre).</b> Nabız gücü analizi; lityum dilüsyonuyla kalibre edilir. [[K1 s. 127–128]]' },
      flo: { ad: 'FloTrac/Vigileo, LiDCOrapid', ly: ['rad'], cap: '<b>Kalibre olmayan sistemler.</b> Yalnız standart arter kateteri; aort kompliyansı ya da nomogram demografik verilerden. [[K1 s. 128]]' },
      eso: { ad: 'Özofageal Doppler (CardioQ)', ly: ['esod'], cap: '<b>Özofageal Doppler.</b> İnen aortta kan hızı; SV\'nin %70\'inin buradan geçtiği varsayılır. [[K1 s. 128]]' },
      toe: { ad: 'TÖE', ly: ['toe'], cap: '<b>TÖE.</b> EDV − ESV ya da LVOT Doppler\'ından SV ve CO. [[K1 s. 129]]' },
      tte: { ad: 'Transtorasik Doppler eko', ly: ['tte'], cap: null },
      bio: { ad: 'Transtorasik elektriksel biyoempedans', ly: ['elek'], cap: null },
      mr: { ad: 'Manyetik rezonans', ly: ['mr'], cap: null },
    };
    const NONCAP = '<b>Noninvaziv yöntemler.</b> Transtorasik Doppler ekokardiyografi, transtorasik elektriksel biyoempedans ve manyetik rezonans görüntüleme. [[K1 s. 124]]';
    const hap = (ks) => `<div class="f29-hap">${ks.map((k) => `<button type="button" data-y="${k}" aria-pressed="false">${Y[k].ad}</button>`).join('')}</div>`;
    const agac = `<div class="f29-agac"><div class="f29-kok">Kalp debisi ölçümü</div>
      <div class="f29-grp inv"><h4>İnvaziv <small>PAC, santral ya da arter kateteri</small></h4>
        <div class="f29-alt"><span>Fick ilkesi</span>${hap(['fick', 'boya', 'termo'])}</div>
        <div class="f29-alt"><span>Nabız konturu analizi · kalibre</span>${hap(['picco', 'lidco'])}<span>kalibre değil</span>${hap(['flo'])}</div></div>
      <div class="f29-grp min"><h4>Minimal invaziv <small>özofagus</small></h4>${hap(['eso', 'toe'])}</div>
      <div class="f29-grp non"><h4>Noninvaziv</h4>${hap(['tte', 'bio', 'mr'])}</div></div>`;
    const k = (d, st) => `<path class="k" pathLength="1" d="${d}" style="fill:none;${st}"/>`;
    const lab = (x, y, t, a = 'start') => T(x, y, t, 'f29-s f29-hale', a, ' style="fill:var(--ink)"');
    const LY = {
      spiro: `${k('M138,56 L162,56 L166,68 L134,68Z', 'stroke:var(--c-clin);stroke-width:3')}${k('M166,62 C200,60 210,40 236,40', 'stroke:var(--c-clin);stroke-width:3')}${Rc(236, 28, 50, 24, 'fill:var(--c-clin-soft);stroke:var(--c-clin);stroke-width:2', ' rx="5"')}${lab(261, 20, 'spirometre', 'middle')}`,
      pac: `${k('M136,72 L140,100 L150,158 C152,180 170,188 174,176 C178,164 172,150 186,138', 'stroke:var(--accent);stroke-width:3.5')}${Ci(187, 137, 4.5, 'fill:var(--paper);stroke:var(--accent);stroke-width:2')}${lab(196, 132, 'PAC ucu: pulmoner arter')}`,
      pacp: `${Rc(146, 154, 9, 9, 'fill:var(--accent)')}${lab(214, 186, 'proksimal lümen:')}${lab(214, 201, 'sağ atriyum')}${Ln(158, 160, 212, 182, 'stroke:var(--muted)')}${lab(196, 147, '(termistör)')}`,
      cvc: `${k('M128,72 L134,100 L144,138', 'stroke:var(--c-basic);stroke-width:3.5')}${Ci(144, 139, 3.5, 'fill:var(--c-basic)')}${lab(70, 128, 'santral', 'end')}${lab(70, 143, 'kateter', 'end')}${Ln(74, 134, 140, 136, 'stroke:var(--muted)')}`,
      rad: `${k('M56,226 L48,252', 'stroke:var(--crit);stroke-width:4')}${Ci(48, 252, 3.5, 'fill:var(--crit)')}${lab(10, 280, 'radiyal arter')}`,
      fem: `${k('M134,262 L128,296', 'stroke:var(--crit);stroke-width:4')}${Ci(128, 297, 4, 'fill:var(--paper);stroke:var(--crit);stroke-width:2')}${lab(140, 304, 'femoral arter (termistörlü)')}`,
      esod: `${k('M154,40 L152,80 L149,214', 'stroke:var(--warn);stroke-width:3.5')}${Ci(149, 216, 4, 'fill:var(--warn)')}${k('M147,214 L139,202 M147,216 L138,214', 'stroke:var(--warn);stroke-width:2')}${lab(160, 226, 'özofageal Doppler probu')}${lab(160, 241, '(inen aort yanında)')}`,
      toe: `${k('M154,40 L152,80 L151,190', 'stroke:var(--warn);stroke-width:6')}${Rc(145, 188, 12, 14, 'fill:var(--warn)', ' rx="3"')}${lab(196, 206, 'TÖE probu')}${lab(196, 221, '(kalbin arkasında)')}${Ln(158, 196, 194, 204, 'stroke:var(--muted)')}`,
      tte: `${Rc(192, 160, 18, 30, 'fill:var(--c-basic);stroke:var(--paper);stroke-width:1.5', ' rx="4" transform="rotate(-25 201 175)"')}${lab(214, 162, 'göğüs probu')}`,
      elek: `${[[128, 96], [172, 96], [112, 248], [188, 248]].map(([x, y]) => Ci(x, y, 6, 'fill:var(--ok);stroke:var(--paper);stroke-width:2')).join('')}${lab(196, 266, 'elektrotlar')}`,
      mr: `${k('M52,182 A98,26 0 1 0 248,182 A98,26 0 1 0 52,182', 'stroke:var(--c-clin);stroke-width:4;stroke-dasharray:none')}${lab(150, 228, 'MR', 'middle')}`,
    };
    const govde = `<path d="M100,92 L200,92 Q222,96 224,120 L218,262 Q150,282 82,262 L76,120 Q78,96 100,92Z" style="fill:var(--chip);stroke:var(--muted);stroke-width:1.5"/>
      <path d="M98,98 Q70,112 64,170 L52,256 M202,98 Q230,112 236,170 L248,256" style="fill:none;stroke:var(--chip);stroke-width:20;stroke-linecap:round"/>
      <path d="M98,98 Q70,112 64,170 L52,256 M202,98 Q230,112 236,170 L248,256" style="fill:none;stroke:var(--muted);stroke-width:1;opacity:.5"/>
      <path d="M130,272 L122,392 M170,272 L178,392" style="fill:none;stroke:var(--chip);stroke-width:24;stroke-linecap:round"/>
      ${Rc(140, 70, 20, 26, 'fill:var(--chip);stroke:var(--muted);stroke-width:1')}${Ci(150, 46, 26, 'fill:var(--chip);stroke:var(--muted);stroke-width:1.5')}
      <ellipse cx="120" cy="150" rx="22" ry="44" style="fill:var(--c-basic-soft);stroke:var(--c-basic);stroke-opacity:.4"/><ellipse cx="184" cy="150" rx="22" ry="44" style="fill:var(--c-basic-soft);stroke:var(--c-basic);stroke-opacity:.4"/>
      <path d="M150,80 L148,240" style="fill:none;stroke:var(--line);stroke-width:7;stroke-linecap:round"/>
      <path d="M158,168 C158,120 128,116 136,150 L138,256" style="fill:none;stroke:var(--crit);stroke-width:5;opacity:.55"/>
      <ellipse cx="162" cy="178" rx="22" ry="17" style="fill:var(--crit-soft);stroke:var(--crit);stroke-width:1.5"/>
      ${T(120, 108, 'akciğer', 'f29-ax', 'middle')}${T(112, 262, 'aort', 'f29-ax', 'end')}`;
    el.innerHTML = `<div class="f29-yw">${agac}<div class="f29-govde">${svgAc(300, 400, govde + Object.entries(LY).map(([kk, v]) => `<g class="f29-ly" data-ly="${kk}">${v}</g>`).join(''), 'Gövde şeması: kateter ve problar')}</div></div>`;
    const sec = (kk) => {
      basSec(el, 'y', kk);
      const on = new Set(Y[kk].ly);
      el.querySelectorAll('.f29-ly').forEach((g) => g.classList.toggle('on', on.has(g.dataset.ly)));
      cap(Y[kk].cap || NONCAP);
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-y]'); if (b) sec(b.dataset.y); });
    const dW = izle(el, () => {});
    return () => dW();
  };

  /* =====================================================================
     8 · Doğrudan Fick
     ===================================================================== */
  VIZ.f29_fick = (el) => {
    const cap = capY(el);
    const S = { vo2: 250, ca: 0.2, cv: 0.15 };
    el.innerHTML = `<div class="f29-sls">${sl('vo2', 'O₂ alımı (V̇O₂)', 150, 400, 10, 250)}${sl('ca', 'Arter O₂ içeriği (CaO₂)', 0.16, 0.22, 0.01, 0.2)}${sl('cv', 'Karışık venöz O₂ içeriği (CvO₂)', 0.08, 0.17, 0.01, 0.15)}</div>
      <div class="f29-ctl"><button type="button" class="btn ghost" data-a="ornek">Kitaptaki örnek</button></div><div class="f29-fig"></div>
      <p class="f29-not">Gerçek karışık venöz kan PAC ucundan: üst ve alt vena kava + koroner sinüs. Santral kateter ucu başlıca üst vena kava kanıdır → hata. [[K1 s. 125]]</p>`;
    const not = el.querySelector('.f29-not'); not.innerHTML = REF(not.innerHTML);
    const fig = el.querySelector('.f29-fig'), cvIn = el.querySelector('[data-k="cv"]');
    let L = null, gE = null, tt = 0;
    const mdl = () => { const fark = Math.round((S.ca - S.cv) * 100) / 100; return { fark, co: Math.round(S.vo2 / fark) }; };
    const eritro = () => {
      const { x0, x1, y0, y1 } = L, m = mdl(), hiz = (m.co / 5000) * 0.5, n = 14, mid = (x0 + x1) / 2;
      let s = '';
      for (let i = 0; i < n; i++) {
        const f = RM ? (i + 0.5) / n : (((tt * hiz + i / n) % 1) + 1) % 1, x = lerp(x0 + 6, x1 - 6, f), y = lerp(y0 + 10, y1 - 10, (Math.sin(i * 1.7) + 1) / 2);
        const ox = clamp((x - (mid - 50)) / 100, 0, 1);
        s += `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="7" ry="4.5" style="fill:${ox > 0.5 ? 'var(--crit)' : 'var(--c-basic)'};opacity:${(0.65 + 0.35 * Math.abs(ox - 0.5) * 2).toFixed(2)}"/>`;
      }
      const nO = Math.round(S.vo2 / 50);
      for (let i = 0; i < nO; i++) {
        const xx = lerp(mid - 70, mid + 70, nO > 1 ? i / (nO - 1) : 0.5), f = RM ? 0.6 : (((tt * 0.8 + i * 0.37) % 1) + 1) % 1;
        s += ok(xx, L.ay, xx, L.ay + 8 + 18 * f, 'var(--crit)', 2, 6);
      }
      return s;
    };
    const ciz = () => {
      const m = mdl(), dar = darMi(el);
      L = dar ? { W: 360, H: 380, x0: 20, x1: 340, y0: 140, y1: 196, ay: 104, sx: 180 } : { W: 760, H: 330, x0: 200, x1: 540, y0: 130, y1: 196, ay: 92, sx: 370 };
      const { x0, x1, y0, y1 } = L, mid = (x0 + x1) / 2, ca = fmt(S.ca, 2), cv = fmt(S.cv, 2), fk = fmt(m.fark, 2);
      let s = '';
      // spirometre ve alveol
      s += Rc(L.sx - 80, 12, 160, 34, 'fill:var(--c-clin-soft);stroke:var(--c-clin);stroke-width:2', ' rx="8"') + T(L.sx, 34, `V̇O₂ ${S.vo2} mL/dk`, 'f29-tb', 'middle');
      s += T(dar ? 10 : L.sx + 90, dar ? 62 : 26, 'Spirometre', 'f29-t', dar ? 'start' : 'start') + T(dar ? 10 : L.sx + 90, dar ? 78 : 42, '%100 O₂, CO₂ absorbanı', 'f29-s');
      s += Ln(L.sx, 46, L.sx, L.ay - 20, `stroke:var(--c-clin);stroke-width:3`);
      s += `<path d="M${mid - 100},${y0} C${mid - 100},${L.ay - 30} ${mid + 100},${L.ay - 30} ${mid + 100},${y0}" style="fill:var(--c-basic-soft);stroke:var(--c-basic);stroke-width:1.5"/>` + T(mid - 104, L.ay + 4, 'alveol', 'f29-s', 'end');
      s += Rc(x0, y0, x1 - x0, y1 - y0, `fill:var(--crit-soft);fill-opacity:.4;stroke:${MUTED};stroke-width:1.5`, ' rx="22"');
      s += `<g class="f29-e">${eritro()}</g>`;
      if (dar) {
        s += T(x0, y1 + 24, 'Karışık venöz kan (PAC)', 'f29-s', 'start', ' style="fill:var(--c-basic)"') + T(x0, y1 + 42, `CvO₂ ${cv}`, 'f29-n', 'start');
        s += T(x1, y1 + 24, 'Arter kanı (periferik)', 'f29-s', 'end', ' style="fill:var(--crit)"') + T(x1, y1 + 42, `CaO₂ ${ca}`, 'f29-n', 'end');
        s += T(180, y1 + 60, 'mL O₂/mL kan · akım →', 'f29-ax', 'middle');
        s += T(10, 290, 'CO = V̇O₂ / (CaO₂ − CvO₂)', 'f29-tb') + T(10, 314, `= ${S.vo2} / (${ca} − ${cv}) = ${S.vo2} / ${fk}`, 'f29-n') + T(10, 340, `= ${m.co} mL/dk`, 'f29-big', '', ' style="fill:var(--ok);font-size:20px"');
        const bx0 = 200, bx1 = 350, X = (c) => bx0 + ((bx1 - bx0) * clamp(c, 0, 15000)) / 15000;
        s += Rc(bx0, 350, bx1 - bx0, 12, `fill:var(--chip);stroke:${LINE}`, ' rx="4"') + Rc(bx0, 350, X(m.co) - bx0, 12, 'fill:var(--ok)', ' rx="4"') + T(bx1, 378, '0–15 L/dk', 'f29-ax', 'end');
      } else {
        s += cokSatir(x0 - 12, y0 + 10, 'Karışık venöz kan (PAC)', 14, 16, 'f29-s', 'end') + T(x0 - 12, y0 + 52, `CvO₂ ${cv}`, 'f29-n', 'end') + T(x0 - 12, y0 + 70, 'mL O₂/mL', 'f29-ax', 'end');
        s += cokSatir(x1 + 12, y0 + 10, 'Arter kanı (periferik arter)', 17, 16, 'f29-s') + T(x1 + 12, y0 + 52, `CaO₂ ${ca}`, 'f29-n') + T(x1 + 12, y0 + 70, 'mL O₂/mL', 'f29-ax');
        s += T(x0, 236, 'akım →', 'f29-ax');
        s += T(20, 282, `CO = V̇O₂ / (CaO₂ − CvO₂) = ${S.vo2} / (${ca} − ${cv}) = ${S.vo2} / ${fk} =`, 'f29-tb', '', ' style="font-size:16px"') + T(20, 314, `${m.co} mL/dk`, 'f29-big', '', ' style="fill:var(--ok)"');
        // bölünme çubukları
        const bb = 244, bt = 96;
        const Hf = (f) => ((bb - bt) * clamp(f, 0, 0.14)) / 0.14, Hc = (c) => ((bb - bt) * clamp(c, 0, 15000)) / 15000;
        s += Rc(668, bt, 24, bb - bt, `fill:var(--chip);stroke:${LINE}`) + Rc(668, bb - Hf(m.fark), 24, Hf(m.fark), 'fill:var(--warn)');
        s += Rc(716, bt, 24, bb - bt, `fill:var(--chip);stroke:${LINE}`) + Rc(716, bb - Hc(m.co), 24, Hc(m.co), 'fill:var(--ok)');
        s += T(680, bb + 18, 'AV farkı', 'f29-ax', 'middle') + T(728, bb + 18, 'CO', 'f29-ax', 'middle') + T(752, bb + 36, '0–15 L/dk', 'f29-ax', 'end') + T(680, bt - 8, fk, 'f29-n', 'middle') + T(728, bt - 8, `${fmt(m.co / 1000, 1)}`, 'f29-n', 'middle', ' style="fill:var(--ok)"');
      }
      fig.innerHTML = svgAc(L.W, L.H, s, 'Akciğer kapillerinde O₂ yüklenmesi ve Fick hesabı');
      gE = fig.querySelector('.f29-e');
      el.querySelector('[data-o="vo2"]').textContent = `${S.vo2} mL/dk`;
      el.querySelector('[data-o="ca"]').textContent = `${ca} mL O₂/mL`;
      el.querySelector('[data-o="cv"]').textContent = `${cv} mL O₂/mL`;
    };
    const esitle = () => {
      const mx = Math.round((S.ca - 0.02) * 100) / 100;
      cvIn.max = Math.min(0.17, mx);
      if (S.cv > mx) S.cv = mx;
      ['vo2', 'ca', 'cv'].forEach((k) => { el.querySelector(`[data-k="${k}"]`).value = S[k]; });
    };
    el.addEventListener('input', (e) => {
      const k = e.target.dataset && e.target.dataset.k; if (!k) return;
      S[k] = k === 'vo2' ? +e.target.value : Math.round(+e.target.value * 100) / 100;
      esitle(); ciz();
      const m = mdl();
      cap(`<b>V̇O₂ ${S.vo2} mL/dk ÷ (${fmt(S.ca, 2)} − ${fmt(S.cv, 2)}) mL O₂/mL = CO ${m.co} mL/dk.</b> Aynı O₂ alımında AV farkı küçüldükçe debi büyür; fark büyürse debi küçüktür. [[K1 s. 125]]`);
    });
    el.addEventListener('click', (e) => { if (e.target.closest('[data-a="ornek"]')) { Object.assign(S, { vo2: 250, ca: 0.2, cv: 0.15 }); esitle(); ciz(); cap(null); } });
    const dur = RM ? () => {} : ticker(el, (dt) => { tt += dt; if (gE) gE.innerHTML = eritro(); });
    const dW = izle(el, ciz);
    esitle(); ciz();
    return () => { dur(); dW(); };
  };

  /* =====================================================================
     9 · Dilüsyon eğrisi
     ===================================================================== */
  VIZ.f29_dilusyon = (el) => {
    const cap = capY(el);
    const S = { tab: 'boya', log: false, co: 5, tp: 20, ort: null, indGos: false };
    const egri = (co) => {
      const s = 5 / co, t0 = 2 * s, b = 1.6 * Math.pow(s, 0.6), A1 = 25 / co, K1 = A1 / (2 * b * b * b);
      const t02 = t0 + 5.5 * s, b2 = 2.0 * Math.pow(s, 0.6), K2 = (0.25 * A1) / (2 * b2 * b2 * b2);
      const g = (t, a, bb, K) => (t > a ? K * (t - a) * (t - a) * Math.exp(-(t - a) / bb) : 0);
      return { t0, b, A1, c1: (t) => g(t, t0, b, K1), c2: (t) => g(t, t02, b2, K2), tep: t0 + 2 * b };
    };
    const P5 = 2 * 5 * Math.exp(-2) / 1.6; // CO 5'te ilk geçiş tepesi (termodilüsyon ölçeği: −1,0 °C)
    const ADIM = ['Sağ atriyum', 'Sağ ventrikül', 'Pulmoner arter', 'Akciğer', 'Sol kalp', 'Periferik arter'];
    el.innerHTML = `<div class="f29-ctl"><div class="seg" role="group" aria-label="Yöntem"><button type="button" data-tab="boya" aria-pressed="true">Boya / lityum dilüsyonu</button><button type="button" data-tab="termo" aria-pressed="false">Termodilüsyon</button></div>
      <div class="seg" role="group" aria-label="Görünüm"><button type="button" data-lg="0" aria-pressed="true">doğrusal</button><button type="button" data-lg="1" aria-pressed="false">log₁₀</button></div></div>
      <div class="f29-sls">${sl('co', 'Kalp debisi', 2.5, 10, 0.5, 5)}</div>
      <div class="f29-ctl"><button type="button" class="btn" data-a="enj">Enjekte et ▶</button><button type="button" class="btn ghost" data-a="ort">3–4 ölçüm ortala</button></div>
      <div class="f29-fig"></div><p class="f29-oku"></p><p class="f29-not f29-yer"></p>`;
    const fig = el.querySelector('.f29-fig'), oku = el.querySelector('.f29-oku'), yer = el.querySelector('.f29-yer');
    let L = null, gG = null, gB = null;
    const grafik = () => {
      const { gx0, gx1, gy0, gy1 } = L, X = (t) => gx0 + ((gx1 - gx0) * t) / 20;
      const termo = S.tab === 'termo', E = egri(S.co);
      const yLin = termo ? (v) => gy1 + ((gy0 - gy1) * v) / 1.4 : (v) => gy0 - ((gy0 - gy1) * v) / 1.3;
      const yLog = (v) => gy0 - ((gy0 - gy1) * (Math.log10(Math.max(v, 1e-4)) + 2.2)) / 2.4;
      const deg = (t, kim) => { const c = kim === 1 ? E.c1(t) : kim === 2 ? (termo ? 0 : E.c2(t)) : E.c1(t) + (termo ? 0 : E.c2(t)); return termo ? c / P5 : c; };
      const tp = Math.min(20, S.tp), dt = 0.08;
      const Y = (v) => (S.log ? yLog(v) : yLin(v));
      const yol = (kim, alt) => { const p = []; for (let t = 0; t <= tp + 1e-6; t += dt) { const v = deg(t, kim); if (S.log && v < 0.006) continue; p.push([X(t), Y(v)]); } return p; };
      let s = '';
      const taban = S.log ? gy0 : termo ? gy1 : gy0;
      // soluk ortalama eğrileri
      if (termo && S.ort && !S.log) S.ort.forEach((c) => { const e2 = egri(c), p = []; for (let t = 0; t <= 20; t += 0.1) p.push([X(t), yLin(e2.c1(t) / P5)]); s += `<path d="${yolD(p)}" style="fill:none;stroke:var(--c-basic);stroke-width:1.6;opacity:.35"/>`; });
      if (!S.log) {
        const p1 = yol(1);
        if (p1.length > 1) s += `<path d="${yolD(p1)} L${r1(p1[p1.length - 1][0])},${taban} L${r1(p1[0][0])},${taban}Z" style="fill:${termo ? 'var(--c-basic)' : 'var(--ok)'};opacity:.25"/>`;
        if (!termo) { const p2 = yol(2); if (p2.length > 1) s += `<path d="${yolD(p2)}" style="fill:none;stroke:var(--warn);stroke-width:2;stroke-dasharray:6 4"/>`; }
        const p = yol(0); if (p.length > 1) s += `<path d="${yolD(p)}" style="fill:none;stroke:${termo ? 'var(--c-basic)' : INK};stroke-width:2.8"/>`;
        if (tp >= 20) {
          if (!termo) {
            s += T(X(E.tep) + 10, yLin(deg(E.tep, 0)) + 4, 'ilk geçiş', 'f29-s f29-hale', '', ' style="fill:var(--ok)"');
            const t2 = E.t0 + 5.5 * (5 / S.co) + 4.0 * Math.pow(5 / S.co, 0.6);
            if (t2 < 19) s += T(X(t2), yLin(deg(t2, 0)) - 12, 'resirkülasyon', 'f29-s f29-hale', 'middle', ' style="fill:var(--warn)"');
          } else s += T(X(E.tep) + 12, yLin(deg(E.tep, 0)) + 4, `en büyük düşüş ${fmt(-deg(E.tep, 0), 2)} °C`, 'f29-s f29-hale', '', ' style="fill:var(--c-basic)"');
        }
      } else {
        // log: iniş kolu doğru; %70–%30 aralığından uzatma
        const pk = deg(E.tep, 1);
        let t70 = E.tep, t30 = E.tep;
        while (deg(t70, 1) > 0.7 * pk && t70 < 20) t70 += 0.02;
        t30 = t70; while (deg(t30, 1) > 0.3 * pk && t30 < 20) t30 += 0.02;
        const egim = (Math.log10(deg(t30, 1)) - Math.log10(deg(t70, 1))) / (t30 - t70), c70 = deg(t70, 1);
        const ext = (t) => c70 * Math.pow(10, egim * (t - t70));
        const alan = [];
        for (let t = 0; t <= tp + 1e-6; t += dt) { const v = t < t70 ? deg(t, 1) : ext(t); if (v < 0.006) continue; alan.push([X(t), yLog(v)]); }
        if (alan.length > 1) s += `<path d="${yolD(alan)} L${r1(alan[alan.length - 1][0])},${gy0} L${r1(alan[0][0])},${gy0}Z" style="fill:${termo ? 'var(--c-basic)' : 'var(--ok)'};opacity:.25"/>`;
        const p = yol(0); if (p.length > 1) s += `<path d="${yolD(p)}" style="fill:none;stroke:${termo ? 'var(--c-basic)' : INK};stroke-width:2.6;${termo ? '' : 'opacity:.45'}"/>`;
        if (!termo) {
          const pp = yol(1).filter((q) => q[0] <= X(t70)); if (pp.length > 1) s += `<path d="${yolD(pp)}" style="fill:none;stroke:${INK};stroke-width:2.8"/>`;
          if (tp > t70) { const pe = []; for (let t = t70; t <= tp + 1e-6; t += dt) { const v = ext(t); if (v < 0.006) break; pe.push([X(t), yLog(v)]); } if (pe.length > 1) s += `<path d="${yolD(pe)}" style="fill:none;stroke:${INK};stroke-width:2;stroke-dasharray:7 5"/>`; }
          if (tp >= 20) s += T(X(t30) + 8, yLog(deg(t30, 1)) - 12, 'uzatılmış iniş kolu (doğru)', 'f29-s f29-hale');
        } else if (tp >= 20) s += T(X(t30) + 8, yLog(deg(t30, 1)) - 10, 'iniş kolu doğru', 'f29-s f29-hale');
      }
      return s;
    };
    const bolus = () => {
      const termo = S.tab === 'termo', E = egri(S.co), bas = termo ? 0 : 2, son = termo ? 2 : 5;
      if (S.tp >= 20 || RM) return '';
      const varis = E.t0, f = clamp(S.tp / varis, 0, 1), k = bas + (son - bas) * f;
      const i = Math.min(Math.floor(k), 5), fr = k - i, a = L.nod[i], b = L.nod[Math.min(i + 1, 5)];
      const x = lerp(a[0], b[0], fr), y = lerp(a[1], b[1], fr), sey = clamp((S.tp - varis) / (2.5 * E.b), 0, 1);
      return Ci(x, y, 7 + 10 * f + 6 * sey, `fill:${termo ? 'var(--c-basic)' : 'var(--ok)'};opacity:${(0.85 - 0.3 * f - 0.5 * sey).toFixed(2)}`);
    };
    const ciz = () => {
      const dar = darMi(el), termo = S.tab === 'termo';
      L = dar ? { W: 360, H: 436, gx0: 50, gx1: 348, gy0: 214, gy1: 24, cy: 296 } : { W: 760, H: 350, gx0: 330, gx1: 735, gy0: 300, gy1: 30 };
      const { gx0, gx1, gy0, gy1 } = L, X = (t) => gx0 + ((gx1 - gx0) * t) / 20;
      let s = '';
      // eksenler
      s += Ln(gx0, gy0, gx1, gy0, `stroke:${MUTED};stroke-width:1.4`) + Ln(gx0, gy0, gx0, gy1, `stroke:${MUTED};stroke-width:1.4`);
      [0, 5, 10, 15, 20].forEach((t) => { s += Ln(X(t), gy0, X(t), gy0 + 5, `stroke:${MUTED}`) + T(X(t), gy0 + 19, t, 'f29-ax', 'middle'); });
      s += T((gx0 + gx1) / 2, gy0 + 38, 'zaman (s)', 'f29-s', 'middle');
      if (S.log) {
        const yLog = (v) => gy0 - ((gy0 - gy1) * (Math.log10(v) + 2.2)) / 2.4;
        [[1, '1'], [0.1, '0,1'], [0.01, '0,01']].forEach(([v, l]) => { s += Ln(gx0, yLog(v), gx1, yLog(v), `stroke:${LINE}`) + T(gx0 - 6, yLog(v) + 4, l, 'f29-ax', 'end'); });
        s += T(gx0 + 6, gy1 - 8, termo ? 'log₁₀ (sıcaklık değişimi)' : 'log₁₀ (konsantrasyon)', 'f29-s');
      } else if (termo) {
        const yLin = (v) => gy1 + ((gy0 - gy1) * v) / 1.4;
        [[0, '0'], [0.5, '−0,5'], [1, '−1,0']].forEach(([v, l]) => { s += Ln(gx0, yLin(v), gx1, yLin(v), `stroke:${LINE}`) + T(gx0 - 6, yLin(v) + 4, l, 'f29-ax', 'end'); });
        s += T(gx0 + 6, gy0 - 8, 'Sıcaklık değişimi (°C)', 'f29-s');
      } else s += T(gx0 + 6, gy1 - 8, 'Konsantrasyon (birimsiz)', 'f29-s');
      s += `<g class="f29-g">${grafik()}</g>`;
      // yol şeması
      const inj = termo ? 0 : 2, olc = termo ? 2 : 5;
      if (!dar) {
        L.nod = ADIM.map((_, i) => [85, 44 + i * 52]);
        ADIM.forEach((a, i) => {
          const [x, y] = L.nod[i];
          s += Rc(20, y - 18, 130, 36, `fill:var(--paper);stroke:${i === inj ? (termo ? 'var(--c-basic)' : 'var(--ok)') : i === olc ? INK : LINE};stroke-width:${i === inj || i === olc ? 2.5 : 1.5}`, ' rx="8"') + T(x, y + 5, a, 'f29-t', 'middle');
          if (i < 5) s += ok(x, y + 18, x, y + 33, MUTED, 1.5, 6);
          if (i === inj) s += T(156, y + 5, '← enjeksiyon', 'f29-s', '', ` style="fill:${termo ? 'var(--c-basic)' : 'var(--ok)'}"`);
          if (i === olc) s += T(156, y + (inj === olc ? 22 : 5), '← ölçüm', 'f29-s', '', ' style="fill:var(--ink)"');
        });
      } else {
        const cy = L.cy;
        L.nod = [[62, cy], [180, cy], [298, cy], [298, cy + 86], [180, cy + 86], [62, cy + 86]];
        ADIM.forEach((a, i) => {
          const [x, y] = L.nod[i];
          s += Rc(x - 56, y - 17, 112, 34, `fill:var(--paper);stroke:${i === inj ? (termo ? 'var(--c-basic)' : 'var(--ok)') : i === olc ? INK : LINE};stroke-width:${i === inj || i === olc ? 2.5 : 1.5}`, ' rx="8"') + T(x, y + 5, a, 'f29-t', 'middle', ' style="font-size:13px"');
          if (i < 2) s += ok(x + 56, y, x + 62, y, MUTED, 1.5, 5); if (i === 2) s += ok(x + 44, y + 17, x + 44, y + 69, MUTED, 1.5, 6); if (i > 2 && i < 5) s += ok(x - 56, y, x - 62, y, MUTED, 1.5, 5);
          if (i === inj) s += T(x, y + 33, '↑ enjeksiyon', 'f29-s', 'middle', ` style="fill:${termo ? 'var(--c-basic)' : 'var(--ok)'}"`);
          if (i === olc) s += T(x, y + (i === inj ? 50 : 33), '↑ ölçüm', 'f29-s', 'middle', ' style="fill:var(--ink)"');
        });
      }
      s += `<g class="f29-bl">${bolus()}</g>`;
      fig.innerHTML = svgAc(L.W, L.H, s, 'Dilüsyon eğrisi ve indikatörün yolu');
      gG = fig.querySelector('.f29-g'); gB = fig.querySelector('.f29-bl');
      const alan = 25 / S.co;
      let o = `İndikatör miktarı sabit · Alan ${fmt(alan, 1)} (göreli) · CO = miktar / alan = ${fmt(S.co, 1)} L/dk`;
      if (termo && S.ort) o += ` · Ölçümler ${S.ort.map((c) => fmt(c, 1)).join(' · ')} → ortalama ${fmt(S.ort.reduce((a, b) => a + b, 0) / S.ort.length, 1)} L/dk`;
      oku.textContent = o;
      yer.textContent = termo ? 'Enjeksiyon: PAC\'nin proksimal lümeni, sağ atriyum · 10–15 mL soğuk serum. Ölçüm: PAC ucuna yakın termistör, pulmoner arter.'
        : 'Enjeksiyon: pulmoner arter (PAC). Ölçüm: periferik arter kateteri (boya: dansitometre; lityum: lityum elektrodu).';
      el.querySelector('[data-o="co"]').textContent = `${fmt(S.co, 1)} L/dk`;
      el.querySelector('[data-a="ort"]').hidden = !termo;
      basSec(el, 'tab', S.tab); basSec(el, 'lg', S.log ? 1 : 0);
    };
    const capYaz = () => {
      if (S.tab === 'termo') cap(`<b>Termodilüsyon, CO ${fmt(S.co, 1)} L/dk.</b> 10–15 mL soğuk serum sağ atriyumdan verilir, termistör pulmoner arter kanının soğumasını kaydeder. İkinci tepe yoktur ve kan örneği gerekmez. CO = V (T<sub>B</sub> − T<sub>I</sub>) K₁K₂ / alan. [[K1 s. 126]]`);
      else if (S.log) cap('<b>Log dönüşümü.</b> İkinci kez gelen indikatör ikinci bir tepe yapar ve alanı ölçmeyi zorlaştırır. Konsantrasyonun logaritması alınınca ilk eğrinin iniş kolu doğru olur; uzatılarak ilk geçişin alanı daha kolay ölçülür. Bu sorunu kısmen çözer. [[K1 s. 125]]');
      else cap(`<b>Boya dilüsyonu, CO ${fmt(S.co, 1)} L/dk.</b> Aynı miktar indikatör daha çok kanla, daha kısa sürede seyrelir: eğri altındaki alan küçülür. CO = indikatör miktarı / alan (Stewart–Hamilton). [[K1 s. 125]]`);
    };
    el.addEventListener('input', (e) => { if (e.target.dataset.k !== 'co') return; S.co = +e.target.value; S.ort = null; S.tp = 20; ciz(); capYaz(); });
    el.addEventListener('click', (e) => {
      const tb = e.target.closest('[data-tab]'), lg = e.target.closest('[data-lg]'), a = e.target.closest('[data-a]');
      if (tb && tb.dataset.tab !== S.tab) {
        S.tab = tb.dataset.tab; S.ort = null; S.tp = 20; ciz();
        if (S.tab === 'boya' && !S.indGos) { S.indGos = true; cap('<b>İndikatörler.</b> Geleneksel olarak indosiyanin yeşili (düşük toksisite, kısa yarı ömür); seçenek olarak arter kateterindeki elektrotla ölçülen lityum. Pulmoner artere vermek için PAC gerekir. [[K1 s. 125]]'); } else capYaz();
      } else if (lg) { S.log = lg.dataset.lg === '1'; ciz(); capYaz(); }
      else if (a && a.dataset.a === 'enj') { S.tp = RM ? 20 : 0; ciz(); capYaz(); }
      else if (a && a.dataset.a === 'ort') { S.ort = [0, 1, 2].map(() => S.co * (1 + (Math.random() * 2 - 1) * 0.08)); S.tp = 20; ciz(); cap('<b>Ortalama.</b> Enjeksiyon hızındaki değişkenlik gibi hatalar 3–4 ölçümün ortalamasıyla azalır. IABP ve aritmide de doğru kullanılabilir. [[K1 s. 126]]'); }
    });
    const dur = RM ? () => {} : ticker(el, (dt) => {
      if (S.tp >= 20 || !gG) return;
      S.tp = Math.min(20, S.tp + dt * 4); gG.innerHTML = grafik(); gB.innerHTML = bolus();
    });
    const dW = izle(el, ciz);
    ciz();
    return () => { dur(); dW(); };
  };

  /* =====================================================================
     10 · Nabız konturu ve SVV
     ===================================================================== */
  VIZ.f29_kontur = (el) => {
    const cap = capY(el);
    const S = { v: 85, mod: null, tau: 0, son: null };
    const MOD = { asiri: 'Aşırı sönümlü trase', yetersiz: 'Yetersiz sönümlü trase', aritmi: 'Aritmi', ay: 'Aort yetersizliği', iabp: 'İntraaortik balon pompası' };
    const mdl = (v) => {
      const svv = 25 - 0.2 * v, sv = v <= 60 ? 42 + 0.45 * v : v <= 85 ? 69 + 0.06 * (v - 60) : 70.5, hr = 90 - 0.2 * Math.min(v, 60);
      return { svv, sv, hr, co: (sv * hr) / 1000 };
    };
    let rnd = tohum(7), vurular = [];
    const yeniVuru = (t0) => {
      const m = mdl(S.v);
      let T0 = 60 / m.hr, sv = m.sv * (1 + (m.svv / 200) * Math.sin((2 * Math.PI * t0) / 5));
      if (S.mod === 'aritmi') { T0 *= 0.6 + 0.8 * rnd(); sv *= 0.7 + 0.6 * rnd(); }
      return { t0, T0, sv, mod: S.mod };
    };
    const uret = (tEnd) => { let t = vurular.length ? vurular[vurular.length - 1].t0 + vurular[vurular.length - 1].T0 : 0; while (t < tEnd) { const b = yeniVuru(t); vurular.push(b); t += b.T0; } };
    const basinç = (b, u) => {
      const ts = 0.32, T0 = b.T0, PP0 = (40 * b.sv) / 70;
      let PP = PP0, Pd = 85 - PP0 / 3, f;
      const yuk = u <= 0.09 ? Math.pow(Math.sin((Math.PI / 2) * (u / 0.09)), 2) : 0;
      const dia = (a, k = 1.3, s0 = ts + 0.08) => a * Math.pow(clamp(1 - (u - s0) / (T0 - s0), 0, 1), k);
      if (b.mod === 'asiri') {
        f = u <= 0.16 ? 0.75 * Math.pow(Math.sin((Math.PI / 2) * (u / 0.16)), 2) : 0.75 * Math.pow(clamp(1 - (u - 0.16) / (T0 - 0.16), 0, 1), 1.5);
      } else if (b.mod === 'ay') {
        PP = PP0 * 1.7; Pd = 85 - PP0 / 3 - 16;
        f = u <= 0.09 ? yuk : u <= ts ? 1 - 0.5 * ((u - 0.09) / (ts - 0.09)) : 0.5 * Math.pow(clamp(1 - (u - ts) / (T0 - ts), 0, 1), 2);
      } else {
        f = u <= 0.09 ? yuk : u <= ts ? 1 - 0.45 * Math.pow((u - 0.09) / (ts - 0.09), 1.3) : u <= ts + 0.08 ? 0.5 + 0.08 * Math.sin(Math.PI * ((u - ts) / 0.08)) : dia(0.5);
        if (b.mod === 'yetersiz') { f *= u <= 0.09 ? 1.3 : 1; if (u > 0.09) f += 0.2 * Math.exp(-(u - 0.09) / 0.09) * Math.sin((2 * Math.PI * (u - 0.09)) / 0.07); if (u > 0.09 && u < 0.14) f += 0.3 * (1 - (u - 0.09) / 0.05); }
        if (b.mod === 'iabp' && u > ts + 0.04 && u < ts + 0.32) f += 0.85 * Math.sin(Math.PI * ((u - ts - 0.04) / 0.28));
      }
      return Pd + PP * f;
    };
    el.innerHTML = `<div class="f29-sls"><label class="f29-sl"><span><span>Volüm durumu</span><b data-o="v"></b></span><input type="range" data-k="v" min="0" max="100" step="1" value="85"><span class="f29-not" style="display:flex;justify-content:space-between;margin:0"><span>hipovolemik</span><span>dolu</span></span></label></div>
      <div class="f29-ctl"><button type="button" class="btn" data-a="sivi">Sıvı ver (+%20 volüm)</button></div>
      <div class="f29-segk"><span>Yanıltan durumlar</span><div class="f29-yan">${dugmeler(Object.entries(MOD), 'md')}</div></div>
      <div class="f29-fig" style="margin-top:12px"></div><p class="f29-oku"></p>`;
    const fig = el.querySelector('.f29-fig'), oku = el.querySelector('.f29-oku'), inp = el.querySelector('input');
    let L = null, gD = null, gS = null;
    const dalga = () => {
      const { wx0, wx1, wy0, wy1, W: pen } = L, tau = S.tau, Xt = (t) => wx1 - ((wx1 - wx0) * (tau - t)) / pen, Yp = (p) => wy0 - ((wy0 - wy1) * (clamp(p, 48, 132) - 50)) / 80;
      let s = '';
      // solunum
      const rp = []; for (let t = tau - pen; t <= tau + 1e-6; t += 0.05) rp.push([Xt(t), (wy0 + wy1) / 2 + 22 * Math.sin((2 * Math.PI * t) / 5)]);
      s += `<path d="${yolD(rp)}" style="fill:none;stroke:var(--muted);stroke-width:1.2;opacity:.55"/>`;
      const pts = [];
      vurular.forEach((b) => {
        if (b.t0 + b.T0 < tau - pen || b.t0 > tau) return;
        const alanP = [];
        for (let u = 0; u < b.T0; u += 0.012) {
          const t = b.t0 + u; if (t < tau - pen || t > tau) continue;
          const pt = [Xt(t), Yp(basinç(b, u))]; pts.push(pt); if (u <= 0.32) alanP.push(pt);
        }
        if (alanP.length > 1) s += `<path d="${yolD(alanP)} L${r1(alanP[alanP.length - 1][0])},${wy0} L${r1(alanP[0][0])},${wy0}Z" style="fill:var(--accent);opacity:.25"/>`;
      });
      if (pts.length > 1) s += `<path d="${yolD(pts)}" style="fill:none;stroke:var(--crit);stroke-width:2.4;stroke-linejoin:round"/>`;
      return s;
    };
    const svBar = () => {
      const { bx0, bx1, by0, by1 } = L, son = vurular.filter((b) => b.t0 + b.T0 <= S.tau && b.t0 >= S.tau - 5 - b.T0).slice(-7);
      let s = T(bx0, by1 - 8, 'Son solunum döngüsünde vuruların SV\'si', 'f29-s');
      if (!son.length) return s;
      const mx = Math.max(...son.map((b) => b.sv)), mn = Math.min(...son.map((b) => b.sv)), w = (bx1 - bx0) / 7, Y = (v) => by0 - ((by0 - by1 - 22) * (v - 30)) / 70;
      son.forEach((b, i) => {
        const x = bx0 + i * w + w * 0.2, isMx = b.sv === mx, isMn = b.sv === mn;
        s += Rc(x, Y(b.sv), w * 0.6, by0 - Y(b.sv), `fill:var(--c-basic);opacity:${isMx || isMn ? 1 : 0.55}`, ' rx="2"');
        if (isMx) s += T(x + w * 0.3, Y(b.sv) - 5, 'SVmax', 'f29-ax', 'middle', ' style="fill:var(--ink)"');
        else if (isMn) s += T(x + w * 0.3, Y(b.sv) - 5, 'SVmin', 'f29-ax', 'middle', ' style="fill:var(--ink)"');
      });
      return s + Ln(bx0, by0, bx1, by0, `stroke:${MUTED}`);
    };
    const ornek = (ox, oy) => {
      const X = (u) => ox + 24 + u * 280, Y = (p) => oy + 116 - ((p - 60) / 60) * 82;
      const b = { T0: 0.8, sv: 70, mod: null };
      const p = [], a = [];
      for (let u = 0; u <= 0.8; u += 0.01) { const q = [X(u), Y(basinç(b, u))]; p.push(q); if (u <= 0.32) a.push(q); }
      for (let u = 0; u <= 0.16; u += 0.01) p.push([X(0.8 + u), Y(basinç(b, u))]);
      let s = Rc(ox, oy, 360, 172, `fill:var(--paper);stroke:${LINE};stroke-width:1.5`, ' rx="10"') + T(ox + 10, oy + 18, 'Örnek vuru', 'f29-t');
      s += `<path d="${yolD(a)} L${r1(a[a.length - 1][0])},${r1(Y(60))} L${r1(a[0][0])},${r1(Y(60))}Z" style="fill:var(--accent);opacity:.3"/>` + `<path d="${yolD(p)}" style="fill:none;stroke:var(--crit);stroke-width:2.2"/>`;
      s += T(X(0.16), Y(80), 'AUC', 'f29-tb', 'middle');
      const br = (u1, u2, y, t) => Ln(X(u1), y, X(u2), y, `stroke:${INK};stroke-width:1.2`) + Ln(X(u1), y - 4, X(u1), y + 4, `stroke:${INK}`) + Ln(X(u2), y - 4, X(u2), y + 4, `stroke:${INK}`) + T((X(u1) + X(u2)) / 2, y + 15, t, 'f29-s', 'middle', ' style="fill:var(--ink)"');
      s += br(0, 0.8, oy + 32, '') + T(X(0.4), oy + 28, 'vurudan vuruya aralık', 'f29-s', 'middle', ' style="fill:var(--ink)"');
      s += br(0, 0.32, Y(60) + 8, 'sistolik evre') + br(0.32, 0.8, Y(60) + 8, 'diyastolik evre');
      s += br(0, 0.8, Y(60) + 34, 'nabız süresi');
      s += T(ox + 350, oy + 18, 'CO ∝ AUC × HR', 'f29-tb', 'end', ' style="fill:var(--ok)"');
      return s;
    };
    const svvGos = (m) => {
      const { gx0, gx1, gy } = L, X = (v) => gx0 + ((gx1 - gx0) * clamp(v, 0, 30)) / 30;
      let s = T(gx0, gy - 10, 'SVV (atım hacmi değişkenliği)', 'f29-t');
      s += Rc(X(0), gy, X(10) - X(0), 18, 'fill:var(--muted);opacity:.25') + Rc(X(10), gy, X(15) - X(10), 18, 'fill:var(--chip)') + Rc(X(15), gy, X(30) - X(15), 18, 'fill:var(--ok-soft);stroke:var(--ok)');
      [0, 10, 15, 30].forEach((v) => { s += T(X(v), gy + 32, `%${v}`, 'f29-ax', 'middle'); });
      s += T(X(5), gy + 50, 'yanıt olası değil', 'f29-s', 'middle') + T(X(12.5), gy + 50, 'ara', 'f29-s', 'middle') + T(X(22.5), gy + 50, 'sıvıyla CO ↑ olası', 'f29-s', 'middle', ' style="fill:var(--ok)"');
      s += `<path d="M${r1(X(m.svv))},${gy + 20} l-7,-12 l14,0Z" style="fill:${INK}"/>` + Ln(X(m.svv), gy - 4, X(m.svv), gy + 20, `stroke:${INK};stroke-width:2.5`);
      return s;
    };
    const ciz = () => {
      const dar = darMi(el), m = mdl(S.v);
      L = dar ? { Wv: 360, H: 600, W: 4, wx0: 44, wx1: 352, wy0: 176, wy1: 14, gx0: 14, gx1: 346, gy: 226, bx0: 14, bx1: 346, by0: 404, by1: 318, ox: 0, oy: 422 }
        : { Wv: 760, H: 394, W: 6, wx0: 52, wx1: 745, wy0: 186, wy1: 14, gx0: 400, gx1: 745, gy: 334, bx0: 400, bx1: 745, by0: 290, by1: 222, ox: 10, oy: 214 };
      let s = '';
      const Yp = (p) => L.wy0 - ((L.wy0 - L.wy1) * (p - 50)) / 80;
      [60, 80, 100, 120].forEach((p) => { s += Ln(L.wx0, Yp(p), L.wx1, Yp(p), `stroke:${LINE}`) + T(L.wx0 - 6, Yp(p) + 4, p, 'f29-ax', 'end'); });
      s += T(L.wx0 + 4, L.wy1 + 2, 'mmHg', 'f29-ax') + T(L.wx1, L.wy1 + 2, `son ${L.W} s · ince çizgi: solunum döngüsü`, 'f29-s', 'end');
      s += `<g class="f29-d">${dalga()}</g><g class="f29-sb">${svBar()}</g>` + svvGos(m) + ornek(L.ox, L.oy);
      fig.innerHTML = svgAc(L.Wv, L.H, s, 'Arter basınç dalgası, SV çubukları ve SVV göstergesi');
      gD = fig.querySelector('.f29-d'); gS = fig.querySelector('.f29-sb');
      el.querySelector('[data-o="v"]').textContent = S.v;
      oku.textContent = `HR ${n0(m.hr)} · SV ${n0(m.sv)} mL · CO ${fmt(m.co, 1)} L/dk · SVV %${n0(m.svv)}${S.mod ? ' · tahmin güvenilmez' : ''}`;
      oku.classList.toggle('f29-uyari', !!S.mod);
      basSec(el, 'md', S.mod || '');
    };
    const capSvv = () => {
      const s = n0(mdl(S.v).svv), v = mdl(S.v).svv;
      if (S.mod) return cap(`<b>${MOD[S.mod]}.</b> Nabız konturu analizi genel olarak PAC termodilüsyonuyla iyi korelasyon gösterir, ama aşırı ya da yetersiz sönümlü trase, aritmi, aort yetersizliği ve intraaortik balon pompası tahmini bozar. [[K1 s. 128]]`);
      if (v >= 15) cap(`<b>SVV %${s}.</b> Venöz dönüş intratorasik basınçla değiştikçe SV solunum döngüsü içinde belirgin oynuyor: sıvıyla CO büyük olasılıkla artar. [[K1 s. 127]]`);
      else if (v >= 10) cap(`<b>SVV %${s}.</b> Kitap bu aralık için eşik vermez: %15 ve üzeri yanıt olası, %10'un altı olası değil. [[K1 s. 127]]`);
      else cap(`<b>SVV %${s}.</b> SV solunumla az değişiyor: ek sıvı CO'yu büyük olasılıkla artırmaz. [[K1 s. 127]]`);
    };
    const sabit = () => { if (!RM) { vurular = vurular.filter((b) => b.t0 <= S.tau); uret(S.tau + 0.5); return; } vurular = []; rnd = tohum(7); S.tau = 6.5; uret(7); };
    el.addEventListener('input', (e) => { if (e.target !== inp) return; S.v = +inp.value; sabit(); ciz(); capSvv(); });
    el.addEventListener('click', (e) => {
      const a = e.target.closest('[data-a="sivi"]'), md = e.target.closest('[data-md]');
      if (a) {
        const c0 = mdl(S.v).co; S.v = Math.min(100, S.v + 20); inp.value = S.v; sabit(); ciz();
        const m = mdl(S.v); cap(`<b>Sıvı verildi.</b> CO ${fmt(c0, 1)} → ${fmt(m.co, 1)} L/dk, SVV %${n0(m.svv)}. [[K1 s. 127]]`);
      } else if (md) { S.mod = S.mod === md.dataset.md ? null : md.dataset.md; sabit(); ciz(); capSvv(); }
    });
    uret(1);
    const dur = RM ? () => {} : ticker(el, (dt) => {
      S.tau += dt; uret(S.tau + 0.2);
      if (vurular.length > 40) vurular = vurular.filter((b) => b.t0 + b.T0 > S.tau - 8);
      if (gD) gD.innerHTML = dalga();
      if (gS && Math.floor(S.tau * 4) !== S.son) { S.son = Math.floor(S.tau * 4); gS.innerHTML = svBar(); }
    });
    if (RM) sabit(); else { S.tau = 6; uret(7); }
    const dW = izle(el, ciz);
    ciz();
    return () => { dur(); dW(); };
  };

  /* =====================================================================
     11 · Özofageal Doppler ve TÖE
     ===================================================================== */
  VIZ.f29_doppler = (el) => {
    const cap = capY(el);
    const D = {
      norm: { ad: 'Normal', pv: 100, ftc: 350, sd: 15, hr: 75, cap: null },
      hipo: { ad: 'Hipovolemi', pv: 95, ftc: 290, sd: 10, hr: 100, cap: '<b>Hipovolemi.</b> FTc 290 ms: normalin (330–360 ms) altında. FTc ön yükü yansıtır; düşük FTc hipovolemiyi ya da artmış ard yükü düşündürür. [[K1 s. 129]]' },
      ard: { ad: 'Artmış ard yük', pv: 85, ftc: 300, sd: 12, hr: 75, cap: '<b>Artmış ard yük.</b> FTc yine düşük (300 ms): düşük FTc hipovolemiyi ya da artmış ard yükü düşündürür, iki nedeni birlikte düşünün. [[K1 s. 129]]' },
      vd: { ad: 'Vazodilatasyon', pv: 100, ftc: 400, sd: 17, hr: 90, cap: '<b>Vazodilatasyon.</b> FTc 400 ms: yüksek FTc vazodilatasyonu düşündürür. [[K1 s. 129]]' },
      kon: { ad: 'Kontraktilite düşük', pv: 55, ftc: 340, sd: 11, hr: 85, cap: '<b>Kontraktilite düşük.</b> Tepe hız (PV) sol ventrikül kontraktilitesinin göstergesidir; burada 55 cm/s. Normali yaşla değişir: 20 yaşta 90–120, 70 yaşta 50–80 cm/s. [[K1 s. 128]]' },
    };
    const ALAN = 3.3;
    const S = { tab: 'eso', d: 'norm', yas: 20, yol: 'hac', t: 0 };
    el.innerHTML = `<div class="f29-ctl"><div class="seg" role="group" aria-label="Sekme"><button type="button" data-tab="eso" aria-pressed="true">Özofageal Doppler</button><button type="button" data-tab="toe" aria-pressed="false">TÖE</button></div></div>
      <div class="f29-p1"><div class="f29-ctl f29-seg">${dugmeler(Object.entries(D).map(([k, v]) => [k, v.ad]), 'dd')}</div>
        <div class="f29-ctl"><div class="seg" role="group" aria-label="Yaş"><button type="button" data-yas="20" aria-pressed="true">20 yaş</button><button type="button" data-yas="70" aria-pressed="false">70 yaş</button></div></div></div>
      <div class="f29-p2" hidden><div class="f29-ctl f29-seg">${dugmeler([['hac', 'Hacimlerden'], ['lvot', 'LVOT Doppler\'ından']], 'yl')}</div></div>
      <div class="f29-fig"></div><div class="f29-oku"></div><p class="f29-not"></p>`;
    const fig = el.querySelector('.f29-fig'), oku = el.querySelector('.f29-oku'), not = el.querySelector('.f29-not');
    let L = null, gA = null;
    const hes = () => {
      const d = D[S.d], pv = S.d === 'norm' && S.yas === 70 ? 65 : d.pv;
      const fd = (2 * 4e6 * (pv / 100) * Math.cos(Math.PI / 4)) / 1540 / 1000, aort = d.sd * ALAN, sv = Math.round(aort / 0.7 + 1e-9);
      return { ...d, pv, fd, aort, sv, co: (sv * d.hr) / 1000, T0: 60 / d.hr, ft: (d.ftc / 1000) * Math.sqrt(60 / d.hr) };
    };
    const P = (x, y) => [L.ox + x * L.k, L.oy + y * L.k];
    const pp = (x, y) => P(x, y).map(r1).join(',');
    const anatomiAnim = () => {
      const t = S.t, k = L.k;
      let s = '';
      for (let i = 0; i < 7; i++) { const f = RM ? i / 7 : (((t * 0.7 + i / 7) % 1) + 1) % 1; const [x, y] = P(120 + Math.sin(i * 2.3) * 8, 118 + f * 240); s += Ci(x, y, 3.4 * Math.max(k, 0.8), 'fill:var(--crit)'); }
      const nab = RM ? 0.3 : 0.22 + 0.14 * (0.5 + 0.5 * Math.sin(t * 6));
      const tip = [158, 276], dir = [-0.7071, -0.7071], per = [0.7071, -0.7071], len = 76;
      const e1 = [tip[0] + dir[0] * len + per[0] * 13, tip[1] + dir[1] * len + per[1] * 13], e2 = [tip[0] + dir[0] * len - per[0] * 13, tip[1] + dir[1] * len - per[1] * 13];
      s += `<path d="M${pp(...tip)} L${pp(...e1)} L${pp(...e2)}Z" style="fill:var(--accent);opacity:${nab.toFixed(2)}"/>`;
      return s;
    };
    const anatomi = () => {
      const k = L.k;
      let s = '';
      s += `<path d="M${pp(214, 186)} C${pp(214, 70)} ${pp(120, 50)} ${pp(120, 130)} L${pp(120, 365)}" style="fill:none;stroke:var(--muted);stroke-width:${r1(40 * k)};opacity:.5"/>`;
      s += `<path d="M${pp(214, 186)} C${pp(214, 70)} ${pp(120, 50)} ${pp(120, 130)} L${pp(120, 365)}" style="fill:none;stroke:var(--crit-soft);stroke-width:${r1(36 * k)}"/>`;
      [[134, 76], [146, 70], [196, 80]].forEach(([x, y]) => { const [a, b] = P(x, y), [c, d] = P(x + 4, y - 26); s += ok(a, b, c, d, 'var(--crit)', 2, 6); });
      const [hx, hy] = P(222, 236);
      s += `<ellipse cx="${r1(hx)}" cy="${r1(hy)}" rx="${r1(44 * k)}" ry="${r1(54 * k)}" style="fill:var(--crit-soft);stroke:var(--crit);stroke-width:1.5"/>`;
      s += `<path d="M${pp(163, 14)} L${pp(163, 365)}" style="fill:none;stroke:var(--chip);stroke-width:${r1(22 * k)};opacity:.75"/><path d="M${pp(163, 14)} L${pp(163, 365)}" style="fill:none;stroke:var(--line);stroke-width:${r1(24 * k)};opacity:.6"/>`;
      s += `<path d="M${pp(163, 6)} L${pp(162, 270)}" style="fill:none;stroke:var(--ink);stroke-width:2.5"/>`;
      const [tx, ty] = P(156, 266); s += Rc(tx, ty, 12 * k, 20 * k, 'fill:var(--warn)', ' rx="3"');
      // eksen ve açı
      s += `<path d="M${pp(120, 150)} L${pp(120, 300)}" style="fill:none;stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 4"/>`;
      const [ax, ay] = P(120, 238), r = 26 * k;
      s += `<path d="M${r1(ax)},${r1(ay - r)} A${r1(r)},${r1(r)} 0 0 0 ${r1(ax - r * 0.7071)},${r1(ay - r * 0.7071)}" style="fill:none;stroke:var(--ink);stroke-width:1.8"/>`;
      s += `<g class="f29-an">${anatomiAnim()}</g>`;
      const [rx1, ry1] = P(128, 250), [rx2, ry2] = P(150, 272); s += ok(rx1, ry1, rx2, ry2, 'var(--accent-ink)', 1.6, 6);
      return s;
    };
    const ciz = () => {
      const dar = darMi(el), h = hes();
      basSec(el, 'tab', S.tab); basSec(el, 'dd', S.d); basSec(el, 'yas', S.yas); basSec(el, 'yl', S.yol);
      el.querySelector('.f29-p1').hidden = S.tab !== 'eso'; el.querySelector('.f29-p2').hidden = S.tab !== 'toe';
      let s = '';
      if (S.tab === 'eso') {
        L = dar ? { W: 360, H: 690, ox: 84, oy: 4, k: 0.7, wx0: 46, wx1: 350, wy0: 434, wy1: 300, gy: 540, dar: true } : { W: 760, H: 400, ox: 10, oy: 4, k: 1, wx0: 360, wx1: 740, wy0: 200, wy1: 28, gy: 318 };
        s += anatomi();
        const lb = (x, y, t, a = 'start', st = '') => { const [qx, qy] = P(x, y); return T(qx, qy, t, 'f29-s f29-hale', a, st); };
        if (dar) {
          s += T(10, 30, 'SV\'nin %30\'u', 'f29-s') + T(10, 46, '→ üst vücut', 'f29-s');
          const [q1, q2] = P(120, 330); s += T(q1 - 16, q2, '%70 →', 'f29-tb f29-hale', 'end', ' style="fill:var(--crit)"') + T(q1 - 16, q2 + 16, 'inen aort', 'f29-s', 'end');
          const [a1, a2] = P(120, 238); s += T(a1 - 18, a2 - 14, 'θ = 45°', 'f29-tb f29-hale', 'end');
          const [p1, p2] = P(168, 300); s += T(p1 + 6, p2, 'prob', 'f29-s f29-hale') + T(p1 + 6, p2 + 16, '(özofagus)', 'f29-s f29-hale');
          const [k1, k2] = P(222, 236); s += T(k1 + 32, k2 + 4, 'kalp', 'f29-s');
          s += T(10, 270, `kesit alanı ${fmt(ALAN, 1)} cm²`, 'f29-n');
        } else {
          s += lb(196, 40, 'SV\'nin %30\'u') + lb(196, 56, '→ üst vücut') + lb(112, 330, '%70', 'end', ' style="fill:var(--crit);font-weight:750"') + lb(112, 312, 'inen aort', 'end');
          s += lb(100, 214, 'θ = 45°', 'end', ' style="font-weight:750;fill:var(--ink)"') + lb(176, 300, 'prob (özofagus)') + lb(222, 240, 'kalp', 'middle');
          s += lb(163, 12, 'özofagus', 'middle');
          s += T(20, 392, `kesit alanı ${fmt(ALAN, 1)} cm² (nomogram; yeni cihazlarda M-mod)`, 'f29-s');
        }
        // hız–zaman dalgası
        const { wx0, wx1, wy0, wy1 } = L, X = (t) => wx0 + ((wx1 - wx0) * t) / 2, Y = (v) => wy0 - ((wy0 - wy1) * v) / 140;
        [0, 40, 80, 120].forEach((v) => { s += Ln(wx0, Y(v), wx1, Y(v), `stroke:${LINE}`) + T(wx0 - 6, Y(v) + 4, v, 'f29-ax', 'end'); });
        [0, 1, 2].forEach((t) => { s += T(X(t), wy0 + 17, `${t} s`, 'f29-ax', 'middle'); });
        s += T(wx0 + 4, wy1 - 8, 'hız (cm/s)', 'f29-s');
        const hiz = (u) => (u < 0 || u > h.ft ? 0 : u < 0.3 * h.ft ? h.pv * Math.sin((Math.PI / 2) * (u / (0.3 * h.ft))) : h.pv * Math.cos((Math.PI / 2) * ((u - 0.3 * h.ft) / (0.7 * h.ft))));
        const pts = [];
        for (let t = 0; t <= 2.0001; t += 0.005) { const n = Math.floor((t - 0.1) / h.T0), u = t - 0.1 - n * h.T0; pts.push([X(t), Y(t < 0.1 ? 0 : hiz(u))]); }
        const a1 = []; for (let u = 0; u <= h.ft + 1e-6; u += 0.005) a1.push([X(0.1 + u), Y(hiz(u))]);
        s += `<path d="${yolD(a1)} Z" style="fill:var(--accent);opacity:.3"/>` + `<path d="${yolD(pts)}" style="fill:none;stroke:var(--accent-ink);stroke-width:2.4"/>`;
        s += T(X(0.1 + h.ft * 0.45), Y(h.pv * 0.35), 'VTI = SD', 'f29-tb f29-hale', 'middle');
        s += Ci(X(0.1 + 0.3 * h.ft), Y(h.pv), 4, `fill:${INK}`) + T(X(0.1 + 0.3 * h.ft) + 8, Y(h.pv) - 6, `tepe hız (PV) ${h.pv}`, 'f29-s f29-hale');
        const br = (t1, t2, y, t) => Ln(X(t1), y, X(t2), y, `stroke:${INK};stroke-width:1.2`) + Ln(X(t1), y - 4, X(t1), y + 4, `stroke:${INK}`) + Ln(X(t2), y - 4, X(t2), y + 4, `stroke:${INK}`) + T(X(t1), y + 15, t, 'f29-ax', 'start', ' style="fill:var(--ink)"');
        s += br(0.1, 0.1 + h.ft, wy0 + 32, `akım süresi ${n0(h.ft * 1000)} ms`) + br(0.1, 0.1 + h.T0, wy0 + 60, `siklus süresi ${fmt(h.T0, 2)} s`);
        // göstergeler
        const g = (x0, x1, y, ad, lo, hi, nlo, nhi, val, metin) => {
          const X2 = (v) => x0 + ((x1 - x0) * (clamp(v, lo, hi) - lo)) / (hi - lo);
          return T(x0, y, ad, 'f29-t') + T(x1, y, metin, 'f29-n', 'end') + Rc(x0, y + 8, x1 - x0, 14, `fill:var(--chip);stroke:${LINE}`, ' rx="4"')
            + (nlo != null ? Rc(X2(nlo), y + 8, X2(nhi) - X2(nlo), 14, 'fill:var(--ok-soft);stroke:var(--ok)') : '') + Ln(X2(val), y + 3, X2(val), y + 27, `stroke:${INK};stroke-width:3`);
        };
        const [b1, b2] = S.yas === 20 ? [90, 120] : [50, 80];
        if (dar) {
          s += g(14, 346, L.gy, 'PV (normal ' + b1 + '–' + b2 + ')', 0, 140, b1, b2, h.pv, `${h.pv} cm/s`);
          s += g(14, 346, L.gy + 52, 'FTc (normal 330–360)', 200, 450, 330, 360, h.ftc, `${h.ftc} ms`);
          s += g(14, 346, L.gy + 104, 'CO', 0, 10, null, null, h.co, `${fmt(h.co, 1)} L/dk`);
        } else {
          s += g(360, 480, L.gy, 'PV', 0, 140, b1, b2, h.pv, `${h.pv}`) + T(360, L.gy + 44, `normal ${b1}–${b2} cm/s`, 'f29-s');
          s += g(500, 620, L.gy, 'FTc', 200, 450, 330, 360, h.ftc, `${h.ftc} ms`) + T(500, L.gy + 44, 'normal 330–360 ms', 'f29-s');
          s += g(640, 740, L.gy, 'CO', 0, 10, null, null, h.co, `${fmt(h.co, 1)}`) + T(640, L.gy + 44, 'L/dk', 'f29-s');
        }
        fig.innerHTML = svgAc(L.W, L.H, s, 'Özofageal Doppler: prob, demet ve hız–zaman dalgası');
        oku.innerHTML = `Doppler: V = F<sub>d</sub> · c / (2 · F₀ · cos θ) · F₀ 4 MHz (örnek) · c 1540 m/s · θ 45° · F<sub>d</sub> ${fmt(h.fd, 2)} kHz → V ${h.pv} cm/s<br>SD ${h.sd} cm × alan ${fmt(ALAN, 1)} cm² = ${n0(h.aort)} mL (inen aort) ÷ 0,70 = SV ${h.sv} mL × HR ${h.hr} = CO ${fmt(h.co, 1)} L/dk`;
        not.innerHTML = REF('SD: kan sütununun her vuruda aortta ilerlediği santimetre (VTI). [[K1 s. 128]]');
      } else {
        L = dar ? { W: 360, H: 500, l: [0, 0], r: [0, 290], dar: true } : { W: 760, H: 300, l: [10, 10], r: [400, 40] };
        const on = (yl) => `opacity:${S.yol === yl ? 1 : 0.35};transition:opacity .3s`;
        const kontur = (cx, by, h2, ay) => { const Lh = ay - by; return `M${r1(cx - h2)},${r1(by)} C${r1(cx - h2)},${r1(by + 0.55 * Lh)} ${r1(cx - 0.45 * h2)},${r1(ay)} ${r1(cx)},${r1(ay)} C${r1(cx + 0.45 * h2)},${r1(ay)} ${r1(cx + h2)},${r1(by + 0.55 * Lh)} ${r1(cx + h2)},${r1(by)}Z`; };
        const [lx, ly] = L.l, cx = lx + 170;
        let a = '';
        a += `<path d="${kontur(cx, ly + 50, 78, ly + 262)}" style="fill:none;stroke:var(--c-basic);stroke-width:3"/>`;
        a += `<path d="${kontur(cx, ly + 70, 56, ly + 250)}" style="fill:var(--accent);fill-opacity:.3;stroke:var(--accent);stroke-width:2"/>`;
        a += `<path class="f29-lv" d="" style="fill:none;stroke:${INK};stroke-width:1.5;stroke-dasharray:4 3"/>`;
        a += Ln(cx, ly + 50, cx, ly + 262, `stroke:${INK};stroke-width:1.2;stroke-dasharray:5 4`) + T(cx + 6, ly + 170, 'L', 'f29-tb');
        a += ok(cx - 76, ly + 40, cx + 76, ly + 40, INK, 1.4, 6) + ok(cx + 76, ly + 40, cx - 76, ly + 40, INK, 1.4, 6) + T(cx, ly + 32, 'D', 'f29-tb', 'middle');
        a += T(lx + 4, ly + 120, 'diyastol', 'f29-t', '', ' style="fill:var(--c-basic)"') + T(lx + 4, ly + 137, 'EDV 120 mL', 'f29-n', '', ' style="fill:var(--c-basic)"');
        a += T(lx + 4, ly + 172, 'sistol', 'f29-t', '', ' style="fill:var(--accent-ink)"') + T(lx + 4, ly + 189, 'ESV 50 mL', 'f29-n', '', ' style="fill:var(--accent-ink)"');
        a += T(cx, ly + 282, 'konik sol ventrikül (uzun eksen)', 'f29-s', 'middle');
        s += `<g style="${on('hac')}">${a}</g>`;
        const [rx, ry] = L.r;
        let b = Ci(rx + 64, ry + 76, 42, 'fill:var(--c-basic-soft);stroke:var(--c-basic);stroke-width:2.5') + T(rx + 64, ry + 81, 'LVOT', 'f29-tb', 'middle') + T(rx + 64, ry + 140, 'kesit alanı', 'f29-s', 'middle');
        const wx0 = rx + 140, wx1 = rx + 350, wb = ry + 130, wt = ry + 20, X = (t) => wx0 + (wx1 - wx0) * t, Y = (v) => wb - (wb - wt) * v;
        const v = (u) => (u < 0 || u > 0.34 ? 0 : u < 0.1 ? Math.sin((Math.PI / 2) * (u / 0.1)) : Math.cos((Math.PI / 2) * ((u - 0.1) / 0.24)));
        const pts = [], ar = [];
        for (let t = 0; t <= 1.0001; t += 0.01) { const u = (t - 0.05) % 0.5; pts.push([X(t), Y(t < 0.05 ? 0 : v(u))]); if (t >= 0.05 && t <= 0.39) ar.push([X(t), Y(v(t - 0.05))]); }
        b += `<path d="${yolD(ar)} Z" style="fill:var(--c-basic);opacity:.3"/><path d="${yolD(pts)}" style="fill:none;stroke:var(--c-basic);stroke-width:2.2"/>` + Ln(wx0, wb, wx1, wb, `stroke:${MUTED}`);
        b += T(X(0.2), Y(0.35), 'VTI', 'f29-tb f29-hale', 'middle') + T(wx0, wt - 6, 'LVOT Doppler hızı', 'f29-s') + T(wx1, wb + 18, 'zaman', 'f29-ax', 'end');
        s += `<g style="${on('lvot')}">${b}</g>`;
        fig.innerHTML = svgAc(L.W, L.H, s, 'TÖE: konik sol ventrikül hacimleri ve LVOT Doppler');
        oku.innerHTML = S.yol === 'hac' ? 'EDV 120 mL − ESV 50 mL = SV 70 mL × HR 75 = CO 5,25 L/dk' : 'LVOT akımı = hız (VTI) × ölçülen kesit alanı → SV; SV × HR = CO';
        not.textContent = 'Ek bilgi: kapak işlev bozukluğu, bölgesel duvar hareket bozukluğu · Sınır: cihaz hacmi, maliyet, kapsamlı eğitim';
      }
      gA = fig.querySelector('.f29-an') || fig.querySelector('.f29-lv');
      anim();
    };
    const anim = () => {
      if (!gA) return;
      if (S.tab === 'eso') { gA.innerHTML = anatomiAnim(); return; }
      const f = RM ? 0 : 0.5 - 0.5 * Math.cos(((S.t % 1) / 1) * Math.PI * 2);
      const [lx, ly] = L.l, cx = lx + 170, by = ly + 50 + 20 * f, h2 = 78 - 22 * f, ay = ly + 262 - 12 * f, Lh = ay - by;
      gA.setAttribute('d', RM ? '' : `M${r1(cx - h2)},${r1(by)} C${r1(cx - h2)},${r1(by + 0.55 * Lh)} ${r1(cx - 0.45 * h2)},${r1(ay)} ${r1(cx)},${r1(ay)} C${r1(cx + 0.45 * h2)},${r1(ay)} ${r1(cx + h2)},${r1(by + 0.55 * Lh)} ${r1(cx + h2)},${r1(by)}Z`);
    };
    el.addEventListener('click', (e) => {
      const tb = e.target.closest('[data-tab]'), dd = e.target.closest('[data-dd]'), ys = e.target.closest('[data-yas]'), yl = e.target.closest('[data-yl]');
      if (tb) { S.tab = tb.dataset.tab; ciz(); if (S.tab === 'toe') cap(S.yol === 'hac' ? '<b>TÖE · hacimler.</b> Konik sol ventrikülün EDV ve ESV\'si sistol ve diyastolde uzunlamasına ve enine çaplardan makul doğrulukla tahmin edilir; EDV − ESV = SV, SV × HR = CO. [[K1 s. 129]]' : '<b>TÖE · Doppler.</b> Sol ventrikül çıkış yolundaki akım Doppler ilkesi ve ölçülen kesit alanıyla bulunur. TÖE kalp cerrahisi anestezisinde ve kalp yoğun bakımında standarttır. [[K1 s. 129]]'); else cap(D[S.d].cap); }
      else if (dd) { S.d = dd.dataset.dd; ciz(); cap(D[S.d].cap); }
      else if (ys) { S.yas = +ys.dataset.yas; ciz(); cap(`<b>${S.yas} yaş.</b> PV normal aralığı ${S.yas === 20 ? '90–120' : '50–80'} cm/s.${S.d === 'norm' && S.yas === 70 ? ' Normal durumda PV burada 65 cm/s gösterilir.' : ''} [[K1 s. 128]]`); }
      else if (yl) { S.yol = yl.dataset.yl; ciz(); cap(S.yol === 'hac' ? '<b>TÖE · hacimler.</b> Konik sol ventrikülün EDV ve ESV\'si sistol ve diyastolde uzunlamasına ve enine çaplardan makul doğrulukla tahmin edilir; EDV − ESV = SV, SV × HR = CO. [[K1 s. 129]]' : '<b>TÖE · Doppler.</b> Sol ventrikül çıkış yolundaki akım Doppler ilkesi ve ölçülen kesit alanıyla bulunur. TÖE kalp cerrahisi anestezisinde ve kalp yoğun bakımında standarttır. [[K1 s. 129]]'); }
    });
    const dur = RM ? () => {} : ticker(el, (dt) => { S.t += dt; anim(); });
    const dW = izle(el, ciz);
    ciz();
    return () => { dur(); dW(); };
  };
})();
