'use strict';
/* Cihaz başına bir soru · grup D. Her sorunun doğru yanıtı content-src/<id>.json içindeki doğrulanmış metne dayanır. */
window.ICA_QUIZ = window.ICA_QUIZ || {};
Object.assign(window.ICA_QUIZ, {
  'anesthesia-ventilator': {
    q: {
      tr: 'Taze gaz ayrıştırması (fresh gas decoupling) olmayan klasik bir anestezi ventilatöründe inspirasyon sırasında gelen taze gaza ne olur?',
      en: 'In a conventional anaesthesia ventilator without fresh gas decoupling, what happens to fresh gas arriving during inspiration?',
      es: 'En un ventilador de anestesia convencional sin desacoplamiento del gas fresco, ¿qué ocurre con el gas fresco que llega durante la inspiración?'
    },
    o: [
      {tr: 'Bir rezervuarda biriktirilir ve hastaya iletilmez', en: 'It is stored in a reservoir and not delivered to the patient', es: 'Se almacena en un reservorio y no llega al paciente'},
      {tr: 'APL valfinden atık gaz sistemine atılır', en: 'It is vented to the scavenger through the APL valve', es: 'Se evacúa al sistema de extracción por la válvula APL'},
      {tr: 'Hastaya verilen tidal hacme eklenir', en: 'It adds to the tidal volume delivered to the patient', es: 'Se suma al volumen corriente administrado al paciente'},
      {tr: 'Yalnızca körüğü sıkıştıran tahrik gazı olarak kullanılır', en: 'It is used only as drive gas to compress the bellows', es: 'Solo se usa como gas impulsor para comprimir el fuelle'}
    ],
    a: 2,
    ex: {
      tr: 'Ayrıştırması olmayan klasik sistemlerde taze gaz akımı tidal hacme eklenir; taze gaz ayrıştırması olan sistemlerde ise rezervuarda biriktirilir. Ventilatör modunda APL valfi devre dışı kalır.',
      en: 'Without decoupling, fresh gas flow adds to the tidal volume; with fresh gas decoupling it is stored in a reservoir instead. In ventilator mode the APL valve is excluded from the circuit.',
      es: 'Sin desacoplamiento, el flujo de gas fresco se suma al volumen corriente; con desacoplamiento se almacena en un reservorio. En modo ventilador, la válvula APL queda excluida del circuito.'
    },
    src: 'principle'
  },
  'icu-ventilator': {
    q: {
      tr: 'Yoğun bakım ventilatöründe akış sensörü ile hasta arasına HMEF yerleştirmek neden önemlidir?',
      en: 'Why does placing an HMEF between the flow sensor and the patient matter on an ICU ventilator?',
      es: '¿Por qué importa colocar un HMEF entre el sensor de flujo y el paciente en un ventilador de UCI?'
    },
    o: [
      {tr: 'Tüp direncini ortadan kaldırarak ölçülen PEEP’i ayarlanan değere eşitler', en: 'It makes measured PEEP match the set value by removing tube resistance', es: 'Iguala la PEEP medida a la ajustada al eliminar la resistencia del tubo'},
      {tr: 'Yenidoğan akış sensörünün erişkin hastalarda güvenle kullanılmasını sağlar', en: 'It allows the neonatal flow sensor to be used safely in adult patients', es: 'Permite usar con seguridad el sensor de flujo neonatal en pacientes adultos'},
      {tr: 'Nemi süzerek kaçak saptamayı daha duyarlı hale getirir', en: 'It makes leak detection more sensitive by filtering out humidity', es: 'Hace más sensible la detección de fugas al filtrar la humedad'},
      {tr: 'Hasta tarafı bağlantı kopmasının saptanmasını sınırlar', en: 'It limits the ventilator’s detection of a patient-side disconnection', es: 'Limita la detección de una desconexión del lado del paciente'}
    ],
    a: 3,
    ex: {
      tr: 'Kayda göre akış sensörü ile hasta arasındaki HMEF gibi bir bileşen, ventilatörün hasta tarafındaki bağlantı kopmasını tanımlama yeteneğini sınırlar. Akış sensörü ve devre de hasta grubuna uygun olmalıdır.',
      en: 'The record notes that a component such as an HMEF between the flow sensor and the patient limits the ventilator’s ability to identify a patient-side disconnection. The flow sensor and circuit must also match the patient group.',
      es: 'Según el registro, un componente como un HMEF entre el sensor de flujo y el paciente limita la capacidad del ventilador para identificar una desconexión del lado del paciente. El sensor de flujo y el circuito también deben corresponder al grupo de pacientes.'
    },
    src: 'trouble'
  },
  'transport-ventilator': {
    q: {
      tr: 'Türbinli transport ventilatörünün temel avantajı ve buna eşlik eden sınırlılığı nedir?',
      en: 'What is the key practical trade-off of a turbine transport ventilator?',
      es: '¿Cuál es la principal ventaja de un ventilador de transporte de turbina y qué limitación la acompaña?'
    },
    o: [
      {tr: 'Medikal gazlardan bağımsızdır ama batarya ömrüne bağımlıdır', en: 'Independent of medical gases, but dependent on battery life', es: 'Es independiente de los gases medicinales, pero depende de la batería'},
      {tr: 'Bataryadan bağımsızdır ama tüpten yüksek miktarda O₂ tüketir', en: 'Independent of batteries, but consumes large amounts of cylinder O₂', es: 'Es independiente de la batería, pero consume grandes cantidades de O₂ de botella'},
      {tr: 'Sabit FiO₂ verir ama PEEP uygulayamaz', en: 'Delivers a fixed FiO₂, but cannot provide PEEP', es: 'Administra una FiO₂ fija, pero no puede aplicar PEEP'},
      {tr: 'Yalnızca volüm kontrolde ve spirometri olmadan çalışır', en: 'Works only in volume control and without spirometry', es: 'Solo funciona en volumen control y sin espirometría'}
    ],
    a: 0,
    ex: {
      tr: 'Türbinli ventilatörler basıncı elektrikle çalışan bir türbinle üretir; bu nedenle medikal gaz gerektirmez ama batarya ömrüne bağımlıdır. Basınçlı oksijenle çalışanlar pnömatik ventilatörlerdir.',
      en: 'Turbine ventilators generate pressure with an electrically powered turbine, so they do not need medical gases but depend on battery life; pneumatic ventilators are the ones powered by compressed oxygen.',
      es: 'Los ventiladores de turbina generan presión con una turbina eléctrica, por lo que no necesitan gases medicinales pero dependen de la autonomía de la batería; los que funcionan con oxígeno comprimido son los neumáticos.'
    },
    src: 'principle'
  },
  'niv-cpap-bipap': {
    q: {
      tr: 'Spontan (S) modda ayarlı bilevel NIV’de hasta yeterli inspiratuvar efor göstermezse ne olur?',
      en: 'In bilevel NIV set to Spontaneous (S) mode, what happens if the patient makes no adequate inspiratory effort?',
      es: 'En VNI binivel en modo espontáneo (S), ¿qué ocurre si el paciente no realiza un esfuerzo inspiratorio adecuado?'
    },
    o: [
      {tr: 'Yedek (backup) hızda soluk verilir', en: 'Breaths are delivered at the backup rate', es: 'Se administran respiraciones a la frecuencia de respaldo'},
      {tr: 'Destekli soluk verilmez', en: 'No assisted breath is delivered', es: 'No se administra ninguna respiración asistida'},
      {tr: 'Cihaz otomatik olarak CPAP’a geçer', en: 'The device switches automatically to CPAP', es: 'El equipo pasa automáticamente a CPAP'},
      {tr: 'Soluk tetiklenene kadar IPAP artırılır', en: 'IPAP is raised until a breath is triggered', es: 'Se aumenta la IPAP hasta que se dispara una respiración'}
    ],
    a: 1,
    ex: {
      tr: 'S modda destekli soluklar yalnızca hastanın eforuna yanıt olarak verilir; yeterli efor yoksa destek verilmez. Yedek hız S/T modda bulunur; T modda soluklar ayarlı hızda verilir.',
      en: 'In S mode, assisted breaths are delivered only in response to patient effort; without adequate effort no support is given. A backup rate exists in S/T mode, and T mode delivers breaths at the set rate.',
      es: 'En modo S, las respiraciones asistidas se administran solo en respuesta al esfuerzo del paciente; sin esfuerzo adecuado no hay soporte. La frecuencia de respaldo existe en el modo S/T, y el modo T administra respiraciones a la frecuencia fijada.'
    },
    src: 'principle'
  },
  'hfnc': {
    q: {
      tr: 'HFNC’de ayarlı akım hastanın tepe inspiratuvar akımının altındaysa trakeal FiO₂’ye ne olur?',
      en: 'With HFNC, what happens to tracheal FiO₂ when the set flow is below the patient’s peak inspiratory flow?',
      es: 'Con HFNC, ¿qué ocurre con la FiO₂ traqueal cuando el flujo ajustado es inferior al flujo inspiratorio pico del paciente?'
    },
    o: [
      {tr: 'Nazofaringeal ölü boşluk yıkanması nedeniyle ayarlı değerin üstüne çıkar', en: 'It rises above the set value due to nasopharyngeal dead-space washout', es: 'Supera el valor ajustado por el lavado del espacio muerto nasofaríngeo'},
      {tr: 'Ağız açıklığından bağımsız olarak ayarlı değere eşittir', en: 'It equals the set value regardless of mouth opening', es: 'Es igual al valor ajustado sea cual sea la apertura bucal'},
      {tr: 'Oda havası sürüklendiği için ayarlı değerin altına düşer', en: 'It falls below the set value because room air is entrained', es: 'Cae por debajo del valor ajustado porque se arrastra aire ambiente'},
      {tr: 'Ölçülemez hale gelir ve cihaz tedaviyi durdurur', en: 'It becomes unmeasurable and the device stops therapy', es: 'Deja de poder medirse y el equipo detiene la terapia'}
    ],
    a: 2,
    ex: {
      tr: 'Akım tepe inspiratuvar akımın altındaysa üst hava yolunda oda havası sürüklenir ve trakeal FiO₂ ayarlı değerden düşük olur; akıma bağlı etkiler akım tepe inspiratuvar akımı aştığında en belirgindir.',
      en: 'When flow is below peak inspiratory flow, room air is entrained in the upper airway and tracheal FiO₂ is lower than set; flow-dependent effects are greatest when flow exceeds peak inspiratory flow.',
      es: 'Si el flujo es inferior al flujo inspiratorio pico, se arrastra aire ambiente en la vía aérea superior y la FiO₂ traqueal es menor que la ajustada; los efectos dependientes del flujo son máximos cuando el flujo supera el flujo inspiratorio pico.'
    },
    src: 'principle'
  },
  'jet-ventilator': {
    q: {
      tr: 'Jet ventilasyonda ekspirasyon nasıl gerçekleşir ve bunun hava yolu için sonucu nedir?',
      en: 'How does expiration occur during jet ventilation, and what follows for the airway?',
      es: '¿Cómo se produce la espiración durante la ventilación jet y qué implica para la vía aérea?'
    },
    o: [
      {tr: 'Ekspiratuvar valf ile aktif olarak; devre kapalı kalmalıdır', en: 'Actively via an expiratory valve; the circuit must stay sealed', es: 'De forma activa por una válvula espiratoria; el circuito debe estar sellado'},
      {tr: 'Jet kateterinden aspirasyonla; glottis kapalı olabilir', en: 'Through suction on the jet catheter; the glottis may be closed', es: 'Por aspiración a través del catéter jet; la glotis puede estar cerrada'},
      {tr: 'Ventilatörün ekspiratuvar koluyla; kaflı tüp gerekir', en: 'Via the ventilator’s expiratory limb; a cuffed tube is required', es: 'Por la rama espiratoria del ventilador; se requiere un tubo con balón'},
      {tr: 'Açık hava yolundan pasif olarak; çıkış yolu açık kalmalıdır', en: 'Passively through the open airway; the outflow path must stay clear', es: 'De forma pasiva por la vía aérea abierta; la salida debe quedar libre'}
    ],
    a: 3,
    ex: {
      tr: 'Jet sistemi ekspiratuvar valfi olmayan açık bir sistemdir: ekspirasyon pasiftir ve hava yolu atmosfere sürekli açık kalmalıdır; bu nedenle ekspirasyon yolu (ör. rijit bronkoskop) tıkanmamalıdır, aksi halde hava hapsi ve barotravma gelişebilir.',
      en: 'The jet system is open with no expiratory valve: expiration is passive and the airway must stay open to the atmosphere, so the expiratory pathway (e.g. the rigid bronchoscope) must not be obstructed, or air trapping and barotrauma may follow.',
      es: 'El sistema jet es abierto y no tiene válvula espiratoria: la espiración es pasiva y la vía aérea debe permanecer abierta a la atmósfera, por lo que la vía espiratoria (p. ej., el broncoscopio rígido) no debe obstruirse; de lo contrario puede haber atrapamiento aéreo y barotrauma.'
    },
    src: 'principle'
  },
  'esophageal-pressure': {
    q: {
      tr: 'Aşırı şişirilmiş özofagus balonu ölçülen Pes’i nasıl etkiler?',
      en: 'How does an overfilled oesophageal balloon affect the measured Pes?',
      es: '¿Cómo afecta un balón esofágico sobreinflado a la Pes medida?'
    },
    o: [
      {tr: 'Sinyali sönümleyerek Pes’i olduğundan düşük gösterir', en: 'It underestimates Pes by damping the signal', es: 'Subestima la Pes al amortiguar la señal'},
      {tr: 'Transdüser sıfırlandıktan sonra etkisi olmaz', en: 'It has no effect once the transducer is zeroed', es: 'No influye una vez puesto a cero el transductor'},
      {tr: 'Özofagus duvar basıncını ekleyerek Pes’i yüksek gösterir', en: 'It overestimates Pes by adding oesophageal wall pressure', es: 'Sobrestima la Pes al añadir la presión de la pared esofágica'},
      {tr: 'Tidal solunumda basınç salınımlarının yönünü tersine çevirir', en: 'It reverses the direction of the respiratory pressure swings', es: 'Invierte el sentido de las oscilaciones de presión respiratorias'}
    ],
    a: 2,
    ex: {
      tr: 'Aşırı şişirilmiş balon özofagus duvar basıncını ekleyerek Pes’i olduğundan yüksek, yetersiz şişirilmiş balon ise düşük gösterir; balon her doldurmadan önce tamamen boşaltılmalıdır.',
      en: 'An overfilled balloon overestimates Pes by adding oesophageal wall pressure, whereas an underfilled balloon underestimates it; the balloon should be fully deflated before each filling.',
      es: 'Un balón sobreinflado sobrestima la Pes al añadir la presión de la pared esofágica, mientras que uno infrainflado la subestima; el balón debe desinflarse por completo antes de cada llenado.'
    },
    src: 'trouble'
  }
});
