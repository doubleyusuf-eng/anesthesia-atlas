'use strict';
/* Cihaz yapılandırmaları F: ventilatörler (YB, transport, NIV, HFNC, jet), solunum gazı izlemi (kapnografi, multigaz,
   spirometri, volümetrik kapnografi, transkütan), EIT ve özofagus basıncı. Fotoğrafı olmayanlar jenerik formdadır. */
(() => {
  if (!DEV3D) return;
  const {V3, M, rbox, box, cyl, sphere, torus, lathe, tube, corrugated, put, makeScreen, canvasTex} = DEV3D.H;
  const {nameplate, pole} = DEV3D.H;
  const T = DEV3D.partText;

  /* ---------- Özel çizimli ekran: draw(g, W, H, t) ---------- */
  function fScreen(w, h, draw, pxw = 1024) {
    const PH = Math.round(pxw * h / w), c = document.createElement('canvas'); c.width = pxw; c.height = PH;
    const g = c.getContext('2d'), tex = new THREE.CanvasTexture(c); tex.encoding = THREE.sRGBEncoding; tex.anisotropy = 4;
    let last = -1;
    const redraw = t => { draw(g, pxw, PH, t); tex.needsUpdate = true; };
    redraw(0);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({map: tex, toneMapped: false}));
    mesh.userData.part = 'screen';
    return {mesh, update(t) { if (t - last > .08) { last = t; redraw(t); } }};
  }
  /* Ekran çerçevesi + ekran; spec nesnesi ya da çizim fonksiyonu */
  function fDisplay(parent, w, h, spec, x, y, z, rx = 0, screens, bez = 0x1B2126) {
    const grp = new THREE.Group(); put(parent, grp, x, y, z, rx);
    grp.add(rbox(w + .014, h + .014, .008, .004, M.matte(bez)));
    const s = typeof spec === 'function' ? fScreen(w, h, spec) : makeScreen(w, h, spec);
    put(grp, s.mesh, 0, 0, .0045); screens.push(s);
    return grp;
  }
  /* Dünya koordinatı (yerel nesneden) */
  const W = (obj, x, y, z) => { let r = obj; while (r.parent) r = r.parent; r.updateMatrixWorld(true); return obj.localToWorld(V3(x, y, z)); };

  /* ---------- Devre parçaları ---------- */
  /* Y parçası: iki kol (+x, -x yönünde) ve hasta tarafı (-y) */
  function fYpiece(col = 0xE6F1F5) {
    const s = new THREE.Group(), m = M.clear(col, .7);
    const a = cyl(.011, .011, .05, m, 20); a.rotation.z = Math.PI / 2 - .5; a.position.set(-.018, .012, 0); s.add(a);
    const b = cyl(.011, .011, .05, m, 20); b.rotation.z = -Math.PI / 2 + .5; b.position.set(.018, .012, 0); s.add(b);
    const c = cyl(.0095, .0095, .04, m, 20); c.position.set(0, -.018, 0); s.add(c);
    return s;
  }
  /* Oronazal maske (arka yüz -z), dirsek +z yönünde */
  function fMask() {
    const s = new THREE.Group();
    const shell = lathe([[0, .045], [.018, .044], [.034, .036], [.044, .02], [.048, 0]], M.clear(0xE6F1F5, .55), 32);
    shell.rotation.x = -Math.PI / 2; shell.scale.set(.85, 1.2, 1); s.add(shell);
    const cush = torus(.044, .007, M.color(0xC9DCE6, .6), 32); cush.scale.set(.85, 1.2, 1); s.add(cush);
    const el = cyl(.011, .011, .035, M.plastic(0x5B88B5), 20); el.rotation.x = Math.PI / 2; el.position.set(0, 0, .058); s.add(el);
    [-1, 1].forEach(k => { const st = box(.03, .012, .003, M.matte(0x37424B)); st.position.set(k * .05, .03, .01); st.rotation.z = k * .4; s.add(st); const sb = box(.03, .012, .003, M.matte(0x37424B)); sb.position.set(k * .05, -.035, .01); sb.rotation.z = -k * .3; s.add(sb); });
    const port = cyl(.003, .003, .008, M.matte(0x37424B), 10); port.rotation.x = Math.PI / 2; port.position.set(.012, .01, .047); s.add(port);
    return s;
  }
  /* Nazal kanül: yüz parçası + iki çatal; bağlantı +z yönünde */
  function fCannula() {
    const s = new THREE.Group(), m = M.plastic(0x9FC6DD);
    s.add(tube([[-.05, -.01, -.02], [-.025, 0, 0], [0, .002, .004], [.025, 0, 0], [.05, -.01, -.02]], .006, m, 24, 10));
    [-.009, .009].forEach(x => put(s, cyl(.0035, .0045, .014, M.plastic(0xC9E2EE), 12), x, .009, .002));
    const st = tube([[-.05, -.01, -.02], [-.06, -.03, -.05], [-.05, -.06, -.07]], .0025, M.plastic(0x9AA5AD)); s.add(st);
    const st2 = tube([[.05, -.01, -.02], [.06, -.03, -.05], [.05, -.06, -.07]], .0025, M.plastic(0x9AA5AD)); s.add(st2);
    const cn = cyl(.009, .009, .025, m, 16); cn.rotation.x = Math.PI / 2; cn.position.set(0, -.012, .02); s.add(cn);
    return s;
  }
  /* Hava yolu adaptörü (+x ekseninde), üstte örnekleme ucu */
  function fAdapter(col = 0xE6F1F5) {
    const s = new THREE.Group();
    const b = cyl(.011, .011, .05, M.clear(col, .65), 20); b.rotation.z = Math.PI / 2; s.add(b);
    put(s, cyl(.003, .003, .012, M.plastic(0xF2C531), 10), 0, .015, 0);
    return s;
  }
  /* Su tutucu (su kabı): şeffaf hazne + başlık */
  function fWaterTrap() {
    const s = new THREE.Group();
    s.add(rbox(.03, .045, .022, .006, M.clear(0xD8E8EE, .55)));
    put(s, rbox(.034, .014, .026, .004, M.matte(0x37424B)), 0, .028, 0);
    put(s, cyl(.0035, .0035, .01, M.plastic(0x5BB7DE), 10), 0, .028, .015, Math.PI / 2);
    return s;
  }
  /* Tekerlekli araba: 4 tekerlek, taban, kolon (yükseklik hCol) */
  function fCart(g, w, d, hCol, col = 0xD9E0E4) {
    put(g, rbox(w, .05, d, .015, M.plastic(col)), 0, .1, 0);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
      put(g, box(.03, .04, .03, M.matte(0x3A4148)), sx * (w / 2 - .04), .065, sz * (d / 2 - .04));
      put(g, cyl(.035, .035, .025, M.rubber(), 20), sx * (w / 2 - .04), .035, sz * (d / 2 - .04), 0, 0, Math.PI / 2);
    });
    put(g, rbox(.1, hCol, .1, .02, M.plastic(col)), 0, .125 + hCol / 2, -d * .15);
  }

  /* ---------- Parça metinleri ---------- */
  T('f-insp', {tr: ['İnspiratuvar çıkış', 'Ventilatörden hastaya giden gazın çıktığı porttur; inspiratuvar kol (çoğunlukla filtre üzerinden) buraya bağlanır.'], en: ['Inspiratory outlet', 'Port from which gas leaves the ventilator towards the patient; the inspiratory limb (usually via a filter) connects here.'], es: ['Salida inspiratoria', 'Puerto por el que sale el gas del ventilador hacia el paciente; aquí se conecta la rama inspiratoria (normalmente a través de un filtro).']});
  T('f-exp', {tr: ['Ekspiratuvar giriş', 'Hastadan dönen gazın ekspiratuvar valf ve akım sensörüne ulaştığı porttur; ekshale hacim burada ölçülür.'], en: ['Expiratory inlet', 'Port where gas returning from the patient reaches the expiratory valve and flow sensor; exhaled volume is measured here.'], es: ['Entrada espiratoria', 'Puerto por el que el gas que regresa del paciente llega a la válvula espiratoria y al sensor de flujo; aquí se mide el volumen espirado.']});
  T('f-humid', {tr: ['Isıtıcılı nemlendirici', 'Isıtıcı taban ve su haznesinden oluşur; inspiratuvar gazı ısıtıp nemlendirir. Alternatif olarak hasta tarafında ısı-nem değiştirici (HME) kullanılabilir.'], en: ['Heated humidifier', 'Heater base and water chamber that warm and humidify the inspired gas. A heat and moisture exchanger (HME) at the patient end is an alternative.'], es: ['Humidificador calefactado', 'Base calefactora y cámara de agua que calientan y humidifican el gas inspirado. Como alternativa puede usarse un intercambiador de calor y humedad (HME) en el extremo del paciente.']});
  T('f-circuit', {tr: ['Hasta devresi', 'İnspiratuvar ve ekspiratuvar kollardan oluşan körüklü hortumlardır; bağlantıların sıkı olduğu ve kaçak olmadığı kontrol edilir.'], en: ['Patient circuit', 'Corrugated tubes forming the inspiratory and expiratory limbs; connections are checked for tightness and leaks.'], es: ['Circuito del paciente', 'Tubos corrugados que forman las ramas inspiratoria y espiratoria; se comprueba que las conexiones estén firmes y sin fugas.']});
  T('f-ypiece', {tr: ['Y parçası', 'İki kolu birleştirip hastanın hava yoluna (tüp, maske) bağlanan parçadır; proksimal sensörler genellikle burada yer alır.'], en: ['Y-piece', 'Joins the two limbs and connects to the patient airway (tube, mask); proximal sensors are usually placed here.'], es: ['Pieza en Y', 'Une las dos ramas y se conecta a la vía aérea del paciente (tubo, mascarilla); los sensores proximales suelen colocarse aquí.']});
  T('f-arm', {tr: ['Devre tutucu kol', 'Hasta devresini taşıyarak tüp ve hava yoluna gelen çekme kuvvetini azaltır.'], en: ['Circuit support arm', 'Holds the patient circuit and reduces pull on the tube and airway.'], es: ['Brazo soporte del circuito', 'Sostiene el circuito del paciente y reduce la tracción sobre el tubo y la vía aérea.']});
  T('f-o2', {tr: ['Gaz girişi', 'Basınçlı oksijen (ve cihaza göre hava) kaynağının bağlandığı giriştir.'], en: ['Gas inlet', 'Inlet for the compressed oxygen (and, depending on the device, air) supply.'], es: ['Entrada de gas', 'Entrada para el suministro de oxígeno comprimido (y, según el equipo, aire).']});
  T('f-exhvalve', {tr: ['Ekshalasyon valfi / proksimal sensör', 'Tek kollu devrede ekspirasyonu sağlayan valf ile proksimal basınç-akım ölçüm hatlarıdır.'], en: ['Exhalation valve / proximal sensor', 'In a single-limb circuit, the valve that allows exhalation together with the proximal pressure and flow sensing lines.'], es: ['Válvula espiratoria / sensor proximal', 'En un circuito de rama única, la válvula que permite la espiración junto con las líneas proximales de presión y flujo.']});
  T('f-mask', {tr: ['Maske ve başlık', 'Burun ve ağzı kapatan arayüz; başlık kayışlarıyla aşırı sıkmadan, kaçağı en aza indirecek şekilde yerleştirilir.'], en: ['Mask and headgear', 'Interface covering the nose and mouth; fitted with headgear straps to minimise leak without overtightening.'], es: ['Mascarilla y arnés', 'Interfaz que cubre la nariz y la boca; se ajusta con las cintas del arnés para minimizar la fuga sin apretar en exceso.']});
  T('f-single', {tr: ['Tek kollu devre', 'Cihaz çıkışından maskeye uzanan tek hortumdur; ekspirasyon maskedeki ya da devredeki kaçak portundan olur.'], en: ['Single-limb circuit', 'One tube from the device outlet to the mask; exhalation occurs through the leak port in the mask or circuit.'], es: ['Circuito de rama única', 'Un único tubo desde la salida del equipo hasta la mascarilla; la espiración se produce por el puerto de fuga de la mascarilla o del circuito.']});
  T('f-chamber', {tr: ['Su haznesi', 'Steril suyla dolan ve ısıtıcı plaka üzerinde gazı nemlendiren haznedir; su torbasından beslenir.'], en: ['Water chamber', 'Chamber filled with sterile water that humidifies the gas over the heater plate; fed from a water bag.'], es: ['Cámara de agua', 'Cámara llena de agua estéril que humidifica el gas sobre la placa calefactora; se alimenta desde una bolsa de agua.']});
  T('f-heated', {tr: ['Isıtmalı solunum tüpü', 'Gazı hastaya kadar sıcak tutarak tüp içinde yoğuşmayı azaltan ısıtıcı telli hortumdur.'], en: ['Heated breathing tube', 'Heated-wire tube that keeps the gas warm up to the patient and reduces condensation.'], es: ['Tubo respiratorio calefactado', 'Tubo con hilo calefactor que mantiene el gas caliente hasta el paciente y reduce la condensación.']});
  T('f-cannula', {tr: ['Nazal kanül', 'Burun deliklerini tamamen kapatmayacak boyutta seçilen geniş çaplı kanüldür; ekspirasyon için kaçak kalmalıdır.'], en: ['Nasal cannula', 'Wide-bore cannula sized so that it does not fully occlude the nostrils; a leak must remain for exhalation.'], es: ['Cánula nasal', 'Cánula de gran calibre elegida para no ocluir por completo las fosas nasales; debe quedar fuga para la espiración.']});
  T('f-waterbag', {tr: ['Su torbası', 'Nemlendirici haznesini besleyen steril su kaynağıdır.'], en: ['Water bag', 'Sterile water supply that feeds the humidifier chamber.'], es: ['Bolsa de agua', 'Suministro de agua estéril que alimenta la cámara del humidificador.']});
  T('f-jetline', {tr: ['Jet hattı', 'Cihazın jet çıkışından katetere ya da jet adaptörüne yüksek basınçlı gazı taşıyan ince, sert hattır; bükülmemeli ve kopmamalıdır.'], en: ['Jet line', 'Thin, stiff line carrying high-pressure gas from the jet outlet to the catheter or jet adapter; it must not kink or disconnect.'], es: ['Línea jet', 'Línea fina y rígida que lleva el gas a alta presión desde la salida jet hasta el catéter o el adaptador jet; no debe acodarse ni desconectarse.']});
  T('f-jetcath', {tr: ['Jet kateteri', 'Hava yoluna yerleştirilen kafsız ince kateterdir; bazı modellerde ayrı basınç ölçüm lümeni bulunur. Ekspirasyon yolunun açık kalması gerekir.'], en: ['Jet catheter', 'Thin uncuffed catheter placed in the airway; some models have a separate pressure-monitoring lumen. The exhalation pathway must remain open.'], es: ['Catéter jet', 'Catéter fino sin balón colocado en la vía aérea; algunos modelos tienen una luz independiente para medir la presión. La vía de espiración debe permanecer abierta.']});
  T('f-pline', {tr: ['Basınç ölçüm hattı', 'Hava yolu basıncını cihaza ileterek basınç sınırlarının izlenmesini sağlar.'], en: ['Pressure monitoring line', 'Transmits airway pressure to the device so that pressure limits can be monitored.'], es: ['Línea de medición de presión', 'Transmite la presión de la vía aérea al equipo para vigilar los límites de presión.']});
  T('f-trap', {tr: ['Su tutucu', 'Örneklenen gazdaki nem ve sekresyonu tutarak analizörü korur; dolduğunda ya da tıkandığında değiştirilir.'], en: ['Water trap', 'Collects moisture and secretions from the sampled gas to protect the analyser; replaced when full or blocked.'], es: ['Trampa de agua', 'Retiene la humedad y las secreciones del gas muestreado para proteger el analizador; se cambia cuando está llena u obstruida.']});
  T('f-sline', {tr: ['Örnekleme hattı', 'Hava yolundan gazı sürekli aspire ederek analizöre taşıyan ince hattır; taşıma nedeniyle değerler gecikmeli görüntülenir.'], en: ['Sampling line', 'Thin line that continuously aspirates gas from the airway to the analyser; transport causes a display delay.'], es: ['Línea de muestreo', 'Línea fina que aspira continuamente el gas de la vía aérea hacia el analizador; el transporte produce un retraso en la visualización.']});
  T('f-adapter', {tr: ['Hava yolu adaptörü', 'Devre ile hasta hava yolu arasına takılan, örnekleme ya da ölçüm noktası sağlayan bağlantı parçasıdır.'], en: ['Airway adapter', 'Connector fitted between the circuit and the patient airway that provides the sampling or measuring point.'], es: ['Adaptador de vía aérea', 'Conector colocado entre el circuito y la vía aérea del paciente que proporciona el punto de muestreo o de medición.']});
  T('f-exhaust', {tr: ['Gaz çıkışı (egzoz)', 'Analiz edilen gazın atık gaz sistemine ya da devreye geri verildiği çıkıştır.'], en: ['Gas exhaust', 'Outlet returning analysed gas to the scavenging system or the circuit.'], es: ['Salida de gas (escape)', 'Salida por la que el gas analizado vuelve al sistema de evacuación o al circuito.']});
  T('f-flow', {tr: ['Akım sensörü', 'Hava yolundaki akımı (çoğunlukla diferansiyel basınçla) ölçer; hacim akımdan türetilir. İki ince hat basınç farkını modüle iletir.'], en: ['Flow sensor', 'Measures airway flow (usually by differential pressure); volume is derived from flow. Two thin lines carry the pressure difference to the module.'], es: ['Sensor de flujo', 'Mide el flujo en la vía aérea (generalmente por presión diferencial); el volumen se deriva del flujo. Dos líneas finas llevan la diferencia de presión al módulo.']});
  T('f-main', {tr: ['Ana akım CO₂ sensörü', 'Hava yolu adaptörüne takılan ve CO₂’yi gecikmesiz ölçen kızılötesi sensör başlığıdır.'], en: ['Mainstream CO₂ sensor', 'Infrared sensor head clipped onto the airway adapter that measures CO₂ without transport delay.'], es: ['Sensor de CO₂ mainstream', 'Cabezal de sensor infrarrojo que se acopla al adaptador de vía aérea y mide el CO₂ sin retraso de transporte.']});
  T('f-tcsensor', {tr: ['Transkütan sensör', 'Cildi ısıtarak CO₂/O₂ difüzyonunu artıran elektrokimyasal sensördür; bölgesi düzenli aralıklarla değiştirilir.'], en: ['Transcutaneous sensor', 'Electrochemical sensor that heats the skin to increase CO₂/O₂ diffusion; the site is changed at regular intervals.'], es: ['Sensor transcutáneo', 'Sensor electroquímico que calienta la piel para aumentar la difusión de CO₂/O₂; la zona se cambia a intervalos regulares.']});
  T('f-tcring', {tr: ['Sabitleme halkası', 'Cilde yapışan ve sensörü kontakt jel ile yerinde tutan halkadır.'], en: ['Fixation ring', 'Adhesive ring that holds the sensor in place on the skin with contact gel.'], es: ['Anillo de fijación', 'Anillo adhesivo que mantiene el sensor sobre la piel con gel de contacto.']});
  T('f-tcdock', {tr: ['Kalibrasyon yuvası', 'Sensörün kullanılmadığında saklandığı ve kalibre edildiği bölmedir; kalibrasyon gazı tüpü ile beslenir.'], en: ['Calibration dock', 'Compartment where the sensor is stored and calibrated when not in use; supplied by a calibration gas cylinder.'], es: ['Estación de calibración', 'Compartimento donde se guarda y calibra el sensor cuando no se usa; se alimenta con una bombona de gas de calibración.']});
  T('f-belt', {tr: ['Elektrot kemeri', 'Göğüs çevresine tek bir kesit düzleminde yerleştirilen, eşit aralıklı elektrotlar içeren kemerdir; ölçüm yalnızca bu kesiti yansıtır.'], en: ['Electrode belt', 'Belt with evenly spaced electrodes placed around the chest in a single plane; the measurement reflects only this slice.'], es: ['Cinturón de electrodos', 'Cinturón con electrodos equiespaciados colocado alrededor del tórax en un solo plano; la medición refleja solo ese corte.']});
  T('f-trunk', {tr: ['Hasta kablosu', 'Kemeri ve referans elektrodu monitöre bağlayan kablodur.'], en: ['Patient cable', 'Cable connecting the belt and reference electrode to the monitor.'], es: ['Cable del paciente', 'Cable que conecta el cinturón y el electrodo de referencia al monitor.']});
  T('f-escath', {tr: ['Özofagus balon kateteri', 'Ucuna yakın balonu olan, derinlik işaretli kateterdir; balon özofagusun alt üçte birine yerleştirilir ve konumu doğrulanır.'], en: ['Esophageal balloon catheter', 'Catheter with depth markings and a balloon near its tip; the balloon is placed in the lower third of the esophagus and its position is verified.'], es: ['Catéter esofágico con balón', 'Catéter con marcas de profundidad y un balón cerca de la punta; el balón se coloca en el tercio inferior del esófago y se verifica su posición.']});
  T('f-balloon', {tr: ['Balon', 'Üreticinin belirttiği küçük hacimde hava ile doldurulan, basıncı kateter boyunca ileten ince duvarlı balondur.'], en: ['Balloon', 'Thin-walled balloon filled with the small air volume specified by the manufacturer that transmits pressure along the catheter.'], es: ['Balón', 'Balón de pared fina que se llena con el pequeño volumen de aire indicado por el fabricante y transmite la presión a lo largo del catéter.']});
  T('f-stopcock', {tr: ['Üç yollu musluk ve şırınga', 'Balonun şişirilmesi ve basınç hattının monitöre bağlanması için kullanılır.'], en: ['Three-way stopcock and syringe', 'Used to inflate the balloon and connect the pressure line to the monitor.'], es: ['Llave de tres vías y jeringa', 'Se usan para inflar el balón y conectar la línea de presión al monitor.']});

  /* ---------- Kurucu: f-unit ----------
     Gövde + ekran (ön yüzde ya da üstte ayrı panel) + düğme/tuş/LED/tutamak + çıkış portları + montaj.
     cfg: {w,h,d, body, r, mount:'cart'|'pole'|'feet'|'none', elev, cartW, cartD, screen: spec|draw(g,W,H,t),
           scr:{w,h,x,y,tilt, on:'face'|'top', bez, neck}, knob:[x,y], keys:{n,x,y,dx,col}, led:[x,y,z]|false,
           handle:'top'|'none', label, labelAt:[x,y], ports:[{x,y,r,col,key}], extra(g, ctx)} */
  DEV3D.register('f-unit', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const w = cfg.w || .3, h = cfg.h || .2, d = cfg.d || .2;
    const elev = cfg.elev ?? (cfg.mount === 'cart' ? .9 : cfg.mount === 'pole' ? 1 : .015);
    const body = new THREE.Group(); body.position.y = elev + h / 2; g.add(body);
    body.add(rbox(w, h, d, cfg.r ?? Math.min(.025, d * .2), M.plastic(cfg.body ?? 0xE9EEF1, cfg.rough ?? .45)));
    /* Ekran */
    const s = cfg.scr || {}, sw = s.w || w * .8, sh = s.h || h * .6;
    let panel = body, scrGrp;
    if (s.on === 'top') {
      const neck = s.neck ?? .05, pw = sw + .04, ph = sh + .045;
      panel = new THREE.Group(); put(body, panel, s.x || 0, h / 2 + neck + ph / 2, s.z ?? d * .05, -(s.tilt || 0));
      panel.add(rbox(pw, ph, .045, .012, M.plastic(s.panelColor ?? cfg.body ?? 0xE9EEF1)));
      put(body, rbox(.06, neck + .02, .04, .01, M.matte(0x5B6670)), s.x || 0, h / 2 + neck / 2, s.z ?? d * .05);
      scrGrp = fDisplay(panel, sw, sh, cfg.screen, 0, s.y || .005, .0225, 0, screens, s.bez);
    } else {
      scrGrp = fDisplay(body, sw, sh, cfg.screen, s.x || 0, s.y || h * .1, d / 2 + Math.sin(Math.abs(s.tilt || 0)) * sh / 2, -(s.tilt || 0), screens, s.bez); /* eğik ekran gövdeye gömülmesin */
    }
    parts.push({key: 'screen', at: W(scrGrp, 0, 0, .012)});
    /* Düğme ve tuşlar (panel yüzeyinde) */
    const kp = cfg.knobOn === 'body' ? body : panel, face = kp === panel && s.on === 'top' ? .0225 : d / 2;
    if (cfg.knob) { const kn = cyl(.02, .021, .016, M.matte(0x2B3238), 32); kn.rotation.x = Math.PI / 2; put(kp, kn, cfg.knob[0], cfg.knob[1], face + .008); put(kp, torus(.0205, .002, M.led(0x4FD1BE), 32), cfg.knob[0], cfg.knob[1], face + .002); parts.push({key: 'knob', at: W(kp, cfg.knob[0], cfg.knob[1], face + .02)}); }
    if (cfg.keys) { const k = cfg.keys; for (let i = 0; i < k.n; i++) put(kp, rbox(.022, .012, .006, .003, M.matte(i === 0 ? (k.col ?? 0x2E9E58) : 0x5B6670)), k.x + i * (k.dx || .03), k.y, face + .002); parts.push({key: 'keypad', at: W(kp, k.x + (k.n - 1) * (k.dx || .03) / 2, k.y, face + .012)}); }
    if (cfg.led !== false) { const L = cfg.led || [w * .3, h / 2, 0]; const lp = s.on === 'top' && !cfg.led ? panel : body; const lx = lp === panel ? sw * .3 : L[0], ly = lp === panel ? (sh + .045) / 2 : L[1]; put(lp, box(.07, .006, .01, M.led(0xF2C531)), lx, ly, lp === panel ? 0 : L[2]); parts.push({key: 'alarm', at: W(lp, lx, ly + .006, 0)}); }
    if (cfg.label) { const lb = nameplate(cfg.label, .1, .014, cfg.labelInk || '#2B3238'); const [lx, ly] = cfg.labelAt || [-w / 2 + .07, -h / 2 + .02]; put(body, lb, lx, ly, d / 2 + .0015); }
    if (cfg.handle === 'top') { const hd = tube([[-w * .3, h / 2 - .005, -d * .1], [-w * .3, h / 2 + .04, -d * .1], [w * .3, h / 2 + .04, -d * .1], [w * .3, h / 2 - .005, -d * .1]], .009, M.matte(cfg.handleColor ?? 0x3A4148)); body.add(hd); parts.push({key: 'handle', at: W(body, 0, h / 2 + .045, -d * .1)}); }
    /* Çıkış portları (ön yüz) */
    const portsW = (cfg.ports || []).map(p => {
      const pr = cyl(p.r || .011, (p.r || .011) * 1.15, .03, M.color(p.col ?? 0xC9D0D5, .4), 24); pr.rotation.x = Math.PI / 2; put(body, pr, p.x, p.y, d / 2 + .015);
      put(body, cyl((p.r || .011) * 1.6, (p.r || .011) * 1.6, .004, M.matte(0x37424B), 24), p.x, p.y, d / 2 + .002, Math.PI / 2);
      const at = W(body, p.x, p.y, d / 2 + .03); if (p.key) parts.push({key: p.key, at: at.clone().add(V3(0, .015, 0))}); return at;
    });
    /* Montaj */
    if (cfg.mount === 'cart') { fCart(g, cfg.cartW || w + .16, cfg.cartD || d + .22, elev - .125, cfg.cartColor); parts.push({key: 'mount', at: V3(cfg.cartW ? cfg.cartW / 2 - .05 : w / 2, .12, (cfg.cartD || d + .22) / 2)}); }
    else if (cfg.mount === 'pole') { pole(g, 0, -d / 2 - .03, elev + h * .8, parts, V3(0, elev * .5, -d / 2 - .03)); put(g, box(.05, .05, .05, M.matte(0x3A4148)), 0, elev + h * .4, -d / 2 - .015); }
    else if (cfg.mount === 'feet') { [-1, 1].forEach(k => put(g, box(.03, elev, d * .8, M.rubber()), k * w * .36, elev / 2, 0)); }
    if (cfg.extra) cfg.extra(g, {body, panel, w, h, d, elev, parts, screens, portsW, W});
    return {group: g, parts, screens};
  });

  /* ---------- Jenerik ekran yerleşimi yardımcıları (DEV3D layout panelleri üretir) ----------
     Fotoğrafı olmayan cihaz sınıfları için marka taklidi yapmayan, sınıfına özgü tipik bir arayüz. */
  /* Üst durum çubuğu: mod kutusu, alt başlık, ortada mesaj alanı, sağda zil/pil/saat */
  function fTop(mode, sub, msg, o = {}) {
    const h = o.h || .075, mc = o.mc || '#E0A82E', mw = o.mw || .13;
    return [
      {t: 'box', x: 0, y: 0, w: 1, h, fill: o.bg || '#1A2530'},
      {t: 'box', x: .008, y: h * .12, w: mw, h: h * .76, fill: mc, r: .012},
      {t: 'text', txt: mode, x: .008, y: h * .12, w: mw, h: h * .76, s: h * .5, c: o.mt || '#10161B', wt: 800, al: 'c'},
      {t: 'text', txt: sub, x: .016 + mw, y: 0, w: .2, h, s: h * .42, c: '#C9D3DA', wt: 600},
      msg ? {t: 'box', x: o.mx || .36, y: h * .14, w: o.mww || .34, h: h * .72, fill: o.mf || '#24323E', r: .012} : null,
      msg ? {t: 'text', txt: msg, x: o.mx || .36, y: h * .14, w: o.mww || .34, h: h * .72, s: h * .4, c: o.mc2 || '#9FB0BC', wt: 600, al: 'c'} : null,
      {t: 'icon', g: 'bell', x: .75, y: h * .15, w: .04, h: h * .7, c: '#9FB0BC'},
      {t: 'icon', g: 'battery', x: .8, y: h * .15, w: .05, h: h * .7, c: o.bc || '#5FCB72'},
      {t: 'text', txt: o.time || '08:42', x: .88, y: 0, w: .115, h, s: h * .46, c: '#E6EEF2', wt: 600, al: 'r', mono: true}
    ].filter(Boolean);
  }
  /* Dalga paneli: zemin + ızgara + etiket + ölçek */
  function fWave(k, c, l, x, y, w, h, o = {}) {
    return [
      {t: 'box', x, y, w, h, fill: o.fill || '#0F1A23'},
      k === 'vol' ? {t: 'text', txt: l, x, y: y + h * .04, w: w * .5, h: h * .2, s: o.ls || Math.min(.034, h * .16), c, wt: 700, pad: .006} :
        {t: 'wave', k, c, l, x, y, w, h, grid: 'rgba(255,255,255,.07)', mid: o.mid, amp: o.amp, span: o.span, fillUnder: o.fillUnder, ls: o.ls || Math.min(.034, h * .16)},
      o.hi ? {t: 'text', txt: o.hi, x: x + w - .05, y: y + h * .02, w: .048, h: h * .2, s: Math.min(.03, h * .17), c: '#6F8796', wt: 500, al: 'r', pad: 0} : null,
      o.lo ? {t: 'text', txt: o.lo, x: x + w - .05, y: y + h * .78, w: .048, h: h * .2, s: Math.min(.03, h * .17), c: '#6F8796', wt: 500, al: 'r', pad: 0} : null
    ].filter(Boolean);
  }
  /* Hacim eğrisi ('vol' paneli için draw içinde çağrılır): Paw ile aynı zamanlama, inspiryumda doğrusal artış, ekspiryumda üstel boşalma */
  function fVol(g, t, W, H, x, y, w, h, c) {
    const X0 = x * W, Wp = w * W;
    g.strokeStyle = 'rgba(255,255,255,.07)'; g.lineWidth = 1; for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(X0, (y + h * k / 4) * H); g.lineTo(X0 + Wp, (y + h * k / 4) * H); g.stroke(); }
    g.strokeStyle = c; g.lineWidth = Math.max(1.5, .0045 * H); g.beginPath();
    for (let k = 0; k <= Wp; k += 2) { const ph = (k / Wp * 3.2 + t * .25) % 1, v = ph < .35 ? ph / .35 : Math.exp(-(ph - .35) * 9), yy = (y + h * (.88 - v * .66)) * H; k ? g.lineTo(X0 + k, yy) : g.moveTo(X0 + k, yy); }
    g.stroke();
  }
  /* Ölçülen değer kutusu */
  const fNum = (l, v, u, c, x, y, w, h, o = {}) => ({t: 'tile', style: 'plain', l, v, u, c, x, y, w, h, fill: o.fill || '#111D27', stroke: o.stroke || '#1E2C38', r: .012, live: o.live, vs: o.vs, ls: o.ls, al: o.al});
  /* Ayar tuşları sırası: [[etiket, değer, birim]] */
  function fKeys(list, y, h, o = {}) {
    const x0 = o.x0 ?? .008, x1 = o.x1 ?? .992, gap = o.gap ?? .006, n = list.length, w = (x1 - x0 - gap * (n - 1)) / n;
    return list.flatMap(([l, v, u, hl], i) => {
      const x = x0 + i * (w + gap);
      return [
        {t: 'box', x, y, w, h, fill: hl ? (o.hf || '#E0A82E') : (o.fill || '#22303C'), stroke: o.stroke, r: .015},
        {t: 'text', txt: l, x, y: y + h * .04, w, h: h * .3, s: h * .22, c: hl ? '#10161B' : (o.lc || '#9FB0BC'), wt: 600, al: 'c'},
        {t: 'text', txt: v, x, y: y + h * .32, w, h: h * .42, s: h * .38, c: hl ? '#10161B' : (o.vc || '#FFFFFF'), wt: 800, al: 'c'},
        u ? {t: 'text', txt: u, x, y: y + h * .74, w, h: h * .22, s: h * .17, c: hl ? '#33404A' : '#7F909C', wt: 500, al: 'c'} : null
      ].filter(Boolean);
    });
  }

  /* ---------- Yapılandırmalar ---------- */
  /* YB ventilatörü ekranı (jenerik): üst durum çubuğu, solda Paw/akım/hacim eğrileri, sağda ölçülen değerler,
     altta ayar tuşları sırası — YB ventilatörlerinde yaygın düzen; belirli bir markayı taklit etmez */
  const VENT_SCREEN = {bg: '#0B141C', layout: [
    ...fTop('VC-AC', 'Adult · ETT', 'No active alarms', {h: .07}),
    ...fWave('paw', '#F2C531', 'Paw  cmH₂O', .008, .082, .727, .238, {mid: .82, amp: .72, hi: '40', lo: '0'}),
    ...fWave('flow', '#4FD1BE', 'Flow  L/min', .008, .326, .727, .238, {mid: .52, amp: .42, hi: '60', lo: '-60'}),
    ...fWave('vol', '#7FA8FF', 'Volume  mL', .008, .57, .727, .238, {hi: '600', lo: '0'}),
    fNum('VTe', 452, 'mL', '#4FD1BE', .742, .082, .25, .2, {live: true}),
    fNum('Ppeak', 24, 'cmH₂O', '#F2C531', .742, .29, .122, .168, {live: true}),
    fNum('Pplat', '19', 'cmH₂O', '#F2C531', .87, .29, .122, .168),
    fNum('PEEP', '8', 'cmH₂O', '#F2C531', .742, .465, .122, .168),
    fNum('RR', 16, '/min', '#E6EEF2', .87, .465, .122, .168, {live: true}),
    fNum('Cstat', '42', 'mL/cmH₂O', '#8AA8FF', .742, .64, .122, .168),
    fNum('MVe', '7.2', 'L/min', '#4FD1BE', .87, .64, .122, .168),
    ...fKeys([['VT', '450', 'mL'], ['RR', '16', '/min'], ['PEEP', '8', 'cmH₂O'], ['FiO₂', '40', '%'], ['Ti', '1.0', 's'], ['Trigger', '2.0', 'L/min']], .83, .16, {x1: .9}),
    {t: 'button', x: .908, y: .83, w: .084, h: .16, g: 'gear', c: '#C9D3DA', fill: '#22303C', r: .015}
  ], draw: (g, t, {W, H}) => fVol(g, t, W, H, .008, .57, .727, .238, '#7FA8FF')};

  /* YB ventilatörü: arabada gövde + üstte büyük ekran, nemlendirici, devre tutucu kol, çift kollu devre */
  DEV3D.model('icu-ventilator', {
    type: 'f-unit', w: .38, h: .26, d: .3, body: 0xE2E7EA, mount: 'cart', elev: .82, cartW: .56, cartD: .56,
    scr: {on: 'top', w: .36, h: .25, tilt: .18, neck: .05, z: .02}, screen: VENT_SCREEN,
    knobOn: 'body', knob: [.13, .04], keys: {n: 3, x: .06, y: -.075, dx: .032}, led: false,
    ports: [{x: -.12, y: -.06, key: 'f-insp', col: 0xD5DCE0}, {x: -.04, y: -.06, key: 'f-exp', col: 0x7FA6C9}],
    extra(g, {body, w, h, d, elev, parts, portsW}) {
      const yB = elev + h / 2;
      /* Panel üstü alarm ışığı */
      put(g, box(.09, .01, .02, M.led(0xF2C531)), 0, elev + h + .05 + .3 + .02, -.01); parts.push({key: 'alarm', at: V3(0, elev + h + .38, 0)});
      /* Nemlendirici: kolonun solunda, rayda */
      const hx = -.2, hy = .52, hz = .05;
      put(g, box(.12, .03, .04, M.metal()), -.1, hy - .02, hz - .06);
      put(g, rbox(.11, .07, .12, .015, M.plastic(0xF1F3F4)), hx, hy, hz);
      put(g, box(.06, .02, .002, M.led(0x4FD1BE)), hx, hy, hz + .061);
      put(g, cyl(.05, .05, .09, M.clear(0xD8E8EE, .45), 32), hx, hy + .08, hz);
      put(g, cyl(.047, .047, .035, M.color(0x8FC3DD, .2), 32), hx, hy + .055, hz);
      put(g, cyl(.052, .052, .012, M.plastic(0x5B88B5), 32), hx, hy + .13, hz);
      parts.push({key: 'f-humid', at: V3(hx, hy + .09, hz + .06)});
      /* Devre tutucu kol (gövdenin sağından) */
      const a0 = V3(w / 2 + .01, yB - .02, 0), a1 = V3(w / 2 + .08, yB + .12, .12), a2 = V3(w / 2 + .02, yB + .2, .36);
      g.add(tube([a0, a0.clone().add(V3(.04, .02, 0)), a1], .009, M.metal(0xB8C0C6), 24, 12));
      put(g, sphere(.016, M.matte(0x3A4148)), a1.x, a1.y, a1.z);
      g.add(tube([a1, a1.clone().add(V3(0, .06, .08)), a2], .008, M.metal(0xB8C0C6), 24, 12));
      put(g, torus(.018, .005, M.matte(0x3A4148)), a2.x, a2.y - .02, a2.z, 0, 0, 0);
      parts.push({key: 'f-arm', at: a1.clone().add(V3(0, .03, 0))});
      /* Y parçası (kolun ucunda asılı) */
      const Y = V3(a2.x - .02, a2.y - .07, a2.z + .02), yp = fYpiece(); yp.position.copy(Y); g.add(yp);
      put(g, cyl(.012, .012, .03, M.plastic(0xF2F5F7), 20), Y.x, Y.y - .05, Y.z);
      parts.push({key: 'f-ypiece', at: Y.clone().add(V3(0, -.02, .03))});
      /* İnspiratuvar: port → nemlendirici → Y; ekspiratuvar: Y → port */
      const pi = portsW[0], pe = portsW[1];
      g.add(corrugated([pi, pi.clone().add(V3(0, -.04, .06)), V3(-.16, hy + .25, .14), V3(hx + .02, hy + .14, hz + .02)], .011, M.clear(0xC9DCE6, .75)));
      g.add(corrugated([V3(hx - .03, hy + .135, hz + .02), V3(-.3, hy + .25, .25), V3(-.1, yB - .1, .5), V3(Y.x - .03, Y.y + .01, Y.z)], .011, M.plastic(0x6E9BC6)));
      g.add(corrugated([pe, pe.clone().add(V3(0, -.04, .08)), V3(.0, yB - .18, .38), V3(.12, yB - .06, .5), V3(Y.x + .03, Y.y + .01, Y.z)], .011, M.clear(0xE6EEF2, .8)));
      parts.push({key: 'f-circuit', at: V3(-.1, yB - .08, .48)});
    }
  });

  /* Tek kollu devre ucu: ekshalasyon valfi + proksimal akım sensörü; iki ince hat cihaza döner */
  function fSingleEnd(g, from, end, lineTo, parts) {
    g.add(corrugated([from, from.clone().add(V3(0, 0, .06)), V3((from.x + end.x) / 2, Math.min(from.y, end.y) - .03, (from.z + end.z) / 2 + .03), end], .011, M.clear(0xD8E6EC, .8)));
    const v = new THREE.Group(); v.position.copy(end); g.add(v);
    put(v, cyl(.016, .016, .035, M.plastic(0x5B88B5), 24), 0, 0, .018, Math.PI / 2);
    put(v, cyl(.022, .022, .012, M.plastic(0x5B88B5), 24), .0, .012, .012);
    put(v, cyl(.012, .012, .03, M.clear(0xE6F1F5, .7), 20), 0, 0, .05, Math.PI / 2);
    [-.006, .006].forEach((dx, i) => g.add(tube([V3(end.x + dx, end.y + .012, end.z + .05), V3(end.x + dx, end.y + .05, end.z + .02), V3((end.x + lineTo[i].x) / 2, end.y + .04, (end.z + lineTo[i].z) / 2 + .04), lineTo[i]], .0022, M.plastic(i ? 0xE6F1F5 : 0x7FA6C9), 40, 8)));
    parts.push({key: 'f-exhvalve', at: end.clone().add(V3(0, .03, .03))});
  }
  /* Yan gaz girişi: yeşil oksijen hortumu */
  function fO2Inlet(g, at, dir, parts) {
    put(g, cyl(.009, .009, .025, M.metal(), 16), at.x + dir * .012, at.y, at.z, 0, 0, Math.PI / 2);
    g.add(tube([at.clone().add(V3(dir * .025, 0, 0)), at.clone().add(V3(dir * .08, -.02, 0)), at.clone().add(V3(dir * .12, -at.y + .03, -.05)), V3(at.x + dir * .25, .008, at.z - .12)], .006, M.plastic(0x2E9E58)));
    parts.push({key: 'f-o2', at: at.clone().add(V3(dir * .03, .02, 0))});
  }

  /* Transport ventilatörü: kompakt, taşıma kulplu, tek kollu devre */
  DEV3D.model('transport-ventilator', {
    type: 'f-unit', w: .27, h: .2, d: .17, body: 0x3E4A54, rough: .55, mount: 'feet', elev: .015, handle: 'top', handleColor: 0x2B3238,
    scr: {w: .15, h: .11, x: -.045, y: .025, bez: 0x11171B}, knob: [.085, .03], keys: {n: 4, x: -.11, y: -.065, dx: .03, col: 0xD94A3A},
    led: [.085, .1, 0],
    /* Jenerik transport ventilatörü ekranı: büyük yazılı az öğe — mod/pil çubuğu, iki eğri, dört ölçüm, dört ayar tuşu */
    screen: {bg: '#0B141C', layout: [
      ...fTop('PC-SIMV', 'Adult', null, {h: .1, mw: .22}),
      ...fWave('paw', '#F2C531', 'Paw', .008, .115, .59, .31, {mid: .82, amp: .72, hi: '40', lo: '0', ls: .05}),
      ...fWave('flow', '#4FD1BE', 'Flow', .008, .435, .59, .31, {mid: .52, amp: .42, hi: '60', lo: '-60', ls: .05}),
      fNum('VTe', 420, 'mL', '#4FD1BE', .606, .115, .19, .31, {live: true, vs: .125}),
      fNum('RR', '14', '/min', '#E6EEF2', .802, .115, .19, .31, {vs: .125}),
      fNum('PEEP', '6', 'cmH₂O', '#F2C531', .606, .435, .19, .31, {vs: .125}),
      fNum('Ppeak', 22, 'cmH₂O', '#F2C531', .802, .435, .19, .31, {live: true, vs: .125}),
      ...fKeys([['Pinsp', '16', 'cmH₂O'], ['RR', '14', '/min'], ['PEEP', '6', 'cmH₂O'], ['FiO₂', '60', '%']], .76, .23)
    ]},
    ports: [{x: .085, y: -.055, r: .01, key: 'f-insp', col: 0xD5DCE0}],
    extra(g, {w, h, d, elev, parts, portsW}) {
      put(g, box(w * .96, .006, .004, M.color(0xF2C531)), 0, elev + h - .012, d / 2 + .001);
      const p = portsW[0], end = V3(.2, .05, .28);
      fSingleEnd(g, p, end, [V3(.04, elev + .045, d / 2 + .004), V3(.055, elev + .045, d / 2 + .004)], parts);
      [.04, .055].forEach(x => put(g, cyl(.004, .004, .01, M.metal(), 10), x, elev + .045, d / 2 + .004, Math.PI / 2));
      parts.push({key: 'f-single', at: V3((p.x + end.x) / 2, .06, (p.z + end.z) / 2 + .02)});
      fO2Inlet(g, V3(-w / 2, elev + h * .35, -.02), -1, parts);
    }
  });

  /* NIV / CPAP / BiPAP: masaüstü ünite, eğik ekran, tek kollu devre ve oronazal maske */
  DEV3D.model('niv-cpap-bipap', {
    type: 'f-unit', w: .27, h: .17, d: .24, body: 0xF1F3F4, mount: 'feet', elev: .012, r: .03,
    scr: {w: .16, h: .1, x: -.035, y: .02, tilt: .12}, knob: [.09, .025], keys: {n: 2, x: .075, y: -.05, dx: .032, col: 0x2F7DD1},
    led: [.09, .085, .02], ports: [{x: .09, y: -.05, r: .012, col: 0xC9D0D5}],
    /* Jenerik NIV ekranı: mod çubuğu, basınç ve akım eğrisi, sağda kaçak (büyük) ve solunum değerleri, altta IPAP/EPAP ayarları */
    screen: {bg: '#0C1822', layout: [
      ...fTop('S/T', 'Mask · Adult', null, {h: .1, mw: .12, mc: '#5BB7DE'}),
      ...fWave('paw', '#F2C531', 'Pressure  cmH₂O', .008, .115, .632, .29, {mid: .82, amp: .72, hi: '20', lo: '0'}),
      ...fWave('flow', '#5BB7DE', 'Flow  L/min', .008, .413, .632, .29, {mid: .52, amp: .42, hi: '100', lo: '-100'}),
      fNum('Leak', 24, 'L/min', '#8FD18F', .648, .115, .344, .19, {live: true}),
      fNum('VTe', 480, 'mL', '#5BB7DE', .648, .313, .169, .19, {live: true}),
      fNum('RR', 18, '/min', '#E6EEF2', .823, .313, .169, .19, {live: true}),
      fNum('MVe', '8.6', 'L/min', '#5BB7DE', .648, .511, .169, .19),
      fNum('PS', '8', 'cmH₂O', '#F2C531', .823, .511, .169, .19),
      ...fKeys([['IPAP', '14', 'cmH₂O'], ['EPAP', '6', 'cmH₂O'], ['Rate', '12', '/min'], ['Ti', '1.0', 's'], ['O₂', '40', '%']], .72, .27, {vc: '#F2C531'})
    ]},
    extra(g, {w, h, d, elev, parts, portsW}) {
      put(g, box(w * .98, .012, d * .6, M.matte(0x9AA5AD)), 0, elev + .006, -.02);
      const p = portsW[0], mk = fMask(), mpos = V3(.05, .052, .36);
      mk.position.copy(mpos); mk.rotation.set(-Math.PI / 2, 0, .4); g.add(mk);
      const top = mpos.clone().add(V3(0, .075, 0));
      g.add(corrugated([p, p.clone().add(V3(.02, 0, .08)), V3(.2, .05, .3), V3(.15, .14, .42), top.clone().add(V3(0, .04, 0)), top], .011, M.clear(0xD8E6EC, .8)));
      parts.push({key: 'f-single', at: V3(.2, .08, .32)}, {key: 'f-mask', at: mpos.clone().add(V3(-.04, .03, .02))});
      fO2Inlet(g, V3(-w / 2, elev + h * .3, -.05), -1, parts);
    }
  });

  /* HFNC ekranı (üretici görselindeki düzen): sol üstte mavi tedavi başlığı, sağ üstte gri STOP düğmesi; altında turuncu
     sıcaklık, mavi akım ve daha yukarıdan başlayan yeşil FiO₂ karosu; sol altta durum metni, sağ altta güç/pil simgesi */
  const HFNC_SCREEN = {bg: '#000000', layout: [
    {t: 'box', x: .615, y: .03, w: .37, h: .14, fill: '#8F9498', r: .012},
    {t: 'text', txt: 'STOP', x: .65, y: .03, w: .2, h: .14, s: .07, c: '#FFFFFF', wt: 700},
    {t: 'box', x: .015, y: .155, w: .59, h: .12, fill: '#2F64A8', r: .012},
    {t: 'text', txt: 'High Flow', x: .03, y: .155, w: .4, h: .12, s: .068, c: '#FFFFFF', wt: 700},
    {t: 'box', x: .615, y: .175, w: .37, h: .54, fill: '#4FAA58', r: .016},
    {t: 'text', txt: '% FiO₂', x: .615, y: .47, w: .37, h: .08, s: .058, c: '#FFFFFF', wt: 700, al: 'c'},
    {t: 'box', x: .64, y: .6, w: .32, h: .004, fill: 'rgba(255,255,255,.35)'},
    {t: 'text', txt: 'O₂ 21–100 %', x: .615, y: .62, w: .37, h: .08, s: .045, c: 'rgba(255,255,255,.8)', wt: 600, al: 'c'},
    {t: 'box', x: .315, y: .285, w: .29, h: .555, fill: '#4A86C6', r: .016},
    {t: 'text', txt: 'L/min', x: .315, y: .6, w: .29, h: .08, s: .058, c: '#FFFFFF', wt: 700, al: 'c'},
    {t: 'box', x: .335, y: .72, w: .25, h: .004, fill: 'rgba(255,255,255,.3)'},
    {t: 'box', x: .015, y: .285, w: .29, h: .575, fill: '#F07A1E', r: .016},
    {t: 'text', txt: '°C', x: .015, y: .64, w: .29, h: .08, s: .058, c: '#FFFFFF', wt: 700, al: 'c'},
    {t: 'text', txt: '100%', x: .9, y: .74, w: .09, h: .07, s: .04, c: '#FFFFFF', wt: 700, al: 'r', pad: 0},
    {t: 'text', txt: 'Therapy on', x: .01, y: .88, w: .4, h: .1, s: .06, c: '#E6EAED', wt: 600}
  ], draw(g, t, {W, H, F}) {
    const X = f => f * W, Y = f => f * H;
    /* Büyük değerler: dar (condensed) rakamlar */
    [['40', .8, .34], [String(60 + (Math.sin(t * .5) > .98 ? 1 : 0)), .46, .47], ['37', .16, .5]].forEach(([v, cx, cy]) => {
      g.save(); g.translate(X(cx), Y(cy)); g.scale(.7, 1); g.fillStyle = '#FFFFFF'; g.font = F(800, .34); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(v, 0, 0); g.restore();
    });
    /* STOP düğmesindeki beyaz daire ve kare */
    g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(X(.925), Y(.1), Y(.045), 0, 7); g.fill(); g.fillStyle = '#8F9498'; g.fillRect(X(.925) - Y(.016), Y(.1) - Y(.016), Y(.032), Y(.032));
    /* Başlıktaki aşağı ok */
    g.strokeStyle = '#FFFFFF'; g.lineWidth = Y(.008); g.beginPath(); g.moveTo(X(.555), Y(.2)); g.lineTo(X(.57), Y(.225)); g.lineTo(X(.585), Y(.2)); g.stroke();
    /* Fiş ve yeşil pil */
    g.strokeStyle = '#FFFFFF'; g.lineWidth = Y(.006); g.beginPath(); g.arc(X(.845), Y(.765), Y(.014), 0, Math.PI); g.moveTo(X(.845), Y(.78)); g.lineTo(X(.845), Y(.805)); g.moveTo(X(.838), Y(.765)); g.lineTo(X(.838), Y(.745)); g.moveTo(X(.852), Y(.765)); g.lineTo(X(.852), Y(.745)); g.stroke();
    g.strokeStyle = '#4FAA58'; g.strokeRect(X(.865), Y(.745), X(.022), Y(.06)); g.fillStyle = '#4FAA58'; g.fillRect(X(.869), Y(.755), X(.014), Y(.044)); g.fillRect(X(.871), Y(.737), X(.01), Y(.008));
  }};
  /* HFNC: koyu gövde direkte, yan su haznesi, su torbası, ısıtmalı tüp ve nazal kanül */
  DEV3D.model('hfnc', {
    type: 'f-unit', w: .22, h: .3, d: .21, body: 0x3A4148, rough: .6, r: .045, mount: 'pole', elev: .62, theta: .35, handle: 'top', handleColor: 0xC9D0D5,
    scr: {w: .15, h: .11, x: 0, y: .055, tilt: .2, bez: 0x15191C}, screen: HFNC_SCREEN, led: false,
    keys: {n: 3, x: -.04, y: -.03, dx: .04, col: 0x5B6670},
    extra(g, {body, w, h, d, elev, parts, W}) {
      /* Su haznesi (sol yan, alt) */
      const cx = -w / 2 - .028, cy = elev + .085, cz = .02;
      put(g, rbox(.055, .1, .13, .012, M.clear(0xD8E8EE, .5)), cx, cy, cz);
      put(g, rbox(.05, .045, .124, .01, M.color(0x8FC3DD, .2)), cx, cy - .025, cz);
      put(g, rbox(.058, .016, .134, .006, M.plastic(0xE9EEF1)), cx, cy + .055, cz);
      parts.push({key: 'f-chamber', at: V3(cx - .03, cy, cz + .03)});
      /* Su torbası (direğin üstünde) */
      const px = 0, pz = -d / 2 - .03, top = elev + h * .8;
      put(g, cyl(.008, .008, .3, M.metal()), px, top + .15, pz);
      put(g, torus(.012, .003, M.metal()), px, top + .305, pz + .012, Math.PI / 2);
      put(g, rbox(.11, .17, .025, .01, M.clear(0xE6F1F5, .55)), px - .07, top + .21, pz + .02);
      put(g, rbox(.1, .1, .018, .008, M.color(0xCFE6F0, .3)), px - .07, top + .17, pz + .02);
      g.add(tube([V3(px - .07, top + .125, pz + .02), V3(px - .1, top + .02, pz + .05), V3(cx - .01, elev + h * .5, cz - .02), V3(cx, cy + .065, cz - .03)], .0025, M.clear(0xD8E6EC, .8), 48, 8));
      parts.push({key: 'f-waterbag', at: V3(px - .07, top + .24, pz + .04)});
      /* Isıtmalı tüp: üst sağ çıkıştan kanüle */
      const o = W(body, w / 2 - .035, h / 2 - .01, .04);
      put(g, cyl(.016, .016, .03, M.matte(0x2B3238), 24), o.x, o.y + .012, o.z);
      const cn = fCannula(), cp = V3(.3, elev + .02, .36); cn.position.copy(cp); cn.rotation.y = -.5; g.add(cn);
      g.add(corrugated([o.clone().add(V3(0, .025, 0)), o.clone().add(V3(.03, .12, .04)), V3(.2, elev + .02, .16), V3(.3, elev - .25, .3), V3(.33, elev - .1, .38), cp.clone().add(V3(.008, -.012, .03))], .01, M.plastic(0xA9B4BB, .5)));
      parts.push({key: 'f-heated', at: V3(.3, elev + .05, .26)}, {key: 'f-cannula', at: cp.clone().add(V3(0, .03, 0))});
    }
  });

  /* Jet ventilatör: arabada ünite, jet hattı ve basınç hattı ile kafsız jet kateteri */
  DEV3D.model('jet-ventilator', {
    type: 'f-unit', w: .36, h: .22, d: .3, body: 0xE4E9EC, mount: 'cart', elev: .66, cartW: .5, cartD: .5,
    scr: {w: .22, h: .14, x: -.05, y: .03, tilt: 0}, knob: [.12, .04], keys: {n: 4, x: -.14, y: -.08, dx: .03},
    led: [.12, .11, .02], ports: [{x: .09, y: -.06, r: .007, col: 0xF2C531, key: 'f-jetline'}, {x: .135, y: -.06, r: .006, col: 0x2F7DD1}],
    /* Jenerik jet ventilatör ekranı: solda yüksek frekanslı hava yolu basıncı eğrisi (PIP sınırı ve pause basıncı çizgileriyle),
       altında ölçülen basınçlar; sağda sürücü basınç, frekans, Ti ve FiO₂ ayarları; altta alarm sınırı tuşları */
    screen: {bg: '#0B141C', layout: [
      ...fTop('HFJV', 'Jet · Adult', 'Running', {h: .09, mf: '#1D3A2A', mc2: '#7FE08F'}),
      {t: 'box', x: .008, y: .105, w: .652, h: .52, fill: '#0F1A23'},
      {t: 'text', txt: 'Paw  cmH₂O', x: .008, y: .115, w: .3, h: .06, s: .045, c: '#F2C531', wt: 700},
      {t: 'text', txt: 'PIP limit 25', x: .45, y: .175, w: .2, h: .05, s: .036, c: '#F07A6A', wt: 600, al: 'r'},
      {t: 'text', txt: '30', x: .6, y: .115, w: .055, h: .05, s: .032, c: '#6F8796', wt: 500, al: 'r', pad: 0},
      {t: 'text', txt: '0', x: .6, y: .57, w: .055, h: .05, s: .032, c: '#6F8796', wt: 500, al: 'r', pad: 0},
      fNum('PIP', 17, 'cmH₂O', '#F2C531', .008, .64, .213, .185, {live: true}),
      fNum('Ppause', 11, 'cmH₂O', '#4FD1BE', .227, .64, .213, .185, {live: true}),
      fNum('MAP', '13', 'cmH₂O', '#E6EEF2', .446, .64, .214, .185),
      fNum('DP', '1.8', 'bar', '#F2C531', .668, .105, .324, .2),
      fNum('f', '150', '/min', '#E6EEF2', .668, .315, .324, .165),
      fNum('Ti', '40', '%', '#E6EEF2', .668, .49, .158, .165),
      fNum('FiO₂', '50', '%', '#8FD18F', .834, .49, .158, .165),
      fNum('Humid.', '2', 'level', '#5BB7DE', .668, .665, .324, .16),
      ...fKeys([['PIP limit', '25', 'cmH₂O'], ['Ppause limit', '20', 'cmH₂O'], ['Alarm', '5', 'vol']], .84, .15, {x1: .82}),
      {t: 'button', x: .828, y: .84, w: .164, h: .15, g: 'pause', txt: 'Pause', c: '#E6EEF2', fill: '#22303C', r: .015, s: .045}
    ], draw(g, t, {W, H}) {
      /* Jet basınç eğrisi: ~150/dk kısa basınç tepeleri, ortalama basınç üzerinde */
      const x0 = .015 * W, x1 = .64 * W, yb = .6 * H, sc = .44 * H / 30, P = v => yb - v * sc;
      g.setLineDash([6, 5]); g.lineWidth = 1.5; g.strokeStyle = '#F07A6A'; g.beginPath(); g.moveTo(x0, P(25)); g.lineTo(x1, P(25)); g.stroke();
      g.strokeStyle = '#4FD1BE'; g.beginPath(); g.moveTo(x0, P(11)); g.lineTo(x1, P(11)); g.stroke(); g.setLineDash([]);
      g.strokeStyle = 'rgba(255,255,255,.07)'; g.lineWidth = 1; [5, 10, 15, 20].forEach(v => { g.beginPath(); g.moveTo(x0, P(v)); g.lineTo(x1, P(v)); g.stroke(); });
      g.strokeStyle = '#F2C531'; g.lineWidth = Math.max(1.5, .005 * H); g.beginPath();
      for (let x = 0; x <= x1 - x0; x += 2) {
        const u = x / (x1 - x0) * 14 + t * 2.5, ph = u % 1, pulse = ph < .4 ? Math.sin(ph / .4 * Math.PI) : 0;
        const v = 9.5 + 7.5 * Math.pow(pulse, 1.4) + .6 * Math.sin(u * .9);
        x ? g.lineTo(x0 + x, P(v)) : g.moveTo(x0 + x, P(v));
      }
      g.stroke();
    }},
    extra(g, {w, h, d, elev, parts, portsW}) {
      const [pj, pp] = portsW, hub = V3(.24, elev - .12, .45);
      g.add(tube([pj, pj.clone().add(V3(0, -.02, .06)), V3(.2, elev - .1, .3), hub], .0032, M.plastic(0xF2C531, .4), 48, 8));
      g.add(tube([pp, pp.clone().add(V3(0, -.03, .05)), V3(.25, elev - .08, .32), hub.clone().add(V3(.008, .004, 0))], .0024, M.clear(0xD8E6EC, .85), 48, 8));
      put(g, cyl(.007, .006, .03, M.plastic(0x2F7DD1), 16), hub.x, hub.y, hub.z + .012, Math.PI / 2);
      const tip = V3(hub.x + .03, hub.y - .14, hub.z + .2);
      g.add(tube([hub.clone().add(V3(0, 0, .025)), hub.clone().add(V3(.01, -.02, .08)), V3(tip.x, tip.y + .08, tip.z - .06), tip], .0028, M.clear(0xEAF2F5, .9), 40, 8));
      for (let k = 1; k < 4; k++) { const q = hub.clone().lerp(tip, .35 + k * .12); put(g, cyl(.0034, .0034, .004, M.matte(0x1B2328), 12), q.x, q.y, q.z, -.8); }
      parts.push({key: 'f-pline', at: V3(.25, elev - .07, .32)}, {key: 'f-jetcath', at: tip.clone().add(V3(0, .05, -.03))});
      fO2Inlet(g, V3(-w / 2, elev + h * .3, -.06), -1, parts);
    }
  });

  /* Hava yolu bölümü (x ekseni boyunca): devre tarafı körük + adaptör + hasta tarafı 15 mm konnektör */
  function fAirway(g, at, adapter) {
    const s = new THREE.Group(); s.position.copy(at); g.add(s);
    s.add(corrugated([[-.16, -.02, -.04], [-.1, 0, -.01], [-.04, 0, 0]], .011, M.clear(0xD8E6EC, .8)));
    const a = adapter || fAdapter(); s.add(a);
    put(s, cyl(.0085, .0085, .03, M.plastic(0xF2F5F7), 20), .04, 0, 0, 0, 0, Math.PI / 2);
    return s;
  }
  /* Örnekleme hattı: from → adaptör ucu */
  const fLine = (g, pts, col = 0xD8E6EC, r = .0018) => g.add(tube(pts, r, M.plastic(col, .3), 64, 8));

  /* Kapnograf: küçük yan akım monitörü, su tutucu, örnekleme hattı, hava yolu adaptörü */
  DEV3D.model('capnograph', {
    type: 'f-unit', w: .22, h: .14, d: .12, body: 0xEDF0F2, mount: 'feet', elev: .012, handle: 'top',
    scr: {w: .145, h: .09, x: -.025, y: .016}, keys: {n: 3, x: -.08, y: -.053, dx: .03}, knob: [.083, .02], led: [.083, .07, .02],
    /* Jenerik yan akım kapnograf ekranı: büyük kapnogram, sağda büyük EtCO₂, altında RR ve FiCO₂; en altta gövde tuşlarına denk gelen etiketler */
    screen: {bg: '#0A1218', layout: [
      ...fTop('CO₂', 'Sidestream', null, {h: .11, mw: .1, mc: '#F2C531'}),
      ...fWave('capno', '#F2C531', 'CO₂  mmHg', .008, .125, .612, .705, {mid: .716, amp: .68, fillUnder: true, hi: '50', lo: '0', ls: .05}),
      fNum('EtCO₂', 38, 'mmHg', '#F2C531', .628, .125, .364, .4, {live: true, vs: .24, ls: .06}),
      fNum('RR', '14', '/min', '#E6EEF2', .628, .535, .179, .295, {vs: .14}),
      fNum('FiCO₂', '0', 'mmHg', '#8AA8FF', .813, .535, .179, .295, {vs: .14}),
      ...[['Menu', .03], ['Alarms', .245], ['Zero', .46]].flatMap(([txt, x]) => [{t: 'button', txt, x, y: .855, w: .18, h: .12, c: '#C9D3DA', fill: '#1C2833', r: .02, s: .05}]),
      {t: 'text', txt: 'Pump 50 mL/min', x: .64, y: .855, w: .35, h: .12, s: .045, c: '#6F8796', wt: 500, al: 'r'}
    ]},
    extra(g, {w, h, d, elev, parts}) {
      const wt = fWaterTrap(); wt.position.set(-w / 2 - .017, elev + .045, .02); wt.rotation.y = -Math.PI / 2; g.add(wt);
      parts.push({key: 'f-trap', at: V3(-w / 2 - .035, elev + .05, .03)});
      const ad = V3(.05, .06, .26); fAirway(g, ad); parts.push({key: 'f-adapter', at: ad.clone().add(V3(0, .025, 0))});
      fLine(g, [V3(-w / 2 - .02, elev + .073, .035), V3(-w / 2 - .05, elev + .1, .1), V3(-.05, .03, .26), V3(ad.x, ad.y + .05, ad.z), V3(ad.x, ad.y + .02, ad.z)]);
      parts.push({key: 'f-sline', at: V3(-.07, .06, .22)});
      put(g, cyl(.004, .004, .012, M.metal(), 10), w / 2 + .006, elev + .03, -.03, 0, 0, Math.PI / 2);
      parts.push({key: 'f-exhaust', at: V3(w / 2 + .015, elev + .04, -.03)});
    }
  });

  /* Multigaz analizörü: gaz modülü kutusu üstünde ekran, ön su tutucu, örnekleme hattı ve egzoz */
  DEV3D.model('multigas-analyzer', {
    type: 'f-unit', w: .3, h: .1, d: .26, body: 0xC9D0D5, mount: 'feet', elev: .012, r: .012, led: false,
    scr: {on: 'top', w: .27, h: .17, tilt: .1, neck: .03, z: 0}, keys: {n: 3, x: .03, y: -.03, dx: .03}, knobOn: 'body', knob: [.12, .0],
    /* Jenerik multigaz ekranı: CO₂ ve O₂ eğrileri, ajan (sevofluran) eğilimi; sağda gaz başına Fi/Et tablosu (ajan rengi kodlu),
       altta yaşa göre düzeltilmiş MAC çubuğu */
    screen: {bg: '#0A1218', layout: [
      ...fTop('GAS', 'Adult', 'Agent ID: SEV', {h: .085, mc: '#F2E94F', mww: .26, mx: .4}),
      ...fWave('capno', '#D5DCE0', 'CO₂  mmHg', .008, .1, .59, .265, {mid: .8, amp: .62, hi: '50', lo: '0'}),
      ...fWave('resp', '#8FD18F', 'O₂  %', .008, .37, .59, .22, {mid: .62, amp: .4, hi: '60', lo: '30'}),
      {t: 'box', x: .008, y: .595, w: .59, h: .24, fill: '#0F1A23'},
      {t: 'text', txt: 'SEV  %  ·  30 min', x: .008, y: .6, w: .3, h: .05, s: .034, c: '#F2E94F', wt: 700},
      {t: 'trend', x: .01, y: .65, w: .58, h: .18, max: 4, yt: [0, 2, 4], lc: '#6F8796', lines: [{c: '#F2E94F', base: 2.1, amp: .15, seed: 2}, {c: '#B8B05A', base: 1.8, amp: .2, seed: 4}]},
      {t: 'box', x: .606, y: .1, w: .386, h: .735, fill: '#0F1A23', stroke: '#1E2C38', r: .01},
      {t: 'text', txt: 'Fi', x: .72, y: .105, w: .13, h: .06, s: .04, c: '#9FB0BC', wt: 600, al: 'r'},
      {t: 'text', txt: 'Et', x: .855, y: .105, w: .13, h: .06, s: .04, c: '#9FB0BC', wt: 600, al: 'r'},
      ...[['CO₂', 'mmHg', '0', '36', '#D5DCE0', .17, .17], ['O₂', '%', '50', '45', '#8FD18F', .345, .15], ['N₂O', '%', '0', '0', '#5BA4E6', .5, .13], ['SEV', '%', '2.1', '1.8', '#F2E94F', .635, .19]].flatMap(([l, u, fi, et, c, y, h]) => [
        {t: 'box', x: .612, y: y + .01, w: .008, h: h - .02, fill: c},
        {t: 'text', txt: l, x: .625, y, w: .1, h: h * .55, s: .045, c, wt: 700},
        {t: 'text', txt: u, x: .625, y: y + h * .5, w: .1, h: h * .4, s: .03, c: '#7F909C', wt: 500},
        {t: 'text', txt: fi, x: .7, y, w: .15, h, s: h * .5, c, wt: 700, al: 'r'},
        {t: 'text', txt: et, x: .84, y, w: .145, h, s: h * .62, c, wt: 800, al: 'r'},
        {t: 'box', x: .62, y: y + h - .002, w: .365, h: .002, fill: '#1E2C38'}
      ]),
      {t: 'box', x: .008, y: .85, w: .984, h: .14, fill: '#111D27', r: .012},
      {t: 'text', txt: 'MAC', x: .02, y: .85, w: .1, h: .14, s: .05, c: '#4FD1BE', wt: 700},
      {t: 'text', txt: '0.9', x: .1, y: .85, w: .1, h: .14, s: .08, c: '#4FD1BE', wt: 800},
      {t: 'bar', x: .22, y: .9, w: .5, h: .04, v: .45, c: '#4FD1BE'},
      {t: 'text', txt: 'Age 45', x: .75, y: .85, w: .23, h: .14, s: .045, c: '#9FB0BC', wt: 600, al: 'r'}
    ]},
    extra(g, {body, w, h, d, elev, parts, panel}) {
      put(g, box(w * .96, .004, .002, M.color(0xF2E94F)), 0, elev + h - .012, d / 2 + .001);
      const wt = fWaterTrap(); wt.position.set(-w / 2 + .05, elev + .045, d / 2 + .013); wt.scale.set(1.1, 1, 1); g.add(wt);
      parts.push({key: 'f-trap', at: V3(-w / 2 + .05, elev + .06, d / 2 + .03)});
      const ad = V3(.02, .06, d / 2 + .2); fAirway(g, ad); parts.push({key: 'f-adapter', at: ad.clone().add(V3(0, .025, 0))});
      fLine(g, [V3(-w / 2 + .05, elev + .073, d / 2 + .028), V3(-w / 2 + .04, elev + .1, d / 2 + .08), V3(-.08, .03, d / 2 + .2), V3(ad.x, ad.y + .05, ad.z), V3(ad.x, ad.y + .02, ad.z)]);
      parts.push({key: 'f-sline', at: V3(-.1, .05, d / 2 + .15)});
      put(g, cyl(.005, .005, .014, M.metal(), 10), w / 2 + .007, elev + .04, .02, 0, 0, Math.PI / 2);
      fLine(g, [V3(w / 2 + .014, elev + .04, .02), V3(w / 2 + .06, elev + .03, .0), V3(w / 2 + .09, .006, -.12)], 0xB7C2C8, .0028);
      parts.push({key: 'f-exhaust', at: V3(w / 2 + .02, elev + .055, .02)});
    }
  });

  /* Akım sensörü (x ekseni): şeffaf gövde + üstte iki basınç ucu */
  function fFlowSensor() {
    const s = new THREE.Group();
    put(s, cyl(.011, .011, .06, M.clear(0xE6F1F5, .65), 20), 0, 0, 0, 0, 0, Math.PI / 2);
    put(s, cyl(.015, .015, .016, M.clear(0xD8E8EE, .6), 20), 0, 0, 0, 0, 0, Math.PI / 2);
    [-.016, .016].forEach(x => put(s, cyl(.0028, .0028, .016, M.plastic(0xF2F5F7), 10), x, .016, 0));
    return s;
  }
  /* Modül rafı (monitörün sağında): 3 yuva, ortadaki aktif modülde iki konektör; ön port konumlarını döndürür */
  function fRack(g, x, y0, z, label, parts) {
    const w = .045, h = .13, d = .15, fw = w * 3 + .02;
    put(g, rbox(fw, h + .02, d + .01, .006, M.matte(0x3A4148)), x, y0 + (h + .02) / 2, z - .006);
    const out = [];
    for (let k = 0; k < 3; k++) {
      const cx = x - fw / 2 + .01 + w * (k + .5);
      put(g, rbox(w - .003, h, d, .004, M.plastic(k === 1 ? 0xE9EEF1 : 0xC9D0D5)), cx, y0 + .01 + h / 2, z + .002);
      if (k === 1) {
        [.36, .22].forEach((f, i) => { put(g, cyl(.006, .006, .01, M.color(i ? 0xE9EEF1 : 0x2F7DD1, .4), 16), cx, y0 + .01 + h * f, z + d / 2 + .006, Math.PI / 2); out.push(V3(cx, y0 + .01 + h * f, z + d / 2 + .011)); });
        put(g, box(.01, .004, .002, M.led(0x2E9E58)), cx, y0 + .01 + h * .85, z + d / 2 + .003);
        const lab = nameplate(label, w * .9, .012); lab.rotation.z = Math.PI / 2; put(g, lab, cx, y0 + .01 + h * .6, z + d / 2 + .003);
        parts.push({key: 'module', at: V3(cx, y0 + h * .7, z + d / 2 + .01)});
      }
    }
    return out;
  }

  /* Spirometri modülü: monitörün yanında modül rafı, iki hatla Y parçasındaki akım sensörüne bağlı */
  DEV3D.model('spirometry-module', {
    type: 'f-unit', w: .32, h: .23, d: .1, body: 0xE9EEF1, mount: 'feet', elev: .012,
    scr: {w: .28, h: .17, x: 0, y: .015}, keys: {n: 5, x: -.1, y: -.095, dx: .035}, led: [.1, .115, 0],
    /* Jenerik monitör spirometri sayfası: solda Paw/akım/hacim eğrileri, ortada basınç–hacim ve akım–hacim halkaları,
       sağda mekanik değerler; altta gövde tuşlarına denk gelen yazılım tuşu etiketleri */
    screen: {bg: '#0A1218', layout: [
      ...fTop('SPIRO', 'Adult · Sensor at Y-piece', null, {h: .08, mc: '#4FD1BE', mw: .11}),
      ...fWave('paw', '#F2C531', 'Paw', .008, .093, .465, .24, {mid: .82, amp: .72, hi: '40', lo: '0'}),
      ...fWave('flow', '#4FD1BE', 'Flow', .008, .338, .465, .24, {mid: .52, amp: .42, hi: '60', lo: '-60'}),
      ...fWave('vol', '#7FA8FF', 'Volume', .008, .583, .465, .24, {hi: '600', lo: '0'}),
      {t: 'box', x: .479, y: .093, w: .258, h: .362, fill: '#0F1A23'},
      {t: 'text', txt: 'P–V', x: .479, y: .1, w: .1, h: .05, s: .036, c: '#F2C531', wt: 700},
      {t: 'box', x: .479, y: .461, w: .258, h: .362, fill: '#0F1A23'},
      {t: 'text', txt: 'F–V', x: .479, y: .468, w: .1, h: .05, s: .036, c: '#4FD1BE', wt: 700},
      fNum('VTe', 452, 'mL', '#4FD1BE', .743, .093, .122, .24, {live: true}),
      fNum('Ppeak', 23, 'cmH₂O', '#F2C531', .87, .093, .122, .24, {live: true}),
      fNum('Pplat', '18', 'cmH₂O', '#F2C531', .743, .338, .122, .24),
      fNum('PEEP', '6', 'cmH₂O', '#F2C531', .87, .338, .122, .24),
      fNum('Crs', '38', 'mL/cmH₂O', '#8AA8FF', .743, .583, .122, .24),
      fNum('Raw', '9', 'cmH₂O/L/s', '#E6EEF2', .87, .583, .122, .24),
      ...['Loops', 'Ref. loop', 'Trends', 'Sensor', 'Menu'].map((txt, i) => ({t: 'button', txt, x: .02 + i * .195, y: .85, w: .18, h: .12, c: '#C9D3DA', fill: '#1C2833', r: .02, s: .045}))
    ], draw(g, t, {W, H}) {
      fVol(g, t, W, H, .008, .583, .465, .24, '#7FA8FF');
      /* Basınç–hacim ve akım–hacim halkaları (eksenler + eğri) */
      const loop = (x, y, w, h, c, f, axY) => {
        g.strokeStyle = 'rgba(255,255,255,.3)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + h); g.moveTo(x, y + h * axY); g.lineTo(x + w, y + h * axY); g.stroke();
        g.strokeStyle = c; g.lineWidth = Math.max(1.5, .005 * H); g.beginPath();
        for (let k = 0; k <= 100; k++) { const [a, b] = f(k / 100); const X = x + a * w, Y = y + h * axY - b * h * axY; k ? g.lineTo(X, Y) : g.moveTo(X, Y); }
        g.stroke();
      };
      loop(.5 * W, .16 * H, .22 * W, .27 * H, '#F2C531', u => { if (u < .5) { const s = u / .5; return [.15 + .75 * s, Math.pow(s, 1.7) * .9]; } const s = (u - .5) / .5; return [.9 - .75 * Math.sqrt(s), .9 * Math.pow(1 - s, 1.4)]; }, 1);
      loop(.5 * W, .52 * H, .22 * W, .28 * H, '#4FD1BE', u => { if (u < .5) { const s = u / .5; return [.9 * s, .55 * Math.min(1, s * 8, (1 - s) * 8)]; } const s = (u - .5) / .5, v = .9 * (1 - s); return [v, -Math.min(1, s * 14) * (v / .9) * .9 - (s < .07 ? 0 : 0)]; }, .5);
    }},
    extra(g, {w, h, d, elev, parts}) {
      const pr = fRack(g, w / 2 + .1, elev, .03, 'SPIRO', parts);
      parts.push({key: 'port', at: pr[0].clone().add(V3(0, .01, .01))});
      const fs = fFlowSensor(), fp = V3(.12, .07, .33); fs.position.copy(fp); g.add(fs);
      const yp = fYpiece(); yp.rotation.z = Math.PI / 2; yp.position.set(fp.x - .055, fp.y, fp.z); g.add(yp);
      g.add(corrugated([[fp.x - .07, fp.y + .018, fp.z], [fp.x - .12, fp.y + .03, fp.z - .05], [fp.x - .22, .03, fp.z - .1]], .011, M.clear(0xD8E6EC, .8)));
      g.add(corrugated([[fp.x - .07, fp.y - .018, fp.z], [fp.x - .12, fp.y - .04, fp.z + .02], [fp.x - .22, .02, fp.z + .02]], .011, M.plastic(0x6E9BC6)));
      put(g, cyl(.0085, .0085, .03, M.plastic(0xF2F5F7), 20), fp.x + .045, fp.y, fp.z, 0, 0, Math.PI / 2);
      [-.016, .016].forEach((dx, i) => fLine(g, [V3(fp.x + dx, fp.y + .024, fp.z), V3(fp.x + dx, fp.y + .07, fp.z - .02), V3(pr[i].x - .02, elev + .08, pr[i].z + .1), pr[i].clone().add(V3(0, 0, .02)), pr[i]], i ? 0xE6F1F5 : 0x7FA6C9, .0022));
      parts.push({key: 'f-flow', at: fp.clone().add(V3(0, .035, 0))}, {key: 'f-ypiece', at: V3(fp.x - .06, fp.y + .03, fp.z + .02)});
    }
  });

  /* Volümetrik kapnogram ekranı (jenerik): CO₂ – ekshale hacim eğrisi (faz I–III, hava yolu ölü boşluğu çizgisi), sağda EtCO₂ ve
     ölü boşluk değerleri, altta zamana göre kapnogram şeridi */
  const VOLCAP_SCREEN = {bg: '#0A1218', layout: [
    ...fTop('VCO₂', 'Volumetric capnogram', null, {h: .085, mc: '#F2C531', mw: .11}),
    {t: 'box', x: .008, y: .1, w: .592, h: .73, fill: '#0F1A23'},
    {t: 'text', txt: 'PCO₂ mmHg', x: .015, y: .11, w: .2, h: .05, s: .034, c: '#9FB0BC', wt: 600},
    {t: 'text', txt: 'Vexp mL', x: .4, y: .77, w: .19, h: .05, s: .034, c: '#9FB0BC', wt: 600, al: 'r'},
    fNum('EtCO₂', '37', 'mmHg', '#F2C531', .608, .1, .384, .23, {vs: .14}),
    fNum('VD/VT', '0.31', 'Bohr', '#4FD1BE', .608, .337, .189, .243),
    fNum('VDaw', '142', 'mL', '#4FD1BE', .803, .337, .189, .243),
    fNum('VTalv', '318', 'mL', '#E6EEF2', .608, .587, .189, .243),
    fNum("V'CO₂", '186', 'mL/min', '#8AA8FF', .803, .587, .189, .243),
    ...fWave('capno', '#F2C531', 'CO₂ (time)', .008, .845, .984, .145, {mid: .66, amp: .5, span: 7, ls: .03})
  ], draw(g, t, {W, H, txt}) {
    const x0 = .05 * W, x1 = .58 * W, y0 = .17 * H, y1 = .76 * H;
    g.strokeStyle = '#6F8796'; g.lineWidth = 2; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0, y1); g.lineTo(x1, y1); g.stroke();
    const prog = Math.min(1, (t * .35) % 1.25), f = u => u < .18 ? 0 : u < .42 ? Math.pow((u - .18) / .24, 1.6) * .82 : .82 + (u - .42) * .22;
    /* Önceki solunumun soluk eğrisi + çizilmekte olan güncel eğri */
    g.strokeStyle = 'rgba(242,197,49,.35)'; g.lineWidth = Math.max(1.5, .004 * H); g.beginPath();
    for (let u = 0; u <= 1.001; u += .01) { const X = x0 + u * (x1 - x0), Y = y1 - f(u) * (y1 - y0); u ? g.lineTo(X, Y) : g.moveTo(X, Y); } g.stroke();
    g.fillStyle = 'rgba(242,197,49,.18)'; g.beginPath(); g.moveTo(x0, y1);
    for (let u = 0; u <= prog; u += .01) g.lineTo(x0 + u * (x1 - x0), y1 - f(u) * (y1 - y0)); g.lineTo(x0 + prog * (x1 - x0), y1); g.fill();
    g.strokeStyle = '#F2C531'; g.lineWidth = Math.max(2, .006 * H); g.beginPath();
    for (let u = 0; u <= prog; u += .01) { const X = x0 + u * (x1 - x0), Y = y1 - f(u) * (y1 - y0); u ? g.lineTo(X, Y) : g.moveTo(X, Y); } g.stroke();
    g.setLineDash([6, 6]); g.strokeStyle = '#4FD1BE'; g.lineWidth = 1.5; g.beginPath(); const xv = x0 + .3 * (x1 - x0); g.moveTo(xv, y0); g.lineTo(xv, y1); g.stroke(); g.setLineDash([]);
    txt('VDaw', xv + .01 * W, y0 + .03 * H, {c: '#4FD1BE', s: .034, wt: 600});
    ['I', 'II', 'III'].forEach((r, i) => txt(r, x0 + [.08, .3, .7][i] * (x1 - x0), y1 - .04 * H - [0, .25, .72][i] * (y1 - y0), {c: '#8FA3AE', s: .036, wt: 700}));
  }};
  /* Volümetrik kapnografi: monitör, ana akım CO₂ sensörü + birleşik akım sensörü Y parçasında */
  DEV3D.model('volumetric-capnography', {
    type: 'f-unit', w: .32, h: .22, d: .1, body: 0xE9EEF1, mount: 'feet', elev: .012, handle: 'top',
    scr: {w: .25, h: .155, x: -.022, y: .018}, keys: {n: 4, x: -.1, y: -.09, dx: .035}, knob: [.135, -.08], led: [.1, .11, 0],
    screen: VOLCAP_SCREEN, ports: [{x: .135, y: .04, r: .007, col: 0x5B6670}, {x: .135, y: -.01, r: .006, col: 0x2F7DD1}],
    extra(g, {w, h, d, elev, parts, portsW}) {
      const fp = V3(.06, .07, .3), fs = fFlowSensor(); fs.position.copy(fp); g.add(fs);
      /* Ana akım sensörü: adaptörün üstüne oturan kutu */
      const ap = V3(fp.x + .06, fp.y, fp.z), ad = fAdapter(); ad.position.copy(ap); g.add(ad);
      put(g, rbox(.03, .034, .028, .006, M.matte(0x2B3238)), ap.x, ap.y + .006, ap.z);
      put(g, box(.012, .004, .002, M.led(0x2E9E58)), ap.x, ap.y + .016, ap.z + .0145);
      put(g, cyl(.0085, .0085, .03, M.plastic(0xF2F5F7), 20), ap.x + .04, ap.y, ap.z, 0, 0, Math.PI / 2);
      const yp = fYpiece(); yp.rotation.z = Math.PI / 2; yp.position.set(fp.x - .055, fp.y, fp.z); g.add(yp);
      g.add(corrugated([[fp.x - .07, fp.y + .018, fp.z], [fp.x - .13, fp.y + .03, fp.z - .05], [fp.x - .24, .03, fp.z - .1]], .011, M.clear(0xD8E6EC, .8)));
      g.add(corrugated([[fp.x - .07, fp.y - .018, fp.z], [fp.x - .13, fp.y - .04, fp.z + .02], [fp.x - .24, .02, fp.z + .02]], .011, M.plastic(0x6E9BC6)));
      g.add(tube([V3(ap.x, ap.y + .023, ap.z - .01), V3(ap.x + .01, ap.y + .08, ap.z - .06), V3(.2, elev + .1, .14), portsW[0].clone().add(V3(0, 0, .03)), portsW[0]], .003, M.matte(0x2B3238), 64, 8));
      [-.016, .016].forEach((dx, i) => fLine(g, [V3(fp.x + dx, fp.y + .024, fp.z), V3(fp.x + dx, fp.y + .06, fp.z - .03), V3(.17, elev + .06, .14), portsW[1].clone().add(V3(0, 0, .03)), portsW[1]], i ? 0xE6F1F5 : 0x7FA6C9, .002));
      parts.push({key: 'f-main', at: ap.clone().add(V3(0, .035, 0))}, {key: 'f-flow', at: fp.clone().add(V3(0, .035, 0))}, {key: 'f-ypiece', at: V3(fp.x - .06, fp.y + .03, fp.z + .02)}, {key: 'port', at: portsW[0].clone().add(V3(.01, .01, 0))});
    }
  });

  /* Transkütan ekran: üretici görselindeki düzen — üstte gri durum çubuğu (çalışma süresi, sensör ısısı, simgeler, saat),
     solda dört satır eğilim (tcPCO₂, tcPO₂, SpO₂, PR) ve imleç etiketleri, sağda büyük renkli değerler ve sınırlar */
  const TC_ROWS = [['#2EE83A', '75', '25', .284, 0, '27.8', .235, '28.5', .243, ['55', '23'], 'PCO₂', 'mmHg', '+0.2'],
    ['#F39A1E', '150', '0', .44, 1, '74', .395, '78', .448, ['', ''], 'PO₂', 'mmHg', '+1'],
    ['#F02828', '100', '70', .592, 2, '98', .61, '99', .664, ['100', '85'], 'SpO₂', '%', '+0'],
    ['#FFFFFF', '140', '30', .872, 3, '62', .82, '66', .888, ['140', '50'], 'PR', 'bpm', '-2']];
  const TC_SCREEN = {bg: '#000000', layout: [
    {t: 'box', x: .003, y: .008, w: .994, h: .12, fill: '#2C3135', r: .02},
    {t: 'text', txt: '7.4 h', x: .06, y: .07, w: .05, h: .05, s: .042, c: '#E6EAED', wt: 500, al: 'c'},
    {t: 'text', txt: '42.0 °C', x: .14, y: .07, w: .06, h: .05, s: .042, c: '#E6EAED', wt: 500, al: 'c'},
    {t: 'icon', g: 'bell', x: .66, y: .025, w: .03, h: .085, c: '#E6EAED'},
    {t: 'icon', g: 'battery', x: .812, y: .03, w: .03, h: .075, c: '#E6EAED'},
    {t: 'text', txt: '13:13:58', x: .86, y: .012, w: .135, h: .11, s: .05, c: '#E6EAED', wt: 500, al: 'r'},
    ...TC_ROWS.flatMap(([c, hi, lo, , , , , v, vy, lim, l, u, dl], i) => {
      const r0 = [.16, .373, .586, .80][i], r1 = [.29, .504, .72, .92][i];
      return [
        {t: 'text', txt: hi, x: .03, y: r0 - .02, w: .05, h: .04, s: .04, c, wt: 500, al: 'r', pad: 0},
        {t: 'text', txt: lo, x: .03, y: r1 - .02, w: .05, h: .04, s: .04, c, wt: 500, al: 'r', pad: 0},
        {t: 'text', txt: v, x: .77, y: vy - .12, w: .168, h: .24, s: .225, c, wt: 700, al: 'r', pad: 0},
        {t: 'text', txt: lim[0], x: .966, y: r0 - .02, w: .03, h: .04, s: .03, c, wt: 500, pad: 0},
        {t: 'text', txt: lim[1], x: .966, y: r0 + .03, w: .03, h: .04, s: .03, c, wt: 500, pad: 0},
        {t: 'text', txt: l, x: .966, y: r0 + .085, w: .03, h: .04, s: .031, c, wt: 800, pad: 0},
        {t: 'text', txt: u, x: .966, y: r0 + .13, w: .03, h: .04, s: .028, c, wt: 500, pad: 0},
        {t: 'text', txt: 'Δ10', x: .74, y: vy + .01, w: .03, h: .04, s: .03, c, wt: 500, pad: 0},
        {t: 'text', txt: dl, x: .745, y: vy + .055, w: .03, h: .04, s: .03, c, wt: 500, pad: 0}
      ];
    }),
    {t: 'text', txt: '-30 min', x: .08, y: .94, w: .08, h: .05, s: .04, c: '#E6EAED', wt: 500, al: 'c'},
    {t: 'box', x: .158, y: .94, w: .068, h: .05, fill: '#FFFFFF', r: .008},
    {t: 'text', txt: '12:48:58', x: .158, y: .94, w: .068, h: .05, s: .036, c: '#000000', wt: 600, al: 'c'},
    {t: 'text', txt: '-20 min', x: .26, y: .94, w: .08, h: .05, s: .04, c: '#E6EAED', wt: 500, al: 'c'},
    {t: 'text', txt: '-10 min', x: .47, y: .94, w: .08, h: .05, s: .04, c: '#E6EAED', wt: 500, al: 'c'},
    {t: 'text', txt: '0 min', x: .67, y: .94, w: .06, h: .05, s: .04, c: '#E6EAED', wt: 500, al: 'c'}
  ], draw(g, t, {W, H, rr, txt, GL}) {
    const X = f => f * W, Y = f => f * H, x0 = X(.082), x1 = X(.722);
    /* Durum çubuğu simgeleri: yer imi, saat, ısı çizgisi, kişi, sensör, gaz tüpü, kamera */
    g.fillStyle = '#E6EAED'; g.beginPath(); g.moveTo(X(.013), Y(.03)); g.lineTo(X(.033), Y(.03)); g.lineTo(X(.033), Y(.11)); g.lineTo(X(.023), Y(.085)); g.lineTo(X(.013), Y(.11)); g.fill();
    g.beginPath(); g.arc(X(.086), Y(.04), Y(.016), 0, 7); g.fill();
    g.fillStyle = '#E8323C'; g.fillRect(X(.152), Y(.032), X(.036), Y(.012));
    g.fillStyle = '#E6EAED'; g.beginPath(); g.arc(X(.223), Y(.035), Y(.013), 0, 7); g.fill(); g.fillRect(X(.218), Y(.052), X(.01), Y(.055));
    g.strokeStyle = '#E6EAED'; g.lineWidth = 2; g.beginPath(); g.arc(X(.27), Y(.05), Y(.022), 0, 7); g.stroke(); g.beginPath(); g.moveTo(X(.27), Y(.075)); g.lineTo(X(.268), Y(.11)); g.stroke();
    g.strokeRect(X(.72), Y(.03), X(.009), Y(.08)); g.strokeRect(X(.762), Y(.035), X(.03), Y(.07)); g.beginPath(); g.arc(X(.777), Y(.07), Y(.018), 0, 7); g.stroke();
    /* Sayfa noktaları */
    [0, 1, 2, 3].forEach(k => { g.strokeStyle = k === 1 ? '#F39A1E' : '#8A949B'; g.beginPath(); g.arc(X(.5 + k * .015), Y(.15), Y(.008), 0, 7); g.stroke(); });
    /* Eğilim satırları: eksen, ayraç, çizgi */
    const seps = [.30, .52, .728, .933];
    g.lineWidth = 1.2;
    TC_ROWS.forEach(([c, , , ly, i, tag, ty], k) => {
      const r0 = [.16, .373, .586, .80][k];
      g.strokeStyle = '#B9C1C6'; g.beginPath(); g.moveTo(x0, Y(r0)); g.lineTo(x0, Y(seps[k])); g.lineTo(x1, Y(seps[k])); g.stroke();
      g.strokeStyle = c; g.lineWidth = 2; g.beginPath();
      for (let x = 0; x <= x1 - x0; x += 2) {
        const u = x / (x1 - x0), j = Math.sin(u * 517 + k * 9 + Math.floor(t * 2)) * Math.sin(u * 191 + k);
        let yy = ly + (k === 3 ? j * .009 + (u > .82 && u < .84 ? -.03 : 0) : k === 1 ? .01 * Math.sin(u * 9 + t * .1) + j * .006 : j * .002);
        if (k === 1 && u > .15 && u < .25) yy += .045 * Math.sin((u - .15) / .1 * Math.PI) * (u < .2 ? 1 : .6);
        if (k === 2 && u > .76 && u < .775) yy += .02;
        x ? g.lineTo(x0 + x, Y(yy)) : g.moveTo(x0 + x, Y(yy));
      }
      g.stroke(); g.lineWidth = 1.2;
      g.fillStyle = c; rr(X(.207), Y(ty), X(.04), Y(.058), Y(.008)); g.fill();
      txt(tag, X(.227), Y(ty + .029), {c: '#000', s: .04, wt: 600, al: 'c'});
    });
    /* İmleç ve bayrak */
    g.strokeStyle = '#C9D0D5'; g.beginPath(); g.moveTo(X(.19), Y(.14)); g.lineTo(X(.19), Y(.95)); g.stroke();
    g.fillStyle = '#3A4045'; rr(X(.2), Y(.14), X(.04), Y(.055), Y(.008)); g.fill(); txt('⚑ +', X(.22), Y(.168), {c: '#E6EAED', s: .035, al: 'c'});
    /* Sol ok ve PI çubuğu */
    g.strokeStyle = '#C9D0D5'; g.lineWidth = 2; g.beginPath(); g.moveTo(X(.018), Y(.53)); g.lineTo(X(.028), Y(.565)); g.lineTo(X(.018), Y(.6)); g.stroke();
    txt('0.6', X(.783), Y(.83), {c: '#F2E94F', s: .03, wt: 500, al: 'c'}); txt('PI', X(.783), Y(.865), {c: '#F2E94F', s: .028, wt: 600, al: 'c'});
    g.fillStyle = '#4A5056'; g.fillRect(X(.778), Y(.885), X(.01), Y(.075)); g.fillStyle = '#F2E94F'; g.fillRect(X(.778), Y(.935), X(.01), Y(.025));
  }};
  /* Transkütan CO₂/O₂ monitörü: beyaz gövde, geniş siyah ön panel, üst tutamak, yan kalibrasyon yuvası, sensör kablosu ve halka */
  DEV3D.model('transcutaneous-co2-o2', {
    type: 'f-unit', w: .3, h: .15, d: .17, body: 0xF4F6F7, mount: 'none', elev: .0, r: .03, led: false,
    scr: {w: .23, h: .088, x: 0, y: .006, bez: 0x0B0F12}, screen: TC_SCREEN,
    extra(g, {body, w, h, d, elev, parts, W}) {
      put(body, rbox(w * .98, h * .82, .01, .006, M.matte(0x0B0F12)), 0, .003, d / 2 - .002);
      put(body, box(w * .3, .01, .006, M.plastic(0xF4F6F7)), 0, -h / 2 + .012, d / 2 + .002);
      [-1, 1].forEach(k => put(g, box(.02, .012, d * .7, M.plastic(0xE4E8EB)), k * w * .4, -.006, 0));
      /* Üst tutamak (açık gri çubuk) */
      put(body, rbox(w * .55, .016, .04, .007, M.plastic(0xE4E8EB)), 0, h / 2 + .006, -.03);
      parts.push({key: 'handle', at: V3(0, h + .02, -.03)});
      /* Yan tuş ve kalibrasyon yuvası (sağ yan) */
      put(body, rbox(.008, .03, .015, .003, M.matte(0x1B2126)), w / 2 + .003, .02, d / 2 - .03);
      parts.push({key: 'keypad', at: W(body, w / 2 + .01, .02, d / 2 - .03)});
      put(body, rbox(.006, .07, .09, .01, M.plastic(0xE9EEF1)), w / 2 + .003, -.01, -.02);
      put(body, cyl(.016, .016, .004, M.matte(0x5B6670), 24), w / 2 + .007, -.01, -.02, 0, 0, Math.PI / 2);
      parts.push({key: 'f-tcdock', at: W(body, w / 2 + .015, -.01, -.02)});
      put(g, cyl(.022, .022, .12, M.metal(0xB8C0C6), 24), -w / 2 + .05, .06, -d / 2 - .03);
      put(g, cyl(.012, .016, .02, M.matte(0x2E9E58), 16), -w / 2 + .05, .13, -d / 2 - .03);
      /* Sensör kablosu ve halka üzerinde sensör */
      const sp = V3(.18, .006, .24), port = V3(w / 2 - .02, h * .25, d / 2 - .02);
      g.add(tube([port, port.clone().add(V3(.05, .02, .03)), V3(.24, .06, .15), V3(.22, .03, .22), sp.clone().add(V3(0, .018, -.025))], .0028, M.matte(0x8A949B), 64, 8));
      put(g, cyl(.017, .017, .002, M.plastic(0xF2F5F7), 32), sp.x, sp.y, sp.z);
      put(g, torus(.013, .0025, M.plastic(0x5BB7DE), 32), sp.x, sp.y + .003, sp.z, Math.PI / 2);
      put(g, cyl(.0105, .011, .012, M.matte(0x3A4148), 32), sp.x, sp.y + .009, sp.z);
      put(g, box(.008, .006, .016, M.matte(0x3A4148)), sp.x, sp.y + .012, sp.z - .016);
      parts.push({key: 'f-tcsensor', at: sp.clone().add(V3(0, .025, 0))}, {key: 'f-tcring', at: sp.clone().add(V3(.02, .006, .01))});
    }
  });

  /* EIT ekranı (jenerik): toraks kesitinde ventilasyon dağılımı haritası, bölgesel (ROI) yüzdeler, global ΔZ eğrisi,
     sağda GI / CoV / ΔEELI / RR, altta yazılım tuşları */
  const EIT_SCREEN = {bg: '#0A1218', layout: [
    ...fTop('EIT', 'Belt 16 el. · 5th ICS', null, {h: .08, mc: '#5BB7DE', mw: .09}),
    {t: 'box', x: .008, y: .093, w: .39, h: .51, fill: '#0F1A23'},
    {t: 'box', x: .404, y: .093, w: .196, h: .51, fill: '#0F1A23'},
    {t: 'text', txt: 'ROI %', x: .404, y: .1, w: .19, h: .06, s: .034, c: '#9FB0BC', wt: 600},
    ...[['1', 18], ['2', 34], ['3', 31], ['4', 17]].flatMap(([l, v], i) => [
      {t: 'text', txt: l, x: .408, y: .18 + i * .1, w: .03, h: .06, s: .034, c: '#9FB0BC', wt: 700, pad: 0},
      {t: 'bar', x: .438, y: .195 + i * .1, w: .11, h: .03, v: v / 40, c: '#5BB7DE'},
      {t: 'text', txt: String(v), x: .55, y: .18 + i * .1, w: .047, h: .06, s: .034, c: '#E6EEF2', wt: 700, al: 'r', pad: 0}
    ]),
    ...fWave('resp', '#E6EEF2', 'ΔZ global', .008, .61, .592, .225, {mid: .62, amp: .55}),
    fNum('GI', '0.48', '', '#5BB7DE', .608, .093, .384, .18),
    fNum('CoV', '52', '% (vent.)', '#E6EEF2', .608, .28, .384, .18),
    fNum('ΔEELI', '+3.1', 'AU', '#F2C531', .608, .467, .384, .18),
    fNum('RR', 16, '/min', '#8FD18F', .608, .654, .384, .18, {live: true}),
    ...['Image', 'Trend', 'PEEP step', 'Reference', 'Menu'].map((txt, i) => ({t: 'button', txt, x: .015 + i * .197, y: .855, w: .182, h: .12, c: '#C9D3DA', fill: '#1C2833', r: .02, s: .045}))
  ], draw(g, t, {W, H, txt}) {
    /* Toraks kesiti: koyu zemin üzerinde iki akciğer bölgesi, solunumla parlaklığı değişen ventilasyon haritası */
    const cx = .2 * W, cy = .355 * H, R = .2 * H, br = .55 + .45 * Math.sin(t * Math.PI * 2 * .25);
    g.save(); g.beginPath(); g.ellipse(cx, cy, R * 1.3, R, 0, 0, 7); g.fillStyle = '#0E1E3A'; g.fill(); g.clip();
    [-1, 1].forEach(sd => {
      for (let k = 6; k > 0; k--) {
        const f = k / 6, v = Math.min(1, br * (1.1 - f) * 1.6 + .1);
        g.fillStyle = `rgb(${Math.round(40 + 215 * v)},${Math.round(90 + 165 * v)},${Math.round(200 + 55 * v)})`;
        g.beginPath(); g.ellipse(cx + sd * R * .58, cy - R * .08 + (1 - f) * R * .15, R * .52 * f, R * .74 * f, 0, 0, 7); g.fill();
      }
    });
    g.restore();
    g.strokeStyle = '#6F8796'; g.lineWidth = 1; g.setLineDash([4, 4]); g.beginPath(); g.moveTo(cx - R * 1.3, cy); g.lineTo(cx + R * 1.3, cy); g.moveTo(cx, cy - R); g.lineTo(cx, cy + R); g.stroke(); g.setLineDash([]);
    txt('ANT', cx, cy - R - .025 * H, {c: '#8FA3AE', s: .03, al: 'c', wt: 600}); txt('R', cx - R * 1.3 - .015 * W, cy, {c: '#8FA3AE', s: .03, al: 'c', wt: 600}); txt('L', cx + R * 1.3 + .015 * W, cy, {c: '#8FA3AE', s: .03, al: 'c', wt: 600});
  }};
  /* EIT: arabada monitör, yerde elektrot kemeri, hasta kablosu */
  DEV3D.model('eit', {
    type: 'f-unit', w: .38, h: .27, d: .09, body: 0xE9EEF1, mount: 'cart', elev: .72, cartW: .46, cartD: .46,
    scr: {w: .32, h: .2, x: 0, y: .02}, keys: {n: 4, x: -.12, y: -.11, dx: .035}, knob: [.15, -.11], led: [.12, .135, 0],
    screen: EIT_SCREEN,
    extra(g, {w, h, d, elev, parts}) {
      put(g, rbox(.12, .1, .14, .012, M.plastic(0xD9E0E4)), 0, elev - .06, -.08);
      /* Elektrot kemeri: göğüs kesiti biçiminde, araba tabanında */
      const bc = V3(0, .14, .115), A = .16, B = .1, n = 16;
      const band = torus(1, .012, M.matte(0x37424B), 64); band.scale.set(A, B, 2.2); band.rotation.x = Math.PI / 2; band.position.copy(bc); g.add(band);
      for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2; put(g, cyl(.009, .009, .006, M.plastic(0xC9A227, .35), 16), bc.x + Math.cos(a) * A * .96, bc.y + .012, bc.z + Math.sin(a) * B * .96); }
      const cb = V3(bc.x + A + .015, bc.y + .005, bc.z); put(g, rbox(.04, .025, .05, .006, M.matte(0x2B3238)), cb.x, cb.y, cb.z);
      g.add(tube([cb.clone().add(V3(.02, .005, 0)), V3(cb.x + .06, bc.y + .04, cb.z - .03), V3(.24, .4, .06), V3(.21, elev - .05, .02), V3(w / 2 - .02, elev + .02, 0)], .005, M.matte(0x2B3238), 80, 10));
      put(g, sphere(.01, M.plastic(0xF2F5F7)), bc.x - A + .03, bc.y + .005, bc.z + .09);
      g.add(tube([V3(bc.x - A + .03, bc.y + .01, bc.z + .09), V3(bc.x - A, bc.y + .02, bc.z + .05), V3(bc.x - A, bc.y + .015, bc.z)], .0018, M.matte(0x2B3238), 24, 6));
      parts.push({key: 'f-belt', at: V3(bc.x, bc.y + .025, bc.z + B)}, {key: 'f-trunk', at: V3(.24, .4, .06)});
    }
  });

  /* Özofagus basıncı: monitör (Paw ve Pes eğrileri, PL), balon kateteri, üç yollu musluk ve şırınga */
  DEV3D.model('esophageal-pressure', {
    type: 'f-unit', w: .3, h: .2, d: .1, body: 0xE9EEF1, mount: 'feet', elev: .012,
    scr: {w: .24, h: .145, x: -.02, y: .018}, keys: {n: 4, x: -.1, y: -.08, dx: .035}, knob: [.125, -.07], led: [.1, .1, 0],
    ports: [{x: .125, y: .04, r: .006, col: 0x2F7DD1, key: 'port'}],
    /* Jenerik özofagus basıncı ekranı: Paw, Pes (kardiyak salınımlı) ve transpulmoner basınç (PL = Paw − Pes) eğrileri,
       sağda PL insp/exp ve Pes değerleri, altta tutma (hold) ve balon tuşları */
    screen: {bg: '#0A1218', layout: [
      ...fTop('Pes', 'Balloon 1.0 mL · 40 cm', 'Balloon OK', {h: .085, mc: '#5BB7DE', mw: .09, mx: .45, mww: .25, mf: '#1D3A2A', mc2: '#7FE08F'}),
      ...fWave('paw', '#F2C531', 'Paw  cmH₂O', .008, .1, .612, .24, {mid: .82, amp: .72, hi: '40', lo: '0'}),
      {t: 'box', x: .008, y: .345, w: .612, h: .24, fill: '#0F1A23'},
      {t: 'text', txt: 'Pes  cmH₂O', x: .008, y: .35, w: .3, h: .06, s: .034, c: '#5BB7DE', wt: 700},
      {t: 'box', x: .008, y: .59, w: .612, h: .24, fill: '#0F1A23'},
      {t: 'text', txt: 'PL  cmH₂O', x: .008, y: .595, w: .3, h: .06, s: .034, c: '#4FD1BE', wt: 700},
      fNum('PL insp', 12, 'cmH₂O', '#4FD1BE', .628, .1, .364, .23, {live: true, vs: .14}),
      fNum('PL exp', '1', 'cmH₂O', '#4FD1BE', .628, .337, .179, .243),
      fNum('Pes ee', '9', 'cmH₂O', '#5BB7DE', .813, .337, .179, .243),
      fNum('Paw pk', 26, 'cmH₂O', '#F2C531', .628, .587, .179, .243, {live: true}),
      fNum('Pes pk', '14', 'cmH₂O', '#5BB7DE', .813, .587, .179, .243),
      ...['Exp. hold', 'Insp. hold', 'Inflate', 'Zero', 'Menu'].map((txt, i) => ({t: 'button', txt, x: .015 + i * .197, y: .855, w: .182, h: .12, c: '#C9D3DA', fill: '#1C2833', r: .02, s: .045}))
    ], draw(g, t, {W, H, WAVE}) {
      /* Pes ve PL eğrileri Paw ile aynı solunum zamanlamasında; Pes'te kardiyak salınım */
      const x0 = .008 * W, w = .612 * W;
      [['#5BB7DE', .345, u => .35 + .3 * (WAVE.paw(u) - .3) + .05 * Math.sin(u * 2 * Math.PI * 4.3)], ['#4FD1BE', .59, u => .2 + .55 * (WAVE.paw(u) - .3)]].forEach(([c, y, f]) => {
        g.strokeStyle = 'rgba(255,255,255,.07)'; g.lineWidth = 1; for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(x0, (y + .24 * k / 4) * H); g.lineTo(x0 + w, (y + .24 * k / 4) * H); g.stroke(); }
        g.strokeStyle = c; g.lineWidth = Math.max(1.5, .0045 * H); g.beginPath();
        for (let k = 0; k <= w; k += 2) { const u = k / w * 3.2 + t * .25, yy = (y + .24 * (.88 - f(u) * .9)) * H; k ? g.lineTo(x0 + k, yy) : g.moveTo(x0 + k, yy); }
        g.stroke();
      });
    }},
    extra(g, {w, h, d, elev, parts, portsW}) {
      /* Musluk + şırınga + basınç hattı */
      const sc = V3(.24, .02, .16);
      put(g, cyl(.006, .006, .04, M.plastic(0x2F7DD1, .4), 16), sc.x, sc.y, sc.z, 0, 0, Math.PI / 2);
      put(g, cyl(.006, .006, .022, M.plastic(0xF2F5F7, .4), 16), sc.x, sc.y, sc.z + .01, Math.PI / 2);
      put(g, box(.026, .005, .008, M.plastic(0x2F7DD1)), sc.x, sc.y + .008, sc.z);
      const sy = cyl(.008, .008, .07, M.clear(0xE6F1F5, .6), 20); put(g, sy, sc.x, sc.y, sc.z + .055, Math.PI / 2);
      put(g, cyl(.003, .003, .03, M.plastic(0xF2F5F7), 10), sc.x, sc.y, sc.z + .1, Math.PI / 2);
      put(g, cyl(.011, .011, .003, M.plastic(0xF2F5F7), 16), sc.x, sc.y, sc.z + .116, Math.PI / 2);
      fLine(g, [portsW[0], portsW[0].clone().add(V3(.01, -.02, .04)), V3(sc.x + .05, .03, sc.z - .04), V3(sc.x + .02, sc.y, sc.z)], 0xE6F1F5, .0022);
      parts.push({key: 'f-stopcock', at: sc.clone().add(V3(0, .025, .03))});
      /* Kateter: musluktan kıvrılarak öne uzanır; uçta balon ve derinlik işaretleri */
      const pts = [V3(sc.x - .02, sc.y, sc.z), V3(.12, .008, .22), V3(-.05, .008, .2), V3(-.16, .008, .27), V3(-.06, .008, .36), V3(.12, .008, .34), V3(.24, .008, .4)];
      const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
      g.add(tube(pts, .0022, M.plastic(0xF4E9C8, .4), 120, 8));
      for (let k = 1; k < 8; k++) { const q = curve.getPointAt(.45 + k * .05); put(g, sphere(.0028, M.matte(0x1B2328), 8), q.x, q.y, q.z); }
      const b0 = curve.getPointAt(.97), b1 = pts[6], mid = b0.clone().lerp(b1, .2), dir = b1.clone().sub(b0).normalize();
      const bal = cyl(.007, .007, .07, M.clear(0xE6F1F5, .55), 20); bal.position.copy(mid.clone().add(dir.clone().multiplyScalar(.03))); bal.quaternion.setFromUnitVectors(V3(0, 1, 0), dir); g.add(bal);
      parts.push({key: 'f-escath', at: curve.getPointAt(.4).add(V3(0, .02, 0))}, {key: 'f-balloon', at: bal.position.clone().add(V3(0, .02, 0))});
    }
  });
})();
