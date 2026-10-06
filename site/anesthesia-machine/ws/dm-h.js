/* Kaynak: İleri Monitörizasyon Atlası 3B cihaz sistemi; atlas core.js ile çakışmaması için K3 → WK3 olarak yeniden adlandırıldı. */
'use strict';
/* Cihaz yapılandırmaları H: Dräger Atlan A300 ve A350 (kompakt araba), Dräger Primus, Dräger Fabius plus (araba modeli).
   Bağımsız oluşturulmuş temsili eğitim modelleri; üretici fotoğrafı, CAD ya da kılavuz çizimi doku olarak kullanılmadı.
   'd-workstation' kurucusu (dm-d.js) cfg.sections ile kullanılır. Atlan bölümleri dm-d.js'deki Dräger işlevlerini (DEV3D.H.drg)
   yeniden kullanır; Primus ve Fabius plus başka ailelerdir ve bu dosyadaki kendi bölüm işlevleriyle çizilir.
   Doğrulanan ölçüler ve yerleşim kaynakları: content-src/workstations/measure/<kimlik>.json
   – Atlan A300/A350: Dräger ürün bilgisi 100176 (A300/A300 XL, 2026-03) ve 100164 (A350/A350 XL, 2026-03): kompakt araba
     74,5 × 140,3 × 69,2 cm, çalışma yüzeyi 47 × 38 cm, 1 kilitli çekmece; IfU Atlan SW 2.1n (9511481): kompakt sürüm ön görünüşü,
     gaz karıştırma üniteleri (A300 mekanik + elektronik akış ölçümü, A350 elektronik), 1–2 vaporizatör bağlantısı.
   – Primus: IfU Primus SW 4.5n (9053477, zh): 80 × 137 × 80 cm, üst raf 43 × 29 cm, solunum sistemi 37,5 × 40,5 × 34,5 cm,
     12,1" TFT; ön/arka görünüş parça listesi. FDA K042607 (Primus US): elektrikle sürülen pistonlu ventilatör.
   – Fabius plus: GA Fabius plus SW 3.n (9054689, ru): araba modeli 91 × 140 × 77 cm (iki vaporizatör yuvası, COSY);
     ön görünüş parça listesi (kontrol paneli, manometreler, akış tüpleri, COSY, absorban, yazı masası, çekmeceler).
   Kaynakta ölçüsü olmayan ayrıntılar (ekran çerçevesi, düğme çapları, gövde eğrilikleri vb.) temsilidir. Ekran değerleri örnektir. */
(() => {
  if (!DEV3D || !DEV3D.H.drg) return;
  const {V3, M, rbox, box, cyl, sphere, torus, lathe, tube, corrugated, put, decal, makeScreen} = DEV3D.H;
  const D = DEV3D.H.drg, T = DEV3D.partText;

  /* ---------- Parça metinleri (yalnızca işlev) ---------- */
  T('h-column', {tr: ['Cihaz sütunu', 'Sol arkadaki sütundur; standart ray ve sütun kapağı üzerinden hasta monitörü gibi bileşenler takılabilir, hortum ve kablolar burada toplanır.'], en: ['Device column', 'Column at the rear left; components such as a patient monitor can be mounted via the standard rail and column cover, and hoses and cables are routed here.'], es: ['Columna del equipo', 'Columna en la parte trasera izquierda; mediante el riel estándar y la cubierta de la columna se montan componentes como un monitor de paciente, y por ella se guían mangueras y cables.']});
  T('h-screen-atlan', {tr: ['Ekran (15,3")', 'Dokunmatik ekran ve döner düğmeyle kullanılır; eğriler, ölçülen değerler, ayarlar ve alarm mesajları gösterilir. Ekrandaki değerler örnektir.'], en: ['Screen (15.3")', 'Operated by touchscreen and rotary knob; shows waveforms, measured values, settings and alarm messages. Values on screen are examples.'], es: ['Pantalla (15,3")', 'Se maneja con la pantalla táctil y el mando giratorio; muestra curvas, valores medidos, ajustes y mensajes de alarma. Los valores mostrados son ejemplos.']});
  T('h-silence', {tr: ['Alarm susturma tuşu', 'Etkin alarmların sesli uyarısını kısa bir süre (2 dakika) susturur; görsel alarm göstergesi sürer.'], en: ['Alarm silence key', 'Silences the audible signal of active alarms for a short period (2 minutes); the visual alarm indication continues.'], es: ['Tecla de silencio de alarma', 'Silencia la señal acústica de las alarmas activas durante un tiempo breve (2 minutos); la indicación visual continúa.']});
  T('h-mix300', {tr: ['Gaz karıştırma ünitesi (mekanik)', 'Taze gaz akımları elle çevrilen akım kontrol valfleriyle (O₂, Air, N₂O) ayarlanır; akımlar elektronik olarak ölçülüp durum ekranında ve ana ekranda sanal akım tüpleri olarak gösterilir. Panelde toplam akım tüpü, yardımcı O₂ akım ölçeri ve O₂+ tuşu bulunur.'], en: ['Gas mixing unit (mechanical)', 'Fresh-gas flows are set with manually operated flow control valves (O₂, Air, N₂O); the flows are measured electronically and shown on the status display and as virtual flow tubes on the main screen. The panel also carries a total flow tube, an auxiliary O₂ flowmeter and the O₂+ key.'], es: ['Unidad de mezcla de gases (mecánica)', 'Los flujos de gas fresco se ajustan con válvulas de control manuales (O₂, Air, N₂O); se miden electrónicamente y se muestran en la pantalla de estado y como tubos de flujo virtuales en la pantalla principal. El panel incluye un tubo de flujo total, un caudalímetro de O₂ auxiliar y la tecla O₂+.']});
  T('h-mix350', {tr: ['Gaz karıştırma ünitesi (elektronik)', 'O₂ konsantrasyonu ve taze gaz akımı ana ekrandan ayarlanır; paneldeki durum ekranı gaz beslemesini ve hava yolu basıncını gösterir. O₂ akım ölçeri, bir anahtarla O₂ insüflasyonu (Aux. O₂) ya da mekanik acil O₂ verme (Add. O₂) için kullanılır; O₂+ tuşu da bu paneldedir.'], en: ['Gas mixing unit (electronic)', 'O₂ concentration and fresh-gas flow are set on the main screen; the status display on the panel shows the gas supply and airway pressure. A switch selects whether the O₂ flowmeter is used for O₂ insufflation (Aux. O₂) or mechanical emergency O₂ delivery (Add. O₂); the O₂+ key is also on this panel.'], es: ['Unidad de mezcla de gases (electrónica)', 'La concentración de O₂ y el flujo de gas fresco se ajustan en la pantalla principal; la pantalla de estado del panel muestra el suministro de gas y la presión de la vía aérea. Un interruptor determina si el caudalímetro de O₂ se usa para insuflación de O₂ (Aux. O₂) o para el suministro mecánico de O₂ de emergencia (Add. O₂); la tecla O₂+ también está en este panel.']});
  T('h-vapor', {tr: ['Vaporizatör bağlantıları', 'Vaporizatörler bu bağlantı yuvalarına yerleştirilir; vaporizatör, uçucu anestezik ajanı taze gaz akımına ayarlanan konsantrasyonda katar. Bağlantı sayısı modele göre değişir.'], en: ['Vaporizer connectors', 'Vaporizers are fitted to these plug-in connectors; a vaporizer adds the volatile anaesthetic agent to the fresh gas flow at the set concentration. The number of positions varies by model.'], es: ['Conectores de vaporizador', 'Los vaporizadores se colocan en estos conectores enchufables; el vaporizador añade el agente anestésico volátil al flujo de gas fresco a la concentración ajustada. El número de posiciones varía según el modelo.']});
  T('h-window', {tr: ['Piston ventilatör ve gözetleme penceresi', 'Elektrikle sürülen piston ventilatör (E-Vent) solunum sistemindeki gazı tahrik gazı kullanmadan hastaya iter; pencereden pistonun hareketi gözle kontrol edilebilir.'], en: ['Piston ventilator and viewing window', 'The electrically driven piston ventilator (E-Vent) delivers the gas in the breathing system to the patient without drive gas; the window allows the piston movement to be checked visually.'], es: ['Ventilador de pistón y ventana', 'El ventilador de pistón de accionamiento eléctrico (E-Vent) impulsa el gas del sistema respiratorio hacia el paciente sin gas motor; la ventana permite comprobar visualmente el movimiento del pistón.']});
  T('h-piston', {tr: ['Pistonlu ventilatör (E-Vent)', 'Elektrikle sürülen piston solunum sistemindeki gazı tahrik gazı kullanmadan hastaya iter. Ünite gövde içindedir; burada kesit penceresiyle gösterilmiştir.'], en: ['Piston ventilator (E-Vent)', 'An electrically driven piston delivers the gas in the breathing system to the patient without drive gas. The unit sits inside the housing; shown here through a cutaway window.'], es: ['Ventilador de pistón (E-Vent)', 'Un pistón de accionamiento eléctrico impulsa el gas del sistema respiratorio hacia el paciente sin gas motor. La unidad está dentro de la carcasa; aquí se muestra con una ventana de corte.']});
  T('h-bag', {tr: ['Solunum balonu', 'Manuel ventilasyonda ve spontan solunumun izlenmesinde kullanılır; balon hortumuyla solunum sistemindeki balon bağlantısına takılır.'], en: ['Breathing bag', 'Used for manual ventilation and for observing spontaneous breathing; it connects to the bag port of the breathing system with a bag hose.'], es: ['Bolsa respiratoria', 'Se usa para la ventilación manual y para observar la respiración espontánea; se conecta a la toma de bolsa del sistema respiratorio con una manguera.']});
  T('h-agss', {tr: ['Anestezik gaz alma sistemi', 'Solunum sisteminden çıkan fazla anestezik gazı ve solunum gazını toplayıp hastanenin atık gaz sistemine iletir; ortama salınan anestezik gazı azaltır.'], en: ['Anaesthetic gas receiving system', 'Collects excess anaesthetic and breathing gas from the breathing system and passes it to the hospital disposal system, reducing the anaesthetic gas released into the room.'], es: ['Sistema receptor de gas anestésico', 'Recoge el exceso de gas anestésico y respiratorio del sistema respiratorio y lo conduce al sistema de evacuación del hospital, reduciendo el gas anestésico liberado al quirófano.']});
  T('h-gasin', {tr: ['Gaz girişleri', 'Merkezi gaz sistemi (O₂, Air, N₂O) hortumları ve isteğe bağlı gaz tüpleri arka paneldeki gaza özgü bağlantılara takılır.'], en: ['Gas inlets', 'Central supply hoses (O₂, Air, N₂O) and optional gas cylinders connect to the gas-specific connectors on the rear panel.'], es: ['Entradas de gas', 'Las mangueras del suministro central (O₂, Air, N₂O) y los cilindros opcionales se conectan a los conectores específicos de cada gas del panel trasero.']});
  T('h-power', {tr: ['Güç ve veri bağlantıları', 'Arka paneldeki güç girişi, potansiyel dengeleme pimi ve veri arayüzleri; iç batarya şebeke kesintisinde cihazı bir süre çalıştırır.'], en: ['Power and data connections', 'Power inlet, potential equalization pin and data interfaces on the rear panel; the internal battery keeps the device running for a period if mains power fails.'], es: ['Conexiones de alimentación y datos', 'Entrada de alimentación, borne de equipotencialidad e interfaces de datos en el panel trasero; la batería interna mantiene el equipo en funcionamiento un tiempo si falla la red.']});
  T('h-topshelf', {tr: ['Üst raf', 'Cihazın üstündeki raf; harici bir hasta monitörü gibi ekipman yerleştirmek için kullanılır.'], en: ['Top shelf', 'Shelf on top of the device; used to place equipment such as an external patient monitor.'], es: ['Estante superior', 'Estante en la parte superior del equipo; se usa para colocar equipos como un monitor de paciente externo.']});
  T('h-screen-primus', {tr: ['Ekran ve kullanıcı arayüzü (12,1")', 'Ventilasyon modu, alarmlar, eğriler, ölçülen değerler, gaz izleme ve sanal akım ölçerler gösterilir; ayarlar ekran tuşları, sabit tuşlar ve merkezi döner düğmeyle yapılır. Değerler örnektir.'], en: ['Screen and user interface (12.1")', 'Shows ventilation mode, alarms, waveforms, measured values, gas monitoring and virtual flowmeters; settings are made with soft keys, hard keys and the central rotary knob. Values are examples.'], es: ['Pantalla e interfaz (12,1")', 'Muestra el modo de ventilación, alarmas, curvas, valores medidos, monitorización de gases y caudalímetros virtuales; los ajustes se hacen con teclas de pantalla, teclas fijas y el mando giratorio central. Valores de ejemplo.']});
  T('h-o2emerg', {tr: ['Acil O₂ verme', 'Elektronik taze gaz verme devre dışı kaldığında solunum sistemine mekanik olarak oksijen verilmesini sağlayan kumandadır.'], en: ['Emergency O₂ delivery', 'Control that allows oxygen to be delivered mechanically to the breathing system if electronic fresh-gas delivery is unavailable.'], es: ['Suministro de O₂ de emergencia', 'Mando que permite suministrar oxígeno mecánicamente al sistema respiratorio si el suministro electrónico de gas fresco no está disponible.']});
  T('h-tray', {tr: ['Yazı tablası', 'Kayıt tutmak ve küçük malzemeleri yerleştirmek için kullanılan çalışma yüzeyidir.'], en: ['Writing tray', 'Work surface used for charting and small items.'], es: ['Bandeja de escritura', 'Superficie de trabajo para registros y material pequeño.']});
  T('h-bs-compact', {tr: ['Kompakt solunum sistemi', 'İnspirasyon ve ekspirasyon valfleri, hasta hortumu bağlantıları, APL valfi, balon bağlantısı ve CO₂ absorbanını bir arada taşıyan döngü sistemidir; temizlik için sökülebilir.'], en: ['Compact breathing system', 'Circle system that combines the inspiratory and expiratory valves, patient hose connectors, APL valve, bag connection and CO₂ absorber; it can be removed for reprocessing.'], es: ['Sistema respiratorio compacto', 'Sistema circular que reúne las válvulas inspiratoria y espiratoria, las conexiones de las tubuladuras, la válvula APL, la conexión de la bolsa y el absorbedor de CO₂; se desmonta para su reprocesamiento.']});
  T('h-fab-panel', {tr: ['Ventilatör kontrol paneli ve ekran', 'Ventilasyon ve hava yolu izleme ayarları sabit tuşlar, ekran altındaki tuşlar ve döner düğmeyle yapılır; ekranda O₂ konsantrasyonu, ölçülen değerler, basınç eğrisi ve alarm mesajları gösterilir. Değerler örnektir.'], en: ['Ventilator control panel and screen', 'Ventilation and airway monitoring settings are made with hard keys, the keys below the screen and the rotary knob; the screen shows O₂ concentration, measured values, the pressure waveform and alarm messages. Values are examples.'], es: ['Panel de control del ventilador y pantalla', 'Los ajustes de ventilación y monitorización se hacen con teclas fijas, las teclas bajo la pantalla y el mando giratorio; la pantalla muestra la concentración de O₂, valores medidos, la curva de presión y los mensajes de alarma. Valores de ejemplo.']});
  T('h-fab-gauges', {tr: ['Manometreler', 'Merkezi gaz besleme basınçlarını (O₂, Air, N₂O) ve takılıysa gaz tüplerinin basıncını mekanik olarak gösterir.'], en: ['Pressure gauges', 'Show the central supply pressures (O₂, Air, N₂O) and, if fitted, the gas cylinder pressures mechanically.'], es: ['Manómetros', 'Muestran mecánicamente las presiones del suministro central (O₂, Air, N₂O) y, si existen, las de los cilindros.']});
  T('h-fab-flow', {tr: ['Akım tüpleri ve akım kontrol düğmeleri', 'Taze gaz akımları renk kodlu düğmelerle elle ayarlanır; her gazın akımı cam akım tüpündeki şamandıra ile okunur.'], en: ['Flow tubes and flow control knobs', 'Fresh-gas flows are set manually with colour-coded knobs; each gas flow is read from the float in its glass flow tube.'], es: ['Tubos de flujo y mandos de control', 'Los flujos de gas fresco se ajustan manualmente con mandos codificados por color; el flujo de cada gas se lee en el flotador de su tubo de vidrio.']});
  T('h-aux-o2', {tr: ['Yardımcı O₂ akım ölçeri', 'Ayrı bir çıkıştan, örneğin nazal kanül için, ayarlanabilir oksijen akımı verir.'], en: ['Auxiliary O₂ flowmeter', 'Delivers an adjustable oxygen flow from a separate outlet, e.g. for a nasal cannula.'], es: ['Caudalímetro de O₂ auxiliar', 'Proporciona un flujo de oxígeno ajustable por una salida separada, p. ej., para una cánula nasal.']});
  T('h-cosy', {tr: ['Kompakt solunum sistemi (COSY)', 'İnspirasyon ve ekspirasyon valfleri, hasta portları, APL valfi (Man/Spont), balon bağlantısı ve taze gaz ayrıştırma valfini taşıyan döngü sistemidir; altında CO₂ absorbanı bulunur.'], en: ['Compact breathing system (COSY)', 'Circle system carrying the inspiratory and expiratory valves, patient ports, APL valve (Man/Spont), bag connection and fresh-gas decoupling valve; the CO₂ absorber sits below it.'], es: ['Sistema respiratorio compacto (COSY)', 'Sistema circular con las válvulas inspiratoria y espiratoria, puertos del paciente, válvula APL (Man/Spont), conexión de bolsa y válvula de desacoplamiento del gas fresco; el absorbedor de CO₂ está debajo.']});
  T('h-fab-vent', {tr: ['Ventilatör ünitesi (E-Vent)', 'Elektrikle sürülen pistonlu ventilatördür; solunum sistemindeki gazı tahrik gazı kullanmadan hastaya iter.'], en: ['Ventilator unit (E-Vent)', 'Electrically driven piston ventilator; it delivers the gas in the breathing system to the patient without drive gas.'], es: ['Unidad del ventilador (E-Vent)', 'Ventilador de pistón de accionamiento eléctrico; impulsa el gas del sistema respiratorio hacia el paciente sin gas motor.']});
  T('h-drawer', {tr: ['Kilitlenebilir çekmece', 'Sarf malzemesi ve aksesuarlar için ek saklama alanıdır; kilitlenebilir.'], en: ['Lockable drawer', 'Additional storage space for consumables and accessories; it can be locked.'], es: ['Cajón con cerradura', 'Espacio adicional para consumibles y accesorios; puede cerrarse con llave.']});
  T('h-table', {tr: ['Yazı masası', 'Kayıt tutmak ve malzemeleri yerleştirmek için kullanılan yatay çalışma yüzeyidir.'], en: ['Writing table', 'Horizontal work surface for charting and supplies.'], es: ['Mesa de escritura', 'Superficie de trabajo horizontal para registros y material.']});

  /* ---------- Ortak yardımcılar ---------- */
  /* Bir bölüm işlevinin eklediği parça anahtarlarını değiştir (null: işareti kaldır) */
  const rekey = (parts, from, map) => { for (let i = from; i < parts.length; i++) if (parts[i].key in map) parts[i].key = map[parts[i].key]; };
  /* Düz yazı etiketi */
  const label = (text, w, h, o = {}) => D.txt(text, w, h, o);
  /* Plan görünüşünde köşeleri yuvarlatılmış dikey gövde / levha (genişlik x, derinlik z, yükseklik y; köşe yarıçapı r) */
  function pillar(w, d, h, r, mat) {
    const be = Math.min(.006, h / 4), W = w - 2 * be, Dd = d - 2 * be; r = Math.min(r, W / 2 - .001, Dd / 2 - .001);
    const s = new THREE.Shape(), x = -W / 2, y = -Dd / 2;
    s.moveTo(x + r, y); s.lineTo(x + W - r, y); s.quadraticCurveTo(x + W, y, x + W, y + r); s.lineTo(x + W, y + Dd - r); s.quadraticCurveTo(x + W, y + Dd, x + W - r, y + Dd);
    s.lineTo(x + r, y + Dd); s.quadraticCurveTo(x, y + Dd, x, y + Dd - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    const geo = new THREE.ExtrudeGeometry(s, {depth: Math.max(.0005, h - 2 * be), bevelEnabled: true, bevelThickness: be, bevelSize: be, bevelSegments: 2, curveSegments: 10});
    geo.translate(0, 0, -(h - 2 * be) / 2); geo.rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(geo, mat); m.castShadow = m.receiveShadow = true; return m;
  }
  /* Döner tekerlek (çatallı) */
  function castor(g, x, z, cr, top, o = {}) {
    const c = new THREE.Group(); c.position.set(x, 0, z); g.add(c);
    const tire = M.rubber(o.tire || 0x272C31), hub = M.plastic(o.hub || 0xC9D0D5, .4), fork = M.plastic(o.fork || 0x8E969C, .4);
    put(c, cyl(cr, cr, .03, tire, 24), 0, cr, 0, 0, 0, Math.PI / 2);
    put(c, cyl(cr * .62, cr * .62, .034, hub, 16), 0, cr, 0, 0, 0, Math.PI / 2);
    [-1, 1].forEach(s => put(c, rbox(.006, cr * 1.3, cr * 1.2, .002, fork), s * .021, cr * 1.3, -cr * .15));
    put(c, rbox(.05, .012, cr * 1.25, .004, fork), 0, cr * 2 + .012, -cr * .15);
    if (top > cr * 2 + .02) put(c, cyl(.011, .011, top - (cr * 2 + .018), M.metal(0x9AA3AA, .35), 12), 0, (top + cr * 2 + .018) / 2, 0);
    if (o.brake) put(c, rbox(.04, .01, .03, .004, M.color(o.brake, .5)), 0, cr * 2 + .02, cr * .9);
    return c;
  }
  /* Cam akış tüpü + şamandıra + ölçek (ön yüz +z), merkez (x, y), yükseklik h */
  function flowTube(g, x, y, z, h, m, o = {}) {
    put(g, rbox(.03, h + .02, .008, .012, M.plastic(o.frame || 0x6E7A84, .45)), x, y, z + .004);
    put(g, cyl(.0075, .0075, h, M.glass(0xEAF5FA, .55), 16), x, y, z + .012);
    put(g, decal(.012, h * .9, (c, Wd, Hh) => { c.strokeStyle = '#2A3036'; c.lineWidth = 2; for (let k = 0; k <= 10; k++) { const yy = Hh * (.05 + k * .09); c.beginPath(); c.moveTo(k % 2 ? Wd * .5 : 0, yy); c.lineTo(Wd, yy); c.stroke(); } }, 64), x - .011, y, z + .0085);
    put(g, sphere(.0055, M.color(o.ball || 0x1F2428, .4), 12), x, y - h * .5 + h * (o.f ?? .3), z + .012);
  }
  /* Akış kontrol düğmesi (ön yüz +z): renkli tırtıllı başlık, halka çerçeve */
  function flowKnob(g, x, y, z, col, r = .016, o = {}) {
    put(g, torus(r + .004, .0028, M.plastic(o.ring || 0x8D99A3, .4), 28), x, y, z + .003);
    put(g, cyl(r, r * 1.04, .022, M.plastic(col, .35), 28), x, y, z + .011, Math.PI / 2);
    for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; put(g, box(.003, .003, .018, M.plastic(o.rib || 0xB7BEC3, .4)), x + Math.cos(a) * r * 1.02, y + Math.sin(a) * r * 1.02, z + .011); }
    if (o.check) put(g, decal(r * 1.6, r * 1.6, (c, Wd, Hh) => { c.fillStyle = '#F4F6F7'; c.beginPath(); c.arc(Wd / 2, Hh / 2, Wd / 2, 0, 7); c.fill(); c.fillStyle = '#16191C'; [0, 2].forEach(q => { c.beginPath(); c.moveTo(Wd / 2, Hh / 2); c.arc(Wd / 2, Hh / 2, Wd / 2, q * Math.PI / 2, (q + 1) * Math.PI / 2); c.fill(); }); }, 64), x, y, z + .0225);
  }
  /* Küçük durum LCD'si (mavi zemin, koyu yazı) */
  function statusLCD(g, screens, x, y, z, w, h, spec, m) {
    put(g, rbox(w + .012, h + .012, .004, .004, M.plastic(0x7E8B96, .4)), x, y, z + .002);
    put(g, box(w + .002, h + .002, .002, m.black), x, y, z + .0045);
    const s = makeScreen(w, h, spec, 512); put(g, s.mesh, x, y, z + .006); screens.push(s);
  }
  const lcdBase = extra => ({bg: '#A9C8EC', layout: [
    {t: 'box', x: 0, y: 0, w: 1, h: .22, fill: '#96BBE6'},
    {t: 'text', txt: '⊕ O₂  ⊕ Air  ⊕ N₂O', x: .03, y: 0, w: .6, h: .22, c: '#14305A', s: .13, wt: 700},
    {t: 'text', txt: 'Paw', x: .03, y: .25, w: .14, h: .14, c: '#14305A', s: .1, wt: 700},
    {t: 'box', x: .17, y: .29, w: .8, h: .07, stroke: '#14305A', lw: .015}, {t: 'box', x: .17, y: .29, w: .2, h: .07, fill: '#14305A'},
    ...extra]});
  /* LCD içerikleri (değerler örnektir) */
  const lcd300 = () => lcdBase([
    {t: 'text', txt: '07:30', x: .62, y: 0, w: .36, h: .22, c: '#14305A', s: .15, al: 'r', wt: 800},
    ...[['O₂', '1.0'], ['Air', '1.0'], ['N₂O', '0.0']].flatMap(([l, v], k) => [
      {t: 'text', txt: l, x: .04 + k * .32, y: .44, w: .28, h: .14, c: '#14305A', s: .1, wt: 700},
      {t: 'text', txt: v, x: .02 + k * .32, y: .58, w: .24, h: .3, c: '#14305A', s: .26, al: 'r', wt: 800},
      {t: 'text', txt: 'L/min', x: .02 + k * .32, y: .86, w: .28, h: .12, c: '#14305A', s: .08, al: 'r', wt: 600}])]);
  const lcd350 = () => lcdBase([
    {t: 'text', txt: '07:30', x: .1, y: .44, w: .8, h: .5, c: '#14305A', s: .4, al: 'c', wt: 800}]);
  /* O₂+ (flush) tuşu: yeşil halkalı yuvarlak tuş */
  function o2plus(g, x, y, z, m, r = .016) {
    put(g, torus(r + .003, .003, M.color(0x9BC53D, .45), 28), x, y, z + .004);
    put(g, cyl(r, r, .012, m.white, 28), x, y, z + .007, Math.PI / 2);
    put(g, label('O₂+', r * 1.3, r * .6, {c: '#2F3A44', wt: 800}), x, y, z + .0135);
  }

  /* ================= Dräger Atlan A300 / A350 (kompakt araba) ================= */
  /* Sütun (sol arka) ve ekranın altındaki üst gövde (gaz karıştırma ünitesini taşır) */
  function atlColumn(ctx) {
    const {g, cfg, P} = ctx, R = cfg.drg.col, U = cfg.drg.upper, m = D.mats(ctx), h = R.y1 - R.y0;
    put(g, rbox(R.w, h, R.d, .018, m.body), R.x, R.y0 + h / 2, R.z);
    put(g, rbox(R.w - .012, h - .04, .006, .008, m.white), R.x, R.y0 + h / 2, R.z + R.d / 2 + .002);
    /* sol yüzde dikey kanal ve standart ray */
    put(g, box(.003, h - .08, R.d * .55, m.seam), R.x - R.w / 2 - .001, R.y0 + h / 2, R.z - R.d * .1);
    put(g, box(.009, .026, R.d * .8, m.metal), R.x - R.w / 2 - .005, R.y0 + h * .72, R.z);
    [-1, 1].forEach(t => put(g, box(.014, .016, .018, m.metal), R.x - R.w / 2 - .002, R.y0 + h * .72, R.z + t * R.d * .3));
    /* hortum / kablo tutucuları */
    [.32, .52].forEach(f => { put(g, rbox(.03, .045, .06, .01, m.grey), R.x - R.w / 2 - .016, R.y0 + h * f, R.z - R.d * .15); put(g, box(.004, .05, .05, m.dark), R.x - R.w / 2 - .032, R.y0 + h * f + .015, R.z - R.d * .15); });
    /* üst gövde */
    put(g, rbox(U.w, U.h, U.d, .02, m.body), U.x, U.y + U.h / 2, U.z);
    put(g, box(U.w - .03, .003, .002, m.seam), U.x, U.y + U.h - .025, U.z + U.d / 2 + .0005);
    for (let k = 0; k < 6; k++) put(g, box(.002, .006, U.d * .5, m.seam), U.x + U.w / 2 + .0005, U.y + .05 + k * .014, U.z - U.d * .1);
    /* arka: saklama bölmesi kapağı, gaz besleme bloğu, havalandırma */
    const zb = Math.min(R.z - R.d / 2, U.z - U.d / 2) - .002;
    put(g, rbox(U.w * .7, U.h * .6, .006, .008, m.trim), U.x, U.y + U.h * .5, zb);
    for (let k = 0; k < 10; k++) put(g, box(U.w * .5, .003, .002, m.seam), U.x, U.y + U.h * .3 + k * .009, zb - .004);
    P('h-column', R.x - R.w / 2 - .02, R.y0 + h * .72, R.z + .03);
  }
  /* Gaz karıştırma ünitesi çerçevesi; ön yüz z'sini döndürür */
  function mixFrame(g, X, m) {
    put(g, rbox(X.w + .016, X.h + .016, .01, .022, m.trim), X.x, X.y, X.z + .005);
    put(g, rbox(X.w, X.h, .014, .02, M.plastic(X.color || 0xA7B4BF, .4)), X.x, X.y, X.z + .008);
    return X.z + .015;
  }
  /* A300: mekanik kontrollü karıştırıcı + elektronik akış ölçümü (IfU 3.1.12.2): solda O₂+ ve toplam akış tüpü, ortada durum ekranı,
     altında O₂ / Air / N₂O akış kontrol valfleri, sağda yardımcı O₂ akış ölçeri ve çıkışı */
  function atlMix300(ctx) {
    const {g, cfg, screens, P} = ctx, X = cfg.drg.mixer, m = D.mats(ctx), zf = mixFrame(g, X, m);
    const lw = X.w * .44, lh = X.h * .4, lx = X.x - X.w * .02, ly = X.y + X.h * .16;
    statusLCD(g, screens, lx, ly, zf, lw, lh, lcd300(), m);
    put(g, rbox(lw + .02, X.h * .33, .004, .012, M.plastic(0x95A3AF, .4)), lx, X.y - X.h * .28, zf + .002);
    [[0xF4F6F7, 0], [0xF4F6F7, 1], [0x2F7DD1, 0]].forEach(([c, ch], k) => flowKnob(g, lx + (k - 1) * lw * .34, X.y - X.h * .28, zf + .004, c, .0135, {check: !!ch}));
    o2plus(g, X.x - X.w * .4, X.y + X.h * .3, zf, m);
    flowTube(g, X.x - X.w * .4, X.y - X.h * .13, zf, X.h * .4, m, {f: .25});
    put(g, label('Total', .03, .008, {c: '#E9EEF1', wt: 700}), X.x - X.w * .4, X.y + X.h * .12, zf + .001);
    flowTube(g, X.x + X.w * .39, X.y + X.h * .12, zf, X.h * .46, m, {f: .15});
    put(g, cyl(.011, .011, .012, m.white, 20), X.x + X.w * .39, X.y - X.h * .08, zf + .02, Math.PI / 2);
    put(g, rbox(.05, .022, .006, .01, M.plastic(0x7E8B96, .4)), X.x + X.w * .39, X.y - X.h * .34, zf + .003);
    put(g, cyl(.005, .006, .016, m.metal, 12), X.x + X.w * .39, X.y - X.h * .34, zf + .012, Math.PI / 2);
    P('h-mix300', X.x - X.w * .02, X.y - X.h * .28, zf + .03); P('d-flush', X.x - X.w * .4, X.y + X.h * .3, zf + .025);
  }
  /* A350: elektronik kontrollü karıştırıcı (IfU 3.1.12.3): solda O₂+, ortada geniş durum ekranı, sağda O₂ akış ölçeri,
     altta Aux. O₂ / Add. O₂ anahtarı ve solda O₂ insüflasyon çıkışı; akış kontrol valfi yoktur */
  function atlMix350(ctx) {
    const {g, cfg, screens, P} = ctx, X = cfg.drg.mixer, m = D.mats(ctx), zf = mixFrame(g, X, m);
    const lw = X.w * .5, lh = X.h * .42, lx = X.x - X.w * .02, ly = X.y + X.h * .15;
    statusLCD(g, screens, lx, ly, zf, lw, lh, lcd350(), m);
    o2plus(g, X.x - X.w * .4, X.y + X.h * .3, zf, m);
    flowTube(g, X.x + X.w * .38, X.y + X.h * .1, zf, X.h * .5, m, {f: .15});
    put(g, cyl(.011, .011, .012, m.white, 20), X.x + X.w * .38, X.y - X.h * .14, zf + .02, Math.PI / 2);
    /* Aux. O₂ / Add. O₂ anahtarı (yatay kol) */
    put(g, torus(.012, .0025, M.color(0x9BC53D, .45), 24), lx + X.w * .1, X.y - X.h * .32, zf + .004);
    put(g, cyl(.009, .009, .012, m.knob, 20), lx + X.w * .1, X.y - X.h * .32, zf + .008, Math.PI / 2);
    put(g, rbox(.036, .009, .008, .004, m.knob), lx + X.w * .1 - .02, X.y - X.h * .32, zf + .012);
    put(g, label('Aux. O₂', .028, .007, {c: '#E9EEF1', wt: 600}), lx - X.w * .04, X.y - X.h * .25, zf + .001);
    put(g, label('Add. O₂', .028, .007, {c: '#E9EEF1', wt: 600}), lx + X.w * .02, X.y - X.h * .14, zf + .001);
    put(g, rbox(.05, .022, .006, .01, M.plastic(0x7E8B96, .4)), X.x - X.w * .3, X.y - X.h * .32, zf + .003);
    put(g, cyl(.005, .006, .016, m.metal, 12), X.x - X.w * .3, X.y - X.h * .32, zf + .012, Math.PI / 2);
    P('h-mix350', lx, ly, zf + .03); P('d-flush', X.x - X.w * .4, X.y + X.h * .3, zf + .025);
  }
  /* Vaporizatör bağlantı kolu: ekranın sağında, kompakt sürümde çalışma yüzeyinin sağ kenarını aşar (IfU 3.1.1.2);
     vaporizatörler kola asılı durur */
  function atlVapors(ctx) {
    const {g, cfg, P} = ctx, V = cfg.drg.vap, m = D.mats(ctx);
    put(g, rbox(V.bw, .07, .045, .012, m.grey), V.bx, V.y + .125, V.z - .112);
    put(g, rbox(V.arm, .05, .05, .012, m.body), V.bx - V.bw / 2 - V.arm / 2 + .02, V.y + .125, V.z - .118);
    put(g, cyl(.005, .005, V.bw * .9, m.chrome, 12), V.bx, V.y + .168, V.z - .1, 0, 0, Math.PI / 2);
    /* yedek manuel anahtarının kapağı */
    put(g, rbox(.045, .03, .012, .006, m.trim), V.bx - V.bw / 2 - .01, V.y + .2, V.z - .085);
    V.list.forEach(([agent, x, kind]) => D.vapor(g, x, V.y, V.z, agent, kind, m));
    P('h-vapor', V.list[0][1], V.y + .27, V.z + .03);
  }
  /* Dolap (D.cabinet) — kompakt sürümde tek kilitli çekmece */
  function atlCabinet(ctx) { const n = ctx.parts.length; D.cabinet(ctx); rekey(ctx.parts, n, {'d-drawer': 'h-drawer'}); }
  /* Ekran (D.screen) — işaret anahtarları bu modele göre */
  function atlScreen(ctx) {
    const n = ctx.parts.length, r = D.screen(ctx);
    rekey(ctx.parts, n, {'d-vscreen': 'h-screen-atlan', alarm: 'h-silence'});
    return r;
  }
  /* Solunum sistemi (D.bs) + anestezik gaz alma sistemi */
  function atlBS(ctx) {
    const {g, cfg, P} = ctx, n = ctx.parts.length, m = D.mats(ctx);
    D.bs(ctx);
    rekey(ctx.parts, n, {'d-bag': 'h-bag', 'd-piston': 'h-window'});
    const A = cfg.drg.agss;
    put(g, rbox(.07, .1, .07, .012, m.white), A[0], A[1], A[2]);
    put(g, cyl(.012, .012, .07, M.clear(0xEAF4F8, .5), 16), A[0] - .042, A[1] - .005, A[2] + .015);
    put(g, sphere(.006, M.color(0x2E9E58), 10), A[0] - .042, A[1] - .02, A[2] + .015);
    put(g, cyl(.01, .01, .03, m.grey, 12), A[0], A[1] - .065, A[2], 0, 0, 0);
    g.add(corrugated([V3(A[0], A[1] - .08, A[2]), V3(A[0], A[1] - .2, A[2] - .02), V3(A[0] + .03, A[1] - .4, A[2] - .1), V3(A[0] + .08, .05, A[2] - .3)], .009, M.plastic(0xC9D3D8, .4)));
    P('h-agss', A[0] - .05, A[1], A[2] + .03);
  }
  /* Arka: merkezi gaz hortumları ve güç / veri bağlantıları */
  function atlRear(g, cfg) {
    const R = cfg.drg.rear, m = D.mats({C: Object.assign({}, cfg.colors)}), z = R.z;
    put(g, rbox(.16, .07, .03, .01, m.grey), R.gx, R.gy, z - .012);
    [0xF4F6F7, 0x1D2125, 0x2F7DD1].forEach((c, k) => {
      const x = R.gx - .05 + k * .05;
      put(g, cyl(.009, .009, .025, m.metal, 12), x, R.gy - .01, z - .035, Math.PI / 2);
      g.add(tube([[x, R.gy - .01, z - .045], [x, R.gy - .06, z - .09], [x + .02, .4, z - .14], [x + .06, .015, z - .34]], .007, M.rubber(c)));
    });
    put(g, rbox(.14, .1, .02, .008, m.dark), R.px, R.py, z - .008);
    [[-.04, .02], [0, .02], [.04, .02], [-.04, -.025], [.02, -.025]].forEach(([dx, dy]) => put(g, box(.022, .014, .006, m.black), R.px + dx, R.py + dy, z - .02));
    put(g, rbox(.14, .07, .018, .008, m.white), R.px, R.py - .1, z - .007);
    [-.045, -.015, .015, .045].forEach(dx => put(g, cyl(.01, .01, .006, m.dark, 16), R.px + dx, R.py - .1, z - .018, Math.PI / 2));
    return [V3(R.gx, R.gy, z - .04), V3(R.px, R.py, z - .03)];
  }
  /* Atlan ventilatör ekranı (D.vent tabanlı; değerler örnektir): A300'de ölçülen akımlar sanal akış tüpleri olarak (O₂, Air, N₂O),
     A350'de taze gaz ayarları (O₂ %, akım, taşıyıcı gaz) ekranda gösterilir */
  function atlVent(A, kind) {
    const ctl = [['VT', '480'], ['RR', '12'], ['Ti', '1.7'], ['PEEP', '5'], ['Pmax', '35'], ['Tslope', '0.2'], ['Tip:Ti', '10']];
    const s = D.vent(A, kind === 'a350' ? {mode: 'PC-CMV', msg: 'Fresh gas: O₂ 50 %  ·  1.0 L/min', ctl: [['Pinsp', '15'], ['RR', '12'], ['Ti', '1.7'], ['PEEP', '5'], ['ΔPsupp', '0'], ['Tslope', '0.2'], ['Trigger', '3']]} : {mode: 'VC-CMV', msg: 'Low-flow wizard: 2.0 L/min', ctl});
    const L = s.layout;
    L.push({t: 'box', x: .002, y: .283, w: .13, h: .41, fill: '#05080B'});
    if (kind === 'a350') {
      L.push({t: 'text', txt: 'Fresh gas', x: .006, y: .285, w: .125, h: .032, c: '#C9D6DF', s: .022});
      [['O₂', '50', '%', .41], ['Flow', '1.0', 'L/min', .565]].forEach(([l, v, u, cy]) => {
        L.push({t: 'text', txt: l, x: .006, y: cy - .068, w: .12, h: .028, c: '#9FB3C4', s: .02});
        L.push(D.circ(.045, cy + .015, .09, A, {fill: '#7FCDB9', stroke: '#2B6E60', lw: .006}), {t: 'text', txt: v, x: .005, y: cy - .015, w: .08, h: .06, c: '#0D2C25', s: .03, al: 'c', wt: 800});
        L.push({t: 'text', txt: u, x: .085, y: cy, w: .05, h: .03, c: '#9FB3C4', s: .018});
      });
      L.push({t: 'box', x: .008, y: .64, w: .115, h: .045, fill: '#3A464E', r: .008}, {t: 'text', txt: 'Carrier: Air', x: .008, y: .64, w: .115, h: .045, c: '#E6EEF2', s: .018, al: 'c'});
    } else {
      [['O₂', .45, '#EEF2F4'], ['Air', .45, '#BFC8CF'], ['N₂O', .04, '#5D8FD6']].forEach(([l, v, c], k) => {
        const x = .014 + k * .04;
        L.push({t: 'text', txt: l, x: x - .006, y: .29, w: .04, h: .035, c: '#C9D6DF', s: .018, al: 'c'},
          {t: 'box', x, y: .33, w: .028, h: .3, stroke: '#56636D', fill: '#141B21', lw: .003}, {t: 'box', x: x + .003, y: .33 + .3 * (1 - v), w: .022, h: .3 * v - .004, fill: c});
      });
      L.push({t: 'text', txt: '1.0  1.0  0.0', x: .006, y: .64, w: .125, h: .035, c: '#FFFFFF', s: .02, al: 'c'}, {t: 'text', txt: 'L/min (measured)', x: .006, y: .668, w: .125, h: .025, c: '#9FB3C4', s: .015, al: 'c'});
    }
    L.push({t: 'box', x: 0, y: .93, w: .885, h: .07, fill: '#1A2228'},
      {t: 'text', txt: kind === 'a350' ? 'Electronic mixer  ·  O₂ 50 %  ·  FG 1.0 L/min  ·  Sev 2.0 Vol%' : 'Mechanical mixer  ·  FG 2.0 L/min (measured)  ·  Sev 2.0 Vol%', x: .01, y: .93, w: .87, h: .07, c: '#AEBDC8', s: .022, wt: 600});
    return s;
  }
  /* Atlan kompakt (A300 / A350) yapılandırması */
  const DRG = {body: 0xEFF0F1, trim: 0xE8EAEB, drawer: 0xF4F5F5, dark: 0xCDD2D6, panel: 0xBFD8E4, bs: 0xE4E8EB};
  function atlanCompact(kind) {
    const a350 = kind === 'a350', name = a350 ? 'Atlan A350' : 'Atlan A300', SW = .33, SH = .206;
    return {
      type: 'd-workstation', theta: -.45, w: .54, d: .66, top: .9, towerH: .22, towerD: .26, towerW: .72, cabW: .96, cabX: .02, label: name,
      colors: Object.assign({base: 0x6C7379}, DRG), cyl: 0, pipes: 0, agss: false,
      sections: {base: D.base, cabinet: atlCabinet, worktop: D.worktop, tower: atlColumn, gas: a350 ? atlMix350 : atlMix300, vapor: atlVapors, bs: atlBS, screen: atlScreen},
      drg: {
        /* kompakt araba: genişlik 74,5 cm, derinlik 69,2 cm (ürün bilgisi); taban oranları temsili */
        base: {kind: 'frame', w: .70, d: .66, y: .17, h: .075, color: 0x6C7379, cap: 0xA9AFB4, cr: .058, cx: .3, cz: .27, tire: 0x2F3A46, hub: 0xEEF1F3, fork: 0xC9CED2},
        cab: {x: .02, w: .52, y0: .21, y1: .79, d: .6, z: -.02, pin: [.13, .4], fronts: [
          {x0: -.24, x1: -.13, y0: .47, y1: .79, kind: 'recess'},
          {x0: -.13, x1: .28, y0: .55, y1: .79, shade: true, hole: [-.075, .015, .59, .745]},
          {x0: -.13, x1: .28, y0: .47, y1: .55, shade: true, handle: 'grip'},
          {x0: -.24, x1: .28, y0: .21, y1: .47, handle: 'grip', lock: [.245, .43]}]},
        /* çalışma yüzeyi: serbest alan 47 × 38 cm (ürün bilgisi) */
        top: {x: .02, w: .54, d: .66, z: 0, y: .9, band: .1, label: name, seams: [], handle: 'grip', hs: [1]},
        col: {x: -.27, w: .06, y0: .21, y1: 1.36, d: .17, z: -.235},
        upper: {x: -.045, w: .39, y: .9, h: .22, d: .26, z: -.2},
        hous: {x: -.045, y: 1.255, z: -.06, w: SW, h: SH, bezel: [.03, .035, .03, .03], d: .08, frame: .012, knobR: .085, spec: atlVent(SW / SH, kind)},
        mixer: {x: -.06, y: 1.005, w: .23, h: .145, z: -.072},
        vap: {bx: .26, bw: .23, arm: .06, y: .925, z: -.13, list: [['sevo', .205, 'v3000'], ['des', .315, 'dvapor']]},
        bs: {head: [-.31, .78, .2, .07, .08, .16], ports: {at: [[-.345, .795, .25], [-.345, .762, .232]], dir: [-1, -.3, .45]}, apl: [-.32, .822, .165],
          abs: {kind: 'clic', x: -.2, z: .29, y0: .53, y1: .765},
          limbs: [[[-.43, .64, .33], [-.47, .5, .36], [-.5, .42, .36], [-.52, .52, .33]], [[-.42, .62, .3], [-.46, .48, .32], [-.49, .4, .32], [-.515, .5, .3]]],
          ypc: [-.53, .66, .32], ypUp: [.1, 1, .1], filterC: 0x3C7FC8,
          bagHose: [[-.33, .765, .13], [-.38, .74, .11], [-.41, .72, .12], [-.415, .7, .125]],
          bag: {x: -.415, y: .69, z: .125, len: .26, c: 0x34393E}},
        drive: {kind: 'piston', x: -.03, y: .667, z: .215},
        agss: [-.34, .97, -.2],
        rear: {z: -.335, gx: .02, gy: 1.0, px: -.12, py: .62}
      },
      extra(g, ctx) {
        const [gi, pw] = atlRear(g, ctx.cfg);
        ctx.parts.push({key: 'h-gasin', at: gi}, {key: 'h-power', at: pw});
      }
    };
  }
  DEV3D.model('drager-atlan-a300', atlanCompact('a300'));
  DEV3D.model('drager-atlan-a350', atlanCompact('a350'));

  /* ================= Dräger Primus ================= */
  /* Primus ekranı (IfU 4.5n "Kullanıcı arayüzü / ekran" yerleşimine göre; değerler örnektir): üstte mod çubuğu ve sarı alarm alanı,
     solda gaz izleme değerleri, sanal akış ölçerler ve ekonometre, ortada eğriler, sağda ölçülen değerler ve izleme ekran tuşları,
     altta taze gaz ve ventilasyon ayar ekran tuşları */
  function primusScreen(A) {
    const TEAL = '#8FC1BC', TEALD = '#4D6E6B', INK = '#14202A';
    const L = [
      {t: 'box', x: 0, y: 0, w: 1, h: .075, fill: '#2B4D86'}, {t: 'text', txt: 'Volume Control', x: .015, y: 0, w: .35, h: .075, c: '#FFFFFF', s: .042},
      {t: 'box', x: .37, y: .012, w: .2, h: .052, fill: '#F2D22E'}, {t: 'text', txt: 'Vapor open', x: .37, y: .012, w: .2, h: .052, c: '#1A1A1A', s: .032, al: 'c'},
      {t: 'text', txt: '10:42', x: .8, y: 0, w: .19, h: .075, c: '#E3ECF7', s: .036, al: 'r'},
      /* gaz izleme */
      {t: 'box', x: .01, y: .09, w: .21, h: .28, fill: '#E9EDF0', stroke: '#9AA6AF', lw: .003}
    ];
    [['O₂', '50', '45', '#FFFFFF'], ['N₂O', '0', '0', '#2F7DD1'], ['Sev', '2.1', '1.9', '#F2C531'], ['CO₂', '0', '36', '#1F4E9C']].forEach(([l, a, b, c], k) => {
      const y = .105 + k * .065;
      L.push({t: 'box', x: .018, y, w: .03, h: .05, fill: c, stroke: '#7A8790', lw: .002}, {t: 'text', txt: l, x: .052, y, w: .06, h: .05, c: INK, s: .028},
        {t: 'text', txt: a, x: .1, y, w: .055, h: .05, c: INK, s: .034, al: 'r', wt: 800}, {t: 'text', txt: b, x: .155, y, w: .06, h: .05, c: INK, s: .034, al: 'r', wt: 800});
    });
    /* sanal akış ölçerler ve ekonometre */
    L.push({t: 'box', x: .01, y: .38, w: .21, h: .27, fill: '#E9EDF0', stroke: '#9AA6AF', lw: .003});
    [['O₂', .5, '#FFFFFF'], ['Air', .5, '#F2C531'], ['N₂O', 0, '#2F7DD1']].forEach(([l, v, c], k) => {
      const x = .025 + k * .042;
      L.push({t: 'box', x, y: .41, w: .026, h: .2, stroke: '#56636D', fill: '#D2D8DC', lw: .002}, {t: 'box', x: x + .003, y: .41 + .2 * (1 - v), w: .02, h: .2 * v, fill: c, stroke: '#56636D', lw: .001},
        {t: 'text', txt: l, x: x - .008, y: .615, w: .042, h: .03, c: INK, s: .02, al: 'c'});
    });
    L.push({t: 'box', x: .165, y: .41, w: .02, h: .2, fill: '#C9302B'}, {t: 'box', x: .165, y: .47, w: .02, h: .06, fill: '#E8D23F'}, {t: 'box', x: .165, y: .41, w: .02, h: .06, fill: '#7DC243'}, {t: 'box', x: .158, y: .5, w: .034, h: .008, fill: INK});
    /* eğri alanı */
    L.push({t: 'box', x: .235, y: .09, w: .44, h: .5, fill: '#E9EDF0', stroke: '#9AA6AF', lw: .003},
      {t: 'wave', k: 'paw', x: .245, y: .1, w: .42, h: .15, c: '#3A4148', l: 'Paw', fillUnder: true, fillAlpha: .7, span: 2.6, amp: .42, ls: .024},
      {t: 'wave', k: 'flow', x: .245, y: .26, w: .42, h: .15, c: '#3A4148', l: 'Flow', fillUnder: true, fillAlpha: .7, span: 2.6, amp: .4, ls: .024},
      {t: 'wave', k: 'capno', x: .245, y: .42, w: .42, h: .15, c: '#3A4148', l: 'CO₂', fillUnder: true, fillAlpha: .7, span: 2.6, amp: .42, ls: .024},
      {t: 'box', x: .235, y: .6, w: .44, h: .05, fill: '#DDE3E7', stroke: '#9AA6AF', lw: .002}, {t: 'text', txt: 'Volumeter  0.48 L', x: .24, y: .6, w: .43, h: .05, c: INK, s: .024});
    /* ölçülen değerler ve izleme ekran tuşları */
    [['Ppeak', '18'], ['Pmean', '9'], ['PEEP', '5'], ['MV', '5.4'], ['VT', '480'], ['RR', '12'], ['etCO₂', '36'], ['xMAC', '1.0']].forEach(([l, v], k) => {
      const y = .09 + k * .07;
      L.push({t: 'box', x: .685, y, w: .18, h: .062, fill: TEAL, r: .006}, {t: 'text', txt: l, x: .69, y, w: .08, h: .062, c: INK, s: .026}, {t: 'text', txt: v, x: .76, y, w: .1, h: .062, c: INK, s: .038, al: 'r', wt: 800},
        {t: 'box', x: .87, y, w: .05, h: .062, fill: TEALD, r: .006});
    });
    /* alt ayar tuşları */
    L.push({t: 'box', x: 0, y: .67, w: 1, h: .33, fill: '#C3C9CD'});
    const keys = [['O₂ %', '50'], ['Flow', '1.0'], ['Air', ''], ['VT', '480'], ['RR', '12'], ['Ti', '1.7'], ['Tip:Ti', '10'], ['Pmax', '35'], ['PEEP', '5'], ['Trigger', '3']];
    keys.forEach(([l, v], k) => {
      const x = .012 + k * .097 + (k >= 3 ? .01 : 0);
      L.push({t: 'box', x, y: .69, w: .088, h: .15, fill: TEAL, r: .008}, {t: 'text', txt: l, x, y: .695, w: .088, h: .05, c: INK, s: .024, al: 'c'},
        {t: 'text', txt: v, x, y: .74, w: .088, h: .09, c: INK, s: .044, al: 'c', wt: 800}, {t: 'box', x, y: .845, w: .088, h: .12, fill: '#5E6B73', r: .008}, D.circ(x + .044, .905, .08, A, {fill: '#3E4950', stroke: '#9AA6AF', lw: .004}));
    });
    return {bg: '#D3D9DD', layout: L};
  }
  /* Taban: koyu yuvarlatılmış platform ve 4 çift tekerlek */
  function primusBase(ctx) {
    const {g, cfg, P} = ctx, B = cfg.p.base;
    put(g, pillar(B.w, B.d, .06, .16, M.plastic(0x40474D, .5)), 0, B.y, B.z);
    put(g, pillar(B.w - .04, B.d - .04, .012, .14, M.matte(0x5A626A, .7)), 0, B.y + .034, B.z);
    put(g, pillar(B.w + .01, B.d + .01, .02, .165, M.rubber(0x2A2F34)), 0, B.y - .02, B.z);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => castor(g, sx * B.cx, B.z + sz * B.cz, B.cr, B.y - .03, {hub: 0xB7BEC3, fork: 0x5A626A, brake: sz > 0 ? 0xC0392B : null}));
    P('d-base', B.cx, B.cr * 1.6, B.z + B.cz + .05);
  }
  /* Gövde: yuvarlak köşeli kolon, çekmece, üst raf, üst nişin arka paneli, ön kumandalar */
  function primusBody(ctx) {
    const {g, cfg, P} = ctx, Q = cfg.p, B = Q.body, m = D.mats(ctx), zf = B.z + B.d / 2;
    const body = M.plastic(0xE4E8EA, .38), dark = M.plastic(0x3A4148, .45);
    /* alt gövde; üst nişin arkasında daha sığ gövde; niş yan direkleri; üst kapak */
    const N0 = Q.niche[0], N1 = Q.niche[1], nd = Q.nicheD;
    put(g, pillar(B.w, B.d, N0 - B.y0, .11, body), B.x, (B.y0 + N0) / 2, B.z);
    put(g, pillar(B.w, B.d - nd, N1 - N0, .1, body), B.x, (N0 + N1) / 2, B.z - nd / 2);
    put(g, pillar(B.w, B.d, B.y1 - N1, .11, body), B.x, (N1 + B.y1) / 2, B.z);
    /* alt etek (biraz daha geniş) */
    put(g, pillar(B.w + .03, B.d + .03, .1, .12, M.plastic(0xD5DADD, .4)), B.x, B.y0 + .05, B.z);
    /* çekmece */
    put(g, rbox(B.w * .54, .2, .03, .02, m.front), B.x, .36, zf + .005);
    put(g, rbox(B.w * .4, .014, .016, .006, m.grey), B.x, .43, zf + .024);
    P('d-drawer', B.x + B.w * .2, .36, zf + .03);
    /* üst niş: koyu arka panel */
    put(g, rbox(B.w - .08, N1 - N0, .006, .01, M.plastic(0xC8CED2, .45)), B.x, (N0 + N1) / 2, zf - nd + .003);
    /* üst raf */
    const S = Q.shelf;
    put(g, rbox(S.w, .055, S.d, .014, dark), B.x, B.y1 + .028, S.z);
    put(g, rbox(S.w - .04, .004, S.d - .04, .01, M.matte(0x555D64, .8)), B.x, B.y1 + .057, S.z);
    put(g, label('Dräger', .07, .02, {c: '#DDE3E7', wt: 700}), B.x + S.w * .05, B.y1 + .028, S.z + S.d / 2 + .001);
    P('h-topshelf', B.x - S.w * .3, B.y1 + .07, S.z + .05);
    /* ön kumandalar: acil O₂, O₂+ ve sistem anahtarı */
    const cy = Q.ctl;
    put(g, cyl(.017, .018, .02, m.white, 24), B.x - .05, cy, zf + .01, Math.PI / 2); put(g, torus(.018, .0025, M.plastic(0x2E9E58, .45), 24), B.x - .05, cy, zf + .002);
    put(g, rbox(.03, .006, .004, .002, m.grey), B.x - .05, cy, zf + .021);
    o2plus(g, B.x + .01, cy, zf, m, .014);
    put(g, rbox(.03, .04, .012, .008, m.grey), B.x + B.w * .36, cy + .04, zf + .004); put(g, rbox(.016, .024, .008, .004, m.dark), B.x + B.w * .36, cy + .04, zf + .012);
    P('h-o2emerg', B.x - .05, cy, zf + .03); P('d-flush', B.x + .01, cy, zf + .028);
    /* yazı tablası (koyu, öne çekilir) */
    const Tr = Q.tray;
    put(g, rbox(Tr.w, .028, Tr.d, .012, dark), B.x + Tr.dx, Tr.y, zf + Tr.d / 2 - .03);
    put(g, rbox(Tr.w - .02, .003, Tr.d - .03, .008, M.matte(0x4E565D, .8)), B.x + Tr.dx, Tr.y + .0145, zf + Tr.d / 2 - .03);
    P('h-tray', B.x + Tr.dx + Tr.w * .3, Tr.y + .02, zf + Tr.d - .05);
    /* sol yan: kesit penceresinde pistonlu ventilatör */
    const W = Q.win, iu = new THREE.Group(); iu.position.set(W[0], W[1], W[2]); g.add(iu);
    iu.add(rbox(.09, .2, .22, .012, M.glass(0xCFE3EC, .22)));
    put(iu, box(.004, .19, .21, M.matte(0x2B3238)), .042, 0, 0);
    put(iu, cyl(.04, .04, .12, M.clear(0xB7C0C6, .55), 28), 0, .02, .02, Math.PI / 2);
    put(iu, cyl(.036, .036, .018, M.matte(0x2B3238), 28), 0, .02, .045, Math.PI / 2);
    put(iu, cyl(.007, .007, .09, M.chrome(), 12), 0, .02, -.04, Math.PI / 2);
    put(iu, box(.05, .06, .04, M.matte(0x2B3238)), 0, .02, -.085);
    P('h-piston', W[0] - .03, W[1], W[2]);
    /* arka: havalandırma ızgarası, gaz bağlantıları, AGS, güç */
    const zb = B.z - B.d / 2 - .002;
    put(g, decal(.1, .1, (c, Wd, Hh) => { c.fillStyle = '#B9C0C5'; c.fillRect(0, 0, Wd, Hh); c.strokeStyle = '#4A5258'; c.lineWidth = 4; for (let k = 1; k < 6; k++) { c.beginPath(); c.arc(Wd / 2, Hh / 2, k * Wd * .085, 0, 7); c.stroke(); } }, 128), B.x - .12, 1.1, zb, 0, Math.PI, 0);
    put(g, rbox(.14, .05, .025, .01, m.grey), B.x + .02, .98, zb - .01);
    [0xF4F6F7, 0x1D2125, 0x2F7DD1].forEach((c, k) => { const x = B.x - .02 + k * .04; put(g, cyl(.008, .008, .02, m.metal, 12), x, .97, zb - .03, Math.PI / 2); g.add(tube([[x, .97, zb - .04], [x, .9, zb - .09], [x + .03, .4, zb - .15], [x + .07, .015, zb - .32]], .007, M.rubber(c))); });
    put(g, rbox(.08, .12, .07, .012, m.white), B.x + .14, .55, zb - .035);
    put(g, cyl(.012, .012, .08, M.clear(0xEAF4F8, .5), 16), B.x + .14, .56, zb - .072); put(g, sphere(.006, M.color(0x2E9E58), 10), B.x + .14, .54, zb - .072);
    put(g, rbox(.12, .08, .02, .008, m.dark), B.x - .1, .62, zb - .008);
    [-.03, 0, .03].forEach(dx => put(g, box(.018, .012, .006, m.black), B.x - .1 + dx, .635, zb - .02));
    g.add(tube([[B.x - .1, .58, zb - .02], [B.x - .1, .5, zb - .07], [B.x - .05, .2, zb - .12], [B.x, .015, zb - .3]], .005, M.rubber(0x22272B)));
    ctx.parts.push({key: 'h-gasin', at: V3(B.x + .02, .98, zb - .04)}, {key: 'h-agss', at: V3(B.x + .14, .55, zb - .08)}, {key: 'h-power', at: V3(B.x - .1, .62, zb - .03)});
  }
  /* Ekran paneli: 12,1" ekran, sağda alarm LED'i ve sabit tuşlar, altta tuş sıraları, sağ altta merkezi döner düğme */
  function primusScreenSec(ctx) {
    const {g, cfg, screens, parts} = ctx, S = cfg.p.scr, m = D.mats(ctx);
    const sg = new THREE.Group(); sg.position.set(S.x, S.y, S.z); sg.rotation.x = S.tilt; g.add(sg);
    const PW = S.w + .09, PH = S.h + .12, ox = -.03, oy = .04;
    put(sg, rbox(PW, PH, .05, .016, M.plastic(0xCDD3D7, .4)), 0, 0, -.025);
    put(sg, box(S.w + .004, S.h + .004, .002, m.black), ox, oy, .0012);
    const s = makeScreen(S.w, S.h, primusScreen(S.w / S.h), 1024); put(sg, s.mesh, ox, oy, .0028); screens.push(s);
    /* sağ sütun: alarm LED'i, alarm susturma, ekran sayfası, standart ekran */
    const rx = PW / 2 - .03;
    put(sg, rbox(.024, .01, .004, .003, M.led(0xF2D22E)), rx, oy + S.h / 2 - .01, .002);
    [oy + .03, oy - .02, oy - .06].forEach(y => put(sg, rbox(.024, .02, .006, .004, m.white), rx, y, .003));
    /* alt: taşıyıcı gaz ve mod tuşları */
    const by = oy - S.h / 2 - .03;
    for (let k = 0; k < 9; k++) { const x = ox - S.w / 2 + .012 + k * .026 + (k >= 3 ? .012 : 0); put(sg, rbox(.018, .015, .006, .004, m.white), x, by, .003); put(sg, sphere(.0018, M.led(0x2E9E58), 6), x - .005, by + .004, .0065); }
    for (let k = 0; k < 6; k++) put(sg, sphere(.002, M.led(k < 3 ? 0x2E9E58 : 0x8FA0AA), 6), ox - S.w / 2 + .02 + k * .018, by - .025, .002);
    const kx = PW / 2 - .065, ky = -PH / 2 + .04;
    put(sg, cyl(.026, .027, .018, m.knob, 32), kx, ky, .009, Math.PI / 2); put(sg, torus(.026, .0025, M.plastic(0xB7BEC3, .4), 32), kx, ky, .018);
    put(sg, cyl(.016, .016, .002, M.plastic(0xE3E7EA, .3), 24), kx, ky, .0185, Math.PI / 2);
    put(sg, rbox(.02, .02, .006, .004, m.white), PW / 2 - .018, ky, .003);
    sg.updateMatrixWorld(true); g.updateMatrixWorld(true);
    parts.push({key: 'h-screen-primus', at: sg.localToWorld(V3(ox, oy, .04))}, {key: 'knob', at: sg.localToWorld(V3(kx, ky, .03))}, {key: 'h-silence', at: sg.localToWorld(V3(rx, oy + .03, .02))});
    return {sx: S.x, sy: S.y, sz: S.z};
  }
  /* Vaporizatörler (Interlock'lu iki takma bağlantısı) */
  function primusVapors(ctx) {
    const {g, cfg, P} = ctx, V = cfg.p.vap, m = D.mats(ctx);
    put(g, rbox(V.bw, .016, .17, .006, m.trim), V.bx, V.y - .008, V.z - .02);
    put(g, rbox(V.bw, .06, .035, .01, m.grey), V.bx, V.y + .12, V.z - .1);
    put(g, cyl(.005, .005, V.bw * .9, m.chrome, 12), V.bx, V.y + .16, V.z - .09, 0, 0, Math.PI / 2);
    V.list.forEach(([agent, x, kind]) => D.vapor(g, x, V.y, V.z, agent, kind, m));
    P('h-vapor', V.list[0][1], V.y + .27, V.z + .03);
  }
  /* Kompakt solunum sistemi: koyu gövde, iki valf kubbesi ve hasta portları, APL, balon kolu ve balon, CLIC absorban */
  function primusBS(ctx) {
    const {g, cfg, P} = ctx, B = cfg.p.bs, m = D.mats(ctx), dk = M.plastic(0x3B4248, .42), [hx, hy, hz, hw, hh, hd] = B.head;
    put(g, rbox(hw, hh, hd, .016, dk), hx, hy, hz);
    put(g, rbox(hw - .02, .012, hd - .02, .006, M.plastic(0x2A3036, .5)), hx, hy + hh / 2 + .004, hz);
    put(g, rbox(.08, .05, .1, .01, m.metal), hx + hw / 2 + .03, hy, hz - .04);
    /* valf kubbeleri ve portlar (sola-öne) */
    const ends = [];
    [-1, 1].forEach((s, i) => {
      const vx = hx - hw * .25 + s * .045, vz = hz + hd * .22;
      put(g, cyl(.022, .022, .02, M.clear(0xEAF4F8, .5), 24), vx, hy + hh / 2 + .02, vz);
      put(g, cyl(.016, .016, .002, M.color(0x8FA3AE), 20), vx, hy + hh / 2 + .015, vz);
      const pg = new THREE.Group(); pg.position.set(vx, hy - .01, hz + hd / 2); pg.quaternion.setFromUnitVectors(V3(0, 1, 0), V3(-.35, -.2, 1).normalize()); g.add(pg);
      put(pg, cyl(.016, .016, .012, M.plastic(i ? 0xE9EEF1 : 0x3C7FC8, .4), 20), 0, .006, 0);
      put(pg, cyl(.0108, .0118, .03, M.plastic(0xD9DEE1, .35), 20), 0, .027, 0);
      pg.updateMatrixWorld(true); ends.push(pg.localToWorld(V3(0, .042, 0)), pg.localToWorld(V3(0, .09, 0)));
    });
    P('d-valves', hx - hw * .25, hy + hh / 2 + .03, hz + hd * .3);
    /* APL valfi */
    const ax = hx - hw / 2 + .035, az = hz - hd * .15;
    put(g, cyl(.02, .021, .024, m.knob, 28), ax, hy + hh / 2 + .012, az);
    for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; put(g, box(.003, .02, .003, M.plastic(0xB7BEC3, .4)), ax + Math.cos(a) * .0205, hy + hh / 2 + .012, az + Math.sin(a) * .0205, 0, -a, 0); }
    put(g, rbox(.036, .007, .012, .0034, m.mid), ax + .012, hy + hh / 2 + .027, az);
    P('d-apl', ax, hy + hh / 2 + .05, az);
    /* CLIC absorban */
    const A = B.abs, H = A.y1 - A.y0;
    put(g, rbox(.12, .025, .11, .008, dk), A.x, A.y1 - .012, A.z);
    put(g, lathe([[0, 0], [.05, 0], [.058, .01], [.061, .03], [.061, H - .06], [.056, H - .045], [.03, H - .035], [0, H - .035]], M.clear(0xF4F7F8, .6), 40), A.x, A.y0, A.z);
    put(g, cyl(.054, .054, H * .62, M.color(0xE9E2F2, .85), 28), A.x, A.y0 + H * .45, A.z);
    put(g, cyl(.062, .058, .03, M.plastic(0x2D5BB5, .35), 40), A.x, A.y0 + .015, A.z);
    P('d-absorber', A.x, A.y0 + H * .5, A.z + .065);
    P('h-bs-compact', hx + hw * .2, hy, hz + hd / 2 + .02);
    /* hortumlar, Y parça, balon */
    const yp = V3(...B.ypc), lm = M.plastic(0xA9D3EE, .4);
    [0, 1].forEach(i => g.add(corrugated([ends[i * 2], ends[i * 2 + 1], ...B.limbs[i].map(p => V3(...p)), V3(yp.x + (i ? .015 : -.015), yp.y + .03, yp.z - .04)], .011, lm)));
    put(g, cyl(.012, .012, .05, m.white, 16), yp.x, yp.y, yp.z, Math.PI / 2); put(g, cyl(.024, .024, .03, M.clear(0xEEF4F7, .55), 24), yp.x, yp.y, yp.z + .04, Math.PI / 2);
    P('d-ypiece', yp.x, yp.y + .02, yp.z + .03);
    g.add(tube(B.arm.map(p => V3(...p)), .009, m.metal, 40, 10));
    const bg = B.bag, a1 = B.arm[B.arm.length - 1];
    put(g, cyl(.011, .011, .03, m.white, 16), a1[0], a1[1] - .015, a1[2]);
    const bp = [[0, 0], [.012, 0], [.012, -.022]];
    for (let k = 1; k <= 20; k++) { const u = k / 20, r = .012 + (.064 - .012) * Math.pow(Math.sin(Math.min(1, u * 1.08) * Math.PI * .5), 1.4) * (u > .72 ? Math.sqrt(Math.max(0, 1 - Math.pow((u - .72) / .28, 2))) : 1); bp.push([Math.max(.0005, r), -.022 - u * (bg.len - .022)]); }
    put(g, lathe(bp, M.rubber(bg.c), 32), a1[0], a1[1] - .03, a1[2]);
    g.add(corrugated([V3(hx - hw / 2 + .01, hy - .01, hz + .02), V3(hx - hw / 2 - .04, hy - .03, hz + .03), V3(a1[0] + .02, a1[1] - .02, a1[2] - .02), V3(a1[0], a1[1] - .04, a1[2])], .01, lm));
    P('h-bag', a1[0], a1[1] - bg.len * .55, a1[2] + .07);
  }
  DEV3D.model('drager-primus', {
    type: 'd-workstation', theta: -.5, w: .5, d: .5, top: .87, towerH: .3, towerD: .3, label: 'Primus',
    colors: Object.assign({base: 0x40474D}, DRG), cyl: 0, pipes: 0, agss: false, bag: false,
    sections: {base: primusBase, cabinet: primusBody, worktop: () => {}, tower: () => {}, gas: () => {}, vapor: primusVapors, bs: primusBS, screen: primusScreenSec},
    p: {
      /* genel ölçü 80 × 137 × 80 cm (IfU 4.5n); üst raf 43 × 29 cm; diğer oranlar temsili */
      base: {w: .7, d: .7, y: .12, z: -.04, cx: .27, cz: .27, cr: .045},
      body: {x: .03, w: .5, d: .52, z: -.08, y0: .15, y1: 1.31},
      shelf: {w: .45, d: .31, z: -.1},
      niche: [.99, 1.29], nicheD: .2,
      scr: {x: .14, y: 1.15, z: .12, w: .246, h: .184, tilt: -.08},
      vap: {bx: -.11, bw: .24, y: 1.0, z: .075, list: [['sevo', -.165, 'v3000'], ['iso', -.055, 'v3000']]},
      ctl: .945,
      tray: {w: .4, d: .18, y: .865, dx: .06},
      win: [-.262, .64, -.06],
      bs: {head: [-.2, .78, .3, .26, .09, .2], abs: {x: -.15, z: .3, y0: .5, y1: .73},
        limbs: [[[-.37, .7, .46], [-.44, .55, .47], [-.47, .5, .46]], [[-.35, .68, .44], [-.42, .53, .44], [-.46, .48, .43]]],
        ypc: [-.49, .58, .45], arm: [[-.33, .79, .26], [-.38, .84, .25], [-.44, .85, .24], [-.48, .8, .23]], bag: {len: .26, c: 0x2FA88C}}
    }
  });

  /* ================= Dräger Fabius plus (araba modeli) ================= */
  /* Fabius plus ekranı (GA SW 3.n "Ekran" çizimine göre; tek renkli görünüm; değerler örnektir): durum satırı, alarm alanı,
     O₂ izleme, iki sıra ölçülen değer, basınç eğrisi ve ekran altı tuş etiketleri */
  function fabiusScreen() {
    const INK = '#101414', BG = '#D9E0DA';
    const L = [
      {t: 'box', x: 0, y: 0, w: 1, h: .1, stroke: INK, lw: .006},
      {t: 'icon', g: 'bell', x: .32, y: .015, w: .05, h: .07, c: INK}, {t: 'text', txt: '103', x: .38, y: 0, w: .1, h: .1, c: INK, s: .07, wt: 800},
      {t: 'icon', g: 'battery', x: .63, y: .02, w: .06, h: .06, c: INK}, {t: 'text', txt: '100%', x: .69, y: 0, w: .12, h: .1, c: INK, s: .06},
      {t: 'text', txt: '07:25', x: .82, y: 0, w: .17, h: .1, c: INK, s: .06, al: 'r'},
      {t: 'text', txt: 'Volume', x: .01, y: 0, w: .25, h: .1, c: INK, s: .06, wt: 800},
      {t: 'box', x: 0, y: .1, w: .26, h: .5, stroke: INK, lw: .006},
      {t: 'box', x: .26, y: .1, w: .38, h: .18, stroke: INK, lw: .006}, 
      {t: 'box', x: .64, y: .1, w: .36, h: .18, stroke: INK, lw: .006},
      {t: 'text', txt: 'O₂ %', x: .65, y: .11, w: .1, h: .06, c: INK, s: .045}, {t: 'text', txt: '96', x: .72, y: .12, w: .2, h: .16, c: INK, s: .16, al: 'r', wt: 800},
      {t: 'text', txt: '100', x: .92, y: .11, w: .075, h: .06, c: INK, s: .04, al: 'r'}, {t: 'text', txt: '20', x: .92, y: .21, w: .075, h: .06, c: INK, s: .04, al: 'r'},
      {t: 'box', x: .26, y: .28, w: .74, h: .16, stroke: INK, lw: .006}, {t: 'box', x: .26, y: .44, w: .74, h: .16, stroke: INK, lw: .006}
    ];
    [['Pmax', '12'], ['VT', '567'], ['MV', '6.8']].forEach(([l, v], k) => L.push({t: 'text', txt: l, x: .27 + k * .24, y: .285, w: .1, h: .05, c: '#4A5250', s: .035}, {t: 'text', txt: v, x: .27 + k * .24, y: .31, w: .2, h: .13, c: INK, s: .11, al: 'r', wt: 800}));
    [['PEEP', '2'], ['Pplat', '25'], ['RR', '29']].forEach(([l, v], k) => L.push({t: 'text', txt: l, x: .27 + k * .24, y: .445, w: .1, h: .05, c: '#4A5250', s: .035}, {t: 'text', txt: v, x: .27 + k * .24, y: .47, w: .2, h: .13, c: INK, s: .11, al: 'r', wt: 800}));
    L.push({t: 'box', x: 0, y: .6, w: 1, h: .27, stroke: INK, lw: .006}, {t: 'text', txt: '50', x: .005, y: .61, w: .06, h: .05, c: INK, s: .04}, {t: 'text', txt: '0', x: .005, y: .8, w: .06, h: .05, c: INK, s: .04},
      {t: 'wave', k: 'paw', x: .06, y: .62, w: .93, h: .24, c: INK, fillUnder: true, fillAlpha: .9, span: 2.6, amp: .5, mid: .7});
    ['Mode', 'VT', 'Freq.', 'TI:TE', 'TIP:TI', 'PEEP'].forEach((s, k) => L.push({t: 'box', x: .005 + k * .165, y: .885, w: .155, h: .1, stroke: INK, lw: .005}, {t: 'text', txt: s, x: .005 + k * .165, y: .885, w: .155, h: .1, c: INK, s: .045, al: 'c'}));
    return {bg: BG, layout: L};
  }
  /* Araba: dikdörtgen çerçeve, 4 tekerlek (ön ikisinde fren pedalı) */
  function fabBase(ctx) {
    const {g, cfg, P} = ctx, B = cfg.f.base, fm = M.plastic(0x9AA2A8, .4);
    [-1, 1].forEach(s => put(g, rbox(.05, .045, B.d, .012, fm), B.x + s * (B.w / 2 - .025), B.y, B.z));
    [-1, 1].forEach(s => put(g, rbox(B.w - .08, .04, .05, .012, fm), B.x, B.y, B.z + s * (B.d / 2 - .025)));
    put(g, rbox(B.w - .1, .012, B.d - .1, .006, M.matte(0x7A838A, .7)), B.x, B.y + .01, B.z);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => castor(g, B.x + sx * (B.w / 2 - .03), B.z + sz * (B.d / 2 - .04), B.cr, B.y - .022, {hub: 0xDDE2E5, fork: 0x8E969C, brake: sz > 0 ? 0x4E565C : null}));
    [-1, 1].forEach(s => put(g, rbox(.05, .012, .06, .004, M.plastic(0x4E565C, .5)), B.x + s * (B.w / 2 - .03), B.cr * 2 + .02, B.z + B.d / 2 + .02, -.25));
    P('d-base', B.x + B.w / 2 - .03, B.cr * 1.6, B.z + B.d / 2 + .02);
  }
  /* Alt dolap (3 çekmece) ve yazı masası */
  function fabCabinet(ctx) {
    const {g, cfg, P} = ctx, K = cfg.f.cab, m = D.mats(ctx), zf = K.z + K.d / 2, h = K.y1 - K.y0;
    put(g, rbox(K.w, h, K.d, .014, m.body), K.x, K.y0 + h / 2, K.z);
    const dh = (h - .03) / 3;
    for (let k = 0; k < 3; k++) {
      const y = K.y0 + .02 + dh * (k + .5);
      put(g, rbox(K.w - .03, dh - .012, .02, .008, m.front), K.x, y, zf + .006);
      put(g, rbox(K.w * .5, .012, .014, .005, m.grey), K.x, y + dh / 2 - .03, zf + .02);
    }
    P('d-drawer', K.x + K.w * .3, K.y0 + .02 + dh * 2.5, zf + .03);
    const Tb = cfg.f.table;
    put(g, rbox(Tb.w, .03, Tb.d, .01, m.trim), Tb.x, Tb.y, Tb.z);
    put(g, rbox(Tb.w + .004, .02, .02, .008, M.plastic(0x8E969C, .45)), Tb.x, Tb.y - .005, Tb.z + Tb.d / 2);
    P('h-table', Tb.x + Tb.w * .25, Tb.y + .02, Tb.z + Tb.d * .3);
  }
  /* Üst gövde: ön yüz bölümleri; sağda manometreler, akış tüpleri ve akış düğmeleri; solda yardımcı O₂ ve ventilatör ünitesi;
     ortada vaporizatör yuvası; üstte kontrol paneli ve ekran */
  function fabTower(ctx) {
    const {g, cfg, screens, parts, P} = ctx, U = cfg.f.upper, m = D.mats(ctx), zf = U.z + U.d / 2, h = U.y1 - U.y0;
    put(g, rbox(U.w, h, U.d, .016, m.body), U.x, U.y0 + h / 2, U.z);
    /* sağ bölüm (gaz) */
    const gx = U.x + U.w / 2 - .085;
    put(g, rbox(.15, h - .02, .012, .008, M.plastic(0xDDE2E5, .4)), gx, U.y0 + h / 2, zf + .004);
    [[0xF4F6F7, 'O₂'], [0x1D2125, 'Air'], [0x2F7DD1, 'N₂O']].forEach(([c], k) => {
      const x = gx - .045 + k * .045, y = U.y1 - .045;
      put(g, cyl(.017, .017, .016, M.plastic(0xF4F6F7, .35), 24), x, y, zf + .014, Math.PI / 2);
      put(g, torus(.017, .0025, M.plastic(c === 0x1D2125 ? 0x6E7880 : c, .4), 24), x, y, zf + .022);
      put(g, decal(.026, .026, (cc, Wd, Hh) => { cc.fillStyle = '#FFF'; cc.beginPath(); cc.arc(Wd / 2, Hh / 2, Wd / 2, 0, 7); cc.fill(); cc.strokeStyle = '#222'; cc.lineWidth = 3; for (let q = 0; q < 7; q++) { const a = Math.PI * (.75 + q * .25); cc.beginPath(); cc.moveTo(Wd / 2 + Math.cos(a) * Wd * .32, Hh / 2 + Math.sin(a) * Hh * .32); cc.lineTo(Wd / 2 + Math.cos(a) * Wd * .44, Hh / 2 + Math.sin(a) * Hh * .44); cc.stroke(); } cc.strokeStyle = '#C0392B'; cc.beginPath(); cc.moveTo(Wd / 2, Hh / 2); cc.lineTo(Wd * .72, Hh * .3); cc.stroke(); }, 64), x, y, zf + .0225);
    });
    P('h-fab-gauges', gx, U.y1 - .045, zf + .04);
    /* akış tüpü bloğu (4 tüp) */
    put(g, rbox(.13, .19, .02, .008, M.plastic(0x5C666E, .45)), gx, U.y0 + .17, zf + .01);
    for (let k = 0; k < 4; k++) {
      const x = gx - .045 + k * .03;
      put(g, cyl(.008, .008, .17, M.glass(0xEAF5FA, .55), 16), x, U.y0 + .17, zf + .024);
      put(g, sphere(.006, M.color([0x2E9E58, 0x2E9E58, 0xF2C531, 0x2F7DD1][k], .4), 12), x, U.y0 + .1 + .1 * ((k * .37 + .2) % 1), zf + .024);
      put(g, box(.022, .012, .002, M.color([0xF4F6F7, 0xF4F6F7, 0x1D2125, 0x2F7DD1][k], .5)), x, U.y0 + .258, zf + .021);
    }
    /* akış kontrol düğmeleri */
    [[0xF4F6F7, 0], [0xF4F6F7, 1], [0x2F7DD1, 0]].forEach(([c, ch], k) => flowKnob(g, gx - .04 + k * .04, U.y0 + .04, zf + .006, c, .013, {check: !!ch}));
    P('h-fab-flow', gx, U.y0 + .17, zf + .04);
    /* sol bölüm: yardımcı O₂ akış ölçeri, O₂ flush, ventilatör ünitesi */
    const lx = U.x - U.w / 2;
    flowTube(g, lx + .035, U.y0 + .27, zf, .12, m, {f: .12});
    put(g, cyl(.01, .01, .012, m.white, 16), lx + .035, U.y0 + .185, zf + .016, Math.PI / 2);
    P('h-aux-o2', lx + .035, U.y0 + .27, zf + .03);
    o2plus(g, lx + .08, U.y1 - .03, zf, m, .013);
    P('d-flush', lx + .08, U.y1 - .03, zf + .025);
    const vx = lx + .065;
    put(g, rbox(.1, .12, .02, .01, M.plastic(0xD5DADD, .4)), vx, U.y0 + .075, zf + .008);
    put(g, rbox(.065, .06, .006, .006, M.glass(0x9FB8C6, .4)), vx, U.y0 + .085, zf + .019);
    put(g, cyl(.022, .022, .045, M.clear(0xB7C0C6, .55), 20), vx, U.y0 + .085, zf + .002, 0, 0, Math.PI / 2);
    put(g, label('E-Vent', .05, .01, {c: '#5A6670', wt: 700}), vx, U.y0 + .035, zf + .019);
    P('h-fab-vent', vx, U.y0 + .08, zf + .04);
    /* vaporizatör yuvası (2 konum) ve vaporizatörler */
    const V = cfg.f.vap;
    put(g, rbox(V.bw, .045, .03, .008, m.grey), V.bx, V.y + .13, zf + .015);
    [-1, 1].forEach(s => { put(g, cyl(.006, .006, .02, m.chrome, 10), V.bx + s * V.bw * .25 - .02, V.y + .155, zf + .02); put(g, cyl(.006, .006, .02, m.chrome, 10), V.bx + s * V.bw * .25 + .02, V.y + .155, zf + .02); });
    V.list.forEach(([agent, x]) => D.vapor(g, x, V.y, zf + .1, agent, 'v3000', m));
    P('h-vapor', V.list[0][1], V.y + .27, zf + .14);
    /* kontrol paneli ve ekran */
    const C = cfg.f.panel, cg = new THREE.Group(); cg.position.set(C.x, C.y, C.z); cg.rotation.x = C.tilt; g.add(cg);
    put(cg, rbox(C.w, C.h, C.d, .018, m.body), 0, 0, -C.d / 2);
    put(cg, rbox(C.w - .03, C.h - .03, .006, .012, M.plastic(0xE0E5E8, .38)), 0, 0, .002);
    put(cg, label('Dräger', .07, .018, {c: '#2F5D9E', wt: 800}), -C.w / 2 + .06, C.h / 2 - .028, .006);
    put(cg, label('Fabius plus', .11, .016, {c: '#5A6670', it: true, wt: 600}), C.w / 2 - .09, C.h / 2 - .028, .006);
    const sx = -.02, sy = -.012, SW = C.sw, SH = C.sh;
    put(cg, rbox(SW + .02, SH + .02, .006, .006, M.plastic(0x5C666E, .45)), sx, sy, .004);
    put(cg, box(SW + .003, SH + .003, .002, m.black), sx, sy, .0075);
    const s = makeScreen(SW, SH, fabiusScreen(), 768); put(cg, s.mesh, sx, sy, .009); screens.push(s);
    for (let k = 0; k < 6; k++) put(cg, rbox(.024, .016, .008, .004, m.white), sx - SW / 2 - .035, sy + SH / 2 - .012 - k * (SH - .01) / 5, .006);
    for (let k = 0; k < 6; k++) put(cg, rbox(.018, .012, .007, .004, m.white), sx - SW / 2 + .012 + k * (SW - .024) / 5, sy - SH / 2 - .02, .006);
    const kx = sx + SW / 2 + .05, ky = sy - .01;
    put(cg, cyl(.022, .023, .016, m.knob, 32), kx, ky, .012, Math.PI / 2); put(cg, torus(.022, .0022, M.plastic(0xB7BEC3, .4), 32), kx, ky, .02);
    [[.03, 0xF2C531], [-.035, 0xF4F6F7]].forEach(([dy, c]) => put(cg, rbox(.02, .014, .007, .004, M.plastic(c, .4)), kx + .04, ky + dy, .006));
    put(cg, rbox(.016, .008, .004, .002, M.led(0xF2D22E)), kx + .04, ky + .055, .005);
    cg.updateMatrixWorld(true); g.updateMatrixWorld(true);
    parts.push({key: 'h-fab-panel', at: cg.localToWorld(V3(sx, sy, .05))}, {key: 'knob', at: cg.localToWorld(V3(kx, ky, .035))});
    /* arka: merkezi gaz hortumları */
    const zb = U.z - U.d / 2 - .002;
    put(g, rbox(.16, .06, .03, .01, m.grey), U.x + .06, U.y0 + .1, zb - .012);
    [0xF4F6F7, 0x1D2125, 0x2F7DD1].forEach((c, k) => { const x = U.x + .01 + k * .05; put(g, cyl(.009, .009, .025, m.metal, 12), x, U.y0 + .095, zb - .035, Math.PI / 2); g.add(tube([[x, U.y0 + .095, zb - .045], [x, U.y0 + .03, zb - .09], [x + .02, .4, zb - .14], [x + .06, .015, zb - .34]], .007, M.rubber(c))); });
    parts.push({key: 'h-gasin', at: V3(U.x + .06, U.y0 + .1, zb - .04)});
  }
  /* COSY: sol kolda kompakt solunum sistemi, valf kubbeleri, portlar, APL, balon, altında absorban */
  function fabCOSY(ctx) {
    const {g, cfg, P} = ctx, B = cfg.f.cosy, m = D.mats(ctx), [hx, hy, hz, hw, hh, hd] = B.head, cw = M.plastic(0xE9ECEE, .38);
    /* taşıyıcı kol */
    put(g, rbox(.03, .05, .06, .01, m.metal), B.armX - .015, hy - .03, B.armZ);
    put(g, rbox(.04, .035, hz - B.armZ + .02, .01, m.metal), hx + hw / 2 - .005, hy - .03, (hz + B.armZ) / 2);
    put(g, rbox(hw, hh, hd, .025, cw), hx, hy, hz);
    put(g, rbox(hw - .015, .01, hd - .015, .01, M.plastic(0xD5DADD, .4)), hx, hy + hh / 2 + .003, hz);
    /* valf kubbeleri (insp / eksp) ve diğer bağlantılar */
    [[hx + hw * .2, hz + hd * .22], [hx + hw * .2, hz - hd * .2]].forEach(([x, z]) => {
      put(g, cyl(.024, .024, .022, M.clear(0xEAF4F8, .5), 24), x, hy + hh / 2 + .015, z);
      put(g, cyl(.026, .026, .006, m.grey, 24), x, hy + hh / 2 + .004, z);
    });
    [[hx - hw * .12, hz + hd * .25], [hx - hw * .12, hz - hd * .15]].forEach(([x, z]) => put(g, cyl(.017, .017, .012, m.white, 20), x, hy + hh / 2 + .008, z));
    P('d-valves', hx + hw * .2, hy + hh / 2 + .035, hz + hd * .22);
    /* portlar: öne (insp, eksp) */
    const ends = [];
    [hx + hw * .32, hx + hw * .08].forEach((x, i) => {
      const pg = new THREE.Group(); pg.position.set(x, hy - .005, hz + hd / 2); pg.quaternion.setFromUnitVectors(V3(0, 1, 0), V3(-.2, -.25, 1).normalize()); g.add(pg);
      put(pg, cyl(.016, .016, .012, M.plastic(i ? 0xE9EEF1 : 0x3C7FC8, .4), 20), 0, .006, 0);
      put(pg, cyl(.0108, .0118, .032, M.plastic(0xD9DEE1, .35), 20), 0, .028, 0);
      pg.updateMatrixWorld(true); ends.push(pg.localToWorld(V3(0, .044, 0)), pg.localToWorld(V3(0, .09, 0)));
    });
    /* APL (Man/Spont) */
    const ax = hx - hw * .32, az = hz;
    put(g, cyl(.022, .023, .026, m.knob, 28), ax, hy + hh / 2 + .013, az);
    for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; put(g, box(.003, .022, .003, M.plastic(0xB7BEC3, .4)), ax + Math.cos(a) * .0225, hy + hh / 2 + .013, az + Math.sin(a) * .0225, 0, -a, 0); }
    put(g, rbox(.04, .008, .012, .0035, M.color(0xF2C531, .5)), ax + .013, hy + hh / 2 + .03, az);
    P('d-apl', ax, hy + hh / 2 + .05, az);
    P('h-cosy', hx, hy, hz + hd / 2 + .03);
    /* absorban (sarkık, şeffaf hazne) */
    const A = B.abs, H = A.y1 - A.y0;
    put(g, rbox(.15, .025, .15, .01, cw), A.x, A.y1 - .012, A.z);
    put(g, cyl(.066, .066, H - .03, M.clear(0xF1F5F7, .45), 36, true), A.x, A.y0 + (H - .03) / 2 + .005, A.z);
    put(g, cyl(.06, .06, (H - .03) * .9, M.color(0xE4D9EE, .9), 28), A.x, A.y0 + (H - .03) / 2 + .005, A.z);
    put(g, cyl(.07, .07, .016, cw, 36), A.x, A.y0, A.z);
    put(g, cyl(.02, .02, .02, m.grey, 16), A.x, A.y0 - .016, A.z);
    P('d-absorber', A.x, A.y0 + H * .5, A.z + .07);
    /* hortumlar ve Y parça */
    const yp = V3(...B.ypc), lm = M.plastic(0xA9D3EE, .4);
    [0, 1].forEach(i => g.add(corrugated([ends[i * 2], ends[i * 2 + 1], ...B.limbs[i].map(p => V3(...p)), V3(yp.x + (i ? .015 : -.015), yp.y + .03, yp.z - .04)], .011, lm)));
    put(g, cyl(.012, .012, .05, m.white, 16), yp.x, yp.y, yp.z, Math.PI / 2); put(g, cyl(.024, .024, .03, M.clear(0xEEF4F7, .55), 24), yp.x, yp.y, yp.z + .04, Math.PI / 2);
    P('d-ypiece', yp.x, yp.y + .02, yp.z + .03);
    /* balon tutucu ve balon (sol yanda) */
    const bx = hx - hw / 2 - .02, by = hy + .02, bz = hz + hd * .3;
    put(g, cyl(.006, .006, .07, m.metal, 10), bx, by + .03, bz);
    g.add(corrugated([V3(hx - hw * .12, hy + hh / 2 + .01, hz - hd * .15), V3(hx - hw * .3, hy + hh / 2 + .05, hz - hd * .3), V3(bx - .04, by + .02, bz - .02), V3(bx - .05, by - .02, bz)], .01, lm));
    const bp = [[0, 0], [.012, 0], [.012, -.022]];
    for (let k = 1; k <= 20; k++) { const u = k / 20, r = .012 + (.062 - .012) * Math.pow(Math.sin(Math.min(1, u * 1.08) * Math.PI * .5), 1.4) * (u > .72 ? Math.sqrt(Math.max(0, 1 - Math.pow((u - .72) / .28, 2))) : 1); bp.push([Math.max(.0005, r), -.022 - u * (.26 - .022)]); }
    put(g, lathe(bp, M.rubber(0x2B3036), 32), bx - .05, by - .02, bz);
    P('h-bag', bx - .05, by - .16, bz + .07);
  }
  DEV3D.model('drager-fabius-plus', {
    type: 'd-workstation', theta: -.45, w: .48, d: .5, top: .8, towerH: .4, towerD: .36, label: 'Fabius plus',
    colors: Object.assign({base: 0x9AA2A8}, DRG), cyl: 0, pipes: 0, agss: false, bag: false,
    sections: {base: fabBase, cabinet: fabCabinet, worktop: () => {}, tower: fabTower, gas: () => {}, vapor: () => {}, bs: fabCOSY, screen: () => ({sx: .06, sy: 1.3, sz: 0})},
    f: {
      /* genel ölçü 91 × 140 × 77 cm (GA SW 3.n, araba modeli, COSY ve iki vaporizatör yuvasıyla); bölüm oranları temsili */
      base: {x: .07, y: .13, z: -.07, w: .56, d: .62, cr: .05},
      cab: {x: .07, w: .42, y0: .16, y1: .78, d: .48, z: -.08},
      table: {x: .07, w: .52, d: .6, y: .795, z: -.03},
      upper: {x: .07, w: .48, y0: .81, y1: 1.19, d: .36, z: -.14},
      vap: {bx: .05, bw: .23, y: .835, list: [['sevo', -.005], ['iso', .105]]},
      panel: {x: .07, y: 1.29, z: .02, w: .48, h: .2, d: .26, tilt: -.1, sw: .155, sh: .115},
      cosy: {head: [-.3, .86, .2, .24, .09, .22], armX: -.17, armZ: -.08, abs: {x: -.3, z: .2, y0: .53, y1: .8},
        limbs: [[[-.21, .74, .4], [-.24, .58, .43], [-.3, .5, .44]], [[-.25, .73, .39], [-.28, .57, .41], [-.33, .49, .42]]],
        ypc: [-.36, .56, .42]}
    }
  });
})();
