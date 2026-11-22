/* Fizyoloji Bölüm 32 · Kardiyak iskemi · bileşenler (K1 s. 141–144). Tarif: docs/tasarim/fiz32.md
   1 f32_oer        arz–talep: organ OER'leri, egzersiz ve koroner darlık
   2 f32_aks        troponin + ölçütler + ST: AKS ve MI tanısı karar aracı
   3 f32_yansiyan   yansıyan kardiyak ağrı yolu; diyabet ve kalp nakli
   4 f32_tikanma    plak yırtılması, kısmi/tam tıkanma, subendokardiyal/transmural, ST
   5 f32_ekg        bölge – derivasyon – arter – komplikasyon haritası
   6 f32_yol        troponin yüksek: tip 1 tedavi yolu, tip 2 MI / miyokard hasarı
   7 f32_iri        iskemi–reperfüzyon hasarı adımları ve komplikasyonlar
   8 f32_onkos      ön koşullandırma türleri ve enfarktüs alanı
   Modeller şematiktir; sayfadaki viz-foot notları bunu söyler. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;

  /* ---------- ortak ---------- */
  const DAR = 560;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2);
  const r1 = (v) => Math.round(v * 10) / 10;
  const fmt = (v, d = 1) => (Math.round(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d).replace('.', ',');
  const T = (x, y, cls, s, a, ek = '') => `<text x="${r1(x)}" y="${r1(y)}" class="${cls}"${a ? ` text-anchor="${a}"` : ''}${ek}>${s}</text>`;
  const Ln = (x1, y1, x2, y2, cls, ek = '') => `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" class="${cls}"${ek}/>`;
  const Rc = (x, y, w, h, cls, ek = '') => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(Math.max(0, w))}" height="${r1(Math.max(0, h))}" class="${cls}"${ek}/>`;
  const svgAc = (W, H, cls, etiket, ic) => `<svg class="f32-svg ${cls}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${etiket}">${ic}</svg>`;
  const at = (e, o) => { if (e) for (const k in o) e.setAttribute(k, typeof o[k] === 'number' ? r1(o[k]) : o[k]); };
  const segHtml = (ad, key, opts, cur) => `<div class="f32-segk"><span>${ad}</span><div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div></div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const capYazici = (el) => {
    const v = el.closest('.viz'), cap = v && v.querySelector('.viz-cap');
    const ilk = cap ? cap.innerHTML : '';
    let son = null;
    return (h) => {
      const html = h == null ? ilk : REF(h);
      if (cap && html !== son) { cap.innerHTML = html; son = html; }
    };
  };
  const genislikIzle = (el, cb) => {
    if (!('ResizeObserver' in window)) return () => {};
    let son = el.clientWidth < DAR;
    const ro = new ResizeObserver(() => { const d = el.clientWidth < DAR; if (d !== son) { son = d; cb(); } });
    ro.observe(el);
    return () => ro.disconnect();
  };
  const darMi = (el) => { const d = el.clientWidth > 0 && el.clientWidth < DAR; el.classList.toggle('f32-dar', d); return d; };
  /* kelime sarma: '|' zorunlu satır sonu, n = satırdaki en çok karakter */
  const sar = (s, n) => {
    const out = [];
    String(s).split('|').forEach((par) => {
      let cur = '';
      par.trim().split(/\s+/).forEach((w) => {
        if (!cur) cur = w;
        else if ((cur + ' ' + w).length <= n) cur += ' ' + w;
        else { out.push(cur); cur = w; }
      });
      if (cur) out.push(cur);
    });
    return out;
  };
  const harf = (w, fs) => Math.max(4, Math.floor(w / (fs * 0.56)));
  const tsp = (lines, x, y0, lh) => lines.map((l, i) => `<tspan x="${r1(x)}" y="${r1(y0 + i * lh)}">${l}</tspan>`).join('');
  /* sayısal geçiş; RM'de anında */
  const tween = (ciz, sure = 300) => {
    let raf = 0, cur = null;
    const f = (hedef, aninda) => {
      cancelAnimationFrame(raf);
      if (RM || !cur || aninda) { cur = { ...hedef }; ciz(cur); return; }
      const bas = { ...cur }, t0 = performance.now();
      const adim = (t) => {
        const k = ease(Math.min(1, (t - t0) / sure));
        for (const key in hedef) cur[key] = lerp(bas[key] ?? hedef[key], hedef[key], k);
        ciz(cur);
        if (k < 1) raf = requestAnimationFrame(adim);
      };
      raf = requestAnimationFrame(adim);
    };
    f.dur = () => cancelAnimationFrame(raf);
    f.cur = () => cur;
    return f;
  };
  /* adım denetimi: Önceki / Sonraki / Oynat ve tıklanabilir .phase göstergesi */
  const adimHtml = (adlar) => `<div class="f32-adim"><div class="btn-row f32-adim-dug"><button type="button" class="btn ghost" data-a="geri">‹ Önceki</button><button type="button" class="btn" data-a="ileri">Sonraki ›</button>${RM ? '' : '<button type="button" class="btn ghost" data-a="oyn" aria-pressed="false">Oynat</button>'}</div>
    <div class="phase f32-faz" role="group" aria-label="Adımlar">${adlar.map((a, i) => `<button type="button" data-i="${i}" aria-pressed="false" aria-label="Adım ${i + 1}: ${a}"><b>${i + 1}</b><span>${a}</span></button>`).join('')}</div></div>`;
  /* olay yöneticisi; el üzerinde bir kez bağlanır, yeniden çizimde korunur */
  const adimci = (el, n, sureMs, git) => {
    let i = 0, tm = 0;
    const faz = () => {
      el.querySelectorAll('.f32-faz button').forEach((b, k) => {
        b.classList.toggle('on', k === i); b.classList.toggle('past', k < i); b.setAttribute('aria-pressed', String(k === i));
      });
      const o = el.querySelector('[data-a="oyn"]');
      if (o) { o.setAttribute('aria-pressed', String(!!tm)); o.textContent = tm ? 'Duraklat' : 'Oynat'; }
    };
    const dur = () => { if (tm) { clearInterval(tm); tm = 0; } faz(); };
    const set = (k) => { i = clamp(k, 0, n - 1); faz(); git(i); };
    const oyn = () => {
      if (tm) { dur(); return; }
      if (i >= n - 1) set(0);
      tm = setInterval(() => { if (i >= n - 1) { dur(); return; } set(i + 1); if (i >= n - 1) dur(); }, sureMs);
      faz();
    };
    const tik = (e) => {
      const a = e.target.closest('[data-a]'), f = e.target.closest('.f32-faz button');
      if (a && el.contains(a)) {
        if (a.dataset.a === 'geri') { dur(); set(i - 1); }
        else if (a.dataset.a === 'ileri') { dur(); set(i + 1); }
        else if (a.dataset.a === 'oyn') oyn();
      } else if (f && el.contains(f)) { dur(); set(+f.dataset.i); }
    };
    el.addEventListener('click', tik);
    return { set, faz, i: () => i, temizle: () => { if (tm) clearInterval(tm); tm = 0; el.removeEventListener('click', tik); } };
  };
  /* şematik EKG kompleksi: x0..x0+w, taban yb, genlik a; st ve t yukarı pozitif (genliğin katı) */
  const ekgYol = (x0, w, yb, a, st, t, qrs = 1) => {
    const X = (u) => r1(x0 + u * w), Y = (v) => r1(yb - v * a);
    const Tt = st + t;
    return `M${X(0)},${Y(0)} L${X(0.05)},${Y(0)} Q${X(0.11)},${Y(0.2)} ${X(0.17)},${Y(0)} L${X(0.25)},${Y(0)} L${X(0.27)},${Y(-0.1)} L${X(0.31)},${Y(qrs)} L${X(0.35)},${Y(-0.28)} L${X(0.38)},${Y(st)} C${X(0.47)},${Y(st)} ${X(0.56)},${Y(Tt)} ${X(0.65)},${Y(Tt)} C${X(0.73)},${Y(Tt)} ${X(0.79)},${Y(0)} ${X(0.87)},${Y(0)} L${X(1)},${Y(0)}`;
  };
  const heartYol = (cx, cy, s) => `M${r1(cx)},${r1(cy + s * 0.95)} C${r1(cx - s * 1.35)},${r1(cy + s * 0.1)} ${r1(cx - s * 0.95)},${r1(cy - s * 0.95)} ${r1(cx)},${r1(cy - s * 0.35)} C${r1(cx + s * 0.95)},${r1(cy - s * 0.95)} ${r1(cx + s * 1.35)},${r1(cy + s * 0.1)} ${r1(cx)},${r1(cy + s * 0.95)} Z`;
  const okMarker = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" class="f32-okuc"/></marker></defs>`;

  /* =====================================================================
     1 · Arz ve talep: egzersiz ve koroner darlık
     ===================================================================== */
  VIZ.f32_oer = (el) => {
    const capY = capYazici(el);
    const TAVAN = { yok: 5, orta: 2.5, ciddi: 1.5 }, DARL = { yok: 0, orta: 0.5, ciddi: 0.75 };
    const ORG = [
      { ad: 'Kalp', a: 60, b: 60, et: '%60 · maksimuma yakın', k: 'kalp' },
      { ad: 'Karaciğer', a: 50, b: 50, et: '≈ %50' },
      { ad: 'Böbrek', a: 15, b: 15, et: '≈ %15' },
      { ad: 'İskelet kası', a: 10, b: 100, et: '%10–100 · etkinliğe göre', k: 'aralik' },
    ];
    const s = { x: 1, d: 'yok' };
    let G = null, R = {};
    const P = []; for (let k = 0; k < 26; k++) P.push({ u: k / 26 + Math.random() * 0.02, v: Math.random() * 1.6 - 0.8 });

    const solSvg = (dar) => {
      const W = dar ? 360 : 300, H = dar ? 196 : 300;
      const bx0 = 12, bx1 = W - 14, y0 = dar ? 54 : 84, dy = dar ? 32 : 50;
      const X = (p) => bx0 + (p / 100) * (bx1 - bx0);
      const tickY = y0 + 4 * dy - (dar ? 6 : 10);
      let h = T(bx0, 20, 'f32-bas', 'Organlarda OER') + T(bx0, 38, 'f32-tk', 'OER = VO2 / DO2');
      for (let p = 0; p <= 100; p += 20) h += Ln(X(p), y0 - 14, X(p), tickY, 'f32-izg') + T(X(p), tickY + 14, 'f32-tk', '%' + p, p === 0 ? 'start' : p === 100 ? 'end' : 'middle');
      ORG.forEach((o, i) => {
        const y = y0 + i * dy, kal = o.k === 'kalp';
        h += `<text x="${bx0}" y="${y}" class="f32-lb${kal ? ' f32-crt' : ''}"><tspan class="f32-lbb">${o.ad}</tspan>  ${o.et}</text>`;
        const bh = kal ? 13 : 10, by = y + 5;
        if (o.k === 'aralik') {
          h += Rc(X(o.a), by, X(o.b) - X(o.a), bh, 'f32-bar-ara', ' rx="2"') + Ln(X(o.a), by - 3, X(o.a), by + bh + 3, 'f32-centik') + Ln(X(o.b), by - 3, X(o.b), by + bh + 3, 'f32-centik');
        } else h += Rc(X(0), by, X(o.b) - X(0), bh, kal ? 'f32-bar-kalp' : 'f32-bar-org', ' rx="2"');
      });
      return svgAc(W, H, 'f32-oer-sol', 'Organlara göre oksijen ekstraksiyon oranı: kalp yüzde 60, karaciğer yüzde 50, böbrek yüzde 15, iskelet kası yüzde 10–100', h);
    };
    const sagGeo = (dar) => (dar
      ? { W: 360, H: 262, ax: 40, y0: 166, y5: 44, xt: 92, xs: 206, bw: 70, ly: 184, tx0: 22, tx1: 342, tyc: 232, th: 11 }
      : { W: 420, H: 300, ax: 52, y0: 196, y5: 50, xt: 128, xs: 252, bw: 80, ly: 214, tx0: 40, tx1: 404, tyc: 266, th: 13 });
    const sagSvg = (g) => {
      const Y = (v) => g.y0 - (v / 5) * (g.y0 - g.y5);
      let h = `<defs><pattern id="f32-oer-tar" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" class="f32-tar-z"/><line x1="0" y1="0" x2="0" y2="7" class="f32-tar-c"/></pattern></defs>`;
      h += T(8, 20, 'f32-bas', 'Kalp: talep ve akım');
      for (let v = 0; v <= 5; v++) h += Ln(g.ax, Y(v), g.xs + g.bw + 16, Y(v), 'f32-izg') + T(g.ax - 6, Y(v) + 4, 'f32-tk', v + '×', 'end');
      h += Ln(g.ax, g.y5 - 6, g.ax, g.y0, 'f32-eks');
      h += `<rect class="f32-bar-tal" data-r="tal" x="${g.xt}" width="${g.bw}" rx="3"/><rect class="f32-bar-def" data-r="def" x="${g.xt}" width="${g.bw}"/><rect class="f32-bar-sun" data-r="sun" x="${g.xs}" width="${g.bw}" rx="3"/>`;
      h += `<text class="f32-tk2" data-r="vt" x="${g.xt + g.bw / 2}" text-anchor="middle"></text><text class="f32-tk2" data-r="vs" x="${g.xs + g.bw / 2}" text-anchor="middle"></text>`;
      h += `<line class="f32-tavan" data-r="tav" x1="${g.ax}" x2="${g.W - 8}"/><text class="f32-tk" data-r="tavt" x="${g.W - 8}" text-anchor="end">akım tavanı</text>`;
      h += `<text class="f32-lb f32-wrn" text-anchor="middle">${tsp(['Talep', '(VO2)'], g.xt + g.bw / 2, g.ly, 15)}</text><text class="f32-lb f32-okt" text-anchor="middle">${tsp(['Koroner akımla', 'sunum (DO2)'], g.xs + g.bw / 2, g.ly, 15)}</text>`;
      h += `<g data-r="rz" class="f32-rozet"><rect x="${g.W - 176}" y="5" width="170" height="22" rx="6"/><text x="${g.W - 91}" y="20" text-anchor="middle">İSKEMİ: VO2 &gt; DO2</text></g>`;
      h += `<path class="f32-plak" data-r="plk"/><path class="f32-lumen" data-r="lum"/><path class="f32-duvar" data-r="dv"/><g data-r="nok"></g>`;
      h += T(g.tx0, g.tyc - g.th * 1.25 - 6, 'f32-tk', 'koroner arter');
      return svgAc(g.W, g.H, 'f32-oer-sag', 'Kalbin oksijen talebi ve koroner akımla sunumu; darlıkta akım tavanı', h);
    };

    const kur = () => {
      const dar = darMi(el);
      G = sagGeo(dar);
      el.innerHTML = `<div class="f32-oer-iz"><div>${solSvg(dar)}</div><div>${sagSvg(G)}</div></div>
        <div class="f32-ctl">
          <label class="f32-rng"><span>Miyokard talebi (istirahatin katı) <b data-r="xv">1,0×</b></span>
            <input type="range" min="1" max="5" step="0.5" value="${s.x}" aria-label="Miyokard talebi, istirahatin katı">
            <small><span>1× istirahat</span><span>5× ağır egzersiz</span></small></label>
          ${segHtml('Koroner arter', 'd', [['yok', 'Darlık yok'], ['orta', 'Orta darlık'], ['ciddi', 'Ciddi darlık']], s.d)}
        </div>`;
      R = {}; el.querySelectorAll('[data-r]').forEach((e) => { R[e.dataset.r] = e; });
      R.nokS = '';
      R.nok.innerHTML = P.map(() => '<circle r="2.6" class="f32-nokta"/>').join('');
      R.noks = [...R.nok.children];
      tw.dur(); tw(hedef(), true);
    };
    const hedef = () => { const tav = TAVAN[s.d]; return { x: s.x, sun: Math.min(s.x, tav), tav, D: DARL[s.d] }; };
    const yari = (u, c) => { // lümen yarı genişliği (u: 0..1 boru boyunca)
      const dil = 1 + 0.2 * (c.sun - 1) / 4;
      const z = (u - 0.5) / 0.13, bump = Math.abs(z) < 1 ? (1 + Math.cos(Math.PI * z)) / 2 : 0;
      return { h0: G.th * dil, h: G.th * dil * (1 - c.D * bump) };
    };
    const ciz = (c) => {
      const g = G, Y = (v) => g.y0 - (v / 5) * (g.y0 - g.y5);
      at(R.tal, { y: Y(c.x), height: g.y0 - Y(c.x) });
      at(R.sun, { y: Y(c.sun), height: g.y0 - Y(c.sun) });
      const def = c.x - c.sun;
      at(R.def, { y: Y(c.x), height: Math.max(0, Y(c.sun) - Y(c.x)) });
      R.def.style.opacity = def > 0.05 ? 1 : 0;
      R.rz.style.opacity = def > 0.05 ? 1 : 0;
      at(R.vt, { y: Y(c.x) - 6 }); R.vt.textContent = fmt(c.x) + '×';
      at(R.vs, { y: Y(c.sun) - 6 }); R.vs.textContent = fmt(c.sun) + '×';
      at(R.tav, { y1: Y(c.tav), y2: Y(c.tav) }); at(R.tavt, { y: Y(c.tav) - 5 });
      // boru
      const N = 48, ust = [], alt = [], ust0 = [], alt0 = [];
      for (let k = 0; k <= N; k++) {
        const u = k / N, x = g.tx0 + u * (g.tx1 - g.tx0), w = yari(u, c);
        ust.push([x, g.tyc - w.h]); alt.push([x, g.tyc + w.h]); ust0.push([x, g.tyc - w.h0]); alt0.push([x, g.tyc + w.h0]);
      }
      const pl = (a) => a.map((p, k) => (k ? 'L' : 'M') + r1(p[0]) + ',' + r1(p[1])).join(' ');
      const rv = (a) => a.slice().reverse().map((p) => 'L' + r1(p[0]) + ',' + r1(p[1])).join(' ');
      R.lum.setAttribute('d', pl(ust) + ' ' + rv(alt) + ' Z');
      R.plk.setAttribute('d', pl(ust0) + ' ' + rv(ust) + ' Z ' + pl(alt) + ' ' + rv(alt0) + ' Z');
      const dw = 4;
      R.dv.setAttribute('d', pl(ust0.map((p) => [p[0], p[1] - dw / 2])) + ' ' + pl(alt0.map((p) => [p[0], p[1] + dw / 2])));
      noktaCiz(0);
    };
    const noktaCiz = (dt) => {
      const c = tw.cur(); if (!c || !R.noks) return;
      const hiz = 0.05 * c.sun;
      P.forEach((p, k) => {
        const w = yari(p.u, c);
        p.u += (dt * hiz * w.h0) / Math.max(2, w.h);
        if (p.u > 1) { p.u -= 1; p.v = Math.random() * 1.6 - 0.8; }
        at(R.noks[k], { cx: G.tx0 + p.u * (G.tx1 - G.tx0), cy: G.tyc + p.v * w.h * 0.8 });
      });
    };
    const tw = tween(ciz, 300);
    const yaz = () => {
      const tav = TAVAN[s.d], x = fmt(s.x);
      if (s.x > tav) capY(`<b>İskemi.</b> Darlık akımı ≈ ${fmt(tav)}× ile sınırlıyor; talep ${x}×. Ekstraksiyon artamadığı için VO2 ile DO2 uyumsuzlaşır: miyokard iskemisi. [[K1 s. 141]]`);
      else if (s.d !== 'yok') capY(`<b>Darlık, istirahatte sessiz.</b> Talep ${x}× akım tavanının altında; iskemi ancak talep tavanı aşınca ortaya çıkar. [[K1 s. 141]]`);
      else if (s.x > 1) capY(`<b>Egzersiz.</b> Talep ${x}× istirahat; OER zaten ≈ %60 olduğundan ek oksijen koroner vazodilatasyonla artan akımdan gelir (en çok ≈ 5×). [[K1 s. 141]]`);
      else capY(null);
      if (R.xv) R.xv.textContent = x + '×';
    };
    const guncelle = () => { tw(hedef()); yaz(); };
    const giris = (e) => { if (e.target.type === 'range') { s.x = +e.target.value; guncelle(); } };
    const tik = (e) => { const b = e.target.closest('[data-d]'); if (b) { s.d = b.dataset.d; basSec(el, 'd', s.d); guncelle(); } };
    el.addEventListener('input', giris); el.addEventListener('click', tik);
    kur(); yaz();
    const stopT = RM ? () => {} : ticker(el, (dt) => noktaCiz(dt));
    const stopG = genislikIzle(el, () => { kur(); yaz(); });
    return () => { stopT(); stopG(); tw.dur(); el.removeEventListener('input', giris); el.removeEventListener('click', tik); };
  };

  /* =====================================================================
     2 · Troponin, ölçütler, ST segmenti: hangi tanı?
     ===================================================================== */
  const MINI = {
    normal: 'M2,20 L8,20 Q11,16 14,20 L20,20 L22,22 L25,4 L28,25 L30,20 L36,20 Q42,12 48,20 L58,20',
    ste: 'M2,20 L8,20 Q11,16 14,20 L20,20 L22,22 L25,4 L28,13 Q36,5 44,11 Q49,18 52,20 L58,20',
    lbbb: 'M2,20 L5,20 Q8,16 11,20 L15,20 L18,8 L22,11 L26,5 L31,22 L33,20 Q40,27 47,20 L58,20',
    std: 'M2,18 L8,18 Q11,14 14,18 L20,18 L22,20 L25,3 L28,25 L30,23 L38,23 Q44,30 50,18 L58,18',
    q: 'M2,15 L8,15 Q11,11 14,15 L18,15 L21,27 L25,4 L28,17 L34,15 Q40,8 46,15 L58,15',
  };
  const mini = (k) => `<svg class="f32-mini" viewBox="0 0 60 30" aria-hidden="true"><line x1="0" y1="${k === 'q' ? 15 : k === 'std' ? 18 : 20}" x2="60" y2="${k === 'q' ? 15 : k === 'std' ? 18 : 20}" class="f32-izo"/><path d="${MINI[k]}" class="f32-mini-iz"/></svg>`;
  VIZ.f32_aks = (el) => {
    const capY = capYazici(el);
    const s = { tr: 'alt', c: [false, false, false, false], st: 'yok', oto: false };
    const OL = ['Tipik anjinal belirtiler', 'Yeni anlamlı ST/T değişikliği ya da yeni LBBB', 'Patolojik Q dalgaları (yerleşik enfarktüs)', 'Ekoda yeni bölgesel duvar hareket anormalliği'];
    const ST = [['yok', 'Değişiklik yok', 'normal'], ['ste', 'ST elevasyonu', 'ste'], ['lbbb', 'Yeni LBBB', 'lbbb'], ['std', 'ST depresyonu / T negatifliği', 'std']];
    let R = {}, son = '';
    const karar = () => {
      const n = s.c.filter(Boolean).length, ust = s.tr === 'ust';
      if (!ust) {
        if (n === 0) return { k: 'yok', b: 'AKS lehine bulgu yok', g: 'Troponin normal ve eşlik eden bulgu yok. [[K1 s. 141]]', y: -1 };
        if (s.c[0] || s.c[1]) return { k: 'isk', b: 'Nekroz kanıtı olmayan iskemi', g: "Kararsız ya da kreşendo anjina: AKS'nin bir bileşenidir ama troponin yükselmediği için MI değildir. [[K1 s. 141]]", y: 0 };
        return { k: 'yok', b: 'MI tanısı yok', g: 'MI tanısı nekroz kanıtı, yani troponin yüksekliği ister. [[K1 s. 141]]', y: -1 };
      }
      if (n === 0) return { k: 'yok', b: 'MI ölçütü karşılanmıyor', g: 'Troponin tek başına yetmez; en az bir ölçüt gerekir. Yüksek troponin miyokard hasarından da olabilir (sepsis, miyokardit, katekolamin artışı, sağ ventrikül zorlanması). [[K1 s. 141, 143]]', y: -1 };
      if (s.st === 'ste') return { k: 'mi', b: 'STEMI', g: `Troponin + ${n} ölçüt; ST elevasyonu. Acil primer PCI. [[K1 s. 141, 143]]`, y: 2 };
      if (s.st === 'lbbb') return { k: 'mi', b: 'MI · yeni LBBB', g: `Troponin + ${n} ölçüt; yeni LBBB, STEMI gibi acil primer PCI gerektirir. [[K1 s. 141, 143]]`, y: 2 };
      return { k: 'mi', b: 'NSTEMI', g: `Troponin + ${n} ölçüt; ST elevasyonu yok. [[K1 s. 141]]`, y: 1 };
    };
    const seritSvg = (dar) => {
      const kut = [['Nekroz kanıtı olmayan iskemi', '(kararsız / kreşendo anjina)'], ['NSTEMI'], ['STEMI']];
      let h = '';
      if (dar) {
        kut.forEach((k, i) => {
          const y = 4 + i * 50;
          h += `<g class="f32-ys" data-y="${i}">${Rc(4, y, 352, 42, 'f32-ys-k', ' rx="8"')}<text class="f32-ys-t" text-anchor="middle">${tsp(k, 180, y + (k.length > 1 ? 18 : 26), 16)}</text></g>`;
        });
        return svgAc(360, 154, 'f32-aks-serit', 'AKS yelpazesi: nekroz kanıtı olmayan iskemi, NSTEMI, STEMI', h);
      }
      kut.forEach((k, i) => {
        const x = 4 + i * 226;
        h += `<g class="f32-ys" data-y="${i}">${Rc(x, 6, 218, 58, 'f32-ys-k', ' rx="8"')}<text class="f32-ys-t" text-anchor="middle">${tsp(k, x + 109, k.length > 1 ? 30 : 40, 16)}</text></g>`;
      });
      return svgAc(684, 70, 'f32-aks-serit', 'AKS yelpazesi: nekroz kanıtı olmayan iskemi, NSTEMI, STEMI', h);
    };
    const kur = () => {
      const dar = darMi(el);
      el.innerHTML = `<div class="f32-aks-iz">
        <div class="f32-kart f32-aks-den">
          ${segHtml('Serum kardiyak troponin (T ya da I)', 'tr', [['alt', 'Üst referans sınırının altında'], ['ust', 'Üst referans sınırının üstünde']], s.tr)}
          <fieldset class="f32-olc"><legend>Eşlik eden ölçütler</legend>
            ${OL.map((o, i) => `<label class="f32-chk"><input type="checkbox" data-c="${i}"${s.c[i] ? ' checked' : ''}><span>${o}</span>${i === 2 ? mini('q') : ''}</label>`).join('')}
          </fieldset>
          <div class="f32-segk"><span>EKG'de ST segmenti</span><div class="seg f32-st-seg" role="group" aria-label="EKG'de ST segmenti">${ST.map(([v, l, m]) => `<button type="button" data-st="${v}" aria-pressed="${v === s.st}">${mini(m)}<span>${l}</span></button>`).join('')}</div></div>
        </div>
        <div class="f32-kart f32-aks-son" data-r="kart"><span class="f32-ust">Sonuç</span><h4 data-r="bas"></h4><p data-r="ger"></p></div>
      </div>
      <p class="f32-serit-bas">AKS yelpazesi</p>${seritSvg(dar)}`;
      R = {}; el.querySelectorAll('[data-r]').forEach((e) => { R[e.dataset.r] = e; });
      son = ''; guncelle(true);
    };
    const guncelle = (ilk) => {
      const k = karar();
      R.bas.textContent = k.b;
      R.ger.innerHTML = REF(k.g);
      R.kart.className = 'f32-kart f32-aks-son f32-son-' + k.k;
      if (!ilk && !RM && son && son !== k.b) { R.kart.classList.remove('f32-sol'); void R.kart.offsetWidth; R.kart.classList.add('f32-sol'); }
      son = k.b;
      el.querySelectorAll('.f32-ys').forEach((g) => g.classList.toggle('on', +g.dataset.y === k.y));
      const varsayilan = s.tr === 'alt' && !s.c.some(Boolean) && s.st === 'yok';
      capY(varsayilan ? null : `<b>${k.b}.</b> ${k.g}`);
    };
    const tik = (e) => {
      const t = e.target.closest('[data-tr],[data-st]');
      if (!t) return;
      if (t.dataset.tr) { s.tr = t.dataset.tr; basSec(el, 'tr', s.tr); }
      else {
        s.st = t.dataset.st; basSec(el, 'st', s.st);
        const kutu = el.querySelector('[data-c="1"]');
        if (s.st !== 'yok') { if (!s.c[1]) s.oto = true; s.c[1] = true; }
        else if (s.oto) { s.c[1] = false; s.oto = false; }
        if (kutu) kutu.checked = s.c[1];
      }
      guncelle();
    };
    const deg = (e) => { const c = e.target.closest('[data-c]'); if (c) { s.c[+c.dataset.c] = c.checked; if (+c.dataset.c === 1) s.oto = false; guncelle(); } };
    el.addEventListener('click', tik); el.addEventListener('change', deg);
    kur();
    const stopG = genislikIzle(el, kur);
    return () => { stopG(); el.removeEventListener('click', tik); el.removeEventListener('change', deg); };
  };

  /* =====================================================================
     3 · Yansıyan kardiyak ağrının yolu
     ===================================================================== */
  VIZ.f32_yansiyan = (el) => {
    const capY = capYazici(el);
    const ADIM = ['İskemi', 'Kardiyak pleksus', 'Arka boynuz', 'Yansıyan ağrı'];
    const CAP = [null,
      '<b>2 · Kardiyak pleksus.</b> Aksiyon potansiyelleri kardiyak pleksustan geçer; kalp bu afferentlerin yanında efferent sempatik ve parasempatik liflerle de innerve edilir (Bölüm 59). [[K1 s. 142]]',
      '<b>3 · Arka boynuz.</b> Afferent lifler omuriliğin arka boynuzunda sinaps yapar; aynı segmente deri afferentleri de girer. [[K1 s. 142]]',
      '<b>4 · Yansıyan ağrı.</b> İç organdan gelen yoğun uyarı, aynı segmentin dermatomundan geliyormuş gibi yorumlanır: göğüs ortasında sıkışma, baskı ya da sıkıştırılma; klasik olarak sol kola, boyna, alt çeneye yayılım. [[K1 s. 141–142]]'];
    const GCAP = {
      diyabet: '<b>Diyabet.</b> Otonom nöropati afferent sempatik nöronlarda iletimi bozabilir; MI sessiz geçebilir. [[K1 s. 142]]',
      nakil: '<b>Kalp nakli.</b> Donör kalp tümüyle denerve olduğu için iskemik ağrı sinyalinin yolu yoktur; greft koroner arterlerinde ateroskleroz hızlandığından bu gerçekten önemlidir. [[K1 s. 142]]',
      kadin: '<b>Kadınlar.</b> Tablo daha sık atipiktir; başvuru ve tanı gecikebilir. [[K1 s. 141]]',
    };
    const s = { i: RM ? 3 : 0, g: 'tipik' };
    let R = {}, L = null, faz = 0;
    // silüet koordinatları (geniş yerleşimde aynen; dar yerleşimde ölçeklenir)
    const ARM_SAG = 'M86,114 Q70,118 66,134 L48,290 Q50,304 62,304 Q72,302 74,290 L92,170 Z'; // hastanın sağ kolu (izleyenin solu)
    const ARM_SOL = 'M214,114 Q230,118 234,134 L252,290 Q250,304 238,304 Q228,302 226,290 L208,170 Z'; // hastanın sol kolu
    const GEO = {
      g: { W: 720, H: 340, ox: 0, oy: 0, sc: 1, A1: 'M182,160 C220,140 260,158 292,170', A2: 'M318,172 C400,176 470,110 551,140', B: 'M214,198 C320,292 480,252 553,144', C: 'M585,123 L585,50',
        pl: [305, 172], cord: [585, 175, 68, 50], plx: [305, 202], horn: [628, 132, 'start'], seg: [585, 248], beyne: [585, 40, 'middle'], etk: true },
      d: { W: 360, H: 408, ox: 75, oy: 2, sc: 0.7, A1: 'M199,126 C150,190 96,232 91,290', A2: 'M104,304 C150,322 182,272 220,292', B: 'M226,142 C252,200 236,262 222,290', C: 'M255,282 L255,250',
        pl: [93, 302], cord: [255, 330, 62, 46], plx: [93, 334], horn: [354, 276, 'end'], seg: [255, 398], beyne: [263, 256, 'start'], etk: false },
    };
    const P = (x, y) => [L.ox + x * L.sc, L.oy + y * L.sc];
    const kur = () => {
      const dar = darMi(el);
      L = dar ? GEO.d : GEO.g;
      const [cx, cy, rx, ry] = L.cord;
      const kal = P(168, 168);
      let h = okMarker('f32-yo');
      // silüet ve ağrı alanları (silüet grubunun içinde)
      h += `<g transform="translate(${L.ox},${L.oy}) scale(${L.sc})">
        <g class="f32-sil"><circle cx="150" cy="60" r="28"/><rect x="138" y="84" width="24" height="24" rx="4"/>
          <path d="M100,108 Q150,98 200,108 Q214,112 216,128 L206,250 Q202,300 196,330 L104,330 Q98,300 94,250 L84,128 Q86,112 100,108 Z"/>
          <path d="${ARM_SAG}"/><path d="${ARM_SOL}"/>
          <rect x="8" y="250" width="38" height="70" rx="10"/></g>
        <g data-r="zon" class="f32-zon">
          <g class="f32-zk"><ellipse cx="150" cy="165" rx="40" ry="30"/><path d="${ARM_SOL}"/><rect x="138" y="86" width="24" height="20" rx="4"/><ellipse cx="150" cy="80" rx="17" ry="7"/></g>
          <g class="f32-zo"><path d="${ARM_SAG}"/><circle cx="92" cy="117" r="12"/><circle cx="208" cy="117" r="12"/><ellipse cx="150" cy="234" rx="32" ry="18"/><rect x="14" y="262" width="26" height="46" rx="6"/></g>
        </g>
        <path d="${heartYol(168, 168, 21)}" class="f32-kalp" data-r="kalp"/>
        <path d="M160,158 Q168,174 166,190 M176,156 Q182,170 186,178" class="f32-koro" data-r="koro"/>
      </g>`;
      // yollar
      h += `<path d="${L.A1}" class="f32-yol-a" data-r="a1"/><path d="${L.A2}" class="f32-yol-a" data-r="a2"/>
        <path d="${L.B}" class="f32-yol-b" data-r="b"/><path d="${L.C}" class="f32-yol-c" data-r="c" marker-end="url(#f32-yo)"/>`;
      // pleksus ve omurilik
      const [px, py] = L.pl;
      h += `<g class="f32-plx">${[[-9, -6, 5], [3, -12, 4], [9, 2, 5], [-3, 8, 4], [13, -6, 3.5]].map(([a, b, r]) => `<circle cx="${px + a}" cy="${py + b}" r="${r}"/>`).join('')}</g>`;
      h += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" class="f32-ak"/>
        <g class="f32-gri"><ellipse cx="${cx - 22}" cy="${cy - 20}" rx="9" ry="22" transform="rotate(-35 ${cx - 22} ${cy - 20})"/><ellipse cx="${cx + 22}" cy="${cy - 20}" rx="9" ry="22" transform="rotate(35 ${cx + 22} ${cy - 20})"/>
        <ellipse cx="${cx - 24}" cy="${cy + 16}" rx="15" ry="17"/><ellipse cx="${cx + 24}" cy="${cy + 16}" rx="15" ry="17"/><rect x="${cx - 24}" y="${cy - 4}" width="48" height="11"/></g>
        <circle cx="${cx - 34}" cy="${cy - 37}" r="7" class="f32-sinaps" data-r="sin"/>`;
      const srt = P(27, 338);
      h += T(srt[0] + (dar ? -14 : 0), srt[1] + (dar ? 12 : 4), 'f32-tk', 'sırt', 'middle');
      h += T(L.plx[0], L.plx[1], 'f32-lb', 'kardiyak pleksus', 'middle') + T(L.horn[0], L.horn[1], 'f32-lb', 'arka boynuz', L.horn[2]) + T(L.seg[0], L.seg[1], 'f32-tk', 'aynı omurilik segmenti', 'middle');
      h += Ln(L.horn[2] === 'start' ? L.horn[0] - 3 : L.horn[0] - 72, L.horn[1] + 3, cx + 30, cy - 34, 'f32-kilavuz');
      h += `<text x="${L.beyne[0]}" y="${L.beyne[1]}" class="f32-lb" text-anchor="${L.beyne[2]}" data-r="bt">beyne</text>`;
      if (L.etk) h += `<text class="f32-lb f32-bsc" text-anchor="middle">${tsp(['miyelinsiz afferent', 'sempatik nöron'], 400, 106, 15)}</text>` + T(400, 290, 'f32-lb f32-acc', 'deri (dermatom) afferenti', 'middle');
      // nakil: kopuk yol işareti
      h += `<g data-r="kes" class="f32-kes"></g><g data-r="nok"></g>`;
      const sz = P(150, 212);
      h += `<g data-r="sz" class="f32-sz"><rect x="${sz[0] - 46}" y="${sz[1] - 13}" width="92" height="22" rx="6"/><text x="${sz[0]}" y="${sz[1] + 2}" text-anchor="middle" data-r="szt">sessiz MI</text></g>`;
      el.innerHTML = `${adimHtml(ADIM)}
        <div class="f32-ctl">${segHtml('Hasta grubu', 'g', [['tipik', 'Tipik'], ['diyabet', 'Diyabet'], ['nakil', 'Kalp nakli'], ['kadin', 'Kadın']], s.g)}</div>
        <div class="f32-ya-sahne">${svgAc(L.W, L.H, 'f32-ya-svg', 'İskemik kalpten afferent sempatik nöronla kardiyak pleksus üzerinden omuriliğin arka boynuzuna giden yol ve yansıyan ağrı alanları', h)}</div>
        <div class="f32-cipler" data-r="cip"><span class="f32-cip-bas">Eşlik eden belirtiler:</span>${['terleme', 'bulantı / kusma', 'dispne', 'senkop', 'yorgunluk'].map((c) => `<span class="tag">${c}</span>`).join('')}</div>
        <div class="f32-cipler" data-r="rzt"></div>
        <div class="legend"><span><i class="f32-li-a"></i>miyelinsiz afferent sempatik nöron</span><span><i class="f32-li-b"></i>deri (dermatom) afferenti</span><span><i class="f32-li-zk"></i>dolu: klasik yayılım</span><span><i class="f32-li-zo"></i>kesikli: olası yayılım</span></div>
        <p class="f32-not" data-r="not">Sessiz MI: MI'lerin yarısına kadarı belirtisiz ya da atipik; çoğunda patolojik Q gelişir; mortalite tanınan MI ile benzer. <span data-r="notref"></span></p>`;
      R = {}; el.querySelectorAll('[data-r]').forEach((e) => { R[e.dataset.r] = e; });
      R.notref.innerHTML = REF('[[K1 s. 142]]');
      R.L = {}; ['a1', 'a2', 'b', 'c'].forEach((k) => { R.L[k] = R[k].getTotalLength ? R[k].getTotalLength() : 100; });
      // kopuk yol işareti (A1 ortası)
      if (R.a1.getPointAtLength) {
        const m = R.a1.getPointAtLength(R.L.a1 * 0.5), m2 = R.a1.getPointAtLength(R.L.a1 * 0.5 + 2);
        const ang = Math.atan2(m2.y - m.y, m2.x - m.x) * 180 / Math.PI;
        R.kes.innerHTML = `<g transform="translate(${r1(m.x)},${r1(m.y)}) rotate(${r1(ang)})"><rect x="-6" y="-6" width="12" height="12" class="f32-bosluk"/><line x1="-6" y1="-8" x2="-6" y2="8"/><line x1="6" y1="-8" x2="6" y2="8"/></g>` + T(m.x + (L.etk ? 0 : 14), m.y + (L.etk ? -16 : 4), 'f32-tk f32-crt', 'denerve', L.etk ? 'middle' : 'start');
      }
      R.nok.innerHTML = Array.from({ length: 10 }, (_, k) => `<circle r="3.6" class="${k < 6 ? 'f32-nk-a' : 'f32-nk-b'}"/>`).join('');
      R.noks = [...R.nok.children];
      ad.faz(); ciz();
    };
    const ciz = () => {
      const i = s.i, g = s.g;
      const yolA = g !== 'nakil';
      R.kalp.classList.toggle('f32-isk', true);
      R.kalp.classList.toggle('f32-atar', !RM);
      R.koro.classList.toggle('f32-greft', g === 'nakil');
      const on = (e, v) => e.classList.toggle('on', v);
      on(R.a1, i >= 1 && yolA); on(R.a2, i >= 2 && yolA); on(R.b, i >= 2); on(R.c, i >= 3 && g !== 'diyabet' && g !== 'nakil');
      [R.a1, R.a2].forEach((e) => { e.classList.toggle('f32-zayif', g === 'diyabet'); });
      R.a1.classList.toggle('f32-kopuk', g === 'nakil');
      R.kes.style.display = g === 'nakil' ? '' : 'none';
      R.sin.classList.toggle('on', i >= 2);
      R.bt.classList.toggle('f32-soluk', !(i >= 3 && g !== 'diyabet' && g !== 'nakil'));
      const sessiz = g === 'diyabet' || g === 'nakil';
      R.zon.style.opacity = i >= 3 && !sessiz ? 1 : 0;
      R.zon.classList.toggle('f32-atipik', g === 'kadin');
      R.sz.style.opacity = i >= 3 && (sessiz || g === 'kadin') ? 1 : 0;
      R.szt.textContent = g === 'kadin' ? 'atipik olabilir' : 'sessiz MI';
      R.cip.style.visibility = i >= 3 ? 'visible' : 'hidden';
      R.rzt.innerHTML = g === 'nakil' ? '<span class="tag crit">denerve donör kalp</span><span class="tag warn">greft koronerlerinde hızlanmış ateroskleroz</span>'
        : g === 'diyabet' ? '<span class="tag crit">otonom nöropati: iletim bozulur</span>' : g === 'kadin' ? '<span class="tag warn">atipik olabilir</span>' : '';
      R.rzt.style.display = R.rzt.innerHTML ? '' : 'none';
      R.not.style.display = sessiz ? '' : 'none';
      capY(g !== 'tipik' ? GCAP[g] : CAP[i]);
      noktaCiz(0);
    };
    const noktaCiz = (dt) => {
      if (!R.noks) return;
      faz += dt;
      const i = s.i, g = s.g;
      const segA = i >= 3 && g !== 'diyabet' && g !== 'nakil' ? ['a1', 'a2', 'c'] : i >= 2 ? ['a1', 'a2'] : i >= 1 ? ['a1'] : [];
      const LA = segA.reduce((t, k) => t + R.L[k], 0);
      const sinir = g === 'diyabet' ? 0.5 * (R.L.a1 + R.L.a2) : Infinity;
      const nokA = !RM && g !== 'nakil' && LA > 0, nokB = !RM && i >= 2;
      R.noks.forEach((c, k) => {
        if (k < 6) {
          if (!nokA) { c.style.display = 'none'; return; }
          let d = ((faz * 95 + (k * LA) / 6) % LA);
          if (d > sinir) { c.style.display = 'none'; return; }
          let kk = 0; while (kk < segA.length - 1 && d > R.L[segA[kk]]) { d -= R.L[segA[kk]]; kk++; }
          const p = R[segA[kk]].getPointAtLength(Math.min(d, R.L[segA[kk]]));
          c.style.display = ''; c.style.opacity = g === 'diyabet' ? clamp(1 - d / sinir, 0.2, 0.9) : 1;
          at(c, { cx: p.x, cy: p.y });
        } else {
          if (!nokB) { c.style.display = 'none'; return; }
          const d = ((faz * 95 + ((k - 6) * R.L.b) / 4) % R.L.b), p = R.b.getPointAtLength(d);
          c.style.display = ''; at(c, { cx: p.x, cy: p.y });
        }
      });
    };
    const ad = adimci(el, 4, 2500, (i) => { s.i = i; ciz(); });
    const tik = (e) => { const b = e.target.closest('[data-g]'); if (b) { s.g = b.dataset.g; basSec(el, 'g', s.g); ciz(); } };
    el.addEventListener('click', tik);
    kur(); ad.set(s.i);
    const stopT = RM ? () => {} : ticker(el, noktaCiz);
    const stopG = genislikIzle(el, kur);
    return () => { stopT(); stopG(); ad.temizle(); el.removeEventListener('click', tik); };
  };

  /* =====================================================================
     4 · Plak yırtılmasından enfarktüse: kısmi ve tam tıkanma
     ===================================================================== */
  VIZ.f32_tikanma = (el) => {
    const capY = capYazici(el);
    const ADIM = ['Plak yırtılması', 'Trombüs', 'Enfarktüs'];
    const CAP2 = '<b>2 · Trombüs.</b> Hasarlı lümenin çevresinde trombüs hızla oluşur; olguların çoğu bu yolla başlar (tip 1 MI: primer koroner olay; koroner diseksiyon da olabilir). [[K1 s. 142]]';
    const CAP3 = { kismi: '<b>3 · Kısmi tıkanma.</b> Kısmi kat (subendokardiyal) MI: EKG\'de ST depresyonu ve/veya T dalgası negatifliği. [[K1 s. 142]]', tam: '<b>3 · Tam tıkanma.</b> Tam kat (transmural) MI: EKG\'de ST elevasyonu. [[K1 s. 142]]' };
    const s = { i: RM ? 2 : 0, t: 'kismi' };
    let R = {}, G = null;
    const P = []; for (let k = 0; k < 22; k++) P.push({ u: Math.random(), v: Math.random() * 1.7 - 0.85, z: Math.random() });
    const GEO = {
      g: { W: 720, H: 300, a: { x0: 14, x1: 250, yc: 128, lh: 34, dw: 14, t: [14, 30] }, v: { cx: 382, cy: 150, ro: 84, ri: 48, t: [382, 30] }, e: { x0: 512, w: 196, yb: 160, a: 70, t: [610, 30] }, lbY: 268 },
      d: { W: 360, H: 440, a: { x0: 14, x1: 346, yc: 104, lh: 34, dw: 14, t: [14, 30] }, v: { cx: 92, cy: 312, ro: 74, ri: 42, t: [92, 214] }, e: { x0: 192, w: 160, yb: 320, a: 62, t: [272, 214] }, lbY: 420 },
    };
    const kur = () => {
      const dar = darMi(el);
      G = dar ? GEO.d : GEO.g;
      const A = G.a, V = G.v, E = G.e;
      const pk0 = A.x0 + 0.34 * (A.x1 - A.x0), pk1 = A.x0 + 0.7 * (A.x1 - A.x0), pm = (pk0 + pk1) / 2;
      R.pk = [pk0, pk1];
      const lt = A.yc - A.lh, lb = A.yc + A.lh;
      const plakUst = lb - 0.3 * 2 * A.lh;
      let h = T(A.t[0], A.t[1], 'f32-bas', 'Koroner arter') + T(V.t[0], V.t[1], 'f32-bas', 'Sol ventrikül duvarı', 'middle') + T(E.t[0], E.t[1], 'f32-bas', 'EKG', 'middle');
      h += Rc(A.x0, lt - A.dw, A.x1 - A.x0, A.dw, 'f32-ad', ' rx="4"') + Rc(A.x0, lb, A.x1 - A.x0, A.dw, 'f32-ad', ' rx="4"') + Rc(A.x0, lt, A.x1 - A.x0, 2 * A.lh, 'f32-alum');
      h += `<path d="M${pk0},${lb} C${pk0 + 14},${plakUst} ${pk1 - 14},${plakUst} ${pk1},${lb} Z" class="f32-aterom"/>`;
      h += `<path d="M${pm - 22},${plakUst + 5} l7,-5 l6,6 l7,-6 l6,6 l7,-5" class="f32-catlak" data-r="cat"/>`;
      h += `<g data-r="tr" class="f32-trombus"></g><g data-r="nok"></g>`;
      h += T(pm, lb + A.dw + 18, 'f32-lb f32-wrn', 'aterom plağı', 'middle') + `<text data-r="trt" class="f32-lb f32-crt" text-anchor="middle" x="${pm}" y="${lt - A.dw - 6}">trombüs</text>` + T(A.x1 - 4, lt - A.dw - 6, 'f32-tk', 'akım →', 'end');
      // ventrikül kesiti
      h += `<circle cx="${V.cx}" cy="${V.cy}" r="${(V.ro + V.ri) / 2}" class="f32-lvd" stroke-width="${V.ro - V.ri}"/><path data-r="has" class="f32-hasar"/>`;
      h += `<circle cx="${V.cx}" cy="${V.cy}" r="${V.ri}" class="f32-lvc"/><circle cx="${V.cx}" cy="${V.cy}" r="${V.ro}" class="f32-lvc"/>`;
      h += T(V.cx, V.cy - V.ri + 18, 'f32-tk', 'endokard', 'middle') + T(V.cx, V.cy + 4, 'f32-tk', 'LV boşluğu', 'middle') + T(V.cx, V.cy + V.ro + 16, 'f32-tk', 'epikard', 'middle');
      h += `<text data-r="hast" class="f32-lb f32-crt" text-anchor="middle" x="${V.cx}" y="${V.cy + V.ro + 34}"></text>`;
      // EKG
      h += Ln(E.x0, E.yb, E.x0 + E.w, E.yb, 'f32-izo') + `<path data-r="ekn" class="f32-ekg-ref"/><path data-r="ek" class="f32-ekg"/>`;
      h += `<text data-r="ekt" class="f32-lb" text-anchor="middle" x="${E.x0 + E.w / 2}" y="${E.yb + 64}"></text>`;
      h += T(E.x0 + E.w / 2, E.yb + 82, 'f32-tk', 'kesikli: normal ST', 'middle');
      el.innerHTML = `${adimHtml(ADIM)}<div class="f32-ctl">${segHtml('Tıkanma', 't', [['kismi', 'Kısmi'], ['tam', 'Tam']], s.t)}</div>
        ${svgAc(G.W, G.H, 'f32-ti-svg', 'Koroner arterde plak yırtılması ve trombüs; sol ventrikül duvarında hasarın derinliği ve EKG değişikliği', h)}`;
      R.has = null;
      el.querySelectorAll('[data-r]').forEach((e) => { R[e.dataset.r] = e; });
      R.ekn.setAttribute('d', ekgYol(E.x0, E.w, E.yb, E.a, 0, 0.32));
      R.nok.innerHTML = P.map(() => '<circle r="3" class="f32-nokta"/>').join('');
      R.noks = [...R.nok.children];
      if (RM) R.nok.style.display = 'none';
      ad.faz(); tw.dur(); tw(hedef(), true); metin();
    };
    const hedef = () => {
      const i = s.i, tam = s.t === 'tam';
      return { o: i === 0 ? 0.3 : i === 1 ? 0.5 : tam ? 1 : 0.7, tr: i === 0 ? 0 : 1, d: i < 2 ? 0 : tam ? 1 : 0.34, st: i < 2 ? 0 : tam ? 0.42 : -0.2, t: i < 2 ? 0.32 : tam ? 0.2 : -0.45 };
    };
    const ciz = (c) => {
      const A = G.a, V = G.v, E = G.e;
      const [pk0, pk1] = R.pk, lt = A.yc - A.lh, lb = A.yc + A.lh;
      const plakUst = lb - 0.6 * A.lh, ust = lb - c.o * 2 * A.lh;
      // trombüs: plak üstünden lümene uzanan tanecik kümesi
      let h = '';
      if (c.tr > 0.01 && ust < plakUst - 1) {
        const x0 = pk0 + 18, x1 = pk1 - 18, hh = plakUst + 4 - ust;
        h += `<path d="M${r1(x0 - 8)},${r1(plakUst + 4)} C${r1(x0 - 6)},${r1(ust)} ${r1(x1 + 6)},${r1(ust)} ${r1(x1 + 8)},${r1(plakUst + 4)} Z" class="f32-tr-g"/>`;
        for (let k = 0; k < 9; k++) {
          const u = (k % 3 + 0.5) / 3, w = Math.floor(k / 3) / 3 + 0.2;
          h += `<circle cx="${r1(lerp(x0, x1, u))}" cy="${r1(plakUst + 2 - w * hh * 0.9)}" r="${r1(clamp(hh / 8, 2, 6))}" class="f32-tr-t"/>`;
        }
      }
      R.tr.innerHTML = h;
      R.tr.style.opacity = c.tr;
      R.trt.style.opacity = c.tr;
      at(R.trt, { y: Math.min(lt - A.dw - 6, ust - 6) });
      R.cat.style.opacity = 1;
      // hasar dilimi
      const a0 = -40, a1 = 40, r0 = V.ri, r2 = V.ri + c.d * (V.ro - V.ri);
      const pt = (r, a) => [V.cx + r * Math.cos((a * Math.PI) / 180), V.cy + r * Math.sin((a * Math.PI) / 180)];
      if (c.d > 0.01) {
        const [p1x, p1y] = pt(r0, a0), [p2x, p2y] = pt(r2, a0), [p3x, p3y] = pt(r2, a1), [p4x, p4y] = pt(r0, a1);
        R.has.setAttribute('d', `M${r1(p1x)},${r1(p1y)} L${r1(p2x)},${r1(p2y)} A${r1(r2)},${r1(r2)} 0 0 1 ${r1(p3x)},${r1(p3y)} L${r1(p4x)},${r1(p4y)} A${r0},${r0} 0 0 0 ${r1(p1x)},${r1(p1y)} Z`);
      } else R.has.setAttribute('d', '');
      R.ek.setAttribute('d', ekgYol(E.x0, E.w, E.yb, E.a, c.st, c.t));
      R.ekn.style.opacity = Math.abs(c.st) > 0.02 || c.t < 0.3 ? 1 : 0;
      R.ust = ust;
    };
    const tw = tween(ciz, 600);
    const metin = () => {
      const son = s.i === 2, tam = s.t === 'tam';
      R.hast.textContent = son ? (tam ? 'tam kat (transmural)' : 'kısmi kat (subendokardiyal)') : '';
      R.ekt.textContent = son ? (tam ? 'ST elevasyonu' : 'ST depresyonu + negatif T') : 'normal';
      R.ekt.setAttribute('class', 'f32-lb' + (son ? ' f32-crt' : ''));
      el.querySelectorAll('[data-t]').forEach((b) => { b.disabled = !son; });
      capY(s.i === 0 ? null : s.i === 1 ? CAP2 : CAP3[s.t]);
    };
    const noktaCiz = (dt) => {
      const c = tw.cur(); if (!c || !R.noks) return;
      const A = G.a, [pk0, pk1] = R.pk, lt = A.yc - A.lh, ust = R.ust;
      const L = A.x1 - A.x0, kapali = c.o > 0.98;
      const hiz = 0.16 * Math.max(0.12, Math.pow(1 - c.o, 0.6));
      P.forEach((p, k) => {
        let x = A.x0 + p.u * L;
        const ic = x > pk0 + 6 && x < pk1 - 6;
        const darIc = c.tr > 0.01 && x > pk0 + 10 && x < pk1 - 10;
        const ustS = lt + 4, altS = darIc ? ust - 4 : A.yc + A.lh - 4;
        if (kapali) {
          const dur = pk0 + 4 - p.z * 30;
          if (x < dur) { p.u += dt * 0.12; x = A.x0 + p.u * L; if (x > dur) p.u = (dur - A.x0) / L; }
          else if (x > pk1 + 4) { p.u += dt * 0.12; if (p.u > 1) { p.u = 0; } }
        } else {
          const daralma = darIc ? clamp((altS - ustS) / (2 * A.lh - 8), 0.15, 1) : 1;
          p.u += (dt * hiz) / daralma;
          if (p.u > 1) { p.u -= 1; p.v = Math.random() * 1.7 - 0.85; }
        }
        x = A.x0 + p.u * L;
        const yy = ic && c.tr > 0.01 ? lerp(ustS, Math.max(ustS + 2, altS), (p.v + 0.85) / 1.7) : A.yc + p.v * (A.lh - 5);
        at(R.noks[k], { cx: x, cy: yy });
        R.noks[k].style.display = kapali && x > pk0 + 6 && x < pk1 + 4 ? 'none' : '';
      });
    };
    const ad = adimci(el, 3, 3000, (i) => { s.i = i; tw(hedef()); metin(); });
    const tik = (e) => { const b = e.target.closest('[data-t]'); if (b && !b.disabled) { s.t = b.dataset.t; basSec(el, 't', s.t); tw(hedef()); metin(); } };
    el.addEventListener('click', tik);
    kur(); ad.set(s.i);
    const stopT = RM ? () => {} : ticker(el, noktaCiz);
    const stopG = genislikIzle(el, kur);
    return () => { stopT(); stopG(); tw.dur(); ad.temizle(); el.removeEventListener('click', tik); };
  };

  /* =====================================================================
     5 · Duvar, derivasyon ve arter
     ===================================================================== */
  VIZ.f32_ekg = (el) => {
    const capY = capYazici(el);
    const BOL = {
      inferior: { ad: 'İnferior', der: { II: 1, III: 1, aVF: 1 }, dt: 'II, III, aVF', st: 'elevasyon', ar: ['rca', 'piv'], art: 'sağ koroner (RCA) + posterior interventriküler', ya: ['inferior'],
        not: 'RCA sıklıkla SA ve AV düğümünü besler: tıkanma hipotansiyon ve bradikardi yapabilir; tam kalp bloğu inferior STEMI\'nin sık başvuru biçimidir. [[K1 s. 142]]' },
      lateral: { ad: 'Lateral', der: { I: 1, aVL: 1, V5: 1, V6: 1 }, dt: 'I, aVL, V5, V6', st: 'elevasyon', ar: ['cx'], art: 'sirkumfleks', ya: ['lateral'], not: 'Enfarktüs sol ventrikül işlev bozukluğu yapar. [[K1 s. 142]]' },
      septal: { ad: 'Septal', der: { V1: 1, V2: 1 }, dt: 'V1, V2', st: 'elevasyon', ar: ['lad'], art: "LAD'nin septal dalı", ya: ['septal'], not: 'His demeti septumdadır: enfarktüs LBBB yapabilir. [[K1 s. 142]]' },
      apikal: { ad: 'Apikal', der: { V3: 1, V4: 1 }, dt: 'V3, V4', st: 'elevasyon', ar: ['lad', 'piv'], art: "LAD'nin uç kısmı ya da (sağ dominant dolaşımda) posterior interventriküler", ya: ['apikal'], not: 'Apeks tutulumu mural trombüsle ilişkilidir. [[K1 s. 142–143]]' },
      anterior: { ad: 'Anterior', der: { I: 1, aVL: 1, V1: 1, V2: 1, V3: 1, V4: 1, V5: 1, V6: 1 }, dt: 'I, aVL, V1–V6 (sekize kadar)', st: 'elevasyon', ar: ['lad'], art: 'LAD', ya: ['anterior', 'septal'],
        not: "Tam tıkanma LV'nin büyük kısmını iskemik bırakır: ağır LV işlev bozukluğu, ventriküler septal defekt, anevrizma. [[K1 s. 143]]" },
      posterior: { ad: 'Posterior', der: { V1: -1, V2: -1, V3: -1, V4: -1 }, dt: 'V1, V2, V3, V4', st: 'depresyon', ar: ['cx', 'piv'], art: 'sirkumfleks + posterior interventriküler', ya: ['posterior'],
        not: 'Tanısı zordur: ön derivasyonlarda ST depresyonu görülür; LV işlev bozukluğu yapar. [[K1 s. 143]]' },
      solana: { ad: 'Sol ana koroner', der: { I: -1, II: -1, V4: -1, V5: -1, V6: -1, aVR: 1 }, dt: 'I, II, V4, V5, V6 · aVR', st: 'yaygın depresyon · aVR\'de elevasyon', ar: ['lm', 'lad', 'cx'], art: 'sol ana koroner (LAD + sirkumfleks gövdesi)', ya: ['anterior', 'septal', 'lateral', 'apikal'],
        not: "Yaygın ST depresyonu, sıklıkla I, II ve V4–6'da; aVR'de ST elevasyonu. [[K1 s. 142]]" },
    };
    const YAMA = {
      septal: 'M164,112 L183,112 L194,262 L175,262 Z',
      anterior: 'M183,112 C210,106 234,114 244,132 C248,170 246,206 238,232 C226,248 214,258 205,264 L194,262 Z',
      lateral: 'M246,128 C268,150 272,196 250,240 L239,233 C248,204 250,164 244,132 Z',
      apikal: 'M175,265 L206,267 C202,286 196,304 188,320 C181,304 176,288 175,265 Z',
      inferior: 'M74,204 C92,248 134,286 176,312 L172,294 C136,272 106,240 93,200 Z',
    };
    const ARTER = {
      lm: 'M146,80 L172,92', lad: 'M172,92 C176,150 180,240 188,318', cx: 'M172,92 C215,92 254,110 264,150 C270,176 266,200 258,222',
      rca: 'M112,80 C86,92 66,122 66,162 C68,202 92,242 130,272',
    };
    const SIRA_G = [['I', 'aVR', 'V1', 'V4'], ['II', 'aVL', 'V2', 'V5'], ['III', 'aVF', 'V3', 'V6']];
    const SIRA_D = [['I', 'aVR', 'V1'], ['II', 'aVL', 'V2'], ['III', 'aVF', 'V3'], ['V4', 'V5', 'V6']];
    let s = null, R = {};
    const kalpSvg = () => {
      let h = `<path d="M62,120 C58,82 98,62 140,70 C180,58 236,66 262,104 C284,140 272,200 240,250 C222,280 202,305 188,322 C150,300 100,262 76,214 C62,186 62,150 62,120 Z" class="f32-kalp-d"/>`;
      h += `<ellipse cx="252" cy="292" rx="34" ry="21" class="f32-yama f32-yama-arka" data-ya="posterior"/>` + T(252, 297, 'f32-tk', 'arka', 'middle');
      for (const k in YAMA) h += `<path d="${YAMA[k]}" class="f32-yama" data-ya="${k}"/>`;
      h += `<rect x="112" y="22" width="34" height="60" rx="12" class="f32-aort"/>` + T(129, 16, 'f32-tk', 'aort', 'middle');
      for (const k in ARTER) h += `<path d="${ARTER[k]}" class="f32-ar" data-ar="${k}"/>`;
      h += `<path d="M130,272 C150,290 170,306 186,318" class="f32-ar f32-ar-arka" data-ar="piv"/><path d="M258,222 C254,250 246,268 238,282" class="f32-ar f32-ar-arka" data-ar="cx"/>`;
      h += `<text x="152" y="70" class="f32-tk2 f32-hale">sol ana</text><text x="200" y="85" class="f32-tk2 f32-hale">sirkumfleks</text><text x="186" y="198" class="f32-tk2 f32-hale">LAD</text><text x="58" y="150" class="f32-tk2 f32-hale" text-anchor="end">RCA</text>`;
      h += T(130, 342, 'f32-tk', 'kesikli: posterior interventriküler · arkada', 'middle');
      return svgAc(300, 350, 'f32-ek-kalp', 'Şematik kalp: duvar bölgeleri ve koroner arterler', h);
    };
    const izgSvg = (dar) => {
      const S = dar ? SIRA_D : SIRA_G, W = dar ? 360 : 410, cw = dar ? 114 : 96, ch = dar ? 74 : 104, gp = 6, x0 = dar ? 3 : 5;
      const H = S.length * ch + (S.length - 1) * gp + 4;
      let h = '';
      S.forEach((row, r) => row.forEach((d, c) => {
        const x = x0 + c * (cw + gp), y = 2 + r * (ch + gp);
        h += `<g class="f32-hc" data-d="${d}" style="--gec:${c * 70}ms">${Rc(x, y, cw, ch, 'f32-hc-k', ' rx="8"')}${T(x + 8, y + 18, 'f32-hc-ad', d)}<text x="${x + cw - 8}" y="${y + 18}" class="f32-hc-st" text-anchor="end"></text>
          <line x1="${x + 6}" y1="${y + ch * 0.66}" x2="${x + cw - 6}" y2="${y + ch * 0.66}" class="f32-izo"/><path class="f32-hc-iz" data-x="${x + 6}" data-w="${cw - 12}" data-y="${y + ch * 0.66}" data-a="${ch * 0.42}"/></g>`;
      }));
      return svgAc(W, H, 'f32-ek-izg', '12 derivasyonlu EKG ızgarası; etkilenen derivasyonlar ve ST yönü', h);
    };
    const kur = () => {
      const dar = darMi(el);
      el.innerHTML = `<div class="f32-ctl"><div class="f32-segk"><span>Bölge</span><div class="seg" role="group" aria-label="Bölge">${Object.keys(BOL).map((k) => `<button type="button" data-b="${k}" aria-pressed="${k === s}">${BOL[k].ad}</button>`).join('')}</div></div></div>
        <div class="f32-ek-iz"><div class="f32-ek-k">${kalpSvg()}</div><div>${izgSvg(dar)}</div></div>
        <p class="f32-not">${REF('Subendokardiyal iskemi → ST depresyonu · subepikardiyal/transmural → ST elevasyonu. [[K1 s. 142]]')}</p>
        <dl class="kv f32-kv"><dt>Bölge</dt><dd data-r="kb">—</dd><dt>Derivasyonlar</dt><dd data-r="kd">—</dd><dt>ST</dt><dd data-r="ks">—</dd><dt>Arter</dt><dd data-r="ka">—</dd><dt>Önemli nokta</dt><dd data-r="kn">—</dd></dl>`;
      R = {}; el.querySelectorAll('[data-r]').forEach((e) => { R[e.dataset.r] = e; });
      el.classList.toggle('f32-rm', RM);
      ciz();
    };
    const ciz = () => {
      const b = s ? BOL[s] : null;
      el.querySelectorAll('.f32-yama').forEach((p) => p.classList.toggle('on', !!b && b.ya.includes(p.dataset.ya)));
      el.querySelectorAll('.f32-ar').forEach((p) => { p.classList.toggle('on', !!b && b.ar.includes(p.dataset.ar)); p.classList.toggle('pasif', !!b && !b.ar.includes(p.dataset.ar)); });
      el.querySelectorAll('.f32-hc').forEach((g) => {
        const v = b ? b.der[g.dataset.d] || 0 : 0, iz = g.querySelector('.f32-hc-iz');
        g.classList.toggle('on', v !== 0);
        g.querySelector('.f32-hc-st').textContent = v > 0 ? 'ST ↑' : v < 0 ? 'ST ↓' : '';
        iz.setAttribute('d', ekgYol(+iz.dataset.x, +iz.dataset.w, +iz.dataset.y, +iz.dataset.a, v > 0 ? 0.36 : v < 0 ? -0.22 : 0, v > 0 ? 0.18 : v < 0 ? 0.12 : 0.3));
      });
      R.kb.textContent = b ? b.ad : '—'; R.kd.textContent = b ? b.dt : '—'; R.ks.textContent = b ? b.st : '—'; R.ka.textContent = b ? b.art : '—';
      R.kn.innerHTML = b ? REF(b.not) : '—';
      capY(b ? `<b>${b.ad}.</b> ${b.not}` : null);
    };
    const tik = (e) => {
      const t = e.target.closest('[data-b],[data-ya]');
      if (!t || !el.contains(t)) return;
      s = t.dataset.b || t.dataset.ya; basSec(el, 'b', s); ciz();
    };
    el.addEventListener('click', tik);
    kur();
    const stopG = genislikIzle(el, kur);
    return () => { stopG(); el.removeEventListener('click', tik); };
  };

  /* =====================================================================
     6 · Troponin yüksek: hangi yol?
     ===================================================================== */
  VIZ.f32_yol = (el) => {
    const capY = capYazici(el);
    const CAP = {
      stemi: '<b>STEMI ya da yeni LBBB.</b> Acildir: hemen primer PCI; yeniden tıkanmayı ikili antitrombosit tedavi önler, PCI gecikecekse arada tromboliz. [[K1 s. 143]]',
      nstemi: '<b>NSTEMI.</b> Antitrombositler ve DMAH; acil anjiyografi stentlenebilir darlığı arar, TIMI skoru aciliyeti belirler. [[K1 s. 143]]',
      tip2: '<b>Tip 2 MI / miyokard hasarı.</b> Talep–sunum dengesizliği ya da başka akut hastalıkta troponin salınır; ikisi örtüşür, ikisi de kötü prognozludur ve plak olmadığı için anjiyoplasti işe yaramaz. [[K1 s. 143]]',
    };
    const YOL = { stemi: ['root', 'tip1', 'stemi', 'stx'], nstemi: ['root', 'tip1', 'nstemi', 'ntx'], tip2: ['root', 'tip2', 'cip', 'venn', 'prog'] };
    const MET = {
      root: [['Serum troponini yüksek', 'b']],
      tip1: [['Koroner plak / koroner patoloji'], ['→ Tip 1 MI', 'b']],
      tip2: [['Plak yok: ağır fizyolojik stres'], ['→ Tip 2 MI · miyokard hasarı', 'b']],
      stemi: [['STEMI ya da yeni LBBB', 'b'], ['ACİL', 'c']],
      nstemi: [['NSTEMI', 'b']],
      stx: [['• Hemen primer PCI: trombüs çıkarılır, anjiyoplasti + stent'], ['• İkili antitrombosit: aspirin + ADP/P2Y inhibitörü (ör. tikagrelor)'], ['• PCI hemen yoksa arada tromboliz (ör. rekombinant doku plazminojen aktivatörü)']],
      ntx: [['• Antitrombositler + DMAH'], ['• Acil koroner anjiyografi (stentlenebilir darlık?)'], ['• Aciliyet: TIMI risk skoru']],
      prog: [['Kötü prognoz · özgül tedavi (ör. anjiyoplasti) uygun değil']],
    };
    const CIP = ['Sepsis', 'Miyokardit', 'Katekolamin artışı (ör. SAK)', 'Sağ ventrikül zorlanması (ör. akut PE)'];
    let s = null, R = {}, YL = null, faz = 0;
    const kutu = (id, x, y, w, fs, lh) => {
      const n = harf(w - 20, fs);
      const sat = []; MET[id].forEach(([t, k]) => sar(t, n).forEach((l, j) => sat.push([l, k, j])));
      const h = 16 + sat.length * lh - 2;
      const ic = sat.map(([l, k], j) => `<tspan x="${r1(x + 10)}" y="${r1(y + 8 + lh * 0.8 + j * lh)}" class="f32-yt-${k || 'n'}">${l}</tspan>`).join('');
      return { b: { x, y, w, h }, s: `<g class="f32-yk" data-k="${id}">${Rc(x, y, w, h, 'f32-yk-k', ' rx="9"')}<text class="f32-yt">${ic}</text></g>` };
    };
    const cipKutu = (x, y, w, fs, lh, kolon) => {
      const cw = (w - (kolon - 1) * 8) / kolon, n = harf(cw - 16, fs);
      let h = '', yy = y;
      for (let r = 0; r < CIP.length / kolon; r++) {
        const row = CIP.slice(r * kolon, r * kolon + kolon).map((c) => sar(c, n));
        const rh = 12 + Math.max(...row.map((l) => l.length)) * lh;
        row.forEach((l, c) => { const xx = x + c * (cw + 8); h += Rc(xx, yy, cw, rh, 'f32-cip-k', ' rx="12"') + `<text class="f32-yt" text-anchor="middle">${tsp(l, xx + cw / 2, yy + 6 + lh * 0.8, lh)}</text>`; });
        yy += rh + 6;
      }
      return { b: { x, y, w, h: yy - 6 - y }, s: `<g class="f32-yk" data-k="cip">${h}</g>` };
    };
    const vennKutu = (cx, y, rx, ry, dx) => {
      const cy = y + ry + 2;
      const s2 = `<g class="f32-yk" data-k="venn"><ellipse cx="${cx - dx}" cy="${cy}" rx="${rx}" ry="${ry}" class="f32-venn"/><ellipse cx="${cx + dx}" cy="${cy}" rx="${rx}" ry="${ry}" class="f32-venn"/>
        <text class="f32-yt f32-yt-b" text-anchor="middle">${tsp(['Tip 2', 'MI'], cx - dx - rx / 2 - 4, cy - 3, 15)}</text><text class="f32-yt f32-yt-b" text-anchor="middle">${tsp(['Miyokard', 'hasarı'], cx + dx + rx / 2 + 4, cy - 3, 15)}</text>
        <text class="f32-yt f32-tk" text-anchor="middle">${tsp(['net ayrım', 'yok'], cx, cy - 3, 15)}</text></g>`;
      return { b: { x: cx - dx - rx, y, w: 2 * (dx + rx), h: 2 * ry + 4 }, s: s2 };
    };
    const kur = () => {
      const dar = darMi(el);
      const B = {}, K = [];
      let h = okMarker('f32-yok'), W, H;
      const ekle = (id, o) => { B[id] = o.b; h += o.s; };
      const bag = (id, d, a, b2) => K.push({ id, d, a, b: b2 });
      const alt = (b) => b.y + b.h, ort = (b) => b.x + b.w / 2;
      if (!dar) {
        W = 720; const fs = 12.5, lh = 16;
        ekle('root', kutu('root', 250, 6, 220, fs, lh));
        ekle('tip1', kutu('tip1', 8, 76, 344, fs, lh)); ekle('tip2', kutu('tip2', 368, 76, 344, fs, lh));
        const y2 = Math.max(alt(B.tip1), alt(B.tip2)) + 28;
        ekle('stemi', kutu('stemi', 8, y2, 168, fs, lh)); ekle('nstemi', kutu('nstemi', 184, y2, 168, fs, lh));
        const y3 = Math.max(alt(B.stemi), alt(B.nstemi)) + 24;
        ekle('stx', kutu('stx', 8, y3, 168, 12, 15)); ekle('ntx', kutu('ntx', 184, y3, 168, 12, 15));
        ekle('cip', cipKutu(368, alt(B.tip2) + 28, 344, 12, 15, 2));
        ekle('venn', vennKutu(540, alt(B.cip) + 22, 92, 40, 52));
        ekle('prog', kutu('prog', 368, alt(B.venn) + 22, 344, fs, lh));
        const yr = alt(B.root) + 12, y1 = alt(B.tip1) + 12;
        bag('tip1', `M${ort(B.root)},${alt(B.root)} V${yr} H${ort(B.tip1)} V${B.tip1.y - 1}`, 'root', 'tip1');
        bag('tip2', `M${ort(B.root)},${alt(B.root)} V${yr} H${ort(B.tip2)} V${B.tip2.y - 1}`, 'root', 'tip2');
        bag('stemi', `M${ort(B.tip1)},${alt(B.tip1)} V${y1} H${ort(B.stemi)} V${B.stemi.y - 1}`, 'tip1', 'stemi');
        bag('nstemi', `M${ort(B.tip1)},${alt(B.tip1)} V${y1} H${ort(B.nstemi)} V${B.nstemi.y - 1}`, 'tip1', 'nstemi');
        bag('stx', `M${ort(B.stemi)},${alt(B.stemi)} V${B.stx.y - 1}`, 'stemi', 'stx');
        bag('ntx', `M${ort(B.nstemi)},${alt(B.nstemi)} V${B.ntx.y - 1}`, 'nstemi', 'ntx');
        bag('cip', `M${ort(B.tip2)},${alt(B.tip2)} V${B.cip.y - 1}`, 'tip2', 'cip');
        bag('venn', `M540,${alt(B.cip)} V${B.venn.y - 1}`, 'cip', 'venn');
        bag('prog', `M540,${alt(B.venn)} V${B.prog.y - 1}`, 'venn', 'prog');
        H = Math.max(alt(B.stx), alt(B.ntx), alt(B.prog)) + 6;
      } else {
        W = 360; const fs = 13, lh = 16.5, ind = 16, gap = 14;
        let y = 4;
        const dz = [['root', 0], ['tip1', 1], ['stemi', 2], ['stx', 3], ['nstemi', 2], ['ntx', 3], ['tip2', 1], ['cip', 2], ['venn', 2], ['prog', 2]];
        const ana = { tip1: 'root', tip2: 'root', stemi: 'tip1', nstemi: 'tip1', stx: 'stemi', ntx: 'nstemi', cip: 'tip2', venn: 'tip2', prog: 'tip2' };
        dz.forEach(([id, d]) => {
          const x = 2 + d * ind, w = W - 2 - x;
          if (id === 'cip') ekle(id, cipKutu(x, y, w, 12.5, 16, 2));
          else if (id === 'venn') ekle(id, vennKutu(x + w / 2, y, 82, 40, 46));
          else ekle(id, kutu(id, x, y, w, id === 'stx' || id === 'ntx' ? 12.5 : fs, lh));
          y = alt(B[id]) + gap;
        });
        dz.slice(1).forEach(([id, d]) => {
          const p = B[ana[id]], c = B[id], px = 2 + (d - 1) * ind + 8, cy = c.y + Math.min(14, c.h / 2);
          bag(id, `M${px},${alt(p)} V${cy} H${c.x - 1}`, ana[id], id);
        });
        H = y - gap + 4;
      }
      h += K.map((k) => `<path d="${k.d}" class="f32-yb" data-bag="${k.id}" marker-end="url(#f32-yok)"/>`).join('') + '<circle r="5" class="f32-ynok" data-r="nok"/>';
      el.innerHTML = `<div class="f32-ctl">${segHtml('Yol', 'y', [['stemi', 'STEMI / yeni LBBB'], ['nstemi', 'NSTEMI'], ['tip2', 'Tip 2 MI / hasar']], s)}</div>
        <div class="f32-yol-iz">${svgAc(W, r1(H), 'f32-yol-svg', 'Troponin yüksekliğinin iki kökü: tip 1 MI ve tedavisi; tip 2 MI ve miyokard hasarı', h)}</div>`;
      R = {}; el.querySelectorAll('[data-r]').forEach((e) => { R[e.dataset.r] = e; });
      YL = { K, B };
      ciz();
    };
    const ciz = () => {
      const yol = s ? YOL[s] : null;
      el.querySelectorAll('.f32-yk').forEach((g) => {
        const on = !!yol && yol.includes(g.dataset.k);
        g.classList.toggle('on', on); g.classList.toggle('soluk', !!yol && !on);
        g.classList.toggle('f32-yk-clin', on && s !== 'tip2'); g.classList.toggle('f32-yk-warn', on && s === 'tip2');
      });
      el.querySelectorAll('.f32-yb').forEach((p) => {
        const on = !!yol && yol.includes(p.dataset.bag) && yol.includes(YL.K.find((k) => k.id === p.dataset.bag).a);
        p.classList.toggle('on', on); p.classList.toggle('soluk', !!yol && !on);
        p.classList.toggle('f32-yb-warn', on && s === 'tip2');
      });
      R.zin = yol ? yol.slice(1).map((id) => el.querySelector(`[data-bag="${id}"]`)).filter(Boolean) : [];
      R.zinL = R.zin.map((p) => (p.getTotalLength ? p.getTotalLength() : 0));
      faz = 0;
      R.nok.style.display = 'none';
      capY(s ? CAP[s] : null);
    };
    const noktaCiz = (dt) => {
      if (!R.zin || !R.zin.length) return;
      faz += dt;
      const t = faz % 2.2;
      if (t > 1) { R.nok.style.display = 'none'; return; }
      const top = R.zinL.reduce((a, b) => a + b, 0);
      let d = t * top, k = 0;
      while (k < R.zin.length - 1 && d > R.zinL[k]) { d -= R.zinL[k]; k++; }
      const p = R.zin[k].getPointAtLength(Math.min(d, R.zinL[k]));
      R.nok.style.display = ''; at(R.nok, { cx: p.x, cy: p.y });
      R.nok.setAttribute('class', 'f32-ynok' + (s === 'tip2' ? ' f32-ynok-w' : ''));
    };
    const tik = (e) => { const b = e.target.closest('[data-y]'); if (b && el.contains(b)) { s = b.dataset.y; basSec(el, 'y', s); ciz(); } };
    el.addEventListener('click', tik);
    kur();
    const stopT = RM ? () => {} : ticker(el, noktaCiz);
    const stopG = genislikIzle(el, kur);
    return () => { stopT(); stopG(); el.removeEventListener('click', tik); };
  };

  /* =====================================================================
     7 · İskemiden reperfüzyona
     ===================================================================== */
  VIZ.f32_iri = (el) => {
    const capY = capYazici(el);
    const ADIM = ['İskemi', 'Reperfüzyon', 'Zararlı süreçler', 'Hasar', 'Komplikasyonlar'];
    const CAP = [null,
      '<b>2 · Reperfüzyon.</b> Kanlanma geri gelir: PCI ve/veya tromboliz, kardiyoplejik baypasın bitmesi ya da ortalama arter basıncının düzelmesiyle. Nekrozu önlemek için şarttır. [[K1 s. 143]]',
      '<b>3 · Zararlı süreçler.</b> İnflamasyon, sitozolik iyon dengesizliği ve ROS ortaya çıkar; nitrik oksit azalır, damar daralır. [[K1 s. 143]]',
      '<b>4 · Hasar.</b> Mikrovasküler endotel hasarı tromboz ve embolizasyonla; miyositler doğrudan ve apoptozla zarar görür. IRI en sık STEMI ile ilişkilidir; inme sonrası beyinde de görülür. [[K1 s. 143–144]]',
      '<b>5 · Komplikasyonlar.</b> Aritmiler, sersemlemiş miyokard ve no-reflow. Önerilen tedavilerin (ön koşullandırma, hipotermi, hiperoksemi, antiinflamatuvarlar, serbest radikal temizleyiciler) hiçbirinin kesin kanıtı yok. [[K1 s. 144]]'];
    const KART = [
      ['Aritmiler', ['atriyal ve ventriküler; iyon dengesizliği ve ROS', 'hızlanmış idiyoventriküler ritim kateter laboratuvarında sık, iyi tolere edilir', 'ventriküler ektopi, VT sonraki saatlerde → kardiyak yoğun bakımda izlem', 'çoğu kendiliğinden geçer; skar kalıcı ritim bozukluğuna zemin olabilir']],
      ['Kasılma bozukluğu (sersemleme)', ['sitozolik Ca²⁺ yükü', 'kalp yetmezliği belirtileri, iyi reperfüzyon ve zamanla düzelebilir', 'erken eko uzun dönem işlevi göstermez']],
      ['Mikrovasküler hasar (no-reflow)', ['inflamasyon, lökosit artıkları, tromboz, emboli, miyokard ödemi', 'arter açık olsa da doku kanlanmaz', 'uzun dönem sonuç kötü']],
    ];
    const s = { i: RM ? 4 : 0, ac: -1 };
    let R = {}, G = null, faz = 0;
    const kur = () => {
      const dar = darMi(el);
      const W = dar ? 360 : 440, my = 150, m0 = dar ? 196 : 174, H = m0 + 88 + 30 + 26;
      const vx0 = 46, vx1 = W - 8, vt = 46, vb = 104, vc = (vt + vb) / 2;
      G = { W, H, vx0, vx1, vt, vb, vc, ys: [m0, m0 + 44, m0 + 88] };
      let h = '';
      // tıkalı koroner simgesi
      h += Rc(6, vc - 13, 40, 26, 'f32-ad', ' rx="6"') + Rc(6, vc - 8, 40, 16, 'f32-alum') + `<g data-r="trb" class="f32-trombus"><circle cx="30" cy="${vc}" r="7" class="f32-tr-t"/><circle cx="22" cy="${vc - 3}" r="5" class="f32-tr-t"/><circle cx="24" cy="${vc + 4}" r="4.5" class="f32-tr-t"/></g>`;
      h += T(4, 22, 'f32-tk', 'koroner');
      // kılcal damar: duvarlar (endotel hücreleri) değişken çizilir
      h += `<rect data-r="lum" x="${vx0}" width="${vx1 - vx0}" class="f32-alum"/><g data-r="end"></g><g data-r="lok"></g><g data-r="kt"></g><g data-r="nok"></g><g data-r="no"></g>`;
      h += `<text data-r="noT" x="${vx0}" y="${vt - 20}" class="f32-lb f32-okt"></text><text data-r="infT" x="${vx1}" y="${vt - 20}" class="f32-lb f32-wrn" text-anchor="end">inflamasyon</text>`;
      // metabolizma çubuğu ve temizleyiciler çipi
      const tw0 = dar ? 214 : 210, myM = dar ? my + 26 : my;
      h += `<g data-r="tem" class="f32-tem"><rect x="${vx0}" y="${my - 14}" width="${tw0}" height="23" rx="11.5"/><text x="${vx0 + tw0 / 2}" y="${my + 2}" text-anchor="middle">serbest radikal temizleyiciler</text></g>`;
      h += T(W - 118, myM + 2, 'f32-tk', 'metabolizma', 'end') + Rc(W - 112, myM - 7, 100, 10, 'f32-met-z', ' rx="5"') + `<rect data-r="met" x="${W - 112}" y="${myM - 7}" height="10" rx="5" class="f32-met"/>`;
      // miyositler
      h += `<g data-r="miy"></g><g data-r="ca"></g><g data-r="ros"></g>`;
      h += `<text data-r="rosT" x="${W - 10}" y="${H - 8}" class="f32-lb f32-crt" text-anchor="end">ROS</text><text data-r="caT" x="${vx0}" y="${H - 8}" class="f32-lb f32-bsc">Ca²⁺ · iyon dengesizliği</text>`;
      el.innerHTML = `${adimHtml(ADIM)}<div class="f32-iri-iz"><div class="f32-iri-sol">${svgAc(W, H, 'f32-iri-svg', 'Kılcal damar ve miyositlerde iskemi–reperfüzyon hasarının gelişimi', h)}
        <div class="f32-cipler" data-r="rep"><span class="f32-cip-bas">Reperfüzyon:</span><span class="tag ok">PCI / tromboliz</span><span class="tag ok">kardiyoplejik baypasın sonu</span><span class="tag ok">ortalama arter basıncının düzelmesi</span></div></div>
        <div class="f32-kartlar">${KART.map(([b, l], k) => `<button type="button" class="f32-kom" data-kart="${k}" aria-pressed="false" style="--gec:${k * 260}ms"><b>${b}</b><ul>${l.map((x) => `<li>${x}</li>`).join('')}</ul></button>`).join('')}</div></div>`;
      R = {}; el.querySelectorAll('[data-r]').forEach((e) => { R[e.dataset.r] = e; });
      ad.faz(); ciz();
    };
    const ciz = () => {
      const i = s.i, { W, H, vx0, vx1, vt, vb, vc } = G;
      const dar = i >= 2 ? 6 : 0;
      at(R.lum, { y: vt + dar, height: vb - vt - 2 * dar });
      // endotel hücreleri
      let e = '';
      const n = Math.floor((vx1 - vx0) / 30);
      for (let k = 0; k < n; k++) {
        const x = vx0 + k * 30 + 1;
        const bos = i >= 3 && (k === 3 || k === n - 3);
        if (!bos) e += Rc(x, vt - 8 + dar, 28, 8, 'f32-endo', ' rx="4"') + Rc(x, vb - dar, 28, 8, 'f32-endo', ' rx="4"');
        else e += T(x + 14, vt - 10 + dar, 'f32-tk f32-crt', '×', 'middle');
      }
      R.end.innerHTML = e;
      R.trb.style.opacity = i === 0 ? 1 : 0;
      // lökositler
      R.lok.innerHTML = i >= 2 ? [0.3, 0.55, 0.8].map((u) => `<circle cx="${r1(vx0 + u * (vx1 - vx0))}" cy="${vt + dar + 7}" r="6.5" class="f32-lokosit"/>`).join('') : '';
      R.infT.style.opacity = i >= 2 ? 1 : 0;
      // mikrotrombüs
      R.kt.innerHTML = i >= 3 ? `<g class="f32-trombus"><circle cx="${r1(vx0 + 0.45 * (vx1 - vx0))}" cy="${vb - dar - 7}" r="6" class="f32-tr-t"/><circle cx="${r1(vx0 + 0.45 * (vx1 - vx0) + 9)}" cy="${vb - dar - 5}" r="4.5" class="f32-tr-t"/></g>` + T(vx0 + 0.45 * (vx1 - vx0) + 2, vb + 24, 'f32-tk f32-crt', 'tromboz · emboli', 'middle') : '';
      // NO
      const noSay = i >= 2 ? 2 : 6;
      R.no.innerHTML = Array.from({ length: noSay }, (_, k) => `<circle cx="${r1(vx0 + 14 + k * ((vx1 - vx0 - 28) / Math.max(1, noSay - 1)))}" cy="${vt - 14 + dar}" r="4" class="f32-no"/>`).join('');
      R.noT.textContent = i >= 2 ? 'NO ↓ → vazokonstriksiyon' : 'NO';
      // metabolizma
      at(R.met, { width: 100 * (i === 0 ? 0.18 : i === 1 ? 0.35 : 0.92) });
      R.tem.classList.toggle('f32-soluk', i === 0);
      // miyositler
      let m = '';
      const mx0 = vx0, mx1 = W - 12, mh = 30, ys = G.ys;
      ys.forEach((y, k) => {
        if (k === 1 && i >= 3) {
          const parc = [[mx0 + 14, 0.22], [mx0 + 0.32 * (mx1 - mx0), 0.16], [mx0 + 0.56 * (mx1 - mx0), 0.2]];
          parc.forEach(([x, w]) => { m += Rc(x, y + 5, w * (mx1 - mx0), mh - 10, 'f32-miy f32-miy-h', ' rx="8"'); });
          m += T(mx1 - 4, y + mh / 2 + 5, 'f32-tk f32-crt', 'apoptoz', 'end');
        } else {
          m += Rc(mx0, y, mx1 - mx0, mh, 'f32-miy' + (k === 2 && i >= 3 ? ' f32-miy-k' : ''), ' rx="10"');
          for (let x = mx0 + 16; x < mx1 - 10; x += 14) m += Ln(x, y + 5, x, y + mh - 5, 'f32-cizgi');
        }
      });
      R.miy.innerHTML = m;
      // Ca²⁺
      const caSay = i >= 2 ? 14 : 3;
      let ca = '';
      for (let k = 0; k < caSay; k++) { const y = ys[k % 3] + 9 + ((k * 7) % 13), x = mx0 + 20 + ((k * 53) % (mx1 - mx0 - 40)); if (!(k % 3 === 1 && i >= 3)) ca += `<circle cx="${r1(x)}" cy="${r1(y)}" r="3" class="f32-ca"/>`; }
      R.ca.innerHTML = ca;
      R.caT.style.opacity = i >= 2 ? 1 : 0.35;
      R.caT.textContent = i >= 2 ? 'Ca²⁺ · iyon dengesizliği' : 'Ca²⁺';
      // ROS
      R.ros.innerHTML = i >= 2 ? Array.from({ length: 9 }, (_, k) => { const x = vx0 + 20 + ((k * 61) % (vx1 - vx0 - 30)), y = [vc, ys[0] - 6, ys[1] - 6, ys[2] - 6, ys[1] + 15][k % 5]; return `<text x="${r1(x)}" y="${r1(y + 4)}" class="f32-ros" text-anchor="middle" style="--d:${k * 0.23}s">✶</text>`; }).join('') : '';
      R.rosT.style.opacity = i >= 2 ? 1 : 0;
      // akım noktaları
      R.nok.innerHTML = i >= 1 ? Array.from({ length: 14 }, () => '<circle r="3.3" class="f32-nokta"/>').join('') + (i >= 3 ? '<circle r="3" class="f32-tr-t" data-emb="1"/><circle r="2.5" class="f32-tr-t" data-emb="1"/>' : '') : '';
      R.noks = [...R.nok.children];
      R.rep.style.visibility = i === 1 ? 'visible' : 'hidden';
      el.querySelectorAll('.f32-kom').forEach((b, k) => { b.classList.toggle('on', i === 4); b.classList.toggle('acik', i === 4 && s.ac === k); b.setAttribute('aria-pressed', String(i === 4 && s.ac === k)); });
      capY(CAP[i]);
      noktaCiz(0);
    };
    const noktaCiz = (dt) => {
      if (!R.noks || !G) return;
      faz += dt;
      const { vx0, vx1, vt, vb, vc } = G, dar = s.i >= 2 ? 6 : 0, L = vx1 - vx0;
      R.noks.forEach((c, k) => {
        const emb = c.dataset.emb;
        const u = ((RM ? 0 : faz) * (emb ? 0.16 : 0.22) + k / (emb ? 2.3 : 14) + (emb ? 0.5 : 0)) % 1;
        const y = emb ? vb - dar - 10 : vc + Math.sin(k * 2.3) * (vb - vt - 2 * dar) * 0.3;
        at(c, { cx: emb ? vx0 + (0.5 + u * 0.5) * L : vx0 + u * L, cy: y });
      });
    };
    const ad = adimci(el, 5, 3000, (i) => { s.i = i; if (i !== 4) s.ac = -1; ciz(); });
    const tik = (e) => { const b = e.target.closest('[data-kart]'); if (b && s.i === 4) { s.ac = s.ac === +b.dataset.kart ? -1 : +b.dataset.kart; ciz(); } };
    el.addEventListener('click', tik);
    kur(); ad.set(s.i);
    const stopT = RM ? () => {} : ticker(el, noktaCiz);
    const stopG = genislikIzle(el, kur);
    return () => { stopT(); stopG(); ad.temizle(); el.removeEventListener('click', tik); };
  };

  /* =====================================================================
     8 · Ön koşullandırma ve enfarktüs alanı
     ===================================================================== */
  VIZ.f32_onkos = (el) => {
    const capY = capYazici(el);
    const CAP = {
      yok: null,
      dog: '<b>İskemik ön koşullandırma.</b> Kontrollü kısa iskemi miyokardı sonraki iskemiye karşı korur; deneysel çalışmalarda enfarktüs alanı ve komplikasyonlar azalır. Büyük ölçüde deneyseldir. [[K1 s. 144]]',
      uzak: '<b>Uzak ön koşullandırma.</b> Koroner arteri tıkamak gerekmez: brakiyal arteri tıkamak benzer yarar sağlıyor gibidir. [[K1 s. 144]]',
      anes: '<b>Anestezik ön koşullandırma.</b> Etki farmakolojik olarak taklit edilebilir; örnek koroner baypas cerrahisinde izofluran. [[K1 s. 144]]',
    };
    const s = { k: 'yok' };
    let R = {}, raf = 0, G = null;
    const kur = () => {
      const dar = darMi(el);
      const W = dar ? 360 : 720, H = dar ? 118 : 96;
      G = { W, H, ax: H - 22, bh: 26 };
      const by = G.ax - 8 - G.bh;
      const ux0 = W * 0.64, ux1 = W - 10;
      let h = `<defs><clipPath id="f32-ok-clip"><rect data-r="clip" x="0" y="0" height="${H}" width="${W}"/></clipPath></defs>`;
      h += Ln(6, G.ax, W - 10, G.ax, 'f32-eks', ' marker-end="url(#f32-ook)"') + okMarker('f32-ook') + T(W - 10, G.ax + 16, 'f32-tk', 'zaman', 'end');
      h += `<g clip-path="url(#f32-ok-clip)"><g data-r="on"></g>${Rc(ux0, by, ux1 - ux0, G.bh, 'f32-blok-uzun', ' rx="5"')}</g>`;
      h += T((ux0 + ux1) / 2, by + 18, 'f32-blok-t', 'uzun iskemi', 'middle');
      R.geo = { by, ux0 };
      const kes = `<svg viewBox="0 0 300 230" class="f32-svg f32-ok-kesit" role="img" aria-label="Sol ventrikül enine kesitinde enfarktüs alanı">
        <circle cx="150" cy="104" r="69" class="f32-lvd" stroke-width="38"/><path data-r="kama" class="f32-hasar"/><circle cx="150" cy="104" r="50" class="f32-lvc"/><circle cx="150" cy="104" r="88" class="f32-lvc"/>
        ${T(150, 108, 'f32-tk', 'LV', 'middle')}<text data-r="kt" x="150" y="214" class="f32-lb f32-crt" text-anchor="middle"></text></svg>`;
      el.innerHTML = `<div class="f32-ctl">${segHtml('Ön koşullandırma', 'k', [['yok', 'Ön koşullandırma yok'], ['dog', 'Doğrudan (iskemik)'], ['uzak', 'Uzak (brakiyal)'], ['anes', 'Anestezik (izofluran)']], s.k)}</div>
        ${svgAc(W, H, 'f32-ok-zc', 'Zaman çizelgesi: ön koşullandırma ve ardından uzun iskemi', h)}
        <div class="f32-ok-iz"><div>${kes}</div><div class="f32-mek" data-r="mek"><p class="f32-mek-bas">mekanizma tam bilinmiyor</p><span class="tag basic">genetik / enerjetik hücre değişiklikleri</span><span class="tag basic">iskemik metabolitler (ör. adenozin)</span><span class="tag basic">parakrin etkenler (ör. endojen opioidler)</span></div></div>`;
      el.querySelectorAll('[data-r]').forEach((e) => { R[e.dataset.r] = e; });
      ciz(true);
    };
    const onHtml = () => {
      const { W } = G, { by } = R.geo, bh = G.bh, k = s.k;
      if (k === 'yok') return '';
      const ty = by - 8;
      if (k === 'anes') return Rc(W * 0.05, by + 4, W * 0.5, bh - 8, 'f32-ilac', ' rx="9"') + T(W * 0.05, ty, 'f32-lb f32-cln', W < 400 ? 'izofluran (koroner baypas)' : 'izofluran (koroner baypas cerrahisi)');
      let h = '';
      for (let j = 0; j < 3; j++) {
        const x = W * (0.06 + j * 0.17);
        h += Rc(x, by, W * 0.07, bh, 'f32-blok-kisa', ' rx="4"');
        if (k === 'uzak') h += `<g class="f32-mans"><rect x="${r1(x + W * 0.035 - 9)}" y="${r1(by + 5)}" width="18" height="${bh - 10}" rx="3"/></g>`;
      }
      const et = k === 'dog' ? 'kısa kontrollü koroner iskemisi' : 'brakiyal arter tıkanması (koldaki manşon)';
      return h + T(W * 0.06, ty, 'f32-lb f32-wrn', et);
    };
    const ciz = (aninda) => {
      cancelAnimationFrame(raf);
      const k = s.k;
      R.on.innerHTML = onHtml();
      R.mek.classList.toggle('on', k !== 'yok');
      const hedefF = k === 'yok' ? 0.35 : 0.15;
      R.kt.textContent = k === 'yok' ? 'geniş enfarktüs (model ≈ %35)' : 'küçük enfarktüs (model ≈ %15)';
      const kama = (f) => {
        const a0 = -90 - f * 180, a1 = -90 + f * 180, ri = 50, ro = 88, cx = 150, cy = 104;
        const p = (r, a) => `${r1(cx + r * Math.cos((a * Math.PI) / 180))},${r1(cy + r * Math.sin((a * Math.PI) / 180))}`;
        const buyuk = f > 0.5 ? 1 : 0;
        R.kama.setAttribute('d', f < 0.005 ? '' : `M${p(ri, a0)} L${p(ro, a0)} A${ro},${ro} 0 ${buyuk} 1 ${p(ro, a1)} L${p(ri, a1)} A${ri},${ri} 0 ${buyuk} 0 ${p(ri, a0)} Z`);
      };
      const bas = R.f == null ? hedefF : R.f;
      if (RM || aninda) { at(R.clip, { width: G.W }); kama(hedefF); R.f = hedefF; capY(CAP[k]); return; }
      const t0 = performance.now();
      const adim = (t) => {
        const e = t - t0;
        at(R.clip, { width: G.W * clamp(e / 1200, 0, 1) });
        const f = lerp(bas, hedefF, ease(clamp((e - 1200) / 500, 0, 1)));
        kama(e < 1200 ? bas : f); R.f = f;
        if (e < 1700) raf = requestAnimationFrame(adim);
      };
      raf = requestAnimationFrame(adim);
      capY(CAP[k]);
    };
    const tik = (e) => { const b = e.target.closest('[data-k]'); if (b && el.contains(b)) { s.k = b.dataset.k; basSec(el, 'k', s.k); ciz(); } };
    el.addEventListener('click', tik);
    kur();
    const stopG = genislikIzle(el, kur);
    return () => { stopG(); cancelAnimationFrame(raf); el.removeEventListener('click', tik); };
  };
})();
