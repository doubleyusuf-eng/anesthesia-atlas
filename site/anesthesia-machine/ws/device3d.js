/* Kaynak: İleri Monitörizasyon Atlası 3B cihaz sistemi; atlas core.js ile çakışmaması için K3 → WK3 olarak yeniden adlandırıldı. */
'use strict';
/* Anestezi Makinesi Atlası · iş istasyonları (İleri Monitörizasyon Atlası'ndan taşındı) · 3B cihaz modelleri (prosedürel, three.js)
   Her cihaz, bir "tür kurucusu" (builder) ile bir yapılandırmadan (config) üretilir. Kurucular parçaları (ekran, port,
   tutamak, montaj vb.) adlandırır; görüntüleyici bunlara tıklanabilir işaretler koyar. Ekranlar canlıdır: parametre
   değerleri ve dalga formları canvas dokusuna çizilir (örnek değerler; klinik veri değildir).

   Kullanım (kurucu dosyalarında, ör. dm/dm-monitors.js):
     DEV3D.register('monitor', (cfg, H) => ({group, parts:[{key, at:Vector3, obj?}], screens:[screen]}));
     DEV3D.model('bis-advance', {type:'monitor', ...});
   Ölçüler metre cinsindendir; cihaz zeminde (y = 0) durur, ön yüzü +z yönüne bakar. */
const DEV3D = (() => {
  if (typeof WK3 === 'undefined' || !WK3) return null;
  const {std, lin} = WK3;
  const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
  const builders = {}, configs = {}, partTexts = {};

  /* ---------- Malzemeler ---------- */
  const M = {
    plastic: (c = 0xE9EEF1, r = .45) => std(c, r, .02),
    matte: (c = 0x2B3238, r = .7) => std(c, r, .05),
    metal: (c = 0xC9D0D5, r = .3) => std(c, r, .85),
    chrome: () => std(0xE4E8EB, .14, 1),
    rubber: (c = 0x1D2125) => std(c, .85, 0),
    glass: (c = 0xDDEFF5, o = .35) => std(c, .08, 0, {transparent: true, opacity: o, depthWrite: false}),
    clear: (c = 0xE6F1F5, o = .45) => std(c, .15, 0, {transparent: true, opacity: o, depthWrite: false, side: THREE.DoubleSide}),
    color: (c, r = .5) => std(c, r, .05),
    led: (c) => new THREE.MeshBasicMaterial({color: lin(c), toneMapped: false})
  };

  /* ---------- Geometri yardımcıları ---------- */
  /* Yuvarlatılmış kutu: genişlik (x), yükseklik (y), derinlik (z), köşe yarıçapı */
  function rbox(w, h, d, r, mat) {
    r = Math.min(r, w / 2 - .0005, h / 2 - .0005, d / 2 - .0005);
    const iw = w - 2 * r, ih = h - 2 * r, x = -iw / 2, y = -ih / 2, s = new THREE.Shape(), c = r;
    s.moveTo(x, y - c); s.lineTo(x + iw, y - c); s.quadraticCurveTo(x + iw + c, y - c, x + iw + c, y); s.lineTo(x + iw + c, y + ih);
    s.quadraticCurveTo(x + iw + c, y + ih + c, x + iw, y + ih + c); s.lineTo(x, y + ih + c); s.quadraticCurveTo(x - c, y + ih + c, x - c, y + ih);
    s.lineTo(x - c, y); s.quadraticCurveTo(x - c, y - c, x, y - c);
    const dd = Math.max(d - 2 * r, .0005), g = new THREE.ExtrudeGeometry(s, {depth: dd, bevelEnabled: true, bevelThickness: r, bevelSize: r * .0001, bevelSegments: 4, curveSegments: 6});
    g.translate(0, 0, -dd / 2);
    const m = new THREE.Mesh(g, mat); m.castShadow = m.receiveShadow = true; return m;
  }
  /* Basit kutu ve silindir (gölge açık) */
  const box = (w, h, d, mat) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.castShadow = m.receiveShadow = true; return m; };
  const cyl = (rt, rb, h, mat, seg = 32, open = false) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg, 1, open), mat); m.castShadow = m.receiveShadow = true; return m; };
  const sphere = (r, mat, seg = 24) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.round(seg * .7)), mat); m.castShadow = true; return m; };
  const torus = (R, r, mat, seg = 40) => { const m = new THREE.Mesh(new THREE.TorusGeometry(R, r, 12, seg), mat); m.castShadow = true; return m; };
  const lathe = (pts, mat, seg = 40) => { const m = new THREE.Mesh(new THREE.LatheGeometry(pts.map(p => new THREE.Vector2(p[0], p[1])), seg), mat); m.castShadow = m.receiveShadow = true; return m; };
  const tube = (pts, r, mat, seg = 64, rad = 10) => { const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => Array.isArray(p) ? V3(...p) : p), false, 'centripetal'), seg, r, rad, false), mat); m.castShadow = true; return m; };
  /* Yivli (körüklü) hortum */
  function corrugated(pts, r, mat) {
    const curve = new THREE.CatmullRomCurve3(pts.map(p => Array.isArray(p) ? V3(...p) : p), false, 'centripetal');
    const L = curve.getLength(), segs = Math.max(40, Math.round(L / .006)), g = new THREE.TubeGeometry(curve, segs, r, 12, false), pos = g.attributes.position, P = new THREE.Vector3(), v = new THREE.Vector3();
    for (let i = 0; i <= segs; i++) { curve.getPointAt(i / segs, P); const f = i % 2 ? .88 : 1.1; for (let j = 0; j <= 12; j++) { const k = i * 13 + j; v.fromBufferAttribute(pos, k).sub(P).multiplyScalar(f).add(P); pos.setXYZ(k, v.x, v.y, v.z); } }
    g.computeVertexNormals(); const m = new THREE.Mesh(g, mat); m.castShadow = true; return m;
  }
  const put = (parent, m, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => { m.position.set(x, y, z); m.rotation.set(rx, ry, rz); parent.add(m); return m; };
  function canvasTex(w, h, draw) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); draw(g, w, h);
    const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; t.userData = {canvas: c}; return t;
  }
  /* Etiket/marka bandı gibi düz baskı */
  function decal(w, h, draw, pxw = 512) {
    const t = canvasTex(pxw, Math.round(pxw * h / w), draw);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({map: t, transparent: true, roughness: .6}));
    return m;
  }

  /* ---------- Canlı ekran ----------
     spec: {title, theme:'dark'|'light', accent, params:[{l, v, u, c, big}], waves:[{k, c, l}], extra:'dsa'|'tof'|'nirs2'|'trend'|'bars'|'vent'|'pump'|'lab'|'us'|'tubes'} */
  const WAVE = {
    ecg: t => { t %= 1; return t < .05 ? 0 : t < .08 ? .12 * Math.sin((t - .05) / .03 * Math.PI) : t < .1 ? -.12 : t < .12 ? 1 : t < .14 ? -.25 : t < .3 ? 0 : t < .42 ? .22 * Math.sin((t - .3) / .12 * Math.PI) : 0; },
    pleth: t => { t %= 1; const a = t < .25 ? Math.sin(t / .25 * Math.PI / 2) : Math.max(0, 1 - (t - .25) / .75); return a - (t > .4 && t < .55 ? .12 * Math.sin((t - .4) / .15 * Math.PI) : 0); },
    art: t => { t %= 1; return t < .12 ? t / .12 : t < .3 ? 1 - .5 * (t - .12) / .18 : t < .36 ? .5 + .08 * Math.sin((t - .3) / .06 * Math.PI) : .5 - .5 * (t - .36) / .64; },
    capno: t => { t %= 1; return t < .1 ? 0 : t < .16 ? (t - .1) / .06 : t < .55 ? 1 + .06 * (t - .16) / .39 : t < .6 ? 1.06 - 1.06 * (t - .55) / .05 : 0; },
    eeg: (t, s) => .35 * Math.sin(t * 61 + s) + .25 * Math.sin(t * 23.3 + s * 2) + .2 * Math.sin(t * 137 + s * 3) + .15 * Math.sin(t * 7.1),
    paw: t => { t %= 1; return t < .05 ? t / .05 * .8 : t < .35 ? .8 + .2 * (t - .05) / .3 : t < .4 ? 1 - .7 * (t - .35) / .05 : .3; },
    flow: t => { t %= 1; return t < .35 ? .8 * (1 - t / .35 * .3) : t < .45 ? -.9 * Math.sin((t - .35) / .1 * Math.PI / 2) : -.9 * Math.exp(-(t - .45) * 7); },
    resp: t => .5 + .45 * Math.sin(t * Math.PI * 2),
    cvp: t => { t %= 1; return .5 + .2 * Math.sin(t * Math.PI * 2) + .1 * Math.sin(t * Math.PI * 4); },
    doppler: t => { t %= 1; return t < .1 ? t / .1 : t < .3 ? 1 - (t - .1) / .2 : 0; }
  };
  const RATE = {ecg: .9, pleth: .9, art: .9, capno: .25, eeg: 1, paw: .25, flow: .25, resp: .25, cvp: .9, doppler: .9};
  /* ---------- Serbest ekran yerleşimi ----------
     spec.layout varsa ekran, üreticinin ekranındaki düzene göre panel panel çizilir. Koordinatlar ekranın
     genişlik/yüksekliğine oranla (0–1) verilir; yazı boyutu `s` ekran yüksekliğine oranladır.
     Ortak alanlar: {t: tür, x, y, w, h, fill, stroke, r (köşe, yükseklik oranı), lw}
     Türler:
       box     dolgu/çerçeve                      text   {txt, c, s, wt, al:'l'|'c'|'r', va:'t'|'m'|'b', mono}
       tile    {l, v, u, c, style:'band'|'plain'|'stack', lc, vc, live, vs}  etiketli değer kutusu
       wave    {k, c, l, grid, sweep}              dsa    {scale, yl:['45','Hz','1']}
       trend   {lines:[{c, base, amp, seed, spike}], band:[lo,hi], yt:[...], xt:[...], legend:[[ad, renk]]}
       tof     {n:4, ratio}                        bars   {n, c}         loop {c, k:'vt'|'pv'}
       gauge   {v, min, max, c, l, u}              bar    {v, c, l}      heat {seed}
       icon    {g:'gear'|'bell'|'lock'|'battery'|'bt'|'heart'|'drop'|'sd'|'menu'|'home'|'play'|'pause'|'alarm'|'wifi'|'power'|'arrow', c}
       button  {txt, g, c, fill}                  table  {rows:[[etiket, değer, renk]], s}
       us      {}  ultrason konisi                 visco  {n, labels}
     spec.draw(g, t, api) varsa yerleşimden sonra çağrılır (özel çizimler için). */
  function drawLayout(g, W, Hh, spec, t) {
    const SANS = '"Archivo", "Helvetica Neue", Arial, sans-serif', MONO = '"JetBrains Mono", ui-monospace, Menlo, monospace';
    const F = (wt, s, mono) => `${wt} ${Math.max(6, Math.round(s * Hh))}px ${mono ? MONO : SANS}`;
    const R = p => [p.x * W, p.y * Hh, p.w * W, p.h * Hh];
    const rr = (x, y, w, h, r) => { r = Math.min(r, w / 2, h / 2); g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
    const frame = (p, x, y, w, h) => { const r = (p.r || 0) * Hh; if (p.fill) { g.fillStyle = p.fill; rr(x, y, w, h, r); g.fill(); } if (p.stroke) { g.strokeStyle = p.stroke; g.lineWidth = (p.lw || .004) * Hh; rr(x, y, w, h, r); g.stroke(); } };
    const txt = (s, x, y, o = {}) => { g.fillStyle = o.c || '#fff'; g.font = F(o.wt || 700, o.s || .05, o.mono); g.textAlign = {l: 'left', c: 'center', r: 'right'}[o.al || 'l']; g.textBaseline = {t: 'top', m: 'middle', b: 'alphabetic'}[o.va || 'm']; g.fillText(String(s), x, y); g.textAlign = 'left'; g.textBaseline = 'alphabetic'; };
    const live = (v, i, on) => on && typeof v === 'number' ? v + (Math.sin(t * .7 + i * 1.7) > .96 ? 1 : 0) : v;
    const noise = (u, s) => Math.sin(u * 12.9 + s) * .5 + Math.sin(u * 31.7 + s * 2.1) * .25 + Math.sin(u * 77.3 + s * 3.7) * .12;
    const GL = {
      gear(x, y, r, c) { g.fillStyle = c; g.beginPath(); for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2, rad = k % 2 ? r * .78 : r; g.lineTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad); } g.fill(); g.fillStyle = 'rgba(0,0,0,.85)'; g.beginPath(); g.arc(x, y, r * .35, 0, 7); g.fill(); },
      bell(x, y, r, c) { g.strokeStyle = c; g.lineWidth = r * .16; g.beginPath(); g.moveTo(x - r * .7, y + r * .5); g.quadraticCurveTo(x - r * .6, y - r * .9, x, y - r * .9); g.quadraticCurveTo(x + r * .6, y - r * .9, x + r * .7, y + r * .5); g.closePath(); g.stroke(); g.beginPath(); g.arc(x, y + r * .7, r * .18, 0, 7); g.stroke(); },
      lock(x, y, r, c) { g.fillStyle = c; g.fillRect(x - r * .6, y - r * .1, r * 1.2, r); g.strokeStyle = c; g.lineWidth = r * .2; g.beginPath(); g.arc(x, y - r * .15, r * .4, Math.PI, 0); g.stroke(); },
      battery(x, y, r, c) { g.strokeStyle = c; g.lineWidth = r * .14; g.strokeRect(x - r, y - r * .45, r * 1.8, r * .9); g.fillStyle = c; g.fillRect(x + r * .8, y - r * .2, r * .2, r * .4); for (let k = 0; k < 4; k++) g.fillRect(x - r * .85 + k * r * .42, y - r * .3, r * .34, r * .6); },
      bt(x, y, r, c) { g.fillStyle = c; g.beginPath(); g.ellipse(x, y, r * .6, r, 0, 0, 7); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = r * .14; g.beginPath(); g.moveTo(x - r * .3, y - r * .35); g.lineTo(x + r * .3, y + r * .3); g.lineTo(x, y + r * .6); g.lineTo(x, y - r * .6); g.lineTo(x + r * .3, y - r * .3); g.lineTo(x - r * .3, y + r * .35); g.stroke(); },
      heart(x, y, r, c) { g.fillStyle = c; g.beginPath(); g.moveTo(x, y + r * .8); g.bezierCurveTo(x - r * 1.2, y, x - r * .6, y - r, x, y - r * .3); g.bezierCurveTo(x + r * .6, y - r, x + r * 1.2, y, x, y + r * .8); g.fill(); },
      drop(x, y, r, c) { g.fillStyle = c; g.beginPath(); g.moveTo(x, y - r); g.quadraticCurveTo(x + r * .9, y + r * .2, x, y + r * .9); g.quadraticCurveTo(x - r * .9, y + r * .2, x, y - r); g.fill(); },
      sd(x, y, r, c) { g.fillStyle = c; g.beginPath(); g.moveTo(x - r * .5, y - r * .8); g.lineTo(x + r * .2, y - r * .8); g.lineTo(x + r * .5, y - r * .5); g.lineTo(x + r * .5, y + r * .8); g.lineTo(x - r * .5, y + r * .8); g.fill(); },
      menu(x, y, r, c) { g.fillStyle = c; for (let k = -1; k <= 1; k++) g.fillRect(x - r * .8, y + k * r * .5 - r * .1, r * 1.6, r * .2); },
      home(x, y, r, c) { g.fillStyle = c; g.beginPath(); g.moveTo(x, y - r); g.lineTo(x + r, y); g.lineTo(x + r * .7, y); g.lineTo(x + r * .7, y + r * .8); g.lineTo(x - r * .7, y + r * .8); g.lineTo(x - r * .7, y); g.lineTo(x - r, y); g.fill(); },
      play(x, y, r, c) { g.fillStyle = c; g.beginPath(); g.moveTo(x - r * .5, y - r * .7); g.lineTo(x + r * .7, y); g.lineTo(x - r * .5, y + r * .7); g.fill(); },
      pause(x, y, r, c) { g.fillStyle = c; g.fillRect(x - r * .55, y - r * .7, r * .38, r * 1.4); g.fillRect(x + r * .17, y - r * .7, r * .38, r * 1.4); },
      alarm(x, y, r, c) { g.fillStyle = c; g.beginPath(); g.moveTo(x, y - r); g.lineTo(x + r, y + r * .8); g.lineTo(x - r, y + r * .8); g.fill(); g.fillStyle = '#000'; g.fillRect(x - r * .08, y - r * .35, r * .16, r * .6); g.fillRect(x - r * .08, y + r * .38, r * .16, r * .16); },
      wifi(x, y, r, c) { g.strokeStyle = c; g.lineWidth = r * .16; for (let k = 1; k <= 3; k++) { g.beginPath(); g.arc(x, y + r * .7, r * k * .5, Math.PI * 1.25, Math.PI * 1.75); g.stroke(); } },
      power(x, y, r, c) { g.strokeStyle = c; g.lineWidth = r * .18; g.beginPath(); g.arc(x, y, r * .7, Math.PI * 1.65, Math.PI * 1.35); g.stroke(); g.beginPath(); g.moveTo(x, y - r * .9); g.lineTo(x, y - r * .1); g.stroke(); },
      arrow(x, y, r, c) { g.fillStyle = c; g.beginPath(); g.moveTo(x - r * .6, y - r * .8); g.lineTo(x + r * .6, y); g.lineTo(x - r * .6, y + r * .8); g.fill(); }
    };
    const api = {F, R, rr, txt, GL, WAVE, W, H: Hh};
    if (spec.bg) { g.fillStyle = spec.bg; g.fillRect(0, 0, W, Hh); }
    (spec.layout || []).forEach((p, i) => {
      const [x, y, w, h] = R(p);
      frame(p, x, y, w, h);
      const c = p.c || '#fff';
      switch (p.t) {
        case 'text': {
          const al = p.al || 'l', va = p.va || 'm';
          txt(p.txt, al === 'l' ? x + (p.pad ?? .01) * W : al === 'c' ? x + w / 2 : x + w - (p.pad ?? .01) * W, va === 't' ? y : va === 'b' ? y + h : y + h / 2, {c, s: p.s, wt: p.wt, al, va: va === 'b' ? 'b' : va === 't' ? 't' : 'm', mono: p.mono});
          break;
        }
        case 'tile': {
          const st = p.style || 'plain', v = live(p.v, i, p.live);
          if (st === 'band') {
            const bh = h * (p.bh || .4); g.fillStyle = c; rr(x, y, w, bh, (p.r || .01) * Hh); g.fill(); g.fillRect(x, y + bh / 2, w, bh / 2);
            txt(p.l, x + w / 2, y + bh / 2, {c: p.lc || '#0B1015', s: p.ls || bh / Hh * .62, al: 'c'});
            if (!p.stroke) { g.strokeStyle = c; g.lineWidth = .004 * Hh; rr(x, y, w, h, (p.r || .01) * Hh); g.stroke(); }
            txt(v, x + w / 2, y + bh + (h - bh) / 2, {c: p.vc || c, s: p.vs || (h - bh) / Hh * .78, al: 'c'});
          } else if (st === 'stack') {
            txt(p.l, x + w / 2, y + h * .16, {c: p.lc || c, s: p.ls || h / Hh * .16, al: 'c', wt: 600});
            txt(v, x + w / 2, y + h * .58, {c: p.vc || c, s: p.vs || h / Hh * .5, al: 'c', wt: 800});
            if (p.u) txt(p.u, x + w / 2, y + h * .9, {c: p.uc || '#9AA8B0', s: h / Hh * .12, al: 'c', wt: 500});
          } else {
            txt(p.l, x + w * .06, y + h * .18, {c: p.lc || c, s: p.ls || Math.min(h * .2, w * .14) / Hh, wt: 600});
            if (p.u) txt(p.u, x + w * .94, y + h * .18, {c: p.uc || '#9AA8B0', s: Math.min(h * .14, w * .1) / Hh, wt: 500, al: 'r'});
            txt(v, x + w * (p.al === 'c' ? .5 : p.al === 'r' ? .94 : .06), y + h * .62, {c: p.vc || c, s: p.vs || Math.min(h * .55, w * .34) / Hh, wt: 800, al: p.al || 'l'});
          }
          break;
        }
        case 'wave': {
          const f = WAVE[p.k] || WAVE.ecg, rate = RATE[p.k] || .9, mid = y + h * (p.mid ?? .55), amp = h * (p.amp ?? .36);
          if (p.grid) { g.strokeStyle = p.grid === true ? 'rgba(255,255,255,.08)' : p.grid; g.lineWidth = 1; for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(x, y + h * k / 4); g.lineTo(x + w, y + h * k / 4); g.stroke(); } }
          if (p.l) txt(p.l, x + .006 * W, y + h * .14, {c, s: p.ls || Math.min(.045, h / Hh * .22), wt: 700});
          g.strokeStyle = c; g.lineWidth = Math.max(1.5, (p.lw || .0045) * Hh); g.beginPath();
          const span = p.span || 3.2;
          for (let k = 0; k <= w; k += 2) {
            const u = k / w * span + t * rate * (p.k === 'eeg' ? .6 : 1), v = p.k === 'eeg' ? f(u, i) : f(u);
            const yy = mid - (p.k === 'eeg' || p.k === 'flow' ? v : v - .3) * amp;
            k ? g.lineTo(x + k, yy) : g.moveTo(x + k, yy);
          }
          g.stroke();
          if (p.fillUnder) { g.lineTo(x + w, mid + amp * .3); g.lineTo(x, mid + amp * .3); g.closePath(); g.globalAlpha = p.fillAlpha ?? .25; g.fillStyle = c; g.fill(); g.globalAlpha = 1; }
          break;
        }
        case 'dsa': {
          const sx = p.scale ? w * .06 : 0, ax = p.yl ? w * .06 : 0, cols = p.cols || 110, rows = p.rows || 22, cw = (w - sx - ax) / cols, chh = h / rows;
          for (let ci = 0; ci < cols; ci++) for (let ri = 0; ri < rows; ri++) {
            /* Üstte yüksek frekans (düşük güç, mavi), altta düşük frekans (yüksek güç, sarı-kırmızı); zamanla yavaş değişim ve benek */
            const tt = ci + Math.floor(t * 2), low = ri / rows, hsh = Math.abs(Math.sin((tt * 7.13 + ri * 3.71) * 12.9898)) % 1;
            let v = .04 + .72 * Math.pow(low, 1.6) + .08 * noise(tt * .02, 1) + .06 * noise(ri * .45, 2) + .1 * (hsh - .5);
            if (low > .55 && low < .7) v += .08 * (.5 + .5 * Math.sin(tt * .09)); if (ci < cols * .08) v += .2 * (1 - ci / (cols * .08));
            v = Math.max(0, Math.min(1, v));
            g.fillStyle = `hsl(${240 - v * 240},90%,${30 + v * 22}%)`; g.fillRect(x + ax + ci * cw, y + ri * chh, cw + .6, chh + .6);
          }
          if (p.yl) p.yl.forEach((s, k) => txt(s, x + ax * .4, y + h * (k / (p.yl.length - 1)) * .92 + h * .04, {c: p.lc || '#E6EEF2', s: Math.min(.045, h / Hh * .14), al: 'c', wt: 600}));
          if (p.scale) { const gx = x + w - sx * .55; for (let k = 0; k < 40; k++) { g.fillStyle = `hsl(${k / 40 * 240},90%,50%)`; g.fillRect(gx, y + h * .05 + k * h * .9 / 40, sx * .25, h * .9 / 40 + 1); } txt('+', gx + sx * .55, y + h * .1, {c: '#E6EEF2', s: .04, al: 'c'}); txt('−', gx + sx * .55, y + h * .9, {c: '#E6EEF2', s: .04, al: 'c'}); }
          break;
        }
        case 'trend': {
          const ax = p.yt ? w * .07 : 0, bx = x + ax, bw = w - ax - (p.legend ? w * .2 : 0), by = y + h * .04, bh2 = h * (p.xt ? .8 : .92);
          const yv = v => by + bh2 * (1 - v / (p.max || 100));
          if (p.band) { g.fillStyle = p.bandFill || 'rgba(255,255,255,.28)'; g.fillRect(bx, yv(p.band[1]), bw, yv(p.band[0]) - yv(p.band[1])); }
          if (p.yt) { g.setLineDash([4, 4]); g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 1; p.yt.forEach(v => { g.beginPath(); g.moveTo(bx, yv(v)); g.lineTo(bx + bw, yv(v)); g.stroke(); txt(v, bx - w * .01, yv(v), {c: p.lc || '#E6EEF2', s: Math.min(.04, h / Hh * .1), al: 'r', wt: 600}); }); g.setLineDash([]); }
          if (p.xt) p.xt.forEach((s, k) => txt(s, bx + bw * k / (p.xt.length - .6), y + h * .94, {c: p.lc || '#E6EEF2', s: Math.min(.04, h / Hh * .1), al: 'l', wt: 600}));
          (p.lines || []).forEach((ln, li) => {
            g.strokeStyle = ln.c; g.lineWidth = Math.max(1.5, .005 * Hh); g.beginPath();
            for (let k = 0; k <= bw; k += 3) {
              const u = k / bw; let v = ln.base + (ln.amp ?? 6) * noise(u * 3 + t * .02, ln.seed ?? li);
              if (ln.shape === 'induction') v = u < .06 ? 95 : u < .14 ? 95 - (95 - ln.base) * (u - .06) / .08 : u > .9 ? ln.base + (95 - ln.base) * (u - .9) / .1 : v;
              if (ln.spike && Math.abs(u - ln.spike) < .03) v += (ln.spikeH || 20) * (1 - Math.abs(u - ln.spike) / .03);
              const yy = yv(Math.max(0, Math.min(p.max || 100, v)));
              k ? g.lineTo(bx + k, yy) : g.moveTo(bx + k, yy);
            }
            g.stroke();
          });
          if (p.legend) {
            const lx = x + w * .81, lw2 = w * .19; g.strokeStyle = 'rgba(255,255,255,.6)'; g.lineWidth = .003 * Hh; g.strokeRect(lx, y + h * .02, lw2, h * .8);
            p.legend.forEach(([s, col], k) => txt(s, lx + lw2 / 2, y + h * (.14 + k * .76 / p.legend.length), {c: col, s: Math.min(.045, h / Hh * .13), al: 'c'}));
          }
          break;
        }
        case 'tof': {
          const n = p.n || 4, shown = Math.floor(t * 2) % (n + 2), bw = w / (n * 2 + 1);
          for (let k = 0; k < n; k++) { const ratio = p.ratio ?? .9, hh = h * .8 * (1 - (1 - ratio) * k / (n - 1)) * (k <= shown ? 1 : .12); g.fillStyle = k <= shown ? c : 'rgba(255,255,255,.15)'; g.fillRect(x + bw * (1 + k * 2), y + h * .92 - hh, bw, hh); }
          break;
        }
        case 'bars': {
          const n = p.n || 20; for (let k = 0; k < n; k++) { const v = .25 + .65 * Math.abs(Math.sin(k * .7 + t * 1.3)); g.fillStyle = c; g.fillRect(x + k * w / n + w / n * .15, y + h * (1 - v), w / n * .7, h * v); }
          break;
        }
        case 'loop': {
          g.strokeStyle = c; g.lineWidth = .005 * Hh; g.beginPath();
          for (let a = 0; a <= 64; a++) { const u = a / 64 * Math.PI * 2; const xx = x + w * .5 + Math.cos(u) * w * .36, yy = y + h * .55 + Math.sin(u) * h * .32 + Math.cos(u) * h * .1; a ? g.lineTo(xx, yy) : g.moveTo(xx, yy); }
          g.stroke(); g.strokeStyle = 'rgba(255,255,255,.3)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x + w * .08, y + h * .1); g.lineTo(x + w * .08, y + h * .92); g.lineTo(x + w * .95, y + h * .92); g.stroke();
          break;
        }
        case 'gauge': {
          const cx = x + w / 2, cy = y + h * .62, rad = Math.min(w * .45, h * .55), fr = Math.max(0, Math.min(1, ((p.v ?? 0) - (p.min ?? 0)) / ((p.max ?? 100) - (p.min ?? 0))));
          g.lineWidth = rad * .16; g.strokeStyle = 'rgba(255,255,255,.15)'; g.beginPath(); g.arc(cx, cy, rad, Math.PI * .8, Math.PI * 2.2); g.stroke();
          g.strokeStyle = c; g.beginPath(); g.arc(cx, cy, rad, Math.PI * .8, Math.PI * (.8 + 1.4 * fr)); g.stroke();
          txt(live(p.v, i, p.live), cx, cy, {c: p.vc || '#fff', s: rad / Hh * .7, al: 'c', wt: 800});
          if (p.l) txt(p.l, cx, cy + rad * .62, {c, s: rad / Hh * .22, al: 'c', wt: 600});
          break;
        }
        case 'bar': {
          g.fillStyle = 'rgba(255,255,255,.15)'; rr(x, y, w, h, h / 2); g.fill(); g.fillStyle = c; rr(x, y, w * Math.max(.02, Math.min(1, p.v ?? .5)), h, h / 2); g.fill();
          break;
        }
        case 'heat': {
          const n = 8; for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) { const v = Math.max(0, Math.min(1, .3 + .6 * noise(a * .3 + b * .2, (p.seed || 1) + b))); g.fillStyle = `hsl(${240 - v * 240},90%,${30 + v * 20}%)`; g.fillRect(x + a * w / n, y + b * h / n, w / n + .5, h / n + .5); }
          break;
        }
        case 'icon': { (GL[p.g] || GL.menu)(x + w / 2, y + h / 2, Math.min(w, h) * .42, c); break; }
        case 'button': {
          if (!p.fill && !p.stroke) { g.strokeStyle = p.bc || 'rgba(255,255,255,.75)'; g.lineWidth = .005 * Hh; rr(x, y, w, h, (p.r || .02) * Hh); g.stroke(); }
          if (p.g) (GL[p.g] || GL.menu)(x + w / 2 - (p.txt ? w * .25 : 0), y + h / 2, Math.min(w, h) * .3, c);
          if (p.txt) txt(p.txt, x + w / 2 + (p.g ? w * .1 : 0), y + h / 2, {c, s: p.s || h / Hh * .36, al: 'c', wt: p.wt || 700});
          break;
        }
        case 'table': {
          const rows = p.rows || [], rh = h / Math.max(1, rows.length), s = p.s || Math.min(.05, rh / Hh * .55);
          rows.forEach(([l, v, col], k) => { const yy = y + rh * (k + .5); if (k % 2 && p.zebra !== false) { g.fillStyle = 'rgba(255,255,255,.05)'; g.fillRect(x, y + rh * k, w, rh); } txt(l, x + w * .03, yy, {c: p.lc || '#9AA8B0', s, wt: 600}); txt(v, x + w * (p.vx || .97), yy, {c: col || c, s, wt: 800, al: 'r'}); });
          break;
        }
        case 'us': {
          const cx = x + w / 2, cy = y + h * .03, rad = h * .95, a0 = Math.PI * (p.linear ? .5 : .3), a1 = Math.PI * (p.linear ? .5 : .7);
          g.save(); g.beginPath();
          if (p.linear) g.rect(x + w * .1, y, w * .8, h); else { g.moveTo(cx, cy); g.arc(cx, cy, rad, a0, a1); g.closePath(); }
          g.clip(); g.fillStyle = '#000'; g.fillRect(x, y, w, h);
          for (let k = 0; k < 3200; k++) { const xx = x + w * ((k * .618) % 1), yy = y + h * ((k * .381 + t * .004) % 1); const v = 35 + 150 * Math.abs(Math.sin(k * 12.9898)) * (.5 + .5 * Math.sin(yy / h * 9)); g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(xx, yy, 3, 2); }
          g.fillStyle = 'rgba(0,0,0,.9)'; g.beginPath(); g.ellipse(cx, y + h * .55, w * .1, h * .1, 0, 0, 7); g.fill();
          g.restore();
          break;
        }
        case 'visco': {
          const n = p.n || 4, cols = ['#4FD1BE', '#F2C531', '#8AA8FF', '#F07A6A', '#B184E8', '#5BB7DE'];
          for (let k = 0; k < n; k++) {
            const y0 = y + k * h / n, hh = h / n, mid = y0 + hh / 2, len = Math.min(1, (t * .08 + k * .1) % 1.3);
            g.strokeStyle = 'rgba(255,255,255,.15)'; g.lineWidth = 1; g.strokeRect(x, y0 + 2, w, hh - 4);
            g.fillStyle = cols[k % 6]; g.globalAlpha = .6; g.beginPath(); g.moveTo(x, mid);
            const A = u => u < .12 ? 0 : Math.min(1, (u - .12) / .3) * (1 - Math.max(0, u - .8) * .3);
            for (let k2 = 0; k2 <= w * len; k2 += 3) g.lineTo(x + k2, mid - A(k2 / w) * hh * .42);
            for (let k2 = w * len; k2 >= 0; k2 -= 3) g.lineTo(x + k2, mid + A(k2 / w) * hh * .42);
            g.closePath(); g.fill(); g.globalAlpha = 1;
            if (p.labels && p.labels[k]) txt(p.labels[k], x + w * .01, y0 + hh * .2, {c: cols[k % 6], s: Math.min(.04, hh / Hh * .22), wt: 700});
          }
          break;
        }
      }
    });
    if (spec.draw) spec.draw(g, t, api);
  }

  const SIM = {on: false}; /* mount sırasında: yapılandırmada sim:true ya da iş istasyonu oluşturucusu */
  const made = []; /* test sayfası (_screen.html) için üretilen ekran tuvalleri */
  function makeScreen(w, h, spec, pxw = 1024) {
    const PH = Math.round(pxw * h / w), c = document.createElement('canvas'); c.width = pxw; c.height = PH; made.push(c);
    const sim = SIM.on; /* temsili ekran: köşeye "Eğitim simülasyonu" yazılır */
    const g = c.getContext('2d'), tex = new THREE.CanvasTexture(c); tex.encoding = THREE.sRGBEncoding; tex.anisotropy = 4;
    const dark = spec.theme !== 'light', BG = dark ? '#05090C' : '#F4F7F8', FG = dark ? '#E6EEF2' : '#11181C', DIM = dark ? '#6F8796' : '#5A6B75', LINE = dark ? '#16232B' : '#D3DCE0';
    const acc = spec.accent || '#4FD1BE';
    const font = (wt, px) => `${wt} ${Math.round(px)}px "JetBrains Mono", ui-monospace, Menlo, monospace`;
    const params = spec.params || [], waves = spec.waves || [];
    let last = -1;
    function draw(t) {
      if (spec.layout || spec.draw) { g.fillStyle = spec.bg || BG; g.fillRect(0, 0, pxw, PH); drawLayout(g, pxw, PH, spec, t); simMark(); tex.needsUpdate = true; return; }
      g.fillStyle = BG; g.fillRect(0, 0, pxw, PH);
      const hh = PH * .1;
      g.fillStyle = dark ? '#0C161C' : '#E2E9EC'; g.fillRect(0, 0, pxw, hh);
      g.fillStyle = FG; g.font = font(700, hh * .5); g.textBaseline = 'middle'; g.fillText(spec.title || '', pxw * .02, hh / 2);
      g.fillStyle = DIM; g.font = font(500, hh * .4); g.textAlign = 'right'; g.fillText('08:42', pxw * .98, hh / 2); g.textAlign = 'left';
      const top = hh + PH * .02, bottom = PH * .98;
      const hasW = waves.length || ['dsa', 'tof', 'nirs2', 'trend', 'bars', 'vent', 'us', 'lab', 'tubes', 'pump'].includes(spec.extra);
      const wx = pxw * .02, ww = hasW ? (params.length ? pxw * .6 : pxw * .96) : 0;
      /* Dalga formları */
      const nRows = waves.length + (['dsa', 'trend', 'bars', 'tof', 'nirs2', 'vent'].includes(spec.extra) ? (spec.extra === 'tof' || spec.extra === 'nirs2' ? 2 : 1) : 0);
      const rh = nRows ? (bottom - top) / nRows : 0;
      waves.forEach((wv, i) => {
        const y0 = top + i * rh, mid = y0 + rh * .55, amp = rh * .38, f = WAVE[wv.k] || WAVE.ecg, rate = RATE[wv.k] || .9;
        g.strokeStyle = LINE; g.lineWidth = 1; g.beginPath(); g.moveTo(wx, y0 + rh - 1); g.lineTo(wx + ww, y0 + rh - 1); g.stroke();
        g.fillStyle = wv.c || acc; g.font = font(600, rh * .17); g.fillText(wv.l || wv.k.toUpperCase(), wx + 4, y0 + rh * .16);
        g.strokeStyle = wv.c || acc; g.lineWidth = Math.max(2, pxw / 380); g.beginPath();
        const span = 3.2;
        for (let x = 0; x <= ww; x += 2) {
          const u = x / ww * span + t * rate * (wv.k === 'eeg' ? .6 : 1);
          const v = wv.k === 'eeg' ? f(u, i) : f(u);
          const y = mid - (wv.k === 'eeg' || wv.k === 'flow' ? v : v - .3) * amp;
          x ? g.lineTo(wx + x, y) : g.moveTo(wx + x, y);
        }
        g.stroke();
      });
      /* Ek paneller */
      let ey = top + waves.length * rh;
      if (spec.extra === 'dsa') {
        const cols = 90, rows = 16, cw = ww / cols, chh = (rh * .82) / rows;
        for (let ci = 0; ci < cols; ci++) for (let ri = 0; ri < rows; ri++) {
          const tt = ci + Math.floor(t * 2), alpha = .5 + .5 * Math.sin(tt * .13 + ri * .4) * Math.cos(tt * .05 - ri * .2), low = ri > rows * .55 ? 1 : .6;
          const v = Math.max(0, Math.min(1, alpha * low));
          g.fillStyle = `hsl(${240 - v * 240},85%,${20 + v * 35}%)`; g.fillRect(wx + ci * cw, ey + rh * .12 + ri * chh, cw + .5, chh + .5);
        }
        g.fillStyle = DIM; g.font = font(600, rh * .13); g.fillText('DSA', wx + 4, ey + rh * .08);
        ey += rh;
      } else if (spec.extra === 'trend' || spec.extra === 'nirs2') {
        const lines = spec.extra === 'nirs2' ? [['L', '#4FD1BE', 68], ['R', '#F2C531', 71]] : [['', acc, 50]];
        lines.forEach(([lab, col, base], li) => {
          const y0 = ey + li * rh, mid = y0 + rh * .55;
          g.strokeStyle = LINE; g.beginPath(); g.moveTo(wx, y0 + rh - 1); g.lineTo(wx + ww, y0 + rh - 1); g.stroke();
          g.strokeStyle = col; g.lineWidth = 3; g.beginPath();
          for (let x = 0; x <= ww; x += 4) { const u = x / ww; const y = mid - (Math.sin(u * 9 + li) * .25 + Math.sin(u * 23 + t * .2) * .08) * rh * .5; x ? g.lineTo(wx + x, y) : g.moveTo(wx + x, y); }
          g.stroke(); g.fillStyle = col; g.font = font(700, rh * .16); g.fillText(lab ? `${lab} · ${spec.trendLabel || 'rSO₂'}` : (spec.trendLabel || 'TREND'), wx + 4, y0 + rh * .16);
        });
        ey += rh * lines.length;
      } else if (spec.extra === 'tof') {
        const n = Math.floor(t * 2) % 6, y0 = ey, bw = ww / 9;
        for (let k = 0; k < 4; k++) { const hgt = rh * 1.4 * (1 - k * .06) * (k <= n ? 1 : .15); g.fillStyle = k <= n ? acc : LINE; g.fillRect(wx + bw * (1 + k * 2), y0 + rh * 1.8 - hgt, bw, hgt); }
        g.fillStyle = FG; g.font = font(700, rh * .3); g.fillText('T1 T2 T3 T4', wx + bw, y0 + rh * .28);
        ey += rh * 2;
      } else if (spec.extra === 'bars') {
        for (let k = 0; k < 24; k++) { const v = .3 + .6 * Math.abs(Math.sin(k * .7 + t * 1.3)); g.fillStyle = acc; g.fillRect(wx + k * ww / 24, ey + rh * (1 - v * .8), ww / 30, rh * v * .8); }
        ey += rh;
      } else if (spec.extra === 'vent') {
        g.fillStyle = DIM; g.font = font(600, rh * .14); g.fillText('V-T LOOP', wx + 4, ey + rh * .16);
        g.strokeStyle = acc; g.lineWidth = 3; g.beginPath();
        for (let a = 0; a <= 64; a++) { const u = a / 64 * Math.PI * 2; const x = wx + ww * .5 + Math.cos(u) * ww * .18, y = ey + rh * .58 + Math.sin(u) * rh * .3 + Math.cos(u) * rh * .08; a ? g.lineTo(x, y) : g.moveTo(x, y); }
        g.stroke(); ey += rh;
      }
      if (spec.extra === 'us') {
        /* Ultrason görüntüsü: koni içinde benekli doku */
        const cx = wx + ww / 2, cy = top + 10, R = bottom - top - 20;
        g.save(); g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, R, Math.PI * .3, Math.PI * .7); g.closePath(); g.clip();
        for (let k = 0; k < 2600; k++) { const a = Math.PI * (.3 + .4 * ((k * 0.618) % 1)), r = R * ((k * 0.381 + t * .01) % 1); const v = 40 + 140 * Math.abs(Math.sin(k * 12.9898)); g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 3, 2); }
        g.fillStyle = 'rgba(0,0,0,.85)'; g.beginPath(); g.ellipse(cx, cy + R * .55, ww * .07, R * .08, 0, 0, 7); g.fill();
        g.restore();
      } else if (spec.extra === 'lab' || spec.extra === 'tubes') {
        /* Analizör: sonuç tablosu ya da viskoelastik eğriler */
        if (spec.extra === 'tubes') {
          const n = spec.curves || 4;
          for (let k = 0; k < n; k++) {
            const y0 = top + k * (bottom - top) / n, hgt = (bottom - top) / n, mid = y0 + hgt / 2;
            g.strokeStyle = LINE; g.strokeRect(wx, y0 + 2, ww, hgt - 4);
            g.fillStyle = ['#4FD1BE', '#F2C531', '#8AA8FF', '#F07A6A', '#B184E8', '#5BB7DE'][k % 6]; g.globalAlpha = .55;
            g.beginPath(); g.moveTo(wx, mid);
            const len = Math.min(1, (t * .08 + k * .1) % 1.3);
            for (let x = 0; x <= ww * len; x += 3) { const u = x / ww; const a = u < .12 ? 0 : Math.min(1, (u - .12) / .3) * (1 - Math.max(0, u - .8) * .3); g.lineTo(wx + x, mid - a * hgt * .42); }
            for (let x = ww * len; x >= 0; x -= 3) { const u = x / ww; const a = u < .12 ? 0 : Math.min(1, (u - .12) / .3) * (1 - Math.max(0, u - .8) * .3); g.lineTo(wx + x, mid + a * hgt * .42); }
            g.closePath(); g.fill(); g.globalAlpha = 1;
          }
        } else {
          const rowsN = Math.max(params.length, 1);
          params.forEach((p, i) => { const y = top + (i + .7) * (bottom - top) / (rowsN + 1); g.fillStyle = DIM; g.font = font(600, PH * .05); g.fillText(p.l, wx + 6, y); g.fillStyle = p.c || FG; g.font = font(700, PH * .06); g.fillText(`${p.v} ${p.u || ''}`, wx + ww * .5, y); });
        }
      } else if (spec.extra === 'pump') {
        g.fillStyle = FG; g.font = font(700, PH * .2); g.fillText(params[0] ? params[0].v : '', wx, top + (bottom - top) * .45);
        g.fillStyle = DIM; g.font = font(600, PH * .07); g.fillText(params[0] ? `${params[0].l} · ${params[0].u || ''}` : '', wx, top + (bottom - top) * .7);
        g.fillStyle = acc; for (let k = 0; k < 8; k++) { g.globalAlpha = (k === Math.floor(t * 4) % 8) ? 1 : .25; g.fillRect(wx + k * 26, bottom - 24, 18, 12); } g.globalAlpha = 1;
      }
      /* Parametre kutuları */
      if (params.length && spec.extra !== 'lab' && spec.extra !== 'pump') {
        const px0 = hasW ? pxw * .64 : pxw * .02, pw = hasW ? pxw * .34 : pxw * .96;
        const cols = hasW ? 1 : Math.min(3, params.length), rowsN = Math.ceil(params.length / cols), th = (bottom - top) / rowsN, tw = pw / cols;
        params.forEach((p, i) => {
          const cx = px0 + (i % cols) * tw, cy = top + Math.floor(i / cols) * th;
          g.strokeStyle = LINE; g.lineWidth = 1; g.strokeRect(cx + 2, cy + 2, tw - 4, th - 4);
          g.fillStyle = p.c || acc; g.font = font(600, Math.min(th * .2, tw * .1)); g.fillText(p.l, cx + 10, cy + th * .2);
          const big = p.big ? .62 : .48; g.font = font(700, Math.min(th * big, tw * .3));
          const flick = p.live ? (Math.sin(t * .7 + i) > .97 ? 1 : 0) : 0;
          g.fillText(String(p.live && typeof p.v === 'number' ? p.v + flick : p.v), cx + 10, cy + th * .68);
          if (p.u) { g.fillStyle = DIM; g.font = font(500, Math.min(th * .16, tw * .08)); g.fillText(p.u, cx + 10, cy + th * .9); }
        });
      }
      simMark(); tex.needsUpdate = true;
    }
    function simMark() {
      if (!sim) return;
      const txt = typeof ICA !== 'undefined' ? ICA.t('dev.sim') : 'Eğitim simülasyonu', fs = Math.max(9, Math.round(PH * .032));
      g.font = `700 ${fs}px "Archivo", Arial, sans-serif`; const tw = g.measureText(txt).width + fs;
      g.fillStyle = 'rgba(0,0,0,.55)'; g.fillRect(pxw - tw - 4, PH - fs * 1.6 - 4, tw, fs * 1.6);
      g.fillStyle = '#FFD24A'; g.textAlign = 'right'; g.textBaseline = 'middle'; g.fillText(txt, pxw - 4 - fs / 2, PH - fs * .8 - 4); g.textAlign = 'left'; g.textBaseline = 'alphabetic';
    }
    draw(0);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({map: tex, toneMapped: false}));
    mesh.userData.part = 'screen';
    return {mesh, update(t) { if (t - last > .06) { last = t; draw(t); } }};
  }

  /* ---------- Kayıt ---------- */
  const register = (type, fn) => { builders[type] = fn; };
  /* Parça adları ve açıklamaları: {tr:[ad, açıklama], en:[...], es:[...]} */
  const partText = (key, t) => { partTexts[key] = t; };
  const part = (key, i) => { const t = partTexts[key]; if (!t) return key; const v = t[ICA.lang] || t.tr; return v[i] || ''; };
  const model = (id, cfg) => { configs[id] = cfg; };
  const has = id => !!(configs[id] && builders[configs[id].type]);
  const H = {V3, M, rbox, box, cyl, sphere, torus, lathe, tube, corrugated, put, canvasTex, decal, makeScreen, WAVE};

  /* ---------- Görüntüleyici ---------- */
  function mount(stage, id, onPick) {
    const cfg = configs[id]; if (!cfg || !builders[cfg.type]) return null;
    SIM.on = cfg.sim ?? (cfg.type === 'd-workstation');
    let built; try { built = builders[cfg.type](cfg, H); } finally { SIM.on = false; }
    const group = built.group;
    const bb = new THREE.Box3().setFromObject(group), size = bb.getSize(new THREE.Vector3()), ctr = bb.getCenter(new THREE.Vector3());
    const R = Math.max(size.x, size.y * 1.1, size.z) * .5;
    /* Kadraj: kutunun 8 köşesi tam bir dönüş boyunca (otomatik döndürme) görüş alanına sığana kadar uzaklığı ara */
    const th0 = cfg.theta ?? .55, ph = cfg.phi ?? 1.25, tf = Math.tan(15 * Math.PI / 180), AS = 1.2, M = .9;
    const corners = []; for (let k = 0; k < 8; k++) corners.push(new THREE.Vector3(k & 1 ? bb.max.x : bb.min.x, k & 2 ? bb.max.y : bb.min.y, k & 4 ? bb.max.z : bb.min.z).sub(ctr));
    const fits = D => { for (let a = 0; a < 12; a++) { const th = th0 + a * Math.PI / 6;
        const fw = new THREE.Vector3(-Math.sin(ph) * Math.sin(th), -Math.cos(ph), -Math.sin(ph) * Math.cos(th)), rt = new THREE.Vector3(Math.cos(th), 0, -Math.sin(th)), up = new THREE.Vector3().crossVectors(rt, fw);
        for (const c of corners) { const z = D + c.dot(fw); if (z <= .01 || Math.abs(c.dot(up)) / z > tf * M || Math.abs(c.dot(rt)) / z > tf * AS * M) return false; } }
      return true; };
    let lo = .1, hi = Math.max(.5, size.length() * 6); for (let it = 0; it < 22; it++) { const m = (lo + hi) / 2; if (fits(m)) hi = m; else lo = m; }
    const dist = Math.max(.25, hi) * (cfg.zoom || 1);
    if (size.y > Math.max(size.x, size.z) * 1.1) stage.classList.add('stage-tall'); /* arabalı / ayaklı cihazlar için daha yüksek sahne */
    const view = new WK3.Viewer(stage, {target: [ctr.x, ctr.y, ctr.z], dist, theta: cfg.theta ?? .55, phi: cfg.phi ?? 1.25, minD: dist * .25, maxD: dist * 2.4, fov: 30, shadow: Math.max(.4, R * 2.5), groundR: Math.max(.3, R * 2.2), panLim: R * 1.5, fitAspect: 1.2});
    view.root.add(group);
    view.occluders = [group];
    view.auto = !REDUCED_MOTION;
    const screens = built.screens || [];
    view.tick.push((dt, t) => { for (const s of screens) s.update(t); });
    /* Parça işaretleri */
    const parts = (built.parts || []).filter(p => p.key && p.at);
    const tags = parts.map((p, i) => {
      const tg = view.addTag(String(i + 1), p.at.clone(), 'num pin3d');
      tg.el.setAttribute('role', 'button'); tg.el.tabIndex = 0;
      tg.el.title = part(p.key, 0);
      const pick = () => select(i);
      tg.el.addEventListener('click', pick); tg.el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
      return tg;
    });
    let selected = -1;
    function select(i) {
      selected = i;
      tags.forEach((tg, k) => tg.el.classList.toggle('on', k === i));
      const p = parts[i]; if (!p) return;
      view.focus(p.at.clone(), dist * .55, view.v.theta, view.v.phi);
      if (onPick) onPick(p.key, i);
    }
    view.onReset = () => { view.reset(); view.auto = !REDUCED_MOTION; tags.forEach(tg => tg.el.classList.remove('on')); selected = -1; if (onPick) onPick(null); };
    return {parts, select, view};
  }

  return {register, model, has, mount, H, configs, partText, part, made};
})();
