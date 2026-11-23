/* Bölüm 57 · Kalp kası · bileşenler (K1 s. 252–261).
   Modeller şematiktir; gerilim, süre ve HR değerleri kitaptan, eğri biçimleri temsilîdir (her bileşenin viz-foot'unda belirtilir). */
(() => {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const f1 = (v) => (+v).toFixed(1);
  const lin = (d0, d1, r0, r1) => (v) => r0 + ((v - d0) * (r1 - r0)) / (d1 - d0);
  const P = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + f1(p[0]) + ' ' + f1(p[1])).join('');
  const ease = (q) => (q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2);
  const seg = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const setSeg = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));

  // SVG parçaları (renkler yalnız site.css değişkenleri)
  const tx = (x, y, s, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" class="f57-t${o.b ? ' f57-b' : ''}" style="fill:var(${o.c || '--muted'})${o.s ? ';font-size:' + o.s + 'px' : ''}"${o.a ? ` text-anchor="${o.a}"` : ''}>${s}</text>`;
  const ln = (x1, y1, x2, y2, c = '--line', w = 1, d) => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="stroke:var(${c});stroke-width:${w}${d ? ';stroke-dasharray:' + d : ''}"/>`;
  const pa = (d, c, w, o = {}) => `<path d="${d}" style="fill:${o.f ? `var(${o.f})` : 'none'};stroke:${c ? `var(${c})` : 'none'};stroke-width:${w}${o.d ? ';stroke-dasharray:' + o.d : ''}${o.op != null ? ';opacity:' + o.op : ''}" stroke-linejoin="round" stroke-linecap="round"${o.x || ''}/>`;
  const rc = (x, y, w, h, f, s, r = 3, ex = '') => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${r}" style="fill:${f ? `var(${f})` : 'none'};stroke:${s ? `var(${s})` : 'none'}" ${ex}/>`;
  const ci = (x, y, r, f, s, ex = '') => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${f ? `var(${f})` : 'none'};stroke:${s ? `var(${s})` : 'none'}" ${ex}/>`;
  const num = (n, x, y, on) => `${ci(x, y, 9, on ? '--accent' : '--paper', on ? '--accent' : '--muted')}<text x="${f1(x)}" y="${f1(y + 4)}" text-anchor="middle" class="f57-t f57-b" style="fill:${on ? 'var(--on-accent)' : 'var(--ink)'};font-size:11.5px">${n}</text>`;
  const btnHtml = (label, attrs = '', ghost = true) => `<button type="button" class="btn${ghost ? ' ghost' : ''} f57-bt" ${attrs}>${label}</button>`;
  const svgOpen = (W, H, aria, narrow, ex = '') => `<svg class="f57-svg${narrow ? ' f57-n' : ''}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${aria}" ${ex}>`;

  // ortak hazırlık: açıklama alanı + dar/geniş yerleşim izleme
  function prep(el, redraw) {
    const cap = el.closest('.viz').querySelector('.viz-cap');
    if (!cap.dataset.f57) cap.dataset.f57 = cap.innerHTML;
    const o = { cap, narrow: el.clientWidth > 0 && el.clientWidth < 560 };
    o.setCap = (h) => { cap.innerHTML = REF(h); };
    o.defCap = () => { cap.innerHTML = cap.dataset.f57; };
    let ro = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => { const n = el.clientWidth > 0 && el.clientWidth < 560; if (n !== o.narrow) { o.narrow = n; redraw(); } });
      ro.observe(el);
    }
    o.stop = () => { if (ro) ro.disconnect(); };
    return o;
  }
  // sözde rastgele (aynı yerleşim)
  const rndMk = (s0) => { let s = s0; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };

  // ---------- ortak aksiyon potansiyelleri ----------
  // Ventrikül: -90 → +20 (faz 0, up ms) → +5 (faz 1, 9 ms) → plato (plat ms, +5 → 0) → faz 3 (f3 ms, kosinüs) → -90
  const apGen = (plat, f3, up = 1) => (t) => {
    if (t < 0) return -90;
    if (t < up) return -90 + (110 * t) / up;
    if (t < up + 9) return 20 - (15 * (t - up)) / 9;
    const e = up + 9 + plat;
    if (t < e) return 5 - (5 * (t - up - 9)) / plat;
    if (t < e + f3) return -45 * (1 - Math.cos((Math.PI * (t - e)) / f3));
    return -90;
  };
  const AP75 = apGen(200, 50); // toplam 260 ms
  const sample = (fn, a, b, step) => { const o = []; for (let t = a; t <= b + 1e-9; t += step) o.push([t, fn(t)]); return o; };

  /* =====================================================================
     1 · f57_yapi · hücre tipleri ve kas akrabaları
     ===================================================================== */
  VIZ.f57_yapi = (el) => {
    let sel = 'miyosit', tI = 0;
    const AC = {
      miyosit: null,
      pace: '<b>Pacemaker hücresi.</b> SA ve AV düğümde bulunur, aksiyon potansiyelini kendiliğinden üretir; uyarılabilir ama kasılmaz. [[K1 s. 252]]',
      purk: '<b>Purkinje lifi.</b> İleti hücresidir: aksiyon potansiyelini ventriküllere yayar; kasılmaz. [[K1 s. 252]]',
      cizgili: '<b>Çizgili görünüm.</b> Sarkoplazmadaki kalın ve ince filamentlerin düzenli sıralarından gelir; iskelet kasıyla ortaktır. [[K1 s. 252]]',
      stub: '<b>Sarkotübüler sistem.</b> Ventrikül miyositinde T tübülleri ve SR vardır, ama çoğu zaman iskelet kasındakinden az gelişmiştir. [[K1 s. 252]]',
      istem: '<b>İstemsiz denetim.</b> Düz kastaki gibi ANS ve endokrin eksenler miyositin işlevini ayarlar. [[K1 s. 252]]',
      gap: '<b>Aralık bağlantıları.</b> Konneksin kanallarından oluşan düşük dirençli bağlantılar aksiyon potansiyelini hızla yayar; miyositler fonksiyonel sinsityum olarak birlikte kasılır. [[K1 s. 252]]',
    };
    el.innerHTML = '<div class="f57-host"></div>';
    const host = el.firstChild;
    const K = prep(el, () => draw());
    const heart = (hl) => {
      const on = (k) => (hl === k ? ' f57-hl on' : ' f57-hl');
      return `<g class="f57-heart">
        <path class="${on('miyosit').trim()}" d="M110 8 C70 -4 12 22 12 86 C12 150 66 196 110 236 C154 196 208 150 208 86 C208 22 150 -4 110 8 Z" style="fill:var(--crit-soft);stroke:var(--line);stroke-width:1.5"/>
        <path d="M24 100 H196" style="stroke:var(--line);stroke-width:1;stroke-dasharray:4 3"/><path d="M110 100 V210" style="stroke:var(--line);stroke-width:1"/>
        <g class="${on('pace').trim()}"><ellipse cx="62" cy="40" rx="20" ry="9" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:2"/><ellipse cx="104" cy="96" rx="14" ry="7" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:2"/></g>
        <g class="${on('purk').trim()}" style="fill:none;stroke:var(--c-basic);stroke-width:1.8;stroke-linecap:round"><path d="M110 104 V128 M110 128 L80 150 L56 140 M80 150 L70 184 M110 128 L140 150 L164 140 M140 150 L150 184 M110 128 V196"/></g>
        <text x="62" y="26" text-anchor="middle" class="f57-t" style="fill:var(--accent-ink);font-size:12px">SA</text>
        <text x="132" y="92" class="f57-t" style="fill:var(--accent-ink);font-size:12px">AV</text>
      </g>`;
    };
    const badge = (k, x, y, w, h, l1, l2, l3) => `<g class="f57-hit${sel === k ? ' on' : ''}" data-k="${k}" role="button" tabindex="0" aria-label="${l1} ${l2}">${rc(x, y, w, h, sel === k ? '--accent-soft' : '--paper', sel === k ? '--accent' : '--line', 8)}${tx(x + 8, y + 18, l1, { b: 1, c: '--ink' })}${tx(x + 8, y + 34, l2)}${l3 ? tx(x + 8, y + 50, l3, { c: '--accent-ink' }) : ''}</g>`;
    const icon = {
      cizgili: (x, y) => { let s = ''; for (let i = 0; i < 4; i++) { s += `<rect x="${x + 6}" y="${y + 8 + i * 12}" width="68" height="5" rx="2" style="fill:var(--ink)"/>`; s += ln(x + 2, y + 17 + i * 12, x + 78, y + 17 + i * 12, '--muted', 1.3); } return s; },
      stub: (x, y) => `${pa(`M${x + 38} ${y + 4} V${y + 52}`, '--ink', 3)}${rc(x + 12, y + 20, 18, 26, '--chip', '--muted', 6)}${rc(x + 46, y + 20, 18, 26, '--chip', '--muted', 6)}${ln(x, y + 4, x + 76, y + 4, '--muted', 2)}`,
      istem: (x, y) => `${pa(`M${x + 6} ${y + 44} Q${x + 22} ${y + 10} ${x + 36} ${y + 28}`, '--accent', 2.5)}${ci(x + 38, y + 29, 4, '--accent')}${pa(`M${x + 62} ${y + 12} q 7 12 0 18 q -7 -6 0 -18 Z`, '--c-clin', 1.5, { f: '--c-clin-soft' })}${pa(`M${x + 50} ${y + 46} q 7 12 0 18 q -7 -6 0 -18 Z`, '--c-clin', 1.5, { f: '--c-clin-soft' })}`,
      gap: (x, y) => `${rc(x + 2, y + 10, 30, 40, '--crit-soft', '--line', 8)}${rc(x + 46, y + 10, 30, 40, '--crit-soft', '--line', 8)}${pa(`M${x + 38} ${y + 6} l 4 8 l -4 8 l 4 8 l -4 8 l 4 8 l -4 8`, '--ink', 1.8)}${rc(x + 34, y + 26, 10, 8, '--paper', '--c-basic', 2)}<circle class="f57-ion" cx="${x + 38}" cy="${y + 30}" r="3.5" data-x0="${x + 16}" data-x1="${x + 60}" style="fill:var(--warn)"/>`,
    };
    const card = (k, x, y, w, h, l1, l2, l3) => `<g class="f57-hit${sel === k ? ' on' : ''}" data-k="${k}" role="button" tabindex="0" aria-label="${l1}">${rc(x, y, w, h, sel === k ? '--accent-soft' : '--paper', sel === k ? '--accent' : '--line', 8)}${icon[k](x + (w - 78) / 2, y + 6)}${tx(x + w / 2, y + 82, l1, { a: 'middle', b: 1, c: '--ink' })}${tx(x + w / 2, y + 98, l2, { a: 'middle' })}${l3 ? tx(x + w / 2, y + 113, l3, { a: 'middle' }) : ''}</g>`;
    function draw() {
      const n = K.narrow, hl = sel === 'miyosit' || sel === 'pace' || sel === 'purk' ? sel : '';
      const W = n ? 360 : 680, H = n ? 610 : 330;
      let s = svgOpen(W, H, 'Kalp hücre tipleri ve kalp kasının iskelet kası ile düz kasla ortak özellikleri; öğelere dokunulabilir', n);
      const hs = n ? 0.78 : 0.78;
      s += `<g transform="translate(8 ${n ? 8 : 20}) scale(${hs})">${heart(hl)}</g>`;
      const bx = n ? 196 : 188, bw = n ? 156 : 142;
      s += badge('miyosit', bx, n ? 8 : 20, bw, 58, 'Miyosit', 'kasılır + iletir');
      s += badge('pace', bx, n ? 76 : 88, bw, 70, 'Pacemaker (SA, AV)', 'kendiliğinden AP', 'uyarılır, kasılmaz');
      s += badge('purk', bx, n ? 156 : 156, bw, 70, 'Purkinje lifi', 'AP’yi ventriküllere', 'yayar; kasılmaz');
      if (!n) {
        s += tx(350, 14, 'İskelet kası gibi', { b: 1, c: '--ink' }) + card('cizgili', 350, 22, 160, 124, 'Çizgili', 'kalın + ince', 'filamentler') + card('stub', 520, 22, 160, 124, 'Sarkotübüler sistem', 'T tübülü + SR', 'az gelişmiş');
        s += tx(350, 172, 'Düz kas gibi', { b: 1, c: '--ink' }) + card('istem', 350, 180, 160, 124, 'İstemsiz', 'ANS + endokrin', 'eksenler') + card('gap', 520, 180, 160, 124, 'Aralık bağlantıları', 'konneksin', 'sinsityum');
      } else {
        s += tx(8, 262, 'İskelet kası gibi', { b: 1, c: '--ink' }) + card('cizgili', 8, 270, 168, 124, 'Çizgili', 'kalın + ince', 'filamentler') + card('stub', 184, 270, 168, 124, 'Sarkotübüler sistem', 'T tübülü + SR', 'az gelişmiş');
        s += tx(8, 418, 'Düz kas gibi', { b: 1, c: '--ink' }) + card('istem', 8, 426, 168, 124, 'İstemsiz', 'ANS + endokrin', 'eksenler') + card('gap', 184, 426, 168, 124, 'Aralık bağlantıları', 'konneksin', 'sinsityum');
      }
      s += '</svg>';
      host.innerHTML = s;
      host.querySelectorAll('[data-k]').forEach((g) => {
        const go = () => { sel = g.dataset.k; if (AC[sel]) K.setCap(AC[sel]); else K.defCap(); draw(); };
        g.addEventListener('click', go);
        g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
      });
      ion();
    }
    const ion = () => { const d = host.querySelector('.f57-ion'); if (!d) return; const x0 = +d.dataset.x0, x1 = +d.dataset.x1; d.setAttribute('cx', RM || sel !== 'gap' ? (x0 + x1) / 2 : x0 + (x1 - x0) * ((tI % 1.2) / 1.2)); };
    draw();
    const stop = ticker(el, (dt) => { if (sel === 'gap' && !RM) { tI += dt; ion(); } });
    return () => { stop(); K.stop(); };
  };

  /* =====================================================================
     2 · f57_dmp · bölgeye göre RMP ve AP
     ===================================================================== */
  VIZ.f57_dmp = (el) => {
    const NT = 451;
    const frag = (fn) => { const a = []; for (let t = 0; t < NT; t++) a.push(fn(t)); return a; };
    const cyc = (u) => { // SA düğüm bir döngü (225 ms)
      if (u < 90) return -60 + (10 * u) / 90;
      if (u < 130) return -50 + (10 * (u - 90)) / 40;
      if (u < 160) return -40 + 50 * Math.sin(((u - 130) / 30) * (Math.PI / 2));
      if (u < 225) return -25 + 35 * Math.cos(((u - 160) / 65) * Math.PI);
      return -60;
    };
    const R = {
      sinir: { ad: 'Sinir', rmp: -70, fn: (t) => (t < 0 ? -70 : t < 1 ? -70 + 100 * t : t < 2 ? 30 - 100 * (t - 1) : -70) },
      sa: { ad: 'SA düğüm', rmp: -50, fn: (t) => cyc(t % 225) },
      atr: { ad: 'Atriyum', rmp: -70, fn: (t) => (t < 2 ? -70 + 45 * t : t < 150 ? 20 - (90 * (t - 2)) / 148 : -70) },
      purk: { ad: 'Purkinje', rmp: -90, fn: apGen(240, 50) },
      ven: { ad: 'Ventrikül', rmp: -90, fn: AP75 },
    };
    // SA eğrisi: faz 3 sonunda -60'a iner (u=225'te cos(π)·35−25 = −60)
    Object.values(R).forEach((r) => { r.a = frag(r.fn); });
    const INFO = {
      sinir: ['−70 mV', '1–2 ms', 'tek diken', 'rolü yok'],
      sa: ['≈ −50 mV, kararsız', 'Pacemaker bölümünde', 'zar kendiliğinden eşiğe kayar', 'Pacemaker bölümünde'],
      atr: ['−70 mV', 'üçgen dalga, plato yok', 'üçgen', '—'],
      purk: ['−90 mV', '200–400 ms', 'uzun plato', '—'],
      ven: ['−90 mV', '200–400 ms', 'uzun plato', 'Ca²⁺ girişi platoyu ve süreyi uzatır'],
    };
    const AC = {
      sinir: '<b>Sinir.</b> RMP −70 mV; aksiyon potansiyeli 1–2 ms süren tek bir dikendir. Ca²⁺’un rolü yoktur; dinlenim K⁺ geçirgenliğini sürekli açık sızıntı kanalları sağlar. [[K1 s. 252–253]]',
      sa: '<b>SA düğüm.</b> RMP yaklaşık −50 mV ve kararsızdır: zar kendiliğinden eşiğe kayar. [[K1 s. 252]]',
      atr: '<b>Atriyum miyositi.</b> RMP −70 mV; aksiyon potansiyeli üçgen biçimlidir, belirgin platosu yoktur. [[K1 s. 252–253]]',
      purk: '<b>Purkinje lifi.</b> RMP −90 mV; aksiyon potansiyeli 200–400 ms sürer, uzun platoludur. [[K1 s. 252–253]]',
      ven: null,
    };
    let sel = 'ven', from = R.ven.a, cur = R.ven.a, prog = 1;
    el.innerHTML = `${seg('Bölge', 'b', Object.keys(R).map((k) => [k, R[k].ad]), sel)}<div class="f57-host"></div><dl class="kv f57-kv"></dl>`;
    const host = el.querySelector('.f57-host'), kv = el.querySelector('.f57-kv');
    const K = prep(el, () => draw());
    function draw() {
      const n = K.narrow, W = n ? 360 : 640, H = 300, x0 = n ? 46 : 60, x1 = W - 12, y0 = 14, y1 = 250;
      const X = lin(0, 450, x0, x1), Y = lin(40, -100, y0, y1);
      let s = svgOpen(W, H, 'Seçili bölgenin aksiyon potansiyeli, diğer dört bölgenin soluk eğrileriyle birlikte; yatay eksen 0–450 ms, dikey eksen −100…+40 mV', n);
      [20, 0, -50, -70, -90].forEach((v) => { s += ln(x0, Y(v), x1, Y(v), '--line', 1) + tx(x0 - 6, Y(v) + 4, String(v).replace('-', '−'), { a: 'end' }); });
      for (let t = 0; t <= 400; t += 100) s += tx(X(t), y1 + 18, String(t), { a: 'middle' });
      s += tx(x1, y1 + 36, 'ms', { a: 'end' }) + tx(x0, 10, 'mV');
      Object.keys(R).forEach((k) => { if (k !== sel) s += pa(P(R[k].a.map((v, t) => [X(t), Y(v)])), '--line', 1.2); });
      s += pa(P(cur.map((v, t) => [X(t), Y(v)])), '--ink', 2.5);
      const rm = R[sel].rmp;
      s += ln(x0, Y(rm), x1, Y(rm), '--muted', 1, '5 4') + tx(x1, Y(rm) - 5, `RMP ${sel === 'sa' ? '≈ ' : ''}${String(rm).replace('-', '−')} mV`, { a: 'end', c: '--ink', b: 1 });
      host.innerHTML = s + '</svg>';
      const I = INFO[sel];
      kv.innerHTML = `<dt>RMP</dt><dd>${I[0]}</dd><dt>Süre</dt><dd>${I[1]}</dd><dt>Biçim</dt><dd>${I[2]}</dd><dt>Ca²⁺’un rolü</dt><dd>${I[3]}</dd>`;
    }
    el.querySelectorAll('[data-b]').forEach((b) => b.addEventListener('click', () => {
      from = cur; sel = b.dataset.b; setSeg(el, 'b', sel);
      if (AC[sel]) K.setCap(AC[sel]); else K.defCap();
      if (RM) { cur = R[sel].a; draw(); } else prog = 0;
    }));
    draw();
    const stop = ticker(el, (dt) => {
      if (prog >= 1) return;
      prog = Math.min(1, prog + dt / 0.4);
      const e = ease(prog), to = R[sel].a;
      cur = to.map((v, i) => lerp(from[i], v, e));
      draw();
    });
    return () => { stop(); K.stop(); };
  };

  /* =====================================================================
     3 · f57_faz · beş faz, kanallar, geçirgenlik, EKG
     ===================================================================== */
  VIZ.f57_faz = (el) => {
    const HRS = { 75: { plat: 200, f3: 50 }, 200: { plat: 105, f3: 35 } };
    const T0 = -25, T1 = 400;
    let hr = 75, step = 0, tcur = -12, playing = false;
    const AD = ['Faz 4', 'Faz 0', 'Faz 1', 'Faz 2', 'Faz 3', 'Faz 4 (son)'];
    const AC = [
      null,
      '<b>Faz 0 · hızlı depolarizasyon.</b> Komşu miyositlerden aralık bağlantılarıyla gelen akım zarı −65 mV eşiğine getirir; hızlı Na⁺ kanalları açılır, Na⁺ girişi yeni kanallar açar (pozitif geribildirim) ve zar ≈ +20 mV’a çıkar. [[K1 s. 253]]',
      '<b>Faz 1 · erken hızlı repolarizasyon.</b> Na⁺ kanalları inaktive olur; hızlı K⁺ kanallarından geçici dışa akım (I<sub>to</sub>) geçer. Faz 0 + 1 toplam 1–2 ms sürer; septum ve duvardaki toplamı QRS’tir. [[K1 s. 253–254]]',
      '<b>Faz 2 · plato (≈ 200 ms).</b> L tipi kanallardan Ca²⁺ içe girer (ECF ≈ 1,2 mmol/L → ICF ≈ 500 nmol/L); Kir kapalıdır, yavaş gecikmiş doğrultucu K⁺ kanalları dışa akım taşır. Net akım içe: plato. EKG’de ST segmenti. [[K1 s. 253, 255]]',
      '<b>Faz 3 · repolarizasyon (≈ 50 ms).</b> Ca²⁺ kanalları inaktive olur; I<sub>Kr</sub> ve I<sub>Ks</sub> dışa K⁺ akımı taşır, zar negatifleştikçe Kir yeniden açılır. EKG’de T dalgası. [[K1 s. 253, 255]]',
      '<b>Faz 4 · yeniden dinlenim.</b> K⁺ geçirgenliği Na⁺ ve Ca²⁺’unkini aşar; Na⁺/K⁺-ATPaz ve Na⁺/Ca²⁺ değiştiricisi aksiyon potansiyeli sırasındaki küçük iyon kaymalarını düzeltir. HR 75/dk’da tüm aksiyon potansiyeli ≈ 250 ms sürdü. [[K1 s. 253–254]]',
    ];
    const AC200 = '<b>HR 200/dk.</b> Aksiyon potansiyeli ≈ 150 ms’ye kısalır (75/dk’da ≈ 250 ms). QT aralığının hıza göre düzeltilmesi (QTc) bu yüzden gerekir. [[K1 s. 254–255]]';
    const EV = [
      ['Kir kanalları açık: K⁺ çıkışı zarı −90 mV’ta tutar'],
      ['Hızlı voltaj kapılı Na⁺ kanalları açılır', 'Kir kapanır'],
      ['Na⁺ kanalları inaktive', 'Hızlı voltaj kapılı K⁺ kanalları geçici açılır (I<sub>to</sub>)'],
      ['L tipi Ca²⁺ kanalları açılır', 'Hızlı K⁺ kanalları kapanır', 'Yavaş gecikmiş doğrultucu K⁺ kanalları (I<sub>Ks</sub>) açılır'],
      ['L tipi Ca²⁺ kanalları kapanır', 'Hızlı gecikmiş doğrultucu K⁺ kanalları (I<sub>Kr</sub>) açılır', 'Kir yeniden açılır'],
      ['Kir açık · Na⁺/K⁺-ATPaz, Na⁺/Ca²⁺ değiştiricisi çalışır'],
    ];
    const G = () => { const h = HRS[hr]; return { ap: apGen(h.plat, h.f3), e: 10 + h.plat, f3: h.f3 }; };
    // şematik göreli geçirgenlikler (log10)
    const permLog = (t, g) => {
      const e = g.e, z = e + g.f3;
      let na = -1, ca = -1, k;
      if (t >= 0 && t < 2) na = t < 0.7 ? -1 + 3 * (t / 0.7) : 2 - 3 * ((t - 0.7) / 1.3);
      if (t >= 2 && t < e) ca = t < 12 ? -1 + 1.6 * ((t - 2) / 10) : 0.6;
      else if (t >= e && t < e + g.f3 * 0.45) ca = 0.6 - 1.6 * ((t - e) / (g.f3 * 0.45));
      if (t < 0) k = 0;
      else if (t < 1) k = -0.52 * t;
      else if (t < 10) k = t < 4 ? -0.52 + 0.63 * ((t - 1) / 3) : 0.11 - 0.51 * ((t - 4) / 6);
      else if (t < e) k = -0.4;
      else if (t < z) k = -0.4 + 0.8 * ((t - e) / g.f3);
      else k = 0.4 * Math.exp(-(t - z) / 25);
      return [na, ca, k];
    };
    const ekg = (t, g) => {
      const e = g.e, z = e + g.f3;
      let v = 0;
      if (t > -9 && t < -5) v = -0.18 * Math.sin(((t + 9) / 4) * Math.PI);
      else if (t >= -5 && t < 2) v = Math.sin(((t + 5) / 7) * Math.PI);
      else if (t >= 2 && t < 6) v = -0.3 * Math.sin(((t - 2) / 4) * Math.PI);
      if (t > e - 8 && t < z + 14) v += 0.38 * Math.sin(((t - (e - 8)) / (g.f3 + 22)) * Math.PI);
      return v;
    };
    const phaseOf = (t, g) => (t < 0 ? 0 : t < 1 ? 1 : t < 10 ? 2 : t < g.e ? 3 : t < g.e + g.f3 ? 4 : 5);
    const repT = (i, g) => [-12, 0.5, 5, 105, g.e + g.f3 / 2, g.e + g.f3 + 45][i];
    el.innerHTML = `<div class="f57-ctl">${seg('Kalp hızı', 'h', [[75, 'HR 75/dk'], [200, 'HR 200/dk']], hr)}<output class="f57-chip" aria-live="off">APD ≈ 250 ms</output></div>
      <div class="f57-host"></div>
      <ul class="f57-ev" aria-label="Etkin fazda kanal olayları"></ul>
      <div class="f57-ctl"><button type="button" class="btn ghost f57-bt" data-a="geri">Geri</button><span class="f57-sayac" data-o="n"></span><button type="button" class="btn ghost f57-bt" data-a="ileri">İleri</button><button type="button" class="btn f57-bt" data-a="oynat"></button></div>`;
    const host = el.querySelector('.f57-host'), evl = el.querySelector('.f57-ev'), sayac = el.querySelector('[data-o=n]'), oy = el.querySelector('[data-a=oynat]'), chip = el.querySelector('.f57-chip');
    if (RM) oy.style.display = 'none';
    const K = prep(el, () => draw());
    function draw() {
      const n = K.narrow, g = G(), W = n ? 360 : 680, H = n ? 560 : 470;
      const x0 = n ? 42 : 60, x1 = n ? 348 : 646;
      const sA = n ? [14, 224] : [20, 210], sB = n ? [246, 396] : [236, 356], sC = n ? [416, 486] : [374, 436];
      const X = lin(T0, T1, x0, x1), ph = phaseOf(tcur, g);
      const ya = lin(30, -110, sA[0], sA[1]), yb = lin(2, -1, sB[0], sB[1]), yc = lin(1.15, -0.4, sC[0], sC[1]);
      let s = svgOpen(W, H, 'Ventrikül aksiyon potansiyelinin fazları, üç iyonun göreli geçirgenliği ve EKG; zaman imleci etkin fazı gösterir', n);
      // etkin faz bandı
      const b = [[T0, 0], [0, 1], [1, 10], [10, g.e], [g.e, g.e + g.f3], [g.e + g.f3, T1]][ph];
      let bx0 = X(b[0]), bx1 = X(b[1]); if (bx1 - bx0 < 5) { const c = (bx0 + bx1) / 2; bx0 = c - 2.5; bx1 = c + 2.5; }
      s += `<rect x="${f1(bx0)}" y="${sA[0]}" width="${f1(bx1 - bx0)}" height="${sC[1] - sA[0]}" style="fill:var(--accent-soft)"/>`;
      // ---- üst şerit: membran potansiyeli
      [20, 0, -65, -90].forEach((v) => { s += tx(x0 - 5, ya(v) + 4, String(v).replace('-', '−'), { a: 'end' }); });
      s += ln(x0, ya(-65), x1, ya(-65), '--crit', 1, '5 4') + ln(x0, ya(-90), x1, ya(-90), '--muted', 1, '5 4');
      s += tx(x1, ya(-65) - 5, 'Eşik ≈ −65 mV', { a: 'end', c: '--crit' }) + tx(x1, ya(-90) - 5, 'RMP −90 mV', { a: 'end' }) + tx(x0, sA[0] - 4 + 2, 'mV', { a: 'start' });
      if (hr === 200) s += pa(P(sample(AP75, T0, T1, 1).map(([t, v]) => [X(t), ya(v)])), '--line', 1.5, { d: '4 3' });
      const pts = sample(g.ap, T0, T1, 1);
      s += pa(P(pts.map(([t, v]) => [X(t), ya(v)])), '--ink', 2.5);
      const seg4 = (a, z) => pts.filter(([t]) => t >= a && t <= z).map(([t, v]) => [X(t), ya(v)]);
      const act = [[[T0, 0]], [[0, 1]], [[1, 10]], [[10, g.e]], [[g.e, g.e + g.f3]], [[g.e + g.f3, T1]]][ph];
      let ap = seg4(act[0][0], act[0][1]);
      if (ph === 1) ap = [[X(0), ya(-90)], [X(1), ya(20)]];
      if (ap.length > 1) s += pa(P(ap), '--accent', 4.5);
      s += num(4, X(-12), ya(-72), ph === 0) + num(0, X(0) - 15, ya(-35), ph === 1) + num(1, X(5), ya(5) - 17, ph === 2) + num(2, X(10 + (g.e - 10) / 2), ya(3) - 17, ph === 3) + num(3, X(g.e + g.f3 / 2) + 15, ya(-45), ph === 4) + num(4, X(g.e + g.f3 + 58), ya(-40), ph === 5);
      // ---- orta şerit: geçirgenlik (log)
      [[1.9, '100'], [1, '10'], [0, '1'], [-1, '0,1']].forEach(([v, l]) => { s += ln(x0, yb(v), x1, yb(v), '--line', 1) + tx(x0 - 5, yb(v) + 4, l, { a: 'end' }); });
      s += tx(x0, sB[0] - 4, 'Göreli geçirgenlik (log)');
      const cols = ['--c-basic', '--warn', '--ok'];
      const sam = sample((t) => permLog(t, g), T0, T1, 1);
      cols.forEach((c, i) => { s += pa(P(sam.map(([t, v]) => [X(t), yb(clamp(v[i], -1, 2))])), c, 2); });
      const pc = permLog(tcur, g);
      cols.forEach((c, i) => { s += ci(X(tcur), yb(clamp(pc[i], -1, 2)), 4.5, c, '--paper'); });
      s += tx(X(0) + 8, yb(1.9) + 14, 'Na⁺', { c: '--c-basic', b: 1 }) + tx(X(g.e - 40), yb(0.6) - 7, 'Ca²⁺', { c: '--warn', b: 1 }) + tx(X(g.e + g.f3 + 70), yb(0) + 17, 'K⁺', { c: '--ok', b: 1 });
      // ---- alt şerit: EKG
      const es = sample((t) => ekg(t, g), T0, T1, 0.5);
      s += ln(x0, yc(0), x1, yc(0), '--line', 1) + tx(x0, sC[0] - 4, 'EKG (tek atım)');
      s += pa(P(es.map(([t, v]) => [X(t), yc(v)])), '--ink', 2);
      const ea = [[T0, -9], [-9, 8], [-9, 8], [10, g.e], [g.e - 8, g.e + g.f3 + 14], [g.e + g.f3 + 14, T1]][ph];
      if (ph !== 5 && ph !== 0) s += pa(P(es.filter(([t]) => t >= ea[0] && t <= ea[1]).map(([t, v]) => [X(t), yc(v)])), '--accent', 3.5);
      s += tx(X(-5) + 14, yc(1) + 4, 'QRS', { c: '--ink' }) + tx(X(g.e / 2 + 5), yc(0) - 6, 'ST', { a: 'middle', c: '--ink' }) + tx(X(g.e + g.f3 / 2 + 3), yc(0.4) - 5, 'T', { a: 'middle', c: '--ink' });
      // zaman ekseni
      for (let t = 0; t <= 400; t += 100) s += ln(X(t), sC[1], X(t), sC[1] + 4, '--muted') + tx(X(t), sC[1] + 18, String(t), { a: 'middle' });
      s += tx(x1, sC[1] + 34, 'ms', { a: 'end' });
      // imleç
      s += `<line x1="${f1(X(tcur))}" y1="${sA[0]}" x2="${f1(X(tcur))}" y2="${sC[1]}" style="stroke:var(--accent);stroke-width:1.5"/>`;
      // mini zar kesiti (yalnız geniş)
      if (!n) {
        const ix = 486, iy = 24, wd = (v) => 1 + 5 * clamp((v + 1) / 3, 0, 1);
        s += rc(ix, iy, 150, 76, '--paper', '--line', 6) + rc(ix + 6, iy + 34, 138, 8, '--chip', '--muted', 3) + tx(ix + 144, iy + 30, 'ECF', { s: 11, a: 'end' }) + tx(ix + 144, iy + 56, 'ICF', { s: 11, a: 'end' });
        [[0, 22, 1], [1, 62, 1], [2, 102, -1]].forEach(([i, cx, dir]) => {
          const w = wd(pc[i]), y1a = dir > 0 ? iy + 18 : iy + 62, y2a = dir > 0 ? iy + 58 : iy + 22;
          s += `<line x1="${ix + cx}" y1="${y1a}" x2="${ix + cx}" y2="${y2a}" style="stroke:var(${cols[i]});stroke-width:${f1(w)}"/>` + pa(`M${ix + cx - 5} ${y2a + (dir > 0 ? -7 : 7)} L${ix + cx} ${y2a} L${ix + cx + 5} ${y2a + (dir > 0 ? -7 : 7)}`, cols[i], 2);
          s += tx(ix + cx, iy + (i === 2 ? 14 : 14) + 0, ['Na⁺', 'Ca²⁺', 'K⁺'][i], { a: 'middle', c: cols[i], b: 1, s: 11 });
        });
      }
      host.innerHTML = s + '</svg>';
      evl.innerHTML = EV[ph].map((t) => `<li>${t}</li>`).join('');
      sayac.textContent = `${AD[ph]} · ${step + 1} / 6`;
      chip.textContent = hr === 75 ? 'APD ≈ 250 ms' : 'APD ≈ 150 ms';
      oy.textContent = playing ? 'Duraklat' : 'Oynat';
    }
    let lastPh = -1;
    const capFor = () => { const ph = phaseOf(tcur, G()); if (ph !== lastPh) { lastPh = ph; step = ph; if (ph === 0) K.defCap(); else K.setCap(hr === 200 && ph === 3 ? AC[3].replace('plato (≈ 200 ms)', 'plato (kısalmış)') : hr === 200 && ph === 4 ? AC[4].replace('(≈ 50 ms)', '(kısalmış)') : AC[ph]); } };
    const goStep = (i) => { step = clamp(i, 0, 5); tcur = repT(step, G()); lastPh = -1; capFor(); draw(); };
    el.querySelector('[data-a=geri]').addEventListener('click', () => { playing = false; goStep(step - 1); });
    el.querySelector('[data-a=ileri]').addEventListener('click', () => { playing = false; goStep(step + 1); });
    oy.addEventListener('click', () => { playing = !playing; if (playing && tcur > T1 - 2) tcur = T0; draw(); });
    el.querySelectorAll('[data-h]').forEach((b) => b.addEventListener('click', () => {
      hr = +b.dataset.h; setSeg(el, 'h', hr); playing = false; goStep(step);
      if (hr === 200) K.setCap(AC200);
    }));
    draw();
    const stop = ticker(el, (dt) => {
      if (!playing) return;
      tcur += dt * ((T1 - T0) / 6);
      if (tcur >= T1) { tcur = T1; playing = false; }
      capFor(); draw();
    });
    return () => { stop(); K.stop(); };
  };

  /* =====================================================================
     4 · f57_refrakter · ikinci uyaran
     ===================================================================== */
  VIZ.f57_refrakter = (el) => {
    let ts = 100, guc = 'n', prog = 1, lastKey = '', geo = { W: 680, x0: 58, x1: 626 };
    const kas = (t) => (t < 20 || t > 310 ? 0 : t < 170 ? 0.5 * (1 - Math.cos((Math.PI * (t - 20)) / 150)) : 0.5 * (1 + Math.cos((Math.PI * (t - 170)) / 140)));
    el.innerHTML = `${seg('Uyaran gücü', 'g', [['n', 'Normal uyaran'], ['g', 'Güçlü uyaran']], guc)}<div class="f57-host"></div>
      <label class="f57-rng"><span>İkinci uyaranın zamanı <b data-o="t"></b></span><input type="range" min="30" max="440" step="1" value="100" aria-label="İkinci uyaranın zamanı (ms)"></label>
      <div class="f57-ctl"><output class="f57-chip" aria-live="polite"></output><span class="f57-not"></span></div>`;
    const host = el.querySelector('.f57-host'), rng = el.querySelector('input'), chip = el.querySelector('.f57-chip'), not = el.querySelector('.f57-not');
    const K = prep(el, () => draw());
    const sonuc = () => (ts < 200 ? 0 : ts < 260 ? (guc === 'g' ? 1 : 2) : 3);
    function draw() {
      const n = K.narrow, W = n ? 360 : 680, H = n ? 360 : 340, x0 = n ? 40 : 58, x1 = n ? 346 : 626;
      const X = lin(0, 450, x0, x1), Y = lin(30, -100, 18, n ? 190 : 205), YK = lin(0, 100, n ? 190 : 205, 18);
      const yb = (n ? 190 : 205) + 8, r = sonuc();
      let s = svgOpen(W, H, 'Ventrikül aksiyon potansiyeli, kasılma gerimi ve mutlak ile göreceli refrakter dönem bantları; ikinci uyaran sürüklenebilir', n, 'style="touch-action:pan-y"');
      [20, 0, -90].forEach((v) => { s += ln(x0, Y(v), x1, Y(v), '--line', 1) + tx(x0 - 5, Y(v) + 4, String(v).replace('-', '−'), { a: 'end' }); });
      s += tx(x0 - 5, 12, 'mV', { a: 'end' }) + tx(x1, 12, '% gerim', { a: 'end', c: '--crit' });
      s += rc(X(0), yb, X(200) - X(0), 26, '--crit-soft', '--crit', 3) + tx((X(0) + X(200)) / 2, yb + 18, 'ARP ≈ 200 ms', { a: 'middle', c: '--ink', b: 1 });
      s += rc(X(200), yb, X(260) - X(200), 26, '--warn-soft', '--warn', 3) + tx(X(230), yb + 18, 'RRP', { a: 'middle', c: '--ink', b: 1 });
      for (let t = 0; t <= 400; t += 100) s += tx(X(t), yb + 46, String(t), { a: 'middle' });
      s += tx(x1, yb + 46, 'ms', { a: 'end' });
      s += pa(P(sample(kas, 0, 450, 3).map(([t, v]) => [X(t), YK(v * 100)])), '--crit', 2, { d: r === 3 ? '' : '', op: 0.9 });
      s += pa(P(sample(AP75, 0, 450, 1).map(([t, v]) => [X(t), Y(v)])), '--ink', 2.5);
      // ikinci AP
      const lim = ts + prog * (450 - ts);
      if (r === 3) {
        const pts = sample((t) => AP75(t - ts), ts, 450, 1).filter(([t]) => t <= lim);
        s += pa(P([[X(ts), Y(-90)], ...pts.map(([t, v]) => [X(t), Y(v)])]), '--accent', 3);
        s += pa(P(sample((t) => kas(t - ts), ts, 450, 3).filter(([t]) => t <= lim).map(([t, v]) => [X(t), YK(v * 100)])), '--crit', 2, { op: 0.35, d: '4 3' });
      } else if (r === 1) {
        const w = [[0, AP75(ts)], [1, 0], [8, -3], [30, -10], [45, -20], [75, -90]].map(([d, v]) => [ts + d, v]).filter(([t]) => t <= lim);
        s += pa(P(w.map(([t, v]) => [X(t), Y(v)])), '--accent', 3);
      }
      // uyaran işaretçisi
      const mx = X(ts), my = yb + 66;
      s += `<g class="f57-stim" style="cursor:ew-resize"><line x1="${f1(mx)}" y1="${Y(30)}" x2="${f1(mx)}" y2="${my - 30}" style="stroke:var(--accent);stroke-width:1.5;stroke-dasharray:4 3"/>`;
      s += pa(`M${f1(mx)} ${my - 30} L${f1(mx - 9)} ${my - 14} L${f1(mx - 3)} ${my - 14} L${f1(mx - 3)} ${my - 4} L${f1(mx + 3)} ${my - 4} L${f1(mx + 3)} ${my - 14} L${f1(mx + 9)} ${my - 14} Z`, '--accent', 1.5, { f: '--accent' });
      s += `<rect x="${f1(mx - 18)}" y="${my - 34}" width="36" height="36" style="fill:transparent"/></g>`;
      if (r === 0) s += tx(mx, my + 14, '×', { a: 'middle', c: '--crit', b: 1, s: 20 });
      host.innerHTML = s + '</svg>';
      geo = { W, x0, x1 };
      el.querySelector('[data-o=t]').textContent = ts + ' ms';
      const L = ['Yanıt yok', 'Güçlü uyaranla yeni AP', 'Yanıt yok', 'Normal uyaran yeterli'][r];
      chip.textContent = L; not.textContent = r === 3 && kas(ts) > 0.02 ? 'İlk kasılma neredeyse bitti' : '';
    }
    function cap() {
      const r = sonuc(), key = r + ':' + ts;
      if (r === 0) { if (ts === 100) K.defCap(); else K.setCap(`<b>Uyaran ${ts} ms’de: mutlak refrakter dönem.</b> Uyaran ne kadar güçlü olursa olsun yeni aksiyon potansiyeli doğmaz. Uyaranı sürükleyin. [[K1 s. 255]]`); }
      else if (r === 2) K.setCap(`<b>Uyaran ${ts} ms’de: göreceli refrakter dönem.</b> Normal uyaran yetmez; güçlü uyaranı deneyin. [[K1 s. 255]]`);
      else if (r === 1) K.setCap(`<b>Uyaran ${ts} ms’de: göreceli refrakter dönem.</b> Normalden güçlü bir uyaran yeni bir aksiyon potansiyeli başlatabilir. [[K1 s. 255]]`);
      else K.setCap(`<b>Uyaran ${ts} ms’de.</b> Normal uyaran yeni aksiyon potansiyeli başlatır; o sırada ilk kasılma neredeyse bitmiştir. Kısa bir ARP tetaniye ve diyastolik dolumun bozulmasına yol açardı. [[K1 s. 255]]`);
      lastKey = key;
    }
    function set(v) {
      v = clamp(Math.round(v), 30, 440); if (v === ts) return;
      const r0 = sonuc(); ts = v; rng.value = v;
      if (sonuc() !== r0 && sonuc() >= 1 && !RM) prog = 0; else if (sonuc() >= 1 && sonuc() !== r0) prog = 1;
      cap(); draw();
    }
    const setFromX = (cx) => { const svg = host.querySelector('svg'); if (!svg) return; const bb = svg.getBoundingClientRect(); const vx = ((cx - bb.left) / bb.width) * geo.W; set(lin(geo.x0, geo.x1, 0, 450)(vx)); };
    host.addEventListener('pointerdown', (e) => { host.setPointerCapture(e.pointerId); host._d = true; setFromX(e.clientX); });
    host.addEventListener('pointermove', (e) => { if (host._d) setFromX(e.clientX); });
    host.addEventListener('pointerup', () => { host._d = false; });
    host.addEventListener('pointercancel', () => { host._d = false; });
    rng.addEventListener('input', () => set(+rng.value));
    el.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', () => { guc = b.dataset.g; setSeg(el, 'g', guc); if (!RM && sonuc() === 1) prog = 0; cap(); draw(); }));
    draw();
    const stop = ticker(el, (dt) => { if (prog < 1) { prog = Math.min(1, prog + dt / 0.6); draw(); } });
    return () => { stop(); K.stop(); };
  };

  /* =====================================================================
     5 · f57_vw · antiaritmik sınıflar
     ===================================================================== */
  VIZ.f57_vw = (el) => {
    const pm = (ph4, ph0, ph3, peak) => (t) => {
      const C = ph4 + ph0 + ph3, u = t % C;
      if (u < ph4) return -60 + 20 * Math.pow(u / ph4, 1.5);
      if (u < ph4 + ph0) return -40 + (peak + 40) * Math.sin(((u - ph4) / ph0) * (Math.PI / 2));
      return peak + ((-60 - peak) * (1 - Math.cos(Math.PI * ((u - ph4 - ph0) / ph3)))) / 2;
    };
    const VE = Array.from({ length: 401 }, (_, t) => t), AVt = Array.from({ length: 401 }, (_, i) => i * 2);
    const vArr = (fn) => VE.map(fn), aArr = (fn) => AVt.map(fn);
    const baseV = vArr(AP75), baseA = aArr(pm(260, 60, 80, 10));
    const ead = (t) => AP75(t) + (t > 120 && t < 190 ? 9 * Math.sin(((t - 120) / 70) * Math.PI) : 0);
    const CL = {
      I: { v: vArr(apGen(200, 50, 6)), a: baseA, lbl: '↓ uyarılabilirlik, ↓ ileti hızı', erp: 0, row: ['Na⁺ kanalı blokajı', 'alt sınıflar IA, IB, IC', '—', '↓ uyarılabilirlik, ↓ ileti hızı'] },
      IA: { v: vArr(apGen(252, 50, 6)), a: baseA, lbl: '↑ APD ve ERP', erp: 312, row: ['Na⁺ kanalı blokajı (orta kinetik)', 'kinidin, prokainamid', 'AF, SVT', '↑ APD ve ERP'] },
      IB: { v: vArr(apGen(161, 50, 4)), a: baseA, lbl: '↓ APD ve ERP', erp: 224, row: ['Na⁺ kanalı blokajı (hızlı kinetik)', 'lidokain', 'digoksin toksisitesinde (VF)', '↓ APD ve ERP'] },
      IC: { v: vArr(apGen(200, 50, 12)), a: baseA, lbl: 'APD normal', erp: 0, row: ['Na⁺ kanalı blokajı (yavaş kinetik); K⁺ kanallarını da bloke eder', 'flekainid', 'AF, SVT', 'APD normal'] },
      II: { v: baseV, a: aArr(pm(377, 60, 80, 10)), lbl: '↓ sempatik etki, ↓ AV iletimi', erp: 0, row: ['β-bloker', 'propranolol, bisoprolol', 'VT, AF, SVT', '↓ sempatik etki, ↓ AV iletimi'] },
      III: { v: vArr(apGen(265, 50, 1)), a: baseA, lbl: '↑ APD ve ERP', erp: 325, row: ['K⁺ kanalı blokajı; amiodaron Na⁺ ve Ca²⁺ kanallarını da, sotalol β reseptörlerini de bloke eder', 'amiodaron, sotalol', 'VT, AF, SVT, (VF)', '↑ APD ve ERP'] },
      IV: { v: baseV, a: aArr(pm(310, 120, 80, 0)), lbl: 'Sempatik etkiyi değiştirmeden ↓ AV iletimi', erp: 0, row: ['Ca²⁺ kanalı blokajı', 'verapamil', 'AF, SVT', 'sempatik etkiyi değiştirmeden ↓ AV iletimi'] },
      V: { v: baseV, a: baseA, lbl: '', erp: 0, row: ['diğer', 'adenozin, digoksin, MgSO₄', 'SVT, AF, TdP', ''] },
    };
    const SUB = { ad: { a: aArr(pm(350, 60, 80, 10)), v: baseV, lbl: '↓ AV iletimi', row: ['adenozin', 'SVT', '↓ AV iletimi'] }, dg: { a: aArr(pm(390, 60, 80, 10)), v: baseV, lbl: '↓ AV iletimi ve HR', row: ['digoksin', 'AF', '↓ AV iletimi ve HR'] }, mg: { a: baseA, v: vArr(ead), lbl: '↓ Ca²⁺ girişi ve EAD', row: ['MgSO₄', 'TdP', '↓ Ca²⁺ girişi ve EAD'], ead: true } };
    const AC = {
      I: null,
      IA: '<b>Sınıf IA · orta kinetik.</b> Kinidin, prokainamid; AF ve SVT’de. APD ve ERP uzar. [[K1 s. 256]]',
      IB: '<b>Sınıf IB · hızlı kinetik.</b> Lidokain; digoksin toksisitesinde (VF). APD ve ERP kısalır. [[K1 s. 256]]',
      IC: '<b>Sınıf IC · yavaş kinetik.</b> Flekainid; AF ve SVT’de. APD normal kalır. Flekainid K⁺ kanallarını da bloke eder. [[K1 s. 255–256]]',
      II: '<b>Sınıf II · β-blokerler.</b> Propranolol, bisoprolol; VT, AF, SVT’de. Sempatik etkiyi ve AV düğüm iletimini azaltır. [[K1 s. 256]]',
      III: '<b>Sınıf III · K⁺ kanalı blokerleri.</b> Amiodaron, sotalol; VT, AF, SVT’de (VF’de sınırlı). APD ve ERP uzar. Amiodaron Na⁺ ve Ca²⁺ kanallarını da bloke eder; sotalol aynı zamanda β-blokerdir. [[K1 s. 255–256]]',
      IV: '<b>Sınıf IV · Ca²⁺ kanalı blokerleri.</b> Verapamil; AF ve SVT’de. Sempatik etkiyi değiştirmeden AV düğüm iletimini azaltır. [[K1 s. 256]]',
      V: '<b>Sınıf V · diğer.</b> Adenozin (SVT): AV iletimi ↓; digoksin (AF): AV iletimi ve HR ↓; MgSO₄ (TdP): Ca²⁺ girişi ve EAD ↓. [[K1 s. 256]]',
    };
    let cls = 'I', sub = 'ad', prog = 1, fromV = baseV, fromA = baseA, curV = baseV, curA = baseA;
    const tgt = () => { const c = CL[cls]; if (cls === 'V') { const u = SUB[sub]; return { v: u.v, a: u.a }; } return { v: c.v, a: c.a }; };
    el.innerHTML = `${seg('Vaughan Williams sınıfı', 'c', Object.keys(CL).map((k) => [k, k]), cls)}<div class="f57-sub" hidden>${seg('Sınıf V ilacı', 's', [['ad', 'Adenozin'], ['dg', 'Digoksin'], ['mg', 'MgSO₄']], sub)}</div><div class="f57-host"></div><div class="f57-ctl"><output class="f57-chip"></output></div><dl class="kv f57-kv"></dl>`;
    const host = el.querySelector('.f57-host'), kv = el.querySelector('.f57-kv'), chip = el.querySelector('.f57-chip'), subEl = el.querySelector('.f57-sub');
    const K = prep(el, () => draw());
    function draw() {
      const n = K.narrow, W = n ? 360 : 680, H = n ? 520 : 320, c = CL[cls];
      const px = n ? [[44, 346, 28, 200], [44, 346, 296, 468]] : [[44, 326, 40, 232], [380, 660, 40, 232]];
      let s = svgOpen(W, H, 'Seçili antiaritmik sınıfın ventrikül miyositi ve AV düğüm aksiyon potansiyeline etkisi; temel eğri soluk, ilaçlı eğri vurgulu', n);
      const draws = [[px[0], 400, baseV, curV, VE, 'Ventrikül miyositi', [0, -90]], [px[1], 800, baseA, curA, AVt, 'AV düğüm', [0, -40, -60]]];
      draws.forEach(([[xa, xb, ya0, ya1], tmax, b, d, ts, title, ticks], i) => {
        const X = lin(0, tmax, xa, xb), Y = lin(30, -100, ya0, ya1);
        s += tx(xa, ya0 - 12, title, { b: 1, c: '--ink' });
        ticks.forEach((v) => { s += ln(xa, Y(v), xb, Y(v), '--line', 1) + tx(xa - 5, Y(v) + 4, String(v).replace('-', '−'), { a: 'end' }); });
        for (let t = 0; t <= tmax; t += tmax / 4) s += tx(X(t), ya1 + 18, String(t), { a: 'middle' });
        s += tx(xb, ya1 + 34, 'ms', { a: 'end' });
        s += pa(P(b.map((v, k) => [X(ts[k]), Y(v)])), '--line', 1.5, { d: '4 3' });
        s += pa(P(d.map((v, k) => [X(ts[k]), Y(v)])), '--accent', 2.8);
        if (i === 0 && c.erp && cls !== 'V') {
          s += ln(X(260), ya1 - 40, X(260), ya1, '--muted', 1, '3 3');
          s += rc(X(0), ya1 + 38, X(Math.min(c.erp, 400)) - X(0), 8, '--accent', null, 2) + tx(X(Math.min(c.erp, 400)) + 6, ya1 + 46, 'ERP', { c: '--ink', b: 1 });
        }
        if (i === 0 && cls === 'V' && sub === 'mg') {
          s += tx(X(155), Y(26) - 2, 'EAD', { a: 'middle', c: '--crit', b: 1 });
          s += ln(X(135), Y(18), X(175), Y(-6), '--crit', 2.5) + ln(X(135), Y(-6), X(175), Y(18), '--crit', 2.5);
        }
      });
      host.innerHTML = s + '</svg>';
      subEl.hidden = cls !== 'V';
      const lbl = cls === 'V' ? SUB[sub].lbl : c.lbl;
      chip.textContent = lbl || 'Alt sınıf seçin';
      const r = c.row;
      let rows = `<dt>Sınıf</dt><dd>${cls}${cls === 'V' ? ' · ' + SUB[sub].row[0] : ''}</dd><dt>Mekanizma</dt><dd>${cls === 'V' ? 'diğer' : r[0]}</dd>`;
      if (cls === 'V') rows += `<dt>Kullanım</dt><dd>${SUB[sub].row[1]}</dd><dt>Etki</dt><dd>${SUB[sub].row[2]}</dd>`;
      else rows += `<dt>Örnek</dt><dd>${r[1]}</dd>` + (r[2] !== '—' ? `<dt>Kullanım</dt><dd>${r[2]}</dd>` : '') + `<dt>Etki</dt><dd>${r[3]}</dd>`;
      kv.innerHTML = rows;
    }
    const go = () => { const t = tgt(); fromV = curV; fromA = curA; if (RM) { curV = t.v; curA = t.a; draw(); } else prog = 0; };
    el.querySelectorAll('[data-c]').forEach((b) => b.addEventListener('click', () => { cls = b.dataset.c; setSeg(el, 'c', cls); if (AC[cls]) K.setCap(AC[cls]); else K.defCap(); go(); if (RM) draw(); else draw(); }));
    el.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => { sub = b.dataset.s; setSeg(el, 's', sub); go(); draw(); }));
    draw();
    const stop = ticker(el, (dt) => {
      if (prog >= 1) return;
      prog = Math.min(1, prog + dt / 0.4);
      const e = ease(prog), t = tgt();
      curV = t.v.map((v, i) => lerp(fromV[i], v, e)); curA = t.a.map((v, i) => lerp(fromA[i], v, e));
      draw();
    });
    return () => { stop(); K.stop(); };
  };

  /* =====================================================================
     6 · f57_pace · SA düğümde bir döngü
     ===================================================================== */
  VIZ.f57_pace = (el) => {
    const CYC = 500, TOT = 1000;
    const V = (t) => {
      const u = t % CYC;
      if (u < 230) return -60 + (10 * u) / 230;
      if (u < 330) return -50 + (10 * (u - 230)) / 100;
      if (u < 400) return -40 + 50 * Math.sin(((u - 330) / 70) * (Math.PI / 2));
      return -25 + 35 * Math.cos(((u - 400) / 100) * Math.PI);
    };
    const AD = ['Faz 4 erken', 'Faz 4 geç', 'Faz 0', 'Faz 3'];
    const AC = [
      null,
      '<b>−50 mV · T tipi Ca²⁺ kanalları açılır.</b> ECF’den (≈ 1,2 mmol/L) ICF’ye (≈ 500 nmol/L) giren Ca²⁺ depolarizasyonu hızlandırır; zar −40 mV eşiğine varır. [[K1 s. 256–257]]',
      '<b>Faz 0 · L tipi Ca²⁺ kanalları açılır.</b> Eşikten sonra yükselişi Ca²⁺ girişi oluşturur. [[K1 s. 257]]',
      '<b>Faz 3 · HCN ve Ca²⁺ kanalları kapanır, voltaj kapılı K⁺ kanalları açılır.</b> Zar −60 mV’a döner; hiperpolarizasyon HCN kanallarını yeniden açar ve döngü tekrarlar. Faz 4’ün eğimi HR’yi belirler: otomatisite. [[K1 s. 256–257]]',
    ];
    const REP = [110, 280, 365, 450];
    const ROWS = [['HCN (Na⁺ içe > K⁺ dışa)', '--c-basic', 0, 330], ['T tipi Ca²⁺', '--warn', 230, 330], ['L tipi Ca²⁺', '--warn', 330, 400], ['Voltaj kapılı K⁺', '--ok', 400, 500]];
    const stepOf = (u) => (u < 230 ? 0 : u < 330 ? 1 : u < 400 ? 2 : 3);
    let tcur = 110, playing = false, step = 0, lastS = -1;
    el.innerHTML = `<div class="f57-host"></div><div class="f57-ctl"><button type="button" class="btn ghost f57-bt" data-a="geri">Geri</button><span class="f57-sayac"></span><button type="button" class="btn ghost f57-bt" data-a="ileri">İleri</button><button type="button" class="btn f57-bt" data-a="oynat"></button></div>`;
    const host = el.querySelector('.f57-host'), sayac = el.querySelector('.f57-sayac'), oy = el.querySelector('[data-a=oynat]');
    if (RM) oy.style.display = 'none';
    const K = prep(el, () => draw());
    function draw() {
      const n = K.narrow, W = n ? 360 : 680, H = n ? 440 : 380, x0 = n ? 44 : 60, x1 = n ? 348 : 650;
      const X = lin(0, TOT, x0, x1), ya0 = n ? 16 : 18, ya1 = n ? 200 : 205, Y = lin(20, -80, ya0, ya1);
      const u = tcur % CYC, st = stepOf(u);
      let s = svgOpen(W, H, 'SA düğüm aksiyon potansiyeli iki döngü boyunca; altında HCN, T tipi Ca²⁺, L tipi Ca²⁺ ve K⁺ kanallarının açık kaldığı aralıklar; zaman imleci', n);
      [20, 0, -20, -40, -60, -80].forEach((v) => { s += ln(x0, Y(v), x1, Y(v), '--line', 1) + tx(x0 - 5, Y(v) + 4, String(v).replace('-', '−'), { a: 'end' }); });
      s += ln(x0, Y(-40), x1, Y(-40), '--crit', 1, '5 4') + ln(x0, Y(-60), x1, Y(-60), '--muted', 1, '5 4');
      s += tx(x1, Y(-40) - 5, 'Eşik ≈ −40 mV', { a: 'end', c: '--crit' }) + tx(x1, Y(-60) + 15, '−60 mV', { a: 'end' });
      s += pa(P(sample(V, 0, TOT, 4).map(([t, v]) => [X(t), Y(v)])), '--ink', 2.5);
      [0, CYC].forEach((o) => { s += num(4, X(o + 120), Y(-60) - 24, st === 0 || st === 1) + num(0, X(o + 365) - 17, Y(-20), st === 2) + num(3, X(o + 450) + 17, Y(-20), st === 3); });
      const cy = Y(V(tcur));
      // kanal çizelgesi
      const r0 = n ? 232 : 236, dy = n ? 40 : 34;
      ROWS.forEach(([ad, c, a, b], i) => {
        const y = r0 + i * dy, on = u >= a && u < b;
        s += tx(x0, y, ad, { c: on ? '--ink' : '--muted', b: on ? 1 : 0 }) + ln(x0, y + 15, x1, y + 15, '--line', 1);
        [0, CYC].forEach((o) => { s += rc(X(o + a), y + 6, X(o + b) - X(o + a), 11, c, null, 3, `opacity="${i === 1 ? 0.6 : 1}"`); });
        if (on) s += rc(x0 - 2, y - 14, x1 - x0 + 4, 34, null, '--accent', 6);
      });
      const ye = r0 + 4 * dy - 4;
      for (let t = 0; t <= TOT; t += 250) s += tx(X(t), ye + 14, String(t), { a: 'middle' });
      s += tx(x1, ye + 32, 'ms (temsilî)', { a: 'end' });
      s += `<line x1="${f1(X(tcur))}" y1="${ya0}" x2="${f1(X(tcur))}" y2="${ye - 6}" style="stroke:var(--accent);stroke-width:1.6"/>` + ci(X(tcur), cy, 5, '--accent', '--paper');
      if (!n) {
        const ix = 74, iy = 24, ar = (cx, dir, w, c) => `<line x1="${ix + cx}" y1="${dir > 0 ? iy + 18 : iy + 58}" x2="${ix + cx}" y2="${dir > 0 ? iy + 56 : iy + 20}" style="stroke:var(${c});stroke-width:${w}"/>` + pa(`M${ix + cx - 5} ${dir > 0 ? iy + 49 : iy + 27} L${ix + cx} ${dir > 0 ? iy + 56 : iy + 20} L${ix + cx + 5} ${dir > 0 ? iy + 49 : iy + 27}`, c, 2);
        s += rc(ix, iy, 132, 70, '--paper', '--line', 6) + rc(ix + 6, iy + 32, 120, 8, '--chip', '--muted', 3);
        let a = '';
        if (u < 330) a += ar(30, 1, 4, '--c-basic') + ar(52, -1, 1.5, '--ok');
        if (u >= 230 && u < 330) a += ar(78, 1, 3, '--warn');
        if (u >= 330 && u < 400) a += ar(78, 1, 5.5, '--warn');
        if (u >= 400) a += ar(104, -1, 5, '--ok');
        s += a + tx(ix + 128, iy + 14, 'ECF', { a: 'end', s: 11 }) + tx(ix + 128, iy + 64, 'ICF', { a: 'end', s: 11 });
      }
      host.innerHTML = s + '</svg>';
      sayac.textContent = `${AD[st]} · ${st + 1} / 4`;
      oy.textContent = playing ? 'Duraklat' : 'Oynat';
      return st;
    }
    const capUpd = (st) => { if (st !== lastS) { lastS = st; step = st; if (st === 0) K.defCap(); else K.setCap(AC[st]); } };
    const goStep = (i) => { step = clamp(i, 0, 3); tcur = REP[step]; capUpd(draw()); };
    el.querySelector('[data-a=geri]').addEventListener('click', () => { playing = false; goStep(step - 1); });
    el.querySelector('[data-a=ileri]').addEventListener('click', () => { playing = false; goStep(step + 1); });
    oy.addEventListener('click', () => { playing = !playing; draw(); });
    draw();
    const stop = ticker(el, (dt) => { if (!playing) return; tcur = (tcur + dt * (CYC / 4)) % TOT; capUpd(draw()); });
    return () => { stop(); K.stop(); };
  };

  /* =====================================================================
     7 · f57_iletim · SA düğümden miyosite
     ===================================================================== */
  VIZ.f57_iletim = (el) => {
    const END = 3.4;
    let t = RM ? 3.5 : 0, playing = !RM, sel = '', kent = false;
    const AC = {
      sa: null,
      ic: '<b>İnternodal yollar.</b> Ön (Bachmann; Bachmann demetiyle sol atriyuma da), orta (Wenckebach) ve arka (Thorel) yol uyarıyı AV düğüme taşır. [[K1 s. 257]]',
      av: '<b>AV düğüm.</b> Atriyumlarla ventriküller arasındaki tek fizyolojik geçit. İletiyi geciktirip atriyumlara kasılma süresi tanır; bu gecikme PR aralığının büyük bölümüdür. [[K1 s. 257]]',
      an: '<b>Anulus fibrozus.</b> AV düğüm dışında atriyum–ventrikül bileşkesini elektriksel olarak yalıtır. [[K1 s. 257]]',
      his: '<b>His demeti.</b> AV düğümden kısa süre sonra sağ ve sol dala ayrılır; sol dal sol anterior ve sol posterior fasiküllere bölünür. [[K1 s. 257]]',
      pk: '<b>Purkinje lifleri.</b> Uyarıyı iki ventriküle hızla yayıp kasılmayı eşzamanlar; endokardın hemen altında sonlanır. [[K1 s. 257]]',
      my: '<b>Miyositler.</b> Purkinje’den sonra iletiyi miyositler sürdürür: interkalar diskler mekanik, yanlarındaki aralık bağlantıları elektrik bağlantısıdır; birlikte fonksiyonel sinsityum olarak kasılırlar. [[K1 s. 257–258]]',
    };
    const KENT = '<b>Kent demeti.</b> Doğuştan aksesuar yol uyarının AV düğümü atlamasına yol açar: Wolff–Parkinson–White sendromu. AV düğüm içindeki benzer yollar AV düğüm reentran taşikardisine yol açar. [[K1 s. 257]]';
    el.innerHTML = `<div class="f57-host"></div><div class="f57-ctl"><button type="button" class="btn f57-bt" data-a="oynat"></button><button type="button" class="btn ghost f57-bt" data-a="kent" aria-pressed="false">Kent demeti</button></div><ul class="f57-leg"><li><b>İnternodal yollar:</b> ön · Bachmann, orta · Wenckebach, arka · Thorel</li><li><b>KS:</b> koroner sinüs ağzı · <b>SVK:</b> superior vena kava</li></ul>`;
    const host = el.querySelector('.f57-host'), oy = el.querySelector('[data-a=oynat]'), kb = el.querySelector('[data-a=kent]');
    if (RM) oy.style.display = 'none';
    const K = prep(el, () => draw());
    const HEART = 'M200 30 C150 8 40 20 34 110 C30 190 90 270 200 330 C310 270 370 190 366 110 C360 20 250 8 200 30 Z';
    function draw() {
      const n = K.narrow, W = n ? 360 : 640, H = n ? 540 : 420, hs = n ? 0.88 : 1, fs = n ? 14 : 12.5;
      const p = (a, b) => clamp((t - a) / (b - a), 0, 1);
      const sh = (k) => (sel === k ? ' f57-sel' : '');
      const all = (k) => sel === k;
      const cp = (d, w, pp, k) => `<path d="${d}" pathLength="1" class="f57-cp${sh(k)}" style="fill:none;stroke:var(--muted);opacity:.5;stroke-width:${w}"/>` + (pp > 0 ? `<path d="${d}" pathLength="1" style="stroke:var(--accent);stroke-width:${w};stroke-dasharray:${pp.toFixed(3)} 1.01;fill:none;stroke-linecap:round"/>` : '') + `<path d="${d}" data-k="${k}" class="f57-hitp" style="stroke:transparent;stroke-width:16;fill:none;cursor:pointer"/>`;
      const pIn = p(0.1, 0.6), pBach = p(0.15, 0.6), pHis = p(1.4, 1.6), pBr = p(1.6, 1.9), pPk = p(1.9, 2.2), pMy = p(2.2, 2.8);
      const avPulse = t >= 0.6 && t < 1.4 ? 0.5 + 0.5 * Math.sin(t * 14) : t >= 1.4 ? 1 : 0;
      const atr = p(0.2, 0.6), ven = p(2.0, 2.4);
      const halo = (x, y, s, o = {}) => `<text x="${x}" y="${y}" class="f57-t f57-halo" text-anchor="${o.a || 'start'}" style="font-size:${fs}px;fill:var(${o.c || '--ink'})">${s}</text>`;
      let h = `<defs><clipPath id="f57-hc"><path d="${HEART}"/></clipPath></defs>`;
      h += `<g clip-path="url(#f57-hc)"><rect x="0" y="0" width="400" height="160" style="fill:var(--crit-soft);opacity:.55"/><rect x="0" y="0" width="400" height="160" style="fill:var(--accent-soft);opacity:${atr.toFixed(2)}"/><rect x="0" y="160" width="400" height="180" style="fill:var(--crit-soft);opacity:.55"/><rect x="0" y="160" width="400" height="180" style="fill:var(--accent-soft);opacity:${ven.toFixed(2)}"/>`;
      if (kent) h += `<ellipse cx="316" cy="190" rx="34" ry="24" style="fill:var(--accent);opacity:${(0.5 * p(0.75, 0.95)).toFixed(2)}"/>`;
      h += '</g>' + `<path d="${HEART}" style="fill:none;stroke:var(--muted);stroke-width:1.8"/>`;
      h += ln(200, 24, 200, 150, '--line', 1.4) + ln(200, 168, 200, 326, '--line', 1.4);
      h += `<g data-k="an" class="f57-hitg${sh('an')}" style="cursor:pointer"><rect x="24" y="150" width="352" height="18" rx="4" style="fill:var(--chip);stroke:var(--muted);stroke-width:${all('an') ? 3 : 1.2}"/></g>`;
      h += `<text x="30" y="163" class="f57-t" style="font-size:${n ? 12 : 11.5}px;fill:var(--ink)">Anulus fibrozus</text><text x="216" y="163" class="f57-t" style="font-size:${n ? 12 : 11.5}px;fill:var(--ink)">(yalıtkan)</text>`;
      h += `<rect x="82" y="2" width="22" height="30" rx="4" style="fill:var(--paper);stroke:var(--muted)"/>` + halo(110, 16, 'SVK');
      h += cp('M112 54 C150 38 180 58 186 132', 3, pIn, 'ic') + cp('M150 44 C200 28 260 32 300 62', 3, pBach, 'ic') + cp('M110 68 C130 100 160 108 176 132', 3, pIn, 'ic') + cp('M100 72 C98 104 120 128 166 138', 3, pIn, 'ic');
      h += `<ellipse data-k="sa" cx="92" cy="62" rx="24" ry="11" class="f57-nd${sh('sa')}" style="fill:${t > 0.02 ? 'var(--accent)' : 'var(--accent-soft)'};stroke:var(--accent);stroke-width:${all('sa') ? 4 : 2};cursor:pointer"/>` + halo(92, 49, 'SA düğüm', { a: 'middle' });
      h += `<ellipse data-k="av" cx="180" cy="139" rx="18" ry="9" class="f57-nd${sh('av')}" style="fill:var(--accent);fill-opacity:${(0.18 + 0.82 * avPulse).toFixed(2)};stroke:var(--accent);stroke-width:${all('av') ? 4 : 2};cursor:pointer"/>` + halo(214, 134, 'AV düğüm');
      h += ci(140, 128, 4.5, '--paper', '--muted') + halo(126, 128, 'KS', { a: 'end', c: '--muted' });
      h += cp('M184 148 L196 198', 5, pHis, 'his') + halo(206, 196, 'His demeti');
      h += cp('M196 198 C170 228 140 260 122 296', 3.5, pBr, 'his') + cp('M200 198 L256 228', 3.5, pBr, 'his') + cp('M256 228 C290 238 330 262 336 296', 3, pBr, 'his') + cp('M256 228 C262 262 262 290 250 306', 3, pBr, 'his');
      h += halo(48, 244, 'Sağ dal') + halo(228, 214, 'Sol dal') + halo(366, 262, 'Sol anterior', { a: 'end' }) + halo(366, 278, 'fasikül', { a: 'end' }) + halo(246, 322, 'Sol posterior fasikül', { a: 'end' });
      ['M122 296 C98 270 84 240 76 204', 'M122 296 C150 308 178 314 198 320', 'M100 268 L70 262', 'M92 240 L62 232', 'M336 296 C330 262 330 226 334 196', 'M336 296 C300 312 250 318 200 322', 'M250 306 C232 316 214 320 200 322', 'M330 262 L352 254', 'M333 226 L356 218'].forEach((d) => { h += cp(d, 1.8, pPk, 'pk'); });
      h += halo(66, 192, 'Purkinje', { c: '--c-basic' });
      if (kent) h += `<path d="M334 144 L334 176" style="stroke:var(--crit);stroke-width:6;stroke-linecap:round"/>` + halo(356, 194, 'Kent demeti', { a: 'end', c: '--crit' });
      // büyüteç
      const mx = n ? 180 : 530, my = n ? 392 : 244, mr = n ? 62 : 80, hx = n ? 330 : 342, hy = n ? 280 : 266;
      return { h, n, W, H, hs, fs, mx, my, mr, hx, hy, pMy, p, sh, all, ven };
    }
    function render() {
      const d = draw(), { h, n, W, H, hs, mx, my, mr, pMy } = d;
      const hox = n ? 4 : 10, hoy = n ? 6 : 6;
      let s = svgOpen(W, H, 'Kalbin ileti sistemi: SA düğümden internodal yollara, AV düğüme, His demetine, dallara, Purkinje liflerine ve miyositlere uyarının sırası', n);
      s += `<g transform="translate(${hox} ${hoy}) scale(${hs})">${h}</g>`;
      // büyüteç
      const gx = (n ? 330 : 342) * hs + hox, gy = (n ? 280 : 266) * hs + hoy;
      s += ln(gx, gy, mx + (n ? 0 : -mr), n ? my - mr : my, '--muted', 1, '4 3');
      s += `<defs><clipPath id="f57-mc"><circle cx="${mx}" cy="${my}" r="${mr}"/></clipPath></defs><g data-k="my" style="cursor:pointer"><circle cx="${mx}" cy="${my}" r="${mr}" style="fill:var(--paper);stroke:var(--muted);stroke-width:${sel === 'my' ? 4 : 2}"/><g clip-path="url(#f57-mc)">`;
      const cw = mr * 0.78, ch = mr * 0.62;
      s += rc(mx - mr * 0.05 - cw - 6, my - ch / 2, cw, ch, '--crit-soft', '--line', 8) + rc(mx + mr * 0.05 + 6, my - ch / 2, cw, ch, '--crit-soft', '--line', 8);
      s += pa(`M${mx - 4} ${my - ch / 2 - 8} l 8 ${ch / 4 + 3} l -8 ${ch / 4 + 3} l 8 ${ch / 4 + 3} l -8 ${ch / 4 + 3} l 8 ${ch / 4 + 3}`, '--ink', 2.2);
      s += rc(mx - 12, my - 5, 24, 10, '--paper', '--c-basic', 2);
      const dp = clamp((t - 2.2) / 0.6, 0, 1), dx = lerp(mx - mr * 0.55, mx + mr * 0.55, ease(dp));
      s += ci(dx, my, 4.5, '--warn', '--paper', `opacity="${dp > 0 && dp < 1 || RM || t >= 2.8 ? 1 : 0.0}"`);
      s += `</g></g>`;
      s += tx(mx, my + mr + 18, 'İnterkalar disk', { a: 'middle', c: '--ink' }) + tx(mx, my + mr + 34, 'aralık bağlantısı', { a: 'middle', c: '--ink' });
      // zaman çubuğu
      const by = n ? 506 : 372, bx0 = n ? 8 : 10, bw = n ? 344 : 620;
      const prop = kent ? [0.2, 0.14, 0.66] : [0.18, 0.46, 0.36];
      const lab = ['P', n ? 'PR gecikmesi' : 'PR’nin gecikme kısmı', 'QRS'];
      const act = [t >= 0.1 && t < 0.7, t >= 0.7 && t < 1.5, t >= 1.5 && t < 2.5];
      let xx = bx0;
      prop.forEach((q, i) => { const w = q * bw; s += rc(xx, by, w - 2, 22, act[i] ? '--accent-soft' : '--chip', act[i] ? '--accent' : '--line', 4) + tx(xx + (w - 2) / 2, by + 16, (w < 100 && i === 1 ? 'PR' : lab[i]), { a: 'middle', c: '--ink', b: act[i] ? 1 : 0 }); xx += w; });
      s += tx(bx0, by - 6, 'EKG parçaları');
      host.innerHTML = s + '</svg>';
      host.querySelectorAll('[data-k]').forEach((e) => { e.addEventListener('pointerdown', (ev) => { ev.preventDefault(); pick(e.dataset.k); }); });
      oy.textContent = playing ? 'Duraklat' : 'Oynat';
    }
    function pick(k) {
      sel = k; playing = false;
      if (!RM) t = 3.5; else t = 3.5;
      if (AC[k]) K.setCap(AC[k]); else K.defCap();
      render();
    }
    oy.addEventListener('click', () => { if (RM) return; playing = !playing; if (playing) { sel = ''; if (t >= 3.4) t = 0; K.defCap(); } render(); });
    kb.addEventListener('click', () => { kent = !kent; kb.setAttribute('aria-pressed', String(kent)); kb.classList.toggle('on', kent); if (kent) K.setCap(KENT); else K.defCap(); if (!RM) { t = 0; playing = true; sel = ''; } render(); });
    render();
    const stop = ticker(el, (dt) => { if (!playing) return; t += dt; if (t > END + 1) t = 0; render(); });
    return () => { stop(); K.stop(); };
  };

  /* =====================================================================
     8 · f57_euk · Ca²⁺'un yolculuğu
     ===================================================================== */
  VIZ.f57_euk = (el) => {
    let mode = 'v', step = 0, playing = false, ph = 0, acc = 0, lvl = [0.1, 0], first = true;
    const AD = ['Depolarizasyon', 'L tipi kanal', 'Ca²⁺ ile Ca²⁺ salınımı', 'Çapraz köprü', 'Ca²⁺ uzaklaştırılır', 'Gevşeme'];
    const AC = [
      null,
      '<b>2 · L tipi Ca²⁺ kanalı (DHPR) açılır.</b> Ca²⁺ ECF’den sarkoplazmaya girer. DHPR ile RyR arasında, iskelet kasındaki gibi fiziksel bağ yoktur. [[K1 s. 258]]',
      '<b>3 · Ca²⁺ ile indüklenen Ca²⁺ salınımı.</b> Giren Ca²⁺ SR’deki RyR’yi açar; SR çok daha fazla Ca²⁺ salar. [[K1 s. 258]]',
      '<b>4 · Çapraz köprü.</b> Ca²⁺ troponin C’ye bağlanır, tropomiyozin aktin oluğuna daha derine yuvarlanır, miyozin bağlanma yerleri açılır; miyozin başı güç vuruşunda aktini sarkomerin ortasına çeker (ATP’ye bağımlı). [[K1 s. 258]]',
      '<b>5 · Ca²⁺ uzaklaştırılır.</b> SERCA Ca²⁺’u SR’ye geri alır; PMCA dışarı atar (birincil aktif); Na⁺/Ca²⁺ değiştiricisi 3 Na⁺ girişine karşı 1 Ca²⁺’u gradyanına karşı dışarı atar; gücü Na⁺/K⁺-ATPazın düşük tuttuğu hücre içi Na⁺’dan gelir (ikincil aktif). [[K1 s. 258]]',
      '<b>6 · Gevşeme.</b> Ca²⁺ ≈ 0,1 μmol/L’ye iner, troponin C’den ayrılır; tropomiyozin bağlanma yerlerini yeniden örter. Gevşeme de ATP’ye bağımlıdır. Kasılma depolarizasyondan repolarizasyonun ≈ 50 ms sonrasına dek, ≈ 300 ms sürdü. [[K1 s. 258]]',
    ];
    const ACa1 = '<b>1 · Depolarizasyon.</b> Atriyum miyositinde L tipi kanallar yüzey zarındadır; zar alanını kaveola denen girintiler artırır. [[K1 s. 258]]';
    const LV = [[0.1, 0], [0.34, 0], [1, 0.1], [0.95, 1], [0.45, 0.6], [0.1, 0]];
    el.innerHTML = `<div class="f57-ctl">${seg('Hücre tipi', 'm', [['v', 'Ventrikül miyositi'], ['a', 'Atriyum miyositi']], mode)}</div><div class="f57-host"></div><div class="f57-ctl"><button type="button" class="btn ghost f57-bt" data-a="geri">Geri</button><span class="f57-sayac"></span><button type="button" class="btn ghost f57-bt" data-a="ileri">İleri</button><button type="button" class="btn f57-bt" data-a="oynat"></button></div>`;
    const host = el.querySelector('.f57-host'), sayac = el.querySelector('.f57-sayac'), oy = el.querySelector('[data-a=oynat]');
    if (RM) oy.style.display = 'none';
    const K = prep(el, () => draw());
    const rnd = rndMk(11);
    const SPR = Array.from({ length: 12 }, () => [rnd(), rnd()]);
    const dot = (x, y, o = 1) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="4.2" style="fill:var(--warn);stroke:var(--paper);stroke-width:1" opacity="${o}"/>`;
    function draw() {
      const n = K.narrow, fs = n ? 14 : 12.5, W = n ? 360 : 680, H = n ? 470 : 400, sc = n ? 0.8 : 1, V = mode === 'v';
      const T = (x, y, str, o = {}) => tx(x, y, str, Object.assign({ s: fs }, o));
      const bound = step === 3 || step === 4, slide = step === 3 || step === 4 ? 16 : step === 5 ? 6 : 0;
      let g = '';
      g += T(10, 18, 'ECF · Ca²⁺ ≈ 1,2 mmol/L', { c: '--ink', b: 1 });
      // sarkolemma
      const memb = V ? 'M8 46 H190 M214 46 H442' : 'M8 46 H442';
      g += pa(memb, '--muted', 5);
      if (V) {
        g += pa('M190 46 V158 Q190 170 202 170 Q214 170 214 158 V46', '--muted', 4, { f: '--warn-soft' });
        g += rc(187, 96, 6, 18, '--warn', '--paper', 1) + rc(211, 96, 6, 18, '--warn', '--paper', 1);
        g += rc(144, 80, 36, 64, '--chip', '--muted', 14) + rc(224, 80, 36, 64, '--chip', '--muted', 14);
        g += rc(176, 98, 6, 18, '--warn', '--ink', 1) + rc(222, 98, 6, 18, '--warn', '--ink', 1);
        g += T(162, 116, 'SR', { a: 'middle', c: '--ink' }) + T(242, 116, 'SR', { a: 'middle', c: '--ink' });
        g += T(202, 192, 'T tübülü', { a: 'middle', c: '--ink', b: 1 }) + T(202, 208, 'DHPR: L tipi Ca²⁺ kanalı', { a: 'middle', c: '--warn' });
        g += T(242, 166, 'RyR', { a: 'middle', c: '--warn', b: 1 }) + ln(240, 148, 226, 118, '--warn', 1);
      } else {
        g += rc(197, 38, 10, 16, '--warn', '--paper', 1) + T(214, 34, 'DHPR (L tipi)', { c: '--warn', s: fs });
        [96, 284, 340].forEach((cx) => { g += pa(`M${cx - 10} 48 Q${cx - 10} 62 ${cx} 62 Q${cx + 10} 62 ${cx + 10} 48`, '--muted', 2.5, { f: '--warn-soft' }); });
        g += T(96, 84, 'Kaveola', { a: 'middle' });
        g += rc(150, 64, 38, 36, '--chip', '--muted', 14) + rc(216, 64, 38, 36, '--chip', '--muted', 14);
        g += rc(186, 72, 6, 18, '--warn', '--ink', 1) + rc(214, 72, 6, 18, '--warn', '--ink', 1);
        g += T(168, 86, 'SR', { a: 'middle', c: '--ink' }) + T(236, 86, 'SR', { a: 'middle', c: '--ink' });
        g += T(202, 122, 'RyR', { a: 'middle', c: '--warn', b: 1 });
      }
      // SERCA (sol SR altı)
      const sx = V ? 162 : 168, sy = V ? 146 : 100;
      g += rc(sx - 10, sy - 4, 20, 12, '--paper', '--ink', 3, '') + T(V ? 120 : 126, sy + 22, 'SERCA', { a: 'middle', c: '--ink', b: 1 }) + T(V ? 120 : 126, sy + 22 + fs + 2, '(ATP)', { a: 'middle' });
      // pompalar
      const pump = (x, l1, l2) => rc(x - 12, 34, 24, 24, '--chip', '--ink', 4) + T(x, 76, l1, { a: 'middle', c: '--ink', b: 1 }) + (l2 ? T(x, 76 + fs + 3, l2, { a: 'middle' }) : '');
      g += pump(284, 'PMCA', '(ATP)') + pump(350, 'Na⁺/Ca²⁺', n ? 'değ.' : 'değiştirici') + `<rect x="416" y="34" width="24" height="24" rx="4" style="fill:var(--chip);stroke:var(--muted);opacity:.7"/>` + T(428, 76, 'Na⁺/K⁺', { a: 'middle', s: fs }) + T(428, 76 + fs + 3, 'ATPaz', { a: 'middle' });
      // dalga (adım 1)
      if (step === 0) {
        const wp = V ? 'M8 46 H190 V158 Q190 170 202 170 Q214 170 214 158 V46 H442' : 'M8 46 H442';
        g += `<path d="${wp}" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:5;stroke-linecap:round;stroke-dasharray:${RM ? '1 0' : '0.18 0.82'};stroke-dashoffset:${RM ? 0 : -(ph % 1)}"/>`;
      }
      // sarkomer
      const cy = 304, dz = slide;
      g += T(225, 250, 'İnce filament: aktin, tropomiyozin, troponin C', { a: 'middle' }) + T(225, 366, 'Kalın filament: miyozin (başlar)', { a: 'middle' });
      g += rc(130, cy - 7, 190, 14, '--ink', null, 3);
      const thin = (zx, ex, yy, dir) => {
        let o = ln(zx + dir * dz, yy - 14, zx + dir * dz, yy + 14, '--ink', 3) + ln(zx + dir * dz, yy, ex + dir * dz, yy, '--muted', 3.5);
        const ty = bound ? yy - 2 : yy + (yy < cy ? 5 : -5);
        o += pa(`M${zx + dir * dz} ${ty} Q${(zx + ex) / 2 + dir * dz} ${ty + (bound ? -4 : 4)} ${ex + dir * dz} ${ty}`, '--ink', 1.3, { op: 0.8 });
        for (let i = 0; i < 4; i++) { const x = zx + dir * (24 + i * 36) + dir * dz; o += ci(x, yy + (yy < cy ? -6 : 6), 4.4, bound ? '--warn' : '--paper', '--ink'); }
        return o;
      };
      [[40, 190, cy - 22, 1], [40, 190, cy + 22, 1], [410, 260, cy - 22, -1], [410, 260, cy + 22, -1]].forEach(([zx, ex, yy, dir]) => { g += thin(zx, ex, yy, dir); });
      [[150, 1], [178, 1], [206, 1], [244, -1], [272, -1], [300, -1]].forEach(([hx, dir]) => {
        [-1, 1].forEach((sd) => {
          const yy = cy + sd * 7, ty = cy + sd * 22;
          g += bound ? ln(hx, yy, hx + dir * 12, ty - sd * 3 + (sd < 0 ? 0 : 0), '--ink', 2.4) : ln(hx, yy, hx, yy + sd * 9, '--ink', 2.4);
        });
      });
      // Ca²⁺ noktaları
      let dots = '';
      const ph1 = RM ? 1 : ph % 1;
      const moving = (a, b, i, N) => { const f = RM ? 1 : (ph1 + i / N) % 1; const e = ease(f); return [lerp(a[0], b[0], e), lerp(a[1], b[1], e), f < 0.1 ? f * 10 : f > 0.9 ? (1 - f) * 10 : 1]; };
      if (step === 1) for (let i = 0; i < 6; i++) { const m = moving([202 + (i % 3 - 1) * 5, 20], V ? [202, 120 + (i % 2) * 6] : [202, 82 + (i % 2) * 8], i, 6); dots += dot(m[0], m[1], m[2]); }
      if (step === 2) for (let i = 0; i < 12; i++) { const sd = i % 2 ? 1 : -1, src = V ? [sd > 0 ? 226 : 180, 107] : [sd > 0 ? 214 : 192, 81]; const dst = [110 + SPR[i][0] * 240, (V ? 150 : 112) + SPR[i][1] * 80]; const m = moving(src, dst, i, 12); dots += dot(m[0], m[1], m[2]); }
      if (step === 4) for (let i = 0; i < 9; i++) { const tgt = i % 3 === 0 ? [sx, sy] : i % 3 === 1 ? [284, 56] : [350, 56]; const src = [110 + SPR[i][0] * 240, 160 + SPR[i][1] * 70]; const m = moving(src, tgt, i, 9); dots += dot(m[0], m[1], m[2]); }
      if (step === 5) for (let i = 0; i < 4; i++) dots += dot((V ? 152 : 160) + i * 7, V ? 92 + (i % 2) * 14 : 72 + (i % 2) * 12, 1);
      g += dots;
      // göstergeler
      const gc = lvl[0], gt = lvl[1];
      let out = svgOpen(W, H, 'Ca²⁺ ile indüklenen Ca²⁺ salınımı ve çapraz köprü döngüsü: hücre kesiti, sarkomer, sitoplazmik Ca²⁺ düzeyi ve gerim göstergeleri', n);
      out += `<g transform="scale(${sc})">${g}</g>`;
      const lab = (s, x, y, o) => tx(x, y, s, o);
      if (!n) {
        out += lab('Sitoplazmik Ca²⁺', 528, 40, { a: 'middle', c: '--ink', b: 1 }) + lab('Gerim', 640, 40, { a: 'middle', c: '--ink', b: 1 });
        [[513, gc, '--warn'], [625, gt, '--crit']].forEach(([x, v, c]) => { out += rc(x, 56, 30, 270, '--chip', '--line', 4) + rc(x, 56 + 270 * (1 - v), 30, 270 * v, c, null, 4); });
        out += ln(543, 56 + 270 * 0.9, 556, 56 + 270 * 0.9, '--muted', 1.5) + lab('diyastol', 560, 56 + 270 * 0.9 - 14, { c: '--muted' }) + lab('≈ 0,1', 560, 56 + 270 * 0.9 + 2, { c: '--muted' }) + lab('μmol/L', 560, 56 + 270 * 0.9 + 18, { c: '--muted' });
      } else {
        const by = 336;
        out += lab('Sitoplazmik Ca²⁺', 8, by + 15, { c: '--ink', b: 1 }) + lab('Gerim', 8, by + 52, { c: '--ink', b: 1 });
        out += rc(150, by, 200, 22, '--chip', '--line', 4) + rc(150, by, 200 * gc, 22, '--warn', null, 4) + rc(150, by + 36, 200, 22, '--chip', '--line', 4) + rc(150, by + 36, 200 * gt, 22, '--crit', null, 4);
        out += ln(150 + 200 * 0.1, by - 4, 150 + 200 * 0.1, by + 26, '--muted', 1, '3 3') + lab('diyastol ≈ 0,1 μmol/L', 350, by + 80, { a: 'end' });
      }
      host.innerHTML = out + '</svg>';
      sayac.textContent = `${step + 1} / 6 · ${AD[step]}`;
      oy.textContent = playing ? 'Duraklat' : step === 5 ? 'Baştan' : 'Oynat';
    }
    const setCapStep = () => { if (step === 0) { if (mode === 'a') K.setCap(ACa1); else K.defCap(); } else K.setCap(AC[step]); };
    const goStep = (i) => { step = clamp(i, 0, 5); setCapStep(); acc = 0; if (RM) { lvl = LV[step].slice(); first = false; } draw(); };
    el.querySelector('[data-a=geri]').addEventListener('click', () => { playing = false; goStep(step - 1); });
    el.querySelector('[data-a=ileri]').addEventListener('click', () => { playing = false; goStep(step + 1); });
    oy.addEventListener('click', () => { if (playing) playing = false; else { if (step === 5) goStep(0); playing = true; acc = 0; } draw(); });
    el.querySelectorAll('[data-m]').forEach((b) => b.addEventListener('click', () => { mode = b.dataset.m; setSeg(el, 'm', mode); setCapStep(); draw(); }));
    lvl = LV[0].slice();
    draw();
    const stop = ticker(el, (dt) => {
      ph += dt * 0.7;
      const tg = LV[step], k = Math.min(1, dt * 3);
      const dl = tg[0] - lvl[0], dt2 = tg[1] - lvl[1];
      if (!RM) { lvl[0] += dl * k; lvl[1] += dt2 * k; }
      if (playing) { acc += dt; if (acc >= 2.5) { acc = 0; if (step < 5) { step++; setCapStep(); } else playing = false; } }
      if (RM && !playing) return;
      draw();
    });
    return () => { stop(); K.stop(); };
  };

  /* =====================================================================
     9 · f57_ots · vagus ve sempatik
     ===================================================================== */
  VIZ.f57_ots = (el) => {
    const ST = {
      ic: { ad: 'Vagus yok (içsel)', vs: -60, C: 0.571, p3: 0.1, c: '--ink', hr: '90–120/dk', es: 'eğim ↑' },
      rest: { ad: 'Dinlenim (vagal tonus)', vs: -60, C: 0.857, p3: 0.1, c: '--ink', hr: '60–80/dk', es: 'eğim' },
      vag: { ad: 'Güçlü vagal', vs: -70, C: 1.333, p3: 0.1, c: '--accent', hr: 'HR ↓', es: 'eğim ↓' },
      sym: { ad: 'Sempatik', vs: -60, C: 0.5, p3: 0.08, c: '--c-clin', hr: 'HR ↑', es: 'eğim ↑↑' },
    };
    const AC = {
      rest: null,
      ic: '<b>Vagus yok.</b> Sinir etkisi olmadan SA düğüm içsel hızında, 90–120/dk ateşler. [[K1 s. 259]]',
      vag: '<b>Güçlü vagal uyarı.</b> Gαi cAMP’yi düşürür, HCN üzerinden Na⁺ girişi ve eğim azalır; Gβγ’nın açtığı K⁺ kanalları zarı hiperpolarize eder. AV gecikmesi de uzar. [[K1 s. 259–260]]',
      sym: '<b>Sempatik uyarı.</b> β1 → cAMP: HCN daha çok açılır, eğim artar, eşiğe daha çabuk varılır. PKA ayrıca Ca²⁺ girişini (inotropi), gecikmiş doğrultucu K⁺ akımını (kısa APD) ve AV iletisini artırır. [[K1 s. 259–260]]',
    };
    const AVC = '<b>AV iletisi durursa.</b> Güçlü parasempatik etkinlik AV iletisini tümüyle durdurabilir; His demeti ve Purkinje sistemindeki pacemaker hücreleri 15–40/dk hızla ateşler: ventriküler kaçış ritmi. [[K1 s. 259]]';
    const CH = {
      ic: [['İnnervasyon yok'], ['HCN otomatisitesi']],
      rest: 'v', vag: 'v',
      sym: 's',
    };
    const chain = (k) => {
      const b = (t, c = '') => `<span class="f57-bx ${c}">${t}</span>`, ar = '<i aria-hidden="true">→</i>';
      if (k === 'ic') return `<div class="f57-row">${b('İnnervasyon yok')}${ar}${b('HCN otomatisitesi')}</div>`;
      if (k === 'sym') return `<div class="f57-row">${b('Noradrenalin / adrenalin', 'sy')}${ar}${b('β1', 'sy')}${ar}${b('cAMP ↑, PKA ↑', 'sy')}</div><div class="f57-row f57-br"><div>${b('HCN ↑ → eğim ↑ (HR ↑)', 'sy')}</div><div>${b('L tipi Ca²⁺ fosforilasyonu → inotropi ↑', 'sy')}</div><div>${b('Gecikmiş doğrultucu K⁺ ↑ → APD ↓', 'sy')}</div><div>${b('AV iletimi ↑', 'sy')}</div></div>`;
      return `<div class="f57-row">${b('ACh', 'va')}${ar}${b('Gi-bağlı reseptör', 'va')}</div><div class="f57-row f57-br"><div>${b('Gαi → adenilat siklaz ↓ → cAMP ↓ → HCN ↓ → eğim ↓', 'va')}</div><div>${b('Gβγ → G proteinine bağlı Kir ↑ → K⁺ çıkışı → hiperpolarizasyon', 'va')}</div></div>`;
    };
    let sel = 'rest', av = false, prog = 1, tcur = 0;
    let cur = { vs: -60, C: 0.857, p3: 0.1 }, from = cur;
    el.innerHTML = `<div class="f57-ctl">${seg('Otonomik durum', 'd', Object.keys(ST).map((k) => [k, ST[k].ad]), sel)}<button type="button" class="btn ghost f57-bt" data-a="av" aria-pressed="false">AV iletisi durursa</button></div><div class="f57-host"></div><div class="f57-ctl"><span class="f57-hr" aria-live="polite"></span></div><div class="f57-zincir" aria-label="Mekanizma zinciri"></div>`;
    const host = el.querySelector('.f57-host'), hrEl = el.querySelector('.f57-hr'), zin = el.querySelector('.f57-zincir'), avb = el.querySelector('[data-a=av]');
    const K = prep(el, () => draw());
    const fn = (q) => (t) => {
      const u = t % q.C, p0 = 0.07, p4 = q.C - p0 - q.p3;
      if (u < p4) return q.vs + (-40 - q.vs) * Math.pow(u / p4, 1.3);
      if (u < p4 + p0) return -40 + 50 * Math.sin(((u - p4) / p0) * (Math.PI / 2));
      return 10 + ((q.vs - 10) * (1 - Math.cos(Math.PI * ((u - p4 - p0) / q.p3)))) / 2;
    };
    function draw() {
      const n = K.narrow, W = n ? 360 : 680, x0 = n ? 44 : 60, x1 = W - 14, ya0 = 22, ya1 = av ? (n ? 190 : 176) : (n ? 230 : 226), H = (av ? (n ? 310 : 300) : (n ? 280 : 278));
      const X = lin(0, 3, x0, x1), Y = lin(20, -80, ya0, ya1);
      let s = svgOpen(W, H, 'SA düğüm aksiyon potansiyeli 3 saniye boyunca; seçili otonomik durumda faz 4 eğimi ve hız, dinlenim eğrisiyle karşılaştırılır', n);
      [20, 0, -40, -60, -80].forEach((v) => { s += ln(x0, Y(v), x1, Y(v), '--line', 1) + tx(x0 - 5, Y(v) + 4, String(v).replace('-', '−'), { a: 'end' }); });
      s += ln(x0, Y(-40), x1, Y(-40), '--crit', 1, '5 4') + tx(x1, Y(-40) - 5, 'Eşik −40 mV', { a: 'end', c: '--crit' });
      for (let t = 0; t <= 3; t += 0.5) s += tx(X(t), ya1 + 18, String(t).replace('.', ','), { a: 'middle' });
      s += tx(x1, ya1 + 34, 's', { a: 'end' }) + tx(x0, 12, 'mV');
      const base = fn(ST.rest);
      if (sel !== 'rest') s += pa(P(sample(base, 0, 3, 0.01).map(([t, v]) => [X(t), Y(v)])), '--muted', 1.5, { d: '5 4' });
      const f = fn(cur), col = ST[sel].c;
      s += pa(P(sample(f, 0, 3, 0.01).map(([t, v]) => [X(t), Y(v)])), col, 2.8);
      // eğim etiketi
      const t1 = cur.C * 0.3, v1 = f(t1);
      s += tx(X(t1) - 8, Y(v1) - 14, ST[sel].es, { a: 'end', c: col === '--ink' ? '--ink' : col, b: 1 });
      if (sel === 'vag') s += tx(x1, Y(-70) + 16, '−70 mV (hiperpolarize)', { a: 'end', c: '--accent' });
      if (!RM) s += ci(X(tcur), Y(f(tcur)), 5.5, col === '--ink' ? '--ink' : col, '--paper');
      if (av) {
        const sy = ya1 + 40, sh = 44;
        s += rc(x0, sy, x1 - x0, sh, '--paper', '--line', 6) + tx(x0 + 4, sy - 5, 'Ventrikül', { c: '--ink', b: 1 }) + ln(x0, sy + sh - 8, x1, sy + sh - 8, '--line', 1);
        [0.45, 2.45].forEach((t) => { s += pa(`M${f1(X(t))} ${sy + sh - 8} L${f1(X(t) + 3)} ${sy + 6} L${f1(X(t) + 9)} ${sy + 6} L${f1(X(t) + 12)} ${sy + sh - 8}`, '--crit', 2.4); });
        s += tx(x1 - 4, sy + 18, 'Ventriküler kaçış ritmi 15–40/dk', { a: 'end', c: '--crit', b: 1 });
        s += tx(x0, 12, '', {}) + tx(x1, 12, 'SA düğüm (atriyum) hızı sürer', { a: 'end' });
      }
      host.innerHTML = s + '</svg>';
      hrEl.textContent = av ? 'Ventrikül ≈ 15–40/dk (kaçış)' : 'HR  ' + ST[sel].hr;
    }
    const zinc = () => { zin.innerHTML = chain(sel === 'ic' ? 'ic' : sel === 'sym' ? 'sym' : 'v'); zin.querySelectorAll('.f57-bx').forEach((b, i) => { if (!RM) b.style.animationDelay = i * 250 + 'ms'; else b.style.animation = 'none'; }); };
    el.querySelectorAll('[data-d]').forEach((b) => b.addEventListener('click', () => {
      sel = b.dataset.d; setSeg(el, 'd', sel); av = false; avb.setAttribute('aria-pressed', 'false');
      if (AC[sel]) K.setCap(AC[sel]); else K.defCap();
      from = cur; if (RM) { cur = { vs: ST[sel].vs, C: ST[sel].C, p3: ST[sel].p3 }; } else prog = 0;
      zinc(); draw();
    }));
    avb.addEventListener('click', () => { av = !av; avb.setAttribute('aria-pressed', String(av)); if (av) K.setCap(AVC); else if (AC[sel]) K.setCap(AC[sel]); else K.defCap(); draw(); });
    zinc(); draw();
    const stop = ticker(el, (dt) => {
      let ch = false;
      if (prog < 1) { prog = Math.min(1, prog + dt / 0.5); const e = ease(prog), q = ST[sel]; cur = { vs: lerp(from.vs, q.vs, e), C: lerp(from.C, q.C, e), p3: lerp(from.p3, q.p3, e) }; ch = true; }
      if (!RM) { tcur = (tcur + dt) % 3; ch = true; }
      if (ch) draw();
    });
    return () => { stop(); K.stop(); };
  };

  /* =====================================================================
     10 · f57_lat · plazma derişimi ve toksisite
     ===================================================================== */
  VIZ.f57_lat = (el) => {
    const DR = { tip: 'Tipik LA', bup: 'Bupivakain', lev: 'Levobupivakain' };
    const BANDS = {
      tip: { m: [[25, 50], [50, 75]], k: [[65, 85], [85, 100]] },
      bup: { m: [[25, 50], [50, 75]], k: [[20, 55], [55, 100]] },
      lev: { m: [[32, 57], [57, 82]], k: [[65, 85], [85, 100]] },
    };
    const RANK = [['MSS uyarıcı', 1], ['MSS depresif', 2], ['kalp depresyonu', 3], ['VF', 4]];
    const AC = {
      1: '<b>Uyarıcı faz.</b> İnhibitör ara nöronlardaki Na⁺ kanalları bloke olur: kulak çınlaması, ağız çevresinde uyuşma, nöbet. Derişimi artırın. [[K1 s. 260]]',
      2: '<b>Depresif faz.</b> Eksitatör ara nöronlar da bloke olur: global MSS depresyonu, koma, solunum depresyonu. [[K1 s. 260]]',
      3: '<b>Kardiyak toksisite.</b> Na⁺’un yanında K⁺ ve Ca²⁺ kanalları da bloke olur; ilk belirtiler doğrudan miyokard depresyonu ve bradikardidir. [[K1 s. 260]]',
      4: '<b>Dirençli ventrikül fibrilasyonu.</b> Daha yüksek derişimin sonucudur. [[K1 s. 260]]',
    };
    const BUP = ' Bupivakainde kardiyak belirtiler MSS belirtilerinden önce gelebilir: kalpteki Na⁺ kanallarına yüksek afinite ve Ca²⁺ kanallarına bağlanıp SR’den Ca²⁺ salınımını engelleme. [[K1 s. 261]]';
    const LEV = '<b>Levobupivakain.</b> Bupivakainin saf S-enantiyomeridir; iyon kanalları stereospesifik olduğundan kardiyak ve MSS toksisitesi rasemik bupivakainden düşüktür. [[K1 s. 261]]';
    const LIP = '<b>Intralipid®.</b> Destek tedavisine ek özgül tedavi. Lipofilik bupivakaini plazmadan ve kalp iyon kanallarından çeken bir lipit havuzu gibi davrandığı düşünülür; mekanizma tartışmalıdır. [[K1 s. 261]]';
    let drug = 'tip', val = 30, lipid = false, lq = 0, v0 = 0, lipRun = false, showLipCap = false;
    el.innerHTML = `${seg('Yerel anestezik', 'd', Object.keys(DR).map((k) => [k, DR[k]]), drug)}<div class="f57-host"></div><label class="f57-rng f57-lrng"><span>Plazma derişimi (göreli) →</span><input type="range" min="0" max="100" step="1" value="30" aria-label="Plazma derişimi (göreli)"></label><div class="f57-host2"></div><div class="f57-ctl">${btnHtml('Intralipid®', 'data-a="lip"')}<span class="f57-not">Lipit havuzu (mekanizma tartışmalı)</span></div><ul class="f57-sem"></ul>`;
    const host = el.querySelector('.f57-host'), host2 = el.querySelector('.f57-host2'), rng = el.querySelector('input'), sem = el.querySelector('.f57-sem'), notE = el.querySelector('.f57-not');
    notE.style.visibility = 'hidden';
    const K = prep(el, () => { draw(); });
    const rnd = rndMk(5), DOT = Array.from({ length: 26 }, () => [rnd(), rnd()]);
    const active = () => { const B = BANDS[drug]; const a = []; if (val >= B.m[0][0] && val < B.m[0][1]) a.push(1); if (val >= B.m[1][0] && val <= B.m[1][1]) a.push(2); if (val >= B.k[0][0] && val < B.k[0][1]) a.push(3); if (val >= B.k[1][0] && val <= B.k[1][1]) a.push(4); return a; };
    const lbl = (str, cx, cy, w, o) => { const lines = str.length * 7 > w && str.includes(' ') ? [str.slice(0, str.indexOf(' ')), str.slice(str.indexOf(' ') + 1)] : [str]; return lines.map((l, i) => tx(cx, cy + (i - (lines.length - 1) / 2) * 14 + 4, l, { a: 'middle', c: '--ink', b: 1, s: o })).join(''); };
    function draw() {
      const n = K.narrow, W = n ? 360 : 680, B = BANDS[drug], act = active();
      const x0 = n ? 16 : 96, x1 = n ? 344 : 664, X = lin(0, 100, x0, x1);
      const mY = n ? 96 : 44, kY = n ? 170 : 112, rh = n ? 52 : 52, H = n ? 270 : 190;
      let s = svgOpen(W, H, 'Plazma derişimi ekseni boyunca MSS ve kalp toksisitesi bantları; kaydırıcı konumu çizgiyle gösterilir', n);
      const brain = (cx, cy, c) => `<g transform="translate(${cx - 22} ${cy - 20})"><path d="M22 4 C8 0 -2 10 2 22 C-2 32 8 42 20 38 C26 44 36 42 40 34 C48 32 48 18 40 12 C40 4 30 0 22 4 Z" style="fill:var(${c});stroke:var(--ink);stroke-width:1.6;opacity:.9"/><path d="M22 6 V38 M12 14 Q18 20 12 28 M32 14 Q26 20 32 28" style="fill:none;stroke:var(--ink);stroke-width:1.2"/></g>`;
      const heart = (cx, cy, c) => `<g transform="translate(${cx - 22} ${cy - 20})"><path d="M22 40 C-4 22 2 2 14 2 C20 2 22 8 22 10 C22 8 24 2 30 2 C42 2 48 22 22 40 Z" style="fill:var(${c});stroke:var(--ink);stroke-width:1.6;opacity:.9"/></g>`;
      const colM = act.includes(2) ? '--crit-soft' : act.includes(1) ? '--warn-soft' : '--chip';
      const colK = act.includes(4) ? '--crit-soft' : act.includes(3) ? '--warn-soft' : '--chip';
      const ic = n ? [[70, 48], [250, 48]] : [[48, mY + 26], [48, kY + 26]];
      s += brain(ic[0][0], ic[0][1], colM) + heart(ic[1][0], ic[1][1], colK);
      if (n) { s += tx(70, 82, 'MSS', { a: 'middle', c: '--ink', b: 1 }) + tx(250, 82, 'Kalp', { a: 'middle', c: '--ink', b: 1 }); }
      else { s += tx(48, mY + 62, 'MSS', { a: 'middle', c: '--ink', b: 1 }) + tx(48, kY + 62, 'Kalp', { a: 'middle', c: '--ink', b: 1 }); }
      const row = (y, bands, names, cols, rowTag) => {
        let o = rc(x0, y, x1 - x0, rh, '--paper', '--line', 6);
        bands.forEach(([a, b], i) => { o += rc(X(a), y, X(b) - X(a), rh, cols[i], val >= a && val <= b ? '--ink' : '--line', 4, `style="stroke-width:${val >= a && val <= b ? 2.5 : 1}"`) + lbl(names[i], (X(a) + X(b)) / 2, y + rh / 2, X(b) - X(a) - 6, n ? 12 : 12.5); });
        return o;
      };
      s += row(mY, B.m, ['Uyarıcı faz', 'Depresif faz'], ['--warn-soft', '--crit-soft']);
      s += row(kY, B.k, n ? ['Depresyon', 'VF'] : ['Miyokard depresyonu', 'Dirençli VF'], ['--warn-soft', '--crit-soft']);
      if (drug === 'bup') s += tx(X(20), kY + rh + 16, '↑ Uyarı olmayabilir', { c: '--crit', b: 1 });
      if (drug === 'lev') s += tx(x0, kY + rh + 16, 'S-enantiyomer: kardiyak ve MSS toksisitesi rasemik bupivakainden düşük', { c: '--ink', s: n ? 11.5 : 12.5 }).replace('<text', '<text');
      s += `<line x1="${f1(X(val))}" y1="${mY - 8}" x2="${f1(X(val))}" y2="${kY + rh + 6}" style="stroke:var(--accent);stroke-width:2.5"/>`;
      host.innerHTML = s + '</svg>';
      // plazma + lipit havuzu
      const w2 = n ? 360 : 680, h2 = n ? 96 : 100;
      let t2 = svgOpen(w2, h2, 'Plazmadaki ilaç molekülleri; Intralipid verilince lipit havuzuna çekilir', n);
      const px0 = n ? 16 : 96, px1 = n ? 220 : 400, py = 14, ph2 = 70;
      t2 += rc(px0, py, px1 - px0, ph2, '--paper', '--line', 8) + tx(px0 + 6, py + 16, 'Plazma', { c: '--ink', b: 1 });
      const lx = n ? 300 : 540, ly = py + ph2 / 2 + 4;
      if (lipid) t2 += ci(lx, ly, 28, '--warn-soft', '--warn') + tx(lx, ly + 52 - 8, 'Lipit havuzu', { a: 'middle', c: '--ink', s: n ? 12 : 12.5 }).replace('y="', 'y="');
      const N = Math.round((val / 100) * 24) + (lipRun ? 0 : 0);
      DOT.forEach((d, i) => {
        const bx = px0 + 10 + d[0] * (px1 - px0 - 20), by = py + 26 + d[1] * (ph2 - 38);
        let x = bx, y = by, vis = i < N;
        if (lipid) { const q = clamp(lq * 1.5 - (i % 13) * 0.05, 0, 1); if (q > 0) { const e = ease(q); x = lerp(bx, lx + (d[0] - 0.5) * 30, e); y = lerp(by, ly + (d[1] - 0.5) * 30, e); vis = i < DOT.length && (q > 0 || i < N) && (lipid && (lq > 0)) ? i < Math.max(N, v0 / 100 * 24 | 0) : vis; } }
        if (vis) t2 += ci(x, y, 4.2, '--crit', '--paper');
      });
      host2.innerHTML = t2 + '</svg>';
      // slider hizası
      const rw = rng.parentElement; rw.style.marginLeft = (x0 / W) * 100 + '%'; rw.style.width = ((x1 - x0) / W) * 100 + '%';
      // belirtiler
      const items = [];
      if (act.includes(1)) items.push('<b>MSS · uyarıcı faz:</b> kulak çınlaması · ağız çevresinde uyuşma · nöbet (inhibitör ara nöronlarda Na⁺ blokajı)');
      if (act.includes(2)) items.push('<b>MSS · depresif faz:</b> koma · solunum depresyonu (eksitatör ara nöronlarda da blokaj)');
      if (act.includes(3)) items.push('<b>Kalp:</b> miyokard depresyonu · bradikardi (Na⁺ + K⁺ + Ca²⁺ kanal blokajı)');
      if (act.includes(4)) items.push('<b>Kalp:</b> dirençli VF');
      sem.innerHTML = items.length ? items.map((t) => `<li>${t}</li>`).join('') : '<li>Bu derişimde belirti bandı yok. Kaydırıcıyı sağa çekin.</li>';
    }
    function cap() {
      if (showLipCap) { K.setCap(LIP); return; }
      if (drug === 'lev') { K.setCap(LEV); return; }
      const a = active(), r = a.length ? Math.max(...a) : 1;
      if (!a.length && val === 30) { K.defCap(); return; }
      K.setCap(a.length ? AC[r] + (drug === 'bup' ? BUP : '') : AC[1]);
    }
    const setVal = (v) => { val = clamp(Math.round(v), 0, 100); rng.value = val; draw(); };
    rng.addEventListener('input', () => { showLipCap = false; lipid = lipid && lq > 0 ? lipid : false; setVal(+rng.value); cap(); });
    el.querySelectorAll('[data-d]').forEach((b) => b.addEventListener('click', () => { drug = b.dataset.d; setSeg(el, 'd', drug); showLipCap = false; draw(); cap(); }));
    el.querySelector('[data-a=lip]').addEventListener('click', () => {
      lipid = true; lq = 0; v0 = val; showLipCap = true; notE.style.visibility = 'visible'; K.setCap(LIP);
      if (RM) { lq = 1; setVal(0); } else lipRun = true;
    });
    draw();
    const stop = ticker(el, (dt) => {
      if (!lipRun) return;
      lq = Math.min(1, lq + dt / 2); val = Math.round(v0 * (1 - ease(lq))); rng.value = val; draw();
      if (lq >= 1) { lipRun = false; setVal(0); }
    });
    return () => { stop(); K.stop(); };
  };

  /* =====================================================================
     11 · f57_nakil · normal ve nakledilen kalp
     ===================================================================== */
  VIZ.f57_nakil = (el) => {
    const rise = (t, a, w) => (t < a ? 0 : 1 - Math.exp(-(t - a) / w));
    const S = {
      din: { ad: 'Dinlenim', N: () => 70, T: () => 100 },
      lar: { ad: 'Laringoskopi', N: (t) => 70 + (t < 2 ? 0 : 56 * (1 - Math.exp(-(t - 2) / 0.08)) * Math.exp(-(t - 2) / 0.7)), T: () => 100, ok: [2, 'Laringoskopi'] },
      egz: { ad: 'Egzersiz', N: (t) => 70 + 70 * (rise(t, 2, 0.35) - rise(t, 6, 0.4)), T: (t) => (t < 6 ? 100 + 28 * rise(t, 2, 1.8) : 100 + 28 * rise(6, 2, 1.8) * Math.exp(-(t - 6) / 2.2)), band: [2, 6] },
      atr: { ad: 'Atropin', N: (t) => 70 + 36 * rise(t, 2, 0.5) * (t < 6.5 ? 1 : Math.exp(-(t - 6.5) / 1.5)), T: (t) => 100 + (t < 5 ? 0 : 30 * rise(t, 5, 0.5) * (t < 8 ? 1 : Math.exp(-(t - 8) / 1.2))), ok: [2, 'Atropin'], ok2: [5, 'İzoprenalin'] },
      adr: { ad: 'Adrenalin', N: (t) => 70 + 30 * rise(t, 2, 0.6) * Math.exp(-(t - 2 > 0 ? t - 2 : 0) / 4), T: (t) => 100 + 56 * rise(t, 2, 0.6) * Math.exp(-(t - 2 > 0 ? t - 2 : 0) / 4), ok: [2, 'Adrenalin'] },
    };
    const AC = {
      din: null,
      lar: '<b>Laringoskopi.</b> Refleksler kayıptır: laringoskopi ve periton çekilmesine olağan kardiyovasküler yanıt yoktur. Anesteziklerin düşürdüğü sistemik vasküler direnç kötü tolere edilir; ön yük korunmazsa ağır hipotansiyon gelişebilir. [[K1 s. 261]]',
      egz: '<b>Egzersiz.</b> HR yavaş artar, dinlenmeyle yavaş düşer. β1 reseptörleri adrenal medulladan salınan dolaşımdaki katekolaminlere yanıt verir; Bainbridge refleksi de katkıda bulunabilir. [[K1 s. 261]]',
      atr: '<b>Atropin, glikopironyum.</b> M2 ACh reseptörünün yarışmalı antagonistleridir; antagonize edecekleri ACh yoktur, etkisizdir. HR’yi artırmak için izoprenalin kullanılabilir. [[K1 s. 261]]',
      adr: '<b>Adrenalin, noradrenalin.</b> Sempatik denervasyon β1 reseptörlerini artırır (up-regülasyon); nakledilen kalbin yanıtı abartılıdır. [[K1 s. 261]]',
    };
    let sel = 'din', prog = 1;
    el.innerHTML = `${seg('Senaryo', 's', Object.keys(S).map((k) => [k, S[k].ad]), sel)}<div class="f57-host"></div>`;
    const host = el.querySelector('.f57-host');
    const K = prep(el, () => draw());
    const heartG = (x, y, txp, trans) => `<g transform="translate(${x} ${y})">
      <path d="M55 112 C10 80 4 40 28 22 C42 12 55 22 55 34 C55 22 68 12 82 22 C106 40 100 80 55 112 Z" style="fill:var(--crit-soft);stroke:var(--muted);stroke-width:1.8"/>
      <path d="M40 -2 C32 14 50 14 42 26" style="fill:none;stroke:var(--accent);stroke-width:2.6" ${trans ? 'stroke-dasharray="14 100"' : ''}/>
      <path d="M72 -2 C64 14 82 14 72 26" style="fill:none;stroke:var(--c-clin);stroke-width:2.6" ${trans ? 'stroke-dasharray="14 100"' : ''}/>
      ${trans ? `<path d="M30 14 l 12 12 M42 14 l -12 12 M62 14 l 12 12 M74 14 l -12 12" style="stroke:var(--crit);stroke-width:2.4"/>` : ''}
      ${trans ? `<rect x="86" y="70" width="46" height="24" rx="12" style="fill:var(--warn-soft);stroke:var(--warn)"/><text x="109" y="87" text-anchor="middle" class="f57-t f57-b" style="fill:var(--ink)">β1 ↑</text>` : ''}
    </g>`;
    function draw() {
      const n = K.narrow, W = n ? 360 : 680, H = n ? 390 : 330, c = S[sel];
      const cx0 = n ? 40 : 232, cx1 = n ? 346 : 664, cy0 = n ? 214 : 24, cy1 = n ? 340 : 268;
      const X = lin(0, 10, cx0, cx1), Y = lin(40, 160, cy1, cy0);
      let s = svgOpen(W, H, 'Normal ve nakledilen kalbin heart rate yanıtı: seçili senaryoda iki eğri zamanla karşılaştırılır', n);
      if (n) {
        s += heartG(24, 8, 0, false) + heartG(200, 8, 0, true) + tx(80, 142, 'Normal kalp', { a: 'middle', c: '--ink', b: 1 }) + tx(256, 142, 'Nakledilen kalp', { a: 'middle', c: '--ink', b: 1 });
        s += tx(8, 166, 'vagus', { c: '--accent', b: 1 }) + tx(62, 166, 'sempatik', { c: '--c-clin', b: 1 });
      } else {
        s += heartG(30, 18, 0, false) + heartG(30, 176, 0, true) + tx(85, 152, 'Normal kalp', { a: 'middle', c: '--ink', b: 1 }) + tx(85, 310, 'Nakledilen kalp', { a: 'middle', c: '--ink', b: 1 });
        s += tx(150, 40, 'vagus', { c: '--accent', b: 1 }) + tx(150, 58, 'sempatik', { c: '--c-clin', b: 1 });
      }
      if (c.band) s += rc(X(c.band[0]), cy0, X(c.band[1]) - X(c.band[0]), cy1 - cy0, '--warn-soft', null, 0) + tx((X(c.band[0]) + X(c.band[1])) / 2, cy0 + 16, 'Egzersiz', { a: 'middle', c: '--ink', b: 1 });
      s += ln(cx0, cy1, cx1, cy1, '--muted', 1.2) + ln(cx0, cy0, cx0, cy1, '--muted', 1.2) + tx(cx0 - 6, cy0 + 4, 'HR', { a: 'end', c: '--ink', b: 1 });
      for (let t = 0; t <= 10; t += 2) s += ln(X(t), cy1, X(t), cy1 + 4, '--muted') + tx(X(t), cy1 + 18, String(t), { a: 'middle' });
      s += tx(cx1, cy1 + 34, 'dakika (temsilî)', { a: 'end' });
      s += ln(cx0, Y(100), cx1, Y(100), '--line', 1, '5 4');
      if (sel === 'din') s += tx(cx1, Y(100) - 6, '≈ 100/dk', { a: 'end', c: '--accent-ink', b: 1 });
      const lim = prog * 10;
      const crv = (fn, col, w) => pa(P(sample(fn, 0, lim, 0.05).map(([t, v]) => [X(t), Y(clamp(v, 40, 160))])), col, w);
      s += crv(c.N, '--ink', 2.8) + crv(c.T, '--accent', 2.8);
      [c.ok, c.ok2].forEach((o, i) => { if (o) s += pa(`M${f1(X(o[0]))} ${cy0} v 18`, i ? '--muted' : '--ink', 2.2) + pa(`M${f1(X(o[0]) - 5)} ${cy0 + 12} l 5 7 l 5 -7`, i ? '--muted' : '--ink', 2.2) + tx(X(o[0]) + 7, cy0 + 12, o[1], { c: i ? '--muted' : '--ink', b: 1 }); });
      host.innerHTML = s + '</svg>';
      el.querySelector('.f57-lej') || host.insertAdjacentHTML('afterend', '<ul class="f57-lej"><li><i style="background:var(--ink)"></i>Normal kalp</li><li><i style="background:var(--accent)"></i>Nakledilen kalp</li></ul>');
    }
    el.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => { sel = b.dataset.s; setSeg(el, 's', sel); if (AC[sel]) K.setCap(AC[sel]); else K.defCap(); prog = RM ? 1 : 0; draw(); }));
    draw();
    const stop = ticker(el, (dt) => { if (prog < 1) { prog = Math.min(1, prog + dt / 0.8); draw(); } });
    return () => { stop(); K.stop(); };
  };
})();
