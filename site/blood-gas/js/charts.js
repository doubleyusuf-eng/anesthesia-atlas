'use strict';
/* Kan Gazı Atlası · özgün SVG grafikler
   Makale şekli kopyalanmaz; her çizim motorun hesapladığı sayılardan üretilir. Renk tek başına bilgi taşımaz: her işaretin etiketi vardır. */
const KGC = (() => {
  const f = (v, d = 1) => KGI.num(v, d);
  const svg = (w, h, body, label) => `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${KGI.esc(label)}">${body}</svg>`;
  const T = (x, y, s, cls = 'lbl', anchor = 'middle') => `<text class="${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}">${KGI.esc(s)}</text>`;

  /* pH–PCO2 haritası: eğriler eşit HCO3 çizgileri (Henderson–Hasselbalch); dikey bant erişkin arteriyel pH referansı [2] */
  function map(points, opt = {}) {
    const W = 560, H = 360, L = 52, R = 18, Tp = 18, B = 44;
    const x0 = 6.9, x1 = 7.7, y0 = 10, y1 = 100;
    const X = v => L + (v - x0) / (x1 - x0) * (W - L - R), Y = v => H - B - (v - y0) / (y1 - y0) * (H - Tp - B);
    let b = '';
    if (opt.ref !== false) b += `<rect class="ref" x="${X(7.35)}" y="${Tp}" width="${X(7.45) - X(7.35)}" height="${H - Tp - B}"/>` + T((X(7.35) + X(7.45)) / 2, Tp + 12, opt.refLabel || 'pH 7,35–7,45');
    for (let v = 7.0; v <= 7.7001; v += .1) b += `<line class="grid" x1="${X(v)}" y1="${Tp}" x2="${X(v)}" y2="${H - B}"/>` + T(X(v), H - B + 16, f(v, 1));
    for (let v = 20; v <= 100; v += 20) b += `<line class="grid" x1="${L}" y1="${Y(v)}" x2="${W - R}" y2="${Y(v)}"/>` + T(L - 6, Y(v) + 4, String(v), 'lbl', 'end');
    b += `<line class="ax" x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}"/><line class="ax" x1="${L}" y1="${Tp}" x2="${L}" y2="${H - B}"/>`;
    b += T((L + W - R) / 2, H - 8, 'pH') + `<text class="lbl" transform="translate(14 ${(Tp + H - B) / 2}) rotate(-90)" text-anchor="middle">PCO₂ (mmHg)</text>`;
    /* Eşit HCO3 eğrileri: PCO2 = HCO3 / (0.03 · 10^(pH − 6.1)) */
    for (const h of [8, 12, 16, 20, 24, 28, 32, 40, 48]) {
      const pts = [];
      for (let ph = x0; ph <= x1 + 1e-9; ph += .01) { const p = h / (0.03 * Math.pow(10, ph - 6.1)); if (p >= y0 && p <= y1) pts.push(`${X(ph).toFixed(1)},${Y(p).toFixed(1)}`); }
      if (pts.length < 2) continue;
      b += `<polyline class="iso" points="${pts.join(' ')}"/>`;
      const [lx, ly] = pts[pts.length - 1].split(',').map(Number);
      b += `<text class="iso-l" x="${Math.min(lx + 3, W - R - 2)}" y="${ly - 3}" text-anchor="${lx > W - R - 30 ? 'end' : 'start'}">${h}</text>`;
    }
    b += T(W - R - 2, Tp + 26, 'eğri etiketi: HCO₃ mmol/L', 'iso-l', 'end');
    for (const p of points) {
      if (p.ph < x0 || p.ph > x1 || p.pco2 < y0 || p.pco2 > y1) { b += T(W - R - 2, H - B - 8, `${p.label || ''} harita dışında`, 'lbl', 'end'); continue; }
      b += `<circle class="${p.hollow ? 'pt2' : 'pt'}" cx="${X(p.ph)}" cy="${Y(p.pco2)}" r="${p.r || 6}"/>`;
      if (p.label) b += T(X(p.ph) + 10, Y(p.pco2) - 8, p.label, 'lbl b', 'start');
    }
    return svg(W, H, b, opt.aria || 'pH–PCO₂ haritası');
  }

  /* Sayı doğrusu: beklenen aralık bandı ve ölçülen değer */
  function range({lo, hi, center, measured, unit, title}) {
    const W = 560, H = 96, L = 20, R = 20;
    const vals = [lo, hi, measured].filter(v => v != null), mn = Math.min(...vals), mx = Math.max(...vals), pad = Math.max(4, (mx - mn) * .25);
    const a = Math.floor((mn - pad) / 2) * 2, z = Math.ceil((mx + pad) / 2) * 2;
    const X = v => L + (v - a) / (z - a) * (W - L - R), y = 52;
    let b = `<line class="ax" x1="${L}" y1="${y}" x2="${W - R}" y2="${y}"/>`;
    const step = (z - a) > 40 ? 10 : (z - a) > 16 ? 4 : 2;
    for (let v = a; v <= z; v += step) b += `<line class="ax" x1="${X(v)}" y1="${y - 4}" x2="${X(v)}" y2="${y + 4}"/>` + T(X(v), y + 20, String(v));
    b += `<rect class="band" x="${X(lo)}" y="${y - 14}" width="${Math.max(2, X(hi) - X(lo))}" height="28" rx="5"/>`;
    b += T((X(lo) + X(hi)) / 2, y - 20, `beklenen ${f(lo)}–${f(hi)}`);
    if (center != null) b += `<line class="ax" x1="${X(center)}" y1="${y - 14}" x2="${X(center)}" y2="${y + 14}" stroke-dasharray="2 2"/>`;
    b += `<circle class="pt" cx="${X(measured)}" cy="${y}" r="7"/>` + T(X(measured), y + 36, `ölçülen ${f(measured)} ${unit}`, 'lbl b');
    return svg(W, H + 6, b, title || 'Beklenen aralık ve ölçülen değer');
  }

  /* Akut ve kronik nokta tahminleri ile ölçülen HCO3 */
  function points({acute, chronic, measured, unit}) {
    const W = 560, H = 100, L = 20, R = 20;
    const vals = [acute, chronic, measured], mn = Math.min(...vals), mx = Math.max(...vals), pad = Math.max(3, (mx - mn) * .3);
    const a = Math.floor(mn - pad), z = Math.ceil(mx + pad);
    const X = v => L + (v - a) / (z - a) * (W - L - R), y = 50;
    let b = `<line class="ax" x1="${L}" y1="${y}" x2="${W - R}" y2="${y}"/>`;
    const step = (z - a) > 24 ? 4 : 2;
    for (let v = a + ((a % step) + step) % step; v <= z; v += step) b += `<line class="ax" x1="${X(v)}" y1="${y - 4}" x2="${X(v)}" y2="${y + 4}"/>` + T(X(v), y + 20, String(v));
    b += `<rect class="pt2" x="${X(acute) - 5}" y="${y - 5}" width="10" height="10" transform="rotate(45 ${X(acute)} ${y})"/>` + T(X(acute), y - 14, `akut ${f(acute, 2)}`);
    b += `<rect class="pt2" x="${X(chronic) - 5}" y="${y - 5}" width="10" height="10"/>` + T(X(chronic), y - 28, `kronik ${f(chronic, 2)}`);
    b += `<circle class="pt" cx="${X(measured)}" cy="${y}" r="7"/>` + T(X(measured), y + 38, `ölçülen ${f(measured, 1)} ${unit}`, 'lbl b');
    return svg(W, H + 6, b, 'Akut ve kronik model tahmini ile ölçülen HCO₃');
  }

  /* Ölçülen ve albüminle düzeltilmiş AG */
  function ag({measured, corrected, ref, interval}) {
    const W = 560, H = 150, L = 130, R = 30;
    const vals = [measured, corrected, ref, interval && interval[1], 0].filter(v => v != null);
    const mn = Math.min(...vals, 0), mx = Math.max(...vals) * 1.15 + 2;
    const X = v => L + (v - mn) / (mx - mn) * (W - L - R);
    let b = '';
    if (interval) b += `<rect class="ref" x="${X(interval[0])}" y="14" width="${X(interval[1]) - X(interval[0])}" height="${H - 46}"/>` + T((X(interval[0]) + X(interval[1])) / 2, H - 18, `yerel referans ${f(interval[0], 0)}–${f(interval[1], 0)}`);
    const bar = (v, y, cls, label) => `<rect class="${cls}" x="${Math.min(X(0), X(v))}" y="${y}" width="${Math.abs(X(v) - X(0))}" height="26" rx="4"/>` + T(L - 10, y + 17, label, 'lbl', 'end') + T(X(v) + (v >= 0 ? 6 : -6), y + 17, f(v, 1), 'lbl b', v >= 0 ? 'start' : 'end');
    b += bar(measured, 26, 'cbar2', 'ölçülen AG');
    if (corrected != null) b += bar(corrected, 66, 'cbar', 'düzeltilmiş AG');
    b += `<line class="ax" x1="${X(0)}" y1="14" x2="${X(0)}" y2="${H - 34}"/>`;
    if (ref != null) b += `<line class="ax" x1="${X(ref)}" y1="14" x2="${X(ref)}" y2="${H - 34}" stroke-dasharray="4 3"/>` + T(X(ref), 10, `referans değer ${f(ref, 0)}`);
    return svg(W, H, b, 'Ölçülen ve albüminle düzeltilmiş anyon açıklığı');
  }

  /* Laktat zaman çizgisi (sıra numarası ekseninde; zamanlar etiket) */
  function lactate(series) {
    const W = 560, H = 170, L = 44, R = 20, Tp = 16, B = 40;
    const mx = Math.max(...series.map(s => s.v)) * 1.2 || 1;
    const X = i => L + (series.length === 1 ? .5 : i / (series.length - 1)) * (W - L - R), Y = v => H - B - v / mx * (H - Tp - B);
    let b = `<line class="ax" x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}"/><line class="ax" x1="${L}" y1="${Tp}" x2="${L}" y2="${H - B}"/>`;
    b += `<text class="lbl" transform="translate(12 ${(Tp + H - B) / 2}) rotate(-90)" text-anchor="middle">mmol/L</text>`;
    b += `<polyline class="line" points="${series.map((s, i) => `${X(i)},${Y(s.v)}`).join(' ')}"/>`;
    series.forEach((s, i) => { b += `<circle class="pt" cx="${X(i)}" cy="${Y(s.v)}" r="6"/>` + T(X(i), Y(s.v) - 12, f(s.v, 1), 'lbl b') + T(X(i), H - B + 18, s.time || `#${i + 1}`); });
    return svg(W, H, b, 'Laktat zaman çizgisi');
  }
  /* Seri grafik: tek parametre paneli. x = zaman (yoksa giriş sırası); işaret şekli örnek türü; dikey kesikli çizgi olaylar.
     Noktalar arası çizgi yalnız görsel birleştirmedir; ara nokta ölçüm değildir. Örnek türü değişince çizgi kesilir. */
  function serialPanel({title, unit, pts, events, xMin, xMax, timeAxis}) {
    const W = 540, H = 150, L = 46, R = 16, Tp = 22, B = 30;
    const vals = pts.filter(p => p.v != null).map(p => p.v); if (!vals.length) return '';
    let mn = Math.min(...vals), mx = Math.max(...vals); if (mn === mx) { mn -= Math.abs(mn) * .05 || 1; mx += Math.abs(mx) * .05 || 1; }
    const pad = (mx - mn) * .15; mn -= pad; mx += pad;
    const X = x => L + (xMax === xMin ? .5 : (x - xMin) / (xMax - xMin)) * (W - L - R), Y = v => H - B - (v - mn) / (mx - mn) * (H - Tp - B);
    let b = `<line class="ax" x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}"/><line class="ax" x1="${L}" y1="${Tp}" x2="${L}" y2="${H - B}"/>`;
    b += T(L, 13, `${title}${unit ? ' (' + unit + ')' : ''}`, 'lbl b', 'start');
    [mn + pad, mx - pad].forEach(v => { b += T(L - 5, Y(v) + 4, f(v, 2), 'lbl', 'end'); });
    for (const e of events) if (e.x != null) b += `<line class="grid" x1="${X(e.x)}" y1="${Tp}" x2="${X(e.x)}" y2="${H - B}" stroke-dasharray="4 3"/>` + T(X(e.x) + 3, Tp + 9, e.label, 'iso-l', 'start');
    /* [1.5-F02] Bağlantı, karşılaştırma uygunluğundan gelir (c.link): 'none' → çizgi yok; 'dash' → kesikli çizgi + kısa etiket; 'solid' → düz çizgi.
       Grafik, tablonun "karşılaştırılamaz" dediği iki noktayı hiçbir zaman düz çizgiyle birleştirmez. */
    const seg = []; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], c = pts[i], k = c.link || 'none';
      if (a.v == null || c.v == null || k === 'none') continue;
      seg.push(`<line class="line" data-link="${k}" x1="${X(a.x)}" y1="${Y(a.v)}" x2="${X(c.x)}" y2="${Y(c.v)}" stroke-dasharray="${k === 'dash' ? '5 4' : '0'}"/>`);
      if (k === 'dash' && c.linkLabel) seg.push(T((X(a.x) + X(c.x)) / 2, (Y(a.v) + Y(c.v)) / 2 - 6, c.linkLabel, 'iso-l')); }
    b += seg.join('');
    const mark = (p) => { const x = X(p.x), y = Y(p.v), cls = p.flag ? 'pt2' : 'pt';
      if (p.sample === 'arterial') return `<circle class="${cls}" cx="${x}" cy="${y}" r="6"/>`;
      if (p.sample === 'capillary') return `<path class="${cls}" d="M${x} ${y - 7} L${x + 7} ${y + 6} L${x - 7} ${y + 6} Z"/>`;
      return `<rect class="${cls}" x="${x - 6}" y="${y - 6}" width="12" height="12"/>`; };
    for (const p of pts) if (p.v != null) b += mark(p) + T(X(p.x), Y(p.v) - 10, f(p.v, 2), 'lbl b') + T(X(p.x), H - B + 15, p.xl, 'lbl');
    return svg(W, H, b, title + ' seri grafiği');
  }
  return {map, range, points, ag, lactate, serialPanel};
})();
