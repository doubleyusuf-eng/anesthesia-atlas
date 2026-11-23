/* Bölüm 48 · Serebral kan akımı · bileşenler (tarif: docs/tasarim/fiz48.md; K1 s. 202–205).
   Kitaptan: %15 / 750 mL/dk, 50 mL/100 g/dk, otoregülasyon 50–150 mmHg, eşikler 50/40/30/20/10,
   5 s × 30 → bilinç kaybı, gri 70 / beyaz 20, PaCO₂ 3,5–8 kPa, PaO₂ < 8 kPa, Hct 0,3, ilaç yönleri, yöntemler.
   Temsilî: eğri eğimleri, kayma büyüklükleri, global oranlar, ok boyları (viz-foot'larda belirtildi). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 0) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const mk = (tag, a, p) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const capYaz = (el, h) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(h); };
  const segHtml = (ad, key, opts, cur, cls) => `<div class="seg ${cls || ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const rngHtml = (key, ad, min, max, step, v) => `<label class="f48-rng"><span class="f48-lbl">${ad} <b data-v="${key}"></b></span><input type="range" data-r="${key}" min="${min}" max="${max}" step="${step}" value="${v}" aria-label="${ad}"></label>`;
  const darIzle = (el, cb) => {
    let d = null;
    const f = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < 560; if (n !== d) { d = n; el.classList.toggle('f48-dar', n); cb(n); } };
    f();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const tx = (x, y, s, cls, anc, extra) => `<text class="${cls}" x="${x}" y="${y}"${anc ? ` text-anchor="${anc}"` : ''}${extra || ''}>${s}</text>`;
  /* grafik ölçeği */
  const plot = (W, H, pl, pr, pt, pb, xa, xb, ya, yb) => ({
    W, H, x0: pl, x1: W - pr, y0: H - pb, y1: pt,
    X: (v) => pl + ((v - xa) / (xb - xa)) * (W - pl - pr),
    Y: (v) => H - pb - ((v - ya) / (yb - ya)) * (H - pt - pb),
  });
  const eksen = (P, xt, yt, xl, yl, xf, yf) => {
    let s = `<line class="f48-eks" x1="${P.x0}" x2="${P.x1}" y1="${P.y0}" y2="${P.y0}"/><line class="f48-eks" x1="${P.x0}" x2="${P.x0}" y1="${P.y0}" y2="${P.y1}"/>`;
    xt.forEach((v) => { const x = P.X(v); s += `<line class="f48-eks" x1="${x}" x2="${x}" y1="${P.y0}" y2="${P.y0 + 4}"/>${tx(x, P.y0 + 16, xf ? xf(v) : fmt(v, v % 1 ? 1 : 0), 'f48-ts', 'middle')}`; });
    yt.forEach((v) => { const y = P.Y(v); s += `<line class="f48-izg" x1="${P.x0}" x2="${P.x1}" y1="${y}" y2="${y}"/>${tx(P.x0 - 5, y + 4, yf ? yf(v) : fmt(v), 'f48-ts', 'end')}`; });
    if (xl) s += tx((P.x0 + P.x1) / 2, P.H - 4, xl, 'f48-ts f48-eks-t', 'middle');
    if (yl) s += `<text class="f48-ts f48-eks-t" transform="translate(12 ${(P.y0 + P.y1) / 2}) rotate(-90)" text-anchor="middle">${yl}</text>`;
    return s;
  };
  const yolD = (P, f, a, b, n = 160) => { let d = ''; for (let i = 0; i <= n; i++) { const v = a + ((b - a) * i) / n; d += (i ? 'L' : 'M') + P.X(v).toFixed(1) + ' ' + P.Y(f(v)).toFixed(1); } return d; };
  const okUc = (id) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="f48-uc" d="M0 0L10 5L0 10z"/></marker>`;

  /* ortak arteriyol kesiti: yatay boru; lümen h (10 dar · 22 orta · 34 geniş); akış noktaları CBF ile orantılı */
  const arteriyol = (par, x, yc, len, h0) => {
    const g = mk('g', { class: 'f48-art' }, par);
    const wt = mk('rect', { class: 'f48-art-w', x, width: len, rx: 3 }, g);
    const wb = mk('rect', { class: 'f48-art-w', x, width: len, rx: 3 }, g);
    const lu = mk('rect', { class: 'f48-art-l', x, width: len }, g);
    const dg = mk('g', {}, g);
    const N = 26, D = [];
    for (let i = 0; i < N; i++) D.push({ u: (i * 0.618) % 1, f: ((i * 0.377) % 1) * 1.5 - 0.75, e: mk('circle', { class: 'f48-art-d', r: 2.6 }, dg) });
    let h = h0 || 22, hT = h, cbf = 50;
    const yer = () => {
      const wall = 7 + (34 - h) * 0.4;
      wt.setAttribute('y', yc - h / 2 - wall); wt.setAttribute('height', wall);
      wb.setAttribute('y', yc + h / 2); wb.setAttribute('height', wall);
      lu.setAttribute('y', yc - h / 2); lu.setAttribute('height', h);
      const n = clamp(Math.round((cbf / 50) * 10), 2, N);
      D.forEach((d, i) => { d.e.style.display = i < n ? '' : 'none'; d.e.setAttribute('cx', (x + 3 + d.u * (len - 6)).toFixed(1)); d.e.setAttribute('cy', (yc + d.f * Math.max(0, h / 2 - 3)).toFixed(1)); });
    };
    yer();
    return {
      g,
      set(hh, c) { hT = hh; cbf = c; if (RM) h = hh; yer(); },
      step(dt) { if (RM) return; h += (hT - h) * Math.min(1, dt * 6); const v = (40 * cbf) / 50 / len; D.forEach((d) => { d.u = (d.u + v * dt) % 1; }); yer(); },
    };
  };

  /* =====================================================================
     1 · f48_cpp — CPP = MAP − ICP; CBF = CPP ÷ CVR (K1 s. 202)
     ===================================================================== */
  VIZ.f48_cpp = (el) => {
    const CVR = [['d', 'Düşük', 0.8], ['n', 'Normal', 1.6], ['y', 'Yüksek', 2.4]];
    let map = 90, icp = 10, cvr = 'n', son = '';
    el.innerHTML = `<div class="f48-kont">${rngHtml('map', 'MAP', 40, 160, 5, map)}${rngHtml('icp', 'ICP', 0, 50, 1, icp)}
        <div><span class="f48-lbl">Direnç (CVR)</span>${segHtml('Direnç (CVR)', 'cvr', CVR.map((c) => [c[0], c[1]]), cvr)}</div></div>
      <div class="f48-g2 f48-cpp-g"><div class="f48-cpp-svg"></div>
        <div class="f48-cpp-sag"><div class="f48-denk"><div data-s="1"></div><div data-s="2"></div></div>
          <div class="f48-kose"><svg viewBox="0 0 60 60" class="f48-halka" role="img" aria-label="Kalp debisinin yüzde 15'i beyne"><circle cx="30" cy="30" r="22" class="f48-halka-z"/><circle cx="30" cy="30" r="22" class="f48-halka-d" stroke-dasharray="20.7 200" transform="rotate(-90 30 30)"/><text x="30" y="34" text-anchor="middle" class="f48-halka-t">%15</text></svg>
            <p>Erişkin CBF ≈ kalp debisinin <b>%15</b>'i ≈ <b>750 mL/dk</b><br>normal <b>50 mL/100 g/dk</b></p></div>
          <div class="legend"><span><i class="f48-lg-cpp"></i>CPP</span><span><i class="f48-lg-icp"></i>ICP'ye karşı kaybedilen</span></div></div></div>`;
    const kutu = el.querySelector('.f48-cpp-svg');
    let R = {};
    const ciz = (dar) => {
      const W = dar ? 360 : 420, H = dar ? 210 : 280, B = dar ? 180 : 250, S = dar ? 150 / 160 : 200 / 160;
      const b1 = dar ? 70 : 245, b2 = dar ? 210 : 335, bw = dar ? 80 : 60;
      let bas = '';
      if (!dar) {
        bas = `<ellipse class="f48-kafa" cx="100" cy="110" rx="82" ry="72"/><ellipse class="f48-beyin" cx="100" cy="108" rx="66" ry="56"/>
          <path class="f48-boyun" d="M78 178 L76 270 M122 178 L124 270"/>
          <path class="f48-arter" d="M100 272 L100 160 Q100 140 84 130"/>
          <rect class="f48-gst" x="92" y="74" width="16" height="64" rx="8"/><rect class="f48-gst-icp" data-g="icp" x="94" width="12" rx="6"/>
          ${tx(100, 68, 'ICP', 'f48-t f48-c-warn', 'middle')}
          <rect class="f48-gst" x="134" y="196" width="14" height="70" rx="7"/><rect class="f48-gst-map" data-g="map" x="136" width="10" rx="5"/>
          ${tx(156, 236, 'MAP', 'f48-t f48-c-v')}`;
      }
      kutu.innerHTML = `<svg class="f48-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="MAP, ICP ve CPP basınç çubukları">
        <defs><pattern id="f48-tar" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" class="f48-tar-z"/><path d="M0 0V7" class="f48-tar-c"/></pattern></defs>
        ${bas}<line class="f48-eks" x1="${b1 - 16}" x2="${b2 + bw + 16}" y1="${B}" y2="${B}"/>
        <rect class="f48-bar-map" data-b="map" x="${b1}" width="${bw}" rx="3"/>
        <rect class="f48-bar-cpp" data-b="cpp" x="${b2}" width="${bw}"/>
        <rect class="f48-bar-icp" data-b="icp" x="${b2}" width="${bw}"/>
        ${tx(b1 + bw / 2, 0, '', 'f48-t f48-c-v', 'middle', ' data-t="map"')}
        ${tx(b2 + bw / 2, 0, '', 'f48-t f48-c-warn', 'middle', ' data-t="icp"')}
        ${tx(b2 + bw / 2, 0, '', 'f48-t f48-c-okt', 'middle', ' data-t="cpp"')}
        ${tx(b1 + bw / 2, B + 18, 'MAP', 'f48-ts', 'middle')}${tx(b2 + bw / 2, B + 18, 'CPP + ICP', 'f48-ts', 'middle')}
      </svg>`;
      const q = (s) => kutu.querySelector(s);
      R = { B, S, mapB: q('[data-b=map]'), cppB: q('[data-b=cpp]'), icpB: q('[data-b=icp]'), tm: q('[data-t=map]'), ti: q('[data-t=icp]'), tc: q('[data-t=cpp]'), gi: q('[data-g=icp]'), gm: q('[data-g=map]') };
      guncelle();
    };
    const guncelle = () => {
      const k = CVR.find((c) => c[0] === cvr)[2];
      const cpp = Math.max(0, map - icp), cbf = Math.round(cpp / k), kayip = Math.min(icp, map);
      el.querySelector('[data-v=map]').textContent = map + ' mmHg';
      el.querySelector('[data-v=icp]').textContent = icp + ' mmHg';
      const { B, S } = R;
      if (R.mapB) {
        R.mapB.setAttribute('y', B - map * S); R.mapB.setAttribute('height', map * S);
        R.cppB.setAttribute('y', B - cpp * S); R.cppB.setAttribute('height', cpp * S);
        R.icpB.setAttribute('y', B - map * S); R.icpB.setAttribute('height', kayip * S);
        R.tm.setAttribute('y', B - map * S - 7); R.tm.textContent = map;
        R.ti.setAttribute('y', B - map * S - 7); R.ti.textContent = 'ICP ' + icp;
        const hc = cpp * S;
        R.tc.setAttribute('y', hc > 22 ? B - hc / 2 + 5 : B - 6); R.tc.textContent = hc > 22 ? 'CPP ' + cpp : '';
        if (R.gi) { const hi = (icp / 50) * 60; R.gi.setAttribute('y', 136 - hi); R.gi.setAttribute('height', hi); }
        if (R.gm) { const hm = (map / 160) * 66; R.gm.setAttribute('y', 264 - hm); R.gm.setAttribute('height', hm); }
      }
      const cc = cbf < 48 ? 'f48-c-crit' : cbf > 52 ? 'f48-c-warnh' : 'f48-c-okh';
      el.querySelector('[data-s="1"]').innerHTML = `<span>CPP = MAP − ICP</span> = ${map} − ${icp} = <b class="f48-c-okh">${cpp}</b> mmHg`;
      el.querySelector('[data-s="2"]').innerHTML = `<span>CBF = CPP ÷ CVR</span> = ${cpp} ÷ ${fmt(k, 1)} ≈ <b class="${cc}">${cbf}</b> mL/100 g/dk`;
      if (son === 'cvr' && cvr !== 'n') {
        const d = cvr === 'd';
        capYaz(el, `<b>CVR ${d ? 'düşük' : 'yüksek'}.</b> Aynı CPP'de direnç ${d ? 'azalınca' : 'artınca'} akım ${d ? 'artar' : 'azalır'}: CPP = CBF × CVR. [[K1 s. 202]]`);
      } else if (icp >= 25) {
        capYaz(el, `<b>ICP ${icp} mmHg.</b> ICP yükseldikçe aynı MAP'te CPP düşer: CPP = MAP − ICP. [[K1 s. 202]]`);
      } else {
        capYaz(el, `<b>MAP ${map}, ICP ${icp} mmHg.</b> CPP = ${map} − ${icp} = ${cpp} mmHg. MAP'i, ICP'yi ya da direnci değiştirin. [[K1 s. 202]]`);
      }
    };
    el.querySelector('[data-r=map]').addEventListener('input', (e) => { map = +e.target.value; son = 'map'; guncelle(); });
    el.querySelector('[data-r=icp]').addEventListener('input', (e) => { icp = +e.target.value; son = 'icp'; guncelle(); });
    el.querySelectorAll('[data-cvr]').forEach((b) => b.addEventListener('click', () => { cvr = b.dataset.cvr; son = 'cvr'; basSec(el, 'cvr', cvr); guncelle(); }));
    const g = el.querySelector('.f48-cpp-g');
    const dt = darIzle(el, (n) => { g.classList.toggle('f48-tek', n); ciz(n); });
    return () => dt();
  };

  /* =====================================================================
     2 · f48_oto — otoregülasyon eğrisi + arteriyol (K1 s. 202)
     ===================================================================== */
  VIZ.f48_oto = (el) => {
    const GR = { nt: ['Normotansif', 50, 150, 'normotansif', 'Normotansif'], ht: ['Kronik hipertansiyon', 80, 180, 'kronik hipertansiyon', 'Kronik HT'], yd: ['Yenidoğan', 30, 90, 'yenidoğan', 'Yenidoğan'] };
    let gr = 'nt', cpp = 80, tara = false, grCap = '';
    const smin = (a, b, k) => -k * Math.log(Math.exp(-a / k) + Math.exp(-b / k));
    const cbfF = (c, g) => { const [, L, U] = GR[g]; let v = smin((50 * c) / L, 50, 1.6); v = -smin(-v, -(50 * c) / U, 1.6); return clamp(v, 0, 100); };
    el.innerHTML = `<div class="f48-kont"><div><span class="f48-lbl">Hasta grubu</span>${segHtml('Hasta grubu', 'gr', Object.keys(GR).map((k) => [k, GR[k][0]]), gr)}</div>
        ${rngHtml('cpp', 'CPP', 0, 200, 5, cpp)}
        <div class="btn-row"><button type="button" class="btn ghost" data-a="tara" aria-pressed="false">▶ Basıncı tara</button></div></div>
      <div class="f48-g2 f48-oto-g"><div class="f48-oto-svg"></div><div class="f48-oto-art"></div></div>`;
    const kG = el.querySelector('.f48-oto-svg'), kA = el.querySelector('.f48-oto-art'), btn = el.querySelector('[data-a=tara]'), rg = el.querySelector('[data-r=cpp]');
    let R = {}, art = null, dar = false;
    const ciz = () => {
      const P = dar ? plot(360, 240, 44, 12, 26, 38, 0, 200, 0, 100) : plot(440, 280, 48, 14, 28, 40, 0, 200, 0, 100);
      const [, L, U] = GR[gr];
      const diger = Object.keys(GR).filter((k) => k !== gr).map((k) => `<path class="f48-soluk" d="${yolD(P, (c) => cbfF(c, k), 0, 200)}"/>`).join('');
      const etk = Object.keys(GR).map((k) => { const y = P.Y(cbfF(200, k)); return { k, y }; }).sort((a, b) => a.y - b.y);
      let lastY = -99; const etkS = etk.map((o) => { let y = Math.max(o.y - 6, lastY + 14, P.y1 - 8); lastY = y; return tx(P.x1, y, GR[o.k][4], o.k === gr ? 'f48-ts f48-halo f48-c-vt' : 'f48-ts f48-halo f48-soluk-t', 'end'); }).join('');
      kG.innerHTML = `<svg class="f48-svg" viewBox="0 0 ${P.W} ${P.H}" role="img" aria-label="Otoregülasyon eğrisi: CPP'ye karşı CBF">
        <rect class="f48-bant-crit" x="${P.x0}" y="${P.y1}" width="${P.X(L) - P.x0}" height="${P.y0 - P.y1}"/>
        <rect class="f48-bant-ok" x="${P.X(L)}" y="${P.y1}" width="${P.X(U) - P.X(L)}" height="${P.y0 - P.y1}"/>
        <rect class="f48-bant-warn" x="${P.X(U)}" y="${P.y1}" width="${P.x1 - P.X(U)}" height="${P.y0 - P.y1}"/>
        ${eksen(P, [0, 50, 100, 150, 200], [0, 25, 50, 75, 100], 'CPP (mmHg)', 'CBF (mL/100 g/dk)')}
        ${tx((P.X(L) + P.X(U)) / 2, P.Y(92), dar ? 'Otoreg. aralığı' : 'Otoregülasyon aralığı', 'f48-ts f48-c-okt', 'middle')}
        ${tx((P.x0 + P.X(L)) / 2, P.Y(80), 'İskemi', 'f48-ts f48-c-crit', 'middle')}
        ${P.x1 - P.X(U) > 46 ? tx((P.X(U) + P.x1) / 2, P.Y(24), 'Basınca', 'f48-ts f48-c-warnt', 'middle') + tx((P.X(U) + P.x1) / 2, P.Y(24) + 14, 'bağımlı', 'f48-ts f48-c-warnt', 'middle') : ''}
        <line class="f48-kesik" x1="${P.x0}" x2="${P.x1}" y1="${P.Y(50)}" y2="${P.Y(50)}"/>
        ${tx(P.x0 + 4, P.Y(50) - 6, 'normal CBF 50', 'f48-ts f48-halo', 'start')}
        ${diger}<path class="f48-egri" d="${yolD(P, (c) => cbfF(c, gr), 0, 200)}"/>${etkS}
        <line class="f48-imlec" data-i="l"/><circle class="f48-nokta" r="6" data-i="n"/>
        <text class="f48-t f48-halo f48-c-acc" data-i="t"></text>
      </svg>`;
      kA.innerHTML = `<svg class="f48-svg" viewBox="${dar ? '0 0 360 96' : '0 0 200 200'}" role="img" aria-label="Arteriyol kesiti: çap CPP'ye göre değişir"></svg>`;
      const sv = kA.querySelector('svg');
      if (dar) {
        art = arteriyol(sv, 8, 34, 140, 22);
        mk('text', { class: 'f48-ts f48-c-acc', x: 158, y: 24, 'data-a': 'e' }, sv);
        mk('text', { class: 'f48-t', x: 158, y: 48, 'data-a': 'c' }, sv);
        mk('text', { class: 'f48-t', x: 158, y: 68, 'data-a': 'f' }, sv);
        mk('text', { class: 'f48-ts', x: 14, y: 84, 'data-a': 'b' }, sv).textContent = 'Arteriyol (düz kas duvarı)';
      } else {
        mk('text', { class: 'f48-ts', x: 100, y: 22, 'text-anchor': 'middle' }, sv).textContent = 'Arteriyol (düz kas duvarı)';
        art = arteriyol(sv, 20, 76, 160, 22);
        mk('text', { class: 'f48-ts f48-c-acc', x: 100, y: 128, 'text-anchor': 'middle', 'data-a': 'e' }, sv);
        mk('text', { class: 'f48-t', x: 100, y: 160, 'text-anchor': 'middle', 'data-a': 'c' }, sv);
        mk('text', { class: 'f48-t', x: 100, y: 182, 'text-anchor': 'middle', 'data-a': 'f' }, sv);
      }
      const q = (s) => el.querySelector(s);
      R = { P, l: q('[data-i=l]'), n: q('[data-i=n]'), t: q('[data-i=t]'), e: q('[data-a=e]'), c: q('[data-a=c]'), f: q('[data-a=f]') };
      guncelle();
    };
    const guncelle = () => {
      const [ad, L, U, kc] = GR[gr];
      const v = cbfF(cpp, gr), P = R.P;
      el.querySelector('[data-v=cpp]').textContent = Math.round(cpp) + ' mmHg';
      const x = P.X(cpp), y = P.Y(v);
      R.l.setAttribute('x1', x); R.l.setAttribute('x2', x); R.l.setAttribute('y1', y); R.l.setAttribute('y2', P.y0);
      R.n.setAttribute('cx', x); R.n.setAttribute('cy', y);
      const sag = x > P.x1 - 90;
      R.t.setAttribute('x', sag ? x - 10 : x + 10); R.t.setAttribute('y', y < P.y1 + 30 || sag ? y + 22 : y - 10); R.t.setAttribute('text-anchor', sag ? 'end' : 'start');
      R.t.textContent = 'CBF ' + Math.round(v);
      let h, et, cv;
      const mid = (L + U) / 2;
      if (cpp <= L) { h = 34; et = 'en geniş: daha fazla genişleyemez'; cv = 'CVR en düşük'; }
      else if (cpp >= U) { h = 10; et = 'en dar: basınç direnci aşar'; cv = 'CVR en yüksek'; }
      else { h = 34 - (24 * (cpp - L)) / (U - L); const m = Math.abs(cpp - mid) < (U - L) * 0.08; et = m ? 'orta çap' : cpp > mid ? 'duvar gerimi ↑ → kasılır' : 'duvar gerimi ↓ → genişler'; cv = m ? 'CVR orta' : cpp > mid ? 'CVR ↑' : 'CVR ↓'; }
      if (R.e) { R.e.textContent = et; R.c.textContent = cv; R.f.textContent = 'CBF ' + Math.round(v) + ' mL/100 g/dk'; }
      if (art) art.set(h, v);
      if (grCap) { capYaz(el, grCap); return; }
      if (cpp < L) capYaz(el, `<b>CPP ${Math.round(cpp)} mmHg: alt sınırın altında.</b> Arteriyoller en geniş durumdadır; CBF 50 mL/100 g/dk'nın altına düşer ve beyin iskemisi gelişir. [[K1 s. 202]]`);
      else if (cpp > U) capYaz(el, `<b>CPP ${Math.round(cpp)} mmHg: üst sınırın üstünde.</b> Arteriyoller daha fazla kasılamaz; CBF CPP ile doğru orantılı artar. [[K1 s. 202]]`);
      else capYaz(el, `<b>CPP ${Math.round(cpp)} mmHg, ${kc}.</b> Plato üzerindesiniz: miyojenik yanıt arteriyol çapını ayarlar, CBF ≈ 50 mL/100 g/dk. [[K1 s. 202]]`);
    };
    const durdur = () => { tara = false; btn.setAttribute('aria-pressed', 'false'); btn.textContent = '▶ Basıncı tara'; };
    rg.addEventListener('input', () => { cpp = +rg.value; grCap = ''; durdur(); guncelle(); });
    el.querySelectorAll('[data-gr]').forEach((b) => b.addEventListener('click', () => {
      gr = b.dataset.gr; basSec(el, 'gr', gr);
      grCap = gr === 'ht' ? '<b>Kronik hipertansiyon.</b> Eğri sağa kayar: normotansif hastada güvenli olan bir CPP bu hastada iskemi bölgesine düşebilir. [[K1 s. 202]]'
        : gr === 'yd' ? '<b>Yenidoğan.</b> Eğri sola kayar: otoregülasyon daha düşük basınçlarda çalışır. [[K1 s. 202]]' : '';
      ciz();
    }));
    btn.addEventListener('click', () => {
      if (tara) { durdur(); return; }
      grCap = '';
      if (RM) { cpp = 200; rg.value = 200; guncelle(); return; }
      cpp = 0; tara = true; btn.setAttribute('aria-pressed', 'true'); btn.textContent = '❚❚ Durdur'; guncelle();
    });
    const dz = darIzle(el, (n) => { dar = n; el.querySelector('.f48-oto-g').classList.toggle('f48-tek', n); ciz(); });
    const tk = ticker(el, (dt) => {
      if (tara) { cpp = Math.min(200, cpp + (200 / 6) * dt); rg.value = Math.round(cpp / 5) * 5; guncelle(); if (cpp >= 200) durdur(); }
      if (art) art.step(dt);
    });
    return () => { tk(); dz(); };
  };

  /* =====================================================================
     3 · f48_esik — CBF eşikleri ve nöron (K1 s. 203)
     ===================================================================== */
  VIZ.f48_esik = (el) => {
    const ES = [[50, 'Hücresel asidoz'], [40, 'Protein sentezi bozulur'], [30, 'Hücresel ödem'], [20, 'İyon pompaları yetersiz, gradiyent kaybı'], [10, 'Hücre ölümü']];
    let v = 50, mod = null, bek = 0, faz = 0, ft = 0, bilinc = false, vvCap = false;
    el.innerHTML = `<div class="f48-kont">${rngHtml('cbf', 'CBF', 0, 60, 1, v)}
        <div class="btn-row"><button type="button" class="btn ghost" data-a="az" aria-pressed="false">▶ Akımı azalt</button><button type="button" class="btn ghost" data-a="vv" aria-pressed="false">Vazovagal epizot</button></div></div>
      <div class="f48-esik-svg"></div><ul class="f48-esik-l">${ES.map((e) => `<li data-t="${e[0]}"><b>&lt; ${e[0]}</b> ${e[1]}</li>`).join('')}</ul>`;
    const kutu = el.querySelector('.f48-esik-svg'), rg = el.querySelector('[data-r=cbf]');
    const bAz = el.querySelector('[data-a=az]'), bVv = el.querySelector('[data-a=vv]');
    let R = {}, dar = false;
    const ciz = () => {
      const W = dar ? 360 : 640, H = 300, T0 = 40, T1 = 260, tx0 = dar ? 22 : 40;
      const Ty = (c) => T1 - ((T1 - T0) * c) / 60;
      const cx = dar ? 226 : 515, cy = dar ? 158 : 165, sc = dar ? 1.05 : 1.15;
      const cizgi = ES.map(([t, ad]) => `<g class="f48-esik-s" data-t="${t}"><line x1="${tx0 - 4}" x2="${dar ? tx0 + 30 : tx0 + 64}" y1="${Ty(t)}" y2="${Ty(t)}"/>
          ${tx(tx0 + (dar ? 34 : 34), Ty(t) + 4, String(t), 'f48-ts')}${dar ? '' : `<circle cx="${tx0 + 60}" cy="${Ty(t)}" r="4"/>${tx(tx0 + 72, Ty(t) + 4, ad, 'f48-ts f48-esik-ad')}`}</g>`).join('');
      kutu.innerHTML = `<svg class="f48-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="CBF termometresi ve nöron">
        <defs>${okUc('f48-uc-h')}</defs>
        <rect class="f48-term" x="${tx0}" y="${T0 - 6}" width="22" height="${T1 - T0 + 6}" rx="11"/>
        <circle class="f48-term" cx="${tx0 + 11}" cy="${T1 + 14}" r="15"/>
        <rect class="f48-term-d" data-e="d" x="${tx0 + 4}" width="14" rx="7"/>
        <circle class="f48-term-d" data-e="db" cx="${tx0 + 11}" cy="${T1 + 14}" r="11"/>
        ${tx(tx0 + 11, 22, 'CBF', 'f48-t', 'middle')}${cizgi}
        <g data-e="o2">${tx(W - 150, 22, 'O₂ sunumu', 'f48-ts')}<rect class="f48-o2-z" x="${W - 150}" y="28" width="136" height="9" rx="4"/><rect class="f48-o2" data-e="o2b" x="${W - 150}" y="28" height="9" rx="4"/></g>
        <g transform="translate(${cx} ${cy}) scale(${sc})" data-e="nr" class="f48-noron">
          <path class="f48-dend" d="M-30 -18 L-74 -52 M-56 -38 L-62 -66 M-33 14 L-80 34 M-62 26 L-84 10 M-6 -34 L-16 -78 M-12 -62 L4 -84"/>
          <path class="f48-dend" d="M34 0 L110 0 M96 0 L112 -14 M96 0 L112 14"/>
          <circle class="f48-soma" data-e="soma" r="34"/>
          <circle class="f48-cek" cx="-4" cy="-2" r="11"/>
          <g class="f48-rib" data-e="rib">${[120, 168, 216, 264, 312, 360].map((a) => `<circle cx="${(-4 + 19 * Math.cos((a * Math.PI) / 180)).toFixed(1)}" cy="${(-2 + 19 * Math.sin((a * Math.PI) / 180)).toFixed(1)}" r="2.4"/>`).join('')}</g>
          <g data-e="h" class="f48-hp">${tx(-14, 62, 'H⁺', 'f48-t')}${tx(44, -34, 'H⁺', 'f48-t')}${tx(46, 46, 'H⁺', 'f48-t')}</g>
          <g data-e="ps">${tx(0, 88, 'protein sentezi ✕', 'f48-ts f48-c-crit', 'middle')}</g>
          <g data-e="su" class="f48-su"><path d="M30 -80 L18 -44" marker-end="url(#f48-uc-h)"/><path d="M-90 -6 L-50 -4" marker-end="url(#f48-uc-h)"/>${tx(34, -82, 'H₂O', 'f48-ts f48-c-v')}${tx(-118, -2, 'H₂O', 'f48-ts f48-c-v')}</g>
          <g data-e="pm"><circle class="f48-pompa" cx="-25" cy="25" r="8"/><path class="f48-pompa-x" data-e="px" d="M-31 19 L-19 31 M-19 19 L-31 31"/></g>
          <g class="f48-iyon">${tx(-70, 62, 'Na⁺', 'f48-ts')}${tx(4, 26, 'K⁺', 'f48-ts', 'middle')}<g data-e="kar">${tx(20, 12, 'Na⁺', 'f48-ts f48-c-crit', 'middle')}${tx(62, 22, 'K⁺', 'f48-ts f48-c-crit')}</g></g>
        </g>
        ${tx(cx, cy + (dar ? 126 : 136), 'hücre ölümü', 'f48-t f48-c-crit', 'middle', ' data-e="olu"')}
        ${tx(cx, dar ? 62 : 58, 'bilinç kaybı', 'f48-buyuk', 'middle', ' data-e="bk"')}
        ${tx(dar ? cx : cx - 150, dar ? 84 : 58, '', 'f48-t f48-c-acc', 'middle', ' data-e="say"')}
      </svg>`;
      const q = (s) => kutu.querySelector(`[data-e=${s}]`);
      R = { Ty, T1, d: q('d'), db: q('db'), o2b: q('o2b'), soma: q('soma'), rib: q('rib'), h: q('h'), ps: q('ps'), su: q('su'), px: q('px'), kar: q('kar'), olu: q('olu'), bk: q('bk'), say: q('say'), nr: q('nr') };
      guncelle();
    };
    const guncelle = () => {
      const vi = Math.round(v);
      el.querySelector('[data-v=cbf]').textContent = vi + ' mL/100 g/dk';
      const { Ty, T1 } = R;
      R.d.setAttribute('y', Ty(vi)); R.d.setAttribute('height', Math.max(0, T1 - Ty(vi) + 8));
      const renk = vi < 20 ? 'crit' : vi < 50 ? 'warn' : 'v';
      [R.d, R.db].forEach((e) => e.setAttribute('class', 'f48-term-d f48-f-' + renk));
      R.o2b.setAttribute('width', (136 * Math.min(vi, 60)) / 60);
      kutu.querySelectorAll('.f48-esik-s').forEach((g) => g.classList.toggle('on', vi < +g.dataset.t));
      el.querySelectorAll('.f48-esik-l li').forEach((g) => g.classList.toggle('on', vi < +g.dataset.t));
      const on = (t) => vi < t;
      R.soma.setAttribute('class', 'f48-soma' + (on(50) ? ' f48-asit' : '') + (on(30) ? ' f48-odem' : ''));
      R.soma.setAttribute('r', on(30) ? 39 : 34);
      R.h.style.display = on(50) ? '' : 'none';
      R.rib.classList.toggle('kayip', on(40)); R.ps.style.display = on(40) ? '' : 'none';
      R.su.style.display = on(30) ? '' : 'none';
      R.px.style.display = on(20) ? '' : 'none'; R.kar.style.display = on(20) ? '' : 'none';
      R.nr.classList.toggle('f48-olu', on(10)); R.olu.style.display = on(10) ? '' : 'none';
      R.bk.style.display = bilinc ? '' : 'none';
      if (vvCap) { capYaz(el, "<b>Vazovagal epizot.</b> CBF'nin yalnız 5 saniye 30 mL/100 g/dk'ya inmesi bilinç kaybı yapar: beyin iskemiye en duyarlı organdır. [[K1 s. 203]]"); return; }
      const m = vi >= 50 ? `<b>CBF ${vi} mL/100 g/dk.</b> Normal akım; nöronlar sağlam. Akımı azaltın.`
        : vi >= 40 ? `<b>CBF ${vi}: &lt; 50.</b> O₂ sunumu azalır; hücresel asidoz başlar.`
        : vi >= 30 ? `<b>CBF ${vi}: &lt; 40.</b> Asidoza protein sentezi bozukluğu eklenir.`
        : vi >= 20 ? `<b>CBF ${vi}: &lt; 30.</b> Hücresel ödem gelişir.`
        : vi >= 10 ? `<b>CBF ${vi}: &lt; 20.</b> Membran iyon pompaları yetersizleşir, transmembran elektrokimyasal gradiyentler kaybolur.`
        : `<b>CBF ${vi}: &lt; 10.</b> Hücre ölümü.`;
      capYaz(el, m + ' [[K1 s. 203]]');
    };
    const bitir = () => { mod = null; [bAz, bVv].forEach((b) => b.setAttribute('aria-pressed', 'false')); bAz.textContent = '▶ Akımı azalt'; R.say.textContent = ''; };
    const yaz = (nv) => { v = nv; rg.value = Math.round(v); guncelle(); };
    rg.addEventListener('input', () => { bitir(); bilinc = false; vvCap = false; yaz(+rg.value); });
    bAz.addEventListener('click', () => {
      if (mod === 'az') { bitir(); return; }
      bitir(); bilinc = false; vvCap = false;
      if (RM) { yaz(5); return; }
      mod = 'az'; bek = 0; bAz.setAttribute('aria-pressed', 'true'); bAz.textContent = '❚❚ Durdur'; yaz(55);
    });
    bVv.addEventListener('click', () => {
      bitir(); vvCap = true; bilinc = false;
      if (RM) { bilinc = true; yaz(30); return; }
      mod = 'vv'; faz = 0; ft = 0; bVv.setAttribute('aria-pressed', 'true'); yaz(50);
    });
    const dz = darIzle(el, (n) => { dar = n; ciz(); });
    const tk = ticker(el, (dt) => {
      if (mod === 'az') {
        if (bek > 0) { bek -= dt; return; }
        let nv = v - 10 * dt;
        const t = ES.find(([th]) => v > th - 1 && nv <= th - 1);
        if (t) { nv = t[0] - 1; bek = 0.6; }
        if (nv <= 5) { nv = 5; yaz(nv); bitir(); return; }
        yaz(nv);
      } else if (mod === 'vv') {
        ft += dt;
        if (faz === 0) { yaz(50 - 20 * Math.min(1, ft)); if (ft >= 1) { faz = 1; ft = 0; } }
        else if (faz === 1) { R.say.textContent = Math.max(1, Math.ceil(5 - ft)) + ' s'; if (ft >= 5) { faz = 2; ft = 0; bilinc = true; R.say.textContent = ''; guncelle(); } }
        else { yaz(30 + 20 * Math.min(1, ft / 2)); if (ft >= 2) bitir(); }
      }
    });
    return () => { tk(); dz(); };
  };

  /* =====================================================================
     4 · f48_esles — yerel ve global akım–metabolizma eşleşmesi (K1 s. 203)
     ===================================================================== */
  VIZ.f48_esles = (el) => {
    const GL = { n: ['Normal', 100], se: ['Status epileptikus', 160], at: ['Ateş', 125], ga: ['Genel anestezi', 60], hi: ['Hipotermi', 65] };
    const MET = ['CO₂', 'H⁺', 'K⁺', 'adenozin'];
    let yer = 'd', gl = 'n', oran = 100, oranT = 100, rozet = 0, zam = [];
    el.innerHTML = `<div class="f48-kont"><div><span class="f48-lbl">Yerel</span>${segHtml('Yerel', 'yr', [['d', 'Dinlenme'], ['e', 'Bölge etkin']], yer)}</div>
        <div><span class="f48-lbl">Global</span>${segHtml('Global', 'gl', Object.keys(GL).map((k) => [k, GL[k][0]]), gl)}</div></div>
      <div class="f48-esles-svg"></div><div class="f48-esles-bar"></div>`;
    const kB = el.querySelector('.f48-esles-svg'), kC = el.querySelector('.f48-esles-bar');
    let R = {}, dar = false, G = null, W = null, Lc = null;
    const ciz = () => {
      const E = dar ? { W: 360, H: 236, cx: 180, cy: 112, rx: 150, ry: 92, t: 24 } : { W: 400, H: 300, cx: 200, cy: 142, rx: 172, ry: 116, t: 30 };
      const { cx, cy, rx, ry, t } = E;
      const pt = (a, f) => [cx + rx * f * Math.cos(a), cy + ry * f * Math.sin(a)];
      const fi = 1 - t / Math.min(rx, ry) * 0.9;
      const a0 = (200 * Math.PI) / 180, a1 = (245 * Math.PI) / 180;
      const [p1x, p1y] = pt(a0, 1), [p2x, p2y] = pt(a1, 1), [p3x, p3y] = pt(a1, fi), [p4x, p4y] = pt(a0, fi);
      const bolge = `M${p1x} ${p1y} A${rx} ${ry} 0 0 1 ${p2x} ${p2y} L${p3x} ${p3y} A${rx * fi} ${ry * fi} 0 0 0 ${p4x} ${p4y}Z`;
      const am = (a0 + a1) / 2;
      const rx0 = cx - rx * 0.46, ry0 = cy - ry * (dar ? 0.3 : 0.32);
      const rz = `<text class="f48-ts f48-rozet f48-halo2" x="${rx0}" y="${ry0}">${MET.map((m, i) => `<tspan data-rz="${i}"${i ? ' dx="10"' : ''}>${m}</tspan>`).join('')}</text>`;
      const ax = cx - rx * 0.56, ay = cy + 2;
      kB.innerHTML = `<svg class="f48-svg" viewBox="0 0 ${E.W} ${E.H}" role="img" aria-label="Beynin şematik koronal kesiti: gri ve beyaz cevher akımı">
        <ellipse class="f48-gri" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>
        <ellipse class="f48-beyaz" cx="${cx}" cy="${cy}" rx="${rx * fi}" ry="${ry * fi}"/>
        <path class="f48-fissur" d="M${cx} ${cy - ry} L${cx} ${cy - ry * fi + 14}"/>
        <path class="f48-bolge" data-e="bolge" d="${bolge}"/>
        <g data-e="dg"></g><g data-e="dw"></g><g data-e="dl"></g>
        <g data-e="ma" transform="translate(${ax.toFixed(0)} ${ay.toFixed(0)})"><rect class="f48-mini-w" x="-16" y="-9" width="32" height="18" rx="3"/><rect class="f48-mini-l" data-e="mal" x="-16" width="32"/></g>
        ${rz}
        ${tx(cx + 10, cy + 6, 'Beyaz cevher 20', 'f48-t f48-halo2', 'middle')}${tx(cx + 10, cy + 23, 'mL/100 g/dk', 'f48-ts f48-halo2', 'middle')}
        ${tx(cx + rx, cy + ry + 22, 'Gri cevher (korteks) 70 mL/100 g/dk', 'f48-t f48-c-vt', 'end')}
        ${tx(4, dar ? 12 : 16, 'yerel akım ↑, O₂ sunumu ↑', 'f48-t f48-c-acc', 'start', ' data-e="yt"')}
      </svg>`;
      const q = (s) => kB.querySelector(`[data-e=${s}]`);
      R = { bolge: q('bolge'), ma: q('ma'), mal: q('mal'), yt: q('yt'), rz: [...kB.querySelectorAll('[data-rz]')] };
      R.ma.style.display = 'none';
      const dg = q('dg'), dw = q('dw'), dl = q('dl');
      G = []; W = []; Lc = [];
      for (let i = 0; i < 60; i++) G.push({ a: (i * 2.399) % (2 * Math.PI), f: fi + (1 - fi) * (0.25 + ((i * 0.61) % 1) * 0.5), e: mk('circle', { class: 'f48-dot', r: 2.4 }, dg) });
      for (let i = 0; i < 20; i++) W.push({ a: (i * 2.399) % (2 * Math.PI), f: 0.2 + ((i * 0.53) % 1) * (fi - 0.3), e: mk('circle', { class: 'f48-dot', r: 2.2 }, dw) });
      for (let i = 0; i < 14; i++) Lc.push({ u: (i * 0.618) % 1, f: fi + (1 - fi) * (0.2 + ((i * 0.37) % 1) * 0.6), e: mk('circle', { class: 'f48-dot f48-dot-l', r: 2.4 }, dl) });
      R.pt = pt; R.a0 = a0; R.a1 = a1;
      if (dar) {
        kC.innerHTML = `<svg class="f48-svg" viewBox="0 0 360 96" role="img" aria-label="CMR ve toplam CBF çubukları">
          ${tx(4, 26, 'CMR', 'f48-t')}${tx(4, 64, 'Toplam CBF', 'f48-t')}
          <rect class="f48-bar-cmr" data-e="b1" x="100" y="12" height="20" rx="3"/><rect class="f48-bar-cbf" data-e="b2" x="100" y="50" height="20" rx="3"/>
          <line class="f48-kesik" x1="${100 + 140}" x2="${100 + 140}" y1="6" y2="76"/>
          ${tx(4, 90, 'Toplam CBF toplam metabolizmayı izler', 'f48-ts')}${tx(244, 90, '', 'f48-ts', 'start', ' data-e="n50"')}
        </svg>`;
      } else {
        kC.innerHTML = `<svg class="f48-svg" viewBox="0 0 230 300" role="img" aria-label="CMR ve toplam CBF çubukları">
          <line class="f48-eks" x1="14" x2="216" y1="250" y2="250"/>
          <line class="f48-kesik" x1="14" x2="216" y1="${250 - 120}" y2="${250 - 120}"/>
          <rect class="f48-bar-cmr" data-e="b1" x="34" width="64" rx="3"/><rect class="f48-bar-cbf" data-e="b2" x="132" width="64" rx="3"/>
          ${tx(66, 268, 'CMR', 'f48-t', 'middle')}${tx(164, 268, 'Toplam CBF', 'f48-t', 'middle')}
          ${tx(115, 286, 'Toplam CBF toplam', 'f48-ts', 'middle')}${tx(115, 299, 'metabolizmayı izler', 'f48-ts', 'middle')}
          ${tx(164, 0, '', 'f48-ts', 'middle', ' data-e="n50"')}${tx(216, 250 - 124, 'normal', 'f48-ts', 'end')}
        </svg>`;
      }
      R.b1 = kC.querySelector('[data-e=b1]'); R.b2 = kC.querySelector('[data-e=b2]'); R.n50 = kC.querySelector('[data-e=n50]');
      R.dar = dar;
      cubuk(); noktalar(0); durum(false);
    };
    const cubuk = () => {
      if (!R.b1) return;
      if (R.dar) { const w = 1.4 * oran; R.b1.setAttribute('width', w); R.b2.setAttribute('width', w); }
      else { const h = 1.2 * oran; [R.b1, R.b2].forEach((b) => { b.setAttribute('y', 250 - h); b.setAttribute('height', h); }); R.n50.setAttribute('y', 250 - h - 24); }
      R.n50.textContent = gl === 'n' ? '≈ 50 mL/100 g/dk' : '';
      if (R.dar) R.n50.textContent = '';
    };
    const noktalar = (dt) => {
      if (!G) return;
      const k = oran / 100, akt = yer === 'e';
      const ng = Math.round(clamp(36 * k, 8, 60)), nw = Math.round(clamp(9 * k, 3, 20));
      G.forEach((d, i) => { if (!RM) d.a += 0.35 * k * dt; const [x, y] = R.pt(d.a, d.f); d.e.setAttribute('cx', x.toFixed(1)); d.e.setAttribute('cy', y.toFixed(1)); d.e.style.display = i < ng ? '' : 'none'; });
      W.forEach((d, i) => { if (!RM) d.a += 0.1 * k * dt; const [x, y] = R.pt(d.a, d.f); d.e.setAttribute('cx', x.toFixed(1)); d.e.setAttribute('cy', y.toFixed(1)); d.e.style.display = i < nw ? '' : 'none'; });
      Lc.forEach((d) => { if (!RM) d.u = (d.u + 0.5 * dt) % 1; const [x, y] = R.pt(R.a0 + (R.a1 - R.a0) * d.u, d.f); d.e.setAttribute('cx', x.toFixed(1)); d.e.setAttribute('cy', y.toFixed(1)); d.e.style.display = akt ? '' : 'none'; });
    };
    const durum = (yeni) => {
      const akt = yer === 'e';
      R.bolge.style.display = akt ? '' : 'none'; R.yt.style.display = akt ? '' : 'none';
      const lh = akt ? 14 : 6; R.mal.setAttribute('y', -lh / 2); R.mal.setAttribute('height', lh); R.ma.style.display = akt ? '' : 'none';
      zam.forEach(clearTimeout); zam = [];
      if (akt) {
        if (RM || !yeni) R.rz.forEach((r) => (r.style.visibility = ''));
        else { R.rz.forEach((r) => (r.style.visibility = 'hidden')); R.rz.forEach((r, i) => zam.push(setTimeout(() => { r.style.visibility = ''; }, 300 * (i + 1)))); }
      } else R.rz.forEach((r) => (r.style.visibility = 'hidden'));
      const ad = GL[gl][0];
      if (akt) capYaz(el, '<b>Bölge etkin.</b> Metabolik olarak etkin dokuda CO₂, H⁺, K⁺ ve adenozin birikir; arteriyol genişler, yerel akım ve O₂ sunumu artar. [[K1 s. 203]]');
      else if (gl === 'se' || gl === 'at') capYaz(el, `<b>${ad}.</b> Toplam CMR artar; global CBF buna eşleşerek artar. [[K1 s. 203]]`);
      else if (gl === 'ga' || gl === 'hi') capYaz(el, `<b>${ad}.</b> Toplam CMR azalır; global CBF buna eşleşerek azalır. [[K1 s. 203]]`);
      else capYaz(el, '<b>Dinlenme.</b> Gri cevher 70, beyaz cevher 20 mL/100 g/dk alır; toplam ≈ 50. Bir bölgeyi etkinleştirin ya da global bir durum seçin. [[K1 s. 203]]');
    };
    el.querySelectorAll('[data-yr]').forEach((b) => b.addEventListener('click', () => { yer = b.dataset.yr; gl = 'n'; oranT = 100; if (RM) oran = 100; basSec(el, 'yr', yer); basSec(el, 'gl', gl); cubuk(); durum(true); }));
    el.querySelectorAll('[data-gl]').forEach((b) => b.addEventListener('click', () => { gl = b.dataset.gl; yer = 'd'; oranT = GL[gl][1]; if (RM) oran = oranT; basSec(el, 'yr', yer); basSec(el, 'gl', gl); cubuk(); durum(true); }));
    const dz = darIzle(el, (n) => { dar = n; ciz(); });
    const tk = ticker(el, (dt) => {
      if (oran !== oranT) { const d = oranT - oran, s = (Math.abs(GL.se[1] - 60) / 0.5) * dt; oran = Math.abs(d) <= s ? oranT : oran + Math.sign(d) * s; cubuk(); }
      noktalar(dt);
    });
    return () => { tk(); dz(); zam.forEach(clearTimeout); };
  };

  /* =====================================================================
     5 · f48_gaz — PaCO₂ ve PaO₂ (K1 s. 203–204)
     ===================================================================== */
  VIZ.f48_gaz = (el) => {
    let co2 = 5.3, o2 = 13, kr = 'n', krCap = false, alkOn = false, zam = [];
    const co2F = (x, s) => { const z = x - s; return z <= 3.5 ? 25 : z >= 8 ? 90 : 25 + ((z - 3.5) * 65) / 4.5; };
    const o2F = (x) => (x >= 8 ? 50 : Math.min(100, 50 + 50 * Math.pow((8 - x) / 6, 1.5)));
    el.innerHTML = `<div class="f48-g2 f48-gaz-g">
        <div><div class="f48-kont">${rngHtml('co2', 'PaCO₂', 1, 15, 0.1, co2)}<div>${segHtml('CO₂ eğrisi', 'kr', [['n', 'Normal'], ['k', 'Kronik hiperkapni']], kr)}</div></div>
          <div class="f48-gaz-co2"></div>
          <div class="f48-alk" hidden><b>Aşırı hipokapni</b><ol><li>Alkaloz</li><li>HbO₂ eğrisi sola</li><li>beyne O₂ bırakılması ↓</li><li>doku hipoksisi → vazodilatasyon</li></ol></div></div>
        <div><div class="f48-kont">${rngHtml('o2', 'PaO₂', 2, 20, 0.5, o2)}</div><div class="f48-gaz-o2"></div></div></div>
      <div class="f48-gaz-art"></div>`;
    const P1 = plot(340, 220, 44, 12, 22, 38, 0, 15, 0, 100), P2 = plot(340, 220, 44, 12, 22, 38, 0, 20, 0, 100);
    const kC = el.querySelector('.f48-gaz-co2'), kO = el.querySelector('.f48-gaz-o2'), kA = el.querySelector('.f48-gaz-art'), alk = el.querySelector('.f48-alk');
    const imlec = '<line class="f48-imlec" data-i="l"/><circle class="f48-nokta" r="6" data-i="n"/>';
    const cizCO2 = () => {
      const P = P1, k = kr === 'k';
      kC.innerHTML = `<svg class="f48-svg" viewBox="0 0 340 220" role="img" aria-label="PaCO₂'ye karşı CBF eğrisi">
        ${eksen(P, [0, 3.5, 5, 8, 10, 15], [0, 25, 50, 75, 100], 'PaCO₂ (kPa)', 'CBF (mL/100 g/dk)')}
        <line class="f48-kesik" x1="${P.X(3.5)}" x2="${P.X(3.5)}" y1="${P.y0}" y2="${P.y1}"/><line class="f48-kesik" x1="${P.X(8)}" x2="${P.X(8)}" y1="${P.y0}" y2="${P.y1}"/>
        <line class="f48-kesik" x1="${P.x0}" x2="${P.x1}" y1="${P.Y(50)}" y2="${P.Y(50)}"/>${tx(P.x1, P.Y(50) - 5, 'normal CBF', 'f48-ts', 'end')}
        <path class="${k ? 'f48-soluk' : 'f48-egri'}" d="${yolD(P, (x) => co2F(x, 0), 0, 15)}"/>
        ${k ? `<path class="f48-egri-k" d="${yolD(P, (x) => co2F(x, 2), 0, 15)}"/>${tx(P.X(10.6), P.Y(72), 'Kronik', 'f48-ts f48-c-warnt', 'start')}${tx(P.X(10.6), P.Y(72) + 13, 'hiperkapni', 'f48-ts f48-c-warnt', 'start')}` : ''}
        ${tx(P.X(5.75), P.Y(80), 'doğrusal:', 'f48-ts f48-c-vt', 'end')}${tx(P.X(5.75), P.Y(80) + 13, '3,5–8 kPa', 'f48-ts f48-c-vt', 'end')}
        ${tx(P.X(11.5), P.Y(90) - 7, 'en geniş', 'f48-ts', 'middle')}${tx(P.X(1.75), P.Y(25) - 7, 'en dar', 'f48-ts', 'middle')}
        ${imlec}</svg>`;
    };
    kO.innerHTML = `<svg class="f48-svg" viewBox="0 0 340 220" role="img" aria-label="PaO₂'ye karşı CBF eğrisi">
      ${eksen(P2, [0, 5, 8, 10, 15, 20], [0, 25, 50, 75, 100], 'PaO₂ (kPa)', 'CBF (mL/100 g/dk)')}
      <line class="f48-kesik" x1="${P2.X(8)}" x2="${P2.X(8)}" y1="${P2.y0}" y2="${P2.y1}"/>
      <path class="f48-egri" d="${yolD(P2, o2F, 0, 20)}"/>
      ${tx(P2.X(8) + 6, P2.Y(92), 'PaO₂ &lt; 8 kPa:', 'f48-ts f48-c-warnt', 'start')}${tx(P2.X(8) + 6, P2.Y(92) + 13, 'vazodilatasyon', 'f48-ts f48-c-warnt', 'start')}
      ${imlec}</svg>`;
    kA.innerHTML = `<svg class="f48-svg f48-gaz-asvg" viewBox="0 0 360 74" role="img" aria-label="Arteriyol: çap toplam CBF'ye göre"><ellipse class="f48-hring" cx="110" cy="34" rx="104" ry="30"/></svg>`;
    const asv = kA.querySelector('svg');
    const art = arteriyol(asv, 20, 34, 180, 22);
    const tC = mk('text', { class: 'f48-t', x: 222, y: 30 }, asv), tC2 = mk('text', { class: 'f48-ts', x: 222, y: 48 }, asv);
    const hring = asv.querySelector('.f48-hring');
    const yer = (k, P, x, y) => { const l = k.querySelector('[data-i=l]'), n = k.querySelector('[data-i=n]'); l.setAttribute('x1', P.X(x)); l.setAttribute('x2', P.X(x)); l.setAttribute('y1', P.Y(y)); l.setAttribute('y2', P.y0); n.setAttribute('cx', P.X(x)); n.setAttribute('cy', P.Y(y)); };
    const guncelle = () => {
      const s = kr === 'k' ? 2 : 0, c1 = co2F(co2, s), c2 = o2F(o2), top = clamp(c1 + (c2 - 50), 0, 100);
      el.querySelector('[data-v=co2]').textContent = fmt(co2, 1) + ' kPa';
      el.querySelector('[data-v=o2]').textContent = fmt(o2, 1) + ' kPa';
      yer(kC, P1, co2, c1); yer(kO, P2, o2, c2);
      const h = top <= 50 ? 10 + (12 * (top - 25)) / 25 : 22 + (12 * (top - 50)) / 50;
      art.set(clamp(h, 10, 34), top);
      tC.textContent = 'CBF ≈ ' + Math.round(top); tC2.textContent = 'mL/100 g/dk';
      const alkY = co2 < 3.5;
      hring.style.display = alkY ? '' : 'none';
      if (alkY !== alkOn) {
        alkOn = alkY; alk.hidden = !alkY; zam.forEach(clearTimeout); zam = [];
        const li = [...alk.querySelectorAll('li')];
        if (alkY) { if (RM) li.forEach((l) => l.classList.add('on')); else { li.forEach((l) => l.classList.remove('on')); li.forEach((l, i) => zam.push(setTimeout(() => l.classList.add('on'), 400 * i + 50))); } }
      }
      if (krCap) { capYaz(el, '<b>Kronik hiperkapni.</b> PaCO₂–CBF eğrisi sağa kayar. [[K1 s. 203]]'); return; }
      const c = fmt(co2, 1), o = fmt(o2, 1);
      const o2m = o2 < 8 ? `<b>PaO₂ ${o} kPa: &lt; 8.</b> Erken vazodilatasyon CBF'yi belirgin artırır; normal PaO₂ düzeylerinde O₂'nin etkisi azdır. [[K1 s. 204]]` : '';
      let m;
      if (co2 > 8) m = `<b>PaCO₂ ${c} kPa: &gt; 8.</b> Arterler zaten en geniş durumda; daha fazla artış CVR ve CBF'yi değiştirmez. [[K1 s. 203]]`;
      else if (co2 < 3.5) m = `<b>PaCO₂ ${c} kPa: &lt; 3,5.</b> Arterler zaten en dar durumda; ama alkaloz HbO₂ eğrisini sola kaydırıp beyne O₂ bırakılmasını azaltabilir, doku hipoksisi damarları genişletir ve CBF artar. [[K1 s. 204]]`;
      else if (co2 > 6) m = `<b>Hiperkapni (${c} kPa).</b> Arteriyoller genişler, CVR düşer, CBF artar; ilişki 3,5–8 kPa'da yaklaşık doğrusaldır. [[K1 s. 203]]`;
      else if (co2 < 4.5) m = `<b>Hipokapni (${c} kPa).</b> Arteriyoller daralır, CBF azalır. [[K1 s. 203]]`;
      else m = o2m ? '' : `<b>PaCO₂ ${c} kPa, PaO₂ ${o} kPa.</b> Normal CBF. PaCO₂'yi ya da PaO₂'yi değiştirin. [[K1 s. 203–204]]`;
      capYaz(el, m && o2m ? m + ' ' + o2m : m || o2m);
    };
    el.querySelector('[data-r=co2]').addEventListener('input', (e) => { co2 = +e.target.value; krCap = false; guncelle(); });
    el.querySelector('[data-r=o2]').addEventListener('input', (e) => { o2 = +e.target.value; krCap = false; guncelle(); });
    el.querySelectorAll('[data-kr]').forEach((b) => b.addEventListener('click', () => { kr = b.dataset.kr; krCap = kr === 'k'; basSec(el, 'kr', kr); cizCO2(); guncelle(); }));
    cizCO2();
    const dz = darIzle(el, (n) => { el.querySelector('.f48-gaz-g').classList.toggle('f48-tek', n); });
    guncelle();
    const tk = ticker(el, (dt) => art.step(dt));
    return () => { tk(); dz(); zam.forEach(clearTimeout); };
  };

  /* =====================================================================
     6 · f48_hct — hematokrit, viskozite, CBF ve O₂ sunumu (K1 s. 204)
     ===================================================================== */
  VIZ.f48_hct = (el) => {
    const k = 1 / 0.3;
    const cbf = (h) => Math.exp(k * (0.45 - h));
    const ic = (h) => h / 0.45;
    const sun = (h) => (h / 0.3) * Math.exp(1 - h / 0.3);
    const cMax = cbf(0.15), iMax = ic(0.55);
    let h = 0.45;
    el.innerHTML = `<div class="f48-kont">${rngHtml('h', 'Hematokrit', 0.15, 0.55, 0.01, h)}</div>
      <div class="f48-g2 f48-hct-g"><div class="f48-hct-tup"></div><div class="f48-hct-gr"></div></div>
      <div class="legend"><span><i class="f48-lg-v"></i>CBF</span><span><i class="f48-lg-ok"></i>O₂ içeriği (Hb)</span><span><i class="f48-lg-acc"></i>Beyne O₂ sunumu</span></div>
      <div class="f48-ons"><span class="f48-lbl">Otonom sinir sistemi: CBF denetimindeki payı</span>
        <div class="f48-ons-bar"><i>Vazomotor (miyojenik)</i><i>Kimyasal (CO₂, O₂)</i><i>Metabolik</i><i class="f48-ons-n">Nörojenik</i></div>
        <small>Nörojenik (otonom) denetimin normal koşullarda payı azdır [[K1 s. 204]]. Bölme genişlikleri temsilîdir.</small></div>`;
    el.querySelector('.f48-ons small').innerHTML = REF(el.querySelector('.f48-ons small').innerHTML);
    const kT = el.querySelector('.f48-hct-tup'), kG = el.querySelector('.f48-hct-gr');
    kT.innerHTML = `<svg class="f48-svg" viewBox="0 0 300 120" role="img" aria-label="Damar içinde alyuvarlar; sayı hematokritle, hız CBF ile değişir">
      <rect class="f48-tup" x="8" y="12" width="284" height="56" rx="10"/><g data-e="rbc"></g>
      ${tx(8, 96, 'viskozite', 'f48-ts')}<rect class="f48-o2-z" x="88" y="86" width="204" height="12" rx="5"/><rect class="f48-visk" data-e="vb" x="88" y="86" height="12" rx="5"/>
    </svg>`;
    const rg = kT.querySelector('[data-e=rbc]'), vb = kT.querySelector('[data-e=vb]');
    const RBC = [];
    for (let i = 0; i < 22; i++) { const g = mk('g', { class: 'f48-rbc' }, rg); mk('ellipse', { rx: 9, ry: 5.5 }, g); mk('ellipse', { class: 'f48-rbc-i', rx: 4, ry: 2 }, g); RBC.push({ u: (i * 0.618) % 1, y: 22 + ((i * 0.41) % 1) * 36, g }); }
    const P = plot(380, 240, 58, 14, 20, 38, 0.15, 0.55, 0, 1.1);
    kG.innerHTML = `<svg class="f48-svg" viewBox="0 0 380 240" role="img" aria-label="Hematokrite karşı CBF, O₂ içeriği ve beyne O₂ sunumu">
      ${eksen(P, [0.2, 0.3, 0.4, 0.5], [], 'Hematokrit', '', (v) => fmt(v, 1))}
      ${tx(P.x0 - 5, P.y1 + 8, 'yüksek', 'f48-ts', 'end')}${tx(P.x0 - 5, P.y0 - 2, 'düşük', 'f48-ts', 'end')}
      <line class="f48-kesik" x1="${P.X(0.3)}" x2="${P.X(0.3)}" y1="${P.y0}" y2="${P.y1}"/>${tx(P.X(0.3) + 5, P.y0 - 8, 'optimum 0,3', 'f48-ts f48-c-acc', 'start')}
      <path class="f48-egri" d="${yolD(P, (x) => cbf(x) / cMax, 0.15, 0.55)}"/>
      <path class="f48-egri-ok" d="${yolD(P, (x) => ic(x) / iMax, 0.15, 0.55)}"/>
      <path class="f48-egri-acc" d="${yolD(P, sun, 0.15, 0.55)}"/>
      <line class="f48-imlec" data-e="l" y1="${P.y0}" y2="${P.y1}"/>
      <circle class="f48-n-v" data-e="n1" r="5"/><circle class="f48-n-ok" data-e="n2" r="5"/><circle class="f48-nokta" data-e="n3" r="6"/>
    </svg>`;
    const q = (s) => kG.querySelector(`[data-e=${s}]`);
    const L = q('l'), N1 = q('n1'), N2 = q('n2'), N3 = q('n3');
    const guncelle = () => {
      el.querySelector('[data-v=h]').textContent = fmt(h, 2);
      const x = P.X(h); L.setAttribute('x1', x); L.setAttribute('x2', x);
      [[N1, cbf(h) / cMax], [N2, ic(h) / iMax], [N3, sun(h)]].forEach(([n, y]) => { n.setAttribute('cx', x); n.setAttribute('cy', P.Y(y)); });
      vb.setAttribute('width', 204 * Math.exp(k * (h - 0.55)));
      const n = Math.round((h / 0.45) * 18);
      RBC.forEach((r, i) => { r.g.style.display = i < n ? '' : 'none'; });
      const hs = fmt(h, 2);
      capYaz(el, h >= 0.4 ? `<b>Hematokrit ${hs}.</b> Viskozite yüksek, CBF normal. Hematokriti azaltın. [[K1 s. 204]]`
        : h >= 0.32 ? `<b>Hematokrit ${hs}.</b> Viskozite azaldı, CBF artıyor; O₂ içeriğindeki düşüş henüz küçük, sunum artıyor. [[K1 s. 204]]`
        : h >= 0.28 ? '<b>Hematokrit ≈ 0,3.</b> CBF artışı ile O₂ içeriği düşüşü en iyi dengede: beyne O₂ sunumu en yüksek. [[K1 s. 204]]'
        : `<b>Hematokrit ${hs}.</b> CBF daha da artar ama kan çok az Hb taşır; beyne O₂ sunumu düşer. [[K1 s. 204]]`);
    };
    const yerRBC = () => RBC.forEach((r) => r.g.setAttribute('transform', `translate(${(18 + r.u * 264).toFixed(1)} ${r.y.toFixed(1)})`));
    el.querySelector('[data-r=h]').addEventListener('input', (e) => { h = +e.target.value; guncelle(); });
    const dz = darIzle(el, (n) => { el.querySelector('.f48-hct-g').classList.toggle('f48-tek', n); });
    guncelle(); yerRBC();
    const tk = ticker(el, (dt) => { if (RM) return; const v = (0.12 * cbf(h)) * dt; RBC.forEach((r) => { r.u = (r.u + v) % 1; }); yerRBC(); });
    return () => { tk(); dz(); };
  };

  /* =====================================================================
     7 · f48_ilac — CMR, tonus, net CBF (K1 s. 204)
     ===================================================================== */
  VIZ.f48_ilac = (el) => {
    const IL = { pro: 'Propofol', tiy: 'Tiyopenton', eto: 'Etomidat', ket: 'Ketamin', vol: 'Volatil', n2o: 'N₂O', opi: 'Opioid' };
    let il = 'pro', mac = 0.5, vt = 'o';
    el.innerHTML = `<div class="f48-kont"><div><span class="f48-lbl">İlaç</span>${segHtml('İlaç', 'il', Object.keys(IL).map((k) => [k, IL[k]]), il)}</div></div>
      <div class="f48-kont f48-vol" hidden>${rngHtml('mac', 'MAC', 0, 2, 0.1, mac)}<div>${segHtml('Volatil ajan', 'vt', [['s', 'Sevofluran'], ['o', 'Öteki volatiller']], vt)}</div></div>
      <div class="f48-ilac-svg"></div><div class="f48-ilac-mac" hidden></div>`;
    const kS = el.querySelector('.f48-ilac-svg'), kM = el.querySelector('.f48-ilac-mac'), vol = el.querySelector('.f48-vol');
    let R = {}, dar = false, art = null, PM = null;
    const oku = (cls, u) => { /* u: 1 yukarı, -1 aşağı, 0 yatay çift ok */
      if (u === 0) return { d: 'M-22 0 L-10 -10 L-10 -4 L10 -4 L10 -10 L22 0 L10 10 L10 4 L-10 4 L-10 10 Z', cls };
      return { d: u > 0 ? 'M0 -22 L13 -5 L5 -5 L5 20 L-5 20 L-5 -5 L-13 -5 Z' : 'M0 22 L13 5 L5 5 L5 -20 L-5 -20 L-5 5 L-13 5 Z', cls };
    };
    const veri = () => {
      if (il === 'vol') {
        const s = vt === 's', ust = mac > 1;
        const h = 22 + 12 * Math.min(1, mac / (s ? 2.2 : 1.6));
        return { cmr: [-1, ust ? 'azalır (zaten en fazla)' : 'azalır'], ton: [h, 'vazodilatasyon'], net: ust ? [1, 'artar', 'warn'] : [0, 'değişmez', 'ok'] };
      }
      return {
        pro: { cmr: [-1, 'azalır'], ton: [22, '—'], net: [-1, 'azalır', 'v'] }, tiy: { cmr: [-1, 'azalır'], ton: [22, '—'], net: [-1, 'azalır', 'v'] },
        eto: { cmr: [-1, 'azalır'], ton: [22, '—'], net: [-1, 'azalır', 'v'] }, ket: { cmr: [1, 'artar'], ton: [22, '—'], net: [1, 'artabilir', 'warn'] },
        n2o: { cmr: [1, 'artar'], ton: [34, 'güçlü vazodilatasyon'], net: [2, 'belirgin artar', 'crit'] }, opi: { cmr: [0, 'anlamlı etki yok'], ton: [22, 'anlamlı etki yok'], net: [0, 'değişmez', 'ok'] },
      }[il];
    };
    const ciz = () => {
      const L = dar
        ? { W: 360, H: 344, ilac: [110, 8, 140, 42], cmr: [14, 82, 150, 44], ok1: [89, 160], ton: [196, 82, 150, 44], art: [206, 162, 130], net: [70, 254, 220, 86] }
        : { W: 640, H: 260, ilac: [14, 100, 128, 56], cmr: [196, 30, 128, 50], ok1: [372, 56], ton: [196, 150, 128, 44], art: [196, 220, 140], net: [470, 70, 156, 120] };
      const box = (r, cls) => `<rect class="${cls}" x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" rx="8"/>`;
      const [ix, iy, iw, ih] = L.ilac, [cx, cy, cw, ch] = L.cmr, [tx0, ty, tw, th] = L.ton, [nx, ny, nw, nh] = L.net;
      let oklar, ek;
      if (dar) {
        oklar = `<path class="f48-bag" d="M${ix + iw / 2 - 20} ${iy + ih} L${cx + cw / 2} ${cy - 4}" marker-end="url(#f48-uc-i)"/><path class="f48-bag" d="M${ix + iw / 2 + 20} ${iy + ih} L${tx0 + tw / 2} ${ty - 4}" marker-end="url(#f48-uc-i)"/>
          <path class="f48-bag" d="M${cx + cw / 2} ${cy + ch + 80} L${nx + 50} ${ny - 4}" marker-end="url(#f48-uc-i)"/><path class="f48-bag" d="M${tx0 + tw / 2} ${ty + ch + 80} L${nx + nw - 50} ${ny - 4}" marker-end="url(#f48-uc-i)"/>
          ${tx(cx + cw / 2 - 30, ny - 14, 'eşleşme', 'f48-ts', 'middle')}`;
        ek = `<path class="f48-okb" data-e="ok1" transform="translate(${cx + cw / 2} ${cy + ch + 30})"/>${tx(cx + cw / 2, cy + ch + 70, '', 'f48-ts', 'middle', ' data-e="w1"')}
          ${tx(tx0 + tw / 2, ty + ch + 70, '', 'f48-ts', 'middle', ' data-e="w2"')}`;
      } else {
        oklar = `<path class="f48-bag" d="M${ix + iw} ${iy + 14} L${cx - 4} ${cy + ch / 2}" marker-end="url(#f48-uc-i)"/><path class="f48-bag" d="M${ix + iw} ${iy + ih - 14} L${tx0 - 4} ${ty + 20}" marker-end="url(#f48-uc-i)"/>
          <path class="f48-bag" d="M${cx + cw + 46} ${cy + ch / 2} L${nx - 4} ${ny + 30}" marker-end="url(#f48-uc-i)"/><path class="f48-bag" d="M${tx0 + tw + 110} ${ty + 30} L${nx - 4} ${ny + nh - 30}" marker-end="url(#f48-uc-i)"/>
          ${tx((cx + cw + 46 + nx) / 2 + 6, (cy + ch / 2 + ny + 30) / 2 - 10, 'eşleşme', 'f48-ts', 'middle')}`;
        ek = `<path class="f48-okb" data-e="ok1" transform="translate(${cx + cw + 22} ${cy + ch / 2})"/>${tx(cx + cw / 2, cy + ch + 20, '', 'f48-ts', 'middle', ' data-e="w1"')}
          ${tx(tx0 + tw + 10, ty + 74, '', 'f48-ts', 'start', ' data-e="w2"')}`;
      }
      kS.innerHTML = `<svg class="f48-svg" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="İlacın CMR ve arteriyol tonusu üzerinden net CBF etkisi">
        <defs>${okUc('f48-uc-i')}</defs>
        ${box(L.ilac, 'f48-ilac-k')}${tx(ix + iw / 2, iy + ih / 2 + 6, '', 'f48-t f48-ilac-ad', 'middle', ' data-e="ad"')}
        ${box(L.cmr, 'f48-yol-k')}${tx(cx + cw / 2, cy + ch / 2 + 6, 'CMR', 'f48-t', 'middle')}
        ${tx(tx0, ty + 12, 'Arteriyol tonusu', 'f48-t', 'start')}
        ${box(L.net, 'f48-net-k')}${tx(nx + nw / 2, ny + 22, 'Net CBF', 'f48-t', 'middle')}
        <path class="f48-okb" data-e="ok2" transform="translate(${nx + nw / 2} ${ny + nh / 2 + 4})"/>${tx(nx + nw / 2, ny + nh - 10, '', 'f48-t', 'middle', ' data-e="w3"')}
        ${oklar}${ek}<g data-e="ag"></g></svg>`;
      const ag = kS.querySelector('[data-e=ag]');
      art = arteriyol(ag, L.art[0], dar ? ty + 46 : ty + 40, L.art[2], 22);
      const q = (s) => kS.querySelector(`[data-e=${s}]`);
      R = { ad: q('ad'), ok1: q('ok1'), ok2: q('ok2'), w1: q('w1'), w2: q('w2'), w3: q('w3') };
      PM = dar ? plot(360, 170, 40, 12, 18, 36, 0, 2, -0.8, 1.4) : plot(640, 170, 44, 150, 18, 36, 0, 2, -0.8, 1.4);
      cizMac();
      guncelle();
    };
    const fC = (m) => -0.6 * Math.min(m, 1);
    const fV = (m, s) => (m <= 1 ? 0.6 * m : 0.6 + (s ? 0.25 : 0.6) * (m - 1));
    const cizMac = () => {
      const P = PM, s = vt === 's';
      const lx = dar ? P.x0 + 6 : P.x1 + 10;
      kM.innerHTML = `<svg class="f48-svg" viewBox="0 0 ${P.W} ${P.H}" role="img" aria-label="Volatilde MAC'a göre CBF değişimi">
        ${eksen(P, [0, 1, 2], [], 'MAC', 'CBF değişimi', (v) => String(v))}
        <line class="f48-eks" x1="${P.x0}" x2="${P.x1}" y1="${P.Y(0)}" y2="${P.Y(0)}"/>${tx(P.x0 - 5, P.Y(0) + 4, '0', 'f48-ts', 'end')}
        <line class="f48-kesik" x1="${P.X(1)}" x2="${P.X(1)}" y1="${P.y0}" y2="${P.y1}"/>
        <path class="f48-egri-v" d="${yolD(P, fC, 0, 2)}"/><path class="f48-egri-w" d="${yolD(P, (m) => fV(m, s), 0, 2)}"/>
        <path class="f48-egri-acc" d="${yolD(P, (m) => fC(m) + fV(m, s), 0, 2)}"/>
        <line class="f48-imlec" data-e="l" y1="${P.y0}" y2="${P.y1}"/><circle class="f48-nokta" data-e="n" r="6"/>
        ${dar ? '' : `${tx(lx, P.Y(fV(2, s)) + 4, 'vazodilatasyon', 'f48-ts f48-c-warnt')}${tx(lx, P.Y(fC(2) + fV(2, s)) + (s ? 14 : 4), 'toplam', 'f48-ts f48-c-acc')}${tx(lx, P.Y(-0.6) + 4, 'CMR etkisi', 'f48-ts f48-c-vt')}`}
        ${s ? tx(dar ? P.x0 + 6 : P.X(1) + 8, P.y1 + 10, 'sevofluran: en düşük vazodilatör eğilim', 'f48-ts f48-halo f48-c-acc') : ''}
      </svg>${dar ? '<div class="legend"><span><i class="f48-lg-v"></i>CMR etkisi</span><span><i class="f48-lg-w"></i>vazodilatasyon</span><span><i class="f48-lg-acc"></i>toplam</span></div>' : ''}`;
    };
    const guncelle = () => {
      const d = veri();
      R.ad.textContent = il === 'vol' ? (vt === 's' ? 'Sevofluran' : 'Volatil') : IL[il];
      const o1 = oku('', d.cmr[0]); R.ok1.setAttribute('d', o1.d); R.ok1.setAttribute('class', 'f48-okb f48-f-' + (d.cmr[0] > 0 ? 'warn' : d.cmr[0] < 0 ? 'v' : 'm'));
      R.w1.textContent = d.cmr[1];
      R.w2.textContent = d.ton[1];
      art.set(d.ton[0], 50);
      const o2 = oku('', Math.sign(d.net[0])); R.ok2.setAttribute('d', o2.d); R.ok2.setAttribute('class', 'f48-okb f48-f-' + d.net[2] + (d.net[0] === 2 ? ' f48-ok-b' : ''));
      R.w3.textContent = d.net[1]; R.w3.setAttribute('class', 'f48-t f48-c-' + (d.net[2] === 'v' ? 'vt' : d.net[2] === 'ok' ? 'okt' : d.net[2] === 'warn' ? 'warnt' : 'crit'));
      const v = il === 'vol';
      vol.hidden = !v; kM.hidden = !v;
      el.querySelector('[data-v=mac]').textContent = fmt(mac, 1);
      if (v) { const P = PM, s = vt === 's', x = P.X(mac), y = P.Y(fC(mac) + fV(mac, s)); const l = kM.querySelector('[data-e=l]'), n = kM.querySelector('[data-e=n]'); l.setAttribute('x1', x); l.setAttribute('x2', x); n.setAttribute('cx', x); n.setAttribute('cy', y); }
      const m = fmt(mac, 1), sev = vt === 's' ? ' Sevofluranın vazodilatör eğilimi volatiller arasında en düşüktür. [[K1 s. 204]]' : '';
      const C = {
        ket: "<b>Ketamin.</b> Öteki İV ajanların tersine CMR'yi artırır; bu yüzden CBF artabilir. [[K1 s. 204]]",
        n2o: "<b>N₂O.</b> Güçlü vazodilatör ve CMR'yi de artırır; iki etki toplanır, CBF belirgin artar. [[K1 s. 204]]",
        opi: "<b>Opioid.</b> CMR'ye ve CBF'ye anlamlı etkisi yoktur. [[K1 s. 204]]",
      };
      if (v) capYaz(el, (mac <= 1 ? `<b>Volatil, ${m} MAC.</b> CMR azalırken arteriyoller genişler; yaklaşık 1 MAC'ın altında iki etki dengelenir, CBF değişmez. Volatiller eşleşmeyi bozan tek gruptur. [[K1 s. 204]]`
        : `<b>Volatil, ${m} MAC.</b> CMR azalması zaten en fazladır; vazodilatasyon baskın çıkar ve CBF artar. [[K1 s. 204]]`) + sev);
      else capYaz(el, C[il] || `<b>${IL[il]}.</b> CMR azalır; eşleşme nedeniyle CBF de azalır. [[K1 s. 204]]`);
    };
    el.querySelectorAll('[data-il]').forEach((b) => b.addEventListener('click', () => { il = b.dataset.il; basSec(el, 'il', il); guncelle(); }));
    el.querySelectorAll('[data-vt]').forEach((b) => b.addEventListener('click', () => { vt = b.dataset.vt; basSec(el, 'vt', vt); cizMac(); guncelle(); }));
    el.querySelector('[data-r=mac]').addEventListener('input', (e) => { mac = +e.target.value; guncelle(); });
    const dz = darIzle(el, (n) => { dar = n; ciz(); });
    const tk = ticker(el, (dt) => { if (art) art.step(dt); });
    return () => { tk(); dz(); };
  };

  /* =====================================================================
     8 · f48_olcum — beş ölçüm yöntemi (K1 s. 204–205)
     ===================================================================== */
  VIZ.f48_olcum = (el) => {
    const Y = {
      tcd: ['Transkraniyal Doppler', 'y', '<b>Ölçer:</b> orta serebral arterde (MCA) kan hızı → bir yarıkürenin CBF tahmini.<br><b>Ayrıca:</b> karotis endarterektomisinde emboli, SAK sonrası vazospazm.<br>En sık klinik yöntem.'],
      jb: ['Juguler bulbus', 'y', '<b>Nasıl:</b> Seldinger, santral kateter gibi ama iğne kafaya doğru.<br><b>Ölçer:</b> PO₂, SjO₂, laktat → aynı taraf yarıkürede CBF\'nin genel yeterliği.<br><b>Söyleyemez:</b> bölgesel akım.'],
      fp: ['fMRI / PET', 'b', '<b>fMRI:</b> O₂\'ce zengin ve fakir kanı ayırır.<br><b>PET:</b> radyoaktif glukoz analoğu.<br><b>Ortak:</b> akım–metabolizma eşleşmesine dayanır, etkin bölgeleri gösterir.'],
      ks: ['Kety–Schmidt', 'g', '<b>Fick ilkesi:</b> arteriyel ve juguler venöz N₂O derişimleri.<br><b>Ölçer:</b> yalnız global CBF.<br>Araştırma yöntemi.'],
      xe: ['Ksenon-133', 'b', '<b>Nasıl:</b> enjekte edilen ¹³³Xe\'nin radyoaktif bozunması gama kamerayla saptanır.<br><b>Ölçer:</b> bölgesel CBF.<br>Araştırma yöntemi.'],
    };
    const CAP = {
      jb: '<b>Juguler bulbus.</b> İç juguler venin kafa tabanı altındaki genişlemesine kateter kraniyal yönde ilerletilir; O₂ basıncı, Hb O₂ satürasyonu ve laktat aynı taraf yarıkürede CBF\'nin genel yeterliğini gösterir, bölgesel bilgi vermez. [[K1 s. 204]]',
      fp: '<b>fMRI ve PET.</b> Akım–metabolizma eşleşmesiyle etkin bölgeleri bulur: fMRI O₂\'ce zengin ve fakir kanı, PET radyoaktif glukoz analoğunu izler. [[K1 s. 204–205]]',
      ks: '<b>Kety–Schmidt.</b> Fick ilkesi arteriyel ve juguler venöz N₂O derişimlerine uygulanır; yalnız global CBF ölçülür. [[K1 s. 205]]',
      xe: '<b>Ksenon-133.</b> Enjekte edilen ¹³³Xe\'nin bozunması gama kamerayla izlenir; bölgesel CBF verir. [[K1 s. 205]]',
    };
    const capEl = el.closest('.viz') && el.closest('.viz').querySelector('.viz-cap');
    CAP.tcd = capEl ? capEl.innerHTML : '';
    let ym = 'tcd', fz = 0;
    el.innerHTML = `<p class="f48-not"><span class="tag clin">klinikte en sık</span> TCD, juguler bulbus · <span class="tag">araştırma</span> Kety–Schmidt, ¹³³Xe</p>
      <div class="f48-kont">${segHtml('Ölçüm yöntemi', 'ym', Object.keys(Y).map((k) => [k, Y[k][0]]), ym)}</div>
      <div class="f48-g2 f48-olcum-g"><div class="f48-olcum-svg"></div>
        <div class="f48-kart"><div class="f48-kap"><span data-k="g">Global</span><span data-k="y">Yarıküre</span><span data-k="b">Bölgesel</span></div><h4 data-e="bas"></h4><p data-e="met"></p></div></div>`;
    const kS = el.querySelector('.f48-olcum-svg');
    let R = {}, dar = false;
    const ciz = () => {
      const W = 320, H = dar ? 250 : 300;
      const cx = 160, cy = 100, rx = 104, ry = 86;
      kS.innerHTML = `<svg class="f48-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Şematik baş ve boyun, önden görünüm">
        <defs>${okUc('f48-uc-o')}</defs>
        <path class="f48-omuz" d="M110 ${dar ? 236 : 262} Q80 ${dar ? 236 : 262} 30 ${dar ? 250 : 290} M210 ${dar ? 236 : 262} Q240 ${dar ? 236 : 262} 290 ${dar ? 250 : 290}"/>
        <path class="f48-boyun" d="M128 176 L124 ${dar ? 240 : 266} M192 176 L196 ${dar ? 240 : 266}"/>
        <ellipse class="f48-kafa" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>
        <path class="f48-yari" data-h="L" d="M${cx - 3} ${cy - 72} C${cx - 60} ${cy - 76} ${cx - 92} ${cy - 40} ${cx - 90} ${cy} C${cx - 88} ${cy + 40} ${cx - 50} ${cy + 66} ${cx - 3} ${cy + 64} Z"/>
        <path class="f48-yari" data-h="R" d="M${cx + 3} ${cy - 72} C${cx + 60} ${cy - 76} ${cx + 92} ${cy - 40} ${cx + 90} ${cy} C${cx + 88} ${cy + 40} ${cx + 50} ${cy + 66} ${cx + 3} ${cy + 64} Z"/>
        <g data-e="yama">${[[-50, -20, 'ok'], [44, -34, 'warn'], [-36, 30, 'v'], [52, 24, 'crit'], [-8, -46, 'ok']].map(([dx, dy, c]) => `<ellipse class="f48-yama f48-y-${c}" cx="${cx + dx}" cy="${cy + dy}" rx="20" ry="14"/>`).join('')}</g>
        <g data-e="fl">${[[-46, -30], [40, -20], [-20, 34]].map(([dx, dy]) => `<ellipse class="f48-leke" cx="${cx + dx}" cy="${cy + dy}" rx="13" ry="10"/>`).join('')}</g>
        <path class="f48-mca" d="M${cx - 18} ${cy + 40} Q${cx - 50} ${cy + 20} ${cx - 76} ${cy - 6} M${cx - 52} ${cy + 18} L${cx - 66} ${cy + 36} M${cx - 64} ${cy + 6} L${cx - 70} ${cy - 24}"/>
        <path class="f48-mca" d="M${cx + 18} ${cy + 40} Q${cx + 50} ${cy + 20} ${cx + 76} ${cy - 6} M${cx + 52} ${cy + 18} L${cx + 66} ${cy + 36} M${cx + 64} ${cy + 6} L${cx + 70} ${cy - 24}"/>
        <path class="f48-ven" d="M138 ${dar ? 240 : 266} L138 192 M182 ${dar ? 240 : 266} L182 192"/>
        <ellipse class="f48-bulb" cx="138" cy="186" rx="6" ry="8"/><ellipse class="f48-bulb" cx="182" cy="186" rx="6" ry="8"/>
        <g data-e="tcd"><polygon class="f48-koni" points="${cx - 100},${cy + 6} ${cx - 56},${cy - 18} ${cx - 50},${cy + 32}"/><rect class="f48-prob" x="${cx - 116}" y="${cy - 6}" width="14" height="24" rx="3"/>
          <g data-e="td"></g>${tx(cx - 52, cy + 60, 'kan hızı (MCA)', 'f48-ts f48-c-acc', 'middle')}${tx(cx - 116, cy - 14, 'prob', 'f48-ts f48-c-acc', 'start')}</g>
        <g data-e="jb"><path class="f48-kat" d="M196 ${dar ? 246 : 280} L184 ${dar ? 230 : 250} L182 196" marker-end="url(#f48-uc-o)"/>
          ${tx(206, 160, 'PO₂', 'f48-ts f48-rozet', 'start')}${tx(206, 176, 'SjO₂', 'f48-ts f48-rozet', 'start')}${tx(206, 190, '(Hb O₂ sat.)', 'f48-ts f48-rozet', 'start')}${tx(206, 206, 'laktat', 'f48-ts f48-rozet', 'start')}
          ${tx(194, 238, '↖ juguler bulbus', 'f48-ts', 'start')}</g>
        <g data-e="ks"><circle class="f48-ornek" cx="${dar ? 44 : 44}" cy="${dar ? 246 : 284}" r="6"/>${tx(56, dar ? 232 : 276, 'arter (kol)', 'f48-ts', 'start')}
          <circle class="f48-ornek" cx="182" cy="${dar ? 222 : 240}" r="6"/>${tx(194, dar ? 226 : 244, 'juguler ven', 'f48-ts', 'start')}
          ${tx(44, dar ? 222 : 262, 'N₂O', 'f48-ts f48-rozet', 'middle')}${tx(182, dar ? 208 : 226, 'N₂O', 'f48-ts f48-rozet', 'middle')}</g>
        <g data-e="xe"><path class="f48-gama" d="M${cx - 96} ${cy - 92} Q${cx} ${cy - 128} ${cx + 96} ${cy - 92}"/>${tx(cx, cy - 116, 'gama kamera', 'f48-ts f48-c-acc', 'middle')}
          <path class="f48-kat" d="M20 ${dar ? 226 : 262} L40 ${dar ? 242 : 280}"/><rect class="f48-prob" x="4" y="${dar ? 212 : 248}" width="20" height="10" rx="2" transform="rotate(38 14 ${dar ? 217 : 253})"/>${tx(30, dar ? 208 : 244, '¹³³Xe', 'f48-ts f48-rozet', 'start')}</g>
        ${tx(cx, cy - ry - 6, '', 'f48-ts', 'middle')}
      </svg>`;
      if (!dar) kS.querySelector('svg').setAttribute('viewBox', '0 -40 320 340');
      else kS.querySelector('svg').setAttribute('viewBox', '0 -40 320 290');
      const td = kS.querySelector('[data-e=td]');
      R.dots = [0, 1, 2, 3, 4].map((i) => ({ u: i / 5, e: mk('circle', { class: 'f48-art-d', r: 3 }, td) }));
      R.mca = (u) => { const t = u; const x0 = cx - 18, y0 = cy + 40, x1 = cx - 50, y1 = cy + 20, x2 = cx - 76, y2 = cy - 6; return [(1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * x1 + t * t * x2, (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * y1 + t * t * y2]; };
      R.g = {}; ['tcd', 'jb', 'ks', 'xe', 'yama', 'fl'].forEach((k) => { R.g[k] = kS.querySelector(`[data-e=${k}]`); });
      R.L = kS.querySelector('[data-h=L]'); R.R = kS.querySelector('[data-h=R]');
      guncelle(); adim(0);
    };
    const guncelle = () => {
      const y = Y[ym];
      Object.keys(R.g).forEach((k) => { R.g[k].style.display = 'none'; });
      if (R.g[ym]) R.g[ym].style.display = '';
      if (ym === 'fp') R.g.fl.style.display = '';
      if (ym === 'xe') R.g.yama.style.display = '';
      R.L.classList.toggle('on', ym === 'tcd' || ym === 'ks');
      R.R.classList.toggle('on', ym === 'jb' || ym === 'ks');
      el.querySelector('[data-e=bas]').textContent = y[0];
      el.querySelector('[data-e=met]').innerHTML = y[2];
      el.querySelectorAll('.f48-kap [data-k]').forEach((s) => s.classList.toggle('on', s.dataset.k === y[1]));
      capYaz(el, CAP[ym]);
    };
    const adim = (dt) => { if (!R.dots) return; if (!RM) fz += dt; R.dots.forEach((d) => { const u = (d.u + fz * 0.6) % 1; const [x, y] = R.mca(u); d.e.setAttribute('cx', x.toFixed(1)); d.e.setAttribute('cy', y.toFixed(1)); }); };
    el.querySelectorAll('[data-ym]').forEach((b) => b.addEventListener('click', () => { ym = b.dataset.ym; basSec(el, 'ym', ym); guncelle(); }));
    const dz = darIzle(el, (n) => { dar = n; el.querySelector('.f48-olcum-g').classList.toggle('f48-tek', n); ciz(); });
    const tk = ticker(el, adim);
    return () => { tk(); dz(); };
  };
})();
