/* Kaynak: İleri Monitörizasyon Atlası 3B cihaz sistemi; atlas core.js ile çakışmaması için K3 → WK3 olarak yeniden adlandırıldı. */
'use strict';
/* Cihaz yapılandırmaları I: GE HealthCare / Datex-Ohmeda anestezi iş istasyonları (bağımsız oluşturulmuş temsili modeller)
   — Carestation 650, Avance CS², Aestiva/5 Compact Plus.
   'd-workstation' kurucusu (dm-d.js) cfg.sections ile kullanılır; bölüm işlevleri bu dosyadadır, ölçüler cfg.ge içindedir
   (m; ön yüz +z, zemin y = 0). Kesin üretici ölçüsü bulunamadı: oranlar temsilidir. Parça düzeni FDA 510(k) özetlerinden
   (K151570 Carestation 620/650/650c, K213867 tablo 1, K123125/K131945 Avance CS²; K000706/K023366 Aestiva/5) ve
   Aestiva/5 Compact Plus için klinik olgu yayınından (PMC2966709) alınmıştır; kayıtlar content-src/workstations/measure/. */
(() => {
  if (!DEV3D) return;
  const {V3, M, rbox, box, cyl, sphere, torus, lathe, tube, corrugated, put, decal, makeScreen, canvasTex} = DEV3D.H;
  const T = DEV3D.partText;

  /* ---------- Parça metinleri (yalnız işlev; tedavi/ayar önerisi yok) ---------- */
  T('i-brake', {tr: ['Merkezi fren pedalı', 'Tek pedalla tüm tekerlekleri birlikte kilitler veya serbest bırakır.'], en: ['Central brake pedal', 'Locks or releases all casters together with a single pedal.'], es: ['Pedal de freno central', 'Bloquea o libera todas las ruedas a la vez con un solo pedal.']});
  T('i-needle', {tr: ['Taze gaz akım kontrolleri (iğne valf)', 'O₂, hava ve (varsa) N₂O akımları gövdedeki iğne valf düğmeleriyle ayarlanır. Bu modelde akım değerleri düğmelerin hemen üstündeki sayısal göstergelerde ve sistem ekranında elektronik akım ölçer göstergeleriyle de sunulur.'], en: ['Fresh gas flow controls (needle valves)', 'O₂, air and (if fitted) N₂O flows are set with needle-valve knobs on the frame. On this model the flows are also shown on digital readouts directly above the knobs and on electronic flowmeter indicators on the system display.'], es: ['Controles de flujo de gas fresco (válvulas de aguja)', 'Los flujos de O₂, aire y (si existe) N₂O se ajustan con mandos de válvula de aguja en el bastidor. En este modelo los flujos se muestran también en indicadores digitales justo encima de los mandos y mediante indicadores electrónicos de flujo en la pantalla.']});
  T('i-flowtube', {tr: ['Toplam akım tüpü', 'Gaz karıştırıcıdan çıkan toplam taze gaz akımını pnömatik olarak gösteren şeffaf tüptür; vaporizatör manifoldundan önce yer alır.'], en: ['Total flow tube', 'Clear tube that shows, pneumatically, the total fresh gas flow leaving the gas mixer; it sits before the vaporizer manifold.'], es: ['Tubo de flujo total', 'Tubo transparente que indica neumáticamente el flujo total de gas fresco que sale del mezclador; está antes del colector de vaporizadores.']});
  T('i-auxo2', {tr: ['Yardımcı O₂ akım ölçeri (isteğe bağlı)', 'Ayrı akım tüpü ve iğne valfiyle yardımcı bir çıkışa O₂ verir; örneğin spontan soluyan hastaya nazal kanülle oksijen vermek için kullanılır. Bu akım toplam akım tüpünden geçmez.'], en: ['Auxiliary O₂ flowmeter (optional)', 'Supplies O₂ to an auxiliary outlet through its own flow tube and needle valve, for uses such as a nasal cannula in a spontaneously breathing patient. This flow does not pass through the total flow tube.'], es: ['Caudalímetro auxiliar de O₂ (opcional)', 'Suministra O₂ a una salida auxiliar mediante su propio tubo de flujo y válvula de aguja, para usos como una cánula nasal en un paciente con respiración espontánea. Este flujo no pasa por el tubo de flujo total.']});
  T('i-acgo', {tr: ['Yardımcı ortak gaz çıkışı (ACGO)', 'ACGO anahtarı açıldığında taze gaz solunum sistemi yerine ön yüzdeki ACGO portuna yönlendirilir; bu porta yardımcı bir manuel solunum devresi bağlanabilir.'], en: ['Auxiliary common gas outlet (ACGO)', 'With the ACGO switch on, fresh gas is directed to the ACGO port on the front instead of the breathing system; an auxiliary manual breathing circuit can be connected there.'], es: ['Salida auxiliar de gas común (ACGO)', 'Con el interruptor ACGO activado, el gas fresco se dirige al puerto ACGO frontal en lugar del sistema respiratorio; allí puede conectarse un circuito respiratorio manual auxiliar.']});
  T('i-vapor2', {tr: ['Vaporizatörler (iki konumlu Selectatec manifoldu)', 'Tec serisi vaporizatörler iki konumlu Selectatec manifolduna takılır ve uçucu ajanı taze gaza ayarlanan konsantrasyonda katar. Sistem birden fazla ajanın aynı anda verilmesi riskini azaltacak şekilde tasarlanmıştır.'], en: ['Vaporizers (two-position Selectatec manifold)', 'Tec-series vaporizers mount on a two-position Selectatec manifold and add the volatile agent to the fresh gas at the set concentration. The system is designed to reduce the risk of delivering more than one agent at a time.'], es: ['Vaporizadores (colector Selectatec de dos posiciones)', 'Los vaporizadores de la serie Tec se montan en un colector Selectatec de dos posiciones y añaden el agente volátil al gas fresco a la concentración ajustada. El sistema está diseñado para reducir el riesgo de administrar más de un agente a la vez.']});
  T('i-vapor3', {tr: ['Vaporizatörler (Selectatec manifoldu, 3 konuma kadar)', 'Tec serisi vaporizatörler Selectatec manifolduna takılır; bu sistem isteğe bağlı üçüncü vaporizatör konumunu destekler. Modelde iki vaporizatör takılı, üçüncü konum boş gösterilmiştir. Sistem birden fazla ajanın aynı anda verilmesi riskini azaltacak şekilde tasarlanmıştır.'], en: ['Vaporizers (Selectatec manifold, up to 3 positions)', 'Tec-series vaporizers mount on a Selectatec manifold; this system supports an optional third vaporizer position. The model shows two vaporizers fitted and the third position empty. The system is designed to reduce the risk of delivering more than one agent at a time.'], es: ['Vaporizadores (colector Selectatec, hasta 3 posiciones)', 'Los vaporizadores de la serie Tec se montan en un colector Selectatec; este sistema admite una tercera posición opcional. El modelo muestra dos vaporizadores y la tercera posición vacía. El sistema está diseñado para reducir el riesgo de administrar más de un agente a la vez.']});
  T('i-vapor-ae', {tr: ['Vaporizatörler (Selectatec manifoldu)', 'Vaporizatörler Selectatec manifolduna takılır ve uçucu ajanı taze gaza katar. Manifolda yanlış oturan bir vaporizatör gaz kaçağına yol açabilir; bu nedenle takıldıktan sonra doğru oturduğu ve kilitlendiği kontrol edilir.'], en: ['Vaporizers (Selectatec manifold)', 'Vaporizers mount on a Selectatec manifold and add the volatile agent to the fresh gas. A vaporizer seated incorrectly on the manifold can cause a gas leak, so correct seating and locking are checked after mounting.'], es: ['Vaporizadores (colector Selectatec)', 'Los vaporizadores se montan en un colector Selectatec y añaden el agente volátil al gas fresco. Un vaporizador mal asentado puede provocar una fuga de gas, por lo que tras montarlo se comprueba que esté bien asentado y bloqueado.']});
  T('i-bagvent', {tr: ['Balon/ventilatör (Bag/Vent) anahtarı', 'Solunum sistemini manuel (balon) ve mekanik (ventilatör) ventilasyon arasında değiştirir.'], en: ['Bag/vent switch', 'Switches the breathing system between manual (bag) and mechanical (ventilator) ventilation.'], es: ['Selector bolsa/ventilador', 'Cambia el sistema respiratorio entre ventilación manual (bolsa) y mecánica (ventilador).']});
  T('i-flowsensor', {tr: ['Akım sensörleri', 'İnspiratuvar çıkış ve ekspiratuvar giriş bölgesindeki akım sensörleri ventilasyonu izlemek ve kontrol etmek için kullanılır; kompresyon kayıpları, taze gaz katkısı ve küçük kaçaklar için kompanzasyon sağlar.'], en: ['Flow sensors', 'Flow sensors at the inspiratory outlet and expiratory inlet are used to monitor and control ventilation; they allow compensation for compression losses, fresh gas contribution and small leaks.'], es: ['Sensores de flujo', 'Los sensores de flujo en la salida inspiratoria y la entrada espiratoria sirven para monitorizar y controlar la ventilación; permiten compensar pérdidas por compresión, el aporte de gas fresco y pequeñas fugas.']});
  T('i-flowsensor2', {tr: ['Solunum devresi sensörleri', 'Solunum devresindeki sensörler ventilasyonu izlemek ve kontrol etmek için kullanılır; kompresyon kayıpları, taze gaz katkısı ve küçük kaçaklar için kompanzasyon sağlar. Bu modelde sensörlerin konumu temsili olarak gösterilmiştir.'], en: ['Breathing circuit sensors', 'Sensors in the breathing circuit are used to monitor and control ventilation; they allow compensation for compression losses, fresh gas contribution and small leaks. Their positions are shown schematically in this model.'], es: ['Sensores del circuito respiratorio', 'Los sensores del circuito respiratorio sirven para monitorizar y controlar la ventilación; permiten compensar pérdidas por compresión, el aporte de gas fresco y pequeñas fugas. Su posición se muestra de forma esquemática en este modelo.']});
  T('i-disp650', {tr: ['15 inç ekran (sol kol)', 'Ventilasyon ayarları, eğriler, alarmlar ve taze gaz akımları (sayısal değerlerle ve elektronik akım ölçer göstergeleriyle) gösterilir; dokunmatik ekran, tuşlar ve ComWheel ile kullanılır. Ekran makinenin sol tarafındaki kol üzerindedir. Değerler örnektir.'], en: ['15-inch display (left arm)', 'Shows ventilation settings, waveforms, alarms and fresh gas flows (as numerical values and electronic flowmeter indicators); operated by touchscreen, keys and ComWheel. The display sits on an arm on the left side of the machine. Values are examples.'], es: ['Pantalla de 15 pulgadas (brazo izquierdo)', 'Muestra ajustes de ventilación, curvas, alarmas y flujos de gas fresco (como valores numéricos e indicadores electrónicos de flujo); se maneja con pantalla táctil, teclas y ComWheel. Está en un brazo en el lado izquierdo de la máquina. Valores de ejemplo.']});
  T('i-dispav', {tr: ['15 inç dokunmatik ekran', 'Elektronik gaz karıştırıcının akım ayarları, ventilasyon ayarları, eğriler, alarmlar ve ecoFLOW göstergesi bu ekrandadır; kol döndürülebilir ve eğilebilir. Değerler örnektir.'], en: ['15-inch touchscreen display', 'Holds the electronic gas mixer flow settings, ventilation settings, waveforms, alarms and the ecoFLOW indicator; the arm can swivel and tilt. Values are examples.'], es: ['Pantalla táctil de 15 pulgadas', 'Contiene los ajustes de flujo del mezclador electrónico, los ajustes de ventilación, las curvas, las alarmas y el indicador ecoFLOW; el brazo puede girar e inclinarse. Valores de ejemplo.']});
  T('i-alto2', {tr: ['Alternatif O₂ (ALT O₂) ve akım tüpü', 'Elektronik gaz karıştırıcı kullanılamadığında oksijen vermek için pnömatik yedek O₂ kontrolüdür; akım geleneksel bir akım tüpünde gösterilir.'], en: ['Alternate O₂ (ALT O₂) and flow tube', 'Pneumatic back-up O₂ control for delivering oxygen when the electronic gas mixer is not available; the flow is shown on a traditional flow tube.'], es: ['O₂ alternativo (ALT O₂) y tubo de flujo', 'Control neumático de O₂ de respaldo para administrar oxígeno cuando el mezclador electrónico no está disponible; el flujo se muestra en un tubo de flujo tradicional.']});
  T('i-light', {tr: ['Çalışma yüzeyi aydınlatması', 'Çalışma tablasını aydınlatır; parlaklık ayarlanabilir.'], en: ['Work surface lighting', 'Lights the work surface; the brightness is adjustable.'], es: ['Iluminación de la superficie de trabajo', 'Ilumina la superficie de trabajo; el brillo es regulable.']});
  T('i-monav', {tr: ['Hasta monitörü (üst raf)', 'Üst rafa takılan ayrı hasta monitörü EKG, SpO₂, kan basıncı gibi parametreleri gösterir; bazı şasi seçeneklerinde monitör bağlantıları gövde içinden geçer. Değerler örnektir.'], en: ['Patient monitor (top shelf)', 'A separate patient monitor on the top shelf shows parameters such as ECG, SpO₂ and blood pressure; with some frame options the monitor connections run inside the frame. Values are examples.'], es: ['Monitor de paciente (estante superior)', 'Un monitor de paciente separado en el estante superior muestra parámetros como ECG, SpO₂ y presión arterial; con algunas opciones de bastidor las conexiones pasan por dentro. Valores de ejemplo.']});
  T('i-ventae', {tr: ['Ventilatör ekranı (temsili)', 'Ventilasyon modu ve ayarları, hava yolu basıncı ile ölçülen hacim ve oksijen değerleri burada gösterilir; ayarlar tuşlar ve döner düğmeyle yapılır. Bu alt modelde hangi ventilatörün (7100 ya da 7900) bulunduğu doğrulanamadığı için ekran temsilidir. Değerler örnektir.'], en: ['Ventilator display (representative)', 'Shows the ventilation mode and settings, airway pressure and measured volume and oxygen values; settings are made with keys and a rotary knob. Which ventilator (7100 or 7900) this sub-model carries could not be verified, so the display is representative. Values are examples.'], es: ['Pantalla del ventilador (representativa)', 'Muestra el modo y los ajustes de ventilación, la presión en la vía aérea y los valores medidos de volumen y oxígeno; los ajustes se hacen con teclas y un mando giratorio. No se pudo verificar qué ventilador (7100 o 7900) lleva este submodelo, por lo que la pantalla es representativa. Valores de ejemplo.']});

  /* ---------- Yardımcılar ---------- */
  const AG = {sevo: 0xF2C531, des: 0x2F7DD1, iso: 0x9B4AA8};
  const AGN = {sevo: 'Sevoflurane', des: 'Desflurane', iso: 'Isoflurane'};
  const hex = c => '#' + c.toString(16).padStart(6, '0');
  const txtD = (text, w, h, o = {}) => decal(w, h, (c, Wd, Hh) => {
    if (o.bg) { c.fillStyle = o.bg; c.fillRect(0, 0, Wd, Hh); }
    c.fillStyle = o.c || '#4E5961'; c.font = `${o.it ? 'italic ' : ''}${o.wt || 700} ${Math.round(Hh * (o.s || .72))}px ${o.mono ? '"JetBrains Mono", Menlo, monospace' : '"Archivo", Arial, sans-serif'}`;
    c.textBaseline = 'middle'; c.textAlign = o.al === 'l' ? 'left' : o.al === 'r' ? 'right' : 'center';
    c.fillText(text, o.al === 'l' ? 3 : o.al === 'r' ? Wd - 3 : Wd / 2, Hh / 2);
  }, o.px || 256);
  const lcd = (txt, w, h, col = '#7CF29A') => decal(w, h, (c, Wd, Hh) => { c.fillStyle = '#081410'; c.fillRect(0, 0, Wd, Hh); c.fillStyle = col; c.font = `700 ${Math.round(Hh * .7)}px "JetBrains Mono", Menlo, monospace`; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText(txt, Wd * .92, Hh * .54); }, 128);
  function mats(ctx) {
    if (ctx.im) return ctx.im;
    const C = ctx.cfg.ge.col;
    return (ctx.im = {
      body: M.plastic(C.body, .38), front: M.plastic(C.front, .34), panel: M.plastic(C.panel, .4), panel2: M.plastic(C.panel2, .42), top: M.plastic(C.top, .4),
      mat: M.matte(C.mat, .8), trim: M.plastic(C.trim, .36), dark: M.matte(C.dark, .55), base: M.plastic(C.base, .45), base2: M.plastic(C.base2, .42),
      bs: M.plastic(C.bs, .38), bsDark: M.plastic(C.bsDark, .45), white: M.plastic(0xF5F6F6, .33), seam: M.matte(0x6B747B, .7), black: M.plastic(0x0D1114, .25),
      chrome: M.chrome(), metal: M.metal(0xC2C9CE, .3), vap: M.plastic(0xEDEFF0, .32), vapTop: M.plastic(0xD9DDE0, .34), knob: M.plastic(0xD3D8DB, .32), rubber: M.rubber(0x23282C)
    });
  }
  const dialTex = agent => canvasTex(512, 40, (c, Wd, Hh) => {
    c.fillStyle = '#E6E9EB'; c.fillRect(0, 0, Wd, Hh); c.fillStyle = '#2E363C'; c.strokeStyle = '#2E363C'; c.lineWidth = 2;
    const max = agent === 'des' ? 18 : agent === 'iso' ? 5 : 8, step = agent === 'des' ? 2 : 1;
    c.font = `700 ${Math.round(Hh * .46)}px Arial`; c.textAlign = 'center'; c.textBaseline = 'middle';
    for (let v = 0; v <= max; v += step) { const x = ((v / max) * .5 + .25) * Wd; c.fillText(String(v), x, Hh * .64); c.beginPath(); c.moveTo(x, 0); c.lineTo(x, Hh * .24); c.stroke(); }
    c.fillText('0', Wd * .12, Hh * .64); c.fillStyle = '#C0392B'; c.fillRect(Wd * .1, 0, 4, Hh * .3);
  });
  const ringMesh = (r, h, tex) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 40, 1, true), new THREE.MeshStandardMaterial({map: tex, roughness: .45})); return m; };

  /* ---------- Bölüm: şasi ve tekerlekler ---------- */
  function geBase(ctx) {
    const {g, cfg, P} = ctx, B = cfg.ge.base, m = mats(ctx), y = B.y, h = B.h, cr = B.cr;
    put(g, rbox(B.w, h, B.d, .03, m.base), 0, y, 0);
    [1, -1].forEach(s => put(g, rbox(B.w + .014, h * .58, .05, .022, m.base2), 0, y - h * .12, s * (B.d / 2 - .018)));
    put(g, box(B.w - .06, .003, .002, m.seam), 0, y + h * .17, B.d / 2 + .0075);
    const tire = M.rubber(0x262B30), hub = M.plastic(B.hub || 0xC9CFD3, .38), fork = M.plastic(B.fork || 0x9AA2A8, .42), axle = M.metal(0x9AA3AA, .35);
    const tg = new THREE.CylinderGeometry(cr, cr, .034, 28), hg = new THREE.CylinderGeometry(cr * .62, cr * .62, .038, 20);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
      const c = new THREE.Group(); c.position.set(sx * B.cx, 0, sz * B.cz); g.add(c);
      const w = new THREE.Mesh(tg, tire); w.castShadow = true; put(c, w, 0, cr, -cr * .25, 0, 0, Math.PI / 2);
      put(c, new THREE.Mesh(hg, hub), 0, cr, -cr * .25, 0, 0, Math.PI / 2);
      put(c, torus(cr * .9, cr * .09, tire, 24), .018, cr, -cr * .25, 0, Math.PI / 2, 0); put(c, torus(cr * .9, cr * .09, tire, 24), -.018, cr, -cr * .25, 0, Math.PI / 2, 0);
      [-1, 1].forEach(s => put(c, rbox(.006, cr * 1.3, cr * 1.2, .002, fork), s * .024, cr * 1.25, -cr * .3));
      const top = y - h / 2, ft = 2 * cr + .01;
      put(c, rbox(.056, .012, cr * 1.2, .004, fork), 0, ft, -cr * .3);
      if (top - ft > .008) put(c, cyl(.013, .013, top - ft, axle, 14), 0, (top + ft) / 2, 0);
      if (B.brake === 'caster') { put(c, rbox(.03, .008, .035, .003, M.plastic(sz > 0 ? 0xB8392E : 0x5E676E, .45)), 0, ft + .006, cr * .7, -.25); }
    });
    if (B.brake === 'central') {
      const pz = B.d / 2 + .02, py = y - h * .12;
      put(g, rbox(.2, .024, .05, .008, M.plastic(0x5E676E, .45)), 0, py, pz);
      put(g, box(.07, .003, .03, M.color(0x2E9E58, .5)), -.05, py + .0125, pz + .004);
      put(g, box(.07, .003, .03, M.color(0xC0392B, .5)), .05, py + .0125, pz + .004);
      P('i-brake', 0, py + .02, pz + .03);
    }
    P('d-base', B.cx, cr * 1.6, B.cz + .05);
  }
  /* ---------- Bölüm: çekmeceli dolap ---------- */
  function geCab(ctx) {
    const {g, cfg, P} = ctx, K = cfg.ge.cab, m = mats(ctx), zf = K.z + K.d / 2;
    put(g, rbox(K.w, K.y1 - K.y0, K.d - .02, .02, m.body), K.x, (K.y0 + K.y1) / 2, K.z - .01);
    K.drawers.forEach(([a, b]) => {
      const h = b - a - .007, cy = (a + b) / 2;
      put(g, rbox(K.w - .024, h, .03, .01, m.front), K.x, cy, zf - .012);
      put(g, box(K.w * .5, .013, .003, m.dark), K.x, cy + h / 2 - .022, zf + .0042);
      put(g, rbox(K.w * .5, .007, .014, .0034, m.trim), K.x, cy + h / 2 - .0135, zf + .007);
    });
    if (K.label) put(g, txtD(K.label, .14, .018, {c: '#7A848B', wt: 600}), K.x - K.w * .28, K.drawers[0][0] + .035, zf + .0041);
    for (let k = 0; k < 8; k++) put(g, box(.002, .006, K.d * .4, m.seam), K.x + K.w / 2 + .0006, K.y0 + .06 + k * .014, K.z - K.d * .12);
    put(g, rbox(K.w - .03, .03, K.d - .06, .01, m.dark), K.x, K.y0 - .005, K.z - .02);
    [-1, 1].forEach(s => {
      put(g, rbox(.006, K.y1 - K.y0 - .12, K.d - .12, .003, m.panel), K.x + s * (K.w / 2 + .001), (K.y0 + K.y1) / 2 + .02, K.z - .02);
      put(g, box(.002, K.y1 - K.y0 - .1, .003, m.seam), K.x + s * (K.w / 2 + .0006), (K.y0 + K.y1) / 2 + .02, K.z + K.d / 2 - .05);
    });
    put(g, rbox(K.w - .06, K.y1 - K.y0 - .1, .008, .006, m.panel), K.x, (K.y0 + K.y1) / 2 + .02, K.z - K.d / 2 - .002);
    for (let k = 0; k < 10; k++) put(g, box(K.w * .4, .004, .002, m.seam), K.x, K.y1 - .1 - k * .012, K.z - K.d / 2 - .0065);
    const ld = K.drawers[K.drawers.length - 1];
    P('d-drawer', K.x + K.w * .3, (ld[0] + ld[1]) / 2, zf + .02);
  }
  /* ---------- Bölüm: çalışma tablası, ön kuşak, raylar, yan tutamak ---------- */
  function geTop(ctx) {
    const {g, cfg, P} = ctx, Tp = cfg.ge.top, m = mats(ctx), y = Tp.y, zf = Tp.z + Tp.d / 2, x = Tp.x || 0;
    put(g, rbox(Tp.w, .04, Tp.d, .014, m.top), x, y - .02, Tp.z);
    put(g, box(Tp.w - .08, .002, Tp.d - .12, m.mat), x, y + .001, Tp.z + .02);
    put(g, rbox(Tp.w - .02, .055, .035, .012, m.body), x, y - .0675, zf - .02);
    put(g, box(Tp.w - .04, .003, .002, m.seam), x, y - .04, zf - .0015);
    put(g, txtD(Tp.label, .2, .022, {c: '#7D878E', it: true, wt: 600, al: 'r'}), x + Tp.w / 2 - .13, y - .068, zf - .0018);
    [-1, 1].forEach(s => {
      const rx = x + s * (Tp.w / 2 + .016);
      put(g, box(.01, .028, Tp.d * .58, m.metal), rx, y - .058, Tp.z + Tp.d * .02);
      [-1, 1].forEach(t => put(g, box(.016, .018, .022, m.metal), x + s * (Tp.w / 2 + .006), y - .058, Tp.z + Tp.d * .02 + t * Tp.d * .24));
    });
    /* sağ yan tutamak */
    const hx = x + Tp.w / 2 + .055;
    [-1, 1].forEach(t => put(g, cyl(.007, .007, .045, m.metal, 12), x + Tp.w / 2 + .03, y - .02, zf - .07 + t * .08, 0, 0, Math.PI / 2));
    put(g, cyl(.011, .011, .2, m.knob, 16), hx, y - .02, zf - .07, Math.PI / 2);
    P('d-worktop', x + Tp.w * .1, y + .01, Tp.z + Tp.d * .38);
    P('d-rail', x + Tp.w / 2 + .02, y - .058, Tp.z + Tp.d * .25);
  }
  /* ---------- Bölüm: üst gövde, üst raf, (isteğe bağlı) aydınlatmalı saçak; arkada boru girişleri ve tüpler ---------- */
  function geTower(ctx) {
    const {g, cfg, P} = ctx, R = cfg.ge.tower, m = mats(ctx), h = R.y1 - R.y0, zf = R.z + R.d / 2;
    put(g, rbox(R.w, h, R.d, .025, m.body), R.x, R.y0 + h / 2, R.z);
    put(g, rbox(R.w - .03, h - .05, .008, .01, m.panel), R.x, R.y0 + h / 2 + .006, zf + .002);
    [-1, 1].forEach(s => { for (let k = 0; k < 9; k++) put(g, box(.002, .006, R.d * .45, m.seam), R.x + s * (R.w / 2 + .0006), R.y0 + .06 + k * .013, R.z - R.d * .1); });
    put(g, box(R.w - .02, .012, R.d - .02, m.dark), R.x, R.y0 + .006, R.z);
    put(g, box(.003, h - .08, .002, m.seam), R.x + R.w / 2 - .06, R.y0 + h / 2, zf + .0065);
    for (let k = 0; k < 12; k++) put(g, box(R.w * .5, .004, .002, m.seam), R.x, R.y1 - .06 - k * .012, R.z - R.d / 2 - .001);
    const S = R.shelf;
    put(g, rbox(S.w - .02, .025, .02, .006, m.trim), R.x, R.y1 + .045, S.z - S.d / 2 + .012);
    put(g, rbox(S.w, .035, S.d, .012, m.top), R.x, R.y1 + .0175, S.z);
    put(g, box(S.w - .02, .012, .003, m.dark), R.x, R.y1 + .0175, S.z + S.d / 2 + .0005);
    [-1, 1].forEach(s => put(g, box(.01, .022, S.d * .6, m.metal), R.x + s * (S.w / 2 + .01), R.y1 + .012, S.z));
    if (R.brand) put(g, txtD(R.brand, .12, .02, {c: '#5C7085', wt: 700}), R.brand2 ?? R.x, R.brandY ?? R.y1 - .03, zf + .0065);
    if (R.brow) {
      put(g, rbox(R.w + .02, .04, .11, .014, m.trim), R.x, R.y1 - .02, zf + .045);
      put(g, box(R.w * .72, .004, .014, M.led(0xFFF3D6)), R.x, R.y1 - .0405, zf + .07);
      P('i-light', R.x + R.w * .25, R.y1 - .05, zf + .08);
    }
    /* arka: merkezi gaz girişleri ve hortumlar */
    const K = cfg.ge.cab, zb = R.z - R.d / 2, pc = cfg.ge.pipes || [];
    if (pc.length) {
      const px = R.x + R.w * .18, py = R.y0 + .1;
      put(g, rbox(.05 + pc.length * .045, .07, .025, .008, m.panel2), px, py, zb - .012);
      pc.forEach((c, k) => {
        const x = px - (pc.length - 1) * .0225 + k * .045;
        put(g, cyl(.012, .012, .03, m.chrome, 14), x, py, zb - .035, Math.PI / 2);
        put(g, cyl(.014, .014, .012, M.plastic(c, .4), 16), x, py, zb - .028, Math.PI / 2);
        g.add(tube([[x, py, zb - .05], [x, py - .06, zb - .1], [x + .02, .45, zb - .14], [x + .06, .02, zb - .34]], .0075, M.rubber(c), 48, 8));
      });
      if (cfg.ge.pipePin) P('d-pipe', px, py + .05, zb - .05);
    }
    /* arka: yedek tüp boyunduruğu ve tüpler */
    const nc = cfg.ge.cyl || 0, cz = K.z - K.d / 2 - .075;
    for (let k = 0; k < nc; k++) {
      const x = K.x + (k - (nc - 1) / 2) * .135;
      put(g, cyl(.05, .05, .5, M.metal(0xB9C1C7, .3), 24), x, .44, cz);
      put(g, sphere(.05, M.color(cfg.ge.cylC ? cfg.ge.cylC[k % cfg.ge.cylC.length] : 0xF4F6F7)), x, .69, cz).scale.y = .6;
      put(g, cyl(.014, .014, .05, m.chrome, 12), x, .735, cz);
      put(g, rbox(.07, .06, .07, .01, m.dark), x, .77, cz + .005);
      put(g, cyl(.006, .006, .08, m.chrome, 10), x, .77, cz + .03, 0, 0, Math.PI / 2);
      put(g, rbox(.08, .03, .02, .006, m.dark), x, .3, K.z - K.d / 2 - .012);
    }
    if (nc) { put(g, rbox(nc * .135 + .03, .03, .03, .008, m.dark), K.x, .78, K.z - K.d / 2 - .02); if (cfg.ge.cylPin) P('d-cyl', K.x - (nc - 1) * .0675 - .055, .5, cz); }
  }
  /* ---------- Bölüm: taze gaz kontrolü ---------- */
  function fluted(g, x, y, z, col, r, m, big) {
    put(g, cyl(r + .004, r + .004, .008, m.dark, 24), x, y, z + .004, Math.PI / 2);
    put(g, cyl(r, r * 1.04, .028, M.plastic(col, .4), 24), x, y, z + .022, Math.PI / 2);
    if (big) for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; put(g, box(.004, .004, .026, M.plastic(col, .4)), x + Math.cos(a) * r, y + Math.sin(a) * r, z + .022); }
    put(g, cyl(r * .62, r * .62, .004, m.white, 20), x, y, z + .037, Math.PI / 2);
  }
  function flowTube(g, x, y, z, h, frac, m, r = .008, fcol = 0x2E3940) {
    put(g, rbox(r * 4.2, h + .03, .006, .004, m.white), x, y, z + .003);
    put(g, decal(r * 3.6, h, (c, Wd, Hh) => { c.strokeStyle = '#3A444B'; c.fillStyle = '#3A444B'; c.lineWidth = 2; for (let k = 0; k <= 10; k++) { const yy = Hh * (1 - k / 10); c.beginPath(); c.moveTo(Wd * (k % 5 ? .7 : .5), yy); c.lineTo(Wd, yy); c.stroke(); } }, 64), x - r * .6, y, z + .0065);
    put(g, cyl(r, r, h, M.glass(0xEAF5FA, .5), 16), x, y, z + .012);
    [-1, 1].forEach(s => put(g, cyl(r * 1.25, r * 1.25, .012, m.metal, 16), x, y + s * (h / 2 + .004), z + .012));
    put(g, cyl(r * .75, r * .2, r * 1.6, M.color(fcol, .4), 14), x, y - h / 2 + h * frac, z + .012);
  }
  function geGas(ctx) {
    const {g, cfg, P} = ctx, X = cfg.ge.gas, R = cfg.ge.tower, m = mats(ctx), zf = R.z + R.d / 2 + .006;
    if (X.kind === 'needle') {
      put(g, rbox(X.w, X.h, .012, .012, m.panel2), X.x, X.y, zf + .006);
      const fz = zf + .012, gases = [['O₂', 0x2E9E58, '1.0'], ['AIR', 0xF2C531, '1.0'], ['N₂O', 0x2F7DD1, '0.0']], ky = X.y - X.h / 2 + .045;
      gases.forEach(([l, c, v], k) => {
        const kx = X.x - X.w / 2 + .045 + k * .068;
        fluted(g, kx, ky, fz, c, k ? .016 : .019, m, !k);
        put(g, box(.058, .03, .003, m.black), kx, ky + .072, fz + .0015);
        put(g, lcd(v, .052, .024), kx, ky + .072, fz + .0032);
        put(g, txtD(l, .05, .014, {c: '#2E363C'}), kx, ky + .045, fz + .0006);
        put(g, box(.05, .003, .001, M.color(c)), kx, ky + .095, fz + .0006);
      });
      put(g, txtD('L/min', .05, .011, {c: '#5B656C', wt: 600}), X.x - X.w / 2 + .113, ky + .108, fz + .0006);
      const tx = X.x + X.w / 2 - .04;
      flowTube(g, tx, X.y + .01, fz, X.h * .62, .3, m, .009);
      put(g, txtD('Total flow', .06, .011, {c: '#3E474E', wt: 600}), tx, X.y - X.h / 2 + .022, fz + .0006);
      P('i-needle', X.x - X.w / 2 + .11, ky + .01, fz + .045);
      P('i-flowtube', tx, X.y + .03, fz + .03);
      if (X.aux) {
        const [ax, ay] = X.aux;
        put(g, rbox(.055, .15, .02, .008, m.panel2), ax, ay, zf + .01);
        flowTube(g, ax, ay + .02, zf + .02, .075, .2, m, .0065, 0x2E9E58);
        fluted(g, ax, ay - .05, zf + .02, 0x2E9E58, .011, m, true);
        put(g, txtD('Aux O₂', .05, .011, {c: '#2E363C', wt: 700}), ax, ay + .069, zf + .0205);
        put(g, cyl(.005, .006, .025, m.white, 12), ax - .035, ay - .05, zf + .01, 0, 0, Math.PI / 2);
        P('i-auxo2', ax, ay + .02, zf + .04);
      }
    } else if (X.kind === 'alt') {
      put(g, rbox(X.w, X.h, .012, .012, m.panel2), X.x, X.y, zf + .006);
      const fz = zf + .012;
      flowTube(g, X.x, X.y + .025, fz, X.h * .5, .12, m, .0075, 0x2E9E58);
      fluted(g, X.x, X.y - X.h / 2 + .04, fz, 0x2E9E58, .016, m, true);
      put(g, txtD('ALT O₂', .07, .014, {c: '#2E5E3E'}), X.x, X.y + X.h / 2 - .016, fz + .0006);
      put(g, txtD('L/min', .04, .01, {c: '#5B656C', wt: 600}), X.x + .03, X.y + .025, fz + .0006);
      P('i-alto2', X.x, X.y + .02, fz + .035);
    } else {
      /* klasik mekanik akış ölçer sırası (temsili): cam pencere arkasında üç tüp, altında iğne valf düğmeleri */
      const fz = zf + .006;
      put(g, rbox(X.w, X.h, .03, .012, m.panel2), X.x, X.y, fz + .015);
      const th = X.h * .6, ty = X.y + X.h * .1, gases = [['AIR', 0xF2C531, .25], ['N₂O', 0x2F7DD1, .0], ['O₂', 0x2E9E58, .35]];
      put(g, box(X.w - .02, th + .03, .002, M.matte(0xEEF1F2, .6)), X.x, ty, fz + .031);
      gases.forEach(([l, c, f], k) => {
        const x = X.x - X.w / 2 + .04 + k * (X.w - .08) / 2;
        flowTube(g, x, ty, fz + .029, th, Math.max(.04, f), m, .0085, 0x1F262B);
        put(g, txtD(l, .045, .013, {c: '#2E363C'}), x, ty + th / 2 + .028, fz + .0325);
        put(g, box(.04, .003, .001, M.color(c)), x, ty + th / 2 + .017, fz + .0325);
        fluted(g, x, X.y - X.h / 2 + .03, fz + .03, c, k === 2 ? .018 : .015, m, k === 2);
      });
      put(g, box(X.w - .016, th + .034, .003, M.glass(0xDCECF2, .22)), X.x, ty, fz + .052);
      P('d-gas', X.x, ty, fz + .07);
      if (X.gauges) X.gauges.forEach(([gx, gy, l]) => {
        put(g, cyl(.026, .026, .016, m.dark, 28), gx, gy, zf + .008, Math.PI / 2);
        put(g, decal(.044, .044, (c, Wd, Hh) => { c.fillStyle = '#F7F7F2'; c.beginPath(); c.arc(Wd / 2, Hh / 2, Wd / 2, 0, 7); c.fill(); c.strokeStyle = '#222'; c.lineWidth = 3; for (let k = 0; k < 9; k++) { const a = Math.PI * (.75 + k * .1875); c.beginPath(); c.moveTo(Wd / 2 + Math.cos(a) * Wd * .34, Hh / 2 + Math.sin(a) * Hh * .34); c.lineTo(Wd / 2 + Math.cos(a) * Wd * .44, Hh / 2 + Math.sin(a) * Hh * .44); c.stroke(); } c.strokeStyle = '#111'; c.lineWidth = 4; c.beginPath(); c.moveTo(Wd / 2, Hh / 2); c.lineTo(Wd * .72, Hh * .3); c.stroke(); c.fillStyle = '#333'; c.font = `700 ${Hh * .13}px Arial`; c.textAlign = 'center'; c.fillText(l, Wd / 2, Hh * .78); }, 128), gx, gy, zf + .0165);
      });
    }
    if (X.acgo) {
      const [ax, ay, az] = X.acgo;
      put(g, rbox(.085, .045, .022, .008, m.panel2), ax, ay, az);
      put(g, rbox(.03, .016, .008, .004, m.dark), ax - .018, ay + .004, az + .014);
      put(g, cyl(.004, .004, .022, m.chrome, 10), ax - .018, ay + .012, az + .02, -.6);
      put(g, cyl(.011, .0115, .026, m.white, 18), ax + .022, ay - .002, az + .024, Math.PI / 2);
      put(g, txtD('ACGO', .04, .01, {c: '#2E363C'}), ax - .018, ay - .014, az + .0112);
      P('i-acgo', ax, ay + .01, az + .04);
    }
    if (X.flush) {
      const [fx, fy, fz] = X.flush;
      put(g, cyl(.02, .02, .008, m.dark, 24), fx, fy, fz + .004, Math.PI / 2);
      put(g, cyl(.015, .015, .012, M.plastic(0x2E9E58, .4), 24), fx, fy, fz + .012, Math.PI / 2);
      put(g, txtD('O₂+', .03, .011, {c: '#2E363C'}), fx, fy - .03, fz + .0006);
      if (X.flushPin) P('d-flush', fx, fy, fz + .03);
    }
  }
  /* ---------- Bölüm: Selectatec manifoldu ve Tec tipi vaporizatörler (temsili biçim) ---------- */
  function tec7(g, x, y, z, agent, m) {
    const W = .105, H = .2, Dp = .15, col = AG[agent], cm = M.plastic(col, .38), v = new THREE.Group(); v.position.set(x, y, z); g.add(v);
    put(v, rbox(W, H, Dp, .014, m.vap), 0, H / 2, 0);
    put(v, box(W + .002, .02, Dp + .002, cm), 0, H * .66, 0);
    put(v, rbox(.084, .05, .03, .008, m.vapTop), 0, H * .78, -Dp / 2 - .012);
    put(v, cyl(.047, .049, .03, m.vapTop, 40), 0, H + .015, -.006);
    const ring = ringMesh(.0495, .014, dialTex(agent)); ring.position.set(0, H + .013, -.006); v.add(ring);
    put(v, cyl(.046, .047, .008, cm, 40), 0, H + .034, -.006);
    put(v, rbox(.074, .016, .02, .007, m.knob), 0, H + .046, -.006);
    put(v, cyl(.006, .006, .01, cm, 12), 0, H + .02, .044, Math.PI / 2);
    put(v, cyl(.006, .006, .025, m.metal, 12), W * .32, H + .012, -Dp / 2 + .02);
    put(v, rbox(.04, .008, .014, .004, m.dark), W * .32 - .016, H + .026, -Dp / 2 + .02);
    put(v, rbox(.046, .055, .022, .006, cm), -.022, .045, Dp / 2 + .008);
    put(v, cyl(.009, .009, .01, m.dark, 16), -.022, .05, Dp / 2 + .02, Math.PI / 2);
    put(v, rbox(.012, .075, .005, .003, M.glass(0xD8ECF4, .65)), .03, .07, Dp / 2 + .003);
    put(v, box(.008, .035, .002, M.color(col, .3)), .03, .055, Dp / 2 + .004);
    put(v, txtD('Tec 7', .05, .013, {c: '#59646B', wt: 700}), -.018, H * .86, Dp / 2 + .0008);
    put(v, txtD(AGN[agent], .07, .01, {c: '#59646B', wt: 600}), 0, H * .52, Dp / 2 + .0008);
    return v;
  }
  function tec6(g, x, y, z, m, back) {
    const W = .13, H = .24, Dp = .17, cm = M.plastic(AG.des, .38), v = new THREE.Group(); v.position.set(x, y, z); g.add(v);
    put(v, rbox(W, H, Dp, .016, M.plastic(0xE2E5E7, .34)), 0, H / 2, 0);
    put(v, box(W + .002, .022, Dp + .002, cm), 0, H * .7, 0);
    put(v, rbox(.1, .05, .03, .008, m.vapTop), 0, H * .8, -Dp / 2 - .012);
    put(v, rbox(W * .82, .08, .004, .006, M.plastic(0x3B444B, .4)), 0, H * .38, Dp / 2 + .002);
    [[0x37D67A, -.035], [0xF2B03A, 0], [0xE04A3A, .035]].forEach(([c, dx]) => put(v, cyl(.0045, .0045, .003, M.led(c), 14), dx, H * .44, Dp / 2 + .005, Math.PI / 2));
    for (let k = 0; k < 8; k++) put(v, box(.008, .012, .002, M.led(k < 6 ? 0x5BC8F0 : 0x24323A)), -.035 + k * .01, H * .32, Dp / 2 + .0045);
    put(v, cyl(.05, .052, .034, m.vapTop, 40), 0, H + .017, -.01);
    const ring = ringMesh(.0525, .014, dialTex('des')); ring.position.set(0, H + .015, -.01); v.add(ring);
    put(v, cyl(.049, .05, .009, cm, 40), 0, H + .038, -.01);
    put(v, rbox(.08, .017, .022, .008, m.knob), 0, H + .05, -.01);
    put(v, cyl(.02, .02, .014, cm, 28), .035, H * .12, Dp / 2 + .007, Math.PI / 2);
    put(v, cyl(.01, .01, .006, m.white, 18), .035, H * .12, Dp / 2 + .016, Math.PI / 2);
    put(v, txtD('Tec 6 Plus', .07, .013, {c: '#59646B', wt: 700}), -.02, H * .88, Dp / 2 + .0008);
    put(v, txtD('Desflurane', .07, .01, {c: '#59646B', wt: 600}), -.02, H * .55, Dp / 2 + .0008);
    g.add(tube([V3(x + W / 2 - .015, y + .04, z - Dp / 2 - .005), V3(x + W / 2 + .01, y + .02, z - Dp / 2 - .03), V3(x + W / 2 + .005, y + .1, back - .01)], .004, M.rubber(0x2B3136), 24, 8));
    return v;
  }
  function geVap(ctx) {
    const {g, cfg, P} = ctx, V = cfg.ge.vap, R = cfg.ge.tower, m = mats(ctx), zb = R.z + R.d / 2 + .006, gap = V.gap || .13;
    const x0 = V.pos[0], x1 = V.pos[V.pos.length - 1], by = V.y + .16;
    put(g, rbox(x1 - x0 + gap, .05, .036, .01, m.metal), (x0 + x1) / 2, by, zb + .018);
    put(g, box(x1 - x0 + gap - .02, .004, .002, m.seam), (x0 + x1) / 2, by + .012, zb + .0365);
    put(g, txtD('Selectatec', .06, .01, {c: '#5B656C', wt: 600}), x0 - gap / 2 + .04, by - .016, zb + .0362);
    V.pos.forEach((x, i) => {
      [-1, 1].forEach(s => { put(g, cyl(.008, .008, .018, m.chrome, 14), x + s * .026, by + .034, zb + .018); put(g, cyl(.011, .011, .004, m.dark, 14), x + s * .026, by + .027, zb + .018); });
      const it = V.list[i]; if (!it) { put(g, txtD('—', .03, .012, {c: '#8A949A'}), x, by, zb + .0362); return; }
      const [agent, kind] = it;
      if (kind === 'tec6') tec6(g, x, V.y + .004, zb + .036 + .085 + .012, m, zb);
      else tec7(g, x, V.y + .004, zb + .036 + .075 + .012, agent, m);
    });
    P(V.text, V.pos[0], V.y + .25, zb + .16);
  }
  /* ---------- Bölüm: GE tipi kompakt solunum sistemi (sol yanda): körük haznesi, absorban, portlar, APL, balon ---------- */
  function geBS(ctx) {
    const {g, cfg, P, screens} = ctx, B = cfg.ge.bs, K = cfg.ge.cab, m = mats(ctx), {x, y, z} = B, lm = M.plastic(B.limbC || 0xB9DDF2, .4);
    const ty = y + .045, zfr = z + .115;
    /* bağlantı kolu (dolabın sol yanına) */
    put(g, rbox(K.x - K.w / 2 - (x + .1) + .03, .045, .09, .01, m.dark), (K.x - K.w / 2 + x + .1) / 2, y - .02, z - .03);
    /* gövde: koyu alt taban + açık üst blok */
    put(g, rbox(.22, .05, .23, .016, m.bsDark), x, y - .025, z);
    put(g, rbox(.214, .05, .224, .016, m.bs), x, y + .02, z);
    put(g, box(.2, .003, .002, m.seam), x, y - .003, zfr + .0005);
    /* körük haznesi (şeffaf), içinde körük (animasyonlu) */
    const bx = x - .01, bz = z - .045, hh = B.hh || .25;
    put(g, cyl(.09, .092, .022, m.bsDark, 40), bx, ty + .011, bz);
    put(g, cyl(.08, .08, hh, M.clear(0xE6F1F5, .28), 40, true), bx, ty + .022 + hh / 2, bz);
    put(g, lathe([[0, 0], [.083, 0], [.083, .008], [.07, .022], [.03, .03], [0, .031]], M.clear(0xE6F1F5, .35), 40), bx, ty + .022 + hh, bz);
    for (let k = 0; k < 5; k++) put(g, box(.002, .002, .012, m.seam), bx + .081 * Math.cos(k * .5 - 1), ty + .04 + k * hh * .2, bz + .081 * Math.sin(k * .5 - 1) + .0);
    const bel = new THREE.Group(); bel.position.set(bx, ty + .022, bz); g.add(bel);
    const pts = [[0, 0]], n = 14, bh = hh * .88;
    for (let k = 0; k <= n; k++) pts.push([k % 2 ? .06 : .07, k / n * bh]);
    pts.push([.05, bh + .004], [0, bh + .004]);
    bel.add(lathe(pts, M.color(B.belC || 0x8FC3E6, .5), 36));
    screens.push({update(t) { const p = (t * .2) % 1; bel.scale.y = p < .35 ? 1 - .5 * p / .35 : .5 + .5 * Math.min(1, (p - .35) / .45); }});
    P('d-bellows', bx, ty + hh * .62, bz + .09);
    /* absorban kabı (altta) */
    const ah = B.ah || .2, ax = x + .025, az = z + .02, ay = y - .05 - .012 - ah / 2;
    put(g, cyl(.076, .076, .022, m.bsDark, 36), ax, y - .05 - .011, az);
    put(g, cyl(.069, .069, ah, M.clear(0xF2F6F8, .38), 36), ax, ay, az);
    put(g, cyl(.063, .063, ah * .9, M.color(B.absC || 0xE9E1F2, .9), 28), ax, ay, az);
    put(g, cyl(.071, .068, .026, m.bsDark, 36), ax, ay - ah / 2 - .01, az);
    g.add(tube([[ax - .04, ay - ah / 2 - .02, az + .06], [ax, ay - ah / 2 - .035, az + .085], [ax + .04, ay - ah / 2 - .02, az + .06]], .006, m.bsDark, 20, 8));
    P('d-absorber', ax, ay, az + .075);
    /* insp/eksp portları; akım sensörü gövdeleri; (eski tipte) üstte tek yönlü valf kubbeleri */
    const ends = [];
    [[-1, 'INSP'], [1, 'EXP']].forEach(([s, l]) => {
      const px = x + s * .05 + .02, py = y - .006;
      if (B.sensors) {
        put(g, cyl(.018, .018, .032, M.clear(0xE9F2F6, .55), 20), px, py, zfr + .016, Math.PI / 2);
        put(g, cyl(.013, .013, .03, m.white, 16), px, py, zfr + .016, Math.PI / 2);
        put(g, rbox(.016, .016, .02, .004, m.dark), px, py + .021, zfr + .016);
      }
      const p0 = zfr + (B.sensors ? .032 : 0);
      put(g, cyl(.0115, .0125, .04, m.white, 18), px, py, p0 + .02, Math.PI / 2);
      ends.push(V3(px, py, p0 + .04), V3(px, py - .005, p0 + .1));
      put(g, txtD(l, .036, .009, {c: '#3E474E'}), px, y + .03, zfr + .0005);
      if (B.domes) {
        put(g, cyl(.026, .026, .012, m.bsDark, 24), px, ty + .006, z + .06);
        put(g, lathe([[0, 0], [.024, 0], [.024, .018], [.016, .026], [0, .028]], M.clear(0xEAF4F8, .45), 28), px, ty + .012, z + .06);
        put(g, cyl(.018, .018, .002, M.color(0x8FA3AE)), px, ty + .02, z + .06);
      }
    });
    P('d-valves', x + .02, y - .006, zfr + .09);
    if (B.sensors && B.fsPin) P(B.fsKey || 'i-flowsensor', x - .03, y + .02, zfr + .04);
    /* APL valfi */
    const apx = x - .07, apz = z + .075;
    put(g, cyl(.024, .024, .012, m.bsDark, 24), apx, ty + .006, apz);
    put(g, cyl(.02, .021, .03, M.plastic(B.aplC || 0xE8D23A, .4), 28), apx, ty + .027, apz);
    for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; put(g, box(.003, .026, .003, M.plastic(B.aplC || 0xE8D23A, .4)), apx + Math.cos(a) * .0205, ty + .027, apz + Math.sin(a) * .0205, 0, -a, 0); }
    put(g, cyl(.012, .012, .004, m.white, 18), apx, ty + .044, apz);
    put(g, txtD('APL', .03, .009, {c: '#3E474E'}), apx, ty + .0006, apz + .035, -Math.PI / 2);
    P('d-apl', apx, ty + .06, apz);
    /* balon/ventilatör anahtarı */
    const sx = x + .07, sz = z + .07;
    put(g, rbox(.05, .014, .045, .005, m.bsDark), sx, ty + .007, sz);
    put(g, rbox(.012, .034, .014, .005, m.white), sx + .008, ty + .025, sz, 0, 0, -.45);
    put(g, txtD('BAG  VENT', .05, .008, {c: '#3E474E'}), sx, ty + .0006, sz + .03, -Math.PI / 2);
    if (B.bvPin) P('i-bagvent', sx, ty + .05, sz);
    /* balon kolu, balon portu ve balon */
    const a0 = V3(x - .095, ty, z + .02), a1 = V3(x - .095, ty + .13, z + .03), a2 = V3(x - .2, ty + .15, z + .07), a3 = V3(x - .25, ty + .14, z + .08);
    put(g, cyl(.013, .013, .025, m.bsDark, 18), a0.x, ty + .012, a0.z);
    g.add(tube([a0, a1, V3(x - .14, ty + .158, z + .05), a2, a3], .009, m.metal, 40, 10));
    put(g, cyl(.012, .012, .04, m.white, 16), a3.x, a3.y - .02, a3.z);
    const bl = B.bagLen || .28, bp = [[0, 0], [.012, 0], [.012, -.022]];
    for (let k = 1; k <= 20; k++) { const u = k / 20, r = .012 + (.064 - .012) * Math.pow(Math.sin(Math.min(1, u * 1.08) * Math.PI * .5), 1.4) * (u > .72 ? Math.sqrt(Math.max(0, 1 - Math.pow((u - .72) / .28, 2))) : 1); bp.push([Math.max(.0005, r), -.022 - u * (bl - .022)]); }
    put(g, lathe(bp, M.rubber(B.bagC || 0x2B6E5A), 36), a3.x, a3.y - .04, a3.z);
    P('d-bag', a3.x, a3.y - .04 - bl * .55, a3.z + .07);
    /* hortumlar ve Y parça (hasta devresi aksesuarı; temsili) */
    const yp = V3(x - .02, y - .27, z + .5);
    [-1, 1].forEach((s, i) => g.add(corrugated([ends[i * 2], ends[i * 2 + 1], V3(x + s * .05, y - .12, z + .32), V3(yp.x + s * .02, yp.y + .04, yp.z - .1), V3(yp.x + s * .012, yp.y + .015, yp.z - .03)], .011, lm)));
    put(g, cyl(.013, .013, .05, m.white, 16), yp.x, yp.y, yp.z, Math.PI / 2);
    put(g, cyl(.026, .026, .03, M.clear(0xEEF4F7, .55), 24), yp.x, yp.y, yp.z + .04, Math.PI / 2);
  }
  /* ---------- Bölüm: ekran (sol kollu 15" ya da gövde üstü ventilatör kutusu) ---------- */
  function geScreen(ctx) {
    const {g, cfg, screens, parts} = ctx, S = cfg.ge.scr, R = cfg.ge.tower, m = mats(ctx);
    const sg = new THREE.Group(); sg.position.set(S.x, S.y, S.z); sg.rotation.set(S.tilt || 0, S.yaw || 0, 0, 'YXZ'); g.add(sg);
    const [bl, bt, br, bb] = S.bezel, HW = S.w + bl + br, HH = S.h + bt + bb, ox = (bl - br) / 2, oy = (bb - bt) / 2, d = S.d || .055;
    put(sg, rbox(HW, HH, d, .016, M.plastic(S.color || 0xE9ECEE, .36)), 0, 0, -d / 2);
    put(sg, rbox(HW * .7, HH * .7, .04, .014, m.trim), 0, -HH * .04, -d - .015);
    put(sg, box(S.w + .014, S.h + .014, .002, M.matte(S.frameC || 0x2A3035, .5)), ox, oy, .0012);
    put(sg, box(S.w + .003, S.h + .003, .002, m.black), ox, oy, .0024);
    const scr = makeScreen(S.w, S.h, S.spec, S.px || 1024); put(sg, scr.mesh, ox, oy, .0038); screens.push(scr);
    let kx = 0, ky = 0;
    if (S.keys === 'right') {
      const cx = HW / 2 - br / 2;
      for (let k = 0; k < 6; k++) put(sg, rbox(br * .55, .022, .006, .004, M.plastic(k === 0 ? 0xE8D23A : 0xC9CFD3, .4)), cx, HH / 2 - bt - .02 - k * .033, .003);
      kx = cx; ky = -HH / 2 + bb + .035;
    } else {
      const n = S.nk || 6;
      for (let k = 0; k < n; k++) put(sg, rbox(.026, .012, .006, .004, M.plastic(k === 0 ? 0xE8D23A : 0xC9CFD3, .4)), -HW / 2 + .04 + k * .036, -HH / 2 + bb / 2, .003);
      kx = HW / 2 - .045; ky = -HH / 2 + bb / 2;
    }
    put(sg, cyl(.022, .023, .016, m.knob, 32), kx, ky, .008, Math.PI / 2);
    put(sg, torus(.0225, .0022, M.plastic(0xA9B1B6, .4), 32), kx, ky, .0155);
    put(sg, cyl(.006, .006, .003, M.led(0x37D67A), 14), -HW / 2 + .02, -HH / 2 + .012, .0015, Math.PI / 2);
    put(sg, box(HW * .3, .007, .004, M.led(0xF2B03A)), 0, HH / 2 - .006, .0015);
    if (S.brand) put(sg, txtD(S.brand, .1, .014, {c: '#6A7680', wt: 600}), ox, HH / 2 - bt / 2 - .004, .0008);
    sg.updateMatrixWorld(true); g.updateMatrixWorld(true);
    if (S.mount === 'arm') {
      const back = sg.localToWorld(V3(0, -HH * .1, -d - .035)), px = R.x - R.w / 2 + .045, pz = R.z - .02, ptop = R.y1 + .035;
      put(g, cyl(.024, .024, .05, m.trim, 24), px, ptop + .025, pz);
      put(g, cyl(.026, .026, .012, m.dark, 24), px, ptop + .056, pz);
      const mid = V3((px + back.x) / 2 - .02, Math.max(ptop + .07, back.y + .02), (pz + back.z) / 2);
      g.add(tube([V3(px, ptop + .06, pz), V3(px - .01, ptop + .075, pz + .02), mid, V3(back.x, back.y + .015, back.z - .02), back], .017, M.plastic(S.armC || 0xD6DBDE, .4), 40, 12));
      put(g, sphere(.024, m.dark, 18), back.x, back.y, back.z);
    } else if (S.mount === 'pod') {
      const base = sg.localToWorld(V3(0, -HH / 2, -d * .6));
      put(g, rbox(HW * .55, Math.max(.03, base.y - R.y1 - .03), .07, .012, m.trim), base.x, (base.y + R.y1 + .035) / 2, base.z);
    }
    parts.push({key: S.pin, at: sg.localToWorld(V3(ox, oy, .04))}, {key: 'knob', at: sg.localToWorld(V3(kx, ky, .03))});
    return {sx: S.x, sy: S.y, sz: S.z};
  }
  /* ---------- Bölüm: üst raf monitörü (yalnız Avance yapılandırmasında) ---------- */
  function geMons(ctx) {
    const {g, cfg, screens, parts} = ctx, m = mats(ctx);
    (cfg.ge.mons || []).forEach(o => {
      const mg = new THREE.Group(); mg.position.set(o.x, o.y, o.z); mg.rotation.set(o.tilt || 0, o.yaw || 0, 0, 'YXZ'); g.add(mg);
      const [bl, bt, br, bb] = o.bezel, HW = o.w + bl + br, HH = o.h + bt + bb, ox = (bl - br) / 2, oy = (bb - bt) / 2;
      put(mg, rbox(HW, HH, .05, .014, M.plastic(o.color || 0xE4E7E9, .36)), 0, 0, -.025);
      put(mg, rbox(HW * .75, HH * .7, .05, .014, m.trim), 0, -HH * .05, -.07);
      put(mg, box(o.w + .004, o.h + .004, .002, m.black), ox, oy, .0012);
      const s = makeScreen(o.w, o.h, o.spec, 1024); put(mg, s.mesh, ox, oy, .0028); screens.push(s);
      for (let k = 0; k < 7; k++) put(mg, rbox(.022, .01, .005, .003, M.plastic(k === 6 ? 0xE8D23A : 0xBFC6CB, .4)), -HW / 2 + .04 + k * .03, -HH / 2 + bb / 2, .0025);
      put(mg, cyl(.016, .017, .012, m.knob, 28), HW / 2 - .04, -HH / 2 + bb / 2, .006, Math.PI / 2);
      mg.updateMatrixWorld(true);
      const foot = mg.localToWorld(V3(0, -HH / 2, -.06));
      put(g, cyl(.02, .02, Math.max(.02, foot.y - o.shelfY), m.trim, 20), foot.x, (foot.y + o.shelfY) / 2, foot.z);
      put(g, rbox(.14, .012, .1, .005, m.trim), foot.x, o.shelfY + .006, foot.z);
      parts.push({key: o.pin, at: mg.localToWorld(V3(ox, oy, .05))});
    });
  }
  /* ---------- Bölüm: atık gaz alıcısı (yalnız Carestation 650; isteğe bağlı seçenek) ---------- */
  function geAgss(g, ctx) {
    const {cfg, P} = ctx, K = cfg.ge.cab, B = cfg.ge.bs, m = mats(ctx), ax = K.x - K.w / 2 - .035, az = K.z - K.d * .3, ay = .48;
    put(g, rbox(.05, .2, .06, .012, m.panel2), ax, ay, az);
    put(g, cyl(.012, .012, .12, M.glass(0xEAF5FA, .5), 16), ax - .026, ay + .01, az + .012);
    put(g, sphere(.008, M.color(0x2E9E58)), ax - .026, ay - .01, az + .012);
    g.add(tube([[B.x + .06, B.y - .05, B.z - .1], [B.x + .08, ay + .15, az + .05], [ax - .01, ay + .1, az + .02]], .009, M.rubber(0x3A4148), 24, 8));
    P('d-agss', ax - .03, ay, az + .03);
  }
  /* Kaynakla desteklenmeyen genel parça işaretlerini kaldırır (geometri kalır, yalnız etkileşim noktası çıkar) */
  const dropPins = (ctx, keys) => { for (let i = ctx.parts.length - 1; i >= 0; i--) if (keys.includes(ctx.parts[i].key)) ctx.parts.splice(i, 1); };
  const GE_SECTIONS = {base: geBase, cabinet: geCab, worktop: geTop, tower: geTower, gas: geGas, vapor: geVap, bs: geBS, screen: geScreen, monitors: geMons};

  /* ---------- Ekranlar (bağımsız çizim; değerler örnektir) ---------- */
  const vTiles = (L, tiles, y0, h, x0 = .005, x1 = .995, fill = '#C9CED2', ink = '#141A1F') => {
    const n = tiles.length, w = (x1 - x0) / n;
    tiles.forEach(([l, v], k) => { const x = x0 + k * w + .003; L.push({t: 'box', x, y: y0, w: w - .006, h, fill, r: .012}, {t: 'text', txt: l, x, y: y0 + h * .05, w: w - .006, h: h * .34, c: ink, s: h * .2, al: 'c', wt: 600}, {t: 'text', txt: v, x, y: y0 + h * .4, w: w - .006, h: h * .5, c: ink, s: h * .36, al: 'c', wt: 800}); });
  };
  const flowBars = (L, x, y, w, h, rows) => {
    L.push({t: 'box', x, y, w, h, fill: '#11171B', r: .01});
    const bw = w / rows.length;
    rows.forEach(([l, v, f, c], k) => {
      const cx = x + bw * k + bw * .3, top = y + h * .2, bh = h * .58;
      L.push({t: 'box', x: cx, y: top, w: bw * .4, h: bh, fill: '#232C32', stroke: '#56636B', lw: .002}, {t: 'box', x: cx, y: top + bh * (1 - f), w: bw * .4, h: bh * f, fill: c},
        {t: 'text', txt: l, x: x + bw * k, y: y + h * .03, w: bw, h: h * .15, c, s: h * .085, al: 'c'}, {t: 'text', txt: v, x: x + bw * k, y: y + h * .8, w: bw, h: h * .17, c: '#E6EEF2', s: h * .1, al: 'c', wt: 800});
    });
  };
  /* Carestation 650: üst bilgi, solda Paw/akım/CO₂ eğrileri, sağda ölçülen değerler, altta solda elektronik akış ölçerler ve ajan satırı,
     en altta 7 ventilasyon hızlı tuşu (K213867: 600 serisinde 7 ventilasyon hızlı tuşu; gaz hızlı tuşu yok) */
  function scr650() {
    const L = [{t: 'box', x: 0, y: 0, w: 1, h: .06, fill: '#1A2026'}, {t: 'text', txt: 'VCV', x: .01, y: 0, w: .1, h: .06, c: '#E6EEF2', s: .034}, {t: 'text', txt: 'Adult', x: .12, y: 0, w: .2, h: .06, c: '#9AA8B0', s: .028},
      {t: 'box', x: .36, y: .008, w: .28, h: .044, fill: '#E8D23A', r: .006}, {t: 'text', txt: 'Checkout complete', x: .36, y: .008, w: .28, h: .044, c: '#111', s: .026, al: 'c'}, {t: 'text', txt: '10:42', x: .8, y: 0, w: .19, h: .06, c: '#E6EEF2', s: .03, al: 'r'},
      {t: 'wave', k: 'paw', x: .01, y: .08, w: .66, h: .19, c: '#E8D23A', l: 'Paw cmH₂O', span: 3.5, ls: .026, grid: true},
      {t: 'wave', k: 'flow', x: .01, y: .28, w: .66, h: .2, c: '#3CCB7F', l: 'Flow L/min', span: 3.5, ls: .026, grid: true},
      {t: 'wave', k: 'capno', x: .01, y: .49, w: .66, h: .13, c: '#C9D0D5', l: 'CO₂ mmHg', span: 3.5, amp: .5, ls: .026},
      {t: 'tile', x: .69, y: .08, w: .3, h: .13, l: 'Ppeak', u: 'cmH₂O', v: 17, c: '#E8D23A', al: 'r', live: true},
      {t: 'tile', x: .69, y: .22, w: .145, h: .1, l: 'Pmean', v: 9, c: '#E8D23A', al: 'r'}, {t: 'tile', x: .845, y: .22, w: .145, h: .1, l: 'PEEP', v: 5, c: '#E8D23A', al: 'r'},
      {t: 'tile', x: .69, y: .33, w: .145, h: .13, l: 'VTexp', v: 448, c: '#3CCB7F', al: 'r', live: true}, {t: 'tile', x: .845, y: .33, w: .145, h: .13, l: 'MV', v: '5.4', c: '#3CCB7F', al: 'r'},
      {t: 'tile', x: .69, y: .47, w: .145, h: .15, l: 'EtCO₂', v: 37, c: '#E6EEF2', al: 'r', live: true}, {t: 'tile', x: .845, y: .47, w: .145, h: .15, l: 'FiO₂', v: 52, c: '#E6EEF2', al: 'r'}];
    flowBars(L, .01, .635, .3, .17, [['O₂', '1.0', .35, '#3CCB7F'], ['Air', '1.0', .35, '#E8D23A'], ['N₂O', '0.0', .02, '#5BA8F0']]);
    L.push({t: 'box', x: .32, y: .635, w: .67, h: .17, fill: '#11171B', r: .01},
      {t: 'text', txt: 'Sev   Et 1.9   Fi 2.1   MAC 1.0', x: .33, y: .645, w: .65, h: .06, c: '#E8D23A', s: .034},
      {t: 'text', txt: 'Total flow 2.0 L/min', x: .33, y: .705, w: .4, h: .05, c: '#C9D0D5', s: .028},
      {t: 'text', txt: 'ecoFLOW', x: .74, y: .705, w: .24, h: .05, c: '#3CCB7F', s: .028, al: 'r'},
      {t: 'bar', x: .34, y: .765, w: .63, h: .022, v: .42, c: '#3CCB7F'});
    vTiles(L, [['VT', '450'], ['RR', '12'], ['I:E', '1:2'], ['Tpause', 'Off'], ['Plimit', '40'], ['PEEP', '5'], ['Menu', '…']], .82, .17);
    return {bg: '#000000', layout: L};
  }
  /* Avance CS²: elektronik karıştırıcı — gaz ayarı ekranın sağ panelinde (O₂ %, toplam akış, dengeleyici gaz) ve elektronik akış ölçer çubukları;
     ecoFLOW göstergesi; altta ventilasyon ayar kutuları */
  function scrAv() {
    const L = [{t: 'box', x: 0, y: 0, w: 1, h: .06, fill: '#20262C'}, {t: 'text', txt: 'PCV-VG', x: .01, y: 0, w: .2, h: .06, c: '#E6EEF2', s: .034}, {t: 'text', txt: 'Adult', x: .2, y: 0, w: .2, h: .06, c: '#9AA8B0', s: .028}, {t: 'text', txt: '10:42', x: .8, y: 0, w: .19, h: .06, c: '#E6EEF2', s: .03, al: 'r'},
      {t: 'wave', k: 'paw', x: .01, y: .08, w: .5, h: .2, c: '#E8D23A', l: 'Paw', span: 3, ls: .026, grid: true},
      {t: 'wave', k: 'flow', x: .01, y: .29, w: .5, h: .2, c: '#3CCB7F', l: 'Flow', span: 3, ls: .026, grid: true},
      {t: 'wave', k: 'capno', x: .01, y: .5, w: .5, h: .13, c: '#C9D0D5', l: 'CO₂', span: 3, amp: .5, ls: .026},
      {t: 'tile', x: .52, y: .08, w: .2, h: .12, l: 'Ppeak', v: 16, c: '#E8D23A', al: 'r', live: true}, {t: 'tile', x: .52, y: .21, w: .2, h: .1, l: 'PEEP', v: 5, c: '#E8D23A', al: 'r'},
      {t: 'tile', x: .52, y: .32, w: .2, h: .12, l: 'VTexp', v: 452, c: '#3CCB7F', al: 'r', live: true}, {t: 'tile', x: .52, y: .45, w: .2, h: .09, l: 'RR', v: 12, c: '#3CCB7F', al: 'r'},
      {t: 'tile', x: .52, y: .55, w: .2, h: .08, l: 'EtCO₂', v: 36, c: '#E6EEF2', al: 'r'},
      /* sağ: gaz paneli */
      {t: 'box', x: .735, y: .075, w: .26, h: .56, fill: '#15202A', r: .012}, {t: 'text', txt: 'Fresh gas', x: .745, y: .08, w: .24, h: .05, c: '#9FC6E8', s: .028},
      {t: 'box', x: .745, y: .135, w: .115, h: .11, fill: '#C9CED2', r: .01}, {t: 'text', txt: 'O₂ %', x: .745, y: .14, w: .115, h: .035, c: '#141A1F', s: .022, al: 'c'}, {t: 'text', txt: '50', x: .745, y: .175, w: .115, h: .065, c: '#141A1F', s: .05, al: 'c', wt: 800},
      {t: 'box', x: .87, y: .135, w: .115, h: .11, fill: '#C9CED2', r: .01}, {t: 'text', txt: 'Total', x: .87, y: .14, w: .115, h: .035, c: '#141A1F', s: .022, al: 'c'}, {t: 'text', txt: '1.0', x: .87, y: .175, w: .115, h: .065, c: '#141A1F', s: .05, al: 'c', wt: 800},
      {t: 'box', x: .745, y: .255, w: .24, h: .05, fill: '#2A3A48', r: .008}, {t: 'text', txt: 'Balance gas: Air', x: .745, y: .255, w: .24, h: .05, c: '#E6EEF2', s: .024, al: 'c'}];
    flowBars(L, .745, .315, .24, .2, [['O₂', '0.61', .3, '#3CCB7F'], ['Air', '0.39', .2, '#E8D23A'], ['N₂O', '0.0', .02, '#5BA8F0']]);
    L.push({t: 'text', txt: 'ecoFLOW', x: .745, y: .525, w: .24, h: .04, c: '#3CCB7F', s: .024}, {t: 'bar', x: .75, y: .57, w: .23, h: .02, v: .3, c: '#3CCB7F'}, {t: 'text', txt: 'Sev 2.0 %   MAC 1.0', x: .745, y: .595, w: .24, h: .035, c: '#E8D23A', s: .022});
    L.push({t: 'box', x: 0, y: .65, w: 1, h: .15, fill: '#0E1317'}, {t: 'trend', x: .01, y: .66, w: .7, h: .13, max: 100, lines: [{c: '#E8D23A', base: 45, amp: 8, seed: 3}, {c: '#3CCB7F', base: 62, amp: 6, seed: 5}]}, {t: 'text', txt: 'Gas trend', x: .72, y: .66, w: .27, h: .05, c: '#9AA8B0', s: .026});
    vTiles(L, [['VT', '450'], ['RR', '12'], ['I:E', '1:2'], ['Tpause', 'Off'], ['Pmax', '35'], ['PEEP', '5'], ['More', '…']], .82, .17, .005, .995, '#BFD0DC');
    return {bg: '#000000', layout: L};
  }
  /* Aestiva/5 Compact Plus — temsili ventilatör ekranı (7900 tipi küçük ekran varsayımı; doğrulanmadı) */
  function scrAe() {
    const L = [{t: 'box', x: 0, y: 0, w: 1, h: .1, fill: '#1B3A5C'}, {t: 'text', txt: 'Volume Control', x: .02, y: 0, w: .5, h: .1, c: '#FFFFFF', s: .055}, {t: 'text', txt: 'Alarms', x: .6, y: 0, w: .38, h: .1, c: '#9FC6E8', s: .045, al: 'r'},
      {t: 'wave', k: 'paw', x: .02, y: .12, w: .6, h: .36, c: '#FFFFFF', l: 'Paw', span: 3, ls: .045, grid: 'rgba(255,255,255,.12)'},
      {t: 'table', x: .64, y: .12, w: .35, h: .36, rows: [['Ppeak', '18'], ['Pmean', '9'], ['PEEP', '5'], ['O₂ %', '52']], s: .05, c: '#FFFFFF', lc: '#9FC6E8'},
      {t: 'box', x: .02, y: .5, w: .97, h: .2, fill: '#0F2236', r: .02},
      {t: 'text', txt: 'VTexp 455 mL', x: .04, y: .5, w: .48, h: .2, c: '#FFFFFF', s: .06, wt: 800}, {t: 'text', txt: 'MV 5.5 L', x: .52, y: .5, w: .45, h: .2, c: '#FFFFFF', s: .06, al: 'r', wt: 800}];
    vTiles(L, [['VT', '450'], ['Rate', '12'], ['tI:tE', '1:2'], ['Plimit', '40'], ['PEEP', '5']], .74, .24, .01, .99, '#D7E3EC', '#0F2236');
    return {bg: '#05101C', layout: L};
  }
  /* Üst raf hasta monitörü (genel düzen; marka taklidi değildir) */
  function scrMon() {
    const L = [{t: 'box', x: 0, y: 0, w: 1, h: .055, fill: '#15191D'}, {t: 'text', txt: 'Adult  OR 3', x: .01, y: 0, w: .4, h: .055, c: '#C9D0D5', s: .03}, {t: 'text', txt: '10:42', x: .7, y: 0, w: .29, h: .055, c: '#C9D0D5', s: .03, al: 'r'},
      {t: 'wave', k: 'ecg', x: .01, y: .07, w: .66, h: .19, c: '#3CE05A', l: 'II', span: 6, ls: .03},
      {t: 'wave', k: 'art', x: .01, y: .27, w: .66, h: .17, c: '#FF4B4B', l: 'ART', span: 7, ls: .03},
      {t: 'wave', k: 'pleth', x: .01, y: .45, w: .66, h: .14, c: '#38A8F0', l: 'SpO₂', span: 7, ls: .03},
      {t: 'wave', k: 'capno', x: .01, y: .6, w: .66, h: .13, c: '#E8D23A', l: 'CO₂', span: 4, amp: .5, ls: .03},
      {t: 'tile', x: .69, y: .07, w: .3, h: .19, l: 'HR', v: 68, c: '#3CE05A', al: 'r', live: true},
      {t: 'tile', x: .69, y: .27, w: .3, h: .17, l: 'ART', v: '118/66', c: '#FF4B4B', al: 'r'},
      {t: 'tile', x: .69, y: .45, w: .3, h: .14, l: 'SpO₂', v: 98, c: '#38A8F0', al: 'r', live: true},
      {t: 'tile', x: .69, y: .6, w: .3, h: .13, l: 'EtCO₂', v: 36, c: '#E8D23A', al: 'r'},
      {t: 'box', x: 0, y: .75, w: 1, h: .004, fill: '#2A3036'},
      {t: 'text', txt: 'NIBP', x: .01, y: .76, w: .1, h: .05, c: '#FF4B4B', s: .028}, {t: 'text', txt: '121/70 (88)', x: .01, y: .8, w: .4, h: .12, c: '#FF4B4B', s: .08, wt: 800},
      {t: 'text', txt: 'AA  Sev 2.0', x: .45, y: .78, w: .3, h: .1, c: '#E8A33A', s: .05, wt: 800}, {t: 'text', txt: 'T1 36.6', x: .76, y: .78, w: .23, h: .1, c: '#E6EEF2', s: .045, al: 'r'},
      {t: 'box', x: 0, y: .93, w: 1, h: .07, fill: '#2A3036'}];
    return {bg: '#000000', layout: L};
  }

  /* ---------- Cihazlar ---------- */
  /* Ortak GE renkleri (temsili: açık gri gövde, koyu gri şasi ve solunum sistemi tabanı) */
  const GEC = {body: 0xEEF0F1, front: 0xF4F5F6, panel: 0xE5E9EB, panel2: 0xD5DADD, top: 0xDDE2E5, mat: 0xB9C1C6, trim: 0xD3D8DC, dark: 0x3B434A, base: 0x5A636A, base2: 0x6D767D, bs: 0xE3E7EA, bsDark: 0x56606A};
  const ws = o => Object.assign({type: 'd-workstation', theta: -.6, cyl: 0, pipes: 0, agss: false, sections: GE_SECTIONS}, o);

  /* GE Carestation 650 (K151570): iğne valfli mekanik gaz karıştırıcı — düğmelerin hemen üstünde sayısal akış göstergeleri, pnömatik
     toplam akış tüpü, isteğe bağlı yardımcı O₂ akış ölçeri ve ACGO; iki konumlu Selectatec (Tec 7 sevofluran + Tec 6 Plus desfluran);
     makinenin solundaki kolda 15" ekran (dokunmatik + tuşlar + ComWheel); 7900 tabanlı körüklü ventilatör, solda solunum sistemi
     (APL, bag/vent anahtarı, akım sensörleri); merkezi fren; arkada en çok 3 tüp bağlantısından 2'si ve merkezi gaz girişleri.
     Carestation 750'den farkı: 750'de elektronik karıştırıcı ve gaz hızlı tuşları, kablo kapaklı arka; 650'de iğne valfler ve akış tüpü.
     Ölçüler temsilidir (kesin boyut kaynağı bulunamadı). */
  DEV3D.model('ge-healthcare-carestation-650', ws({
    w: .72, d: .66, top: .85, towerH: .45, towerD: .3, label: 'Carestation 650',
    ge: {
      col: GEC,
      base: {w: .7, d: .74, y: .115, h: .07, cr: .055, cx: .3, cz: .3, brake: 'central'},
      cab: {x: 0, w: .6, y0: .15, y1: .815, d: .6, z: -.03, label: 'GE HealthCare', drawers: [[.165, .4], [.4, .61], [.61, .8]]},
      top: {y: .85, w: .72, d: .66, z: 0, label: 'Carestation 650'},
      tower: {x: .02, w: .6, y0: .85, y1: 1.3, d: .3, z: -.18, shelf: {w: .66, d: .38, z: -.17}, brand: 'GE HealthCare', brand2: .2},
      gas: {kind: 'needle', x: -.075, y: 1.12, w: .28, h: .2, aux: [-.248, 1.03], acgo: [-.27, .785, .337], flush: [.005, .93, -.024], flushPin: true},
      vap: {y: .85, pos: [.14, .265], gap: .125, list: [['sevo', 'tec7'], ['des', 'tec6']], text: 'i-vapor2'},
      bs: {x: -.43, y: .87, z: .04, hh: .25, sensors: true, fsPin: true, bvPin: true, bagC: 0x2B6E5A},
      scr: {mount: 'arm', x: -.5, y: 1.52, z: .03, w: .305, h: .229, bezel: [.022, .03, .06, .03], keys: 'right', tilt: -.12, yaw: .3, pin: 'i-disp650', brand: 'Carestation', spec: scr650()},
      pipes: [0xF4F6F7, 0x22272B, 0x2F7DD1], pipePin: true, cyl: 2, cylC: [0xF4F6F7, 0x2F7DD1], cylPin: true
    },
    extra(g, ctx) { geAgss(g, ctx); dropPins(ctx, ['d-rail']); }
  }));
  /* GE Avance CS² (K123125, K131945): elektronik gaz karıştırıcı — akışlar ekrandan seçilir ve elektronik akış ölçer olarak gösterilir;
     pnömatik yedek O₂ (ALT O₂) ve geleneksel akış tüpü; Selectatec manifoldu (Tec 6 Plus / Tec 7; isteğe bağlı 3. konum boş gösterildi);
     15" dokunmatik ekran döner/eğilir kolda (çerçeve dışına taşabilir); çalışma yüzeyi aydınlatması; merkezi fren; 3. tüp seçeneği;
     7900 körüklü ventilatör; üst rafta hasta monitörü yerleşimi. Aisys CS²'den farkı: Aisys elektronik vaporizatör kaseti kullanır,
     Avance mekanik Tec vaporizatörleri Selectatec üzerinde taşır. Ölçüler temsilidir. */
  DEV3D.model('ge-healthcare-avance-cs2', ws({
    w: .8, d: .7, top: .87, towerH: .53, towerD: .32, label: 'Avance CS²',
    ge: {
      col: Object.assign({}, GEC, {body: 0xF0F1F2, front: 0xF6F7F7, panel: 0xE9ECEE, dark: 0x2F363C, base: 0x4E575E, base2: 0x626B72, bsDark: 0x4C5560}),
      base: {w: .78, d: .78, y: .115, h: .075, cr: .06, cx: .33, cz: .31, brake: 'central'},
      cab: {x: 0, w: .66, y0: .155, y1: .83, d: .62, z: -.03, label: 'GE HealthCare', drawers: [[.17, .45], [.45, .65], [.65, .815]]},
      top: {y: .87, w: .8, d: .7, z: 0, label: 'Avance CS²'},
      tower: {x: 0, w: .7, y0: .87, y1: 1.4, d: .32, z: -.19, shelf: {w: .76, d: .4, z: -.18}, brow: true, brand: 'GE HealthCare', brand2: -.22, brandY: 1.29},
      gas: {kind: 'alt', x: -.22, y: 1.09, w: .12, h: .2, flush: [-.22, .94, -.024]},
      vap: {y: .87, pos: [-.03, .11, .25], gap: .14, list: [['sevo', 'tec7'], ['des', 'tec6'], null], text: 'i-vapor3'},
      bs: {x: -.45, y: .89, z: .05, hh: .26, sensors: true, fsPin: true, fsKey: 'i-flowsensor2', bagC: 0x23292E, belC: 0xA8CDE6},
      scr: {mount: 'arm', x: -.56, y: 1.64, z: .1, w: .305, h: .229, bezel: [.03, .035, .03, .045], keys: 'bottom', nk: 6, tilt: -.15, yaw: .45, pin: 'i-dispav', brand: 'Avance CS²', spec: scrAv()},
      mons: [{x: .1, y: 1.66, z: -.2, w: .33, h: .23, bezel: [.02, .025, .02, .035], tilt: -.08, shelfY: 1.435, pin: 'i-monav', spec: scrMon()}],
      pipes: [0xF4F6F7, 0x22272B, 0x2F7DD1], pipePin: true, cyl: 3, cylC: [0xF4F6F7, 0x2F7DD1, 0x22272B], cylPin: true
    },
    extra(g, ctx) { dropPins(ctx, ['d-drawer', 'd-rail', 'd-valves', 'd-apl', 'd-bag', 'knob']); }
  }));
  /* GE / Datex-Ohmeda Aestiva/5 Compact Plus: Selectatec manifoldu ve ACGO kaynakla desteklenir (PMC2966709); Aestiva/5 ailesinin 7100
     (K000706) ve 7900 (K023366) ventilatörlü sürümleri vardır — bu alt modelin ventilatörü doğrulanamadı, ekran temsilidir.
     Eski nesil kompakt şasi (dar gövde, iki çekmece, tekerlek frenleri), klasik cam akış ölçer sırası, basınç göstergeleri, solda körüklü
     solunum sistemi (üstte tek yönlü valf kubbeleri) temsili biçimdedir; ölçüler temsilidir. */
  DEV3D.model('ge-healthcare-datex-ohmeda-aestiva-5-compact-plus', ws({
    w: .6, d: .58, top: .8, towerH: .5, towerD: .27, label: 'Aestiva/5',
    ge: {
      col: {body: 0xE8EBEB, front: 0xEFF1F1, panel: 0xDCE2E6, panel2: 0xC9D2D9, top: 0xD4DBE0, mat: 0x9FAAB3, trim: 0xC3CDD5, dark: 0x30475B, base: 0x46545F, base2: 0x56646F, bs: 0xDCE2E7, bsDark: 0x3D5366},
      base: {w: .6, d: .64, y: .11, h: .065, cr: .05, cx: .25, cz: .26, brake: 'caster', fork: 0x7D8A94},
      cab: {x: 0, w: .52, y0: .145, y1: .765, d: .52, z: -.02, label: 'Datex-Ohmeda', drawers: [[.16, .46], [.46, .75]]},
      top: {y: .8, w: .6, d: .58, z: 0, label: 'Aestiva/5 Compact Plus'},
      tower: {x: 0, w: .54, y0: .8, y1: 1.3, d: .27, z: -.155, shelf: {w: .58, d: .32, z: -.15}, brand: 'Datex-Ohmeda', brand2: .14, brandY: 1.25},
      gas: {kind: 'tubes', x: -.1, y: 1.03, w: .2, h: .22, gauges: [[-.17, 1.215, 'O₂'], [-.1, 1.215, 'N₂O'], [-.03, 1.215, 'AIR']], acgo: [-.21, .735, .297], flush: [.035, .87, -.014]},
      vap: {y: .8, pos: [.1, .213], gap: .113, list: [['sevo', 'tec7'], ['iso', 'tec7']], text: 'i-vapor-ae'},
      bs: {x: -.38, y: .82, z: .02, hh: .24, domes: true, bagC: 0x1F2326, belC: 0x7FA9C9},
      scr: {mount: 'pod', x: -.08, y: 1.47, z: -.1, w: .2, h: .135, bezel: [.025, .03, .075, .045], keys: 'right', tilt: -.2, pin: 'i-ventae', color: 0xDCE2E6, frameC: 0x1B2A38, px: 768, spec: scrAe()},
      pipes: [0xF4F6F7, 0x22272B, 0x2F7DD1], cyl: 2, cylC: [0xF4F6F7, 0x2F7DD1]
    },
    extra(g, ctx) { dropPins(ctx, ['d-base', 'd-drawer', 'd-worktop', 'd-rail', 'd-valves', 'd-apl', 'd-bag', 'knob']); }
  }));
})();
