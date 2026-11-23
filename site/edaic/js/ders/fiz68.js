/* Bölüm 68 · Renal filtrasyon ve geri emilim — bileşenler (tarif: docs/tasarim/fiz68.md; K1 s. 313–317).
   Şematik modeller; kitaptaki sayılar ilgili bileşenin viz-foot satırında belirtilmiştir. */
(() => {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (x) => (x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x));
  const fm = (v, d = 0) => (+v).toFixed(d).replace('.', ',').replace('-', '−');
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const cap = (el, html) => { const c = el.closest('.viz') && el.closest('.viz').querySelector('.viz-cap'); if (c) c.innerHTML = REF(html); };
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const rng = (k, label, min, max, step, val) => `<label class="f68-rng"><span>${label} <b data-o="${k}"></b></span><input type="range" min="${min}" max="${max}" step="${step}" value="${val}" data-r="${k}" aria-label="${label}"></label>`;
  // ok başlığı için marker tanımları (id'ler önekli)
  const defs = (p) => `<defs>${[['a', '--accent'], ['b', '--c-basic'], ['c', '--c-clin'], ['w', '--warn'], ['i', '--ink'], ['o', '--ok'], ['k', '--crit'], ['m', '--muted']].map(([n, v]) => `<marker id="${p}-m${n}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 1L9 5L0 9z" style="fill:var(${v})"/></marker>`).join('')}</defs>`;
  const arrow = (p, x1, y1, x2, y2, col, m, w = 2.2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(${col});stroke-width:${w}" marker-end="url(#${p}-m${m})" ${extra}/>`;

  /* ---- genel parçacık katmanı: çok noktalı yollar boyunca akış ---- */
  function polyAt(p, u) {
    let L = 0; const seg = [];
    for (let i = 1; i < p.length; i++) { const d = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); seg.push(d); L += d; }
    let s = u * L;
    for (let i = 0; i < seg.length; i++) { if (s <= seg[i] || i === seg.length - 1) { const f = seg[i] ? clamp(s / seg[i], 0, 1) : 0; return [lerp(p[i][0], p[i + 1][0], f), lerp(p[i][1], p[i + 1][1], f)]; } s -= seg[i]; }
    return p[p.length - 1];
  }
  function partLayer(g) {
    let items = [];
    return {
      set(specs) {
        g.textContent = ''; items = [];
        specs.forEach((s) => {
          const n = s.sh === 's' ? mk('rect', { x: -s.r, y: -s.r, width: 2 * s.r, height: 2 * s.r, rx: 1.5 }, g) : s.sh === 'd' ? mk('path', { d: `M0 ${-s.r - 1}L${s.r + 1} 0L0 ${s.r + 1}L${-s.r - 1} 0z` }, g) : mk('circle', { r: s.r }, g);
          n.style.fill = `var(${s.c})`; n.style.stroke = 'var(--paper)'; n.style.strokeWidth = '.8';
          items.push({ s, n });
        });
      },
      upd(t) {
        items.forEach(({ s, n }) => {
          const u = (t * s.sp + s.ph) % 1;
          const [x, y] = polyAt(s.p, u);
          n.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
          n.style.opacity = Math.min(1, u / 0.07, (1 - u) / 0.07).toFixed(2);
        });
      },
      still() {
        items.forEach(({ s, n }) => {
          const [x, y] = polyAt(s.p, s.still == null ? 0.5 : s.still);
          n.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); n.style.opacity = 1;
        });
      },
    };
  }

  /* ============ 1 · Bariyer ============ */
  VIZ.f68_bariyer = (el) => {
    const M = {
      su: { ad: 'Su / Na⁺', kda: 1, lbl: '< 7', yuk: 0, tur: 'kucuk' },
      glu: { ad: 'Glukoz', kda: 1, lbl: '< 7', yuk: 0, tur: 'kucuk' },
      anyon: { ad: 'Küçük anyon (Cl⁻)', kda: 1, lbl: '< 7', yuk: 1, tur: 'kucuk' },
      alb: { ad: 'Albümin', kda: 67, lbl: '67', yuk: 1, tur: 'prot' },
      hb: { ad: 'Hemoglobin', kda: 69.8, lbl: '69,8 (kitap)', yuk: 0, tur: 'hb' },
      igg: { ad: 'IgG', kda: 150, lbl: '≈ 150', yuk: 0, tur: 'prot' },
      ilac: { ad: 'Proteine bağlı ilaç', kda: 67, lbl: 'ilaç + albümin', yuk: 1, tur: 'ilac' },
    };
    const CAP = {
      su: '<b>Su ve Na⁺.</b> Su ve küçük çözünenler üç katmandan da serbestçe geçer; süzüntü plazmanın proteinsiz bir kısmıdır. [[K1 s. 313]]',
      glu: "<b>Glukoz (küçük, yüksüz).</b> 7 kDa'nın altındaki parçacıklar üç katmandan da serbestçe geçer. [[K1 s. 313]]",
      anyon: '<b>Küçük anyon.</b> Negatif yüklü olsa da bariyerin proteinlerine itilecek kadar yaklaşmaz; serbestçe süzülür. [[K1 s. 313]]',
      alb: '<b>Albümin (67 kDa).</b> Gözeneklerden geçecek kadar küçüktür ama negatif yükü bazal membran ve podositlerin negatif yükleri tarafından itilir; süzülmez. [[K1 s. 313]]',
      hb: '<b>Hemoglobin (kitapta 69,8 kDa).</b> Süzülebilecek kadar küçüktür; bu yüzden alyuvar içinde tutulmalıdır. Alyuvardan çıkan Hb molekülü süzülür. [[K1 s. 313]]',
      igg: "<b>İmmünoglobulin (≈ 150 kDa).</b> 70 kDa'nın üstündeki parçacıklar gözeneklerden geçemez. [[K1 s. 313]]",
      ilac: '<b>Proteine bağlı ilaç.</b> Asidik ilaçlar albümine, bazik ilaçlar α₁-asit glikoproteine bağlanır; bağlı kısım proteinle birlikte kalır, yalnız serbest kısım süzülür. Bağlanma oranı birçok ilacın klirensini belirler. [[K1 s. 313]]',
    };
    let sec = 'glu', cKda = 30, cYuk = 0, t = 0;
    const Y0 = 24, Y1 = 200;
    const GAPS = [120, 180, 240];
    // katmanlar
    const endo = []; { const xs = [0, 108, 132, 168, 192, 228, 252, 360]; for (let i = 0; i < xs.length; i += 2) endo.push(`<rect x="${xs[i]}" y="95" width="${xs[i + 1] - xs[i]}" height="16" rx="4" class="f68-endo"/>`); }
    const feet = []; { const xs = [4, 114, 126, 174, 186, 234, 246, 356]; for (let i = 0; i < xs.length; i += 2) feet.push(`<rect x="${xs[i]}" y="141" width="${xs[i + 1] - xs[i]}" height="18" rx="7" class="f68-foot"/>`); }
    const minus = []; for (let i = 0; i < 9; i++) minus.push(`<text x="${22 + i * 40}" y="130" class="f68-minus" text-anchor="middle">−</text>`);
    for (let i = 0; i < 9; i++) minus.push(`<text x="${22 + i * 40}" y="155" class="f68-minus" text-anchor="middle">−</text>`);
    el.innerHTML = `<div class="f68-bar-top"><span class="f68-badge" data-o="rozet"></span></div>
      <svg class="f68-svg" viewBox="0 0 360 250" role="img" aria-label="Glomerül filtrasyon bariyerinin kesiti: kapiller endotel, bazal membran ve podositler; seçilen molekülün geçişi ya da tutulması">
        <rect x="0" y="0" width="360" height="92" rx="10" class="f68-kan"/>
        <rect x="0" y="162" width="360" height="88" rx="10" class="f68-suz"/>
        ${endo.join('')}
        <rect x="0" y="115" width="360" height="20" class="f68-gbm"/>
        <g class="f68-mx">${minus.join('')}</g>
        ${feet.join('')}
        <ellipse cx="40" cy="48" rx="19" ry="9" class="f68-rbc"/><ellipse cx="320" cy="62" rx="19" ry="9" class="f68-rbc"/>
        <text x="8" y="14" class="f68-t f68-b">Glomerül kapilleri (kan)</text>
        <text x="352" y="106" class="f68-t" text-anchor="end">Endotel · fenestrasyonlar</text>
                <text x="352" y="128" class="f68-t" text-anchor="end">Bazal membran (−)</text>
        <text x="352" y="172" class="f68-t" text-anchor="end">Podosit ayaksı çıkıntıları (−)</text>
        <text x="8" y="242" class="f68-t f68-b">Bowman boşluğu (süzüntü)</text>
        <g class="f68-mol"></g>
      </svg>
      <div class="f68-olc"><div class="f68-olc-bar" aria-hidden="true"><i class="s" style="width:36.7%"></i><i class="k" style="width:43.3%"></i><i class="g" style="width:20%"></i><u data-o="isaret"></u></div>
        <div class="f68-olc-t" aria-hidden="true"><span style="width:36.7%">&lt; 7 kDa serbest</span><span style="width:43.3%">7–70 kısmi</span><span style="width:20%">&gt; 70 geçmez</span></div></div>
      ${segHtml('Hazır molekül', 'm', Object.keys(M).map((k) => [k, M[k].ad]), sec)}
      <div class="f68-ozel"><b>Kendin ayarla</b>
        <label class="f68-rng"><span>Boyut <b data-o="kda"></b></span><input type="range" min="0" max="2.3" step="0.01" value="${Math.log10(cKda)}" data-r="kda" aria-label="Molekül boyutu, 1 ile 200 kilodalton"></label>
        ${segHtml('Yük', 'y', [['0', 'Yük: nötr'], ['1', 'Yük: negatif']], '0')}</div>`;
    const g = el.querySelector('.f68-mol'), svg = el.querySelector('svg');
    const lanes = [0, 1, 2].map(() => ({ gr: mk('g', {}, g), key: '' }));
    const set = (n, v) => { const q = el.querySelector(`[data-o="${n}"]`); if (q) q.textContent = v; };
    const cur = () => (sec === 'custom' ? { ad: 'Özel', kda: cKda, lbl: fm(cKda, cKda < 10 ? 1 : 0), yuk: cYuk, tur: cKda < 7 ? 'kucuk' : cKda > 70 ? 'prot' : 'orta' } : M[sec]);
    function sonuc(m) {
      if (m.tur === 'kucuk') return ['Serbestçe süzülür', 'ok'];
      if (m.tur === 'hb') return ['Serbest Hb süzülür; alyuvar içinde tutulur', 'warn'];
      if (m.tur === 'ilac') return ['Tutulur: proteine bağlı', 'crit'];
      if (m.kda > 70) return ['Tutulur: boyut', 'crit'];
      if (m.yuk) return ['Tutulur: yük', 'crit'];
      return ['Kısmen süzülür', 'warn'];
    }
    function lane(m, i, cyc) { // kind, yStop, glow
      if (m.tur === 'kucuk') return { k: 'gec' };
      if (m.tur === 'hb') return i === 1 ? { k: 'dur', ys: 87, rbc: 1 } : { k: 'gec' };
      if (m.tur === 'ilac') return i === 2 ? { k: 'gec', ilac: 1 } : { k: 'dur', ys: 118, glow: 1, ilac: 2 };
      if (m.kda > 70) return { k: 'dur', ys: 88 };
      if (m.yuk) return { k: 'dur', ys: 118, glow: 1 };
      return (cyc + i) % 2 === 0 ? { k: 'gec' } : { k: 'dur', ys: 124 };
    }
    function pos(sp, ph) { // y ve saydamlık
      let y, o = Math.min(1, ph / 0.06, (1 - ph) / 0.08);
      if (sp.k === 'gec') y = Y0 + (Y1 - Y0) * ease(ph / 0.75);
      else if (ph < 0.35) y = Y0 + (sp.ys - Y0) * ease(ph / 0.35);
      else if (ph < 0.55) y = sp.ys;
      else y = sp.ys + (Y0 - sp.ys) * ease((ph - 0.55) / 0.35);
      return [y, o];
    }
    function draw() {
      const m = cur(), r = clamp(3.4 + 1.8 * Math.log10(Math.max(1, m.kda)), 3.4, 8);
      let glow = false;
      lanes.forEach((L, i) => {
        const u = t / 3.2 + i * 0.33, cyc = Math.floor(u), ph = u - cyc;
        const sp = lane(m, i, cyc);
        const key = `${sec}|${cKda}|${cYuk}|${sp.k}|${sp.rbc || 0}|${sp.ilac || 0}`;
        if (L.key !== key) {
          L.key = key; L.gr.textContent = '';
          if (sp.rbc) { mk('ellipse', { rx: 17, ry: 9, class: 'f68-rbc' }, L.gr); mk('circle', { r: 4.5, class: 'f68-mol-c' }, L.gr); }
          else if (sp.ilac === 2) { mk('circle', { r: 8, class: 'f68-mol-c' }, L.gr); mk('circle', { r: 3.2, cx: 8, cy: -5, class: 'f68-drug' }, L.gr); }
          else if (sp.ilac === 1) { mk('circle', { r: 3.2, class: 'f68-drug' }, L.gr); }
          else {
            mk('circle', { r: m.tur === 'kucuk' ? 3.8 : r, class: 'f68-mol-c' }, L.gr);
            if (m.yuk) { const tx = mk('text', { y: 3.6, 'text-anchor': 'middle', class: 'f68-mol-m' }, L.gr); tx.textContent = '−'; }
          }
        }
        let y, o;
        if (RM) { y = sp.k === 'gec' ? Y1 - 6 * i : sp.ys; o = 1; } else [y, o] = pos(sp, ph);
        if (sp.glow && (RM || (ph > 0.3 && ph < 0.6))) glow = true;
        const sh = sp.glow && !RM && ph > 0.35 && ph < 0.55 ? Math.sin(t * 40) * 1.2 : 0;
        L.gr.setAttribute('transform', `translate(${GAPS[i] + sh} ${y.toFixed(1)})`);
        L.gr.style.opacity = o.toFixed(2);
      });
      svg.classList.toggle('f68-glow', glow);
    }
    function refresh(capHtml) {
      const m = cur(), [txt, kind] = sonuc(m);
      const b = el.querySelector('[data-o="rozet"]'); b.textContent = txt; b.className = 'f68-badge ' + kind;
      set('kda', fm(cKda, cKda < 10 ? 1 : 0) + ' kDa');
      const k = clamp(m.kda, 1, 200); el.querySelector('[data-o="isaret"]').style.left = (Math.log10(k) / Math.log10(200) * 100).toFixed(1) + '%';
      lanes.forEach((L) => (L.key = ''));
      if (capHtml) cap(el, capHtml);
      draw();
    }
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-m]'); if (b) { sec = b.dataset.m; basSec(el, 'm', sec); refresh(CAP[sec]); return; }
      const y = e.target.closest('[data-y]'); if (y) { cYuk = +y.dataset.y; basSec(el, 'y', cYuk); sec = 'custom'; basSec(el, 'm', ''); refresh(ozelCap()); }
    });
    el.addEventListener('input', (e) => { if (e.target.dataset.r === 'kda') { cKda = Math.round(Math.pow(10, +e.target.value) * 10) / 10; sec = 'custom'; basSec(el, 'm', ''); refresh(ozelCap()); } });
    function ozelCap() {
      const m = cur(); let s;
      if (m.kda < 7) s = "Serbestçe süzülür: 7 kDa'nın altı."; else if (m.kda > 70) s = "Tutulur: 70 kDa'nın üstü gözeneklerden geçemez."; else if (m.yuk) s = 'Tutulur: negatif yüklü protein bariyerin negatif yüklerince itilir.'; else s = 'Kısmen süzülür: 7–70 kDa arası.';
      return `<b>${fm(m.kda, m.kda < 10 ? 1 : 0)} kDa, ${m.yuk ? 'negatif' : 'nötr'}.</b> ${s} [[K1 s. 313]]`;
    }
    set('kda', '');
    refresh();
    const stop = RM ? () => {} : ticker(el, (dt) => { t += dt; draw(); });
    return stop;
  };

  /* ============ 2 · PKT hücresi ============ */
  VIZ.f68_pkt = (el) => {
    const P = 'f68pk';
    const STEP = [
      { cap: '<b>1 · Na⁺/K⁺-ATPaz.</b> Bazolateral zardaki pompa ATP harcayarak Na⁺\'u hücreden peritübüler kapillere çıkarır, karşılığında K⁺ alır; hücre içi Na⁺ düşer. "İleri"ye basın. [[K1 s. 313]]', hi: ['pump'], rows: [0],
        fl: [{ p: [[150, 118], [265, 118], [322, 118]], c: '--c-clin', n: 3, m: 'c', r: 4.5 }, { p: [[322, 136], [265, 136], [170, 136]], c: '--muted', n: 2, m: 'm', r: 4.5 }] },
      { cap: '<b>2 · SGLT2 kotransporteri.</b> Düşük hücre içi Na⁺, Na⁺\'u lümenden hücreye çeker; SGLT2 bu akıma glukozu da bağlar ve ikisini birlikte içeri alır. Normal kişide süzülen glukozun %100\'ü geri emilir. [[K1 s. 313–314]]', hi: ['sglt'], rows: [2],
        fl: [{ p: [[14, 98], [85, 98], [140, 98]], c: '--c-clin', n: 3, m: 'c', r: 4.5 }, { p: [[14, 112], [85, 112], [150, 118], [215, 160], [270, 160], [322, 160]], c: '--accent', n: 3, m: 'a', r: 4.5, sh: 's' }] },
      { cap: '<b>3 · Na⁺/H⁺ karşı taşıyıcısı.</b> Na⁺ içeri girerken H⁺ lümene çıkar; bu karşı taşıma asit atılımında görev alır. PKT süzülen HCO₃⁻\'ün %85\'ini geri emer. [[K1 s. 313–314]]', hi: ['nhe'], rows: [1],
        fl: [{ p: [[14, 180], [85, 180], [130, 180]], c: '--c-clin', n: 3, m: 'c', r: 4.5 }, { p: [[130, 196], [85, 196], [14, 196]], c: '--crit', n: 3, m: 'k', r: 4 }] },
      { cap: '<b>4 · Su pasif.</b> Su enerji harcanmadan geri döner: Starling kuvvetlerinin dengesi toplu geri emilimden yanadır (Bölüm 36). Na⁺, K⁺, Cl⁻ ve suyun %67\'si PKT\'de geri emilir. [[K1 s. 313–314]]', hi: ['su'], rows: [0],
        fl: [{ p: [[14, 224], [85, 224], [265, 224], [322, 224]], c: '--c-basic', n: 6, m: 'b', r: 3.4 }] },
      { cap: '<b>5 · Suyla sürüklenenler.</b> Bazı elektrolitler ve üre gibi küçük moleküller suyla birlikte pasif olarak geri emilir. [[K1 s. 314]]', hi: ['su', 'ure'], rows: [0],
        fl: [{ p: [[14, 224], [85, 224], [265, 224], [322, 224]], c: '--c-basic', n: 4, m: 'b', r: 3.4 }, { p: [[14, 240], [85, 240], [265, 240], [322, 240]], c: '--ok', n: 4, m: 'o', r: 4, sh: 's' }] },
      { cap: '<b>6 · Toplam.</b> Geri emilimin çoğu PKT\'de olur ve çoğu aktiftir; böbreğin yüksek metabolik etkinliğinin nedeni budur. Lümende kalan sıvı nefronun devamına geçer. [[K1 s. 313]]', hi: ['pump', 'sglt', 'nhe', 'su', 'ure'], rows: [0, 1, 2], all: 1 },
    ];
    STEP[5].fl = [].concat(STEP[0].fl, STEP[1].fl, STEP[2].fl, STEP[3].fl, STEP[4].fl.slice(1));
    let s = 0, play = false, tt = 0, t = 0;
    el.innerHTML = `<svg class="f68-svg" viewBox="0 0 360 292" role="img" aria-label="Proksimal tübül hücresi: soldan tübül lümeni, ortada hücre, sağda peritübüler kapiller; Na⁺/K⁺-ATPaz, SGLT2 ve Na⁺/H⁺ taşıyıcıları">
        ${defs(P)}
        <rect x="0" y="40" width="80" height="214" rx="8" class="f68-tub"/>
        <rect x="85" y="40" width="180" height="214" rx="12" class="f68-hucre"/>
        <rect x="270" y="40" width="90" height="214" rx="8" class="f68-kan"/>
        <g class="f68-mv">${Array.from({ length: 9 }, (_, i) => `<line x1="85" y1="${52 + i * 23}" x2="75" y2="${52 + i * 23}"/>`).join('')}</g>
        <text x="40" y="14" text-anchor="middle" class="f68-t f68-b">Tübül</text><text x="40" y="28" text-anchor="middle" class="f68-t f68-b">lümeni</text>
        <text x="175" y="20" text-anchor="middle" class="f68-t f68-b">PKT hücresi</text>
        <text x="315" y="14" text-anchor="middle" class="f68-t f68-b">Peritübüler</text><text x="315" y="28" text-anchor="middle" class="f68-t f68-b">kapiller</text>
        <text x="175" y="55" text-anchor="middle" class="f68-t">Hücre içi Na⁺: <tspan data-o="nal">yüksek</tspan></text>
        <rect x="115" y="62" width="120" height="8" rx="4" class="f68-gtr"/><rect x="115" y="62" width="120" height="8" rx="4" class="f68-gfill" data-o="naw"/>
        <g data-id="sglt" class="f68-tr"><rect x="79" y="94" width="12" height="26" rx="3" class="f68-tas"/><text x="97" y="90" class="f68-t">SGLT2</text></g>
        <g data-id="nhe" class="f68-tr"><rect x="79" y="172" width="12" height="32" rx="3" class="f68-tas"/><text x="97" y="168" class="f68-t">Na⁺/H⁺</text></g>
        <g data-id="pump" class="f68-tr"><circle cx="265" cy="127" r="15" class="f68-tas"/><text x="265" y="131" text-anchor="middle" class="f68-t f68-b">ATP</text><text x="255" y="100" text-anchor="end" class="f68-t">Na⁺/K⁺-ATPaz</text></g>
        <g data-id="su" class="f68-tr"><text x="175" y="210" text-anchor="middle" class="f68-t f68-muted">su ve üre: pasif</text></g>
        <text x="85" y="272" text-anchor="middle" class="f68-t">Lümen zarı</text><text x="265" y="272" text-anchor="middle" class="f68-t">Bazolateral zar</text>
        <g class="f68-ok"></g><g class="f68-pt"></g>
      </svg>
      <div class="f68-pay" aria-hidden="true"><span data-row="0">Na⁺, K⁺, Cl⁻, su <b>%67</b></span><span data-row="1">HCO₃⁻ <b>%85</b></span><span data-row="2">Glukoz, amino asit <b>%100</b></span></div>
      <div class="f68-lej"><span><i style="background:var(--c-clin)"></i>Na⁺</span><span><i style="background:var(--muted)"></i>K⁺</span><span><i style="background:var(--accent)"></i>Glukoz</span><span><i style="background:var(--crit)"></i>H⁺</span><span><i style="background:var(--c-basic)"></i>Su</span><span><i style="background:var(--ok)"></i>Üre</span></div>
      <div class="btn-row"><button type="button" class="btn ghost" data-a="geri">← Geri</button><button type="button" class="btn" data-a="ileri">İleri →</button><button type="button" class="btn ghost" data-a="oyna">Oynat</button></div>
      <div class="f68-adim">${segHtml('Adım', 's', STEP.map((_, i) => [String(i), String(i + 1)]), '0')}</div>`;
    const layer = partLayer(el.querySelector('.f68-pt')), okG = el.querySelector('.f68-ok');
    const naw = el.querySelector('[data-o="naw"]'), nal = el.querySelector('[data-o="nal"]');
    function build() {
      const st = STEP[s], specs = [];
      okG.innerHTML = st.fl.map((f) => `<polyline points="${f.p.map((q) => q.join(',')).join(' ')}" fill="none" class="f68-yol" style="stroke:var(${f.c})" marker-end="url(#${P}-m${f.m})"/>`).join('');
      st.fl.forEach((f) => { for (let i = 0; i < f.n; i++) specs.push({ p: f.p, c: f.c, r: f.r, sh: f.sh, sp: 0.28, ph: i / f.n, still: (i + 0.5) / f.n }); });
      layer.set(specs);
      el.querySelectorAll('.f68-tr').forEach((g) => g.classList.toggle('on', st.hi.includes(g.dataset.id)));
      el.querySelector('svg').classList.toggle('f68-dim', !st.all);
      el.querySelectorAll('[data-row]').forEach((r) => r.classList.toggle('on', st.rows.includes(+r.dataset.row)));
      basSec(el, 's', s);
      el.querySelector('[data-a="geri"]').disabled = s === 0;
      el.querySelector('[data-a="ileri"]').disabled = s === STEP.length - 1;
      el.querySelector('[data-a="oyna"]').textContent = play ? 'Duraklat' : s === STEP.length - 1 ? 'Baştan' : 'Oynat';
      tt = 0; gauge(); if (RM) layer.still();
      cap(el, st.cap);
    }
    function gauge() {
      const f = s === 0 ? (RM ? 1 : ease(tt / 2.5)) : 1;
      const lvl = lerp(1, 0.25, f);
      naw.setAttribute('width', (120 * lvl).toFixed(1)); nal.textContent = lvl > 0.6 ? 'yüksek' : 'düşük';
    }
    el.addEventListener('click', (e) => {
      const a = e.target.closest('[data-a]'), b = e.target.closest('[data-s]');
      if (b) { s = +b.dataset.s; play = false; build(); return; }
      if (!a) return;
      if (a.dataset.a === 'geri' && s > 0) { s--; play = false; build(); }
      else if (a.dataset.a === 'ileri' && s < STEP.length - 1) { s++; build(); }
      else if (a.dataset.a === 'oyna') { if (s === STEP.length - 1 && !play) s = 0; play = !play; build(); }
    });
    build();
    return ticker(el, (dt) => {
      t += dt; tt += dt;
      if (!RM) { layer.upd(t); gauge(); }
      if (play && tt > 3.5) { if (s < STEP.length - 1) { s++; build(); } else { play = false; build(); } }
    });
  };

  /* ============ 3 · Tmax ============ */
  VIZ.f68_tmax = (el) => {
    const TMAX = 300, X0 = 46, Y0 = 256, SX = 10, SY = 0.4;
    let G = 5, preg = false, play = false;
    const K = () => (preg ? 37.5 : 25);
    const thr = () => TMAX / K();
    const xs = (g) => X0 + g * SX, ys = (v) => Y0 - Math.min(v, 600) * SY;
    const line = (k, f) => { const pts = []; for (let g = 0; g <= 30; g += 0.5) pts.push(`${xs(g).toFixed(1)},${ys(f(g, k)).toFixed(1)}`); return pts.join(' '); };
    const F = (g, k) => k * g, R = (g, k) => Math.min(k * g, TMAX), E = (g, k) => Math.max(0, k * g - TMAX);
    const tx = [0, 5, 10, 15, 20, 25, 30].map((v) => `<line x1="${xs(v)}" y1="${Y0}" x2="${xs(v)}" y2="${Y0 + 4}" class="f68-ax"/><text x="${xs(v)}" y="${Y0 + 16}" text-anchor="middle" class="f68-t">${v}</text>`).join('');
    const ty = [0, 100, 200, 300, 400, 500, 600].map((v) => `<line x1="${X0}" y1="${ys(v)}" x2="${X0 + 300}" y2="${ys(v)}" class="f68-gr"/><text x="${X0 - 6}" y="${ys(v) + 4}" text-anchor="end" class="f68-t">${v}</text>`).join('');
    el.innerHTML = `<svg class="f68-svg" viewBox="0 0 360 306" role="img" aria-label="Plazma glukozuna karşı süzülen, geri emilen ve idrarla atılan glukoz taşınması">
        <defs><clipPath id="f68tm-clip"><rect x="${X0}" y="${ys(600)}" width="300" height="${600 * SY}"/></clipPath></defs>
        ${ty}${tx}
        <line x1="${X0}" y1="${ys(600)}" x2="${X0}" y2="${Y0}" class="f68-ax"/><line x1="${X0}" y1="${Y0}" x2="${X0 + 300}" y2="${Y0}" class="f68-ax"/>
        <text x="${X0 + 150}" y="${Y0 + 34}" text-anchor="middle" class="f68-t f68-b">Plazma glukozu (mmol/L)</text>
        <text transform="translate(11 ${ys(300)}) rotate(-90)" text-anchor="middle" class="f68-t f68-b">Glukoz taşınması (mg/dk)</text>
        <line x1="${X0}" y1="${ys(TMAX)}" x2="${X0 + 300}" y2="${ys(TMAX)}" class="f68-tmaxl"/>
        <text x="${X0 + 296}" y="${ys(TMAX) - 5}" text-anchor="end" class="f68-t">Tmax ≈ 300 mg/dk</text>
        <g clip-path="url(#f68tm-clip)">
          <g data-g="n"><polyline data-l="nF" class="f68-l f68-lf" points="${line(25, F)}"/><polyline data-l="nR" class="f68-l f68-lr" points="${line(25, R)}"/><polyline data-l="nE" class="f68-l f68-le" points="${line(25, E)}"/></g>
          <g data-g="p" style="display:none"><polyline class="f68-l f68-lf" points="${line(37.5, F)}"/><polyline class="f68-l f68-lr" points="${line(37.5, R)}"/><polyline class="f68-l f68-le" points="${line(37.5, E)}"/></g>
        </g>
        <line data-o="esik" y1="${ys(600) - 2}" y2="${Y0}" class="f68-esik"/><text data-o="esikt" y="${ys(600) - 6}" class="f68-t">Eşik ≈ 12 mmol/L</text>
        <line data-o="im" y1="${ys(600)}" y2="${Y0}" class="f68-im"/>
        <circle data-o="dF" r="4.5" class="f68-nf"/><circle data-o="dR" r="4.5" class="f68-nr"/><circle data-o="dE" r="4.5" class="f68-ne"/>
      </svg>
      <div class="f68-lej"><span><i class="kesik" style="--k:var(--accent)"></i>Süzülen</span><span><i style="background:var(--ok)"></i>Geri emilen</span><span><i style="background:var(--crit)"></i>Atılan (idrar)</span></div>
      <div class="f68-kvrow"><dl class="f68-kv"><div><dt>Süzülen</dt><dd data-o="vF"></dd></div><div><dt>Geri emilen</dt><dd data-o="vR"></dd></div><div><dt>İdrarda</dt><dd data-o="vE"></dd></div></dl>
        <div class="f68-tup"><svg viewBox="0 0 60 80" width="46" height="62" role="img" aria-label="İdrar tüpü"><rect x="14" y="4" width="32" height="70" rx="9" class="f68-tupk" data-o="tup"/><g data-o="tupd"></g></svg><span>Glikozüri<br><b data-o="gli"></b></span></div></div>
      ${rng('G', 'Plazma glukozu', 0, 30, 0.5, G)}
      <div class="f68-row">${segHtml('Durum', 'p', [['0', 'Normal'], ['1', 'Gebelik']], '0')}<button type="button" class="btn ghost" data-a="oyna">Oynat</button></div>`;
    const q = (n) => el.querySelector(`[data-o="${n}"]`);
    const rnd = (() => { let s = 11; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();
    const pts = Array.from({ length: 30 }, () => [rnd() * 24 + 18, rnd() * 56 + 12]);
    function draw(capUpd) {
      const k = K(), f = F(G, k), r = R(G, k), e = E(G, k), x = xs(G);
      q('im').setAttribute('x1', x); q('im').setAttribute('x2', x);
      [['dF', f], ['dR', r], ['dE', e]].forEach(([n, v]) => { q(n).setAttribute('cx', x); q(n).setAttribute('cy', ys(v)); });
      const th = thr(); q('esik').setAttribute('x1', xs(th)); q('esik').setAttribute('x2', xs(th));
      const et = q('esikt'); et.textContent = preg ? 'Eşik ≈ 8 mmol/L (temsilî)' : 'Eşik ≈ 12 mmol/L'; et.setAttribute('x', xs(th) + 4); et.setAttribute('text-anchor', xs(th) > 250 ? 'end' : 'start'); if (xs(th) > 250) et.setAttribute('x', xs(th) - 4);
      el.querySelector('[data-g="n"]').style.opacity = preg ? 0.3 : 1;
      el.querySelector('[data-g="p"]').style.display = preg ? '' : 'none';
      q('vF').textContent = fm(f) + ' mg/dk'; q('vR').textContent = fm(r) + ' mg/dk'; q('vE').textContent = fm(e) + ' mg/dk';
      q('gli').textContent = e > 0 ? 'var' : 'yok';
      const n = e > 0 ? Math.min(30, Math.max(3, Math.round(e / 12))) : 0;
      q('tupd').innerHTML = pts.slice(0, n).map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="2.6" class="f68-ne"/>`).join('');
      q('tup').setAttribute('class', e > 0 ? 'f68-tupk on' : 'f68-tupk');
      q('G').textContent = fm(G, 1) + ' mmol/L';
      if (capUpd) {
        let s;
        if (preg) s = `<b>Gebelik.</b> GFR artar, tübüle daha çok glukoz süzülür; Tmax daha düşük plazma glukozunda aşılır. Hormonal değişikliklerle birlikte bu, gebelikte glikozürinin sık görülmesini açıklar (Bölüm 82). [[K1 s. 314]]${e > 0 ? ` Şu an idrarda ${fm(e)} mg/dk glukoz var.` : ''}`;
        else if (Math.abs(G - th) <= 0.5) s = '<b>Eşik: ≈ 12 mmol/L.</b> Süzülen glukoz SGLT2\'nin en yüksek kapasitesine (Tmax ≈ 300 mg/dk) ulaştı; taşıyıcılar doydu. [[K1 s. 314]]';
        else if (G > th) s = `<b>Plazma glukozu ${fm(G, 1)} mmol/L.</b> Süzülen yük Tmax'ı aşıyor: geri emilim 300 mg/dk'da sabit kalır, fazlası (${fm(e)} mg/dk) idrara çıkar. Diabetes mellitusta glikozüri böyle oluşur. [[K1 s. 314]]`;
        else s = `<b>Plazma glukozu ${fm(G, 1)} mmol/L.</b> Süzülen glukozun tamamı geri emilir; idrarda glukoz yoktur. [[K1 s. 314]]`;
        cap(el, s);
      }
    }
    q('G').closest('label').querySelector('input').value = G;
    el.addEventListener('input', (e) => { if (e.target.dataset.r === 'G') { G = +e.target.value; play = false; el.querySelector('[data-a="oyna"]').textContent = 'Oynat'; draw(true); } });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-p]');
      if (b) { preg = b.dataset.p === '1'; basSec(el, 'p', b.dataset.p); draw(true); return; }
      if (e.target.closest('[data-a="oyna"]')) {
        if (RM) { G = 30; el.querySelector('[data-r="G"]').value = 30; draw(true); return; }
        play = !play; if (play && G >= 30) G = 0; e.target.closest('button').textContent = play ? 'Duraklat' : 'Oynat';
      }
    });
    draw(false);
    return ticker(el, (dt) => {
      if (!play) return;
      G = Math.min(30, G + dt * 5); el.querySelector('[data-r="G"]').value = G;
      if (G >= 30) { play = false; el.querySelector('[data-a="oyna"]').textContent = 'Oynat'; }
      draw(true);
    });
  };

  /* ============ 4 · Tübüler salgı ============ */
  VIZ.f68_salgi = (el) => {
    const P = 'f68sg';
    let mode = 'pen', t = 0;
    const CAPS = {
      pen: '<b>Yalnız penisilin.</b> Organik anyon taşıyıcısı penisilini kandan tübül sıvısına salgılar; klirensi yüksektir. "Probenesit ekle"ye basın. [[K1 s. 314]]',
      pro: '<b>Probenesit ekle.</b> Ürik asit, penisilin, probenesit ve aspirin aynı, kapasitesi sınırlı taşıyıcıyı paylaşır; taşıyıcı probenesiti yeğler. Penisilin klirensi azalır, plazma düzeyi yükselir; penisilinin kıt olduğu II. Dünya Savaşı\'nda bundan yararlanıldı. [[K1 s. 314]]',
      kat: '<b>Organik katyon taşıyıcısı.</b> Kreatinin, katekolaminler ve morfin gibi katyonlar ayrı bir taşıyıcıyla salgılanır. Salgılama aktiftir, enerji harcar ve atıkları yalnız filtrasyondan daha etkili temizler. [[K1 s. 314]]',
    };
    const OY = [66, 94, 122, 150], KY = [208, 232];
    el.innerHTML = `<svg class="f68-svg" viewBox="0 0 360 284" role="img" aria-label="Aktif salgılama: peritübüler kapillerden PKT hücresi aracılığıyla tübül lümenine; organik anyon ve katyon taşıyıcıları">
        ${defs(P)}
        <rect x="0" y="40" width="80" height="214" rx="8" class="f68-kan"/><rect x="85" y="40" width="180" height="214" rx="12" class="f68-hucre"/><rect x="270" y="40" width="90" height="214" rx="8" class="f68-tub"/>
        <text x="40" y="14" text-anchor="middle" class="f68-t f68-b">Peritübüler</text><text x="40" y="28" text-anchor="middle" class="f68-t f68-b">kapiller</text>
        <text x="175" y="20" text-anchor="middle" class="f68-t f68-b">PKT hücresi</text>
        <text x="315" y="14" text-anchor="middle" class="f68-t f68-b">Tübül</text><text x="315" y="28" text-anchor="middle" class="f68-t f68-b">lümeni</text>
        <g data-o="anyon">${OY.map((y) => `<rect x="79" y="${y - 10}" width="12" height="20" rx="3" class="f68-tas"/>`).join('')}<text x="98" y="52" class="f68-t">Organik anyon taşıyıcısı</text></g>
        <g data-o="katyon">${KY.map((y) => `<rect x="79" y="${y - 10}" width="12" height="20" rx="3" class="f68-tas f68-kat"/>`).join('')}<text x="98" y="190" class="f68-t">Organik katyon taşıyıcısı</text></g>
        <g class="f68-tr on"><circle cx="190" cy="104" r="16" class="f68-tasf"/><text x="190" y="108" text-anchor="middle" class="f68-t f68-b">ATP</text></g>
        <text x="40" y="272" text-anchor="middle" class="f68-t">Kan</text><text x="315" y="272" text-anchor="middle" class="f68-t">İdrara</text>
        <g class="f68-bik"></g><g class="f68-ok"></g><g class="f68-pt"></g>
      </svg>
      <div class="f68-lej" data-o="lej"></div>
      <div class="f68-mt"><div class="f68-mrow"><span>Penisilin klirensi</span><div class="f68-trk"><i data-o="mk" style="width:100%"></i></div><b data-o="mkv"></b></div>
        <div class="f68-mrow"><span>Plazma penisilin düzeyi</span><div class="f68-trk"><i data-o="mp" class="p" style="width:20%"></i></div><b data-o="mpv"></b></div></div>
      <div class="f68-liste"><span><b>Organik anyon:</b> ürik asit, penisilin, probenesit, aspirin</span><span><b>Organik katyon:</b> kreatinin, katekolaminler, morfin</span></div>
      ${segHtml('Durum', 'd', [['pen', 'Yalnız penisilin'], ['pro', 'Probenesit ekle'], ['kat', 'Organik katyonlar']], mode)}`;
    const layer = partLayer(el.querySelector('.f68-pt')), bik = el.querySelector('.f68-bik'), okG = el.querySelector('.f68-ok');
    const q = (n) => el.querySelector(`[data-o="${n}"]`);
    function build() {
      const specs = [], flows = [];
      const lumen = (n, c, pr) => { let h = ''; for (let i = 0; i < n; i++) h += `<circle cx="${288 + (i % 4) * 16}" cy="${70 + Math.floor(i / 4) * 17}" r="5" style="fill:var(${c})" class="f68-bp"/>`; return h; };
      let bk = '';
      if (mode === 'pen') {
        bk += lumen(10, '--accent'); bk += [0, 1, 2].map((i) => `<circle cx="${16 + i * 22}" cy="${190 + (i % 2) * 14}" r="5" style="fill:var(--accent)" class="f68-bp"/>`).join('');
        OY.forEach((y, i) => { const p = [[16, y], [85, y], [180, y], [265, y], [322, y]]; flows.push(p); for (let k = 0; k < 2; k++) specs.push({ p, c: '--accent', r: 5, sp: 0.2, ph: (i * 0.25 + k * 0.5) % 1, still: 0.4 + k * 0.3 }); });
      } else if (mode === 'pro') {
        bk += lumen(3, '--accent'); bk += Array.from({ length: 10 }, (_, i) => `<circle cx="${14 + (i % 4) * 17}" cy="${150 + Math.floor(i / 4) * 17}" r="5" style="fill:var(--accent)" class="f68-bp"/>`).join('');
        bk += Array.from({ length: 4 }, (_, i) => `<rect x="${14 + i * 17}" y="${220}" width="10" height="10" rx="2" style="fill:var(--c-clin)"/>`).join('');
        OY.forEach((y, i) => { const p = [[16, y], [85, y], [180, y], [265, y], [322, y]]; flows.push(p); const pen = i === 3; specs.push({ p, c: pen ? '--accent' : '--c-clin', r: pen ? 5 : 5, sh: pen ? 'c' : 's', sp: pen ? 0.14 : 0.2, ph: i * 0.25, still: 0.5 }); if (!pen) specs.push({ p, c: '--c-clin', r: 5, sh: 's', sp: 0.2, ph: (i * 0.25 + 0.5) % 1, still: 0.75 }); });
        bk += `<g class="f68-rozet"><rect x="2" y="238" width="132" height="1" style="opacity:0"/></g>`;
      } else {
        bk += lumen(0, '--accent');
        KY.forEach((y, i) => { const p = [[16, y], [85, y], [180, y], [265, y], [322, y]]; flows.push(p); [['--c-basic', 'd'], ['--warn', 'c'], ['--crit', 's']].forEach(([c, sh], k) => specs.push({ p, c, sh, r: 5, sp: 0.18, ph: (i * 0.17 + k / 3) % 1, still: 0.3 + k * 0.2 })); });
        bk += [0, 1, 2, 3, 4, 5].map((i) => `<path d="M0 -6 L6 0 L0 6 L-6 0z" transform="translate(${290 + (i % 3) * 20} ${190 + Math.floor(i / 3) * 18})" style="fill:var(${['--c-basic', '--warn', '--crit'][i % 3]})" class="f68-bp"/>`).join('');
      }
      bik.innerHTML = bk;
      okG.innerHTML = flows.map((p, i) => `<polyline points="${p.map((q2) => q2.join(',')).join(' ')}" fill="none" class="f68-yol" style="stroke:var(${mode === 'kat' ? '--muted' : '--c-basic'});opacity:.35" marker-end="url(#${P}-mb)"/>`).join('');
      layer.set(specs);
      q('anyon').style.opacity = mode === 'kat' ? 0.3 : 1; q('katyon').style.opacity = mode === 'kat' ? 1 : 0.55;
      q('lej').innerHTML = mode === 'kat'
        ? '<span><svg width="12" height="12" viewBox="-7 -7 14 14"><path d="M0 -6L6 0L0 6L-6 0z" style="fill:var(--c-basic)"/></svg>Kreatinin</span><span><svg width="12" height="12" viewBox="-7 -7 14 14"><circle r="5" style="fill:var(--warn)"/></svg>Katekolamin</span><span><svg width="12" height="12" viewBox="-7 -7 14 14"><rect x="-5" y="-5" width="10" height="10" style="fill:var(--crit)"/></svg>Morfin</span>'
        : `<span><i style="background:var(--accent)"></i>Penisilin</span>${mode === 'pro' ? '<span><i style="background:var(--c-clin);border-radius:2px"></i>Probenesit</span>' : ''}`;
      q('mk').style.width = mode === 'pro' ? '35%' : '100%'; q('mkv').textContent = mode === 'pro' ? 'azaldı (≈ %35, temsilî)' : 'yüksek';
      q('mp').style.width = mode === 'pro' ? '85%' : '20%'; q('mpv').textContent = mode === 'pro' ? 'yükseldi' : 'düşük';
      el.querySelector('.f68-mt').style.opacity = mode === 'kat' ? 0.35 : 1;
      basSec(el, 'd', mode);
      if (RM) layer.still();
      cap(el, CAPS[mode]);
    }
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-d]'); if (b) { mode = b.dataset.d; build(); } });
    build();
    return RM ? () => {} : ticker(el, (dt) => { t += dt; layer.upd(t); });
  };

  /* ============ 5 · Klirens ============ */
  VIZ.f68_klirens = (el) => {
    const TX = 18, TW = 96, TY = 36, TH = 210, PPM = TH / 600; // px/mL
    let U = 125, V = 1, Pp = 1, anim = 1, t = 0, fromC = 0, toC = 0;
    const rnd = (() => { let s = 5; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();
    const pool = Array.from({ length: 100 }, () => [TX + 5 + rnd() * (TW - 10), TY + 4 + rnd() * (TH - 8)]);
    const pool2 = Array.from({ length: 100 }, () => [rnd(), rnd()]);
    const C = () => (U * V) / Pp;
    el.innerHTML = `<svg class="f68-svg" viewBox="0 0 360 296" role="img" aria-label="Klirens: idrara geçen maddenin kaç mL plazmadan geldiği">
        <rect x="${TX}" y="${TY}" width="${TW}" height="${TH}" rx="6" class="f68-kan"/>
        <rect data-o="temiz" x="${TX}" y="${TY}" width="${TW}" height="0" class="f68-temiz"/>
        <g data-o="tick">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<line x1="${TX + TW}" x2="${TX + TW + 5}" y1="${TY + TH - i * 100 * PPM}" y2="${TY + TH - i * 100 * PPM}" class="f68-ax"/><text x="${TX + TW + 8}" y="${TY + TH - i * 100 * PPM + 4}" class="f68-t">${i * 100}</text>`).join('')}</g>
        <g data-o="dots"></g><g data-o="fly"></g>
        <text x="${TX + TW / 2}" y="20" text-anchor="middle" class="f68-t f68-b">Plazma (600 mL)</text>
        <text data-o="tlbl" x="${TX + TW / 2}" y="${TY + 18}" text-anchor="middle" class="f68-t f68-b"></text>
        <path d="M172 150c-14-12-8-34 8-34 16 0 20 14 12 26-6 9-12 8-14 16-3 12-16 8-6-8z" class="f68-bobrek"/><text x="182" y="178" text-anchor="middle" class="f68-t">Böbrek</text>
        <line x1="${TX + TW + 38}" y1="136" x2="168" y2="136" class="f68-yol" style="stroke:var(--muted)" marker-end="url(#f68kl-mm)"/>
        <line x1="198" y1="136" x2="250" y2="136" class="f68-yol" style="stroke:var(--warn)" marker-end="url(#f68kl-mw)"/>
        <defs><marker id="f68kl-mm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 1L9 5L0 9z" style="fill:var(--muted)"/></marker><marker id="f68kl-mw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 1L9 5L0 9z" style="fill:var(--warn)"/></marker></defs>
        <path data-o="kap" class="f68-kap"/><g data-o="udots"></g>
        <text x="296" y="20" text-anchor="middle" class="f68-t f68-b">İdrar</text>
        <text data-o="ulbl" x="296" y="284" text-anchor="middle" class="f68-t"></text>
      </svg>
      <div class="f68-formul" data-o="form"></div>
      <dl class="f68-kv"><div><dt>Miktar = hacim × derişim</dt><dd data-o="mik"></dd></div></dl>
      ${rng('U', 'İdrar derişimi U', 0, 250, 1, U)}${rng('V', 'İdrar akımı V', 0.5, 5, 0.5, V)}${rng('P', 'Plazma derişimi P', 0.5, 5, 0.5, Pp)}`;
    const q = (n) => el.querySelector(`[data-o="${n}"]`);
    function frame(c) { // c = o anki gösterilen klirens (mL)
      const ct = Math.min(c, 600), hh = ct * PPM, top = TY + hh;
      q('temiz').setAttribute('height', hh.toFixed(1));
      q('tlbl').textContent = '';
      const n = Math.round(20 * Pp);
      q('dots').innerHTML = pool.slice(0, n).filter((d) => d[1] > top + 2).map((d) => `<circle cx="${d[0].toFixed(1)}" cy="${d[1].toFixed(1)}" r="2.3" class="f68-xd"/>`).join('');
      return n;
    }
    function urine(c) {
      const bh = 24 + V * 12, bt = 250 - bh, x0 = 262, w = 68;
      q('kap').setAttribute('d', `M${x0} ${bt} L${x0} 250 Q${x0} 256 ${x0 + 6} 256 L${x0 + w - 6} 256 Q${x0 + w} 256 ${x0 + w} 250 L${x0 + w} ${bt}`);
      q('ulbl').textContent = `1 dakikada idrar: ${fm(V, 1)} mL`;
      const n = Math.min(60, Math.round(U * V / 30));
      q('udots').innerHTML = pool2.slice(0, n).map((d) => `<circle cx="${(x0 + 5 + d[0] * (w - 10)).toFixed(1)}" cy="${(bt + 6 + d[1] * (bh - 10)).toFixed(1)}" r="2.3" class="f68-xd"/>`).join('');
    }
    function labels() {
      const c = C();
      q('form').innerHTML = `Klirens = U × V / P = ${fm(U)} × ${fm(V, 1)} / ${fm(Pp, 1)} = <b>${c > 600 ? '> 600 (kap sınırı)' : fm(c)}</b> mL/dk`;
      q('mik').textContent = `${fm(c)} mL × ${fm(Pp, 1)} = ${fm(V, 1)} mL × ${fm(U)}`;
      q('U').textContent = fm(U) + ' birim/mL'; q('V').textContent = fm(V, 1) + ' mL/dk'; q('P').textContent = fm(Pp, 1) + ' birim/mL';
      q('tlbl').textContent = '';
    }
    let shown = 0;
    function change(first) {
      labels(); urine();
      toC = C(); fromC = first ? toC : shown; t = 0;
      if (RM || first) { shown = toC; frame(shown); flyDots(1); } else { anim = 0; }
      const c = C();
      cap(el, `<b>Bir dakikada idrara geçen X</b>, plazmanın ${c > 600 ? '> 600' : fm(c)} mL'sinde bulunan X kadardır: klirens ${fm(c)} mL/dk. [[K1 s. 315]]`);
    }
    function flyDots(f) {
      const g = q('fly'), n = Math.min(60, Math.round(U * V / 30));
      if (f >= 1 || RM) { g.textContent = ''; return; }
      let h = '';
      for (let i = 0; i < n; i++) { const d = pool2[i], e = ease(clamp(f * 1.4 - d[0] * 0.4, 0, 1)); const sx = TX + 8 + d[0] * (TW - 16), sy = TY + 6 + d[1] * 30; const x = lerp(sx, 262 + 5 + d[1] * 58, e), y = lerp(sy, 214 + d[0] * 30, e) - Math.sin(e * Math.PI) * 40; h += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" class="f68-xd f68-xf"/>`; }
      g.innerHTML = h;
    }
    el.addEventListener('input', (e) => {
      const k = e.target.dataset.r; if (!k) return;
      if (k === 'U') U = +e.target.value; if (k === 'V') V = +e.target.value; if (k === 'P') Pp = +e.target.value;
      change(false);
    });
    change(true);
    return ticker(el, (dt) => {
      if (RM || anim >= 1) return;
      t += dt; anim = Math.min(1, t / 1); const e = ease(anim);
      shown = lerp(fromC, toC, e); frame(shown); flyDots(anim);
    });
  };

  /* ============ 6 · Starling ============ */
  VIZ.f68_starling = (el) => {
    let Pi = 48, Po = 10, Pn = 25, t = 0, pre = 'tip';
    const PRE = { tip: [48, 10, 25], hipo: [38, 10, 25], alb: [48, 10, 15] };
    const CAPS = {
      tip: '<b>Tipik değerler.</b> (48 − 10) − (25 − 0) = 13 mmHg net basınç sıvıyı Bowman boşluğuna iter. Kaydırıcılarla sistemik hipotansiyonu ya da hipoalbüminemiyi deneyin. [[K1 s. 315]]',
      hipo: '<b>Sistemik hipotansiyon.</b> Dekompanse hipotansiyonda glomerül hidrostatik basıncı (Pi) düşer; net basınç ve GFR azalır. [[K1 s. 315]]',
      alb: '<b>Hipoalbüminemi.</b> Plazma onkotik basıncı (πi) düşer; geri çeken kuvvet azaldığı için net basınç artar. [[K1 s. 315]]',
    };
    const P = 'f68st', ZX = 175, SC = 2.3;
    el.innerHTML = `<svg class="f68-svg" viewBox="0 0 360 356" role="img" aria-label="Glomerül kapilleri boyunca filtrasyonu belirleyen hidrostatik ve onkotik basınçlar ve net filtrasyon basıncı">
        ${defs(P)}
        <rect x="0" y="22" width="360" height="62" rx="8" class="f68-kan"/><rect x="0" y="92" width="360" height="62" rx="8" class="f68-suz"/>
        <line x1="0" y1="88" x2="360" y2="88" class="f68-bari"/>
        <text x="8" y="14" class="f68-t f68-b">Glomerül kapilleri</text><text x="8" y="168" class="f68-t f68-b">Bowman boşluğu</text>
        <g data-o="ok"></g><g data-o="dr"></g>
        <text data-o="net" x="350" y="168" text-anchor="end" class="f68-t f68-b f68-neta"></text>
        <g class="f68-wf">
          <text x="8" y="196" class="f68-t f68-b">Kuvvetler (mmHg)</text>
          <line data-o="z" y1="203" y2="344" class="f68-ax"/>
          <g data-o="wf"></g>
        </g>
      </svg>
      <div class="f68-gfr"><div class="f68-mrow"><span>GFR (model)</span><div class="f68-trk"><i data-o="gb" style="width:50%"></i></div></div><div class="f68-gt" data-o="gt"></div></div>
      <div class="f68-formul" data-o="denk"></div>
      ${segHtml('Hazır durum', 'h', [['tip', 'Tipik'], ['hipo', 'Sistemik hipotansiyon'], ['alb', 'Hipoalbüminemi']], pre)}
      ${rng('Pi', 'Pi kapiller hidrostatik', 20, 70, 1, Pi)}${rng('Po', 'Po Bowman hidrostatik', 0, 30, 1, Po)}${rng('Pn', 'πi plazma onkotik', 10, 40, 1, Pn)}
      <p class="f68-note">Kf (glomerüler filtrasyon katsayısı) sabit: gözenek boyutu × kapiller yüzey alanı (mezangial hücrelerle biraz değişir).</p>`;
    const q = (n) => el.querySelector(`[data-o="${n}"]`);
    q('z').setAttribute('x1', ZX); q('z').setAttribute('x2', ZX);
    const L = (v) => Math.max(8, v * 0.9);
    function draw(capHtml) {
      const hid = Pi - Po, net = hid - Pn, gfr = net > 0 ? 125 * net / 13 : 0, col = net > 0 ? '--ok' : '--crit';
      // oklar
      q('ok').innerHTML =
        `<line x1="50" y1="26" x2="50" y2="${26 + L(Pi) * 1.1}" style="stroke:var(--crit);stroke-width:4" marker-end="url(#${P}-mk)"/><text x="58" y="${34}" class="f68-t f68-b">Pi ${Pi}</text>` +
        `<line x1="150" y1="150" x2="150" y2="${150 - L(Po) * 1.1}" style="stroke:var(--warn);stroke-width:4" marker-end="url(#${P}-mw)"/><text x="158" y="146" class="f68-t f68-b">Po ${Po}</text>` +
        `<line x1="250" y1="82" x2="250" y2="${82 - L(Pn) * 1.1}" style="stroke:var(--c-basic);stroke-width:4" marker-end="url(#${P}-mb)"/><text x="258" y="${36}" class="f68-t f68-b">πi ${Pn}</text>` +
        `<text x="310" y="112" text-anchor="middle" class="f68-t">πo 0</text><text x="310" y="126" text-anchor="middle" class="f68-t f68-muted">protein süzülmez</text>`;
      const nt = q('net'); nt.textContent = net > 0 ? `Net ${net} mmHg ↓` : 'Filtrasyon durur'; nt.style.fill = `var(${col})`;
      // şelale
      const rows = [['Pi', 0, Pi, '--crit', '+' + Pi], ['− Po', Pi, Pi - Po, '--warn', '−' + Po], ['− πi', Pi - Po, net, '--c-basic', '−' + Pn], ['− πo', net, net, '--muted', '0']];
      let h = '';
      rows.forEach((r, i) => { const y = 208 + i * 28, a = ZX + r[1] * SC, b = ZX + r[2] * SC, x = Math.min(a, b); h += `<text x="8" y="${y + 14}" class="f68-t">${r[0]}</text><rect x="${x}" y="${y}" width="${Math.max(2, Math.abs(b - a))}" height="20" rx="3" style="fill:var(${r[3]});opacity:.85"/><text x="${Math.max(a, b) + 6}" y="${y + 15}" class="f68-t f68-b">${r[4]}</text>`; });
      const yN = 208 + 4 * 28;
      h += `<text x="8" y="${yN + 14}" class="f68-t f68-b">Net</text><rect x="${Math.min(ZX, ZX + net * SC)}" y="${yN}" width="${Math.max(2, Math.abs(net * SC))}" height="20" rx="3" style="fill:var(${col})"/><text x="${Math.max(ZX, ZX + net * SC) + 6}" y="${yN + 15}" class="f68-t f68-b">${net}</text>`;
      q('wf').innerHTML = h;
      q('gb').style.width = (gfr / 250 * 100).toFixed(1) + '%'; q('gb').style.background = `var(${col})`;
      q('gt').innerHTML = `≈ <b>${fm(gfr)}</b> mL/dk ≈ <b>${fm(gfr * 1.44)}</b> L/gün`;
      q('denk').innerHTML = `Pi − Po = ${hid} mmHg · (${Pi} − ${Po}) − (${Pn} − 0) = <b>${net}</b> mmHg`;
      q('Pi').textContent = Pi + ' mmHg'; q('Po').textContent = Po + ' mmHg'; q('Pn').textContent = Pn + ' mmHg';
      el.dataset.net = net; if (RM) dr(0);
      if (capHtml) cap(el, capHtml);
    }
    function dr(tm) {
      const net = Pi - Po - Pn, g = q('dr');
      if (net <= 0) { g.textContent = ''; return; }
      let h = ''; const sp = 0.25 + net / 40;
      [95, 205, 290].forEach((x, i) => { for (let k = 0; k < 2; k++) { const u = RM ? 0.5 : (tm * sp + i * 0.31 + k * 0.5) % 1; h += `<path d="M${x} ${60 + u * 56 - 5}c3 5 4 7 0 8c-4 -1 -3 -3 0 -8z" transform="translate(0 0)" style="fill:var(--accent);opacity:${Math.min(1, u * 6, (1 - u) * 6).toFixed(2)}"/>`; } });
      g.innerHTML = h;
    }
    function synth() { pre = Object.keys(PRE).find((k) => PRE[k][0] === Pi && PRE[k][1] === Po && PRE[k][2] === Pn) || ''; basSec(el, 'h', pre); }
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-h]'); if (!b) return; pre = b.dataset.h; [Pi, Po, Pn] = PRE[pre]; el.querySelector('[data-r="Pi"]').value = Pi; el.querySelector('[data-r="Po"]').value = Po; el.querySelector('[data-r="Pn"]').value = Pn; basSec(el, 'h', pre); draw(CAPS[pre]); });
    el.addEventListener('input', (e) => {
      const k = e.target.dataset.r; if (!k) return; const v = +e.target.value; if (k === 'Pi') Pi = v; if (k === 'Po') Po = v; if (k === 'Pn') Pn = v;
      synth(); const net = Pi - Po - Pn, g = Math.round(125 * Math.max(0, net) / 13);
      draw(pre ? CAPS[pre] : `<b>Net ${net} mmHg.</b> (Pi − Po) − (πi − πo) = (${Pi} − ${Po}) − (${Pn} − 0); GFR modelde ≈ ${g} mL/dk. [[K1 s. 315]]`);
    });
    draw(); dr(0);
    return RM ? () => {} : ticker(el, (dt) => { t += dt; dr(t); });
  };

  /* ============ 7 · Belirteçler ============ */
  VIZ.f68_belirtec = (el) => {
    const P = 'f68bl';
    let b = 'inulin', fail = 0;
    const CAPS = {
      inulin: '<b>İnülin.</b> Serbestçe süzülür, geri emilmez, salgılanmaz: klirensi GFR\'ye eşittir, altın standarttır. Başka bir belirteç seçin. [[K1 s. 316]]<span class="f68-ek"> Eksojen polisakkarit · sürekli infüzyon gerekir · araştırmada.</span>',
      kreat: '<b>Kreatinin.</b> İskelet kasında yapılır, serbestçe süzülür; atılanın %10–20\'si PKT\'de salgılanır, bu yüzden klirensi GFR\'yi biraz yüksek gösterir. Yapımı kas kütlesine (yaş, cinsiyet, ırk) bağlıdır; Cockcroft–Gault yaş, cinsiyet ve ağırlığı düzeltir. Böbrek yetersizliğini artırın. [[K1 s. 316]]',
      kreat2: '<b>İleri böbrek yetersizliği.</b> Süzme azalır, salgılama korunur: salgılanan payın oranı büyür ve GFR oranca çok daha yüksek tahmin edilir. [[K1 s. 316]]',
      ure: '<b>Üre.</b> Süzülür ama PKT\'de ve toplayıcı kanallarda büyük ölçüde geri emilir; yapımı diyet proteini, katabolizma ve hormonal duruma göre değişir. GFR\'nin çok yanıltıcı bir ölçüsüdür. [[K1 s. 316]]',
      cys: '<b>Sistatin C.</b> Küçük, endojen; serbestçe süzülür, sonra tübül hücrelerinde geri emilip neredeyse tamamen yıkılır (idrara neredeyse geçmez). Gelecekte kreatininle birlikte en iyi GFR tahmini olabilir. [[K1 s. 316]]',
    };
    el.innerHTML = `<svg class="f68-svg" viewBox="0 0 360 250" role="img" aria-label="Şematik nefron: glomerülde süzülme, proksimal tübülde salgılanma ve geri emilim, idrara atılım">
        ${defs(P)}
        <rect x="92" y="96" width="150" height="14" rx="7" class="f68-kan"/>
        <polyline points="76,48 104,48 118,34 134,62 150,34 166,62 182,34 196,62 208,48 262,48 262,196" class="f68-tubul"/>
        <circle cx="44" cy="48" r="26" class="f68-bow"/><circle cx="42" cy="48" r="13" class="f68-glom"/>
        <text x="44" y="94" text-anchor="middle" class="f68-t">Glomerül</text>
        <text x="167" y="22" text-anchor="middle" class="f68-t f68-b">PKT</text>
        <text x="167" y="127" text-anchor="middle" class="f68-t">Peritübüler kapiller</text>
        <text x="270" y="120" class="f68-t">Tübül</text>
        <g data-o="ar"></g>
        <text x="262" y="236" text-anchor="middle" class="f68-t f68-b">İdrar</text>
      </svg>
      <div class="f68-lej"><span><i style="background:var(--accent)"></i>Süzülme</span><span><i style="background:var(--c-clin)"></i>Salgılanma</span><span><i style="background:var(--warn)"></i>Geri emilim</span><span class="f68-yk">× yıkım</span></div>
      <div class="f68-cmp" data-o="cmp"></div>
      <div class="f68-ozel" data-o="sl" hidden>${rng('F', 'Böbrek yetersizliği: yok → ileri', 0, 100, 1, 0)}<p class="f68-uy" data-o="hata"></p>
        <p class="f68-kutu" data-o="kutu">Yalnız plazma kreatinini: GFR 180 → 90 L/gün düşse de fark edilmeyebilir.</p></div>
      ${segHtml('Belirteç', 'b', [['inulin', 'İnülin'], ['kreat', 'Kreatinin'], ['ure', 'Üre'], ['cys', 'Sistatin C']], b)}`;
    const q = (n) => el.querySelector(`[data-o="${n}"]`);
    const gfrOf = () => 125 - 110 * fail / 100;
    function state() {
      const g = gfrOf(), W = 6;
      let f = b === 'kreat' ? W * g / 125 : W, s = 0, r = 0, d = 0, cl = g, yorum = '= GFR';
      if (b === 'kreat') { s = 1.1; cl = g + 22; yorum = "GFR'den biraz yüksek"; if (fail > 0) yorum = "GFR'den belirgin yüksek"; }
      if (b === 'ure') { r = 3.6; cl = 0.55 * g; yorum = "GFR'den düşük"; }
      if (b === 'cys') { r = W; d = 1; cl = null; yorum = 'idrarla ölçülmez'; }
      return { g, f, s, r, d, cl, yorum };
    }
    function draw(capHtml) {
      const S = state(); let h = '';
      const A = (x1, y1, x2, y2, col, m, w) => (w > 0.25 ? arrow(P, x1, y1, x2, y2, col, m, Math.max(1.4, w), 'class="f68-akis"') : '');
      h += A(70, 48, 100, 48, '--accent', 'a', S.f);
      h += A(150, 96, 150, 66, '--c-clin', 'c', S.s * 3);
      h += A(190, 66, 190, 96, '--warn', 'w', S.r);
      if (S.d) h += '<text x="167" y="52" text-anchor="middle" class="f68-t f68-b" style="fill:var(--crit)">×</text>';
      const u = Math.max(0, S.f + S.s - S.r);
      if (u > 0.25) h += arrow(P, 262, 176, 262, 222, '--warn', 'w', Math.max(1.4, u), 'class="f68-akis"'); else h += '<text x="262" y="214" text-anchor="middle" class="f68-t f68-muted">idrarda yok</text>';
      q('ar').innerHTML = h;
      const bar = (lbl, v, col) => `<div class="f68-mrow"><span>${lbl}</span><div class="f68-trk"><i style="width:${clamp(v / 200 * 100, 0, 100).toFixed(1)}%;background:var(${col})"></i></div><b>${fm(v)} mL/dk</b></div>`;
      q('cmp').innerHTML = bar('Gerçek GFR', S.g, '--ok') + (S.cl == null ? '<div class="f68-mrow"><span>Belirtecin klirensi</span><b class="f68-w">idrarla ölçülmez: plazma düzeyinden tahmin</b></div>' : bar('Belirtecin klirensi', S.cl, b === 'kreat' ? '--c-clin' : '--accent')) + `<p class="f68-uy">${S.yorum}</p>`;
      q('sl').hidden = b !== 'kreat';
      if (b === 'kreat') { q('F').textContent = fail === 0 ? 'yok' : fail + '%'; q('hata').innerHTML = `Fazla tahmin: <b>%${fm((S.cl - S.g) / S.g * 100)}</b> (temsilî)`; q('kutu').classList.toggle('on', fail >= 50); }
      basSec(el, 'b', b);
      cap(el, capHtml);
    }
    const cp = () => (b === 'kreat' ? (fail > 0 ? CAPS.kreat2 : CAPS.kreat) : CAPS[b]);
    el.addEventListener('click', (e) => { const x = e.target.closest('[data-b]'); if (x) { b = x.dataset.b; draw(cp()); } });
    el.addEventListener('input', (e) => { if (e.target.dataset.r === 'F') { fail = +e.target.value; draw(cp()); } });
    draw(CAPS.inulin);
    return () => {};
  };

  /* ============ 8 · RRT ============ */
  VIZ.f68_rrt = (el) => {
    const P = 'f68rr';
    let mode = 'yok', dm = 'dif', t = 0;
    const CAPS = {
      yok: '<b>Böbrek yetersizliği.</b> Toksik madde klirensi (üremi), elektrolit dengesi (yaşamı tehdit eden hiperkalemi), su atılımı (sıvı yüklenmesi) ve asit atılımı (asidemi) kaybolur. Bir RRT yöntemi seçin. [[K1 s. 316]]',
      per: '<b>Periton diyalizi.</b> Periton boşluğuna hiperozmolar diyalizat verilir; periton yarı geçirgen zar olarak "süzme" yapar. Su ozmolar gradiyentle çekilir; difüzyon toksik maddeleri temizler, elektrolitleri düzeltir. [[K1 s. 316]]',
      hemo: '<b>Aralıklı hemodiyaliz ve sürekli hemofiltrasyon.</b> Vücut dışı devredeki yapay zar kanı eler: küçük moleküller geçer, hücreler ve büyük proteinler kalır. Yönteme göre difüzyon, konveksiyon ya da ikisi; "geri emilim" kana elektrolitten zengin, pH\'ı dengelenmiş sıvı verilerek sağlanır. [[K1 s. 316]]',
      nak: '<b>Böbrek nakli.</b> Yetersiz böbreğin işlevini yerine koymanın en iyi yoludur. [[K1 s. 317]]',
    };
    const KART = [['Toksik madde klirensi', 'üremi'], ['Elektrolit dengesi', 'yaşamı tehdit eden hiperkalemi'], ['Su atılımı', 'sıvı yüklenmesi'], ['Asit atılımı', 'asidemi']];
    el.innerHTML = `<div class="f68-kart" data-o="kart">${KART.map((k, i) => `<div class="f68-k" data-i="${i}"><b>${k[0]}</b><span>→ ${k[1]}</span></div>`).join('')}</div>
      <svg class="f68-svg" viewBox="0 0 360 214" role="img" aria-label="Seçilen böbrek replasman yönteminin şeması"><g data-o="sah"></g><g class="f68-pt"></g></svg>
      <div class="f68-lej" data-o="lej"></div>
      <div data-o="dm" hidden>${segHtml('Taşıma biçimi', 'd', [['dif', 'Difüzyon'], ['kon', 'Konveksiyon']], dm)}</div>
      ${segHtml('Yöntem', 'm', [['yok', 'Yetersizlik'], ['per', 'Periton diyalizi'], ['hemo', 'Hemodiyaliz / hemofiltrasyon'], ['nak', 'Nakil']], mode)}`;
    const q = (n) => el.querySelector(`[data-o="${n}"]`);
    const layer = partLayer(el.querySelector('.f68-pt'));
    const WAS = '--warn', ELE = '--c-clin', H2O = '--c-basic';
    function scene() {
      const specs = []; let h = '', lej = '';
      const sp = (p, c, r, ph, spd, still, sh) => specs.push({ p, c, r, ph, sp: spd, still, sh });
      if (mode === 'yok') {
        h = `<path d="M150 96c-22-14-14-50 14-50 26 0 32 22 22 44-6 14-14 14-16 28-4 22-32 18-20-22z" class="f68-bobrek f68-bad"/><text x="168" y="86" text-anchor="middle" class="f68-t f68-b" style="fill:var(--crit)">işlev kaybı</text><text x="180" y="190" text-anchor="middle" class="f68-t">Süzme ve geri emilim yok: atıklar, K⁺, su ve asit birikir</text>`;
        h += [[48, 52, WAS], [88, 40, ELE], [30, 84, H2O], [70, 100, WAS], [100, 122, '--crit'], [44, 134, ELE], [86, 156, H2O], [26, 168, WAS], [62, 70, '--crit']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="5" style="fill:var(${c})" class="f68-bp"/>`).join('') + '<text x="14" y="26" class="f68-t f68-b">Kanda birikenler</text><text x="48" y="188" class="f68-t">üre, K⁺, su, H⁺</text>';
      } else if (mode === 'per') {
        h = `<ellipse cx="205" cy="104" rx="140" ry="82" class="f68-suz"/><ellipse cx="205" cy="104" rx="140" ry="82" class="f68-per"/>
          <rect x="28" y="40" width="54" height="128" rx="14" class="f68-kan"/><text x="55" y="32" text-anchor="middle" class="f68-t f68-b">Kan</text><text x="55" y="186" text-anchor="middle" class="f68-t">kapiller</text>
          <line x1="100" y1="28" x2="100" y2="182" class="f68-mem"/><text x="108" y="20" class="f68-t f68-b">Periton = yarı geçirgen zar</text>
          <text x="210" y="196" text-anchor="middle" class="f68-t f68-b">Hiperozmolar diyalizat (karın boşluğu)</text>`;
        for (let i = 0; i < 5; i++) sp([[60, 52 + i * 26], [100, 52 + i * 26], [160 + (i % 3) * 30, 62 + i * 22]], WAS, 4, i / 5, 0.16, 0.7);
        for (let i = 0; i < 4; i++) sp([[60, 66 + i * 28], [100, 66 + i * 28], [150 + (i % 2) * 40, 80 + i * 22]], ELE, 4, (i + 0.5) / 5, 0.16, 0.75);
        for (let i = 0; i < 4; i++) sp([[62, 60 + i * 26], [100, 60 + i * 26], [175 + i * 12, 100 + i * 12]], H2O, 3.2, (i + 0.3) / 4, 0.2, 0.7);
        lej = `<span><i style="background:var(--warn)"></i>Üre, atıklar</span><span><i style="background:var(--c-clin)"></i>K⁺ / elektrolit</span><span><i style="background:var(--c-basic)"></i>Su (ozmolar gradiyent)</span>`;
      } else if (mode === 'hemo') {
        h = `<rect x="62" y="64" width="236" height="40" rx="6" class="f68-kan"/><rect x="62" y="110" width="236" height="40" rx="6" class="f68-suz"/>
          <line x1="62" y1="107" x2="298" y2="107" class="f68-mem"/>
          <text x="180" y="58" text-anchor="middle" class="f68-t f68-b">Filtre (yarı geçirgen zar)</text>
          <text x="68" y="90" class="f68-t">kan</text><text x="68" y="136" class="f68-t">${dm === 'dif' ? 'diyalizat' : 'süzüntü'}</text>
          <path d="M62 80 H30 V30 H330 V80 H298" fill="none" class="f68-hat"/>          <path d="M298 94 H330 V190 H30 V94 H62" fill="none" class="f68-hat"/>
          <text x="180" y="24" text-anchor="middle" class="f68-t">Hastadan ↦ filtreye</text><text x="180" y="206" text-anchor="middle" class="f68-t">${dm === 'kon' ? 'Dönüş hattı + yerine koyma sıvısı (elektrolitten zengin, pH dengeli)' : 'Hastaya dönüş'}</text>`;
        if (dm === 'dif') {
          h += arrow(P, 290, 144, 70, 144, '--accent', 'a', 2.4);
          for (let i = 0; i < 4; i++) sp([[70, 86], [290, 86]], '--crit', 4.5, i / 4, 0.08, 0.5, 'c');
          for (let i = 0; i < 6; i++) sp([[90 + i * 30, 90], [90 + i * 30, 130]], WAS, 3.6, i / 6, 0.2, 0.5);
          for (let i = 0; i < 4; i++) sp([[290, 138], [70, 138]], H2O, 3.2, i / 4, 0.14, 0.5);
          lej = '<span><i style="background:var(--crit)"></i>Alyuvar (kalır)</span><span><i style="background:var(--warn)"></i>Atıklar (gradiyentle geçer)</span><span><i style="background:var(--c-basic)"></i>Diyalizat (karşı yönde)</span>';
        } else {
          h += `<text x="180" y="130" text-anchor="middle" class="f68-t f68-b" style="fill:var(--accent-ink)">basınç ↓ su + çözünenler sürüklenir</text><path d="M180 154 V176" class="f68-hat" style="display:none"/>
            <line x1="318" y1="196" x2="318" y2="170" class="f68-yol" style="stroke:var(--ok)" marker-end="url(#${P}-mo)"/><text x="348" y="150" text-anchor="end" class="f68-t" style="fill:var(--ok)">yerine koyma</text>`;
          for (let i = 0; i < 4; i++) sp([[70, 86], [290, 86]], '--crit', 4.5, i / 4, 0.08, 0.5, 'c');
          for (let i = 0; i < 6; i++) { sp([[90 + i * 30, 90], [96 + i * 30, 138]], WAS, 3.6, i / 6, 0.2, 0.5); sp([[96 + i * 30 - 10, 86], [100 + i * 30 - 10, 142]], H2O, 3, (i + 0.5) / 6, 0.2, 0.5); }
          lej = '<span><i style="background:var(--crit)"></i>Alyuvar (kalır)</span><span><i style="background:var(--warn)"></i>Atıklar</span><span><i style="background:var(--c-basic)"></i>Su (konveksiyon)</span>';
        }
      } else {
        h = `<path d="M150 104c-26-16-16-60 14-60 30 0 36 24 24 50-8 18-16 18-20 34-4 24-36 18-18-24z" class="f68-bobrek f68-good"/><text x="172" y="22" text-anchor="middle" class="f68-t f68-b">Donör böbrek</text><text x="178" y="186" text-anchor="middle" class="f68-t">Süzme, geri emilim ve salgılama bir arada</text>
          ${arrow(P, 112, 100, 70, 100, '--ok', 'o', 2.4)}${arrow(P, 240, 100, 290, 100, '--ok', 'o', 2.4)}<text x="40" y="95" text-anchor="middle" class="f68-t">kan</text><text x="322" y="95" text-anchor="middle" class="f68-t">idrar</text>`;
      }
      q('sah').innerHTML = defs(P) + h.replace(/<defs>[\s\S]*?<\/defs>/, '');
      q('lej').innerHTML = lej;
      layer.set(specs); if (RM) layer.still();
      q('dm').hidden = mode !== 'hemo';
      el.querySelectorAll('.f68-k').forEach((k) => { k.className = 'f68-k ' + (mode === 'yok' ? 'bad' : mode === 'nak' || mode === 'per' || mode === 'hemo' ? 'good' : ''); });
      basSec(el, 'm', mode); basSec(el, 'd', dm);
      cap(el, CAPS[mode]);
    }
    el.addEventListener('click', (e) => {
      const m = e.target.closest('[data-m]'), d = e.target.closest('[data-d]');
      if (m) { mode = m.dataset.m; scene(); } else if (d) { dm = d.dataset.d; scene(); }
    });
    scene();
    return RM ? () => {} : ticker(el, (dt) => { t += dt; layer.upd(t); });
  };

  /* ============ 9 · Filtrasyon fraksiyonu ============ */
  VIZ.f68_ff = (el) => {
    let H = 0.4, GF = 125, cur = { h: 0.4, g: 125 }, tgt = { h: 0.4, g: 125 };
    const S = 0.17, X0 = 14;
    el.innerHTML = `<svg class="f68-svg" viewBox="0 0 360 224" role="img" aria-label="Kan akımından plazmaya ve süzüntüye daralan akım şeridi">
        <g data-o="rb"></g>
        <g data-o="lb" class="f68-ffl"></g>
      </svg>
      <div class="f68-ffs"><div class="f68-formul" data-o="sonuc"></div></div>
      ${rng('H', 'Hematokrit', 0.3, 0.55, 0.01, H)}${rng('G', 'GFR', 60, 180, 5, GF)}
      <p class="f68-note">Böbrek kan akımı 1000 mL/dk olarak sabit alındı.</p>`;
    const q = (n) => el.querySelector(`[data-o="${n}"]`);
    const rib = (xa0, xa1, ya, xb0, xb1, yb, cls) => { const m = (ya + yb) / 2; return `<path d="M${xa0} ${ya} L${xa1} ${ya} C${xa1} ${m} ${xb1} ${m} ${xb1} ${yb} L${xb0} ${yb} C${xb0} ${m} ${xa0} ${m} ${xa0} ${ya}z" class="${cls}"/>`; };
    function draw(v, final) {
      const h = v.h, g = v.g, W = 1000 * S, rbc = W * h, pl = W - rbc, fw = g * S;
      const rpf = 1000 * (1 - h), ef = rpf - g;
      const y1 = 40, y2 = 108, y3 = 118 + 28 + 16, yb = 28;
      const L2 = X0 + rbc + 18; // plazma başlangıcı
      let s = '';
      s += rib(X0, X0 + rbc, y1 + yb, X0, X0 + rbc, 108, 'f68-rb-r');
      s += rib(X0 + rbc, X0 + W, y1 + yb, L2, L2 + pl, 108, 'f68-rb-p');
      s += `<rect x="${X0}" y="${y1}" width="${W}" height="${yb}" rx="3" class="f68-rb-t"/>`;
      s += `<rect x="${X0}" y="108" width="${rbc}" height="${yb}" rx="3" class="f68-rb-r2"/><rect x="${L2}" y="108" width="${pl}" height="${yb}" rx="3" class="f68-rb-p2"/>`;
      const fx = L2, ex = L2 + fw + 14;
      s += rib(L2, L2 + fw, 108 + yb, fx, fx + fw, 180, 'f68-rb-f');
      s += rib(L2 + fw, L2 + pl, 108 + yb, ex, ex + (pl - fw), 180, 'f68-rb-e');
      s += `<rect x="${fx}" y="180" width="${fw}" height="${yb}" rx="3" class="f68-rb-f2"/><rect x="${ex}" y="180" width="${Math.max(0, pl - fw)}" height="${yb}" rx="3" class="f68-rb-e2"/>`;
      q('rb').innerHTML = s;
      const LX = 224, T = (x, y, a, b, c) => `<text x="${x}" y="${y}" class="f68-t ${c || ''}">${a}</text>${b ? `<text x="${x}" y="${y + 13}" class="f68-t f68-muted">${b}</text>` : ''}`;
      q('lb').innerHTML = T(LX, 52, 'Böbrek kan akımı', '1000 mL/dk (sabit)', 'f68-b') + T(LX, 106, 'Alyuvar ' + fm(1000 * h) + ' mL/dk') + T(LX, 128, 'Plazma ' + fm(rpf) + ' mL/dk', 'glomerüler plazma akımı') +
        T(LX, 184, 'Süzüntü: GFR ' + fm(g) + ' mL/dk', 'Bowman boşluğu', 'f68-b') + T(LX, 208, 'Efferent plazma ' + fm(ef) + ' mL/dk');
      const ff = g / rpf * 100;
      const kitap = Math.abs(h - 0.4) < 0.001 && g === 125;
      q('sonuc').innerHTML = `Filtrasyon fraksiyonu = ${fm(g)} / ${fm(rpf)} × 100 ≈ <b>%${fm(ff)}</b>${kitap ? ' <span class="f68-muted">(kitap: ≈ %20)</span>' : ''}`;
      q('H').textContent = fm(h, 2); q('G').textContent = fm(g) + ' mL/dk';
      if (final) cap(el, `<b>Hematokrit ${fm(h, 2)}.</b> 1000 mL/dk böbrek kan akımının ≈ ${fm(rpf)} mL/dk'sı plazmadır; GFR ${fm(g)} mL/dk ise filtrasyon fraksiyonu ${fm(g)}/${fm(rpf)} × 100 ≈ %${fm(ff)}. [[K1 s. 317]]`);
    }
    el.addEventListener('input', (e) => {
      const k = e.target.dataset.r; if (!k) return;
      if (k === 'H') tgt.h = +e.target.value; if (k === 'G') tgt.g = +e.target.value;
      if (RM) { cur = { ...tgt }; draw(cur, false); }
      cap(el, `<b>Hematokrit ${fm(tgt.h, 2)}.</b> 1000 mL/dk böbrek kan akımının ≈ ${fm(1000 * (1 - tgt.h))} mL/dk'sı plazmadır; GFR ${fm(tgt.g)} mL/dk ise filtrasyon fraksiyonu ${fm(tgt.g)}/${fm(1000 * (1 - tgt.h))} × 100 ≈ %${fm(tgt.g / (1000 * (1 - tgt.h)) * 100)}. [[K1 s. 317]]`);
    });
    draw(cur, false);
    return ticker(el, (dt) => {
      if (RM) return;
      const dh = tgt.h - cur.h, dg = tgt.g - cur.g;
      if (Math.abs(dh) < 0.0005 && Math.abs(dg) < 0.05) { if (dh || dg) { cur.h = tgt.h; cur.g = tgt.g; draw(cur, false); } return; }
      const f = 1 - Math.exp(-dt / 0.1); cur.h += dh * f; cur.g += dg * f; draw(cur, false);
    });
  };
})();
