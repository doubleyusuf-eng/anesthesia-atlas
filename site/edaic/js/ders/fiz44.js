/* Bölüm 44 · Nöronun yapısı ve işlevi · bileşenler (tarif: docs/tasarim/fiz44.md; K1 s. 189–191).
   Kitaptan: üç işlev, nöral/endokrin yol, 120 m/s, nöron parçaları, altı nöron sınıfı, CNS/PNS hücre tipleri,
   sinir katmanları. Temsilî: bütün süreler, boyutlar ve kalınlıklar (viz-foot'larda belirtildi). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (t) => { t = clamp(t, 0, 1); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  const capYaz = (el, h) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(h); };
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const darIzle = (el, cb) => {
    let d = null;
    const f = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < 560; if (n !== d) { d = n; cb(n); } };
    f();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const tx = (x, y, s, cls, anc, extra) => `<text class="${cls}" x="${x}" y="${y}"${anc ? ` text-anchor="${anc}"` : ''}${extra || ''}>${s}</text>`;
  const P = (pts) => pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  /* kırık çizgi boyunca konum */
  const yolOlc = (pts) => { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return { pts, L, T: L[L.length - 1] || 1 }; };
  const yolNokta = (y, f) => {
    const d = clamp(f, 0, 1) * y.T; let i = 1;
    while (i < y.L.length - 1 && y.L[i] < d) i++;
    const a = y.pts[i - 1], b = y.pts[i], s = (y.L[i] - y.L[i - 1]) || 1, k = clamp((d - y.L[i - 1]) / s, 0, 1);
    return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
  };
  const yerle = (c, p) => { c.setAttribute('cx', p[0].toFixed(1)); c.setAttribute('cy', p[1].toFixed(1)); };
  const tusla = (root, cb) => root.addEventListener('keydown', (e) => { if (e.key !== 'Enter' && e.key !== ' ') return; const t = e.target.closest('[data-p]'); if (!t || t.tagName === 'BUTTON') return; e.preventDefault(); cb(t.dataset.p); });

  /* =====================================================================
     1 · f44_sinyal — üç işlev (adımlı) ve nöral/endokrin yarışı (K1 s. 189)
     ===================================================================== */
  VIZ.f44_sinyal = (el) => {
    const CA = [
      '<b>Duyusal girdi.</b> Reseptör iç ya da dış ortamdaki bir değişikliği algılar ve aksiyon potansiyeli üretir; sinyal beyin ve omuriliğe, yani merkezî sinir sistemine (CNS) gider. Adım adım ilerleyin ya da nöral ve endokrin yolu yarıştırın. [[K1 s. 189]]',
      '<b>Bütünleştirme.</b> CNS duyusal girdiyi alır ve işler; karar bu bütünleştirmeye göre verilir. [[K1 s. 189]]',
      '<b>Motor çıktı.</b> Nöronlar aksiyon potansiyelini CNS\'den kaslara ve bezlere taşır. Dış ortamla etkileşmenin tek yolu budur: tükürük salgısı bile düz kas kasılması ister; sinir sisteminin büyük kısmı hareket üretmeye ayrılmıştır. [[K1 s. 189]]',
    ];
    const CB = {
      bas: '<b>İki sinyal yolu.</b> Nöronlar birbirleriyle ve öteki organlarla nöral ve endokrin sinyalle iletişir. Başlatın. [[K1 s. 189]]',
      noral: '<b>Nöral.</b> Aksiyon potansiyeli presinaptik nöronun gövdesinden ucuna iletilir, sonra elektriksel ya da kimyasal sinapsla postsinaptik hücreye (başka bir nöron, kas ya da bez hücresi) geçer; kimyasal sinaps akson iletiminden yavaştır. [[K1 s. 189]]',
      son: '<b>Endokrin.</b> Beyin hormonu sentezleyip dolaşıma salar, dolaşım onu hedef organa taşır; bu yüzden endokrin sinyal nöral sinyalden çok daha yavaştır. [[K1 s. 189]]',
    };
    const BASLIK = ['1 · Duyusal girdi', '2 · Bütünleştirme', '3 · Motor çıktı'];
    const T_AKS = 0.6, T_SIN = 1.1, T_NV = 1.3, T_END = 6.0, T_HOR = 5.0, N_HOR = 4, T_SON = T_END + 0.05;
    let kip = 'a', adim = 1, oyn = false, oynT = 0, faz = 0, dar = false, bT = 0, bCal = false, capK = '';
    el.innerHTML = `<div class="f44-kont">${segHtml('Görünüm', 'kip', [['a', 'Üç işlev'], ['b', 'Nöral ve endokrin']], 'a')}
        <div class="btn-row f44-ctl" data-k="a"><button type="button" class="btn ghost" data-a="geri" aria-label="Önceki adım">‹ Geri</button><span class="f44-sayac">Adım 1/3</span><button type="button" class="btn ghost" data-a="ileri" aria-label="Sonraki adım">İleri ›</button><button type="button" class="btn ghost" data-a="oynat" aria-pressed="false">Oynat</button></div>
        <div class="btn-row f44-ctl" data-k="b" hidden><button type="button" class="btn" data-a="basla">Başlat</button><button type="button" class="btn ghost" data-a="sifir">Sıfırla</button></div></div>
      <div class="f44-sahne"></div>`;
    const sahne = el.querySelector('.f44-sahne');
    const cap = (k, h) => { if (capK !== k) { capK = k; capYaz(el, h); } };
    const defs = `<defs><marker id="f44-uc-aff" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="f44-uc-aff"/></marker><marker id="f44-uc-eff" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="f44-uc-eff"/></marker><marker id="f44-uc-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="f44-uc-acc"/></marker></defs>`;

    /* ---- Kip A yerleşimi ---- */
    const LA = (d) => (d ? {
      W: 340, H: 432, tx: 170, ty: 22,
      box: [[20, 36, 300, 112], [20, 172, 300, 110], [20, 306, 300, 120]],
      rec: [110, 74], br: [110, 204, 40, 20], kord: [110, 226, 272], kas: [110, 340, 34], bez: [110, 396],
      lb: [[178, 92, 'Duyu reseptörü', 't'], [178, 110, 'iç ve dış ortam', 'ts'], [178, 222, 'CNS', 't'], [178, 240, '(beyin + omurilik)', 'ts'],
        [178, 338, 'Kas', 't'], [178, 354, '(iskelet kası)', 'ts'], [178, 390, 'Bez', 't'], [178, 405, 'ör. tükürük bezi', 'ts']],
      duz: [178, 421],
      ok1: [[110, 148], [110, 170]], ok2: [[110, 282], [110, 304]],
      sinir: [[[110, 85], [110, 148]], [[110, 306], [110, 318], [60, 318], [60, 340], [76, 340]], [[60, 340], [60, 396], [96, 396]]],
      y1: [[110, 85], [110, 148], [110, 172], [110, 196]],
      y2: null,
      y3: [[[110, 226], [110, 282], [110, 306], [110, 318], [60, 318], [60, 340], [76, 340]], [[110, 226], [110, 282], [110, 306], [110, 318], [60, 318], [60, 396], [96, 396]]],
    } : {
      W: 640, H: 252, tx: 320, ty: 30,
      box: [[10, 52, 160, 186], [225, 52, 160, 186], [440, 52, 190, 186]],
      rec: [90, 104], br: [305, 96, 46, 28], kord: [305, 120, 176], kas: [490, 100, 26], bez: [490, 168],
      lb: [[90, 204, 'Duyu reseptörü', 't', 'middle'], [90, 222, 'iç ve dış ortam', 'ts', 'middle'], [305, 204, 'CNS', 't', 'middle'], [305, 222, '(beyin + omurilik)', 'ts', 'middle'],
        [526, 97, 'Kas', 't'], [526, 113, '(iskelet kası)', 'ts'], [526, 164, 'Bez', 't'], [526, 180, 'ör. tükürük bezi', 'ts']],
      duz: [526, 210],
      ok1: [[170, 140], [223, 140]], ok2: [[385, 160], [438, 160]],
      sinir: [[[90, 115], [90, 140], [170, 140]], [[440, 160], [456, 160], [456, 100], [464, 100]], [[456, 160], [456, 168], [476, 168]]],
      y1: [[90, 115], [90, 140], [170, 140], [225, 140], [299, 140]],
      y2: null,
      y3: [[[305, 112], [305, 160], [385, 160], [440, 160], [456, 160], [456, 100], [464, 100]], [[305, 112], [305, 160], [385, 160], [440, 160], [456, 160], [456, 168], [476, 168]]],
    });
    const beyinIkon = (cx, cy, rx, ry) => `<ellipse class="f44-beyin" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>
      <path class="f44-giri" d="M${cx - rx * 0.6} ${cy - ry * 0.2} q${rx * 0.2} ${-ry * 0.5} ${rx * 0.4} 0 t${rx * 0.4} 0 M${cx - rx * 0.5} ${cy + ry * 0.35} q${rx * 0.25} ${-ry * 0.45} ${rx * 0.5} 0 t${rx * 0.5} 0 M${cx} ${cy - ry} L${cx} ${cy + ry * 0.1}"/>`;
    const cizA = () => {
      const L = LA(dar);
      const kutu = L.box.map((b, i) => `<rect class="f44-ist" data-i="${i + 1}" x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" rx="14"/>`).join('');
      const [rx, ry] = L.rec;
      const rec = `<g class="f44-rec">${[-26, 0, 26].map((o) => `<line class="f44-uyaran" x1="${rx + o - 8}" y1="${ry - 26}" x2="${rx + o}" y2="${ry - 9}" marker-end="url(#f44-uc-acc)"/>`).join('')}
        <rect class="f44-deri" x="${rx - 52}" y="${ry - 5}" width="104" height="16" rx="5"/><circle class="f44-res" cx="${rx}" cy="${ry + 4}" r="6"/></g>`;
      const [bx, by, brx, bry] = L.br;
      const cns = `<g class="f44-cns">${beyinIkon(bx, by, brx, bry)}<rect class="f44-kord" x="${bx - 6}" y="${L.kord[1] - 6}" width="12" height="${L.kord[2] - L.kord[1] + 6}" rx="6"/></g>`;
      const [kx, ky, krx] = L.kas;
      const kas = `<g class="f44-kasg"><ellipse class="f44-kas" cx="${kx}" cy="${ky}" rx="${krx}" ry="11"/>${[-0.6, -0.3, 0, 0.3, 0.6].map((f) => `<line class="f44-cizgi" x1="${kx + f * krx}" y1="${ky - 8}" x2="${kx + f * krx}" y2="${ky + 8}"/>`).join('')}</g>`;
      const [gx, gy] = L.bez;
      const bez = `<g class="f44-bezg">${[[-6, -6], [6, -6], [-6, 6], [6, 6]].map(([a, b]) => `<circle class="f44-bez" cx="${gx + a}" cy="${gy + b}" r="7"/>`).join('')}${[0, 1, 2].map((i) => `<circle class="f44-damla" cx="${gx + 18 + i * 7}" cy="${gy - 12 + i * 5}" r="2.6"/>`).join('')}</g>`;
      sahne.innerHTML = `<svg class="f44-svg" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Duyu reseptöründen CNS'ye, CNS'den kas ve beze giden sinyal; üç adım">${defs}
        ${tx(L.tx, L.ty, '', 'f44-baslik', 'middle')}${kutu}
        ${L.sinir.map((s, i) => `<polyline class="f44-sinir ${i ? 'f44-eff' : 'f44-aff'}" points="${P(s)}"/>`).join('')}
        <line class="f44-ok f44-aff" data-o="1" x1="${L.ok1[0][0]}" y1="${L.ok1[0][1]}" x2="${L.ok1[1][0]}" y2="${L.ok1[1][1]}" marker-end="url(#f44-uc-aff)"/>
        <line class="f44-ok f44-eff" data-o="3" x1="${L.ok2[0][0]}" y1="${L.ok2[0][1]}" x2="${L.ok2[1][0]}" y2="${L.ok2[1][1]}" marker-end="url(#f44-uc-eff)"/>
        ${rec}${cns}${kas}${bez}
        ${L.lb.map(([x, y, s, c, a]) => tx(x, y, s, 'f44-' + c, a)).join('')}
        ${tx(L.duz[0], L.duz[1], 'düz kas kasılır', 'f44-duz', dar ? '' : '')}
        <circle class="f44-nokta" r="6" data-d="0"/><circle class="f44-nokta" r="6" data-d="1"/></svg>`;
      A.L = L;
      A.y1 = yolOlc(L.y1);
      A.y2 = yolOlc(Array.from({ length: 25 }, (_, i) => { const a = -Math.PI / 2 + (i / 24) * Math.PI * 2; return [bx + Math.cos(a) * brx * 0.55, by + Math.sin(a) * bry * 0.5]; }));
      A.y3 = L.y3.map(yolOlc);
      A.dots = [...sahne.querySelectorAll('.f44-nokta')];
      guncelA();
    };
    const A = {};
    const guncelA = () => {
      const s = sahne.querySelector('svg'); if (!s) return;
      s.querySelector('.f44-baslik').textContent = BASLIK[adim - 1];
      s.querySelectorAll('.f44-ist').forEach((r) => r.classList.toggle('on', +r.dataset.i === adim));
      s.querySelectorAll('.f44-ok').forEach((o) => o.classList.toggle('f44-kalin', RM && +o.dataset.o === adim));
      s.querySelector('.f44-cns').classList.toggle('on', adim === 2);
      s.classList.toggle('f44-a3', adim === 3);
      el.querySelector('.f44-sayac').textContent = `Adım ${adim}/3`;
      el.querySelector('[data-a="geri"]').disabled = adim === 1;
      el.querySelector('[data-a="ileri"]').disabled = adim === 3;
      cap('a' + adim, CA[adim - 1]);
      faz = 0; kareA();
    };
    const kareA = () => {
      if (!A.dots) return;
      const f = clamp(faz / 0.8, 0, 1), gor = !RM && faz < 0.85;
      A.dots.forEach((c, i) => {
        let p = null;
        if (gor) { if (adim === 1 && i === 0) p = yolNokta(A.y1, ease(f)); else if (adim === 2 && i === 0) p = yolNokta(A.y2, f); else if (adim === 3) p = yolNokta(A.y3[i], ease(f)); }
        c.style.opacity = p ? 1 : 0; if (p) yerle(c, p);
      });
    };

    /* ---- Kip B yerleşimi ---- */
    const LB = (d) => (d ? {
      W: 340, H: 346, beyin: [4, 40, 52, 222], hedef: [284, 40, 52, 222], hedefT: ['Hedef'],
      ny: 104, soma: 70, a1: 230, gap: [236, 284], ey: 212, ex: [56, 284],
      lb: [[62, 54, 'Nöral', 'tb', 'start'], [150, 76, 'akson iletimi:', 'ts', 'middle'], [150, 90, '120 m/s\'ye kadar', 'ts', 'middle'],
        [280, 128, 'kimyasal sinaps:', 'ts', 'end'], [280, 142, 'daha yavaş', 'ts', 'end'], [280, 157, '(elektriksel ya da kimyasal)', 'ts', 'end'],
        [170, 338, 'hedef: nöron, kas ya da bez hücresi', 'ts', 'middle'],
        [62, 182, 'Endokrin', 'tb', 'start'], [170, 252, 'hormon → dolaşım → hedef organ', 'ts', 'middle']],
      bar: [4, 336, 278, 306],
    } : {
      W: 640, H: 300, beyin: [10, 40, 96, 196], hedef: [534, 40, 96, 196], hedefT: ['Hedef', 'hücre'],
      ny: 100, soma: 134, a1: 470, gap: [482, 534], ey: 198, ex: [106, 534],
      lb: [[120, 58, 'Nöral', 'tb', 'start'], [168, 58, '→ hedef: nöron, kas ya da bez hücresi', 'ts', 'start'], [305, 86, 'akson iletimi: 120 m/s\'ye kadar (büyük miyelinli sinir)', 'ts', 'middle'],
        [528, 126, 'kimyasal sinaps: daha yavaş', 'ts', 'end'], [528, 142, 'elektriksel ya da kimyasal sinaps', 'ts', 'end'],
        [120, 166, 'Endokrin', 'tb', 'start'], [196, 166, 'hormon → dolaşım → hedef organ', 'ts', 'start']],
      bar: [10, 630, 252, 282],
    });
    const B = {};
    const cizB = () => {
      const L = LB(dar);
      const [bx, by, bw, bh] = L.beyin, [hx, hy, hw, hh] = L.hedef;
      const dam = []; for (let x = L.ex[0]; x <= L.ex[1] + 0.1; x += 4) dam.push([x, L.ey + 12 * Math.sin((x - L.ex[0]) / (dar ? 20 : 30))]);
      const [b0, b1, by1, by2] = L.bar;
      sahne.innerHTML = `<svg class="f44-svg" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Nöral ve endokrin sinyalin beyinden hedefe ulaşma süresi karşılaştırması">
        <rect class="f44-kutu" x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="12"/>${tx(bx + bw / 2, by + bh / 2 + 5, 'Beyin', 'f44-t', 'middle')}
        <rect class="f44-kutu f44-hedef" x="${hx}" y="${hy}" width="${hw}" height="${hh}" rx="12"/>${L.hedefT.map((s, i) => tx(hx + hw / 2, hy + hh / 2 + 5 + (i - (L.hedefT.length - 1) / 2) * 17, s, 'f44-t', 'middle')).join('')}
        <circle class="f44-soma" cx="${L.soma}" cy="${L.ny}" r="11"/><line class="f44-akson" x1="${L.soma + 11}" y1="${L.ny}" x2="${L.a1}" y2="${L.ny}"/>
        <circle class="f44-dugme" cx="${L.a1 + 5}" cy="${L.ny}" r="6"/>
        <line class="f44-yarik" x1="${L.gap[1] - 2}" y1="${L.ny - 16}" x2="${L.gap[1] - 2}" y2="${L.ny + 16}"/>
        <polyline class="f44-damar" points="${P(dam)}"/><polyline class="f44-damar-i" points="${P(dam)}"/>
        ${L.lb.map(([x, y, s, c, a]) => tx(x, y, s, 'f44-' + c, a)).join('')}
        ${tx(b0, by1 - 6, 'Nöral', 'f44-ts f44-bl', 'start', ' data-b="n"')}<rect class="f44-bar-z" x="${b0}" y="${by1}" width="${b1 - b0}" height="9" rx="4"/><rect class="f44-bar f44-bar-n" x="${b0}" y="${by1}" width="0" height="9" rx="4"/>
        ${tx(b0, by2 - 6, 'Endokrin', 'f44-ts f44-bl', 'start', ' data-b="e"')}<rect class="f44-bar-z" x="${b0}" y="${by2}" width="${b1 - b0}" height="9" rx="4"/><rect class="f44-bar f44-bar-e" x="${b0}" y="${by2}" width="0" height="9" rx="4"/>
        ${[0, 1, 2].map(() => '<circle class="f44-vez" r="3"/>').join('')}
        ${Array.from({ length: N_HOR }, () => '<circle class="f44-hormon" r="5"/>').join('')}
        <circle class="f44-nokta" r="6"/></svg>`;
      B.L = L; B.dam = yolOlc(dam);
      B.nokta = sahne.querySelector('.f44-nokta'); B.vez = [...sahne.querySelectorAll('.f44-vez')]; B.hor = [...sahne.querySelectorAll('.f44-hormon')];
      B.barN = sahne.querySelector('.f44-bar-n'); B.barE = sahne.querySelector('.f44-bar-e'); B.hedef = sahne.querySelector('.f44-hedef');
      kareB();
    };
    const kareB = () => {
      if (!B.L) return;
      const L = B.L, t = bT, bw = L.bar[1] - L.bar[0];
      // nöral nokta
      let p = null;
      if (bCal || t > 0) {
        if (t < T_AKS) p = [L.soma + (L.a1 - L.soma) * (t / T_AKS), L.ny];
        else if (t < T_SIN) p = [L.a1 + 5, L.ny];
        else if (t < T_NV) p = [L.gap[1] + 6 + 14 * ((t - T_SIN) / (T_NV - T_SIN)), L.ny];
      }
      B.nokta.style.opacity = p ? 1 : 0; if (p) yerle(B.nokta, p);
      B.vez.forEach((c, i) => {
        const k = (t - T_AKS - i * 0.1) / (T_SIN - T_AKS - 0.2);
        const g = k > 0 && k < 1;
        c.style.opacity = g ? 1 : 0; if (g) yerle(c, [L.a1 + 12 + (L.gap[1] - L.a1 - 16) * k, L.ny + (i - 1) * 6]);
      });
      B.hedef.classList.toggle('on', t >= T_NV);
      B.hor.forEach((c, i) => {
        const k = (t - i * ((T_END - T_HOR) / (N_HOR - 1))) / T_HOR;
        const g = k > 0 && k < 1; c.style.opacity = g ? 1 : 0; if (g) yerle(c, yolNokta(B.dam, k));
      });
      B.barN.setAttribute('width', (bw * Math.min(t, T_NV) / T_SON).toFixed(1));
      B.barE.setAttribute('width', (bw * Math.min(t, T_SON) / T_SON).toFixed(1));
      sahne.querySelector('[data-b="n"]').textContent = t >= T_NV ? 'Nöral: hızlı' : 'Nöral';
      sahne.querySelector('[data-b="e"]').textContent = t >= T_SON ? 'Endokrin: çok daha yavaş' : 'Endokrin';
      if (t >= T_SON) cap('bson', CB.son); else if (t >= T_AKS) cap('bnoral', CB.noral); else cap('bbas', CB.bas);
    };
    const ciz = () => { if (kip === 'a') cizA(); else cizB(); };
    const oynYaz = (v) => { oyn = v; oynT = 0; const b = el.querySelector('[data-a="oynat"]'); b.setAttribute('aria-pressed', String(v)); b.textContent = v ? 'Duraklat' : 'Oynat'; };
    el.addEventListener('click', (e) => {
      const k = e.target.closest('[data-kip]');
      if (k) {
        kip = k.dataset.kip; basSec(el, 'kip', kip); oynYaz(false); bCal = false; bT = 0; capK = '';
        el.querySelectorAll('.f44-ctl').forEach((c) => { c.hidden = c.dataset.k !== kip; });
        ciz(); return;
      }
      const b = e.target.closest('[data-a]'); if (!b) return;
      const a = b.dataset.a;
      if (a === 'geri' && adim > 1) { oynYaz(false); adim--; guncelA(); }
      else if (a === 'ileri' && adim < 3) { oynYaz(false); adim++; guncelA(); }
      else if (a === 'oynat') { if (oyn) oynYaz(false); else { if (adim === 3) { adim = 1; guncelA(); } oynYaz(true); } }
      else if (a === 'basla') { if (RM) { bT = T_SON; bCal = false; } else { bT = 0; bCal = true; } kareB(); }
      else if (a === 'sifir') { bT = 0; bCal = false; kareB(); }
    });
    const durD = darIzle(el, (n) => { dar = n; ciz(); });
    const dur = ticker(el, (dt) => {
      if (kip === 'a') {
        faz += dt; if (faz > 1.6) faz = 0;
        if (oyn) { oynT += dt; if (oynT >= 2.5) { oynT = 0; if (adim < 3) { adim++; guncelA(); } if (adim >= 3) oynYaz(false); } }
        kareA();
      } else if (bCal) { bT = Math.min(T_SON, bT + dt); if (bT >= T_SON) bCal = false; kareB(); }
    });
    return () => { dur(); durD(); };
  };

  /* =====================================================================
     2 · f44_noron — bir nöronu uyarın (Şekil 44.1 parçaları; K1 s. 189–190)
     ===================================================================== */
  VIZ.f44_noron = (el) => {
    const C = {
      dend: '<b>Dendritler.</b> Dallanmış uzantılardır; öteki nöronlardan sinapslarla gelen sinyalleri alıp hücre gövdesine doğru iletirler. Bir parçaya dokunun ya da "Uyar" ile sinyali izleyin. [[K1 s. 189]]',
      govde: '<b>Hücre gövdesi.</b> Sitoplazma, çekirdek ve organel içerir; protein sentezi ve ATP üretimi burada olur. Kitaba göre olgun nöronda sentriyol olmadığından nöron mitoza giremez. Gövdeler gri cevheri yapar; kümeleri CNS\'de çekirdek, PNS\'de gangliyon adını alır. [[K1 s. 189]]',
      tepecik: '<b>Akson tepeciği.</b> Voltaj kapılı Na⁺ kanalları en yoğun olduğu için eşik burada en düşüktür; girdi dendritten gelse bile aksiyon potansiyeli genellikle ilk burada doğar. [[K1 s. 189]]',
      akson: '<b>Akson.</b> Hücre gövdesinden çıkan uzun uzantıdır; aksiyon potansiyelini gövdeden uzağa iletir. Miyelinli ya da miyelinsiz olabilir. [[K1 s. 189]]',
      miyelin: '<b>Miyelin.</b> Çok katlı, elektrik yalıtkanı lipit ve proteinden oluşur; PNS\'de Schwann hücreleri, CNS\'de oligodendrositler üretir. Lipit aksonlara beyaz renk verir ve beyin ile omurilikte beyaz cevheri oluşturur; miyelin iletimi hızlandırır. [[K1 s. 189]]',
      ranvier: '<b>Ranvier boğumu.</b> Miyelin segmentleri arasındaki kısa açıklıktır (Şekil 44.1); iletime etkisi Bölüm 52\'de. [[K1 s. 190]]',
      terminal: '<b>Akson terminali.</b> Nöron aksonun distal ucunda sinapsla başka bir hücreyle iletişir; motor nöronda bu sinaps nöromüsküler kavşaktır. [[K1 s. 189]]',
      girdi: '<b>Girdi.</b> Öteki nöronlardan sinapslarla gelen sinyaller dendritlerden hücre gövdesine doğru iletilir. [[K1 s. 189]]',
      iletM: '<b>İletim.</b> Aksiyon potansiyeli akson boyunca gövdeden uzağa iletilir. Çok katlı, yalıtkan lipit ve proteinden oluşan miyelin iletimi hızlandırır (ayrıntı Bölüm 52). [[K1 s. 189]]',
      iletS: '<b>İletim (miyelinsiz).</b> Akson miyelinsiz de olabilir; miyelin yalıtımı olmadığında aksiyon potansiyeli daha yavaş yayılır (ayrıntı Bölüm 52). [[K1 s. 189]]',
    };
    const GRUP = { dend: 'dend', govde: 'govde', cekirdek: 'govde', tepecik: 'tepecik', akson: 'akson', miyelin: 'miyelin', schwann: 'miyelin', ranvier: 'ranvier', terminal: 'terminal', dugme: 'terminal' };
    let miy = true, yer = 'pns', dar = false, sec = 'dend', an = null, G = null;
    el.innerHTML = `<div class="f44-kont">
        <button type="button" class="btn" data-a="uyar">Uyar</button>
        <div><span class="f44-lbl">Akson</span>${segHtml('Akson', 'miy', [['1', 'Miyelinli'], ['0', 'Miyelinsiz']], '1')}</div>
        <div><span class="f44-lbl">Yer</span>${segHtml('Yer', 'yer', [['pns', 'PNS'], ['cns', 'CNS']], 'pns')}</div></div>
      <div class="f44-sahne"></div>`;
    const sahne = el.querySelector('.f44-sahne');
    const DEN = [
      [[-22, -16], [-60, -44], [-90, -70]], [[-28, -6], [-80, -14], [-114, -28]], [[-28, 8], [-76, 22], [-112, 30]],
      [[-20, 20], [-48, 56], [-70, 76]], [[-14, -22], [-28, -58], [-22, -84]],
    ];
    const DAL = [[1, [-70, -80]], [1, [-104, 0]], [1, [-96, 50]], [1, [-36, 82]]];
    const cfg = (d) => (d ? {
      W: 400, H: 300, cy: 150, sx: 92, sr: 22, s: 0.72, h1: 136, ax1: 318, n: 4, s0: 146, s1: 312, g: 10,
      term: [[342, 124], [348, 142], [348, 160], [342, 178]], hed: [360, 116, 36, 70], schwI: 1,
      lb: [['dend', 40, 26, 'middle', 1, 1], ['govde', 112, 50, 'middle', 'gov'], ['tepecik', 198, 26, 'middle', 124, 143], ['schwann', 300, 50, 'middle', 'sch'],
        ['miyelin', 132, 270, 'middle', 'm0'], ['ranvier', 238, 290, 'middle', 'n1'], ['dugme', 394, 270, 'end', 'b3']],
      na: [146, 128], nmj: null,
    } : {
      W: 720, H: 262, cy: 140, sx: 140, sr: 28, s: 1, h1: 196, ax1: 604, n: 5, s0: 210, s1: 590, g: 12,
      term: [[640, 110], [648, 132], [648, 152], [640, 174]], hed: [662, 100, 50, 84], schwI: 2,
      lb: [['dend', 56, 30, 'middle', 1, 1], ['tepecik', 214, 30, 'middle', 182, 133], ['schwann', 'sx', 30, 'middle', 'sch'], ['miyelin', 548, 30, 'middle', 'm4'], ['terminal', 666, 30, 'middle', 622, 124],
        ['govde', 118, 244, 'middle', 'gov'], ['cekirdek', 196, 214, 'start', 148, 146], ['ranvier', 'n1', 244, 'middle', 'n1'], ['akson', 440, 244, 'middle', 440, 142], ['dugme', 632, 216, 'middle', 'b2']],
      na: [204, 122], nmj: [712, 256],
    });
    const AD = { dend: 'Dendritler', govde: 'Hücre gövdesi', cekirdek: 'Çekirdek', tepecik: 'Akson tepeciği', akson: 'Akson', miyelin: 'Miyelin kılıfı', ranvier: 'Ranvier boğumu', terminal: 'Akson terminali', dugme: 'Terminal düğme' };
    const ciz = () => {
      const c = cfg(dar), cy = c.cy;
      const ab = (p) => [c.sx + p[0] * c.s, cy + p[1] * c.s];
      const den = DEN.map((d, i) => { const pts = d.map(ab); let s = `M${P([pts[0]])} L${P(pts.slice(1)).replace(/ /g, ' L')}`; if (DAL[i]) { const m = pts[DAL[i][0]], u = ab(DAL[i][1]); s += ` M${P([m])} L${P([u])}`; } return s; }).join(' ');
      const uclar = DEN.map((d, i) => [ab(d[d.length - 1]), DAL[i] ? ab(DAL[i][1]) : null]).flat().filter(Boolean);
      const soma = Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2 + 0.3, r = c.sr * (i % 2 ? 0.92 : 1.05); return [c.sx + Math.cos(a) * r, cy + Math.sin(a) * r]; });
      const L = (c.s1 - c.s0 - (c.n - 1) * c.g) / c.n;
      const segs = Array.from({ length: c.n }, (_, i) => c.s0 + i * (L + c.g));
      const nodes = Array.from({ length: c.n - 1 }, (_, i) => segs[i] + L + c.g / 2);
      const segC = (i) => segs[i] + L / 2;
      const h0 = c.sx + c.sr - 4, mh = 11;
      const [hx, hy, hw, hh] = c.hed;
      const sc = segC(c.schwI);
      const hucre = yer === 'pns'
        ? `<g class="f44-p f44-schw" data-p="schwann" tabindex="0" role="button" aria-label="Schwann hücresi"><rect class="f44-schw-z" x="${segs[c.schwI] - 2}" y="${cy - mh - 2}" width="${L + 4}" height="${2 * mh + 4}" rx="9"/><ellipse class="f44-schw-n" cx="${sc}" cy="${cy - mh - 2}" rx="11" ry="5"/></g>`
        : `<g class="f44-p f44-oligo" data-p="schwann" tabindex="0" role="button" aria-label="Oligodendrosit">${[c.schwI - 1, c.schwI, c.schwI + 1].filter((i) => i >= 0 && i < c.n).map((i) => `<path class="f44-oligo-k" d="M${sc} ${cy - 64} Q${(sc + segC(i)) / 2} ${cy - 44} ${segC(i)} ${cy - mh}"/>`).join('')}<circle class="f44-oligo-g" cx="${sc}" cy="${cy - 66}" r="11"/><circle class="f44-oligo-n" cx="${sc}" cy="${cy - 66}" r="4.5"/></g>`;
      const hedef = yer === 'pns'
        ? `<g class="f44-hedefg"><rect class="f44-kaslif" x="${hx}" y="${hy}" width="${hw}" height="${hh}" rx="8"/>${[0.25, 0.5, 0.75].map((f) => `<line class="f44-cizgi" x1="${hx + 6}" y1="${hy + hh * f}" x2="${hx + hw - 6}" y2="${hy + hh * f}"/>`).join('')}${tx(hx + hw / 2, hy + hh / 2 + 4, 'kas', 'f44-mini-t', 'middle')}</g>`
        : `<g class="f44-hedefg"><rect class="f44-hedefn" x="${hx}" y="${hy}" width="${hw}" height="${hh}" rx="${hw / 2}"/>${tx(hx + hw / 2, hy + hh / 2 + 4, 'nöron', 'f44-mini-t', 'middle')}</g>`;
      const pt = { gov: [c.sx, cy + c.sr + 1], sch: yer === 'pns' ? [sc, cy - mh - 6] : [sc, cy - 78], n1: [nodes[1], cy + 7], b2: [c.term[2][0], c.term[2][1] + 7], b3: [c.term[3][0] + 2, c.term[3][1] + 7], m0: [segC(0), cy + mh], m4: [segC(4) || segC(c.n - 1), cy - mh] };
      const dP = ab(DEN[0][1]);
      const etiket = c.lb.map(([p, x, y, anc, a, b]) => {
        if ((p === 'miyelin' || p === 'ranvier' || p === 'schwann') && !miy) return '';
        let X = x === 'sx' ? sc : x === 'n1' ? nodes[1] : x, hdf = typeof a === 'string' ? pt[a] : p === 'dend' ? [dP[0], dP[1] - 4] : [a, b];
        const ad = p === 'schwann' ? (yer === 'pns' ? 'Schwann hücresi (PNS)' : 'Oligodendrosit (CNS)') : AD[p];
        const ust = y < hdf[1];
        return `<g class="f44-p f44-lb" data-p="${p}" tabindex="0" role="button" aria-label="${ad}"><line class="f44-lider" x1="${anc === 'start' ? X + 2 : X}" y1="${ust ? y + 5 : y - 15}" x2="${hdf[0]}" y2="${hdf[1]}"/>${tx(X, y, ad, 'f44-et', anc)}</g>`;
      }).join('');
      sahne.innerHTML = `<svg class="f44-svg ${dar ? 'f44-dar' : ''}" viewBox="0 0 ${c.W} ${c.H}" role="img" aria-label="Nöronun parçaları: dendritler, hücre gövdesi, akson tepeciği, akson, miyelin, Ranvier boğumları, akson terminali">
        <g class="f44-p" data-p="dend" tabindex="0" role="button" aria-label="Dendritler"><path class="f44-hit" d="${den}"/><path class="f44-den" d="${den}"/>${uclar.map((u) => `<circle class="f44-gelen" cx="${u[0]}" cy="${u[1]}" r="4"/>`).join('')}</g>
        <g class="f44-p" data-p="akson" tabindex="0" role="button" aria-label="Akson"><line class="f44-hit" x1="${c.h1}" y1="${cy}" x2="${c.ax1}" y2="${cy}"/><line class="f44-aks" x1="${c.h1 - 2}" y1="${cy}" x2="${c.ax1}" y2="${cy}"/></g>
        <line class="f44-iz" x1="${c.h1}" y1="${cy}" x2="${c.h1}" y2="${cy}"/>
        ${miy ? `<g class="f44-p" data-p="miyelin" tabindex="0" role="button" aria-label="Miyelin kılıfı">${segs.map((x) => `<rect class="f44-miy" x="${x}" y="${cy - mh}" width="${L}" height="${2 * mh}" rx="9"/>`).join('')}</g>
          <g class="f44-p" data-p="ranvier" tabindex="0" role="button" aria-label="Ranvier boğumları">${nodes.map((x, i) => `<rect class="f44-hit-r" x="${x - c.g / 2}" y="${cy - mh - 4}" width="${c.g}" height="${2 * mh + 8}"/><circle class="f44-bogum" data-n="${i}" cx="${x}" cy="${cy}" r="4.5"/>`).join('')}</g>${hucre}` : ''}
        <g class="f44-p" data-p="terminal" tabindex="0" role="button" aria-label="Akson terminali"><path class="f44-hit" d="${c.term.map((t) => `M${c.ax1} ${cy} L${t[0]} ${t[1]}`).join(' ')}"/><path class="f44-aks f44-term" d="${c.term.map((t) => `M${c.ax1} ${cy} Q${c.ax1 + 16} ${cy} ${t[0]} ${t[1]}`).join(' ')}"/></g>
        <g class="f44-p" data-p="dugme" tabindex="0" role="button" aria-label="Terminal düğmeler">${c.term.map((t) => `<circle class="f44-tdug" cx="${t[0]}" cy="${t[1]}" r="6"/>`).join('')}</g>
        ${hedef}
        <g class="f44-p" data-p="govde" tabindex="0" role="button" aria-label="Hücre gövdesi"><polygon class="f44-govde" points="${P(soma)}"/></g>
        <g class="f44-p" data-p="tepecik" tabindex="0" role="button" aria-label="Akson tepeciği"><path class="f44-tep" d="M${h0} ${cy - 12} L${c.h1} ${cy - 3.5} L${c.h1} ${cy + 3.5} L${h0} ${cy + 12} Z"/>${[0, 1, 2, 3].map((i) => `<circle class="f44-na" cx="${h0 + 5 + i * ((c.h1 - h0 - 8) / 3)}" cy="${cy + (i % 2 ? 3 : -3)}" r="1.6"/>`).join('')}</g>
        <g class="f44-p" data-p="cekirdek" tabindex="0" role="button" aria-label="Çekirdek"><circle class="f44-cek" cx="${c.sx - 2}" cy="${cy}" r="${c.sr * 0.36}"/></g>
        ${tx(c.na[0], c.na[1], dar ? 'Na⁺ yoğun' : 'Na⁺ kanalı yoğun', 'f44-na-t', 'start')}
        ${c.nmj ? tx(c.nmj[0], c.nmj[1], yer === 'pns' ? 'nöromüsküler kavşak (motor nöron)' : 'sinaps (hedef hücre)', 'f44-ts', 'end') : ''}
        ${etiket}
        <g class="f44-ap" opacity="0"><rect x="${h0 - 4}" y="${cy + 18}" width="30" height="18" rx="9"/>${tx(h0 + 11, cy + 31, 'AP', '', 'middle')}</g>
        <g class="f44-dots">${[0, 1, 2].map(() => '<circle class="f44-nokta" r="5" opacity="0"/>').join('')}<circle class="f44-nokta f44-apn" r="6.5" opacity="0"/>${Array.from({ length: 7 }, () => '<circle class="f44-bulut" r="2.6" opacity="0"/>').join('')}</g>
      </svg>`;
      // animasyon geometrisi
      const tip = [0, 2, 3].map((i) => yolOlc([ab(DEN[i][2]), ab(DEN[i][1]), ab(DEN[i][0]), [c.sx, cy]]));
      const durak = miy ? [c.h1, ...nodes, c.ax1] : [c.h1, c.ax1];
      G = { c, cy, tip, durak, nodes, h0, svg: sahne.querySelector('svg'), dots: [...sahne.querySelectorAll('.f44-nokta:not(.f44-apn)')], ap: sahne.querySelector('.f44-apn'), bulut: [...sahne.querySelectorAll('.f44-bulut')], iz: sahne.querySelector('.f44-iz'), bog: [...sahne.querySelectorAll('.f44-bogum')], apR: sahne.querySelector('.f44-ap') };
      vurgu(); kare();
    };
    const vurgu = () => { if (!G) return; G.svg.querySelectorAll('.f44-p').forEach((g) => g.classList.toggle('f44-sec', GRUP[g.dataset.p] === sec)); };
    const secYap = (p) => { sec = GRUP[p] || p; an = null; vurgu(); kare(); capYaz(el, C[sec]); };
    const T1 = 1, T2 = 1.6;
    const sure = () => (miy ? 1.2 : 3);
    let capK = '';
    const cap = (k) => { if (capK !== k) { capK = k; capYaz(el, k === 'rm' ? C.tepecik + ' ' + C[miy ? 'iletM' : 'iletS'] : C[k]); } };
    const kare = () => {
      if (!G) return;
      const { c, cy, svg } = G;
      const t = an ? an.t : -1, D = sure(), T3 = T2 + D, T4 = T3 + 0.8;
      const son = an && an.son;
      svg.classList.toggle('f44-yanik', t >= T1 || !!son);
      svg.classList.toggle('f44-govde-on', t >= T1 * 0.9 && t < T2 + 0.3);
      G.apR.setAttribute('opacity', t >= T1 && t < T3 + 0.2 ? 1 : son ? 1 : 0);
      G.dots.forEach((d, i) => { const k = (t - i * 0.12) / (T1 - 0.24); const g = an && k > 0 && k < 1 && !son; d.setAttribute('opacity', g ? 1 : 0); if (g) yerle(d, yolNokta(G.tip[i], ease(k))); });
      // AP konumu
      let x = null, bogI = -1;
      if (an && !son && t >= T2 && t < T3) {
        const k = (t - T2) / D;
        if (miy) {
          const n = G.durak.length - 1, s = k * n, i = Math.floor(s), f = s - i;
          const a = G.durak[i], b = G.durak[Math.min(n, i + 1)];
          x = f < 0.55 ? a : a + (b - a) * ease((f - 0.55) / 0.45);
          if (f < 0.55 && i > 0 && i <= G.nodes.length) bogI = i - 1;
        } else x = c.h1 + (c.ax1 - c.h1) * k;
      }
      G.ap.setAttribute('opacity', x != null ? 1 : 0); if (x != null) yerle(G.ap, [x, cy]);
      G.bog.forEach((b, i) => b.classList.toggle('on', i === bogI || (!!son && false)));
      const izX = son ? c.ax1 : x != null ? x : t >= T3 ? c.ax1 : c.h1;
      G.iz.setAttribute('x2', izX); G.iz.classList.toggle('f44-kesik', !!son && RM);
      G.iz.setAttribute('opacity', an ? 1 : 0);
      const bk = son ? 1 : (t - T3) / 0.8;
      G.bulut.forEach((b, i) => {
        const tr = c.term[i % 4], hx = c.hed[0] + 4, hy = c.hed[1] + 10 + (i / 6) * (c.hed[3] - 20);
        const g = an && bk > 0; b.setAttribute('opacity', g ? 0.95 : 0);
        if (g) { const q = ease(clamp(bk, 0, 1)); yerle(b, [tr[0] + (hx - tr[0]) * q * 0.9, tr[1] + (hy - tr[1]) * q * 0.9]); }
      });
      svg.classList.toggle('f44-hedef-on', !!an && bk >= 0.9);
      if (!an) return;
      if (son && RM) cap('rm');
      else if (t < T1) cap('girdi');
      else if (t < T2) cap('tepecik');
      else if (t < T3) cap(miy ? 'iletM' : 'iletS');
      else cap('terminal');
      if (t >= T4 && !son) an.son = true;
    };
    el.addEventListener('click', (e) => {
      const u = e.target.closest('[data-a="uyar"]');
      if (u) { capK = ''; an = RM ? { t: 99, son: true } : { t: 0 }; kare(); return; }
      const m = e.target.closest('[data-miy]'); if (m) { miy = m.dataset.miy === '1'; basSec(el, 'miy', m.dataset.miy); an = null; ciz(); return; }
      const y = e.target.closest('[data-yer]'); if (y) { yer = y.dataset.yer; basSec(el, 'yer', yer); const a = an; ciz(); an = a; kare(); return; }
      const p = e.target.closest('[data-p]'); if (p) secYap(p.dataset.p);
    });
    tusla(el, secYap);
    const durD = darIzle(el, (n) => { dar = n; ciz(); });
    const dur = ticker(el, (dt) => { if (an && !an.son) { an.t += dt; kare(); } });
    return () => { dur(); durD(); };
  };

  /* =====================================================================
     3 · f44_tipler — altı nöron sınıfı (K1 s. 190–191)
     ===================================================================== */
  VIZ.f44_tipler = (el) => {
    const pol = (cx, cy, r, n, ph) => P(Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 + (ph || 0); return [cx + Math.cos(a) * r * (i % 2 ? 0.9 : 1.05), cy + Math.sin(a) * r * (i % 2 ? 0.9 : 1.05)]; }));
    const rad = (cx, cy, a, r) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    const dalYol = (cx, cy, angs, r0, r1, r2, fork) => angs.map((d) => { const a = d * Math.PI / 180, s = rad(cx, cy, a, r0), m = rad(cx, cy, a, r1), u = rad(cx, cy, a, r2), f1 = rad(m[0], m[1], a - fork, r2 - r1), f2 = rad(m[0], m[1], a + fork, (r2 - r1) * 0.8); return `M${P([s])} L${P([u])} M${P([m])} L${P([f1])} M${P([m])} L${P([f2])}`; }).join(' ');
    const uc = (x, y, dx) => `M${x} ${y} L${x + dx} ${y - 18} M${x} ${y} L${x + dx * 1.2} ${y} M${x} ${y} L${x + dx} ${y + 18}`;
    const MULTI_A = [100, 140, 172, 200, 232, 262, 300];
    const ANAK_A = [0, 45, 90, 135, 180, 225, 270, 315];
    const TIP = [
      { id: 'uni', ad: 'Unipolar', bicim: 'Gövdeden tek akson çıkar', yer: 'İnsanda yaygın değil; kokleada bulunur (kitaba göre)',
        cap: '<b>Unipolar.</b> Hücre gövdesinden bir akson çıkar. İnsanda yaygın değildir; kitap kokleada bulunduğunu söyler (sayfadaki Atlas notuna bakın). [[K1 s. 190]]',
        svg: `<path class="f44-n-ak" d="M102 110 L290 110 ${uc(290, 110, 24)}"/><circle class="f44-n-g" cx="80" cy="110" r="22"/>`,
        et: [[80, 74, 'gövde'], [200, 98, 'akson']], yol: [[[80, 110], [102, 110], [290, 110], [318, 110]]] },
      { id: 'bi', ad: 'Bipolar', bicim: 'Gövde dendritlerle akson arasında', yer: 'Retina, koku nöronları',
        cap: '<b>Bipolar.</b> Hücre gövdesi dendritlerle akson arasında yer alır; retinada ve koku nöronlarında bulunur. [[K1 s. 190]]',
        svg: `<path class="f44-n-d" d="M22 90 L60 110 M18 110 L60 110 M22 130 L60 110 M60 110 L148 110"/><path class="f44-n-ak" d="M188 110 L292 110 ${uc(292, 110, 24)}"/><circle class="f44-n-g" cx="168" cy="110" r="20"/>`,
        et: [[100, 98, 'dendrit'], [168, 78, 'gövde'], [240, 98, 'akson']], yol: [[[18, 110], [60, 110], [148, 110], [168, 110], [188, 110], [318, 110]]] },
      { id: 'psodo', ad: 'Psödounipolar', bicim: 'Bipolar kökenli, unipolar görünür', yer: 'Çoğu duyusal nöron; gövde dorsal kök gangliyonunda',
        cap: '<b>Psödounipolar.</b> Bazı bipolar nöronlar unipolar gibi görünür: akson yaklaşık ortasında hücre gövdesiyle kesilir. Duyusal nöronların çoğu bu tiptir; gövde aksonun yanındaki bir uzantıda, dorsal kök gangliyonundadır. [[K1 s. 190–191]]',
        svg: `<path class="f44-n-d" d="M40 140 L16 122 M40 140 L12 140 M40 140 L16 158"/><path class="f44-n-ak" d="M40 140 L300 140 ${uc(300, 140, 22)}"/><path class="f44-n-sap" d="M170 140 L170 92"/><circle class="f44-n-g" cx="170" cy="74" r="20"/>`,
        et: [[200, 70, 'gövde (DRG)', 'start'], [40, 178, 'periferik uç'], [300, 178, 'merkezî uç'], [170, 210, 'akson, yaklaşık ortasında gövdeyle kesilir']], yol: [[[12, 140], [40, 140], [300, 140], [324, 140]]], sap: true },
      { id: 'multi', ad: 'Multipolar', bicim: 'Dendritler birleşmeden gövdeye girer', yer: 'Klasik örnek: motor nöron',
        cap: '<b>Multipolar.</b> Dendritler birleşmeden doğrudan hücre gövdesine girer. Klasik örnek motor nörondur. Bir sınıf seçin. [[K1 s. 190]]',
        svg: `<path class="f44-n-d" d="${dalYol(110, 110, MULTI_A, 22, 50, 80, 0.4)}"/><path class="f44-n-ak" d="M132 110 L296 110 ${uc(296, 110, 24)}"/><polygon class="f44-n-g" points="${pol(110, 110, 25, 7, 0.2)}"/>`,
        et: [[40, 30, 'dendritler'], [216, 98, 'tek akson']], yol: [0, 3, 5].map((k) => { const a = MULTI_A[k] * Math.PI / 180; return [rad(110, 110, a, 80), rad(110, 110, a, 22), [110, 110], [132, 110], [296, 110], [320, 110]]; }) },
      { id: 'anak', ad: 'Anaksonik', bicim: 'Akson ve dendrit ayırt edilemez', yer: 'Retinada amakrin hücre',
        cap: '<b>Anaksonik.</b> Dendritler ve aksonlar ayırt edilemez; hücre gövdesine bağlı büyük bir ağaç gibi görünür. Örnek: retinadaki amakrin hücreler. [[K1 s. 190]]',
        svg: `<path class="f44-n-d" d="${dalYol(170, 106, ANAK_A, 18, 52, 82, 0.42)}"/><circle class="f44-n-g" cx="170" cy="106" r="20"/>`,
        et: [[170, 212, 'uzantılar birbirine benzer: akson işareti yok']], yol: ANAK_A.map((d) => { const a = d * Math.PI / 180; return [[170, 106], rad(170, 106, a, 82)]; }), yay: true },
      { id: 'pir', ad: 'Piramidal', bicim: 'Üçgen gövde, tek akson, çok dendrit; çok sayıda afferent sinyali bütünleştirir', yer: 'Serebral korteks, hipokampus',
        cap: '<b>Piramidal hücre.</b> Üçgen gövdesi adını verir; tek aksonu ve çok sayıda dendriti vardır, bu dendritlerle çok sayıda afferent sinyali bütünleştirir. Serebral korteks ve hipokampusta sık bulunur. [[K1 s. 190]]',
        svg: `<path class="f44-n-d" d="M170 92 L170 18 M170 50 L144 30 M170 38 L196 20 M170 66 L198 52 M152 130 L112 150 L92 172 M112 150 L94 136 M188 130 L228 150 L248 172 M228 150 L246 136 M158 132 L140 168"/><path class="f44-n-ak" d="M170 132 L170 206 M170 184 L188 198"/><polygon class="f44-n-g" points="170,90 196,134 144,134"/>`,
        et: [[182, 22, 'apikal dendrit', 'start'], [204, 112, 'üçgen gövde', 'start'], [180, 210, 'akson', 'start'], [70, 190, 'bazal dendritler']], yol: [[[170, 18], [170, 92], [170, 112], [170, 134], [170, 206]]] },
    ];
    let sec = 'multi', dar = false, faz = 0, dongu = 0;
    el.innerHTML = `<div class="f44-kartlar" role="group" aria-label="Nöron sınıfı seçin">${TIP.map((t) => `<button type="button" class="f44-tkart" data-t="${t.id}" aria-pressed="${t.id === sec}"><svg viewBox="0 0 340 220" class="f44-mini" aria-hidden="true">${t.svg}</svg><span>${t.ad}</span></button>`).join('')}</div>
      <div class="f44-tip-g"><div class="f44-tip-svg"></div><div class="f44-bilgi" aria-live="off"></div></div>`;
    const kutu = el.querySelector('.f44-tip-svg'), bilgi = el.querySelector('.f44-bilgi'), g = el.querySelector('.f44-tip-g');
    let Y = null;
    const ciz = () => {
      const t = TIP.find((x) => x.id === sec);
      kutu.innerHTML = `<svg class="f44-svg" viewBox="0 0 340 220" role="img" aria-label="${t.ad} nöron çizimi ve sinyal yönü"><defs><marker id="f44-uc-tip" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="f44-uc-acc"/></marker></defs>${t.svg}
        ${RM ? t.yol.slice(0, t.yay ? 8 : 1).map((y) => `<polyline class="f44-rmyol" points="${P(y)}" marker-end="url(#f44-uc-tip)"/>`).join('') : ''}
        ${t.et.map(([x, y, s, a]) => tx(x, y, s, 'f44-et2', a || 'middle')).join('')}
        ${(t.yay ? t.yol : [0]).map(() => '<circle class="f44-nokta" r="5" opacity="0"/>').join('')}</svg>`;
      bilgi.innerHTML = `<h4>${t.ad}</h4><p><span>Biçim</span>${t.bicim}</p><p><span>Nerede</span>${t.yer}</p>`;
      Y = { t, yol: t.yol.map(yolOlc), dots: [...kutu.querySelectorAll('.f44-nokta')], sap: kutu.querySelector('.f44-n-sap') };
      kare();
    };
    const kare = () => {
      if (!Y || RM) return;
      const f = ease(clamp(faz / 0.85, 0, 1));
      if (Y.t.yay) Y.dots.forEach((d, i) => { d.setAttribute('opacity', faz < 0.9 ? 1 - f * 0.6 : 0); yerle(d, yolNokta(Y.yol[i], f)); });
      else {
        const y = Y.yol[dongu % Y.yol.length], p = yolNokta(y, f), d = Y.dots[0];
        d.setAttribute('opacity', faz < 0.9 ? 1 : 0); yerle(d, p);
        if (Y.sap) Y.sap.classList.toggle('on', faz < 0.9 && Math.abs(p[0] - 170) < 22);
      }
    };
    const secYap = (id) => { sec = id; basSec(el, 't', id); faz = 0; ciz(); capYaz(el, TIP.find((x) => x.id === id).cap); };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-t]'); if (b) secYap(b.dataset.t); });
    const durD = darIzle(el, (n) => { dar = n; g.classList.toggle('f44-dar', n); el.querySelector('.f44-kartlar').classList.toggle('f44-dar', n); });
    ciz();
    const dur = RM ? () => {} : ticker(el, (dt) => { faz += dt / 2; if (faz >= 1) { faz = 0; dongu++; } kare(); });
    return () => { dur(); durD(); };
  };

  /* =====================================================================
     4 · f44_harita — CNS ve PNS sınıflama haritası (K1 s. 191)
     ===================================================================== */
  VIZ.f44_harita = (el) => {
    const N = [
      { id: 'sis', ad: 'Sinir sistemi', d: 0, b: [130, 8, 170, 32] },
      { id: 'cns', ad: 'CNS', d: 1, b: [20, 64, 170, 32], ust: 'sis' },
      { id: 'beyin', ad: 'Beyin', d: 2, b: [40, 114, 150, 32], ust: 'cns' },
      { id: 'omur', ad: 'Omurilik', d: 2, b: [40, 156, 150, 32], ust: 'cns' },
      { id: 'ara', ad: 'Ara nöronlar', alt: 'Renshaw, multipolar, piramidal', d: 2, b: [40, 198, 196, 44], ust: 'cns' },
      { id: 'pns', ad: 'PNS', d: 1, b: [230, 64, 200, 32], ust: 'sis' },
      { id: 'duy', ad: 'Duyusal (afferent)', alt: 'çoğu psödounipolar', d: 2, b: [250, 114, 180, 44], ust: 'pns', r: 'ok' },
      { id: 'mot', ad: 'Somatik motor (efferent)', alt: 'istemli, multipolar', d: 2, b: [250, 166, 180, 44], ust: 'pns', r: 'warn' },
      { id: 'ent', ad: 'Enterik', alt: '"ikinci beyin"', d: 2, b: [250, 218, 180, 44], ust: 'pns' },
      { id: 'oto', ad: 'Otonom', alt: 'istemsiz', d: 2, b: [250, 270, 180, 44], ust: 'pns' },
      { id: 'sem', ad: 'Sempatik', alt: 'Bölüm 59', d: 3, b: [276, 330, 76, 40], ust: 'oto' },
      { id: 'par', ad: 'Parasempatik', alt: 'Bölüm 59', d: 3, b: [356, 330, 88, 40], ust: 'oto' },
    ];
    const C = {
      beyin: '<b>Beyin.</b> Duyusal girdilerin, motor çıktının, düşünmenin ve öğrenmenin üst düzey bütünleştirme yeridir. Haritada bir kutuya dokunun. [[K1 s. 191]]',
      sis: '<b>Sinir sistemi.</b> Bütün öğeleri bir bütün olarak birlikte çalışır; geleneksel olarak CNS ve PNS diye ayrılır. [[K1 s. 191]]',
      cns: '<b>CNS.</b> Beyin ve omurilikten oluşur. [[K1 s. 191]]',
      omur: '<b>Omurilik.</b> Periferle CNS arasında bilgi taşıyan uzun duyusal ve motor yolları ve yerel bütünleştirici ağları içerir. [[K1 s. 191]]',
      ara: '<b>Ara nöronlar.</b> CNS içinde nöronlar arasında bağlantı kurar; kitap örnek olarak Renshaw, multipolar ve piramidal hücreleri verir. Renshaw hücreleri basit inhibitör ara nöronlardır. [[K1 s. 191]]',
      pns: '<b>PNS.</b> Hücre tipleri: duyusal, somatik motor, enterik ve otonom nöronlar. [[K1 s. 191]]',
      duy: '<b>Duyusal (afferent) nöronlar.</b> Dış ortamdan ve iç organlardan CNS\'ye bilgi taşır. Çoğu psödounipolardır; gövde aksonun yanındaki bir uzantıda, dorsal kök gangliyonunda yer alır. [[K1 s. 191]]',
      mot: '<b>Motor (efferent) nöronlar.</b> Somatik motor nöron da denir; istemli denetim altındadır ve aksiyon potansiyelini CNS\'den iskelet kasına iletir. Tipik olarak multipolardır: çok dendritten girdi alır, yanıtı tek aksonla iletir. [[K1 s. 191]]',
      ent: '<b>Enterik nöronlar.</b> Gastrointestinal kanalı saran geniş bir ağdır. CNS\'den görece bağımsız çalıştığı için bazen "ikinci beyin" denir; beyin onu yine de otonom nöronlarla etkileyebilir. [[K1 s. 191]]',
      oto: '<b>Otonom nöronlar.</b> İç organların ilkel "ev işlerini" ve vücudun acil durum yanıtlarını yürütür. İstemsizdir; sempatik ve parasempatik alt sistemlere ayrılır (Bölüm 59). [[K1 s. 191]]',
    };
    C.sem = C.oto; C.par = C.oto;
    const VURGU = { sis: ['beyin', 'kord', 'duy', 'mot', 'oto', 'ent'], cns: ['beyin', 'kord'], beyin: ['beyin'], omur: ['kord'], ara: ['beyin', 'kord', 'aran'], pns: ['duy', 'mot', 'oto', 'ent'], duy: ['duy'], mot: ['mot'], ent: ['ent'], oto: ['oto'], sem: ['oto'], par: ['oto'] };
    let sec = 'beyin', dar = false;
    const govde = `<g class="f44-vucut">
        <circle class="f44-v-dis" cx="70" cy="40" r="32"/>
        <path class="f44-v-kol" d="M100 88 L150 140 L188 188"/>
        <path class="f44-v-bacak" d="M56 214 L50 326 M84 214 L90 326"/>
        <rect class="f44-v-dis" x="38" y="76" width="64" height="142" rx="24"/>
        <ellipse class="f44-v-p" data-v="beyin" cx="70" cy="37" rx="23" ry="17"/>
        <rect class="f44-v-p" data-v="kord" x="67" y="60" width="7" height="146" rx="3.5"/>
        <path class="f44-v-kalp" d="M52 104 c-6 -8 -18 -2 -12 8 l12 12 l12 -12 c6 -10 -6 -16 -12 -8 z"/>
        <path class="f44-v-bag" d="M48 168 q10 -10 20 0 t20 0 M48 182 q10 -10 20 0 t20 0 M50 196 q10 -8 18 0 t18 0"/>
        <ellipse class="f44-v-kasi" cx="128" cy="116" rx="17" ry="8" transform="rotate(46 128 116)"/>
        <circle class="f44-v-drg" cx="82" cy="122" r="5"/>
        <circle class="f44-v-res" cx="190" cy="192" r="5"/>
        <path class="f44-v-y f44-v-duy" data-v="duy" d="M190 192 L150 142 L106 98 L82 122 L74 122"/>
        <path class="f44-v-y f44-v-mot" data-v="mot" d="M70 108 L98 92 L122 110"/>
        <path class="f44-v-y f44-v-oto" data-v="oto" d="M67 100 L54 110 M67 172 L80 180"/>
        <path class="f44-v-y f44-v-ent" data-v="ent" d="M44 162 q24 -16 48 0 M44 202 q24 12 48 0 M44 162 L44 202 M92 162 L92 202"/>
        <circle class="f44-v-y f44-v-aran" data-v="aran" cx="70.5" cy="150" r="5"/>
      </g>`;
    const sema = `<g class="f44-sema"><text class="f44-ts" x="110" y="268" text-anchor="middle">ara nöron köprü kurar</text>
        <line class="f44-s-l" x1="56" y1="294" x2="96" y2="294" marker-end="url(#f44-uc-h)"/><line class="f44-s-l" x1="124" y1="294" x2="164" y2="294" marker-end="url(#f44-uc-h)"/>
        <circle class="f44-s-n" cx="42" cy="294" r="13"/><circle class="f44-s-a" cx="110" cy="294" r="13"/><circle class="f44-s-n" cx="178" cy="294" r="13"/>
        <path class="f44-s-l" d="M42 307 L42 338 L96 338" marker-end="url(#f44-uc-h)"/><path class="f44-s-i" d="M124 338 L178 338 L178 310 M170 310 L186 310"/>
        <circle class="f44-s-r" cx="110" cy="338" r="13"/><text class="f44-ts f44-s-rt" x="110" y="368" text-anchor="middle">Renshaw: inhibitör</text></g>`;
    const defsH = `<defs><marker id="f44-uc-h" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="f44-uc-mut"/></marker></defs>`;
    el.innerHTML = '<div class="f44-sahne"></div>';
    const sahne = el.querySelector('.f44-sahne');
    const dugum = (n) => {
      const [x, y, w, h] = n.b;
      return `<g class="f44-p f44-dg ${n.r ? 'f44-dg-' + n.r : ''}" data-p="${n.id}" tabindex="0" role="button" aria-label="${n.ad}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9"/>${tx(x + w / 2, y + (n.alt ? 18 : h / 2 + 5), n.ad, 'f44-dg-t', 'middle')}${n.alt ? tx(x + w / 2, y + 35, n.alt, 'f44-dg-a', 'middle') : ''}</g>`;
    };
    const bag = (n) => {
      const u = N.find((m) => m.id === n.ust); if (!u) return '';
      const [ux, uy, uw, uh] = u.b, [x, y, w, h] = n.b;
      if (n.d === 1) { const mx = ux + uw / 2; return `<path class="f44-bag" d="M${mx} ${uy + uh} L${mx} ${uy + uh + 10} L${x + w / 2} ${uy + uh + 10} L${x + w / 2} ${y}"/>`; }
      if (n.d === 3) { const sx = ux + 16; return `<path class="f44-bag" d="M${sx} ${uy + uh} L${sx} ${y + h / 2} L${x} ${y + h / 2}"/>`; }
      const sx = ux + 12; return `<path class="f44-bag" d="M${sx} ${uy + uh} L${sx} ${y + h / 2} L${x} ${y + h / 2}"/>`;
    };
    const ciz = () => {
      if (!dar) {
        sahne.innerHTML = `<svg class="f44-svg" viewBox="0 0 720 380" role="img" aria-label="Sinir sisteminin bölümleri: ağaç haritası ve vücutta yerleri">${defsH}
          ${N.map(bag).join('')}${N.map(dugum).join('')}${sema}
          <g transform="translate(486 24)">${govde}</g>
          ${tx(596, 372, 'şematik vücut (önden)', 'f44-ts', 'middle')}</svg>`;
      } else {
        sahne.innerHTML = `<svg class="f44-svg" viewBox="0 0 340 180" role="img" aria-label="Seçilen bölümün vücuttaki yeri">
            <g transform="translate(14 4) scale(0.51)">${govde}</g>
            <text class="f44-dar-ad" x="132" y="64"></text><text class="f44-ts f44-dar-alt" x="132" y="86"></text><text class="f44-ts f44-dar-alt2" x="132" y="102"></text>
            ${tx(132, 132, 'aşağıdaki ağaçta bir satıra', 'f44-ts', 'start')}${tx(132, 148, 'dokunun', 'f44-ts', 'start')}</svg>
          <div class="f44-agac" role="group" aria-label="Sinir sistemi ağacı">${N.map((n) => `<button type="button" class="f44-agac-b ${n.r ? 'f44-dg-' + n.r : ''}" data-p="${n.id}" aria-pressed="false" style="--d:${n.d}"><b>${n.ad}</b>${n.alt ? `<span>${n.alt}</span>` : ''}</button>${n.id === 'ara' ? `<svg class="f44-svg f44-sema-dar" viewBox="10 256 200 122" role="img" aria-label="Ara nöron ve Renshaw hücresi şeması">${defsH}${sema}</svg>` : ''}`).join('')}</div>`;
      }
      guncel();
    };
    const guncel = () => {
      const v = VURGU[sec] || [];
      sahne.querySelectorAll('.f44-dg').forEach((g) => g.classList.toggle('f44-sec', g.dataset.p === sec));
      sahne.querySelectorAll('.f44-agac-b').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.p === sec)));
      sahne.querySelectorAll('[data-v]').forEach((p) => p.classList.toggle('on', v.includes(p.dataset.v)));
      sahne.querySelectorAll('.f44-sema').forEach((s) => s.classList.toggle('on', sec === 'ara'));
      const sd = sahne.querySelector('.f44-sema-dar'); if (sd) sd.style.display = sec === 'ara' ? '' : 'none';
      const n = N.find((m) => m.id === sec), a = sahne.querySelector('.f44-dar-ad');
      if (a) {
        const t = n.alt || '', k = t.length > 24 ? t.lastIndexOf(', ', 24) : -1;
        sahne.querySelector('.f44-dar-alt').textContent = k > 0 ? t.slice(0, k + 1) : t;
        sahne.querySelector('.f44-dar-alt2').textContent = k > 0 ? t.slice(k + 2) : '';
      }
    };
    const secYap = (id) => { sec = id; guncel(); capYaz(el, C[id]); };
    el.addEventListener('click', (e) => { const p = e.target.closest('[data-p]'); if (p) secYap(p.dataset.p); });
    tusla(el, secYap);
    const durD = darIzle(el, (n) => { dar = n; ciz(); });
    return () => { durD(); };
  };

  /* =====================================================================
     5 · f44_katman — sinir kesiti ve lokal anesteziğin yayılması (K1 s. 191)
     ===================================================================== */
  VIZ.f44_katman = (el) => {
    const C = {
      epi: '<b>Epinöryum.</b> Sinirin kalın dış katmanıdır; fasikülleri ve onların kan damarlarını birlikte sarar. "Enjekte et" ile lokal anesteziğin içe yayılmasını izleyin ya da bir katmana dokunun. [[K1 s. 191]]',
      peri: '<b>Perinöryum.</b> Çok sayıda sinir lifi fasikül adlı demetlerde toplanır; her fasikülü saran ve destekleyen bağ dokusu perinöryumdur. [[K1 s. 191]]',
      endo: '<b>Endonöryum.</b> Her sinir lifini saran ince bağ dokusu katmanıdır. [[K1 s. 191]]',
      lif: '<b>Sinir lifi.</b> Miyelinli aksonu Schwann hücrelerinin ürettiği miyelin sarar; miyelin kılıfıyla sarılı aksona çoğu kez sinir lifi denir. [[K1 s. 191]]',
    };
    const AC = [C.epi,
      '<b>1 · Epinöryum.</b> Lokal anestezik önce sinirin kalın dış katmanından yayılır. [[K1 s. 191]]',
      '<b>2 · Perinöryum.</b> Sonra fasikülü saran perinöryumu geçer; fasikül, sinir liflerinin bir araya toplandığı demettir. [[K1 s. 191]]',
      '<b>3 · Endonöryum.</b> Ardından her sinir lifini saran ince endonöryumu geçer. [[K1 s. 191]]',
      '<b>Aksona ulaştı.</b> Lokal anestezik aksonlara etki etmek için üç katmanın, epinöryum, perinöryum ve endonöryumun hepsini geçerek yayılmalıdır. [[K1 s. 191]]'];
    const LEJ = [['epi', 'Epinöryum', 'kalın dış katman; fasikülleri ve damarlarını sarar'], ['peri', 'Perinöryum', 'her fasikülü sarar, destekler'], ['endo', 'Endonöryum', 'her sinir lifini saran ince bağ dokusu'], ['lif', 'Schwann hücresi miyelini', 'miyelinli aksonu sarar (akson + miyelin = sinir lifi)']];
    const FAS = [[-55, -50, 44, 10], [52, -56, 40, 10], [66, 40, 46, 10], [-40, 58, 42, 10], [4, -2, 24, 4]];
    const DAM = [[-100, -10, 8], [100, -12, 7], [-20, 110, 7], [10, -110, 6]];
    let adim = 0, dar = false, oyn = false, oynT = 0, onceki = 0, durT = () => {}, flT = 0;
    el.innerHTML = `<p class="f44-kb">Periferik sinir: çok sayıda aksondan oluşan demet; bağ dokusu aksonları ayırır ve yalıtır</p>
      <div class="f44-kont"><button type="button" class="btn" data-a="enj">Enjekte et</button>
        <div class="btn-row f44-adimk"><button type="button" class="btn ghost" data-a="geri" aria-label="Önceki adım">‹</button><span class="f44-sayac">Adım 0/4</span><button type="button" class="btn ghost" data-a="ileri" aria-label="Sonraki adım">›</button></div>
        <button type="button" class="btn ghost" data-a="sifir">Sıfırla</button></div>
      <div class="f44-kat-g"><div class="f44-kesit"></div>
        <div class="f44-yan"><div class="f44-lej" role="group" aria-label="Katmanlar (dıştan içe)">${LEJ.map(([k, a, s], i) => `<button type="button" class="f44-lej-b" data-p="${k}" aria-pressed="false"><i class="f44-lej-i f44-lej-${k}"></i><span><b>${i + 1} · ${a}:</b> ${s}</span></button>`).join('')}</div>
          <div class="f44-ins"><svg class="f44-svg" viewBox="0 0 220 150" role="img" aria-label="Büyütülmüş tek sinir lifi: akson, miyelin, endonöryum">
            <rect class="f44-ins-z" x="2" y="2" width="216" height="146" rx="12"/>
            <circle class="f44-ins-endo" cx="72" cy="76" r="58"/><circle class="f44-ins-miy" cx="72" cy="76" r="44"/><circle class="f44-ins-aks" cx="72" cy="76" r="20"/>
            <text class="f44-ins-blok" x="72" y="80" text-anchor="middle">blok</text>
            <text class="f44-ts" x="10" y="16">büyütülmüş tek lif</text>
            <line class="f44-lider" x1="146" y1="40" x2="118" y2="44"/>${tx(150, 44, 'endonöryum', 'f44-ts f44-ink', 'start')}
            <line class="f44-lider" x1="146" y1="76" x2="112" y2="76"/>${tx(150, 72, 'miyelin', 'f44-ts f44-ink', 'start')}${tx(150, 87, '(Schwann)', 'f44-ts', 'start')}
            <line class="f44-lider" x1="146" y1="118" x2="86" y2="90"/>${tx(150, 122, 'akson', 'f44-ts f44-ink', 'start')}</svg></div></div></div>`;
    const kesit = el.querySelector('.f44-kesit'), gr = el.querySelector('.f44-kat-g');
    let K = null;
    const ciz = () => {
      const W = dar ? 340 : 380, H = dar ? 300 : 320, cx = dar ? 200 : 230, cy = dar ? 150 : 160, R = dar ? 120 : 135, sk = R / 135;
      const fas = (dar ? FAS.slice(0, 4) : FAS).map(([x, y, r, n]) => [cx + x * sk, cy + y * sk, r * sk, dar ? 6 : n]);
      const lifR = dar ? 6.5 : 6.5;
      const lifler = fas.map(([fx, fy, fr, n]) => {
        const out = [];
        const ic = n >= 8 ? 3 : 1, dis = n - ic;
        for (let i = 0; i < ic; i++) { const a = (i / ic) * Math.PI * 2 + 0.5, d = ic === 1 ? 0 : fr * 0.32; out.push([fx + Math.cos(a) * d, fy + Math.sin(a) * d]); }
        for (let i = 0; i < dis; i++) { const a = (i / dis) * Math.PI * 2 + 0.2, d = fr - lifR - 5; out.push([fx + Math.cos(a) * d, fy + Math.sin(a) * d]); }
        return out;
      });
      const buy = lifler[2][ic0(fas[2][3])];
      function ic0(n) { return n >= 8 ? 3 : 1; }
      const nx = dar ? 4 : 6;
      kesit.innerHTML = `<svg class="f44-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Periferik sinirin enine kesiti: epinöryum, perinöryumla sarılı fasiküller, endonöryumla sarılı sinir lifleri; lokal anesteziğin içe yayılması">
        <ellipse class="f44-la-bulut" cx="${nx + 52}" cy="${cy}" rx="${dar ? 22 : 26}" ry="${dar ? 40 : 46}"/>
        <line class="f44-igne" x1="${nx}" y1="${cy - 66}" x2="${nx + 50}" y2="${cy - 16}"/><line class="f44-igne-u" x1="${nx}" y1="${cy - 66}" x2="${nx + 16}" y2="${cy - 50}"/>
        ${tx(nx + 52, cy + (dar ? 62 : 70), 'lokal', 'f44-ts f44-la-t', 'middle')}${tx(nx + 52, cy + (dar ? 76 : 84), 'anestezik', 'f44-ts f44-la-t', 'middle')}
        <g class="f44-p" data-p="epi" tabindex="0" role="button" aria-label="Epinöryum"><circle class="f44-epi" cx="${cx}" cy="${cy}" r="${R}"/></g>
        ${DAM.map(([x, y, r]) => `<circle class="f44-dam" cx="${cx + x * sk}" cy="${cy + y * sk}" r="${r * sk}"/>`).join('')}
        ${fas.map(([x, y, r], i) => `<g class="f44-p" data-p="peri" tabindex="0" role="button" aria-label="Perinöryum ve fasikül"><circle class="f44-fas" cx="${x}" cy="${y}" r="${r}"/></g>
          <g class="f44-p" data-p="lif" tabindex="0" role="button" aria-label="Sinir lifleri">${lifler[i].map(([a, b]) => `<circle class="f44-endo" cx="${a.toFixed(1)}" cy="${b.toFixed(1)}" r="${lifR}"/><circle class="f44-miy2" cx="${a.toFixed(1)}" cy="${b.toFixed(1)}" r="${lifR - 1.8}"/><circle class="f44-aks2" cx="${a.toFixed(1)}" cy="${b.toFixed(1)}" r="2.2"/>`).join('')}</g>
          <g class="f44-rozet"><rect x="${x - 17}" y="${y - r - 8}" width="34" height="15" rx="7.5"/>${tx(x, y - r + 3, 'blok', '', 'middle')}</g>`).join('')}
        <circle class="f44-buyut" cx="${buy[0].toFixed(1)}" cy="${buy[1].toFixed(1)}" r="${lifR + 3.5}"/>
        <circle class="f44-cephe" cx="${cx}" cy="${cy}" r="0" opacity="0"/>
        ${fas.map(([x, y]) => `<circle class="f44-cephe f44-cephe-f" cx="${x}" cy="${y}" r="0" opacity="0"/>`).join('')}
        ${dar ? '' : `<line class="f44-lider" x1="${cx - 100 * sk - 6}" y1="${cy - 10 * sk + 10}" x2="${cx - 112}" y2="${cy + 36}"/>${tx(cx - 112, cy + 50, 'kan damarı', 'f44-ts', 'middle')}`}
      </svg>`;
      K = { svg: kesit.querySelector('svg'), R, fas, ana: kesit.querySelector('.f44-cephe:not(.f44-cephe-f)'), fc: [...kesit.querySelectorAll('.f44-cephe-f')] };
      guncel(false);
    };
    const guncel = (anim) => {
      el.querySelector('.f44-sayac').textContent = `Adım ${adim}/4`;
      el.querySelector('[data-a="geri"]').disabled = adim === 0;
      el.querySelector('[data-a="ileri"]').disabled = adim === 4;
      [K.svg, el.querySelector('.f44-ins')].forEach((s) => { for (let i = 1; i <= 4; i++) s.classList.toggle('f44-s' + i, adim >= i); });
      durT();
      K.ana.setAttribute('opacity', 0); K.fc.forEach((c) => c.setAttribute('opacity', 0));
      if (anim && !RM && (adim === 1 || adim === 2)) {
        let t0 = 0, raf = 0;
        const f = (t) => {
          if (!t0) t0 = t; const k = clamp((t - t0) / 1100, 0, 1), q = ease(k);
          if (adim === 1) { K.ana.setAttribute('r', (K.R + 26 - q * 70).toFixed(1)); K.ana.setAttribute('opacity', (1 - k).toFixed(2)); }
          else K.fc.forEach((c, i) => { const r = K.fas[i][2]; c.setAttribute('r', (r + 5 - q * r * 0.8).toFixed(1)); c.setAttribute('opacity', (1 - k).toFixed(2)); });
          if (k < 1) raf = requestAnimationFrame(f);
        };
        raf = requestAnimationFrame(f);
        durT = () => cancelAnimationFrame(raf);
      } else durT = () => {};
      capYaz(el, AC[adim]);
    };
    const oynYaz = (v) => { oyn = v; oynT = 0; };
    const flas = (k) => {
      el.querySelectorAll('.f44-lej-b').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.p === k)));
      K.svg.classList.remove('f44-fl-epi', 'f44-fl-peri', 'f44-fl-endo', 'f44-fl-lif');
      void K.svg.getBoundingClientRect();
      K.svg.classList.add('f44-fl-' + k);
      el.querySelector('.f44-ins').classList.toggle('f44-fl-endo', k === 'endo');
      el.querySelector('.f44-ins').classList.toggle('f44-fl-lif', k === 'lif');
      clearTimeout(flT); if (!RM) flT = setTimeout(() => { K.svg.classList.remove('f44-fl-' + k); }, 1800);
      capYaz(el, C[k]);
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-a]');
      if (b) {
        const a = b.dataset.a;
        if (a === 'enj') { if (RM) { adim = 4; guncel(false); } else { adim = 0; guncel(false); oynYaz(true); } }
        else if (a === 'geri' && adim > 0) { oynYaz(false); adim--; guncel(false); }
        else if (a === 'ileri' && adim < 4) { oynYaz(false); adim++; guncel(true); }
        else if (a === 'sifir') { oynYaz(false); adim = 0; guncel(false); }
        return;
      }
      const p = e.target.closest('[data-p]'); if (p) flas(p.dataset.p);
    });
    tusla(el, flas);
    const durD = darIzle(el, (n) => { dar = n; gr.classList.toggle('f44-dar', n); ciz(); });
    const dur = ticker(el, (dt) => {
      if (!oyn) return;
      oynT += dt;
      if (oynT >= (adim === 0 ? 0.5 : 1.5)) { oynT = 0; adim++; guncel(true); if (adim >= 4) oynYaz(false); }
    });
    void onceki;
    return () => { dur(); durD(); durT(); clearTimeout(flT); };
  };
})();
