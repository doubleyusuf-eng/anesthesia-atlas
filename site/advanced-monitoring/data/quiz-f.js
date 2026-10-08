'use strict';
/* Cihaz başına bir soru · grup F. Her sorunun doğru yanıtı content-src/<id>.json içindeki doğrulanmış metne dayanır. */
window.ICA_QUIZ = window.ICA_QUIZ || {};
Object.assign(window.ICA_QUIZ, {
  'capnograph': {
    q: {
      tr: 'Trakeal entübasyon denemesinden hemen sonra kapnogram düz çizgi olarak izleniyor. Bu bulgu nasıl kabul edilmelidir?',
      en: 'Immediately after attempted tracheal intubation the capnogram is a flat line. How should this finding be regarded?',
      es: 'Inmediatamente después del intento de intubación traqueal el capnograma es una línea plana. ¿Cómo debe considerarse este hallazgo?'
    },
    o: [
      {tr: 'Normal bir bulgudur; CO₂ genellikle birkaç dakika sonra görünür', en: 'A normal finding; CO₂ usually appears after several minutes', es: 'Un hallazgo normal; el CO₂ suele aparecer al cabo de varios minutos'},
      {tr: 'Trakeal yerleşimi doğrular; CO₂ dilüsyonuna bağlıdır', en: 'It confirms tracheal placement; it is due to CO₂ dilution', es: 'Confirma la colocación traqueal; se debe a la dilución del CO₂'},
      {tr: 'Aksi dışlanana kadar özofagus entübasyonu kabul edilir', en: 'It is regarded as oesophageal intubation until excluded', es: 'Se considera intubación esofágica hasta que se descarte'},
      {tr: 'Yalnızca örnekleme hattı sorunudur; hava yolu değerlendirmesi gerekmez', en: 'It is only a sampling-line fault; no airway assessment is needed', es: 'Es solo un fallo de la línea de muestreo; no requiere evaluar la vía aérea'}
    ],
    a: 2,
    ex: {
      tr: 'Entübasyondan sonra sürdürülen ekshale CO₂ saptanamıyorsa özofagus entübasyonu dışlanmalıdır; CO₂ yokluğu yalnızca kardiyak arreste bağlanmamalıdır.',
      en: 'Failure to detect sustained exhaled CO₂ after intubation requires exclusion of oesophageal intubation; absent CO₂ must not be attributed solely to cardiac arrest.',
      es: 'Si no se detecta CO₂ espirado sostenido tras la intubación, debe descartarse la intubación esofágica; su ausencia no debe atribuirse solo a la parada cardiaca.'
    },
    src: 'eval'
  },
  'multigas-analyzer': {
    q: {
      tr: 'Multigaz analizörü yaşa göre düzeltilmiş MAC değerini gösteriyor. Bu değer en doğru şekilde nasıl yorumlanır?',
      en: 'The multigas analyser displays age-adjusted MAC. How is this value best interpreted?',
      es: 'El analizador multigás muestra la MAC ajustada por edad. ¿Cómo se interpreta mejor este valor?'
    },
    o: [
      {tr: 'Popülasyona dayalı immobilite ölçüsüdür; bireysel bilinçsizliği garanti etmez', en: 'A population measure of immobility; not a guarantee of individual unconsciousness', es: 'Una medida poblacional de inmovilidad; no garantiza la inconsciencia individual'},
      {tr: 'Hastaya özgü bilinçsizlik ve analjezi düzeyini doğrudan ve bireysel olarak gösterir', en: 'It directly shows the individual patient’s level of unconsciousness and analgesia', es: 'Muestra directamente el nivel individual de inconsciencia y analgesia de este paciente'},
      {tr: 'Opioid kullanımından ve N₂O katkısından bağımsız sabit bir değerdir', en: 'A fixed value independent of opioid use and N₂O contribution', es: 'Un valor fijo independiente del uso de opioides y del aporte de N₂O'},
      {tr: 'Beyindeki amnezi etkisini doğrudan ölçen, hastaya özgü bireysel bir hedef değerdir', en: 'An individual target value that directly measures the amnestic effect in the brain', es: 'Un valor objetivo individual que mide directamente el efecto amnésico en el cerebro'}
    ],
    a: 0,
    ex: {
      tr: 'MAC, uyarana %50 hastada hareket olmayan alveoler konsantrasyondur; immobilite büyük ölçüde spinal kordda sağlanırken bilinçsizlik ve amnezi beyinde gerçekleşir, bu nedenle bireysel bilinçsizliği garanti etmez.',
      en: 'MAC is the alveolar concentration at which 50% of people do not move to a noxious stimulus; immobility is mediated largely at the spinal cord, whereas unconsciousness and amnesia are cerebral, so it does not guarantee individual unconsciousness.',
      es: 'La MAC es la concentración alveolar a la que el 50% de las personas no se mueve ante un estímulo nocivo; la inmovilidad se media sobre todo en la médula espinal y la inconsciencia y la amnesia en el cerebro, por lo que no garantiza la inconsciencia individual.'
    },
    src: 'eval'
  },
  'spirometry-module': {
    q: {
      tr: 'Kontrollü ventilasyonda Ppeak yükseliyor; inspiryum sonu oklüzyonla ölçülen Pplat ise değişmemiş. En olası mekanizma nedir?',
      en: 'During controlled ventilation Ppeak rises, while Pplat measured with an end-inspiratory occlusion is unchanged. What is the most likely mechanism?',
      es: 'Durante la ventilación controlada aumenta la Ppeak, mientras que la Pplat medida con oclusión teleinspiratoria no cambia. ¿Cuál es el mecanismo más probable?'
    },
    o: [
      {tr: 'Solunum sistemi kompliyansında azalma', en: 'A decrease in respiratory system compliance', es: 'Una disminución de la distensibilidad del sistema respiratorio'},
      {tr: 'Total PEEP düzeyinde artış', en: 'An increase in total PEEP', es: 'Un aumento de la PEEP total'},
      {tr: 'Pnömoperitona bağlı göğüs duvarı sertliği', en: 'Chest-wall stiffness due to pneumoperitoneum', es: 'Rigidez de la pared torácica por neumoperitoneo'},
      {tr: 'Hava yolu direncinde artış', en: 'An increase in airway resistance', es: 'Un aumento de la resistencia de la vía aérea'}
    ],
    a: 3,
    ex: {
      tr: 'Plato değişmeden Ppeak artıyorsa artış dirence bağlıdır; plato da yükselmişse total PEEP artmış veya kompliyans azalmıştır.',
      en: 'If Ppeak rises with an unchanged plateau, the increase is due to resistance; if the plateau has also risen, total PEEP has increased or compliance has decreased.',
      es: 'Si la Ppeak aumenta con meseta sin cambios, el aumento se debe a la resistencia; si la meseta también ha subido, ha aumentado la PEEP total o ha disminuido la distensibilidad.'
    },
    src: 'eval'
  },
  'volumetric-capnography': {
    q: {
      tr: 'Fizyolojik ölü boşluk Enghoff yaklaşımıyla hesaplanacaksa Vcap eğrisine ek olarak ne gerekir?',
      en: 'If physiological dead space is calculated with the Enghoff approach, what is needed in addition to the Vcap curve?',
      es: 'Si el espacio muerto fisiológico se calcula con el enfoque de Enghoff, ¿qué se necesita además de la curva de Vcap?'
    },
    o: [
      {tr: 'Faz III eğiminin orta noktasından alınan PACO₂', en: 'PACO₂ taken from the midpoint of the phase III slope', es: 'La PACO₂ obtenida del punto medio de la pendiente de la fase III'},
      {tr: 'PaCO₂ için arteriyel kan örneği', en: 'An arterial blood sample for PaCO₂', es: 'Una muestra de sangre arterial para la PaCO₂'},
      {tr: 'Transkütan tcPCO₂ ölçümü', en: 'A transcutaneous tcPCO₂ measurement', es: 'Una medición transcutánea de tcPCO₂'},
      {tr: 'Santral venöz kan gazı örneği', en: 'A central venous blood gas sample', es: 'Una muestra de gasometría venosa central'}
    ],
    a: 1,
    ex: {
      tr: 'Enghoff modifikasyonu PACO₂ yerine arteriyel PaCO₂ kullanır, bu nedenle arteriyel kan örneği gerekir; Bohr yaklaşımında PACO₂ Vcap eğrisinden elde edilir.',
      en: 'The Enghoff modification uses arterial PaCO₂ instead of PACO₂, so an arterial blood sample is needed; with the Bohr approach, PACO₂ is obtained from the Vcap curve.',
      es: 'La modificación de Enghoff usa la PaCO₂ arterial en lugar de la PACO₂, por lo que se necesita una muestra arterial; con el enfoque de Bohr, la PACO₂ se obtiene de la curva de Vcap.'
    },
    src: 'use'
  },
  'transcutaneous-co2-o2': {
    q: {
      tr: 'Transkütan izlemde tcPCO₂ aniden düşüyor ve tcPO₂ hızla yükseliyor. Bu tablo en çok neyi düşündürür?',
      en: 'During transcutaneous monitoring tcPCO₂ suddenly falls and tcPO₂ rises rapidly. What does this pattern most suggest?',
      es: 'Durante la monitorización transcutánea la tcPCO₂ cae bruscamente y la tcPO₂ sube con rapidez. ¿Qué sugiere más este patrón?'
    },
    o: [
      {tr: 'Isıtılmış sensör altında azalmış cilt perfüzyonu', en: 'Reduced skin perfusion beneath the heated sensor', es: 'Perfusión cutánea reducida bajo el sensor calentado'},
      {tr: 'Sensör stabilizasyon süresinin normal şekilde tamamlanması', en: 'Normal completion of the sensor stabilization period', es: 'Finalización normal del periodo de estabilización del sensor'},
      {tr: 'Sensör sıcaklığının arterializasyon için yetersiz ayarlanması', en: 'Sensor temperature set too low for arterialisation', es: 'Temperatura del sensor demasiado baja para la arterialización'},
      {tr: 'Hermetik olmayan sensör–cilt teması ve hava girişi', en: 'Non-hermetic sensor–skin contact with air ingress', es: 'Contacto sensor–piel no hermético con entrada de aire'}
    ],
    a: 3,
    ex: {
      tr: 'Hermetik olmayan temas veya ortam havası girişi PCO₂’yi düşürür, PO₂’yi hızla yükseltir; düşük perfüzyon ve yetersiz sensör sıcaklığı ise tipik olarak PCO₂’yi yüksek, PO₂’yi düşük gösterir.',
      en: 'Non-hermetic contact or ambient air ingress makes PCO₂ fall and PO₂ rise rapidly; low perfusion and inadequate sensor temperature typically make PCO₂ read high and PO₂ low.',
      es: 'El contacto no hermético o la entrada de aire ambiente hacen que la PCO₂ baje y la PO₂ suba rápidamente; la baja perfusión y la temperatura insuficiente del sensor suelen dar PCO₂ alta y PO₂ baja.'
    },
    src: 'trouble'
  },
  'eit': {
    q: {
      tr: 'EIT kemeri için genel olarak önerilen yerleşim seviyesi hangisidir?',
      en: 'Which belt level is generally recommended for EIT?',
      es: '¿Qué nivel de colocación del cinturón se recomienda en general para la EIT?'
    },
    o: [
      {tr: '2.–3. interkostal aralık, klavikulaya yakın', en: '2nd–3rd intercostal space, close to the clavicle', es: '2.º–3.er espacio intercostal, cerca de la clavícula'},
      {tr: '4.–5. interkostal aralık arası', en: 'Between the 4th and 5th intercostal spaces', es: 'Entre el 4.º y el 5.º espacio intercostal'},
      {tr: '6. interkostal aralığın altı, diyafram düzeyi', en: 'Below the 6th intercostal space, at diaphragm level', es: 'Por debajo del 6.º espacio intercostal, a nivel del diafragma'},
      {tr: 'Göbek düzeyi, abdomen çevresinde', en: 'Umbilical level, around the abdomen', es: 'A nivel umbilical, alrededor del abdomen'}
    ],
    a: 1,
    ex: {
      tr: 'Kemerin 4.–5. interkostal aralıklar arasına yerleştirilmesi önerilir; 6. interkostal aralığın altı önerilmez çünkü diyafram periyodik olarak ölçüm düzlemine girebilir.',
      en: 'A belt between the 4th and 5th intercostal spaces is recommended; placement below the 6th intercostal space is not, because the diaphragm may periodically enter the measurement plane.',
      es: 'Se recomienda colocar el cinturón entre el 4.º y el 5.º espacio intercostal; por debajo del 6.º no se recomienda porque el diafragma puede entrar periódicamente en el plano de medición.'
    },
    src: 'placement'
  },
  'multiparameter-monitor': {
    q: {
      tr: '2021 AAGBI/AoA önerilerine göre genel anestezide temel izleme (SpO₂, NIBP, EKG, sıcaklık) hangi ölçümler eklenir?',
      en: 'According to the 2021 AAGBI/AoA recommendations, what is added to basic minimum monitoring (SpO₂, NIBP, ECG, temperature) during general anaesthesia?',
      es: 'Según las recomendaciones AAGBI/AoA de 2021, ¿qué se añade a la monitorización mínima básica (SpO₂, NIBP, ECG, temperatura) en anestesia general?'
    },
    o: [
      {tr: 'İnspire/ekspire oksijen ve dalga formlu kapnografi', en: 'Inspired/expired oxygen and waveform capnography', es: 'Oxígeno inspirado/espirado y capnografía con curva'},
      {tr: 'İnvaziv arter basıncı ve santral venöz basınç', en: 'Invasive arterial pressure and central venous pressure', es: 'Presión arterial invasiva y presión venosa central'},
      {tr: 'Beyin doku oksijen basıncı ve ICP', en: 'Brain tissue oxygen tension and ICP', es: 'Presión tisular cerebral de oxígeno e ICP'},
      {tr: 'Elektriksel empedans tomografisi ve spirometri halkaları', en: 'Electrical impedance tomography and spirometry loops', es: 'Tomografía de impedancia eléctrica y bucles de espirometría'}
    ],
    a: 0,
    ex: {
      tr: 'Her anestezide minimum izlem pletismografili pulse oksimetre, NIBP, EKG ve ısıdan oluşur; genel anestezide inspire/ekspire oksijen ve dalga formlu kapnografi eklenir.',
      en: 'Minimum monitoring for every anaesthetic is a pulse oximeter with plethysmograph, NIBP, ECG and temperature; during general anaesthesia, inspired/expired oxygen and waveform capnography are added.',
      es: 'La monitorización mínima en toda anestesia incluye pulsioxímetro con pletismografía, NIBP, ECG y temperatura; en anestesia general se añaden oxígeno inspirado/espirado y capnografía con curva.'
    },
    src: 'overview'
  },
  'ecg': {
    q: {
      tr: 'Koroner arter hastalığı olan/riski taşıyan nonkardiyak cerrahi hastalarında hangi derivasyon kombinasyonu iskemi ataklarının en yüksek oranını yakalamıştır?',
      en: 'In non-cardiac surgical patients with or at risk of coronary artery disease, which lead combination detected the highest proportion of ischaemic episodes?',
      es: 'En pacientes de cirugía no cardiaca con enfermedad coronaria o en riesgo, ¿qué combinación de derivaciones detectó la mayor proporción de episodios isquémicos?'
    },
    o: [
      {tr: 'Yalnızca V5 (tek prekordiyal derivasyon)', en: 'V5 alone (single precordial lead)', es: 'V5 sola (una sola derivación precordial)'},
      {tr: 'II + V5 (ekstremite + bir prekordiyal)', en: 'II + V5 (limb + one precordial)', es: 'II + V5 (miembro + una precordial)'},
      {tr: 'II + V4 + V5 (ekstremite + iki prekordiyal)', en: 'II + V4 + V5 (limb + two precordial)', es: 'II + V4 + V5 (miembro + dos precordiales)'},
      {tr: 'Yalnızca II (tek ekstremite derivasyonu)', en: 'II alone (single limb lead)', es: 'II sola (una sola derivación de miembro)'}
    ],
    a: 2,
    ex: {
      tr: 'V5 tek başına atakların %75’ini, II+V5 %80’ini, II+V4+V5 ise %96’sını saptamıştır; tek derivasyon tüm iskemiyi göstermez.',
      en: 'V5 alone detected 75% of episodes, II+V5 80% and II+V4+V5 96%; a single lead does not detect all ischaemia.',
      es: 'V5 sola detectó el 75% de los episodios, II+V5 el 80% y II+V4+V5 el 96%; una sola derivación no detecta toda la isquemia.'
    },
    src: 'trouble'
  },
  'pulse-oximeter': {
    q: {
      tr: 'COHb veya MetHb yüksekliğinde konvansiyonel pulse oksimetri neden yanıltıcı olabilir?',
      en: 'Why can conventional pulse oximetry be misleading when COHb or MetHb is elevated?',
      es: '¿Por qué puede ser engañosa la pulsioximetría convencional cuando la COHb o la MetHb están elevadas?'
    },
    o: [
      {tr: 'Disfonksiyonel hemoglobinler pulsatil absorbans sinyalini tamamen ortadan kaldırır', en: 'Dyshaemoglobins completely abolish the pulsatile absorbance signal', es: 'Las dishemoglobinas eliminan por completo la señal pulsátil de absorbancia'},
      {tr: 'İki dalga boyu bu hemoglobin türlerini ayrı ayrı ölçemez', en: 'Two wavelengths cannot measure these haemoglobin species separately', es: 'Dos longitudes de onda no miden estas hemoglobinas por separado'},
      {tr: 'Disfonksiyonel hemoglobinler yalnızca nabız hızını değiştirir', en: 'Dyshaemoglobins change only the pulse rate', es: 'Las dishemoglobinas solo modifican la frecuencia de pulso'},
      {tr: 'Disfonksiyonel hemoglobinler perfüzyon indeksini sıfırlar', en: 'Dyshaemoglobins reset the perfusion index to zero', es: 'Las dishemoglobinas reducen a cero el índice de perfusión'}
    ],
    a: 1,
    ex: {
      tr: 'İki dalga boylu oksimetri dishemoglobinleri ayrı ayrı ölçemez. COHb, SpO₂ değerini yanıltıcı biçimde normal veya yüksek gösterebilir; MetHb artışı ise SpO₂ değerini yaklaşık %85’e yöneltir.',
      en: 'Two-wavelength oximetry cannot measure individual dyshaemoglobins. COHb can produce misleadingly normal or high SpO₂; increasing MetHb drives SpO₂ towards approximately 85%.',
      es: 'La oximetría de dos longitudes de onda no mide por separado las dishemoglobinas. La COHb puede producir una SpO₂ engañosamente normal o alta; el aumento de MetHb aproxima la SpO₂ al 85 %.'
    },
    src: 'principle'
  },
  'nibp': {
    q: {
      tr: 'Osilometrik NIBP ölçümünde maksimum osilasyon amplitüdündeki manşon basıncı hangi değer olarak alınır?',
      en: 'In oscillometric NIBP measurement, the cuff pressure at maximal oscillation amplitude is taken as which value?',
      es: 'En la medición oscilométrica de NIBP, ¿qué valor se asigna a la presión del manguito en la amplitud máxima de oscilación?'
    },
    o: [
      {tr: 'Sistolik arter basıncı (SAP)', en: 'Systolic arterial pressure (SAP)', es: 'Presión arterial sistólica (SAP)'},
      {tr: 'Diyastolik arter basıncı (DAP)', en: 'Diastolic arterial pressure (DAP)', es: 'Presión arterial diastólica (DAP)'},
      {tr: 'Nabız basıncı (sistolik − diyastolik)', en: 'Pulse pressure (systolic − diastolic)', es: 'Presión de pulso (sistólica − diastólica)'},
      {tr: 'Ortalama arter basıncı (MAP)', en: 'Mean arterial pressure (MAP)', es: 'Presión arterial media (MAP)'}
    ],
    a: 3,
    ex: {
      tr: 'Maksimum osilasyondaki manşon basıncı MAP kabul edilir; sistolik ve diyastolik basınçlar üreticiye özgü algoritmalarla hesaplanır, bu nedenle cihazlar birbirinin yerine kullanılamaz.',
      en: 'The cuff pressure at maximal oscillation is taken as MAP; systolic and diastolic pressures are calculated with manufacturer-specific algorithms, so devices are not interchangeable.',
      es: 'La presión del manguito en la oscilación máxima se toma como MAP; las presiones sistólica y diastólica se calculan con algoritmos propios de cada fabricante, por lo que los equipos no son intercambiables.'
    },
    src: 'principle'
  },
  'invasive-pressure': {
    q: {
      tr: 'Arter basıncı trasesinde yavaşlamış yükselme ve kaybolmuş dikrotik çentik var. En olası neden hangisidir?',
      en: 'The arterial trace shows a slurred upstroke and an absent dicrotic notch. What is the most likely cause?',
      es: 'El trazado arterial muestra un ascenso lento y ausencia de muesca dícrota. ¿Cuál es la causa más probable?'
    },
    o: [
      {tr: 'Hatta hava kabarcığı veya pıhtı (aşırı sönümleme)', en: 'Air bubbles or a clot in the line (overdamping)', es: 'Burbujas de aire o un coágulo en la línea (sobreamortiguación)'},
      {tr: 'Aşırı sert, kısa hortum (yetersiz sönümleme)', en: 'Excessively stiff, short tubing (underdamping)', es: 'Tubuladura excesivamente rígida y corta (infraamortiguación)'},
      {tr: 'Transdüserin damar seviyesinin 10 cm altında olması', en: 'Transducer positioned 10 cm below the vessel level', es: 'Transductor colocado 10 cm por debajo del nivel del vaso'},
      {tr: 'Basınç torbasının 300 mmHg’ye şişirilmiş olması', en: 'Pressure bag inflated to 300 mmHg', es: 'Bolsa de presión inflada a 300 mmHg'}
    ],
    a: 0,
    ex: {
      tr: 'Yavaş yükselme ve dikrotik çentiğin kaybı aşırı sönümlemeyi gösterir; başlıca nedenler hava kabarcığı, pıhtı, düşük basınç torbası basıncı, gevşek bağlantı ve kateter kıvrılmasıdır. Sert hortum ise yetersiz sönümlemeye yol açar.',
      en: 'A slurred upstroke with absent dicrotic notch indicates overdamping, mainly from air bubbles, clots, low pressure-bag pressure, loose connections or catheter kinking; stiff tubing causes underdamping instead.',
      es: 'El ascenso lento con ausencia de muesca dícrota indica sobreamortiguación, sobre todo por burbujas, coágulos, baja presión de la bolsa, conexiones flojas o acodamiento; la tubuladura rígida produce infraamortiguación.'
    },
    src: 'trouble'
  },
  'temperature-monitor': {
    q: {
      tr: 'Özofageal stetoskopa entegre ısı probunun doğru okuma vermesi için konumu nasıl olmalıdır?',
      en: 'How should a temperature probe incorporated into an oesophageal stethoscope be positioned to give accurate readings?',
      es: '¿Cómo debe colocarse una sonda de temperatura incorporada a un estetoscopio esofágico para obtener lecturas exactas?'
    },
    o: [
      {tr: 'Üst özofagusta, krikofaringeal bölgenin hemen altında', en: 'In the upper oesophagus, just below the cricopharyngeal region', es: 'En el esófago superior, justo debajo de la región cricofaríngea'},
      {tr: 'Hipofarinkste, solunum gazına yakın', en: 'In the hypopharynx, close to the respiratory gas', es: 'En la hipofaringe, cerca del gas respiratorio'},
      {tr: 'Kalp seslerinin en iyi duyulduğu noktada veya daha distalde', en: 'At the point of maximal heart sounds, or more distally', es: 'En el punto de máxima audición de los ruidos cardiacos, o más distal'},
      {tr: 'Burun deliklerinden birkaç santimetre içeride', en: 'A few centimetres inside the nares', es: 'Unos centímetros por dentro de las narinas'}
    ],
    a: 2,
    ex: {
      tr: 'Özofageal prob kalp seslerinin maksimal duyulduğu noktada veya daha distalde olmalıdır; bu noktanın proksimalindeki prob çekirdek ısıyı yansıtmayabilir.',
      en: 'The oesophageal probe must be at the point of maximal heart sounds or more distally; a probe proximal to this point may not reflect core temperature.',
      es: 'La sonda esofágica debe situarse en el punto de máxima audición de los ruidos cardiacos o más distal; si queda proximal a ese punto puede no reflejar la temperatura central.'
    },
    src: 'placement'
  },
  'nerve-stimulator': {
    q: {
      tr: 'Nöromüsküler blok yalnızca sinir stimülatörü ile görsel/dokunsal olarak değerlendiriliyor. Bu yöntemin temel sınırlılığı nedir?',
      en: 'Neuromuscular blockade is assessed visually/by touch with a nerve stimulator alone. What is the key limitation of this method?',
      es: 'El bloqueo neuromuscular se evalúa de forma visual/táctil solo con un estimulador nervioso. ¿Cuál es la principal limitación de este método?'
    },
    o: [
      {tr: 'TOF sayısı ve PTC görsel veya dokunsal değerlendirmeyle saptanamaz', en: 'Neither TOF count nor PTC can be detected by visual or tactile assessment', es: 'Ni el recuento TOF ni el PTC pueden detectarse por valoración visual o táctil'},
      {tr: 'Derin blok (PTC >1) orta düzey bloktan hiçbir şekilde ayırt edilemez', en: 'Deep block (PTC >1) cannot be distinguished from moderate block at all', es: 'El bloqueo profundo (PTC >1) no puede distinguirse en absoluto del moderado'},
      {tr: 'El bileğinde ulnar sinir stimülasyonu bu yöntemle uygulanamaz', en: 'Ulnar nerve stimulation at the wrist cannot be used with this method', es: 'La estimulación del nervio cubital en la muñeca no puede usarse con este método'},
      {tr: 'Ekstübasyona hazırlık (TOF oranı ≥0,9) subjektif olarak belirlenemez', en: 'Extubation readiness (TOF ratio ≥0.9) cannot be judged subjectively', es: 'La preparación para la extubación (TOF ≥0,9) no puede determinarse subjetivamente'}
    ],
    a: 3,
    ex: {
      tr: 'Stimülatörle TOF sayısı ve PTC görsel/dokunsal olarak saptanabilir; ancak TOF oranı >0,4 iken sönme güvenilir algılanamaz ve TOF oranı ≥0,9 ancak kantitatif monitörle ölçülebilir.',
      en: 'TOF count and PTC can be detected visually or by touch, but fade cannot be detected reliably when the TOF ratio is >0.4, and a TOF ratio ≥0.9 can be measured only with a quantitative monitor.',
      es: 'El recuento TOF y el PTC pueden detectarse de forma visual o táctil, pero el debilitamiento no se detecta con fiabilidad si el cociente TOF es >0,4, y un cociente ≥0,9 solo puede medirse con un monitor cuantitativo.'
    },
    src: 'eval'
  },
  'injection-pressure-monitor': {
    q: {
      tr: 'Periferik sinir bloğunda enjeksiyon başlangıcında açılış basıncı ≥15 psi ölçülüyor. İğne–sinir teması dışında hangisi de buna yol açabilir?',
      en: 'During a peripheral nerve block the opening injection pressure is ≥15 psi. Besides needle–nerve contact, what else can cause this?',
      es: 'Durante un bloqueo nervioso periférico la presión de apertura de inyección es ≥15 psi. Además del contacto aguja–nervio, ¿qué más puede causarlo?'
    },
    o: [
      {tr: 'İğnenin sinirden 1 mm uzakta perinöral konumda olması', en: 'A perineural needle position 1 mm away from the nerve', es: 'Una posición perineural de la aguja a 1 mm del nervio'},
      {tr: 'Fasya, kemik veya tendon teması ya da hızlı enjeksiyon', en: 'Contact with fascia, bone or tendon, or rapid injection', es: 'Contacto con fascia, hueso o tendón, o inyección rápida'},
      {tr: 'Monitörün standart Luer sürümü yerine NRFit sürümünün kullanılması', en: 'Using the NRFit version of the monitor instead of the standard Luer one', es: 'Usar la versión NRFit del monitor en lugar de la versión Luer estándar'},
      {tr: 'Enjeksiyonun yavaş ve kontrollü başlatılması', en: 'Starting the injection slowly and in a controlled way', es: 'Iniciar la inyección de forma lenta y controlada'}
    ],
    a: 1,
    ex: {
      tr: 'Yüksek açılış basıncı sinir temasına özgü değildir; fasya, kemik veya tendon teması ve 0,3 mL/s üzerindeki enjeksiyon hızı yanlış pozitif sonuç verebilir. İğne sinirden 1 mm uzaktayken basınç <15 psi bulunmuştur.',
      en: 'High OIP is not specific to nerve contact; fascia, bone or tendon contact and injection rates above 0.3 mL/s can give false positives. With the needle 1 mm from the nerve, pressure was <15 psi.',
      es: 'Una OIP alta no es específica del contacto con el nervio; el contacto con fascia, hueso o tendón y velocidades de inyección superiores a 0,3 mL/s pueden dar falsos positivos. Con la aguja a 1 mm del nervio, la presión fue <15 psi.'
    },
    src: 'eval'
  },
  'icp': {
    q: {
      tr: 'İntraparankimal ICP mikrotransdüserinin eksternal ventriküler drene (EVD) göre sınırlılığı hangisidir?',
      en: 'Which is a limitation of an intraparenchymal ICP microtransducer compared with an external ventricular drain (EVD)?',
      es: '¿Cuál es una limitación del microtransductor intraparenquimatoso de ICP frente al drenaje ventricular externo (EVD)?'
    },
    o: [
      {tr: 'Yerleştirildikten sonra kalibre edilemez ve BOS drenajı sağlamaz', en: 'Cannot be recalibrated after insertion; allows no CSF drainage', es: 'No puede recalibrarse tras insertarse ni permite drenar LCR'},
      {tr: 'Okumaları hasta pozisyonundaki değişikliklerden belirgin şekilde etkilenir', en: 'Its readings are markedly affected by changes in patient position', es: 'Sus lecturas se ven muy influidas por los cambios de posición del paciente'},
      {tr: 'Dış kulak yolu seviyesine sık aralıklarla yeniden sıfırlanması gerekir', en: 'It must be re-zeroed frequently to the external auditory meatus', es: 'Debe ponerse a cero con frecuencia al nivel del conducto auditivo externo'},
      {tr: 'Geçerli ölçüm için her seferinde BOS akışının durdurulması gerekir', en: 'CSF flow must be stopped for each measurement to be valid', es: 'Requiere detener el flujo de LCR en cada medición para que sea válida'}
    ],
    a: 0,
    ex: {
      tr: 'Mikrotransdüserler yerleştirildikten sonra yeniden kalibre edilemez, uzun kullanımda kayar ve BOS drenajına izin vermez; pozisyondan etkilenmezler. Referans seviyesine sıfırlama ve ölçüm sırasında BOS akışını durdurma EVD’ye özgüdür.',
      en: 'Microtransducers cannot be recalibrated after insertion, drift with prolonged use and do not allow CSF drainage; they are not influenced by position. Zeroing to a reference level and stopping CSF flow for measurement apply to the EVD.',
      es: 'Los microtransductores no pueden recalibrarse tras la inserción, derivan con el uso prolongado y no permiten drenar LCR; no se ven influidos por la posición. La puesta a cero a un nivel de referencia y la detención del flujo de LCR corresponden al EVD.'
    },
    src: 'principle'
  },
  'pbto2': {
    q: {
      tr: 'Sağ frontal lob parankimine yerleştirilmiş bir PbtO₂ probunun okuması nasıl yorumlanmalıdır?',
      en: 'How should the reading from a PbtO₂ probe placed in the right frontal lobe parenchyma be interpreted?',
      es: '¿Cómo debe interpretarse la lectura de una sonda de PbtO₂ colocada en el parénquima del lóbulo frontal derecho?'
    },
    o: [
      {tr: 'Her iki hemisferin global serebral oksijenlenmesini temsil eder', en: 'It represents global cerebral oxygenation of both hemispheres', es: 'Representa la oxigenación cerebral global de ambos hemisferios'},
      {tr: 'Juguler venöz oksijen satürasyonu (SjvO₂) ile özdeş bir değerdir', en: 'It is identical to jugular venous oxygen saturation (SjvO₂)', es: 'Es idéntica a la saturación venosa yugular de oxígeno (SjvO₂)'},
      {tr: 'Lokal bir ölçümdür; prob konumu okumayı güçlü biçimde etkiler', en: 'A local measurement; probe position strongly influences the reading', es: 'Es una medición local; la posición de la sonda influye mucho en la lectura'},
      {tr: 'Prob konumundan bağımsızdır; perilezyonel ve sağlam doku aynı değeri verir', en: 'Independent of probe position; perilesional and intact tissue read alike', es: 'Es independiente de la posición; el tejido perilesional y el sano dan el mismo valor'}
    ],
    a: 2,
    ex: {
      tr: 'PbtO₂ prob çevresindeki lokal doku oksijen basıncını ölçer; prob konumu okumayı güçlü biçimde etkiler, perilezyonel ve sağlam dokuda değerler farklıdır ve global serebral oksijenlenmeyi temsil etmez.',
      en: 'PbtO₂ measures local tissue oxygen pressure around the probe; position strongly influences the reading, perilesional and intact tissue values differ, and it does not represent global cerebral oxygenation.',
      es: 'La PbtO₂ mide la presión tisular local de oxígeno alrededor de la sonda; la posición influye mucho en la lectura, los valores perilesionales y en tejido sano difieren y no representa la oxigenación cerebral global.'
    },
    src: 'eval'
  },
});
