'use strict';
/* İleri Monitörizasyon Atlası · ultrason bölümü · GE LOGIQ P8 (R4) kontrol paneli: tuş verisi ve çizimleri
   Konumlar GE servis kılavuzundaki R4 panel fotoğrafının piksel koordinatlarıdır (Şekil 4-29, 1249 × 720; panel genişliği
   795 px = 430 mm, 1 px ≈ 0,54 mm). Dokunmatik ekran (10,4 inç) üstte sadeleştirilmiş olarak çizilir.
   İşlevler GE LOGIQ P9/P7 kullanım kılavuzu (R1; aynı tuşlar R4'te de vardır), LOGIQ P7/P8/P9/P10 servis kılavuzu
   (R4/R4.5) ve LOGIQ P8 R4 ürün veri sayfasından alınmıştır. Metinlerdeki [n] ultrason sayfasının kaynakçasıdır:
   [33] Zander 2020, [34] Paeng 2025, [35] kullanım kılavuzu, [36] servis kılavuzu, [37] veri sayfası, [5] Ihnatsenka,
   [6] Carovac, [12] AIUM ALARA. Cihaz sayfası bu numaraları kendi kaynakçasına çevirir.
   USKEYS.panelSVG() tüm paneli, USKEYS.keySVG(id) tek bir kontrolün resmini verir; her öğe data-k taşır. */
const USKEYS = (() => {
  const T = (tr, en, es) => ({tr, en, es});

  /* ---------- Gruplar ---------- */
  const G = [
    {id: 'start', n: T('Açma ve hazırlık', 'Power-up and set-up', 'Encendido y preparación')},
    {id: 'mode', n: T('Görüntü modları', 'Imaging modes', 'Modos de imagen')},
    {id: 'image', n: T('Görüntü ayarı', 'Image adjustment', 'Ajuste de imagen')},
    {id: 'freeze', n: T('Dondurma, kayıt ve ekran', 'Freeze, storing and display', 'Congelar, guardar y pantalla')},
    {id: 'measure', n: T('Trackball, ölçüm ve not', 'Trackball, measurement and notes', 'Trackball, medición y notas')},
    {id: 'user', n: T('Kişisel tuşlar ve klavye', 'Custom keys and keyboard', 'Teclas personalizables y teclado')}
  ];

  /* ---------- Kontroller ----------
     k: tür (oblong · round · dround · freeze · knob · knobB · knobS · knobW · joy · ball · arc · sq · touch · paddle · kbd)
     x, y: merkez (px); w, h ya da r; c: renk varyantı; a0, a1: yay açıları (°, saat yönü, 0 = sağ); lab: üzerindeki yazı;
     ic: simge; n: ad; d: ne işe yarar; t: ipucu */
  const C = [
    /* — Açma ve hazırlık — */
    {id: 'power', g: 'start', k: 'oblong', x: 118, y: 383, w: 50, h: 24, ic: 'power',
      n: T('Açma/kapama tuşu', 'Power on/off key', 'Tecla de encendido/apagado'),
      d: T('Cihazı açar ve kapatır. Açmak için yaklaşık 3 saniye basılı tutulur [36]. Kapatmak için tarama ekranındayken bir kez hafifçe basılır ve açılan pencerede Shutdown seçilir; kapatırken basılı tutulmaz [35].',
        'Switches the system on and off. To start, hold it for about 3 seconds [36]. To shut down, press it lightly once from the scan screen and choose Shutdown in the window that opens; do not hold it down to shut down [35].',
        'Enciende y apaga el equipo. Para encender, se mantiene pulsada unos 3 segundos [36]. Para apagar, se pulsa una vez suavemente desde la pantalla de exploración y se elige Shutdown en la ventana que se abre; no se mantiene pulsada para apagar [35].'),
      t: T('Sleep (uyku) seçeneği açılışı 2–3 dakikadan yaklaşık 90 saniyeye indirir; ama cihaz her gün tümüyle kapatılmalıdır [35].', 'Sleep mode cuts start-up from 2–3 minutes to about 90 seconds, but the system should still be fully shut down every day [35].', 'El modo Sleep reduce el arranque de 2–3 minutos a unos 90 segundos, pero el equipo debe apagarse por completo cada día [35].')},
    {id: 'paddle', g: 'start', k: 'paddle', x: 457, y: 612, w: 70, h: 18,
      n: T('Panel döndürme ve yükseklik kolları', 'Panel swivel and height paddles', 'Palancas de giro y altura del panel'),
      d: T('Panelin ön kenarının altında iki siyah kol vardır: biri paneli sağa–sola döndürür, öbürü yükseltip alçaltır; kol basılıyken panel hareket eder [36]. Panel hem dönebilir hem yüksekliği ayarlanabilir [37].',
        'Under the front edge of the panel are two black paddles: one swivels the panel left–right, the other raises and lowers it; the panel moves while the paddle is held [36]. The panel both swivels and adjusts in height [37].',
        'Bajo el borde frontal del panel hay dos palancas negras: una gira el panel a izquierda y derecha y la otra lo sube y lo baja; el panel se mueve mientras se mantiene pulsada [36]. El panel gira y se ajusta en altura [37].'),
      t: T('Kapatmadan önce fren konur ve panel yerine kilitlenir [35].', 'Before shutting down, set the brake and lock the panel in place [35].', 'Antes de apagar, ponga el freno y bloquee el panel en su sitio [35].')},
    {id: 'probe', g: 'start', k: 'touch', x: 604, y: 154, w: 34, h: 140,
      n: T('Prob seçimi (dokunmatik ekran)', 'Probe selection (touch screen)', 'Selección de sonda (pantalla táctil)'),
      d: T('Dokunmatik ekranın sağındaki düğmelerin her biri bir prob girişine karşılık gelir; dokunulan prob etkin olur [35]. Cihazda 4 aktif prob girişi vardır: 3 RS ve 1 DLP [37].',
        'Each button on the right of the touch screen corresponds to a probe port; touching one activates that probe [35]. The system has 4 active probe ports: 3 RS and 1 DLP [37].',
        'Cada botón a la derecha de la pantalla táctil corresponde a un puerto de sonda; al tocarlo se activa esa sonda [35]. El equipo tiene 4 puertos de sonda activos: 3 RS y 1 DLP [37].'),
      t: T('Probu çıkarmadan önce görüntüyü dondurun; etkin prob çıkarılmaz [35].', 'Freeze the image before disconnecting a probe; never disconnect the active probe [35].', 'Congele la imagen antes de desconectar una sonda; nunca desconecte la sonda activa [35].')},
    {id: 'exam', g: 'start', k: 'touch', x: 281, y: 158, w: 34, h: 148,
      n: T('Patient · Scan · End Exam (dokunmatik ekran)', 'Patient · Scan · End Exam (touch screen)', 'Patient · Scan · End Exam (pantalla táctil)'),
      d: T('Dokunmatik ekranın solundaki düğmeler: Patient hasta kayıt ekranını, Scan tarama ekranını açar; End Exam görüntü yönetimine ve inceleme sonu seçeneklerine geçer; KBD ekran klavyesini, Utility ayarları açar [35].',
        'Buttons on the left of the touch screen: Patient opens the patient screen and Scan the scanning screen; End Exam moves to image management and end-of-exam options; KBD opens the on-screen keyboard and Utility the settings [35].',
        'Botones a la izquierda de la pantalla táctil: Patient abre la pantalla del paciente y Scan la de exploración; End Exam pasa a la gestión de imágenes y a las opciones de fin de estudio; KBD abre el teclado en pantalla y Utility los ajustes [35].'),
      t: T('Her hastaya yeni kayıt açmak, görüntülerin doğru hastaya kaydedilmesini sağlar.', 'Opening a new record for each patient keeps images filed under the right patient.', 'Abrir un registro nuevo para cada paciente garantiza que las imágenes se guarden en el paciente correcto.')},
    {id: 'preset', g: 'start', k: 'touch', x: 336, y: 122, w: 74, h: 26,
      n: T('Uygulama (ön ayar) seçimi', 'Application (preset) selection', 'Selección de aplicación (preajuste)'),
      d: T('Dokunmatik ekrandaki Model düğmesi uygulamayı seçer [35]. Ön ayar (örn. sinir, damar, abdomen) başlangıç ayarlarını birlikte getirir [5][33].',
        'The Model button on the touch screen selects the application [35]. A preset (e.g. nerve, vascular, abdomen) brings the starting settings together [5][33].',
        'El botón Model de la pantalla táctil selecciona la aplicación [35]. Un preajuste (p. ej., nervio, vascular, abdomen) trae juntos los ajustes iniciales [5][33].'),
      t: T('Önce ön ayarı seçin, sonra derinlik ve kazancı düzeltin [5].', 'Choose the preset first, then correct depth and gain [5].', 'Elija primero el preajuste y luego corrija la profundidad y la ganancia [5].')},

    /* — Görüntü modları — */
    {id: 'b', g: 'mode', k: 'knobB', x: 583, y: 412, r: 22, lab: 'B',
      n: T('B düğmesi (B-mod ve kazanç)', 'B knob (B-mode and gain)', 'Mando B (modo B y ganancia)'),
      d: T('Büyük siyah düğme. Basınca temel gri görüntü olan B-moda döner; çevirince B-mod kazancını, yani görüntüde gösterilen yankı bilgisini artırır ya da azaltır: görüntü aydınlanır ya da kararır [35][36].',
        'The large black knob. Press it to return to B-mode, the basic grey image; turn it to raise or lower B-mode gain, the amount of echo information shown, so the image gets brighter or darker [35][36].',
        'El mando negro grande. Al pulsarlo se vuelve al modo B, la imagen gris básica; al girarlo aumenta o disminuye la ganancia del modo B, la cantidad de información de eco mostrada, y la imagen se aclara u oscurece [35][36].'),
      t: T('Kazancı sıvı siyah, kemik beyaz görünecek kadar ayarlayın; fazlası ayrıntıyı azaltır [33].', 'Set gain so fluid looks black and bone white; too much loses detail [33].', 'Ajuste la ganancia para que el líquido se vea negro y el hueso blanco; el exceso pierde detalle [33].')},
    {id: 'cf', g: 'mode', k: 'knob', x: 253, y: 372, r: 16, lab: 'CF',
      n: T('CF düğmesi (renkli Doppler)', 'CF knob (colour Doppler)', 'Mando CF (Doppler color)'),
      d: T('Basınca renkli Doppler (Color Flow) açılır ya da kapanır; çevirince renk kutusunun kazancı değişir [36]. Renkli Doppler, akımın göreli hızını ve yönünü B-mod görüntünün üzerine renkle ekler [35]: proba yaklaşan akım kırmızı, uzaklaşan mavi [5].',
        'Press it to switch colour Doppler (Color Flow) on or off; turn it to change the gain inside the colour box [36]. Colour Doppler adds the relative velocity and direction of flow in colour over the B-mode image [35]: flow towards the probe is red, away is blue [5].',
        'Al pulsarlo se activa o desactiva el Doppler color (Color Flow); al girarlo cambia la ganancia dentro de la caja de color [36]. El Doppler color añade en color sobre la imagen en modo B la velocidad relativa y la dirección del flujo [35]: el flujo que se acerca a la sonda es rojo y el que se aleja, azul [5].'),
      t: T('Damarda renk görünmüyorsa probu eğin: ışın akıma 90°\'ye yakınken renk kaybolur [5][34].', 'If a vessel shows no colour, tilt the probe: colour disappears when the beam is near 90° to the flow [5][34].', 'Si un vaso no muestra color, incline la sonda: el color desaparece cuando el haz está cerca de 90° respecto al flujo [5][34].')},
    {id: 'pw', g: 'mode', k: 'knob', x: 243, y: 411, r: 16, lab: 'PW',
      n: T('PW düğmesi (darbeli Doppler)', 'PW knob (pulsed-wave Doppler)', 'Mando PW (Doppler pulsado)'),
      d: T('Basınca PW Doppler açılır [36]: kapının (örnek hacmin) konduğu noktadaki akım hızları zamana karşı spektrum olarak çizilir; belirli bir derinlikte hız ölçülür [34][35].',
        'Press it to switch on PW Doppler [36]: the flow velocities at the gate (sample volume) are drawn against time as a spectrum, so velocity is measured at a specific depth [34][35].',
        'Al pulsarlo se activa el Doppler PW [36]: las velocidades del flujo en la puerta (volumen de muestra) se dibujan frente al tiempo como un espectro, de modo que la velocidad se mide a una profundidad concreta [34][35].'),
      t: T('Kapıyı trackball ile damarın içine yerleştirin; açı düzeltmesi, ölçek ve taban çizgisi dokunmatik ekrandadır [35].', 'Place the gate inside the vessel with the trackball; angle correction, scale and baseline are on the touch screen [35].', 'Coloque la puerta dentro del vaso con la trackball; la corrección de ángulo, la escala y la línea de base están en la pantalla táctil [35].')},
    {id: 'm', g: 'mode', k: 'knob', x: 232, y: 455, r: 16, lab: 'M',
      n: T('M düğmesi (M-mod)', 'M knob (M-mode)', 'Mando M (modo M)'),
      d: T('Basınca M-mod açılır [36]. M (motion) mod hareketi gösterir: aynı çizgiden alınan ardışık yankılar zaman ekseninde yan yana dizilir, hareket eden sınırların hareket aralığı görülür ve ölçülür [6].',
        'Press it to switch on M-mode [36]. M (motion) mode shows movement: successive echoes from the same line are laid side by side along a time axis, so the range of motion of moving boundaries can be seen and measured [6].',
        'Al pulsarlo se activa el modo M [36]. El modo M (motion) muestra el movimiento: los ecos sucesivos de una misma línea se disponen en un eje temporal, de modo que se ve y se mide el rango de movimiento de los bordes [6].'),
      t: T('Sweep Speed zaman ekseninin kayma hızını değiştirir [35].', 'Sweep Speed changes how fast the time axis moves [35].', 'Sweep Speed cambia la velocidad del eje temporal [35].')},
    {id: 'pdi', g: 'mode', k: 'touch', x: 432, y: 122, w: 74, h: 26,
      n: T('PDI ve CW (dokunmatik ekran)', 'PDI and CW (touch screen)', 'PDI y CW (pantalla táctil)'),
      d: T('Power Doppler (PDI) akımın hızını değil, sinyal gücünü renklendirir; hız göstermediği için karışma (aliasing) olmaz [35] ve yavaş akıma daha duyarlıdır [34]. CW Doppler çok yüksek hızları ölçer ama derinlik bilgisi vermez [34]; bu cihazda fazlı dizi ve kalem tipi CW problarla kullanılır [37].',
        'Power Doppler (PDI) colours the strength of the signal rather than the velocity of flow; because it maps no velocity it does not alias [35], and it is more sensitive to slow flow [34]. CW Doppler measures very high velocities but gives no depth information [34]; on this system it works with phased-array and pencil CW probes [37].',
        'El Doppler de potencia (PDI) colorea la intensidad de la señal, no la velocidad del flujo; al no representar velocidad no presenta aliasing [35] y es más sensible al flujo lento [34]. El Doppler CW mide velocidades muy altas pero no da información de profundidad [34]; en este equipo funciona con sondas sectoriales y sondas lápiz CW [37].'),
      t: T('Küçük ve yavaş akımlı damarı ararken PDI\'ye geçin [5].', 'Switch to PDI when looking for a small, slow-flow vessel [5].', 'Cambie a PDI cuando busque un vaso pequeño de flujo lento [5].')},

    /* — Görüntü ayarı — */
    {id: 'joy', g: 'image', k: 'joy', x: 642, y: 358, r: 17,
      n: T('Steer · Depth · Zoom düğmesi', 'Steer · Depth · Zoom control', 'Mando Steer · Depth · Zoom'),
      d: T('Beyaz düğmenin çevresinde Steer, Depth ve Zoom yazar. Depth (derinlik) görüntülenen mesafeyi değiştirir: derin yapılar için artırılır, ekranın altı boş kalıyorsa azaltılır. Zoom görüntünün bir bölümünü büyütür. Steer lineer probda görüntüyü probu oynatmadan sağa ya da sola eğer [35].',
        'Steer, Depth and Zoom are printed around this white control. Depth changes how far down the image goes: increase it for deep structures, reduce it if the bottom of the screen is empty. Zoom enlarges part of the image. Steer slants the image left or right on a linear probe without moving the probe [35].',
        'Alrededor de este mando blanco están impresos Steer, Depth y Zoom. Depth (profundidad) cambia hasta dónde llega la imagen: auméntela para estructuras profundas y redúzcala si la parte inferior de la pantalla queda vacía. Zoom amplía una parte de la imagen. Steer inclina la imagen a izquierda o derecha con una sonda lineal sin mover la sonda [35].'),
      t: T('Enjeksiyon için derinliği hedefin yaklaşık 1 cm altına ayarlayın [5]. Hangi hareketin (çevirme, bastırma, yana itme) hangi işlevi yaptığını cihazın kılavuzundan doğrulayın.', 'For injection, set the depth about 1 cm below the target [5]. Check in the system manual which movement (turn, press, push sideways) does which function.', 'Para inyectar, ajuste la profundidad 1 cm por debajo del objetivo [5]. Compruebe en el manual del equipo qué movimiento (girar, pulsar, empujar a un lado) hace cada función.')},
    {id: 'rot5', g: 'image', k: 'knobW', x: 422, y: 333, r: 19, set: [273, 349, 422, 495, 569],
      n: T('Dokunmatik ekranın altındaki beş düğme', 'The five knobs below the touch screen', 'Los cinco mandos bajo la pantalla táctil'),
      d: T('İşlevleri dokunmatik ekranda açık olan sayfaya göre değişir; her düğmenin ne yaptığı ekranda hemen üstünde yazar. Döner ok simgesi çevirerek, nokta simgesi basarak kullanıldığını gösterir [35]. B-mod sayfasında örneğin güç çıkışı, dinamik aralık, frekans ve odak bu düğmelerle ayarlanır [35].',
        'Their functions change with the page open on the touch screen; what each knob does is written on the screen just above it. A curved-arrow symbol means turn, a dot means press [35]. On the B-mode page, for example, power output, dynamic range, frequency and focus are set with these knobs [35].',
        'Su función cambia según la página abierta en la pantalla táctil; lo que hace cada mando está escrito en la pantalla justo encima. Un símbolo de flecha curva significa girar y un punto, pulsar [35]. En la página del modo B, por ejemplo, la potencia de salida, el rango dinámico, la frecuencia y el foco se ajustan con estos mandos [35].'),
      t: T('Frekansı hedef derinliğe ulaşan en yüksek değere ayarlayın; odağı hedefin hizasına koyun [33].', 'Set the frequency to the highest value that reaches the target depth; place the focus at the level of the target [33].', 'Ajuste la frecuencia al valor más alto que alcance la profundidad del objetivo; coloque el foco a la altura del objetivo [33].')},
    {id: 'tgc', g: 'image', k: 'touch', x: 539, y: 68, w: 50, h: 26,
      n: T('TGC (dokunmatik ekran)', 'TGC (touch screen)', 'TGC (pantalla táctil)'),
      d: T('Derinliğe göre kazanç: derinden gelen zayıf yankıları güçlendirir [35]. Bu cihazda fiziksel TGC sürgüsü yoktur; dokunmatik ekrandaki TGC düğmesine basınca dijital TGC sürgüleri açılır [36][37].',
        'Gain by depth: it amplifies weak echoes returning from deeper tissue [35]. This system has no physical TGC sliders; pressing TGC on the touch screen opens digital TGC sliders [36][37].',
        'Ganancia según la profundidad: amplifica los ecos débiles que vuelven de tejidos profundos [35]. Este equipo no tiene controles TGC físicos; al pulsar TGC en la pantalla táctil se abren los controles TGC digitales [36][37].'),
      t: T('Sesi az zayıflatan sıvıların arkasında TGC\'yi azaltmak gerekebilir [33].', 'TGC may need to be reduced behind fluid, which attenuates sound little [33].', 'Puede ser necesario reducir la TGC detrás de los líquidos, que atenúan poco el sonido [33].')},
    {id: 'auto', g: 'image', k: 'touch', x: 432, y: 262, w: 74, h: 26,
      n: T('Auto (otomatik optimizasyon)', 'Auto (automatic optimisation)', 'Auto (optimización automática)'),
      d: T('Görüntüyü gerçek B-mod verisine göre otomatik iyileştirir; renkli Doppler\'de renk kazancını, PW Doppler\'de ölçeği, taban çizgisini ve dinamik aralığı ayarlar [35].',
        'Optimises the image automatically from the actual B-mode data; in colour Doppler it adjusts colour gain, and in PW Doppler the scale, baseline and dynamic range [35].',
        'Optimiza la imagen automáticamente a partir de los datos reales del modo B; en Doppler color ajusta la ganancia de color y en Doppler PW la escala, la línea de base y el rango dinámico [35].'),
      t: T('Otomatik ayar, prob ve hasta hareketsizken en iyi çalışır; sonucu yine de gözle denetleyin [33].', 'Automatic optimisation works best with the probe and patient still; still check the result by eye [33].', 'La optimización automática funciona mejor con la sonda y el paciente quietos; aun así, revise el resultado [33].')},
    {id: 'ao', g: 'image', k: 'round', x: 628, y: 415, r: 13, lab: 'AO',
      n: T('AO tuşu (akustik çıkış)', 'AO key (acoustic output)', 'Tecla AO (salida acústica)'),
      d: T('AO, akustik çıkış (Acoustic Output) demektir [35]. Çıkış gücünün göstergesi ekranın üstündeki bilgi alanında, güç çıkışı ayarı da dokunmatik ekranın döner düğmelerindedir [35].',
        'AO stands for Acoustic Output [35]. The output power readout is in the information area at the top of the screen, and the power output setting is on the touch-screen rotary knobs [35].',
        'AO significa salida acústica (Acoustic Output) [35]. El indicador de potencia de salida está en el área de información de la parte superior de la pantalla, y el ajuste de potencia, en los mandos giratorios de la pantalla táctil [35].'),
      t: T('Tanısal kalite için gereken en düşük gücü kullanın (ALARA) [12][35].', 'Use the lowest power that gives diagnostic quality (ALARA) [12][35].', 'Use la potencia más baja que dé calidad diagnóstica (ALARA) [12][35].')},

    /* — Dondurma, kayıt ve ekran — */
    {id: 'freeze', g: 'freeze', k: 'freeze', x: 688, y: 458, w: 76, h: 34, lab: 'Freeze', ic: 'freeze',
      n: T('Freeze (dondur) tuşu', 'Freeze key', 'Tecla Freeze (congelar)'),
      d: T('Canlı görüntüyü durdurur, tuş yeşil yanar; yeniden basınca canlı görüntüye dönülür. Donmuş görüntüde trackball çevrilince son saniyeler kare kare geri oynatılır (cine). Dondurma kaldırılınca ekrandaki ölçümler silinir; çalışma sayfasında kalır [35].',
        'Stops the live image and the key lights green; press it again to return to live imaging. On a frozen image, moving the trackball plays back the last seconds frame by frame (cine). Unfreezing erases the measurements from the screen, though they stay on the worksheet [35].',
        'Detiene la imagen en vivo y la tecla se ilumina en verde; al pulsarla de nuevo se vuelve a la imagen en vivo. Con la imagen congelada, al mover la trackball se reproducen los últimos segundos fotograma a fotograma (cine). Al descongelar se borran las medidas de la pantalla, aunque quedan en la hoja de trabajo [35].'),
      t: T('İğne ucu kısa süre göründüyse dondurup cine ile o kareyi bulun [33].', 'If the needle tip was visible only briefly, freeze and find that frame with cine [33].', 'Si la punta de la aguja se vio solo un instante, congele y busque ese fotograma con el cine [33].')},
    {id: 'p1', g: 'freeze', k: 'dround', x: 752, y: 458, r: 18, lab: 'P1',
      n: T('P1 tuşu (kaydet/yazdır)', 'P1 key (store/print)', 'Tecla P1 (guardar/imprimir)'),
      d: T('Donmuş görüntüde seçilen kareyi ya da döngüyü (loop) panoya kaydeder [35]. P1 bir yazıcıya ya da DICOM hedefine atanabilir [36].',
        'Stores the selected frame or loop of a frozen image to the clipboard [35]. P1 can be assigned to a printer or a DICOM destination [36].',
        'Guarda en el portapapeles el fotograma o el bucle seleccionado de una imagen congelada [35]. P1 puede asignarse a una impresora o a un destino DICOM [36].'),
      t: T('Kaydedilen görüntüler ekranın altındaki panoda küçük resim olarak görünür [35].', 'Stored images appear as thumbnails in the clipboard at the bottom of the screen [35].', 'Las imágenes guardadas aparecen como miniaturas en el portapapeles de la parte inferior de la pantalla [35].')},
    {id: 'lr', g: 'freeze', k: 'dround', x: 594, y: 474, r: 13, set2: [575, 614], ic: 'lr',
      n: T('L ve R tuşları (bölünmüş ekran)', 'L and R keys (split screen)', 'Teclas L y R (pantalla dividida)'),
      d: T('L ya da R\'ye basınca ekran ikiye bölünür; L basılı tutulursa ekran dörde bölünür; L/R etkin görüntüyü değiştirir [35].',
        'Pressing L or R splits the screen in two; holding L gives a quad display; L/R switches the active image [35].',
        'Al pulsar L o R la pantalla se divide en dos; manteniendo L pulsada se divide en cuatro; L/R cambia la imagen activa [35].'),
      t: T('Bölünmüş ekranda bir ölçüm iki görüntüye aynı anda çizilebilir [35].', 'In split screen a measurement can be drawn on both images at once [35].', 'En pantalla dividida puede dibujarse una medida en ambas imágenes a la vez [35].')},

    /* — Trackball, ölçüm ve not — */
    {id: 'ball', g: 'measure', k: 'ball', x: 420, y: 445, r: 44,
      n: T('Trackball (iztopu)', 'Trackball', 'Trackball'),
      d: T('Cihazın faresidir: ölçüm imleçlerini, renk kutusunu, Doppler kapısını ve imleci hareket ettirir; donmuş görüntüde cine\'yi oynatır [35][33].',
        'The mouse of the system: it moves calipers, the colour box, the Doppler gate and the pointer, and plays cine on a frozen image [35][33].',
        'Es el ratón del equipo: mueve los calibradores, la caja de color, la puerta Doppler y el puntero, y reproduce el cine con la imagen congelada [35][33].'),
      t: T('Çevresindeki altı tuşun o anki işlevi ekranın sağ alt köşesinde yazar [35].', 'The current functions of the six keys around it are shown in the lower-right corner of the screen [35].', 'La función actual de las seis teclas que la rodean se muestra en la esquina inferior derecha de la pantalla [35].')},
    {id: 'measure', g: 'measure', k: 'arc', x: 420, y: 445, a0: 278, a1: 326, lab: 'Measure', ic: 'measure',
      n: T('Measure (ölçüm) tuşu', 'Measure key', 'Tecla Measure (medir)'),
      d: T('Ölçüm imlecini ve seçili ön ayarın hesaplama paketini başlatır [35]. Noktalar trackball ile konur ve Set ile sabitlenir; mesafe, alan, çevre ve hacim ölçülebilir [35][33].',
        'Starts a measurement caliper and the calculation package of the selected preset [35]. Points are placed with the trackball and fixed with Set; distance, area, circumference and volume can be measured [35][33].',
        'Inicia un calibrador de medida y el paquete de cálculo del preajuste seleccionado [35]. Los puntos se colocan con la trackball y se fijan con Set; pueden medirse distancia, área, perímetro y volumen [35][33].'),
      t: T('Ölçümden önce görüntüyü dondurun [35].', 'Freeze the image before measuring [35].', 'Congele la imagen antes de medir [35].')},
    {id: 'tkey', g: 'measure', k: 'arc', x: 420, y: 445, a0: 214, a1: 262,
      n: T('Üst sol trackball tuşu', 'Upper-left trackball key', 'Tecla superior izquierda de la trackball'),
      d: T('İşlevi duruma göre değişir ve ekranın sağ alt köşesinde gösterilir; örneğin ölçümde imleçler arasında geçiş yapar, not modunda ok işareti ekler [35].',
        'Its function depends on the situation and is shown in the lower-right corner of the screen; for example it switches between calipers during a measurement and adds an arrow in comment mode [35].',
        'Su función depende de la situación y se muestra en la esquina inferior derecha de la pantalla; por ejemplo, alterna entre calibradores durante una medida y añade una flecha en el modo de comentario [35].')},
    {id: 'smart', g: 'measure', k: 'sq', x: 420, y: 445, a: 196, a2: 344,
      n: T('Küçük trackball tuşları', 'Small trackball keys', 'Teclas pequeñas de la trackball'),
      d: T('Duruma göre değişen iki küçük tuş: canlı B-modda odak bölgesini ya da frekansı aşağı/yukarı alır; PW ve CW Doppler\'de taban çizgisini ya da ölçeği değiştirir; mod imlecinde örnek hacim boyunu ayarlar [35]. Hangi işlevin atanacağı ayarlardan seçilir [36].',
        'Two small keys whose function depends on the situation: in live B-mode they move the focal zone or the frequency down/up; in PW and CW Doppler they change the baseline or the scale; with the mode cursor they set the sample-volume size [35]. Which function is assigned is chosen in the settings [36].',
        'Dos teclas pequeñas cuya función depende de la situación: en modo B en vivo bajan o suben la zona focal o la frecuencia; en Doppler PW y CW cambian la línea de base o la escala; con el cursor de modo ajustan el tamaño del volumen de muestra [35]. La función asignada se elige en los ajustes [36].')},
    {id: 'set', g: 'measure', k: 'arc', x: 420, y: 445, a0: 110, a1: 168, mirror: true,
      n: T('Set tuşları (alt yaylar)', 'Set keys (lower arcs)', 'Teclas Set (arcos inferiores)'),
      d: T('Trackball\'un iki yanındaki uzun tuşlar seçimi onaylar (Set). İşlevleri o anki duruma göre değişir: ölçüm noktasını sabitler, cine\'de başlangıç ve bitiş karesini seçer, hasta listesinde seçim yapar; geçerli işlev ekranın sağ alt köşesinde yazar [35].',
        'The long keys on both sides of the trackball confirm a selection (Set). Their functions follow the situation: they fix a measurement point, choose the start and end frames in cine, or select in the patient list; the current function is shown in the lower-right corner of the screen [35].',
        'Las teclas largas a ambos lados de la trackball confirman la selección (Set). Su función depende de la situación: fijan un punto de medida, eligen los fotogramas inicial y final en el cine o seleccionan en la lista de pacientes; la función actual se muestra en la esquina inferior derecha de la pantalla [35].')},
    {id: 'ellipse', g: 'measure', k: 'knobS', x: 538, y: 368, r: 12,
      n: T('Ellipse / Body Pattern düğmesi', 'Ellipse / Body Pattern knob', 'Mando Ellipse / Body Pattern'),
      d: T('İki işlevi vardır: ölçümde iki noktalı mesafe ölçümünü elips alan ölçümüne çevirir; vücut şeması (body pattern) açıkken şema üzerindeki prob işaretini döndürür [35].',
        'It has two functions: in a measurement it turns a two-point distance into an ellipse area measurement; with a body pattern displayed it rotates the probe mark on the pattern [35].',
        'Tiene dos funciones: en una medida convierte la distancia entre dos puntos en una medida de área por elipse; con un pictograma corporal en pantalla gira la marca de la sonda sobre el pictograma [35].'),
      t: T('Vücut şeması, görüntünün vücudun neresinden alındığını belgeler [33].', 'The body pattern documents where on the body the image was taken [33].', 'El pictograma corporal documenta en qué parte del cuerpo se obtuvo la imagen [33].')},
    {id: 'clear', g: 'measure', k: 'round', x: 292, y: 434, r: 13, lab: 'Clear', ic: 'clear',
      n: T('Clear (sil) tuşu', 'Clear key', 'Tecla Clear (borrar)'),
      d: T('Ölçüm sırasında etkin imleci ve ölçümü siler; ölçüm yokken ekrandaki tüm imleçleri ve ölçümleri temizler. Notları ve vücut şemasını silmek için de kullanılır [35].',
        'During a measurement it erases the active caliper and its result; otherwise it clears all calipers and measurements from the screen. It is also used to erase comments and the body pattern [35].',
        'Durante una medida borra el calibrador activo y su resultado; fuera de una medida borra todos los calibradores y medidas de la pantalla. También sirve para borrar comentarios y el pictograma corporal [35].')},
    {id: 'comment', g: 'measure', k: 'round', x: 298, y: 397, r: 13, lab: 'Cmnt', ic: 'comment',
      n: T('Comment (not) tuşu', 'Comment key', 'Tecla Comment (comentario)'),
      d: T('Not yazma modunu açar: imleç trackball ile taşınır, hazır kelime kütüphanesi dokunmatik ekranda açılır, klavyeden de yazılabilir [35].',
        'Opens comment mode: the cursor is moved with the trackball, a word library opens on the touch screen and you can also type on the keyboard [35].',
        'Abre el modo de comentario: el cursor se mueve con la trackball, se abre una biblioteca de palabras en la pantalla táctil y también puede escribir con el teclado [35].'),
      t: T('Not modunu açtıktan hemen sonra Clear\'a iki kez basmak tüm notları siler [35].', 'Pressing Clear twice right after entering comment mode erases all comments [35].', 'Pulsar Clear dos veces justo después de entrar en el modo de comentario borra todos los comentarios [35].')},
    {id: 'pointer', g: 'measure', k: 'round', x: 296, y: 471, r: 13, ic: 'pointer',
      n: T('Pointer (imleç) tuşu', 'Pointer key', 'Tecla Pointer (puntero)'),
      d: T('Ekranda bir ok imleci gösterir; trackball ve Set tuşlarıyla ekrandaki ve dokunmatik ekrandaki öğeler seçilir [35].',
        'Shows an arrow pointer on the screen; items on the monitor and the touch screen are then selected with the trackball and the Set keys [35].',
        'Muestra un puntero de flecha en la pantalla; con la trackball y las teclas Set se seleccionan elementos del monitor y de la pantalla táctil [35].')},

    /* — Kişisel tuşlar ve klavye — */
    {id: 'user', g: 'user', k: 'oblong', x: 189, y: 425, w: 58, h: 24, c: 'blue', set3: [[190, 392, 'grey'], [124, 425, 'white'], [184, 425, 'blue'], [106, 456, 'blue'], [168, 456, 'blue'], [728, 384, 'grey'], [728, 416, 'grey']],
      n: T('Kullanıcı tanımlı tuşlar (1–7)', 'User-defined keys (1–7)', 'Teclas definidas por el usuario (1–7)'),
      d: T('Arkadan aydınlatılan yedi tuşa sık kullanılan işlevler atanır (örn. elastografi, B-Flow, 3D/4D). Atama Utility menüsünden yapılır; bu yüzden üzerlerinde sabit yazı yoktur [36].',
        'Frequently used functions are assigned to these seven backlit keys (e.g. elastography, B-Flow, 3D/4D). The assignment is made in the Utility menu, which is why they carry no fixed legend [36].',
        'A estas siete teclas retroiluminadas se asignan funciones de uso frecuente (p. ej., elastografía, B-Flow, 3D/4D). La asignación se hace en el menú Utility, por eso no llevan una leyenda fija [36].'),
      t: T('Hangi tuşa ne atandığı cihazdan cihaza değişir; ekip içinde ortak bir düzen kullanmak işe yarar.', 'What each key does varies from unit to unit; a shared layout within the team helps.', 'Lo que hace cada tecla varía de un equipo a otro; ayuda acordar una disposición común en el equipo.')},
    {id: 'kbd', g: 'user', k: 'kbd', x: 457, y: 655, w: 210, h: 50,
      n: T('Alfanümerik klavye (isteğe bağlı)', 'Alphanumeric keyboard (optional)', 'Teclado alfanumérico (opcional)'),
      d: T('Panelin altından çekmece gibi çıkan fiziksel klavyedir; hasta bilgisi ve not yazmak içindir [36]. Fiziksel klavye isteğe bağlıdır; dokunmatik ekrandaki KBD düğmesi ekran klavyesini açar [35][37].',
        'A physical keyboard that slides out like a drawer below the panel, for typing patient details and comments [36]. The physical keyboard is optional; KBD on the touch screen opens an on-screen keyboard [35][37].',
        'Teclado físico que sale como un cajón bajo el panel, para escribir los datos del paciente y comentarios [36]. El teclado físico es opcional; KBD en la pantalla táctil abre un teclado en pantalla [35][37].')}
  ];
  const byId = new Map(C.map(c => [c.id, c]));

  /* ---------- Çizim ---------- */
  const DEFS = `<defs>
    <radialGradient id="ukKnobB" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#4A4F55"/><stop offset=".55" stop-color="#1C1F23"/><stop offset="1" stop-color="#0B0C0E"/></radialGradient>
    <radialGradient id="ukKnobW" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#D9DCDE"/><stop offset="1" stop-color="#9FA4A8"/></radialGradient>
    <linearGradient id="ukKey" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D8DADB"/><stop offset="1" stop-color="#B9BCBE"/></linearGradient>
    <linearGradient id="ukKeyD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B4045"/><stop offset="1" stop-color="#1D2024"/></linearGradient>
    <linearGradient id="ukBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8E8BFF"/><stop offset="1" stop-color="#5D58F0"/></linearGradient>
    <radialGradient id="ukBall" cx=".42" cy=".38" r=".65"><stop offset="0" stop-color="#F4F1FF"/><stop offset=".7" stop-color="#C9C3E6"/><stop offset="1" stop-color="#A69FCB"/></radialGradient>
    <linearGradient id="ukPanel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3F1EC"/><stop offset="1" stop-color="#DEDBD4"/></linearGradient>
    <filter id="ukGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
  </defs>`;
  const pol = (cx, cy, r, a) => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
  const f1 = v => v.toFixed(1);
  const arcPath = (cx, cy, r0, r1, a0, a1) => { const [x0, y0] = pol(cx, cy, r1, a0), [x1, y1] = pol(cx, cy, r1, a1), [x2, y2] = pol(cx, cy, r0, a1), [x3, y3] = pol(cx, cy, r0, a0), lg = a1 - a0 > 180 ? 1 : 0; return `M${f1(x0)} ${f1(y0)}A${r1} ${r1} 0 ${lg} 1 ${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}A${r0} ${r0} 0 ${lg} 0 ${f1(x3)} ${f1(y3)}Z`; };
  /* Simgeler (x, y merkez, s ölçek ≈ yarı boy) */
  const ICON = {
    power: (x, y, s, c) => `<path d="M${f1(x - s * .55)} ${f1(y - s * .45)}A${f1(s * .75)} ${f1(s * .75)} 0 1 0 ${f1(x + s * .55)} ${f1(y - s * .45)}" fill="none" stroke="${c}" stroke-width="${f1(s * .2)}" stroke-linecap="round"/><path d="M${x} ${f1(y - s * .95)}V${f1(y - s * .05)}" stroke="${c}" stroke-width="${f1(s * .2)}" stroke-linecap="round"/>`,
    comment: (x, y, s, c) => `<rect x="${f1(x - s * .8)}" y="${f1(y - s * .6)}" width="${f1(s * 1.6)}" height="${f1(s * .95)}" rx="${f1(s * .15)}" fill="none" stroke="${c}" stroke-width="${f1(s * .14)}"/><path d="M${f1(x - s * .4)} ${f1(y - s * .25)}h${f1(s * .8)}M${f1(x - s * .4)} ${f1(y)}h${f1(s * .5)}" stroke="${c}" stroke-width="${f1(s * .12)}"/>`,
    clear: (x, y, s, c) => `<rect x="${f1(x - s * .7)}" y="${f1(y - s * .55)}" width="${f1(s * 1.4)}" height="${f1(s * .95)}" rx="${f1(s * .12)}" fill="none" stroke="${c}" stroke-width="${f1(s * .14)}"/><path d="M${f1(x - s * .3)} ${f1(y - s * .3)}l${f1(s * .6)} ${f1(s * .45)}M${f1(x + s * .3)} ${f1(y - s * .3)}l${f1(-s * .6)} ${f1(s * .45)}" stroke="${c}" stroke-width="${f1(s * .14)}"/>`,
    pointer: (x, y, s, c) => `<path d="M${f1(x - s * .35)} ${f1(y - s * .7)}L${f1(x + s * .45)} ${f1(y + s * .1)}L${f1(x + s * .05)} ${f1(y + s * .15)}L${f1(x + s * .3)} ${f1(y + s * .65)}L${f1(x + s * .1)} ${f1(y + s * .75)}L${f1(x - s * .12)} ${f1(y + s * .27)}L${f1(x - s * .35)} ${f1(y + s * .5)}Z" fill="${c}"/>`,
    measure: (x, y, s, c) => `<path d="M${f1(x - s)} ${f1(y + s * .3)}L${f1(x + s * .6)} ${f1(y - s * .5)}" stroke="${c}" stroke-width="${f1(s * .16)}"/><path d="M${f1(x - s)} ${f1(y + s * .05)}v${f1(s * .5)}M${f1(x + s * .6)} ${f1(y - s * .75)}v${f1(s * .5)}" stroke="${c}" stroke-width="${f1(s * .16)}"/>`,
    freeze: (x, y, s, c) => `<rect x="${f1(x - s * .7)}" y="${f1(y - s * .5)}" width="${f1(s * 1.4)}" height="${f1(s)}" rx="${f1(s * .12)}" fill="none" stroke="${c}" stroke-width="${f1(s * .14)}"/><path d="M${f1(x - s * .4)} ${f1(y + s * .2)}l${f1(s * .25)} ${f1(-s * .35)}l${f1(s * .2)} ${f1(s * .2)}l${f1(s * .3)} ${f1(-s * .25)}" fill="none" stroke="${c}" stroke-width="${f1(s * .12)}"/>`,
    lrL: (x, y, s, c) => `<rect x="${f1(x - s * .7)}" y="${f1(y - s * .55)}" width="${f1(s * 1.4)}" height="${f1(s * 1.1)}" rx="${f1(s * .12)}" fill="none" stroke="${c}" stroke-width="${f1(s * .13)}"/><rect x="${f1(x - s * .6)}" y="${f1(y - s * .45)}" width="${f1(s * .62)}" height="${f1(s * .9)}" fill="${c}"/><text x="${f1(x - s * .29)}" y="${f1(y + s * .28)}" font-size="${f1(s * .75)}" text-anchor="middle" font-family="Archivo,Arial" font-weight="800" fill="#1D2024">L</text>`,
    lrR: (x, y, s, c) => `<rect x="${f1(x - s * .7)}" y="${f1(y - s * .55)}" width="${f1(s * 1.4)}" height="${f1(s * 1.1)}" rx="${f1(s * .12)}" fill="none" stroke="${c}" stroke-width="${f1(s * .13)}"/><rect x="${f1(x - .02 * s)}" y="${f1(y - s * .45)}" width="${f1(s * .62)}" height="${f1(s * .9)}" fill="${c}"/><text x="${f1(x + s * .29)}" y="${f1(y + s * .28)}" font-size="${f1(s * .75)}" text-anchor="middle" font-family="Archivo,Arial" font-weight="800" fill="#1D2024">R</text>`
  };
  const txt = (x, y, s, t, c = '#3B4045', wt = 700, anchor = 'middle') => `<text x="${f1(x)}" y="${f1(y)}" font-size="${f1(s)}" text-anchor="${anchor}" font-family="Archivo,Arial,sans-serif" font-weight="${wt}" fill="${c}">${t}</text>`;
  const oblong = (x, y, w, h, fill, stroke = '#A3A7AA') => `<rect x="${f1(x - w / 2)}" y="${f1(y - h / 2)}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>`;
  const knob = (x, y, r, kind) => {
    const black = kind !== 'knobW' && kind !== 'joy';
    const knurl = Array.from({length: 18}, (_, i) => { const [a, b] = pol(x, y, r * .98, i * 20), [c, d] = pol(x, y, r * .78, i * 20); return `M${f1(a)} ${f1(b)}L${f1(c)} ${f1(d)}`; }).join('');
    return `<circle cx="${x}" cy="${f1(y + r * .18)}" r="${f1(r * 1.02)}" fill="rgba(0,0,0,.22)"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${black ? 'ukKnobB' : 'ukKnobW'})" stroke="${black ? '#08090A' : '#8E9397'}" stroke-width="1"/><path d="${knurl}" stroke="${black ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.12)'}" stroke-width="1"/><circle cx="${x}" cy="${y}" r="${f1(r * .62)}" fill="${black ? '#1A1D20' : '#ECEDEE'}" opacity="${black ? .9 : .7}"/>`;
  };

  /* Bir kontrolün SVG öğeleri (sel: vurgulu) */
  function draw(c) {
    const o = [];
    switch (c.k) {
      case 'oblong': {
        const list = c.set3 || [[c.x, c.y, c.c || 'grey']];
        list.forEach(([x, y, v]) => {
          if (v === 'blue') o.push(`<rect x="${x - c.w / 2 - 3}" y="${y - c.h / 2 - 3}" width="${c.w + 6}" height="${c.h + 6}" rx="${c.h / 2 + 3}" fill="#7C78FF" opacity=".55" filter="url(#ukGlow)"/>`);
          o.push(oblong(x, y, c.w, c.h, v === 'blue' ? 'url(#ukBlue)' : v === 'white' ? '#F4F2EE' : 'url(#ukKey)', v === 'blue' ? '#4D47D8' : '#A3A7AA'));
        });
        if (c.ic) o.push(ICON[c.ic](c.x, c.y, c.h * .42, '#5A6066'));
        break;
      }
      case 'round': o.push(`<circle cx="${c.x}" cy="${f1(c.y + 2)}" r="${c.r}" fill="rgba(0,0,0,.18)"/><circle cx="${c.x}" cy="${c.y}" r="${c.r}" fill="url(#ukKey)" stroke="#A3A7AA" stroke-width="1.2"/>`);
        if (c.ic) o.push(ICON[c.ic](c.x, c.y - (c.lab ? c.r * .28 : 0), c.r * .5, '#5F67D8'));
        if (c.lab) o.push(txt(c.x, c.y + (c.ic ? c.r * .62 : c.r * .3), c.r * (c.ic ? .48 : .75), c.lab, c.ic ? '#5F67D8' : '#4A5055'));
        break;
      case 'dround': {
        const xs = c.set2 || [c.x];
        xs.forEach((x, i) => { o.push(`<circle cx="${x}" cy="${f1(c.y + 2)}" r="${c.r}" fill="rgba(0,0,0,.25)"/><circle cx="${x}" cy="${c.y}" r="${c.r}" fill="url(#ukKeyD)" stroke="#0D0F11" stroke-width="1.2"/>`);
          if (c.ic === 'lr') o.push(ICON[i ? 'lrR' : 'lrL'](x, c.y, c.r * .55, '#C9C6FF'));
          else if (c.lab) o.push(txt(x, c.y + c.r * .32, c.r * .78, c.lab, '#ECEDEE', 800)); });
        break;
      }
      case 'freeze': o.push(`<rect x="${c.x - c.w / 2}" y="${c.y - c.h / 2 + 2}" width="${c.w}" height="${c.h}" rx="${c.h / 2}" fill="rgba(0,0,0,.25)"/>`, oblong(c.x, c.y, c.w, c.h, 'url(#ukKeyD)', '#0D0F11'), ICON.freeze(c.x - c.w * .26, c.y, c.h * .24, '#A7E8B8'), txt(c.x + c.w * .1, c.y + c.h * .14, c.h * .38, 'Freeze', '#A7E8B8', 800)); break;
      case 'knob': case 'knobB': case 'knobS': {
        const big = c.k === 'knobB', small = c.k === 'knobS';
        if (!small) { const bx = big ? c.x : c.x + c.r * 1.25, by = big ? c.y + c.r * 1.25 : c.y + c.r * .45; o.push(`<path d="M${f1(c.x - c.r * 1.3)} ${f1(c.y)}A${f1(c.r * 1.3)} ${f1(c.r * 1.3)} 0 1 1 ${f1(c.x + c.r * 1.3)} ${f1(c.y)}Q${f1(big ? c.x + c.r * .9 : c.x + c.r * 2.3)} ${f1(big ? c.y + c.r * 2.1 : c.y + c.r * 1.4)} ${f1(bx)} ${f1(by + c.r * .55)}Q${f1(big ? c.x - c.r * .9 : c.x)} ${f1(big ? c.y + c.r * 2.1 : c.y + c.r * 1.5)} ${f1(c.x - c.r * 1.3)} ${f1(c.y)}Z" fill="#C7CACC" stroke="#A9ADB0" stroke-width="1"/>`); o.push(txt(bx, by + c.r * .32, c.r * (big ? .7 : .62), c.lab, '#3B4045', 800)); }
        o.push(knob(c.x, c.y, c.r, c.k));
        if (small) { o.push(txt(c.x - 30, c.y + 27, 8.2, '⬭ Ellipse', '#4A5055', 600, 'start'), txt(c.x - 30, c.y + 37, 8.2, '♙ Body Pattern', '#4A5055', 600, 'start')); }
        break;
      }
      case 'knobW': (c.set || [c.x]).forEach(x => o.push(knob(x, c.y, c.r, 'knobW'))); break;
      case 'joy': o.push(knob(c.x, c.y, c.r, 'joy'), txt(c.x - 30, c.y + 13, 8.5, 'Steer ◀', '#3B4045', 700), txt(c.x + 28, c.y - 9, 9, '▶', '#3B4045'), txt(c.x - 18, c.y + 33, 8.5, 'Depth ▼', '#3B4045', 700), txt(c.x + 30, c.y + 23, 8.5, '⤢ Zoom', '#3B4045', 700)); break;
      case 'ball': o.push(`<circle cx="${c.x}" cy="${c.y}" r="${c.r + 9}" fill="#D2CFC8" stroke="#B5B1A9" stroke-width="1.2"/><circle cx="${c.x}" cy="${f1(c.y + 3)}" r="${c.r}" fill="rgba(0,0,0,.18)"/><circle cx="${c.x}" cy="${c.y}" r="${c.r}" fill="url(#ukBall)"/><ellipse cx="${f1(c.x - c.r * .3)}" cy="${f1(c.y - c.r * .38)}" rx="${f1(c.r * .28)}" ry="${f1(c.r * .14)}" fill="#fff" opacity=".7"/>`); break;
      case 'arc': {
        const segs = c.mirror ? [[c.a0, c.a1], [180 - c.a1, 180 - c.a0]] : [[c.a0, c.a1]];
        segs.forEach(([a0, a1]) => o.push(`<path d="${arcPath(c.x, c.y, 63, 79, a0, a1)}" fill="url(#ukKey)" stroke="#A3A7AA" stroke-width="1.2"/>`));
        if (c.ic) { const [ix, iy] = pol(c.x, c.y, 71, (c.a0 + c.a1) / 2); o.push(ICON[c.ic](ix - 14, iy, 5.2, '#5F67D8'), txt(ix + 6, iy + 3, 8, c.lab, '#5F67D8', 700)); }
        break;
      }
      case 'sq': [c.a, c.a2].forEach(a => { const [x, y] = pol(c.x, c.y, 78, a); o.push(`<rect x="${f1(x - 10)}" y="${f1(y - 10)}" width="20" height="20" rx="4" transform="rotate(${f1(a + 90)} ${f1(x)} ${f1(y)})" fill="url(#ukKey)" stroke="#A3A7AA" stroke-width="1.2"/>`); }); break;
      case 'touch': o.push(`<rect x="${c.x - c.w / 2}" y="${c.y - c.h / 2}" width="${c.w}" height="${c.h}" rx="4" fill="rgba(79,209,190,.18)" stroke="#4FD1BE" stroke-width="1.4" stroke-dasharray="${c.id === 'probe' || c.id === 'exam' ? '0' : '0'}"/>`); break;
      case 'paddle': o.push(`<rect x="${c.x - c.w / 2 - 3}" y="${c.y - c.h / 2}" width="${c.w / 2 - 3}" height="${c.h}" rx="5" fill="#25292D" stroke="#0D0F11"/>`, `<rect x="${c.x + 6}" y="${c.y - c.h / 2}" width="${c.w / 2 - 3}" height="${c.h}" rx="5" fill="#25292D" stroke="#0D0F11"/>`, txt(c.x - c.w / 4 - 1, c.y + 4, 10, '◀▶', '#C9CCCE'), txt(c.x + c.w / 4 + 4, c.y + 4.5, 11, '▲▼', '#C9CCCE')); break;
      case 'kbd': { o.push(`<rect x="${c.x - c.w / 2}" y="${c.y - c.h / 2}" width="${c.w}" height="${c.h}" rx="6" fill="#2A2E33" stroke="#111"/>`); for (let r = 0; r < 4; r++) for (let k = 0; k < 13; k++) o.push(`<rect x="${f1(c.x - c.w / 2 + 8 + k * 15)}" y="${f1(c.y - c.h / 2 + 6 + r * 10.5)}" width="12" height="8" rx="1.5" fill="#3F444A"/>`); break; }
    }
    return o.join('');
  }
  /* Kontrolün sınır kutusu (tek resim ve vurgu için) */
  function bbox(c) {
    if (c.k === 'knobW') { const xs = c.set; return [xs[0] - c.r - 6, c.y - c.r - 6, xs[xs.length - 1] - xs[0] + 2 * c.r + 12, 2 * c.r + 12]; }
    if (c.k === 'oblong' && c.set3) { const xs = c.set3.map(p => p[0]), ys = c.set3.map(p => p[1]); return [Math.min(...xs) - c.w / 2 - 6, Math.min(...ys) - c.h / 2 - 6, Math.max(...xs) - Math.min(...xs) + c.w + 12, Math.max(...ys) - Math.min(...ys) + c.h + 12]; }
    if (c.k === 'dround' && c.set2) return [c.set2[0] - c.r - 6, c.y - c.r - 6, c.set2[1] - c.set2[0] + 2 * c.r + 12, 2 * c.r + 12];
    if (c.k === 'arc' || c.k === 'sq') return [c.x - 92, c.y - 92, 184, 184];
    if (c.k === 'ball') return [c.x - c.r - 14, c.y - c.r - 14, 2 * c.r + 28, 2 * c.r + 28];
    if (c.k === 'knobB') return [c.x - c.r * 1.6, c.y - c.r * 1.5, c.r * 3.2, c.r * 3.6];
    if (c.k === 'knob') return [c.x - c.r * 1.5, c.y - c.r * 1.4, c.r * 4.2, c.r * 3];
    if (c.k === 'knobS') return [c.x - 34, c.y - c.r - 6, 72, c.r + 50];
    if (c.k === 'joy') return [c.x - 52, c.y - c.r - 8, 104, c.r + 50];
    if (c.r) return [c.x - c.r - 6, c.y - c.r - 6, 2 * c.r + 12, 2 * c.r + 12];
    return [c.x - c.w / 2 - 6, c.y - c.h / 2 - 6, c.w + 12, c.h + 12];
  }

  /* Dokunmatik ekran (sadeleştirilmiş R4 düzeni: sol sütun sınav düğmeleri, sağ sütun problar, üst satır, alt düğme etiketleri) */
  function touchScreen() {
    const X0 = 262, Y0 = 52, W = 362, H = 236, o = [];
    o.push(`<rect x="${X0 - 14}" y="${Y0 - 14}" width="${W + 28}" height="${H + 38}" rx="10" fill="#E9E7E2" stroke="#C9C6BF"/>`, `<rect x="${X0}" y="${Y0}" width="${W}" height="${H}" rx="3" fill="#1A2026"/>`, txt(X0 + W / 2, Y0 - 3, 8, 'LOGIQ', '#7A7F84', 600));
    ['PATIENT', 'SCAN', 'END EXAM', 'KBD', 'UTILITY'].forEach((s, i) => o.push(`<rect x="${X0 + 5}" y="${Y0 + 34 + i * 30}" width="28" height="26" rx="3" fill="${i === 1 ? '#3D5A80' : '#2C343C'}"/>`, txt(X0 + 19, Y0 + 51 + i * 30, 5.6, s, '#D5DBE0', 700)));
    ['My Page', 'MyTrainer', 'Reset', 'Reverse'].forEach((s, i) => o.push(`<rect x="${X0 + 42 + i * 52}" y="${Y0 + 6}" width="48" height="20" rx="3" fill="${i === 3 ? '#2E8BD8' : '#38424C'}"/>`, txt(X0 + 66 + i * 52, Y0 + 19, 6.4, s, '#E6EBEF', 600)));
    o.push(`<rect x="${X0 + 255}" y="${Y0 + 6}" width="44" height="20" rx="3" fill="#38424C"/>`, txt(X0 + 277, Y0 + 19, 7, 'TGC', '#E6EBEF', 700));
    ['Protocol', 'ECG', 'B', 'CF', 'PW', 'Cine'].forEach((s, i) => o.push(`<rect x="${X0 + 42 + i * 38}" y="${Y0 + 34}" width="35" height="16" rx="2" fill="${i === 2 ? '#56616B' : '#2C343C'}"/>`, txt(X0 + 59.5 + i * 38, Y0 + 45, 6, s, '#D5DBE0', 600)));
    [['Model', 74, 70], ['PDI', 170, 70], ['Auto', 170, 210]].forEach(([s, x, y]) => o.push(`<rect x="${X0 + x - 34}" y="${Y0 + y - 11}" width="68" height="20" rx="3" fill="#2C343C"/>`, txt(X0 + x, Y0 + y + 3, 7, s, '#E6EBEF', 700)));
    [['Gain', 74, 110], ['Frequency', 170, 110], ['Focus', 266, 110], ['Dyn. Range', 74, 150], ['Power', 170, 150], ['CHI', 266, 150], ['CrossXBeam', 74, 190], ['SRI-HD', 266, 190]].forEach(([s, x, y]) => o.push(`<rect x="${X0 + x - 34}" y="${Y0 + y - 11}" width="68" height="20" rx="3" fill="#252C33"/>`, txt(X0 + x, Y0 + y + 3, 6.4, s, '#AEB8C1', 600)));
    for (let i = 0; i < 4; i++) o.push(`<rect x="${X0 + W - 34}" y="${Y0 + 34 + i * 34}" width="28" height="30" rx="3" fill="${i === 1 ? '#C9D7EA' : '#2C343C'}"/>`, `<path d="M${X0 + W - 22} ${Y0 + 41 + i * 34}h4v12l-2 4l-2 -4z" fill="${i === 1 ? '#3D5A80' : '#AEB8C1'}"/>`);
    ['Loop Speed', 'Cycle Select', 'Start Frame', 'End Frame', 'Frame By Frame'].forEach((s, i) => o.push(txt(273 + i * 74, Y0 + H - 6, 5.8, '↻ ' + s, '#C2CAD1', 600)));
    return o.join('');
  }
  /* Panel gövdesi (üstten görünüş, fotoğraf koordinatlarında) */
  const BODY = `<path d="M96 352 Q100 330 140 326 L250 322 L630 322 L770 328 Q842 334 850 372 L858 520 Q860 600 800 606 L560 606 Q540 606 532 626 L525 690 L390 690 L383 626 Q376 606 356 606 L120 606 Q62 600 64 520 L70 400 Q72 360 96 352 Z" fill="url(#ukPanel)" stroke="#BDB9B1" stroke-width="1.5"/>
    <path d="M110 520 Q110 560 140 562 L360 562 Q386 562 392 540 L396 512 Q300 524 200 512 Z" fill="#CFCBC3" opacity=".7"/>
    <path d="M806 520 Q806 560 776 562 L556 562 Q530 562 524 540 L520 512 Q616 524 716 512 Z" fill="#CFCBC3" opacity=".7"/>`;

  function panelSVG(o = {}) {
    const items = C.map(c => `<g class="uk-k" data-k="${c.id}" tabindex="0" role="button" aria-label="${c.id}">${draw(c)}<rect class="uk-hit" fill="transparent" stroke="none" x="${f1(bbox(c)[0])}" y="${f1(bbox(c)[1])}" width="${f1(bbox(c)[2])}" height="${f1(bbox(c)[3])}" rx="8"/></g>`).join('');
    return `<svg class="uk-panel" viewBox="56 30 812 690" role="img" aria-label="${o.label || 'LOGIQ P8 control panel'}" xmlns="http://www.w3.org/2000/svg">${DEFS}${o.flat ? `<rect x="56" y="30" width="812" height="690" fill="#ECE9E3"/>` : BODY}${o.noTouch ? '' : touchScreen()}${o.only ? C.filter(c => o.only(c)).map(draw).join('') : items}</svg>`;
  }
  function keySVG(id, o = {}) {
    let c = byId.get(id); if (!c) return '';
    let [x, y, w, h] = bbox(c);
    if (c.k === 'arc' || c.k === 'sq') {   /* trackball halkası: topla birlikte, seçili tuş vurgulu */
      const ring = ['ball', 'measure', 'tkey', 'smart', 'set'].map(k => byId.get(k));
      const body = ring.map(r => `<g opacity="${r.id === id ? 1 : .35}">${draw(r)}</g>`).join('');
      return `<svg class="uk-key" viewBox="${x} ${y} ${w} ${h}" aria-hidden="true">${DEFS}<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ECE9E3"/>${body}</svg>`;
    }
    if (c.k === 'touch') {   /* dokunmatik ekran öğesi: ekran çiziminden kırpılır */
      const pad = 10; x -= pad; y -= pad; w += 2 * pad; h += 2 * pad; const s = Math.max(w, h); x -= (s - w) / 2; y -= (s - h) / 2;
      return `<svg class="uk-key" viewBox="${f1(x)} ${f1(y)} ${f1(s)} ${f1(s)}" aria-hidden="true">${DEFS}<rect x="${f1(x)}" y="${f1(y)}" width="${f1(s)}" height="${f1(s)}" fill="#1A2026"/>${touchScreen()}<rect x="${c.x - c.w / 2}" y="${c.y - c.h / 2}" width="${c.w}" height="${c.h}" rx="4" fill="none" stroke="#4FD1BE" stroke-width="2"/></svg>`;
    }
    if (c.id === 'user') { const sub = Object.assign({}, c, {set3: c.set3.slice(0, 5)}); [x, y, w, h] = bbox(sub); c = sub; }
    const pad = 4; x -= pad; y -= pad; w += 2 * pad; h += 2 * pad;
    const s = Math.max(w, h); x -= (s - w) / 2; y -= (s - h) / 2;
    return `<svg class="uk-key" viewBox="${f1(x)} ${f1(y)} ${f1(s)} ${f1(s)}" aria-hidden="true">${DEFS}<rect x="${f1(x)}" y="${f1(y)}" width="${f1(s)}" height="${f1(s)}" fill="#ECE9E3"/>${draw(c)}</svg>`;
  }

  /* Etkileşimli arayüz: el = {panel, detail, list}; o = {T: düz metinler (hint, what, tip, touchTag, all), inl: atıf biçimleyici, label} */
  function mountUI(el, o) {
    const pick = v => v && typeof v === 'object' && 'tr' in v ? (typeof ICA !== 'undefined' ? ICA.pick(v) : v.tr) : v;
    const e = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
    const KT = o.T, inl = o.inl || e, host = el.panel, det = el.detail, list = el.list;
    host.innerHTML = panelSVG({label: o.label});
    const card = (c, big) => `${keySVG(c.id)}<div><p class="eyebrow">${e(pick(G.find(g => g.id === c.g).n))}${c.k === 'touch' ? ` · ${e(KT.touchTag)}` : ''}</p><h3>${e(pick(c.n))}</h3>
      <p>${big ? `<b>${e(KT.what)}</b> ` : ''}${inl(pick(c.d))}</p>${c.t ? `<p class="uk-tip"><b>${e(KT.tip)}:</b> ${inl(pick(c.t))}</p>` : ''}</div>`;
    if (list) list.innerHTML = G.map(g => `<h4 class="uk-gh">${e(pick(g.n))}</h4><div class="uk-list">${C.filter(c => c.g === g.id).map(c => `<article class="uk-item" data-k="${c.id}" tabindex="0">${card(c)}</article>`).join('')}</div>`).join('');
    const reduce = typeof REDUCED_MOTION !== 'undefined' && REDUCED_MOTION;
    function select(id, scroll) {
      const c = byId.get(id); if (!c) return;
      host.querySelectorAll('.uk-k').forEach(x => x.classList.toggle('on', x.dataset.k === id));
      if (list) list.querySelectorAll('.uk-item').forEach(x => x.classList.toggle('on', x.dataset.k === id));
      det.innerHTML = `<div class="uk-big">${card(c, true)}</div>`;
      if (scroll) host.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'center'});
    }
    const act = (root, sel, scroll) => {
      root.addEventListener('click', ev => { const g = ev.target.closest(sel); if (g) select(g.dataset.k, scroll); });
      root.addEventListener('keydown', ev => { const g = ev.target.closest(sel); if (g && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); select(g.dataset.k, scroll); } });
    };
    act(host, '.uk-k', false); if (list) act(list, '.uk-item', true);
    host.querySelectorAll('.uk-k').forEach(g => g.setAttribute('aria-label', pick(byId.get(g.dataset.k).n)));
    select(o.start || 'freeze');
    return {select};
  }

  return {G, C, byId, panelSVG, keySVG, draw, bbox, DEFS, mountUI, touchSVG: () => `<svg viewBox="248 38 390 266" xmlns="http://www.w3.org/2000/svg">${DEFS}${touchScreen()}</svg>`, MM: 430 / 795};
})();
