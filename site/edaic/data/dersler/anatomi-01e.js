VERI.sorular = VERI.sorular || {};
VERI.sorular['an01e-1'] = {
  no: 1, kok: 'Mediasten, yüzey izdüşümü ve hilus', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 56–63]]',
  onermeler: [
    { t: 'Nötr solunumda alt kenar midaksiller hatta altıncı kaburgayı keser.', d: false, n: 'Yanlış. Altıncı kaburga midklaviküler hattın, sekizinci kaburga midaksiller hattın işaretidir. [[K5 s. 61]]' },
    { t: 'Sol kökün üst komşusu aort arkıdır.', d: true, n: 'Doğru. Aort arkı sol kökün üzerinden geçer. [[K5 s. 62]]' },
    { t: 'Sağ üst lob bronşu hilusta pulmoner damarların önündedir.', d: false, n: 'Yanlış. Sağ üst lob bronşu bu damarların üstünde ve arkasındadır. [[K5 s. 62]]' },
    { t: 'Sol kardiyak çentik beşinci ve altıncı kostal kıkırdakların arkasındadır.', d: true, n: 'Doğru. Sol ön kenardaki kardiyak çentik bu iki kıkırdağın arkasından geçer. [[K5 s. 61]]' },
    { t: 'Ön mediasten perikardın içindedir.', d: false, n: 'Yanlış. Ön mediasten sternum ile perikard arasındadır. [[K5 s. 57]]' },
  ],
};
VERI.sorular['an01e-2'] = {
  no: 2, kok: 'Segmental anatomi ve bronkoskopi', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 63–67]]',
  onermeler: [
    { t: 'Sağ alt lobun apikal bronşu doğrudan arkaya yönelir.', d: true, n: 'Doğru. Bu yönelim yatakta yatan hastada yabancı cisim ve sekresyon birikimini açıklar. [[K5 s. 63]]' },
    { t: 'Lingulanın segment bronşları medial ve lateral olarak ayrılır.', d: false, n: 'Yanlış. Lingulada dallar üst ve alt konumdadır. [[K5 s. 66]]' },
    { t: 'Sol üst lobda apikal ve posterior bronşlar genellikle ortak kökten çıkar.', d: true, n: 'Doğru. Anterior dal genellikle ayrı çıkar, diğer ikisi apikoposterior gövdeyi paylaşır. [[K5 s. 65]]' },
    { t: 'Sağ üst lob bronşunun ağzında tipik olarak üç benzer açıklık görülür.', d: true, n: 'Doğru. Apikal, anterior ve posterior açıklıklar üç boynuzlu görünümü verir. [[K5 s. 67]]' },
    { t: 'Sağ posterior bazal bronş bazal dalların en küçüğüdür.', d: false, n: 'Yanlış. En büyük bazal dal, alt lob bronşunun doğrultusunu sürdüren posterior daldır. [[K5 s. 64]]' },
  ],
};
VERI.sorular['an01e-3'] = {
  no: 3, kok: 'Dolaşım, lenf ve innervasyon', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 69–71]]',
  onermeler: [
    { t: 'Pulmoner ven kolları komşu segmentlerin arasından geçer.', d: true, n: 'Doğru. Bu yerleşim segment rezeksiyonunda sınırı bulmaya yardım eder. [[K5 s. 70]]' },
    { t: 'Sağ orta lobun kanı sağ üst pulmoner vene dökülür.', d: true, n: 'Doğru. Üst ve orta lob aynı üst venle sol atriyuma drene olur. [[K5 s. 70]]' },
    { t: 'Derin lenf pleksusu alveoler kanalların ötesine uzanır.', d: false, n: 'Yanlış. Derin pleksus bronşları drene eder ve alveoler kanalların distalindeki hava boşluklarına ulaşmaz. [[K5 s. 71]]' },
    { t: 'Bronş kasına gelen vagal lifler bronkokonstriksiyon yapar.', d: true, n: 'Doğru. Vagus bronş kasını kasar ve parasempatik sekretomotor liflerle bezlerin salgısını uyarır. [[K5 s. 71]]' },
    { t: 'Bronş duvarındaki ödem düşük basınçlı venleri arterlerden önce sıkıştırır.', d: true, n: 'Doğru. Venöz çıkışın engellenmesi mukoza şişliğini ve obstrüksiyonu artırır. [[K5 s. 71]]' },
  ],
};

SAYFALAR['dersler/anatomi/01e'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 1 · Ders 01e', baslik: 'Mediasten ve akciğerler',
  lede: 'Bronkoskopla karinaya geldiğinizde sağ ve sol ana bronşu nasıl ayırırsınız? Akciğeri önce göğüs duvarında konumlandırın, sonra hilustan segment bronşuna ve alveole doğru izleyin.',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">
    <button type="button" data-scroll="an01e-mediasten"><span>01</span>Mediasten</button>
    <button type="button" data-scroll="an01e-loblar"><span>02</span>Loblar ve fissürler</button>
    <button type="button" data-scroll="an01e-hilus"><span>03</span>Hilus</button>
    <button type="button" data-scroll="an01e-segment"><span>04</span>Segmentler</button>
    <button type="button" data-scroll="an01e-bronkoskopi"><span>05</span>Bronkoskopi</button>
    <button type="button" data-scroll="an01e-duvar"><span>06</span>Duvar ve alveol</button>
    <button type="button" data-scroll="an01e-kan"><span>07</span>Dolaşım</button>
    <button type="button" data-scroll="an01e-lenf"><span>08</span>Lenf ve sinirler</button>
    <button type="button" data-scroll="an01e-gelisim"><span>09</span>Gelişim</button>
    <button type="button" data-scroll="an01e-p1"><span>10</span>Part I</button>
    <button type="button" data-scroll="an01e-p2"><span>11</span>Part II</button>
    <button type="button" data-scroll="an01e-ozet"><span>12</span>Özet</button>
</nav>
<section class="wrap blk ders-sec" id="an01e-mediasten">
  <h2>Mediastenin dört bölümü</h2>
  <p class="intro">İki plevra kesesi arasında kalan mediasteni tarif ederken perikardı sınır olarak kullanırız. [[K5 s. 56–57]]</p>
  <div class="viz"><div class="viz-head"><h3>Perikardın çevresini okuyun</h3></div><div data-viz="an01e_bolmeler"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an01e-satirlar">
    <div><dt>Orta</dt><dd>Perikard ve içindekiler orta mediasteni doldurur. [[K5 s. 57]]</dd></div>
    <div><dt>Ön</dt><dd>Sternumun arka yüzünden perikarda kadar uzanır. [[K5 s. 57]]</dd></div>
    <div><dt>Arka</dt><dd>Üst kısmı perikardın, alt kısmı diyaframın arkasında kalır. [[K5 s. 57]]</dd></div>
    <div><dt>Üst</dt><dd>Perikardın üstünden toraks girişine uzanır. [[K5 s. 57]]</dd></div>
  </dl>
  <details class="an01e-okuma"><summary>Sagittal şemada yönünüzü nasıl bulursunuz?</summary>
    <p>Önce sternumu ve omurgayı iki karşı sınır olarak bulun. [[K5 s. 57]] Kalbi içine alan perikardı işaretlediğinizde orta mediastenin yerini belirlemiş olursunuz. [[K5 s. 57]] Perikarddan sternuma ilerleyen bir çizgi ön mediastene girer. [[K5 s. 57]] Aynı çizgiyi yukarı, toraks girişine doğru izlerseniz üst mediastene geçersiniz. [[K5 s. 57]]</p>
  </details>
  <details class="an01e-okuma"><summary>Arka mediasteni neden iki komşuyla tarif ediyoruz?</summary>
    <p>Şemayı önce perikard hizasında, sonra daha aşağıda okuyun. [[K5 s. 57]] Üst kısımda arka mediastenin ön komşusu perikarddır. [[K5 s. 57]] Daha aşağıda bu komşuluğu diyafram üstlenir. [[K5 s. 57]] Bu dört bölüm, iki plevra kesesi arasındaki yapılara konum tarif etmek için kullanılan yaklaşık sınırlardır. [[K5 s. 56–57]]</p>
  </details>
</section>

<section class="wrap blk ders-sec" id="an01e-loblar">
  <h2>Lobları göğüs duvarına yerleştirin</h2>
  <p class="intro">Her iki akciğerde oblik fissür vardır. [[K5 s. 61]] Sağdaki ek transvers fissür orta lobu üst lobdan ayırır. [[K5 s. 61]]</p>
  <div class="viz"><div class="viz-head"><h3>Lobları karşılaştırın · sağ ve sol akciğer</h3></div><div data-viz="an01e_loblar"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an01e-satirlar">
    <div><dt>Biçim</dt><dd>Plevra boşluğu akciğere kabaca koni biçimini verir. [[K5 s. 57]] Hilus dışında serbest duran akciğerin apeksi, tabanı, kostal ve medial yüzleri ile ön, arka ve alt kenarları vardır. [[K5 s. 57]] Ortalama ağırlık sağda 620 g, solda 570 g’dır. [[K5 s. 57]] Akciğerler erkekte daha büyük ve ağırdır. [[K5 s. 57]]</dd></div>
    <div><dt>Apeks</dt><dd>Boyun kökünde klavikulanın medial üçte birinden 4 cm yukarı çıkar. [[K5 s. 57]] Yüzeyde servikal plevranın çizgisini izler. [[K5 s. 61]] Toraks girişi eğimli olduğundan arkada birinci kaburga boynunu aşmaz. [[K5 s. 58]] Subklavyen arterin oluşturduğu olukta arterle apeks arasına servikal plevra ve Sibson fasyası girer. [[K5 s. 58]] Supraklaviküler pleksus bloğunda, subklavyen ven ponksiyonunda ve boynun delici yaralanmalarında plevra delinebilir. [[K5 s. 57–58]]</dd></div>
    <div><dt>Taban ve kostal yüz</dt><dd>Konkav taban diyafram kubbesine oturur. [[K5 s. 58]] Sağ kubbe daha yüksek olduğundan daha büyük olan sağ akciğer daha basıktır. [[K5 s. 58]] Göğüs kafesinin kostal yüzde bıraktığı oluklar formalinle sertleşmiş örnekte seçilir. [[K5 s. 58–59]]</dd></div>
    <div><dt>Ön kenar</dt><dd>İnce ön kenarlar göğüs duvarı ile perikard arasına girer. [[K5 s. 61]] Sağda kenar mediastinal plevra çizgisini izler. [[K5 s. 61]] Solda beşinci ve altıncı kostal kıkırdakların arkasındaki kardiyak çentik, sağ ventrikülün bir bölümünü yalnız perikard aracılığıyla duvara komşu kılar. [[K5 s. 61]]</dd></div>
    <div><dt>Alt kenar</dt><dd>Akciğerin yüzey izdüşümü pariyetal plevranınkinden daha dardır ve solunumla değişir. [[K5 s. 61]] İnspirasyon ile ekspirasyonun ortasında alt kenarı midklaviküler hatta 6., midaksiller hatta 8., arkada omurganın yanında 10. kaburgada işaretleyin. [[K5 s. 61]] İki uç solunum evresi arasındaki yer değiştirme 5–8 cm olabilir. [[K5 s. 61]]</dd></div>
    <div><dt>Oblik fissür</dt><dd>Sağda arkada beşinci kaburga hizasında omurgadan ayrılır ve yaklaşık bu kaburganın biraz altından öne iner. [[K5 s. 61–62]] Kostokondral birleşme yakınında beşinci aralıkta ya da altıncı kaburgada sonlanır. [[K5 s. 62]] Solda başlangıç üçüncü ile beşinci kaburga arasında değişir, devamı sağa benzer. [[K5 s. 62]] Kol baş üzerine kaldırıldığında skapulanın vertebral kenarı fissürün güvenilir bir yüzey işaretidir. [[K5 s. 62]]</dd></div>
    <div><dt>Transvers fissür</dt><dd>Sağ dördüncü kosta kıkırdağından yatay ilerler ve midaksiller hatta beşinci kaburga ya da beşinci aralıkta oblik fissürle buluşur. [[K5 s. 62]] Çoğu kez eksiktir veya bulunmaz. [[K5 s. 62]]</dd></div>
    <div><dt>Fissür varyasyonları</dt><dd>Oblik fissürün üst kısmındaki kaynaşma alt lobun superior segmentini üst lobla birleştirebilir. [[K5 s. 62]] Segment sınırlarındaki yüzey çöküntüleri bazen ayrı bir fissür derinliğine ulaşır. [[K5 s. 62]] Lingulanın üst sınırındaki çentik derinleşirse solda orta lob görünümü doğar. [[K5 s. 62]] Sağ apekste azigos arkı ve plevral mezenteri medial bir azigos lobülü ayırabilir. [[K5 s. 62]] Görünüm hafif bir oluktan büyük, hemen tümüyle ayrı bir loba kadar değişir. [[K5 s. 62]]</dd></div>
  </dl>
  <details class="an01e-okuma"><summary>Soldaki dil biçimli çıkıntı ayrı bir lob mu?</summary>
    <p>Sol akciğer resminde önce oblik fissürün iki tarafını bulun. [[K5 s. 58]] Ön-alt taraftaki dil biçimli çıkıntıyı yukarı doğru izlediğinizde üst lobla devam ettiğini görürsünüz. [[K5 s. 65–66]]</p>
    <p>Üst kenarında derin bir çentik bulunması, lingulayı ayrı bir orta lob gibi gösterebilir. [[K5 s. 62]] Kararı bronşun kökeniyle kontrol edin: lingular bronş sol üst lob bronşundan, sağ orta lob bronşu ise sağ ana bronşun alt bölümünden çıkar. [[K5 s. 63–66]]</p>
  </details>
  <details class="an01e-okuma"><summary>Yüzey çizimini hasta üzerinde nasıl kurarsınız?</summary>
    <p>Sağ alt kenarı çizerken önce solunumun hangi evresini tarif ettiğinizi söyleyin. [[K5 s. 61]] Nötr konumda klavikula ortasından aşağı indiğinizde bulacağınız altıncı kaburga, aksillada arayacağınız seviyeden iki kaburga yukarıdadır. [[K5 s. 61]]</p>
    <p>Oblik fissürü yerleştirmek için kolu baş üstüne kaldırıp skapulanın omurgaya bakan kenarını izleyin. [[K5 s. 62]] Transvers fissürü ise arkadan başlatmayın: sağ dördüncü kosta kıkırdağından başlayıp oblik fissürle buluştuğu orta aksiller çizgiye doğru ilerleyin. [[K5 s. 62]]</p>
  </details>
</section>

<section class="wrap blk ders-sec" id="an01e-hilus">
  <h2>Medial yüz ve akciğer kökü</h2>
  <p class="intro">Medial yüzün arka bölümü torakal omurgaya, ön bölümü mediastene bakar. [[K5 s. 59]] Hilusun ön-altındaki kardiyak impresyon solda daha derindir. [[K5 s. 59]]</p>
  <div class="viz"><div class="viz-head"><h3>Kökün çevresinde dört yön</h3></div><div data-viz="an01e_hilus"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an01e-satirlar">
    <div><dt>Sağ medial yüz</dt><dd>Kalp izini sağ atriyum ve kısmen sağ ventrikül oluşturur. [[K5 s. 59]] Üst ve alt vena kava, hilusun üzerinden geçen azigos arkı, özofagusun sağ kenarı, trakea, sağ vagus ve frenik sinir bu yüzle komşudur. [[K5 s. 59]] Sağ vagus trakeanın üzerindedir ve sağ akciğerin medial yüzünde brakiyosefalik venin de oluğu seçilir. [[K5 s. 59]]</dd></div>
    <div><dt>Sol medial yüz</dt><dd>Kalp izine sol atriyum apendiksi ve sol ventrikül karşılık gelir. [[K5 s. 59]] Aort arkı ve inen aort, sol subklavyen ve ana karotis arterleri, sol brakiyosefalik ven, trakea, özofagus, sol vagus ve torasik kanal komşudur. [[K5 s. 59]] Medial görünümde frenik sinirin izi de gösterilir. [[K5 s. 60]]</dd></div>
    <div><dt>Derin komşuluklar</dt><dd>Akciğer kaldırıldığında birinci kaburga, torakal sempatik zincir ve büyük splanknik sinire katılan lifler de görülebilir. [[K5 s. 60–61]] Sağ kökte bronş ve pulmoner damarlarla birlikte kesilmiş plevra kenarı seçilir. [[K5 s. 60]]</dd></div>
    <div><dt>Kökün kılıfı</dt><dd>Plevra kılıfı bronşu, pulmoner arteri, iki pulmoner veni, bronşiyal damarları, lenf damarlarını, düğümleri ve otonom sinirleri sarar. [[K5 s. 62]] Kök yapıları ön ve arka pulmoner sinir pleksusları arasındadır. [[K5 s. 62]]</dd></div>
    <div><dt>Kökün iç düzeni</dt><dd>Kalp ve büyük damar kökleri bronşların önünde olduğundan hilusta bronş pulmoner damarların arkasında kalır. [[K5 s. 62]] Bronşiyal damarlar bronşun arka yüzüne yaslanır. [[K5 s. 62]] Pulmoner arter atriyumların üst kenarını izlediği için sol atriyuma açılan venlerin üstündedir. [[K5 s. 62]] Sağda üst lob bronşu damarların hem üstünde hem arkasındadır. [[K5 s. 62]]</dd></div>
    <div><dt>Kökün dış düzeni</dt><dd>Solda önde frenik sinir, arkada inen aort ve vagus, üstte aort arkı, altta pulmoner bağ bulunur. [[K5 s. 62]] Sağda önde superior vena kava ve frenik sinir, arkada vagus, üstte azigos veni, altta pulmoner bağ vardır. [[K5 s. 63]]</dd></div>
  </dl>
  <details class="an01e-okuma"><summary>Bir damar ve bir sinirle tarafı nasıl bulursunuz?</summary>
    <p>Kökün önündeki frenik siniri tek başına görmek tarafı ayırt ettirmez, çünkü aynı komşuluk iki tarafta da vardır. [[K5 s. 62–63]] Sinirin yanında superior vena kavayı ve kökün üzerinde bir ven arkını bulursanız sağ köke bakıyorsunuz. [[K5 s. 63]]</p>
    <p>Üstte aort arkı, arkada ise vagusun yanında inen aort varsa kök soldadır. [[K5 s. 62]] Her iki görünümde de pulmoner bağı arayacağınız yer kökün altıdır. [[K5 s. 62–63]]</p>
  </details>
  <details class="an01e-okuma"><summary>Kök içindeki yapıları hangi ipuçlarıyla sıralarsınız?</summary>
    <p>İki pulmoner veni önce boşaldıkları sol atriyuma kadar düşünün. [[K5 s. 62]] Atriyumların üst kenarından gelen pulmoner arter bu venlerin üzerinde yer alır. [[K5 s. 62]] Bronş kalbin arkasındaki düzlemden geldiğinden kesitte pulmoner damarların arkasındadır. [[K5 s. 62]] Sağda damarların üzerinde de bir bronş kesiti görmeniz bu mantığı bozmaz: üst lob bronşu daha yukarıda olsa da damarların arkasındadır. [[K5 s. 62]]</p>
  </details>
</section>

<section class="wrap blk ders-sec" id="an01e-segment">
  <h2>Segment bronşlarının yol haritası</h2>
  <p class="intro">Bir bronkopulmoner segmentin kendine ait bronşu, pulmoner arter dalı ve komşularından ayrı parankimi vardır. [[K5 s. 63]] Rezeksiyon, postüral drenaj ve radyolojik lokalizasyon bu düzene dayanır. [[K5 s. 63]]</p>
  <div class="viz"><div class="viz-head"><h3>Lob seçerek segmentleri karşılaştırın</h3></div><div data-viz="an01e_segment"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an01e-satirlar">
    <div><dt>Sağ üst lob · 1–3</dt><dd>Ana bronş yaklaşık 2,5 cm sonra üst lob bronşunu dik açıyla verir. [[K5 s. 63]] Yaklaşık 1 cm sonra tek üçlenme veya birbirine yakın iki çatallanma görülür. [[K5 s. 63]] Apikal dal (1) yukarı ve yana, posterior (2) arkaya, yana ve hafif yukarı, anterior (3) öne, hafif yana ve aşağı gider. [[K5 s. 63–64]]</dd></div>
    <div><dt>Sağ orta lob · 4–5</dt><dd>Ana bronş üst lob ayrımından sonra yaklaşık 3 cm daha ilerler. [[K5 s. 63]] Öne ve aşağı ayrılan orta lob bronşu 1–1,5 cm sonra lateral (4) ve medial (5) dallara bölünür. [[K5 s. 63–64]] Pulmoner arter, kesin adı yerleşmemiş bu ara bölümün üzerinden geçer. [[K5 s. 63]] Eski adlandırmada ana bronşun alt bölümüne hiparteriyel, arterin üstündeki sağ üst lob bronşuna eparteriyel bronş denir. [[K5 s. 63]]</dd></div>
    <div><dt>Sağ alt lob · 6</dt><dd>Apikal (superior) segment bronşu orta lob çıkışının karşısından ve hemen altından, bazen aynı düzeyden çıkar. [[K5 s. 63]] En çok 1 cm’lik gövdesi arkaya uzanıp superior, medial ve lateral dalları verir. [[K5 s. 63]] Yatan hastada geriye yönelen bu dalda yabancı cisim veya atılamayan sekresyon sık birikir. [[K5 s. 63]]</dd></div>
    <div><dt>Sağ alt lob · 7–10</dt><dd>Superior dalın yaklaşık 1,5 cm altında ana gövdenin medialinden medial bazal (kardiyak, 7) bronş çıkar. [[K5 s. 64]] Sonraki anterior bazal (8) aşağı, öne ve yana, lateral bazal (9) aşağı ve yana gider. [[K5 s. 64]] En büyük dal olan posterior bazal (10), ana gövdenin doğrultusunda aşağı ve arkaya iner. [[K5 s. 64]]</dd></div>
    <div><dt>Sol üst lob · 1–3</dt><dd>Sol ana bronş üst lob dalını vermeden önce 5 cm ilerler. [[K5 s. 65]] Pulmoner arter bronşun üstünden kavis çizdiği için solda eparteriyel bronş bulunmaz. [[K5 s. 65]] Üst lob bronşu yaklaşık 1 cm laterale gider, sonra üst ve alt (lingular) bölümlere ayrılır. [[K5 s. 65]] Üst bölümde ayrı anterior (3) daldan sonra genellikle apikal ve posterior dalları veren ortak apikoposterior gövde (1–2) çıkar. [[K5 s. 64–65]] Bazen üçü ayrı kökten doğar. [[K5 s. 65]]</dd></div>
    <div><dt>Lingula · 4–5</dt><dd>Lingula sol üst lobun ön-altındaki dil biçimli çıkıntıdır. [[K5 s. 65–66]] Bronşu aşağı, öne ve biraz laterale gidip 1–2 cm sonra üst (4) ve alt (5) dallara ayrılır. [[K5 s. 64–66]] Bu aşağı yönelim, enfeksiyon ve bronşektazide lingulanın sol alt lobla birlikte sık tutulmasını açıklar. [[K5 s. 66]]</dd></div>
    <div><dt>Sol alt lob · 6, 8–10</dt><dd>Apikal, anterior bazal, lateral bazal ve posterior bazal dalların düzeni sağa benzer. [[K5 s. 64–66]] Kitabın tarif ettiği dağılımda ayrı medial bazal dal yoktur. [[K5 s. 66]]</dd></div>
  </dl>
  <details class="an01e-okuma"><summary>‘Dördüncü segment’ iki tarafta aynı yönü mü gösterir?</summary>
    <p>Önce tarafı, sonra lobu söyleyin. [[K5 s. 63–66]] Sağda 4 ve 5 numaraları orta lobun lateral ve medial segmentleridir. [[K5 s. 64]] Solda aynı numaralar üst loba ait lingulanın superior ve inferior segmentlerini gösterir. [[K5 s. 64–66]] Bu nedenle bronşu tarif ederken numaranın yanına yönü eklemek, karşı akciğerdeki eş numaralı dalı işaretleme hatasını önler. [[K5 s. 64–66]]</p>
  </details>
  <details class="an01e-okuma"><summary>Alt lob haritasında iki ayrı ‘apikal’ ifadesini nasıl ayırırsınız?</summary>
    <p>Sağ üst lobun apikal bronşu yukarı ve yana giden 1 numaralı daldır. [[K5 s. 63–64]] Sağ alt lobun apikal bronşu ise 6 numaralı daldır ve orta lob çıkışının hemen altında arkaya döner. [[K5 s. 63–64]]</p>
    <p>Sağ bazal bronşları ararken 6 numaralı dalın çıkışından yaklaşık 1,5 cm daha aşağı inmek, ilk olarak medialdeki kardiyak dalı bulmanızı sağlar. [[K5 s. 64]] Solda aynı karşılaştırmayı yaptığınızda haritada 6’dan sonra 8, 9 ve 10 gelir. [[K5 s. 64–66]]</p>
  </details>
</section>

<section class="wrap blk ders-sec" id="an01e-bronkoskopi">
  <h2>Bronkoskopide yön bulma</h2>
  <p class="intro">Karina kısa, parlak ve keskin kenarlı bir sagittal sırttır. [[K5 s. 66–67]] Daha dik olan sağ ana bronş nedeniyle trakea orta çizgisinin biraz solunda görünür. [[K5 s. 67]]</p>
  <div class="viz"><div class="viz-head"><h3>Trakeadan bifurkasyona bakış</h3></div><div data-viz="an01e_karina"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an01e-satirlar">
    <div><dt>Trakea</dt><dd>Parlak lümende kıkırdak halkalar beyaz, araları kırmızımsıdır. [[K5 s. 66]] Aort arkının geçtiği yerde duvar hafif yassılaşır ve arkın pulsasyonu görülebilir. [[K5 s. 66]]</dd></div>
    <div><dt>Sağa ilerleyiş</dt><dd>Daha geniş ve dik sağ ana bronşa girmek daha kolaydır. [[K5 s. 67]] Önce yan duvarda üst lob ağzını bulun. [[K5 s. 67]] İçindeki apikal, anterior ve posterior dalların benzer genişlikteki açıklıkları üç boynuz görünümü verir. [[K5 s. 67]]</dd></div>
    <div><dt>Orta lobdan bazale</dt><dd>Öndeki orta lob ağzı ile birlikte yatay bir sırt belirir, bu sırtın altından alt lob bronşuna geçilir. [[K5 s. 67]] Önce arkadaki apikal, sonra medialdeki kardiyak ağız görülür. [[K5 s. 67]] Yakın kümelenmiş son üç açıklık yukarıdan aşağıya anterior, lateral ve posterior bazaldir. [[K5 s. 67]]</dd></div>
    <div><dt>Sola ilerleyiş</dt><dd>Trakeaya dönüp sol ana bronşa girildiğinde yan duvardaki üst lob ağzına ulaşmak için daha uzun mesafe geçilir. [[K5 s. 67]] Üst lob ağzı kısa sürede üst bölüm ile lingular bölüme ayrılır. [[K5 s. 67]] Alt lobda önce arkadaki apikal açıklık, daha distalde anterior, lateral ve posterior bazal açıklıklar görülür. [[K5 s. 67]]</dd></div>
  </dl>
  <details class="an01e-okuma"><summary>Üst lob ağzından baktığınızda hangi taraftasınız?</summary>
    <p>Sağda yan duvardaki açıklığın içine baktığınızda birbirine yakın büyüklükte üç ağız görmeyi beklersiniz. [[K5 s. 67]] Solda yan duvardaki üst lob ağzına ulaşana kadar daha uzun bir ana bronş geçersiniz ve karşılaştığınız ilk ayrım üst bölüm ile lingula arasındadır. [[K5 s. 67]]</p>
    <p>Bu iki ipucunu birlikte okuyun: hem karinadan beri izlenen yol hem de lob ağzının içindeki ayrım tarafı tanımaya yardım eder. [[K5 s. 65–67]]</p>
  </details>
  <details class="an01e-okuma"><summary>Arkaya açılan bronşu bulduğunuzda neyi kontrol edersiniz?</summary>
    <p>Önce bronkoskopun alt lob bronşunda olduğunu belirleyin. [[K5 s. 67]] Her iki tarafta da apikal ağız arkadadır, dolayısıyla yalnız yönüne bakarak sağ veya sol kararı verilemez. [[K5 s. 67]] Sağda daha ileride medial kardiyak ağız, ardından yakın kümelenmiş üç bazal açıklık görülür. [[K5 s. 67]] Solda ise apikal dalın ötesinde doğrudan anterior, lateral ve posterior bazal ağızlar görünür. [[K5 s. 67]]</p>
  </details>
</section>

<section class="wrap blk ders-sec" id="an01e-duvar">
  <h2>Bronş duvarından alveole</h2>
  <p class="intro">Bronş duvarını lümenden dışa doğru mukoza, bazal membran, elastik submukoza, düz kas ve kıkırdak içeren fibröz tabaka olarak izleyin. [[K5 s. 67]]</p>
  <div class="viz"><div class="viz-head"><h3>Havanın ulaştığı son altı yapı</h3></div><div data-viz="an01e_hava"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an01e-satirlar">
    <div><dt>İletici epitel</dt><dd>Trakea ve büyük bronşlarda belirgin bazal membran üzerinde bazal hücreler, ortada iğsi hücreler, yüzeyde ise silyalı silindirik hücreler ve mukus salgılayan goblet hücreleri görülür. [[K5 s. 67]] Kronik inflamasyonda, uzun süreli entübasyonda veya trakeostomiden sonra silyasız çok katlı epitele metaplazi gelişebilir. [[K5 s. 67]] İnce bronşlarda epitel silyalı kübik biçim alır, goblet hücreleri seyrekleşir. [[K5 s. 67]]</dd></div>
    <div><dt>Elastik doku</dt><dd>Submukozada longitudinal elastik liflere zengin bir kapiller ağ ve lenfoid doku eşlik eder. [[K5 s. 68]] Elastik geri çekilme akciğeri göğüs duvarından uzaklaştırmaya çalışarak negatif intraplevral basınca katkıda bulunur. [[K5 s. 68]] Yaşla geri çekilme azalır. [[K5 s. 68]] Kitap bunu intraplevral basınç, kompliyans ve fonksiyonel rezidüel kapasitede azalmayla ilişkilendirir. [[K5 s. 68]]</dd></div>
    <div><dt>Kas ağı</dt><dd>Elastik tabakanın derinindeki düz kas lifleri yüzeyin iki noktası arasındaki en kısa yolu izleyen jeodezik bir ağ kurar. [[K5 s. 68]] Bu düzen lif kaymasını sınırlarken tüp içinde basınç üretmeye ve basınca dayanmaya elverişlidir. [[K5 s. 68]] Dallar daraldıkça kasın göreli payı artar ve terminal bronşiyollerde en yüksek düzeye çıkar. [[K5 s. 68]] Kas, alveoler kanaldan atriyuma geçişte sfinkter oluşturur ve daha distalde kaybolur. [[K5 s. 68]]</dd></div>
    <div><dt>Kıkırdak desteği</dt><dd>Akciğer dışındaki ana bronşların halkaları, akciğer içindeki dallarda yerini dış fibröz tabakaya gömülü düzensiz plaklara bırakır. [[K5 s. 68]] Çatallanmayı eyer biçimli kıkırdak destekler. [[K5 s. 68]] Distale doğru küçülüp seyrekleşen kıkırdaklar yaklaşık 0,6 mm çapındaki bronşiyollerde kaybolur. [[K5 s. 68]]</dd></div>
    <div><dt>Bronşiyol ve respiratuvar bronşiyol</dt><dd>Bronşiyolde görece kalın kasla az goblet hücreli silyalı kübik epitel arasında ince elastik lamina vardır. [[K5 s. 68]] Respiratuvar bronşiyol duvarındaki küçük alveoller ve silyasız kübik epitel geçişi tanıtır. [[K5 s. 68–69]]</dd></div>
    <div><dt>Kanal, atriyum, kese</dt><dd>Respiratuvar bronşiyolün distal ucu alveoler kanaldır. [[K5 s. 69]] Her kanal yaklaşık küresel 3–6 atriyuma açılır. [[K5 s. 69]] Atriyumlardan çıkan hava keselerinin duvarlarında ince duvarlı hava hücreleri (alveoller) bulunur. [[K5 s. 69]] Bir bronşiyol ve bütün alt dalları primer akciğer lobülünü oluşturur. [[K5 s. 69]]</dd></div>
    <div><dt>Hava–kan bariyeri</dt><dd>Alveol epiteli çekirdek dışında yalnız 0,2 µm kalınlığa iner ve rutin preparatta çoğu zaman seçilemez. [[K5 s. 67]] Elektron mikroskopisi ve özel boyalar ince bazal membran üzerindeki epitelin kesintisiz olduğunu gösterir. [[K5 s. 67]] Kandan havaya sırayla kapiller duvar, kapiller bazal membran, alveoler bazal membran ve alveoler epitel geçilir. [[K5 s. 67]]</dd></div>
    <div><dt>Sürfaktan</dt><dd>Yassı alveol hücreleri arasındaki iri, vakuollü tip II pnömositler alveollerin kollapsını önleyen yüzey etkin lipoprotein kompleksi salgılar. [[K5 s. 67]] Miktarı fetal olgunlaşmayla artar ve amniyon sıvısındaki lesitin üretime işaret eder. [[K5 s. 68]] İmmatüriteye veya genetik bozukluğa bağlı eksiklik yenidoğanda solunum sıkıntısı sendromuna yol açar. [[K5 s. 68]]</dd></div>
  </dl>
  <aside class="note plain"><b>Atlas notu.</b> Kitap sürfaktanın fetal akciğerde 2–3 haftada bulunabileceğini söyler. [[K5 s. 68]] Doğrusu, tip II pnömositlerin sürfaktan üretimi gebeliğin ikinci trimesterinde başlar.</aside>
  <aside class="note plain"><b>Atlas notu.</b> Kitap yaşlanmayla akciğer kompliyansının ve fonksiyonel rezidüel kapasitenin azaldığını söyler. [[K5 s. 68]] Doğrusu, sağlıklı yaşlanmada elastik geri çekilme azaldıkça akciğer kompliyansı genellikle artar, göğüs duvarı kompliyansı azalır ve fonksiyonel rezidüel kapasite artma eğilimindedir.</aside>
  <details class="an01e-okuma"><summary>Bir hava yolu kesitinde seviyeyi nasıl tanırsınız?</summary>
    <p>Önce kıkırdak arayın: halka akciğer dışındaki ana bronşa, düzensiz plak akciğer içindeki bronşa uyar. [[K5 s. 68]] Kıkırdak kaybolduğunda epitele ve duvarda alveol bulunup bulunmadığına bakın. [[K5 s. 68–69]] Görece kalın kas tabakasını örten silyalı kübik epitel bronşiyolü düşündürür. [[K5 s. 68]] Duvara artık alveoller açılıyor ve kübik hücreler silya taşımıyorsa respiratuvar bronşiyole ulaşmışsınızdır. [[K5 s. 69]]</p>
  </details>
  <details class="an01e-okuma"><summary>İnce bir alveol duvarı preparatta neden boş görünebilir?</summary>
    <p>Hava ile kapiller kan arasındaki epitel özellikle hücre çekirdeğinden uzaklaştıkça incelir. [[K5 s. 67]] Olağan kesitte hücre sınırlarının seçilememesi, epitel örtüsünde açıklık bulunduğunu göstermez. [[K5 s. 67]]</p>
    <p>Çekirdekler arasındaki kesintisiz örtü ve altındaki bazal membran özel yöntemlerle gösterilebilir. [[K5 s. 67]] Aynı yüzeyde gördüğünüz iri vakuollü bir hücreyi yassı gaz değişim yüzeyiyle karıştırmayın: bu tip II hücrenin katkısı yüzey etkin madde salgısıdır. [[K5 s. 67]]</p>
  </details>
</section>

<section class="wrap blk ders-sec" id="an01e-kan">
  <h2>Akciğerin iki kan dolaşımı</h2>
  <p class="intro">Pulmoner arterin alveole komşu kapiller ağı gaz alışverişine, bronşiyal arterler ise akciğer stromasının beslenmesine hizmet eder. [[K5 s. 69–70]]</p>
  <div class="viz"><div class="viz-head"><h3>Kan hangi yoldan döner?</h3></div><div data-viz="an01e_kan"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an01e-satirlar">
    <div><dt>Pulmoner arter ve ven</dt><dd>Arter dalları bronşları izleyerek her hava kesesine küçük bir dal verir ve vücudun en zengin kapiller ağını oluşturur. [[K5 s. 69–70]] Pulmoner ven kolları hem pulmoner hem bronşiyal kapillerlerden kan toplar. [[K5 s. 70]] Segmentler arasındaki venler rezeksiyon sınırını gösterir. [[K5 s. 70]] Segment apeksinde ven segmental arterle buluşup yanında hilusa gider. [[K5 s. 70]]</dd></div>
    <div><dt>Sol atriyuma dönüş</dt><dd>Her akciğerden iki ana pulmoner ven ayrı ayrı sol atriyuma açılır. [[K5 s. 70]] Solda üst ve alt lob kendi veniyle, sağda üst ve orta lob ortak üst venle, alt lob ise alt venle boşalır. [[K5 s. 70]]</dd></div>
    <div><dt>Bronşiyal arter kökenleri</dt><dd>Bronşları, akciğer dokusunu, visseral plevrayı ve pulmoner lenf düğümlerini besleyen arterlerin sayısı ve kökeni değişebilir. [[K5 s. 69–70]] Genellikle soldaki iki arter inen torasik aortun ön yüzünden çıkar. [[K5 s. 70]] Sağdaki tek arter aorttan, birinci veya üçüncü interkostal arterden, internal torasik ya da sağ subklavyen arterden gelebilir. [[K5 s. 70]] Üçüncü interkostal arter aortun ilk interkostal dalıdır. [[K5 s. 70]] Bazen üç bronşiyal arter aorttan ortak gövdeyle çıkar. [[K5 s. 70]]</dd></div>
    <div><dt>Distal sınır</dt><dd>Bronşiyal arterler bronşun arka duvarını ve dallarını küçük bronşiyollere kadar izler. [[K5 s. 70]] Kanal duvarında alveoller belirdiğinde bu damarlar kaybolur ve solunum epiteli pulmoner arter ağından beslenir. [[K5 s. 70]]</dd></div>
    <div><dt>Bronşiyal venler</dt><dd>Her iki tarafta genellikle ikişer bronşiyal ven bulunur. [[K5 s. 70]] Bunlar yalnız ilk iki veya üç bronş çatallanmasından kan toplar. [[K5 s. 70]] Sağda azigosa, solda superior hemiazigosa veya sol superior interkostal vene boşalırlar. [[K5 s. 70]] İki arter sistemi arasında doğrudan bağlantı bulunmasa da distal bronşiyal kanın önemli bölümü, küçük bronşlar ve alveoler kapillerlerden pulmoner venlere döner. [[K5 s. 69–70]]</dd></div>
    <div><dt>Fizyolojik şant</dt><dd>Distal bronşiyal venöz dönüş ve kalbin en küçük venleri (Thebesian venleri), sol kalpte venöz kanın arter kanına karışmasına yol açar. [[K5 s. 70]] Kitap bu payı normalde kalp debisinin %1–2’sinden az olarak verir. [[K5 s. 70]] Küçük ventilasyon/perfüzyon uyumsuzluklarıyla toplam şant %5’e ulaşabilir. [[K5 s. 70]] Akut enfeksiyon veya bronşektazide bronşiyal kan akımı artarsa şant etkisi büyür. [[K5 s. 70]]</dd></div>
    <div><dt>Ödem ve obstrüksiyon</dt><dd>Kasın dışındaki arteriyel pleksustan çıkan damarlar kası delip submukozal kapiller ağı oluşturur. [[K5 s. 70]] Küçük venler kası tekrar geçerek dıştaki gevşek bağ dokusunun venöz pleksusuna açılır. [[K5 s. 70–71]] Ödem önce düşük basınçlı venleri sıkıştırır. [[K5 s. 71]] Venöz dönüşün engellenmesi mukoza şişliğini artırıp bronşu daha da daraltır. [[K5 s. 71]]</dd></div>
  </dl>
  <details class="an01e-okuma"><summary>Segment rezeksiyonunda hangi damarı sınır olarak izlersiniz?</summary>
    <p>Bir bronşla yan yana giden pulmoner arter dalı, cerraha o bronşun havalandırdığı segmentin içini gösterir. [[K5 s. 69–70]] Komşu segmentlerin arasındaki venöz kollar ise parankimin hangi hattan ayrılabileceğini gösterir. [[K5 s. 70]]</p>
    <p>Segmentin apeksine doğru ven tekrar arterle yan yana gelir ve hilusa bu şekilde ilerler. [[K5 s. 70]] Dolayısıyla damarın bronşa göre konumunu değerlendirirken kesitin segment sınırından mı, apeksten mi geçtiğini de hesaba katın. [[K5 s. 69–70]]</p>
  </details>
  <details class="an01e-okuma"><summary>Bronş enfeksiyonu ile şant arasında nasıl bir bağlantı vardır?</summary>
    <p>Bir bronşiyal arterin getirdiği kanı küçük bronşun duvarından başlayarak izleyin. [[K5 s. 69–70]] Bu kanın distal dönüş yolu pulmoner ven olduğundan, sol atriyuma alveoler kapillerlerden gelmiş kanla birlikte ulaşır. [[K5 s. 69–70]] Akut enfeksiyonda veya bronşektazide bronşiyal akım artabilir. [[K5 s. 70]] Akım arttığında bu yoldan sola dönen venöz kanın şanta katkısı da artar. [[K5 s. 70]]</p>
  </details>
</section>

<section class="wrap blk ders-sec" id="an01e-lenf">
  <h2>Lenf drenajı ve pulmoner pleksuslar</h2>
  <p class="intro">Lenf akımı bronşların çatallanma noktalarında toplanırken otonom lifler akciğere kök çevresindeki pleksuslardan girer. [[K5 s. 71]]</p>
  <div class="viz"><div class="viz-head"><h3>Plevradan ve bronşlardan venöz açıya</h3></div><div data-viz="an01e_lenf"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an01e-satirlar">
    <div><dt>İki lenf ağı</dt><dd>Yüzeyel ağ visseral plevrayı drene eder. [[K5 s. 71]] Pulmoner damarlarla birlikte ilerleyen derin ağ bronşları drene eder, alveoler kanalların ötesindeki hava boşluklarına ulaşmaz. [[K5 s. 71]]</dd></div>
    <div><dt>Ortak yol</dt><dd>Her iki ağ büyük bronş çatallarındaki bronkopulmoner düğümlere, ardından trakeobronşiyal düğümlere ve iki tarafın bronkomediastinal trunkuslarına boşalır. [[K5 s. 71]] Sağ trunkus sağ lenf kanalına, sol trunkus torasik kanala açılabilir. [[K5 s. 71]] Daha sık olarak her biri kendi tarafında internal juguler venle subklavyen venin birleşimine bağımsız açılır. [[K5 s. 71]]</dd></div>
    <div><dt>Pleksusların yerleşimi</dt><dd>T2–4 sempatik lifleri ile vagal parasempatik lifler kökün arkasında posterior pulmoner pleksusu oluşturur. [[K5 s. 71]] Lifler kökü dolanarak ön pleksusa katılır ve damarlarla bronşları izleyerek akciğere girer. [[K5 s. 71]]</dd></div>
    <div><dt>Hedefler</dt><dd>Parasempatik lifler müköz bezlerde salgıyı uyarır ve bronş kasında konstriksiyon yapar. [[K5 s. 71]] Sempatik lifler bronş kasında inhibitör, bronkodilatör etki gösterir ve bronşiyal damar tonusunu düzenler. [[K5 s. 71]] İnce duvarlı pulmoner damar yatağı sempatik uyarıya az yanıt verir, başlıca sağ ventrikül basıncı gibi etkenlere pasif olarak uyar. [[K5 s. 71]]</dd></div>
    <div><dt>Afferent yol</dt><dd>Akciğerde gerilmeyi algılayan lifler vagus içinde medulladaki solunum merkezine ulaşır. [[K5 s. 71]]</dd></div>
  </dl>
  <details class="an01e-okuma"><summary>Visseral plevra ile bronş duvarından gelen lenf nerede buluşur?</summary>
    <p>Başlangıçları iki ayrı yol olarak çizin. [[K5 s. 71]] Plevra yüzeyindeki yolu yüzeyel ağa, bronş duvarından gelen yolu pulmoner damarlara eşlik eden derin ağa bağlayın. [[K5 s. 71]] İki çizgiyi büyük bronş çatallarındaki düğümlerde birleştirin. [[K5 s. 71]]</p>
    <p>Buradan sonraki ortak yol trakeobronşiyal düğümler ve bronkomediastinal trunkus üzerinden ilerler. [[K5 s. 71]] Sağ ve sol trunkusun sonunu çizerken her iki taraf için de daha sık olan doğrudan venöz açılımı gösterin. [[K5 s. 71]]</p>
  </details>
</section>

<section class="wrap blk ders-sec" id="an01e-gelisim">
  <h2>Ön bağırsaktan hava yoluna</h2>
  <p class="intro">Solunum yolu ile özofagusun yakın gelişimsel ilişkisi konjenital trakeoözofageal fistülün yerleşimini açıklar. [[K5 s. 71–72]]</p>
  <div class="viz"><div class="viz-head"><h3>Ön bağırsakta ayrılma ve tomurcuklanma</h3></div><div data-viz="an01e_gelisim"></div><p class="viz-cap" aria-live="polite"></p></div>
  <dl class="an01e-satirlar">
    <div><dt>Başlangıç</dt><dd>3 mm’lik embriyoda ön bağırsağın ventral orta hattında trakeobronşiyal oluk adı verilen bir divertikül belirir. [[K5 s. 71]] Oluk derinleşir, kaudalde kenarları birleşir ve larinks girişi dışında ilkel özofagustan ayrılır. [[K5 s. 71]]</dd></div>
    <div><dt>İki tomurcuk</dt><dd>Kaudal uç iki ana bronşa ayrılır ve proliferasyonla iki tarafta birer akciğer tomurcuğu gelişir. [[K5 s. 71]]</dd></div>
    <div><dt>Tipik fistül</dt><dd>Kalıcı bağlantıya genellikle özofagus atrezisi eşlik eder ve fistül atretik bölümün altında yer alır. [[K5 s. 71–72]] Tipik örnekte üst özofagus kör sonlanır, alt özofagus T4 düzeyinde trakeaya açılır. [[K5 s. 72]]</dd></div>
  </dl>
  <details class="an01e-okuma"><summary>Fistül şemasında kör uç ile bağlantıyı nasıl ayırırsınız?</summary>
    <p>Özofagusu üstten izlediğinizde tipik olguda ilk görülecek bulgu kör poştur. [[K5 s. 72]] İkinci çizgiyi kaudaldeki özofagustan başlayarak çizin: trakea ile bağlantı kuran bölüm atrezinin altında kalır. [[K5 s. 72]] K5’in gösterdiği tipik yerleşimde bu bağlantı dördüncü torakal vertebra hizasındadır. [[K5 s. 72]] Bu ilişkiyi erken embriyoda hava yolu taslağının ilkel özofagusa komşu gelişmesiyle açıklayabilirsiniz. [[K5 s. 71–72]]</p>
  </details>
</section>

<section class="wrap blk ders-sec" id="an01e-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
  <div class="viz"><div data-viz="mtf" data-q="an01e-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an01e-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an01e-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an01e-p2">
  <h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Yatakta sırtüstü yatan hastada aspirasyondan kuşkulanıyorsunuz. Bronkoskopla karinadan sağ alt lobun apikal segmentine nasıl ulaşırsınız? Bu segmenti neden incelersiniz?</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Parlak sagittal karina sırtını bulun ve daha geniş, dik olan sağ ana bronşa yönelin. [[K5 s. 67]]</li>
    <li>Yan duvardaki sağ üst lob ağzını üç benzer açıklığından tanıyın. [[K5 s. 67]]</li>
    <li>Öndeki orta lob ağzını geçip yatay sırtın altından alt loba ilerleyin. [[K5 s. 67]]</li>
    <li>Orta lob çıkışının karşısında, biraz aşağıda ve arkaya açılan bronş apikal segmente gider. [[K5 s. 63]] Yatan hastada bu doğrultu yabancı cisim ve sekresyon birikimini kolaylaştırır. [[K5 s. 63]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Karina, sağ üst lob ağzı, öndeki orta lob ağzı ve arkadaki alt lob apikal dalını tek çizim üzerinde işaretleyin. [[K5 s. 63–67]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Solda lingulaya hangi daldan ulaşırsınız? [[K5 s. 65–67]] Segment rezeksiyonunda ven cerraha hangi sınırı gösterir? [[K5 s. 70]] Sağ ve sol kökün üst komşularını nasıl ayırırsınız? [[K5 s. 62–63]]</div></div>
</section>
<section class="wrap blk ders-sec" id="an01e-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Perikard ve içindekiler orta mediasteni, toraks girişine kadar üzerindeki alan üst mediasteni oluşturur. [[K5 s. 57]]</li>
    <li>Nötr solunumda alt kenar önden arkaya midklaviküler, midaksiller ve paravertebral hatlarda sırasıyla 6., 8. ve 10. kaburgaya ulaşır. [[K5 s. 61]]</li>
    <li>Frenik sinir her iki kökün önünde, vagus arkasındadır. [[K5 s. 62–63]]</li>
    <li>Sağ orta lobda lateral ve medial, sol lingulada üst ve alt segmentleri arayın. [[K5 s. 64–66]]</li>
    <li>Segmentin bronşuna arter eşlik eder, ven kolları segmentler arasından geçer. [[K5 s. 69–70]]</li>
  </ul>
  <div data-viz="tamam" data-modul="anatomi" data-bolum="01e"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/01d">← Trakea, ana bronşlar, plevra ve göğüs duvarı</a><a href="#/dersler/anatomi/01f">Sonraki: Diyafram →</a></nav>
</section>`,
};
