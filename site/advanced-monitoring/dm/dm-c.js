'use strict';
/* Cihaz yapılandırmaları C: hemodinamik izlem (arter dalga analizi, termodilüsyon, noninvaziv debi) ve ultrason.
   Kateter/sensör ürünleri: ana monitör + extra içinde kit (basınç dönüştürücü, PAC, parmak manşeti).
   'c-ultrasound' kurucusu: araba/dizüstü ultrason sistemi, klavye + iztopu, prob tutucular (TEE, TTE, rejyonel). */
(() => {
  if (!DEV3D) return;
  const {V3, M, rbox, box, cyl, sphere, torus, tube, put, makeScreen, decal, nameplate, pole} = DEV3D.H;
  const T = DEV3D.partText;

  /* ---------- Parça metinleri ---------- */
  T('c-transducer', {tr: ['Basınç dönüştürücü', 'Arter hattındaki basıncı elektrik sinyaline çevirir; doğru okuma için kalp hizasında sıfırlanır.'], en: ['Pressure transducer', 'Converts the pressure in the arterial line into an electrical signal; it is zeroed at heart level for accurate readings.'], es: ['Transductor de presión', 'Convierte la presión de la línea arterial en una señal eléctrica; se pone a cero a la altura del corazón para lecturas precisas.']});
  T('c-flush', {tr: ['Yıkama düzeneği', 'Basınçlı torba ile hattı açık tutan sürekli yıkama ve hızlı yıkama tırnağıdır; dalga kalitesi kontrolünde de kullanılır.'], en: ['Flush device', 'Continuous flush with a pressure bag keeps the line patent; the fast-flush tab is also used to check waveform quality.'], es: ['Dispositivo de lavado', 'El lavado continuo con bolsa a presión mantiene la línea permeable; la pestaña de lavado rápido también sirve para comprobar la calidad de la curva.']});
  T('c-art-line', {tr: ['Arter hattı', 'Arter kateterini dönüştürücüye bağlayan sert basınç hortumudur; hava kabarcığı ve bükülme dalgayı bozar.'], en: ['Arterial line', 'Stiff pressure tubing linking the arterial catheter to the transducer; air bubbles and kinks distort the waveform.'], es: ['Línea arterial', 'Tubo rígido de presión que une el catéter arterial con el transductor; las burbujas y acodaduras distorsionan la curva.']});
  T('c-cable', {tr: ['Hasta kablosu', 'Sensör ya da kateteri monitöre veya modüle bağlar.'], en: ['Patient cable', 'Connects the sensor or catheter to the monitor or module.'], es: ['Cable del paciente', 'Conecta el sensor o el catéter al monitor o al módulo.']});
  T('c-pac', {tr: ['Pulmoner arter kateteri', 'Sağ kalpten pulmoner artere ilerletilen çok lümenli kateterdir; üzerindeki işaretler yerleştirme derinliğini gösterir.'], en: ['Pulmonary artery catheter', 'Multi-lumen catheter advanced through the right heart into the pulmonary artery; the markings show insertion depth.'], es: ['Catéter de arteria pulmonar', 'Catéter multilumen que avanza por el corazón derecho hasta la arteria pulmonar; las marcas indican la profundidad de inserción.']});
  T('c-balloon', {tr: ['Balon ucu', 'Akımla ilerlemeyi ve tıkalı (wedge) basınç ölçümünü sağlar; yanındaki termistör sıcaklık değişimini algılar.'], en: ['Balloon tip', 'Lets the catheter float with blood flow and allows wedge pressure measurement; the nearby thermistor senses temperature change.'], es: ['Punta con balón', 'Permite que el catéter avance con el flujo y medir la presión de enclavamiento; el termistor cercano detecta el cambio de temperatura.']});
  T('c-lumens', {tr: ['Lümen uçları', 'Distal (PA), proksimal (enjektat/CVP), balon şişirme ve termistör bağlantılarıdır; renkleri ve etiketleriyle ayırt edilir.'], en: ['Lumen hubs', 'Distal (PA), proximal (injectate/CVP), balloon inflation and thermistor connections, told apart by color and label.'], es: ['Conectores de lumen', 'Conexiones distal (AP), proximal (inyectado/PVC), de inflado del balón y del termistor, que se distinguen por color y etiqueta.']});
  T('c-cuff', {tr: ['Parmak manşeti', 'Parmak arterindeki hacmi sabit tutacak şekilde basıncı sürekli ayarlayarak (hacim kenetleme) basınç dalgasını kaydeder; beden parmağa göre seçilir.'], en: ['Finger cuff', 'Continuously adjusts its pressure to keep finger artery volume constant (volume clamp) and records the pressure waveform; the size is chosen to fit the finger.'], es: ['Manguito digital', 'Ajusta continuamente su presión para mantener constante el volumen de la arteria del dedo (pinza de volumen) y registra la curva de presión; la talla se elige según el dedo.']});
  T('c-hrs', {tr: ['Kalp referans sensörü', 'Bir ucu parmakta, diğeri kalp hizasında durur; parmak ile kalp arasındaki yükseklik farkını dengeler.'], en: ['Heart reference sensor', 'One end sits on the finger and the other at heart level; it compensates for the height difference between finger and heart.'], es: ['Sensor de referencia cardiaca', 'Un extremo va en el dedo y el otro a la altura del corazón; compensa la diferencia de altura entre el dedo y el corazón.']});
  T('c-pc', {tr: ['Basınç kontrol ünitesi', 'Bileğe takılır; manşet basıncını üretir ve manşet ile referans sensörünü monitöre bağlar.'], en: ['Pressure controller', 'Worn on the wrist; generates the cuff pressure and links the cuff and reference sensor to the monitor.'], es: ['Controlador de presión', 'Se lleva en la muñeca; genera la presión del manguito y conecta el manguito y el sensor de referencia al monitor.']});
  T('c-cvc', {tr: ['Enjektat sensörü / CVK', 'Santral venöz kateterden verilen soğuk bolusun sıcaklığını ve zamanını kaydeder.'], en: ['Injectate sensor / CVC', 'Records the temperature and timing of the cold bolus given through the central venous catheter.'], es: ['Sensor del líquido inyectado / CVC', 'Registra la temperatura y el momento del bolo frío administrado por el catéter venoso central.']});
  T('c-thermo', {tr: ['Termistörlü arter kateteri', 'Genellikle femoral artere yerleştirilir; kan sıcaklığı değişimini (termodilüsyon eğrisi) ve arter basıncını birlikte ölçer.'], en: ['Thermistor arterial catheter', 'Usually placed in the femoral artery; measures both the blood temperature change (thermodilution curve) and arterial pressure.'], es: ['Catéter arterial con termistor', 'Suele colocarse en la arteria femoral; mide a la vez el cambio de temperatura de la sangre (curva de termodilución) y la presión arterial.']});
  T('c-electrodes', {tr: ['Yüzey elektrotları', 'Göğüs ve boyna yapıştırılan elektrotlar akım uygular ve sinyali alır; yerleşim yeri üreticinin şemasına uymalıdır.'], en: ['Surface electrodes', 'Electrodes stuck on the chest and neck apply current and pick up the signal; placement must follow the manufacturer’s diagram.'], es: ['Electrodos de superficie', 'Los electrodos adheridos al tórax y al cuello aplican corriente y captan la señal; su colocación debe seguir el esquema del fabricante.']});
  T('c-probe', {tr: ['Ultrason probu', 'Ses dalgalarını gönderip yankıları alan dönüştürücüdür; prob tipi (doğrusal, faz dizili, TEE) incelemeye göre seçilir.'], en: ['Ultrasound probe', 'Transducer that sends sound waves and receives the echoes; the type (linear, phased array, TEE) is chosen for the exam.'], es: ['Sonda de ecografía', 'Transductor que emite ondas sonoras y recibe los ecos; el tipo (lineal, sectorial, ETE) se elige según el estudio.']});
  T('c-wheels', {tr: ['Kontrol tekerlekleri', 'TEE probunun ucunu öne-arkaya ve sağa-sola büker; görüntü düzlemi ayrıca bir düğmeyle döndürülür.'], en: ['Control wheels', 'Flex the TEE probe tip forward/back and left/right; the imaging plane is rotated with a separate button.'], es: ['Ruedas de control', 'Flexionan la punta de la sonda ETE hacia delante/atrás e izquierda/derecha; el plano de imagen se gira con un botón aparte.']});
  T('c-shaft', {tr: ['Esnek gövde', 'Uzunluk işaretli bükülebilir şafttır; ucundaki dönüştürücü özofagus ya da mideye yerleştirilir.'], en: ['Flexible shaft', 'Bendable shaft with depth markings; the transducer at its tip is placed in the esophagus or stomach.'], es: ['Tubo flexible', 'Eje flexible con marcas de profundidad; el transductor de la punta se sitúa en el esófago o el estómago.']});
  T('c-trackball', {tr: ['Klavye ve iztopu', 'Kazanç, derinlik, mod seçimi, ölçüm ve imleç işlemleri için kullanılır.'], en: ['Keyboard and trackball', 'Used for gain, depth, mode selection, measurements and cursor control.'], es: ['Teclado y trackball', 'Se usan para ganancia, profundidad, selección de modo, mediciones y control del cursor.']});
  T('c-holder', {tr: ['Prob tutucu', 'Kullanılmayan probları ve jel şişesini güvenle taşır; problar düşmeye karşı korunmalıdır.'], en: ['Probe holder', 'Holds probes not in use and the gel bottle; probes must be protected from drops.'], es: ['Soporte de sondas', 'Sujeta las sondas que no se usan y el frasco de gel; las sondas deben protegerse de caídas.']});
  T('c-doppler', {tr: ['Doppler probu', 'Kan akım hızını ölçen Doppler dönüştürücüsüdür; sinyal kalitesi probun konumuna ve açısına bağlıdır.'], en: ['Doppler probe', 'Doppler transducer that measures blood flow velocity; signal quality depends on probe position and angle.'], es: ['Sonda Doppler', 'Transductor Doppler que mide la velocidad del flujo sanguíneo; la calidad de la señal depende de la posición y el ángulo de la sonda.']});
  T('c-cart', {tr: ['Araba', 'Tekerlekli taşıyıcıdır; tekerlek frenleri kullanım sırasında kilitlenir.'], en: ['Cart', 'Wheeled carrier; the wheel brakes are locked during use.'], es: ['Carro', 'Soporte con ruedas; los frenos de las ruedas se bloquean durante el uso.']});

  /* ---------- Ortak kit yardımcıları ---------- */
  const P = (parts, key, v) => parts && parts.push({key, at: v});
  /* Yuvarlak köşeli ince düz levha (cam ön yüz) */
  const rplate = (w, h, r, mat) => { const s = new THREE.Shape(), x = -w / 2, y = -h / 2; s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); const m = new THREE.Mesh(new THREE.ShapeGeometry(s, 8), mat); return m; };
  /* Ortalanmış baskı yazısı (logo vb.) */
  const ctext = (s, w, h, ink = '#E6EAEC', wt = 600) => decal(w, h, (g, W, Hh) => { g.fillStyle = ink; g.font = `${wt} ${Math.round(Hh * .72)}px "Archivo", Arial, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, W / 2, Hh / 2); });

  /* Kablo: başlangıçtan bitişe sarkık eğri */
  function cable(g, a, b, r = .0032, col = 0x2E363C, sag = .05) {
    const m1 = a.clone().lerp(b, .33), m2 = a.clone().lerp(b, .66); m1.y = Math.max(.008, Math.min(a.y, b.y) - sag + .02); m2.y = Math.max(.006, Math.min(a.y, b.y) - sag);
    g.add(tube([a, m1, m2, b], r, M.matte(col)));
  }
  /* Basınç dönüştürücü kiti: dönüştürücü + yıkama, arter hattı + üç yollu musluk, kanül; kablo monitöre (to) */
  function transducerKit(g, {at = V3(.2, 0, .16), to, parts, dome = 0x2F9E6E, body = 0xF2F5F7, cableCol = 0x2E363C, label} = {}) {
    const y = at.y + .012, x = at.x, z = at.z;
    put(g, rbox(.056, .02, .026, .006, M.plastic(body)), x, y, z);
    put(g, cyl(.009, .009, .01, M.color(dome, .35)), x - .006, y + .014, z);
    const tab = rbox(.016, .006, .01, .002, M.color(0x2F7DD1, .4)); put(g, tab, x + .016, y + .013, z);
    if (label) { const lp = nameplate(label, .04, .006, '#1B2328'); put(g, lp, x, y, z + .0135); }
    /* arter hattı: musluk ve kanül */
    const s = V3(x - .03, y, z), mid = V3(x - .12, at.y + .006, z + .06), sc = V3(x - .2, at.y + .008, z + .03);
    g.add(tube([s, V3(x - .06, y - .004, z + .02), mid, sc], .0028, M.clear(0xF4E6E6, .7)));
    put(g, box(.02, .008, .008, M.plastic(0x2F7DD1)), sc.x - .01, sc.y, sc.z); put(g, box(.006, .006, .018, M.plastic(0x2F7DD1)), sc.x - .01, sc.y + .005, sc.z);
    put(g, cyl(.004, .0016, .045, M.clear(0xE9F2F5, .8)), sc.x - .045, sc.y, sc.z, 0, 0, Math.PI / 2);
    put(g, cyl(.0045, .0045, .012, M.color(0xD0453F, .4)), sc.x - .024, sc.y, sc.z, 0, 0, Math.PI / 2);
    /* yıkama hattı torbaya doğru */
    g.add(tube([V3(x + .03, y, z), V3(x + .08, at.y + .006, z - .02), V3(x + .16, at.y + .006, z - .08)], .0022, M.clear(0xE6F1F5, .7)));
    if (to) cable(g, V3(x, y + .004, z - .013), to, .003, cableCol);
    P(parts, 'c-transducer', V3(x - .005, y + .03, z)); P(parts, 'c-flush', V3(x + .018, y + .02, z + .01));
    P(parts, 'c-art-line', V3(sc.x - .02, sc.y + .02, sc.z));
    return V3(x, y, z);
  }
  /* PAC kiti: sarılmış sarı kateter, balon uçlu, 4 lümen ucu */
  function pacKit(g, {at = V3(.15, 0, .16), to, parts} = {}) {
    const y = at.y + .005, pts = [], R = .085;
    for (let k = 0; k <= 40; k++) { const a = k / 40 * Math.PI * 3.4, r = R - k * .0006; pts.push(V3(at.x + Math.cos(a) * r, y + k * .00012, at.z + Math.sin(a) * r * .7)); }
    const tip = pts[0].clone(), base = pts[pts.length - 1].clone();
    g.add(tube(pts, .0035, M.plastic(0xF1E6A8), 200, 10));
    for (let k = 4; k < 40; k += 5) { const p = pts[k], m = torus(.0037, .0008, M.matte(0x222), 12); m.position.copy(p); m.rotation.y = Math.PI / 2; g.add(m); }
    const bal = sphere(.008, M.clear(0xF7E0B8, .6)); bal.scale.set(1.5, 1, 1); bal.position.copy(tip).add(V3(.006, 0, 0)); g.add(bal);
    /* lümen dalları */
    const hub = base.clone().add(V3(-.04, 0, .03)); g.add(tube([base, hub], .0042, M.plastic(0xF1E6A8)));
    put(g, rbox(.02, .012, .014, .004, M.plastic(0xF2F5F7)), hub.x, hub.y + .002, hub.z);
    const L = [[0xF2C531, 'PA'], [0x2F7DD1, 'CVP'], [0xD0453F, 'BAL'], [0xF2F5F7, 'TH']];
    L.forEach(([c], i) => {
      const e = hub.clone().add(V3(-.07 - i * .006, 0, -.03 + i * .022));
      g.add(tube([hub, hub.clone().add(V3(-.02, 0, (i - 1.5) * .006)), e], .0022, M.clear(0xEDEFF0, .85)));
      if (i === 3) put(g, rbox(.022, .014, .012, .003, M.plastic(0xF2F5F7)), e.x - .01, e.y + .003, e.z);
      else put(g, cyl(.0055, .0045, .016, M.color(c, .4)), e.x - .008, e.y + .002, e.z, 0, 0, Math.PI / 2);
      if (i === 2) put(g, cyl(.007, .007, .03, M.clear(0xF4F8FA, .6)), e.x - .03, e.y + .004, e.z, 0, 0, Math.PI / 2);
    });
    const thc = hub.clone().add(V3(-.1, .003, .036));
    if (to) cable(g, thc, to, .003);
    P(parts, 'c-pac', pts[22].clone().add(V3(0, .02, 0))); P(parts, 'c-balloon', bal.position.clone().add(V3(0, .018, 0))); P(parts, 'c-lumens', hub.clone().add(V3(-.07, .02, 0)));
  }
  /* Parmak manşeti kiti: bilek basınç kontrol ünitesi, manşet, kalp referans sensörü */
  function cuffKit(g, {at = V3(.2, 0, .14), to, parts, hrs = true, col = 0x3C6E9E} = {}) {
    const y = at.y, x = at.x, z = at.z;
    const pc = rbox(.075, .028, .055, .01, M.plastic(0x5B6670)); put(g, pc, x, y + .02, z);
    put(g, box(.03, .03, .1, M.matte(0x23292E)), x, y + .015, z, 0, 0, 0).scale.set(1, .25, 1);
    put(g, box(.055, .002, .035, M.color(0xC9D0D5)), x, y + .035, z);
    /* manşet: parmak etrafında halka */
    const fx = x - .12, fz = z + .04;
    put(g, cyl(.0085, .0085, .07, M.color(0xE8C7AE, .6)), fx - .01, y + .012, fz, 0, 0, Math.PI / 2);
    const cf = cyl(.0125, .0125, .024, M.color(col, .55), 28); put(g, cf, fx, y + .012, fz, 0, 0, Math.PI / 2);
    g.add(tube([V3(x - .035, y + .02, z + .01), V3(fx + .04, y + .018, fz), V3(fx + .012, y + .014, fz)], .0026, M.matte(0x2E363C)));
    if (hrs) {
      const hx = x - .06, hz = z + .1;
      put(g, cyl(.007, .007, .012, M.color(0xD0453F, .4)), fx, y + .026, fz);
      g.add(tube([V3(fx, y + .03, fz), V3(fx + .03, y + .03, fz + .04), V3(hx, y + .008, hz)], .0018, M.matte(0x3A4148)));
      put(g, cyl(.01, .01, .012, M.plastic(0xF2F5F7)), hx, y + .008, hz);
      P(parts, 'c-hrs', V3(hx, y + .03, hz));
    }
    if (to) cable(g, V3(x + .035, y + .02, z - .01), to, .0034);
    P(parts, 'c-pc', V3(x, y + .05, z)); P(parts, 'c-cuff', V3(fx, y + .035, fz));
  }

  /* ---------- 'c-ultrasound' kurucusu ---------- */
  /* Prob gövdeleri: 'phased' (küçük kare yüz), 'linear' (geniş düz yüz), 'tee' (kontrol kolu + tekerlekler) */
  function probe(kind, col = 0xE4E8EB) {
    const p = new THREE.Group();
    if (kind === 'tee') {
      p.add(rbox(.05, .14, .042, .016, M.plastic(col)));
      const w1 = cyl(.026, .026, .01, M.matte(0x3A4148), 28); w1.rotation.z = Math.PI / 2; w1.position.set(.03, .035, 0); p.add(w1);
      const w2 = cyl(.019, .019, .01, M.matte(0x5B6670), 28); w2.rotation.z = Math.PI / 2; w2.position.set(.04, .035, 0); p.add(w2);
      for (let k = 0; k < 10; k++) { const r = box(.012, .004, .004, M.matte(0x2B3238)); const a = k / 10 * Math.PI * 2; r.position.set(.03, .035 + Math.sin(a) * .026, Math.cos(a) * .026); r.rotation.x = -a; p.add(r); }
      const b = cyl(.006, .006, .006, M.color(0x2F7DD1, .4)); b.rotation.x = Math.PI / 2; b.position.set(0, .0, .023); p.add(b);
      const nk = cyl(.012, .008, .04, M.plastic(col)); nk.position.y = -.088; p.add(nk);
    } else {
      const wide = kind === 'linear';
      p.add(rbox(wide ? .03 : .028, .085, .022, .01, M.plastic(col)));
      const head = rbox(wide ? .05 : .026, .03, wide ? .014 : .024, .005, M.plastic(col)); head.position.y = -.05; p.add(head);
      const face = box(wide ? .046 : .02, .003, wide ? .008 : .018, M.matte(0x2B3238)); face.position.y = -.066; p.add(face);
      const tail = cyl(.006, .009, .025, M.plastic(col)); tail.position.y = .052; p.add(tail);
    }
    p.traverse(o => { o.castShadow = true; });
    return p;
  }
  /* ---------- 'c-ultrasound' ----------
     cfg: {form:'cart'|'laptop', probe:'tee'|'phased'|'linear', screen, body, accent:hex, label, extraProbes:[kind]} */
  DEV3D.register('c-ultrasound', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const body = cfg.body || 0xEEF1F3, cart = cfg.form !== 'laptop';
    const cw = cart ? .5 : .42, ch = cart ? .84 : .9;
    /* tekerlekli taban ve kolon */
    const base = rbox(cw * 1.05, .06, cart ? .6 : .45, .02, M.plastic(cart ? body : 0x5B6670)); put(g, base, 0, .08, 0);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => { const w = cyl(.035, .035, .025, M.rubber(), 20); put(g, w, sx * cw * .45, .035, sz * (cart ? .26 : .19), 0, 0, Math.PI / 2); put(g, box(.03, .03, .03, M.matte(0x3A4148)), sx * cw * .45, .075, sz * (cart ? .26 : .19)); });
    if (cart) put(g, rbox(.18, ch - .2, .16, .03, M.plastic(body)), 0, .11 + (ch - .2) / 2, -.06);
    else put(g, cyl(.02, .025, ch - .1, M.metal()), 0, .11 + (ch - .1) / 2 - .05, 0);
    parts.push({key: 'c-cart', at: V3(cw * .45, .1, cart ? .3 : .22)});
    /* konsol: klavye + iztopu */
    const con = new THREE.Group(); con.position.set(0, ch, .02); con.rotation.x = .12; g.add(con);
    con.add(rbox(cw, .05, cart ? .38 : .3, .02, M.plastic(body)));
    const kd = cart ? .38 : .3;
    put(con, rbox(cw * .82, .006, kd * .7, .01, M.matte(0xD6DCE0)), 0, .026, .01);
    put(con, sphere(.022, M.color(0x3A4148, .25)), 0, .03, kd * .22);
    put(con, torus(.024, .003, M.matte(0x5B6670)), 0, .028, kd * .22, Math.PI / 2);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) put(con, rbox(.024, .008, .018, .003, M.matte(c % 3 === 0 && r === 0 ? 0x2E9E58 : 0x5B6670)), -cw * .34 + c * cw * .097, .03, -kd * .22 + r * .03);
    [-1, 1].forEach(sx => [0, 1].forEach(k => put(con, cyl(.012, .012, .012, M.matte(0x2B3238)), sx * (cw * .25 + k * .04), .034, kd * .2)));
    con.updateMatrixWorld(true);
    parts.push({key: 'c-trackball', at: con.localToWorld(V3(0, .06, kd * .22))});
    put(con, rbox(cw * .9, .02, .025, .01, M.matte(0x5B6670)), 0, 0, kd / 2 + .02);
    parts.push({key: 'handle', at: V3(0, ch + .02, kd / 2 + .06)});
    /* ekran */
    const sw = cart ? .44 : .34, sh = cart ? .3 : .22;
    const mon = new THREE.Group(); g.add(mon);
    if (cart) { put(g, cyl(.018, .018, .16, M.metal()), 0, ch + .1, -kd * .4); mon.position.set(0, ch + .17 + sh / 2, -kd * .38); mon.rotation.x = -.08; }
    else { mon.position.set(0, ch + .025 + sh / 2 * Math.cos(.25), -kd / 2 + .02 - sh / 2 * Math.sin(.25)); mon.rotation.x = -.25; }
    mon.add(rbox(sw + .03, sh + .03, .03, .012, M.plastic(cart ? 0x2B3238 : body)));
    const scr = makeScreen(sw, sh, cfg.screen || {title: 'US', extra: 'us'}); put(mon, scr.mesh, 0, 0, .0155); screens.push(scr);
    mon.updateMatrixWorld(true);
    parts.push({key: 'screen', at: mon.localToWorld(V3(0, 0, .03))});
    if (cfg.label) put(mon, nameplate(cfg.label, .08, .01, cart ? '#C9D0D5' : '#3A4148'), 0, -sh / 2 - .008, .0156);
    /* prob tutucular ve prob konektörleri */
    const kinds = [cfg.probe || 'phased', ...(cfg.extraProbes || [])];
    kinds.forEach((kind, i) => {
      const sx = i % 2 ? -1 : 1, hx = sx * (cw / 2 + .03), hz = kd * .3 - Math.floor(i / 2) * .07, hy = ch - .01;
      put(g, cyl(.028, .022, .075, M.matte(0x5B6670), 24, true), hx, hy, hz);
      put(g, rbox(.05, .02, .04, .006, M.matte(0x5B6670)), hx - sx * .03, hy + .01, hz);
      put(g, cyl(.02, .02, .004, M.matte(0x5B6670)), hx, hy - .033, hz);
      const pr = probe(kind); g.add(pr);
      const tee = kind === 'tee', py = hy + (tee ? .08 : .04);
      pr.position.set(hx, py, hz); if (!tee) pr.rotation.z = sx * .15;
      /* konektör: konsolun ön altında */
      const cx = -cw * .3 + i * .1, cp = V3(cx, ch - .06, kd / 2 - .02);
      put(g, rbox(.07, .045, .02, .006, M.matte(0x3A4148)), cx, ch - .06, kd / 2 - .02);
      const top = V3(hx, py + (tee ? .07 : .064), hz);
      g.add(tube([top, top.clone().add(V3(0, .05, 0)), V3(hx + sx * .06, ch - .25, hz + .1), V3(cx, ch - .35, kd / 2 + .1), cp.clone().add(V3(0, -.03, .01))], .004, M.matte(0x2E363C)));
      if (i === 0) parts.push({key: 'c-holder', at: V3(hx + sx * .03, hy - .02, hz + .02)}, {key: 'c-probe', at: V3(hx, py + .02, hz + .03)}, {key: 'port', at: V3(cx, ch - .06, kd / 2 + .01)});
      if (tee) {
        /* esnek şaft: tutucudan aşağı sarkıp halka yapar, uçta dönüştürücü */
        const s0 = V3(hx, py - .11, hz), pts = [s0, V3(hx + .03, py - .3, hz + .05)];
        for (let k = 0; k <= 16; k++) { const a = k / 16 * Math.PI * 2; pts.push(V3(hx + .14 + Math.cos(a + Math.PI) * .12, .45 + Math.sin(a + Math.PI) * .2, hz + .12 + k * .004)); }
        pts.push(V3(hx + .05, .3, hz + .2), V3(hx + .1, .2, hz + .22));
        g.add(tube(pts, .0045, M.matte(0x1D2125, .4), 240, 10));
        for (let k = 3; k < pts.length - 2; k += 2) { const m = torus(.0047, .0009, M.matte(0xE6EAEC), 12); m.position.copy(pts[k]); m.lookAt(pts[k + 1]); g.add(m); }
        const tip = rbox(.022, .045, .014, .006, M.matte(0x1D2125, .4)); put(g, tip, hx + .12, .18, hz + .23, -.5, 0, -.5);
        parts.push({key: 'c-wheels', at: V3(hx + .05, py + .035, hz)}, {key: 'c-shaft', at: pts[9].clone().add(V3(0, .02, .02))}, {key: 'sensor', at: V3(hx + .12, .2, hz + .25)});
      }
    });
    return {group: g, parts, screens};
  });

  /* ---------- Yapılandırmalar ---------- */
  /* Pulsiocare ekranı (üretici görseli, PiCCO): koyu gri zemin; üstte sarı çerçeveli alarm düğmesi, teknoloji adı, boy/kilo,
     saat ve pil; solda dar menü çubuğu; üst ortada küçük AP dalga şeridi; ortada akciğer-kalp-dolaşım şeması ve etrafında
     süreksiz (termodilüsyon) / sürekli parametreler, ok ile değişim yönü; sağda 2 sütun parametre kutuları (üstte büyük AP,
     MAP, PR, CI, altta küçük satırlar), en altta "son TD" yazısı ve Calibrations düğmesi.
     o: {tech:[satır1, satır2], big:[[ad, değer, birim, renk, sınır1, sınır2]], small:[[ad, birim, değer, renk]], disc, lower, cont:[[ad, değer, renk, '^'|'v'|'<', okRengi]], foot} */
  function pulsioScreen(o) {
    const CX = [.688, .845], TW = .152, BY = [.11, .255, .4], BH = .138, SY = [.548, .614, .68, .746], SH = .06;
    const layout = [
      {t: 'box', x: 0, y: 0, w: 1, h: .1, fill: '#292B2E'},
      {t: 'box', x: .006, y: .012, w: .152, h: .078, stroke: '#E2BE34', lw: .004, r: .012},
      {t: 'icon', g: 'bell', x: .066, y: .022, w: .032, h: .05, c: '#F2D23A'},
      {t: 'box', x: .07, y: .074, w: .024, h: .005, fill: '#5BB7DE'},
      {t: 'text', txt: o.tech[0], x: .545, y: .018, w: .12, h: .035, c: '#D9DDE0', s: .025, wt: 600},
      {t: 'text', txt: o.tech[1], x: .545, y: .052, w: .12, h: .035, c: '#D9DDE0', s: .025, wt: 600},
      {t: 'text', txt: '175 cm', x: .688, y: .018, w: .07, h: .035, c: '#D9DDE0', s: .022, wt: 500},
      {t: 'text', txt: '75 kg', x: .688, y: .052, w: .07, h: .035, c: '#D9DDE0', s: .022, wt: 500},
      {t: 'box', x: .748, y: .035, w: .022, h: .03, stroke: '#D9DDE0', r: .004},
      {t: 'icon', g: 'sd', x: .785, y: .03, w: .025, h: .04, c: '#9AA3AA'},
      {t: 'text', txt: '10:59', x: .83, y: .03, w: .08, h: .04, c: '#E6EAEC', s: .028, wt: 600},
      {t: 'icon', g: 'battery', x: .95, y: .03, w: .035, h: .04, c: '#E6EAEC'},
      {t: 'box', x: 0, y: .1, w: .05, h: .9, fill: '#252729'},
      {t: 'icon', g: 'menu', x: .01, y: .125, w: .03, h: .045, c: '#E6EAEC'},
      {t: 'icon', g: 'bell', x: .012, y: .7, w: .026, h: .05, c: '#E6EAEC'},
      {t: 'text', txt: '?', x: 0, y: .79, w: .05, h: .06, c: '#E6EAEC', s: .05, wt: 700, al: 'c'},
      {t: 'icon', g: 'lock', x: .012, y: .88, w: .026, h: .05, c: '#E6EAEC'},
      {t: 'box', x: .056, y: .108, w: .624, h: .132, fill: '#2B2D30'},
      {t: 'text', txt: '160', x: .058, y: .112, w: .03, h: .03, c: '#C9D0D5', s: .019, wt: 600},
      {t: 'text', txt: 'AP (mmHg)', x: .085, y: .112, w: .1, h: .03, c: '#C9D0D5', s: .02, wt: 600},
      {t: 'text', txt: '30', x: .058, y: .2, w: .03, h: .03, c: '#C9D0D5', s: .019, wt: 600},
      {t: 'wave', k: 'art', c: '#E0423A', x: .075, y: .125, w: .565, h: .08, span: 8, amp: .3, lw: .004},
      {t: 'icon', g: 'arrow', x: .652, y: .128, w: .022, h: .03, c: '#9AA3AA'},
      {t: 'text', txt: o.foot || '◷ Last TD 31 min ago', x: .69, y: .86, w: .17, h: .05, c: '#D9DDE0', s: .022, wt: 500},
      {t: 'box', x: .868, y: .845, w: .122, h: .085, fill: '#1F2123', r: .012},
      {t: 'text', txt: 'Calibrations', x: .868, y: .845, w: .122, h: .085, c: '#E6EAEC', s: .022, wt: 600, al: 'c'}
    ];
    o.big.forEach(([l, v, u, c, a, b], i) => {
      const x = CX[i % 2], y = BY[Math.floor(i / 2)];
      layout.push({t: 'box', x, y, w: TW, h: BH, fill: '#26282B', r: .006},
        {t: 'text', txt: l, x: x + .002, y: y + .008, w: .06, h: .03, c: '#D9DDE0', s: .02, wt: 600},
        {t: 'text', txt: v, x: x + .004, y: y + .03, w: TW - .036, h: .08, c, s: .064, wt: 500, al: 'c'},
        {t: 'text', txt: u, x, y: y + .105, w: TW, h: .025, c, s: .017, wt: 500, al: 'c'});
      if (a != null) layout.push({t: 'text', txt: a, x: x + TW - .04, y: y + .008, w: .038, h: .03, c: '#D9DDE0', s: .017, wt: 600, al: 'r'}, {t: 'text', txt: b, x: x + TW - .04, y: y + .04, w: .038, h: .03, c: '#D9DDE0', s: .017, wt: 600, al: 'r'});
    });
    o.small.forEach(([l, u, v, c], i) => {
      const x = CX[i % 2], y = SY[Math.floor(i / 2)];
      layout.push({t: 'box', x, y, w: TW, h: SH, fill: '#26282B', r: .004},
        {t: 'text', txt: l, x: x + .002, y: y + .004, w: .06, h: .026, c: '#D9DDE0', s: .02, wt: 600},
        {t: 'text', txt: u, x: x + .002, y: y + .03, w: .07, h: .024, c: '#B5BDC3', s: .015, wt: 500},
        {t: 'text', txt: v, x: x + .05, y, w: TW - .05, h: SH, c, s: .052, wt: 500, al: 'r'});
    });
    return {bg: '#303235', layout, draw(g, t, api) {
      const {W, H, txt} = api, X = f => f * W, Y = f => f * H;
      /* AP şeridinde atım işaretleri */
      g.strokeStyle = 'rgba(230,234,236,.55)'; g.lineWidth = 1;
      for (let k = 0; k < 8; k++) { const xx = X(.075 + .565 * (k + 1 - t * .9 % 1) / 8); g.beginPath(); g.moveTo(xx, Y(.19)); g.lineTo(xx, Y(.225)); g.stroke(); }
      /* şema: trakea, akciğer, dolaşım halkası, kalp, sistemik dolaşım */
      const lx = X(.388), ly = Y(.41), lr = Y(.07), xl = X(.332), xr = X(.452), yt = Y(.49), yb = Y(.895), hy = Y(.69), hr = Y(.042);
      g.lineWidth = Y(.008); g.strokeStyle = '#F2D23A'; g.setLineDash([Y(.012), Y(.008)]); g.beginPath(); g.arc(lx, ly, lr * 1.12, 0, 7); g.stroke(); g.setLineDash([]);
      g.fillStyle = '#7FC6DA'; g.beginPath(); g.arc(lx, ly, lr * .9, 0, Math.PI); g.fill(); g.fillStyle = '#5A6E78'; g.beginPath(); g.arc(lx, ly, lr * .9, Math.PI, 0); g.fill();
      g.strokeStyle = '#F2D23A'; g.lineWidth = Y(.008); g.beginPath(); g.moveTo(lx - lr * .5, Y(.3)); g.lineTo(lx - lr * .5, ly - lr * .95); g.moveTo(lx + lr * .5, Y(.3)); g.lineTo(lx + lr * .5, ly - lr * .95); g.stroke();
      g.lineWidth = Y(.012);
      g.strokeStyle = '#2FB4E8'; g.beginPath(); g.moveTo(X(.39), Y(.895)); g.lineTo(xl, yb); g.lineTo(xl, yt); g.quadraticCurveTo(xl, ly + lr * 1.1, lx - lr * .3, ly + lr * 1.35); g.stroke();
      g.beginPath(); g.moveTo(xl, hy + hr * .5); g.lineTo(lx - hr, hy + hr * .5); g.stroke();
      g.strokeStyle = '#F0473C'; g.beginPath(); g.moveTo(X(.39), Y(.895)); g.lineTo(xr, yb); g.lineTo(xr, yt); g.quadraticCurveTo(xr, ly + lr * 1.1, lx + lr * .3, ly + lr * 1.35); g.stroke();
      g.beginPath(); g.moveTo(xr, hy - hr * .5); g.lineTo(lx + hr, hy - hr * .5); g.stroke();
      g.fillStyle = '#303235'; g.beginPath(); g.arc(lx, hy, hr * 1.1, 0, 7); g.fill();
      g.strokeStyle = '#F2D23A'; g.lineWidth = Y(.005); g.beginPath(); g.arc(lx, hy, hr, 0, 7); g.stroke();
      g.strokeStyle = 'rgba(230,234,236,.6)'; g.setLineDash([2, 3]); g.beginPath(); g.arc(lx, hy, hr * 1.35, 0, 7); g.stroke(); g.setLineDash([]);
      g.fillStyle = '#F0473C'; g.beginPath(); g.arc(lx + hr * .2, hy + hr * .1, hr * .45, 0, 7); g.fill(); g.fillStyle = '#2FB4E8'; g.beginPath(); g.arc(lx - hr * .3, hy - hr * .1, hr * .3, 0, 7); g.fill();
      const gr = g.createLinearGradient(lx - hr * 1.2, 0, lx + hr * 1.2, 0); gr.addColorStop(0, '#2FB4E8'); gr.addColorStop(1, '#F0473C');
      g.fillStyle = gr; g.fillRect(lx - hr * 1.15, yb - Y(.018), hr * 2.3, Y(.036));
      g.strokeStyle = '#8FD14A'; g.lineWidth = Y(.005); g.beginPath(); g.arc(lx, yb, hr * 1.3, 0, 7); g.stroke();
      /* parametre etiketleri, değerler, yön okları ve bağlantı çizgileri */
      const tri = (x, y, d, c) => { const r = Y(.016); g.fillStyle = c; g.beginPath(); if (d === '^') { g.moveTo(x, y - r); g.lineTo(x + r, y + r * .8); g.lineTo(x - r, y + r * .8); } else if (d === 'v') { g.moveTo(x, y + r); g.lineTo(x + r, y - r * .8); g.lineTo(x - r, y - r * .8); } else { g.moveTo(x - r, y); g.lineTo(x + r * .8, y - r); g.lineTo(x + r * .8, y + r); } g.fill(); };
      const row = ([l, v, c, d, dc], x, y, to) => {
        txt(l, X(x), Y(y), {c: '#F2F4F5', s: .034, wt: 500}); txt(v, X(x + .058), Y(y), {c, s: .03, wt: 500}); tri(X(x + .107), Y(y), d, dc);
        if (to) { g.strokeStyle = 'rgba(230,234,236,.8)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(X(to[0]), Y(y)); g.lineTo(X(to[1]), Y(to[2] ?? y)); g.stroke(); }
      };
      if (o.disc && o.disc.length) { txt('◷ Discontinuous', X(.165), Y(.33), {c: '#E6EAEC', s: .024, wt: 600}); o.disc.forEach((r, k) => row(r, .158, .405 + k * .053, [.285, .37])); }
      (o.lower || []).forEach((r, k) => row(r, .158, .635 + k * .052, [.285, .3]));
      if (o.lower && o.lower.length) { g.beginPath(); g.moveTo(X(.3), Y(.635)); g.lineTo(X(.3), Y(.635 + (o.lower.length - 1) * .052)); g.moveTo(X(.3), Y(.69)); g.lineTo(lx - hr * 1.4, Y(.69)); g.stroke(); }
      txt('Continuous', X(.478), Y(.585), {c: '#E6EAEC', s: .024, wt: 600});
      o.cont.forEach((r, k) => { const last = k === o.cont.length - 1, y = last ? .897 : .652 + k * .053; row(r, .478, y, [last ? .43 : .455, .474]); });
      /* sayfa noktaları */
      for (let k = 0; k < 5; k++) { g.fillStyle = k ? 'rgba(230,234,236,.35)' : '#F2F4F5'; g.beginPath(); g.arc(X(.346 + k * .011), Y(.983), Y(.006), 0, 7); g.fill(); }
    }};
  }
  /* Getinge Pulsiocare (üretici görseli): ince beyaz kenarlı geniş siyah cam ön yüz (16:9 ekran), üstte ortada GETINGE yazısı,
     arkada ince kemer tutamak, koyu kaide (ızgara + yeşil güç halkası) */
  const pulsio = (screen, kit) => ({
    type: 'monitor', w: .33, h: .205, d: .05, body: 0xF4F6F7, bezel: 0x15191C, mount: 'stand', led: false, phi: 1.1,
    screenMargin: [.025, .024, .025, .024], screen,
    extra(g, o) {
      const {body, w, h, d, elev, parts} = o;
      put(body, rplate(w - .01, h - .01, .016, M.matte(0x15191C, .5)), 0, 0, d / 2 + .0033);
      put(body, ctext('GETINGE  ✻', .06, .009, '#C9D0D5', 600), 0, h / 2 - .012, d / 2 + .0037);
      put(g, rbox(w * .6, .05, d * .9, .006, M.matte(0x2E3338)), 0, .025, 0);
      for (let k = 0; k < 4; k++) put(g, box(.03, .0012, .001, M.matte(0x15191C)), 0, .012 + k * .003, d * .45 + .0005);
      [-1, 1].forEach(sx => put(body, rbox(.016, .026, .018, .006, M.plastic(0xF4F6F7)), sx * w * .2, h / 2 + .008, -d * .15));
      put(body, rbox(w * .44, .012, .02, .005, M.matte(0x3A4148)), 0, h / 2 + .022, -d * .15);
      parts.push({key: 'handle', at: V3(0, elev + h + .035, -d * .15)});
      const pw = torus(.008, .0015, M.led(0x3CCB6A)); put(g, pw, w * .26, .028, d * .45 + .002);
      kit(g, o);
    }
  });
  DEV3D.model('picco', pulsio(
    pulsioScreen({tech: ['PiCCO', 'Technology'],
      big: [['AP', '118/67', 'mmHg', '#F0473C', 140, 90], ['MAP', '(84)', 'mmHg', '#F0473C', 105, 70], ['PR', '80', '1/min', '#F0473C', 100, 60], ['CIpc', '3.40', 'l/min/m²', '#F2A33A', 5, 3], ['tdCI', '3.32', 'l/min/m²', '#F2A33A'], ['TB', '37.0', '°C', '#F2F4F5']],
      small: [['GEDI', 'ml/m²', '720', '#5BB7DE'], ['SVV', '%', '9', '#5BB7DE'], ['GEF', '%', '26', '#5BB7DE'], ['CPI', 'W/m²', '0.68', '#7FD18F'], ['ELWI', 'ml/kg', '8', '#7FD18F'], ['SVRI', 'dyn·s·cm⁻⁵·m²', '1850', '#5BB7DE'], ['PVPI', '', '1.9', '#7FD18F'], ['EAdyn', '', '0.83', '#5BB7DE']],
      disc: [['ELWI', '8', '#7FD18F', '<', '#9BD24A'], ['PVPI', '1.9', '#7FD18F', '<', '#9BD24A']],
      lower: [['tdCI', '3.32', '#F2A33A', '<', '#9BD24A'], ['GEDI', '720', '#5BB7DE', '^', '#F2D23A'], ['GEF', '26', '#5BB7DE', '<', '#9BD24A'], ['CFI', '6.1', '#5BB7DE', '<', '#9BD24A']],
      cont: [['CI', '3.40', '#F2A33A', '<', '#9BD24A'], ['SVV', '9', '#5BB7DE', '<', '#9BD24A'], ['SVRI', '1850', '#5BB7DE', '<', '#9BD24A']]}),
    (g, {w, elev, parts}) => {
      const to = V3(w / 2 + .003, elev + .06, .005);
      transducerKit(g, {at: V3(.1, 0, .14), to, parts, dome: 0xD0453F, label: 'PiCCO'});
      /* termistörlü femoral arter kateteri ve CVK enjektat sensörü */
      const th = V3(-.1, .006, .17);
      put(g, cyl(.0022, .0022, .14, M.plastic(0xF2F5F7)), th.x + .07, th.y, th.z, 0, 0, Math.PI / 2);
      put(g, rbox(.022, .01, .014, .003, M.plastic(0xD0453F)), th.x - .005, th.y + .002, th.z);
      cable(g, V3(th.x - .016, th.y + .002, th.z), V3(w / 2 + .003, elev + .03, .01), .0026, 0x3A4148);
      const cv = V3(-.18, .008, .12);
      put(g, rbox(.035, .016, .02, .005, M.plastic(0x5B6670)), cv.x, cv.y + .004, cv.z);
      put(g, cyl(.004, .004, .03, M.color(0x2F7DD1, .4)), cv.x + .03, cv.y + .004, cv.z, 0, 0, Math.PI / 2);
      cable(g, V3(cv.x, cv.y + .012, cv.z - .01), V3(-w / 2 - .003, elev + .05, .005), .0026, 0x3A4148);
      parts.push({key: 'c-thermo', at: V3(th.x, th.y + .02, th.z)}, {key: 'c-cvc', at: V3(cv.x, cv.y + .03, cv.z)});
    }));
  /* ProAQT: şeffaf gövdeli sensör, kırmızı musluk kolu ve kapak, beyaz kablo (üretici görseli); ana cihaz Pulsiocare */
  DEV3D.model('proaqt', pulsio(
    pulsioScreen({tech: ['ProAQT', 'Technology'], foot: '◷ Last cal. 2 h ago',
      big: [['AP', '121/64', 'mmHg', '#F0473C', 140, 90], ['MAP', '(83)', 'mmHg', '#F0473C', 105, 70], ['PR', '84', '1/min', '#F0473C', 100, 60], ['CI', '3.10', 'l/min/m²', '#F2A33A', 5, 3], ['SVI', '37', 'ml/m²', '#5BB7DE'], ['CO', '5.6', 'l/min', '#F2A33A']],
      small: [['SVV', '%', '11', '#5BB7DE'], ['PPV', '%', '12', '#5BB7DE'], ['SVRI', 'dyn·s·cm⁻⁵·m²', '1850', '#5BB7DE'], ['CPI', 'W/m²', '0.62', '#7FD18F'], ['dPmx', 'mmHg/s', '1020', '#7FD18F'], ['EAdyn', '', '0.92', '#5BB7DE'], ['SV', 'ml', '67', '#5BB7DE'], ['SVR', 'dyn·s·cm⁻⁵', '1020', '#5BB7DE']],
      cont: [['CI', '3.10', '#F2A33A', '<', '#9BD24A'], ['SVV', '11', '#5BB7DE', '^', '#F2D23A'], ['PPV', '12', '#5BB7DE', '^', '#F2D23A'], ['SVRI', '1850', '#5BB7DE', '<', '#9BD24A']]}),
    (g, {w, elev, parts}) => {
      const x = .24, y = .018, z = .1;
      put(g, rbox(.05, .024, .026, .008, M.clear(0xEAF3F6, .55)), x, y, z);
      put(g, box(.048, .006, .02, M.plastic(0xF2F5F7)), x, y - .011, z);
      put(g, nameplate('ProAQT', .034, .008, '#2B3238'), x - .002, y, z + .0135);
      put(g, cyl(.006, .006, .02, M.color(0xC9302C, .4)), x + .034, y, z, 0, 0, Math.PI / 2);
      put(g, rbox(.012, .022, .006, .003, M.color(0xC9302C, .4)), x + .034, y + .018, z);
      put(g, cyl(.006, .006, .016, M.clear(0xF0F4F6, .7)), x + .052, y, z, 0, 0, Math.PI / 2);
      put(g, cyl(.0065, .002, .03, M.color(0xC9302C, .4)), x + .075, y, z, 0, 0, -Math.PI / 2);
      g.add(tube([V3(x - .025, y, z), V3(x - .07, y - .004, z - .03), V3(x - .05, .01, z - .12), V3(x + .05, .01, z - .14)], .0035, M.plastic(0xF4F6F7)));
      put(g, cyl(.007, .005, .028, M.plastic(0xF4F6F7)), x + .062, .01, z - .14, 0, 0, Math.PI / 2);
      cable(g, V3(x + .078, .01, z - .14), V3(w / 2 + .003, elev + .06, .005), .003, 0x2E363C);
      parts.push({key: 'c-transducer', at: V3(x, y + .03, z)}, {key: 'c-art-line', at: V3(x + .07, y + .02, z)}, {key: 'c-cable', at: V3(x - .06, .03, z - .1)});
    }));
  /* Masimo LiDCO: parlak siyah Root gövde, solda boş el cihazı yuvası, sağda dikey ekran; önde beyaz LiDCO modülü (kırmızı uç) */
  DEV3D.model('lidco', {
    type: 'monitor', w: .27, h: .23, d: .1, body: 0x14171A, bezel: 0x0A0C0E, mount: 'feet', led: false, phi: 1.12,
    screenMargin: [.14, .02, .012, .02],
    /* Ekran üretici görselindeki gibi dikey: üstte zil/ses düğmeleri ve durum simgeleri, altında LiDCO başlığı; on satır trend
       (her satırda küçük ölçek, renkli trend çizgisi, PPV/SVV'de yeşil hedef bandı) ve sağda büyük sayısal değer; altta zaman
       çubuğu, en altta filtre/küre ve ayar simgeleri */
    screen: (() => {
      const rows = [['ABP', '107/60', '#E0423A', 'mmHg', 76], ['CO', '4.6', '#E0423A', 'l/min', 60], ['HR', '101', '#3FA3E8', 'bpm', 55], ['SV', '46', '#F2F4F5', 'ml', 50],
        ['SVR', '1214', '#3FCB4A', 'dyn·s/cm⁵', 55], ['PPV', '6', '#F2F4F5', '%', 40, 1], ['SVV', '9', '#F2F4F5', '%', 45, 1], ['DO₂', '1012', '#F2F4F5', 'ml/min', 50], ['SVRI', '2185', '#F2F4F5', 'dyn·s·m²/cm⁵', 50], ['CI', '2.6', '#F2F4F5', 'l/min/m²', 45]];
      const y0 = .085, rh = .084, L = [
        {t: 'box', x: .02, y: .008, w: .085, h: .04, fill: '#3A4148', r: .006}, {t: 'icon', g: 'bell', x: .035, y: .012, w: .055, h: .032, c: '#9AA3AA'},
        {t: 'box', x: .12, y: .008, w: .085, h: .04, fill: '#E6EAEC', r: .006}, {t: 'icon', g: 'play', x: .135, y: .012, w: .055, h: .032, c: '#3A4148'},
        {t: 'box', x: .44, y: .015, w: .14, h: .025, fill: '#1E78D8', r: .012}, {t: 'text', txt: 'ADULT', x: .44, y: .015, w: .14, h: .025, c: '#FFFFFF', s: .013, wt: 700, al: 'c'},
        {t: 'icon', g: 'bt', x: .6, y: .015, w: .03, h: .025, c: '#3FA3E8'}, {t: 'icon', g: 'wifi', x: .64, y: .015, w: .04, h: .025, c: '#3FCB4A'},
        {t: 'icon', g: 'battery', x: .76, y: .015, w: .05, h: .025, c: '#3FCB4A'}, {t: 'text', txt: '1:27 AM', x: .8, y: .012, w: .19, h: .03, c: '#E6EAEC', s: .016, wt: 600, al: 'r'},
        {t: 'box', x: 0, y: .056, w: 1, h: .022, fill: '#14181B'}, {t: 'text', txt: 'LiDCO', x: .01, y: .056, w: .3, h: .022, c: '#C9D0D5', s: .014, wt: 600},
        {t: 'box', x: 0, y: .93, w: 1, h: .022, fill: '#2A2F33'}, {t: 'box', x: .75, y: .933, w: .1, h: .016, fill: '#3A4148', r: .004},
        {t: 'icon', g: 'arrow', x: .02, y: .962, w: .05, h: .03, c: '#E6EAEC'}, {t: 'box', x: .1, y: .962, w: .05, h: .03, fill: '#3FA3E8', r: .015},
        {t: 'icon', g: 'gear', x: .92, y: .962, w: .06, h: .032, c: '#E6EAEC'}];
      rows.forEach(([l, v, c, u, base, band], i) => {
        const y = y0 + i * rh;
        L.push({t: 'box', x: 0, y: y + rh - .002, w: 1, h: .002, fill: '#1C2226'},
          {t: 'text', txt: l, x: .935, y: y + .01, w: .065, h: .02, c, s: .011, wt: 600, pad: 0},
          {t: 'text', txt: u.slice(0, 6), x: .935, y: y + .03, w: .065, h: .02, c: '#9AA3AA', s: .009, wt: 500, pad: 0},
          {t: 'text', txt: v, x: .55, y: y + (i ? .015 : .005), w: .38, h: rh * (i ? .7 : .45), c, s: i ? .046 : .03, wt: 500, al: 'r'},
          {t: 'trend', x: .005, y: y + .006, w: .72, h: rh - .012, max: 100, yt: [100, base > 60 ? 50 : 30, 0].slice(0, 2), lines: i ? [{c, base, amp: band ? 10 : 2, seed: i}] : [{c, base: 84, amp: 1.5, seed: 1}, {c, base: 72, amp: 1.5, seed: 2}, {c: '#F2F4F5', base: 77, amp: 1.5, seed: 3}], band: band ? [base - 10, base + 8] : null, bandFill: 'rgba(110,160,60,.35)', lc: '#6F8796'});
      });
      L.push({t: 'text', txt: '83', x: .55, y: y0 + .042, w: .38, h: .035, c: '#F2F4F5', s: .03, wt: 600, al: 'r'});
      return {bg: '#000000', layout: L};
    })(),
    extra(g, {body, w, h, d, elev, parts}) {
      /* el cihazı yuvası (Radical-7 için) */
      put(body, rbox(.1, h - .03, .012, .03, M.matte(0x060708, .25)), -w / 2 + .07, -.002, d / 2 - .002);
      for (let k = 0; k < 10; k++) put(body, box(.003, .003, .002, M.metal(0xC9A646)), -w / 2 + .055 + k * .0035, h / 2 - .045, d / 2 + .005);
      put(body, nameplate('Masimo', .04, .008, '#E0423A'), w / 2 - .03, h / 2 - .01, d / 2 + .003);
      parts.push({key: 'mount', at: V3(-w / 2 + .07, elev + h * .45, d / 2 + .01)});
      /* LiDCO modülü */
      const mx = .02, my = .02, mz = d / 2 + .1;
      put(g, rbox(.1, .028, .05, .01, M.plastic(0xF2F4F5)), mx, my, mz);
      put(g, rbox(.012, .03, .052, .004, M.color(0xC9302C, .4)), mx + .054, my, mz);
      put(g, nameplate('Masimo | LiDCO', .06, .008, '#5B6670'), mx - .005, my + .0145, mz, -Math.PI / 2);
      cable(g, V3(mx - .05, my, mz), V3(-w / 2 - .003, elev + .03, 0), .0035, 0xC9D0D5);
      parts.push({key: 'module', at: V3(mx, my + .03, mz)});
      transducerKit(g, {at: V3(.2, 0, .18), to: V3(mx + .062, my, mz), parts, dome: 0x2F7DD1, cableCol: 0xC9D0D5});
    }
  });
  /* Argos: koyu antrasit çerçeve, üstte yassı tutamak çıkıntısı, sağ üstte logo (üretici görseli); direk montaj */
  DEV3D.model('argos', {
    type: 'monitor', w: .3, h: .23, d: .06, body: 0x2A2E33, bezel: 0x101316, mount: 'stand', led: false, phi: 1.12,
    screenMargin: [.042, .045, .042, .025],
    /* Ekran üretici görselinde kısmen görünüyor: koyu zeminde satırlar; üstte beyaz BP dalgası (küçük ölçekli), sağda "BP 128 / 60
       (82) mmHg"; altında yeşil HR trendi ve sağda HR değeri. Görünmeyen alt satırlar aynı düzenle CO/SV ve PPV trendi olarak sürer. */
    screen: (() => {
      const L = [], rows = [
        ['BP', '128 / 60', '(82)', 'mmHg', '#F2F4F5'], ['HR', '60', '', '1/min', '#A6E05A'], ['CO', '5.2', '', 'L/min', '#5BB7DE'], ['SV', '74', 'PPV 8 %', 'mL', '#F2C531']];
      rows.forEach(([l, v, sub, u, c], i) => {
        const y = i * .225;
        if (i) L.push({t: 'box', x: .01, y: y - .004, w: .98, h: .003, fill: '#3A4148'});
        L.push({t: 'text', txt: i ? '100' : '160', x: .01, y: y + .01, w: .05, h: .04, c: '#9AA3AA', s: .028, wt: 500},
          {t: 'text', txt: i ? '0' : '40', x: .01, y: y + .16, w: .05, h: .04, c: '#9AA3AA', s: .028, wt: 500},
          {t: 'box', x: .06, y: y + .02, w: .003, h: .17, fill: '#9AA3AA'}, {t: 'box', x: .06, y: y + .19, w: .6, h: .003, fill: '#9AA3AA'},
          {t: 'text', txt: '0:00:00', x: .06, y: y + .195, w: .1, h: .025, c: '#9AA3AA', s: .02, wt: 500}, {t: 'text', txt: '0:00:00', x: .56, y: y + .195, w: .1, h: .025, c: '#9AA3AA', s: .02, wt: 500, al: 'r'},
          {t: 'text', txt: l, x: .69, y: y + .01, w: .2, h: .06, c, s: .055, wt: 700},
          {t: 'text', txt: v, x: .67, y: y + .06, w: .32, h: .08, c, s: i === 0 ? .07 : .09, wt: 600, al: i ? 'r' : 'c'},
          {t: 'text', txt: u, x: .8, y: y + .17, w: .19, h: .04, c: '#C9D0D5', s: .025, wt: 500, al: 'r'});
        if (sub) L.push({t: 'text', txt: sub, x: .67, y: y + .13, w: .32, h: .05, c: i ? '#F2C531' : c, s: i ? .04 : .05, wt: 600, al: 'c'});
        if (i === 0) L.push({t: 'wave', k: 'art', c, x: .07, y: y + .02, w: .58, h: .16, span: 5, amp: .5, lw: .006});
        else L.push({t: 'trend', x: .065, y: y + .02, w: .59, h: .17, max: 100, lines: [{c, base: [0, 55, 52, 48][i], amp: 3, seed: i, spike: i === 1 ? .2 : 0, spikeH: 15}]});
      });
      L.push({t: 'box', x: 0, y: .91, w: 1, h: .09, fill: '#14181B'}, {t: 'text', txt: '10:42', x: .8, y: .91, w: .19, h: .09, c: '#C9D0D5', s: .04, wt: 600, al: 'r'},
        {t: 'icon', g: 'battery', x: .02, y: .925, w: .06, h: .06, c: '#A6E05A'}, {t: 'icon', g: 'bell', x: .1, y: .925, w: .05, h: .06, c: '#C9D0D5'});
      return {bg: '#1F2427', layout: L};
    })(),
    extra(g, {body, w, h, d, elev, parts}) {
      put(body, rbox(w * .6, .03, d * .6, .012, M.matte(0x2A2E33)), 0, h / 2 - .005, -d * .1);
      put(body, nameplate('Argos', .045, .012, '#E6EAEC'), w / 2 - .055, h / 2 - .02, d / 2 + .002);
      put(g, box(.06, .03, .03, M.matte(0x2A2E33)), 0, .05, -.005);
      transducerKit(g, {at: V3(.24, 0, .1), to: V3(w / 2 + .003, elev + .05, 0), parts, dome: 0x2F7DD1});
    }
  });
  /* HemoSphere ekranı (üretici görseli, 4:3): solda koyu gri hücreli gezinme sütunu (hasta, klinik araçlar, hedef; altta ayarlar ve
     kırmızı alarm susturma zili), üstte ince ayraçlı sensör adı, sağda durum simgeleri, iki satır tarih/saat ve (varsa) HPI kutusu;
     ortada 2×2 koyu gri kutu. Her kutuda kalın kırmızı-sarı-yeşil hedef bölgeli 270° gösterge, içte ince sarı hedef çizgisi,
     dışta beyaz nokta ölçeği ve %20'lik ölçek sayıları, beyaz kalem ucu biçimli işaretçi; ortada büyük değer, altında parametre adı,
     sol altta birim. Doku oksimetrisinde (side) sol üstte kafa simgesi + kanal kutusu, sağ üstte sinyal çubukları, solda büyük L/R.
     o: {sensor, hpi, tiles:[{l, v, u, min, max, z:[kırmızı|sarı, sarı|yeşil, yeşil|sarı, sarı|kırmızı], side:'L'|'R', ch, sub}]} */
  function hsScreen(o) {
    const TX = [.118, .553], TY = [.138, .56], TW = .414, TH = .405, tiles = o.tiles.slice(0, 4), NAV = '#2A2A2D';
    const layout = [
      {t: 'box', x: .016, y: .03, w: .078, h: .94, fill: '#111113'},
      ...[.034, .128, .222, .778, .872].map(y => ({t: 'box', x: .019, y, w: .072, h: .09, fill: NAV, r: .004})),
      {t: 'box', x: .019, y: .316, w: .072, h: .458, fill: '#1E1E21', r: .004},
      {t: 'box', x: .144, y: .035, w: .0016, h: .075, fill: '#4A4C50'},
      {t: 'text', txt: o.sensor, x: .148, y: .038, w: .36, h: .05, c: '#F2F4F5', s: .027, wt: 600},
      {t: 'box', x: .549, y: .035, w: .0014, h: .075, fill: '#2C2D30'},
      {t: 'icon', g: 'battery', x: .655, y: .034, w: .034, h: .04, c: '#41C74A'},
      {t: 'icon', g: 'lock', x: .808, y: .036, w: .022, h: .034, c: '#E6EAEC'},
      {t: 'text', txt: '06/10/2026', x: .838, y: .03, w: .085, h: .026, c: '#E6EAEC', s: .0165, wt: 600, al: 'c', pad: 0},
      {t: 'text', txt: '10:42:17', x: .838, y: .055, w: .085, h: .026, c: '#E6EAEC', s: .0165, wt: 600, al: 'c', pad: 0}
    ];
    if (o.hpi != null) layout.push(
      {t: 'box', x: .8, y: .086, w: .12, h: .042, stroke: '#E6EAEC', fill: '#000000', r: .004, lw: .003},
      {t: 'text', txt: `HPI ${o.hpi} /100`, x: .8, y: .086, w: .12, h: .042, c: '#FFFFFF', s: .028, wt: 700, al: 'c', pad: 0},
      {t: 'box', x: .928, y: .088, w: .044, h: .038, stroke: '#9AA3AA', r: .004, lw: .002},
      {t: 'text', txt: '20 sec', x: .928, y: .088, w: .044, h: .038, c: '#D9DDE0', s: .016, wt: 600, al: 'c', pad: 0});
    tiles.forEach((tl, i) => {
      const x = TX[i % 2], y = TY[Math.floor(i / 2)];
      layout.push({t: 'box', x, y, w: TW, h: TH, fill: '#2B2B2E', r: .006});
      if (tl.u) layout.push({t: 'text', txt: tl.u, x: x + .002, y: y + TH - .05, w: .14, h: .045, c: '#E6EAEC', s: .024, wt: 600});
      if (tl.side) layout.push({t: 'text', txt: tl.side, x: x + .008, y: y + TH * .4, w: .07, h: .13, c: '#F2F4F5', s: .085, wt: 400});
      if (tl.ch) layout.push({t: 'box', x: x + .067, y: y + .025, w: .036, h: .045, stroke: '#D9DDE0', fill: '#1A1A1C', r: .005, lw: .003},
        {t: 'text', txt: tl.ch, x: x + .067, y: y + .025, w: .036, h: .045, c: '#F2F4F5', s: .024, wt: 700, al: 'c', pad: 0});
    });
    return {bg: '#000000', layout, draw(g, t, api) {
      const {W, H, txt, GL} = api, ZC = ['#E5302B', '#E8DC2A', '#45CF3A', '#E8DC2A', '#E5302B'];
      const ang = f => (135 + 270 * f) * Math.PI / 180, P = (cx, cy, a, r) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
      tiles.forEach((tl, i) => {
        const X = TX[i % 2] * W, Y = TY[Math.floor(i / 2)] * H, w = TW * W, h = TH * H, cx = X + w / 2, cy = Y + h * .47, r = h * .3, th = h * .085;
        const fr = v => Math.max(0, Math.min(1, (v - tl.min) / (tl.max - tl.min))), cuts = [0, ...tl.z.map(fr), 1];
        /* kalın bölge halkası (bölgeler arasında ince koyu ayraç) */
        g.lineWidth = th; g.lineCap = 'butt';
        for (let k = 0; k < 5; k++) { if (cuts[k + 1] <= cuts[k]) continue; g.strokeStyle = ZC[k]; g.beginPath(); g.arc(cx, cy, r, ang(cuts[k]), ang(cuts[k + 1])); g.stroke(); }
        /* içte ince sarı hedef çizgisi (sarı-yeşil-sarı aralığı) */
        const c1 = cuts[1], c4 = cuts[4];
        if (c4 > c1) { g.strokeStyle = '#E8DC2A'; g.lineWidth = Math.max(1.5, h * .008); g.beginPath(); g.arc(cx, cy, r - th * .72, ang(c1), ang(c4)); g.stroke(); }
        /* nokta ölçeği ve %20'lik ölçek sayıları */
        const dec = tl.max <= 20 ? 1 : 0;
        for (let k = 0; k <= 25; k++) {
          const f = k / 25, a = ang(f);
          if (k % 5) { const [px, py] = P(cx, cy, a, r + th * 1.05); g.fillStyle = '#F2F4F5'; g.beginPath(); g.arc(px, py, Math.max(1.2, h * .0075), 0, 7); g.fill(); }
          else { const v = tl.min + (tl.max - tl.min) * f, [px, py] = P(cx, cy, a, r + th * 1.12); txt(dec ? v.toFixed(1) : Math.round(v), px, py, {c: '#D9DDE0', s: .0155, wt: 600, al: 'c'}); }
        }
        /* değer işaretçisi: beyaz kalem ucu, halkanın dış kenarına binmiş */
        const fv = fr(parseFloat(tl.v)) + .003 * Math.sin(t * .8 + i), a = ang(fv), R1 = r - th * .25, Rm = r + th * .45, R2 = r + th * 1.0;
        g.beginPath(); g.moveTo(...P(cx, cy, a, R1)); g.lineTo(...P(cx, cy, a + .075, Rm)); g.lineTo(...P(cx, cy, a + .05, R2)); g.lineTo(...P(cx, cy, a - .05, R2)); g.lineTo(...P(cx, cy, a - .075, Rm)); g.closePath();
        g.fillStyle = '#FFFFFF'; g.fill(); g.strokeStyle = '#6E7377'; g.lineWidth = Math.max(1, h * .004); g.stroke();
        g.strokeStyle = '#9AA0A5'; g.beginPath(); g.moveTo(...P(cx, cy, a, R1 + th * .2)); g.lineTo(...P(cx, cy, a, R2 - th * .1)); g.stroke();
        g.font = api.F(400, .088); const vs = .088 * Math.min(1, (r - th * .62) * 1.45 / g.measureText(String(tl.v)).width);
        txt(tl.v, cx, cy - (tl.sub ? r * .06 : 0), {c: '#FFFFFF', s: vs, wt: 400, al: 'c'});
        if (tl.sub) String(tl.sub).split('\n').forEach((s, k) => txt(s, cx, cy + r * (.36 + k * .17), {c: '#B9BFC4', s: .02, wt: 500, al: 'c'}));
        txt(tl.l, cx, cy + r * 1.08, {c: '#FFFFFF', s: .046, wt: 400, al: 'c'});
        if (tl.side) {
          /* doku oksimetrisi: kafa simgesi (yeşil sensör noktası) ve sinyal kalitesi çubukları */
          const hx = X + w * .085, hy = Y + h * .1, hr = h * .042;
          const gr = g.createLinearGradient(0, hy - hr, 0, hy + hr * 3); gr.addColorStop(0, '#8A9095'); gr.addColorStop(1, '#3A3D40');
          g.fillStyle = gr; g.beginPath(); g.ellipse(hx, hy, hr * .85, hr, 0, 0, 7); g.fill();
          g.beginPath(); g.moveTo(hx - hr * 1.9, hy + hr * 2.6); g.quadraticCurveTo(hx - hr * 1.7, hy + hr * 1.1, hx, hy + hr * 1.1); g.quadraticCurveTo(hx + hr * 1.7, hy + hr * 1.1, hx + hr * 1.9, hy + hr * 2.6); g.fill();
          g.fillStyle = '#41D07A'; g.beginPath(); g.ellipse(hx - hr * .1, hy - hr * .35, hr * .32, hr * .42, 0, 0, 7); g.fill();
          for (let k = 0; k < 4; k++) { g.fillStyle = '#F2F4F5'; const bh = h * (.03 + k * .016); g.fillRect(X + w * (.865 + k * .027), Y + h * .135 - bh, w * .017, bh); }
        }
      });
      /* gezinme sütunu simgeleri */
      const nx = W * .055, cy0 = [.079, .173, .267, .823, .917].map(f => f * H), s = H * .03;
      /* hasta: büst + kalem */
      g.fillStyle = '#B98E72'; g.beginPath(); g.arc(nx - s * .25, cy0[0] - s * .3, s * .38, 0, 7); g.fill();
      g.fillStyle = '#7A5F52'; g.beginPath(); g.ellipse(nx - s * .25, cy0[0] + s * .55, s * .7, s * .42, 0, Math.PI, 0); g.fill();
      g.strokeStyle = '#F2F4F5'; g.lineWidth = s * .2; g.lineCap = 'round'; g.beginPath(); g.moveTo(nx + s * .25, cy0[0] - s * .55); g.lineTo(nx + s * .75, cy0[0] - s * .05); g.stroke();
      g.beginPath(); g.moveTo(nx + s * .2, cy0[0] + s * .45); g.lineTo(nx + s * .7, cy0[0] + s * .6); g.stroke(); g.lineCap = 'butt';
      /* klinik araçlar: eksenler + turuncu eğri */
      g.strokeStyle = '#F2F4F5'; g.lineWidth = s * .12; g.beginPath(); g.moveTo(nx - s * .7, cy0[1] - s * .75); g.lineTo(nx - s * .7, cy0[1] + s * .7); g.lineTo(nx + s * .8, cy0[1] + s * .7); g.stroke();
      g.strokeStyle = '#E2563A'; g.lineWidth = s * .13; g.beginPath(); g.moveTo(nx - s * .55, cy0[1] + s * .45); g.quadraticCurveTo(nx - s * .3, cy0[1] - s * .9, nx, cy0[1] - s * .1); g.quadraticCurveTo(nx + s * .25, cy0[1] + s * .45, nx + s * .65, cy0[1] + s * .2); g.stroke();
      g.fillStyle = '#F2F4F5'; g.beginPath(); g.arc(nx + s * .1, cy0[1] + s * .45, s * .16, 0, 7); g.fill();
      /* hedef: beyaz halka + çentikler, yeşil merkez */
      g.strokeStyle = '#F2F4F5'; g.lineWidth = s * .11; g.beginPath(); g.arc(nx, cy0[2], s * .55, 0, 7); g.stroke();
      [0, 1, 2, 3].forEach(k => { const a = k * Math.PI / 2; g.beginPath(); g.moveTo(nx + Math.cos(a) * s * .4, cy0[2] + Math.sin(a) * s * .4); g.lineTo(nx + Math.cos(a) * s * .8, cy0[2] + Math.sin(a) * s * .8); g.stroke(); });
      g.fillStyle = '#41D07A'; g.beginPath(); g.arc(nx, cy0[2], s * .2, 0, 7); g.fill();
      /* ayarlar: iki dişli */
      GL.gear(nx - s * .15, cy0[3] - s * .1, s * .62, '#E6EAEC'); GL.gear(nx + s * .5, cy0[3] + s * .45, s * .32, '#B9BFC4');
      /* alarm susturma: kırmızı zil + çapraz */
      GL.bell(nx, cy0[4], s * .75, '#E8484A');
      g.strokeStyle = '#E8484A'; g.lineWidth = s * .12; g.beginPath(); g.moveTo(nx - s * .75, cy0[4] - s * .7); g.lineTo(nx + s * .75, cy0[4] + s * .75); g.stroke();
      /* üst satır simgeleri: kamera, parlaklık, ses, saat/görünüm, ızgara menü */
      const iy = H * .054, ic = '#E6EAEC';
      g.fillStyle = ic; g.fillRect(W * .7, iy - H * .011, W * .02, H * .022); g.fillStyle = '#000'; g.beginPath(); g.arc(W * .71, iy, H * .006, 0, 7); g.fill();
      g.strokeStyle = ic; g.lineWidth = H * .003; g.beginPath(); g.arc(W * .742, iy, H * .007, 0, 7); g.stroke();
      for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; g.beginPath(); g.moveTo(W * .742 + Math.cos(a) * H * .011, iy + Math.sin(a) * H * .011); g.lineTo(W * .742 + Math.cos(a) * H * .016, iy + Math.sin(a) * H * .016); g.stroke(); }
      g.fillStyle = ic; g.beginPath(); g.moveTo(W * .768, iy - H * .004); g.lineTo(W * .774, iy - H * .004); g.lineTo(W * .783, iy - H * .012); g.lineTo(W * .783, iy + H * .012); g.lineTo(W * .774, iy + H * .004); g.lineTo(W * .768, iy + H * .004); g.fill();
      g.beginPath(); g.arc(W * .937, iy, H * .011, 0, 7); g.stroke(); g.beginPath(); g.moveTo(W * .937, iy - H * .007); g.lineTo(W * .937, iy); g.lineTo(W * .942, iy + H * .004); g.stroke();
      for (let a = 0; a < 2; a++) for (let b = 0; b < 3; b++) g.fillRect(W * (.958 + a * .011), iy - H * .015 + b * H * .011, W * .008, H * .008);
    }};
  }

  /* BD HemoSphere (üretici görseli; ~31.5 × 26.5 × 13 cm gövde): açık gri, yumuşak yuvarlatılmış kabuk; önü neredeyse tamamen
     parlak siyah cam (üstte ortada Edwards Lifesciences yazısı, alt kenarda ortada krom çerçeveli yamuk güç tuşu), üst kenarın
     önünde yamuk buzlu alarm ışık bandı; arkada geriye yatık geniş tutamak, arkada çıkıntılı arka kabuk (havalandırma yarıkları,
     montaj göbeği, bağlantı paneli, etiket, güç kablosu); sol yanda iki modül yuvası (biri dolu), sağ yanda renkli yakalı kablo
     portları, USB ve pil kapağı; altta gövdeyi taşıyan beyaz kaide (önde çıkıntılı burun, yanlarda kulaklar, lastik ayaklar).
     FloTrac / Acumen IQ / ClearSight / Swan-Ganz: aynı ana monitör + önde ilgili kit; her biri kendi parametreleriyle aynı ekran düzeni. */
  T('c-power', {tr: ['Güç düğmesi', 'Monitörü açar ve kapatır; açılışta güç açma öz testi (POST) yapılır.'], en: ['Power button', 'Switches the monitor on and off; a power-on self test (POST) runs at start-up.'], es: ['Botón de encendido', 'Enciende y apaga el monitor; al arrancar se realiza la autoprueba de encendido (POST).']});
  T('c-rear', {tr: ['Arka bağlantı paneli', 'Güç girişi ile ağ, veri ve görüntü/analog çıkış bağlantılarını taşır; havalandırma yarıkları kapatılmamalıdır.'], en: ['Rear connector panel', 'Carries the power inlet and network, data and video/analog output connections; the ventilation slots must not be covered.'], es: ['Panel de conexiones trasero', 'Contiene la entrada de alimentación y las conexiones de red, datos y salida de vídeo/analógica; las rejillas de ventilación no deben taparse.']});
  /* Yuvarlak köşeli dikdörtgen yol (delik olarak da kullanılır) ve yumuşak kenarlı (yastık) blok */
  function rrect(w, h, r, p = new THREE.Shape(), cx = 0, cy = 0) {
    const x = w / 2 - r, y = h / 2 - r; p.moveTo(cx - x, cy - h / 2); p.lineTo(cx + x, cy - h / 2); p.absarc(cx + x, cy - y, r, -Math.PI / 2, 0, false); p.lineTo(cx + w / 2, cy + y);
    p.absarc(cx + x, cy + y, r, 0, Math.PI / 2, false); p.lineTo(cx - x, cy + h / 2); p.absarc(cx - x, cy + y, r, Math.PI / 2, Math.PI, false); p.lineTo(cx - w / 2, cy - y); p.absarc(cx - x, cy - y, r, Math.PI, Math.PI * 1.5, false); return p;
  }
  function pillow(w, h, d, r, b, mat, seg = 5) {
    const geo = new THREE.ExtrudeGeometry(rrect(w - 2 * b, h - 2 * b, Math.max(.001, r - b)), {depth: Math.max(.0005, d - 2 * b), bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: seg, curveSegments: 10});
    geo.translate(0, 0, -Math.max(.0005, d - 2 * b) / 2); const m = new THREE.Mesh(geo, mat); m.castShadow = m.receiveShadow = true; return m;
  }
  /* Yan yüze yapışık levha: yz düzleminde yuvarlak köşeli, x yönünde t kalınlık; s = -1 sol, +1 sağ (dışa doğru büyür) */
  const sidePlate = (dz, hy, r, t, mat, s = -1) => { const m = new THREE.Mesh(new THREE.ExtrudeGeometry(rrect(dz, hy, r), {depth: t, bevelEnabled: false, curveSegments: 6}), mat); m.rotation.y = s * Math.PI / 2; m.castShadow = m.receiveShadow = true; const gp = new THREE.Group(); gp.add(m); return gp; };
  /* Düz ön yüze yapışık yamuk (alt genişlik a, üst b, yükseklik h, kalınlık t) */
  const trap = (a, b, h, t, mat) => { const s = new THREE.Shape(); s.moveTo(-a / 2, 0); s.lineTo(a / 2, 0); s.lineTo(b / 2, h); s.lineTo(-b / 2, h); s.lineTo(-a / 2, 0); return new THREE.Mesh(new THREE.ExtrudeGeometry(s, {depth: t, bevelEnabled: false}), mat); };
  function hsBody(g, o) {
    /* kaide yüksekliği için gövdeyi biraz yükselt (kitler o.elev'i kullanır) */
    const dy = .009; o.body.position.y += dy; o.elev += dy; o.parts.forEach(p => { p.at.y += dy; });
    const {body, w, h, d, elev, parts} = o, late = [], P5 = {};
    body.remove(body.children[0], body.children[1]); /* kurucunun düz kabuğu ve çerçevesi yerine */
    const shellM = M.plastic(0xD5D8DB, .42), lightM = M.plastic(0xEEF0F2, .35), darkM = M.matte(0x2A2E33, .6), blackM = M.matte(0x0B0C0E, .55);
    /* ön kabuk + parlak beyaz iç kenar şeridi + siyah cam */
    body.add(pillow(w, h, d, .028, .0065, shellM, 6));
    /* yan yüzlerde ince ayırma çizgisi (ön çerçeve | gövde) */
    const seam = rrect(w + .0004, h + .0004, .0282); seam.holes.push(rrect(w - .003, h - .003, .0265, new THREE.Path()));
    put(body, new THREE.Mesh(new THREE.ExtrudeGeometry(seam, {depth: .0009, bevelEnabled: false, curveSegments: 10}), M.matte(0x9AA0A6, .6)), 0, 0, d / 2 - .021);
    const gw = w - .021, gh = h - .0175, gy = -.0022, gr = .017, z0 = d / 2;
    const rs = rrect(gw + .0034, gh + .0034, gr + .0017); rs.holes.push(rrect(gw, gh, gr, new THREE.Path()));
    const rim = new THREE.Mesh(new THREE.ShapeGeometry(rs, 10), M.plastic(0xF7F8F9, .25));
    put(body, rim, 0, gy, z0 + .0003);
    const glass = new THREE.Mesh(new THREE.ExtrudeGeometry(rrect(gw, gh, gr), {depth: .0018, bevelEnabled: false, curveSegments: 10}), std0(0x040506, .09));
    put(body, glass, 0, gy, z0 + .0002);
    const gz = z0 + .002; /* cam ön yüzü */
    /* logo yazısı (kutulu E + serif yazı) */
    const logo = decal(.09, .011, (c, W, Hh) => {
      c.strokeStyle = '#E6EAEC'; c.lineWidth = Hh * .07; c.strokeRect(Hh * .08, Hh * .08, Hh * .84, Hh * .84);
      c.fillStyle = '#E6EAEC'; c.font = `600 ${Math.round(Hh * .8)}px Georgia, "Times New Roman", serif`; c.textBaseline = 'middle'; c.textAlign = 'center'; c.fillText('E', Hh * .5, Hh * .55);
      c.textAlign = 'left'; c.font = `500 ${Math.round(Hh * .74)}px Georgia, "Times New Roman", serif`;
      const tw = c.measureText('Edwards Lifesciences').width, sx = Math.min(1, (W - Hh * 1.35) / tw);
      c.save(); c.translate(Hh * 1.25, Hh * .55); c.scale(sx, 1); c.fillText('Edwards Lifesciences', 0, 0); c.restore();
    }, 768);
    put(body, logo, .002, h / 2 - .0185, gz + .0003);
    /* güç tuşu: krom yamuk çerçeve, koyu bronz yüz, güç simgesi */
    const pbz = gz;
    put(body, trap(.047, .033, .0128, .0012, M.chrome()), 0, gy - gh / 2 + .0004, pbz);
    put(body, trap(.041, .029, .0098, .0016, M.metal(0x5A524C, .35)), 0, gy - gh / 2 + .0012, pbz);
    const pic = decal(.007, .007, (c, W, Hh) => { c.strokeStyle = '#C9CDD0'; c.lineWidth = W * .1; c.beginPath(); c.arc(W / 2, Hh / 2 + Hh * .04, W * .3, -Math.PI * .3, Math.PI * 1.3); c.stroke(); c.beginPath(); c.moveTo(W / 2, Hh * .12); c.lineTo(W / 2, Hh * .5); c.stroke(); }, 64);
    put(body, pic, 0, gy - gh / 2 + .0062, pbz + .0017);
    late.push({key: 'c-power', at: V3(0, elev + h / 2 + gy - gh / 2 + .007, z0 + .012)});
    /* alt kenarda iki açık gri mandal dili */
    [-1, 1].forEach(s => put(body, rbox(.026, .004, .008, .0015, lightM), s * .048, -h / 2 + .0015, z0 - .006));
    /* üstte yamuk buzlu alarm ışık bandı (önde geniş) */
    const lens = trap(.056, .04, .02, .0022, M.plastic(0xF4F7F8, .22)); lens.material.emissive && lens.material.emissive.set(0x3C4446);
    put(body, lens, 0, h / 2 - .0006, z0 - .0055, -Math.PI / 2);
    P5.alarm = ({key: 'alarm', at: V3(0, elev + h + .01, z0 - .015)});
    /* arka kabuk (çıkıntılı, biraz alçak) */
    const rd = .05, rz = -d / 2 - rd / 2 + .01, rH = h * .8, rW = w * .82, ryc = -h * .05, back = rz - rd / 2;
    put(body, pillow(rW, rH, rd, .032, .012, shellM, 5), 0, ryc, rz);
    /* geriye yatık geniş tutamak: kemer + delik, üst barın altında lastik kavrama */
    const hg = new THREE.Group(); put(body, hg, 0, h / 2 - .012, -d / 2 + .02, -1.22);
    const HW = .088, HH = .056, hs = new THREE.Shape(); hs.moveTo(-HW - .008, 0); hs.lineTo(-HW, HH - .022); hs.absarc(-HW + .022, HH - .022, .022, Math.PI, Math.PI / 2, true); hs.lineTo(HW - .022, HH); hs.absarc(HW - .022, HH - .022, .022, Math.PI / 2, 0, true); hs.lineTo(HW + .008, 0); hs.lineTo(-HW - .008, 0);
    hs.holes.push(rrect(HW * 2 - .034, HH - .029, .01, new THREE.Path(), 0, .014 + (HH - .029) / 2));
    const hm = new THREE.Mesh(new THREE.ExtrudeGeometry(hs, {depth: .014, bevelEnabled: true, bevelThickness: .004, bevelSize: .004, bevelSegments: 4, curveSegments: 12}), M.plastic(0xDADDE0, .4)); hm.castShadow = true;
    put(hg, hm, 0, 0, -.007);
    put(hg, rbox(HW * 1.4, .005, .016, .002, M.rubber(0xA3A9AE)), 0, HH - .0165, 0);
    P5.handle = ({key: 'handle', at: V3(0, elev + h + .03, -d / 2 - .02)});
    /* arka yüz: havalandırma yarıkları */
    const ventG = new THREE.BoxGeometry(.018, .0028, .002), ventM = M.matte(0x5E656B, .7);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) { const m = new THREE.Mesh(ventG, ventM); m.position.set(-.088 + c * .022, ryc + rH * .3 - r * .008, back - .0002); body.add(m); }
    /* montaj göbeği (direk kelepçesi arayüzü) ve vidaları */
    put(body, cyl(.034, .036, .006, lightM, 40), 0, ryc + .005, back - .002, Math.PI / 2);
    const scrG = new THREE.CylinderGeometry(.0028, .0028, .002, 14), scrM = M.metal(0x9AA2A8, .35);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => { const m = new THREE.Mesh(scrG, scrM); m.rotation.x = Math.PI / 2; m.position.set(a * .0185, ryc + .005 + b * .0185, back - .0055); body.add(m); });
    /* bağlantı paneli: güç girişi, eşpotansiyel saplama, ağ, USB, HDMI, analog girişler */
    const py = ryc - rH * .32, pz = back - .0004;
    put(body, rplate(.17, .04, .006, darkM), 0, py, pz, 0, Math.PI, 0);
    put(body, rbox(.026, .02, .006, .003, blackM), .062, py, pz - .002);
    [-1, 0, 1].forEach(k => put(body, cyl(.0012, .0012, .004, M.metal(), 8), .062 + k * .006, py + (k ? -.002 : .004), pz - .005, Math.PI / 2));
    put(body, cyl(.003, .003, .008, M.metal(0xC9A14A, .3), 16), .036, py + .008, pz - .004, Math.PI / 2);
    put(body, box(.014, .012, .004, blackM), .014, py, pz - .002); put(body, box(.008, .002, .0045, M.metal()), .014, py + .003, pz - .0025);
    [-.006, -.02].forEach(x => { put(body, box(.012, .005, .004, blackM), x, py + .006, pz - .002); put(body, box(.009, .0016, .0045, M.color(0x2F7DD1, .4)), x, py + .006, pz - .0025); });
    put(body, box(.015, .006, .004, blackM), -.013, py - .007, pz - .002);
    [-.042, -.056, -.07].forEach((x, k) => put(body, cyl(.0035, .0035, .005, M.color([0xF2F5F7, 0x2F7DD1, 0x2E9E58][k], .4), 16), x, py, pz - .0025, Math.PI / 2));
    const plab = decal(.17, .008, (c, W, Hh) => { c.fillStyle = '#C9D0D5'; c.font = `600 ${Math.round(Hh * .62)}px Arial, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; [['100-240 V~', .135], ['ETH', .418], ['USB · HDMI', .577], ['ANALOG IN', .79], ['ECG', .915]].forEach(([s, u]) => c.fillText(s, W * u, Hh / 2)); }, 768);
    put(body, plab, 0, py - .016, pz - .0003, 0, Math.PI, 0);
    /* etiket plakası */
    const tag = decal(.07, .03, (c, W, Hh) => { c.fillStyle = '#F4F6F7'; c.fillRect(0, 0, W, Hh); c.fillStyle = '#2B3238'; c.font = `700 ${Math.round(Hh * .2)}px Arial, sans-serif`; c.fillText('HemoSphere', W * .06, Hh * .3); c.font = `500 ${Math.round(Hh * .12)}px Arial, sans-serif`; ['Advanced Monitor', 'Edwards Lifesciences', '100-240 V~ 50/60 Hz'].forEach((s, k) => c.fillText(s, W * .06, Hh * (.52 + k * .17))); }, 384);
    put(body, tag, -.07, ryc + .01, back - .0006, 0, Math.PI, 0);
    /* güç kablosu (arka girişten yere) */
    g.add(tube([V3(.062, elev + h / 2 + py, back - .006), V3(.064, elev + h / 2 + py - .006, back - .03), V3(.07, .012, back - .07), V3(.09, .004, back - .16)], .0032, M.matte(0x2A2E33, .6)));
    late.push({key: 'c-rear', at: V3(0, elev + h / 2 + py + .02, back - .02)});
    /* sol yan: koyu modül yuvası çerçevesi, üstte dolu modül (renkli yakalı konnektör, kilit), altta boş kapak */
    const L = -w / 2 + .0015, mz = .002;
    put(body, sidePlate(.062, .16, .006, .0015, darkM), L, h * -.03, mz);
    put(body, sidePlate(.057, .074, .005, .005, M.plastic(0xE4E7EA, .4)), L - .0015, h * .135, mz);
    put(body, cyl(.0078, .0078, .006, M.color(0x2F9E6E, .4), 24), -w / 2 - .008, h * .12, d * .2, 0, 0, Math.PI / 2);
    put(body, cyl(.0052, .0052, .0062, blackM, 20), -w / 2 - .0081, h * .12, d * .2, 0, 0, Math.PI / 2);
    put(body, rbox(.004, .012, .02, .0015, darkM), -w / 2 - .0068, h * .21, -.012);
    const mlab = decal(.03, .006, (c, W, Hh) => { c.fillStyle = '#3A4148'; c.font = `700 ${Math.round(Hh * .75)}px Arial, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('OXIMETRY', W / 2, Hh / 2); }, 256);
    put(body, mlab, -w / 2 - .0053, h * .07, d * .02, 0, -Math.PI / 2, 0);
    put(body, sidePlate(.057, .072, .005, .0035, M.plastic(0xC9CED2, .45)), L - .0015, h * -.185, mz);
    for (let k = 0; k < 5; k++) put(body, box(.0015, .045, .0025, M.plastic(0xB7BDC2, .5)), -w / 2 - .0042, h * -.185, mz - .012 + k * .006);
    P5.module = ({key: 'module', at: V3(-w / 2 - .02, elev + h * .7, 0)});
    /* sağ yan: koyu port paneli (3 renkli yakalı konnektör, kitlerin kablo uçları hsTo), üstte pil kapağı ve USB */
    const R = w / 2 - .0015;
    put(body, sidePlate(.04, .1, .006, .0015, darkM, 1), R, -h * .2 + .03, d * .1);
    [0x2F9E6E, 0x2F7DD1, 0xF2C531].forEach((c, k) => {
      const y = -h * .2 + k * .03;
      put(body, cyl(.0068, .0068, .006, M.color(c, .4), 24), w / 2 + .003, y, d * .1, 0, 0, Math.PI / 2);
      put(body, cyl(.0045, .0045, .0062, blackM, 18), w / 2 + .0032, y, d * .1, 0, 0, Math.PI / 2);
    });
    put(body, sidePlate(.05, .07, .004, .0012, M.plastic(0xCBD0D4, .45), 1), R, h * .2, -.004);
    put(body, box(.002, .006, .014, blackM), w / 2, h * .03, -.004);
    P5.port = ({key: 'port', at: V3(w / 2 + .012, elev + h * .3 + .03, d * .1)});
    /* beyaz kaide: alt tabla, önde çıkıntılı burun, yanlarda kulaklar, arkada destek, lastik ayaklar */
    const baseM = M.plastic(0xF4F6F7, .38), bz = back - .012;
    const sf = d / 2 - .008;
    put(g, pillow(.29, .027, sf - bz, .012, .006, baseM), 0, .0155, (sf + bz) / 2);
    put(g, pillow(.228, .029, .05, .013, .008, baseM), 0, .0165, d / 2 - .012);
    [-1, 1].forEach(s => put(g, pillow(.034, .029, .05, .01, .006, baseM), s * .128, .0165, d / 2 - .025));
    put(g, pillow(.22, .05, .018, .009, .006, baseM), 0, .03, back - .006);
    [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([a, b]) => put(g, cyl(.007, .008, .003, M.rubber(), 16), a * .115, .0015, b > 0 ? d / 2 - .01 : bz + .02));
    P5.mount = ({key: 'mount', at: V3(w * .3, .04, d / 2 + .03)});
    ['handle', 'alarm', 'mount', 'module', 'port'].forEach(k => parts.push(P5[k])); /* eski pin sırası korunur */
    return late;
  }
  const std0 = (c, r) => K3.std(c, r, 0);
  const hsHost = (scr, kit) => ({
    type: 'monitor', w: .32, h: .265, d: .085, body: 0xD5D8DB, bezel: 0x050607, mount: 'none', led: false, phi: 1.12,
    screenMargin: [.029, .031, .029, .037], label: '', screen: hsScreen(scr),
    extra(g, o) { const late = hsBody(g, o); if (kit) kit(g, o); late.forEach(p => o.parts.push(p)); }
  });
  const hsTo = (o, k = 0) => V3(o.w / 2 + .006, o.elev + o.h * .3 + k * .03, o.d * .1);
  DEV3D.model('hemosphere', hsHost(
    {sensor: 'Acumen IQ sensor', hpi: 34, tiles: [{l: 'CO', v: '6.5', u: 'L/min', min: 0, max: 12, z: [2.6, 4, 7.5, 9.5]}, {l: 'SV', v: '57', u: 'mL/b', min: 0, max: 160, z: [50, 58, 100, 145]},
      {l: 'StO₂', v: '63', u: '%', min: 0, max: 99, z: [52, 58, 83, 90], side: 'L', ch: 'A1', sub: '1 min\n↓6%'}, {l: 'StO₂', v: '62', u: '%', min: 0, max: 99, z: [52, 58, 83, 90], side: 'R', ch: 'A2'}]},
    (g, o) => {
      transducerKit(g, {at: V3(.24, 0, .1), to: hsTo(o, 0), parts: o.parts, dome: 0x2F7DD1, label: 'Acumen IQ', cableCol: 0x3A4148});
      /* doku oksimetrisi sensörü */
      const s = DEV3D.H.sensorTip('pad'); s.position.set(-.16, .003, .16); g.add(s);
      cable(g, V3(-.14, .004, .16), V3(-o.w / 2 - .014, o.elev + o.h * .62, o.d * .2), .0026, 0x3A4148);
      o.parts.push({key: 'sensor', at: V3(-.16, .02, .16)});
    }));
  DEV3D.model('flotrac', hsHost(
    {sensor: 'FloTrac sensor', tiles: [{l: 'CO', v: '5.4', u: 'L/min', min: 0, max: 12, z: [2, 4, 8, 10]}, {l: 'SV', v: '72', u: 'mL/b', min: 0, max: 160, z: [40, 60, 100, 130]},
      {l: 'SVV', v: '9', u: '%', min: 0, max: 30, z: [-1, 0, 13, 18]}, {l: 'SVR', v: '1120', u: 'dyn-s/cm⁵', min: 0, max: 2500, z: [500, 800, 1200, 1600]}]},
    (g, o) => {
      transducerKit(g, {at: V3(.24, 0, .1), to: hsTo(o, 0), parts: o.parts, dome: 0x2F9E6E, label: 'FloTrac', cableCol: 0x3A4148});
      o.parts.push({key: 'c-cable', at: V3(o.w / 2 + .05, .04, .1)});
    }));
  DEV3D.model('acumen-iq-hpi', hsHost(
    {sensor: 'Acumen IQ sensor', hpi: 34, tiles: [{l: 'HPI', v: '34', u: '', min: 0, max: 100, z: [-1, 0, 60, 85]}, {l: 'MAP', v: '78', u: 'mmHg', min: 0, max: 150, z: [55, 65, 100, 120]},
      {l: 'dP/dt', v: '820', u: 'mmHg/s', min: 0, max: 2000, z: [300, 480, 1300, 1700]}, {l: 'Ea dyn', v: '0.9', u: '', min: 0, max: 3, z: [.3, .5, 1.3, 2]}]},
    (g, o) => {
      transducerKit(g, {at: V3(.26, 0, .1), to: hsTo(o, 0), parts: o.parts, dome: 0x2F7DD1, label: 'Acumen IQ', cableCol: 0x3A4148});
      cuffKit(g, {at: V3(-.12, 0, .1), to: V3(-o.w / 2 - .014, o.elev + o.h * .62, o.d * .2), parts: [], hrs: true});
    }));
  DEV3D.model('clearsight', hsHost(
    {sensor: 'ClearSight finger cuff', tiles: [{l: 'CO', v: '5.0', u: 'L/min', min: 0, max: 12, z: [2, 4, 8, 10]}, {l: 'MAP', v: '84', u: 'mmHg', min: 0, max: 150, z: [55, 65, 100, 120], sub: '118/66'},
      {l: 'SV', v: '70', u: 'mL/b', min: 0, max: 160, z: [40, 60, 100, 130]}, {l: 'SVV', v: '8', u: '%', min: 0, max: 30, z: [-1, 0, 13, 18]}]},
    (g, o) => cuffKit(g, {at: V3(.27, 0, .06), to: hsTo(o, 1), parts: o.parts, hrs: true})));
  DEV3D.model('swan-ganz', hsHost(
    {sensor: 'Swan-Ganz CCO', tiles: [{l: 'CO', v: '5.6', u: 'L/min', min: 0, max: 12, z: [2, 4, 8, 10]}, {l: 'SvO₂', v: '71', u: '%', min: 0, max: 99, z: [50, 60, 80, 90]},
      {l: 'RVEF', v: '42', u: '%', min: 0, max: 80, z: [20, 30, 60, 70]}, {l: 'EDV', v: '138', u: 'mL', min: 0, max: 300, z: [60, 100, 160, 220]}]},
    (g, o) => pacKit(g, {at: V3(.28, 0, .06), to: hsTo(o, 2), parts: o.parts})));
  /* MostCare Up: beyaz çerçeve, siyah cam ön yüz, büyük dikdörtgen üst tutamak, sağda petrol yeşili port paneli (kırmızı/mavi/gri), arkada eğik destek */
  DEV3D.model('mostcare-up', {
    type: 'monitor', w: .28, h: .25, d: .05, body: 0xEEF1F3, bezel: 0x0B0D0F, mount: 'feet', led: false, phi: 1.12,
    screenMargin: [.025, .03, .025, .047],
    /* Ekran üretici görselindeki gibi: üstte ince durum satırı; üst üçte birde üst üste kırmızı arter ve yeşil EKG dalgası, sağda
       büyük kırmızı 125/61 ve altında dikrotik basınç (kırmızı) ile HR (yeşil); altta solda renkli köşeli parantezli CO/SVR/PPV/SVV
       sütunu, ortada dikey imleçli trend alanı (sarı CO ve kırmızı-beyaz basınç trendi), sağda yeşil parantezli CCE/dP/dt/Ea */
    screen: (() => {
      const L = [
        {t: 'text', txt: '10:42   ADULT', x: .02, y: 0, w: .3, h: .04, c: '#9AA3AA', s: .022, wt: 600}, {t: 'box', x: .15, y: .01, w: .05, h: .022, fill: '#C9302C'},
        {t: 'text', txt: 'MostCare Up', x: .4, y: 0, w: .2, h: .04, c: '#9AA3AA', s: .022, wt: 600, al: 'c'}, {t: 'icon', g: 'battery', x: .95, y: .008, w: .035, h: .025, c: '#C9D0D5'},
        {t: 'wave', k: 'art', c: '#E0423A', x: .03, y: .05, w: .56, h: .22, span: 11, amp: .55, mid: .62, lw: .004},
        {t: 'wave', k: 'ecg', c: '#3FCB4A', x: .03, y: .2, w: .56, h: .12, span: 11, amp: .3, lw: .0035},
        {t: 'text', txt: 'ART', x: .6, y: .08, w: .06, h: .05, c: '#E0423A', s: .022, wt: 600},
        {t: 'text', txt: '125/61', x: .62, y: .06, w: .28, h: .1, c: '#E0423A', s: .085, wt: 700, al: 'r'},
        {t: 'text', txt: '(84)', x: .9, y: .08, w: .09, h: .06, c: '#E0423A', s: .035, wt: 600, al: 'c'},
        {t: 'text', txt: 'Pdic', x: .6, y: .2, w: .06, h: .05, c: '#E0423A', s: .02, wt: 600},
        {t: 'text', txt: '101', x: .64, y: .18, w: .14, h: .09, c: '#E0423A', s: .065, wt: 700, al: 'r'},
        {t: 'text', txt: 'HR', x: .8, y: .2, w: .05, h: .05, c: '#3FCB4A', s: .02, wt: 600},
        {t: 'text', txt: '69', x: .84, y: .18, w: .14, h: .09, c: '#3FCB4A', s: .065, wt: 700, al: 'r'},
        {t: 'trend', x: .2, y: .37, w: .56, h: .25, max: 100, lines: [{c: '#F2C531', base: 52, amp: 6, seed: 4}]},
        {t: 'trend', x: .2, y: .66, w: .56, h: .28, max: 100, lines: [{c: '#E0423A', base: 55, amp: 2, seed: 2}, {c: '#E6EAEC', base: 48, amp: 9, seed: 6, spike: .5, spikeH: 30}]},
        {t: 'box', x: .25, y: .37, w: .003, h: .57, fill: '#F2C531'}, {t: 'box', x: .22, y: .66, w: .003, h: .28, fill: '#E0423A'},
        {t: 'box', x: .45, y: .37, w: .003, h: .57, fill: '#3FA3DC'}, {t: 'box', x: .72, y: .37, w: .003, h: .3, fill: '#F2C531'}, {t: 'box', x: .7, y: .66, w: .003, h: .28, fill: '#C9D0D5'}
      ];
      [['CO', '5.2', 'l/min', '#F2C531', .36, .1], ['SVR', '1264', 'dyn·s/cm⁵', '#F2F4F5', .5, .1], ['PPV', '8%', '', '#3FC6E8', .66, .07], ['SVV', '11%', '', '#3FC6E8', .78, .07]].forEach(([l, v, u, c, y, s]) => {
        L.push({t: 'box', x: .005, y, w: .004, h: s * 1.35, fill: c}, {t: 'text', txt: l, x: .012, y, w: .07, h: .035, c, s: .022, wt: 600},
          {t: 'text', txt: v, x: .02, y: y + .02, w: .16, h: s, c, s: s * .75, wt: 700, al: 'r'});
        if (u) L.push({t: 'text', txt: u, x: .02, y: y + .02 + s, w: .16, h: .03, c: '#9AA3AA', s: .016, wt: 500, al: 'r'});
      });
      [['CCE', '-0.09', '#3FCB4A', .37], ['dP/dt max', '1.55', '#F2F4F5', .56], ['Ea', '1.35', '#3FCB4A', .75]].forEach(([l, v, c, y]) => {
        L.push({t: 'box', x: .99, y, w: .006, h: .17, fill: '#3FCB4A'}, {t: 'text', txt: l, x: .79, y, w: .15, h: .04, c, s: .028, wt: 600},
          {t: 'text', txt: v, x: .78, y: y + .04, w: .2, h: .1, c, s: .075, wt: 700, al: 'r'});
      });
      return {bg: '#000000', layout: L};
    })(),
    extra(g, {body, w, h, d, elev, parts}) {
      put(body, rbox(w - .014, h - .014, .004, .012, M.matte(0x0B0D0F, .3)), 0, 0, d / 2 + .0005);
      put(body, nameplate('most-care/Up', .06, .009, '#C9D0D5'), 0, -h / 2 + .018, d / 2 + .003);
      /* tutamak */
      [-1, 1].forEach(sx => put(body, rbox(.03, .06, .03, .01, M.plastic(0xEEF1F3)), sx * (w / 2 - .04), h / 2 + .025, -d * .1));
      put(body, rbox(w - .05, .03, .03, .012, M.plastic(0xEEF1F3)), 0, h / 2 + .065, -d * .1);
      parts.push({key: 'handle', at: V3(0, elev + h + .08, -d * .1)});
      /* port paneli */
      put(body, rbox(.012, h * .55, .03, .004, M.color(0x14655F, .5)), w / 2 + .004, -h * .05, d * .05);
      [0xC9302C, 0x2F4FB8, 0x9AA3AA].forEach((c, k) => put(body, cyl(.006, .006, .008, M.color(c, .35)), w / 2 + .011, h * .14 - k * .045, d * .05, 0, 0, Math.PI / 2));
      parts.push({key: 'port', at: V3(w / 2 + .02, elev + h / 2 + h * .1, d * .05)});
      body.rotation.x = -.12; body.position.z = -.01;
      put(g, rbox(.06, h * .5, .1, .01, M.plastic(0xE2E6E9)), w * .3, h * .25 + .01, -d * .9);
      transducerKit(g, {at: V3(.24, 0, .1), to: V3(w / 2 + .012, elev + h / 2 + h * .14, d * .05), parts, dome: 0xD0453F});
    }
  });
  /* TrueVue: beyaz gövde, üstte gövdeye kalıplanmış tutamak, mavi logo; önde özofageal Doppler probu ve kablosu */
  DEV3D.model('truevue', {
    type: 'monitor', w: .32, h: .26, d: .08, body: 0xF2F4F5, bezel: 0x15191C, mount: 'feet', led: false, phi: 1.12,
    screenMargin: [.016, .05, .014, .04],
    /* Ekran üretici görselindeki gibi: solda koyu mavi menü düğmeleri (Info/Trend/Gallery/Calcs; altta Auto Range/Options/Pause/
       Snapshot/Calibrate), üst ortada iki anlık görüntü (snapshot) paneli, alt ortada kırmızı-sarı Doppler spektrumu ve hız ölçeği,
       sağda altı siyah parametre kutusu (HR, FTc, CO, PV, SD, SV), en sağda F/P sekmeleri, ses +/- ve simgeler */
    screen: (() => {
      const blue = '#22407A', L = [
        {t: 'text', txt: '10:54', x: .16, y: .005, w: .53, h: .05, c: '#E6EAEC', s: .026, wt: 600, al: 'c'},
        {t: 'box', x: .16, y: .05, w: .53, h: .4, stroke: '#4E5A63', lw: .003},
        {t: 'box', x: .16, y: .47, w: .53, h: .46, fill: '#000000', stroke: '#3B8F4A', lw: .003},
        {t: 'text', txt: '10days 0hrs', x: .5, y: .87, w: .15, h: .05, c: '#E6EAEC', s: .026, wt: 500, al: 'r'},
        {t: 'icon', g: 'drop', x: .655, y: .875, w: .025, h: .045, c: '#3CCB4A'},
        {t: 'icon', g: 'sd', x: .165, y: .875, w: .02, h: .045, c: '#C9D0D5'}];
      ['Info', 'Trend', 'Gallery', 'Calcs', '', ''].forEach((l, k) => L.push({t: 'box', x: .035, y: .06 + k * .062, w: .12, h: .058, fill: k > 3 ? '#2B2F33' : blue, stroke: '#4E5A63', lw: .002}, {t: 'text', txt: l, x: .06, y: .06 + k * .062, w: .09, h: .058, c: '#E6EAEC', s: .022, wt: 600, al: 'c'}));
      ['Auto Range', 'Options ▸', 'Pause', 'Snapshot', 'Calibrate'].forEach((l, k) => L.push({t: 'box', x: .035, y: .47 + k * .092, w: .12, h: .086, fill: blue, stroke: '#4E5A63', lw: .002}, {t: 'text', txt: l, x: .04, y: .47 + k * .092, w: .11, h: .086, c: k === 4 ? '#7F8C99' : '#E6EAEC', s: .022, wt: 600, al: 'r'}));
      [['Snapshot 69', [81, 315, 7.5, 79.6, 15.5, 79.5]], ['Snapshot 70', [78, 317, 6.5, 79.6, 14.9, 79.5]]].forEach(([n, vals], k) => {
        const x = .2 + k * .235;
        L.push({t: 'box', x, y: .065, w: .215, h: .37, fill: '#000000', stroke: '#6F7A82', lw: .002}, {t: 'text', txt: n, x: x + .07, y: .07, w: .14, h: .04, c: '#E6EAEC', s: .02, wt: 600, al: 'c'}, {t: 'text', txt: '10:4' + (k ? 9 : 8), x: x + .07, y: .11, w: .14, h: .04, c: '#C9D0D5', s: .018, wt: 500, al: 'c'}, {t: 'box', x: x + .07, y: .065, w: .002, h: .37, fill: '#6F7A82'});
        ['HR', 'FTC', 'CO', 'PV', 'SD', 'SV'].forEach((l, j) => L.push({t: 'text', txt: l, x, y: .07 + j * .06, w: .03, h: .025, c: '#C9D0D5', s: .013, wt: 600, pad: .002}, {t: 'text', txt: vals[j], x, y: .08 + j * .06, w: .068, h: .05, c: '#F2F4F5', s: .04, wt: 500, al: 'r', pad: .002}));
      });
      L.push({t: 'icon', g: 'arrow', x: .675, y: .2, w: .022, h: .07, c: '#3B7BD8'});
      [['100cm/s', .48], ['50cm/s', .6], ['0cm/s', .73], ['-50cm/s', .87]].forEach(([l, y]) => L.push({t: 'box', x: .185, y: y + .015, w: .5, h: .002, fill: y === .73 ? '#3B8F4A' : '#4E5A63'}, {t: 'text', txt: l, x: .185, y, w: .1, h: .03, c: '#E6EAEC', s: .018, wt: 500, pad: .002}));
      [['HR', 'bpm', '79'], ['FTC', 'm/s', '327'], ['CO', 'l/min', '6.3'], ['PV', 'cm/s', '79.0'], ['SD', 'cm', '14.4'], ['SV', 'ml', '80.1']].forEach(([l, u, v], k) => {
        const y = .075 + k * .143;
        L.push({t: 'box', x: .7, y, w: .177, h: .135, fill: '#000000', stroke: '#8A949B', lw: .003},
          {t: 'text', txt: l + ' ' + u, x: .7, y: y + .005, w: .15, h: .04, c: '#F2F4F5', s: .022, wt: 700},
          {t: 'text', txt: v, x: .7, y: y + .04, w: .177, h: .09, c: '#F2F4F5', s: .075, wt: 600, al: 'c'},
          {t: 'text', txt: '⋮', x: .85, y: y + .005, w: .025, h: .05, c: '#F2F4F5', s: .04, wt: 700, al: 'c'});
      });
      L.push({t: 'box', x: .885, y: .07, w: .1, h: .13, fill: '#3A3F44', r: .006}, {t: 'box', x: .978, y: .07, w: .007, h: .13, fill: '#3CCB4A'},
        {t: 'text', txt: 'F', x: .885, y: .075, w: .093, h: .07, c: '#F2F4F5', s: .05, wt: 500, al: 'c'}, {t: 'text', txt: 'Flow', x: .885, y: .145, w: .093, h: .04, c: '#C9D0D5', s: .018, wt: 500, al: 'c'},
        {t: 'box', x: .885, y: .205, w: .1, h: .13, fill: '#2B2F33', r: .006}, {t: 'box', x: .978, y: .205, w: .007, h: .13, fill: '#B23A5A'},
        {t: 'text', txt: 'P', x: .885, y: .21, w: .093, h: .07, c: '#F2F4F5', s: .05, wt: 500, al: 'c'}, {t: 'text', txt: 'Pressure', x: .885, y: .28, w: .093, h: .04, c: '#C9D0D5', s: .018, wt: 500, al: 'c'},
        {t: 'box', x: .9, y: .43, w: .06, h: .17, fill: blue, r: .004}, {t: 'text', txt: '+', x: .9, y: .43, w: .06, h: .055, c: '#F2F4F5', s: .035, al: 'c'},
        {t: 'icon', g: 'bell', x: .915, y: .49, w: .03, h: .05, c: '#E6EAEC'}, {t: 'text', txt: '−', x: .9, y: .545, w: .06, h: .055, c: '#F2F4F5', s: .035, al: 'c'},
        {t: 'box', x: .91, y: .64, w: .04, h: .05, fill: blue, r: .004}, {t: 'icon', g: 'gear', x: .91, y: .71, w: .04, h: .06, c: '#E6EAEC'},
        {t: 'icon', g: 'menu', x: .91, y: .78, w: .04, h: .05, c: '#E6EAEC'}, {t: 'icon', g: 'battery', x: .91, y: .85, w: .04, h: .04, c: '#E6EAEC'});
      return {bg: '#2A2D31', layout: L, draw(g, t, api) {
        /* Doppler spektrumu: her atımda kırmızı-sarı üçgen zarf; anlık görüntülerde küçük kopyaları */
        const {W, H} = api;
        const spec = (x0, w, y0, h, n, sh) => {
          for (let k = 0; k < n; k++) {
            const bx = x0 + w * ((((k + .3 - sh) % n) + n) % n) / n, peak = h * (.85 + .08 * Math.sin(k * 1.7)), base = y0 + h;
            const gr = g.createLinearGradient(bx, base - peak, bx + w / n * .25, base); gr.addColorStop(0, '#F2D23A'); gr.addColorStop(.5, '#E8682A'); gr.addColorStop(1, '#8A1A10');
            g.fillStyle = gr; g.beginPath(); g.moveTo(bx, base); g.lineTo(bx + w / n * .05, base - peak); g.lineTo(bx + w / n * .3, base); g.fill();
            g.strokeStyle = '#3CCB4A'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(bx, base); g.lineTo(bx + w / n * .05, base - peak); g.lineTo(bx + w / n * .3, base); g.stroke();
            g.fillStyle = '#C9D0D5'; g.beginPath(); g.moveTo(bx + w / n * .05, base - peak - H * .012); g.lineTo(bx + w / n * .05 - H * .008, base - peak - H * .024); g.lineTo(bx + w / n * .05 + H * .008, base - peak - H * .024); g.fill();
          }
        };
        spec(W * .23, W * .46, H * .5, H * .245, 6, t * .15 % 6);
        spec(W * .275, W * .135, H * .2, H * .2, 3, 0); spec(W * .51, W * .135, H * .2, H * .2, 3, 0);
      }};
    })(),
    extra(g, {body, w, h, d, elev, parts}) {
      put(body, rbox(w - .02, h - .085, .004, .006, M.matte(0x2A3036, .4)), 0, -.005, d / 2 + .0005);
      /* tutamak boşluğu */
      put(body, rbox(w * .5, .018, d * .5, .008, M.matte(0x8A949B)), 0, h / 2 - .022, d * .26);
      put(body, rbox(w * .6, .02, d * .9, .008, M.plastic(0xF2F4F5)), 0, h / 2 + .006, 0);
      parts.push({key: 'handle', at: V3(0, elev + h + .02, 0)});
      const lg = rbox(.06, .018, .003, .008, M.color(0x1E4FA0, .4)); put(body, lg, w / 2 - .05, h / 2 - .027, d / 2 + .002);
      put(body, nameplate('TrueVue', .05, .011, '#FFFFFF'), w / 2 - .05, h / 2 - .027, d / 2 + .004);
      put(body, ctext('Deltex', .035, .01, '#1E4FA0', 700), 0, -h / 2 + .027, d / 2 + .002);
      put(body, rbox(.024, .012, .004, .003, M.matte(0xB5BDC3)), 0, -h / 2 + .011, d / 2 + .002);
      parts.push({key: 'keypad', at: V3(0, elev + .015, d / 2 + .01)});
      /* özofageal Doppler probu: ince uzun gövde, uçta dönüştürücü, bağlantı kablosu */
      const pz = .13, pts = [];
      for (let k = 0; k <= 30; k++) { const u = k / 30; pts.push(V3(.4 - u * .5, .004, pz + Math.sin(u * Math.PI) * .05)); }
      g.add(tube(pts, .003, M.plastic(0xF4F0E4), 120));
      for (let k = 6; k < 28; k += 4) { const m = torus(.0032, .0007, M.matte(0x222), 12); m.position.copy(pts[k]); m.rotation.y = Math.PI / 2; g.add(m); }
      put(g, cyl(.0034, .0026, .02, M.plastic(0xE8E2CF)), pts[0].x + .008, .004, pz, 0, 0, Math.PI / 2);
      const hub = pts[30]; put(g, rbox(.03, .014, .018, .005, M.plastic(0x2F5E86)), hub.x - .015, .008, hub.z);
      cable(g, V3(hub.x - .03, .008, hub.z), V3(w / 2 + .003, elev + .05, 0), .0032, 0x3A4148);
      parts.push({key: 'c-doppler', at: V3(pts[0].x, .025, pz)}, {key: 'c-cable', at: V3(hub.x - .015, .03, hub.z)});
    }
  });
  /* Elektrot seti: kablo demetinden çıkan yapışkan elektrotlar (n adet; dual: çift elektrotlu dikdörtgen sensör) */
  function electrodeSet(g, {from, at = V3(.2, 0, .12), n = 4, dual = false, parts, cols = [0xF2F5F7], sp = 1} = {}) {
    const split = V3(at.x - .06, .01, at.z - .02);
    cable(g, from, split, .0034, 0x3A4148, .02);
    for (let k = 0; k < n; k++) {
      const e = V3(at.x + ((k % 2) * .08 - .02) * sp, .003, at.z + (Math.floor(k / 2) * .07 - .03 + (k % 2) * .01) * sp);
      g.add(tube([split, split.clone().lerp(e, .5).add(V3(0, .01, 0)), e.clone().add(V3(0, .004, 0))], .0018, M.matte(0x3A4148)));
      if (dual) { put(g, rbox(.05, .003, .028, .001, M.plastic(0xF4F6F7)), e.x, e.y, e.z); [-1, 1].forEach(s => put(g, cyl(.007, .007, .0015, M.metal(0xBFC6CB)), e.x + s * .014, e.y + .002, e.z)); }
      else { put(g, cyl(.014, .014, .002, M.plastic(0xF4F6F7)), e.x, e.y, e.z); put(g, cyl(.004, .004, .006, M.color(cols[k % cols.length], .4)), e.x, e.y + .004, e.z); }
    }
    P(parts, 'c-electrodes', V3(at.x + .02, .03, at.z));
  }
  /* ICON: açık mavi ön yüz, lacivert kenar tamponu, üstte askı halkası, dikey ekran, yön tuşları (üretici görseli) */
  DEV3D.model('icon', {
    type: 'handheld', w: .095, h: .17, d: .032, body: 0x6FA3DC, screenFrac: .392, keys: 0, accessory: 'none', label: '', phi: 1.05,
    /* Ekran üretici görselindeki gibi açık zeminli: ince üst bilgi satırı, altı satır (SV, CO, TFC, ICON, STR, SVR) — solda etiket
       ve değer (birim altta), sağda renkli yatay çubuk ve referans aralığı çizgileri; altta üç mavi yazılım tuşu etiketi */
    screen: (() => {
      const L = [{t: 'box', x: 0, y: 0, w: 1, h: .085, fill: '#D5DEE6'}, {t: 'text', txt: 'Resp   HR 71   10:42', x: .02, y: 0, w: .7, h: .085, c: '#5A6B75', s: .055, wt: 600},
        {t: 'icon', g: 'battery', x: .88, y: .01, w: .1, h: .065, c: '#5A6B75'}];
      [['SV', '95', 'ml', '#9CC4E4', .62], ['CO', '6.7', 'l/min', '#C6DD5A', .55], ['TFC', '28', '1/kOhm', '#E89A86', .42], ['ICON', '21.4', '', '#7FD0F0', .8], ['STR', '0.32', '', '#7CC47A', .5], ['SVR', '1004', 'dyn·s/cm⁵', '#B9A8E4', .45]].forEach(([l, v, u, c, f], k) => {
        const y = .1 + k * .135;
        L.push({t: 'box', x: 0, y: y + .132, w: 1, h: .003, fill: '#C9D3DA'},
          {t: 'text', txt: l, x: .0, y, w: .14, h: .08, c: '#1B2328', s: .06, wt: 600},
          {t: 'text', txt: v, x: .12, y, w: .2, h: .08, c: '#1B2328', s: .068, wt: 700, al: 'r'},
          {t: 'text', txt: u, x: .12, y: y + .075, w: .2, h: .05, c: '#5A6B75', s: .036, wt: 500, al: 'r'},
          {t: 'box', x: .35, y: y + .02, w: .62, h: .09, fill: '#FFFFFF', stroke: '#9AA8B0', lw: .004},
          {t: 'box', x: .35, y: y + .025, w: .62 * f, h: .08, fill: c},
          {t: 'box', x: .35 + .62 * .45, y: y + .005, w: .004, h: .12, fill: '#5A6B75'}, {t: 'box', x: .35 + .62 * .78, y: y + .005, w: .004, h: .12, fill: '#5A6B75'});
      });
      [0, 1, 2].forEach(k => L.push({t: 'box', x: .01 + k * .33, y: .925, w: .31, h: .07, fill: '#5E92D0', r: .01}, {t: 'text', txt: ['Menu', 'Trend', 'Info'][k], x: .01 + k * .33, y: .925, w: .31, h: .07, c: '#FFFFFF', s: .045, wt: 600, al: 'c'}));
      return {bg: '#F4F6F8', layout: L};
    })(),
    extra(g, {body, w, h, d, parts, toW}) {
      /* ekran: üretici görselindeki gibi daha küçük ve aşağıda (üstte LED'ler ve ICON yazısı için boşluk) */
      const sm = body.children.find(o => o.userData && o.userData.part === 'screen');
      if (sm) {
        const bz = body.children.find(o => o !== sm && Math.abs(o.position.y - sm.position.y) < 1e-6 && Math.abs(o.position.z - d / 2) < 1e-6);
        [sm, bz].forEach(o => { if (o) { o.scale.set(.82, .82, 1); o.position.y = .029; } });
        const sp = parts.find(p => p.key === 'screen'); if (sp) sp.at = toW(0, .029, d / 2 + .01);
      }
      put(body, rbox(w + .008, h + .006, d * .8, .01, M.matte(0x1D2F6B, .5)), 0, 0, -.003);
      const loop = new THREE.Shape(); loop.moveTo(-.022, 0); loop.lineTo(-.01, .028); loop.lineTo(.01, .028); loop.lineTo(.022, 0); loop.lineTo(-.022, 0);
      const hole = new THREE.Path(); hole.absarc(0, .016, .006, 0, Math.PI * 2, true); loop.holes.push(hole);
      const lm = new THREE.Mesh(new THREE.ExtrudeGeometry(loop, {depth: .008, bevelEnabled: false}), M.matte(0x1D2F6B, .5)); put(body, lm, 0, h / 2 - .002, -.004);
      [0x5FCB6A, 0xF2E14A, 0x9C2A2A].forEach((c, k) => put(body, box(.014, .0025, .002, M.led(c)), -.024 + k * .024, h / 2 - .023, d / 2 + .002));
      put(body, nameplate('ICON', .02, .008, '#1D2F6B'), w / 2 - .018, h / 2 - .013, d / 2 + .002);
      const ky = -h * .2, kc = M.plastic(0xB9D8F2);
      [-1, 0, 1].forEach(k => put(body, rbox(.02, .006, .004, .003, kc), k * .026, ky + .03, d / 2 + .002));
      put(body, rbox(.014, .014, .004, .004, kc), 0, ky, d / 2 + .002);
      [[0, .015], [0, -.015], [-.015, 0], [.015, 0]].forEach(([x, y]) => put(body, rbox(.011, .011, .004, .003, kc), x, ky + y, d / 2 + .002));
      put(body, rbox(.016, .009, .004, .004, M.plastic(0x5FCB9A)), .028, ky + .012, d / 2 + .002);
      put(body, rbox(.016, .009, .004, .004, M.matte(0x1D2F6B)), .026, -h / 2 + .022, d / 2 + .002);
      put(body, nameplate('OSYPKA', .03, .006, '#1D2F6B'), -.02, -h / 2 + .018, d / 2 + .002);
      parts.push({key: 'keypad', at: toW(0, ky, d / 2 + .01)}, {key: 'handle', at: toW(0, h / 2 + .03, 0)});
      electrodeSet(g, {from: toW(0, h / 2, 0), at: V3(.15, 0, -.03), n: 4, parts, sp: .6});
    }
  });
  /* Starling: siyah ön yüz, beyaz kenar; sağda yeşil güç tuşu, iki yuvarlak tuş ve büyük döner düğme (üretici görseli); 4 çift elektrotlu sensör */
  DEV3D.model('starling', {
    type: 'monitor', w: .3, h: .225, d: .06, body: 0xF2F4F5, bezel: 0x15191C, mount: 'feet', led: false, phi: 1.1,
    screenMargin: [.03, .03, .048, .028],
    /* Ekran üretici görselindeki gibi: üstte menü/oynat-durdur/ev simgeleri ve hasta özeti satırı; üç büyük renkli değer (HR yeşil,
       SVI camgöbeği, CI sarı) ve birimleri; altta ΔSVI trend çubuğu, PLR eğrisi, "Fluid Responsive" kutusu ve Start PLR/BOLUS
       düğmeleri; en altta Clinical Range / Waveforms / Dynamic Assessment / Numeric sekmeleri */
    screen: {bg: '#1D1E20', layout: [
      {t: 'icon', g: 'menu', x: .01, y: .01, w: .04, h: .05, c: '#E6EAEC'},
      {t: 'text', txt: 'Male    Age: 56    Weight: 70 kg    Height: 172 cm    BSA: 1.83    08:59 AM', x: .06, y: .0, w: .7, h: .035, c: '#E6EAEC', s: .02, wt: 700},
      {t: 'box', x: .065, y: .045, w: .035, h: .045, stroke: '#E6EAEC', r: .022}, {t: 'icon', g: 'pause', x: .11, y: .045, w: .03, h: .045, c: '#E6EAEC'},
      {t: 'box', x: .157, y: .055, w: .022, h: .028, fill: '#E6EAEC'}, {t: 'icon', g: 'alarm', x: .19, y: .045, w: .03, h: .045, c: '#E0423A'},
      {t: 'icon', g: 'home', x: .235, y: .045, w: .03, h: .045, c: '#E6EAEC'}, {t: 'box', x: .28, y: .052, w: .022, h: .03, stroke: '#E6EAEC'},
      {t: 'text', txt: '00h 00m', x: .33, y: .04, w: .12, h: .03, c: '#E6EAEC', s: .02, wt: 700}, {t: 'text', txt: 'last assessment', x: .33, y: .068, w: .12, h: .025, c: '#E6EAEC', s: .016, wt: 600},
      {t: 'icon', g: 'battery', x: .955, y: .005, w: .035, h: .03, c: '#3FA3E8'}, {t: 'box', x: .955, y: .045, w: .035, h: .04, fill: '#E6EAEC', r: .008}, {t: 'text', txt: 'i', x: .955, y: .045, w: .035, h: .04, c: '#1E4FA0', s: .03, al: 'c'},
      {t: 'text', txt: 'HR ˅', x: .02, y: .11, w: .15, h: .06, c: '#4FD162', s: .042, wt: 800},
      {t: 'text', txt: 'SVI ˅', x: .36, y: .11, w: .15, h: .06, c: '#4FE0F0', s: .042, wt: 800},
      {t: 'text', txt: 'CI ˅', x: .7, y: .11, w: .15, h: .06, c: '#E2E85A', s: .042, wt: 800},
      {t: 'tile', style: 'plain', x: .08, y: .12, w: .24, h: .3, l: '', v: 55, c: '#4FD162', vs: .15, al: 'c', live: true},
      {t: 'tile', style: 'plain', x: .4, y: .12, w: .24, h: .3, l: '', v: '62', c: '#4FE0F0', vs: .15, al: 'c'},
      {t: 'tile', style: 'plain', x: .72, y: .12, w: .24, h: .3, l: '', v: '3.4', c: '#E2E85A', vs: .15, al: 'c'},
      {t: 'text', txt: 'bpm', x: .02, y: .54, w: .1, h: .03, c: '#4FD162', s: .017, wt: 600},
      {t: 'text', txt: 'mL/beat/m²', x: .36, y: .54, w: .15, h: .03, c: '#4FE0F0', s: .017, wt: 600},
      {t: 'text', txt: 'L/min/m²', x: .7, y: .54, w: .15, h: .03, c: '#E2E85A', s: .017, wt: 600},
      {t: 'text', txt: 'ΔSVI Trend', x: .07, y: .6, w: .2, h: .04, c: '#E6EAEC', s: .024, wt: 600},
      {t: 'text', txt: '25.3%', x: .1, y: .66, w: .12, h: .03, c: '#E6EAEC', s: .02, wt: 600, al: 'c'},
      {t: 'box', x: .135, y: .695, w: .05, h: .09, fill: '#5FD8C0'}, {t: 'box', x: .12, y: .785, w: .08, h: .006, fill: '#9AA3AA'},
      {t: 'text', txt: '08:58 AM', x: .1, y: .8, w: .12, h: .03, c: '#E6EAEC', s: .016, wt: 600, al: 'c'},
      {t: 'text', txt: 'PLR', x: .3, y: .6, w: .1, h: .04, c: '#4FE0F0', s: .024, wt: 700}, {t: 'text', txt: 'SVI', x: .3, y: .635, w: .1, h: .03, c: '#4FE0F0', s: .018, wt: 700},
      {t: 'box', x: .3, y: .66, w: .002, h: .24, fill: '#9AA3AA'}, {t: 'box', x: .3, y: .9, w: .21, h: .002, fill: '#9AA3AA'},
      {t: 'text', txt: 'Preload', x: .4, y: .905, w: .11, h: .03, c: '#E6EAEC', s: .018, wt: 700, al: 'r'},
      {t: 'box', x: .53, y: .63, w: .27, h: .28, stroke: '#4A4F55', lw: .003},
      {t: 'text', txt: 'Fluid Responsive', x: .53, y: .7, w: .27, h: .06, c: '#3E8A42', s: .026, wt: 500, al: 'c'},
      {t: 'text', txt: 'ΔSVI = 25.3%', x: .53, y: .84, w: .265, h: .05, c: '#3E8A42', s: .024, wt: 500, al: 'r'},
      {t: 'box', x: .82, y: .68, w: .16, h: .065, fill: '#4FD1F0', r: .006}, {t: 'text', txt: 'Start PLR', x: .82, y: .68, w: .16, h: .065, c: '#10262E', s: .022, wt: 700, al: 'c'},
      {t: 'box', x: .82, y: .76, w: .16, h: .065, fill: '#4FD1F0', r: .006}, {t: 'text', txt: 'Start BOLUS', x: .82, y: .76, w: .16, h: .065, c: '#10262E', s: .022, wt: 700, al: 'c'},
      {t: 'box', x: .005, y: .935, w: .27, h: .055, stroke: '#E6EAEC', r: .01}, {t: 'text', txt: 'Clinical Range', x: .005, y: .935, w: .27, h: .055, c: '#9AA3AA', s: .02, wt: 600, al: 'c'},
      {t: 'text', txt: 'Waveforms', x: .3, y: .935, w: .2, h: .055, c: '#9AA3AA', s: .02, wt: 700, al: 'c'},
      {t: 'text', txt: 'Dynamic Assessment', x: .52, y: .935, w: .27, h: .055, c: '#F2F4F5', s: .02, wt: 700, al: 'c'},
      {t: 'text', txt: 'Numeric', x: .8, y: .935, w: .2, h: .055, c: '#9AA3AA', s: .02, wt: 700, al: 'c'},
      {t: 'icon', g: 'arrow', x: 0, y: .32, w: .02, h: .04, c: '#9AA3AA'}, {t: 'icon', g: 'arrow', x: 0, y: .78, w: .02, h: .04, c: '#9AA3AA'}
    ], draw(g, t, api) {
      /* PLR eğrisi ve yeşil başlangıç bloğu */
      const {W, H} = api;
      g.strokeStyle = '#C9D0D5'; g.lineWidth = H * .004; g.beginPath(); g.moveTo(W * .33, H * .84); g.bezierCurveTo(W * .37, H * .7, W * .42, H * .68, W * .5, H * .68); g.stroke();
      g.save(); g.translate(W * .325, H * .86); g.rotate(-1.05); g.fillStyle = '#2E6E32'; g.fillRect(0, -H * .018, H * .14, H * .036); g.restore();
    }},
    extra(g, {body, w, h, d, elev, parts}) {
      put(body, rbox(w - .01, h - .01, .004, .02, M.matte(0x15191C, .5)), 0, 0, d / 2 + .0005);
      put(body, nameplate('Baxter', .04, .01, '#8A949B'), 0, h / 2 - .018, d / 2 + .003);
      const bx = w / 2 - .024;
      put(body, cyl(.011, .011, .006, M.matte(0x3A4148)), bx, h / 2 - .036, d / 2 + .003, Math.PI / 2);
      put(body, torus(.007, .0012, M.led(0x3CCB6A)), bx, h / 2 - .036, d / 2 + .007);
      [-.005, -.035].forEach(y => put(body, cyl(.01, .01, .006, M.matte(0x3A4148)), bx, y, d / 2 + .003, Math.PI / 2));
      put(body, cyl(.019, .019, .014, M.matte(0x1D2125, .4)), bx, -h / 2 + .042, d / 2 + .007, Math.PI / 2);
      parts.push({key: 'keypad', at: V3(bx, elev + h / 2 - .02, d / 2 + .01)}, {key: 'knob', at: V3(bx, elev + .045, d / 2 + .02)});
      electrodeSet(g, {from: V3(w / 2 + .003, elev + .04, 0), at: V3(.26, 0, .1), n: 4, dual: true, parts});
    }
  });
  /* CNAP: görsel yok — sade masaüstü monitör; çift parmak manşeti + önkol kontrol ünitesi (kalp referans sensörü yok) ve üst kol NIBP manşeti */
  DEV3D.model('cnap', {
    type: 'monitor', w: .3, h: .24, d: .12, body: 0xE6EAED, bezel: 0x1B2126, mount: 'feet', keys: 5, knob: true, handle: 'top', phi: 1.1,
    screen: {title: 'CNAP', accent: '#F05A4F', waves: [{k: 'art', c: '#F05A4F', l: 'BP mmHg'}], extra: 'trend',
      params: [{l: 'BP', v: '121/72', u: '(89) mmHg', c: '#F05A4F', big: true}, {l: 'CO', v: '5.3', u: 'l/min', c: '#4FD1BE', live: true}, {l: 'SVV', v: '9', u: '%', c: '#F2C531'}, {l: 'PPV', v: '10', u: '%', c: '#F2C531'}]},
    extra(g, {w, h, d, elev, parts}) {
      cuffKit(g, {at: V3(.27, 0, .06), to: V3(w / 2 + .003, elev + h * .3, d * .1), parts, hrs: false, col: 0x3A4652});
      const c = DEV3D.H.sensorTip('cuff'); c.position.set(-.24, .04, .08); c.rotation.y = .4; g.add(c);
      cable(g, V3(-.2, .04, .07), V3(-w / 2 - .003, elev + h * .3, d * .1), .0028, 0xB5BDC3);
      parts.push({key: 'sensor', at: V3(-.24, .1, .08)});
    }
  });
  /* USCOM 1A: görsel yok — sade taşınabilir dokunmatik ekranlı monitör ve kalem tipi sürekli dalga Doppler probu */
  DEV3D.model('uscom-1a', {
    type: 'monitor', w: .3, h: .22, d: .06, body: 0xE9EEF1, bezel: 0x15191C, mount: 'stand', led: false, handle: 'top', phi: 1.1,
    screenMargin: [.02, .02, .02, .02],
    screen: {title: 'CW Doppler', accent: '#F2F4F5', waves: [{k: 'doppler', c: '#F2F4F5', l: 'Vel m/s'}, {k: 'doppler', c: '#7FD18F', l: 'VTI'}],
      params: [{l: 'VTI', v: '22', u: 'cm', c: '#F2F4F5', big: true}, {l: 'SV', v: '71', u: 'ml', c: '#7FD18F', live: true}, {l: 'CO', v: '5.0', u: 'l/min', c: '#5BB7DE'}, {l: 'CI', v: '2.8', u: 'l/min/m²', c: '#5BB7DE'}]},
    extra(g, {w, h, d, elev, parts}) {
      put(g, box(.06, .03, .03, M.matte(0x3A4148)), 0, .05, -.005);
      const p = V3(.24, .012, .09);
      put(g, cyl(.009, .011, .1, M.plastic(0xF2F5F7)), p.x, p.y, p.z, 0, .4, Math.PI / 2);
      put(g, cyl(.006, .009, .012, M.matte(0x3A4148)), p.x - .055 * Math.cos(.4), p.y, p.z + .055 * Math.sin(.4), 0, .4, Math.PI / 2);
      cable(g, V3(p.x + .05 * Math.cos(.4), p.y, p.z - .05 * Math.sin(.4)), V3(w / 2 + .003, elev + .04, 0), .003, 0x3A4148);
      parts.push({key: 'c-doppler', at: V3(p.x - .04, p.y + .025, p.z + .02)}, {key: 'c-cable', at: V3(w / 2 + .03, .03, .02)});
    }
  });
  /* Ultrason sistemleri: belirli bir marka değil, yöntem tipine göre sade araba/dizüstü sistem */
  DEV3D.model('tee', {
    type: 'c-ultrasound', form: 'cart', probe: 'tee', extraProbes: ['phased'], phi: 1.2,
    screen: {title: 'TEE · ME 4C', accent: '#F2C531', extra: 'us',
      params: [{l: 'LVOT VTI', v: '21', u: 'cm', c: '#F2C531'}, {l: 'SV', v: '68', u: 'ml', c: '#4FD1BE', live: true}, {l: 'EF', v: '58', u: '%', c: '#8AA8FF'}, {l: 'HR', v: 72, u: '/min', c: '#7FD18F', live: true}]}
  });
  DEV3D.model('tte', {
    type: 'c-ultrasound', form: 'cart', probe: 'phased', extraProbes: ['linear'], phi: 1.2,
    screen: {title: 'TTE · PLAX', accent: '#F2C531', extra: 'us',
      params: [{l: 'LVOT VTI', v: '20', u: 'cm', c: '#F2C531'}, {l: 'SV', v: '70', u: 'ml', c: '#4FD1BE', live: true}, {l: 'EF', v: '60', u: '%', c: '#8AA8FF'}, {l: 'HR', v: 74, u: '/min', c: '#7FD18F', live: true}]}
  });
  DEV3D.model('ultrasound', {
    type: 'c-ultrasound', form: 'laptop', probe: 'linear', body: 0xE4E8EB, phi: 1.15,
    screen: {title: 'L 12 MHz · Nerve', accent: '#4FD1BE', extra: 'us',
      params: [{l: 'Depth', v: '3.5', u: 'cm', c: '#4FD1BE'}, {l: 'Gain', v: '52', u: '%', c: '#F2C531'}, {l: 'Freq', v: '12', u: 'MHz', c: '#8AA8FF'}]}
  });
})();
