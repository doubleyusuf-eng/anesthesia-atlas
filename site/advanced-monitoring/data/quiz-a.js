'use strict';
/* Cihaz başına bir soru · grup A. Her sorunun doğru yanıtı content-src/<id>.json içindeki doğrulanmış metne dayanır. */
window.ICA_QUIZ = window.ICA_QUIZ || {};
Object.assign(window.ICA_QUIZ, {
  'bis-advance': {
    q: {
      tr: 'BIS Advance’ta frontal EMG, 70–110 Hz bandındaki gücü gösterir. Kas aktivitesi gibi yüksek frekanslı artefakt BIS değerini nasıl etkileyebilir?',
      en: 'On BIS Advance, frontal EMG shows power in the 70–110 Hz band. How can high-frequency artifact such as muscle activity affect the BIS value?',
      es: 'En BIS Advance, la EMG frontal muestra la potencia en la banda de 70–110 Hz. ¿Cómo puede afectar al valor de BIS un artefacto de alta frecuencia como la actividad muscular?'
    },
    o: [
      {tr: 'BIS’i daha düşük bir değere doğru saptırır', en: 'It biases BIS toward a lower value', es: 'Desvía el BIS hacia un valor más bajo'},
      {tr: 'BIS’i daha yüksek bir değere doğru saptırabilir', en: 'It can bias BIS toward a higher value', es: 'Puede desviar el BIS hacia un valor más alto'},
      {tr: 'Yalnızca supresyon oranını artırır, BIS’i etkilemez', en: 'It only raises the suppression ratio, not BIS', es: 'Solo aumenta la tasa de supresión, no el BIS'},
      {tr: 'BIS hesaplamasından tamamen dışlanır', en: 'It is completely excluded from the BIS calculation', es: 'Se excluye por completo del cálculo del BIS'}
    ],
    a: 1,
    ex: {
      tr: 'Kayda göre kas aktivitesi dahil yüksek frekanslı artefakt BIS’i yükseğe doğru saptırabilir. Tersine, uyanık gönüllülerde nöromüsküler blok BIS’i düşürmüştür; bu nedenle düşük değer tek başına farkındalığı dışlamaz.',
      en: 'Per the record, high-frequency artifact including muscle activity can bias BIS upward. Conversely, neuromuscular block lowered BIS in awake volunteers, so a low value alone does not exclude awareness.',
      es: 'Según el registro, los artefactos de alta frecuencia, incluida la actividad muscular, pueden desviar el BIS al alza. A la inversa, el bloqueo neuromuscular redujo el BIS en voluntarios despiertos, por lo que un valor bajo no excluye por sí solo la consciencia.'
    },
    src: 'params'
  },
  'ge-entropy': {
    q: {
      tr: 'GE Entropy’de RE (Response Entropy) ile SE (State Entropy) arasındaki fark esas olarak neyi yansıtır?',
      en: 'In GE Entropy, what does the difference between RE (Response Entropy) and SE (State Entropy) mainly reflect?',
      es: 'En GE Entropy, ¿qué refleja principalmente la diferencia entre RE (Response Entropy) y SE (State Entropy)?'
    },
    o: [
      {tr: 'Ham EEG’de izoelektrik dönemlerin oluşturduğu burst supresyon miktarını', en: 'The amount of burst suppression from isoelectric periods in the raw EEG', es: 'La cantidad de brote-supresión por periodos isoeléctricos en el EEG sin procesar'},
      {tr: 'Sensör elektrotlarının cilt temas empedansı düzeyini', en: 'The skin-contact impedance level of the sensor electrodes', es: 'El nivel de impedancia de contacto cutáneo de los electrodos'},
      {tr: 'Sağ ve sol hemisfer arasındaki kortikal asimetriyi', en: 'Cortical asymmetry between right and left hemispheres', es: 'La asimetría cortical entre los hemisferios derecho e izquierdo'},
      {tr: 'RE’ye 47 Hz’e kadar katılan frontal kas (FEMG) aktivitesini', en: 'Frontal muscle (FEMG) activity included in RE up to 47 Hz', es: 'La actividad muscular frontal (FEMG) incluida en la RE hasta 47 Hz'}
    ],
    a: 3,
    ex: {
      tr: 'SE, 32 Hz’e kadar olan EEG’den hesaplanır; RE ise 47 Hz’e kadar uzanarak hızlı FEMG sinyalini de içerir. Bu nedenle FEMG, RE–SE farkı olarak izlenir; burst supresyon ayrı olarak BSR ile gösterilir.',
      en: 'SE is calculated from the EEG up to 32 Hz, whereas RE extends to 47 Hz and also includes the fast FEMG signal. FEMG is therefore followed as the RE–SE difference; burst suppression is shown separately as BSR.',
      es: 'La SE se calcula a partir del EEG hasta 32 Hz, mientras que la RE llega a 47 Hz e incluye también la señal rápida de FEMG. Por ello, la FEMG se sigue como la diferencia RE–SE; el patrón de brote-supresión se muestra por separado como BSR.'
    },
    src: 'params'
  },
  'conox': {
    q: {
      tr: 'CONOX sensörü yerleştirilmeden önce alın derisi nasıl hazırlanmalıdır?',
      en: 'How should the forehead skin be prepared before applying the CONOX sensor?',
      es: '¿Cómo debe prepararse la piel de la frente antes de aplicar el sensor CONOX?'
    },
    o: [
      {tr: 'Sensör paketindeki aşındırıcı kâğıtla; alkol kullanılmadan', en: 'With the abrasive paper in the sensor package, without alcohol', es: 'Con el papel abrasivo del envase del sensor, sin alcohol'},
      {tr: 'Alkollü pedle silinip tamamen kuruması beklenerek', en: 'Wiped with an alcohol pad and allowed to dry completely', es: 'Limpiando con una toallita de alcohol y dejando secar por completo'},
      {tr: 'Temizlenmeden, elektrot merkezlerine bastırılarak', en: 'Without cleaning, pressing on the electrode centers', es: 'Sin limpiar, presionando el centro de los electrodos'},
      {tr: 'Deri önceden elektrot jeliyle nemlendirilerek', en: 'Pre-moistening the skin with electrode gel', es: 'Humedeciendo previamente la piel con gel de electrodos'}
    ],
    a: 0,
    ex: {
      tr: 'Üretici, elektrot bölgelerinin paketteki aşındırıcı kâğıtla temizlenmesini ve alkol kullanılmamasını ister; alkol elektrot empedansını artırabilir. Jel sızmasını önlemek için elektrot merkezine değil kenarlarına bastırılır.',
      en: 'The manufacturer requires cleaning the electrode sites with the supplied abrasive paper and not using alcohol, which can increase electrode impedance. The electrode edges, not the centers, are pressed to avoid gel leakage.',
      es: 'El fabricante indica limpiar las zonas de los electrodos con el papel abrasivo suministrado y no usar alcohol, que puede aumentar la impedancia. Se presionan los bordes de los electrodos, no el centro, para evitar la fuga de gel.'
    },
    src: 'placement'
  },
  'sedline': {
    q: {
      tr: 'SedLine’da erişkinde genel anestezinin idamesi için tanımlanan PSi bandının alt sınırı neden 25 olarak seçilmiştir?',
      en: 'In SedLine, why was 25 chosen as the lower limit of the PSi band defined for maintenance of general anesthesia in adults?',
      es: 'En SedLine, ¿por qué se eligió 25 como límite inferior de la banda de PSi definida para el mantenimiento de la anestesia general en adultos?'
    },
    o: [
      {tr: 'Ölçeğin BIS’in 40–60 idame bandına doğrudan karşılık gelmesi için', en: 'So that the scale maps directly onto the BIS 40–60 maintenance band', es: 'Para que la escala corresponda directamente a la banda de mantenimiento BIS 40–60'},
      {tr: 'PSi 25’in altındayken ekranda sayısal değer gösterilemediği için', en: 'Because no numeric PSi value can be displayed on screen below 25', es: 'Porque por debajo de 25 no puede mostrarse un valor numérico de PSi'},
      {tr: 'Burst supresyon PSi 0–12’ye entegre; süreğen supresyondan kaçınmak için', en: 'Burst suppression is built into PSi 0–12; to avoid sustained suppression', es: 'La brote-supresión está integrada en PSi 0–12; para evitar supresión sostenida'},
      {tr: 'Frontal EMG artefaktı 25’in altındaki PSi değerlerini bozduğu için', en: 'Because frontal EMG artifact distorts PSi values below 25', es: 'Porque el artefacto EMG frontal distorsiona los valores de PSi inferiores a 25'}
    ],
    a: 2,
    ex: {
      tr: 'Kayda göre burst supresyon PSi’nin 0–12 aralığına entegredir; alt sınır 25, süreğen burst supresyondan kaçınmak için seçilmiştir. PSi, BIS ile eşdeğer bir ölçek değildir.',
      en: 'Per the record, burst suppression is integrated into the PSi range 0–12, and the lower limit of 25 was chosen to avoid sustained burst suppression. PSi is not an equivalent scale to BIS.',
      es: 'Según el registro, el patrón de brote-supresión está integrada en el rango de PSi 0–12, y el límite inferior de 25 se eligió para evitar el patrón de brote-supresión sostenida. El PSi no es una escala equivalente al BIS.'
    },
    src: 'params'
  },
  'narcotrend': {
    q: {
      tr: 'Narcotrend, ham EEG’yi örüntü tanıma ile evrelere ayırır. Burst supresyon bu sistemde nasıl gösterilir?',
      en: 'Narcotrend classifies the raw EEG into stages by pattern recognition. How is burst suppression represented in this system?',
      es: 'Narcotrend clasifica el EEG sin procesar en estadios mediante reconocimiento de patrones. ¿Cómo se representa el patrón de brote-supresión en este sistema?'
    },
    o: [
      {tr: 'Son 63 saniyeye ait, indeksten ayrı bir supresyon yüzdesi olarak', en: 'As a suppression percentage over the last 63 s, separate from the index', es: 'Como un porcentaje de supresión de los últimos 63 s, aparte del índice'},
      {tr: 'Narcotrend indeksinin 100’e doğru yükselmesi olarak', en: 'As the Narcotrend index rising toward 100', es: 'Como un índice Narcotrend que sube hacia 100'},
      {tr: 'Evre A içinde, uyanıklıktan ayrı bir alt evre olarak', en: 'As a separate substage within stage A, distinct from wakefulness', es: 'Como un subestadio dentro del estadio A, distinto de la vigilia'},
      {tr: 'Evre F olarak; E2 başlayan supresyon örüntülerini gösterir', en: 'As stage F; E2 indicates incipient suppression patterns', es: 'Como estadio F; E2 indica patrones de supresión incipientes'}
    ],
    a: 3,
    ex: {
      tr: 'Narcotrend’de burst supresyon ayrı bir yüzde olarak değil, evre F olarak sınıflanır; E2 burst supresyon örüntülerinin ortaya çıkmaya başladığını gösterir. Evre A uyanıklığı, indeks 100 ise uyanık durumu ifade eder.',
      en: 'In Narcotrend, burst suppression is classified as stage F rather than as a separate percentage; E2 indicates the incipient appearance of burst suppression patterns. Stage A and an index of 100 denote the awake state.',
      es: 'En Narcotrend, el patrón de brote-supresión se clasifica como estadio F y no como un porcentaje aparte; E2 indica la aparición incipiente de patrones de brote-supresión. El estadio A y un índice de 100 corresponden al estado despierto.'
    },
    src: 'params'
  },
  'neurosense': {
    q: {
      tr: 'NeuroSENSE’te iki frontal kanaldan hesaplanan WAVcns değerleri arasında belirgin fark varsa kayda göre nasıl yorumlanır?',
      en: 'On NeuroSENSE, how is a wide difference between the WAVcns values of the two frontal channels interpreted according to the record?',
      es: 'En NeuroSENSE, según el registro, ¿cómo se interpreta una diferencia amplia entre los valores de WAVcns de los dos canales frontales?'
    },
    o: [
      {tr: 'Daha düşük değer her zaman gerçek kabul edilir; yüksek kanal göz ardı edilir', en: 'The lower value is always taken as true and the higher channel is ignored', es: 'El valor más bajo se toma siempre como real y se ignora el canal más alto'},
      {tr: 'Artefakt, kas aktivitesi farkı veya tek taraflı patoloji olabilir; klinik yargı esastır', en: 'It may reflect artifact, muscle differences or unilateral pathology; clinical judgment applies', es: 'Puede reflejar artefacto, diferencias musculares o patología unilateral; prima el juicio clínico'},
      {tr: 'İzlemeye devam etmeden önce cihaz BIS eşiklerine göre yeniden kalibre edilmelidir', en: 'The device must be recalibrated against BIS thresholds before monitoring continues', es: 'El dispositivo debe recalibrarse con los umbrales de BIS antes de seguir monitorizando'},
      {tr: 'İki değerin ortalaması alınır ve asimetriden bağımsız tek indeks olarak izlenir', en: 'The two values are averaged and followed as one index, regardless of asymmetry', es: 'Se promedian ambos valores y se siguen como un único índice, sin importar la asimetría'}
    ],
    a: 1,
    ex: {
      tr: 'Belirgin hemisferler arası asimetri artefakt, girişim, iki taraflı yüz kası aktivitesi farkı, supresse EEG veya tek taraflı beyin patolojisiyle oluşabilir; iki indeks çok farklıysa yönetim klinik yargıya dayanır. WAVcns’in 40–60 aralığı bu indekse özgüdür, BIS eşikleri aktarılmaz.',
      en: 'Pronounced inter-hemispheric asymmetry can arise from artifact, interference, bilateral differences in facial muscle activity, suppressed EEG or unilateral brain pathology; when the two indices differ widely, management is based on clinical judgment. The WAVcns 40–60 range is specific to this index; BIS thresholds are not transferred.',
      es: 'Una asimetría interhemisférica marcada puede deberse a artefactos, interferencias, diferencias bilaterales de actividad muscular facial, EEG suprimido o patología cerebral unilateral; si ambos índices difieren mucho, el manejo se basa en el juicio clínico. El rango 40–60 de WAVcns es propio de este índice; no se trasladan los umbrales de BIS.'
    },
    src: 'trouble'
  },
  'ani': {
    q: {
      tr: 'ANI-MR kılavuzuna göre aşağıdaki durumlardan hangisinde ANI ölçülemez?',
      en: 'According to the ANI-MR manual, in which of the following situations can ANI not be measured?',
      es: 'Según el manual de ANI-MR, ¿en cuál de las siguientes situaciones no puede medirse el ANI?'
    },
    o: [
      {tr: 'Solunum hızı 9/dk’nın altındayken', en: 'With a respiratory rate below 9/min', es: 'Con una frecuencia respiratoria inferior a 9/min'},
      {tr: 'Kalp hızı 90/dk olan sinüs ritminde', en: 'In sinus rhythm with a heart rate of 90/min', es: 'En ritmo sinusal con una frecuencia cardiaca de 90/min'},
      {tr: 'Düzenli solunum hızı 14/dk iken', en: 'With a regular respiratory rate of 14/min', es: 'Con una frecuencia respiratoria regular de 14/min'},
      {tr: 'Sensör 12 saattir deriye yapışıkken', en: 'When the sensor has been on the skin for 12 hours', es: 'Cuando el sensor lleva 12 horas adherido a la piel'}
    ],
    a: 0,
    ex: {
      tr: 'Ölçüm için kalp hızı 30–150/dk ve solunum hızı 9–30/dk olmalı, aritmi ve apne bulunmamalıdır. Sensörler deride 24 saate kadar kalabilir; bu nedenle diğer seçenekler ölçümü engellemez.',
      en: 'Measurement requires a heart rate of 30–150/min and a respiratory rate of 9–30/min without arrhythmia or apnea. The sensors may remain on the skin for up to 24 hours, so the other options do not prevent measurement.',
      es: 'La medición requiere una frecuencia cardiaca de 30–150/min y una frecuencia respiratoria de 9–30/min, sin arritmia ni apnea. Los sensores pueden permanecer adheridos hasta 24 horas, por lo que las demás opciones no impiden la medición.'
    },
    src: 'trouble'
  },
  'nipe': {
    q: {
      tr: 'NIPE Monitor V1, analiz ettiği EKG sinyalini nasıl elde eder?',
      en: 'How does the NIPE Monitor V1 obtain the ECG signal it analyzes?',
      es: '¿Cómo obtiene el NIPE Monitor V1 la señal de ECG que analiza?'
    },
    o: [
      {tr: 'V1 ve V5 pozisyonlarına yapıştırılan kendi tek kullanımlık EKG sensöründen', en: 'From its own single-use ECG sensor applied at the V1 and V5 positions', es: 'De su propio sensor de ECG de un solo uso colocado en las posiciones V1 y V5'},
      {tr: 'Parmak probunun fotopletismografi sinyalinden türetilen nabız aralıklarından', en: 'From pulse intervals derived from a finger probe’s photoplethysmography', es: 'De intervalos de pulso derivados de la fotopletismografía de una sonda digital'},
      {tr: 'Multiparametre monitörün analog EKG çıkışından, bağlantı kablosuyla', en: 'From the multiparameter monitor’s analog ECG output, via a cable', es: 'Por cable, desde la salida analógica de ECG del monitor multiparamétrico'},
      {tr: 'Alına yerleştirilen iki kanallı elektrot setinden', en: 'From a two-channel electrode set placed on the forehead', es: 'De un juego de electrodos de dos canales colocado en la frente'}
    ],
    a: 2,
    ex: {
      tr: 'NIPE Monitor V1’in kendi sensörü yoktur; EKG, multiparametre monitörün analog EKG çıkışından bir kabloyla alınır ve kullanılan elektrotlar o monitörün elektrotlarıdır. Sinyal kalitesi orta/kötü kalırsa monitörde başka bir EKG derivasyonu seçilir.',
      en: 'The NIPE Monitor V1 has no sensor of its own; the ECG is taken by cable from the multiparameter monitor’s analog ECG output, using that monitor’s electrodes. If signal quality stays medium or poor, another ECG lead is selected on the monitor.',
      es: 'El NIPE Monitor V1 no tiene sensor propio; el ECG se obtiene por cable de la salida analógica de ECG del monitor multiparamétrico, con los electrodos de ese monitor. Si la calidad de la señal sigue siendo media o mala, se selecciona otra derivación de ECG en el monitor.'
    },
    src: 'placement'
  },
  'nol': {
    q: {
      tr: 'NOL (PMD-200) parmak probunun yerleştirilmesiyle ilgili hangi öneri üretici kılavuzuyla uyumludur?',
      en: 'Which recommendation on placing the NOL (PMD-200) finger probe is consistent with the manufacturer’s manual?',
      es: '¿Qué recomendación sobre la colocación de la sonda digital de NOL (PMD-200) es coherente con el manual del fabricante?'
    },
    o: [
      {tr: 'Stabilite için tansiyon manşonuyla aynı kola takılır', en: 'Placed on the same arm as the BP cuff for stability', es: 'Se coloca en el mismo brazo que el manguito de presión para dar estabilidad'},
      {tr: 'Başparmak tercih edilir; bant sıkıca sarılır', en: 'The thumb is preferred; the strap is wrapped tightly', es: 'Se prefiere el pulgar; la cinta se ajusta con fuerza'},
      {tr: 'Tek kullanımlık sensör aynı hastada 72 saat değiştirilmez', en: 'The single-use sensor is kept unchanged for 72 hours', es: 'El sensor de un solo uso se mantiene sin cambiar 72 horas'},
      {tr: 'Tercihen işaret parmağına; manşon veya turnike olmayan ele', en: 'Preferably the index finger, on a hand without cuff or tourniquet', es: 'Preferiblemente en el índice, en una mano sin manguito ni torniquete'}
    ],
    a: 3,
    ex: {
      tr: 'Başka bir engel yoksa işaret parmağı önerilir; prob, kan akımını etkileyebilecek tansiyon manşonu veya turnike ile aynı ele takılmaz. Bant aşırı sıkılmaz ve tek kullanımlık sensör uzun izlemde en az 24 saatte bir değiştirilir.',
      en: 'In the absence of other considerations the index finger is recommended, and the probe is not placed on the same hand as a BP cuff or tourniquet that may affect blood flow. The strap is not over-tightened, and the single-use sensor is replaced at least every 24 hours during long monitoring.',
      es: 'Si no hay otras consideraciones se recomienda el índice, y la sonda no se coloca en la misma mano que un manguito de presión o torniquete que pueda alterar el flujo sanguíneo. La cinta no se aprieta en exceso y el sensor de un solo uso se cambia al menos cada 24 horas en monitorización prolongada.'
    },
    src: 'placement'
  },
  'spi': {
    q: {
      tr: 'SPI (Surgical Pleth Index) hangi sinyal bileşenlerinden hesaplanır?',
      en: 'From which signal components is SPI (Surgical Pleth Index) calculated?',
      es: '¿A partir de qué componentes de señal se calcula el SPI (Surgical Pleth Index)?'
    },
    o: [
      {tr: 'Frontal EEG spektral entropisi ve frontal EMG gücünden', en: 'From frontal EEG spectral entropy and frontal EMG power', es: 'De la entropía espectral del EEG frontal y la potencia de la EMG frontal'},
      {tr: 'Parmak pletismografisinde atım aralığı ve PPG amplitüdünden', en: 'From pulse interval and PPG amplitude of finger plethysmography', es: 'Del intervalo de pulso y la amplitud PPG de la pletismografía digital'},
      {tr: 'Avuç içi cilt iletkenliği dalgalanmaları ve periferik sıcaklıktan', en: 'From palmar skin conductance fluctuations and peripheral temperature', es: 'De las fluctuaciones de conductancia cutánea palmar y la temperatura periférica'},
      {tr: 'Tetanik elektriksel uyarıya pupil dilatasyon refleksinden', en: 'From the pupillary dilation reflex to tetanic electrical stimulation', es: 'Del reflejo de dilatación pupilar ante la estimulación eléctrica tetánica'}
    ],
    a: 1,
    ex: {
      tr: 'SPI, parmaktan alınan fotopletismografik dalga formunun atımdan atıma nabız aralığı değişimi ve pletismogram amplitüdünden (PPGA) hesaplanır; 0 reaktivite yok, 100 yüksek reaktivite anlamına gelir. Eşikleri NOL, ANI veya başka bir indekse aktarılamaz.',
      en: 'SPI is calculated from the beat-to-beat pulse interval variation and the plethysmogram amplitude (PPGA) of the finger photoplethysmographic waveform; 0 means no reactivity and 100 high reactivity. Its thresholds cannot be transferred to NOL, ANI or any other index.',
      es: 'El SPI se calcula a partir de la variación latido a latido del intervalo de pulso y de la amplitud del pletismograma (PPGA) de la onda fotopletismográfica digital; 0 indica ausencia de reactividad y 100 reactividad alta. Sus umbrales no pueden trasladarse a NOL, ANI ni a otro índice.'
    },
    src: 'principle'
  },
  'algiscan': {
    q: {
      tr: 'AlgiScan’de 9’a yakın bir Pupillary Pain Index (PPI) değeri neyi gösterir?',
      en: 'On AlgiScan, what does a Pupillary Pain Index (PPI) value close to 9 indicate?',
      es: 'En AlgiScan, ¿qué indica un valor del Pupillary Pain Index (PPI) cercano a 9?'
    },
    o: [
      {tr: 'Nosisepsiyona yüksek duyarlılık ve düşük analjezi', en: 'High sensitivity to nociception and low analgesia', es: 'Alta sensibilidad a la nocicepción y analgesia baja'},
      {tr: 'Yüksek analjezi düzeyi ve düşük nosiseptif yanıt', en: 'A high level of analgesia and low nociceptive response', es: 'Un nivel alto de analgesia y baja respuesta nociceptiva'},
      {tr: 'Derin hipnoz ve EEG supresyonu', en: 'Deep hypnosis and EEG suppression', es: 'Hipnosis profunda y supresión del EEG'},
      {tr: 'Bozulmuş nörolojik pupil ışık refleksi', en: 'An impaired neurological pupillary light reflex', es: 'Un reflejo pupilar fotomotor neurológico alterado'}
    ],
    a: 0,
    ex: {
      tr: 'PPI 1–9 arasındadır; 9’a yakın değer nosisepsiyona yüksek duyarlılık ve düşük analjezi, 1’e yakın değer yüksek analjezi anlamına gelir. PPI analjezi değerlendirmesi içindir; NPi gibi nörolojik ışık refleksi indeksleriyle eşdeğer değildir.',
      en: 'PPI ranges from 1 to 9; values close to 9 indicate high sensitivity to nociception and low analgesia, and values close to 1 high analgesia. PPI is intended for analgesia assessment and is not equivalent to neurological light-reflex indices such as NPi.',
      es: 'El PPI va de 1 a 9; los valores cercanos a 9 indican alta sensibilidad a la nocicepción y analgesia baja, y los cercanos a 1, analgesia alta. El PPI está destinado a valorar la analgesia y no equivale a índices neurológicos del reflejo fotomotor como el NPi.'
    },
    src: 'params'
  },
  'painsensor': {
    q: {
      tr: 'Erişkin ve çocuklarda MedStorm PainSensor elektrotları nasıl yerleştirilir?',
      en: 'How are the MedStorm PainSensor electrodes placed in adults and children?',
      es: '¿Cómo se colocan los electrodos de MedStorm PainSensor en adultos y niños?'
    },
    o: [
      {tr: 'Alın ortasına, cilt alkolle silinip tamamen kuruduktan sonra', en: 'On the mid-forehead, after wiping with alcohol and letting the skin dry', es: 'En el centro de la frente, tras limpiar con alcohol y dejar secar la piel'},
      {tr: 'El sırtına, metakarpların üzerine ortalanarak; cilt aşındırıcıyla hazırlanır', en: 'On the back of the hand, centered over the metacarpals; abrasive skin prep', es: 'En el dorso de la mano, centrado sobre los metacarpianos; piel preparada con abrasivo'},
      {tr: 'Avuç içine, orta elektrot hipotenar çıkıntı üzerinde; cilt hazırlığı gerekmez', en: 'On the palm, middle electrode over the hypothenar eminence; no skin prep', es: 'En la palma, electrodo central sobre la eminencia hipotenar; sin preparar la piel'},
      {tr: 'İşaret parmağı ucuna, klipsli bir iletkenlik probuyla', en: 'On the index fingertip, with a clip-on conductance probe', es: 'En la punta del índice, con una sonda de conductancia de pinza'}
    ],
    a: 2,
    ex: {
      tr: 'Erişkin ve çocuklarda elektrotlar avuç içine konur; orta elektrot en yüksek stabilite ve daha az hareket artefaktı için hipotenar çıkıntı üzerinde olmalıdır. Cilt hazırlığı gerekmez; hareketli hastalarda veya küçük çocuklarda ayak tabanı kullanılabilir.',
      en: 'In adults and children the electrodes go on the palm, with the middle electrode over the hypothenar eminence for highest stability and fewer movement artifacts. No skin preparation is required; the sole of the foot can be used in active patients or young children.',
      es: 'En adultos y niños los electrodos se colocan en la palma, con el electrodo central sobre la eminencia hipotenar para lograr la máxima estabilidad y menos artefactos de movimiento. No se requiere preparar la piel; en pacientes activos o niños pequeños puede usarse la planta del pie.'
    },
    src: 'placement'
  },
  'invos-7100': {
    q: {
      tr: 'INVOS 7100 ile serebral oksimetri için sensörler nereye yerleştirilir?',
      en: 'Where are the sensors placed for cerebral oximetry with the INVOS 7100?',
      es: '¿Dónde se colocan los sensores para la oximetría cerebral con INVOS 7100?'
    },
    o: [
      {tr: 'Daha iyi optik temas için sağ ve sol temporal bölgede saçlı deriye', en: 'On right and left hair-bearing temporal scalp for better optical contact', es: 'Sobre el cuero cabelludo temporal derecho e izquierdo, para mejor contacto óptico'},
      {tr: 'Alnın sağ ve sol yanına; saç, sinüs boşlukları ve sagittal sinüs dışında', en: 'Right and left forehead, away from hair, sinus cavities and sagittal sinus', es: 'En la frente derecha e izquierda, lejos del pelo, los senos paranasales y el seno sagital'},
      {tr: 'Tek sensör olarak alın orta hattına, superior sagittal sinüs üzerine', en: 'As a single sensor on the forehead midline, over the superior sagittal sinus', es: 'Como sensor único en la línea media frontal, sobre el seno sagital superior'},
      {tr: 'Kulak arkasına, mastoid bölge üzerine', en: 'Behind the ear, over the mastoid region', es: 'Detrás de la oreja, sobre la región mastoidea'}
    ],
    a: 1,
    ex: {
      tr: 'Serebral izlemde sensörler alnın sağ ve sol yanına konur; başka serebral bölgelere veya saç üzerine yerleştirme hatalı, düzensiz ya da hiç okuma vermeyebilir. Nevüs, sinüs boşlukları, superior sagittal sinüs, hematom ve AVM gibi anomaliler üzerine konmaz.',
      en: 'For cerebral monitoring the sensors are placed on the right and left forehead; placement at other cerebral sites or over hair may give inaccurate, erratic or no readings. They are not placed over nevi, sinus cavities, the superior sagittal sinus, hematomas or anomalies such as AVMs.',
      es: 'Para la monitorización cerebral los sensores se colocan en la frente derecha e izquierda; colocarlos en otras zonas cerebrales o sobre el pelo puede dar lecturas inexactas, erráticas o nulas. No se colocan sobre nevos, senos paranasales, el seno sagital superior, hematomas ni anomalías como MAV.'
    },
    src: 'placement'
  },
  'foresight': {
    q: {
      tr: 'ForeSight StO₂ ölçümünü nabız oksimetrisinden ayıran özellik nedir?',
      en: 'Which feature distinguishes ForeSight StO₂ measurement from pulse oximetry?',
      es: '¿Qué característica distingue la medición de StO₂ de ForeSight de la pulsioximetría?'
    },
    o: [
      {tr: 'Yalnızca arteriyel kandaki satürasyonu ölçer', en: 'It measures saturation in arterial blood only', es: 'Mide la saturación solo en la sangre arterial'},
      {tr: 'Geçerli ölçüm için güçlü pulsatil arteriyel akım gerektirir', en: 'It requires strong pulsatile arterial flow for a valid reading', es: 'Requiere un flujo arterial pulsátil intenso para una lectura válida'},
      {tr: 'Değeri EKG ile senkronize olarak her kalp atımında günceller', en: 'It updates the value with every heartbeat, synchronized to the ECG', es: 'Actualiza el valor en cada latido cardiaco, sincronizado con el ECG'},
      {tr: 'Pulsasyon gerektirmez; nabızsız koşullarda da ölçebilir', en: 'It needs no pulsations; it can measure in pulseless conditions', es: 'No requiere pulsaciones; puede medir en condiciones sin pulso'}
    ],
    a: 3,
    ex: {
      tr: 'ForeSight, mikrovasküler düzeyde (arteriol, venül ve kapiller) oksijenli hemoglobinin total hemoglobine oranını hesaplar; nabız oksimetrisinden farklı olarak pulsasyon gerektirmez. Değer 2 saniyede bir güncellenir.',
      en: 'ForeSight calculates the ratio of oxygenated to total hemoglobin at the microvascular level (arterioles, venules and capillaries); unlike pulse oximetry it does not require pulsations. The value is updated every 2 seconds.',
      es: 'ForeSight calcula la proporción de hemoglobina oxigenada respecto a la total a nivel microvascular (arteriolas, vénulas y capilares); a diferencia de la pulsioximetría, no requiere pulsaciones. El valor se actualiza cada 2 segundos.'
    },
    src: 'principle'
  },
  'masimo-o3': {
    q: {
      tr: 'Masimo O3, derin doku oksijenasyonunu izlemek için hangi ilkeyi kullanır?',
      en: 'Which principle does Masimo O3 use to monitor deep tissue oxygenation?',
      es: '¿Qué principio utiliza Masimo O3 para monitorizar la oxigenación de tejido profundo?'
    },
    o: [
      {tr: 'Kaynaktan iki uzaklıkta dedektörlü çok mesafeli difüzyon spektroskopisi', en: 'Multi-distance diffusion spectroscopy, detectors at two distances from the source', es: 'Espectroscopia de difusión multidistancia, detectores a dos distancias de la fuente'},
      {tr: 'Tek dedektörle, nabız oksimetrisindeki gibi yalnızca pulsatil absorpsiyon analizi', en: 'Pulsatile-only absorption analysis with a single detector, as in pulse oximetry', es: 'Análisis solo de absorción pulsátil con un único detector, como en pulsioximetría'},
      {tr: 'Beş dalga boyu ve sürekli otomatik deri pigmentasyonu düzeltmesi', en: 'Five wavelengths with continuous automatic skin pigmentation correction', es: 'Cinco longitudes de onda con corrección automática y continua de la pigmentación'},
      {tr: 'Orta serebral arterde transkraniyal ultrasonla akım hızı ölçümü', en: 'Transcranial ultrasound measurement of middle cerebral artery flow velocity', es: 'Ecografía transcraneal de la velocidad de flujo en la arteria cerebral media'}
    ],
    a: 0,
    ex: {
      tr: 'O3, bir yayıcı ve iki dedektörlü sensörle (4 dalga boyu) çok mesafeli difüzyon spektroskopisi kullanır; kaynaktan iki farklı uzaklıktaki dedektörlerin ışığı analiz edilir. Yine de ekstrakraniyal doku katkısına ilişkin O3’e özgü veri bu kayıtta incelenmemiştir.',
      en: 'O3 uses multi-distance diffusion spectroscopy with a one-emitter, two-detector sensor (4 wavelengths); light detected at two different distances from the source is analyzed. O3-specific data on extracranial tissue contribution were not reviewed for this record.',
      es: 'O3 utiliza espectroscopia de difusión multidistancia con un sensor de un emisor y dos detectores (4 longitudes de onda); se analiza la luz detectada a dos distancias diferentes de la fuente. En este registro no se revisaron datos específicos de O3 sobre la contribución del tejido extracraneal.'
    },
    src: 'principle'
  },
  'sensmart-x100': {
    q: {
      tr: 'SenSmart X-100’de cerrahi hastada rSO₂ bazal değeri ne zaman ve nasıl belirlenir?',
      en: 'On the SenSmart X-100, when and how is the rSO₂ baseline set in a surgical patient?',
      es: 'En SenSmart X-100, ¿cuándo y cómo se establece el valor basal de rSO₂ en un paciente quirúrgico?'
    },
    o: [
      {tr: 'Cihaz açılışta otomatik belirler; hastalar arasında sıfırlanmadan korunur', en: 'Set automatically by the device at power-on and carried over between patients', es: 'Lo fija el equipo automáticamente al encender y se conserva entre pacientes'},
      {tr: 'Entübasyondan sonra, hemodinami oturduğunda kullanıcı tarafından belirlenir', en: 'Set by the user after intubation, once hemodynamics have settled', es: 'Lo fija el usuario tras la intubación, cuando la hemodinámica se estabiliza'},
      {tr: 'Hasta stabilken, indüksiyondan önce, her yeni hasta için kullanıcı tarafından', en: 'By the user for each new patient, with patient stable, before induction', es: 'Por el usuario en cada paciente nuevo, con el paciente estable, antes de la inducción'},
      {tr: 'Ameliyat sonunda, karşılaştırma için kayıttan geriye dönük olarak hesaplanır', en: 'Calculated retrospectively from the record at the end of surgery', es: 'Se calcula retrospectivamente a partir del registro al final de la cirugía'}
    ],
    a: 2,
    ex: {
      tr: 'Bazal değer, hasta stabilken her rSO₂ kanalı için kullanıcı tarafından ayarlanır; cerrahi hastada indüksiyondan önce belirlenir. Hastalar arasında monitör beklemeye alınmaz veya yeni vaka başlatılmazsa yeni hastanın bazal değerleri hatalı olabilir.',
      en: 'The baseline is set by the user for each rSO₂ channel with the patient stable; in surgical patients it is set before induction. If the monitor is not put in standby or a new case started between patients, the new patient’s baseline values may be inaccurate.',
      es: 'La basal la establece el usuario para cada canal de rSO₂ con el paciente estable; en pacientes quirúrgicos se fija antes de la inducción. Si entre pacientes no se pone el monitor en espera o no se inicia un caso nuevo, las basales del nuevo paciente pueden ser inexactas.'
    },
    src: 'use'
  },
  'niro-200nx': {
    q: {
      tr: 'NIRO-200NX doku oksijenasyon indeksini (TOI) hangi yöntemle hesaplar?',
      en: 'By which method does NIRO-200NX calculate the tissue oxygenation index (TOI)?',
      es: '¿Con qué método calcula NIRO-200NX el índice de oxigenación tisular (TOI)?'
    },
    o: [
      {tr: 'Tek dedektördeki yoğunluk değişimlerinden, modifiye Beer-Lambert yöntemiyle', en: 'From intensity changes at a single detector, by modified Beer-Lambert', es: 'A partir de cambios de intensidad en un único detector, por Beer-Lambert modificado'},
      {tr: 'Yakın ve uzak fotodiyotlu uzaysal çözünürlüklü spektroskopiyle (SRS)', en: 'By spatially resolved spectroscopy (SRS) with near and far photodiodes', es: 'Por espectroscopia espacialmente resuelta (SRS) con fotodiodos cercano y lejano'},
      {tr: 'Nabız oksimetrisindeki gibi, arteriyel pulsatil absorpsiyon bileşeninden', en: 'From the arterial pulsatile absorption component, as in pulse oximetry', es: 'Del componente arterial de absorción pulsátil, como en la pulsioximetría'},
      {tr: 'Orta serebral arterdeki transkraniyal Doppler akım hızından türetilerek', en: 'Derived from transcranial Doppler flow velocity in the middle cerebral artery', es: 'Derivado de la velocidad por Doppler transcraneal en la arteria cerebral media'}
    ],
    a: 1,
    ex: {
      tr: 'TOI ve nTHI, bir ışık kaynağı ile yakın ve uzak iki fotodiyot kullanan SRS ile hesaplanır. Modifiye Beer-Lambert yöntemi ise ΔO₂Hb, ΔHHb ve ΔcHb gibi göreli değişimler için kullanılır.',
      en: 'TOI and nTHI are calculated by SRS using one light source and two photodiodes, near and far. The modified Beer-Lambert method is used for relative changes such as ΔO₂Hb, ΔHHb and ΔcHb.',
      es: 'El TOI y el nTHI se calculan mediante SRS con una fuente de luz y dos fotodiodos, cercano y lejano. El método de Beer-Lambert modificado se usa para cambios relativos como ΔO₂Hb, ΔHHb y ΔcHb.'
    },
    src: 'principle'
  }
});
