/* Ek 70 · Asit–baz kompansasyonu: hücre içi tamponlar, in vitro ve in vivo tampon doğruları (K2 s. 257; K1 s. 332–333).
   Bileşen tarifleri: docs/tasarim/fizek70.md. Modeller şematiktir; bileşen altlarında öyle belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const sgn = (v, d = 1) => (v > 0.0499 ? '+' : '') + fmt(Math.abs(v) < 0.05 ? 0 : v, d);
  const NS = 'http://www.w3.org/2000/svg';
  const kapAc = (el, t) => { const c = el.closest('.viz') && el.closest('.viz').querySelector('.viz-cap'); if (c && c.dataset.son !== t) { c.dataset.son = t; c.innerHTML = REF(t); } };
  const svgA = (vb, lbl, ek = '') => `<svg class="fek70-svg" viewBox="${vb}" role="img" aria-label="${lbl}" ${ek}>`;
  const dar = (el) => el.clientWidth < 560;
  const seg = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const T = (x, y, t, cls = '', ek = '') => `<text x="${x}" y="${y}" class="${cls}" ${ek}>${t}</text>`;
  const rnd = (() => { let s = 11; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();
  const ro = (el, fn) => { let son = dar(el); const r = 'ResizeObserver' in window ? new ResizeObserver(() => { const d = dar(el); if (d !== son) { son = d; fn(); } }) : null; if (r) r.observe(el); return () => { if (r) r.disconnect(); }; };

  /* ---------- ortak model ---------- */
  const HH = (h, p) => 6.1 + Math.log10(h / (0.23 * p));
  const vucut = (P, beta) => { let pH = 7.4; for (let i = 0; i < 200; i++) { const h = 24.4 + beta * (7.4 - pH); pH += 0.5 * (HH(h, P) - pH); } return { pH, h: 24.4 + beta * (7.4 - pH) }; };
  const yarat = (pH, pKa) => { const r = Math.pow(10, pH - pKa); return (4 * r) / ((1 + r) * (1 + r)); };

  /* ---------- 1 · pH ile pKa ---------- */
  VIZ.fek70_pka = (el) => {
    let pH = 7.0;
    el.innerHTML = `<div class="fek70-ctl"><label class="fek70-rng"><span>pH <b data-o="pH"></b></span><input type="range" min="6" max="8" step="0.05" value="7" aria-label="pH"></label>${seg('Hızlı seçim', 'h', [['7.00', 'Hücre içi (7,0)'], ['7.40', 'Plazma (7,4)']], '7.00')}</div>
      <p class="fek70-oku" data-o="oku"></p><div class="fek70-gv"></div>`;
    const rng = el.querySelector('input'), gv = el.querySelector('.fek70-gv');
    const nit = (B) => (B >= 0.8 ? 'güçlü' : B >= 0.4 ? 'orta' : 'zayıf');
    function hucre(ox, oy, w, h, narrow, B) {
      let s = `<g transform="translate(${ox} ${oy})">`;
      const nb = Math.round(8 * B);
      if (!narrow) {
        s += `<rect class="fek70-hucre" x="0" y="22" width="${w}" height="${h - 70}" rx="28"/>` + T(w / 2, 14, 'Hücre içi', 'fek70-lb', 'text-anchor="middle"');
        s += `<rect class="fek70-kutu" x="14" y="38" width="${w - 28}" height="30" rx="6"/>` + T(w / 2, 58, 'Protein ≈ 6 mmol/L', 'fek70-t', 'text-anchor="middle"');
        s += `<rect class="fek70-kutu" x="14" y="76" width="${w - 28}" height="46" rx="6"/>` + T(w / 2, 95, 'Fosfat (H₂PO₄⁻/HPO₄²⁻)', 'fek70-t', 'text-anchor="middle"') + T(w / 2, 113, '≈ 6 mmol/L', 'fek70-t', 'text-anchor="middle"');
        s += T(w / 2, 144, 'pKa ≈ 6,8', 'fek70-t2', 'text-anchor="middle"') + T(w / 2, 162, 'hücre içi pH 6,8–7,1', 'fek70-t2', 'text-anchor="middle"');
        for (let i = 0; i < 8; i++) { if (i < nb) s += `<circle class="fek70-h" cx="${30 + i * 24}" cy="73" r="4.5"/>`; else s += `<circle class="fek70-h fek70-serbest" cx="${26 + ((i * 53) % 170)}" cy="${182 + ((i * 29) % 36)}" r="4.5"/>`; }
        s += T(w / 2, h - 34, 'Karbonik ve karbonik olmayan', 'fek70-not', 'text-anchor="middle"') + T(w / 2, h - 18, 'asitleri tamponlar', 'fek70-not', 'text-anchor="middle"');
      } else {
        s += `<rect class="fek70-hucre" x="0" y="20" width="${w}" height="140" rx="22"/>` + T(w / 2, 14, 'Hücre içi', 'fek70-lb', 'text-anchor="middle"');
        s += `<rect class="fek70-kutu" x="10" y="32" width="${w / 2 - 15}" height="40" rx="6"/>` + T(w / 4 + 2, 49, 'Protein', 'fek70-t', 'text-anchor="middle"') + T(w / 4 + 2, 65, '≈ 6 mmol/L', 'fek70-t', 'text-anchor="middle"');
        s += `<rect class="fek70-kutu" x="${w / 2 + 5}" y="32" width="${w / 2 - 15}" height="40" rx="6"/>` + T(w * 0.75 - 2, 49, 'Fosfat', 'fek70-t', 'text-anchor="middle"') + T(w * 0.75 - 2, 65, '≈ 6 mmol/L', 'fek70-t', 'text-anchor="middle"');
        s += T(w / 2, 92, 'pKa ≈ 6,8 · hücre içi pH 6,8–7,1', 'fek70-t2', 'text-anchor="middle"');
        for (let i = 0; i < 8; i++) { if (i < nb) s += `<circle class="fek70-h" cx="${40 + i * 40}" cy="80" r="4.5"/>`; else s += `<circle class="fek70-h fek70-serbest" cx="${30 + ((i * 47) % 300)}" cy="${112 + ((i * 29) % 34)}" r="4.5"/>`; }
        s += T(w / 2, 178, 'Karbonik ve karbonik olmayan asitleri tamponlar', 'fek70-not', 'text-anchor="middle"');
      }
      return s + '</g>';
    }
    function egri(ox, oy, w, h, narrow) {
      const x0 = narrow ? 36 : 30, x1 = w - 8, yt = narrow ? 14 : 36, yb = h - (narrow ? 70 : 70);
      const xs = (p) => ox + x0 + ((p - 6) / 2) * (x1 - x0), ys = (B) => oy + yb - B * (yb - yt);
      let s = `<rect class="fek70-bant" x="${xs(6.8)}" y="${oy + yt}" width="${xs(7.1) - xs(6.8)}" height="${yb - yt}"/>`;
      for (const p of [6, 6.5, 7, 7.5, 8]) s += `<line class="fek70-gr" x1="${xs(p)}" x2="${xs(p)}" y1="${oy + yb}" y2="${oy + yb + 4}"/>` + T(xs(p), oy + yb + 17, fmt(p, 1), 'fek70-tk', 'text-anchor="middle"');
      s += `<line class="fek70-eks" x1="${ox + x0}" x2="${ox + x1}" y1="${oy + yb}" y2="${oy + yb}"/><line class="fek70-eks" x1="${ox + x0}" x2="${ox + x0}" y1="${oy + yt}" y2="${oy + yb}"/>`;
      s += T(ox + (x0 + x1) / 2, oy + yb + 34, 'pH', 'fek70-tk', 'text-anchor="middle"');
      s += `<text class="fek70-tk" transform="translate(${ox + 11} ${oy + (yt + yb) / 2}) rotate(-90)" text-anchor="middle">Göreli tamponlama gücü</text>` + T(ox + x0 + 4, oy + yt + 11, 'yüksek', 'fek70-tk') + T(ox + x0 + 4, oy + yb - 5, 'düşük', 'fek70-tk');
      s += `<line class="fek70-pl" x1="${xs(7.4)}" x2="${xs(7.4)}" y1="${oy + yt}" y2="${oy + yb}"/>` + T(xs(7.4) + 4, oy + yt + 11, 'Plazma 7,4', 'fek70-tk');
      if (!narrow) s += T(xs(6.95), oy + yb - 6, 'hücre içi', 'fek70-tk', 'text-anchor="middle"');
      const yol = (pKa) => { let d = ''; for (let p = 6; p <= 8.0001; p += 0.05) d += (d ? 'L' : 'M') + xs(p).toFixed(1) + ' ' + ys(yarat(p, pKa)).toFixed(1); return d; };
      s += `<path d="${yol(6.1)}" class="fek70-e fek70-e-bik"/><path d="${yol(6.8)}" class="fek70-e fek70-e-pro"/>`;
      s += `<line class="fek70-imlec" x1="${xs(pH)}" x2="${xs(pH)}" y1="${oy + yt}" y2="${oy + yb}"/>`;
      const Bp = yarat(pH, 6.8), Bb = yarat(pH, 6.1), sol = xs(pH) > ox + w - 90;
      s += `<circle class="fek70-nk fek70-nk-pro" cx="${xs(pH)}" cy="${ys(Bp)}" r="5.5"/><circle class="fek70-nk fek70-nk-bik" cx="${xs(pH)}" cy="${ys(Bb)}" r="5"/>`;
      const ax = sol ? 'text-anchor="end"' : '', dx = sol ? -9 : 9;
      s += T(xs(pH) + dx, ys(Bp) + (Bp > 0.7 ? 16 : -8), nit(Bp), 'fek70-nl fek70-nl-pro', ax) + T(xs(pH) + dx, ys(Bb) + (Bb > 0.7 ? 16 : -8), nit(Bb), 'fek70-nl fek70-nl-bik', ax);
      const ly = oy + yb + 52;
      s += `<line class="fek70-e fek70-e-pro" x1="${ox + x0}" x2="${ox + x0 + 26}" y1="${ly}" y2="${ly}"/>` + T(ox + x0 + 34, ly + 4, 'Protein / fosfat (pKa ≈ 6,8)', 'fek70-t2');
      s += `<line class="fek70-e fek70-e-bik" x1="${ox + x0}" x2="${ox + x0 + 26}" y1="${ly + 20}" y2="${ly + 20}"/>` + T(ox + x0 + 34, ly + 24, 'HCO₃⁻/H₂CO₃ (pKa 6,1)', 'fek70-t2');
      return s;
    }
    function ciz() {
      const n = dar(el), Bp = yarat(pH, 6.8), Bb = yarat(pH, 6.1);
      if (!n) gv.innerHTML = svgA('0 0 760 372', 'Hücre içi protein ve fosfat tamponlarının pKa değeri 6,8 çevresinde tamponlama gücü; bikarbonat sisteminin pKa değeri 6,1; seçili pH imleci') + hucre(20, 14, 230, 300, false, Bp) + egri(270, 14, 480, 330, false) + '</svg>';
      else gv.innerHTML = svgA('0 0 360 195', 'Hücre içi tamponlar: protein ve fosfat') + hucre(0, 0, 360, 195, true, Bp) + '</svg>' + svgA('0 0 360 296', 'Tampon gücünün pH ile değişimi: protein/fosfat ve bikarbonat eğrileri') + egri(0, 0, 360, 296, true) + '</svg>';
      el.querySelector('[data-o=pH]').textContent = fmt(pH, 2);
      rng.setAttribute('aria-valuetext', 'pH ' + fmt(pH, 2));
      el.querySelector('[data-o=oku]').innerHTML = `<b>pH ${fmt(pH, 2)}</b> · protein/fosfat: <b class="fek70-pro">${nit(Bp)}</b> · bikarbonat: <b class="fek70-bik">${nit(Bb)}</b>`;
      kapAc(el, pH < 6.8 - 1e-6 ? 'pH pKa’nın altına indi: tampon yine pKa’dan uzaklaştıkça zayıflar; en yüksek güç pH = pKa noktasındadır. [[K2 s. 257]]'
        : pH <= 7.1 + 1e-6 ? 'Hücre içi pH aralığı: ortam pH’ı protein ve fosfatın pKa değerine (≈ 6,8) yakın, bu iki tampon en güçlü bölgede çalışır. [[K2 s. 257]]'
        : pH < 7.6 - 1e-6 ? 'pH yükseldikçe pKa’dan uzaklaşılır ve protein/fosfat tamponunun gücü azalır; pKa’sı 6,1 olan bikarbonat sistemi 7,4’te bu bakımdan daha da uzaktadır. [[K2 s. 257]] [[K1 s. 332]]'
        : 'pH, iki pKa değerinden de uzak: her iki tamponun göreli gücü düşük. [[K1 s. 332]]');
    }
    rng.addEventListener('input', () => { pH = +rng.value; basSec(el, 'h', fmt(pH, 2).replace(',', '.')); ciz(); });
    el.querySelectorAll('[data-h]').forEach((b) => b.addEventListener('click', () => { pH = +b.dataset.h; rng.value = pH; basSec(el, 'h', b.dataset.h); ciz(); }));
    ciz();
    return ro(el, ciz);
  };

  /* ---------- 2 · Tüp ve vücut ---------- */
  VIZ.fek70_tup = (el) => {
    let step = 1, p = RM ? 1 : 0, run = false, tEnd = 0;
    const SURE = 3.5;
    el.innerHTML = `<div class="fek70-ctl"><button type="button" class="fek70-btn" data-a="play">Oynat</button><button type="button" class="fek70-btn" data-a="reset">Baştan</button>${seg('Adım', 's', [[1, '1'], [2, '2'], [3, '3'], [4, '4']], 1)}</div><div class="fek70-gv"></div>`;
    const gv = el.querySelector('.fek70-gv'), play = el.querySelector('[data-a=play]');
    if (RM) play.hidden = true;
    const ease = (x) => x * x * (3 - 2 * x);
    const RBC = (x, y) => `<ellipse class="fek70-rbc" cx="${x}" cy="${y}" rx="12" ry="7.5"/><ellipse class="fek70-rbc2" cx="${x}" cy="${y}" rx="4.5" ry="2.6"/>`;
    const dot = (c, x, y, r = 4.5, t = '') => `<circle class="fek70-${c}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}"/>${t}`;
    function okuma(x, y, w, ph, hc, uyar, narrow) {
      const t = narrow ? `pH ${ph} · HCO₃⁻ ${hc}${hc === '…' ? '' : ' mmol/L'}` : '';
      if (narrow) return `<rect class="fek70-okk${uyar ? ' fek70-uy' : ''}" x="${x}" y="${y}" width="${w}" height="26" rx="6"/>` + T(x + w / 2, y + 17, t, 'fek70-t', 'text-anchor="middle"');
      return `<rect class="fek70-okk${uyar ? ' fek70-uy' : ''}" x="${x}" y="${y}" width="${w}" height="40" rx="6"/>` + T(x + 10, y + 16, 'pH  ' + ph, 'fek70-t') + T(x + 10, y + 33, 'Plazma HCO₃⁻  ' + hc + (hc === '…' ? '' : ' mmol/L'), 'fek70-t');
    }
    const q = () => ease(clamp(p, 0, 1));
    function giris(x0, x1, y, pa) {
      let s = ''; const n = 3, f = step === 2 ? q() : 0;
      for (let i = 0; i < n; i++) { const x = x0 + ((i + 0.5) * (x1 - x0)) / n; s += `<line class="fek70-ok" x1="${x}" x2="${x}" y1="${y}" y2="${y + 22}"/><path class="fek70-okuc" d="M${x - 4} ${y + 17}L${x} ${y + 24}L${x + 4} ${y + 17}Z"/>`; if (step === 2 && f < 1) s += dot('co2', x, y + 4 + f * 40, 5); }
      return s + T((x0 + x1) / 2, y - 4, 'CO₂ girişi · PaCO₂ ' + pa, 'fek70-t2', 'text-anchor="middle"');
    }
    function tup(w, h, narrow) {
      const hi = step >= 2, pa = hi ? '10,7 kPa' : '5,3 kPa';
      const vy = narrow ? 58 : 66, vb = h - (narrow ? 48 : 70), cx = w / 2, tw = narrow ? 90 : 76;
      let s = T(w / 2, 18, 'In vitro · deney tüpü', 'fek70-lb fek70-lb-v', 'text-anchor="middle"');
      s += giris(cx - 34, cx + 34, narrow ? 30 : 34, pa).replace(/(<text[^>]*>)CO₂ girişi · /, '$1');
      s += `<path class="fek70-tup" d="M${cx - tw / 2} ${vy}V${vb - tw / 2}A${tw / 2} ${tw / 2} 0 0 0 ${cx + tw / 2} ${vb - tw / 2}V${vy}"/>`;
      s += `<path class="fek70-kan" d="M${cx - tw / 2 + 2} ${vy + 12}V${vb - tw / 2}A${tw / 2 - 2} ${tw / 2 - 2} 0 0 0 ${cx + tw / 2 - 2} ${vb - tw / 2}V${vy + 12}Z"/>`;
      const rb = [[cx - 18, vy + 40], [cx + 16, vy + 62], [cx - 14, vy + 92], [cx + 18, vy + 112]].filter((_, i) => i < (narrow ? 3 : 4));
      rb.forEach(([x, y]) => (s += RBC(x, y)));
      if (hi) {
        const f = step === 2 ? q() : 1;
        rb.forEach(([x, y], i) => { s += dot('h', x + 5, y - 3 - (step === 2 ? (1 - f) * 6 : 0), 3.3); });
        const sp = [[-30, 6], [30, 6], [-8, 22], [8, 38], [-30, 52], [30, 56], [-8, 74], [8, 82]];
        for (let i = 0; i < 8; i++) { const b = rb[i % rb.length], x = b[0] + (cx + sp[i][0] - b[0]) * f, y = b[1] + (vy + 18 + sp[i][1] * (narrow ? 0.7 : 1) + (i % 2) * 50 - b[1]) * f; s += dot('hco', x, clamp(y, vy + 16, vb - tw / 2 - 4), 4.2); }
        if (step === 2 && f < 1) s += T(cx + tw / 2 + 8, vy + 30, 'Hb H⁺ bağlar', 'fek70-not');
      }
      s += T(cx + tw / 2 + 8, vy + 14, 'kan', 'fek70-not');
      const ph = step === 1 ? '7,40' : step === 2 ? '…' : '7,19', hc = step === 1 ? '24,4' : step === 2 ? '…' : '30,6';
      s += okuma(narrow ? 10 : 20, h - (narrow ? 28 : 46), w - (narrow ? 20 : 40), ph, hc, false, narrow);
      return s;
    }
    function govde(w, h, narrow) {
      const hi = step >= 2, pa = hi ? '10,7 kPa' : '5,3 kPa';
      const vy = narrow ? 58 : 66, vb = h - (narrow ? 48 : 70);
      const px0 = narrow ? 8 : 10, px1 = Math.round(w * (narrow ? 0.44 : 0.4)), ix0 = px1 + (narrow ? 26 : 22), ix1 = w - 8;
      let s = T(w / 2, 18, 'In vivo · vücut', 'fek70-lb fek70-lb-i', 'text-anchor="middle"');
      s += giris(px0 + 10, px1 - 10, narrow ? 30 : 34, pa).replace(/(<text[^>]*>)CO₂ girişi · /, '$1');
      s += `<rect class="fek70-plz" x="${px0}" y="${vy}" width="${px1 - px0}" height="${vb - vy}" rx="8"/><rect class="fek70-ist" x="${ix0}" y="${vy}" width="${ix1 - ix0}" height="${vb - vy}" rx="8"/>`;
      const wx = (px1 + ix0) / 2;
      s += `<line class="fek70-duvar" x1="${wx}" x2="${wx}" y1="${vy - 4}" y2="${vb + 4}"/>`;
      s += T((px0 + px1) / 2, vy + 15, 'Plazma', 'fek70-not', 'text-anchor="middle"') + T((px0 + px1) / 2, vy + 29, '(kan ≈ ECF’nin 1/3’ü)', 'fek70-not', 'text-anchor="middle"');
      s += T((ix0 + ix1) / 2, vy + 15, 'İnterstisyel sıvı', 'fek70-not', 'text-anchor="middle"') + T((ix0 + ix1) / 2, vy + 29, '(ECF’nin ≈ 2/3’ü)', 'fek70-not', 'text-anchor="middle"');
      s += T(wx, vb + 15, 'Kapiller duvarı', 'fek70-not', 'text-anchor="middle"');
      const pw = px1 - px0, rb = [[px0 + pw * 0.32, vy + 44], [px0 + pw * 0.68, vy + 70], [px0 + pw * 0.34, vy + 100]];
      rb.forEach(([x, y]) => (s += RBC(x, y)));
      if (hi) {
        const f = step === 2 ? q() : 1, d = step === 4 ? q() : 0;
        rb.forEach(([x, y]) => (s += dot('h', x + 5, y - 3, 3.3)));
        for (let i = 0; i < 8; i++) {
          const gx = px0 + 10 + ((i % 4) + 0.3) * (pw - 20) / 4, gy = vy + 44 + Math.floor(i / 4) * 44 + (i % 2) * 16, b = rb[i % 3];
          let x = b[0] + (gx - b[0]) * f, y = b[1] + (gy - b[1]) * f;
          if (i % 2 === 1 && d > 0) { const tx = ix0 + 14 + ((i >> 1) % 2) * ((ix1 - ix0) / 2.6), ty = vy + 46 + (i >> 1) * ((vb - vy - 90) / 3); x += (tx - x) * d; y += (ty - y) * d; }
          s += dot('hco', x, y, 4.2);
        }
      }
      if (step === 4) s += `<rect class="fek70-zb0" x="${ix0 + 8}" y="${vb - 22}" width="${ix1 - ix0 - 16}" height="7" rx="3.5"/><rect class="fek70-zb1" x="${ix0 + 8}" y="${vb - 22}" width="${(ix1 - ix0 - 16) * q()}" height="7" rx="3.5"/>` + T(ix0 + 8, vb - 28, '0 → 10–20 dk', 'fek70-not');
      const ph = step === 1 ? '7,40' : step === 2 ? '…' : step === 3 ? '7,19' : '7,14', hc = step === 1 ? '24,4' : step === 2 ? '…' : step === 3 ? '30,6' : '27,0';
      s += okuma(narrow ? 10 : 10, h - (narrow ? 28 : 46), w - (narrow ? 20 : 20), ph, hc, step === 4, narrow);
      return s;
    }
    function ciz() {
      const n = dar(el), lbl = 'Aynı kan iki kapta: deney tüpünde bikarbonat kalır, vücutta plazmadan interstisyuma geçer';
      if (!n) gv.innerHTML = svgA('0 0 760 340', lbl) + `<g transform="translate(20 0)">${tup(280, 340, false)}</g><line class="fek70-ayr" x1="316" x2="316" y1="10" y2="330"/><g transform="translate(330 0)">${govde(410, 340, false)}</g></svg>`;
      else gv.innerHTML = svgA('0 0 360 235', 'In vitro deney tüpü') + tup(360, 235, true) + '</svg>' + svgA('0 0 360 235', 'In vivo vücut: plazma ve interstisyel sıvı') + govde(360, 235, true) + '</svg>';
      basSec(el, 's', step);
      play.textContent = run ? 'Duraklat' : step === 4 && p >= 1 ? 'Baştan' : 'Oynat';
      kapAc(el, [
        'Başlangıç: iki kapta aynı kan, aynı PaCO₂ (5,3 kPa) ve pH. Sağda kan, hücre dışı sıvının (ECF) yaklaşık üçte biridir; geri kalanı interstisyel sıvıdır. [[K2 s. 257]]',
        'CO₂ eklenir: CO₂’yi esas olarak hemoglobin tamponlar ve bu sırada bikarbonat oluşur. [[K2 s. 257]]',
        'Tüpte oluşan bikarbonat tüpün içinde kalır. Vücutta da ilk anda plazmadadır. [[K2 s. 257]]',
        'Vücutta bikarbonatın bir kısmı kapiller duvarını geçip interstisyuma difüze olur; kan ile interstisyel sıvı 10–20 dakikada dengelenir. Plazmada daha az bikarbonat kalır: in vivo pH daha çok düşer, bikarbonat daha az artar. [[K2 s. 257]]'][step - 1]);
    }
    function git(s) { step = s; p = 1; tEnd = 0; ciz(); }
    el.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => { run = false; git(+b.dataset.s); }));
    el.querySelector('[data-a=reset]').addEventListener('click', () => { run = false; git(1); });
    play.addEventListener('click', () => { if (run) { run = false; ciz(); return; } if (step === 4 && p >= 1) git(1); if (step === 1) p = 1; run = true; ciz(); });
    ciz();
    const stop = ticker(el, (dt) => {
      if (!run) return;
      if (step === 1 || step === 3) { tEnd += dt; if (tEnd >= SURE) { if (step === 3) { step = 4; p = 0; tEnd = 0; } else { step = 2; p = 0; tEnd = 0; } ciz(); } return; }
      p = Math.min(1, p + dt / (SURE * 0.8)); tEnd += dt;
      if (tEnd >= SURE) { if (step === 2) { step = 3; p = 1; tEnd = 0; } else { run = false; p = 1; } }
      ciz();
    });
    const sr = ro(el, ciz);
    return () => { stop(); sr(); };
  };

  /* ---------- 3 · İn vitro / in vivo titrasyon eğrileri ---------- */
  VIZ.fek70_egri = (el) => {
    let P = 5.3;
    el.innerHTML = `<div class="fek70-ctl"><label class="fek70-rng"><span data-o="et"></span><input type="range" min="2.7" max="13.3" step="0.1" value="5.3"></label></div><div class="fek70-gv"></div><div class="fek70-seri"></div>`;
    const rng = el.querySelector('input'), gv = el.querySelector('.fek70-gv'), seri = el.querySelector('.fek70-seri');
    const IV = (x) => vucut(x, 30), IN = (x) => vucut(x, 10);
    function graf(ox, oy, w, h, tip, narrow) {
      const x0 = narrow ? 46 : 52, x1 = w - 10, yt = 22, yb = h - 40;
      const [lo, hi, tk, fy, ad, un] = tip === 'h' ? [16, 36, [16, 20, 24, 28, 32, 36], (r) => r.h, 'Plazma HCO₃⁻ (mmol/L)', 0] : [7.0, 7.7, [7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7], (r) => r.pH, 'pH', 1];
      const xs = (v) => ox + x0 + ((v - 2) / 12) * (x1 - x0), ys = (v) => oy + yb - ((v - lo) / (hi - lo)) * (yb - yt);
      let s = `<rect class="fek70-ok-bant" x="${xs(4.7)}" y="${oy + yt}" width="${xs(6.0) - xs(4.7)}" height="${yb - yt}"/>`;
      for (const v of tk) s += `<line class="fek70-gr" x1="${ox + x0}" x2="${ox + x1}" y1="${ys(v)}" y2="${ys(v)}"/>` + T(ox + x0 - 5, ys(v) + 4, fmt(v, un ? 1 : 0), 'fek70-tk', 'text-anchor="end"');
      for (const v of [2, 4, 6, 8, 10, 12, 14]) s += T(xs(v), oy + yb + 15, String(v), 'fek70-tk', 'text-anchor="middle"');
      s += `<line class="fek70-eks" x1="${ox + x0}" x2="${ox + x1}" y1="${oy + yb}" y2="${oy + yb}"/><line class="fek70-eks" x1="${ox + x0}" x2="${ox + x0}" y1="${oy + yt}" y2="${oy + yb}"/>`;
      s += T(ox + x0 + (x1 - x0) / 2, oy + yb + 32, 'PaCO₂ (kPa)', 'fek70-tk', 'text-anchor="middle"') + T(ox + x0, oy + 12, ad, 'fek70-lb');
      for (const [fn, c] of [[IV, 'v'], [IN, 'i']]) { let d = ''; for (let v = 2; v <= 14.001; v += 0.25) { const y = fy(fn(v)); if (y < lo - 0.02 || y > hi + 0.02) continue; d += (d ? 'L' : 'M') + xs(v).toFixed(1) + ' ' + ys(y).toFixed(1); } s += `<path class="fek70-eg fek70-eg-${c}" d="${d}"/>`; }
      const a = fy(IV(P)), b = fy(IN(P));
      s += `<line class="fek70-fark" x1="${xs(P)}" x2="${xs(P)}" y1="${ys(a)}" y2="${ys(b)}"/><line class="fek70-imlec" x1="${xs(P)}" x2="${xs(P)}" y1="${oy + yt}" y2="${oy + yb}" opacity=".35"/><circle class="fek70-nk fek70-nk-v" cx="${xs(P)}" cy="${ys(a)}" r="5"/><circle class="fek70-nk fek70-nk-i" cx="${xs(P)}" cy="${ys(b)}" r="5"/>`;
      if (tip === 'h') s += T(xs(6.0) + 6, oy + yt + 12, narrow ? 'Normal çevresi' : 'Normal çevresi: fark çok küçük', 'fek70-not');
      return s;
    }
    function ciz() {
      const n = dar(el), a = IV(P), b = IN(P), be = (b.h - 24.4) + 30 * (b.pH - 7.4);
      if (!n) gv.innerHTML = svgA('0 0 760 300', 'Plazma bikarbonatı ve pH değerinin PaCO₂ ile in vitro ve in vivo eğrileri') + graf(10, 0, 400, 300, 'h', false) + graf(440, 0, 310, 300, 'p', false) + `<g transform="translate(60 0)">${''}</g>` + '</svg>';
      else gv.innerHTML = svgA('0 0 360 230', 'Plazma bikarbonatı – PaCO₂ eğrileri') + graf(0, 0, 360, 230, 'h', true) + '</svg>' + svgA('0 0 360 230', 'pH – PaCO₂ eğrileri') + graf(0, 0, 360, 230, 'p', true) + '</svg>';
      const mm = Math.round(P * 7.5), mod = Math.abs(be) < 2 ? 'ok' : 'uy';
      el.querySelector('[data-o=et]').innerHTML = `PaCO₂ <b>${fmt(P, 1)} kPa (${mm} mmHg)</b>`;
      rng.setAttribute('aria-valuetext', `PaCO₂ ${fmt(P, 1)} kPa`);
      seri.innerHTML = `<div class="fek70-ks fek70-ks-v"><i></i>In vitro (tüp, kan): <b>pH ${fmt(a.pH, 2)} · HCO₃⁻ ${fmt(a.h, 1)}</b></div><div class="fek70-ks fek70-ks-i"><i></i>In vivo (tüm ECF): <b>pH ${fmt(b.pH, 2)} · HCO₃⁻ ${fmt(b.h, 1)}</b></div><div class="fek70-be fek70-be-${mod}">Kan örneğinin BE’si (in vitro hesap): <b>${sgn(be, 1)} mmol/L</b> · ${mod === 'ok' ? 'metabolik bozukluk yok gibi' : be < 0 ? 'yanlış metabolik asidoz izlenimi' : 'yanlış metabolik alkaloz izlenimi'}</div>`;
      kapAc(el, P >= 4.7 && P <= 6.0 ? 'Normal PaCO₂ çevresinde iki eğri neredeyse üst üste: klinik durumların çoğunda in vitro ile in vivo arasındaki fark çok küçüktür. [[K2 s. 257]]'
        : P > 6.0 ? 'Akut hiperkapni: in vivo pH daha çok düşer, plazma bikarbonatı daha az artar. Kan örneğinin in vitro baz fazlası negatifleşir ve metabolik bozukluk yokken metabolik asidoz varmış izlenimi doğar. [[K2 s. 257]]'
        : 'Akut hipokapni: interstisyumdan plazmaya bikarbonat dönmesiyle in vivo bikarbonat daha az düşer; kan örneğinin in vitro baz fazlası pozitifleşir ve yanlış bir metabolik alkaloz izlenimi doğar. [[K2 s. 257]]');
    }
    rng.addEventListener('input', () => { P = +rng.value; ciz(); });
    ciz();
    return ro(el, ciz);
  };

  /* ---------- 4 · Solunumsal kompansasyon ---------- */
  VIZ.fek70_solunum = (el) => {
    let hedef = 12, h = 12, komp = true, faz = 0;
    el.innerHTML = `<div class="fek70-ctl"><label class="fek70-rng"><span>Plazma HCO₃⁻ <b data-o="h"></b></span><input type="range" min="8" max="40" step="1" value="12" aria-label="Plazma bikarbonat"></label>
      ${seg('Hızlı seçim', 'q', [[12, 'Metabolik asidoz (12)'], [24, 'Normal (24)'], [36, 'Metabolik alkaloz (36)']], 12)}${seg('Kompansasyon', 'k', [[0, 'Kompansasyon yok'], [1, 'Solunumsal kompansasyon']], 1)}</div><div class="fek70-gv"></div>`;
    const rng = el.querySelector('input'), gv = el.querySelector('.fek70-gv');
    function coz(hc, k) {
      if (!k) return { P: 5.3, V: 1, pH: HH(hc, 5.3) };
      let pH = 7.4, V = 1, P = 5.3;
      for (let i = 0; i < 300; i++) { V = clamp(Math.pow(2, (7.4 - pH) / 0.1), 0.6, 4); P = 5.3 / V; pH += 0.3 * (HH(hc, P) - pH); }
      return { P, V, pH };
    }
    const lung = (cx, cy) => `<g class="fek70-akc" data-cx="${cx}" data-cy="${cy}"><path class="fek70-lob" d="M${cx - 6} ${cy - 40}C${cx - 36} ${cy - 40} ${cx - 54} ${cy - 6} ${cx - 54} ${cy + 26}C${cx - 54} ${cy + 46} ${cx - 34} ${cy + 46} ${cx - 6} ${cy + 40}Z"/><path class="fek70-lob" d="M${cx + 6} ${cy - 40}C${cx + 36} ${cy - 40} ${cx + 54} ${cy - 6} ${cx + 54} ${cy + 26}C${cx + 54} ${cy + 46} ${cx + 34} ${cy + 46} ${cx + 6} ${cy + 40}Z"/><line class="fek70-trk" x1="${cx}" x2="${cx}" y1="${cy - 56}" y2="${cy - 8}"/></g>`;
    const kan = (x, y, w, hh, hc, r, narrow) => `<rect class="fek70-kb" x="${x}" y="${y}" width="${w}" height="${hh}" rx="10"/>` + T(x + 12, y + hh * 0.38 + 3, `HCO₃⁻ ${fmt(hc, 1)} mmol/L`, 'fek70-t') + T(x + 12, y + hh * 0.62 + 3, `PaCO₂ ${fmt(r.P, 1)} kPa`, 'fek70-t') + T(x + 12, y + hh * 0.86 + 3, `pH ${fmt(r.pH, 2)}`, `fek70-t fek70-ph${r.pH < 7.35 || r.pH > 7.45 ? ' fek70-pu' : ''}`) + T(x + 12, y + 17, 'Arter kanı', 'fek70-not');
    const rec = (x, y, w, narrow) => `<rect class="fek70-rk" x="${x}" y="${y}" width="${w}" height="${narrow ? 50 : 50}" rx="8"/>` + (narrow ? T(x + w / 2, y + 20, 'Medulla kemoreseptörleri', 'fek70-t', 'text-anchor="middle"') + T(x + w / 2, y + 38, 'beyin ECF pH’ı', 'fek70-t', 'text-anchor="middle"') : T(x + w / 2, y + 21, 'Medulla kemoreseptörleri', 'fek70-t', 'text-anchor="middle"') + T(x + w / 2, y + 39, 'beyin ECF pH’ı', 'fek70-t', 'text-anchor="middle"')) + `<rect class="fek70-rk" x="${x}" y="${y + 60}" width="${w}" height="32" rx="8"/>` + T(x + w / 2, y + 81, 'Karotis cisimciği', 'fek70-t', 'text-anchor="middle"');
    const terazi = (cx, cy, r, hc) => {
      const a = clamp(40 * (Math.log10(hc / (0.23 * r.P)) - Math.log10(20)), -20, 20), L = 40;
      return `<path class="fek70-tz" d="M${cx} ${cy}V${cy + 70}M${cx - 24} ${cy + 70}H${cx + 24}"/><g transform="rotate(${-a} ${cx} ${cy})"><line class="fek70-tzb" x1="${cx - L}" x2="${cx + L}" y1="${cy}" y2="${cy}"/><line class="fek70-tz" x1="${cx - L}" x2="${cx - L}" y1="${cy}" y2="${cy + 18}"/><line class="fek70-tz" x1="${cx + L}" x2="${cx + L}" y1="${cy}" y2="${cy + 18}"/><circle class="fek70-w-h" cx="${cx - L}" cy="${cy + 26}" r="9"/><circle class="fek70-w-p" cx="${cx + L}" cy="${cy + 26}" r="9"/></g>` + T(cx - L, cy + 54, 'HCO₃⁻', 'fek70-tk', 'text-anchor="middle"') + T(cx + L, cy + 54, 'PaCO₂', 'fek70-tk', 'text-anchor="middle"') + T(cx, cy + 92, 'Oran: ' + fmt(hc / (0.23 * r.P), 1), 'fek70-t2', 'text-anchor="middle"');
    };
    const phBar = (x, y, w, r0, r1, k) => {
      const xs = (v) => x + ((v - 6.9) / 0.8) * w, c = (v) => clamp(v, 6.9, 7.7);
      let s = `<rect class="fek70-pb" x="${x}" y="${y}" width="${w}" height="12" rx="6"/><rect class="fek70-pn" x="${xs(7.35)}" y="${y}" width="${xs(7.45) - xs(7.35)}" height="12"/><line class="fek70-pc" x1="${xs(7.4)}" x2="${xs(7.4)}" y1="${y - 3}" y2="${y + 15}"/>`;
      s += T(xs(7.4), y + 28, '7,35–7,45', 'fek70-tk', 'text-anchor="middle"') + T(x, y + 28, '6,9', 'fek70-tk') + T(x + w, y + 28, '7,7', 'fek70-tk', 'text-anchor="end"');
      const e = (v) => (xs(c(v)) > x + w - 110 ? 'end' : 'start');
      if (k && Math.abs(r1.pH - r0.pH) > 0.01) s += `<line class="fek70-pa" x1="${xs(c(r0.pH))}" x2="${xs(c(r1.pH))}" y1="${y + 6}" y2="${y + 6}"/>`;
      s += `<circle class="fek70-m0" cx="${xs(c(r0.pH))}" cy="${y + 6}" r="7"/>` + T(xs(c(r0.pH)) + (e(r0.pH) === 'end' ? -10 : 10), y - 6, 'Kompansasyonsuz ' + fmt(r0.pH, 2), 'fek70-tk', `text-anchor="${e(r0.pH)}"`);
      if (k) { s += `<circle class="fek70-m1" cx="${xs(c(r1.pH))}" cy="${y + 6}" r="7"/>` + T(xs(c(r1.pH)), y + 46, 'Kompanse ' + fmt(r1.pH, 2) + (Math.abs(r1.pH - 7.4) > 0.015 ? ' · tam değil' : ''), 'fek70-tk fek70-kmp', 'text-anchor="middle"'); }
      return s;
    };
    const ok = (x1, y1, x2, y2, t, tx, ty) => `<path class="fek70-yk" d="M${x1} ${y1}L${x2} ${y2}" marker-end="url(#fek70-m)"/>` + (t ? T(tx, ty, t, 'fek70-tk', 'text-anchor="middle"') : '');
    const mrk = '<defs><marker id="fek70-m" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8Z" class="fek70-mk"/></marker></defs>';
    function ciz() {
      const n = dar(el), r1 = coz(h, komp), r0 = coz(h, false), cu = h < 22 ? 'CO₂ atılımı ↑' : h > 26 ? 'CO₂ atılımı ↓' : 'CO₂ atılımı';
      const cuS = komp ? cu : 'CO₂ atılımı (değişmez)', vt = `Ventilasyon × ${fmt(r1.V, 1)}`;
      const lbl = 'Metabolik bozuklukta pH’ı algılayan kemoreseptörler solunumu değiştirir; akciğer CO₂ atılımıyla PaCO₂ ve pH değişir';
      if (!n) {
        gv.innerHTML = svgA('0 0 760 340', lbl) + mrk + kan(20, 120, 180, 120, h, r1) + rec(250, 40, 180, false) + terazi(690, 70, r1, h)
          + ok(130, 116, 250, 90, '', 0, 0) + T(150, 90, 'pH / [H⁺]', 'fek70-tk', 'text-anchor="middle"') + ok(432, 86, 495, 128, '', 0, 0) + T(485, 98, 'dürtü', 'fek70-tk', 'text-anchor="start"')
          + lung(545, 180) + T(545, 252, vt, 'fek70-t fek70-vt', 'text-anchor="middle"') + `<path class="fek70-yk" d="M545 262C500 284 160 286 110 246" marker-end="url(#fek70-m)"/>` + T(330, 266, cuS, 'fek70-tk', 'text-anchor="middle"')
          + phBar(60, 304, 640, r0, r1, komp) + '</svg>';
      } else {
        gv.innerHTML = svgA('0 0 360 165', 'Kan değerleri ve oran terazisi') + kan(10, 16, 190, 128, h, r1) + terazi(280, 44, r1, h) + '</svg>'
          + svgA('0 0 360 190', lbl) + mrk + rec(10, 10, 190, true) + ok(205, 40, 240, 40, '', 0, 0) + T(232, 24, 'dürtü', 'fek70-tk', 'text-anchor="middle"') + lung(290, 80) + T(290, 150, vt, 'fek70-t fek70-vt', 'text-anchor="middle"') + T(105, 118, 'kandaki pH / [H⁺] algılanır', 'fek70-tk', 'text-anchor="middle"') + T(105, 166, cuS, 'fek70-tk', 'text-anchor="middle"') + '</svg>'
          + svgA('0 0 360 80', 'pH ölçeği') + phBar(14, 22, 332, r0, r1, komp) + '</svg>';
      }
      el.querySelector('[data-o=h]').textContent = fmt(h, 1) + ' mmol/L';
      rng.setAttribute('aria-valuetext', `bikarbonat ${fmt(h, 1)} mmol/L`);
      kapAc(el, !komp ? 'Kompansasyon yok: PaCO₂ 5,3 kPa’da sabit, pH yalnız bikarbonata göre değişir. Solunumu açın: pH’taki her 0,1 birimlik değişim ventilasyonu yaklaşık iki kat değiştirir. [[K2 s. 257]]'
        : h < 22 ? 'Metabolik asidoz: düşük bikarbonat ve artan [H⁺], medulla ve karotis kemoreseptörleri üzerinden hiperventilasyon yapar; PaCO₂ düşer ve oran normale yaklaşır, ama pH 7,4’e tam dönmez. [[K2 s. 257]]'
        : h > 26 ? 'Metabolik alkaloz: artan bikarbonatla solunum dürtüsü azalır ve PaCO₂ yükselir. Yanıt sınırlıdır, çünkü ventilasyon PAO₂’yi korumak için sürmelidir. [[K2 s. 257]] [[K1 s. 333]]'
        : 'Normal bikarbonat: oran ve pH normal, ventilasyon değişmez. Solunum yanıtı hızlıdır; böylece plazma [H⁺] düzeyinde büyük akut değişiklikler önlenir. [[K2 s. 257]]');
    }
    const nefes = () => { const g = el.querySelector('.fek70-akc'); if (!g) return; const V = komp ? coz(h, true).V : 1, A = 0.08 * Math.sqrt(V), f = RM ? 1 : 0.5 - 0.5 * Math.cos(faz), s = 1 + A * f, cx = g.dataset.cx, cy = g.dataset.cy; g.setAttribute('transform', `translate(${cx} ${cy}) scale(${s.toFixed(3)} ${(1 + A * 0.8 * f).toFixed(3)}) translate(${-cx} ${-cy})`); };
    const hedefAl = (v) => { hedef = clamp(v, 8, 40); if (RM) { h = hedef; } ciz(); nefes(); basSec(el, 'q', hedef); };
    rng.addEventListener('input', () => { hedefAl(+rng.value); });
    el.querySelectorAll('[data-q]').forEach((b) => b.addEventListener('click', () => { rng.value = b.dataset.q; hedefAl(+b.dataset.q); }));
    el.querySelectorAll('[data-k]').forEach((b) => b.addEventListener('click', () => { komp = b.dataset.k === '1'; basSec(el, 'k', komp ? 1 : 0); ciz(); nefes(); }));
    ciz(); nefes();
    const stop = ticker(el, (dt) => {
      let de = false;
      if (Math.abs(hedef - h) > 0.01) { const d = (32 / 1.2) * dt; h = Math.abs(hedef - h) <= d ? hedef : h + Math.sign(hedef - h) * d; de = true; }
      if (de) ciz();
      if (!RM) { const V = komp ? coz(h, true).V : 1; faz += (dt * 2 * Math.PI * Math.sqrt(V)) / 4; }
      nefes();
    });
    const sr = ro(el, () => { ciz(); nefes(); });
    return () => { stop(); sr(); };
  };
})();
