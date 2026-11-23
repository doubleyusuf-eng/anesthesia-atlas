/* Fizyoloji Bölüm 63 · Mide ve kusma · bileşenler (K1 s. 283–288).
   Şekiller şematiktir; kitabın verdiği sayılar dışında oranlar temsilîdir (bileşen altındaki nota bakın). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const cl = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ez = (f) => (f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2);
  const n = (v) => Math.round(v * 10) / 10;
  let FS = 12, K = 1;
  const C = (c) => (c ? `var(--${c})` : 'none');
  const sty = (o) => `fill:${C(o.f)};stroke:${C(o.s)};stroke-width:${o.sw || 1.5}${o.d ? ';stroke-dasharray:' + o.d : ''}`;
  const ex = (o) => (o.op != null ? ` opacity="${o.op}"` : '') + (o.id ? ` data-pick="${o.id}"` : '') + (o.cur ? ' style="cursor:pointer"' : '');
  const rc = (x, y, w, h, o = {}) => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${o.rx == null ? 6 : o.rx}" style="${sty(o)}"${ex(o)}/>`;
  const ci = (x, y, r, o = {}) => `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" style="${sty(o)}"${ex(o)}/>`;
  const el2 = (cx, cy, rx, ry, o = {}) => `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" style="${sty(o)}"${ex(o)}${o.rot ? ` transform="rotate(${o.rot} ${n(cx)} ${n(cy)})"` : ''}/>`;
  const pa = (d, o = {}) => `<path d="${d}" style="${sty(o)}"${ex(o)}/>`;
  const pg = (pts, o = {}) => `<polygon points="${pts.map((p) => n(p[0]) + ',' + n(p[1])).join(' ')}" style="${sty(o)}"${ex(o)}/>`;
  const ln = (x1, y1, x2, y2, o = {}) => `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" style="${sty({ s: o.s || 'ink', sw: o.sw || 1.5, d: o.d })}"${ex(o)}/>`;
  const tx = (x, y, s, o = {}) => {
    const L = String(s).split('|'), fs = (o.fs || FS) * K;
    const y0 = o.vc ? y + fs * 0.35 - (L.length - 1) * fs * 0.575 : y;
    return `<text x="${n(x)}" y="${n(y0)}" font-size="${fs}" text-anchor="${o.a || 'middle'}" style="fill:${C(o.c || 'ink')}${o.b ? ';font-weight:700' : ''};pointer-events:${o.id ? 'auto' : 'none'}"${ex(o)}>` +
      L.map((l, i) => (i ? `<tspan x="${n(x)}" dy="${n(fs * 1.15)}">${l}</tspan>` : l)).join('') + '</text>';
  };
  // oklu çizgi: pts [[x,y]…]; o.inh → uçta çubuk (⊣)
  const poly = (pts, c, o = {}) => {
    const d = 'M' + pts.map((p) => n(p[0]) + ' ' + n(p[1])).join('L');
    const a = pts[pts.length - 2], b = pts[pts.length - 1];
    const g = Math.atan2(b[1] - a[1], b[0] - a[0]), ca = Math.cos(g), sa = Math.sin(g);
    const head = o.inh
      ? `<path d="M${n(b[0] - 5.5 * sa)} ${n(b[1] + 5.5 * ca)}L${n(b[0] + 5.5 * sa)} ${n(b[1] - 5.5 * ca)}" style="stroke:${C(c)};stroke-width:3.2;fill:none"/>`
      : `<path d="M${n(b[0])} ${n(b[1])}L${n(b[0] - 9 * ca + 4.5 * sa)} ${n(b[1] - 9 * sa - 4.5 * ca)}L${n(b[0] - 9 * ca - 4.5 * sa)} ${n(b[1] - 9 * sa + 4.5 * ca)}Z" style="fill:${C(c)};stroke:none"/>`;
    return `<g${o.op != null ? ` opacity="${o.op}"` : ''}><path d="${d}" style="fill:none;stroke:${C(c)};stroke-width:${o.w || 1.8}${o.d ? ';stroke-dasharray:' + o.d : ''}"/>${head}</g>`;
  };
  const along = (pts, f) => {
    const seg = []; let L = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); L += l; }
    let d = cl(f, 0, 1) * L;
    for (let i = 0; i < seg.length; i++) {
      if (d <= seg[i] || i === seg.length - 1) { const g = seg[i] ? d / seg[i] : 0; return [lerp(pts[i][0], pts[i + 1][0], g), lerp(pts[i][1], pts[i + 1][1], g)]; }
      d -= seg[i];
    }
    return pts[0];
  };
  // k nokta yol boyunca akar (RM: durağan)
  const dots = (pts, t, k, c, o = {}) => Array.from({ length: Math.max(0, k) }, (_, i) => {
    const f = o.f != null ? cl(o.f - i * 0.04, 0, 1) : (t * (o.sp || 0.45) + i / k) % 1;
    const p = along(pts, f);
    return `<circle cx="${n(p[0])}" cy="${n(p[1])}" r="${o.r || 3.4}" style="fill:${C(c)};stroke:${C('paper')};stroke-width:.6"/>`;
  }).join('');
  const svgW = (w, h, label, inner, max) => `<svg class="f63-svg" viewBox="0 0 ${n(w)} ${n(h)}" role="img" aria-label="${label}"${max ? ` style="max-width:${max}px"` : ''}>${inner}</svg>`;
  // boyuna (u) ve enine (v) eksenli çizim: geniş modda x=u, y=v; dar modda eksenler döner ve cross eksen 360'a sığar
  function mapper(U, V, nar) {
    const s = nar ? 360 / V : 1;
    const m = { nar, w: nar ? 360 : U, h: nar ? U * s : V, s };
    m.X = (u, v) => (nar ? v * s : u); m.Y = (u, v) => (nar ? u * s : v);
    m.P = (u, v) => [m.X(u, v), m.Y(u, v)];
    m.pts = (a) => a.map((p) => m.P(p[0], p[1]));
    m.R = (u0, v0, u1, v1, o) => { const xa = m.X(u0, v0), xb = m.X(u1, v1), ya = m.Y(u0, v0), yb = m.Y(u1, v1); return rc(Math.min(xa, xb), Math.min(ya, yb), Math.abs(xb - xa), Math.abs(yb - ya), o); };
    m.C = (u, v, r, o) => ci(m.X(u, v), m.Y(u, v), r, o);
    // metin: geniş modda (aw) hizası, dar modda hep orta; dar modda isteğe bağlı başka konum nu/nv
    m.T = (u, v, s2, o = {}) => {
      const q = nar && o.nu != null ? [o.nu, o.nv != null ? o.nv : v] : [u, v];
      return tx(m.X(q[0], q[1]), m.Y(q[0], q[1]), s2, { ...o, vc: true, a: nar ? 'middle' : o.aw || 'middle' });
    };
    return m;
  }
  const segH = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const tgH = (key, l, on) => `<button type="button" class="btn ghost f63-tg" data-tg="${key}" aria-pressed="${String(!!on)}">${l}</button>`;
  const setCap = (el, html) => { const v = el.closest('.viz'); const c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(html); };
  const getCap = (el) => { const v = el.closest('.viz'); const c = v && v.querySelector('.viz-cap'); return c ? c.innerHTML : ''; };
  const setCapRaw = (el, html) => { const v = el.closest('.viz'); const c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = html; };
  function izle(el, cb) {
    let nar = el.clientWidth < 560;
    const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(() => { const x = el.clientWidth < 560; if (x !== nar) { nar = x; cb(); } }) : null;
    if (ro) ro.observe(el);
    return { get nar() { return nar; }, stop() { if (ro) ro.disconnect(); } };
  }
  const barH = (ad, id, deger, renk) => `<div class="f63-bar"><span class="f63-bar-t">${ad}</span><span class="f63-bar-trk"><i data-b="${id}" style="width:${deger}%;background:${C(renk || 'accent')}"></i></span><span class="f63-bar-v" data-bv="${id}"></span></div>`;
  const setBar = (el, id, v, txt) => { const b = el.querySelector(`[data-b="${id}"]`); if (b) b.style.width = cl(v, 0, 100) + '%'; const t = el.querySelector(`[data-bv="${id}"]`); if (t) t.textContent = txt || ''; };
  const niteller = (v) => (v < 25 ? 'düşük' : v < 55 ? 'orta' : v < 80 ? 'yüksek' : 'çok yüksek');
  const sade = (nar) => { FS = 12; K = nar ? 1.12 : 1.05; };

  /* ================= 1 · Mide bezi ================= */
  VIZ.f63_bez = (el) => {
    const HC = {
      par: { ad: 'Pariyetal hücre', salgi: 'HCl, intrinsik faktör (IF)', uy: 'histamin (H2), vagus (ACh), gastrin',
        cap: '<b>Pariyetal hücre.</b> HCl ve intrinsik faktör salgılar. Uyaranları histamin (H2), vagus (ACh) ve gastrindir. Bir hücreye dokunun ya da "Geri bildirim"e basın. [[K1 s. 283]]' },
      ecl: { ad: 'ECL hücresi', salgi: 'histamin', uy: 'gastrin, vagus',
        cap: '<b>ECL hücresi.</b> Enterokromafin benzeri hücre; gastrin ve vagus uyarısıyla histamin salar. Histamin pariyetal hücrenin en önemli uyaranıdır. [[K1 s. 283–284]]' },
      esas: { ad: 'Esas hücre', salgi: 'pepsinojen', uy: 'gastrin, vagus',
        cap: '<b>Esas hücre.</b> Pepsinojen salgılar; asitte pepsine döner, pepsin protein yıkımını başlatan peptidazdır. Uyaranları gastrin ve vagustur. [[K1 s. 283]]' },
      g: { ad: 'G hücresi', salgi: 'gastrin', uy: 'vagus, gerilme, kısmen sindirilmiş protein',
        cap: '<b>G hücresi.</b> Peptit hormon gastrini salar. Uyaranları vagus, midenin gerilmesi ve kısmen sindirilmiş proteindir. Gastrin HCl\'yi, pepsinojeni ve motiliteyi artırır. [[K1 s. 283]]' },
      d: { ad: 'δ hücresi', salgi: 'somatostatin', uy: 'yüksek asit',
        cap: '<b>δ hücresi.</b> Asit yükselince somatostatin salar; somatostatin G hücresinden gastrin salınımını baskılar ve pariyetal hücrenin inhibitör reseptörüne bağlanır. [[K1 s. 283–284]]' },
      muk: { ad: 'Mukus hücresi', salgi: 'HCO₃⁻\'ten zengin mukus', uy: '—',
        cap: '<b>Mukus hücresi.</b> HCO₃⁻\'ten zengin mukus salgılar: mukozayı lümendeki asitten korur, duvarı kayganlaştırıp güçlü peristaltizmin sürtünmesinden korur. [[K1 s. 284]]' },
    };
    const FB = [
      '<b>Gastrin.</b> G hücresi gastrini kana verir; gastrin pariyetal hücreyi doğrudan, ECL hücresini histamin salgılatarak uyarır. [[K1 s. 283]]',
      '<b>Asit yükselir.</b> Pariyetal hücreler HCl\'yi 150 mmol/L\'ye kadar (pH 0,8) yoğunlaştırabilir. [[K1 s. 283]]',
      '<b>Negatif geri bildirim.</b> Yüksek asit δ hücrelerinden somatostatin salgılatır; somatostatin G hücresinden gastrin salınımını baskılar. [[K1 s. 283]]',
    ];
    let sel = 'par', fb = { t: 0, run: false, done: false }, faz = 0;
    el.innerHTML = `${segH('Hücre seç', 'h', [['par', 'Pariyetal'], ['ecl', 'ECL'], ['esas', 'Esas'], ['g', 'G'], ['d', 'δ'], ['muk', 'Mukus']], sel)}
      <div class="f63-sv"></div><div class="f63-kart" aria-live="polite"></div>
      <div class="btn-row" style="margin-top:12px"><button type="button" class="btn f63-fb">Geri bildirim</button></div>`;
    const sv = el.querySelector('.f63-sv'), kart = el.querySelector('.f63-kart');
    const gA = [[214, 270], [338, 270], [338, 142], [264, 142]], gB = [[214, 270], [338, 270], [338, 168], [230, 168]];
    const hist = [[240, 148], [224, 156]], som = [[143, 289], [200, 276]];
    const draw = () => {
      sade(false); K = 1.22;
      const act = fb.run || fb.done, ph = fb.done ? 3 : fb.run ? Math.min(3, Math.floor(fb.t / 2) + 1) : 0, f = fb.run ? (fb.t % 2) / 2 : 1;
      const acid = ph < 2 ? 0 : ph === 2 ? f : 1;
      const dm = (id) => (act || sel === id ? 1 : 0.4);
      const hs = (id, base) => (!act && sel === id ? { ...base, f: 'accent-soft', s: 'accent-ink', sw: 2.4 } : base);
      let s = '';
      s += rc(10, 8, 300, 44, { f: 'crit-soft', rx: 8, op: n(0.55 + 0.45 * acid) });
      s += tx(20, 34, 'Mide lümeni', { a: 'start', c: 'crit', b: 1 });
      if (ph >= 2) s += tx(300, 34, 'asit ↑', { a: 'end', c: 'crit', b: 1 });
      s += rc(110, 52, 120, 6, { f: 'accent-soft', s: 'accent', sw: 1, rx: 3 });
      s += rc(110, 58, 120, 246, { f: 'paper', s: 'ink', rx: 8 });
      s += rc(160, 58, 20, 246, { f: 'crit-soft', rx: 0, op: n(0.5 + 0.4 * acid) });
      s += [112, 182].map((x) => rc(x, 62, 46, 38, hs('muk', { f: 'accent-soft', s: 'accent', rx: 6, op: dm('muk'), id: 'muk', cur: 1 }))).join('');
      s += [[112, 158, 135], [182, 228, 205]].map((a) => pg([[a[0], 178], [a[1], 178], [a[2], 108]], hs('par', { f: 'chip', s: 'ink', op: dm('par'), id: 'par', cur: 1 }))).join('');
      s += [112, 182].map((x) => rc(x, 192, 46, 50, hs('esas', { f: 'paper', s: 'muted', rx: 6, op: dm('esas'), id: 'esas', cur: 1 })) + [[8, 12], [20, 30], [34, 14], [30, 40], [12, 38]].map((p) => ci(x + p[0] + 2, 192 + p[1] + 4, 2.4, { f: 'muted', op: dm('esas') })).join('')).join('');
      s += ci(250, 142, 10, hs('ecl', { f: 'chip', s: 'c-basic', op: dm('ecl'), id: 'ecl', cur: 1 })) + tx(250, 142, 'E', { vc: 1, fs: 11, c: 'c-basic', b: 1, op: dm('ecl') });
      s += ci(214, 270, 13, hs('g', { f: 'chip', s: 'c-basic', op: dm('g'), id: 'g', cur: 1 })) + tx(214, 270, 'G', { vc: 1, c: 'c-basic', b: 1, op: dm('g') });
      const dg = ph === 3 ? { f: 'warn-soft', s: 'warn', sw: 3 } : { f: 'chip', s: 'c-basic' };
      s += ci(132, 289, 11, hs('d', { ...dg, op: dm('d'), id: 'd', cur: 1 })) + tx(132, 289, 'δ', { vc: 1, c: 'c-basic', b: 1, op: dm('d') });
      s += ln(330, 76, 330, 326, { s: 'muted' }) + ln(346, 76, 346, 326, { s: 'muted' }) + tx(338, 66, 'Kan', { c: 'muted', b: 1 });
      // etiketler (dokununca seçer)
      const lb = (x, y, t, id, a) => tx(x, y, t, { a, c: sel === id && !act ? 'accent-ink' : 'ink', b: sel === id && !act, id, op: dm(id), vc: 1 });
      s += lb(104, 82, 'Mukus', 'muk', 'end') + lb(104, 146, 'Pariyetal', 'par', 'end') + lb(104, 218, 'Esas', 'esas', 'end') + lb(104, 289, 'δ', 'd', 'end');
      s += lb(262, 160, 'ECL', 'ecl', 'start') + lb(236, 270, 'G', 'g', 'start');
      if (act) {
        const fin = fb.done;
        if (ph === 1 || fin) {
          if (!fin) s += dots(gA, fb.t, 4, 'c-basic', { sp: 0.5 }) + dots(gB, fb.t, 4, 'c-basic', { sp: 0.5 }) + dots(hist, fb.t, 2, 'c-basic', { sp: 0.9, r: 2.8 });
          s += tx(276, 262, 'gastrin', { c: 'c-basic', b: 1 }) + tx(264, 124, 'histamin', { c: 'c-basic', b: 1 });
        }
        if (fin || ph >= 1) { s += poly(gA, 'c-basic', { d: '5 4', op: fin ? 0.85 : 0.45 }) + poly(gB, 'c-basic', { d: '5 4', op: fin ? 0.85 : 0.45 }) + poly(hist, 'c-basic', { w: 1.8, op: fin ? 0.9 : 0.5 }); }
        if (ph >= 2 && !fin) {
          const k = Math.floor((ph === 2 ? f : 1) * 14);
          s += Array.from({ length: k }, (_, i) => ci(24 + ((i * 53) % 270), 18 + ((i * 29) % 30), 3, { f: 'crit', s: 'paper', sw: 0.6 })).join('');
          s += [[135, 146], [205, 146]].map((p, i) => dots([[p[0], p[1] - 20], [170, 80], [170, 54]], fb.t, ph === 2 ? 2 : 1, 'crit', { sp: 0.6, r: 3 })).join('');
        }
        if (ph === 3 || fin) {
          if (!fin) s += dots(som, fb.t, 3, 'warn', { sp: 0.8 });
          s += poly(som, 'warn', { inh: 1, w: 2.2, op: fin ? 0.95 : 0.8 }) + tx(152, 316, 'somatostatin', { c: 'warn', b: 1 });
        }
      }
      sv.innerHTML = svgW(400, 336, 'Mide bezinin kesiti: mukus, pariyetal, ECL, esas, G ve δ hücreleri; gastrinin negatif geri bildirimi', s, 520);
    };
    const kartYaz = () => {
      const h = HC[sel];
      kart.innerHTML = `<div class="f63-kart-ad">${h.ad}</div><div><b>Salgı:</b> ${h.salgi}</div>${h.uy !== '—' ? `<div><b>Uyaran:</b> ${h.uy}</div>` : ''}<div class="f63-kart-n">Toplam mide sıvısı ≈ 2 L/gün ${REF('[[K1 s. 283]]')}</div>`;
    };
    const pick = (id) => { if (!HC[id]) return; sel = id; fb = { t: 0, run: false, done: false }; faz = 0; basSec(el, 'h', id); setCap(el, HC[id].cap); kartYaz(); draw(); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-h]'); if (b) return pick(b.dataset.h);
      const p = e.target.closest('[data-pick]'); if (p) return pick(p.dataset.pick);
      if (e.target.closest('.f63-fb')) {
        faz = 1; setCap(el, FB[0]);
        if (RM) { fb = { t: 6, run: false, done: true }; faz = 3; setCap(el, FB[2]); } else fb = { t: 0, run: true, done: false };
        basSec(el, 'h', ''); draw();
      }
    });
    kartYaz(); draw();
    const stop = ticker(el, (dt) => {
      if (!fb.run) return;
      fb.t += dt;
      if (fb.t >= 6) { fb = { t: 6, run: false, done: true }; faz = 3; setCap(el, FB[2]); draw(); return; }
      const p = Math.floor(fb.t / 2) + 1; if (p !== faz) { faz = p; setCap(el, FB[p - 1]); }
      draw();
    });
    return () => stop();
  };

  /* ================= 2 · B12 yolculuğu ================= */
  VIZ.f63_b12 = (el) => {
    const CAP = [
      null,
      '<b>2 · Duodenum.</b> Tripsin haptokorrini sindirir ve B12 yeniden serbest kalır; IF tripsine dirençlidir. [[K1 s. 283]]',
      '<b>3 · IF bağlar.</b> Duodenumun daha yüksek pH\'ında IF, B12\'yi sıkıca bağlar. [[K1 s. 283]]',
      '<b>4 · Terminal ileum.</b> IF reseptörleri IF–B12 kompleksinin emilmesini sağlar. [[K1 s. 284]]',
    ];
    const CAPP = [
      '<b>Pernisiyöz anemi.</b> Pariyetal hücrelerin otoimmün yıkımı IF eksikliği yapar; B12 emilemez ve megaloblastik anemi gelişir. [[K1 s. 284]]',
    ];
    const cap0 = getCap(el);
    let step = 0, cur = 0, pern = false, nar0;
    el.innerHTML = `<div class="btn-row f63-stp"><button type="button" class="btn ghost" data-st="-1" aria-label="Önceki adım">Geri</button><span class="f63-sn" aria-live="polite">1 / 4</span><button type="button" class="btn" data-st="1" aria-label="Sonraki adım">İleri</button>
      <button type="button" class="btn ghost f63-tg" data-pern aria-pressed="false">Pernisiyöz anemi</button></div>
      <div class="f63-sv"></div><div class="legend"><span><i style="background:var(--c-clin)"></i>B12</span><span><i style="background:var(--muted)"></i>H = haptokorrin</span><span><i style="background:var(--c-basic)"></i>IF = intrinsik faktör</span></div>`;
    const sv = el.querySelector('.f63-sv'), sn = el.querySelector('.f63-sn');
    const w = izle(el, () => draw());
    const geo = (nar) => nar
      ? { w: 360, h: 470, c: [[180, 85], [180, 225], [180, 360]], box: [[20, 28, 320, 120], [20, 168, 320, 120], [20, 308, 250, 120]], kan: [284, 308, 56, 120], notch: [270, 368], ifp: [246, 368], kp: [312, 368], pas: [190, 400], hd: [[30, 44], [30, 184], [30, 324]] }
      : { w: 560, h: 270, c: [[95, 120], [280, 120], [465, 120]], box: [[10, 36, 172, 170], [188, 36, 172, 170], [366, 36, 184, 170]], kan: [366, 212, 184, 30], notch: [470, 206], ifp: [470, 190], kp: [470, 227], pas: [520, 175], hd: [[16, 28], [194, 28], [372, 28]] };
    const st = (g, i, p) => { // [bx,by,ix,iy,hop,trop,shield,bind,iop,aff]
      const c = g.c[Math.min(i, 2)];
      if (i === 0) return [c[0] - 22, c[1] + 12, c[0] + 34, c[1] + 12, 1, 0, 0, 0, p ? 0 : 1, 1];
      if (i === 1) return [c[0] - 32, c[1] + 18, c[0] + 28, c[1] + 18, 0, 1, p ? 0 : 1, 0, p ? 0 : 1, 0];
      if (i === 2) return p ? [c[0] - 8, c[1] + 18, c[0] + 28, c[1] + 18, 0, 0, 0, 0, 0, 0] : [c[0] - 8, c[1] + 18, c[0] + 16, c[1] + 18, 0, 0, 0, 1, 1, 0];
      return p ? [g.pas[0], g.pas[1], c[0] + 28, c[1] + 18, 0, 0, 0, 0, 0, 0] : [g.kp[0], g.kp[1], g.ifp[0], g.ifp[1], 0, 0, 0, 0, 1, 0];
    };
    const draw = () => {
      const nar = w.nar; sade(nar); const g = geo(nar);
      const a = st(g, Math.floor(cur), pern), b = st(g, Math.min(3, Math.ceil(cur)), pern), f = ez(cur - Math.floor(cur));
      const v = a.map((x, i) => lerp(x, b[i], f));
      let s = '';
      const fl = ['crit-soft', 'accent-soft', 'chip'];
      g.box.forEach((r, i) => { s += rc(r[0], r[1], r[2], r[3], { f: fl[i], s: 'ink', sw: 1.2, rx: 12 }); });
      s += tx(g.hd[0][0], g.hd[0][1] + 4, 'Mide · pH düşük', { a: 'start', b: 1, c: 'crit' }) + tx(g.hd[1][0], g.hd[1][1] + 4, 'Duodenum · pH daha yüksek', { a: 'start', b: 1, c: 'accent-ink' }) + tx(g.hd[2][0], g.hd[2][1] + 4, 'Terminal ileum', { a: 'start', b: 1 });
      s += rc(g.kan[0], g.kan[1], g.kan[2], g.kan[3], { f: 'crit-soft', s: 'crit', sw: 1, rx: 6, op: 0.7 }) + tx(g.kan[0] + g.kan[2] / 2, g.kan[1] + g.kan[3] / 2, 'Kan', { vc: 1, b: 1, c: 'crit' });
      // ileum reseptör çentikleri
      const N = g.notch;
      [-44, 0, 44].forEach((d) => { s += nar ? rc(N[0] - 6, N[1] + d - 7, 12, 14, { f: 'paper', s: 'muted', sw: 1.2, rx: 3 }) : rc(N[0] + d - 8, N[1] - 6, 16, 12, { f: 'paper', s: 'muted', sw: 1.2, rx: 3 }); });
      s += tx(nar ? N[0] - 14 : N[0], nar ? N[1] - 60 : N[1] - 22, 'IF reseptörleri', { c: 'muted', fs: nar ? 11 : 11.5, a: nar ? 'end' : 'middle' });
      if (pern) {
        const c0 = g.c[0];
        s += pg([[c0[0] - 22, c0[1] - 30], [c0[0] + 22, c0[1] - 30], [c0[0], c0[1] - 62]], { f: 'chip', s: 'ink' }) + tx(c0[0], c0[1] - 22, 'Pariyetal hücre ✕', { c: 'crit', b: 1 });
        if (Math.ceil(cur) >= 2) s += tx(g.c[2][0], g.c[2][1] + (nar ? 52 : 70), 'B12 emilmez → megaloblastik anemi', { c: 'crit', b: 1, fs: 11 });
      }
      // tripsin
      if (v[5] > 0.02) { const c1 = g.c[1]; s += rc(c1[0] - 6, c1[1] - 40, 62, 20, { f: 'paper', s: 'ink', sw: 1, op: n(v[5]) }) + tx(c1[0] + 25, c1[1] - 30, '✂ tripsin', { vc: 1, fs: 11, op: n(v[5]) }); }
      // B12–IF bağı / düşük afinite
      if (v[8] > 0.02) {
        if (v[7] > 0.5) s += ln(v[0], v[1], v[2], v[3], { s: 'c-clin', sw: 5 });
        else if (v[9] > 0.5 || (Math.floor(cur) < 2 && !pern)) s += ln(v[0] + 8, v[1], v[2] - 14, v[3], { s: 'muted', sw: 1.2, d: '3 4', op: n(v[9] || 0.6) });
      }
      // IF
      if (v[8] > 0.02) s += rc(v[2] - 14, v[3] - 10, 28, 20, { f: 'chip', s: 'c-basic', sw: 1.6, rx: 8, op: n(v[8]) }) + tx(v[2], v[3], 'IF', { vc: 1, c: 'c-basic', b: 1, op: n(v[8]) });
      if (v[6] > 0.02 && v[8] > 0.02) s += pa(`M${n(v[2] - 18)} ${n(v[3] - 14)}Q${n(v[2])} ${n(v[3] - 28)} ${n(v[2] + 18)} ${n(v[3] - 14)}`, { s: 'ok', sw: 2.6, op: n(v[6]) }) + tx(v[2], v[3] - 32, 'tripsine dirençli', { fs: 11, c: 'ok', op: n(v[6]) });
      // haptokorrin halkası + B12
      if (v[4] > 0.02) s += ci(v[0], v[1], 14, { s: 'muted', sw: 2.4, op: n(v[4]) }) + tx(v[0] - 20, v[1] - 12, 'H', { c: 'muted', b: 1, fs: 11, op: n(v[4]) });
      s += ci(v[0], v[1], 7, { f: 'c-clin', s: 'paper', sw: 1 }) + tx(v[0], v[1] + (nar ? 23 : 24), 'B12', { c: 'c-clin', b: 1, fs: 11 });
      sv.innerHTML = svgW(g.w, g.h, 'B12\'nin mideden terminal ileuma yolculuğu: haptokorrin, intrinsik faktör ve tripsin', s, nar ? 420 : 760);
    };
    const upd = () => {
      sn.textContent = `${step + 1} / 4`;
      el.querySelector('[data-st="-1"]').disabled = step === 0; el.querySelector('[data-st="1"]').disabled = step === 3;
      if (pern && step >= 0) setCap(el, CAPP[0]); else if (step === 0) setCapRaw(el, cap0); else setCap(el, CAP[step]);
    };
    const go = (d) => { step = cl(step + d, 0, 3); if (RM) cur = step; upd(); draw(); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-st]'); if (b) return go(+b.dataset.st);
      const p = e.target.closest('[data-pern]'); if (p) { pern = !pern; p.setAttribute('aria-pressed', String(pern)); upd(); draw(); }
    });
    upd(); draw();
    const stop = ticker(el, (dt) => {
      if (RM) return; if (Math.abs(cur - step) < 0.001) { if (cur !== step) { cur = step; draw(); } return; }
      cur += Math.sign(step - cur) * Math.min(dt * 1.0, Math.abs(step - cur)); draw();
    });
    return () => { stop(); w.stop(); };
  };

  /* ================= 3 · Pariyetal hücrede HCl ================= */
  VIZ.f63_pariyetal = (el) => {
    const CAP = [
      null,
      '<b>2 · Karbonik anhidraz.</b> CO₂ su ile birleşip H₂CO₃ olur; tepkimeyi sitoplazmadaki KA katalizler. [[K1 s. 284]]',
      '<b>3 · Ayrışma.</b> H₂CO₃, H⁺ ve HCO₃⁻\'e ayrışır; iki iyon ayrı yollara gider. [[K1 s. 284]]',
      '<b>4 · Proton pompası.</b> Apikal H⁺/K⁺-ATPaz H⁺\'yı K⁺ karşılığında sekretuvar kanaliküllere aktif olarak pompalar. [[K1 s. 284]]',
      '<b>5 · Alkali dalga.</b> Bazolateral zarda HCO₃⁻ Cl⁻ karşılığında kana geçer; asit salgısı uyarıldıkça kan pH\'ı ölçülebilir ölçüde yükselir. [[K1 s. 284]]',
      '<b>6 · HCl.</b> Cl⁻ bir Cl⁻ kanalından, K⁺ elektrokimyasal gradiyentiyle bir K⁺ kanalından kanaliküle sızar. Sonuç: lümene HCl, kana NaHCO₃. [[K1 s. 285]]',
    ];
    const cap0 = getCap(el);
    const R = { hist: 1, ach: 1, gas: 1, ss: 0 };
    let step = 0, play = false, tm = 0, sc = 0, last = null;
    const rate = () => { let r = 10 + (R.hist ? 50 : 0) + (R.ach ? 20 : 0) + (R.gas ? 20 : 0); if (R.ss) r *= 0.3; return Math.round(r); };
    el.innerHTML = `<div class="btn-row f63-stp"><button type="button" class="btn f63-play" aria-pressed="false">Oynat</button>
      <button type="button" class="btn ghost" data-st="-1" aria-label="Önceki adım">Geri</button><span class="f63-sn" aria-live="polite">1 / 6</span><button type="button" class="btn ghost" data-st="1" aria-label="Sonraki adım">İleri</button></div>
      <div class="f63-sv"></div>
      <div class="btn-row f63-rcp" style="margin-top:10px">${tgH('hist', 'Histamin', 1)}${tgH('ach', 'ACh', 1)}${tgH('gas', 'Gastrin', 1)}${tgH('ss', 'Somatostatin', 0)}</div>
      ${barH('HCl salgısı (nitel)', 'rate', 100, 'crit')}
      <div class="legend"><span>M3 = ACh reseptörü</span><span>G = gastrin reseptörü</span><span>H2 = histamin reseptörü</span><span>SS = somatostatin reseptörü</span></div>`;
    const sv = el.querySelector('.f63-sv'), sn = el.querySelector('.f63-sn'), pb = el.querySelector('.f63-play');
    const w = izle(el, () => draw());
    const draw = () => {
      const nar = w.nar; sade(nar);
      const M = mapper(560, 420, nar), r = rate(), T = RM ? 0 : tm, k = Math.max(1, Math.round(1 + (r / 100) * 6));
      const st = step + 1;
      let s = '';
      s += M.R(0, 0, 106, 420, { f: 'chip', rx: 10, op: 0.7 }) + M.R(420, 36, 560, 400, { f: 'crit-soft', rx: 12, op: 0.8 });
      s += M.R(110, 36, 400, 400, { f: 'paper', s: 'ink', rx: 16 });
      s += M.T(53, 16, 'Kan', { b: 1, c: 'muted', nu: 20, nv: 210 });
      s += M.T(490, 360, 'Kanalikül → lümen', { c: 'crit', b: 1, aw: 'middle', nu: 548, nv: 210 });
      // bazolateral zar öğeleri
      const mem = (v, lab) => M.T(92, v, lab, { aw: 'end', nu: 70, fs: 11.5, c: 'ink' });
      s += M.C(110, 55, 8, { f: 'paper', s: 'muted', sw: 1.4 }) + mem(55, 'CO₂');
      s += M.C(110, 120, 11, { f: 'chip', s: 'ink' }) + M.T(110, 120, 'ATP', { fs: 8.5, c: 'muted' }) + mem(120, 'Na⁺/K⁺|ATPaz');
      s += M.C(110, 190, 11, { f: 'accent-soft', s: 'accent' }) + M.T(110, 190, '⇄', { fs: 13, c: 'accent-ink', b: 1 }) + mem(190, 'Cl⁻/HCO₃⁻|değiştirici');
      // reseptörler
      const RC = [['ach', 'M3', 250, 'Ca²⁺', 'ok'], ['gas', 'G', 290, 'Ca²⁺', 'ok'], ['hist', 'H2', 330, 'cAMP', 'ok'], ['ss', 'SS', 370, '', 'warn']];
      RC.forEach(([key, ad, v, mes, c]) => {
        const on = R[key];
        s += M.R(98, v - 10, 110, v + 10, { f: on ? c + '-soft' : 'chip', s: on ? c : 'muted', sw: on ? 2 : 1.2, rx: 3, d: on ? null : '3 3' });
        s += M.T(92, v, ad, { aw: 'end', b: 1, c: on ? c : 'muted', fs: 11.5, nu: 76 });
        if (mes) s += M.T(124, v, mes, { aw: 'start', c: on ? 'ink' : 'muted', fs: 11, nu: 122, op: on ? 1 : 0.5 });
      });
      // ECL hücresi (kan tarafı) ve histamin oku
      s += M.C(34, 392, 14, { f: 'chip', s: 'c-basic' }) + M.T(34, 392, 'ECL', { fs: 10.5, c: 'c-basic', b: 1 });
      s += (R.hist ? poly(M.pts([[50, 384], [97, 336]]), 'c-basic', { w: 1.8 }) : poly(M.pts([[50, 384], [97, 336]]), 'muted', { w: 1.2, d: '3 3', op: 0.4 }));
      // hücre içi zincir
      const ch = (u, lab, o) => M.T(u, 110, lab, { fs: 11.5, ...o });
      s += ch(150, 'CO₂ + H₂O') + M.R(205, 100, 235, 120, { f: step >= 1 ? 'accent-soft' : 'chip', s: 'accent', sw: step === 1 ? 2.6 : 1.2, rx: 5 }) + M.T(220, 110, 'KA', { fs: 11.5, b: 1, c: 'accent-ink' });
      s += ch(268, 'H₂CO₃') + ch(355, 'H⁺ + HCO₃⁻', { nu: 360 });
      [[172, 198], [240, 248], [292, 322]].forEach((a) => { s += poly(M.pts([[a[0], 110], [a[1], 110]]), 'muted', { w: 1.4 }); });
      // apikal öğeler
      const ap = (v, lab) => M.T(412, v, lab, { aw: 'start', fs: 11, nu: 424, c: 'ink' });
      s += M.R(394, 96, 406, 124, { f: st >= 4 ? 'crit-soft' : 'chip', s: 'crit', sw: st === 4 ? 2.6 : 1.5, rx: 3 }) + ap(110, 'H⁺/K⁺-ATPaz|proton pompası');
      s += M.R(394, 192, 406, 208, { f: 'paper', s: 'muted', sw: 1.4, rx: 3 }) + ap(200, 'K⁺ kanalı');
      s += M.R(394, 282, 406, 298, { f: 'paper', s: 'muted', sw: 1.4, rx: 3 }) + ap(290, 'Cl⁻ kanalı');
      if (st >= 6) s += M.T(500, 200, 'H⁺ + Cl⁻ → HCl', { c: 'crit', b: 1, fs: 12, nu: 500, nv: 330 });
      if (st >= 5) s += M.T(42, 130, '↑ pH', { c: 'accent-ink', b: 1, nu: 50, nv: 130 });
      // akışlar: [başlangıç adımı, yol, renk, çarpan]
      const cO2 = [[20, 55], [110, 55], [150, 100]];
      const hP = [[375, 118], [400, 112], [490, 112]], kin = [[480, 128], [400, 128], [378, 142]];
      const hcoP = [[355, 124], [355, 182], [112, 182], [20, 182]];
      const clP = [[20, 198], [112, 198], [200, 198], [200, 290], [400, 290], [490, 290]];
      const kout = [[330, 200], [400, 200], [490, 200]];
      const fl = (a, pts, c, kk, rr) => { if (st < a) return ''; return dots(M.pts(pts), T + a, kk, c, { sp: 0.38, r: rr || 3.3, f: RM ? 0.5 : null }); };
      s += fl(1, cO2, 'muted', 3, 3.2) + fl(3, hP, 'crit', k) + fl(4, kin, 'muted', 2) + fl(3, hcoP, 'accent', Math.max(2, Math.round(k * 0.6))) + fl(5, clP, 'muted', 3) + fl(6, kout, 'muted', 2);
      if (st >= 3) s += dots(M.pts([[372, 118], [400, 112], [480, 112]]), T, k, 'crit', { sp: 0.4, f: RM ? 0.6 : null });
      sv.innerHTML = svgW(M.w, M.h, 'Pariyetal hücrede HCl üretimi: karbonik anhidraz, proton pompası, Cl⁻/HCO₃⁻ değiştirici ve reseptörler', s, nar ? 420 : 780);
      setBar(el, 'rate', r, niteller(r));
    };
    const capNow = () => {
      if (R.ss && !R.hist && !R.ach && !R.gas) return '<b>Uyarı yok.</b> Üç uyarıcı reseptör (histamin H2, ACh, gastrin) boş; salgı en düşükte. [[K1 s. 284]]';
      if (R.ss) return '<b>Somatostatin.</b> Pariyetal hücrenin tek inhibitör reseptörü; salgı baskılanır. [[K1 s. 284]]';
      if (!R.hist && !R.ach && !R.gas) return '<b>Uyarı yok.</b> Üç uyarıcı reseptör (histamin H2, ACh, gastrin) boş; salgı en düşükte. [[K1 s. 284]]';
      if (!R.hist) return '<b>Histamin yok.</b> En önemli uyaran gider; gastrin ve ACh\'nin doğrudan etkisiyle salgı azalarak sürer. [[K1 s. 284]]';
      if (R.hist && !R.ach && !R.gas) return '<b>Yalnız histamin.</b> H2 reseptörü cAMP\'yi artırır; asıl salgı bu yoldandır. [[K1 s. 284]]';
      return null;
    };
    const adim = () => { sn.textContent = `${step + 1} / 6`; setCap(el, CAP[step] || ''); if (!step) setCapRaw(el, cap0); };
    const go = (d) => { step = (step + d + 6) % 6; tm = 0; sc = 0; adim(); draw(); };
    el.addEventListener('click', (e) => {
      const st = e.target.closest('[data-st]');
      if (st) { play = false; pb.textContent = 'Oynat'; pb.setAttribute('aria-pressed', 'false'); return go(+st.dataset.st); }
      if (e.target.closest('.f63-play')) {
        if (RM) { step = 5; adim(); draw(); return; }
        play = !play; pb.textContent = play ? 'Duraklat' : 'Oynat'; pb.setAttribute('aria-pressed', String(play)); return;
      }
      const tg = e.target.closest('[data-tg]');
      if (tg) {
        const key = tg.dataset.tg; R[key] = R[key] ? 0 : 1; tg.setAttribute('aria-pressed', String(!!R[key]));
        const c = capNow(); if (c) setCap(el, c); else adim(); draw();
      }
    });
    if (RM) { step = 5; sn.textContent = '6 / 6'; setCap(el, CAP[5]); }
    draw();
    const stop = ticker(el, (dt) => {
      if (RM) return;
      tm += dt;
      if (play) { sc += dt; if (sc >= 2) { sc = 0; step = (step + 1) % 6; adim(); } }
      draw();
    });
    return () => { stop(); w.stop(); };
  };

  /* ================= 4 · İlaç nerede etki eder ================= */
  VIZ.f63_ilac = (el) => {
    const D = {
      an: { ad: 'Partiküllü antasit', bas: 90, sure: 22, lvl: 0.12,
        cap: '<b>Antasit.</b> Alkali ilaç lümendeki HCl ile doğrudan tepkimeye girer: asit hızla nötralize olur, belirtiler çabuk geçer. Örnek: alüminyum hidroksit, magnezyum hidroksit, kalsiyum karbonat. Oluşan tuzlar emilmez ve partikül yapar; pH yüksek olsa da aspirasyonları akciğer hasarı yapar. [[K1 s. 285]]' },
      na: { ad: 'Sodyum sitrat', bas: 90, sure: 22, lvl: 0.12,
        cap: '<b>Sodyum sitrat.</b> Partikülsüz antasit; hızı ve partikülsüz olması nedeniyle sezaryenden hemen önce kullanılır. [[K1 s. 285]]' },
      h2: { ad: 'H2 antagonisti', bas: 40, sure: 72, lvl: 0.5,
        cap: '<b>H2 antagonisti (ör. ranitidin).</b> Histaminin pariyetal hücre etkisini bloke eder; gastrin ve ACh\'nin doğrudan etkisiyle bir miktar asit sürer. Antasitten yavaş başlar, çok daha uzun etkilidir. [[K1 s. 285]]' },
      ppi: { ad: 'PPI', bas: 22, sure: 92, lvl: 0.06,
        cap: '<b>PPI (ör. omeprazol).</b> H⁺/K⁺-ATPazı, yani son ortak yolu geri dönüşsüz inhibe eder; pH\'ı H2 antagonistlerinden daha etkili yükseltir. [[K1 s. 285]]' },
    };
    let sel = 'an', ilk = true, tm = 0;
    el.innerHTML = `${segH('İlaç seç', 'd', [['an', 'Partiküllü antasit'], ['na', 'Sodyum sitrat'], ['h2', 'H2 antagonisti'], ['ppi', 'PPI']], sel)}
      <div class="f63-sv"></div>${barH('Başlangıç (nitel)', 'bas', 90, 'ok')}${barH('Süre (nitel)', 'sure', 22, 'ok')}
      <div class="f63-kutu" hidden></div>`;
    const sv = el.querySelector('.f63-sv'), kutu = el.querySelector('.f63-kutu');
    const w = izle(el, () => draw());
    const draw = () => {
      const nar = w.nar; sade(nar);
      const M = mapper(560, 360, nar), d = D[sel], T = RM ? 0 : tm;
      let s = '';
      s += M.R(0, 0, 80, 360, { f: 'chip', rx: 10, op: 0.7 }) + M.R(430, 30, 560, 330, { f: 'crit-soft', rx: 12, op: 0.8 }) + M.R(100, 30, 420, 330, { f: 'paper', s: 'ink', rx: 16 });
      s += M.T(40, 14, 'Kan', { b: 1, c: 'muted', nu: 18, nv: 180 }) + M.T(495, 345, 'Lümen', { c: 'crit', b: 1, nu: 548, nv: 180 });
      // reseptörler: H2 (60), M3 (150), G (240)
      const rec = [['h2', 'H2', 70], ['m3', 'M3', 150], ['g', 'G', 230]];
      rec.forEach(([k, ad, v]) => {
        const blok = sel === 'h2' && k === 'h2';
        s += M.R(88, v - 11, 100, v + 11, { f: blok ? 'warn-soft' : 'ok-soft', s: blok ? 'warn' : 'ok', sw: 2, rx: 3 });
        s += M.T(78, v, ad, { aw: 'end', b: 1, fs: 11.5, nu: 66, c: blok ? 'warn' : 'ok' });
        s += poly(M.pts([[40, v], [86, v]]), blok ? 'warn' : 'ok', { w: 1.6, d: blok ? '3 3' : null, inh: blok });
      });
      s += M.T(260, 280, 'Pariyetal hücre', { c: 'muted', b: 1, nu: 260, nv: 280 });
      // proton pompası
      const lock = sel === 'ppi';
      s += M.R(414, 96, 428, 134, { f: lock ? 'warn-soft' : 'crit-soft', s: lock ? 'warn' : 'crit', sw: 2.2, rx: 3 });
      s += M.T(405, 115, 'Proton|pompası', { aw: 'end', fs: 11, nu: 390, nv: 115 });
      if (lock) s += M.T(445, 115, 'kilitli ⊣', { c: 'warn', b: 1, fs: 11.5, nu: 445, nv: 115 });
      // asit noktaları
      const N = 26, shown = Math.round(N * d.lvl) + (sel === 'an' || sel === 'na' ? Math.max(0, Math.round(6 * (1 - ez(cl(T / 2.5, 0, 1))))) * (RM ? 0 : 1) : 0);
      for (let i = 0; i < Math.min(N, shown); i++) {
        const u = 450 + ((i * 41) % 100) + Math.sin(T * 1.5 + i) * 3, v = 60 + ((i * 67) % 250) + Math.cos(T * 1.3 + i * 2) * 3;
        s += M.C(u, v, 4, { f: 'crit', s: 'paper', sw: 0.6 });
      }
      if (sel === 'an' || sel === 'na') {
        const pt = (i) => { const f = ((T * 0.35 + i / 8) % 1); return [455 + (i * 37) % 90, lerp(30, 300, ez(f))]; };
        for (let i = 0; i < 8; i++) { const p = pt(i); s += M.C(p[0], p[1], 5, { f: 'paper', s: 'accent', sw: 1.4, op: sel === 'an' ? 1 : 0.0 }); }
        s += M.T(495, 35, sel === 'an' ? 'Al · Mg · Ca' : 'sitrat (çözünür)', { c: 'accent-ink', b: 1, fs: 11, nu: 470, nv: 25 });
        if (sel === 'an') s += M.T(495, 318, 'tortu → aspirasyonda|akciğer hasarı', { c: 'crit', b: 1, fs: 11, nu: 520, nv: 180 });
      }
      sv.innerHTML = svgW(M.w, M.h, 'Pariyetal hücre ve seçilen ilacın etki yeri', s, nar ? 380 : 720);
      setBar(el, 'bas', d.bas, d.bas > 70 ? 'hızlı' : d.bas > 35 ? 'orta' : 'yavaş'); setBar(el, 'sure', d.sure, d.sure > 70 ? 'uzun' : d.sure > 45 ? 'orta' : 'kısa');
    };
    const kutuYaz = () => { kutu.hidden = sel !== 'ppi'; kutu.innerHTML = sel === 'ppi' ? '<b>Uzun kullanım:</b> C. difficile, osteoporoz, B12 eksikliği, demir eksikliği anemisi.' : ''; };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-d]'); if (!b) return;
      sel = b.dataset.d; basSec(el, 'd', sel); setCap(el, D[sel].cap); kutuYaz(); draw();
    });
    draw();
    const stop = ticker(el, (dt) => { if (RM) return; tm += dt; draw(); });
    return () => { stop(); w.stop(); };
  };

  /* ================= 5 · Üç evre ================= */
  VIZ.f63_evre = (el) => {
    const E = [
      { ad: 'Sefalik', pay: 30, c: 'ok',
        cap: '<b>Sefalik evre.</b> Yemeği beklemek, koklamak, görmek vagusu uyarır: HCl, gastrin ve pepsinojen salgılanır. Bir öğünün asidinin yaklaşık %30\'u. Evreleri sırayla izleyin. [[K1 s. 285]]' },
      { ad: 'Gastrik', pay: 60, c: 'c-basic',
        cap: '<b>Gastrik evre.</b> Midenin gerilmesi G hücresinden gastrin saldırır; gastrin pepsinojen, histamin ve HCl salgısını artırır. Bir öğünün asidinin yaklaşık %60\'ı. [[K1 s. 285]]' },
      { ad: 'İntestinal', pay: 0, c: 'warn',
        cap: '<b>İntestinal evre.</b> Asidik kimus duodenuma girince sekretin salınır: pankreastan HCO₃⁻ salgılatarak kimusun pH\'ını yükseltir, gastrini baskılayarak asidi azaltır. [[K1 s. 285]]' },
    ];
    let ev = 0, play = false, tm = 0, sc = 0;
    el.innerHTML = `<div class="btn-row">${segH('Evre', 'e', [[0, 'Sefalik'], [1, 'Gastrik'], [2, 'İntestinal']], 0)}<button type="button" class="btn f63-play" aria-pressed="false">Oynat</button></div>
      <div class="f63-sv"></div>
      <div class="f63-ab" aria-label="Bir öğünün asidinin evrelere dağılımı"><div class="f63-ab-trk"><i class="f63-ab-1"></i><i class="f63-ab-2"></i><i class="f63-ab-3"></i></div>
      <div class="f63-ab-t"><span>Sefalik ≈ %30</span><span>Gastrik ≈ %60</span><span>İntestinal: asit frenlenir</span></div></div>
      <div class="legend"><span><b>G</b> = G hücresi</span><span><b>E</b> = esas hücre (pepsinojen)</span><span><b>H</b> = ECL (histamin)</span><span><b>P</b> = pariyetal (HCl)</span></div>`;
    const sv = el.querySelector('.f63-sv'), pb = el.querySelector('.f63-play');
    const w = izle(el, () => draw());
    const draw = () => {
      const nar = w.nar; sade(nar); const T = RM ? 1.2 : tm;
      const g = nar
        ? { w: 360, h: 380, head: [62, 76], st: [226, 100], duo: [20, 222, 320, 34], pan: [150, 306, 160, 52], stc: [226, 100], pylor: [286, 160], gc: [262, 82], vg: [[100, 74], [150, 54], [190, 66]] }
        : { w: 560, h: 290, head: [66, 124], st: [262, 118], duo: [380, 108, 160, 34], pan: [420, 196, 120, 48], stc: [262, 118], pylor: [345, 135], gc: [296, 90], vg: [[100, 108], [170, 50], [222, 82]] };
      const gr = ev === 1 ? 1.12 : 1;
      let s = '';
      // baş
      const [hx, hy] = g.head;
      s += el2(hx, hy, 32, 42, { f: 'paper', s: 'ink' }) + pa(`M${hx + 30} ${hy - 4}l10 8l-10 4`, { s: 'ink' }) + el2(hx - 6, hy - 14, 18, 14, { f: 'chip', s: 'muted', sw: 1 }) + tx(hx - 6, hy - 14, 'beyin', { fs: 10.5, c: 'muted', vc: 1 });
      if (ev === 0) {
        const glow = 0.55 + 0.45 * Math.sin(T * 3);
        s += ci(hx + 12, hy - 4, 4, { f: 'ok', op: n(glow) }) + tx(hx + 12, hy + 42 + 14, 'göz · burun · düşünce', { c: 'ok', b: 1, fs: 11 });
      } else s += tx(hx, hy + 56, 'baş', { c: 'muted', fs: 11 });
      // vagus
      const vg = g.vg.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join('');
      const vgp = [[hx + 4, hy + 30], ...g.vg.slice(1), [g.st[0] - 40 * gr, g.st[1] - 20]];
      s += pa('M' + vgp.map((p) => n(p[0]) + ' ' + n(p[1])).join('L'), { s: ev === 0 ? 'ok' : 'muted', sw: ev === 0 ? 3 : 1.6, d: ev === 0 ? null : '4 3' }) + tx(vgp[1][0], vgp[1][1] - 8, 'vagus', { c: ev === 0 ? 'ok' : 'muted', b: 1, fs: 11 });
      if (ev === 0) s += dots(vgp, T, 5, 'ok', { sp: 0.35 });
      // mide
      const [sx, sy] = g.st;
      const dark = ev === 0 ? 0.45 : ev === 1 ? 0.8 : 0.5;
      s += el2(sx, sy, 76 * gr, 50 * gr, { f: ev === 2 ? 'accent-soft' : 'crit-soft', s: 'ink', rot: -14, op: 1 });
      s += el2(sx, sy, 76 * gr, 50 * gr, { f: 'crit', rot: -14, op: n(dark * 0.25), s: null });
      s += tx(sx, sy + 62 * gr, 'Mide', { b: 1, c: 'crit' });
      // salgı etiketleri / hücreler
      const cx = g.stc[0], cy = g.stc[1];
      const cellsP = { G: [cx + 26 * gr, cy - 20 * gr, 'c-basic'], E: [cx - 22 * gr, cy + 4, 'ink'], H: [cx - 4, cy - 14 * gr, 'c-basic'], P: [cx + 14, cy + 8 * gr, 'crit'] };
      Object.keys(cellsP).forEach((k) => { const c = cellsP[k]; s += ci(c[0], c[1], 9, { f: 'paper', s: c[2], sw: 1.4, op: ev === 2 && k !== 'G' ? 0.5 : 1 }) + tx(c[0], c[1], k, { vc: 1, fs: 11, b: 1, c: c[2] }); });
      if (ev === 0) s += tx(sx, sy - 58 * gr, 'HCl · gastrin · pepsinojen', { c: 'ok', b: 1, fs: 11 });
      if (ev === 1) {
        s += tx(sx, sy - 62, 'gerilme → gastrin', { c: 'c-basic', b: 1, fs: 11 });
        const G = cellsP.G;
        [['E', cellsP.E], ['H', cellsP.H], ['P', cellsP.P]].forEach(([k, c], i) => { s += dots([[G[0], G[1]], [c[0], c[1]]], T + i * 0.3, 2, 'c-basic', { sp: 0.7, r: 2.6 }); });
      }
      // piloru, duodenum, pankreas
      const [dx, dy, dw, dh] = g.duo;
      const kim = ev === 2 ? lerp(0, 1, ez(cl(T / 3, 0, 1))) : 0;
      s += rc(dx, dy, dw, dh, { f: 'crit-soft', s: 'ink', rx: 14 }) + rc(dx, dy, dw, dh, { f: 'accent-soft', rx: 14, s: null, op: n(kim) });
      s += tx(dx + dw / 2, dy - 8, 'Duodenum', { b: 1, c: 'muted', fs: 11.5 });
      const pn = g.pan;
      s += el2(pn[0] + pn[2] / 2, pn[1] + pn[3] / 2, pn[2] / 2, pn[3] / 2, { f: 'chip', s: 'muted' }) + tx(pn[0] + pn[2] / 2, pn[1] + pn[3] / 2, 'Pankreas', { vc: 1, c: 'muted', b: 1 });
      s += nar ? poly([[sx + 50, sy + 40], [290, 176], [290, 220]], 'crit', { w: 1.6, op: 0.5 }) : poly([[g.pylor[0], g.pylor[1]], [dx + 6, dy + dh / 2]], 'crit', { w: 1.6, op: 0.5 });
      if (ev === 2) {
        const sec = nar ? [[dx + 150, dy + dh + 1], [dx + 150, pn[1] - 2]] : [[dx + 70, dy + dh + 1], [dx + 70, pn[1] - 2]];
        const gmid = nar ? [[dx + 40, dy - 8], [dx + 40, 150], [g.gc[0], g.gc[1] + 12]] : [[dx + 20, dy - 4], [dx + 20, 40], [g.gc[0] + 8, 40], [g.gc[0] + 8, g.gc[1] - 10]];
        s += poly(sec, 'c-basic', { w: 1.8 }) + dots(sec, T, 3, 'c-basic', { sp: 0.5 }) + tx(sec[0][0] + 6, (sec[0][1] + sec[1][1]) / 2, 'sekretin', { a: 'start', c: 'c-basic', b: 1, fs: 11 });
        s += poly(gmid, 'warn', { inh: 1, w: 2 }) + dots(gmid, T, 4, 'warn', { sp: 0.4 }) + tx(gmid[1][0] + (nar ? 8 : 8), gmid[1][1] + (nar ? 10 : -6), 'gastrin ⊣', { a: 'start', c: 'warn', b: 1, fs: 11 });
        const bic = nar ? [[dx + 100, pn[1] - 2], [dx + 100, dy + dh + 1]] : [[dx + 110, pn[1] - 2], [dx + 110, dy + dh + 1]];
        s += dots(bic, T, 3, 'accent', { sp: 0.5 }) + tx(bic[0][0] + 6, bic[0][1] - 8, 'HCO₃⁻', { a: 'start', c: 'accent-ink', b: 1, fs: 11 });
      }
      sv.innerHTML = svgW(g.w, g.h, 'Baş, vagus, mide, duodenum ve pankreas: sefalik, gastrik ve intestinal evreler', s, nar ? 420 : 760);
      const a = el.querySelectorAll('.f63-ab-trk i');
      const f = (ev === 0 ? 30 : ev === 1 ? 90 : 90);
      a[0].style.width = '30%'; a[1].style.width = '60%'; a[2].style.width = '10%';
      a[0].style.opacity = ev >= 0 ? 1 : 0.3; a[1].style.opacity = ev >= 1 ? 1 : 0.18; a[2].style.opacity = ev >= 2 ? 1 : 0.18;
    };
    const setEv = (i) => { ev = i; tm = 0; basSec(el, 'e', i); setCap(el, E[i].cap); draw(); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-e]'); if (b) { play = false; pb.textContent = 'Oynat'; pb.setAttribute('aria-pressed', 'false'); return setEv(+b.dataset.e); }
      if (e.target.closest('.f63-play')) {
        if (RM) { setEv((ev + 1) % 3); return; }
        play = !play; sc = 0; pb.textContent = play ? 'Duraklat' : 'Oynat'; pb.setAttribute('aria-pressed', String(play));
      }
    });
    draw();
    const stop = ticker(el, (dt) => {
      if (RM) return; tm += dt;
      if (play) { sc += dt; if (sc >= 3.4) { sc = 0; setEv((ev + 1) % 3); } }
      draw();
    });
    return () => { stop(); w.stop(); };
  };

  /* ================= 6 · Boşalma hızı ve frenler ================= */
  VIZ.f63_frenler = (el) => {
    const MEAL = { sivi: ['Sıvı', 1.0, '<b>Sıvı.</b> Sıvılar mideden katılardan çok daha hızlı geçer. [[K1 s. 286]]'], prot: ['Protein', 0.7], karb: ['Karbonhidrat', 0.55], yag: ['Yağlı', 0.3] };
    const ICERIK = '<b>İçerik.</b> İnce bağırsağa en hızlı protein, ardından karbonhidrat geçer; yağlı öğünler en yavaş boşalır. Katı pilora yaklaşınca sfinkter kasılır ve katıyı neredeyse sıvılaşana dek tutar. [[K1 s. 286]]';
    const BR = {
      ger: ['Gerilme', 'Gerilme → enterik refleks', 'd', '<b>Duodenum gerilmesi.</b> Enterik sinir sisteminin refleks inhibisyonu boşalmayı azaltır. [[K1 s. 286]]'],
      asit: ['Asit', 'Asit → sekretin → gastrin ↓', 'd', '<b>Asit.</b> Düşük duodenum pH\'ı sekretin saldırır; sekretin pankreastan HCO₃⁻ salgılatır ve gastrini baskılar. Motiliteyi gastrin uyardığından boşalma yavaşlar. [[K1 s. 286]]'],
      yag: ['Yağ', 'Yağ → CCK → pilor tonusu ↑', 'd', '<b>Yağ.</b> Duodenumdaki lipit CCK saldırır; CCK pilor tonusunu artırır, ince bağırsak geçmiş yağı sindirmeye zaman bulur. [[K1 s. 286]]'],
      hip: ['Hiperozmolarite', 'Hiperozmolarite → enterik refleks', 'd', '<b>Hiperozmolarite.</b> Hiperozmolar kimus karmaşık bir enterik refleksle boşalmayı inhibe eder. [[K1 s. 286]]'],
      sem: ['Sempatik / ağrı', 'Sempatik etkinlik · ağrı', 'o', null],
      opi: ['Opioid', 'Opioid', 'o', null],
      has: ['Hastalık (diyabetik otonom nöropati, akut karın, ileus)', 'Hastalık (DOY, akut karın, ileus)', 'o', null],
    };
    const DIGER = '<b>Diğer etmenler.</b> Sempatik etkinlik, ağrı, opioidler ve diyabetik otonom nöropati, akut karın, ileus gibi hastalıklar boşalmayı yavaşlatır. [[K1 s. 286]]';
    const HAC = '<b>Hacim.</b> Mide hacmi arttıkça boşalma hızlanır. [[K1 s. 286]]';
    let meal = 'prot', hac = 50, on = {}, tm = 0;
    el.innerHTML = `<div class="f63-grp"><span class="f63-gl">Öğün</span>${segH('Öğün', 'm', Object.keys(MEAL).map((k) => [k, MEAL[k][0]]), meal)}</div>
      <label class="f63-rng"><span>Mide hacmi</span><input type="range" min="0" max="100" value="50" aria-label="Mide hacmi" data-hac><span class="f63-rng-u"><small>az</small><small>çok</small></span></label>
      <div class="f63-grp"><span class="f63-gl">Duodenum frenleri</span><div class="btn-row">${['ger', 'asit', 'yag', 'hip'].map((k) => tgH(k, BR[k][0], 0)).join('')}</div></div>
      <div class="f63-grp"><span class="f63-gl">Diğer</span><div class="btn-row">${['sem', 'opi', 'has'].map((k) => tgH(k, k === 'has' ? 'Hastalık' : BR[k][0], 0)).join('')}</div></div>
      <div class="f63-sv"></div>${barH('Boşalma hızı (nitel)', 'hiz', 50, 'ok')}`;
    const sv = el.querySelector('.f63-sv');
    const w = izle(el, () => draw());
    const hiz = () => { let r = MEAL[meal][1] * (0.7 + 0.6 * hac / 100); Object.keys(on).forEach((k) => { if (on[k]) r *= 0.6; }); return r; };
    const draw = () => {
      const nar = w.nar; sade(nar); const T = RM ? 0 : tm;
      const g = nar ? { w: 360, h: 330, st: [108, 232], rx: 80, ry: 58, py: [196, 234], du: [214, 218, 140, 32] } : { w: 560, h: 300, st: [130, 212], rx: 90, ry: 62, py: [232, 214], du: [252, 198, 288, 32] };
      const r = hiz(), act = Object.keys(on).filter((k) => on[k]);
      let s = '';
      const dl = act.filter((k) => BR[k][2] === 'd'), ot = act.filter((k) => BR[k][2] === 'o');
      let y = 18;
      dl.forEach((k) => { s += tx(10, y, '⊣ ' + BR[k][1], { a: 'start', c: 'warn', b: 1, fs: nar ? 11.5 : 12.5 }); y += 17; });
      ot.forEach((k) => { s += tx(10, y, '⊣ ' + BR[k][1], { a: 'start', c: 'warn', b: 1, fs: nar ? 11.5 : 12.5 }); y += 17; });
      const top = nar ? 150 : 150, [sx, sy] = g.st;
      s += el2(sx, sy, g.rx, g.ry, { f: 'crit-soft', s: 'ink', op: 0.9 }) + tx(sx, sy + g.ry + 16, 'Mide', { b: 1, c: 'crit' });
      const [px, py] = g.py, yagB = on.yag ? 1 : 0;
      const [dx, dy, dw, dh] = g.du;
      s += rc(dx, dy, dw, dh, { f: 'accent-soft', s: 'ink', rx: 14 }) + tx(dx + dw / 2, dy + dh + 16, 'Duodenum', { b: 1, c: 'muted' });
      const solid = meal !== 'sivi', pul = solid ? 0.5 + 0.5 * Math.sin(T * 5) : 0;
      s += rc(px - 4 - yagB * 2 - pul * 2, py - 20, 8 + yagB * 4 + pul * 4, 40, { f: yagB ? 'warn-soft' : 'chip', s: yagB ? 'warn' : 'ink', sw: 1.6, rx: 3 });
      s += tx(px - 6, py - 26, 'pilor', { fs: 11, c: 'muted', b: 1 });
      // kimus parçacıkları
      const N = 10 + Math.round(hac / 100 * 12), sp = 0.07 + r * 0.22;
      for (let i = 0; i < N; i++) {
        const a = i * 2.39996, rr = Math.sqrt((i + 0.5) / N) * 0.8, bx = sx + Math.cos(a) * g.rx * rr, by = sy + Math.sin(a) * g.ry * rr;
        const q = (T * sp + i / N) % 1;
        let X, Y, R;
        if (q < 0.7) { const f = ez(q / 0.7); X = lerp(bx, px - 14, f); Y = lerp(by, py, f); R = solid ? lerp(6, 3, f) : 3.2; if (solid && q > 0.55) { X -= (q - 0.55) * 30 * Math.abs(Math.sin(T * 6 + i)); } }
        else { const f = (q - 0.7) / 0.3; X = lerp(px + 4, dx + dw - 14, f); Y = lerp(py, dy + dh / 2, 0.5) + Math.sin(f * 6 + i) * 2; R = 2.6; }
        s += ci(X, Y, R, { f: q < 0.7 ? 'crit' : 'accent', s: 'paper', sw: 0.5 });
      }
      // ⊣ okları
      if (dl.length) s += poly([[dx + dw * 0.5, dy], [dx + dw * 0.5, top], [sx, top], [sx, sy - g.ry + 4]], 'warn', { inh: 1, w: 2.2 });
      if (ot.length) s += poly([[24, y - 8 + 4], [24, sy - g.ry + 22]], 'warn', { inh: 1, w: 2.2 });
      if (on.yag) s += poly([[dx + 40, dy], [px, py - 20]], 'warn', { w: 1.6 });
      sv.innerHTML = svgW(g.w, g.h, 'Mide, pilor ve duodenum: kimusun boşalma hızı ve duodenum frenleri', s, nar ? 420 : 720);
      setBar(el, 'hiz', r / 1.3 * 100, r > 0.9 ? 'hızlı' : r > 0.5 ? 'orta' : r > 0.25 ? 'yavaş' : 'çok yavaş');
    };
    el.addEventListener('click', (e) => {
      const m = e.target.closest('[data-m]');
      if (m) { meal = m.dataset.m; basSec(el, 'm', meal); setCap(el, meal === 'sivi' ? MEAL.sivi[2] : ICERIK); draw(); return; }
      const t = e.target.closest('[data-tg]');
      if (t) {
        const k = t.dataset.tg; on[k] = on[k] ? 0 : 1; t.setAttribute('aria-pressed', String(!!on[k]));
        if (on[k]) setCap(el, BR[k][3] || DIGER);
        draw();
      }
    });
    el.addEventListener('input', (e) => { if (e.target.matches('[data-hac]')) { hac = +e.target.value; setCap(el, HAC); draw(); } });
    draw();
    const stop = ticker(el, (dt) => { if (RM) return; tm += dt; draw(); });
    return () => { stop(); w.stop(); };
  };

  /* ================= 7 · Boşalma eğrileri ================= */
  VIZ.f63_egri = (el) => {
    const cap0 = getCap(el);
    const CAPS = {
      0: cap0 + ' Bu gecikme besinin mide salgılarıyla karışmasına ve pepsinin proteinleri yıkmaya başlamasına zaman verir. [[K1 s. 286]]',
      1: '<b>Sıvı çabuk, katı yavaş.</b> Berrak sıvı gecikmesiz, üstel boşalır; katıda 30 dakikadan sonra boşalma yaklaşık doğrusaldır. [[K1 s. 286]]',
      2: '<b>Açlık.</b> Aspirasyon riski mide hacmiyle ilişkilidir; belli bir anda sıvıda kalan hacim katıdan çok daha azdır. Bu yüzden berrak sıvı 2, katı 6 saat önceye kadar alınabilir. [[K1 s. 286–287]]',
      hip: '<b>Hiperozmolar, asidik ya da yağlı sıvı.</b> Boşalma yavaşlar ve katının doğrusal örüntüsüne benzeyebilir. [[K1 s. 286]]',
    };
    const solid = (t) => (t < 0.4 ? 100 - (3 / 0.4) * t : Math.max(0, 97 * (1 - (t - 0.4) / 3.1)));
    const berrak = (t) => 100 * Math.exp(-t / 0.35);
    const hip = (t) => (t < 0.1 ? 100 : Math.max(0, 100 * (1 - (t - 0.1) / 2.4)));
    let tur = 'ber', t = 0.25, mix = 0, hedef = 0, prog = RM ? 1 : 0;
    el.innerHTML = `<div class="btn-row">${segH('Sıvı türü', 'k', [['ber', 'Berrak'], ['hip', 'Hiperozmolar / asidik / yağlı']], tur)}</div>
      <div class="f63-sv"></div>
      <label class="f63-rng"><span>Süre</span><input type="range" min="0" max="6" step="0.05" value="0.25" aria-label="Yemekten sonra geçen süre (saat)" data-t><span class="f63-rng-u"><small>0</small><small>6 saat</small></span></label>
      <div class="f63-deg" aria-live="off"></div>`;
    const sv = el.querySelector('.f63-sv'), deg = el.querySelector('.f63-deg');
    const w = izle(el, () => draw());
    const liq = (x) => lerp(berrak(x), hip(x), mix);
    const draw = () => {
      const nar = w.nar; sade(nar);
      const g = nar ? { w: 360, h: 330, x0: 44, x1: 344, y0: 70, y1: 268 } : { w: 560, h: 340, x0: 58, x1: 540, y0: 62, y1: 288 };
      const X = (h) => g.x0 + (h / 6) * (g.x1 - g.x0), Y = (p) => g.y1 - (p / 100) * (g.y1 - g.y0);
      let s = `<defs><clipPath id="f63-egri-klip"><rect x="${g.x0 - 2}" y="${g.y0 - 8}" width="${n((g.x1 - g.x0 + 6) * prog)}" height="${g.y1 - g.y0 + 14}"/></clipPath></defs>`;
      [0, 25, 50, 75, 100].forEach((p) => { s += ln(g.x0, Y(p), g.x1, Y(p), { s: 'line', sw: 1 }) + tx(g.x0 - 6, Y(p), String(p), { a: 'end', vc: 1, c: 'muted', fs: 11 }); });
      for (let h = 0; h <= 6; h += 0.5) s += ln(X(h), g.y1, X(h), g.y1 + (h % 1 ? 3 : 5), { s: 'muted', sw: 1 });
      for (let h = 0; h <= 6; h += nar ? 2 : 1) s += tx(X(h), g.y1 + 18, String(h), { c: 'muted', fs: 11.5 });
      s += ln(g.x0, g.y1, g.x1, g.y1, { s: 'ink' }) + ln(g.x0, g.y0, g.x0, g.y1, { s: 'ink' });
      s += tx((g.x0 + g.x1) / 2, g.y1 + 36, 'Yemekten sonra süre (saat)', { c: 'muted', fs: 11.5 });
      s += `<text transform="translate(12 ${n((g.y0 + g.y1) / 2)}) rotate(-90)" text-anchor="middle" font-size="11.5" style="fill:var(--muted)">Midede kalan içerik (%)</text>`;
      // açlık işaretleri
      const FA = nar ? [[2, '2 sa sıvı', 'middle', 46], [4, '4 sa anne sütü', 'middle', 30], [6, '6 sa katı', 'end', 14]] : [[2, '2 sa · berrak sıvı', 'middle', 46], [4, '4 sa · anne sütü (bebek)', 'middle', 30], [6, '6 sa · katı (formül süt dahil)', 'end', 14]];
      FA.forEach(([h, lb, a, yy]) => { s += ln(X(h), yy + 4, X(h), g.y1, { s: 'ok', sw: 1.4, d: '5 4' }) + tx(X(h) + (a === 'end' ? 4 : 0), yy, lb, { a, c: 'ok', b: 1, fs: 11 }); });
      // gecikme
      s += ln(X(0), g.y0 - 8, X(0.45), g.y0 - 8, { s: 'c-clin', sw: 1.6 }) + ln(X(0), g.y0 - 12, X(0), g.y0 - 4, { s: 'c-clin', sw: 1.6 }) + ln(X(0.45), g.y0 - 12, X(0.45), g.y0 - 4, { s: 'c-clin', sw: 1.6 });
      s += tx(X(0) + (nar ? 0 : 0), g.y0 - 16 + (nar ? 0 : 0), 'gecikme 20–30 dk', { a: 'start', c: 'c-clin', b: 1, fs: 11 });
      const path = (fn) => { let d = ''; for (let h = 0; h <= 6.001; h += 0.05) d += (d ? 'L' : 'M') + n(X(h)) + ' ' + n(Y(fn(h))); return d; };
      s += `<g clip-path="url(#f63-egri-klip)">` + pa(path(solid), { s: 'c-clin', sw: 3.6 }) + pa(path(liq), { s: 'accent', sw: 3.6 }) + '</g>';
      s += tx(X(4.4), Y(solid(4.4)) - 12, 'Katı öğün', { c: 'c-clin', b: 1 }) + tx(X(1.5), Y(liq(1.5)) - 12, mix > 0.5 ? 'Hiperozmolar sıvı' : 'Berrak sıvı', { a: 'start', c: 'accent-ink', b: 1 });
      // imleç
      const sv0 = solid(t), lv = liq(t);
      s += ln(X(t), g.y0, X(t), g.y1, { s: 'ink', sw: 1.3, d: '3 3' }) + ci(X(t), Y(sv0), 5, { f: 'c-clin', s: 'paper' }) + ci(X(t), Y(lv), 5, { f: 'accent', s: 'paper' });
      sv.innerHTML = svgW(g.w, g.h, 'Mideden boşalma: katı öğün ve sıvı için midede kalan içerik, zamana karşı', s, nar ? 420 : 780);
      deg.innerHTML = `<span class="f63-dg-t">${n(t).toString().replace('.', ',')} saat</span><span class="f63-dg-k">Katı %${Math.round(sv0)}</span><span class="f63-dg-s">Sıvı %${Math.round(lv)}</span>`;
    };
    const capT = () => { if (tur === 'hip') return setCap(el, CAPS.hip); setCap(el, t < 0.5 ? CAPS[0] : t < 2 ? CAPS[1] : CAPS[2]); };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (!b) return; tur = b.dataset.k; hedef = tur === 'hip' ? 1 : 0; basSec(el, 'k', tur); if (RM) mix = hedef; capT(); draw(); });
    el.addEventListener('input', (e) => { if (e.target.matches('[data-t]')) { t = +e.target.value; capT(); draw(); } });
    draw();
    const stop = ticker(el, (dt) => {
      let ch = false;
      if (prog < 1) { prog = Math.min(1, prog + dt / 2); ch = true; }
      if (Math.abs(mix - hedef) > 0.001) { mix += Math.sign(hedef - mix) * Math.min(dt / 0.6, Math.abs(hedef - mix)); ch = true; }
      if (ch) draw();
    });
    return () => { stop(); w.stop(); };
  };

  /* ================= 8 + 10 · Kusma merkezi girdi haritası ================= */
  const INP = {
    ktb: { ad: 'KTB', chips: ['D2', '5-HT3', 'ACh', 'Opioid', 'NK-1 (P maddesi)'], not: 'Area postrema; kan–beyin bariyerinin dışında.' },
    viii: { ad: 'VIII. sinir', chips: ['muskarinik', 'H1'], not: 'Vestibüler sistem; taşıt tutması.' },
    ix: { ad: 'IX. sinir', chips: [], not: 'Farinks; öğürme (gag) refleksi.' },
    x: { ad: 'X. sinir + ENS', chips: ['5-HT3'], not: 'GİS: gerilme, enfeksiyon (gastroenterit), kemoterapi, radyoterapi.' },
    ust: { ad: 'Üst merkezler', chips: [], not: 'Limbik sistem: anksiyete, aşırı duygu durumu.' },
  };
  function girdiHaritasi(nar, o) {
    FS = 12; K = nar ? 1.12 : 1.05;
    const sade_ = !!o.sade, sel = o.sel, sig = o.sig == null ? 0 : o.sig, blok = o.blok || {};
    const G = nar
      ? { w: 360, h: sade_ ? 360 : 396, med: [150, 64, 356, 304], wedge: [[236, 70], [268, 70], [252, 94]], ktb: [218, 102, 286, 124], ring: [212, 97, 292, 129], vessel: [[252, 12], [252, 97]], vm: [252, 184, 72, 28], sol: [236, 232, 352, 256], nts: [236, 262, 352, 286],
          nodes: sade_ ? { viii: [4, 92, 128, 126], ix: [4, 158, 128, 192], x: [4, 206, 128, 240], ust: [4, 272, 128, 306] } : { viii: [4, 96, 128, 134], ix: [4, 156, 128, 194], x: [4, 216, 128, 254], ust: [4, 276, 128, 314] }, kc: [252, 113] }
      : { w: 560, h: sade_ ? 300 : 342, med: [170, 66, 390, 252], wedge: [[262, 72], [298, 72], [280, 98]], ktb: [244, 108, 316, 130], ring: [238, 102, 322, 136], vessel: [[280, 14], [280, 102]], vm: [280, 178, 74, 26], sol: [182, 212, 282, 236], nts: [292, 212, 378, 236],
          nodes: { viii: [8, 98, 138, 140], ix: [8, 168, 138, 210], x: [422, 98, 552, 140], ust: [422, 168, 552, 210] }, kc: [280, 119] };
    const nd = G.nodes, vm = G.vm;
    const mid = (r) => [(r[0] + r[2]) / 2, (r[1] + r[3]) / 2];
    const paths = nar ? {
      ktb: [[252, 124], [252, 156]], viii: [[128, sade_ ? 109 : 115], [196, 167]], ix: [[128, 175], [182, 182]], x: [[128, sade_ ? 223 : 235], [190, 202]], ust: [[128, sade_ ? 289 : 295], [212, 209]],
    } : {
      ktb: [[280, 130], [280, 152]], viii: [[138, 119], [212, 164]], ix: [[138, 189], [208, 186]], x: [[422, 119], [346, 164]], ust: [[422, 189], [352, 186]],
    };
    let s = '';
    // beyin sapı
    s += rc(G.med[0], G.med[1], G.med[2] - G.med[0], G.med[3] - G.med[1], { f: 'chip', s: 'ink', sw: 2, rx: 26, op: 0.9 });
    s += tx((G.med[0] + G.med[2]) / 2, G.med[3] + (nar ? 14 : 14), 'Beyin sapı (medulla) · kan–beyin bariyeri', { c: 'muted', fs: 11 });
    s += pg(G.wedge, { f: 'ink', s: 'ink', op: 0.85 });
    s += tx(G.wedge[1][0] + (nar ? 4 : 10), G.wedge[0][1] + 8, 'IV. ventrikül', { a: 'start', c: 'muted', fs: 11 });
    // KTB + damar
    const ktbSel = sel === 'ktb';
    s += poly(G.vessel, 'crit', { w: 3 }) + tx(G.vessel[0][0] + 8, G.vessel[0][1] + 16, 'sistemik kan', { a: 'start', c: 'crit', b: 1, fs: 11 });
    s += rc(G.ring[0], G.ring[1], G.ring[2] - G.ring[0], G.ring[3] - G.ring[1], { s: 'crit', sw: 1.4, d: '4 3', rx: 8 });
    s += rc(G.ktb[0], G.ktb[1], G.ktb[2] - G.ktb[0], G.ktb[3] - G.ktb[1], { f: ktbSel ? 'accent-soft' : 'paper', s: ktbSel ? 'accent-ink' : 'ink', sw: ktbSel ? 2.4 : 1.5, rx: 6, id: 'ktb', cur: 1 }) + tx(mid(G.ktb)[0], mid(G.ktb)[1], 'KTB', { vc: 1, b: 1, id: 'ktb' });
    if (!sade_) s += tx(G.ring[2] + 6, G.ring[1] + 10, nar ? 'KBB|dışında' : 'KBB dışında', { a: 'start', c: 'crit', b: 1, fs: 11 });
    // kusma merkezi
    const vmSel = sel === 'vm' || sig > 0.8;
    s += el2(vm[0], vm[1], vm[2], vm[3], { f: vmSel ? 'accent-soft' : 'paper', s: 'ink', sw: 1.8, d: '6 4', id: 'vm', cur: 1 }) + tx(vm[0], vm[1] - 2, 'Kusma merkezi', { vc: 1, b: 1, id: 'vm' }) + tx(vm[0], vm[1] + 13, 'sınırı belirsiz', { c: 'muted', fs: 10.5 });
    if (!sade_) {
      s += rc(G.sol[0], G.sol[1], G.sol[2] - G.sol[0], G.sol[3] - G.sol[1], { f: 'paper', s: 'muted', sw: 1.2, rx: 5 }) + tx(mid(G.sol)[0], mid(G.sol)[1], 'Solunum merkezi', { vc: 1, fs: 11 });
      s += rc(G.nts[0], G.nts[1], G.nts[2] - G.nts[0], G.nts[3] - G.nts[1], { f: 'paper', s: 'muted', sw: 1.2, rx: 5 }) + tx(mid(G.nts)[0], mid(G.nts)[1], nar ? 'NTS' : 'NTS', { vc: 1, fs: 11 });
    }
    // girdi düğümleri
    const NL = nar ? { viii: 'VIII. sinir|vestibüler', ix: 'IX. sinir|farinks', x: 'X. sinir + ENS|GİS', ust: 'Üst merkezler|limbik sistem' } : { viii: 'VIII. sinir|vestibüler sistem', ix: 'IX. sinir|farinks', x: 'X. sinir + ENS|GİS', ust: 'Üst merkezler|limbik sistem' };
    Object.keys(nd).forEach((k) => {
      const r = nd[k], faint = sade_ && (k === 'ix' || k === 'ust'), isel = sel === k;
      s += rc(r[0], r[1], r[2] - r[0], r[3] - r[1], { f: isel ? 'accent-soft' : 'paper', s: isel ? 'accent-ink' : 'ink', sw: isel ? 2.4 : 1.4, rx: 8, op: faint ? 0.3 : 1, id: faint ? null : k, cur: !faint });
      s += tx(mid(r)[0], mid(r)[1], NL[k], { vc: 1, b: 1, fs: 11.5, op: faint ? 0.4 : 1, id: faint ? null : k });
    });
    // oklar
    Object.keys(paths).forEach((k) => {
      const isel = sel === k, bl = blok[k] && blok[k].length, faint = sade_ && (k === 'ix' || k === 'ust');
      s += poly(paths[k], bl ? 'warn' : isel ? 'accent-ink' : 'muted', { w: isel ? 3 : 1.7, inh: !!bl, d: bl ? '5 4' : null, op: faint ? 0.25 : bl ? 0.9 : isel ? 1 : 0.65 });
    });
    if (sig > 0 && sig < 1.6 && paths[sel] && !(blok[sel] && blok[sel].length)) s += dots(paths[sel], 0, 4, 'accent-ink', { f: cl(sig / 0.9, 0, 1), r: 4 });
    // çıkışlar
    if (!sade_) {
      const ox = nar ? [190, 252, 320] : [214, 280, 346], oy = G.med[3], lit = sig > 0.9;
      const OL = nar ? ['Parasempatik', 'Sempatik', 'Motor|nöronlar'] : ['Parasempatik', 'Sempatik', 'Motor nöronlar'];
      ox.forEach((x, i) => { s += poly([[x, oy + 4], [x, oy + 28]], lit ? 'accent-ink' : 'muted', { w: lit ? 3 : 1.7 }) + tx(x, oy + 42, OL[i], { fs: 11, b: 1, c: lit ? 'accent-ink' : 'ink' }); });
      s += tx((G.med[0] + G.med[2]) / 2, G.h - 8, '→ mide içeriğinin atılması', { c: lit ? 'accent-ink' : 'muted', b: lit, fs: 11.5 });
    }
    // çipler (yalnız sade harita)
    if (sade_) {
      const chip = (x, y, lab, bl) => { const wd = 12 + lab.length * 6.6; return rc(x, y, wd, 20, { f: bl ? 'warn-soft' : 'chip', s: bl ? 'warn' : 'c-basic', sw: bl ? 2.2 : 1.2, rx: 10 }) + tx(x + wd / 2, y + 10, (bl ? '⊣ ' : '') + lab, { vc: 1, fs: 11, b: !!bl, c: bl ? 'warn' : 'c-basic' }) + '\u0000' + wd; };
      const row = (x, y, labs, bk, vert) => { let xx = x, yy = y; labs.forEach((l) => { const r = chip(xx, yy, l[0], bk.includes(l[1])).split('\u0000'); s += r[0]; if (vert) yy += 24; else xx += +r[1] + 6; }); };
      const CH = { ktb: [['D2', 'D2'], ['5-HT3', '5-HT3']], viii: [['muskarinik', 'mus'], ['H1', 'H1']], x: [['5-HT3', '5-HT3']] };
      row(G.ring[2] + 6, G.ring[1] - 6, CH.ktb, blok.ktb || [], true);
      row(nd.viii[0], nd.viii[3] + 4, CH.viii, blok.viii || [], false);
      row(nd.x[0], nd.x[3] + 4, CH.x, blok.x || [], false);
      if (blok.viii && blok.viii.length) s += tx(nd.viii[0], nd.viii[3] + 40, 'taşıt tutması', { a: 'start', c: 'muted', fs: 11 });
    }
    return { svg: svgW(G.w, G.h, 'Beyin sapı ve kusma merkezine gelen girdiler', s, nar ? 420 : 780), G };
  }

  VIZ.f63_merkez = (el) => {
    const CAP = {
      viii: '<b>VIII. kraniyal sinir.</b> Vestibüler sistemden afferent taşır; muskarinik ve histamin H1 reseptörleri rol oynar. Taşıt tutmasında bu girdi çalışır. [[K1 s. 287]]',
      ix: '<b>IX. kraniyal sinir.</b> Farinksten afferent taşır; öğürme (gag) refleksinde rol oynar. [[K1 s. 287]]',
      x: '<b>X. kraniyal sinir ve enterik sinir sistemi.</b> GİS mukoza hücreleri gerilme, enfeksiyon (ör. gastroenterit), kemoterapi ve radyoterapiye yanıt olarak 5-HT3 reseptörleri üzerinden kusma merkezini uyarır. [[K1 s. 287]]',
      ust: '<b>Üst merkezler.</b> Limbik sistem gibi üst merkezler anksiyete ve aşırı duygu durumlarında kusmayı başlatabilir. [[K1 s. 287]]',
      vm: '<b>Kusma merkezi.</b> Medulla oblongatada sınırı belirsiz bir alan; solunum merkezi, NTS ve KTB ile yakın temasta ama onların parçası değil. Parasempatik, sempatik sistemi ve motor nöronları birlikte çalıştırır. [[K1 s. 287]]',
    };
    const cap0 = getCap(el);
    let sel = 'ktb', sig = RM ? 1.8 : 0;
    el.innerHTML = `${segH('Girdi seç', 'i', [['ktb', 'KTB'], ['viii', 'VIII. sinir'], ['ix', 'IX. sinir'], ['x', 'X. sinir + ENS'], ['ust', 'Üst merkezler']], sel)}<div class="f63-sv"></div><div class="f63-chips"></div>`;
    const sv = el.querySelector('.f63-sv'), ch = el.querySelector('.f63-chips');
    const w = izle(el, () => draw());
    const draw = () => {
      sv.innerHTML = girdiHaritasi(w.nar, { sel, sig }).svg;
      const d = INP[sel];
      ch.innerHTML = sel === 'vm' ? '<span class="f63-chnot">Kusma merkezi: parasempatik + sempatik + motor nöronlar birlikte çalışır.</span>'
        : (d.chips.length ? '<span class="f63-chl">Reseptörler</span>' + d.chips.map((c) => `<span class="tag basic">${c}</span>`).join('') : '') + `<span class="f63-chnot">${d.not}</span>`;
    };
    const pick = (id) => {
      sel = id; sig = RM ? 1.8 : 0; basSec(el, 'i', id);
      if (id === 'ktb') setCapRaw(el, cap0); else setCap(el, CAP[id]);
      draw();
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-i]') || e.target.closest('[data-pick]'); if (b) pick(b.dataset.i || b.dataset.pick); });
    draw();
    const stop = ticker(el, (dt) => { if (RM || sig >= 2) return; sig += dt; draw(); });
    return () => { stop(); w.stop(); };
  };

  /* ================= 10 · Antiemetik haritası ================= */
  VIZ.f63_antiemetik = (el) => {
    const AE = {
      on: { ad: 'Ondansetron', blok: { ktb: ['5-HT3'], x: ['5-HT3'] }, cap: '<b>Ondansetron.</b> Serotonin 5-HT3 antagonisti; reseptörü hem KTB\'de hem GİS\'te bloke ettiği için geniş kullanım alanı vardır. [[K1 s. 288]]' },
      dom: { ad: 'Domperidon', blok: { ktb: ['D2'] }, cap: '<b>Domperidon.</b> KTB\'deki dopamin D2 reseptörlerini antagonize eder. KTB kan–beyin bariyerinin dışında olduğundan ilacın bariyeri geçmesi gerekmez. [[K1 s. 287–288]]' },
      hyo: { ad: 'Hiyosin', blok: { viii: ['mus'] }, cap: '<b>Hiyosin.</b> Vestibüler aparatta muskarinik ACh reseptör antagonisti; taşıt tutmasında antiemetik olarak kullanılır. [[K1 s. 288]]' },
      cyc: { ad: 'Siklizin', blok: { viii: ['H1'] }, cap: '<b>Siklizin.</b> Vestibüler aparatta histamin reseptör antagonisti; taşıt tutmasında da sık kullanılır. [[K1 s. 288]]' },
    };
    let sel = 'on';
    el.innerHTML = `${segH('Antiemetik seç', 'a', Object.keys(AE).map((k) => [k, AE[k].ad]), sel)}<div class="f63-sv"></div>`;
    const sv = el.querySelector('.f63-sv'); const w = izle(el, () => draw());
    const draw = () => { sv.innerHTML = girdiHaritasi(w.nar, { sade: true, sel: null, blok: AE[sel].blok }).svg; };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-a]'); if (!b) return; sel = b.dataset.a; basSec(el, 'a', sel); setCap(el, AE[sel].cap); draw(); });
    draw();
    return () => w.stop();
  };

  /* ================= 9 · Kusma adım adım ================= */
  VIZ.f63_kusma = (el) => {
    const CAP = [
      null,
      '<b>Öğürme evresi.</b> Derin inspirasyondan sonra glottis kapanır. Solunum ve karın kasları kapalı glottise karşı ritmik kasılır: alkali ince bağırsak içeriği mideyle karışıp pH\'ı yükseltir, göğüs içi basınç özofagusu sıkıştırıp reflüyü önler. [[K1 s. 288]]',
      '<b>Atım evresi.</b> Pilor kasılır, LOS ve özofagus gevşer; karın kasları kasılıp diyafram inince karın içi basınç birden artar ve içerik özofagusa geçer. Yumuşak damak nazofarinksi kapatır, özofagusun ters peristaltizmi içeriği ağızdan atar. [[K1 s. 288]]',
    ];
    const EKS = '<b>Atım öncesi evre.</b> Bulantı; mide motilitesi azalır, ince bağırsağın ters peristaltizmi proksimal içeriği mideye geri iter. Parasempatik etkiyle HCO₃⁻\'ten zengin tükürük, sempatik etkiyle terleme ve taşikardi olur. [[K1 s. 288]]';
    let ph = 0, tt = 0, play = false;
    const RMT = [2, 0.67, 3.2];
    if (RM) tt = RMT[0];
    el.innerHTML = `<div class="btn-row">${segH('Evre', 'p', [[0, 'Atım öncesi'], [1, 'Öğürme'], [2, 'Atım']], 0)}<button type="button" class="btn f63-play" aria-pressed="false">Oynat</button></div>
      <div class="f63-sv"></div>${barH('Göğüs içi basınç (nitel)', 'th', 15)}${barH('Karın içi basınç (nitel)', 'ab', 15)}${barH('Mide pH\'ı (nitel)', 'ph', 15, 'c-basic')}`;
    const sv = el.querySelector('.f63-sv'), pb = el.querySelector('.f63-play');
    const w = izle(el, () => draw());
    const draw = () => {
      const nar = w.nar; sade(nar); K = 1.14; const T = RM ? RMT[ph] : tt;
      const pulse = ph === 1 ? (1 - Math.cos(2 * Math.PI * 3 * T / 4)) / 2 : 0;
      const sud = ph === 2 ? ez(cl((T - 0.6) / 0.8, 0, 1)) : 0;
      const insp = ph === 1 ? ez(cl(T / 0.7, 0, 1)) : ph === 2 ? 1 : 0;
      const dia = 8 * pulse + (ph === 2 ? 16 * sud : 0) + insp * 6;
      const abd = ph === 1 ? 8 + 6 * pulse : ph === 2 ? 8 + 14 * sud : 0;
      let s = '';
      // göğüs / akciğer
      s += el2(236, 198, 60 + insp * 5, 54 + insp * 4, { f: 'chip', s: 'muted', op: 0.9 }) + tx(236, 204, 'Akciğer', { c: 'muted', b: 1 });
      [150, 185, 220].forEach((y) => { s += pa(`M262 ${y - 28}Q${290 + insp * 8} ${y - 6} ${264} ${y + 8}`, { s: 'muted', sw: 1.4 }); });
      s += tx(332, 140, 'interkostal|kaslar', { fs: 11, c: 'muted', a: 'middle', op: 1 });
      // baş
      s += el2(200, 56, 52, 44, { f: 'paper', s: 'ink' });
      s += rc(238, 58, 34, 18, { f: 'crit-soft', s: 'ink', sw: 1.2, rx: 6 }) + tx(305, 70, 'ağız', { fs: 11 });
      s += rc(212, 36, 30, 12, { f: ph === 2 ? 'ok-soft' : 'chip', s: 'muted', sw: 1, rx: 3 }) + tx(298, 46, 'nazofarinks', { fs: 11, c: 'muted' });
      s += ph === 2 ? pa('M214 54Q232 46 244 40', { s: 'ok', sw: 4 }) + tx(292, 22, 'yumuşak damak kapalı', { fs: 11, c: 'ok', b: 1 }) : pa('M214 54Q226 62 232 74', { s: 'ink', sw: 3 }) + tx(292, 22, 'yumuşak damak', { fs: 11, c: 'muted' });
      // trakea, özofagus, glottis
      s += rc(204, 100, 14, 90, { f: 'chip', s: 'muted', sw: 1.2, rx: 4 });
      const ew = 12 - 6 * (ph === 1 ? pulse : 0);
      s += rc(190 - ew / 2, 98, ew, 168, { f: ph === 2 ? 'warn-soft' : 'paper', s: 'ink', sw: 1.5, rx: 4 });
      const gc = ph >= 1;
      s += rc(201, 96, 20, 6, { f: gc ? 'accent' : 'paper', s: 'accent-ink', sw: 1.3, rx: 3 });
      s += tx(246, 106, gc ? 'glottis kapalı' : 'glottis', { a: 'start', fs: 11, c: gc ? 'accent-ink' : 'muted', b: gc });
      s += tx(246, 150, 'trakea', { a: 'start', fs: 11, c: 'muted' });
      s += tx(170, 150, 'özofagus', { a: 'end', fs: 11, c: 'muted' });
      // diyafram
      s += pa(`M150 ${264 + dia * 0.4}Q230 ${238 + dia} 312 ${264 + dia * 0.4}`, { s: 'ink', sw: 3.2 }) + tx(140, 262 + dia * 0.4, 'diyafram', { a: 'end', fs: 11 });
      // LOS
      const los = ph === 2;
      s += ci(190, 268 + dia * 0.4, 7, { f: los ? 'paper' : 'accent', s: 'accent-ink', sw: 1.6, d: los ? '3 2' : null }) + tx(170, 282 + dia * 0.4, 'LOS', { a: 'end', fs: 11, b: 1, c: 'accent-ink' });
      // mide, pilor, bağırsak
      const sk = ph === 2 ? 0.92 : 1;
      s += el2(214, 335, 62 * sk, 42 * sk, { f: 'crit-soft', s: 'ink', rot: -18 });
      s += tx(160, 345, 'mide', { a: 'end', fs: 11.5, b: 1, c: 'crit' });
      s += rc(262, 348, 8 + (ph === 2 ? 6 : 0), 22, { f: ph === 2 ? 'warn-soft' : 'chip', s: ph === 2 ? 'warn' : 'ink', sw: 1.4, rx: 2 }) + tx(266, 388, 'pilor', { fs: 11, c: ph === 2 ? 'warn' : 'muted', b: ph === 2 });
      s += pa('M270 360L300 360Q316 360 316 376Q316 392 296 392Q276 392 280 408Q286 420 310 418', { s: 'muted', sw: 6, d: null }) + tx(318, 430, 'ince bağırsak', { a: 'end', fs: 11, c: 'muted' });
      // karın duvarı
      const aw = 7 + abd * 0.45;
      s += pa(`M296 ${262 + dia * 0.4}Q${338 - abd * 0.5} 340 306 410`, { s: 'accent', sw: aw }) + tx(346, 340, 'karın|kası', { fs: 11, c: 'accent-ink', b: 1 });
      // evre 0: ters peristaltizm, tükürük, terleme, kalp
      if (ph === 0) {
        s += dots([[312, 410], [292, 392], [284, 362], [262, 358], [240, 345]], T, 5, 'accent', { sp: 0.3 }) + tx(80, 392, 'ters peristaltizm|(alkali içerik mideye)', { fs: 11, c: 'accent-ink', b: 1 });
        s += Array.from({ length: 3 }, (_, i) => ci(252 + i * 6, 80 + ((T * 20 + i * 9) % 22), 2.6, { f: 'c-basic' })).join('') + tx(300, 96, 'tükürük', { fs: 11, c: 'c-basic', b: 1 });
        s += ci(152, 60 + ((T * 14) % 16), 3, { f: 'c-basic', op: 0.9 }) + tx(96, 30, 'terleme', { fs: 11, c: 'c-basic', b: 1 });
        const hb = 1 + 0.18 * Math.sin(T * 9); s += `<text x="60" y="${n(210)}" font-size="${n(26 * hb)}" text-anchor="middle" style="fill:var(--crit)">♥</text>` + tx(60, 232, 'taşikardi', { fs: 11, c: 'crit', b: 1 });
      }
      if (ph === 1) {
        s += Array.from({ length: 8 }, (_, i) => ci(190 + Math.cos(T * 3 + i * 0.8) * 34, 322 + Math.sin(T * 3.4 + i * 1.3) * 18, 3, { f: i % 2 ? 'accent' : 'crit', s: 'paper', sw: 0.5 })).join('');
        s += tx(110, 392, 'mide + ince bağırsak|içeriği karışır', { fs: 11, c: 'accent-ink', b: 1 });
        if (pulse > 0.5) s += tx(110, 190, 'kasılma', { fs: 11, c: 'accent-ink', b: 1 });
      }
      if (ph === 2) {
        const path = [[220, 332], [196, 290], [190, 268], [190, 120], [212, 86], [244, 72], [286, 74], [316, 90]];
        const f = RM ? 0.7 : cl((T - 0.6) / 3, 0, 1);
        s += dots(path, 0, 6, 'warn', { f, r: 4 }) + tx(94, 190, 'içerik yukarı|(ters peristaltizm)', { fs: 11, c: 'warn', b: 1 });
      }
      sv.innerHTML = svgW(360, 440, 'Gövde yan kesiti: baş, özofagus, akciğerler, diyafram, mide ve karın duvarı; kusmanın üç evresi', s, 440);
      const th = ph === 0 ? 15 : ph === 1 ? 35 + 40 * pulse : 80, ab = ph === 0 ? 15 : ph === 1 ? 30 + 35 * pulse : 40 + 60 * sud;
      const pH = ph === 0 ? 15 : ph === 1 ? 15 + 45 * ez(cl(T / 3, 0, 1)) : 62;
      setBar(el, 'th', th, niteller(th)); setBar(el, 'ab', ab, niteller(ab)); setBar(el, 'ph', pH, pH < 30 ? 'asidik' : 'yükselir');
    };
    const setPh = (i) => { ph = i; tt = RM ? RMT[i] : 0; basSec(el, 'p', i); setCap(el, i === 0 ? EKS : CAP[i]); draw(); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-p]'); if (b) { play = false; pb.textContent = 'Oynat'; pb.setAttribute('aria-pressed', 'false'); return setPh(+b.dataset.p); }
      if (e.target.closest('.f63-play')) {
        if (RM) return setPh((ph + 1) % 3);
        play = !play; pb.textContent = play ? 'Duraklat' : 'Oynat'; pb.setAttribute('aria-pressed', String(play));
      }
    });
    draw();
    const stop = ticker(el, (dt) => {
      if (RM) return; tt += dt;
      if (tt >= 4) { if (play) { setPh((ph + 1) % 3); } else tt -= 4; }
      draw();
    });
    return () => { stop(); w.stop(); };
  };

})();
