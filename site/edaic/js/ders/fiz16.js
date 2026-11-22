/* Fizyoloji Bölüm 16 · Akciğerde ventilasyon–perfüzyon zonları · bileşenler (K1 s. 71–73).
   Tasarım tarifi: docs/tasarim/fiz16.md.
   Ortak West modeli (şematik, Atlas notu): dik akciğer 30 cm (K1 s. 68), yükseklik h hilusa (≈ sol atriyum düzeyi) göre cm;
   damar basınçları her cm için 1 cmH₂O değişir, alveoler basınç PA her yükseklikte aynıdır. Hilusta Pa 25/8 (ortalama 15) mmHg
   ve Pv 5 mmHg (K1 s. 146); 1 mmHg = 1,36 cmH₂O. Zon kuralı (K1 s. 71): PA ≥ sistolik Pa → 1; PA ≥ Pv → 2; değilse 3.
   Akım "şelale" ilkesiyle: Q = max(0, Pa − max(Pv, PA)). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const K = 1.36;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const yumusak = (f) => (f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2);
  const fmt = (v, d = 1) => { let s = v.toFixed(d); if (/^-0(\.0+)?$/.test(s)) s = s.slice(1); return s.replace('.', ',').replace('-', '−'); };
  const tam = (v) => { const r = Math.round(v); return (r < 0 ? '−' : '') + Math.abs(r); };
  const yuk = (h) => (h > 0 ? '+' + h : h < 0 ? '−' + Math.abs(h) : '0');
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const yol = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');

  // Bileşen kutusunun (sayfadaki) açıklaması: değiştir / ilk metne dön
  const aciklama = (el) => {
    const kutu = el.closest('.viz'), cap = kutu && kutu.querySelector(':scope > .viz-cap');
    if (!cap) return { yaz() {}, geri() {} };
    cap.setAttribute('aria-live', 'polite');
    const ilk = cap.innerHTML; let son = ilk;
    return {
      yaz(h) { const x = REF(h); if (x !== son) { cap.innerHTML = x; son = x; } },
      geri() { if (son !== ilk) { cap.innerHTML = ilk; son = ilk; } },
    };
  };
  // rAF geçişi; RM'de anlık. İptal işlevi döndürür.
  const gecis = (ms, adim, bitti) => {
    if (RM || ms <= 0) { adim(1); if (bitti) bitti(); return () => {}; }
    let raf = 0, t0 = 0, on = true;
    const f = (t) => {
      if (!on) return;
      if (!t0) t0 = t;
      const k = Math.min(1, (t - t0) / ms);
      adim(yumusak(k));
      if (k < 1) raf = requestAnimationFrame(f); else if (bitti) bitti();
    };
    raf = requestAnimationFrame(f);
    return () => { on = false; cancelAnimationFrame(raf); };
  };

  // Basit dik sağ akciğer silueti (önden): u 0 lateral → 1 medial (sağda, hilus çentiği), v 0 apeks → 1 taban
  const AKC = [['M', 0.56, 0], ['C', 0.76, 0, 0.9, 0.1, 0.93, 0.25], ['L', 0.98, 0.45], ['C', 0.83, 0.465, 0.83, 0.535, 0.98, 0.55], ['L', 1, 0.93],
    ['C', 1, 0.985, 0.96, 1, 0.9, 1], ['C', 0.66, 0.95, 0.34, 0.95, 0, 1], ['C', -0.03, 0.75, 0.02, 0.4, 0.2, 0.12], ['C', 0.28, 0.03, 0.4, 0, 0.56, 0], ['Z']];
  const akcYol = (x0, x1, y0, y1) => AKC.map(([c, ...p]) => c + p.map((v, i) => (i % 2 ? y0 + v * (y1 - y0) : x0 + v * (x1 - x0)).toFixed(1)).join(' ')).join(' ');

  const ZRENK = { 1: ['var(--muted)', 'var(--chip)'], 2: ['var(--warn)', 'var(--warn-soft)'], 3: ['var(--ok)', 'var(--ok-soft)'] };

  /* ---------- 1 · Bir kapiller, üç zon: kardiyak döngü boyunca akım ---------- */
  VIZ.f16_kapiller = (el) => {
    const T = 2.4, SIS = 0.35, X0 = 70, X1 = 200, YC = 68, NR = 10, B0 = 14, B1 = 256;
    const SX0 = 276, SX1 = 394, SY0 = 98, SK = 70 / 30;
    const SAT = [
      { z: 1, h: 13, PA: 22, ad: 'Zon 1 · apekse yakın, PA artmış', kisa: 'Zon 1 · PA artmış', son: 'akım yok', sira: 'PA > Pa > Pv', bel: 'yok: kapiller kapalı', bic: 'akım yok' },
      { z: 2, h: 13, PA: 0, ad: 'Zon 2 · apekse yakın (hilusun 13 cm üstü)', kisa: 'Zon 2 · hilusun 13 cm üstü', son: 'kesintili · yalnız sistolde', sira: 'Pa > PA > Pv', bel: 'Pa − PA', bic: 'kesintili, yalnız sistolde' },
      { z: 3, h: -10, PA: 0, ad: 'Zon 3 · taban (hilusun 10 cm altı)', kisa: 'Zon 3 · hilusun 10 cm altı', son: 'sürekli', sira: 'Pa > Pv > PA', bel: 'Pa − Pv', bic: 'sürekli' },
    ].map((r) => Object.assign(r, { sys: Math.round(34 - r.h), dia: Math.round(10.88 - r.h), pv: Math.round(6.8 - r.h), c: ZRENK[r.z][0], s: ZRENK[r.z][1] }));
    const CAP = {
      3: '<b>Zon 3 · Pa &gt; Pv &gt; PA.</b> Tabanda (modelde hilusun 10 cm altında) Pa 44/21, Pv 17, PA 0 cmH₂O. Kapillerin iki ucu da alveoler basıncın üstünde: kapiller açık kalır, akımı Pa − Pv farkı belirler ve akım diyastolde de sürer. [[K1 s. 71]]',
      2: '<b>Zon 2 · Pa &gt; PA &gt; Pv.</b> Apekse yakın (hilusun 13 cm üstü) Pa 21/−2, Pv −6, PA 0 cmH₂O. Alveoler basınç venöz basıncın üstünde: venöz uç sıkışır ve akımı Pa − PA belirler. Diyastolde Pa alveoler basıncın altına iner ve akım durur; kan yalnız sistolde geçer. Kesintili akım V̇/Q̇ oranını yükseltir ve alveoler ölü boşluk yaratır. [[K1 s. 71]]',
      1: '<b>Zon 1 · PA &gt; Pa &gt; Pv.</b> Aynı yükseklikte alveoler basınç 22 cmH₂O\'ya çıkarsa (ör. pozitif basınçlı ventilasyon) sistolik Pa\'yı da aşar: kapiller baştan sona kapanır, perfüzyon durur. Alveol ventile edilmeye devam eder; V̇/Q̇ yüksek, alveoler ölü boşluk büyüktür. Sağlıklı akciğerde zon 1 yoktur. [[K1 s. 71–72]]',
    };
    const cap = aciklama(el);
    let zon = 3, run = !RM, t = RM ? 0.175 * T : 0, ilk = true;
    const faz = (tt) => { const f = ((tt % T) + T) % T; return f / T; };
    const paT = (r, tt) => { const f = faz(tt); return f < SIS ? r.dia + (r.sys - r.dia) * Math.sin((Math.PI * f) / SIS) : r.dia; };
    const qT = (r, tt) => Math.max(0, paT(r, tt) - Math.max(r.pv, r.PA));
    const satirSvg = (r) => `<svg class="f16-svg f16-kp-satir${r.z === zon ? ' on' : ''}" data-z="${r.z}" viewBox="0 0 400 124" role="img" aria-label="${r.ad}: Pa ${r.sys}/${r.dia}, Pv ${r.pv}, PA ${r.PA} cmH₂O; akım ${r.son}">
        <defs><linearGradient id="f16-kgr-${r.z}" gradientUnits="userSpaceOnUse" x1="${X0}" x2="${X1}" y1="0" y2="0"><stop offset="0" style="stop-color:var(--crit)"/><stop offset="1" style="stop-color:var(--c-basic)"/></linearGradient></defs>
        <rect class="f16-kp-zemin" x="1" y="1" width="398" height="122" rx="10"/>
        <rect x="8" y="6" width="10" height="10" rx="2" style="fill:${r.c}"/>
        <text class="f16-lb f16-kp-ad" x="24" y="15">${r.ad}</text>
        <text class="f16-lb f16-kp-adk" x="24" y="15">${r.kisa}</text>
        <path class="f16-kp-alv" data-p="u"/><path class="f16-kp-alv" data-p="d"/>
        <text class="f16-t f16-kp-alvt" x="135" y="43" text-anchor="middle">alveol · PA = ${r.PA}</text>
        <path class="f16-kp-art" d="M${X0} 59 H18 Q14 59 14 63 V73 Q14 77 18 77 H${X0}"/>
        <path class="f16-kp-ven" d="M${X1} 59 H252 Q256 59 256 63 V73 Q256 77 252 77 H${X1}"/>
        <path class="f16-kp-kap" style="fill:url(#f16-kgr-${r.z})"/>
        <path class="f16-kp-duv" style="stroke:url(#f16-kgr-${r.z})"/>
        <g class="f16-kp-rbc"></g>
        ${r.z === 1 ? `<g class="f16-kp-ok">${[105, 165].map((x) => `<path d="M${x} 48 V57 M${x - 4} 53 L${x} 58 L${x + 4} 53"/><path d="M${x} 91 V80 M${x - 4} 84 L${x} 79 L${x + 4} 84"/>`).join('')}</g><text class="f16-t f16-kp-sk" x="135" y="106" text-anchor="middle">sıkıştırır</text>` : ''}
        ${r.z === 2 ? `<g class="f16-kp-ok"><path d="M191 96 V80 M187 84 L191 79 L195 84"/></g><text class="f16-t f16-kp-sk" x="184" y="104" text-anchor="end">sıkışma</text>` : ''}
        <text class="f16-v f16-kp-pa" x="42" y="52" text-anchor="middle"></text>
        <text class="f16-t" x="42" y="94" text-anchor="middle">${tam(r.sys)}/${tam(r.dia)}</text>
        <text class="f16-v f16-kp-pv" x="228" y="52" text-anchor="middle">Pv ${tam(r.pv)}</text>
        <line class="f16-kp-sifir" x1="${SX0}" x2="${SX1}" y1="${SY0}" y2="${SY0}"/>
        <path class="f16-kp-alan" style="fill:${r.s}"/>
        <path class="f16-kp-egri" style="stroke:${r.c}"/>
        <circle class="f16-kp-nok" r="3.5" cx="${SX1}" style="fill:${r.c}"/>
        <text class="f16-kp-son" x="${SX1}" y="117" text-anchor="end" style="fill:${r.c}">${r.son}</text>
      </svg>`;
    el.innerHTML = `<div class="f16-ust">${segHtml('Zon seçimi', 'z', [[3, 'Zon 3'], [2, 'Zon 2'], [1, 'Zon 1']], 3)}<button type="button" class="btn ghost" data-a="oynat">Duraklat</button><span class="f16-birim">basınçlar cmH₂O</span></div>
      <div class="f16-kp">
        <div class="f16-kp-sut">
          <svg class="f16-svg f16-kp-bas" viewBox="0 0 400 20" aria-hidden="true">
            <text class="f16-lb f16-kp-bt" x="42" y="14" text-anchor="middle">arteriyel uç</text>
            <text class="f16-lb f16-kp-bt" x="135" y="14" text-anchor="middle">kapiller</text>
            <text class="f16-lb f16-kp-bt" x="228" y="14" text-anchor="middle">venöz uç</text>
            <text class="f16-lb f16-kp-bt" x="${SX0}" y="14">akım</text>
            <text class="f16-kp-faz" x="${SX1}" y="14" text-anchor="end"></text>
          </svg>
          ${SAT.map(satirSvg).join('')}
        </div>
        <dl class="f16-oku f16-kp-oku">
          <div><dt>Seçili satır</dt><dd data-o="ad"></dd></div>
          <div><dt>Basınç sırası</dt><dd data-o="sira"></dd></div>
          <div><dt>Akımı belirleyen</dt><dd data-o="bel"></dd></div>
          <div><dt>Akımın biçimi</dt><dd data-o="bic"></dd></div>
          <div class="f16-kp-anlik"><dt>Şu an</dt><dd data-o="an"></dd></div>
        </dl>
      </div>`;
    const $ = (s) => el.querySelector(s), o = (k) => el.querySelector(`[data-o="${k}"]`);
    const oyn = $('[data-a="oynat"]'), fazT = $('.f16-kp-faz');
    const R = SAT.map((r) => {
      const svg = el.querySelector(`.f16-kp-satir[data-z="${r.z}"]`);
      const g = svg.querySelector('.f16-kp-rbc');
      const rbc = Array.from({ length: NR }, () => mk('circle', { r: 3.5, class: 'f16-kp-er' }, g));
      // zon 1: akım yok, eritrositler arteriyel boruda kapiller girişinin önünde birikmiş
      const pos = r.z === 1 ? [22, 29, 36, 43, 50, 57, 64, 212, 230, 246] : Array.from({ length: NR }, (_, i) => B0 + (i + 0.5) * ((B1 - B0) / NR));
      return { r, svg, rbc, pos, kap: svg.querySelector('.f16-kp-kap'), duv: svg.querySelector('.f16-kp-duv'), au: svg.querySelector('[data-p="u"]'), ad: svg.querySelector('[data-p="d"]'),
        pa: svg.querySelector('.f16-kp-pa'), alan: svg.querySelector('.f16-kp-alan'), egri: svg.querySelector('.f16-kp-egri'), nok: svg.querySelector('.f16-kp-nok'), sonPa: null };
    });
    const genis = (r, tt) => {
      const pa = paT(r, tt);
      const wA = 9 * clamp((pa - r.PA) / 15, 0, 1), wV = 9 * clamp((r.pv - r.PA) / 15, 0, 1);
      // venöz uca doğru daralma (sıkışma noktası venöz uçta)
      return (s) => Math.max(0.5, wA + (wV - wA) * s * s);
    };
    const xW = (w, x) => (x <= X0 ? 9 : x >= X1 ? 9 : w((x - X0) / (X1 - X0)));
    const satirCiz = (S, tt, te) => {
      const { r } = S, w = genis(r, tt), N = 27, ust = [], alt = [], iu = [], id = [];
      for (let i = 0; i < N; i++) {
        const s = i / (N - 1), x = X0 + s * (X1 - X0), wi = w(s);
        ust.push([x, YC - wi]); alt.push([x, YC + wi]);
        if (x >= X0 + 2 && x <= X1 - 2) { iu.push([x, YC - wi - 2]); id.push([x, YC + wi + 2]); }
      }
      const xa = X0 + 2, xb = X1 - 2, yi = (arr, x) => arr.reduce((b, p) => (Math.abs(p[0] - x) < Math.abs(b[0] - x) ? p : b))[1];
      S.kap.setAttribute('d', yol(ust) + ' ' + yol(alt.slice().reverse()).replace('M', 'L') + ' Z');
      S.duv.setAttribute('d', yol(ust) + ' ' + yol(alt));
      const ru = iu.slice().reverse(), rd = id.slice().reverse();
      S.au.setAttribute('d', `M${xa} ${yi(iu, xa).toFixed(1)} L${xa} 36 Q${xa} 24 ${xa + 12} 24 L${xb - 12} 24 Q${xb} 24 ${xb} 36 L${xb} ${yi(iu, xb).toFixed(1)} ` + yol(ru).replace('M', 'L') + ' Z');
      S.ad.setAttribute('d', `M${xa} ${yi(id, xa).toFixed(1)} L${xa} 100 Q${xa} 112 ${xa + 12} 112 L${xb - 12} 112 Q${xb} 112 ${xb} 100 L${xb} ${yi(id, xb).toFixed(1)} ` + yol(rd).replace('M', 'L') + ' Z');
      S.rbc.forEach((c, i) => {
        const x = S.pos[i];
        let y = YC;
        if (r.z === 1 && x < X0) y = i % 2 ? 72 : 64;
        const rr = clamp(0.4 * xW(w, x) + 0.4, 1.3, 3.5);
        c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y); c.setAttribute('r', rr.toFixed(2));
        c.setAttribute('opacity', x < B0 + 6 ? clamp((x - B0) / 6, 0, 1).toFixed(2) : x > B1 - 6 ? clamp((B1 - x) / 6, 0, 1).toFixed(2) : 1);
      });
      const pa = Math.round(paT(r, tt));
      if (pa !== S.sonPa) { S.pa.textContent = 'Pa ' + tam(pa); S.sonPa = pa; }
      // akım şeridi: son iki döngü (te − 2T … te)
      const M = 97, pts = [];
      for (let i = 0; i < M; i++) { const f = i / (M - 1), q = qT(r, te - 2 * T + f * 2 * T); pts.push([SX0 + f * (SX1 - SX0), SY0 - Math.min(q, 30) * SK]); }
      const d = yol(pts);
      S.egri.setAttribute('d', d);
      S.alan.setAttribute('d', d + ` L${SX1} ${SY0} L${SX0} ${SY0} Z`);
      S.nok.setAttribute('cy', pts[M - 1][1].toFixed(1));
    };
    let sonAn = '', sonFaz = '';
    const ciz = () => {
      const te = RM ? 2 * T : t;
      R.forEach((S) => satirCiz(S, t, te));
      const sis = faz(t) < SIS, fz = RM ? '' : sis ? 'sistol' : 'diyastol';
      if (fz !== sonFaz) { fazT.textContent = fz; fazT.classList.toggle('on', sis); sonFaz = fz; }
      const S = R.find((x) => x.r.z === zon), an = `${RM ? 'sistol tepesi' : fz} · Pa ${tam(paT(S.r, t))} · akım ${tam(qT(S.r, t))}`;
      if (an !== sonAn) { o('an').textContent = an; sonAn = an; }
    };
    const sec = (z) => {
      zon = z; basSec(el, 'z', z);
      R.forEach((S) => S.svg.classList.toggle('on', S.r.z === z));
      const r = SAT.find((x) => x.z === z);
      o('ad').textContent = r.ad; o('sira').textContent = r.sira; o('bel').textContent = r.bel; o('bic').textContent = r.bic;
      sonAn = '';
      if (ilk) ilk = false; else cap.yaz(CAP[z]);
      ciz();
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-z]'); if (b) { sec(+b.dataset.z); return; }
      const s = e.target.closest('.f16-kp-satir'); if (s) { sec(+s.dataset.z); return; }
      if (e.target.closest('[data-a="oynat"]')) { run = !run; oyn.textContent = run ? 'Duraklat' : 'Oynat'; }
    });
    if (RM) oyn.hidden = true;
    sec(3);
    return ticker(el, (dt) => {
      if (!run) return;
      t += dt;
      R.forEach((S) => {
        const v = qT(S.r, t) * 4;
        if (v > 0) S.pos = S.pos.map((x) => { let n = x + v * dt; if (n > B1) n -= B1 - B0; return n; });
      });
      ciz();
    });
  };

  /* ---------- 2 · Hangi zon? Üç basınçtan zonu bulun ---------- */
  VIZ.f16_zonbul = (el) => {
    const ORN = [
      ['Sağlıklı, spontan soluyan kişi · akciğer tabanı', 30, 0, 12, 3, '<b>Zon 3: Pa &gt; Pv &gt; PA.</b> Alveoler basınç iki damar basıncının da altında: kapiller açık, akımı Pa − Pv belirler ve akım süreklidir. [[K1 s. 71]]'],
      ['Sağlıklı, spontan soluyan kişi · apekse yakın', 12, 0, -3, 2, '<b>Zon 2: Pa &gt; PA &gt; Pv.</b> Alveoler basınç venöz basıncın üstünde: kapillerin venöz ucu sıkışır, akımı Pa − PA belirler. [[K1 s. 71]]'],
      ['Pozitif basınçlı ventilasyon · apeks', 8, 15, -6, 1, '<b>Zon 1: PA &gt; Pa &gt; Pv.</b> Alveoler basınç sistolik Pa\'yı da aşıyor: kapiller kapalı, perfüzyon yok; bu alveollere giden ventilasyon boşa gider. [[K1 s. 71–72]]'],
      ['PEEP uygulanan hasta · hilus düzeyi', 20, 10, 7, 2, '<b>Zon 2: Pa &gt; PA &gt; Pv.</b> PEEP alveoler basıncı venöz basıncın üstüne çıkardı; aynı bölge spontan solunumda (PA ≈ 0) zon 3 olurdu. [[K1 s. 71–72]]'],
      ['Hemorajik şok, pozitif basınçlı ventilasyon · üst bölge', 11, 12, 3, 1, '<b>Zon 1: PA &gt; Pa &gt; Pv.</b> Pulmoner arter basıncı düşük olduğunda alveoler basınç onu aşabilir. [[K1 s. 72]]'],
      ['Pozitif basınçlı ventilasyon · akciğer tabanı', 44, 15, 17, 3, '<b>Zon 3: Pa &gt; Pv &gt; PA.</b> Tabanda damar basınçları hidrostatik olarak yüksektir; aynı alveoler basınç burada kapilleri sıkıştıramaz. [[K1 s. 68, 71]]'],
    ];
    const SONUC = (x) => `<b>6 örnekten ${x} doğru.</b> Kural: PA &lt; Pv ise zon 3; Pv ≤ PA &lt; sistolik Pa ise zon 2; PA ≥ sistolik Pa ise zon 1. [[K1 s. 71]]`;
    const Y = (v) => 182 - (v + 10) * (160 / 60), Y0 = Y(0), BX = [140, 250, 360], BW = 56;
    const BAR = [['Pa', 'sistolik', 'pa'], ['PA', 'alveoler', 'alv'], ['Pv', 'venöz', 'pv']];
    const cap = aciklama(el);
    let i = 0, dogru = 0, cevap = null, sonucta = false, cur = [0, 0, 0], iptal = () => {};
    el.innerHTML = `<div class="f16-zb"><div class="f16-zb-sol"><div class="f16-zb-ust"><span data-o="no"></span><span data-o="puan"></span></div>
      <p class="f16-zb-bag" data-o="bag"></p>
      <svg class="f16-svg f16-zb-svg" viewBox="0 0 400 228" role="img" aria-label="Üç basınç çubuğu: sistolik pulmoner arter basıncı, alveoler basınç ve pulmoner venöz basınç">
        <text class="f16-t" x="8" y="13">cmH₂O</text>
        ${[-10, 10, 20, 30, 40, 50].map((v) => `<line class="f16-grid" x1="86" x2="396" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}"/><text class="f16-t" x="78" y="${(Y(v) + 4).toFixed(1)}" text-anchor="end">${tam(v)}</text>`).join('')}
        <line class="f16-zb-sifir" x1="86" x2="396" y1="${Y0.toFixed(1)}" y2="${Y0.toFixed(1)}"/>
        <text class="f16-v" x="78" y="${(Y0 + 4).toFixed(1)}" text-anchor="end">0</text>
        <text class="f16-t" x="64" y="${(Y0 + 4).toFixed(1)}" text-anchor="end">atmosfer</text>
        ${BAR.map(([a, b, c], k) => `<rect class="f16-zb-bar f16-zb-${c}" x="${BX[k] - BW / 2}" width="${BW}" rx="3"/>
          <text class="f16-v f16-zb-val f16-zb-v${c}" x="${BX[k]}" text-anchor="middle"></text>
          <text class="f16-lb f16-zb-ad" x="${BX[k]}" y="206" text-anchor="middle">${a}</text>
          <text class="f16-t" x="${BX[k]}" y="221" text-anchor="middle">${b}</text>`).join('')}
      </svg></div>
      <div class="f16-zb-sag"><p class="f16-zb-soru">Bu bölge hangi zonda?</p>
      <div class="f16-zb-sec" role="group" aria-label="Cevabınız">${[1, 2, 3].map((z) => `<button type="button" data-z="${z}"><b>Zon ${z}</b><span></span></button>`).join('')}</div>
      <div class="f16-zb-alt"><span class="f16-zb-sonuc" data-o="sonuc" aria-live="polite"></span><button type="button" class="btn" data-a="sonraki" disabled>Sonraki örnek</button><button type="button" class="btn ghost" data-a="bastan" hidden>Baştan</button></div></div></div>`;
    const $ = (s) => el.querySelector(s), o = (k) => el.querySelector(`[data-o="${k}"]`);
    const bars = [...el.querySelectorAll('.f16-zb-bar')], vals = [...el.querySelectorAll('.f16-zb-val')], btns = [...el.querySelectorAll('.f16-zb-sec button')];
    const sonraki = $('[data-a="sonraki"]'), bastan = $('[data-a="bastan"]');
    const barCiz = (v) => {
      v.forEach((x, k) => {
        const y = Y(x), top = Math.min(y, Y0), h = Math.max(2, Math.abs(y - Y0));
        bars[k].setAttribute('y', (x >= 0 ? Math.min(top, Y0 - 2) : Y0).toFixed(1)); bars[k].setAttribute('height', h.toFixed(1));
        vals[k].setAttribute('y', (x >= 0 ? Math.min(y, Y0) - 6 : y + 15).toFixed(1));
        vals[k].textContent = tam(x);
      });
    };
    const goster = () => {
      const [b, pa, PA, pv] = ORN[i];
      o('no').textContent = `Örnek ${i + 1}/6`; o('puan').textContent = `Doğru: ${dogru}`;
      o('bag').textContent = b;
      btns.forEach((x) => { x.disabled = false; x.className = ''; x.querySelector('span').textContent = ''; });
      sonraki.disabled = true; sonraki.hidden = false; sonraki.textContent = i === 5 ? 'Sonucu göster' : 'Sonraki örnek';
      bastan.hidden = true; o('sonuc').textContent = '';
      cap.geri();
      const bas = cur.slice(), hed = [pa, PA, pv];
      iptal(); iptal = gecis(300, (f) => { cur = bas.map((x, k) => lerp(x, hed[k], f)); barCiz(cur); }, () => { cur = hed; barCiz(cur); });
      el.querySelector('.f16-zb-svg').setAttribute('aria-label', `Örnek ${i + 1}: sistolik Pa ${tam(pa)}, alveoler basınç ${tam(PA)}, Pv ${tam(pv)} cmH₂O`);
    };
    const cevapla = (z) => {
      if (cevap !== null || sonucta) return;
      cevap = z;
      const [, , , , d, n] = ORN[i];
      if (z === d) dogru++;
      btns.forEach((x) => {
        const bz = +x.dataset.z; x.disabled = true;
        if (bz === d) { x.className = 'dogru'; x.querySelector('span').textContent = 'doğru'; }
        else if (bz === z) { x.className = 'yanlis'; x.querySelector('span').textContent = 'sizin cevabınız'; }
      });
      o('puan').textContent = `Doğru: ${dogru}`;
      cap.yaz((z === d ? '' : `Doğru cevap zon ${d}. `) + n);
      sonraki.disabled = false;
    };
    const sonucGoster = () => {
      sonucta = true;
      o('no').textContent = 'Sonuç'; o('sonuc').textContent = `Sonuç: ${dogru}/6`;
      sonraki.hidden = true; bastan.hidden = false;
      cap.yaz(SONUC(dogru));
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('.f16-zb-sec button'); if (b) { cevapla(+b.dataset.z); return; }
      if (e.target.closest('[data-a="sonraki"]')) { if (i === 5) sonucGoster(); else { i++; cevap = null; goster(); } return; }
      if (e.target.closest('[data-a="bastan"]')) { i = 0; dogru = 0; cevap = null; sonucta = false; goster(); }
    });
    goster();
    return () => iptal();
  };

  /* ---------- 3 · Zon haritası: basınçları değiştirin, sınırlar kaysın ---------- */
  VIZ.f16_zonlar = (el) => {
    const HAZ = {
      normal: { ad: 'Normal', PA: 0, M: 15, L: 5 },
      ppv: { ad: 'PPV', PA: 15, M: 15, L: 5 },
      sok: { ad: 'Hemorajik şok', PA: 0, M: 5, L: 2 },
      sokppv: { ad: 'Şok + PPV', PA: 10, M: 5, L: 2 },
      egz: { ad: 'Egzersiz', PA: 0, M: 22, L: 8 },
    };
    const CAP = {
      ppv: '<b>Pozitif basınçlı ventilasyon.</b> Alveoler basınç 15 cmH₂O\'ya çıkınca akciğerin büyük bölümünde venöz basıncı aşar: zon 2 aşağı doğru genişler (%77), zon 3 tabanda %23\'e iner. Alveoler basıncı kaydırıcıyla yaklaşık 20 cmH₂O\'ya çıkarın: apekste zon 1 belirir. Akut ağır astımdaki yüksek intrinsik PEEP de alveoler basıncı aynı yönde artırır. [[K1 s. 71–72]]',
      sok: '<b>Hemorajik şok.</b> Ortalama pulmoner arter basıncı 5 mmHg\'ya düşünce normal alveoler basınç bile apekste sistolik Pa\'yı aşar: üstte zon 1 belirir (%12); sol atriyum basıncı da düştüğünden (modelde 2 mmHg) zon 2 aşağı kayar. [[K1 s. 72]]',
      sokppv: '<b>Şok + pozitif basınçlı ventilasyon.</b> İki etken birleşince zon 1 hilus düzeyine kadar iner (%46): akciğerin neredeyse yarısı ventile edilip perfüze edilmez, alveoler ölü boşluk büyür ve ventilasyon boşa gider. [[K1 s. 72]]',
      egz: '<b>Egzersiz.</b> Kalp debisiyle pulmoner arter basıncı yükselir; hidrostatik farkın göreli etkisi azalır ve kan akciğere daha eşit dağılır: kesintili akım kalkar; modelde sol atriyum basıncı da 8 mmHg\'ya çıktığından zon 3 yukarı genişler (%86). [[K1 s. 68]]',
      el: (m) => `<b>Sizin ayarınız.</b> Zon 1 %${m.z1}, zon 2 %${m.z2} (kesintili kısım %${m.zi}), zon 3 %${m.z3}. Alveoler basınç arttıkça sınırlar, pulmoner arter basıncı düştükçe zon 1 ve kesintili akım sınırları aşağı iner; modelde sol atriyum basıncını artırmak zon 3'ü yukarı genişletir. [[K1 s. 71–72]]`,
    };
    const cap = aciklama(el);
    const GX0 = 120, GX1 = 392, GY0 = 30, GY1 = 370;
    const Y = (h) => 200 - h * (340 / 30), X = (q) => GX0 + (q + 20) * 3.4, Hy = (y) => (200 - y) / (340 / 30);
    let p = { PA: 0, M: 15, L: 5 }, hp = 12, haz = 'normal', iptal = () => {}, surukle = null;
    const lmax = (M) => Math.floor((M * 8) / 15);
    const model = (q) => {
      const sys0 = ((q.M * 25) / 15) * K, dia0 = ((q.M * 8) / 15) * K, mean0 = q.M * K, pv0 = q.L * K;
      const h12 = sys0 - q.PA, h23 = pv0 - q.PA, hInt = dia0 - q.PA, c = (v) => clamp(v, -15, 15);
      const a12 = c(h12), a23 = c(h23), aInt = c(hInt);
      const L1 = 15 - a12, L2 = a12 - a23, Li = Math.max(0, a12 - Math.max(aInt, a23)), L3 = a23 + 15;
      const z1 = Math.round((L1 / 30) * 100), z2 = Math.round((L2 / 30) * 100), z3 = 100 - z1 - z2, zi = Math.round((Li / 30) * 100);
      return { sys0, dia0, mean0, pv0, PA: q.PA, h12, h23, hInt, a12, a23, aInt, L1, L2, Li, L3, z1, z2, z3, zi };
    };
    const zonH = (m, h) => {
      const sys = m.sys0 - h, dia = m.dia0 - h, pv = m.pv0 - h;
      if (m.PA >= sys) return { z: 1, sys, dia, pv };
      if (m.PA >= pv) return { z: 2, kes: m.PA >= dia, sys, dia, pv };
      return { z: 3, sys, dia, pv };
    };
    const rng = (k, ad, min, max, v, birim) => `<label class="f16-rng"><span>${ad} <b data-o="r${k}"></b></span><input type="range" min="${min}" max="${max}" step="1" value="${v}" data-r="${k}" aria-label="${ad}${birim ? ' (' + birim + ')' : ''}"></label>`;
    el.innerHTML = `<div class="f16-ust">${segHtml('Hazır durumlar', 'h', Object.entries(HAZ).map(([k, v]) => [k, v.ad]), 'normal')}</div>
      <div class="f16-zh">
        <div class="f16-zh-sol">
          <svg class="f16-svg f16-zh-svg" viewBox="0 0 400 408" role="img" aria-label="Dik akciğerde yüksekliğe göre pulmoner arter, venöz ve alveoler basınç çizgileri ve West zonları">
            <defs>
              <clipPath id="f16-akc"><path d="${akcYol(6, 84, GY0, GY1)}"/></clipPath>
              <clipPath id="f16-zclip"><rect x="${GX0}" y="${GY0}" width="${GX1 - GX0}" height="${GY1 - GY0}"/></clipPath>
              <pattern id="f16-tar" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" style="stroke:var(--warn)" stroke-width="2" opacity=".5"/></pattern>
            </defs>
            <g clip-path="url(#f16-akc)"><g class="f16-zh-bant" data-yer="akc"></g></g>
            <path class="f16-zh-akc" d="${akcYol(6, 84, GY0, GY1)}"/>
            <circle class="f16-zh-hil" cx="76" cy="200" r="3.5"/>
            <text class="f16-t f16-hl" x="69" y="204" text-anchor="end">hilus</text>
            <text class="f16-t" x="45" y="22" text-anchor="middle">apeks</text>
            <text class="f16-t" x="45" y="389" text-anchor="middle">taban</text>
            <text class="f16-t" x="114" y="22" text-anchor="end">cm</text>
            ${[15, 10, 5, 0, -5, -10, -15].map((h) => `<line class="f16-tik" x1="${GX0 - 5}" x2="${GX0}" y1="${Y(h).toFixed(1)}" y2="${Y(h).toFixed(1)}"/><text class="f16-t${h === 0 ? ' f16-vk' : ''}" x="${GX0 - 7}" y="${(Y(h) + 4).toFixed(1)}" text-anchor="end">${yuk(h)}</text>`).join('')}
            <g clip-path="url(#f16-zclip)">
              <g class="f16-zh-bant" data-yer="graf"></g>
              ${[-10, 0, 10, 20, 30, 40, 50].map((q) => `<line class="f16-grid${q === 0 ? ' sifir' : ''}" x1="${X(q)}" x2="${X(q)}" y1="${GY0}" y2="${GY1}"/>`).join('')}
              <polygon class="f16-zh-paband"/>
              <line class="f16-zh-paken" data-l="sys"/><line class="f16-zh-paken" data-l="dia"/>
              <line class="f16-zh-pam" data-l="mean"/>
              <line class="f16-zh-pv" data-l="pv"/>
              <line class="f16-zh-alv" data-l="PA" y1="${GY0}" y2="${GY1}"/>
              <g class="f16-zh-sinir"></g>
            </g>
            <rect class="f16-zh-cer" x="${GX0}" y="${GY0}" width="${GX1 - GX0}" height="${GY1 - GY0}"/>
            <g class="f16-zh-bl"></g>
            <g class="f16-zh-sl"></g>
            <text class="f16-v f16-zh-lpa" y="24" text-anchor="middle">Pa</text>
            <text class="f16-v f16-zh-lpv" y="24" text-anchor="middle">Pv</text>
            <text class="f16-v f16-zh-lal f16-hl" y="363" text-anchor="end">PA</text>
            ${[-20, 0, 20, 40, 60].map((q) => `<line class="f16-tik" x1="${X(q)}" x2="${X(q)}" y1="${GY1}" y2="${GY1 + 5}"/><text class="f16-t" x="${X(q)}" y="${GY1 + 17}" text-anchor="middle">${tam(q)}</text>`).join('')}
            <text class="f16-t" x="${(GX0 + GX1) / 2}" y="${GY1 + 33}" text-anchor="middle">basınç (cmH₂O)</text>
            <g class="f16-zh-ins">
              <line class="f16-zh-insl" x1="6" x2="${GX1}"/>
              <g class="f16-zh-insn"></g>
              <circle class="f16-zh-tut-alan" cx="${GX0}" r="16"/>
              <circle class="f16-zh-tut" cx="${GX0}" r="7"/>
            </g>
          </svg>
          <div class="f16-lej"><span style="--k:var(--crit)"><i class="bant"></i>Pa: sistolik–diyastolik bant, kalın çizgi ortalama</span><span style="--k:var(--c-basic)"><i></i>Pv: pulmoner venöz</span><span style="--k:var(--ink)"><i class="kesik"></i>PA: alveoler</span></div>
        </div>
        <div class="f16-zh-pan">
          ${rng('PA', 'Alveoler basınç (PA):', 0, 30, 0, 'cmH₂O')}
          <div>${rng('M', 'Ortalama pulmoner arter basıncı:', 4, 25, 15, 'mmHg')}<p class="f16-rng-alt" data-o="sd"></p></div>
          ${rng('L', 'Sol atriyum basıncı (hilusta Pv):', 0, 8, 5, 'mmHg')}
          ${rng('H', 'İncelenen yükseklik (hilusa göre):', -15, 15, 12, 'cm')}
          <dl class="f16-oku f16-zh-oku">
            <div style="--k:var(--muted)"><dt><i></i>Zon 1</dt><dd data-o="z1"></dd></div>
            <div style="--k:var(--warn)"><dt><i></i>Zon 2</dt><dd data-o="z2"></dd></div>
            <div style="--k:var(--ok)"><dt><i></i>Zon 3</dt><dd data-o="z3"></dd></div>
          </dl>
          <p class="f16-zh-insp" data-o="ins" aria-live="polite"></p>
        </div>
      </div>`;
    const $ = (s) => el.querySelector(s), o = (k) => el.querySelector(`[data-o="${k}"]`);
    const svg = $('.f16-zh-svg'), insG = $('.f16-zh-ins'), insN = $('.f16-zh-insn'), sinG = $('.f16-zh-sinir'), blG = $('.f16-zh-bl'), slG = $('.f16-zh-sl');
    const inp = (k) => el.querySelector(`[data-r="${k}"]`);
    const bantlar = [...el.querySelectorAll('.f16-zh-bant')].map((g) => {
      const gx = g.dataset.yer === 'akc' ? [0, 92] : [GX0, GX1];
      return ['z1', 'z2', 'tar', 'z3'].reduce((a, k) => { a[k] = mk('rect', { x: gx[0], width: gx[1] - gx[0], class: 'f16-zh-' + k }, g); return a; }, {});
    });
    const L = (k) => svg.querySelector(`[data-l="${k}"]`);
    const cizgi = (e, a, b) => { e.setAttribute('x1', X(a).toFixed(1)); e.setAttribute('y1', GY0); e.setAttribute('x2', X(b).toFixed(1)); e.setAttribute('y2', GY1); };
    const ciz = () => {
      const m = model(p);
      // bantlar
      const yb = (h) => Y(h);
      bantlar.forEach((B) => {
        const set = (r, h1, h0) => { const y1 = yb(h1), y0 = yb(h0); r.setAttribute('y', y1.toFixed(1)); r.setAttribute('height', Math.max(0, y0 - y1).toFixed(1)); };
        set(B.z1, 15, m.a12); set(B.z2, m.a12, m.a23); set(B.tar, m.a12, Math.max(m.aInt, m.a23)); set(B.z3, m.a23, -15);
      });
      // basınç çizgileri: p(h) = p0 − h; apeks (h +15) y 30, taban (h −15) y 370
      L('sys') && cizgi(L('sys'), m.sys0 - 15, m.sys0 + 15);
      cizgi(L('dia'), m.dia0 - 15, m.dia0 + 15);
      cizgi(L('mean'), m.mean0 - 15, m.mean0 + 15);
      cizgi(L('pv'), m.pv0 - 15, m.pv0 + 15);
      $('.f16-zh-paband').setAttribute('points', [[X(m.dia0 - 15), GY0], [X(m.sys0 - 15), GY0], [X(m.sys0 + 15), GY1], [X(m.dia0 + 15), GY1]].map((q) => q.map((v) => v.toFixed(1)).join(',')).join(' '));
      const xa = X(m.PA); L('PA').setAttribute('x1', xa.toFixed(1)); L('PA').setAttribute('x2', xa.toFixed(1));
      // çizgi etiketleri (üstte Pa ve Pv; çakışırsa aralarını aç)
      let xpa = X(m.mean0 - 15), xpv = X(m.pv0 - 15);
      if (xpa - xpv < 22) { const c = (xpa + xpv) / 2; xpa = c + 11; xpv = c - 11; }
      $('.f16-zh-lpa').setAttribute('x', xpa.toFixed(1)); $('.f16-zh-lpv').setAttribute('x', Math.max(GX0 + 6, xpv).toFixed(1));
      $('.f16-zh-lal').setAttribute('x', (xa - 4).toFixed(1));
      // sınır çizgileri ve etiketleri
      sinG.textContent = ''; slG.textContent = '';
      const SIN = [[m.h12, 'PA = sistolik Pa', ''], [m.hInt, 'PA = diyastolik Pa', ' acik'], [m.h23, 'PA = Pv', '']]
        .filter(([h]) => h < 15 && h > -15).map(([h, t, c]) => ({ y: Y(h), t, c }));
      SIN.forEach((s) => mk('line', { class: 'f16-zh-sin' + s.c, x1: GX0, x2: GX1, y1: s.y.toFixed(1), y2: s.y.toFixed(1) }, sinG));
      // etiket sınır çizgisinin üstünde; inceleme çizgisine ya da bir önceki etikete binerse çizginin altına iner
      const yIns = Y(hp), ly = [];
      SIN.slice().sort((a, b) => a.y - b.y).forEach((s, k) => {
        let y = Math.max(GY0 + 11, s.y - 4);
        const carp = (v) => (yIns > v - 12 && yIns < v + 3) || (k > 0 && v - ly[k - 1] < 13);
        if (carp(y)) y = s.y + 13;
        if (carp(y)) y = Math.max(y, ly[k - 1] + 13, yIns + 13);
        ly[k] = y;
        const tx = mk('text', { class: 'f16-t f16-hl f16-zh-sint' + s.c, x: GX0 + 5, y: y.toFixed(1) }, slG); tx.textContent = s.t;
      });
      // bant etiketleri (sağ kenar)
      blG.textContent = '';
      const bant = (h1, h0, t, c) => {
        const y1 = Y(h1), y0 = Y(h0); if (y0 - y1 < 18) return;
        let y = (y1 + y0) / 2 + 4;
        if (yIns > y - 13 && yIns < y + 4) { // inceleme çizgisine binmesin
          if (yIns + 15 <= y0 - 2) y = yIns + 15; else if (yIns - 5 >= y1 + 12) y = yIns - 5;
        }
        const tx = mk('text', { class: 'f16-lb f16-zh-blt f16-hlz' + c, x: GX1 - 5, y: y.toFixed(1), 'text-anchor': 'end' }, blG); tx.textContent = t;
      };
      bant(15, m.a12, 'Zon 1 · akım yok', 1);
      const ki = Math.max(m.aInt, m.a23), kesH = m.a12 - ki, surH = ki - m.a23;
      if (Y(ki) - Y(m.a12) >= 18 && Y(m.a23) - Y(ki) >= 18) { bant(m.a12, ki, 'yalnız sistolde', 2); bant(ki, m.a23, 'Zon 2', 2); }
      else if (Y(ki) - Y(m.a12) >= 18 && kesH > 0 && surH * 11.33 < 18) bant(m.a12, m.a23, 'Zon 2 · yalnız sistolde', 2);
      else bant(m.a12, m.a23, 'Zon 2', 2);
      bant(m.a23, -15, 'Zon 3 · sürekli', 3);
      // inceleme çizgisi
      const yi = Y(hp), zi = zonH(m, hp);
      insG.setAttribute('transform', `translate(0 ${yi.toFixed(1)})`);
      insN.textContent = '';
      [[zi.sys, 'var(--crit)'], [zi.dia, 'var(--crit)'], [zi.pv, 'var(--c-basic)'], [m.PA, 'var(--ink)']].forEach(([v, c]) => {
        const x = X(v); if (x < GX0 || x > GX1) return;
        mk('circle', { cx: x.toFixed(1), cy: 0, r: 3.6, class: 'f16-zh-insd', style: `fill:${c}` }, insN);
      });
      // okuma paneli
      o('z1').textContent = `${fmt(m.L1)} cm (%${m.z1})`;
      o('z2').textContent = `${fmt(m.L2)} cm (%${m.z2}) · kesintili ${fmt(m.Li)} cm`;
      o('z3').textContent = `${fmt(m.L3)} cm (%${m.z3})`;
      const son = zi.z === 1 ? 'Zon 1: kapiller kapalı, akım yok.' : zi.z === 3 ? 'Zon 3: akımı Pa − Pv belirler, sürekli.'
        : zi.kes ? 'Zon 2, kesintili: akımı Pa − PA belirler, kan yalnız sistolde geçer.' : 'Zon 2: akımı Pa − PA belirler, akım sürekli ama venöz uç sıkışık.';
      o('ins').innerHTML = `<b>${yuk(hp)} cm:</b> Pa ${tam(zi.sys)}/${tam(zi.dia)} · Pv ${tam(zi.pv)} · PA ${tam(m.PA)} cmH₂O → <span class="f16-zt z${zi.z}">${son}</span>`;
      return m;
    };
    const yazDeg = () => {
      o('rPA').textContent = `${tam(p.PA)} cmH₂O`;
      o('rM').textContent = `${tam(p.M)} mmHg`;
      o('rL').textContent = `${tam(p.L)} mmHg`;
      o('rH').textContent = `${yuk(hp)} cm`;
      o('sd').textContent = `sistolik/diyastolik ≈ ${Math.round((p.M * 25) / 15)}/${Math.round((p.M * 8) / 15)} mmHg`;
      inp('L').max = lmax(p.M);
    };
    const capYaz = (m) => { if (haz === 'normal') cap.geri(); else if (haz) cap.yaz(CAP[haz]); else cap.yaz(CAP.el(m)); };
    const hazir = (k) => {
      haz = k; basSec(el, 'h', k);
      const H = HAZ[k], bas = { ...p };
      iptal();
      iptal = gecis(400, (f) => { p = { PA: lerp(bas.PA, H.PA, f), M: lerp(bas.M, H.M, f), L: lerp(bas.L, H.L, f) }; ciz(); },
        () => { p = { PA: H.PA, M: H.M, L: H.L }; inp('M').value = H.M; inp('L').max = lmax(H.M); inp('L').value = H.L; inp('PA').value = H.PA; yazDeg(); capYaz(ciz()); });
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('button[data-h]'); if (b) hazir(b.dataset.h); });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      const v = +r.value, k = r.dataset.r;
      if (k === 'H') { hp = v; yazDeg(); ciz(); return; }
      iptal(); // yarım kalan hazır durum geçişi durur; model kaydırıcılardaki değerleri alır
      if (k === 'M') { inp('L').max = lmax(v); if (+inp('L').value > lmax(v)) inp('L').value = lmax(v); }
      p = { PA: +inp('PA').value, M: +inp('M').value, L: +inp('L').value };
      haz = null; basSec(el, 'h', '');
      yazDeg(); capYaz(ciz());
    });
    // tutamaç sürükleme (yalnız tutamaçta touch-action:none)
    const yYap = (ev) => { const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY; const c = svg.getScreenCTM(); return c ? pt.matrixTransform(c.inverse()).y : null; };
    const hAyar = (ev) => { const y = yYap(ev); if (y === null) return; const h = clamp(Math.round(Hy(y)), -15, 15); if (h !== hp) { hp = h; inp('H').value = h; yazDeg(); ciz(); } };
    const tut = [$('.f16-zh-tut'), $('.f16-zh-tut-alan')];
    const asagi = (ev) => { surukle = ev.pointerId; try { ev.target.setPointerCapture(ev.pointerId); } catch (_) { /* yok */ } ev.preventDefault(); };
    const hareket = (ev) => { if (surukle === ev.pointerId) hAyar(ev); };
    const birak = (ev) => { if (surukle === ev.pointerId) surukle = null; };
    tut.forEach((t) => { t.addEventListener('pointerdown', asagi); t.addEventListener('pointermove', hareket); t.addEventListener('pointerup', birak); t.addEventListener('pointercancel', birak); });
    // grafiğe dokunmak / tıklamak da inceleme yüksekliğini taşır
    $('.f16-zh-cer').addEventListener('click', hAyar);
    yazDeg(); ciz();
    return () => iptal();
  };

  /* ---------- 4 · Kateter ucu hangi zonda? PEEP testi ---------- */
  VIZ.f16_pac = (el) => {
    const UC = {
      alt: { ad: 'Alt lob', h: -10, yer: 'alt lob, sol atriyumun 10 cm altı' },
      sa: { ad: 'Sol atriyum düzeyi', h: 0, yer: 'sol atriyum düzeyi' },
      ust: { ad: 'Üst lob', h: 10, yer: 'üst lob, sol atriyumun 10 cm üstü' },
    };
    const CAP = {
      'alt-5': '<b>Uç alt lobda, zon 3\'te.</b> Uçla sol atriyum arasındaki kapillerler açık; durağan kan sütunu kesintisiz ve PCWP sol atriyum basıncını (5 mmHg) gösteriyor. Şimdi PEEP\'i 10 cmH₂O artırın. [[K1 s. 72]]',
      'alt-15': '<b>Değişim %25\'in altında.</b> Tabanda damar basınçları hidrostatik olarak yüksek olduğundan 15 cmH₂O\'luk alveoler basınç kapillerleri sıkıştıramaz; uç zon 3\'te kalır ve okuma sol atriyumu yansıtmayı sürdürür. [[K1 s. 72–73]]',
      'sa-5': '<b>Uç sol atriyum düzeyinde, zon 3\'ün üst sınırına yakın.</b> PEEP 5 cmH₂O\'da venöz basınç (≈7 cmH₂O) hâlâ alveoler basıncın üstünde; okuma 5 mmHg. [[K1 s. 71–72]]',
      'sa-15': '<b>PCWP %121 arttı: test pozitif.</b> 15 cmH₂O\'luk alveoler basınç bu yükseklikte venöz basıncı aştı ve bölge zon 2\'ye döndü; kan sütunu kesildi, okuma artık alveoler basıncı (≈11 mmHg) izliyor. PEEP\'in kendisi zon 3 sınırını aşağı itti. [[K1 s. 72–73]]',
      'ust-5': '<b>Uç üst lobda, zon 2\'de.</b> Alveoler basınç venöz basıncın üstünde, aradaki kapillerler sıkışmış: kan sütunu kesik. Okuma (≈11 mmHg) sol atriyum basıncını (5 mmHg) değil alveoler basıncı yansıtıyor; PEEP artışı bunu ortaya çıkarır. [[K1 s. 72]]',
      'ust-15': '<b>PCWP %67 arttı: test pozitif.</b> Okuma PEEP artışını büyük ölçüde izledi; uç zon 3\'te değil. Kateter akımla yönlendirildiğinden ve pulmoner kan akımının çoğu zon 3\'e gittiğinden uç genellikle doğru yere yerleşir; bu konum bir istisnadır. [[K1 s. 72–73]]',
    };
    const Y = (h) => 170 - h * 10;
    const zonU = (h, peep) => (peep >= 34 - h ? 1 : peep >= 6.8 - h ? 2 : 3);
    const oku = (h, peep) => (zonU(h, peep) === 3 ? 5 : (peep + h) / K);
    const degisim = (h) => Math.round(((oku(h, 15) - oku(h, 5)) / oku(h, 5)) * 100);
    const HIL = [184, 170];
    const GOVDE = `M398 304 C360 304 330 292 300 276 C272 262 246 254 240 238 C238 206 214 172 ${HIL[0]} ${HIL[1]}`;
    const DAL = { ust: `C150 168 126 112 112 ${Y(10)}`, sa: `C160 170 136 170 112 ${Y(0)}`, alt: `C150 172 126 228 112 ${Y(-10)}` };
    // venler: üst dalda arterin altından, ortada üstünden, altta sağ altından hilusa ve sol atriyuma
    const VEN = { ust: 'C96 100 150 150 186 160 S240 164 262 164', sa: 'C100 154 150 156 186 158 S240 166 262 167', alt: 'C92 296 140 292 160 250 S186 192 262 178' };
    const KAMA = { ust: [124, 60], sa: [122, 194], alt: [124, 262] };
    const KIS = { ust: 44, sa: 206, alt: 302 };
    const SIRA = ['ust', 'sa', 'alt'];
    const cap = aciklama(el);
    let uc = 'alt', peep = 5, artti = false, iptal = () => {}, iptalK = () => {};
    el.innerHTML = `<div class="f16-ust">${segHtml('Kateter ucunun konumu', 'u', SIRA.slice().reverse().map((k) => [k, UC[k].ad]), 'alt')}<button type="button" class="btn" data-a="peep">PEEP'i 10 cmH₂O artır</button><button type="button" class="btn ghost" data-a="sifir">Sıfırla</button></div>
      <div class="f16-pc">
        <svg class="f16-svg f16-pc-svg" viewBox="0 0 400 330" role="img" aria-label="Pulmoner arter kateterinin ucu, akciğer zonları ve uçtan sol atriyuma uzanan kan sütunu">
          <defs><clipPath id="f16-pac-akc"><path d="${akcYol(46, 196, 20, 320)}"/></clipPath></defs>
          <g clip-path="url(#f16-pac-akc)">
            <rect class="f16-pc-z1" x="40" width="160"/><rect class="f16-pc-z2" x="40" width="160"/><rect class="f16-pc-z3" x="40" width="160"/>
            <line class="f16-pc-sin" x1="40" x2="200"/>
          </g>
          <path class="f16-pc-akc" d="${akcYol(46, 196, 20, 320)}"/>
          ${[10, 0, -10].map((h) => `<line class="f16-pc-duz${h === 0 ? ' sa' : ''}" x1="44" x2="${h === 0 ? 262 : 196}" y1="${Y(h)}" y2="${Y(h)}"/><text class="f16-t" x="40" y="${Y(h) + 4}" text-anchor="end">${yuk(h)} cm</text>`).join('')}
          <text class="f16-t f16-hl f16-pc-sint z2" x="49">zon 2</text><text class="f16-t f16-hl f16-pc-sint z3" x="49">zon 3</text>
          <g class="f16-pc-ven">${SIRA.map((k) => `<path data-v="${k}" d="M98 ${Y(UC[k].h)} ${VEN[k]}"/>`).join('')}</g>
          <g class="f16-pc-alvg">${SIRA.map((k) => { const y = Y(UC[k].h); return [[90, y - 12], [107, y - 14], [90, y + 12], [108, y + 13]].map(([x, yy]) => `<circle class="f16-pc-alv" cx="${x}" cy="${yy}" r="6"/>`).join(''); }).join('')}</g>
          <g class="f16-pc-kapg">${SIRA.map((k) => { const y = Y(UC[k].h); return `<path class="f16-pc-kap" d="M112 ${y} C108 ${y - 5} 102 ${y + 5} 98 ${y} M112 ${y} C108 ${y + 5} 102 ${y - 5} 98 ${y}"/>`; }).join('')}</g>
          <path class="f16-pc-art-d" d="M240 238 C238 206 214 172 ${HIL[0]} ${HIL[1]}"/>
          ${SIRA.map((k) => `<path class="f16-pc-art-d" d="M${HIL[0]} ${HIL[1]} ${DAL[k]}"/>`).join('')}
          <path class="f16-pc-art-i" d="M240 238 C238 206 214 172 ${HIL[0]} ${HIL[1]}"/>
          ${SIRA.map((k) => `<path class="f16-pc-art-i" d="M${HIL[0]} ${HIL[1]} ${DAL[k]}"/>`).join('')}
          <rect class="f16-pc-sa" x="262" y="152" width="74" height="36" rx="14"/>
          <text class="f16-lb" x="299" y="174" text-anchor="middle">sol atriyum</text>
          <rect class="f16-pc-sv" x="214" y="238" width="90" height="54" rx="16"/>
          <text class="f16-lb" x="259" y="310" text-anchor="middle">sağ ventrikül</text>
          <path class="f16-pc-sut" data-p="ven"/>
          <path class="f16-pc-sut" data-p="uc"/>
          <g class="f16-pc-kiskac"><path/><text class="f16-t f16-hl" x="108" text-anchor="end">kapiller sıkışık</text></g>
          <path class="f16-pc-kat"/>
          <circle class="f16-pc-bal" r="7"/>
          <text class="f16-lb f16-hl f16-pc-kama">kama</text>
          <text class="f16-t f16-pc-katl" x="396" y="296" text-anchor="end">kateter</text>
        </svg>
        <div class="f16-pc-pan">
          <dl class="f16-oku f16-pc-oku">
            <div><dt>PEEP</dt><dd data-o="peep"></dd></div>
            <div><dt>Uç</dt><dd data-o="yer"></dd></div>
            <div><dt>Uçtaki zon</dt><dd data-o="zon"></dd></div>
            <div><dt>Kan sütunu</dt><dd data-o="sut"></dd></div>
            <div><dt>PCWP (PEEP 5)</dt><dd data-o="o5"></dd></div>
            <div><dt>PCWP (PEEP 15)</dt><dd data-o="o15"></dd></div>
            <div><dt>Değişim</dt><dd data-o="deg"></dd></div>
          </dl>
          <p class="f16-pc-roz"><span class="tag" data-o="roz"></span></p>
        </div>
      </div>`;
    const $ = (s) => el.querySelector(s), o = (k) => el.querySelector(`[data-o="${k}"]`);
    const peepB = $('[data-a="peep"]'), kat = $('.f16-pc-kat'), bal = $('.f16-pc-bal'), kama = $('.f16-pc-kama');
    const sutV = $('[data-p="ven"]'), sutU = $('[data-p="uc"]'), kis = $('.f16-pc-kiskac'), kisP = kis.querySelector('path'), kisT = kis.querySelector('text');
    const alvC = [...el.querySelectorAll('.f16-pc-alv')];
    const ciz = (pe, hedefOku) => {
      const U = UC[uc], h = U.h, y = Y(h), z = zonU(h, pe);
      // zonlar (MPAP 15, LAP 5 mmHg; PA = PEEP)
      const h12 = clamp(34 - pe, -15, 15), h23 = clamp(6.8 - pe, -15, 15);
      const set = (s, a, b) => { const e = $(s); e.setAttribute('y', Y(a).toFixed(1)); e.setAttribute('height', Math.max(0, Y(b) - Y(a)).toFixed(1)); };
      set('.f16-pc-z1', 15, h12); set('.f16-pc-z2', h12, h23); set('.f16-pc-z3', h23, -15);
      const ys = Y(h23); $('.f16-pc-sin').setAttribute('y1', ys.toFixed(1)); $('.f16-pc-sin').setAttribute('y2', ys.toFixed(1));
      $('.f16-pc-sint.z2').setAttribute('y', (ys - 5).toFixed(1)); $('.f16-pc-sint.z3').setAttribute('y', (ys + 14).toFixed(1));
      alvC.forEach((c) => c.setAttribute('r', (6 * (1 + (0.16 * (pe - 5)) / 10)).toFixed(2)));
      // kan sütunu
      const venD = `M98 ${y} ${VEN[uc]}`;
      el.querySelectorAll('.f16-pc-ven path').forEach((v) => v.classList.toggle('on', v.dataset.v === uc));
      if (z === 3) { sutU.setAttribute('d', `M112 ${y} L98 ${y}`); sutV.setAttribute('d', venD); sutV.classList.remove('kesik'); kis.setAttribute('opacity', 0); }
      else {
        sutU.setAttribute('d', `M112 ${y} L109 ${y}`); sutV.setAttribute('d', `M101 ${y} L98 ${y} ` + VEN[uc]); sutV.classList.add('kesik');
        kis.setAttribute('opacity', 1);
        kisP.setAttribute('d', `M107 ${y - 7} V${y + 7} M102 ${y - 7} V${y + 7}`);
        kisT.setAttribute('y', KIS[uc]);
      }
      bal.setAttribute('cx', 112); bal.setAttribute('cy', y);
      kama.setAttribute('x', KAMA[uc][0]); kama.setAttribute('y', KAMA[uc][1]);
      // panel
      o('peep').textContent = `${tam(pe)} cmH₂O`;
      o('yer').textContent = U.yer;
      o('zon').innerHTML = `<span class="f16-zt z${z}">Zon ${z}</span>`;
      o('sut').textContent = z === 3 ? 'kesintisiz' : 'kesik: kapiller alveoler basınçla sıkışık';
      o('o5').textContent = `${fmt(oku(h, 5))} mmHg`;
      if (hedefOku) { o('o15').textContent = `${fmt(oku(h, pe))} mmHg`; }
    };
    const panelSon = () => {
      const h = UC[uc].h;
      if (!artti) { o('o15').textContent = '—'; o('deg').textContent = '—'; const r = o('roz'); r.className = 'tag'; r.textContent = 'PEEP\'i artırıp sınayın'; return; }
      const d = degisim(h);
      o('o15').textContent = `${fmt(oku(h, 15))} mmHg`;
      o('deg').textContent = d === 0 ? '%0' : `%${d} artış`;
      const r = o('roz');
      if (d > 25) { r.className = 'tag warn'; r.textContent = '> %25 · zon 3 değil'; } else { r.className = 'tag ok'; r.textContent = '< %25 · büyük olasılıkla zon 3'; }
    };
    const katCiz = (anim) => {
      kat.setAttribute('d', `${GOVDE} ${DAL[uc]}`);
      iptalK();
      if (!anim || RM) { kat.style.strokeDasharray = ''; kat.style.strokeDashoffset = ''; bal.style.opacity = 1; kama.style.opacity = 1; return; }
      const Lk = kat.getTotalLength ? kat.getTotalLength() : 0;
      if (!Lk) return;
      kat.style.strokeDasharray = `${Lk} ${Lk}`;
      bal.style.opacity = 0; kama.style.opacity = 0;
      iptalK = gecis(400, (f) => { kat.style.strokeDashoffset = ((1 - f) * Lk).toFixed(1); }, () => { kat.style.strokeDasharray = ''; kat.style.strokeDashoffset = ''; bal.style.opacity = 1; kama.style.opacity = 1; });
    };
    const capYaz = () => cap.yaz(CAP[`${uc}-${artti ? 15 : 5}`]);
    const ucSec = (k, anim) => {
      iptal(); uc = k; artti = false; peep = 5; basSec(el, 'u', k);
      peepB.textContent = 'PEEP\'i 10 cmH₂O artır';
      ciz(5, false); panelSon(); katCiz(anim);
      if (k === 'alt' && !anim) cap.geri(); else capYaz();
    };
    const peepDegis = () => {
      iptal();
      artti = !artti;
      const bas = peep, hed = artti ? 15 : 5;
      peepB.textContent = artti ? 'PEEP\'i geri al' : 'PEEP\'i 10 cmH₂O artır';
      if (artti) { o('deg').textContent = '…'; const r = o('roz'); r.className = 'tag'; r.textContent = 'ölçülüyor'; }
      iptal = gecis(800, (f) => { peep = lerp(bas, hed, f); ciz(peep, artti); }, () => { peep = hed; ciz(peep, artti); panelSon(); capYaz(); });
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-u]'); if (b) { ucSec(b.dataset.u, true); return; }
      if (e.target.closest('[data-a="peep"]')) { peepDegis(); return; }
      if (e.target.closest('[data-a="sifir"]')) { ucSec('alt', uc !== 'alt'); cap.geri(); }
    });
    ucSec('alt', false);
    return () => { iptal(); iptalK(); };
  };

  /* ---------- 5 · Asılı akciğer: alveol gerilmesi ve kan sütunu (durağan şema) ----------
     K1 s. 71: akciğer büyük hava yollarından asılı; taban alveolleri küçük, kompliyan, damarlara az dış basınç;
     yukarı doğru çekilerek açılır, apekste en gerilmiş. K1 s. 68: 30 cm ≈ 30 cmH₂O (22 mmHg), ortalama Pa 15 mmHg.
     Atlas notu gereği alveollere yükseklikle artan bir PA yazılmaz. */
  VIZ.f16_agirlik = (el) => {
    const AX0 = 8, AX1 = 128, AY0 = 40, AY1 = 340, YH = 190;
    // silueti çokgene çevir (alveollerin tamamen içeride kalanlarını seçmek için)
    const akcCokgen = (x0, x1, y0, y1) => {
      const P = (u, v) => [x0 + u * (x1 - x0), y0 + v * (y1 - y0)], pts = [];
      let cur = null;
      AKC.forEach(([c, ...a]) => {
        if (c === 'M') { cur = P(a[0], a[1]); pts.push(cur); }
        else if (c === 'L') { cur = P(a[0], a[1]); pts.push(cur); }
        else if (c === 'C') {
          const [b, d, e] = [P(a[0], a[1]), P(a[2], a[3]), P(a[4], a[5])], s = cur;
          for (let i = 1; i <= 16; i++) {
            const t = i / 16, m = 1 - t;
            pts.push([m * m * m * s[0] + 3 * m * m * t * b[0] + 3 * m * t * t * d[0] + t * t * t * e[0], m * m * m * s[1] + 3 * m * m * t * b[1] + 3 * m * t * t * d[1] + t * t * t * e[1]]);
          }
          cur = e;
        }
      });
      return pts;
    };
    const POLY = akcCokgen(AX0, AX1, AY0, AY1);
    const icinde = (x, y) => { let c = false; for (let i = 0, j = POLY.length - 1; i < POLY.length; j = i++) { const [xi, yi] = POLY[i], [xj, yj] = POLY[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
    const SIRALAR = [[72, 13, 'apeks'], [124, 11, 'orta'], [178, 9, 'orta'], [236, 7, 'taban'], [296, 5.5, 'taban']];
    // bir sırada dairenin tamamen içeride kalabildiği x aralığı; daireler bu aralıkta ortalanır
    const sigar = (x, y, r) => [[0, 0], [-r - 1.8, 0], [r + 1.8, 0], [0, -r - 1.8], [0, r + 1.8]].every(([dx, dy]) => icinde(x + dx, y + dy));
    const sira = (y, r) => {
      let a = null, b = null;
      for (let x = AX0; x <= AX1; x += 0.5) if (sigar(x, y, r)) { if (a === null) a = x; b = x; }
      if (a === null) return [];
      const ara = 2.6 * r, n = Math.floor((b - a) / ara) + 1, x0 = (a + b) / 2 - ((n - 1) * ara) / 2;
      return Array.from({ length: n }, (_, i) => x0 + i * ara);
    };
    const SX = SIRALAR.map(([y, r]) => sira(y, r));
    const alvHtml = SIRALAR.map(([y, r, k], si) => `<g class="f16-ag-sira${si === 0 ? ' gergin' : ''}" data-k="${k}"><rect class="f16-ag-hit" x="${AX0}" y="${y - r - 4}" width="${AX1 - AX0}" height="${2 * r + 8}"/>${SX[si].map((x) => `<circle class="f16-ag-alv" cx="${x.toFixed(1)}" cy="${y}" r="${r}"/>`).join('')}</g>`).join('');
    const apeksX = SX[0];
    const LX = 178, KX = 352, KW = 14, KY0 = 40, KY1 = 336;
    const etiket = (k, y, renk, satir, ariaAd) => `<g class="f16-ag-et" data-k="${k}" tabindex="0" role="button" aria-label="${ariaAd}">
        <rect class="f16-ag-hit" x="${LX - 18}" y="${y - 15}" width="${KX - 8 - LX + 18}" height="${satir.length * 14.5 + 8}"/>
        <rect x="${LX - 14}" y="${y - 9}" width="9" height="9" rx="2" style="fill:${renk}"/>
        ${satir.map((t, i) => `<text class="${i ? 'f16-ag-t' + (t[1] ? ' ' + t[1] : '') : 'f16-ag-lb'}" x="${LX}" y="${y + i * 14.5}">${i ? t[0] : t}</text>`).join('')}
      </g>`;
    const svgA = `<svg class="f16-svg f16-ag-a" viewBox="0 0 400 382" role="group" aria-label="Büyük hava yollarından asılı akciğer: apekste büyük, gerilmiş alveoller, tabanda küçük, kompliyan alveoller; sağda apeks–taban 30 cmH₂O'luk kan sütunu">
        <defs>
          <clipPath id="f16-agc"><path d="${akcYol(AX0, AX1, AY0, AY1)}"/></clipPath>
          <linearGradient id="f16-agk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--crit)" stop-opacity=".15"/><stop offset="1" style="stop-color:var(--crit)" stop-opacity=".75"/></linearGradient>
        </defs>
        <g clip-path="url(#f16-agc)">
          <rect class="f16-ag-z2" x="0" y="${AY0}" width="${AX1 + 4}" height="${YH - AY0}"/>
          <rect class="f16-ag-z3" x="0" y="${YH}" width="${AX1 + 4}" height="${AY1 - YH}"/>
          ${alvHtml}
        </g>
        <path class="f16-ag-akc" d="${akcYol(AX0, AX1, AY0, AY1)}"/>
        <g class="f16-ag-ok">${apeksX.map((x) => `<path d="M${x.toFixed(1)} 57 V47 M${(x - 3.5).toFixed(1)} 51 L${x.toFixed(1)} 46.5 L${(x + 3.5).toFixed(1)} 51"/>`).join('')}</g>
        <!-- askı: tavan, trakea, ana bronş -->
        <g class="f16-ag-tavan"><line x1="130" x2="162" y1="8" y2="8"/>${[134, 141, 148, 155, 162].map((x) => `<line x1="${x}" x2="${x - 5}" y1="8" y2="1"/>`).join('')}</g>
        <path class="f16-ag-hy-d" d="M146 8 V108 C146 150 132 172 116 ${YH}"/>
        <path class="f16-ag-hy-i" d="M146 9.5 V108 C146 150 132 172 116 ${YH}"/>
        ${[26, 42, 58, 74, 90].map((y) => `<line class="f16-ag-kik" x1="141" x2="151" y1="${y}" y2="${y}"/>`).join('')}
        <circle class="f16-ag-hil" cx="115" cy="${YH}" r="3.5"/>
        <text class="f16-ag-t f16-hl" x="108" y="${YH + 17}" text-anchor="end">hilus</text>
        <text class="f16-ag-t" x="160" y="25">büyük hava yollarından asılı</text>
        <!-- sıra etiketleri -->
        ${etiket('apeks', 64, 'var(--muted)', ['Apeks · en gerilmiş', ['tüm akciğerin ağırlığı;'], ['eğrinin düz kesimi'], ['zon 1 normalde yok', 'f16-ag-zon z1']], 'Apeks alveolleri: en gerilmiş, eğrinin düz kesimi')}
        ${etiket('orta', 128, 'var(--warn)', ['Yukarıya doğru', ['çekilerek açılır,'], ['kompliyans azalır']], 'Ortadaki alveoller: yukarıya doğru çekilerek açılır, kompliyans azalır')}
        ${etiket('taban', 270, 'var(--ok)', ['Taban · küçük alveol', ['az gerilmiş, kompliyan;'], ['damarlara az dış basınç']], 'Taban alveolleri: küçük, kompliyan, damarlara az dış basınç uygular')}
        <!-- hilus düzeyi: zon sınırı (kitapta hilus) -->
        <line class="f16-ag-sin" x1="${AX1 - 10}" x2="${KX - 3}" y1="${YH}" y2="${YH}"/>
        <text class="f16-ag-t f16-ag-zon z2" x="164" y="${YH - 6}">zon 2 · hilusun üstü</text>
        <text class="f16-ag-t f16-ag-zon z3" x="164" y="${YH + 15}">zon 3 · hilusun altı</text>
        <!-- kan sütunu -->
        <rect class="f16-ag-kan" x="${KX}" y="${KY0}" width="${KW}" height="${KY1 - KY0}" rx="${KW / 2}"/>
        <text class="f16-ag-t" x="${KX - 6}" y="${KY0 + 6}" text-anchor="end">apeks</text>
        <text class="f16-ag-t" x="${KX - 6}" y="${YH - 6}" text-anchor="end">hilus</text>
        <text class="f16-ag-t" x="${KX - 6}" y="${KY1}" text-anchor="end">taban</text>
        <g class="f16-ag-kok"><path d="M384 52 V322 M378.5 315 L384 322.5 L389.5 315"/></g>
        <text class="f16-ag-t f16-ag-kt" x="${KX - 6}" y="234" text-anchor="end">kan sütunu: her cm</text>
        <text class="f16-ag-t f16-ag-kt" x="${KX - 6}" y="248.5" text-anchor="end">≈ 1 cmH₂O artar</text>
        <text class="f16-ag-v" x="398" y="362" text-anchor="end">apeks–taban 30 cm ≈ 30 cmH₂O (22 mmHg)</text>
        <text class="f16-ag-v" x="398" y="378" text-anchor="end">ortalama Pa yalnız 15 mmHg</text>
      </svg>`;
    // B · basınç–hacim eğrisi (şematik, sayı yok)
    const BZ = [[50, 182], [110, 178], [130, 96], [200, 70], [250, 52], [320, 46], [380, 44]];
    const bez = (s, t) => { const [p0, p1, p2, p3] = s, m = 1 - t; return [0, 1].map((k) => m * m * m * p0[k] + 3 * m * m * t * p1[k] + 3 * m * t * t * p2[k] + t * t * t * p3[k]); };
    const bezT = (s, t) => { const [p0, p1, p2, p3] = s, m = 1 - t; return [0, 1].map((k) => 3 * m * m * (p1[k] - p0[k]) + 6 * m * t * (p2[k] - p1[k]) + 3 * t * t * (p3[k] - p2[k])); };
    const SEG = [BZ.slice(0, 4), BZ.slice(3, 7)];
    const ornek = []; SEG.forEach((s) => { for (let i = 0; i <= 200; i++) { const t = i / 200; ornek.push({ p: bez(s, t), d: bezT(s, t) }); } });
    const enYakin = (x) => ornek.reduce((b, o) => (Math.abs(o.p[0] - x) < Math.abs(b.p[0] - x) ? o : b));
    const dik = ornek.slice(0, 201).reduce((b, o) => (Math.abs(o.d[1] / o.d[0]) > Math.abs(b.d[1] / b.d[0]) ? o : b));
    const NOK = [['taban', dik, 'var(--ok)'], ['orta', enYakin(235), 'var(--warn)'], ['apeks', enYakin(345), 'var(--muted)']];
    // aynı basınç artışında (DP birim) hacim artışı: yatay kesikli adım + eğriye dikey çıkış
    const DP = 36, basamak = (o) => { const x2 = o.p[0] + DP, y2 = enYakin(x2).p[1]; return `M${o.p[0].toFixed(1)} ${o.p[1].toFixed(1)} H${x2.toFixed(1)} V${y2.toFixed(1)}`; };
    const tb = dik.p, ap = NOK[2][1].p, or = NOK[1][1].p;
    const svgB = `<svg class="f16-svg f16-ag-b" viewBox="0 0 400 214" role="img" aria-label="Basınç–hacim eğrisi: taban alveolleri dik, kompliyan kesimde; apeks alveolleri düz, az kompliyan kesimde">
        <text class="f16-ag-lb" x="50" y="14">Basınç–hacim eğrisinde alveoller</text>
        <path class="f16-ag-eks" d="M50 34 V186 H384"/>
        <path class="f16-ag-eks" d="M46 40 L50 33 L54 40 M377 182 L384 186 L377 190"/>
        <text class="f16-ag-t" x="42" y="44" text-anchor="end">hacim</text>
        <text class="f16-ag-t" x="384" y="204" text-anchor="end">basınç</text>
        <path class="f16-ag-egri" d="M${BZ[0]} C${BZ[1]} ${BZ[2]} ${BZ[3]} C${BZ[4]} ${BZ[5]} ${BZ[6]}"/>
        ${NOK.map(([k, o, c]) => `<g class="f16-ag-nok" data-k="${k}"><path class="f16-ag-teg" d="${basamak(o)}" style="stroke:${c}"/><circle class="f16-ag-ring" cx="${o.p[0].toFixed(1)}" cy="${o.p[1].toFixed(1)}" r="10"/><circle cx="${o.p[0].toFixed(1)}" cy="${o.p[1].toFixed(1)}" r="6" style="fill:${c}"/></g>`).join('')}
        <text class="f16-ag-t f16-hl" x="${(tb[0] + DP + 8).toFixed(1)}" y="${(tb[1] - 6).toFixed(1)}"><tspan class="f16-ag-b1">taban</tspan> · dik eğim = kompliyan</text>
        <text class="f16-ag-t f16-hl" x="${(or[0] - 6).toFixed(1)}" y="${(or[1] + 24).toFixed(1)}" text-anchor="middle"><tspan class="f16-ag-b1">orta</tspan></text>
        <text class="f16-ag-t f16-hl" x="384" y="${(ap[1] - 14).toFixed(1)}" text-anchor="end"><tspan class="f16-ag-b1">apeks</tspan> · düz = az kompliyan</text>
      </svg>`;
    el.innerHTML = `<div class="f16-ag"><div class="f16-ag-sol">${svgA}</div><div class="f16-ag-sag">${svgB}<p class="f16-ag-not">Kesikli basamaklar: aynı basınç artışı tabanda büyük, apekste çok küçük hacim artışı verir.</p><p class="f16-ag-ipucu">Bir alveol sırasına ya da etikete dokunun: eğrideki yeri işaretlenir.</p></div></div>`;
    const kap = el.querySelector('.f16-ag');
    let tip = 'mouse';
    const vurgula = (k) => { if (k) kap.dataset.on = k; else delete kap.dataset.on; el.querySelectorAll('.f16-ag-et').forEach((g) => g.setAttribute('aria-pressed', String(g.dataset.k === k))); };
    const anahtar = (e) => { const g = e.target.closest && e.target.closest('[data-k]'); return g && kap.contains(g) ? g.dataset.k : null; };
    const onDown = (e) => { tip = e.pointerType || 'mouse'; };
    const onOver = (e) => { if (tip === 'mouse' || e.pointerType === 'mouse') { const k = anahtar(e); if (k) vurgula(k); } };
    const onOut = (e) => { if (e.pointerType !== 'mouse') return; const k2 = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('[data-k]'); if (!k2 || !kap.contains(k2)) vurgula(null); };
    const onClick = (e) => { const k = anahtar(e); if (tip !== 'mouse') vurgula(k && kap.dataset.on !== k ? k : null); else if (k) vurgula(k); };
    const onFocus = (e) => { const k = anahtar(e); if (k) vurgula(k); };
    const onBlur = (e) => { if (!e.relatedTarget || !kap.contains(e.relatedTarget)) vurgula(null); };
    const onKey = (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.f16-ag-et')) { e.preventDefault(); const k = e.target.closest('.f16-ag-et').dataset.k; vurgula(kap.dataset.on === k ? null : k); } };
    const OL = [['pointerdown', onDown], ['pointerover', onOver], ['pointerout', onOut], ['click', onClick], ['focusin', onFocus], ['focusout', onBlur], ['keydown', onKey]];
    OL.forEach(([t, f]) => kap.addEventListener(t, f));
    return () => OL.forEach(([t, f]) => kap.removeEventListener(t, f));
  };
})();
