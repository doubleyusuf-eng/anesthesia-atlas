'use strict';
/* Cihaz başına bir soru · grup G. Her sorunun doğru yanıtı content-src/<id>.json içindeki doğrulanmış metne dayanır. */
window.ICA_QUIZ = window.ICA_QUIZ || {};
Object.assign(window.ICA_QUIZ, {
  'blood-gas-analyzer': {
    q: {
      tr: 'Arteriyel kan gazı örneğinde atılmamış küçük bir hava kabarcığı kalırsa pO₂ nasıl etkilenir?',
      en: 'If a small air bubble is left in an arterial blood gas sample, how is pO₂ affected?',
      es: 'Si queda una pequeña burbuja de aire en una muestra de gasometría arterial, ¿cómo se ve afectada la pO₂?'
    },
    o: [
      {tr: 'Hava ile temas pO₂ üzerinde anlamlı etki yapmaz', en: 'Contact with air has no meaningful effect on pO₂', es: 'El contacto con el aire no tiene un efecto relevante sobre la pO₂'},
      {tr: 'pO₂ yaklaşık 150 mmHg’ye doğru yükselir veya düşer', en: 'pO₂ moves towards approximately 150 mmHg, up or down', es: 'La pO₂ se desplaza hacia unos 150 mmHg, al alza o a la baja'},
      {tr: 'Başlangıç değerinden bağımsız olarak pO₂ her durumda düşer, pCO₂ yükselir', en: 'pO₂ always falls while pCO₂ rises, regardless of the initial value', es: 'La pO₂ siempre disminuye y la pCO₂ aumenta, sea cual sea el valor inicial'},
      {tr: 'Yalnızca potasyum yalancı olarak yükselir', en: 'Only potassium becomes falsely elevated', es: 'Solo el potasio aumenta de forma falsa'}
    ],
    a: 1,
    ex: {
      tr: 'Küçük kabarcıklar bile dengelenme sonrası pO₂’yi yaklaşık 150 mmHg’ye doğru (yukarı veya aşağı) çeker; uzamış temasla pCO₂ düşebilir ve pH yükselebilir. Yalancı potasyum yüksekliği hemolizle ilişkilidir.',
      en: 'Even small bubbles, after equilibration, pull pO₂ towards about 150 mmHg (up or down); with prolonged exposure pCO₂ may fall and pH rise. Falsely high potassium is a haemolysis effect.',
      es: 'Incluso burbujas pequeñas, tras equilibrarse, llevan la pO₂ hacia unos 150 mmHg (al alza o a la baja); con exposición prolongada la pCO₂ puede bajar y el pH subir. La falsa hiperpotasemia se debe a la hemólisis.'
    },
    src: 'trouble'
  },
  'lab-co-oximeter': {
    q: {
      tr: 'Karbon monoksit maruziyeti şüphesinde laboratuvar CO-oksimetresiyle COHb ölçümü için örnek tipi konusunda hangisi doğrudur?',
      en: 'When carbon monoxide exposure is suspected, which statement about the sample type for laboratory CO-oximetry COHb is correct?',
      es: 'Ante sospecha de exposición a monóxido de carbono, ¿qué afirmación sobre el tipo de muestra para la COHb por CO-oximetría de laboratorio es correcta?'
    },
    o: [
      {tr: 'Yalnızca arteriyel örnek kabul edilir; venöz örnek geçersizdir', en: 'Only an arterial sample is acceptable; venous samples are invalid', es: 'Solo se acepta muestra arterial; la venosa no es válida'},
      {tr: 'Örnek buzda taşınmazsa COHb hızla düşer', en: 'COHb falls rapidly unless the sample is transported on ice', es: 'La COHb disminuye rápidamente si la muestra no se transporta en hielo'},
      {tr: 'Arteriyel ve venöz örnekler klinik amaçla eşdeğer kabul edilebilir', en: 'Arterial and venous samples can be considered equivalent clinically', es: 'Las muestras arterial y venosa pueden considerarse clínicamente equivalentes'},
      {tr: 'Standart nabız oksimetresi SpO₂ değeri kan örneği almayı gereksiz kılar', en: 'A standard pulse oximetry SpO₂ value makes blood sampling unnecessary', es: 'El valor de SpO₂ de la pulsioximetría convencional hace innecesaria la muestra'}
    ],
    a: 2,
    ex: {
      tr: 'COHb için arteriyel ve venöz örnekler klinik amaçla eşdeğerdir; COHb oldukça stabildir ve taşınan örnekte doğru ölçülebilir. Konvansiyonel nabız oksimetresi COHb’yi ölçemez.',
      en: 'For COHb, arterial and venous samples are clinically equivalent; COHb is quite stable and can be measured accurately on a transported sample. Conventional pulse oximetry cannot measure COHb.',
      es: 'Para la COHb, las muestras arterial y venosa son clínicamente equivalentes; la COHb es bastante estable y puede medirse con exactitud en una muestra transportada. La pulsioximetría convencional no mide la COHb.'
    },
    src: 'placement'
  },
  'act': {
    q: {
      tr: 'Hipotermik ve hemodilüsyonlu KPB sırasında ACT uzamışsa, bu sonuç heparin düzeyi açısından nasıl yorumlanmalıdır?',
      en: 'During hypothermic, haemodiluted CPB the ACT is prolonged. How should this be interpreted regarding heparin level?',
      es: 'Durante una CEC hipotérmica con hemodilución, el ACT está prolongado. ¿Cómo debe interpretarse respecto al nivel de heparina?'
    },
    o: [
      {tr: 'ACT heparin artmadan da uzayabilir; heparin düzeyi abartılabilir', en: 'ACT can lengthen without more heparin; heparin level may be overestimated', es: 'El ACT puede prolongarse sin más heparina; esta puede sobrestimarse'},
      {tr: 'ACT uzaması her zaman plazma anti-Xa aktivitesindeki orantılı artışı gösterir', en: 'ACT prolongation always reflects a proportional rise in plasma anti-Xa activity', es: 'La prolongación del ACT siempre refleja un aumento proporcional de la actividad anti-Xa'},
      {tr: 'Hipotermi ACT’yi kısaltır; bu nedenle her uzama yalnızca heparine bağlıdır', en: 'Hypothermia shortens the ACT, so any prolongation is due to heparin alone', es: 'La hipotermia acorta el ACT, por lo que toda prolongación se debe solo a la heparina'},
      {tr: 'ACT ve aPTT birbirinin yerine kullanılabildiği için aPTT ile doğrulanır', en: 'ACT and aPTT are interchangeable, so it is confirmed with aPTT', es: 'El ACT y el TTPa son intercambiables, por lo que se confirma con TTPa'}
    ],
    a: 0,
    ex: {
      tr: 'Hipotermi, hemoglobin düşüklüğü, hipofibrinojenemi ve bazı ilaçlar heparin konsantrasyonu artmadan ACT’yi yalancı olarak uzatabilir; çalışmalarda anti-Xa aktivitesi sabit kalırken ACT uzamıştır.',
      en: 'Hypothermia, low haemoglobin, hypofibrinogenaemia and some drugs can falsely prolong the ACT without a rise in heparin concentration; in studies ACT lengthened while anti-Xa activity stayed constant.',
      es: 'La hipotermia, la hemoglobina baja, la hipofibrinogenemia y algunos fármacos pueden prolongar falsamente el ACT sin aumento de la concentración de heparina; en estudios el ACT se prolongó mientras la actividad anti-Xa se mantuvo constante.'
    },
    src: 'eval'
  },
  'hemoglobin-meter': {
    q: {
      tr: 'Hasta başı hemoglobin ölçümü için kapiller örnek alınırken parmak aşırı sıkılırsa olası sonuç nedir?',
      en: 'When a capillary sample is taken for point-of-care haemoglobin and the finger is squeezed excessively, what is the likely result?',
      es: 'Al obtener una muestra capilar para hemoglobina en el punto de atención, si se exprime en exceso el dedo, ¿cuál es el resultado probable?'
    },
    o: [
      {tr: 'Hemokonsantrasyon nedeniyle yalancı yüksek hemoglobin değeri', en: 'Falsely high haemoglobin value due to haemoconcentration', es: 'Valor de hemoglobina falsamente alto por hemoconcentración'},
      {tr: 'Mikroküvet yeterince dolmaz ve cihaz sonuç vermez', en: 'The microcuvette does not fill adequately and no result is given', es: 'La microcubeta no se llena adecuadamente y no se obtiene resultado'},
      {tr: 'Sonuç etkilenmez; çünkü ölçüm izosbestik bir dalga boyunda yapılır', en: 'No effect, because measurement is at an isosbestic wavelength', es: 'Ningún efecto, porque la medición se realiza a una longitud de onda isosbéstica'},
      {tr: 'İnterstisyel sıvıyla dilüsyon nedeniyle yalancı düşük hemoglobin', en: 'Falsely low haemoglobin from dilution with interstitial fluid', es: 'Hemoglobina falsamente baja por dilución con líquido intersticial'}
    ],
    a: 3,
    ex: {
      tr: 'Aşırı sıkma örneğe interstisyel sıvı karıştırarak hemoglobini yalancı düşük gösterir. Ardışık parmak damlaları arasında değişkenlik de yüksektir; tek damla sonucu dikkatle yorumlanır.',
      en: 'Excessive squeezing mixes interstitial fluid into the sample and gives a falsely low haemoglobin. Variability between successive fingerprick drops is also high, so a single-drop result is interpreted with caution.',
      es: 'Exprimir en exceso mezcla líquido intersticial con la muestra y da una hemoglobina falsamente baja. La variabilidad entre gotas sucesivas también es alta, por lo que un resultado de una sola gota se interpreta con cautela.'
    },
    src: 'placement'
  },
  'glucometer': {
    q: {
      tr: 'İkodekstrin içeren periton diyalizi alan bir hastada GDH-PQQ yöntemli glukometre ile ölçüm yapılıyor. Hangi hata beklenir?',
      en: 'A patient on peritoneal dialysis with icodextrin is tested with a GDH-PQQ-based glucose meter. Which error is expected?',
      es: 'Se mide la glucemia de un paciente en diálisis peritoneal con icodextrina mediante un glucómetro basado en GDH-PQQ. ¿Qué error cabe esperar?'
    },
    o: [
      {tr: 'GDH reaksiyonu oksijene bağımlı olduğu için yalancı düşük glukoz', en: 'Falsely low glucose because the GDH reaction depends on oxygen', es: 'Glucosa falsamente baja porque la reacción GDH depende del oxígeno'},
      {tr: 'Maltoz nedeniyle yalancı yüksek glukoz; hipoglisemi atlanabilir', en: 'Falsely high glucose from maltose; hypoglycaemia may be missed', es: 'Glucosa falsamente alta por maltosa; puede no detectarse una hipoglucemia'},
      {tr: 'Cihaz ölçüm birimini kendiliğinden mg/dL’den mmol/L’ye geçirir', en: 'The meter switches units automatically from mg/dL to mmol/L', es: 'El medidor cambia automáticamente la unidad de mg/dL a mmol/L'},
      {tr: 'İkodekstrin GDH-PQQ’yu değil, yalnızca hekzokinaz yöntemini etkiler', en: 'Icodextrin interferes only with the hexokinase method, not GDH-PQQ', es: 'La icodextrina solo interfiere con el método de hexocinasa, no con GDH-PQQ'}
    ],
    a: 1,
    ex: {
      tr: 'GDH-PQQ glukozun yanında maltoz gibi diğer şekerleri de oksitler; ikodekstrin metaboliti maltoz glukozu yalancı yüksek gösterir ve hipoglisemi gözden kaçabilir. Oksijen bağımlılığı GOx yöntemine aittir; GDH çözünmüş oksijenden bağımsızdır.',
      en: 'GDH-PQQ oxidises other sugars such as maltose as well as glucose; maltose, a metabolite of icodextrin, makes glucose read falsely high and hypoglycaemia may be missed. Oxygen dependence applies to GOx; GDH is independent of dissolved oxygen.',
      es: 'La GDH-PQQ oxida además de la glucosa otros azúcares como la maltosa; la maltosa, metabolito de la icodextrina, eleva falsamente la glucosa y puede pasarse por alto una hipoglucemia. La dependencia del oxígeno corresponde a la GOx; la GDH es independiente del oxígeno disuelto.'
    },
    src: 'trouble'
  },
  'lactate-meter': {
    q: {
      tr: 'Aşağıdakilerden hangisi doku hipoperfüzyonu olmadan laktat yükselmesine neden olabilir?',
      en: 'Which of the following can raise lactate in the absence of tissue hypoperfusion?',
      es: '¿Cuál de los siguientes puede elevar el lactato en ausencia de hipoperfusión tisular?'
    },
    o: [
      {tr: 'Venöz örnek alırken turnike kullanılması', en: 'Using a tourniquet during venous sampling', es: 'Usar torniquete durante la extracción venosa'},
      {tr: 'Arteriyel yerine periferik venöz örnek kullanılması', en: 'Using a peripheral venous instead of an arterial sample', es: 'Usar una muestra venosa periférica en lugar de arterial'},
      {tr: 'β2-adrenerjik uyarı (ör. β2-agonistler, epinefrin)', en: 'β2-adrenergic stimulation (e.g. β2-agonists, epinephrine)', es: 'Estimulación β2-adrenérgica (p. ej., agonistas β2, epinefrina)'},
      {tr: 'Örneğin analizden önce oda sıcaklığında 10 dakika bekletilmesi', en: 'Leaving the sample at room temperature for 10 minutes before analysis', es: 'Dejar la muestra a temperatura ambiente 10 minutos antes del análisis'}
    ],
    a: 2,
    ex: {
      tr: 'β2-adrenerjik uyarı, nöbet, karaciğer disfonksiyonu ve uzamış yüksek doz propofol hipoperfüzyondan bağımsız laktat yükseltebilir (tip B). Kayıtta turnikenin belirgin etkisi olmadığı, venöz laktatın arteriyelle yüksek korelasyon gösterdiği ve 15 dakikalık bekletmenin anlamlı değişiklik yapmadığı belirtilir.',
      en: 'β2-adrenergic stimulation, seizures, liver dysfunction and prolonged high-dose propofol can raise lactate independently of hypoperfusion (type B). The record states that tourniquet use had no appreciable effect, venous lactate correlates highly with arterial, and 15 minutes of standing caused no significant change.',
      es: 'La estimulación β2-adrenérgica, las convulsiones, la disfunción hepática y el propofol a dosis altas prolongado pueden elevar el lactato sin hipoperfusión (tipo B). El registro indica que el torniquete no tuvo efecto apreciable, el lactato venoso se correlaciona estrechamente con el arterial y 15 minutos de espera no produjeron cambios significativos.'
    },
    src: 'eval'
  },
  'rotem': {
    q: {
      tr: 'ROTEM’de FIBTEM testi neyi değerlendirir?',
      en: 'What does the FIBTEM assay assess in ROTEM?',
      es: '¿Qué evalúa el ensayo FIBTEM en ROTEM?'
    },
    o: [
      {tr: 'Heparin inaktive edildikten sonra intrensek pıhtılaşma yolunu', en: 'The intrinsic coagulation pathway after heparin inactivation', es: 'La vía intrínseca de la coagulación tras inactivar la heparina'},
      {tr: 'Aprotininle fibrinoliz bloke edildikten sonra oluşan pıhtıyı', en: 'The clot formed after fibrinolysis is blocked with aprotinin', es: 'El coágulo formado tras bloquear la fibrinólisis con aprotinina'},
      {tr: 'Trombosit katkısı dahil ekstrensek pıhtılaşma yolunu', en: 'The extrinsic pathway including the platelet contribution', es: 'La vía extrínseca de la coagulación incluida la contribución plaquetaria'},
      {tr: 'Trombosit katkısı bloke edilmiş pıhtı sağlamlığını (fibrin katkısı)', en: 'Clot firmness with the platelet contribution blocked (fibrin part)', es: 'La firmeza del coágulo con la contribución plaquetaria bloqueada (fibrina)'}
    ],
    a: 3,
    ex: {
      tr: 'FIBTEM trombosit katkısını bloke ederek pıhtı sağlamlığına fibrin katkısını gösterir; bu nedenle FIBTEM A20/MCF trombosit aktivitesi olmadan pıhtı sağlamlığını yansıtır. Diğer seçenekler HEPTEM, APTEM ve EXTEM’i tanımlar.',
      en: 'FIBTEM blocks the platelet contribution and shows the fibrin contribution to clot firmness, so FIBTEM A20/MCF reflects clot firmness without platelet activity. The other options describe HEPTEM, APTEM and EXTEM.',
      es: 'FIBTEM bloquea la contribución plaquetaria y muestra la contribución de la fibrina a la firmeza del coágulo, por lo que su A20/MCF refleja la firmeza sin actividad plaquetaria. Las demás opciones describen HEPTEM, APTEM y EXTEM.'
    },
    src: 'principle'
  },
  'teg': {
    q: {
      tr: 'TEG 6s ile heparin alan bir hastada heparin etkisi nasıl belirlenir?',
      en: 'With the TEG 6s, how is a heparin effect identified in a patient receiving heparin?',
      es: 'Con el TEG 6s, ¿cómo se identifica el efecto de la heparina en un paciente que la recibe?'
    },
    o: [
      {tr: 'CK-R, heparinazlı CKH-R ile karşılaştırılarak', en: 'By comparing CK-R with the heparinase CKH-R', es: 'Comparando el CK-R con el CKH-R con heparinasa'},
      {tr: 'CFF-MA, CK-MA ile karşılaştırılarak', en: 'By comparing CFF-MA with CK-MA', es: 'Comparando el CFF-MA con el CK-MA'},
      {tr: 'Yalnızca LY30 değerine bakılarak', en: 'By looking at the LY30 value alone', es: 'Observando únicamente el valor de LY30'},
      {tr: 'ROTEM HEPTEM eşikleri TEG R değerine uygulanarak', en: 'By applying ROTEM HEPTEM thresholds to the TEG R value', es: 'Aplicando los umbrales de HEPTEM de ROTEM al valor R del TEG'}
    ],
    a: 0,
    ex: {
      tr: 'Çok düşük heparin konsantrasyonları bile R’yi belirgin uzatabilir; CKH testi heparini heparinazla nötralize eder ve heparin etkisi CK-R ile CKH-R karşılaştırılarak belirlenir. TEG ve ROTEM değerleri birbirine aktarılamaz.',
      en: 'Even very low heparin concentrations can noticeably prolong R; the CKH assay neutralises heparin with heparinase, and the heparin effect is determined by comparing CK-R with CKH-R. TEG and ROTEM values are not transferable.',
      es: 'Incluso concentraciones muy bajas de heparina pueden prolongar claramente el R; el ensayo CKH neutraliza la heparina con heparinasa y el efecto se determina comparando CK-R con CKH-R. Los valores de TEG y ROTEM no son transferibles.'
    },
    src: 'eval'
  },
  'clotpro': {
    q: {
      tr: 'Direkt trombin inhibitörü etkisi şüphesinde ClotPro’da hangi test bu etkiye duyarlıdır?',
      en: 'When a direct thrombin inhibitor effect is suspected, which ClotPro test is sensitive to it?',
      es: 'Ante sospecha de efecto de un inhibidor directo de la trombina, ¿qué prueba de ClotPro es sensible a él?'
    },
    o: [
      {tr: 'RVV-test', en: 'RVV-test', es: 'RVV-test'},
      {tr: 'ECA-test', en: 'ECA-test', es: 'ECA-test'},
      {tr: 'TPA-test', en: 'TPA-test', es: 'TPA-test'},
      {tr: 'AP-test', en: 'AP-test', es: 'AP-test'}
    ],
    a: 1,
    ex: {
      tr: 'ECA-test direkt trombin inhibitörlerine, RVV-test ise FXa inhibitörleri dahil DOAC’lara duyarlıdır. TPA-test r-tPA ile fibrinoliz tetikleyerek antifibrinolitik etkiyi, AP-test aprotininle fibrinolizi inhibe eder.',
      en: 'The ECA-test is sensitive to direct thrombin inhibitors, whereas the RVV-test is sensitive to DOACs including FXa inhibitors. The TPA-test triggers fibrinolysis with r-tPA to detect antifibrinolytic effect; the AP-test inhibits fibrinolysis with aprotinin.',
      es: 'La ECA-test es sensible a los inhibidores directos de la trombina, mientras que la RVV-test lo es a los ACOD, incluidos los inhibidores del FXa. La TPA-test desencadena fibrinólisis con r-tPA para detectar efecto antifibrinolítico; la AP-test inhibe la fibrinólisis con aprotinina.'
    },
    src: 'principle'
  },
  'quantra': {
    q: {
      tr: 'Quantra pıhtı sertliğini (clot stiffness) hangi yöntemle ölçer?',
      en: 'By what method does the Quantra measure clot stiffness?',
      es: '¿Con qué método mide Quantra la rigidez del coágulo?'
    },
    o: [
      {tr: 'Dönen küvetin sabit pine ilettiği kuvvet kaydedilir', en: 'The force transmitted from a rotating cup to a fixed pin is recorded', es: 'Se registra la fuerza transmitida por una cubeta giratoria a un pin fijo'},
      {tr: 'Salınan pinin hareketi optik olarak algılanır', en: 'The motion of an oscillating pin is detected optically', es: 'Se detecta ópticamente el movimiento de un pin oscilante'},
      {tr: 'Ultrason darbelerinin ekolarıyla kayma modülü (hPa) ölçülür', en: 'Ultrasound pulse echoes are used to measure shear modulus (hPa)', es: 'Los ecos de pulsos de ultrasonido miden el módulo de cizallamiento (hPa)'},
      {tr: 'Mikropartikül agregasyonuyla artan ışık geçirgenliği ölçülür', en: 'Light transmittance rising with microparticle aggregation is measured', es: 'Se mide la transmitancia de luz que aumenta con la agregación de micropartículas'}
    ],
    a: 2,
    ex: {
      tr: 'Quantra SEER sonoreometrisi ile örneğe ultrason darbeleri uygular ve dönen ekolardan kayma modülünü ölçer; pıhtı sertliği hPa olarak raporlanır. Diğer seçenekler TEG 5000, ROTEM ve VerifyNow ilkelerini tanımlar; eşikler aktarılamaz.',
      en: 'Quantra uses SEER sonorheometry: ultrasound pulses are applied and the returning echoes give the shear modulus, reported as clot stiffness in hPa. The other options describe TEG 5000, ROTEM and VerifyNow; thresholds are not transferable.',
      es: 'Quantra utiliza sonorreometría SEER: aplica pulsos de ultrasonido y los ecos de retorno dan el módulo de cizallamiento, informado como rigidez del coágulo en hPa. Las demás opciones describen TEG 5000, ROTEM y VerifyNow; los umbrales no son transferibles.'
    },
    src: 'principle'
  },
  'platelet-function': {
    q: {
      tr: 'Kanayan bir hastada trombosit fonksiyon testi (ör. PRU veya ARU) normal çıktı. Bu sonuç nasıl yorumlanmalıdır?',
      en: 'In a bleeding patient a platelet function test (e.g. PRU or ARU) is normal. How should this result be interpreted?',
      es: 'En un paciente con sangrado, una prueba de función plaquetaria (p. ej., PRU o ARU) es normal. ¿Cómo debe interpretarse?'
    },
    o: [
      {tr: 'Trombosit sayısının ve fibrinojen düzeyinin de normal olduğunu kanıtlar', en: 'It proves that platelet count and fibrinogen level are also normal', es: 'Demuestra que el recuento de plaquetas y el fibrinógeno también son normales'},
      {tr: 'VerifyNow ve Multiplate değerleri doğrudan birbirine dönüştürülebilir', en: 'VerifyNow and Multiplate values can be converted directly into each other', es: 'Los valores de VerifyNow y Multiplate pueden convertirse directamente entre sí'},
      {tr: 'Kanamanın cerrahi dışı tüm nedenlerini kesin olarak dışlar', en: 'It reliably excludes all non-surgical causes of bleeding', es: 'Excluye de forma fiable todas las causas no quirúrgicas del sangrado'},
      {tr: 'Yalnızca agoniste özgü agregasyonu yansıtır; diğer nedenleri dışlamaz', en: 'It shows only agonist-specific aggregation; other causes are not excluded', es: 'Refleja solo la agregación específica del agonista; no excluye otras causas'}
    ],
    a: 3,
    ex: {
      tr: 'Testler yalnızca agoniste özgü trombosit agregasyonunu yansıtır ve diğer kan bileşenlerinin katkısını hesaba katmaz. Fonksiyon sonucu trombosit sayısı değildir; VerifyNow ve Multiplate değerleri de birbirinin yerine kullanılamaz.',
      en: 'The tests reflect only agonist-specific platelet aggregation and do not account for other blood components. A function result is not a platelet count, and VerifyNow and Multiplate values are not interchangeable.',
      es: 'Las pruebas reflejan solo la agregación plaquetaria específica del agonista y no consideran otros componentes de la sangre. Un resultado de función no es un recuento plaquetario, y los valores de VerifyNow y Multiplate no son intercambiables.'
    },
    src: 'trouble'
  },
  'pupillometer': {
    q: {
      tr: 'Üreticinin NPi ölçeğine göre hangi bulgu anormal kabul edilir?',
      en: 'On the manufacturer’s NPi scale, which finding is considered abnormal?',
      es: 'En la escala NPi del fabricante, ¿qué hallazgo se considera anormal?'
    },
    o: [
      {tr: 'NPi <3,0 veya sağ–sol farkı ≥0,7', en: 'NPi <3.0 or a right–left difference ≥0.7', es: 'NPi <3,0 o diferencia derecha–izquierda ≥0,7'},
      {tr: 'NPi >4,0 veya sağ–sol farkı ≥0,1', en: 'NPi >4.0 or a right–left difference ≥0.1', es: 'NPi >4,0 o diferencia derecha–izquierda ≥0,1'},
      {tr: 'Pupiller ağrı indeksinin (PPI) 1–9 aralığında olması', en: 'A pupillary pain index (PPI) within the 1–9 range', es: 'Un índice de dolor pupilar (PPI) dentro del rango 1–9'},
      {tr: 'Sonucun "Rescan" olarak gösterilmesi', en: 'A result displayed as "Rescan"', es: 'Un resultado mostrado como "Rescan"'}
    ],
    a: 0,
    ex: {
      tr: 'Üreticinin ölçeğinde NPi <3,0 anormal kabul edilir; sağ ve sol pupil arasında ≥0,7 NPi farkı da anormal sayılabilir. "Rescan" geçersiz ölçümü gösterir ve tekrar gerektirir; PPI ise ayrı bir nosisepsiyon skorudur.',
      en: 'On the manufacturer’s scale an NPi <3.0 is considered abnormal, and an NPi difference ≥0.7 between right and left pupils may also be abnormal. "Rescan" marks an invalid measurement to repeat; the PPI is a separate nociception score.',
      es: 'En la escala del fabricante, un NPi <3,0 se considera anormal, y una diferencia de NPi ≥0,7 entre pupilas derecha e izquierda también puede serlo. "Rescan" indica una medición no válida que debe repetirse; el PPI es una puntuación de nocicepción distinta.'
    },
    src: 'eval'
  },
  'tcd': {
    q: {
      tr: 'TCD incelemesinde insonasyon açısının 30°’nin altında tutulmasının amacı nedir?',
      en: 'In a TCD examination, why is the angle of insonation kept below 30°?',
      es: 'En un estudio de DTC, ¿por qué se mantiene el ángulo de insonación por debajo de 30°?'
    },
    o: [
      {tr: 'Ultrasonun temporal kemiği daha iyi geçmesini sağlamak için', en: 'To help the ultrasound penetrate the temporal bone better', es: 'Para que el ultrasonido atraviese mejor el hueso temporal'},
      {tr: 'Hız değerini doğrudan kan akımına (mL/dk) çevirebilmek için', en: 'To convert velocity directly into blood flow (mL/min)', es: 'Para convertir la velocidad directamente en flujo sanguíneo (mL/min)'},
      {tr: 'Hız ölçüm hatasını %15’in altında tutmak için', en: 'To keep the velocity measurement error below 15%', es: 'Para mantener el error de medición de la velocidad por debajo del 15%'},
      {tr: 'Orbitanın ultrason maruziyetini sınırlamak için', en: 'To limit ultrasound exposure of the orbit', es: 'Para limitar la exposición de la órbita al ultrasonido'}
    ],
    a: 2,
    ex: {
      tr: 'Hız hesabı insonasyon açısının kosinüsüne bağlıdır; açı 30°’nin altında tutulursa hata %15’in altında kalır. Kemiği geçmek için 2 MHz prob kullanılır; TCD akımı değil akım hızını ölçer.',
      en: 'The velocity calculation depends on the cosine of the insonation angle; keeping it below 30° keeps the error below 15%. Skull penetration relies on a 2 MHz probe, and TCD measures flow velocity, not flow itself.',
      es: 'El cálculo de la velocidad depende del coseno del ángulo de insonación; mantenerlo por debajo de 30° mantiene el error por debajo del 15%. La penetración del cráneo depende de una sonda de 2 MHz, y el DTC mide velocidad de flujo, no el flujo.'
    },
    src: 'placement'
  },
  'eeg': {
    q: {
      tr: 'Ketamin veya nitröz oksit altında işlenmiş EEG indeks değeri yükseliyor. Kayda göre en doğru yorum hangisidir?',
      en: 'Under ketamine or nitrous oxide the processed EEG index value rises. Which interpretation is best supported by the record?',
      es: 'Con ketamina u óxido nitroso, el valor del índice de EEG procesado aumenta. ¿Qué interpretación respalda mejor el registro?'
    },
    o: [
      {tr: 'İndeks ilaçtan bağımsız olduğu için hastanın uyandığını kesin olarak gösterir', en: 'It definitely indicates awakening, because the index is independent of drugs', es: 'Indica con certeza el despertar, ya que el índice es independiente del fármaco'},
      {tr: 'Hızlı osilasyonlar indeksi yükseltebilir; indeks tek başına bilinci ölçmez', en: 'Fast oscillations can raise it; the index alone does not measure consciousness', es: 'Las oscilaciones rápidas pueden elevarlo; el índice solo no mide la consciencia'},
      {tr: 'Derin anesteziye bağlı burst supresyon paterninin ortaya çıktığını yansıtır', en: 'It reflects the emergence of burst suppression from deep anaesthesia', es: 'Refleja la aparición de brote-supresión por anestesia profunda'},
      {tr: 'Belirgin yavaş (delta) osilasyonların baskın ritim haline geldiğini gösterir', en: 'It shows that profound slow (delta) oscillations have become the dominant rhythm', es: 'Muestra que las oscilaciones lentas (delta) profundas pasan a ser el ritmo dominante'}
    ],
    a: 1,
    ex: {
      tr: 'Anestezikler farklı EEG imzaları oluşturur: ketamin ve nitröz oksit hızlı osilasyonlarla indeksi yükseltebilir, deksmedetomidin ise belirgin yavaş osilasyonlar yapabilir. Aynı indeks değeri her ilaçta aynı bilinçsizlik düzeyini göstermez.',
      en: 'Anaesthetics produce different EEG signatures: ketamine and nitrous oxide can raise index values through fast oscillations, whereas dexmedetomidine can produce profound slow oscillations. The same index value does not indicate the same level of unconsciousness for every drug.',
      es: 'Los anestésicos producen firmas de EEG distintas: la ketamina y el óxido nitroso pueden elevar el índice mediante oscilaciones rápidas, mientras que la dexmedetomidina puede producir oscilaciones lentas profundas. El mismo valor de índice no indica el mismo nivel de inconsciencia con cada fármaco.'
    },
    src: 'eval'
  },
  'ssep': {
    q: {
      tr: 'İntraoperatif SSEP izleminde hangi anestezik etken kortikal SSEP bileşenlerini belirgin biçimde baskılar?',
      en: 'During intraoperative SSEP monitoring, which anaesthetic factor markedly attenuates the cortical SSEP components?',
      es: 'Durante la monitorización intraoperatoria de PESS, ¿qué factor anestésico atenúa de forma marcada los componentes corticales?'
    },
    o: [
      {tr: 'Kayıt sırasında nöromüsküler bloker uygulanması', en: 'Giving a neuromuscular blocking agent during the recording', es: 'Administrar un bloqueante neuromuscular durante el registro'},
      {tr: 'Propofol bazlı total intravenöz anestezi', en: 'Total intravenous anaesthesia based on propofol', es: 'Anestesia total intravenosa basada en propofol'},
      {tr: 'Montaja üst ekstremite kontrol kayıtlarının eklenmesi', en: 'Adding upper-limb control recordings to the montage', es: 'Añadir registros de control de la extremidad superior al montaje'},
      {tr: 'Nitröz oksit ve halojenli inhalasyon ajanları', en: 'Nitrous oxide and halogenated inhalational agents', es: 'Óxido nitroso y agentes inhalatorios halogenados'}
    ],
    a: 3,
    ex: {
      tr: 'Nitröz oksit ve halojenli ajanlar kortikal SSEP bileşenlerini baskılar; bu etki alt ekstremite SSEP’lerinde ve küçük çocuklarda belirgindir. Propofol kortikal SSEP’leri daha az baskılar; nöromüsküler blokerler EMG artefaktını azaltarak SSEP izlemini kolaylaştırır.',
      en: 'Nitrous oxide and halogenated agents attenuate cortical SSEP components, prominently for lower-limb SSEPs and in young children. Propofol attenuates cortical SSEPs less; neuromuscular blockers ease SSEP monitoring by suppressing EMG artefact.',
      es: 'El óxido nitroso y los agentes halogenados atenúan los componentes corticales de los PESS, sobre todo en extremidades inferiores y en niños pequeños. El propofol los atenúa menos; los bloqueantes neuromusculares facilitan la monitorización al suprimir el artefacto EMG.'
    },
    src: 'trouble'
  },
  'mep': {
    q: {
      tr: 'ASNM görüş bildirisine göre kas MEP izleminde hangi bulgu her zaman majör uyarı kriteridir?',
      en: 'According to the ASNM position statement, which finding is always a major warning criterion in muscle MEP monitoring?',
      es: 'Según la declaración de posición de la ASNM, ¿qué hallazgo es siempre un criterio de alerta mayor en la monitorización de PEM musculares?'
    },
    o: [
      {tr: 'Yanıtın kaybolması', en: 'Disappearance of the response', es: 'Desaparición de la respuesta'},
      {tr: 'Latansta %10 uzama', en: 'A 10% prolongation in latency', es: 'Una prolongación del 10% de la latencia'},
      {tr: 'Tüm cerrahilerde sabit %30 genlik azalması', en: 'A fixed 30% amplitude reduction in all surgeries', es: 'Una reducción fija del 30% de la amplitud en toda cirugía'},
      {tr: 'Ardışık iki kayıt arasında herhangi bir morfoloji farkı', en: 'Any morphology difference between two consecutive trials', es: 'Cualquier diferencia de morfología entre dos registros consecutivos'}
    ],
    a: 0,
    ex: {
      tr: 'Uyarı kriterleri cerrahi türüne göre belirlenir, ancak yanıtın kaybolması her zaman majör kriterdir. Kas yanıtı değişken olduğundan değişiklik bazale göre değerlendirilir ve en az üç kayıtla doğrulanır; spinal cerrahide tek bir genlik eşiği uygun olmayabilir.',
      en: 'Warning criteria are tailored to the type of surgery, but disappearance of the response is always a major criterion. Because the muscle response is variable, change is judged against baseline and confirmed by at least three recordings; a single amplitude threshold may not suit spinal surgery.',
      es: 'Los criterios de alerta se adaptan al tipo de cirugía, pero la desaparición de la respuesta es siempre un criterio mayor. Como la respuesta muscular es variable, el cambio se juzga frente a la basal y se confirma con al menos tres registros; un umbral único de amplitud puede no ser adecuado en cirugía de columna.'
    },
    src: 'eval'
  },
  'intraop-emg': {
    q: {
      tr: 'Serbest akışlı (spontan) EMG’nin önemli bir sınırlılığı aşağıdakilerden hangisidir?',
      en: 'Which of the following is an important limitation of free-running (spontaneous) EMG?',
      es: '¿Cuál de las siguientes es una limitación importante de la EMG espontánea (de libre curso)?'
    },
    o: [
      {tr: 'Künt sinir kökü irritasyonuna veya hasarına duyarsızdır', en: 'It is insensitive to blunt nerve root irritation or injury', es: 'Es insensible a la irritación o lesión roma de la raíz nerviosa'},
      {tr: 'Aktivasyonunun yeni nörolojik defisit için özgüllüğü çok yüksektir', en: 'Its activation has very high specificity for a new neurological deficit', es: 'Su activación tiene una especificidad muy alta para un nuevo déficit neurológico'},
      {tr: 'Keskin kök kesisi belirgin EMG aktivitesi oluşturmayabilir', en: 'A sharp root transection may produce no evident EMG activity', es: 'Una sección nítida de la raíz puede no producir actividad EMG evidente'},
      {tr: 'TOF izlemi sinir bütünlüğünü göstererek EMG’nin yerini alır', en: 'TOF monitoring shows nerve integrity and replaces EMG', es: 'La monitorización TOF muestra la integridad nerviosa y sustituye a la EMG'}
    ],
    a: 2,
    ex: {
      tr: 'Serbest akışlı EMG künt irritasyona duyarlıdır, ancak keskin kök kesisinde yanıltıcı olabilir (yalancı negatif). Aktivasyonun özgüllüğü düşüktür (bir seride %23,7); TOF sinir bütünlüğünü değil blok düzeyini gösterir.',
      en: 'Free-running EMG is sensitive to blunt irritation but may mislead with a sharp root transection (false negative). Activation has low specificity (23.7% in one series), and TOF shows the level of block, not nerve integrity.',
      es: 'La EMG espontánea es sensible a la irritación roma, pero puede inducir a error ante una sección limpia de la raíz (falso negativo). La activación tiene baja especificidad (23,7% en una serie) y el TOF muestra el nivel de bloqueo, no la integridad nerviosa.'
    },
    src: 'eval'
  },
});
