/* Bölüm 70 · Asit–baz fizyolojisi — bileşenler (tarif: docs/tasarim/fiz70.md; K1 s. 329–337).
   Tek dar yerleşim: SVG viewBox 360 birim genişliğinde, geniş ekranda en çok 560 px ile ortalanır.
   Modeller şematiktir; kitap sayıları ilgili viz-foot'ta belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (x) => (x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x));
  const fm = (v, d = 1) => (Math.round(v * Math.pow(10, d) + (v < 0 ? -1e-9 : 1e-9)) / Math.pow(10, d)).toFixed(d).replace('.', ',').replace('-', '−');
  const capSet = (el, html) => { const c = el.closest('.viz').querySelector('.viz-cap'); if (c) c.innerHTML = REF(html); };
  const T = (x, y, s, c = '', a = 'start') => `<text x="${x}" y="${y}" class="${c}" text-anchor="${a}">${s}</text>`;
  const R = (x, y, w, h, k = '', rx = 6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${k}"/>`;
  const C = (x, y, r, k = '') => `<circle cx="${x}" cy="${y}" r="${r}" class="${k}"/>`;
  const L = (x1, y1, x2, y2, k = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${k}"/>`;
  const RENKLER = ['ink', 'crit', 'ok', 'acc', 'muted', 'co2', 'warn', 'nh'];
  const defs = (nm) => `<defs>${RENKLER.map((c) => `<marker id="f70-${nm}-${c}" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="f70-mk-${c}"/></marker>`).join('')}</defs>`;
  const AR = (nm, x1, y1, x2, y2, c = 'ink', w = 2, dash = false) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="f70-ln f70-s-${c}${dash ? ' f70-dash' : ''}" style="stroke-width:${w}" marker-end="url(#f70-${nm}-${c})"/>`;
  const svgOpen = (nm, w, h, aria) => `<svg class="f70-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${aria}">${defs(nm)}`;
  const seg = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const segSet = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const hBand = (p) => (p < 7.35 ? 'asidemi' : p > 7.45 ? 'alkalemi' : 'normal');
  const hCls = (p) => (p < 7.35 ? 'crit' : p > 7.45 ? 'acc' : 'ok');
  // pH şeridi: x0..x1 arası p0..p1; arka plan üç bant
  const phBand = (x0, x1, y, h, p0, p1) => {
    const X = (p) => x0 + ((p - p0) / (p1 - p0)) * (x1 - x0);
    return R(X(p0), y, X(7.35) - X(p0), h, 'f70-k-crit', 0) + R(X(7.35), y, X(7.45) - X(7.35), h, 'f70-k-ok', 0) + R(X(7.45), y, X(p1) - X(7.45), h, 'f70-k-acc', 0);
  };
  const phMark = (X, y, p, h = 26) => `<path d="M${X - 6} ${y - 9}L${X + 6} ${y - 9}L${X} ${y}z" class="f70-mark"/>` + L(X, y, X, y + h, 'f70-mline');
  const wrapHTML = (inner, cls = '') => `<div class="f70-w ${cls}">${inner}</div>`;

  /* ---------- Adımlı bileşen çerçevesi (be, pct, nh4) ---------- */
  function adimli(el, n, kur) {
    // kur(svgEl, durum) -> çizim işlevi; durum: {s, u, t}
    el.innerHTML = wrapHTML(`<div class="f70-stage"></div>
      <div class="btn-row f70-st"><button type="button" class="btn ghost" data-a="geri">← Geri</button><button type="button" class="btn" data-a="ileri">İleri →</button><button type="button" class="btn ghost" data-a="oynat" aria-pressed="false">Oynat</button></div>
      <div class="f70-dots" role="group" aria-label="Adım seç">${Array.from({ length: n }, (_, i) => `<button type="button" data-k="${i}" aria-label="Adım ${i + 1}" aria-pressed="${i === 0}">${i + 1}</button>`).join('')}</div>`);
    const stage = el.querySelector('.f70-stage');
    const st = { s: 0, u: RM ? 1 : 0, t: 0, play: false };
    const ciz = kur(stage, st);
    let acc = 0, zaman = 0;
    const ui = () => {
      el.querySelector('[data-a=geri]').disabled = st.s === 0;
      const ile = el.querySelector('[data-a=ileri]'); ile.textContent = st.s === n - 1 ? 'Baştan' : 'İleri →';
      el.querySelectorAll('[data-k]').forEach((b) => { const k = +b.dataset.k; b.setAttribute('aria-pressed', String(k === st.s)); b.classList.toggle('gecti', k < st.s); });
      const pl = el.querySelector('[data-a=oynat]'); pl.textContent = st.play ? 'Duraklat' : 'Oynat'; pl.setAttribute('aria-pressed', String(st.play));
    };
    const git = (s) => { st.s = ((s % n) + n) % n; st.u = RM ? 1 : 0; zaman = 0; acc = 0; ui(); ciz(); if (st.onStep) st.onStep(st.s); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.k !== undefined) { git(+b.dataset.k); return; }
      const a = b.dataset.a;
      if (a === 'geri') git(st.s - 1);
      else if (a === 'ileri') git(st.s === n - 1 ? 0 : st.s + 1);
      else if (a === 'oynat') { st.play = !st.play; ui(); }
    });
    const stop = ticker(el, (dt) => {
      st.t += dt; zaman += dt;
      if (st.play) { acc += dt; if (acc > 3.5) { acc = 0; git(st.s + 1); return; } }
      if (RM) return;
      const u = clamp(zaman / 1.8, 0, 1);
      if (u !== st.u || st.anim) { st.u = u; ciz(); }
    });
    ui(); ciz(); if (st.onStep) st.onStep(0);
    return stop;
  }

  /* ---------- 1 · f70_ph ---------- */
  VIZ.f70_ph = (el) => {
    let ph = 7.4;
    el.innerHTML = wrapHTML(`<div class="f70-stage"></div>
      <label class="f70-rng"><span>pH <b data-o="p"></b></span><input type="range" min="6.8" max="7.8" step="0.01" value="7.4" aria-label="pH"></label>
      <div class="f70-chips">${[['7.40', '7,40'], ['7.35', '7,35'], ['7.45', '7,45'], ['7.00', '7,00']].map(([v, l]) => `<button type="button" class="btn ghost" data-v="${v}">${l}</button>`).join('')}</div>`);
    const stage = el.querySelector('.f70-stage'), rng = el.querySelector('input'), out = el.querySelector('[data-o=p]');
    const X0 = 20, X1 = 340, XP = (p) => X0 + (p - 6.8) * 320;
    const draw = () => {
      const h = Math.round(Math.pow(10, 9 - ph)), x = XP(ph), oran = Math.pow(10, 9 - ph) / 40;
      const bx = clamp(x, 52, 308);
      stage.innerHTML = svgOpen('ph', 360, 250, 'pH cetveli ve doğrusal [H⁺] çubuğu') +
        T(20, 22, 'pH ölçeği', 'f70-m') + phBand(X0, X1, 54, 16, 6.8, 7.8) +
        [6.8, 7.0, 7.2, 7.4, 7.6, 7.8].map((p) => L(XP(p), 70, XP(p), 75, 'f70-axis') + T(XP(p), 88, fm(p, 1), 'f70-tk', 'middle')).join('') +
        phMark(x, 54, ph, 16) + R(bx - 36, 14, 72, 22, 'f70-box') + T(bx, 30, 'pH ' + fm(ph, 2), 'f70-b', 'middle') +
        T(20, 108, 'Asidemi < 7,35', 'f70-m f70-tc-crit') + T(340, 108, 'Alkalemi > 7,45', 'f70-m f70-tc-acc', 'end') +
        T(20, 140, '[H⁺] çubuğu (doğrusal, nmol/L)', 'f70-m') +
        R(20, 150, 320, 22, 'f70-bar-bg', 4) + R(20, 150, Math.max(1, h * 2), 22, 'f70-k-crit', 4) +
        L(100, 144, 100, 180, 'f70-ref') + T(104, 194, 'pH 7,4 = 40 nmol/L', 'f70-m') +
        T(20, 224, '[H⁺] = ' + h + ' nmol/L', 'f70-big') + T(340, 224, '7,4\'e göre: × ' + fm(oran, 1), 'f70-b', 'end') + '</svg>';
      out.textContent = fm(ph, 2);
      rng.value = ph;
    };
    const cap = () => {
      const p = fm(ph, 2), h = Math.round(Math.pow(10, 9 - ph)), r = fm(Math.pow(10, 9 - ph) / 40, 1), pi = Math.round(ph * 100);
      let t;
      if (pi === 740) { el.closest('.viz').querySelector('.viz-cap').innerHTML = REF('<b>pH 7,40.</b> [H⁺] 40 nmol/L: normal vücut pH\'ı. pH\'ı kaydırın. [[K1 s. 329]]'); return; }
      if (pi === 700) t = '<b>pH 7,00.</b> [H⁺] 100 nmol/L: pH yalnız 0,4 düştü ama [H⁺] iki katından fazla arttı. [[K1 s. 329]]';
      else if (pi < 700) t = `<b>pH ${p}.</b> [H⁺] ${h} nmol/L. Ölçek logaritmiktir; pH'ın birimi yoktur. [[K1 s. 329]]`;
      else if (pi < 735) t = `<b>pH ${p}: asidemi.</b> [H⁺] ${h} nmol/L, normalin ${r} katı. [[K1 s. 329]]`;
      else if (pi === 735) t = `<b>pH ${p}.</b> Normal aralığın alt sınırı (asidemi < 7,35); [H⁺] ${h} nmol/L. [[K1 s. 329]]`;
      else if (pi < 745) t = `<b>pH ${p}.</b> [H⁺] ${h} nmol/L: normal aralıkta (7,35–7,45). [[K1 s. 329]]`;
      else if (pi === 745) t = `<b>pH ${p}.</b> Normal aralığın üst sınırı (alkalemi > 7,45); [H⁺] ${h} nmol/L. [[K1 s. 329]]`;
      else t = `<b>pH ${p}: alkalemi.</b> [H⁺] ${h} nmol/L. [[K1 s. 329]]`;
      capSet(el, t);
    };
    rng.addEventListener('input', () => { ph = +rng.value; draw(); cap(); });
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-v]'); if (b) { ph = +b.dataset.v; draw(); cap(); } });
    draw();
    return () => {};
  };

  /* ---------- 2 · f70_hh ---------- */
  VIZ.f70_hh = (el) => {
    let hco = 24, pco = 5.3;
    const PRE = [['n', 'Normal', 24, 5.3], ['h', 'HCO₃⁻ yarıya', 12, 5.3], ['p8', 'PaCO₂ 8 kPa', 24, 8], ['p35', 'PaCO₂ 3,5 kPa', 24, 3.5]];
    el.innerHTML = wrapHTML(`<div class="f70-stage"></div>
      <label class="f70-rng"><span>HCO₃⁻ (mmol/L) <b data-o="h"></b> <i>normal 24</i></span><input type="range" data-r="h" min="8" max="45" step="1" value="24" aria-label="HCO₃⁻ mmol/L"></label>
      <label class="f70-rng"><span>PaCO₂ (kPa) <b data-o="p"></b> <i>normal 5,3</i></span><input type="range" data-r="p" min="2.5" max="12" step="0.1" value="5.3" aria-label="PaCO₂ kPa"></label>
      ${seg('Hazır değerler', 'pre', PRE.map((p) => [p[0], p[1]]), 'n')}`);
    const stage = el.querySelector('.f70-stage');
    const hh = () => { const co = 0.23 * pco, r = hco / co; return { co, r, ph: 6.1 + Math.log10(r) }; };
    const draw = () => {
      const { co, r, ph } = hh();
      const deg = clamp(Math.log10(r / 20) * 40, -15, 15), th = (deg * Math.PI) / 180, k = 1.9;
      const lx = 180 - 105 * Math.cos(th), ly = 125 + 105 * Math.sin(th), rx = 180 + 105 * Math.cos(th), ry = 125 - 105 * Math.sin(th);
      const lh = hco * k, rh = co * 10 * k;
      const X = (p) => 20 + ((clamp(p, 7, 7.8) - 7) / 0.8) * 320;
      stage.innerHTML = svgOpen('hh', 360, 410, 'Henderson–Hasselbalch terazisi: HCO₃⁻ ile 0,23 × PaCO₂ oranı pH’ı belirler') +
        `<path d="M180 125L160 175L200 175z" class="f70-k-chip"/>` + L(lx, ly, rx, ry, 'f70-beam') + C(180, 125, 5, 'f70-pivot') +
        R(lx - 24, ly - 3 - lh, 48, lh, 'f70-k-acc', 3) + R(rx - 24, ry - 3 - rh, 48, rh, 'f70-k-co2', 3) +
        T(lx, ly - 7 - lh, fm(hco, 0), 'f70-b', 'middle') + T(rx, ry - 7 - rh, fm(co * 10, 1), 'f70-b', 'middle') +
        T(10, 196, 'HCO₃⁻', 'f70-b f70-tc-acc') + T(10, 211, '(metabolik)', 'f70-m') +
        T(350, 196, '0,23 × PaCO₂ (× 10 ölçekli)', 'f70-b f70-tc-co2', 'end') + T(350, 211, '(solunumsal)', 'f70-m', 'end') +
        T(180, 232, 'oran = ' + fm(r, 1) + ' : 1', 'f70-big', 'middle') +
        R(10, 246, 340, 62, 'f70-box', 8) +
        T(20, 266, `pH = 6,1 + log₁₀ ( ${fm(hco, 0)} / (0,23 × ${fm(pco, 1)}) )`, 'f70-eq') +
        T(20, 290, `   = 6,1 + log₁₀ ( ${fm(r, 1)} ) = <tspan class="f70-b f70-tc-${hCls(ph)}">${fm(ph, 2)}</tspan>${hco === 24 && pco === 5.3 ? ' ≈ 7,4' : ''}`, 'f70-eq') +
        phBand(20, 340, 340, 14, 7, 7.8).replace(/class="f70-k-/g, 'class="f70-k-') + phMark(X(ph), 340, ph, 14) +
        [7, 7.2, 7.4, 7.6, 7.8].map((p) => T(X(p), 372, fm(p, 1), 'f70-tk', 'middle')).join('') +
        T(20, 330, 'pH', 'f70-m') + T(340, 396, hBand(ph).replace(/^./, (c) => c.toUpperCase()), 'f70-b f70-tc-' + hCls(ph), 'end') + '</svg>';
      el.querySelector('[data-o=h]').textContent = fm(hco, 0); el.querySelector('[data-o=p]').textContent = fm(pco, 1);
    };
    const cap = () => {
      const { r, ph } = hh(), p2 = fm(ph, 2), rr = fm(r, 1);
      if (hco === 24 && pco === 5.3) { el.closest('.viz').querySelector('.viz-cap').innerHTML = REF('<b>Normal plazma.</b> HCO₃⁻ 24 mmol/L, PaCO₂ 5,3 kPa: 6,1 + log₁₀(24 / 1,22) ≈ 7,4. HCO₃⁻\'ü ya da PaCO₂\'yi değiştirin. [[K1 s. 330]]'); return; }
      if (pco === 5.3) capSet(el, `<b>HCO₃⁻ ${fm(hco, 0)} mmol/L.</b> Konjuge baz ${hco < 24 ? 'azaldı' : 'arttı'}; oran ${rr} : 1, pH ${p2}. Bu metabolik yönde bir değişikliktir. [[K1 s. 330]]`);
      else if (hco === 24) capSet(el, `<b>PaCO₂ ${fm(pco, 1)} kPa.</b> Çözünmüş CO₂ (H₂CO₃) ${pco > 5.3 ? 'arttı' : 'azaldı'}; oran ${rr} : 1, pH ${p2}. Bu solunumsal yönde bir değişikliktir. [[K1 s. 330]]`);
      else capSet(el, `<b>HCO₃⁻ ${fm(hco, 0)}, PaCO₂ ${fm(pco, 1)}.</b> pH tek tek değerlere değil, ikisinin oranına bağlıdır: oran ${rr} : 1, pH ${p2}. [[K1 s. 330]]`);
    };
    el.addEventListener('input', (e) => { const r = e.target.dataset.r; if (!r) return; if (r === 'h') hco = +e.target.value; else pco = Math.round(+e.target.value * 10) / 10; segSet(el, 'pre', ''); draw(); cap(); });
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-pre]'); if (!b) return; const p = PRE.find((q) => q[0] === b.dataset.pre); hco = p[2]; pco = p[3]; el.querySelector('[data-r=h]').value = hco; el.querySelector('[data-r=p]').value = pco; segSet(el, 'pre', p[0]); draw(); cap(); });
    draw();
    return () => {};
  };

  /* ---------- 3 · f70_sinif ---------- */
  VIZ.f70_sinif = (el) => {
    const D = {
      sa: { ad: 'Solunumsal asidoz', k: 'crit', ok: '↓', pri: ['V̇A ↓ → PaCO₂ ↑ (> 6,0 kPa)', 'co2', 'up'], hco: ['hco', 'up', true], nd: ['Solunum merkezi baskısı: opioid, obezite hipoventilasyonu', 'Sinir-kas: Guillain–Barré, miyastenia gravis', 'Göğüs duvarı: yelken göğüs', 'Hava yolu: astım, KOAH', 'Parankim: ARDS'], an: ['Yetersiz mekanik ventilasyon (ARDS\'de permisif hiperkapni)', 'Malign hipertermi (CO₂ üretimi ↑)', 'Dışarıdan CO₂: yeniden solunum, laparoskopik insüflasyon'], komp: ['Günler: böbrek HCO₃⁻ geri emilimini artırır → HCO₃⁻ > 26 mmol/L (KOAH, ARDS, obezite hipoventilasyonu)'], kref: 's. 330–331' },
      ma: { ad: 'Metabolik asidoz', k: 'crit', pri: ['Sabit asit ↑ → HCO₃⁻ ↓ (< 22 mmol/L)'], nd: ['Endojen: laktik asit', 'Eksojen: salisilat', 'Nedeni ayırmak için anyon açığı'], komp: ['Hızlı: V̇A ↑ → PaCO₂ ↓ (solunumsal kompansasyon)'], kref: 's. 331' },
      sal: { ad: 'Solunumsal alkaloz', k: 'acc', pri: ['V̇A ↑ → PaCO₂ ↓ (< 4,7 kPa)'], nd: ['Santral: kafa travması, ağrı, anksiyete, progesteron (gebelik), salisilat zehirlenmesi', 'Hipoksemi (periferik kemoreseptör): yüksek irtifa', 'J reseptörleri: pulmoner emboli, pulmoner ödem', 'Aşırı mekanik ventilasyon'], komp: ['—', 'Böbreğin alkalemiye yanıtı: daha az HCO₃⁻ geri emilir (bkz. böbrek bölümü) [[K1 s. 334]]'] },
      mal: { ad: 'Metabolik alkaloz', k: 'acc', pri: ['HCO₃⁻ ↑ (> 26 mmol/L), birincil solunumsal asidoz yokken'], nd: ['Dışarıdan alkali: sodyum bikarbonat, masif transfüzyon (sitrat → HCO₃⁻)', 'Endojen asit kaybı: ağır kusma, nazogastrik drenaj (mide), diüretik (böbrek)'], komp: ['—', 'Böbreğin alkalemiye yanıtı: daha az HCO₃⁻ geri emilir (bkz. böbrek bölümü) [[K1 s. 334]]', 'Alkalemi karotis uyarısını azaltır; V̇A ancak sınırlı düşer [[K1 s. 333]]'] },
    };
    // terazi simgesi: hangi kefe değişti (birincil: dolu ok, kompansasyon: kesikli)
    const SIM = { sa: [['pco', 1, 0], ['hco', 1, 1]], ma: [['hco', -1, 0], ['pco', -1, 1]], sal: [['pco', -1, 0]], mal: [['hco', 1, 0]] };
    let cur = 'sa';
    el.innerHTML = wrapHTML(`<div class="f70-grid2" role="group" aria-label="Bozukluk seç">
      <span class="f70-gh"></span><span class="f70-gh">Solunumsal<br><small>CO₂, uçucu asit</small></span><span class="f70-gh">Metabolik<br><small>HCO₃⁻, sabit asit</small></span>
      <span class="f70-gh f70-gs">Asidoz<br><small>pH &lt; 7,35</small></span><button type="button" data-b="sa" class="f70-cell f70-c-crit">Solunumsal asidoz</button><button type="button" data-b="ma" class="f70-cell f70-c-crit">Metabolik asidoz</button>
      <span class="f70-gh f70-gs">Alkaloz<br><small>pH &gt; 7,45</small></span><button type="button" data-b="sal" class="f70-cell f70-c-acc">Solunumsal alkaloz</button><button type="button" data-b="mal" class="f70-cell f70-c-acc">Metabolik alkaloz</button></div>
      <div class="f70-sim"></div><div class="f70-panel"></div>`);
    const sim = el.querySelector('.f70-sim'), panel = el.querySelector('.f70-panel');
    const ul = (a) => '<ul>' + a.map((x) => `<li>${x}</li>`).join('') + '</ul>';
    const draw = () => {
      const d = D[cur], ch = SIM[cur];
      const kef = (id, x, lab, cls) => { const c = ch.filter((q) => q[0] === id); const ok = (c.length ? c.map((q) => AR('sn', x + 78, 44, x + 78, 44 + (q[1] > 0 ? -22 : 22), q[2] ? 'muted' : 'ink', q[2] ? 2 : 3.5, !!q[2])).join('') : ''); return R(x, 20, 60, 48, cls, 6) + T(x + 30, 49, lab, 'f70-b', 'middle') + ok; };
      sim.innerHTML = svgOpen('sn', 360, 80, 'Hangi kefenin değiştiği: HCO₃⁻ ve PaCO₂') + kef('hco', 14, 'HCO₃⁻', 'f70-k-acc') + kef('pco', 120, 'PaCO₂', 'f70-k-co2') +
        T(224, 40, 'birincil: dolu ok', 'f70-m') + T(224, 58, 'kompansasyon: kesikli', 'f70-m') + '</svg>';
      const anest = cur === 'sa' ? `<div class="f70-an"><b>Anestezide</b>${ul(d.an)}</div>` : '';
      panel.innerHTML = `<div class="f70-pc"><h4>Birincil</h4><p class="f70-pri">${d.pri[0]}</p></div>
        <div class="f70-pc"><h4>Nedenler</h4>${ul(d.nd)}${anest}</div>
        <div class="f70-pc"><h4>Kompansasyon</h4>${ul(d.komp.map((x) => REF(x)))}${d.kref ? `<p class="f70-ref">${REF('[[K1 ' + d.kref + ']]')}</p>` : ''}</div>`;
      el.querySelectorAll('[data-b]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.b === cur)));
    };
    const CAP = {
      sa: '<b>Solunumsal asidoz.</b> V̇A azalır: pH &lt; 7,35, PaCO₂ &gt; 6,0 kPa. Günler süren durumda böbrek HCO₃⁻ geri emilimini artırır. Bir bozukluk seçin. [[K1 s. 330–331]]',
      ma: '<b>Metabolik asidoz.</b> Artan sabit asit HCO₃⁻ ile tamponlanır: HCO₃⁻ &lt; 22 mmol/L, pH &lt; 7,35. Akciğer hızla V̇A\'yı artırıp PaCO₂\'yi düşürür. [[K1 s. 331]]',
      sal: '<b>Solunumsal alkaloz.</b> Hiperventilasyon: PaCO₂ &lt; 4,7 kPa, pH &gt; 7,45. [[K1 s. 331]]',
      mal: '<b>Metabolik alkaloz.</b> Birincil solunumsal asidoz yokken HCO₃⁻ &gt; 26 mmol/L: dışarıdan alkali ya da asit kaybı. [[K1 s. 331]]',
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-b]'); if (!b) return; cur = b.dataset.b; draw(); capSet(el, CAP[cur]); });
    draw();
    return () => {};
  };

  /* ---------- 4 · f70_be (adımlı) ---------- */
  VIZ.f70_be = (el) => {
    const CAP = [
      '<b>1 · Örnek.</b> Bir kan örneği alınır. "İleri"ye basın. [[K1 s. 331]]',
      '<b>2 · Solunumsal bileşeni çıkar.</b> Örneğin PaCO₂\'si 5,3 kPa\'ya, ısısı 37 °C\'ye getirilir. Kalan sapma yalnız metaboliktir. [[K1 s. 331]]',
      '<b>3 · Titrasyon.</b> pH 7,40 olana dek asit ya da baz eklenir; gereken miktar BE\'dir. Bu örnekte 8 mEq/L baz gerekti: BE −8 mEq/L. [[K1 s. 331]]',
      '<b>4 · İşaret.</b> pH 7,40 ve PaCO₂ 5,3 kPa olan kanda BE 0\'dır; metabolik asidozda negatif, metabolik alkalozda pozitif; normal −2 ile +2 mEq/L. [[K1 s. 331]]',
      '<b>5 · Olgu: pnömoni.</b> pH 7,2, BE −8 mEq/L, laktat 3 mmol/L. Laktat açığın yalnız 3\'ünü açıklar; kalan 5 mEq/L için başka asit gerekir: akut böbrek hasarında atılamayan sabit asitler olabilir. [[K1 s. 331]]',
    ];
    return adimli(el, 5, (stage, st) => {
      st.onStep = (s) => capSet(el, CAP[s]);
      st.anim = true;
      const BX = (v) => 180 + v * 16; // BE ekseni −10…+10
      return () => {
        const s = st.s, u = RM ? 1 : st.u;
        const fill = s >= 0 ? 1 : 0;
        const kosul = (i) => (i === 0 || i === 1 ? s >= 1 : s >= 2);
        const sayac = s === 2 ? lerp(0, 8, u) : s > 2 ? 8 : 0;
        const ph = s === 2 ? lerp(7.2, 7.4, u) : s > 2 ? 7.4 : 7.2;
        const gerek = s === 2 && u < 1 && !RM;
        let drops = '';
        if (gerek) for (let i = 0; i < 3; i++) { const q = (st.t * 1.4 + i / 3) % 1; drops += C(65, 56 + q * 40, 3.5, 'f70-k-acc'); }
        const kl = ['PaCO₂ → 5,3 kPa', 'Isı → 37 °C', 'Hedef pH 7,40'];
        let h = svgOpen('be', 360, s < 3 ? 214 : s === 3 ? 284 : 334, 'Baz fazlası: örnek kanın standart koşullara getirilip titre edilmesi') +
          R(56, 4, 18, 36, 'f70-k-chip', 3) + `<path d="M58 40L72 40L65 54z" class="f70-k-chip"/>` + T(84, 22, 'büret (baz / asit)', 'f70-m') + drops +
          `<path d="M30 80 L30 170 Q30 182 42 182 L88 182 Q100 182 100 170 L100 80" class="f70-beaker"/>` +
          R(32, 96, 66, 84, 'f70-k-crit', 4) + T(65, 128, 'kan', 'f70-m', 'middle') + T(65, 152, 'pH ' + fm(ph, 2), 'f70-b', 'middle') +
          (s >= 2 ? T(65, 200, 'baz: ' + fm(sayac, 1) + ' mEq/L', 'f70-b f70-tc-acc', 'middle') : T(65, 200, s === 0 ? 'BE bilinmiyor' : 'solunumsal bileşen çıktı', 'f70-m', 'middle'));
        for (let i = 0; i < 3; i++) {
          const y = 28 + i * 52, ok = kosul(i);
          h += R(140, y, 210, 40, ok ? 'f70-k-ok' : 'f70-k-chip', 8) + T(152, y + 25, kl[i], 'f70-b') + (ok ? T(338, y + 26, '✓', 'f70-b f70-tc-ok', 'end') : '');
        }
        if (s >= 3) {
          h += R(BX(-2), 226, BX(2) - BX(-2), 16, 'f70-k-ok', 0) + L(20, 234, 340, 234, 'f70-axis');
          for (const v of [-10, -5, 0, 5, 10]) h += L(BX(v), 230, BX(v), 238, 'f70-axis') + T(BX(v), 256, fm(v, 0), 'f70-tk', 'middle');
          h += T(20, 274, '← Metabolik asidoz', 'f70-m f70-tc-crit') + T(340, 274, 'Metabolik alkaloz →', 'f70-m f70-tc-acc', 'end');
          h += `<path d="M${BX(-8) - 6} 214L${BX(-8) + 6} 214L${BX(-8)} 226z" class="f70-mark f70-mk-crit-f"/>` + T(BX(-8) + (s === 3 ? 12 : 0), 210, s === 3 ? 'BE −8' : '', 'f70-b f70-tc-crit') + T(BX(0), 220, 'normal −2…+2', 'f70-m', 'middle').replace('y="220"', 'y="220"');
        }
        if (s === 4) {
          h += R(BX(-3), 288, BX(0) - BX(-3), 18, 'f70-k-warn', 0) + R(BX(-8), 288, BX(-3) - BX(-8), 18, 'f70-k-crit f70-hatch', 0) +
            T(BX(-1.5), 302, '3', 'f70-b', 'middle') + T(BX(-5.5), 302, '5', 'f70-b', 'middle') +
            T(BX(-3), 324, 'Laktat 3 mmol/L', 'f70-m f70-tc-warn', 'end') + T(BX(-3) + 6, 324, '+ başka asit 5 (AKI?)', 'f70-m f70-tc-crit');
        }
        stage.innerHTML = h + '</svg>';
      };
    });
  };

  /* ---------- 5 · f70_ag (Gamblegram) ---------- */
  VIZ.f70_ag = (el) => {
    const S = {
      n: { ad: 'Normal', Cl: 104, H: 24, sl: [['alb', 11], ['sf', 5]] },
      lak: { ad: 'Laktik asidoz', Cl: 104, H: 12, sl: [['alb', 11], ['sf', 5], ['lak', 12]] },
      gis: { ad: 'GİS HCO₃⁻ kaybı', Cl: 116, H: 12, sl: [['alb', 11], ['sf', 5]] },
      hip: { ad: 'Hipoalbüminemi', Cl: 112, H: 24, sl: [['alb', 3], ['sf', 5]] },
      hl: { ad: 'Hipoalbüminemi + asidoz', Cl: 112, H: 16, sl: [['alb', 3], ['sf', 5], ['lak', 8]] },
    };
    const CAP = {
      n: null,
      lak: '<b>Anyon açığı yüksek.</b> Laktat H⁺\'sı HCO₃⁻ ile tamponlanır; HCO₃⁻ azalır, yerini ölçülmeyen laktat alır. Aynı tablo: akut böbrek hasarında sabit asitler, diyabetik ketoasidozda keto asitler; eksojen: salisilat, etanol, metanol, etilen glikol. [[K1 s. 332]]',
      gis: '<b>Anyon açığı normal.</b> Kaybedilen HCO₃⁻\'ün yerini Cl⁻ alır; açık değişmez. Nedenler: süregen GİS HCO₃⁻ kaybı, renal tübüler asidoz; bu tip çok daha seyrektir. [[K1 s. 332]]',
      hip: '<b>Açık küçüldü.</b> Albümin ölçülmeyen başlıca anyondur; yoğun bakımda sık görülen hipoalbüminemi açığı düşürür. [[K1 s. 332]]',
      hl: '<b>Gizlenen asidoz.</b> HCO₃⁻ düşük, ama albümin azaldığı için açık "normal" görünür: metabolik asidoz gözden kaçabilir. [[K1 s. 332]]',
    };
    const NAME = { alb: ['Albümin', 'f70-k-ok'], sf: ['Sülfat · fosfat', 'f70-k-chip'], lak: ['Laktat / sabit asit', 'f70-k-crit'] };
    let cur = 'n', shown = null, from = null, tt = 1, norm0 = null;
    el.innerHTML = wrapHTML(`${seg('Senaryo', 'sc', Object.keys(S).map((k) => [k, S[k].ad]), 'n')}<div class="f70-stage"></div>
      <div class="f70-legend legend"><span><i class="f70-k-chip"></i>Na⁺ · K⁺ · Cl⁻</span><span><i class="f70-k-acc"></i>HCO₃⁻</span><span><i class="f70-k-ok"></i>Albümin</span><span><i class="f70-k-chip f70-hatch"></i>Sülfat · fosfat</span><span><i class="f70-k-crit"></i>Laktat / sabit asit</span></div>`);
    const stage = el.querySelector('.f70-stage');
    const vals = (k) => { const s = S[k], un = s.sl.reduce((a, b) => a + b[1], 0); return { Cl: s.Cl, H: s.H, alb: 0, sl: s.sl, un, ag: 140 + 4 - s.Cl - s.H }; };
    const getS = (k) => { const s = vals(k); const g = (id) => (s.sl.find((q) => q[0] === id) || [0, 0])[1]; return { Cl: s.Cl, H: s.H, alb: g('alb'), sf: g('sf'), lak: g('lak') }; };
    let cs = getS('n');
    const draw = () => {
      const k = 1.45, base = 318, v = cs;
      const un = v.alb + v.sf + v.lak, ag = un;
      let h = svgOpen('ag', 360, 350, 'Gamblegram: katyonlar ve anyonlar, ölçülmeyen anyonlar anyon açığını oluşturur') +
        T(10, 16, '(Na⁺ + K⁺) − (Cl⁻ + HCO₃⁻) = ' + fm(144 - v.Cl - v.H, 0) + ' mEq/L', 'f70-b') +
        T(75, 340, 'Katyonlar', 'f70-b', 'middle') + T(235, 340, 'Anyonlar', 'f70-b', 'middle');
      let y = base;
      const blk = (x, w, val, cls, lab) => { const hh = val * k; y -= hh; let o = R(x, y, w, hh, cls, 0) + (hh >= 14 && lab ? T(x + w / 2, y + hh / 2 + 4, lab, 'f70-b', 'middle') : ''); return o; };
      y = base; h += blk(20, 110, 140, 'f70-k-chip', 'Na⁺ 140'); h += blk(20, 110, 4, 'f70-k-chip f70-k-dark', ''); h += T(75, y - 4, 'K⁺ 4', 'f70-m', 'middle').replace(`y="${y - 4}"`, `y="${y - 6}"`);
      y = base; h += blk(180, 110, v.Cl, 'f70-k-chip', 'Cl⁻ ' + fm(v.Cl, 0)); h += blk(180, 110, v.H, 'f70-k-acc', 'HCO₃⁻ ' + fm(v.H, 0));
      const yb = y;
      h += blk(180, 110, v.alb, 'f70-k-ok', v.alb >= 6 ? 'Albümin ' + fm(v.alb, 0) : '') + blk(180, 110, v.sf, 'f70-k-chip f70-hatch', '') + blk(180, 110, v.lak, 'f70-k-crit', v.lak >= 6 ? 'Laktat ' + fm(v.lak, 0) : '');
      const yt = y;
      h += `<path d="M296 ${yt} L304 ${yt} L304 ${yb} L296 ${yb}" class="f70-brk"/>` + T(310, (yt + yb) / 2 - 6, 'AG', 'f70-b', 'start') + T(310, (yt + yb) / 2 + 9, fm(ag, 0), 'f70-big f70-tc-' + (ag > 20 ? 'crit' : ag < 10 ? 'acc' : 'ok'), 'start') + T(310, (yt + yb) / 2 + 23, 'mEq/L', 'f70-m', 'start') +
        T(310, 48, 'normal', 'f70-m') + T(310, 62, '10–20', 'f70-m') + '</svg>';
      stage.innerHTML = h;
    };
    const git = (k) => {
      segSet(el, 'sc', k); cur = k; const to = getS(k), fr = { ...cs };
      if (RM) { cs = to; draw(); } else { let t0 = null; const stp = (ts) => { if (cur !== k) return; if (t0 === null) t0 = ts; const q = ease((ts - t0) / 600); cs = Object.fromEntries(Object.keys(to).map((a) => [a, lerp(fr[a], to[a], q)])); draw(); if (q < 1) raf = requestAnimationFrame(stp); }; cancelAnimationFrame(raf); raf = requestAnimationFrame(stp); }
      if (CAP[k]) capSet(el, CAP[k]); else el.closest('.viz').querySelector('.viz-cap').innerHTML = REF('<b>Normal.</b> (Na⁺ + K⁺) − (Cl⁻ + HCO₃⁻) = 10–20 mEq/L; açığı sülfat, fosfat ve plazma proteinleri gibi ölçülmeyen anyonlar doldurur. Bir durum seçin. [[K1 s. 332]]');
    };
    let raf = 0;
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-sc]'); if (b) git(b.dataset.sc); });
    draw();
    return () => cancelAnimationFrame(raf);
  };

  /* ---------- 6 · f70_tampon ---------- */
  VIZ.f70_tampon = (el) => {
    let a = 0, b = 0, nk = 0;
    el.innerHTML = wrapHTML(`<div class="f70-stage"></div>
      <div class="btn-row"><button type="button" class="btn" data-a="asit">Asit ekle (+0,5 mmol/L H⁺)</button><button type="button" class="btn ghost" data-a="baz">Baz ekle (+0,5 mmol/L OH⁻)</button><button type="button" class="btn ghost" data-a="sifir">Sıfırla</button></div>
      <p class="f70-sayac" aria-live="off"></p>`);
    const stage = el.querySelector('.f70-stage'), say = el.querySelector('.f70-sayac');
    const X = (p) => 44 + ((clamp(p, 5, 8.5) - 5) / 3.5) * 296, Y = (r) => 190 - r * 1.6;
    const st = () => { const x = a - b, H = 24 - x, C2 = 1.22 + x; return { x, H, C2, ph: 6.1 + Math.log10(H / C2) }; };
    const draw = (hareket) => {
      const { x, H, C2, ph } = st(), r = 100 / (1 + Math.pow(10, 6.1 - ph));
      let pts = ''; for (let p = 5; p <= 8.51; p += 0.1) pts += (pts ? 'L' : 'M') + X(p).toFixed(1) + ' ' + Y(100 / (1 + Math.pow(10, 6.1 - p))).toFixed(1);
      const k = 3.8, bx = 300;
      let h = svgOpen('tp', 360, 400, 'HCO₃⁻ tampon eğrisi ve HCO₃⁻ / H₂CO₃ sütunları') +
        T(10, 14, 'HCO₃⁻ oranı (%)', 'f70-m') + L(44, 30, 44, 190, 'f70-axis') + L(44, 190, 340, 190, 'f70-axis') +
        [0, 50, 100].map((v) => T(38, Y(v) + 4, v, 'f70-tk', 'end')).join('') + [5, 6, 7, 8].map((p) => T(X(p), 206, fm(p, 0), 'f70-tk', 'middle')).join('') + T(340, 222, 'pH', 'f70-m', 'end') +
        L(X(6.1), 30, X(6.1), 190, 'f70-ref') + L(X(7.4), 30, X(7.4), 190, 'f70-ref') +
        T(X(6.1) + 4, 44, 'pKa 6,1', 'f70-b') + T(X(6.1) + 4, 58, 'en güçlü tamponlama', 'f70-m') + T(X(7.4) - 4, 78, 'pH 7,4', 'f70-b', 'end') + T(X(7.4) - 4, 92, '≈ %95', 'f70-m', 'end') +
        `<path d="${pts}" class="f70-curve"/>` + C(X(ph), Y(r), 7, 'f70-dot') +
        T(12, 262, 'mmol/L', 'f70-m') +
        R(60, 372 - H * k, 56, H * k, 'f70-k-acc', 2) + R(190, 372 - Math.max(C2 * k, 2), 56, Math.max(C2 * k, 2), 'f70-k-crit', 2) + L(40, 372, 340, 372, 'f70-axis') +
        T(88, 388, 'HCO₃⁻', 'f70-b f70-tc-acc', 'middle') + T(218, 388, 'H₂CO₃', 'f70-b f70-tc-crit', 'middle') + T(88, 366 - H * k, fm(H, 2), 'f70-b', 'middle') + T(218, 366 - Math.max(C2 * k, 2), fm(C2, 2), 'f70-b', 'middle') ;;
      if (hareket) h += C(hareket > 0 ? 88 : 218, 250, 5, hareket > 0 ? 'f70-pt f70-k-crit' : 'f70-pt f70-k-acc') + T(hareket > 0 ? 100 : 230, 254, hareket > 0 ? 'H⁺' : 'OH⁻', 'f70-m');
      stage.innerHTML = h + '</svg>';
      say.innerHTML = `Eklenen asit: <b>${fm(a, 1)}</b> mmol/L · Eklenen baz: <b>${fm(b, 1)}</b> mmol/L · pH <b>${fm(ph, 2)}</b>`;
      const sonB = el.querySelector('[data-a=baz]'), sonA = el.querySelector('[data-a=asit]');
      sonB.disabled = C2 - 0.5 < 0.02 - 1e-9 + 0; sonA.disabled = x >= 12;
    };
    const cap = () => {
      const { x, ph, C2 } = st();
      if (a === 0 && b === 0) { el.closest('.viz').querySelector('.viz-cap').innerHTML = REF('<b>pH 7,4.</b> pKa 6,1\'in 1,3 birim üstündeyiz: sistemin büyük kısmı HCO₃⁻ biçiminde, eklenen H⁺\'yı bağlamaya hazır. "Asit ekle"ye ya da "Baz ekle"ye basın. [[K1 s. 332]]'); return; }
      if (C2 - 0.5 < 0.02) capSet(el, `<b>H₂CO₃ tükendi.</b> pKa 6,1'in 1,3 birim üstünde çalışan HCO₃⁻ sistemi alkaliyi tamponlayamaz; pH ${fm(ph, 2)}. [[K1 s. 332]]`);
      else if (x > 0) capSet(el, `<b>+${fm(x, 1)} mmol/L asit.</b> H⁺ HCO₃⁻'e bağlanıp H₂CO₃ olur; pH ${fm(ph, 2)}. Bol HCO₃⁻ aside karşı geniş bir rezerv sağlar; canlıda oluşan CO₂ akciğerden atılır. [[K1 s. 332]]`);
      else if (x < 0) capSet(el, `<b>+${fm(-x, 1)} mmol/L baz.</b> Baz, azıcık H₂CO₃'ü tüketir; pH ${fm(ph, 2)}'e fırlar. pH 7,4'te sistem alkaliye karşı zayıf bir tampondur. [[K1 s. 332]]`);
      else capSet(el, `<b>Net değişim 0.</b> Eklenen asit ve baz birbirini götürdü; pH ${fm(ph, 2)}. [[K1 s. 332]]`);
    };
    el.addEventListener('click', (e) => {
      const bt = e.target.closest('[data-a]'); if (!bt) return; const t = bt.dataset.a;
      if (t === 'asit') a += 0.5; else if (t === 'baz') b += 0.5; else { a = 0; b = 0; }
      draw(RM || t === 'sifir' ? 0 : t === 'asit' ? 1 : -1); cap();
      if (!RM && t !== 'sifir') setTimeout(() => { if (el.isConnected) draw(0); }, 450);
    });
    draw(0);
    return () => {};
  };

  /* ---------- 7 · f70_solunum ---------- */
  VIZ.f70_solunum = (el) => {
    const S = {
      asit: { ad: 'Metabolik asidoz', up: 'Metabolik asidoz', car: 1, cen: 0, va: 40, amp: 2, f: 1, rozet: 'Kussmaul solunumu', etk: 'VT ↑↑, hız ≈' },
      hiper: { ad: 'Hiperkapni', up: 'Hiperkapni (PaCO₂ ↑)', car: 1, cen: 1, va: 50, amp: 2.4, f: 1.3, etk: 'VT ↑, hız ↑' },
      ikisi: { ad: 'Asidoz + hiperkapni', up: 'Asidoz ve hiperkapni birlikte', car: 1, cen: 1, va: 80, amp: 3.2, f: 1.6, etk: 'VT ↑↑, hız ↑' },
      alk: { ad: 'Alkalemi', up: 'Alkalemi (pH ↑)', car: 0.25, cen: 0.25, va: 14, amp: 0.9, f: 1, etk: 'VT ≈ ↓' },
    };
    const CAP = {
      asit: null,
      hiper: '<b>Hiperkapni.</b> Hem periferik hem santral kemoreseptörler algılar ve V̇A artar; hiperkapni güçlü bir uyarandır. [[K1 s. 333]]',
      ikisi: '<b>Asidoz + hiperkapni.</b> İkisinin birlikte yaptığı V̇A artışı yalnız asidozunkinin iki katıdır. [[K1 s. 333]]',
      alk: '<b>Alkalemi.</b> Karotis cisimciklerinin uyarısı azalır, V̇A biraz düşer; ventilasyon PAO₂\'yi korumak için sürmek zorunda olduğundan bu kompansasyon sınırlıdır. [[K1 s. 333]]',
    };
    let cur = 'asit';
    el.innerHTML = wrapHTML(`${seg('Uyaran', 'sc', Object.keys(S).map((k) => [k, S[k].ad]), 'asit')}<div class="f70-stage"></div>`);
    const stage = el.querySelector('.f70-stage');
    const draw = (t) => {
      const s = S[cur], VX = (v) => 30 + v * 3;
      let w = ''; for (let x = 0; x <= 320; x += 4) { const y = 342 - Math.sin(((x / 320) * 6.2832 * 3 * s.f) + t * 2) * 11 * s.amp; w += (x ? 'L' : 'M') + (20 + x) + ' ' + y.toFixed(1); }
      const kar = (x, y, ad, lab, g) => R(x, y, 160, 46, g > 0.5 ? 'f70-k-warn' : 'f70-k-chip', 8).replace('<rect', `<rect style="opacity:${0.45 + g * 0.55}"`) + T(x + 80, y + 20, ad, 'f70-b', 'middle') + T(x + 80, y + 36, lab, 'f70-m', 'middle');
      stage.innerHTML = svgOpen('so', 360, 410, 'Uyaran, kemoreseptörler, solunum merkezi ve alveoler ventilasyon') +
        R(60, 4, 240, 30, 'f70-k-acc', 8) + T(180, 24, s.up, 'f70-b', 'middle') + AR('so', 100, 36, 100, 66, 'ink', 2) + AR('so', 260, 36, 260, 66, 'ink', 2) +
        kar(12, 68, 'Karotis cisimcikleri', '(periferik)', s.car) + kar(188, 68, 'Santral kemoreseptörler', '', s.cen) +
        AR('so', 100, 116, 160, 142, 'ink', 2) + AR('so', 260, 116, 200, 142, 'ink', 2) + R(90, 144, 180, 30, 'f70-k-co2', 8) + T(180, 164, 'Solunum merkezi (medulla)', 'f70-b', 'middle') +
        AR('so', 180, 176, 180, 200, 'ink', 2) +
        T(30, 214, 'V̇A (temsilî ölçek)', 'f70-m') + R(30, 222, 300, 20, 'f70-bar-bg', 4) + R(30, 222, s.va * 3, 20, s.va > 16 ? 'f70-k-ok' : 'f70-k-acc', 4) +
        L(VX(16), 216, VX(16), 248, 'f70-ref') + T(VX(16), 262, 'normal', 'f70-m', 'middle') + T(VX(s.va) + (s.va > 60 ? -6 : 6), 238, fm(s.va, 0), 'f70-b', s.va > 60 ? 'end' : 'start') +
        (cur === 'ikisi' ? L(VX(40), 216, VX(40), 248, 'f70-ref') + T(VX(60), 262, '× 2 (asidozun iki katı)', 'f70-b f70-tc-ok', 'middle') : '') +
        (cur === 'alk' ? T(VX(16) + 6, 280, 'PAO₂ için ventilasyon sürmeli', 'f70-m f70-tc-acc') : '') +
        `<path d="${w}" class="f70-wave f70-s-co2"/>` + T(20, 300, s.etk, 'f70-m') + (s.rozet ? R(240, 288, 100, 20, 'f70-k-crit', 10) + T(290, 302, s.rozet, 'f70-b', 'middle') : '') +
        T(20, 392, 'solunum dalgası (genlik = VT, sıklık = hız)', 'f70-m') + '</svg>';
    };
    let t = 0;
    const pick = (k) => { cur = k; segSet(el, 'sc', k); draw(t); if (CAP[k]) capSet(el, CAP[k]); else el.closest('.viz').querySelector('.viz-cap').innerHTML = REF('<b>Metabolik asidoz.</b> Karotis cisimcikleri asidozu algılar; V̇A asidozun derecesiyle orantılı artar, artış esas olarak VT\'dendir (Kussmaul solunumu). Bir uyaran seçin. [[K1 s. 333]]'); };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-sc]'); if (b) pick(b.dataset.sc); });
    draw(0);
    return ticker(el, (dt) => { if (RM) return; t += dt; draw(t); });
  };

  /* ---------- molekül çizimi (pct, nh4) ---------- */
  const MOL = (x, y, tip, lab, o = 1) => {
    const k = { hco: 'f70-k-acc', h: 'f70-k-crit', co2: 'f70-k-co2', h2o: 'f70-k-chip', na: 'f70-k-chip', k: 'f70-k-chip', nh4: 'f70-k-nh', nh3: 'f70-k-nh f70-hole', gln: 'f70-k-warn', cl: 'f70-k-chip' }[tip];
    const r = lab.length > 2 ? 7 + lab.length * 3 : 10;
    return `<g style="opacity:${o}">${tip === 'gln' ? `<path d="M${x - 12} ${y}l6 -10h12l6 10l-6 10h-12z" class="${k}"/>` : C(x, y, r, k)}${T(x, y + 4, lab, 'f70-mol', 'middle')}</g>`;
  };
  const along = (pts, p) => { const n = pts.length - 1, f = clamp(p, 0, 1) * n, i = Math.min(n - 1, Math.floor(f)), q = f - i; return [lerp(pts[i][0], pts[i + 1][0], q), lerp(pts[i][1], pts[i + 1][1], q)]; };

  /* ---------- 8 · f70_pct (Şekil 70.1'in kendi çizimimiz) ---------- */
  VIZ.f70_pct = (el) => {
    const CAP = [
      '<b>Başlangıç.</b> HCO₃⁻ glomerülden serbestçe süzülür ama tübülün apikal zarını doğrudan geçemez. "İleri"ye basın. [[K1 s. 333]]',
      '<b>1 · H⁺ salgısı.</b> H⁺ Na⁺/H⁺ antiporteriyle lümene salınır; bu ikincil aktif taşımayı bazolateral Na⁺/K⁺-ATPaz\'ın kurduğu Na⁺ gradiyenti sürer. [[K1 s. 333]]',
      '<b>2 · Lümende CO₂.</b> H⁺ HCO₃⁻ ile birleşir: H₂CO₃ → CO₂ + H₂O; tepkimeyi fırçamsı kenardaki karbonik anhidraz katalizler. [[K1 s. 333]]',
      '<b>3 · Difüzyon.</b> Yağda çözünen CO₂ konsantrasyon gradiyentiyle apikal zarı geçip hücreye girer. [[K1 s. 333]]',
      '<b>4 · Ters tepkime.</b> Hücrede KA, CO₂ + H₂O\'dan H⁺ ve HCO₃⁻ yapar; H⁺ antiporterle yeniden lümene salınır. [[K1 s. 334]]',
      '<b>5 · Kana geçiş.</b> HCO₃⁻ sodyum bikarbonat kotaşıyıcısıyla kana geçer. Sonuçta süzülen HCO₃⁻ geri emilmiş olur; süzülenin ≈ %80\'i PKT\'de, plazma pH\'ından bağımsız emilir. [[K1 s. 333–334]]',
    ];
    const strip = document.createElement('div');
    strip.className = 'f70-strip'; strip.hidden = true;
    strip.innerHTML = REF('Distal tübül ve toplayıcı kanal: A tipi ara hücreler ve esas hücreler kalanını benzer yolla (H⁺ salgısı) emer · Normalde neredeyse tamamı emilir · Alkalemi: daha az emilir → idrar HCO₃⁻ ↑, idrar pH ↑ [[K1 s. 334]]');
    const stop = adimli(el, 6, (stage, st) => {
      st.onStep = (s) => { capSet(el, CAP[s]); strip.hidden = s !== 5; };
      st.anim = true;
      const YA = 150, YB = 330;
      return () => {
        const s = st.s, u = RM ? 1 : st.u, t = st.t;
        const pr = (k) => (s > k ? 1 : s === k ? ease(u) : 0);
        let h = svgOpen('pc', 360, 440, 'PKT hücresinde HCO₃⁻ geri emilimi: lümen, hücre ve kan') +
          R(0, 0, 360, YA, 'f70-k-chip', 0) + R(0, YA, 360, YB - YA, 'f70-k-warn', 0) + R(0, YB, 360, 110, 'f70-k-acc', 0) +
          T(8, 16, 'Tübül lümeni', 'f70-b') + T(8, YA + 18, 'PKT hücresi', 'f70-b') + T(8, YB + 18, 'Hücre dışı sıvı / kan', 'f70-b') +
          L(0, YA, 360, YA, 'f70-mem') + L(0, YB, 360, YB, 'f70-mem');
        for (let x = 6; x < 360; x += 9) h += L(x, YA - 7, x, YA, 'f70-brush');
        h += R(70, YA - 12, 60, 24, 'f70-tr', 6) + T(100, YA + 4, 'Na⁺/H⁺', 'f70-trl', 'middle') + T(100, YA - 18, 'antiporter', 'f70-m', 'middle') +
          R(30, YB - 12, 60, 24, 'f70-tr', 6) + T(60, YB + 4, 'ATPaz', 'f70-trl', 'middle') + T(60, YB - 18, 'Na⁺/K⁺', 'f70-m', 'middle') +
          R(210, YB - 12, 80, 24, 'f70-tr', 6) + T(250, YB + 4, 'Na⁺–HCO₃⁻', 'f70-trl', 'middle') + T(250, YB - 18, 'kotaşıyıcı', 'f70-m', 'middle') +
          T(236, YA - 14, 'KA', 'f70-b f70-tc-warn') + R(232, 236, 44, 24, 'f70-ka', 6).replace('<rect', '<rect style="fill:none"') + T(254, 253, 'KA', 'f70-b f70-tc-warn', 'middle');
        [[1, 144, YA + 28], [2, 276, YA - 14], [3, 196, YA + 40], [4, 300, 215], [5, 316, YB + 28]].forEach(([n, x, y]) => { h += C(x, y, 10, s === n ? 'f70-nr on' : 'f70-nr') + T(x, y + 4, n, 'f70-nrt', 'middle'); });
        if (s === 0) {
          const b = RM ? 1 : Math.abs(Math.sin(t * 2.2));
          h += MOL(170, lerp(36, YA - 18, b), 'hco', 'HCO₃⁻') + T(170, YA + 14, '✕', 'f70-x' + (b > 0.8 || RM ? '' : ' f70-fade'), 'middle') + T(8, 36, 'süzülen HCO₃⁻ ↓', 'f70-m');
        }
        if (s >= 1) {
          const p1 = pr(1), p2 = pr(2);
          // Na⁺ içe (apikal), K⁺ içe / Na⁺ dışa (bazolateral)
          h += MOL(88, lerp(106, 200, p1), 'na', 'Na⁺') + MOL(72, lerp(290, 380, p1), 'na', 'Na⁺') + MOL(46, lerp(385, 290, p1), 'k', 'K⁺');
          // H⁺: hücre → lümen; evre 2'de HCO₃⁻ ile birleşir
          if (s === 1) h += MOL(114, lerp(200, 106, p1), 'h', 'H⁺');
          if (s === 2) {
            if (p2 < 0.45) { const q = p2 / 0.45; h += MOL(lerp(114, 150, q), 106, 'h', 'H⁺') + MOL(170, 106, 'hco', 'HCO₃⁻'); }
            else if (p2 < 0.7) h += MOL(160, 106, 'h2o', 'H₂CO₃');
            else h += MOL(160, 110, 'co2', 'CO₂') + MOL(206, 100, 'h2o', 'H₂O');
          }
          if (s >= 3) h += MOL(206, 100, 'h2o', 'H₂O');
          if (s === 3) { const p3 = pr(3); h += MOL(160, lerp(110, 205, p3), 'co2', 'CO₂'); }
          if (s === 4) {
            const p4 = pr(4);
            if (p4 < 0.4) h += MOL(160, 205, 'co2', 'CO₂', 1 - p4 / 0.4);
            else {
              const m = (p4 - 0.4) / 0.6;
              h += MOL(lerp(196, 114, ease(m)), lerp(224, 200, ease(m)), 'h', 'H⁺', 1 - 0.6 * ease(m)) + MOL(214, 220, 'hco', 'HCO₃⁻', clamp(m * 2, 0, 1));
              h += MOL(114, lerp(200, 106, clamp((m - 0.5) * 2, 0, 1)), 'h', 'H⁺', clamp((m - 0.3) * 2, 0, 1) * 0.8);
            }
          }
          if (s === 5) {
            const p5 = pr(5);
            h += MOL(250, lerp(220, 390, p5), 'hco', 'HCO₃⁻') + MOL(292, lerp(190, 390, p5), 'na', 'Na⁺') + AR('pc', 250, 262, 250, 314, 'acc', 2, true);
            h += MOL(114, 106, 'h', 'H⁺', 0.4);
          }
        }
        stage.innerHTML = h + '</svg>';
      };
    });
    el.firstElementChild.appendChild(strip);
    return stop;
  };

  /* ---------- 9 · f70_nh4 (amonyagenez) ---------- */
  VIZ.f70_nh4 = (el) => {
    const CAP = [
      '<b>1 · Karaciğer.</b> Asidozda karaciğer NH₄⁺ ve HCO₃⁻\'ü üreye çevirmek yerine glutamin yapar. "İleri"ye basın. [[K1 s. 334]]',
      '<b>2 · PKT.</b> Glutamin kanla PKT hücresine gelir ve yeniden NH₄⁺ ile HCO₃⁻\'e ayrılır. [[K1 s. 334]]',
      '<b>3 · Salgı ve yeni HCO₃⁻.</b> NH₄⁺ Na⁺ karşılığında lümene salınır (bazolateral Na⁺/K⁺-ATPaz\'ın sürdüğü süreç); HCO₃⁻ Cl⁻ karşılığında kana geçer ve asidozu düzeltir. [[K1 s. 334]]',
      '<b>4 · Kalın çıkan kol.</b> NH₄⁺ Na⁺/K⁺/2Cl⁻ taşıyıcısının K⁺ yerinden geri emilir. [[K1 s. 334]]',
      '<b>5 · Medüller interstisyum.</b> NH₄⁺ bir H⁺ kaybedip NH₃ olur; NH₃\'e geçirgen medüller toplayıcı kanala difüzyonla girer. [[K1 s. 334]]',
      '<b>6 · Tuzak.</b> Süren asidozda tübül sıvısındaki bol H⁺ NH₃\'e bağlanır, yeniden NH₄⁺ oluşur; toplayıcı kanal NH₄⁺\'e geçirgen değildir, NH₄⁺ idrarla atılır. Glutamin başına bir H⁺ atılır; asidik süzüntüde bile kapasite çok yüksektir. [[K1 s. 334]]',
    ];
    return adimli(el, 6, (stage, st) => {
      st.onStep = (s) => capSet(el, CAP[s]);
      st.anim = true;
      const YOL = [[130, 179], [214, 179], [214, 330], [240, 346], [240, 270], [282, 262]];
      return () => {
        const s = st.s, u = RM ? 1 : st.u;
        const pr = (k) => (s > k ? 1 : s === k ? ease(u) : 0);
        let h = svgOpen('nh', 360, 470, 'Amonyagenez: karaciğerden glutamin, PKT, kalın çıkan kol ve toplayıcı kanal') +
          R(190, 206, 160, 204, 'f70-k-chip f70-dashbox', 8) + T(196, 402, 'Medüller interstisyum', 'f70-m') +
          R(0, 84, 200, 20, 'f70-k-acc', 0) + T(6, 99, 'Kan', 'f70-m') +
          R(0, 106, 200, 54, 'f70-k-warn', 0) + T(6, 122, 'PKT hücresi', 'f70-m') + R(0, 162, 214, 34, 'f70-k-chip', 0) + T(6, 178, 'PKT lümeni', 'f70-m') +
          `<path d="M214 179V330Q214 346 227 346Q240 346 240 330V214" class="f70-tube"/><path d="M240 340V214" class="f70-tube2"/><path d="M322 214V424" class="f70-tube"/>` +
          T(180, 268, 'Alçalan kol', 'f70-m', 'end') + L(184, 264, 208, 264, 'f70-ref') + T(180, 300, 'Kalın çıkan kol', 'f70-m', 'end') + L(184, 296, 233, 296, 'f70-ref') +
          T(312, 232, 'Toplayıcı', 'f70-m', 'end') + T(312, 246, 'kanal', 'f70-m', 'end') + AR('nh', 322, 424, 322, 452, 'nh', 2) + T(314, 462, 'İdrar', 'f70-b', 'end') +
          R(8, 4, 118, 50, 'f70-k-crit', 8) + T(67, 20, 'Karaciğer', 'f70-b', 'middle') + T(34, 44, 'üre', 'f70-m f70-strike', 'middle') + T(94, 44, 'glutamin', 'f70-b f70-tc-warn', 'middle') + AR('nh', 67, 56, 67, 80, 'muted', 1.5, true);
        if (s === 0) h += MOL(67, lerp(40, 94, pr(0)), 'gln', 'Gln');
        if (s === 1) { const q = pr(1); if (q < 0.5) h += MOL(lerp(67, 110, q * 2), lerp(94, 132, q * 2), 'gln', 'Gln'); else { const m = (q - 0.5) * 2; h += MOL(110 - m * 22, 132, 'nh4', 'NH₄⁺') + MOL(110 + m * 26, 132, 'hco', 'HCO₃⁻'); } }
        if (s === 2) {
          const q = pr(2);
          h += MOL(lerp(88, 128, q), lerp(132, 179, q), 'nh4', 'NH₄⁺') + MOL(lerp(136, 150, q), lerp(132, 94, q), 'hco', 'HCO₃⁻') + MOL(lerp(176, 170, q), lerp(179, 132, q), 'na', 'Na⁺') + MOL(lerp(60, 62, q), lerp(94, 132, q), 'cl', 'Cl⁻');
        }
        if (s >= 2) h += MOL(150, 94, 'hco', 'HCO₃⁻', s === 2 ? 0 : 1) + MOL(170, 132, 'na', 'Na⁺', s === 2 ? 0 : 0.7) + T(206, 98, '← yeni HCO₃⁻', 'f70-b f70-tc-acc', 'start').replace('x="206"', 'x="206"');
        if (s === 3) { const p = along(YOL, pr(3)); h += MOL(p[0], p[1], 'nh4', 'NH₄⁺'); }
        if (s === 4) { const q = pr(4); h += MOL(282, 262, 'nh4', 'NH₄⁺', 1 - clamp(q * 2, 0, 1)) + MOL(lerp(282, 282, q), lerp(262, 232, q), 'h', 'H⁺', clamp(q * 2, 0, 1)) + MOL(lerp(282, 322, q), 262, 'nh3', 'NH₃', clamp(q * 2, 0, 1)); h += T(282, 284, 'K⁺ yerine', 'f70-m', 'middle'); }
        if (s === 5) {
          const q = pr(5);
          h += MOL(282, 232, 'h', 'H⁺', 0.4);
          for (let i = 0; i < 3; i++) h += MOL(i === 1 ? 296 : 340, 286 + (i % 2) * 14 + (i === 2 ? 20 : 0), 'h', 'H⁺', 0.8 * (1 - clamp((q - 0.3) * 2, 0, 1)));
          if (q < 0.35) h += MOL(322, 262, 'nh3', 'NH₃'); else h += MOL(322, lerp(262, 392, ease((q - 0.35) / 0.65)), 'nh4', 'NH₄⁺');
          h += T(336, 330, '✕', 'f70-x', 'middle') + T(200, 336, '', '') + T(300, 336, 'NH₄⁺ geçemez', 'f70-m', 'end');
          h += R(150, 418, 150, 24, 'f70-k-crit', 12).replace('x="150"', 'x="30"') + T(105, 435, 'Atılan H⁺: 1 / glutamin', 'f70-b', 'middle');
        }
        stage.innerHTML = h + '</svg>';
      };
    });
  };

  /* ---------- 10 · f70_etki ---------- */
  VIZ.f70_etki = (el) => {
    // kutu: satırlara bölünmüş metin
    const BOX = (x, y, w, lines, k, tc = '') => { const h = lines.length * 14 + 10; return R(x, y, w, h, k, 8) + lines.map((s, i) => T(x + w / 2, y + 18 + i * 14, s, 'f70-b ' + tc, 'middle')).join(''); };
    const odc = (x, y, w, h, shifts) => {
      let o = L(x, y + h, x + w, y + h, 'f70-axis') + L(x, y, x, y + h, 'f70-axis');
      shifts.forEach(([sh, cl]) => { let d = ''; for (let i = 0; i <= 20; i++) { const p = i / 20 * 2, s = Math.pow(p / (1 + sh), 2.7) / (Math.pow(p / (1 + sh), 2.7) + 1); d += (i ? 'L' : 'M') + (x + (i / 20) * w).toFixed(1) + ' ' + (y + h - s * h).toFixed(1); } o += `<path d="${d}" class="f70-curve f70-s-${cl}" style="stroke-width:2"/>`; });
      return o;
    };
    const ST = {
      hafif: { ad: 'Hafif asidoz', terazi: ['depresyon', 'katekolamin'], m: 0, sonuc: ['Kalp debisi ≈ korunur', 'ok'], cap: null,
        ciz: () => R(140, 120, 80, 48, 'f70-k-crit', 24) + T(180, 149, 'Kalp', 'f70-b', 'middle') + BOX(70, 8, 220, ['Asidoz: doğrudan miyokard', 'depresyonu → atım hacmi ↓'], 'f70-k-crit') + AR('et', 180, 54, 180, 116, 'crit', 3) +
          BOX(4, 190, 150, ['Adrenal medulla →', 'katekolamin → inotropi ↑'], 'f70-k-ok') + AR('et', 90, 186, 144, 160, 'ok', 3) + T(256, 200, 'Hiperkapni adrenal', 'f70-m', 'middle') + T(256, 214, 'medulladan katekolamin', 'f70-m', 'middle') + T(256, 228, 'salgılatır', 'f70-m', 'middle') },
      agir: { ad: 'Ağır asidoz (pH < 7,0)', terazi: ['depresyon', 'katekolamin'], m: -0.75, sonuc: ['Kalp debisi ↓', 'crit'],
        cap: '<b>pH < 7,0.</b> Asidozun negatif inotropisi adrenalinin pozitif etkisini aşar; artan parasempatik akım bradikardi yapar; kalp debisi düşer. Aritmiler sıktır. [[K1 s. 334]]',
        ciz: () => R(140, 120, 80, 48, 'f70-k-crit', 24) + T(180, 149, 'Kalp', 'f70-b', 'middle') + BOX(70, 8, 220, ['Asidoz: doğrudan miyokard', 'depresyonu → atım hacmi ↓↓'], 'f70-k-crit') + AR('et', 180, 54, 180, 116, 'crit', 7) +
          BOX(4, 190, 150, ['Adrenal medulla →', 'katekolamin → inotropi ↑'], 'f70-k-ok') + AR('et', 90, 186, 144, 160, 'ok', 3) +
          BOX(206, 190, 150, ['Parasempatik akım ↑', '→ bradikardi'], 'f70-k-warn') + AR('et', 270, 186, 216, 160, 'warn', 3) + R(206, 238, 150, 36, 'f70-k-crit f70-hatch', 8) + T(281, 253, 'Aritmi: ventriküler', 'f70-b', 'middle') + T(281, 267, 'ekstrasistol, AF', 'f70-b', 'middle') },
      damar: { ad: 'Hiperkapni: damarlar', terazi: ['daralma', 'genişleme'], m: 0.3, sonuc: ['Sıçrayıcı nabız', 'warn'],
        cap: '<b>Damar tonusu.</b> Asidoz arteriyolleri daraltır, hiperkapni deri ve beyin gibi birçok yatağı genişletir: hiperkapnik hastanın sıçrayıcı nabzı. [[K1 s. 335]]',
        ciz: () => C(180, 118, 30, 'f70-k-chip') + C(180, 118, 16, 'f70-k-crit') + T(180, 122, 'arteriyol', 'f70-m', 'middle').replace('f70-m', 'f70-tk') + BOX(4, 8, 170, ['Asidoz:', 'vazokonstriksiyon'], 'f70-k-crit') + AR('et', 120, 56, 160, 96, 'crit', 3) +
          BOX(186, 8, 170, ['Hiperkapni: vazodilatasyon', '(deri, beyin)'], 'f70-k-ok') + AR('et', 230, 56, 200, 96, 'ok', 3) + T(60, 190, 'Deri', 'f70-b', 'middle') + T(180, 190, 'Beyin', 'f70-b', 'middle') + T(300, 190, 'Birçok yatak', 'f70-b', 'middle') +
          [60, 180, 300].map((x) => AR('et', x - 22, 208, x - 22 - 0, 208, 'ok', 0)).join('') + [60, 180, 300].map((x) => C(x, 214, 14, 'f70-k-ok') + C(x, 214, 5, 'f70-k-chip')).join('') },
      alk: { ad: 'Alkaloz', terazi: ['O₂ sunumu ↓', 'O₂ gereksinimi ↑'], m: 0.7, sonuc: ['O₂ talebi > sunumu', 'crit'],
        cap: '<b>Alkaloz.</b> Katekolamin duyarlılığı kasılmayı ve O₂ gereksinimini artırır; koroner vazokonstriksiyon ve sola kayan eğri O₂ sunumunu azaltır. [[K1 s. 335]]',
        ciz: () => R(130, 86, 80, 44, 'f70-k-crit', 22) + T(170, 114, 'Kalp', 'f70-b', 'middle') + BOX(4, 4, 200, ['Katekolamin yanıtı ↑ →', 'kasılma ↑ → O₂ gereksinimi ↑'], 'f70-k-warn') + AR('et', 110, 52, 150, 82, 'warn', 3) +
          BOX(214, 4, 142, ['Koroner', 'vazokonstriksiyon', '→ O₂ sunumu ↓'], 'f70-k-crit') + AR('et', 280, 70, 210, 106, 'crit', 3) +
          odc(30, 150, 120, 80, [[0, 'muted'], [-0.35, 'acc']]) + T(90, 250, 'ODC sola kayar', 'f70-b', 'middle') + T(180, 150, '', '') + T(200, 180, 'normal', 'f70-m').replace('x="200"', 'x="162"') + T(162, 196, 'alkaloz', 'f70-b f70-tc-acc') + T(162, 214, 'O₂ bırakımı ↓', 'f70-m') },
      akc: { ad: 'Akciğer', terazi: ['bronkokonstriksiyon (baskın)', 'bronkodilatasyon'], m: -0.55, sonuc: ['Hava yolu direnci ↑, solunum işi ↑', 'warn'],
        cap: '<b>Akciğer.</b> V̇A artar; eğri asidozda sağa, alkalozda sola kayar. Sağlıklı hiperkapnik hastada parasempatik bronkokonstriksiyon doğrudan bronkodilatasyonu aşar: direnç ve solunum işi artar. [[K1 s. 335]]',
        ciz: () => BOX(4, 4, 200, ['V̇A ↑ (karotis: düşük pH;', 'santral: hiperkapni)'], 'f70-k-co2') + `<path d="M280 20V90M280 90L250 126M280 90L310 126" class="f70-tube2"/>` + T(280, 14, 'bronş', 'f70-m', 'middle') + AR('et', 232, 70, 262, 90, 'co2', 2) +
          BOX(4, 100, 170, ['CO₂ doğrudan →', 'bronkodilatasyon'], 'f70-k-ok') + AR('et', 174, 124, 232, 130, 'ok', 2) + BOX(4, 154, 170, ['Parasempatik ↑ →', 'bronkokonstriksiyon (baskın)'], 'f70-k-crit') + AR('et', 174, 178, 232, 150, 'crit', 4) +
          odc(220, 170, 90, 56, [[0.3, 'crit'], [0, 'muted'], [-0.3, 'acc']]) + T(315, 190, 'asidoz →', 'f70-m').replace('x="315"', 'x="212"').replace('f70-m', 'f70-m') + T(265, 244, 'ODC', 'f70-m', 'middle') },
    };
    let cur = 'hafif';
    el.innerHTML = wrapHTML(`${seg('Durum', 'sc', Object.keys(ST).map((k) => [k, ST[k].ad]), 'hafif')}<div class="f70-stage"></div>`);
    const stage = el.querySelector('.f70-stage');
    const draw = () => {
      const s = ST[cur], mx = 180 + s.m * 130;
      stage.innerHTML = svgOpen('et', 360, 400, 'Asit–baz bozukluklarının kalp, damar ve akciğer üzerindeki etkileri') +
        s.ciz() +
        T(10, 292, 'Denge terazisi', 'f70-m') + L(20, 312, 340, 312, 'f70-beam') + L(180, 304, 180, 320, 'f70-axis') + `<path d="M${mx - 8} 296L${mx + 8} 296L${mx} 310z" class="f70-mark"/>` +
        T(20, 336, '← ' + s.terazi[0], 'f70-m').replace('x="20"', 'x="20"') + T(340, 352, s.terazi[1] + ' →', 'f70-m', 'end') +
        R(20, 362, 320, 28, 'f70-k-' + s.sonuc[1], 8) + T(180, 381, s.sonuc[0], 'f70-b', 'middle') + '</svg>';
      el.querySelectorAll('[data-sc]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.sc === cur)));
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-sc]'); if (!b) return; cur = b.dataset.sc; draw(); const c = ST[cur].cap; if (c) capSet(el, c); else el.closest('.viz').querySelector('.viz-cap').innerHTML = REF('<b>Hafif asidoz.</b> Doğrudan miyokard depresyonu atım hacmini azaltır, ama adrenal medulladan salınan katekolaminler bunu dengeler. Bir durum ya da organ seçin. [[K1 s. 334]]'); });
    draw();
    return () => {};
  };

  /* ---------- 11 · f70_kca ---------- */
  VIZ.f70_kca = (el) => {
    let ph = 7.4;
    el.innerHTML = wrapHTML(`<label class="f70-rng"><span>pH <b data-o="p"></b></span><input type="range" min="7" max="7.6" step="0.05" value="7.4" aria-label="pH"></label><div class="f70-stage"></div>`);
    const stage = el.querySelector('.f70-stage'), rng = el.querySelector('input');
    const draw = () => {
      const k = 4 + 0.6 * (7.4 - ph) / 0.1, KX = (v) => 20 + (clamp(v, 2, 7) - 2) * 64;
      const bound = ph <= 7.4 ? 0.5 - ((7.4 - ph) / 0.4) * 0.1 : 0.5 + ((ph - 7.4) / 0.2) * 0.05, bp = Math.round(bound * 100);
      const nH = ph < 7.4 ? Math.round(((7.4 - ph) / 0.4) * 3) : 0, nCa = Math.round(bound * 10);
      const pi = Math.round(ph * 100), asid = pi < 740, alk = pi > 740;
      let h = svgOpen('kc', 360, 520, 'pH’a göre plazma K⁺ ve albümine bağlı Ca²⁺') +
        T(10, 16, 'Plazma K⁺', 'f70-b') + R(20, 30, 320, 24, 'f70-frame', 4) + R(20, 30, Math.max(2, KX(k) - 20), 24, k > 5 || k < 3.5 ? 'f70-kfill' : 'f70-kok', 4) + R(KX(3.5), 26, KX(5) - KX(3.5), 32, 'f70-bant', 0) + T(KX(4.25), 22, 'normal bant', 'f70-m', 'middle') + [2, 3, 4, 5, 6, 7].map((v) => T(KX(v), 70, v, 'f70-tk', 'middle')).join('') +
        T(10, 104, 'K⁺ ' + fm(k, 1) + ' mmol/L', 'f70-big') + T(350, 104, 'Her 0,1 pH düşüşünde +0,6 mmol/L', 'f70-m', 'end').replace('Her 0,1 pH düşüşünde +0,6 mmol/L', '0,1 pH ↓ → +0,6') +
        // hücre ve pompa
        R(20, 120, 150, 92, 'f70-k-warn', 12) + T(30, 138, 'Hücre', 'f70-m') + C(95, 210, 19, 'f70-tr') + T(95, 214, 'Na⁺/K⁺', 'f70-trl', 'middle') + (asid ? T(95, 192, '✕', 'f70-x', 'middle') : '') +
        T(95, 166, 'ATPaz', 'f70-m', 'middle') + C(52, 180, 10, 'f70-k-chip') + T(52, 184, 'K⁺', 'f70-mol', 'middle') +
        (asid ? AR('kc', 64, 170, 186, 150, 'crit', 2.5) + T(200, 142, 'K⁺ dışarı sızar', 'f70-m') : alk ? AR('kc', 200, 150, 90, 170, 'acc', 2) + T(194, 142, 'K⁺ içeri', 'f70-m') : '') +
        (asid ? R(190, 156, 160, 52, 'f70-k-crit', 8) + T(270, 174, 'Total vücut K⁺\'u çoğu', 'f70-b', 'middle').replace('f70-b', 'f70-trl') + T(270, 188, 'zaman azalmış: yerine konmazsa', 'f70-trl', 'middle') + T(270, 202, 'hipokalemi', 'f70-trl', 'middle') : '') +
        // albümin
        T(10, 244, 'Albümin ve Ca²⁺', 'f70-b') + `<ellipse cx="110" cy="330" rx="76" ry="56" class="f70-k-chip"/>` + T(110, 334, 'Albümin', 'f70-b', 'middle');
      for (let i = 0; i < 10; i++) {
        const an = (i / 10) * 6.2832 - 1.2, x = 110 + Math.cos(an) * 76, y = 330 + Math.sin(an) * 56;
        const dolu = i < nCa ? 'ca' : i < nCa + nH ? 'h' : '';
        h += C(x, y, 9, dolu === 'ca' ? 'f70-k-ok' : dolu === 'h' ? 'f70-k-crit' : 'f70-site') + (dolu ? T(x, y + 4, dolu === 'ca' ? 'Ca' : 'H⁺', 'f70-mol', 'middle') : '');
      }
      h += T(200, 266, '10 bağlanma yeri (şematik)', 'f70-m') + T(200, 286, 'Ca  Ca²⁺', 'f70-m').replace('Ca  Ca²⁺', '') +
        C(206, 296, 7, 'f70-k-ok') + T(218, 300, 'Ca²⁺', 'f70-m') + C(206, 316, 7, 'f70-k-crit') + T(218, 320, 'H⁺', 'f70-m') + C(206, 336, 7, 'f70-site') + T(218, 340, 'boş yer', 'f70-m') +
        T(10, 418, 'İyonize (etkin) Ca²⁺', 'f70-m') + R(10, 426, 340, 22, 'f70-frame', 4) + R(10, 426, 3.4 * (100 - bp), 22, 'f70-k-ok', 4) + R(10 + 3.4 * (100 - bp), 426, 3.4 * bp, 22, 'f70-k-chip', 4) +
        T(14 + 0, 442, '%' + (100 - bp) + ' iyonize', 'f70-b') + T(346, 442, '%' + bp + ' bağlı', 'f70-b', 'end');
      if (asid) h += R(10, 460, 340, 22, 'f70-k-crit', 8) + T(180, 475, pi < 735 ? 'pH < 7,35: hiperkalemi riski → aritmi' : 'Asidoz: K⁺ ↑', 'f70-b', 'middle');
      if (pi > 745) h += R(10, 456, 340, 34, 'f70-k-acc', 8) + T(180, 470, 'Etkin hipokalsemi → Na⁺ geçirgenliği ↑, İZP kararsız', 'f70-trl', 'middle') + T(180, 484, 'parestezi (duyusal), tetani (motor); hipokapni: nöbet', 'f70-trl', 'middle');
      stage.innerHTML = h + '</svg>';
      el.querySelector('[data-o=p]').textContent = fm(ph, 2);
    };
    rng.addEventListener('input', () => {
      ph = +rng.value; draw(); const pi = Math.round(ph * 100), k = 4 + 0.6 * (7.4 - ph) / 0.1, p = fm(ph, 2);
      if (pi === 740) el.closest('.viz').querySelector('.viz-cap').innerHTML = REF('<b>pH 7,40.</b> K⁺ başlangıç düzeyinde; albümine bağlı ve iyonize Ca²⁺ dengede. pH\'ı kaydırın. [[K1 s. 335]]');
      else if (pi < 740) capSet(el, `<b>pH ${p}.</b> K⁺ ≈ ${fm(k, 1)} mmol/L (${fm(k - 4, 1)} mmol/L artış): asidoz Na⁺/K⁺-ATPaz'ı bozar, K⁺ hücre dışına sızar. H⁺ albümindeki Ca²⁺ yerleri için yarışır; iyonize Ca²⁺ artar. [[K1 s. 335]]`);
      else capSet(el, `<b>pH ${p}.</b> K⁺ ≈ ${fm(k, 1)} mmol/L. Albümine daha çok Ca²⁺ bağlanır, iyonize oran düşer: etkin hipokalsemi; parestezi ve tetani olabilir. [[K1 s. 335]]`);
    });
    draw();
    return () => {};
  };

  /* ---------- 12 · f70_isi ---------- */
  VIZ.f70_isi = (el) => {
    let Tm = 37, str = 'soguk';
    el.innerHTML = wrapHTML(`<label class="f70-rng"><span>Hasta ısısı <b data-o="t"></b></span><input type="range" min="20" max="37" step="1" value="37" aria-label="Hasta ısısı °C"></label>
      ${seg('Strateji', 'sc', [['soguk', 'Yalnız soğutma'], ['alfa', 'Alfa-stat'], ['phs', 'pH-stat']], 'soguk')}<div class="f70-stage"></div><div class="f70-panel f70-pstr"></div>`);
    const stage = el.querySelector('.f70-stage'), pnl = el.querySelector('.f70-pstr'), rng = el.querySelector('input');
    const hasta = () => { const d = 37 - Tm; return str === 'phs' ? { ph: 7.4, co: 5.3 } : { ph: Math.round((7.4 + 0.015 * d) * 100 + 1e-9) / 100, co: 5.3 * Math.pow(3.3 / 5.3, d / 10) }; };
    const draw = () => {
      const hs = hasta(), th = (Tm - 20) / 17, d = 37 - Tm;
      const fis = (x, ad, ph, co, ek, yon) => R(x, 14, 150, 170, 'f70-k-chip', 10) + T(x + 75, 34, ad, 'f70-b', 'middle') +
        T(x + 12, 66, 'pH', 'f70-m') + T(x + 138, 68, yon ? 'pH < 7,40' : fm(ph, 2), 'f70-big f70-tc-' + (yon ? 'crit' : hCls(ph)), 'end').replace('f70-big', 'f70-b2') +
        T(x + 12, 118, 'PaCO₂', 'f70-m') + T(x + 138, 120, yon ? '>5,3 kPa' : fm(co, 1) + ' kPa', 'f70-b2', 'end') +
        (yon ? '' : (ph < 7.35 ? '' : '')) + (ek ? R(x + 40, 140, 70, 26, 'f70-k-co2', 13) + T(x + 75, 157, '+ CO₂', 'f70-b', 'middle') : '');
      stage.innerHTML = svgOpen('is', 360, 250, 'Isıya göre kan gazı: cihazda ölçülen ve hastadaki gerçek değer') +
        R(16, 14, 22, 170, 'f70-frame', 11) + R(16, 14 + 170 * (1 - th), 22, 170 * th + 0, 'f70-k-crit', 11) + C(27, 194, 14, 'f70-k-crit') + T(27, 226, fm(Tm, 0) + ' °C', 'f70-b', 'middle') +
        fis(52, 'Cihazda (37 °C)', 7.4, 5.3, false, str === 'phs' && d > 0) + fis(206, 'Hastada (' + Tm + ' °C)', hs.ph, hs.co, str === 'phs' && d > 0, false).replace('', '') +
        (str === 'phs' ? '' : '') + '</svg>';
      el.querySelector('[data-o=t]').textContent = Tm + ' °C';
      const A = ['37 °C\'de ölçülen pH ve PaCO₂ normal tutulur', 'Gerçek pH > 7,45 kabul edilir', 'Serebral otoregülasyonu korur (düşünülen)', 'Hücrede elektrokimyasal nötraliteyi ve enzim işlevini korur (düşünülen)'];
      const P = ['Devreye CO₂ eklenir', 'Hastanın ısısına düzeltilmiş değerler normal', 'Hipotermideki ODC sola kaymasını dengeler → O₂ sunumu ↑ (öne sürülen)', 'PaCO₂ ↑ → beyin vazodilatasyonu → BKA ↑, otoregülasyon kaybolur', 'Emboli yükü ↑ → POKD ve inme riski (olası)'];
      const li = (a) => '<ul>' + a.map((x) => `<li>${x}</li>`).join('') + '</ul>';
      pnl.innerHTML = Tm === 37 ? '<p class="f70-ref">Fark hipotermide belirir: ısıyı düşürün.</p>' :
        str === 'phs' ? `<div class="f70-pc"><h4>pH-stat</h4>${li(P)}</div>` : str === 'alfa' ? `<div class="f70-pc"><h4>Alfa-stat</h4>${li(A)}</div>` : '<div class="f70-pc"><h4>Yalnız soğutma</h4><p>Cihaz örneği 37 °C\'ye ısıttığı için hep 7,40 ve 5,3 gösterir; hastanın gerçek değeri sağdaki fiştedir.</p></div>';
      pnl.innerHTML += `<p class="f70-ref">${REF('Hipotermik baypas ve derin hipotermik dolaşım arrestinde hangisinin üstün olduğu belirsiz [[K1 s. 336]]')}</p>`;
    };
    const cap = () => {
      const hs = hasta(), p = fm(hs.ph, 2), c = fm(hs.co, 1);
      if (Tm === 37 && str === 'soguk') { el.closest('.viz').querySelector('.viz-cap').innerHTML = REF('<b>37 °C.</b> Ölçülen ve gerçek değerler aynı: pH 7,40, PaCO₂ 5,3 kPa. Isıyı düşürün ya da bir baypas stratejisi seçin. [[K1 s. 336]]'); return; }
      if (str === 'alfa') capSet(el, `<b>Alfa-stat.</b> Alkalen kaymaya izin verilir: 37 °C'de ölçülen değerler normal, hastanın gerçek pH'ı ${p}. Otoregülasyonu ve enzim işlevini koruduğu düşünülür. [[K1 s. 336]]`);
      else if (str === 'phs') capSet(el, '<b>pH-stat.</b> Perfüzyonist CO₂ ekler; hastanın ısısında pH 7,40 ve PaCO₂ 5,3 kPa. ODC sola kaymasını dengelediği öne sürülür, ama beyin damarları genişler, BKA artar ve otoregülasyon kaybolur. [[K1 s. 336]]');
      else capSet(el, `<b>${Tm} °C.</b> Gerçek pH ${p}, PaCO₂ ${c} kPa; cihaz örneği 37 °C'ye ısıttığı için 7,40 ve 5,3 gösterir. Isı düştükçe pH 0,015/°C artar, CO₂ çözünürlüğü artar ve PaCO₂ düşer. ${Tm === 27 ? 'Kitabın örneği: 7,4 ve 5,3 kPa, 27 °C\'ye düzeltilince 7,55 ve 3,3 kPa. [[K1 s. 336]]' : '[[K1 s. 336]]'}`);
    };
    rng.addEventListener('input', () => { Tm = +rng.value; draw(); cap(); });
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-sc]'); if (!b) return; str = b.dataset.sc; segSet(el, 'sc', str); draw(); cap(); });
    draw();
    return () => {};
  };

  /* ---------- 13 · f70_stewart ---------- */
  VIZ.f70_stewart = (el) => {
    let na = 140, cl = 102, alb = 42, olgu = false;
    const INF = { paco2: ['PaCO₂', 'CO₂ üretimi ↔ alveoler ventilasyon: solunumsal bileşeni belirler.'], gu: ['Güçlü iyonlar', 'Na⁺, K⁺, Cl⁻: tam ayrışırlar; güçlü katyon güçlü anyondan fazlaysa güçlü iyon farkı pozitif olur.'], za: ['Zayıf asitler', 'Kısmen ayrışırlar; çoğu albümindir.'] };
    el.innerHTML = wrapHTML(`<div class="f70-rozet" role="group" aria-label="Üç bağımsız değişken">${Object.keys(INF).map((k) => `<button type="button" class="btn ghost" data-i="${k}" aria-pressed="false">${INF[k][0]}</button>`).join('')}</div><p class="f70-ipucu" aria-live="polite">Üç bağımsız değişkenden birini seçin.</p>
      <div class="f70-in">${[['na', 'Na⁺ (mmol/L)', 120, 160, 140], ['cl', 'Cl⁻ (mmol/L)', 85, 125, 102], ['alb', 'Albümin (g/L)', 5, 50, 42]].map(([k, ad, mn, mx, v]) => `<div class="f70-rng"><span>${ad}</span><span class="f70-pair"><input type="range" min="${mn}" max="${mx}" step="1" value="${v}" data-r="${k}" aria-label="${ad}"><input type="number" min="${mn}" max="${mx}" step="1" value="${v}" data-n="${k}" aria-label="${ad} değeri"></span></div>`).join('')}</div>
      ${seg('Hazır değerler', 'pre', [['n', 'Normal'], ['o', 'Yoğun bakım olgusu']], 'n')}<div class="f70-stage"></div>`);
    const stage = el.querySelector('.f70-stage');
    const AX = (v) => 20 + ((clamp(v, -15, 15) + 15) / 30) * 320;
    const eks = (y, ad, v, neg, pos) => {
      return T(10, y, ad, 'f70-b') + R(20, y + 10, 160, 18, 'f70-k-crit f70-faint', 0) + R(180, y + 10, 160, 18, 'f70-k-acc f70-faint', 0) + L(180, y + 6, 180, y + 32, 'f70-ref') +
        `<path d="M${AX(v) - 7} ${y + 4}L${AX(v) + 7} ${y + 4}L${AX(v)} ${y + 14}z" class="f70-mark"/>` + L(AX(v), y + 14, AX(v), y + 28, 'f70-mline') +
        [-15, -10, -5, 0, 5, 10, 15].map((q) => T(AX(q), y + 42, fm(q, 0), 'f70-tk', 'middle')).join('') + T(20, y + 58, neg, 'f70-m f70-tc-crit') + T(340, y + 58, pos, 'f70-m f70-tc-acc', 'end');
    };
    const draw = () => {
      const x = na - cl - 38, y = 0.25 * (42 - alb);
      stage.innerHTML = svgOpen('st', 360, olgu ? 340 : 230, 'Güçlü iyon farkı ve albümin etkisi: iki BDE değeri') +
        T(10, 14, 'BDE<tspan class="f70-sub" baseline-shift="sub">NaCl</tspan> = Na⁺ − Cl⁻ − 38 = ' + fm(x, 0) + ' mEq/L', 'f70-b') + eks(18, '', x, '← asidemi yönü (hiperkloremik asidoz)', 'alkalemi yönü →') +
        T(10, 124, 'BDE<tspan class="f70-sub" baseline-shift="sub">Alb</tspan> = 0,25 × (42 − albümin) = ' + fm(y, 1) + ' mEq/L', 'f70-b') + eks(128, '', y, '← asidemi yönü', 'alkalemi yönü →') +
        (olgu ? R(10, 218, 340, 62, 'f70-box', 8) + T(180, 238, 'Kan gazı: pH 7,45 · PaO₂ 12,1 kPa', 'f70-b', 'middle') + T(180, 256, 'PaCO₂ 5,0 kPa · HCO₃⁻ 26 mmol/L', 'f70-b', 'middle') + T(180, 273, 'Henderson–Hasselbalch: "normal" görünüyor', 'f70-m', 'middle') +
          AR('st', 130, 316, 40, 316, 'crit', 3) + AR('st', 230, 316, 320, 316, 'acc', 3) + T(85, 306, 'BDE<tspan class="f70-sub" baseline-shift="sub">NaCl</tspan> −6', 'f70-b f70-tc-crit', 'middle') + T(275, 306, 'BDE<tspan class="f70-sub" baseline-shift="sub">Alb</tspan> +7,5', 'f70-b f70-tc-acc', 'middle') + T(180, 320, '≈', 'f70-big', 'middle') : '') + '</svg>';
      ['na', 'cl', 'alb'].forEach((k) => { const v = { na, cl, alb }[k]; el.querySelector(`[data-r=${k}]`).value = v; const n = el.querySelector(`[data-n=${k}]`); if (document.activeElement !== n) n.value = v; });
    };
    const cap = () => {
      const x = na - cl - 38, y = 0.25 * (42 - alb);
      if (olgu) { capSet(el, '<b>Yoğun bakım olgusu.</b> Laparotomi ve ağır sepsisten sonra günlerdir ventile edilen hasta: pH ve HCO₃⁻ normal sınırda. BDE<sub>NaCl</sub> = 147 − 115 − 38 = −6 mEq/L (hiperkloremik metabolik asidoz), BDE<sub>Alb</sub> = 0,25 × (42 − 12) = +7,5 mEq/L (ağır hipoalbümineminin alkalozu). [[K1 s. 337]]'); return; }
      if (na === 140 && cl === 102 && alb === 42) { el.closest('.viz').querySelector('.viz-cap').innerHTML = REF('<b>Normal değerler.</b> Na⁺ 140, Cl⁻ 102 mmol/L, albümin 42 g/L: iki BDE de 0. Değerleri değiştirin ya da yoğun bakım olgusunu yükleyin. [[K1 s. 337]]'); return; }
      capSet(el, `<b>BDE<sub>NaCl</sub> ${fm(x, 0)}, BDE<sub>Alb</sub> ${fm(y, 1)} mEq/L.</b> BDE<sub>NaCl</sub> ${x < 0 ? 'asidemi yönünde' : x > 0 ? 'alkalemi yönünde' : '0: güçlü iyon dengesi normal'}; büyüklüğü bozukluğun derecesidir. Albümin ${alb} g/L${alb < 42 ? ': negatif yüklü albümin azaldığı için metabolik alkaloz' : alb > 42 ? ': albümin normalin üstünde' : ''}. [[K1 s. 337]]`);
    };
    const set = (k, v) => { v = clamp(Math.round(+v) || 0, k === 'na' ? 120 : k === 'cl' ? 85 : 5, k === 'na' ? 160 : k === 'cl' ? 125 : 50); if (k === 'na') na = v; else if (k === 'cl') cl = v; else alb = v; olgu = false; segSet(el, 'pre', na === 140 && cl === 102 && alb === 42 ? 'n' : ''); draw(); cap(); };
    el.addEventListener('input', (e) => { const k = e.target.dataset.r || e.target.dataset.n; if (k) set(k, e.target.value); });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.i) { el.querySelectorAll('[data-i]').forEach((q) => q.setAttribute('aria-pressed', String(q === b))); el.querySelector('.f70-ipucu').textContent = INF[b.dataset.i][1]; }
      if (b.dataset.pre) { if (b.dataset.pre === 'n') { na = 140; cl = 102; alb = 42; olgu = false; } else { na = 147; cl = 115; alb = 12; olgu = true; } segSet(el, 'pre', b.dataset.pre); draw(); cap(); }
    });
    draw();
    return () => {};
  };
})();
