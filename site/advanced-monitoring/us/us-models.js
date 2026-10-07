'use strict';
/* İleri Monitörizasyon Atlası · ultrason bölümü · 3B modeller
   Clarius HD3 kablosuz el probları (8 model), Vygon VygoPlex ENS & Echo blok iğnesi ve Vygon Plexygon sinir stimülatörü.
   Clarius gövde profili ve baş biçimleri üreticinin ürün fotoğraflarından piksel ölçümüyle çıkarıldı (kapak genişliği
   ölçek alındı; kalınlık profili ve C7 HD3 başı yaklaşık). Ölçüler: Clarius HD3 teknik verisi, Vygon ürün sayfaları.
   USM.probe(id) ve USM.needle(o) laboratuvar sahnesinde de kullanılır; USM.plx Plexygon ekranının ortak durumudur. */
const USM = (() => {
  if (typeof DEV3D === 'undefined' || !DEV3D) return null;
  const {V3, M, rbox, box, cyl, sphere, tube, canvasTex, makeScreen, lathe} = DEV3D.H;
  const {std} = K3;

  /* ---------- Model verisi (Clarius HD3 teknik verisi, MKTG-00153 Rev 6) ---------- */
  const MODELS = {
    'clarius-l7':  {name: 'L7 HD3',  tag: 'L7',  kind: 'linear', f: [4, 13], dmax: 11, fovTxt: '38 mm', el: 192, R: null, dims: '147 × 76 × 32', g: 288, L: 147, ne: true, sc: true, hi: true, f0: 10},
    'clarius-l15': {name: 'L15 HD3', tag: 'L15', kind: 'linear', f: [5, 15], dmax: 7,  fovTxt: '50 mm', el: 192, R: null, dims: '147 × 76 × 32', g: 290, L: 147, ne: true, sc: true, hi: false, f0: 12},
    'clarius-l20': {name: 'L20 HD3', tag: 'L20', kind: 'linear', f: [8, 20], dmax: 4,  fovTxt: '25 mm', el: 192, R: null, dims: '147 × 76 × 32', g: 290, L: 147, ne: true, sc: true, hi: false, f0: 16},
    'clarius-c3':  {name: 'C3 HD3',  tag: 'C3',  kind: 'convex', f: [2, 6],  dmax: 40, fovTxt: '73°', el: 192, R: 45, fov: 73, dims: '146 × 76 × 32', g: 308, L: 146, ne: false, sc: true, hi: true, f0: 4},
    'clarius-c7':  {name: 'C7 HD3',  tag: 'C7',  kind: 'micro',  f: [3, 10], dmax: 18, fovTxt: '112°', el: 192, R: 20, fov: 112, dims: '151 × 76 × 32', g: 289, L: 151, ne: false, sc: false, hi: false, f0: 7},
    'clarius-ec7': {name: 'EC7 HD3', tag: 'EC7', kind: 'endo',   f: [3, 10], dmax: 15, fovTxt: '164°', el: 192, R: 10, fov: 164, dims: '310 × 76 × 32', g: 326, L: 310, ne: false, sc: false, hi: false, f0: 7},
    'clarius-pa':  {name: 'PA HD3',  tag: 'PA',  kind: 'phased', f: [1, 5],  dmax: 40, fovTxt: '90°', el: 80, R: null, fov: 90, dims: '148 × 76 × 32', g: 292, L: 148, ne: false, sc: false, hi: true, f0: 3},
    'clarius-pal': {name: 'PAL HD3', tag: 'L',   kind: 'dual',   f: [1, 15], dmax: 40, fovTxt: '90° (PA) + 29 mm (LA)', el: 192, R: null, fov: 90, dims: '148 × 76 × 32', g: 307, L: 148, ne: true, sc: true, hi: true, f0: 3}
  };
  const GEOM = {
    'clarius-l7': {type: 'linear', W: 38}, 'clarius-l15': {type: 'linear', W: 50}, 'clarius-l20': {type: 'linear', W: 25},
    'clarius-c3': {type: 'convex', R: 45, fov: 73}, 'clarius-c7': {type: 'convex', R: 20, fov: 112}, 'clarius-ec7': {type: 'convex', R: 10, fov: 164},
    'clarius-pa': {type: 'phased', fov: 90}, 'clarius-pal': {type: 'phased', fov: 90}, 'clarius-pal-la': {type: 'linear', W: 29}
  };

  /* ---------- Malzemeler ---------- */
  const MAT = {
    cap: () => std(0xE7E9EA, .34, .02), body: () => std(0x111316, .5, .05),
    head: () => std(0xEEF0F1, .3, .02), chrome: () => std(0xE4E9EC, .12, .72), lens: () => std(0x121416, .55, 0)
  };

  /* ---------- Gövde profili (fotoğraf ölçümü): [üstten mm, genişlik, kalınlık, süperelips üssü] ----------
     0–29,5 mm beyaz kapak, 29,5–126,5 mm siyah gövde (bel ≈ 55 mm, alt şişkinlik ≈ 75,6 mm). Baş bundan sonra modele göre. */
  const CAP = [[0, 56, 23, 4.6], [.7, 62, 26.4, 4.6], [1.6, 66, 28.4, 4.6], [3, 68.8, 29.6, 4.4], [5, 70.4, 30.1, 4.2], [8, 71.3, 30.3, 4], [16, 71.6, 30.4, 3.8], [24, 71.1, 30.5, 3.6], [29.5, 70.6, 30.6, 3.5]];
  const BODY = [[29.5, 70.6, 30.6, 3.5], [36, 69.7, 30.8, 3.4], [44, 67.3, 30.6, 3.4], [52, 63.5, 30.1, 3.3], [60, 59.9, 29.5, 3.3], [68, 57.3, 29.1, 3.2], [76, 55.4, 28.9, 3.2], [84, 54.9, 29.1, 3.2], [92, 56.6, 29.7, 3.3], [100, 61.4, 30.6, 3.4], [108, 69.9, 31.5, 3.5], [114, 74.4, 32, 3.6], [118, 75.6, 32, 3.6], [122, 75.3, 31.8, 3.7], [125, 73.6, 31.1, 3.9], [126.5, 72.6, 30.6, 4]];
  const BODY_END = 126.5;
  /* Başlar (fotoğraf ölçümü): w [baş üstünden mm, genişlik], d kalınlık profili, lens: alt siyah yüz yüksekliği */
  const DSTD = [[0, 30.6], [3, 29.6], [7, 26.5], [11, 23.5], [22, 21]];
  const HEADS = {
    'clarius-l7':  {w: [[0, 72.6], [2, 70], [4, 66.4], [6, 60.8], [8, 54.4], [9.5, 51.8], [11.3, 50.8], [13.2, 49], [15, 48], [17, 46.8], [18.3, 46.4]], d: DSTD, lens: 2.2},
    'clarius-l15': {w: [[0, 72.8], [2, 70.2], [4, 67.4], [6, 64], [8, 60.6], [9.6, 58.2], [11.5, 57.4], [13.4, 57.2], [17.8, 57.4]], d: DSTD, lens: 2.7},
    'clarius-l20': {w: [[0, 72.2], [2, 70], [4, 67], [6, 63.6], [7.6, 53.8], [9.5, 44.4], [11.4, 35.8], [13.4, 34.4], [18.1, 32.8]], d: DSTD, lens: 2.4},
    'clarius-pa':  {w: [[0, 72.2], [2, 71.2], [4, 69], [6, 66.4], [7.7, 60.2], [9.6, 52.8], [10.6, 42], [11.5, 36.2], [13.4, 34], [15.3, 33.4], [18.8, 31]], d: [[0, 30.6], [6, 28.2], [9.6, 24], [11.5, 21], [22, 20]], lens: 2.7},
    'clarius-pal': {w: [[0, 72.4], [2, 70.4], [4, 67.4], [6, 63.5], [8, 59.1], [10, 54.4], [12, 50.2], [14, 46.4], [16, 42.4], [18.5, 37.6]], d: [[0, 30.6], [4, 29], [10, 25], [22, 21]], lens: 3, chrome: true},
    'clarius-c3':  {w: [[0, 72.8], [2, 71.4], [4, 69.6], [6, 66.4], [8, 63.8], [10, 57]], d: [[0, 30.6], [4, 29.4], [10, 27]], convex: {R: 45, half: 27, depth: 26}},
    'clarius-c7':  {w: [[0, 72.2], [2, 71.2], [4, 69], [6, 66.4], [7.7, 60.2], [9.6, 52.8], [10.6, 42], [11.5, 37], [15.5, 35]], d: [[0, 30.6], [6, 28.2], [9.6, 24], [15.5, 22]], convex: {R: 20, half: 16.5, depth: 21}},
    'clarius-ec7': {w: [[0, 72.4], [4, 64], [8, 46], [12, 30], [16, 22]], cx: [[0, 0], [4, -2], [8, -6], [12, -10], [16, -13]], d: [[0, 30.6], [4, 28], [8, 23], [16, 17]], shaft: [[-13, 15], [-15, 40], [-11, 80], [-4, 120], [3, 150], [7, 166], [8.5, 173]]}
  };
  const lerpTab = (tab, x) => { if (x <= tab[0][0]) return tab[0][1]; for (let i = 1; i < tab.length; i++) if (x <= tab[i][0]) { const [a, va] = tab[i - 1], [b, vb] = tab[i]; return va + (vb - va) * (x - a) / (b - a); } return tab[tab.length - 1][1]; };

  /* Süperelips kesitlerden gövde: secs [{y, w, d, n, cx}] aşağıdan yukarı */
  function loft(secs, mat, seg = 72) {
    const pos = [], idx = [];
    secs.forEach(s => { const ex = 2 / (s.n || 4); for (let k = 0; k < seg; k++) { const a = k / seg * Math.PI * 2, c = Math.cos(a), sn = Math.sin(a); pos.push(Math.sign(c) * Math.pow(Math.abs(c), ex) * s.w / 2 + (s.cx || 0), s.y, Math.sign(sn) * Math.pow(Math.abs(sn), ex) * s.d / 2); } });
    for (let i = 0; i < secs.length - 1; i++) for (let k = 0; k < seg; k++) { const a = i * seg + k, b = i * seg + (k + 1) % seg, c = a + seg, d = b + seg; idx.push(a, d, b, a, c, d); }
    const cap = i => { const s = secs[i], ci = pos.length / 3; pos.push(s.cx || 0, s.y, 0); for (let k = 0; k < seg; k++) idx.push(ci, i * seg + k, i * seg + (k + 1) % seg); };
    cap(0); cap(secs.length - 1);
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
    mat.side = THREE.DoubleSide;
    const m = new THREE.Mesh(g, mat); m.castShadow = m.receiveShadow = true; return m;
  }
  /* Yüzeye oturan baskı (logo, panel, yazı): x–y düzleminde ızgara, z = ön yüzey + ε */
  function conform(w, h, cx, yTop, frontZ, draw, ppm = 14, eps = .12) {
    const tex = canvasTex(Math.round(w * ppm), Math.round(h * ppm), draw);
    const g = new THREE.PlaneGeometry(w, h, Math.max(2, Math.round(w / 1.5)), Math.max(2, Math.round(h / 1.5))), p = g.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i) + cx, y = p.getY(i) + yTop - h / 2; p.setXYZ(i, x, y, frontZ(x, y) + eps); }
    g.computeVertexNormals();
    return new THREE.Mesh(g, new THREE.MeshStandardMaterial({map: tex, transparent: true, alphaTest: .25, roughness: .55, polygonOffset: true, polygonOffsetFactor: -2}));
  }

  /* ---------- Prob (mm, ayakta: lens yüzü y = 0, gövde +y, ön yüz +z) ---------- */
  function probeMM(id) {
    const m = MODELS[id], H = HEADS[id], L = m.L, g = new THREE.Group(), parts = [];
    const yUp = yt => L - yt;                                 /* üstten ölçüden yukarı koordinata */
    const sec = r => ({y: yUp(r[0]), w: r[1], d: r[2], n: r[3]});
    g.add(loft(BODY.slice().reverse().map(sec), MAT.body()));
    g.add(loft(CAP.slice().reverse().map(sec), MAT.cap()));
    /* Baş */
    const hTop = yUp(BODY_END), yh = v => hTop - v;          /* baş üstünden aşağı mm → y */
    const lastV = H.w[H.w.length - 1][0];
    const headSecs = H.w.map(([v, w]) => ({y: yh(v), w, d: lerpTab(H.d, v), n: v < 3 ? 4 : 5, cx: H.cx ? lerpTab(H.cx, v) : 0}));
    g.add(loft(headSecs.slice().reverse(), H.chrome ? MAT.chrome() : MAT.head()));
    let markY = 6;
    if (H.lens) {
      /* Alt siyah akustik yüz: kenarları yuvarlatılmış kısa blok */
      const w0 = H.w[H.w.length - 1][1], d0 = lerpTab(H.d, lastV), lw = w0 - 1.6, ld = d0 - 2.4;
      g.add(loft([{y: 0, w: lw - 2, d: ld - 2, n: 6}, {y: .5, w: lw - .5, d: ld - .5, n: 6}, {y: yh(lastV) + .3, w: lw, d: ld, n: 6}], MAT.lens()));
      markY = yh(lastV) + 2.2;
    }
    if (H.convex) {
      /* Konveks başlık: yay biçimli beyaz blok ve üzerinde kavisli siyah dizi */
      const {R, half, depth} = H.convex, th = Math.asin(half / R), sag = R * (1 - Math.cos(th)), yTopBlk = yh(lastV) + .4;
      const s = new THREE.Shape(); s.moveTo(-half, yTopBlk); s.lineTo(-half, sag);
      for (let i = 0; i <= 40; i++) { const a = -th + 2 * th * i / 40; s.lineTo(R * Math.sin(a), R - R * Math.cos(a)); }
      s.lineTo(half, yTopBlk); s.closePath();
      const bev = 1.6, eg = new THREE.ExtrudeGeometry(s, {depth: depth - 2 * bev, bevelEnabled: true, bevelThickness: bev, bevelSize: bev * .8, bevelSegments: 4, curveSegments: 40});
      eg.translate(0, 0, -(depth - 2 * bev) / 2);
      const blk = new THREE.Mesh(eg, MAT.head()); blk.castShadow = true; g.add(blk);
      const band = new THREE.Shape(), r0 = R - .2, r1 = R + 1.4, t2 = th * .93;
      for (let i = 0; i <= 40; i++) { const a = -t2 + 2 * t2 * i / 40; band[i ? 'lineTo' : 'moveTo'](r1 * Math.sin(a), R - r1 * Math.cos(a)); }
      for (let i = 40; i >= 0; i--) { const a = -t2 + 2 * t2 * i / 40; band.lineTo(r0 * Math.sin(a), R - r0 * Math.cos(a)); }
      const bg = new THREE.ExtrudeGeometry(band, {depth: depth - 5, bevelEnabled: true, bevelThickness: .8, bevelSize: .5, bevelSegments: 3, curveSegments: 40}); bg.translate(0, 0, -(depth - 5) / 2);
      g.add(new THREE.Mesh(bg, MAT.lens()));
      markY = sag + 3.5;
    }
    if (H.shaft) {
      /* EC7: yaka altından uzanan beyaz şaft, uçta şişkin baş ve siyah endokaviter dizi */
      const pts = H.shaft.map(([x, v]) => V3(x, yh(v), 0));
      const sh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 80, 8, 24, false), MAT.head()); sh.castShadow = true; g.add(sh);
      const tipC = V3(8.6, 10.5, 0), bulb = sphere(10.4, MAT.head(), 32); bulb.position.copy(tipC); g.add(bulb);
      const lc = new THREE.Mesh(new THREE.SphereGeometry(10.6, 32, 16, 0, Math.PI * 2, Math.PI * .62, Math.PI * .38), MAT.lens()); lc.position.copy(tipC); g.add(lc);
      parts.push({key: 'u-shaft', at: V3(-8, yh(95), 10)});
    }
    /* Ön yüzey fonksiyonu: (x, y) → z; baskıların yüzeye oturması için */
    const all = BODY.concat(CAP).map(sec).concat(headSecs).sort((a, b) => a.y - b.y);
    const secAt = y => { if (y <= all[0].y) return all[0]; for (let i = 1; i < all.length; i++) if (y <= all[i].y) { const a = all[i - 1], b = all[i], t = (y - a.y) / ((b.y - a.y) || 1); return {w: a.w + (b.w - a.w) * t, d: a.d + (b.d - a.d) * t, n: a.n + (b.n - a.n) * t, cx: (a.cx || 0) + ((b.cx || 0) - (a.cx || 0)) * t}; } return all[all.length - 1]; };
    const frontZ = (x, y) => { const s = secAt(y), u = Math.min(.999, Math.abs((x - (s.cx || 0)) / (s.w / 2))); return s.d / 2 * Math.pow(1 - Math.pow(u, s.n), 1 / s.n); };
    const sideX = (y, z) => { const s = secAt(y); return -s.w / 2 * Math.pow(1 - Math.pow(Math.min(.99, 2 * Math.abs(z) / s.d), s.n), 1 / s.n) + (s.cx || 0); };
    /* Logo (sadeleştirilmiş, iç içe yaylar) */
    g.add(conform(16, 16, 0, yUp(7.5), frontZ, (c, W, Hh) => {
      c.clearRect(0, 0, W, Hh); c.strokeStyle = '#8C9399'; c.lineCap = 'round';
      const cx = W * .52, cy = Hh / 2, k = W / 16;
      [[6.3, .62, 5.66], [4.3, .7, 5.58]].forEach(([r, a0, a1]) => { c.lineWidth = 1.15 * k; c.beginPath(); c.arc(cx, cy, r * k, a0, a1); c.stroke(); });
      c.lineWidth = 1.1 * k; c.beginPath(); c.arc(cx + .6 * k, cy, 2.2 * k, Math.PI * .75, Math.PI * 1.25, false); c.stroke();
      c.beginPath(); c.moveTo(cx - .2 * k, cy); c.lineTo(cx + 2.4 * k, cy); c.stroke();
    }));
    /* Ön panel (gömme, damla biçimi) ve iki tuş: üstte "D" biçimli, altta güç simgeli */
    const PT = 66, PH = 52, PW = 28;
    g.add(conform(PW, PH, 0, yUp(PT), frontZ, (c, W, Hh) => {
      const k = W / PW, hw = v => 10 + 3.6 * Math.pow(v / PH, .85);
      c.clearRect(0, 0, W, Hh);
      c.beginPath(); c.moveTo(W / 2 - 10 * k, 10 * k); c.arc(W / 2, 10 * k, 10 * k, Math.PI, 0);
      for (let v = 10; v <= PH - 6; v += 1) c.lineTo(W / 2 + hw(v) * k, v * k);
      c.quadraticCurveTo(W / 2 + hw(PH) * k, PH * k - 1, W / 2 + (hw(PH) - 6) * k, PH * k - 1); c.lineTo(W / 2 - (hw(PH) - 6) * k, PH * k - 1);
      c.quadraticCurveTo(W / 2 - hw(PH) * k, PH * k - 1, W / 2 - hw(PH - 6) * k, (PH - 6) * k);
      for (let v = PH - 6; v >= 10; v -= 1) c.lineTo(W / 2 - hw(v) * k, v * k); c.closePath();
      c.fillStyle = '#30353A'; c.fill(); c.lineWidth = .7 * k; c.strokeStyle = '#121416'; c.stroke();
      c.strokeStyle = '#9EA6AD'; c.lineWidth = .32 * k;
      const bx = W / 2 - 4.7 * k, bw = 9.4 * k;
      c.beginPath(); c.moveTo(bx, 15.6 * k); c.lineTo(bx, 10.4 * k); c.arc(W / 2, 10.4 * k, 4.7 * k, Math.PI, 0); c.lineTo(bx + bw, 15.6 * k); c.closePath(); c.stroke();
      c.beginPath(); c.moveTo(bx + 1.8 * k, 18.4 * k); c.lineTo(bx + bw, 18.4 * k); c.lineTo(bx + bw, 28.7 * k); c.lineTo(bx + 1.8 * k, 28.7 * k); c.quadraticCurveTo(bx, 28.7 * k, bx, 26.9 * k); c.lineTo(bx, 20.2 * k); c.quadraticCurveTo(bx, 18.4 * k, bx + 1.8 * k, 18.4 * k); c.stroke();
      c.lineWidth = .45 * k; c.beginPath(); c.arc(W / 2, 23.9 * k, 2.6 * k, -Math.PI * .3, Math.PI * 1.3); c.stroke(); c.beginPath(); c.moveTo(W / 2, 20.5 * k); c.lineTo(W / 2, 23.6 * k); c.stroke();
    }, 16, .2));
    parts.push({key: 'u-btn', at: V3(0, yUp(85), frontZ(0, yUp(85)) + 3)});
    /* Mavi durum ışığı: sol yan yüz, kapağın hemen altı */
    { const y = yUp(41), z = 6, x = sideX(y, z);
      const led = rbox(1.6, 5.6, 2, .75, M.led(0x4BA6FF)); led.position.set(x + .35, y, z); g.add(led);
      parts.push({key: 'u-led', at: V3(x - 3, y, z)}); }
    /* Kapağın sol yanında iki küçük delik */
    { const y = yUp(7); [2, 7].forEach(z => { const h = cyl(.9, .9, 1.2, M.matte(0x6E757B), 14); h.rotation.z = Math.PI / 2; h.position.set(sideX(y, z) + .3, y, z); g.add(h); }); }
    /* Baş yazıları: model adı ve orta işaret (▾); PAL'de "L" ve orta çizgi */
    g.add(conform(14, 5, 0, hTop - 2.2, frontZ, (c, W, Hh) => { c.clearRect(0, 0, W, Hh); c.fillStyle = '#1C1F22'; c.font = `700 ${Math.round(Hh * .78)}px "Archivo", Arial, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(m.tag, W / 2, Hh / 2); }, 30));
    if (id === 'clarius-pal') g.add(conform(1.4, lastV - 7.5, 0, hTop - 7.5, frontZ, (c, W, Hh) => { c.fillStyle = '#5A6066'; c.fillRect(W * .3, 0, W * .4, Hh); }, 30));
    else if (!H.shaft) g.add(conform(3, 2.4, 0, markY + 2.4, frontZ, (c, W, Hh) => { c.clearRect(0, 0, W, Hh); c.fillStyle = '#1C1F22'; c.beginPath(); c.moveTo(W * .2, Hh * .2); c.lineTo(W * .8, Hh * .2); c.lineTo(W * .5, Hh * .85); c.fill(); }, 30));
    /* Yan yüzdeki yön üçgeni (sol, lense yakın) */
    { const y = H.shaft ? yh(14) : markY + 1, x = sideX(y, 0), tri = new THREE.Shape(); tri.moveTo(0, 1.4); tri.lineTo(0, -1.4); tri.lineTo(-2.2, 0); tri.closePath();
      const t = new THREE.Mesh(new THREE.ShapeGeometry(tri), new THREE.MeshBasicMaterial({color: 0x1C1F22, side: THREE.DoubleSide})); t.rotation.y = Math.PI / 2; t.position.set(x - .08, y, 0); g.add(t);
      parts.push({key: 'u-mark', at: V3(x - 4, y, 0)}); }
    parts.unshift({key: 'u-lens-' + id.replace('clarius-', ''), at: V3(H.shaft ? 9 : 0, -3, 0)});
    parts.push({key: 'u-body', at: V3(30, yUp(84), 0)});
    /* Üst uç: pil gövdeye gömülüdür; güç (şarj yuvası, Power Fan HD3) bu uçtan alınır. Temas noktalarının biçimi temsilidir. */
    [-9, 0, 9].forEach(x => { const pin = rbox(4.2, 2.2, .7, .5, M.metal(0xC8A24A, .3)); pin.rotation.x = -Math.PI / 2; pin.position.set(x, L + .3, 0); g.add(pin); });
    parts.push({key: 'u-batt', at: V3(0, L + 4, 0)});
    return {g, parts};
  }
  function probe(id) { const p = probeMM(id); p.g.scale.setScalar(.001); const w = new THREE.Group(); w.add(p.g); return {g: w, info: p}; }

  /* ---------- Yatay tablet (11 inç sınıfı, genel tasarım, marka yok) ve Clarius uygulaması (USAPP) ----------
     Ölçüler yaklaşık: 254 × 174 × 6 mm, ekran 240 × 160 mm (3:2). Ekran dokusu USAPP tuvalidir; ekrana dokunuş
     K3 görüntüleyicisinde ışın izlemeyle ekran koordinatına çevrilir (hits). */
  function tablet() {
    const g = new THREE.Group(), TW = 254, TH = 174, TD = 6.2, SW = 240, SH = 160;
    g.add(rbox(TW, TH, TD, 11, std(0x2E3337, .36, .6)));
    const glass = rbox(TW - 1.2, TH - 1.2, .6, 10.4, std(0x060708, .12, .1)); glass.position.z = TD / 2; g.add(glass);
    const cam = cyl(1.3, 1.3, .3, M.matte(0x15191D, .2), 16); cam.rotation.x = Math.PI / 2; cam.position.set(0, SH / 2 + 3.6, TD / 2 + .45); g.add(cam);
    /* Üst kenarda güç ve ses tuşları */
    [[-TW / 2 + 22, 10], [TW / 2 - 40, 16], [TW / 2 - 22, 16]].forEach(([x, w]) => { const b2 = rbox(w, 1.4, 2.4, .6, std(0x3A4045, .35, .6)); b2.position.set(x, TH / 2 + .5, 0); g.add(b2); });
    const app = typeof USAPP !== 'undefined' && USAPP ? USAPP.get() : null;
    let screen = null, mesh = null;
    if (app) {
      const tex = new THREE.CanvasTexture(app.canvas); tex.encoding = THREE.sRGBEncoding; tex.anisotropy = 8;
      mesh = new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), new THREE.MeshBasicMaterial({map: tex, toneMapped: false}));
      mesh.position.z = TD / 2 + .8; g.add(mesh);
      let last = -1;
      screen = {mesh, update(t) { if (t - last < 1 / 20) return; last = t; app.render(t); tex.needsUpdate = true; }};
    }
    return {g, screen, mesh, app, TW, TH, TD};
  }
  /* Masa standı: alt dudak ve arka destek */
  function stand(TD) {
    const g = new THREE.Group(), mat = std(0x3B4249, .55, .25);
    const base = rbox(150, 6, 70, 3, mat); base.position.set(0, 3, -18); g.add(base);
    const lip = rbox(150, 12, 5, 2, mat); lip.position.set(0, 8, 14); g.add(lip);
    const back = rbox(110, 120, 5, 3, mat); back.rotation.x = -.32; back.position.set(0, 58, -TD - 22); g.add(back);
    return g;
  }

  /* ---------- DEV3D kurucusu: prob masada sırt üstü, arkasında standda yatay tablet ---------- */
  DEV3D.register('u-clarius', cfg => {
    const root = new THREE.Group(), p = probeMM(cfg.probe), m = MODELS[cfg.probe];
    const lay = new THREE.Group(); lay.add(p.g);
    p.g.rotation.set(0, 0, Math.PI / 2); lay.rotation.x = -Math.PI / 2;
    const S = .001, len = m.L;
    lay.scale.setScalar(S); lay.position.set(len * S / 2, .016, 0);
    root.add(lay);
    root.updateMatrixWorld(true);
    const parts = p.parts.map(q => ({key: q.key, at: p.g.localToWorld(q.at.clone())}));
    const screens = [], hits = [];
    if (cfg.tablet !== false) {
      const tb = tablet();
      if (tb.app && tb.app.state.probe !== cfg.probe) tb.app.setProbe(cfg.probe);
      const rig = new THREE.Group(); rig.scale.setScalar(S); rig.position.set(len * S / 2 + .02, 0, -.12); rig.rotation.y = -.28;
      const st = stand(tb.TD); rig.add(st);
      tb.g.rotation.x = -.32; tb.g.position.set(0, 14 + tb.TH / 2 * Math.cos(.32), 14 - tb.TH / 2 * Math.sin(.32) - 2); rig.add(tb.g);
      root.add(rig);
      root.updateMatrixWorld(true);
      if (tb.screen) {
        screens.push(tb.screen);
        const app = tb.app;
        hits.push({mesh: tb.mesh, on: (type, u, v) => app.pointer(type, u * app.W, (1 - v) * app.H), hover: (u, v) => app.hover(u * app.W, (1 - v) * app.H)});
      }
      /* Tablet işareti: kamera ekranı karşıdan gösterir (ekran normali: dünya yönü) */
      const nrm = V3(0, 0, 1).applyQuaternion(tb.g.getWorldQuaternion(new THREE.Quaternion()));
      parts.push({key: 'u-app', at: tb.g.localToWorld(V3(0, tb.TH / 2 + 8, 4)), look: {at: tb.g.localToWorld(V3(0, 0, 0)), dist: .42, theta: Math.atan2(nrm.x, nrm.z), phi: Math.acos(Math.max(-1, Math.min(1, nrm.y)))}});
    }
    return {group: root, parts, screens, hits};
  });
  Object.keys(MODELS).forEach(id => DEV3D.model(id, {type: 'u-clarius', probe: id, theta: .75, phi: .96}));

  /* ---------- VygoPlex ENS & Echo iğnesi (mm; uç orijinde, gövde −x yönünde) ----------
     Bronz renkli yalıtım kaplaması (yalnız bizonun ucu iletken), uçta 2 cm kumlanmış ekojenik bölge, ilk 2 cm'de mm,
     sonra cm işaretleri (5 cm'de çift), mavi saydam nervürlü göbek, 55 cm stimülasyon kablosu, 51 cm uzatma hattı.
     o: {len, g, ext (uzatma ve kablo çizilsin mi), coil (kangal ölçeği), cordTo (kablonun gideceği noktalar)} */
  const GAUGE = {20: .9, 21: .8, 22: .72, 23: .64, 24: .56, 25: .5};
  function needle(o = {}) {
    const L = o.len || 80, r = (GAUGE[o.g || 22] || .72) / 2, g = new THREE.Group(), BEV = 30 * Math.PI / 180;
    const bevL = 2 * r / Math.tan(BEV), bare = 1.0, Ls = L - bevL - bare;
    const tex = canvasTex(16, 2048, (c, W, H) => {
      const py = mm => H - (mm / Ls) * H;   /* tuvalin altı uca yakın uç */
      c.fillStyle = '#A48C61'; c.fillRect(0, 0, W, H);
      for (let y = py(19); y < H; y += 3) { c.fillStyle = `rgba(214,198,160,${(.25 + .5 * (Math.abs(Math.sin(y * 12.9898)) % .5)).toFixed(2)})`; c.fillRect(0, y, W, 1.6); }
      c.fillStyle = '#2B2620';
      for (let k = 1; k < 20; k++) { const y = py(k - bare); c.fillRect(0, y - 1.2, W, 2.4); }
      for (let k = 2; k * 10 < Ls; k++) { const y = py(k * 10 - bare); c.fillRect(0, y - 4, W, 8); if (k === 5) c.fillRect(0, y - 22, W, 8); }
    });
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(r, r, Ls, 16, 1, true), new THREE.MeshStandardMaterial({map: tex, roughness: .32, metalness: .35}));
    shaft.geometry.rotateZ(Math.PI / 2); shaft.position.x = -(Ls / 2) - bevL - bare; g.add(shaft);
    const steel = M.metal(0xC9D1D6, .22);
    const tipC = cyl(r, r, bare, steel, 16); tipC.rotation.z = Math.PI / 2; tipC.position.x = -bevL - bare / 2; g.add(tipC);
    const bg = new THREE.CylinderGeometry(r, r, bevL, 16, 6, false); bg.rotateZ(Math.PI / 2);
    const bp = bg.attributes.position; for (let i = 0; i < bp.count; i++) { const x = bp.getX(i) - bevL / 2, y = bp.getY(i), lim = -bevL * (1 - (y + r) / (2 * r)); bp.setX(i, Math.min(x, lim)); }
    bg.computeVertexNormals(); g.add(new THREE.Mesh(bg, steel));
    /* Göbek: mavi saydam blok, iki yanı içe kavisli ve nervürlü; önde mavi yaka, arkada saydam dişi Luer */
    const hub = new THREE.Group(); hub.position.x = -L;
    const blue = std(0x2C63D8, .25, 0, {transparent: true, opacity: .82}), clear = M.clear(0xE6F1F6, .5);
    const collar = cyl(1.7, 2.1, 4, blue, 20); collar.rotation.z = Math.PI / 2; collar.position.x = -2; hub.add(collar);
    const hs = new THREE.Shape(), HL = 19, HW = 13;
    hs.moveTo(0, -HW / 2 + 1.5); hs.quadraticCurveTo(0, -HW / 2, 1.5, -HW / 2); hs.quadraticCurveTo(HL / 2, -HW / 2 + 2.6, HL - 1.5, -HW / 2); hs.quadraticCurveTo(HL, -HW / 2, HL, -HW / 2 + 1.5);
    hs.lineTo(HL, HW / 2 - 1.5); hs.quadraticCurveTo(HL, HW / 2, HL - 1.5, HW / 2); hs.quadraticCurveTo(HL / 2, HW / 2 - 2.6, 1.5, HW / 2); hs.quadraticCurveTo(0, HW / 2, 0, HW / 2 - 1.5); hs.closePath();
    const hg = new THREE.ExtrudeGeometry(hs, {depth: 7, bevelEnabled: true, bevelThickness: 1, bevelSize: .8, bevelSegments: 3, curveSegments: 16}); hg.translate(0, 0, -3.5);
    const blk = new THREE.Mesh(hg, blue); blk.position.x = -4 - HL; hub.add(blk);
    for (let k = 0; k < 6; k++) [1, -1].forEach(sd => { const rib = box(.7, .9, 9.2, blue); rib.position.set(-4 - 3.5 - k * 2.3, sd * (HW / 2 - 2.2 + .6 * Math.sin((k / 5) * Math.PI)), 0); hub.add(rib); });
    const lu = lathe([[0, 0], [2.6, 0], [2.9, -6], [3.6, -8.6], [4.3, -9.4], [4.3, -10.2], [0, -10.2]], clear, 28); lu.rotation.z = -Math.PI / 2; lu.position.x = -4 - HL; hub.add(lu);
    g.add(hub);
    const hubBack = -L - 4 - HL - 10;
    let cord = null, ext = null;
    if (o.ext !== false) {
      const C = o.coil || 1;
      /* Uzatma hattı: göbeğe takılı saydam erkek Luer, kangal, uçta saydam bağlantı ve mavi kapak */
      const lc = cyl(3.6, 3.2, 9, clear, 20); lc.rotation.z = Math.PI / 2; lc.position.x = hubBack - 3; g.add(lc);
      const e0 = hubBack - 7;
      const ep = [V3(e0, 0, 0), V3(e0 - 14, 1, 2), V3(e0 - 34 * C, 6, 14), V3(e0 - 52 * C, 8, 40 * C), V3(e0 - 40 * C, 9, 64 * C), V3(e0 - 10 * C, 9, 70 * C), V3(e0 + 6 * C, 9, 52 * C), V3(e0 - 12 * C, 10, 32 * C), V3(e0 - 44 * C, 10, 34 * C), V3(e0 - 60 * C, 10, 58 * C), V3(e0 - 48 * C, 10, 84 * C), V3(e0 - 30 * C, 10, 92 * C)];
      ext = tube(ep, 1.5, M.clear(0xEEF5F8, .55), 200); g.add(ext);
      const end = ep[ep.length - 1], dir = end.clone().sub(ep[ep.length - 2]).normalize();
      const lm = cyl(2.4, 3, 9, clear, 20); lm.position.copy(end).addScaledVector(dir, 4); lm.quaternion.setFromUnitVectors(V3(0, 1, 0), dir); g.add(lm);
      const capB = cyl(3.4, 3.4, 6, std(0x2457C9, .35, 0), 8); capB.position.copy(end).addScaledVector(dir, 11); capB.quaternion.copy(lm.quaternion); g.add(capB);
      /* Stimülasyon kablosu (açık mavi, 55 cm): göbeğin yanından çıkar, uçta dokunmaya korumalı fiş */
      const c0 = V3(-L - 4 - HL + 4, -HW / 2 - .6, 0);
      const cp = o.cordTo ? [c0, c0.clone().add(V3(-6, -8, 4)), ...o.cordTo] :
        [c0, c0.clone().add(V3(-4, -10, 3)), c0.clone().add(V3(10, -26, 10)), c0.clone().add(V3(30 * C, -30 * C, 22)), c0.clone().add(V3(22 * C, -44 * C, 40 * C)), c0.clone().add(V3(44 * C, -54 * C, 34 * C)), c0.clone().add(V3(62 * C, -48 * C, 54 * C)), c0.clone().add(V3(58 * C, -70 * C, 76 * C)), c0.clone().add(V3(80 * C, -84 * C, 70 * C))];
      cord = tube(cp, .95, std(0x5EAEE6, .45, 0), 240); g.add(cord);
      if (!o.cordTo) {
        const pe = cp[cp.length - 1], pd = pe.clone().sub(cp[cp.length - 2]).normalize();
        const pin = cyl(1.7, 1.2, 16, std(0x5EAEE6, .4, 0), 16); pin.position.copy(pe).addScaledVector(pd, 8); pin.quaternion.setFromUnitVectors(V3(0, 1, 0), pd); g.add(pin);
      }
    }
    g.traverse(q => { if (q.isMesh) q.castShadow = true; });
    return {g, L, r, hub, ext, cord, shaft, bevL, hubBack};
  }

  /* ---------- Plexygon sinir stimülatörü (mm; masada yatık, uzun eksen +x, üst yüz +y) ----------
     200 mm boy, 57–93 mm genişlik, 23–40 mm yükseklik (üretici). Yuvarlak başta LCD ve çerçeve; gövdede döner düğme,
     I/S MODE (mavi), SAFETY (kırmızı), ON/OFF (yeşil) tuşları, yan kontrol paneli. Ekran USM.plx durumunu canlı gösterir. */
  const plx = {mA: .5, pw: 100, hz: 2, unit: 'mA', on: true};
  const PLX_MAX = {300: 4, 100: 5, 50: 6};
  const plxVal = () => plx.unit === 'nC' ? String(Math.round(plx.mA * plx.pw)) : plx.mA < .5 ? plx.mA.toFixed(2) : plx.mA.toFixed(1);   /* 0,5 mA altında iki ondalık (üretici) */
  function plexygon() {
    const g = new THREE.Group(), RH = 46.5, BW = 57, LEN = 200, xj = RH + Math.sqrt(RH * RH - (BW / 2) ** 2);
    const shell = std(0xE3E8E2, .55, .02), green = '#1F9A57';
    /* Taban: daire + uzun gövde birleşik dış hat, 23 mm */
    const s = new THREE.Shape();
    s.moveTo(xj, BW / 2); s.lineTo(LEN - 12, BW / 2); s.quadraticCurveTo(LEN, BW / 2, LEN, BW / 2 - 12); s.lineTo(LEN, -BW / 2 + 12); s.quadraticCurveTo(LEN, -BW / 2, LEN - 12, -BW / 2); s.lineTo(xj, -BW / 2);
    const a0 = Math.atan2(-BW / 2, xj - RH); s.absarc(RH, 0, RH, a0, -a0, true); s.closePath();
    const base = new THREE.Mesh(new THREE.ExtrudeGeometry(s, {depth: 18, bevelEnabled: true, bevelThickness: 2.5, bevelSize: 2.5, bevelSegments: 4, curveSegments: 48}), shell);
    base.rotation.x = -Math.PI / 2; base.position.y = 2.5; base.castShadow = base.receiveShadow = true; g.add(base);
    /* Baş: daha yüksek disk (40 mm) ve ekran çerçevesi */
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(RH - 1, RH, 14, 64), shell); disc.position.set(RH, 29, 0); disc.castShadow = true; g.add(disc);
    const bez = new THREE.Mesh(new THREE.CylinderGeometry(RH - 5, RH - 4, 1.4, 64), std(0xD3DAD6, .45, .02)); bez.position.set(RH, 36.6, 0); g.add(bez);
    const lcdFrame = rbox(40, 52, 2, 3, std(0xC9D1CD, .5, 0)); lcdFrame.rotation.x = -Math.PI / 2; lcdFrame.position.set(RH - 2, 37.4, 0); g.add(lcdFrame);
    /* LCD: canlı ekran; metin uzun eksene dik okunur */
    const scr = makeScreen(48, 34, {bg: '#B9C4AE', draw: (c, t, api) => {
      const W = api.W, H = api.H;
      c.fillStyle = plx.on ? '#B7C3AA' : '#9DA693'; c.fillRect(0, 0, W, H);
      if (!plx.on) return;
      c.fillStyle = '#1D2418'; c.textBaseline = 'middle';
      c.font = `500 ${Math.round(H * .46)}px "JetBrains Mono", monospace`; c.textAlign = 'right'; c.fillText(plxVal(), W * .94, H * .34);
      c.font = `700 ${Math.round(H * .14)}px "Archivo", Arial, sans-serif`; c.textAlign = 'left'; c.fillText(plx.unit, W * .06, H * .4);
      c.font = `600 ${Math.round(H * .1)}px "Archivo", Arial, sans-serif`; c.fillText('µsec', W * .08, H * .7); c.fillText('Hz', W * .44, H * .7);
      c.font = `700 ${Math.round(H * .12)}px "JetBrains Mono", monospace`; c.fillText(String(plx.pw), W * .08, H * .86); c.fillText(String(plx.hz), W * .46, H * .86);
      const ph = (t * plx.hz) % 1; c.lineWidth = H * .025; c.strokeStyle = '#1D2418'; c.beginPath(); c.arc(W * .78, H * .78, H * .09, 0, 7); c.stroke();
      if (ph < .25 && plx.mA > 0) { c.fillStyle = '#1D2418'; c.beginPath(); c.arc(W * .78, H * .78, H * .05, 0, 7); c.fill(); }
    }}, 420);
    scr.mesh.rotation.x = -Math.PI / 2; scr.mesh.rotation.z = Math.PI / 2; scr.mesh.position.set(RH - 2, 38.5, 0); g.add(scr.mesh);
    /* Döner düğme (gri, tırtıllı) */
    const knob = new THREE.Group(); knob.position.set(84, 23, -14);
    const kb = cyl(9, 9.5, 3, std(0xB8BFC3, .5, .05), 40); kb.position.y = 1.5; knob.add(kb);
    const kt = cyl(6.4, 7, 12, std(0x7E878D, .45, .1), 24); kt.position.y = 8; knob.add(kt);
    for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2, rr = box(.9, 11, 1.4, std(0x737B81, .5, .1)); rr.position.set(Math.cos(a) * 6.9, 8, Math.sin(a) * 6.9); rr.rotation.y = -a; knob.add(rr); }
    g.add(knob);
    /* Üst yüz baskısı: marka, yeşil çizgiler, SIDE CTRL */
    const top = canvasTex(1500, 570, (c, W, H) => {
      const k = W / 150, X = x => (x - 50) * k, Z = z => (z + 28.5) * k;
      c.fillStyle = '#E3E8E2'; c.fillRect(0, 0, W, H);
      c.strokeStyle = '#2BA061'; c.lineWidth = .35 * k; c.beginPath(); c.moveTo(X(95), Z(-28.5)); c.lineTo(X(95), Z(28.5)); c.moveTo(X(172), Z(-28.5)); c.bezierCurveTo(X(176), Z(-10), X(176), Z(10), X(172), Z(28.5)); c.moveTo(X(150), Z(12)); c.lineTo(X(200), Z(12)); c.stroke();
      const txt = (s2, x, z, sz, col, wt = 800, rot = 0) => { c.save(); c.translate(X(x), Z(z)); c.rotate(rot); c.fillStyle = col; c.font = `${wt} ${sz * k}px "Archivo", Arial, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s2, 0, 0); c.restore(); };
      txt('PLEXYGON', 146, 2, 9, green, 900, Math.PI / 2);
      txt('Nerve Stimulator', 156, 2, 3.6, '#C2185B', 600, Math.PI / 2);
      txt('VYGON', 188, -14, 4.2, green, 900, Math.PI / 2);
      txt('SIDE', 112, 21, 2.6, '#222', 800, Math.PI / 2); txt('CTRL', 115.2, 21, 2.6, '#222', 800, Math.PI / 2);
      c.fillStyle = '#D23B3B'; c.beginPath(); c.moveTo(X(118.5), Z(16)); c.lineTo(X(118.5), Z(12)); c.lineTo(X(121.5), Z(14)); c.fill();
    });
    const tp = new THREE.Mesh(new THREE.PlaneGeometry(150, 57), new THREE.MeshStandardMaterial({map: top, roughness: .55}));
    tp.rotation.x = -Math.PI / 2; tp.position.set(125, 23.06, 0); g.add(tp);
    const btn = (x, z, col, label) => {
      const b = rbox(13, 9, 2.4, 2, std(col, .38, .02)); b.rotation.x = -Math.PI / 2; b.rotation.z = Math.PI / 2; b.position.set(x, 23.6, z); g.add(b);
      const t = new THREE.Mesh(new THREE.PlaneGeometry(9, 12.5), new THREE.MeshBasicMaterial({map: canvasTex(180, 250, (c, W, H) => { c.clearRect(0, 0, W, H); c.save(); c.translate(W / 2, H / 2); c.rotate(Math.PI / 2); c.fillStyle = '#fff'; c.font = `800 ${W * .2}px "Archivo", Arial, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; const L2 = label.split('\n'); L2.forEach((q, i) => c.fillText(q, 0, (i - (L2.length - 1) / 2) * W * .24)); c.restore(); }), transparent: true}));
      t.rotation.x = -Math.PI / 2; t.position.set(x, 24.85, z); g.add(t);
    };
    btn(102, 13, 0x2D5BD2, 'I/S\nMODE'); btn(108, -15, 0xD8343B, 'SAFETY'); btn(124, 3, 0x2CA65A, 'ON/OFF');
    /* Yan kontrol paneli (+z yan yüz): yeşil zemin, iki tuş */
    const sp = rbox(36, 12, 1.4, 2, std(0x2C8E57, .5, .02)); sp.position.set(118, 13, BW / 2 + 2.6); g.add(sp);
    [110, 126].forEach(x => { const sb = cyl(3.2, 3.2, 1.6, std(0xE9EEEA, .4, 0), 24); sb.rotation.x = Math.PI / 2; sb.position.set(x, 13, BW / 2 + 3.6); g.add(sb); });
    /* Başta model etiketi ve kablo soketleri (konumları temsili) */
    const tag = new THREE.Mesh(new THREE.PlaneGeometry(10, 26), new THREE.MeshBasicMaterial({map: canvasTex(100, 260, (c, W, H) => { c.fillStyle = '#E3E8E2'; c.fillRect(0, 0, W, H); c.save(); c.translate(W / 2, H / 2); c.rotate(Math.PI / 2); c.fillStyle = '#2BA061'; c.font = `700 ${W * .42}px "Archivo", Arial, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('▸ 7501.31', 0, 0); c.restore(); })}));
    tag.rotation.x = -Math.PI / 2; tag.position.set(6.5, 37.45, 0); g.add(tag);
    const sockets = [V3(-1.5, 16, -8), V3(-1.5, 16, 8)];
    sockets.forEach((p, i) => { const s2 = cyl(2.6, 2.6, 4, M.matte(i ? 0xC0392B : 0x1E2226), 18); s2.rotation.z = Math.PI / 2; s2.position.copy(p); g.add(s2); });
    g.traverse(q => { if (q.isMesh && q !== scr.mesh) q.castShadow = true; });
    return {g, screen: scr, sockets, knob, LEN};
  }

  /* Yüzey (dönüş) elektrodu */
  function skinPad(color = 0xC0392B) {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(17, 17, .8, 40), std(0xF2F4F5, .7, 0)));
    const gel = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, .9, 30), std(0xB7C3C8, .4, 0)); gel.position.y = .1; g.add(gel);
    const st = cyl(2.6, 3, 4, M.metal(), 18); st.position.y = 2.4; g.add(st);
    const clip = rbox(10, 6, 14, 2, std(color, .45, .02)); clip.position.set(0, 6, 3); g.add(clip);
    return g;
  }

  DEV3D.register('u-needle', cfg => {
    const root = new THREE.Group(), S = .001, parts = [], screens = [];
    if (cfg.stim) {
      /* İğne + Plexygon + dönüş elektrodu, kablolar bağlı */
      const P = plexygon(); P.g.scale.setScalar(S); P.g.position.set(.02, 0, -.02); P.g.rotation.y = .18; root.add(P.g); screens.push(P.screen);
      const ng = new THREE.Group(); ng.scale.setScalar(S); ng.position.set(.005, .006, .085); ng.rotation.y = 1.05; root.add(ng);
      root.updateMatrixWorld(true);
      const sockW = P.sockets.map(p => P.g.localToWorld(p.clone()));
      const toLocal = v => ng.worldToLocal(v.clone());
      const sk = toLocal(sockW[0]);
      const cordTo = [toLocal(V3(-.03, .004, .06)), toLocal(V3(-.06, .004, .02)), toLocal(V3(-.045, .006, -.03)), toLocal(sockW[0].clone().add(V3(-.03, -.008, -.005))), sk.clone().add(V3(-12, 0, 0)), sk];
      const N = needle({len: 80, g: 22, coil: .8, cordTo}); ng.add(N.g);
      const pad = skinPad(); pad.scale.setScalar(S); pad.position.set(-.06, .0005, -.055); root.add(pad);
      root.updateMatrixWorld(true);
      const padTop = pad.localToWorld(V3(0, 7, 8)), s2 = sockW[1];
      root.add(tube([padTop, padTop.clone().add(V3(.01, .01, .02)), V3(-.05, .006, -.02), V3(-.03, .006, -.01), s2.clone().add(V3(-.025, -.01, .01)), s2.clone().add(V3(-.01, 0, 0)), s2], .0011, std(0x2A2E33, .5, 0), 160));
      const W = (x, y, z) => ng.localToWorld(V3(x, y, z));
      parts.push({key: 'u-n-tip', at: W(0, 2, 0)}, {key: 'u-n-echo', at: W(-12, 2, 0)}, {key: 'u-n-marks', at: W(-50, 2, 0)}, {key: 'u-n-coat', at: W(-68, 2, 0)}, {key: 'u-n-hub', at: W(-94, 8, 0)}, {key: 'u-n-ext', at: W(-160, 10, 50)}, {key: 'u-n-cord', at: cordTo[1].clone().applyMatrix4(ng.matrixWorld)});
      parts.push({key: 'u-p-lcd', at: P.g.localToWorld(V3(44, 42, 0))}, {key: 'u-p-knob', at: P.g.localToWorld(V3(84, 38, -14))}, {key: 'u-p-safety', at: P.g.localToWorld(V3(108, 28, -15))}, {key: 'u-p-pad', at: pad.localToWorld(V3(0, 14, 0))});
    } else {
      const N = needle({len: 80, g: 22});
      N.g.scale.setScalar(S); N.g.position.set(.06, .014, -.01); N.g.rotation.y = .12; root.add(N.g);
      root.updateMatrixWorld(true);
      const W = (x, y, z) => N.g.localToWorld(V3(x, y, z));
      parts.push({key: 'u-n-tip', at: W(-1, 2, 0)}, {key: 'u-n-echo', at: W(-12, 2, 0)}, {key: 'u-n-marks', at: W(-50, 2, 0)}, {key: 'u-n-coat', at: W(-68, 2, 0)}, {key: 'u-n-hub', at: W(-94, 8, 0)}, {key: 'u-n-ext', at: W(-150, 10, 40)}, {key: 'u-n-cord', at: W(-80, -40, 30)});
    }
    return {group: root, parts, screens};
  });
  DEV3D.register('u-plexygon', () => {
    const root = new THREE.Group(), P = plexygon(); P.g.scale.setScalar(.001); P.g.position.x = -.1; root.add(P.g); root.updateMatrixWorld(true);
    const W = (x, y, z) => P.g.localToWorld(V3(x, y, z));
    return {group: root, screens: [P.screen], parts: [
      {key: 'u-p-lcd', at: W(44, 42, 0)}, {key: 'u-p-knob', at: W(84, 40, -14)}, {key: 'u-p-mode', at: W(102, 28, 13)}, {key: 'u-p-safety', at: W(108, 28, -15)},
      {key: 'u-p-onoff', at: W(124, 28, 3)}, {key: 'u-p-side', at: W(118, 13, 36)}, {key: 'u-p-sock', at: W(-6, 16, 0)}, {key: 'u-p-batt', at: W(170, 5, -30)}]};
  });
  DEV3D.model('vygoplex-ens-echo', {type: 'u-needle', stim: true, theta: .9, phi: .78, zoom: .6, sim: false});
  DEV3D.model('plexygon', {type: 'u-plexygon', theta: 1.25, phi: .8, sim: false});

  return {MODELS, GEOM, HEADS, probe, probeMM, needle, plexygon, plx, plxVal, PLX_MAX, GAUGE};
})();
