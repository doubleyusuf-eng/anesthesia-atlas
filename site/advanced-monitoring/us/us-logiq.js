'use strict';
/* İleri Monitörizasyon Atlası · ultrason · GE HealthCare LOGIQ P8 (R4) 3B modeli (DEV3D türü 'u-logiq')
   Ölçüler GE LOGIQ P8 R4 veri sayfası ve servis kılavuzundandır: yükseklik 1345–1595 mm, panel genişliği 430 mm, ayak
   kapağı 495 × 685 mm, monitör 545 mm (23,8 inç), dokunmatik ekran 10,4 inç. Kontrol yerleri USKEYS'teki R4 panel
   fotoğrafı koordinatlarıdır (1 px ≈ 0,54 mm; fotoğraf eğik çekildiği için ön–arka yönde konumlar 1,55 kat açılır).
   Her kontrol ayrı bir 3B parçadır: tuş kapaklarının üst yüzü USKEYS çiziminden dokulanır, döner düğmeler tırtıllı,
   trackball parlak küredir. Tuşa ya da dokunmatik ekrandaki bir düğmeye tıklamak cfg.onKey(id) çağırır; cfg.keys
   vurgulama ve kadraj içindir. Monitördeki görüntü USIM benzetimidir, ölçüm değildir. Gövde, tekerlek ve prob biçimleri
   ürün fotoğraflarına ve servis kılavuzundaki dış görünüş çizimine göre yaklaşıktır. */
(() => {
  if (typeof DEV3D === 'undefined' || !DEV3D || typeof USKEYS === 'undefined') return;
  const {V3, rbox, box, cyl, sphere, torus, tube, lathe, canvasTex} = DEV3D.H;
  const {std} = K3;
  const T = (tr, en, es) => ({tr, en, es});
  const K = USKEYS.byId;

  /* Panel fotoğraf koordinatı (px) → model (m); kontrol biçimleri gerçek boyutludur (yalnız PX) */
  const PX = .000541, ZS = 1.55, PZ0 = .186, PY = .862;
  const X = px => (px - 460) * PX, Z = py => (py - 470) * PX * ZS + PZ0;
  const pol = (cx, cy, r, a) => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];

  /* SVG → canvas dokusu (yazı tipleri dış kaynak yüklenmeden çizilir) */
  function svgTex(svg, w, h, bg = '#ECE9E3') {
    const tex = canvasTex(w, h, g => { g.fillStyle = bg; g.fillRect(0, 0, w, h); });
    const img = new Image();
    img.onload = () => { const c = tex.userData.canvas, g = c.getContext('2d'); g.fillStyle = bg; g.fillRect(0, 0, w, h); g.drawImage(img, 0, 0, w, h); tex.needsUpdate = true; };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    return tex;
  }

  /* ---------- Şekiller (metre; çizimdeki y aşağı = model +z, şekilde −y) ---------- */
  function rrShape(w, h, r) {
    const s = new THREE.Shape(), x = -w / 2, y = -h / 2; r = Math.min(r, w / 2, h / 2);
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0); s.lineTo(x + w, y + h - r); s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2);
    s.lineTo(x + r, y + h); s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI); s.lineTo(x, y + r); s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5); return s;
  }
  const circShape = r => { const s = new THREE.Shape(); s.absarc(0, 0, r, 0, Math.PI * 2); return s; };
  /* Trackball halkasındaki yay tuşu: merkez (0,0), yarıçaplar px, açılar ° (saat yönü) */
  function arcShape(r0, r1, a0, a1) {
    const s = new THREE.Shape(), n = 24, P = (r, a) => { const [x, y] = pol(0, 0, r, a); return [x * PX, -y * PX]; };
    for (let i = 0; i <= n; i++) { const [x, y] = P(r1, a0 + (a1 - a0) * i / n); i ? s.lineTo(x, y) : s.moveTo(x, y); }
    for (let i = n; i >= 0; i--) { const [x, y] = P(r0, a0 + (a1 - a0) * i / n); s.lineTo(x, y); }
    s.closePath(); return s;
  }
  /* Kapak: yüksekliği h; üst yüz [üst malzeme] kontrol çiziminin span px'lik karesinden dokulanır (merkez: ox, oy px) */
  function capMesh(shape, h, top, side, span, ox = 0, oy = 0) {
    const bv = Math.min(.0009, h * .3), g = new THREE.ExtrudeGeometry(shape, {depth: h - bv, bevelEnabled: true, bevelThickness: bv, bevelSize: bv * .8, bevelSegments: 3, curveSegments: 20});
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position, uv = g.attributes.uv, S = span * PX;
    for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + ox * PX) / S + .5, .5 - (p.getZ(i) + oy * PX) / S);
    uv.needsUpdate = true;
    const m = new THREE.Mesh(g, [top, side]); m.castShadow = m.receiveShadow = true; return m;
  }
  /* Tırtıllı döner düğme gövdesi */
  function knurled(r, h, mat, ribs = 36) {
    const g = new THREE.CylinderGeometry(r * .96, r, h, ribs * 4, 1, false), p = g.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i), rr = Math.hypot(x, z); if (rr < r * .7) continue; const a = Math.atan2(z, x), f = 1 + .035 * Math.max(-.4, Math.cos(a * ribs)); p.setX(i, x * f); p.setZ(i, z * f); }
    g.computeVertexNormals(); const m = new THREE.Mesh(g, mat); m.castShadow = true; return m;
  }

  /* ---------- Panel üst yüzü: gövde, avuç yerleri, trackball yuvası, düğme yakaları ve baskılı yazılar ---------- */
  const OUTLINE = [[96, 352], [140, 326], [250, 322], [630, 322], [770, 328], [850, 372], [858, 520], [800, 606], [560, 606], [532, 626], [525, 690], [390, 690], [383, 626], [356, 606], [120, 606], [64, 520], [70, 400]];
  const HOLES = [[[112, 530], [392, 530], [384, 560], [140, 562]], [[804, 530], [524, 530], [532, 560], [776, 562]]];
  function panelShape() {
    const s = new THREE.Shape(); OUTLINE.forEach(([x, y], i) => i ? s.lineTo(X(x), -Z(y)) : s.moveTo(X(x), -Z(y))); s.closePath();
    HOLES.forEach(h => { const p = new THREE.Path(); h.forEach(([x, y], i) => i ? p.lineTo(X(x), -Z(y)) : p.moveTo(X(x), -Z(y))); p.closePath(); s.holes.push(p); });
    return s;
  }
  const BX0 = X(56), BX1 = X(868), BZ0 = Z(300), BZ1 = Z(700);
  function panelCanvas(wells) {
    const cw = 2048, ch = Math.round(cw * (BZ1 - BZ0) / (BX1 - BX0)), S = cw / (BX1 - BX0);
    return canvasTex(cw, ch, g => {
      const pt = (px, py) => [(X(px) - BX0) * S, (Z(py) - BZ0) * S], L = v => v * PX * S;
      const gr = g.createLinearGradient(0, 0, 0, ch); gr.addColorStop(0, '#F2F0EB'); gr.addColorStop(1, '#E2DFD8'); g.fillStyle = gr; g.fillRect(0, 0, cw, ch);
      const path = pts => { g.beginPath(); pts.forEach(([x, y], i) => { const [a, b] = pt(x, y); i ? g.lineTo(a, b) : g.moveTo(a, b); }); g.closePath(); };
      /* Avuç yerleri ve orta sırt */
      g.fillStyle = '#D9D5CD'; path([[106, 512], [200, 514], [300, 522], [396, 512], [392, 540], [384, 562], [140, 562], [110, 540]]); g.fill();
      path([[810, 512], [716, 514], [616, 522], [520, 512], [524, 540], [532, 562], [776, 562], [806, 540]]); g.fill();
      g.strokeStyle = 'rgba(150,145,136,.45)'; g.lineWidth = L(1.6); path([[352, 600], [352, 520], [348, 470]]); g.stroke(); path([[564, 600], [564, 520], [568, 470]]); g.stroke();
      /* Trackball modülü */
      const [bx, by] = pt(420, 445);
      g.fillStyle = '#D8D4CC'; g.beginPath(); g.arc(bx, by, L(92), 0, 7); g.fill(); g.strokeStyle = '#BDB8AF'; g.lineWidth = L(1.4); g.stroke();
      g.fillStyle = '#C9C5BD'; g.beginPath(); g.arc(bx, by, L(56), 0, 7); g.fill();
      /* Tuş yuvaları (kapak çevresindeki gölge boşluk) */
      g.fillStyle = 'rgba(96,90,82,.7)'; g.shadowColor = 'rgba(0,0,0,.35)'; g.shadowBlur = L(4);
      wells.forEach(w => { const [x, y] = pt(w.x, w.y); g.save(); g.translate(x, y); if (w.rot) g.rotate(w.rot);
        g.beginPath(); if (w.r) g.arc(0, 0, L(w.r + 3.2), 0, 7); else { const ww = L(w.w + 6.4), hh = L(w.h + 6.4), rr = Math.min(ww, hh) / 2 * (w.round ?? 1); g.roundRect ? g.roundRect(-ww / 2, -hh / 2, ww, hh, rr) : g.rect(-ww / 2, -hh / 2, ww, hh); } g.fill(); g.restore(); });
      g.shadowBlur = 0;
      /* Düğme yakaları ve yazıları */
      const txt = (s, x, y, size, col = '#3B4045', wt = 700, al = 'center') => { g.font = `${wt} ${L(size)}px Archivo, Arial, sans-serif`; g.fillStyle = col; g.textAlign = al; g.textBaseline = 'middle'; g.fillText(s, x, y); };
      ['cf', 'pw', 'm'].forEach(id => { const c = K.get(id), [x, y] = pt(c.x, c.y), r = c.r;
        g.fillStyle = '#AEB2B5'; g.beginPath(); g.arc(x, y, L(r * 1.45), 0, 7); g.fill(); g.beginPath(); g.ellipse(x + L(r * 1.75), y + L(r * .3), L(r * .85), L(r * .7), 0, 0, 7); g.fill();
        txt(c.lab, x + L(r * 1.9), y + L(r * .32), r * .66, '#23272B', 800); });
      { const c = K.get('b'), [x, y] = pt(c.x, c.y), r = c.r; g.fillStyle = '#AEB2B5'; g.beginPath(); g.arc(x, y, L(r * 1.4), 0, 7); g.fill(); g.beginPath(); g.ellipse(x, y + L(r * 1.6), L(r * .75), L(r * .62), 0, 0, 7); g.fill(); txt('B', x, y + L(r * 1.7), r * .75, '#23272B', 800); }
      { const c = K.get('joy'), [x, y] = pt(c.x, c.y); txt('Steer ◀', x - L(32), y + L(10), 8.5); txt('▶', x + L(28), y - L(7), 9); txt('Depth ▼', x - L(20), y + L(30), 8.5); txt('⤢ Zoom', x + L(32), y + L(22), 8.5); }
      { const c = K.get('ellipse'), [x, y] = pt(c.x, c.y); txt('⬭ Ellipse', x - L(30), y + L(24), 8, '#4A5055', 600, 'left'); txt('♙ Body Pattern', x - L(30), y + L(34), 8, '#4A5055', 600, 'left'); }
    });
  }

  /* ---------- Kontrol paneli: gövde, üst yüz ve her kontrol ayrı 3B parça ---------- */
  const f1 = v => v.toFixed(1);
  const cropSVG = (c, cx, cy, span) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f1(cx - span / 2)} ${f1(cy - span / 2)} ${span} ${span}">${USKEYS.DEFS}${USKEYS.draw(c)}</svg>`;
  const SIDE = {grey: 0xA9ACAE, white: 0xD9D8D4, blue: 0x5F59EE, dark: 0x1B1E21};
  function panel(pg, reg) {
    const wells = [], groups = {};
    const grp = id => groups[id] || (groups[id] = new THREE.Group());
    const topMat = (c, x, y, span, bg) => std(0xC4C4C4, .7, 0, {map: svgTex(cropSVG(c, x, y, span), 256, 256, bg)});
    const add = (id, m, x, y, lift = 0) => { m.position.set(X(x), PY + lift, Z(y)); grp(id).add(m); return m; };
    /* Gövde: kalın, kenarları yuvarlatılmış beyaz kabuk; altı koyu */
    const shape = panelShape();
    const ex = new THREE.ExtrudeGeometry(shape, {depth: .026, bevelEnabled: true, bevelThickness: .009, bevelSize: .008, bevelSegments: 5, curveSegments: 10});
    ex.rotateX(-Math.PI / 2); const body = new THREE.Mesh(ex, std(0xD3D1CC, .8, 0, {envMapIntensity: .6})); body.position.y = PY - .035; body.castShadow = body.receiveShadow = true; pg.add(body);
    const under = new THREE.Mesh(ex.clone(), std(0x1F2327, .7, .05)); under.scale.set(.94, .7, .94); under.position.set(0, PY - .06, .006); pg.add(under);

    /* Tuş kapakları */
    for (const c of USKEYS.C) {
      switch (c.k) {
        case 'oblong': (c.set3 || [[c.x, c.y, c.c || 'grey']]).forEach(([x, y, v]) => {
          const side = std(SIDE[v], .45, .02, v === 'blue' ? {emissive: new THREE.Color(0x4A44FF), emissiveIntensity: .35} : {});
          const top = topMat(c, x, y, c.w + 2, v === 'blue' ? '#7C78FF' : '#D0D2D3'); if (v === 'blue') { top.emissive = new THREE.Color(0x5A55FF); top.emissiveIntensity = .3; }
          add(c.id, capMesh(rrShape(c.w * PX, c.h * PX, c.h / 2 * PX), .0045, top, side, c.w + 2), x, y); wells.push({x, y, w: c.w, h: c.h});
        }); break;
        case 'round': add(c.id, capMesh(circShape(c.r * PX), .0045, topMat(c, c.x, c.y, 2 * c.r + 1, '#C9CBCC'), std(SIDE.grey, .45, .02), 2 * c.r + 1), c.x, c.y); wells.push({x: c.x, y: c.y, r: c.r}); break;
        case 'dround': (c.set2 || [c.x]).forEach(x => {
          const m = capMesh(circShape(c.r * PX), .0062, topMat(c, x, c.y, 2 * c.r + 1, '#2A2E33'), std(SIDE.dark, .4, .05), 2 * c.r + 1);
          add(c.id, m, x, c.y); wells.push({x, y: c.y, r: c.r}); }); break;
        case 'freeze': add(c.id, capMesh(rrShape(c.w * PX, c.h * PX, c.h / 2 * PX), .0062, topMat(c, c.x, c.y, c.w + 2, '#2A2E33'), std(SIDE.dark, .4, .05), c.w + 2), c.x, c.y); wells.push({x: c.x, y: c.y, w: c.w, h: c.h}); break;
        case 'arc': {
          const segs = c.mirror ? [[c.a0, c.a1], [180 - c.a1, 180 - c.a0]] : [[c.a0, c.a1]];
          segs.forEach(([a0, a1]) => add(c.id, capMesh(arcShape(63, 79, a0, a1), .004, topMat(c, c.x, c.y, 162, '#D0D2D3'), std(SIDE.grey, .45, .02), 162), c.x, c.y));
          break;
        }
        case 'sq': [c.a, c.a2].forEach(a => { const [x, y] = pol(0, 0, 78, a), m = capMesh(rrShape(20 * PX, 20 * PX, 4 * PX), .004, std(0xCFD1D2, .42, .02), std(SIDE.grey, .45, .02), 22);
          m.rotation.y = -(a + 90) * Math.PI / 180; m.position.set(X(c.x) + x * PX, PY, Z(c.y) + y * PX); grp(c.id).add(m); }); break;
        case 'knob': case 'knobB': case 'knobS': case 'joy': case 'knobW': {
          const black = c.k !== 'joy' && c.k !== 'knobW', r = c.r * PX, h = {knob: .019, knobB: .023, knobS: .015, joy: .018, knobW: .021}[c.k];
          (c.set || [c.x]).forEach(x => {
            const kg = new THREE.Group(), body = knurled(r, h, black ? std(0x16181B, .5, .12) : std(0xD4D6D8, .4, .05));
            body.position.y = h / 2; kg.add(body);
            const capM = black ? std(0x24282D, .32, .2) : std(0xE2E4E5, .35, .05);
            const top = lathe([[0, h + .0016], [r * .55, h + .0012], [r * .86, h + .0002], [r * .9, h - .0004]], capM, 40); kg.add(top);
            if (black) { const ln = box(.0012, .0008, r * .55, std(0xE8EAEB, .4, 0)); ln.position.set(0, h + .0014, -r * .45); kg.add(ln); }
            const skirt = cyl(r * 1.08, r * 1.12, .002, black ? std(0x2A2E32, .6, .05) : std(0xC9CCCE, .5, .05), 40); skirt.position.y = .001; kg.add(skirt);
            add(c.id, kg, x, c.y);
          });
          break;
        }
        case 'ball': {
          const bx = X(c.x), bz = Z(c.y), rb = c.r * PX, bg = grp(c.id);
          const well = cyl(rb * 1.12, rb * 1.12, .003, std(0x3A3F45, .6, .1), 48); well.position.set(bx, PY + .0005, bz); bg.add(well);
          const ring = torus(rb * 1.1, .0024, std(0xD9DBDC, .3, .3), 64); ring.rotation.x = Math.PI / 2; ring.position.set(bx, PY + .0025, bz); bg.add(ring);
          const ball = sphere(rb, new THREE.MeshPhysicalMaterial({color: K3.lin(0xD8D0F4), roughness: .12, metalness: 0, clearcoat: 1, clearcoatRoughness: .08}), 48);
          ball.position.set(bx, PY - rb * .3, bz); bg.add(ball);
          break;
        }
        case 'paddle': [-1, 1].forEach(s => { const p = rbox(.017, .009, .03, .004, std(0x1E2226, .55, .1)); p.position.set(X(c.x) + s * .011, PY - .05, Z(600)); grp(c.id).add(p); }); break;
        case 'kbd': {
          const kg = grp(c.id), tray = rbox(.2, .016, .15, .006, std(0x1F2327, .6, .05)); tray.position.set(0, PY - .1, Z(560) - .01); kg.add(tray);
          const kb = rbox(.18, .006, .09, .003, std(0x2B3035, .6, .05)); kb.position.set(0, PY - .09, Z(560)); kg.add(kb);
          const kt = canvasTex(512, 224, (g, w, h) => { g.fillStyle = '#23272B'; g.fillRect(0, 0, w, h); g.fillStyle = '#3A4046'; for (let r = 0; r < 5; r++) for (let k = 0; k < 14; k++) { g.beginPath(); g.roundRect ? g.roundRect(10 + k * 35.5, 10 + r * 41, 30, 34, 5) : g.rect(10 + k * 35.5, 10 + r * 41, 30, 34); g.fill(); } });
          const kp = new THREE.Mesh(new THREE.PlaneGeometry(.17, .08), std(0xFFFFFF, .6, 0, {map: kt})); kp.rotation.x = -Math.PI / 2; kp.position.set(0, PY - .0865, Z(560)); kg.add(kp);
          break;
        }
      }
    }
    /* Üst yüz baskısı */
    const top = new THREE.ShapeGeometry(shape, 16); top.rotateX(-Math.PI / 2);
    const pos = top.attributes.position, uv = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) { uv[i * 2] = (pos.getX(i) - BX0) / (BX1 - BX0); uv[i * 2 + 1] = 1 - (pos.getZ(i) - BZ0) / (BZ1 - BZ0); }
    top.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    const tex = panelCanvas(wells); tex.anisotropy = 8;
    const tm = new THREE.Mesh(top, std(0xBDBBB6, .9, 0, {map: tex, envMapIntensity: .55})); tm.position.y = PY + .0015; tm.receiveShadow = true; pg.add(tm);
    Object.keys(groups).forEach(id => { pg.add(groups[id]); reg(id, groups[id]); });
  }

  /* ---------- Dokunmatik ekran (10,4 inç, 211 × 158 mm görüntü alanı) ---------- */
  const TV = [248, 38, 390, 266];   /* USKEYS.touchSVG görünüm kutusu */
  function touch(g) {
    const grp = new THREE.Group(), W = .238, H = .186, tilt = .62;
    const bez = rbox(W, H, .02, .012, std(0xEDEBE6, .45, .02)); grp.add(bez);
    const back = rbox(W * .92, H * .9, .012, .01, std(0x2A2F33, .6, .05)); back.position.z = -.012; grp.add(back);
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(.211, .158), new THREE.MeshBasicMaterial({map: svgTex(USKEYS.touchSVG(), 1170, 798, '#1A2026'), toneMapped: false}));
    scr.position.z = .0105; grp.add(scr);
    grp.rotation.x = -Math.PI / 2 + tilt; grp.position.set(0, PY + .07, Z(250) - .02); g.add(grp);
    const foot = rbox(.25, .05, .1, .015, std(0xE6E3DD, .5, .02)); foot.position.set(0, PY + .012, Z(250) - .09); foot.rotation.x = -.25; g.add(foot);
    /* Ekrandaki dokunmatik düğme: uv → çizim koordinatı */
    const at = (u, v) => { const x = TV[0] + u * TV[2], y = TV[1] + (1 - v) * TV[3]; const c = USKEYS.C.find(c => c.k === 'touch' && Math.abs(x - c.x) <= c.w / 2 && Math.abs(y - c.y) <= c.h / 2); return c ? c.id : null; };
    return {grp, scr, at};
  }

  /* ---------- Monitör ekranı: başlık, görüntü (USIM), parametreler, küçük resimler ---------- */
  function monitorScreen() {
    const W = 1280, H = 720, tex = canvasTex(W, H, () => {}), c = tex.userData.canvas, g = c.getContext('2d');
    let scan = null, off = null, last = -1;
    if (typeof USIM !== 'undefined' && USIM) {
      off = document.createElement('canvas'); off.width = 560; off.height = 470;
      try { scan = USIM.Scanner(off, {geom: {type: 'linear', W: 50}, depth: 35, freq: 12, gain: 0, tgc: [0, 0, 0], labels: false, bare: true, smooth: true, cx: .5, padT: .02, padB: .02, fillW: .96}); } catch (e) { scan = null; }
    }
    const F = (wt, s) => `${wt} ${s}px "Archivo", Arial, sans-serif`, MONO = s => `500 ${s}px "JetBrains Mono", Menlo, monospace`;
    function draw(t) {
      g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
      g.fillStyle = '#0E1216'; g.fillRect(0, 0, W, 54);
      g.fillStyle = '#C9D1D8'; g.font = F(700, 22); g.fillText('GE HealthCare', 24, 34);
      g.font = MONO(18); g.fillStyle = '#9AA6AF'; g.fillText('MI 0.8   TIs 0.4', 560, 34); g.fillText('ML6-15  Nerve', 800, 34); g.fillText('12:04', 1180, 34);
      if (scan) { try { const sim = {pose: USIM.pose(0, 0, 0, 0, 0), press: 0, pulse: Math.max(0, Math.sin(t * 7.5)) ** 2, needles: [], labels: () => []}; scan.render(sim, t); } catch (e) { scan = null; } }
      if (off) g.drawImage(off, 300, 80, 600, 504); else { g.fillStyle = '#20262B'; g.fillRect(300, 80, 600, 504); }
      g.fillStyle = '#E8EEF1'; g.beginPath(); g.moveTo(290, 92); g.lineTo(276, 84); g.lineTo(276, 100); g.fill();
      /* Sağ parametre sütunu */
      g.font = MONO(19); g.fillStyle = '#C9D1D8';
      [['Frq', '12.0'], ['Gn', '52'], ['D', '3.5'], ['DR', '66'], ['FR', '31'], ['AO', '100%']].forEach(([k, v], i) => { g.fillText(k, 1010, 120 + i * 34); g.fillText(v, 1100, 120 + i * 34); });
      g.strokeStyle = '#5A6670'; g.lineWidth = 2; for (let i = 0; i <= 7; i++) { const y = 90 + i * 70; g.beginPath(); g.moveTo(912, y); g.lineTo(922, y); g.stroke(); }
      g.fillStyle = '#FFD24A'; g.beginPath(); g.moveTo(928, 260); g.lineTo(940, 252); g.lineTo(940, 268); g.fill();
      /* Gri çubuk ve küçük resimler */
      const gr = g.createLinearGradient(0, 120, 0, 420); gr.addColorStop(0, '#fff'); gr.addColorStop(1, '#000'); g.fillStyle = gr; g.fillRect(240, 120, 14, 300);
      for (let i = 0; i < 5; i++) { g.fillStyle = '#1A2026'; g.fillRect(300 + i * 124, 610, 112, 84); g.strokeStyle = '#3A4650'; g.strokeRect(300 + i * 124, 610, 112, 84); }
      g.fillStyle = 'rgba(255,210,74,.9)'; g.font = F(700, 16); g.fillText(typeof ICA !== 'undefined' ? ICA.t('dev.sim') : '', 24, H - 20);
      tex.needsUpdate = true;
    }
    draw(0);
    return {tex, update(t) { if (t - last < .1) return; last = t; draw(t); }};
  }

  /* ---------- Problar (fotoğraflara göre sadeleştirilmiş) ---------- */
  function probe(kind) {
    const grp = new THREE.Group(), white = std(0xF1F2F3, .38, .02), face = std(kind === 'ml' ? 0x23304A : kind === 'c' ? 0x6B86A8 : 0x202428, .6, .05);
    const handle = lathe([[0, 0], [.013, .004], [.016, .03], [.0165, .06], [.014, .09], [.009, .115], [.006, .13], [0, .132]], white, 32); grp.add(handle);
    const strain = lathe([[.006, .128], [.0055, .15], [.004, .17], [0, .17]], std(0x2E3236, .6, .05), 16); grp.add(strain);
    if (kind === 'c') { const h = cyl(.032, .032, .028, face, 40, false); h.rotation.z = Math.PI / 2; h.scale.set(1, 1, .9); h.position.y = -.008; grp.add(h); const n = rbox(.05, .03, .024, .008, white); n.position.y = .008; grp.add(n); }
    else { const w = kind === 'ml' ? .058 : kind === 'l' ? .046 : .03; const h = rbox(w, .03, .024, .006, white); h.position.y = .002; grp.add(h); const f = rbox(w * .94, .008, .02, .003, face); f.position.y = -.013; grp.add(f); }
    return grp;
  }
  /* Tekerlek: beyaz çatal gövdesi, koyu lastik, açık göbek */
  function caster(x, z) {
    const g = new THREE.Group(), white = std(0xEDEFF0, .4, .02);
    const fork = rbox(.07, .075, .1, .025, white); fork.position.y = .085; g.add(fork);
    const stem = cyl(.016, .016, .03, std(0x9AA1A6, .35, .6), 20); stem.position.y = .13; g.add(stem);
    [-1, 1].forEach(s => { const t = cyl(.052, .052, .024, std(0x24282B, .8, .02), 40); t.rotation.z = Math.PI / 2; t.position.set(s * .026, .052, 0); g.add(t);
      const hub = cyl(.034, .034, .026, std(0xDADDE0, .35, .25), 32); hub.rotation.z = Math.PI / 2; hub.position.set(s * .026, .052, 0); g.add(hub); });
    g.position.set(x, 0, z); return g;
  }

  /* ---------- Kurucu ---------- */
  DEV3D.register('u-logiq', cfg => {
    const g = new THREE.Group(), parts = [], screens = [], hits = [], keyObj = {};
    const white = std(0xEEF0F1, .42, .02), dark = std(0x202428, .62, .05), mid = std(0x3A4045, .6, .1);
    /* Ayak kapağı (tırtıllı üst yüz) ve tekerlekler */
    const foot = rbox(.495, .045, .685, .03, dark); foot.position.set(0, .135, 0); g.add(foot);
    for (let i = 0; i < 12; i++) { const r = box(.38, .003, .006, std(0x2C3135, .8, .02)); r.position.set(0, .159, .14 + i * .014); g.add(r); }
    [[-.2, .26], [.2, .26], [-.2, -.27], [.2, -.27]].forEach(([x, z]) => g.add(caster(x, z)));
    /* Gövde: önde beyaz modül (GE logosu, havalandırma), sağda koyu prob bölmesi; üstte beyaz yazıcı modülü */
    const tower = rbox(.38, .56, .40, .03, white); tower.position.set(0, .44, -.05); g.add(tower);
    const sideR = rbox(.012, .5, .34, .006, dark); sideR.position.set(.191, .42, -.05); g.add(sideR);
    const bay = rbox(.17, .32, .03, .012, dark); bay.position.set(.1, .39, .145); g.add(bay);
    for (let i = 0; i < 4; i++) {
      const slot = rbox(.03, .15, .012, .004, std(0x34393F, .55, .2)); slot.position.set(.043 + i * .038, .41, .163); g.add(slot);
      const latch = rbox(.022, .018, .008, .003, i === 3 ? std(0xC9CDD0, .4, .1) : std(0x56BEE8, .45, .1)); latch.position.set(.043 + i * .038, .495, .168); g.add(latch);
    }
    const cw = cyl(.011, .011, .01, std(0x8A939A, .4, .4), 24); cw.rotation.x = Math.PI / 2; cw.position.set(.07, .27, .163); g.add(cw);
    const grill = DEV3D.H.decal(.17, .09, (c, w, h) => { c.fillStyle = '#E6E8E9'; c.fillRect(0, 0, w, h); c.fillStyle = '#9BA2A7'; for (let r = 0; r < 7; r++) for (let k = 0; k < 18; k++) c.fillRect(8 + k * 27.5, 10 + r * 34, 18, 5); }, 512);
    grill.position.set(-.09, .22, .1515); g.add(grill);
    const logo = DEV3D.H.decal(.08, .08, (c, w, h) => { c.strokeStyle = '#6E777E'; c.lineWidth = w * .05; c.beginPath(); c.arc(w / 2, h / 2, w * .42, 0, 7); c.stroke(); c.fillStyle = '#6E777E'; c.font = `italic 700 ${w * .36}px Georgia, serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('GE', w / 2, h * .53); }, 256);
    logo.position.set(-.09, .34, .1515); g.add(logo);
    const usb = rbox(.03, .012, .006, .003, mid); usb.position.set(-.09, .42, .152); g.add(usb);
    const upper = rbox(.37, .13, .38, .025, white); upper.position.set(0, .765, -.03); g.add(upper);
    const fr = DEV3D.H.decal(.3, .1, (c, w, h) => { c.fillStyle = '#ECEEEF'; c.fillRect(0, 0, w, h); c.strokeStyle = '#B9BFC3'; c.lineWidth = 3; c.strokeRect(16, 14, w * .5, h * .42); c.strokeRect(16, h * .58, w * .5, h * .3); c.fillStyle = '#8D959B'; c.font = `600 ${h * .2}px Archivo, Arial`; c.fillText('LOGIQ', w * .64, h * .5); }, 512);
    fr.position.set(0, .765, .1605); g.add(fr);
    /* Kontrol paneli, dokunmatik ekran */
    const pg = new THREE.Group(); g.add(pg);
    const reg = (id, obj) => { keyObj[id] = obj; obj.userData.key = id; hits.push({obj, on: t => { if (t === 'down' && cfg.onKey) cfg.onKey(id); return true; }, hover: () => true}); };
    panel(pg, reg);
    const tc = touch(pg);
    hits.push({mesh: tc.scr, on: (t, u, v) => { const id = tc.at(u, v); if (id && t === 'down' && cfg.onKey) cfg.onKey(id); return !!id; }, hover: (u, v) => !!tc.at(u, v)});
    /* Prob tutucuları: sağda üç, solda bir + jel ısıtıcı */
    const cup = (x, z) => { const c = cyl(.03, .024, .07, dark, 28, true); c.position.set(x, PY - .01, z); pg.add(c); const b = cyl(.024, .024, .004, dark, 24); b.position.set(x, PY - .045, z); pg.add(b); return c; };
    const wingR = rbox(.075, .05, .25, .02, dark); wingR.position.set(.25, PY - .012, Z(250) - .02); pg.add(wingR);
    const wingL = rbox(.075, .05, .25, .02, dark); wingL.position.set(-.25, PY - .012, Z(250) - .02); pg.add(wingL);
    const kinds = ['ml', 'c', 'p'], cab = std(0x2E3236, .55, .05);
    [-.08, 0, .08].forEach((dz, i) => { const z = Z(250) - .02 + dz; cup(.25, z); const pr = probe(kinds[i]); pr.rotation.x = Math.PI; pr.position.set(.25, PY + .1, z); pg.add(pr);
      pg.add(tube([[.25, PY + .27, z], [.3, PY + .2, z + .03], [.32, .75, .12], [.25, .52, .19], [.04 + i * .038, .47, .175]], .0035, cab, 64, 8)); });
    cup(-.25, Z(250) + .06); { const pr = probe('l'); pr.rotation.x = Math.PI; pr.position.set(-.25, PY + .1, Z(250) + .06); pg.add(pr); }
    const gel = cyl(.033, .033, .06, std(0xBFC5CA, .5, .2), 32); gel.position.set(-.25, PY + .005, Z(250) - .08); pg.add(gel);
    const bottle = lathe([[0, 0], [.022, 0], [.022, .1], [.012, .12], [.006, .14], [0, .14]], std(0x8EC9E8, .3, 0, {transparent: true, opacity: .85}), 28); bottle.position.set(-.25, PY + .02, Z(250) - .08); pg.add(bottle);
    /* Monitör kolu ve monitör */
    const col = cyl(.032, .036, .26, white, 32); col.position.set(0, PY + .17, Z(40) - .03); g.add(col);
    const jt = rbox(.1, .07, .1, .025, white); jt.position.set(0, PY + .33, Z(40) - .03); g.add(jt);
    const link = rbox(.07, .05, .08, .02, white); link.position.set(0, PY + .37, Z(40) - .065); link.rotation.x = -.35; g.add(link);
    const mon = new THREE.Group(); mon.position.set(0, 1.29, Z(40) + .02); mon.rotation.x = -.12; g.add(mon);
    const back = rbox(.545, .33, .03, .01, std(0xE5E7E9, .5, .02)); mon.add(back);
    const hump = rbox(.2, .16, .03, .02, std(0xE5E7E9, .5, .02)); hump.position.z = -.02; mon.add(hump);
    const front = rbox(.543, .328, .004, .008, std(0x060708, .25, .1)); front.position.z = .016; mon.add(front);
    const ms = monitorScreen();
    const scrM = new THREE.Mesh(new THREE.PlaneGeometry(.527, .2965), new THREE.MeshBasicMaterial({map: ms.tex, toneMapped: false})); scrM.position.z = .0185; mon.add(scrM);
    screens.push({update: t => ms.update(t)});
    /* Arka tutamak */
    const rh = tube([[.15, PY + .02, Z(40) - .06], [.2, PY + .03, Z(40) - .14], [.12, PY + .03, Z(40) - .18]], .012, white, 24, 10); g.add(rh);
    g.updateMatrixWorld(true);

    /* Vurgulama ve kadraj (cihaz sayfası kullanır) */
    let on = null, mark = null;
    const glow = (id, v) => {
      const o = keyObj[id];
      if (o) o.traverse(m => { if (!m.isMesh) return; (Array.isArray(m.material) ? m.material : [m.material]).forEach(mt => { if (!mt.emissive) return; if (mt.userData.e0 === undefined) mt.userData.e0 = [mt.emissive.getHex(), mt.emissiveIntensity]; if (v) { mt.emissive.setHex(0x19C2A8); mt.emissiveIntensity = .55; } else { mt.emissive.setHex(mt.userData.e0[0]); mt.emissiveIntensity = mt.userData.e0[1]; } }); });
      const c = K.get(id);
      if (c && c.k === 'touch') {
        if (mark) { mark.parent.remove(mark); mark = null; }
        if (v) { mark = new THREE.Mesh(new THREE.PlaneGeometry(c.w / TV[2] * .211, c.h / TV[3] * .158), new THREE.MeshBasicMaterial({color: 0x19C2A8, transparent: true, opacity: .45, toneMapped: false}));
          mark.position.set(((c.x - TV[0]) / TV[2] - .5) * .211, (.5 - (c.y - TV[1]) / TV[3]) * .158, .0112); tc.grp.add(mark); }
      }
    };
    cfg.keys = {
      select(id) { if (on) glow(on, false); on = id; if (id) glow(id, true); },
      at(id) {   /* kontrolün dünya konumu */
        const c = K.get(id); if (!c) return null;
        if (c.k === 'touch') return tc.grp.localToWorld(V3(((c.x - TV[0]) / TV[2] - .5) * .211, (.5 - (c.y - TV[1]) / TV[3]) * .158, 0));
        if (c.k === 'paddle') return V3(X(c.x), PY - .05, Z(600));
        if (c.k === 'kbd') return V3(0, PY - .09, Z(560));
        const xs = c.set || (c.set3 && c.set3.map(p => p[0])) || c.set2 || [c.x], ys = c.set3 ? c.set3.map(p => p[1]) : [c.y];
        return V3(X((Math.min(...xs) + Math.max(...xs)) / 2), PY + .01, Z((Math.min(...ys) + Math.max(...ys)) / 2));
      }
    };

    const P = (key, x, y, z, look) => parts.push(Object.assign({key, at: V3(x, y, z)}, look ? {look} : {}));
    P('lg-monitor', .2, 1.4, Z(40) + .04);
    P('lg-arm', .05, PY + .3, Z(40) + .01);
    const tw = tc.grp.localToWorld(V3(0, .1, .02)); P('lg-touch', tw.x + .1, tw.y, tw.z, {at: tc.grp.localToWorld(V3(0, 0, 0)), dist: .55, theta: 0, phi: .75});
    P('lg-panel', X(80), PY + .03, Z(380), {at: V3(0, PY, Z(450)), dist: .62, theta: 0, phi: .55});
    P('lg-holder', .27, PY + .14, Z(250) - .02);
    P('lg-gel', -.25, PY + .13, Z(250) - .08);
    P('lg-ports', .1, .52, .17);
    P('lg-kbd', -.14, PY - .1, Z(560) + .08);
    P('lg-printer', -.12, .8, .17);
    P('lg-foot', -.12, .17, .3);
    P('lg-caster', .23, .09, -.27);
    P('lg-rear', 0, .45, -.28);
    P('lg-body', -.2, .45, .1);
    return {group: g, parts, screens, hits};
  });
  DEV3D.model('ge-logiq-p8', {type: 'u-logiq', theta: .55, phi: 1.12, sim: false});

  /* ---------- Parça metinleri (kaynak numaraları cihaz sayfasının kaynakçasıdır) ---------- */
  const PT = {
    'lg-monitor': T(['Monitör (23,8 inç)', '23,8 inç çerçevesiz, LED arkadan aydınlatmalı LCD [1]. Kol sayesinde yukarı–aşağı ±7,5 cm, sağa–sola ±18 cm hareket eder; +90°/−15° eğilir ve ±90° döner [3]. Ekrandaki görüntü bu sayfanın benzetimidir.'], ['Monitor (23.8 in)', '23.8-inch bezel-less LCD with LED backlight [1]. On its arm it moves ±7.5 cm up–down and ±18 cm left–right, tilts +90°/−15° and swivels ±90° [3]. The image on the screen is this page\'s simulation.'], ['Monitor (23,8 pulgadas)', 'LCD de 23,8 pulgadas sin marco con retroiluminación LED [1]. Gracias al brazo se desplaza ±7,5 cm arriba–abajo y ±18 cm a izquierda–derecha, se inclina +90°/−15° y gira ±90° [3]. La imagen de la pantalla es una simulación de esta página.']),
    'lg-arm': T(['Monitör kolu', 'Monitörü panelden bağımsız konumlandıran eklemli kol; kolun kilidi vardır [3].'], ['Monitor arm', 'Articulated arm that positions the monitor independently of the panel; the arm has a lock [3].'], ['Brazo del monitor', 'Brazo articulado que coloca el monitor con independencia del panel; el brazo tiene un bloqueo [3].']),
    'lg-touch': T(['Dokunmatik ekran (10,4 inç)', 'Hasta, tarama, inceleme sonu ve klavye düğmeleri, mod sayfaları, dijital TGC ve prob seçimi buradadır [1][2]. Altındaki beş döner düğmenin işlevi açık sayfaya göre değişir [2].'], ['Touch screen (10.4 in)', 'Patient, scan, end-exam and keyboard buttons, mode pages, digital TGC and probe selection are here [1][2]. The functions of the five rotary knobs below it change with the open page [2].'], ['Pantalla táctil (10,4 pulgadas)', 'Aquí están los botones de paciente, exploración, fin de estudio y teclado, las páginas de modo, la TGC digital y la selección de sonda [1][2]. La función de los cinco mandos giratorios de debajo cambia según la página abierta [2].']),
    'lg-panel': T(['Kontrol paneli', 'Yüksekliği ayarlanabilir ve döndürülebilir [1]; döndürme düğmesi basılıyken her iki yana yaklaşık 30° döner [3]. Modelde bir tuşa tıklayınca açıklaması yandaki panelde açılır; tüm tuşlar aşağıdaki "Tuşlar" bölümünde tek tek anlatılır.'], ['Control panel', 'Height-adjustable and swivelling [1]; with the swivel button held it rotates about 30° to each side [3]. Click a control on the model to see its explanation in the side panel; every control is explained one by one in the "Controls" section below.'], ['Panel de control', 'Regulable en altura y giratorio [1]; con el botón de giro pulsado rota unos 30° a cada lado [3]. Al hacer clic en un control del modelo, su explicación se abre en el panel lateral; todos los controles se explican uno a uno en la sección "Controles" de abajo.']),
    'lg-holder': T(['Prob tutucuları ve problar', 'Sağda üç, solda bir prob tutucusu vardır [3]. Modeldeki problar: sağda ML6-15-RS (matris lineer, 4–15 MHz), C1-5-RS (konveks, 1–6 MHz) ve 3Sc-RS (sektör, 1–5 MHz); solda L4-12t-RS (lineer, 3–12 MHz) [10]. Hepsi P8 prob listesindedir [1]; prob biçimleri sadeleştirilmiştir.'], ['Probe holders and probes', 'There are three probe holders on the right and one on the left [3]. Probes in the model: on the right ML6-15-RS (matrix linear, 4–15 MHz), C1-5-RS (convex, 1–6 MHz) and 3Sc-RS (sector, 1–5 MHz); on the left L4-12t-RS (linear, 3–12 MHz) [10]. All are on the P8 probe list [1]; probe shapes are simplified.'], ['Soportes de sonda y sondas', 'Hay tres soportes de sonda a la derecha y uno a la izquierda [3]. Sondas del modelo: a la derecha ML6-15-RS (lineal matricial, 4–15 MHz), C1-5-RS (convexa, 1–6 MHz) y 3Sc-RS (sectorial, 1–5 MHz); a la izquierda L4-12t-RS (lineal, 3–12 MHz) [10]. Todas figuran en la lista de sondas del P8 [1]; las formas están simplificadas.']),
    'lg-gel': T(['Jel ısıtıcı (isteğe bağlı)', 'Panelin sol arka köşesindedir [3]; isteğe bağlı donanımdır [1].'], ['Gel warmer (optional)', 'At the rear left corner of the panel [3]; it is an option [1].'], ['Calentador de gel (opcional)', 'En la esquina trasera izquierda del panel [3]; es opcional [1].']),
    'lg-ports': T(['Prob girişleri', '4 aktif prob girişi vardır: 3 RS ve 1 DLP [1]. İsteğe bağlı tek CW kalem prob girişi bu bölmenin altındadır [3].'], ['Probe ports', 'There are 4 active probe ports: 3 RS and 1 DLP [1]. The optional single CW pencil-probe connector is below this bay [3].'], ['Puertos de sonda', 'Hay 4 puertos de sonda activos: 3 RS y 1 DLP [1]. El conector opcional para sonda lápiz CW está debajo de este compartimento [3].']),
    'lg-kbd': T(['Klavye çekmecesi (isteğe bağlı)', 'Fiziksel alfanümerik klavye panelin altından çekmece gibi çıkar [3]; isteğe bağlıdır, dijital klavye her zaman vardır [1].'], ['Keyboard drawer (optional)', 'The physical alphanumeric keyboard slides out like a drawer below the panel [3]; it is optional, and a digital keyboard is always available [1].'], ['Cajón del teclado (opcional)', 'El teclado alfanumérico físico sale como un cajón bajo el panel [3]; es opcional y siempre hay un teclado digital [1].']),
    'lg-printer': T(['Yazıcı ve sürücü yeri', 'Siyah-beyaz yazıcı için gövdede yer vardır; DVD sürücüsü isteğe bağlıdır [1].'], ['Printer and drive bay', 'The console has room for a black-and-white printer; a DVD drive is optional [1].'], ['Compartimento de impresora y unidad', 'La consola tiene espacio para una impresora en blanco y negro; la unidad de DVD es opcional [1].']),
    'lg-foot': T(['Ayak dayanağı ve ön frenler', 'Ön tekerlek frenleri ayak dayanağının altındaki pedallardır [3]. Kapatmadan önce fren konur ve panel yerine kilitlenir [2].'], ['Foot rest and front brakes', 'The front wheel brakes are pedals under the foot rest [3]. Before shutting down, set the brake and lock the panel in place [2].'], ['Reposapiés y frenos delanteros', 'Los frenos de las ruedas delanteras son pedales bajo el reposapiés [3]. Antes de apagar, ponga el freno y bloquee el panel en su sitio [2].']),
    'lg-caster': T(['Tekerlekler', 'Sağ arka tekerlekte ayrı döner kilidi ve fren vardır; diğer tekerlekler hem freni hem dönmeyi birlikte kilitler [3].'], ['Casters', 'The right rear caster has a separate swivel lock and brake; the other casters lock brake and swivel together [3].'], ['Ruedas', 'La rueda trasera derecha tiene bloqueo de giro y freno independientes; las demás bloquean freno y giro a la vez [3].']),
    'lg-rear': T(['Arka giriş/çıkış paneli', 'Arkada 3 USB, HDMI, S-video, kompozit video, ağ (RJ45) ve elektrik girişi vardır; önde de 2 USB 3.0 bulunur [1].'], ['Rear input/output panel', 'At the rear are 3 USB ports, HDMI, S-video, composite video, network (RJ45) and the power inlet; there are also 2 USB 3.0 ports at the front [1].'], ['Panel trasero de entradas/salidas', 'Detrás hay 3 USB, HDMI, S-vídeo, vídeo compuesto, red (RJ45) y la entrada de alimentación; delante hay además 2 USB 3.0 [1].']),
    'lg-body': T(['Konsol', 'Yaklaşık 55 cm genişlik, 74 cm derinlik ve 160 cm yükseklikte hareketli konsol [9]; ağırlığı 67–83 kg\'dır. Elektrik: 100–240 V AC, en çok 500 VA [1].'], ['Console', 'Mobile console about 55 cm wide, 74 cm deep and 160 cm high [9]; it weighs 67–83 kg. Power: 100–240 V AC, up to 500 VA [1].'], ['Consola', 'Consola móvil de unos 55 cm de ancho, 74 cm de fondo y 160 cm de alto [9]; pesa 67–83 kg. Alimentación: 100–240 V CA, hasta 500 VA [1].'])
  };
  Object.keys(PT).forEach(k => DEV3D.partText(k, PT[k]));
})();
