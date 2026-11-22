/* Fizyoloji Bölüm 33 · Sistemik dolaşım · bileşenler (tarif: docs/tasarim/fiz33.md; K1 s. 145–147).
   Şemalar ölçekli değildir; kitaptan gelen sayılar ve temsilî değerler bileşen altlarında belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, a, p) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const tx = (p, x, y, s, cls, anc) => { const t = mk('text', { x, y, class: cls || 'f33-t', 'text-anchor': anc || 'start' }, p); t.textContent = s; return t; };
  const lerp = (a, b, f) => a + (b - a) * f;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const yol = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const sayi = (v) => {
    const d = v >= 10 ? 1 : v >= 1 ? 1 : v >= 0.1 ? 2 : 3;
    let s = v.toFixed(d);
    if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
    return s.replace('.', ',');
  };
  const capYaz = (el, h) => { const c = el.closest('.viz') && el.closest('.viz').querySelector('.viz-cap'); if (c) c.innerHTML = REF(h); };
  /* kapsayıcı 560 px'ten darsa dar yerleşim; yalnız eşik geçilince yeniden çizer */
  const darIzle = (el, cb) => {
    let d = null;
    const f = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < 560; if (n !== d) { d = n; cb(n); } };
    f();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const hap = (p, s, dar) => { // etiketli parçacık
    const g = mk('g', { class: 'f33-hap' }, p);
    const fs = dar ? 12.5 : 11, w = Math.max(22, s.length * fs * 0.62 + 10), h = fs + 7;
    mk('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: h / 2 }, g);
    tx(g, 0, fs * 0.36, s, 'f33-hap-t', 'middle');
    return g;
  };
  const okIsareti = (svg) => {
    const d = mk('defs', {}, svg);
    const m = mk('marker', { id: 'f33-ok', viewBox: '0 0 10 10', refX: '8', refY: '5', markerWidth: '6', markerHeight: '6', orient: 'auto-start-reverse' }, d);
    mk('path', { d: 'M0 0 L10 5 L0 10 z', class: 'f33-ok-uc' }, m);
    const m2 = mk('marker', { id: 'f33-ok-i', viewBox: '0 0 10 10', refX: '8', refY: '5', markerWidth: '5', markerHeight: '5', orient: 'auto-start-reverse' }, d);
    mk('path', { d: 'M0 0 L10 5 L0 10 z', class: 'f33-ok-uc-i' }, m2);
  };
  const segHtml = (ad, key, opts, cur, cls) => `<div class="seg ${cls || ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));

  /* =====================================================================
     1 · f33_islev — dolaşımın dokuz işlevi bir vücut şemasında (K1 s. 145)
     ===================================================================== */
  VIZ.f33_islev = (el) => {
    const S = [
      ['o2', 'O₂', ['akc'], ['doku'], ['O₂'], '<b>O₂ taşınması.</b> Akciğerde alınan O₂ dokulara götürülür. [[K1 s. 145]]'],
      ['co2', 'CO₂', ['doku'], ['akc'], ['CO₂'], '<b>CO₂ taşınması.</b> Dokularda oluşan CO₂ akciğere taşınır ve atılır. [[K1 s. 145]]'],
      ['atik', 'Atıklar', ['doku'], ['kc', 'bob'], ['atık'], '<b>Metabolik atıklar.</b> Dokuların atıkları atılmak üzere karaciğere ve böbreğe taşınır. [[K1 s. 145]]'],
      ['besin', 'Besinler', ['bag', 'kc'], ['doku'], ['besin'], '<b>Besinler.</b> Emildikleri yerden (bağırsak) ya da üretildikleri yerden (karaciğer) dokulara dağıtılır. [[K1 s. 145]]'],
      ['su', 'Su ve elektrolit', [], [], ['H₂O', 'Na⁺'], '<b>Su ve elektrolit.</b> Vücut suyu ve elektrolitler hücre içi, interstisyel ve damar içi kompartımanlar arasında dağıtılır. [[K1 s. 145]]'],
      ['bgk', 'Bağışıklık', [], [], ['Ab', 'lökosit', 'C'], '<b>Bağışıklık öğeleri.</b> Antikorlar, lökositler ve kompleman kanla taşınır. [[K1 s. 145]]'],
      ['hor', 'Hormon taşıma', ['pt'], ['bob'], ['PTH'], '<b>Hormon taşınması.</b> Hormonlar üretildikleri yerden (ör. paratiroid bezi) hedeflerine (ör. böbrek) götürülür. [[K1 s. 145]]'],
      ['anp', 'Hormon üretimi', ['atr'], [], ['ANP'], '<b>Hormon üretimi.</b> Dolaşım bazı hormonları kendisi üretir: atriyal natriüretik peptit. [[K1 s. 145]]'],
      ['isi', 'Isı', ['mrk'], ['deri'], ['ısı'], '<b>Isı düzenlemesi.</b> Kan akımı merkez organlarla deri arasında yeniden dağıtılarak ısı düzenlemesine yardım edilir. [[K1 s. 145]]'],
    ];
    const capIlk = '<b>Dokuz işlev.</b> Bir işlev seçin: taşınan madde, çıktığı ve vardığı organlarla birlikte şemada belirir. [[K1 s. 145]]';
    const SIRA = ['akc', 'kalp', 'mrk', 'pt', 'bag', 'kc', 'bob', 'doku', 'deri'];
    const AD = { akc: 'Akciğer', mrk: 'Merkez organlar', pt: 'Paratiroid', bag: 'Bağırsak', kc: 'Karaciğer', bob: 'Böbrek', doku: 'Dokular', deri: 'Deri' };
    let sec = null, dar = false, svg, gYol, gHap, haplar = [], t = 0;
    el.innerHTML = `<div class="f33-ust">${segHtml('Dolaşımın işlevi', 'i', S.map((s) => [s[0], s[1]]), null, 'f33-seg')}</div><div class="f33-svgk"></div>`;
    const kut = el.querySelector('.f33-svgk');

    /* yerleşimler: organ kutuları [cx, cy, w, h], yollar (nokta dizileri) */
    const Lw = {
      vb: '0 0 560 382', org: { akc: [280, 42, 100, 34], mrk: [280, 238, 132, 30], pt: [170, 160, 86, 28], bag: [180, 330, 84, 30], bob: [280, 330, 76, 30], kc: [382, 330, 92, 30], doku: [450, 245, 96, 46], deri: [110, 245, 70, 30] },
      kalp: [232, 137, 96, 46], komp: [6, 14, 222, 52], deriCiz: [14, 96, 532, 262], dip: [[280, 374]],
      halka: [[328, 160], [450, 160], [450, 330], [110, 330], [110, 160], [232, 160]],
      pulm: [[262, 137], [262, 59], [298, 59], [298, 137]], stub: [[280, 183], [280, 223]],
      atr: [340, 141, 'start'],
      r: {
        o2: [[[298, 62], [298, 160], [450, 160], [450, 222]]],
        co2: [[[450, 268], [450, 330], [110, 330], [110, 160], [262, 160], [262, 62]]],
        atik: [[[450, 268], [450, 330], [382, 330]], [[450, 268], [450, 330], [280, 330]]],
        besin: [[[180, 330], [110, 330], [110, 160], [450, 160], [450, 222]], [[382, 330], [110, 330], [110, 160], [450, 160], [450, 222]]],
        bgk: [[[328, 160], [450, 160], [450, 330], [110, 330], [110, 160], [232, 160], [328, 160]]],
        hor: [[[170, 160], [450, 160], [450, 330], [280, 330]]],
        anp: [[[300, 144], [328, 160], [450, 160], [450, 330], [110, 330], [110, 160], [232, 160], [300, 160]]],
        isi: [[[280, 223], [280, 160], [110, 160], [110, 245]], [[110, 245], [110, 160], [280, 160], [280, 223]]],
      },
    };
    const Y = (k) => 30 + SIRA.indexOf(k) * 44;
    const nr = (a, b) => { const X = Y(b) > Y(a) ? 36 : 62; return [[118, Y(a)], [X, Y(a)], [X, Y(b)], [118, Y(b)]]; };
    const Ln = {
      vb: '0 0 360 530', org: {}, kalp: [96, Y('kalp') - 17, 248, 34], komp: [8, 418, 344, 54], deriCiz: [4, 8, 352, 400],
      dip: [[180, 496], [180, 514]],
      halka: [[96, Y('kalp')], [36, Y('kalp')], [36, 398], [62, 398], [62, Y('kalp')], [96, Y('kalp')]],
      pulm: [[190, Y('kalp') - 17], [190, 46], [250, 46], [250, Y('kalp') - 17]], stub: null,
      atr: [338, Y('kalp') - 21, 'end'],
      r: {
        o2: [[[250, 44], [250, Y('kalp')], [36, Y('kalp')], [36, Y('doku')], [118, Y('doku')]]],
        co2: [[[118, Y('doku')], [62, Y('doku')], [62, Y('kalp')], [190, Y('kalp')], [190, 44]]],
        atik: [nr('doku', 'kc'), nr('doku', 'bob')],
        besin: [nr('bag', 'doku'), nr('kc', 'doku')],
        bgk: [[[118, Y('kalp')], [36, Y('kalp')], [36, 398], [62, 398], [62, Y('kalp')], [118, Y('kalp')]]],
        hor: [nr('pt', 'bob')],
        anp: [[[220, Y('kalp') - 8], [118, Y('kalp')], [36, Y('kalp')], [36, 398], [62, 398], [62, Y('kalp')], [150, Y('kalp')]]],
        isi: [nr('mrk', 'deri'), nr('deri', 'mrk')],
      },
    };
    SIRA.forEach((k) => { if (k !== 'kalp') Ln.org[k] = [220, Y(k), 248, 32]; });

    const ciz = () => {
      const L = dar ? Ln : Lw;
      kut.innerHTML = '';
      svg = mk('svg', { class: 'f33-svg' + (dar ? ' f33-dar' : ''), viewBox: L.vb, role: 'img', 'aria-label': 'Vücut şeması: kalp, akciğer ve organlar kan yoluyla bağlı; seçilen işlevde taşınan madde kaynaktan hedefe akar' }, kut);
      okIsareti(svg);
      const [dx, dy, dw, dh] = L.deriCiz;
      mk('rect', { x: dx, y: dy, width: dw, height: dh, rx: 34, class: 'f33-deri', 'data-deri': '1' }, svg);
      mk('path', { d: yol(L.halka), class: 'f33-halka' }, svg);
      mk('path', { d: yol(L.pulm), class: 'f33-halka f33-halka-p' }, svg);
      if (L.stub) mk('path', { d: yol(L.stub), class: 'f33-halka f33-halka-i' }, svg);
      if (dar) SIRA.forEach((k) => { if (k !== 'kalp' && k !== 'akc') mk('path', { d: `M36 ${Y(k)} H96`, class: 'f33-kol' }, svg); });
      gYol = mk('g', {}, svg);
      // kalp
      const [kx, ky, kw, kh] = L.kalp;
      const gK = mk('g', { class: 'f33-org', 'data-o': 'kalp' }, svg);
      mk('rect', { x: kx, y: ky, width: kw / 2, height: kh, rx: 9, class: 'f33-kalp-s' }, gK);
      mk('rect', { x: kx + kw / 2, y: ky, width: kw / 2, height: kh, rx: 9, class: 'f33-kalp-l' }, gK);
      mk('rect', { x: kx + 3, y: ky + 3, width: kw - 6, height: kh * 0.34, rx: 6, class: 'f33-atr', 'data-atr': '1' }, gK);
      if (dar) {
        tx(gK, kx + kw / 4, ky + kh / 2 + 5, 'Sağ kalp', 'f33-t', 'middle');
        tx(gK, kx + kw * 0.75, ky + kh / 2 + 5, 'Sol kalp', 'f33-t', 'middle');
      } else {
        tx(gK, kx + kw / 4, ky + kh / 2 + 4, 'Sağ', 'f33-t', 'middle'); tx(gK, kx + kw / 4, ky + kh / 2 + 17, 'kalp', 'f33-ts', 'middle');
        tx(gK, kx + kw * 0.75, ky + kh / 2 + 4, 'Sol', 'f33-t', 'middle'); tx(gK, kx + kw * 0.75, ky + kh / 2 + 17, 'kalp', 'f33-ts', 'middle');
      }
      const at = tx(svg, L.atr[0], L.atr[1], 'atriyum', 'f33-atr-t', L.atr[2]); at.setAttribute('data-atrt', '1');
      // organlar
      Object.keys(L.org).forEach((k) => {
        const [cx, cy, w, h] = L.org[k];
        const g = mk('g', { class: 'f33-org', 'data-o': k }, svg);
        mk('rect', { x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: 9 }, g);
        const ad = dar && k === 'pt' ? 'Paratiroid bezi' : AD[k];
        if (k === 'doku') {
          tx(g, cx, cy + (dar ? 5 : -2), dar ? 'Dokular (hücreler)' : ad, 'f33-t', 'middle');
          if (!dar) tx(g, cx, cy + 13, 'hücreler', 'f33-ts', 'middle');
        } else tx(g, cx, cy + 4.5, ad, 'f33-t', 'middle');
      });
      // kompartımanlar
      const [cx0, cy0, cw, ch] = L.komp;
      const gC = mk('g', { class: 'f33-komp', 'data-komp': '1' }, svg);
      const kw3 = (cw - 8) / 3;
      ['Hücre içi', 'İnterstisyel', 'Damar içi'].forEach((s, i) => {
        const x = cx0 + i * (kw3 + 4);
        mk('rect', { x, y: cy0, width: kw3, height: ch, rx: 8, class: i === 2 ? 'f33-komp-d' : 'f33-komp-b' }, gC);
        tx(gC, x + kw3 / 2, cy0 + 16, s, 'f33-ts f33-ts-k', 'middle');
      });
      const yC = cy0 + ch - 14;
      L.r.su = [[[cx0 + kw3 * 2.5 + 8, yC], [cx0 + kw3 * 0.5, yC]], [[cx0 + kw3 * 0.5, yC], [cx0 + kw3 * 2.5 + 8, yC]]];
      // dipnot
      if (dar) { tx(svg, L.dip[0][0], L.dip[0][1], 'Anestezist bu yolları ilaç, sıvı, beslenme', 'f33-not', 'middle'); tx(svg, L.dip[1][0], L.dip[1][1], 've ısı vermek için kullanır (K1 s. 145).', 'f33-not', 'middle'); }
      else tx(svg, L.dip[0][0], L.dip[0][1], 'Anestezist bu yolları ilaç, sıvı, beslenme ve ısı vermek için kullanır (K1 s. 145).', 'f33-not', 'middle');
      gHap = mk('g', {}, svg);
      uygula();
    };

    const uygula = () => {
      const L = dar ? Ln : Lw, s = S.find((x) => x[0] === sec);
      gYol.innerHTML = ''; gHap.innerHTML = ''; haplar = [];
      svg.classList.toggle('f33-secili', !!s);
      svg.querySelectorAll('.f33-org').forEach((g) => {
        const k = g.dataset.o;
        g.classList.toggle('kaynak', !!s && (s[2].includes(k) || (k === 'kalp' && s[2].includes('atr'))));
        g.classList.toggle('hedef', !!s && s[3].includes(k));
        g.classList.toggle('soluk', !s || !(s[2].includes(k) || s[3].includes(k) || (k === 'kalp' && s[2].includes('atr'))));
      });
      svg.querySelector('[data-komp]').style.display = s && s[0] === 'su' ? '' : 'none';
      svg.querySelector('[data-atr]').classList.toggle('on', !!s && s[0] === 'anp');
      svg.querySelector('[data-atrt]').style.display = s && s[0] === 'anp' ? '' : 'none';
      svg.querySelector('[data-deri]').classList.toggle('sicak', !!s && s[0] === 'isi');
      if (!s) { capYaz(el, capIlk); return; }
      capYaz(el, s[5]);
      const rs = L.r[s[0]];
      rs.forEach((pts, ri) => {
        const iki = s[0] === 'isi' || s[0] === 'su';
        if (iki && ri === 1 && !RM) { /* ters yön: aynı çizgi */ } else {
          const p = mk('path', { d: yol(pts), class: 'f33-vurgu' }, gYol);
          if (RM || iki) p.setAttribute('marker-end', 'url(#f33-ok)');
          if (iki && RM) p.setAttribute('marker-start', 'url(#f33-ok)');
        }
        const ref = mk('path', { d: yol(pts), fill: 'none', stroke: 'none' }, gYol);
        const Lp = ref.getTotalLength();
        const n = RM ? 3 : Math.max(2, Math.round(Lp / (dar ? 70 : 80)));
        for (let i = 0; i < n; i++) {
          const g = hap(gHap, s[4][(i + ri) % s[4].length], dar);
          haplar.push({ g, ref, L: Lp, f: RM ? (i + 1) / (n + 1) : i / n });
        }
      });
      konum();
    };
    const konum = () => {
      haplar.forEach((h) => {
        const f = RM ? h.f : (h.f + t / 3) % 1;
        const p = h.ref.getPointAtLength(f * h.L);
        h.g.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
      });
    };
    el.querySelectorAll('[data-i]').forEach((b) => b.addEventListener('click', () => {
      sec = sec === b.dataset.i ? null : b.dataset.i;
      basSec(el, 'i', sec); uygula();
    }));
    const durRO = darIzle(el, (d) => { dar = d; ciz(); });
    const dur = RM ? () => {} : ticker(el, (dt) => { if (!haplar.length) return; t += dt; konum(); });
    return () => { dur(); durRO(); };
  };

  /* =====================================================================
     2 · f33_hacim — dolaşan kan hacminin dağılımı ve venöz rezervuar (K1 s. 145–146)
     ===================================================================== */
  VIZ.f33_hacim = (el) => {
    const DIN = { art: 15, cap: 5, ven: 65, pulm: 10, kalp: 5 }, TON = { art: 20, cap: 5, ven: 55, pulm: 13, kalp: 7 };
    const CAP = {
      ilk: '<b>İstirahat.</b> Her bölümün alanı tuttuğu kan hacmiyle orantılı. Bir bölüme dokunun ya da venöz tonusu artırın: rezervuardaki kan nereye gider? [[K1 s. 145]]',
      ton: '<b>Venöz tonus artınca</b> kompliyansı büyük venlerden kan sağ atriyuma döner: venler bir rezervuardır ve venöz tonus venöz dönüşü sürdürür. Sistemik venler 1000 mL\'den fazla kan tutar ve gerektiğinde dolaşıma geri verir. [[K1 s. 145–146]]',
      lv: '<b>LV · pompa.</b> Sol ventrikül kanı sistemik damarlar boyunca iten pompadır. [[K1 s. 145]]',
      art: '<b>Arteriyel sistem · %15.</b> Arterler ve arteriollerden oluşur; dolaşan kanın yalnız %15\'ini tutar. [[K1 s. 145]]',
      cap: '<b>Kapillerler · %5.</b> Dolaşan kanın %5\'i kapillerlerdedir. [[K1 s. 145]]',
      ven: '<b>Venöz sistem · %65.</b> Venüller ve venlerden oluşur; kompliyansı en büyük bölüm olduğu için kanın çoğunu (%65) tutar. [[K1 s. 145]]',
      pulm: '<b>Pulmoner dolaşım · %10.</b> Dolaşan kanın %10\'u pulmoner dolaşımdadır; pulmoner venler yaklaşık 500 mL tutar. [[K1 s. 145–146]]',
      kalp: '<b>Kalp boşlukları · %5.</b> Dört kalp boşluğunda kanın %5\'i bulunur. [[K1 s. 145]]',
    };
    const DIL = [['ven', 'Venler'], ['art', 'Arterler'], ['pulm', 'Pulmoner'], ['kalp', 'Kalp'], ['cap', 'Kapiller']];
    const RENK = { art: 'crit', cap: 'ok', ven: 'basic', pulm: 'clin', kalp: 'chip' };
    let dar = false, ton = false, f = 0, sec = null, t = 0, E = {}, svg, gHap, refYol, L1 = 0, Lt = 0;
    el.innerHTML = `<div class="btn-row f33-ust"><button type="button" class="btn" data-ton aria-pressed="false">Venöz tonusu artır</button><button type="button" class="btn ghost" data-sif>Sıfırla</button></div>
      <div class="f33-svgk"></div>
      <div class="legend f33-lej">${DIL.map(([k, a]) => `<span data-l="${k}"><i class="f33-i-${RENK[k]}"></i><b data-lp="${k}"></b> ${a}<em class="f33-tems" data-lt="${k}">temsilî</em></span>`).join('')}<span class="tag basic">Venöz sistem: %65 · rezervuar &gt; 1000 mL</span></div>`;
    const kut = el.querySelector('.f33-svgk');
    const P = () => { const e = ease(f), o = {}; for (const k in DIN) o[k] = lerp(DIN[k], TON[k], e); return o; };

    const ciz = () => {
      kut.innerHTML = ''; E = {};
      svg = mk('svg', { class: 'f33-svg' + (dar ? ' f33-dar' : ''), viewBox: dar ? '0 0 360 486' : '0 0 560 320', role: 'img', 'aria-label': 'Sistemik dolaşım devresi: her bölümün alanı tuttuğu kan hacmiyle orantılı; venöz sistem en büyüğü' }, kut);
      okIsareti(svg);
      E.yol = mk('path', { class: 'f33-devre' }, svg);
      const kutu = (k, sinif, tik) => { const g = mk('g', { class: 'f33-bol ' + sinif, 'data-b': tik, tabindex: '0', role: 'button', 'aria-label': tik }, svg); E[k] = { g, r: mk('rect', { rx: 8 }, g) }; return g; };
      kutu('lv', 'f33-b-kalp', 'lv'); kutu('ra', 'f33-b-kalp', 'kalp'); kutu('rv', 'f33-b-kalp', 'kalp'); kutu('la', 'f33-b-kalp', 'kalp');
      kutu('art', 'f33-b-art', 'art'); kutu('cap', 'f33-b-cap', 'cap'); kutu('ven', 'f33-b-ven', 'ven'); kutu('pulm', 'f33-b-pulm', 'pulm');
      E.bolA = mk('line', { class: 'f33-bolme' }, E.art.g); E.bolV = mk('line', { class: 'f33-bolme' }, E.ven.g);
      ['lv', 'ra', 'rv', 'la'].forEach((k) => { E[k].t = tx(E[k].g, 0, 0, k.toUpperCase(), 'f33-t', 'middle'); });
      ['art', 'cap', 'ven', 'pulm'].forEach((k) => { E[k].ad = tx(svg, 0, 0, '', 'f33-t', 'middle'); E[k].p = tx(svg, 0, 0, '', 'f33-p', 'middle'); });
      E.kalpP = tx(svg, 0, 0, '', 'f33-ts', 'middle');
      E.sa1 = tx(svg, 0, 0, dar ? 'arterler · arterioller' : 'arterler', 'f33-ts', 'middle'); E.sa2 = tx(svg, 0, 0, 'arterioller', 'f33-ts', 'middle');
      E.sv1 = tx(svg, 0, 0, dar ? 'venüller · venler' : 'venüller', 'f33-ts', 'middle'); E.sv2 = tx(svg, 0, 0, 'venler', 'f33-ts', 'middle');
      if (dar) E.sa2.style.display = E.sv2.style.display = 'none';
      E.vd = tx(svg, 0, 0, 'venöz dönüş ↑', 'f33-vd', 'middle');
      refYol = mk('path', { fill: 'none', stroke: 'none' }, svg);
      gHap = mk('g', {}, svg);
      E.bar = mk('g', {}, svg);
      E.dil = {}; DIL.forEach(([k]) => { E.dil[k] = { r: mk('rect', { class: 'f33-dil f33-f-' + RENK[k] }, E.bar), t: tx(E.bar, 0, 0, '', 'f33-dil-t', 'middle') }; });
      tx(svg, dar ? 10 : 10, dar ? 424 : 280, 'Dolaşan kan hacmi (%100)', 'f33-ts', 'start');
      svg.querySelectorAll('[data-b]').forEach((g) => {
        const sec2 = () => { sec = g.dataset.b; capYaz(el, CAP[sec]); boya(); };
        g.addEventListener('click', sec2); g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sec2(); } });
      });
      haplar = [];
      for (let i = 0; i < 16; i++) { const c = mk('circle', { r: 3.6, class: 'f33-kan' }, gHap); haplar.push({ c, o: i / 16 }); }
      guncelle(); boya();
    };
    let haplar = [];
    const R = (e, x, y, w, h) => { e.setAttribute('x', x.toFixed(1)); e.setAttribute('y', y.toFixed(1)); e.setAttribute('width', Math.max(0, w).toFixed(1)); e.setAttribute('height', Math.max(0, h).toFixed(1)); };
    const T = (e, x, y, s) => { e.setAttribute('x', x.toFixed(1)); e.setAttribute('y', y.toFixed(1)); if (s != null) e.textContent = s; };
    const yuz = (v) => '%' + Math.round(v);
    const guncelle = () => {
      const p = P();
      let yolPts;
      if (!dar) {
        const yc = 160, sc = 2.2, yT = 38, cs = Math.sqrt(p.kalp / 5);
        const ch = 26 * cs, cw = 48;
        const kut2 = (k, cx, cy) => R(E[k].r, cx - cw / 2, cy - ch / 2, cw, ch);
        kut2('lv', 34, yc); kut2('ra', 516, yc); kut2('la', 34, yT); kut2('rv', 516, yT);
        ['lv', 'ra', 'la', 'rv'].forEach((k) => T(E[k].t, k === 'lv' || k === 'la' ? 34 : 516, (k === 'la' || k === 'rv' ? yT : yc) + 4.5));
        const bx = { art: 80, cap: 214, ven: 348 }, bw = 114;
        ['art', 'cap', 'ven'].forEach((k) => {
          const h = p[k] * sc, x = bx[k], y = yc - h / 2;
          R(E[k].r, x, y, bw, h);
          T(E[k].ad, x + bw / 2, y - 8, { art: 'Arteriyel sistem', cap: 'Kapillerler', ven: 'Venöz sistem' }[k]);
          if (h >= 18) T(E[k].p, x + bw / 2, yc + 5, yuz(p[k])); else T(E[k].p, x + bw / 2, y + h + 14, yuz(p[k]));
        });
        const hA = p.art * sc, hV = p.ven * sc;
        E.bolA.setAttribute('x1', 137); E.bolA.setAttribute('x2', 137); E.bolA.setAttribute('y1', yc - hA / 2 + 3); E.bolA.setAttribute('y2', yc + hA / 2 - 3);
        E.bolV.setAttribute('x1', 405); E.bolV.setAttribute('x2', 405); E.bolV.setAttribute('y1', yc - hV / 2 + 3); E.bolV.setAttribute('y2', yc + hV / 2 - 3);
        T(E.sa1, 108, yc + hA / 2 + 14); T(E.sa2, 166, yc + hA / 2 + 27);
        T(E.sv1, 376, yc + hV / 2 + 14); T(E.sv2, 433, yc + hV / 2 + 14);
        const hP = p.pulm * sc;
        R(E.pulm.r, 80, yT - hP / 2, 382, hP); T(E.pulm.ad, 200, yT + 4.5, 'Pulmoner dolaşım'); T(E.pulm.p, 340, yT + 5, yuz(p.pulm));
        T(E.kalpP, 34, yc + ch / 2 + 14, 'kalp ' + yuz(p.kalp));
        E.yol.setAttribute('d', `M58 ${yc} H492 M516 ${yc - ch / 2} V${yT + ch / 2} M492 ${yT} H${462} M80 ${yT} H58 M34 ${yT + ch / 2} V${yc - ch / 2}`);
        T(E.vd, 554, yc + ch / 2 + 18, null); E.vd.setAttribute('text-anchor', 'end');
        yolPts = [[405, yc], [516, yc], [516, yT], [34, yT], [34, yc], [137, yc]];
        cubuk(p, 10, 286, 540, 24);
      } else {
        const sc = 3.1, cw = 52, cs = Math.sqrt(p.kalp / 5), ch = 26 * cs, X = 112, W = 184, xR = 296;
        let y = 18;
        R(E.lv.r, X - cw / 2, y, cw, ch); T(E.lv.t, X, y + ch / 2 + 5);
        const yLV = y + ch / 2; y += ch + 24;
        const yer = {};
        ['art', 'cap', 'ven'].forEach((k) => { const h = Math.max(p[k] * sc, 17); yer[k] = [y, h]; R(E[k].r, X - W / 2, y, W, h); y += h + 22; });
        const [ya, ha] = yer.art, [ycp, hc] = yer.cap, [yv, hv] = yer.ven;
        T(E.art.ad, X, ya + 19, 'Arteriyel · ' + yuz(p.art)); E.art.p.textContent = '';
        T(E.sa1, X, ya + 36); E.bolA.setAttribute('x1', X - W / 2 + 4); E.bolA.setAttribute('x2', X + W / 2 - 4); E.bolA.setAttribute('y1', 0); E.bolA.setAttribute('y2', 0); E.bolA.style.display = 'none';
        T(E.cap.ad, X, ycp + hc / 2 + 5, 'Kapillerler · ' + yuz(p.cap)); E.cap.p.textContent = '';
        T(E.ven.ad, X, yv + 24, 'Venöz sistem'); T(E.ven.p, X, yv + hv / 2 + 10, yuz(p.ven)); T(E.sv1, X, yv + 42);
        E.bolV.style.display = 'none';
        const yb = yv + hv;
        const yRA = yb - ch / 2, yRV = yRA - 70, yLA = 18 + ch / 2;
        R(E.ra.r, xR - cw / 2, yRA - ch / 2, cw, ch); T(E.ra.t, xR, yRA + 5);
        R(E.rv.r, xR - cw / 2, yRV - ch / 2, cw, ch); T(E.rv.t, xR, yRV + 5);
        R(E.la.r, xR - cw / 2, yLA - ch / 2, cw, ch); T(E.la.t, xR, yLA + 5);
        const hP = Math.max(p.pulm * sc, 17), wP = 112, yPc = (yLA + yRV) / 2;
        R(E.pulm.r, xR - wP / 2, yPc - hP / 2, wP, hP); T(E.pulm.ad, xR, yPc - hP / 2 - 8, 'Pulmoner'); T(E.pulm.p, xR, yPc + 5, yuz(p.pulm));
        T(E.kalpP, X - cw / 2 - 8, yLV + 5, 'kalp ' + yuz(p.kalp)); E.kalpP.setAttribute('text-anchor', 'end');
        E.yol.setAttribute('d', `M${X} ${yLV + ch / 2} V${yb} M${X + W / 2} ${yRA} H${xR - cw / 2} M${xR} ${yRA - ch / 2} V${yRV + ch / 2} M${xR} ${yRV - ch / 2} V${yPc + hP / 2} M${xR} ${yPc - hP / 2 - 22} V${yLA + ch / 2} M${xR - cw / 2} ${yLA} H${X + cw / 2}`);
        T(E.vd, xR, yRA + ch / 2 + 16, null);
        yolPts = [[X, yv + hv * 0.7], [X, yRA], [xR, yRA], [xR, yLA], [X, yLA], [X, ya + ha / 2]];
        cubuk(p, 10, 430, 340, 26);
      }
      refYol.setAttribute('d', yol(yolPts));
      Lt = refYol.getTotalLength();
      L1 = Math.hypot(yolPts[1][0] - yolPts[0][0], yolPts[1][1] - yolPts[0][1]) + (dar ? Math.abs(yolPts[2][0] - yolPts[1][0]) : 0);
      E.vd.style.display = ton ? '' : 'none';
      // açıklama dizisi
      DIL.forEach(([k]) => { const b = el.querySelector(`[data-lp="${k}"]`); if (b) b.textContent = yuz(p[k]); const m = el.querySelector(`[data-lt="${k}"]`); if (m) m.style.display = f > 0.02 && k !== 'cap' ? '' : 'none'; });
      hapKonum();
    };
    const cubuk = (p, x0, y0, w, h) => {
      let x = x0;
      DIL.forEach(([k, a]) => {
        const ww = (p[k] / 100) * w, d = E.dil[k];
        R(d.r, x, y0, ww, h);
        const s = yuz(p[k]) + ' ' + a, fs = dar ? 12.5 : 11;
        const sig = s.length * fs * 0.6 + 8 < ww ? s : (yuz(p[k]).length * fs * 0.62 + 6 < ww ? yuz(p[k]) : '');
        T(d.t, x + ww / 2, y0 + h / 2 + fs * 0.36, sig);
        x += ww;
      });
    };
    const hapKonum = () => {
      if (!Lt) return;
      const akis = ton || f > 0.01;
      haplar.forEach((h, i) => {
        if (RM && !ton) { h.c.style.display = 'none'; return; }
        if (RM) { h.c.style.display = i < 5 ? '' : 'none'; const fr = (i + 0.5) / 5 * Lt; const q = refYol.getPointAtLength(fr); h.c.setAttribute('cx', q.x); h.c.setAttribute('cy', q.y); return; }
        let s;
        if (akis) { s = ((h.o + t * (f < 0.999 ? 0.32 : 0.18)) % 1) * Lt; h.c.style.display = ''; }
        else { if (i >= 5) { h.c.style.display = 'none'; return; } h.c.style.display = ''; s = ((i / 5 + t * 0.12) % 1) * L1; }
        const q = refYol.getPointAtLength(s); h.c.setAttribute('cx', q.x.toFixed(1)); h.c.setAttribute('cy', q.y.toFixed(1));
      });
    };
    const boya = () => { svg.querySelectorAll('[data-b]').forEach((g) => g.classList.toggle('on', g.dataset.b === sec)); };
    const tonB = el.querySelector('[data-ton]');
    tonB.addEventListener('click', () => {
      ton = !ton; tonB.setAttribute('aria-pressed', String(ton)); sec = null; boya();
      capYaz(el, ton ? CAP.ton : CAP.ilk);
      if (RM) { f = ton ? 1 : 0; guncelle(); }
    });
    el.querySelector('[data-sif]').addEventListener('click', () => { ton = false; f = 0; sec = null; tonB.setAttribute('aria-pressed', 'false'); capYaz(el, CAP.ilk); boya(); guncelle(); });
    const durRO = darIzle(el, (d) => { dar = d; ciz(); });
    const dur = RM ? () => {} : ticker(el, (dt) => {
      t += dt;
      const hedef = ton ? 1 : 0;
      if (f !== hedef) { f = clamp(f + (hedef > f ? dt : -dt) / 1.2, 0, 1); guncelle(); } else hapKonum();
    });
    return () => { dur(); durRO(); };
  };

  /* =====================================================================
     3 · f33_basinc — sistemik ve pulmoner basınç profili, akım dağılımı, hipoksi (K1 s. 145–146)
     ===================================================================== */
  VIZ.f33_basinc = (el) => {
    const CAP = {
      iki: '<b>İki dolaşım yan yana.</b> Sistemik arter basıncı 140/80 mmHg (ortalama 100), pulmoner 25/8 mmHg (ortalama 15). Doku gereksinimini artırın ya da hipoksi uygulayın. [[K1 s. 146]]',
      sis: '<b>Sistemik.</b> Kalın, elastik ve istirahatte belirgin daralmış arterler; kalın kaslı duvarlı, dar lümenli arterioller yüksek direnç (SVR ≈ 1600 dyn·s·cm⁻⁵) yaratır. Bu yüzden basınç arteriollerde düşer ve kapiller akımı süreklidir. Ven basıncı ≈ 2 mmHg. [[K1 s. 146]]',
      pul: '<b>Pulmoner.</b> İnce, distansibl, istirahatte tonussuz arterler ve geniş lümenli arterioller düşük direnç (PVR ≈ 160 dyn·s·cm⁻⁵) yaratır; nabız kapillerlere kadar sürer. Ven basıncı ≈ 5 mmHg. [[K1 s. 146]]',
      kas: '<b>Basıncı sabit, akımı değişken.</b> LV arteriyel basıncı korur; kas arteriolünü genişletince basınç aynı kalır, akım o dokuya kayar. Akımın dağılımını yerel doku metabolizması ya da sempatik çıkış artışı gibi kalıplaşmış yanıtlar belirler. [[K1 s. 145]]',
      hip: '<b>Hipoksi.</b> Sistemik arterioller genişler, pulmoner arterioller daralır: iki dolaşım hipoksiye zıt yanıt verir. [[K1 s. 146]]',
    };
    // konum t: 0–4 (her düzey bir birim); ortalama basınç ve nabız genliği (temsilî biçim, uç değerler kitaptan)
    const ara = (pts, t) => { for (let i = 1; i < pts.length; i++) if (t <= pts[i][0]) { const [a, va] = pts[i - 1], [b, vb] = pts[i]; return lerp(va, vb, (t - a) / (b - a)); } return pts[pts.length - 1][1]; };
    const SIS = { m: [[0, 100], [0.9, 96], [1.1, 92], [1.9, 32], [2.5, 22], [3.1, 9], [3.5, 2], [4, 2]], a: [[0, 1], [1.05, 1], [1.95, 0], [4, 0]], up: 40, dn: 20 };
    const PUL = { m: [[0, 15], [1, 14], [2, 11], [3, 7], [3.5, 5], [4, 5]], a: [[0, 1], [1, 1], [2, 0.5], [2.5, 0.32], [3, 0.15], [3.5, 0], [4, 0]], up: 10, dn: 7 };
    let gor = 'iki', kas = false, hip = false, son = null, fK = 0, fH = 0, dar = false, faz = 0, E = {}, svg;
    el.innerHTML = `<div class="f33-ust f33-ust-b">${segHtml('Görünüm', 'g', [['iki', 'İkisi'], ['sis', 'Sistemik'], ['pul', 'Pulmoner']], 'iki')}
      <div class="btn-row"><button type="button" class="btn" data-kas aria-pressed="false">Kasın gereksinimi artar</button><button type="button" class="btn" data-hip aria-pressed="false">Hipoksi</button><button type="button" class="btn ghost" data-sif>Sıfırla</button></div></div>
      <div class="f33-svgk"></div>
      <div class="f33-kvs"><span class="tag crit">SVR ≈ 1600 dyn·s·cm⁻⁵</span><span class="tag clin">PVR ≈ 160 dyn·s·cm⁻⁵</span><span class="tag">LV: basınç üreteci · RV: akım üreteci</span></div>`;
    const kut = el.querySelector('.f33-svgk');
    let G;
    const ciz = () => {
      kut.innerHTML = ''; E = {};
      G = dar ? { x0: 46, x1: 350, yt: 22, yb: 212, vb: '0 0 360 548', px: 10, py: 262, pw: 340 } : { x0: 44, x1: 346, yt: 18, yb: 222, vb: '0 0 560 290', px: 372, py: 6, pw: 182 };
      svg = mk('svg', { class: 'f33-svg' + (dar ? ' f33-dar' : ''), viewBox: G.vb, role: 'img', 'aria-label': 'Basınç–konum grafiği: sistemik basınç arteriollerde düşer, pulmoner basınç düşük ve kapillerlerde de nabızlı; yanda dokulara akım dağılımı' }, kut);
      okIsareti(svg);
      const X = (t) => G.x0 + (t / 4) * (G.x1 - G.x0), Yp = (p) => G.yb - (p / 150) * (G.yb - G.yt);
      G.X = X; G.Y = Yp;
      E.hipB = mk('rect', { x: X(1), y: G.yt, width: X(2) - X(1), height: G.yb - G.yt, class: 'f33-hipb' }, svg);
      E.hipT = tx(svg, X(1.5), G.yt + 54, 'hipoksi', 'f33-ts f33-warn', 'middle');
      [0, 25, 50, 100, 150].forEach((v) => { mk('line', { x1: G.x0, x2: G.x1, y1: Yp(v), y2: Yp(v), class: 'f33-izgara' }, svg); tx(svg, G.x0 - 6, Yp(v) + 4, String(v), 'f33-tk', 'end'); });
      for (let i = 1; i < 4; i++) mk('line', { x1: X(i), x2: X(i), y1: G.yt, y2: G.yb, class: 'f33-izgara f33-izgara-k' }, svg);
      tx(svg, G.x0 - 6, G.yt - 6 < 10 ? 11 : G.yt - 6, 'mmHg', 'f33-tk', 'start');
      ['Arterler', 'Arterioller', 'Kapillerler', 'Venler'].forEach((s, i) => tx(svg, X(i + 0.5), G.yb + 16 + (dar && i % 2 ? 15 : 0), s, 'f33-t f33-xt', 'middle'));
      const gS = mk('g', { 'data-c': 'sis' }, svg), gP = mk('g', { 'data-c': 'pul' }, svg);
      E.gS = gS; E.gP = gP;
      const bant = (D, g, cls) => {
        const N = 80, up = [], dn = [];
        for (let i = 0; i <= N; i++) { const t = (i / N) * 4, m = ara(D.m, t), a = ara(D.a, t); up.push([X(t), Yp(m + D.up * a)]); dn.unshift([X(t), Yp(m - D.dn * a)]); }
        mk('path', { d: yol(up.concat(dn)) + 'Z', class: 'f33-bant ' + cls }, g);
        const ort = []; for (let i = 0; i <= N; i++) { const t = (i / N) * 4; ort.push([X(t), Yp(ara(D.m, t))]); }
        mk('path', { d: yol(ort), class: 'f33-ort ' + cls }, g);
        return mk('path', { class: 'f33-dalga ' + cls }, g);
      };
      E.dS = bant(SIS, gS, 'f33-c-sis'); E.dP = bant(PUL, gP, 'f33-c-pul');
      const lx = G.x1 - 4;
      tx(gS, lx, G.yt + 14, 'Sistemik · ort. 100 → 2 mmHg', 'f33-t f33-lbl-s', 'end');
      tx(gP, lx, G.yt + 30, 'Pulmoner · ort. 15 → 5 mmHg', 'f33-t f33-lbl-p', 'end');
      if (RM) { E.dS.style.display = E.dP.style.display = 'none'; }
      // akım paneli
      const { px, py, pw } = G, g = mk('g', { class: 'f33-panel' }, svg);
      if (!dar) mk('line', { x1: px - 8, x2: px - 8, y1: 4, y2: 282, class: 'f33-izgara' }, svg);
      tx(g, px, py + 14, 'Sistemik yatak', 'f33-t f33-c-sis-t');
      tx(g, px, py + 30, 'arter basıncı 100 mmHg, sabit', 'f33-ts');
      mk('line', { x1: px + 4, x2: px + 4, y1: py + 40, y2: py + 158, class: 'f33-arter' }, g);
      E.dal = ['Kas', 'Bağırsak', 'Beyin'].map((ad, i) => {
        const y = py + 60 + i * 40;
        tx(g, px + 14, y - 11, ad, 'f33-ts f33-ts-k');
        mk('line', { x1: px + 4, x2: px + 14, y1: y, y2: y, class: 'f33-arter' }, g);
        return { y, tube: mk('rect', { class: 'f33-tup', rx: 3 }, g), bar: mk('rect', { class: 'f33-akim', rx: 3 }, g) };
      });
      E.vdil = tx(g, px, py + 186, '', 'f33-ts f33-warn');
      tx(g, px, py + 210, 'Pulmoner yatak', 'f33-t f33-c-pul-t');
      E.pTup = mk('rect', { class: 'f33-tup f33-tup-p', rx: 6 }, g);
      E.pOk = mk('g', {}, g);
      E.vkon = tx(g, px, py + 276, '', 'f33-ts f33-warn');
      ayarla(); dalga();
    };
    const ayarla = () => {
      const { px, py, pw } = G;
      const kF = ease(fK), hF = ease(fH);
      const x1 = px + 14, tw = dar ? 70 : 46, bx = x1 + tw + 8, bmax = px + pw - bx;
      E.dal.forEach((d, i) => {
        const r = 5 * (i === 0 ? lerp(1, 1.5, kF) : 1) * lerp(1, 1.3, hF);
        const q = (i === 0 ? lerp(1, 2, kF) : 1) * lerp(1, 1.4, hF);
        R2(d.tube, x1, d.y - r, tw, 2 * r);
        R2(d.bar, bx, d.y - 4, Math.min(bmax, (dar ? 70 : 34) * q), 8);
      });
      const pyT = py + 228, ph = lerp(22, 10, hF), pwid = pw - 10;
      R2(E.pTup, px, pyT - ph / 2 + 11, pwid, ph);
      E.pOk.innerHTML = '';
      if (fH > 0.5) {
        [0.3, 0.7].forEach((fr) => {
          const x = px + pwid * fr;
          mk('path', { d: `M${x} ${pyT - 10} V${pyT + 11 - ph / 2 - 2}`, class: 'f33-okc', 'marker-end': 'url(#f33-ok-i)' }, E.pOk);
          mk('path', { d: `M${x} ${pyT + 32} V${pyT + 11 + ph / 2 + 2}`, class: 'f33-okc', 'marker-end': 'url(#f33-ok-i)' }, E.pOk);
        });
      }
      E.vdil.textContent = fH > 0.5 ? 'Vazodilatasyon (arterioller genişler)' : '';
      E.vkon.textContent = fH > 0.5 ? 'Vazokonstriksiyon (daralır)' : '';
      E.hipB.style.display = E.hipT.style.display = fH > 0.5 ? '' : 'none';
      E.gS.style.opacity = gor === 'pul' ? 0.25 : 1; E.gP.style.opacity = gor === 'sis' ? 0.25 : 1;
    };
    const R2 = (e, x, y, w, h) => { e.setAttribute('x', x.toFixed(1)); e.setAttribute('y', y.toFixed(1)); e.setAttribute('width', Math.max(0, w).toFixed(1)); e.setAttribute('height', Math.max(0, h).toFixed(1)); };
    const dalga = () => {
      if (RM) return;
      [ [SIS, E.dS], [PUL, E.dP] ].forEach(([D, p]) => {
        const pts = [];
        for (let i = 0; i <= 90; i++) {
          const t = (i / 90) * 4, m = ara(D.m, t), a = ara(D.a, t), s = Math.sin(2 * Math.PI * (faz - t * 0.18));
          pts.push([G.X(t), G.Y(m + a * (s > 0 ? D.up * s : D.dn * s))]);
        }
        p.setAttribute('d', yol(pts));
      });
    };
    const capSec = () => capYaz(el, son ? CAP[son] : CAP[gor]);
    el.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', () => { gor = b.dataset.g; basSec(el, 'g', gor); son = null; capSec(); ayarla(); }));
    const kasB = el.querySelector('[data-kas]'), hipB = el.querySelector('[data-hip]');
    kasB.addEventListener('click', () => { kas = !kas; kasB.setAttribute('aria-pressed', String(kas)); son = kas ? 'kas' : (hip ? 'hip' : null); capSec(); if (RM) { fK = kas ? 1 : 0; ayarla(); } });
    hipB.addEventListener('click', () => { hip = !hip; hipB.setAttribute('aria-pressed', String(hip)); son = hip ? 'hip' : (kas ? 'kas' : null); capSec(); if (RM) { fH = hip ? 1 : 0; ayarla(); } });
    el.querySelector('[data-sif]').addEventListener('click', () => {
      kas = hip = false; fK = fH = 0; gor = 'iki'; son = null; basSec(el, 'g', 'iki');
      kasB.setAttribute('aria-pressed', 'false'); hipB.setAttribute('aria-pressed', 'false'); capSec(); ayarla();
    });
    const durRO = darIzle(el, (d) => { dar = d; ciz(); });
    const dur = RM ? () => {} : ticker(el, (dt) => {
      faz += dt; // 1 Hz (60/dk)
      let deg = false;
      const hk = kas ? 1 : 0, hh = hip ? 1 : 0;
      if (fK !== hk) { fK = clamp(fK + (hk > fK ? dt : -dt) / 0.8, 0, 1); deg = true; }
      if (fH !== hh) { fH = clamp(fH + (hh > fH ? dt : -dt) / 0.8, 0, 1); deg = true; }
      if (deg) ayarla();
      dalga();
    });
    return () => { dur(); durRO(); };
  };

  /* =====================================================================
     4 · f33_hiz — toplam kesit alanı ve ortalama hız, V = Q̇/A (K1 s. 146–147)
     ===================================================================== */
  VIZ.f33_hiz = (el) => {
    const AD = ['Aort', 'Arterler', 'Arterioller', 'Kapillerler', 'Venüller', 'Venler', 'Vena kavalar'];
    const KIS = ['Aort', 'Arter', 'Arteriol', 'Kapiller', 'Venül', 'Ven', 'VK'];
    const A = [4, 20, 400, 4000, 2500, 80, 7]; // aort, kapiller, vena kava kitaptan; arada temsilî
    const TEK = [26, 13, 5, 2, 4, 11, 19], SAY = [1, 7, 40, 260, 70, 7, 2], RK = [24, 7, 3, 1.3, 2.3, 6, 13];
    let i = 0, Q = 80, dar = false, svg, E = {}, G, parc = [];
    const V = (k) => (k === 6 && Q === 80 ? 12 : Q / A[k]); // Q̇ = 80 iken kitabın 12 cm/s değeri (80/7 ≈ 11,4)
    const Vh = (k) => Q / A[k];
    const capMetin = () => {
      const q = sayi(Q), v = sayi(Vh(i));
      const C = [
        `<b>Aort.</b> Kesit 4 cm², ortalama hız ${sayi(Q / 4)} cm/s: <span class="f33-q">Q̇</span> = ${sayi(Q / 4)} × 4 = ${q} mL/s. Damar düzeyini değiştirin, kanın nerede yavaşladığını izleyin. [[K1 s. 146]]`,
        '<b>Arterler.</b> Aort dallanır: her damar küçülür ama damar sayısı artar, toplam kesit büyür; hız düşmeye başlar. [[K1 s. 146]]',
        '<b>Arterioller.</b> Dallanma sürer, toplam kesit çarpıcı biçimde artar; akım değişmediği için hız belirgin azalır. [[K1 s. 146]]',
        `<b>Kapillerler.</b> Toplam kesit ≈ 4000 cm²: V = ${q}/4000 = ${sayi(Q / 4000)} cm/s = ${sayi(Q / 400)} mm/s. Kapiller–doku değişimine yetecek kadar yavaş. [[K1 s. 146–147]]`,
        '<b>Venüller.</b> Kapillerler birleşir: tek damarın kesiti büyür, toplam kesit küçülmeye başlar; kan yeniden hızlanır. [[K1 s. 147]]',
        '<b>Venler.</b> Birleşme sürer, toplam kesit azalır, hız artar. Alt vücudun venleri inferior, üst vücudunkiler superior vena kavada birleşir. [[K1 s. 147]]',
        `<b>Vena kavalar.</b> Toplam kesit 7 cm², hız ${Q === 80 ? '12' : sayi(Q / 7)} cm/s. Sağ atriyuma giren akım, interstisyuma süzülüp lenfatiklerle taşınan az miktar dışında kalp debisine eşittir. [[K1 s. 147]]`,
      ];
      let s = C[i];
      if (Q !== 80) s += ` <span class="f33-q">Q̇</span> = ${q} mL/s: bu düzeyde V = ${q}/${sayi(A[i])} = ${v} cm/s. [[K1 s. 146]]`;
      return s;
    };
    el.innerHTML = `<div class="f33-ust f33-ust-b">${segHtml('Damar düzeyi', 'd', AD.map((a, k) => [String(k), a]), '0', 'f33-seg')}
        <div class="btn-row"><button type="button" class="btn ghost" data-adim="-1">← Önceki</button><button type="button" class="btn ghost" data-adim="1">Sonraki →</button></div></div>
      <div class="f33-svgk"></div>
      <div class="f33-alt">
        <label class="f33-rng"><span><span>Kalp debisi (<span class="f33-q">Q̇</span>)</span> <b data-qo>80 mL/s</b></span><input type="range" min="40" max="160" step="10" value="80" aria-label="Akım" data-q></label>
        <p class="f33-qnot">Kalp hızı 60/dk'da atım hacmi = <span class="f33-q">Q̇</span> × 1 s = <b data-sv>80 mL</b></p>
        <dl class="f33-oku"><div><dt>Akım (<span class="f33-q">Q̇</span>)</dt><dd data-r="q"></dd></div><div><dt>Toplam kesit (A)</dt><dd data-r="a"></dd></div><div><dt>Ortalama hız (V)</dt><dd data-r="v"></dd></div></dl>
      </div>`;
    const kut = el.querySelector('.f33-svgk');
    const vmax = () => (Q / 4 > 20 ? 40 : 20);
    const ciz = () => {
      kut.innerHTML = ''; E = {};
      G = dar ? { x0: 44, x1: 316, yt: 46, yb: 186, vb: '0 0 360 470', cy: 250, sy: 300, sh: 130, fs: 1 } : { x0: 58, x1: 500, yt: 28, yb: 182, vb: '0 0 560 372', cy: 236, sy: 270, sh: 84 };
      svg = mk('svg', { class: 'f33-svg' + (dar ? ' f33-dar' : ''), viewBox: G.vb, role: 'img', 'aria-label': 'Toplam kesit alanı (logaritmik, düz çizgi) ve ortalama hız (kesikli) aorttan vena kavalara; kapillerde kesit en büyük, hız en düşük' }, kut);
      const cw = (G.x1 - G.x0) / 7, CX = (k) => G.x0 + (k + 0.5) * cw;
      G.CX = CX; G.cw = cw;
      const YA = (a) => G.yb - (Math.log10(a) / 4) * (G.yb - G.yt);
      G.YA = YA;
      E.sec = mk('rect', { y: G.yt, height: G.yb - G.yt, width: cw, class: 'f33-sec' }, svg);
      [1, 10, 100, 1000, 10000].forEach((a) => { mk('line', { x1: G.x0, x2: G.x1, y1: YA(a), y2: YA(a), class: 'f33-izgara' }, svg); tx(svg, G.x0 - 5, YA(a) + 4, String(a), 'f33-tk', 'end'); });
      E.sagEk = mk('g', {}, svg);
      tx(svg, G.x0 - 5, G.yt - (dar ? 26 : 12), 'kesit cm² (log, düz)', 'f33-ts', 'start');
      tx(svg, G.x1 + 5, G.yt - 12, dar ? 'hız cm/s (kesikli)' : 'hız cm/s (kesikli)', 'f33-ts f33-acc', 'end');
      KIS.forEach((s, k) => tx(svg, CX(k), G.yb + 15 + (dar && k % 2 ? 15 : 0), dar ? s : AD[k], 'f33-t f33-xt', 'middle'));
      if (!dar) svg.querySelectorAll('.f33-xt').forEach((t, k) => { if (k % 2) t.setAttribute('y', G.yb + 29); });
      mk('path', { d: yol(A.map((a, k) => [CX(k), YA(a)])), class: 'f33-alan' }, svg);
      E.hiz = mk('path', { class: 'f33-hizc' }, svg);
      E.ptA = A.map((a, k) => mk('circle', { cx: CX(k), cy: YA(a), r: [0, 3, 6].includes(k) ? 5 : 3, class: 'f33-pa' + ([0, 3, 6].includes(k) ? '' : ' f33-pk') }, svg));
      E.ptV = A.map((a, k) => mk('circle', { cx: CX(k), r: [0, 3, 6].includes(k) ? 5 : 3, class: 'f33-pv' + ([0, 3, 6].includes(k) ? '' : ' f33-pk') }, svg));
      E.lA = [tx(svg, CX(0) + 9, YA(4) + 14, '4 cm²', 'f33-et'), tx(svg, CX(3), YA(4000) - 9, '4000 cm²', 'f33-et', 'middle'), tx(svg, CX(6) - 9, YA(7) + 16, '7 cm²', 'f33-et', 'end')];
      E.lV = [tx(svg, CX(0) + 9, 0, '', 'f33-et f33-acc'), tx(svg, CX(3) + 8, 0, '', 'f33-et f33-acc'), tx(svg, CX(6) - 9, 0, '', 'f33-et f33-acc', 'end')];
      // dokunma alanları
      for (let k = 0; k < 7; k++) { const r = mk('rect', { x: G.x0 + k * cw, y: G.yt, width: cw, height: G.yb - G.yt + 32, class: 'f33-dok' }, svg); r.addEventListener('click', () => sec(k)); }
      // parçacık kanalı
      const H = (k) => (dar ? 5 : 4) + (dar ? 15 : 14) * Math.log10(A[k]) / 3.6;
      G.H = H;
      const ust = [[G.x0, G.cy - H(0)]], alt = [[G.x0, G.cy + H(0)]];
      for (let k = 0; k < 7; k++) { ust.push([CX(k), G.cy - H(k)]); alt.push([CX(k), G.cy + H(k)]); }
      ust.push([G.x1, G.cy - H(6)]); alt.push([G.x1, G.cy + H(6)]);
      mk('path', { d: yol(ust.concat(alt.reverse())) + 'Z', class: 'f33-kanal' }, svg);
      E.kSec = mk('rect', { y: G.cy - 26, height: 52, width: cw, class: 'f33-sec f33-sec-k' }, svg);
      E.gP = mk('g', {}, svg);
      if (dar) tx(svg, G.x1, G.cy + 36, 'kan akışı →', 'f33-ts', 'end'); else tx(svg, 6, G.cy + 4, 'akış →', 'f33-ts', 'start');
      // kesit şeridi
      E.serit = mk('g', {}, svg);
      E.okH = mk('g', {}, svg);
      parcKur(); guncelle();
    };
    /* kanal boyunca hız (log ara değer) ve görsel hız (log sıkıştırılmış) */
    const Vx = (x) => {
      const k = (x - G.x0) / G.cw - 0.5;
      if (k <= 0) return Vh(0); if (k >= 6) return Vh(6);
      const a = Math.floor(k), f = k - a;
      return Math.pow(10, lerp(Math.log10(Vh(a)), Math.log10(Vh(a + 1)), f));
    };
    const pxs = (v) => 3 + 62 * Math.pow(clamp((Math.log10(v) + 1.8) / 3.4, 0, 1), 1.6);
    const parcKur = () => {
      E.gP.innerHTML = ''; parc = [];
      if (RM) return;
      // kararlı dağılım: eşit zaman aralıklı yerleşim
      const N = 34, xs = [], ts = [0];
      for (let x = G.x0; x <= G.x1; x += 2) { xs.push(x); if (xs.length > 1) ts.push(ts[ts.length - 1] + 2 / pxs(Vx(x))); }
      const Tt = ts[ts.length - 1];
      let s = 11;
      const r = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
      for (let n = 0; n < N; n++) {
        const tt = (n / N) * Tt; let j = 0; while (j < ts.length - 1 && ts[j] < tt) j++;
        parc.push({ x: xs[j], o: r() * 1.6 - 0.8, e: mk('ellipse', { rx: dar ? 3.6 : 3.4, ry: dar ? 2.4 : 2.2, class: 'f33-kan' }, E.gP) });
      }
    };
    const Hx = (x) => { const k = clamp((x - G.x0) / G.cw - 0.5, 0, 6), a = Math.min(5, Math.floor(k)), f = k - a; return lerp(G.H(a), G.H(a + 1), f); };
    const parcYer = (dt) => {
      parc.forEach((p) => {
        p.x += pxs(Vx(p.x)) * dt;
        if (p.x > G.x1) p.x = G.x0 + (p.x - G.x1);
        p.e.setAttribute('cx', p.x.toFixed(1)); p.e.setAttribute('cy', (G.cy + p.o * Hx(p.x)).toFixed(1));
      });
    };
    const serit = () => {
      const g = E.serit; g.innerHTML = '';
      const y0 = G.sy, h = G.sh, lw = dar ? 104 : 118;
      mk('rect', { x: 8, y: y0, width: lw, height: h, rx: 10, class: 'f33-kutu' }, g);
      mk('rect', { x: 8 + lw + 8, y: y0, width: (dar ? 352 : 552) - lw - 16, height: h, rx: 10, class: 'f33-kutu' }, g);
      tx(g, 8 + lw / 2, y0 + 16, 'tek damar', 'f33-ts', 'middle');
      const sc = dar ? 1.2 : 1, cxT = 8 + lw / 2, cyT = y0 + h / 2 + 8;
      mk('circle', { cx: cxT, cy: cyT, r: TEK[i] * sc, class: 'f33-dmr' }, g);
      const x0 = 8 + lw + 16, x1 = (dar ? 352 : 552) - 16, ya = y0 + 26, yb = y0 + h - 10;
      tx(g, x0 - 4, y0 + 16, dar ? 'damar sayısı (şematik)' : `${AD[i]}: damar sayısı (şematik)`, 'f33-ts', 'start');
      const n = SAY[i], rr = RK[i] * sc;
      if (n <= 7) {
        for (let k = 0; k < n; k++) {
          const cx = n === 1 ? (x0 + x1) / 2 : lerp(x0 + rr + 6, x1 - rr - 6, k / (n - 1)), cy = (ya + yb) / 2;
          mk('circle', { cx, cy, r: rr, class: 'f33-dmr' }, g);
          if (i === 6) tx(g, cx, cy + 4.5, k ? 'SVK' : 'İVK', 'f33-t', 'middle');
        }
      } else {
        let s = 5 + i; const r = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
        const cols = Math.ceil(Math.sqrt(n * (x1 - x0) / (yb - ya))), rows = Math.ceil(n / cols);
        for (let k = 0; k < n; k++) {
          const c = k % cols, q = Math.floor(k / cols);
          const cx = x0 + (c + 0.5 + (r() - 0.5) * 0.5) * (x1 - x0) / cols, cy = ya + (q + 0.5 + (r() - 0.5) * 0.5) * (yb - ya) / rows;
          mk('circle', { cx, cy, r: rr, class: 'f33-dmr' + (i === 3 ? ' f33-dmr-k' : '') }, g);
        }
      }
      const m = i === 0 ? 'tek damar en büyük · toplam kesit en küçük düzeylerden' : i < 3 ? 'tek damar: küçülür · toplam kesit: büyür' : i === 3 ? 'en küçük damar · en büyük toplam kesit' : 'tek damar: büyür · toplam kesit: küçülür';
      tx(g, dar ? 180 : 280, y0 + h + 18, m, 'f33-t f33-acc-t', 'middle');
    };
    const guncelle = () => {
      const vm = vmax(), YV = (v) => G.yb - (Math.min(v, vm) / vm) * (G.yb - G.yt);
      E.sagEk.innerHTML = '';
      for (let v = 0; v <= vm; v += vm / 4) tx(E.sagEk, G.x1 + 5, YV(v) + 4, String(v), 'f33-tk f33-acc', 'start');
      E.hiz.setAttribute('d', yol(A.map((a, k) => [G.CX(k), YV(Vh(k))])));
      E.ptV.forEach((c, k) => c.setAttribute('cy', YV(Vh(k)).toFixed(1)));
      const vs = [V(0), V(3), V(6)];
      E.lV[0].textContent = sayi(vs[0]) + ' cm/s'; E.lV[0].setAttribute('y', YV(Vh(0)) + (YV(Vh(0)) < G.yt + 12 ? 14 : -8));
      E.lV[1].textContent = sayi(Q / 400) + ' mm/s'; E.lV[1].setAttribute('y', YV(Vh(3)) - 8);
      E.lV[2].textContent = sayi(vs[2]) + ' cm/s'; E.lV[2].setAttribute('y', YV(Vh(6)) - 8);
      const x = G.x0 + i * G.cw;
      E.sec.setAttribute('x', x); E.kSec.setAttribute('x', x);
      E.ptA.forEach((c, k) => c.classList.toggle('on', k === i)); E.ptV.forEach((c, k) => c.classList.toggle('on', k === i));
      svg.querySelectorAll('.f33-xt').forEach((t, k) => t.classList.toggle('on', k === i));
      // RM: durağan ok (log ölçekli hız)
      E.okH.innerHTML = '';
      if (RM) {
        okIsareti(E.okH);
        for (let k = 0; k < 7; k++) { const l = 6 + 0.7 * pxs(Vh(k)) * (dar ? 0.5 : 0.7); mk('path', { d: `M${G.CX(k) - l / 2} ${G.cy} H${G.CX(k) + l / 2}`, class: 'f33-okc f33-okc-k', 'marker-end': 'url(#f33-ok)' }, E.okH); }
      }
      serit();
      el.querySelector('[data-r="q"]').textContent = sayi(Q) + ' mL/s';
      el.querySelector('[data-r="a"]').textContent = (i === 3 ? '≈ ' : '') + sayi(A[i]) + ' cm²' + ([0, 3, 6].includes(i) ? '' : ' (temsilî)');
      el.querySelector('[data-r="v"]').textContent = i === 3 ? `${sayi(Q / 4000)} cm/s = ${sayi(Q / 400)} mm/s` : (i === 6 && Q === 80 ? '12 cm/s (80/7 ≈ 11,4)' : sayi(Vh(i)) + ' cm/s');
      el.querySelector('[data-qo]').textContent = Q + ' mL/s'; el.querySelector('[data-sv]').textContent = Q + ' mL';
      capYaz(el, capMetin());
    };
    const sec = (k) => { i = clamp(k, 0, 6); basSec(el, 'd', String(i)); guncelle(); };
    el.querySelectorAll('[data-d]').forEach((b) => b.addEventListener('click', () => sec(+b.dataset.d)));
    el.querySelectorAll('[data-adim]').forEach((b) => b.addEventListener('click', () => sec(i + +b.dataset.adim)));
    el.querySelector('[data-q]').addEventListener('input', (e) => { Q = +e.target.value; parcKur(); guncelle(); });
    const durRO = darIzle(el, (d) => { dar = d; ciz(); });
    const dur = RM ? () => {} : ticker(el, (dt) => parcYer(dt));
    return () => { dur(); durRO(); };
  };
})();
