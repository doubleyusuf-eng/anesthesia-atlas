'use strict';
/* Cihaz başına bir soru · grup C. Her sorunun doğru yanıtı content-src/<id>.json içindeki doğrulanmış metne dayanır. */
window.ICA_QUIZ = window.ICA_QUIZ || {};
Object.assign(window.ICA_QUIZ, {
  'picco': {
    q: {
      tr: 'PiCCO ölçümü için termistör uçlu arter kateteri nereye yerleştirilmelidir?',
      en: 'Where should the thermistor-tipped arterial catheter be placed for PiCCO measurement?',
      es: '¿Dónde debe colocarse el catéter arterial con termistor para la medición con PiCCO?'
    },
    o: [
      {tr: 'Standart periferik radiyal arter kateteri yeterlidir', en: 'A standard peripheral radial arterial catheter is sufficient', es: 'Basta un catéter arterial radial periférico estándar'},
      {tr: 'Santral (aortaya yakın) bir artere, tercihen femoral artere', en: 'In a central (near-aortic) artery, preferably the femoral artery', es: 'En una arteria central (próxima a la aorta), preferentemente la femoral'},
      {tr: 'Sağ kalpten geçirilerek pulmoner arter dalına', en: 'Into a pulmonary artery branch, floated through the right heart', es: 'En una rama de la arteria pulmonar, a través del corazón derecho'},
      {tr: 'Superior vena kavaya, enjektat lümeninin yanına', en: 'Into the superior vena cava, next to the injectate lumen', es: 'En la vena cava superior, junto a la luz de inyección'}
    ],
    a: 1,
    ex: {
      tr: 'PiCCO kateteri santral (aortaya yakın) bir artere, tercihen femoral artere yerleştirilir; brakiyal/aksiller arter veya uzun radiyal kateter alternatiftir. Standart periferik radiyal kateterle PiCCO ölçümü çalışmaz.',
      en: 'The PiCCO catheter goes into a central (near-aortic) artery, preferably the femoral; brachial/axillary arteries or a long radial catheter are alternatives. PiCCO measurement does not work with a standard peripheral radial catheter.',
      es: 'El catéter PiCCO se coloca en una arteria central (próxima a la aorta), preferentemente la femoral; la braquial/axilar o un catéter radial largo son alternativas. La medición PiCCO no funciona con un catéter radial periférico estándar.'
    },
    src: 'placement'
  },
  'proaqt': {
    q: {
      tr: 'ProAQT iç kalibrasyonla kullanıldığında hesaplanan değerlerde neden tutarsızlık olabilir?',
      en: 'Why may calculated values be discrepant when ProAQT is used with internal calibration?',
      es: '¿Por qué pueden aparecer discrepancias en los valores calculados cuando ProAQT se usa con calibración interna?'
    },
    o: [
      {tr: 'Santral venöz yoldan termodilüsyon bolusu gerektirdiği için', en: 'Because it requires a thermodilution bolus via a central venous line', es: 'Porque requiere un bolo de termodilución por una vía venosa central'},
      {tr: 'Özel termistör uçlu femoral arter kateteri gerektirdiği için', en: 'Because it needs a dedicated thermistor-tipped femoral arterial catheter', es: 'Porque necesita un catéter arterial femoral específico con termistor'},
      {tr: 'Ara sıra görülen ekstrasistoller algoritmayı kalibrasyona dek durdurduğu için', en: 'Because occasional extrasystoles stop the algorithm until recalibration', es: 'Porque las extrasístoles ocasionales detienen el algoritmo hasta recalibrar'},
      {tr: 'Başlangıç değeri varsayılan demografi ve damar tonusuna dayandığı için', en: 'Because the start value rests on assumed demographics and vascular tone', es: 'Porque el valor inicial se basa en demografía y tono vascular supuestos'}
    ],
    a: 3,
    ex: {
      tr: 'İç kalibrasyonda başlangıç değeri hasta verilerinden otomatik hesaplanır; algoritma demografi ve damar tonusu değişikliklerine ilişkin varsayımlara dayandığından tutarsızlık olabilir. ProAQT standart arter kateteriyle çalışır; hafif aritmi parametreleri etkilemez.',
      en: 'With internal calibration the start value is calculated from patient data; the algorithm relies on assumptions about demographics and vascular tone, which may cause discrepancies. ProAQT works with a standard arterial catheter, and mild arrhythmia does not affect its parameters.',
      es: 'Con la calibración interna, el valor inicial se calcula a partir de los datos del paciente; el algoritmo se basa en supuestos sobre datos demográficos y tono vascular, lo que puede generar discrepancias. ProAQT funciona con un catéter arterial estándar y la arritmia leve no afecta a sus parámetros.'
    },
    src: 'principle'
  },
  'lidco': {
    q: {
      tr: 'Aşağıdakilerden hangisi LiDCOrapid için kontrendikasyon olarak belirtilmiştir?',
      en: 'Which of the following is listed as a contraindication for LiDCOrapid?',
      es: '¿Cuál de las siguientes se indica como contraindicación de LiDCOrapid?'
    },
    o: [
      {tr: 'Aort kapak yetersizliği veya intraaortik balon pompası', en: 'Aortic valve regurgitation or an intra-aortic balloon pump', es: 'Insuficiencia aórtica o balón de contrapulsación intraaórtico'},
      {tr: 'Kapalı göğüs ve tam kontrollü mekanik ventilasyon uygulanması', en: 'Closed chest with full controlled mechanical ventilation', es: 'Tórax cerrado con ventilación mecánica totalmente controlada'},
      {tr: 'Standart periferik radiyal arter hattıyla ölçüm', en: 'Measurement via a standard peripheral radial arterial line', es: 'Medición mediante una línea arterial radial periférica estándar'},
      {tr: 'Stabil kalp hızıyla düzenli sinüs ritmi', en: 'Regular sinus rhythm with a stable heart rate', es: 'Ritmo sinusal regular con frecuencia cardiaca estable'}
    ],
    a: 0,
    ex: {
      tr: 'Kılavuz aort kapak yetersizliği, IABP tedavisi, aşırı sönümlü periferik arter hattı ve periferik arter vazokonstriksiyonunu kontrendikasyon olarak sayar. Kapalı göğüs ve tam kontrollü ventilasyon ise SVV/PPV’nin geçerlilik koşuludur.',
      en: 'The manual lists aortic valve regurgitation, IABP therapy, a highly damped peripheral arterial line and peripheral arterial vasoconstriction as contraindications. A closed chest with full controlled ventilation is the condition for valid SVV/PPV.',
      es: 'El manual cita como contraindicaciones la insuficiencia valvular aórtica, el tratamiento con BCIA, una línea arterial periférica muy amortiguada y la vasoconstricción arterial periférica. El tórax cerrado con ventilación totalmente controlada es la condición para que SVV/PPV sean válidas.'
    },
    src: 'placement'
  },
  'argos': {
    q: {
      tr: 'Argos kardiyak debiyi hangi yöntemle hesaplar?',
      en: 'How does Argos calculate cardiac output?',
      es: '¿Cómo calcula Argos el gasto cardiaco?'
    },
    o: [
      {tr: 'Nabız konturunu kalibre eden transpulmoner termodilüsyonla', en: 'By transpulmonary thermodilution that calibrates the pulse contour', es: 'Mediante termodilución transpulmonar que calibra el contorno de pulso'},
      {tr: 'Periyodik olarak tekrarlanan zorunlu lityum dilüsyonu kalibrasyonuyla', en: 'By a mandatory lithium dilution calibration repeated at set intervals', es: 'Mediante una calibración obligatoria por dilución de litio repetida periódicamente'},
      {tr: 'Arter dalgasının çoklu atım analiziyle Windkessel modelini kestirerek', en: 'By multi-beat arterial waveform analysis estimating a Windkessel model', es: 'Por análisis multilatido de la onda arterial que estima un modelo Windkessel'},
      {tr: 'Desendan aortada özofageal Doppler ile akım hızını ölçerek', en: 'By measuring descending aortic flow velocity with an oesophageal Doppler probe', es: 'Midiendo la velocidad de flujo en la aorta descendente con Doppler esofágico'}
    ],
    a: 2,
    ex: {
      tr: 'Multi-Beat Analysis (MBA) algoritması birden çok atımın basınç bilgisini ve girilen yaş, boy, kilo ve cinsiyeti kullanarak Windkessel modeli parametrelerini belirler. Üreticiye göre kalibrasyon gerekmez; sonuç kalibre edilmemiş bir kestirimdir.',
      en: 'The Multi-Beat Analysis (MBA) algorithm uses pressure information from multiple beats plus entered age, height, weight and sex to determine Windkessel model parameters. The manufacturer states no calibration is required; the result is an uncalibrated estimate.',
      es: 'El algoritmo Multi-Beat Analysis (MBA) usa la información de presión de varios latidos y la edad, talla, peso y sexo introducidos para determinar los parámetros del modelo Windkessel. Según el fabricante no requiere calibración; el resultado es una estimación no calibrada.'
    },
    src: 'principle'
  },
  'hemosphere': {
    q: {
      tr: 'HemoSphere platformunda hangi parametrelerin izlenebileceğini ne belirler?',
      en: 'On the HemoSphere platform, what determines which parameters can be monitored?',
      es: 'En la plataforma HemoSphere, ¿qué determina qué parámetros pueden monitorizarse?'
    },
    o: [
      {tr: 'Monitör açıldığı anda tüm parametreler kullanılabilir hale gelir', en: 'All parameters are available as soon as the monitor is switched on', es: 'Todos los parámetros están disponibles en cuanto se enciende el monitor'},
      {tr: 'Tüm modül, kablo ve sensörler için ortak tek bir kalibrasyon protokolü', en: 'A single calibration protocol common to all modules, cables and sensors', es: 'Un único protocolo de calibración común a todos los módulos, cables y sensores'},
      {tr: 'Yalnızca hasta boy, kilo ve yaşının sisteme girilmesi', en: 'Only the entry of patient height, weight and age into the system', es: 'Solo la introducción de la talla, el peso y la edad del paciente'},
      {tr: 'Bağlı modül/kablo/sensör ve HPI gibi etkinleştirilmiş özellikler', en: 'The connected module/cable/sensor and enabled features such as HPI', es: 'El módulo/cable/sensor conectado y funciones activadas como HPI'}
    ],
    a: 3,
    ex: {
      tr: 'Platformun varlığı tüm ölçümlerin mevcut olduğu anlamına gelmez; her parametre belirli bir modül/kablo/sensör gerektirir ve HPI gibi bazı özellikler ayrıca etkinleştirilir. Swan-Ganz, FloTrac, ClearSight ve ForeSight farklı yöntemlerdir; ortak bir kalibrasyon protokolü yoktur.',
      en: 'Having the platform does not mean every measurement is available; each parameter needs a specific module/cable/sensor and some features such as HPI must be activated separately. Swan-Ganz, FloTrac, ClearSight and ForeSight are different methods with no common calibration protocol.',
      es: 'Disponer de la plataforma no significa que todas las mediciones estén disponibles; cada parámetro requiere un módulo/cable/sensor específico y algunas funciones como HPI se activan por separado. Swan-Ganz, FloTrac, ClearSight y ForeSight son métodos distintos sin un protocolo de calibración común.'
    },
    src: 'trouble'
  },
  'flotrac': {
    q: {
      tr: 'Aort yetersizliği olan bir hastada FloTrac atım hacmi/kardiyak debi değeri nasıl etkilenebilir?',
      en: 'In a patient with aortic regurgitation, how may FloTrac stroke volume/cardiac output be affected?',
      es: 'En un paciente con insuficiencia aórtica, ¿cómo puede verse afectado el volumen sistólico/gasto cardiaco de FloTrac?'
    },
    o: [
      {tr: 'Olduğundan düşük hesaplanabilir', en: 'It may be underestimated', es: 'Puede infraestimarse'},
      {tr: 'Olduğundan yüksek hesaplanabilir', en: 'It may be overestimated', es: 'Puede sobreestimarse'},
      {tr: 'Etkilenmez; otokalibrasyon bunu düzeltir', en: 'It is unaffected; autocalibration corrects for it', es: 'No se ve afectado; la autocalibración lo corrige'},
      {tr: 'Sıfırlama doğruysa etkilenmez', en: 'It is unaffected if zeroing is correct', es: 'No se ve afectado si la puesta a cero es correcta'}
    ],
    a: 1,
    ex: {
      tr: 'Kılavuza göre aort yetersizliğinde atım hacmi veya kardiyak debi olduğundan yüksek hesaplanabilir. Doğru sıfırlama gereklidir ancak bu sınırlamayı ortadan kaldırmaz.',
      en: 'According to the manual, stroke volume or cardiac output may be overestimated in aortic regurgitation. Correct zeroing is necessary but does not remove this limitation.',
      es: 'Según el manual, en la insuficiencia aórtica el volumen sistólico o el gasto cardiaco pueden sobreestimarse. La puesta a cero correcta es necesaria, pero no elimina esta limitación.'
    },
    src: 'trouble'
  },
  'acumen-iq-hpi': {
    q: {
      tr: 'Ameliyattaki bir hastada HPI değeri düşük. Bu bulgu nasıl yorumlanmalıdır?',
      en: 'In a surgical patient the HPI value is low. How should this be interpreted?',
      es: 'En un paciente quirúrgico el valor de HPI es bajo. ¿Cómo debe interpretarse?'
    },
    o: [
      {tr: 'Önümüzdeki 5–15 dakikada hipotansiyonu dışlamaz', en: 'It does not exclude hypotension in the next 5–15 minutes', es: 'No excluye hipotensión en los próximos 5–15 minutos'},
      {tr: 'Önümüzdeki 30 dakika için hipotansiyonu dışlar', en: 'It rules out hypotension for the next 30 minutes', es: 'Descarta hipotensión durante los próximos 30 minutos'},
      {tr: 'Kardiyak debinin yeterli olduğunu doğrular', en: 'It confirms that cardiac output is adequate', es: 'Confirma que el gasto cardiaco es adecuado'},
      {tr: 'Dalga kalitesi ve sıfırlamanın doğru olduğunu gösterir', en: 'It shows that waveform quality and zeroing are correct', es: 'Indica que la calidad de onda y la puesta a cero son correctas'}
    ],
    a: 0,
    ex: {
      tr: 'Kılavuza göre düşük HPI, cerrahi hastalarda sonraki 5–15 dakikada (cerrahi dışı hastalarda 20–30 dakikada) hipotansiyonu dışlamaz. Tedavi kararı yalnızca HPI’ya dayanmaz; dalga kalitesi, sıfırlama ve hemodinamik durum ayrıca değerlendirilir.',
      en: 'Per the manual, a low HPI does not exclude hypotension in the next 5–15 minutes in surgical patients (20–30 minutes in non-surgical patients). No treatment decision rests on HPI alone; waveform quality, zeroing and haemodynamic status are assessed separately.',
      es: 'Según el manual, un HPI bajo no excluye hipotensión en los 5–15 minutos siguientes en pacientes quirúrgicos (20–30 minutos en no quirúrgicos). Ninguna decisión terapéutica se basa solo en el HPI; la calidad de onda, la puesta a cero y el estado hemodinámico se valoran aparte.'
    },
    src: 'eval'
  },
  'clearsight': {
    q: {
      tr: 'ClearSight sisteminde kalp referans sensörünün (HRS) görevi nedir?',
      en: 'What is the role of the heart reference sensor (HRS) in the ClearSight system?',
      es: '¿Cuál es la función del sensor de referencia cardiaca (HRS) en el sistema ClearSight?'
    },
    o: [
      {tr: 'Parmak arter hacmini ışıkla izleyip manşet basıncını ayarlar', en: 'It tracks finger arterial volume optically and adjusts cuff pressure', es: 'Sigue ópticamente el volumen arterial del dedo y ajusta la presión del manguito'},
      {tr: 'Seçilen aralıkta manşet basıncını otomatik olarak boşaltır', en: 'It automatically releases cuff pressure at the selected interval', es: 'Libera automáticamente la presión del manguito en el intervalo elegido'},
      {tr: 'Parmak ile kalp arasındaki yükseklik farkını telafi eder', en: 'It compensates for the height difference between finger and heart', es: 'Compensa la diferencia de altura entre el dedo y el corazón'},
      {tr: 'Kardiyak debiyi termodilüsyona göre kalibre eder', en: 'It calibrates cardiac output against thermodilution', es: 'Calibra el gasto cardiaco frente a la termodilución'}
    ],
    a: 2,
    ex: {
      tr: 'HRS, parmak ile kalp arasındaki yükseklik farkını telafi eder; kalp ucu flebostatik eksen düzeyine sabitlenir. Arter hacmini izleyip basıncı ayarlayan, hacim sabitleme yöntemiyle çalışan parmak manşetidir.',
      en: 'The HRS compensates for the height difference between finger and heart; its heart end is fixed at the phlebostatic axis. Tracking arterial volume and adjusting pressure is done by the finger cuff using the volume clamp method.',
      es: 'El HRS compensa la diferencia de altura entre el dedo y el corazón; su extremo cardiaco se fija a la altura del eje flebostático. Seguir el volumen arterial y ajustar la presión es función del manguito digital mediante el método de pinzamiento de volumen.'
    },
    src: 'principle'
  },
  'swan-ganz': {
    q: {
      tr: 'PEEP ile ventile edilen bir hastada ölçülen PAOP transmural değere göre nasıldır?',
      en: 'In a patient ventilated with PEEP, how does the measured PAOP relate to the transmural value?',
      es: 'En un paciente ventilado con PEEP, ¿cómo se relaciona la PAOP medida con el valor transmural?'
    },
    o: [
      {tr: 'Transmural değerden düşük ölçülür', en: 'It underestimates the transmural value', es: 'Infraestima el valor transmural'},
      {tr: 'Transmural değerden yüksek ölçülür', en: 'It overestimates the transmural value', es: 'Sobreestima el valor transmural'},
      {tr: 'PEEP damarlara iletilmediği için eşittir', en: 'It is equal, as PEEP is not transmitted to the vessels', es: 'Es igual, porque la PEEP no se transmite a los vasos'},
      {tr: 'Balon birkaç dakika şişik tutulursa eşitlenir', en: 'It becomes equal if the balloon stays inflated for minutes', es: 'Se iguala si el balón se mantiene inflado varios minutos'}
    ],
    a: 1,
    ex: {
      tr: 'PEEP veya intrinsik PEEP varlığında ölçülen PAOP transmural değeri olduğundan yüksek gösterir. Balon önerilen hacmin üzerinde şişirilmez ve şişirme 2 solunum döngüsü veya 10–15 saniye ile sınırlanır; uzun şişirme pulmoner infarkta yol açabilir.',
      en: 'With PEEP or intrinsic PEEP, the measured PAOP overestimates the transmural value. The balloon is not inflated beyond the recommended volume and inflation is limited to 2 respiratory cycles or 10–15 seconds; prolonged inflation can cause pulmonary infarction.',
      es: 'Con PEEP o PEEP intrínseca, la PAOP medida sobreestima el valor transmural. El balón no se infla por encima del volumen recomendado y el inflado se limita a 2 ciclos respiratorios o 10–15 segundos; el inflado prolongado puede causar infarto pulmonar.'
    },
    src: 'eval'
  },
  'mostcare-up': {
    q: {
      tr: 'Düşük SVR’li septik şokta MostCare Up (PRAM) için kayıtta hangi sınırlama belirtilir?',
      en: 'In septic shock with low SVR, which limitation of MostCare Up (PRAM) does the record describe?',
      es: 'En el shock séptico con RVS baja, ¿qué limitación de MostCare Up (PRAM) describe el registro?'
    },
    o: [
      {tr: 'Her saat termodilüsyonla yeniden kalibrasyon zorunludur', en: 'Hourly recalibration with thermodilution is mandatory', es: 'Es obligatoria la recalibración horaria con termodilución'},
      {tr: 'Özel tek kullanımlık sensör olmadan ölçüm yapılamaz', en: 'It cannot measure without a dedicated disposable sensor', es: 'No puede medir sin un sensor desechable específico'},
      {tr: '1000 Hz örnekleme sayesinde doğruluk etkilenmez', en: 'Accuracy is unaffected thanks to 1000 Hz sampling', es: 'La exactitud no se afecta gracias al muestreo a 1000 Hz'},
      {tr: 'Kalibrasyonsuz sistem varsayımları bozulup uyum azalabilir', en: 'Uncalibrated assumptions may fail, reducing agreement', es: 'Los supuestos sin calibración pueden fallar y reducir la concordancia'}
    ],
    a: 3,
    ex: {
      tr: 'Kalibrasyonsuz sistemlerin varsayımları septik şokta, özellikle düşük SVR ile bozulabilir ve referans yöntemle uyum azalır; septik şokta PRAM çalışmalarının sonuçları tutarsızdır. MostCare Up özel tek kullanımlık malzeme gerektirmez.',
      en: 'The assumptions of uncalibrated systems can fail in septic shock, particularly with low SVR, reducing agreement with the reference method; PRAM results in septic shock are inconsistent. MostCare Up needs no dedicated disposables.',
      es: 'Los supuestos de los sistemas no calibrados pueden fallar en el shock séptico, sobre todo con RVS baja, y reducir la concordancia con el método de referencia; los resultados de PRAM en el shock séptico son inconsistentes. MostCare Up no requiere material desechable específico.'
    },
    src: 'trouble'
  },
  'cnap': {
    q: {
      tr: 'CNAP parmak basıncı hangi ölçüme göre kalibre edilir?',
      en: 'To which measurement is the CNAP finger pressure calibrated?',
      es: '¿Con qué medición se calibra la presión digital de CNAP?'
    },
    o: [
      {tr: 'Üst koldan alınan osilometrik NIBP ölçümlerine', en: 'To oscillometric NIBP measurements from the upper arm', es: 'A mediciones oscilométricas de PANI en el brazo'},
      {tr: 'Flebostatik eksendeki kalp referans sensörüne', en: 'To a heart reference sensor at the phlebostatic axis', es: 'A un sensor de referencia cardiaca en el eje flebostático'},
      {tr: 'Transpulmoner termodilüsyonla ölçülen debiye', en: 'To cardiac output measured by transpulmonary thermodilution', es: 'Al gasto cardiaco medido por termodilución transpulmonar'},
      {tr: 'Zorunlu invaziv radiyal arter basıncına', en: 'To a mandatory invasive radial arterial pressure', es: 'A una presión arterial radial invasiva obligatoria'}
    ],
    a: 0,
    ex: {
      tr: 'CNAP, hacim sabitleme yöntemiyle elde edilen parmak sistolik/diyastolik basınçlarını üst kol osilometrik ölçümlerine kalibre eder. Ayrı bir kalp referans sensörü kullanmaz; kalibrasyon kaynağı üst kol NIBP ölçümüdür.',
      en: 'CNAP calibrates the finger systolic/diastolic pressures obtained by the volume clamp method to upper-arm oscillometric measurements. It uses no separate heart reference sensor; the calibration source is the upper-arm NIBP.',
      es: 'CNAP calibra las presiones sistólica/diastólica digitales obtenidas por pinzamiento de volumen con mediciones oscilométricas en el brazo. No usa un sensor de referencia cardiaca independiente; la fuente de calibración es la PANI del brazo.'
    },
    src: 'principle'
  },
  'truevue': {
    q: {
      tr: 'TrueVue özofageal Doppler ışını desendan aort akımıyla iyi hizalanmamış. Ölçülen akım nasıl etkilenir?',
      en: 'The TrueVue oesophageal Doppler beam is poorly aligned with descending aortic flow. How is measured flow affected?',
      es: 'El haz Doppler esofágico de TrueVue está mal alineado con el flujo aórtico descendente. ¿Cómo se ve afectado el flujo medido?'
    },
    o: [
      {tr: 'Akım olduğundan yüksek ölçülür', en: 'Flow is overestimated', es: 'El flujo se sobreestima'},
      {tr: 'Nomogram düzelttiği için etkilenmez', en: 'It is unaffected because the nomogram corrects it', es: 'No se afecta porque el nomograma lo corrige'},
      {tr: 'Akım olduğundan düşük ölçülür', en: 'Flow is underestimated', es: 'El flujo se infraestima'},
      {tr: 'Yalnızca FTc değişir, akım değişmez', en: 'Only FTc changes; flow does not', es: 'Solo cambia el FTc; el flujo no'}
    ],
    a: 2,
    ex: {
      tr: 'Doppler ışını aksiyel akımla 20° içinde olmalıdır; küçük hizalama hataları bile akımın olduğundan düşük ölçülmesine yol açar. Nomogram yalnızca atım mesafesini atım hacmine dönüştürür, açı hatasını düzeltmez.',
      en: 'The Doppler beam must be within 20° of axial flow; even small misalignments lead to underestimation of flow. The nomogram only converts stroke distance to stroke volume and does not correct angle error.',
      es: 'El haz Doppler debe estar a menos de 20° del flujo axial; incluso pequeñas desalineaciones infraestiman el flujo. El nomograma solo convierte la distancia sistólica en volumen sistólico y no corrige el error de ángulo.'
    },
    src: 'trouble'
  },
  'uscom-1a': {
    q: {
      tr: 'Aort darlığı olan bir hastada USCOM 1A ile ölçüm için kayıtta hangi yaklaşım önerilir?',
      en: 'In a patient with aortic stenosis, which approach does the record support for USCOM 1A measurement?',
      es: 'En un paciente con estenosis aórtica, ¿qué abordaje respalda el registro para medir con USCOM 1A?'
    },
    o: [
      {tr: 'Suprasternal pencere; darlık ölçümü etkilemez', en: 'Suprasternal window, as stenosis does not affect the reading', es: 'Ventana supraesternal, ya que la estenosis no afecta a la medición'},
      {tr: 'Probu özofagusa yerleştirip desendan aortadan ölçmek', en: 'Placing the probe in the oesophagus to measure the descending aorta', es: 'Colocar la sonda en el esófago para medir la aorta descendente'},
      {tr: 'Doppler açısını bilerek 30°’nin üzerine çıkarmak', en: 'Deliberately increasing the Doppler angle above 30°', es: 'Aumentar deliberadamente el ángulo Doppler por encima de 30°'},
      {tr: 'Sol parasternal pencereden pulmoner kapak üzerinden ölçmek', en: 'Measuring across the pulmonary valve from the left parasternal window', es: 'Medir a través de la válvula pulmonar desde la ventana paraesternal izquierda'}
    ],
    a: 3,
    ex: {
      tr: 'Kapak darlığı incelenen kapak üzerindeki ölçümü bozabilir; aort darlığında ölçüm sol parasternal pencereden pulmoner kapak üzerinden yapılabilir. Özofageal ölçüm farklı bir yöntemdir; USCOM transkütan sürekli dalga Doppler kullanır.',
      en: 'Valve stenosis can distort measurements across the valve examined; in aortic stenosis, measurement can be made across the pulmonary valve from the left parasternal window. Oesophageal measurement is a different method; USCOM uses transcutaneous continuous wave Doppler.',
      es: 'La estenosis valvular puede distorsionar la medición en la válvula examinada; en la estenosis aórtica puede medirse a través de la válvula pulmonar desde la ventana paraesternal izquierda. La medición esofágica es otro método; USCOM usa Doppler continuo transcutáneo.'
    },
    src: 'trouble'
  },
  'icon': {
    q: {
      tr: 'Ameliyathanede hangi elektrokoter türü ICON elektriksel kardiyometri ölçümünü bozar?',
      en: 'In the operating room, which type of electrocautery interferes with ICON electrical cardiometry?',
      es: 'En el quirófano, ¿qué tipo de electrocauterio interfiere con la cardiometría eléctrica de ICON?'
    },
    o: [
      {tr: 'Yalnızca bipolar elektrokoter', en: 'Bipolar electrocautery only', es: 'Solo el electrocauterio bipolar'},
      {tr: 'Monopolar elektrokoter; bipolar bozmaz', en: 'Monopolar electrocautery; bipolar does not', es: 'El electrocauterio monopolar; el bipolar no'},
      {tr: 'Her iki tür de eşit derecede bozar', en: 'Both types interfere equally', es: 'Ambos tipos interfieren por igual'},
      {tr: 'Hiçbiri; sinyal filtrelenerek korunur', en: 'Neither; the signal is protected by filtering', es: 'Ninguno; la señal queda protegida por filtrado'}
    ],
    a: 1,
    ex: {
      tr: 'Ameliyathanede monopolar elektrokoter elektriksel kardiyometri ölçümünü bozar, bipolar elektrokoter bozmaz. Sinyal kalitesi yüzde olarak izlenir; elektrot yerleşiminin doğruluğu da ölçümü etkiler.',
      en: 'In the operating room, monopolar electrocautery interferes with electrical cardiometry, whereas bipolar does not. Signal quality is monitored as a percentage, and correct electrode placement also affects the measurement.',
      es: 'En el quirófano, el electrocauterio monopolar interfiere con la cardiometría eléctrica y el bipolar no. La calidad de la señal se monitoriza como porcentaje y la colocación correcta de los electrodos también influye en la medición.'
    },
    src: 'trouble'
  },
  'starling': {
    q: {
      tr: 'Starling ile yapılan PLR testinde hangi ΔSVI hastanın sıvıya yanıtlı olma olasılığının yüksek olduğunu gösterir?',
      en: 'During a Starling PLR test, which ΔSVI indicates that the patient is likely fluid responsive?',
      es: 'Durante una prueba de PLR con Starling, ¿qué ΔSVI indica que el paciente probablemente responde a fluidos?'
    },
    o: [
      {tr: 'SVI’da %10 veya daha fazla artış', en: 'An SVI increase of 10% or more', es: 'Un aumento del SVI del 10% o más'},
      {tr: 'SVI’da %3 veya daha fazla artış', en: 'An SVI increase of 3% or more', es: 'Un aumento del SVI del 3% o más'},
      {tr: 'SVI’da %10 veya daha fazla azalma', en: 'An SVI decrease of 10% or more', es: 'Una disminución del SVI del 10% o más'},
      {tr: 'CO 4,0–8,0 L/dk içinde kaldıkça herhangi bir değişim', en: 'Any change, as long as CO stays within 4.0–8.0 L/min', es: 'Cualquier cambio, mientras el CO se mantenga en 4,0–8,0 L/min'}
    ],
    a: 0,
    ex: {
      tr: 'Dinamik testte (PLR veya bolus) SVI’da %10 veya daha fazla artış olası sıvı yanıtlılığı, %10’un altındaki (negatif dahil) değişim yanıtsızlığı düşündürür. Kritik hastalarda biyoreaktans ile PLR yanıtını öngörme doğruluğu tartışmalıdır; sonuç klinik bağlamda yorumlanır.',
      en: 'In a dynamic assessment (PLR or bolus), an SVI increase of 10% or more suggests likely fluid responsiveness; a change below 10% (including negative values) suggests non-responsiveness. In critically ill patients the accuracy of bioreactance for predicting PLR response is disputed, so results are read in clinical context.',
      es: 'En una evaluación dinámica (PLR o bolo), un aumento del SVI del 10% o más sugiere probable respuesta a fluidos; un cambio inferior al 10% (incluidos valores negativos) sugiere ausencia de respuesta. En pacientes críticos la exactitud de la biorreactancia para predecir la respuesta a la PLR es discutida, por lo que el resultado se interpreta en contexto clínico.'
    },
    src: 'eval'
  },
  'tee': {
    q: {
      tr: 'Ameliyathanede sırtüstü yatan anestezi altındaki hastaya TEE probu nasıl yerleştirilir?',
      en: 'How is a TEE probe inserted in an anaesthetised supine patient in the operating room?',
      es: '¿Cómo se introduce la sonda de ETE en un paciente anestesiado en decúbito supino en el quirófano?'
    },
    o: [
      {tr: 'Önce ısırma bloğu yerleştirilir, ardından prob ilerletilir', en: 'The bite block is placed first, then the probe is advanced', es: 'Primero se coloca el bloqueador de mordida y luego se avanza la sonda'},
      {tr: 'Prob kilitli konumda ve belirgin fleksiyonla ilerletilir', en: 'The probe is advanced locked and in marked flexion', es: 'La sonda se avanza bloqueada y en flexión marcada'},
      {tr: 'Baş tarafından hafif antefleksiyonla, mandibula öne-aşağı kaldırılarak', en: 'From the head of the bed with slight anteflexion, lifting the mandible', es: 'Desde la cabecera con ligera anteflexión, elevando la mandíbula'},
      {tr: 'Prob derinlik işaretlerine göre sabit bir mesafeye ilerletilir', en: 'It is advanced to a fixed distance using the depth markers', es: 'Se avanza hasta una distancia fija según las marcas de profundidad'}
    ],
    a: 2,
    ex: {
      tr: 'Prob baş tarafından hafif antefleksiyonla yerleştirilir; mandibulanın öne ve aşağı kaldırılması geçişi kolaylaştırır. Isırma bloğu probdan önce konmaz, çünkü dili geriye iterek geçişi engeller; aşırı fleksiyondan kaçınılır ve prob kilitsiz konumda olmalıdır.',
      en: 'The probe is inserted from the head of the bed with slight anteflexion; lifting the mandible anteriorly and caudally eases passage. The bite block is not placed first because it pushes the tongue back and obstructs passage; excessive flexion is avoided and the probe must be unlocked.',
      es: 'La sonda se introduce desde la cabecera con ligera anteflexión; elevar la mandíbula hacia delante y abajo facilita el paso. El bloqueador de mordida no se coloca antes, porque desplaza la lengua hacia atrás y obstruye el paso; se evita la flexión excesiva y la sonda debe estar desbloqueada.'
    },
    src: 'placement'
  },
  'tte': {
    q: {
      tr: 'TTE ile LV ejeksiyon fraksiyonu tercihen hangi yöntemle ölçülür?',
      en: 'Which method is preferred for measuring LV ejection fraction with TTE?',
      es: '¿Qué método se prefiere para medir la fracción de eyección del VI con ETT?'
    },
    o: [
      {tr: 'Parasternal uzun eksende M-mod lineer ölçümlerinden hesaplama', en: 'Calculation from parasternal long-axis M-mode linear measurements', es: 'Cálculo a partir de mediciones lineales en modo M paraesternal eje largo'},
      {tr: '3B yöntem; yoksa 2B biplan disk toplama (Simpson)', en: '3D, or 2D biplane method of disks (Simpson) if 3D unavailable', es: '3D o, si no hay, método biplano de discos 2D (Simpson)'},
      {tr: 'IVC çapı ve solunumsal kollapsından türetme', en: 'Derivation from IVC diameter and its respiratory collapse', es: 'Derivación del diámetro de la VCI y su colapso respiratorio'},
      {tr: 'LVOT VTI ile kalp hızının çarpımından hesaplama', en: 'Calculation as the product of LVOT VTI and heart rate', es: 'Cálculo como producto de la VTI del TSVI por la frecuencia cardiaca'}
    ],
    a: 1,
    ex: {
      tr: 'LV hacmi ve EF tercihen 3B yöntemle, 3B yoksa 2B biplan disk toplama (Simpson) yöntemiyle ölçülür; lineer ölçümlerden EF hesaplanması önerilmez. EF yüke bağımlıdır ve tek başına yorumlanmaz.',
      en: 'LV volume and EF are preferably measured with 3D or, if unavailable, the 2D biplane method of disks (Simpson); calculating EF from linear measurements is not recommended. EF is load-dependent and is not interpreted in isolation.',
      es: 'El volumen del VI y la FE se miden preferentemente con 3D o, si no se dispone, con el método biplano de discos 2D (Simpson); no se recomienda calcular la FE a partir de mediciones lineales. La FE depende de la carga y no se interpreta de forma aislada.'
    },
    src: 'eval'
  },
  'ultrasound': {
    q: {
      tr: 'Ultrason eşliğinde blokta plan dışı (out-of-plane) iğne yaklaşımının temel sınırlılığı nedir?',
      en: 'In ultrasound-guided blocks, what is the main limitation of the out-of-plane needle approach?',
      es: 'En los bloqueos ecoguiados, ¿cuál es la principal limitación del abordaje de la aguja fuera de plano?'
    },
    o: [
      {tr: 'İğne ekranda hiçbir derinlikte görüntülenemez', en: 'The needle cannot be imaged on screen at any depth', es: 'La aguja no puede visualizarse en la pantalla a ninguna profundidad'},
      {tr: 'İğne uzun ekseninde ucu dahil tamamen görülür', en: 'The whole needle, tip included, is seen in its long axis', es: 'Se ve la aguja completa, incluida la punta, en su eje largo'},
      {tr: 'Yalnızca 3–8 MHz düşük frekanslı konveks problarla yapılabilir', en: 'It can only be performed with low-frequency 3–8 MHz curvilinear probes', es: 'Solo puede realizarse con sondas convexas de baja frecuencia de 3–8 MHz'},
      {tr: 'Görülen noktanın uç mu gövde mi olduğu kesinleştirilemez', en: 'Whether the imaged point is the tip or the shaft cannot be confirmed', es: 'No puede confirmarse si el punto visto es la punta o el cuerpo'}
    ],
    a: 3,
    ex: {
      tr: 'Plan dışı yaklaşımda iğne kısa ekseninde görüntülenir ve görülen noktanın uç mu gövde mi olduğu kesinleştirilemez. İğnenin ucu dahil tamamının görülmesi plan içi yaklaşımın özelliğidir.',
      en: 'With the out-of-plane approach the needle is imaged in short axis, and it cannot be established whether the imaged point is the tip or the shaft. Seeing the whole needle including the tip is a feature of the in-plane approach.',
      es: 'Con el abordaje fuera de plano la aguja se visualiza en eje corto y no puede establecerse si el punto visualizado es la punta o el cuerpo. Ver la aguja completa, incluida la punta, es propio del abordaje en plano.'
    },
    src: 'principle'
  },
});
