'use strict';
/* Cihaz yapılandırmaları B: nöromüsküler izlem (TOF) ve Masimo ailesi (Root/Radical-7, Rad-97, Rad-67, EMMA, ISA,
   rainbow akustik, rainbow parametreleri). Ortak yardımcılar: b-hand (el + uyarı elektrotları + sensör), b-radical (Root'a
   takılı Radical-7), b-rainbow / b-acoustic sensörleri. */
(() => {
  if (!DEV3D) return;
  const {V3, M, rbox, box, cyl, sphere, tube, put, decal, makeScreen, nameplate, sensorTip} = DEV3D.H;
  const T = DEV3D.partText;

  /* ---------- Parça metinleri ---------- */
  T('b-stim', {tr: ['Uyarı elektrotları', 'Ulnar sinir üzerinde bileğe yapıştırılan iki yüzey elektrodudur; cihaz bu elektrotlardan kısa elektrik uyarıları verir.'], en: ['Stimulating electrodes', 'Two surface electrodes placed on the wrist over the ulnar nerve; the device delivers short electrical stimuli through them.'], es: ['Electrodos de estimulación', 'Dos electrodos de superficie colocados en la muñeca sobre el nervio cubital; el equipo aplica breves estímulos eléctricos a través de ellos.']});
  T('b-accel', {tr: ['İvmeölçer (başparmak)', 'Başparmağa sabitlenen sensör, uyarıya yanıt olarak oluşan başparmak hareketini (ivmeyi) algılar.'], en: ['Accelerometer (thumb)', 'Sensor fixed to the thumb that detects the thumb movement (acceleration) produced in response to stimulation.'], es: ['Acelerómetro (pulgar)', 'Sensor fijado al pulgar que detecta el movimiento (aceleración) del pulgar en respuesta al estímulo.']});
  T('b-emg', {tr: ['EMG sensörü', 'Kas üzerindeki kayıt elektrotları, uyarıya karşı oluşan bileşik kas aksiyon potansiyelini (elektriksel yanıtı) algılar.'], en: ['EMG sensor', 'Recording electrodes over the muscle detect the compound muscle action potential (electrical response) to stimulation.'], es: ['Sensor EMG', 'Los electrodos de registro sobre el músculo detectan el potencial de acción muscular compuesto (respuesta eléctrica) al estímulo.']});
  T('b-hand', {tr: ['Ölçüm bölgesi (el)', 'Model eli yalnızca yerleşimi göstermek içindir; uygulama ayrıntıları için "Hastaya uygulama" bölümüne bakın.'], en: ['Measurement site (hand)', 'The model hand only illustrates placement; see "Applying it to the patient" for details.'], es: ['Zona de medición (mano)', 'La mano del modelo solo ilustra la colocación; consulte "Aplicación al paciente" para los detalles.']});
  T('b-cable', {tr: ['Hasta kablosu', 'Cihazı elektrotlara ve sensöre bağlar; gerilmeden ve ezilmeden yerleştirilmelidir.'], en: ['Patient cable', 'Connects the device to the electrodes and sensor; route it without tension or crushing.'], es: ['Cable del paciente', 'Conecta el equipo a los electrodos y al sensor; colóquelo sin tensión ni aplastamiento.']});
  T('b-handle', {tr: ['Tutamak', 'Gövdeye kalıplanmış taşıma tutamağıdır.'], en: ['Handle', 'Carrying handle molded into the housing.'], es: ['Asa', 'Asa de transporte moldeada en la carcasa.']});
  T('b-dock', {tr: ['Root yuvası', 'Radical-7 el ünitesi Root platformuna takılır; ölçümler büyük ekranda gösterilir ve platforma genişletme modülleri eklenebilir.'], en: ['Root dock', 'The Radical-7 handheld docks into the Root platform for display on the large screen, and expansion modules can be added.'], es: ['Base Root', 'La unidad portátil Radical-7 se acopla a la plataforma Root; sus mediciones se muestran en la pantalla grande y pueden añadirse módulos de expansión.']});
  T('b-handheld', {tr: ['El ünitesi', 'Kendi ekranı ve bataryası olan çıkarılabilir ölçüm ünitesidir; yuvadan çıkarıldığında taşınabilir olarak kullanılabilir.'], en: ['Handheld unit', 'Removable measurement unit with its own screen and battery; it can be used portably when undocked.'], es: ['Unidad portátil', 'Unidad de medición extraíble con pantalla y batería propias; puede usarse de forma portátil fuera de la base.']});
  T('b-rainbow', {tr: ['rainbow parmak sensörü', 'Çok dalga boylu ışık yayan ve algılayan yapışkan ya da tekrar kullanılabilir parmak sensörüdür; ölçülebilen parametreler sensör tipine bağlıdır.'], en: ['rainbow finger sensor', 'Adhesive or reusable finger sensor that emits and detects multiple wavelengths of light; the available parameters depend on the sensor type.'], es: ['Sensor de dedo rainbow', 'Sensor de dedo adhesivo o reutilizable que emite y detecta varias longitudes de onda de luz; los parámetros disponibles dependen del tipo de sensor.']});
  T('b-acoustic', {tr: ['Akustik sensör', 'Boyna yapıştırılan sensör, üst hava yolundaki hava akımının seslerini algılar.'], en: ['Acoustic sensor', 'Sensor adhered to the neck that detects the sounds of airflow in the upper airway.'], es: ['Sensor acústico', 'Sensor adherido al cuello que detecta los sonidos del flujo aéreo en la vía aérea superior.']});
  T('b-adapter', {tr: ['Hava yolu adaptörü', 'Solunum devresine (Y-parçası ile hasta tarafı arasına) yerleştirilen tek kullanımlık adaptördür; gaz bu pencereden geçerken ölçülür.'], en: ['Airway adapter', 'Disposable adapter placed in the breathing circuit (between the Y-piece and the patient side); gas is measured as it passes this window.'], es: ['Adaptador de vía aérea', 'Adaptador desechable colocado en el circuito respiratorio (entre la pieza en Y y el lado del paciente); el gas se mide al pasar por esta ventana.']});
  T('b-sampling', {tr: ['Örnekleme hattı', 'Solunum gazından sürekli küçük bir örnek çekerek analizöre taşır; su tuzağı/filtre nemi ve sekresyonu tutar.'], en: ['Sampling line', 'Continuously draws a small sample of breathing gas to the analyzer; the water trap/filter retains moisture and secretions.'], es: ['Línea de muestreo', 'Extrae continuamente una pequeña muestra de gas respiratorio hacia el analizador; la trampa de agua/filtro retiene humedad y secreciones.']});
  T('b-circuit', {tr: ['Solunum devresi', 'Modelde ölçüm noktasını göstermek için temsili olarak çizilmiştir.'], en: ['Breathing circuit', 'Drawn schematically in the model to show the measurement point.'], es: ['Circuito respiratorio', 'Dibujado de forma esquemática en el modelo para mostrar el punto de medición.']});

  /* ---------- Yardımcılar ---------- */
  const SKIN = () => M.matte(0xE2B79A, .62);
  /* Kablo: a noktasından masaya iner, masada ilerler, b noktasına çıkar */
  const cableTo = (g, a, b, col = 0x2E363C, r = .0028) => {
    const dir = b.clone().sub(a).setY(0), L = dir.length(); dir.normalize();
    const p1 = a.clone().add(dir.clone().multiplyScalar(Math.min(.04, L * .15))); p1.y = Math.max(.006, a.y * .35);
    const p2 = a.clone().add(dir.clone().multiplyScalar(L * .45)); p2.y = .005; p2.z += .03;
    const p3 = b.clone().sub(dir.clone().multiplyScalar(Math.min(.05, L * .2))); p3.y = Math.max(.008, b.y * .5);
    return g.add(tube([a, p1, p2, p3, b], r, M.matte(col)));
  };
  /* Masada duran el (avuç yukarı). opts.sensor: 'accel'|'emg'|'none'. Dönüş: dünya koordinatında bağlantı noktaları. */
  function hand(g, x, z, ry = 0, opts = {}) {
    const h = new THREE.Group(); h.position.set(x, 0, z); h.rotation.y = ry; g.add(h);
    const skin = SKIN();
    const arm = cyl(.029, .033, .13, skin, 24); arm.scale.set(1, 1, .7); put(h, arm, -.065, .022, 0, 0, 0, Math.PI / 2);
    put(h, rbox(.085, .024, .082, .011, skin), .045, .018, 0);
    [-.028, -.009, .01, .028].forEach((zz, i) => { const L = [.055, .07, .075, .068][i], f = cyl(.0085, .009, L, skin, 14); put(h, f, .088 + L / 2, .016, zz, 0, 0, Math.PI / 2); });
    const th = cyl(.009, .011, .058, skin, 14); put(h, th, .045, .02, .052, 0, -.7, Math.PI / 2);
    const thumbTip = V3(.072, .026, .072);
    const W = v => { h.updateMatrixWorld(true); return h.localToWorld(v.clone()); };
    /* Uyarı elektrotları: bileğin iç yüzü, ulnar taraf */
    const elMat = M.plastic(0xF4F6F7);
    if (!opts.noStim) [-.025, -.058].forEach((xx, i) => { put(h, cyl(.012, .012, .002, elMat, 20), xx, .044, -.012); put(h, cyl(.003, .003, .005, M.color(i ? 0x1B1F23 : 0xC0392B), 10), xx, .047, -.012); });
    const res = {stim: W(V3(-.04, .05, -.012)), hand: W(V3(.06, .035, 0)), lead: W(V3(-.04, .047, -.03))};
    if (opts.sensor === 'accel') {
      put(h, rbox(.02, .012, .016, .003, M.color(opts.sensorColor || 0x2F5E73, .4)), thumbTip.x, thumbTip.y + .004, thumbTip.z, 0, -.7, 0);
      h.add(tube([V3(thumbTip.x - .01, thumbTip.y + .006, thumbTip.z - .008), V3(.02, .04, .03), V3(-.06, .05, .0), V3(-.035, .05, -.03)], .0018, M.matte(0x2E363C)));
      res.sensor = W(V3(thumbTip.x, thumbTip.y + .02, thumbTip.z)); res.sensorKey = 'b-accel';
    } else if (opts.sensor === 'emg') {
      /* Tenar/adduktor bölgesinde kayıt elektrotlu şerit */
      const strip = rbox(.07, .002, .016, .0009, M.plastic(opts.sensorColor || 0xF4F6F7)); put(h, strip, .03, .031, .03, 0, -.5, 0);
      [.008, .05].forEach(xx => put(h, cyl(.006, .006, .0025, M.color(0xB8C2C8), 16), xx, .033, .03 + (xx - .03) * .55));
      res.sensor = W(V3(.03, .045, .03)); res.sensorKey = 'b-emg';
    } else if (opts.sensor === 'emg2') {
      /* Ayrı kayıt elektrotları: başparmak tabanı ve avuç (tenar) */
      [[.06, .062], [.04, .022]].forEach(([xx, zz]) => put(h, cyl(.011, .011, .002, elMat, 20), xx, .031, zz));
      res.sensor = W(V3(.05, .05, .045)); res.sensorKey = 'b-emg';
    }
    if (opts.clip) {
      const cm = M.color(opts.clip, .35), spots = [[-.025, .046, -.012], [-.058, .046, -.012]].concat(opts.sensor === 'emg2' ? [[.06, .033, .062], [.04, .033, .022]] : []);
      spots.forEach(([xx, yy, zz]) => { put(h, rbox(.022, .008, .011, .003, cm), xx - .004, yy + .004, zz); h.add(tube([V3(xx - .015, yy + .004, zz), V3(xx - .04, yy + .015, zz - .01), V3(-.04, .047, -.03)], .0013, M.plastic(0xF2F4F5), 24, 6)); });
    }
    return res;
  }
  /* NMT cihazı + el: cihazın port noktasından ele kablo ve parça işaretleri */
  function nmtHand(g, parts, from, x, z, ry, opts) {
    const r = hand(g, x, z, ry, opts);
    cableTo(g, from, r.lead, opts.cable || 0x2E363C, .003);
    parts.push({key: 'b-stim', at: r.stim}, {key: 'b-hand', at: r.hand});
    if (r.sensor) parts.push({key: r.sensorKey, at: r.sensor});
    return r;
  }

  /* ---------- Nöromüsküler izlem ---------- */
  /* Port noktasını yeniden konumlandır (kurucunun varsayılanı üst kenar) */
  const movePort = (parts, at) => { const p = parts.find(q => q.key === 'port'); if (p) p.at = at; };

  /* TetraGraph — beyaz çerçeveli dikey el monitörü; ön yüz tümüyle siyah cam, altta beyaz TETRAGRAPH yazısı; alttan kablo; EMG şerit sensör.
     Ekran üretici görselindeki gibi: mavi zemin, üstte durum çubuğu, ortada blok derinliği yayı içinde büyük TOFR,
     altında TOF çubuk grafiği, en altta süre seçimi, duraklat düğmesi ve PTC anahtarı */
  DEV3D.model('tetragraph', {
    type: 'handheld', w: .093, h: .165, d: .028, body: 0xF2F4F5, screenFrac: .83, keys: 0,
    screen: {bg: '#0B3D78', draw(g, t, {txt, rr, GL, W, H}) {
      const gr = g.createRadialGradient(W * .5, H * .4, 0, W * .5, H * .4, H * .62); gr.addColorStop(0, '#1F7FDA'); gr.addColorStop(1, '#0A3268'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      const GRN = '#3FD07A', BLU = '#2F86E0';
      /* Durum çubuğu */
      g.strokeStyle = GRN; g.lineWidth = H * .005; g.beginPath(); g.moveTo(W * .07, H * .02); g.lineTo(W * .04, H * .037); g.lineTo(W * .075, H * .037); g.lineTo(W * .045, H * .055); g.stroke();
      g.beginPath(); g.moveTo(W * .1, H * .045); g.lineTo(W * .13, H * .045); g.lineTo(W * .15, H * .02); g.lineTo(W * .17, H * .055); g.lineTo(W * .19, H * .045); g.stroke();
      txt('13.7mV', W * .21, H * .038, {c: GRN, s: .024, wt: 600});
      txt(`00:00:${String(48 + Math.floor(t) % 12).padStart(2, '0')}`, W * .5, H * .038, {c: '#FFFFFF', s: .026, wt: 600, al: 'c'});
      GL.battery(W * .78, H * .038, W * .035, '#FFFFFF'); GL.gear(W * .91, H * .038, W * .035, '#FFFFFF');
      txt('50%', W * .96, H * .125, {c: '#FFFFFF', s: .027, wt: 600, al: 'r'}); txt('T1/Tc', W * .96, H * .155, {c: '#FFFFFF', s: .027, wt: 600, al: 'r'});
      /* Blok derinliği yayı: Minimal (beyaz dolu) → Shallow → Moderate → Deep */
      const cx = W * .47, cy = H * .4, R = W * .38, a0 = Math.PI * .8, a1 = Math.PI * 2.2, lw = W * .06;
      g.lineCap = 'butt'; g.lineWidth = lw; g.strokeStyle = 'rgba(6,28,64,.8)'; g.beginPath(); g.arc(cx, cy, R, a0, a1); g.stroke();
      g.strokeStyle = '#FFFFFF'; g.beginPath(); g.arc(cx, cy, R, a0, a0 + (a1 - a0) * .2); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = W * .006; [.2, .42, .66].forEach(f => { const a = a0 + (a1 - a0) * f; g.beginPath(); g.moveTo(cx + Math.cos(a) * (R - lw / 2), cy + Math.sin(a) * (R - lw / 2)); g.lineTo(cx + Math.cos(a) * (R + lw / 2), cy + Math.sin(a) * (R + lw / 2)); g.stroke(); });
      const na = a0 + (a1 - a0) * .23; g.strokeStyle = '#FFFFFF'; g.lineWidth = W * .012; g.beginPath(); g.moveTo(cx + Math.cos(na) * (R - lw * .9), cy + Math.sin(na) * (R - lw * .9)); g.lineTo(cx + Math.cos(na) * (R - lw * 1.9), cy + Math.sin(na) * (R - lw * 1.9)); g.stroke();
      [['Minimal', .1, '#0B1A30'], ['Shallow', .31, '#9CB4D2'], ['Moderate', .54, '#9CB4D2'], ['Deep', .83, '#9CB4D2']].forEach(([s, f, c]) => {
        const a = a0 + (a1 - a0) * f; g.save(); g.translate(cx + Math.cos(a) * R, cy + Math.sin(a) * R); g.rotate(a + Math.PI / 2); txt(s, 0, 0, {c, s: .019, wt: 600, al: 'c'}); g.restore();
      });
      g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = W * .005; g.beginPath(); g.arc(cx, cy, W * .23, 0, 7); g.stroke();
      txt('%', cx, H * .3, {c: '#FFFFFF', s: .04, wt: 600, al: 'c'});
      txt('40', cx, H * .4, {c: '#FFFFFF', s: .12, wt: 700, al: 'c'});
      txt('TOFR', cx, H * .5, {c: '#FFFFFF', s: .042, wt: 600, al: 'c'});
      [['Acceptable', .565], ['Recovery', .59]].forEach(([s, y]) => txt(s, W * .24, H * y, {c: '#9CB4D2', s: .019, wt: 500, al: 'c'}));
      [['Complete', .565], ['Block', .59]].forEach(([s, y]) => txt(s, W * .74, H * y, {c: '#9CB4D2', s: .019, wt: 500, al: 'c'}));
      /* TOF yanıt grafiği */
      txt('15 mV', W * .06, H * .7, {c: '#C9D8EA', s: .02, wt: 500});
      g.lineWidth = H * .003; g.strokeStyle = GRN; [.7, .712].forEach(y => { g.beginPath(); g.moveTo(W * .25, H * y); g.lineTo(W * .74, H * y); g.stroke(); });
      g.strokeStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.moveTo(W * .2, H * .755); g.lineTo(W * .78, H * .755); g.stroke();
      const shown = Math.floor(t * 1.5) % 6;
      [1, .72, .55, .42].forEach((f, k) => { g.fillStyle = k <= shown ? '#FFFFFF' : 'rgba(255,255,255,.18)'; g.fillRect(W * (.27 + k * .115), H * (.835 - .07 * f), W * .095, H * .07 * f); });
      txt('0 mV', W * .16, H * .83, {c: '#C9D8EA', s: .02, wt: 500});
      [[.08, 1], [.9, -1]].forEach(([x, dir]) => { g.fillStyle = BLU; g.beginPath(); g.arc(W * x, H * .81, W * .045, 0, 7); g.fill(); g.strokeStyle = '#FFFFFF'; g.lineWidth = W * .01; g.beginPath(); g.moveTo(W * (x + .012 * dir), H * .795); g.lineTo(W * (x - .012 * dir), H * .81); g.lineTo(W * (x + .012 * dir), H * .825); g.stroke(); });
      g.fillStyle = 'rgba(255,255,255,.3)'; g.fillRect(W * .04, H * .862, W * .92, H * .004); g.fillStyle = '#FFFFFF'; g.fillRect(W * .04, H * .862, W * .2, H * .004);
      /* Alt sıra: süre, duraklat, PTC */
      g.strokeStyle = '#9CC2EE'; g.lineWidth = W * .006; rr(W * .04, H * .905, W * .25, H * .045, H * .022); g.stroke();
      txt('15 sec  ⌄', W * .165, H * .928, {c: '#FFFFFF', s: .021, wt: 600, al: 'c'});
      g.fillStyle = BLU; g.beginPath(); g.arc(W * .5, H * .928, W * .055, 0, 7); g.fill(); GL.pause(W * .5, H * .928, W * .03, '#FFFFFF');
      g.fillStyle = BLU; rr(W * .76, H * .905, W * .2, H * .045, H * .022); g.fill(); g.strokeStyle = '#FFFFFF'; g.stroke();
      txt('PTC', W * .83, H * .918, {c: '#FFFFFF', s: .014, wt: 600, al: 'c'}); txt('ON', W * .83, H * .937, {c: '#FFFFFF', s: .014, wt: 600, al: 'c'});
      g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(W * .925, H * .928, H * .018, 0, 7); g.fill();
    }},
    extra(g, {w, h, d, body, parts, toW}) {
      /* Siyah ön cam ve TETRAGRAPH yazısı */
      put(body, rbox(w * .88, h * .91, .003, .01, M.plastic(0x07090B, .15)), 0, -h * .01, d / 2);
      put(body, nameplate('TETRAGRAPH', w * .5, .009, '#F4F6F7'), 0, -h / 2 + h * .1, d / 2 + .0018);
      const from = toW(0, -h / 2 + .004, -d * .2);
      put(g, cyl(.006, .006, .02, M.plastic(0xC9D0D5)), from.x, from.y + .002, from.z + .01, Math.PI / 2 - .35);
      movePort(parts, from.clone().add(V3(0, .01, .02)));
      nmtHand(g, parts, from.clone().add(V3(0, 0, .02)), .25, .05, Math.PI + .3, {sensor: 'emg', cable: 0xD9DEE2});
    }
  });

  /* TwitchView — koyu, kauçuk kenarlı monitör; üstte gövdeye kalıplı tutamak boşluğu; EMG elektrot dizisi.
     Ekran üretici görselindeki gibi: solda TOFR/TOFC/PTC trend grafiği ve altında uyarı akımı-oynat-sonraki TOF,
     sağda yeşil çerçeveli büyük TOF oranı + dört çubuk, altında EMG yanıt dalgası */
  DEV3D.model('twitchview', {
    type: 'monitor', w: .25, h: .152, d: .045, body: 0x2B2F34, bezel: 0x0E1114, mount: 'feet', led: false, keys: 0,
    screenMargin: [.039, .017, .039, .034], ports: [{side: 'right', n: 1, colors: [0x5B6670]}],
    screen: {bg: '#050607', layout: [
      {t: 'box', x: 0, y: 0, w: 1, h: .085, fill: '#0E1013'},
      {t: 'icon', g: 'menu', x: .012, y: .015, w: .035, h: .055, c: '#E6EEF2'},
      {t: 'icon', g: 'battery', x: .925, y: .015, w: .05, h: .055, c: '#4FD16A'},
      {t: 'box', x: .006, y: .095, w: .75, h: .898, fill: '#14171B'},
      {t: 'text', txt: 'Trend Plot', x: .012, y: .13, w: .14, h: .045, c: '#E6EEF2', s: .038, wt: 500},
      {t: 'box', x: .152, y: .138, w: .108, h: .028, stroke: '#8A949C', lw: .003},
      {t: 'text', txt: '40min/div', x: .152, y: .138, w: .108, h: .028, c: '#C9D0D5', s: .022, wt: 500, al: 'c'},
      {t: 'box', x: .3, y: .128, w: .406, h: .05, fill: '#2A2F35'},
      {t: 'text', txt: '15m', x: .31, y: .128, w: .07, h: .05, c: '#7C878F', s: .024, wt: 500, al: 'c'},
      {t: 'text', txt: '1hr', x: .39, y: .128, w: .07, h: .05, c: '#7C878F', s: .024, wt: 500, al: 'c'},
      {t: 'text', txt: '2hr', x: .47, y: .128, w: .07, h: .05, c: '#7C878F', s: .024, wt: 500, al: 'c'},
      {t: 'box', x: .567, y: .132, w: .062, h: .042, fill: '#1F5FA8'},
      {t: 'text', txt: '4hr', x: .563, y: .128, w: .07, h: .05, c: '#E6EEF2', s: .024, wt: 500, al: 'c'},
      {t: 'text', txt: '8hr', x: .636, y: .128, w: .07, h: .05, c: '#7C878F', s: .024, wt: 500, al: 'c'},
      {t: 'box', x: .714, y: .125, w: .024, h: .055, fill: '#E04A9A'},
      {t: 'text', txt: '+', x: .714, y: .125, w: .024, h: .05, c: '#FFFFFF', s: .04, al: 'c'},
      {t: 'box', x: .078, y: .205, w: .661, h: .027, fill: '#1E9E4A'},
      {t: 'box', x: .078, y: .841, w: .083, h: .049, fill: '#1F5FA8'},
      {t: 'text', txt: '◀◀ -4:00', x: .078, y: .841, w: .083, h: .049, c: '#E6EEF2', s: .022, wt: 500, al: 'c'},
      {t: 'box', x: .656, y: .841, w: .083, h: .049, fill: '#2A2F35'},
      {t: 'text', txt: '0:00 ▶▶', x: .656, y: .841, w: .083, h: .049, c: '#7C878F', s: .022, wt: 500, al: 'c'},
      {t: 'box', x: .247, y: .879, w: .111, h: .072, fill: '#1F5FA8'},
      {t: 'text', txt: '48 mA', x: .247, y: .879, w: .111, h: .072, c: '#E6EEF2', s: .042, wt: 500, al: 'c'},
      {t: 'text', txt: 'STIM Current', x: .247, y: .955, w: .111, h: .03, c: '#8A949C', s: .02, wt: 500, al: 'c'},
      {t: 'box', x: .464, y: .879, w: .111, h: .072, fill: '#1F5FA8'},
      {t: 'text', txt: '00:20', x: .464, y: .879, w: .111, h: .072, c: '#E6EEF2', s: .042, wt: 500, al: 'c'},
      {t: 'text', txt: 'Next TOF', x: .464, y: .955, w: .111, h: .03, c: '#8A949C', s: .02, wt: 500, al: 'c'},
      {t: 'box', x: .766, y: .106, w: .22, h: .53, fill: '#0B0D10', stroke: '#2FB24A', lw: .006},
      {t: 'text', txt: 'TOF Ratio', x: .766, y: .145, w: .22, h: .055, c: '#E6EEF2', s: .042, wt: 500, al: 'c'},
      {t: 'text', txt: '94%', x: .766, y: .21, w: .22, h: .12, c: '#FFFFFF', s: .14, wt: 800, al: 'c'},
      {t: 'box', x: .766, y: .662, w: .22, h: .331, fill: '#0B0D10'},
      {t: 'text', txt: '⋀ 18mV', x: .766, y: .672, w: .21, h: .04, c: '#C9D0D5', s: .024, wt: 500, al: 'r'},
      {t: 'text', txt: 'EMG 1', x: .766, y: .94, w: .21, h: .04, c: '#8A949C', s: .022, wt: 500, al: 'r'},
      {t: 'icon', g: 'arrow', x: .776, y: .93, w: .026, h: .045, c: '#2F7DD1'}
    ], draw(g, t, {txt, W, H}) {
      /* Şimşek (şarj) simgesi */
      g.fillStyle = '#E6EEF2'; g.beginPath(); g.moveTo(W * .905, H * .02); g.lineTo(W * .893, H * .048); g.lineTo(W * .902, H * .048); g.lineTo(W * .896, H * .072); g.lineTo(W * .912, H * .04); g.lineTo(W * .903, H * .04); g.closePath(); g.fill();
      /* Trend ızgaraları ve eksenler */
      const x0 = W * .078, x1 = W * .739, panes = [[.2, .5, [100, 80, 60, 40, 20], 'TOFR %'], [.53, .645, [3, 2, 1], 'TOFC'], [.685, .817, [20, 10, 0], 'PTC']];
      g.lineWidth = 1;
      panes.forEach(([y0, y1, ticks, lab]) => {
        g.strokeStyle = '#3A4148';
        for (let k = 0; k <= 6; k++) { const x = x0 + (x1 - x0) * k / 6; g.beginPath(); g.moveTo(x, H * y0); g.lineTo(x, H * y1); g.stroke(); }
        ticks.forEach((v, k) => { const y = H * (y0 + (y1 - y0) * (lab === 'TOFR %' ? (100 - v) / 100 : k / (ticks.length - 1))); g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke(); txt(v, x0 - W * .006, y, {c: '#8A949C', s: .021, wt: 500, al: 'r'}); });
        g.save(); g.translate(W * .022, H * (y0 + y1) / 2); g.rotate(-Math.PI / 2); txt(lab, 0, 0, {c: '#8A949C', s: .026, wt: 500, al: 'c'}); g.restore();
      });
      /* TOFR noktaları: 40'ta düz, geri döndürme sonrası 95'e yükselir */
      const yv = v => H * (.2 + .3 * (100 - v) / 100);
      for (let k = 0; k <= 70; k++) {
        const u = k / 70, v = u < .5 ? 40 : u < .82 ? 40 + 55 * (1 - Math.cos((u - .5) / .32 * Math.PI)) / 2 : 95;
        g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(x0 + (x1 - x0) * u, yv(v), H * .007, 0, 7); g.fill();
      }
      g.strokeStyle = '#E8A33A'; g.lineWidth = H * .005; g.beginPath(); g.arc(x0 + (x1 - x0) * .5, yv(40), H * .011, 0, 7); g.stroke();
      txt('REVERSAL DOSE', x0 + (x1 - x0) * .16, H * .46, {c: '#E8A33A', s: .03, wt: 800});
      /* Oynat düğmesi */
      g.fillStyle = '#1F5FA8'; g.beginPath(); g.arc(W * .409, H * .916, H * .066, 0, 7); g.fill();
      g.fillStyle = '#FFFFFF'; g.beginPath(); g.moveTo(W * .401, H * .885); g.lineTo(W * .425, H * .916); g.lineTo(W * .401, H * .947); g.fill();
      /* TOF çubukları */
      ['#FF3B1F', '#FF9800', '#F5AE5B', '#F9C98F'].forEach((c, k) => { const hh = H * .25 * [1, .985, .965, .94][k]; g.fillStyle = c; g.fillRect(W * (.807 + k * .037), H * .6 - hh, W * .028, hh); });
      g.strokeStyle = '#3A4148'; g.lineWidth = 1; g.beginPath(); g.moveTo(W * .795, H * .603); g.lineTo(W * .96, H * .603); g.stroke();
      /* EMG yanıtı (iki fazlı) */
      g.setLineDash([3, 3]); g.strokeStyle = '#8A949C'; g.beginPath(); g.moveTo(W * .776, H * .72); g.lineTo(W * .976, H * .72); g.stroke(); g.setLineDash([]);
      g.strokeStyle = '#3A4148'; g.beginPath(); g.moveTo(W * .776, H * .868); g.lineTo(W * .976, H * .868); g.stroke();
      [['#B8862A', .006], ['#F2B33A', 0]].forEach(([c, off]) => {
        g.strokeStyle = c; g.lineWidth = H * .006; g.beginPath();
        for (let k = 0; k <= 60; k++) { const u = k / 60, y = H * (.868 + off) - H * .13 * Math.exp(-Math.pow((u - .3) / .08, 2)) + H * .07 * Math.exp(-Math.pow((u - .52) / .1, 2)); k ? g.lineTo(W * (.776 + .2 * u), y) : g.moveTo(W * .776, y); }
        g.stroke();
      });
    }},
    extra(g, {body, w, h, d, elev, parts}) {
      /* Tutamak çerçevesi (açıklıklı) */
      const mat = M.plastic(0x2B2F34), hh = .07;
      put(body, rbox(w, .03, d, .014, mat), 0, h / 2 + hh - .015, 0);
      [-1, 1].forEach(s => put(body, rbox(.06, hh, d, .012, mat), s * (w / 2 - .03), h / 2 + hh / 2 - .005, 0));
      put(body, rbox(w * .98, .012, d * 1.04, .005, M.rubber(0x1C1F23)), 0, -h / 2 + .004, 0);
      const pw = cyl(.009, .009, .004, M.color(0x2F86D1, .35), 24); pw.rotation.x = Math.PI / 2; put(body, pw, -w / 2 + .016, h / 2 - .014, d / 2 + .002);
      const lp = nameplate('TwitchView', .07, .012, '#E6EEF2'); put(body, lp, .005, -h / 2 + .019, d / 2 + .002);
      parts.push({key: 'b-handle', at: V3(0, elev + h + hh, 0)});
      const from = V3(w / 2 + .008, elev + h / 2, d * .1);
      nmtHand(g, parts, from, w / 2 + .23, .07, Math.PI + .3, {sensor: 'emg', sensorColor: 0xE8EDF0});
    }
  });

  /* TOFscan — yatay küçük monitör: gümüş çerçeve, siyah cam ön yüz, açık temalı ekran, altta yeşil durum ışığı; başparmak ivmeölçeri.
     Ekran üretici görselindeki gibi: lila zemin, ortada beyaz panel (güvenilirlik göstergesi, solda Tr%/Tc/PTC sütunu,
     büyük mavi T4/T1 % değeri ve dört yanıt çubuğu, yeşil durum bandı), köşelerde dokunmatik düğmeler, sağda mavi TOF düğmesi */
  DEV3D.model('tofscan', {
    type: 'monitor', w: .16, h: .123, d: .032, body: 0xD3D8DB, bezel: 0x15181B, mount: 'feet', led: false, keys: 0,
    screenMargin: [.0155, .0175, .0158, .0274], ports: [{side: 'left', n: 1, colors: [0x5B6670]}],
    screen: {bg: '#E9EAF3', layout: [
      {t: 'box', x: 0, y: 0, w: .112, h: .19, fill: '#FFFFFF', r: .03},
      {t: 'text', txt: 'TOF  ⧗00:00:15', x: .3, y: .02, w: .4, h: .1, c: '#1F3A5F', s: .065, wt: 500, al: 'c'},
      {t: 'box', x: .894, y: .028, w: .1, h: .162, fill: '#FFFFFF', r: .03},
      {t: 'box', x: .135, y: .132, w: .736, h: .847, fill: '#FFFFFF', r: .03},
      {t: 'box', x: .37, y: .134, w: .47, h: .116, fill: '#FFFFFF', stroke: '#DADCE6', lw: .006, r: .025},
      {t: 'text', txt: 'Reliability', x: .395, y: .134, w: .17, h: .116, c: '#1F3A5F', s: .05, wt: 500},
      {t: 'box', x: .575, y: .175, w: .055, h: .032, fill: '#7CB82F', r: .016},
      {t: 'box', x: .645, y: .175, w: .055, h: .032, fill: '#7CB82F', r: .016},
      {t: 'box', x: .715, y: .175, w: .055, h: .032, fill: '#7CB82F', r: .016},
      {t: 'box', x: .172, y: .19, w: .133, h: .74, fill: '#FFFFFF', stroke: '#4A8FE0', lw: .005, r: .03},
      {t: 'text', txt: '100%', x: .172, y: .225, w: .133, h: .05, c: '#1F3A5F', s: .036, wt: 500, al: 'c'},
      {t: 'box', x: .205, y: .315, w: .07, h: .05, fill: '#7CB82F', r: .012},
      {t: 'box', x: .205, y: .36, w: .07, h: .225, fill: '#B9DDF5'},
      {t: 'text', txt: 'Tr%', x: .205, y: .45, w: .07, h: .06, c: '#7C8A99', s: .034, wt: 500, al: 'c'},
      {t: 'box', x: .205, y: .6, w: .07, h: .106, fill: '#7FAFD9'},
      {t: 'text', txt: 'Tc', x: .205, y: .6, w: .07, h: .106, c: '#FFFFFF', s: .036, wt: 600, al: 'c'},
      {t: 'box', x: .205, y: .72, w: .07, h: .11, fill: '#6E8597', r: .012},
      {t: 'text', txt: 'PTC', x: .205, y: .72, w: .07, h: .11, c: '#FFFFFF', s: .034, wt: 600, al: 'c'},
      {t: 'text', txt: '0/10', x: .172, y: .845, w: .133, h: .055, c: '#1F3A5F', s: .04, wt: 500, al: 'c'},
      {t: 'box', x: .039, y: .664, w: .096, h: .155, fill: '#FFFFFF', r: .02},
      {t: 'text', txt: 'Ξ%', x: .039, y: .664, w: .096, h: .155, c: '#2F86E0', s: .075, wt: 500, al: 'c'},
      {t: 'box', x: .041, y: .83, w: .094, h: .149, fill: '#FFFFFF', r: .02},
      {t: 'text', txt: 'T4/T1', x: .5, y: .26, w: .18, h: .06, c: '#7C8A99', s: .036, wt: 500, al: 'c'},
      {t: 'text', txt: '90', x: .42, y: .34, w: .22, h: .28, c: '#1E7BE0', s: .25, wt: 500, al: 'c'},
      {t: 'text', txt: '%', x: .63, y: .44, w: .1, h: .16, c: '#1E7BE0', s: .11, wt: 700, al: 'c'},
      {t: 'box', x: .346, y: .847, w: .487, h: .104, fill: '#7CB82F', r: .015},
      {t: 'text', txt: 'Recovered', x: .346, y: .847, w: .487, h: .104, c: '#FFFFFF', s: .055, wt: 500, al: 'c'},
      {t: 'box', x: .888, y: .698, w: .108, h: .281, fill: '#2F86E8', stroke: '#9CC8F5', lw: .006, r: .03},
      {t: 'text', txt: 'TOF', x: .888, y: .86, w: .108, h: .09, c: '#FFFFFF', s: .06, wt: 500, al: 'c'}
    ], draw(g, t, {W, H}) {
      g.lineWidth = H * .008; g.strokeStyle = '#2F86E0';
      /* Bilgi balonu */
      g.beginPath(); g.arc(W * .056, H * .09, H * .055, Math.PI * .7, Math.PI * 2.55); g.lineTo(W * .03, H * .16); g.closePath(); g.stroke();
      g.fillStyle = '#2F86E0'; g.fillRect(W * .0535, H * .075, W * .005, H * .05); g.beginPath(); g.arc(W * .056, H * .058, H * .007, 0, 7); g.fill();
      /* Sensör simgesi */
      g.strokeRect(W * .932, H * .065, W * .024, H * .085); [[.905, .925], [.963, .983]].forEach(([a, b]) => { g.strokeRect(W * a, H * .095, W * (b - a), H * .025); });
      /* Trend simgesi */
      g.beginPath(); g.moveTo(W * .06, H * .935); g.lineTo(W * .078, H * .9); g.lineTo(W * .092, H * .925); g.lineTo(W * .115, H * .875); g.stroke();
      /* Kaydırıcı düğmesi */
      g.fillStyle = '#1E7BE0'; g.beginPath(); g.arc(W * .24, H * .323, H * .042, 0, 7); g.fill(); g.strokeStyle = '#FFFFFF'; g.lineWidth = H * .006; g.stroke();
      /* Dört yanıt çubuğu (yuvarlak uçlu) */
      g.lineCap = 'round'; g.lineWidth = W * .02; [0, 0, .02, .03].forEach((dy, k) => { const x = W * (.538 + k * .036); g.strokeStyle = '#D5DCE4'; g.beginPath(); g.moveTo(x, H * .665); g.lineTo(x, H * (.665 + dy + .01)); g.stroke(); g.strokeStyle = '#1E7BE0'; g.beginPath(); g.moveTo(x, H * (.675 + dy)); g.lineTo(x, H * .805); g.stroke(); }); g.lineCap = 'butt';
      /* TOF düğmesindeki oynat oku */
      g.strokeStyle = '#FFFFFF'; g.lineWidth = H * .007; g.beginPath(); g.moveTo(W * .928, H * .735); g.lineTo(W * .962, H * .78); g.lineTo(W * .928, H * .825); g.closePath(); g.stroke();
    }},
    extra(g, {body, w, h, d, elev, parts}) {
      put(body, rbox(w - .008, h - .008, .004, .012, M.plastic(0x16191C, .2)), 0, 0, d / 2);
      put(body, box(.04, .006, .003, M.led(0x55E07A)), 0, -h / 2 + .006, d / 2 + .002);
      put(body, nameplate('TOFscan', .04, .009, '#B9C0C5'), w / 2 - .035, -h / 2 + .014, d / 2 + .0025);
      put(body, nameplate('idmed', .03, .008, '#4FAF4A'), -w / 2 + .03, -h / 2 + .007, d / 2 + .0025);
      parts.push({key: 'led', at: V3(0, elev + .006, d / 2 + .01)});
      nmtHand(g, parts, V3(-w / 2 - .006, elev + h / 2, d * .1), -w / 2 - .2, .06, -.3, {sensor: 'accel', sensorColor: 0x6B7C8A});
    }
  });

  /* STIMPOD NMS450X — beyaz, alt kısmı genişleyen el cihazı; üstte monokrom LCD, gri tuş paneli ve oynat/duraklat düğmesi.
     LCD üretici görselindeki gibi: açık mavi zemin, koyu yazı; solda uyarı akımı ve dört TOF çubuğu, sağda süre ve TOF %,
     altta ters renkli mod sekmeleri */
  DEV3D.model('stimpod-nms450x', {
    type: 'handheld', w: .098, h: .178, d: .04, body: 0xF2F4F5, screenFrac: .27, keys: 0,
    screen: {bg: '#A4D6F4', layout: [
      {t: 'text', txt: '40mA', x: .1, y: .14, w: .36, h: .2, c: '#0E1E3A', s: .2, wt: 800},
      {t: 'box', x: .63, y: .07, w: .11, h: .1, fill: '#0E1E3A'},
      {t: 'text', txt: 'NMT', x: .63, y: .07, w: .11, h: .1, c: '#A4D6F4', s: .075, wt: 800, al: 'c'},
      {t: 'icon', g: 'battery', x: .86, y: .06, w: .11, h: .12, c: '#0E1E3A'},
      {t: 'text', txt: '~39.99mA', x: .62, y: .23, w: .36, h: .12, c: '#0E1E3A', s: .11, wt: 700, al: 'r', mono: true},
      {t: 'box', x: .012, y: .38, w: .968, h: .47, stroke: '#0E1E3A', lw: .012},
      {t: 'box', x: .62, y: .38, w: .006, h: .47, fill: '#0E1E3A'},
      {t: 'box', x: .626, y: .52, w: .354, h: .008, fill: '#0E1E3A'},
      {t: 'text', txt: '00:47', x: .7, y: .39, w: .27, h: .13, c: '#0E1E3A', s: .11, wt: 700, al: 'r', mono: true},
      {t: 'box', x: .626, y: .528, w: .035, h: .322, fill: '#0E1E3A'},
      {t: 'box', x: .945, y: .528, w: .035, h: .322, fill: '#0E1E3A'},
      {t: 'text', txt: '55%', x: .665, y: .57, w: .28, h: .24, c: '#0E1E3A', s: .18, wt: 800, al: 'c'},
      {t: 'box', x: .15, y: .88, w: .28, h: .11, fill: '#0E1E3A'},
      {t: 'text', txt: 'Auto', x: .15, y: .88, w: .28, h: .11, c: '#A4D6F4', s: .085, wt: 700, al: 'c'},
      {t: 'box', x: .45, y: .88, w: .35, h: .11, fill: '#0E1E3A'},
      {t: 'text', txt: 'Minimal', x: .45, y: .88, w: .35, h: .11, c: '#A4D6F4', s: .085, wt: 700, al: 'c'}
    ], draw(g, t, {txt, W, H}) {
      const INK = '#0E1E3A';
      /* Hoparlör simgesi */
      g.fillStyle = INK; g.fillRect(W * .755, H * .1, W * .015, H * .045); g.beginPath(); g.moveTo(W * .768, H * .1); g.lineTo(W * .785, H * .075); g.lineTo(W * .785, H * .17); g.lineTo(W * .768, H * .145); g.fill();
      /* TOF çubukları ve noktalı taban çizgisi */
      const shown = Math.floor(t * 1.5) % 10;
      [.44, .55, .58, .6].forEach((top, k) => { if (k <= shown) { g.fillStyle = INK; g.fillRect(W * (.063 + k * .148), H * top, W * .08, H * (.76 - top)); } });
      for (let x = .03; x < .6; x += .02) g.fillRect(W * x, H * .765, W * .008, H * .012);
      /* Saat simgesi */
      g.strokeStyle = INK; g.lineWidth = H * .012; g.beginPath(); g.arc(W * .67, H * .45, H * .045, 0, 7); g.stroke(); g.beginPath(); g.moveTo(W * .67, H * .425); g.lineTo(W * .67, H * .45); g.lineTo(W * .69, H * .45); g.stroke();
      /* Dikey EMG / TOF etiketleri */
      ['E', 'M', 'G'].forEach((c, k) => txt(c, W * .6435, H * (.6 + k * .09), {c: '#A4D6F4', s: .07, wt: 800, al: 'c'}));
      ['T', 'O', 'F'].forEach((c, k) => txt(c, W * .9625, H * (.6 + k * .09), {c: '#A4D6F4', s: .07, wt: 800, al: 'c'}));
    }},
    extra(g, {body, w, h, d, parts, toW}) {
      put(body, rbox(w * 1.18, h * .5, d * .95, .03, M.plastic(0xF2F4F5)), 0, -h * .25, -.002);
      put(body, rbox(w * .95, h * .34, .006, .02, M.plastic(0xB9C1C8)), 0, -h * .08, d / 2);
      const ring = cyl(.024, .024, .006, M.plastic(0xE9EEF1), 32); ring.rotation.x = Math.PI / 2; put(body, ring, 0, -h * .1, d / 2 + .004);
      const play = cyl(.011, .011, .008, M.color(0x2F5EA8, .35), 24); play.rotation.x = Math.PI / 2; put(body, play, 0, -h * .1, d / 2 + .006);
      [-1, 1].forEach(s => { const k = cyl(.009, .009, .006, M.color(0x2F5EA8, .35), 20); k.rotation.x = Math.PI / 2; put(body, k, s * w * .36, h * .02, d / 2 + .004); });
      put(body, box(.014, .004, .003, M.led(0x9BE25A)), 0, h * .03, d / 2 + .004);
      const pw = cyl(.012, .012, .006, M.plastic(0xF4F6F7), 24); pw.rotation.x = Math.PI / 2; put(body, pw, 0, -h * .38, d / 2 + .004);
      put(body, nameplate('STIMPOD', .05, .009, '#9AA4AB'), .005, h * .1, d / 2 + .0015);
      parts.push({key: 'keypad', at: toW(0, -h * .1, d / 2 + .015)});
      nmtHand(g, parts, toW(0, h / 2, 0), .26, .05, Math.PI + .3, {sensor: 'accel', sensorColor: 0x2F5E73});
    }
  });

  /* ---------- Modül rafı + temsili ana monitör ----------
     cfg: {label, slots, index, modW, modH, modD, body, connector, screen, hand:{sensor, clip}, sideX} */
  T('b-host', {tr: ['Ana monitör (temsili)', 'Modülün ölçtüğü değerler bağlı hasta monitörünün ekranında gösterilir; monitör modeli kuruma göre değişir.'], en: ['Host monitor (schematic)', 'Values measured by the module are shown on the connected patient monitor; the monitor model varies by site.'], es: ['Monitor principal (esquemático)', 'Los valores medidos por el módulo se muestran en el monitor de paciente conectado; el modelo de monitor varía según el centro.']});
  DEV3D.register('b-modrack', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const slots = cfg.slots || 3, idx = cfg.index ?? 1, mw = cfg.modW || .037, mh = cfg.modH || .115, md = cfg.modD || .17;
    const fw = slots * mw + .016, y0 = .012, rx = cfg.sideX ?? .2;
    /* Raf */
    put(g, rbox(fw, mh + .02, md + .01, .005, M.matte(0x4A535B)), rx, y0 + (mh + .02) / 2, -.005);
    let cx = 0;
    for (let k = 0; k < slots; k++) {
      const x = rx - fw / 2 + .008 + mw * (k + .5), main = k === idx;
      put(g, rbox(mw - .002, mh, md, .004, M.plastic(main ? (cfg.body || 0xE4E7EA) : 0xC3C9CE)), x, y0 + .01 + mh / 2, .002);
      put(g, box(mw * .55, .005, .003, M.matte(0x8A949C)), x, y0 + .01 + mh - .008, md / 2 + .003);
      if (main) cx = x;
    }
    const fz = md / 2 + .003, cy = y0 + .01 + mh * .3;
    const con = cyl(.009, .009, .012, M.color(cfg.connector || 0x7B3FA0, .4), 24); con.rotation.x = Math.PI / 2; put(g, con, cx, cy, fz + .004);
    const lab = nameplate(cfg.label || '', mh * .5, .011, '#2B3238'); lab.rotation.z = Math.PI / 2; put(g, lab, cx, y0 + .01 + mh * .66, fz);
    put(g, box(.008, .004, .002, M.led(0x2E9E58)), cx, y0 + .01 + mh * .92, fz);
    parts.push({key: 'module', at: V3(cx, y0 + mh * .7, fz + .01)}, {key: 'port', at: V3(cx, cy, fz + .02)}, {key: 'mount', at: V3(rx + fw * .3, y0 + mh + .02, -md * .3)});
    /* Temsili ana monitör (markasız) */
    const mw2 = .3, mh2 = .21, hx = rx - fw / 2 - .03 - mw2 / 2, hy = .03 + mh2 / 2;
    put(g, rbox(mw2, mh2, .06, .012, M.plastic(0x4F5860)), hx, hy, -.06);
    put(g, box(.12, .03, .08, M.matte(0x3A4148)), hx, .015, -.07);
    const scr = makeScreen(mw2 - .03, mh2 - .03, cfg.screen || {title: cfg.label}); put(g, scr.mesh, hx, hy, -.0295); screens.push(scr);
    parts.push({key: 'b-host', at: V3(hx, hy + mh2 * .3, -.02)});
    /* Kablo ve el */
    const r = hand(g, rx + .27, .12, Math.PI + .3, cfg.hand || {sensor: 'emg2'});
    cableTo(g, V3(cx, cy, fz + .01), r.lead, cfg.cable || 0xE9EEF1, .0028);
    parts.push({key: 'b-stim', at: r.stim}, {key: 'b-hand', at: r.hand});
    if (r.sensor) parts.push({key: r.sensorKey, at: r.sensor});
    return {group: g, parts, screens};
  });

  /* GE CARESCAPE NMT — E-modül yuvasında NMT modülü; mor klipsli EMG kablosu (görsele göre), değerler ana monitörde */
  DEV3D.model('ge-carescape-nmt', {
    type: 'b-modrack', label: 'NMT', connector: 0x7B3FA0, theta: .35,
    hand: {sensor: 'emg2', clip: 0x7B3FA0},
    screen: {title: 'NMT', accent: '#B98AE8', waves: [{k: 'ecg', c: '#5BE07A', l: 'II'}], extra: 'tof', params: [{l: 'TOF%', v: 92, u: '%', c: '#B98AE8', big: true, live: true}, {l: 'Count', v: 4, c: '#E6EEF2'}, {l: 'HR', v: 68, u: '/min', c: '#5BE07A'}]}
  });

  /* ---------- Masimo ortak ekran (Root / Radical-7 / Rad-97 / Rad-67) ----------
     Üretici görsellerine göre tek bir arayüz: üstte durum çubuğu (alarm/ses düğmeleri, ADULT, simgeler, saat), "rainbow"
     yazılı pletismografi şeridi, altta trend zaman çubuğu ve filtre/ayar simgeleri. Orta alan kipleri:
       gauge  Root portre görünümü: yay göstergeli büyük ana parametre + iki küçük yay göstergesi + alt satırda iki değer
       grid   Radical-7 parametre ızgarası: büyük rakamlar, yanında alarm sınırları ve etiket; altında dalga
       row    Rad-97 yatay görünümü: solda düğme sütunu, üç büyük değer yan yana
       body   Radical-7 el ünitesi yuvadayken: insan silueti (beyin, yeşil akciğerler)
     spec: {mode, main:p, gauges:[p,p], row:[p,p], grid:[p×6], wave:'pleth'|'acoustic'}; p = mp(...) (+ f: 0–1 gösterge konumu) */
  const MZ = {red: '#D23A2E', yel: '#E8B83A', wht: '#E9EEF1', gry: '#33393E', navy: '#0B1830', blue: '#2F7FD8', dim: '#8A949C'};
  const MLIM = {SpO2: ['--', '88', 'lo'], PR: ['140', '50', 'sym'], Pi: ['--', '0.3', 'lo'], SpHb: ['17.0', '7.0', 'sym'], SpCO: ['10', '--', 'hi'], SpMet: ['3.0', '--', 'hi'], PVi: ['--', '--', 'none'], ORi: ['--', '--', 'none'], RRa: ['30', '6', 'sym'], PSi: ['--', '--', 'none'], rSO2: ['--', '50', 'lo']};
  function mzStatus(g, {txt, rr, GL, H}, x0, x1, yc, hh) {
    const L = x1 - x0;
    g.fillStyle = MZ.blue; rr(x0 + L * .4, yc - hh * .28, L * .12, hh * .56, hh * .28); g.fill();
    txt('ADULT', x0 + L * .46, yc, {c: '#FFFFFF', s: hh * .3 / H, wt: 700, al: 'c'});
    GL.bt(x0 + L * .56, yc, hh * .26, '#5C8FD8'); GL.wifi(x0 + L * .62, yc, hh * .3, '#4FD16A');
    g.fillStyle = '#4FD16A'; [0, 1, 2].forEach(k => g.fillRect(x0 + L * (.66 + k * .015), yc - hh * .1 - k * hh * .06, L * .01, hh * .2 + k * hh * .06));
    GL.battery(x0 + L * .76, yc, hh * .24, '#C8D650');
    txt('7:30 PM', x1 - L * .01, yc, {c: MZ.wht, s: hh * .32 / H, wt: 500, al: 'r'});
  }
  function mzButtons(g, {rr, GL}, x, y, sz, vertical) {
    g.fillStyle = '#3A4045'; rr(x, y, sz, sz, sz * .12); g.fill(); GL.bell(x + sz / 2, y + sz / 2, sz * .3, '#9AA4AB');
    const x2 = vertical ? x : x + sz * 1.2, y2 = vertical ? y + sz * 1.3 : y;
    g.fillStyle = '#F2F4F5'; rr(x2, y2, sz, sz, sz * .12); g.fill();
    g.fillStyle = '#1B2328'; const cx = x2 + sz * .42, cy = y2 + sz / 2;
    g.fillRect(cx - sz * .2, cy - sz * .1, sz * .12, sz * .2); g.beginPath(); g.moveTo(cx - sz * .08, cy - sz * .1); g.lineTo(cx + sz * .08, cy - sz * .25); g.lineTo(cx + sz * .08, cy + sz * .25); g.lineTo(cx - sz * .08, cy + sz * .1); g.fill();
    g.strokeStyle = '#1B2328'; g.lineWidth = sz * .06; g.beginPath(); g.arc(cx + sz * .1, cy, sz * .2, -.8, .8); g.stroke();
  }
  function mzRainbow(g, {txt, F}, x, y, s) {
    const cols = ['#E5412F', '#F28C28', '#F2E031', '#4FD16A', '#3FA9F5', '#6C7CF0', '#B36CF0'];
    'rainbow'.split('').forEach((ch, k) => { txt(ch, x, y, {c: cols[k], s, wt: 600}); g.font = F(600, s); x += g.measureText(ch).width * 1.5; });
  }
  /* Dalga şeridi: lacivert zemin; acoustic → mavi akustik sinyal + beyaz pletismografi */
  function mzWave(g, api, x, y, w, h, kind, t, strip = true) {
    const {txt, W, H, WAVE} = api;
    if (strip) { g.fillStyle = MZ.navy; g.fillRect(x, y, w, h); g.fillStyle = '#13233F'; g.fillRect(x, y, w * .43, h); g.fillStyle = '#5C7FA8'; g.fillRect(x + w * .43, y, Math.max(1, w * .003), h); }
    if (kind === 'acoustic') {
      g.strokeStyle = '#2FA8E8'; g.lineWidth = Math.max(1, H * .002); g.beginPath();
      for (let k = 0; k <= w; k += 1.5) { const u = k / w * 5 + t * .6, env = .35 + .3 * Math.abs(Math.sin(u * 1.3)), n = Math.sin(u * 97) * .6 + Math.sin(u * 211 + 1) * .4; const yy = y + h * .5 - n * env * h * .45; k ? g.lineTo(x + k, yy) : g.moveTo(x + k, yy); }
      g.stroke();
    }
    g.strokeStyle = kind === 'acoustic' ? '#FFFFFF' : strip ? '#BFD4F2' : '#FFFFFF'; g.lineWidth = Math.max(1.5, H * (strip ? .003 : .004)); g.beginPath();
    for (let k = 0; k <= w; k += 2) { const u = k / w * (strip ? 7 : 8) + t * .9, yy = y + h * .82 - WAVE.pleth(u) * h * .64; k ? g.lineTo(x + k, yy) : g.moveTo(x + k, yy); }
    g.stroke();
  }
  /* Bölümlü yay göstergesi (Masimo): düşük/yüksek alarm bölgeleri kırmızı-sarı, değere kadar beyaz, sonrası gri; turuncu ibre */
  function mzGauge(g, cx, cy, R, lw, f, mode, N) {
    const a0 = Math.PI * .86, a1 = Math.PI * 2.14, gap = .045;
    g.lineWidth = lw; g.lineCap = 'butt';
    for (let i = 0; i < N; i++) {
      const u = (i + .5) / N; let c = MZ.wht;
      if (mode === 'sym' || mode === 'lo') { if (u < .1) c = MZ.red; else if (u < .24) c = MZ.yel; }
      if (mode === 'sym' || mode === 'hi') { if (u > .9) c = MZ.red; else if (u > .76) c = MZ.yel; }
      if (mode !== 'sym' && u > f && !(mode === 'hi' && u > .76)) c = MZ.gry;
      const s0 = a0 + (a1 - a0) * i / N + gap / 2, s1 = a0 + (a1 - a0) * (i + 1) / N - gap / 2;
      g.strokeStyle = c; g.beginPath(); g.arc(cx, cy, R, s0, s1); g.stroke();
    }
    const an = a0 + (a1 - a0) * f, ca = Math.cos(an), sa = Math.sin(an), px = -sa, py = ca;
    g.fillStyle = '#F28C28'; g.beginPath();
    g.moveTo(cx + ca * (R - lw * .6) + px * lw * .22, cy + sa * (R - lw * .6) + py * lw * .22); g.lineTo(cx + ca * (R + lw * 1.9), cy + sa * (R + lw * 1.9));
    g.lineTo(cx + ca * (R - lw * .6) - px * lw * .22, cy + sa * (R - lw * .6) - py * lw * .22); g.fill();
  }
  const mzLab = p => `${p.l}${p.u ? ' ' + p.u : ''}`;
  const mzLim = p => MLIM[p.k] || ['--', '--', 'none'];
  /* Büyük rakam + sağında üst/alt alarm sınırı + etiket (Radical-7 ızgarası ve Rad-97 satırı) */
  function mzBig(g, {txt, F, H}, x, y, p, s, labelBelow) {
    g.font = F(400, s); const tw = g.measureText(String(p.v)).width, [hi, lo] = mzLim(p), c = p.c || '#FFF';
    txt(p.v, x, y, {c, s, wt: 400});
    const lx = x + tw + H * s * .08;
    txt(hi, lx, y - H * s * .3, {c, s: s * .2, wt: 600}); txt(lo, lx, y - H * s * .05, {c, s: s * .2, wt: 600});
    if (labelBelow) txt(mzLab(p), x + tw * .55, y + H * s * .45, {c, s: s * .2, wt: 600, al: 'c'});
    else txt(p.k === 'SpO2' || p.k === 'SpMet' || p.k === 'SpCO' ? `%${p.l}` : mzLab(p), lx, y + H * s * .22, {c, s: s * .22, wt: 600});
  }
  function mzFooter(g, api, x0, x1, y) {
    const {txt, GL, W, H} = api;
    g.fillStyle = '#16191C'; g.fillRect(x0, y, x1 - x0, H * .026);
    ['06:30', '06:45', '07:00', '07:15'].forEach((s, k) => txt(s, x0 + (x1 - x0) * (.2 + k * .17), y + H * .013, {c: '#5B6670', s: .012, wt: 500, al: 'c'}));
    g.fillStyle = '#9AA4AB'; g.beginPath(); const fx = x0 + W * .025, fy = y + H * .045; g.moveTo(fx - W * .018, fy - H * .01); g.lineTo(fx + W * .018, fy - H * .01); g.lineTo(fx + W * .003, fy + H * .004); g.lineTo(fx + W * .003, fy + H * .012); g.lineTo(fx - W * .003, fy + H * .012); g.lineTo(fx - W * .003, fy + H * .004); g.fill();
    GL.gear(x1 - W * .03, y + H * .045, H * .014, '#C9D0D5');
  }
  function masimoUI(spec) {
    return {bg: '#000000', draw(g, t, api) {
      const {txt, W, H} = api, mode = spec.mode || 'gauge';
      if (mode === 'body') {
        /* El ünitesi: siluet; beyin, yeşil akciğerler, koyu karın organları */
        const gr = g.createRadialGradient(W * .5, H * .4, 0, W * .5, H * .4, H * .6); gr.addColorStop(0, '#1A2638'); gr.addColorStop(1, '#05080C'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
        const bg = g.createLinearGradient(0, H * .2, 0, H); bg.addColorStop(0, '#2C3E5C'); bg.addColorStop(1, '#141C2A'); g.fillStyle = bg; g.strokeStyle = 'rgba(120,160,210,.45)'; g.lineWidth = W * .008;
        g.beginPath(); g.moveTo(W * .44, H * .2); g.lineTo(W * .44, H * .245); g.quadraticCurveTo(W * .12, H * .26, W * .08, H * .34); g.lineTo(W * .06, H * .75); g.lineTo(W * .16, H * .75); g.lineTo(W * .2, H * .45);
        g.quadraticCurveTo(W * .25, H * .7, W * .22, H * 1.02); g.lineTo(W * .78, H * 1.02); g.quadraticCurveTo(W * .75, H * .7, W * .8, H * .45); g.lineTo(W * .84, H * .75); g.lineTo(W * .94, H * .75); g.lineTo(W * .92, H * .34); g.quadraticCurveTo(W * .88, H * .26, W * .56, H * .245); g.lineTo(W * .56, H * .2); g.closePath(); g.fill(); g.stroke();
        g.fillStyle = '#5A6470'; g.beginPath(); g.ellipse(W * .5, H * .115, W * .15, H * .085, 0, 0, 7); g.fill();
        g.strokeStyle = '#B9C0C5'; g.lineWidth = W * .006; for (let k = 0; k < 9; k++) { g.beginPath(); g.arc(W * (.43 + (k % 3) * .07), H * (.08 + Math.floor(k / 3) * .03), W * .035, k, k + 2.4); g.stroke(); }
        g.fillStyle = '#8CD43A'; [[-1, .4], [1, .37]].forEach(([s, rw]) => { g.beginPath(); g.ellipse(W * (.5 + s * .13), H * .43, W * rw * .38, H * .12, s * .12, 0, 7); g.fill(); });
        g.fillStyle = '#6DB02A'; g.beginPath(); g.ellipse(W * .52, H * .47, W * .06, H * .05, 0, 0, 7); g.fill();
        g.strokeStyle = 'rgba(150,160,175,.35)'; g.lineWidth = W * .01; for (let k = 0; k < 7; k++) { g.beginPath(); g.ellipse(W * (.42 + (k % 3) * .08), H * (.68 + Math.floor(k / 3) * .07), W * .07, H * .03, k * .5, 0, 7); g.stroke(); }
        return;
      }
      if (mode === 'row') {
        /* Rad-97: sol düğme sütunu, üstte durum ve dalga şeridi, üç büyük değer */
        g.fillStyle = '#0E1012'; g.fillRect(0, 0, W * .1, H); g.fillStyle = '#2A2F33'; g.fillRect(W * .1, 0, Math.max(1, W * .003), H);
        mzButtons(g, api, W * .018, H * .04, H * .13, true); api.GL.gear(W * .05, H * .93, H * .045, '#C9D0D5');
        mzStatus(g, api, W * .1, W, H * .04, H * .08);
        mzRainbow(g, api, W * .115, H * .105, .028); txt('APOD', W * .88, H * .105, {c: MZ.dim, s: .028, wt: 500, al: 'r'});
        mzWave(g, api, W * .105, H * .135, W * .89, H * .175, spec.wave, t);
        (spec.row || []).forEach((p, k) => mzBig(g, api, W * (.18 + k * .28), H * .54, p, .21, true));
        g.fillStyle = '#2A2F33'; g.fillRect(W * .105, H * .85, W * .89, Math.max(1, H * .005));
        return;
      }
      /* Root portre: üst kısım ortak */
      mzButtons(g, api, W * .012, H * .007, H * .042, false);
      mzStatus(g, api, W * .02, W * .98, H * .03, H * .05);
      mzRainbow(g, api, W * .02, H * .072, .014); txt('APOD', W * .9, H * .072, {c: MZ.dim, s: .013, wt: 500, al: 'r'});
      if (mode === 'grid') {
        /* Radical-7 ızgarası: 3 satır × 2 sütun büyük değer, altında dalga ve zaman çizgisi */
        g.fillStyle = MZ.navy; g.fillRect(W * .01, H * .082, W * .98, H * .006);
        (spec.grid || []).forEach((p, k) => mzBig(g, api, W * (.04 + (k % 2) * .5), H * (.18 + Math.floor(k / 2) * .15), p, .085, false));
        mzWave(g, api, W * .02, H * .58, W * .96, H * .18, spec.wave, t, false);
        g.fillStyle = '#9FC4F0'; g.fillRect(W * .02, H * .78, W * .96, Math.max(1, H * .003)); for (let k = 0; k < 14; k++) g.fillRect(W * (.03 + k * .07), H * .772, Math.max(1, W * .004), H * .008);
      } else {
        mzWave(g, api, W * .01, H * .085, W * .98, H * .08, spec.wave, t);
        const m = spec.main, [hi, lo, md] = mzLim(m);
        mzGauge(g, W * .5, H * .43, W * .29, W * .032, m.f ?? .45, md, 9);
        txt(lo, W * .14, H * .37, {c: MZ.dim, s: .03, wt: 500, al: 'c'}); txt(hi, W * .86, H * .37, {c: MZ.dim, s: .03, wt: 500, al: 'c'});
        txt(m.v, W * .5, H * .43, {c: m.c || '#FFF', s: .125, wt: 400, al: 'c'});
        txt(mzLab(m), W * .5, H * .535, {c: m.c || '#FFF', s: .036, wt: 400, al: 'c'});
        (spec.gauges || []).forEach((p, k) => {
          const cx = W * (k ? .74 : .24), cy = H * .7, R = W * .15, [h2, l2, m2] = mzLim(p);
          mzGauge(g, cx, cy, R, W * .025, p.f ?? .5, m2, 7);
          txt(l2, cx - R * 1.22, cy - H * .035, {c: MZ.dim, s: .017, wt: 500, al: 'c'}); txt(h2, cx + R * 1.28, cy - H * .035, {c: MZ.dim, s: .017, wt: 500, al: 'c'});
          txt(p.v, cx, cy + H * .005, {c: p.c || '#FFF', s: .065, wt: 400, al: 'c'}); txt(p.l, cx, cy + H * .055, {c: p.c || '#FFF', s: .02, wt: 500, al: 'c'});
        });
      }
      g.fillStyle = '#2A2F33'; g.fillRect(W * .02, H * .82, W * .96, Math.max(1, H * .003));
      (spec.row || []).forEach((p, k) => { const x = W * (.3 + k * .3); txt(p.v, x, H * .865, {c: p.c || '#FFF', s: .045, wt: 500, al: 'r'}); txt(p.l, x + W * .01, H * .855, {c: p.c || '#FFF', s: .014, wt: 500}); txt(p.u || '', x + W * .01, H * .873, {c: MZ.dim, s: .012, wt: 500}); });
      mzFooter(g, api, W * .01, W * .99, H * .925);
    }};
  }
  /* rainbow parmak sensörü: el (uyarı elektrotsuz) + işaret parmağı ucunda sensör. Dönüş: {sensor, cableEnd} */
  function fingerSensor(g, x, z, ry) {
    const r = hand(g, x, z, ry, {noStim: true}), hg = g.children[g.children.length - 1];
    const tip = V3(.138, .017, .028);
    put(hg, rbox(.032, .026, .026, .008, M.plastic(0xF2F2F0)), tip.x, tip.y, tip.z);
    put(hg, box(.012, .027, .027, M.color(0xC2272F, .45)), tip.x - .006, tip.y, tip.z);
    hg.updateMatrixWorld(true);
    const end = hg.localToWorld(V3(tip.x - .02, tip.y + .004, tip.z));
    hg.add(tube([V3(tip.x - .016, tip.y + .004, tip.z), V3(tip.x - .05, tip.y + .02, tip.z + .01), V3(tip.x - .1, .03, tip.z + .03)], .0026, M.matte(0xD9DEE2)));
    return {sensor: hg.localToWorld(V3(tip.x, tip.y + .02, tip.z)), cableEnd: hg.localToWorld(V3(tip.x - .1, .03, tip.z + .03)), hand: r.hand, end};
  }
  /* Baş-boyun (manken) ve boynun yan-önüne yapışık akustik sensör */
  function neckSensor(g, x, z, ry = 0) {
    const n = new THREE.Group(); n.position.set(x, 0, z); n.rotation.y = ry; g.add(n);
    const skin = SKIN();
    const ch = cyl(.1, .12, .06, skin, 32); ch.scale.z = .62; put(n, ch, 0, .03, 0);
    put(n, cyl(.047, .052, .11, skin, 28), 0, .115, .005);
    const hd = sphere(.078, skin, 32); hd.scale.set(.86, 1.12, 1); put(n, hd, 0, .245, .0);
    const sx = .028, sy = .12, sz = .042;
    put(n, rbox(.03, .05, .004, .002, M.plastic(0xF4F6F7)), sx, sy, sz, 0, .55, 0);
    const el = cyl(.009, .009, .004, M.color(0x8A949C), 20); el.rotation.x = Math.PI / 2; put(n, el, sx + .002, sy, sz + .003, Math.PI / 2, .55, 0);
    n.updateMatrixWorld(true);
    n.add(tube([V3(sx + .01, sy - .02, sz), V3(sx + .03, sy - .06, sz + .03), V3(sx + .02, .07, .09), V3(0, .07, .12)], .0024, M.matte(0xD9DEE2)));
    return {sensor: n.localToWorld(V3(sx, sy + .02, sz + .01)), cableEnd: n.localToWorld(V3(0, .07, .12)), head: n.localToWorld(V3(0, .3, 0))};
  }

  /* ---------- Radical-7 el ünitesi (Root yuvasında ya da tek başına) ----------
     cfg: {root:bool, rootScreen:spec, handScreen:spec, sensor:'rainbow'|'acoustic'} */
  function radicalUnit(parent, x, y, z, spec) {
    /* Görsele göre dar, uzun el ünitesi: siyah ön cam, üstte açık renk kilit, ekranın altında mavi ışık çubuğu, üç tuş, altta kırmızı sensör girişi */
    const u = new THREE.Group(); u.position.set(x, y, z); parent.add(u);
    const W = .09, Hh = .255, D = .032;
    u.add(rbox(W, Hh, D, .014, M.plastic(0xD3D7DA, .3)));
    put(u, rbox(W * .86, Hh * .82, .004, .012, M.plastic(0x0B0D0F, .2)), 0, -.004, D / 2);
    const scr = makeScreen(.069, .11, masimoUI(spec || {mode: 'body'}), 512); put(u, scr.mesh, 0, .033, D / 2 + .0026);
    put(u, nameplate('Masimo', .022, .006, '#E6EEF2'), .002, .095, D / 2 + .0025);
    put(u, rbox(.034, .02, .012, .004, M.plastic(0xF2F4F5)), 0, Hh / 2 - .012, .004);
    put(u, box(.039, .005, .002, M.led(0x6E8BFF)), 0, -.035, D / 2 + .0025);
    [-.02, 0, .02].forEach((xx, i) => { const k = cyl(.005, .005, .003, M.matte(i === 2 ? 0x8C7A2A : 0x3A4148), 16); k.rotation.x = Math.PI / 2; put(u, k, xx, -.058, D / 2 + .003); });
    put(u, nameplate('Radical-7', .034, .007, '#B9C0C5'), .004, -.073, D / 2 + .0025);
    put(u, rbox(.032, .022, .022, .004, M.color(0xB3232E, .4)), 0, -Hh / 2 + .014, D / 2 + .004);
    u.updateMatrixWorld(true);
    return {scr, port: u.localToWorld(V3(0, -Hh / 2 + .006, D / 2 + .012)), center: u.localToWorld(V3(0, 0, D / 2 + .01)), W, Hh, D};
  }
  DEV3D.register('b-radical', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const RW = .3, RH = .29, RD = .07, elev = .03;
    let unit;
    if (cfg.root !== false) {
      const black = M.plastic(0x0F1113, .18);
      put(g, rbox(RW, RH, RD, .016, black), 0, elev + RH / 2, 0);
      put(g, rbox(RW * .7, elev, RD * 1.5, .006, M.matte(0x2B3035)), 0, elev / 2, -.01);
      put(g, box(RW * .98, .003, RD * .9, M.metal(0xBFC5C9)), 0, elev + .0015, 0);
      const sw = RW * .52, sh = RH * .84, sx = RW / 2 - .018 - sw / 2, sy = elev + RH * .52;
      put(g, rbox(sw + .01, sh + .01, .004, .004, M.plastic(0x050607, .15)), sx, sy, RD / 2);
      const rs = makeScreen(sw, sh, masimoUI(cfg.rootScreen), 768); put(g, rs.mesh, sx, sy, RD / 2 + .0025); screens.push(rs);
      const hb = cyl(.008, .008, .003, M.matte(0x30363B), 20); hb.rotation.x = Math.PI / 2; put(g, hb, sx, elev + .016, RD / 2 + .002);
      put(g, nameplate('Masimo', .05, .01, '#E6EEF2'), RW / 2 - .045, elev + RH - .012, RD / 2 + .0015);
      put(g, nameplate('Root', .025, .008, '#7C878F'), RW / 2 - .03, elev + .02, RD / 2 + .0015);
      put(g, rbox(.11, RH * .94, .01, .012, M.plastic(0x1A1D20, .25)), -RW / 2 + .057, elev + RH / 2, RD / 2 - .002);
      parts.push({key: 'screen', at: V3(sx + sw * .3, sy + sh * .36, RD / 2 + .01)}, {key: 'b-dock', at: V3(-RW / 2 + .055, elev + RH + .006, -.012)}, {key: 'mount', at: V3(0, elev * .5, RD * .7)});
      unit = radicalUnit(g, -RW / 2 + .055, elev + RH / 2, RD / 2 + .012, cfg.handScreen);
      parts.push({key: 'b-handheld', at: unit.center.clone().add(V3(0, -.03, 0))});
    } else {
      put(g, rbox(.14, .02, .09, .006, M.matte(0x2B3035)), 0, .01, -.01);
      unit = radicalUnit(g, 0, .02 + .131, 0, cfg.handScreen || cfg.rootScreen);
      parts.push({key: 'screen', at: unit.center.clone().add(V3(0, .045, 0))});
    }
    screens.push(unit.scr);
    parts.push({key: 'port', at: unit.port.clone().add(V3(0, 0, .01))});
    /* Sensör */
    const sens = cfg.sensor || 'rainbow';
    if (sens === 'acoustic') {
      const n = neckSensor(g, .36, .06, -.5);
      cableTo(g, unit.port, n.cableEnd, 0xD9DEE2, .0028);
      parts.push({key: 'b-acoustic', at: n.sensor});
    } else {
      const f = fingerSensor(g, .36, .17, Math.PI + .25);
      cableTo(g, unit.port, f.cableEnd, 0xD9DEE2, .0028);
      parts.push({key: 'b-rainbow', at: f.sensor});
    }
    return {group: g, parts, screens};
  });

  /* Masimo parametre renkleri (üretici ekran görseline göre) */
  const MC = {SpO2: '#FFFFFF', PR: '#FFFFFF', PVi: '#FFFFFF', SpHb: '#F04545', SpCO: '#F28C28', SpMet: '#F2E031', ORi: '#3FC6E8', Pi: '#FFFFFF', RRa: '#4FB5F0', PSi: '#C9A2F0', rSO2: '#5BE07A'};
  const mp = (l, v, u = '') => ({k: l, l: l === 'SpO2' ? 'SpO₂' : l === 'rSO2' ? 'rSO₂' : l, v, u, c: MC[l]});

  /* Root (masimo-root görseli): SpO₂ yay göstergesi, PR ve Pi küçük göstergeleri, altta RRa ve PVi; el ünitesinde siluet */
  DEV3D.model('masimo-root', {type: 'b-radical', sensor: 'rainbow',
    rootScreen: {mode: 'gauge', main: {...mp('SpO2', 97, '%'), f: .45}, gauges: [{...mp('PR', 74, 'bpm'), f: .5}, {...mp('Pi', '0.6', '%'), f: .2}], row: [mp('RRa', 15, 'rpm'), mp('PVi', 20, '%')]}});
  /* Radical-7 (radical-7 ekran görseli): büyük rakamlı parametre ızgarası ve altında dalga */
  DEV3D.model('radical-7', {type: 'b-radical', sensor: 'rainbow',
    rootScreen: {mode: 'grid', grid: [mp('SpO2', 97, '%'), mp('SpHb', '13.1', 'g/dL'), mp('PR', 74, 'bpm'), mp('PVi', 14), mp('SpMet', '1.0', '%'), mp('SpCO', 2, '%')], row: [mp('ORi', '0.32'), mp('Pi', '2.1', '%')]}});
  /* rainbow parametre kayıtları: aynı Root ekranı; ilgili parametre büyük yay göstergesinde ve kendi renginde */
  const paramRec = (id, key, v, u, f, sensor = 'rainbow') => {
    const main = {...mp(key, v, u), f}, ac = sensor === 'acoustic';
    const gauges = [{...mp(key === 'SpO2' ? 'PR' : 'SpO2', 97, '%'), f: .45}, {...mp('PR', 74, 'bpm'), f: .5}];
    const row = [key === 'Pi' ? mp('PVi', 14, '%') : mp('Pi', '2.1', '%'), key === 'RRa' || key === 'PVi' ? mp('SpHb', '13.1', 'g/dL') : ac ? mp('PVi', 14, '%') : mp('RRa', 15, 'rpm')];
    DEV3D.model(id, {type: 'b-radical', sensor, rootScreen: {mode: 'gauge', main, gauges, row, wave: ac ? 'acoustic' : 'pleth'}});
  };
  paramRec('sphb', 'SpHb', '13.1', 'g/dL', .55);
  paramRec('spco', 'SpCO', '2', '%', .2);
  paramRec('spmet', 'SpMet', '1.0', '%', .3);
  paramRec('ori', 'ORi', '0.32', '', .32);
  paramRec('pvi', 'PVi', '14', '%', .35);
  paramRec('pi', 'Pi', '2.1', '%', .45);
  paramRec('rra', 'RRa', '15', 'rpm', .4, 'acoustic');

  /* ---------- Rad-97 (masaüstü, yatay) ve Rad-67 (el tipi nokta ölçüm) ---------- */
  DEV3D.register('b-rad', cfg => {
    const g = new THREE.Group(), parts = [], screens = [], white = M.plastic(0xF3F4F5, .35), black = M.plastic(0x0B0D0F, .18);
    let port;
    if (cfg.form === 'hand') {
      /* Rad-67: üretici görseli yok — genel el tipi biçim: beyaz gövde, siyah ön panel, dikey ekran */
      const b = new THREE.Group(), W = .075, Hh = .155, D = .032; b.position.set(0, Hh / 2 * Math.cos(.35) + .016, 0); b.rotation.x = -.35; g.add(b);
      b.add(rbox(W, Hh, D, .014, white));
      put(b, rbox(W * .86, Hh * .8, .004, .01, black), 0, .006, D / 2);
      const sc = makeScreen(.056, .085, masimoUI(cfg.screen), 512); put(b, sc.mesh, 0, .022, D / 2 + .0026); screens.push(sc);
      const hb = cyl(.006, .006, .003, M.matte(0x30363B), 20); hb.rotation.x = Math.PI / 2; put(b, hb, 0, -.044, D / 2 + .003);
      put(b, rbox(.026, .016, .016, .004, M.color(0xB3232E, .4)), 0, -Hh / 2 - .004, .0);
      put(g, box(W * .9, .012, .09, M.matte(0x3A4148)), 0, .006, -.02);
      b.updateMatrixWorld(true);
      parts.push({key: 'screen', at: b.localToWorld(V3(0, .03, D / 2 + .01))}, {key: 'keypad', at: b.localToWorld(V3(0, -.044, D / 2 + .01))});
      port = b.localToWorld(V3(0, -Hh / 2 - .01, .01));
    } else {
      /* Rad-97: beyaz yatay gövde, sağda hap biçimli siyah ön panel, solda sensör konektörü */
      const W = .3, Hh = .125, D = .11, y = Hh / 2 + .004;
      put(g, rbox(W, Hh, D, .035, white), 0, y, 0);
      put(g, rbox(.232, .108, .006, .05, black), .03, y, D / 2);
      const sc = makeScreen(.15, .082, masimoUI(cfg.screen), 768); put(g, sc.mesh, .046, y, D / 2 + .0035); screens.push(sc);
      const hb = rbox(.014, .012, .003, .004, M.matte(0x30363B)); put(g, hb, -.062, y, D / 2 + .0035);
      ['#E5412F', '#F28C28', '#F2E031', '#4FD16A', '#3FA9F5', '#B36CF0'].forEach((c, k) => put(g, box(.0016, .0016, .001, M.led(parseInt(c.slice(1), 16))), -.074, y + .012 - k * .004, D / 2 + .0035));
      put(g, rbox(.022, .032, .01, .008, M.matte(0xB9C0C5)), -.105, y + .01, D / 2 + .003);
      put(g, nameplate('Masimo', .03, .007, '#C2272F'), .124, y + .01, D / 2 + .0035).rotation.z = -Math.PI / 2;
      [-1, 1].forEach(sx => put(g, box(.02, .004, D * .8, M.rubber()), sx * W * .36, .002, 0));
      parts.push({key: 'screen', at: V3(.06, y + .02, D / 2 + .01)}, {key: 'keypad', at: V3(-.062, y, D / 2 + .01)});
      port = V3(-.105, y + .01, D / 2 + .01);
    }
    parts.push({key: 'port', at: port.clone().add(V3(0, .01, .005))});
    const f = fingerSensor(g, cfg.form === 'hand' ? .26 : .34, .17, Math.PI + .25);
    cableTo(g, port, f.cableEnd, 0xD9DEE2, .0028);
    parts.push({key: 'b-rainbow', at: f.sensor});
    return {group: g, parts, screens};
  });
  /* Rad-97 (görsele göre): yatay Root arayüzü — solda düğmeler, üstte dalga şeridi, SpO₂ / PR / Pi yan yana */
  DEV3D.model('rad-97', {type: 'b-rad', form: 'desk',
    screen: {mode: 'row', row: [mp('SpO2', 97, '%'), mp('PR', 74, 'bpm'), mp('Pi', '4.0', '%')]}});
  /* Rad-67: üretici ekran görseli yok — aile arayüzüyle genel görünüm (SpHb nokta ölçümü vurgulu) */
  DEV3D.model('rad-67', {type: 'b-rad', form: 'hand',
    screen: {mode: 'gauge', main: {...mp('SpHb', '13.4', 'g/dL'), f: .55}, gauges: [{...mp('SpO2', 98, '%'), f: .45}, {...mp('PR', 72, 'bpm'), f: .5}], row: [mp('Pi', '3.2', '%'), mp('PVi', 12, '%')]}});

  /* rainbow Acoustic: üretici ekran görseli yok — aile arayüzü; RRa yay göstergesinde, akustik + pletismografi dalgası */
  DEV3D.model('rainbow-acoustic', {type: 'b-radical', sensor: 'acoustic',
    rootScreen: {mode: 'gauge', wave: 'acoustic', main: {...mp('RRa', 15, 'rpm'), f: .4}, gauges: [{...mp('SpO2', 97, '%'), f: .45}, {...mp('PR', 74, 'bpm'), f: .5}], row: [mp('Pi', '2.1', '%'), mp('PVi', 14, '%')]}});

  /* ---------- Hava yolu: devre parçası + adaptör (EMMA ana akım, ISA yan akım) ---------- */
  const CLEAR = () => M.plastic(0xDCE8EE, .25);
  function airway(g, y, opts = {}) {
    const r = .0115, parts = [];
    const ad = cyl(r, r, .07, CLEAR(), 28); put(g, ad, 0, y, 0, 0, 0, Math.PI / 2);
    [-1, 1].forEach(s => put(g, cyl(r * 1.15, r * 1.15, .012, M.plastic(0xF2F4F5), 28), s * .041, y, 0, 0, 0, Math.PI / 2));
    if (opts.port) { put(g, cyl(.004, .004, .016, M.plastic(0xF2F4F5), 16), 0, y + r + .006, 0); }
    /* Makine tarafı: körüklü hortum ve Y-parçası ucu */
    g.add(DEV3D.H.corrugated([V3(-.047, y, 0), V3(-.085, y, 0), V3(-.12, Math.max(.012, y * .55), -.015), V3(-.16, .012, -.05)], .011, M.plastic(0x7FAECB, .35)));
    /* Hasta tarafı: kateter bağlantısı ve 15 mm konnektör */
    g.add(DEV3D.H.corrugated([V3(.047, y, 0), V3(.075, y, 0), V3(.1, Math.max(.011, y * .7), .02)], .0095, M.plastic(0xC9D6DD, .3)));
    put(g, cyl(.0085, .0085, .02, M.plastic(0xB8C4CB), 24), .108, Math.max(.01, y * .65), .028, 0, -.65, Math.PI / 2);
    parts.push({key: 'b-adapter', at: V3(.03, y + .012, .012)}, {key: 'b-circuit', at: V3(-.11, y + .01, -.01)});
    return {parts, top: V3(0, y + r + .014, 0)};
  }

  /* EMMA — adaptöre takılan küçük ana akım kapnometre; siyah gövde, yeşil OLED ekran (görsele göre) */
  DEV3D.register('b-emma', cfg => {
    const g = new THREE.Group(), screens = [], y = .03;
    const aw = airway(g, y), parts = aw.parts;
    const b = new THREE.Group(); b.position.set(0, y + .012, .004); g.add(b);
    b.add(rbox(.046, .036, .02, .004, M.plastic(0x15181B, .25)));
    put(b, rbox(.03, .05, .02, .004, M.plastic(0x15181B, .25)), -.008, .004, -.001);
    put(b, rbox(.024, .03, .016, .003, M.plastic(0x2A2F33, .3)), 0, -.012, -.001);
    const sc = makeScreen(.03, .028, cfg.screen, 512); put(b, sc.mesh, .004, .001, .0105); screens.push(sc);
    [.026, -.022].forEach(yy => put(b, rbox(.012, .008, .004, .002, M.matte(0x2B3238)), -.008, yy, .009));
    parts.push({key: 'screen', at: V3(.003, y + .025, .02)}, {key: 'keypad', at: V3(-.008, y + .04, .016)});
    return {group: g, parts, screens};
  });
  /* EMMA ekranı (görsele göre): siyah OLED üzerinde açık yeşil; üstte ETCO2 mmHg ve pil, büyük EtCO₂, sağda akciğer simgesi ile solunum hızı, altta dolu kapnogram */
  DEV3D.model('emma', {type: 'b-emma', theta: .45, phi: 1.15,
    screen: {bg: '#000000', layout: [
      {t: 'text', txt: 'ETCO2', x: .01, y: .03, w: .3, h: .11, c: '#B8F27A', s: .085, wt: 800},
      {t: 'text', txt: 'mmHg', x: .33, y: .035, w: .2, h: .1, c: '#B8F27A', s: .065, wt: 600},
      {t: 'box', x: .86, y: .055, w: .09, h: .055, stroke: '#4FD16A', lw: .012}, {t: 'box', x: .875, y: .07, w: .06, h: .025, fill: '#4FD16A'},
      {t: 'tile', style: 'plain', x: .14, y: .15, w: .58, h: .5, l: '', v: 39, c: '#B8F27A', vs: .5, live: true},
      {t: 'text', txt: '/min', x: .8, y: .23, w: .2, h: .1, c: '#B8F27A', s: .065, wt: 600},
      {t: 'text', txt: '13', x: .7, y: .34, w: .3, h: .22, c: '#B8F27A', s: .27, wt: 800, al: 'c'}
    ], draw(g, t, {W, H, WAVE}) {
      /* Akciğer simgesi */
      g.fillStyle = '#B8F27A'; [-1, 1].forEach(sx => { g.beginPath(); g.ellipse(W * (.76 + sx * .028), H * .27, W * .024, H * .055, sx * .2, 0, 7); g.fill(); }); g.fillRect(W * .756, H * .17, W * .008, H * .06);
      /* Dolu kapnogram */
      g.fillStyle = '#9BD86A'; g.beginPath(); g.moveTo(W * .2, H * .95);
      for (let k = 0; k <= 100; k++) { const u = k / 100, v = WAVE.capno(u * 3 + t * .25); g.lineTo(W * (.2 + .77 * u), H * (.95 - .22 * Math.min(1, v))); }
      g.lineTo(W * .97, H * .95); g.closePath(); g.fill();
    }}});

  /* ISA — beyaz oval yan akım gaz analizörü modülü; ön yüzde örnekleme hattı girişi; hat adaptördeki luer ucuna gider */
  DEV3D.register('b-isa', cfg => {
    const g = new THREE.Group(), parts = [], y = .012;
    const m = new THREE.Group(); m.position.set(-.06, .046, -.01); m.rotation.y = .15; g.add(m);
    const sh = rbox(.055, .088, .032, .022, M.plastic(0xEDEFF0, .3)); m.add(sh);
    put(g, rbox(.05, .006, .03, .003, M.rubber(0x8A949C)), m.position.x, .003, m.position.z);
    put(m, rbox(.044, .074, .004, .018, M.plastic(0xAEB6BC, .4)), 0, 0, .016);
    const ring = cyl(.012, .012, .006, M.matte(0x3A4148), 28); put(m, ring, 0, .002, .019, Math.PI / 2);
    const inlet = cyl(.005, .005, .008, M.plastic(0xE9EEF1), 20); put(m, inlet, 0, .002, .022, Math.PI / 2);
    put(m, box(.014, .003, .002, M.led(0x2E9E58)), 0, -.024, .019);
    put(m, nameplate('Masimo', .026, .007, '#C2272F'), .004, .03, .0185);
    m.updateMatrixWorld(true);
    const inW = m.localToWorld(V3(0, .002, .03)), back = m.localToWorld(V3(0, -.03, -.018));
    parts.push({key: 'module', at: m.localToWorld(V3(.02, .03, .02))}, {key: 'port', at: inW.clone().add(V3(0, .008, .008))}, {key: 'led', at: m.localToWorld(V3(0, -.024, .025))});
    /* Ana monitöre giden kablo */
    g.add(tube([back, back.clone().add(V3(0, -.02, -.02)), V3(-.06, .004, -.14), V3(-.2, .004, -.2)], .003, M.matte(0x8A949C)));
    parts.push({key: 'b-cable', at: V3(-.12, .01, -.17)});
    /* Hava yolu ve örnekleme hattı */
    const ag = new THREE.Group(); ag.position.set(.1, 0, .07); ag.rotation.y = .5; g.add(ag);
    const aw = airway(ag, .0125, {port: true}); ag.updateMatrixWorld(true);
    aw.parts.forEach(p => parts.push({key: p.key, at: ag.localToWorld(p.at)}));
    const luer = ag.localToWorld(V3(0, .0125 + .0115 + .014, 0));
    put(g, cyl(.004, .0045, .012, M.color(0xD2692A, .4), 16), luer.x, luer.y + .002, luer.z);
    const p1 = inW.clone().add(V3(0, 0, .02)), sl = [inW, p1, V3(inW.x + .02, .005, inW.z + .06), V3(.03, .005, .08), V3(luer.x - .03, .03, luer.z - .01), luer.clone().add(V3(0, .008, 0))];
    g.add(tube(sl, .0018, M.clear(0xE6F1F5, .7), 80, 8));
    parts.push({key: 'b-sampling', at: sl[2].clone().add(V3(0, .012, 0))});
    return {group: g, parts, screens: []};
  });
  DEV3D.model('isa', {type: 'b-isa', theta: .35, phi: 1.2});
})();
