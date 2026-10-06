/* Kaynak: İleri Monitörizasyon Atlası 3B cihaz sistemi; atlas core.js ile çakışmaması için K3 → WK3 olarak yeniden adlandırıldı. */
'use strict';
/* Cihaz yapılandırmaları J: Mindray A5 (global sürüm; A5 Advantage ayrı kayıttır) ve Löwenstein Medical Leon plus anestezi iş istasyonları.
   Her ikisi de 'd-workstation' kurucusunu cfg.sections ile kullanır; bölüm çizimleri bu dosyadadır (önek j-).
   Geometri bağımsız oluşturulmuştur; ölçü ve yerleşim kaynakları content-src/workstations/measure/<kimlik>.json içindedir.
   Kaynakla doğrulanamayan ayrıntılar temsilidir. Ekran değerleri örnektir. */
(() => {
  if (!DEV3D) return;
  const {V3, M, rbox, box, cyl, sphere, torus, lathe, tube, corrugated, put, decal, makeScreen} = DEV3D.H;
  const T = DEV3D.partText;

  /* ---------- Parça metinleri (yalnız işlev; tedavi/ayar önerisi yok) ---------- */
  T('j-a5-gas', {tr: ['Taze gaz kontrolü', 'O₂, N₂O ve hava akımları mekanik iğne valf düğmeleriyle ayarlanır; cam akım tüpü ve küçük ekran akımı gösterir. Yardımcı O₂ akım ölçeri ayrı bir çıkışı besler.'], en: ['Fresh gas control', 'O₂, N₂O and air flows are set with mechanical needle-valve knobs; a glass flow tube and a small display show the flow. The auxiliary O₂ flowmeter feeds a separate outlet.'], es: ['Control de gas fresco', 'Los flujos de O₂, N₂O y aire se ajustan con mandos de válvula de aguja mecánicos; un tubo de flujo de vidrio y una pequeña pantalla muestran el flujo. El caudalímetro auxiliar de O₂ alimenta una salida independiente.']});
  T('j-a5-mod', {tr: ['Takılabilir ölçüm modülleri', 'Anestezik gaz (AG) gibi ölçüm modülleri gövdedeki yuvalara takılır; su tutucu, gaz örnekleme hattındaki nemi toplar.'], en: ['Plug-in monitoring modules', 'Monitoring modules, such as an anaesthetic gas (AG) module, plug into slots on the housing; the water trap collects moisture from the gas sampling line.'], es: ['Módulos de medición enchufables', 'Los módulos de medición, como el de gas anestésico (AG), se insertan en las ranuras de la carcasa; la trampa de agua recoge la humedad de la línea de muestreo.']});
  T('j-power', {tr: ['Güç bağlantısı ve yardımcı prizler', 'Şebeke kablosu buraya bağlanır; yardımcı prizler ek cihazları besler. Şebeke kesildiğinde dahili batarya devreye girer.'], en: ['Power connection and auxiliary outlets', 'The mains cable connects here; auxiliary outlets supply additional devices. The internal battery takes over if mains power fails.'], es: ['Conexión eléctrica y tomas auxiliares', 'Aquí se conecta el cable de red; las tomas auxiliares alimentan otros equipos. La batería interna toma el relevo si falla la red.']});
  T('j-leon-keys', {tr: ['Tuş takımı ve döner düğme', 'Ekranın altındaki tuşlar ve bas-çevir düğme menü seçimi ve değer onayı içindir; ayarlar dokunmatik ekrandan da yapılabilir.'], en: ['Keypad and encoder', 'The keys below the screen and the push-and-turn encoder are used to select menus and confirm values; settings can also be made on the touchscreen.'], es: ['Teclado y mando giratorio', 'Las teclas bajo la pantalla y el mando de girar y pulsar sirven para elegir menús y confirmar valores; los ajustes también se pueden hacer en la pantalla táctil.']});
  T('j-leon-ctl', {tr: ['Gösterge ve kontrol paneli', 'O₂ flush düğmesi, bronş aspirasyonu anahtarı ve vakum ayarı ile vakum manometresi ve O₂ ile N₂O yedek tüplerinin basınç manometreleri bu paneldedir.'], en: ['Display and control panel', 'Holds the O₂ flush button, the bronchial suction switch and vacuum control, and the vacuum gauge and the pressure gauges for the reserve O₂ and N₂O cylinders.'], es: ['Panel de indicadores y control', 'Contiene el botón de flush de O₂, el interruptor de aspiración bronquial y el control de vacío, y los manómetros de vacío y de las botellas de reserva de O₂ y N₂O.']});
  T('j-leon-opt', {tr: ['Opsiyon paneli', 'Sol yan duvarın üstündeki panelde, donanıma göre, O₂ acil dozaj düğmesi (kırmızı halka), gaz ölçümü su tutucusu, harici O₂ akım ölçeri ve çıkışı bulunur.'], en: ['Option panel', 'Depending on configuration, the panel at the top of the left side wall holds the O₂ emergency dosing knob (red ring), the gas measurement water trap and the external O₂ flowmeter and outlet.'], es: ['Panel de opciones', 'Según la configuración, el panel en la parte superior de la pared izquierda incluye el mando de dosificación de emergencia de O₂ (anillo rojo), la trampa de agua de la medición de gases y el caudalímetro y la salida externa de O₂.']});
  T('j-leon-pm', {tr: ['LM Patientmodul (solunum sistemi)', 'Isıtmalı, taze gazdan ayrıştırılmış kompakt solunum sistemidir; inspiratuvar ve ekspiratuvar akım sensörleri içerir. Absorban ve körük kubbesi bu modülün altına takılır. Modül temizlik için çıkarılabilir.'], en: ['LM Patientmodul (breathing system)', 'Heated, fresh-gas-decoupled compact breathing system with inspiratory and expiratory flow sensors. The absorber and bellows dome attach underneath the module. The module can be removed for reprocessing.'], es: ['LM Patientmodul (sistema respiratorio)', 'Sistema respiratorio compacto, calefactado y desacoplado del gas fresco, con sensores de flujo inspiratorio y espiratorio. El absorbedor y la cúpula del fuelle se fijan debajo del módulo. El módulo puede retirarse para su reprocesamiento.']});
  T('j-leon-bel', {tr: ['Asılı körük ve kubbe', 'Pnömatik tahrikli (O₂ ya da hava) ventilatörün körüğü, hasta modülünün altında şeffaf kubbe içinde asılıdır; tahrik gazı kubbeye girerek körüğü sıkıştırır. Körüğün hareketi görülebilir.'], en: ['Hanging bellows and dome', 'The bellows of the pneumatically driven (O₂ or air) ventilator hangs in a clear dome below the patient module; drive gas entering the dome compresses the bellows. Its movement can be watched.'], es: ['Fuelle colgante y cúpula', 'El fuelle del ventilador de accionamiento neumático (O₂ o aire) cuelga dentro de una cúpula transparente bajo el módulo de paciente; el gas motor que entra en la cúpula comprime el fuelle. Su movimiento puede observarse.']});
  T('j-leon-bag', {tr: ['Rezervuar balon', 'Manuel ventilasyon ve spontan solunumun gözlenmesi için kullanılır; hasta modülünün altındaki 22 mm konnektöre hortumla bağlanır ve askı braketine asılır.'], en: ['Reservoir bag', 'Used for manual ventilation and to observe spontaneous breathing; it connects by a tube to the 22 mm cone under the patient module and hangs on the suspension bracket.'], es: ['Bolsa reservorio', 'Se usa para la ventilación manual y para observar la respiración espontánea; se conecta con un tubo al cono de 22 mm bajo el módulo de paciente y cuelga del soporte.']});

  /* ---------- Ortak yardımcılar ---------- */
  const AG = {sevo: 0xF2C531, des: 0x2F7DD1, iso: 0x9B4AA8};
  const hex = c => '#' + c.toString(16).padStart(6, '0');
  const txtD = (text, w, h, o = {}) => decal(w, h, (c, Wd, Hh) => {
    if (o.bg) { c.fillStyle = o.bg; c.fillRect(0, 0, Wd, Hh); }
    c.fillStyle = o.c || '#5B656C'; c.font = `${o.it ? 'italic ' : ''}${o.wt || 700} ${Math.round(Hh * (o.s || .72))}px "Archivo", Arial, sans-serif`;
    c.textBaseline = 'middle'; c.textAlign = o.al === 'l' ? 'left' : o.al === 'r' ? 'right' : 'center';
    c.fillText(text, o.al === 'l' ? 3 : o.al === 'r' ? Wd - 3 : Wd / 2, Hh / 2);
  }, o.px || 512);
  const dirQ = (obj, d) => { obj.quaternion.setFromUnitVectors(V3(0, 1, 0), V3(...d).normalize()); return obj; };
  /* Döner tekerlek: lastik, göbek, çatal, dikey mil (mil üst ucu yTop) */
  function caster(g, x, z, r, yTop, m) {
    const c = new THREE.Group(); c.position.set(x, 0, z); g.add(c);
    put(c, cyl(r, r, .03, m.tire, 28), 0, r, 0, 0, 0, Math.PI / 2);
    [-1, 1].forEach(s => put(c, torus(r * .9, r * .1, m.tire, 28), s * .014, r, 0, 0, Math.PI / 2, 0));
    put(c, cyl(r * .66, r * .66, .034, m.hub, 24), 0, r, 0, 0, 0, Math.PI / 2);
    put(c, cyl(r * .2, r * .2, .042, m.metal, 12), 0, r, 0, 0, 0, Math.PI / 2);
    [-1, 1].forEach(s => put(c, rbox(.006, r * 1.3, r * 1.2, .002, m.fork), s * .023, r * 1.25, -r * .15));
    const ft = 2 * r + .012;
    put(c, rbox(.054, .012, r * 1.25, .004, m.fork), 0, ft, -r * .15);
    if (yTop - ft > .01) put(c, cyl(.012, .012, yTop - ft, m.metal, 12), 0, (yTop + ft) / 2, 0);
  }
  /* Öne bakan döner düğme (tırtıllı halka ve renkli kapak) */
  function knobF(g, x, y, z, r, cap, m, ring) {
    put(g, cyl(r * 1.15, r * 1.15, .004, m.mid, 24), x, y, z + .002, Math.PI / 2);
    put(g, cyl(r, r * .96, .02, m.knob, 28), x, y, z + .012, Math.PI / 2);
    for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; put(g, box(.0025, .0025, .018, m.grip), x + Math.cos(a) * r, y + Math.sin(a) * r, z + .012); }
    put(g, cyl(r * .62, r * .62, .004, M.plastic(cap, .4), 20), x, y, z + .0235, Math.PI / 2);
    if (ring) put(g, torus(r * 1.02, .0018, M.plastic(ring, .4), 24), x, y, z + .022);
  }
  /* Cam akış tüpü: çerçeve, cam, şamandıra, ölçek çizgileri */
  function flowTube(g, x, y, z, h, ball, frac, m) {
    put(g, rbox(.022, h + .02, .006, .003, m.mid), x, y, z + .003);
    put(g, cyl(.0065, .0065, h, M.glass(0xEAF5FA, .5), 16), x, y, z + .01);
    put(g, sphere(.0048, M.color(ball, .3), 12), x, y - h / 2 + h * frac, z + .01);
    put(g, decal(.006, h, (c, Wd, Hh) => { c.fillStyle = '#C9D0D5'; for (let k = 0; k <= 10; k++) c.fillRect(0, 4 + k * (Hh - 8) / 10, k % 5 ? Wd * .5 : Wd, 3); }, 32), x + .0095, y, z + .0065);
  }
  /* Manometre yüzü (öne bakar) */
  function gauge(g, x, y, z, r, label, needle, m) {
    put(g, cyl(r + .004, r + .004, .012, m.mid, 32), x, y, z + .006, Math.PI / 2);
    put(g, decal(r * 2, r * 2, (c, Wd, Hh) => {
      c.fillStyle = '#FBFBFA'; c.beginPath(); c.arc(Wd / 2, Hh / 2, Wd / 2, 0, 7); c.fill();
      c.strokeStyle = '#2B3238'; c.lineWidth = 4;
      for (let k = 0; k <= 10; k++) { const a = Math.PI * (.75 + k * .15); c.beginPath(); c.moveTo(Wd / 2 + Math.cos(a) * Wd * .36, Hh / 2 + Math.sin(a) * Hh * .36); c.lineTo(Wd / 2 + Math.cos(a) * Wd * .45, Hh / 2 + Math.sin(a) * Hh * .45); c.stroke(); }
      c.fillStyle = '#2B3238'; c.font = `700 ${Math.round(Hh * .14)}px Arial`; c.textAlign = 'center'; c.fillText(label, Wd / 2, Hh * .72);
      const a = Math.PI * (.75 + needle * 1.5); c.strokeStyle = '#C0392B'; c.lineWidth = 5; c.beginPath(); c.moveTo(Wd / 2, Hh / 2); c.lineTo(Wd / 2 + Math.cos(a) * Wd * .38, Hh / 2 + Math.sin(a) * Hh * .38); c.stroke();
      c.fillStyle = '#2B3238'; c.beginPath(); c.arc(Wd / 2, Hh / 2, Wd * .05, 0, 7); c.fill();
    }, 128), x, y, z + .0125);
    put(g, cyl(r + .002, r + .002, .003, M.glass(0xF2F8FA, .25), 32), x, y, z + .0145, Math.PI / 2);
  }
  /* Körük (lathe): taban y = 0'dan yukarı; scale.y ile solunum hareketi */
  function bellowsMesh(r0, r1, h, col, n = 14) {
    const pts = [[0, 0]]; for (let k = 0; k <= n; k++) pts.push([k % 2 ? r0 : r1, k / n * h]); pts.push([0, h]);
    return lathe(pts, M.color(col, .5), 32);
  }
  const breathe = grp => ({update(t) { const p = (t * .25) % 1; grp.scale.y = p < .35 ? 1 - .42 * p / .35 : .58 + .42 * Math.min(1, (p - .35) / .45); }});
  /* Y parça + filtre; uçları döndürür */
  function ypiece(g, at, up, m) {
    const yg = new THREE.Group(); yg.position.set(...at); dirQ(yg, up); g.add(yg);
    [-1, 1].forEach(s => put(yg, cyl(.011, .011, .045, m.white, 16), s * .012, .028, 0, 0, 0, -s * .45));
    put(yg, cyl(.013, .013, .025, m.white, 16), 0, 0, 0);
    put(yg, cyl(.03, .03, .03, M.clear(0xEEF4F7, .55), 28), 0, -.03, 0);
    put(yg, cyl(.031, .031, .006, M.plastic(0x3C7FC8, .4), 28), 0, -.03, 0);
    put(yg, cyl(.01, .01, .02, m.white, 16), 0, -.055, 0);
    yg.updateMatrixWorld(true);
    return [-1, 1].map(s => [yg.localToWorld(V3(s * .03, .085, 0)), yg.localToWorld(V3(s * .022, .05, 0))]);
  }
  /* Rezervuar balon (lathe), boyun üstte */
  function bag(g, x, y, z, len, col, rs = 1) {
    put(g, cyl(.012, .012, .03, M.plastic(0xE9EEF1, .4), 16), x, y + .015, z);
    const bp = [[0, 0], [.012, 0], [.012, -.022]];
    for (let k = 1; k <= 20; k++) { const u = k / 20, r = .012 + (.066 * rs - .012) * Math.pow(Math.sin(Math.min(1, u * 1.08) * Math.PI * .5), 1.4) * (u > .72 ? Math.sqrt(Math.max(0, 1 - Math.pow((u - .72) / .28, 2))) : 1); bp.push([Math.max(.0005, r), -.022 - u * (len - .022)]); }
    put(g, lathe(bp, M.rubber(col), 36), x, y, z);
  }
  /* Ekran gövdesi: öne bakan çerçeve (ön yüz yerel z = 0), siyah cam, canlı ekran */
  function screenHousing(g, o, screens, m) {
    const sg = new THREE.Group(); sg.position.set(o.x, o.y, o.z); sg.rotation.set(o.tilt || 0, o.yaw || 0, 0); g.add(sg);
    const [bl, bt, br, bb] = o.bez, HW = o.w + bl + br, HH = o.h + bt + bb, ox = (bl - br) / 2, oy = (bb - bt) / 2;
    put(sg, rbox(HW, HH, o.d, Math.min(.014, o.d * .4), o.mat || m.white), 0, 0, -o.d / 2);
    put(sg, box(o.w + .008, o.h + .008, .002, m.black), ox, oy, .001);
    const s = makeScreen(o.w, o.h, o.spec, o.px || 1280); put(sg, s.mesh, ox, oy, .0028); screens.push(s);
    return {sg, HW, HH, ox, oy};
  }
  function baseMats(ctx, c) {
    if (ctx.jm) return ctx.jm;
    return (ctx.jm = Object.assign({
      seam: M.matte(0x6E777E, .7), black: M.plastic(0x0E1215, .25), dark: M.plastic(0x2E3439, .45), grip: M.matte(0x5B6670, .6),
      chrome: M.chrome(), metal: M.metal(0xBFC6CB, .32), tire: M.rubber(0x2B3036), knob: M.plastic(0xE9ECEE, .35),
      clear: M.clear(0xE6F1F5, .3), limb: M.plastic(0xA9D3EE, .35)
    }, c));
  }

  /* ---------- Ekran düzenleri (temsili; değerler örnektir) ---------- */
  /* Mindray A5 ventilatör ekranı (16:9): üst durum çubuğu, solda gaz değerleri ve üç sanal akış çubuğu, ortada Paw (beyaz dolgu),
     akım (turuncu), CO₂ (mavi) eğrileri, sağda ölçülen değerler, en sağda yazılım tuşları, altta ayar kutuları */
  function a5Vent() {
    const L = [
      {t: 'box', x: 0, y: 0, w: 1, h: .07, fill: '#11161B'},
      {t: 'text', txt: 'Adult', x: .008, y: 0, w: .07, h: .07, c: '#AEB8BE', s: .03},
      {t: 'box', x: .07, y: .013, w: .07, h: .044, fill: '#2C55A8', r: .012}, {t: 'text', txt: 'VCV', x: .07, y: .013, w: .07, h: .044, c: '#FFFFFF', s: .03, al: 'c'},
      {t: 'text', txt: 'OR 05', x: .38, y: 0, w: .24, h: .07, c: '#AEB8BE', s: .028, al: 'c'},
      {t: 'text', txt: '10:42', x: .78, y: 0, w: .12, h: .07, c: '#E6EEF2', s: .03, al: 'r'},
      {t: 'icon', g: 'battery', x: .915, y: .014, w: .035, h: .042, c: '#3CC24C'}, {t: 'icon', g: 'wifi', x: .955, y: .012, w: .035, h: .045, c: '#AEB8BE'},
      /* sol gaz sütunu */
      {t: 'text', txt: 'Fi', x: .07, y: .085, w: .04, h: .035, c: '#7F8E98', s: .022}, {t: 'text', txt: 'Et', x: .118, y: .085, w: .04, h: .035, c: '#7F8E98', s: .022}
    ];
    [['O₂', '50', '45', '#E6EEF2'], ['Sev', '2.1', '1.9', '#F2C531'], ['N₂O', '0', '0', '#5B9BE8'], ['CO₂', '0', '38', '#4EB8E8']].forEach(([l, a, b, c], k) => {
      const y = .12 + k * .05; L.push({t: 'text', txt: l, x: .006, y, w: .06, h: .045, c, s: .024}, {t: 'text', txt: a, x: .055, y, w: .05, h: .045, c, s: .032, wt: 800, al: 'r'}, {t: 'text', txt: b, x: .105, y, w: .05, h: .045, c, s: .032, wt: 800, al: 'r'});
    });
    L.push({t: 'box', x: .01, y: .33, w: .15, h: .045, fill: '#252C33', r: .01}, {t: 'text', txt: 'MAC 0.9', x: .01, y: .33, w: .15, h: .045, c: '#E6EEF2', s: .024, al: 'c'},
      {t: 'text', txt: 'Flow  L/min', x: .006, y: .39, w: .15, h: .035, c: '#7F8E98', s: .02});
    [['O₂', '#E6EEF2', .5], ['Air', '#E8C23A', .25], ['N₂O', '#5B9BE8', .02]].forEach(([l, c, v], k) => {
      const x = .015 + k * .05, y0 = .43, h = .33;
      L.push({t: 'box', x, y: y0, w: .032, h, stroke: '#4A535A', fill: '#0B0F12', r: .006}, {t: 'box', x: x + .006, y: y0 + h * (1 - Math.max(.03, v)), w: .02, h: h * Math.max(.03, v) - .006, fill: c, r: .004},
        {t: 'text', txt: l, x: x - .008, y: y0 + h + .005, w: .048, h: .035, c, s: .018, al: 'c'});
    });
    /* eğriler */
    L.push({t: 'box', x: .175, y: .08, w: .002, h: .72, fill: '#232A31'},
      {t: 'wave', k: 'paw', x: .185, y: .085, w: .55, h: .22, c: '#F4F6F7', l: 'Paw  cmH₂O', fillUnder: true, fillAlpha: .85, span: 3.4, amp: .46, mid: .62, ls: .026},
      {t: 'wave', k: 'flow', x: .185, y: .33, w: .55, h: .22, c: '#F0A030', l: 'Flow  L/min', fillUnder: true, fillAlpha: .7, span: 3.4, amp: .4, ls: .026},
      {t: 'wave', k: 'capno', x: .185, y: .575, w: .55, h: .2, c: '#4EA8E8', l: 'CO₂  mmHg', span: 3.4, amp: .42, ls: .026, lw: .006});
    /* sağ değerler */
    [['Ppeak', '18', 'cmH₂O', '#F4F6F7', .13, true], ['PEEP', '5', 'cmH₂O', '#F4F6F7', .09], ['MV', '6.0', 'L/min', '#F0A030', .1], ['VTe', '500', 'mL', '#4EA8E8', .13, true], ['RR', '12', 'bpm', '#4EA8E8', .09], ['EtCO₂', '38', 'mmHg', '#4EA8E8', .09]].reduce((y, [l, v, u, c, h, big]) => {
      L.push({t: 'text', txt: l, x: .745, y, w: .08, h: .03, c, s: .02}, {t: 'text', txt: u, x: .8, y, w: .085, h: .03, c: '#7F8E98', s: .016, al: 'r'},
        {t: 'text', txt: v, x: .745, y: y + .022, w: .14, h: h - .025, c, s: big ? .075 : .046, al: 'r', wt: 800});
      return y + h + .008;
    }, .085);
    /* yazılım tuşları */
    ['Alarm', 'Trend', 'Review', 'Low Flow', 'Lung Rec.', 'Setup', 'Standby'].forEach((s, k) => L.push(
      {t: 'box', x: .9, y: .085 + k * .098, w: .094, h: .086, fill: k === 3 ? '#2C55A8' : k === 6 ? '#5A4A2A' : '#2A3036', r: .012},
      {t: 'text', txt: s, x: .9, y: .085 + k * .098, w: .094, h: .086, c: '#E6EEF2', s: .02, al: 'c', wt: 600}));
    /* ayar kutuları */
    L.push({t: 'box', x: .175, y: .81, w: .72, h: .18, fill: '#151A1F', r: .01});
    [['VT', '500', 'mL'], ['RR', '12', 'bpm'], ['I:E', '1:2', ''], ['PEEP', '5', 'cmH₂O'], ['Tpause', '10', '%'], ['Plimit', '30', 'cmH₂O']].forEach(([l, v, u], k) => {
      const x = .185 + k * .1;
      L.push({t: 'box', x, y: .825, w: .092, h: .15, fill: '#2B3238', r: .012}, {t: 'text', txt: l, x, y: .83, w: .092, h: .04, c: '#AEB8BE', s: .022, al: 'c'},
        {t: 'text', txt: v, x, y: .87, w: .092, h: .07, c: '#FFFFFF', s: .046, al: 'c', wt: 800}, {t: 'text', txt: u, x, y: .935, w: .092, h: .035, c: '#7F8E98', s: .016, al: 'c'});
    });
    L.push({t: 'box', x: .79, y: .825, w: .095, h: .15, fill: '#2C55A8', r: .012}, {t: 'text', txt: 'More', x: .79, y: .825, w: .095, h: .15, c: '#FFFFFF', s: .028, al: 'c'});
    return {bg: '#000000', layout: L};
  }
  /* Gaz panelindeki küçük akış göstergesi */
  function a5LCD() {
    return {bg: '#0A121A', layout: [
      {t: 'box', x: 0, y: 0, w: 1, h: .2, fill: '#1F5FAF'}, {t: 'text', txt: 'Flow  L/min', x: .04, y: 0, w: .9, h: .2, c: '#FFFFFF', s: .13},
      {t: 'text', txt: 'O₂', x: .05, y: .28, w: .4, h: .16, c: '#AEB8BE', s: .13}, {t: 'text', txt: 'Air', x: .55, y: .28, w: .4, h: .16, c: '#AEB8BE', s: .13},
      {t: 'text', txt: '0.75', x: .02, y: .48, w: .46, h: .4, c: '#FFFFFF', s: .25, wt: 800, al: 'c'}, {t: 'text', txt: '0.25', x: .52, y: .48, w: .46, h: .4, c: '#FFFFFF', s: .25, wt: 800, al: 'c'}
    ]};
  }
  /* Leon plus ventilatör ekranı (4:3): lacivert zemin, üstte sekmeler (Curves / Trend / Alarm log / Extras), solda dört gerçek
     zamanlı eğri (Paw kırmızı, akım beyaz, hacim sarı, CO₂ yeşil), sağda ölçülen değerler, altta mod, ventilasyon ve taze gaz ayarları */
  function leonVent() {
    const L = [{t: 'box', x: 0, y: 0, w: 1, h: .065, fill: '#171A3A'}];
    ['Curves', 'Trend curves', 'Trend tab', 'Alarm log', 'Extras'].forEach((s, k) => L.push(
      {t: 'box', x: .005 + k * .118, y: .008, w: .113, h: .057, fill: k ? '#3A3F78' : '#5A60A8', r: .012},
      {t: 'text', txt: s, x: .005 + k * .118, y: .008, w: .113, h: .057, c: '#FFFFFF', s: .024, al: 'c', wt: k ? 600 : 800}));
    L.push({t: 'text', txt: 'Adult  IMV', x: .6, y: 0, w: .22, h: .065, c: '#DDE2FF', s: .026, al: 'c'}, {t: 'text', txt: '10:42', x: .82, y: 0, w: .12, h: .065, c: '#FFFFFF', s: .028, al: 'r'},
      {t: 'icon', g: 'battery', x: .948, y: .012, w: .045, h: .042, c: '#7FD88A'});
    [['paw', '#E9535A', 'Paw  mbar'], ['flow', '#F2F4F8', 'Flow  l/min'], ['resp', '#E8D23F', 'Vol  ml'], ['capno', '#5CCB6E', 'CO₂  mmHg']].forEach(([k, c, l], i) => {
      const y = .075 + i * .165;
      L.push({t: 'box', x: .008, y, w: .672, h: .158, fill: '#252957', stroke: '#3B4080', lw: .003, r: .006},
        {t: 'wave', k, x: .012, y: y + .006, w: .664, h: .148, c, l, grid: 'rgba(170,180,255,.12)', span: 4.2, amp: k === 'capno' ? .44 : .36, ls: .022, lw: .005});
    });
    [['Ppeak', '18', 'mbar', '#E9535A'], ['Pmean', '9', 'mbar', '#E9535A'], ['PEEP', '5', 'mbar', '#E9535A'], ['MV', '5.4', 'l/min', '#F2F4F8'], ['VTe', '450', 'ml', '#E8D23F'], ['f', '12', '1/min', '#F2F4F8'], ['FiO₂', '50', '%', '#8FD3F0'], ['etCO₂', '38', 'mmHg', '#5CCB6E'], ['Sev', '1.9', 'Vol%', '#F2C531']].forEach(([l, v, u, c], k) => {
      const y = .075 + k * .073;
      L.push({t: 'box', x: .69, y, w: .302, h: .067, fill: '#252957', r: .008},
        {t: 'text', txt: l, x: .695, y, w: .1, h: .067, c, s: .024, wt: 600}, {t: 'text', txt: u, x: .79, y, w: .07, h: .067, c: '#8A90C0', s: .018},
        {t: 'text', txt: v, x: .84, y, w: .145, h: .067, c, s: .046, al: 'r', wt: 800});
    });
    L.push({t: 'box', x: 0, y: .745, w: 1, h: .255, fill: '#151833'});
    L.push({t: 'box', x: .008, y: .76, w: .1, h: .1, fill: '#7FA8E8', r: .012}, {t: 'text', txt: 'IMV', x: .008, y: .76, w: .1, h: .1, c: '#0E1438', s: .04, al: 'c', wt: 800});
    [['VTi', '450', 'ml'], ['f', '12', '1/min'], ['I:E', '1:2', ''], ['PEEP', '5', 'mbar'], ['Pmax', '30', 'mbar'], ['Plateau', '10', '%']].forEach(([l, v, u], k) => {
      const x = .118 + k * .097;
      L.push({t: 'box', x, y: .76, w: .09, h: .1, fill: '#C9CDF2', r: .012}, {t: 'text', txt: l, x, y: .762, w: .09, h: .035, c: '#2A2F66', s: .02, al: 'c', wt: 600},
        {t: 'text', txt: v, x, y: .795, w: .09, h: .045, c: '#0E1438', s: .036, al: 'c', wt: 800}, {t: 'text', txt: u, x, y: .838, w: .09, h: .02, c: '#4A5090', s: .014, al: 'c'});
    });
    L.push({t: 'box', x: .71, y: .76, w: .282, h: .1, fill: '#252957', stroke: '#5A60A8', lw: .003, r: .012},
      {t: 'text', txt: 'Fresh gas', x: .715, y: .762, w: .13, h: .03, c: '#AEB4E8', s: .018}, {t: 'text', txt: 'O₂ 50 %  ·  1.0 l/min  ·  AIR', x: .715, y: .8, w: .275, h: .05, c: '#FFFFFF', s: .026, wt: 700});
    [['Start', '#6FCB7E'], ['Standby', '#C9CDF2'], ['MAN/SPONT', '#C9CDF2'], ['Loops', '#3A3F78'], ['Alarm limits', '#3A3F78'], ['Mute', '#E8B23A']].forEach(([s, f], k) => {
      const x = .008 + k * .165, dark = f === '#3A3F78';
      L.push({t: 'box', x, y: .875, w: .155, h: .1, fill: f, r: .012}, {t: 'text', txt: s, x, y: .875, w: .155, h: .1, c: dark ? '#FFFFFF' : '#0E1438', s: .026, al: 'c', wt: 700});
    });
    return {bg: '#1E2146', layout: L};
  }

  /* =====================================================================
     Mindray A5 — ölçüler: A5/A3/A1 Safety and Performance Information (KF-H-046-026046-00, s. 8-3): Y 1445 × G 763 × D 766 mm;
     paslanmaz çalışma tablası 462 × 352 mm, yükseklik 830 mm; yardımcı çalışma yüzeyi 303 × 379 mm; üst raf 478 × 310 mm;
     sabit balon kolu 312 mm, yükseklik 1130 mm; eşit çekmeceler (iç 123 × 275 × 340 mm); 4 tekerlek Ø125 mm, merkezi fren.
     Mekanik iğne valfli akış kontrolü + cam tüp; 2 vaporizatör yeri (Selectatec / Plug-in); körük 1500 mL; 15,6" dokunmatik ekran.
     Parça konumları (gaz paneli, modül yuvası, vaporizatörler, solunum sistemi) üretici ürün görsellerindeki yerleşime göre temsilidir.
     ===================================================================== */
  const a5M = ctx => baseMats(ctx, {
    white: M.plastic(0xF4F5F6, .33), body: M.plastic(0xE8EBED, .38), grey: M.plastic(0xB9C0C6, .42), mid: M.plastic(0x8D959C, .42),
    panel: M.plastic(0x2C3237, .5), steel: M.metal(0xCDD2D6, .26), blue: M.plastic(0x4A8AD4, .38), hub: M.plastic(0xD5DADD, .4), fork: M.plastic(0x9AA2A8, .4),
    bsBody: M.plastic(0xE3E7EA, .38)
  });
  function a5Base(ctx) {
    const {g, P} = ctx, m = a5M(ctx);
    put(g, rbox(.64, .075, .66, .03, m.grey), .04, .125, -.04);
    put(g, rbox(.6, .012, .62, .01, m.mid), .04, .083, -.04);
    put(g, rbox(.62, .028, .03, .012, M.plastic(0x5E666D, .45)), .04, .13, .285);
    put(g, rbox(.13, .022, .05, .008, M.plastic(0x5E666D, .45)), .04, .062, .3);
    put(g, rbox(.03, .009, .003, .003, M.led(0x3CC24C)), .12, .13, .3005);
    [[-.235, -.33], [.315, -.33], [-.235, .25], [.315, .25]].forEach(([x, z]) => caster(g, x, z, .0625, .088, m));
    P('d-base', .315, .1, .3);
  }
  function a5Cabinet(ctx) {
    const {g, P} = ctx, m = a5M(ctx), X = .05, W = .5, Y0 = .165, Y1 = .8, Z = -.07, D = .58, zf = Z + D / 2;
    put(g, rbox(W, Y1 - Y0, D, .02, m.body), X, (Y0 + Y1) / 2, Z);
    /* sol kapak (iç düzen kaynakta yok; temsili) */
    put(g, rbox(.17, .6, .02, .008, m.white), -.108, .482, zf + .006);
    put(g, rbox(.012, .14, .008, .004, m.grey), -.04, .6, zf + .019);
    /* üç çekmece (eşit boy; iç ölçü 123 × 275 × 340 mm) */
    const x0 = -.018, x1 = .295, dh = (.785 - .18) / 3;
    for (let k = 0; k < 3; k++) {
      const y = .18 + dh * (k + .5);
      put(g, rbox(x1 - x0 - .004, dh - .006, .02, .008, m.white), (x0 + x1) / 2, y, zf + .006);
      put(g, box(.2, .012, .006, m.seam), (x0 + x1) / 2, y + dh / 2 - .028, zf + .014);
      put(g, box(.2, .004, .008, m.grey), (x0 + x1) / 2, y + dh / 2 - .021, zf + .016);
    }
    /* yan derzler ve havalandırma yarıkları */
    [-1, 1].forEach(s => { put(g, box(.002, Y1 - Y0 - .04, .004, m.seam), X + s * (W / 2 + .0005), (Y0 + Y1) / 2, zf - .02); });
    for (let k = 0; k < 6; k++) put(g, box(.002, .005, .16, m.seam), X + W / 2 + .0005, .25 + k * .013, Z - .08);
    P('d-drawer', .2, .7, zf + .03);
  }
  function a5Worktop(ctx) {
    const {g, P} = ctx, m = a5M(ctx);
    put(g, rbox(.52, .03, .4, .012, m.white), .05, .805, .085);
    put(g, rbox(.462, .012, .352, .004, m.steel), .05, .824, .106);
    put(g, box(.462, .006, .004, m.steel), .05, .833, .281);
    put(g, rbox(.53, .032, .03, .012, m.white), .05, .805, .29);
    /* yardımcı çalışma yüzeyi (303 × 379 mm), hafif dışarı çekilmiş */
    put(g, rbox(.303, .012, .379, .004, m.white), .135, .782, .125);
    put(g, rbox(.08, .008, .012, .004, m.grey), .135, .782, .318);
    /* sağ yan montaj rayı ve tutamak */
    put(g, box(.01, .026, .36, m.metal), .33, .79, .02);
    [-.13, .17].forEach(z => put(g, box(.03, .016, .02, m.metal), .315, .79, z));
    g.add(tube([[.3, .87, -.13], [.355, .885, -.13], [.362, 1.07, -.15], [.3, 1.09, -.16]], .011, m.grey, 32, 10));
    P('d-worktop', .02, .84, .22); P('d-rail', .335, .79, .16);
  }
  function a5Tower(ctx) {
    const {g, P} = ctx, m = a5M(ctx);
    put(g, rbox(.54, .3, .28, .03, m.white), .03, .98, -.24);
    put(g, rbox(.32, .05, .18, .022, m.white), .03, 1.14, -.26);
    put(g, box(.54, .003, .004, m.seam), .03, .9, -.099);
    [-1, 1].forEach(s => { for (let k = 0; k < 7; k++) put(g, box(.002, .005, .12, m.seam), .03 + s * .2705, .9 + k * .014, -.28); });
    put(g, txtD('mindray', .07, .016, {c: '#7A848B', wt: 600}), .23, 1.105, -.0995);
    /* modül yuvası (2 takılabilir modül; AG modülünde su tutucu) */
    put(g, rbox(.1, .16, .06, .012, m.white), -.185, .975, -.085);
    put(g, box(.092, .148, .004, m.panel), -.185, .975, -.054);
    [-.208, -.162].forEach((x, k) => {
      put(g, rbox(.042, .14, .05, .006, M.plastic(0xF1F3F4, .36)), x, .975, -.072);
      put(g, rbox(.04, .018, .004, .004, M.plastic(0xA9BCC8, .4)), x, 1.035, -.045);
      put(g, cyl(.004, .004, .003, M.led(0x3CC24C), 10), x - .01, 1.035, -.0425, Math.PI / 2);
      if (!k) { put(g, cyl(.014, .012, .04, M.clear(0xEEF4F7, .6), 20), x, .975, -.036, 0); put(g, cyl(.009, .009, .006, M.plastic(0x7A5AA8, .4), 16), x, .93, -.045, Math.PI / 2); }
      else put(g, cyl(.009, .009, .006, M.plastic(0xE8D23F, .4), 16), x, .95, -.045, Math.PI / 2);
    });
    P('module', -.185, 1.0, -.03);
  }
  function a5Gas(ctx) {
    const {g, P, screens} = ctx, m = a5M(ctx), zp = -.047;
    put(g, rbox(.25, .25, .07, .02, m.white), -.005, .985, -.085);
    put(g, rbox(.222, .222, .01, .012, m.panel), -.005, .985, zp - .005);
    /* yardımcı O₂ ve toplam akış cam tüpleri */
    flowTube(g, -.095, 1.0, zp, .11, 0xF4F6F7, .35, m);
    flowTube(g, -.064, 1.0, zp, .11, 0x3CC24C, .22, m);
    put(g, txtD('Aux O₂', .03, .009, {c: '#C9D0D5', wt: 600}), -.095, 1.072, zp + .001);
    put(g, txtD('Total', .028, .009, {c: '#C9D0D5', wt: 600}), -.062, 1.072, zp + .001);
    /* küçük akış ekranı */
    put(g, rbox(.098, .07, .004, .004, m.dark), .025, 1.03, zp + .002);
    const lcd = makeScreen(.088, .06, a5LCD(), 512); put(g, lcd.mesh, .025, 1.03, zp + .0055); screens.push(lcd);
    /* iğne valf düğmeleri: O₂ (beyaz), N₂O (mavi), Air (siyah-beyaz) */
    [[-.085, 0xF4F6F7, 0xFFFFFF, 'O₂'], [-.035, 0x2F7DD1, 0x2F7DD1, 'N₂O'], [.015, 0x1D2125, 0xE6EAED, 'Air']].forEach(([x, cap, ring, l]) => {
      knobF(g, x, .925, zp, .0155, cap, m, ring);
      put(g, txtD(l, .026, .009, {c: '#C9D0D5', wt: 700}), x, .9, zp + .001);
    });
    /* O₂ flush */
    put(g, rbox(.05, .024, .012, .011, M.plastic(0xF4F6F7, .35)), .068, .925, zp + .006);
    put(g, txtD('O₂+', .03, .012, {c: '#1F3F66', wt: 800}), .068, .925, zp + .0125);
    P('j-a5-gas', -.04, .95, zp + .04); P('d-flush', .068, .935, zp + .03);
  }
  /* Mindray V60 / V80 vaporizatör: beyaz gövde, üstte büyük döner kadran, önde ajan renkli etiket, seviye camı, dolum girişi */
  function mrVapor(g, x, y, z, agent, model, m) {
    const col = AG[agent], v = new THREE.Group(); v.position.set(x, y, z); g.add(v);
    const W = .095, H = model === 'V80' ? .175 : .16, D = .13, fz = D / 2;
    put(v, rbox(W, H, D, .014, m.white), 0, H / 2, 0);
    put(v, rbox(W * .82, .05, .03, .008, m.grey), 0, .045, -fz - .012);
    put(v, rbox(W * .66, .042, .004, .006, M.plastic(col, .4)), 0, H * .3, fz + .001);
    put(v, txtD(agent === 'des' ? 'Desflurane' : agent === 'iso' ? 'Isoflurane' : 'Sevoflurane', W * .6, .011, {c: '#1F262B', wt: 700}), 0, H * .3, fz + .0035);
    put(v, txtD('mindray  ' + model, W * .7, .011, {c: '#4A545B', wt: 700}), 0, H * .66, fz + .001);
    put(v, rbox(.012, .05, .005, .004, M.glass(0xD8ECF4, .6)), W * .36, H * .52, fz + .002);
    put(v, cyl(.011, .011, .018, M.plastic(col, .4), 16), -W * .3, H * .1, fz + .008, Math.PI / 2);
    put(v, cyl(.044, .046, .03, M.plastic(0xC9CFD3, .34), 40), 0, H + .015, -.005);
    put(v, torus(.0455, .0028, M.plastic(col, .4), 40), 0, H + .02, -.005, Math.PI / 2);
    put(v, cyl(.039, .041, .014, M.plastic(0xE3E7EA, .3), 40), 0, H + .037, -.005);
    put(v, rbox(.05, .01, .012, .004, m.mid), 0, H + .048, -.005);
    if (agent === 'des') { put(v, rbox(.016, .01, .003, .003, M.led(0x3CC24C)), -W * .3, H * .55, fz + .002); g.add(tube([V3(x + W / 2 - .01, y + .03, z - fz - .005), V3(x + W / 2 + .01, y + .01, z - fz - .03), V3(x + W / 2, y - .03, z - fz - .06)], .004, M.rubber(0x2B3136), 20, 8)); }
  }
  function a5Vapor(ctx) {
    const {g, P} = ctx, m = a5M(ctx);
    put(g, rbox(.25, .036, .05, .008, m.grey), .232, .875, -.1);
    [.175, .29].forEach(x => [-.02, .02].forEach(d => put(g, cyl(.005, .005, .01, m.chrome, 10), x + d, .896, -.1)));
    mrVapor(g, .175, .845, -.03, 'sevo', 'V60', m);
    mrVapor(g, .29, .845, -.03, 'des', 'V80', m);
    P('d-vapor', .232, 1.07, .04);
  }
  function a5BS(ctx) {
    const {g, P, screens} = ctx, m = a5M(ctx), bx = -.33, by = .8, bz = .06;
    put(g, rbox(.09, .05, .12, .01, m.mid), -.215, .79, -.02);
    put(g, rbox(.18, .09, .22, .02, m.bsBody), bx, by, bz);
    put(g, rbox(.172, .012, .212, .006, m.grey), bx, by - .05, bz);
    put(g, box(.18, .003, .002, m.seam), bx, by + .015, bz + .111);
    /* tek yönlü valf kubbeleri (üstte önde) */
    [-.375, -.32].forEach(x => {
      put(g, cyl(.023, .023, .01, m.white, 24), x, by + .05, bz + .07);
      put(g, cyl(.02, .02, .024, M.clear(0xEAF4F8, .45), 24), x, by + .067, bz + .07);
      put(g, cyl(.016, .016, .002, M.color(0x8FA3AE)), x, by + .06, bz + .07);
    });
    /* insp/eksp portları (önde, aşağı-öne bakar) */
    const ends = [];
    [-.375, -.32].forEach((x, i) => {
      const pg = new THREE.Group(); pg.position.set(x, by - .02, bz + .11); dirQ(pg, [0, -.35, 1]); g.add(pg);
      put(pg, cyl(.019, .019, .01, m.white, 24), 0, .005, 0);
      put(pg, cyl(.017, .017, .008, M.plastic(i ? 0xE9EEF1 : 0x3C7FC8, .4), 24), 0, .014, 0);
      put(pg, cyl(.0108, .0118, .03, M.plastic(0xD9DEE1, .35), 20), 0, .032, 0);
      pg.updateMatrixWorld(true); ends.push(pg.localToWorld(V3(0, .046, 0)), pg.localToWorld(V3(0, .1, 0)));
    });
    P('d-valves', -.35, by + .09, bz + .1);
    /* APL valfi (sağ ön köşe) */
    put(g, cyl(.016, .016, .012, m.mid, 20), -.262, by + .051, bz + .085);
    put(g, cyl(.021, .022, .024, m.knob, 28), -.262, by + .069, bz + .085);
    for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; put(g, box(.003, .02, .003, m.grip), -.262 + Math.cos(a) * .0215, by + .069, bz + .085 + Math.sin(a) * .0215, 0, -a, 0); }
    put(g, rbox(.034, .007, .012, .0034, m.mid), -.25, by + .085, bz + .085);
    P('d-apl', -.262, by + .1, bz + .085);
    /* hava yolu basınç göstergesi (sol yan, öne-sola bakar) */
    const gg = new THREE.Group(); gg.position.set(-.425, by + .01, bz + .06); gg.rotation.y = -.9; g.add(gg);
    gauge(gg, 0, 0, 0, .03, 'cmH₂O', .2, m);
    P('d-gauge', -.44, by + .04, bz + .09);
    /* körük haznesi (yükselen körük, 1500 mL) */
    const hx = -.345, hz = -.005, hy = by + .045;
    put(g, cyl(.082, .082, .014, m.bsBody, 32), hx, hy + .007, hz);
    put(g, cyl(.077, .077, .21, M.clear(0xE6F1F5, .28), 40, true), hx, hy + .014 + .105, hz);
    put(g, cyl(.08, .08, .014, m.bsBody, 32), hx, hy + .231, hz);
    put(g, cyl(.03, .03, .01, m.grey, 24), hx, hy + .243, hz);
    const bel = new THREE.Group(); bel.position.set(hx, hy + .014, hz); g.add(bel);
    bel.add(bellowsMesh(.058, .068, .19, 0xD9E3EA));
    screens.push(breathe(bel));
    P('d-bellows', hx, hy + .14, hz + .085);
    /* CO₂ absorbanı (Pre-Pak) */
    put(g, cyl(.072, .072, .016, m.grey, 32), bx, .742, bz + .01);
    put(g, cyl(.066, .066, .19, M.clear(0xF2F6F8, .4), 32), bx, .64, bz + .01);
    put(g, cyl(.06, .06, .175, M.color(0xE9E3F2, .9), 24), bx, .64, bz + .01);
    put(g, cyl(.069, .069, .018, m.mid, 32), bx, .54, bz + .01);
    P('d-absorber', bx, .64, bz + .085);
    /* balon kolu (sabit yükseklik 1130 mm, uzunluk 312 mm), balon portu ve hortumu */
    put(g, rbox(.04, .03, .05, .008, m.mid), -.42, .8, -.065);
    put(g, cyl(.013, .013, .32, m.grey, 16), -.428, .975, -.075);
    g.add(tube([[-.428, 1.13, -.075], [-.44, 1.14, -.04], [-.51, 1.14, .12], [-.555, 1.13, .21]], .011, m.grey, 32, 10));
    put(g, rbox(.03, .025, .03, .008, m.mid), -.555, 1.12, .21);
    put(g, cyl(.012, .012, .03, M.plastic(0xD9DEE1, .35), 16), -.432, by - .01, bz + .03, 0, 0, Math.PI / 2);
    g.add(corrugated([[-.447, by - .01, bz + .03], [-.5, by - .02, bz + .05], [-.545, .9, .17], [-.53, 1.0, .2], [-.535, 1.09, .21]], .011, m.limb));
    bag(g, -.555, 1.1, .21, .27, 0x2FA88C);
    P('d-bag', -.555, .93, .28);
    /* hasta hortumları ve Y parça */
    const tips = ypiece(g, [-.27, .64, .5], [0, 1, .25], m);
    [[[-.38, .66, .27], [-.33, .58, .38], [-.29, .6, .44]], [[-.33, .64, .26], [-.27, .56, .37], [-.24, .59, .43]]].forEach((pts, i) =>
      g.add(corrugated([ends[i * 2], ends[i * 2 + 1], ...pts.map(p => V3(...p)), tips[i][0], tips[i][1]], .0115, m.limb)));
    P('d-ypiece', -.27, .67, .53);
    /* atık gaz (AGSS) akış göstergesi ve hortumu (dolabın sol yanı) */
    put(g, rbox(.03, .2, .05, .008, m.grey), -.212, .44, .13);
    put(g, cyl(.012, .012, .16, M.clear(0xEAF4F8, .5), 16), -.232, .44, .14);
    put(g, sphere(.008, M.color(0x3CC24C)), -.232, .46, .14);
    g.add(corrugated([[-.232, .34, .14], [-.25, .26, .13], [-.3, .2, .05], [-.36, .16, -.12]], .012, M.plastic(0x5B9BD6, .4)));
    P('d-agss', -.25, .45, .17);
  }
  function a5Screen(ctx) {
    const {g, screens, parts} = ctx, m = a5M(ctx);
    put(g, cyl(.028, .03, .09, m.white, 24), .03, 1.2, -.22);
    put(g, rbox(.12, .05, .11, .02, m.white), .03, 1.245, -.19);
    const o = {x: .03, y: 1.282, z: -.1, w: .344, h: .194, bez: [.022, .018, .022, .042], d: .03, tilt: -.1, spec: a5Vent(), px: 1280};
    const {sg, HW, HH, oy} = screenHousing(g, o, screens, m);
    put(sg, rbox(HW * .7, HH * .7, .04, .02, m.white), 0, -.01, -.045);
    put(sg, box(.05, .004, .002, M.matte(0x3A4148)), 0, HH / 2 - .009, .0012);
    const by = -HH / 2 + .021;
    put(sg, txtD('mindray', .052, .013, {c: '#5A646B', wt: 700}), 0, by, .0008);
    put(sg, cyl(.0135, .0135, .012, M.plastic(0xC9CFD3, .3), 28), HW / 2 - .03, by, .006, Math.PI / 2);
    put(sg, torus(.0135, .0018, m.mid, 24), HW / 2 - .03, by, .012);
    put(sg, cyl(.004, .004, .003, M.led(0x3CC24C), 12), -HW / 2 + .02, by, .0015, Math.PI / 2);
    sg.updateMatrixWorld(true); g.updateMatrixWorld(true);
    parts.push({key: 'd-vscreen', at: sg.localToWorld(V3(0, oy, .04))}, {key: 'knob', at: sg.localToWorld(V3(HW / 2 - .03, by, .03))});
    return {sx: o.x, sy: o.y, sz: o.z};
  }
  function a5Extra(g, ctx) {
    const {P} = ctx, m = a5M(ctx);
    /* üst raf (478 × 310 mm) ve arka dikmeler; mavi kenar şeridi temsilidir */
    [-.17, .23].forEach(x => { put(g, cyl(.016, .016, .29, m.white, 20), x, 1.27, -.395); put(g, cyl(.018, .018, .012, m.blue, 20), x, 1.135, -.395); });
    put(g, rbox(.478, .03, .31, .012, m.white), .03, 1.43, -.29);
    put(g, box(.47, .006, .004, m.blue), .03, 1.432, -.134);
    /* arka: merkezi gaz girişleri ve hortumlar (O₂, N₂O, hava) */
    put(g, rbox(.2, .08, .012, .006, m.grey), .15, .96, -.385);
    [[0xF4F6F7, .09], [0x2F7DD1, .15], [0x1D2125, .21]].forEach(([c, x]) => {
      put(g, cyl(.009, .009, .02, m.chrome, 12), x, .96, -.398, Math.PI / 2);
      g.add(tube([[x, .96, -.405], [x, .92, -.45], [x + .02, .5, -.5], [x + .05, .015, -.62]], .007, M.rubber(c), 40, 8));
    });
    P('d-pipe', .2, .7, -.48);
    /* arka: tüp boyunduruğu (hava, N₂O, O₂ — PISS) ve küçük tüpler */
    put(g, rbox(.46, .05, .05, .01, m.mid), .04, .66, -.385);
    [[-.12, 0x1D2125], [.04, 0x2F7DD1], [.2, 0xF4F6F7]].forEach(([x, c]) => {
      put(g, cyl(.05, .05, .44, M.metal(0xB9C1C7, .3), 24), x, .4, -.45);
      put(g, sphere(.05, M.color(c, .4), 20), x, .62, -.45).scale.y = .55;
      put(g, cyl(.014, .014, .05, m.chrome, 12), x, .665, -.45);
      put(g, rbox(.05, .04, .04, .008, m.grey), x, .66, -.42);
    });
    P('d-cyl', -.12, .45, -.5);
    /* arka: güç girişi ve 4 yardımcı priz */
    put(g, rbox(.22, .07, .012, .006, m.panel), .12, .45, -.358);
    for (let k = 0; k < 4; k++) put(g, box(.03, .025, .004, M.matte(0x111518)), .045 + k * .045, .45, -.366);
    put(g, box(.035, .025, .004, M.matte(0x1A1F23)), .2, .51, -.366);
    P('j-power', .2, .5, -.38);
  }
  DEV3D.model('mindray-a5', {
    type: 'd-workstation', theta: -.55, w: .5, d: .58, top: .83, label: 'A5', cyl: 0, pipes: 0, agss: false,
    sections: {base: a5Base, cabinet: a5Cabinet, worktop: a5Worktop, tower: a5Tower, gas: a5Gas, vapor: a5Vapor, bs: a5BS, screen: a5Screen, monitors: () => {}},
    extra: a5Extra
  });

  /* =====================================================================
     Löwenstein Medical Leon plus — ölçüler: Leon plus User manual Rev. 3.11.18 (yazılım 3.11.x, 2026-01-15), s. 31–35, 58–60, 88,
     324–329 ve Leon plus datasheet (EN): araba Y 140 × G 92 × D 67 cm; yazı tablası 43 × 30 cm; 3 çekmece 14 × 27 × 30 cm;
     dolap bölmesi 31 × 20 × 28 cm; LM Patientmodul G 190 × Y 70 × D 365 mm; absorban Ø140 × 265 mm; 15" TFT dokunmatik ekran;
     pnömatik tahrikli asılı körük; elektronik 3 gazlı karıştırıcı; 2 Selectatec / Dräger uyumlu vaporizatör yuvası.
     Yerleşim kılavuzdaki ön/arka görünüş çizimlerine (s. 31–32) göre oranlanmıştır; yatay konumlar çizimden ölçeklenmiştir.
     ===================================================================== */
  const leonM = ctx => baseMats(ctx, {
    white: M.plastic(0xF3F2EE, .34), body: M.plastic(0xEDECE7, .38), light: M.plastic(0xD8DCDF, .4), grey: M.plastic(0xB3BAC0, .42), mid: M.plastic(0x8C949B, .42),
    blue: M.plastic(0xBBD3E6, .36), pm: M.plastic(0x9AA0AE, .4), recess: M.matte(0xD3D5D2, .7), bar: M.plastic(0xA4ABB5, .38),
    hub: M.plastic(0xE6E8EA, .4), fork: M.plastic(0xC9CED2, .4)
  });
  function leonBase(ctx) {
    const {g, P} = ctx, m = leonM(ctx);
    put(g, rbox(.76, .05, .64, .025, m.blue), 0, .215, -.03);
    put(g, rbox(.72, .006, .6, .02, M.plastic(0xA9C4D8, .4)), 0, .241, -.03);
    put(g, rbox(.27, .03, .05, .01, m.grey), 0, .155, .27);
    put(g, rbox(.07, .012, .04, .005, M.plastic(0xC0392B, .45)), -.07, .135, .29);
    put(g, rbox(.07, .012, .04, .005, M.plastic(0x2E9E58, .45)), .07, .135, .29);
    [[-.3, -.29], [.3, -.29], [-.3, .23], [.3, .23]].forEach(([x, z]) => caster(g, x, z, .06, .19, m));
    P('d-base', .3, .13, .3);
  }
  function leonCabinet(ctx) {
    const {g, P} = ctx, m = leonM(ctx), zf = .26;
    /* alt gövde, sağ sütun, sol girinti (hasta modülü / absorban / körük bölgesi) */
    put(g, rbox(.66, .34, .58, .018, m.body), 0, .41, -.03);
    put(g, rbox(.4, .4, .58, .018, m.body), .13, .77, -.03);
    put(g, rbox(.26, .4, .34, .015, m.body), -.2, .77, -.15);
    put(g, box(.252, .392, .004, m.recess), -.2, .77, .022);
    /* dolap bölmesi kapağı */
    put(g, rbox(.226, .3, .02, .008, m.white), -.186, .41, zf + .006);
    put(g, box(.07, .01, .006, m.seam), -.186, .54, zf + .016);
    /* üç çekmece */
    const dh = (.73 - .255) / 3;
    for (let k = 0; k < 3; k++) {
      const y = .255 + dh * (k + .5);
      put(g, rbox(.362, dh - .006, .02, .008, m.white), .115, y, zf + .006);
      put(g, box(.12, .01, .006, m.seam), .115, y + dh / 2 - .025, zf + .016);
    }
    /* çekilebilir yazı tablası (43 × 30 cm) */
    put(g, rbox(.43, .025, .3, .006, m.white), .15, .8, .135);
    put(g, box(.43, .004, .004, m.light), .15, .787, .286);
    /* gösterge ve kontrol paneli: O₂ flush, aspirasyon anahtarı, vakum ayarı, VAC / O₂ / N₂O manometreleri */
    const cz = zf + .002;
    put(g, rbox(.31, .115, .012, .01, m.light), .134, .9, cz);
    put(g, cyl(.012, .012, .012, M.plastic(0x8FA4C2, .35), 24), .005, .918, cz + .012, Math.PI / 2);
    put(g, txtD('O₂+', .03, .01, {c: '#3A4148'}), .005, .89, cz + .0065);
    put(g, cyl(.011, .011, .01, m.dark, 20), .045, .922, cz + .011, Math.PI / 2); put(g, box(.004, .016, .004, M.plastic(0xF4F6F7)), .045, .922, cz + .017);
    put(g, cyl(.011, .011, .014, M.plastic(0xE8C82E, .4), 20), .045, .875, cz + .013, Math.PI / 2);
    [['VAC', .11, .35], ['O₂', .175, .7], ['N₂O', .24, .55]].forEach(([l, x, n]) => gauge(g, x, .905, cz + .006, .024, l, n, m));
    /* yan derzler, havalandırma */
    for (let k = 0; k < 6; k++) put(g, box(.002, .005, .18, m.seam), .3305, .35 + k * .014, -.1);
    P('d-drawer', .22, .66, zf + .03); P('d-worktop', .25, .815, .24); P('j-leon-ctl', .134, .93, cz + .03);
  }
  function leonTower(ctx) {
    const {g, P} = ctx, m = leonM(ctx);
    /* üst gövde: sol tam derinlik; sağda vaporizatör nişi (y 1.05–1.29) */
    put(g, rbox(.395, .38, .58, .018, m.body), -.1325, 1.16, -.03);
    put(g, rbox(.265, .08, .58, .015, m.body), .1975, 1.01, -.03);
    put(g, rbox(.265, .06, .58, .015, m.body), .1975, 1.32, -.03);
    put(g, rbox(.265, .24, .45, .015, m.body), .1975, 1.17, -.095);
    put(g, box(.255, .232, .004, m.recess), .1975, 1.17, .132);
    put(g, box(.012, .24, .13, m.body), .324, 1.17, .195);
    /* üst kapak (açık mavi) ve yazı */
    put(g, rbox(.68, .05, .6, .02, m.blue), 0, 1.375, -.03);
    put(g, txtD('leon plus', .08, .018, {c: '#5E7C96', it: true, wt: 600}), .23, 1.375, .2705);
    /* tuş takımı ve kodlayıcı (ekranın altında) */
    put(g, rbox(.305, .062, .014, .01, m.light), -.12, 1.03, .267);
    for (let r = 0; r < 2; r++) for (let k = 0; k < 5; k++) put(g, rbox(.022, .012, .005, .005, k === 4 && r ? M.plastic(0xE8D23F, .4) : m.grey), -.255 + k * .036, 1.045 - r * .026, .276);
    put(g, txtD('leon', .03, .01, {c: '#5E6A72', wt: 600}), -.06, 1.019, .2745);
    put(g, cyl(.019, .02, .016, M.plastic(0xC9D0D8, .32), 28), -.005, 1.03, .282, Math.PI / 2);
    put(g, torus(.0195, .002, m.mid, 28), -.005, 1.03, .2895);
    P('j-leon-keys', -.06, 1.045, .3);
    /* opsiyon paneli (sol yan duvarın üstü): O₂ acil dozaj (kırmızı halka), su tutucu, akış ölçer, harici O₂ çıkışı */
    put(g, rbox(.04, .3, .07, .01, m.light), -.352, 1.15, .2);
    put(g, cyl(.012, .012, .012, M.plastic(0xF4F6F7), 20), -.352, 1.26, .24, Math.PI / 2); put(g, torus(.0125, .003, M.plastic(0xC0392B, .4), 24), -.352, 1.26, .246);
    put(g, cyl(.01, .011, .035, M.clear(0xEEF4F7, .6), 16), -.352, 1.195, .24);
    flowTube(g, -.352, 1.115, .235, .05, 0xF4F6F7, .4, m);
    put(g, cyl(.011, .011, .014, m.metal, 20), -.352, 1.045, .242, Math.PI / 2); put(g, cyl(.007, .007, .016, m.white, 16), -.352, 1.045, .25, Math.PI / 2);
    P('j-leon-opt', -.37, 1.18, .26);
    /* yan profil rayları ve sağ manevra tutamağı */
    [-1, 1].forEach(s => { put(g, box(.01, .026, .4, m.metal), s * .345, .985, -.04); [-.2, .12].forEach(z => put(g, box(.02, .016, .02, m.metal), s * .336, .985, z)); });
    g.add(tube([[.33, 1.305, .17], [.39, 1.28, .18], [.408, 1.17, .18], [.39, 1.06, .18], [.33, 1.035, .17]], .013, m.grey, 40, 10));
    P('d-rail', .35, .985, .14);
    /* bronş aspirasyonu montajı (sol yan, alt) */
    put(g, box(.012, .3, .02, m.metal), -.345, .41, .18);
    [.3, .47].forEach(y => put(g, box(.07, .01, .02, m.metal), -.375, y, .18));
    put(g, cyl(.04, .036, .12, M.clear(0xEEF4F7, .45), 24, true), -.405, .36, .18);
    put(g, cyl(.042, .042, .014, m.white, 24), -.405, .427, .18);
  }
  function leonVapor(ctx) {
    const {g, P} = ctx, m = leonM(ctx);
    /* Selectatec / Dräger uyumlu montaj çubuğu: 4 pim, 2 kilit deliği (s. 33) */
    put(g, rbox(.235, .035, .05, .008, m.bar), .1975, 1.085, .158);
    [.13, .16, .235, .265].forEach(x => put(g, cyl(.006, .006, .012, m.chrome, 12), x, 1.108, .158));
    [.145, .25].forEach(x => put(g, cyl(.007, .007, .002, m.black, 16), x, 1.085, .1835, Math.PI / 2));
    /* temsili Selectatec tipi vaporizatörler (vaporizatör temel teslimata dahil değil) */
    [[.14, 'sevo'], [.255, 'iso']].forEach(([x, agent]) => {
      const col = AG[agent], v = new THREE.Group(); v.position.set(x, 1.103, .19); g.add(v);
      const W = .095, H = .135, D = .135;
      put(v, rbox(W, H, D, .012, M.plastic(0xF2F3F4, .34)), 0, H / 2, 0);
      put(v, rbox(W * .9, .02, .004, .004, M.plastic(col, .4)), 0, H * .82, D / 2 + .001);
      put(v, txtD(agent === 'iso' ? 'Isoflurane' : 'Sevoflurane', W * .7, .01, {c: '#1F262B'}), 0, H * .82, D / 2 + .0035);
      put(v, rbox(.012, .045, .005, .004, M.glass(0xD8ECF4, .6)), W * .33, H * .42, D / 2 + .002);
      put(v, rbox(.03, .04, .016, .006, M.plastic(col, .4)), -W * .22, H * .3, D / 2 + .006);
      put(v, cyl(.04, .042, .022, M.plastic(0xDDE1E4, .32), 36), 0, H + .011, .005);
      put(v, torus(.041, .0025, M.plastic(col, .4), 36), 0, H + .016, .005, Math.PI / 2);
      put(v, rbox(.04, .008, .01, .003, m.mid), 0, H + .026, .005);
      put(v, rbox(.05, .012, .02, .005, m.mid), 0, H * .6, -D / 2 - .008);
    });
    P('d-vapor', .1975, 1.27, .25);
  }
  function leonBS(ctx) {
    const {g, P, screens} = ctx, m = leonM(ctx);
    /* LM Patientmodul: uzun ekseni x yönünde (365 mm), 190 mm derinlik, 70 mm yükseklik; altına absorban ve körük kubbesi takılır */
    const px = -.2875, py = .9, pz = .14;
    put(g, rbox(.365, .07, .19, .016, m.pm), px, py, pz);
    put(g, box(.367, .003, .19, M.plastic(0xC07A7A, .4)), px, py - .012, pz);
    put(g, rbox(.08, .03, .12, .01, m.mid), -.13, py + .01, .0);
    /* gözetleme camlı insp/eksp valfleri ve APL (üstte) */
    [-.43, -.385].forEach(x => {
      put(g, cyl(.019, .019, .008, m.light, 24), x, py + .039, pz + .01);
      put(g, cyl(.016, .016, .016, M.clear(0xF4E9C8, .55), 24), x, py + .051, pz + .01);
      put(g, cyl(.012, .012, .002, M.color(0xD8C690), 20), x, py + .046, pz + .01);
    });
    P('d-valves', -.41, py + .075, pz + .03);
    put(g, cyl(.017, .017, .012, m.mid, 20), -.33, py + .041, pz);
    put(g, cyl(.02, .021, .03, M.plastic(0xA6ACB8, .35), 28), -.33, py + .062, pz);
    for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; put(g, box(.003, .026, .003, m.grip), -.33 + Math.cos(a) * .0205, py + .062, pz + Math.sin(a) * .0205, 0, -a, 0); }
    put(g, cyl(.016, .016, .006, M.plastic(0xC2C8D0, .3), 24), -.33, py + .08, pz);
    P('d-apl', -.33, py + .1, pz);
    /* hasta bağlantıları: ön yüzde iki port, sarı halkalı (22/15 mm) */
    const ends = [];
    [-.44, -.395].forEach(x => {
      const pg = new THREE.Group(); pg.position.set(x, py - .005, pz + .095); dirQ(pg, [-.35, -.15, 1]); g.add(pg);
      put(pg, cyl(.018, .018, .01, m.light, 24), 0, .005, 0);
      put(pg, cyl(.016, .016, .01, M.plastic(0xE8B23A, .4), 24), 0, .015, 0);
      put(pg, cyl(.0108, .0118, .03, M.plastic(0xF0E2B8, .35), 20), 0, .034, 0);
      pg.updateMatrixWorld(true); ends.push(pg.localToWorld(V3(0, .048, 0)), pg.localToWorld(V3(0, .1, 0)));
    });
    P('j-leon-pm', -.2, py + .05, pz + .1);
    /* CO₂ absorbanı (Ø140 × 265 mm) */
    const ax = -.33, az = .14;
    put(g, cyl(.05, .05, .03, m.mid, 28), ax, .85, az);
    put(g, cyl(.07, .07, .245, M.clear(0xF2EEDD, .45), 36), ax, .71, az);
    put(g, cyl(.064, .064, .225, M.color(0xEFE6C4, .9), 28), ax, .715, az);
    put(g, cyl(.071, .068, .03, m.dark, 36), ax, .585, az);
    put(g, txtD('Leonsorb', .05, .014, {c: '#6A6040', wt: 700}), ax, .74, az + .0715);
    P('d-absorber', ax, .7, az + .08);
    /* asılı körük şeffaf kubbede (pnömatik tahrik) */
    const dx = -.16, dz = .14, top = .865;
    put(g, cyl(.072, .072, .016, m.light, 32), dx, top - .008, dz);
    put(g, cyl(.068, .068, .23, M.clear(0xE6F1F5, .26), 40, true), dx, top - .016 - .115, dz);
    put(g, sphere(.068, M.clear(0xE6F1F5, .26), 32), dx, top - .246, dz).scale.y = .35;
    const bel = new THREE.Group(); bel.position.set(dx, top - .016, dz); g.add(bel);
    const bm = bellowsMesh(.05, .06, .2, 0x9FC6E4); bm.position.y = -.2; bel.add(bm);
    screens.push(breathe(bel));
    P('j-leon-bel', dx, .72, dz + .075);
    /* balon: modül altındaki 22 mm konnektör, askı braketi, hortum */
    put(g, cyl(.011, .011, .03, m.light, 16), -.42, py - .05, pz + .06);
    g.add(tube([[-.455, py - .035, pz + .05], [-.455, py - .09, pz + .055], [-.49, py - .095, pz + .06], [-.49, py - .04, pz + .06]], .004, m.metal, 24, 8));
    g.add(corrugated([[-.42, py - .065, pz + .06], [-.43, .79, .22], [-.47, .78, .25], [-.49, .8, .22]], .011, M.plastic(0xE8DDB8, .35)));
    bag(g, -.49, .79, .22, .29, 0x3C8C6A);
    P('j-leon-bag', -.49, .62, .29);
    /* hasta hortumları ve Y parça */
    const tips = ypiece(g, [-.5, .58, .5], [.2, 1, .2], m);
    [[[-.5, .8, .32], [-.55, .7, .42], [-.53, .62, .46]], [[-.45, .78, .31], [-.49, .68, .41], [-.47, .61, .45]]].forEach((pts, i) =>
      g.add(corrugated([ends[i * 2], ends[i * 2 + 1], ...pts.map(p => V3(...p)), tips[i][0], tips[i][1]], .0115, M.plastic(0xE8DDB8, .35))));
    P('d-ypiece', -.5, .61, .54);
  }
  function leonScreen(ctx) {
    const {g, screens, parts} = ctx, m = leonM(ctx);
    const o = {x: -.12, y: 1.19, z: .282, w: .305, h: .229, bez: [.015, .016, .015, .016], d: .03, tilt: -.05, spec: leonVent(), px: 1024, mat: m.light};
    put(g, rbox(.345, .275, .02, .012, m.body), o.x, o.y, .262);
    const {sg, oy} = screenHousing(g, o, screens, m);
    sg.updateMatrixWorld(true); g.updateMatrixWorld(true);
    parts.push({key: 'd-vscreen', at: sg.localToWorld(V3(0, oy, .04))});
    return {sx: o.x, sy: o.y, sz: o.z};
  }
  function leonExtra(g, ctx) {
    const {P} = ctx, m = leonM(ctx), zb = -.32;
    /* arka: fan ızgarası, elektrik bağlantıları, şebeke girişi ve 4 yardımcı priz (s. 32) */
    put(g, box(.13, .13, .004, m.dark), .2, 1.18, zb - .002);
    put(g, decal(.12, .12, (c, Wd, Hh) => { c.strokeStyle = '#8C949B'; c.lineWidth = 6; for (let k = 1; k < 5; k++) { c.beginPath(); c.arc(Wd / 2, Hh / 2, k * Wd * .11, 0, 7); c.stroke(); } c.beginPath(); c.moveTo(0, 0); c.lineTo(Wd, Hh); c.moveTo(Wd, 0); c.lineTo(0, Hh); c.stroke(); }, 128), .2, 1.18, zb - .0045).rotation.y = Math.PI;
    put(g, rbox(.3, .05, .01, .005, m.light), .12, 1.3, zb - .004);
    put(g, rbox(.2, .06, .01, .005, m.light), -.2, 1.3, zb - .004);
    for (let k = 0; k < 4; k++) put(g, box(.03, .025, .004, M.matte(0x111518)), -.27 + k * .045, 1.3, zb - .01);
    put(g, box(.03, .03, .004, M.matte(0x1A1F23)), -.2, 1.235, zb - .006);
    P('j-power', -.2, 1.3, zb - .04);
    /* arka: pnömatik bağlantılar (NIST) ve merkezi gaz hortumları */
    put(g, rbox(.29, .15, .012, .006, m.light), .165, .915, zb - .005);
    [[0xF4F6F7, .08], [0x2F7DD1, .14], [0x1D2125, .2]].forEach(([c, x]) => {
      put(g, cyl(.01, .01, .022, m.chrome, 6), x, .9, zb - .02, Math.PI / 2);
      g.add(tube([[x, .9, zb - .03], [x, .86, zb - .08], [x + .02, .45, zb - .13], [x + .05, .015, zb - .3]], .007, M.rubber(c), 40, 8));
    });
    P('d-pipe', .2, .6, zb - .14);
    /* arka: atık gaz (AGSS) bağlantısı */
    put(g, cyl(.016, .016, .03, m.mid, 20), -.23, .61, zb - .015, Math.PI / 2);
    g.add(corrugated([[-.23, .61, zb - .03], [-.23, .55, zb - .08], [-.2, .3, zb - .1], [-.15, .1, zb - .16]], .012, M.plastic(0x5B9BD6, .4)));
    P('d-agss', -.23, .61, zb - .05);
    /* sol yan arka: 10 L tüp montajı (isteğe bağlı) ve O₂ tüpü */
    const tx = -.405, tz = -.27;
    put(g, cyl(.07, .07, .8, M.metal(0xB9C1C7, .3), 28), tx, .63, tz);
    put(g, sphere(.07, M.color(0xF4F6F7, .4), 24), tx, 1.03, tz).scale.y = .5;
    put(g, cyl(.016, .016, .06, m.chrome, 12), tx, 1.085, tz);
    [.5, .78].forEach(y => put(g, rbox(.05, .03, .16, .008, m.grey), -.345, y, tz));
    P('d-cyl', tx - .07, .75, tz);
    /* arka kapak derzleri */
    put(g, box(.002, .45, .002, m.seam), 0, .5, zb - .0015);
  }
  DEV3D.model('lowenstein-medical-leon-plus', {
    type: 'd-workstation', theta: -.55, w: .66, d: .58, top: .83, label: 'Leon plus', cyl: 0, pipes: 0, agss: false,
    sections: {base: leonBase, cabinet: leonCabinet, worktop: () => {}, tower: leonTower, gas: () => {}, vapor: leonVapor, bs: leonBS, screen: leonScreen, monitors: () => {}},
    extra: leonExtra
  });
})();
