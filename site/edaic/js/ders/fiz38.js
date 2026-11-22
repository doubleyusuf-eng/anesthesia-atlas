/* Fizyoloji Bölüm 38 · Venöz basınç dalga biçimleri · bileşenler (tarif: docs/tasarim/fiz38.md; K1 s. 166–167).
   İzler ve kalp şemaları şematiktir; kitaptan gelen değerler: dalga sırası ve mekanizmaları, 2–8 mmHg normal aralık,
   8–12 (mekanik ventilasyonda 12–15) mmHg hedef. Öteki sayılar temsilîdir ve bileşen altlarında belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ss = (a, b, t) => { const x = clamp((t - a) / (b - a), 0, 1); return x * x * (3 - 2 * x); };
  const ease = (t) => { t = clamp(t, 0, 1); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const gs = (t, c, s) => Math.exp(-((t - c) * (t - c)) / (2 * s * s));
  const capYaz = (el, h) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(h); };
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const segHtml = (ad, key, opts, cur, cls) => `<div class="seg ${cls || ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const okDef = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="${cls}"/></marker>`;
  /* kapsayıcı 560 px'ten darsa dar yerleşim; yalnız eşik geçilince yeniden çizer */
  const darIzle = (el, cb) => {
    let d = null;
    const f = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < 560; if (n !== d) { d = n; cb(n); } };
    f();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };

  /* ---------- ortak CVP modeli (tarifteki düğüm noktaları, kosinüs ara değerleme) ---------- */
  const DUGUM = [[0, 2.6], [0.18, 4.6], [0.28, 3.4], [0.34, 3.9], [0.52, 1.8], [0.72, 4.2], [0.86, 1.4], [1, 2.6]];
  const cvp1 = (t) => {
    t = ((t % 1) + 1) % 1;
    for (let i = 0; i < DUGUM.length - 1; i++) {
      const [t0, p0] = DUGUM[i], [t1, p1] = DUGUM[i + 1];
      if (t <= t1) { const f = (1 - Math.cos(Math.PI * (t - t0) / (t1 - t0))) / 2; return lerp(p0, p1, f); }
    }
    return 2.6;
  };
  /* EKG: P 0,08–0,15; QRS 0,24–0,30; T 0,52–0,64 s */
  const ekg1 = (t) => 0.16 * gs(t, 0.115, 0.016) - 0.1 * gs(t, 0.25, 0.006) + 1 * gs(t, 0.268, 0.008) - 0.25 * gs(t, 0.287, 0.007) + 0.3 * gs(t, 0.58, 0.03);

  /* =====================================================================
     1 · f38_dalga — bir kardiyak döngüde a, c, x, v, y (K1 s. 166)
     ===================================================================== */
  VIZ.f38_dalga = (el) => {
    const ADIM = [
      { k: 'a', t: 0.18, r: [0.08, 0.24], h: [0.04, 0.28], cap: '<b>a dalgası.</b> RA kasılır; EKG\'de P dalgasının hemen ardından gelir. Bir bileşene dokunun ya da döngüyü oynatın. [[K1 s. 166]]', lx: 0.18, lp: 4.6, ust: true },
      { k: 'c', t: 0.33, r: [0.28, 0.38], h: [0.28, 0.40], cap: '<b>c dalgası.</b> Erken sistolde RV kasılması triküspit kapağı RA\'ya doğru şişirir; CVP biraz yükselir. Karotis nabzıyla aynı anda görülür. [[K1 s. 166]]', lx: 0.34, lp: 3.9, ust: true },
      { k: 'x', t: 0.47, r: [0.38, 0.54], h: [0.36, 0.53], cap: '<b>x inişi.</b> Atriyum gevşer ve RV kasılırken RA aşağı çekilir; düşen CVP RA\'nın hızla dolmasını sağlar. [[K1 s. 166]]', lx: 0.52, lp: 1.8, ust: false },
      { k: 'v', t: 0.66, r: [0.54, 0.76], h: [0.52, 0.74], cap: '<b>v dalgası.</b> Ventrikül sistolü boyunca venöz dönüş sürer; triküspit kapak kapalıyken RA dolar. [[K1 s. 166]]', lx: 0.72, lp: 4.2, ust: true },
      { k: 'y', t: 0.85, r: [0.76, 0.92], h: [0.72, 0.89], cap: '<b>y inişi.</b> Triküspit kapak açılır, kan RA\'dan RV\'ye akar ve CVP düşer. [[K1 s. 166]]', lx: 0.86, lp: 1.4, ust: false },
    ];
    el.innerHTML = `<div class="f38-ust btn-row">
        <button type="button" class="btn" data-a="oyna"${RM ? ' hidden' : ''}>Oynat</button>
        <button type="button" class="btn ghost f38-ok" data-a="geri" aria-label="Önceki bileşen">‹</button>
        ${segHtml('CVP bileşeni', 'adim', ADIM.map((s, i) => [String(i), s.k]), '0', 'f38-harf')}
        <button type="button" class="btn ghost f38-ok" data-a="ileri" aria-label="Sonraki bileşen">›</button>
      </div><div class="f38-sahne"></div>`;
    const sahne = el.querySelector('.f38-sahne'), oyna = el.querySelector('[data-a="oyna"]');
    let dar = false, adim = 0, t = ADIM[0].t, run = false, R = {};

    const ciz = () => {
      const G = dar
        ? { W: 360, H: 600, x0: 42, x1: 348, fz: [4, 22], eb: 70, ea: 24, ey: 36, c0: 258, c1: 96, ax: 284, hx: 92, hy: 312, hs: 1 }
        : { W: 560, H: 330, x0: 44, x1: 350, fz: [4, 22], eb: 72, ea: 26, ey: 38, c0: 284, c1: 104, ax: 308, hx: 372, hy: 22, hs: 1 };
      const X = (tt) => G.x0 + (G.x1 - G.x0) * tt, Y = (p) => G.c0 - (G.c0 - G.c1) * p / 6, YE = (v) => G.eb - G.ea * v;
      const yol = (f, a, b, n, YY) => { let d = ''; for (let i = 0; i <= n; i++) { const tt = a + (b - a) * i / n; d += (i ? 'L' : 'M') + X(tt).toFixed(1) + ' ' + YY(f(tt)).toFixed(1); } return d; };
      const faz = [[0, 0.26, 'Diyastol'], [0.26, 0.76, 'Sistol'], [0.76, 1, 'Diyastol']];
      const ekgEt = [[0.115, 'P'], [0.268, 'QRS'], [0.58, 'T']];
      sahne.innerHTML = `<svg class="f38-svg${dar ? ' f38-dar' : ''}" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="EKG ile aynı zaman ekseninde santral venöz basınç dalga biçimi ve sağ kalbin şematik kesiti">
        <defs>${okDef('f38-d-ok', 'f38-uc-b')}${okDef('f38-d-okw', 'f38-uc-w')}</defs>
        ${faz.map(([a, b, l]) => `<rect class="f38-faz" x="${X(a) + 1}" y="${G.fz[0]}" width="${X(b) - X(a) - 2}" height="${G.fz[1] - G.fz[0]}" rx="4"/><text class="f38-ts" x="${(X(a) + X(b)) / 2}" y="${G.fz[1] - 5}" text-anchor="middle">${l}</text>`).join('')}
        <text class="f38-ts" x="4" y="${G.eb + 4}">EKG</text>
        <line class="f38-izg" x1="${G.x0}" x2="${G.x1}" y1="${G.eb}" y2="${G.eb}"/>
        <path class="f38-ekg" d="${yol(ekg1, 0, 1, 260, YE)}"/>
        ${ekgEt.map(([tt, l]) => `<text class="f38-ts" x="${X(tt)}" y="${G.ey}" text-anchor="middle">${l}</text>`).join('')}
        ${[0, 2, 4, 6].map((p) => `<line class="f38-izg" x1="${G.x0}" x2="${G.x1}" y1="${Y(p)}" y2="${Y(p)}"/><text class="f38-tk" x="${G.x0 - 6}" y="${Y(p) + 4}" text-anchor="end">${p}</text>`).join('')}
        <text class="f38-ts" transform="translate(${dar ? 11 : 12} ${(G.c0 + G.c1) / 2}) rotate(-90)" text-anchor="middle">Basınç (mmHg)</text>
        ${[[0, '0'], [0.5, '0,5'], [1, '1']].map(([tt, l]) => `<text class="f38-tk" x="${X(tt)}" y="${G.c0 + 16}" text-anchor="middle">${l}</text>`).join('')}
        <text class="f38-ts" x="${(G.x0 + G.x1) / 2}" y="${G.ax + 2}" text-anchor="middle">Zaman (s)</text>
        <path class="f38-iz-k" d="${yol(cvp1, 0, 1, 200, Y)}"/>
        ${ADIM.map((s, i) => `<path class="f38-iz-v" data-h="${i}" d="${yol(cvp1, s.h[0], s.h[1], 50, Y)}"/>`).join('')}
        <line class="f38-imlec" x1="0" x2="0" y1="${G.fz[1] + 4}" y2="${G.c0}"/>
        <circle class="f38-imlec-n" r="4.5"/>
        ${ADIM.map((s, i) => { const x = X(s.lx), y = Y(s.lp) + (s.ust ? -17 : 19); return `<g class="f38-harf-g" data-adim="${i}" role="button" tabindex="0" aria-label="${s.k} bileşeni"><circle class="f38-hedef" cx="${x}" cy="${y}" r="17"/><circle class="f38-harf-z" cx="${x}" cy="${y}" r="11"/><text class="f38-harf-t" x="${x}" y="${y + 5}" text-anchor="middle">${s.k}</text></g>`; }).join('')}
        <g class="f38-kalp" transform="translate(${G.hx} ${G.hy})">
          <rect class="f38-ven" x="40" y="0" width="34" height="60"/>
          <text class="f38-ts" x="82" y="13">SVC</text>
          <line class="f38-kat" x1="54" y1="-2" x2="54" y2="46"/><circle class="f38-kat-u" cx="54" cy="48" r="4.5"/>
          <text class="f38-ts f38-acc" x="82" y="28">Kateter ucu:</text>
          <text class="f38-ts" x="82" y="41">SVC, RA'nın</text>
          <text class="f38-ts" x="82" y="54">hemen üstü</text>
          <ellipse class="f38-ra" data-r="ra"/>
          <ellipse class="f38-ra-dol" data-r="radol"/>
          <rect class="f38-ven" x="116" y="94" width="40" height="22"/>
          <text class="f38-ts" x="120" y="88">IVC</text>
          <path class="f38-akim" data-r="svc" d="M60 6 L60 56" marker-end="url(#f38-d-ok)"/>
          <path class="f38-akim" data-r="ivc" d="M154 105 L114 105" marker-end="url(#f38-d-ok)"/>
          <text class="f38-t" data-r="ralbl" x="72" text-anchor="middle">RA</text>
          <path class="f38-rv" data-r="rv"/>
          <text class="f38-t" data-r="rvlbl" x="72" text-anchor="middle">RV</text>
          <path class="f38-akim" data-r="gec" marker-end="url(#f38-d-ok)"/>
          <line class="f38-annul" data-r="an1"/><line class="f38-annul" data-r="an2"/>
          <path class="f38-yap" data-r="y1"/><path class="f38-yap" data-r="y2"/>
          <text class="f38-ts" data-r="kplbl1" x="124">Triküspit</text><text class="f38-ts" data-r="kplbl2" x="124">kapak</text>
          <path class="f38-akim-w" data-r="asagi" marker-end="url(#f38-d-okw)"/>
          <text class="f38-ts f38-warn f38-karotis" data-r="kar" x="72" text-anchor="middle">karotis nabzı</text>
        </g>
      </svg>`;
      const svg = sahne.querySelector('svg'), q = (s) => svg.querySelector(`[data-r="${s}"]`);
      R = { svg, X, Y, G, im: svg.querySelector('.f38-imlec'), imn: svg.querySelector('.f38-imlec-n'), vurgu: [...svg.querySelectorAll('.f38-iz-v')], harf: [...svg.querySelectorAll('.f38-harf-g')], q };
      goster();
    };

    /* kalp şemasının o andaki durumu (t ∈ [0,1)) */
    const kalp = (tt) => {
      const { q } = R; if (!q) return;
      const raK = gs(tt, 0.17, 0.035);                        // RA kasılması
      const rvK = ss(0.25, 0.32, tt) * (1 - ss(0.66, 0.78, tt)); // RV kasılması
      const acik = 1 - ss(0.26, 0.29, tt) * (1 - ss(0.76, 0.8, tt)); // triküspit açıklığı
      const sis = gs(tt, 0.33, 0.03);                         // kapağın RA'ya şişmesi (c)
      const ini = ss(0.36, 0.52, tt) * (1 - ss(0.72, 0.9, tt)); // AV düzleminin inişi (x)
      const dol = clamp(0.25 + 0.75 * ss(0.36, 0.76, tt) - 0.75 * ss(0.77, 0.9, tt) - 0.25 * ss(0.1, 0.24, tt) + 0.25 * ss(0.92, 1, tt), 0.05, 1);
      const vp = 144 + 12 * ini, top = 58, hw = 50 * (1 - 0.13 * raK) + 4 * ini;
      const ra = q('ra'), rd = q('radol');
      [ra, rd].forEach((e) => { e.setAttribute('cx', 72); e.setAttribute('cy', (top + vp) / 2); e.setAttribute('rx', hw.toFixed(1)); e.setAttribute('ry', ((vp - top) / 2).toFixed(1)); });
      rd.style.opacity = (0.15 + 0.7 * dol).toFixed(2);
      q('ralbl').setAttribute('y', (top + vp) / 2 + 5);
      const rw = 52 * (1 - 0.2 * rvK), rh = 104 - 10 * rvK;
      q('rv').setAttribute('d', `M${72 - 46} ${vp} Q${72 - rw - 10} ${vp + rh * 0.75} 72 ${vp + rh} Q${72 + rw + 10} ${vp + rh * 0.75} ${72 + 46} ${vp}`);
      q('rvlbl').setAttribute('y', vp + rh * 0.62);
      const L = 28, Rr = 116, M = 72;
      q('an1').setAttribute('x1', L - 8); q('an1').setAttribute('x2', L); q('an2').setAttribute('x1', Rr); q('an2').setAttribute('x2', Rr + 8);
      ['an1', 'an2'].forEach((k) => { q(k).setAttribute('y1', vp); q(k).setAttribute('y2', vp); });
      const ex1 = lerp(M - 2, L + 12, acik), ey = lerp(vp, vp + 34, acik), ex2 = lerp(M + 2, Rr - 12, acik), bul = -18 * sis * (1 - acik);
      q('y1').setAttribute('d', `M${L} ${vp} Q${lerp(L + 22, L + 6, acik)} ${vp + bul + 12 * acik} ${ex1} ${ey}`);
      q('y2').setAttribute('d', `M${Rr} ${vp} Q${lerp(Rr - 22, Rr - 6, acik)} ${vp + bul + 12 * acik} ${ex2} ${ey}`);
      [q('y1'), q('y2')].forEach((e) => e.classList.toggle('sis', sis > 0.3 && acik < 0.2));
      q('kplbl1').setAttribute('y', vp + 4); q('kplbl2').setAttribute('y', vp + 17);
      const gec = Math.max(gs(tt, 0.17, 0.05), gs(tt, 0.84, 0.05)) * acik;
      q('gec').setAttribute('d', `M72 ${vp - 30} L72 ${vp + 40}`); q('gec').style.opacity = gec.toFixed(2);
      const gir = 0.35 + 0.65 * clamp(ss(0.36, 0.44, tt) * (1 - ss(0.74, 0.8, tt)), 0, 1);
      ['svc', 'ivc'].forEach((k) => { q(k).style.opacity = gir.toFixed(2); q(k).style.strokeWidth = (2 + 2.2 * ss(0.38, 0.46, tt) * (1 - ss(0.54, 0.6, tt))).toFixed(1); });
      q('asagi').setAttribute('d', `M6 ${vp - 20} L6 ${vp + 8}`); q('asagi').style.opacity = ini > 0.1 && tt < 0.6 ? 1 : 0;
      q('kar').setAttribute('y', vp + 122); q('kar').style.opacity = sis > 0.25 ? Math.min(1, sis * 1.4).toFixed(2) : 0;
    };

    const goster = () => {
      const { X, Y, im, imn, vurgu, harf } = R; if (!im) return;
      vurgu.forEach((p, i) => p.classList.toggle('on', i === adim));
      harf.forEach((g, i) => g.classList.toggle('on', i === adim));
      basSec(el, 'adim', String(adim));
      const x = X(t);
      im.setAttribute('x1', x); im.setAttribute('x2', x); imn.setAttribute('cx', x); imn.setAttribute('cy', Y(cvp1(t)));
      im.style.display = imn.style.display = RM ? 'none' : '';
      kalp(t);
    };
    const adimaGit = (i) => { adim = (i + ADIM.length) % ADIM.length; t = ADIM[adim].t; capYaz(el, ADIM[adim].cap); goster(); };
    const durdur = () => { run = false; oyna.textContent = 'Oynat'; };

    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-adim],[data-a]'); if (!b || !el.contains(b)) return;
      if (b.dataset.adim !== undefined) { durdur(); adimaGit(+b.dataset.adim); }
      else if (b.dataset.a === 'geri') { durdur(); adimaGit(adim - 1); }
      else if (b.dataset.a === 'ileri') { durdur(); adimaGit(adim + 1); }
      else if (b.dataset.a === 'oyna') { run = !run; oyna.textContent = run ? 'Duraklat' : 'Oynat'; }
    });
    el.addEventListener('keydown', (e) => { const g = e.target.closest('.f38-harf-g'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); durdur(); adimaGit(+g.dataset.adim); } });
    const ro = darIzle(el, (n) => { dar = n; ciz(); });
    const stop = RM ? () => {} : ticker(el, (dt) => {
      if (!run) return;
      t = (t + dt / 4) % 1; // 1 s'lik döngü 4 kat yavaş
      const i = ADIM.findIndex((s) => t >= s.r[0] && t < s.r[1]);
      if (i >= 0 && i !== adim) { adim = i; capYaz(el, ADIM[i].cap); }
      goster();
    });
    return () => { stop(); ro(); };
  };

  /* =====================================================================
     2 · f38_aritmi — normal ritim, AF, tam blok, triküspit yetersizliği (K1 s. 166)
     ===================================================================== */
  VIZ.f38_aritmi = (el) => {
    const DUR = [
      ['normal', 'Normal ritim', '<b>Normal ritim.</b> Her P dalgasını bir a dalgası izler. Bir durum seçin; EKG ve CVP birlikte akar. [[K1 s. 166]]'],
      ['af', 'Atriyal fibrilasyon', '<b>Atriyal fibrilasyon.</b> Koordine atriyum kasılması kaybolur; a dalgası yoktur. [[K1 s. 166]]'],
      ['blok', '3. derece blok', '<b>Üçüncü derece kalp bloğu.</b> Uyarı AV düğümden geçemez; atriyum ve ventrikül bağımsız kasılır. Atriyum ara sıra kapalı triküspit kapağa karşı kasılınca büyük bir top a dalgası çıkar. [[K1 s. 166]]'],
      ['tr', 'Triküspit yetersizliği', '<b>Triküspit yetersizliği.</b> Sistolde kan RV\'den RA\'ya atılır ve CVP yükselir; c dalgası, x inişi ve v dalgasının yerini dev v dalgası alır. [[K1 s. 166]]'],
    ];
    el.innerHTML = `<div class="f38-ust">${segHtml('Ritim ya da kapak durumu', 'dur', DUR.map(([v, l]) => [v, l]), 'normal', 'f38-seg')}
        <button type="button" class="btn ghost" data-a="dur"${RM ? ' hidden' : ''}>Duraklat</button></div>
      <div class="f38-durum" aria-hidden="true"></div><div class="f38-sahne"></div>`;
    const sahne = el.querySelector('.f38-sahne'), durumEl = el.querySelector('.f38-durum'), durB = el.querySelector('[data-a="dur"]');
    let dar = false, kos = 'normal', T = 0, run = true, ev = null, R = {};

    /* tohumlu rastgele (AF'de RR) */
    let tohum = 7; const rnd = () => { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; };
    const olaylar = (k) => {
      tohum = 7;
      const P = [], Q = [], SON = 400;
      if (k === 'af') { let t = 0.3; while (t < SON) { Q.push(t); t += 0.6 + 0.4 * rnd(); } }
      else if (k === 'blok') { for (let t = 0.1; t < SON; t += 0.8) P.push(t); for (let t = 0.55; t < SON; t += 1.5) Q.push(t); }
      else { for (let t = 0.1; t < SON; t += 0.8) { P.push(t); Q.push(t + 0.16); } }
      /* top a: atriyum kasılması (P + 0,1 s) ventrikül sistolüne (QRS → T sonu) denk gelirse */
      const top = P.map((p) => k === 'blok' && Q.some((q) => p + 0.1 >= q && p + 0.1 <= q + 0.4));
      return { P, Q, top };
    };
    const yakin = (arr, t, a, b) => { /* t − b ≤ arr[i] ≤ t − a olan sıralar (ikili arama) */ let lo = 0, hi = arr.length; while (lo < hi) { const m = (lo + hi) >> 1; if (arr[m] < t - b) lo = m + 1; else hi = m; } const r = []; for (let i = lo; i < arr.length && arr[i] <= t - a; i++) r.push(i); return r; };
    const ekg = (t) => {
      let v = 0;
      if (kos === 'af') v += 0.05 * Math.sin(2 * Math.PI * 6.3 * t) + 0.035 * Math.sin(2 * Math.PI * 9.1 * t + 1.3) + 0.025 * Math.sin(2 * Math.PI * 4.2 * t + 0.4);
      else yakin(ev.P, t, -0.1, 0.2).forEach((i) => { v += 0.16 * gs(t, ev.P[i] + 0.035, 0.016); });
      yakin(ev.Q, t, -0.1, 0.6).forEach((i) => { const q = ev.Q[i]; v += -0.1 * gs(t, q + 0.01, 0.006) + gs(t, q + 0.028, 0.008) - 0.25 * gs(t, q + 0.047, 0.007) + 0.3 * gs(t, q + 0.32, 0.035); });
      return v;
    };
    const cvp = (t) => {
      let v = 3;
      if (kos !== 'af') yakin(ev.P, t, -0.3, 0.4).forEach((i) => { v += (ev.top[i] ? 5 : 2) * gs(t, ev.P[i] + 0.1, 0.04); });
      yakin(ev.Q, t, -0.3, 0.9).forEach((i) => {
        const q = ev.Q[i];
        if (kos === 'tr') v += 5.6 * ss(q + 0.02, q + 0.14, t) * (1 - ss(q + 0.36, q + 0.5, t)) - 2.6 * gs(t, q + 0.6, 0.05);
        else v += 0.8 * gs(t, q + 0.07, 0.025) - 1.6 * gs(t, q + 0.22, 0.06) + 1.6 * gs(t, q + 0.42, 0.06) - 1.8 * gs(t, q + 0.58, 0.05);
      });
      return v;
    };

    const ciz = () => {
      const G = dar
        ? { W: 360, H: 330, x0: 44, x1: 352, eb: 92, ea: 50, c0: 312, c1: 132, pen: 2.6 }
        : { W: 560, H: 280, x0: 50, x1: 550, eb: 82, ea: 48, c0: 266, c1: 112, pen: 3.6 };
      sahne.innerHTML = `<svg class="f38-svg${dar ? ' f38-dar' : ''}" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="Akan EKG ve CVP izleri">
        <rect class="f38-ekran" x="${G.x0 - 6}" y="20" width="${G.x1 - G.x0 + 12}" height="${G.eb + 24 - 20}" rx="6"/>
        <rect class="f38-ekran" x="${G.x0 - 6}" y="${G.c1 - 22}" width="${G.x1 - G.x0 + 12}" height="${G.c0 - G.c1 + 30}" rx="6"/>
        <text class="f38-t" x="4" y="${G.eb + 4}">EKG</text><text class="f38-t" x="4" y="${(G.c0 + G.c1) / 2 + 4}">CVP</text>
        <text class="f38-rozet" x="${G.x1}" y="13" text-anchor="end"></text>
        <path class="f38-ekg f38-ekg-a" d=""/>
        <path class="f38-iz-a" d=""/>
        <g class="f38-etk"></g>
      </svg>`;
      const svg = sahne.querySelector('svg');
      R = { G, svg, ekgP: svg.querySelector('.f38-ekg-a'), cvpP: svg.querySelector('.f38-iz-a'), etk: svg.querySelector('.f38-etk'), roz: svg.querySelector('.f38-rozet') };
      R.roz.textContent = DUR.find((d) => d[0] === kos)[1];
      ciz2();
    };
    const ciz2 = () => {
      const { G, ekgP, cvpP, etk } = R; if (!ekgP) return;
      const W = G.pen, t0 = T - W, X = (t) => G.x0 + (G.x1 - G.x0) * (t - t0) / W;
      const YE = (v) => G.eb - G.ea * v, YC = (p) => G.c0 - (G.c0 - G.c1) * p / 12;
      let de = '', dc = ''; const n = dar ? 220 : 320;
      for (let i = 0; i <= n; i++) { const t = t0 + W * i / n; de += (i ? 'L' : 'M') + X(t).toFixed(1) + ' ' + YE(ekg(t)).toFixed(1); dc += (i ? 'L' : 'M') + X(t).toFixed(1) + ' ' + YC(cvp(t)).toFixed(1); }
      ekgP.setAttribute('d', de); cvpP.setAttribute('d', dc);
      const et = [];
      const ic = (t) => t > t0 + 0.08 && t < T - 0.06;
      if (kos === 'normal' || kos === 'blok') ev.P.forEach((p, i) => { const ta = p + 0.1; if (!ic(ta)) return; const top = ev.top[i]; et.push(`<text class="f38-balon${top ? ' crit' : ''}" x="${X(ta).toFixed(1)}" y="${(YC(cvp(ta)) - 9).toFixed(1)}" text-anchor="middle">${top ? 'top a' : 'a'}</text>`); });
      if (kos === 'blok') ev.P.forEach((p) => { if (ic(p + 0.035)) et.push(`<text class="f38-balon-k" x="${X(p + 0.035).toFixed(1)}" y="${(YE(0.16) - 6).toFixed(1)}" text-anchor="middle">P</text>`); });
      if (kos === 'af') ev.Q.forEach((q) => { const ta = q - 0.06; if (!ic(ta)) return; const x = X(ta).toFixed(1); et.push(`<line class="f38-ayok" x1="${x}" x2="${x}" y1="${YC(2.2)}" y2="${YC(6.4)}"/><text class="f38-balon-k" x="${x}" y="${YC(6.4) - 5}" text-anchor="middle">a yok</text>`); });
      if (kos === 'tr') ev.Q.forEach((q) => { const ta = q + 0.25; if (!ic(ta)) return; et.push(`<text class="f38-balon crit" x="${X(ta).toFixed(1)}" y="${(YC(cvp(ta)) - 9).toFixed(1)}" text-anchor="middle">dev v</text>`); });
      etk.innerHTML = et.join('');
    };
    const durumHtml = () => {
      if (kos === 'blok') return `<span class="f38-av"><svg viewBox="0 0 120 30" aria-hidden="true"><rect x="2" y="7" width="26" height="16" rx="4" class="f38-av-k"/><text x="15" y="19" text-anchor="middle" class="f38-av-t">AV</text><path d="M30 15 H52" class="f38-av-o"/><path d="M58 9 l12 12 M70 9 l-12 12" class="f38-av-x"/><path d="M76 15 H112" class="f38-av-o" stroke-dasharray="3 4"/></svg>AV düğüm: uyarı geçemez</span>`;
      if (kos === 'tr') return `<span class="f38-av"><svg viewBox="0 0 60 56" aria-hidden="true" class="f38-mini"><defs>${okDef('f38-a-okc', 'f38-uc-c')}</defs><rect x="8" y="3" width="44" height="20" rx="8" class="f38-av-k"/><text x="30" y="17" text-anchor="middle" class="f38-av-t">RA</text><rect x="8" y="31" width="44" height="22" rx="8" class="f38-av-k"/><text x="30" y="46" text-anchor="middle" class="f38-av-t">RV</text><path d="M44 47 V14" class="f38-av-g" marker-end="url(#f38-a-okc)"/></svg>Sistolde RV → RA geri akım</span>`;
      if (kos === 'af') return '<span class="f38-av">P dalgası yok · RR düzensiz</span>';
      return '<span class="f38-av">P → QRS → T · 75/dk (temsilî)</span>';
    };
    const kur = () => {
      ev = olaylar(kos);
      T = 4;
      if (RM) { /* durgun: üç vuru; blokta top a içeren pencere */
        if (kos === 'blok') { const i = ev.top.findIndex((x, j) => x && ev.P[j] > 2); T = ev.P[i] + 1.4; } else T = 3.1;
      }
      durumEl.innerHTML = durumHtml();
      if (R.roz) R.roz.textContent = DUR.find((d) => d[0] === kos)[1];
      capYaz(el, DUR.find((d) => d[0] === kos)[2]);
      ciz2();
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.dur) { kos = b.dataset.dur; basSec(el, 'dur', kos); kur(); }
      else if (b.dataset.a === 'dur') { run = !run; b.textContent = run ? 'Duraklat' : 'Sürdür'; }
    });
    ev = olaylar(kos); durumEl.innerHTML = durumHtml();
    T = RM ? 3.1 : 4;
    const ro = darIzle(el, (n) => { dar = n; ciz(); });
    const stop = RM ? () => {} : ticker(el, (dt) => { if (!run) return; T += dt; if (T > 395) T = 4; ciz2(); });
    void durB;
    return () => { stop(); ro(); };
  };

  /* =====================================================================
     3 · f38_deger — normal CVP, transdüser yüksekliği, yükselten/düşüren etkenler (K1 s. 167)
     ===================================================================== */
  VIZ.f38_deger = (el) => {
    const NED = {
      ppv: ['PPV / PEEP', 11, '<b>Pozitif basınçlı ventilasyon / PEEP.</b> İntratorasik basınç CVP\'yi yükseltir; CVP yalnız kan hacmini yansıtmaz.'],
      kky: ['Konjestif kalp yetersizliği', 14, '<b>Konjestif kalp yetersizliği.</b> Yüksek CVP\'nin sık nedenlerindendir.'],
      rvy: ['İzole RV yetersizliği', 15, '<b>İzole RV yetersizliği.</b> Örneğin RV enfarktüsü ya da kor pulmonale sonrası CVP yükselir.'],
      hip: ['Hipervolemi', 12, '<b>Hipervolemi.</b> Santral venöz kan hacmi artar, CVP yükselir.'],
      pe: ['Pulmoner emboli', 13, '<b>Pulmoner emboli.</b> Yüksek CVP\'nin sık nedenlerindendir.'],
      kp: ['Konstriktif perikardit', 16, '<b>Konstriktif perikardit.</b> Yüksek CVP\'nin sık nedenlerindendir.'],
      hipo: ['Akut hipovolemi', 0.5, '<b>Akut hipovolemi.</b> Örneğin anafilaksi ya da akut kanama: CVP 2 mmHg\'nin altına düşer.'],
    };
    const cip = (k) => `<button type="button" class="f38-cip${k === 'hipo' ? ' dus' : ''}" data-ned="${k}" aria-pressed="false">${NED[k][0]}</button>`;
    el.innerHTML = `<div class="f38-sahne"></div>
      <label class="f38-rng"><span>Transdüser yüksekliği (RA düzeyine göre) <b class="f38-hv">0 cm</b></span>
        <input type="range" min="-10" max="10" step="1" value="0" aria-label="Transdüserin sağ atriyuma göre yüksekliği"></label>
      <div class="f38-cipler"><span class="f38-cl">Yükseltenler</span>${['ppv', 'kky', 'rvy', 'hip', 'pe', 'kp'].map(cip).join('')}</div>
      <div class="f38-cipler"><span class="f38-cl">Düşürenler</span>${cip('hipo')}<button type="button" class="btn ghost f38-sifir" data-a="sifir">Sıfırla</button></div>`;
    const sahne = el.querySelector('.f38-sahne'), rng = el.querySelector('input[type=range]'), hv = el.querySelector('.f38-hv');
    let dar = false, h = 0, ned = null, R = {};
    const K = 0.74; // 1 cmH2O ≈ 0,74 mmHg
    const RAy = 200, PX = 8; // RA düzeyi (y) ve cm başına piksel

    const ciz = () => {
      const W = 560, H = dar ? 392 : 300;
      const hasta = `
        <line class="f38-zemin" x1="10" x2="${dar ? 350 : 380}" y1="294" y2="294"/>
        <rect class="f38-masa" x="24" y="226" width="270" height="9" rx="3"/>
        <line class="f38-masa-a" x1="44" x2="44" y1="235" y2="294"/><line class="f38-masa-a" x1="274" x2="274" y1="235" y2="294"/>
        <circle class="f38-govde" cx="50" cy="204" r="17"/>
        <rect class="f38-govde" x="70" y="182" width="136" height="44" rx="18"/>
        <rect class="f38-govde" x="200" y="192" width="92" height="30" rx="12"/>
        <path class="f38-kat-ic" d="M76 192 L128 ${RAy}"/>
        <circle class="f38-ra-n" cx="130" cy="${RAy}" r="6"/>
        <line class="f38-ra-cz" x1="10" x2="${dar ? 350 : 400}" y1="${RAy}" y2="${RAy}"/>
        <text class="f38-ts f38-acc f38-halo" x="54" y="256">Kesikli çizgi: RA düzeyi</text>
        <text class="f38-ts f38-acc f38-halo" x="54" y="270">(orta aksiller hat)</text>
        <line class="f38-direk" x1="336" x2="336" y1="58" y2="294"/>
        <line class="f38-direk" x1="318" x2="354" y1="294" y2="294"/>
        <path class="f38-hat" data-r="hat"/>
        <line class="f38-fark" data-r="fark"/>
        <g data-r="tr"><rect class="f38-trd" x="326" y="-9" width="20" height="18" rx="4"/></g>
        <text class="f38-ts f38-halo" data-r="trl" x="318" text-anchor="end">Transdüser</text>
        <text class="f38-tk f38-b f38-halo" data-r="hl" x="318" text-anchor="end"></text>`;
      const MX = 0.5, HMAX = 20;
      let gost;
      if (!dar) {
        const cx = 424, cw = 34, y0 = 276, y1 = 50, Y = (v) => y0 - (y0 - y1) * v / HMAX;
        gost = `
          <rect class="f38-bd dus" x="${cx}" y="${Y(2)}" width="${cw}" height="${Y(0) - Y(2)}"/>
          <rect class="f38-bd nor" x="${cx}" y="${Y(8)}" width="${cw}" height="${Y(2) - Y(8)}"/>
          <rect class="f38-bd yuk" x="${cx}" y="${Y(20)}" width="${cw}" height="${Y(8) - Y(20)}"/>
          <rect class="f38-sut" data-r="sut" x="${cx + 10}" y="${Y(20)}" width="${cw - 20}" height="${Y(0) - Y(20)}" rx="4"/>
          <rect class="f38-sut-c" x="${cx}" y="${Y(20)}" width="${cw}" height="${Y(0) - Y(20)}" rx="3"/>
          ${[0, 2, 4, 8, 12, 16, 20].map((v) => `<line class="f38-cent" x1="${cx - 5}" x2="${cx}" y1="${Y(v)}" y2="${Y(v)}"/><text class="f38-tk" x="${cx - 8}" y="${Y(v) + 4}" text-anchor="end">${v}</text>`).join('')}
          <text class="f38-ts" x="${cx + cw + 6}" y="${(Y(0) + Y(2)) / 2 + 4}">Düşük &lt; 2</text>
          <text class="f38-ts f38-okt" x="${cx + cw + 6}" y="${(Y(2) + Y(8)) / 2 + 4}">Normal 2–8</text>
          <text class="f38-ts f38-warn" x="${cx + cw + 6}" y="${(Y(8) + Y(20)) / 2 + 4}">Yüksek &gt; 8</text>
          <line class="f38-ibre" data-r="ibre" x1="${cx - 4}" x2="${cx + cw + 4}"/>
          <text class="f38-buyuk" data-r="sayi" x="${cx + cw / 2}" y="20" text-anchor="middle"></text>
          <text class="f38-t" data-r="soz" x="${cx + cw / 2}" y="38" text-anchor="middle"></text>`;
        R.Yg = Y; R.yatay = false;
      } else {
        const x0 = 40, x1 = 340, gy = 340, X = (v) => x0 + (x1 - x0) * v / HMAX;
        gost = `
          <rect class="f38-bd dus" x="${X(0)}" y="${gy}" width="${X(2) - X(0)}" height="22"/>
          <rect class="f38-bd nor" x="${X(2)}" y="${gy}" width="${X(8) - X(2)}" height="22"/>
          <rect class="f38-bd yuk" x="${X(8)}" y="${gy}" width="${X(20) - X(8)}" height="22"/>
          <rect class="f38-sut" data-r="sut" x="${X(0)}" y="${gy + 7}" width="${X(20) - X(0)}" height="8" rx="3"/>
          <rect class="f38-sut-c" x="${X(0)}" y="${gy}" width="${X(20) - X(0)}" height="22" rx="3"/>
          ${[0, 2, 4, 8, 12, 16, 20].map((v) => `<line class="f38-cent" x1="${X(v)}" x2="${X(v)}" y1="${gy + 22}" y2="${gy + 27}"/><text class="f38-tk" x="${X(v)}" y="${gy + 40}" text-anchor="middle">${v}</text>`).join('')}
          <text class="f38-ts" x="${X(0)}" y="${gy - 24}">Düşük &lt; 2</text>
          <text class="f38-ts f38-okt" x="${X(5)}" y="${gy - 6}" text-anchor="middle">Normal 2–8</text>
          <text class="f38-ts f38-warn" x="${X(14)}" y="${gy - 6}" text-anchor="middle">Yüksek &gt; 8</text>
          <line class="f38-ibre" data-r="ibre" y1="${gy - 3}" y2="${gy + 25}"/>
          <text class="f38-buyuk" data-r="sayi" x="180" y="22" text-anchor="middle"></text>
          <text class="f38-t" data-r="soz" x="180" y="42" text-anchor="middle"></text>`;
        R.Xg = X; R.yatay = true;
      }
      sahne.innerHTML = `<svg class="f38-svg f38-deger${dar ? ' f38-dar' : ''}" viewBox="${dar ? '0 0 360 ' + H : '0 0 ' + W + ' ' + H}" role="img" aria-label="Sırtüstü yatan hasta, sağ atriyum düzeyi, serum direğinde transdüser ve okunan CVP göstergesi">
        <g${dar ? ' transform="translate(0 4)"' : ''}>${hasta}</g>${gost}</svg>`;
      const svg = sahne.querySelector('svg');
      R.q = (s) => svg.querySelector(`[data-r="${s}"]`);
      R.dy = dar ? 4 : 0;
      guncelle(false);
    };
    const guncelle = (yaz) => {
      const gercek = ned ? NED[ned][1] : 5;
      const okunan = clamp(gercek - K * h, 0, 20);
      const { q } = R; if (!q) return;
      const ty = RAy - h * PX;
      q('tr').setAttribute('transform', `translate(0 ${ty})`);
      q('hat').setAttribute('d', `M76 192 C 120 168, 270 ${ty - 34}, 326 ${ty}`);
      q('trl').setAttribute('y', ty - 6); q('hl').setAttribute('y', ty + 9);
      q('hl').textContent = h === 0 ? 'RA düzeyinde' : (h > 0 ? '+' : '−') + Math.abs(h) + ' cm';
      const fx = dar ? 357 : 362, f = q('fark'); f.setAttribute('x1', fx); f.setAttribute('x2', fx); f.setAttribute('y1', RAy); f.setAttribute('y2', ty); f.style.opacity = h ? 1 : 0;
      const sut = q('sut'), ib = q('ibre');
      if (!R.yatay) {
        const Y = R.Yg, y0 = Y(0);
        sut.style.transform = `scaleY(${okunan / 20})`; ib.setAttribute('y1', Y(okunan)); ib.setAttribute('y2', Y(okunan)); void y0;
      } else {
        sut.style.transform = `scaleX(${okunan / 20})`; const x = R.Xg(okunan); ib.setAttribute('x1', x); ib.setAttribute('x2', x);
      }
      const dz = okunan > 8 ? ['Yüksek', 'yuk'] : okunan < 2 ? ['Düşük', 'dus'] : ['Normal', 'nor'];
      q('sayi').textContent = 'CVP ≈ ' + fmt(okunan) + ' mmHg';
      const so = q('soz'); so.textContent = dz[0] + (h ? ' (okunan)' : ''); so.setAttribute('class', 'f38-t f38-soz-' + dz[1]);
      hv.textContent = h === 0 ? '0 cm' : (h > 0 ? '+' : '−') + Math.abs(h) + ' cm · okuma ' + (h > 0 ? '−' : '+') + fmt(Math.abs(K * h)) + ' mmHg';
      if (yaz !== false) {
        const p = [];
        if (h < 0) p.push('<b>Transdüser RA düzeyinin altında.</b> Okunan CVP olduğundan yüksektir.');
        if (h > 0) p.push('<b>Transdüser RA düzeyinin üstünde.</b> Okunan CVP olduğundan düşüktür.');
        if (ned) p.push(NED[ned][2]);
        if (!p.length) p.push('<b>Normal: 2–8 mmHg.</b> Transdüserin yüksekliğini değiştirin ya da bir neden seçin.');
        capYaz(el, p.join(' ') + ' [[K1 s. 167]]');
      }
    };
    rng.addEventListener('input', () => { h = +rng.value; guncelle(); });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.ned) { ned = ned === b.dataset.ned ? null : b.dataset.ned; basSec(el, 'ned', ned); guncelle(); }
      else if (b.dataset.a === 'sifir') { ned = null; h = 0; rng.value = 0; basSec(el, 'ned', ''); guncelle(); }
    });
    const ro = darIzle(el, (n) => { dar = n; ciz(); });
    return () => { ro(); };
  };

  /* =====================================================================
     4 · f38_starling — varsayım zinciri ve sıvı bolusuna CVP yanıtı (K1 s. 167)
     ===================================================================== */
  VIZ.f38_starling = (el) => {
    const SV = (p) => 0.2 + 0.75 * (1 - Math.exp(-p * 5)) - 2.2 * Math.max(0, p - 0.68) ** 2;
    const KOL = {
      yuk: { ad: 'Yükselen kol', p: [0.14, 0.3], c: [6, 10, 7], kal: false, sv: 'Atım hacmi ↑', svc: 'ok',
        cap: '<b>Yükselen kol.</b> Bolus verin: CVP geçici yükselir, atım hacmi artar. Daha sıvı gerekebilir; eğrideki yeri değiştirin. [[K1 s. 167]]' },
      pla: { ad: 'Plato', p: [0.5, 0.64], c: [12, 16, 16], kal: true, sv: 'Atım hacmi ≈', svc: 'muted',
        cap: '<b>Plato.</b> CVP kalıcı yükselir: RV en yüksek ön yükte ve mekanik dezavantajdadır; ek sıvı RV yetersizliğini tetikleyebilir. CO ancak kontraktiliteyi ya da kalp hızını artırarak veya art yükü azaltarak artar. [[K1 s. 167]]' },
      inn: { ad: 'İnen kol', p: [0.8, 0.95], c: [16, 20, 20], kal: true, sv: 'Atım hacmi ↓', svc: 'crit',
        cap: '<b>İnen kol.</b> Klinik kötüleşme ve belirgin CVP artışı: aşırı ön yük miyokard liflerini fazla gerer, RV yetersizliği gelişir. [[K1 s. 167]]' },
    };
    const CAP_Z = '<b>Varsayım zinciri.</b> CVP ≈ RAP; RAP kabaca RV ön yüküyle, RVEDP kabaca LV ön yüküyle uyuşur; LV ön yükü CO\'nun belirleyicilerinden biridir. Sağlıklı kişide bile varsayım çoktur: tek CVP değeri az işe yarar, eğilimi izleyin. [[K1 s. 167]]';
    const CAP_H = '<b>Hedef CVP.</b> Yeterli venöz dolum için sık anılan hedef 8–12 mmHg, mekanik ventilasyonda 12–15 mmHg\'dir; Surviving Sepsis (2016) CVP\'nin önemini azaltmıştır. [[K1 s. 167]]';
    el.innerHTML = `<div class="f38-ust">${segHtml('Eğrideki yer', 'kol', Object.entries(KOL).map(([k, o]) => [k, o.ad]), 'yuk', 'f38-seg')}
        <button type="button" class="btn" data-a="bolus">Sıvı bolusu ver</button>
        <button type="button" class="btn ghost f38-tgl" data-a="mv" aria-pressed="false">Mekanik ventilasyon</button></div>
      <div class="f38-sahne"></div><div class="f38-rozetler" aria-live="polite"></div>`;
    const sahne = el.querySelector('.f38-sahne'), rozEl = el.querySelector('.f38-rozetler'), mvB = el.querySelector('[data-a="mv"]');
    let dar = false, kol = 'yuk', mv = false, u = 0, anim = false, R = {};
    /* u: bolus animasyonu ilerlemesi 0..1 (0 = bolus öncesi) */
    const iz = (o, s) => { // s: grafikte normalleştirilmiş zaman 0..1; bolus 0,25'te
      const [b, tepe, son] = o.c;
      if (s <= 0.25) return b;
      const r = ss(0.25, 0.42, s);
      if (!o.kal) return lerp(b, tepe, r) - (tepe - son) * ss(0.44, 0.7, s);
      return lerp(b, tepe, ss(0.25, 0.46, s));
    };

    const ciz = () => {
      const kutular = [['CVP', ''], ['RAP', ''], ['RVEDP / RVEDV', '(RV ön yükü)'], ['LVEDP / LVEDV', '(LV ön yükü)'], ['CO', '']];
      const okEt = ['iyi yaklaşık', 'kabaca', 'kabaca', 'etkiler'];
      let B, oklar = '', zayif, S, C, H;
      if (!dar) {
        H = 410;
        const w = [54, 54, 116, 116, 48], g = (560 - 8 - w.reduce((a, b) => a + b, 0)) / 4;
        let x = 4; B = w.map((ww) => { const r = { x, y: 26, w: ww, h: 46 }; x += ww + g; return r; });
        for (let i = 0; i < 4; i++) { const a = B[i], b = B[i + 1], y = a.y + a.h / 2; oklar += `<path class="f38-zok" d="M${a.x + a.w + 3} ${y} L${b.x - 4} ${y}" marker-end="url(#f38-s-ok)"/><text class="f38-ts" x="${(a.x + a.w + b.x) / 2}" y="${a.y - 6}" text-anchor="middle">${okEt[i]}</text>`; }
        const a = B[0], d = B[3], ya = a.y + a.h;
        zayif = `<path class="f38-zayif" d="M${a.x + a.w / 2} ${ya + 3} C ${a.x + a.w / 2} ${ya + 34}, ${d.x + d.w / 2} ${ya + 34}, ${d.x + d.w / 2} ${ya + 3}"/><text class="f38-ts f38-warn" x="${(a.x + d.x + d.w) / 2}" y="${ya + 42}" text-anchor="middle">LVEDV ile CVP zayıf uyuşur</text>`;
        S = { x0: 46, x1: 262, y0: 352, y1: 150 }; C = { x0: 322, x1: 548, y0: 352, y1: 150 };
      } else {
        H = 690;
        B = [{ x: 34, y: 24, w: 50, h: 44 }, { x: 132, y: 24, w: 50, h: 44 }, { x: 232, y: 24, w: 122, h: 44 }, { x: 34, y: 116, w: 130, h: 44 }, { x: 250, y: 116, w: 56, h: 44 }];
        const hor = (a, b, l) => { const y = a.y + a.h / 2; return `<path class="f38-zok" d="M${a.x + a.w + 3} ${y} L${b.x - 4} ${y}" marker-end="url(#f38-s-ok)"/><text class="f38-ts" x="${(a.x + a.w + b.x) / 2}" y="${a.y - 7}" text-anchor="middle">${l}</text>`; };
        oklar = hor(B[0], B[1], okEt[0]) + hor(B[1], B[2], okEt[1]) + hor(B[3], B[4], okEt[3]);
        const r = B[2], l = B[3];
        oklar += `<path class="f38-zok" d="M${r.x + r.w / 2} ${r.y + r.h + 3} V 90 H ${l.x + l.w / 2} V ${l.y - 4}" marker-end="url(#f38-s-ok)"/><text class="f38-ts" x="${(r.x + r.w / 2 + l.x + l.w / 2) / 2}" y="86" text-anchor="middle">kabaca</text>`;
        zayif = `<path class="f38-zayif" d="M${B[0].x - 3} ${B[0].y + 22} C 6 ${B[0].y + 40}, 6 ${l.y + 4}, ${l.x - 3} ${l.y + 22}"/><text class="f38-ts f38-warn" x="8" y="${l.y + l.h + 20}">LVEDV ile CVP zayıf uyuşur</text>`;
        S = { x0: 48, x1: 346, y0: 402, y1: 210 }; C = { x0: 48, x1: 346, y0: 642, y1: 462 };
      }
      const SX = (p) => S.x0 + (S.x1 - S.x0) * p, SY = (v) => S.y0 - (S.y0 - S.y1) * (v - 0.1) / 0.9;
      const CX = (s) => C.x0 + (C.x1 - C.x0) * s, CY = (p) => C.y0 - (C.y0 - C.y1) * p / 20;
      let eg = ''; for (let i = 0; i <= 80; i++) { const p = i / 80; eg += (i ? 'L' : 'M') + SX(p).toFixed(1) + ' ' + SY(SV(p)).toFixed(1); }
      const bol = [[0, 0.42, 'Yükselen kol', 'ok'], [0.42, 0.72, 'Plato', 'pla'], [0.72, 1, 'İnen kol', 'crit']];
      sahne.innerHTML = `<svg class="f38-svg${dar ? ' f38-dar' : ''}" viewBox="0 0 ${dar ? 360 : 560} ${H}" role="img" aria-label="CVP'den kalp debisine varsayım zinciri, sağ ventrikül Starling eğrisi ve sıvı bolusundan sonra CVP eğilimi">
        <defs>${okDef('f38-s-ok', 'f38-uc-m')}${okDef('f38-s-okk', 'f38-uc-a')}</defs>
        ${B.map((b, i) => `<g class="f38-kutu" data-zincir="${i}" role="button" tabindex="0" aria-label="Varsayım zinciri: ${kutular[i][0]}"><rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="8"/><text class="f38-t" x="${b.x + b.w / 2}" y="${b.y + (kutular[i][1] ? 19 : 28)}" text-anchor="middle">${kutular[i][0]}</text>${kutular[i][1] ? `<text class="f38-ts" x="${b.x + b.w / 2}" y="${b.y + 36}" text-anchor="middle">${kutular[i][1]}</text>` : ''}</g>`).join('')}
        ${oklar}${zayif}
        ${bol.map(([a, b, l, c]) => `<rect class="f38-bol ${c}" x="${SX(a)}" y="${S.y1}" width="${SX(b) - SX(a)}" height="${S.y0 - S.y1}"/><text class="f38-ts" x="${(SX(a) + SX(b)) / 2}" y="${S.y0 + 15}" text-anchor="middle">${l}</text>`).join('')}
        <line class="f38-eks" x1="${S.x0}" x2="${S.x1}" y1="${S.y0}" y2="${S.y0}"/><line class="f38-eks" x1="${S.x0}" x2="${S.x0}" y1="${S.y0}" y2="${S.y1}"/>
        <text class="f38-ts" x="${(S.x0 + S.x1) / 2}" y="${S.y0 + 32}" text-anchor="middle">RV ön yükü →</text>
        <text class="f38-ts" transform="translate(${S.x0 - 12} ${(S.y0 + S.y1) / 2}) rotate(-90)" text-anchor="middle">Atım hacmi / CO</text>
        <path class="f38-egri" d="${eg}"/>
        <path class="f38-sok" data-r="sok" marker-end="url(#f38-s-okk)"/>
        <circle class="f38-nok0" data-r="n0" r="6"/><circle class="f38-nok" data-r="n1" r="7"/>
        <text class="f38-t" data-r="svt"></text>
        <rect class="f38-hb" data-r="hb1" x="${C.x0}" y="${CY(12)}" width="${C.x1 - C.x0}" height="${CY(8) - CY(12)}"/>
        <rect class="f38-hb" data-r="hb2" x="${C.x0}" y="${CY(15)}" width="${C.x1 - C.x0}" height="${CY(12) - CY(15)}"/>
        <text class="f38-ts f38-okt" data-r="hbt1" x="${C.x0 + 6}" y="${CY(12) + 14}">Hedef 8–12</text>
        <text class="f38-ts f38-okt" data-r="hbt2" x="${C.x0 + 6}" y="${CY(15) + 13}">Mekanik ventilasyonda 12–15</text>
        ${[0, 8, 12, 15, 20].map((p) => `<text class="f38-tk" x="${C.x0 - 6}" y="${CY(p) + 4}" text-anchor="end">${p}</text>`).join('')}
        <line class="f38-eks" x1="${C.x0}" x2="${C.x1}" y1="${C.y0}" y2="${C.y0}"/><line class="f38-eks" x1="${C.x0}" x2="${C.x0}" y1="${C.y0}" y2="${C.y1}"/>
        <text class="f38-ts" x="${(C.x0 + C.x1) / 2}" y="${C.y0 + 18}" text-anchor="middle">Zaman →</text>
        <text class="f38-ts" transform="translate(${C.x0 - 26} ${(C.y0 + C.y1) / 2}) rotate(-90)" text-anchor="middle">CVP (mmHg)</text>
        <path class="f38-bolok" d="M${CX(0.25)} ${C.y1 - 2} L${CX(0.25)} ${C.y1 + 20}" marker-end="url(#f38-s-okk)"/>
        <text class="f38-ts f38-acc" x="${CX(0.25) - 6}" y="${C.y1 + 12}" text-anchor="end">Bolus</text>
        <path class="f38-iz-a" data-r="ciz"/><circle class="f38-imlec-n" data-r="cn" r="4.5"/>
        <text class="f38-t" data-r="cvt" text-anchor="end"></text>
      </svg>`;
      const svg = sahne.querySelector('svg');
      R = { SX, SY, CX, CY, C, q: (s) => svg.querySelector(`[data-r="${s}"]`) };
      goster();
    };
    const goster = () => {
      const { q, SX, SY, CX, CY } = R; if (!q) return;
      const o = KOL[kol], e = ease(clamp(u / 0.55, 0, 1));
      const p0 = o.p[0], p = lerp(o.p[0], o.p[1], e);
      q('n0').setAttribute('cx', SX(p0)); q('n0').setAttribute('cy', SY(SV(p0))); q('n0').style.opacity = u > 0 ? 1 : 0;
      q('n1').setAttribute('cx', SX(p)); q('n1').setAttribute('cy', SY(SV(p))); q('n1').setAttribute('class', 'f38-nok ' + o.svc);
      const sk = q('sok');
      if (u >= 0.55) { sk.setAttribute('d', `M${SX(p0) + 6} ${SY(SV(p0)) - 4} Q ${(SX(p0) + SX(o.p[1])) / 2} ${Math.min(SY(SV(p0)), SY(SV(o.p[1]))) - 24} ${SX(o.p[1]) - 4} ${SY(SV(o.p[1])) - 8}`); sk.style.opacity = 1; } else sk.style.opacity = 0;
      const st = q('svt');
      st.textContent = u >= 0.55 ? o.sv : ''; st.setAttribute('class', 'f38-t f38-sv-' + o.svc);
      const sx = SX(o.p[1]), sy = SY(SV(o.p[1]));
      st.setAttribute('x', kol === 'yuk' ? sx + 12 : sx - 4); st.setAttribute('y', kol === 'yuk' ? sy + 18 : sy + 26); st.setAttribute('text-anchor', kol === 'yuk' ? 'start' : 'middle');
      const sSon = u > 0 ? 0.25 + 0.75 * clamp(u, 0, 1) : 0.25;
      let d = ''; const n = 90;
      for (let i = 0; i <= n; i++) { const s = sSon * i / n; d += (i ? 'L' : 'M') + CX(s).toFixed(1) + ' ' + CY(iz(o, s)).toFixed(1); }
      q('ciz').setAttribute('d', d);
      const v = iz(o, sSon); q('cn').setAttribute('cx', CX(sSon)); q('cn').setAttribute('cy', CY(v));
      const cv = q('cvt'); cv.textContent = fmt(v, 0) + ' mmHg'; cv.setAttribute('x', R.C.x1 - 2); cv.setAttribute('y', Math.max(R.C.y1 + 14, CY(v) - 10));
      q('hb1').setAttribute('class', 'f38-hb' + (mv ? ' sol' : ' on')); q('hb2').setAttribute('class', 'f38-hb kes' + (mv ? ' on' : ' sol'));
      q('hbt1').style.opacity = mv ? 0.55 : 1; q('hbt2').style.opacity = mv ? 1 : 0.55;
      let rz = '';
      if (u >= 1 || (RM && u > 0)) {
        if (kol === 'yuk') rz = '<span class="f38-rz ok">Geçici yükselme · daha sıvı gerekebilir</span>';
        if (kol === 'pla') rz = '<span class="f38-rz warn">RVF riski</span><span class="f38-rz">Kontraktilite ↑</span><span class="f38-rz">Kalp hızı ↑</span><span class="f38-rz">Art yük ↓</span>';
        if (kol === 'inn') rz = '<span class="f38-rz crit">Klinik kötüleşme</span><span class="f38-rz crit f38-lif"><svg viewBox="0 0 60 14" aria-hidden="true"><path d="M2 7 C 10 5, 14 9, 22 7 S 34 5, 42 7 S 52 9, 58 7"/></svg>RV kas lifleri aşırı gerilmiş</span>';
      }
      if (rozEl.innerHTML !== rz) rozEl.innerHTML = rz;
    };
    const bolus = () => { u = RM ? 1 : 0.001; anim = !RM; goster(); };
    el.addEventListener('click', (e) => {
      const z = e.target.closest('[data-zincir]'); if (z && el.contains(z)) { capYaz(el, CAP_Z); return; }
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.kol) { kol = b.dataset.kol; basSec(el, 'kol', kol); u = 0; anim = false; capYaz(el, KOL[kol].cap); goster(); }
      else if (b.dataset.a === 'bolus') { capYaz(el, KOL[kol].cap); bolus(); }
      else if (b.dataset.a === 'mv') { mv = !mv; mvB.setAttribute('aria-pressed', String(mv)); capYaz(el, CAP_H); goster(); }
    });
    el.addEventListener('keydown', (e) => { const z = e.target.closest('[data-zincir]'); if (z && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); capYaz(el, CAP_Z); } });
    const ro = darIzle(el, (n) => { dar = n; ciz(); });
    const stop = RM ? () => {} : ticker(el, (dt) => { if (!anim) return; u = Math.min(1, u + dt / 3); if (u >= 1) anim = false; goster(); });
    return () => { stop(); ro(); };
  };
})();
