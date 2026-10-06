'use strict';
/* Cihaz başına bir soru · grup B. Her sorunun doğru yanıtı content-src/<id>.json içindeki doğrulanmış metne dayanır. */
window.ICA_QUIZ = window.ICA_QUIZ || {};
Object.assign(window.ICA_QUIZ, {
  'tetragraph': {
    q: {
      tr: 'TetraGraph nöromüsküler blok yanıtını hangi sinyali ölçerek belirler?',
      en: 'Which signal does TetraGraph measure to quantify the neuromuscular response?',
      es: '¿Qué señal mide TetraGraph para cuantificar la respuesta neuromuscular?'
    },
    o: [
      {tr: 'Kas üzerindeki elektrotlarla EMG yoluyla uyarılmış kas aksiyon potansiyeli', en: 'The evoked muscle action potential by EMG via electrodes over the muscle', es: 'El potencial de acción muscular evocado por EMG mediante electrodos sobre el músculo'},
      {tr: 'Başparmağa takılan ivmeölçerle başparmak hareketinin ivmesi', en: 'Thumb acceleration recorded by an accelerometer fixed to the thumb', es: 'La aceleración del pulgar registrada por un acelerómetro fijado al pulgar'},
      {tr: 'Piezoelektrik sensörle ölçülen başparmak hareketinin mekanik sinyali', en: 'The mechanical signal of thumb motion from a piezoelectric sensor', es: 'La señal mecánica del movimiento del pulgar obtenida con un sensor piezoeléctrico'},
      {tr: 'Kas kasılmasının mikrofonla deri yüzeyinden kaydedilen akustik titreşimleri', en: 'Acoustic vibrations of muscle contraction recorded by a skin-surface microphone', es: 'Las vibraciones acústicas de la contracción muscular registradas con un micrófono cutáneo'}
    ],
    a: 0,
    ex: {
      tr: 'TetraGraph, ulnar sinir uyarısına karşı kas aksiyon potansiyelini EMG ile ölçer; yanıt kas hareketinden değil elektriksel aktiviteden türetilir. Bu nedenle akseleromiyografi gibi başparmak hareketine bağlı değildir.',
      en: 'TetraGraph measures the evoked muscle action potential by EMG; the response is derived from electrical activity, not muscle movement, so unlike acceleromyography it does not rely on thumb motion.',
      es: 'TetraGraph mide el potencial de acción muscular evocado por EMG; la respuesta procede de la actividad eléctrica y no del movimiento, por lo que, a diferencia de la aceleromiografía, no depende del movimiento del pulgar.'
    },
    src: 'principle'
  },
  'twitchview': {
    q: {
      tr: 'TwitchView ekranında TOF sayısı 4 ve TOF oranı parantez içinde gösteriliyor. Bu neyi ifade eder?',
      en: 'TwitchView displays a TOF count of 4 with the TOF ratio shown in parentheses. What does this indicate?',
      es: 'TwitchView muestra un recuento TOF de 4 con el cociente TOF entre paréntesis. ¿Qué indica?'
    },
    o: [
      {tr: 'Dördüncü yanıt eşiğin altında kaldığı için oran hesaplanmamıştır', en: 'The fourth response is below threshold, so no ratio was calculated', es: 'La cuarta respuesta está por debajo del umbral, por lo que no se calculó el cociente'},
      {tr: 'Dört yanıt da küçüktür; sinyal kalitesi zayıftır, değer dikkatle yorumlanmalı', en: 'All four twitches are small; poor signal quality, so interpret with caution', es: 'Las cuatro respuestas son pequeñas; señal de baja calidad, interpretar con cautela'},
      {tr: 'Oran normalize edilmiş AMG değeridir; parantez 1,0’ı aşabildiğini gösterir', en: 'The ratio is a normalized AMG value; parentheses flag that it may exceed 1.0', es: 'El cociente es un valor de AMG normalizado; el paréntesis indica que puede superar 1,0'},
      {tr: 'Sistem kalibrasyonu tamamlanmış ve oran referans değere göre doğrulanmıştır', en: 'System calibration is complete and the ratio has been confirmed against the reference', es: 'La calibración del sistema ha finalizado y el cociente está confirmado frente a la referencia'}
    ],
    a: 1,
    ex: {
      tr: 'Kılavuza göre dört yanıtın tümü küçükse TOF sayısı 4 ile birlikte TOF oranı parantez içinde gösterilir ve zayıf sinyal kalitesini belirtir. Dördüncü yanıt eşiğin altındaysa oran yerine yalnızca TOF sayısı gösterilir.',
      en: 'Per the IFU, when all four twitches are small, a TOF count of 4 is shown with the TOF ratio in parentheses to flag poor signal quality. If the fourth response is below threshold, only the TOF count is shown instead of a ratio.',
      es: 'Según las instrucciones, si las cuatro respuestas son pequeñas se muestra un recuento TOF de 4 con el cociente entre paréntesis para señalar baja calidad de la señal. Si la cuarta respuesta queda bajo el umbral, solo se muestra el recuento TOF.'
    },
    src: 'params'
  },
  'tofscan': {
    q: {
      tr: 'TOFscan ile akseleromiyografi (AMG) kullanılırken normalize edilmemiş TOF oranı neden dikkatle yorumlanmalıdır?',
      en: 'When TOFscan is used with acceleromyography (AMG), why should a non-normalized TOF ratio be interpreted with caution?',
      es: 'Al usar TOFscan con aceleromiografía (AMG), ¿por qué debe interpretarse con cautela un cociente TOF no normalizado?'
    },
    o: [
      {tr: 'AMG’de bazal TOF oranı genellikle 0,7’nin altındadır; derlenme olduğundan düşük görünür', en: 'AMG baseline TOF ratio is usually below 0.7, so recovery looks lower than it is', es: 'El cociente TOF basal con AMG suele ser < 0,7, por lo que la recuperación parece menor'},
      {tr: 'AMG yalnızca TOF sayısını verir, TOF oranını hesaplayamaz', en: 'AMG provides only the TOF count and cannot calculate a TOF ratio', es: 'La AMG solo proporciona el recuento TOF y no puede calcular el cociente TOF'},
      {tr: 'AMG’de bazal TOF oranı sıklıkla 1,0’ın üzerindedir; derlenme olduğundan fazla görünebilir', en: 'AMG baseline TOF ratio often exceeds 1.0, so recovery may be overestimated', es: 'El cociente TOF basal con AMG suele superar 1,0, por lo que puede sobrestimarse la recuperación'},
      {tr: 'AMG değerleri yalnızca kaş sensörüyle ölçüldüğünde geçerlidir', en: 'AMG values are valid only when measured with the eyebrow sensor', es: 'Los valores de AMG solo son válidos cuando se miden con el sensor de ceja'}
    ],
    a: 2,
    ex: {
      tr: 'AMG’de blok öncesi bazal TOF oranı sıklıkla 1,0’ı aşar (çoğunlukla 1,1–1,15); bu nedenle normalize edilmemiş değer derlenmeyi olduğundan iyi gösterebilir. ASA’nın ≥0,9 derlenme tanımı EMG veya normalize AMG için geçerlidir.',
      en: 'With AMG the pre-block baseline TOF ratio often exceeds 1.0 (commonly 1.1–1.15), so a non-normalized value may overestimate recovery. The ASA ≥0.9 recovery definition applies to EMG or normalized AMG.',
      es: 'Con AMG, el cociente TOF basal previo al bloqueo suele superar 1,0 (habitualmente 1,1–1,15), por lo que un valor no normalizado puede sobrestimar la recuperación. La definición ASA de recuperación ≥0,9 se aplica a EMG o AMG normalizada.'
    },
    src: 'params'
  },
  'stimpod-nms450x': {
    q: {
      tr: 'STIMPOD NMS450X’te ulnar sinir üzerine uyarı elektrotları yerleştirilirken hangi düzen doğrudur?',
      en: 'When placing STIMPOD NMS450X stimulating electrodes over the ulnar nerve, which arrangement is correct?',
      es: 'Al colocar los electrodos de estimulación del STIMPOD NMS450X sobre el nervio cubital, ¿qué disposición es correcta?'
    },
    o: [
      {tr: 'Kırmızı anot sinire yakın, siyah katot sinirden uzakta', en: 'Red anode close to the nerve, black cathode away from the nerve', es: 'Ánodo rojo cerca del nervio, cátodo negro alejado del nervio'},
      {tr: 'Her iki elektrot da adduktor pollicis kası üzerinde', en: 'Both electrodes placed directly over the adductor pollicis muscle', es: 'Ambos electrodos colocados directamente sobre el músculo aductor del pulgar'},
      {tr: 'Siyah katot başparmak kas kitlesi üzerinde, kırmızı anot bilekte', en: 'Black cathode over the thumb muscle mass, red anode at the wrist', es: 'Cátodo negro sobre la masa muscular del pulgar, ánodo rojo en la muñeca'},
      {tr: 'Siyah katot hedef ulnar sinire yakın, kırmızı anot sinirden uzakta', en: 'Black cathode close to the target ulnar nerve, red anode away from it', es: 'Cátodo negro cerca del nervio cubital diana, ánodo rojo alejado de él'}
    ],
    a: 3,
    ex: {
      tr: 'Kılavuza göre siyah katot hedef sinire olabildiğince yakın, kırmızı anot ondan uzağa yerleştirilir; sinir, doğrudan kas uyarımını önleyecek kadar yanıt veren kastan uzak olmalıdır.',
      en: 'Per the IFU, the black cathode goes as close as possible to the target nerve and the red anode away from it; the nerve should be far enough from the responding muscle to avoid direct muscle stimulation.',
      es: 'Según las instrucciones, el cátodo negro se coloca lo más cerca posible del nervio diana y el ánodo rojo alejado; el nervio debe estar suficientemente lejos del músculo efector para evitar la estimulación muscular directa.'
    },
    src: 'placement'
  },
  'ge-carescape-nmt': {
    q: {
      tr: 'GE NMT modülüyle izlenecek hastada kollar örtü altında ve başparmak hareketi kısıtlı. Hangi sensör daha uygundur?',
      en: 'A patient monitored with the GE NMT module has tucked arms and restricted thumb movement. Which sensor is more suitable?',
      es: 'Un paciente monitorizado con el módulo NMT de GE tiene los brazos recogidos y el movimiento del pulgar restringido. ¿Qué sensor es más adecuado?'
    },
    o: [
      {tr: 'ElectroSensor; kasın elektriksel aktivitesini doğrudan ölçer', en: 'ElectroSensor, because it directly measures muscle electrical activity', es: 'ElectroSensor, porque mide directamente la actividad eléctrica del músculo'},
      {tr: 'MechanoSensor; başparmak hareketini piezoelektrik sensörle ölçer', en: 'MechanoSensor, because it measures thumb motion with a piezo sensor', es: 'MechanoSensor, porque mide el movimiento del pulgar con un sensor piezoeléctrico'},
      {tr: 'MechanoSensor; hareket kısıtlılığından etkilenmeyen kuvvet ölçümü yapar', en: 'MechanoSensor, because its force signal is unaffected by restriction', es: 'MechanoSensor, porque su señal de fuerza no se ve afectada por la restricción'},
      {tr: 'Her iki sensör de bu durumda eşit güvenilirlikte çalışır', en: 'Both sensors work with equal reliability in this situation', es: 'Ambos sensores funcionan con la misma fiabilidad en esta situación'}
    ],
    a: 0,
    ex: {
      tr: 'ElectroSensor kasın elektriksel aktivitesini kaydeder ve el hareketi engellendiğinde de güvenilir çalışır; MechanoSensor ise başparmak hareketini ölçtüğü için hareketin kısıtlanmaması gerekir.',
      en: 'The ElectroSensor records the muscle’s electrical activity and works reliably even when hand movement is obstructed, whereas the MechanoSensor measures thumb motion, which must not be restricted.',
      es: 'El ElectroSensor registra la actividad eléctrica del músculo y funciona de forma fiable aunque el movimiento de la mano esté impedido; el MechanoSensor mide el movimiento del pulgar, que no debe restringirse.'
    },
    src: 'trouble'
  },
  'masimo-root': {
    q: {
      tr: 'Masimo Root açıldığında ekranda “Please Connect a Device” mesajı görülüyor. Bu ne anlama gelir?',
      en: 'When Masimo Root is switched on, the screen shows “Please Connect a Device”. What does this mean?',
      es: 'Al encender Masimo Root, la pantalla muestra «Please Connect a Device». ¿Qué significa?'
    },
    o: [
      {tr: 'Pulse oksimetre sensörü hastadan ayrılmıştır', en: 'The pulse oximetry sensor has come off the patient', es: 'El sensor de pulsioximetría se ha desprendido del paciente'},
      {tr: 'Bağlı bir Radical-7, Radius-7 veya MOC-9 modülü yoktur', en: 'No Radical-7, Radius-7 or MOC-9 module is connected', es: 'No hay ningún módulo Radical-7, Radius-7 o MOC-9 conectado'},
      {tr: 'Seçili hasta profili için alarm limitleri tanımlanmamıştır', en: 'Alarm limits have not been defined for the selected profile', es: 'No se han definido límites de alarma para el perfil seleccionado'},
      {tr: 'Patient SafetyNet bağlantısı kurulamamıştır', en: 'The connection to Patient SafetyNet has failed', es: 'Ha fallado la conexión con Patient SafetyNet'}
    ],
    a: 1,
    ex: {
      tr: 'Root tek başına ölçüm yapmaz; parametreler takılı Radical-7/Radius-7 veya MOC-9 modüllerinden gelir. Hiçbir modül bağlı değilse “Please Connect a Device” mesajı görüntülenir.',
      en: 'Root does not measure on its own; parameters come from a docked Radical-7/Radius-7 or MOC-9 modules. If no module is connected, “Please Connect a Device” is displayed.',
      es: 'Root no mide por sí solo; los parámetros proceden de un Radical-7/Radius-7 acoplado o de módulos MOC-9. Si no hay ningún módulo conectado, aparece «Please Connect a Device».'
    },
    src: 'use'
  },
  'radical-7': {
    q: {
      tr: 'Radical-7’de daha uzun bir ortalama alma süresi (averaging time) seçmenin etkisi nedir?',
      en: 'What is the effect of selecting a longer averaging time on Radical-7?',
      es: '¿Qué efecto tiene seleccionar un tiempo de promediado más largo en Radical-7?'
    },
    o: [
      {tr: 'Desatürasyona yanıt hızlanır, ancak değerler daha dalgalı ve gürültülü olur', en: 'Response to desaturation becomes faster, while readings fluctuate more widely', es: 'La respuesta a la desaturación se acelera, pero las lecturas fluctúan más ampliamente'},
      {tr: 'Düşük perfüzyonda doğruluk artar ve desatürasyon alarmı gecikmeden verilir', en: 'Accuracy at low perfusion improves and desaturation alarms come with no delay', es: 'La exactitud con baja perfusión mejora y las alarmas de desaturación no se retrasan'},
      {tr: 'Değerler daha stabil olur ama yanıt gecikir, SpO₂/nabız değişimleri azalır', en: 'Readings are steadier, but response is delayed and SpO₂/PR variations blunted', es: 'Lecturas más estables, pero respuesta más lenta y variaciones de SpO₂/FP atenuadas'},
      {tr: 'Düşük SIQ mesajı devre dışı kalır ve sinyal kalitesi göstergesi gizlenir', en: 'The low SIQ message is disabled and the signal quality indicator is hidden', es: 'Se desactiva el mensaje de low SIQ y se oculta el indicador de calidad de la señal'}
    ],
    a: 2,
    ex: {
      tr: 'Kılavuza göre uzun ortalama alma süresi okumaları daha stabil yapar, ancak yanıtı geciktirir ve ölçülen SpO₂ ile nabız hızı değişimlerini azaltır.',
      en: 'Per the manual, longer averaging makes readings more stable but delays the response and reduces the measured variations in SpO₂ and pulse rate.',
      es: 'Según el manual, un promediado más largo hace las lecturas más estables, pero retrasa la respuesta y reduce las variaciones medidas de SpO₂ y frecuencia de pulso.'
    },
    src: 'use'
  },
  'rad-97': {
    q: {
      tr: 'Rad-97 sensörü uygulanırken aşağıdakilerden hangisi önerilen uygulamadır?',
      en: 'Which of the following is a recommended practice when applying a Rad-97 sensor?',
      es: '¿Cuál de las siguientes es una práctica recomendada al aplicar un sensor de Rad-97?'
    },
    o: [
      {tr: 'Pratiklik için tansiyon manşonuyla aynı kola, manşonun distaline yerleştirmek', en: 'Placing it on the same arm as the blood pressure cuff, distal to it, for convenience', es: 'Colocarlo en el mismo brazo que el manguito de presión, distal a él, por comodidad'},
      {tr: 'Hareket artefaktını azaltmak için sensörü ek bantla sıkıca sarmak', en: 'Wrapping it tightly with additional tape to reduce motion artefact', es: 'Envolverlo firmemente con cinta adicional para reducir el artefacto por movimiento'},
      {tr: 'Sinyal yeterliyse dedektör penceresinin kısmen açık kalmasına izin vermek', en: 'Accepting a partly uncovered detector window as long as the signal is adequate', es: 'Aceptar que la ventana del detector quede parcialmente descubierta si la señal es adecuada'},
      {tr: 'Venöz konjesyonu önlemek için sensörü kalp seviyesinin altında bırakmamak', en: 'Not leaving the sensor below heart level, to avoid venous congestion', es: 'No dejar el sensor por debajo del corazón, para evitar la congestión venosa'}
    ],
    a: 3,
    ex: {
      tr: 'Sensör venöz konjesyonu önlemek için kalp seviyesinin altında olmamalıdır. Arter kateteri veya tansiyon manşonu olan ekstremiteden kaçınılır, sensör ek bantla sabitlenmez ve dedektör penceresini tamamen örten bir bölge seçilir.',
      en: 'The sensor should not be below heart level, to avoid venous congestion. A limb with an arterial catheter or BP cuff is avoided, extra tape is not used, and the site must fully cover the detector window.',
      es: 'El sensor no debe quedar por debajo del nivel del corazón para evitar la congestión venosa. Se evita la extremidad con catéter arterial o manguito, no se usa cinta adicional y el sitio debe cubrir por completo la ventana del detector.'
    },
    src: 'placement'
  },
  'rad-67': {
    q: {
      tr: 'Rad-67 ile anlık (spot-check) SpHb ölçümü için hangi ifade doğrudur?',
      en: 'Which statement about spot-check SpHb measurement with Rad-67 is correct?',
      es: '¿Qué afirmación sobre la medición puntual (spot-check) de SpHb con Rad-67 es correcta?'
    },
    o: [
      {tr: 'Yalnızca ≥18 yaşta yapılır; gebelerde ve böbrek hastalığında kullanılmaz', en: 'Only in patients aged ≥18; not for pregnant patients or renal disease', es: 'Solo en pacientes de ≥18 años; no en embarazadas ni con enfermedad renal'},
      {tr: 'Yenidoğan ve çocuklarda doğrulanmış olup bu yaş gruplarında da önerilir', en: 'It is validated in neonates and children and recommended in these age groups', es: 'Está validada en neonatos y niños y se recomienda en estos grupos de edad'},
      {tr: 'Doğruluk aralığı 8 g/dL altındaki ağır anemi değerlerini de kapsar', en: 'Its accuracy range also covers severe anaemia values below 8 g/dL', es: 'Su intervalo de exactitud incluye también valores de anemia grave inferiores a 8 g/dL'},
      {tr: 'Düşen SpHb için sürekli fizyolojik alarm ve trend uyarısı verir', en: 'It provides continuous physiological alarms for falling SpHb', es: 'Proporciona alarmas fisiológicas continuas ante el descenso de SpHb'}
    ],
    a: 0,
    ex: {
      tr: 'Rad-67’de SpHb yalnızca 18 yaş ve üzerindeki hastalarda ölçülebilir; pediatrik, gebe ve böbrek hastalığı olan hastalarda kullanım amacı yoktur. Cihaz fizyolojik alarm vermez ve doğruluk aralığı 8 g/dL altını kapsamaz.',
      en: 'On Rad-67, SpHb can be measured only in patients aged 18 years or older and is not intended for pediatric, pregnant or renal-disease patients. The device has no physiological alarms and its accuracy range does not include values below 8 g/dL.',
      es: 'En Rad-67, la SpHb solo puede medirse en pacientes de 18 años o más y no está indicada en pacientes pediátricos, embarazadas o con enfermedad renal. El dispositivo no tiene alarmas fisiológicas y su intervalo de exactitud no incluye valores < 8 g/dL.'
    },
    src: 'special'
  },
  'emma': {
    q: {
      tr: 'EMMA Adult/Pediatric hava yolu adaptörü neden infantlarda kullanılmamalıdır?',
      en: 'Why must the EMMA Adult/Pediatric airway adapter not be used in infants?',
      es: '¿Por qué no debe usarse el adaptador de vía aérea Adult/Pediatric de EMMA en lactantes?'
    },
    o: [
      {tr: 'İnfantlarda aşırı akım direnci oluşturur', en: 'It creates excessive flow resistance in infants', es: 'Genera una resistencia al flujo excesiva en lactantes'},
      {tr: 'Hasta devresine 6 ml ölü boşluk ekler', en: 'It adds 6 ml of dead space to the patient circuit', es: 'Añade 6 ml de espacio muerto al circuito del paciente'},
      {tr: '20 mmHg altındaki EtCO₂ değerlerini ölçemez', en: 'It cannot measure EtCO₂ values below 20 mmHg', es: 'No puede medir valores de EtCO₂ inferiores a 20 mmHg'},
      {tr: 'Örneği 50 ml/dk hızla yan akımdan çeker', en: 'It draws a sidestream sample at 50 ml/min', es: 'Aspira una muestra lateral a 50 ml/min'}
    ],
    a: 1,
    ex: {
      tr: 'Adult/Pediatric adaptör 6 ml ölü boşluk ekler ve infantlarda kullanılmaz; infantlarda 1 ml ölü boşluklu Infant adaptör kullanılır. Aşırı akım direnci ise Infant adaptörün erişkin/pediatrik hastada kullanılmasıyla ilgili uyarıdır.',
      en: 'The Adult/Pediatric adapter adds 6 ml of dead space and must not be used in infants, who need the Infant adapter (1 ml). Excessive flow resistance is the warning for using the Infant adapter in adult/pediatric patients.',
      es: 'El adaptador Adult/Pediatric añade 6 ml de espacio muerto y no debe usarse en lactantes, que requieren el adaptador Infant (1 ml). La resistencia excesiva al flujo es la advertencia para el adaptador Infant en adultos o niños.'
    },
    src: 'placement'
  },
  'isa': {
    q: {
      tr: 'ISA yan akım gaz analizöründe çok yüksek solunum hızlarında end-tidal değerler nasıl etkilenebilir?',
      en: 'With the ISA sidestream gas analyzer, how may end-tidal values be affected at very high respiratory rates?',
      es: 'Con el analizador de gases de flujo lateral ISA, ¿cómo pueden verse afectados los valores teleespiratorios con frecuencias respiratorias muy altas?'
    },
    o: [
      {tr: 'Otomatik sıfırlama nedeniyle nominal değerin üzerinde okunabilir', en: 'They may read above nominal because of automatic zeroing', es: 'Pueden leerse por encima del valor nominal debido a la puesta a cero automática'},
      {tr: 'Ölçüm ana akımda yapıldığı için etkilenmez', en: 'They are unaffected because measurement is mainstream', es: 'No se ven afectados porque la medición es de flujo principal'},
      {tr: 'Sistem yanıt süresi nedeniyle nominal değerin altına düşebilir', en: 'They may fall below nominal because of the system response time', es: 'Pueden quedar por debajo del valor nominal por el tiempo de respuesta del sistema'},
      {tr: 'Bir sonraki sıfırlamaya kadar son değer sabit kalır', en: 'The last value stays frozen until the next zeroing', es: 'El último valor queda congelado hasta la siguiente puesta a cero'}
    ],
    a: 2,
    ex: {
      tr: 'Yan akım ölçümün bir sistem yanıt süresi vardır (2 m adaptör setiyle 4 saniyeden kısa); bu nedenle yüksek solunum hızlarında end-tidal değerler nominal değerin altına düşebilir.',
      en: 'Sidestream measurement has a system response time (under 4 seconds with a 2 m adapter set), so at high respiratory rates end-tidal values may fall below the nominal value.',
      es: 'La medición lateral tiene un tiempo de respuesta del sistema (menos de 4 segundos con un set de adaptador de 2 m), por lo que con frecuencias respiratorias altas los valores teleespiratorios pueden quedar por debajo del nominal.'
    },
    src: 'trouble'
  },
  'rainbow-acoustic': {
    q: {
      tr: 'rainbow Acoustic Monitoring için RAS small sensörü nereye uygulanır?',
      en: 'Where is the RAS small sensor applied for rainbow Acoustic Monitoring?',
      es: '¿Dónde se aplica el sensor RAS small para rainbow Acoustic Monitoring?'
    },
    o: [
      {tr: 'Göğüs ön duvarında, sternum üzerinde', en: 'On the anterior chest wall, over the sternum', es: 'En la pared torácica anterior, sobre el esternón'},
      {tr: 'Alında, kaşların hemen üzerinde', en: 'On the forehead, just above the eyebrows', es: 'En la frente, justo por encima de las cejas'},
      {tr: 'Parmak ucunda, oksimetri sensörünün yanında', en: 'On the fingertip, next to the oximetry sensor', es: 'En la punta del dedo, junto al sensor de oximetría'},
      {tr: 'Boyunda, larinksin sağ veya sol yanında', en: 'On the neck, at the right or left side of the larynx', es: 'En el cuello, a la derecha o a la izquierda de la laringe'}
    ],
    a: 3,
    ex: {
      tr: 'Üst hava yolundaki türbülan akımın sesleri boyun yüzeyine iletilir; RAS small sensörü boyun gevşek pozisyondayken larinksin sağ veya sol yanına yapıştırılır ve kablo omuza sabitlenip hastanın arkasına doğru yönlendirilir.',
      en: 'Sounds of turbulent upper-airway flow reach the neck surface; the RAS small sensor is applied beside the larynx (right or left) with the neck relaxed, and the cable is anchored on the shoulder and routed towards the back.',
      es: 'Los sonidos del flujo turbulento de la vía aérea superior llegan a la superficie del cuello; el sensor RAS small se aplica junto a la laringe (derecha o izquierda) con el cuello relajado, y el cable se fija al hombro y se dirige hacia la espalda.'
    },
    src: 'placement'
  },
  'sphb': {
    q: {
      tr: 'Klinik uygulamada SpHb değerleri en doğru şekilde nasıl kullanılır?',
      en: 'How are SpHb values most appropriately used in clinical practice?',
      es: '¿Cómo se utilizan de forma más adecuada los valores de SpHb en la práctica clínica?'
    },
    o: [
      {tr: 'Trend olarak izlenir; klinik kararlardan önce laboratuvar Hb ölçülür', en: 'Followed as a trend; laboratory Hb is measured before clinical decisions', es: 'Se siguen como tendencia; la Hb de laboratorio se mide antes de decidir'},
      {tr: 'SIQ iyi olduğunda laboratuvar Hb yerine kullanılır', en: 'Used in place of laboratory Hb whenever SIQ is good', es: 'Se usan en lugar de la Hb de laboratorio siempre que la SIQ sea buena'},
      {tr: 'Tek ölçüm, trendden daha güvenilir kabul edilir', en: 'A single reading is considered more reliable than the trend', es: 'Una lectura aislada se considera más fiable que la tendencia'},
      {tr: 'Hareket ve düşük perfüzyon sırasında da doğrulanmış değer olarak kabul edilir', en: 'Accepted as validated values even during patient motion and low perfusion', es: 'Se aceptan como valores validados incluso con movimiento y baja perfusión'}
    ],
    a: 0,
    ex: {
      tr: 'SpHb tek değer yerine trend olarak değerlendirilir ve laboratuvar Hb’nin yerini tutmaz; klinik kararlardan önce kan örneği laboratuvarda analiz edilmelidir. Doğruluğu hareket ve düşük perfüzyonda doğrulanmamıştır.',
      en: 'SpHb is assessed as a trend rather than a single value and does not replace laboratory Hb; blood samples should be analysed in the laboratory before clinical decisions. Its accuracy has not been validated during motion or low perfusion.',
      es: 'La SpHb se valora como tendencia y no como valor aislado, y no sustituye a la Hb de laboratorio; las muestras deben analizarse en el laboratorio antes de las decisiones clínicas. Su exactitud no está validada con movimiento ni baja perfusión.'
    },
    src: 'eval'
  },
  'spco': {
    q: {
      tr: 'Karbon monoksit maruziyetinden şüphelenilen bir hastada SpCO normal aralıkta okunuyor. Doğru yorum hangisidir?',
      en: 'In a patient with suspected carbon monoxide exposure, SpCO reads in the normal range. What is the correct interpretation?',
      es: 'En un paciente con sospecha de exposición a monóxido de carbono, la SpCO está en rango normal. ¿Cuál es la interpretación correcta?'
    },
    o: [
      {tr: 'SIQ iyiyse CO zehirlenmesi güvenle dışlanır, kan testi gerekmez', en: 'If SIQ is good, CO poisoning is reliably excluded and no blood test is needed', es: 'Si la SIQ es buena, la intoxicación por CO queda descartada sin análisis de sangre'},
      {tr: 'Maruziyeti dışlamaz; kanda laboratuvar CO-oksimetri gerekir', en: 'It does not rule out exposure; lab blood CO-oximetry is required', es: 'No la descarta; se necesita CO-oximetría sanguínea de laboratorio'},
      {tr: 'Normal SpO₂ eşlik ediyorsa yüksek COHb olasılığı yoktur', en: 'With a normal SpO₂ as well, a high COHb is not possible', es: 'Si la SpO₂ también es normal, no es posible una COHb elevada'},
      {tr: 'SpCO yalnızca yüksek MetHb varlığında yanlış düşük okunur', en: 'SpCO reads falsely low only when MetHb is elevated', es: 'La SpCO solo da lecturas falsamente bajas cuando la MetHb está elevada'}
    ],
    a: 1,
    ex: {
      tr: 'Normal SpCO karbon monoksit maruziyetini dışlamaz, yüksek SpCO da tek başına tanı koydurmaz; şüphede kan örneğinde laboratuvar CO-oksimetri yapılmalıdır. Yüksek COHb görünüşte normal SpO₂ ile birlikte bulunabilir.',
      en: 'A normal SpCO does not exclude carbon monoxide exposure and a high SpCO does not establish the diagnosis alone; when suspected, laboratory CO-oximetry of a blood sample is needed. High COHb can coexist with a seemingly normal SpO₂.',
      es: 'Una SpCO normal no descarta la exposición a monóxido de carbono y una SpCO alta no establece el diagnóstico por sí sola; ante la sospecha se requiere CO-oximetría de laboratorio en sangre. Una COHb alta puede coexistir con una SpO₂ aparentemente normal.'
    },
    src: 'eval'
  },
  'spmet': {
    q: {
      tr: 'Metilen mavisi gibi intravasküler bir boya verildikten sonra SpMet ve SpO₂ değerleri için hangisi doğrudur?',
      en: 'After an intravascular dye such as methylene blue has been given, which statement about SpMet and SpO₂ is correct?',
      es: 'Tras administrar un colorante intravascular como el azul de metileno, ¿qué afirmación sobre SpMet y SpO₂ es correcta?'
    },
    o: [
      {tr: 'Boya SpMet doğruluğunu artırır, SpO₂ ölçümünü ise etkilemez', en: 'The dye improves SpMet accuracy and leaves SpO₂ unaffected', es: 'El colorante mejora la exactitud de SpMet y no afecta a la SpO₂'},
      {tr: 'Yalnızca SpO₂ etkilenir; SpMet güvenilir kalmaya devam eder', en: 'Only SpO₂ is affected; SpMet remains reliable throughout', es: 'Solo se ve afectada la SpO₂; la SpMet sigue siendo totalmente fiable'},
      {tr: 'İkisi de bozulabilir; noninvaziv değerler güvenilir değildir', en: 'Both may be impaired; noninvasive values are unreliable', es: 'Ambas pueden alterarse; los valores no invasivos no son fiables'},
      {tr: 'Yalnızca SpMet etkilenir; SpO₂ ölçümü güvenilir kalır', en: 'Only SpMet is affected; the SpO₂ reading remains reliable', es: 'Solo se ve afectada la SpMet; la lectura de SpO₂ sigue siendo fiable'}
    ],
    a: 2,
    ex: {
      tr: 'Metilen mavisi gibi intravasküler boyalar hem SpO₂ hem SpMet ölçümünü bozabilir; bu nedenle boya sonrası noninvaziv değerler güvenilir değildir ve laboratuvar CO-oksimetri ile doğrulama gerekir.',
      en: 'Intravascular dyes such as methylene blue can impair both SpO₂ and SpMet measurement, so noninvasive values are unreliable after the dye and laboratory CO-oximetry is needed for confirmation.',
      es: 'Los colorantes intravasculares como el azul de metileno pueden alterar la medición de SpO₂ y de SpMet, por lo que tras su administración los valores no invasivos no son fiables y se requiere confirmación con CO-oximetría de laboratorio.'
    },
    src: 'eval'
  },
  'ori': {
    q: {
      tr: 'SpO₂’si %94 olan bir hastada ORi neden 0,00 olarak gösterilir?',
      en: 'Why is ORi displayed as 0.00 in a patient whose SpO₂ is 94%?',
      es: '¿Por qué el ORi se muestra como 0,00 en un paciente con SpO₂ del 94 %?'
    },
    o: [
      {tr: 'Sensör hastadan ayrılmış ve sinyal kaybolmuştur', en: 'The sensor has come off and the signal has been lost', es: 'El sensor se ha desprendido y se ha perdido la señal'},
      {tr: 'ORi yalnızca ek oksijen almayan hastalarda hesaplanır', en: 'ORi is calculated only in patients not receiving oxygen', es: 'El ORi solo se calcula en pacientes sin oxígeno suplementario'},
      {tr: 'ORi, PaO₂’nin doğrudan ölçümüdür ve PaO₂ sıfıra inmiştir', en: 'ORi is a direct PaO₂ measurement and PaO₂ has reached zero', es: 'El ORi es una medición directa de la PaO₂ y esta ha llegado a cero'},
      {tr: 'SpO₂ %96’nın altındayken ORi 0 olarak gösterilir', en: 'ORi is displayed as 0 whenever SpO₂ is below 96%', es: 'El ORi se muestra como 0 siempre que la SpO₂ es inferior al 96 %'}
    ],
    a: 3,
    ex: {
      tr: 'ORi orta hiperoksik aralıktaki değişimleri gösteren birimsiz göreli bir indekstir; SpO₂ %96’nın altındayken 0 olarak gösterilir. PaO₂ değeri değildir ve ek oksijen alan hastalar için tasarlanmıştır.',
      en: 'ORi is a unitless relative index of changes in the moderate hyperoxic range; it is displayed as 0 when SpO₂ is below 96%. It is not a PaO₂ value and is intended for patients receiving supplemental oxygen.',
      es: 'El ORi es un índice relativo sin unidades de los cambios en el rango hiperóxico moderado; se muestra como 0 cuando la SpO₂ es inferior al 96 %. No es un valor de PaO₂ y está destinado a pacientes con oxígeno suplementario.'
    },
    src: 'principle'
  },
  'pvi': {
    q: {
      tr: 'Üretici kılavuzuna göre aşağıdakilerden hangisi PVi yorumunu sınırlayan bir faktördür?',
      en: 'According to the manufacturer’s manual, which of the following is a factor that limits PVi interpretation?',
      es: 'Según el manual del fabricante, ¿cuál de los siguientes es un factor que limita la interpretación del PVi?'
    },
    o: [
      {tr: 'Spontan solunum aktivitesi', en: 'Spontaneous breathing activity', es: 'Actividad respiratoria espontánea'},
      {tr: 'Kontrollü ventilasyonda sinüs ritmi', en: 'Sinus rhythm during controlled ventilation', es: 'Ritmo sinusal durante la ventilación controlada'},
      {tr: 'Aynı parmakta sabit sensör konumu', en: 'A stable sensor position on the same finger', es: 'Una posición estable del sensor en el mismo dedo'},
      {tr: 'Ölçüm bölgesinde yüksek ve stabil Pi', en: 'A high, stable Pi at the measurement site', es: 'Un Pi alto y estable en el sitio de medición'}
    ],
    a: 0,
    ex: {
      tr: 'Kılavuz PVi’yi etkileyen faktörler arasında spontan solunum aktivitesi, tidal volüm ve akciğer kompliyansı, açık perikard, aritmi, kalp yetmezliği, vazoaktif ilaçlar, düşük Pi, hareket ve prob konumunu sayar.',
      en: 'The manual lists spontaneous breathing activity among the factors affecting PVi, together with tidal volume and lung compliance, open pericardium, arrhythmia, heart failure, vasoactive drugs, low Pi, motion and probe position.',
      es: 'El manual incluye la actividad respiratoria espontánea entre los factores que afectan al PVi, junto con el volumen corriente y la distensibilidad pulmonar, el pericardio abierto, las arritmias, la insuficiencia cardiaca, los fármacos vasoactivos, el Pi bajo, el movimiento y la posición de la sonda.'
    },
    src: 'trouble'
  },
  'pi': {
    q: {
      tr: 'Perfüzyon indeksi (Pi) için en doğru yorum yaklaşımı hangisidir?',
      en: 'Which is the most appropriate way to interpret the perfusion index (Pi)?',
      es: '¿Cuál es la forma más adecuada de interpretar el índice de perfusión (Pi)?'
    },
    o: [
      {tr: 'Organ perfüzyonunun doğrudan ölçüsü olarak', en: 'As a direct measure of organ perfusion', es: 'Como una medida directa de la perfusión de órganos'},
      {tr: 'Aynı bölgede trend olarak izlenen, bölgeye özgü lokal bir değer olarak', en: 'As a local, site-specific value followed as a trend at the same site', es: 'Como un valor local y propio del sitio, seguido como tendencia en el mismo lugar'},
      {tr: 'Tüm monitörler için normali 0,3–10 olan sabit bir değer olarak', en: 'As a fixed value with a 0.3–10 normal range on all monitors', es: 'Como un valor fijo con un rango normal de 0,3–10 en todos los monitores'},
      {tr: 'Farklı üreticilerin cihazları arasında birbirinin yerine kullanılabilen değer olarak', en: 'As a value interchangeable between different manufacturers’ pulse oximeters', es: 'Como un valor intercambiable entre pulsioxímetros de distintos fabricantes'}
    ],
    a: 1,
    ex: {
      tr: 'Pi, ölçüm bölgesine ve hastaya özgü lokal bir değerdir; tek sayı yerine aynı hastada ve aynı bölgede trend olarak izlenir. Farklı üreticilerin indeksleri birbirinin yerine kullanılmaz ve Pi organ perfüzyonunun doğrudan ölçüsü değildir.',
      en: 'Pi is a local value specific to the site and patient; it is followed as a trend in the same patient at the same site rather than as a single number. Indices from different manufacturers are not interchangeable, and Pi is not a direct measure of organ perfusion.',
      es: 'El Pi es un valor local, propio del sitio y del paciente; se sigue como tendencia en el mismo paciente y el mismo sitio, no como un número aislado. Los índices de distintos fabricantes no son intercambiables y el Pi no mide directamente la perfusión de órganos.'
    },
    src: 'use'
  },
  'rra': {
    q: {
      tr: 'Radical-7’de akustik parazit sırasında ekranda RRa değeri kalmaya devam ediyor. Bu değer neden dikkatle yorumlanmalıdır?',
      en: 'On Radical-7, an RRa value remains on screen during acoustic interference. Why should it be interpreted with caution?',
      es: 'En Radical-7, un valor de RRa permanece en pantalla durante una interferencia acústica. ¿Por qué debe interpretarse con cautela?'
    },
    o: [
      {tr: 'Parazit sırasında değer tidal volümden hesaplanır', en: 'During interference the value is calculated from tidal volume', es: 'Durante la interferencia el valor se calcula a partir del volumen corriente'},
      {tr: 'Cihaz eş zamanlı olarak RRp’ye geçer ve iki değerin ortalamasını gösterir', en: 'The device switches to RRp and shows the average of both values', es: 'El dispositivo cambia a RRp y muestra el promedio de ambos valores'},
      {tr: 'Freshness ayarı son geçerli değeri bir süre gösterir; değer güncel olmayabilir', en: 'Freshness keeps the last valid value on screen; it may not be current', es: 'El ajuste Freshness mantiene el último valor válido; puede no ser actual'},
      {tr: 'Ekrandaki değer yalnızca apne algılandığında donar', en: 'The displayed value freezes only when apnea is detected', es: 'El valor mostrado se congela solo cuando se detecta apnea'}
    ],
    a: 2,
    ex: {
      tr: 'Freshness ayarı parazit sırasında son geçerli okumanın ne kadar süre gösterileceğini belirler (fabrika ayarı 5 dakika); bu sürede gösterilen değer güncel olmayabilir. Radical-7 RRa ve RRp’yi aynı anda izleyemez.',
      en: 'The Freshness setting determines how long the last valid reading is shown during interference (factory default 5 minutes), so the displayed value may not be current. Radical-7 cannot monitor RRa and RRp simultaneously.',
      es: 'El ajuste Freshness determina cuánto tiempo se muestra la última lectura válida durante la interferencia (5 minutos por defecto), por lo que el valor mostrado puede no ser actual. Radical-7 no puede monitorizar RRa y RRp a la vez.'
    },
    src: 'use'
  }
});
