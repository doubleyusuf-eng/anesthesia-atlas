'use strict';
/* Cihaz başına bir soru · grup H (ultrasonografi cihazları). Her sorunun doğru yanıtı content-src/<id>.json içindeki doğrulanmış metne dayanır. */
window.ICA_QUIZ = window.ICA_QUIZ || {};
Object.assign(window.ICA_QUIZ, {
  'clarius-hd3': {
    q: {tr: 'Clarius HD3 probları görüntüyü nasıl gösterir?', en: 'How do Clarius HD3 scanners display the image?', es: '¿Cómo muestran la imagen las sondas Clarius HD3?'},
    o: [
      {tr: 'USB kablosuyla bağlanan ayrı bir konsolda', en: 'On a separate console connected by USB cable', es: 'En una consola independiente conectada por cable USB'},
      {tr: 'Bluetooth ile yalnızca masaüstü bilgisayarda', en: 'Only on a desktop computer over Bluetooth', es: 'Solo en un ordenador de sobremesa conectado por Bluetooth'},
      {tr: 'Wi-Fi ile iOS ya da Android cihazdaki uygulamada', en: 'In the app on an iOS or Android device, over Wi-Fi', es: 'En la aplicación de un dispositivo iOS o Android, por Wi-Fi'},
      {tr: 'Probun üzerindeki küçük renkli ekranda', en: 'On a small colour screen on the scanner itself', es: 'En una pequeña pantalla en color de la propia sonda'}
    ],
    a: 2,
    ex: {tr: 'Ayrı bir cihaz gövdesi yoktur: görüntü Wi-Fi ile iOS ya da Android telefon veya tabletteki Clarius uygulamasına aktarılır; ekran ve kontrol paneli görevini uygulama görür.', en: 'There is no separate console: the image is sent over Wi-Fi to the Clarius app on an iOS or Android phone or tablet, which serves as screen and control panel.', es: 'No hay consola independiente: la imagen se envía por Wi-Fi a la aplicación Clarius en un teléfono o una tableta iOS o Android, que hace de pantalla y panel de control.'},
    src: 'overview'
  },
  'ge-venue-go': {
    q: {tr: 'Venue Go\'daki mide ölçümü aracı neyi hesaplar?', en: 'What does the gastric measurement tool on Venue Go calculate?', es: '¿Qué calcula la herramienta de medición gástrica de Venue Go?'},
    o: [
      {tr: 'Mide içeriğinin pH değerini, asitliğini ve tamponlama gücünü', en: 'The pH, acidity and buffering capacity of the gastric contents', es: 'El pH, la acidez y la capacidad tampón del contenido gástrico'},
      {tr: 'Mide kesit alanını, hacmini ve hacim/ağırlık oranını', en: 'Gastric cross-sectional area, volume and volume-to-weight ratio', es: 'El área de sección, el volumen y la relación volumen/peso gástricos'},
      {tr: 'Mide duvarı kalınlığını, boşalma süresini ve kasılma sayısını', en: 'Gastric wall thickness, emptying time and number of contractions', es: 'El grosor de la pared, el tiempo de vaciado y el número de contracciones'},
      {tr: 'Mide içi basıncı, gaz miktarını ve sıvı–katı oranını', en: 'Intragastric pressure, the amount of gas and the liquid–solid ratio', es: 'La presión intragástrica, la cantidad de gas y la proporción líquido–sólido'}
    ],
    a: 1,
    ex: {tr: 'Üreticiye göre mide ölçümü, mide kesit alanını, hacmini ve hacim/ağırlık oranını hesaplayan bir karar destek ve ölçüm aracıdır; yeni otomatik mide hacmi aracı aspirasyon riskini değerlendirmede anestezi ekibini destekleyebilir.', en: 'According to the maker, gastric measurement is a decision-support and measurement tool that calculates gastric cross-sectional area, volume and volume-to-weight ratio; the newer automatic gastric volume tool may support anaesthesia providers in assessing aspiration risk.', es: 'Según el fabricante, la medición gástrica es una herramienta de apoyo a la decisión y medición que calcula el área de sección, el volumen y la relación volumen/peso; la nueva herramienta automática de volumen gástrico puede ayudar a valorar el riesgo de aspiración.'},
    src: 'use'
  },
  'ge-vscan-air': {
    q: {tr: 'Vscan Air CL probunun iki ucunda hangi diziler vardır?', en: 'Which arrays are at the two ends of the Vscan Air CL probe?', es: '¿Qué matrices hay en los dos extremos de la sonda Vscan Air CL?'},
    o: [
      {tr: 'Konveks ve lineer dizi', en: 'Curved and linear arrays', es: 'Matrices curva y lineal'},
      {tr: 'Sektör ve lineer dizi', en: 'Sector and linear arrays', es: 'Matrices sectorial y lineal'},
      {tr: 'İki ayrı lineer dizi', en: 'Two separate linear arrays', es: 'Dos matrices lineales distintas'},
      {tr: 'Konveks ve endokaviter dizi', en: 'Curved and endocavity arrays', es: 'Matrices curva y endocavitaria'}
    ],
    a: 0,
    ex: {tr: 'Vscan Air CL konveks + lineer, Vscan Air SL sektör + lineer dizi taşır; konveks dizi 2–5 MHz, lineer dizi 3–12 MHz\'dir.', en: 'The Vscan Air CL carries curved + linear arrays and the SL sector + linear; the curved array is 2–5 MHz and the linear 3–12 MHz.', es: 'Vscan Air CL lleva matrices curva + lineal y SL sectorial + lineal; la curva es de 2–5 MHz y la lineal de 3–12 MHz.'},
    src: 'overview'
  },
  'butterfly-iq3': {
    q: {tr: 'Butterfly iQ3\'ü geleneksel problardan ayıran dönüştürücü hangisidir?', en: 'Which transducer sets the Butterfly iQ3 apart from conventional probes?', es: '¿Qué transductor distingue a Butterfly iQ3 de las sondas convencionales?'},
    o: [
      {tr: 'Tek kristal piezoelektrik eleman dizisi', en: 'A single-crystal piezoelectric array', es: 'Una matriz piezoeléctrica de cristal único'},
      {tr: 'Mekanik olarak dönen tek bir kristal eleman', en: 'A single mechanically rotating element', es: 'Un único elemento con giro mecánico'},
      {tr: 'Seramik PZT tabanlı fazlı dizi dönüştürücü', en: 'A ceramic PZT-based phased array', es: 'Una matriz sectorial cerámica de PZT'},
      {tr: 'Çip üzerinde kapasitif dönüştürücü (CMUT)', en: 'An on-chip capacitive transducer (CMUT)', es: 'Un transductor capacitivo en chip (CMUT)'}
    ],
    a: 3,
    ex: {tr: 'iQ3, geleneksel kristal piezoelektrik dizi yerine kapasitif mikro işlenmiş ultrasonik dönüştürücü (CMUT) dizisi kullanır; üretici bunu "Ultrasound-on-Chip" olarak adlandırır.', en: 'The iQ3 uses a capacitive micromachined ultrasonic transducer (CMUT) array instead of a traditional crystalline piezoelectric array; the maker calls it "Ultrasound-on-Chip".', es: 'El iQ3 usa una matriz de transductores capacitivos micromecanizados (CMUT) en lugar de una matriz piezoeléctrica cristalina; el fabricante lo llama "Ultrasound-on-Chip".'},
    src: 'principle'
  },
  'sonosite-px': {
    q: {tr: 'Sonosite PX\'te standın ek pili ne sağlar?', en: 'What does the stand battery on the Sonosite PX provide?', es: '¿Qué aporta la batería del soporte del Sonosite PX?'},
    o: [
      {tr: 'Pille çalışmayı 30 dakikadan 1 saate uzatır', en: 'Extends battery use from 30 minutes to 1 hour', es: 'Amplía el uso con batería de 30 minutos a 1 hora'},
      {tr: 'Yalnızca probları şarj eder', en: 'Only charges the probes', es: 'Solo carga las sondas'},
      {tr: 'Pille çalışmayı yaklaşık 1 saatten 3 saate uzatır', en: 'Extends battery use from about 1 hour to 3 hours', es: 'Amplía el uso con batería de 1 hora a unas 3 horas'},
      {tr: 'Pille çalışmayı 2 saatten 8 saate uzatır', en: 'Extends battery use from 2 hours to 8 hours', es: 'Amplía el uso con batería de 2 a 8 horas'}
    ],
    a: 2,
    ex: {tr: 'Üreticinin kullanım kılavuzu ekine göre standa takılan ek pil, sistemin pille çalışma süresini en fazla 1 saatten en fazla 3 saate çıkarır.', en: 'According to the maker\'s user guide supplement, the stand battery extends battery operation from up to one hour to up to three hours.', es: 'Según el suplemento de la guía del fabricante, la batería del soporte amplía el funcionamiento con batería de hasta una hora a hasta tres horas.'},
    src: 'special'
  },
  'philips-lumify': {
    q: {tr: 'Lumify problarının gücü için hangisi doğrudur?', en: 'Which statement about powering the Lumify probes is correct?', es: '¿Qué afirmación sobre la alimentación de las sondas Lumify es correcta?'},
    o: [
      {tr: 'Pilleri yoktur; gücü bağlı cihazdan alırlar', en: 'They have no battery; they draw power from the device', es: 'No tienen batería; se alimentan del dispositivo'},
      {tr: 'İçlerindeki çıkarılabilir pille çalışırlar', en: 'They run on a removable rechargeable internal battery', es: 'Funcionan con una batería interna extraíble'},
      {tr: 'Kablosuz şarj tabanında saklanmaları gerekir', en: 'They must be kept on a wireless charging base', es: 'Deben guardarse en una base de carga inalámbrica'},
      {tr: 'Yalnızca prize takılı bir konsolla çalışırlar', en: 'They only work with a mains-powered cart console', es: 'Solo funcionan con una consola enchufada'}
    ],
    a: 0,
    ex: {tr: 'Problar USB kablosuyla akıllı cihaza bağlanır ve pilsizdir; sistemde bir güç modülü de bulunur. Üretici pilsiz tasarımın hafiflik sağladığını ve aşırı ısınma riskini önlediğini belirtir.', en: 'The probes connect to a smart device by USB cable and are battery-free; the system also includes a power module. The maker states that the battery-free design keeps them light and avoids overheating.', es: 'Las sondas se conectan por USB a un dispositivo inteligente y no tienen batería; el sistema incluye además un módulo de alimentación. El fabricante indica que este diseño las aligera y evita el sobrecalentamiento.'},
    src: 'principle'
  },
  'mindray-te-air': {
    q: {tr: 'TE Air e5M\'nin ayırt edici özelliği hangisidir?', en: 'What is distinctive about the TE Air e5M?', es: '¿Qué distingue al TE Air e5M?'},
    o: [
      {tr: 'Yalnızca fazlı dizi problu bir kardiyak cihazdır', en: 'It is a cardiac device with a phased array only', es: 'Es un equipo cardíaco solo con matriz sectorial'},
      {tr: 'Lineer ve konveks modları tek başta birleştirir', en: 'It combines linear and convex modes in one head', es: 'Combina modos lineal y convexo en un cabezal'},
      {tr: 'Kablolu USB prob olarak telefona takılır', en: 'It plugs into a phone as a corded USB probe', es: 'Se conecta a un teléfono como sonda USB con cable'},
      {tr: 'Çip tabanlı CMUT dönüştürücü kullanır', en: 'It uses a chip-based CMUT transducer', es: 'Usa un transductor CMUT basado en chip'}
    ],
    a: 1,
    ex: {tr: 'Üreticiye göre TE Air e5M lineer ve konveks modları tek başta birleştirir, çip tabanlı değil piezoelektrik kristal teknolojisi kullanır ve 40 cm\'ye kadar derin tarama yapabilir.', en: 'According to the maker, the TE Air e5M combines linear and convex modes in one head, uses piezoelectric crystal rather than chip technology and scans up to 40 cm deep.', es: 'Según el fabricante, el TE Air e5M combina modos lineal y convexo en un cabezal, usa cristal piezoeléctrico y no un chip, y explora hasta 40 cm de profundidad.'},
    src: 'overview'
  },
  'echonous-kosmos': {
    q: {tr: 'Kosmos sisteminde sinir ve damar incelemeleri hangi probla yapılır?', en: 'Which Kosmos probe is used for nerve and vascular exams?', es: '¿Con qué sonda de Kosmos se hacen las exploraciones nerviosas y vasculares?'},
    o: [
      {tr: 'Torso-One fazlı dizi probu', en: 'The Torso-One phased-array probe', es: 'La sonda sectorial Torso-One'},
      {tr: 'Torso probunun EKG kanalı', en: 'The ECG channel of the Torso probe', es: 'El canal de ECG de la sonda Torso'},
      {tr: 'Bridge tabletinin dahili probu', en: 'The built-in probe of the Bridge tablet', es: 'La sonda integrada de la tableta Bridge'},
      {tr: 'Lexsa lineer probu (4–11 MHz)', en: 'The Lexsa linear probe (4–11 MHz)', es: 'La sonda lineal Lexsa (4–11 MHz)'}
    ],
    a: 3,
    ex: {tr: 'Lexsa 4–11 MHz lineer probdur; kas-iskelet, sinir, damar ve akciğer incelemeleri içindir. Torso-One fazlı dizi probu kalp, akciğer ve batın içindir.', en: 'Lexsa is a 4–11 MHz linear probe for musculoskeletal, nerve, vascular and lung exams. The Torso-One phased-array probe is for cardiac, lung and abdominal exams.', es: 'Lexsa es una sonda lineal de 4–11 MHz para exploraciones musculoesqueléticas, nerviosas, vasculares y pulmonares. La sonda sectorial Torso-One es para corazón, pulmón y abdomen.'},
    src: 'overview'
  },
  'ge-logiq-p8': {
    q: {tr: 'LOGIQ P8\'in R4 kontrol panelinde TGC nasıl ayarlanır?', en: 'How is TGC adjusted on the LOGIQ P8 R4 control panel?', es: '¿Cómo se ajusta la TGC en el panel de control R4 del LOGIQ P8?'},
    o: [
      {tr: 'Paneldeki sekiz ayrı fiziksel TGC sürgüsüyle', en: 'With eight separate physical TGC sliders on the panel', es: 'Con ocho controles físicos del panel'},
      {tr: 'B düğmesine basılı tutup sağa–sola çevirerek', en: 'By holding the B knob down and turning it left–right', es: 'Manteniendo pulsado y girando el mando B'},
      {tr: 'Dokunmatik ekranda açılan dijital sürgülerle', en: 'With digital sliders opened on the touch screen', es: 'Con controles digitales en la pantalla táctil'},
      {tr: 'İsteğe bağlı üç pedallı ayak anahtarıyla', en: 'With the optional three-pedal foot switch', es: 'Con el pedal opcional'}
    ],
    a: 2,
    ex: {tr: 'R4 panelinde fiziksel TGC sürgüsü yoktur; dokunmatik ekrandaki TGC düğmesine basınca dijital TGC sürgüleri açılır.', en: 'The R4 panel has no physical TGC sliders; pressing TGC on the touch screen opens digital TGC sliders.', es: 'El panel R4 no tiene controles TGC físicos; al pulsar TGC en la pantalla táctil se abren controles TGC digitales.'},
    src: 'special'
  }
});
