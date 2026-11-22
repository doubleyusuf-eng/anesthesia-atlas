/* Fizyoloji Bölüm 28 · Kardiyak siklus · bileşenler (K1 s. 117–120). Tarif: docs/tasarim/fiz28.md
   1 f28_halka    siklusun saati: 0,8 s, altı evre, kapak durumları (K1 s. 117–119)
   2 f28_wiggers  kardiyak siklus diyagramı: basınçlar, hacim, EKG, sesler, adım adım (K1 s. 117–119)
   3 f28_dalga    atriyal basınç dalgası (a, c, x, v, y) ve kalp sesleri (S1, S2, S3), dikrotik çentik (K1 s. 117–119)
   4 f28_hacim    LVEDV / LVESV → SV ve EF (K1 s. 119)
   5 f28_hiz      kalp hızı, diyastol süresi, yaş ve HRmax, AF (K1 s. 119–120)
   6 f28_kapak    kapak lezyonları ve hemodinamik hedefler (K1 s. 120)
   Eğriler şematiktir; yalnız 0,8/0,3/0,5 s ve 120/50/70 mL kitaptandır. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const vir = (v, d = 0) => { const k = 10 ** d, r = Math.round(v * k) / k; return (r === 0 ? 0 : r).toFixed(d).replace('.', ',').replace('-', '−'); };
  const capOf = (el) => { const v = el.closest('.viz'); return v ? v.querySelector('.viz-cap') : null; };
  const setCap = (cap, html) => { if (cap) cap.innerHTML = REF(html); };
  let SAY = 0;
  const yeniId = (ad) => `f28-${ad}-${++SAY}`;
  const f1 = (v) => (+v).toFixed(1);

  /* genişliğe göre yerleşim: mod değişince yeniden kur (eski kurulumun temizliği çağrılır) */
  const duyarli = (el, modFn, kur) => {
    let mod = null, temiz = null;
    const bak = () => { const w = el.clientWidth; const m = modFn(w > 0 ? w : 900); if (m !== mod) { mod = m; if (temiz) temiz(); temiz = kur(m) || null; } };
    bak();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(bak) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); if (temiz) temiz(); };
  };
  const darMi = (w) => (w < 560 ? 'dar' : 'gen');

  /* SVG koordinatı (dokunma/sürükleme) */
  const svgX = (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const m = svg.getScreenCTM(); return m ? p.matrixTransform(m.inverse()) : { x: 0, y: 0 }; };

  /* monoton kübik ara değer (Fritsch–Carlson) */
  function mono(P) {
    const n = P.length, x = P.map((p) => p[0]), y = P.map((p) => p[1]), h = [], d = [];
    for (let i = 0; i < n - 1; i++) { h[i] = x[i + 1] - x[i]; d[i] = (y[i + 1] - y[i]) / h[i]; }
    const m = new Array(n);
    m[0] = d[0]; m[n - 1] = d[n - 2];
    for (let i = 1; i < n - 1; i++) {
      if (d[i - 1] * d[i] <= 0) m[i] = 0;
      else { const w1 = 2 * h[i] + h[i - 1], w2 = h[i] + 2 * h[i - 1]; m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]); }
    }
    return (t) => {
      if (t <= x[0]) return y[0];
      if (t >= x[n - 1]) return y[n - 1];
      let i = 0;
      while (i < n - 2 && t > x[i + 1]) i++;
      const s = (t - x[i]) / h[i], s2 = s * s, s3 = s2 * s;
      return (2 * s3 - 3 * s2 + 1) * y[i] + (s3 - 2 * s2 + s) * h[i] * m[i] + (-2 * s3 + 3 * s2) * y[i + 1] + (s3 - s2) * h[i] * m[i + 1];
    };
  }

  /* ---------- ortak zaman modeli (şematik; siklus 0,8 s, sistol 0,3 s, diyastol 0,5 s: K1 s. 119) ---------- */
  const SIK = 0.8;
  const EV = [
    { ad: 'Yavaş ventriküler doluş', kisa: 'yavaş doluş', kk: 'yavaş doluş', t0: 0, t1: 0.18, sis: false, dol: true, hok: '↗', hac: 'yavaşça artar' },
    { ad: 'Atriyal kasılma', kisa: 'atriyal kasılma', kk: 'atriyal kasılma', t0: 0.18, t1: 0.30, sis: false, dol: true, hok: '↑', hac: 'son katkı → diyastol sonu hacmi' },
    { ad: 'İzovolümetrik kasılma', kisa: 'İV kasılma', kk: 'İVK', t0: 0.30, t1: 0.35, sis: true, hok: '=', hac: 'sabit' },
    { ad: 'Ejeksiyon', kisa: 'ejeksiyon', kk: 'ejeksiyon', t0: 0.35, t1: 0.60, sis: true, hok: '↓', hac: 'azalır → sistol sonu hacmi' },
    { ad: 'İzovolümetrik gevşeme', kisa: 'İV gevşeme', kk: 'İVG', t0: 0.60, t1: 0.67, sis: false, hok: '=', hac: 'sabit' },
    { ad: 'Hızlı ventriküler doluş', kisa: 'hızlı doluş', kk: 'hızlı doluş', t0: 0.67, t1: 0.80, sis: false, dol: true, hok: '↑', hac: 'hızla artar' },
  ];
  const evreOf = (t) => { for (let i = 0; i < 6; i++) if (t < EV[i].t1) return i; return 5; };
  const orta = (i) => (EV[i].t0 + EV[i].t1) / 2;
  // LV 0,28 s düğümü 6 → 5,5 mmHg (atriyal eğriyi 0,28 yerine ≈ 0,29 s'de, S1'e yakın kessin diye; raporda belirtildi)
  const LV = mono([[0, 2.5], [0.18, 3.5], [0.25, 5.5], [0.28, 5.5], [0.30, 7], [0.35, 80], [0.45, 120], [0.55, 110], [0.60, 100], [0.665, 6.5], [0.72, 2], [0.80, 2.5]]);
  const AO = mono([[0, 88], [0.18, 84], [0.30, 81], [0.35, 80], [0.45, 118], [0.55, 108], [0.60, 100], [0.61, 96], [0.63, 101], [0.80, 88]]);
  const ATR = mono([[0, 3], [0.18, 4], [0.25, 7], [0.28, 6], [0.30, 5], [0.33, 5.5], [0.42, 0], [0.60, 5], [0.665, 7], [0.74, 2], [0.80, 3]]);
  const VOL = mono([[0, 100], [0.18, 113], [0.30, 120], [0.35, 120], [0.45, 75], [0.60, 50], [0.67, 50], [0.80, 100]]);
  const gauss = (t, m, s) => Math.exp(-((t - m) * (t - m)) / (2 * s * s));
  const EKG = (t) => 0.13 * gauss(t, 0.2, 0.017) - 0.1 * gauss(t, 0.278, 0.004) + 1 * gauss(t, 0.29, 0.0045) - 0.22 * gauss(t, 0.302, 0.004) + 0.26 * gauss(t, 0.53, 0.026);
  const kes = (f, a, b) => { let fa = f(a); for (let i = 0; i < 50; i++) { const m = (a + b) / 2, fm = f(m); if (fa * fm <= 0) b = m; else { a = m; fa = fm; } } return (a + b) / 2; };
  const T_MK = kes((t) => LV(t) - ATR(t), 0.25, 0.31); // mitral kapanır (LV > atriyum)
  const T_MA = kes((t) => LV(t) - ATR(t), 0.61, 0.70); // mitral açılır (atriyum > LV)
  const avAcik = (t) => t < T_MK || t >= T_MA;
  const slAcik = (t) => t >= 0.35 && t < 0.60;

  /* kapak yaprağı ucu: post (px,py), merkeze yön dx (±1), akım yönü ny (±1), uzunluk L, açı θ (0 kapalı) */
  const yaprak = (px, py, dx, ny, L, th) => { const q = (th * Math.PI) / 180; return [px + dx * L * Math.cos(q), py + ny * L * Math.sin(q)]; };

  /* =====================================================================
     1 · Siklusun saati
     ===================================================================== */
  const HALKA_CAP = [
    '<b>Yavaş ventriküler doluş · diyastol.</b> Atriyal basınç ventrikülünkinden biraz yüksektir; AV kapaklar açık, kan yavaşça akar. [[K1 s. 117]]',
    '<b>Atriyal kasılma · diyastol.</b> Atriyumda kalan kanın çoğu ventriküle atılır; istirahatte doluşun %10\'u, egzersizde %40\'a kadarı. [[K1 s. 117]]',
    '<b>İzovolümetrik kasılma · sistol.</b> Dört kapak da kapalı: basınç yükselir, hacim değişmez. [[K1 s. 117]]',
    '<b>Ejeksiyon · sistol.</b> Ventrikül basıncı aort ve pulmoner arterinkini aşınca semilüner kapaklar açılır ve kan atılır. [[K1 s. 118]]',
    '<b>İzovolümetrik gevşeme · diyastol.</b> Semilüner kapaklar kapanmıştır; ventrikül basıncı atriyumunkinin altına inene kadar hacim değişmez. [[K1 s. 119]]',
    '<b>Hızlı ventriküler doluş · diyastol.</b> Atriyal basınç ventrikülünkini aşınca AV kapaklar açılır; ventrikül hâlâ gevşediği için kan hızla akar. [[K1 s. 119]]',
  ];
  const HK_AV = [true, true, false, false, false, true];
  const HK_SL = [false, false, false, true, false, false];

  VIZ.f28_halka = (el) => {
    const cap = capOf(el);
    const st = { t: RM ? orta(0) : 0, oyn: !RM, dokundu: false };
    return duyarli(el, darMi, (mod) => {
      const dar = mod === 'dar';
      const W = dar ? 340 : 640, H = dar ? 582 : 340, cx = 170, cy = dar ? 160 : 170, r = dar ? 120 : 130, k = dar ? 32 : 34;
      const ri = r - k / 2, ro = r + k / 2;
      const pt = (R, a) => { const q = (a * Math.PI) / 180; return [cx + R * Math.sin(q), cy - R * Math.cos(q)]; };
      const P = (p) => f1(p[0]) + ' ' + f1(p[1]);
      const ang = (t) => (t / SIK) * 360;
      const yay = (a0, a1) => { const lg = a1 - a0 > 180 ? 1 : 0; return `M${P(pt(ro, a0))} A${ro} ${ro} 0 ${lg} 1 ${P(pt(ro, a1))} L${P(pt(ri, a1))} A${ri} ${ri} 0 ${lg} 0 ${P(pt(ri, a0))}Z`; };
      const yol = (R, a0, a1, ters) => { const lg = a1 - a0 > 180 ? 1 : 0; return ters ? `M${P(pt(R, a1))} A${R} ${R} 0 ${lg} 0 ${P(pt(R, a0))}` : `M${P(pt(R, a0))} A${R} ${R} 0 ${lg} 1 ${P(pt(R, a1))}`; };
      const id = yeniId('hk');
      let defs = '', arcs = '', lbl = '';
      EV.forEach((e, i) => {
        const a0 = ang(e.t0) + 0.8, a1 = ang(e.t1) - 0.8, am = (a0 + a1) / 2, ters = am > 90 && am < 270;
        const cls = e.sis ? 's' : e.dol ? 'd' : 'g';
        arcs += `<path class="f28-hk-yay f28-hk-${cls}" data-i="${i}" d="${yay(a0, a1)}" role="button" tabindex="0" aria-label="${e.ad}"/>`;
        defs += `<path id="${id}-${i}" d="${yol(ters ? r + 4.5 : r - 4.5, a0, a1, ters)}"/>`;
        lbl += `<text class="f28-hk-yl f28-hk-yl-${cls}"><textPath href="#${id}-${i}" startOffset="50%" text-anchor="middle">${i === 2 || i === 4 ? e.kk : e.kisa}</textPath></text>`;
      });
      defs += `<path id="${id}-d" d="${yol(ro + 6, 270, 495, false)}"/><path id="${id}-s" d="${yol(ro + 17, 135, 270, true)}"/>`;
      const kx = dar ? 24 : 352, ky = dar ? 356 : 64;
      const kapak = (y, cls) => `<g class="f28-kp ${cls}" transform="translate(${kx} ${y})"><circle class="f28-kp-p" cx="0" cy="0" r="3.5"/><circle class="f28-kp-p" cx="40" cy="0" r="3.5"/><line class="f28-kp-y" x1="0" y1="0" x2="19" y2="0"/><line class="f28-kp-y" x1="40" y1="0" x2="21" y2="0"/></g>`;
      el.innerHTML = `<svg class="f28-svg f28-hk${dar ? ' dar' : ''}" viewBox="0 0 ${W} ${H}" role="group" aria-label="Kardiyak siklusun altı evresi bir saat halkası üzerinde; bir evreye dokunun">
        <defs>${defs}</defs>
        ${arcs}
        <g aria-hidden="true">${lbl}
          <text class="f28-hk-kemer f28-hk-kd"><textPath href="#${id}-d" startOffset="50%" text-anchor="middle">DİYASTOL 0,5 s</textPath></text>
          <text class="f28-hk-kemer f28-hk-ks"><textPath href="#${id}-s" startOffset="50%" text-anchor="middle">SİSTOL 0,3 s</textPath></text>
          <circle class="f28-hk-mrk" cx="${cx}" cy="${cy}" r="${ri - 10}"/>
          <text class="f28-hk-faz" x="${cx}" y="${cy + 6}" text-anchor="middle"></text>
          <text class="f28-hk-alt" x="${cx}" y="${cy + 28}" text-anchor="middle">1 siklus = 0,8 s</text>
          <line class="f28-hk-ibre" x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - ri}"/>
          <circle class="f28-hk-uc" cx="${cx}" cy="${cy - r}" r="7"/>
          <circle class="f28-hk-mrk2" cx="${cx}" cy="${cy}" r="4"/>
        </g>
        <g class="f28-hk-kart" aria-hidden="true">
          <rect class="f28-kart" x="${kx - 14}" y="${ky - 30}" width="${dar ? 306 : 284}" height="${dar ? 222 : 234}" rx="12"/>
          <text class="f28-k-ust" x="${kx}" y="${ky - 8}">Şu anki evre</text>
          <text class="f28-k-ad" x="${kx}" y="${ky + 18}"></text>
          <text class="f28-k-faz" x="${kx}" y="${ky + 40}"></text>
          ${kapak(ky + 70, 'av')}
          <text class="f28-k-b" x="${kx + 54}" y="${ky + 68}" data-o="av"></text>
          <text class="f28-k-m" x="${kx + 54}" y="${ky + 85}">(mitral, triküspit)</text>
          ${kapak(ky + 114, 'sl')}
          <text class="f28-k-b" x="${kx + 54}" y="${ky + 112}" data-o="sl"></text>
          <text class="f28-k-m" x="${kx + 54}" y="${ky + 129}">(aort, pulmoner)</text>
          <text class="f28-k-m" x="${kx}" y="${ky + 160}">Ventrikül hacmi</text>
          <text class="f28-k-hac" x="${kx}" y="${ky + 182}" data-o="hac"></text>
        </g>
      </svg>
      <div class="f28-ctl">${RM ? '' : `<button type="button" class="btn ghost play" data-a="oyn">${st.oyn ? '❚❚ Duraklat' : '▶ Oynat'}</button>`}<span class="f28-sayac" aria-hidden="true"></span><span class="f28-ipucu">Halkadaki bir evreye dokunun.</span></div>`;
      const svg = el.querySelector('svg'), ibre = svg.querySelector('.f28-hk-ibre'), uc = svg.querySelector('.f28-hk-uc');
      const sayac = el.querySelector('.f28-sayac'), oynB = el.querySelector('[data-a="oyn"]');
      const o = (s) => svg.querySelector(s);
      const kpAyar = (g, acik) => { const [a, b] = g.querySelectorAll('.f28-kp-y'); a.setAttribute('x2', acik ? 8 : 19); a.setAttribute('y2', acik ? 17 : 0); b.setAttribute('x2', acik ? 32 : 21); b.setAttribute('y2', acik ? 17 : 0); g.classList.toggle('acik', acik); };
      let cur = -1;
      const render = () => {
        const a = ang(st.t), [px, py] = pt(r, a), [qx, qy] = pt(ri - 12, a);
        ibre.setAttribute('x2', f1(qx)); ibre.setAttribute('y2', f1(qy));
        uc.setAttribute('cx', f1(px)); uc.setAttribute('cy', f1(py));
        sayac.textContent = `t = ${vir(st.t, 2)} s`;
        const i = evreOf(st.t);
        if (i === cur) return;
        cur = i;
        const e = EV[i];
        svg.querySelectorAll('.f28-hk-yay').forEach((p) => p.classList.toggle('on', +p.dataset.i === i));
        o('.f28-hk-faz').textContent = e.sis ? 'SİSTOL' : 'DİYASTOL';
        o('.f28-hk-faz').classList.toggle('s', e.sis);
        o('.f28-k-ad').textContent = e.ad;
        o('.f28-k-faz').textContent = `Faz: ${e.sis ? 'sistol' : 'diyastol'} · evre ≈ ${vir(e.t1 - e.t0, 2)} s`;
        kpAyar(o('.f28-kp.av'), HK_AV[i]); kpAyar(o('.f28-kp.sl'), HK_SL[i]);
        o('[data-o="av"]').textContent = `AV kapaklar: ${HK_AV[i] ? 'açık' : 'kapalı'}`;
        o('[data-o="sl"]').textContent = `Semilüner kapaklar: ${HK_SL[i] ? 'açık' : 'kapalı'}`;
        o('[data-o="hac"]').textContent = `${e.hok}  ${e.hac}`;
        if (st.dokundu) setCap(cap, HALKA_CAP[i]);
      };
      const oynAyar = () => { if (oynB) { oynB.textContent = st.oyn ? '❚❚ Duraklat' : '▶ Oynat'; oynB.setAttribute('aria-pressed', String(st.oyn)); } if (cap) cap.setAttribute('aria-live', st.oyn && st.dokundu ? 'off' : 'polite'); };
      const sec = (i) => { st.dokundu = true; st.oyn = false; st.t = orta(i); cur = -1; oynAyar(); render(); };
      svg.addEventListener('click', (e) => { const p = e.target.closest('.f28-hk-yay'); if (p) sec(+p.dataset.i); });
      svg.addEventListener('keydown', (e) => { const p = e.target.closest('.f28-hk-yay'); if (p && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sec(+p.dataset.i); } });
      if (oynB) oynB.addEventListener('click', () => { st.dokundu = true; st.oyn = !st.oyn; oynAyar(); cur = -1; render(); });
      oynAyar();
      render();
      return RM ? () => {} : ticker(svg, (dt) => { if (st.oyn) { st.t = (st.t + dt / 10) % SIK; render(); } });
    });
  };

  /* =====================================================================
     2 · Kardiyak siklus diyagramı (ana bileşen)
     ===================================================================== */
  const ADIM = [
    '<b>1 · Yavaş ventriküler doluş.</b> Atriyal basınç ventrikül basıncından biraz yüksektir; AV kapaklar açıktır ve kan atriyumdan ventriküle yavaşça akar. İleri düğmesiyle evreleri izleyin. [[K1 s. 117]]',
    '<b>2 · Atriyal kasılma.</b> SA düğümün pacemaker hücreleri kendiliğinden depolarize olur; uyarı atriyumlara hızla yayılır (P dalgası) ve atriyumlar kasılır. Atriyal itki istirahatte doluşun yalnız %10\'udur; basınç kapaksız venlere geri iletilir: a dalgası. Bu evrenin sonundaki hacim diyastol sonu hacmidir (LVEDV 120 mL). [[K1 s. 117, 119]]',
    '<b>3 · İzovolümetrik kasılma.</b> Uyarı AV düğüm ve His–Purkinje sistemiyle ventriküllere yayılır (QRS). Ventrikül basıncı atriyumunkini aşınca AV kapaklar kapanır: S1 (mitral triküspitten biraz önce). Semilüner kapaklar henüz kapalıdır: basınç hızla yükselir, hacim değişmez; yükselişin eğimi kontraktiliteyi yansıtır. Kapağın atriyuma bombeleşmesi c dalgasıdır. [[K1 s. 117–118]]',
    '<b>4 · Ejeksiyon.</b> Ventrikül basıncı aort ve pulmoner arterinkini (burada ≈ 80 mmHg) aşınca semilüner kapaklar açılır. Akım önce hızlıdır; miyositler repolarize olmaya başlayınca (T dalgası) kuvvet azalır. Ventrikül triküspit kapağı aşağı çeker: x inişi. Hacim 120 mL\'den 50 mL\'ye iner (SV 70 mL). [[K1 s. 118–119]]',
    '<b>5 · İzovolümetrik gevşeme.</b> Ventrikül basıncı aortunkinin altına inince semilüner kapaklar kapanır: S2 (aort pulmonerden biraz önce) ve aort eğrisinde dikrotik çentik. Kalan hacim sistol sonu hacmidir (LVESV 50 mL). Basıncın atriyumunkinin altına inmesi kısa sürer; bu sırada venöz dönüş atriyal basıncı yükseltir: v dalgası. [[K1 s. 118–119]]',
    '<b>6 · Hızlı ventriküler doluş.</b> Atriyal basınç ventrikülünkini aşınca AV kapaklar açılır. Ventrikül hâlâ gevşediği için basıncı düşmeyi sürdürür ve kan hızla dolar; atriyal basınç düşer: y inişi. Sonra yavaş doluşla siklus yeniden başlar. [[K1 s. 119]]',
  ];

  /* sol kalp şeması (yerel koordinat, taban y = 106) */
  const KB = 106;
  const kalpSvg = (okId, dar) => `
    <path class="f28-kl-lv" d="M20 ${KB} C20 200 50 260 83 262 C116 260 146 200 146 ${KB} Z"/>
    <rect class="f28-kl-ao" x="104" y="6" width="34" height="${KB - 6}"/>
    <ellipse class="f28-kl-la" cx="50" cy="64" rx="46" ry="42"/>
    <line class="f28-kl-ok f28-kl-okd" x1="50" y1="58" x2="50" y2="146" marker-end="url(#${okId})"/>
    <line class="f28-kl-ok f28-kl-oke" x1="121" y1="214" x2="121" y2="26" marker-end="url(#${okId})"/>
    <g class="f28-kl-mv"><line class="f28-kl-y" x1="28" y1="${KB}"/><line class="f28-kl-y" x1="72" y1="${KB}"/><circle class="f28-kl-p" cx="28" cy="${KB}" r="3.5"/><circle class="f28-kl-p" cx="72" cy="${KB}" r="3.5"/></g>
    <g class="f28-kl-av"><line class="f28-kl-y" x1="104" y1="${KB}"/><line class="f28-kl-y" x1="138" y1="${KB}"/><circle class="f28-kl-p" cx="104" cy="${KB}" r="3.5"/><circle class="f28-kl-p" cx="138" cy="${KB}" r="3.5"/></g>
    <text class="f28-kl-t" x="50" y="${dar ? 50 : 46}" text-anchor="middle">${dar ? 'LA' : 'Sol atriyum'}</text>
    <text class="f28-kl-t" x="${dar ? 76 : 83}" y="${dar ? 176 : 170}" text-anchor="middle">${dar ? 'LV' : 'Sol ventrikül'}</text>
    <text class="f28-kl-sabit" x="${dar ? 76 : 83}" y="${dar ? 206 : 190}" text-anchor="middle">hacim sabit</text>
    <text class="f28-kl-t f28-kl-tao" x="144" y="${dar ? 34 : 26}">${dar ? 'Ao' : 'Aort'}</text>`;
  const kalpAyar = (g, t) => {
    const v = VOL(t), s = 0.7 + (0.3 * (v - 50)) / 70, i = evreOf(t);
    g.querySelector('.f28-kl-lv').setAttribute('transform', `translate(83 ${KB}) scale(${s.toFixed(3)}) translate(-83 -${KB})`);
    const av = avAcik(t), sl = slAcik(t);
    const [m1, m2] = g.querySelectorAll('.f28-kl-mv .f28-kl-y'), [a1, a2] = g.querySelectorAll('.f28-kl-av .f28-kl-y');
    const set = (ln, p) => { ln.setAttribute('x2', f1(p[0])); ln.setAttribute('y2', f1(p[1])); };
    set(m1, yaprak(28, KB, 1, 1, 21, av ? 70 : 0)); set(m2, yaprak(72, KB, -1, 1, 21, av ? 70 : 0));
    set(a1, yaprak(104, KB, 1, -1, 16.5, sl ? 70 : 0)); set(a2, yaprak(138, KB, -1, -1, 16.5, sl ? 70 : 0));
    g.querySelector('.f28-kl-mv').classList.toggle('acik', av);
    g.querySelector('.f28-kl-av').classList.toggle('acik', sl);
    const okd = g.querySelector('.f28-kl-okd');
    okd.classList.toggle('on', av); okd.classList.toggle('kalin', i === 1);
    g.querySelector('.f28-kl-oke').classList.toggle('on', sl);
    g.querySelector('.f28-kl-sabit').classList.toggle('on', i === 2 || i === 4);
  };

  VIZ.f28_wiggers = (el) => {
    const cap = capOf(el);
    const st = { t: 0.17, cur: 0, mod: 'dur', k0: 0, k1: 0, kz: 0 };
    return duyarli(el, darMi, (m) => {
      const dar = m === 'dar';
      const G = dar
        ? { W: 400, H: 742, x0: 44, x1: 388, kemer: 216, bant: 236, P: [246, 404], Z: [416, 488], V: [500, 570], E: [580, 618], S: [624, 650], ax: 654, tk: 672 }
        : { W: 920, H: 574, x0: 60, x1: 700, kemer: 13, bant: 33, P: [42, 262], Z: [274, 352], V: [366, 442], E: [452, 494], S: [502, 530], ax: 536, tk: 553 };
      const X = (t) => G.x0 + (t / SIK) * (G.x1 - G.x0);
      const Xi = (x) => clamp(((x - G.x0) / (G.x1 - G.x0)) * SIK, 0, SIK - 1e-4);
      const Py = (p) => G.P[1] - (p / 130) * (G.P[1] - G.P[0]);
      const Zy = (p) => G.Z[1] - (p / 12) * (G.Z[1] - G.Z[0]);
      const Vy = (v) => G.V[1] - ((v - 40) / 90) * (G.V[1] - G.V[0]);
      const Ey = (e) => G.E[1] - 6 - e * (G.E[1] - G.E[0] - 10);
      const egri = (f, Y, t0 = 0, t1 = SIK, n = 260) => { let d = ''; for (let j = 0; j <= n; j++) { const t = t0 + ((t1 - t0) * j) / n; d += (j ? 'L' : 'M') + f1(X(t)) + ' ' + f1(Y(f(t))); } return d; };
      const tid = yeniId('tarama'), cid = yeniId('kirp'), oid = yeniId('ok');
      const bTop = G.bant + 6, bBot = G.ax;
      // evre bantları
      let bant = '', bLbl = '';
      EV.forEach((e, i) => {
        const x0 = X(e.t0), w = X(e.t1) - x0;
        bant += `<rect class="f28-w-bant ${e.sis ? 's' : 'd'}" data-i="${i}" x="${f1(x0)}" y="${bTop}" width="${f1(w)}" height="${bBot - bTop}"/>`;
        if (i === 2 || i === 4) bant += `<rect class="f28-w-tar" x="${f1(x0)}" y="${bTop}" width="${f1(w)}" height="${bBot - bTop}" fill="url(#${tid})"/>`;
        bLbl += `<text class="f28-w-bl" data-i="${i}" x="${f1(x0 + w / 2)}" y="${G.bant}" text-anchor="middle">${dar ? i + 1 : e.kk}</text>`;
      });
      const kemer = (t0, t1, ad) => `<line class="f28-w-km" x1="${f1(X(t0) + 3)}" x2="${f1(X(t1) - 3)}" y1="${G.kemer + 5}" y2="${G.kemer + 5}"/><text class="f28-w-kt" x="${f1((X(t0) + X(t1)) / 2)}" y="${G.kemer}" text-anchor="middle">${ad}</text>`;
      // ızgara + eksen etiketleri
      let iz = '';
      [0, 40, 80, 120].forEach((p) => { iz += `<line class="f28-izg" x1="${G.x0}" x2="${G.x1}" y1="${f1(Py(p))}" y2="${f1(Py(p))}"/><text class="f28-tk" x="${G.x0 - 6}" y="${f1(Py(p) + 4)}" text-anchor="end">${p}</text>`; });
      [0, 6, 12].forEach((p) => { iz += `<line class="f28-izg" x1="${G.x0}" x2="${G.x1}" y1="${f1(Zy(p))}" y2="${f1(Zy(p))}"/><text class="f28-tk" x="${G.x0 - 6}" y="${f1(Zy(p) + 4)}" text-anchor="end">${p}</text>`; });
      [50, 120].forEach((v) => { iz += `<text class="f28-tk" x="${G.x0 - 6}" y="${f1(Vy(v) + 4)}" text-anchor="end">${v}</text>`; });
      [0, 0.2, 0.4, 0.6, 0.8].forEach((t) => { iz += `<line class="f28-eks" x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${G.ax}" y2="${G.ax + 5}"/><text class="f28-tk" x="${f1(X(t))}" y="${G.tk}" text-anchor="middle">${vir(t, 1)}</text>`; });
      iz += `<line class="f28-eks" x1="${G.x0}" x2="${G.x1}" y1="${G.ax}" y2="${G.ax}"/>`;
      // şerit başlıkları
      const sb = (x, y, s, cls = '') => `<text class="f28-w-sb ${cls}" x="${x}" y="${y}">${s}</text>`;
      let bas = sb(G.x0 + 5, G.P[0] + 14, dar ? 'Basınç (mmHg)' : 'Basınç (mmHg)')
        + sb(G.x0 + 5, G.Z[0] + 15, dar ? 'büyütme 0–12' : '0–12 mmHg büyütme')
                + sb(G.x0 + 5, G.E[0] + 12, 'EKG')
        + sb(G.x0 + 5, G.S[0] + 18, dar ? 'ses' : 'Kalp sesleri');
      if (!dar) bas += `<text class="f28-tk" x="${G.x1}" y="${G.tk + 16}" text-anchor="end">Zaman (s)</text>`;
      else bas += `<text class="f28-tk" x="${G.x1}" y="${G.tk + 17}" text-anchor="end">Zaman (s)</text>`;
      // işaretler
      const nok = (t, y, cls = '') => `<circle class="f28-w-isr ${cls}" cx="${f1(X(t))}" cy="${f1(y)}" r="${dar ? 4.5 : 4}"/>`;
      const lb = (x, y, s, an = 'start', cls = '') => `<text class="f28-w-il ${cls}" x="${f1(x)}" y="${f1(y)}" text-anchor="${an}">${s}</text>`;
      const tg = 0.325, eg = (LV(tg + 0.001) - LV(tg - 0.001)) / 0.002;
      const tgy = (t) => Py(LV(tg) + eg * (t - tg));
      let isr = '';
      isr += `<line class="f28-w-teg" x1="${f1(X(0.316))}" y1="${f1(tgy(0.316))}" x2="${f1(X(0.336))}" y2="${f1(tgy(0.336))}"/>`
        + lb(X(0.30) - 8, Py(dar ? 44 : 42), 'eğim ≈ kontraktilite', 'end', 'm');
      isr += nok(0.35, Py(80)) + lb(X(0.30) - 6, Py(80) + (dar ? 20 : 18), dar ? 'Ao açılır' : 'aort kapağı açılır', 'end');
      isr += nok(0.60, Py(100)) + lb(X(0.62) + 4, Py(70), dar ? 'Ao kapanır' : 'aort kapağı kapanır', 'start');
      isr += `<line class="f28-w-lid" x1="${f1(X(0.61))}" y1="${f1(Py(96) - 4)}" x2="${f1(X(0.617))}" y2="${f1(Py(dar ? 113 : 112))}"/>` + lb(X(0.617) - 2, Py(dar ? 116 : 115), dar ? 'çentik' : 'dikrotik çentik', 'start', 'm');
      isr += nok(T_MK, Py(LV(T_MK)), 'k') + nok(T_MA, Py(LV(T_MA)), 'k');
      isr += nok(T_MK, Zy(LV(T_MK))) + lb(X(0.345) + 9, G.Z[0] + (dar ? 16 : 17), dar ? 'M kapanır' : 'mitral kapanır', 'start');
      isr += nok(T_MA, Zy(LV(T_MA))) + (dar ? lb(G.x1, G.Z[0] + 16, 'M açılır', 'end') : lb(X(0.70) + 2, G.Z[0] + 17, 'mitral açılır', 'start'));
      // a c x v y
      [['a', 0.25, 7, -1], ['c', 0.33, 5.5, -1], ['x', 0.42, 0, 1], ['v', 0.665, 7, -1], ['y', 0.74, 2, 1]].forEach(([h, t, p, s]) => {
        const xx = X(t) + (h === 'x' ? 10 : h === 'v' && dar ? -10 : 0);
        isr += lb(xx, Zy(p) + (s < 0 ? -7 : 15) - (h === 'x' ? 4 : 0), h, 'middle', 'h');
      });
      // hacim etiketleri
      isr += `<line class="f28-w-kes" x1="${G.x0}" x2="${f1(X(0.35))}" y1="${f1(Vy(120))}" y2="${f1(Vy(120))}"/>` + lb(G.x0 + 5, Vy(120) - 5, dar ? 'LVEDV 120' : 'LVEDV 120 mL', 'start', 'v');
      isr += `<line class="f28-w-kes" x1="${G.x0}" x2="${f1(X(0.67))}" y1="${f1(Vy(50))}" y2="${f1(Vy(50))}"/>` + lb(G.x0 + 5, Vy(50) - 5, dar ? 'LVESV 50' : 'LVESV 50 mL', 'start', 'v');
      const bx = X(0.62);
      isr += `<path class="f28-w-par" d="M${f1(bx - 5)} ${f1(Vy(120))} H${f1(bx)} V${f1(Vy(50))} H${f1(bx - 5)}"/>` + lb(bx - 7, (Vy(120) + Vy(50)) / 2 + 2, dar ? 'SV 70' : 'SV 70 mL', 'end', 'v');
      // EKG harfleri
      isr += lb(X(0.2), Ey(0.13) - 6, 'P', 'middle', 'e') + lb(X(0.305) + 6, G.E[0] + 10, 'QRS', 'start', 'e') + lb(X(0.53), Ey(0.26) - 6, 'T', 'middle', 'e');
      // sesler
      const bar = (t, h) => `<line class="f28-w-ses" x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${G.S[1] - h}" y2="${G.S[1]}"/>`;
      const sh = G.S[1] - G.S[0];
      isr += bar(0.3, sh) + bar(0.315, sh * 0.7) + bar(0.6, sh * 0.85) + bar(0.615, sh * 0.6);
      isr += lb(X(0.3) - 6, G.S[1] - 6, 'S1', 'end', 'sn') + lb(X(0.315) + 6, G.S[1] - 6, 'M1 T1', 'start', 'm');
      isr += lb(X(0.6) - 6, G.S[1] - 6, 'S2', 'end', 'sn') + lb(X(0.615) + 6, G.S[1] - 6, 'A2 P2', 'start', 'm');
      // eğriler
      const crv = `<path class="f28-c-ao" d="${egri(AO, Py)}"/><path class="f28-c-atr" d="${egri(ATR, Py)}"/><path class="f28-c-lv" d="${egri(LV, Py)}"/>
        <g clip-path="url(#${cid})"><path class="f28-c-atr" d="${egri(ATR, Zy)}"/><path class="f28-c-lv" d="${egri(LV, Zy)}"/></g>
        <path class="f28-c-vol" d="${egri(VOL, Vy)}"/><path class="f28-c-ekg" d="${egri(EKG, Ey, 0, SIK, 400)}"/>
        ${dar ? '' : `<text class="f28-w-ad ao" x="${G.x1 + 5}" y="${f1(Py(AO(0.8)) + 4)}">Aort</text>`}
        <text class="f28-w-ad lv" x="${f1(X(0.345) - 6)}" y="${f1(Py(dar ? 104 : 100))}" text-anchor="end">${dar ? 'LV' : 'Sol ventrikül'}</text>
        ${dar ? `<text class="f28-w-ad ao" x="${f1(X(0.1))}" y="${f1(Py(88) - 7)}" text-anchor="middle">Aort</text>` : ''}`;
      // kalp + sağ sütun
      const kalpTr = dar ? 'translate(10 6) scale(0.64)' : 'translate(728 44)';
      const sx = dar ? 128 : 726;
      const yaz = dar
        ? `<text class="f28-w-ead" x="${sx}" y="26"></text><text class="f28-w-efaz" x="${sx}" y="48"></text>
           <text class="f28-w-kd" x="${sx}" y="80" data-o="mv"></text><text class="f28-w-kd" x="${sx}" y="102" data-o="av"></text>
           <text class="f28-w-kd m" x="${sx}" y="132">Dokunun ya da sürükleyin:</text><text class="f28-w-kd m" x="${sx}" y="152">imleç o zamana gider.</text>
           <text class="f28-w-oku" x="${G.x0 - 30}" y="196" data-o="oku"></text>`
        : `<text class="f28-w-ead" x="${sx}" y="330"></text><text class="f28-w-efaz" x="${sx}" y="351"></text>
           <text class="f28-w-kd" x="${sx}" y="378" data-o="mv"></text><text class="f28-w-kd" x="${sx}" y="398" data-o="av"></text>
           <line class="f28-izg" x1="${sx}" x2="${sx + 180}" y1="414" y2="414"/>
           <text class="f28-w-okt" x="${sx}" y="436" data-o="t"></text>
           <text class="f28-w-okt lv" x="${sx}" y="458" data-o="lv"></text><text class="f28-w-okt ao" x="${sx}" y="478" data-o="ao"></text>
           <text class="f28-w-okt atr" x="${sx}" y="498" data-o="atr"></text><text class="f28-w-okt vol" x="${sx}" y="518" data-o="vol"></text>`;
      const anahtar = dar ? `<text class="f28-w-an" x="${G.x0 - 30}" y="${G.tk + 40}">1 yavaş doluş · 2 atriyal kasılma · 3 İVK</text><text class="f28-w-an" x="${G.x0 - 30}" y="${G.tk + 60}">4 ejeksiyon · 5 İVG · 6 hızlı doluş</text>` : '';
      el.innerHTML = `<svg class="f28-svg f28-w${dar ? ' dar' : ''}" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="Wiggers diyagramı: aort, sol ventrikül ve atriyal basınç, sol ventrikül hacmi, EKG ve kalp sesleri aynı zaman ekseninde; sağda kapakları gösteren sol kalp şeması">
        <defs><pattern id="${tid}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line class="f28-tr" x1="0" y1="0" x2="0" y2="7"/></pattern>
          <clipPath id="${cid}"><rect x="${G.x0}" y="${G.Z[0]}" width="${G.x1 - G.x0}" height="${G.Z[1] - G.Z[0]}"/></clipPath>
          <marker id="${oid}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path class="f28-okuc" d="M0 0L10 5L0 10z"/></marker></defs>
        ${bant}${bLbl}${kemer(0, 0.3, 'DİYASTOL')}${kemer(0.3, 0.6, 'SİSTOL')}${kemer(0.6, 0.8, dar ? 'DİY.' : 'DİYASTOL')}
        ${iz}${bas}${crv}${isr}${anahtar}
        <line class="f28-w-iml" y1="${bTop}" y2="${bBot}"/>
        <circle class="f28-w-d ao" r="4.5"/><circle class="f28-w-d lv" r="4.5"/><circle class="f28-w-d atr" r="4.5"/><circle class="f28-w-d lvz" r="4.5"/><circle class="f28-w-d vol" r="4.5"/>
        <rect class="f28-w-hit" x="${G.x0}" y="${bTop}" width="${G.x1 - G.x0}" height="${bBot - bTop}"/>
        <g class="f28-kl" transform="${kalpTr}">${kalpSvg(oid, dar)}</g>
        ${yaz}
      </svg>
      <div class="f28-ctl">
        <button type="button" class="btn ghost" data-a="geri">◀ Geri</button>
        ${RM ? '' : '<button type="button" class="btn ghost play" data-a="oyn" aria-pressed="false">▶ Oynat</button>'}
        <button type="button" class="btn ghost" data-a="ileri">İleri ▶</button>
        <div class="f28-nok" role="group" aria-label="Evre seç">${EV.map((e, i) => `<button type="button" data-i="${i}" aria-label="${i + 1} · ${e.ad}" aria-pressed="false">${i + 1}</button>`).join('')}</div>
      </div>
      <div class="f28-lej" aria-hidden="true"><span style="--k:var(--c-clin)"><i></i>Aort</span><span style="--k:var(--accent)"><i></i>Sol ventrikül</span><span style="--k:var(--c-basic)"><i></i>Atriyum</span><span style="--k:var(--ok)"><i></i>LV hacmi</span></div>`;
      const svg = el.querySelector('svg'), kl = svg.querySelector('.f28-kl'), iml = svg.querySelector('.f28-w-iml');
      const q = (s) => svg.querySelector(s);
      const d = { ao: q('.f28-w-d.ao'), lv: q('.f28-w-d.lv'), atr: q('.f28-w-d.atr'), lvz: q('.f28-w-d.lvz'), vol: q('.f28-w-d.vol') };
      const oynB = el.querySelector('[data-a="oyn"]');
      const pos = (c, x, y) => { c.setAttribute('cx', f1(x)); c.setAttribute('cy', f1(y)); };
      const tx = (s, v) => { const n = q(`[data-o="${s}"]`); if (n) n.textContent = v; };
      let sonI = -1;
      const render = () => {
        const t = st.t, x = X(t), lv = LV(t), ao = AO(t), at = ATR(t), vo = VOL(t);
        iml.setAttribute('x1', f1(x)); iml.setAttribute('x2', f1(x));
        pos(d.ao, x, Py(ao)); pos(d.lv, x, Py(lv)); pos(d.atr, x, Zy(at)); pos(d.vol, x, Vy(vo));
        pos(d.lvz, x, Zy(Math.min(lv, 12))); d.lvz.style.opacity = lv <= 12 ? 1 : 0;
        kalpAyar(kl, t);
        const R = Math.round;
        if (dar) tx('oku', `t ${vir(t, 2)} s · LV ${R(lv)} · Ao ${R(ao)} · Atr ${R(at)} mmHg · ${R(vo)} mL`);
        else { tx('t', `t = ${vir(t, 2)} s`); tx('lv', `LV ${R(lv)} mmHg`); tx('ao', `Aort ${R(ao)} mmHg`); tx('atr', `Atriyum ${R(at)} mmHg`); tx('vol', `Hacim ${R(vo)} mL`); }
        tx('mv', `${dar ? 'Mitral' : 'Mitral (triküspit)'}: ${avAcik(t) ? 'açık' : 'kapalı'}`);
        tx('av', `${dar ? 'Aort kapağı' : 'Aort (pulmoner)'}: ${slAcik(t) ? 'açık' : 'kapalı'}`);
        const i = st.cur;
        if (i !== sonI) {
          sonI = i;
          svg.querySelectorAll('.f28-w-bant,.f28-w-bl').forEach((b) => b.classList.toggle('on', +b.dataset.i === i));
          el.querySelectorAll('.f28-nok button').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === i)));
          q('.f28-w-ead').textContent = dar ? `${i + 1} · ${EV[i].ad}` : EV[i].ad;
          q('.f28-w-efaz').textContent = `${i + 1}. evre · ${EV[i].sis ? 'sistol' : 'diyastol'}`;
          q('.f28-w-efaz').classList.toggle('s', EV[i].sis);
        }
      };
      const oynAyar = () => { if (oynB) { const on = st.mod === 'oyn'; oynB.textContent = on ? '❚❚ Duraklat' : '▶ Oynat'; oynB.setAttribute('aria-pressed', String(on)); } if (cap) cap.setAttribute('aria-live', st.mod === 'oyn' ? 'off' : 'polite'); };
      const git = (i) => {
        st.cur = (i + 6) % 6;
        const e = EV[st.cur];
        if (RM) { st.t = orta(st.cur); st.mod = 'dur'; } else { st.mod = 'kay'; st.k0 = e.t0; st.k1 = e.t1 - 0.002; st.kz = 0; st.t = e.t0; }
        oynAyar(); setCap(cap, ADIM[st.cur]); render();
      };
      el.querySelector('[data-a="ileri"]').addEventListener('click', () => git(st.cur + 1));
      el.querySelector('[data-a="geri"]').addEventListener('click', () => git(st.cur - 1));
      el.querySelector('.f28-nok').addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) git(+b.dataset.i); });
      if (oynB) oynB.addEventListener('click', () => { st.mod = st.mod === 'oyn' ? 'dur' : 'oyn'; oynAyar(); });
      let surukle = false;
      const zamanaGit = (e) => { const p = svgX(svg, e); st.t = Xi(p.x); const i = evreOf(st.t); if (i !== st.cur) { st.cur = i; setCap(cap, ADIM[i]); } render(); };
      const hit = q('.f28-w-hit');
      hit.addEventListener('pointerdown', (e) => { surukle = true; st.mod = 'dur'; oynAyar(); try { hit.setPointerCapture(e.pointerId); } catch (_) { /* yok */ } st.cur = -1; zamanaGit(e); });
      hit.addEventListener('pointermove', (e) => { if (surukle) zamanaGit(e); });
      const birak = () => { surukle = false; };
      hit.addEventListener('pointerup', birak); hit.addEventListener('pointercancel', birak);
      if (RM && st.mod !== 'dur') st.mod = 'dur';
      oynAyar(); render();
      return RM ? () => {} : ticker(svg, (dt) => {
        if (st.mod === 'oyn') { st.t = (st.t + dt / 10) % SIK; const i = evreOf(st.t); if (i !== st.cur) { st.cur = i; setCap(cap, ADIM[i]); } render(); }
        else if (st.mod === 'kay') { st.kz += dt / 1.2; st.t = lerp(st.k0, st.k1, Math.min(1, st.kz)); if (st.kz >= 1) { st.mod = 'dur'; oynAyar(); } render(); }
      });
    });
  };

  /* =====================================================================
     3 · a, c, x, v, y ve S1, S2, S3
     ===================================================================== */
  const DL = {
    a: { cap: '<b>a dalgası.</b> Atriyal kasılmanın basıncı, kapakları olmadığı için venae cavae ve pulmoner venlere geri iletilir. Başka bir dalgaya ya da sese dokunun. [[K1 s. 117]]', bant: [1], seg: [0.18, 0.29], k: 'Triküspit (mitral) · açık', ust: 'atriyum', alt: 'ventrikül', th0: 70, th: 70, ok: [60, 40, 60, 8], h: 'Atriyum kasılır; basınç kapaksız venlere geri iletilir (yukarı ok).' },
    c: { cap: '<b>c dalgası · izovolümetrik kasılma.</b> Artan sağ ventrikül basıncı triküspit kapağı sağ atriyuma doğru bombeleştirir; solda mitral kapak sol atriyuma bombeleşir. [[K1 s. 118]]', bant: [2], seg: [0.29, 0.36], k: 'Triküspit (mitral) · kapalı', ust: 'atriyum', alt: 'ventrikül', th0: 0, th: -28, ok: [60, 62, 60, 34], h: 'Kapalı kapak, artan ventrikül basıncıyla atriyuma doğru bombeleşir.' },
    x: { cap: '<b>x inişi · ejeksiyon.</b> Sağ ventrikül kasılması triküspit kapağı aşağı çeker; sağ atriyum uzar, basıncı sıfıra düşer ve atriyum hızla kanla dolar. [[K1 s. 118]]', bant: [3], seg: [0.35, 0.47], k: 'Triküspit · kapalı', ust: 'atriyum', alt: 'ventrikül', th0: 0, th: 0, dy: 12, ok: [60, 50, 60, 76], h: 'Kasılan ventrikül kapalı kapağı aşağı çeker; atriyum uzar, basıncı düşer.' },
    v: { cap: '<b>v dalgası · geç sistol ve izovolümetrik gevşeme.</b> Akciğerlerden ve venae cavae\'den gelen venöz dönüş, AV kapaklar kapalıyken atriyal basıncı yavaşça yükseltir. [[K1 s. 119]]', bant: [3, 4], seg: [0.47, 0.665], k: 'Triküspit (mitral) · kapalı', ust: 'atriyum', alt: 'ventrikül', th0: 0, th: 0, ok: [60, 4, 60, 36], h: 'Venöz dönüş, kapalı kapağın üstünde atriyumu doldurur (aşağı ok).' },
    y: { cap: '<b>y inişi · hızlı doluş.</b> Atriyal basınç ventrikülünkini aşınca AV kapaklar açılır ve kan ventriküle akar; atriyal basınç düşer. [[K1 s. 119]]', bant: [5], seg: [0.665, 0.8], k: 'Triküspit (mitral) · açılır', ust: 'atriyum', alt: 'ventrikül', th0: 0, th: 70, ok: [60, 22, 60, 76], h: 'Kapak açılır; kan ventriküle akar, atriyal basınç düşer.' },
    S1: { cap: '<b>S1 · AV kapakların kapanması.</b> Ventrikül basıncı atriyumunkini aşınca kapanırlar; mitral kapak triküspitten biraz önce kapandığı için S1 çiftlenir. [[K1 s. 117]]', bant: [2], k: 'Mitral, sonra triküspit · kapanır', ust: 'atriyum', alt: 'ventrikül', th0: 70, th: 0, h: 'AV kapaklar kapanır: önce M1, hemen ardından T1.' },
    S2: { cap: '<b>S2 · semilüner kapakların kapanması.</b> Ventrikül basıncı aort ve pulmoner arterinkinin altına inince kapanırlar; aort kapağı pulmonerden biraz önce kapanır. İnspirasyonu açın. [[K1 s. 118]]', bant: [4], k: 'Aort, sonra pulmoner · kapanır', ust: 'arter', alt: 'ventrikül', sl: true, th0: -70, th: 0, h: 'Semilüner kapaklar kapanır: önce A2, ardından P2.' },
    S2i: { cap: '<b>Fizyolojik S2 çiftlenmesi.</b> İnspirasyon, aort ve pulmoner kapağın kapanması arasındaki farkı, özellikle gençlerde, belirginleştirir: A2 ile P2 ayrılır. [[K1 s. 118]]', bant: [4], k: 'Aort, sonra pulmoner · kapanır', ust: 'arter', alt: 'ventrikül', sl: true, th0: -70, th: 0, h: 'İnspirasyonda pulmoner kapak daha geç kapanır: A2–P2 aralığı genişler.' },
    cen: { cap: '<b>Dikrotik çentik · aort kapağının kapanması.</b> Kitaba göre kapağın ve aortun elastik geri tepmesinin yaptığı pozitif bir sapmadır; sayfadaki Atlas notu ayrıntıyı verir. [[K1 s. 118]]', bant: [4], aseg: [0.59, 0.65], k: 'Aort kapağı · kapanır', ust: 'aort', alt: 'sol ventrikül', sl: true, th0: -70, th: 0, h: 'Kapak kapanır; kapağın ve aortun elastik geri tepmesi küçük bir dalga yapar.' },
    S3y: { cap: '<b>Doluş normalde sessizdir.</b> S3 koşulunu açın. [[K1 s. 119]]', bant: [5], k: 'Mitral · açık', ust: 'atriyum', alt: 'ventrikül', th0: 70, th: 70, ok: [60, 22, 60, 76], h: 'Hızlı doluş normalde ses çıkarmaz.' },
    S3: { cap: '<b>S3 · hızlı doluş.</b> Artmış atriyal kan hacmi (ör. mitral yetersizlik) kompliyansı düşük bir LV\'ye (ör. miyokard enfarktüsünden sonra ya da dilate kardiyomiyopatide) akınca ventrikül duvarı titreşir. [[K1 s. 119]]', bant: [5], k: 'Mitral · açık', ust: 'atriyum', alt: 'sol ventrikül', th0: 70, th: 70, ok: [60, 22, 60, 76], tit: true, h: 'Kan kompliyansı düşük LV\'ye hızla akar; ventrikül duvarı titreşir.' },
  };
  VIZ.f28_dalga = (el) => {
    const cap = capOf(el);
    const st = { sec: 'a', ins: false, s3: false, ilk: true };
    let raf = 0;
    const temizRaf = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };
    const kur = (m) => {
      const dar = m === 'dar';
      const G = dar
        ? { W: 400, H: 490, x0: 16, x1: 388, A: [44, 212], Ao: [270, 318], E: [338, 380], pil: 402, bar: [422, 452], alt: 474, r: 17, fs: 14 }
        : { W: 560, H: 420, x0: 16, x1: 548, A: [40, 172], Ao: [224, 264], E: [282, 322], pil: 344, bar: [362, 392], alt: 410, r: 14, fs: 13 };
      const X = (t) => G.x0 + (t / SIK) * (G.x1 - G.x0);
      const Ay = (p) => G.A[1] - (p / 8) * (G.A[1] - G.A[0]);
      const Aoy = (p) => G.Ao[1] - ((p - 78) / 44) * (G.Ao[1] - G.Ao[0]);
      const Ey = (e) => G.E[1] - 6 - e * (G.E[1] - G.E[0] - 10);
      const egri = (f, Y, t0 = 0, t1 = SIK, n = 240) => { let d = ''; for (let j = 0; j <= n; j++) { const t = t0 + ((t1 - t0) * j) / n; d += (j ? 'L' : 'M') + f1(X(t)) + ' ' + f1(Y(f(t))); } return d; };
      const oid = yeniId('dok');
      let bant = '';
      EV.forEach((e, i) => { bant += `<rect class="f28-d-bant ${e.sis ? 's' : 'd'}" data-i="${i}" x="${f1(X(e.t0))}" y="4" width="${f1(X(e.t1) - X(e.t0))}" height="${G.H - 8}"/>`; });
      const R = G.r, off = R + 10;
      const roz = (k, x, y, s, w) => (w
        ? `<g class="f28-d-r" data-k="${k}" role="button" tabindex="0" aria-pressed="false" aria-label="${s}"><rect x="${f1(x - w / 2)}" y="${f1(y - R + 2)}" width="${w}" height="${2 * R - 4}" rx="${R - 2}"/><text x="${f1(x)}" y="${f1(y + 5)}" text-anchor="middle">${s}</text></g>`
        : `<g class="f28-d-r" data-k="${k}" role="button" tabindex="0" aria-pressed="false" aria-label="${s} dalgası"><circle cx="${f1(x)}" cy="${f1(y)}" r="${R}"/><text x="${f1(x)}" y="${f1(y + 5)}" text-anchor="middle">${s}</text></g>`);
      let rz = '';
      [['a', 0.25, 7, -1], ['c', 0.33, 5.5, -1], ['x', 0.42, 0, 1], ['v', 0.665, 7, -1], ['y', 0.74, 2, 1]].forEach(([k, t, p, s]) => {
        rz += `<circle class="f28-d-nk" cx="${f1(X(t))}" cy="${f1(Ay(p))}" r="3.5"/>` + roz(k, X(t), Ay(p) + s * off, k);
      });
      const cx = X(0.61), cy = Aoy(AO(0.61)), px = X(dar ? 0.71 : 0.70), py = G.Ao[1] - 1;
      rz += `<line class="f28-d-lid" x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(px - 22)}" y2="${f1(py - 4)}"/><circle class="f28-d-nk" cx="${f1(cx)}" cy="${f1(cy)}" r="3.5"/>` + roz('cen', px, py, 'çentik', dar ? 64 : 58);
      const sh = G.bar[1] - G.bar[0];
      const bar = (t, h, cls = '') => `<line class="f28-d-ses ${cls}" x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${f1(G.bar[1] - h)}" y2="${G.bar[1]}"/>`;
      const dP2 = X(0.64) - X(0.615);
      const ses = `<g class="f28-d-sg" data-g="S1">${bar(0.3, sh)}${bar(0.315, sh * 0.7)}</g>
        <g class="f28-d-sg" data-g="S2">${bar(0.6, sh * 0.85)}<g class="f28-d-p2">${bar(0.615, sh * 0.6)}</g></g>
        <g class="f28-d-sg f28-d-s3" data-g="S3">${bar(0.72, sh * 0.5)}</g>
        <text class="f28-d-al" x="${f1(X(0.3075))}" y="${G.alt}" text-anchor="middle">M1 T1</text>
        <text class="f28-d-al" x="${f1(X(0.61))}" y="${G.alt}" text-anchor="middle" data-o="a2p2">A2 P2</text>
        <g class="f28-d-ayr"><path class="f28-d-par" d="M${f1(X(0.6))} ${G.bar[0] - 4} V${G.bar[0] - 9} H${f1(X(0.64))} V${G.bar[0] - 4}"/></g>
        ${roz('S1', X(0.3075), G.pil, 'S1', dar ? 44 : 40)}${roz('S2', X(0.595), G.pil, 'S2', dar ? 44 : 40)}
        <g class="f28-d-r f28-d-r3" data-k="S3" role="button" tabindex="0" aria-pressed="false" aria-label="S3"><rect x="${f1(X(0.75) - (dar ? 34 : 32))}" y="${G.pil - R + 2}" width="${dar ? 68 : 64}" height="${2 * R - 4}" rx="${R - 2}"/><text x="${f1(X(0.75))}" y="${G.pil + 5}" text-anchor="middle">S3 yok</text></g>`;
      const ekg = `<path class="f28-c-ekg" d="${egri(EKG, Ey, 0, SIK, 400)}"/><text class="f28-d-el" x="${f1(X(0.2))}" y="${f1(Ey(0.13) - 6)}" text-anchor="middle">P</text><text class="f28-d-el" x="${f1(X(0.305) + 6)}" y="${G.E[0] + 10}">QRS</text><text class="f28-d-el" x="${f1(X(0.53))}" y="${f1(Ey(0.26) - 6)}" text-anchor="middle">T</text>`;
      const kartIkon = `<svg class="f28-dl-ikon" viewBox="0 0 120 96" aria-hidden="true"><defs><marker id="${oid}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path class="f28-okuc" d="M0 0L10 5L0 10z"/></marker></defs>
          <rect class="f28-dl-ust" x="0" y="0" width="120" height="50" rx="8"/><rect class="f28-dl-alt" x="0" y="50" width="120" height="46" rx="8"/>
          <text class="f28-dl-it" x="6" y="14" data-o="ust"></text><text class="f28-dl-it" x="114" y="91" text-anchor="end" data-o="alt"></text>
          <g class="f28-dl-kp"><line class="f28-dl-y" x1="24" y1="50"/><line class="f28-dl-y" x1="96" y1="50"/><circle class="f28-dl-p" cx="24" cy="50" r="4"/><circle class="f28-dl-p" cx="96" cy="50" r="4"/></g>
          <line class="f28-dl-ok" x1="60" y1="40" x2="60" y2="10" marker-end="url(#${oid})"/></svg>`;
      el.innerHTML = `<div class="f28-anah" role="group" aria-label="Anahtarlar"><button type="button" class="f28-tg" data-a="ins" aria-pressed="${st.ins}">İnspirasyon</button><button type="button" class="f28-tg" data-a="s3" aria-pressed="${st.s3}">S3 koşulu (artmış atriyal hacim + kompliyansı düşük LV)</button></div>
        <div class="f28-dl ${m}">
          <svg class="f28-svg f28-d${dar ? ' dar' : ''}" viewBox="0 0 ${G.W} ${G.H}" role="group" aria-label="Atriyal basınç eğrisi, aort eğrisi, EKG ve kalp sesleri; dalgalara ve seslere dokunun">
            ${bant}
            <text class="f28-d-sb" x="${G.x0 + 2}" y="${dar ? 20 : 16}">atriyal basınç (göreli)</text>
            <text class="f28-d-sb" x="${G.x0 + 2}" y="${G.Ao[0] + 4}">aort</text>
            <text class="f28-d-sb" x="${G.x0 + 2}" y="${G.E[0] + 10}">EKG</text>
            <text class="f28-d-sb" x="${G.x0 + 2}" y="${G.bar[0] + 14}">sesler</text>
            <path class="f28-c-atr k" d="${egri(ATR, Ay)}"/><path class="f28-d-vrg" d=""/>
            <path class="f28-c-ao" d="${egri(AO, Aoy)}"/><path class="f28-d-vrg ao" d=""/>
            ${ekg}${ses}${rz}
          </svg>
          <div class="f28-dl-kart"><div class="f28-dl-kk">İlgili kapak</div><b class="f28-dl-ad"></b>${kartIkon}<p class="f28-dl-h"></p></div>
        </div>`;
      const svg = el.querySelector('svg.f28-d'), kart = el.querySelector('.f28-dl-kart');
      const q = (s) => el.querySelector(s);
      const p2 = svg.querySelector('.f28-d-p2');
      const vrg = svg.querySelector('.f28-d-vrg:not(.ao)'), vrgAo = svg.querySelector('.f28-d-vrg.ao');
      let thSimdi = 0;
      const yaprakAyar = (th, dy, sl) => {
        const [l1, l2] = kart.querySelectorAll('.f28-dl-y');
        const n = sl ? -1 : 1, y = 50 + (dy || 0);
        // sl: açık yapraklar yukarı (arter), AV: açık yapraklar aşağı (ventrikül); th < 0 karşı yöne bombeleşme
        const a = yaprak(24, y, 1, n, 34, th), b = yaprak(96, y, -1, n, 34, th);
        l1.setAttribute('y1', y); l2.setAttribute('y1', y);
        l1.setAttribute('x2', f1(a[0])); l1.setAttribute('y2', f1(a[1])); l2.setAttribute('x2', f1(b[0])); l2.setAttribute('y2', f1(b[1]));
        kart.querySelectorAll('.f28-dl-p').forEach((c) => c.setAttribute('cy', y));
      };
      const anahtar = () => {
        el.querySelector('[data-a="ins"]').setAttribute('aria-pressed', String(st.ins));
        el.querySelector('[data-a="s3"]').setAttribute('aria-pressed', String(st.s3));
        p2.style.transform = `translateX(${st.ins ? f1(dP2) : 0}px)`;
        svg.classList.toggle('ins', st.ins); svg.classList.toggle('s3', st.s3);
        const r3 = svg.querySelector('.f28-d-r3'), w3 = st.s3 ? (dar ? 44 : 40) : (dar ? 68 : 64);
        r3.querySelector('rect').setAttribute('x', f1(X(0.75) - w3 / 2)); r3.querySelector('rect').setAttribute('width', w3);
        r3.querySelector('text').textContent = st.s3 ? 'S3' : 'S3 yok';
        r3.setAttribute('aria-label', st.s3 ? 'S3' : 'S3 yok');
      };
      const goster = (anim) => {
        const k = st.sec === 'S2' && st.ins ? 'S2i' : st.sec === 'S3' && !st.s3 ? 'S3y' : st.sec;
        const D = DL[k];
        svg.querySelectorAll('.f28-d-r').forEach((g) => { const on = g.dataset.k === st.sec; g.classList.toggle('on', on); g.setAttribute('aria-pressed', String(on)); });
        svg.querySelectorAll('.f28-d-sg').forEach((g) => g.classList.toggle('on', g.dataset.g === st.sec));
        svg.querySelectorAll('.f28-d-bant').forEach((b) => b.classList.toggle('on', D.bant.includes(+b.dataset.i)));
        vrg.setAttribute('d', D.seg ? egri(ATR, Ay, D.seg[0], D.seg[1], 80) : '');
        vrgAo.setAttribute('d', D.aseg ? egri(AO, Aoy, D.aseg[0], D.aseg[1], 60) : '');
        q('.f28-dl-ad').textContent = D.k;
        q('.f28-dl-h').textContent = D.h;
        kart.querySelector('[data-o="ust"]').textContent = D.ust;
        kart.querySelector('[data-o="alt"]').textContent = D.alt;
        kart.classList.toggle('sl', !!D.sl); kart.classList.toggle('tit', !!D.tit && !RM);
        const ok = kart.querySelector('.f28-dl-ok');
        if (D.ok) { ok.setAttribute('x1', D.ok[0]); ok.setAttribute('y1', D.ok[1]); ok.setAttribute('x2', D.ok[2]); ok.setAttribute('y2', D.ok[3]); ok.style.display = ''; } else ok.style.display = 'none';
        ok.classList.remove('oyna'); void ok.getBoundingClientRect(); if (anim && !RM) ok.classList.add('oyna');
        if (!st.ilk) setCap(cap, D.cap);
        temizRaf();
        const th0 = anim && !RM ? D.th0 : D.th, th1 = D.th, dy1 = D.dy || 0;
        if (th0 === th1 && !dy1) { yaprakAyar(th1, 0, D.sl); thSimdi = th1; return; }
        if (!anim || RM) { yaprakAyar(th1, dy1, D.sl); return; }
        const t0 = performance.now();
        const adim = (now) => { const f = clamp((now - t0) / 600, 0, 1), e = f * f * (3 - 2 * f); yaprakAyar(lerp(th0, th1, e), dy1 * e, D.sl); if (f < 1) raf = requestAnimationFrame(adim); else raf = 0; };
        raf = requestAnimationFrame(adim);
      };
      const sec = (k) => { st.ilk = false; st.sec = k; goster(true); };
      svg.addEventListener('click', (e) => { const g = e.target.closest('.f28-d-r'); if (g) sec(g.dataset.k); });
      svg.addEventListener('keydown', (e) => { const g = e.target.closest('.f28-d-r'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sec(g.dataset.k); } });
      el.querySelector('[data-a="ins"]').addEventListener('click', () => { st.ins = !st.ins; anahtar(); sec('S2'); });
      el.querySelector('[data-a="s3"]').addEventListener('click', () => { st.s3 = !st.s3; anahtar(); sec('S3'); });
      if (RM) svg.classList.add('rm');
      anahtar(); goster(false);
      return temizRaf;
    };
    return duyarli(el, (w) => (w < 560 ? 'dar' : w < 780 ? 'orta' : 'gen'), kur);
  };

  /* =====================================================================
     4 · LVEDV / LVESV → SV, EF
     ===================================================================== */
  VIZ.f28_hacim = (el) => {
    const cap = capOf(el), ilkCap = cap ? cap.innerHTML : '';
    const st = { edv: 120, esv: 50 };
    const lid = yeniId('hc');
    // mermi biçimli LV: taban y 46, merkez x 150; 250 mL'de yarı genişlik 98, derinlik 236 (alan ∝ hacim)
    const LVd = (s) => { const w = 98 * s, h = 236 * s, b = 46; return `M${f1(150 - w)} ${b} C${f1(150 - w)} ${f1(b + h * 0.62)} ${f1(150 - w * 0.55)} ${f1(b + h)} 150 ${f1(b + h)} C${f1(150 + w * 0.55)} ${f1(b + h)} ${f1(150 + w)} ${f1(b + h * 0.62)} ${f1(150 + w)} ${b} Z`; };
    const sOf = (v) => Math.sqrt(v / 250);
    el.innerHTML = `<div class="f28-hc">
      <div class="f28-hc-fig">
        <svg class="f28-svg" viewBox="0 0 300 296" role="img" aria-label="Şematik sol ventrikül: dış çizgi diyastol sonu hacmi, iç alan sistol sonu hacmi, aradaki taralı halka atım hacmi">
          <defs><pattern id="${lid}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line class="f28-hc-tr" x1="0" y1="0" x2="0" y2="7"/></pattern></defs>
          <path class="f28-hc-dis" d=""/><path class="f28-hc-sv" d="" fill="url(#${lid})"/><path class="f28-hc-ic" d=""/>
          <path class="f28-hc-duv" d=""/>
          <g class="f28-hc-taban"><line class="f28-hc-tb" x1="40" x2="260" y1="46" y2="46"/>
            <text class="f28-hc-t" x="112" y="34" text-anchor="middle">mitral</text><text class="f28-hc-t" x="188" y="34" text-anchor="middle">aort</text>
            <path class="f28-hc-aok" d="M188 26 V6" /></g>
          <text class="f28-hc-n ic" x="150" y="0" text-anchor="middle"></text>
        </svg>
        <div class="f28-lej"><span style="--k:var(--crit-soft)"><i class="kare"></i>kalan kan = LVESV</span><span style="--k:var(--accent)"><i class="kare tar"></i>atılan kan = SV</span></div>
      </div>
      <div class="f28-hc-ctl">
        <label class="f28-rng"><span>LVEDV (diyastol sonu hacmi) <b data-o="edv"></b></span><input type="range" min="50" max="250" step="5" value="120" data-r="edv" aria-label="LVEDV, mL"></label>
        <label class="f28-rng"><span>LVESV (sistol sonu hacmi) <b data-o="esv"></b></span><input type="range" min="10" max="200" step="5" value="50" data-r="esv" aria-label="LVESV, mL"></label>
        <div class="f28-sonuc"><div><span>SV = LVEDV − LVESV</span><b data-o="sv"></b></div><div><span>EF = SV / LVEDV</span><b data-o="ef"></b></div></div>
        <div class="f28-olc" data-o="osv"><span class="f28-olc-ad">SV (mL) <em>normal 55–100 mL</em></span><span class="f28-olc-tr"><i class="bnd" style="left:27.5%;width:22.5%"></i><i class="isr"></i></span><span class="f28-olc-tk"><em style="left:0">0</em><em style="left:50%">100</em><em style="left:100%">200</em></span></div>
        <div class="f28-olc" data-o="oef"><span class="f28-olc-ad">EF <em>normal %55–70</em></span><span class="f28-olc-tr"><i class="bnd" style="left:55%;width:15%"></i><i class="isr"></i></span><span class="f28-olc-tk"><em style="left:0">%0</em><em style="left:50%">%50</em><em style="left:100%">%100</em></span></div>
        <div class="btn-row"><button type="button" class="btn ghost" data-a="tip">Tipik değerler (70 kg erkek)</button></div>
      </div></div>`;
    const q = (s) => el.querySelector(s);
    const rE = q('[data-r="edv"]'), rS = q('[data-r="esv"]');
    const dis = q('.f28-hc-dis'), svp = q('.f28-hc-sv'), ic = q('.f28-hc-ic'), duv = q('.f28-hc-duv'), nIc = q('.f28-hc-n.ic'), aok = q('.f28-hc-aok');
    const isr = (k, f, ok) => { const o = q(`[data-o="${k}"]`); o.querySelector('.isr').style.left = clamp(f, 0, 1) * 100 + '%'; o.classList.toggle('ok', ok); o.classList.toggle('dis', !ok); };
    let sv = 70, ef = 70 / 120;
    const ciz = () => {
      const sE = sOf(st.edv), sS = sOf(st.esv);
      dis.setAttribute('d', LVd(sE)); ic.setAttribute('d', LVd(sS));
      svp.setAttribute('d', LVd(sE) + ' ' + LVd(sS)); // evenodd halka
      const h = 236 * sS;
      nIc.setAttribute('y', f1(46 + h * 0.5 + 5)); nIc.textContent = sS > 0.3 ? `${st.esv} mL` : '';
      sv = st.edv - st.esv; ef = sv / st.edv;
      q('[data-o="edv"]').textContent = `${st.edv} mL`; q('[data-o="esv"]').textContent = `${st.esv} mL`;
      q('[data-o="sv"]').textContent = `= ${st.edv} − ${st.esv} = ${sv} mL`;
      q('[data-o="ef"]').textContent = `= ${sv} / ${st.edv} = %${Math.round(ef * 100)}`;
      const svN = sv >= 55 && sv <= 100, efP = Math.round(ef * 100), efN = efP >= 55 && efP <= 70;
      isr('osv', sv / 200, svN); isr('oef', ef, efN);
      if (!RM) { duv.setAttribute('d', LVd(sE)); }
      return { svN, efN, efP };
    };
    const yazCap = () => {
      const { svN, efN, efP } = ciz();
      if (svN && efN) setCap(cap, `<b>SV ${sv} mL, EF %${efP}.</b> İkisi de normal aralıkta (SV 55–100 mL, EF %55–70). [[K1 s. 119]]`);
      else if (!svN && !efN) setCap(cap, `<b>SV ${sv} mL ve EF %${efP}: ikisi de normal aralığın dışında.</b> [[K1 s. 119]]`);
      else if (!svN) setCap(cap, `<b>SV ${sv} mL: normal aralığın (55–100 mL) dışında.</b> Kitap bu aralığın kişinin vücut büyüklüğüne bağlı olduğunu vurgular. EF %${efP}. [[K1 s. 119]]`);
      else setCap(cap, `<b>EF %${efP}: normal aralığın (%55–70) dışında,</b> SV ${sv} mL olsa da. EF, atılan kanın LVEDV'ye oranıdır. [[K1 s. 119]]`);
    };
    rE.addEventListener('input', () => { let v = +rE.value; if (v < st.esv + 10) { v = Math.ceil((st.esv + 10) / 5) * 5; rE.value = v; } st.edv = v; yazCap(); });
    rS.addEventListener('input', () => { let v = +rS.value; if (v > st.edv - 10) { v = Math.floor((st.edv - 10) / 5) * 5; rS.value = v; } st.esv = v; yazCap(); });
    q('[data-a="tip"]').addEventListener('click', () => { st.edv = 120; st.esv = 50; rE.value = 120; rS.value = 50; ciz(); if (cap) cap.innerHTML = ilkCap; });
    ciz();
    if (RM) { duv.style.display = 'none'; aok.classList.add('rm'); return () => {}; }
    let ph = 0;
    return ticker(el, (dt) => {
      ph = (ph + dt / 1.2) % 1;
      const f = (1 - Math.cos(ph * 2 * Math.PI)) / 2; // 0 → 1 → 0
      duv.setAttribute('d', LVd(lerp(sOf(st.edv), sOf(st.esv), f)));
      aok.style.opacity = ph < 0.5 ? (0.25 + 0.75 * Math.sin(ph * 2 * Math.PI)).toFixed(2) : 0.2;
    });
  };

  /* =====================================================================
     5 · Kalp hızı ve yaş
     ===================================================================== */
  VIZ.f28_hiz = (el) => {
    const cap = capOf(el), ilkCap = cap ? cap.innerHTML : '';
    const st = { hr: 75, yas: 20, af: false, son: null, g: null };
    const model = (hr, yas, af) => { const T = 60 / hr, s = T <= 0.8 ? 0.06 + 0.3 * T : 0.3; return { T, s, d: T - s, pay: af ? 0 : yas >= 60 || hr > 100 ? 0.4 : 0.1 }; };
    const hrmax = (yas) => Math.round(208 - 0.7 * yas);
    const kapCap = () => {
      const { hr, yas, af } = st, m = model(hr, yas, af), mx = hrmax(yas);
      if (af) return setCap(cap, '<b>AF: atriyal kasılma yok.</b> Atriyal katkı kaybolur; ileri yaşta bu katkı LVEDV\'nin %40\'ına kadar çıktığından CO belirgin düşebilir ve önceden iyi tolere edilen kalp yetersizliği dekompanse olabilir. [[K1 s. 120]]');
      const T = vir(m.T, 2), s = vir(m.s, 2), d = vir(m.d, 2);
      let c;
      if (hr === 75) c = null;
      else if (hr >= 200) c = `<b>HR ${hr}/dk.</b> Siklus ${T} s: sistol ${s} s, diyastol ${d} s. Maksimal egzersizdeki genç bir sporcuda HR 200'e ulaşabilir; bu kadar kısa diyastol doluşu kısıtlar, SV ve CO düşer. [[K1 s. 119]]`;
      else if (hr > 150) c = `<b>HR ${hr}/dk.</b> Diyastol ${d} s'ye kısaldı (istirahatte 0,5 s); sistol daha az kısalır. Doluş süresi azaldıkça SV ve CO düşer. [[K1 s. 119]]`;
      else if (hr < 40) c = `<b>HR ${hr}/dk.</b> Diyastol ${d} s: uzun doluş SV'yi orta derecede (80–90 mL'ye) artırır, ama CO yine düşer. [[K1 s. 119]]`;
      else if (hr < 50) c = `<b>HR ${hr}/dk.</b> Siklus ${T} s: diyastol ${d} s. En uygun aralığın (50–150/dk) hemen altında. [[K1 s. 119]]`;
      else c = `<b>HR ${hr}/dk.</b> Siklus ${T} s: sistol ${s} s, diyastol ${d} s. Çoğu kişide 50–150/dk arası sinüs ritmi en uygun aralıktır. [[K1 s. 119]]`;
      if (c && hr > mx) c += ` <b>Bu hız ${yas} yaşındaki kişinin HRmax'ını (${mx}/dk) aşıyor.</b> [[K1 s. 120]]`;
      const yasS = st.son === 'yas' ? `<b>${yas} yaş: HRmax = 208 − (0,7 × ${yas}) = ${mx}/dk.</b> Kompliyansı azalan LV'de hızlı doluş yavaşlar; 20 yaşında 194, 80 yaşında 152/dk. [[K1 s. 120]] ` : '';
      if (!c && !yasS) { if (cap) cap.innerHTML = ilkCap; return; }
      if (!c) c = hr > mx ? `<b>Bu hız ${yas} yaşındaki kişinin HRmax'ını (${mx}/dk) aşıyor.</b> [[K1 s. 120]]` : '';
      setCap(cap, yasS + c);
    };
    const kur = (mod) => {
      const dar = mod === 'dar';
      const G = dar
        ? { W: 380, H: 300, x0: 18, x1: 362, bar: [36, 62], ic: [66, 75], l1: 96, l2: 116, ax: 128, tk: 144, hrl: 170, sc: [178, 200], htk: 216, mx: 236, k: [256, 274, 292] }
        : { W: 760, H: 240, x0: 30, x1: 730, bar: [30, 60], ic: [64, 73], l1: 94, l2: null, ax: 104, tk: 120, hrl: 146, sc: [154, 178], htk: 194, mx: 212, k: [232] };
      const Xs = (s) => G.x0 + (s / 2) * (G.x1 - G.x0);
      const Xh = (h) => G.x0 + ((h - 30) / 190) * (G.x1 - G.x0);
      const gid = yeniId('hzg');
      let eks = `<line class="f28-eks" x1="${G.x0}" x2="${G.x1}" y1="${G.ax}" y2="${G.ax}"/>`;
      [0, 0.5, 1, 1.5, 2].forEach((s) => { eks += `<line class="f28-eks" x1="${f1(Xs(s))}" x2="${f1(Xs(s))}" y1="${G.ax}" y2="${G.ax + 5}"/><text class="f28-tk" x="${f1(Xs(s))}" y="${G.tk}" text-anchor="middle">${vir(s, 1)}${s === 2 ? ' s' : ''}</text>`; });
      let hs = `<rect class="f28-hz-b w" x="${f1(Xh(30))}" y="${G.sc[0]}" width="${f1(Xh(40) - Xh(30))}" height="${G.sc[1] - G.sc[0]}"/>`
        + `<rect class="f28-hz-b o" x="${f1(Xh(50))}" y="${G.sc[0]}" width="${f1(Xh(150) - Xh(50))}" height="${G.sc[1] - G.sc[0]}"/>`
        + `<rect class="f28-hz-b g" x="${f1(Xh(150))}" y="${G.sc[0]}" width="${f1(Xh(220) - Xh(150))}" height="${G.sc[1] - G.sc[0]}" fill="url(#${gid})"/>`
        + `<rect class="f28-hz-cer" x="${G.x0}" y="${G.sc[0]}" width="${G.x1 - G.x0}" height="${G.sc[1] - G.sc[0]}"/>`;
      [30, 40, 50, 100, 150, 200, 220].forEach((h) => { if (dar && (h === 40 || h === 220)) return; hs += `<text class="f28-tk" x="${f1(Xh(h))}" y="${G.htk}" text-anchor="middle">${h}</text>`; });
      const anah = dar
        ? `<text class="f28-hz-an" x="${G.x0}" y="${G.k[0]}"><tspan class="w">&lt; 40</tspan> CO düşer (SV 80–90 mL'ye artsa da)</text><text class="f28-hz-an" x="${G.x0}" y="${G.k[1]}"><tspan class="o">50–150</tspan> en uygun (sinüs)</text><text class="f28-hz-an" x="${G.x0}" y="${G.k[2]}"><tspan class="w">&gt; 150</tspan> diyastol kısalır → SV ve CO düşer</text>`
        : `<text class="f28-hz-an" x="${G.x0}" y="${G.k[0]}"><tspan class="w">&lt; 40/dk</tspan> CO düşer (SV 80–90 mL'ye artsa da) · <tspan class="o">50–150</tspan> en uygun (sinüs) · <tspan class="w">&gt; 150</tspan> diyastol kısalır → SV ve CO düşer</text>`;
      el.innerHTML = `<svg class="f28-svg f28-hz${dar ? ' dar' : ''}" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="Bir kalp siklusunun sistol ve diyastol bölümleri ile kalp hızı ölçeği">
          <defs><linearGradient id="${gid}" x1="0" x2="1" y1="0" y2="0"><stop offset="0" style="stop-color:var(--warn);stop-opacity:.14"/><stop offset="1" style="stop-color:var(--warn);stop-opacity:.6"/></linearGradient></defs>
          <text class="f28-hz-bas" x="${G.x0}" y="${G.bar[0] - 8}">Bir siklus</text>
          <rect class="f28-hz-sis" x="${G.x0}" y="${G.bar[0]}" height="${G.bar[1] - G.bar[0]}" rx="4"/>
          <rect class="f28-hz-dia" y="${G.bar[0]}" height="${G.bar[1] - G.bar[0]}" rx="4"/>
          <text class="f28-hz-it s" y="${(G.bar[0] + G.bar[1]) / 2 + 5}">sistol</text><text class="f28-hz-it d" y="${(G.bar[0] + G.bar[1]) / 2 + 5}">diyastol</text>
          <rect class="f28-hz-pas" y="${G.ic[0]}" height="${G.ic[1] - G.ic[0]}" rx="2"/><rect class="f28-hz-atr" y="${G.ic[0]}" height="${G.ic[1] - G.ic[0]}" rx="2"/><rect class="f28-hz-afk" y="${G.ic[0] - 1}" height="${G.ic[1] - G.ic[0] + 2}" rx="2"/>
          <text class="f28-hz-sk" y="${(G.bar[0] + G.bar[1]) / 2 + 5}"></text>
          <text class="f28-hz-l" x="${G.x0}" y="${G.l1}" data-o="l1"></text>${G.l2 ? `<text class="f28-hz-l" x="${G.x0}" y="${G.l2}" data-o="l2"></text>` : ''}
          ${eks}
          <text class="f28-hz-bas" x="${G.x0}" y="${G.hrl - (dar ? 0 : 0)}" data-o="hrb">Kalp hızı (/dk)</text>
          ${hs}
          <line class="f28-hz-mx" y1="${G.sc[0] - 6}" y2="${G.sc[1] + 6}"/><text class="f28-hz-mxt" y="${G.mx}" text-anchor="middle"></text>
          <path class="f28-hz-isr" d=""/><text class="f28-hz-hrt" y="${G.hrl}" text-anchor="middle"></text>
          ${anah}
        </svg>
        <div class="f28-hz-ctl">
          <label class="f28-rng"><span>Kalp hızı <b data-o="hr"></b></span><input type="range" min="30" max="220" step="5" value="${st.hr}" data-r="hr" aria-label="Kalp hızı, /dk"></label>
          <label class="f28-rng"><span>Yaş <b data-o="yas"></b></span><input type="range" min="20" max="80" step="1" value="${st.yas}" data-r="yas" aria-label="Yaş, yıl"></label>
          <div class="btn-row"><button type="button" class="f28-tg" data-a="af" aria-pressed="${st.af}">AF</button><button type="button" class="btn ghost" data-p="75">İstirahat 75</button><button type="button" class="btn ghost" data-p="200">Sporcu, maksimal egzersiz 200</button><button type="button" class="btn ghost" data-p="35">Bradikardi 35</button></div>
        </div>
        <div class="f28-hz-yas">
          <p class="f28-hz-f" data-o="f"></p>
          <div class="f28-hz-kartlar">
            <div class="f28-hz-k">Aort kompliyansı ↓ → ard yük ↑ → LV hipertrofisi → LV kompliyansı ↓</div>
            <div class="f28-hz-k">Diyastolik gevşeme verimsiz → LV kompliyansı ↓ → hızlı doluşta doluş hızı ↓</div>
            <div class="f28-hz-k">Atriyal fibrozis → AF yatkınlığı</div>
          </div>
          <p class="f28-hz-pay">Atriyal kasılmanın doluşa payı: istirahatte %10 · egzersizde %40'a kadar · ileri yaşta LVEDV'nin %40'ına kadar ${REF('[[K1 s. 117, 120]]')}</p>
        </div>`;
      const svg = el.querySelector('svg'), q = (s) => el.querySelector(s);
      const rH = q('[data-r="hr"]'), rY = q('[data-r="yas"]');
      const g = st.g || (st.g = model(st.hr, st.yas, st.af)); // gösterilen (yumuşak geçen) değerler
      const ciz = () => {
        const xs = Xs(0), xe = Xs(g.T), xm = Xs(g.s);
        const ss = q('.f28-hz-sis'), dd = q('.f28-hz-dia');
        ss.setAttribute('width', f1(Math.max(0, xm - xs))); dd.setAttribute('x', f1(xm)); dd.setAttribute('width', f1(Math.max(0, xe - xm)));
        const ts = q('.f28-hz-it.s'), td = q('.f28-hz-it.d');
        ts.setAttribute('x', f1(xs + 6)); ts.style.display = xm - xs > 52 ? '' : 'none';
        td.setAttribute('x', f1(xm + 6)); td.style.display = xe - xm > 66 ? '' : 'none';
        const wD = xe - xm, wA = wD * g.pay;
        q('.f28-hz-pas').setAttribute('x', f1(xm)); q('.f28-hz-pas').setAttribute('width', f1(Math.max(0, wD - wA - (wA > 0.5 ? 2 : 0))));
        q('.f28-hz-atr').setAttribute('x', f1(xe - wA)); q('.f28-hz-atr').setAttribute('width', f1(Math.max(0, wA)));
        const afk = q('.f28-hz-afk'); const wK = wD * 0.1;
        afk.setAttribute('x', f1(xe - Math.max(wK, 6))); afk.setAttribute('width', f1(Math.max(wK, 6))); afk.style.display = st.af ? '' : 'none';
        const sk = q('.f28-hz-sk');
        const skT = `siklus ${vir(g.T, 2)} s`;
        if (xe + 112 < G.x1) { sk.setAttribute('x', f1(xe + 8)); sk.setAttribute('text-anchor', 'start'); sk.setAttribute('y', (G.bar[0] + G.bar[1]) / 2 + 5); }
        else { sk.setAttribute('x', G.x1); sk.setAttribute('text-anchor', 'end'); sk.setAttribute('y', G.bar[0] - 8); }
        sk.textContent = skT;
        const dol = st.af ? 'AF: atriyal kasılma yok' : `doluş: pasif %${Math.round((1 - g.pay) * 100)} + atriyal ${g.pay > 0.2 ? '≤ ' : ''}%${Math.round(g.pay * 100)}`;
        const l1 = q('[data-o="l1"]'), l2 = q('[data-o="l2"]');
        const sd = `<tspan class="s">sistol ${vir(g.s, 2)} s</tspan> · <tspan class="d">diyastol ${vir(g.d, 2)} s</tspan>`;
        if (l2) { l1.innerHTML = sd; l2.innerHTML = `<tspan class="${st.af ? 'af' : 'p'}">${dol}</tspan>`; }
        else l1.innerHTML = `${sd} · <tspan class="${st.af ? 'af' : 'p'}">${dol}</tspan>`;
      };
      const isaret = () => {
        const x = Xh(st.hr), mx = hrmax(st.yas), xm = Xh(mx);
        q('.f28-hz-isr').setAttribute('d', `M${f1(x - 7)} ${G.sc[0] - 10} L${f1(x + 7)} ${G.sc[0] - 10} L${f1(x)} ${G.sc[0] - 1} Z M${f1(x)} ${G.sc[0]} V${G.sc[1]}`);
        const ht = q('.f28-hz-hrt'); ht.setAttribute('x', f1(clamp(x, G.x0 + 34, G.x1 - 34))); ht.textContent = `HR ${st.hr}/dk`;
        const hb = q('[data-o="hrb"]'); hb.style.display = clamp(x, G.x0 + 34, G.x1 - 34) - 40 < G.x0 + (dar ? 124 : 112) ? 'none' : '';
        const ml = q('.f28-hz-mx'); ml.setAttribute('x1', f1(xm)); ml.setAttribute('x2', f1(xm));
        const mt = q('.f28-hz-mxt'); mt.setAttribute('x', f1(clamp(xm, G.x0 + 50, G.x1 - 50))); mt.textContent = `HRmax ${mx}/dk`; mt.classList.toggle('as', st.hr > mx);
        q('[data-o="hr"]').textContent = `${st.hr}/dk`; q('[data-o="yas"]').textContent = `${st.yas}`;
        q('[data-o="f"]').innerHTML = `HRmax = 208 − (0,7 × ${st.yas}) = <b>${mx}/dk</b> ${REF('[[K1 s. 120]]')}`;
        el.querySelectorAll('.f28-hz-k').forEach((k) => k.classList.toggle('on', st.yas >= 60));
        q('[data-a="af"]').setAttribute('aria-pressed', String(st.af));
      };
      const hedef = () => model(st.hr, st.yas, st.af);
      const degis = (son) => { st.son = son; isaret(); kapCap(); if (RM) { Object.assign(g, hedef()); ciz(); } };
      rH.addEventListener('input', () => { st.hr = +rH.value; degis('hr'); });
      rY.addEventListener('input', () => { st.yas = +rY.value; degis('yas'); });
      q('[data-a="af"]').addEventListener('click', () => { st.af = !st.af; degis('af'); });
      el.querySelectorAll('[data-p]').forEach((b) => b.addEventListener('click', () => { st.hr = +b.dataset.p; if (st.hr === 200) st.yas = 20; if (st.hr === 75) st.af = false; rH.value = st.hr; rY.value = st.yas; degis('hr'); }));
      isaret(); ciz();
      if (RM) return () => {};
      return ticker(svg, (dt) => {
        const h = hedef(), k = 1 - Math.exp(-dt / 0.09);
        let fark = 0;
        ['T', 's', 'd', 'pay'].forEach((n) => { fark += Math.abs(h[n] - g[n]); g[n] += (h[n] - g[n]) * k; });
        if (fark > 1e-4) ciz();
      });
    };
    return duyarli(el, darMi, kur);
  };

  /* =====================================================================
     6 · Dört lezyon, dört hedef seti
     ===================================================================== */
  const hat = (pts) => {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const top = L[L.length - 1];
    const at = (u) => {
      const s = clamp(u, 0, 1) * top;
      let i = 1;
      while (i < L.length - 1 && L[i] < s) i++;
      const f = (s - L[i - 1]) / (L[i] - L[i - 1] || 1);
      return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)];
    };
    return { L, top, at, d: 'M' + pts.map((p) => p.join(' ')).join(' L') };
  };
  const YOL = {
    mit: hat([[100, 66], [114, 112], [120, 140], [124, 178], [136, 226]]),
    ao: hat([[150, 236], [184, 184], [204, 140], [204, 64], [222, 34], [298, 30]]),
  };
  const UV = { mit: YOL.mit.L[2] / YOL.mit.top, ao: YOL.ao.L[2] / YOL.ao.top };
  const LEZ = {
    as: { ad: 'Aort darlığı', kap: 'ao', tur: 'dar', hr: [50, 70], hrN: 'Düşük/normal hız: stenotik kapaktan sistolik ejeksiyona zaman tanır.', ritim: 'Sinüs ritmi: AF kötü tolere edilir', svr: 'koru', svrN: 'Ani düşüşten kaçın: CO görece sabit, hipotansiyon koroner perfüzyonu bozabilir.', ek: ['Nöroaksiyel blok: kitaba göre kontrendike (Atlas notuna bakın)', 'İlaçları dikkatle titre et'], faz: 's',
      akim: [{ y: 'ao', yon: 1, f: 's', dar: true }, { y: 'mit', yon: 1, f: 'd' }],
      cap: '<b>Aort darlığı.</b> Düşük/normal hız (50–70/dk) stenotik kapaktan sistolik ejeksiyona zaman tanır; AF LV doluşunu ağır bozar ve kötü tolere edilir. CO görece sabit olduğundan SVR\'deki ani düşüşler kompanse edilemez; hipotansiyon koroner perfüzyonu bozabilir. [[K1 s. 120]]' },
    ms: { ad: 'Mitral darlığı', kap: 'mit', tur: 'dar', hr: [50, 70], hrN: 'Düşük/normal hız: dar kapaktan LV doluşuna zaman tanır.', ritim: 'Sinüs ritmi: intraoperatif AF → acil kardiyoversiyon', svr: 'koru', svrN: 'SVR korunur.', ek: ['Hiperkarbi, asidoz, hipoksiden kaçın (pulmoner hipertansiyon ağırlaşır)'], faz: 'd',
      akim: [{ y: 'mit', yon: 1, f: 'd', dar: true }, { y: 'ao', yon: 1, f: 's' }],
      cap: '<b>Mitral darlığı.</b> Kan dar kapaktan diyastolde geçer: düşük/normal hız (50–70/dk) LV doluşuna zaman tanır. Sinüs ritmi korunur; intraoperatif AF\'de acil kardiyoversiyon endikedir. SVR korunur; hiperkarbi, asidoz ve hipoksi pulmoner hipertansiyonu ağırlaştırabilir. [[K1 s. 120]]' },
    ar: { ad: 'Aort yetersizliği', kap: 'ao', tur: 'yet', hr: [90, 110], hrN: 'Yüksek/normal hız: diyastolü kısaltır, regürjitan fraksiyon azalır.', ritim: null, svr: 'dusuk', svrN: 'Düşük SVR ileri akımı artırır, regürjitan fraksiyonu azaltır.', ek: ['Kontraktiliteyi koru', '“Dolu, hızlı, ileri”'], faz: 'd',
      akim: [{ y: 'ao', yon: 1, f: 's' }, { y: 'ao', yon: -1, f: 'd', geri: true, u0: 0.12, u1: 0.62 }, { y: 'mit', yon: 1, f: 'd' }],
      cap: '<b>Aort yetersizliği · "dolu, hızlı, ileri".</b> Kan diyastolde aorttan LV\'ye geri kaçar: yüksek/normal hız (90–110/dk) diyastolü kısaltıp regürjitan fraksiyonu azaltır. Düşük SVR ileri akımı artırır, regürjitan fraksiyonu azaltır; kontraktilite korunur. [[K1 s. 120]]' },
    mr: { ad: 'Mitral yetersizliği', kap: 'mit', tur: 'yet', hr: [90, 110], hrN: 'Yüksek/normal hız: kitaba göre kısa diyastol regürjitan fraksiyonu azaltır (Atlas notuna bakın).', ritim: null, svr: 'dusuk', svrN: 'Düşük SVR ileri akımı korur, regürjitan fraksiyonu azaltır.', ek: ['Hiperkarbi, asidoz, hipoksiden kaçın'], faz: 's',
      akim: [{ y: 'ao', yon: 1, f: 's' }, { y: 'mit', yon: -1, f: 's', geri: true, u0: 0.1, u1: 0.85 }, { y: 'mit', yon: 1, f: 'd' }],
      cap: '<b>Mitral yetersizliği.</b> Kan sistolde LV\'den sol atriyuma geri kaçar. Kitap yüksek/normal hızı (90–110/dk) kısa diyastolün regürjitan fraksiyonu azaltmasıyla açıklar (sayfadaki Atlas notuna bakın). Düşük SVR ileri akımı korur ve regürjitan fraksiyonu azaltır; hiperkarbi, asidoz ve hipoksiden kaçınılır. [[K1 s. 120]]' },
  };
  VIZ.f28_kapak = (el) => {
    const cap = capOf(el);
    const st = { lz: 'as', ilk: true, tc: 0 };
    const oid = yeniId('kok');
    const hrX = (h) => ((h - 30) / 120) * 100;
    el.innerHTML = `<div class="seg f28-kp-sek" role="group" aria-label="Kapak lezyonu">${Object.entries(LEZ).map(([k, l]) => `<button type="button" data-l="${k}" aria-pressed="${k === 'as'}">${l.ad}</button>`).join('')}</div>
      <div class="f28-kpz">
        <svg class="f28-svg f28-kpz-svg" viewBox="0 0 320 300" role="img" aria-label="Şematik sol kalp: sol atriyum, sol ventrikül, aort; seçilen lezyonda kanın akışı">
          <defs><marker id="${oid}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" class="f28-okuc2"/></marker></defs>
          <path class="f28-kz-lv" d="M76 140 C76 236 112 288 158 290 C204 288 238 236 238 140 Z"/>
          <path class="f28-kz-ao" d="M186 140 V48 Q186 16 218 16 H312 V44 H226 Q222 44 222 50 V140 Z"/>
          <ellipse class="f28-kz-la" cx="110" cy="96" rx="56" ry="44"/>
          <g class="f28-kz-kp" data-k="mit"><line class="f28-kz-y"/><line class="f28-kz-y"/><circle cx="92" cy="140" r="3.5" class="f28-kz-p"/><circle cx="148" cy="140" r="3.5" class="f28-kz-p"/></g>
          <g class="f28-kz-kp" data-k="ao"><line class="f28-kz-y"/><line class="f28-kz-y"/><circle cx="186" cy="140" r="3.5" class="f28-kz-p"/><circle cx="222" cy="140" r="3.5" class="f28-kz-p"/></g>
          <g class="f28-kz-ok"></g><g class="f28-kz-par"></g>
          <text class="f28-kz-t" x="110" y="84" text-anchor="middle">Sol atriyum</text>
          <text class="f28-kz-t" x="158" y="262" text-anchor="middle">Sol ventrikül</text>
          <text class="f28-kz-t" x="306" y="62" text-anchor="end">Aort</text>
          <text class="f28-kz-k" x="74" y="136" text-anchor="end">mitral</text>
          <text class="f28-kz-k" x="244" y="132">aort kapağı</text>
          <g class="f28-kz-faz"><rect class="f28-kz-fr s" x="4" y="4" width="62" height="22" rx="6"/><text class="f28-kz-ft s" x="35" y="19" text-anchor="middle">SİSTOL</text>
            <rect class="f28-kz-fr d" x="70" y="4" width="76" height="22" rx="6"/><text class="f28-kz-ft d" x="108" y="19" text-anchor="middle">DİYASTOL</text></g>
        </svg>
        <div class="f28-hd">
          <div class="f28-hd-s"><h4>Kalp hızı</h4><div class="f28-hd-olc"><i class="bnd"></i></div><div class="f28-hd-tk">${[30, 60, 90, 120, 150].map((h) => `<em style="left:${hrX(h)}%">${h}</em>`).join('')}</div><p data-o="hr"></p></div>
          <div class="f28-hd-s"><h4>Ritim</h4><p data-o="ritim"></p></div>
          <div class="f28-hd-s"><h4>SVR</h4><div class="f28-hd-svr"><span data-v="dusuk">düşük</span><span data-v="koru">koru</span></div><p data-o="svr"></p></div>
          <div class="f28-hd-s"><h4>Ayrıca</h4><p data-o="ek"></p></div>
          <p class="f28-hd-not">Hepsinde normovolemi korunur. ${REF('[[K1 s. 120]]')}</p>
        </div>
      </div>`;
    const svg = el.querySelector('svg'), q = (s) => el.querySelector(s);
    const parG = svg.querySelector('.f28-kz-par'), okG = svg.querySelector('.f28-kz-ok');
    const NS = 'http://www.w3.org/2000/svg';
    const KP = { mit: { p: [92, 148], y: 140, n: 1 }, ao: { p: [186, 222], y: 140, n: -1 } };
    const th = { mit: 0, ao: 0 };
    let parc = [];
    const kapakCiz = (k) => {
      const L = LEZ[st.lz], kp = KP[k], lez = L.kap === k, [l1, l2] = svg.querySelectorAll(`.f28-kz-kp[data-k="${k}"] .f28-kz-y`);
      const half = (kp.p[1] - kp.p[0]) / 2, Ly = lez && L.tur === 'yet' ? half - 6 : half;
      const a = yaprak(kp.p[0], kp.y, 1, kp.n, Ly, th[k]), b = yaprak(kp.p[1], kp.y, -1, kp.n, Ly, th[k]);
      l1.setAttribute('x1', kp.p[0]); l1.setAttribute('y1', kp.y); l1.setAttribute('x2', f1(a[0])); l1.setAttribute('y2', f1(a[1]));
      l2.setAttribute('x1', kp.p[1]); l2.setAttribute('y1', kp.y); l2.setAttribute('x2', f1(b[0])); l2.setAttribute('y2', f1(b[1]));
      svg.querySelector(`.f28-kz-kp[data-k="${k}"]`).classList.toggle('lez', lez);
    };
    const hedefTh = (k, faz) => { const L = LEZ[st.lz], acik = (k === 'mit' && faz === 'd') || (k === 'ao' && faz === 's'); if (!acik) return 0; return L.kap === k && L.tur === 'dar' ? 24 : 72; };
    const parcKur = () => {
      parG.innerHTML = ''; okG.innerHTML = ''; parc = [];
      const L = LEZ[st.lz];
      svg.querySelector('.f28-kz-la').setAttribute('rx', st.lz === 'ms' ? 64 : 56);
      svg.querySelector('.f28-kz-la').setAttribute('ry', st.lz === 'ms' ? 52 : 44);
      svg.querySelector('.f28-kz-la').setAttribute('cy', st.lz === 'ms' ? 88 : 96);
      if (RM) {
        // durağan oklar: lezyonun fazındaki akımlar
        L.akim.filter((a) => a.f === L.faz).forEach((a) => {
          const H = YOL[a.y], u0 = a.u0 ?? 0.05, u1 = a.u1 ?? 0.95, n = 24, pts = [];
          for (let j = 0; j <= n; j++) { const u = a.yon > 0 ? lerp(u0, u1, j / n) : lerp(u1, u0, j / n); pts.push(H.at(u)); }
          const p = document.createElementNS(NS, 'path');
          p.setAttribute('d', 'M' + pts.map((x) => f1(x[0]) + ' ' + f1(x[1])).join(' L'));
          p.setAttribute('class', 'f28-kz-sok' + (a.geri ? ' geri' : '') + (a.dar ? ' dar' : ''));
          p.setAttribute('marker-end', `url(#${oid})`);
          okG.appendChild(p);
        });
        return;
      }
      L.akim.forEach((a, ai) => {
        const n = a.dar ? 16 : 12;
        for (let j = 0; j < n; j++) {
          const c = document.createElementNS(NS, 'circle');
          c.setAttribute('r', a.dar ? 3.2 : 3.6);
          c.setAttribute('class', 'f28-kz-pc' + (a.geri ? ' geri' : ''));
          parG.appendChild(c);
          parc.push({ c, a, ai, u: j / n, o: ((j * 7) % n) / (n - 1) * 2 - 1 });
        }
      });
    };
    const yerlestir = (faz, dt) => {
      parc.forEach((p) => {
        const a = p.a, H = YOL[a.y], on = a.f === faz;
        const u0 = a.u0 ?? 0, u1 = a.u1 ?? 1;
        const uv = UV[a.y];
        let u = a.yon > 0 ? lerp(u0, u1, p.u) : lerp(u1, u0, p.u);
        const yakin = Math.abs(u - uv) < 0.12;
        const hiz = (a.dar && yakin ? 2.6 : 1) * (a.dar ? 0.5 : 0.6);
        p.u = (p.u + dt * hiz) % 1;
        u = a.yon > 0 ? lerp(u0, u1, p.u) : lerp(u1, u0, p.u);
        const [x, y] = H.at(u), [x2, y2] = H.at(u + 0.01), len = Math.hypot(x2 - x, y2 - y) || 1;
        const nx = -(y2 - y) / len, ny = (x2 - x) / len;
        let w = 9;
        const dv = Math.abs(u - uv);
        if (a.dar && dv < 0.14) w = lerp(1.5, 9, dv / 0.14);
        else if (a.geri && dv < 0.1) w = lerp(2.5, 9, dv / 0.1);
        p.c.setAttribute('cx', f1(x + nx * w * p.o)); p.c.setAttribute('cy', f1(y + ny * w * p.o));
        const kenar = Math.min(p.u, 1 - p.u) * 10;
        p.c.style.opacity = on ? Math.min(1, kenar).toFixed(2) : 0;
      });
    };
    const fazGoster = (faz) => { svg.querySelectorAll('.f28-kz-fr, .f28-kz-ft').forEach((n) => n.classList.toggle('on', n.classList.contains(faz))); };
    const panel = () => {
      const L = LEZ[st.lz];
      el.querySelectorAll('[data-l]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.l === st.lz)));
      const b = q('.f28-hd-olc .bnd'); b.style.left = hrX(L.hr[0]) + '%'; b.style.width = hrX(L.hr[1]) - hrX(L.hr[0]) + '%';
      q('[data-o="hr"]').innerHTML = `<b>hedef ${L.hr[0]}–${L.hr[1]}/dk.</b> ${L.hrN}`;
      q('[data-o="ritim"]').innerHTML = L.ritim ? `<span class="f28-roz">${L.ritim}</span>` : '<span class="f28-roz soluk">— kitapta özel hedef yok</span>';
      el.querySelectorAll('.f28-hd-svr span').forEach((s) => s.classList.toggle('on', s.dataset.v === L.svr));
      q('[data-o="svr"]').textContent = L.svrN;
      q('[data-o="ek"]').innerHTML = L.ek.map((e) => `<span class="f28-roz">${e}</span>`).join(' ');
      q('.f28-kpz').dataset.lz = st.lz;
    };
    const sec = (k) => { st.lz = k; st.ilk = false; st.tc = 0; panel(); parcKur(); setCap(cap, LEZ[k].cap); if (RM) statik(); };
    const statik = () => { const L = LEZ[st.lz]; th.mit = hedefTh('mit', L.faz); th.ao = hedefTh('ao', L.faz); kapakCiz('mit'); kapakCiz('ao'); fazGoster(L.faz); };
    el.querySelector('.f28-kp-sek').addEventListener('click', (e) => { const b = e.target.closest('[data-l]'); if (b) sec(b.dataset.l); });
    panel(); parcKur();
    if (RM) { statik(); return () => {}; }
    kapakCiz('mit'); kapakCiz('ao');
    return ticker(svg, (dt) => {
      st.tc = (st.tc + dt) % 2.4;
      const faz = st.tc < 0.9 ? 's' : 'd';
      fazGoster(faz);
      ['mit', 'ao'].forEach((k) => { const h = hedefTh(k, faz); th[k] += (h - th[k]) * (1 - Math.exp(-dt / 0.06)); kapakCiz(k); });
      yerlestir(faz, dt);
    });
  };
})();
