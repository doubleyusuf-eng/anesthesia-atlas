/* Fizyoloji Bölüm 34 · Arteriyel sistem · bileşenler (tarif: docs/tasarim/fiz34.md; K1 s. 148–154).
   Şemalar ölçekli değildir; kitaptan gelen sayılar ve temsilî değerler bileşen altlarında belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const r1 = (v) => Math.round(v * 10) / 10;
  /* ondalık virgül; d basamak, sondaki sıfırlar atılır */
  const vir = (v, d) => { let s = (+v).toFixed(d); if (d > 0) s = s.replace(/0+$/, '').replace(/\.$/, ''); return s.replace('.', ',').replace('-', '−'); };
  const T = (x, y, s, c, a, ex) => `<text x="${r1(x)}" y="${r1(y)}" class="${c || 'f34-t'}"${a ? ` text-anchor="${a}"` : ''}${ex ? ' ' + ex : ''}>${s}</text>`;
  const yol = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + r1(p[0]) + ' ' + r1(p[1])).join(' ');
  const halka = (cx, cy, a, b) => `M${r1(cx + b)} ${r1(cy)}A${r1(b)} ${r1(b)} 0 1 0 ${r1(cx - b)} ${r1(cy)}A${r1(b)} ${r1(b)} 0 1 0 ${r1(cx + b)} ${r1(cy)}Z` +
    (a > 0 ? `M${r1(cx + a)} ${r1(cy)}A${r1(a)} ${r1(a)} 0 1 1 ${r1(cx - a)} ${r1(cy)}A${r1(a)} ${r1(a)} 0 1 1 ${r1(cx + a)} ${r1(cy)}Z` : '');
  const capYaz = (el, h) => { const c = el.closest('.viz') && el.closest('.viz').querySelector('.viz-cap'); if (c && c._f34 !== h) { c._f34 = h; c.innerHTML = REF(h); } };
  const darIzle = (el, cb) => {
    let d = null;
    const f = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < 560; if (n !== d) { d = n; cb(n); } };
    f();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const seg = (ad, key, opts, cur, cls) => `<div class="seg f34-seg ${cls || ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const segSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const kay = (k, ad, min, max, step, val, cls) => `<label class="f34-kay ${cls || ''}"><span class="f34-kay-ad">${ad}</span><input type="range" data-k="${k}" min="${min}" max="${max}" step="${step}" value="${val}" aria-label="${ad.replace(/<[^>]+>/g, '')}"><output class="f34-kay-d" data-o="${k}"></output></label>`;
  const okMarker = (id, cls, s) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="${s || 6}" markerHeight="${s || 6}" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="${cls}"/></marker>`;
  const rnd = (seed) => { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };

  /* =====================================================================
     1 · f34_kesit — arter kesiti: katmanlar ve damar tipleri (K1 s. 148, 150)
     ===================================================================== */
  VIZ.f34_kesit = (el) => {
    const TIP = {
      el: { ad: 'Elastik arter', lum: 70, int: 4, sub: 4, med: 22, ext: 10, sira: 'LLKLLKLL', ara: 30, media: 'elastik doku kas dokusundan fazla', gorev: 'iletim; düşük direnç (büyük yarıçap)', ornek: 'aort ve ilk dalları',
        cap: '<b>Elastik arter.</b> Bir katmana dokunun ya da damar tipini değiştirin. Müsküler arterde ve arteriolde sempatik aktiviteyi değiştirip lümeni izleyin. [[K1 s. 148]]' },
      mu: { ad: 'Müsküler arter', lum: 40, int: 3, sub: 0, med: 24, ext: 11, sira: 'KLKLK', ara: 15, media: 'çoğu düz kas', gorev: 'organlara dağıtım; çap sempatik tonusla denetlenir', ornek: 'renal, koroner arter',
        cap: '<b>Müsküler arter.</b> Media çoğunlukla düz kastır; çapı sempatik sinir sistemi tonik olarak denetler. Kaydırıcıyla sempatik aktiviteyi değiştirin. [[K1 s. 148]]' },
      ar: { ad: 'Arteriol', lum: 28, int: 2.5, sub: 0, med: 15, ext: 10.5, sira: 'KK', ara: 14, media: '1–2 kat çevresel düz kas, elastin yok', gorev: 'ana direnç yeri; nabız sönümü', ornek: '“direnç damarları”',
        cap: '<b>Arteriol.</b> Media bir iki kat çevresel düz kastır ve elastin içermez; en küçük yarıçaplı damar olduğu için akıma direncin ana kaynağıdır. [[K1 s. 150]]' },
    };
    const KAT = {
      ext: ['Tunika eksterna', '<b>Tunika eksterna</b> (eski adıyla adventisya): en dış katman, kollajen lifleri gibi gevşek bağ dokusu. Büyük arterlerde dış katmanları vasa vasorum besler. [[K1 s. 148]]'],
      med: ['Tunika media', '<b>Tunika media:</b> çevresel düz kas ve elastik dokudan kalın orta katman; elastik/kas oranı damar tipini belirler. [[K1 s. 148]]'],
      int: ['Tunika intima (endotel)', '<b>Tunika intima:</b> en iç katman, tek sıra endotel hücresi. Bazı büyük damarlarda altında bağ dokusu ve bazal membrandan subendotel vardır. [[K1 s. 148]]'],
      lum: ['Lümen', '<b>Lümen</b> normalde daireseldir. Arterler kapillerlere tam oksijenli kan taşır; istisnalar pulmoner arterler ve fetustaki umbilikal arterlerdir. [[K1 s. 148]]'],
    };
    const SYM_UP = '<b>Sempatik aktivite artınca</b> düz kas kasılır: vazokonstriksiyon, lümen daralır, akım azalır. [[K1 s. 148]]';
    const SYM_DN = '<b>Sempatik aktivite azalınca</b> vazodilatasyon olur, lümen ve akım artar. Kitaba göre aracı kayma gerilimidir: endotelde Ca²⁺ ↑ → NO sentaz ↑ → NO düz kası gevşetir. [[K1 s. 148]]';
    let tip = 'el', s = 50, sel = null, dar = false;
    const cur = { lum: 70, int: 4, sub: 4, med: 22, ext: 10 };
    let from = null, tw = 1;
    const no = [0, 0.33, 0.66].map((p, i) => ({ p, a: -0.6 + i * 1.9 }));
    el.innerHTML = `<div class="f34-ust">${seg('Damar tipi', 'tip', [['el', 'Elastik arter'], ['mu', 'Müsküler arter'], ['ar', 'Arteriol']], 'el')}</div>
      <div class="f34-kesit-g"><div class="f34-svgk"></div>
      <div class="f34-bilgi"><h4 class="f34-bilgi-ad"></h4><dl class="kv f34-kv"><dt>Media:</dt><dd data-b="media"></dd><dt>Görev:</dt><dd data-b="gorev"></dd><dt>Örnek:</dt><dd data-b="ornek"></dd></dl>
      <div class="f34-sym" hidden>${kay('s', 'Sempatik aktivite', 0, 100, 1, 50)}<div class="f34-olcek"><span>azalmış</span><span>bazal</span><span>artmış</span></div><p class="f34-durum" aria-live="off"></p></div></div></div>
      <div class="f34-lej" hidden></div>`;
    const kut = el.querySelector('.f34-svgk'), lej = el.querySelector('.f34-lej'), sym = el.querySelector('.f34-sym'), durum = el.querySelector('.f34-durum');
    const geo = () => {
      const f = tip !== 'el' ? 1.25 - 0.5 * s / 100 : 1;
      const lum = cur.lum * f, i1 = lum + cur.int, s1 = i1 + cur.sub;
      const A = Math.pow(cur.lum + cur.int + cur.sub + cur.med, 2) - Math.pow(cur.lum + cur.int + cur.sub, 2);
      const m1 = Math.sqrt(s1 * s1 + A);
      return { lum, i1, s1, m1, e1: m1 + cur.ext };
    };
    const ciz = () => {
      const k = dar ? 0.85 : 1, cx = dar ? 180 : 140, cy = dar ? 128 : 150;
      const g = geo(), d = TIP[tip];
      const R = (v) => v * k;
      let h = '';
      if (tip === 'el') {
        [-0.9, 0.35, 2.3, 3.6].forEach((a) => {
          const p = (rr, da) => [cx + R(rr) * Math.cos(a + (da || 0)), cy + R(rr) * Math.sin(a + (da || 0))];
          h += `<path class="f34-vasa" d="${yol([p(g.e1 + 16), p(g.e1 + 4), p(g.m1 + cur.ext * 0.35)])} ${yol([p(g.e1 + 4), p(g.m1 + cur.ext * 0.4, 0.09)])} ${yol([p(g.e1 + 4), p(g.m1 + cur.ext * 0.4, -0.09)])}"/>`;
        });
      }
      h += `<path class="f34-ext" fill-rule="evenodd" d="${halka(cx, cy, R(g.m1), R(g.e1))}"/>`;
      { const rho = R((g.m1 + g.e1) / 2), n = Math.floor(2 * Math.PI * rho / 11); let dd = '';
        for (let j = 0; j < n; j++) { const th = j * 2 * Math.PI / n, o = j % 2 ? 1.6 : -1.6, w = 0.035 * 70 / Math.max(rho, 20);
          const P1 = [cx + (rho + o) * Math.cos(th - w), cy + (rho + o) * Math.sin(th - w)], PC = [cx + (rho + o + 2.2) * Math.cos(th), cy + (rho + o + 2.2) * Math.sin(th)], P2 = [cx + (rho + o) * Math.cos(th + w), cy + (rho + o) * Math.sin(th + w)];
          dd += `M${r1(P1[0])} ${r1(P1[1])}Q${r1(PC[0])} ${r1(PC[1])} ${r1(P2[0])} ${r1(P2[1])}`; }
        h += `<path class="f34-kol" d="${dd}"/>`; }
      h += `<path class="f34-med" fill-rule="evenodd" d="${halka(cx, cy, R(g.s1), R(g.m1))}"/>`;
      const sira = d.sira, ns = sira.length, sw = (g.m1 - g.s1) / ns;
      let lam = '', kas = '', kr = 0;
      for (let i = 0; i < ns; i++) {
        const rho = R(g.s1 + sw * (i + 0.5));
        if (sira[i] === 'L') {
          const pts = []; for (let j = 0; j <= 96; j++) { const th = j / 96 * 2 * Math.PI, rr = rho + 1.1 * Math.sin(th * 40); pts.push([cx + rr * Math.cos(th), cy + rr * Math.sin(th)]); }
          lam += yol(pts) + 'Z';
        } else {
          const n = Math.max(6, Math.floor(2 * Math.PI * rho / d.ara)), ry = clamp(sw * k * 0.32, 1.4, 3.6), off = (kr++ % 2) * 0.5;
          for (let j = 0; j < n; j++) { const th = (j + off) / n * 2 * Math.PI, x = cx + rho * Math.cos(th), y = cy + rho * Math.sin(th);
            kas += `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${r1(Math.min(6, Math.PI * rho / n * 0.8))}" ry="${r1(ry)}" transform="rotate(${r1(th * 180 / Math.PI + 90)} ${r1(x)} ${r1(y)})"/>`; }
        }
      }
      if (lam) h += `<path class="f34-lam" d="${lam}"/>`;
      if (kas) h += `<g class="f34-kas">${kas}</g>`;
      if (cur.sub > 0.4) h += `<path class="f34-sub" fill-rule="evenodd" d="${halka(cx, cy, R(g.i1), R(g.s1))}"/>`;
      h += `<circle class="f34-int" cx="${cx}" cy="${cy}" r="${r1(R((g.lum + g.i1) / 2))}" style="stroke-width:${r1(R(cur.int))}px"/>`;
      h += `<circle class="f34-lum" cx="${cx}" cy="${cy}" r="${r1(R(g.lum))}"/>`;
      [[0, 0], [0.55, 0.5], [0.55, 2.6], [0.55, 4.4], [0.5, 1.6]].forEach(([q, a]) => { h += `<circle class="f34-rbc" cx="${r1(cx + R(g.lum) * q * Math.cos(a))}" cy="${r1(cy + R(g.lum) * q * Math.sin(a))}" r="${r1(Math.min(4, R(g.lum) * 0.18))}"/>`; });
      if (tip !== 'el' && s < 40) no.forEach((n) => { const rr = R(lerp(g.lum, g.m1, n.p)); h += T(cx + rr * Math.cos(n.a), cy + rr * Math.sin(n.a) + 4, 'NO', 'f34-no', 'middle'); });
      const hit = { ext: halka(cx, cy, R(g.m1), R(g.e1)), med: halka(cx, cy, R(g.s1), R(g.m1)), int: halka(cx, cy, R(g.lum), R(g.s1)), lum: halka(cx, cy, 0, R(g.lum)) };
      if (sel) h += `<path class="f34-secili" fill-rule="evenodd" d="${hit[sel]}"/>`;
      for (const kk in hit) h += `<path class="f34-hit" fill-rule="evenodd" data-kat="${kk}" tabindex="0" role="button" aria-label="${KAT[kk][0]}" d="${hit[kk]}"/>`;
      if (tip === 'ar') h += T(cx, cy + R(g.e1) + 22, 'büyütülmüş', 'f34-ts', 'middle');
      if (!dar) {
        const lab = [['ext', 'Tunika eksterna', 66, (g.m1 + g.e1) / 2], ['med', 'Tunika media', 112, (g.s1 + g.m1) / 2], ['int', 'Tunika intima (endotel)', 196, (g.lum + g.i1) / 2], ['lum', 'Lümen', 240, g.lum * 0.6]];
        if (tip === 'el') lab.push(['vasa', 'Vasa vasorum', 26, null], ['sub', 'Subendotel', 156, (g.i1 + g.s1) / 2]);
        lab.forEach(([kk, ad, ly, rm]) => {
          let ax, ay;
          if (kk === 'vasa') { ax = cx + R(g.e1 + 14) * Math.cos(-0.9); ay = cy + R(g.e1 + 14) * Math.sin(-0.9); } else {
            const th = Math.asin(clamp((ly - cy) / R(rm), -0.92, 0.92)); ax = cx + R(rm) * Math.cos(th); ay = cy + R(rm) * Math.sin(th);
          }
          h += `<path class="f34-kil" d="M${r1(ax)} ${r1(ay)}L${r1(Math.max(ax + 10, 268))} ${ly - 4}L282 ${ly - 4}"/><circle class="f34-kil-n" cx="${r1(ax)}" cy="${r1(ay)}" r="2.2"/>` + T(286, ly, ad, 'f34-t' + (sel === kk ? ' f34-acc-t' : ''));
        });
      }
      kut.innerHTML = `<svg class="f34-svg" viewBox="${dar ? '0 0 360 258' : '0 0 470 300'}" role="img" aria-label="${d.ad} kesiti: tunika eksterna, media, intima ve lümen">${h}</svg>`;
    };
    const lejCiz = () => {
      const L = [['ext', 'Tunika eksterna', 'f34-lk-ext'], ['med', 'Tunika media', 'f34-lk-med'], ['int', 'Tunika intima (endotel)', 'f34-lk-int'], ['lum', 'Lümen', 'f34-lk-lum']];
      if (tip === 'el') L.push(['sub', 'Subendotel', 'f34-lk-sub'], ['ext', 'Vasa vasorum', 'f34-lk-vasa']);
      lej.innerHTML = L.map(([kk, ad, c]) => `<button type="button" data-lk="${kk}" aria-pressed="${String(sel === kk)}"><i class="${c}"></i>${ad}</button>`).join('');
    };
    const bilgi = () => {
      const d = TIP[tip];
      el.querySelector('.f34-bilgi-ad').textContent = d.ad;
      ['media', 'gorev', 'ornek'].forEach((b) => { el.querySelector(`[data-b="${b}"]`).textContent = d[b]; });
      sym.hidden = tip === 'el';
      const o = el.querySelector('[data-o="s"]'); o.textContent = s;
      durum.className = 'f34-durum' + (s > 60 ? ' f34-warn-t' : s < 40 ? ' f34-ok-t' : '');
      durum.textContent = s > 60 ? 'vazokonstriksiyon: lümen daralır, akım ↓' : s < 40 ? 'vazodilatasyon: lümen genişler, akım ↑' : 'bazal tonus';
    };
    const secKat = (kk) => { sel = kk === 'sub' ? 'int' : kk; capYaz(el, KAT[sel][1]); ciz(); if (dar) lejCiz(); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-tip]');
      if (b && b.dataset.tip !== tip) {
        tip = b.dataset.tip; segSec(el, 'tip', tip); sel = null; s = 50; el.querySelector('[data-k="s"]').value = 50;
        from = { ...cur }; tw = RM ? 1 : 0; if (RM) Object.assign(cur, TIP[tip]);
        capYaz(el, TIP[tip].cap); bilgi(); ciz(); if (dar) lejCiz(); return;
      }
      const h = e.target.closest('[data-kat],[data-lk]');
      if (h) secKat(h.dataset.kat || h.dataset.lk);
    });
    el.addEventListener('keydown', (e) => { const h = e.target.closest('[data-kat]'); if (h && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); secKat(h.dataset.kat); } });
    el.addEventListener('input', (e) => { if (e.target.dataset.k === 's') { s = +e.target.value; bilgi(); ciz(); } });
    el.addEventListener('change', (e) => { if (e.target.dataset.k === 's') capYaz(el, s > 60 ? SYM_UP : s < 40 ? SYM_DN : TIP[tip].cap); });
    const stopD = darIzle(el, (n) => { dar = n; el.classList.toggle('f34-dar', n); lej.hidden = !n; ciz(); if (n) lejCiz(); });
    bilgi();
    const stopT = ticker(el, (dt) => {
      let deg = false;
      if (tw < 1) { tw = Math.min(1, tw + dt / 0.6); const f = ease(tw), to = TIP[tip]; ['lum', 'int', 'sub', 'med', 'ext'].forEach((kk) => { cur[kk] = lerp(from[kk], to[kk], f); }); deg = true; }
      if (tip !== 'el' && s < 40 && !RM) { no.forEach((n) => { n.p += dt * 0.35; if (n.p > 1) { n.p -= 1; n.a += 2.2; } }); deg = true; }
      if (deg) ciz();
    });
    return () => { stopT(); stopD(); };
  };

  /* =====================================================================
     2 · f34_elastik — sistolde genişleme, diyastolde geri yaylanma (K1 s. 148, 152)
     ===================================================================== */
  VIZ.f34_elastik = (el) => {
    const TC = 2, TS = 2 / 3, N = 400, QPK = Math.PI * TC / (2 * TS), PC = 0.6;
    const sim = (C) => {
      const dt = TC / N; let P = 1.6; const out = { P: [], Qo: [], Qi: [] };
      for (let c = 0; c < 12; c++) for (let i = 0; i < N; i++) {
        const t = i * dt, Qi = t < TS ? QPK * Math.sin(Math.PI * t / TS) : 0;
        for (let k = 0; k < 8; k++) { const Qo = Math.max(0, P - PC); P += (Qi - Qo) / C * dt / 8; }
        if (c === 11) { out.P.push(P); out.Qo.push(Math.max(0, P - PC)); out.Qi.push(Qi); }
      }
      return out;
    };
    const MOD = { el: sim(1.2), ri: sim(0.02) };
    const pMin = Math.min(...MOD.el.P), pMax = Math.max(...MOD.el.P);
    const PTOP = Math.max(...MOD.ri.P) * 1.05, QTOP = QPK * 1.08;
    const CAP = {
      1: '<b>Sistol.</b> Kalpten atılan kanın bir kısmı genişleyen aort duvarında tutulur. Oynatın ya da duvarı rijit boruya çevirip diyastolde akımı karşılaştırın. [[K1 s. 148]]',
      2: '<b>Diyastol.</b> Valv kapanınca elastik duvar geri yaylanır; tutulan kanı ileri iter ve diyastolik basıncı sürdürür. Periferik akım kesilmez. [[K1 s. 148]]',
      3: '<b>Sönümleme.</b> Genişleme ve geri yaylanma pulsatil arteriyel akımı sönümler; elastik arterler büyük yarıçapları sayesinde düşük dirençle kanı iletir. [[K1 s. 148]]',
      ri: '<b>Rijit boru (karşılaştırma).</b> Esnemeyen boruda sistolde kan depolanamaz: basınç daha sivri yükselir, diyastolde akım neredeyse durur. Elastik duvarın işlevi bu farktır. [[K1 s. 148]]',
    };
    let mod = 'el', oyn = !RM, t = TS * 0.6, dar = false, L, svg, gSah, gImlec, faz = 0;
    const par = Array.from({ length: 24 }, (_, i) => ({ x: (i * 0.618) % 1, y: ((i * 0.381) % 1) * 1.6 - 0.8, b: i % 3 }));
    el.innerHTML = `<div class="f34-ust"><div class="btn-row">${RM ? '' : '<button type="button" class="btn f34-oyn" aria-pressed="true">Duraklat</button>'}<button type="button" class="btn ghost f34-adim">Adım</button></div>${seg('Duvar', 'mod', [['el', 'Elastik arter'], ['ri', 'Rijit boru (karşılaştırma)']], 'el')}</div><div class="f34-svgk"></div>`;
    const kut = el.querySelector('.f34-svgk'), bOyn = el.querySelector('.f34-oyn');
    const iv = (arr, tc) => { const f = (tc / TC) * N, i = Math.floor(f) % N, j = (i + 1) % N, w = f - Math.floor(f); return lerp(arr[i], arr[j], w); };
    const kur = () => {
      L = dar ? { W: 360, H: 470, hx: 36, hy: 82, hs: 0.72, vx: 70, a0: 88, a1: 278, b1: 346, ay: 82, gx0: 44, gx1: 350, p0: 205, p1: 300, q0: 335, q1: 432 }
        : { W: 560, H: 322, hx: 58, hy: 85, hs: 1, vx: 114, a0: 140, a1: 440, b1: 524, ay: 85, gx0: 60, gx1: 540, p0: 176, p1: 236, q0: 252, q1: 300 };
      const m = MOD[mod], gw = L.gx1 - L.gx0;
      const X = (tt) => L.gx0 + tt / (2 * TC) * gw;
      const YP = (p) => L.p1 - (p / PTOP) * (L.p1 - L.p0), YQ = (q) => L.q1 - (q / QTOP) * (L.q1 - L.q0);
      let g = '';
      for (let c = 0; c < 2; c++) g += `<rect class="f34-band" x="${r1(X(c * TC))}" y="${L.p0}" width="${r1(X(TS) - X(0))}" height="${L.p1 - L.p0}"/><rect class="f34-band" x="${r1(X(c * TC))}" y="${L.q0}" width="${r1(X(TS) - X(0))}" height="${L.q1 - L.q0}"/>`;
      g += `<path class="f34-eks" d="M${L.gx0} ${L.p0 - 4}V${L.p1}H${L.gx1}M${L.gx0} ${L.q0 - 4}V${L.q1}H${L.gx1}"/>`;
      const pts = (arr, Y) => { const a = []; for (let c = 0; c < 2; c++) for (let i = 0; i <= N; i += 2) a.push([X(c * TC + i / N * TC), Y(arr[i % N])]); return yol(a); };
      g += `<path class="f34-c-bas" d="${pts(m.P, YP)}"/><path class="f34-c-qi" d="${pts(m.Qi, YQ)}"/><path class="f34-c-qo" d="${pts(m.Qo, YQ)}"/>`;
      g += T(L.gx0 + 4, L.p0 + 13, 'Sistol', 'f34-ts') + T(X(TS + (TC - TS) / 2), L.p0 + 13, 'Diyastol', 'f34-ts', 'middle');
      g += T(L.gx1 - 4, L.p0 + 13, 'Aort basıncı', 'f34-t f34-crit-t f34-halo', 'end');
      g += T(L.gx1 - 4, L.q0 + 11, 'periferik akım', 'f34-ts f34-acc-t f34-halo', 'end') + T(L.gx1 - 4, L.q0 + 25, 'kalpten atılan (kesikli)', 'f34-ts f34-halo', 'end');
      g += T(L.gx0 - 6, (L.p0 + L.p1) / 2, 'basınç', 'f34-ts', 'middle', `transform="rotate(-90 ${L.gx0 - 10} ${(L.p0 + L.p1) / 2})"`);
      g += T(L.gx0 - 6, (L.q0 + L.q1) / 2, 'akım', 'f34-ts', 'middle', `transform="rotate(-90 ${L.gx0 - 10} ${(L.q0 + L.q1) / 2})"`);
      g += T(L.gx1, L.q1 + 15, 'zaman →', 'f34-ts', 'end');
      g += `<g class="f34-sonuc" hidden><rect x="${r1(X(TC * 1.08))}" y="${L.q0 + 30}" width="${dar ? 150 : 176}" height="24" rx="6"/>${T(X(TC * 1.08) + 8, L.q0 + 46, 'pulsatil akım sönümlendi', 'f34-ts f34-acc-t')}</g>`;
      kut.innerHTML = `<svg class="f34-svg" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Aort segmenti ve aort basıncı ile periferik akım eğrileri"><defs>${okMarker('f34-el-ok', 'f34-uc-acc')}${okMarker('f34-el-oki', 'f34-uc-ok', 5)}</defs>${g}<g class="f34-sah"></g><line class="f34-imlec" y1="${L.p0 - 4}" y2="${L.q1}"/></svg>`;
      svg = kut.querySelector('svg'); gSah = svg.querySelector('.f34-sah'); gImlec = svg.querySelector('.f34-imlec');
      L.X = X;
    };
    const sahne = () => {
      const m = MOD[mod], tc = t % TC, P = iv(m.P, tc), Qo = iv(m.Qo, tc), Qi = iv(m.Qi, tc);
      const sis = tc < TS, bf = mod === 'el' ? clamp((P - pMin) / (pMax - pMin), 0, 1) : 0;
      const k = L.hs, h0 = 23 * k, hh = h0 + 8 * k * bf, ay = L.ay;
      let g = '';
      // kalp (sol ventrikül)
      const kas = sis ? Math.sin(Math.PI * tc / TS) : 0;
      g += `<ellipse class="f34-lv" cx="${L.hx}" cy="${ay}" rx="${r1((26 - 5 * kas) * k)}" ry="${r1((38 - 6 * kas) * k)}"/>` + T(L.hx, ay + 5, 'LV', 'f34-t', 'middle');
      // aort ve dallar
      const xs = [], N2 = 24; for (let i = 0; i <= N2; i++) xs.push(lerp(L.a0, L.a1, i / N2));
      const prof = (x) => h0 + (hh - h0) * Math.pow(Math.sin(Math.PI * (x - L.a0) / (L.a1 - L.a0)) * 0.85 + 0.15, 1);
      if (bf > 0.05) g += `<path class="f34-depo" d="${yol(xs.map((x) => [x, ay - prof(x)]))}${yol(xs.slice().reverse().map((x) => [x, ay - h0])).replace('M', 'L')}Z${yol(xs.map((x) => [x, ay + prof(x)]))}${yol(xs.slice().reverse().map((x) => [x, ay + h0])).replace('M', 'L')}Z"/>`;
      g += `<path class="f34-lumen" d="${yol(xs.map((x) => [x, ay - prof(x)]))}L${L.a1} ${ay + prof(L.a1)}${yol(xs.slice().reverse().map((x) => [x, ay + prof(x)])).replace('M', 'L')}Z"/>`;
      const bx = (L.b1 - L.a1);
      [-1, 0, 1].forEach((j) => { g += `<path class="f34-dal" d="M${L.a1} ${ay + j * 12 * k}C${L.a1 + bx * 0.4} ${ay + j * 14 * k} ${L.a1 + bx * 0.5} ${ay + j * 34 * k} ${L.b1} ${ay + j * 38 * k}"/>`; });
      g += `<path class="${mod === 'el' ? 'f34-duvar-el' : 'f34-duvar-ri'}" d="${yol(xs.map((x) => [x, ay - prof(x)]))}${yol(xs.map((x) => [x, ay + prof(x)]))}"/>`;
      // valv
      const vx = L.vx, vh = h0 - 2, ac = sis && Qi > 0.2;
      g += `<path class="f34-valv" d="M${vx} ${r1(ay - vh)}L${r1(vx + (ac ? 18 : 8) * k)} ${r1(ay - (ac ? vh * 0.75 : 1))}M${vx} ${r1(ay + vh)}L${r1(vx + (ac ? 18 : 8) * k)} ${r1(ay + (ac ? vh * 0.75 : 1))}"/>`;
      g += `<path class="f34-bag" d="M${r1(L.hx + 22 * k)} ${r1(ay - vh)}L${L.a0} ${r1(ay - h0)}M${r1(L.hx + 22 * k)} ${r1(ay + vh)}L${L.a0} ${r1(ay + h0)}"/>`;
      // yay / rijit etiket
      const yx0 = lerp(L.a0, L.a1, 0.3), yl = (L.a1 - L.a0) * (0.22 + 0.16 * bf), yy = ay - (h0 + 8 * k) - 14;
      if (mod === 'el') { const zp = []; for (let i = 0; i <= 12; i++) zp.push([yx0 + yl * i / 12, yy + (i % 2 ? -5 : 5) * (i && i < 12 ? 1 : 0)]); g += `<path class="f34-yay" d="${yol(zp)}"/>` + T(yx0 + yl + 6, yy + 4, 'elastik doku', 'f34-ts f34-ok-t'); }
      else g += T(yx0, yy + 4, 'rijit duvar: esnemez', 'f34-ts');
      if (bf > 0.45 && sis) g += T((L.a0 + L.a1) / 2 + 40 * k, ay + h0 + 8 * k + 18, 'depolanan kan', 'f34-ts f34-acc-t', 'middle');
      if (!sis && mod === 'el' && bf > 0.05) {
        const mx = (L.a0 + L.a1) / 2;
        g += `<path class="f34-ic" marker-end="url(#f34-el-oki)" d="M${mx} ${r1(ay - hh - 12)}V${r1(ay - hh + 1)}M${mx} ${r1(ay + hh + 12)}V${r1(ay + hh - 1)}"/>`;
        g += T(L.a0, ay + h0 + 8 * k + 18, 'geri yaylanma: kan ileri itilir', 'f34-ts f34-ok-t');
      }
      // parçacıklar
      par.forEach((p) => {
        let x, y;
        if (p.x < 1) { x = lerp(L.a0, L.a1, p.x); y = ay + p.y * prof(x) * 0.85; }
        else { const u = Math.min(1, p.x - 1), j = p.b - 1; x = lerp(L.a1, L.b1, u); y = ay + j * lerp(12, 38, u * u) * k; }
        g += `<circle class="f34-rbc" cx="${r1(x)}" cy="${r1(y)}" r="3"/>`;
      });
      g += T(L.b1, ay + 60 * k + (dar ? 24 : 0), 'periferik damarlar', 'f34-ts', 'end');
      g += T(L.a0 + 4, ay - h0 - (dar ? 32 : 40), mod === 'el' ? 'Aort (elastik arter)' : 'Rijit boru', 'f34-t');
      gSah.innerHTML = g;
      const cx = L.X(t % (2 * TC));
      gImlec.setAttribute('x1', r1(cx)); gImlec.setAttribute('x2', r1(cx));
      const nf = Math.floor(t / TC) % 3 === 2 ? 3 : sis ? 1 : 2;
      svg.querySelector('.f34-sonuc').hidden = !(nf === 3 && mod === 'el');
      if (nf !== faz) { faz = nf; capYaz(el, mod === 'ri' ? CAP.ri : CAP[nf]); }
      return { Qi, Qo };
    };
    const ilerle = (dt) => {
      const m = MOD[mod], tc = t % TC, Qi = iv(m.Qi, tc), Qo = iv(m.Qo, tc);
      t = (t + dt) % (3 * TC);
      par.forEach((p) => {
        const v = p.x < 1 ? 38 * (Qi + Qo) / 2 * (1 - p.y * p.y * 0.4) / (L.a1 - L.a0) : 38 * Qo / (L.b1 - L.a1);
        p.x += v * dt; if (p.x > 2) { p.x = 0; p.y = Math.random() * 1.6 - 0.8; p.b = Math.floor(Math.random() * 3); }
      });
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-mod]');
      if (b) { mod = b.dataset.mod; segSec(el, 'mod', mod); faz = 0; kur(); sahne(); return; }
      if (e.target.closest('.f34-oyn')) { oyn = !oyn; bOyn.textContent = oyn ? 'Duraklat' : 'Oynat'; bOyn.setAttribute('aria-pressed', String(oyn)); return; }
      if (e.target.closest('.f34-adim')) {
        if (oyn && bOyn) { oyn = false; bOyn.textContent = 'Oynat'; bOyn.setAttribute('aria-pressed', 'false'); }
        const sira = { 0: TS * 0.6, 1: TS + 0.45, 2: 2 * TC + TS + 0.45, 3: TS * 0.6 };
        t = sira[faz] || TS * 0.6; sahne();
      }
    });
    const stopD = darIzle(el, (n) => { dar = n; el.classList.toggle('f34-dar', n); kur(); sahne(); });
    const stopT = ticker(el, (dt) => { if (!oyn) return; ilerle(dt); sahne(); });
    return () => { stopT(); stopD(); };
  };

  /* =====================================================================
     3 · f34_poiseuille — Q̇ = ΔPπr⁴/8ηl (K1 s. 149)
     ===================================================================== */
  VIZ.f34_poiseuille = (el) => {
    let r = 1, eta = 1, l = 1, dar = false, svg, gPar, par = [], geo = null;
    el.innerHTML = `<div class="f34-svgk"></div>
      <div class="f34-kaylar">${kay('r', 'Yarıçap r', 0.5, 2, 0.05, 1)}${kay('eta', 'Viskozite η', 0.5, 2, 0.1, 1)}${kay('l', 'Uzunluk l', 0.5, 2, 0.1, 1)}</div>
      <div class="btn-row f34-btns"><button type="button" class="btn ghost" data-h="iki">Yarıçapı iki katına çıkar</button><button type="button" class="btn ghost" data-h="yari">Yarıçapı yarıya indir</button><button type="button" class="btn ghost" data-h="sif">Sıfırla</button></div>`;
    const kut = el.querySelector('.f34-svgk');
    const gos = (q) => (q >= 10 ? String(Math.round(q)) : q >= 0.995 ? vir(q, 1) : '1/' + Math.round(1 / q));
    const sy = (v) => vir(v, 2);
    const ciz = () => {
      const W = dar ? 360 : 560, H = dar ? 336 : 300, cy = dar ? 82 : 92;
      const Q = Math.pow(r, 4) / (eta * l), vbar = r * r / (eta * l);
      const th = clamp(40 * r, 8, 100), len = dar ? clamp(200 * l, 100, 330) : clamp(260 * l, 130, 480);
      const x0 = W / 2 - len / 2, x1 = W / 2 + len / 2, ry = th / 2;
      geo = { x0, x1, cy, ry, vbar, Q };
      let g = `<defs>${okMarker('f34-pq-ok', 'f34-uc-crit', 5)}<clipPath id="f34-pq-clip"><rect x="${r1(x0)}" y="${r1(cy - ry)}" width="${r1(len)}" height="${r1(th)}"/></clipPath></defs>`;
      g += `<rect class="f34-pq-lum" x="${r1(x0)}" y="${r1(cy - ry)}" width="${r1(len)}" height="${r1(th)}"/>`;
      g += `<g clip-path="url(#f34-pq-clip)" class="f34-pq-par" style="opacity:${r1(lerp(0.5, 1, (eta - 0.5) / 1.5) * 100) / 100}"></g>`;
      g += `<path class="f34-pq-duvar" d="M${r1(x0)} ${r1(cy - ry)}H${r1(x1)}M${r1(x0)} ${r1(cy + ry)}H${r1(x1)}"/>`;
      g += `<ellipse class="f34-pq-uc" cx="${r1(x0)}" cy="${cy}" rx="${r1(Math.max(3, ry * 0.3))}" ry="${r1(ry)}"/><ellipse class="f34-pq-uc" cx="${r1(x1)}" cy="${cy}" rx="${r1(Math.max(3, ry * 0.3))}" ry="${r1(ry)}"/>`;
      const um = Math.min(80, 40 * vbar), xm = W / 2 - um / 2;
      let pr = '', prof = [];
      for (let i = -3; i <= 3; i++) { const yf = i / 3.6, y = cy + yf * ry, u = um * (1 - yf * yf); if (u > 3) pr += `<line class="f34-pq-hiz" x1="${r1(xm)}" x2="${r1(xm + u)}" y1="${r1(y)}" y2="${r1(y)}" marker-end="url(#f34-pq-ok)"/>`; }
      for (let i = 0; i <= 20; i++) { const yf = -1 + i / 10, u = um * (1 - yf * yf); prof.push([xm + u, cy + yf * ry]); }
      g += `<line class="f34-pq-ref" x1="${r1(xm)}" x2="${r1(xm)}" y1="${r1(cy - ry)}" y2="${r1(cy + ry)}"/><path class="f34-pq-prof" d="${yol(prof)}"/>${pr}`;
      g += T(x0 - 8, cy + 5, 'P₁', 'f34-t', 'end') + T(x1 + 8, cy + 5, 'P₂', 'f34-t');
      g += `<rect class="f34-rozet" x="${W / 2 - 38}" y="${cy - ry - 34}" width="76" height="22" rx="11"/>` + T(W / 2, cy - ry - 19, 'ΔP sabit', 'f34-ts', 'middle');
      g += T(W / 2, cy + ry + 18, dar ? 'laminer: hız merkezde en büyük' : 'laminer akım: hız merkezde en büyük, duvarda sıfır', 'f34-ts', 'middle');
      // sonuç
      const ry0 = dar ? 192 : 200, fx = dar ? 16 : 30;
      g += T(fx, ry0, `Akım (Q̇) = ${gos(Q)} ×`, 'f34-buyuk f34-q');
      g += T(fx, ry0 + 24, `Direnç (R) = ${gos(1 / Q)} ×`, 'f34-t f34-q');
      const fy = dar ? ry0 + 50 : ry0 - 6, fax = dar ? fx : W - 30, fan = dar ? 'start' : 'end';
      g += T(fax, fy, 'Q̇ ∝ r⁴ / (η · l)', 'f34-form f34-q', fan) + T(fax, fy + 20, `= ${sy(r)}⁴ / (${sy(eta)} · ${sy(l)}) = ${vir(Q, Q >= 10 ? 0 : 2)}`, 'f34-form f34-q', fan);
      const bx0 = fx, bx1 = W - (dar ? 16 : 30), by = dar ? 290 : 244, u = clamp((Math.log2(Q) + 6) / 12, 0, 1);
      g += `<rect class="f34-bar-z" x="${bx0}" y="${by}" width="${bx1 - bx0}" height="12" rx="6"/><rect class="f34-bar-d" x="${bx0}" y="${by}" width="${r1(Math.max(6, (bx1 - bx0) * u))}" height="12" rx="6"/>`;
      [[-6, '1/64'], [-4, '1/16'], [0, '1 ×'], [4, '16'], [6, '64']].forEach(([e, s]) => { if (dar && Math.abs(e) === 4) s = ''; const x = bx0 + (bx1 - bx0) * (e + 6) / 12; g += `<line class="f34-centik" x1="${r1(x)}" x2="${r1(x)}" y1="${by - 3}" y2="${by + 15}"/>` + T(x, by + 30, s, 'f34-ts', e === -6 ? 'start' : e === 6 ? 'end' : 'middle'); });
      g += T(bx0, by - 8, 'göreli akım (logaritmik)', 'f34-ts');
      kut.innerHTML = `<svg class="f34-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Boru akımı: yarıçap ${sy(r)}, viskozite ${sy(eta)}, uzunluk ${sy(l)}; göreli akım ${gos(Q)} kat">${g}</svg>`;
      svg = kut.querySelector('svg'); gPar = svg.querySelector('.f34-pq-par');
      const n = Math.round(0.006 * len * th) + 6;
      if (Math.abs(n - par.length) > 4 || !par.length) par = Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random() * 1.84 - 0.92 }));
      parCiz();
      el.querySelectorAll('[data-o]').forEach((o) => { o.textContent = sy({ r, eta, l }[o.dataset.o]); });
    };
    const parCiz = () => {
      if (!gPar) return; const { x0, x1, cy, ry } = geo;
      gPar.innerHTML = par.map((p) => `<circle class="f34-rbc" cx="${r1(lerp(x0, x1, p.x))}" cy="${r1(cy + p.y * ry)}" r="2.5"/>`).join('');
    };
    const capG = () => {
      const e1 = Math.abs(eta - 1) < 0.01, l1 = Math.abs(l - 1) < 0.01;
      if (e1 && l1 && Math.abs(r - 1) < 0.01) return '<b>Başlangıç.</b> Bütün değişkenler 1 (göreli). Yarıçapı iki katına çıkarın: akım 16 kat artar. [[K1 s. 149]]';
      if (e1 && l1 && Math.abs(r - 2) < 0.01) return '<b>Yarıçap iki kat.</b> Akım 2⁴ = 16 kat artar, direnç 16’da bire iner: akımı en çok etkileyen değişken yarıçaptır. [[K1 s. 149]]';
      if (e1 && l1 && Math.abs(r - 0.5) < 0.01) return '<b>Yarıçap yarıya.</b> Akım 16’da bire düşer. Arteriollerde küçük bir daralmanın direnci neden bu kadar artırdığı buradan anlaşılır. [[K1 s. 149–150]]';
      if (Math.abs(r - 1) < 0.01) return '<b>Viskozite ve uzunluk</b> akımı yalnız doğrusal olarak etkiler: iki katına çıkmaları akımı yarıya indirir. Direnç = 8ηl/πr⁴. [[K1 s. 149]]';
      return '<b>Q̇ = ΔPπr⁴/8ηl.</b> ΔP sabitken akım r⁴ ile doğru, η ve l ile ters orantılıdır. [[K1 s. 149]]';
    };
    const ayarla = (nr, ne, nl) => { r = nr; eta = ne; l = nl; el.querySelector('[data-k="r"]').value = r; el.querySelector('[data-k="eta"]').value = eta; el.querySelector('[data-k="l"]').value = l; ciz(); capYaz(el, capG()); };
    el.addEventListener('input', (e) => { const k = e.target.dataset.k; if (!k) return; if (k === 'r') r = +e.target.value; if (k === 'eta') eta = +e.target.value; if (k === 'l') l = +e.target.value; ciz(); capYaz(el, capG()); });
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-h]'); if (!b) return; const h = b.dataset.h; if (h === 'iki') ayarla(2, 1, 1); else if (h === 'yari') ayarla(0.5, 1, 1); else ayarla(1, 1, 1); });
    const stopD = darIzle(el, (n) => { dar = n; el.classList.toggle('f34-dar', n); ciz(); });
    const stopT = ticker(el, (dt) => {
      if (RM || !geo) return; const len = geo.x1 - geo.x0;
      par.forEach((p) => { p.x += 60 * geo.vbar * (1 - p.y * p.y) * dt / len; if (p.x > 1) { p.x -= 1; p.y = Math.random() * 1.84 - 0.92; } });
      parCiz();
    });
    return () => { stopT(); stopD(); };
  };

  /* =====================================================================
     4 · f34_viskozite — dört etken (K1 s. 149)
     ===================================================================== */
  VIZ.f34_viskozite = (el) => {
    const ST = { hiz: 70, hct: 0.45, isi: 37, cap: 100 };
    const CAPS = {
      hiz: '<b>Akım hızı.</b> Akımı yavaşlatın: eritrositler rulo oluşturur, viskozite artar. Öteki etkenleri sekmelerden seçin. [[K1 s. 149]]',
      hizD: '<b>Düşük akım.</b> Eritrositler daha çok etkileşir ve rulo oluşturur; viskozite ve akıma direnç artar. Normal akımda negatif yüklü sialik asit artıkları hücreleri iterek kümelenmeyi önler. [[K1 s. 149]]',
      hct: '<b>Hematokrit.</b> Eritrositler arası etkileşim yüzünden yüksek hematokrit viskoziteyi artırır; anemide akım artar. Akım ile O₂ taşıma kapasitesi arasındaki en iyi denge ≈ 0,3 hematokrittir. [[K1 s. 149]]',
      isi: '<b>Sıcaklık.</b> Sıcaklık düştükçe viskozite artar. Yakın zamana dek kardiyak arrest sonrası soğutulan hastalarda bu yüzden akım azalıyordu; kardiyojenik şokta akım zaten düşük olabilir. [[K1 s. 149]]',
      capK: '<b>Fahraeus–Lindqvist etkisi.</b> 300 μm’den dar damarlarda eritrositler ortada akar, duvar boyunca daha az viskoz plazma kalır; direnç, yarıçapın küçülmesiyle beklenenden az artar (arteriol ve kapillerlerde). [[K1 s. 149]]',
      capB: '<b>Büyük damar.</b> Eritrositler kesit boyunca dağılır; 300 μm’nin altına inin. [[K1 s. 149]]',
    };
    let sek = 'hiz', dar = false, svg, gHuc, birim = [], L;
    const cap = () => 50 * Math.pow(20, ST.cap / 100);
    const visk = () => {
      if (sek === 'hiz') return 0.4 + 0.5 * clamp((50 - ST.hiz) / 50, 0, 1);
      if (sek === 'hct') return 0.15 + (ST.hct - 0.2) * 1.4;
      if (sek === 'isi') return 0.45 + (37 - ST.isi) * 0.08;
      const d = cap(); return d >= 300 ? 0.5 : 0.5 - 0.25 * (300 - d) / 250;
    };
    const REFV = { hiz: 0.4, hct: 0.5, isi: 0.45, cap: 0.5 };
    const hiz = () => (sek === 'hiz' ? 8 + 1.4 * ST.hiz : sek === 'isi' ? 60 * 0.45 / visk() : sek === 'hct' ? 55 : 50);
    el.innerHTML = `<div class="f34-ust">${seg('Etken', 'sek', [['hiz', 'Akım hızı'], ['hct', 'Hematokrit'], ['isi', 'Sıcaklık'], ['cap', 'Damar çapı']], 'hiz')}</div>
      <div class="f34-svgk"></div><div class="f34-kaylar f34-tek"></div>`;
    const kut = el.querySelector('.f34-svgk'), kk = el.querySelector('.f34-kaylar');
    const kayCiz = () => {
      kk.innerHTML = sek === 'hiz' ? kay('hiz', 'Akım hızı', 0, 100, 1, ST.hiz) + '<div class="f34-olcek"><span>düşük</span><span>normal</span></div>'
        : sek === 'hct' ? kay('hct', 'Hematokrit', 0.2, 0.6, 0.05, ST.hct)
          : sek === 'isi' ? kay('isi', 'Sıcaklık', 32, 38, 0.5, ST.isi)
            : kay('cap', 'Damar çapı', 0, 100, 1, ST.cap) + `<div class="f34-olcek f34-olcek-c"><span>50 μm</span><span style="left:${r1(Math.log(6) / Math.log(20) * 100)}%">300 μm eşiği</span><span>1000 μm</span></div>`;
      dg();
    };
    const dg = () => {
      const o = kk.querySelector('output'); if (!o) return;
      o.textContent = sek === 'hiz' ? ST.hiz : sek === 'hct' ? vir(ST.hct, 2) : sek === 'isi' ? vir(ST.isi, 1) + ' °C' : Math.round(cap()) + ' μm';
    };
    const birimKur = () => {
      const R = rnd(7 + sek.length * 13);
      birim = [];
      const H = L.vh, span = L.vx1 - L.vx0;
      if (sek === 'hiz') {
        const v = ST.hiz, ru = v < 40 ? Math.round(1 + 4 * (40 - v) / 40) : 0;
        const pairs = Math.floor((26 - ru * 5) / 2), tot = ru + pairs;
        for (let i = 0; i < tot; i++) {
          const isRu = ru > 0 && Math.floor((i + 1) * ru / tot) > Math.floor(i * ru / tot);
          birim.push({ t: isRu ? 'ru' : 'cift', k: 4 + Math.floor(R() * 3), x: (i + 0.5) / tot * span, y: [-0.62, 0.1, 0.7, -0.2, 0.45, -0.75][i % 6] + (R() - 0.5) * 0.12 });
        }
        return;
      }
      let n = sek === 'hct' ? Math.round(ST.hct * 60) : sek === 'isi' ? 26 : Math.round(26 * H / 150) + 4;
      const d = cap(), kat = sek === 'cap' && d < 300 ? 0.08 + 0.17 * (300 - d) / 250 : 0;
      for (let i = 0; i < n; i++) birim.push({ t: 'tek', x: (i + R() * 0.8) / n * span, y: (R() * 2 - 1) * (sek === 'cap' && d < 300 ? (0.5 - kat) * 1.5 : 0.82) });
      L.kat = kat;
    };
    const kur = () => {
      const hct = sek === 'hct';
      L = dar ? { W: 360, vx0: 10, vx1: 350, vcy: 100, vmax: 140 } : { W: 560, vx0: 18, vx1: 380, vcy: 120, vmax: 150 };
      L.vh = sek === 'cap' ? 20 + (L.vmax - 20) * ST.cap / 100 : L.vmax;
      L.H = dar ? (hct ? 452 : 270) : (hct ? 390 : 252);
      L.kat = 0;
      birimKur();
      const vy0 = L.vcy - L.vh / 2, vy1 = L.vcy + L.vh / 2;
      let g = `<defs><clipPath id="f34-vk-clip"><rect x="${L.vx0}" y="${r1(vy0)}" width="${L.vx1 - L.vx0}" height="${r1(L.vh)}"/></clipPath></defs>`;
      g += `<rect class="f34-vk-lum" x="${L.vx0}" y="${r1(vy0)}" width="${L.vx1 - L.vx0}" height="${r1(L.vh)}"/>`;
      if (sek === 'isi') g += `<rect class="f34-vk-soguk" x="${L.vx0}" y="${r1(vy0)}" width="${L.vx1 - L.vx0}" height="${r1(L.vh)}" style="opacity:${r1(clamp((37 - ST.isi) / 5, 0, 1) * 0.85 * 100) / 100}"/>`;
      if (L.kat > 0) { const t = L.kat * L.vh; g += `<rect class="f34-vk-pl" x="${L.vx0}" y="${r1(vy0)}" width="${L.vx1 - L.vx0}" height="${r1(t)}"/><rect class="f34-vk-pl" x="${L.vx0}" y="${r1(vy1 - t)}" width="${L.vx1 - L.vx0}" height="${r1(t)}"/>`; }
      g += `<g clip-path="url(#f34-vk-clip)" class="f34-vk-h"></g>`;
      g += `<path class="f34-vk-duvar" d="M${L.vx0} ${r1(vy0)}H${L.vx1}M${L.vx0} ${r1(vy1)}H${L.vx1}"/>`;
      // üst etiket
      let ust = '';
      if (sek === 'hiz') ust = ST.hiz >= 40 ? 'sialik asit (−) hücreleri iter' : 'düşük akım: rulolar oluşur';
      if (sek === 'hct') ust = `hematokrit ${vir(ST.hct, 2)}`;
      if (sek === 'isi') ust = `${vir(ST.isi, 1)} °C`;
      if (sek === 'cap') ust = `çap ${Math.round(cap())} μm` + (cap() < 300 ? ' · eksenel akış' : '');
      g += T(L.vx0, vy0 - 10, ust, 'f34-t');
      if (sek === 'isi' && ST.isi <= 34) g += `<rect class="f34-rozet-c" x="${L.vx1 - 196}" y="${r1(vy0 - 26)}" width="196" height="22" rx="11"/>` + T(L.vx1 - 98, vy0 - 11, 'kardiyak arrest sonrası soğutma', 'f34-ts f34-clin-t', 'middle');
      if (L.kat > 0) g += T(L.vx1 - 6, vy0 + Math.max(11, L.kat * L.vh * 0.5 + 4), 'hücresiz plazma', 'f34-ts f34-basic-t f34-halo', 'end');
      g += T(L.vx1, vy1 + 16, 'akım →', 'f34-ts', 'end');
      // göstergeler
      const v = visk(), ref = REFV[sek], ok = v > ref + 0.02 ? '↑' : v < ref - 0.02 ? '↓' : '–';
      const ad = sek === 'cap' ? 'görünür viskozite' : 'viskozite';
      const d = cap(), dExp = sek === 'cap' ? clamp(Math.log10(Math.pow(1000 / d, 4)) / Math.log10(Math.pow(20, 4)), 0, 1) * 0.9 + 0.08 : v;
      const dReal = sek === 'cap' ? dExp * (d < 300 ? 1 - 0.35 * (300 - d) / 250 : 1) : v;
      if (!dar) {
        const gx = 410, gy0 = 30, gy1 = 190, gh = gy1 - gy0;
        g += `<rect class="f34-term" x="${gx}" y="${gy0}" width="26" height="${gh}" rx="13"/><rect class="f34-term-d" x="${gx + 4}" y="${r1(gy1 - 4 - (gh - 8) * v)}" width="18" height="${r1((gh - 8) * v)}" rx="9"/>`;
        [[1 / 3, ''], [2 / 3, '']].forEach(([f]) => { g += `<line class="f34-centik" x1="${gx - 4}" x2="${gx + 30}" y1="${r1(gy1 - gh * f)}" y2="${r1(gy1 - gh * f)}"/>`; });
        g += T(gx + 32, gy0 + 24, 'yüksek', 'f34-ts') + T(gx + 32, gy0 + gh / 2 + 4, 'normal', 'f34-ts') + T(gx + 32, gy1 - 18, 'düşük', 'f34-ts');
        g += sek === 'cap' ? T(gx - 4, gy1 + 18, `${ad} ${ok}`, 'f34-t f34-warn-t') : T(gx + 13, gy1 + 18, `${ad} ${ok}`, 'f34-t f34-warn-t', 'middle');
        const rx = 500;
        if (sek === 'cap') {
          g += `<rect class="f34-bar-z" x="${rx}" y="${gy0}" width="18" height="${gh}" rx="4"/><rect class="f34-dr-e" x="${rx}" y="${r1(gy1 - gh * dExp)}" width="18" height="${r1(gh * dExp)}" rx="4"/>`;
          g += `<rect class="f34-bar-z" x="${rx + 24}" y="${gy0}" width="18" height="${gh}" rx="4"/><rect class="f34-bar-d" x="${rx + 24}" y="${r1(gy1 - gh * dReal)}" width="18" height="${r1(gh * dReal)}" rx="4"/>`;
          g += T(rx + 21, gy1 + 34, 'direnç', 'f34-t', 'middle') + T(rx + 9, gy0 - 6, 'r⁴', 'f34-ts', 'middle') + T(rx + 33, gy0 - 6, 'gerçek', 'f34-ts f34-acc-t', 'middle');
        } else {
          g += `<rect class="f34-bar-z" x="${rx + 6}" y="${gy0}" width="22" height="${gh}" rx="4"/><rect class="f34-bar-d" x="${rx + 6}" y="${r1(gy1 - gh * v)}" width="22" height="${r1(gh * v)}" rx="4"/>` + T(rx + 17, gy1 + 18, `direnç ${ok}`, 'f34-t', 'middle');
        }
      } else {
        const by = 196, bx0 = 118, bw = 230;
        g += T(10, by + 11, `${ad} ${ok}`, 'f34-t f34-warn-t') + `<rect class="f34-term" x="${bx0}" y="${by}" width="${bw}" height="14" rx="7"/><rect class="f34-term-d" x="${bx0 + 2}" y="${by + 2}" width="${r1((bw - 4) * v)}" height="10" rx="5"/>`;
        g += T(bx0, by + 28, 'düşük', 'f34-ts') + T(bx0 + bw / 2, by + 28, 'normal', 'f34-ts', 'middle') + T(bx0 + bw, by + 28, 'yüksek', 'f34-ts', 'end');
        const ry = by + 44;
        if (sek === 'cap') {
          g += T(10, ry + 10, 'direnç: r⁴', 'f34-ts') + `<rect class="f34-bar-z" x="${bx0}" y="${ry}" width="${bw}" height="10" rx="5"/><rect class="f34-dr-e" x="${bx0}" y="${ry}" width="${r1(bw * dExp)}" height="10" rx="5"/>`;
          g += T(10, ry + 26, 'gerçek', 'f34-ts f34-acc-t') + `<rect class="f34-bar-z" x="${bx0}" y="${ry + 16}" width="${bw}" height="10" rx="5"/><rect class="f34-bar-d" x="${bx0}" y="${ry + 16}" width="${r1(bw * dReal)}" height="10" rx="5"/>`;
        } else g += T(10, ry + 11, `direnç ${ok}`, 'f34-t') + `<rect class="f34-bar-z" x="${bx0}" y="${ry}" width="${bw}" height="14" rx="7"/><rect class="f34-bar-d" x="${bx0}" y="${ry}" width="${r1(bw * v)}" height="14" rx="7"/>`;
      }
      if (hct) {
        const x0 = dar ? 40 : 60, x1 = dar ? 345 : 540, y0 = dar ? 295 : 252, y1 = dar ? 400 : 350;
        const X = (h) => x0 + (h - 0.2) / 0.4 * (x1 - x0), Y = (f) => y1 - f * 0.86 * (y1 - y0);
        const pts = (fn) => { const a = []; for (let i = 0; i <= 40; i++) { const h = 0.2 + i / 100; a.push([X(h), Y(fn(h))]); } return yol(a); };
        const fl = (h) => Math.exp(-3.333 * (h - 0.2)), ca = (h) => h / 0.6, pr = (h) => (h * Math.exp(-3.333 * h)) / (0.3 * Math.exp(-1));
        g += `<path class="f34-eks" d="M${x0} ${y0 - 6}V${y1}H${x1}"/>`;
        g += `<path class="f34-c-qo" d="${pts(fl)}"/><path class="f34-c-o2" d="${pts(ca)}"/><path class="f34-c-den" d="${pts(pr)}"/>`;
        g += `<line class="f34-kes" x1="${r1(X(0.3))}" x2="${r1(X(0.3))}" y1="${y0 - 6}" y2="${y1}"/>` + T(X(0.3) + 5, y0 - 2, '≈ 0,3 en iyi denge', 'f34-ts f34-halo');
        g += `<line class="f34-imlec-k" x1="${r1(X(ST.hct))}" x2="${r1(X(ST.hct))}" y1="${y0 - 6}" y2="${y1}"/>`;
        [0.2, 0.3, 0.4, 0.5, 0.6].forEach((h) => { g += T(X(h), y1 + 15, vir(h, 1), 'f34-ts', 'middle'); });
        g += T(x1, y1 + 30, 'hematokrit', 'f34-ts', 'end');
        const ly = y1 + (dar ? 48 : 30);
        g += T(x0, ly, 'akım', 'f34-ts f34-acc-t') + T(x0 + 44, ly, 'O₂ taşıma kapasitesi', 'f34-ts f34-crit-t') + (dar ? '' : T(x0 + 200, ly, 'O₂ sunumu (denge, kesikli)', 'f34-ts f34-ink-t'));
        if (dar) g += T(x0, ly + 16, 'O₂ sunumu (denge, kesikli)', 'f34-ts f34-ink-t');
      }
      kut.innerHTML = `<svg class="f34-svg" viewBox="0 0 ${L.W} ${L.H + (hct && dar ? 6 : 0)}" role="img" aria-label="Damar içinde eritrositler ve viskozite göstergesi">${g}</svg>`;
      svg = kut.querySelector('svg'); gHuc = svg.querySelector('.f34-vk-h');
      hucCiz();
    };
    const hucCiz = () => {
      if (!gHuc) return;
      const span = L.vx1 - L.vx0, cy = L.vcy, hh = L.vh / 2; let h = '';
      const isaret = sek === 'hiz' && ST.hiz >= 40;
      const huc = (x, y, cls) => `<ellipse class="${cls || 'f34-huc'}" cx="${r1(x)}" cy="${r1(y)}" rx="3.2" ry="7"/>`;
      birim.forEach((b) => {
        const x = L.vx0 + ((b.x % span) + span) % span, y = cy + b.y * hh;
        if (b.t === 'ru') { for (let i = 0; i < b.k; i++) h += huc(x + (i - b.k / 2) * 4.2, y); }
        else if (b.t === 'cift') {
          h += huc(x - 11, y) + huc(x + 11, y);
          if (isaret) h += T(x, y + 4, '↔', 'f34-it', 'middle') + T(x - 11, y - 10, '−', 'f34-eksi', 'middle') + T(x + 11, y - 10, '−', 'f34-eksi', 'middle');
        } else h += huc(x, y);
      });
      gHuc.innerHTML = h;
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-sek]'); if (!b || b.dataset.sek === sek) return; sek = b.dataset.sek; segSec(el, 'sek', sek); kayCiz(); kur(); capYaz(el, sek === 'hiz' ? (ST.hiz < 40 ? CAPS.hizD : CAPS.hiz) : sek === 'cap' ? (cap() < 300 ? CAPS.capK : CAPS.capB) : CAPS[sek]); });
    el.addEventListener('input', (e) => {
      const k = e.target.dataset.k; if (!k) return; ST[k] = +e.target.value; dg(); kur();
      if (k === 'hiz') capYaz(el, ST.hiz < 40 ? CAPS.hizD : CAPS.hiz);
      if (k === 'cap') capYaz(el, cap() < 300 ? CAPS.capK : CAPS.capB);
    });
    const stopD = darIzle(el, (n) => { dar = n; el.classList.toggle('f34-dar', n); kur(); });
    kayCiz();
    const stopT = ticker(el, (dt) => { if (RM) return; const v = hiz(); birim.forEach((b) => { b.x += v * dt * (b.t === 'ru' ? 0.85 : 1); }); hucCiz(); });
    return () => { stopT(); stopD(); };
  };

  /* =====================================================================
     5 · f34_basinc_akim — rijit boru, esneyen damar, miyojenik plato (K1 s. 149–150)
     ===================================================================== */
  VIZ.f34_basinc_akim = (el) => {
    const EG = {
      ri: { ad: 'Rijit boru', f: (p) => 0.8 * p, cls: 'f34-c-ri' },
      es: { ad: 'Esneyen damar', f: (p) => (p < 0.08 ? 0 : Math.min(1, 1.1 * Math.pow(p - 0.08, 1.6))), cls: 'f34-c-es' },
      mi: { ad: 'Miyojenik yanıt', f: (p) => (p < 0.3 ? 0.32 * Math.pow(p / 0.3, 1.2) : p <= 0.75 ? 0.32 + 0.05 * (p - 0.3) : 0.3425 + 1.6 * Math.pow(p - 0.75, 1.3)), cls: 'f34-c-mi' },
    };
    const CAP = {
      ri: '<b>Rijit boru.</b> Direnç sabit, akım basınçla doğru orantılı. Basıncı kaydırın ve öteki eğrileri açın. [[K1 s. 149]]',
      es: '<b>Esneyen damar.</b> Basınç artınca yarıçap büyür, direnç düşer: akım rijit borudakinden hızlı artar. Basınç sıfıra yaklaşınca (ör. venlerde) damar kollabe olur, akım durur. [[K1 s. 149–150]]',
      mi: '<b>Miyojenik otoregülasyon.</b> Basınç artınca gerilme mekanik kapılı kanalları, ardından voltaj kapılı Ca²⁺ kanallarını açar; arteriol daralır ve akım bir basınç aralığında görece sabit kalır. Beyin, kalp ve böbrekte önemlidir, deride yoktur. [[K1 s. 150]]',
      miD: '<b>Basınç düşünce</b> arteriol genişler (kitap bunu kayma gerilimine bağlar); akım korunur. [[K1 s. 150]]',
      kol: '<b>Kollaps.</b> Basınç sıfıra yaklaşınca damar çöker ve akım durur. [[K1 s. 150]]',
    };
    const acik = { ri: true, es: false, mi: false };
    let son = 'ri', p = 0.5, dar = false, dongu = false, ph = 0, L, svg;
    el.innerHTML = `<div class="f34-ust"><div class="btn-row" role="group" aria-label="Eğriler">${Object.keys(EG).map((k) => `<button type="button" class="btn ghost f34-tog f34-tog-${k}" data-eg="${k}" aria-pressed="${acik[k]}"><i></i>${EG[k].ad}</button>`).join('')}</div></div>
      <div class="f34-svgk"></div>
      <div class="f34-kaylar f34-tek">${kay('p', 'Basınç (göreli)', 0, 1, 0.01, 0.5)}${RM ? '' : '<button type="button" class="btn ghost f34-dongu" aria-pressed="false">Basınç döngüsü</button>'}</div>
      <div class="f34-zincir" hidden></div>`;
    const kut = el.querySelector('.f34-svgk'), zin = el.querySelector('.f34-zincir'), inp = el.querySelector('[data-k="p"]');
    const yaricap = (k, pp) => {
      if (k === 'ri') return { r: 30, cls: '', kol: false };
      if (k === 'es') return pp < 0.08 ? { r: 30, cls: 'f34-kollaps', kol: true } : { r: 18 + 26 * pp, cls: 'f34-gen', kol: false };
      if (pp <= 0.3) return { r: 36 + 20 * (0.3 - pp), cls: 'f34-gen', kol: false };
      if (pp <= 0.75) return { r: 36 - 16 * (pp - 0.3) / 0.45, cls: 'f34-dar-k', kol: false };
      return { r: 20 + 24 * (pp - 0.75) / 0.25, cls: '', kol: false };
    };
    const kur = () => {
      L = dar ? { W: 360, H: 400, x0: 44, x1: 346, y0: 16, y1: 252, ex: 92, ey: 336 } : { W: 560, H: 300, x0: 52, x1: 362, y0: 18, y1: 258, ex: 466, ey: 112 };
      const X = (v) => L.x0 + v * (L.x1 - L.x0), Y = (q) => L.y1 - q * (L.y1 - L.y0);
      L.X = X; L.Y = Y;
      let g = `<path class="f34-eks" d="M${L.x0} ${L.y0 - 6}V${L.y1}H${L.x1 + 6}"/>`;
      g += T(L.x1, L.y1 + 20, 'Basınç →', 'f34-t', 'end') + T(L.x0 - 14, (L.y0 + L.y1) / 2, 'Akım →', 'f34-t', 'middle', `transform="rotate(-90 ${L.x0 - 14} ${(L.y0 + L.y1) / 2})"`);
      Object.keys(EG).forEach((k) => {
        if (!acik[k]) return; const a = [];
        for (let i = 0; i <= 100; i++) { const v = i / 100; a.push([X(v), Y(Math.min(1, EG[k].f(v)))]); }
        g += `<path class="${EG[k].cls}" d="${yol(a)}"/>`;
      });
      if (acik.es) g += `<path class="f34-kol-b" d="M${L.x0} ${L.y1}H${r1(X(0.08))}"/>` + T(X(0.04) + 4, L.y1 - 10, 'kollaps', 'f34-ts f34-basic-t', 'start');
      if (acik.mi) { const yb = Y(0.34) - 16; g += `<path class="f34-ayrac" d="M${r1(X(0.3))} ${r1(yb + 6)}V${r1(yb)}H${r1(X(0.75))}V${r1(yb + 6)}"/>` + T(X(0.525), yb - 6, 'otoregülasyon', 'f34-t f34-acc-t', 'middle'); }
      g += `<g class="f34-ba-dyn"></g>`;
      kut.innerHTML = `<svg class="f34-svg" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Basınç–akım eğrileri ve imleçteki damar kesiti">${g}</svg>`;
      svg = kut.querySelector('svg');
      dyn();
    };
    const dyn = () => {
      let g = `<line class="f34-imlec" x1="${r1(L.X(p))}" x2="${r1(L.X(p))}" y1="${L.y0}" y2="${L.y1}"/>`;
      Object.keys(EG).forEach((k) => { if (acik[k]) g += `<circle class="f34-nokta f34-n-${k}" cx="${r1(L.X(p))}" cy="${r1(L.Y(Math.min(1, EG[k].f(p))))}" r="5"/>`; });
      const y = yaricap(son, p), cx = L.ex, cy = L.ey, wall = 4 + Math.max(0, 40 - y.r) * 0.35;
      if (y.kol) g += `<ellipse class="f34-goz-d ${y.cls}" cx="${cx}" cy="${cy}" rx="${42}" ry="${12}"/><ellipse class="f34-goz-l" cx="${cx}" cy="${cy}" rx="${36}" ry="${3}"/>`;
      else g += `<circle class="f34-goz-d ${y.cls}" cx="${cx}" cy="${cy}" r="${r1(y.r + wall)}"/><circle class="f34-goz-l" cx="${cx}" cy="${cy}" r="${r1(y.r)}"/>`;
      const st = y.kol ? 'kollaps: akım yok' : son === 'ri' ? 'yarıçap sabit' : son === 'es' ? 'basınçla genişler' : p <= 0.3 ? 'genişler: akım korunur' : p <= 0.75 ? 'daralır: akım sabit' : 'plato aşıldı: akım artar';
      const tx = dar ? cx + 62 : cx, ty = dar ? cy - 10 : cy + 72, an = dar ? 'start' : 'middle';
      g += T(tx, ty, EG[son].ad, 'f34-t', an) + T(tx, ty + 18, st, 'f34-ts' + (y.cls === 'f34-dar-k' ? ' f34-warn-t' : y.cls === 'f34-gen' ? ' f34-ok-t' : ''), an);
      g += T(tx, ty + 36, `akım: ${vir(Math.min(1, EG[son].f(p)), 2)} (göreli)`, 'f34-ts', an);
      svg.querySelector('.f34-ba-dyn').innerHTML = g;
      el.querySelector('[data-o="p"]').textContent = vir(p, 2);
      zinCiz();
    };
    let zinD = '';
    const zinCiz = () => {
      const on = son === 'mi'; zin.hidden = !on; if (!on) { zinD = ''; return; }
      const d = p < 0.3 ? 'dn' : p <= 0.75 ? 'up' : 'ust';
      if (d === zinD) return; zinD = d;
      const org = '<div class="f34-org"><span class="tag ok">Beyin ✓</span><span class="tag ok">Kalp ✓</span><span class="tag ok">Böbrek ✓</span><span class="tag crit">Deri ✗</span></div>';
      const zz = d === 'dn' ? ['Basınç ↓', 'Arteriol genişler'] : ['Gerilme ↑', 'Mekanik kapılı iyon kanalları açılır', 'Voltaj kapılı Ca²⁺ kanalları açılır, Ca²⁺ girer', 'Düz kas kasılır: yarıçap ↓'];
      zin.innerHTML = `<ol class="f34-zin ${d === 'dn' ? 'f34-zin-dn' : ''}">${zz.map((s, i) => `<li class="${d === 'ust' ? '' : 'on'}" style="transition-delay:${RM ? 0 : i * 0.25}s">${s}</li>`).join('')}</ol>${d === 'dn' ? '<p class="f34-kucuk">kitap: kayma gerilimi mekanizması</p>' : ''}${org}`;
      if (!RM) { const li = zin.querySelectorAll('li.on'); li.forEach((x) => x.classList.remove('on')); requestAnimationFrame(() => requestAnimationFrame(() => li.forEach((x) => x.classList.add('on')))); }
    };
    const capG = () => {
      if (son === 'mi') return p < 0.3 ? CAP.miD : CAP.mi;
      if (son === 'es' && p < 0.08) return CAP.kol;
      return CAP[son];
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-eg]');
      if (b) {
        const k = b.dataset.eg; acik[k] = !acik[k]; b.setAttribute('aria-pressed', String(acik[k]));
        if (acik[k]) son = k; else if (son === k) son = ['mi', 'es', 'ri'].find((x) => acik[x]) || 'ri';
        kur(); capYaz(el, capG()); return;
      }
      const d = e.target.closest('.f34-dongu');
      if (d) { dongu = !dongu; d.setAttribute('aria-pressed', String(dongu)); d.textContent = dongu ? 'Döngüyü durdur' : 'Basınç döngüsü'; if (dongu) ph = Math.acos(clamp(1 - 2 * p, -1, 1)) / (2 * Math.PI); }
    });
    el.addEventListener('input', (e) => { if (e.target.dataset.k === 'p') { p = +e.target.value; dyn(); capYaz(el, capG()); } });
    const stopD = darIzle(el, (n) => { dar = n; el.classList.toggle('f34-dar', n); kur(); });
    const stopT = ticker(el, (dt) => { if (!dongu) return; ph = (ph + dt / 8) % 1; p = (1 - Math.cos(2 * Math.PI * ph)) / 2; inp.value = p; dyn(); capYaz(el, capG()); });
    return () => { stopT(); stopD(); };
  };

  /* =====================================================================
     6 · f34_agac — iki paralel yatak: akım dağılımı, SVR, kapiller basınç (K1 s. 150)
     ===================================================================== */
  VIZ.f34_agac = (el) => {
    const RK = 0.25, Qd = (r) => 1 / (1 / Math.pow(r, 4) + RK);
    const SVR0 = 1 / (2 * Qd(1));
    const CAP = {
      d: '<b>Dinlenme tonusu.</b> Nabız arterlerde belirgin, kapillerde kaybolmuş. A organının arteriolünü daraltın: o organın akımı ve kapiller basıncı düşer, toplam direnç artar. [[K1 s. 150]]',
      k: '<b>Vazokonstriksiyon.</b> Direnç r⁴ ile çok artar: A’nın akım payı ve kapiller hidrostatik basıncı düşer (sıvı süzülmesi azalır), SVR yükselir; kan B’ye yönelir. [[K1 s. 150]]',
      g: '<b>Vazodilatasyon.</b> A’nın direnci düşer: akım payı ve kapiller basıncı artar (sıvı süzülmesi artar), SVR azalır. [[K1 s. 150]]',
    };
    let rA = 1, dar = false, tt = 0, L, svg, parA = [], parB = [];
    el.innerHTML = `<div class="f34-svgk"></div><div class="f34-kaylar f34-tek">${kay('ton', 'A organının arteriol tonusu', 0, 70, 1, 30)}<div class="f34-olcek"><span>genişleme</span><span>daralma</span></div></div>
      <div class="btn-row f34-btns"><button type="button" class="btn ghost" data-a="sif">Sıfırla</button></div>`;
    const kut = el.querySelector('.f34-svgk');
    for (let i = 0; i < 9; i++) { parA.push({ u: i / 9, y: (i % 3 - 1) * 0.5 }); parB.push({ u: (i + 0.5) / 9, y: ((i + 1) % 3 - 1) * 0.5 }); }
    const kur = () => {
      L = dar ? { W: 360, H: 500, px: [36, 112, 190, 268, 348], py0: 22, py1: 128, ay: 312, Ay: 236, By: 386, x: [8, 46, 76, 140, 152, 236, 262, 300, 352], bar: 'alt' }
        : { W: 560, H: 334, px: [60, 170, 280, 400, 520], py0: 18, py1: 122, ay: 248, Ay: 194, By: 302, x: [16, 80, 112, 186, 196, 290, 318, 350, 400], bar: 'yan' };
      svg = null; ciz();
    };
    const ciz = () => {
      const QA = Qd(rA), QB = Qd(1), PkA = QA * RK, PkB = QB * RK, svr = 1 / (QA + QB) / SVR0, pay = QA / (QA + QB);
      const yP = (P) => L.py1 - (L.py1 - L.py0) * P, disp = (Pk) => 0.1 + Pk * 1.25;
      const [xa, xr, xk, xv, xe] = L.px;
      const prof = (Pk, osc) => {
        const a = [], pc = disp(Pk);
        for (let i = 0; i <= 60; i++) { const x = lerp(xa, xr, i / 60); a.push([x, yP(0.9 + osc * 0.1)]); }
        for (let i = 0; i <= 40; i++) { const f = i / 40, x = lerp(xr, xk, f); a.push([x, yP(lerp(0.9, pc, f) + osc * 0.1 * (1 - f))]); }
        a.push([xv, yP(pc - 0.07)]); a.push([xv + 14, yP(0.06)]); a.push([xe, yP(0.06)]);
        return a;
      };
      const osc = RM ? 0 : Math.sin(tt * 2 * Math.PI);
      let g = '';
      const pb = prof(PkB, osc);
      g += `<path class="f34-golge" d="${yol([[xr, yP(0)], [xr, yP(0.92)], [xk, yP(disp(PkB))], [xk, yP(0)]])}Z"/>`;
      g += T(xr + 4, yP(0.03), 'ana direnç', 'f34-ts f34-warn-t');
      if (RM) { g += `<path class="f34-c-bas" d="${yol(pb.map(([x, y]) => [x, x < xr ? y - 6 : y]))}"/><path class="f34-c-bas" d="${yol(pb.filter(([x]) => x <= xr + 1).map(([x, y]) => [x, y + 6]))}"/>`; }
      else g += `<path class="f34-c-bas" d="${yol(pb)}"/>`;
      if (Math.abs(rA - 1) > 0.02) g += `<path class="f34-c-a" d="${yol(prof(PkA, osc))}"/>` + T(xk + 4, yP(disp(PkA)) + (rA < 1 ? 14 : -6), 'A', 'f34-t f34-warn-t');
      [[xa, 'Arter'], [xr, 'Arteriol'], [xk, 'Kapiller'], [xv, 'Ven']].forEach(([x, s], i) => { const xm = (x + L.px[i + 1]) / 2; g += T(xm, L.py1 + 16, s, 'f34-ts', 'middle'); });
      g += `<path class="f34-eks" d="M${xa} ${L.py0 - 4}V${L.py1}H${xe}"/>` + T(xa - 8, (L.py0 + L.py1) / 2, 'basınç', 'f34-ts', 'middle', `transform="rotate(-90 ${xa - 8} ${(L.py0 + L.py1) / 2})"`);
      // devre
      const [c0, c1, d1, ar1, k0, k1, j1, v0, v1] = L.x, ay = L.ay;
      const yolA = [[c0, ay], [c1, ay], [d1, L.Ay], [k1, L.Ay], [j1, L.Ay], [v0, ay], [v1, ay]];
      const yolB = [[c0, ay], [c1, ay], [d1, L.By], [k1, L.By], [j1, L.By], [v0, ay], [v1, ay]];
      g += `<path class="f34-boru-a" d="M${c0} ${ay}H${c1}"/><path class="f34-boru-v" d="M${v0} ${ay}H${v1}"/>`;
      [[L.Ay, rA, 'A'], [L.By, 1, 'B']].forEach(([y, r, ad], i) => {
        g += `<path class="f34-boru-a f34-boru-i" d="M${c1} ${ay}L${d1} ${y}"/><path class="f34-boru-v f34-boru-i" d="M${j1} ${y}L${v0} ${ay}"/>`;
        g += `<line class="f34-ar ${ad === 'A' ? (r < 0.98 ? 'f34-ar-k' : r > 1.02 ? 'f34-ar-g' : '') : ''}" x1="${d1}" x2="${ar1}" y1="${y}" y2="${y}" style="stroke-width:${r1(11 * r)}px"/>`;
        let m = ''; for (let j = 0; j < 4; j++) { const yy = y - 9 + j * 6; m += `M${k0} ${yy}C${(k0 + k1) / 2 - 10} ${yy - 5} ${(k0 + k1) / 2 + 10} ${yy + 5} ${k1} ${yy}`; }
        m += `M${ar1} ${y}L${k0} ${y - 9}M${ar1} ${y}L${k0} ${y + 9}M${k1} ${y - 9}L${j1} ${y}M${k1} ${y + 9}L${j1} ${y}`;
        g += `<path class="f34-kap" d="${m}"/>`;
        g += T(d1, y - 14, `Organ ${ad}`, 'f34-t' + (ad === 'A' ? ' f34-acc-t' : ''));
        const Pk = ad === 'A' ? PkA : PkB, n = clamp(Math.round(Pk / 0.2 * 3), 0, 7);
        const up = true;
        for (let j = 0; j < n; j++) { const x = k0 + 8 + j * ((k1 - k0 - 16) / 6); g += `<line class="f34-sivi" x1="${r1(x)}" x2="${r1(x)}" y1="${up ? y - 13 : y + 13}" y2="${up ? y - 25 : y + 25}" marker-end="url(#f34-ag-ok)"/>`; }
        const gx = k1 + 4, gh = 30, gy = up ? y - 8 : y - 22;
        g += `<rect class="f34-bar-z" x="${gx}" y="${gy}" width="7" height="${gh}" rx="2"/><rect class="f34-pk" x="${gx}" y="${r1(gy + gh - gh * clamp(Pk / 0.45, 0, 1))}" width="7" height="${r1(gh * clamp(Pk / 0.45, 0, 1))}" rx="2"/>`;
        // akım çubuğu
        const share = ad === 'A' ? pay : 1 - pay;
        if (L.bar === 'yan') { const bx = 412, bw = 110; g += `<rect class="f34-bar-z" x="${bx}" y="${y - 7}" width="${bw}" height="14" rx="7"/><rect class="f34-bar-d" x="${bx}" y="${y - 7}" width="${r1(bw * share)}" height="14" rx="7"/>` + T(bx, y - 13, `akım ${ad} %${Math.round(share * 100)}`, 'f34-ts f34-ink-t'); }
        else { const bx = 76, bw = 200, by = y + (i ? 30 : 26); g += `<rect class="f34-bar-z" x="${bx}" y="${by}" width="${bw}" height="12" rx="6"/><rect class="f34-bar-d" x="${bx}" y="${by}" width="${r1(bw * share)}" height="12" rx="6"/>` + T(bx + bw + 6, by + 11, `%${Math.round(share * 100)}`, 'f34-ts f34-ink-t') + T(bx - 4, by + 11, 'akım', 'f34-ts', 'end'); }
      });
      g += T(L.bar === 'yan' ? 196 : 152, L.Ay - 40, L.bar === 'yan' ? 'kapiller basınç · sıvı süzülmesi' : 'sıvı süzülmesi', 'f34-ts f34-basic-t');
      [[parA, yolA], [parB, yolB]].forEach(([ps, pth]) => { ps.forEach((p) => { const [x, y] = polyAt(pth, p.u); g += `<circle class="f34-rbc" cx="${r1(x)}" cy="${r1(y + p.y * 5)}" r="2.6"/>`; }); });
      const kx = dar ? 10 : 410, ky = dar ? 452 : 228;
      g += `<rect class="f34-kvk" x="${kx}" y="${ky}" width="${dar ? 340 : 140}" height="${dar ? 26 : 40}" rx="8"/>`;
      if (dar) g += T(kx + 10, ky + 18, `Toplam direnç (SVR, göreli): ${svrS(svr)}`, 'f34-t');
      else g += T(kx + 10, ky + 16, 'Toplam direnç', 'f34-ts') + T(kx + 10, ky + 33, `SVR ${svrS(svr)} (göreli)`, 'f34-t f34-acc-t');
      g += T(dar ? 10 : 16, dar ? 492 : 330, 'arter basıncı sabit tutuldu', 'f34-ts');
      g += T(c0, ay - 16, 'arter', 'f34-ts') + T(v1, ay - 16, 'ven', 'f34-ts', 'end');
      const html = `<svg class="f34-svg" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="İki organlı devre: A organının akım payı %${Math.round(pay * 100)}, SVR ${svrS(svr)}"><defs>${okMarker('f34-ag-ok', 'f34-uc-basic', 5)}</defs>${g}</svg>`;
      kut.innerHTML = html;
      el.querySelector('[data-o="ton"]').textContent = `r = ${vir(rA, 2).replace(/^(\d)$/, '$1,0')} (göreli)`;
      L.QA = QA; L.QB = QB;
    };
    const svrS = (v) => { const s = v.toFixed(2).replace('.', ','); return s; };
    const polyAt = (pts, u) => {
      let tot = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); tot += d; }
      let s = u * tot; for (let i = 0; i < seg.length; i++) { if (s <= seg[i]) { const f = s / seg[i]; return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; } s -= seg[i]; }
      return pts[pts.length - 1];
    };
    const capG = () => (rA < 0.9 ? CAP.k : rA > 1.1 ? CAP.g : CAP.d);
    el.addEventListener('input', (e) => { if (e.target.dataset.k === 'ton') { rA = 1.3 - (+e.target.value) / 100; ciz(); capYaz(el, capG()); } });
    el.addEventListener('click', (e) => { if (e.target.closest('[data-a="sif"]')) { rA = 1; el.querySelector('[data-k="ton"]').value = 30; ciz(); capYaz(el, capG()); } });
    const stopD = darIzle(el, (n) => { dar = n; el.classList.toggle('f34-dar', n); kur(); });
    const stopT = ticker(el, (dt) => {
      if (RM) return; tt = (tt + dt) % 1;
      parA.forEach((p) => { p.u = (p.u + dt * 0.11 * L.QA) % 1; }); parB.forEach((p) => { p.u = (p.u + dt * 0.11 * L.QB) % 1; });
      ciz();
    });
    return () => { stopT(); stopD(); };
  };

  /* =====================================================================
     7 · f34_kontrol — yerel, hümoral, sinirsel etkenler (K1 s. 150–151)
     ===================================================================== */
  VIZ.f34_kontrol = (el) => {
    const ORG = [['deri', 'Deri', 0.9, 0], ['bag', 'Bağırsak', 0.9, 0], ['bob', 'Böbrek', 0.9, 0], ['bey', 'Beyin', 0.25, 0], ['kalp', 'Kalp', 0.25, 0.9], ['kas', 'İskelet kası', 0, 0.9]];
    /* yön: k daralma, g genişleme, o organa göre; org: {id: işaret}; kay: kaynak simgesi */
    const E = [
      ['YEREL', 'mi', 'Basınç ↑ (miyojenik)', 'k', { bey: '✓', kalp: '✓', bob: '✓', deri: '✗' }, '', 'basınç', 'otoregülasyon: ✓ var · ✗ yok', '<b>Miyojenik otoregülasyon.</b> Damar içi basınç artınca arteriol daralır, düşünce genişler: akım sabit kalır. Beyin, kalp ve böbrekte önemli, deride yok. [[K1 s. 150]]'],
      ['YEREL', 'me', 'Metabolitler', 'g', {}, '', 'met', '', '<b>Metabolitler.</b> Metabolizma artınca PO₂ düşer, CO₂, H⁺ ve laktat artar; arteriol genişler ve O₂ sunumu artar. Reaktif hiperemi (ör. turnike indirilince) büyük olasılıkla bu yolla olur. [[K1 s. 150]]'],
      ['HÜMORAL', 'ki', 'Kininler', 'g', { deri: '↑', bag: '↑' }, '', 'kan', 'tükürük bezleri', '<b>Kininler</b> (ör. bradikinin) tükürük bezleri, bağırsak ve deride vazodilatasyon yapar. [[K1 s. 150]]'],
      ['HÜMORAL', 'hi', 'Histamin', 'g', {}, '', 'mast', 'alerjide yaygın', '<b>Histamin</b> bazofil ve mast hücrelerinden enflamasyonda salınır; etkilenen dokuda akımı artırır. Alerjide sistemik salınım yaygın arteriol genişlemesi yapar. [[K1 s. 150]]'],
      ['HÜMORAL', 'no', 'NO', 'g', {}, '', 'endo', 'venleri de genişletir', '<b>Nitrik oksit</b> (eski adıyla endotel kaynaklı gevşetici faktör) kayma gerilimiyle endotelden salınır ve güçlü vazodilatördür; venleri de genişletir: kanülasyondan önce vene vurmanın mekanizması. [[K1 s. 150]]'],
      ['HÜMORAL', 'se', 'Serotonin, TXA₂', 'k', {}, '', 'trom', 'kesilen damar', '<b>Serotonin ve tromboksan A₂</b> aktive trombositlerden salınır, arteriolleri daraltır; akım azalır ve pıhtı yıkanmadan oluşur. [[K1 s. 151]]'],
      ['HÜMORAL', 'ad', 'Adrenalin', 'o', { deri: '↓', bag: '↓', kalp: '↑', kas: '↑' }, 'r', 'kan', '', '<b>Adrenalin</b> α1 ile daraltır, β2 ile genişletir; sonuç organın reseptör oranına bağlıdır: bağırsak ve deride daralma, kalp ve iskelet kasında genişleme. [[K1 s. 151]]'],
      ['HÜMORAL', 'adh', 'ADH', 'k', {}, '', 'hip', 'kanamada önemli', '<b>ADH</b> (arginin vazopresin) düşük plazma hacmi ve yüksek osmolaritede arka hipofizden salınır; güçlü vazokonstriktördür. Sağlıkta önemsiz, kanamada basıncı korur; septik şokta düzeyi görece düşüktür ve yoğun bakımda kullanılır. [[K1 s. 151]]'],
      ['HÜMORAL', 'at', 'Anjiyotensin II', 'k', {}, '', 'kan', '', '<b>Anjiyotensin II</b> güçlü arteriol vazokonstriktörüdür; ADH ve ANP ile birlikte asıl işi kan hacmi ve total vücut suyunun denetimidir. [[K1 s. 151]]'],
      ['HÜMORAL', 'anp', 'ANP', 'g', {}, '', 'kan', 'vazokonstriktörlere duyarlılık ↓', '<b>ANP</b> arteriolleri genişletir ve öteki vazokonstriktörlere duyarlılıklarını azaltır. [[K1 s. 151]]'],
      ['SİNİRSEL', 'sy', 'Sempatik (noradrenalin)', 'o', { deri: '↓', bob: '↓', bag: '↓', bey: '–', kalp: '–' }, 'r', 'sinir', '', '<b>Sempatik uyarı</b> postganglionik uçtan noradrenalin salar; α1 ile daraltır, β2’yi zayıf uyarır. Bazal çıkış istirahat tonusunu belirler. Deri, böbrek ve bağırsak daralır, beyin ve kalp pek etkilenmez: kan hayati organlara yönelir. [[K1 s. 151]]'],
      ['SİNİRSEL', 'pa', 'Parasempatik', 'g', {}, '', 'sinir', 'yalnız penis: ereksiyon', '<b>Parasempatik denetim</b> arteriol tonusunda yalnız peniste vardır: vazodilatasyon ve ereksiyon. [[K1 s. 151]]'],
      ['SİNİRSEL', 'sk', 'Sempatik kolinerjik', 'g', { kas: '↑' }, '', 'sinir', 'ekrin ter bezi de kolinerjik', '<b>Sempatik kolinerjik yol</b> iskelet kası arteriollerinde bulunur; egzersiz başlangıcı ya da beklentisi, korku, öfke ve ağrıda postganglionik uçtan ACh salınır; kas akımı belirgin artar. [[K1 s. 151]]'],
    ];
    const CAP0 = '<b>Bir etken seçin.</b> Arteriol çapı ve etkilenen organlar şemada belirir. Adrenalin ve sempatik uyarı için organ haritasına bakın. [[K1 s. 150–151]]';
    const KAY = { basınç: 'damar içi basınç', met: 'doku metabolizması', kan: 'kanla gelen hormon', mast: 'mast hücresi, bazofil', endo: 'endotel', trom: 'aktive trombosit', hip: 'arka hipofiz', sinir: 'sinir ucu' };
    let sec = null, dar = false;
    const gruplar = ['YEREL', 'HÜMORAL', 'SİNİRSEL'];
    el.innerHTML = `<div class="f34-kon-g"><div class="f34-etk">${gruplar.map((gr) => `<div class="f34-etk-gr"><span class="f34-etk-b">${gr}</span>${E.filter((e) => e[0] === gr).map((e) => `<button type="button" class="f34-etk-btn" data-e="${e[1]}" aria-pressed="false">${e[2]}</button>`).join('')}</div>`).join('')}</div>
      <div class="f34-kon-s"><div class="f34-svgk"></div><p class="f34-rozetler"></p></div></div>`;
    const kut = el.querySelector('.f34-svgk'), roz = el.querySelector('.f34-rozetler');
    let ilk = true;
    const ciz = () => {
      const e = sec ? E.find((x) => x[1] === sec) : null;
      const W = 360, H = dar ? 474 : 300, cx = dar ? 180 : 86, cy = dar ? 112 : 140, R0 = 40, RO = 64;
      const yon = e ? e[3] : null, sc = yon === 'k' ? 0.6 : yon === 'g' ? 1.4 : 1;
      let g = '';
      g += `<circle class="f34-kon-ext" cx="${cx}" cy="${cy}" r="${RO + 8}"/><circle class="f34-kon-kas ${yon === 'k' ? 'f34-kk' : yon === 'g' ? 'f34-kg' : ''}" cx="${cx}" cy="${cy}" r="${RO}"/>`;
      g += `<g transform="translate(${cx} ${cy})"><g class="f34-kon-lg" style="transform:scale(${ilk ? 1 : sc});${RM ? 'transition:none' : ''}"><circle class="f34-int" r="${R0 + 2}" style="stroke-width:3px"/><circle class="f34-lum" r="${R0}"/></g></g>`;
      const yl = yon === 'k' ? 'DARALMA' : yon === 'g' ? 'GENİŞLEME' : yon === 'o' ? 'organa göre değişir' : 'nötr';
      g += T(cx, cy + RO + 36, yl, 'f34-yon' + (yon === 'k' ? ' f34-warn-t' : yon === 'g' ? ' f34-ok-t' : yon === 'o' ? ' f34-acc-t' : ' f34-mut-t'), 'middle');
      if (e) {
        const ky = cy - RO - (dar ? 22 : 26);
        if (e[6] === 'met') g += T(cx, ky - 14, 'PO₂ ↓, CO₂ ↑,', 'f34-ts f34-ink-t', 'middle') + T(cx, ky + 2, 'H⁺ ↑, laktat ↑', 'f34-ts f34-ink-t', 'middle');
        else g += `<circle class="f34-kay-s" cx="${r1(cx - 6 - KAY[e[6]].length * (dar ? 4 : 3.7))}" cy="${ky - 4}" r="5"/>` + T(cx + 2, ky, KAY[e[6]], 'f34-ts f34-ink-t', 'middle');
        g += `<line class="f34-kay-ok" x1="${cx}" x2="${cx}" y1="${ky + 6}" y2="${cy - RO - 2}" marker-end="url(#f34-kn-ok)"/>`;
      }
      // organ haritası
      const cols = dar ? 3 : 2, bw = dar ? 112 : 86, bh = dar ? 104 : 82, gx = dar ? 4 : 184, gy = dar ? 236 : 10, gap = dar ? 6 : 6;
      const reseptor = e && e[5] === 'r';
      ORG.forEach(([id, ad, a1, b2], i) => {
        const x = gx + (i % cols) * (bw + gap), y = gy + Math.floor(i / cols) * (bh + gap);
        const mk = e ? e[4][id] : null, aktif = !!mk;
        g += `<g class="f34-orgk ${e && !aktif ? 'soluk' : ''} ${aktif ? 'vurgu' : ''}"><rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="8"/>`;
        g += T(x + 8, y + 18, ad, 'f34-t');
        const bo = reseptor ? 1 : 0.3, bl = bw - 46;
        if (a1) g += `<g style="opacity:${bo}">${T(x + 8, y + 38, 'α1', 'f34-ts')}<rect class="f34-a1" x="${x + 30}" y="${y + 29}" width="${r1(bl * a1)}" height="10" rx="3"/></g>`;
        if (b2) g += `<g style="opacity:${bo}">${T(x + 8, y + 56, 'β2', 'f34-ts')}<rect class="f34-b2" x="${x + 30}" y="${y + 47}" width="${r1(bl * b2)}" height="10" rx="3"/></g>`;
        if (mk) { const cl = mk === '↓' ? 'f34-warn-t' : mk === '↑' || mk === '✓' ? 'f34-ok-t' : mk === '✗' ? 'f34-crit-t' : 'f34-mut-t'; g += T(x + bw - 10, y + bh - 10, mk, 'f34-isaret ' + cl, 'end'); }
        g += '</g>';
      });
      kut.innerHTML = `<svg class="f34-svg" viewBox="0 0 ${W} ${dar ? H : 276}" role="img" aria-label="${e ? e[2] + ': ' + yl : 'Arteriol kesiti ve organ haritası'}"><defs>${okMarker('f34-kn-ok', 'f34-uc-mut', 5)}</defs>${g}</svg>`;
      if (ilk) { ilk = false; } else if (!RM) { const lg = kut.querySelector('.f34-kon-lg'); lg.style.transform = 'scale(' + (lastSc) + ')'; requestAnimationFrame(() => requestAnimationFrame(() => { lg.style.transform = 'scale(' + sc + ')'; })); }
      lastSc = sc;
      roz.innerHTML = (e && e[7] ? `<span class="tag clin">${e[7]}</span>` : '') + '<span class="f34-kucuk">↓ daralma · ↑ genişleme · – az etki</span>';
    };
    let lastSc = 1;
    el.addEventListener('click', (ev) => { const b = ev.target.closest('[data-e]'); if (!b) return; sec = b.dataset.e; segSec(el, 'e', sec); ciz(); capYaz(el, E.find((x) => x[1] === sec)[8]); });
    const stopD = darIzle(el, (n) => { dar = n; el.classList.toggle('f34-dar', n); ciz(); });
    capYaz(el, CAP0);
    return () => { stopD(); };
  };

  /* =====================================================================
     8 · f34_svr — SVR = 80 × (MAP − RAP)/CO (K1 s. 151–153)
     ===================================================================== */
  VIZ.f34_svr = (el) => {
    const v = { map: 100, rap: 2, co: 5 };
    let dar = false, svg, gPar, yolE, uz = 0, par = Array.from({ length: 22 }, (_, i) => i / 22), ilk = true;
    el.innerHTML = `<div class="f34-svgk"></div><p class="f34-hesap f34-q" aria-live="off"></p>
      <div class="f34-kaylar">${kay('map', 'MAP (mmHg)', 40, 140, 1, 100)}${kay('rap', 'RAP (mmHg)', 0, 20, 1, 2)}${kay('co', 'CO (L/dk)', 2, 10, 0.5, 5)}</div>
      <div class="btn-row f34-btns"><button type="button" class="btn ghost" data-o2="tip">Tipik değerler</button><button type="button" class="btn ghost" data-o2="dil">Vazodilatasyon (MAP 65, RAP 2, CO 7)</button><button type="button" class="btn ghost" data-o2="kon">Vazokonstriksiyon (MAP 100, RAP 2, CO 3,5)</button></div>`;
    const kut = el.querySelector('.f34-svgk'), hes = el.querySelector('.f34-hesap');
    const svrH = () => Math.round(80 * (v.map - v.rap) / v.co);
    const kur = () => {
      const W = dar ? 360 : 560, H = dar ? 214 : 204;
      const lx0 = dar ? 12 : 20, lx1 = dar ? 66 : 92, yt = 46, yb = 166, rx = dar ? 318 : 486, mx = dar ? 190 : 330;
      const S = svrH(), tw = clamp(6 * Math.sqrt(1568 / S), 2.5, 12);
      let g = `<defs>${okMarker('f34-sv-ok', 'f34-uc-acc', 6)}</defs>`;
      g += `<path class="f34-sv-art" d="M${lx1} ${yt}H${rx}"/><path class="f34-sv-ven" d="M${rx} ${yb}H${lx1}"/>`;
      for (let i = 0; i < 5; i++) { const x = rx - 24 + i * 12; g += `<line class="f34-sv-tup" x1="${x}" x2="${x}" y1="${yt + 6}" y2="${yb - 6}" style="stroke-width:${r1(tw)}px"/>`; }
      g += `<path class="f34-sv-bas" d="M${rx - 30} ${yt + 6}H${rx + 30}M${rx - 30} ${yb - 6}H${rx + 30}"/>`;
      g += `<rect class="f34-sv-lv" x="${lx0}" y="${yt - 22}" width="${lx1 - lx0}" height="46" rx="10"/>` + T((lx0 + lx1) / 2, yt + 6, 'LV', 'f34-t', 'middle');
      g += `<rect class="f34-sv-ra" x="${lx0}" y="${yb - 24}" width="${lx1 - lx0}" height="46" rx="10"/>` + T((lx0 + lx1) / 2, yb + 4, 'RA', 'f34-t', 'middle');
      g += `<path class="f34-sv-kalp" d="M${(lx0 + lx1) / 2} ${yb - 24}V${yt + 24}"/>` + T((lx0 + lx1) / 2 + 6, (yt + yb) / 2 + 4, dar ? '' : 'kalp', 'f34-ts');
      g += T((lx1 + mx) / 2, yt - 10, 'MAP', 'f34-t f34-crit-t', 'middle') + T((lx1 + mx) / 2, yb + 22, 'RAP', 'f34-t f34-basic-t', 'middle');
      g += T(lx1 + 10, yt + 22, 'CO (akım) →', 'f34-ts f34-q');
      g += dar ? T(rx, yt - 10, 'SVR', 'f34-t f34-acc-t', 'middle') : T(rx + 36, (yt + yb) / 2 + 4, 'SVR', 'f34-t f34-acc-t');
      g += `<line class="f34-sv-fark" x1="${mx}" x2="${mx}" y1="${yt + 10}" y2="${yb - 10}" marker-start="url(#f34-sv-ok)" marker-end="url(#f34-sv-ok)"/>`;
      g += T(mx + 10, (yt + yb) / 2 - 4, 'MAP − RAP', 'f34-ts') + T(mx + 10, (yt + yb) / 2 + 15, `${v.map - v.rap} mmHg`, 'f34-t f34-acc-t');
      g += `<path class="f34-sv-yol" d="M${lx1} ${yt}H${rx}V${yb}H${lx1}"/><g class="f34-sv-par"></g>`;
      kut.innerHTML = `<svg class="f34-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Darcy yasası devresi: MAP ${v.map}, RAP ${v.rap} mmHg, CO ${vir(v.co, 1)} L/dk, SVR ${S}">${g}</svg>`;
      svg = kut.querySelector('svg'); gPar = svg.querySelector('.f34-sv-par'); yolE = svg.querySelector('.f34-sv-yol');
      uz = yolE.getTotalLength ? yolE.getTotalLength() : 0;
      parCiz();
      hes.innerHTML = `SVR = 80 × (${v.map} − ${v.rap}) / ${vir(v.co, 1)} = <b>${S} dyn·s·cm⁻⁵</b><span class="f34-kucuk">80 = birim dönüşüm katsayısı</span>`;
      el.querySelector('[data-o="map"]').textContent = v.map; el.querySelector('[data-o="rap"]').textContent = v.rap; el.querySelector('[data-o="co"]').textContent = vir(v.co, 1);
      if (ilk) ilk = false;
    };
    const parCiz = () => { if (!uz || !gPar) return; gPar.innerHTML = par.map((u) => { const pt = yolE.getPointAtLength(u * uz); return `<circle class="f34-rbc" cx="${r1(pt.x)}" cy="${r1(pt.y)}" r="3"/>`; }).join(''); };
    const capG = () => {
      const S = svrH();
      if (v.map === 100 && v.rap === 2 && v.co === 5) return '<b>Tipik değerler.</b> MAP 100 mmHg, RAP 2 mmHg, CO 5 L/dk: SVR = 80 × 98 / 5 = 1568 dyn·s·cm⁻⁵. Değerleri değiştirin. [[K1 s. 152]]';
      return `<b>SVR = 80 × (MAP − RAP) / CO</b> = 80 × (${v.map} − ${v.rap}) / ${vir(v.co, 1)} = <b>${S} dyn·s·cm⁻⁵</b>. Basınç farkı sabitken CO artarsa SVR düşer; aynı CO’da basınç farkı artarsa SVR yükselir. [[K1 s. 151–152]]` + (v.rap > 10 ? ' RAP büyüdüğünde (ör. sağ ventrikül yetmezliği) MAP ≈ CO × SVR yaklaşımı bozulur. [[K1 s. 153]]' : '');
    };
    const ata = (m, r, c) => { v.map = m; v.rap = r; v.co = c; ['map', 'rap', 'co'].forEach((k) => { el.querySelector(`[data-k="${k}"]`).value = v[k]; }); kur(); capYaz(el, capG()); };
    el.addEventListener('input', (e) => { const k = e.target.dataset.k; if (!k) return; v[k] = +e.target.value; kur(); capYaz(el, capG()); });
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-o2]'); if (!b) return; const o = b.dataset.o2; if (o === 'tip') ata(100, 2, 5); else if (o === 'dil') ata(65, 2, 7); else ata(100, 2, 3.5); });
    const stopD = darIzle(el, (n) => { dar = n; el.classList.toggle('f34-dar', n); kur(); });
    const stopT = ticker(el, (dt) => { if (RM || !uz) return; par = par.map((u) => (u + dt * v.co * 0.012) % 1); parCiz(); });
    return () => { stopT(); stopD(); };
  };

  /* =====================================================================
     9 · f34_dalga — SBP, DBP ve MAP; taşikardide formülün sapması (K1 s. 152–153)
     ===================================================================== */
  VIZ.f34_dalga = (el) => {
    const TS = 1 / 3;
    const bas = (tau, HR) => {
      const T0 = 60 / HR;
      if (tau < TS) { const u = tau / TS; if (u < 0.38) return 80 + 40 * Math.sin(Math.PI / 2 * u / 0.38); return 120 - 23 * Math.pow((u - 0.38) / 0.62, 1.3); }
      const td = tau - TS, Td = T0 - TS, k = 0.35, Ex = Math.exp(-Td / k);
      let b = 80 + 17 * (Math.exp(-td / k) - Ex) / (1 - Ex); const w = Math.min(0.12, Td); if (td < w) b += 4 * Math.sin(Math.PI * td / w);
      return b;
    };
    const ort = (HR) => { const T0 = 60 / HR; let s = 0; const n = 1200; for (let i = 0; i < n; i++) s += bas((i + 0.5) / n * T0, HR); return s / n; };
    const MF = 80 + 40 / 3;
    let HR = 60, oyn = false, sw = 3, dar = false, svg, L;
    el.innerHTML = `<div class="f34-svgk"></div><div class="f34-kaylar f34-tek">${kay('hr', 'Kalp hızı (/dk)', 50, 160, 5, 60)}${RM ? '' : '<button type="button" class="btn f34-oyn" aria-pressed="false">Oynat</button>'}</div><dl class="kv f34-deg"></dl>`;
    const kut = el.querySelector('.f34-svgk'), deg = el.querySelector('.f34-deg'), bO = el.querySelector('.f34-oyn');
    const ciz = () => {
      L = dar ? { W: 360, H: 262, x0: 46, x1: 350, y0: 14, y1: 226 } : { W: 560, H: 256, x0: 56, x1: 540, y0: 14, y1: 216 };
      const X = (t) => L.x0 + t / 3 * (L.x1 - L.x0), Y = (p) => L.y1 - (p - 60) / 70 * (L.y1 - L.y0);
      const T0 = 60 / HR, MA = ort(HR);
      let g = `<defs><clipPath id="f34-dl-clip"><rect class="f34-dl-cr" x="${L.x0}" y="0" width="${L.x1 - L.x0}" height="${L.H}"/></clipPath></defs>`;
      for (let c = 0; c * T0 < 3; c++) { const a = c * T0, b = Math.min(3, a + TS), e = Math.min(3, a + T0); g += `<rect class="f34-sis" x="${r1(X(a))}" y="${L.y0}" width="${r1(X(b) - X(a))}" height="${L.y1 - L.y0}"/>`; if (e > b) g += `<rect class="f34-dia" x="${r1(X(b))}" y="${L.y0}" width="${r1(X(e) - X(b))}" height="${L.y1 - L.y0}"/>`; }
      [60, 80, 100, 120].forEach((p) => { g += `<line class="f34-izgara" x1="${L.x0}" x2="${L.x1}" y1="${r1(Y(p))}" y2="${r1(Y(p))}"/>` + T(L.x0 - 6, Y(p) + 4, p, 'f34-ts', 'end'); });
      [0, 1, 2, 3].forEach((t) => { g += T(X(t), L.y1 + 16, t, 'f34-ts', 'middle'); });
      g += T(L.x1, L.y1 + 32, 'Zaman (s)', 'f34-ts', 'end') + T(14, (L.y0 + L.y1) / 2, 'Basınç (mmHg)', 'f34-ts', 'middle', `transform="rotate(-90 14 ${(L.y0 + L.y1) / 2})"`);
      g += `<path class="f34-eks" d="M${L.x0} ${L.y0}V${L.y1}H${L.x1}"/>`;
      const pts = []; for (let i = 0; i <= 600; i++) { const t = i / 600 * 3; pts.push([X(t), Y(bas(t % T0, HR))]); }
      const a1 = []; for (let i = 0; i <= 120; i++) { const t = i / 120 * T0; a1.push([X(t), Y(bas(t, HR))]); }
      g += `<path class="f34-alan" d="${yol(a1)}L${r1(X(T0))} ${L.y1}L${L.x0} ${L.y1}Z"/>`;
      g += `<g clip-path="url(#f34-dl-clip)"><path class="f34-c-bas" d="${yol(pts)}"/></g>`;
      g += `<line class="f34-l-sbp" x1="${L.x0}" x2="${L.x1}" y1="${r1(Y(120))}" y2="${r1(Y(120))}"/><line class="f34-l-dbp" x1="${L.x0}" x2="${L.x1}" y1="${r1(Y(80))}" y2="${r1(Y(80))}"/>`;
      g += `<line class="f34-l-mf" x1="${L.x0}" x2="${L.x1}" y1="${r1(Y(MF))}" y2="${r1(Y(MF))}"/><line class="f34-l-ma" x1="${L.x0}" x2="${L.x1}" y1="${r1(Y(MA))}" y2="${r1(Y(MA))}"/>`;
      g += T(L.x1 - 2, Y(120) - 5, 'SBP 120', 'f34-ts f34-crit-t f34-halo', 'end') + T(L.x1 - 2, Y(80) + 15, 'DBP 80', 'f34-ts f34-basic-t f34-halo', 'end');
      const yMa = Y(MA), yMf = Y(MF), ayr = Math.abs(yMa - yMf) < 15;
      g += T(L.x1 - 2, (ayr ? Math.min(yMa, yMf) : yMa) - 5, `MAP (alan) ${Math.round(MA)}`, 'f34-ts f34-acc-t f34-halo f34-kalin', 'end');
      g += T(L.x1 - 2, (ayr ? Math.max(yMa, yMf) + 14 : yMf + 14), 'MAP (formül) 93', 'f34-ts f34-acc-t f34-halo', 'end');
      g += T(X(TS / 2), L.y0 + 14, 'Sistol', 'f34-ts f34-warn-t', 'middle');
      if (T0 - TS > 0.25) g += T(X(TS + (T0 - TS) / 2), L.y0 + 14, 'Diyastol', 'f34-ts f34-basic-t', 'middle');
      g += `<line class="f34-tarama" x1="0" x2="0" y1="${L.y0}" y2="${L.y1}" style="display:none"/>`;
      kut.innerHTML = `<svg class="f34-svg" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Arter basınç dalgası, kalp hızı ${HR}/dk: SBP 120, DBP 80, MAP alan ${Math.round(MA)}, formül 93 mmHg">${g}</svg>`;
      svg = kut.querySelector('svg'); L.X = X;
      const fark = Math.round(MA) - 93;
      deg.innerHTML = `<div><dt>SBP</dt><dd>120 mmHg</dd></div><div><dt>DBP</dt><dd>80 mmHg</dd></div><div><dt>PP</dt><dd>40 mmHg</dd></div><div><dt>MAP (formül)</dt><dd>93 mmHg</dd></div><div><dt>MAP (alan)</dt><dd><b>${Math.round(MA)} mmHg</b></dd></div><div><dt>Fark</dt><dd class="${Math.abs(fark) >= 3 ? 'f34-warn-c' : ''}">${fark > 0 ? '+' : fark < 0 ? '−' : ''}${Math.abs(fark)} mmHg</dd></div>`;
      el.querySelector('[data-o="hr"]').textContent = HR;
      tarama();
    };
    const tarama = () => {
      const cr = svg.querySelector('.f34-dl-cr'), ln = svg.querySelector('.f34-tarama');
      if (!oyn) { cr.setAttribute('width', L.x1 - L.x0); ln.style.display = 'none'; return; }
      const x = L.X(sw); cr.setAttribute('width', r1(Math.max(0, x - L.x0))); ln.style.display = ''; ln.setAttribute('x1', r1(x)); ln.setAttribute('x2', r1(x));
    };
    const capG = () => (HR <= 75 ? '<b>Kalp hızı 60/dk.</b> Dinlenmede diyastol sistolün yaklaşık iki katı sürer; DBP + 1/3 PP ile eğri altındaki alandan bulunan MAP yaklaşık örtüşür. Kalp hızını artırın. [[K1 s. 152]]'.replace('60/dk', HR + '/dk')
      : HR <= 110 ? `<b>Kalp hızı ${HR}/dk.</b> Diyastol kısalıyor, sistolün siklustaki payı büyüyor: alan ortalaması formülün üstüne çıkmaya başlar. [[K1 s. 152]]`
        : '<b>Taşikardi.</b> “Siklusun üçte biri sistol” varsayımı bozulur; DBP + 1/3 PP gerçek MAP’i olduğundan düşük gösterir. Eğri altındaki alanı siklus süresine bölen invaziv hesap her kalp hızında doğrudur; osilometrik cihazda hesaplanan DBP de taşikardide yanlış olabilir. [[K1 s. 152–153]]');
    el.addEventListener('input', (e) => { if (e.target.dataset.k === 'hr') { HR = +e.target.value; ciz(); capYaz(el, capG()); } });
    el.addEventListener('click', (e) => { if (e.target.closest('.f34-oyn')) { oyn = !oyn; sw = 0; bO.textContent = oyn ? 'Duraklat' : 'Oynat'; bO.setAttribute('aria-pressed', String(oyn)); tarama(); } });
    const stopD = darIzle(el, (n) => { dar = n; el.classList.toggle('f34-dar', n); ciz(); });
    const stopT = ticker(el, (dt) => { if (!oyn) return; sw += dt; if (sw > 3.4) sw = 0; tarama(); });
    return () => { stopT(); stopD(); };
  };

  /* =====================================================================
     10 · f34_map — MAP'in belirleyicileri ve dört klinik tablo (K1 s. 153)
     ===================================================================== */
  VIZ.f34_map = (el) => {
    const AD = { map: 'MAP', co: 'CO', svr: 'SVR', hr: 'HR', sv: 'SV', on: 'Ön yük', kon: 'Kontraktilite', art: 'Art yük' };
    const BES = ['on', 'kon', 'art', 'hr', 'svr'];
    const TB = {
      bes: { ad: 'Beş etken', sor: {}, not: [], mud: [], cap: '<b>Beş etken.</b> MAP ≈ CO × SVR; CO = HR × SV; SV ön yük, kontraktilite ve art yüke bağlı. Bir klinik tablo seçin: hangi etken değişiyor, hangi ilaç neyi düzeltiyor? [[K1 s. 153]]' },
      blok: { ad: 'Nöroaksiyel blok', sor: { svr: '↓', map: '↓' }, not: ['SVR ↓: blok altında sempatik ↓'], mud: [['Fenilefrin (α1 agonisti)', [['svr', '↑']]], ['Metaraminol (doğrudan + dolaylı α1, biraz β)', [['svr', '↑']]]],
        cap: '<b>Nöroaksiyel blok.</b> Blok düzeyinin altında sempatik aktivite azalır, arterioller genişler; SVR ve MAP düşer. SVR’yi artıran vazopresörler verilir: fenilefrin, metaraminol. [[K1 s. 153]]' },
      sep: { ad: 'Septik şok', sor: { on: '↓', sv: '↓', co: '↓', svr: '↓', map: '↓' }, not: ['Ön yük ↓: sıvı interstisyuma kaçar', 'SVR ↓: vazodilatör enflamatuvar aracılar'], mud: [['Sıvı resüsitasyonu', [['on', '↑']]], ['Noradrenalin', [['svr', '↑']]], ['Vazopresin', [['svr', '↑']]]],
        cap: '<b>Septik şok</b> iki yolla hipotansiyon yapar: sıvı kaçağı ön yükü, SV’yi ve CO’yu düşürür; enflamatuvar aracılar SVR’yi düşürür. Tedavi sıvı ve vazopresördür (noradrenalin, vazopresin). [[K1 s. 153]]' },
      kar: { ad: 'Kardiyojenik şok', sor: { kon: '↓', sv: '↓', co: '↓', map: '↓' }, not: ['Kontraktilite ↓: LV disfonksiyonu'], mud: [['Dobutamin (β1 agonisti)', [['kon', '↑']]], ['Adrenalin (düşük-orta doz: β1, β2)', [['kon', '↑']]], ['İntraaortik balon pompası · koroner perfüzyon ↑', [['art', '↓'], ['co', '↑']]]],
        cap: '<b>Kardiyojenik şok.</b> LV disfonksiyonunda pozitif inotroplar (dobutamin, adrenalin) kontraktiliteyi ve MAP’i artırır; intraaortik balon pompası ileri akımı artırır, art yükü azaltır ve koroner perfüzyonu iyileştirir. [[K1 s. 153]]' },
      hip: { ad: 'Hipotansif anestezi', sor: { map: '↓' }, hedef: true, not: ['MAP ↓ hedef: kansız cerrahi alan; orta kulak; büyük ölçüde tarihsel'], mud: [['Ters Trendelenburg · venöz dönüş ↓', [['on', '↓']]], ['Volatil anestezikler', [['svr', '↓']]], ['Gliseril trinitrat', [['svr', '↓']]], ['Sodyum nitroprussid', [['svr', '↓']]], ['Esmolol (β1 antagonisti)', [['hr', '↓'], ['kon', '↓']]], ['Labetalol (α1 + β antagonisti)', [['hr', '↓'], ['kon', '↓']]]],
        cap: '<b>Hipotansif anestezi.</b> Kansız cerrahi alan için kontrollü hipotansiyon: pozisyon ön yükü, vazodilatörler SVR’yi, β blokerler HR’yi ve kontraktiliteyi düşürür. [[K1 s. 153]]' },
    };
    let tb = 'bes', dar = false;
    el.innerHTML = `<div class="f34-ust">${seg('Tablo', 'tb', Object.keys(TB).map((k) => [k, TB[k].ad]), 'bes')}</div><div class="f34-svgk"></div>
      <div class="legend"><span><i class="f34-lj-bes"></i>anestezistin ayarlayabildiği beş etken</span><span><i class="f34-lj-sor"></i>hastalığın yaptığı değişiklik (kutu içinde)</span><span><i class="f34-lj-mud"></i>müdahale (numaralı işaret)</span></div>
      <div class="f34-map-p" aria-live="off"></div>`;
    const kut = el.querySelector('.f34-svgk'), pan = el.querySelector('.f34-map-p');
    const ciz = () => {
      const B = dar ? { map: [180, 26, 100, 36], co: [95, 132, 84, 32], svr: [270, 132, 84, 32], hr: [52, 222, 76, 32], sv: [165, 222, 76, 32], on: [60, 340, 102, 32], kon: [180, 340, 116, 32], art: [300, 340, 100, 32] }
        : { map: [280, 30, 110, 38], co: [170, 128, 90, 34], svr: [400, 128, 90, 34], hr: [95, 218, 80, 34], sv: [250, 218, 80, 34], on: [150, 296, 96, 32], kon: [262, 296, 116, 32], art: [376, 296, 96, 32] };
      const W = dar ? 360 : 560, H = dar ? 372 : 322;
      const t = TB[tb];
      const ust = (k) => [B[k][0], B[k][1] - B[k][3] / 2], alt = (k) => [B[k][0], B[k][1] + B[k][3] / 2];
      let g = '';
      [['map', 'co'], ['map', 'svr'], ['co', 'hr'], ['co', 'sv'], ['sv', 'on'], ['sv', 'kon'], ['sv', 'art']].forEach(([a, b]) => { const p = alt(a), q = ust(b); g += `<path class="f34-agac-c" d="M${p[0]} ${p[1]}C${p[0]} ${(p[1] + q[1]) / 2} ${q[0]} ${(p[1] + q[1]) / 2} ${q[0]} ${q[1]}"/>`; });
      if (dar) g += T(180, 60, '≈ CO × SVR', 'f34-t f34-q', 'middle') + T(180, 77, 'MAP − RAP = CO × SVR; RAP küçük,', 'f34-ts', 'middle') + T(180, 92, 'sağ ventrikül yetmezliğinde önemli', 'f34-ts', 'middle');
      else g += T(280, 66, '≈ CO × SVR', 'f34-t f34-q', 'middle') + T(280, 82, '(MAP − RAP = CO × SVR; RAP küçük, sağ ventrikül yetmezliğinde önemli)', 'f34-ts', 'middle');
      if (dar) g += T(270, 163, 'arteriol düz kas tonusu:', 'f34-ts', 'middle') + T(270, 177, 'yerel, hümoral, sinirsel', 'f34-ts', 'middle') + T(8, 254, 'sempatik ↑', 'f34-ts') + T(8, 268, 'parasempatik ↓', 'f34-ts');
      else g += T(400, 162, 'arteriol düz kas tonusu: yerel, hümoral, sinirsel', 'f34-ts', 'middle') + T(95, 252, 'sempatik ↑ / parasempatik ↓', 'f34-ts', 'middle');
      // müdahale işaretleri: hedef kutu → [numara, yön]
      const mi = {}; t.mud.forEach(([, hd], i) => hd.forEach(([k, y]) => { (mi[k] = mi[k] || []).push([i + 1, y]); }));
      Object.keys(B).forEach((k) => {
        const [cx, cy, w, h] = B[k], bes = BES.includes(k), s = t.sor[k];
        g += `<g class="f34-kutu ${bes ? 'bes' : ''} ${k === 'map' ? 'kok' : ''} ${s ? 'sorun' : ''}"><rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="8"/>${T(cx - (s ? 6 : 0), cy + 5, AD[k], k === 'map' ? 'f34-kok-t' : 'f34-t', 'middle')}`;
        if (s) g += `<path class="${s === '↓' ? (t.hedef ? 'f34-sor-h' : 'f34-sor-d') : 'f34-sor-u'}" d="${s === '↓' ? `M${cx + w / 2 - 15} ${cy - 5}h10l-5 9z` : `M${cx + w / 2 - 15} ${cy + 4}h10l-5 -9z`}"/>`;
        g += '</g>';
        if (mi[k]) {
          const lab = mi[k].map(([n]) => n).join(' ') + ' ' + mi[k][0][1], mw = lab.length * 7.4 + 12, mx = cx + w / 2 - mw + 6, my = cy - h / 2 - 20;
          g += `<g class="f34-mud-i${RM ? '' : ' f34-ciz'}"><rect x="${r1(mx)}" y="${my}" width="${r1(mw)}" height="17" rx="8.5"/>${T(mx + mw / 2, my + 12.5, lab, 'f34-mud-t', 'middle')}<path d="M${r1(mx + mw - 10)} ${my + 17}L${r1(cx + w / 2 - 10)} ${cy - h / 2}"/></g>`;
        }
      });
      kut.innerHTML = `<svg class="f34-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="MAP belirleyicileri ağacı: ${t.ad}">${g}</svg>`;
      pan.innerHTML = (t.not.length ? `<ul class="f34-sorun">${t.not.map((n) => `<li>${n}</li>`).join('')}</ul>` : '') +
        (t.mud.length ? `<ol class="f34-mud">${t.mud.map(([ad, hd]) => `<li><span class="tag clin">${hd.map(([k, y]) => '→ ' + AD[k] + ' ' + y).join(' · ')}</span> ${ad}</li>`).join('')}</ol>` : '');
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-tb]'); if (!b) return; tb = b.dataset.tb; segSec(el, 'tb', tb); ciz(); capYaz(el, TB[tb].cap); });
    const stopD = darIzle(el, (n) => { dar = n; el.classList.toggle('f34-dar', n); ciz(); });
    return () => { stopD(); };
  };
})();
