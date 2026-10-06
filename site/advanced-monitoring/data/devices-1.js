'use strict';
/* İleri Monitörizasyon Atlası · 1 Derinlik, 2 Nosisepsiyon, 3 NIRS, 5 Nöromüsküler */
ICA_DEVICES.push(

/* 1 · Anestezi derinliği ve beyin fonksiyonu */
{id:'bis-advance', cat:'depth', kind:'device', name:'BIS Advance', maker:'Medtronic',
 measures:['BIS','SQI','EMG','SR','DSA'], placement:'forehead-eeg',
 desc:{
  tr:'Alından alınan EEG’yi BIS algoritmasıyla işleyerek anestezik ajanların beyin üzerindeki etkisinin değerlendirilmesine yardımcı olan, 0–100 arasında boyutsuz BIS indeksini hesaplayan monitör. BIS’in yanında sinyal kalitesi indeksi (SQI), EMG, baskılanma oranı (SR) ve EEG görünümleri; iki ya da dört kanallı izlemde spektral yoğunluk dizisi (DSA) gösterilir.',
  en:'Monitor that processes forehead EEG with the BIS algorithm into the dimensionless 0–100 BIS index, helping to assess the effect of anesthetic agents on the brain. Alongside BIS it displays the signal quality index (SQI), EMG, suppression ratio (SR) and EEG views, with a density spectral array (DSA) in two- or four-channel monitoring.',
  es:'Monitor que procesa el EEG frontal con el algoritmo BIS para obtener el índice BIS adimensional de 0 a 100, que ayuda a valorar el efecto de los anestésicos sobre el cerebro. Junto al BIS muestra el índice de calidad de la señal (SQI), EMG, tasa de supresión (SR) y representaciones del EEG, con matriz de densidad espectral (DSA) en la monitorización de dos o cuatro canales.'},
 note:{
  tr:'FDA etiketine göre erişkinlerde ve 4 yaş ve üzeri çocuklarda endikedir. Nöromüsküler blok uygulanmış hastalarda BIS farkındalığın güvenilir olmayan bir göstergesi olabilir; BIS, diğer üreticilerin hasta monitörlerine entegre modüller olarak da bulunur.',
  en:'Per the FDA label it is indicated for adults and children aged 4 years and above. In patients who have received neuromuscular blocking drugs BIS may be an unreliable indicator of awareness; BIS is also available as modules integrated into other manufacturers’ patient monitors.',
  es:'Según la etiqueta de la FDA está indicado en adultos y niños de 4 años o más. En pacientes que han recibido bloqueantes neuromusculares el BIS puede ser un indicador poco fiable de consciencia; el BIS también existe como módulos integrados en monitores de paciente de otros fabricantes.'}},

{id:'ge-entropy', cat:'depth', kind:'module', name:'GE Entropy / E-Entropy', maker:'GE HealthCare',
 measures:['SE','RE','FEMG','BSR'], placement:'forehead-eeg',
 desc:{
  tr:'Alından alınan EEG ve frontal EMG sinyalinin düzensizliğini (spektral entropi) ölçerek beyin durumunun izlenmesine yardımcı olan monitör modülü. State Entropy (SE, 0–91) 32 Hz’e kadar EEG’yi, Response Entropy (RE, 0–100) buna ek olarak 47 Hz’e kadar hızlı frontal EMG’yi (FEMG) yansıtır; ham EEG’deki sessiz dönemler BSR ile gösterilir.',
  en:'Monitor module that quantifies the irregularity (spectral entropy) of the forehead EEG and frontal EMG signal to help monitor the state of the brain. State Entropy (SE, 0–91) reflects EEG up to 32 Hz, while Response Entropy (RE, 0–100) also includes fast frontal EMG (FEMG) up to 47 Hz; silent periods in the raw EEG are shown as BSR.',
  es:'Módulo de monitor que cuantifica la irregularidad (entropía espectral) del EEG frontal y del EMG frontal para ayudar a vigilar el estado del cerebro. La State Entropy (SE, 0–91) refleja el EEG hasta 32 Hz y la Response Entropy (RE, 0–100) incluye además el EMG frontal rápido (FEMG) hasta 47 Hz; los periodos silentes del EEG sin procesar se muestran como BSR.'},
 note:{
  tr:'Erişkinlerde ve 2 yaşından büyük çocuklarda, diğer fizyolojik parametrelere ek olarak kullanılmak üzere endikedir. RE–SE farkı yüz kası aktivitesini gösterir; anestezi yeterliliği tek bir ölçümle değerlendirilemez.',
  en:'Indicated for adults and children older than 2 years as an adjunct to other physiological parameters. The RE–SE difference reflects facial muscle activity; anesthetic adequacy cannot be judged from a single measurement.',
  es:'Indicado en adultos y niños mayores de 2 años como complemento de otros parámetros fisiológicos. La diferencia RE–SE refleja la actividad de los músculos faciales; la adecuación anestésica no puede valorarse con una sola medición.'}},

{id:'conox', cat:'depth', also:['noci'], kind:'device', name:'CONOX / CONOX 2D', maker:'Fresenius Kabi',
 measures:['qCON','qNOX','EMG','BSR','SQI'], placement:'forehead-eeg',
 desc:{
  tr:'Aynı alın sensöründen alınan EEG’den iki ayrı indeks türeten monitör: qCON (0–99) anestezi sırasındaki hipnotik etkiyi, qNOX (0–99) ise zararlı uyarana yanıt olasılığını izler. EMG, BSR ve sinyal kalitesi indeksi (SQI) eşlik eden göstergelerdir.',
  en:'Monitor that derives two indices from the EEG acquired with the same forehead sensor: qCON (0–99) tracks hypnotic effect during anesthesia and qNOX (0–99) the probability of response to noxious stimuli. EMG, BSR and the signal quality index (SQI) are accompanying indicators.',
  es:'Monitor que obtiene dos índices del EEG captado con el mismo sensor frontal: qCON (0–99) sigue el efecto hipnótico durante la anestesia y qNOX (0–99) la probabilidad de respuesta a estímulos nocivos. EMG, BSR y el índice de calidad de la señal (SQI) son indicadores complementarios.'},
 note:{
  tr:'qNOX bir ağrı puanı değildir. Cilt, sensör ambalajındaki zımparayla hazırlanır, alkol kullanılmaz; pediatrik sensör 3–18 yaş için etiketlidir.',
  en:'qNOX is not a pain score. The skin is prepared with the abrasive paper in the sensor package, not with alcohol; the pediatric sensor is labeled for ages 3–18 years.',
  es:'El qNOX no es una puntuación de dolor. La piel se prepara con el papel abrasivo del envase del sensor, no con alcohol; el sensor pediátrico está etiquetado para 3–18 años.'}},

{id:'sedline', cat:'depth', also:['masimo'], kind:'module', name:'Masimo SedLine', maker:'Masimo',
 measures:['PSi','DSA','SR','EMG','ARTF'], placement:'forehead-eeg',
 desc:{
  tr:'Root’a bağlanan, dört kanallı frontal EEG’yi çok değişkenli bir hesaplamayla anestezik etkiyle ilişkili Hasta Durum İndeksi’ne (PSi, 0–100) dönüştüren beyin fonksiyonu izleme modülü. PSi’nin yanında DSA, EMG, baskılanma oranı (SR) ve artefakt (ARTF) gösterilir.',
  en:'Brain function monitoring module connected to Root that converts four-channel frontal EEG by a multivariate computation into the Patient State Index (PSi, 0–100), an index related to anesthetic effect. Alongside PSi it displays DSA, EMG, suppression ratio (SR) and artifact (ARTF).',
  es:'Módulo de monitorización de la función cerebral conectado al Root que convierte el EEG frontal de cuatro canales, mediante un cálculo multivariante, en el Patient State Index (PSi, 0–100), un índice relacionado con el efecto anestésico. Junto al PSi muestra DSA, EMG, tasa de supresión (SR) y artefacto (ARTF).'},
 note:{
  tr:'Kılavuzda 25–50, varsayılan alarm eşikleri ve sedasyon altında beklenen aralık olarak verilir; genel anestezi bandı olarak dayanağı üreticinin bir teknik raporudur (white paper). PSi erişkinler için endikedir; erişkin sensörü 18 yaş altında kullanılmaz.',
  en:'In the manual, 25–50 is given as the default alarm limits and the range expected under sedation; its basis as a general-anesthesia band is a manufacturer white paper. PSi is indicated for adults; the adult sensor is not used in patients younger than 18 years.',
  es:'En el manual, 25–50 figura como límites de alarma por defecto y como el rango esperado bajo sedación; su base como banda de anestesia general es un documento técnico (white paper) del fabricante. El PSi está indicado en adultos; el sensor de adulto no se usa en menores de 18 años.'}},

{id:'narcotrend', cat:'depth', kind:'device', name:'Narcotrend Compact M / Module Select', maker:'MT MonitorTechnik',
 measures:['Narcotrend index','EEG stage A–F'], placement:'forehead-eeg',
 desc:{
  tr:'Ameliyat ve yoğun bakımda EEG’yi kaydedip örüntü tanıma ile A (uyanık) ile F (artan burst supresyondan elektriksel sessizliğe) arasındaki evrelere sınıflandıran sistem. Yazılım ayrıca 100 (uyanık) ile 0 (elektriksel sessizlik) arasında boyutsuz bir Narcotrend indeksi verir; Compact M değerlendirmesinde yaş düzeltmesi bulunur.',
  en:'System that records the EEG during surgery and in intensive care and classifies it by pattern recognition into stages from A (awake) to F (increasing burst suppression down to electrical silence). The software also gives a dimensionless Narcotrend index from 100 (awake) to 0 (electrical silence); the Compact M assessment includes age adjustment.',
  es:'Sistema que registra el EEG durante la cirugía y en cuidados intensivos y lo clasifica mediante reconocimiento de patrones en estadios de A (despierto) a F (supresión en salvas creciente hasta el silencio eléctrico). El software ofrece además un índice Narcotrend adimensional de 100 (despierto) a 0 (silencio eléctrico); la evaluación del Compact M incluye ajuste por edad.'},
 note:{
  tr:'Burst supresyon ayrı bir yüzde parametresi olarak değil, evre (E2, F0, F1) olarak gösterilir. Elektrot montajı, empedans sınırı ve alarm ayarları cihaz kılavuzundan doğrulanmalıdır.',
  en:'Burst suppression is shown as stages (E2, F0, F1) rather than as a separate percentage parameter. Electrode montage, impedance limit and alarm settings must be verified from the device manual.',
  es:'La supresión en salvas se muestra como estadios (E2, F0, F1) y no como un parámetro porcentual aparte. El montaje de electrodos, el límite de impedancia y las alarmas deben verificarse en el manual del equipo.'}},

{id:'neurosense', cat:'depth', kind:'device', name:'NeuroSENSE', maker:'NeuroWave Systems',
 measures:['WAVcns','SR'], placement:'forehead-eeg',
 desc:{
  tr:'İki frontal EEG kanalını (her hemisfer için bir kanal) dalgacık (wavelet) tabanlı ayrıştırmayla ayrı ayrı işleyen iki taraflı monitör. Her hemisfer için WAVcns indeksini (0–100) ve baskılanma oranını göstererek anesteziklerin hipnotik etkisinin izlenmesine yardımcı olur.',
  en:'Bilateral monitor that processes two frontal EEG channels (one per hemisphere) separately using wavelet-based decomposition. It displays the WAVcns index (0–100) and suppression ratio for each hemisphere to help monitor the hypnotic effect of anesthetics.',
  es:'Monitor bilateral que procesa por separado dos canales de EEG frontal (uno por hemisferio) mediante descomposición basada en wavelets. Muestra el índice WAVcns (0–100) y la tasa de supresión de cada hemisferio para ayudar a vigilar el efecto hipnótico de los anestésicos.'},
 note:{
  tr:'18 yaş ve üzeri hastalar için endikedir. WAVcns eşikleri bu indekse özgüdür; BIS veya diğer indekslerin eşikleri WAVcns’e aktarılmaz.',
  en:'Indicated for patients 18 years of age and older. WAVcns thresholds are specific to this index; thresholds of BIS or other indices are not transferred to WAVcns.',
  es:'Indicado en pacientes de 18 años o más. Los umbrales del WAVcns son propios de este índice; los del BIS u otros índices no se trasladan al WAVcns.'}},

/* 2 · Nosisepsiyon ve analjezi yanıtı */
{id:'ani', cat:'noci', kind:'device', name:'ANI', maker:'MDoloris',
 measures:['ANI','ANIi','ANIm'], placement:'chest-ecg',
 desc:{
  tr:'EKG’deki R–R aralıklarından solunuma bağlı kalp hızı değişkenliğini işleyerek parasempatik tonusla ilişkili Analjezi Nosisepsiyon İndeksini (ANI) türeten ve klinik değerlendirmeyi tamamlayan monitör. ANI-MR anlık (ANIi) ve ortalama (ANIm) değerleri 0–100 ölçekte gösterir; algoritmanın ulaşabildiği en düşük değer 12’dir.',
  en:'Monitor that processes respiration-related heart rate variability from ECG R–R intervals into the Analgesia Nociception Index (ANI), related to parasympathetic tone, as a complement to clinical assessment. ANI-MR displays instantaneous (ANIi) and averaged (ANIm) values on a 0–100 scale; the lowest value the algorithm can reach is 12.',
  es:'Monitor que procesa la variabilidad de la frecuencia cardiaca ligada a la respiración en los intervalos R–R del ECG para obtener el Analgesia Nociception Index (ANI), relacionado con el tono parasimpático, como complemento de la valoración clínica. El ANI-MR muestra valores instantáneos (ANIi) y promediados (ANIm) en una escala de 0 a 100; el valor mínimo que alcanza el algoritmo es 12.'},
 note:{
  tr:'ANI-MR yalnızca üreticinin ANI Sensor V1 PLUS sensörüyle çalışır; EKG monitörden alınmaz. Aritmi, bazı pacemaker türleri, kalp nakli, sinüs düğümünü etkileyen ilaçlar (ör. atropin), apne ve düzensiz spontan solunum ölçümü sınırlar.',
  en:'ANI-MR works only with the manufacturer’s ANI Sensor V1 PLUS; the ECG is not taken from the monitor. Arrhythmia, some types of pacemaker, heart transplantation, drugs affecting the sinus node (e.g., atropine), apnea and irregular spontaneous breathing limit the measurement.',
  es:'El ANI-MR solo funciona con el sensor ANI Sensor V1 PLUS del fabricante; el ECG no se toma del monitor. La arritmia, algunos tipos de marcapasos, el trasplante cardiaco, los fármacos que afectan al nodo sinusal (p. ej., atropina), la apnea y la respiración espontánea irregular limitan la medición.'}},

{id:'nipe', cat:'noci', kind:'device', name:'NIPE', maker:'MDoloris',
 measures:['NIPE'], placement:'chest-ecg',
 desc:{
  tr:'2 yaşından küçük hastalarda kalp hızı değişkenliğinin parasempatik bileşenini değerlendiren, 0–100 arasında sürekli konfor/rahatsızlık izleme indeksi. Bilinçli ve bilinçsiz hastalarda klinik değerlendirmeye yardımcı olarak kullanılır.',
  en:'Continuous comfort/discomfort monitoring index (0–100) that assesses the parasympathetic component of heart rate variability in patients younger than 2 years. It is used in conscious and unconscious patients as an adjunct to clinical judgment.',
  es:'Índice de monitorización continua de confort/disconfort (0–100) que valora el componente parasimpático de la variabilidad de la frecuencia cardiaca en pacientes menores de 2 años. Se usa en pacientes conscientes e inconscientes como complemento del juicio clínico.'},
 note:{
  tr:'NIPE Monitor V1’in kendi sensörü yoktur; EKG sinyali çok parametreli monitörün analog EKG çıkışından alınır. Sinüs dışı ritimde ve 26 haftadan küçük postkonsepsiyonel yaşta yorumlanamaz.',
  en:'The NIPE Monitor V1 has no sensor of its own; the ECG signal is taken from the analog ECG output of the multiparameter monitor. It cannot be interpreted in non-sinus rhythm or at a post-conceptional age below 26 weeks.',
  es:'El NIPE Monitor V1 no tiene sensor propio; la señal de ECG se obtiene de la salida analógica de ECG del monitor multiparamétrico. No puede interpretarse con ritmo no sinusal ni con edad posconcepcional inferior a 26 semanas.'}},

{id:'nol', cat:'noci', kind:'device', name:'NOL / PMD-200', maker:'Medasense',
 measures:['NOL'], placement:'finger-probe',
 desc:{
  tr:'Parmak probundan alınan fotopletismografi, deri iletkenliği (galvanik deri yanıtı), periferik sıcaklık ve üç eksenli ivmeölçer sinyallerinden Random Forest modeliyle 0–100 arasında Nosisepsiyon Düzeyi (NOL) indeksi üreten monitör. Üreticinin ABD endikasyonu, opioid veya opioid koruyucu analjezi alan genel anestezi altındaki erişkinlerde nosisepsiyon düzeyindeki değişikliklerin değerlendirilmesidir.',
  en:'Monitor that uses a Random Forest model to produce the Nociception Level (NOL) index from 0 to 100 from photoplethysmography, skin conductance (galvanic skin response), peripheral temperature and 3-axis accelerometer signals acquired by a finger probe. The manufacturer’s US indication is assessing changes in nociception levels in adults under general anesthesia receiving opioid or opioid-sparing analgesia.',
  es:'Monitor que, mediante un modelo Random Forest, obtiene el índice Nociception Level (NOL) de 0 a 100 a partir de fotopletismografía, conductancia cutánea (respuesta galvánica), temperatura periférica y acelerómetro triaxial captados por una sonda digital. La indicación del fabricante en EE. UU. es valorar cambios en el nivel de nocicepción en adultos bajo anestesia general que reciben analgesia con opioides o ahorradora de opioides.'},
 note:{
  tr:'Ölçüm EKG değil, yeniden kullanılabilir parmak probu ve tek kullanımlık deri iletkenliği sensörüyle yapılır. Atriyal fibrilasyon gibi aritmiler, KPR, kardiyoversiyon/defibrilasyon ve şoka bağlı düşük perfüzyon üretici kontrendikasyonları arasındadır.',
  en:'Measurement uses a reusable finger probe with a single-use skin conductance sensor, not the ECG. Arrhythmias such as atrial fibrillation, CPR, cardioversion/defibrillation and shock-related low perfusion are among the manufacturer’s contraindications.',
  es:'La medición se realiza con una sonda digital reutilizable y un sensor desechable de conductancia cutánea, no con el ECG. Las arritmias como la fibrilación auricular, la RCP, la cardioversión/desfibrilación y la hipoperfusión por shock figuran entre las contraindicaciones del fabricante.'}},

{id:'spi', cat:'noci', kind:'algorithm', name:'SPI — Surgical Pleth Index', maker:'GE HealthCare',
 measures:['SPI'], placement:'finger-probe',
 desc:{
  tr:'Parmaktan GE TruSignal SpO₂ ile alınan fotopletismografi dalgasının atımdan atıma nabız aralığı değişimi ve pletismogram genliğinden hesaplanan, 0 (reaktivite yok) ile 100 (yüksek reaktivite) arasında bir parametre. 18 yaş üstü, bilinçsiz ve tam anestezi altındaki erişkinlerde cerrahi uyaranlara ve analjeziklere fizyolojik yanıtın izlenmesine, diğer ölçümlere ek olarak yardımcı olur.',
  en:'Parameter calculated from the beat-to-beat pulse interval variation and plethysmogram amplitude of the finger photoplethysmographic waveform obtained with GE TruSignal SpO₂, ranging from 0 (no reactivity) to 100 (high reactivity). It helps monitor the physiological response to surgical stimuli and analgesics in unconscious, fully anesthetized adults over 18 years, as an adjunct to other measurements.',
  es:'Parámetro calculado a partir de la variación latido a latido del intervalo de pulso y de la amplitud del pletismograma de la onda fotopletismográfica digital obtenida con GE TruSignal SpO₂, de 0 (sin reactividad) a 100 (reactividad alta). Ayuda a vigilar la respuesta fisiológica a los estímulos quirúrgicos y a los analgésicos en adultos mayores de 18 años inconscientes y completamente anestesiados, como complemento de otras mediciones.'},
 note:{
  tr:'SPI FDA onaylı değildir ve ABD’de satılmaz; tüm pazarlarda bulunmayabilir. Pacemaker, atropin ve hemodinamik stabiliteyi etkileyen etkenler SPI’yi etkileyebilir.',
  en:'SPI is not FDA cleared and is not sold in the US; it may not be available in all markets. Pacemakers, atropine and factors affecting hemodynamic stability may affect SPI.',
  es:'El SPI no cuenta con autorización de la FDA y no se vende en EE. UU.; puede no estar disponible en todos los mercados. Los marcapasos, la atropina y los factores que afectan a la estabilidad hemodinámica pueden alterar el SPI.'}},

{id:'algiscan', cat:'noci', kind:'device', name:'AlgiScan', maker:'IDMED',
 measures:['Pupil diameter','PDR','PPI'], placement:'eye-pupil',
 desc:{
  tr:'Pupil çapını kızılötesi video pupillometriyle ölçen ve artan şiddette standart elektriksel uyarıya pupiller dilatasyon refleksinden (PDR) 1–9 arası Pupiller Ağrı İndeksini (PPI) üreten cihaz. Analjezi düzeyinin değerlendirilmesinin yanında pupil boyutu ve ışık refleksi ölçümü de yapar.',
  en:'Device that measures pupil diameter by infrared video pupillometry and generates the Pupillary Pain Index (PPI, 1–9) from the pupillary dilation reflex (PDR) to standardized electrical stimulation of increasing intensity. Besides assessing the level of analgesia, it also measures pupil size and the photomotor reflex.',
  es:'Dispositivo que mide el diámetro pupilar mediante pupilometría de vídeo infrarrojo y genera el Pupillary Pain Index (PPI, 1–9) a partir del reflejo de dilatación pupilar (PDR) frente a una estimulación eléctrica estandarizada de intensidad creciente. Además de valorar el nivel de analgesia, mide el tamaño pupilar y el reflejo fotomotor.'},
 note:{
  tr:'PPI için kılavuzla tanımlanmış bir hedef değer yoktur. Opioidlerin miyotik etkisi ve anestezi derinliği değerlendirmeyi etkiler; göz travması, oftalmik cerrahi öyküsü ve pupil refleksi bozukluklarında ölçümün geçerliliği belirsizdir.',
  en:'There is no guideline-defined target value for PPI. The miotic effect of opioids and depth of anesthesia influence the assessment; validity is uncertain with eye trauma, previous ophthalmic surgery or pupillary reflex disorders.',
  es:'No existe un valor objetivo del PPI definido por guías. El efecto miótico de los opioides y la profundidad anestésica influyen en la valoración; la validez es incierta con traumatismo ocular, cirugía oftálmica previa o trastornos del reflejo pupilar.'}},

{id:'painsensor', cat:'noci', kind:'device', name:'MedStorm PainSensor', maker:'MedStorm Innovation',
 measures:['Peaks/s (NFSC)','AUC'], placement:'palm-electrodes',
 desc:{
  tr:'Avuç içi veya ayak tabanına yerleştirilen elektrotlarla, ter bezlerinin sempatik aktivasyonuna bağlı deri iletkenliği dalgalanmalarını ölçen iletkenlik ölçer. Ameliyathanede saniyedeki tepe sayısı (NFSC olarak da anılır) ve eğri altı alan (AUC) kullanılır; moda özgü Pain, Awakening ve NerveBlock indeksleri sunar.',
  en:'Conductance meter that measures skin conductance fluctuations caused by sympathetic activation of sweat glands with electrodes on the palm or sole. In the operating room, peaks per second (also called NFSC) and area under the curve (AUC) are used; it provides mode-specific Pain, Awakening and NerveBlock indices.',
  es:'Conductímetro que mide, con electrodos en la palma o la planta, las fluctuaciones de la conductancia cutánea causadas por la activación simpática de las glándulas sudoríparas. En quirófano se usan los picos por segundo (también llamados NFSC) y el área bajo la curva (AUC); ofrece índices Pain, Awakening y NerveBlock específicos de cada modo.'},
 note:{
  tr:'Üretici endikasyonları anestezi, postoperatif, yoğun bakım ve prematüre bebekleri kapsar; bebeklerde elektrotlar ayak tabanına yerleştirilir. Hareket ve elektrokoter ölçümü bozabilir.',
  en:'Manufacturer indications include anesthesia, postoperative, ICU and premature infants; in infants the electrodes are placed on the sole of the foot. Movement and electrocautery can disturb the measurement.',
  es:'Las indicaciones del fabricante incluyen anestesia, postoperatorio, UCI y prematuros; en lactantes los electrodos se colocan en la planta del pie. El movimiento y el electrocauterio pueden alterar la medición.'}},

/* 3 · NIRS — serebral ve somatik oksimetri */
{id:'invos-7100', cat:'nirs', kind:'device', name:'INVOS 7100', maker:'Medtronic',
 measures:['rSO2'], placement:'forehead-nirs',
 desc:{
  tr:'Yakın kızılötesi diffüz yansıma spektroskopisi ile beyinde veya sensör altındaki diğer dokuda kanın bölgesel hemoglobin oksijen satürasyonunu (rSO₂) izleyen yardımcı monitör. Serebral ölçüm indüksiyon öncesi başlangıç değeri ve fizyolojik koşullarla birlikte yorumlanır; farklı üreticilerin değerleri doğrudan birbirinin yerine kullanılamaz.',
  en:'Adjunct monitor of regional hemoglobin oxygen saturation (rSO₂) of blood in the brain or other tissue beneath the sensor, using near-infrared diffuse reflectance spectroscopy. The cerebral measurement is interpreted relative to the preinduction baseline and physiological conditions; values from different manufacturers are not directly interchangeable.',
  es:'Monitor complementario de la saturación regional de oxígeno de la hemoglobina (rSO₂) en el cerebro u otro tejido bajo el sensor, mediante espectroscopia de reflectancia difusa en el infrarrojo cercano. La medición cerebral se interpreta respecto al valor basal previo a la inducción y a las condiciones fisiológicas; los valores de distintos fabricantes no son directamente intercambiables.'},
 note:{
  tr:'Üretici endikasyonu iskemi riski taşıyan >2,5 kg hastalar içindir; ≤2,5 kg hastalarda yalnızca trend izlemi yapılır. Ölçüm sensör altındaki küçük bir doku hacmini yansıtır.',
  en:'The manufacturer’s indication covers patients >2.5 kg at risk of ischemic states; in patients ≤2.5 kg use is limited to trend monitoring. Readings represent a small volume of tissue beneath the sensor.',
  es:'La indicación del fabricante abarca pacientes >2,5 kg con riesgo de isquemia; en pacientes ≤2,5 kg se limita a la monitorización de tendencias. La lectura representa un pequeño volumen de tejido bajo el sensor.'}},

{id:'foresight', cat:'nirs', kind:'device', name:'ForeSight / ForeSight IQ', maker:'BD',
 measures:['StO2','ΔStO2'], placement:'forehead-nirs',
 desc:{
  tr:'Tek kullanımlık deri sensörü üzerinden beş dalga boyunda yakın kızılötesi ışık gönderip yansıyan ışığı analiz ederek sensör altındaki dokunun mutlak oksijen satürasyonunu (StO₂) hesaplayan oksimetre kablosu. Oksijenli, oksijensiz ve toplam hemoglobindeki göreli değişimleri de izler; HemoSphere monitörüne bağlanır.',
  en:'Oximeter cable that projects near-infrared light at five wavelengths through a disposable skin sensor and analyzes the reflected light to calculate the absolute oxygen saturation (StO₂) of the tissue beneath the sensor. It also monitors relative changes in oxygenated, deoxygenated and total hemoglobin and connects to the HemoSphere monitor.',
  es:'Cable oxímetro que emite luz de infrarrojo cercano en cinco longitudes de onda a través de un sensor cutáneo desechable y analiza la luz reflejada para calcular la saturación absoluta de oxígeno (StO₂) del tejido bajo el sensor. También vigila los cambios relativos de hemoglobina oxigenada, desoxigenada y total, y se conecta al monitor HemoSphere.'},
 note:{
  tr:'Daha önce Edwards Lifesciences Critical Care bünyesindeydi. Sensör boyutu ile uygulama bölgesinin eşleştirilmesi zorunludur; farklı üreticilerin değerleri doğrudan birbirinin yerine kullanılamaz.',
  en:'Previously part of Edwards Lifesciences Critical Care. Sensor size must be matched to the application site; values from different manufacturers are not directly interchangeable.',
  es:'Antes formaba parte de Edwards Lifesciences Critical Care. El tamaño del sensor debe corresponder al sitio de aplicación; los valores de distintos fabricantes no son directamente intercambiables.'}},

{id:'masimo-o3', cat:'nirs', also:['masimo'], kind:'module', name:'Masimo O3 Regional Oximetry', maker:'Masimo',
 measures:['rSO2','Δbase','AUL','ΔSpO2','ΔO2Hb','ΔHHb','ΔcHb'], placement:'forehead-nirs',
 desc:{
  tr:'Root platformuna bağlanan, dört dalga boyu ve iki farklı uzaklıktaki dedektörle çok mesafeli difüzyon spektroskopisi kullanarak bölgesel hemoglobin oksijen satürasyonunu (rSO₂) izleyen oksimetri modülü. Başlangıca göre fark (Δbase), alarm sınırı altında geçen süre ve derinliği (AUL), SpO₂–rSO₂ farkı ve hemoglobin türlerindeki göreli değişimleri de gösterir.',
  en:'Regional oximetry module connected to the Root platform that monitors regional hemoglobin oxygen saturation (rSO₂) using multi-distance diffusion spectroscopy with four wavelengths and detectors at two distances. It also shows the difference from baseline (Δbase), time and depth below the low alarm limit (AUL), the SpO₂–rSO₂ difference and relative changes in hemoglobin fractions.',
  es:'Módulo de oximetría regional conectado a la plataforma Root que vigila la saturación regional de oxígeno de la hemoglobina (rSO₂) mediante espectroscopia de difusión multidistancia con cuatro longitudes de onda y detectores a dos distancias. También muestra la diferencia respecto al basal (Δbase), el tiempo y la profundidad bajo el límite de alarma (AUL), la diferencia SpO₂–rSO₂ y los cambios relativos de las fracciones de hemoglobina.'},
 note:{
  tr:'FDA özetine göre neonatal sensör yalnızca trend ölçümü için endikedir. Farklı üreticilerin değerleri doğrudan birbirinin yerine kullanılamaz.',
  en:'According to the FDA summary, the neonatal sensor is indicated for trending only. Values from different manufacturers are not directly interchangeable.',
  es:'Según el resumen de la FDA, el sensor neonatal solo está indicado para tendencias. Los valores de distintos fabricantes no son directamente intercambiables.'}},

{id:'sensmart-x100', cat:'nirs', kind:'device', name:'SenSmart X-100', maker:'Nonin',
 measures:['rSO2','SpO2','PR'], placement:'forehead-nirs',
 desc:{
  tr:'Uyumlu sensörlerle altı kanala kadar SpO₂ ve nabız hızını ya da sensör altındaki kanın serebral veya somatik bölgesel hemoglobin oksijen satürasyonunu (rSO₂) eş zamanlı ölçüp kaydeden modüler oksimetri sistemi. Erişkin, pediatrik, infant ve yenidoğan hastalarda yalnızca hasta değerlendirmesine yardımcı olarak kullanılır.',
  en:'Modular oximetry system that, with compatible sensors, simultaneously measures and records up to six channels of SpO₂ and pulse rate or cerebral or somatic regional hemoglobin oxygen saturation (rSO₂) of the blood beneath the sensor. It is labeled for adult, pediatric, infant and neonatal patients as an adjunct to patient assessment only.',
  es:'Sistema de oximetría modular que, con sensores compatibles, mide y registra simultáneamente hasta seis canales de SpO₂ y frecuencia de pulso o de saturación regional de oxígeno de la hemoglobina (rSO₂) cerebral o somática de la sangre bajo el sensor. Está indicado en adultos, niños, lactantes y neonatos solo como complemento de la valoración del paciente.'},
 note:{
  tr:'rSO₂ doku oksijenasyonunu değil, optik alandaki arteriyel, kapiller ve venöz kanın hemoglobin satürasyonunu yansıtır; indüksiyon öncesi başlangıç değerine göre yorumlanır.',
  en:'rSO₂ reflects the hemoglobin saturation of arterial, capillary and venous blood in the optical field, not tissue oxygenation itself; it is interpreted relative to the pre-induction baseline.',
  es:'La rSO₂ refleja la saturación de la hemoglobina de la sangre arterial, capilar y venosa del campo óptico, no la oxigenación tisular en sí; se interpreta respecto al valor basal previo a la inducción.'}},

{id:'niro-200nx', cat:'nirs', kind:'device', name:'NIRO-200NX', maker:'Hamamatsu',
 measures:['TOI','nTHI','ΔO2Hb','ΔHHb','ΔcHb'], placement:'forehead-nirs',
 desc:{
  tr:'Uzaysal çözünürlüklü spektroskopi ile doku oksijenasyon indeksini (TOI) ve normalize doku hemoglobin indeksini (nTHI), modifiye Beer-Lambert yöntemiyle de oksi-, deoksi- ve toplam hemoglobindeki değişimleri (ΔO₂Hb, ΔHHb, ΔcHb) ölçen NIRS monitörü. Standart olarak 2 kanallıdır, isteğe bağlı olarak 4 kanala genişletilebilir.',
  en:'NIRS monitor that measures the tissue oxygenation index (TOI) and normalized tissue hemoglobin index (nTHI) by spatially resolved spectroscopy, and changes in oxy-, deoxy- and total hemoglobin (ΔO₂Hb, ΔHHb, ΔcHb) by the modified Beer-Lambert method. It has 2 channels as standard, expandable to 4 with an option.',
  es:'Monitor NIRS que mide el índice de oxigenación tisular (TOI) y el índice de hemoglobina tisular normalizado (nTHI) mediante espectroscopia de resolución espacial, y los cambios de oxi-, desoxi- y hemoglobina total (ΔO₂Hb, ΔHHb, ΔcHb) con el método de Beer-Lambert modificado. Tiene 2 canales de serie, ampliables a 4 de forma opcional.'},
 note:{
  tr:'FDA endikasyonu, beyin veya prob altındaki diğer dokuda yardımcı trend monitörüdür; tek başına tanı veya tedavi dayanağı olarak kullanılmaz.',
  en:'The FDA indication is an adjunct trend monitor for the brain or other tissue beneath the probes; it is not used as the sole basis for diagnosis or therapy.',
  es:'La indicación de la FDA es la de monitor complementario de tendencias en el cerebro u otro tejido bajo las sondas; no debe ser la única base para el diagnóstico o el tratamiento.'}},

/* 5 · Nöromüsküler blok monitörizasyonu */
{id:'tetragraph', cat:'nmt', kind:'device', name:'TetraGraph', maker:'Senzime',
 measures:['TOF count','TOFR','PTC','ST'], placement:'forearm-nmt',
 desc:{
  tr:'Periferik sinirin (bilekte ulnar sinir) elektriksel uyarısına kasın elektriksel yanıtını (kas aksiyon potansiyeli) elektromiyografi (EMG) ile otomatik ve kantitatif olarak ölçen taşınabilir nöromüsküler iletim monitörü. Tek uyarı (ST), dört uyarı (TOF sayısı ve oranı) ve post-tetanik sayım (PTC) modlarıyla blok derinliğini ve geri dönüşü gösterir.',
  en:'Portable neuromuscular transmission monitor that automatically and quantitatively measures the muscle’s electrical response (muscle action potential) to electrical stimulation of a peripheral nerve (ulnar nerve at the wrist) by electromyography (EMG). Using single twitch (ST), train-of-four (TOF count and ratio) and post-tetanic count (PTC) modes, it shows block depth and recovery.',
  es:'Monitor portátil de transmisión neuromuscular que mide de forma automática y cuantitativa la respuesta eléctrica del músculo (potencial de acción muscular) a la estimulación eléctrica de un nervio periférico (nervio cubital en la muñeca) mediante electromiografía (EMG). Con los modos de estímulo único (ST), tren de cuatro (recuento y cociente TOF) y recuento postetánico (PTC) muestra la profundidad y la recuperación del bloqueo.'},
 note:{
  tr:'EMG temelli olduğundan akseleromiyografi gibi başparmak hareketine dayanmaz. FDA özetine göre yenidoğanlar dışındaki tüm hasta gruplarında kullanılır; soğuk el TOF yanıtını azaltabilir.',
  en:'Being EMG-based, it does not rely on thumb movement as acceleromyography does. Per the FDA summary it is for all patient populations except neonates; a cold hand can reduce the TOF response.',
  es:'Al estar basado en EMG, no depende del movimiento del pulgar como la aceleromiografía. Según el resumen de la FDA se usa en todas las poblaciones salvo neonatos; una mano fría puede reducir la respuesta TOF.'}},

{id:'twitchview', cat:'nmt', kind:'device', name:'TwitchView', maker:'Blink Device Company',
 measures:['TOF count','TOFR','PTC'], placement:'forearm-nmt',
 desc:{
  tr:'Bilekte ulnar sinir uyarısına el kaslarının yanıtını elektromiyografi (EMG) ile ölçen kantitatif nöromüsküler iletim monitörü. TOF oranını (T4/T1) %0–100 olarak, dördüncü yanıt saptanamadığında TOF sayısını ve post-tetanik sayımı (PTC 0–15) gösterir.',
  en:'Quantitative neuromuscular transmission monitor that measures the response of the hand muscles to ulnar nerve stimulation at the wrist by electromyography (EMG). It displays the TOF ratio (T4/T1) as 0–100%, the TOF count when the fourth response is below the detection threshold, and the post-tetanic count (PTC 0–15).',
  es:'Monitor cuantitativo de transmisión neuromuscular que mide por electromiografía (EMG) la respuesta de los músculos de la mano a la estimulación del nervio cubital en la muñeca. Muestra el cociente TOF (T4/T1) como 0–100 %, el recuento TOF cuando la cuarta respuesta no alcanza el umbral de detección y el recuento postetánico (PTC 0–15).'},
 note:{
  tr:'EMG temelli bir sistemdir; akselerometrik cihazlardan farklı olarak başparmak hareketine bağlı değildir. Orta boy elektrot dizisi erişkin ve >10 kg çocuklar, küçük dizi >1 aylık term bebekler içindir.',
  en:'An EMG-based system; unlike acceleromyographic devices, it does not depend on thumb movement. The medium array is for adults and children >10 kg, the small array for full-term infants >1 month of age.',
  es:'Sistema basado en EMG; a diferencia de los equipos acelerométricos, no depende del movimiento del pulgar. La matriz mediana es para adultos y niños >10 kg y la pequeña para lactantes a término >1 mes.'}},

{id:'tofscan', cat:'nmt', kind:'device', name:'TOFscan', maker:'IDMED',
 measures:['TOF count','TOFR','PTC','DBS'], placement:'forearm-nmt',
 desc:{
  tr:'Klasik TOFscan, ulnar sinir uyarısına adduktor pollicis yanıtını başparmağa yerleştirilen üç boyutlu ivmeölçerle (akseleromiyografi) kantitatif olarak ölçer; TOF sayısı, TOF oranı (T4/T1), post-tetanik sayım ve DBS modlarını sunar. Güncel TOFscan 2 ailesinde elektromiyografi ve 3B akseleromiyografi seçenekleri ayrı olarak tanımlanır.',
  en:'The classic TOFscan quantitatively measures the adductor pollicis response to ulnar nerve stimulation with a three-dimensional accelerometer on the thumb (acceleromyography), offering TOF count, TOF ratio (T4/T1), post-tetanic count and DBS modes. The current TOFscan 2 family lists electromyography and 3D acceleromyography options separately.',
  es:'El TOFscan clásico mide de forma cuantitativa la respuesta del aductor del pulgar a la estimulación cubital con un acelerómetro tridimensional en el pulgar (aceleromiografía) y ofrece recuento TOF, cociente TOF (T4/T1), recuento postetánico y DBS. La familia actual TOFscan 2 describe por separado las opciones de electromiografía y de aceleromiografía 3D.'},
 note:{
  tr:'Akseleromiyografide başparmak serbestçe hareket edebilmelidir. TOF oranı %100 ile sınırlı gösterilir; blok öncesi alınan referans (REF) ölçümüyle oran T4/Tref olarak hesaplanır.',
  en:'With acceleromyography the thumb must be able to move freely. The TOF ratio is displayed capped at 100%; when a reference (REF) measurement is taken before block, the ratio is calculated as T4/Tref.',
  es:'Con aceleromiografía el pulgar debe poder moverse libremente. El cociente TOF se muestra limitado al 100 %; si se toma una medición de referencia (REF) antes del bloqueo, el cociente se calcula como T4/Tref.'}},

{id:'stimpod-nms450x', cat:'nmt', kind:'device', name:'STIMPOD NMS450X', maker:'Xavant Technology',
 measures:['TOF count','TOFR','PTC'], placement:'forearm-nmt',
 desc:{
  tr:'Nöromüsküler bloğun etkisini ölçmek için kullanılan periferik sinir uyarıcısı; uygun aksesuarla akseleromiyografi (üç eksenli ivmeölçer) veya elektromiyografi (EMG elektrotu) ölçümü yapar. Supramaksimal akım (SMC) modu, uyarı elektrotları için uygun akımı otomatik belirler; TOF sayısı, TOF oranı ve post-tetanik sayım sunar.',
  en:'Peripheral nerve stimulator used to measure the effect of neuromuscular blockade; with the appropriate accessory it performs acceleromyography (tri-axial accelerometer) or electromyography (EMG electrode) measurement. The supramaximal current (SMC) mode determines the optimal stimulating current automatically; it provides TOF count, TOF ratio and post-tetanic count.',
  es:'Estimulador de nervio periférico para medir el efecto del bloqueo neuromuscular; con el accesorio adecuado realiza aceleromiografía (acelerómetro triaxial) o electromiografía (electrodo EMG). El modo de corriente supramáxima (SMC) determina automáticamente la corriente óptima de estimulación; ofrece recuento TOF, cociente TOF y recuento postetánico.'},
 note:{
  tr:'AMG ve EMG aksesuarlarının yerleşim tekniği aynı değildir. SMC, hasta henüz paralize değilken belirlenir.',
  en:'The AMG and EMG accessories do not share the same placement technique. SMC is determined while the patient is not yet paralyzed.',
  es:'Los accesorios de AMG y EMG no comparten la misma técnica de colocación. La SMC se determina cuando el paciente aún no está paralizado.'}},

{id:'ge-carescape-nmt', cat:'nmt', kind:'module', name:'GE CARESCAPE NMT', maker:'GE HealthCare',
 measures:['TOF','TOFR','PTC','DBS','ST'], placement:'forearm-nmt',
 desc:{
  tr:'CARESCAPE monitörlerine entegre nöromüsküler iletim modülü; periferik sinirin (genellikle elde) elektriksel uyarısına kas yanıtını otomatik ve kantitatif olarak ölçer. Varsayılan mod TOF’tur; DBS, post-tetanik sayım ve tek uyarı modları da bulunur.',
  en:'Neuromuscular transmission module integrated into CARESCAPE monitors that automatically and quantitatively measures the muscle response to electrical stimulation of a peripheral nerve (usually in the hand). TOF is the default mode; DBS, post-tetanic count and single twitch modes are also available.',
  es:'Módulo de transmisión neuromuscular integrado en los monitores CARESCAPE que mide de forma automática y cuantitativa la respuesta muscular a la estimulación eléctrica de un nervio periférico (habitualmente en la mano). El modo por defecto es TOF; también dispone de DBS, recuento postetánico y estímulo único.'},
 note:{
  tr:'ElectroSensor (elektromiyografi) veya başparmak hareketini piezoelektrik sensörle ölçen MechanoSensor (kinemiyografi) ile çalışır.',
  en:'It works with the ElectroSensor (electromyography) or the MechanoSensor (kinemyography), which measures thumb movement with a piezoelectric sensor.',
  es:'Funciona con el ElectroSensor (electromiografía) o con el MechanoSensor (cinemiografía), que mide el movimiento del pulgar con un sensor piezoeléctrico.'}}

);
