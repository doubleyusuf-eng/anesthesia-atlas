'use strict';
/* Cihaz yapılandırmaları A: anestezi derinliği, nosisepsiyon, NIRS, nöromüsküler, Masimo.
   Örnek: BIS Advance — üretici görseline göre: mavi çerçeveli tablet monitör, kaide, solda BISx modülü ve sensör kablosu. */
(() => {
  if (!DEV3D) return;
  const {V3, M, rbox, box, cyl, tube, put, sensorTip, decal} = DEV3D.H;
  /* İnce, köşeleri yuvarlak düz levha (ön cam, renkli çerçeve vb.); rbox'tan farklı olarak köşe yarıçapı kalınlıkla sınırlı değildir */
  function plate(w, h, t, r, mat) {
    r = Math.min(r, w / 2 - .0005, h / 2 - .0005);
    const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    const geo = new THREE.ExtrudeGeometry(s, {depth: t, bevelEnabled: false, curveSegments: 10}); geo.translate(0, 0, -t / 2);
    const m = new THREE.Mesh(geo, mat); m.castShadow = m.receiveShadow = true; return m;
  }
  /* Yuvarlak köşeli gövde: plan köşe yarıçapı r, kenar pahı bev */
  function slab(w, h, d, r, bev, mat) {
    const iw = w - 2 * bev, ih = h - 2 * bev; r = Math.min(Math.max(r - bev, .001), iw / 2 - .0005, ih / 2 - .0005);
    const s = new THREE.Shape(), x = -iw / 2, y = -ih / 2;
    s.moveTo(x + r, y); s.lineTo(x + iw - r, y); s.quadraticCurveTo(x + iw, y, x + iw, y + r); s.lineTo(x + iw, y + ih - r); s.quadraticCurveTo(x + iw, y + ih, x + iw - r, y + ih);
    s.lineTo(x + r, y + ih); s.quadraticCurveTo(x, y + ih, x, y + ih - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    const dd = Math.max(d - 2 * bev, .0005), geo = new THREE.ExtrudeGeometry(s, {depth: dd, bevelEnabled: true, bevelThickness: bev, bevelSize: bev, bevelSegments: 4, curveSegments: 10});
    geo.translate(0, 0, -dd / 2);
    const m = new THREE.Mesh(geo, mat); m.castShadow = m.receiveShadow = true; return m;
  }
  DEV3D.H.aPlate = plate; DEV3D.H.aSlab = slab;

  /* BIS Advance: beyaz kasalı tablet, ekranın çevresinde geniş mavi çerçeve (altta Medtronic yazısı), üstte kamera ve klips;
     beyaz geniş kaide üzerinde metal sütun. Ekran: solda dikey simge çubuğu, üstte durum çubuğu, ortada DSA ve EEG,
     sağda SQI/EMG göstergesi, büyük pembe BIS ve SR/EMG/zamanlayıcı kutuları. */
  const BIS_LIFT = .09;
  DEV3D.model('bis-advance', {
    type: 'monitor', w: .3, h: .215, d: .035, body: 0xF4F6F7, bezel: 0x1E5BB8, mount: 'pedestal',
    screenMargin: [.023, .022, .023, .039], led: false,
    screen: {bg: '#05080B', layout: [
      /* Üst durum çubuğu */
      {t: 'box', x: 0, y: 0, w: 1, h: .075, fill: '#1B2026'},
      {t: 'icon', g: 'menu', x: .012, y: .012, w: .04, h: .05, c: '#9AA8B0'},
      {t: 'box', x: .52, y: .015, w: .17, h: .045, fill: '#3A4148', r: .022},
      {t: 'box', x: .575, y: .017, w: .06, h: .041, fill: '#5B6670', r: .02}, {t: 'icon', g: 'pause', x: .59, y: .02, w: .03, h: .035, c: '#F4F6F7'},
      {t: 'text', txt: 'BIS™ · Adult', x: .7, y: .005, w: .14, h: .065, c: '#9AA8B0', s: .026, wt: 600},
      {t: 'icon', g: 'bell', x: .85, y: .016, w: .03, h: .044, c: '#9AA8B0'}, {t: 'text', txt: '10:42', x: .88, y: .005, w: .06, h: .065, c: '#C9D0D5', s: .028, wt: 600},
      {t: 'icon', g: 'battery', x: .945, y: .018, w: .045, h: .04, c: '#2BD24A'},
      /* Sol simge çubuğu */
      {t: 'box', x: 0, y: .075, w: .085, h: .925, fill: '#0E1216'},
      ...[['menu', 'Menu'], ['bell', 'Alarms'], ['sd', 'Events'], ['gear', 'Setup'], ['play', 'Review'], ['home', 'Layout']].flatMap(([gl, lb], k) => [
        {t: 'button', x: .02, y: .1 + k * .148, w: .045, h: .075, fill: '#3A4148', r: .04, g: gl, c: '#C9D0D5'},
        {t: 'text', txt: lb, x: 0, y: .178 + k * .148, w: .085, h: .03, c: '#7D8A93', s: .019, wt: 600, al: 'c'}]),
      /* DSA (soldan dolmaya başlamış) */
      {t: 'box', x: .095, y: .085, w: .55, h: .41, fill: '#000', stroke: '#2A3138', lw: .003},
      {t: 'text', txt: 'DSA', x: .1, y: .09, w: .1, h: .04, c: '#9AA8B0', s: .024, wt: 700},
      {t: 'box', x: .17, y: .1, w: .1, h: .018, fill: '#E8323C'}, {t: 'box', x: .27, y: .1, w: .06, h: .018, fill: '#F2C531'}, {t: 'box', x: .33, y: .1, w: .06, h: .018, fill: '#4FD1E8'},
      {t: 'dsa', x: .1, y: .14, w: .34, h: .3, yl: ['30', 'Hz', '0'], cols: 70, rows: 20},
      {t: 'text', txt: '10:30', x: .16, y: .45, w: .08, h: .035, c: '#7D8A93', s: .02, wt: 600}, {t: 'text', txt: '10:36', x: .32, y: .45, w: .08, h: .035, c: '#7D8A93', s: .02, wt: 600}, {t: 'text', txt: '10:42', x: .56, y: .45, w: .08, h: .035, c: '#7D8A93', s: .02, wt: 600},
      /* EEG */
      {t: 'box', x: .095, y: .505, w: .55, h: .44, fill: '#000', stroke: '#2A3138', lw: .003},
      {t: 'text', txt: 'EEG', x: .1, y: .51, w: .1, h: .04, c: '#9AA8B0', s: .024, wt: 700}, {t: 'text', txt: '50 µV', x: .5, y: .51, w: .14, h: .04, c: '#7D8A93', s: .022, wt: 600, al: 'r'},
      {t: 'wave', k: 'eeg', x: .11, y: .56, w: .52, h: .36, c: '#7FD39A', amp: .32, mid: .5, span: 3.5, grid: 'rgba(255,255,255,.06)'},
      /* Sağ sütun: SQI çubukları ve EMG */
      {t: 'box', x: .655, y: .085, w: .34, h: .14, stroke: '#2A3138', lw: .003},
      {t: 'text', txt: 'SQI', x: .66, y: .09, w: .08, h: .035, c: '#9AA8B0', s: .02, wt: 700}, {t: 'text', txt: 'EMG', x: .86, y: .09, w: .08, h: .035, c: '#9AA8B0', s: .02, wt: 700},
      {t: 'box', x: .885, y: .13, w: .035, h: .08, fill: '#E39B3A', r: .006}, {t: 'box', x: .935, y: .12, w: .018, h: .095, stroke: '#9AA8B0', lw: .003}, {t: 'box', x: .937, y: .175, w: .014, h: .038, fill: '#C9D0D5'},
      /* BIS */
      {t: 'box', x: .655, y: .235, w: .34, h: .3, stroke: '#2A3138', lw: .003},
      {t: 'text', txt: 'BIS', x: .66, y: .24, w: .1, h: .045, c: '#E85BC8', s: .028, wt: 700},
      {t: 'text', txt: '45', x: .655, y: .27, w: .34, h: .26, c: '#E85BC8', s: .24, wt: 500, al: 'c'},
      /* SR · zamanlayıcı, EMG · BC */
      {t: 'box', x: .655, y: .545, w: .34, h: .19, stroke: '#2A3138', lw: .003},
      {t: 'text', txt: 'SR %', x: .66, y: .555, w: .1, h: .04, c: '#9AA8B0', s: .021, wt: 600}, {t: 'text', txt: 'Timer', x: .84, y: .555, w: .1, h: .04, c: '#9AA8B0', s: .021, wt: 600},
      {t: 'text', txt: '0', x: .665, y: .6, w: .12, h: .11, c: '#E6EEF2', s: .075, wt: 600}, {t: 'text', txt: '00:57', x: .8, y: .6, w: .19, h: .11, c: '#E6EEF2', s: .065, wt: 600, al: 'r'},
      {t: 'box', x: .655, y: .745, w: .34, h: .2, stroke: '#2A3138', lw: .003},
      {t: 'text', txt: 'EMG dB', x: .66, y: .755, w: .12, h: .04, c: '#9AA8B0', s: .021, wt: 600}, {t: 'text', txt: 'BC /min', x: .84, y: .755, w: .12, h: .04, c: '#E85BC8', s: .021, wt: 600},
      {t: 'text', txt: '32', x: .665, y: .8, w: .12, h: .11, c: '#E6EEF2', s: .075, wt: 600}, {t: 'text', txt: '0', x: .84, y: .8, w: .14, h: .11, c: '#E85BC8', s: .075, wt: 600, al: 'r'}
    ], draw(g, t, {W, H}) {
      /* SQI sinyal kalitesi çubukları (yükselen yeşil) */
      for (let k = 0; k < 5; k++) { g.fillStyle = k < 4 ? '#2BD24A' : '#3A4148'; const bh = H * (.025 + k * .014); g.fillRect(W * (.67 + k * .028), H * .215 - bh, W * .02, bh); }
    }},
    extra(g, {body, w, h, d, elev, parts}) {
      /* Kaide sütunu: monitörü fotoğraftaki yüksekliğe kaldır */
      const L = BIS_LIFT; body.position.y += L; elev += L;
      parts.forEach(p => { if (p.key === 'screen') p.at.y += L; });
      put(g, cyl(.022, .024, elev - .015, M.metal(0xBFC6CB, .25)), 0, .015 + (elev - .015) / 2, -d * .2);
      put(g, rbox(.08, .05, .03, .01, M.plastic(0xE9EEF1)), 0, elev + .03, -d / 2 - .012);
      /* Mavi çerçeve, Medtronic yazısı, kamera ve üst klips */
      put(body, plate(w - .02, h - .02, .002, .014, M.color(0x1E5BB8, .35)), 0, 0, d / 2 + .0005);
      put(body, decal(.07, .012, (c, W, Hh) => { c.clearRect(0, 0, W, Hh); c.fillStyle = '#F4F6F7'; c.font = `700 ${Math.round(Hh * .8)}px "Archivo", Arial, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Medtronic', W / 2, Hh / 2); }), 0, -h / 2 + .0245, d / 2 + .0018);
      put(body, cyl(.0025, .0025, .002, M.matte(0x0B0F12, .2)), 0, h / 2 - .016, d / 2 + .0016, Math.PI / 2);
      put(body, rbox(.06, .016, .02, .006, M.plastic(0xF4F6F7)), 0, h / 2 + .006, -.002);
      /* BISx modülü sol yanda, kablo sensöre */
      const bisx = rbox(.05, .11, .04, .012, M.plastic(0xF4F6F7)); put(g, bisx, -w / 2 - .035, elev + h * .55, .0);
      put(g, box(.05, .05, .002, M.color(0x1E5BB8)), -w / 2 - .035, elev + h * .45, .021);
      const top = V3(-w / 2 - .035, elev + h * .55 + .055, 0);
      g.add(tube([top, top.clone().add(V3(0, .05, 0)), V3(-w / 2 - .06, elev + h + .02, .02), V3(-w / 2 - .09, elev * .5, .08), V3(-w / 2 + .02, .01, .16)], .003, M.plastic(0xE9EEF1)));
      const s = sensorTip('eeg'); s.position.set(-w / 2 + .08, .004, .17); g.add(s);
      parts.push({key: 'bisx', at: V3(-w / 2 - .035, elev + h * .55, .03)}, {key: 'sensor', at: V3(-w / 2 + .08, .02, .17)});
    }
  });
  DEV3D.partText('bisx', {tr: ['BISx modülü', 'Sensörden gelen EEG sinyalini işleyerek monitöre ileten arayüz birimidir.'], en: ['BISx module', 'Interface unit that processes the EEG signal from the sensor and passes it to the monitor.'], es: ['Módulo BISx', 'Unidad de interfaz que procesa la señal de EEG del sensor y la transmite al monitor.']});
})();

/* ---------- A: ortak yardımcılar, 'a-host' kurucusu ve cihazlar ---------- */
(() => {
  if (!DEV3D) return;
  const {V3, M, rbox, box, cyl, sphere, tube, put, makeScreen, decal, sensorTip, nameplate} = DEV3D.H;
  const plate = DEV3D.H.aPlate, slab = DEV3D.H.aSlab;
  const T = DEV3D.partText;

  /* Düz yazı/logo bandı (saydam zemin) */
  const text = (s, w, h, ink = '#1B2328', wt = 700, align = 'left', fnt = '"Archivo", Arial, sans-serif') => decal(w, h, (g, W, Hh) => {
    g.clearRect(0, 0, W, Hh); g.fillStyle = ink; g.font = `${wt} ${Math.round(Hh * .7)}px ${fnt}`; g.textBaseline = 'middle';
    g.textAlign = align; g.fillText(s, align === 'center' ? W / 2 : align === 'right' ? W - 4 : 4, Hh / 2);
  });
  /* Kablo: noktalar arası yumuşak eğri (dünya koordinatı) */
  const cable = (g, pts, r = .003, c = 0x2E363C) => g.add(tube(pts.map(p => Array.isArray(p) ? V3(...p) : p), r, M.matte(c)));

  /* Sensörler (masada düz yatar, +x yönünde uzanır; bağlantı ucu x = 0) */
  function aSensor(kind) {
    const s = new THREE.Group();
    const pad = (x, z, r, rim, core = 0xF7F8F9) => { const a = cyl(r, r, .002, M.plastic(rim)); a.position.set(x, .001, z); s.add(a); const b = cyl(r * .72, r * .72, .0026, M.plastic(core)); b.position.set(x, .0016, z); s.add(b); };
    if (kind === 'entropy') {
      /* İnce şerit üzerinde üç yuvarlak elektrot, turuncu kenarlı */
      s.add(put(new THREE.Group(), box(.03, .004, .012, M.plastic(0xF4F6F7)), .015, .002, 0));
      [[.05, 0, .02], [.1, .01, .022], [.15, .0, .022]].forEach(([x, z, r]) => pad(x, z, r, 0xE0533A));
      s.add(put(new THREE.Group(), box(.13, .0012, .006, M.clear(0xE6EDF0, .8)), .095, .0008, .004));
    } else if (kind === 'eeg4') {
      /* Dört elektrotlu alın şeridi (iki taraflı) */
      s.add(put(new THREE.Group(), box(.03, .005, .016, M.plastic(0x2B3238)), .015, .0025, 0));
      s.add(put(new THREE.Group(), box(.17, .0015, .022, M.plastic(0xF2F5F7)), .115, .001, 0));
      [.05, .09, .14, .18].forEach(x => pad(x, 0, .011, 0x6FA8DC));
    } else if (kind === 'nirs') {
      /* Oval alın pedi */
      const p = cyl(.025, .025, .003, M.plastic(0xF4F6F7), 40); p.scale.set(1.5, 1, 1); p.position.set(.04, .0015, 0); s.add(p);
      const w = box(.03, .0035, .012, M.matte(0x2B3238)); w.position.set(.042, .003, 0); s.add(w);
      s.add(put(new THREE.Group(), box(.02, .004, .01, M.plastic(0xE9EEF1)), .01, .002, 0));
    } else if (kind === 'gefinger') {
      /* Gri, kanatlı parmak klipsi */
      const c = M.matte(0x7D8794, .55);
      s.add(put(new THREE.Group(), rbox(.05, .022, .024, .009, c), .045, .011, 0));
      [-1, 1].forEach(sd => s.add(put(new THREE.Group(), rbox(.016, .02, .012, .005, c), .03, .012, sd * .016)));
      s.add(put(new THREE.Group(), cyl(.006, .006, .03, M.matte(0x8E98A3)), .012, .01, 0, 0, 0, Math.PI / 2));
      s.add(put(new THREE.Group(), cyl(.006, .006, .002, M.color(0xBFD3E6)), .055, .0225, 0));
    } else if (kind === 'palm') {
      /* Üç elektrot, avuç içi için yan yana */
      [-.018, 0, .018].forEach(z => { const e = cyl(.011, .011, .002, M.plastic(0xF4F6F7)); e.position.set(.04, .001, z); s.add(e); const k = cyl(.004, .004, .004, M.metal()); k.position.set(.04, .003, z); s.add(k); });
    } else { const t = sensorTip(kind); if (t) s.add(t); }
    s.traverse(o => { o.castShadow = true; });
    return s;
  }
  /* İki taraflı pedler (sol/sağ alın) ve kabloları: from → iki ped */
  function nirsPair(g, from, x, z, parts, c = 0xE9EEF1) {
    [-1, 1].forEach(sd => {
      const p = aSensor('nirs'); p.position.set(x + sd * .075 - .04, 0, z); g.add(p);
      cable(g, [from, from.clone().add(V3(sd * .02, -.02, .04)), V3(x + sd * .06 - .06, .04, z - .03), V3(x + sd * .075 - .045, .004, z)], .0025, c);
    });
    parts.push({key: 'sensor', at: V3(x + .075, .02, z)});
  }
  DEV3D.H.aSensor = aSensor;

  /* ---------- 'a-host': ana monitör + yanında modül rafı, takılı ölçüm modülü, kablo ve sensör ----------
     cfg: {w,h,d, body, bezel, label, labelInk, screen, rack:{slots, index, mw, mh, md, body, others, label, ports, portColors, face},
           sensor: aSensor türü, sensorAt:[x,z], extra(g, ctx)} */
  DEV3D.register('a-host', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const w = cfg.w || .36, h = cfg.h || .27, d = cfg.d || .12, elev = .07;
    /* Ayak + monitör gövdesi */
    put(g, rbox(w * .55, .02, d * 1.3, .008, M.matte(0x3A4148)), 0, .01, -d * .1);
    put(g, rbox(w * .2, elev, d * .5, .01, M.matte(0x4A535B)), 0, elev / 2 + .01, -d * .2);
    const body = new THREE.Group(); body.position.y = elev + h / 2; g.add(body);
    body.add(rbox(w, h, d, .016, M.plastic(cfg.body || 0xE6EAEC)));
    const sw = w * .86, sh = h * .78, sy = h * .03;
    put(body, rbox(sw + .014, sh + .014, .006, .004, M.matte(cfg.bezel || 0x1B2126)), 0, sy, d / 2);
    const scr = makeScreen(sw, sh, cfg.screen || {}); put(body, scr.mesh, 0, sy, d / 2 + .0035); screens.push(scr);
    parts.push({key: 'screen', at: V3(0, elev + h / 2 + sy, d / 2 + .01)});
    if (cfg.label) put(body, text(cfg.label, .1, .014, cfg.labelInk || '#4A555E'), -w / 2 + .07, -h / 2 + (h - sh) / 4, d / 2 + .001);
    const led = box(.05, .006, .004, M.led(0x4FD1BE)); put(body, led, w * .3, h / 2 - .001, d * .1); parts.push({key: 'alarm', at: V3(w * .3, elev + h + .005, d * .1)});
    parts.push({key: 'mount', at: V3(w * .2, .03, d * .4)});
    /* Modül rafı (sol yanda) */
    const R = cfg.rack || {}, n = R.slots || 3, mw = R.mw || .036, mh = R.mh || h * .82, md = R.md || d * .85, idx = R.index ?? 0;
    const fw = n * mw + .012, fx = -w / 2 - fw / 2 - .004, fy = elev + h / 2;
    put(g, rbox(fw, mh + .016, md + .01, .005, M.matte(0x3A4148)), fx, fy, -.004);
    let port = null;
    for (let k = 0; k < n; k++) {
      const main = k === idx, cx = fx - fw / 2 + .006 + mw * (k + .5);
      put(g, rbox(mw - .003, mh, md, .004, M.plastic(main ? (R.body || 0xF2F4F5) : ((R.others || [])[k] ?? 0xCDD3D7))), cx, fy, .002);
      if (!main) continue;
      if (R.face) put(g, box(mw - .008, mh * .9, .001, M.color(R.face)), cx, fy, md / 2 + .0025);
      const lb = text(R.label || '', mh * .5, mw * .45, R.labelInk || '#2B3238'); put(g, lb, cx, fy + mh * .18, md / 2 + .003, 0, 0, Math.PI / 2);
      put(g, box(.01, .004, .002, M.led(0x2E9E58)), cx, fy + mh * .44, md / 2 + .003);
      const np = R.ports || 1, pc = R.portColors || [0x2F7DD1];
      for (let p = 0; p < np; p++) { const pr = cyl(.009, .009, .01, M.color(pc[p % pc.length], .4), 20); put(g, pr, cx, fy - mh * (.15 + p * .14), md / 2 + .006, Math.PI / 2); }
      put(g, box(mw * .6, .006, .006, M.matte(0x5B6670)), cx, fy - mh / 2 + .008, md / 2 + .003);
      port = V3(cx, fy - mh * .15, md / 2 + .012);
      parts.push({key: 'module', at: V3(cx, fy + mh * .25, md / 2 + .01)}, {key: 'port', at: port.clone().add(V3(0, 0, .01))}, {key: 'led', at: V3(cx, fy + mh * .44, md / 2 + .01)}, {key: 'latch', at: V3(cx, fy - mh / 2 + .008, md / 2 + .01)});
    }
    /* Kablo ve sensör */
    if (cfg.sensor && port) {
      const [sx, sz] = cfg.sensorAt || [fx + .02, d / 2 + .14];
      const s = aSensor(cfg.sensor); s.position.set(sx, 0, sz); s.rotation.y = cfg.sensorRot || 0; g.add(s);
      cable(g, [port, port.clone().add(V3(0, -.01, .05)), V3((port.x + sx) / 2 - .03, .06, (port.z + sz) / 2), V3(sx - .03, .006, sz), V3(sx, .004, sz)], .0032, cfg.cable || 0x2E363C);
      parts.push({key: cfg.sensorKey || 'sensor', at: V3(sx + .08, .02, sz)});
    }
    if (cfg.extra) cfg.extra(g, {body, w, h, d, elev, parts, screens, port, fx, fy});
    return {group: g, parts, screens};
  });

  /* ---------- 'a-root': siyah parlak gövdeli dikey ekranlı platform + solda yuvaya takılı el monitörü,
     önde kablo üzerinde beyaz ara modül (pod) ve sensör(ler) ----------
     cfg: {screen, podLabel, sensor:'eeg4'|'nirs2', podColor} */
  DEV3D.register('a-root', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    /* Ölçüler üretici görseline göre: gövde neredeyse kare, sağ yarıda dikey (≈ 0,64 en/boy) ekran */
    const w = .33, h = .31, d = .1, elev = .015;
    const body = new THREE.Group(); body.position.y = elev + h / 2; g.add(body);
    body.add(rbox(w, h, d, .014, M.plastic(0x101316, .2)));
    put(g, box(w * .9, .015, d * .9, M.matte(0x2B3238)), 0, .0075, 0);
    /* Sağda dikey ekran */
    const sw = .168, sh = .262, sx = w / 2 - .016 - sw / 2;
    const scr = makeScreen(sw, sh, cfg.screen || {}, 768); put(body, scr.mesh, sx, -.004, d / 2 + .0015); screens.push(scr);
    put(body, text('Masimo', .045, .009, '#E7ECEF', 700, 'right'), w / 2 - .035, h / 2 - .01, d / 2 + .001);
    put(body, text('Root', .03, .008, '#8C949B', 500, 'right'), w / 2 - .02, -h / 2 + .012, d / 2 + .001);
    parts.push({key: 'screen', at: V3(sx, elev + h / 2, d / 2 + .01)});
    /* Solda yuvadaki el monitörü (gümüş çerçeveli; ekranında vücut şeması) */
    const hx = -w / 2 + .072, hh = .28;
    put(body, rbox(.108, hh, .03, .02, M.plastic(0xE4E8EA, .3)), hx, -.006, d / 2 + .01);
    put(body, rbox(.088, .25, .004, .016, M.plastic(0x15191C, .2)), hx, -.004, d / 2 + .026);
    const hs = makeScreen(.07, .118, {bg: '#05070C', layout: [], draw(c, t, {W, H}) {
      const cx = W / 2, glow = .75 + .25 * Math.sin(t * 1.2);
      c.fillStyle = '#1C2533'; c.strokeStyle = '#3B4A5E'; c.lineWidth = W * .01;
      c.beginPath(); c.ellipse(cx, H * .14, W * .13, H * .085, 0, 0, 7); c.fill(); c.stroke();
      c.beginPath(); c.moveTo(cx - W * .07, H * .22); c.lineTo(cx - W * .42, H * .32); c.lineTo(cx - W * .46, H * .75); c.lineTo(cx - W * .3, H * .76); c.lineTo(cx - W * .26, H * .42);
      c.lineTo(cx - W * .24, H * 1.02); c.lineTo(cx + W * .24, H * 1.02); c.lineTo(cx + W * .26, H * .42); c.lineTo(cx + W * .3, H * .76); c.lineTo(cx + W * .46, H * .75); c.lineTo(cx + W * .42, H * .32); c.lineTo(cx + W * .07, H * .22); c.closePath(); c.fill(); c.stroke();
      c.globalAlpha = glow; c.fillStyle = '#8BE03A';
      c.beginPath(); c.ellipse(cx, H * .13, W * .1, H * .06, 0, 0, 7); c.fill();
      [-1, 1].forEach(sd => { c.beginPath(); c.ellipse(cx + sd * W * .1, H * .42, W * .085, H * .1, sd * .15, 0, 7); c.fill(); });
      c.globalAlpha = 1; c.strokeStyle = '#4A5568'; c.lineWidth = W * .008; for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(cx + (k % 2 ? 1 : -1) * W * .07, H * (.66 + k * .05), W * .08, 0, Math.PI); c.stroke(); }
    }}, 384);
    put(body, hs.mesh, hx, .036, d / 2 + .0285); screens.push(hs);
    put(body, rbox(.034, .006, .002, .002, M.led(0x6F9BFF)), hx, -.042, d / 2 + .0285);
    [-.024, 0, .024].forEach(x => { const b = cyl(.0058, .0058, .003, M.matte(0x2B3238)); put(body, b, hx + x, -.062, d / 2 + .029, Math.PI / 2); });
    put(body, text('Radical-7', .04, .007, '#C9D0D5', 600, 'center'), hx, -.08, d / 2 + .0285);
    put(body, box(.03, .014, .006, M.color(0xA51E2E, .4)), hx, -hh / 2 + .008, d / 2 + .028);
    parts.push({key: 'a-radical', at: V3(hx, elev + h / 2 + .03, d / 2 + .04)});
    /* Yan kablo çıkışı → pod → sensör */
    const out = V3(w / 2 + .006, elev + .04, 0);
    put(g, cyl(.007, .007, .012, M.color(0x2B3238), 20), out.x, out.y, out.z, 0, 0, Math.PI / 2);
    parts.push({key: 'port', at: out.clone().add(V3(.012, 0, 0))});
    const pod = V3(.02, .015, d / 2 + .07);
    cable(g, [out, out.clone().add(V3(.04, -.01, .01)), V3(w / 2 + .04, .012, d / 2 + .05), V3(pod.x + .06, .014, pod.z)], .0032, 0xE9EEF1);
    put(g, rbox(.09, .026, .032, .012, M.plastic(cfg.podColor || 0xF4F6F7, .35)), pod.x, pod.y, pod.z);
    put(g, text(cfg.podLabel || '', .05, .008, '#3A4148', 600), pod.x + .006, pod.y + .004, pod.z + .0165);
    put(g, text('M', .008, .008, '#C0283B', 900), pod.x - .028, pod.y + .004, pod.z + .0165);
    parts.push({key: 'a-pod', at: pod.clone().add(V3(0, .02, 0))});
    const from = V3(pod.x - .045, .014, pod.z);
    if (cfg.sensor === 'nirs2') nirsPair(g, from, -.12, pod.z + .07, parts);
    else {
      cable(g, [from, from.clone().add(V3(-.03, 0, 0)), V3(-.11, .006, pod.z + .05), V3(-.12, .004, pod.z + .08)], .0028, 0xE9EEF1);
      const s = aSensor(cfg.sensor || 'eeg4'); s.position.set(-.12, 0, pod.z + .08); s.rotation.y = .25; g.add(s);
      parts.push({key: 'sensor', at: V3(-.03, .02, pod.z + .06)});
    }
    return {group: g, parts, screens};
  });
  T('a-radical', {tr: ['Yuvaya takılı el monitörü', 'Platforma yerleştirilen, kendi ekranı olan çıkarılabilir monitördür; yuvadan çıkarılınca taşınabilir olarak kullanılabilir.'], en: ['Docked handheld monitor', 'Removable monitor with its own display, seated in the platform dock; it can be used as a portable unit when undocked.'], es: ['Monitor portátil acoplado', 'Monitor extraíble con pantalla propia, colocado en la base de la plataforma; puede usarse como unidad portátil al desacoplarlo.']});
  T('a-pod', {tr: ['Ara modül', 'Sensör kablosu ile platform arasında, sensörden gelen sinyali işleyip platforma ileten birimdir.'], en: ['Inline module', 'Unit between the sensor cable and the platform that processes the sensor signal and passes it to the platform.'], es: ['Módulo intermedio', 'Unidad entre el cable del sensor y la plataforma que procesa la señal del sensor y la transmite a la plataforma.']});

  /* GE Entropy: CARESCAPE tipi ana monitörün modül rafında E-Entropy modülü; turuncu kenarlı üç elektrotlu alın sensörü */
  DEV3D.model('ge-entropy', {
    type: 'a-host', w: .36, h: .26, d: .11, body: 0xE3E7EA, label: 'CARESCAPE', theta: -.6,
    rack: {slots: 3, index: 0, label: 'E-ENTROPY', mw: .042, ports: 1, portColors: [0xE0533A], others: [0xD5DADE, 0xD5DADE]},
    sensor: 'entropy', sensorAt: [-.27, .16], cable: 0xE9EEF1,
    screen: {title: 'ENTROPY', accent: '#8AA8FF', waves: [{k: 'ecg', c: '#4FD18F', l: 'II'}, {k: 'pleth', c: '#5BB7DE', l: 'SpO₂'}, {k: 'eeg', c: '#B9C7FF', l: 'EEG'}],
      params: [{l: 'SE', v: 47, c: '#B9C7FF', big: true, live: true}, {l: 'RE', v: 52, c: '#8AA8FF', live: true}, {l: 'BSR', v: '0', u: '%', c: '#F2C531'}, {l: 'HR', v: '68', u: '/min', c: '#4FD18F'}]}
  });

  /* CONOX: beyaz kenarlı, siyah cam ön yüzlü yatay monitör; alın EEG sensörü */
  DEV3D.model('conox', {
    type: 'monitor', w: .24, h: .17, d: .045, body: 0xF2F4F5, bezel: 0x05090C, mount: 'feet', led: false,
    screenMargin: [.035, .025, .035, .04],
    /* Ekran düzeni üretici görselindeki gibi: üstte SQI/EMG/BSR/qNOX kutuları, sağda büyük qCON, ortada spektrogram,
       altta qCON/qNOX/BSR/EMG trendi, sağ altta sensör kontrolü, DSA ve ayar düğmeleri, en altta durum çubuğu */
    screen: {bg: '#0E1A26', layout: [
      {t: 'tile', style: 'band', x: .006, y: .02, w: .17, h: .14, l: 'SQI', v: 100, c: '#2BD24A', live: true},
      {t: 'tile', style: 'band', x: .184, y: .02, w: .17, h: .14, l: 'EMG', v: 12, c: '#3FA3DC', live: true},
      {t: 'tile', style: 'band', x: .36, y: .02, w: .17, h: .14, l: 'BSR', v: 0, c: '#E8323C'},
      {t: 'tile', style: 'band', x: .535, y: .02, w: .17, h: .14, l: 'qNOX', v: 44, c: '#F4E21C', live: true},
      {t: 'box', x: .712, y: .02, w: .278, h: .375, fill: '#0B1520', stroke: '#E9EEF1', r: .02},
      {t: 'box', x: .714, y: .023, w: .274, h: .095, fill: '#F4F6F7', r: .016},
      {t: 'icon', g: 'bell', x: .72, y: .03, w: .05, h: .08, c: '#1A2026'},
      {t: 'text', txt: 'qCON', x: .77, y: .028, w: .2, h: .085, c: '#11181C', s: .075, wt: 800},
      {t: 'text', txt: '48', x: .712, y: .13, w: .278, h: .26, c: '#FFFFFF', s: .25, wt: 800, al: 'c'},
      {t: 'text', txt: '4 s', x: .69, y: .425, w: .06, h: .06, c: '#E6EEF2', s: .04, al: 'c'},
      {t: 'box', x: .76, y: .43, w: .06, h: .05, stroke: '#E8323C', r: .02}, {t: 'text', txt: '1', x: .76, y: .43, w: .06, h: .05, c: '#E8323C', s: .035, al: 'c'},
      {t: 'box', x: .84, y: .43, w: .06, h: .05, stroke: '#F4E21C', r: .02}, {t: 'text', txt: '1', x: .84, y: .43, w: .06, h: .05, c: '#F4E21C', s: .035, al: 'c'},
      {t: 'box', x: .92, y: .43, w: .05, h: .05, stroke: '#2BD24A', r: .02}, {t: 'text', txt: '1', x: .92, y: .43, w: .05, h: .05, c: '#2BD24A', s: .035, al: 'c'},
      {t: 'dsa', x: .006, y: .18, w: .67, h: .32, yl: ['45', 'Hz', '1'], scale: true},
      {t: 'trend', x: .006, y: .51, w: .7, h: .32, max: 100, band: [20, 80], yt: [0, 20, 40, 60, 80, 100], xt: ['12:01', '12:09', '12:16', '12:24'],
        lines: [{c: '#3FA3DC', base: 38, amp: 8, seed: 3, shape: 'induction'}, {c: '#E8323C', base: 2, amp: 1, seed: 5, spike: .12, spikeH: 22}, {c: '#F4E21C', base: 47, amp: 4, seed: 1, shape: 'induction'}, {c: '#FFFFFF', base: 44, amp: 6, seed: 2, shape: 'induction'}],
        legend: [['qCON', '#FFFFFF'], ['qNOX', '#F4E21C'], ['BSR', '#E8323C'], ['EMG', '#3FA3DC']]},
      {t: 'button', x: .73, y: .52, w: .255, h: .16, txt: '? ? ?', c: '#E6EEF2', s: .045},
      {t: 'box', x: .73, y: .72, w: .115, h: .16, stroke: 'rgba(255,255,255,.75)', r: .02}, {t: 'heat', x: .755, y: .75, w: .065, h: .1, seed: 2},
      {t: 'button', x: .865, y: .72, w: .12, h: .16, g: 'gear', c: '#E6EEF2'},
      {t: 'box', x: 0, y: .9, w: 1, h: .1, fill: '#3A4148'},
      {t: 'text', txt: 'Status: Reading OK', x: .04, y: .9, w: .3, h: .1, c: '#F4F6F7', s: .04},
      {t: 'text', txt: 'Elapsed time: 00:30:25', x: .38, y: .9, w: .3, h: .1, c: '#F4F6F7', s: .04},
      {t: 'text', txt: 'Time: 12:30', x: .68, y: .9, w: .17, h: .1, c: '#F4F6F7', s: .04, al: 'r'},
      {t: 'icon', g: 'bt', x: .87, y: .91, w: .03, h: .08, c: '#2F7DE1'}, {t: 'icon', g: 'battery', x: .92, y: .91, w: .06, h: .08, c: '#2BD24A'}
    ]},
    extra(g, {w, h, d, elev, parts}) {
      const y = elev + h / 2;
      put(g, box(w * .5, .006, .09, M.matte(0x3A4148)), 0, .003, -.03); put(g, box(.05, .12, .008, M.matte(0x4A535B)), 0, .07, -d / 2 - .03, -.35);
      put(g, rbox(w - .008, h - .008, .003, .014, M.matte(0x0B0F12, .25)), 0, y, d / 2 + .0006);
      put(g, text('conox', .07, .016, '#F5F7F8', 300, 'center'), 0, y - h / 2 + .02, d / 2 + .0025);
      put(g, text('FRESENIUS KABI', .06, .008, '#F5F7F8', 700, 'right'), w / 2 - .045, y + h / 2 - .013, d / 2 + .0025);
      put(g, cyl(.003, .003, .002, M.led(0x3E8BFF)), -w / 2 + .016, y - .005, d / 2 + .002, Math.PI / 2);
      put(g, box(.006, .008, .004, M.color(0x1E4E8C)), w / 2 + .001, y + .02, 0);
      parts.push({key: 'led', at: V3(-w / 2 + .016, y - .005, d / 2 + .01)});
      const pt = V3(w / 2 + .004, y - .03, 0); put(g, cyl(.007, .007, .01, M.color(0x2B3238), 20), pt.x, pt.y, pt.z, 0, 0, Math.PI / 2);
      parts.push({key: 'port', at: pt.clone().add(V3(.01, 0, 0))});
      cable(g, [pt, pt.clone().add(V3(.03, -.01, .01)), V3(w / 2 + .03, .03, .08), V3(w / 2 - .04, .005, .15), V3(.02, .004, .17)], .0024, 0x2E363C);
      const s = sensorTip('eeg'); s.position.set(-.04, .003, .17); g.add(s);
      parts.push({key: 'sensor', at: V3(-.04, .02, .17)});
    }
  });
  /* Masimo SedLine: Root platformu, yan kablodan SedLine ara modülü ve dört elektrotlu alın sensörü */
  /* Root ekranı ortak parçaları (dikey ekran): üst durum çubuğu, rainbow pleth + SpO₂ trendi, alt zaman çizelgesi ve araç çubuğu */
  const rootTop = (spo2) => [
    {t: 'icon', g: 'bell', x: .02, y: .006, w: .07, h: .034, fill: '#3A4148', r: .006, c: '#9AA8B0'},
    {t: 'icon', g: 'alarm', x: .1, y: .006, w: .07, h: .034, fill: '#DDE2E6', r: .006, c: '#3A4148'},
    {t: 'box', x: .44, y: .013, w: .13, h: .02, fill: '#3E7BD6', r: .01},
    {t: 'icon', g: 'bt', x: .6, y: .012, w: .03, h: .022, c: '#3E7BD6'}, {t: 'icon', g: 'wifi', x: .64, y: .01, w: .04, h: .024, c: '#2BD24A'},
    {t: 'icon', g: 'battery', x: .72, y: .013, w: .06, h: .02, c: '#C9D0D5'},
    {t: 'text', txt: '7:30 PM', x: .78, y: .006, w: .21, h: .034, c: '#E6EEF2', s: .017, wt: 600, al: 'r'},
    {t: 'box', x: .015, y: .055, w: .97, h: .022, fill: '#20262E'},
    {t: 'text', txt: 'APOD', x: .78, y: .055, w: .2, h: .022, c: '#9AA8B0', s: .012, wt: 700, al: 'r'},
    {t: 'box', x: .015, y: .078, w: .97, h: .078, fill: '#12294A'},
    {t: 'wave', k: 'pleth', x: .02, y: .08, w: .96, h: .074, c: '#F4F6F7', amp: .55, mid: .62, span: 9, lw: .003},
    {t: 'box', x: .015, y: .158, w: .97, h: .088, fill: '#05080B', stroke: '#20262E', lw: .002},
    {t: 'text', txt: '100', x: .02, y: .162, w: .06, h: .016, c: '#7D8A93', s: .01}, {t: 'text', txt: '50', x: .02, y: .225, w: .06, h: .016, c: '#7D8A93', s: .01},
    {t: 'trend', x: .07, y: .162, w: .62, h: .08, max: 100, lines: [{c: '#F4F6F7', base: 88, amp: 2, seed: 4}]},
    {t: 'text', txt: String(spo2), x: .66, y: .162, w: .26, h: .08, c: '#FFFFFF', s: .068, wt: 600, al: 'r'},
    {t: 'text', txt: '%', x: .92, y: .17, w: .07, h: .02, c: '#C9D0D5', s: .012, wt: 600}, {t: 'text', txt: 'SpO₂', x: .92, y: .215, w: .07, h: .02, c: '#C9D0D5', s: .011, wt: 600}];
  const rootBottom = [
    {t: 'box', x: .015, y: .918, w: .97, h: .02, fill: '#20262E'},
    ...['06:44:42', '06:49:42', '06:54:42', '06:59:42'].map((s, k) => ({t: 'text', txt: s, x: .06 + k * .22, y: .918, w: .2, h: .02, c: '#7D8A93', s: .01, wt: 600})),
    {t: 'icon', g: 'arrow', x: .02, y: .955, w: .05, h: .035, c: '#C9D0D5'}, {t: 'icon', g: 'gear', x: .92, y: .955, w: .06, h: .038, c: '#E6EEF2'}];
  const rootParams = rows => rows.flatMap((row, r) => row.map(([v, l, c], k) => [
    {t: 'text', txt: v, x: .02 + k * .245, y: .262 + r * .048, w: .16, h: .044, c, s: .036, wt: 600},
    {t: 'text', txt: l, x: .02 + k * .245 + (String(v).length > 2 ? .125 : .09), y: .272 + r * .048, w: .1, h: .03, c, s: .01, wt: 600, pad: 0}]).flat());
  const rainbow = (g, W, H, y) => { const cs = ['#E8323C', '#F29A3A', '#F4E21C', '#2BD24A', '#3FA3DC', '#6F6FE8', '#B05BE0']; g.font = `600 ${Math.round(H * .013)}px "Archivo", Arial, sans-serif`; g.textBaseline = 'middle'; let x = W * .03; [...'rainbow'].forEach((ch, k) => { g.fillStyle = cs[k]; g.fillText(ch, x, H * y); x += g.measureText(ch).width + W * .006; }); };

  /* SedLine ekranı üretici görselindeki gibi: üstte rainbow pleth ve SpO₂, parametre satırları, altta SedLine bölümü:
     iki EEG kanalı, PSi trendi ve büyük sarı PSi, sol ve sağ yarıküre DSA */
  DEV3D.model('sedline', {
    type: 'a-root', podLabel: 'SedLine', sensor: 'eeg4',
    screen: {bg: '#000', layout: [
      ...rootTop(96),
      ...rootParams([[['74', 'PR', '#F4F6F7'], ['15', 'RRa', '#5BB7FF'], ['7.0', 'SpHb', '#F0353F'], ['1.0', 'SpMet', '#F4E21C']], [['20', 'PVi', '#F4F6F7'], ['1', 'SpCO', '#F29A3A'], ['4.0', 'Pi', '#F4F6F7'], ['18', 'SpOC', '#F4F6F7']]]),
      {t: 'box', x: .015, y: .365, w: .97, h: .022, fill: '#20262E'}, {t: 'text', txt: 'SedLine', x: .02, y: .365, w: .3, h: .022, c: '#C9D0D5', s: .012, wt: 700},
      {t: 'wave', k: 'eeg', x: .07, y: .39, w: .9, h: .036, c: '#B8A45A', amp: .5, mid: .5, span: 7, lw: .0022},
      {t: 'wave', k: 'eeg', x: .07, y: .426, w: .9, h: .036, c: '#B8A45A', amp: .5, mid: .5, span: 7.6, lw: .0022},
      {t: 'box', x: .015, y: .468, w: .97, h: .118, fill: '#05080B', stroke: '#20262E', lw: .002},
      {t: 'text', txt: '36', x: .74, y: .48, w: .18, h: .1, c: '#F4E21C', s: .075, wt: 600, al: 'r'},
      {t: 'text', txt: 'PSi', x: .92, y: .5, w: .07, h: .03, c: '#F4E21C', s: .012, wt: 700},
      {t: 'dsa', x: .07, y: .598, w: .84, h: .148, cols: 90, rows: 26},
      {t: 'dsa', x: .07, y: .758, w: .84, h: .148, cols: 90, rows: 26},
      {t: 'text', txt: 'L', x: .92, y: .65, w: .06, h: .03, c: '#C9D0D5', s: .014, wt: 700, al: 'c'}, {t: 'text', txt: 'R', x: .92, y: .81, w: .06, h: .03, c: '#C9D0D5', s: .014, wt: 700, al: 'c'},
      ...['30', '20', '10', '0'].flatMap((s, k) => [{t: 'text', txt: s, x: .01, y: .6 + k * .045, w: .06, h: .02, c: '#7D8A93', s: .01, al: 'r'}, {t: 'text', txt: s, x: .01, y: .76 + k * .045, w: .06, h: .02, c: '#7D8A93', s: .01, al: 'r'}]),
      ...rootBottom
    ], draw(g, t, {W, H}) {
      rainbow(g, W, H, .066);
      /* PSi trendi: sarı alan + çizgi, indüksiyonda düşüş (mavi bölge) */
      const x0 = W * .07, x1 = W * .77, yT = H * .478, yB = H * .58, val = u => u < .08 ? 90 : u < .14 ? 90 - 70 * (u - .08) / .06 : u < .2 ? 20 : u < .62 ? 30 + 4 * Math.sin(u * 40 + t * .05) : u < .7 ? 34 + 26 * (u - .62) / .08 : 62 + 6 * Math.sin(u * 30), Y = v => yB - (yB - yT) * v / 100;
      g.fillStyle = 'rgba(190,160,40,.75)'; g.beginPath(); g.moveTo(x0, Y(50)); for (let x = x0; x <= x1; x += 2) g.lineTo(x, Y(Math.max(50, val((x - x0) / (x1 - x0))))); g.lineTo(x1, Y(50)); g.fill();
      g.fillStyle = 'rgba(40,70,200,.85)'; g.beginPath(); g.moveTo(x0, Y(25)); for (let x = x0; x <= x1; x += 2) g.lineTo(x, Y(Math.min(25, val((x - x0) / (x1 - x0))))); g.lineTo(x1, Y(25)); g.fill();
      g.strokeStyle = '#F4E21C'; g.lineWidth = H * .0025; g.beginPath(); for (let x = x0; x <= x1; x += 2) { const y = Y(val((x - x0) / (x1 - x0))); x === x0 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.35)'; g.setLineDash([3, 3]); g.lineWidth = 1; [25, 50].forEach(v => { g.beginPath(); g.moveTo(x0, Y(v)); g.lineTo(x1, Y(v)); g.stroke(); }); g.setLineDash([]);
      /* DSA'da artefakt aralıkları (siyah dikey şeritler) */
      g.fillStyle = '#000'; [.08, .22, .5, .53, .76, .8, .86].forEach((u, k) => { const x = W * (.07 + .84 * u); g.fillRect(x, H * .598, W * (k % 3 ? .006 : .012), H * .148); g.fillRect(x, H * .758, W * (k % 3 ? .006 : .012), H * .148); });
    }}
  });

  /* Narcotrend Compact M: beyaz kare gövde, üstte ekran, altta EEG giriş soketi ve açma düğmesi */
  DEV3D.model('narcotrend', {
    type: 'monitor', w: .26, h: .26, d: .14, body: 0xF6F7F8, bezel: 0x0B0F12, led: false, elev: .02,
    /* Kare gövde, 4:3 ekran (üretici görselindeki oranlar) */
    screenMargin: [.0275, .0415, .0275, .064],
    /* Ekran üretici görselindeki gibi: mor üst çubuk, ızgaralı EEG, sağda Stadium/Index, altta A–F harfli Cerebrogramm,
       sağda EMG/BSR, en altta yedi gri yazılım tuşu */
    screen: {bg: '#000', layout: [
      {t: 'box', x: 0, y: 0, w: 1, h: .045, fill: '#2E2A7E'},
      {t: 'box', x: 0, y: .045, w: .79, h: .395, stroke: '#9AA3AA', lw: .003}, {t: 'box', x: .79, y: .045, w: .21, h: .395, stroke: '#9AA3AA', lw: .003},
      {t: 'box', x: 0, y: .44, w: .79, h: .455, stroke: '#9AA3AA', lw: .003}, {t: 'box', x: .79, y: .44, w: .21, h: .455, stroke: '#9AA3AA', lw: .003},
      {t: 'text', txt: 'EEG', x: 0, y: .05, w: .79, h: .04, c: '#E6EEF2', s: .028, wt: 600, al: 'c'},
      {t: 'wave', k: 'eeg', x: .01, y: .1, w: .77, h: .28, c: '#D9DEE2', amp: .08, mid: .5, span: 9, lw: .0022},
      {t: 'text', txt: '50µV', x: .005, y: .395, w: .1, h: .04, c: '#F4E21C', s: .025, wt: 700}, {t: 'text', txt: '1s', x: .075, y: .395, w: .06, h: .04, c: '#F4E21C', s: .025, wt: 700},
      {t: 'text', txt: '- OP -', x: .6, y: .395, w: .18, h: .04, c: '#F4E21C', s: .025, wt: 700, al: 'r'},
      {t: 'text', txt: 'Stadium / Index', x: .79, y: .065, w: .21, h: .04, c: '#E6EEF2', s: .026, wt: 700, al: 'c'},
      {t: 'text', txt: 'D', x: .8, y: .1, w: .12, h: .17, c: '#A8E4EC', s: .17, wt: 500},
      {t: 'text', txt: '1', x: .885, y: .19, w: .06, h: .08, c: '#A8E4EC', s: .07, wt: 500},
      {t: 'text', txt: '52', x: .8, y: .27, w: .19, h: .15, c: '#A8E4EC', s: .14, wt: 500, al: 'c'},
      {t: 'text', txt: 'Cerebrogramm', x: 0, y: .45, w: .79, h: .04, c: '#E6EEF2', s: .026, wt: 600, al: 'c'}, {t: 'text', txt: 'NI', x: .7, y: .45, w: .08, h: .04, c: '#E6EEF2', s: .024, wt: 600, al: 'r'},
      ...[['A', '#F4E21C'], ['B', '#A8E4EC'], ['C', '#5BC8E0'], ['D', '#2BD24A'], ['E', '#7FD34A'], ['F', '#E8323C']].map(([l, c], k) => ({t: 'text', txt: l, x: .005, y: .49 + k * .066, w: .04, h: .05, c, s: .032, wt: 700})),
      {t: 'trend', x: .05, y: .49, w: .62, h: .37, max: 100, lines: [{c: '#E8D23A', base: 50, amp: 5, seed: 2, shape: 'induction'}]},
      ...['11:40', '12:00', '12:20', '12:40', '13:00'].map((s, k) => ({t: 'text', txt: s, x: .04 + k * .135, y: .86, w: .1, h: .035, c: '#E6EEF2', s: .022, wt: 600})),
      ...[100, 80, 60, 40, 20].map((v, k) => ({t: 'text', txt: v, x: .67, y: .49 + k * .065, w: .06, h: .04, c: '#E6EEF2', s: .022, wt: 600, al: 'r'})),
      {t: 'text', txt: 'EMG', x: .795, y: .455, w: .1, h: .045, c: '#5BC8E0', s: .03, wt: 700}, {t: 'box', x: .8, y: .505, w: .1, h: .03, stroke: '#7D8A93', lw: .002},
      {t: 'text', txt: '0', x: .9, y: .46, w: .09, h: .07, c: '#5BC8E0', s: .06, wt: 600, al: 'r'},
      {t: 'text', txt: 'BSR', x: .795, y: .55, w: .1, h: .045, c: '#E8323C', s: .03, wt: 700}, {t: 'box', x: .8, y: .6, w: .1, h: .03, stroke: '#7D8A93', lw: .002},
      {t: 'text', txt: '0', x: .9, y: .555, w: .09, h: .07, c: '#E8323C', s: .06, wt: 600, al: 'r'},
      ...[['Diagramm-', 'wechsel'], ['Rückschau', ''], ['Elektroden-', 'test'], ['Marker', ''], ['Screenshot', ''], ['Vorgaben', ''], ['Messung', 'beenden']].flatMap(([a, b], k) => [
        {t: 'box', x: .004 + k * .1423, y: .905, w: .136, h: .09, fill: '#3A3F45', stroke: '#9AA3AA', lw: .002, r: .008},
        {t: 'text', txt: a, x: .004 + k * .1423, y: b ? .91 : .905, w: .136, h: b ? .04 : .09, c: '#F4F6F7', s: .024, wt: 700, al: 'c'},
        ...(b ? [{t: 'text', txt: b, x: .004 + k * .1423, y: .948, w: .136, h: .04, c: '#F4F6F7', s: .024, wt: 700, al: 'c'}] : [])])
    ], draw(g, t, {W, H}) {
      /* EEG ızgarası ve Cerebrogramm renk çubuğu */
      g.strokeStyle = 'rgba(255,255,255,.22)'; g.lineWidth = 1;
      for (let k = 1; k < 5; k++) { g.beginPath(); g.moveTo(W * .79 * k / 5, H * .045); g.lineTo(W * .79 * k / 5, H * .44); g.stroke(); }
      [.18, .31].forEach(y => { g.beginPath(); g.moveTo(0, H * y); g.lineTo(W * .79, H * y); g.stroke(); });
      g.strokeStyle = 'rgba(255,255,255,.12)'; for (let k = 0; k < 9; k++) { const y = H * (.5 + k * .04); g.beginPath(); g.moveTo(W * .05, y); g.lineTo(W * .67, y); g.stroke(); }
      ['#F4E21C', '#A8E4EC', '#5BC8E0', '#2BD24A', '#7FD34A', '#E8323C'].forEach((c, k) => { g.fillStyle = c; g.fillRect(W * .043, H * (.49 + k * .066), W * .005, H * .066); });
    }},
    extra(g, {w, h, d, elev, parts}) {
      const y = elev + h / 2, z = d / 2;
      put(g, text('Narco', .06, .022, '#2A2E7A', 600), -w / 2 + .055, y + h / 2 - .022, z + .001);
      put(g, box(.05, .016, .001, M.color(0x2A2E7A)), -w / 2 + .108, y + h / 2 - .022, z + .001);
      put(g, text('trend', .05, .016, '#FFFFFF', 700), -w / 2 + .108, y + h / 2 - .022, z + .0016);
      put(g, decal(.08, .02, (c, W, Hh) => { c.strokeStyle = '#2A2E7A'; c.lineWidth = 3; c.beginPath(); for (let x = 0; x < W; x += 3) { const v = Math.sin(x * .19) * .3 + Math.sin(x * .07) * .3 + Math.sin(x * .41) * .2; x ? c.lineTo(x, Hh / 2 + v * Hh * .8) : c.moveTo(x, Hh / 2); } c.stroke(); }), -w / 2 + .07, y - h / 2 + .038, z + .001);
      /* EEG soketi (mavi halkalı) ve açma düğmesi */
      const sock = V3(.025, y - h / 2 + .038, z);
      put(g, cyl(.016, .016, .006, M.metal(0xC9D0D5)), sock.x, sock.y, z + .002, Math.PI / 2);
      put(g, cyl(.012, .012, .008, M.color(0x2F3FB0, .3)), sock.x, sock.y, z + .003, Math.PI / 2);
      put(g, cyl(.006, .006, .01, M.matte(0x5B6670)), sock.x, sock.y, z + .004, Math.PI / 2);
      put(g, cyl(.017, .017, .006, M.metal(0xC9D0D5)), w / 2 - .055, sock.y, z + .002, Math.PI / 2);
      put(g, cyl(.013, .013, .009, M.matte(0x5B6670)), w / 2 - .055, sock.y, z + .004, Math.PI / 2);
      [-1, 1].forEach(sd => put(g, cyl(.012, .014, .02, M.matte(0x9AA3AA)), sd * (w / 2 - .035), .01, z - .02));
      [-1, 1].forEach(sd => put(g, cyl(.012, .014, .02, M.matte(0x9AA3AA)), sd * (w / 2 - .035), .01, -z + .02));
      parts.push({key: 'port', at: sock.clone().add(V3(0, 0, .012))}, {key: 'a-power', at: V3(w / 2 - .055, sock.y, z + .012)}, {key: 'mount', at: V3(w / 2 - .035, .02, z - .02)});
      cable(g, [sock.clone().add(V3(0, 0, .008)), sock.clone().add(V3(0, -.01, .03)), V3(.01, .006, z + .06), V3(-.04, .004, z + .07)], .0028, 0x2E363C);
      const s = sensorTip('eeg'); s.position.set(-.1, .003, z + .07); g.add(s);
      parts.push({key: 'sensor', at: V3(-.1, .02, z + .07)});
    }
  });
  T('a-power', {tr: ['Açma/kapama düğmesi', 'Cihazı açar ve kapatır.'], en: ['Power button', 'Switches the device on and off.'], es: ['Botón de encendido', 'Enciende y apaga el equipo.']});
  /* NeuroSENSE: açık gri gövdeli, dikey ekranlı monitör; altta mavi logo paneli; iki taraflı alın EEG sensörü */
  DEV3D.model('neurosense', {
    type: 'monitor', w: .27, h: .31, d: .1, body: 0xDCDFE0, bezel: 0x121A33, led: false, mount: 'feet',
    /* 4:3 ekran üstte, altında mavi logo paneli */
    screenMargin: [.025, .03, .025, .115],
    /* Ekran üretici görselindeki gibi: lacivert üst çubuk, solda sol/sağ WAVcns trendleri ve hedef bantlı büyük trend,
       sağ üstte turuncu/sarı dolu WAVcns ve çerçeveli SR kutuları, sağ altta lacivert elektrot durumu paneli ve tuşlar */
    screen: {bg: '#000', layout: [
      {t: 'box', x: 0, y: 0, w: 1, h: .07, fill: '#0B1460'},
      ...[['play', .87], ['gear', .915], ['arrow', .96]].map(([gl, x]) => ({t: 'button', x, y: .008, w: .036, h: .054, fill: '#2B3AA8', g: gl, c: '#F4F6F7'})),
      {t: 'box', x: .004, y: .078, w: .686, h: .27, stroke: '#4A5568', lw: .003},
      {t: 'trend', x: .03, y: .09, w: .58, h: .11, max: 100, lines: [{c: '#F29A3A', base: 52, amp: 4, seed: 3}]},
      {t: 'trend', x: .03, y: .215, w: .58, h: .11, max: 100, lines: [{c: '#F2E04A', base: 50, amp: 4, seed: 5}]},
      {t: 'box', x: .635, y: .095, w: .02, h: .1, stroke: '#4A5568', lw: .002}, {t: 'box', x: .637, y: .17, w: .016, h: .012, fill: '#F29A3A'},
      {t: 'box', x: .635, y: .22, w: .02, h: .1, stroke: '#4A5568', lw: .002}, {t: 'box', x: .637, y: .3, w: .016, h: .012, fill: '#F2E04A'},
      {t: 'text', txt: 'WAVcns', x: .7, y: .08, w: .15, h: .035, c: '#C9D0D5', s: .02, wt: 600, al: 'c'}, {t: 'text', txt: 'SR', x: .85, y: .08, w: .13, h: .035, c: '#C9D0D5', s: .02, wt: 600, al: 'c'},
      {t: 'box', x: .715, y: .118, w: .12, h: .1, fill: '#F29A3A', stroke: '#C9D0D5', lw: .002}, {t: 'text', txt: '57', x: .715, y: .118, w: .12, h: .1, c: '#11181C', s: .075, wt: 700, al: 'c'},
      {t: 'box', x: .87, y: .118, w: .095, h: .1, stroke: '#C9D0D5', lw: .002}, {t: 'text', txt: '0', x: .87, y: .118, w: .095, h: .1, c: '#F29A3A', s: .06, wt: 600, al: 'c'},
      {t: 'box', x: .715, y: .235, w: .12, h: .1, fill: '#F2E04A', stroke: '#C9D0D5', lw: .002}, {t: 'text', txt: '57', x: .715, y: .235, w: .12, h: .1, c: '#11181C', s: .075, wt: 700, al: 'c'},
      {t: 'box', x: .87, y: .235, w: .095, h: .1, stroke: '#C9D0D5', lw: .002}, {t: 'text', txt: '0', x: .87, y: .235, w: .095, h: .1, c: '#F2E04A', s: .06, wt: 600, al: 'c'},
      {t: 'box', x: .004, y: .355, w: .686, h: .64, stroke: '#4A5568', lw: .003},
      {t: 'trend', x: .03, y: .37, w: .64, h: .22, max: 100, band: [40, 60], bandFill: 'rgba(30,150,150,.7)', lines: [{c: '#F2E04A', base: 54, amp: 7, seed: 2}]},
      {t: 'trend', x: .03, y: .61, w: .64, h: .1, max: 100, lines: [{c: '#E8D23A', base: 45, amp: 1, seed: 8}]},
      ...[.08, .27, .46, .63].map((x, k) => ({t: 'button', x, y: .925, w: .035, h: .05, fill: '#2B3AA8', g: ['play', 'pause', 'arrow', 'home'][k], c: '#C9D0D5'})),
      {t: 'box', x: .7, y: .355, w: .296, h: .53, fill: '#0B1460', stroke: '#4A5568', lw: .002},
      {t: 'text', txt: 'Electrode Status', x: .705, y: .365, w: .29, h: .04, c: '#C9D0D5', s: .022, wt: 600},
      ...[['L₁', '#F29A3A', '2.6'], ['L₂', '#F4C4C0', '1.7'], ['R₁', '#A8AEB4', '1.8'], ['R₂', '#F2E04A', '2.2']].flatMap(([l, c, v], k) => [
        {t: 'text', txt: l, x: .71 + k * .07, y: .42, w: .07, h: .035, c: '#C9D0D5', s: .022, wt: 600, al: 'c'},
        {t: 'text', txt: v, x: .71 + k * .07, y: .53, w: .07, h: .035, c: '#C9D0D5', s: .02, wt: 600, al: 'c'}]),
      {t: 'text', txt: 'Noise Level', x: .705, y: .59, w: .29, h: .035, c: '#C9D0D5', s: .02, wt: 600},
      {t: 'text', txt: 'Artifact Presence', x: .705, y: .69, w: .29, h: .035, c: '#C9D0D5', s: .02, wt: 600},
      {t: 'box', x: .705, y: .8, w: .285, h: .075, stroke: '#4A5568', lw: .002}, {t: 'text', txt: 'Electrode Contact Good', x: .705, y: .8, w: .285, h: .075, c: '#E6EEF2', s: .021, wt: 600, al: 'c'},
      {t: 'button', x: .702, y: .9, w: .1, h: .09, fill: '#2B3AA8', txt: 'DISPLAY', c: '#E6EEF2', s: .018},
      {t: 'button', x: .808, y: .9, w: .1, h: .09, fill: '#2B3AA8', txt: 'SYSTEM', c: '#E6EEF2', s: .018},
      {t: 'button', x: .914, y: .9, w: .082, h: .09, fill: '#2B3AA8', g: 'alarm', c: '#F4F6F7'}
    ], draw(g, t, {W, H}) {
      ['#F29A3A', '#F4C4C0', '#A8AEB4', '#F2E04A'].forEach((c, k) => { g.fillStyle = c; g.beginPath(); g.arc(W * (.745 + k * .07), H * .495, H * .022, 0, 7); g.fill(); });
      /* Gürültü ve artefakt göstergeleri (bölmeli çubuk) */
      for (let k = 0; k < 10; k++) { const x = W * (.71 + k * .028); g.strokeStyle = '#7D8A93'; g.lineWidth = 1; g.strokeRect(x, H * .635, W * .024, H * .035); g.strokeRect(x, H * .735, W * .024, H * .035); if (k < 3) { g.fillStyle = k < 2 ? '#2BD24A' : '#B8D432'; g.fillRect(x + 1, H * .635 + 1, W * .024 - 2, H * .035 - 2); } }
      /* Üçüncü trend: indüksiyondan sonra azalan çizgi */
      g.strokeStyle = '#E8D23A'; g.lineWidth = H * .005; g.beginPath();
      for (let k = 0; k <= 200; k++) { const u = k / 200, x = W * (.03 + .62 * u), v = u < .03 ? 1 : .12 + .88 * Math.exp(-(u - .03) * 9) - .08 * u, y = H * (.89 - .14 * v); k ? g.lineTo(x, y) : g.moveTo(x, y); }
      g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.14)'; g.lineWidth = 1; [.6, .72, .2].forEach(y => { g.beginPath(); g.moveTo(W * .03, H * y); g.lineTo(W * (y < .3 ? .61 : .67), H * y); g.stroke(); });
      [.19, .35, .51].forEach(u => { [[.09, .33], [.37, .9]].forEach(([a, b]) => { g.beginPath(); g.moveTo(W * u, H * a); g.lineTo(W * u, H * b); g.stroke(); }); });
      g.strokeStyle = 'rgba(120,120,255,.5)'; g.beginPath(); g.moveTo(W * .5, H * .09); g.lineTo(W * .5, H * .33); g.stroke();
    }},
    extra(g, {w, h, d, elev, parts}) {
      const y = elev + h / 2, z = d / 2;
      put(g, rbox(.14, .05, .004, .012, M.color(0x2E8FD0, .35)), 0, y - h / 2 + .055, z + .001);
      put(g, text('NeuroSENSE', .11, .016, '#FFFFFF', 700, 'center'), 0, y - h / 2 + .055, z + .0035);
      const pt = V3(w / 2 + .004, y - h * .3, 0); put(g, cyl(.008, .008, .01, M.color(0x2F7DD1, .4), 20), pt.x, pt.y, pt.z, 0, 0, Math.PI / 2);
      parts.push({key: 'port', at: pt.clone().add(V3(.012, 0, 0))});
      const s = aSensor('eeg4'); s.position.set(-.06, 0, z + .09); g.add(s);
      cable(g, [pt, pt.clone().add(V3(.03, -.02, .02)), V3(w / 2 + .03, .02, z + .05), V3(-.03, .006, z + .09), V3(-.06, .004, z + .09)], .003, 0x2E363C);
      parts.push({key: 'sensor', at: V3(.05, .02, z + .09)});
    }
  });

  /* AlgiScan: beyaz, uçları siyah el tipi video pupillometre; arkasında göz kabı, kabloyla uyarı elektrotları */
  DEV3D.model('algiscan', {
    type: 'handheld', w: .066, h: .22, d: .045, body: 0xF4F6F7, screenFrac: .42, keys: 0, accessory: 'electrodes', label: '',
    /* Dikey (≈ 0,65) açık temalı ekran, üretici görselindeki gibi: üstte hasta simgesi ve sayfa okları, yeşil çizgi;
       solda çap (beyaz) ve PDR (mavi) kutuları, sağda yeşil PPI; ortada uyarı penceresi (camgöbeği) ve pupil yanıt eğrisi;
       yeşil durum çubuğu ve altta sil / ana sayfa / geri simgeleri */
    screen: {bg: '#F4F6F7', layout: [
      {t: 'box', x: 0, y: 0, w: 1, h: .13, fill: '#FFFFFF'},
      {t: 'box', x: .03, y: .015, w: .19, h: .1, fill: '#2E6FC0', r: .025}, {t: 'icon', g: 'home', x: .05, y: .03, w: .15, h: .07, c: '#FFFFFF'},
      {t: 'text', txt: 'Patient', x: .25, y: .015, w: .4, h: .045, c: '#1B2328', s: .03, wt: 600, al: 'c'},
      {t: 'text', txt: '◀ 1/2 ▶', x: .25, y: .065, w: .4, h: .05, c: '#2E6FC0', s: .032, wt: 800, al: 'c'},
      {t: 'text', txt: 'Stim.', x: .66, y: .015, w: .33, h: .045, c: '#1B2328', s: .026, wt: 600, al: 'c'},
      {t: 'text', txt: '10 mA', x: .66, y: .065, w: .33, h: .045, c: '#1B2328', s: .026, wt: 600, al: 'c'},
      {t: 'box', x: 0, y: .135, w: 1, h: .01, fill: '#4CB848'},
      {t: 'box', x: .03, y: .16, w: .54, h: .13, fill: '#FFFFFF', stroke: '#2E6FC0', lw: .006},
      {t: 'text', txt: 'Ø', x: .05, y: .165, w: .1, h: .04, c: '#2E6FC0', s: .028, wt: 700},
      {t: 'text', txt: '3.20 mm', x: .1, y: .2, w: .45, h: .08, c: '#2E6FC0', s: .05, wt: 600, al: 'r'},
      {t: 'box', x: .03, y: .3, w: .54, h: .13, fill: '#2E6FC0'},
      {t: 'text', txt: 'PDR', x: .05, y: .31, w: .15, h: .05, c: '#FFFFFF', s: .026, wt: 700},
      {t: 'text', txt: '12 %', x: .2, y: .305, w: .35, h: .065, c: '#FFFFFF', s: .045, wt: 600, al: 'r'},
      {t: 'text', txt: '(0.38 mm)', x: .2, y: .365, w: .35, h: .05, c: '#DCE8F6', s: .026, wt: 600, al: 'r'},
      {t: 'box', x: .6, y: .16, w: .37, h: .27, fill: '#FFFFFF', stroke: '#BFE3B8', lw: .006},
      {t: 'text', txt: 'PPI', x: .6, y: .17, w: .37, h: .07, c: '#2E9E58', s: .042, wt: 600, al: 'c'},
      {t: 'text', txt: '3', x: .6, y: .25, w: .37, h: .15, c: '#2E9E58', s: .1, wt: 600, al: 'c'},
      {t: 'box', x: .3, y: .48, w: .36, h: .27, fill: '#3CC2C8'},
      {t: 'box', x: 0, y: .8, w: 1, h: .055, fill: '#4CB848'}, {t: 'text', txt: 'Measure OK', x: 0, y: .8, w: 1, h: .055, c: '#FFFFFF', s: .03, wt: 600, al: 'c'},
      {t: 'box', x: 0, y: .86, w: 1, h: .14, fill: '#FFFFFF'},
      {t: 'icon', g: 'sd', x: .06, y: .89, w: .14, h: .08, c: '#2E6FC0'}, {t: 'icon', g: 'home', x: .43, y: .89, w: .14, h: .08, c: '#2E6FC0'},
      {t: 'icon', g: 'arrow', x: .8, y: .89, w: .14, h: .08, c: '#2E6FC0'}
    ], draw(g, t, {W, H}) {
      /* Pupil çapı yanıt eğrisi: eksenler ve uyarıyla genişleyip dönen çap */
      g.strokeStyle = '#1B2328'; g.lineWidth = W * .012; g.beginPath(); g.moveTo(W * .2, H * .47); g.lineTo(W * .2, H * .76); g.lineTo(W * .88, H * .76); g.stroke();
      g.strokeStyle = '#2E4E8C'; g.lineWidth = W * .01; g.beginPath();
      for (let k = 0; k <= 100; k++) { const u = k / 100, x = W * (.2 + .68 * u), v = u < .2 ? .2 : .2 + .45 * Math.exp(-Math.pow((u - .55) / .18, 2)), y = H * (.74 - .24 * v); k ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
      g.fillStyle = '#1B2328'; g.font = `600 ${Math.round(H * .022)}px "Archivo", Arial, sans-serif`; g.fillText('mm', W * .04, H * .5); g.fillText('s', W * .9, H * .78);
    }},
    extra(g, {body, w, h, d, parts, toW, screens}) {
      /* Ekranı siyah üst başlığın altına indir (aradaki beyaz şerit görseldeki gibi) */
      const sm = screens[0].mesh, bz = body.children[body.children.indexOf(sm) - 1], dy = -.016;
      sm.position.y += dy; if (bz) bz.position.y += dy;
      body.updateMatrixWorld(true); parts.forEach(p => { if (p.key === 'screen') p.at = toW(0, sm.position.y, d / 2 + .01); });
      put(body, rbox(w + .002, .03, d + .002, .012, M.matte(0x1D2125)), 0, h / 2 - .012, 0);
      put(body, rbox(w + .002, .04, d + .002, .012, M.matte(0x1D2125)), 0, -h / 2 + .017, 0);
      const ec = new THREE.Group(); ec.add(put(new THREE.Group(), cyl(.016, .02, .03, M.plastic(0xF4F6F7)), 0, .015, 0)); ec.add(put(new THREE.Group(), cyl(.024, .02, .03, M.rubber(0x23292E), 32, true), 0, .045, 0)); ec.add(put(new THREE.Group(), cyl(.022, .022, .002, M.rubber(0x23292E)), 0, .031, 0));
      ec.rotation.x = -Math.PI / 2; ec.position.set(0, h * .25, -d / 2); body.add(ec);
      put(body, rbox(.03, .014, .002, .006, M.color(0x2E8FD0, .4)), 0, -h * .1, d / 2 + .001);
      put(body, text('AlgiScan', .026, .008, '#FFFFFF', 700, 'center'), 0, -h * .1, d / 2 + .0024);
      body.updateMatrixWorld(true);
      parts.push({key: 'eyecup', at: toW(0, h * .25, -d / 2 - .06)});
    }
  });
  /* SPI: GE ana monitörde hesaplanan parametre; modül rafındaki SpO₂ girişine bağlı gri TruSignal parmak sensörü */
  DEV3D.model('spi', {
    type: 'a-host', w: .36, h: .26, d: .11, body: 0xE3E7EA, label: 'CARESCAPE', theta: -.6,
    rack: {slots: 3, index: 1, mw: .042, label: 'SpO₂ · ECG', ports: 3, portColors: [0x2F7DD1, 0xE0533A, 0x3A4148], others: [0xD5DADE, 0xD5DADE, 0xD5DADE]},
    sensor: 'gefinger', sensorAt: [-.26, .16], cable: 0xB9C0C6,
    screen: {title: 'SPI', accent: '#5BB7DE', waves: [{k: 'ecg', c: '#4FD18F', l: 'II'}, {k: 'pleth', c: '#5BB7DE', l: 'Pleth'}], extra: 'trend',
      params: [{l: 'SPI', v: 34, c: '#C59BFF', big: true, live: true}, {l: 'SpO₂', v: '98', u: '%', c: '#5BB7DE'}, {l: 'HR', v: '66', u: '/min', c: '#4FD18F'}, {l: 'NIBP', v: '118/72', c: '#E6EEF2'}]}
  });

  /* MedStorm PainSensor: tablette PSS yazılımı; bileğe takılan kablosuz ölçüm birimi ve avuç içi elektrotları */
  DEV3D.model('painsensor', {
    type: 'monitor', w: .25, h: .14, d: .012, body: 0x23292E, bezel: 0x0B0F12, led: false, elev: .02, theta: .4,
    /* Geniş (≈ 2:1) tablet ekranı, üretici görselindeki PSS yazılımı: solda koyu turkuaz menü tuşları ve deri iletkenliği eğrisi,
       ortada üç büyük değer (pembe ağrı indeksi, beyaz AUC, açık turuncu uyanma indeksi), sağda üç renkli eğilim şeridi */
    screenMargin: [.012, .012, .012, .012],
    screen: {bg: '#030507', layout: [
      {t: 'box', x: .03, y: .06, w: .25, h: .07, fill: '#173A4A', r: .01}, {t: 'text', txt: 'Anaesthesia', x: .03, y: .06, w: .25, h: .07, c: '#C9D6DC', s: .035, wt: 600, al: 'c'},
      {t: 'box', x: .03, y: .14, w: .25, h: .07, fill: '#173A4A', r: .01}, {t: 'text', txt: 'Patient 01', x: .03, y: .14, w: .25, h: .07, c: '#C9D6DC', s: .035, wt: 600},
      {t: 'text', txt: 'SC µS', x: .04, y: .25, w: .15, h: .05, c: '#8A9AA2', s: .03, wt: 600},
      {t: 'text', txt: '0.13 peaks/s', x: .12, y: .25, w: .16, h: .05, c: '#E05A8A', s: .03, wt: 600, al: 'r'},
      ...[.26, .32, .38, .44].map(x => ({t: 'box', x: .07 + (x - .26) * 1.0, y: .3, w: .001, h: .36, fill: 'rgba(255,255,255,.08)'})),
      {t: 'box', x: .06, y: .66, w: .22, h: .003, fill: '#3A4A52'}, {t: 'box', x: .06, y: .3, w: .003, h: .36, fill: '#3A4A52'},
      ...['Start', 'Mark', 'Stop'].map((s, k) => ({t: 'button', x: .03 + k * .085, y: .72, w: .08, h: .07, fill: '#173A4A', txt: s, c: '#C9D6DC', s: .03, r: .01})),
      {t: 'button', x: .03, y: .8, w: .25, h: .065, fill: '#173A4A', txt: 'Event list', c: '#C9D6DC', s: .03, r: .01},
      {t: 'button', x: .03, y: .875, w: .25, h: .065, fill: '#173A4A', txt: 'Settings', c: '#C9D6DC', s: .03, r: .01},
      {t: 'text', txt: 'Pain index', x: .36, y: .1, w: .14, h: .05, c: '#E05A8A', s: .03, wt: 600, al: 'c'},
      {t: 'text', txt: '2', x: .36, y: .14, w: .14, h: .16, c: '#E0506A', s: .15, wt: 500, al: 'c'},
      {t: 'text', txt: 'AUC µS·s', x: .36, y: .37, w: .14, h: .05, c: '#C9D6DC', s: .03, wt: 600, al: 'c'},
      {t: 'text', txt: '40', x: .36, y: .41, w: .14, h: .16, c: '#F4F6F7', s: .15, wt: 500, al: 'c'},
      {t: 'text', txt: 'Awakening', x: .36, y: .65, w: .14, h: .05, c: '#F2C9A0', s: .03, wt: 600, al: 'c'},
      {t: 'text', txt: '1', x: .36, y: .69, w: .14, h: .16, c: '#F2C9A0', s: .15, wt: 500, al: 'c'},
      ...[[.08, '#D0508C'], [.36, '#4FB8C0'], [.66, '#E8C49A']].flatMap(([y, c], k) => [
        {t: 'box', x: .52, y, w: .41, h: .22, fill: '#05080A', stroke: '#1A2228', lw: .003},
        {t: 'text', txt: ['10', '60', '10'][k], x: .935, y, w: .06, h: .05, c: '#8A9AA2', s: .028, wt: 600}])
    ], draw(g, t, {W, H}) {
      /* Deri iletkenliği eğrisi (iki tepe) */
      g.strokeStyle = '#E6EEF2'; g.lineWidth = H * .006; g.beginPath();
      for (let k = 0; k <= 100; k++) { const u = k / 100, x = W * (.07 + .2 * u), y = H * (.6 - .14 * Math.exp(-Math.pow((u - .3) / .14, 2)) - .28 * Math.exp(-Math.pow((u - .72) / .12, 2))); k ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
      /* Sağdaki şeritler: pembe alan grafiği, turkuaz ve açık turuncu çubuklar (zamanla kayar) */
      const sh = Math.floor(t * 2);
      for (let k = 0; k < 60; k++) {
        const x = W * (.525 + k * .0067), n = Math.abs(Math.sin((k + sh) * 1.7)) , n2 = Math.abs(Math.sin((k + sh) * .37));
        g.fillStyle = '#D0508C'; const h1 = H * (.03 + .035 * n + (k > 54 ? .07 : 0)); g.fillRect(x, H * .28 - h1, W * .0062, h1);
        g.fillStyle = '#4FB8C0'; const h2 = H * (k < 8 ? .18 : n2 > .3 ? .09 : .03); g.fillRect(x, H * .56 - h2, W * .005, h2);
        g.fillStyle = '#E8C49A'; const h3 = H * (.025 + .02 * (n2 > .5 ? 1 : 0)); g.fillRect(x, H * .86 - h3, W * .0062, h3);
      }
    }},
    extra(g, {w, h, d, elev, parts}) {
      /* Tablet arka desteği ve masa ayağı */
      put(g, box(.1, .13, .006, M.matte(0x3A4148)), 0, .075, -.045, -.38);
      put(g, box(w * .8, .008, .06, M.matte(0x3A4148)), 0, .004, 0);
      /* Bileklik birimi */
      const bx = .2, bz = .14;
      const band = cyl(.025, .025, .028, M.matte(0x1D2125), 40, true); band.scale.set(1, 1, .8); put(g, band, bx, .027, bz, 0, 0, Math.PI / 2);
      band.material = M.matte(0x1D2125); band.material.side = THREE.DoubleSide;
      put(g, rbox(.05, .014, .04, .006, M.plastic(0xC9D0D5)), bx, .053, bz);
      const lcd = makeScreen(.03, .018, {bg: '#B9C4BC', layout: [{t: 'text', txt: 'Peaks/s', x: .04, y: .02, w: .9, h: .3, c: '#2B3238', s: .22, wt: 600}, {t: 'text', txt: '0.13', x: .04, y: .32, w: .92, h: .62, c: '#11181C', s: .5, wt: 700, al: 'r', mono: true}]}, 256); lcd.mesh.rotation.x = -Math.PI / 2; put(g, lcd.mesh, bx, .0605, bz - .004, -Math.PI / 2);
      parts.push({key: 'a-wrist', at: V3(bx, .07, bz)});
      /* Avuç içi elektrotları */
      const from = V3(bx - .025, .05, bz + .01);
      cable(g, [from, from.clone().add(V3(-.03, -.02, .02)), V3(bx - .07, .004, bz + .05), V3(bx - .1, .004, bz + .06)], .002, 0x2E363C);
      const s = aSensor('palm'); s.position.set(bx - .14, 0, bz + .06); g.add(s);
      parts.push({key: 'sensor', at: V3(bx - .1, .02, bz + .06)});
      parts.push({key: 'a-wireless', at: V3(w / 2 - .02, elev + h - .01, d)});
    }
  });
  T('a-wrist', {tr: ['Bileklik ölçüm birimi', 'Elektrotlardan gelen deri iletkenliği sinyalini ölçen, bileğe takılan kablosuz birimdir.'], en: ['Wrist-worn unit', 'Wireless unit worn on the wrist that measures the skin conductance signal from the electrodes.'], es: ['Unidad de muñeca', 'Unidad inalámbrica colocada en la muñeca que mide la señal de conductancia cutánea de los electrodos.']});
  T('a-wireless', {tr: ['Tablet ve yazılım', 'Ölçüm birimi verileri kablosuz olarak tablete gönderir; yazılım değerleri ve eğilimleri gösterir, hasta monitörüne aktarılabilir.'], en: ['Tablet and software', 'The measuring unit sends data wirelessly to the tablet; the software shows values and trends and can pass them to a patient monitor.'], es: ['Tableta y software', 'La unidad de medición envía los datos de forma inalámbrica a la tableta; el software muestra valores y tendencias y puede enviarlos a un monitor.']});
  /* Masimo O3: Root platformu, yan kablodan O3 ara modülü ve iki alın pedi (sol/sağ) */
  DEV3D.model('masimo-o3', {
    type: 'a-root', podLabel: 'O3', sensor: 'nirs2',
    /* Ekran üretici görselindeki gibi: rainbow pleth, SpO₂/PR/RRa trend satırları, parametre satırı, altta
       O3 Forehead (Left) ve (Right) bölümleri: sarı başlangıç çizgili rSO₂ trendi, büyük mavi rSO₂, Δbase/AUC/ΔSpO₂ */
    screen: {bg: '#000', layout: [
      ...rootTop(97),
      ...[['74', 'PR', '#F4F6F7', 72], ['15', 'RRa', '#5BB7FF', 30]].flatMap(([v, l, c, base], k) => [
        {t: 'box', x: .015, y: .248 + k * .078, w: .97, h: .076, fill: '#05080B', stroke: '#20262E', lw: .002},
        {t: 'trend', x: .07, y: .252 + k * .078, w: .62, h: .07, max: 100, lines: [{c, base, amp: 3, seed: 6 + k}]},
        {t: 'text', txt: v, x: .66, y: .252 + k * .078, w: .26, h: .07, c, s: .06, wt: 600, al: 'r'},
        {t: 'text', txt: l, x: .92, y: .27 + k * .078, w: .07, h: .02, c, s: .011, wt: 600}]),
      {t: 'text', txt: '13.4', x: .02, y: .408, w: .2, h: .036, c: '#F0353F', s: .032, wt: 600}, {t: 'text', txt: 'SpHb', x: .15, y: .41, w: .1, h: .02, c: '#F0353F', s: .01, wt: 600, pad: 0},
      {t: 'text', txt: '18', x: .02, y: .44, w: .12, h: .03, c: '#F4F6F7', s: .026, wt: 600}, {t: 'text', txt: 'SpOC', x: .09, y: .445, w: .1, h: .02, c: '#F4F6F7', s: .01, wt: 600, pad: 0},
      ...[['30', 'PVi', '#F4F6F7'], ['1.0', 'SpMet', '#F4E21C'], ['4.0', 'Pi', '#F4F6F7']].flatMap(([v, l, c], k) => [
        {t: 'text', txt: v, x: .29 + k * .24, y: .41, w: .16, h: .04, c, s: .034, wt: 600}, {t: 'text', txt: l, x: .29 + k * .24 + (v.length > 2 ? .115 : .085), y: .418, w: .1, h: .02, c, s: .01, wt: 600, pad: 0}]),
      ...[['O3 Forehead (Left)', '0', '10', '30', 3], ['O3 Forehead (Right)', '-2', '8', '32', 9]].flatMap(([hd, db, auc, dsp, seed], k) => { const y = .474 + k * .218; return [
        {t: 'box', x: .015, y, w: .97, h: .02, fill: '#20262E'}, {t: 'text', txt: hd, x: .02, y, w: .5, h: .02, c: '#C9D0D5', s: .011, wt: 700},
        {t: 'text', txt: 'NONPULSATILE', x: .7, y, w: .28, h: .02, c: '#7D8A93', s: .009, wt: 700, al: 'r'},
        {t: 'box', x: .015, y: y + .022, w: .97, h: .19, fill: '#05080B', stroke: '#20262E', lw: .002},
        {t: 'box', x: .07, y: y + .08, w: .62, h: .003, fill: '#C8C23A'}, {t: 'text', txt: '67', x: .015, y: y + .07, w: .055, h: .02, c: '#C8C23A', s: .011, wt: 700, al: 'r'},
        {t: 'trend', x: .07, y: y + .03, w: .62, h: .13, max: 100, lines: [{c: '#5BB7FF', base: 62, amp: 6, seed}]},
        ...['100', '0'].map((s, j) => ({t: 'text', txt: s, x: .015, y: y + .026 + j * .116, w: .055, h: .016, c: '#7D8A93', s: .009, al: 'r'})),
        {t: 'text', txt: '67', x: .7, y: y + .045, w: .27, h: .12, c: '#5BB7FF', s: .1, wt: 500, al: 'r'},
        {t: 'text', txt: 'rSO₂', x: .86, y: y + .182, w: .12, h: .02, c: '#5BB7FF', s: .01, wt: 600, al: 'r'},
        {t: 'text', txt: db, x: .08, y: y + .172, w: .1, h: .035, c: '#F4E21C', s: .03, wt: 600}, {t: 'text', txt: 'Δbase', x: .155, y: y + .18, w: .1, h: .02, c: '#F4E21C', s: .009, wt: 600, pad: 0},
        {t: 'text', txt: auc, x: .3, y: y + .172, w: .1, h: .035, c: '#5BB7FF', s: .03, wt: 600}, {t: 'text', txt: 'AUC', x: .375, y: y + .18, w: .1, h: .02, c: '#5BB7FF', s: .009, wt: 600, pad: 0},
        {t: 'text', txt: dsp, x: .5, y: y + .172, w: .1, h: .035, c: '#F4F6F7', s: .03, wt: 600}, {t: 'text', txt: 'ΔSpO₂', x: .575, y: y + .18, w: .1, h: .02, c: '#F4F6F7', s: .009, wt: 600, pad: 0}]; }),
      ...rootBottom
    ], draw(g, t, {W, H}) { rainbow(g, W, H, .066); }}
  });

  /* NIRO-200NX: üretici gövde görseli yok; genel yatay ekranlı NIRS monitörü, iki kanal ve iki alın probu */
  DEV3D.model('niro-200nx', {
    type: 'monitor', w: .27, h: .2, d: .12, body: 0xE4E7E9, bezel: 0x101418, led: false, mount: 'feet', keys: 5, knob: true,
    screenMargin: [.02, .03, .02, .05],
    ports: [{side: 'front', n: 2, colors: [0x2E9E58, 0x2F7DD1]}],
    /* Görselde gövde ve tam ekran yok, yalnızca üreticinin trend grafikleri var: ekran o renk/düzene göre sadeleştirildi —
       solda yeşil TOI ve pembe nTHI, sağda kırmızı ΔO₂Hb, mavi ΔHHb, beyaz ΔcHb eğrileri; üstte kanal değerleri */
    screen: {bg: '#000', layout: [
      {t: 'text', txt: 'CH1', x: .01, y: .02, w: .1, h: .07, c: '#9AA3AA', s: .045, wt: 700}, {t: 'text', txt: 'CH2', x: .01, y: .14, w: .1, h: .07, c: '#9AA3AA', s: .045, wt: 700},
      {t: 'text', txt: 'TOI', x: .1, y: .02, w: .1, h: .07, c: '#1FA25A', s: .045, wt: 700},
      {t: 'tile', x: .16, y: 0, w: .17, h: .13, l: '', v: 68, c: '#1FA25A', vs: .1, live: true}, {t: 'text', txt: '%', x: .25, y: .04, w: .04, h: .06, c: '#1FA25A', s: .04, wt: 700},
      {t: 'tile', x: .16, y: .12, w: .17, h: .13, l: '', v: 70, c: '#1FA25A', vs: .1, live: true}, {t: 'text', txt: '%', x: .25, y: .16, w: .04, h: .06, c: '#1FA25A', s: .04, wt: 700},
      {t: 'text', txt: 'nTHI', x: .35, y: .02, w: .12, h: .07, c: '#D9508C', s: .045, wt: 700}, {t: 'text', txt: '1.00', x: .35, y: .085, w: .13, h: .1, c: '#D9508C', s: .075, wt: 700},
      ...[['ΔO₂Hb', '+0.4', '#E0302A'], ['ΔHHb', '-0.2', '#2088C8'], ['ΔcHb', '+0.2', '#F4F6F7']].flatMap(([l, v, c], k) => [
        {t: 'text', txt: l, x: .55, y: .02 + k * .085, w: .2, h: .08, c, s: .05, wt: 700}, {t: 'text', txt: v, x: .75, y: .02 + k * .085, w: .16, h: .08, c, s: .055, wt: 700, al: 'r'},
        {t: 'text', txt: 'µM', x: .92, y: .03 + k * .085, w: .07, h: .07, c: '#9AA3AA', s: .03, wt: 600}]),
      {t: 'box', x: .484, y: .3, w: .032, h: .7, fill: '#E6EAED'},
      {t: 'text', txt: 'TOI', x: .3, y: .31, w: .17, h: .08, c: '#1FA25A', s: .06, wt: 600, al: 'r'}, {t: 'text', txt: 'nTHI', x: .3, y: .39, w: .17, h: .08, c: '#D9508C', s: .06, wt: 600, al: 'r'},
      {t: 'text', txt: 'ΔO₂Hb', x: .53, y: .31, w: .2, h: .08, c: '#E0302A', s: .06, wt: 600}, {t: 'text', txt: 'ΔHHb', x: .53, y: .39, w: .2, h: .08, c: '#2088C8', s: .06, wt: 600},
      {t: 'text', txt: 'ΔcHb', x: .53, y: .47, w: .2, h: .08, c: '#F4F6F7', s: .06, wt: 600}
    ], draw(g, t, {W, H}) {
      /* Sigmoid geçişli eğriler (görseldeki gibi): TOI düşer, nTHI sabit; ΔHHb yükselir, ΔO₂Hb düşer, ΔcHb sabit */
      const sig = (u, c) => 1 / (1 + Math.exp(-(u - c) * 22)), line = (x0, x1, f, c) => { g.strokeStyle = c; g.lineWidth = H * .012; g.beginPath(); for (let x = x0; x <= x1; x += 2) { const u = (x - x0) / (x1 - x0), y = H * f(u); x === x0 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); };
      line(0, W * .484, u => .58 + .25 * sig(u, .5), '#1FA25A'); line(0, W * .484, () => .9, '#D9508C');
      line(W * .516, W, u => .8 - .25 * sig(u, .55), '#2088C8'); line(W * .516, W, () => .83, '#F4F6F7'); line(W * .516, W, u => .86 + .11 * sig(u, .55), '#E0302A');
    }},
    extra(g, {w, h, d, elev, parts}) {
      const from = V3(-w / 2 + .03, elev + .025, d / 2 + .01);
      nirsPair(g, from, -.04, d / 2 + .08, parts, 0x2E363C);
    }
  });
  /* SenSmart X-100: koyu gri yatay monitör (solda yön tuşları, sağda tuş sütunu), kabloyla çok girişli sinyal işlemci,
     renk kodlu kanal ara modülleri, alın pedleri ve parmak sensörü */
  DEV3D.model('sensmart-x100', {
    type: 'monitor', w: .3, h: .19, d: .05, body: 0x3A3F45, bezel: 0x101418, led: false, mount: 'feet', keys: 6, keysAt: 'right',
    /* Ekran ≈ 1,55:1 (üretici görseli); üstünde EQUANOX / SenSmart / PureSAT yazıları */
    screenMargin: [.072, .036, .075, .055], theta: .35,
    /* Ekran üretici görselindeki gibi: solda simge sütunu (alarm, Bluetooth, pil), ortada üstte zaman ekseni olan dört trend satırı
       (üç rSO₂ kanalı ve SpO₂ pleth), satır sonunda başlangıç değerleri; sağda renk çubuklu dört kanal kutusu ve büyük değerler */
    screen: {bg: '#000', layout: [
      ...['07:42', '08:00', '08:10', '08:20', '08:30', '08:40', '08:50'].map((s, k) => ({t: 'text', txt: s, x: .07 + k * .085, y: 0, w: .08, h: .06, c: '#B9C0C6', s: .028, wt: 600})),
      {t: 'icon', g: 'bell', x: .01, y: .36, w: .06, h: .09, c: '#D8D23A'}, {t: 'icon', g: 'bt', x: .015, y: .55, w: .05, h: .08, c: '#3FC84A'},
      {t: 'icon', g: 'battery', x: .01, y: .76, w: .065, h: .07, c: '#3FC84A'},
      {t: 'text', txt: 'X-100', x: .005, y: .86, w: .08, h: .04, c: '#B9C0C6', s: .022, wt: 600},
      ...[['#9EC2E6', 68], ['#F29A3A', 52], ['#D9DEE2', 70], ['#C84FC8', 0]].flatMap(([c, base], k) => { const y = .065 + k * .23; return [
        {t: 'box', x: .1, y: y + .215, w: .56, h: .006, fill: '#5A6066'},
        ...(k < 3 ? ['100', '50', '0'].map((v, j) => ({t: 'text', txt: v, x: .07, y: y + .01 + j * .085, w: .03, h: .03, c: '#8C949B', s: .018, wt: 600, al: 'r', pad: 0})) : []),
        k < 3 ? {t: 'trend', x: .1, y: y + .01, w: .56, h: .2, max: 100, lines: [{c, base, amp: 6, seed: 3 + k}]}
              : {t: 'wave', k: 'pleth', x: .1, y: y + .01, w: .56, h: .2, c, amp: .4, span: 9, lw: .004}]; }),
      ...[['52', '#9EC2E6'], ['41', '#F29A3A'], ['52', '#D9DEE2']].map(([v, c], k) => ({t: 'text', txt: v, x: .655, y: .17 + k * .23, w: .06, h: .07, c, s: .04, wt: 600, al: 'c'})),
      ...[['Ch 1 L CERE', '68', '#6FB4F0', 'BL 65'], ['Ch 2 R CERE', '52', '#F29A3A', 'BL 51'], ['Ch 3 R CALF', '70', '#F4F6F7', 'BL 65'], ['Ch 4 R ABDO', '97', '#D850D0', '']].flatMap(([l, v, c, bl], k) => { const y = .065 + k * .232; return [
        {t: 'box', x: .72, y, w: .275, h: .222, fill: '#05080A', stroke: '#3A4046', lw: .003},
        {t: 'box', x: .72, y, w: .01, h: .222, fill: c},
        {t: 'text', txt: k < 3 ? l : 'SpO₂', x: .735, y: y + .005, w: .17, h: .045, c: k < 3 ? '#C9D0D5' : c, s: .024, wt: 600},
        {t: 'text', txt: k < 3 ? 'rSO₂' : '%SpO₂', x: .9, y: y + .005, w: .09, h: .045, c, s: .022, wt: 600, al: 'r'},
        ...(bl ? [{t: 'text', txt: bl, x: .735, y: y + .12, w: .1, h: .04, c: '#C9D0D5', s: .026, wt: 600}, {t: 'text', txt: 'AUC 0', x: .735, y: y + .16, w: .1, h: .035, c: '#8C949B', s: .02, wt: 600}]
              : [{t: 'text', txt: '90', x: .74, y: y + .06, w: .1, h: .1, c, s: .07, wt: 600}]),
        {t: 'text', txt: v, x: .82, y: y + .04, w: .17, h: .18, c, s: .17, wt: 700, al: 'r'}]; })
    ]},
    extra(g, {w, h, d, elev, parts}) {
      const y = elev + h / 2, z = d / 2;
      /* Sol: yön tuşları ve hoparlör ızgarası */
      put(g, rbox(.04, .06, .003, .006, M.matte(0x2B3035)), -w / 2 + .037, y + .03, z + .001);
      put(g, cyl(.014, .014, .004, M.matte(0x8C949B)), -w / 2 + .037, y + .03, z + .003, Math.PI / 2);
      put(g, cyl(.005, .005, .005, M.matte(0x5B6670)), -w / 2 + .037, y + .03, z + .004, Math.PI / 2);
      for (let k = 0; k < 6; k++) put(g, box(.026, .002, .001, M.matte(0x1D2125)), -w / 2 + .037, y - .025 - k * .006, z + .001);
      put(g, cyl(.002, .002, .002, M.led(0x2E9E58)), -w / 2 + .03, y - h / 2 + .02, z + .001, Math.PI / 2);
      put(g, text('NONIN', .05, .011, '#E6EAED', 800, 'right'), w / 2 - .04, y - h / 2 + .016, z + .001);
      put(g, text('EQUANOX rSO₂    SenSmart    PureSAT SpO₂', .13, .007, '#C9CED2', 600, 'center'), (.072 - .075) / 2, y + h / 2 - .018, z + .001);
      put(g, rbox(.07, .014, .01, .004, M.matte(0x2B3035)), 0, y - h / 2 + .018, z + .002);
      parts.push({key: 'knob', at: V3(-w / 2 + .037, y + .03, z + .01)});
      /* Alt orta bağlantı → sinyal işlemci (hub) */
      const pt = V3(0, y - h / 2 + .012, z + .004); put(g, cyl(.007, .007, .01, M.matte(0x1D2125), 20), pt.x, pt.y, pt.z, Math.PI / 2);
      parts.push({key: 'port', at: pt.clone().add(V3(0, 0, .01))});
      const hub = V3(-.21, .014, .1); put(g, rbox(.11, .022, .04, .008, M.matte(0x2B3035)), hub.x, hub.y, hub.z, 0, -.4);
      cable(g, [pt, pt.clone().add(V3(0, -.01, .03)), V3(-.08, .006, .08), V3(hub.x + .06, .01, hub.z - .02)], .0028, 0x23282C);
      parts.push({key: 'a-hub', at: hub.clone().add(V3(0, .02, 0))});
      /* Renk kodlu kanallar: ara modül + ped / parmak sensörü */
      const cols = [0x5BB7DE, 0xF29A3A, 0xE6EEF2, 0x9B59C8];
      cols.forEach((c, k) => {
        const px = -.06 + k * .03, pz = .19 + k * .03, src = V3(hub.x + .02 + k * .018, .016, hub.z + .03);
        put(g, rbox(.06, .016, .022, .007, M.matte(k === 3 ? 0x6A5C8C : 0x3A3F45)), px, .008, pz);
        put(g, box(.018, .0012, .012, M.color(c)), px + .008, .0165, pz);
        cable(g, [src, src.clone().add(V3(0, -.008, .03)), V3(px - .06, .005, pz), V3(px - .03, .006, pz)], .0022, 0x23282C);
        if (k < 3) { const s = aSensor('nirs'); s.position.set(-.2 + k * .06, 0, .3); s.rotation.y = .3; s.traverse(o => { if (o.material && o.material.color && o.material.color.getHex() > 0xE00000) o.material = M.plastic(0xB9D4EE); }); g.add(s);
          cable(g, [V3(px + .03, .006, pz), V3(px + .05, .005, pz + .02), V3(-.17 + k * .06, .004, .29)], .002, 0x23282C); }
        else { const f = sensorTip('finger'); f.position.set(.16, .012, .3); g.add(f); cable(g, [V3(px + .03, .006, pz), V3(.13, .004, .28), V3(.16, .01, .3)], .002, 0xE6E2D8); }
      });
      parts.push({key: 'a-preamp', at: V3(-.03, .03, .22)}, {key: 'sensor', at: V3(-.14, .02, .3)});
    }
  });
  T('a-hub', {tr: ['Sinyal işlemci', 'Kanal kablolarını tek bağlantıda toplayıp monitöre ileten çok girişli birimdir.'], en: ['Signal processor', 'Multi-input unit that gathers the channel cables into a single connection to the monitor.'], es: ['Procesador de señal', 'Unidad de varias entradas que reúne los cables de canal en una sola conexión al monitor.']});
  T('a-preamp', {tr: ['Kanal ara kablosu / ön yükseltici', 'Sensörü sistem kablosuna bağlayan, renk ya da numarayla kanalı belirten ara birimdir.'], en: ['Channel cable / preamplifier', 'Intermediate unit linking the sensor to the system cable; color or number identifies the channel.'], es: ['Cable de canal / preamplificador', 'Unidad intermedia que conecta el sensor al cable del sistema; el color o el número identifica el canal.']});
  /* Yan porttan masadaki uca kablo: end = [x, z]; tip = Object3D ya da null */
  function sideWire(g, parts, {w, h, elev}, end, tip, key = 'sensor', c = 0x2E363C, side = 1) {
    const pt = V3(side * (w / 2 + .004), elev + h * .3, 0);
    put(g, cyl(.007, .007, .01, M.color(0x2F7DD1, .4), 20), pt.x, pt.y, pt.z, 0, 0, Math.PI / 2);
    parts.push({key: 'port', at: pt.clone().add(V3(side * .012, 0, 0))});
    const [ex, ez] = end;
    cable(g, [pt, pt.clone().add(V3(side * .03, -.01, .01)), V3(side * (w / 2 + .03), .03, ez * .6), V3(ex + side * .04, .005, ez), V3(ex, .006, ez)], .0028, c);
    if (tip) { tip.position.set(ex, tip.position.y, ez); g.add(tip); parts.push({key, at: V3(ex, .025, ez)}); }
  }

  /* ---------- 'a-tab': tablet benzeri, köşeleri belirgin yuvarlak masaüstü monitör (ANI, NOL) ----------
     cfg: {w,h,d, elev, screen, scr:[x, y, sw, sh] (gövde merkezine göre), shell(body, ctx) → ekran yüzeyinin z'si, extra(g, ctx)}
     Gövde dik durur (cfg.tilt: geriye eğim, rad); cfg.stand(g, ctx) verilmezse arkada eğik destek ayağı ve altta iki lastik ayak.
     ctx.toW(x, y, z): gövde koordinatını dünya koordinatına çevirir (eğik gövdede işaret ve kablo uçları için). */
  /* Kenarları hafif şişkin (b), yuvarlak köşeli (r) düz profil */
  function sqShape(w, h, r, b = 0) {
    const s = new THREE.Shape(), x0 = -w / 2, x1 = w / 2, y0 = -h / 2, y1 = h / 2;
    r = Math.min(r, w / 2 - .0005, h / 2 - .0005);
    s.moveTo(x0 + r, y0); s.quadraticCurveTo(0, y0 - b, x1 - r, y0); s.quadraticCurveTo(x1, y0, x1, y0 + r);
    s.quadraticCurveTo(x1 + b, 0, x1, y1 - r); s.quadraticCurveTo(x1, y1, x1 - r, y1);
    s.quadraticCurveTo(0, y1 + b, x0 + r, y1); s.quadraticCurveTo(x0, y1, x0, y1 - r);
    s.quadraticCurveTo(x0 - b, 0, x0, y0 + r); s.quadraticCurveTo(x0, y0, x0 + r, y0);
    return s;
  }
  /* sqShape gövdesi: d kalınlık (z), bev kenar yuvarlatması (0: keskin levha) */
  function sqSlab(w, h, d, r, bev, mat, b = 0) {
    const s = bev > 0 ? sqShape(w - 2 * bev, h - 2 * bev, Math.max(r - bev, .001), b) : sqShape(w, h, r, b), dd = Math.max(d - 2 * bev, .0004);
    const geo = new THREE.ExtrudeGeometry(s, {depth: dd, bevelEnabled: bev > 0, bevelThickness: bev, bevelSize: bev, bevelSegments: bev > 0 ? 5 : 1, curveSegments: 12});
    geo.translate(0, 0, -dd / 2);
    const m = new THREE.Mesh(geo, mat); m.castShadow = m.receiveShadow = true; return m;
  }
  /* İki nokta arasında yuvarlak köşeli kiriş (destek kolu vb.) */
  function beam(a, b, w, t, mat) {
    const dir = b.clone().sub(a), L = dir.length(), m = rbox(w, L, t, Math.min(w, t) * .45, mat);
    m.position.copy(a).add(b).multiplyScalar(.5); m.quaternion.setFromUnitVectors(V3(0, 1, 0), dir.normalize()); return m;
  }
  DEV3D.H.aSq = {sqShape, sqSlab, beam};
  DEV3D.register('a-tab', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const w = cfg.w, h = cfg.h, d = cfg.d, elev = cfg.elev ?? .012;
    const body = new THREE.Group(); body.position.y = elev + h / 2; body.rotation.x = -(cfg.tilt || 0); g.add(body);
    const toW = (x, y, z) => { body.updateMatrixWorld(true); return body.localToWorld(V3(x, y, z)); };
    const ctx = {body, w, h, d, elev, parts, screens, toW};
    const zf = cfg.shell(body, ctx);
    const [sx, sy, sw, sh] = cfg.scr, scr = makeScreen(sw, sh, cfg.screen || {}, cfg.px || 1024);
    put(body, scr.mesh, sx, sy, zf + .0004); screens.push(scr);
    parts.push({key: 'screen', at: toW(sx, sy, zf + .01)});
    if (cfg.stand) cfg.stand(g, ctx);
    else {
      /* Lastik ayaklar ve arka destek */
      [-1, 1].forEach(s => put(g, rbox(.03, elev + .002, d * .7, .003, M.rubber()), s * w * .33, (elev + .002) / 2, 0));
      put(g, rbox(w * .4, h * .7, .008, .004, M.matte(cfg.standColor || 0x3A4148)), 0, h * .33, -d / 2 - .03, -.33);
      put(g, rbox(w * .35, .008, .07, .003, M.matte(cfg.standColor || 0x3A4148)), 0, .004, -d / 2 - .055);
      parts.push({key: 'mount', at: V3(w * .12, .012, -d / 2 - .07)});
    }
    if (cfg.extra) cfg.extra(g, ctx);
    return {group: g, parts, screens};
  });

  /* Eğri çizimi için Catmull-Rom ara değerleme: P = [[x, y], ...] (x artan) */
  const crv = (P, x) => {
    let k = 1; while (k < P.length - 1 && x > P[k][0]) k++;
    const p0 = P[Math.max(0, k - 2)][1], p1 = P[k - 1], p2 = P[k], p3 = P[Math.min(P.length - 1, k + 1)][1];
    const f = Math.max(0, Math.min(1, (x - p1[0]) / (p2[0] - p1[0]))), f2 = f * f, f3 = f2 * f;
    return .5 * (2 * p1[1] + (-p0 + p2[1]) * f + (2 * p0 - 5 * p1[1] + 4 * p2[1] - p3) * f2 + (-p0 + 3 * p1[1] - 3 * p2[1] + p3) * f3);
  };
  const std3 = (c, r, m) => K3.std(c, r, m);
  const SANS = '"Archivo", "Helvetica Neue", Arial, sans-serif';
  T('a-patcable', {tr: ['Hasta kablosu', 'ANI sensörünü monitöre bağlar; tek kullanımlık sensör kablonun ucundaki konektöre takılır.'], en: ['Patient cable', 'Connects the ANI sensor to the monitor; the single-use sensor plugs into the connector at the end of the cable.'], es: ['Cable del paciente', 'Conecta el sensor ANI al monitor; el sensor de un solo uso se enchufa en el conector del extremo del cable.']});
  T('a-usb', {tr: ['USB bağlantı noktası', 'Kayıtlı verilerin USB belleğe aktarılması gibi işlemler içindir; yalnızca üreticinin izin verdiği aygıtları bağlayın.'], en: ['USB port', 'Used for tasks such as exporting recorded data to a USB drive; connect only devices permitted by the manufacturer.'], es: ['Puerto USB', 'Sirve para tareas como exportar los datos registrados a una memoria USB; conecte solo dispositivos permitidos por el fabricante.']});

  /* ANI (MDoloris, ANI Monitor V2): üretici görseline göre kenarları hafif şişkin, köşeleri geniş yuvarlak tablet; tüm ön yüz parlak siyah cam,
     camın çevresinde ince turuncu çizgi ve gümüş kasa kenarı; üstte MDMS logosu, altta ortada yeşil halkalı açma düğmesi, sağ altta ANI logosu.
     Arkada açık gri kapak, VESA plakası ve menteşeli masa ayağı; sağ yanda hasta kablosu soketi (turuncu bilezik) ve USB.
     Hasta kablosunun ucundaki konektöre iki elektrotlu, tek kullanımlık ANI göğüs sensörü takılı. */
  DEV3D.model('ani', {
    type: 'a-tab', w: .29, h: .243, d: .056, elev: .043, tilt: .2, scr: [0, .006, .195, .15], px: 1280,
    /* Ekran üretici görselindeki gibi (4:3): üstte MDMS, saat, Stop tuşu ve ANI logosu; solda ANI eğilimi (kalın turuncu ANIm, ince sarı ANIi,
       11:20–11:35 ızgarası), noktalı zarflı solunum modülasyonu (64 s) ve R işaretli EKG; sağda yön oku, büyük ANIm/ANIi, menü tuşları,
       enerji, sinyal kalitesi ve Reset ECG */
    screen: (() => {
      const AB = {fill: '#454545', stroke: '#A3A3A3', lw: .003, r: .004, c: '#EE8B3D', s: .021, wt: 400};
      const L = {c: '#D3D7DA', s: .019, wt: 500};
      const cx0 = .108, cx1 = .723;
      return {bg: '#000', layout: [
        {t: 'text', txt: '11:36:39', x: .36, y: .03, w: .224, h: .072, c: '#FFFFFF', s: .058, wt: 800, al: 'c'},
        {t: 'button', x: .592, y: .036, w: .216, h: .07, ...AB, txt: 'Stop', s: .026},
        {t: 'box', x: cx0, y: .146, w: cx1 - cx0, h: .34, stroke: '#8E9397', lw: .003},
        ...[100, 80, 60, 40, 20, 0].map((v, k) => ({t: 'text', txt: v, x: .06, y: .131 + k * .068, w: .04, h: .03, ...L, al: 'r', pad: 0})),
        ...[['11:20:00', .215], ['11:25:00', .415], ['11:30:00', .538], ['11:35:00', .672]].map(([s, u]) => ({t: 'text', txt: s, x: u - .045, y: .497, w: .09, h: .03, ...L, s: .017, al: 'c'})),
        {t: 'box', x: cx0, y: .56, w: cx1 - cx0, h: .186, stroke: '#8E9397', lw: .003},
        ...[['0.1', .566], ['0.0', .655], ['-0.1', .744]].map(([s, v]) => ({t: 'text', txt: s, x: .056, y: v - .015, w: .044, h: .03, ...L, s: .017, al: 'r', pad: 0})),
        ...[0, 10, 20, 30, 40, 50, 60].map((v, k) => ({t: 'text', txt: v, x: cx0 + k * .0912 - .02, y: .76, w: .04, h: .03, ...L, s: .017, al: 'c'})),
        {t: 'text', txt: '68', x: .79, y: .135, w: .13, h: .115, c: '#F7931E', s: .118, wt: 800, al: 'r', pad: 0},
        {t: 'text', txt: 'm', x: .928, y: .18, w: .04, h: .04, c: '#F7931E', s: .024, wt: 700, pad: 0},
        {t: 'text', txt: '90', x: .8, y: .272, w: .12, h: .08, c: '#F2E600', s: .072, wt: 800, al: 'r', pad: 0},
        {t: 'text', txt: 'i', x: .93, y: .3, w: .03, h: .04, c: '#F2E600', s: .024, wt: 700, pad: 0},
        ...['Screen shot', 'ANI navigation', 'Events', 'Parameters'].map((s, k) => ({t: 'button', x: .757, y: .364 + k * .084, w: .213, h: .072, ...AB, txt: s})),
        {t: 'text', txt: 'Energy', x: .757, y: .728, w: .12, h: .046, c: '#FFFFFF', s: .03, wt: 700, pad: 0},
        {t: 'text', txt: '0.35', x: .86, y: .726, w: .1, h: .05, c: '#FFFFFF', s: .037, wt: 700, al: 'c'},
        {t: 'text', txt: 'Quality', x: .757, y: .808, w: .1, h: .04, c: '#FFFFFF', s: .027, wt: 500, pad: 0},
        {t: 'text', txt: 'Signal', x: .757, y: .85, w: .1, h: .04, c: '#FFFFFF', s: .027, wt: 500, pad: 0},
        {t: 'button', x: .857, y: .816, w: .114, h: .07, fill: '#48EC48', stroke: '#2C9A2C', lw: .002, r: .002, txt: 'Good', c: '#16201A', s: .022, wt: 600},
        {t: 'button', x: .757, y: .896, w: .213, h: .072, ...AB, txt: 'Reset ECG'}
      ], draw(g, t, {W, H, WAVE}) {
        const X = u => u * W, Yv = v => v * H;
        const word = (parts, x, y, px, wt = 300) => { g.font = `${wt} ${Math.round(px)}px ${SANS}`; g.textBaseline = 'middle'; g.textAlign = 'left'; parts.forEach(([s, c]) => { g.fillStyle = c; g.fillText(s, x, y); x += g.measureText(s).width; }); return x; };
        /* MDMS ve ANI logoları */
        word([['M', '#F2F2F2'], ['D', '#E8873A'], ['MS', '#F2F2F2']], X(.026), Yv(.068), H * .044, 300);
        const ax = word([['AN', '#F2F2F2']], X(.815), Yv(.068), H * .046, 300);
        g.fillStyle = '#9EA2A5'; g.fillRect(ax + W * .006, Yv(.048), H * .036, H * .036); g.fillStyle = '#F2F2F2'; g.fillRect(ax + W * .002, Yv(.043), H * .006, H * .05);
        /* ANI eğilim ızgarası ve eğrileri */
        const tv = v => Yv(.486 - .34 * v / 100), tu = u => X(cx0 + (cx1 - cx0) * u);
        g.strokeStyle = '#4C5155'; g.lineWidth = 1;
        [20, 40, 60, 80].forEach(v => { g.beginPath(); g.moveTo(tu(0), tv(v)); g.lineTo(tu(1), tv(v)); g.stroke(); });
        [.215, .415, .538, .672].forEach(u => { g.beginPath(); g.moveTo(X(u), tv(100)); g.lineTo(X(u), tv(0)); g.stroke(); });
        const ANIm = [[0, 25], [.05, 34], [.11, 40], [.19, 55], [.25, 64], [.3, 52], [.37, 37], [.46, 40], [.52, 49], [.59, 72], [.65, 88], [.705, 96], [.75, 81], [.8, 52], [.86, 28], [.89, 21], [.94, 37], [1, 68]];
        const ANIi = [[0, 28], [.04, 40], [.09, 43], [.15, 60], [.19, 68], [.23, 59], [.26, 67], [.3, 55], [.34, 38], [.38, 37], [.41, 55], [.45, 34], [.5, 43], [.56, 81], [.61, 99], [.65, 88], [.69, 90], [.74, 52], [.77, 22], [.8, 28], [.83, 20], [.87, 21], [.92, 55], [1, 90]];
        g.save(); g.beginPath(); g.rect(tu(0), tv(100), tu(1) - tu(0), tv(0) - tv(100)); g.clip();
        g.lineWidth = H * .0035; g.strokeStyle = '#E9E23A'; g.beginPath();
        for (let x = 0; x <= 1.0001; x += .004) { const y = tv(crv(ANIi, x) + 2.2 * Math.sin(x * 90)); x ? g.lineTo(tu(x), y) : g.moveTo(tu(x), y); } g.stroke();
        g.lineWidth = H * .008; g.strokeStyle = '#F7931E'; g.lineJoin = 'round'; g.beginPath();
        for (let x = 0; x <= 1.0001; x += .004) { const y = tv(crv(ANIm, x)); x ? g.lineTo(tu(x), y) : g.moveTo(tu(x), y); } g.stroke();
        g.restore();
        /* Solunum modülasyonu: noktalı zarf, dikey işaretler ve turkuaz sinyal */
        const ru = s => X(cx0 + (cx1 - cx0) * s / 64), rv = a => Yv(.655 - .089 * a / .1), env = s => .085 * (.62 + .38 * Math.sin(s * .21 + 1.1));
        g.fillStyle = '#5D6266';
        for (let s = 0; s < 64; s += .55) { const e = env(s); for (let a = -e; a <= e; a += .011) g.fillRect(ru(s), rv(a), 1.6, 1.6); }
        g.fillStyle = '#C8CDD0'; [16, 31.5, 47.5].forEach(s => g.fillRect(ru(s) - 1, Yv(.562), 2.5, Yv(.183)));
        g.strokeStyle = '#3FB7A9'; g.lineWidth = H * .003; g.beginPath();
        for (let s = 0; s <= 64; s += .08) { const a = env(s) * (Math.sin(s * 1.42 + t * .25) * .75 + Math.sin(s * 3.1 + 2) * .25); s ? g.lineTo(ru(s), rv(a)) : g.moveTo(ru(s), rv(a)); } g.stroke();
        /* EKG ve R dalgası işaretleri (sarı) */
        const e0 = .108, e1 = .662, per = .107, ph = (t * .15) % 1;
        g.strokeStyle = '#3FC85A'; g.lineWidth = H * .0028; g.beginPath();
        for (let u = e0; u <= e1; u += .0012) { const v = WAVE.ecg((u - e0) / per - ph + 10.11); const y = Yv(.884) - v * H * .05; u === e0 ? g.moveTo(X(u), y) : g.lineTo(X(u), y); } g.stroke();
        g.fillStyle = '#E8D21E';
        for (let k = -1; k < 7; k++) { const u = e0 + (k + ph) * per; if (u < e0 - .001 || u > e1) continue; g.fillRect(X(u) - H * .004, Yv(.818), H * .008, H * .008); g.fillRect(X(u) - H * .004, Yv(.962), H * .008, H * .008); }
        /* Yön oku */
        g.fillStyle = '#8D9297'; g.beginPath(); g.moveTo(X(.773), Yv(.148)); g.lineTo(X(.795), Yv(.205)); g.lineTo(X(.783), Yv(.205)); g.lineTo(X(.783), Yv(.338));
        g.lineTo(X(.763), Yv(.338)); g.lineTo(X(.763), Yv(.205)); g.lineTo(X(.751), Yv(.205)); g.closePath(); g.fill();
        g.fillStyle = '#2E3338'; g.font = `600 ${Math.round(H * .02)}px ${SANS}`; g.textAlign = 'center'; g.fillText('pΣ', X(.773), Yv(.232)); g.textAlign = 'left';
        /* Dikey eksen başlıkları */
        const vtxt = (s, x, y) => { g.save(); g.translate(X(x), Yv(y)); g.rotate(-Math.PI / 2); g.fillStyle = '#D3D7DA'; g.font = `500 ${Math.round(H * .018)}px ${SANS}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, 0, 0); g.restore(); };
        vtxt('Analgesia Nociception Index', .046, .316); vtxt('Mod Respiratory', .046, .655); vtxt('ECG', .046, .884);
        /* Tuşlarda üst ışık / alt gölge kenarı */
        [[.592, .036, .216], [.757, .364, .213], [.757, .448, .213], [.757, .532, .213], [.757, .616, .213], [.757, .896, .213]].forEach(([x, y, w]) => {
          g.fillStyle = 'rgba(255,255,255,.16)'; g.fillRect(X(x) + 2, Yv(y) + 2, X(w) - 4, H * .006);
          g.fillStyle = 'rgba(0,0,0,.45)'; g.fillRect(X(x) + 2, Yv(y + .072) - H * .008, X(w) - 4, H * .006);
        });
      }};
    })(),
    shell(body, {w, h, d}) {
      const zF = d / 2;
      /* Gümüş ön kasa, açık gri arka kapak ve aradaki koyu conta çizgisi */
      put(body, sqSlab(w, h, .03, .036, .0055, M.metal(0xBAC0C5, .3), .003), 0, 0, zF - .015);
      put(body, sqSlab(w - .018, h - .018, .003, .032, 0, M.matte(0x3A3F44, .6), .0025), 0, 0, zF - .0305);
      put(body, sqSlab(w - .028, h - .028, .03, .03, .009, M.plastic(0xC9CDD0, .55), .002), 0, 0, zF - .041);
      /* Turuncu kenar çizgisi ve tüm ön yüzü kaplayan parlak siyah cam */
      put(body, sqSlab(w - .006, h - .006, .0036, .033, 0, std3(0xCF6A24, .32, .35), .0028), 0, 0, zF + .0003);
      put(body, sqSlab(w - .0095, h - .0095, .002, .031, 0, M.plastic(0x060709, .05), .0026), 0, 0, zF + .0031);
      const zf = zF + .0041;
      /* MDMS logosu (ince harfler, küçük EKG çizgisi ve alt yazı) */
      put(body, decal(.064, .022, (c, W, Hh) => {
        c.clearRect(0, 0, W, Hh); c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillStyle = '#C5C9CC'; c.font = `200 ${Math.round(Hh * .62)}px ${SANS}`; c.fillText('MDMS', W * .54, Hh * .4);
        c.strokeStyle = '#B8573A'; c.lineWidth = Hh * .03; c.beginPath(); c.moveTo(W * .12, Hh * .8); c.lineTo(W * .2, Hh * .8); c.lineTo(W * .23, Hh * .6); c.lineTo(W * .26, Hh * .92); c.lineTo(W * .29, Hh * .8); c.lineTo(W * .36, Hh * .8); c.stroke();
        c.fillStyle = '#8E9397'; c.font = `500 ${Math.round(Hh * .11)}px ${SANS}`; c.fillText('Mdoloris Medical Systems', W * .6, Hh * .82);
      }, 512), 0, .097, zf + .0002);
      /* ANI logosu: turuncu "AN", gri kare üzerinde beyaz "I" */
      put(body, decal(.03, .011, (c, W, Hh) => {
        c.clearRect(0, 0, W, Hh); c.textBaseline = 'middle'; c.font = `300 ${Math.round(Hh * .8)}px ${SANS}`; c.fillStyle = '#C0703A'; c.fillText('AN', 2, Hh * .54);
        const x = 2 + c.measureText('AN').width; c.fillStyle = '#6C7276'; c.fillRect(x + W * .035, Hh * .2, Hh * .6, Hh * .6); c.fillStyle = '#E6E9EB'; c.fillRect(x, Hh * .12, W * .045, Hh * .8);
      }, 256), .0835, -.096, zf + .0002);
      /* Açma düğmesi: koyu metal bilezik, yeşil ışıklı halka, parlak siyah düğme ve yeşil simge */
      const pb = new THREE.Group(); pb.position.set(0, -.1, zf); body.add(pb);
      put(pb, cyl(.0088, .0088, .0012, M.metal(0x3B4045, .3), 40), 0, 0, .0004, Math.PI / 2);
      put(pb, new THREE.Mesh(new THREE.TorusGeometry(.0069, .0008, 10, 48), M.led(0x3BE060)), 0, 0, .0011);
      put(pb, cyl(.0061, .0061, .0018, M.plastic(0x0B0D0F, .15), 40), 0, 0, .0009, Math.PI / 2);
      put(pb, decal(.0075, .0075, (c, W, Hh) => { c.clearRect(0, 0, W, Hh); c.strokeStyle = '#46E86A'; c.lineWidth = W * .1; c.lineCap = 'round'; c.beginPath(); c.arc(W / 2, Hh * .54, W * .3, -Math.PI * .32, Math.PI * 1.32); c.stroke(); c.beginPath(); c.moveTo(W / 2, Hh * .12); c.lineTo(W / 2, Hh * .5); c.stroke(); }, 128), 0, 0, .0019);
      /* Arka kapak: havalandırma yarıkları, hoparlör ızgarası ve etiket */
      const zB = zF - .056, slot = new THREE.BoxGeometry(.022, .0022, .002), slotM = M.matte(0x5A6066, .7);
      for (let k = 0; k < 9; k++) [-1, 1].forEach(s => { const m = new THREE.Mesh(slot, slotM); m.position.set(s * .07, .055 + k * .0055 - .022, zB - .0004); body.add(m); });
      const back = decal(.05, .05, (c, W, Hh) => { c.clearRect(0, 0, W, Hh); c.fillStyle = '#4A5056'; for (let i = -6; i <= 6; i++) for (let j = -6; j <= 6; j++) if (i * i + j * j <= 36) { c.beginPath(); c.arc(W / 2 + i * W * .07, Hh / 2 + j * Hh * .07, W * .018, 0, 7); c.fill(); } }, 256);
      put(body, back, -.07, -.05, zB - .0003, 0, Math.PI);
      const lab = decal(.07, .035, (c, W, Hh) => { c.fillStyle = '#F4F5F5'; c.fillRect(0, 0, W, Hh); c.fillStyle = '#2B3238'; c.font = `700 ${Math.round(Hh * .16)}px ${SANS}`; c.fillText('ANI Monitor V2', W * .05, Hh * .22); c.font = `500 ${Math.round(Hh * .1)}px ${SANS}`; ['MDoloris Medical Systems', 'REF ANI-MON-V2   SN 2104-0187', '12 V ⎓ 2.5 A      IP21'].forEach((s, k) => c.fillText(s, W * .05, Hh * (.45 + k * .17))); c.strokeStyle = '#2B3238'; c.lineWidth = 2; c.strokeRect(W * .8, Hh * .6, W * .14, Hh * .3); c.fillText('CE', W * .82, Hh * .78); }, 512);
      put(body, lab, .065, -.055, zB - .0003, 0, Math.PI);
      const sc = new THREE.CylinderGeometry(.0022, .0022, .0016, 12), scM = M.metal(0x8C9298, .35);
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => { const m = new THREE.Mesh(sc, scM); m.rotation.x = Math.PI / 2; m.position.set(a * .108, b * .086, zB - .0003); body.add(m); });
      return zf;
    },
    stand(g, {w, h, d, parts, toW, body}) {
      /* VESA plakası (4 vida), menteşe bloğu; menteşeden ağır tabana inen eğik kol, yan sıkma topuzları */
      const zB = d / 2 - .056, MET = M.metal(0x9EA5AB, .32), DK = M.matte(0x34393E, .55);
      put(body, rbox(.075, .075, .005, .004, M.metal(0x878D93, .4)), 0, 0, zB - .0022);
      const scr = new THREE.CylinderGeometry(.0028, .0028, .002, 14), scrM = M.metal(0x50565C, .35);
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => { const m = new THREE.Mesh(scr, scrM); m.rotation.x = Math.PI / 2; m.position.set(a * .025, b * .025, zB - .0052); body.add(m); });
      put(body, rbox(.05, .034, .016, .005, DK), 0, -.014, zB - .012);
      const hp = toW(0, -.02, zB - .022);
      put(g, cyl(.0095, .0095, .07, MET, 28), hp.x, hp.y, hp.z, 0, 0, Math.PI / 2);
      [-1, 1].forEach(s => {
        put(g, cyl(.0125, .0125, .009, DK, 18), s * .0395, hp.y, hp.z, 0, 0, Math.PI / 2);
        put(g, cyl(.006, .006, .0095, MET, 18), s * .0398, hp.y, hp.z, 0, 0, Math.PI / 2);
      });
      const bp = V3(0, .012, -.09);
      g.add(beam(bp, hp.clone().add(V3(0, -.006, -.004)), .046, .014, MET));
      put(g, rbox(.056, .014, .03, .006, MET), 0, .017, -.09);
      /* Taban: oval köşeli metal plaka, altında lastik halka */
      put(g, rbox(.18, .01, .135, .04, M.metal(0x6E757C, .36)), 0, .008, -.045);
      put(g, rbox(.172, .003, .127, .037, M.rubber()), 0, .0015, -.045);
      parts.push({key: 'mount', at: V3(.07, .016, -.02)});
    },
    extra(g, {w, h, d, parts, toW, body}) {
      const zF = d / 2, zs = zF - .015, xs = w / 2 + .001;
      parts.push({key: 'a-power', at: toW(0, -.1, zF + .012)});
      /* Sağ yan: hasta kablosu soketi (turuncu bilezik) ve takılı fiş */
      put(body, cyl(.0068, .0068, .006, std3(0xD0732C, .35, .55), 28), xs + .002, -.05, zs, 0, 0, Math.PI / 2);
      put(body, cyl(.0062, .0062, .022, M.matte(0x5E656B, .5), 28), xs + .015, -.05, zs, 0, 0, Math.PI / 2);
      put(body, cyl(.0063, .0063, .003, M.metal(0xB9BFC4, .3), 28), xs + .0055, -.05, zs, 0, 0, Math.PI / 2);
      put(body, cyl(.0045, .0028, .018, M.matte(0x5E656B, .6), 20), xs + .035, -.05, zs, 0, 0, Math.PI / 2);
      /* USB ×2 ve güç girişi, küçük baskı etiketleri */
      const usbS = new THREE.BoxGeometry(.0022, .0125, .0048), usbI = new THREE.BoxGeometry(.0026, .011, .003), usbT = new THREE.BoxGeometry(.003, .009, .0011);
      const mS = M.metal(0xA9B0B6, .3), mI = M.matte(0x0E1012, .6), mT = M.color(0x2F6FD1, .45);
      [-.002, .016].forEach(y => { [[usbS, mS], [usbI, mI], [usbT, mT]].forEach(([geo, mat]) => { const m = new THREE.Mesh(geo, mat); m.position.set(xs, y, zs); body.add(m); }); });
      put(body, cyl(.0042, .0042, .003, M.metal(0xA9B0B6, .3), 20), xs + .0005, .045, zs, 0, 0, Math.PI / 2);
      put(body, cyl(.0024, .0024, .0034, M.matte(0x0E1012, .6), 16), xs + .0008, .045, zs, 0, 0, Math.PI / 2);
      [['ANI', -.05, '#2B3238'], ['USB', .007, '#2B3238'], ['12V', .045, '#2B3238']].forEach(([s, y, ink]) => put(body, text(s, .014, .0045, ink, 700, 'center'), xs + .0015, y + (s === 'ANI' ? .011 : s === 'USB' ? .016 : .008), zs, 0, Math.PI / 2));
      parts.push({key: 'port', at: toW(xs + .02, -.05, zs)});
      /* Hasta kablosu → konektör → iki elektrotlu ANI sensörü */
      const C = V3(.17, .009, .12), MW = M.matte(0x5E656B, .5);
      cable(g, [toW(xs + .044, -.05, zs), toW(xs + .07, -.06, zs + .01), V3(w / 2 + .04, .02, .04), V3(.17, .006, .07), V3(C.x - .045, .007, C.z), V3(C.x - .03, .009, C.z)], .0026, 0x5E656B);
      put(g, cyl(.0045, .003, .016, MW, 18), C.x - .03, C.y, C.z, 0, 0, -Math.PI / 2);
      put(g, rbox(.046, .016, .024, .006, MW), C.x, C.y, C.z);
      put(g, box(.004, .0166, .0246, std3(0xD0732C, .35, .4)), C.x + .016, C.y, C.z);
      put(g, text('ANI', .02, .007, '#E9ECEE', 700, 'center'), C.x - .004, C.y + .0081, C.z, -Math.PI / 2);
      put(g, box(.02, .0025, .015, M.plastic(0xF4F6F7, .5)), C.x + .031, .007, C.z);
      put(g, text('ANI Sensor', .016, .005, '#C0703A', 700, 'center'), C.x + .033, .0084, C.z, -Math.PI / 2);
      const foam = new THREE.CylinderGeometry(.02, .02, .0014, 44), ringG = new THREE.CylinderGeometry(.0135, .0135, .0016, 40), inG = new THREE.CylinderGeometry(.0118, .0118, .0017, 40), gelG = new THREE.CylinderGeometry(.0085, .0085, .0018, 36);
      const mF = M.plastic(0xF6F7F7, .85), mR = M.color(0xE07A2E, .6), mG = M.color(0xB7C2C8, .25);
      [[.085, .205, -1], [.255, .2, 1]].forEach(([ex, ez, sd], k) => {
        const e = new THREE.Group(); e.position.set(ex, 0, ez); g.add(e);
        [[foam, mF, .0007], [ringG, mR, .0008], [inG, mF, .00085], [gelG, mG, .0009]].forEach(([geo, mat, y]) => { const m = new THREE.Mesh(geo, mat); m.position.y = y; m.castShadow = true; e.add(m); });
        put(e, box(.012, .0014, .011, M.clear(0xE9F2F5, .7)), sd * -.02, .0007, -.006);
        put(e, cyl(.0032, .0032, .0035, M.metal(), 16), 0, .0026, 0);
        put(e, rbox(.011, .004, .007, .0018, M.plastic(0xF4F6F7, .5)), sd * -.005, .0042, 0);
        put(e, text(String(k + 1), .006, .006, '#C0703A', 800, 'center'), 0, .0019, .015, -Math.PI / 2);
        cable(g, [V3(C.x + .041, .007, C.z + (k ? .003 : -.003)), V3(C.x + .05 + sd * .01, .004, C.z + .03), V3((C.x + ex) / 2 + sd * .02, .0025, (C.z + ez) / 2 + .015), V3(ex + sd * -.01, .0045, ez - .004)], .0011, 0xF2F4F5);
      });
      parts.push({key: 'sensor', at: V3(.17, .02, .205)});
      parts.push({key: 'a-patcable', at: V3(C.x, C.y + .015, C.z)});
      parts.push({key: 'a-usb', at: toW(xs + .01, .007, zs)});
    }
  });

  /* NIPE: üretici gövde görseli yok; küçük genel monitör, kendi sensörü yok — çok parametreli monitörün analog EKG çıkışına bağlantı kablosu */
  DEV3D.model('nipe', {
    type: 'monitor', w: .2, h: .15, d: .07, body: 0xF3F0F2, bezel: 0x101418, led: false, mount: 'stand', keys: 2, stripe: 0xD27BA6,
    screen: {title: 'NIPE', accent: '#F2A3C8', waves: [{k: 'ecg', c: '#4FD18F', l: 'ECG in'}], extra: 'trend',
      params: [{l: 'NIPE', v: 61, c: '#F2A3C8', big: true, live: true}, {l: 'HR', v: '128', u: '/min', c: '#4FD18F'}, {l: 'Q', v: '●', c: '#4FD18F'}]},
    extra(g, ctx) {
      const plug = new THREE.Group(); plug.add(put(new THREE.Group(), cyl(.006, .006, .03, M.matte(0x3A4148)), -.015, .006, 0, 0, 0, Math.PI / 2)); plug.add(put(new THREE.Group(), cyl(.003, .003, .012, M.metal()), -.035, .006, 0, 0, 0, Math.PI / 2));
      sideWire(g, ctx.parts, ctx, [-.02, ctx.d / 2 + .1], plug, 'a-ecgin');
    }
  });
  T('a-ecgin', {tr: ['EKG bağlantı kablosu', 'Cihazı çok parametreli monitörün analog EKG çıkışına bağlar; ölçüm o monitörün EKG elektrotlarından gelen sinyalle yapılır.'], en: ['ECG connection cable', 'Connects the device to the analog ECG output of the multiparameter monitor; measurement uses the signal from that monitor’s ECG electrodes.'], es: ['Cable de conexión de ECG', 'Conecta el equipo a la salida analógica de ECG del monitor multiparamétrico; la medición usa la señal de los electrodos de ECG de ese monitor.']});

  /* NOL (Medasense PMD-200): üretici görseline ve kılavuza göre (G 240 × Y 193 × D 150 mm, 8,4" 4:3 dokunmatik ekran) beyaz, kenarları
     kalın yuvarlatılmış ön kasa ve koyu kırmızı arka kasa; solda gümüş çerçeveli siyah cam ekran, sağda kırmızı açılı çizgiyle sınırlı
     hafif kabarık panelde kırmızı açma düğmesi, altında parmak probu soketi; altta MEDASENSE ve PMD 200 yazıları.
     Arkada dikey tutma yeri, direk/ray kelepçesi, vidalı arka panel kapağı (RS232, güç girişi ve anahtarı); sağ yanda USB.
     Kablolu çok sensörlü parmak probu (PPG, sıcaklık, ivmeölçer) ve üstüne çıtçıtla takılan tek kullanımlık GSR sensörü + yapışkan bant. */
  T('a-gsr', {tr: ['Tek kullanımlık sensör', 'Probun üst yüzüne iki çıtçıtla takılan, hidrojelli deri iletkenliği (GSR) sensörüdür; her hastada yenisi kullanılır, uzun izlemde en az 24 saatte bir değiştirilir.'], en: ['Single-use sensor', 'Hydrogel skin conductance (GSR) sensor attached to the top of the probe with two snaps; a new one is used for each patient and, in long monitoring, replaced at least every 24 hours.'], es: ['Sensor de un solo uso', 'Sensor de conductancia cutánea (GSR) con hidrogel que se fija a la parte superior de la sonda con dos broches; se usa uno nuevo para cada paciente y, en monitorización prolongada, se cambia al menos cada 24 horas.']});
  T('a-rs232', {tr: ['RS232 bağlantı noktası', 'Arka paneldeki, üreticinin onayladığı hasta monitörleri ya da bilgi sistemleriyle veri bağlantısı içindir; bilgisayar ağına bağlanmaz, kullanılmadığında kapağı kapalı tutulur.'], en: ['RS232 port', 'Rear-panel port for data connection to manufacturer-approved patient monitors or information systems; it is not connected to a computer network and its cover is kept closed when not in use.'], es: ['Puerto RS232', 'Puerto del panel trasero para la conexión de datos con monitores de paciente o sistemas de información aprobados por el fabricante; no se conecta a una red informática y su tapa se mantiene cerrada cuando no se usa.']});
  DEV3D.model('nol', {
    type: 'a-tab', w: .24, h: .193, d: .15, elev: .007, scr: [-.013, .0105, .171, .128], px: 1280,
    /* Ekran üretici görselindeki gibi (4:3): üstte AC güç simgeli yeşil pil ve saat; SIGNALS kutusunda dört ham sinyal (Pleth, Conductance,
       Skin Temp, Movement), ortada büyük NOL değeri, sağda alttan dolan kırmızı→beyaz NOL düzey çubuğu; altta oturum süreli NOL TREND
       (noktalı ızgara, gri ham ve kırmızı düzgünleştirilmiş eğri, 0–10 dk) ve kabartma yazılım tuşları (STOP beyaz) */
    screen: (() => {
      const L = {c: '#D9DEE1', s: .021, wt: 500};
      return {bg: '#000', layout: [
        {t: 'text', txt: '11:10:43', x: .7, y: .0, w: .29, h: .075, c: '#FFFFFF', s: .054, wt: 500, al: 'r'},
        {t: 'box', x: .004, y: .08, w: .992, h: .33, stroke: '#D8DEE2', lw: .004},
        {t: 'box', x: .372, y: .08, w: .513, h: .33, stroke: '#D8DEE2', lw: .004},
        {t: 'text', txt: 'SIGNALS', x: .01, y: .088, w: .2, h: .042, c: '#FFFFFF', s: .03, wt: 800},
        {t: 'box', x: .03, y: .135, w: .33, h: .265, fill: '#11171B'},
        ...[['1 - Pleth', .195], ['2 - Conductance', .255], ['3 - Skin Temp', .318], ['4 - Movement', .382]].map(([s, v]) => ({t: 'text', txt: s, x: .042, y: v - .015, w: .25, h: .03, ...L})),
        {t: 'text', txt: 'NOL', x: .376, y: .086, w: .2, h: .085, c: '#FFFFFF', s: .078, wt: 800},
        {t: 'text', txt: '58', x: .372, y: .15, w: .513, h: .24, c: '#FFFFFF', s: .19, wt: 500, al: 'c'},
        {t: 'box', x: .004, y: .415, w: .992, h: .475, stroke: '#D8DEE2', lw: .004},
        {t: 'text', txt: 'NOL TREND', x: .01, y: .424, w: .2, h: .045, c: '#FFFFFF', s: .03, wt: 800},
        {t: 'text', txt: 'Session Time:  00:10:26', x: .25, y: .424, w: .42, h: .045, c: '#FFFFFF', s: .03, wt: 700},
        ...[100, 75, 50, 25, 0].map((v, k) => ({t: 'text', txt: v, x: .02, y: .475 + k * .08625, w: .05, h: .03, ...L, s: .018, al: 'r', pad: 0})),
        ...[0, 2, 4, 6, 8, 10].map((v, k) => ({t: 'text', txt: v, x: .075 + k * .175 - .02, y: .842, w: .04, h: .03, ...L, s: .018, al: 'c'})),
        {t: 'text', txt: 'min', x: .9, y: .846, w: .09, h: .04, c: '#FFFFFF', s: .032, wt: 800, al: 'r'}
      ], draw(g, t, {W, H, WAVE}) {
        const X = u => u * W, Yv = v => v * H;
        /* AC güçte yeşil pil (fişli) */
        g.fillStyle = '#3DBE3A'; g.fillRect(X(.565), Yv(.012), X(.026), Yv(.058)); g.fillRect(X(.572), Yv(.004), X(.012), Yv(.01));
        g.fillStyle = '#FFFFFF'; g.fillRect(X(.574), Yv(.036), X(.008), Yv(.018)); g.fillRect(X(.5735), Yv(.026), X(.0018), Yv(.012)); g.fillRect(X(.5807), Yv(.026), X(.0018), Yv(.012)); g.fillRect(X(.5768), Yv(.052), X(.0025), Yv(.012));
        /* Sinyaller */
        const sx0 = X(.04), sx1 = X(.35);
        const sig = (c, v0, f, lw = 2) => { g.strokeStyle = c; g.lineWidth = lw; g.beginPath(); for (let x = sx0; x <= sx1; x += 2) { const u = (x - sx0) / (sx1 - sx0), y = Yv(v0) - f(u) * H; x === sx0 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); };
        sig('#E5D23C', .166, u => WAVE.pleth(u * 9 + t * .9) * .022);
        sig('#8BD14A', .232, u => u * .016 + .0015 * Math.sin(u * 40 + t));
        sig('#E0508A', .296, u => u * .02 + .001 * Math.sin(u * 17));
        sig('#38B6C8', .36, u => .006 * (Math.sin(u * 55 + t * 2) * .5 + Math.sin(u * 131 + t * 3) * .3 + Math.sin(u * 13) * .4));
        /* NOL düzey çubuğu: alttan %58 dolu, üstte kırmızı → altta beyaz */
        const bx = X(.887), bw = X(.108), top = Yv(.083), bot = Yv(.407), y = bot - (bot - top) * .62;
        const gr = g.createLinearGradient(0, y, 0, bot); gr.addColorStop(0, '#E2202A'); gr.addColorStop(.45, '#EE5A62'); gr.addColorStop(1, '#FFFFFF'); g.fillStyle = gr; g.fillRect(bx, y, bw, bot - y);
        /* NOL eğilimi */
        const x0 = X(.075), x1 = X(.95), yT = Yv(.49), yB = Yv(.835), Yn = v => yB - (yB - yT) * v / 100, Xm = m => x0 + (x1 - x0) * m / 10;
        g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 1.2; g.setLineDash([2, 5]);
        for (let m = 2; m <= 10; m += 2) { g.beginPath(); g.moveTo(Xm(m), yT); g.lineTo(Xm(m), yB); g.stroke(); }
        [25, 50, 75, 100].forEach(v => { g.beginPath(); g.moveTo(x0, Yn(v)); g.lineTo(x1, Yn(v)); g.stroke(); }); g.setLineDash([]);
        g.strokeStyle = '#E6EBEE'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x0, yT); g.lineTo(x0, yB); g.lineTo(x1, yB); g.stroke();
        for (let m = 0; m <= 10; m += 2) { g.beginPath(); g.moveTo(Xm(m), yB); g.lineTo(Xm(m), yB + 5); g.stroke(); }
        const NOL = [[0, 45], [.15, 58], [.3, 55], [.8, 26], [1.1, 28], [1.3, 38], [1.55, 22], [1.8, 15], [2.3, 17], [2.8, 20], [3.2, 24], [3.45, 28], [3.7, 18], [4.1, 9], [4.6, 7], [4.9, 9], [5.3, 5], [6, 4], [7, 3.5], [7.9, 3], [8.15, 4], [8.6, 17], [9.1, 30], [9.5, 40], [10, 48]];
        g.strokeStyle = '#A9B0B5'; g.lineWidth = 1.2; g.beginPath();
        for (let m = 0; m <= 10; m += .02) { const v = Math.max(0, crv(NOL, m) + 3.5 * Math.sin(m * 37) * Math.sin(m * 5.3 + 1) + 1.5 * Math.sin(m * 91)); m ? g.lineTo(Xm(m), Yn(v)) : g.moveTo(Xm(m), Yn(v)); } g.stroke();
        g.strokeStyle = '#E2202A'; g.lineWidth = H * .0075; g.lineJoin = 'round'; g.beginPath();
        for (let m = 0; m <= 10; m += .02) { const v = Math.max(1, crv(NOL, m)); m ? g.lineTo(Xm(m), Yn(v)) : g.moveTo(Xm(m), Yn(v)); } g.stroke();
        /* Menü çubuğu: kabartma tuşlar */
        const by = Yv(.895), bh = Yv(.103);
        [['STOP ■', 0, .128], ['PATIENT', .13, .172], ['NOL TREND', .304, .172], ['SIGNALS', .478, .172], ['EVENTS', .652, .172], ['EXPORT', .826, .172]].forEach(([s, x, w], k) => {
          const gx = X(x), gw = X(w), gb = g.createLinearGradient(0, by, 0, by + bh);
          if (k) { gb.addColorStop(0, '#A3A9AE'); gb.addColorStop(1, '#6E757B'); } else { gb.addColorStop(0, '#FFFFFF'); gb.addColorStop(1, '#DADFE2'); }
          g.fillStyle = gb; g.fillRect(gx, by, gw, bh);
          g.fillStyle = 'rgba(255,255,255,.55)'; g.fillRect(gx, by, gw, 2); g.fillRect(gx, by, 2, bh);
          g.fillStyle = 'rgba(0,0,0,.55)'; g.fillRect(gx, by + bh - 3, gw, 3); g.fillRect(gx + gw - 3, by, 3, bh);
          g.fillStyle = k === 0 ? '#11181C' : k === 5 ? '#C4C9CD' : '#F7F9FA'; g.font = `${k ? 500 : 700} ${Math.round(H * .03)}px ${SANS}`; g.textAlign = 'center'; g.textBaseline = 'middle';
          g.fillText(s, gx + gw / 2, by + bh / 2); g.textAlign = 'left';
        });
      }};
    })(),
    shell(body, {w, h, d}) {
      const zF = d / 2, WH = M.plastic(0xF2F3F3, .36), RED = M.plastic(0x7E1820, .38);
      /* Beyaz ön kasa, koyu kırmızı arka kasa ve aradaki conta çizgisi */
      put(body, sqSlab(w, h, .052, .034, .013, WH, .0015), 0, 0, zF - .026);
      put(body, sqSlab(w - .01, h - .01, .003, .031, 0, M.matte(0x4A1A1E, .6), .001), 0, 0, zF - .0525);
      put(body, sqSlab(w - .012, h - .012, .08, .03, .015, RED, .001), 0, 0, zF - .084);
      /* Gümüş çerçeve ve siyah cam */
      const gx = -.013, gy = .0105;
      put(body, plate(.187, .146, .002, .007, M.metal(0xA2A9AF, .3)), gx, gy, zF + .0004);
      put(body, plate(.183, .142, .002, .005, M.plastic(0x060709, .05)), gx, gy, zF + .0014);
      const zf = zF + .0024;
      /* Sağ panel: hafif kabarık altıgen yüzey, kenarında kırmızı çizgi, kırmızı açma düğmesi */
      const P = [[.116, .046], [.0905, .026], [.0905, -.016], [.116, -.035]], sh = new THREE.Shape();
      sh.moveTo(...P[0]); P.slice(1).forEach(p => sh.lineTo(...p)); sh.lineTo(.116, -.035); sh.closePath();
      const pg = new THREE.ExtrudeGeometry(sh, {depth: .0034, bevelEnabled: true, bevelThickness: .0012, bevelSize: .001, bevelSegments: 3});
      const pod = new THREE.Mesh(pg, WH); pod.castShadow = pod.receiveShadow = true; pod.position.z = zF - .0034; body.add(pod);
      const RL = [[.111, .0421], [.0889, .026], [.0889, -.016], [.111, -.0313]], rl = [];
      RL.slice(1).forEach(([x, y], k) => { const [x0, y0] = RL[k]; for (let i = k ? 1 : 0; i <= 6; i++) rl.push(V3(x0 + (x - x0) * i / 6, y0 + (y - y0) * i / 6, zF + .0006)); });
      body.add(tube(rl, .00075, M.color(0xD21F2B, .4), 96, 8));
      put(body, rbox(.02, .024, .008, .005, M.color(0xB2202A, .32)), .1015, .005, zF + .0045);
      put(body, decal(.009, .009, (c, W, Hh) => { c.clearRect(0, 0, W, Hh); c.strokeStyle = '#741118'; c.lineWidth = W * .1; c.lineCap = 'round'; c.beginPath(); c.arc(W / 2, Hh * .55, W * .3, -Math.PI * .3, Math.PI * 1.3); c.stroke(); c.beginPath(); c.moveTo(W / 2, Hh * .14); c.lineTo(W / 2, Hh * .5); c.stroke(); }, 128), .1015, .005, zF + .0087);
      /* Logolar: MEDASENSE (kırmızı/mavi halka simgesi) ve PMD 200 */
      put(body, decal(.08, .014, (c, W, Hh) => {
        c.clearRect(0, 0, W, Hh); const r = Hh * .42, cx = Hh * .5, cy = Hh * .5;
        [[r, '#D21F2B', -.9, .9], [r * .72, '#1F4E9E', -1.1, .7], [r * .45, '#1F4E9E', -1.3, .5]].forEach(([rr, col, a0, a1]) => { c.strokeStyle = col; c.lineWidth = Hh * .1; c.beginPath(); c.arc(cx, cy, rr, Math.PI * (1 + a0 * .5), Math.PI * (1 + a1 * .5)); c.stroke(); });
        c.fillStyle = '#273752'; c.font = `500 ${Math.round(Hh * .62)}px ${SANS}`; c.textBaseline = 'middle'; let x = Hh * 1.15;
        [...'MEDASENSE'].forEach(ch => { c.fillText(ch, x, Hh * .55); x += c.measureText(ch).width + W * .012; });
      }, 512), -.065, -.077, zF + .0002);
      put(body, decal(.034, .009, (c, W, Hh) => { c.clearRect(0, 0, W, Hh); c.textBaseline = 'middle'; c.font = `500 ${Math.round(Hh * .78)}px ${SANS}`; c.fillStyle = '#2A2F33'; c.fillText('PMD', 2, Hh * .55); const x = 2 + c.measureText('PMD ').width; c.fillStyle = '#D21F2B'; c.fillText('200', x, Hh * .55); }, 256), .088, -.083, zF + .0002);
      /* Arka: dikey tutma yeri (arka yüzle arasında boşluk), vidalı panel kapağı, RS232 kapağı, güç girişi ve anahtar, havalandırma, etiket */
      const zB = zF - .124;
      put(body, box(.11, .042, .001, M.matte(0x4A1218, .85)), 0, .05, zB - .0006);
      [-1, 1].forEach(s => put(body, rbox(.02, .05, .026, .006, RED), s * .064, .05, zB - .011));
      put(body, rbox(.15, .044, .013, .006, RED), 0, .051, zB - .0275);
      put(body, rbox(.1, .006, .004, .002, M.matte(0x6A161D, .6)), 0, .051, zB - .0346);
      put(body, rbox(.15, .075, .003, .004, M.plastic(0x8F1D25, .45)), 0, -.035, zB - .001);
      const scr = new THREE.CylinderGeometry(.0026, .0026, .002, 14), scrM = M.metal(0x9AA1A7, .35);
      [[-.068, -.004], [.068, -.004], [-.068, -.066], [.068, -.066]].forEach(([x, y]) => { const m = new THREE.Mesh(scr, scrM); m.rotation.x = Math.PI / 2; m.position.set(x, y, zB - .003); body.add(m); });
      put(body, rbox(.028, .02, .004, .002, M.matte(0x1B1E21, .6)), -.045, -.033, zB - .004);
      [-.007, 0, .007].forEach(x => put(body, box(.0016, .004, .002, M.metal(0xB9BFC4, .3)), -.045 + x, -.033 + (x ? -.002 : .003), zB - .0062));
      put(body, rbox(.012, .018, .005, .002, M.matte(0x1B1E21, .6)), -.02, -.033, zB - .0045);
      put(body, box(.009, .007, .002, M.matte(0x2B3035, .5)), -.02, -.029, zB - .0074, -.25);
      put(body, rbox(.024, .014, .003, .002, M.plastic(0x6E141B, .5)), .045, -.033, zB - .0035);
      put(body, cyl(.0018, .0018, .002, scrM, 12), .045, -.023, zB - .0055, Math.PI / 2);
      const slot = new THREE.BoxGeometry(.003, .018, .002), slotM = M.matte(0x3A1013, .7);
      for (let k = 0; k < 12; k++) { const m = new THREE.Mesh(slot, slotM); m.position.set(-.033 + k * .006, -.008, zB - .0032); body.add(m); }
      const lab = decal(.045, .016, (c, W, Hh) => { c.fillStyle = '#F2F3F3'; c.fillRect(0, 0, W, Hh); c.fillStyle = '#23292E'; c.font = `700 ${Math.round(Hh * .2)}px ${SANS}`; c.fillText('Medasense  PMD-200', W * .05, Hh * .3); c.font = `500 ${Math.round(Hh * .14)}px ${SANS}`; ['REF PMD200-2    SN 20-0418', '100–240 V~  50–60 Hz  700 mA'].forEach((s, k) => c.fillText(s, W * .05, Hh * (.58 + k * .24))); }, 512);
      put(body, lab, -.05, -.062, zB - .0026, 0, Math.PI);
      [['RS232', .045, -.0445], ['I/O', -.02, -.0445]].forEach(([s, x, y]) => put(body, text(s, .016, .005, '#F2E6E7', 700, 'center'), x, y, zB - .0028, 0, Math.PI));
      /* Sağ yan: USB (kırmızı kasada) */
      const xr = (w - .012) / 2 + .0006;
      put(body, box(.0022, .0125, .0048, M.metal(0xA9B0B6, .3)), xr, -.03, -.012);
      put(body, box(.0026, .011, .003, M.matte(0x0E1012, .6)), xr, -.03, -.012);
      put(body, box(.003, .009, .0011, M.color(0x2F6FD1, .45)), xr, -.03, -.012);
      put(body, text('USB', .014, .0045, '#F2E6E7', 700, 'center'), xr + .0012, -.016, -.012, 0, Math.PI / 2);
      /* Ön alt sağ: parmak probu soketi ve takılı fiş */
      put(body, cyl(.0078, .0078, .003, M.metal(0xA2A9AF, .3), 32), .1, -.053, zF + .0005, Math.PI / 2);
      put(body, cyl(.0068, .0068, .016, M.plastic(0xF4F6F7, .45), 32), .1, -.053, zF + .0095, Math.PI / 2);
      put(body, cyl(.0069, .0069, .0025, M.color(0x9AA3AA, .4), 32), .1, -.053, zF + .004, Math.PI / 2);
      put(body, cyl(.003, .0045, .018, M.plastic(0xF4F6F7, .5), 20), .1, -.053, zF + .026, Math.PI / 2);
      return zf;
    },
    stand(g, {w, h, d, parts}) {
      /* Lastik ayaklar ve arka direk/ray kelepçesi (sıkma topuzlu) */
      const foot = new THREE.CylinderGeometry(.009, .01, .007, 20), fm = M.rubber();
      [[-.085, .045], [.085, .045], [-.075, -.035], [.075, -.035]].forEach(([x, z]) => { const m = new THREE.Mesh(foot, fm); m.position.set(x, .0035, z); m.castShadow = true; g.add(m); });
      const y0 = .007 + h / 2 - .064, zB = d / 2 - .124, CM = M.metal(0x6A7077, .4);
      put(g, rbox(.05, .05, .02, .005, CM), 0, y0, zB - .01);
      put(g, rbox(.05, .012, .024, .004, CM), 0, y0 + .019, zB - .024);
      put(g, rbox(.05, .012, .024, .004, CM), 0, y0 - .019, zB - .024);
      put(g, cyl(.0035, .0035, .045, M.metal(0xC9D0D5, .25), 16), .03, y0, zB - .028, 0, 0, Math.PI / 2);
      put(g, cyl(.011, .011, .012, M.matte(0x2B3035, .6), 8), .058, y0, zB - .028, 0, 0, Math.PI / 2);
      put(g, cyl(.0065, .0065, .014, M.matte(0x1E2226, .6), 16), .068, y0, zB - .028, 0, 0, Math.PI / 2);
      parts.push({key: 'mount', at: V3(.06, y0, zB - .034)});
    },
    extra(g, {w, h, d, elev, parts}) {
      const zF = d / 2, yc = elev + h / 2;
      parts.push({key: 'a-power', at: V3(.1015, yc + .005, zF + .016)});
      parts.push({key: 'port', at: V3(.1, yc - .053, zF + .018)});
      /* Parmak probu: beyaz gövde, yanlarda yükseltilmiş beşik, gri parmak yatağı, uçta durdurucu ve üst kapak, kablo çıkışı */
      const pr = new THREE.Group(); pr.position.set(-.035, 0, .2); pr.rotation.y = .18; g.add(pr);
      const PW = M.plastic(0xEDEFF0, .42), PG = M.plastic(0xC9CED2, .45);
      /* Beşik: U kesitli gövde (üstte parmak kanalı), boyuna yumuşak kenarlı */
      const U = new THREE.Shape();
      U.moveTo(-.02, .026); U.lineTo(-.02, .008); U.quadraticCurveTo(-.02, 0, -.012, 0); U.lineTo(.012, 0); U.quadraticCurveTo(.02, 0, .02, .008); U.lineTo(.02, .026); U.lineTo(.0105, .026);
      U.absarc(0, .026, .0105, 0, -Math.PI, true); U.lineTo(-.02, .026);
      const ug = new THREE.ExtrudeGeometry(U, {depth: .068, bevelEnabled: true, bevelThickness: .0016, bevelSize: .0012, bevelSegments: 3, curveSegments: 16}); ug.translate(0, 0, -.034);
      const cr = new THREE.Mesh(ug, PW); cr.rotation.y = Math.PI / 2; cr.position.x = -.008; cr.castShadow = cr.receiveShadow = true; pr.add(cr);
      const liner = M.rubber(0x7F8990); liner.side = THREE.DoubleSide;
      put(pr, new THREE.Mesh(new THREE.CylinderGeometry(.0101, .0101, .066, 24, 1, true, Math.PI, Math.PI), liner), -.008, .026, 0, 0, 0, Math.PI / 2);
      /* Uçta parmak durdurucu ve optik başlık */
      put(pr, rbox(.016, .033, .043, .006, PG), .0335, .0165, 0);
      put(pr, rbox(.026, .01, .043, .0045, PG), .024, .0315, 0);
      put(pr, text('Medasense', .022, .005, '#273752', 600, 'center'), .024, .0315, .0218);
      /* Tek kullanımlık GSR sensörü: kanalı kaplayan ped, kenarlardan dışa kıvrılan kanatlar, iki çıtçıt; yapışkan bant */
      const padM = M.plastic(0xF7F8F9, .6); padM.side = THREE.DoubleSide;
      put(pr, new THREE.Mesh(new THREE.CylinderGeometry(.0098, .0098, .046, 24, 1, true, Math.PI + .2, Math.PI - .4), padM), -.016, .026, 0, 0, 0, Math.PI / 2);
      [-1, 1].forEach(s => put(pr, box(.04, .0011, .009, padM), -.016, .0302, s * .0128, s * 1.15));
      put(pr, box(.012, .0012, .016, M.color(0x2E6FB8, .5)), -.044, .027, 0, 0, 0, .35);
      [-.03, -.002].forEach(x => put(pr, cyl(.0026, .0026, .003, M.metal(), 14), x, .0168, 0));
      const band = new THREE.Shape(); band.moveTo(-.0222, -.0012); band.lineTo(.0222, -.0012); band.lineTo(.0222, .0302); band.lineTo(-.0222, .0302); band.closePath();
      const hole = new THREE.Path(); hole.moveTo(-.0208, .0002); hole.lineTo(.0208, .0002); hole.lineTo(.0208, .0288); hole.lineTo(-.0208, .0288); hole.closePath(); band.holes.push(hole);
      const bg = new THREE.ExtrudeGeometry(band, {depth: .012, bevelEnabled: false}); bg.translate(0, 0, -.006);
      const bm = new THREE.Mesh(bg, M.color(0x2E6FB8, .6)); bm.rotation.y = Math.PI / 2; bm.position.x = -.03; bm.castShadow = true; pr.add(bm);
      put(pr, cyl(.0032, .0048, .022, PW, 18), .052, .014, 0, 0, 0, -Math.PI / 2);
      pr.updateMatrixWorld(true);
      const pe = pr.localToWorld(V3(.063, .014, 0));
      cable(g, [V3(.1, yc - .053, zF + .035), V3(.1, yc - .065, zF + .06), V3(.12, .02, zF + .1), V3(.11, .006, zF + .15), V3(pe.x + .05, .006, pe.z + .01), V3(pe.x + .012, .01, pe.z), pe], .0028, 0xDDE1E4);
      parts.push({key: 'sensor', at: pr.localToWorld(V3(.02, .04, 0))});
      parts.push({key: 'handle', at: V3(0, yc + .05, zF - .124 - .03)});
      parts.push({key: 'a-usb', at: V3(w / 2 + .006, yc - .03, -.012)});
      parts.push({key: 'a-gsr', at: pr.localToWorld(V3(-.014, .03, 0))});
      parts.push({key: 'a-rs232', at: V3(.045, yc - .033, zF - .124 - .008)});
    }
  });
  /* Kablo üzerinde kutu (ön yükseltici / oksimetre kablosu) + iki alın pedi */
  function boxToPads(g, parts, ctx, {at, size, color, led, key, label}) {
    const {w, h, elev} = ctx, [bx, bz] = at, [sx, sy, sz] = size;
    put(g, rbox(sx, sy, sz, Math.min(sy, sz) * .35, M.plastic(color, .4)), bx, sy / 2, bz);
    if (label) put(g, text(label, sx * .6, .01, '#3A4148', 700, 'center'), bx, sy + .0006, bz, -Math.PI / 2);
    if (led) put(g, box(.012, .003, .004, M.led(led)), bx + sx * .3, sy + .001, bz + sz * .3);
    parts.push({key, at: V3(bx, sy + .02, bz)});
    const pt = V3(w / 2 + .004, elev + h * .3, 0);
    put(g, cyl(.007, .007, .01, M.color(0x2F7DD1, .4), 20), pt.x, pt.y, pt.z, 0, 0, Math.PI / 2);
    parts.push({key: 'port', at: pt.clone().add(V3(.012, 0, 0))});
    cable(g, [pt, pt.clone().add(V3(.03, -.01, .01)), V3(w / 2 + .03, .03, bz * .5), V3(bx + sx / 2 + .03, .01, bz), V3(bx + sx / 2, sy / 2, bz)], .003);
    nirsPair(g, V3(bx - sx / 2, sy / 2, bz), bx - .02, bz + .09, parts, 0x2E363C);
  }

  /* INVOS 7100: üretici gövde görseli yok; genel dokunmatik ekranlı monitör, mavi ışıklı ön yükseltici ve iki alın sensörü */
  DEV3D.model('invos-7100', {
    type: 'monitor', w: .3, h: .22, d: .07, body: 0xE9ECEE, bezel: 0x101418, led: false, mount: 'feet',
    screenMargin: [.02, .025, .02, .035],
    screen: {title: 'rSO₂', accent: '#5BB7DE', extra: 'nirs2',
      params: [{l: 'rSO₂ L', v: 64, c: '#4FD1BE', big: true, live: true}, {l: 'rSO₂ R', v: 66, c: '#F2C531', big: true, live: true}, {l: 'BL L', v: '68', c: '#4FD1BE'}, {l: 'BL R', v: '70', c: '#F2C531'}]},
    extra(g, ctx) { boxToPads(g, ctx.parts, ctx, {at: [.12, ctx.d / 2 + .09], size: [.07, .025, .045], color: 0xE4E8EA, led: 0x3E8BFF, key: 'a-preamp'}); }
  });

  /* ForeSight: üretici gövde görseli yok; genel ana monitöre bağlanan oksimetre kablosu (kutu) ve iki doku sensörü */
  DEV3D.model('foresight', {
    type: 'monitor', w: .32, h: .23, d: .08, body: 0xDDE1E4, bezel: 0x101418, led: false, mount: 'feet',
    screenMargin: [.02, .025, .02, .035],
    screen: {title: 'Tissue oximetry', accent: '#4FD1BE', extra: 'nirs2', trendLabel: 'StO₂',
      params: [{l: 'StO₂ 1', v: 71, u: '%', c: '#4FD1BE', big: true, live: true}, {l: 'StO₂ 2', v: 69, u: '%', c: '#F2C531', big: true, live: true}, {l: 'ΔStO₂ 1', v: '-2', u: '%', c: '#4FD1BE'}, {l: 'ΔStO₂ 2', v: '+1', u: '%', c: '#F2C531'}]},
    extra(g, ctx) { boxToPads(g, ctx.parts, ctx, {at: [.12, ctx.d / 2 + .09], size: [.1, .03, .06], color: 0xF2F4F5, led: 0x2E9E58, key: 'a-oxcable'}); }
  });
  T('a-oxcable', {tr: ['Oksimetre kablosu', 'Sensörlere ışık gönderip yansıyanı işleyen ve sonucu ana monitöre ileten kutulu kablodur; kanallara birden fazla sensör bağlanabilir.'], en: ['Oximeter cable', 'Boxed cable that drives the sensors, processes the returning light and passes the result to the host monitor; several sensors can be connected to its channels.'], es: ['Cable oxímetro', 'Cable con caja que activa los sensores, procesa la luz que vuelve y envía el resultado al monitor principal; admite varios sensores en sus canales.']});
  /* @son */
})();
