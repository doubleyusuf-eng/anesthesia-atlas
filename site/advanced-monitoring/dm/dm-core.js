'use strict';
/* Temel cihaz kurucuları: monitör (masaüstü/direk/arabası), modül (raf yuvası), el cihazı.
   Diğer kurucu dosyaları bunları örnek alır. Parça anahtarları locales içindeki dm.p.<anahtar>.n/.d metinleriyle eşleşir. */
(() => {
  if (!DEV3D) return;
  const {V3, M, rbox, box, cyl, sphere, tube, put, makeScreen, decal} = DEV3D.H;

  /* Ortak: yazılı etiket bandı (cihaz adı) */
  const T = DEV3D.partText;
  T('screen', {tr: ['Ekran', 'Ölçülen değerleri, dalga formlarını, eğilimleri ve alarm mesajlarını gösterir. Ekrandaki değerler örnektir.'], en: ['Display', 'Shows measured values, waveforms, trends and alarm messages. Values on screen are examples.'], es: ['Pantalla', 'Muestra valores medidos, curvas, tendencias y mensajes de alarma. Los valores mostrados son ejemplos.']});
  T('keypad', {tr: ['Tuşlar', 'Menü, alarm susturma ve ölçüm başlatma gibi işlevlere erişim sağlar; tuş düzeni modele göre değişir.'], en: ['Keys', 'Give access to functions such as menus, alarm silencing and starting measurements; the layout varies by model.'], es: ['Teclas', 'Dan acceso a funciones como menús, silenciado de alarmas e inicio de mediciones; la disposición varía según el modelo.']});
  T('knob', {tr: ['Döner düğme', 'Menüde gezinmek ve seçimleri onaylamak için kullanılır.'], en: ['Rotary knob', 'Used to navigate menus and confirm selections.'], es: ['Mando giratorio', 'Se usa para navegar por los menús y confirmar selecciones.']});
  T('alarm', {tr: ['Alarm göstergesi', 'Alarm önceliğini renk ve yanıp sönme ile görsel olarak bildirir.'], en: ['Alarm indicator', 'Signals alarm priority visually with color and flashing.'], es: ['Indicador de alarma', 'Indica visualmente la prioridad de la alarma mediante color y parpadeo.']});
  T('port', {tr: ['Bağlantı noktası', 'Sensör, hasta kablosu ya da modül bağlantısı içindir; yalnızca üreticinin uyumlu aksesuarlarını kullanın.'], en: ['Connector', 'For sensor, patient cable or module connection; use only accessories approved by the manufacturer.'], es: ['Conector', 'Para la conexión del sensor, el cable del paciente o el módulo; use solo accesorios aprobados por el fabricante.']});
  T('handle', {tr: ['Tutamak', 'Cihazı taşımak için kullanılır.'], en: ['Handle', 'Used to carry the device.'], es: ['Asa', 'Se usa para transportar el equipo.']});
  T('mount', {tr: ['Montaj', 'Cihazı masaya, direğe, rayına ya da arabasına sabitler; düşmeye karşı sağlam takıldığını kontrol edin.'], en: ['Mount', 'Secures the device to a desk, pole, rail or cart; check that it is firmly attached.'], es: ['Montaje', 'Fija el equipo a la mesa, el soporte, el riel o el carro; compruebe que esté bien sujeto.']});
  T('module', {tr: ['Modül', 'Belirli bir ölçümü ana monitöre ekleyen takılabilir birimdir.'], en: ['Module', 'Plug-in unit that adds a specific measurement to the host monitor.'], es: ['Módulo', 'Unidad enchufable que añade una medición específica al monitor principal.']});
  T('led', {tr: ['Durum ışığı', 'Modülün çalıştığını ya da bağlantı durumunu gösterir.'], en: ['Status light', 'Shows that the module is running or its connection status.'], es: ['Luz de estado', 'Indica que el módulo funciona o el estado de la conexión.']});
  T('latch', {tr: ['Kilit', 'Modülün yuvaya oturmasını ve çıkarılmasını sağlar.'], en: ['Latch', 'Seats the module in its slot and releases it.'], es: ['Pestillo', 'Asienta el módulo en su ranura y permite retirarlo.']});
  T('sensor', {tr: ['Sensör / aksesuar', 'Hastaya uygulanan ölçüm ucudur; uygulama adımları için "Hastaya uygulama" bölümüne bakın.'], en: ['Sensor / accessory', 'The measuring part applied to the patient; see "Applying it to the patient" for the steps.'], es: ['Sensor / accesorio', 'Parte de medición aplicada al paciente; consulte "Aplicación al paciente" para los pasos.']});
  T('eyecup', {tr: ['Göz kabı', 'Ortam ışığını keserek ölçümün standart koşulda yapılmasına yardımcı olur.'], en: ['Eyecup', 'Blocks ambient light so the measurement is made under standard conditions.'], es: ['Copa ocular', 'Bloquea la luz ambiental para que la medición se realice en condiciones estándar.']});
  const nameplate = (text, w, h, ink = '#1B2328', bg = 'rgba(0,0,0,0)') => decal(w, h, (g, W, Hh) => { g.fillStyle = bg; g.fillRect(0, 0, W, Hh); g.fillStyle = ink; g.font = `700 ${Math.round(Hh * .62)}px "Archivo", Arial, sans-serif`; g.textBaseline = 'middle'; g.fillText(text, 6, Hh / 2); });
  /* Ortak: dikey montaj direği ve kelepçe */
  function pole(group, x, z, height, parts, at) {
    const p = cyl(.012, .012, height, M.metal()); put(group, p, x, height / 2, z);
    const base = new THREE.Group();
    for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2, leg = box(.26, .02, .03, M.matte(0x3A4148)); leg.position.set(Math.cos(a) * .13, .05, Math.sin(a) * .13); leg.rotation.y = -a; base.add(leg); const wh = cyl(.022, .022, .018, M.rubber(), 16); wh.rotation.x = Math.PI / 2; wh.position.set(Math.cos(a) * .25, .022, Math.sin(a) * .25); base.add(wh); }
    base.position.set(x, 0, z); group.add(base);
    if (parts) parts.push({key: 'mount', at: at || V3(x, height * .45, z)});
  }

  /* ---------- Monitör ----------
     cfg: {w,h,d, body, bezel, screen:spec, screenMargin:[sol, üst, sağ, alt] (m), keys:n, keysAt:'bottom'|'right', knob:bool,
           handle:'top'|'none', ports:[{side:'right'|'left'|'front', n, colors:[]}], mount:'feet'|'stand'|'pole'|'cart'|'dock',
           elev: masa yüksekliği (m), label, led:bool, stripe:hex} */
  DEV3D.register('monitor', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const w = cfg.w || .3, h = cfg.h || .22, d = cfg.d || .12, elev = cfg.mount === 'cart' ? (cfg.elev || 1.0) : cfg.mount === 'pole' ? (cfg.elev || .9) : (cfg.mount === 'stand' ? .06 : .02);
    const body = new THREE.Group(); body.position.y = elev + h / 2; g.add(body);
    const shell = rbox(w, h, d, Math.min(.02, d * .2), M.plastic(cfg.body || 0xE9EEF1)); body.add(shell);
    const [ml, mt, mr, mb] = cfg.screenMargin || [w * .06, h * .08, cfg.keysAt === 'right' ? w * .2 : w * .06, cfg.keys ? h * .2 : h * .08];
    const sw = w - ml - mr, sh = h - mt - mb;
    const bezel = rbox(sw + .012, sh + .012, .006, .004, M.matte(cfg.bezel || 0x1B2126)); put(body, bezel, (ml - mr) / 2, (mb - mt) / 2, d / 2);
    const scr = makeScreen(sw, sh, cfg.screen || {title: cfg.label || ''});
    put(body, scr.mesh, (ml - mr) / 2, (mb - mt) / 2, d / 2 + .0035); screens.push(scr);
    parts.push({key: 'screen', at: V3((ml - mr) / 2, elev + h / 2 + (mb - mt) / 2, d / 2 + .01)});
    if (cfg.stripe) put(body, box(w * .9, .006, .002, M.color(cfg.stripe)), 0, h / 2 - mt * .45, d / 2 + .001);
    if (cfg.label) { const lp = nameplate(cfg.label, Math.min(w * .45, .14), Math.min(mt * .55, .016), cfg.labelInk || '#2B3238'); put(body, lp, -w / 2 + ml + Math.min(w * .45, .14) / 2, h / 2 - mt / 2, d / 2 + .0012); }
    /* Tuşlar ve döner düğme */
    if (cfg.keys) {
      const n = cfg.keys, right = cfg.keysAt === 'right';
      for (let k = 0; k < n; k++) {
        const kb = rbox(right ? mr * .5 : Math.min(.03, sw / (n + 1) * .7), .014, .006, .003, M.matte(k === 0 ? 0x2E9E58 : 0x5B6670));
        if (right) put(body, kb, w / 2 - mr / 2, h / 2 - mt - (k + .5) * (sh / n), d / 2 + .002);
        else put(body, kb, -w / 2 + ml + (k + .7) * (sw / (n + .4)), -h / 2 + mb / 2, d / 2 + .002);
      }
      parts.push({key: 'keypad', at: right ? V3(w / 2 - mr / 2, elev + h / 2, d / 2 + .01) : V3(0, elev + mb / 2, d / 2 + .01)});
    }
    if (cfg.knob) { const kn = cyl(.016, .016, .012, M.matte(0x2B3238)); kn.rotation.x = Math.PI / 2; put(body, kn, w / 2 - (cfg.keysAt === 'right' ? mr / 2 : mr + .03), -h / 2 + Math.max(mb, .04) / 2, d / 2 + .006); parts.push({key: 'knob', at: V3(w / 2 - mr / 2, elev + Math.max(mb, .04) / 2, d / 2 + .02)}); }
    /* Alarm LED çubuğu */
    if (cfg.led !== false) { const led = box(Math.min(w * .3, .08), .006, .004, M.led(0x4FD1BE)); put(body, led, w * .25, h / 2 - .002, d * .1); parts.push({key: 'alarm', at: V3(w * .25, elev + h + .004, d * .1)}); }
    /* Portlar */
    (cfg.ports || []).forEach(pt => {
      const side = pt.side || 'right', n = pt.n || 2, cols = pt.colors || [];
      for (let k = 0; k < n; k++) {
        const c = cols[k % (cols.length || 1)] || 0x2F7DD1, pr = cyl(.008, .008, .008, M.color(c, .4), 20);
        const yy = -h * .25 + k * (h * .5 / Math.max(1, n - 1 || 1));
        if (side === 'front') { pr.rotation.x = Math.PI / 2; put(body, pr, -w / 2 + ml + .02 + k * .028, -h / 2 + mb * .5, d / 2 + .003); }
        else { pr.rotation.z = Math.PI / 2; put(body, pr, (side === 'right' ? 1 : -1) * (w / 2 + .003), yy, d * .1); }
      }
      parts.push({key: 'port', at: side === 'front' ? V3(-w / 2 + ml + .03, elev + mb * .5, d / 2 + .01) : V3((side === 'right' ? 1 : -1) * (w / 2 + .01), elev + h / 2, d * .1)});
    });
    /* Tutamak */
    if (cfg.handle === 'top') { const hd = tube([[-w * .3, h / 2 - .005, -d * .2], [-w * .3, h / 2 + .035, -d * .2], [w * .3, h / 2 + .035, -d * .2], [w * .3, h / 2 - .005, -d * .2]], .007, M.matte(0x3A4148)); body.add(hd); parts.push({key: 'handle', at: V3(0, elev + h + .035, -d * .2)}); }
    /* Montaj */
    if (cfg.mount === 'pedestal') {
      /* Yuvarlak kaide ve silindir ayak (masaüstü) */
      const base = cyl(w * .42, w * .46, .02, M.plastic(cfg.baseColor || 0xEEF2F4), 48); base.scale.z = .7; put(g, base, 0, .01, -d * .1);
      put(g, cyl(.022, .022, elev - .01, M.metal()), 0, .01 + (elev - .01) / 2, -d * .25);
      parts.push({key: 'mount', at: V3(w * .3, .03, -d * .1)});
    } else     if (cfg.mount === 'stand') { put(g, box(w * .5, .04, d * .9, M.matte(0x3A4148)), 0, .02, 0); parts.push({key: 'mount', at: V3(0, .03, d * .45)}); }
    else if (cfg.mount === 'feet') { [-1, 1].forEach(s => put(g, box(.03, .02, d * .8, M.rubber()), s * w * .38, .01, 0)); }
    else if (cfg.mount === 'pole' || cfg.mount === 'cart') {
      pole(g, 0, -d / 2 - .03, elev + h * .8, parts);
      put(g, box(.05, .05, .05, M.matte(0x3A4148)), 0, elev + h * .3, -d / 2 - .015);
    }
    if (cfg.extra) cfg.extra(g, {body, w, h, d, elev, parts, screens, H: DEV3D.H});
    return {group: g, parts, screens};
  });

  /* ---------- Modül ----------
     Ana monitöre ya da modül rafına takılan dar modül; ön panelde konektör(ler), etiket ve kablo.
     cfg: {w,h,d, body, label, ports:n, portColors, slots: raf yuva sayısı, sensor:'eeg'|'finger'|'pad'|'cuff'|'none'} */
  DEV3D.register('module', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const w = cfg.w || .045, h = cfg.h || .13, d = cfg.d || .16, slots = cfg.slots || 3, frameW = w * slots + .02, y0 = .02;
    const frame = rbox(frameW, h + .02, d + .01, .006, M.matte(0x3A4148)); put(g, frame, 0, y0 + (h + .02) / 2, -.006);
    for (let k = 0; k < slots; k++) {
      const isMain = k === (cfg.index ?? 1), col = isMain ? (cfg.body || 0xE9EEF1) : 0xC9D0D5;
      const mod = rbox(w - .003, h, d, .004, M.plastic(col)); put(g, mod, -frameW / 2 + .01 + w * (k + .5), y0 + .01 + h / 2, .002);
      if (isMain) {
        const cx = -frameW / 2 + .01 + w * (k + .5);
        const n = cfg.ports || 1;
        for (let p = 0; p < n; p++) { const pr = cyl(.009, .009, .01, M.color((cfg.portColors || [0x2F7DD1])[p % (cfg.portColors || [0x2F7DD1]).length], .4), 20); pr.rotation.x = Math.PI / 2; put(g, pr, cx, y0 + .01 + h * (.38 - p * .2), d / 2 + .006); }
        const led = box(.01, .004, .002, M.led(0x2E9E58)); put(g, led, cx, y0 + .01 + h * .85, d / 2 + .003);
        const lab = nameplate(cfg.label || '', w * .9, .012); lab.rotation.z = Math.PI / 2; put(g, lab, cx, y0 + .01 + h * .62, d / 2 + .003);
        const latch = box(w * .6, .006, .006, M.matte(0x5B6670)); put(g, latch, cx, y0 + .015, d / 2 + .003);
        parts.push({key: 'module', at: V3(cx, y0 + h * .7, d / 2 + .01)}, {key: 'port', at: V3(cx, y0 + .01 + h * .38, d / 2 + .02)}, {key: 'led', at: V3(cx, y0 + .01 + h * .85, d / 2 + .01)}, {key: 'latch', at: V3(cx, y0 + .015, d / 2 + .01)});
        /* Kablo ve sensör ucu */
        const start = V3(cx, y0 + .01 + h * .38, d / 2 + .012);
        const end = V3(cx + .18, .02, d / 2 + .16);
        put(g, tube([start, start.clone().add(V3(0, 0, .05)), V3(cx + .08, .06, d / 2 + .12), end], .0035, M.matte(cfg.cable || 0x2E363C)), 0, 0, 0);
        const sens = sensorTip(cfg.sensor || 'none'); if (sens) { sens.position.copy(end); g.add(sens); parts.push({key: 'sensor', at: end.clone().add(V3(0, .02, 0))}); }
      }
    }
    parts.push({key: 'mount', at: V3(-frameW / 2, y0 + h / 2, 0)});
    return {group: g, parts, screens};
  });

  /* Kablo ucundaki sensörün sade gösterimi */
  function sensorTip(kind) {
    const s = new THREE.Group();
    if (kind === 'eeg') { const strip = box(.12, .002, .022, M.plastic(0xF2F5F7)); s.add(strip); [-.05, -.015, .02, .05].forEach(x => { const e = cyl(.009, .009, .003, M.plastic(0xF7F8F9)); e.position.set(x, .002, 0); s.add(e); }); }
    else if (kind === 'finger') { const b = sphere(.018, M.matte(0x3A4652)); b.scale.set(1, .7, 1.4); s.add(b); }
    else if (kind === 'pad') { const b = box(.045, .003, .024, M.plastic(0xF4F6F7)); s.add(b); }
    else if (kind === 'cuff') { const b = cyl(.04, .04, .1, M.color(0x2F5E86, .8), 32, true); b.rotation.z = Math.PI / 2; s.add(b); }
    else if (kind === 'electrodes') { [-.03, 0, .03].forEach(x => { const e = cyl(.012, .012, .002, M.plastic(0xF4F6F7)); e.position.set(x, 0, 0); s.add(e); }); }
    else if (kind === 'transducer') { const b = box(.03, .02, .06, M.plastic(0xF4F6F7)); s.add(b); const st = cyl(.006, .006, .016, M.color(0x2F7DD1)); st.position.set(0, .016, -.018); s.add(st); }
    else return null;
    s.traverse(o => { o.castShadow = true; });
    return s;
  }
  DEV3D.H.sensorTip = sensorTip;
  DEV3D.H.nameplate = nameplate;
  DEV3D.H.pole = pole;

  /* ---------- El cihazı ----------
     cfg: {w,h,d, body, screen:spec, screenFrac (ekranın yüksekliğe oranı), keys:n, accessory:'finger'|'thumb'|'electrodes'|'eyecup'|'probe'|'none',
           stand:bool, label, orientation:'portrait'|'landscape'} */
  DEV3D.register('handheld', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const land = cfg.orientation === 'landscape';
    const w = cfg.w || (land ? .16 : .08), h = cfg.h || (land ? .1 : .15), d = cfg.d || .03;
    const body = new THREE.Group();
    /* Cihaz hafif eğik bir altlıkta durur */
    body.position.set(0, h / 2 * Math.cos(.35) + .015, 0); body.rotation.x = -.35; g.add(body);
    body.add(rbox(w, h, d, Math.min(.012, d * .4), M.plastic(cfg.body || 0xE9EEF1)));
    const sf = cfg.screenFrac || (land ? .7 : .55), sw = w * (land ? .62 : .82), sh = h * sf * (land ? 1 : .9);
    const sx = land ? -w * .14 : 0, sy = land ? 0 : h / 2 - h * .06 - sh / 2;
    put(body, rbox(sw + .008, sh + .008, .004, .003, M.matte(0x1B2126)), sx, sy, d / 2);
    const scr = makeScreen(sw, sh, cfg.screen || {title: cfg.label || ''}, 768); put(body, scr.mesh, sx, sy, d / 2 + .0025); screens.push(scr);
    const toW = (x, y, z) => body.localToWorld(V3(x, y, z));
    body.updateMatrixWorld(true);
    parts.push({key: 'screen', at: toW(sx, sy, d / 2 + .01)});
    const n = cfg.keys ?? 3;
    for (let k = 0; k < n; k++) {
      const kb = rbox(.016, .01, .005, .003, M.matte(k === 0 ? 0x2E9E58 : 0x5B6670));
      if (land) put(body, kb, w / 2 - w * .12, h * .3 - k * h * .25, d / 2 + .002);
      else put(body, kb, -w * .3 + k * (w * .6 / Math.max(1, n - 1)), -h / 2 + h * .14, d / 2 + .002);
    }
    if (n) parts.push({key: 'keypad', at: land ? toW(w / 2 - w * .12, 0, d / 2 + .01) : toW(0, -h / 2 + h * .14, d / 2 + .01)});
    if (cfg.label) { const lp = nameplate(cfg.label, w * .6, .011); put(body, lp, land ? -w * .14 : 0, land ? -h / 2 + .01 : -h / 2 + h * .05, d / 2 + .0012); }
    /* Port ve aksesuar */
    const portW = toW(0, h / 2, 0); parts.push({key: 'port', at: portW.clone().add(V3(0, .01, 0))});
    const acc = cfg.accessory || 'none';
    if (acc !== 'none') {
      const end = V3(w * .9 + .06, .02, .08);
      g.add(tube([portW, portW.clone().add(V3(0, .05, -.02)), V3(w * .6, .1, .02), end], .003, M.matte(0x2E363C)));
      let a;
      if (acc === 'thumb') { a = new THREE.Group(); a.add(box(.022, .014, .03, M.color(0x2F5E73, .4))); }
      else if (acc === 'eyecup') { a = cyl(.018, .015, .025, M.rubber(0x23292E), 24, true); }
      else if (acc === 'probe') { a = cyl(.01, .008, .07, M.plastic(0xE9EEF1)); a.rotation.z = Math.PI / 2; }
      else a = sensorTip(acc === 'electrodes' ? 'electrodes' : acc === 'finger' ? 'finger' : 'pad');
      if (a) { a.position.copy(end); a.traverse(o => { o.castShadow = true; }); g.add(a); parts.push({key: acc === 'eyecup' ? 'eyecup' : 'sensor', at: end.clone().add(V3(0, .025, 0))}); }
    }
    /* Altlık */
    put(g, box(w * .9, .012, d * 3, M.matte(0x3A4148)), 0, .006, -d * .6);
    if (cfg.extra) cfg.extra(g, {body, w, h, d, parts, screens, H: DEV3D.H, toW});
    return {group: g, parts, screens};
  });
})();
