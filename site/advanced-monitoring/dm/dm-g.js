'use strict';
/* Cihaz yapılandırmaları G: hasta başı laboratuvar analizörleri, viskoelastik testler, el cihazları, nöromonitörizasyon,
   temel hasta monitörizasyonu. Kurucular: 'g-bench' (masaüstü analizör), 'g-visco' (kanallı viskoelastik analizör). */
(() => {
  if (!DEV3D) return;
  const {V3, M, rbox, box, cyl, sphere, torus, tube, put, makeScreen, decal, nameplate, sensorTip} = DEV3D.H;
  const T = DEV3D.partText;

  /* ---------- Ortak parça metinleri ---------- */
  T('g-inlet', {tr: ['Numune girişi', 'Şırınga ya da kapiller numunenin cihaza verildiği giriş noktasıdır; kapak açılınca ölçüm yolu numuneyi aspire eder.'], en: ['Sample inlet', 'Entry point where the syringe or capillary sample is presented to the analyzer; when the flap is opened the sample path aspirates the sample.'], es: ['Entrada de muestra', 'Punto donde se presenta la muestra de jeringa o capilar al analizador; al abrir la tapa, el circuito aspira la muestra.']});
  T('g-cartridge', {tr: ['Kartuş yuvası', 'Tek kullanımlık test kartuşu ya da sensör kaseti buraya takılır; kartuş tipi yapılacak testi belirler.'], en: ['Cartridge slot', 'The single-use test cartridge or sensor cassette is inserted here; the cartridge type determines the test performed.'], es: ['Ranura del cartucho', 'Aquí se inserta el cartucho de prueba de un solo uso o el casete de sensores; el tipo de cartucho determina la prueba.']});
  T('g-printer', {tr: ['Yazıcı', 'Sonuçların kâğıt çıktısını verir; sonuçlar ayrıca ağ üzerinden hasta kaydına aktarılabilir.'], en: ['Printer', 'Produces a paper printout of the results; results can also be transferred to the patient record over the network.'], es: ['Impresora', 'Imprime los resultados en papel; también pueden transferirse al registro del paciente por la red.']});
  T('g-door', {tr: ['Reaktif / çözelti bölmesi', 'Kalibrasyon ve kalite kontrol çözeltilerini, reaktif paketini ya da atık kabını barındıran bölmedir.'], en: ['Reagent / solution compartment', 'Compartment that holds the calibration and quality-control solutions, the reagent pack or the waste container.'], es: ['Compartimento de reactivos / soluciones', 'Compartimento que aloja las soluciones de calibración y control de calidad, el paquete de reactivos o el contenedor de residuos.']});
  T('g-sample', {tr: ['Numune şırıngası', 'Heparinli kan numunesi; havasız alınıp karıştırılarak analize verilir.'], en: ['Sample syringe', 'Heparinised blood sample; collected without air and mixed before analysis.'], es: ['Jeringa de muestra', 'Muestra de sangre heparinizada; se obtiene sin aire y se mezcla antes del análisis.']});
  T('g-scanner', {tr: ['Barkod okuyucu', 'Hasta, numune ve kartuş kimliğini okuyarak kayıt hatalarını azaltır.'], en: ['Barcode reader', 'Reads patient, sample and cartridge identifiers to reduce recording errors.'], es: ['Lector de código de barras', 'Lee los identificadores del paciente, la muestra y el cartucho para reducir errores de registro.']});

  /* ---------- Yardımcılar ---------- */
  /* Kan numunesi şırıngası (yatay, +x yönüne bakan uç) */
  function syringe(len = .09, r = .007, blood = 0x8E1B22) {
    const s = new THREE.Group();
    const barrel = cyl(r, r, len, M.clear(), 24, true); barrel.rotation.z = Math.PI / 2; s.add(barrel);
    const fill = cyl(r * .85, r * .85, len * .55, M.color(blood, .4), 20); fill.rotation.z = Math.PI / 2; fill.position.x = len * .18; s.add(fill);
    const plunger = cyl(r * .9, r * .9, .006, M.rubber(), 20); plunger.rotation.z = Math.PI / 2; plunger.position.x = -len * .1; s.add(plunger);
    const rod = box(len * .5, .002, r * 1.2, M.plastic(0xF4F6F7)); rod.position.x = -len * .35; s.add(rod);
    const thumb = cyl(r * 1.2, r * 1.2, .003, M.plastic(0xF4F6F7), 20); thumb.rotation.z = Math.PI / 2; thumb.position.x = -len * .6; s.add(thumb);
    const tip = cyl(.0025, .004, .012, M.plastic(0xF4F6F7), 16); tip.rotation.z = -Math.PI / 2; tip.position.x = len / 2 + .006; s.add(tip);
    const cap = cyl(.0045, .0045, .008, M.color(0xE04040), 16); cap.rotation.z = Math.PI / 2; cap.position.x = len / 2 + .015; s.add(cap);
    return s;
  }
  DEV3D.H.gSyringe = syringe;

  /* ---------- Masaüstü analizör ----------
     cfg: {w,h,d, body, accent, layout:'tower'|'flat', headFrac (tower: üst ekran başlığının yüksekliğe oranı), tilt (rad),
           screen:spec, inlet:'flap'|'probe'|'none', inletX (-1..1), cartridge:'front'|'top'|'side'|'none', printer:'top'|'front'|'none',
           door:bool, scanner:bool, sample:bool, label, labelInk, extra} */
  DEV3D.register('g-bench', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const w = cfg.w || .3, h = cfg.h || .3, d = cfg.d || .3, body = cfg.body ?? 0xEEF1F3, acc = cfg.accent ?? 0x1F3B73;
    const tower = cfg.layout === 'tower', tilt = cfg.tilt ?? (tower ? .12 : .55);
    /* Gövde */
    const lowH = tower ? h * (1 - (cfg.headFrac || .4)) : h;
    put(g, rbox(w, lowH, d, .012, M.plastic(body)), 0, lowH / 2 + .008, 0);
    put(g, box(w * .96, .008, d * .94, M.matte(0x8C969D)), 0, .004, 0);
    /* Ekran başlığı */
    let sw, sh, scrGroup = new THREE.Group();
    if (tower) {
      const hh = h - lowH;
      const head = rbox(w + .006, hh, d * .92, .014, M.plastic(acc)); put(g, head, 0, lowH + hh / 2 + .008, -d * .04);
      sw = cfg.sw || w * .84; sh = cfg.sh || hh * .76;
      scrGroup.position.set(0, lowH + hh * .55 + .008, cfg.screenZ ?? d * .42 + .002); scrGroup.rotation.x = -tilt; g.add(scrGroup);
      put(scrGroup, rbox(w * .97, hh * .94, .012, .01, M.plastic(acc)), 0, -hh * .02, -.004);
      put(g, box(w * .3, .018, .02, M.plastic(acc)), 0, lowH - .004, d * .45);
    } else {
      sw = cfg.sw || w * .55; sh = cfg.sh || sw * .62;
      const sx = cfg.screenX ?? 0, sz = cfg.screenZ ?? d * .44;
      scrGroup.position.set(sx, h - .004, sz); scrGroup.rotation.x = -tilt; g.add(scrGroup);
      put(scrGroup, rbox(sw + .022, sh + .022, .014, .006, M.plastic(cfg.bezelBody ?? acc)), 0, sh * .5, -.004);
      /* ekranın arkasındaki destek kaması */
      const ct = Math.cos(tilt), st = Math.sin(tilt), wedge = rbox(sw * .9, Math.max(.01, ct * sh * .55), Math.max(.01, st * sh * .45), .004, M.plastic(cfg.bezelBody ?? acc));
      put(g, wedge, sx, h + ct * sh * .275 - .004, sz - st * sh * .78);
    }
    const scr = makeScreen(sw, sh, cfg.screen || {title: cfg.label || ''});
    put(scrGroup, rbox(sw + .006, sh + .006, .004, .002, M.matte(0x1B2126)), 0, tower ? 0 : sh * .5, .003);
    put(scrGroup, scr.mesh, 0, tower ? 0 : sh * .5, .0056); screens.push(scr);
    g.updateMatrixWorld(true);
    const sW = scrGroup.localToWorld(V3(0, tower ? 0 : sh * .5, .02));
    parts.push({key: 'screen', at: sW});
    if (cfg.label) { const lw = Math.min(w * .4, .12); const lp = nameplate(cfg.label, lw, .014, cfg.labelInk || '#2B3238'); put(g, lp, tower ? w * .05 : -w / 2 + lw / 2 + .02, tower ? lowH * .62 : h * .2, d / 2 + .002); }
    /* Numune girişi */
    const ix = (cfg.inletX ?? -.6) * w / 2, iy = cfg.inletY ?? (tower ? lowH * .74 : h * .55);
    if (cfg.inlet === 'flap') {
      put(g, rbox(.034, .07, .014, .006, M.plastic(0xDDE2E5)), ix, iy, d / 2 + .004);
      put(g, box(.02, .03, .01, M.matte(0x30383E)), ix, iy + .01, d / 2 + .008);
      put(g, box(.016, .003, .002, M.color(0xC0282E)), ix, iy - .022, d / 2 + .012, 0, 0, .3);
      parts.push({key: 'g-inlet', at: V3(ix, iy + .01, d / 2 + .02)});
    } else if (cfg.inlet === 'probe') {
      put(g, box(.03, .02, .03, M.plastic(acc)), ix, iy, d / 2 + .012);
      put(g, cyl(.0015, .0015, .025, M.metal(), 8), ix, iy - .02, d / 2 + .02);
      parts.push({key: 'g-inlet', at: V3(ix, iy - .02, d / 2 + .03)});
    }
    if (cfg.sample) { put(g, syringe(), ix + w * .55 + .06, .012, d / 2 + .08, 0, -.5); parts.push({key: 'g-sample', at: V3(ix + w * .55 + .06, .03, d / 2 + .08)}); }
    /* Kartuş yuvası */
    if (cfg.cartridge && cfg.cartridge !== 'none') {
      const c = cfg.cartridge;
      if (c === 'front') { const cy = tower ? lowH * .25 : h * .4; put(g, box(w * .4, .012, .006, M.matte(0x1B2126)), cfg.cartX ?? 0, cy, d / 2 + .002); parts.push({key: 'g-cartridge', at: V3(cfg.cartX ?? 0, cy, d / 2 + .015)}); }
      else if (c === 'top') { put(g, box(w * .28, .004, d * .1, M.matte(0x1B2126)), -w * .25, h + .008, -d * .15); parts.push({key: 'g-cartridge', at: V3(-w * .25, h + .02, -d * .15)}); }
      else { put(g, box(.004, .05, d * .3, M.matte(0x1B2126)), w / 2 + .001, (tower ? lowH : h) * .6, 0); parts.push({key: 'g-cartridge', at: V3(w / 2 + .01, (tower ? lowH : h) * .6, 0)}); }
    }
    /* Yazıcı */
    if (cfg.printer === 'top') {
      const px = w * .3, py = (tower ? h : h) + .008;
      put(g, box(w * .25, .003, .012, M.matte(0x30383E)), px, tower ? py : py, tower ? -d * .3 : -d * .3);
      put(g, box(w * .2, .03, .001, M.plastic(0xFAFAF5)), px, py + .015, -d * .3, -.2);
      parts.push({key: 'g-printer', at: V3(px, py + .03, -d * .3)});
    } else if (cfg.printer === 'front') {
      const py = tower ? lowH * .85 : h * .82, px = cfg.printerX ?? w * .3;
      put(g, box(w * .22, .005, .006, M.matte(0x30383E)), px, py, d / 2 + .002);
      put(g, box(w * .18, .001, .035, M.plastic(0xFAFAF5)), px, py - .003, d / 2 + .018, .3);
      parts.push({key: 'g-printer', at: V3(px, py, d / 2 + .02)});
    }
    /* Alt kapak (çözelti/reaktif) */
    if (cfg.door) {
      const dh = tower ? lowH * .45 : h * .35;
      put(g, rbox(w * .9, dh, .01, .004, M.plastic(acc)), 0, .012 + dh / 2, d / 2 + .002);
      put(g, box(w * .9, .03, .006, M.plastic(0xF4F6F7)), 0, .012 + dh + .02, d / 2 + .003);
      parts.push({key: 'g-door', at: V3(0, .012 + dh / 2, d / 2 + .015)});
    }
    if (cfg.scanner) { put(g, rbox(.03, .05, .03, .008, M.matte(0x30383E)), w / 2 + .02, h * .35, d * .3); put(g, box(.016, .003, .001, M.led(0xE53935)), w / 2 + .02, h * .35 + .02, d * .3 + .016); parts.push({key: 'g-scanner', at: V3(w / 2 + .02, h * .35, d * .3 + .02)}); }
    if (cfg.extra) cfg.extra(g, {w, h, d, lowH, parts, screens, H: DEV3D.H, acc, body});
    return {group: g, parts, screens};
  });

  /* ===== Kan gazı / CO-oksimetri: üretici görseline göre lacivert ekran başlıklı dikey analizör ===== */
  const bgaBase = {type: 'g-bench', layout: 'tower', w: .25, h: .48, d: .34, headFrac: .42, tilt: .1, body: 0xEEF1F3, accent: 0x16305F,
    inlet: 'flap', inletX: -.62, door: true, printer: 'top', sample: true, theta: .5};
  /* Ekran üretici görselindeki gibi: lavanta zemin, koyu üst çubuk ("Ready" + düğmeler), altında yeşil durum şeridi, koyu alt çubuk (sol düğmeler, sağda saat) */
  const ablScreen = (title, body, draw) => ({bg: '#A4A8CE', layout: [
    {t: 'box', x: 0, y: 0, w: 1, h: .1, fill: '#323A7C'},
    {t: 'text', txt: title, x: .01, y: 0, w: .3, h: .1, c: '#FFFFFF', s: .04, wt: 700},
    {t: 'icon', g: 'drop', x: .52, y: .02, w: .05, h: .06, c: '#F4F6F7'},
    {t: 'button', x: .6, y: .015, w: .17, h: .07, txt: 'Menu', c: '#2B2F40', s: .03, fill: '#D9D3A0', r: .01},
    {t: 'button', x: .79, y: .015, w: .17, h: .07, txt: 'Info', c: '#2B2F40', s: .03, fill: '#D9D3A0', r: .01},
    ...Array.from({length: 24}, (_, k) => ({t: 'box', x: .01 + k * .0408, y: .115, w: .034, h: .022, fill: '#3DB54A'})),
    ...body,
    {t: 'box', x: 0, y: .9, w: 1, h: .1, fill: '#323A7C'},
    {t: 'button', x: .01, y: .915, w: .14, h: .07, txt: 'Patient', c: '#1B2328', s: .028, fill: '#9CC28A', r: .01},
    {t: 'button', x: .16, y: .915, w: .14, h: .07, txt: 'QC', c: '#1B2328', s: .028, fill: '#D9D3A0', r: .01},
    {t: 'icon', g: 'alarm', x: .6, y: .92, w: .04, h: .06, c: '#E04040'},
    {t: 'text', txt: 'Analyzer ready', x: .64, y: .9, w: .2, h: .1, c: '#E6EAF5', s: .026, wt: 500},
    {t: 'text', txt: '08:42', x: .84, y: .9, w: .15, h: .1, c: '#FFFFFF', s: .04, wt: 700, al: 'r'}
  ], draw});
  DEV3D.model('blood-gas-analyzer', Object.assign({}, bgaBase, {
    sw: .2, sh: .14,
    /* görseldeki "Select type to start" ekranı: şırınga / kapiller seçimi */
    screen: ablScreen('Ready', [
      {t: 'text', txt: 'Select type to start', x: 0, y: .25, w: 1, h: .08, c: '#15182A', s: .055, wt: 700, al: 'c'},
      {t: 'box', x: .25, y: .36, w: .22, h: .26, fill: '#B9B8A6', stroke: '#6E6F66', lw: .006, r: .01},
      {t: 'box', x: .53, y: .36, w: .22, h: .26, fill: '#B9B8A6', stroke: '#6E6F66', lw: .006, r: .01},
      {t: 'text', txt: 'Syringe', x: .25, y: .52, w: .22, h: .08, c: '#F4F4EE', s: .038, wt: 600, al: 'c'},
      {t: 'text', txt: 'Capillary', x: .53, y: .52, w: .22, h: .08, c: '#F4F4EE', s: .038, wt: 600, al: 'c'},
      {t: 'text', txt: 'pH · pCO2 · pO2 · sO2 · ctHb · Lytes · Glu · Lac · Crea · Urea', x: 0, y: .7, w: 1, h: .06, c: '#2B2F48', s: .03, wt: 500, al: 'c'}
    ], (c, t, {W, H}) => {
      /* şırınga simgesi */
      const x = .29 * W, y = .44 * H, L = .14 * W, r = .025 * H;
      c.fillStyle = '#F4F6F7'; c.fillRect(x, y - r, L * .7, r * 2); c.fillStyle = '#C0282E'; c.fillRect(x + L * .3, y - r * .8, L * .4, r * 1.6);
      c.fillStyle = '#F4F6F7'; c.fillRect(x - L * .2, y - r * .25, L * .2, r * .5); c.fillRect(x - L * .22, y - r * 1.2, .006 * W, r * 2.4); c.fillRect(x + L * .7, y - r * .3, L * .15, r * .6);
      /* kapiller simgesi */
      c.fillStyle = '#C0282E'; c.fillRect(.57 * W, .435 * H, .14 * W, .012 * H); c.fillStyle = '#E8EAEC'; c.fillRect(.57 * W, .43 * H, .03 * W, .022 * H); c.fillRect(.68 * W, .43 * H, .03 * W, .022 * H);
    })
  }));
  DEV3D.model('lab-co-oximeter', Object.assign({}, bgaBase, {
    sw: .2, sh: .14,
    /* aynı arayüz düzeninde oksimetri sonuç ekranı */
    screen: ablScreen('Results', [
      {t: 'text', txt: 'Oximetry values · arterial · 37.0 °C', x: .03, y: .17, w: .9, h: .07, c: '#15182A', s: .04, wt: 700},
      {t: 'box', x: .03, y: .25, w: .45, h: .6, fill: '#B6B9DA', stroke: '#6E72A0', lw: .004, r: .01},
      {t: 'box', x: .52, y: .25, w: .45, h: .6, fill: '#B6B9DA', stroke: '#6E72A0', lw: .004, r: .01},
      {t: 'table', x: .035, y: .27, w: .44, h: .56, s: .045, lc: '#2B2F48', zebra: false, rows: [['ctHb', '13.1 g/dL', '#101326'], ['sO2', '97.2 %', '#101326'], ['FO2Hb', '95.8 %', '#101326']]},
      {t: 'table', x: .525, y: .27, w: .44, h: .56, s: .045, lc: '#2B2F48', zebra: false, rows: [['FCOHb', '1.1 %', '#101326'], ['FMetHb', '0.6 %', '#101326'], ['FHHb', '2.5 %', '#101326']]}
    ])
  }));

  /* ===== ACT: üretici görseline göre beyaz, yatay, el tipi analizör; sağ uçta kartuş yuvası ===== */
  DEV3D.model('act', {
    type: 'handheld', orientation: 'landscape', w: .2, h: .11, d: .045, body: 0xEEF0F1, keys: 0, screenFrac: .7,
    /* Ekran üretici görselindeki gibi: üstte saat/kablosuz/pil satırı, gri başlık (i · CVOR 1), dört yeşil kare düğme (ayarlar, kayıtlar, QC, GO!), altta gezinme çubuğu */
    screen: {bg: '#FFFFFF', layout: [
      {t: 'box', x: 0, y: 0, w: 1, h: .12, fill: '#EDEEEF'},
      {t: 'text', txt: '12:00', x: .03, y: 0, w: .2, h: .12, c: '#30363C', s: .06, wt: 700},
      {t: 'icon', g: 'wifi', x: .19, y: .015, w: .06, h: .09, c: '#4A5158'},
      {t: 'icon', g: 'battery', x: .8, y: .015, w: .07, h: .09, c: '#4A5158'},
      {t: 'text', txt: '59%', x: .86, y: 0, w: .13, h: .12, c: '#30363C', s: .06, wt: 700, al: 'r'},
      {t: 'box', x: 0, y: .12, w: 1, h: .1, fill: '#A6ABB0'}, {t: 'box', x: 0, y: .12, w: .055, h: .1, fill: '#8C9298'},
      {t: 'text', txt: 'i', x: 0, y: .12, w: .055, h: .1, c: '#FFFFFF', s: .07, wt: 800, al: 'c'},
      {t: 'text', txt: 'CVOR 1', x: .06, y: .12, w: .94, h: .1, c: '#FFFFFF', s: .055, wt: 700, al: 'c'},
      {t: 'box', x: .08, y: .33, w: .15, h: .32, fill: '#5BA845', r: .02}, {t: 'icon', g: 'gear', x: .1, y: .39, w: .11, h: .2, c: '#FFFFFF'},
      {t: 'box', x: .28, y: .33, w: .15, h: .32, fill: '#5BA845', r: .02}, {t: 'icon', g: 'sd', x: .31, y: .38, w: .08, h: .2, c: '#FFFFFF'},
      {t: 'box', x: .48, y: .33, w: .15, h: .32, fill: '#5BA845', r: .02}, {t: 'text', txt: 'QC', x: .48, y: .34, w: .15, h: .16, c: '#FFFFFF', s: .13, wt: 500, al: 'c'},
      {t: 'box', x: .48, y: .52, w: .15, h: .062, fill: '#4A8E38'}, {t: 'text', txt: 'LQC', x: .48, y: .52, w: .15, h: .062, c: '#FFFFFF', s: .04, wt: 600, al: 'c'},
      {t: 'box', x: .48, y: .588, w: .15, h: .062, fill: '#4A8E38', r: .01}, {t: 'text', txt: 'EQC', x: .48, y: .588, w: .15, h: .062, c: '#FFFFFF', s: .04, wt: 600, al: 'c'},
      {t: 'box', x: .69, y: .33, w: .23, h: .32, fill: '#5BA845', r: .02}, {t: 'text', txt: 'GO!', x: .69, y: .33, w: .23, h: .32, c: '#FFFFFF', s: .15, wt: 800, al: 'c'},
      {t: 'text', txt: 'Last ACT+: 412 s', x: 0, y: .7, w: 1, h: .1, c: '#2E8B3E', s: .055, wt: 700, al: 'c'},
      {t: 'box', x: 0, y: .86, w: 1, h: .14, fill: '#EDEEEF'},
      {t: 'text', txt: '◁', x: .2, y: .86, w: .2, h: .14, c: '#8C9298', s: .06, wt: 500, al: 'c'},
      {t: 'text', txt: '○', x: .6, y: .86, w: .2, h: .14, c: '#8C9298', s: .06, wt: 500, al: 'c'}
    ], draw(c, t, {W, H}) { c.fillStyle = '#5BA845'; c.beginPath(); c.arc(.155 * W, .49 * H, .028 * H, 0, 7); c.fill(); c.strokeStyle = '#FFFFFF'; c.lineWidth = .012 * H; c.beginPath(); c.arc(.375 * W, .55 * H, .04 * H, 0, 7); c.stroke(); c.beginPath(); c.moveTo(.385 * W, .58 * H); c.lineTo(.405 * W, .62 * H); c.stroke(); }},
    extra(g, {body, w, h, d, parts, toW}) {
      /* sağ uçta kartuş yuvası ve takılı kartuş */
      put(body, rbox(.012, h * .7, d * .8, .005, M.plastic(0xDDE1E3)), w / 2 + .002, 0, 0);
      put(body, box(.004, h * .45, .006, M.matte(0x30383E)), w / 2 + .008, 0, 0);
      const cart = new THREE.Group(); put(body, cart, w / 2 + .03, 0, 0);
      cart.add(rbox(.05, h * .4, .008, .003, M.plastic(0xF4F6F7)));
      put(cart, cyl(.006, .006, .004, M.color(0x8E1B22, .4), 20), .012, 0, .005, Math.PI / 2);
      put(cart, box(.025, .006, .001, M.color(0x2E8B3E)), -.008, .015, .0045);
      body.updateMatrixWorld(true);
      parts.push({key: 'g-cartridge', at: toW(w / 2 + .03, 0, .02)});
      put(body, box(.02, .006, .002, M.matte(0x8C969D)), -w / 2 + .03, h / 2 - .012, d / 2 + .001);
    }
  });

  /* ===== Quantra: üretici görseline göre koyu gri gövde, eğik ekran başlığı, önde kartuş penceresi ===== */
  DEV3D.model('quantra', {
    type: 'g-bench', layout: 'tower', w: .28, h: .42, d: .32, headFrac: .4, tilt: .32, body: 0x6A6F74, accent: 0x34383D,
    inlet: 'none', label: 'QUANTRA', labelInk: '#C9302C', theta: .65, sw: .24, sh: .15, screenZ: .32 * .42 + .026,
    /* Ekran üretici görselindeki gibi: siyah zemin, üstte sekmeler ve durum satırı, solda simge sütunu; üstte CT ve CSL, altta CS, PCS, FCS yarım daire göstergeleri */
    screen: {bg: '#040507', layout: [
      {t: 'box', x: .005, y: .01, w: .065, h: .085, fill: '#2F7DD1', r: .01}, {t: 'icon', g: 'home', x: .02, y: .025, w: .035, h: .055, c: '#FFFFFF'},
      {t: 'box', x: .075, y: .01, w: .065, h: .085, fill: '#1D3A58', r: .01}, {t: 'icon', g: 'menu', x: .09, y: .025, w: .035, h: .055, c: '#9CC3E8'},
      {t: 'text', txt: 'QPlus', x: .3, y: .015, w: .1, h: .035, c: '#9AA4AB', s: .026, wt: 600},
      {t: 'text', txt: 'Citrated', x: .3, y: .05, w: .1, h: .035, c: '#C9D0D5', s: .026, wt: 600},
      {t: 'text', txt: 'Status', x: .42, y: .015, w: .12, h: .035, c: '#9AA4AB', s: .026, wt: 600},
      {t: 'text', txt: 'Complete', x: .42, y: .05, w: .12, h: .035, c: '#C9D0D5', s: .026, wt: 600},
      {t: 'text', txt: '08:42', x: .56, y: .03, w: .1, h: .04, c: '#C9D0D5', s: .028, wt: 600},
      {t: 'icon', g: 'drop', x: .8, y: .025, w: .04, h: .05, c: '#4F9BE0'}, {t: 'icon', g: 'wifi', x: .86, y: .025, w: .04, h: .05, c: '#4F9BE0'}, {t: 'icon', g: 'battery', x: .92, y: .025, w: .05, h: .05, c: '#4F9BE0'},
      {t: 'box', x: 0, y: .105, w: 1, h: .005, fill: '#2F7DD1'},
      ...[0, 1, 2, 3].map(k => ({t: 'box', x: .03, y: .16 + k * .1, w: .045, h: .07, stroke: '#4F9BE0', fill: k ? '#0A1622' : '#2F7DD1', lw: .004, r: .006}))
    ], draw(c, t, {W, H, txt}) {
      [['CT', '105', 's', .55, .4, '#F2C531', .25, .55, .3], ['CSL', '57', '%', .82, .4, '#F2C531', .45, .8, .82], ['CS', '21.0', 'hPa', .3, .82, '#FFFFFF', .2, .5, .3],
        ['PCS', '19.0', 'hPa', .56, .82, '#FFFFFF', .2, .5, .35], ['FCS', '2.0', 'hPa', .82, .82, '#FFFFFF', .1, .4, .08]].forEach(([l, v, u, fx, fy, col, a0, a1, m], k) => {
        const cx = fx * W, cy = fy * H - .12 * H, R = .085 * W, A = f => Math.PI * (1 + f);
        c.lineCap = 'round'; c.strokeStyle = '#5E666D'; c.lineWidth = 2; c.beginPath(); c.arc(cx, cy, R, A(0), A(1)); c.stroke();
        c.strokeStyle = '#3CC45A'; c.lineWidth = .016 * H; c.beginPath(); c.arc(cx, cy, R, A(a0), A(a1)); c.stroke(); c.lineCap = 'butt';
        const mf = m + .01 * Math.sin(t * .5 + k); c.fillStyle = col === '#FFFFFF' ? '#FFFFFF' : '#F2C531'; c.beginPath(); c.arc(cx + Math.cos(A(mf)) * R, cy + Math.sin(A(mf)) * R, .014 * H, 0, 7); c.fill();
        txt('min', cx - R, cy + .04 * H, {c: '#7A8790', s: .02, al: 'c', wt: 500}); txt('max', cx + R, cy + .04 * H, {c: '#7A8790', s: .02, al: 'c', wt: 500});
        txt(v, cx + .005 * W, cy - .01 * H, {c: col, s: .085, al: 'r', wt: 800}); txt(u, cx + .012 * W, cy - .01 * H, {c: '#C9D0D5', s: .028, wt: 600});
        txt(l, cx, cy + .08 * H, {c: '#FFFFFF', s: .065, al: 'c', wt: 500});
        if (col !== '#FFFFFF') { c.fillStyle = '#F2C531'; c.beginPath(); c.arc(cx + R * .78, cy + .01 * H, .016 * H, 0, 7); c.fill(); }
      });
    }},
    extra(g, {w, h, d, lowH, parts}) {
      /* kartuş penceresi (sağ alt) ve takılı kartuş, şırınga */
      const cx = w * .26, cy = lowH * .42;
      put(g, rbox(.05, .12, .008, .008, M.matte(0x2B2F33)), cx, cy, d / 2 + .003);
      put(g, box(.03, .1, .012, M.clear(0xDDE6EA, .55)), cx, cy, d / 2 + .009);
      put(g, cyl(.007, .007, .06, M.color(0x5BB7DE, .4), 20), cx, cy - .01, d / 2 + .01);
      put(g, cyl(.002, .002, .03, M.plastic(0xF4F6F7), 8), cx, cy + .035, d / 2 + .01);
      parts.push({key: 'g-cartridge', at: V3(cx, cy, d / 2 + .02)});
      /* barkod okuyucu / USB (sol) */
      put(g, rbox(.03, .05, .008, .012, M.matte(0x1E2226)), -w * .3, lowH * .55, d / 2 + .003);
      put(g, box(.012, .006, .002, M.matte(0x8C969D)), -w * .3, lowH * .52, d / 2 + .008);
      parts.push({key: 'g-scanner', at: V3(-w * .3, lowH * .58, d / 2 + .015)});
      put(g, box(.04, .006, .002, M.color(0xA9B7D0)), w * .3, lowH - .01, d / 2 + .002);
    }
  });

  /* ---------- Viskoelastik analizör ----------
     Gövde + üstte ayaklı dokunmatik monitör (ya da gövdeye gömülü ekran) + ölçüm kanalları.
     cfg: {w,h,d, body, accent, band (gövdenin önden üste uzanan renkli bandı), monitor:{w,h,lift} | null (gömülü ekran),
           screen:spec, channels:n, chStyle:'cups'|'window'|'slot', pipette:bool, label, labelInk, extra} */
  T('g-channel', {tr: ['Ölçüm kanalları', 'Her kanal ayrı bir reaktifle aktive edilmiş numunenin pıhtı oluşumunu ve çözülmesini eş zamanlı izler; kanal eğrileri ekranda yan yana görünür.'], en: ['Measurement channels', 'Each channel tracks clot formation and lysis in a sample activated with a different reagent; channel curves appear side by side on the display.'], es: ['Canales de medición', 'Cada canal sigue la formación y lisis del coágulo en una muestra activada con un reactivo distinto; las curvas aparecen en paralelo en la pantalla.']});
  T('g-pipette', {tr: ['Pipet', 'Numune ve reaktifin ölçüm kabına aktarılması için kullanılır (manuel pipetleme gerektiren sistemlerde).'], en: ['Pipette', 'Used to transfer sample and reagent into the measuring cup (on systems that require manual pipetting).'], es: ['Pipeta', 'Se usa para transferir la muestra y el reactivo a la cubeta (en sistemas con pipeteo manual).']});
  /* Viskoelastik eğri (TEG / ROTEM / ClotPro ekranları): x, y, w, h piksel; o: {ct, amp, k, lys, lysLen, grow, c, fill, alpha, lw, half}
     ct: pıhtılaşma başlangıcı (genişliğe oranla), amp: en büyük genlik (0–1), k: sertleşme hızı, lys: lizin başladığı nokta */
  function clotCurve(g, x, y, w, h, o) {
    const half = !!o.half, mid = half ? y + h : y + h / 2, sc = half ? h : h / 2, ct = o.ct ?? .1, k = o.k ?? .1, A = o.amp ?? .8, end = Math.max(.02, Math.min(1, o.grow ?? 1));
    const a = u => { if (u < ct) return 0; let v = A * (1 - Math.exp(-(u - ct) / k)); if (o.lys != null && u > o.lys) v *= Math.max(0, 1 - (u - o.lys) / (o.lysLen || .25)); return v; };
    g.beginPath(); g.moveTo(x, mid);
    for (let px = 0; px <= w * end; px += 2) g.lineTo(x + px, mid - a(px / w) * sc);
    if (!half) for (let px = w * end; px >= 0; px -= 2) g.lineTo(x + px, mid + a(px / w) * sc);
    else g.lineTo(x + w * end, mid);
    g.closePath();
    if (o.fill) { g.fillStyle = o.fill; g.globalAlpha = o.alpha ?? 1; g.fill(); g.globalAlpha = 1; }
    if (o.c) {
      g.strokeStyle = o.c; g.lineWidth = o.lw || 2;
      [-1, 1].forEach(sg => { if (half && sg > 0) return; g.beginPath(); for (let px = 0; px <= w * end; px += 2) { const yy = mid + sg * a(px / w) * sc; px ? g.lineTo(x + px, yy) : g.moveTo(x + px, yy); } g.stroke(); });
    }
  }
  DEV3D.H.gClotCurve = clotCurve;
  DEV3D.register('g-visco', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const w = cfg.w || .32, h = cfg.h || .24, d = cfg.d || .45, body = cfg.body ?? 0xF2F4F5, acc = cfg.accent ?? 0x2A4FA0;
    put(g, rbox(w, h, d, .03, M.plastic(body)), 0, h / 2 + .012, 0);
    [-1, 1].forEach(sx => [-1, 1].forEach(sz => put(g, cyl(.012, .012, .012, M.rubber(), 16), sx * w * .38, .006, sz * d * .4)));
    if (cfg.band) {
      put(g, box(w * .5, .006, d * .9, M.plastic(acc)), 0, h + .013, 0);
      put(g, rbox(w * .5, h * .78, .01, .01, M.plastic(acc)), 0, h * .5, d / 2 + .002);
      [-1, 1].forEach(s => put(g, box(.006, h * .58, d * .55, M.plastic(acc)), s * (w / 2 + .001), h * .45, -d * .1));
    }
    if (cfg.label) { const lp = nameplate(cfg.label, .08, .016, cfg.labelInk || '#2A4FA0'); put(g, lp, -w * .28, h * .85, d / 2 + .003); }
    /* Ekran */
    let scrAt;
    const spec = cfg.screen || {title: cfg.label || '', extra: 'tubes', curves: cfg.channels || 4};
    if (cfg.monitor) {
      const mw = cfg.monitor.w || .34, mh = cfg.monitor.h || .24, lift = cfg.monitor.lift || .07, mz = cfg.monitor.z ?? -d * .1;
      put(g, box(.05, lift, .03, M.metal(0xB9C1C7)), 0, h + .012 + lift / 2, mz - .01);
      const mg = new THREE.Group(); mg.position.set(0, h + .012 + lift + mh / 2, mz + .01); mg.rotation.x = -.12; g.add(mg);
      put(mg, rbox(mw, mh, .03, .01, M.plastic(cfg.monitorBody ?? 0xE4E8EB)), 0, 0, 0);
      const scr = makeScreen(mw * .9, mh * .84, spec); put(mg, scr.mesh, 0, mh * .03, .016); screens.push(scr);
      g.updateMatrixWorld(true); scrAt = mg.localToWorld(V3(0, 0, .03));
      parts.push({key: 'mount', at: V3(0, h + .012 + lift * .5, mz + .01)});
    } else {
      const sw = w * .7, sh = sw * .6, mg = new THREE.Group(); mg.position.set(0, h + .006, d * .42); mg.rotation.x = -.5; g.add(mg);
      put(mg, rbox(sw + .02, sh + .02, .012, .006, M.matte(0x1B2126)), 0, sh / 2, 0);
      const scr = makeScreen(sw, sh, spec); put(mg, scr.mesh, 0, sh / 2, .0065); screens.push(scr);
      g.updateMatrixWorld(true); scrAt = mg.localToWorld(V3(0, sh / 2, .02));
    }
    parts.unshift({key: 'screen', at: scrAt});
    /* Kanallar */
    const n = cfg.channels || 4, style = cfg.chStyle || 'cups';
    if (style === 'cups') {
      /* üstte sıra halinde pin-kap ölçüm kuyuları */
      const zc = d * .3, span = w * .8;
      for (let k = 0; k < n; k++) {
        const x = -span / 2 + (k + .5) * span / n;
        put(g, cyl(.014, .014, .004, M.matte(0x30383E), 24), x, h + .014, zc);
        put(g, cyl(.009, .008, .02, M.clear(0xEAF2F5, .7), 20), x, h + .024, zc);
        put(g, box(.006, .006, .001, M.led(k < 3 ? 0x2E9E58 : 0xF2C531)), x, h * .75, d / 2 + .002);
      }
      parts.push({key: 'g-channel', at: V3(0, h + .03, zc)});
    } else if (style === 'window') {
      /* önde kartuş penceresi (kartuş dik takılır) */
      const cx = -w * .18, cy = h * .45;
      put(g, rbox(.07, .12, .01, .01, M.plastic(0x1E3F8A)), cx, cy, d / 2 + .003);
      put(g, box(.05, .1, .006, M.clear(0x7FC4E8, .5)), cx, cy, d / 2 + .009);
      put(g, cyl(.007, .007, .07, M.clear(0xF4F6F7, .8), 16), cx, cy, d / 2 + .02);
      put(g, cyl(.0072, .0072, .02, M.color(0xC0282E), 16), cx - .0, cy - .018, d / 2 + .02);
      put(g, box(.03, .03, .03, M.plastic(0xF4F6F7)), cx + .06, cy + .02, d / 2 + .015);
      put(g, box(.016, .006, .002, M.matte(0x30383E)), cx + .06, cy + .02, d / 2 + .031);
      parts.push({key: 'g-cartridge', at: V3(cx, cy, d / 2 + .03)}, {key: 'g-scanner', at: V3(cx + .06, cy + .02, d / 2 + .035)});
      /* yan pencerede kartuş deposu */
      put(g, box(.004, .05, d * .35, M.clear(0xE6F1F5, .6)), w / 2 + .002, h * .55, -d * .05);
    } else if (style === 'slot') {
      put(g, box(w * .35, .012, .006, M.matte(0x1B2126)), 0, h * .35, d / 2 + .002);
      parts.push({key: 'g-cartridge', at: V3(0, h * .35, d / 2 + .015)});
    }
    if (cfg.pipette) {
      const px = w / 2 + .05, pz = d * .2;
      put(g, box(.04, .01, .06, M.matte(0x3A4148)), px, .005, pz);
      const pip = new THREE.Group(); put(g, pip, px, .125, pz, 0, 0, .12);
      pip.add(cyl(.009, .007, .1, M.plastic(0xF4F6F7))); put(pip, cyl(.003, .001, .04, M.clear(0xF4F6F7, .8), 12), 0, -.07, 0);
      put(pip, cyl(.005, .005, .012, M.color(0xC0282E)), 0, .056, 0);
      parts.push({key: 'g-pipette', at: V3(px, .15, pz)});
    }
    if (cfg.extra) cfg.extra(g, {w, h, d, parts, screens, H: DEV3D.H});
    return {group: g, parts, screens};
  });

  /* ===== ROTEM: üretici görseline göre beyaz–mavi gövde, ayaklı dokunmatik monitör, önde kartuş penceresi ===== */
  /* Ekran üretici görselindeki gibi: üstte başlık ve sekme düğmeleri, 2×2 kanal paneli (solda temogram, sağda renkli test başlıklı sonuç sütunu), altta durum çubuğu */
  const ROTEM_CH = [['FIBTEM C', '#C8641E', .1, .2, [['CT', '64 s'], ['A10', '12 mm'], ['A20', '13 mm'], ['MCF', '14 mm'], ['ML', '0 %']]],
    ['EXTEM C', '#D42020', .1, .8, [['CT', '61 s'], ['CFT', '89 s'], ['α', '76 °'], ['A10', '54 mm'], ['MCF', '63 mm'], ['ML', '3 %']]],
    ['INTEM C', '#2A3FC8', .2, .78, [['CT', '172 s'], ['CFT', '79 s'], ['α', '77 °'], ['A10', '55 mm'], ['MCF', '60 mm'], ['ML', '2 %']]],
    ['HEPTEM C', '#AEB3B8', .19, .77, [['CT', '168 s'], ['CFT', '80 s'], ['α', '76 °'], ['A10', '52 mm'], ['MCF', '59 mm'], ['ML', '2 %']]]];
  const rotemPanel = (k) => { const px = .005 + (k % 2) * .497, py = .125 + Math.floor(k / 2) * .405; return {px, py}; };
  DEV3D.model('rotem', {
    type: 'g-visco', w: .31, h: .25, d: .5, body: 0xF2F4F5, accent: 0x2A4FA0, band: true, monitor: {w: .34, h: .27, lift: .07}, chStyle: 'window', label: 'ROTEM', theta: .75,
    screen: {bg: '#ECEDEF', layout: [
      {t: 'box', x: 0, y: 0, w: 1, h: .045, fill: '#1E3A78'},
      {t: 'text', txt: 'ROTEM® Measurement module', x: .005, y: 0, w: .6, h: .045, c: '#FFFFFF', s: .028, wt: 700},
      ...['Preparation', '', 'Screenshot', 'Standard overlay', 'Patient overlay', '', 'Help', 'Quit'].map((l, k) => ({t: 'button', x: .005 + k * .124, y: .05, w: .12, h: .065, txt: l, c: '#1B2328', s: .018, wt: 600, fill: '#DADDE1', stroke: '#9AA0A6', lw: .003, r: .005})),
      ...ROTEM_CH.map((ch, k) => { const {px, py} = rotemPanel(k); return {t: 'box', x: px, y: py, w: .49, h: .395, fill: '#FFFFFF', stroke: '#8E969D', lw: .003}; }),
      ...ROTEM_CH.map((ch, k) => { const {px, py} = rotemPanel(k); return {t: 'text', txt: `${k + 1} · Ch ${k + 1} | Patient`, x: px, y: py, w: .3, h: .035, c: '#30363C', s: .02, wt: 600}; }),
      ...ROTEM_CH.map(([l, c], k) => { const {px, py} = rotemPanel(k); return {t: 'box', x: px + .345, y: py + .005, w: .14, h: .035, fill: c}; }),
      ...ROTEM_CH.map(([l, c], k) => { const {px, py} = rotemPanel(k); return {t: 'text', txt: l, x: px + .345, y: py + .005, w: .14, h: .035, c: k === 3 ? '#1B2328' : '#FFFFFF', s: .022, wt: 700, al: 'c'}; }),
      ...ROTEM_CH.map(([l, c, ct, amp, rows], k) => { const {px, py} = rotemPanel(k); return {t: 'table', x: px + .345, y: py + .05, w: .14, h: .3, s: .022, lc: '#30363C', c: '#1B2328', rows}; }),
      {t: 'box', x: 0, y: .94, w: 1, h: .06, fill: '#DADDE1'},
      {t: 'text', txt: '12:30 · std. test', x: .01, y: .94, w: .4, h: .06, c: '#30363C', s: .024, wt: 600},
      {t: 'text', txt: 'Temperature: 37.0 °C', x: .55, y: .94, w: .44, h: .06, c: '#30363C', s: .024, wt: 600, al: 'r'}
    ], draw(c, t, {W, H}) {
      ROTEM_CH.forEach(([l, col, ct, amp], k) => {
        const {px, py} = rotemPanel(k), x = (px + .02) * W, y = (py + .045) * H, w = .32 * W, h = .33 * H;
        c.strokeStyle = '#C9D3C9'; c.lineWidth = 1; for (let j = 0; j <= 6; j++) { c.beginPath(); c.moveTo(x + w * j / 6, y); c.lineTo(x + w * j / 6, y + h); c.stroke(); } for (let j = 0; j <= 4; j++) { c.beginPath(); c.moveTo(x, y + h * j / 4); c.lineTo(x + w, y + h * j / 4); c.stroke(); }
        c.strokeStyle = '#3FA34D'; c.beginPath(); c.moveTo(x, y + h / 2); c.lineTo(x + w, y + h / 2); c.stroke();
        clotCurve(c, x, y + h * .04, w, h * .92, {ct, amp, k: .07, grow: Math.min(1, .3 + ((t * .02 + k * .08) % .8)), fill: k === 0 ? '#D63AD6' : '#22409A', c: k === 0 ? '#B12AB1' : '#1A3380', lw: 1.5});
      });
    }}
  });

  /* ===== TEG 6s ve ClotPro için ortak küçük yardımcılar ===== */
  /* Köşeleri yuvarlatılmış dikdörtgen çizgisi (merkezde), isteğe bağlı delikli */
  function gRR(w, h, r, path) {
    const s = path || new THREE.Shape(), x = -w / 2, y = -h / 2; r = Math.min(r, w / 2 - 1e-4, h / 2 - 1e-4);
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false); s.lineTo(x + w, y + h - r);
    s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false); s.lineTo(x + r, y + h); s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
    s.lineTo(x, y + r); s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false); return s;
  }
  /* İnce, köşesi geniş yuvarlatılmış plaka (ön yüzü +z; kalınlık t, kenar pahı b). hole: [w, h, r] ile çerçeve olur */
  function gPlate(w, h, t, r, mat, b = .0012, hole) {
    const s = gRR(w - 2 * b, h - 2 * b, Math.max(.0005, r - b));
    if (hole) { const p = new THREE.Path(); gRR(hole[0] + 2 * b, hole[1] + 2 * b, hole[2] + b, p); s.holes.push(p); }
    const dd = Math.max(.0004, t - 2 * b), geo = new THREE.ExtrudeGeometry(s, {depth: dd, bevelEnabled: b > 0, bevelThickness: b, bevelSize: b, bevelSegments: 3, curveSegments: 10});
    geo.translate(0, 0, -dd / 2); const m = new THREE.Mesh(geo, mat); m.castShadow = m.receiveShadow = true; return m;
  }
  /* Tek satırlık baskı yazısı */
  const gTxt = (s, w, h, ink = '#1B2328', wt = 700, al = 'left', it = false) => decal(w, h, (c, W, Hh) => {
    c.clearRect(0, 0, W, Hh); c.fillStyle = ink; c.font = `${it ? 'italic ' : ''}${wt} ${Math.round(Hh * .8)}px "Archivo", Arial, sans-serif`;
    c.textBaseline = 'middle'; c.textAlign = al; c.fillText(s, al === 'left' ? 1 : al === 'right' ? W - 1 : W / 2, Hh * .55);
  }, Math.max(64, Math.min(1024, Math.round(w / h * 72))));
  /* Kablo: yumuşak eğri + iki uçta gerilim giderici kılıf */
  function gCable(g, pts, r, mat, ends = [true, true]) {
    const P = pts.map(p => Array.isArray(p) ? V3(...p) : p); g.add(tube(P, r, mat, Math.max(40, P.length * 18), 10));
    [[0, 1], [P.length - 1, P.length - 2]].forEach(([a, b], k) => {
      if (!ends[k]) return; const dir = P[b].clone().sub(P[a]).normalize(), sr = cyl(r * 1.35, r * 2, .016, mat, 14);
      sr.position.copy(P[a]).addScaledVector(dir, .008); sr.quaternion.setFromUnitVectors(V3(0, 1, 0), dir); g.add(sr);
    });
  }
  T('g-tegcart', {tr: ['Test kartuşu', 'Tek kullanımlık mikroakışkan kartuştur; sitratlı tam kan örnek girişine uygulanır, kanallara çekilir ve kuru reaktiflerle karışır. Kartuş tipi yapılacak testleri belirler (ör. CK, CKH, CRT, CFF).'], en: ['Test cartridge', 'Single-use microfluidic cartridge; citrated whole blood is applied to the sample port, drawn into the channels and mixed with dried reagents. The cartridge type determines the assays run (e.g. CK, CKH, CRT, CFF).'], es: ['Cartucho de prueba', 'Cartucho microfluídico de un solo uso; la sangre total citratada se aplica en el puerto de muestra, pasa a los canales y se mezcla con reactivos secos. El tipo de cartucho determina las pruebas (p. ej., CK, CKH, CRT, CFF).']});
  T('g-rear', {tr: ['Arka bağlantılar', 'Güç girişi ve açma/kapama anahtarı ile veri bağlantılarını (USB, ağ) taşır; sonuçlar ağ üzerinden kayıt sistemine aktarılabilir.'], en: ['Rear connections', 'Carries the power inlet and on/off switch and the data connections (USB, network); results can be transferred to the record system over the network.'], es: ['Conexiones traseras', 'Incluyen la entrada de alimentación, el interruptor y las conexiones de datos (USB, red); los resultados pueden transferirse al sistema de registro por la red.']});

  /* ===== TEG 6s: üretici görseline göre dik beyaz gövde, üstü kısa düz bölümden sonra arkaya doğru eğimle alçalır;
     ön yüz geniş yuvarlatılmış açık mavi çerçeve içinde beyaz panel: üstte siyah camlı dokunmatik ekran, altında kırmızı
     TEG 6s yazısı, ortada dikey kartuş yuvası (kartuş takılı), altta koyu gri kaide; arkada güç ve veri bağlantıları ===== */
  /* Ekran: üreticinin arayüz stilinde (lacivert başlık, koyu gri zemin, alt bilgi sütunları) çalışan test görünümü */
  const TEG_CH = [['CK', '#4FD675', .1, .76, .06], ['CKH', '#F4D03F', .092, .73, .065], ['CRT', '#5AB8F0', .022, .77, .05], ['CFF', '#F06B6B', .025, .27, .05]];
  const TEG_RES = [['CK', 'R', '6.1', 'min', '4.6 – 9.1'], ['CK', 'K', '1.7', 'min', '0.8 – 2.1'], ['CK', 'Angle', '68.4', '°', '63 – 78'], ['CK', 'MA', '61.2', 'mm', '52 – 69'],
    ['CK', 'LY30', '0.8', '%', '0 – 2.6'], ['CKH', 'R', '5.9', 'min', '4.3 – 8.3'], ['CRT', 'MA', '62.0', 'mm', '52 – 70'], ['CFF', 'MA', '21.4', 'mm', '15 – 32']];
  const tegScreen = {bg: '#323437', layout: [
    {t: 'box', x: 0, y: 0, w: 1, h: .1, fill: '#0A1636'}, {t: 'box', x: 0, y: .1, w: 1, h: .004, fill: '#24407A'},
    {t: 'text', txt: 'TEG 6s', x: .006, y: .008, w: .2, h: .04, c: '#C9D6E8', s: .026, wt: 600},
    {t: 'text', txt: 'Citrated: K, KH, RTH, FFH', x: .2, y: 0, w: .6, h: .1, c: '#DCE8F7', s: .056, wt: 400, al: 'c'},
    {t: 'text', txt: '10/06/2026', x: .8, y: .012, w: .19, h: .035, c: '#C9D6E8', s: .026, wt: 600, al: 'r'},
    {t: 'text', txt: '08:42', x: .8, y: .05, w: .19, h: .035, c: '#C9D6E8', s: .026, wt: 600, al: 'r'},
    /* durum satırı */
    {t: 'text', txt: 'Test running', x: .012, y: .115, w: .2, h: .06, c: '#E6EAEE', s: .034, wt: 600},
    {t: 'text', txt: 'Patient ID: 0042-TR', x: .19, y: .115, w: .3, h: .06, c: '#AEB6BE', s: .03, wt: 500},
    {t: 'box', x: .5, y: .128, w: .34, h: .036, fill: '#151618', r: .006},
    {t: 'text', txt: '00:42:18', x: .85, y: .115, w: .14, h: .06, c: '#E6EAEE', s: .034, wt: 600, al: 'r'},
    /* tracing paneli ve sonuç tablosu */
    {t: 'box', x: .012, y: .19, w: .58, h: .605, fill: '#1B1C1E', stroke: '#4A4E53', lw: .003, r: .008},
    {t: 'box', x: .602, y: .19, w: .386, h: .605, fill: '#26282B', stroke: '#4A4E53', lw: .003, r: .008},
    {t: 'box', x: .602, y: .19, w: .386, h: .062, fill: '#0F2048', r: .008}, {t: 'box', x: .602, y: .22, w: .386, h: .032, fill: '#0F2048'},
    {t: 'text', txt: 'Assay', x: .64, y: .19, w: .1, h: .062, c: '#C9D6E8', s: .026, wt: 600},
    {t: 'text', txt: 'Result', x: .74, y: .19, w: .12, h: .062, c: '#C9D6E8', s: .026, wt: 600},
    {t: 'text', txt: 'Range', x: .86, y: .19, w: .125, h: .062, c: '#C9D6E8', s: .026, wt: 600, al: 'r'},
    /* alt bilgi */
    {t: 'box', x: .012, y: .815, w: .976, h: .003, fill: '#5A5E63'}, {t: 'box', x: .52, y: .835, w: .002, h: .15, fill: '#5A5E63'}
  ], draw(c, t, {W, H, txt}) {
    /* overlay tracing: TEG tarzı simetrik iğ biçimli eğriler, ızgara ve eksen yazıları */
    const x = .055 * W, y = .26 * H, w = .52 * W, h = .46 * H;
    c.strokeStyle = 'rgba(255,255,255,.09)'; c.lineWidth = 1;
    for (let j = 0; j <= 6; j++) { c.beginPath(); c.moveTo(x + w * j / 6, y); c.lineTo(x + w * j / 6, y + h); c.stroke(); txt(j * 10, x + w * j / 6, y + h + .028 * H, {c: '#9AA3AB', s: .022, wt: 500, al: 'c'}); }
    for (let j = 0; j <= 4; j++) { c.beginPath(); c.moveTo(x, y + h * j / 4); c.lineTo(x + w, y + h * j / 4); c.stroke(); txt(Math.abs(80 - j * 40), x - .008 * W, y + h * j / 4, {c: '#9AA3AB', s: .02, wt: 500, al: 'r'}); }
    txt('min', x + w, y + h + .058 * H, {c: '#9AA3AB', s: .02, wt: 500, al: 'r'}); txt('mm', x - .008 * W, y - .025 * H, {c: '#9AA3AB', s: .02, wt: 500, al: 'r'});
    const grow = .66 + .06 * ((t * .01) % 1);
    TEG_CH.forEach(([l, col, ct, amp, k]) => clotCurve(c, x, y, w, h, {ct, amp, k, grow, c: col, lw: 2.2}));
    c.strokeStyle = 'rgba(255,255,255,.35)'; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(x + w * grow, y); c.lineTo(x + w * grow, y + h); c.stroke(); c.setLineDash([]);
    TEG_CH.forEach(([l, col], k) => { const lx = .02 * W + k * .075 * W; c.fillStyle = col; c.fillRect(lx, .205 * H, .022 * W, .02 * H); txt(l, lx + .027 * W, .215 * H, {c: '#E6EAEE', s: .024, wt: 600}); });
    /* sonuç tablosu */
    const cols = Object.fromEntries(TEG_CH.map(([l, col]) => [l, col])), rh = .066 * H;
    TEG_RES.forEach(([a, p, v, u, rg], k) => {
      const yy = .262 * H + (k + .5) * rh;
      if (k % 2) { c.fillStyle = 'rgba(255,255,255,.04)'; c.fillRect(.604 * W, yy - rh / 2, .382 * W, rh); }
      c.fillStyle = cols[a]; c.beginPath(); c.arc(.622 * W, yy, .011 * H, 0, 7); c.fill();
      txt(a + ' ' + p, .64 * W, yy, {c: '#E6EAEE', s: .028, wt: 600});
      txt(v, .8 * W, yy, {c: '#FFFFFF', s: .032, wt: 700, al: 'r'}); txt(u, .806 * W, yy, {c: '#9AA3AB', s: .022, wt: 500});
      txt(rg, .982 * W, yy, {c: '#AEB6BE', s: .024, wt: 500, al: 'r'});
    });
    /* durum çubuğu: fotoğraftaki ilerleme çubuğu stilinde */
    const pf = .7 + .1 * ((t * .01) % 1), gr = c.createLinearGradient(0, .13 * H, 0, .16 * H); gr.addColorStop(0, '#3E7FD8'); gr.addColorStop(1, '#173E8C');
    c.fillStyle = gr; c.fillRect(.503 * W, .131 * H, .334 * W * pf, .03 * H); txt(Math.round(pf * 100) + ' %', .503 * W + .334 * W * pf / 2, .146 * H, {c: '#FFFFFF', s: .022, wt: 600, al: 'c'});
    /* alt bilgi sütunları */
    [['Sample', 'Citrated whole blood'], ['Cartridge', 'K, KH, RTH, FFH · Lot 26114'], ['Operator', 'ICU-2']].forEach(([l, v], k) => { txt(l, .03 * W, (.855 + k * .05) * H, {c: '#8E959C', s: .024, wt: 500}); txt(v, .16 * W, (.855 + k * .05) * H, {c: '#E6EAEE', s: .025, wt: 600}); });
    [['Channels', '4 / 4 active'], ['Temperature', '37.0 °C'], ['Serial #', 'T1-14100099']].forEach(([l, v], k) => { txt(l, .545 * W, (.855 + k * .05) * H, {c: '#8E959C', s: .024, wt: 500}); txt(v, .7 * W, (.855 + k * .05) * H, {c: '#E6EAEE', s: .025, wt: 600}); });
  }};
  DEV3D.model('teg', {
    type: 'g-custom', theta: .45, phi: 1.3,
    build(g, parts, screens) {
      const w = .184, h = .295, d = .34, base = .02, b = .006;
      const white = M.plastic(0xF3F5F6, .3), blue = M.plastic(0x5C9CD8, .34), plinth = M.matte(0x6F7880, .5), black = M.color(0x07090B, .14), rub = M.rubber();
      /* --- gövde: yan profil (şekil x → dünya z). Önde tam yükseklik, kısa düz üst, yuvarlak omuz, eğim, yuvarlak arka köşe --- */
      const zf = d / 2 - .014 - b, zb = -d / 2 + b, yb = base + b, yt = h - b, hr = .105, zs = zf - .04, s = new THREE.Shape();
      s.moveTo(zb, yb); s.lineTo(zf, yb); s.lineTo(zf, yt); s.lineTo(zs, yt);
      s.bezierCurveTo(zs - .04, yt, zs - .062, yt - .014, zs - .08, yt - .04);
      s.lineTo(zb + .045, hr + .03); s.bezierCurveTo(zb + .025, hr + .006, zb, hr, zb, hr - .025); s.lineTo(zb, yb);
      const dd = w - .004 - 2 * b, geo = new THREE.ExtrudeGeometry(s, {depth: dd, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 5, curveSegments: 18});
      geo.rotateY(-Math.PI / 2); geo.translate(dd / 2, 0, 0);
      const shell = new THREE.Mesh(geo, white); shell.castShadow = shell.receiveShadow = true; g.add(shell);
      /* --- koyu gri kaide ve kauçuk ayaklar --- */
      put(g, rbox(w - .014, base - .004, d - .03, .006, plinth), 0, .004 + (base - .004) / 2, -.01);
      put(g, box(w - .03, .002, d - .05, M.matte(0x3A4148, .6)), 0, .005, -.01);
      [-1, 1].forEach(sx => [-1, 1].forEach(sz => put(g, cyl(.011, .012, .005, rub, 18), sx * (w / 2 - .025), .0025, -.01 + sz * (d / 2 - .04))));
      /* --- ön yüz: açık mavi çerçeve (yanlara ve üste sarar), içte beyaz panel --- */
      const fy = (base + h) / 2, fH = h - base + .004, fW = w + .004, zF = d / 2;
      const hole = [fW - .022, fH - .024, .018];
      put(g, gPlate(fW, fH, .026, .032, blue, .004, hole), 0, fy, zF - .013);
      const zP = zF - .004; /* panelin ön yüzü */
      put(g, gPlate(hole[0] + .001, hole[1] + .001, .01, .019, M.plastic(0xC9CED2, .4), .001), 0, fy + .0015, zP - .007);
      put(g, gPlate(hole[0] - .003, hole[1] - .003, .01, .017, white, .0025), 0, fy + .0015, zP - .005);
      /* --- ekran: siyah cam, ince kenar boşluğu --- */
      const sw = .148, sh = .1, sy = .214;
      put(g, gPlate(sw + .012, sh + .014, .003, .004, black, .0008), 0, sy, zP + .0015);
      const scr = makeScreen(sw, sh, tegScreen, 1024); put(g, scr.mesh, 0, sy, zP + .0033); screens.push(scr);
      /* --- TEG 6s yazısı (kırmızı; TEG kalın, 6s ince eğik, küçük ®) --- */
      const logo = decal(.075, .02, (c, W, Hh) => {
        c.clearRect(0, 0, W, Hh); c.fillStyle = '#C8102E'; c.textBaseline = 'alphabetic';
        c.font = `800 ${Math.round(Hh * .82)}px "Archivo", Arial, sans-serif`; c.fillText('TEG', 2, Hh * .86); let x = 2 + c.measureText('TEG').width + 1;
        c.font = `600 ${Math.round(Hh * .3)}px Arial, sans-serif`; c.fillText('®', x, Hh * .36); x += Hh * .26;
        c.font = `italic 200 ${Math.round(Hh * .84)}px "Helvetica Neue", "Archivo", Arial, sans-serif`; c.fillText('6s', x, Hh * .86);
      }, 512);
      put(g, logo, -hole[0] / 2 + .006 + .0375, sy - sh / 2 - .016, zP + .0006);
      /* --- dikey kartuş yuvası: açık gri çerçeve, içte koyu yuva, solda kılavuz şerit --- */
      const cyS = .095, slW = .027, slH = .088;
      put(g, gPlate(slW, slH, .005, .011, M.plastic(0xC3C9CE, .28), .0015, [slW - .008, slH - .008, .008]), 0, cyS, zP + .001);
      put(g, gPlate(slW - .006, slH - .006, .0012, .008, M.matte(0x1E2327, .55), .0003), 0, cyS, zP + .0007);
      put(g, box(.003, slH - .02, .002, M.plastic(0xD3D8DC, .35)), -.0062, cyS, zP + .0014);
      put(g, box(.0015, slH - .024, .001, M.matte(0x0C0F11, .6)), .0035, cyS, zP + .0014);
      /* --- takılı kartuş: dikey plaka, öne doğru çıkan kısmında örnek girişi ve yan etiket --- */
      const cart = new THREE.Group(); put(g, cart, .002, cyS + .001, zP);
      put(cart, rbox(.0095, .072, .066, .002, M.plastic(0xF6F8F9, .25)), 0, 0, -.006);
      put(cart, rbox(.0098, .015, .03, .0015, M.plastic(0x2D5FA8, .35)), 0, .026, .012);
      const lab = decal(.024, .042, (c, W, Hh) => {
        c.fillStyle = '#F4F7FA'; c.fillRect(0, 0, W, Hh); c.fillStyle = '#2D5FA8'; c.fillRect(0, 0, W, Hh * .2);
        c.fillStyle = '#FFFFFF'; c.font = `700 ${Math.round(Hh * .11)}px Arial`; c.fillText('TEG 6s', W * .08, Hh * .14);
        c.fillStyle = '#1B2328'; c.font = `600 ${Math.round(Hh * .075)}px Arial`; ['Citrated:', 'K, KH,', 'RTH, FFH'].forEach((s2, k) => c.fillText(s2, W * .08, Hh * (.33 + k * .1)));
        TEG_CH.forEach(([l, col], k) => { c.fillStyle = col; c.fillRect(W * (.08 + k * .22), Hh * .66, W * .16, Hh * .06); });
        c.fillStyle = '#1B2328'; for (let k = 0; k < 18; k++) c.fillRect(W * (.08 + k * .046), Hh * .8, W * (k % 3 ? .02 : .032), Hh * .14);
      }, 256);
      put(cart, lab, .0051, -.004, .009, 0, Math.PI / 2, 0);
      for (let k = 0; k < 5; k++) put(cart, box(.0102, .0015, .0015, M.plastic(0xDDE2E6, .4)), 0, -.026 + k * .0045, .0272);
      put(cart, cyl(.0042, .0042, .004, M.plastic(0xF6F8F9, .25), 20), 0, .0372, .016);
      put(cart, cyl(.0031, .0026, .0042, M.clear(0xD9EEF7, .7), 20), 0, .0374, .016);
      put(cart, torus(.0034, .0007, M.color(0xC0283A, .4), 24), 0, .0393, .016, Math.PI / 2);
      /* --- arka panel: güç girişi, anahtar, USB, ağ, havalandırma ve etiket --- */
      const zR = -d / 2 - .0004, ry = Math.PI;
      put(g, gPlate(.026, .019, .004, .003, M.matte(0x15181B, .5), .0008), .045, .055, zR);
      [[-.005, .002], [.005, .002], [0, -.004]].forEach(([px, py]) => put(g, box(.0018, .0035, .002, M.metal(0xB8BEC3)), .045 + px, .055 + py, zR - .002));
      put(g, gPlate(.014, .02, .004, .002, M.matte(0x15181B, .5), .0008), .018, .055, zR);
      put(g, box(.009, .007, .004, M.matte(0x2B3035, .5)), .018, .059, zR - .0025, -.25);
      put(g, gTxt('I  O', .012, .004, '#DDE2E6', 700, 'center'), .018, .047, zR - .0025, 0, ry);
      [[-.02, .06], [-.02, .048]].forEach(([px, py]) => { put(g, box(.013, .0055, .003, M.matte(0x0C0E10, .5)), px, py, zR); put(g, box(.009, .0016, .001, M.color(0x2F6FD0, .4)), px, py, zR - .0016); });
      put(g, box(.015, .013, .004, M.matte(0x0C0E10, .5)), -.045, .055, zR); put(g, box(.004, .002, .001, M.led(0x3DD68C)), -.05, .06, zR - .0021); put(g, box(.004, .002, .001, M.led(0xF2C531)), -.04, .06, zR - .0021);
      const vm = M.matte(0x2A3036, .7); for (let k = 0; k < 5; k++) put(g, box(.11, .0024, .002, vm), 0, .074 + k * .0045, zR + .0005);
      put(g, gTxt('TEG 6s  ·  100–240 V~  50/60 Hz', .1, .006, '#5A6B75', 600, 'center'), 0, .03, zR - .0005, 0, ry);
      /* güç kablosu: arka girişten masaya ve geriye */
      const pin = V3(.045, .055, zR - .012);
      put(g, gPlate(.024, .017, .02, .003, M.matte(0x1C2024, .5), .002), .045, .055, zR - .011);
      gCable(g, [pin.clone().add(V3(0, 0, -.01)), V3(.048, .045, zR - .04), V3(.052, .012, zR - .065), V3(.05, .0035, zR - .1), V3(.035, .0035, zR - .13)], .0035, M.matte(0x1C2024, .55), [true, false]);
      /* parça işaretleri */
      parts.push({key: 'screen', at: V3(0, sy, zP + .02)}, {key: 'g-cartridge', at: V3(-.006, cyS - .03, zP + .015)},
        {key: 'g-tegcart', at: V3(.002, cyS + .04, zP + .02)}, {key: 'g-rear', at: V3(0, .06, zR - .02)});
    }
  });
  /* ===== ClotPro: üretici görsellerine göre alçak, uzun analizör (koyu lacivert ön bant, sağda turuncu halkalı ClotPro yazısı,
     açık gri alt şerit, açık gri üst plaka ve üstünde altı ölçüm kanalının kademeli beyaz kapakları); arkasında ayaklı
     hepsi-bir-arada 16:9 bilgisayar ekranı, sağda açılı kolda elektronik pipet ve tutucusu, önde dokunmatik yüzeyli klavye ===== */
  T('g-cpholder', {tr: ['Pipet tutucu', 'Elektronik pipeti kullanımlar arasında dik ve hazır konumda tutar.'], en: ['Pipette holder', 'Holds the electronic pipette upright and ready between uses.'], es: ['Soporte de pipeta', 'Mantiene la pipeta electrónica en posición vertical y lista entre usos.']});
  /* [ad, renk, CT konumu, genlik, lizis, satırlar:[ad, değer, aralık, kırmızı?]] */
  const CP_T = [
    ['EX-test', '#EE1C1C', .07, .82, null, [['CT', '62 s', '38–65', 1], ['A5', '41 mm', '34–55'], ['A10', '51 mm', '43–65'], ['A20', '57 mm', '50–71'], ['MCF', '59 mm', '50–72'], ['CFT', '78 s', '34–159'], ['ML', '4 %', '0–15']]],
    ['FIB-test', '#7A4320', .07, .14, null, [['CT', '58 s', '33–60', 1], ['A5', '10 mm', '7–23'], ['A10', '12 mm', '8–24'], ['A20', '13 mm', '9–27'], ['MCF', '14 mm', '9–27']]],
    ['IN-test', '#1414E0', .1, .8, null, [['CT', '175 s', '137–246', 1], ['A5', '43 mm', '33–55'], ['A10', '52 mm', '42–64'], ['A20', '57 mm', '49–69'], ['MCF', '58 mm', '50–71'], ['CFT', '74 s', '38–122'], ['ML', '3 %', '0–15']]],
    ['TPA-test', '#D873E8', .055, .3, .085, [['CT', '64 s', '35–64', 1], null, null, null, ['MCF', '23 mm', '45–68', 1], ['LT', '96 s', '> 180', 1], ['ML', '100 %', '16–100', 1]]],
    ['RVV-test', '#E8BF62', .075, .81, null, [['CT', '98 s', '63–124', 1], ['A5', '42 mm', '34–55'], ['A10', '51 mm', '43–65'], ['A20', '56 mm', '50–70'], ['MCF', '58 mm', '50–72'], ['CFT', '81 s', '35–150'], ['ML', '5 %', '0–15']]]];
  const cpX = k => .045 + k * .157;
  /* araç çubuğu simgeleri (üretici ekranındaki sırayla: ekle, iptal, ..., yardım, kullanıcı) */
  function cpIcon(c, kind, x, y, r) {
    c.strokeStyle = c.fillStyle = '#1E2226'; c.lineWidth = r * .22; c.lineCap = 'round';
    const P = (pts, close, fill) => { c.beginPath(); pts.forEach(([a, b], i) => i ? c.lineTo(x + a * r, y + b * r) : c.moveTo(x + a * r, y + b * r)); if (close) c.closePath(); fill ? c.fill() : c.stroke(); };
    const O = (rr, fill, a0 = 0, a1 = 7) => { c.beginPath(); c.arc(x, y, rr * r, a0, a1); fill ? c.fill() : c.stroke(); };
    switch (kind) {
      case 'power': c.fillStyle = '#E8892B'; O(1, true); c.fillStyle = '#5A3A10'; O(.62, true); c.fillStyle = '#F2B25E'; O(.36, true); break;
      case 'plus': P([[-.7, 0], [.7, 0]]); P([[0, -.7], [0, .7]]); break;
      case 'cancel': O(.75); P([[-.5, .5], [.5, -.5]]); break;
      case 'cup': c.beginPath(); c.arc(x, y + .1 * r, .8 * r, Math.PI, 0); c.fill(); c.fillRect(x - .8 * r, y + .25 * r, 1.6 * r, .25 * r); c.fillStyle = '#fff'; c.fillRect(x - .5 * r, y - .2 * r, r, .18 * r); break;
      case 'clip': c.save(); c.translate(x, y); c.rotate(-.8); c.beginPath(); c.ellipse(0, 0, .35 * r, .85 * r, 0, 0, 7); c.stroke(); c.restore(); break;
      case 'smile': c.strokeStyle = '#2EB34A'; c.lineWidth = r * .2; O(.85); c.beginPath(); c.arc(x, y + .05 * r, .45 * r, .2, Math.PI - .2); c.stroke(); c.fillStyle = '#2EB34A'; c.fillRect(x - .35 * r, y - .35 * r, .16 * r, .2 * r); c.fillRect(x + .2 * r, y - .35 * r, .16 * r, .2 * r); break;
      case 'grid': c.strokeRect(x - .75 * r, y - .75 * r, 1.5 * r, 1.5 * r); P([[-.25, -.75], [-.25, .75]]); P([[.25, -.75], [.25, .75]]); break;
      case 'person': P([[-.55, -.8], [-.85, 0], [-.55, .8]]); P([[.55, -.8], [.85, 0], [.55, .8]]); O(.22, true); P([[-.3, .6], [0, .2], [.3, .6]]); break;
      case 'loop': c.beginPath(); c.ellipse(x, y, .8 * r, .45 * r, 0, .4, Math.PI * 2 - .4); c.stroke(); P([[.55, -.6], [.8, -.25], [.4, -.15]], false, false); break;
      case 'camera': c.fillRect(x - .85 * r, y - .45 * r, 1.7 * r, 1.15 * r); c.fillRect(x - .35 * r, y - .7 * r, .7 * r, .3 * r); c.fillStyle = '#fff'; O(.38, true); c.fillStyle = '#1E2226'; O(.2, true); break;
      case 'target': O(.8); O(.4); O(.12, true); break;
      case 'pencil': P([[-.7, .7], [-.55, .25], [.45, -.75], [.75, -.45], [-.25, .55]], true, true); break;
      case 'play': P([[-.5, -.7], [.7, 0], [-.5, .7]], true, true); break;
      case 'stop': c.fillRect(x - .6 * r, y - .6 * r, 1.2 * r, 1.2 * r); break;
      case 'mail': c.strokeRect(x - .8 * r, y - .55 * r, 1.6 * r, 1.1 * r); P([[-.8, -.55], [0, .1], [.8, -.55]]); break;
      case 'clock': O(.8); c.fillRect(x - .5 * r, y - 1 * r, r, .25 * r); P([[0, 0], [0, -.45]]); P([[0, 0], [.35, .2]]); break;
      case 'help': c.font = `800 ${Math.round(r * 1.7)}px Arial`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('?', x, y + .05 * r); c.textAlign = 'left'; break;
      case 'user': O(.35, true); c.beginPath(); c.arc(x, y + .95 * r, .7 * r, Math.PI, 0); c.fill(); P([[.5, -.6], [.9, -.2]]); break;
      case 'pip': c.fillRect(x - .18 * r, y - .9 * r, .36 * r, 1.1 * r); c.fillRect(x - .28 * r, y - 1.05 * r, .56 * r, .25 * r); P([[0, .2], [0, 1]]); break;
      case 'doc': c.strokeRect(x - .6 * r, y - .8 * r, 1.2 * r, 1.6 * r); P([[-.3, -.3], [.3, -.3]]); P([[-.3, 0], [.3, 0]]); P([[-.3, .3], [.1, .3]]); break;
    }
    c.lineCap = 'butt';
  }
  const cpScreen = {bg: '#FFFFFF', layout: [
    {t: 'box', x: .045, y: .108, w: .775, h: .026, fill: '#55595D'},
    {t: 'text', txt: 'Measurement · ClotPro', x: .048, y: .108, w: .3, h: .026, c: '#E6E8EA', s: .016, wt: 600},
    {t: 'text', txt: 'Patient 0042', x: .05, y: .143, w: .3, h: .03, c: '#1B2328', s: .022, wt: 700},
    {t: 'text', txt: '* 1967-03-15  ♂', x: .05, y: .172, w: .3, h: .026, c: '#3A4148', s: .019, wt: 600},
    ...CP_T.map(([l, c], k) => ({t: 'box', x: cpX(k), y: .345, w: .148, h: .048, fill: c})),
    ...CP_T.map(([l], k) => ({t: 'text', txt: l, x: cpX(k), y: .345, w: .148, h: .048, c: '#FFFFFF', s: .022, wt: 700, al: 'c'})),
    ...[0, 1, 2, 3, 4].map(k => ({t: 'box', x: cpX(k), y: .62, w: .148, h: .265, stroke: '#7E878E', lw: .003})),
    {t: 'box', x: .83, y: .62, w: .15, h: .265, stroke: '#7E878E', lw: .003},
    {t: 'text', txt: 'C6', x: .862, y: .34, w: .07, h: .07, c: '#2A2E33', s: .062, wt: 300, al: 'c'}
  ], draw(c, t, {W, H, txt}) {
    /* araç çubuğu */
    const ic = ['power', 'plus', 'cancel', 'cup', 'clip', null, 'smile', 'grid', 'person', 'loop', 'camera', 'target', 'pencil', 'play', 'stop', 'mail', 'clock', 'help', 'user'];
    let ix = .028 * W; ic.forEach(k => { if (!k) { ix += .02 * W; return; } cpIcon(c, k, ix, .055 * H, .024 * H); ix += .0365 * W; });
    txt('Lab', .755 * W, .043 * H, {c: '#7A848C', s: .014, wt: 600, al: 'c'}); txt('ClotPro', .755 * W, .066 * H, {c: '#7A848C', s: .014, wt: 600, al: 'c'});
    cpIcon(c, 'pip', .795 * W, .055 * H, .026 * H);
    txt('Test RVV / IN is running', .895 * W, .03 * H, {c: '#3A4148', s: .015, wt: 600, al: 'c'}); txt('ch 5 · 00:12:40', .895 * W, .052 * H, {c: '#3A4148', s: .014, wt: 500, al: 'c'});
    const on = Math.floor(t * 3) % 18; for (let k = 0; k < 18; k++) { c.fillStyle = k <= on ? '#3CC45A' : '#BFE8C8'; c.fillRect((.81 + k * .0095) * W, .074 * H, .0072 * W, .014 * H); }
    /* sol kenar simgeleri */
    cpIcon(c, 'doc', .022 * W, .12 * H, .012 * H); cpIcon(c, 'doc', .022 * W, .162 * H, .018 * H);
    [.255, .285, .315].forEach(yy => { c.strokeStyle = '#8A949B'; c.lineWidth = 1.5; c.strokeRect(.012 * W, yy * H - .01 * H, .022 * W, .02 * H); });
    CP_T.forEach(([l, col, ct, amp, lys, rows], k) => {
      const x0 = cpX(k) * W, cw = .148 * W;
      txt(`ch${k + 1} · 07.10.2026 08:${12 + k * 3} · 37.0 °C`, x0, .328 * H, {c: '#8A949B', s: .0135, wt: 500});
      rows.forEach((r, i) => {
        if (!r) return; const [n, v, rg, red] = r, yy = (.413 + i * .026) * H, ink = red ? '#E0242B' : '#1E2226';
        txt(n, x0 + cw * .02, yy, {c: ink, s: .018, wt: 600}); txt(v, x0 + cw * .3, yy, {c: ink, s: .018, wt: 600});
        txt('▸ ' + rg, x0 + cw * .64, yy, {c: ink, s: .016, wt: 500});
      });
      c.fillStyle = '#111'; c.beginPath(); c.arc(x0 + cw * .06, .605 * H, .009 * H, 0, 7); c.fill();
      /* eğri paneli: ızgara, orta çizgi, kırmızı CT eğimi, mavi zaman imleci, koyu mavi (FIB: mor) dolgu */
      const gx = x0 + 2, gy = .62 * H + 2, gw = cw - 4, gh = .265 * H - 4;
      c.strokeStyle = '#D3D8DC'; c.lineWidth = 1;
      for (let j = 1; j < 6; j++) { c.beginPath(); c.moveTo(gx + gw * j / 6, gy); c.lineTo(gx + gw * j / 6, gy + gh); c.stroke(); }
      for (let j = 1; j < 8; j++) { c.beginPath(); c.moveTo(gx, gy + gh * j / 8); c.lineTo(gx + gw, gy + gh * j / 8); c.stroke(); }
      c.strokeStyle = '#9AA2A8'; c.beginPath(); c.moveTo(gx, gy + gh / 2); c.lineTo(gx + gw, gy + gh / 2); c.stroke();
      c.strokeStyle = '#F08A7E'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(gx + gw * .07, gy + gh); c.lineTo(gx + gw * .19, gy); c.stroke();
      c.strokeStyle = '#4C78D8'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(gx + gw * .74, gy); c.lineTo(gx + gw * .74, gy + gh); c.stroke();
      const fib = k === 1;
      clotCurve(c, gx, gy + gh * .04, gw, gh * .92, {ct, amp, k: fib ? .05 : lys ? .018 : .085, lys, lysLen: .045, fill: fib ? '#E848E0' : '#2E3192', c: fib ? '#D030C8' : '#262A80', lw: 1.2});
      if (lys) { c.strokeStyle = '#38B048'; c.lineWidth = 2; c.beginPath(); c.moveTo(gx + gw * (lys + .045), gy + gh / 2); c.lineTo(gx + gw, gy + gh / 2); c.stroke(); }
    });
    /* 6. kanal: boş ızgara (hazır) */
    { const gx = .83 * W + 2, gy = .62 * H + 2, gw = .15 * W - 4, gh = .265 * H - 4; c.strokeStyle = '#D3D8DC'; c.lineWidth = 1;
      for (let j = 1; j < 6; j++) { c.beginPath(); c.moveTo(gx + gw * j / 6, gy); c.lineTo(gx + gw * j / 6, gy + gh); c.stroke(); }
      for (let j = 1; j < 8; j++) { c.beginPath(); c.moveTo(gx, gy + gh * j / 8); c.lineTo(gx + gw, gy + gh * j / 8); c.stroke(); }
      c.strokeStyle = '#9AA2A8'; c.beginPath(); c.moveTo(gx, gy + gh / 2); c.lineTo(gx + gw, gy + gh / 2); c.stroke();
      c.fillStyle = '#2A2E33'; c.fillRect(.836 * W, .598 * H, .014 * W, .014 * H); c.fillRect(.839 * W, .592 * H, .008 * W, .008 * H); }
    /* C6 logosu: yanında ölçek çizgileri */
    c.fillStyle = '#2A2E33'; c.fillRect(.935 * W, .355 * H, .026 * W, .004 * H); c.fillRect(.935 * W, .355 * H, .003 * W, .02 * H); c.fillRect(.948 * W, .396 * H, .013 * W, .003 * H);
    /* alt satır */
    cpIcon(c, 'doc', .022 * W, .91 * H, .012 * H); txt('ready · insert active tip in channel 6', .04 * W, .91 * H, {c: '#5A6670', s: .015, wt: 500});
  }};
  DEV3D.model('clotpro', {
    type: 'g-custom', theta: .3, phi: 1.22,
    build(g, parts, screens) {
      const w = .45, d = .26, y0 = .017, h = .074, top = y0 + h;
      const navy = M.color(0x1C2832, .32), plate = M.plastic(0xE3E6E8, .32), capM = M.plastic(0xF3F4F5, .26), seat = M.plastic(0xCDD2D6, .35);
      const blk = M.matte(0x16191C, .4), mon = M.color(0x15181B, .3), silver = M.metal(0xC4CACF, .32), rub = M.rubber(), cab = M.matte(0x1C2024, .55);
      /* --- kaide: kauçuk ayaklar, açık gri alt şerit, koyu gövde, üst plaka --- */
      [-1, 1].forEach(sx => [-1, 1].forEach(sz => put(g, cyl(.011, .012, .006, rub, 18), sx * (w / 2 - .03), .003, sz * (d / 2 - .03))));
      put(g, rbox(w - .006, .012, d - .006, .004, M.plastic(0xE7EAEC, .4)), 0, .006 + .006, 0);
      put(g, gTxt('enicor · ClotPro · REF 9001', .07, .005, '#6A747C', 600), -w / 2 + .045, .012, d / 2 - .0025);
      put(g, rbox(w, h, d, .012, navy), 0, y0 + h / 2, 0);
      put(g, box(w - .03, .0016, .001, M.color(0x3A4A57, .3)), 0, top - .006, d / 2 + .0002);
      const tp = gPlate(w - .016, d - .016, .008, .022, plate, .003); put(g, tp, 0, top + .001, 0, -Math.PI / 2);
      /* turuncu durum ışığı (sağ üst köşe) ve logo */
      put(g, box(.008, .003, .002, M.led(0xF39A2E)), w / 2 - .014, top - .004, d / 2 + .0006);
      const logo = decal(.1, .022, (c, W, Hh) => {
        c.clearRect(0, 0, W, Hh); const r = Hh * .42, cx = Hh * .5, cy = Hh * .5;
        c.fillStyle = '#E8892B'; c.beginPath(); c.arc(cx, cy, r, 0, 7); c.fill(); c.fillStyle = '#1C2832'; c.beginPath(); c.arc(cx, cy, r * .62, 0, 7); c.fill();
        c.fillStyle = '#E8892B'; c.beginPath(); c.arc(cx, cy, r * .34, 0, 7); c.fill();
        c.fillStyle = '#F2F4F5'; c.font = `500 ${Math.round(Hh * .78)}px "Archivo", Arial, sans-serif`; c.textBaseline = 'middle'; c.fillText('ClotPro', Hh * 1.08, Hh * .56);
      }, 512);
      put(g, logo, w / 2 - .065, y0 + h * .4, d / 2 + .0006);
      /* --- altı ölçüm kanalı: kare yuva + kademeli beyaz kapak; aralarda ısıtma kuyuları; 6. kanal sağda yükseltilmiş bölümde --- */
      const pT = top + .005, capPts = [[0, 0], [.0165, 0], [.0165, .004], [.0138, .0055], [.0136, .028], [.0128, .031], [.0092, .0335], [.0092, .036], [.0106, .0372], [.0106, .0465], [.0098, .0495], [.0065, .0515], [0, .052]];
      const capGeo = new THREE.LatheGeometry(capPts.map(p => new THREE.Vector2(p[0], p[1])), 40);
      const chX = [-.165, -.099, -.033, .033, .099], zc = .012;
      const addCap = (x, y, z) => {
        put(g, gPlate(.038, .038, .003, .007, seat, .001), x, y + .0005, z, -Math.PI / 2);
        put(g, cyl(.0175, .0175, .0012, M.matte(0x9AA2A8, .5), 32), x, y + .002, z);
        const m = new THREE.Mesh(capGeo, capM); m.castShadow = m.receiveShadow = true; put(g, m, x, y + .0026, z);
        put(g, torus(.0137, .0006, M.plastic(0xD8DCDF, .3), 40), x, y + .0026 + .018, z, Math.PI / 2);
      };
      chX.forEach(x => addCap(x, pT, zc));
      for (let k = 0; k < 4; k++) {
        const x = (chX[k] + chX[k + 1]) / 2, z = zc + .028;
        put(g, cyl(.0115, .0115, .0012, M.plastic(0xE4D3D3, .45), 28), x, pT + .0003, z);
        put(g, torus(.0115, .0008, M.plastic(0xCFC2C2, .4), 32), x, pT + .0006, z, Math.PI / 2);
        put(g, cyl(.0062, .0062, .0013, M.matte(0x8E8484, .6), 20), x, pT + .0004, z);
        /* ilk iki ısıtma yuvasında yeşil kapaklı küçük tüpler (kullanım görselindeki gibi) */
        if (k < 2) { put(g, cyl(.0058, .0055, .034, M.clear(0xEAF3F6, .75), 20), x, pT + .017, z); put(g, cyl(.0046, .0046, .02, M.plastic(0xF4F6F7, .4), 16), x, pT + .012, z); put(g, cyl(.0066, .0066, .009, M.color(0x3FA35A, .45), 20), x, pT + .038, z); }
      }
      /* sağ bölüm: yükseltilmiş taban, 6. kanal ve önünde gömme etiket */
      const x6 = .163;
      put(g, gPlate(.078, .16, .012, .016, plate, .003), x6, pT + .006, -.02, -Math.PI / 2);
      addCap(x6, pT + .012, -.035);
      put(g, gPlate(.05, .022, .002, .004, M.plastic(0xCED3D7, .35), .0006), x6, pT + .0122, .04, -Math.PI / 2);
      put(g, gTxt('6', .006, .008, '#5A646C', 700, 'center'), x6, pT + .0134, .04, -Math.PI / 2);
      parts.push({key: 'g-channel', at: V3(-.066, pT + .06, zc)});
      /* --- arka panel bağlantıları ve kablolar --- */
      const zR = -d / 2 - .0004;
      put(g, gPlate(.026, .019, .004, .003, blk, .0008), .15, y0 + .035, zR); put(g, gPlate(.014, .02, .004, .002, blk, .0008), .12, y0 + .035, zR);
      put(g, box(.009, .007, .004, M.matte(0x2B3035, .5)), .12, y0 + .039, zR - .0025, -.25);
      [[-.08, .045], [-.06, .045]].forEach(([px, py]) => { put(g, box(.013, .0055, .003, M.matte(0x0C0E10, .5)), px, py, zR); put(g, box(.009, .0016, .001, M.color(0x2F6FD0, .4)), px, py, zR - .0016); });
      put(g, gPlate(.024, .017, .02, .003, M.matte(0x1C2024, .5), .002), .15, y0 + .035, zR - .011);
      gCable(g, [V3(.15, y0 + .035, zR - .022), V3(.155, .03, zR - .05), V3(.16, .0035, zR - .08), V3(.14, .0035, zR - .14)], .0035, cab, [true, false]);
      /* --- hepsi-bir-arada ekran: ince siyah çerçeve, koyu çene, arkada çıkıntı; gümüş kemer ayak + arka destek --- */
      const sw = .47, sh = sw * 9 / 16, bz = .008, chin = .05, mw = sw + 2 * bz, mh = sh + bz + chin, mz = -.2, my = top + .042 + mh / 2;
      const mg = new THREE.Group(); mg.position.set(0, my, mz); mg.rotation.x = -.06; g.add(mg);
      put(mg, gPlate(mw, mh, .02, .006, mon, .003), 0, 0, 0);
      put(mg, gPlate(mw - .002, chin - .002, .0012, .004, M.matte(0x22272B, .45), .0004), 0, -mh / 2 + chin / 2, .0102);
      put(mg, gPlate(sw + .004, sh + .004, .0012, .002, M.color(0x050607, .12), .0003), 0, mh / 2 - bz - sh / 2, .0102);
      put(mg, rbox(.32, .2, .03, .012, mon), 0, -.02, -.022);
      put(mg, box(.006, .0015, .001, M.led(0xF2F4F5)), mw / 2 - .02, -mh / 2 + .012, .0112);
      const scr = makeScreen(sw, sh, cpScreen, 1280); put(mg, scr.mesh, 0, mh / 2 - bz - sh / 2, .0112); screens.push(scr);
      /* gümüş kemer ayak (önden çenenin altında görünür) ve arka destek */
      const az = mz + .002;
      g.add(tube([[-.2, .003, az + .02], [-.14, .07, az], [-.06, top + .04, az], [.06, top + .04, az], [.14, .07, az], [.2, .003, az + .02]], .005, silver, 64, 10));
      put(g, box(.1, .26, .012, silver), 0, .13 + .01, mz - .085, .42);
      put(g, gPlate(.18, .14, .006, .02, silver, .002), 0, .003, mz - .1, -Math.PI / 2);
      g.updateMatrixWorld(true);
      parts.unshift({key: 'screen', at: mg.localToWorld(V3(0, .04, .03))});
      parts.push({key: 'mount', at: V3(.14, .075, az + .01)});
      /* ekran kabloları: güç ve analizörden USB */
      const mBack = mg.localToWorld(V3(.08, -.1, -.04));
      gCable(g, [mBack, mBack.clone().add(V3(0, -.04, -.02)), V3(.1, .02, mz - .08), V3(.12, .0035, mz - .14), V3(.1, .0035, mz - .2)], .003, cab, [true, false]);
      const mB2 = mg.localToWorld(V3(-.06, -.11, -.04));
      gCable(g, [mB2, mB2.clone().add(V3(0, -.03, -.01)), V3(-.07, .06, zR - .03), V3(-.06, .045, zR - .012)], .0026, cab);
      /* --- pipet tutucu: sağ arka köşeden yükselen açılı siyah kol, kutu ve kıskaç --- */
      const hz = -.07, bar = (a, b2, tk = .01, dp = .028) => { const A = V3(...a), B = V3(...b2), L = A.distanceTo(B), m = rbox(tk, L, dp, .003, blk); m.position.copy(A).add(B).multiplyScalar(.5); m.quaternion.setFromUnitVectors(V3(0, 1, 0), B.clone().sub(A).normalize()); g.add(m); };
      put(g, rbox(.014, .05, .05, .004, blk), w / 2 + .004, y0 + .04, hz);
      bar([w / 2 + .008, y0 + .05, hz], [w / 2 + .012, top + .03, hz]);
      bar([w / 2 + .012, top + .028, hz], [.282, .29, hz]);
      bar([.282, .286, hz], [.282, .37, hz]);
      put(g, rbox(.026, .046, .032, .004, M.matte(0x1E2226, .45)), w / 2 + .035, top + .07, hz + .002);
      put(g, box(.004, .008, .001, M.led(0x3CC45A)), w / 2 + .035, top + .088, hz + .0185);
      const px = .3, pz = hz + .004, pY = .19;
      put(g, rbox(.03, .014, .012, .004, blk), (px + .282) / 2, .355, pz);
      put(g, torus(.0138, .0025, blk, 32), px, .355, pz, Math.PI / 2);
      parts.push({key: 'g-cpholder', at: V3(w / 2 + .035, top + .07, hz + .03)});
      /* --- elektronik pipet: beyaz gövde, mavi-siyah üst düğme, ekran penceresi, parmak kancası, gri uç --- */
      const pip = new THREE.Group(); put(g, pip, px, pY, pz);
      const bodyPts = [[.0036, .05], [.0044, .075], [.0058, .1], [.0066, .11], [.0092, .116], [.0112, .14], [.0126, .195], [.0124, .214], [.0108, .218], [0, .2185]];
      const pb = new THREE.Mesh(new THREE.LatheGeometry(bodyPts.map(p => new THREE.Vector2(p[0], p[1])), 32), M.plastic(0xF5F6F7, .3)); pb.castShadow = true; pip.add(pb);
      const tipM = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [.0011, 0], [.0034, .045], [.0042, .052], [0, .052]].map(p => new THREE.Vector2(p[0], p[1])), 20), M.color(0xB9C0C5, .3)); pip.add(tipM);
      put(pip, cyl(.0098, .0105, .016, M.color(0x1E2C44, .3), 28), 0, .226, 0);
      put(pip, cyl(.0072, .0072, .006, M.color(0x2D6FD0, .3), 24), 0, .237, 0);
      put(pip, box(.012, .02, .003, M.color(0x0B0E12, .15)), 0, .192, .0115);
      put(pip, box(.009, .007, .001, M.led(0x6FB4FF)), 0, .196, .0133);
      put(pip, box(.009, .008, .002, M.color(0x2D6FD0, .3)), 0, .175, .0118);
      put(pip, rbox(.008, .026, .016, .004, M.plastic(0xF5F6F7, .3)), 0, .168, -.0145, -.25);
      const pl = decal(.012, .012, (c, W, Hh) => { c.clearRect(0, 0, W, Hh); c.fillStyle = '#E8892B'; c.beginPath(); c.arc(W / 2, Hh / 2, W * .42, 0, 7); c.fill(); c.fillStyle = '#F5F6F7'; c.beginPath(); c.arc(W / 2, Hh / 2, W * .25, 0, 7); c.fill(); c.fillStyle = '#E8892B'; c.beginPath(); c.arc(W / 2, Hh / 2, W * .13, 0, 7); c.fill(); }, 64);
      put(pip, pl, 0, .15, .0122);
      parts.push({key: 'g-pipette', at: V3(px, pY + .14, pz + .02)});
      /* --- klavye: koyu gövde, tek tek tuşlar ve baskılar, sağda dokunmatik yüzey ve iki tuş --- */
      const kz = d / 2 + .115, kw = .4, kd = .135, kb = new THREE.Group(); put(g, kb, 0, .002, kz, .025);
      put(kb, gPlate(kw, kd, .011, .006, M.matte(0x17191C, .5), .002), 0, .0065, 0, -Math.PI / 2);
      const keyM = M.matte(0x24282C, .55), keyG = new THREE.BoxGeometry(1, 1, 1), kTop = .012 + .0045, u = .0198, x0 = -kw / 2 + .012, rows = [
        [[1, 'Esc'], ...'F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12'.split(' ').map(s2 => [1, s2]), [1, 'Prt'], [1, 'Del']],
        [...'` 1 2 3 4 5 6 7 8 9 0 - ='.split(' ').map(s2 => [1, s2]), [2, '←']],
        [[1.5, 'Tab'], ...'Q W E R T Y U I O P [ ]'.split(' ').map(s2 => [1, s2]), [1.5, '\\']],
        [[1.75, 'Caps'], ...'A S D F G H J K L ; \''.split(' ').map(s2 => [1, s2]), [2.25, 'Enter']],
        [[2.25, 'Shift'], ...'Z X C V B N M , . /'.split(' ').map(s2 => [1, s2]), [2.75, 'Shift']],
        [[1.25, 'Ctrl'], [1.25, 'Fn'], [1.25, 'Alt'], [6.25, ''], [1.25, 'Alt'], [1.25, '◂'], [1.25, '▴▾'], [1.25, '▸']]];
      const legend = [], rowZ = k => -kd / 2 + .012 + (k === 0 ? .006 : .016 + (k - .5) * .0192);
      rows.forEach((row, ri) => { let x = x0; row.forEach(([n, l]) => { const kwid = n * u - .0028, kdep = ri === 0 ? .0105 : .0164, cx = x + n * u / 2, cz = rowZ(ri);
        const m = new THREE.Mesh(keyG, keyM); m.scale.set(kwid, .006, kdep); m.position.set(cx, .012 + .0015, cz); m.castShadow = true; kb.add(m); legend.push([cx, cz, l, ri === 0]); x += n * u; }); });
      /* sağ blok: küçük tuşlar + dokunmatik yüzey */
      for (let r = 0; r < 2; r++) for (let k = 0; k < 4; k++) { const m = new THREE.Mesh(keyG, keyM), cx = .118 + k * .0195, cz = rowZ(r === 0 ? 0 : 1); m.scale.set(.0167, .006, r === 0 ? .0105 : .0164); m.position.set(cx, .0135, cz); kb.add(m); legend.push([cx, cz, ['Ins', 'Hm', 'PgU', 'PgD', 'Num', '/', '*', '−'][r * 4 + k], true]); }
      put(kb, gPlate(.072, .05, .0012, .004, M.color(0x0F1113, .25), .0003), .147, .0124, .02, -Math.PI / 2);
      [-1, 1].forEach(sx => { const m = new THREE.Mesh(keyG, keyM); m.scale.set(.034, .004, .011); m.position.set(.147 + sx * .0185, .0128, .055); kb.add(m); });
      const lg = decal(kw, kd, (c, W, Hh) => {
        c.clearRect(0, 0, W, Hh); c.fillStyle = '#C9CFD4'; c.textAlign = 'center'; c.textBaseline = 'middle';
        legend.forEach(([cx, cz, l, small]) => { if (!l) return; c.font = `600 ${Math.round(Hh * (small || l.length > 2 ? .036 : .055))}px Arial`; c.fillText(l, (cx / kw + .5) * W, (cz / kd + .5) * Hh); });
      }, 1024);
      put(kb, lg, 0, kTop + .0003, 0, -Math.PI / 2);
      gCable(g, [V3(-.15, .007, kz - kd / 2 - .002), V3(-.17, .004, kz - kd / 2 - .03), V3(-.26, .004, .09), V3(-.27, .004, -.06), V3(-.2, .004, mz - .03), V3(-.1, .06, mz - .045), mg.localToWorld(V3(-.1, -.1, -.04))], .0022, cab);
      parts.push({key: 'keypad', at: V3(-.05, .03, kz)});
    }
  });

  /* ===== Trombosit fonksiyon: üretici görseline göre beyaz masaüstü analizör, gri tuş takımlı LCD, solda dik test kartuşu yuvası, kablolu barkod okuyucu ===== */
  DEV3D.model('platelet-function', {
    type: 'g-bench', layout: 'flat', w: .3, h: .085, d: .3, body: 0xF2F3F4, accent: 0xB9C2C8, bezelBody: 0x8E989F, tilt: .9, sw: .1, sh: .08, screenX: .05, screenZ: .02,
    inlet: 'none', label: 'P2Y12', labelInk: '#8E2A3B', theta: .45,
    /* Ekran üretici görselindeki gibi küçük gri tek renkli LCD: üstte test adı, ortada PRU sonucu, sağ kenarda yandaki dört tuşa karşılık gelen seçenekler */
    screen: {bg: '#CBD3D8', layout: [
      {t: 'text', txt: 'PRUTest · P2Y12', x: .03, y: .02, w: .7, h: .14, c: '#22282C', s: .095, wt: 700},
      {t: 'box', x: .03, y: .17, w: .7, h: .012, fill: '#22282C'},
      {t: 'text', txt: 'PRU', x: .03, y: .26, w: .22, h: .2, c: '#22282C', s: .11, wt: 600},
      {t: 'text', txt: '212', x: .2, y: .22, w: .5, h: .34, c: '#22282C', s: .32, wt: 700, al: 'r'},
      {t: 'text', txt: 'Test complete', x: .03, y: .62, w: .7, h: .12, c: '#22282C', s: .085, wt: 500},
      {t: 'text', txt: 'Patient ID 0042', x: .03, y: .76, w: .7, h: .12, c: '#22282C', s: .085, wt: 500},
      {t: 'box', x: .76, y: 0, w: .004, h: 1, fill: '#22282C'},
      ...['Print', 'Menu', 'Next', 'Back'].map((l, k) => ({t: 'text', txt: l + ' ▸', x: .77, y: .04 + k * .24, w: .22, h: .16, c: '#22282C', s: .075, wt: 600, al: 'r'}))
    ]},
    extra(g, {w, h, d, parts}) {
      /* gri tuş takımı paneli */
      put(g, box(w * .4, .004, .1, M.plastic(0xC3CBD0)), .05, h + .009, .09); /* eğik ekranın önünde kalmalı */
      for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) put(g, rbox(.022, .006, .014, .003, M.matte(0x9AA4AB)), .05 + (c - 1) * .035, h + .013, .052 + r * .025);
      parts.push({key: 'keypad', at: V3(.05, h + .02, d * .3)});
      /* dik kartuş yuvası (sol arka) ve takılı test kartuşu */
      const cx = -w * .3, cz = -d * .05;
      put(g, rbox(.07, .02, .12, .02, M.plastic(0xE6E9EB)), cx, h + .015, cz);
      const shell = rbox(.05, .11, .03, .02, M.plastic(0xF4F6F7)); put(g, shell, cx, h + .07, cz - .04);
      put(g, box(.04, .09, .004, M.matte(0x30383E)), cx, h + .07, cz - .023);
      put(g, box(.012, .07, .006, M.plastic(0xD5DADE)), cx, h + .055, cz - .015);
      put(g, cyl(.006, .006, .03, M.clear(0xF4F6F7, .8), 16), cx, h + .1, cz - .012);
      parts.push({key: 'g-cartridge', at: V3(cx, h + .08, cz)});
      /* kablolu barkod okuyucu */
      const sx = w / 2 + .1, sz = d * .25;
      put(g, rbox(.05, .025, .13, .012, M.plastic(0xF2F3F4)), sx, .013, sz, 0, -.25);
      put(g, box(.04, .015, .02, M.matte(0x5B6670)), sx + .016, .01, sz + .06, 0, -.25);
      g.add(tube([[w / 2, h * .6, -d * .2], [w / 2 + .08, h * .9, -d * .3], [w / 2 + .14, .05, -d * .1], [sx - .01, .02, sz - .065]], .003, M.plastic(0xDDE2E5)));
      parts.push({key: 'g-scanner', at: V3(sx, .035, sz)});
    }
  });

  /* ---------- Serbest biçimli cihaz: cfg.build(g, parts, screens) ile kurulur ---------- */
  DEV3D.register('g-custom', cfg => { const g = new THREE.Group(), parts = [], screens = []; cfg.build(g, parts, screens, DEV3D.H); return {group: g, parts, screens}; });
  T('g-cuvette', {tr: ['Küvet tutucu', 'Kılcal kanla dolan mikroküvet bu çekmeceye yerleştirilip içeri itilir; ölçüm küvet içinde fotometrik olarak yapılır.'], en: ['Cuvette holder', 'The microcuvette filled with capillary blood is placed in this drawer and pushed in; the measurement is made photometrically in the cuvette.'], es: ['Portacubetas', 'La microcubeta llena de sangre capilar se coloca en este cajón y se introduce; la medición se realiza por fotometría en la cubeta.']});
  T('g-strip', {tr: ['Test şeridi', 'Tek kullanımlık şerit porta takılır ve kan damlası şeridin ucuna uygulanır; ölçüm şeritteki enzimatik tepkimeyle yapılır.'], en: ['Test strip', 'The single-use strip is inserted into the port and a blood drop is applied to its tip; measurement relies on the enzymatic reaction on the strip.'], es: ['Tira reactiva', 'La tira de un solo uso se inserta en el puerto y se aplica una gota de sangre en su extremo; la medición se basa en la reacción enzimática de la tira.']});
  T('g-cradle', {tr: ['Şarj istasyonu', 'Cihaz kullanılmadığında burada durur ve şarj olur; ölçüm kayıtları aktarılabilir.'], en: ['Charging station', 'The device rests and charges here when not in use; measurement records can be transferred.'], es: ['Base de carga', 'El equipo descansa y se carga aquí cuando no se usa; pueden transferirse los registros de medición.']});
  T('g-camera', {tr: ['Kamera ve ışık kaynağı', 'Standart bir ışık uyaranı verir ve pupilin daralma–genişleme yanıtını kızılötesi kamerayla kaydeder.'], en: ['Camera and light source', 'Delivers a standard light stimulus and records the pupil constriction–dilation response with an infrared camera.'], es: ['Cámara y fuente de luz', 'Emite un estímulo luminoso estándar y registra la respuesta de contracción–dilatación pupilar con una cámara infrarroja.']});

  /* ===== Hemoglobin ölçer: üretici görseline göre kırmızı gövde, mavi çerçeveli küçük LCD, sağda siyah küvet çekmecesi ===== */
  DEV3D.model('hemoglobin-meter', {
    type: 'g-custom', theta: .35,
    build(g, parts, screens) {
      const w = .12, h = .11, d = .1, red = M.plastic(0x9E0A20, .4);
      put(g, rbox(w, h, d, .012, red), 0, h / 2 + .004, 0);
      put(g, rbox(w * .96, .012, d * .96, .004, M.plastic(0x9E0C24)), 0, .006, 0);
      /* LCD (mavi çerçeve) ve tuş */
      put(g, rbox(.052, .058, .004, .004, M.plastic(0x1846C8, .3)), -w * .2, h * .62, d / 2 + .001);
      /* görseldeki gri tek renkli LCD (yatay); sonuç büyük rakamla, birim sağda */
      const scr = makeScreen(.044, .026, {bg: '#A9AFA8', layout: [
        {t: 'icon', g: 'battery', x: .82, y: .05, w: .13, h: .16, c: '#20262A'},
        {t: 'text', txt: 'Hb', x: .04, y: .05, w: .2, h: .18, c: '#20262A', s: .15, wt: 600},
        {t: 'text', txt: '13.4', x: .02, y: .2, w: .7, h: .72, c: '#20262A', s: .62, wt: 500, al: 'r'},
        {t: 'text', txt: 'g/dL', x: .73, y: .6, w: .26, h: .25, c: '#20262A', s: .17, wt: 600}
      ]}, 512);
      put(g, scr.mesh, -w * .2, h * .66, d / 2 + .0035); screens.push(scr);
      put(g, rbox(.016, .009, .004, .003, M.matte(0x1B2126)), -w * .26, h * .43, d / 2 + .003);
      parts.push({key: 'screen', at: V3(-w * .2, h * .66, d / 2 + .01)}, {key: 'keypad', at: V3(-w * .26, h * .43, d / 2 + .01)});
      /* küvet çekmecesi (sağ ön, yarı açık disk) */
      const dr = new THREE.Group(); put(g, dr, w * .47, h * .4, d * .15);
      const disc = cyl(.04, .04, .016, M.matte(0x1E1A1C, .5), 40); disc.rotation.z = Math.PI / 2; dr.add(disc);
      put(dr, box(.024, .006, .05, M.matte(0x1E1A1C, .5)), .0, .048, .0);
      put(dr, box(.004, .018, .03, M.clear(0xF2F5F7, .8)), .0, .04, .012);
      put(dr, box(.0035, .006, .008, M.color(0x8E1B22, .4)), .0, .044, .022);
      parts.push({key: 'g-cuvette', at: V3(w * .47 + .01, h * .4, d * .15 + .03)});
      /* küvet (dışarıda) */
      const cv = new THREE.Group(); put(g, cv, w / 2 + .05, .003, d * .45, 0, .4);
      cv.add(box(.03, .003, .014, M.clear(0xF2F5F7, .85))); put(cv, box(.008, .0035, .006, M.color(0x8E1B22, .4)), .011, 0, 0);
    }
  });

  /* ===== Glukometre / laktat ölçer: görsel yok → genel el tipi ölçer, üst portta test şeridi ===== */
  const stripMeter = (title, p, body, accent) => ({
    type: 'handheld', w: .06, h: .1, d: .02, body, keys: 2, screenFrac: .5, accessory: 'none',
    screen: {title, theme: 'light', accent, params: [p]},
    extra(g, {body: b, w, h, d, parts, toW}) {
      put(b, box(.012, .004, .006, M.matte(0x30383E)), 0, h / 2 - .001, 0);
      put(b, box(.009, .04, .0012, M.plastic(0xF4F6F7)), 0, h / 2 + .018, 0);
      put(b, box(.007, .008, .0014, M.color(0xC9A227)), 0, h / 2 + .006, 0);
      put(b, sphere(.0035, M.color(0x8E1B22, .2)), 0, h / 2 + .039, .001);
      b.updateMatrixWorld(true);
      parts.push({key: 'g-strip', at: toW(0, h / 2 + .03, .006)});
    }
  });
  DEV3D.model('glucometer', stripMeter('GLU', {l: 'Glukoz / Glucose', v: 112, u: 'mg/dL', c: '#1B2328', big: true}, 0xF1F3F4, '#2F7DD1'));
  DEV3D.model('lactate-meter', stripMeter('LAC', {l: 'Laktat / Lactate', v: '1.6', u: 'mmol/L', c: '#1B2328', big: true}, 0x4E5A63, '#E07B22'));

  /* ===== Pupillometre: üretici görseline göre beyaz tabanca kabzalı el cihazı, mavi çerçeveli ekran, öne uzanan kamera gövdesi, şeffaf göz kabı, şarj istasyonu ===== */
  DEV3D.model('pupillometer', {
    type: 'g-custom', theta: .9,
    build(g, parts, screens) {
      const white = M.plastic(0xF3F5F6), blue = M.plastic(0x2C7CC8, .35);
      /* şarj istasyonu */
      put(g, cyl(.05, .055, .012, blue, 40), 0, .006, 0);
      put(g, cyl(.032, .05, .06, white, 40), 0, .042, 0);
      put(g, box(.008, .004, .002, M.led(0x46D36A)), 0, .008, .054);
      parts.push({key: 'g-cradle', at: V3(0, .05, .04)});
      /* cihaz: kabza istasyonda, üstte kamera gövdesi -z yönüne uzanır */
      const dev = new THREE.Group(); put(g, dev, 0, .06, 0, -.12, 0, 0);
      const grip = rbox(.04, .13, .035, .015, white); put(dev, grip, 0, .065, 0);
      for (let k = 0; k < 6; k++) put(dev, box(.041, .002, .036, M.plastic(0xE2E6E9)), 0, .02 + k * .015, 0);
      const head = new THREE.Group(); put(dev, head, 0, .155, -.015); dev.add(head);
      put(head, rbox(.075, .1, .03, .01, blue), 0, -.004, .012);
      put(head, rbox(.068, .093, .03, .01, white), 0, -.004, .008);
      /* Ekran üretici görselindeki gibi (dikey, siyah zemin): üstte pil/kimlik/saat, Right–Left–Diff sütunlu NPi ve Size satırları, altta turuncu/gri/yeşil üç düğme */
      const scr = makeScreen(.05, .054, {bg: '#000000', layout: [
        {t: 'box', x: .03, y: .025, w: .08, h: .045, stroke: '#3CC45A', lw: .006}, {t: 'box', x: .035, y: .032, w: .05, h: .031, fill: '#3CC45A'},
        {t: 'text', txt: 'ID: 0042', x: .12, y: .01, w: .4, h: .07, c: '#E6EEF2', s: .045, wt: 500},
        {t: 'text', txt: '01:38:00', x: .5, y: .01, w: .48, h: .07, c: '#E6EEF2', s: .045, wt: 500, al: 'r'},
        {t: 'text', txt: 'Right', x: .2, y: .09, w: .3, h: .09, c: '#E6EEF2', s: .06, wt: 500, al: 'c'},
        {t: 'text', txt: 'Left', x: .52, y: .09, w: .24, h: .09, c: '#E6EEF2', s: .06, wt: 500, al: 'c'},
        {t: 'text', txt: 'Diff', x: .76, y: .09, w: .22, h: .09, c: '#E6EEF2', s: .06, wt: 500, al: 'c'},
        {t: 'box', x: .02, y: .19, w: .96, h: .006, fill: '#2F6FC0'},
        {t: 'text', txt: 'NPi', x: .0, y: .22, w: .2, h: .14, c: '#E6EEF2', s: .055, wt: 500},
        {t: 'text', txt: '3.8', x: .2, y: .22, w: .26, h: .14, c: '#7CD15A', s: .085, wt: 500, al: 'c'},
        {t: 'text', txt: '>', x: .44, y: .22, w: .08, h: .14, c: '#E6EEF2', s: .06, wt: 500, al: 'c'},
        {t: 'text', txt: '3.5', x: .52, y: .22, w: .24, h: .14, c: '#D8E04A', s: .085, wt: 500, al: 'c'},
        {t: 'text', txt: '0.3', x: .76, y: .22, w: .22, h: .14, c: '#7CD15A', s: .085, wt: 500, al: 'c'},
        {t: 'box', x: .02, y: .39, w: .96, h: .006, fill: '#2F6FC0'},
        {t: 'text', txt: 'Size', x: .0, y: .42, w: .2, h: .09, c: '#E6EEF2', s: .055, wt: 500},
        {t: 'text', txt: '[mm]', x: .0, y: .5, w: .2, h: .09, c: '#E6EEF2', s: .05, wt: 500},
        {t: 'text', txt: '4.89', x: .18, y: .43, w: .28, h: .15, c: '#7CD15A', s: .085, wt: 500, al: 'c'},
        {t: 'text', txt: '<', x: .44, y: .43, w: .08, h: .15, c: '#E6EEF2', s: .06, wt: 500, al: 'c'},
        {t: 'text', txt: '5.16', x: .52, y: .43, w: .24, h: .15, c: '#D8E04A', s: .085, wt: 500, al: 'c'},
        {t: 'text', txt: '0.27', x: .76, y: .43, w: .22, h: .15, c: '#D8E04A', s: .085, wt: 500, al: 'c'},
        {t: 'box', x: .02, y: .62, w: .96, h: .006, fill: '#2F6FC0'},
        {t: 'box', x: 0, y: .66, w: .33, h: .3, fill: '#E8892B'}, {t: 'icon', g: 'sd', x: .1, y: .72, w: .13, h: .18, c: '#FFFFFF'},
        {t: 'box', x: .335, y: .66, w: .33, h: .3, fill: '#8E9399'}, {t: 'button', x: .43, y: .73, w: .14, h: .16, g: 'play', c: '#FFFFFF', bc: '#FFFFFF', r: .08},
        {t: 'box', x: .67, y: .66, w: .33, h: .3, fill: '#3CB44A', stroke: '#FFFFFF', lw: .008}, {t: 'icon', g: 'menu', x: .71, y: .73, w: .14, h: .16, c: '#FFFFFF'},
        {t: 'text', txt: '1', x: .85, y: .66, w: .14, h: .3, c: '#FFFFFF', s: .1, wt: 500, al: 'c'}
      ]}, 512);
      put(head, rbox(.055, .059, .003, .003, M.matte(0x1B2126)), 0, .016, .028); put(head, scr.mesh, 0, .016, .0298); screens.push(scr);
      /* yön tuşları */
      put(head, rbox(.05, .016, .004, .006, blue), 0, -.034, .026);
      put(head, cyl(.006, .006, .004, M.plastic(0x1E5C9E), 20), 0, -.034, .029, Math.PI / 2);
      /* kamera gövdesi ve göz kabı */
      const barrel = cyl(.028, .03, .08, white, 32); barrel.rotation.x = Math.PI / 2; put(head, barrel, 0, .01, -.04); head.add(barrel); barrel.position.set(0, .01, -.04);
      put(head, cyl(.012, .012, .004, M.matte(0x1B2126), 24), 0, .01, -.081, Math.PI / 2);
      const cup = cyl(.03, .026, .03, M.clear(0x8DB8E8, .5), 32, true); put(head, cup, 0, .01, -.095, Math.PI / 2);
      put(head, cyl(.006, .006, .004, blue, 16), .03, .0, -.01, 0, 0, Math.PI / 2);
      g.updateMatrixWorld(true);
      parts.push({key: 'screen', at: head.localToWorld(V3(0, .016, .04))}, {key: 'keypad', at: head.localToWorld(V3(0, -.034, .035))},
        {key: 'g-camera', at: head.localToWorld(V3(0, .04, -.05))}, {key: 'eyecup', at: head.localToWorld(V3(0, .01, -.115))}, {key: 'handle', at: dev.localToWorld(V3(.025, .07, 0))});
    }
  });

  T('g-needle', {tr: ['Yalıtımlı blok iğnesi', 'Gövdesi yalıtılmış, yalnızca ucu iletken iğnedir; uyarı akımı uçtan verilir ve uzatma hattından enjeksiyon yapılır.'], en: ['Insulated block needle', 'Needle with an insulated shaft and a conductive tip only; the stimulating current is delivered at the tip and injection is made through the extension line.'], es: ['Aguja de bloqueo aislada', 'Aguja con vástago aislado y solo la punta conductora; la corriente se aplica en la punta y la inyección se realiza por la línea de extensión.']});
  T('g-electrode', {tr: ['Cilt elektrodu', 'Devreyi tamamlayan yüzey (dönüş) elektrodudur; stimülatörün pozitif kablosuna bağlanır.'], en: ['Skin electrode', 'Surface (return) electrode that completes the circuit; connected to the stimulator’s positive lead.'], es: ['Electrodo cutáneo', 'Electrodo de superficie (retorno) que cierra el circuito; se conecta al cable positivo del estimulador.']});
  T('g-dial', {tr: ['Akım ayar düğmesi', 'Uyarı akımını kademeli olarak artırıp azaltmak için kullanılır; seçilen değer ekranda görünür.'], en: ['Current dial', 'Used to raise and lower the stimulating current stepwise; the selected value appears on the display.'], es: ['Mando de corriente', 'Se usa para subir y bajar la corriente de estimulación de forma gradual; el valor elegido aparece en pantalla.']});

  /* ===== Periferik sinir stimülatörü: üretici görseline göre beyaz el cihazı, açık yeşil LCD, şeffaf kubbeli büyük döner düğme, yeşil yuvarlak tuşlar; kırmızı/siyah kablolar ===== */
  DEV3D.model('nerve-stimulator', {
    type: 'handheld', w: .075, h: .15, d: .03, body: 0xF2F4F4, keys: 0, screenFrac: .306,
    /* Ekran üretici görselindeki gibi açık yeşil LCD: üstte darbe genişliği ve aralık, solda çok büyük akım değeri, sağda SENSe / darbe simgesi / empedans, sağ altta pil */
    screen: {bg: '#BEE0D3', layout: [
      {t: 'text', txt: '0.10–0.10–1.00 ms', x: .02, y: .03, w: .7, h: .13, c: '#1F3B37', s: .085, wt: 500},
      {t: 'text', txt: '5 mA', x: .7, y: .03, w: .28, h: .13, c: '#1F3B37', s: .085, wt: 500, al: 'r'},
      {t: 'text', txt: '0.50', x: 0, y: .17, w: .7, h: .72, c: '#1F3B37', s: .56, wt: 500},
      {t: 'text', txt: 'mA', x: .62, y: .78, w: .12, h: .12, c: '#1F3B37', s: .08, wt: 600},
      {t: 'text', txt: 'SENSe', x: .72, y: .2, w: .27, h: .13, c: '#1F3B37', s: .085, wt: 600, al: 'r'},
      {t: 'text', txt: '10.4kΩ', x: .7, y: .52, w: .29, h: .13, c: '#1F3B37', s: .085, wt: 600, al: 'r'},
      {t: 'box', x: .86, y: .82, w: .11, h: .07, fill: '#1F3B37', r: .01}
    ], draw(c, t, {W, H}) {
      /* kare darbe simgesi */
      c.strokeStyle = '#1F3B37'; c.lineWidth = .018 * H; c.beginPath(); const x0 = .76 * W, y0 = .46 * H, y1 = .37 * H, st = .045 * W;
      c.moveTo(x0, y0); for (let k = 0; k < 5; k++) { c.lineTo(x0 + k * st, y1); c.lineTo(x0 + k * st + st * .5, y1); c.lineTo(x0 + k * st + st * .5, y0); c.lineTo(x0 + (k + 1) * st, y0); } c.stroke();
    }},
    extra(g, {body, w, h, d, parts, toW}) {
      const teal = M.plastic(0x2A9D8A, .35);
      /* kubbeli döner düğme */
      put(body, cyl(.019, .02, .006, M.clear(0xE8EEF0, .7), 32), -w * .14, -h * .12, d / 2 + .003, Math.PI / 2);
      put(body, cyl(.009, .009, .01, M.matte(0x1B2126), 24), -w * .14, -h * .12, d / 2 + .006, Math.PI / 2);
      put(body, torus(.016, .0012, teal, 32), -w * .14, -h * .12, d / 2 + .0065);
      /* yuvarlak tuşlar (mA / ms / Hz, yön, güç) */
      [-.04, -.12, -.2].forEach(y => put(body, cyl(.0065, .0065, .004, teal, 20), w * .3, h * y + .0, d / 2 + .002, Math.PI / 2));
      [[0, -.3], [-.13, -.36], [.13, -.36], [0, -.42]].forEach(([x, y]) => put(body, cyl(.0055, .0055, .004, teal, 20), -w * .14 + x * w, h * y, d / 2 + .002, Math.PI / 2));
      put(body, cyl(.0065, .0065, .004, teal, 20), w * .3, -h * .38, d / 2 + .002, Math.PI / 2);
      body.updateMatrixWorld(true);
      parts.push({key: 'g-dial', at: toW(-w * .14, -h * .12, d / 2 + .012)}, {key: 'keypad', at: toW(w * .3, -h * .12, d / 2 + .01)});
      /* kablolar: siyah → yalıtımlı iğne (katot), kırmızı → cilt elektrodu (anot) */
      const top = toW(0, h / 2, 0), tB = toW(-.008, h / 2 + .01, 0), tR = toW(.008, h / 2 + .01, 0);
      g.add(tube([tB, tB.clone().add(V3(0, .03, 0)), V3(-.06, .1, .02), V3(-.1, .03, .08), V3(-.09, .012, .12)], .0022, M.matte(0x1E2226)));
      g.add(tube([tR, tR.clone().add(V3(0, .03, 0)), V3(.07, .1, 0), V3(.11, .03, .07), V3(.1, .006, .12)], .0022, M.color(0xC0282E)));
      /* iğne: göbek + yalıtımlı şaft + uzatma hattı */
      const nd = new THREE.Group(); put(g, nd, -.08, .012, .13, 0, -.5, 0);
      nd.add(rbox(.02, .01, .012, .004, M.plastic(0xF4F6F7)));
      put(nd, cyl(.0011, .0011, .1, M.color(0xD9E2E8, .3), 10), .06, 0, 0, 0, 0, Math.PI / 2);
      put(nd, cyl(.0008, .0004, .006, M.metal(), 8), .113, 0, 0, 0, 0, Math.PI / 2);
      g.add(tube([V3(-.09, .012, .13), V3(-.12, .015, .16), V3(-.09, .01, .19), V3(-.05, .008, .18)], .0018, M.clear(0xEAF2F5, .8)));
      parts.push({key: 'g-needle', at: V3(-.05, .03, .11)});
      put(g, cyl(.016, .016, .002, M.plastic(0xF4F6F7), 24), .1, .002, .125);
      put(g, cyl(.006, .006, .004, M.metal(), 16), .1, .004, .125);
      parts.push({key: 'g-electrode', at: V3(.1, .02, .125)});
    }
  });

  /* ===== Enjeksiyon basıncı monitörü: üretici görseline göre şırınga ile iğne hattı arasına takılan şeffaf, yeşil-turkuaz tek kullanımlık manometre ===== */
  T('g-ipm', {tr: ['Basınç göstergesi', 'Şırınga ile iğne hattı arasına takılır; içindeki yaylı piston, enjeksiyon basıncı eşiklere ulaştıkça renkli bantları görünür kılar.'], en: ['Pressure indicator', 'Fitted between the syringe and the needle line; its spring-loaded piston reveals coloured bands as injection pressure reaches the thresholds.'], es: ['Indicador de presión', 'Se coloca entre la jeringa y la línea de la aguja; su pistón con resorte muestra bandas de color a medida que la presión alcanza los umbrales.']});
  T('g-syringe', {tr: ['Enjeksiyon şırıngası', 'Enjektatın verildiği standart Luer kilitli şırıngadır.'], en: ['Injection syringe', 'Standard Luer-lock syringe used to deliver the injectate.'], es: ['Jeringa de inyección', 'Jeringa estándar con cierre Luer para administrar el inyectado.']});
  DEV3D.model('injection-pressure-monitor', {
    type: 'g-custom', theta: .35, phi: 1.0,
    build(g, parts) {
      const y = .02;
      /* manometre gövdesi (x ekseni boyunca) */
      const tealC = M.clear(0x1FB3A0, .55), yel = M.clear(0xE8C800, .7);
      put(g, cyl(.006, .006, .016, yel, 24), -.035, y, 0, 0, 0, Math.PI / 2);
      put(g, cyl(.011, .011, .04, tealC, 32), -.006, y, 0, 0, 0, Math.PI / 2);
      put(g, cyl(.007, .011, .01, tealC, 32), .019, y, 0, 0, 0, Math.PI / 2);
      put(g, cyl(.0035, .0035, .02, tealC, 16), .034, y, 0, 0, 0, Math.PI / 2);
      /* içteki piston ve renk bantları */
      put(g, cyl(.0075, .0075, .012, M.color(0xF4F6F7), 24), -.012, y, 0, 0, 0, Math.PI / 2);
      put(g, cyl(.0078, .0078, .004, M.color(0x2E9E58), 24), -.002, y, 0, 0, 0, Math.PI / 2);
      put(g, cyl(.0078, .0078, .004, M.color(0xE8A317), 24), .004, y, 0, 0, 0, Math.PI / 2);
      parts.push({key: 'g-ipm', at: V3(-.006, y + .016, .004)});
      /* şırınga (sol) */
      const sy = new THREE.Group(); put(g, sy, -.1, y, 0);
      put(sy, cyl(.009, .009, .09, M.clear(0xF0F4F6, .45), 24, true), 0, 0, 0, 0, 0, Math.PI / 2);
      put(sy, cyl(.0082, .0082, .055, M.clear(0xD8ECF2, .5), 20), .015, 0, 0, 0, 0, Math.PI / 2);
      put(sy, cyl(.0085, .0085, .006, M.rubber(), 20), -.015, 0, 0, 0, 0, Math.PI / 2);
      put(sy, box(.05, .002, .012, M.plastic(0xF4F6F7)), -.04, 0, 0);
      put(sy, cyl(.012, .012, .003, M.plastic(0xF4F6F7), 20), -.066, 0, 0, 0, 0, Math.PI / 2);
      put(sy, box(.004, .03, .006, M.plastic(0xF4F6F7)), -.043, 0, 0);
      put(sy, cyl(.0035, .005, .012, M.plastic(0xF4F6F7), 16), .05, 0, 0, 0, 0, -Math.PI / 2);
      parts.push({key: 'g-syringe', at: V3(-.1, y + .014, 0)});
      /* uzatma hattı ve blok iğnesi (sağ) */
      g.add(tube([V3(.044, y, 0), V3(.07, y - .008, .015), V3(.08, .006, .05), V3(.05, .006, .07), V3(.0, .01, .07)], .0018, M.clear(0xEAF2F5, .8)));
      put(g, rbox(.016, .009, .01, .003, M.plastic(0xF4F6F7)), -.008, .01, .07);
      put(g, cyl(.0011, .0011, .08, M.color(0xD9E2E8, .3), 10), -.056, .01, .07, 0, 0, Math.PI / 2);
      put(g, cyl(.0008, .0003, .006, M.metal(), 8), -.099, .01, .07, 0, 0, Math.PI / 2);
      parts.push({key: 'g-needle', at: V3(-.05, .022, .07)});
    }
  });

  /* ===== TCD: görsel yok → genel biçim: araba üstünde monitör, iki taraflı prob tutuculu başlık ve el probu ===== */
  T('g-headframe', {tr: ['Prob başlığı', 'İki taraflı transtemporal probları sabit açıda tutarak sürekli izlem sırasında insonasyonun korunmasına yardımcı olur.'], en: ['Probe headframe', 'Holds bilateral transtemporal probes at a fixed angle to help maintain insonation during continuous monitoring.'], es: ['Casco portasondas', 'Sujeta las sondas transtemporales bilaterales con un ángulo fijo para ayudar a mantener la insonación durante la monitorización continua.']});
  T('g-tcdprobe', {tr: ['Doppler probu (2 MHz)', 'Düşük frekanslı darbeli Doppler probudur; akustik pencereden damar akım hızını ölçer, jelle uygulanır.'], en: ['Doppler probe (2 MHz)', 'Low-frequency pulsed-wave Doppler probe; measures vessel flow velocity through an acoustic window and is applied with gel.'], es: ['Sonda Doppler (2 MHz)', 'Sonda Doppler pulsado de baja frecuencia; mide la velocidad de flujo a través de una ventana acústica y se aplica con gel.']});
  function tcdProbe(len = .045) { const p = new THREE.Group(); p.add(cyl(.009, .008, len, M.plastic(0xE9EEF1), 24)); put(p, cyl(.0085, .0085, .004, M.matte(0x30383E), 24), 0, -len / 2 - .002, 0); return p; }
  DEV3D.model('tcd', {
    type: 'monitor', w: .34, h: .25, d: .08, body: 0xE9EEF1, mount: 'stand', keys: 5, knob: true, led: false, ports: [{side: 'right', n: 2, colors: [0xF2C531, 0x4FD1BE]}],
    screen: {title: 'TCD · MCA L / R', accent: '#F2C531', waves: [{k: 'doppler', c: '#F2C531', l: 'MCA L 52 mm'}, {k: 'doppler', c: '#4FD1BE', l: 'MCA R 50 mm'}],
      params: [{l: 'Vs', v: '96', u: 'cm/s', c: '#F2C531'}, {l: 'Vd', v: '42', u: 'cm/s', c: '#F2C531'}, {l: 'Vmean', v: '62', u: 'cm/s', c: '#F2C531', big: true}, {l: 'PI', v: '0.87', c: '#4FD1BE'}]},
    extra(g, {body, w, h, d, elev, parts}) {
      /* sağda başlık: yatay halka + tepe kemeri, iki yanda prob tutucu ve prob */
      const cx = w / 2 + .17, cz = .1, cy = .07;
      const hf = new THREE.Group(); put(g, hf, cx, cy, cz);
      const ring = torus(.08, .006, M.matte(0x2B3238), 48); ring.rotation.x = Math.PI / 2; ring.scale.set(1, 1.2, 1); hf.add(ring);
      const arch = torus(.08, .005, M.matte(0x2B3238), 48); arch.scale.set(1, 1.1, 1); hf.add(arch);
      put(hf, box(.03, .006, .03, M.matte(0x5B6670)), 0, .088, 0);
      [-1, 1].forEach(s => { const p = tcdProbe(); put(hf, p, s * .1, 0, 0, 0, 0, s * Math.PI / 2); put(hf, cyl(.013, .013, .015, M.matte(0x5B6670), 20), s * .083, 0, 0, 0, 0, Math.PI / 2);
        g.add(tube([V3(cx + s * .123, cy, cz), V3(cx + s * .14, cy + .04, cz - .03), V3(w / 2 + .06, h * .6, -.02), V3(w / 2 + .004, elev + h * .5 + s * .03, d * .1)], .0025, M.matte(0x2E363C))); });
      put(g, cyl(.04, .05, .012, M.rubber(0x3A4148), 32), cx, .006, cz);
      put(g, cyl(.012, .012, cy - .02, M.matte(0x3A4148)), cx, cy / 2, cz);
      parts.push({key: 'g-headframe', at: V3(cx, cy + .1, cz)}, {key: 'g-tcdprobe', at: V3(cx + .12, cy + .015, cz + .01)});
    }
  });

  /* ---------- Nöromonitörizasyon (EEG/IONM) arabası ----------
     Raflı araba, üstte geniş monitör, altta ana ünite, kablo ucunda elektrot giriş kutusu (headbox) ve elektrotlar.
     cfg: {screen, stim:'none'|'electrical'|'tes'|'probe', electrodes:'needles'|'cup', label} */
  T('g-headbox', {tr: ['Elektrot giriş kutusu (amplifikatör)', 'Hastaya yakın konumlanan, elektrot kablolarının takıldığı ve küçük biyoelektrik sinyalleri yükselten birimdir; kanal etiketleri montajla eşleşmelidir.'], en: ['Electrode input box (amplifier)', 'Unit placed near the patient where electrode leads plug in and small bioelectric signals are amplified; channel labels must match the montage.'], es: ['Caja de entrada de electrodos (amplificador)', 'Unidad situada cerca del paciente donde se conectan los electrodos y se amplifican las pequeñas señales bioeléctricas; las etiquetas deben coincidir con el montaje.']});
  T('g-electrodes', {tr: ['Kayıt elektrotları', 'Deri altı iğne ya da yüzey elektrotlardır; renk/numara kodlu kablolarla giriş kutusuna bağlanır.'], en: ['Recording electrodes', 'Subdermal needle or surface electrodes; connected to the input box with colour/number-coded leads.'], es: ['Electrodos de registro', 'Electrodos subdérmicos de aguja o de superficie; se conectan a la caja de entrada con cables codificados por color/número.']});
  T('g-mainunit', {tr: ['Ana ünite', 'Sinyal işleme, uyarı üretimi ve kayıt donanımını barındırır; monitör ve giriş kutusu buna bağlanır.'], en: ['Main unit', 'Houses signal processing, stimulus generation and recording hardware; the monitor and input box connect to it.'], es: ['Unidad principal', 'Aloja el procesamiento de señales, la generación de estímulos y el registro; el monitor y la caja de entrada se conectan a ella.']});
  T('g-stim', {tr: ['Uyarıcı', 'Sinir, kas ya da korteks uyarısı için akım/gerilim darbesi üretir; uyarı parametreleri yazılımdan ayarlanır.'], en: ['Stimulator', 'Generates current/voltage pulses for nerve, muscle or cortical stimulation; stimulus parameters are set in the software.'], es: ['Estimulador', 'Genera pulsos de corriente/tensión para estimular nervio, músculo o corteza; los parámetros se ajustan en el software.']});
  T('g-stimprobe', {tr: ['Uyarı probu', 'Cerrahın sinir ya da vida yolunu doğrudan uyardığı el probudur; yanıt kaslardan kaydedilir.'], en: ['Stimulation probe', 'Handheld probe with which the surgeon directly stimulates a nerve or screw track; the response is recorded from muscles.'], es: ['Sonda de estimulación', 'Sonda manual con la que el cirujano estimula directamente un nervio o el trayecto de un tornillo; la respuesta se registra en los músculos.']});

  DEV3D.register('g-ionm', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const cw = .5, cd = .42, top = .82, frame = M.matte(0x4A535B), shelf = M.plastic(0xDCE1E4);
    /* araba */
    put(g, rbox(cw, .03, cd, .01, shelf), 0, .08, 0);
    [-1, 1].forEach(sx => [-1, 1].forEach(sz => { put(g, cyl(.012, .012, top - .08, frame, 12), sx * (cw / 2 - .03), .08 + (top - .08) / 2, sz * (cd / 2 - .03)); put(g, cyl(.025, .025, .02, M.rubber(), 16), sx * (cw / 2 - .05), .025, sz * (cd / 2 - .05), 0, 0, Math.PI / 2); }));
    put(g, rbox(cw, .025, cd, .008, shelf), 0, .45, 0);
    put(g, rbox(cw, .025, cd, .008, shelf), 0, top, 0);
    put(g, tube([[-cw / 2 + .03, top + .01, -cd / 2 + .01], [-cw / 2 + .03, top + .05, -cd / 2 - .03], [cw / 2 - .03, top + .05, -cd / 2 - .03], [cw / 2 - .03, top + .01, -cd / 2 + .01]], .008, frame), 0, -.2, 0);
    /* ana ünite */
    put(g, rbox(.38, .13, .3, .01, M.plastic(0xEEF1F3)), 0, .45 + .0125 + .065, -.02);
    put(g, box(.3, .01, .002, M.matte(0x30383E)), 0, .45 + .1, .131);
    for (let k = 0; k < 6; k++) put(g, cyl(.005, .005, .004, M.color([0x2F7DD1, 0xE04040, 0x2E9E58, 0xF2C531, 0x8AA8FF, 0xF4F6F7][k], .4), 12), -.12 + k * .048, .45 + .06, .132, Math.PI / 2);
    parts.push({key: 'g-mainunit', at: V3(-.1, .45 + .1, .14)});
    /* monitör ve klavye */
    const mw = .5, mh = .32, my = top + .0125 + .06 + mh / 2;
    put(g, box(.06, .06, .04, M.metal(0xB9C1C7)), 0, top + .04, -.1);
    put(g, rbox(mw, mh, .035, .01, M.matte(0x22282D)), 0, my, -.08);
    const scr = makeScreen(mw * .95, mh * .9, cfg.screen); put(g, scr.mesh, 0, my, -.08 + .018); screens.push(scr);
    parts.unshift({key: 'screen', at: V3(0, my, -.05)});
    put(g, rbox(.36, .015, .12, .004, M.matte(0x2B3238)), 0, top + .02, .11, .08);
    parts.push({key: 'keypad', at: V3(0, top + .035, .12)});
    /* elektrot giriş kutusu: yan kolda */
    const hx = cw / 2 + .16, hy = .62, hz = .1;
    put(g, box(.18, .012, .02, frame), cw / 2 + .08, hy - .03, hz);
    const hb = rbox(.16, .05, .11, .01, M.plastic(0x2F5E86)); put(g, hb, hx, hy, hz);
    for (let r = 0; r < 2; r++) for (let c = 0; c < 8; c++) put(g, cyl(.0035, .0035, .004, M.color(c % 2 ? 0x1B2126 : 0xE04040, .4), 10), hx - .06 + c * .017, hy + .026, hz - .015 + r * .03);
    g.add(tube([V3(.19, .45 + .06, .02), V3(cw / 2 + .05, .5, .15), V3(hx - .05, hy - .02, hz)], .004, M.matte(0x2E363C)));
    parts.push({key: 'g-headbox', at: V3(hx, hy + .04, hz)});
    /* elektrot kabloları ve uçları */
    const tips = [];
    const ecol = [0xE04040, 0x1B2126, 0x2F7DD1, 0x2E9E58, 0xF2C531, 0xF4F6F7];
    for (let k = 0; k < 6; k++) {
      const a = -.6 + k * .24, end = V3(hx + .1 + Math.cos(a) * .14, .01, hz + .12 + Math.sin(a) * .1);
      g.add(tube([V3(hx - .06 + k * .025, hy + .03, hz + .03), V3(hx - .03 + k * .03, hy - .05, hz + .12), V3(end.x, .2, end.z), end], .0012, M.color(ecol[k], .45)));
      if (cfg.electrodes === 'cup') { put(g, cyl(.006, .006, .003, M.metal(0xD4B26A), 16), end.x, .004, end.z); }
      else { put(g, box(.012, .004, .006, M.color(ecol[k], .4)), end.x, .004, end.z); put(g, cyl(.0005, .0005, .014, M.metal(), 6), end.x + .013, .004, end.z, 0, 0, Math.PI / 2); }
      tips.push(end);
    }
    parts.push({key: 'g-electrodes', at: tips[2].clone().add(V3(0, .02, 0))});
    /* uyarıcı */
    const st = cfg.stim || 'none';
    if (st === 'electrical' || st === 'tes') {
      const sx = -cw / 2 - .1, sy = .62;
      put(g, box(.12, .012, .02, frame), -cw / 2 - .05, sy - .035, .1);
      put(g, rbox(.13, .06, .1, .01, M.plastic(st === 'tes' ? 0xF2C531 : 0xEEF1F3)), sx, sy, .1);
      put(g, box(.05, .012, .002, M.matte(0x1B2126)), sx, sy + .01, .151);
      if (st === 'tes') put(g, box(.03, .018, .001, M.color(0xC0282E)), sx + .03, sy - .01, .151);
      parts.push({key: 'g-stim', at: V3(sx, sy + .04, .12)});
      const e1 = V3(sx - .05, .008, .26), e2 = V3(sx + .03, .008, .28);
      [e1, e2].forEach((e, i) => { g.add(tube([V3(sx - .02 + i * .04, sy - .02, .15), V3(sx - .03 + i * .05, .25, .22), e], .0015, M.color(i ? 0xE04040 : 0x1B2126, .45)));
        if (st === 'tes') { put(g, cyl(.004, .004, .012, M.color(i ? 0xE04040 : 0x1B2126, .4), 12), e.x, e.y, e.z); for (let k = 0; k < 4; k++) put(g, torus(.003, .0006, M.metal(), 12), e.x, e.y - .002, e.z + .008 + k * .002, 0, 0, 0); }
        else put(g, rbox(.02, .006, .012, .003, M.plastic(0xF4F6F7)), e.x, e.y, e.z); });
      parts.push({key: st === 'tes' ? 'g-tes' : 'sensor', at: e1.clone().add(V3(.04, .02, .01))});
    } else if (st === 'probe') {
      const p0 = V3(-cw / 2 - .05, .01, .25);
      const pr = new THREE.Group(); put(g, pr, p0.x, .012, p0.z, 0, .4, 0);
      put(pr, cyl(.006, .006, .1, M.plastic(0x2F7DD1), 16), 0, 0, 0, 0, 0, Math.PI / 2);
      put(pr, cyl(.001, .001, .05, M.metal(), 8), .075, 0, 0, 0, 0, Math.PI / 2); put(pr, sphere(.0018, M.metal()), .1, 0, 0);
      g.add(tube([V3(-.19, .45 + .06, .08), V3(-cw / 2 - .02, .3, .2), V3(p0.x - .06, .02, p0.z + .03), V3(p0.x - .045, .012, p0.z + .02)], .002, M.matte(0x2E363C)));
      parts.push({key: 'g-stimprobe', at: V3(p0.x, .03, p0.z)});
    }
    return {group: g, parts, screens};
  });
  T('g-tes', {tr: ['Transkraniyal uyarı elektrotları', 'Saçlı deriye yerleştirilen spiral (tirbuşon) ya da iğne elektrotlardır; motor korteksi uyarmak için yüksek gerilimli kısa darbeler iletir.'], en: ['Transcranial stimulation electrodes', 'Corkscrew or needle electrodes placed in the scalp; deliver short high-voltage pulses to stimulate the motor cortex.'], es: ['Electrodos de estimulación transcraneal', 'Electrodos en sacacorchos o de aguja colocados en el cuero cabelludo; aplican pulsos breves de alta tensión para estimular la corteza motora.']});
  const ionmW = (labels, col) => labels.map((l, i) => ({k: 'eeg', c: col[i % col.length], l}));
  DEV3D.model('eeg', {type: 'g-ionm', electrodes: 'cup', stim: 'none', theta: .7,
    screen: {title: 'EEG · 4 ch', accent: '#8FD18F', waves: ionmW(['Fp1-F3', 'Fp2-F4', 'F7-T3', 'F8-T4'], ['#8FD18F', '#8AA8FF']), extra: 'dsa', params: [{l: 'SR', v: '0', u: '%', c: '#F2C531'}, {l: 'SEF95 L', v: '13.4', u: 'Hz'}, {l: 'SEF95 R', v: '13.9', u: 'Hz'}]}});
  DEV3D.model('ssep', {type: 'g-ionm', electrodes: 'needles', stim: 'electrical', theta: .7,
    screen: {title: 'SSEP · Median / Tibial', accent: '#4FD1BE', waves: ionmW(["C3'-Fz  N20", "CPz-Fz  P37", 'Cv5-Fz  N13', "Erb's  N9"], ['#4FD1BE', '#F2C531']), params: [{l: 'N20 amp', v: '2.4', u: 'µV', c: '#4FD1BE'}, {l: 'N20 lat', v: '19.6', u: 'ms', c: '#4FD1BE'}, {l: 'P37 amp', v: '1.1', u: 'µV', c: '#F2C531'}, {l: 'P37 lat', v: '38.2', u: 'ms', c: '#F2C531'}]}});
  DEV3D.model('mep', {type: 'g-ionm', electrodes: 'needles', stim: 'tes', theta: .7,
    screen: {title: 'TcMEP · C3/C4', accent: '#F07A6A', waves: ionmW(['APB L', 'APB R', 'TA L', 'TA R', 'AH L'], ['#F07A6A', '#8AA8FF']), params: [{l: 'APB L', v: '+', c: '#7CC36A'}, {l: 'TA L', v: '+', c: '#7CC36A'}, {l: 'AH L', v: '+', c: '#7CC36A'}, {l: 'Stim', v: '320', u: 'V', c: '#F2C531'}]}});
  DEV3D.model('intraop-emg', {type: 'g-ionm', electrodes: 'needles', stim: 'probe', theta: .7,
    screen: {title: 'EMG · free-run / tEMG', accent: '#B184E8', waves: ionmW(['Vastus med L', 'Tib ant L', 'Gastroc L', 'Vastus med R'], ['#B184E8', '#5BB7DE']), params: [{l: 'tEMG', v: '14.0', u: 'mA', c: '#F2C531', big: true}, {l: 'Free-run', v: 'quiet', c: '#7CC36A'}]}});

  /* ===== ICP / PbtO2: görsel yok → genel biçim: küçük monitör, kablo ve kafatası vidası (bolt) ile yerleştirilen kateter/prob ===== */
  T('g-bolt', {tr: ['Kafatası vidası (bolt)', 'Kafatasına vidalanan, kateter ya da probu sabitleyen ve giriş yerini kapatan bağlantı parçasıdır; çok lümenli tiplerde birden fazla prob geçer.'], en: ['Cranial bolt', 'Fitting screwed into the skull that secures the catheter or probe and seals the entry site; multi-lumen types pass more than one probe.'], es: ['Tornillo craneal (bolt)', 'Pieza roscada en el cráneo que fija el catéter o la sonda y sella el punto de entrada; los modelos multilumen admiten varias sondas.']});
  T('g-icpcath', {tr: ['ICP kateteri', 'Ucunda basınç sensörü bulunan parankimal ya da ventriküler kateterdir; ara kablo ile monitöre bağlanır.'], en: ['ICP catheter', 'Parenchymal or ventricular catheter with a pressure sensor at its tip; connected to the monitor with an interface cable.'], es: ['Catéter de PIC', 'Catéter parenquimatoso o ventricular con sensor de presión en la punta; se conecta al monitor mediante un cable de interfaz.']});
  T('g-pbto2probe', {tr: ['PbtO₂ ve sıcaklık probları', 'Beyaz cevhere yerleştirilen ince problar prob çevresindeki doku oksijen basıncını ve sıcaklığı ölçer.'], en: ['PbtO₂ and temperature probes', 'Thin probes placed in white matter measure tissue oxygen pressure and temperature around the probe.'], es: ['Sondas de PbtO₂ y temperatura', 'Sondas finas colocadas en la sustancia blanca miden la presión de oxígeno tisular y la temperatura alrededor de la sonda.']});
  function boltSet(g, parts, x, z, lumens, cableTo, colors) {
    /* kemik dilimi gösterimi + vida + kateter(ler) */
    put(g, cyl(.06, .065, .012, M.color(0xE8DCC4, .8), 40), x, .006, z);
    put(g, cyl(.007, .007, .03, M.metal(), 20), x, .027, z);
    for (let k = 0; k < 6; k++) put(g, torus(.0075, .0012, M.metal(), 20), x, .016 + k * .004, z, Math.PI / 2);
    put(g, cyl(.011, .011, .008, M.plastic(0xF4F6F7), 20), x, .046, z);
    const tops = [];
    for (let i = 0; i < lumens; i++) {
      const ox = (i - (lumens - 1) / 2) * .008, c = (colors || [0x2F7DD1, 0xF2C531, 0xE04040])[i % 3];
      put(g, cyl(.003, .003, .016, M.plastic(c), 12), x + ox, .058, z);
      tops.push(V3(x + ox, .066, z));
    }
    tops.forEach((t, i) => g.add(tube([t, t.clone().add(V3(0, .05, .0)), V3(x - .06 - i * .01, .1, z - .04), V3(x - .12, .05, z - .06), cableTo[i] || cableTo[0]], .0016, M.plastic(i ? 0xDDE2E5 : 0xF4F6F7))));
    parts.push({key: 'g-bolt', at: V3(x, .05, z + .015)});
  }
  DEV3D.model('icp', {
    type: 'monitor', w: .2, h: .15, d: .075, body: 0xE9EEF1, mount: 'stand', keys: 4, led: true, handle: 'top', ports: [{side: 'right', n: 1, colors: [0x2F7DD1]}],
    screen: {title: 'ICP', accent: '#8AA8FF', waves: [{k: 'art', c: '#8AA8FF', l: 'ICP'}], params: [{l: 'ICP', v: 12, u: 'mmHg', c: '#8AA8FF', big: true, live: true}, {l: 'CPP', v: '72', u: 'mmHg', c: '#F2C531'}]},
    extra(g, {w, h, d, elev, parts}) {
      const bx = w / 2 + .14, bz = .1;
      const port = V3(w / 2 + .006, elev + h / 2 - h * .25, d * .1);
      boltSet(g, parts, bx, bz, 1, [V3(bx - .17, .015, bz + .02)]);
      /* ara kablo ve konektör */
      put(g, rbox(.03, .014, .014, .005, M.plastic(0x2F7DD1)), bx - .17, .01, bz + .02);
      g.add(tube([V3(bx - .185, .01, bz + .02), V3(bx - .22, .02, bz), V3(w / 2 + .05, .06, .02), port], .003, M.matte(0x2E363C)));
      parts.push({key: 'g-icpcath', at: V3(bx - .1, .1, bz - .03)});
    }
  });
  DEV3D.model('pbto2', {
    type: 'monitor', w: .22, h: .16, d: .08, body: 0xEEF1F3, mount: 'stand', keys: 4, led: true, ports: [{side: 'right', n: 2, colors: [0x2E9E58, 0xF2C531]}],
    screen: {title: 'PbtO2 · Temp', accent: '#4FD1BE', extra: 'trend', params: [{l: 'PbtO2', v: 24, u: 'mmHg', c: '#4FD1BE', big: true, live: true}, {l: 'Tbr', v: '37.4', u: '°C', c: '#F2C531'}]},
    extra(g, {w, h, d, elev, parts}) {
      const bx = w / 2 + .15, bz = .1;
      const p1 = V3(w / 2 + .006, elev + h / 2 - h * .25, d * .1), p2 = V3(w / 2 + .006, elev + h / 2 + h * .25, d * .1);
      boltSet(g, parts, bx, bz, 3, [V3(bx - .17, .015, bz + .03), V3(bx - .17, .015, bz + .0), V3(bx - .16, .015, bz - .03)], [0x2E9E58, 0xF2C531, 0xF4F6F7]);
      [[0x2E9E58, .03, p1], [0xF2C531, .0, p2]].forEach(([c, oz, p]) => { put(g, rbox(.026, .012, .012, .004, M.plastic(c)), bx - .175, .01, bz + oz); g.add(tube([V3(bx - .19, .01, bz + oz), V3(bx - .22, .02, bz + oz - .02), V3(w / 2 + .05, .06, .02), p], .0028, M.matte(0x2E363C))); });
      parts.push({key: 'g-pbto2probe', at: V3(bx - .09, .11, bz - .03)});
    }
  });

  /* ---------- Temel izlem aksesuarları ---------- */
  T('g-leads', {tr: ['EKG kablo seti ve elektrotlar', 'Gövde kablosu ve renk kodlu derivasyon kabloları tek kullanımlık jel elektrotlara çıt çıtla bağlanır; elektrot yerleşimi derivasyonları belirler.'], en: ['ECG lead set and electrodes', 'Trunk cable and colour-coded lead wires snap onto single-use gel electrodes; electrode placement determines the leads.'], es: ['Juego de cables de ECG y electrodos', 'El cable troncal y los latiguillos con código de colores se conectan a electrodos de gel desechables; la colocación determina las derivaciones.']});
  T('g-cuff', {tr: ['Manşet', 'Kola sarılan şişirilebilir manşettir; boyutu kol çevresine uygun seçilmeli ve işaret çizgisi artere hizalanmalıdır.'], en: ['Cuff', 'Inflatable cuff wrapped around the arm; its size must suit the arm circumference and the index mark should line up with the artery.'], es: ['Manguito', 'Manguito inflable que se coloca en el brazo; su tamaño debe ajustarse a la circunferencia del brazo y la marca debe alinearse con la arteria.']});
  T('g-hose', {tr: ['Manşet hortumu', 'Manşeti monitöre bağlar; manşet şişirme basıncı ve osilasyonlar bu hat üzerinden algılanır. Bükülmemesine dikkat edin.'], en: ['Cuff hose', 'Connects the cuff to the monitor; inflation pressure and oscillations are sensed through this line. Keep it free of kinks.'], es: ['Tubo del manguito', 'Conecta el manguito al monitor; la presión de inflado y las oscilaciones se detectan por esta línea. Evite que se doble.']});
  T('g-finger', {tr: ['Parmak sensörü', 'Kırmızı ve kızılötesi ışık yayan LED ile karşısındaki fotodedektörü taşıyan klips sensördür.'], en: ['Finger sensor', 'Clip sensor carrying red and infrared LEDs and the photodetector opposite them.'], es: ['Sensor de dedo', 'Sensor de pinza con LED rojo e infrarrojo y el fotodetector enfrentado.']});
  T('g-tprobe', {tr: ['Sıcaklık probu', 'Termistör uçlu probdur; ölçüm bölgesi (özofagus, mesane, nazofarenks, cilt vb.) okunan değerin anlamını belirler.'], en: ['Temperature probe', 'Probe with a thermistor tip; the measurement site (oesophagus, bladder, nasopharynx, skin, etc.) determines what the reading means.'], es: ['Sonda de temperatura', 'Sonda con termistor en la punta; el lugar de medición (esófago, vejiga, nasofaringe, piel, etc.) determina el significado de la lectura.']});
  const IEC = [0xD32F2F, 0xF2C531, 0x2E9E58, 0x1B2126, 0xF4F6F7];
  /* EKG kablo seti: port → gövde kablosu → çatal → n elektrot (zemin üzerinde, merkez c) */
  function ecgLeads(g, from, c, n = 5) {
    const yoke = V3(c.x - .02, .015, c.z - .07);
    g.add(tube([from, from.clone().add(V3(-.04, -.02, .02)), V3(from.x - .06, from.y * .4, c.z - .1), yoke], .0032, M.matte(0x8C969D)));
    put(g, rbox(.022, .012, .03, .005, M.plastic(0xDDE2E5)), yoke.x, yoke.y, yoke.z);
    const pos = [[-.05, .0], [.05, .0], [-.05, .09], [.05, .09], [0, .05]];
    for (let k = 0; k < n; k++) {
      const e = V3(c.x + pos[k][0], .003, c.z + pos[k][1]);
      g.add(tube([yoke, V3((yoke.x + e.x) / 2, .03, (yoke.z + e.z) / 2), e.clone().add(V3(0, .008, 0))], .0014, M.matte(0x8C969D)));
      put(g, cyl(.017, .017, .002, M.plastic(0xF4F6F7), 24), e.x, .001, e.z);
      put(g, cyl(.006, .006, .007, M.color(IEC[k], .45), 16), e.x, .005, e.z);
    }
    return V3(c.x, .03, c.z + .05);
  }
  /* Klips parmak sensörü */
  function fingerClip(col = 0x8C9AA6) {
    const s = new THREE.Group();
    put(s, rbox(.05, .014, .024, .007, M.plastic(col)), 0, .016, 0, 0, 0, .06);
    put(s, rbox(.05, .012, .024, .006, M.plastic(0x3A4652)), 0, .004, 0);
    put(s, box(.006, .004, .004, M.led(0xE53935)), .004, .0105, 0);
    return s;
  }
  /* Kol manşeti (yatay, x ekseni boyunca) */
  function armCuff(col = 0x23466E) {
    const s = new THREE.Group();
    const c = cyl(.042, .046, .14, M.color(col, .85), 36, true); c.material.side = THREE.DoubleSide; c.rotation.z = Math.PI / 2; s.add(c);
    const flap = box(.13, .003, .06, M.color(col, .85)); put(s, flap, 0, .044, -.02, .5);
    put(s, box(.004, .03, .002, M.color(0xF4F6F7)), .01, 0, .046);
    return s;
  }
  /* İnce termistör probu */
  function tempProbe(g, from, pts, col = 0xF4F6F7) {
    const end = pts[pts.length - 1];
    g.add(tube([from, ...pts], .0022, M.plastic(col)));
    return end;
  }
  DEV3D.H.gEcgLeads = ecgLeads; DEV3D.H.gFingerClip = fingerClip; DEV3D.H.gArmCuff = armCuff;

  /* ===== Multiparametre hasta monitörü: görsel yok → genel yatak başı monitörü ve sol yandaki hasta kabloları ===== */
  DEV3D.model('multiparameter-monitor', {
    type: 'monitor', w: .32, h: .25, d: .12, body: 0xE9EEF1, mount: 'stand', keys: 6, knob: true, handle: 'top',
    ports: [{side: 'left', n: 4, colors: [0x2E9E58, 0x2F7DD1, 0xE04040, 0xF2C531]}], theta: .35,
    screen: {title: 'Adult · OR 3', accent: '#4FD1BE',
      waves: [{k: 'ecg', c: '#7CC36A', l: 'II'}, {k: 'pleth', c: '#5BB7DE', l: 'Pleth'}, {k: 'art', c: '#F07A6A', l: 'ART'}, {k: 'capno', c: '#F2C531', l: 'CO2'}],
      params: [{l: 'HR', v: 72, u: '/min', c: '#7CC36A', big: true, live: true}, {l: 'SpO2', v: 98, u: '%', c: '#5BB7DE', live: true}, {l: 'ART', v: '122/68 (86)', c: '#F07A6A'}, {l: 'NIBP', v: '118/72 (87)', c: '#E6EEF2'}, {l: 'T', v: '36.6', u: '°C', c: '#F2C531'}]},
    extra(g, {w, h, d, elev, parts}) {
      const px = -w / 2 - .003, py = k => elev + h / 2 - h * .25 + k * (h * .5 / 3), pz = d * .1;
      const ep = ecgLeads(g, V3(px, py(0), pz), V3(-w / 2 - .02, 0, .22));
      parts.push({key: 'g-leads', at: ep});
      const f = fingerClip(); put(g, f, -w / 2 - .17, .002, .12, 0, .3); g.add(tube([V3(px, py(1), pz), V3(px - .05, py(1) - .02, pz), V3(-w / 2 - .12, .06, .1), V3(-w / 2 - .15, .012, .115)], .0025, M.matte(0x2E363C)));
      parts.push({key: 'g-finger', at: V3(-w / 2 - .17, .03, .12)});
      const cf = armCuff(); put(g, cf, -w / 2 - .2, .046, -.08); g.add(tube([V3(px, py(2), pz), V3(px - .04, py(2), pz - .02), V3(-w / 2 - .12, .1, -.06), V3(-w / 2 - .2, .09, -.06)], .004, M.matte(0x5B6670)));
      parts.push({key: 'g-cuff', at: V3(-w / 2 - .2, .1, -.08)});
      tempProbe(g, V3(px, py(3), pz), [V3(px - .03, py(3) + .01, pz), V3(-w / 2 - .08, .05, .3), V3(-w / 2 + .05, .004, .32), V3(-w / 2 + .12, .004, .3)]);
      parts.push({key: 'g-tprobe', at: V3(-w / 2 + .1, .02, .3)});
    }
  });

  /* ===== EKG: görsel yok → genel EKG monitörü, 5 derivasyonlu kablo seti ve jel elektrotlar ===== */
  DEV3D.model('ecg', {
    type: 'monitor', w: .26, h: .19, d: .1, body: 0xEEF1F3, mount: 'stand', keys: 5, knob: true, ports: [{side: 'left', n: 1, colors: [0x2E9E58]}], theta: .4,
    screen: {title: 'ECG · 5-lead', accent: '#7CC36A', waves: [{k: 'ecg', c: '#7CC36A', l: 'II'}, {k: 'ecg', c: '#7CC36A', l: 'V5'}, {k: 'ecg', c: '#7CC36A', l: 'aVF'}],
      params: [{l: 'HR', v: 68, u: '/min', c: '#7CC36A', big: true, live: true}, {l: 'ST II', v: '+0.1', u: 'mm', c: '#E6EEF2'}, {l: 'ST V5', v: '-0.2', u: 'mm', c: '#E6EEF2'}]},
    extra(g, {w, h, d, elev, parts}) {
      const ep = ecgLeads(g, V3(-w / 2 - .003, elev + h / 2, d * .1), V3(-w / 2 + .02, 0, .2));
      parts.push({key: 'g-leads', at: ep});
    }
  });

  /* ===== Pulse oksimetre: görsel yok → genel el tipi oksimetre, kablolu klips parmak sensörü ===== */
  DEV3D.model('pulse-oximeter', {
    type: 'handheld', w: .075, h: .14, d: .03, body: 0xEEF1F3, keys: 3, screenFrac: .55, accessory: 'none',
    screen: {title: 'SpO2', accent: '#5BB7DE', waves: [{k: 'pleth', c: '#5BB7DE', l: 'Pleth'}], params: [{l: 'SpO2', v: 97, u: '%', c: '#5BB7DE', big: true, live: true}, {l: 'PR', v: '76', u: '/min', c: '#7CC36A'}, {l: 'PI', v: '2.4', u: '%', c: '#F2C531'}]},
    extra(g, {body, w, h, d, parts, toW}) {
      const port = toW(0, h / 2, 0), end = V3(w + .08, .0, .1);
      g.add(tube([port, port.clone().add(V3(0, .04, -.02)), V3(w * .8, .1, .04), V3(end.x - .04, .015, end.z), end.clone().add(V3(-.025, .01, 0))], .0025, M.matte(0x2E363C)));
      put(g, fingerClip(), end.x, .002, end.z);
      parts.push({key: 'g-finger', at: end.clone().add(V3(0, .035, 0))});
    }
  });

  /* ===== NIBP: görsel yok → genel biçim: osilometrik ölçüm yapan kompakt monitör, hortum ve kol manşeti ===== */
  DEV3D.model('nibp', {
    type: 'monitor', w: .22, h: .17, d: .1, body: 0xEEF1F3, mount: 'stand', keys: 4, led: true, handle: 'top', ports: [{side: 'left', n: 1, colors: [0x5B6670]}], theta: .35,
    screen: {title: 'NIBP · Auto 5 min', accent: '#E6EEF2', params: [{l: 'SYS', v: '118', u: 'mmHg', c: '#E6EEF2', big: true}, {l: 'DIA', v: '72', u: 'mmHg', c: '#E6EEF2', big: true}, {l: 'MAP', v: '87', u: 'mmHg', c: '#F2C531', big: true}, {l: 'PR', v: '74', u: '/min', c: '#7CC36A'}, {l: 'Cuff', v: '0', u: 'mmHg', c: '#6F8796'}, {l: 'Next', v: '04:12', c: '#6F8796'}]},
    extra(g, {w, h, d, elev, parts}) {
      const port = V3(-w / 2 - .004, elev + h / 2, d * .1);
      const cf = armCuff(); put(g, cf, -w / 2 - .12, .046, .14, 0, .5, 0);
      const cuffIn = V3(-w / 2 - .09, .09, .12);
      g.add(tube([port, port.clone().add(V3(-.04, 0, .01)), V3(-w / 2 - .08, .14, .06), cuffIn], .0042, M.matte(0x5B6670)));
      parts.push({key: 'g-hose', at: V3(-w / 2 - .07, .145, .05)}, {key: 'g-cuff', at: V3(-w / 2 - .14, .1, .15)});
    }
  });

  /* ===== Sıcaklık monitörü: görsel yok → genel biçim: iki kanallı küçük monitör, özofagus probu ve cilt sensörü ===== */
  DEV3D.model('temperature-monitor', {
    type: 'monitor', w: .18, h: .13, d: .08, body: 0xEEF1F3, mount: 'feet', keys: 3, led: true, ports: [{side: 'front', n: 2, colors: [0xF2C531, 0x5BB7DE]}], theta: .45,
    screenMargin: [.012, .012, .012, .045],
    screen: {title: 'TEMP', accent: '#F2C531', extra: 'trend', params: [{l: 'T1 Eso', v: '36.8', u: '°C', c: '#F2C531', big: true}, {l: 'T2 Skin', v: '34.9', u: '°C', c: '#5BB7DE'}]},
    extra(g, {w, h, d, elev, parts}) {
      const p1 = V3(-w / 2 + .012 + .02, elev + .045 * .5, d / 2 + .006), p2 = p1.clone().add(V3(.028, 0, 0));
      /* özofagus probu: ince uzun, uçta termistör */
      const e1 = tempProbe(g, p1, [p1.clone().add(V3(0, -.005, .04)), V3(-.05, .006, .16), V3(.05, .005, .22), V3(.16, .005, .2), V3(.24, .005, .14)], 0xF0F3F5);
      put(g, cyl(.003, .003, .012, M.metal(), 12), e1.x + .004, e1.y, e1.z - .004, Math.PI / 2, 0, -Math.PI / 4);
      /* cilt sensörü: yapışkan disk */
      const e2 = tempProbe(g, p2, [p2.clone().add(V3(0, -.005, .03)), V3(.1, .006, .12), V3(.14, .004, .07)], 0xDDE2E5);
      put(g, cyl(.014, .014, .002, M.plastic(0xF4F6F7), 24), e2.x + .01, .002, e2.z - .005);
      put(g, cyl(.004, .004, .004, M.metal(), 12), e2.x + .01, .004, e2.z - .005);
      parts.push({key: 'g-tprobe', at: V3(e1.x - .02, .02, e1.z + .01)}, {key: 'sensor', at: V3(e2.x + .01, .02, e2.z - .005)});
    }
  });

  /* ===== İnvaziv basınç sistemi: görsel yok → genel biçim: serum askısında basınç torbası, yıkama hattı, direğe takılı transdüser, kablo ile monitör, sert basınç hattı ve arter kanülü ===== */
  T('g-bag', {tr: ['Basınç torbası ve serum', 'Serum torbasını çevreleyen şişirilebilir torbadır; sürekli yıkama akışını sağlamak için manometreyle izlenen basınçta tutulur.'], en: ['Pressure bag and flush solution', 'Inflatable bag around the flush solution; kept at a pressure shown on its gauge to maintain continuous flush flow.'], es: ['Bolsa de presión y solución de lavado', 'Bolsa inflable alrededor de la solución; se mantiene a la presión indicada por su manómetro para asegurar el lavado continuo.']});
  T('g-transducer', {tr: ['Basınç transdüseri ve yıkama düzeneği', 'Sıvı sütunundaki basıncı elektrik sinyaline çevirir; yıkama düzeneği sürekli düşük akım ve hızlı yıkama sağlar. Sıfırlama için flebostatik eksen hizasına yerleştirilir.'], en: ['Pressure transducer and flush device', 'Converts the pressure in the fluid column into an electrical signal; the flush device provides a continuous low flow and a fast flush. Positioned at the phlebostatic axis for zeroing.'], es: ['Transductor de presión y dispositivo de lavado', 'Convierte la presión de la columna de líquido en señal eléctrica; el dispositivo de lavado aporta flujo continuo bajo y lavado rápido. Se sitúa en el eje flebostático para el cero.']});
  T('g-stopcock', {tr: ['Üç yollu musluk', 'Transdüserin atmosfere açılarak sıfırlanmasını ve kan örneği alınmasını sağlar.'], en: ['Three-way stopcock', 'Allows the transducer to be opened to air for zeroing and blood samples to be taken.'], es: ['Llave de tres vías', 'Permite abrir el transductor al aire para el cero y obtener muestras de sangre.']});
  T('g-tubing', {tr: ['Basınç hattı', 'Kısa ve sert (non-kompliyan) hattır; uzunluk, bükülme ve hava kabarcıkları dalga formunu bozar.'], en: ['Pressure tubing', 'Short, stiff (non-compliant) line; length, kinks and air bubbles distort the waveform.'], es: ['Línea de presión', 'Línea corta y rígida (no distensible); la longitud, los acodamientos y las burbujas distorsionan la curva.']});
  T('g-cannula', {tr: ['Arter kanülü', 'Damar içine yerleştirilen kanüldür; basınç hattına Luer kilitle bağlanır.'], en: ['Arterial cannula', 'Cannula placed in the vessel; connected to the pressure tubing with a Luer lock.'], es: ['Cánula arterial', 'Cánula colocada en el vaso; se conecta a la línea de presión con cierre Luer.']});
  DEV3D.model('invasive-pressure', {
    type: 'g-custom', theta: .45,
    build(g, parts, screens, H) {
      /* serum askısı */
      H.pole(g, 0, 0, 1.45, null);
      put(g, box(.2, .008, .008, M.metal()), 0, 1.45, 0);
      /* basınç torbası + serum + manometre + puar */
      const by = 1.25;
      put(g, rbox(.11, .2, .035, .015, M.clear(0xE6F1F5, .5)), .08, by, 0);
      put(g, rbox(.12, .21, .04, .016, M.color(0x2F5E86, .8)), .08, by, -.012);
      put(g, cyl(.012, .012, .006, M.matte(0x2B3238), 24), .08, by + .14, .0);
      put(g, cyl(.02, .02, .01, M.plastic(0xF4F6F7), 24), .14, by - .06, .03, Math.PI / 2);
      put(g, cyl(.017, .017, .002, M.color(0xF4F6F7), 24), .14, by - .06, .036, Math.PI / 2);
      put(g, box(.002, .012, .001, M.color(0xC0282E)), .144, by - .056, .037, 0, 0, -.6);
      g.add(tube([V3(.14, by - .07, .03), V3(.2, by - .2, .05), V3(.22, by - .3, .06)], .002, M.plastic(0x8C969D)));
      put(g, sphere(.016, M.rubber(0x2B3238)), .22, by - .32, .06);
      parts.push({key: 'g-bag', at: V3(.08, by + .05, .03)});
      /* yıkama seti: torbadan transdüsere */
      const ty = 1.0;
      g.add(tube([V3(.08, by - .11, 0), V3(.08, by - .16, .02), V3(.06, ty + .08, .04), V3(.045, ty + .02, .04)], .0018, M.clear(0xEAF2F5, .8)));
      put(g, cyl(.006, .006, .03, M.clear(0xEAF2F5, .7), 16), .08, by - .13, .01);
      /* transdüser plakası ve transdüser */
      put(g, box(.04, .1, .006, M.matte(0x3A4148)), .03, ty, .015);
      put(g, cyl(.015, .015, .02, M.matte(0x3A4148), 20), .0, ty, .0);
      const td = new THREE.Group(); put(g, td, .045, ty - .005, .03);
      td.add(rbox(.022, .05, .018, .005, M.plastic(0xF4F6F7)));
      put(td, box(.008, .014, .008, M.color(0x2F7DD1)), 0, .03, 0);
      put(td, cyl(.004, .004, .02, M.clear(0xEAF2F5, .7), 12), 0, -.035, 0);
      parts.push({key: 'g-transducer', at: V3(.045, ty + .03, .045)});
      /* musluk */
      put(g, box(.016, .006, .006, M.plastic(0x2F7DD1)), .045, ty - .05, .03); put(g, box(.006, .006, .016, M.plastic(0x2F7DD1)), .045, ty - .05, .03);
      parts.push({key: 'g-stopcock', at: V3(.055, ty - .05, .045)});
      /* monitöre kablo ve küçük monitör (direğe takılı) */
      const mw = .24, mh = .18, my = .82, mz = .02, mx = -.17;
      put(g, rbox(mw, mh, .06, .012, M.plastic(0xE9EEF1)), mx, my, mz);
      put(g, box(.06, .04, .04, M.matte(0x3A4148)), mx + mw / 2 - .01, my, -.01);
      const scr = H.makeScreen(mw * .88, mh * .78, {title: 'ART · CVP', accent: '#F07A6A', waves: [{k: 'art', c: '#F07A6A', l: 'ART'}, {k: 'cvp', c: '#5BB7DE', l: 'CVP'}], params: [{l: 'ART', v: '124/66', c: '#F07A6A'}, {l: 'MAP', v: 86, u: 'mmHg', c: '#F07A6A', big: true, live: true}, {l: 'CVP', v: '8', u: 'mmHg', c: '#5BB7DE'}]});
      put(g, scr.mesh, mx, my, mz + .0305); screens.push(scr);
      parts.unshift({key: 'screen', at: V3(mx, my, mz + .04)});
      g.add(tube([V3(.045, ty + .037, .03), V3(.03, ty + .08, .06), V3(-.05, my + .12, .05), V3(mx - mw / 2 + .01, my + .02, mz + .02), V3(mx - mw / 2 - .003, my, mz)], .0025, M.matte(0x2E363C)));
      /* basınç hattı → kanül (sedye/kol hizasında, alt raf) */
      const cy = .55, cx = .25, cz = .25;
      put(g, box(.18, .012, .14, M.matte(0x5B6670)), cx, cy - .01, cz);
      g.add(tube([V3(.045, ty - .055, .033), V3(.06, ty - .2, .08), V3(.12, cy + .12, .2), V3(.16, cy + .01, cz), V3(cx, cy + .005, cz)], .0022, M.clear(0xEAF2F5, .85)));
      put(g, cyl(.0045, .0045, .016, M.color(0xC0282E, .4), 16), cx + .008, cy + .005, cz, 0, 0, Math.PI / 2);
      put(g, cyl(.0012, .0012, .035, M.clear(0xF4F6F7, .9), 10), cx + .033, cy + .004, cz, 0, 0, Math.PI / 2);
      parts.push({key: 'g-tubing', at: V3(.12, cy + .13, .2)}, {key: 'g-cannula', at: V3(cx + .02, cy + .02, cz)});
    }
  });

  /* @@CONFIGS@@ */
})();
