/* Bölüm 58 · Elektrokardiyogram · bileşenler (tarif: docs/tasarim/fiz58.md; K1 s. 262–266).
   Hepsi şematiktir; kâğıt ölçeği: 25 mm/s → 1 mm = 40 ms, 5 mm = 0,2 s; dikeyde 10 mm = 1 mV. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fx = (v, d = 2) => String(+v.toFixed(d)).replace('.', ',').replace('-', '−');   // sondaki sıfırları atar
  const ff = (v, d = 2) => v.toFixed(d).replace('.', ',').replace('-', '−');             // sabit basamak
  const aci = (t) => (t > 0 ? '+' : t < 0 ? '−' : '') + Math.abs(t) + '°';
  const T = (x, y, s, c = '', a = '', extra = '') => `<text x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" class="f58-tx ${c}"${a ? ` text-anchor="${a}"` : ''}${extra}>${s}</text>`;
  const pt = (a) => a.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('');
  const pl = (pts, x) => {
    if (x <= pts[0][0]) return pts[0][1];
    for (let i = 1; i < pts.length; i++) if (x <= pts[i][0]) { const a = pts[i - 1], b = pts[i]; return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]); }
    return 0;
  };
  const seg = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const press = (root, key, v) => root.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const capOf = (el) => { const c = el.closest('.viz') && el.closest('.viz').querySelector('.viz-cap'); let last = ''; return (h) => { if (c && h !== last) { c.innerHTML = REF(h); last = h; } }; };
  /* dar (< 560 px) / geniş yerleşim: kipi değişince render(kip) yeniden çağrılır */
  function dk(el, render) {
    let m = '', ro = null;
    const chk = () => { const w = el.clientWidth, n = w && w < 560 ? 'dar' : 'genis'; if (n !== m) { m = n; render(n); } };
    chk();
    if (window.ResizeObserver) { ro = new ResizeObserver(chk); ro.observe(el); }
    return () => { if (ro) ro.disconnect(); };
  }
  /* ızgara: küçük kare s px, büyük kare 5s; desen başlangıcı (px, py) */
  function grid(id, x, y, w, h, s, px = x, py = y) {
    return `<defs><pattern id="${id}k" width="${s}" height="${s}" patternUnits="userSpaceOnUse" x="${px}" y="${py}"><path class="f58-gk" d="M${s} 0V${s}H0"/></pattern>` +
      `<pattern id="${id}b" width="${5 * s}" height="${5 * s}" patternUnits="userSpaceOnUse" x="${px}" y="${py}"><path class="f58-gb" d="M${5 * s} 0V${5 * s}H0"/></pattern></defs>` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="f58-pp"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}k)"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}b)"/>`;
  }
  const brk = (x1, x2, y, cls = 'f58-bk') => `<path class="${cls}" d="M${x1.toFixed(1)} ${y - 5}V${y}H${x2.toFixed(1)}V${y - 5}"/>`;

  /* ---------- ortak: normal DII kompleksi (ms, mV) ---------- */
  const QN = [[0, 0], [10, -0.1], [20, 0], [40, 1.2], [65, 0], [75, -0.25], [90, 0]];
  const QB = [[0, 0], [20, 0.6], [40, 1.0], [60, 0.55], [80, 1.0], [100, 0.3], [120, -0.15], [140, 0]];
  const QP = [[0, 0], [20, -0.4], [50, 0], [70, 1.0], [100, 0]];
  const QW = [[0, 0], [50, 0.4], [70, 1.2], [95, 0], [105, -0.25], [120, 0]];
  const PB = [[0, 0], [35, 0.22], [60, 0.15], [85, 0.25], [120, 0]];
  const O0 = () => ({ pk: 'n', qs: 160, qrs: QN, ts: 360, td: 200, ta: 0.3, st: '' });
  const ramp = (t, a, b, r) => (t < a || t > b ? 0 : Math.min(1, (t - a) / r, (b - t) / r));
  function ecg(t, o) {
    let v = 0;
    if (o.pk === 'n') { if (t >= 0 && t <= 90) v += 0.15 * Math.sin(Math.PI * t / 90); }
    else if (o.pk === 'b') v += pl(PB, t);
    else if (t >= 0 && t < o.qs - 10) v += 0.028 * Math.sin(t * 0.21) + 0.02 * Math.sin(t * 0.47 + 1) + 0.012 * Math.sin(t * 0.9);
    const qe = o.qs + o.qrs[o.qrs.length - 1][0];
    v += pl(o.qrs, t - o.qs);
    if (o.st === 'c') v -= 0.15 * ramp(t, qe, o.ts, 12);
    if (o.st === 'y' && t > qe && t < o.ts + o.td) v += 0.25 * Math.sin(Math.PI * (t - qe) / (o.ts + o.td - qe));
    if (t >= o.ts && t <= o.ts + o.td) {
      const u = (t - o.ts) / o.td;
      v += o.ta * (u < 0.6 ? (1 - Math.cos(Math.PI * u / 0.6)) / 2 : (1 + Math.cos(Math.PI * (u - 0.6) / 0.4)) / 2);
    }
    return v;
  }
  const O_ = O0();

  /* =====================================================================
     1 · Büyük kare sayısından kalp hızına
     ===================================================================== */
  VIZ.f58_hiz = (el) => {
    const cap = capOf(el);
    let n = 5, duz = true, akis = !RM, sc = 0, kip = 'genis', stop = () => {};
    const FAC = [0.7, 1.3, 0.9, 1.2], CUM = [0, 0.7, 2, 2.9];
    const rr = () => n * 0.2;
    const tR = (k) => { if (duz) return k * rr(); const q = Math.floor(k / 4), i = ((k % 4) + 4) % 4; return rr() * (4.1 * q + CUM[i]); };
    const hr = (b) => Math.round(300 / b);
    const P = () => kip === 'dar'
      ? { W: 360, MM: 3, x0: 10, x1: 350, xs: 62, xr0: 86, y0: 56, y1: 246, yb: 186 }
      : { W: 640, MM: 4, x0: 20, x1: 620, xs: 112, xr0: 152, y0: 60, y1: 260, yb: 205 };
    const html = () => {
      const p = P();
      return `<div class="f58-ctl btn-row">
        <label class="f58-rng"><span>R–R (büyük kare) <b data-o="n"></b></span><input type="range" min="1.5" max="8" step="0.5" value="${n}" aria-label="R–R aralığı, büyük kare sayısı"></label>
        ${seg('Ritim', 'r', [['d', 'Düzenli'], ['z', 'Düzensiz']], duz ? 'd' : 'z')}
        <button type="button" class="btn ghost" data-a="akis" aria-pressed="${String(akis)}"></button></div>
        <div class="f58-oku" data-o="oku" aria-live="polite"></div>
        <svg class="f58-svg" viewBox="0 0 ${p.W} 300" role="img" aria-label="Akan EKG kâğıdı: iki R tepesi arasındaki büyük kareler sayılır, 300 bölü büyük kare sayısı kalp hızını verir">
          <defs><clipPath id="f58-hiz-cp"><rect x="${p.xs}" y="${p.y0}" width="${p.x1 - p.xs}" height="${p.y1 - p.y0}"/></clipPath>
          <marker id="f58-hiz-mk" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto"><circle cx="4" cy="4" r="3" class="f58-mk"/></marker></defs>
          <g data-o="dyn"></g>
          <path class="f58-tr" d="M${p.x0 + 4} ${p.yb}h${p.MM}v${-10 * p.MM}h${5 * p.MM}v${10 * p.MM}h${p.MM}"/>
          ${kip === 'dar' ? T(p.x0 + 4, p.yb + 14, '1 mV', 'f58-mu f58-s') : T(p.x0 + 4, p.yb + 16, '1 mV = 10 mm', 'f58-mu f58-s')}
          <rect x="${p.x0}" y="${p.y0}" width="${p.x1 - p.x0}" height="${p.y1 - p.y0}" class="f58-fr"/>
          ${kip === 'dar'
            ? `<rect x="12" y="262" width="15" height="15" class="f58-sm"/>${T(32, 274, 'büyük kare = 5 mm = 0,2 s', 'f58-mu f58-s')}<rect x="12" y="285" width="3" height="3" class="f58-sm"/>${T(32, 290, '1 kk = 1 mm = 40 ms', 'f58-mu f58-s')}${T(350, 290, '25 mm/s', 'f58-mu f58-s', 'end')}`
            : `<rect x="24" y="268" width="20" height="20" class="f58-sm"/>${T(50, 283, 'büyük kare = 5 mm = 0,2 s', 'f58-mu f58-s')}<rect x="244" y="276" width="4" height="4" class="f58-sm"/>${T(254, 283, '1 kk = 1 mm = 40 ms', 'f58-mu f58-s')}${T(620, 283, '25 mm/s', 'f58-mu f58-s', 'end')}`}
        </svg>`;
    };
    const dyn = () => {
      const p = P(), px = 25 * p.MM, f = Math.min(1, (rr() * (duz ? 1 : 0.7)) * 1000 / 640);
      let s = grid('f58-hg', p.x0, p.y0, p.x1 - p.x0, p.y1 - p.y0, p.MM, p.x0 - sc, p.y0);
      s += `<line class="f58-iz" x1="${p.xs}" x2="${p.x1}" y1="${p.yb}" y2="${p.yb}"/>`;
      const X = (t) => p.xr0 + t * px - sc, Y = (v) => p.yb - v * 10 * p.MM;
      const ks = [], k0 = Math.floor(sc / (px * rr() * 1.03)) - 4;
      for (let k = k0; ; k++) { const x = X(tR(k)); if (x > p.x1 + 80) break; ks.push([k, x]); }
      let shade = '', d = '', lab = '';
      for (let i = 0; i < ks.length; i++) {
        const [k, x] = ks[i];
        let first = true;
        for (let t = 0; t <= 560; t += 5) { const xx = X(tR(k) - 0.2 * f + t * f / 1000); d += (first && !d ? 'M' : 'L') + xx.toFixed(1) + ' ' + Y(ecg(t, O_)).toFixed(1); first = false; }
        if (i + 1 < ks.length) {
          const x2 = ks[i + 1][1];
          if (x >= p.xs - 1 && x2 <= p.x1 + 1) {
            const nn = (tR(k + 1) - tR(k)) / 0.2;
            shade += `<rect x="${x.toFixed(1)}" y="${p.y0}" width="${(x2 - x).toFixed(1)}" height="${p.y1 - p.y0}" class="${duz ? 'f58-sh' : 'f58-sh f58-shz'}"/>`;
            lab += brk(x, x2, p.y0 + 24, duz ? 'f58-bk' : 'f58-bk f58-bkz');
            for (let j = 1; j <= Math.floor(nn + 1e-6); j++) lab += T(x + (j - 0.5) * 5 * p.MM, p.y0 + 40, String(j), 'f58-ac f58-s', 'middle');
            if (!duz) lab += T((x + x2) / 2, p.y0 + 14, `${fx(nn)} → ${hr(nn)}`, 'f58-cr f58-s f58-b', 'middle');
          }
        }
      }
      s += shade + `<g clip-path="url(#f58-hiz-cp)"><path class="f58-tr" d="${d}"/>${lab}</g>`;
      return s;
    };
    const oku = () => {
      const r = rr();
      return duz ? `<span>R–R = <b>${n} × 0,2 s = ${fx(r)} s</b></span><span>Kalp hızı = 300 / ${fx(n)} = <b>${hr(n)} vuru/dk</b></span>`
        : `<span class="f58-cr"><b>R–R değişiyor: kısayol geçersiz</b></span><span>Ardışık aralıklar: 300 / n, her biri başka bir hız verir.</span>`;
    };
    const metin = () => {
      if (!duz) return '<b>Düzensiz ritim.</b> Ardışık R–R aralıkları farklı olduğundan 300 / büyük kare kısayolu tek bir hız vermez; kısayol yalnız düzenli ritimde geçerlidir. [[K1 s. 262]]';
      const ek = n === 1.5 ? ' Kısa R–R, hızlı kalp: 200 vuru/dk.' : n === 3 ? ' 100 vuru/dk.' : n === 6 ? ' 50 vuru/dk.' : '';
      return `<b>${fx(n)} büyük kare.</b> R–R = ${fx(n)} × 0,2 s = ${fx(rr())} s; hız 300 / ${fx(n)} = ${hr(n)} vuru/dk.${ek} R–R aralığını kaydırıcıyla değiştirin. [[K1 s. 262]]`;
    };
    const upd = () => {
      el.querySelector('[data-o=n]').textContent = fx(n) + ' büyük kare';
      el.querySelector('[data-o=oku]').innerHTML = oku();
      el.querySelector('[data-o=dyn]').innerHTML = dyn();
      const b = el.querySelector('[data-a=akis]'); b.textContent = akis ? 'Duraklat' : 'Akıt'; b.setAttribute('aria-pressed', String(akis));
      cap(metin());
    };
    const render = (k) => {
      stop(); kip = k; el.innerHTML = html();
      el.querySelector('input').addEventListener('input', (e) => { n = +e.target.value; upd(); });
      el.querySelectorAll('[data-r]').forEach((b) => b.addEventListener('click', () => { duz = b.dataset.r === 'd'; press(el, 'r', b.dataset.r); upd(); }));
      el.querySelector('[data-a=akis]').addEventListener('click', () => { akis = !akis; upd(); });
      if (RM) el.querySelector('[data-a=akis]').hidden = true;
      upd();
      stop = ticker(el, (dt) => { if (!akis || RM) return; sc += dt * 25 * P().MM; el.querySelector('[data-o=dyn]').innerHTML = dyn(); });
    };
    const off = dk(el, render);
    return () => { off(); stop(); };
  };

  /* =====================================================================
     2 · DII'de normal EKG: dokun – ölç – boz
     ===================================================================== */
  const BOZ = {
    P: [['n', 'Normal'], ['af', 'AF: P yok'], ['mi', 'Mitral darlığı']],
    PR: [['n', 'Normal'], ['avb', 'Birinci derece AV blok'], ['wpw', 'WPW (δ dalgası)']],
    QRS: [['n', 'Normal'], ['dal', 'Dal bloğu'], ['pq', 'Patolojik Q']],
    ST: [['n', 'Normal'], ['cok', 'İskemi: çökme'], ['yuk', 'Enfarktüs: yükselme']],
    T: [['n', 'Normal'], ['ters', 'Ventrikül iskemisi: ters T']],
    QT: [['n', 'Normal'], ['uqt', 'Uzun QT']],
  };
  const DG = {
    P: ['Atriyal depolarizasyon', '&lt; 100 ms (&lt; 2,5 kk); QRS\'den küçük'],
    PR: ['AV düğüm gecikmesi (P başından Q başına)', '0,12–0,2 s (3–5 kk)'],
    QRS: ['Ventrikül depolarizasyonu ve yayılımı', '&lt; 0,12 s (3 kk)'],
    ST: ['İzoelektrik segment; aksiyon potansiyelinin plato evresi', 'İzoelektrik'],
    T: ['Ventrikül repolarizasyonu', 'QRS\'den geniş'],
    QT: ['Depolarizasyonun başından repolarizasyonun sonuna: aksiyon potansiyelinin süresi', 'QTc &lt; 0,44 s (11 kk)'],
  };
  const DCAP = {
    'P.n': '<b>P dalgası.</b> Atriyal depolarizasyon; süresi &lt; 100 ms (&lt; 2,5 küçük kare). "Bozulma"yı seçince klinik örnek çizilir. [[K1 s. 262]]',
    'P.af': '<b>Atriyal fibrilasyon.</b> Atriyal depolarizasyon eşgüdümsüz olduğundan P dalgası yoktur. [[K1 s. 262]]',
    'P.mi': '<b>Mitral darlığı.</b> Sol atriyum hipertrofisi daha büyük, bazen çift tepeli (bifid) bir P dalgası yapar. [[K1 s. 262]]',
    'PR.n': '<b>PR aralığı.</b> Atriyal ve ventriküler depolarizasyonun başlangıçları arasındaki süre, yani AV düğüm gecikmesi. P\'nin başından Q\'nun (R\'nin değil) başına ölçülür; normali 0,12–0,2 s (3–5 küçük kare). [[K1 s. 262]]',
    'PR.avb': '<b>Birinci derece AV düğüm bloğu.</b> PR aralığı uzar (burada 0,28 s = 7 küçük kare). [[K1 s. 262]]',
    'PR.wpw': '<b>Wolff–Parkinson–White sendromu.</b> QRS\'nin başındaki δ dalgası PR aralığını kısaltır (burada 0,10 s). [[K1 s. 262]]',
    'QRS.n': '<b>QRS kompleksi.</b> Ventrikül depolarizasyonu ve yayılımı; normali &lt; 0,12 s (3 küçük kare). [[K1 s. 262]]',
    'QRS.dal': '<b>Dal bloğu.</b> Sağ ya da sol dalda iletim kusuru QRS\'yi genişletir (burada 0,14 s). [[K1 s. 262]]',
    'QRS.pq': '<b>Patolojik Q dalgası.</b> Süresi &gt; 40 ms (bir küçük kare) ya da genliği ardından gelen R\'nin %25\'inden büyük. Nedenleri: pulmoner emboli (klasik S1Q3T3 örüntüsü) ya da geçirilmiş miyokard enfarktüsü. [[K1 s. 262]]',
    'ST.n': '<b>ST segmenti.</b> QRS\'yi izleyen izoelektrik segment; kardiyak aksiyon potansiyelinin plato evresine karşılık gelir. [[K1 s. 262]]',
    'ST.cok': '<b>ST çökmesi.</b> Miyokard iskemisinde görülür. [[K1 s. 262]]',
    'ST.yuk': '<b>ST yükselmesi.</b> Miyokard enfarktüsünde görülür. [[K1 s. 262]]',
    'T.n': '<b>T dalgası.</b> Ventrikül repolarizasyon dalgası. Repolarizasyon depolarizasyon kadar hızlı olmadığından T, QRS\'den geniştir. [[K1 s. 262]]',
    'T.ters': '<b>Ters T dalgası.</b> Ventrikül iskemisi neden olabilir. [[K1 s. 262]]',
    'QT.n': '<b>QT aralığı.</b> Ventrikül depolarizasyonunun başından repolarizasyonun bitişine; kardiyak aksiyon potansiyelinin süresidir. Normal QTc &lt; 0,44 s (11 küçük kare). [[K1 s. 262–263]]',
    'QT.uqt': '<b>Uzun QT.</b> Uzamış QTc ventriküler taşiaritmilere yatkınlıkla ilişkilidir (burada QTc 0,52 s). [[K1 s. 263]]',
  };
  function dOpts(b) {
    const o = O0();
    if (b === 'af') o.pk = 'af'; else if (b === 'mi') o.pk = 'b';
    else if (b === 'avb') { o.qs = 280; o.ts = 480; }
    else if (b === 'wpw') { o.qs = 100; o.qrs = QW; }
    else if (b === 'dal') o.qrs = QB; else if (b === 'pq') o.qrs = QP;
    else if (b === 'cok') o.st = 'c'; else if (b === 'yuk') o.st = 'y';
    else if (b === 'ters') o.ta = -0.25; else if (b === 'uqt') o.td = 320;
    return o;
  }
  const qEnd = (o) => o.qs + o.qrs[o.qrs.length - 1][0];
  function dRng(part, o, b) {
    if (part === 'P') return [0, b === 'mi' ? 120 : 90];
    if (part === 'PR') return [0, o.qs];
    if (part === 'QRS') return b === 'pq' ? [o.qs, o.qs + 50] : [o.qs, qEnd(o)];
    if (part === 'ST') return [qEnd(o), o.ts];
    if (part === 'T') return [o.ts, o.ts + o.td];
    return [o.qs, o.ts + o.td];
  }
  const msL = (d) => `${d} ms · ${fx(d / 40)} kk`;
  function dEtiket(part, b, o) {
    const r = dRng(part, o, b), d = r[1] - r[0];
    if (b === 'af') return 'P dalgası yok';
    if (b === 'pq') return 'Q = 50 ms (&gt; 40 ms) · Q/R = %40 (&gt; %25)';
    if (b === 'cok') return 'ST −0,15 mV (1,5 kk çökme)';
    if (b === 'yuk') return 'ST +0,25 mV (2,5 kk yükselme)';
    if (b === 'ters') return 'T −0,25 mV (ters)';
    if (b === 'uqt') return msL(d) + ' · QTc 0,52 s';
    return msL(d);
  }

  VIZ.f58_dalga = (el) => {
    const cap = capOf(el);
    let part = 'P', boz = 'n', kip = 'genis', stop = () => {};
    const G = () => kip === 'dar'
      ? { W: 360, H: 404, S: 17, X0: 18, TMIN: -40, TMAX: 720, Y0: 10, two: false }
      : { W: 640, H: 350, S: 14, X0: 60, TMIN: -80, TMAX: 1400, Y0: 20, two: true };
    const html = () => {
      const g = G();
      return `<div class="f58-ctl">${seg('Parça', 'p', ['P', 'PR', 'QRS', 'ST', 'T', 'QT'].map((p) => [p, p]), part)}
        <div class="f58-bz"><span class="f58-lb">Bozulma</span><div data-o="bz"></div></div></div>
        <svg class="f58-svg" viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="DII'de normal EKG kompleksi; seçili parça vurgulanır ve süresi ölçülür"><g data-o="sv"></g></svg>
        <dl class="kv f58-kv" data-o="kv"></dl>
        <div class="legend"><span>1 küçük kare = 40 ms yatay, 0,1 mV dikey</span><span>büyük kare = 0,2 s</span></div>`;
    };
    const ciz = () => {
      const g = G(), o = dOpts(boz), o0 = O0();
      const X = (t) => g.X0 + (t - g.TMIN) / 40 * g.S, Y = (v) => g.Y0 + (1.5 - v) / 0.1 * g.S;
      const gw = (g.TMAX - g.TMIN) / 40 * g.S, gh = 21 * g.S;
      const path = (f, a, b) => { let d = ''; for (let t = a; t <= b; t += 5) d += (d ? 'L' : 'M') + X(t).toFixed(1) + ' ' + Y(f(t)).toFixed(1); return d; };
      let s = grid('f58-dg', g.X0, g.Y0, gw, gh, g.S);
      s += `<rect x="${g.X0}" y="${g.Y0}" width="${gw}" height="${gh}" class="f58-fr"/><line class="f58-iz" x1="${g.X0}" x2="${g.X0 + gw}" y1="${Y(0)}" y2="${Y(0)}"/>`;
      if (g.two) {
        s += `<text x="8" y="${Y(1) + 4}" class="f58-tx f58-mu f58-s">1 mV</text><text x="8" y="${Y(0) + 4}" class="f58-tx f58-mu f58-s">0</text><text x="8" y="${Y(-0.5) + 4}" class="f58-tx f58-mu f58-s">−0,5</text>`;
      }
      const r = dRng(part, o, boz);
      s += `<rect x="${X(r[0]).toFixed(1)}" y="${g.Y0}" width="${(X(r[1]) - X(r[0])).toFixed(1)}" height="${gh}" class="f58-band"/>`;
      if (g.two) s += `<path class="f58-tr f58-trm" d="${path((t) => ecg(t - 1000, o0), 995, g.TMAX)}"/>`;
      const t1 = g.two ? 995 : g.TMAX;
      if (boz === 'n') {
        s += `<path class="f58-tr" d="${path((t) => ecg(t, o), g.TMIN, t1)}"/><path class="f58-tr f58-tra" d="${path((t) => ecg(t, o), Math.max(r[0], g.TMIN), r[1])}"/>`;
      } else {
        s += `<path class="f58-tr f58-trd" d="${path((t) => ecg(t, o0), g.TMIN, t1)}"/><path class="f58-tr f58-trc" d="${path((t) => ecg(t, o), g.TMIN, t1)}"/>`;
      }
      if (boz === 'wpw') s += T(X(100) - 14, Y(0.4), 'δ', 'f58-cr f58-b', 'middle', ' style="font-size:15px"');
      if (boz === 'pq') s += T(X(180), Y(-0.4) + 15, 'Q', 'f58-cr f58-s f58-b', 'middle');
      /* dokunulabilir bölgeler */
      const HIT = [['PR', 90, 160], ['P', 0, 90], ['QRS', 160, 250], ['ST', 250, 360], ['T', 360, 560]];
      HIT.forEach(([p, a, b]) => { s += `<rect class="f58-hit" data-p="${p}" x="${X(a).toFixed(1)}" y="${g.Y0}" width="${(X(b) - X(a)).toFixed(1)}" height="${gh}" tabindex="0" role="button" aria-label="${p} parçasını seç"/>`; });
      /* ölçüm ayracı */
      const by = g.Y0 + gh + 8, xa = X(r[0]), xb = X(r[1]);
      s += brk(xa, xb, by, 'f58-bk f58-bkb') + `<path class="f58-bk f58-bkb" d="M${xa.toFixed(1)} ${by}v0"/>`;
      const lab = dEtiket(part, boz, o), lx = clamp((xa + xb) / 2, g.W * 0.27, g.W * 0.73);
      s += `<text x="${lx.toFixed(1)}" y="${by + 18}" class="f58-tx ${boz === 'n' ? 'f58-ac' : 'f58-cr'} f58-b" text-anchor="middle" style="font-size:12.5px">${lab}</text>`;
      el.querySelector('[data-o=sv]').innerHTML = s;
      /* bilgi kutusu */
      const bu = boz === 'n' ? (part === 'ST' ? 'izoelektrik (' + msL(r[1] - r[0]) + ')' : part === 'T' ? msL(r[1] - r[0]) + ' (QRS 90 ms)' : msL(r[1] - r[0])) : lab;
      el.querySelector('[data-o=kv]').innerHTML = `<dt>Gösterir</dt><dd>${DG[part][0]}</dd><dt>Normal</dt><dd>${DG[part][1]}</dd><dt>Bu çizimde</dt><dd>${bu}</dd>`;
      cap(DCAP[part + '.' + boz]);
    };
    const bzUi = () => { el.querySelector('[data-o=bz]').innerHTML = seg('Bozulma', 'b', BOZ[part], boz); el.querySelectorAll('[data-b]').forEach((b) => b.addEventListener('click', () => { boz = b.dataset.b; press(el, 'b', boz); ciz(); })); };
    const sec = (p) => { part = p; boz = 'n'; press(el, 'p', p); bzUi(); ciz(); };
    const render = (k) => {
      kip = k; el.innerHTML = html(); bzUi(); ciz();
      el.querySelectorAll('[data-p]').forEach((b) => { if (b.tagName === 'BUTTON') b.addEventListener('click', () => sec(b.dataset.p)); });
      const svg = el.querySelector('svg');
      svg.addEventListener('click', (e) => { const h = e.target.closest('[data-p]'); if (h && h.tagName !== 'BUTTON') sec(h.dataset.p); });
      svg.addEventListener('keydown', (e) => { const h = e.target.closest && e.target.closest('.f58-hit'); if (h && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sec(h.dataset.p); } });
    };
    const off = dk(el, render);
    return () => { off(); stop(); };
  };

  /* =====================================================================
     3 · Bazett: hız değişince QT ve QTc
     ===================================================================== */
  VIZ.f58_qtc = (el) => {
    const cap = capOf(el);
    let hr = 60, uz = false, kip = 'genis';
    const html = () => {
      const w = kip === 'dar' ? 360 : 640, h = kip === 'dar' ? 460 : 324;
      return `<div class="f58-ctl btn-row"><label class="f58-rng"><span>Kalp hızı <b data-o="hr"></b></span><input type="range" min="40" max="150" step="5" value="${hr}" aria-label="Kalp hızı, vuru/dk"></label>${seg('Hasta', 'h', [['n', 'Normal QT'], ['u', 'Uzun QT']], uz ? 'u' : 'n')}</div>
        <svg class="f58-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="Kalp hızı değişince ölçülen QT kısalır; Bazett formülüyle düzeltilmiş QTc sabit kalır"><g data-o="sv"></g></svg>`;
    };
    const ciz = () => {
      const dar = kip === 'dar', W = dar ? 360 : 640;
      const base = uz ? 0.5 : 0.4, rr = 60 / hr, qt = base * Math.sqrt(rr), qtc = base, QTms = qt * 1000;
      const MM = dar ? 3 : 4, px = 25 * MM, sx = dar ? 10 : 20, ex = dar ? 350 : 620, sy = dar ? 0 : 10, ey = 170, yb = dar ? 110 : 120;
      const X = (t) => sx + 16 + t * px / 1000, Y = (v) => yb - v * 10 * MM;
      let s = grid('f58-qg', sx, sy, ex - sx, ey - sy, MM) + `<rect x="${sx}" y="${sy}" width="${ex - sx}" height="${ey - sy}" class="f58-fr"/><line class="f58-iz" x1="${sx}" x2="${ex}" y1="${yb}" y2="${yb}"/>`;
      const qs = clamp(rr * 1000 - QTms - 100, 60, 160), pw = Math.min(90, qs - 10);
      const val = (t) => {
        let v = 0;
        if (t >= 0 && t <= pw) v += 0.15 * Math.sin(Math.PI * t / pw);
        v += pl(QN, t - qs);
        const u = (t - qs - 90) / (QTms - 90);
        if (u >= 0.355 && u <= 1) { const w = (u - 0.355) / 0.645; v += 0.3 * (w < 0.6 ? (1 - Math.cos(Math.PI * w / 0.6)) / 2 : (1 + Math.cos(Math.PI * (w - 0.6) / 0.4)) / 2); }
        return v;
      };
      let d = '';
      for (let k = 0; X(k * rr * 1000) < ex + 20; k++) for (let t = 0; t <= Math.min(QTms + qs + 5, rr * 1000 - 5); t += 5) { const x = X(k * rr * 1000 + t); if (x <= ex) d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + Y(val(t)).toFixed(1); }
      s += `<path class="f58-tr" d="${d}"/>`;
      const r1 = X(qs + 40), r2 = r1 + rr * px, qa = X(qs), qb = X(qs + QTms);
      s += brk(r1, Math.min(r2, ex), sy + 40, 'f58-bk f58-bkz') + T((r1 + Math.min(r2, ex)) / 2, sy + 31, `R–R = ${ff(rr)} s`, 'f58-cr f58-s f58-b', 'middle');
      s += `<path class="f58-bk" d="M${qa.toFixed(1)} ${yb + 18}V${yb + 24}H${qb.toFixed(1)}V${yb + 18}"/>` + T(qa, yb + 40, `QT = ${ff(qt)} s (${fx(qt * 25)} kk)`, 'f58-ac f58-b f58-s');
      /* formül kutusu */
      const fy = dar ? 196 : 200;
      s += T(sx, fy + 6, 'Bazett formülü', 'f58-mu f58-s');
      s += T(sx, fy + 34, 'QTc = QT / √(R–R)', 'f58-tx f58-b', '', ' style="font-size:17px"');
      s += T(sx, fy + 62, `= ${ff(qt)} / √${ff(rr)} = <tspan class="f58-ac f58-b" style="font-size:20px">${ff(qtc)} s</tspan>`, 'f58-tx', '', ' style="font-size:16px"');
      const uzun = qtc >= 0.44;
      s += T(sx, fy + 90, uzun ? 'uzun (≥ 0,44 s)' : 'normal (&lt; 0,44 s)', (uzun ? 'f58-cr' : 'f58-ok') + ' f58-b');
      /* grafik */
      const c0 = dar ? 50 : 372, c1 = dar ? 258 : 560, y0 = dar ? 300 : 196, y1 = dar ? 424 : 288;
      const yv = (v) => y1 - (v - 0.2) / 0.45 * (y1 - y0), xh = (h) => c0 + (h - 40) / 110 * (c1 - c0);
      s += `<rect x="${c0}" y="${y0}" width="${c1 - c0}" height="${yv(0.44) - y0}" class="f58-crs"/><rect x="${c0}" y="${y0}" width="${c1 - c0}" height="${y1 - y0}" class="f58-fr"/>`;
      s += `<line class="f58-lim" x1="${c0}" x2="${c1}" y1="${yv(0.44)}" y2="${yv(0.44)}"/>`;
      [0.2, 0.44, 0.65].forEach((v) => { s += T(c0 - 4, yv(v) + 4, ff(v) + ' s', 'f58-mu f58-s', 'end'); });
      [40, 60, 100, 150].forEach((h) => { s += T(xh(h), y1 + 14, String(h), 'f58-mu f58-s', 'middle'); });
      s += T((c0 + c1) / 2, y1 + 28, 'kalp hızı (vuru/dk)', 'f58-mu f58-s', 'middle');
      let dq = ''; for (let h = 40; h <= 150; h += 5) dq += (dq ? 'L' : 'M') + xh(h).toFixed(1) + ' ' + yv(base * Math.sqrt(60 / h)).toFixed(1);
      s += `<path class="f58-tr" d="${dq}"/><line class="f58-qtc" x1="${c0}" x2="${c1}" y1="${yv(qtc)}" y2="${yv(qtc)}"/>`;
      s += `<circle cx="${xh(hr)}" cy="${yv(qt)}" r="5" class="f58-dot"/><circle cx="${xh(hr)}" cy="${yv(qtc)}" r="5" class="f58-dot f58-dota"/>`;
      const L = [[yv(qt) , 'QT ölçülen', 'f58-tx'], [yv(qtc), 'QTc', 'f58-ac f58-b'], [yv(0.44), 'sınır 0,44 s', 'f58-cr']].sort((a, b) => a[0] - b[0]);
      for (let i = 1; i < 3; i++) if (L[i][0] - L[i - 1][0] < 13) L[i][0] = L[i - 1][0] + 13;
      L.forEach((l) => { s += T(c1 + 6, l[0] + 4, l[1], l[2] + ' f58-s', 'start'); });
      el.querySelector('[data-o=sv]').innerHTML = s;
      el.querySelector('[data-o=hr]').textContent = hr + ' vuru/dk';
      let c;
      if (uz) c = `<b>Uzun QT.</b> QTc ${ff(qtc)} s, 0,44 s sınırının üstünde; uzamış QTc ventriküler taşiaritmilere yatkınlıkla ilişkilidir. [[K1 s. 263]]`;
      else if (hr === 60) c = '<b>60 vuru/dk.</b> R–R = 1 s, QT = 0,40 s → QTc = 0,40 / √1 = 0,40 s: normal (&lt; 0,44 s). Hızı ve QT\'yi değiştirin. [[K1 s. 262–263]]';
      else if (hr > 60) c = `<b>${hr} vuru/dk.</b> Aksiyon potansiyeli kısalır, QT ${ff(qt)} s'ye iner; QT / √(R–R) yine ${ff(qtc)} s verir. Kısa QT'ye bakıp aldanmamak için düzeltme gerekir. [[K1 s. 262–263]]`;
      else c = `<b>${hr} vuru/dk.</b> ${qt > 0.44 ? `Ölçülen QT ${ff(qt)} s, 0,44 s'yi aşsa da` : `Ölçülen QT ${ff(qt)} s'ye uzar ama`} QTc ${ff(qtc)} s: normal. Sınır düzeltilmiş QT için geçerlidir. [[K1 s. 262–263]]`;
      cap(c);
    };
    const render = (k) => {
      kip = k; el.innerHTML = html(); ciz();
      el.querySelector('input').addEventListener('input', (e) => { hr = +e.target.value; ciz(); });
      el.querySelectorAll('[data-h]').forEach((b) => b.addEventListener('click', () => { uz = b.dataset.h === 'u'; press(el, 'h', b.dataset.h); ciz(); }));
    };
    return dk(el, render);
  };

  /* =====================================================================
     ortak: adım adım oynatıcı (f58_kaynak, f58_qrs)
     ===================================================================== */
  function adimli(el, S, c) {
    const q = (a) => el.querySelector(`[data-a="${a}"]`), sv = el.querySelector('.f58-sv'), say = el.querySelector('[data-o=say]');
    let hold = 0;
    const ciz = () => {
      sv.innerHTML = c.ciz(S.s, S.p);
      say.textContent = c.say(S.s);
      q('geri').disabled = S.s <= 0; q('ileri').disabled = S.s >= c.n;
      const o = q('oyna'); o.textContent = S.play ? 'Duraklat' : 'Oynat'; o.setAttribute('aria-pressed', String(S.play));
      c.cap(S.s); if (c.sync) c.sync(S.s);
    };
    const go = (s) => { S.s = clamp(s, 0, c.n); hold = 0; S.p = RM || !c.dur[S.s] ? c.rm[S.s] : 0; ciz(); };
    q('geri').addEventListener('click', () => { S.play = false; go(S.s - 1); });
    q('ileri').addEventListener('click', () => { S.play = false; go(S.s + 1); });
    q('basa').addEventListener('click', () => { S.play = false; go(c.s0 === undefined ? 0 : 0); });
    q('oyna').addEventListener('click', () => { if (S.play) { S.play = false; ciz(); return; } S.play = true; if (S.s >= c.n && S.p >= 1) go(0); else ciz(); });
    if (RM) q('oyna').hidden = true;
    ciz();
    return ticker(el, (dt) => {
      if (RM) return;
      if (S.p < 1 && c.dur[S.s]) { S.p = Math.min(1, S.p + dt / c.dur[S.s]); ciz(); return; }
      if (S.play) { hold += dt; if (hold > c.hold) { if (S.s < c.n) go(S.s + 1); else { S.play = false; ciz(); } } }
    });
  }
  const ADIM_CTL = (extra = '') => `<div class="f58-ctl btn-row"><button type="button" class="btn ghost" data-a="geri">Geri</button><span class="f58-say" data-o="say" aria-live="polite"></span><button type="button" class="btn ghost" data-a="ileri">İleri</button><button type="button" class="btn" data-a="oyna" aria-pressed="false">Oynat</button><button type="button" class="btn ghost" data-a="basa">Baştan</button>${extra}</div>`;

  /* =====================================================================
     4 · Zar üzerinde ilerleyen dalga ve elektrodun gördüğü
     ===================================================================== */
  VIZ.f58_kaynak = (el) => {
    const cap = capOf(el);
    const S = { s: 0, p: 1, play: false };
    let kip = 'genis', grp = 'ven', stop = () => {};
    const CAP = [
      '<b>Dinlenim.</b> Zarın dışı içine göre pozitiftir. "Oynat"a basın. [[K1 s. 263]]',
      '<b>Depolarizasyon dalgası.</b> Aksiyon potansiyeli başlayınca zarın dışı içine göre negatifleşir; kutbun değiştiği cephede yerel akımlar doğar. Dışarıdan bakan biri zar boyunca ilerleyen bir dalga görür. [[K1 s. 263–264]]',
      '<b>Deriye iletim.</b> Yerel akımlar hücre dışı sıvıdan deri yüzeyine iletilir; araştırıcı elektrot, depolarizasyon dalgası ona doğru ilerlerken pozitif bir sapma kaydeder. [[K1 s. 263–264]]',
      '<b>Repolarizasyon dalgası.</b> Aksiyon potansiyelinden sonra zar dinlenim durumuna, dışı içine göre pozitif hâle döner; bu da zar boyunca ilerleyen ikinci bir dalgadır. [[K1 s. 263]]',
      '<b>Toplama.</b> Tek miyositin oluşturduğu voltaj deriden ölçülemeyecek kadar küçüktür. Çok sayıda miyosit aynı anda depolarize olunca sinyaller toplanır; voltaj eşzamanlı depolarize olan hücre sayısıyla orantılıdır. Bu yüzden QRS, P\'den büyüktür. [[K1 s. 263]]',
    ];
    const G = () => kip === 'dar'
      ? { W: 360, H: 430, c0: 10, c1: 322, n: 8, ex: 338, ly0: 206, ly1: 410, z: 372, A: 100 }
      : { W: 640, H: 340, c0: 40, c1: 600, n: 14, ex: 618, ly0: 190, ly1: 332, z: 300, A: 92 };
    const html = () => {
      const g = G();
      return ADIM_CTL(`<span data-o="gs" hidden>${seg('Grup', 'g', [['bir', '1 hücre'], ['atr', 'Atriyumlar'], ['ven', 'Ventriküller']], grp)}</span>`) +
        `<svg class="f58-svg f58-sv" viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="Kas lifi zarında ilerleyen depolarizasyon dalgası, yerel akımlar ve araştırıcı elektrodun kaydettiği iz"></svg>`;
    };
    const fd = (u) => (u <= 0.92 ? Math.pow(u / 0.92, 2.2) : Math.max(0, 1 - (u - 0.92) / 0.08));
    const ciz = (s, p) => {
      const g = G(), cw = (g.c1 - g.c0) / g.n, rm = RM;
      const dFront = s === 0 ? 0 : s <= 2 ? p : 1, rFront = s === 3 ? p : 0;
      const xf = g.c0 + (g.c1 - g.c0) * dFront, xr = g.c0 + (g.c1 - g.c0) * rFront;
      let o = `<defs><marker id="f58-ka" viewBox="0 0 8 8" refX="6" refY="4" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" class="f58-mk"/></marker></defs>`;
      if (s === 4) return o + ciz5(g);
      o += `<rect x="${g.c0}" y="64" width="${g.c1 - g.c0}" height="52" class="f58-cell"/>`;
      let mem = '', sg = '';
      for (let i = 0; i < g.n; i++) {
        const cx = g.c0 + (i + 0.5) * cw, dep = cx < xf && !(s === 3 && cx < xr);
        const cl = dep ? 'f58-md' : 'f58-mr', sc = dep ? 'f58-sd' : 'f58-sr';
        mem += `<path class="${cl}" d="M${g.c0 + i * cw + 1} 64h${cw - 2}M${g.c0 + i * cw + 1} 116h${cw - 2}"/>`;
        sg += `<text x="${cx}" y="57" class="${sc}" text-anchor="middle">${dep ? '−' : '+'}</text><text x="${cx}" y="137" class="${sc}" text-anchor="middle">${dep ? '−' : '+'}</text>` +
          `<text x="${cx}" y="84" class="${sc}" text-anchor="middle">${dep ? '+' : '−'}</text><text x="${cx}" y="108" class="${sc}" text-anchor="middle">${dep ? '+' : '−'}</text>`;
      }
      o += mem + sg;
      o += T(g.c0, 20, '', '');
      /* durum şeridi */
      const fr = s === 3 ? xr : xf, moving = (s >= 1 && s <= 3) && p < 1 && !rm;
      const a = s === 3 ? 'Dinlenim' : 'Etkin (depolarize)', b = s === 3 ? 'Etkin (depolarize)' : 'Dinlenim';
      if (s === 0) o += T((g.c0 + g.c1) / 2, 18, 'Dinlenim', 'f58-mu f58-s f58-b', 'middle');
      else {
        if (fr - g.c0 > 70) o += T((g.c0 + fr) / 2, 18, kip === 'dar' && s !== 3 ? 'Etkin' : a, (s === 3 ? 'f58-mu' : 'f58-cr') + ' f58-s f58-b', 'middle');
        if (g.c1 - fr > 70) o += T((fr + g.c1) / 2, 18, kip === 'dar' && s === 3 ? 'Etkin' : b, (s === 3 ? 'f58-cr' : 'f58-mu') + ' f58-s f58-b', 'middle');
        if (moving) o += `<path class="f58-ah" d="M${fr + 6} 30h26" marker-end="url(#f58-ka)"/>`;
      }
      o += T(g.c0 + 2, 44, 'hücre dışı sıvı', 'f58-mu f58-s') + T(g.c0 + 2, 99, 'hücre içi', 'f58-mu f58-s');
      /* yerel akım döngüleri */
      const aktif = (s >= 1 && s <= 3) && fr > g.c0 + 8 && fr < g.c1 - 8;
      const sol = fr - 26, sag = fr + 26, ters = s === 3;
      if (aktif) {
        const dis = (x1, x2) => `<path class="f58-ak" marker-end="url(#f58-ka)" d="M${x1} 52C${x1} 26 ${x2} 26 ${x2} 52"/><path class="f58-ak" marker-end="url(#f58-ka)" d="M${x1} 128C${x1} 154 ${x2} 154 ${x2} 128"/>`;
        o += ters ? dis(sol, sag) : dis(sag, sol);
        o += `<path class="f58-ak" marker-end="url(#f58-ka)" d="${ters ? `M${sag} 94Q${fr} 82 ${sol} 94` : `M${sol} 94Q${fr} 82 ${sag} 94`}"/>`;
        if (s >= 2) { for (const dx of [-24, 0, 24]) o += `<path class="f58-ak f58-akf" marker-end="url(#f58-ka)" d="M${fr + dx} 146V158"/>`; }
      }
      /* elektrot, deri */
      o += `<path class="f58-sk" d="M${g.c0} 160H${g.W - 4}"/>` + T(g.c0, 176, 'deri', 'f58-mu f58-s');
      o += `<path class="f58-sk f58-skn" d="M${g.ex} 98V160"/><circle cx="${g.ex}" cy="90" r="8" class="f58-el"/>` + T(g.ex - 3, 94, '+', 'f58-ok f58-b', 'middle', ' style="font-size:12px"');
      o += T(g.W - 4, 176, kip === 'dar' ? 'elektrot' : 'Araştırıcı elektrot', 'f58-tx f58-s', 'end');
      if (s === 2 && aktif) o += `<path class="f58-ak f58-akf" marker-end="url(#f58-ka)" d="M${fr + 30} 150C${fr + 90} 176 ${g.ex - 40} 168 ${g.ex} 104" style="stroke-dasharray:4 4"/>`;
      /* alt panel */
      const lw = g.c1 - g.c0, zy = g.z;
      o += `<rect x="${g.c0}" y="${g.ly0}" width="${lw}" height="${g.ly1 - g.ly0}" class="f58-fr"/><line class="f58-iz" x1="${g.c0}" x2="${g.c1}" y1="${zy}" y2="${zy}"/>`;
      o += T(g.c0 + 4, g.ly0 + 14, 'elektrot izi: voltaj', 'f58-mu f58-s') + T(g.c1 - 2, g.ly1 - 6, 'zaman →', 'f58-mu f58-s', 'end');
      const tr = (u1) => { let d = ''; for (let u = 0; u <= u1 + 1e-9; u += 0.01) d += (d ? 'L' : 'M') + (g.c0 + lw * u).toFixed(1) + ' ' + (zy - g.A * fd(u)).toFixed(1); return d; };
      if (s === 2) o += `<path class="f58-tr f58-tra" d="${tr(rm ? 1 : dFront)}"/>`;
      if (s === 3) o += `<path class="f58-tr f58-trm" d="${tr(1)}"/>` + T((g.c0 + g.c1) / 2, g.ly0 + 34, 'Bu bölüm depolarizasyon dalgasını izler', 'f58-mu f58-s f58-b', 'middle');
      if (s === 1) o += T((g.c0 + g.c1) / 2, g.ly0 + 34, 'iz sonraki adımda çizilir', 'f58-mu f58-s', 'middle');
      return o;
    };
    const ciz5 = (g) => {
      const dar = kip === 'dar', lw = g.c1 - g.c0;
      const cs = dar ? 10 : 12, zy = g.z, U = dar ? 70 : 76;
      const grid_ = (x, y, nc, nr, on) => { let r = ''; for (let i = 0; i < nc; i++) for (let j = 0; j < nr; j++) r += `<rect x="${x + i * cs}" y="${y + j * cs}" width="${cs - 2}" height="${cs - 2}" rx="2" class="${on ? 'f58-cd' : 'f58-cn'}"/>`; return r; };
      const X1 = dar ? 40 : 100, XA = dar ? 100 : 250, XV = dar ? 196 : 420, nv = dar ? [8, 4] : [12, 5], na = [6, 3];
      let o = `<g class="f58-gr${grp === 'bir' ? ' on' : ''}"><circle cx="${X1}" cy="90" r="8" class="${grp === 'bir' ? 'f58-cd' : 'f58-cn'}"/></g>`;
      o += `<g>${grid_(XA, 72, na[0], na[1], grp === 'atr')}</g><g>${grid_(XV, 62, nv[0], nv[1], grp === 'ven')}</g>`;
      o += T(X1, 130, '1 hücre', 'f58-tx f58-s', 'middle') + T(XA + na[0] * cs / 2, 130, dar ? 'Atriyum' : 'Atriyumlar (6 × 3)', 'f58-tx f58-s', 'middle') + T(XV + nv[0] * cs / 2, dar ? 128 : 140, dar ? 'Ventrikül (8 × 4)' : 'Ventriküller (12 × 5)', 'f58-tx f58-s', 'middle');
      o += `<rect x="${g.c0}" y="${g.ly0}" width="${lw}" height="${g.ly1 - g.ly0}" class="f58-fr"/><line class="f58-iz" x1="${g.c0}" x2="${g.c1}" y1="${zy}" y2="${zy}"/>`;
      o += `<line class="f58-lim" x1="${g.c0}" x2="${g.c1}" y1="${zy - 0.08 * U}" y2="${zy - 0.08 * U}"/>` + T(g.c0 + 4, g.ly0 + 14, 'kesik çizgi: deriden ölçülebilir eşik', 'f58-mu f58-s');
      const W = [['bir', g.c0 + lw * 0.04, lw * 0.26, 0.02, '1 hücre'], ['atr', g.c0 + lw * 0.36, lw * 0.26, 0.15, 'P'], ['ven', g.c0 + lw * 0.68, lw * 0.3, 1.2, 'QRS']];
      W.forEach(([k, x, w, a, l]) => {
        let d = ''; for (let u = 0; u <= 1.001; u += 0.04) d += (d ? 'L' : 'M') + (x + w * u).toFixed(1) + ' ' + (zy - a * U * Math.pow(Math.sin(Math.PI * u), 2)).toFixed(1);
        o += `<path class="f58-tr ${k === grp ? 'f58-tra' : 'f58-trm f58-dim'}" d="${d}"/>` + T(x + w / 2, zy + 16, l, k === grp ? 'f58-ac f58-s f58-b' : 'f58-mu f58-s', 'middle');
      });
      return o;
    };
    const render = (k) => {
      stop(); kip = k; el.innerHTML = html();
      el.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', () => { grp = b.dataset.g; press(el, 'g', grp); el.querySelector('.f58-sv').innerHTML = `<defs></defs>` + ciz(4, 1); }));
      stop = adimli(el, S, { n: 4, dur: [0, 3, 3, 3, 0], rm: [1, 0.5, 0.5, 1, 1], hold: 0.9, ciz, say: (s) => `${s + 1}/5`, cap: (s) => cap(CAP[s]), sync: (s) => { el.querySelector('[data-o=gs]').hidden = s !== 4; } });
    };
    const off = dk(el, render);
    return () => { off(); stop(); };
  };

  /* =====================================================================
     5 · 12 derivasyon
     ===================================================================== */
  VIZ.f58_deriv = (el) => {
    const cap = capOf(el);
    let sel = 'DI', kip = 'genis';
    const ANG = { DI: 0, DII: 60, DIII: 120, aVF: 90, aVL: -30, aVR: -150 };
    const E = { SagK: [60, 70, 'SağK'], SolK: [280, 70, 'SolK'], SolB: [230, 300, 'SolB'] };
    const PAIR = { DI: ['SagK', 'SolK'], DII: ['SagK', 'SolB'], DIII: ['SolK', 'SolB'] };
    const AVH = { aVR: ['SagK', 'SolK', 'SolB'], aVL: ['SolK', 'SagK', 'SolB'], aVF: ['SolB', 'SagK', 'SolK'] };
    const ELAD = { SagK: 'sağ kol', SolK: 'sol kol', SolB: 'sol bacak' };
    const CAPS = {
      DI: '<b>DI.</b> Sağ kol ile sol kol elektrotları arasındaki fark; yönü 0°. Bir derivasyona dokunun. [[K1 s. 263, 265]]',
      DII: '<b>DII.</b> Sağ kol ile sol bacak elektrotları arasındaki fark; yönü +60°. Kitaptaki normal EKG bu derivasyonda kaydedilmiştir. [[K1 s. 262–263, 265]]',
      DIII: '<b>DIII.</b> Sol kol ile sol bacak elektrotları arasındaki fark; yönü +120°. [[K1 s. 263, 265]]',
      aVF: '<b>aVF.</b> Sol bacak elektrodu ile sağ ve sol kol elektrotlarının ortalaması arasındaki fark; yönü +90°. Artırılmış derivasyonlar aynı üç elektrottan türetilir ama ek açılar verir. [[K1 s. 263, 265]]',
      aVL: '<b>aVL.</b> Aynı üç elektrottan türetilir: sol kol elektrodu ile öteki iki elektrodun ortalaması; yönü −30°. [[K1 s. 263, 265]]',
      aVR: '<b>aVR.</b> Aynı üç elektrottan türetilir: sağ kol elektrodu ile öteki iki elektrodun ortalaması; yönü −150°. [[K1 s. 263, 265]]',
    };
    const VC = [485, 165, 120, 85], VA = [100, 80, 60, 40, 22, 5];
    const vpos = (i) => [VC[0] + VC[2] * Math.cos(VA[i] * Math.PI / 180), VC[1] - VC[3] * Math.sin(VA[i] * Math.PI / 180)];
    const html = () => {
      const dar = kip === 'dar';
      return `<div class="f58-ctl f58-gruplar">
        <div class="f58-bz"><span class="f58-lb">Ekstremite</span>${seg('Ekstremite derivasyonları', 'd', ['DI', 'DII', 'DIII'].map((x) => [x, x]), sel)}</div>
        <div class="f58-bz"><span class="f58-lb">Artırılmış</span>${seg('Artırılmış derivasyonlar', 'd', ['aVR', 'aVL', 'aVF'].map((x) => [x, x]), sel)}</div>
        <div class="f58-bz"><span class="f58-lb">Göğüs</span>${seg('Göğüs derivasyonları', 'd', [1, 2, 3, 4, 5, 6].map((x) => ['V' + x, 'V' + x]), sel)}</div></div>
        <svg class="f58-svg" viewBox="0 0 360 ${dar ? 610 : 340}" role="img" aria-label="Koronal düzlemde üç ekstremite elektrodu ve altı eksen; kesitte altı göğüs elektrodu"><g data-o="sv"></g></svg>
        <p class="f58-kvl" data-o="kvl"></p>`.replace('viewBox="0 0 360', dar ? 'viewBox="0 0 360' : 'viewBox="0 0 640');
    };
    const ciz = () => {
      const dar = kip === 'dar', isV = sel[0] === 'V', ci = [170, 150];
      const mk = '<defs><marker id="f58-dm" viewBox="0 0 8 8" refX="6" refY="4" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L8 4L0 8z" class="f58-mka"/></marker></defs>';
      /* sol: koronal */
      let L = T(170, 16, 'Koronal düzlem (önden)', 'f58-b', 'middle');
      L += `<path class="f58-bd" d="M90 54Q170 40 250 54L262 250L232 300H108L78 250Z"/><path class="f58-bd" d="M90 54L48 120M250 54L292 120"/><path class="f58-bd" d="M108 300L100 336M232 300L238 336" style="opacity:.5"/>`;
      L += `<path class="f58-bdt" d="M${E.SagK[0]} ${E.SagK[1]}L${E.SolK[0]} ${E.SolK[1]}L${E.SolB[0]} ${E.SolB[1]}Z"/>`;
      Object.keys(ANG).forEach((k) => {
        const a = ANG[k] * Math.PI / 180, dx = Math.cos(a), dy = Math.sin(a), on = sel === k;
        L += `<line class="${on ? 'f58-hx on' : 'f58-hx'}" x1="${(ci[0] - dx * 92).toFixed(1)}" y1="${(ci[1] - dy * 92).toFixed(1)}" x2="${(ci[0] + dx * 92).toFixed(1)}" y2="${(ci[1] + dy * 92).toFixed(1)}"/>`;
        const ex = ci[0] + dx * 98, ey = ci[1] + dy * 98, an = dx > 0.3 ? 'start' : dx < -0.3 ? 'end' : 'middle';
        L += `<text x="${(ex + (an === 'start' ? 4 : an === 'end' ? -4 : 0)).toFixed(1)}" y="${(ey + (an === 'middle' ? 12 : 4)).toFixed(1)}" class="f58-tx f58-s ${on ? 'f58-ac f58-b' : 'f58-mu'}" text-anchor="${an}" data-d="${k}" style="cursor:pointer">${k} ${aci(ANG[k])}</text>`;
      });
      L += `<circle cx="${ci[0]}" cy="${ci[1]}" r="22" class="f58-hrt"/>` + T(ci[0], ci[1] + 4, 'kalp', 'f58-mu f58-s', 'middle');
      const mid = (a, b) => [(E[a][0] + E[b][0]) / 2, (E[a][1] + E[b][1]) / 2];
      let hi = '', rings = '';
      if (PAIR[sel]) {
        const [m, p] = PAIR[sel];
        hi += `<line class="f58-av" x1="${E[m][0]}" y1="${E[m][1]}" x2="${E[p][0]}" y2="${E[p][1]}" marker-end="url(#f58-dm)"/>`;
        hi += T(E[m][0] + (E[m][0] < 150 ? -4 : 20), E[m][1] - 16, '−', 'f58-b', 'middle', ' style="font-size:20px"') + T(E[p][0] + 22, E[p][1] - 8, '+', 'f58-ok f58-b', 'middle', ' style="font-size:20px"');
        rings = [m, p];
      } else if (AVH[sel]) {
        const [p, a, b] = AVH[sel], mm = mid(a, b);
        hi += `<line class="f58-lim" x1="${E[a][0]}" y1="${E[a][1]}" x2="${mm[0]}" y2="${mm[1]}"/><line class="f58-lim" x1="${E[b][0]}" y1="${E[b][1]}" x2="${mm[0]}" y2="${mm[1]}"/>`;
        hi += `<rect x="${mm[0] - 5}" y="${mm[1] - 5}" width="10" height="10" class="f58-sq"/><line class="f58-av" x1="${mm[0]}" y1="${mm[1]}" x2="${E[p][0]}" y2="${E[p][1]}" marker-end="url(#f58-dm)"/>`;
        hi += T(E[p][0] + 22, E[p][1] - 8, '+', 'f58-ok f58-b', 'middle', ' style="font-size:20px"');
        hi += T(mm[0] + (mm[0] < 170 ? 8 : -8), mm[1] + 22, 'ötekilerin ortalaması', 'f58-mu f58-s', mm[0] < 170 ? 'start' : 'end');
        rings = [p];
      }
      Object.keys(E).forEach((k) => {
        const on = rings && rings.includes(k);
        L += `<g data-d="${k === 'SagK' ? 'DI' : k === 'SolK' ? 'DI' : 'DII'}" style="cursor:pointer"><circle cx="${E[k][0]}" cy="${E[k][1]}" r="14" class="f58-el${on ? ' f58-on' : ''}"/>` + T(E[k][0], E[k][1] + 4, E[k][2], 'f58-b', 'middle', ' style="font-size:10.5px"') + '</g>';
      });
      L = `<g opacity="${isV ? 0.35 : 1}">${L.replace(/(<circle[^>]*class="f58-hrt"[^>]*>)/, '$1')}${hi}</g>`;
      /* sağ: kesit */
      let R = T(485, 16, 'Kesit (enine, yukarıdan bakış)', 'f58-b', 'middle');
      R += `<ellipse cx="${VC[0]}" cy="${VC[1]}" rx="${VC[2]}" ry="${VC[3]}" class="f58-bd"/><circle cx="${VC[0]}" cy="${VC[1] + 70}" r="9" class="f58-bd"/><ellipse cx="${VC[0] + 18}" cy="${VC[1] - 5}" rx="46" ry="34" transform="rotate(25 ${VC[0] + 18} ${VC[1] - 5})" class="f58-hrt"/>`;
      R += T(VC[0], VC[1] - VC[3] + 30, 'ön', 'f58-mu f58-s', 'middle') + T(VC[0], VC[1] + VC[3] - 18, 'arka', 'f58-mu f58-s', 'middle');
      const hc = [VC[0] + 18, VC[1] - 5];
      R += `<rect x="${hc[0] - 4}" y="${hc[1] - 4}" width="8" height="8" class="f58-sq"/>` + T(hc[0] + 8, hc[1] + 22, 'ortalama', 'f58-mu f58-s');
      for (let i = 0; i < 6; i++) {
        const [x, y] = vpos(i), on = sel === 'V' + (i + 1);
        if (on) R += `<line class="f58-av" x1="${hc[0]}" y1="${hc[1]}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" marker-end="url(#f58-dm)" style="stroke-dasharray:none"/>`;
      }
      for (let i = 0; i < 6; i++) { const [x, y] = vpos(i), on = sel === 'V' + (i + 1); R += `<g data-d="V${i + 1}" style="cursor:pointer"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="13" class="f58-el${on ? ' f58-on' : ''}"/>` + T(x, y + 4, 'V' + (i + 1), 'f58-b', 'middle', ' style="font-size:10.5px"') + '</g>'; }
      R = `<g opacity="${isV ? 1 : 0.35}">${R}</g>`;
      const tr = dar ? 'translate(8 0)' : '';
      const body = dar ? `<g transform="translate(6 0)">${L}</g><g transform="translate(-305 350)">${R}</g>` : L + R;
      el.querySelector('[data-o=sv]').innerHTML = mk + body;
      let kv;
      if (PAIR[sel]) kv = `Elektrotlar: ${ELAD[PAIR[sel][0]]} (−) → ${ELAD[PAIR[sel][1]]} (+) · Açı: ${aci(ANG[sel])} · Düzlem: koronal`;
      else if (AVH[sel]) kv = `Elektrot: ${ELAD[AVH[sel][0]]} (+), öteki ikisinin ortalamasına karşı · Açı: ${aci(ANG[sel])} · Düzlem: koronal`;
      else kv = `Elektrot: göğüs ${sel} (+), üç ekstremite elektrodunun ortalamasına karşı · Açı: yok · Düzlem: kesit (enine)`;
      el.querySelector('[data-o=kvl]').textContent = kv;
      cap(isV ? `<b>${sel}.</b> Göğüs elektrodu ile üç ekstremite elektrodunun ortalaması arasındaki fark. Göğüs derivasyonları kalbe kesitte bakar; ekstremite derivasyonlarının koronal bakışına eklenince 12 derivasyonlu EKG tanı aracı olur. [[K1 s. 263]]` : CAPS[sel]);
    };
    const render = (k) => {
      kip = k; el.innerHTML = html(); ciz();
      const set = (d) => { sel = d; press(el, 'd', d); ciz(); };
      el.querySelectorAll('button[data-d]').forEach((b) => b.addEventListener('click', () => set(b.dataset.d)));
      const svg = el.querySelector('svg');
      svg.addEventListener('click', (e) => { const h = e.target.closest('[data-d]'); if (h) set(h.dataset.d); });
    };
    return dk(el, render);
  };

  /* =====================================================================
     6 · DII'de ventrikül depolarizasyonu, adım adım
     ===================================================================== */
  VIZ.f58_qrs = (el) => {
    const cap = capOf(el);
    const S = { s: 1, p: 1, play: false };
    let kip = 'genis', stop = () => {};
    const CAP = [
      '<b>Başlangıç.</b> Depolarizasyon dalgası SA düğümden başlar ve atriyumlardan AV düğüme yayılır. (Bu çizim yalnız ventrikül depolarizasyonunu kaydeder.) [[K1 s. 264–265]]',
      '<b>1 · Septum.</b> Septum soldan sağa depolarize olur; net akım DII elektrodundan uzaklaşır: küçük negatif Q dalgası. "İleri"ye basın. [[K1 s. 264–265]]',
      '<b>2 · Ventrikül kütlesi.</b> Ventrikül kasının geri kalanı depolarize olmaya başlar; net akım elektroda doğrudur: büyük pozitif R dalgası. [[K1 s. 264–265]]',
      '<b>3 · Tabanlara doğru.</b> Dalga apeksten ventrikül tabanlarına, elektrottan uzağa ilerler; potansiyel sıfıra döner. [[K1 s. 264–265]]',
      '<b>4 · Sol ventrikül tabanı.</b> En son sol ventrikülün tabanı depolarize olur: küçük negatif S dalgası. Sonuç DII\'de küçük Q, büyük R, küçük S. [[K1 s. 264–265]]',
    ];
    const VOUT = 'M75 130L200 128L330 125C346 180 342 252 290 288C160 280 72 215 75 130Z';
    const SEPT = 'M200 128L224 127L304 276L284 286Z';
    const ARR = [null, [262, 205, 220, 168], [215, 175, 268, 262], [238, 232, 208, 152], [286, 195, 310, 150]];
    const PTS = [[0, 0], [40, 0], [40, 0], [52, -0.1], [64, 0], [90, 1.2], [116, 0], [132, -0.25], [148, 0], [230, 0]];
    const BND = [40, 64, 90, 116, 148];
    const html = () => ADIM_CTL() + `<svg class="f58-svg f58-sv" viewBox="0 0 360 ${kip === 'dar' ? 570 : 326}" role="img" aria-label="Kalpte ventrikül depolarizasyonunun sırası ve DII derivasyonunda oluşan Q, R, S dalgaları"></svg>` +
      `<div class="legend"><span><i class="f58-lg f58-lgc"></i>depolarize bölge</span><span><i class="f58-lg f58-lga"></i>net akım</span><span><i class="f58-lg f58-lgd"></i>DII'nin baktığı yön</span></div>`;
    const ciz = (s, p) => {
      const dar = kip === 'dar';
      const pr = (r) => (s > r ? 1 : s === r ? p : 0);
      let o = `<defs><clipPath id="f58-qv"><path d="${VOUT}"/></clipPath>
        <clipPath id="f58-q1"><rect x="${310 - 115 * pr(1)}" y="110" width="${115 * pr(1) + 1}" height="190"/></clipPath>
        <clipPath id="f58-q2"><circle cx="270" cy="235" r="${pr(2) * 235}"/></clipPath>
        <clipPath id="f58-q3"><rect x="50" y="${175 - 62 * pr(3)}" width="170" height="${62 * pr(3)}"/></clipPath>
        <clipPath id="f58-q4"><rect x="200" y="${175 - 62 * pr(4)}" width="160" height="${62 * pr(4)}"/></clipPath>
        <clipPath id="f58-qa"><circle cx="98" cy="62" r="${Math.min(1, pr(0) * 1.2) * 230}"/></clipPath>
        <marker id="f58-qm" viewBox="0 0 8 8" refX="5" refY="4" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" orient="auto"><path d="M0 0L8 4L0 8z" class="f58-mka"/></marker></defs>`;
      o += `<ellipse cx="112" cy="84" rx="52" ry="42" class="f58-ch"/><ellipse cx="248" cy="76" rx="52" ry="38" class="f58-ch"/><path d="${VOUT}" class="f58-ch"/>`;
      const fade = s === 0 && p > 0.85 ? 1 - (p - 0.85) / 0.15 : 1;
      o += `<g opacity="${fade}" clip-path="url(#f58-qa)"><ellipse cx="112" cy="84" rx="52" ry="42" class="f58-pnt"/><ellipse cx="248" cy="76" rx="52" ry="38" class="f58-pnt"/></g>`;
      o += `<g clip-path="url(#f58-qv)"><g clip-path="url(#f58-q2)"><rect x="60" y="175" width="300" height="130" class="f58-pnt"/></g><g clip-path="url(#f58-q3)"><rect x="50" y="110" width="170" height="130" class="f58-pnt"/></g><g clip-path="url(#f58-q4)"><rect x="200" y="110" width="170" height="130" class="f58-pnt"/></g><g clip-path="url(#f58-q1)"><path d="${SEPT}" class="f58-pnt f58-pnts"/></g></g>`;
      o += `<path d="${SEPT}" class="f58-sep"/>`;
      o += `<circle cx="96" cy="62" r="${s === 0 && p < 0.5 ? 8 : 5}" class="f58-nod"/><circle cx="205" cy="140" r="5" class="f58-nod"/>`;
      o += T(dar ? 22 : 24, 28, dar ? 'SA' : 'SA düğüm', 'f58-tx f58-s f58-halo') + T(212, 160, dar ? 'AV' : 'AV düğüm', 'f58-tx f58-s f58-halo') + T(150, 210, 'septum', 'f58-mu f58-s f58-halo', 'middle');
      o += `<line class="f58-lim" x1="205" y1="195" x2="338" y2="300" style="stroke:var(--muted)"/><circle cx="338" cy="300" r="10" class="f58-el"/>` + T(338, 304, '+', 'f58-ok f58-b', 'middle', ' style="font-size:13px"');
      o += T(dar ? 352 : 330, 320, dar ? 'DII (+)' : 'DII elektrodu (+)', 'f58-tx f58-s', 'end');
      const a = ARR[s];
      if (a && p > 0.12) o += `<line class="f58-av" x1="${a[0]}" y1="${a[1]}" x2="${a[2]}" y2="${a[3]}" marker-end="url(#f58-qm)"/>`;
      /* DII kaydı */
      const xm = s === 0 ? 40 : BND[s - 1] + (BND[s] - BND[s - 1]) * p;
      let d = '';
      for (let x = 0; x <= xm + 1e-9; x += 2) { const v = pl(PTS, x); d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + (100 - v * 75).toFixed(1); }
      let rec = grid('f58-qg', 0, 0, 240, 200, 10) + `<rect x="0" y="0" width="240" height="200" class="f58-fr"/><line class="f58-iz" x1="0" x2="240" y1="100" y2="100"/>`;
      rec += `<path class="f58-tr f58-tra" d="${d}"/>` + T(4, 16, 'DII kaydı', 'f58-mu f58-s f58-b');
      if (s === 0) rec += T(120, 50, 'atriyal depolarizasyon çizilmez', 'f58-mu f58-s', 'middle');
      if (xm >= 52) rec += T(52, 126, 'Q', 'f58-cr f58-b', 'middle', ' style="font-size:14px"');
      if (xm >= 90) rec += T(90, 100 - 90 - 6, 'R', 'f58-cr f58-b', 'middle', ' style="font-size:14px"');
      if (xm >= 132) rec += T(132, 100 + 19 + 16, 'S', 'f58-cr f58-b', 'middle', ' style="font-size:14px"');
      o += dar ? `<g transform="translate(40 340) scale(1.2)">${rec}</g>` : `<g transform="translate(390 60) scale(0.95)">${rec}</g>`;
      return o;
    };
    const render = (k) => {
      stop(); kip = k; el.innerHTML = html();
      el.querySelector('.f58-sv').setAttribute('viewBox', kip === 'dar' ? '0 0 360 640' : '0 0 640 326');
      stop = adimli(el, S, { n: 4, dur: [2.5, 2.5, 2.5, 2.5, 2.5], rm: [1, 1, 1, 1, 1], hold: 0.6, ciz, say: (s) => `${s}/4`, cap: (s) => cap(CAP[s]) });
    };
    const off = dk(el, render);
    return () => { off(); stop(); };
  };

  /* =====================================================================
     7 · Aksı çevirin: altı derivasyonda QRS
     ===================================================================== */
  VIZ.f58_aks = (el) => {
    const cap = capOf(el);
    let th = 45, mod = false, st = 1, kip = 'genis';
    const D = [['DI', 0], ['DII', 60], ['DIII', 120], ['aVF', 90], ['aVL', -30], ['aVR', -150]];
    const EX = [['n', 'Normal +45°', 45], ['s', '−30° (sınır)', -30], ['l', 'Sol aks −60°', -60], ['r', 'Sağ aks +120°', 120]];
    const norm = (t) => { let v = ((t + 180) % 360 + 360) % 360 - 180; return v === -180 ? 180 : v; };
    const sinif = (t) => (t >= -30 && t <= 90 ? 'normal aks' : t < -30 && t >= -90 ? 'sol aks sapması' : t > 90 ? 'sağ aks sapması' : 'aşırı aks sapması (−90° … ±180°)');
    const G = () => kip === 'dar'
      ? { W: 360, H: 600, cx: 180, cy: 150, r: 100, bw: 168, bh: 70, bx: [10, 182], by: [292, 368, 444], ty: 566, A: 28 }
      : { W: 640, H: 340, cx: 170, cy: 160, r: 110, bw: 142, bh: 84, bx: [340, 490], by: [10, 100, 190], ty: 312, A: 34 };
    const html = () => {
      const g = G();
      return `<div class="f58-ctl btn-row">${seg('Örnek', 'e', EX.map(([k, l]) => [k, l]), mod ? '' : (EX.find((x) => x[2] === th) || [''])[0])}
        <button type="button" class="btn ghost" data-a="iz" aria-pressed="${String(mod)}">İzoelektrik yöntem</button></div>
        <div class="f58-ctl btn-row" data-o="stp" hidden><button type="button" class="btn ghost" data-a="g">Geri</button><span class="f58-say" data-o="say"></span><button type="button" class="btn ghost" data-a="i">İleri</button><button type="button" class="btn" data-a="cik">Kipten çık</button></div>
        <svg class="f58-svg" viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="Altılı eksen sistemi: sürüklenebilir kardiyak aks oku ve altı derivasyondaki QRS"><g data-o="sv"></g>
          <circle data-o="hd" r="11" class="f58-hd" tabindex="0" role="slider" aria-label="Kardiyak aks açısı" aria-valuemin="-180" aria-valuemax="180"/></svg>`;
    };
    const kose = (a, r, g) => [g.cx + r * Math.cos(a * Math.PI / 180), g.cy + r * Math.sin(a * Math.PI / 180)];
    const sek = (a1, a2, r, g, cl, lab) => { const p1 = kose(a1, r, g), p2 = kose(a2, r, g); return `<path class="${cl}" d="M${g.cx} ${g.cy}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z"/>`; };
    const ciz = () => {
      const g = G(), dar = kip === 'dar';
      const gizli = mod && st === 1, tt = gizli ? null : th;
      let o = '';
      o += sek(-30, 90, g.r, g, 'f58-sn') + sek(-90, -30, g.r, g, 'f58-ss') + sek(90, 180, g.r, g, 'f58-sr2') + sek(180, 270, g.r, g, 'f58-s4');
      const sl = (a, r, t1, t2, c) => { const p = kose(a, r, g); return `<text x="${p[0].toFixed(1)}" y="${p[1].toFixed(1)}" class="f58-tx f58-s f58-b f58-halo ${c}" text-anchor="middle">${t1}</text><text x="${p[0].toFixed(1)}" y="${(p[1] + 13).toFixed(1)}" class="f58-tx f58-s f58-halo ${c}" text-anchor="middle">${t2}</text>`; };
      o += sl(35, g.r * 0.5, 'normal', '−30°…+90°', 'f58-ok') + sl(-62, g.r * 0.7, 'sol aks', 'sapması', 'f58-wr') + sl(135, g.r * 0.66, 'sağ aks', 'sapması', 'f58-cl');
      const cs = D.map(([n, f]) => ({ n, f, c: tt === null ? 0 : Math.cos((tt - f) * Math.PI / 180) }));
      const mn = tt === null ? 'DII' : cs.reduce((a, b) => (Math.abs(b.c) < Math.abs(a.c) ? b : a)).n;
      D.forEach(([n, f]) => {
        const a = f * Math.PI / 180, dx = Math.cos(a), dy = Math.sin(a), on = (mod && st === 1 && n === 'DII');
        o += `<line class="f58-hx${on ? ' on' : ''}" x1="${(g.cx - dx * g.r).toFixed(1)}" y1="${(g.cy - dy * g.r).toFixed(1)}" x2="${(g.cx + dx * g.r).toFixed(1)}" y2="${(g.cy + dy * g.r).toFixed(1)}"/>`;
        const ex = g.cx + dx * (g.r + 6), ey = g.cy + dy * (g.r + 6), an = dx > 0.3 ? 'start' : dx < -0.3 ? 'end' : 'middle';
        o += `<text x="${ex.toFixed(1)}" y="${(ey + (an === 'middle' ? 13 : 4)).toFixed(1)}" class="f58-tx f58-s f58-mu" text-anchor="${an}">${n} ${aci(f)}</text>`;
      });
      if (mod && st === 1) [-30, 150].forEach((a) => { const p = kose(a, g.r - 4, g); o += `<line class="f58-lim" x1="${g.cx}" y1="${g.cy}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}" style="stroke:var(--accent)"/>` + `<text x="${kose(a, g.r * 0.62, g)[0].toFixed(1)}" y="${(kose(a, g.r * 0.62, g)[1] - 5).toFixed(1)}" class="f58-ac f58-s f58-b" text-anchor="middle">${aci(a)}?</text>`; });
      if (mod && st === 2) o += `<line class="f58-lim" x1="${g.cx}" y1="${g.cy}" x2="${kose(150, g.r - 4, g)[0].toFixed(1)}" y2="${kose(150, g.r - 4, g)[1].toFixed(1)}" style="opacity:.35"/>`;
      if (mod && st === 3) o += `<line class="f58-lim" x1="${g.cx}" y1="${g.cy}" x2="${kose(-30, g.r - 4, g)[0].toFixed(1)}" y2="${kose(-30, g.r - 4, g)[1].toFixed(1)}" style="opacity:.35"/>`;
      if (tt !== null) { const p = kose(tt, g.r - 12, g); o += `<line class="f58-av" x1="${g.cx}" y1="${g.cy}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}" marker-end="url(#f58-am)"/>`; }
      o += `<defs><marker id="f58-am" viewBox="0 0 8 8" refX="6" refY="4" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" orient="auto"><path d="M0 0L8 4L0 8z" class="f58-mka"/></marker></defs><circle cx="${g.cx}" cy="${g.cy}" r="3" class="f58-nod"/>`;
      /* altı mini QRS */
      cs.forEach((q, i) => {
        const col = dar ? i % 2 : Math.floor(i / 3), row = dar ? Math.floor(i / 2) : i % 3;
        const x = g.bx[col], y = g.by[row], zy = y + g.bh * 0.58, iso = tt !== null && Math.abs(q.c) < 0.17, ar = mod && st === 1 && q.n !== 'DII';
        const R = tt === null ? g.A / 2 : g.A * (1 + q.c) / 2, Sd = tt === null ? g.A / 2 : g.A * (1 - q.c) / 2;
        const frm = q.n === mn && !ar;
        o += `<g opacity="${ar ? 0.3 : 1}"><rect x="${x}" y="${y}" width="${g.bw}" height="${g.bh}" rx="8" class="f58-bx${frm ? ' on' : ''}"/>` +
          T(x + 8, y + 16, `${q.n} ${aci(q.f)}`, 'f58-tx f58-s f58-b') + `<line class="f58-iz" x1="${x + 6}" x2="${x + g.bw - 6}" y1="${zy}" y2="${zy}"/>`;
        if (!ar) {
          const x0 = x + g.bw - 76;
          o += `<path class="f58-tr ${iso ? 'f58-tra' : ''}" d="M${x0} ${zy}H${x0 + 12}L${x0 + 26} ${(zy - R).toFixed(1)}L${x0 + 40} ${(zy + Sd).toFixed(1)}L${x0 + 50} ${zy}H${x0 + 68}"/>`;
          if (iso) o += T(x + 8, y + g.bh - 8, 'izoelektrik', 'f58-ac f58-s f58-b');
          else o += T(x + 8, y + g.bh - 8, q.c > 0.17 ? 'pozitif' : 'negatif', 'f58-mu f58-s');
        }
        o += '</g>';
      });
      const sinifLine = mod ? (st === 1 ? 'DII izoelektrik: aks ona dik' : st === 2 ? '−30° · normal aralığın sınırı' : '+150° · sağ aks sapması') : `${aci(th)} · ${sinif(th)}`;
      o += T(dar ? 10 : 340, g.ty, sinifLine, 'f58-tx f58-b', '', ` style="font-size:${dar ? 15 : 16}px"`);
      el.querySelector('[data-o=sv]').innerHTML = o;
      const hd = el.querySelector('[data-o=hd]');
      hd.style.display = mod ? 'none' : '';
      if (tt !== null) { const p = kose(tt, g.r - 12, g); hd.setAttribute('cx', p[0].toFixed(1)); hd.setAttribute('cy', p[1].toFixed(1)); hd.setAttribute('aria-valuenow', tt); hd.setAttribute('aria-valuetext', aci(tt)); }
      /* açıklama */
      let c;
      if (mod) c = [null, '<b>1 · İzoelektrik derivasyonu bulun.</b> DI, DII, DIII, aVF ve aVL\'nin QRS\'lerine bakın: pozitif ve negatif sapmaları eşit olan derivasyon izoelektriktir; burada DII (+60°). Aks ona diktir: −30° ya da +150°. [[K1 s. 265]]',
        '<b>2 · aVL\'ye bakın.</b> aVL (−30°) QRS\'si belirgin pozitifse aks −30°\'dir: normal aralığın hemen içinde. [[K1 s. 265–266]]',
        '<b>3 · aVL negatifse.</b> Aks +150°\'dir; kitap bunu aşırı sağ aks sapması diye adlandırır (çoğu sınıflamada sağ aks sapması; Atlas notu). [[K1 s. 266]]'][st];
      else if (th === -30) c = '<b>−30°.</b> Normal aralığın sınırı; aVL en pozitif, DII izoelektrik. [[K1 s. 265–266]]';
      else if (th >= -30 && th <= 90) c = `<b>${aci(th)}: normal aks</b> (−30° ile +90° arası). Oku sürükleyin ya da bir örnek seçin. [[K1 s. 265]]` + (th === 45 ? ' Büyük ventrikül kütlesi nedeniyle net depolarizasyon SA düğümden apekse çapraz iner; tipik aks yaklaşık 45°\'dir. [[K1 s. 264–265]]' : '');
      else if (th < -90) c = `<b>${aci(th)}.</b> Normal değil. Kitabın tanımına göre −30°'dan negatif olduğu için sol aks sapmasıdır; çoğu sınıflamada bu bölge "aşırı aks sapması" sayılır (Atlas notu). [[K1 s. 265]]`;
      else if (th < -30) c = `<b>${aci(th)}: sol aks sapması</b> (−30°'den daha negatif). Nedenleri: sol ventrikül hipertrofisi ya da gebelikte kalbin sola itilmesi. [[K1 s. 265]]`;
      else c = `<b>${aci(th)}: sağ aks sapması</b> (+90°'den büyük). Nedeni: sağ ventrikül hipertrofisi. [[K1 s. 265]]`;
      cap(c);
      el.querySelector('[data-o=stp]').hidden = !mod;
      if (mod) { el.querySelector('[data-o=say]').textContent = st + '/3'; el.querySelector('[data-a=g]').disabled = st <= 1; el.querySelector('[data-a=i]').disabled = st >= 3; }
      const ek = mod ? '' : (EX.find((x) => x[2] === th) || [''])[0];
      press(el, 'e', ek);
      el.querySelector('[data-a=iz]').setAttribute('aria-pressed', String(mod));
    };
    const render = (k) => {
      kip = k; el.innerHTML = html(); ciz();
      const svg = el.querySelector('svg'), hd = el.querySelector('[data-o=hd]');
      let drag = false;
      const gec = (t) => { th = norm(Math.round(t / 5) * 5); ciz(); };
      const ac = (e) => { const g = G(), r = svg.getBoundingClientRect(), s = r.width / g.W; return Math.atan2((e.clientY - r.top) / s - g.cy, (e.clientX - r.left) / s - g.cx) * 180 / Math.PI; };
      svg.addEventListener('pointerdown', (e) => { if (mod) return; const g = G(); if (e.target === hd || (e.pointerType === 'mouse' && e.target.closest('svg') && ((e.clientX - svg.getBoundingClientRect().left) / (svg.getBoundingClientRect().width / g.W) < 2 * g.cx))) { drag = true; try { svg.setPointerCapture(e.pointerId); } catch (x) { /* yok */ } gec(ac(e)); e.preventDefault(); } });
      svg.addEventListener('pointermove', (e) => { if (drag) gec(ac(e)); });
      const bitir = () => { drag = false; };
      svg.addEventListener('pointerup', bitir); svg.addEventListener('pointercancel', bitir);
      hd.addEventListener('keydown', (e) => { const d = { ArrowRight: 5, ArrowUp: -5, ArrowLeft: -5, ArrowDown: 5 }[e.key]; if (d) { e.preventDefault(); th = norm(th + d); ciz(); hd.focus(); } });
      el.querySelectorAll('[data-e]').forEach((b) => b.addEventListener('click', () => { th = EX.find((x) => x[0] === b.dataset.e)[2]; mod = false; ciz(); }));
      el.querySelector('[data-a=iz]').addEventListener('click', () => { mod = true; st = 1; ciz(); });
      el.querySelector('[data-a=cik]').addEventListener('click', () => { mod = false; th = 45; ciz(); });
      const adim = (n) => { st = clamp(n, 1, 3); th = st === 2 ? -30 : st === 3 ? 150 : th; ciz(); };
      el.querySelector('[data-a=g]').addEventListener('click', () => adim(st - 1));
      el.querySelector('[data-a=i]').addEventListener('click', () => adim(st + 1));
    };
    return dk(el, render);
  };
})();
