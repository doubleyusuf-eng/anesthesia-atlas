/* Kaynak: İleri Monitörizasyon Atlası 3B cihaz sistemi; atlas core.js ile çakışmaması için K3 → WK3 olarak yeniden adlandırıldı. */
'use strict';
/* Cihaz yapılandırmaları D: anestezi iş istasyonları (Dräger, GE, Mindray, Getinge) ve genel anestezi ventilatörü.
   Tek parametrik kurucu 'd-workstation': tekerlekli şasi, çekmeceler, çalışma tablası, raylar, vaporizatörler, gaz kontrol alanı,
   solunum sistemi (APL, balon, CO₂ absorbanı, tek yönlü valfler, körüklü hortumlar, Y parça), ventilatör tahriki
   (şeffaf hazne içinde körük / gizli piston-türbin / hacim reflektörü), ventilatör ekranı, isteğe bağlı monitör, tüpler ve hortumlar. */
(() => {
  if (!DEV3D) return;
  const {V3, M, rbox, box, cyl, sphere, torus, lathe, tube, corrugated, put, decal, makeScreen} = DEV3D.H;
  const T = DEV3D.partText;

  /* ---------- Parça metinleri ---------- */
  T('d-base', {tr: ['Tekerlekli şasi', 'İş istasyonunun taşındığı tabandır; konumlandırma sonrası tekerlek frenleri kilitlenir.'], en: ['Wheeled base', 'The base the workstation moves on; the caster brakes are locked once it is positioned.'], es: ['Base con ruedas', 'Base sobre la que se desplaza la estación; los frenos de las ruedas se bloquean una vez colocada.']});
  T('d-drawer', {tr: ['Çekmeceler', 'Sarf malzemesi ve aksesuarların saklandığı bölmelerdir.'], en: ['Drawers', 'Compartments for storing consumables and accessories.'], es: ['Cajones', 'Compartimentos para guardar consumibles y accesorios.']});
  T('d-worktop', {tr: ['Çalışma tablası', 'İlaç ve hava yolu malzemelerini yerleştirmek ve kayıt tutmak için kullanılan yatay yüzeydir.'], en: ['Worktop', 'Horizontal surface used for drugs, airway equipment and charting.'], es: ['Superficie de trabajo', 'Superficie horizontal para fármacos, material de vía aérea y registros.']});
  T('d-rail', {tr: ['Aksesuar rayı', 'Standart raya aspiratör, monitör kolu gibi aksesuarlar takılır.'], en: ['Accessory rail', 'Accessories such as suction units or monitor arms attach to the standard rail.'], es: ['Riel de accesorios', 'En el riel estándar se fijan accesorios como aspiradores o brazos de monitor.']});
  T('d-vapor', {tr: ['Vaporizatörler', 'Uçucu anestezik ajanı taze gaz akımına ayarlanan konsantrasyonda katar; ajana özgü renk kodu ve dolum sistemi vardır. Aynı anda yalnızca bir vaporizatör açılabilir (kilit düzeneği).'], en: ['Vaporizers', 'Add the volatile anaesthetic agent to the fresh gas flow at the set concentration; each has an agent-specific colour code and filling system. Only one vaporizer can be on at a time (interlock).'], es: ['Vaporizadores', 'Añaden el agente anestésico volátil al flujo de gas fresco a la concentración ajustada; cada uno tiene un código de color y un sistema de llenado específicos del agente. Solo puede abrirse uno a la vez (bloqueo).']});
  T('d-gas', {tr: ['Taze gaz kontrolü', 'Oksijen, hava ve (varsa) nitröz oksit akımlarının ayarlandığı ve gösterildiği bölümdür. Mekanik akım ölçerler ya da elektronik karıştırıcı içerebilir.'], en: ['Fresh gas control', 'The section where oxygen, air and (if fitted) nitrous oxide flows are set and displayed. It may contain mechanical flowmeters or an electronic mixer.'], es: ['Control de gas fresco', 'Sección donde se ajustan y muestran los flujos de oxígeno, aire y (si existe) óxido nitroso. Puede incorporar caudalímetros mecánicos o un mezclador electrónico.']});
  T('d-flush', {tr: ['O₂ flush', 'Basıldığında vaporizatörü atlayarak solunum sistemine yüksek akımda oksijen verir.'], en: ['O₂ flush', 'When pressed, delivers a high flow of oxygen to the breathing system, bypassing the vaporizer.'], es: ['Flush de O₂', 'Al pulsarlo, suministra un flujo alto de oxígeno al sistema respiratorio, sin pasar por el vaporizador.']});
  T('d-apl', {tr: ['APL valfi', 'Ayarlanabilir basınç sınırlayıcı valf; manuel ventilasyonda devredeki basıncın üst sınırını belirler, fazla gazı atık gaz sistemine yönlendirir.'], en: ['APL valve', 'Adjustable pressure-limiting valve; during manual ventilation it sets the upper pressure limit in the circuit and vents excess gas to the scavenging system.'], es: ['Válvula APL', 'Válvula limitadora de presión ajustable; en ventilación manual fija el límite superior de presión del circuito y libera el gas sobrante al sistema de evacuación.']});
  T('d-bag', {tr: ['Rezervuar balon', 'Manuel ventilasyon ve spontan solunumun gözlenmesi için kullanılır; balon kolu üzerinde asılıdır.'], en: ['Reservoir bag', 'Used for manual ventilation and to observe spontaneous breathing; it hangs on the bag arm.'], es: ['Bolsa reservorio', 'Se usa para la ventilación manual y para observar la respiración espontánea; cuelga del brazo de la bolsa.']});
  T('d-absorber', {tr: ['CO₂ absorbanı', 'Döngü sistemindeki ekspire gazdan karbondioksiti tutan kanistirdir; tükendiğinde renk değiştirir ve değiştirilir.'], en: ['CO₂ absorber', 'Canister that removes carbon dioxide from exhaled gas in the circle system; it changes colour when exhausted and is replaced.'], es: ['Absorbedor de CO₂', 'Recipiente que retira el dióxido de carbono del gas espirado en el sistema circular; cambia de color al agotarse y se sustituye.']});
  T('d-valves', {tr: ['İnspiratuvar / ekspiratuvar portlar', 'Tek yönlü valfler gazın döngüde tek yönde akmasını sağlar; hasta hortumları bu portlara takılır.'], en: ['Inspiratory / expiratory ports', 'Unidirectional valves keep gas flowing one way around the circle; the patient limbs attach to these ports.'], es: ['Puertos inspiratorio / espiratorio', 'Las válvulas unidireccionales mantienen el gas circulando en un solo sentido; las ramas del paciente se conectan a estos puertos.']});
  T('d-ypiece', {tr: ['Hortumlar ve Y parça', 'İnspiratuvar ve ekspiratuvar hortumlar Y parçada birleşir; Y parça filtre/maske ya da hava yolu aracına bağlanır.'], en: ['Limbs and Y-piece', 'The inspiratory and expiratory limbs join at the Y-piece, which connects to a filter/mask or airway device.'], es: ['Tubuladuras y pieza en Y', 'Las ramas inspiratoria y espiratoria se unen en la pieza en Y, que se conecta a un filtro/mascarilla o dispositivo de vía aérea.']});
  T('d-bellows', {tr: ['Körük ve şeffaf hazne', 'Tahrik gazı şeffaf hazne içindeki körüğü sıkıştırır; körüğün içindeki gaz hastaya gider. Körüğün hareketi görsel olarak izlenebilir.'], en: ['Bellows in clear housing', 'Drive gas compresses the bellows inside the clear housing; the gas inside the bellows goes to the patient. Its movement can be watched.'], es: ['Fuelle en carcasa transparente', 'El gas motor comprime el fuelle dentro de la carcasa transparente; el gas del interior va al paciente. Su movimiento puede observarse.']});
  T('d-piston', {tr: ['Pistonlu ventilatör', 'Elektrik motoruyla sürülen piston solunum devresindeki gazı doğrudan iter; tahrik gazı kullanılmaz. Ünite gövde içindedir (şemada kesit olarak gösterilmiştir).'], en: ['Piston ventilator', 'A motor-driven piston pushes the gas in the breathing circuit directly; no drive gas is used. The unit sits inside the housing (shown here as a cutaway).'], es: ['Ventilador de pistón', 'Un pistón accionado por motor impulsa directamente el gas del circuito; no usa gas motor. La unidad está dentro de la carcasa (aquí en corte).']});
  T('d-turbine', {tr: ['Üfleyici (türbin) ventilatör', 'Elektrikle çalışan üfleyici solunum sistemindeki akımı ve basıncı oluşturur. Ünite gövde içindedir (şemada kesit olarak gösterilmiştir).'], en: ['Blower (turbine) ventilator', 'An electrically driven blower generates flow and pressure in the breathing system. The unit sits inside the housing (shown here as a cutaway).'], es: ['Ventilador de turbina', 'Una turbina eléctrica genera el flujo y la presión en el sistema respiratorio. La unidad está dentro de la carcasa (aquí en corte).']});
  T('d-reflector', {tr: ['Hacim reflektörü', 'Körük-şişe düzeninin yerini alır: ekspire gaz reflektörün bir ucuna girer, inspirasyonda kontrollü oksijen akımı bu gazı hastaya geri iter. Gövde içindedir (kesit).'], en: ['Volume reflector', 'Replaces the bag-in-bottle: exhaled gas enters one end of the reflector and, during inspiration, a controlled oxygen flow pushes it back to the patient. Inside the housing (cutaway).'], es: ['Reflector de volumen', 'Sustituye al fuelle en botella: el gas espirado entra por un extremo y, en la inspiración, un flujo controlado de oxígeno lo devuelve al paciente. Dentro de la carcasa (corte).']});
  T('d-exchanger', {tr: ['Hacim değiştirici', 'Solunum sisteminin parçasıdır; ventilatörün oluşturduğu hacmi solunum devresine aktarır. Ayrıntılar için kullanım kılavuzuna bakın.'], en: ['Volume exchanger', 'Part of the breathing system; it transfers the volume generated by the ventilator to the breathing circuit. See the user manual for details.'], es: ['Intercambiador de volumen', 'Forma parte del sistema respiratorio; transfiere el volumen generado por el ventilador al circuito. Consulte el manual de uso.']});
  T('d-vscreen', {tr: ['Ventilatör ekranı', 'Hava yolu basıncı, akım ve kapnogram eğrilerini; VT, RR, PEEP, Ppeak, FiO₂, EtCO₂ ve MAC değerlerini gösterir; ayarlar buradan yapılır. Değerler örnektir.'], en: ['Ventilator display', 'Shows airway pressure and flow waveforms, the capnogram, and VT, RR, PEEP, Ppeak, FiO₂, EtCO₂ and MAC values; settings are made here. Values are examples.'], es: ['Pantalla del ventilador', 'Muestra las curvas de presión y flujo, el capnograma y los valores de VT, FR, PEEP, Ppico, FiO₂, EtCO₂ y CAM; los ajustes se hacen aquí. Valores de ejemplo.']});
  T('d-monitor', {tr: ['Hasta monitörü', 'Kol üzerindeki ayrı monitör EKG, SpO₂, kan basıncı gibi hasta parametrelerini gösterir. Değerler örnektir.'], en: ['Patient monitor', 'A separate monitor on an arm shows patient parameters such as ECG, SpO₂ and blood pressure. Values are examples.'], es: ['Monitor de paciente', 'Un monitor separado en un brazo muestra parámetros como ECG, SpO₂ y presión arterial. Valores de ejemplo.']});
  T('d-cyl', {tr: ['Yedek gaz tüpleri', 'Merkezi gaz kesildiğinde kullanılan, arka bağlantılara takılı tüplerdir; basınçları kullanım öncesi kontrol edilir.'], en: ['Reserve cylinders', 'Cylinders on the rear yokes for use if the pipeline supply fails; their pressure is checked before use.'], es: ['Cilindros de reserva', 'Cilindros en los anclajes traseros para usar si falla el suministro central; su presión se comprueba antes del uso.']});
  T('d-pipe', {tr: ['Merkezi gaz hortumları', 'O₂, hava ve N₂O hortumları renk kodlu ve gaza özgü bağlantılarla duvar çıkışlarına takılır.'], en: ['Pipeline hoses', 'O₂, air and N₂O hoses connect to the wall outlets with colour-coded, gas-specific fittings.'], es: ['Mangueras de suministro central', 'Las mangueras de O₂, aire y N₂O se conectan a las tomas de pared con conectores específicos y código de color.']});
  T('d-gauge', {tr: ['Hava yolu basınç göstergesi', 'Solunum sistemindeki basıncı mekanik olarak gösterir.'], en: ['Airway pressure gauge', 'Shows the pressure in the breathing system mechanically.'], es: ['Manómetro de vía aérea', 'Muestra mecánicamente la presión del sistema respiratorio.']});
  T('d-pendant', {tr: ['Tavan askısı', 'Cihazı tavan askısının kol ve sütununa bağlar; bu yerleşimde tekerlekli şasi yoktur.'], en: ['Ceiling pendant', 'Attaches the unit to the arm and column of a ceiling pendant; this layout has no wheeled base.'], es: ['Brazo de techo', 'Une el equipo al brazo y la columna de un soporte de techo; esta disposición no tiene base con ruedas.']});
  T('d-agss', {tr: ['Atık gaz sistemi (AGSS)', 'APL valfi ve ventilatörden çıkan fazla gazı ameliyathane dışına uzaklaştırır; akım göstergesi sistemin çalıştığını gösterir.'], en: ['Scavenging (AGSS)', 'Carries excess gas from the APL valve and ventilator out of the operating room; the flow indicator shows it is working.'], es: ['Evacuación (AGSS)', 'Retira del quirófano el gas sobrante de la válvula APL y del ventilador; el indicador de flujo muestra que funciona.']});

  /* ---------- Kurucu ---------- */
  /* cfg: {w,d, top (tabla yüksekliği), towerH, towerD, towerW (oran), cabW (oran), drawers, colors:{body,trim,base,drawer,dark,panel,bs},
          gas:{kind:'tubes'|'electronic', x, y, tubes}, vapor:{n, kind:'mech'|'elec', agents:['sevo','des','iso'], x},
          bs:{side:'left'|'front', drive:'bellows'|'piston'|'turbine'|'reflector'|'exchanger', x,y,z}, bag, limb, absorber,
          screen:{at:'arm-left'|'top'|'tower', w,h,x,y,z, tilt, spec}, monitor:{w,h,x,y}|null, cyl:n, pipes:n, agss:bool, extra(g, ctx),
          sections:{base, cabinet, worktop, tower, gas, vapor, bs, screen, monitors}} — isteğe bağlı bölüm değiştiricileri: verilen bölüm
          genel çizim yerine fn(ctx) ile çizilir (ctx: ölçüler, renkler, P, parts, screens; screen fn {sx,sy,sz} döndürür). Verilmeyen bölümler aynen kalır. */
  const AG = {sevo: 0xF2C531, des: 0x2F7DD1, iso: 0x9B4AA8, hal: 0xD9443A};
  DEV3D.register('d-workstation', cfg => {
    const g = new THREE.Group(), parts = [], screens = [];
    const W = cfg.w || .78, D = cfg.d || .7, TY = cfg.top || .86, TH = cfg.towerH || .5, TD = cfg.towerD || .36;
    const C = Object.assign({body: 0xEEF1F3, trim: 0xD9DFE3, base: 0x8E979E, drawer: 0xF4F6F7, dark: 0x3A4148, panel: 0xE3E8EB, bs: 0xDDE3E7}, cfg.colors || {});
    const P = (key, x, y, z) => parts.push({key, at: V3(x, y, z)});
    const OV = cfg.sections || {}, ctx = {g, parts, screens, cfg, C, P, W, D, TY, TH, TD};
    /* Şasi ve tekerlekler */
    const bw = W * (cfg.baseW || 1.04), bd = D * (cfg.baseD || .98), pend = cfg.mount === 'pendant', cr = cfg.casterR || .045;
    if (OV.base) OV.base(ctx);
    else if (!pend) {
      if (cfg.baseStyle === 'h') {
        [-1, 1].forEach(s => put(g, rbox(.09, .06, bd, .02, M.matte(C.base)), s * (bw / 2 - .045), .1, 0));
        put(g, rbox(bw - .1, .05, .12, .02, M.matte(C.base)), 0, .1, -bd * .1);
      } else put(g, rbox(bw, .06, bd, .02, M.matte(C.base)), 0, .1, 0);
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
        const x = sx * (bw / 2 - .05), z = sz * (bd / 2 - .07);
        put(g, box(.03, .05, .03, M.metal()), x, .075, z);
        put(g, cyl(cr, cr, .03, M.rubber(), 20), x, cr, z + .025, 0, 0, Math.PI / 2);
        put(g, cyl(cr * .55, cr * .55, .034, M.plastic(cfg.hub || 0xC9D0D5), 12), x, cr, z + .025, 0, 0, Math.PI / 2);
      });
      put(g, box(.12, .018, .03, M.color(cfg.brake || 0xC0392B)), 0, .07, bd / 2 - .005);
      if (cfg.footbar) put(g, tube([[-bw * .3, .07, bd / 2 + .02], [-bw * .25, .08, bd / 2 + .07], [bw * .25, .08, bd / 2 + .07], [bw * .3, .07, bd / 2 + .02]], .012, M.matte(C.base)), 0, 0, 0);
      P('d-base', bw / 2 - .05, .1, bd / 2 + .02);
    }
    /* Çekmeceli dolap */
    const cw = W * (cfg.cabW || .86), CX = cfg.cabX || 0, cy0 = pend ? (cfg.cabBottom || .42) : .13, chh = TY - .035 - cy0, cd = D * .86, cz = -D * .05, dz = cz + cd / 2;
    Object.assign(ctx, {cw, CX, cy0, chh, cd, cz, dz});
    if (OV.cabinet) OV.cabinet(ctx);
    else {
      put(g, rbox(cw, chh, cd, .02, M.plastic(C.body)), CX, cy0 + chh / 2, cz);
      const nd = cfg.drawers ?? 3, dTop = cfg.drawerTop ?? (TY - .05), dh = (dTop - cy0 - .03) / Math.max(nd, 1);
      for (let k = 0; k < nd; k++) {
        const y = cy0 + .03 + dh * (k + .5);
        put(g, rbox(cw * .92, dh - .014, .02, .008, M.plastic(C.drawer)), CX, y, dz + .006);
        put(g, box(cw * .36, .012, .01, M.matte(C.dark)), CX, y + dh / 2 - .03, dz + .02);
      }
      if (nd) P('d-drawer', CX + cw * .3, cy0 + .03 + dh * (nd - .5), dz + .03);
    }
    /* Çalışma tablası ve raylar */
    if (OV.worktop) OV.worktop(ctx);
    else {
      put(g, rbox(W + .04, .035, D, .012, M.plastic(C.trim)), 0, TY - .0175, 0);
      if (cfg.worktopEdge) put(g, box(W + .045, .03, .006, M.matte(cfg.worktopEdge)), 0, TY - .0175, D / 2 + .001);
      P('d-worktop', W * .08, TY + .01, D * .44);
      [-1, 1].forEach(s => {
        put(g, box(.01, .028, D * .7, M.metal()), s * (W / 2 + .04), TY - .035, D * .05);
        [-1, 1].forEach(t => put(g, box(.03, .014, .02, M.metal()), s * (W / 2 + .025), TY - .035, D * .05 + t * D * .3));
      });
      P('d-rail', W / 2 + .045, TY - .035, D * .32);
    }
    /* Üst gövde (kule) */
    const tw = W * (cfg.towerW || .86), TX = cfg.towerX || 0, tz = -D / 2 + TD / 2, zF = -D / 2 + TD;
    Object.assign(ctx, {tw, TX, tz, zF});
    if (OV.tower) OV.tower(ctx);
    else {
      put(g, rbox(tw, TH, TD, .025, M.plastic(C.body)), TX, TY + TH / 2, tz);
      put(g, rbox(tw + .03, .025, TD + .03, .01, M.plastic(C.trim)), TX, TY + TH + .012, tz);
    }
    if (pend) {
      const ch = cfg.pendantTop || 2.0, px = cfg.pendantX ?? TX;
      put(g, cyl(.075, .075, ch - (TY + TH), M.plastic(C.trim), 32), px, (ch + TY + TH) / 2, tz - .02);
      put(g, rbox(.62, .13, .2, .04, M.plastic(C.trim)), px - .22, ch + .06, tz - .02);
      put(g, cyl(.1, .1, .03, M.matte(C.dark), 32), px, ch - .01, tz - .02);
      P('d-pendant', px + .08, ch - .2, tz - .02);
    }
    if (cfg.towerFace) put(g, rbox(tw * .9, TH * .8, .01, .006, M.plastic(cfg.towerFace)), TX, TY + TH * .52, zF + .002);
    if (cfg.lightbar) put(g, box(tw * .5, .012, .006, M.led(cfg.lightbar)), TX, TY + TH - .03, zF + .004);
    /* Taze gaz kontrolü */
    const G = Object.assign({kind: 'tubes', x: TX + tw * .28, y: TY + TH * .6, tubes: 3}, cfg.gas || {});
    if (OV.gas) OV.gas(ctx);
    else {
    if (G.kind !== 'mixer') put(g, rbox(G.kind === 'knobs' ? .22 : .19, G.kind === 'knobs' ? .11 : .24, .012, .008, M.plastic(C.panel)), G.x, G.y, zF + .004);
    if (G.kind === 'mixer') {
      /* Elektronik karıştırıcı paneli (Dräger tipi): renkli panel, küçük LCD, sağda tek akış tüpü, solda açma düğmesi */
      const gw = G.w || .26, gh = G.h || .16;
      put(g, rbox(gw, gh, .012, .014, M.plastic(G.color || 0xBFD8E4)), G.x, G.y, zF + .004);
      put(g, decal(gw * .36, gh * .38, (c, w, h) => {
        c.fillStyle = '#9EC4F0'; c.fillRect(0, 0, w, h); c.fillStyle = '#16325E'; c.font = `700 ${h * .2}px monospace`;
        [['O₂', '2.0 L/min'], ['AIR', '0.0 L/min'], ['FiO₂', '50 %']].forEach(([l, v], i) => { const y = h * (.27 + i * .28); c.fillText(l, w * .06, y); c.textAlign = 'right'; c.fillText(v, w * .95, y); c.textAlign = 'left'; });
      }, 256), G.x - gw * .04, G.y + gh * .1, zF + .012);
      put(g, cyl(.008, .008, gh * .6, M.glass(0xE8F4F8, .45), 16), G.x + gw * .34, G.y + gh * .05, zF + .02);
      put(g, sphere(.006, M.color(0x2E9E58)), G.x + gw * .34, G.y + gh * .02, zF + .02);
      put(g, cyl(.014, .014, .02, M.plastic(0xF4F6F7), 20), G.x + gw * .34, G.y - gh * .3, zF + .02, Math.PI / 2);
      put(g, cyl(.013, .013, .01, M.plastic(0xF4F6F7), 20), G.x - gw * .38, G.y + gh * .3, zF + .014, Math.PI / 2);
      [-1, 1].forEach(k => put(g, rbox(.022, .014, .006, .006, M.plastic(0xDCE6EC)), G.x - gw * .3 + k * .014, G.y - gh * .35, zF + .013));
    } else if (G.kind === 'knobs') {
      const kc = [0x2E9E58, 0x2F7DD1, 0xF2C531, 0x2E9E58, 0x2F7DD1, 0xF2C531];
      for (let k = 0; k < 6; k++) { const x = G.x - .06 + (k % 3) * .06, y = G.y + (k < 3 ? .025 : -.025); put(g, torus(.017, .003, M.color(kc[k])), x, y, zF + .012); put(g, cyl(.013, .013, .02, M.plastic(0xF4F6F7), 20), x, y, zF + .02, Math.PI / 2); }
    } else if (G.kind === 'tubes') {
      const cols = [0x2E9E58, 0x2F7DD1, 0xF2C531, 0x1D2125];
      for (let k = 0; k < G.tubes; k++) {
        const x = G.x - .05 + k * (.1 / Math.max(1, G.tubes - 1));
        put(g, cyl(.009, .009, .15, M.glass(0xE8F4F8, .45), 16), x, G.y + .03, zF + .02);
        put(g, sphere(.006, M.color(cols[k % 4])), x, G.y - .02 + .07 * ((k * .37 + .3) % 1), zF + .02);
        put(g, box(.016, .012, .002, M.color(cols[k % 4])), x, G.y - .085, zF + .012);
        put(g, cyl(.011, .011, .018, M.matte(k === 0 ? 0x2E9E58 : C.dark), 16), x, G.y - .105, zF + .02, Math.PI / 2);
      }
    } else {
      put(g, decal(.15, .1, (c, w, h) => {
        c.fillStyle = '#0A1216'; c.fillRect(0, 0, w, h); c.font = `700 ${h * .13}px monospace`;
        [['O₂', '#2E9E58', .7], ['AIR', '#F2C531', .45], ['N₂O', '#2F7DD1', .15]].forEach(([l, col, v], i) => {
          const y = h * (.12 + i * .29); c.fillStyle = col; c.fillText(l, w * .04, y + h * .14); c.fillRect(w * .3, y + h * .04, w * .6 * v, h * .14);
        });
      }, 256), G.x, G.y + .045, zF + .012);
      const nk = G.knobs || 1;
      for (let k = 0; k < nk; k++) put(g, cyl(nk > 1 ? .016 : .025, nk > 1 ? .016 : .025, .02, M.matte(C.dark), 28), G.x + (k - (nk - 1) / 2) * .045, G.y - .07, zF + .02, Math.PI / 2);
    }
    P('d-gas', G.x, G.y + .03, zF + .03);
    put(g, cyl(.013, .013, .012, M.color(0x2E9E58), 20), TX + tw / 2 - .05, TY + .05, zF + .012, Math.PI / 2);
    P('d-flush', TX + tw / 2 - .05, TY + .05, zF + .03);
    }
    /* Vaporizatörler */
    const VP = Object.assign({n: 2, kind: 'mech', agents: ['sevo', 'des'], x: TX - tw * .1}, cfg.vapor || {});
    if (OV.vapor) OV.vapor(ctx);
    else if (VP.n) {
      const VB = VP.y ?? TY, vw = VP.kind === 'elec' ? .085 : .1, gap = vw + .025, x0 = VP.x - (VP.n - 1) * gap / 2;
      if (VP.kind !== 'elec' && VP.at !== 'front' && VP.bar !== false) put(g, box(VP.n * gap - .02, .03, .04, M.metal()), VP.x, VB + .2, (VP.z ?? zF + .085) - .065);
      if (VP.y) put(g, rbox(VP.n * gap + .03, .02, .18, .006, M.plastic(C.trim)), VP.x, VB - .01, zF + .08);
      for (let k = 0; k < VP.n; k++) {
        const x = x0 + k * gap, col = AG[VP.agents[k % VP.agents.length]] || 0xF2C531;
        if (VP.at === 'front') {
          put(g, rbox(vw * .8, .21, .1, .01, M.plastic(0xF2F4F5)), x, TY - .17, dz + .03);
          put(g, box(.008, .12, .002, M.color(col)), x, TY - .16, dz + .081);
          put(g, box(vw * .6, .02, .002, M.matte(0x5B6670)), x, TY - .26, dz + .081);
        } else if (VP.kind === 'elec') {
          put(g, rbox(vw, .13, .13, .012, M.plastic(0xF2F4F5)), x, VB + .075, zF + .075);
          put(g, box(vw * .7, .04, .002, M.color(0x0A1216)), x, VB + .1, zF + .141);
          put(g, box(vw * .9, .012, .002, M.color(col)), x, VB + .04, zF + .141);
        } else {
          const vz = VP.z ?? zF + .085;
          put(g, rbox(vw, .2, .15, .014, M.plastic(0xF2F4F5)), x, VB + .105, vz);
          if (VP.style === 'cap') {
            /* Dräger Vapor tipi: ajan renginde dolum kapağı üstte, önde ayar düğmesi */
            put(g, cyl(.042, .044, .04, M.plastic(col), 32), x, VB + .225, vz - .01);
            put(g, box(.05, .012, .02, M.plastic(0xC9D0D5)), x, VB + .25, vz - .03);
            put(g, cyl(.016, .016, .012, M.plastic(col), 20), x + vw * .18, VB + .13, vz + .078, Math.PI / 2);
            put(g, box(.01, .05, .002, M.matte(0x9AA3AA)), x - vw * .2, VB + .08, vz + .076);
          } else {
            put(g, box(vw + .002, .03, .152, M.color(col)), x, VB + .16, vz);
            put(g, cyl(.038, .038, .035, M.plastic(0xF7F8F9), 32), x, VB + .225, vz + .005);
            put(g, box(.03, .03, .01, M.color(col)), x, VB + .05, vz + .08);
          }
        }
      }
      if (VP.at === 'front') P('d-vapor', VP.x, TY - .12, dz + .1);
      else P('d-vapor', VP.x, VB + (VP.kind === 'elec' ? .16 : .25), (VP.z ?? zF + .085) + .035);
    }
    /* Solunum sistemi */
    const BS = Object.assign({side: 'left', drive: 'bellows'}, cfg.bs || {});
    if (OV.bs) OV.bs(ctx);
    else {
    const bx = BS.x ?? (BS.side === 'left' ? -W / 2 - .1 : -W / 2 + .1), by = BS.y ?? (BS.side === 'left' ? TY - .01 : TY + .02), bz = BS.z ?? (BS.side === 'left' ? D * .1 : D / 2 + .06);
    if (BS.side === 'left') put(g, box(.1, .03, .05, M.metal()), bx + .07, by - .02, bz - .02);
    else put(g, box(.06, .03, .12, M.metal()), bx, by - .04, bz - .12);
    put(g, rbox(.2, .1, .2, .016, M.plastic(C.bs)), bx, by, bz);
    [-1, 1].forEach(s => {
      put(g, cyl(.024, .024, .022, M.clear(0xEAF4F8, .5), 24), bx + s * .045, by + .06, bz + .05);
      put(g, cyl(.018, .018, .002, M.color(0x8FA3AE)), bx + s * .045, by + .055, bz + .05);
      put(g, cyl(.011, .011, .04, M.plastic(0xC9D3D8), 16), bx + s * .045, by - .015, bz + .115, Math.PI / 2);
    });
    P('d-valves', bx, by + .065, bz + .08);
    if (cfg.gauge) {
      put(g, cyl(.034, .034, .02, M.plastic(0xF4F6F7), 28), bx + .02, by + .03, bz + .1, Math.PI / 2 - .4);
      put(g, decal(.056, .056, (c, w, h) => { c.fillStyle = '#FFF'; c.beginPath(); c.arc(w / 2, h / 2, w / 2, 0, 7); c.fill(); c.strokeStyle = '#222'; c.lineWidth = 4; for (let k = 0; k < 9; k++) { const a = Math.PI * (.75 + k * .1875); c.beginPath(); c.moveTo(w / 2 + Math.cos(a) * w * .36, h / 2 + Math.sin(a) * h * .36); c.lineTo(w / 2 + Math.cos(a) * w * .44, h / 2 + Math.sin(a) * h * .44); c.stroke(); } c.strokeStyle = '#C0392B'; c.beginPath(); c.moveTo(w / 2, h / 2); c.lineTo(w * .3, h * .3); c.stroke(); }, 128), bx + .02, by + .034, bz + .111, -.4);
      P('d-gauge', bx + .02, by + .05, bz + .12);
    }
    put(g, cyl(.018, .02, .028, M.color(cfg.aplColor || 0xF2C531, .5), 20), bx - .065, by + .064, bz - .055);
    put(g, cyl(.012, .012, .012, M.matte(C.dark), 16), bx - .065, by + .084, bz - .055);
    P('d-apl', bx - .065, by + .09, bz - .055);
    /* CO₂ absorbanı */
    const vis = BS.drive === 'bellows' || BS.drive === 'exchanger', below = vis && BS.housing === 'below';
    const hh = BS.hh || (BS.drive === 'exchanger' ? .16 : .26), hy = below ? by - .05 - .034 - hh : by + .05, hz = below ? bz : bz - .02;
    const ah = cfg.absH || .2, ay = (below ? hy - .01 : by - .05) - ah / 2 - .015;
    put(g, cyl(.068, .068, ah, M.clear(0xF2F6F8, .4), 32), bx, ay, bz);
    put(g, cyl(.06, .06, ah * .92, M.color(cfg.absorber || 0xE6DDF0, .9), 24), bx, ay, bz);
    put(g, cyl(.072, .072, .018, M.plastic(cfg.absCap || C.bs), 32), bx, ay - ah / 2, bz);
    P('d-absorber', bx, ay, bz + .075);
    /* Ventilatör tahriki */
    if (vis) {
      put(g, cyl(.08, .08, .014, M.plastic(C.bs), 32), bx, hy + .007, hz);
      put(g, cyl(.076, .076, hh, M.clear(0xE6F1F5, .3), 32, true), bx, hy + .014 + hh / 2, hz);
      put(g, cyl(.078, .078, .012, M.plastic(C.bs), 32), bx, hy + .02 + hh, hz);
      const bel = new THREE.Group(); bel.position.set(bx, hy + .014, hz); g.add(bel);
      const pts = [[0, 0]], n = 12, bh = hh * .9;
      for (let k = 0; k <= n; k++) pts.push([k % 2 ? .056 : .066, k / n * bh]);
      pts.push([0, bh]);
      bel.add(lathe(pts, M.color(cfg.bellows || 0x7FB6DC, .5), 32));
      screens.push({update(t) { const p = (t * .25) % 1; bel.scale.y = p < .35 ? 1 - .45 * p / .35 : .55 + .45 * Math.min(1, (p - .35) / .45); }});
      P(BS.drive === 'exchanger' ? 'd-exchanger' : 'd-bellows', bx, hy + hh * .6, hz + .085);
    } else {
      /* Gövde içindeki ünite: sağ yanda şeffaf kesit penceresi */
      const sx = CX + (BS.driveSide === 'right' ? 1 : -1) * (cw / 2 + .045), sy = TY - .22, sz = cz - cd * .28, iu = new THREE.Group(); iu.position.set(sx, sy, sz); g.add(iu);
      iu.add(rbox(.09, .2, .24, .012, M.glass(0xCFE3EC, .22))); put(iu, box(.004, .19, .23, M.matte(0x2B3238)), (BS.driveSide === 'right' ? -1 : 1) * .042, 0, 0);
      if (BS.drive === 'piston') {
        put(iu, cyl(.05, .05, .13, M.clear(0xB7C0C6, .5), 28), 0, 0, .035, Math.PI / 2);
        put(iu, cyl(.046, .046, .02, M.matte(0x2B3238), 28), 0, 0, .03, Math.PI / 2);
        put(iu, cyl(.008, .008, .09, M.chrome(), 12), 0, 0, -.03, Math.PI / 2);
        put(iu, box(.06, .07, .04, M.matte(0x2B3238)), 0, 0, -.08);
      } else if (BS.drive === 'turbine') {
        put(iu, cyl(.06, .06, .05, M.metal(0xB7C0C6), 28), 0, 0, 0, 0, 0, Math.PI / 2);
        for (let k = 0; k < 8; k++) put(iu, box(.004, .045, .01, M.matte(0x2B3238)), .028, Math.cos(k * .785) * .03, Math.sin(k * .785) * .03, k * .785);
        put(iu, box(.05, .04, .08, M.metal(0xB7C0C6)), 0, .045, -.06);
      } else {
        const hel = []; for (let k = 0; k <= 80; k++) { const a = k / 80 * Math.PI * 9; hel.push([Math.cos(a) * .028, Math.sin(a) * .06, -.095 + k / 80 * .19]); }
        iu.add(tube(hel, .008, M.color(0x9CCBE8, .4), 240));
      }
      P(BS.drive === 'piston' ? 'd-piston' : BS.drive === 'turbine' ? 'd-turbine' : 'd-reflector', sx + (BS.driveSide === 'right' ? .05 : -.05), sy, sz);
    }
    /* Hortumlar ve Y parça */
    const lc = M.plastic(cfg.limb || 0xA9D3EE), yp = V3(bx + .08, by - .22, bz + .5);
    [-1, 1].forEach(s => {
      const p0 = V3(bx + s * .045, by - .015, bz + .135);
      g.add(corrugated([p0, V3(p0.x, p0.y - .01, p0.z + .08), V3(bx + s * .05 + .04, by - .12, bz + .3), V3(yp.x + s * .02, yp.y + .03, yp.z - .1), V3(yp.x + s * .015, yp.y + .015, yp.z - .03)], .011, lc));
    });
    put(g, cyl(.012, .012, .05, M.plastic(0xE9EEF1), 16), yp.x, yp.y, yp.z, Math.PI / 2);
    put(g, cyl(.024, .024, .03, M.plastic(0xF4F6F7), 24), yp.x, yp.y, yp.z + .04, Math.PI / 2);
    P('d-ypiece', yp.x, yp.y + .02, yp.z + .03);
    /* Balon kolu ve rezervuar balon */
    if (cfg.bag !== false) {
      const BA = cfg.bagArm || [-.2, .07], a0 = V3(bx - .1, by + .02, bz), a1 = V3(bx + BA[0], by + BA[1], bz + .06);
      g.add(tube([a0, V3(bx - .12, by + Math.max(.08, BA[1] * .8), bz + .02), V3(a1.x + .04, a1.y + .03, a1.z - .02), a1], .008, M.metal()));
      put(g, cyl(.011, .011, .04, M.plastic(0xE9EEF1), 16), a1.x, a1.y - .02, a1.z);
      const bagP = [[0, 0], [.012, 0], [.012, -.02], [.05, -.07], [.068, -.15], [.06, -.24], [.03, -.28], [0, -.285]];
      put(g, lathe(bagP, M.rubber(cfg.bagColor || 0x2FA88C), 32), a1.x, a1.y - .04, a1.z);
      P('d-bag', a1.x, a1.y - .17, a1.z + .07);
    }
    }
    /* Ventilatör ekranı */
    const S = Object.assign({at: 'top', w: .3, h: .23, tilt: -.12}, cfg.screen || {});
    const spec = S.spec || {title: cfg.label || 'VENT', accent: '#4FD1BE', extra: 'vent',
      waves: [{k: 'paw', c: '#F2C531', l: 'Paw'}, {k: 'flow', c: '#4FD1BE', l: 'Flow'}, {k: 'capno', c: '#E6EEF2', l: 'CO₂'}],
      params: [{l: 'VT', v: 450, u: 'mL', c: '#4FD1BE', live: true}, {l: 'RR', v: 12, u: '/min', c: '#4FD1BE'}, {l: 'PEEP', v: 5, u: 'cmH₂O', c: '#F2C531'},
        {l: 'Ppeak', v: 18, u: 'cmH₂O', c: '#F2C531', live: true}, {l: 'FiO₂', v: 50, u: '%', c: '#E6EEF2'}, {l: 'EtCO₂', v: 36, u: 'mmHg', c: '#E6EEF2', live: true}, {l: 'MAC', v: '1.0', u: '', c: '#B184E8'}]};
    const sw = S.w, sh = S.h;
    let sx = S.x, sy = S.y, sz = S.z;
    if (OV.screen) ({sx, sy, sz} = OV.screen(ctx));
    else {
    if (S.at === 'arm-left') { sx ??= TX - tw / 2 - sw * .3; sy ??= TY + TH - sh * .2; sz ??= zF + .06; }
    else if (S.at === 'tower') { sx ??= TX; sy ??= TY + TH * .62; sz ??= zF + .01; }
    else { sx ??= TX; sy ??= TY + TH + .05 + sh / 2; sz ??= tz + .02; }
    const sg = new THREE.Group(); sg.position.set(sx, sy, sz); sg.rotation.set(S.tilt, S.yaw || 0, 0); g.add(sg);
    const fw = S.frame ? S.frame[1] : 0;
    sg.add(rbox(sw + .035 + fw * 2, sh + .04 + fw * 2 + (S.keys ? .03 : 0), .045, .012, M.plastic(S.color || C.trim)));
    if (S.frame) put(sg, box(sw + fw * 2, sh + fw * 2, .002, M.matte(S.frame[0])), 0, S.keys ? .012 : 0, .0222);
    put(sg, box(sw + .004, sh + .004, .002, M.matte(0x11171B)), 0, S.keys ? .012 : 0, .0225);
    const scr = makeScreen(sw, sh, spec); put(sg, scr.mesh, 0, S.keys ? .012 : 0, .0245); screens.push(scr);
    if (S.keys) for (let k = 0; k < S.keys; k++) put(sg, cyl(.007, .007, .006, M.matte(k === S.keys - 1 ? 0x2E9E58 : 0x5B6670), 14), -sw * .35 + k * sw * .7 / Math.max(1, S.keys - 1), -sh / 2 - .008, .023, Math.PI / 2);
    if (S.at === 'arm-left') g.add(tube([[TX - tw / 2 + .01, sy - .05, zF - .08], [TX - tw / 2 - .04, sy - .06, zF - .02], [sx + .02, sy - .03, sz - .04]], .014, M.plastic(C.trim)));
    else if (S.at === 'top') { const pl = Math.max(.03, sy - sh * .45 - (TY + TH)); put(g, cyl(.02, .02, pl, M.plastic(C.trim), 16), sx, TY + TH + pl / 2, sz - .03); put(g, box(.07, .03, .05, M.plastic(C.trim)), sx, TY + TH + .03, sz - .03); }
    sg.updateMatrixWorld(true); g.updateMatrixWorld(true);
    parts.push({key: 'd-vscreen', at: sg.localToWorld(V3(0, 0, .04))});
    }
    Object.assign(ctx, {sx, sy, sz});
    /* Hasta monitörü / ek ekranlar: cfg.monitor (tek) ya da cfg.monitors (dizi). Her biri {w,h,x,y,z,tilt,yaw,color,spec,
       side (yandan kol), arm:false (kolsuz, yalnız direk), post:false (direksiz), bezel:[sol,üst,sağ,alt]}. İlki 'd-monitor' işaretini alır. */
    const mons = (cfg.monitors || (cfg.monitor ? [cfg.monitor] : []));
    if (OV.monitors) OV.monitors(ctx);
    else mons.forEach((m, mi) => {
      const MO = Object.assign({w: .3, h: .24, x: sx, y: null, z: tz - .02, tilt: -.1}, m);
      const my = MO.y ?? (TY + TH + .45 + MO.h / 2);
      const pb = MO.side ? my - MO.h / 2 - .06 : TY + TH + (Math.abs(MO.x) > tw / 2 ? .1 : 0);
      if (MO.post !== false) {
        if (MO.side) { const ex = MO.x > TX ? TX + tw / 2 - .02 : TX - tw / 2 + .02; g.add(tube([[ex, pb - .02, MO.z - .06], [MO.x * .6 + ex * .4, pb + .005, MO.z - .03], [MO.x, pb, MO.z - .06]], .016, M.metal())); }
        else if (pb > TY + TH && MO.arm !== false) g.add(tube([[Math.sign(MO.x) * tw * .3, TY + TH + .02, MO.z - .06], [Math.sign(MO.x) * tw * .45, TY + TH + .09, MO.z - .06], [MO.x, pb, MO.z - .06]], .014, M.metal()));
        put(g, cyl(.016, .016, my - pb, M.metal()), MO.x, pb + (my - pb) / 2, MO.z - .06);
      }
      const bz = MO.bezel || [.015, .017, .015, .033];
      const mg = new THREE.Group(); mg.position.set(MO.x, my, MO.z); mg.rotation.set(MO.tilt, MO.yaw || 0, 0); g.add(mg);
      mg.add(rbox(MO.w + bz[0] + bz[2], MO.h + bz[1] + bz[3], .06, .012, M.plastic(MO.color || 0xE9EEF1)));
      const ox = (bz[0] - bz[2]) / 2, oy = (bz[3] - bz[1]) / 2;
      put(mg, box(MO.w + .004, MO.h + .004, .002, M.matte(0x0B0F12)), ox, oy, .0302);
      const ms = makeScreen(MO.w, MO.h, MO.spec || {title: 'MON', accent: '#2E9E58', waves: [{k: 'ecg', c: '#4ADE80', l: 'II'}, {k: 'art', c: '#F07A6A', l: 'ART'}, {k: 'pleth', c: '#5BC8F0', l: 'SpO₂'}, {k: 'capno', c: '#F2C531', l: 'CO₂'}],
        params: [{l: 'HR', v: 72, c: '#4ADE80', big: true, live: true}, {l: 'ART', v: '118/64', u: 'mmHg', c: '#F07A6A'}, {l: 'SpO₂', v: 98, u: '%', c: '#5BC8F0'}, {l: 'EtCO₂', v: 36, u: 'mmHg', c: '#F2C531'}]}, MO.px || 768);
      put(mg, ms.mesh, ox, oy, .0325); screens.push(ms); /* koyu panelin ön yüzü .0312: ekran onun önünde kalmalı */
      mg.updateMatrixWorld(true); if (!mi) parts.push({key: 'd-monitor', at: mg.localToWorld(V3(0, 0, .05))});
      MO.group = mg;
    });
    /* Tüpler ve merkezi gaz hortumları */
    const ncyl = cfg.cyl ?? 2, cylC = cfg.cylColors || [0xF4F6F7, 0x2F7DD1];
    for (let k = 0; k < ncyl; k++) {
      const x = (k - (ncyl - 1) / 2) * .14, z = -D / 2 - .065;
      put(g, cyl(.05, .05, .5, M.metal(0xB9C1C7), 24), x, .42, z);
      put(g, sphere(.05, M.color(cylC[k % cylC.length])), x, .67, z).scale.y = .6;
      put(g, cyl(.014, .014, .06, M.chrome(), 12), x, .72, z);
    }
    if (ncyl) { put(g, box(ncyl * .14 + .04, .03, .03, M.matte(C.dark)), 0, .55, -D / 2 - .02); P('d-cyl', -(ncyl - 1) * .07 - .055, .45, -D / 2 - .065); }
    const pc = cfg.pipeColors || [0xF4F6F7, 0x1D2125, 0x2F7DD1];
    pc.slice(0, cfg.pipes ?? 3).forEach((c, k) => {
      const x = TX + tw * .3 + k * .035;
      g.add(tube([[x, TY + TH * .35, -D / 2 - .005], [x, TY + TH * .2, -D / 2 - .07], [x + .02, .4, -D / 2 - .13], [x + .05, .015, -D / 2 - .32]], .007, M.rubber(c)));
    });
    if (cfg.pipes !== 0) P('d-pipe', TX + tw * .3 + .08, .4, -D / 2 - .13);
    /* Atık gaz sistemi */
    if (cfg.agss !== false) {
      const ax = CX + cw / 2 + .03, az = D * .3, ay = TY - .32;
      put(g, cyl(.018, .018, .16, M.clear(0xEAF4F8, .5), 20), ax, ay, az);
      put(g, sphere(.009, M.color(0x2E9E58)), ax, ay - .01, az);
      put(g, box(.03, .03, .03, M.metal()), ax - .015, ay + .09, az);
      P('d-agss', ax + .02, ay, az);
    }
    if (cfg.extra) cfg.extra(g, ctx);
    return {group: g, parts, screens};
  });

  /* ---------- Ekran düzenleri (üretici görsellerindeki yerleşime göre; değerler örnektir) ----------
     A = ekranın en/boy oranı (daire çizimleri için). Her yardımcı makeScreen'e verilecek {bg, layout, draw} döndürür. */
  const circ = (cx, cy, d, A, o = {}) => ({t: 'box', x: cx - d / A / 2, y: cy - d / 2, w: d / A, h: d, r: d / 2, ...o});
  const drawAll = fs => (g, t, api) => fs.forEach(f => f(g, t, api));
  /* ---------- Dräger ekranları (Atlan / Perseus ve Infinity monitörleri; değerler örnektir) ----------
     Ortak görünüm: mavi başlık çubuğu, siyah zemin, sağda açık nane yeşili dikey tuş sütunu, açık mavi dolgulu eğriler. */
  const DB = '#3D6FB6', MINT = '#CDEBDC', MINTD = '#9CCDB8', DTEAL = '#2E9C86';
  /* Solunum döngüsü (RR 12/dk → 5 s; Ti 1.7 s): faz u ∈ [0,1) */
  const brPaw = u => u < .04 ? 5 + 11 * u / .04 : u < .34 ? 16 + 2 * (u - .04) / .3 : u < .38 ? 18 - 13 * (u - .34) / .04 : 5;
  const brFlow = u => u < .02 ? 42 * u / .02 : u < .34 ? 42 * Math.exp(-(u - .02) * 7.5) : u < .345 ? -48 * (u - .34) / .005 : -48 * Math.exp(-(u - .345) * 9);
  const brCO2 = u => u < .36 ? 0 : u < .43 ? 36 * (u - .36) / .07 : 36 + 2.5 * (u - .43) / .57;
  /* Dolgulu eğri + Dräger tarzı ilerleyen silme çubuğu */
  function drgPlot(g, api, box, f, lo, hi, base, o = {}) {
    const [x, y, w, h] = api.R(box), n = o.breaths || 3, yv = v => y + h * (1 - (v - lo) / (hi - lo)), yb = yv(base);
    g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
    g.strokeStyle = 'rgba(160,180,200,.25)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x, yb); g.lineTo(x + w, yb); g.stroke();
    g.beginPath(); g.moveTo(x, yb);
    for (let k = 0; k <= w; k += 1.5) g.lineTo(x + k, yv(f((k / w * n) % 1)));
    g.lineTo(x + w, yb); g.closePath(); g.fillStyle = o.fill || '#A9CBF2'; g.globalAlpha = o.alpha ?? .92; g.fill(); g.globalAlpha = 1;
    g.strokeStyle = o.line || '#DCEBFF'; g.lineWidth = Math.max(1.5, api.H * .004); g.beginPath();
    for (let k = 0; k <= w; k += 1.5) { const yy = yv(f((k / w * n) % 1)); k ? g.lineTo(x + k, yy) : g.moveTo(x, yy); }
    g.stroke();
    const p = ((o.t || 0) / (5 * n)) % 1; g.fillStyle = o.bg || '#05080B'; g.fillRect(x + p * w, y, w * .03, h);
    g.restore();
  }
  /* Ventilatör ekranı (Atlan / Perseus): başlıkta hasta tipi ve mod; solda gaz değerleri (insp/eksp), O₂ ve Air sanal akış tüpleri
     ve düşük akım göstergesi; ortada Paw (solunda beyaz basınç çubuğu) ve akım eğrisi, altında küçük kapnogram ve değerler;
     sağda ölçülen değerler sütunu; altta mod sekmeleri ve yuvarlak terapi ayar düğmeleri; en sağda nane yeşili tuşlar */
  function drgVent(A, o = {}) {
    const ag = o.agent || 'Sev', L = [
      {t: 'box', x: 0, y: 0, w: 1, h: .085, fill: DB},
      {t: 'text', txt: 'Adult', x: .045, y: .008, w: .12, h: .034, c: '#D5E4F6', s: .024},
      {t: 'text', txt: o.mode || 'VC-AutoFlow', x: .045, y: .04, w: .22, h: .04, c: '#FFFFFF', s: .034},
      {t: 'box', x: .3, y: .015, w: .3, h: .055, fill: '#2F5E9E', r: .01},
      {t: 'text', txt: o.msg || 'Low-flow wizard: 0.5 L/min', x: .3, y: .015, w: .3, h: .055, c: '#E3EEFA', s: .024, al: 'c', wt: 600},
      {t: 'text', txt: '10:42', x: .74, y: 0, w: .135, h: .085, c: '#FFFFFF', s: .03, al: 'r'},
      /* gaz değerleri: Insp / Exp */
      {t: 'text', txt: 'Insp.', x: .058, y: .092, w: .06, h: .025, c: '#8FA3B3', s: .02}, {t: 'text', txt: 'Exp.', x: .118, y: .092, w: .06, h: .025, c: '#8FA3B3', s: .02},
      {t: 'box', x: .008, y: .12, w: .048, h: .05, fill: '#E9EDEF', r: .008}, {t: 'text', txt: 'O₂', x: .008, y: .12, w: .048, h: .05, c: '#11181C', s: .026, al: 'c'},
      {t: 'text', txt: '50', x: .058, y: .12, w: .055, h: .05, c: '#FFFFFF', s: .036, al: 'r'}, {t: 'text', txt: '46', x: .118, y: .12, w: .055, h: .05, c: '#FFFFFF', s: .036, al: 'r'},
      {t: 'box', x: .008, y: .18, w: .048, h: .05, fill: '#2F86B0', r: .008}, {t: 'text', txt: ag, x: .008, y: .18, w: .048, h: .05, c: '#FFFFFF', s: .024, al: 'c'},
      {t: 'text', txt: ag === 'Des' ? '6.2' : '2.1', x: .058, y: .18, w: .055, h: .05, c: '#FFFFFF', s: .036, al: 'r'}, {t: 'text', txt: ag === 'Des' ? '5.8' : '1.9', x: .118, y: .18, w: .055, h: .05, c: '#FFFFFF', s: .036, al: 'r'},
      {t: 'text', txt: 'xMAC 1.0', x: .008, y: .24, w: .17, h: .04, c: '#C9D6DF', s: .024},
      /* sanal akış tüpleri */
      {t: 'text', txt: 'O₂', x: .02, y: .29, w: .045, h: .035, c: '#C9D6DF', s: .022, al: 'c'}, {t: 'text', txt: 'Air', x: .072, y: .29, w: .045, h: .035, c: '#C9D6DF', s: .022, al: 'c'},
      {t: 'box', x: .022, y: .33, w: .04, h: .33, stroke: '#56636D', fill: '#141B21', lw: .003}, {t: 'box', x: .026, y: .45, w: .032, h: .206, fill: '#EEF2F4'},
      {t: 'box', x: .074, y: .33, w: .04, h: .33, stroke: '#56636D', fill: '#141B21', lw: .003}, {t: 'box', x: .078, y: .5, w: .032, h: .156, fill: '#BFC8CF'},
      {t: 'text', txt: '1.0', x: .018, y: .665, w: .05, h: .03, c: '#FFFFFF', s: .022, al: 'c'}, {t: 'text', txt: '1.0', x: .07, y: .665, w: .05, h: .03, c: '#FFFFFF', s: .022, al: 'c'},
      /* düşük akım göstergesi */
      {t: 'box', x: .14, y: .35, w: .024, h: .1, fill: '#7DC243'}, {t: 'box', x: .14, y: .452, w: .024, h: .1, fill: '#E8D23F'}, {t: 'box', x: .14, y: .554, w: .024, h: .1, fill: '#C9302B'},
      {t: 'box', x: .134, y: .41, w: .036, h: .008, fill: '#FFFFFF'},
      /* eğri alanları ve etiketler */
      {t: 'text', txt: 'Paw  mbar', x: .238, y: .095, w: .2, h: .03, c: '#9FB3C4', s: .02}, {t: 'text', txt: '40', x: .64, y: .1, w: .05, h: .03, c: '#6F8494', s: .02, al: 'r'},
      {t: 'box', x: .216, y: .12, w: .014, h: .2, stroke: '#C9D3DA', lw: .003},
      {t: 'text', txt: 'Flow  L/min', x: .238, y: .335, w: .2, h: .03, c: '#9FB3C4', s: .02}, {t: 'text', txt: '60', x: .64, y: .34, w: .05, h: .03, c: '#6F8494', s: .02, al: 'r'},
      {t: 'box', x: .215, y: .565, w: .19, h: .115, stroke: '#2C3842', lw: .003}, {t: 'text', txt: 'CO₂  mmHg', x: .218, y: .567, w: .15, h: .028, c: '#9FB3C4', s: .018},
      /* küçük değer kutuları */
      {t: 'table', x: .415, y: .565, w: .27, h: .115, rows: [['Compl.', '52 mL/mbar', '#E6EEF2'], ['etCO₂  ·  FiCO₂', '36 · 0', '#E6EEF2'], ['Leak', '18 mL/min', '#E6EEF2']], s: .02, lc: '#8FA3B3', zebra: false},
      /* ölçülen değerler */
      {t: 'box', x: .695, y: .095, w: .003, h: .59, fill: '#1E2A33'}
    ];
    [['Ppeak', 'mbar', 18, .13, true], ['Pmean', 'mbar', 9, .075], ['PEEP', 'mbar', 5, .075], ['MV', 'L/min', '5.4', .11, true], ['VT', 'mL', 480, .11, true], ['RR', '/min', 12, .08]].reduce((y, [l, u, v, h, big]) => {
      L.push({t: 'text', txt: l, x: .705, y, w: .09, h: .03, c: '#9FB3C4', s: .02}, {t: 'text', txt: u, x: .705, y: y + .028, w: .09, h: .025, c: '#6F8494', s: .016},
        {t: 'text', txt: v, x: .74, y: y + (big ? .01 : 0), w: .135, h: h - .005, c: '#FFFFFF', s: big ? .085 : .05, al: 'r', wt: 800});
      return y + h;
    }, .1);
    /* mod sekmeleri */
    L.push({t: 'box', x: 0, y: .688, w: .885, h: .237, fill: '#0B1013'});
    ['VC-CMV', 'VC-AutoFlow', 'PC-CMV', 'PC-PSV', 'SIMV', 'Man/Spon'].forEach((s, k) => {
      const on = s === (o.mode || 'VC-AutoFlow'), x = .006 + k * .113;
      L.push({t: 'box', x, y: .698, w: .108, h: .052, fill: on ? DTEAL : MINT, r: .008}, {t: 'text', txt: s, x, y: .698, w: .108, h: .052, c: on ? '#FFFFFF' : '#183A31', s: .022, al: 'c'});
    });
    L.push({t: 'box', x: .69, y: .698, w: .085, h: .052, fill: '#3A464E', r: .008}, {t: 'text', txt: 'More', x: .69, y: .698, w: .085, h: .052, c: '#E6EEF2', s: .022, al: 'c'});
    /* yuvarlak terapi ayar düğmeleri */
    const ctl = o.ctl || [['O₂', '50'], ['VT', '480'], ['RR', '12'], ['Ti', '1.7'], ['PEEP', '5'], ['Pmax', '35'], ['Tslope', '0.2']];
    ctl.forEach(([l, v], k) => {
      const cx = .052 + k * .1, cy = .845;
      L.push({t: 'text', txt: l, x: cx - .05, y: .755, w: .1, h: .03, c: '#C9D6DF', s: .02, al: 'c'});
      L.push(circ(cx, cy, .118, A, {fill: '#7FCDB9', stroke: '#2B6E60', lw: .007}), circ(cx, cy, .082, A, {fill: '#A5DDCD'}));
      L.push({t: 'text', txt: v, x: cx - .05, y: cy - .03, w: .1, h: .06, c: '#0D2C25', s: .034, al: 'c', wt: 800});
    });
    L.push({t: 'box', x: .79, y: .79, w: .085, h: .1, fill: '#7FCDB9', r: .01}, {t: 'text', txt: 'Start', x: .79, y: .79, w: .085, h: .1, c: '#0D2C25', s: .024, al: 'c'});
    /* durum satırı */
    L.push({t: 'box', x: 0, y: .93, w: .885, h: .07, fill: '#1A2228'},
      {t: 'text', txt: `Fresh gas 2.0 L/min   ·   ${ag} ${ag === 'Des' ? '6.0' : '2.0'} Vol%   ·   Insp. hold`, x: .01, y: .93, w: .8, h: .07, c: '#AEBDC8', s: .022, wt: 600});
    /* sağ tuş sütunu */
    L.push({t: 'box', x: .885, y: .085, w: .115, h: .915, fill: '#13201B'});
    ['Standby', 'Start', 'Alarms', 'Sensor par.', 'Trends', 'Ventilation', 'Low flow', 'Setup', 'Check'].forEach((s, k) => L.push({t: 'box', x: .891, y: .095 + k * .1, w: .103, h: .092, fill: k === 1 ? '#8FD6BF' : MINT, r: .006}, {t: 'text', txt: s, x: .891, y: .095 + k * .1, w: .103, h: .092, c: '#173A31', s: .019, al: 'c'}));
    return {bg: '#05080B', layout: L, draw(g, t, api) {
      drgPlot(g, api, {x: .235, y: .125, w: .455, h: .2}, brPaw, 0, 40, 0, {t});
      drgPlot(g, api, {x: .235, y: .365, w: .455, h: .19}, brFlow, -60, 60, 0, {t, fill: '#8FB9E8'});
      drgPlot(g, api, {x: .218, y: .595, w: .184, h: .08}, brCO2, 0, 50, 0, {t, fill: '#BFD6F2', breaths: 2});
      /* basınç çubuğu (anlık Paw) */
      const p = brPaw((t / 5) % 1), [bx, by, bw, bh] = api.R({x: .218, y: .122, w: .01, h: .196});
      g.fillStyle = '#F2F5F7'; g.fillRect(bx, by + bh * (1 - p / 40), bw, bh * p / 40);
      /* başlıkta hasta simgesi */
      const [ix, iy, , ih] = api.R({x: .012, y: .015, w: .03, h: .055}); g.fillStyle = '#FFFFFF';
      g.beginPath(); g.arc(ix + ih * .3, iy + ih * .22, ih * .17, 0, 7); g.fill(); g.fillRect(ix + ih * .12, iy + ih * .45, ih * .36, ih * .5);
    }};
  }
  /* Infinity (Delta XL / Kappa) hasta monitörü: mavi başlık, solda koyu etiket sütunu, dalgalar; sağda büyük renkli değerler,
     ikinci küçük değer sütunu ve nane yeşili tuş sütunu; altta değer satırı. nums: [etiket, değer, renk, ölçek, dolgu] */
  function drgMon(A, o = {}) {
    const rows = o.rows || [['ecg', '#3BE36B', 'II'], ['art', '#FF3B3B', 'ART'], ['pleth', '#AFC0EE', 'Pleth'], ['capno', '#F2E22E', 'CO₂', true], ['paw', '#BFE6F2', 'Paw', true], ['flow', '#BFE6F2', 'Flow']];
    const nums = o.nums || [['HR', '84', '#3BE36B', 1.3], ['ART', '120/80', '#FFE0E0', .75, '#C92A2A'], ['SpO₂', '100', '#FFFFFF', 1.1], ['etCO₂', '40', '#F2E22E', .95], ['Ppeak', '10.0', '#BFE6F2', .85], ['MV', '6.00', '#BFE6F2', .85]];
    const side = o.side || [['PVC', '0', '#3BE36B'], ['ST II', '-0.1', '#3BE36B'], ['(90)', '', '#FF6A6A'], ['PLS', '84', '#FFFFFF'], ['iCO₂', '0', '#F2E22E'], ['RR', '12', '#BFE6F2'], ['PEEP', '5', '#BFE6F2']];
    const kx = o.keys === false ? 1 : .845, L = [{t: 'box', x: 0, y: 0, w: 1, h: .072, fill: DB},
      {t: 'icon', g: 'menu', x: .008, y: .012, w: .03, h: .048, c: '#FFFFFF'}, {t: 'text', txt: o.bed || 'OR 3', x: .045, y: 0, w: .15, h: .072, c: '#FFFFFF', s: .034},
      {t: 'text', txt: '10:42', x: .3, y: 0, w: .4, h: .072, c: '#FFFFFF', s: .034, al: 'c'}, {t: 'icon', g: 'bell', x: kx - .05, y: .012, w: .04, h: .048, c: '#FFFFFF'}];
    const y0 = .08, wb = o.waveBottom || .82, rh = (wb - y0) / rows.length, lw = o.labelCol ?? .055;
    if (lw) L.push({t: 'box', x: 0, y: y0 - .005, w: lw, h: wb - y0 + .005, fill: '#262D33'});
    rows.forEach(([k, c, l, f], i) => {
      if (lw) L.push({t: 'text', txt: l, x: .004, y: y0 + i * rh, w: lw, h: rh * .5, c, s: Math.min(.024, rh * .3)});
      L.push({t: 'wave', k, x: lw + .008, y: y0 + i * rh, w: .58 - lw - .008, h: rh, c, fillUnder: !!f, fillAlpha: .9, span: k === 'ecg' ? 5 : 4, amp: f ? .42 : .36, lw: .004});
    });
    const nx = .59, nw = (o.side === false ? kx - .6 : .155), nh = (wb + .02 - y0) / nums.length;
    nums.forEach(([l, v, c, sc, fill], i) => {
      const y = y0 + i * nh;
      if (fill) L.push({t: 'box', x: nx + .005, y: y + nh * .22, w: nw - .01, h: nh * .72, fill, r: .008});
      L.push({t: 'text', txt: l, x: nx, y, w: .1, h: nh * .3, c: fill ? '#FF8A8A' : c, s: Math.min(.022, nh * .26)});
      L.push({t: 'text', txt: v, x: nx, y: y + nh * .14, w: nw - .008, h: nh * .9, c, s: Math.min(.12, nh * .62 * (sc || 1)), al: 'r', wt: 800});
    });
    if (o.side !== false) side.forEach(([l, v, c], i) => { const sh = (wb - y0) / side.length, y = y0 + i * sh; L.push({t: 'text', txt: l, x: .75, y, w: .09, h: sh * .45, c, s: Math.min(.019, sh * .3)}, {t: 'text', txt: v, x: .75, y: y + sh * .35, w: .09, h: sh * .6, c, s: Math.min(.04, sh * .5), al: 'r', wt: 800}); });
    const bot = o.bottom || [['RR', '12', '#FFFFFF'], ['Tcore', '36.8', '#FFFFFF'], ['NBP', '118/72', '#FF6A6A'], ['(88)', '', '#FF6A6A']];
    bot.forEach(([l, v, c], i) => L.push({t: 'text', txt: l, x: .01 + i * .2, y: wb + .015, w: .2, h: .04, c: '#8FA0AA', s: .022}, {t: 'text', txt: v, x: .01 + i * .2, y: wb + .05, w: .19, h: 1 - wb - .06, c, s: Math.min(.08, (1 - wb) * .55), wt: 800}));
    if (o.keys !== false) {
      L.push({t: 'box', x: kx, y: .072, w: 1 - kx, h: .928, fill: '#13201B'});
      const nk = o.nk || 12, kh = .92 / nk;
      for (let k = 0; k < nk; k++) L.push({t: 'box', x: kx + .006, y: .078 + k * kh, w: 1 - kx - .012, h: kh - .008, fill: k === 0 ? '#9FDCC6' : MINT, r: .006});
    }
    return {bg: '#000000', layout: L};
  }
  /* SmartPilot View / Infinity Explorer yan ekranı: mavi başlık; solda azalan konsantrasyon (Ce/Cp) grafiği ve izobolografik bantlar,
     altında ilaç tablosu; sağda satır satır yatay trend alanları (MAC, propofol, remifentanil, NMB) ve değer kutuları;
     sağ üstte büyük HR / ART / etCO₂ değerleri; en sağda nane yeşili tuşlar */
  function drgPilot(A, o = {}) {
    const ex = o.explorer, top = ex ? .12 : .075, L = [];
    if (ex) L.push({t: 'box', x: 0, y: 0, w: 1, h: .065, fill: '#2F5FA8'}, {t: 'text', txt: 'Dräger', x: .012, y: 0, w: .2, h: .065, c: '#FFFFFF', s: .036, wt: 800},
      {t: 'text', txt: 'Infinity Explorer', x: .6, y: 0, w: .39, h: .065, c: '#DDE8F6', s: .03, al: 'r', wt: 600});
    L.push({t: 'box', x: 0, y: ex ? .065 : 0, w: 1, h: ex ? .055 : .075, fill: DB},
      {t: 'text', txt: 'SmartPilot View', x: .012, y: ex ? .065 : 0, w: .3, h: ex ? .055 : .075, c: '#FFFFFF', s: .03},
      {t: 'box', x: .25, y: (ex ? .072 : .012), w: .12, h: (ex ? .04 : .05), fill: '#5B86C8', r: .008}, {t: 'text', txt: 'Ce / Cp', x: .25, y: (ex ? .072 : .012), w: .12, h: (ex ? .04 : .05), c: '#FFFFFF', s: .022, al: 'c'},
      {t: 'text', txt: '10:42', x: .7, y: ex ? .065 : 0, w: .16, h: ex ? .055 : .075, c: '#FFFFFF', s: .028, al: 'r'});
    /* sol grafik */
    L.push({t: 'box', x: .008, y: top + .02, w: .32, h: .55, fill: '#3B4654', stroke: '#6B7A88', lw: .003},
      {t: 'text', txt: 'Propofol Ce µg/mL  ·  Remifentanil Ce ng/mL', x: .012, y: top + .022, w: .31, h: .035, c: '#D6E0E8', s: .018},
      {t: 'box', x: .008, y: top + .59, w: .15, h: .33, fill: '#1A222A'}, {t: 'box', x: .165, y: top + .59, w: .163, h: .33, fill: '#1A222A'},
      {t: 'table', x: .012, y: top + .6, w: .142, h: .3, rows: [['Prop', '3.2', '#F2D22E'], ['Remi', '0.15', '#7FD3F2'], ['Rocu', '—', '#F08A4A']], s: .022, zebra: false},
      {t: 'text', txt: 'Bolus', x: .17, y: top + .6, w: .15, h: .04, c: '#AEBDC8', s: .02});
    for (let k = 0; k < 6; k++) L.push({t: 'box', x: .172 + (k % 3) * .052, y: top + .66 + Math.floor(k / 3) * .09, w: .046, h: .075, fill: k === 0 ? '#9FDCC6' : '#C9E3D8', r: .006});
    /* sağ üst büyük değerler */
    L.push({t: 'text', txt: 'Hypnotic state', x: .34, y: top + .02, w: .22, h: .05, c: '#E6EEF2', s: .026, wt: 600});
    [['HR', '84', '#3BE36B'], ['ART', '120', '#FF4040'], ['etCO₂', '40', '#FFFFFF']].forEach(([l, v, c], k) => {
      const x = .6 + k * .088; L.push({t: 'box', x, y: top + .015, w: .082, h: .11, stroke: c, lw: .003, r: .006}, {t: 'text', txt: l, x: x + .004, y: top + .02, w: .08, h: .025, c, s: .016}, {t: 'text', txt: v, x, y: top + .04, w: .078, h: .08, c, s: .06, al: 'r', wt: 800});
    });
    /* trend satırları */
    const rows = [['MAC', '#9AA8B6', '0.9', 'band'], ['Ce Prop', '#3FA9E0', '3.2', 'rise'], ['Ce Remi', '#E8D23F', '0.15', 'line'], ['BIS', '#8FD3F0', '42', 'flat'], ['NMB', '#F0743A', 'TOF 1', 'decay']];
    const ry = top + .15, rh = (.9 - ry) / rows.length;
    rows.forEach(([l, c, v], k) => {
      const y = ry + k * rh;
      L.push({t: 'box', x: .34, y: y + .005, w: .1, h: rh - .012, fill: '#232B33'}, {t: 'text', txt: l, x: .345, y: y + .005, w: .1, h: rh - .012, c: '#C9D4DA', s: .02},
        {t: 'box', x: .45, y: y + .005, w: .34, h: rh - .012, fill: '#1B2229'}, {t: 'box', x: .8, y: y + .01, w: .062, h: rh - .022, fill: '#2A343E', r: .006},
        {t: 'text', txt: v, x: .8, y: y + .01, w: .06, h: rh - .022, c, s: .026, al: 'r', wt: 800});
    });
    L.push({t: 'box', x: .45, y: .905, w: .34, h: .004, fill: '#4A5560'});
    for (let k = 0; k <= 6; k++) L.push({t: 'text', txt: `${k * 10 - 60}`, x: .44 + k * .055, y: .91, w: .04, h: .035, c: '#7F8E9A', s: .016, al: 'c'});
    if (ex) L.push({t: 'box', x: 0, y: .955, w: 1, h: .045, fill: '#2F5FA8'});
    L.push({t: 'box', x: .87, y: top, w: .13, h: (ex ? .955 : 1) - top, fill: '#13201B'});
    for (let k = 0; k < 8; k++) L.push({t: 'box', x: .877, y: top + .012 + k * .1, w: .116, h: .088, fill: k < 2 ? '#7FCDB9' : MINT, r: .006});
    return {bg: '#000000', layout: L, draw(g, t, api) {
      /* sol grafik: izobolografik bantlar ve azalan eğri */
      const [x, y, w, h] = api.R({x: .03, y: top + .07, w: .29, h: .46});
      [['rgba(110,160,225,.55)', .62], ['rgba(140,185,240,.45)', .42], ['rgba(170,205,250,.35)', .25]].forEach(([c, f]) => {
        g.fillStyle = c; g.beginPath(); g.moveTo(x, y + h);
        for (let k = 0; k <= 40; k++) { const u = k / 40; g.lineTo(x + w * u, y + h * (1 - f * Math.exp(-u * 2.6) - .05)); }
        g.lineTo(x + w, y + h); g.closePath(); g.fill();
      });
      g.strokeStyle = '#FFFFFF'; g.lineWidth = Math.max(2, h * .012); g.beginPath();
      for (let k = 0; k <= 60; k++) { const u = k / 60, yy = y + h * (.12 + .74 * (1 - Math.exp(-u * 3.4))); k ? g.lineTo(x + w * (.18 + u * .42), yy) : g.moveTo(x + w * .18, yy); } g.stroke();
      g.fillStyle = '#FFFFFF'; [.18, .6].forEach((u, k) => { g.beginPath(); g.arc(x + w * u, y + h * (k ? .84 : .12), h * .025, 0, 7); g.fill(); });
      g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 1; g.strokeRect(x, y, w, h);
      /* trend satırları */
      const rows2 = ['band', 'rise', 'line', 'flat', 'decay'], ry2 = top + .15, rh2 = (.9 - ry2) / 5, cols = ['#9AA8B6', '#3FA9E0', '#E8D23F', '#8FD3F0', '#F0743A'];
      rows2.forEach((s, k) => {
        const [tx, ty, tw, th] = api.R({x: .452, y: ry2 + k * rh2 + .01, w: .336, h: rh2 - .022}), base = ty + th * .95;
        g.fillStyle = cols[k]; g.strokeStyle = cols[k]; g.lineWidth = Math.max(2, th * .06);
        const f = u => s === 'band' ? .55 : s === 'rise' ? Math.min(.85, u * 2.2) * (1 - .1 * Math.sin(u * 9)) : s === 'line' ? .3 + .05 * Math.sin(u * 7 + t * .1) : s === 'flat' ? .45 + .06 * Math.sin(u * 13) : .9 * Math.exp(-u * 3);
        if (s === 'band') { g.globalAlpha = .55; g.fillRect(tx, ty + th * .25, tw, th * .5); g.globalAlpha = 1; return; }
        g.beginPath(); g.moveTo(tx, base); for (let q = 0; q <= 50; q++) { const u = q / 50; g.lineTo(tx + tw * u, base - th * .9 * f(u)); }
        if (s === 'line') { g.stroke(); return; }
        g.lineTo(tx + tw, base); g.closePath(); g.globalAlpha = .85; g.fill(); g.globalAlpha = 1;
      });
    }};
  }
  /* Elektronik gaz karıştırıcısının küçük LCD'si: mavi zemin, koyu lacivert yazı */
  function drgLCD() {
    return {bg: '#9CC2EE', layout: [
      {t: 'box', x: 0, y: 0, w: 1, h: .26, fill: '#86B2E6'}, {t: 'text', txt: 'O₂  /  Air', x: .04, y: 0, w: .6, h: .26, c: '#13305E', s: .17, wt: 800},
      {t: 'text', txt: 'O₂', x: .04, y: .3, w: .3, h: .22, c: '#13305E', s: .16}, {t: 'text', txt: '50 %', x: .4, y: .3, w: .56, h: .22, c: '#13305E', s: .2, al: 'r', wt: 800},
      {t: 'text', txt: 'Flow', x: .04, y: .54, w: .3, h: .2, c: '#13305E', s: .15}, {t: 'text', txt: '2.0 L/min', x: .3, y: .54, w: .66, h: .2, c: '#13305E', s: .17, al: 'r', wt: 800},
      {t: 'box', x: .05, y: .82, w: .9, h: .09, stroke: '#13305E', lw: .025}, {t: 'box', x: .06, y: .835, w: .42, h: .06, fill: '#13305E'}
    ]};
  }
  /* GE Carestation / Aisys ventilatör ekranı: solda basınç çubukları, ortada Paw (sarı), akım (yeşil), CO₂ (gri) eğrileri,
     sağında değer sütunu, en sağda gri menü tuşları (üstte sarı, altta turkuaz), altta açık gri ayar kutuları */
  function geVent(A, o = {}) {
    const tile = o.tile || '#C9CDD0', ink = o.ink || '#1A2026';
    const L = [
      {t: 'box', x: 0, y: 0, w: .845, h: .065, fill: '#0E1216'}, {t: 'text', txt: o.mode || 'VCV', x: .01, y: 0, w: .2, h: .065, c: '#E6EEF2', s: .032}, {t: 'text', txt: '10:42', x: .6, y: 0, w: .24, h: .065, c: '#E6EEF2', s: .03, al: 'r'},
      /* sol: Paw çubuğu ve döngü simgesi */
      {t: 'box', x: .03, y: .2, w: .02, h: .52, stroke: '#9AA3AA', fill: '#14191D'}, {t: 'box', x: .033, y: .58, w: .014, h: .14, fill: '#E6EEF2'}, {t: 'box', x: .02, y: .6, w: .04, h: .012, fill: '#FFFFFF'},
      {t: 'box', x: .1, y: .32, w: .016, h: .4, stroke: '#9AA3AA', fill: '#14191D'}, {t: 'box', x: .102, y: .6, w: .012, h: .05, fill: '#E8D640'},
      {t: 'text', txt: 'Paw', x: .01, y: .14, w: .1, h: .05, c: '#C9D0D5', s: .026}, {t: 'text', txt: '40', x: .055, y: .2, w: .04, h: .04, c: '#9AA3AA', s: .022}, {t: 'text', txt: '0', x: .055, y: .69, w: .04, h: .04, c: '#9AA3AA', s: .022},
      /* eğriler */
      {t: 'wave', k: 'paw', x: .15, y: .09, w: .55, h: .22, c: '#D8C878', l: 'Paw', span: 3.5, ls: .028},
      {t: 'wave', k: 'flow', x: .15, y: .33, w: .55, h: .24, c: '#3CCB7F', l: 'Flow', span: 3.5, ls: .028},
      {t: 'wave', k: 'capno', x: .15, y: .59, w: .55, h: .14, c: '#C9D0D5', l: 'CO₂', span: 3.5, amp: .5, ls: .028},
      /* değerler */
      {t: 'tile', x: .7, y: .1, w: .14, h: .17, l: 'Ppeak', v: 15, c: '#D8C878', al: 'r', live: true},
      {t: 'tile', x: .7, y: .28, w: .14, h: .1, l: 'PEEP', v: 5, c: '#D8C878', al: 'r'},
      {t: 'tile', x: .7, y: .39, w: .14, h: .16, l: 'MV', v: '5.0', c: '#3CCB7F', al: 'r'},
      {t: 'tile', x: .7, y: .56, w: .14, h: .16, l: 'EtCO₂', v: 38, c: '#E6EEF2', al: 'r', live: true},
      /* gaz satırı */
      {t: 'table', x: .15, y: .74, w: .55, h: .05, rows: [[`FiO₂ 50  EtO₂ 45   ${o.agent || 'Sev'} ${o.agent === 'Iso' ? '1.2 / 1.1' : '2.1 / 1.9'}   MAC 1.0`, '', '#E8D640']], s: .026, lc: '#E8D640', zebra: false}
    ];
    /* sağ menü tuşları */
    L.push({t: 'box', x: .845, y: 0, w: .155, h: 1, fill: '#1C2126'});
    for (let k = 0; k < 9; k++) { const top = k === 0, bot = k === 8; L.push({t: 'box', x: .855, y: .03 + k * .085, w: .135, h: .07, fill: top ? '#E8D640' : bot ? '#1E9E8C' : '#5A6066', r: .008}); }
    ['Menu', 'Alarms', 'Spiro', 'Trend', 'Checkout', 'Setup', 'Help'].forEach((s, k) => L.push({t: 'text', txt: s, x: .855, y: .115 + k * .085, w: .135, h: .07, c: '#E6EEF2', s: .024, al: 'c'}));
    /* alt ayar kutuları: 3 taze gaz + 7 ventilasyon */
    L.push({t: 'box', x: 0, y: .8, w: .845, h: .2, fill: '#2A3036'});
    const tiles = o.tiles || [['O₂ %', '50'], ['Total', '1.0'], [o.agent || 'Sev', o.agent === 'Iso' ? '1.2' : '2.0'], ['VT', '450'], ['RR', '12'], ['I:E', '1:2'], ['Tpause', 'Off'], ['PEEP', '5'], ['Pmax', '40'], ['More', '…']];
    tiles.forEach(([l, v], k) => {
      const x = .008 + k * .0835 + (k >= 3 ? .006 : 0);
      L.push({t: 'box', x, y: .82, w: .077, h: .16, fill: tile, r: .01}, {t: 'text', txt: l, x, y: .83, w: .077, h: .05, c: ink, s: .024, al: 'c', wt: 600}, {t: 'text', txt: v, x, y: .88, w: .077, h: .08, c: ink, s: .045, al: 'c', wt: 800});
    });
    return {bg: '#000000', layout: L};
  }
  /* GE CARESCAPE hasta monitörü: solda dalgalar, sağ sütunda HR/ART/SpO₂ değerleri, altta değer kutuları ve gri menü çubuğu */
  function geMon(A, o = {}) {
    const box = o.boxes;
    const L = [{t: 'box', x: 0, y: 0, w: 1, h: .055, fill: '#15191D'}, {t: 'text', txt: 'Adult', x: .01, y: 0, w: .2, h: .055, c: '#C9D0D5', s: .03}, {t: 'text', txt: '10:42', x: .7, y: 0, w: .29, h: .055, c: '#C9D0D5', s: .03, al: 'r'},
      {t: 'wave', k: 'ecg', x: .01, y: .08, w: .68, h: .17, c: '#3CE05A', l: 'II', span: 6, ls: .028},
      {t: 'wave', k: 'art', x: .01, y: .27, w: .68, h: .15, c: '#FF3B3B', l: 'ART', span: 7, ls: .028},
      {t: 'wave', k: 'pleth', x: .01, y: .44, w: .68, h: .12, c: '#38A8F0', l: 'SpO₂', span: 7, ls: .028},
      {t: 'wave', k: 'capno', x: .01, y: .57, w: .68, h: .1, c: '#E8D640', l: 'CO₂', span: 4, amp: .5, ls: .028}];
    const nums = [['HR', '60', '#3CE05A', .17, .14], ['ART', '120/82', '#FF3B3B', .13, .1], ['SpO₂', '97', '#38A8F0', .12, .1], ['EtCO₂', '36', '#E8D640', .1, .08]];
    let y = .07;
    nums.forEach(([l, v, c, h, s]) => { if (box) L.push({t: 'box', x: .71, y: y + .01, w: .28, h: h - .015, fill: c, r: .01}); L.push({t: 'text', txt: l, x: .71, y, w: .1, h: .04, c: box ? '#000' : c, s: .022}, {t: 'text', txt: v, x: .71, y: y + .02, w: .275, h: h - .02, c: box ? '#000' : c, s, wt: 800, al: 'r'}); y += h + .01; });
    L.push({t: 'box', x: 0, y: .69, w: 1, h: .005, fill: '#2A3036'},
      {t: 'text', txt: 'NIBP', x: .01, y: .7, w: .1, h: .04, c: '#FF3B3B', s: .022}, {t: 'text', txt: '125/85', x: .01, y: .73, w: .3, h: .13, c: '#FF3B3B', s: .1, wt: 800},
      {t: 'text', txt: 'AA', x: .33, y: .7, w: .1, h: .04, c: '#E8A33A', s: .022}, {t: 'text', txt: '2.0', x: .33, y: .74, w: .12, h: .1, c: '#E8A33A', s: .06, wt: 800},
      {t: 'trend', x: .45, y: .72, w: .2, h: .14, max: 100, lines: [{c: '#E8D640', base: 50, amp: 18, seed: 2}]},
      {t: 'bars', x: .66, y: .72, w: .12, h: .14, n: 6, c: '#E6EEF2'},
      {t: 'text', txt: 'T1  36.6   T2  36.8', x: .79, y: .74, w: .2, h: .1, c: '#E6EEF2', s: .03, al: 'r'});
    L.push({t: 'box', x: 0, y: .9, w: 1, h: .1, fill: '#2A3036'});
    for (let k = 0; k < 12; k++) L.push({t: 'box', x: .005 + k * .083, y: .91, w: .078, h: .08, fill: k === 0 ? '#2E9E58' : k === 11 ? '#E8D640' : '#6A7178', r: .006});
    return {bg: '#000000', layout: L};
  }
  /* Mindray ventilatör ekranı (A9/A8/A7): solda gaz tablosu ve iki akım çubuğu, ortada Paw (beyaz dolgu), akım (sarı), hacim/CO₂ (camgöbeği),
     sağında değerler, en sağda menü tuşları (biri mavi), altta ayar kutuları */
  function mrVent(A, o = {}) {
    const a7 = o.a7;
    const L = [
      {t: 'box', x: 0, y: 0, w: 1, h: .065, fill: '#0A0D10'}, {t: 'text', txt: 'Adult   VCV', x: .01, y: 0, w: .3, h: .065, c: '#E6EEF2', s: .032},
      {t: 'text', txt: '10:42', x: .7, y: 0, w: .2, h: .065, c: '#E6EEF2', s: .03, al: 'r'}, {t: 'box', x: .95, y: .012, w: .035, h: .04, fill: '#3CC24C', r: .006},
      {t: 'box', x: .21, y: .075, w: .64, h: .004, fill: '#2A3036'},
      /* gaz tablosu */
      {t: 'text', txt: 'Fi', x: .07, y: .08, w: .06, h: .04, c: '#8FA0AA', s: .024}, {t: 'text', txt: 'Et', x: .14, y: .08, w: .06, h: .04, c: '#8FA0AA', s: .024}
    ];
    [['O₂', '50', '45', '#3CC24C'], ['N₂O', '0', '0', '#4E8FE0'], [o.agent || 'Sev', '2.1', '1.9', '#E8D23F'], ['CO₂', '0', '36', '#E6EEF2']].forEach(([l, a, b, c], k) => {
      const y = .12 + k * .055; L.push({t: 'text', txt: l, x: .005, y, w: .07, h: .05, c, s: .026}, {t: 'text', txt: a, x: .065, y, w: .06, h: .05, c, s: .034, wt: 800, al: 'r'}, {t: 'text', txt: b, x: .135, y, w: .06, h: .05, c, s: .034, wt: 800, al: 'r'});
    });
    L.push({t: 'box', x: .01, y: .35, w: .19, h: .05, fill: '#2A3036', r: .008}, {t: 'text', txt: 'MAC 1.0', x: .01, y: .35, w: .19, h: .05, c: '#E6EEF2', s: .026, al: 'c'});
    /* iki sanal akım çubuğu (O₂ / hava) */
    [['#E8D23F', .62], ['#3CC24C', .48]].forEach(([c, v], k) => {
      const x = .04 + k * .08; L.push({t: 'box', x, y: .42, w: .05, h: .42, stroke: '#4A535A', fill: '#0E1216', r: .006}, {t: 'box', x: x + .02, y: .42 + .42 * (1 - v), w: .01, h: .42 * v - .01, fill: c}, {t: 'box', x: x + .006, y: .42 + .42 * (1 - v), w: .038, h: .012, fill: c});
    });
    L.push({t: 'box', x: .01, y: .88, w: .09, h: .09, fill: '#2A3036', r: .008}, {t: 'box', x: .11, y: .88, w: .09, h: .09, fill: '#2E7D3A', r: .008},
      {t: 'text', txt: 'O₂', x: .01, y: .88, w: .09, h: .09, c: '#E6EEF2', s: .026, al: 'c'}, {t: 'text', txt: 'Air', x: .11, y: .88, w: .09, h: .09, c: '#E6EEF2', s: .026, al: 'c'});
    /* eğriler */
    L.push({t: 'wave', k: 'paw', x: .22, y: .1, w: .5, h: .22, c: '#F4F6F7', l: 'Paw', fillUnder: true, fillAlpha: .85, span: 3.2, amp: .48, mid: .6, ls: .028},
      {t: 'wave', k: 'flow', x: .22, y: .35, w: .5, h: .2, c: '#E8B23A', l: 'Flow', fillUnder: !a7, span: 3.2, amp: .4, ls: .028},
      {t: 'wave', k: a7 ? 'capno' : 'resp', x: .22, y: .58, w: .5, h: .18, c: '#4EB8E8', l: a7 ? 'CO₂' : 'Vol', span: 3.2, amp: .4, ls: .028});
    /* değerler */
    [['Ppeak', '18', '#F4F6F7'], ['PEEP', '5', '#F4F6F7'], ['MV', '5.4', '#E8B23A'], ['VTe', '450', '#4EB8E8'], ['RR', '12', '#4EB8E8']].forEach(([l, v, c], k) =>
      L.push({t: 'tile', x: .73, y: .1 + k * .135, w: .125, h: .125, l, v, c, al: 'r', live: k === 0 || k === 3}));
    /* menü tuşları */
    for (let k = 0; k < 10; k++) L.push({t: 'box', x: .875, y: .09 + k * .078, w: .115, h: .066, fill: k === 4 ? '#3E5BD8' : k === 7 ? '#C9A43A' : k === 8 ? '#B8743A' : '#30363C', r: .008});
    /* ayar kutuları */
    if (a7) {
      for (let k = 0; k < 5; k++) L.push({t: 'box', x: .22 + k * .085, y: .79, w: .078, h: .08, fill: '#9DB4D8', r: .008});
      [['VT', '450'], ['RR', '12'], ['I:E', '1:2'], ['PEEP', '5'], ['Tp', '0']].forEach(([l, v], k) => L.push({t: 'text', txt: `${l} ${v}`, x: .22 + k * .085, y: .79, w: .078, h: .08, c: '#0E1A2E', s: .024, al: 'c', wt: 800}));
      L.push({t: 'box', x: .21, y: .895, w: .79, h: .1, fill: '#15191D'});
      for (let k = 0; k < 7; k++) L.push({t: 'box', x: .23 + k * .108, y: .905, w: .1, h: .08, fill: k >= 5 ? '#E8922E' : '#3A4148', r: .008});
    } else {
      L.push({t: 'box', x: .21, y: .82, w: .65, h: .16, fill: '#1C2126', r: .008});
      [['VT', '450'], ['RR', '12'], ['I:E', '1:2'], ['PEEP', '5'], ['Pmax', '30'], ['Tpause', '10%']].forEach(([l, v], k) => {
        const x = .22 + k * .09; L.push({t: 'box', x, y: .835, w: .082, h: .13, fill: '#353C43', r: .008}, {t: 'text', txt: l, x, y: .84, w: .082, h: .045, c: '#AEB8BE', s: .024, al: 'c'}, {t: 'text', txt: v, x, y: .885, w: .082, h: .07, c: '#FFFFFF', s: .042, al: 'c', wt: 800});
      });
      L.push({t: 'box', x: .22, y: .8, w: .06, h: .025, fill: '#F4F6F7', r: .004});
    }
    return {bg: '#000000', layout: L};
  }
  /* Mindray BeneVision hasta monitörü: solda sekiz dalga, sağda büyük renkli değerler, altta küçük değerler ve simge çubuğu */
  function mrMon(A) {
    const L = [{t: 'box', x: 0, y: 0, w: 1, h: .06, fill: '#15191D'}, {t: 'text', txt: 'Bed 03   Adult', x: .01, y: 0, w: .4, h: .06, c: '#C9D0D5', s: .03}, {t: 'text', txt: '10:42', x: .7, y: 0, w: .29, h: .06, c: '#C9D0D5', s: .03, al: 'r'}];
    [['ecg', '#3CE05A', 'II'], ['ecg', '#3CE05A', 'V'], ['pleth', '#38D0E8', 'Pleth'], ['art', '#FF3B3B', 'ART'], ['cvp', '#4E8FE0', 'CVP'], ['capno', '#E8A33A', 'CO₂'], ['resp', '#E8D23F', 'Resp'], ['eeg', '#E8D23F', 'AA']].forEach(([k, c, l], i) =>
      L.push({t: 'wave', k, x: .01, y: .075 + i * .085, w: .7, h: .085, c, l, span: k === 'ecg' ? 6 : 5, ls: .02, amp: .32}));
    [['HR', '60', '#3CE05A', .15, .13], ['SpO₂', '98', '#38D0E8', .1, .08], ['ART', '120/80', '#FF3B3B', .1, .075], ['CVP', '9', '#4E8FE0', .08, .06], ['EtCO₂', '38', '#E8A33A', .09, .07], ['Sev', '1.9', '#E8D23F', .1, .08]].forEach(([l, v, c, h, s], i, arr) => {
      const y = .075 + arr.slice(0, i).reduce((a, r) => a + r[3] + .01, 0);
      L.push({t: 'text', txt: l, x: .72, y, w: .1, h: .035, c, s: .02}, {t: 'text', txt: v, x: .72, y: y + .01, w: .27, h: h, c, s, wt: 800, al: 'r'});
    });
    L.push({t: 'text', txt: 'NIBP 118/72 (88)', x: .01, y: .77, w: .3, h: .07, c: '#E6EEF2', s: .034}, {t: 'text', txt: 'T 36.8', x: .32, y: .77, w: .15, h: .07, c: '#E6EEF2', s: .034});
    ['#4E8FE0', '#3CC24C', '#B184E8', '#E8D23F', '#B184E8'].forEach((c, k) => L.push({t: 'box', x: .5 + k * .035, y: .77, w: .012, h: .07, fill: c}));
    L.push({t: 'box', x: 0, y: .87, w: 1, h: .13, fill: '#101418'});
    for (let k = 0; k < 14; k++) L.push({t: 'box', x: .008 + k * .071, y: .885, w: .064, h: .1, fill: k === 1 ? '#C9A43A' : k === 2 ? '#7A3A30' : '#3A4148', r: .01});
    return {bg: '#000000', layout: L};
  }
  /* Getinge Flow ventilatör ekranı: lacivert-siyah zemin, solda iki sütun değer (sarı / mavi / yeşil / beyaz) ve dikey ajan çubuğu,
     sağda Paw (sarı), akım (yeşil), CO₂ (mavi) eğrileri, altta açık renk ayar kutuları; sağda koyu gri sabit tuş şeridi ve mavi düğme */
  function flowVent(A, o = {}) {
    const L = [
      {t: 'text', txt: 'Adult   O₂ 50%', x: .01, y: .01, w: .3, h: .05, c: '#C9D0D5', s: .026},
      {t: 'text', txt: o.mode || 'PRESSURE CONTROL', x: .38, y: .01, w: .36, h: .06, c: '#F4F6F7', s: .034, al: 'r'},
      {t: 'box', x: .01, y: .14, w: .32, h: .003, fill: '#2A3550'},
      /* değer sütunları */
      {t: 'tile', x: .01, y: .16, w: .16, h: .12, l: 'Ppeak', v: 21, c: '#E8D23F', al: 'r'},
      {t: 'tile', x: .17, y: .16, w: .16, h: .12, l: 'RR', v: 14, c: '#E8D23F', al: 'r'},
      {t: 'tile', x: .01, y: .29, w: .16, h: .1, l: 'Pmean', v: 9, c: '#4E8FE0', al: 'r'},
      {t: 'tile', x: .17, y: .29, w: .16, h: .1, l: 'VTe', v: 450, c: '#3CC24C', al: 'r', live: true},
      {t: 'tile', x: .01, y: .4, w: .16, h: .12, l: 'MVe', v: '2.8', c: '#4E8FE0', al: 'r'},
      {t: 'tile', x: .17, y: .4, w: .16, h: .12, l: 'O₂', v: 50, c: '#3CC24C', al: 'r'},
      {t: 'box', x: .01, y: .535, w: .32, h: .003, fill: '#2A3550'},
      {t: 'tile', x: .01, y: .55, w: .13, h: .1, l: 'EtCO₂', v: 36, c: '#F4F6F7', al: 'r', live: true},
      {t: 'tile', x: .01, y: .66, w: .13, h: .1, l: 'PEEP', v: 5, c: '#F4F6F7', al: 'r'},
      {t: 'tile', x: .23, y: .55, w: .1, h: .08, l: 'MAC', v: '0.9', c: '#F4F6F7', al: 'r'},
      /* dikey ajan çubuğu */
      {t: 'box', x: .25, y: .65, w: .06, h: .22, fill: '#E6EAED', r: .01}, {t: 'box', x: .262, y: .67, w: .036, h: .18, fill: '#0A0E1A'}, {t: 'box', x: .27, y: .74, w: .02, h: .1, fill: '#E6EAED'},
      /* eğriler */
      {t: 'box', x: .35, y: .1, w: .003, h: .74, fill: '#2A3550'},
      {t: 'wave', k: 'paw', x: .36, y: .1, w: .45, h: .24, c: '#E8D23F', l: 'Paw', span: 2.6, lw: .006, ls: .028},
      {t: 'box', x: .36, y: .345, w: .45, h: .002, fill: '#2A3550'},
      {t: 'wave', k: 'flow', x: .36, y: .35, w: .45, h: .24, c: '#3CC24C', l: 'Flow', span: 2.6, lw: .006, ls: .028},
      {t: 'box', x: .36, y: .595, w: .45, h: .002, fill: '#2A3550'},
      {t: 'wave', k: 'capno', x: .36, y: .6, w: .45, h: .22, c: '#3B6FE0', l: 'CO₂', span: 2.6, amp: .55, lw: .006, ls: .028},
      /* alt ayar kutuları */
      {t: 'box', x: 0, y: .88, w: .08, h: .12, fill: '#6A7178'}
    ];
    [['PEEP', '5'], ['P above', '15'], ['RR', '14'], ['I:E', '1:2'], ['O₂', '50'], ['Trig.', '0.5']].forEach(([l, v], k) => {
      const x = .09 + k * .12; L.push({t: 'box', x, y: .88, w: .115, h: .12, fill: '#E6E8EA'}, {t: 'text', txt: l, x, y: .885, w: .115, h: .04, c: '#3A4148', s: .022, al: 'c'}, {t: 'text', txt: v, x, y: .92, w: .115, h: .07, c: '#11181C', s: .042, al: 'c', wt: 800});
    });
    L.push({t: 'box', x: .66, y: .82, w: .15, h: .055, fill: '#D8E6F2'});
    /* sağ sabit tuş şeridi */
    L.push({t: 'box', x: .83, y: 0, w: .17, h: 1, fill: '#3A3F44'}, {t: 'box', x: .855, y: .04, w: .07, h: .1, fill: '#E8B84A', r: .008}, {t: 'text', txt: 'O₂', x: .93, y: .05, w: .06, h: .05, c: '#E6EEF2', s: .024});
    [['Menu', .3], ['Alarm', .38], ['Trends', .46], ['Hold', .6], ['Lock', .68]].forEach(([s, y]) => L.push({t: 'text', txt: s, x: .84, y, w: .15, h: .05, c: '#C9D0D5', s: .026, al: 'c'}));
    L.push(circ(.915, .85, .17, A, {fill: '#5BB7EA', stroke: '#BFE6FA', lw: .01}), circ(.905, .85, .08, A, {fill: '#4A5258'}));
    return {bg: '#03061A', layout: L, draw(g, t, api) {
      /* yeşil "taze gaz" simgesi (dilimli daire) */
      const [x, y, w] = api.R({x: .855, y: .17, w: .07, h: 0}), r = w * .45;
      g.fillStyle = '#B8E86A'; g.beginPath(); g.moveTo(x + w / 2, y + r); g.arc(x + w / 2, y + r, r, .5, Math.PI * 2 - .5); g.closePath(); g.fill();
    }};
  }
  /* Genel ventilatör ekranı (tür sayfası, marka arayüzü taklit edilmez): solda eğriler, sağda değer sütunu, altta ayar kutuları */
  function genVent() {
    const L = [{t: 'box', x: 0, y: 0, w: 1, h: .08, fill: '#0C161C'}, {t: 'text', txt: 'VCV · Adult', x: .01, y: 0, w: .4, h: .08, c: '#E6EEF2', s: .036}, {t: 'text', txt: '10:42', x: .7, y: 0, w: .29, h: .08, c: '#6F8796', s: .032, al: 'r'},
      {t: 'wave', k: 'paw', x: .01, y: .1, w: .66, h: .22, c: '#F2C531', l: 'Paw', grid: true, ls: .028},
      {t: 'wave', k: 'flow', x: .01, y: .33, w: .66, h: .22, c: '#4FD1BE', l: 'Flow', grid: true, ls: .028},
      {t: 'wave', k: 'capno', x: .01, y: .56, w: .66, h: .18, c: '#E6EEF2', l: 'CO₂', grid: true, amp: .45, ls: .028}];
    [['Ppeak', 18, 'cmH₂O', '#F2C531'], ['PEEP', 5, 'cmH₂O', '#F2C531'], ['VTe', 450, 'mL', '#4FD1BE'], ['MV', '5.4', 'L/min', '#4FD1BE'], ['EtCO₂', 36, 'mmHg', '#E6EEF2']].forEach(([l, v, u, c], k) =>
      L.push({t: 'tile', x: .69, y: .1 + k * .128, w: .3, h: .12, l, v, u, c, fill: '#0A1318', r: .01, live: k === 0 || k === 2}));
    L.push({t: 'box', x: 0, y: .77, w: 1, h: .23, fill: '#0C161C'});
    [['Mode', 'VCV'], ['VT', '450'], ['RR', '12'], ['I:E', '1:2'], ['PEEP', '5'], ['FiO₂', '50'], ['Plimit', '35']].forEach(([l, v], k) => {
      const x = .01 + k * .141; L.push({t: 'box', x, y: .8, w: .13, h: .17, fill: '#16262E', stroke: '#2C4652', r: .015}, {t: 'text', txt: l, x, y: .81, w: .13, h: .05, c: '#6F8796', s: .028, al: 'c'}, {t: 'text', txt: v, x, y: .87, w: .13, h: .08, c: '#E6EEF2', s: .05, al: 'c', wt: 800});
    });
    return {bg: '#05090C', layout: L};
  }

  /* ---------- Dräger bölümleri (Atlan / Perseus) ----------
     'd-workstation' kurucusuna cfg.sections ile verilir; ölçüler cfg.drg içindedir (m; ön yüz +z, zemin y = 0):
     base {kind:'frame'|'platform'}, cab {x,w,y0,y1,d,z, fronts:[{x0,x1,y0,y1, kind, shade, hole, handle, lock, label}]}, top, tower, hous,
     mixer, vap, bs, drive, mons. Ölçüler üretici fotoğrafındaki oranlardan tahmin edilmiştir. */
  const txtD = (text, w, h, o = {}) => decal(w, h, (c, Wd, Hh) => {
    if (o.bg) { c.fillStyle = o.bg; c.fillRect(0, 0, Wd, Hh); }
    c.fillStyle = o.c || '#5B656C'; c.font = `${o.it ? 'italic ' : ''}${o.wt || 700} ${Math.round(Hh * (o.s || .72))}px "Archivo", Arial, sans-serif`;
    c.textBaseline = 'middle'; c.textAlign = o.al === 'l' ? 'left' : o.al === 'r' ? 'right' : 'center';
    c.fillText(text, o.al === 'l' ? 3 : o.al === 'r' ? Wd - 3 : Wd / 2, Hh / 2);
  }, o.px || 512);
  const mk = (geo, mat) => { const m = new THREE.Mesh(geo, mat); m.castShadow = m.receiveShadow = true; return m; };
  function drgMats(ctx) {
    if (ctx.dm) return ctx.dm;
    const C = ctx.C;
    return (ctx.dm = {
      body: M.plastic(C.body, .38), front: M.plastic(C.drawer, .34), front2: M.plastic(0xD9DDE0, .4), trim: M.plastic(C.trim, .36),
      white: M.plastic(0xF6F7F7, .33), grey: M.plastic(0xBCC3C8, .42), mid: M.plastic(0x949CA3, .4), seam: M.matte(0x6E777E, .7),
      dark: M.matte(0x22282D, .55), black: M.plastic(0x0E1215, .25), chrome: M.chrome(), metal: M.metal(0xC4CBD0, .3), knob: M.plastic(0xCDD2D6, .32)
    });
  }
  /* Şasi: gri U çerçeve (Atlan) ya da açık gri platform (Perseus) ve döner tekerlekler */
  function drgBase(ctx) {
    const {g, cfg, P} = ctx, B = cfg.drg.base, m = drgMats(ctx), bw = B.w, bd = B.d, cr = B.cr, at = [];
    const lm = M.color(B.accent || 0xC9DA4E, .4);
    if (B.kind === 'frame') {
      const fm = M.plastic(B.color, .42), cap = M.plastic(B.cap, .38), h = B.h, y = B.y;
      [-1, 1].forEach(s => {
        put(g, rbox(.075, h, bd - .04, .02, fm), s * (bw / 2 - .0375), y, 0);
        [-1, 1].forEach(t => put(g, rbox(.083, h + .008, .05, .02, cap), s * (bw / 2 - .0375), y, t * (bd / 2 - .03)));
      });
      put(g, rbox(bw - .14, h * .8, .065, .016, fm), 0, y - h * .06, bd / 2 - .05);
      put(g, box(bw - .16, .004, .05, cap), 0, y + h * .34 - .002, bd / 2 - .05);
      put(g, rbox(bw - .14, h * .8, .065, .016, fm), 0, y - h * .06, -bd / 2 + .05);
      /* merkezi fren pedalı ve yeşil-sarı durum çizgisi */
      put(g, box(.15, .005, .002, lm), bw * .3, y - h * .28, bd / 2 - .0165);
      put(g, box(.005, .034, .002, lm), bw * .3 - .075, y - h * .1, bd / 2 - .0165);
      put(g, rbox(.07, .02, .03, .008, M.plastic(0x6E767C, .45)), bw * .22, y - h * .45, bd / 2 - .02);
      [-1, 1].forEach(sx => [-1, 1].forEach(sz => at.push([sx * B.cx, sz * B.cz, y - h / 2])));
    } else {
      const pm = M.plastic(B.color, .45);
      put(g, rbox(bw, B.h, bd, .045, pm), 0, B.y, 0);
      put(g, rbox(bw - .1, .006, bd - .18, .02, M.matte(B.tread || 0xA3AAB0, .85)), 0, B.y + B.h / 2, .015);
      put(g, rbox(bw - .02, .02, .04, .01, M.plastic(0xE3E6E8, .4)), 0, B.y + B.h / 2 - .006, bd / 2 - .02);
      put(g, box(.17, .004, .004, lm), bw * .28, B.y + B.h / 2 + .0035, bd / 2 - .055);
      put(g, box(.004, .004, .12, lm), bw * .28 + .085, B.y + B.h / 2 + .0035, bd / 2 - .113);
      [-1, 1].forEach(sx => [-1, 1].forEach(sz => at.push([sx * B.cx, sz * B.cz, B.y - B.h / 2])));
    }
    const tire = M.rubber(B.tire || 0x2B3440), hub = M.plastic(B.hub || 0xF1F3F4, .35), fork = M.plastic(B.fork || 0xD7DCDF, .4), axle = M.metal(0x9AA3AA, .35);
    const tg = new THREE.CylinderGeometry(cr, cr, .032, 28), tg2 = new THREE.TorusGeometry(cr * .93, cr * .1, 8, 28), hg = new THREE.CylinderGeometry(cr * .72, cr * .72, .036, 24), ag = new THREE.CylinderGeometry(cr * .22, cr * .22, .04, 12);
    at.forEach(([x, z, yTop]) => {
      const c = new THREE.Group(); c.position.set(x, 0, z); g.add(c);
      put(c, mk(tg, tire), 0, cr, 0, 0, 0, Math.PI / 2);
      [-1, 1].forEach(s => put(c, mk(tg2, tire), s * .014, cr, 0, 0, Math.PI / 2, 0));
      put(c, mk(hg, hub), 0, cr, 0, 0, 0, Math.PI / 2); put(c, mk(ag, axle), 0, cr, 0, 0, 0, Math.PI / 2);
      [-1, 1].forEach(s => put(c, rbox(.006, cr * 1.25, cr * 1.15, .002, fork), s * .023, cr * 1.3, -cr * .1));
      const ft = Math.max(2 * cr + .008, yTop - .006);
      put(c, rbox(.054, .012, cr * 1.15, .004, fork), 0, ft, -cr * .1);
      if (yTop - ft > .012) put(c, cyl(.012, .012, yTop - ft, axle, 12), 0, (yTop + ft) / 2, 0);
    });
    P('d-base', B.cx, cr * 1.6, B.cz + .05);
  }
  /* Dolap: girintili gövde + kalın ön kapaklar (aradaki derzler koyu görünür); pencere (hole) kesit gösterimi içindir */
  function drgCabinet(ctx) {
    const {g, cfg, P} = ctx, K = cfg.drg.cab, m = drgMats(ctx), zf = K.z + K.d / 2, fd = .06;
    put(g, rbox(K.w, K.y1 - K.y0, K.d - fd, .014, m.body), K.x, (K.y0 + K.y1) / 2, K.z - fd / 2);
    put(g, box(K.w - .012, K.y1 - K.y0 - .006, .002, m.seam), K.x, (K.y0 + K.y1) / 2, zf - fd + .001);
    if (K.plinth) put(g, rbox(K.w - .05, K.plinth[1] - K.plinth[0], K.d - .08, .01, M.plastic(0xC3C9CD, .5)), K.x, (K.plinth[0] + K.plinth[1]) / 2, K.z - .03);
    K.fronts.forEach(f => {
      const gap = .0035, X0 = f.x0 + gap / 2, X1 = f.x1 - gap / 2, Y0 = f.y0 + gap / 2, Y1 = f.y1 - gap / 2, w = X1 - X0, h = Y1 - Y0, cx = (X0 + X1) / 2, cy = (Y0 + Y1) / 2;
      const mat = f.shade ? m.front2 : m.front, inset = f.inset || 0, zc = zf - (fd - .004) / 2 - .002 - inset;
      if (f.kind === 'recess') { put(g, box(w, h, .004, m.front2), cx, cy, zf - fd + .006); return; }
      if (f.hole) {
        const [hx0, hx1, hy0, hy1] = f.hole, blk = (a0, a1, b0, b1) => { if (a1 - a0 > .002 && b1 - b0 > .002) put(g, box(a1 - a0, b1 - b0, fd - .004, mat), (a0 + a1) / 2, (b0 + b1) / 2, zc); };
        blk(X0, hx0, Y0, Y1); blk(hx1, X1, Y0, Y1); blk(hx0, hx1, hy1, Y1); blk(hx0, hx1, Y0, hy0);
        put(g, box(hx1 - hx0, hy1 - hy0, .002, M.matte(0x101418, .6)), (hx0 + hx1) / 2, (hy0 + hy1) / 2, zf - fd + .003);
        put(g, box(hx1 - hx0 + .004, hy1 - hy0 + .004, .003, M.glass(0x3A4A56, .22)), (hx0 + hx1) / 2, (hy0 + hy1) / 2, zf - .003);
      } else put(g, rbox(w, h, fd - .004, .006, mat), cx, cy, zc);
      const zF = zf - inset;
      if (f.handle === 'grip') { put(g, box(w * .6, .007, .003, m.seam), cx, Y1 - .01, zF + .0012); put(g, box(w * .6, .003, .006, m.white), cx, Y1 - .0055, zF + .002); }
      if (f.handle === 'bar') {
        put(g, box(w * .9, .016, .002, m.seam), cx - w * .02, cy + .004, zF + .001);
        put(g, rbox(w * .9, .011, .014, .005, m.grey), cx - w * .02, cy + .004, zF + .007);
      }
      if (f.lock) { put(g, cyl(.008, .008, .006, m.metal, 20), f.lock[0], f.lock[1], zF + .003, Math.PI / 2); put(g, box(.0015, .008, .002, m.dark), f.lock[0], f.lock[1], zF + .0065); }
      if (f.label) { const lb = f.label, d = txtD(lb.t, lb.w, lb.h, {c: lb.c || '#7A848B', it: lb.it, wt: lb.wt || 600}); if (lb.rot) d.rotation.z = lb.rot; put(g, d, lb.x, lb.y, zF + .0008).rotation.z = lb.rot || 0; }
    });
    /* yan havalandırma yarıkları */
    for (let k = 0; k < 7; k++) put(g, box(.002, .006, K.d * .4, m.seam), K.x + K.w / 2 + .0005, K.y0 + .06 + k * .014, K.z - K.d * .15);
    P('d-drawer', K.pin[0], K.pin[1], zf + .02);
  }
  /* Çalışma tablası: üst plaka (derzli), kalın ön kuşak (model yazısı), yan standart raylar ve yan tutamaklar */
  function drgWorktop(ctx) {
    const {g, cfg, P} = ctx, T = cfg.drg.top, m = drgMats(ctx), y = T.y, x = T.x || 0, zf = T.z + T.d / 2, bh = T.band;
    put(g, rbox(T.w, .04, T.d, .014, m.trim), x, y - .02, T.z);
    (T.seams || []).forEach(sx => put(g, box(.0025, .002, T.d - .04, m.seam), sx, y + .0003, T.z + .01));
    put(g, rbox(T.w - .01, bh + .006, .06, .014, m.white), x, y - .04 - bh / 2 + .003, zf - .03);
    put(g, box(T.w - .03, .003, .002, m.seam), x, y - .04, zf + .0005);
    put(g, txtD(T.label, .19, .024, {c: '#88929A', it: true, wt: 600, al: 'r'}), x + T.w / 2 - .115, y - .04 - bh * (T.labelY ?? .45), zf + .0008);
    const ry = y - .04 - bh * .5;
    [-1, 1].forEach(s => {
      const sx = x + s * (T.w / 2 + .012);
      put(g, box(.01, .025, T.d * .62, m.metal), sx, ry, T.z - T.d * .05);
      [-1, 1].forEach(t => put(g, box(.016, .016, .02, m.metal), x + s * (T.w / 2 + .004), ry, T.z - T.d * .05 + t * T.d * .26));
    });
    (T.hs || [1]).forEach(s => {
      const hx = x + s * (T.w / 2 + .052), hz = zf - .045, gy = y - .04 - bh * .45;
      [-1, 1].forEach(t => put(g, cyl(.0065, .0065, .05, m.metal, 12), x + s * (T.w / 2 + .026), gy + t * .035, hz, 0, 0, Math.PI / 2));
      if (T.handle === 'u') put(g, cyl(.009, .009, Math.max(.1, bh + .02), m.knob, 16), hx, gy, hz);
      else put(g, rbox(.026, .125, .03, .012, M.plastic(0xD3D8DB, .45)), hx, gy, hz);
    });
    P('d-worktop', x + T.w * .12, y + .01, T.z + T.d * .36);
    P('d-rail', x + T.w / 2 + .016, ry, T.z + T.d * .22);
  }
  /* Kule: alt gövde (ön panel, derz, marka), yan yarıklar, monitör kolu pivot direkleri */
  function drgTower(ctx) {
    const {g, cfg} = ctx, R = cfg.drg.tower, m = drgMats(ctx), h = R.y1 - R.y0, zf = R.z + R.d / 2;
    put(g, rbox(R.w, h + .02, R.d, .03, m.body), R.x, R.y0 + h / 2, R.z);
    put(g, rbox(R.w - .024, h - .03, .008, .012, m.white), R.x, R.y0 + h / 2 + .004, zf + .002);
    if (R.seamX != null) put(g, box(.003, h - .06, .002, m.seam), R.seamX, R.y0 + h / 2 + .004, zf + .0065);
    if (R.brand) put(g, txtD('Dräger', .085, .026, {c: '#4A6C9C', wt: 600}), R.brand[0], R.brand[1], zf + .0065);
    [-1, 1].forEach(s => { for (let k = 0; k < 8; k++) put(g, box(.002, .006, R.d * .42, m.seam), R.x + s * (R.w / 2 + .0005), R.y0 + .05 + k * .013, R.z - R.d * .12); });
    (R.posts || []).forEach(([px, py, pz, ph]) => {
      put(g, cyl(.023, .023, ph, m.white, 24), px, py, pz);
      put(g, cyl(.026, .025, .022, m.grey, 24), px, py + ph / 2 + .011, pz);
      put(g, cyl(.025, .026, .014, m.grey, 24), px, py - ph / 2 - .007, pz);
      put(g, rbox(Math.abs(px - R.x) - R.w / 2 + .02, .05, .04, .01, m.trim), (px + R.x + Math.sign(px - R.x) * R.w / 2) / 2, py - ph * .2, pz - .005);
    });
  }
  /* Ventilatör ekran gövdesi: beyaz kasa, gri iç çerçeve, üstte marka, altta LED'ler, tuş ve döner düğme */
  function drgScreen(ctx) {
    const {g, cfg, screens, parts} = ctx, S = cfg.drg.hous, m = drgMats(ctx);
    const sg = new THREE.Group(); sg.position.set(S.x, S.y, S.z); sg.rotation.x = S.tilt || 0; g.add(sg);
    const [bl, bt, br, bb] = S.bezel, HW = S.w + bl + br, HH = S.h + bt + bb, ox = (bl - br) / 2, oy = (bb - bt) / 2;
    put(sg, rbox(HW, HH, S.d, .022, m.white), 0, 0, -S.d / 2);
    put(sg, rbox(HW - .03, HH - .03, .05, .02, m.trim), 0, 0, -S.d - .02);
    const fr = S.frame || .012;
    put(sg, rbox(S.w + fr * 2, S.h + fr * 2, .004, .005, M.plastic(S.frameC || 0x8C949A, .4)), ox, oy, .001);
    put(sg, box(S.w + .003, S.h + .003, .002, m.black), ox, oy, .0032);
    const scr = makeScreen(S.w, S.h, S.spec, S.px || 1280); put(sg, scr.mesh, ox, oy, .0048); screens.push(scr);
    put(sg, txtD('Dräger', .07, .017, {c: '#5A7398', wt: 600}), 0, HH / 2 - bt / 2, .0006);
    const by = -HH / 2 + bb * .5;
    put(sg, cyl(.0065, .0065, .004, M.led(0xA6E05A), 20), -HW / 2 + .03, by, .002, Math.PI / 2);
    put(sg, cyl(.007, .007, .004, M.plastic(0xA9D2EE, .35), 20), -HW / 2 + .055, by, .002, Math.PI / 2);
    const kx = HW / 2 - (S.knobR ?? .09), ax = HW / 2 - .035;
    put(sg, cyl(.0065, .0065, .004, M.led(0xF5D631), 20), ax, by, .002, Math.PI / 2);
    put(sg, cyl(.004, .004, .003, m.mid, 12), ax + .016, by, .0015, Math.PI / 2);
    put(sg, cyl(.022, .023, .016, m.knob, 32), kx, by - .004, .008, Math.PI / 2);
    put(sg, torus(.0225, .0022, M.plastic(0xB7BEC3, .4), 32), kx, by - .004, .0155);
    put(sg, cyl(.014, .014, .002, M.plastic(0xE3E7EA, .3), 24), kx, by - .004, .0165, Math.PI / 2);
    sg.updateMatrixWorld(true); g.updateMatrixWorld(true);
    parts.push({key: 'd-vscreen', at: sg.localToWorld(V3(ox, oy, .04))}, {key: 'knob', at: sg.localToWorld(V3(kx, by, .03))}, {key: 'alarm', at: sg.localToWorld(V3(ax, by + .01, .02))});
    return {sx: S.x, sy: S.y, sz: S.z};
  }
  /* Elektronik gaz karıştırıcı paneli (açık mavi): LCD, sağda toplam akış tüpü ve akış düğmesi, solda O₂+ (flush) tuşu */
  function drgMixer(ctx) {
    const {g, cfg, screens, P} = ctx, X = cfg.drg.mixer, m = drgMats(ctx), zf = X.z + .014;
    put(g, rbox(X.w + .016, X.h + .016, .008, .026, m.trim), X.x, X.y, X.z + .004);
    put(g, rbox(X.w, X.h, .014, .022, M.plastic(0xBFDAE8, .34)), X.x, X.y, X.z + .007);
    const lw = X.w * .33, lh = X.h * .36, lx = X.x - X.w * .06, ly = X.y + X.h * .07;
    put(g, rbox(lw + .014, lh + .014, .004, .004, M.plastic(0x98B0BF, .4)), lx, ly, zf + .002);
    put(g, box(lw + .002, lh + .002, .002, m.black), lx, ly, zf + .0045);
    const lcd = makeScreen(lw, lh, drgLCD(), 512); put(g, lcd.mesh, lx, ly, zf + .006); screens.push(lcd);
    const rx = X.x - X.w * .38, ry = X.y + X.h * .3;
    put(g, cyl(.013, .013, .008, m.white, 24), rx, ry, zf + .004, Math.PI / 2); put(g, torus(.0135, .0018, m.grey, 24), rx, ry, zf + .008);
    const tx = X.x + X.w * .33, th = X.h * .46, ty = X.y + X.h * .1;
    put(g, rbox(.024, th + .01, .006, .008, M.plastic(0x58636B, .45)), tx, ty, zf + .003);
    put(g, cyl(.0065, .0065, th, M.glass(0xEAF5FA, .5), 16), tx, ty, zf + .009);
    put(g, cyl(.005, .005, .009, m.white, 12), tx, ty - th * .28, zf + .009);
    put(g, cyl(.016, .016, .018, m.white, 28), tx, X.y - X.h * .3, zf + .009, Math.PI / 2);
    put(g, torus(.016, .0022, m.grey, 28), tx, X.y - X.h * .3, zf + .017);
    put(g, txtD('+', .01, .01, {c: '#5A6670'}), tx + .022, X.y - X.h * .3, zf + .001);
    const fx = X.x - X.w * .3, fy = X.y - X.h * .32;
    put(g, rbox(.052, .021, .01, .0099, M.plastic(0xE7F2F7, .34)), fx, fy, zf + .005);
    put(g, txtD('O₂+', .03, .012, {c: '#2F5D86', wt: 800}), fx, fy, zf + .0103);
    put(g, rbox(.026, .013, .003, .002, m.grey), X.x - X.w * .07, fy, zf + .0015);
    put(g, txtD('Fresh gas', .05, .009, {c: '#5A7486', wt: 600}), lx, ly - lh / 2 - .011, zf + .0008);
    P('d-gas', lx, ly, zf + .03); P('d-flush', fx, fy, zf + .025);
  }
  /* Dräger Vapor 3000 (ajan renkli halkalı üst ayar kadranı, kilit kolu, ön dolum girişi, seviye camı) ve D-Vapor (desfluran:
     mavi yuvarlak dolum kapağı, sarı durum LED'i, güç kablosu) */
  const dialTex = agent => DEV3D.H.canvasTex(512, 40, (c, Wd, Hh) => {
    c.fillStyle = '#E4E8EA'; c.fillRect(0, 0, Wd, Hh); c.fillStyle = '#2E363C'; c.strokeStyle = '#2E363C'; c.lineWidth = 2;
    const max = agent === 'des' ? 18 : agent === 'iso' ? 5 : 8, step = agent === 'des' ? 2 : 1;
    c.font = `700 ${Math.round(Hh * .46)}px Arial`; c.textAlign = 'center'; c.textBaseline = 'middle';
    for (let v = 0; v <= max; v += step) { const u = ((v / max - .5) * .46 + 1) % 1, x = u * Wd; c.fillText(String(v), x, Hh * .64); c.beginPath(); c.moveTo(x, 0); c.lineTo(x, Hh * .24); c.stroke(); }
  });
  function drgVapor(g, x, y, z, agent, kind, m) {
    const col = AG[agent] || 0xF2C531, v = new THREE.Group(); v.position.set(x, y, z); g.add(v);
    const W = .1, Dp = .15, Hb = kind === 'dvapor' ? .19 : .175, cm = M.plastic(col, .35), fz = Dp / 2;
    put(v, rbox(W, Hb, Dp, .016, m.white), 0, Hb / 2, 0);
    put(v, rbox(W * .8, Hb * .52, .004, .006, M.plastic(0xEBEEF0, .38)), 0, Hb * .33, fz + .001);
    put(v, rbox(.013, .075, .005, .004, M.glass(0xD8ECF4, .65)), W * .3, Hb * .31, fz + .004);
    put(v, box(.008, .032, .002, M.color(agent === 'des' ? 0xD5E2EE : 0xF1E4A2, .3)), W * .3, Hb * .26, fz + .004);
    for (let k = 0; k < 4; k++) put(v, box(.006, .0012, .001, m.seam), W * .3 + .009, Hb * .2 + k * .016, fz + .0035);
    put(v, txtD('Dräger', .03, .008, {c: '#6A7880', wt: 600}), -W * .18, Hb * .93, fz + .001);
    if (kind === 'dvapor') {
      put(v, cyl(.019, .019, .012, cm, 28), W * .12, Hb * .8, fz + .005, Math.PI / 2);
      put(v, cyl(.009, .009, .004, m.white, 20), W * .12, Hb * .8, fz + .012, Math.PI / 2);
      put(v, box(.003, .014, .002, m.mid), W * .12, Hb * .8, fz + .0145);
      put(v, rbox(.018, .012, .003, .003, M.led(0xF2C531)), -W * .2, Hb * .5, fz + .003);
      put(v, decal(.04, .05, (c, Wd, Hh) => { c.fillStyle = '#5E6A72'; for (let k = 0; k < 5; k++) c.fillRect(4, 6 + k * Hh * .18, Wd * (k % 2 ? .55 : .8), Hh * .07); }, 128), -W * .14, Hb * .28, fz + .0035);
      g.add(tube([V3(x + W / 2 - .01, y + .03, z - Dp / 2 - .005), V3(x + W / 2 + .01, y + .01, z - Dp / 2 - .03), V3(x + W / 2, y - .02, z - Dp / 2 - .08)], .004, M.rubber(0x2B3136), 20, 8));
    } else {
      put(v, decal(.05, .06, (c, Wd, Hh) => {
        c.fillStyle = '#' + col.toString(16).padStart(6, '0'); c.beginPath(); c.moveTo(Wd * .5, Hh * .12); c.quadraticCurveTo(Wd * .85, Hh * .55, Wd * .5, Hh * .78); c.quadraticCurveTo(Wd * .15, Hh * .55, Wd * .5, Hh * .12); c.fill();
        c.strokeStyle = '#8A949A'; c.lineWidth = 2; c.beginPath(); c.moveTo(Wd * .5, 0); c.lineTo(Wd * .5, Hh * .14); c.stroke();
        c.fillStyle = '#5E6A72'; c.font = `700 ${Hh * .1}px Arial`; c.textAlign = 'center'; c.fillText(agent === 'iso' ? 'Isoflurane' : 'Sevoflurane', Wd * .5, Hh * .95);
      }, 128), -W * .1, Hb * .4, fz + .0035);
      put(v, cyl(.008, .011, .018, cm, 20), -W * .1, Hb * .72, fz + .006, Math.PI / 2 - .3);
      put(v, cyl(.0045, .0045, .02, m.mid, 12), -W * .1, Hb * .72, fz + .012, Math.PI / 2 - .3);
    }
    const dz = -.006, dy = Hb;
    put(v, cyl(.047, .049, .034, M.plastic(0xE0E4E7, .34), 40), 0, dy + .017, dz);
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(.0495, .0495, .016, 40, 1, true), new THREE.MeshStandardMaterial({map: dialTex(agent), roughness: .45})); ring.position.set(0, dy + .015, dz); v.add(ring);
    put(v, cyl(.048, .048, .011, cm, 40), 0, dy + .0395, dz);
    put(v, cyl(.043, .046, .012, M.plastic(0xC9CFD3, .34), 40), 0, dy + .051, dz);
    put(v, cyl(.006, .006, .03, m.mid, 12), -.03, dy + .07, dz - .02);
    put(v, rbox(.05, .012, .015, .005, m.mid), -.012, dy + .086, dz - .02);
    put(v, box(.006, .01, .001, m.dark), 0, dy + .02, dz + .0496);
    put(v, rbox(W * .72, .07, .035, .008, m.grey), 0, Hb * .7, -Dp / 2 - .014);
    return v;
  }
  function drgVapors(ctx) {
    const {g, cfg, P} = ctx, V = cfg.drg.vap, m = drgMats(ctx);
    put(g, rbox(V.bw, .075, .04, .01, m.grey), V.bx, V.y + .125, V.z - .11);
    put(g, cyl(.005, .005, V.bw * .9, m.chrome, 12), V.bx, V.y + .168, V.z - .1, 0, 0, Math.PI / 2);
    put(g, rbox(V.bw, .018, .16, .006, m.trim), V.bx, V.y - .009, V.z - .02);
    V.list.forEach(([agent, x, kind]) => drgVapor(g, x, V.y, V.z, agent, kind, m));
    P('d-vapor', V.list[0][1], V.y + .27, V.z + .03);
  }
  /* Kompakt solunum sistemi: beyaz gövde, renkli halkalı insp/eksp portları, APL valfi, CLIC ya da uzun absorban,
     balon kolu ve balon, körüklü hortumlar ve filtreli Y parça; gövde içindeki ventilatör tahriki kesit penceresinde */
  const dotsTex = () => DEV3D.H.canvasTex(512, 128, (c, Wd, Hh) => {
    c.fillStyle = '#F4F6F7'; c.fillRect(0, 0, Wd, Hh);
    for (let i = 0; i < 16; i++) for (let j = 0; j < 4; j++) { const x = 8 + i * 32, y = 10 + j * 28; c.fillStyle = (i + j) % 3 ? '#9CC4E8' : '#3C78C0'; c.fillRect(x, y, 20, 18); c.fillStyle = '#FFFFFF'; c.beginPath(); c.arc(x + 10, y + 9, 4, 0, 7); c.fill(); }
  });
  function drgBS(ctx) {
    const {g, cfg, P} = ctx, B = cfg.drg.bs, m = drgMats(ctx), lm = M.plastic(B.limbC || 0xE6ECEF, .35);
    const [hx, hy, hz, hw, hh, hd] = B.head;
    put(g, rbox(hw, hh, hd, .018, m.white), hx, hy, hz);
    put(g, rbox(hw - .012, .012, hd - .012, .005, m.grey), hx, hy - hh / 2 - .004, hz);
    put(g, box(hw - .02, .003, .002, m.seam), hx, hy + hh * .15, hz + hd / 2 + .0005);
    /* portlar */
    const pd = V3(...B.ports.dir).normalize(), ends = [];
    B.ports.at.forEach(([x, y, z], i) => {
      const pg = new THREE.Group(); pg.position.set(x, y, z); pg.quaternion.setFromUnitVectors(V3(0, 1, 0), pd); g.add(pg);
      put(pg, cyl(.019, .019, .012, m.white, 24), 0, .006, 0);
      put(pg, cyl(.0175, .0175, .008, M.plastic(i ? 0xE9EEF1 : 0x3C7FC8, .4), 24), 0, .016, 0);
      put(pg, cyl(.0108, .0118, .03, M.plastic(0xD9DEE1, .35), 20), 0, .034, 0);
      pg.updateMatrixWorld(true); ends.push(pg.localToWorld(V3(0, .048, 0)), pg.localToWorld(V3(0, .1, 0)));
    });
    P('d-valves', ...B.ports.at[0].map((v, k) => v + [-.01, .03, .02][k]));
    /* APL */
    const ag = new THREE.Group(); ag.position.set(...B.apl); ag.quaternion.setFromUnitVectors(V3(0, 1, 0), V3(...(B.aplDir || [0, 1, 0])).normalize()); g.add(ag);
    put(ag, cyl(.016, .016, .012, m.mid, 20), 0, .006, 0);
    put(ag, cyl(.02, .021, .022, m.knob, 28), 0, .023, 0);
    for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; put(ag, box(.003, .02, .003, M.plastic(0xB7BEC3, .4)), Math.cos(a) * .0205, .023, Math.sin(a) * .0205, 0, -a, 0); }
    put(ag, rbox(.038, .007, .012, .0034, m.mid), .014, .038, 0);
    ag.updateMatrixWorld(true); P('d-apl', ...ag.localToWorld(V3(0, .06, 0)).toArray());
    /* absorban */
    const A = B.abs;
    if (A.kind === 'clic') {
      const H = A.y1 - A.y0;
      put(g, rbox(.12, .03, .11, .008, m.dark), A.x, A.y1 - .015, A.z);
      put(g, lathe([[0, 0], [.05, 0], [.058, .01], [.061, .03], [.061, H - .06], [.056, H - .045], [.03, H - .035], [0, H - .035]], m.white, 40), A.x, A.y0, A.z);
      const lab = new THREE.Mesh(new THREE.CylinderGeometry(.0618, .0618, H * .45, 40, 1, true), new THREE.MeshStandardMaterial({map: dotsTex(), roughness: .5})); lab.position.set(A.x, A.y0 + H * .5, A.z); g.add(lab);
      put(g, cyl(.062, .058, .03, M.plastic(0x2D5BB5, .35), 40), A.x, A.y0 + .015, A.z);
      put(g, torus(.06, .004, M.plastic(0x2D5BB5, .35), 40), A.x, A.y0 + .03, A.z, Math.PI / 2);
    } else {
      const ym = A.ym;
      put(g, rbox(.13, .03, .12, .01, m.white), A.x, A.y1 - .015, A.z);
      put(g, cyl(.058, .058, A.y1 - .03 - ym, m.white, 40), A.x, (A.y1 - .03 + ym) / 2, A.z);
      const lab = new THREE.Mesh(new THREE.CylinderGeometry(.0585, .0585, (A.y1 - ym) * .55, 40, 1, true), new THREE.MeshStandardMaterial({map: dotsTex(), roughness: .5})); lab.position.set(A.x, (A.y1 + ym) / 2 - .01, A.z); g.add(lab);
      put(g, cyl(.061, .061, .014, M.plastic(0x2D5BB5, .35), 40), A.x, ym, A.z);
      put(g, cyl(.05, .05, ym - A.y0 - .02, M.clear(0xF0F5F7, .45), 32, true), A.x, (ym + A.y0 + .02) / 2, A.z);
      put(g, cyl(.044, .044, (ym - A.y0) * .82, M.color(0xEDE5C6, .85), 24), A.x, A.y0 + .02 + (ym - A.y0) * .41, A.z);
      put(g, cyl(.054, .056, .025, m.white, 32), A.x, A.y0 + .012, A.z);
      put(g, cyl(.012, .012, .03, m.grey, 16), A.x, A.y0 - .012, A.z);
    }
    P('d-absorber', A.x, (A.y0 + A.y1) / 2, A.z + .065);
    /* ventilatör tahriki (kesit) */
    const Dv = cfg.drg.drive, iu = new THREE.Group(); iu.position.set(Dv.x, Dv.y, Dv.z); g.add(iu);
    if (Dv.kind === 'piston') {
      put(iu, cyl(.036, .036, .085, M.metal(0xB9C2C8, .3), 28), 0, .02, 0);
      put(iu, cyl(.031, .031, .012, m.dark, 28), 0, .045, 0);
      put(iu, cyl(.006, .006, .07, m.chrome, 12), 0, -.035, 0);
      put(iu, rbox(.07, .03, .06, .006, M.matte(0x2E353B, .5)), 0, -.065, -.005);
      put(iu, cyl(.012, .012, .06, M.metal(0x8C959C, .4), 16), .025, -.065, -.01, 0, 0, Math.PI / 2);
    } else {
      put(iu, cyl(.042, .042, .03, M.metal(0xB9C2C8, .35), 32), 0, 0, 0, Math.PI / 2);
      for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; put(iu, box(.024, .004, .018, m.dark), Math.cos(a) * .022, Math.sin(a) * .022, .008, 0, 0, a + .5); }
      put(iu, cyl(.01, .01, .02, m.chrome, 12), 0, 0, .014, Math.PI / 2);
      put(iu, cyl(.026, .026, .04, M.matte(0x2E353B, .5), 24), 0, 0, -.035, Math.PI / 2);
      put(iu, box(.03, .028, .05, M.metal(0xB9C2C8, .35)), .045, .02, -.005);
    }
    P(Dv.kind === 'piston' ? 'd-piston' : 'd-turbine', Dv.x, Dv.y, Dv.z + .06);
    /* Y parça ve filtre */
    const yg = new THREE.Group(); yg.position.set(...B.ypc); yg.quaternion.setFromUnitVectors(V3(0, 1, 0), V3(...(B.ypUp || [0, 1, 0])).normalize()); g.add(yg);
    [-1, 1].forEach(s => put(yg, cyl(.011, .011, .045, m.white, 16), s * .012, .028, 0, 0, 0, -s * .45));
    put(yg, cyl(.013, .013, .025, m.white, 16), 0, 0, 0);
    put(yg, cyl(.03, .03, .03, M.clear(0xEEF4F7, .55), 28), 0, -.03, 0);
    put(yg, cyl(.031, .031, .006, M.plastic(B.filterC || 0x3C7FC8, .4), 28), 0, -.03, 0);
    put(yg, cyl(.01, .01, .02, m.white, 16), 0, -.055, 0);
    yg.updateMatrixWorld(true);
    const tips = [-1, 1].map(s => [yg.localToWorld(V3(s * .03, .085, 0)), yg.localToWorld(V3(s * .022, .05, 0))]);
    B.limbs.forEach((pts, i) => g.add(corrugated([ends[i * 2], ends[i * 2 + 1], ...pts.map(p => V3(...p)), tips[i][0], tips[i][1]], .0115, lm)));
    P('d-ypiece', B.ypc[0], B.ypc[1] + .03, B.ypc[2] + .03);
    /* balon kolu ve balon */
    if (B.arm) g.add(tube(B.arm.map(p => V3(...p)), B.armR || .011, m.white, 48, 12));
    if (B.bagHose) g.add(corrugated(B.bagHose.map(p => V3(...p)), .011, lm));
    const bg = B.bag, s = bg.len / .3;
    put(g, cyl(.012, .012, .03, m.white, 16), bg.x, bg.y + .015, bg.z);
    const bp = [[0, 0], [.012, 0], [.012, -.022]];
    for (let k = 1; k <= 20; k++) { const u = k / 20, r = .012 + (.066 * (bg.r || 1) - .012) * Math.pow(Math.sin(Math.min(1, u * 1.08) * Math.PI * .5), 1.4) * (u > .72 ? Math.sqrt(Math.max(0, 1 - Math.pow((u - .72) / .28, 2))) : 1); bp.push([Math.max(.0005, r), -.022 - u * (bg.len - .022)]); }
    put(g, lathe(bp, M.rubber(bg.c), 36), bg.x, bg.y, bg.z);
    P('d-bag', bg.x, bg.y - bg.len * .55, bg.z + .07);
  }
  /* Dräger monitör gövdesi: beyaz çerçeve, arka çıkıntı, üstte marka, altta güç LED'i, tuşlar, döner düğme ve alarm LED'i */
  function drgMonitor(g, o, m, screens) {
    const mg = new THREE.Group(); mg.position.set(o.x, o.y, o.z); mg.rotation.set(o.tilt || 0, o.yaw || 0, 0, 'YXZ'); g.add(mg);
    const [bl, bt, br, bb] = o.bez, HW = o.w + bl + br, HH = o.h + bt + bb, ox = (bl - br) / 2, oy = (bb - bt) / 2, d = o.d || .05;
    put(mg, rbox(HW, HH, d, Math.min(.016, d * .3), m.white), 0, 0, -d / 2);
    put(mg, rbox(HW * .72, HH * .72, d * .8, .02, m.trim), 0, -HH * .04, -d - d * .35);
    put(mg, box(o.w + .004, o.h + .004, .002, m.black), ox, oy, .0012);
    const s = makeScreen(o.w, o.h, o.spec, o.px || 1024); put(mg, s.mesh, ox, oy, .0028); screens.push(s);
    if (bt > .014) put(mg, txtD('Dräger', Math.min(.05, HW * .2), Math.min(.012, bt * .5), {c: '#5A7090', wt: 600}), 0, HH / 2 - bt / 2, .0006);
    if (bb > .014) {
      const by = -HH / 2 + bb / 2;
      put(mg, cyl(.006, .006, .004, M.led(0xA6E05A), 16), -HW / 2 + .025, by, .002, Math.PI / 2);
      [0, 1].forEach(k => put(mg, cyl(.004, .004, .003, m.grey, 12), -HW / 2 + .05 + k * .014, by, .0015, Math.PI / 2));
      if (o.model) put(mg, txtD(o.model, .06, .008, {c: '#8A949A', wt: 600, it: true}), HW * .12, by, .0006);
      if (o.knob !== false) {
        const kx = HW / 2 - .06;
        put(mg, cyl(.018, .019, .014, m.knob, 28), kx, by - .003, .007, Math.PI / 2); put(mg, torus(.0185, .002, M.plastic(0xB7BEC3, .4), 28), kx, by - .003, .0135);
        put(mg, cyl(.0055, .0055, .004, M.led(0xF5D631), 16), HW / 2 - .025, by, .002, Math.PI / 2);
      }
    }
    if (o.rail) {
      put(mg, rbox(.045, .05, .03, .008, m.trim), 0, -HH / 2 - .02, -.03);
      put(mg, rbox(HW * .78, .018, .028, .008, M.plastic(0x8E969C, .45)), 0, -HH / 2 - .05, -.03);
      for (let k = 0; k < 5; k++) put(mg, rbox(.022, .024, .03, .006, m.white), -HW * .33 + k * HW * .165, -HH / 2 - .05, -.025);
    }
    mg.updateMatrixWorld(true);
    return mg;
  }
  function drgMonitors(ctx) {
    const {g, cfg, screens, parts} = ctx, m = drgMats(ctx);
    (cfg.drg.mons || []).forEach((o, i) => {
      (o.arms || []).forEach(a => g.add(tube(a.map(p => V3(...p)), o.armR || .017, m.white, 40, 12)));
      (o.joints || []).forEach(([x, y, z, h]) => { put(g, cyl(.022, .022, h || .05, m.white, 20), x, y, z); put(g, cyl(.023, .023, .008, m.grey, 20), x, y + (h || .05) / 2, z); });
      const mg = drgMonitor(g, o, m, screens);
      if (!i) parts.push({key: 'd-monitor', at: mg.localToWorld(V3(0, 0, .05))});
    });
  }
  const DRG_SECTIONS = {base: drgBase, cabinet: drgCabinet, worktop: drgWorktop, tower: drgTower, gas: drgMixer, vapor: drgVapors, bs: drgBS, screen: drgScreen, monitors: drgMonitors};
  /* Dräger bölüm işlevleri ve ekran düzenleri diğer kurucu dosyalarının yeniden kullanımı için (davranış değişmez) */
  DEV3D.H.drg = {sections: DRG_SECTIONS, mats: drgMats, base: drgBase, cabinet: drgCabinet, worktop: drgWorktop, tower: drgTower, screen: drgScreen, mixer: drgMixer, vapor: drgVapor, vapors: drgVapors, bs: drgBS, monitor: drgMonitor, monitors: drgMonitors, txt: txtD, vent: drgVent, mon: drgMon, pilot: drgPilot, lcd: drgLCD, plot: drgPlot, AG, circ};
  /* ---------- Cihazlar ---------- */
  /* GE Aisys CS²: üretici görseli — açık gri gövde, solda kollu ventilatör ekranı, üstte hasta monitörü, Aladin tipi
     elektronik vaporizatör kasetleri (mor, sarı), elektronik gaz karıştırıcı, solda körüklü solunum sistemi ve yeşil balon. */
  DEV3D.model('ge-aisys-cs2', {
    type: 'd-workstation', theta: -.6, w: .74, d: .72, top: .88, towerH: .5, towerD: .38, label: 'Aisys CS²', footbar: true,
    colors: {body: 0xEDEFF1, trim: 0xD6DBDF, base: 0x9AA2A8, drawer: 0xF1F3F4},
    gas: {kind: 'electronic', x: .2, y: 1.2}, vapor: {n: 2, kind: 'elec', agents: ['iso', 'sevo'], x: -.08},
    bs: {side: 'left', drive: 'bellows'}, bellows: 0xE3E8EB, absorber: 0xE7DFF0, bagColor: 0x2FA88C, lightbar: 0xCFEFFF,
    screen: {at: 'arm-left', w: .27, h: .21, y: 1.33, keys: 5, frame: [0x2B3136, .008], spec: geVent(.27 / .21, {tile: '#AEBFCC', agent: 'Iso'})},
    monitor: {w: .3, h: .23, x: -.17, y: 1.72, spec: geMon(.3 / .23, {boxes: true})}
  });
  /* GE Carestation 750: üretici görseli — dar kule, aydınlatmalı vaporizatör bölmesi (iki mekanik vaporizatör),
     sol kolda ventilatör ekranı ve üstünde monitör, solda körük ve koyu renkli absorban, H tabanlı şasi, kırmızı fren. */
  DEV3D.model('ge-carestation-750', {
    type: 'd-workstation', theta: -.6, w: .62, d: .68, top: .92, towerH: .56, towerD: .36, towerW: .88, label: 'Carestation 750', footbar: true,
    colors: {body: 0xEAEDEF, trim: 0xD2D7DB, base: 0x9AA2A8, drawer: 0xEEF0F2}, drawerTop: .78,
    gas: {kind: 'electronic', x: .2, y: 1.3}, vapor: {n: 2, kind: 'mech', agents: ['iso', 'sevo'], x: -.04},
    bs: {side: 'left', drive: 'bellows'}, bellows: 0xE6EAED, absorber: 0x6E2633, bagColor: 0x2FA88C, lightbar: 0xDDF3FF,
    screen: {at: 'arm-left', w: .26, h: .2, y: 1.44, keys: 5, frame: [0x2B3136, .01], spec: geVent(.26 / .2)},
    monitor: {w: .26, h: .2, x: -.36, y: 1.78, spec: geMon(.26 / .2)}
  });
  /* Mindray A8 / A9: üretici görseli — koyu antrasit H taban ve büyük tekerlekler, açık gri dolap (3 çekmece), koyu kenarlı
     beyaz tabla, koyu gaz paneli (küçük ekran, sanal akış tüpleri, düğmeler), sağda iki vaporizatör, solda solunum sistemi
     (basınç göstergesi, altında şeffaf hazne ve absorban), uzun balon kolu; üstte solda monitör, sağda ventilatör ekranı. */
  const mindray = (label, vap, extra) => Object.assign({
    type: 'd-workstation', theta: -.55, w: .66, d: .7, top: .9, towerH: .29, towerD: .3, towerW: .7, cabW: .82, label, footbar: false,
    colors: {body: 0xE6E9EB, trim: 0xF3F5F6, base: 0x353C42, drawer: 0xEDEFF1, dark: 0x9AA3AA, panel: 0x2B3238, bs: 0xE9ECEE},
    worktopEdge: 0x2B3238, baseW: 1.12, towerFace: 0x2F363C,
    gas: {kind: 'electronic', x: 0, y: 1.06, knobs: 3}, vapor: vap,
    bs: {side: 'left', drive: 'exchanger', housing: 'below', x: -.38, y: .93, z: .1}, gauge: true, bagArm: [-.26, .3], bagColor: 0x2FA88C,
    absorber: 0xE9E4EF, bellows: 0xDCE3E8,
    screen: {at: 'top', w: .34, h: .19, x: .19, y: 1.45, z: -.2, tilt: -.06, color: 0xF1F3F4, frame: [0x0B0F12, .012], spec: mrVent(.34 / .19)},
    monitor: {w: .38, h: .23, x: -.19, y: 1.47, z: -.24, tilt: -.06, color: 0x1E2328, bezel: [.012, .02, .012, .02], spec: mrMon(.38 / .23)}
  }, extra || {});
  DEV3D.model('mindray-a9', mindray('A9', {n: 2, kind: 'elec', agents: ['sevo', 'des'], x: .26}));
  DEV3D.model('mindray-a8', mindray('A8', {n: 2, kind: 'mech', agents: ['sevo', 'des'], x: .26, bar: false}));
  /* Getinge Flow ailesi: hacim reflektörlü (körüksüz) solunum sistemi; vaporizatörler dolabın ön yüzüne dikey takılır. */
  const flowBase = {type: 'd-workstation', theta: -.6, colors: {body: 0xEEF0F1, trim: 0xF4F5F6, base: 0x5B6268, drawer: 0xF1F2F3, dark: 0x8A949B, panel: 0xF4F5F6, bs: 0xF1F3F4},
    bs: {side: 'left', drive: 'reflector'}, gauge: true, bagColor: 0x1F6B4A, absorber: 0xE2DCEB, absCap: 0x3A4148, absH: .24, limb: 0xE4E9EC, hub: 0xD5D9DC};
  /* Flow-c: üretici görseli — koyu gri H taban, büyük tekerlekler, sağ arkada dar uzun kule (gösterge, düğmeler),
     kule solunda kollu döndürülmüş ekran, solda büyük absorban, önde tek vaporizatör, altta tek çekmece. */
  DEV3D.model('getinge-flow-c', Object.assign({}, flowBase, {
    w: .6, d: .66, top: .9, towerH: .66, towerD: .22, towerW: .34, towerX: .1, cabW: .88, drawers: 1, drawerTop: .42,
    baseStyle: 'h', baseW: 1.15, baseD: 1.15, casterR: .06, label: 'Flow-c',
    gas: {kind: 'tubes', tubes: 1, x: .1, y: 1.03}, vapor: {n: 1, at: 'front', agents: ['sevo'], x: -.02},
    screen: {at: 'arm-left', w: .3, h: .22, y: 1.36, yaw: .35, color: 0xF4F5F6, spec: flowVent(.3 / .22)}, cyl: 0
  }));
  /* Flow-i: üretici görseli — tavan askısına bağlı sürüm: sütun ve kol, üstte ekran, solda solunum sistemi ve
     basınç göstergesi, ön yüzde iki dikey vaporizatör, yeşil balon. */
  DEV3D.model('getinge-flow-i', Object.assign({}, flowBase, {
    mount: 'pendant', w: .66, d: .66, top: .92, towerH: .3, towerD: .24, towerW: .36, towerX: -.1, cabW: .9, drawers: 0, label: 'Flow-i',
    gas: {kind: 'tubes', tubes: 1, x: .02, y: 1.06}, vapor: {n: 2, at: 'front', agents: ['sevo', 'des'], x: .12},
    screen: {at: 'top', w: .3, h: .22, x: -.04, y: 1.42, z: -.12, color: 0xF4F5F6, spec: flowVent(.3 / .22)}, cyl: 0, pipes: 0, agss: false
  }));
  /* Flow-e: üretici görseli — Flow-c gövdesi, sağda üç çekmeceli ek dolap ve geniş tabla, önde iki vaporizatör (sarı, mor). */
  DEV3D.model('getinge-flow-e', Object.assign({}, flowBase, {
    w: .86, d: .66, top: .9, towerH: .66, towerD: .22, towerW: .26, towerX: -.1, cabW: .92, drawers: 3, drawerTop: .5,
    baseStyle: 'h', baseW: 1.08, baseD: 1.12, casterR: .06, label: 'Flow-e',
    gas: {kind: 'tubes', tubes: 1, x: -.1, y: 1.03}, vapor: {n: 2, at: 'front', agents: ['sevo', 'iso'], x: -.12},
    screen: {at: 'arm-left', w: .3, h: .22, y: 1.36, yaw: .35, color: 0xF4F5F6, spec: flowVent(.3 / .22)}, cyl: 0
  }));
  /* Mindray A7: üretici görseli — koyu lacivert taban, yüksek kule: ortada entegre ventilatör ekranı, sağ üstte iki vaporizatör
     (mor, sarı), altında renkli akış düğmeleri; solda körüklü solunum sistemi ve büyük absorban, uzun balon kolu, solda kollu monitör. */
  DEV3D.model('mindray-a7', {
    type: 'd-workstation', theta: -.55, w: .8, d: .72, top: .9, towerH: .64, towerD: .38, towerW: .88, cabW: .74, label: 'A7',
    colors: {body: 0xE8EBED, trim: 0xF3F5F6, base: 0x1F3B4A, drawer: 0xEEF0F2, dark: 0x9AA3AA, panel: 0xF4F6F7, bs: 0xDDE2E6},
    baseW: 1.0, casterR: .06, hub: 0x1F3B4A,
    gas: {kind: 'knobs', x: .2, y: .99}, vapor: {n: 2, kind: 'mech', agents: ['iso', 'sevo'], x: .22, y: 1.1},
    bs: {side: 'left', drive: 'bellows', hh: .2, x: -.5, y: .93}, bellows: 0x4A535A, absorber: 0xD9DCE0, absH: .22, bagArm: [-.3, .28], bagColor: 0x2FA88C,
    screen: {at: 'tower', w: .28, h: .22, x: -.08, y: 1.28, tilt: 0, color: 0x2B3238, frame: [0x0B0F12, .01], spec: mrVent(.28 / .22, {a7: true, agent: 'Iso'})},
    monitor: {w: .36, h: .22, x: -.62, y: 1.45, z: -.1, side: true, color: 0xF1F3F4, tilt: 0, bezel: [.012, .012, .012, .03], spec: mrMon(.36 / .22)}
  });
  /* Dräger Atlan A350 XL (büyük araba). Yerleşim kaynakları: IfU Atlan SW 2.1n (9511481 ed. 2) s. 19 (3.1.1.1 XL ön görünüş),
     s. 26 (sağdan yan görünüş), s. 27 (cihaz sütunu), s. 28 (arka), s. 36 (elektronik gaz karıştırma ünitesi); ürün bilgisi 100164
     (XL 93,3 × 140,3 × 72,4 cm, çalışma yüzeyi 71 × 38 cm) ve üretici ürün fotoğrafı (yalnızca oran/yerleşim referansı).
     Sol arkada tabandan ekran gövdesine uzanan cihaz sütunu (sol yüzünde dikey ray, harici O₂ akış ölçeri, AGSS; arkasında gaz besleme
     bloğu, hortum askıları, priz şeridi); sütunun üstünde gri iç çerçeveli 15,3" ekran gövdesi, altında A350 elektronik gaz karıştırma
     ünitesi (O₂+ tuşu, durum ekranı, O₂ akış ölçeri, Aux. O₂ / Add. O₂ anahtarı, O₂ insüflasyon çıkışı) ve sağında yedek manuel anahtar
     kapağı; ekranın sağında, sütuna bağlı vaporizatör takma bağlantı kolu (arkada tutamaklı ray) ve kola asılı Vapor 3000 (sevofluran)
     ile D-Vapor (desfluran) — tablaya oturmaz; iki parçalı çalışma tablası, ön kuşak (model yazısı), iki yanda tutamak ve standart ray;
     solda kompakt solunum sistemi (portlar tablanın sol ön köşesinde, APL valfi tabla üstünde, CLIC absorban dolabın sol üst
     girintisinde), balon kolu (üzerinde küçük taşınabilir monitör), balon, park edilmiş Y parça; dolapta iki gri çekmece, "E-Vent"
     piston gözetleme penceresi, kilitli alt çekmece; gri U çerçeve taban. Ekran gövdesinin yan direklerinden kollarla solda Infinity
     hasta monitörü (altında kablo rayı), sağda SmartPilot View ekranı. Ölçüsü kaynakta olmayan ayrıntılar temsilidir. */
  const DRG = {body: 0xEFF0F1, trim: 0xE8EAEB, drawer: 0xF4F5F5, dark: 0xCDD2D6, panel: 0xBFD8E4, bs: 0xE4E8EB};
  const drgSmall = A => drgMon(A, {rows: [['ecg', '#3BE36B', 'II'], ['pleth', '#E6EEF2', 'Pleth']], nums: [['HR', '84', '#3BE36B', 1.2], ['SpO₂', '98', '#FFFFFF', 1.1]],
    side: false, labelCol: 0, bottom: [], waveBottom: .95, nk: 5, bed: 'M540'});
  /* XL dolabı: sol üstte absorban girintisi (gövde orada geride kalır), ön kapaklar drgCabinet ile aynı biçimde */
  function xlCabinet(ctx) {
    const {g, cfg, P} = ctx, K = cfg.drg.cab, A = K.alcove, m = drgMats(ctx), zf = K.z + K.d / 2, zb = K.z - K.d / 2, fd = .06, x0 = K.x - K.w / 2, x1 = K.x + K.w / 2;
    const body = (a0, a1, b0, b1, fz) => put(g, rbox(a1 - a0, b1 - b0, fz - zb, .014, m.body), (a0 + a1) / 2, (b0 + b1) / 2, (fz + zb) / 2);
    body(x0, x1, K.y0, A.y0, zf - fd); body(A.x1, x1, A.y0, K.y1, zf - fd); body(x0, A.x1, A.y0, K.y1, A.z);
    put(g, box(K.w - .012, A.y0 - K.y0 - .006, .002, m.seam), K.x, (K.y0 + A.y0) / 2, zf - fd + .001);
    put(g, box(x1 - A.x1 - .006, K.y1 - A.y0, .002, m.seam), (A.x1 + x1) / 2, (A.y0 + K.y1) / 2, zf - fd + .001);
    /* girintinin üstündeki koyu absorban yuvası */
    put(g, rbox(A.x1 - x0 - .012, .045, .09, .008, M.matte(0x1C2633, .6)), (x0 + A.x1) / 2, K.y1 - .03, A.z + .045);
    K.fronts.forEach(f => {
      const gap = .0035, X0 = f.x0 + gap / 2, X1 = f.x1 - gap / 2, Y0 = f.y0 + gap / 2, Y1 = f.y1 - gap / 2, w = X1 - X0, h = Y1 - Y0, cx = (X0 + X1) / 2, cy = (Y0 + Y1) / 2;
      const mat = f.shade ? m.front2 : m.front, zc = zf - (fd - .004) / 2 - .002;
      if (f.hole) {
        const [hx0, hx1, hy0, hy1] = f.hole, blk = (a0, a1, b0, b1) => { if (a1 - a0 > .002 && b1 - b0 > .002) put(g, box(a1 - a0, b1 - b0, fd - .004, mat), (a0 + a1) / 2, (b0 + b1) / 2, zc); };
        blk(X0, hx0, Y0, Y1); blk(hx1, X1, Y0, Y1); blk(hx0, hx1, hy1, Y1); blk(hx0, hx1, Y0, hy0);
        put(g, box(hx1 - hx0, hy1 - hy0, .002, M.matte(0x101418, .6)), (hx0 + hx1) / 2, (hy0 + hy1) / 2, zf - fd + .003);
        put(g, box(hx1 - hx0 + .004, hy1 - hy0 + .004, .003, M.glass(0x3A4A56, .22)), (hx0 + hx1) / 2, (hy0 + hy1) / 2, zf - .003);
      } else put(g, rbox(w, h, fd - .004, .006, mat), cx, cy, zc);
      if (f.handle === 'grip') { put(g, box(w * .6, .007, .003, m.seam), cx, Y1 - .01, zf + .0012); put(g, box(w * .6, .003, .006, m.white), cx, Y1 - .0055, zf + .002); }
      if (f.lock) { put(g, cyl(.008, .008, .006, m.metal, 20), f.lock[0], f.lock[1], zf + .003, Math.PI / 2); put(g, box(.0015, .008, .002, m.dark), f.lock[0], f.lock[1], zf + .0065); }
      if (f.label) { const lb = f.label; put(g, txtD(lb.t, lb.w, lb.h, {c: lb.c || '#7A848B', wt: 600}), lb.x, lb.y, zf + .0008).rotation.z = lb.rot || 0; }
    });
    for (let k = 0; k < 7; k++) put(g, box(.002, .006, K.d * .4, m.seam), x1 + .0005, K.y0 + .06 + k * .014, K.z - K.d * .1);
    P('d-drawer', K.pin[0], K.pin[1], zf + .02);
  }
  /* Cihaz sütunu (sol arka, tabandan ekran gövdesine) + ekranın altındaki üst gövde, yedek manuel anahtar kapağı, monitör direkleri,
     sol yüzde dikey ray ve harici O₂ akış ölçeri, arkada gaz besleme bloğu, merkezi gaz hortumları, hortum askıları ve priz şeridi */
  function xlTower(ctx) {
    const {g, cfg, P} = ctx, R = cfg.drg.tower, m = drgMats(ctx), xl = R.x - R.w / 2, xr = R.x + R.w / 2;
    put(g, rbox(R.w, R.y0 - R.cy0, R.cz - R.zb, .02, m.body), R.x, (R.cy0 + R.y0) / 2, (R.cz + R.zb) / 2);
    put(g, rbox(R.w, R.y1 - R.y0 + .02, R.zf - R.zb, .024, m.body), R.x, (R.y0 + R.y1) / 2, (R.zf + R.zb) / 2);
    put(g, rbox(R.w - .02, R.y1 - R.y0 - .03, .008, .012, m.white), R.x, (R.y0 + R.y1) / 2 + .004, R.zf + .002);
    /* yedek manuel anahtarının kapağı (IfU 3.1.1.1 no. 3) */
    const [fx, fy, fw, fh] = R.flap;
    put(g, rbox(fw, fh, .004, .01, m.white), fx, fy, R.zf + .007);
    put(g, box(fw + .004, .002, .002, m.seam), fx, fy + fh / 2 + .002, R.zf + .0065);
    put(g, box(.002, fh, .002, m.seam), fx - fw / 2 - .002, fy, R.zf + .0065);
    put(g, decal(.03, .03, (c, Wd, Hh) => { c.strokeStyle = '#B9C2C8'; c.lineWidth = Wd * .06; c.beginPath(); c.arc(Wd * .42, Hh * .55, Wd * .26, 0, 7); c.stroke(); c.beginPath(); c.moveTo(Wd * .62, Hh * .3); c.lineTo(Wd * .85, Hh * .12); c.stroke(); }, 64), fx + .004, fy - fh * .2, R.zf + .0095);
    /* yan yarıklar (sağ) */
    for (let k = 0; k < 8; k++) put(g, box(.002, .006, (R.zf - R.zb) * .45, m.seam), xr + .0005, R.y0 + .05 + k * .013, R.zb + (R.zf - R.zb) * .4);
    /* sol yüz: dikey ray (IfU no. 14) ve kablo kanalı */
    put(g, box(.01, R.y1 - R.cy0 - .12, .026, m.metal), xl - .006, (R.cy0 + R.y1) / 2, R.zb + .022);
    put(g, box(.003, R.y1 - R.cy0 - .16, .05, m.seam), xl - .001, (R.cy0 + R.y1) / 2, R.zb + .065);
    /* harici O₂ akış ölçeri (sütun rayında; üstte iki koyu başlık, solda çıkış) */
    const [ox, oy, oz] = R.o2;
    put(g, rbox(.1, .13, .1, .016, m.white), ox, oy, oz);
    [-.022, .022].forEach(x => { put(g, cyl(.013, .013, .018, m.dark, 20), ox + x, oy + .074, oz); put(g, cyl(.006, .006, .006, m.mid, 12), ox + x, oy + .086, oz); });
    put(g, cyl(.006, .006, .03, m.mid, 12), ox - .062, oy + .03, oz, 0, 0, Math.PI / 2);
    put(g, rbox(.07, .03, .03, .008, m.trim), ox + .06, oy, oz - .02);
    /* monitör kolu direkleri (ekran gövdesinin iki yanında) */
    R.posts.forEach(([px, py, pz, ph]) => {
      put(g, cyl(.023, .023, ph, m.white, 24), px, py, pz);
      put(g, cyl(.026, .025, .02, m.grey, 24), px, py + ph / 2 + .01, pz);
      put(g, cyl(.025, .026, .012, m.grey, 24), px, py - ph / 2 - .006, pz);
      const ex = px < R.x ? xl : xr;
      put(g, rbox(Math.abs(px - ex) + .02, .05, .045, .012, m.trim), (px + ex) / 2, py - ph * .25, pz);
    });
    /* arka yüz: iç panel, gaz besleme bloğu ve hortumlar, hortum askıları, kablo tutucu, fan, priz şeridi */
    const zr = R.zb - .002;
    put(g, rbox(R.w - .04, R.y1 - R.cy0 - .1, .006, .01, m.trim), R.x, (R.cy0 + R.y1) / 2, zr);
    const [gx, gy] = R.gas;
    put(g, rbox(.17, .08, .03, .01, m.grey), gx, gy, zr - .014);
    [0xF4F6F7, 0x1D2125, 0x2F7DD1].forEach((c, k) => {
      const x = gx - .05 + k * .05;
      put(g, cyl(.009, .009, .025, m.metal, 12), x, gy - .012, zr - .04, Math.PI / 2);
      g.add(tube([[x, gy - .012, zr - .05], [x, gy - .07, zr - .09], [x + .01 * k, .5, zr - .09], [x + .03 + .03 * k, .015, zr - .2]], .007, M.rubber(c)));
    });
    P('d-pipe', gx + .02, .5, zr - .12);
    R.hooks.forEach(([hx, hy]) => {
      put(g, rbox(.07, .02, .05, .008, m.grey), hx, hy - .03, zr - .025);
      g.add(tube([[hx - .045, hy - .03, zr - .045], [hx - .05, hy + .01, zr - .06], [hx, hy + .03, zr - .065], [hx + .05, hy + .01, zr - .06], [hx + .045, hy - .03, zr - .045]], .007, M.matte(0x3A4148, .5), 24, 8));
    });
    put(g, rbox(.11, .022, .025, .008, m.mid), gx - .02, R.hooks[0][1] - .07, zr - .012);
    const [sx, sy] = R.sockets;
    put(g, rbox(.07, .2, .02, .008, M.plastic(0xD9CBB0, .5)), sx, sy, zr - .008);
    for (let k = 0; k < 4; k++) put(g, cyl(.017, .017, .006, m.dark, 20), sx, sy - .075 + k * .05, zr - .018, Math.PI / 2);
    put(g, rbox(.06, .06, .012, .006, m.dark), sx, sy + .15, zr - .006);
    for (let k = 0; k < 4; k++) put(g, box(.045, .004, .002, m.mid), sx, sy + .13 + k * .013, zr - .013);
  }
  /* A350 elektronik gaz karıştırma ünitesi (IfU 3.1.12.3, s. 36): sol üstte O₂+ tuşu (yeşil halka), ortada durum ekranı, sağda O₂ akış
     ölçeri ve düğmesi, altta O₂ insüflasyon çıkışı ve Aux. O₂ / Add. O₂ anahtarı; akış kontrol valfi yoktur (akım ana ekrandan ayarlanır) */
  const xlLCD = () => ({bg: '#A7C9F0', layout: [
    {t: 'box', x: .03, y: .06, w: .14, h: .3, stroke: '#14305A', lw: .012}, {t: 'box', x: .05, y: .25, w: .1, h: .07, fill: '#14305A'},
    ...[['O₂', .27], ['Air', .5], ['N₂O', .73]].flatMap(([l, x]) => [{t: 'text', txt: l, x, y: .04, w: .18, h: .12, c: '#14305A', s: .1, wt: 700},
      {t: 'box', x: x + .01, y: .17, w: .03, h: .18, stroke: '#14305A', lw: .01}, {t: 'box', x: x + .013, y: .25, w: .024, h: .1, fill: '#14305A'},
      {t: 'box', x: x + .07, y: .22, w: .09, h: .06, fill: '#14305A', r: .01}]),
    {t: 'text', txt: 'Paw', x: .03, y: .42, w: .1, h: .1, c: '#14305A', s: .08, wt: 700},
    {t: 'text', txt: '-20   0   20   40   60   80', x: .14, y: .41, w: .84, h: .09, c: '#14305A', s: .065, wt: 600},
    {t: 'box', x: .14, y: .54, w: .82, h: .012, fill: '#14305A'}, {t: 'box', x: .27, y: .5, w: .012, h: .05, fill: '#14305A'},
    {t: 'text', txt: '7:30', x: .4, y: .6, w: .56, h: .36, c: '#14305A', s: .34, al: 'r', wt: 800}]});
  function xlMixer(ctx) {
    const {g, cfg, screens, P} = ctx, X = cfg.drg.mixer, m = drgMats(ctx), zf = X.z + .015, W = X.w, H = X.h;
    put(g, rbox(W + .014, H + .014, .008, .026, m.trim), X.x, X.y, X.z + .004);
    put(g, rbox(W, H, .014, .024, M.plastic(X.color || 0xC3DDEA, .34)), X.x, X.y, X.z + .008);
    /* durum ekranı */
    const lw = W * .43, lh = H * .42, lx = X.x - W * .01, ly = X.y + H * .13;
    put(g, rbox(lw + .016, lh + .016, .004, .006, M.plastic(0x9DB6C5, .4)), lx, ly, zf + .002);
    put(g, box(lw + .002, lh + .002, .002, m.black), lx, ly, zf + .0045);
    const lcd = makeScreen(lw, lh, xlLCD(), 512); put(g, lcd.mesh, lx, ly, zf + .006); screens.push(lcd);
    /* O₂+ (O₂ flush) */
    const fx = X.x - W * .4, fy = X.y + H * .33;
    put(g, torus(.0165, .0032, M.color(0x9BC53D, .45), 28), fx, fy, zf + .004);
    put(g, cyl(.0135, .0135, .012, m.white, 28), fx, fy, zf + .007, Math.PI / 2);
    put(g, txtD('O₂+', .018, .008, {c: '#2F3A44', wt: 800}), fx, fy, zf + .0132);
    /* O₂ akış ölçeri (Aux. O₂ / Add. O₂): cam tüp, ölçek, alt düğme */
    const tx = X.x + W * .34, th = H * .6, ty = X.y + H * .04;
    put(g, rbox(.03, th + .03, .006, .015, M.plastic(0xA9C2D0, .4)), tx, ty, zf + .003);
    put(g, cyl(.0075, .0075, th * .8, M.glass(0xEAF5FA, .55), 16), tx, ty + th * .08, zf + .01);
    put(g, decal(.01, th * .7, (c, Wd, Hh) => { c.strokeStyle = '#2A3036'; c.lineWidth = 2; for (let k = 0; k <= 8; k++) { const yy = Hh * (.05 + k * .11); c.beginPath(); c.moveTo(k % 2 ? Wd * .5 : 0, yy); c.lineTo(Wd, yy); c.stroke(); } }, 64), tx + .012, ty + th * .08, zf + .0065);
    put(g, sphere(.005, M.color(0x2B3136, .4), 12), tx, ty - th * .18, zf + .01);
    put(g, cyl(.012, .012, .016, m.white, 24), tx, ty - th * .42, zf + .011, Math.PI / 2);
    put(g, torus(.0125, .002, M.plastic(0x5E6B74, .4), 24), tx, ty - th * .42, zf + .019);
    put(g, txtD('O₂', .014, .008, {c: '#F4F7F9', wt: 700}), tx, ty + th * .5 + .008, zf + .001);
    /* O₂ insüflasyon çıkışı (hap biçimli yuva) ve Aux. O₂ / Add. O₂ anahtarı */
    const by = X.y - H * .33;
    put(g, rbox(.05, .024, .006, .012, M.plastic(0x4E5A63, .4)), X.x - W * .34, by, zf + .003);
    put(g, rbox(.042, .017, .004, .0085, M.plastic(0xC9D6DE, .3)), X.x - W * .34, by, zf + .006);
    put(g, cyl(.004, .005, .012, m.metal, 12), X.x - W * .34, by, zf + .01, Math.PI / 2);
    const sx = X.x - W * .06;
    put(g, torus(.0115, .0025, M.color(0x9BC53D, .45), 24), sx, by, zf + .004);
    put(g, cyl(.009, .009, .012, m.knob, 20), sx, by, zf + .008, Math.PI / 2);
    put(g, rbox(.03, .009, .008, .004, m.knob), sx - .016, by, zf + .012);
    put(g, txtD('Aux. O₂', .024, .006, {c: '#F4F7F9', wt: 600}), sx - .034, by + .012, zf + .001);
    put(g, txtD('Add. O₂', .024, .006, {c: '#F4F7F9', wt: 600}), X.x + W * .1, by + .006, zf + .001);
    P('d-gas', lx, ly, zf + .03); P('d-flush', fx, fy, zf + .025);
  }
  /* Vaporizatör takma bağlantı kolu: sütunun sağında, ekranın altında; arka ucunda tutamaklı standart ray (IfU s. 26 no. 1, s. 28);
     vaporizatörler kolun önüne asılıdır, çalışma tablasına oturmaz */
  function xlVapors(ctx) {
    const {g, cfg, P} = ctx, V = cfg.drg.vap, m = drgMats(ctx), [bx0, bx1, by0, by1, bz0, bz1] = V.bar;
    put(g, rbox(bx1 - bx0, by1 - by0, bz1 - bz0, .014, m.body), (bx0 + bx1) / 2, (by0 + by1) / 2, (bz0 + bz1) / 2);
    put(g, rbox(bx1 - bx0 - .02, (by1 - by0) * .62, .01, .008, m.grey), (bx0 + bx1) / 2 + .005, (by0 + by1) / 2 + .004, bz1 + .003);
    V.list.forEach(([, x]) => { put(g, rbox(.07, .036, .012, .006, m.mid), x, by1 - .03, bz1 + .008); [-1, 1].forEach(s => put(g, cyl(.006, .006, .016, m.chrome, 12), x + s * .022, by1 - .03, bz1 + .014, Math.PI / 2)); });
    /* sağ yüzde ray ve arka tutamak */
    const rx = bx1 + .008, ry = (by0 + by1) / 2;
    put(g, box(.01, .025, bz1 - bz0 + .05, m.metal), rx, ry, (bz0 + bz1) / 2 - .02);
    put(g, cyl(.0065, .0065, .03, m.metal, 12), rx + .016, ry, bz0 - .03, 0, 0, Math.PI / 2);
    put(g, rbox(.024, .11, .028, .011, M.plastic(0xD3D8DB, .45)), rx + .034, ry, bz0 - .03);
    V.list.forEach(([agent, x, kind]) => drgVapor(g, x, V.y, V.z, agent, kind, m));
    P('d-vapor', V.list[0][1], V.y + .27, V.z + .03);
  }
  /* Kompakt solunum sistemi (drgBS) + sol yandaki anestezik gaz alma sistemi (AGSS) */
  function xlBS(ctx) {
    const {g, cfg, P} = ctx, m = drgMats(ctx), [ax, ay, az] = cfg.drg.agss;
    drgBS(ctx);
    put(g, rbox(.07, .11, .075, .012, m.white), ax, ay, az);
    put(g, rbox(.05, .03, .02, .006, m.grey), ax, ay + .03, az + .04);
    put(g, cyl(.011, .011, .06, M.clear(0xEAF4F8, .5), 16), ax - .043, ay - .01, az + .02);
    put(g, sphere(.0055, M.color(0x2E9E58), 10), ax - .043, ay - .025, az + .02);
    put(g, cyl(.01, .01, .03, m.grey, 12), ax, ay - .07, az);
    g.add(corrugated([V3(ax, ay - .085, az), V3(ax, ay - .2, az - .02), V3(ax + .02, ay - .38, az - .1), V3(ax + .05, .04, az - .3)], .009, M.plastic(0xC9D3D8, .4)));
    P('d-agss', ax - .05, ay, az + .03);
  }
  const XLS = Object.assign({}, DRG_SECTIONS, {cabinet: xlCabinet, tower: xlTower, gas: xlMixer, vapor: xlVapors, bs: xlBS});
  DEV3D.model('drager-atlan-a350-xl', {
    type: 'd-workstation', theta: -.45, w: .775, d: .724, top: .865, towerH: .24, towerD: .165, towerW: .516, towerX: -.125, cabW: .9, cabX: .014, label: 'Atlan',
    colors: Object.assign({base: 0x737B81}, DRG), cyl: 0, pipes: 0, agss: false, sections: XLS,
    drg: {
      /* U çerçeve taban: genişlik ≈ 91 cm, derinlik 72,4 cm (ürün bilgisi); çerçeve yüksekliği ve tekerlek çapı IfU s. 26 oranlarından */
      base: {kind: 'frame', w: .91, d: .724, y: .19, h: .07, color: 0x737B81, cap: 0x9EA5AA, cr: .064, cx: .41, cz: .3, tire: 0x34404E, hub: 0xF2F4F5, fork: 0xD9DDE0},
      /* dolap: ön yüz z .275, arka z -.125 (arkasında sütun); satırlar: iki gri çekmece, pencere + kapak, kilitli alt çekmece */
      cab: {x: .014, w: .697, y0: .2, y1: .735, d: .4, z: .075, pin: [.24, .69], alcove: {x1: -.236, y0: .42, z: .125}, fronts: [
        {x0: -.236, x1: .088, y0: .645, y1: .735, shade: true, handle: 'grip'}, {x0: .088, x1: .362, y0: .645, y1: .735, shade: true, handle: 'grip'},
        {x0: -.236, x1: .088, y0: .42, y1: .645, hole: [-.219, -.103, .472, .617], label: {t: 'E-Vent', x: -.088, y: .545, w: .075, h: .016, rot: Math.PI / 2, c: '#7E8890'}},
        {x0: .088, x1: .362, y0: .42, y1: .645},
        {x0: -.335, x1: .088, y0: .2, y1: .42, lock: [-.304, .334]}, {x0: .088, x1: .362, y0: .2, y1: .42}]},
      top: {x: 0, w: .775, d: .42, z: .15, y: .865, band: .088, label: 'Atlan A350 XL', seams: [-.05], handle: 'grip', hs: [-1, 1]},
      tower: {x: -.125, w: .4, cy0: .225, y0: .865, y1: 1.1, zf: -.045, cz: -.125, zb: -.21, flap: [.034, .975, .066, .17],
        o2: [-.4, .975, -.075], posts: [[-.39, 1.33, -.12, .14], [.12, 1.33, -.12, .14]],
        gas: [-.13, 1.03], hooks: [[-.02, .84], [-.2, .84], [-.02, .45], [-.2, .45]], sockets: [.03, .45]},
      hous: {x: -.125, y: 1.2515, z: -.02, w: .33, h: .206, bezel: [.032, .041, .032, .056], d: .19, tilt: -.05, frame: .012, knobR: .09, spec: drgVent(.33 / .206, {mode: 'VC-AutoFlow'})},
      mixer: {x: -.17, y: .99, w: .256, h: .17, z: -.045, color: 0x9CC8E2},
      vap: {bar: [.075, .355, .93, 1.05, -.215, -.13], y: .9, z: -.04, list: [['sevo', .144, 'v3000'], ['des', .27, 'dvapor']]},
      bs: {head: [-.43, .772, .19, .075, .08, .16], ports: {at: [[-.468, .787, .24], [-.468, .754, .222]], dir: [-1, -.3, .45]}, apl: [-.3, .865, .17],
        abs: {kind: 'clic', x: -.29, z: .21, y0: .505, y1: .727},
        limbs: [[[-.58, .67, .32], [-.7, .61, .33], [-.83, .64, .29]], [[-.57, .65, .29], [-.69, .59, .3], [-.82, .62, .26]]],
        ypc: [-.9, .74, .24], ypUp: [.1, -1, .1], filterC: 0x3C7FC8,
        arm: [[-.45, .8, .19], [-.5, .835, .19], [-.62, .842, .19], [-.8, .842, .19], [-.865, .86, .19], [-.885, .93, .19]], armR: .013,
        bag: {x: -.66, y: .82, z: .19, len: .19, c: 0xA9B1B7, r: .85}},
      drive: {kind: 'piston', x: -.161, y: .545, z: .23},
      agss: [-.38, .575, .06],
      mons: [
        {x: -.683, y: 1.425, z: -.08, w: .41, h: .256, bez: [.043, .041, .036, .053], yaw: .12, d: .05, rail: true, model: 'Infinity', spec: drgMon(.41 / .256),
          arms: [[[-.39, 1.30, -.12], [-.47, 1.29, -.17], [-.6, 1.30, -.19], [-.683, 1.32, -.17]]]},
        {x: .40, y: 1.39, z: -.08, w: .448, h: .259, bez: [.015, .015, .017, .031], yaw: -.12, d: .045, knob: false, spec: drgPilot(.448 / .259),
          arms: [[[.12, 1.30, -.12], [.2, 1.29, -.17], [.32, 1.30, -.18], [.40, 1.31, -.16]]]},
        {x: -.69, y: .875, z: .19, w: .14, h: .06, bez: [.045, .012, .05, .012], tilt: -.35, yaw: .05, d: .04, knob: false, px: 512, spec: drgSmall(.14 / .06)}
      ]
    },
    extra(g, ctx) {
      const m = drgMats(ctx);
      /* ekran gövdesinin üstündeki sütun kapağı (monitör bağlama yüzeyi) */
      put(g, rbox(.405, .012, .25, .006, m.trim), -.125, 1.409, -.13);
      /* küçük monitör yuvası (balon kolu üzerinde) */
      put(g, rbox(.2, .03, .085, .012, m.white), -.69, .84, .19);
    }
  });
  /* Dräger Perseus A500: üretici görseli — açık gri platform taban (gri basma yüzeyi, yeşil fren çizgisi), siyah tekerlekler;
     sağda dar dolap (uzun tutamaklı üst çekmece, kapak, "Dräger" yazılı sağ sütun), solu açık: kompakt solunum sistemi, uzun absorban,
     yeşil balon ve beyaz körüklü hortumlar, filtreli Y parça; ortada dar kule: üstte gri çerçeveli ventilatör ekranı, onun üstünde
     Infinity hasta monitörü, altında "Dräger" yazısı ve açık mavi gaz karıştırıcı; kulenin solunda Vapor 3000 ve D-Vapor;
     sağda klavye tablası üzerinde Infinity Explorer / SmartPilot ekranı; solda kollu infüzyon pompası rafı ve serum askısı;
     sol direkte küçük taşınabilir monitör. Ventilatör tahriki kayda göre elektrikli üfleyicidir (türbin; sağ sütundaki kesit penceresinde). */
  DEV3D.model('drager-perseus-a500', {
    type: 'd-workstation', theta: -.45, w: .965, d: .74, top: .9, towerH: .35, towerD: .32, towerW: .363, towerX: .005, cabW: .611, cabX: .124, label: 'Perseus A500',
    colors: Object.assign({base: 0xCDD2D6}, DRG), cyl: 0, sections: DRG_SECTIONS,
    drg: {
      base: {kind: 'platform', w: .92, d: .78, y: .17, h: .13, color: 0xD3D7DA, tread: 0xA7AEB3, cr: .045, cx: .4, cz: .31, tire: 0x1E2328, hub: 0x3A4148, fork: 0x8E969C},
      cab: {x: .124, w: .59, y0: .313, y1: .745, d: .6, z: -.01, plinth: [.235, .313], pin: [.05, .70], fronts: [
        {x0: -.17, x1: .28, y0: .655, y1: .745, handle: 'bar', lock: [.262, .704]},
        {x0: -.17, x1: .235, y0: .313, y1: .655},
        {x0: .235, x1: .418, y0: .313, y1: .655, shade: true, hole: [.28, .385, .36, .5], label: {t: 'Dräger', x: .327, y: .6, w: .07, h: .02, c: '#4A6C9C'}},
        {x0: .28, x1: .418, y0: .655, y1: .745, shade: true}]},
      top: {x: -.013, w: .965, d: .74, z: 0, y: .9, band: .116, label: 'Perseus A500', seams: [-.05], handle: 'u', hs: [1]},
      tower: {x: .005, w: .35, y0: .9, y1: 1.25, d: .32, z: -.21, brand: [.005, 1.152]},
      hous: {x: .033, y: 1.39, z: -.03, w: .342, h: .209, bezel: [.03, .045, .03, .035], d: .08, frame: .012, knobR: .055, spec: drgVent(.342 / .209, {mode: 'PC-AutoFlow', ctl: [['O₂', '50'], ['Pinsp', '15'], ['RR', '12'], ['Ti', '1.7'], ['PEEP', '5'], ['ΔPsupp', '0'], ['Tslope', '0.2']]})},
      mixer: {x: .005, y: 1.025, w: .274, h: .17, z: -.044},
      vap: {bx: -.3, bw: .27, y: .918, z: -.12, list: [['sevo', -.365, 'v3000'], ['des', -.235, 'dvapor']]},
      bs: {head: [-.27, .69, .2, .19, .11, .2], ports: {at: [[-.35, .715, .3], [-.315, .7, .3]], dir: [-.55, -.25, 1]}, apl: [-.22, .69, .3], aplDir: [0, 0, 1],
        abs: {kind: 'tall', x: -.425, z: .21, y0: .248, ym: .57, y1: .745},
        limbs: [[[-.43, .56, .44], [-.47, .33, .43], [-.55, .25, .41], [-.64, .3, .38], [-.68, .5, .34]], [[-.39, .52, .42], [-.43, .3, .41], [-.53, .22, .4], [-.67, .27, .38], [-.72, .48, .34]]],
        ypc: [-.7, .73, .32], ypUp: [0, -1, .15], filterC: 0xD9566B,
        arm: [[-.37, .72, .16], [-.47, .73, .19], [-.545, .76, .21], [-.545, .92, .215], [-.545, 1.1, .215]], armR: .016,
        bagHose: [[-.365, .66, .12], [-.45, .655, .11], [-.56, .66, .16], [-.605, .66, .23], [-.61, .645, .255]],
        bag: {x: -.61, y: .62, z: .255, len: .34, c: 0x6FD3B0, r: 1.1}},
      drive: {kind: 'turbine', x: .3325, y: .43, z: .245},
      mons: [
        {x: .04, y: 1.717, z: -.07, w: .37, h: .256, bez: [.021, .026, .026, .031], tilt: -.04, d: .05, spec: drgMon(.37 / .256, {
          rows: [['ecg', '#3BE36B', 'II'], ['ecg', '#3BE36B', 'V5'], ['pleth', '#C9D0D5', 'Pleth'], ['art', '#FF3B3B', 'ART'], ['cvp', '#F2D22E', 'PA']], waveBottom: .74,
          nums: [['HR', '84', '#7CE84A', 1.3], ['ST', '-0.2 -0.1', '#7CE84A', .45], ['SpO₂', '100', '#FFFFFF', 1.05], ['ART', '120/75', '#FFE0E0', .8, '#C92A2A']],
          side: [['PVC', '0', '#7CE84A'], ['ST V5', '-0.1', '#7CE84A'], ['PLS', '84', '#FFFFFF'], ['(90)', '', '#FF6A6A'], ['PA', '36/15', '#F2D22E']],
          bottom: [['RR', '20', '#FFFFFF'], ['PA', '36/15', '#F2D22E'], ['CVP', '12', '#5BC8F0'], ['Tblood', '36.6', '#F09A3A']]})},
        {x: .496, y: 1.351, z: -.08, w: .452, h: .295, bez: [.018, .026, .026, .02], yaw: -.12, d: .045, spec: drgPilot(.452 / .295, {explorer: true})},
        {x: -.73, y: 1.077, z: .2, w: .117, h: .057, bez: [.012, .01, .03, .012], tilt: -.5, yaw: .15, d: .035, knob: false, px: 512, spec: drgSmall(.117 / .057)}
      ]
    },
    extra(g) {
      const m = drgMats({C: Object.assign({base: 0xCDD2D6}, DRG)});
      /* üst monitör boynu ve yan ekran ayağı */
      put(g, rbox(.09, .04, .05, .01, m.trim), .04, 1.55, -.11);
      put(g, cyl(.022, .022, .1, m.white, 20), .496, 1.14, -.115); put(g, rbox(.13, .012, .09, .005, m.white), .496, 1.097, -.1);
      /* klavye tablası, klavye, fare, taşıyıcı kol */
      put(g, rbox(.625, .016, .2, .007, m.trim), .548, 1.083, -.02);
      put(g, rbox(.46, .012, .13, .004, m.white), .51, 1.097, .0);
      put(g, decal(.44, .11, (c, Wd, Hh) => { c.fillStyle = '#DDE1E4'; c.fillRect(0, 0, Wd, Hh); c.fillStyle = '#F7F8F8'; for (let r = 0; r < 5; r++) for (let k = 0; k < 18; k++) c.fillRect(4 + k * (Wd - 8) / 18, 4 + r * (Hh - 8) / 5, (Wd - 8) / 18 - 3, (Hh - 8) / 5 - 3); }, 512), .51, 1.1035, .0, -Math.PI / 2);
      put(g, sphere(.03, m.white, 16), .81, 1.1, .01).scale.set(.75, .45, 1.15);
      put(g, rbox(.17, .04, .1, .012, m.white), .49, 1.055, -.03);
      g.add(tube([[.17, 1.03, -.13], [.3, 1.035, -.1], [.44, 1.045, -.05]], .018, m.white));
      /* infüzyon pompası rafı, kolları ve serum askısı */
      [1.32, 1.4].forEach(y => g.add(tube([[-.17, y, -.2], [-.28, y, -.19], [-.39, y, -.16]], .017, m.white)));
      [[-.19, 1.36, -.2, .16], [-.385, 1.36, -.16, .16]].forEach(([x, y, z, h]) => { put(g, cyl(.024, .024, h, m.white, 20), x, y, z); put(g, cyl(.025, .025, .01, m.grey, 20), x, y + h / 2, z); });
      for (let k = 0; k < 4; k++) {
        const y = 1.30 + k * .068;
        put(g, rbox(.2, .06, .15, .01, m.white), -.5, y, -.15);
        put(g, decal(.16, .042, (c, Wd, Hh) => { c.fillStyle = '#B7E2DC'; c.fillRect(0, 0, Wd, Hh); c.fillStyle = '#0E2A33'; c.fillRect(Wd * .05, Hh * .2, Wd * .45, Hh * .6); c.fillStyle = '#7FE0D2'; c.font = `700 ${Hh * .3}px monospace`; c.fillText('5.0 ml/h', Wd * .08, Hh * .6); c.fillStyle = '#E9F6F4'; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) c.fillRect(Wd * (.6 + i * .12), Hh * (.15 + j * .26), Wd * .09, Hh * .18); }, 256), -.52, y, -.0745);
        put(g, rbox(.035, .045, .07, .01, m.white), -.385, y, -.12);
        put(g, box(.012, .03, .03, M.plastic(0x5CC2B5, .4)), -.603, y, -.1);
      }
      put(g, rbox(.24, .07, .18, .025, m.white), -.5, 1.585, -.15);
      put(g, cyl(.008, .008, .36, m.chrome, 12), -.527, 1.79, -.15);
      [0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach(a => g.add(tube([[-.527, 1.96, -.15], [-.527 + Math.cos(a) * .05, 1.975, -.15 + Math.sin(a) * .05], [-.527 + Math.cos(a) * .085, 1.955, -.15 + Math.sin(a) * .085]], .0035, m.chrome, 16, 6)));
      put(g, rbox(.065, .14, .035, .012, M.clear(0xEEF4F7, .55)), -.585, 1.86, -.15);
      put(g, cyl(.01, .01, .04, M.clear(0xEEF4F7, .6), 12), -.585, 1.77, -.15);
      g.add(tube([[-.585, 1.75, -.15], [-.59, 1.62, -.12], [-.62, 1.5, -.08]], .0025, M.clear(0xEEF4F7, .7), 20, 6));
      /* küçük monitör: direk üstü kol, yuva ve askı */
      g.add(tube([[-.545, 1.1, .215], [-.62, 1.06, .21], [-.7, 1.04, .2]], .014, m.white));
      put(g, rbox(.14, .03, .07, .01, m.white), -.73, 1.04, .2);
      g.add(tube([[-.8, 1.05, .2], [-.88, 1.06, .2], [-.93, 1.1, .2], [-.95, 1.14, .2]], .012, m.white));
    }
  });
  /* Genel anestezi ventilatörü (tür sayfası): klasik iş istasyonu; vurgu ventilatörde — şeffaf hazne içinde büyük körük,
     kollu ventilatör ekranı, mekanik akış ölçerler. Marka taklidi değildir. */
  DEV3D.model('anesthesia-ventilator', {
    type: 'd-workstation', theta: -.6, w: .72, d: .7, top: .86, towerH: .5, towerD: .36, label: 'VENT',
    colors: {body: 0xECEFF1, trim: 0xD3DADF, base: 0x6B747B, drawer: 0xF2F4F5, bs: 0xDCE2E6},
    gas: {kind: 'tubes', tubes: 3, x: .18, y: 1.15}, vapor: {n: 1, kind: 'mech', agents: ['sevo'], x: -.06},
    bs: {side: 'left', drive: 'bellows', hh: .3}, bellows: 0x6FA8D6, bagColor: 0x3C6E8F, absorber: 0xE6DDF0, gauge: true,
    screen: {at: 'arm-left', w: .3, h: .22, y: 1.42, keys: 5, spec: genVent()}
  });
  /* CONFIGS */
})();
