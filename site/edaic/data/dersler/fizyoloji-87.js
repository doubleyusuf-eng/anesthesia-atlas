VERI.sorular = VERI.sorular || {};

VERI.sorular['fiz87-1'] = {
  no: 1, kok: 'İrtifada alveoler gaz ve ventilasyon', kagit: 'Paper A · fizyoloji', kaynak: '[[K1 s. 431–432]]',
  onermeler: [
    {t:'Yükselirken havadaki O₂ fraksiyonu azalır.', d:false, n:'Yanlış. O₂ fraksiyonu %21 kalırken barometrik basınç düşer. [[K1 s. 431]]'},
    {t:'37 °C’de su buharı, irtifada toplam basıncın daha büyük bir payını oluşturur.', d:true, n:'Doğru. Doymuş su buharı basıncı 6,3 kPa kalırken toplam basınç azalır. [[K1 s. 431]]'},
    {t:'PaO₂ düşüşünü doğrudan santral kemoreseptörler algılar.', d:false, n:'Yanlış. Arteriyel O₂ basıncındaki düşüşe periferik kemoreseptörler yanıt verir. [[K1 s. 431]]'},
    {t:'Hiperventilasyonla PaCO₂ düştüğünde alveoler gaz denkleminde çıkarılan terim küçülür.', d:true, n:'Doğru. PaCO₂/R küçülünce alveoler O₂ basıncı yükselir. [[K1 s. 431]]'},
    {t:'Ventilasyon freni ancak böbrekten bikarbonat atılımı başladıktan sonra hafifler.', d:false, n:'Yanlış. Frenin daha önce hafiflemesi, daha hızlı bir santral mekanizmayı düşündürür. [[K1 s. 432]]'}
  ]
};
VERI.sorular['fiz87-2'] = {
  no: 2, kok:'Dolaşım ve oksijen taşınması', kagit:'Paper A · fizyoloji', kaynak:'[[K1 s. 432]]',
  onermeler:[
    {t:'Plazma hacmindeki azalma hematokriti yükseltir.', d:true, n:'Doğru. Plazma hacmi %20 azalınca eritrositlerin kan hacmindeki payı artar. [[K1 s. 432]]'},
    {t:'Ön yük azalınca atım hacmi artar.', d:false, n:'Yanlış. Atım hacmi düşer, kalp hızındaki artış debiyi korur. [[K1 s. 432]]'},
    {t:'Hipoksemiye bağlı trombosit aktivasyonu tromboz riskine katkıda bulunur.', d:true, n:'Doğru. Artmış kan viskozitesi de bu riske katkıda bulunur. [[K1 s. 432]]'},
    {t:'Eritrositlerin 2,3-DPG üretimini artırması dokulara O₂ bırakılmasını kolaylaştırır.', d:true, n:'Doğru. Eğrinin sağa kayması alkalozun yol açtığı sola kaymayı dengeler. [[K1 s. 432]]'},
    {t:'İrtifada yaygın hipoksi pulmoner damar direncini azaltır.', d:false, n:'Yanlış. Yaygın arteriyol daralması pulmoner damar direncini %50–300 artırır. [[K1 s. 432]]'}
  ]
};
VERI.sorular['fiz87-3'] = {
  no:3, kok:'Akut irtifa hastalığı ve anestezi ekipmanı', kagit:'Paper A · fizyoloji', kaynak:'[[K1 s. 433]]',
  onermeler:[
    {t:'Akut irtifa hastalıklarının kesin tedavisi ek oksijendir.', d:false, n:'Yanlış. Ek oksijen zaman kazandırır, kesin tedavi daha alçak irtifaya inmektir. [[K1 s. 433]]'},
    {t:'Baş ağrısıyla birlikte ataksi, yüksek irtifa serebral ödemini düşündürür.', d:true, n:'Doğru. Baş ağrısına ataksi ya da bilişsel bozukluk eşlik etmesi ağır nörolojik tabloyu tanımlar. [[K1 s. 433]]'},
    {t:'HAPE’de kalıcı kuru öksürük erken belirtilerdendir.', d:true, n:'Doğru. Efor dispnesi de erken dönemde görülür, hemoptizi ve ortopne daha sonra gelişir. [[K1 s. 433]]'},
    {t:'Venturi maskesinin sağladığı O₂ yüzdesi irtifada biraz artar.', d:true, n:'Doğru. Aynı maske deniz seviyesine göre biraz daha yüksek O₂ yüzdesi verir. [[K1 s. 433]]'},
    {t:'Havadan nakilde artan kaf basıncı mukozada iskemiye yol açabilir.', d:true, n:'Doğru. Trakea veya farenks mukozası yüksek kaf basıncıyla hasar görebilir. [[K1 s. 433]]'}
  ]
};

const D87_OKUMA = {
  basinc: {
    deniz: 'Renkli çubuğun tamamı atmosfer basıncını, koyu bölümü 37 °C’deki doymuş su buharı basıncını gösterir. [[K1 s. 431]] İrtifayı değiştirmeden önce hangi bölümün kısalacağını tahmin edin.',
    irtifa: 'Alveoler gazla dengedeki arter kanında PaO₂ düşer, hemoglobin satürasyonu ve O₂ taşınması azalır. [[K1 s. 431]] O₂ sunumu dokunun normal metabolizmasına yetmediğinde hipoksemik hipoksi gelişir. [[K1 s. 431]] Kesikli sınır deniz seviyesindeki toplam basıncı gösterir. [[K1 s. 431]] Yüksekte su buharının kapladığı bölüm aynı uzunlukta kalırken diğer gazlara kalan bölüm kısalır. [[K1 s. 431]]',
  },
  solunum: {
    uyari: 'Düşük PaO₂’yi periferik kemoreseptörler algılar ve medulladaki solunum merkezini uyarır. [[K1 s. 431]] Bu basamakta izlenen değişken arter kanındaki oksijen basıncıdır. [[K1 s. 431]] Bir sonraki adımda solunum merkezinin yanıtını izleyin.',
    yanit: 'Alveoler ventilasyon artınca PaCO₂ düşer ve alveoler gaz denklemine göre alveoler O₂ basıncı yükselir. [[K1 s. 431]] Yükselirken denklemdeki ilk terim küçülmüştü, şimdi ventilasyon yanıtıyla ilk terimden çıkarılan CO₂ terimi küçülür. [[K1 s. 431]]',
    fren: 'Santral kemoreseptörler hipokapniyi, karotis cisimcikleri arteriyel pH artışını algılar. [[K1 s. 432]] Her iki sinyal de ventilasyon artışını frenler. [[K1 s. 432]]',
  },
  dolasim: {
    sistem: 'Plazma kaybı ön yükü azaltır, ancak periferik kemoreseptörlerin tetiklediği sempatik yanıt kalp hızını artırır. [[K1 s. 432]] Kalp her atımda daha az kan gönderir, ancak daha sık attığı için dakikada gönderdiği toplam kan miktarını korur. [[K1 s. 432]]',
    akciger: 'Pulmoner kapiller hidrostatik basınç yükselirse sıvı damar dışına sızabilir ve yüksek irtifa pulmoner ödemi gelişebilir. [[K1 s. 432]] Okları geriye doğru izleyin. Sıvının damardan çıkışını kolaylaştıran kapiller hidrostatik basınç artışıdır, arteriyolü daraltan ilk uyaran ise düşük alveoler O₂ basıncıdır. [[K1 s. 432]]',
  },
  egri: {
    alkaloz: 'Hiperventilasyona bağlı alkaloz eğriyi sola kaydırır. [[K1 s. 432]] P₅₀ düşer, akciğerde sınırlı O₂’nin hemoglobine yüklenmesi kolaylaşırken dokuda bırakılması güçleşir. [[K1 s. 432]] Aynı oksijen basıncında iki eğriyi dikey yönde karşılaştırın: sola kayan eğride hemoglobin daha fazla oksijen tutar. [[K1 s. 432]]',
    dpg: 'Eritrositler daha fazla 2,3-difosfogliserat (2,3-DPG) üretince eğri sağa kayar ve dokulara O₂ bırakılması kolaylaşır. [[K1 s. 432]] P₅₀ bir hafta içinde deniz seviyesindeki konumuna döner. [[K1 s. 432]] Bu görünümde başlangıç ve bitişi karıştırmamak için önce alkalozu seçin, ardından P₅₀ işaretinin hangi yöne ilerlediğine bakın.',
  },
  hastalik: {
    ams: 'Baş ağrısına bulantı, iştahsızlık, baş dönmesi ve uykusuzluk eşlik edebilir. [[K1 s. 433]] Aynı irtifada uyuma zaman tanındığında belirtiler genellikle 3–4 günde hafifler. [[K1 s. 433]]',
    hace: 'Baş ağrısıyla birlikte ataksi veya bilişsel bozukluk ağır nörolojik tutulumu düşündürür, tablo nöbete, komaya ve ölüme ilerleyebilir. [[K1 s. 433]] AMS ile karşılaştırırken baş ağrısının iki tabloda da bulunduğuna dikkat edin. [[K1 s. 433]]',
    hape: 'İlk ipuçları eforla nefes darlığı ve geçmeyen kuru öksürüktür. [[K1 s. 433]] Daha sonra kanlı balgam ve yatınca nefes darlığı gelişir. [[K1 s. 433]]',
  },
  vapor: {
    deniz: 'Kadrandaki yüzde deniz seviyesindeki kalibrasyona karşılık gelir. [[K1 s. 433]] Aynı ayarla yükseğe çıktığınızı düşünün. Kadran aynı yerde dururken verilen karışımdaki ajan yüzdesinin ve alveoldeki ajan basıncının nasıl değişeceğini ayrı ayrı tahmin edin.',
    irtifa: 'Daha düşük atmosfer basıncında verilen izofluran yüzdesi ayarı aşar, ancak alveoler parsiyel basınç ve dolayısıyla klinik etki aynı kalır. [[K1 s. 433]] Yüksek irtifada daha büyük bir yüzde, daha düşük bir toplam basıncın payını ifade eder. [[K1 s. 433]]',
  },
};
function D87_aciklamalar(sekil) {
  return Object.values(D87_OKUMA[sekil]).map(metin => `<p>${metin}</p>`).join('');
}

const D87_NAV = [
  ['basinc','Basınç ve oksijen'], ['solunum','Ventilasyon'], ['dolasim','Dolaşım'],
  ['kan','Kan ve ısı'], ['hastalik','Akut hastalık'], ['anestezi','Anestezi ekipmanı'],
  ['p1','Part I'], ['p2','Part II'], ['ozet','Özet']
];
SAYFALAR['dersler/fizyoloji/87'] = {
  grup:'dersler', eyebrow:'Fizyoloji · Kısım 11 · Bölüm 87', baslik:'İrtifa',
  lede:'Yüksekte de soluduğumuz havanın %21’i oksijendir, ancak düşen barometrik basınç yüzünden dokulara daha az oksijen ulaşır. [[K1 s. 431]]',
  html:`
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D87_NAV.map(([id,ad],i) => `<button type="button" data-scroll="d87-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="d87-basinc">
<h2>Aynı oksijen yüzdesi, daha düşük oksijen basıncı</h2>
<p class="intro">Yükseldikçe barometrik basınç (P<sub>B</sub>) üstel olarak düşer ve alveolde oksijene düşen basınç azalır. [[K1 s. 431]]</p>
<div class="viz"><div class="viz-head"><h3>Solunan havadan dokuya</h3></div><div data-viz="f87_basinc"></div><div class="viz-cap" aria-live="polite">${D87_aciklamalar('basinc')}</div><p class="viz-foot">Şematik/nitel basınç karşılaştırması. [[K1 s. 431]]</p></div>
<p class="f87-denklem">P<sub>A</sub>O₂ = F<sub>i</sub>O₂ × (P<sub>B</sub> − P<sub>H₂O</sub>) − P<sub>a</sub>CO₂/R [[K1 s. 431]]</p>
<p>Alveoler gaz denkleminde önce su buharının basıncını çıkarın. [[K1 s. 431]] 37 °C’de bu değer her iki irtifada da 6,3 kPa’dır. [[K1 s. 431]] Kalan basıncı solunan O₂ fraksiyonuyla çarpıp arteriyel CO₂ basıncının R’ye oranını çıkarınca alveoler O₂ basıncını bulursunuz. [[K1 s. 431]]</p>
<div class="cols"><div class="card"><h3>Hangi yükseklik?</h3><p>Yüksek irtifa için tanım birliği yoktur, en sık kullanılan sınır deniz seviyesinden 2500 m’nin üzeridir. [[K1 s. 431]] Çoğu kişide uyum bu yükseklikte belirginleşir ve yaklaşık 100 milyon kişi bu sınırın üzerinde yaşar. [[K1 s. 431]]</p><p>Aşırı yüksek irtifa 6000 m’nin üzeridir (Everest 8848 m). [[K1 s. 431]] Uyum burada kısa süre yaşamaya yeter, sürekli yerleşime yetmez. [[K1 s. 431]]</p></div>
<div class="card"><h3>Basınca eşlik eden değişiklikler</h3><ul><li>Her 150 m yükselişte çevre sıcaklığı 1 °C düşer. [[K1 s. 431]]</li><li>Bağıl nem azalınca deri ve solunum yollarından buharlaşmayla sıvı kaybı artar. [[K1 s. 431]]</li><li>Bulut örtüsü azaldığı için güneş radyasyonu artar. [[K1 s. 431]]</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="d87-solunum">
<h2>Solunum yanıtı neden önce hızlanır, sonra frenlenir?</h2>
<p class="intro">Hiperventilasyon arteriyel O₂ basıncındaki düşüşü kısmen karşılar, fakat yol açtığı solunumsal alkaloz ventilasyon artışını sınırlar. [[K1 s. 431–432]]</p>
<div class="viz"><div class="viz-head"><h3>Oksijen uyarısından ventilasyon frenine</h3></div><div data-viz="f87_solunum"></div><div class="viz-cap" aria-live="polite">${D87_aciklamalar('solunum')}</div><p class="viz-foot">Şematik/nitel geri bildirim. [[K1 s. 431–432]]</p></div>
<p>K1, sağlıklı erişkinde 2500 m altında belirgin bir uyum yanıtı görülmemesini büyük olasılıkla PaO₂’nin periferik kemoreseptör eşiğinin (yaklaşık 8 kPa) üzerinde kalmasına bağlar. [[K1 s. 431]] İrtifaya uyumda solunum, dolaşım, kan ve böbrek yanıtları birlikte çalışır. [[K1 s. 431]]</p>
<div class="cols"><div class="card"><h3>Fren ne zaman gevşer?</h3><p>Kronik uyumda böbreğin pH’ı düzeltmesi ventilasyonun daha da artmasına izin verir. [[K1 s. 431]] Eski açıklama, izleyen günlerde frenin çözülmesini bikarbonat atılımının alkalemiyi kısmen düzeltmesine bağlıyordu. [[K1 s. 432]]</p><p>Oysa fren, böbrekten bikarbonat atılımı başlamadan hafifler. [[K1 s. 432]] Daha hızlı bir santral yanıt söz konusu olabilir. [[K1 s. 432]] Beyin-omurilik sıvısında bikarbonat azalması olası bir açıklamadır, mekanizma tam bilinmez. [[K1 s. 432]]</p></div>
<div class="card"><h3>Alveolden kana geçiş</h3><p>Yüksekte O₂ aktarımı difüzyonla sınırlanabilir. [[K1 s. 432]] Egzersizde kanın pulmoner kapillerden geçiş süresi kısalır. [[K1 s. 432]] Yüksek irtifa pulmoner ödeminde (HAPE) ise interstisyel sıvı alveol-kapiller bariyeri kalınlaştırır. [[K1 s. 432]]</p><p>Şekilde ventilasyonun alveoldeki oksijen basıncını nasıl desteklediğini izlediniz. [[K1 s. 431]] Oksijenin kana geçişinde ise iki ayrı sınırlamayı düşünün: egzersizde geçiş için ayrılan zaman azalır, ödemde aşılacak mesafe artar. [[K1 s. 432]]</p></div></div>
</section>
<section class="wrap blk ders-sec" id="d87-dolasim">
<h2>Dolaşımda iki farklı sonuç</h2>
<p class="intro">Kalp hızı artışı sistemik debiyi korurken akciğerde yaygın arteriyol daralması pulmoner basıncı yükseltir. [[K1 s. 432]]</p>
<div class="viz"><div class="viz-head"><h3>Atım hacminden debiye, arteriyolden ödeme</h3></div><div data-viz="f87_dolasim"></div><div class="viz-cap" aria-live="polite">${D87_aciklamalar('dolasim')}</div><p class="viz-foot">Şematik/nitel dolaşım yolları. [[K1 s. 432]]</p></div>
<div class="cols"><div class="card"><h3>Plazma hacmi neden %20 azalır? [[K1 s. 432]]</h3><ul><li>K1, basınç diürezini artan sempatik etkinlikle ilişkilendirdiği renal perfüzyon artışıyla açıklar. [[K1 s. 432]]</li><li>Hiperventilasyon ve düşük nem sıvı kaybını artırır. [[K1 s. 432]]</li><li>İştahsızlık ağızdan sıvı alımını azaltır. [[K1 s. 432]]</li></ul></div>
<div class="card"><h3>Hipoksinin dağılımı</h3><p>Lober pnömonide olduğu gibi bölgesel hipokside, hipoksik pulmoner vazokonstriksiyon (HPV) ventilasyon/perfüzyon eşleşmesini iyileştirir. [[K1 s. 432]] İrtifada düşük alveoler O₂ basıncı akciğerin geneline yayıldığından aynı yanıt zararlı olabilir. [[K1 s. 432]] </p><p>Şeklin pulmoner yolunda aynı basınç artışının iki sonucunu ayırın. Kapillerdeki basınç artışı akciğerde sıvı birikimine yol açabilirken ani pulmoner hipertansiyonun kalpteki sonucu yatkın kişilerde sağ kalp yetmezliği olabilir. [[K1 s. 432]]</p></div></div>
</section>
<section class="wrap blk ders-sec" id="d87-kan">
<h2>Hemoglobin oksijeni nerede tutar, nerede bırakır?</h2>
<p class="intro">Oksihemoglobin ayrışma eğrisinin sigmoid biçimi sayesinde sağlıklı kişide 3000 m’ye kadar arteriyel O₂ satürasyonu %90’ın üzerinde kalır. [[K1 s. 432]]</p>
<div class="viz"><div class="viz-head"><h3>Daha yüksekte eğrinin konumu</h3></div><div data-viz="f87_egri"></div><div class="viz-cap" aria-live="polite">${D87_aciklamalar('egri')}</div><p class="viz-foot">Şematik/nitel eğriler. Kesikli çizgi deniz seviyesi referansıdır. [[K1 s. 432]]</p></div>
<ul class="iskelet"><li><b>Hematokrit ve iş yükü.</b> Başlangıçta plazma hacmindeki azalma hematokriti yükseltir. [[K1 s. 432]] Kronik uyumda hematokrit 0,6’ya ulaşabilir. [[K1 s. 432]] Kan koyulaştıkça sol ventrikülün kanı dolaştırmak için yaptığı iş artar. [[K1 s. 432]]</li>
<li><b>Eritrosit kütlesi.</b> Hipoksemi sürerse böbrek yükselişten sonraki saatler içinde eritropoietin salgısını artırır. [[K1 s. 432]] Kemik iliğinde eritrosit yapımı uyarılır ve zamanla kanın O₂ taşıma kapasitesi normale yaklaşır. [[K1 s. 432]] Saatler içinde başlayan olay böbreğin hormon yanıtıdır, dolaşımdaki eritrosit kütlesinin artması ise zaman alır. [[K1 s. 432]]</li>
<li><b>Tromboz.</b> Yüksek hematokritin artırdığı viskozite ile hipokseminin tetiklediği trombosit aktivasyonu trombotik olay riskini birlikte yükseltir. [[K1 s. 432]]</li></ul>
<div class="cols"><div class="card"><h3>Soğukta ısıyı korumak</h3><p>Uzun süren soğukta periferik damarlar daralır, terleme azalır ve kişi daha kalın giyinerek ısı kaybını azaltabilir. [[K1 s. 432–433]]</p></div><div class="card"><h3>Isı üretmenin O₂ maliyeti</h3><p>Bazal metabolizma hızının artması, titreme ve bebeklerde kahverengi yağ etkinliğinin artması ısı üretir. [[K1 s. 433]] Bu yolların her biri göreli hipoksemi sırasında O₂ tüketimini artırır. [[K1 s. 433]]</p></div></div>
</section>
<section class="wrap blk ders-sec" id="d87-hastalik">
<h2>Hızlı yükselişten sonra üç klinik tablo</h2>
<p class="intro">Akut yüksek irtifa hastalığı, henüz uyum sağlamamış kişinin çok hızlı yükselmesiyle gelişir. [[K1 s. 433]]</p>
<div class="viz"><div class="viz-head"><h3>Belirti örüntüsünü izleyin</h3></div><div data-viz="f87_hastalik"></div><div class="viz-cap" aria-live="polite">${D87_aciklamalar('hastalik')}</div><p class="viz-foot">Şematik/nitel klinik karşılaştırma. [[K1 s. 433]]</p></div>
<p>Aklimatizasyon hızı kişiden kişiye değişir, yavaş uyum sağlayanlar hastalığa daha yatkındır. [[K1 s. 433]] Akut dağ hastalığı (AMS) nörolojik bir sendromdur. [[K1 s. 433]] Yüksek irtifa serebral ödemi (HACE) aynı spektrumun ağır ucudur ve gelişme mekanizması bilinmez. [[K1 s. 433]]</p>
<p>HAPE’nin, HPV sonrasında alveoldeki Starling kuvvetlerinin değişmesinden kaynaklandığı düşünülür. [[K1 s. 433]] Üç tablo içinde en ağır olanı HAPE’dir ve ölümlerin çoğu bu tabloya bağlıdır. [[K1 s. 433]]</p>
<div class="card"><h3>Kesin tedavi ve zaman kazandıran girişimler</h3><p>Akut irtifa hastalıklarının tek kesin tedavisi daha alçak irtifaya inmektir. [[K1 s. 433]]</p><ul><li>Ek O₂, alveoler O₂ basıncını en hızlı yükselten girişimdir ve irtifanın en zararlı etkilerini karşılar. [[K1 s. 433]] Denklemde ek oksijenin değiştirdiği terim solunan O₂ fraksiyonudur. [[K1 s. 431]]</li><li>Hiperbarik oda, kişinin maruz kaldığı etkin irtifayı düşürerek inişi taklit eder. [[K1 s. 433]] Gamow torbası taşınabilir bir örnektir. [[K1 s. 433]]</li><li>İlaç seçenekleri arasında asetazolamid, deksametazon ve nifedipin bulunur. [[K1 s. 433]]</li></ul></div>
</section>
<section class="wrap blk ders-sec" id="d87-anestezi">
<h2>İrtifada anestezi ekipmanını okumak</h2>
<p class="intro">Aşırı yüksek irtifada genel anesteziden kaçınılır, ancak birçok hastane 2000–3000 m’de çalışır ve hipoksemi riskine ekipmanla ilgili değişiklikler eklenir. [[K1 s. 433]]</p>
<div class="viz"><div class="viz-head"><h3>İzofluran ayarı %1 iken ne değişir? [[K1 s. 433]]</h3></div><div data-viz="f87_vapor"></div><div class="viz-cap" aria-live="polite">${D87_aciklamalar('vapor')}</div><p class="viz-foot">Şematik/nitel karşılaştırma, deniz seviyesinde kalibre edilmiş plenum vaporizatör. [[K1 s. 433]]</p></div>
<p>Uçucu ajanın doymuş buhar basıncı barometrik basınçtan bağımsız olduğu için plenum vaporizatördeki ajan parsiyel basıncı irtifayla değişmez. [[K1 s. 433]] Klinik etkiyi belirleyen de alveoldeki ajan parsiyel basıncıdır. [[K1 s. 433]]</p>
<ul class="iskelet"><li><b>Akımölçer.</b> Deniz seviyesinde kalibre edilen değişken açıklıklı akımölçer, gaz yoğunluğu azalınca hacimsel akımı olduğundan düşük gösterir. [[K1 s. 433]] Klinik açıdan verilen molekül sayısı (örneğin O₂) önemli olduğundan akımölçer olağan biçimde kullanılabilir. [[K1 s. 433]]</li>
<li><b>Venturi maskesi.</b> İrtifada deniz seviyesine göre biraz daha yüksek O₂ yüzdesi sağlar. [[K1 s. 433]]</li>
<li><b>Hava yolu kafı.</b> Kritik hastanın havadan naklindeki gibi hızlı irtifa değişimlerinde endotrakeal tüp veya laringeal maske kafının basıncı belirgin artabilir. [[K1 s. 433]] Kontrolsüz basınç artışı trakea veya farenks mukozasında iskemik hasara yol açabilir. [[K1 s. 433]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="d87-p1"><h2>Part I · MTF</h2><p>Her önermeyi doğru ya da yanlış olarak işaretleyin, ardından gerekçenizi açıklamayla karşılaştırın.</p>
<div class="viz"><div data-viz="mtf" data-q="fiz87-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fiz87-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fiz87-3"></div></div></section>
<section class="wrap blk ders-sec" id="d87-p2"><h2>Part II · SOE 1</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>İrtifaya çıkıldığında alveolden dokuya oksijen taşınması nasıl değişir? Akut yanıtı ve zamanla gelişen uyumu açıklayın.</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>FiO₂ sabitken P<sub>B</sub> düşer, bu yüzden alveoler ve arteriyel O₂ basınçları azalır. [[K1 s. 431]]</li>
<li>Periferik kemoreseptörler ventilasyonu artırır, düşen PaCO₂ alveoler O₂ basıncını kısmen düzeltir. [[K1 s. 431]]</li>
<li>Hipokapni ve alkaloz bu yanıtı sınırlar, ancak fren böbrekten bikarbonat atılmadan önce hafifleyebilir. [[K1 s. 432]]</li>
<li>Taşikardi azalan atım hacmini dengelerken yaygın HPV pulmoner hipertansiyona yol açar. [[K1 s. 432]]</li>
<li>Alkaloz akciğerde O₂ yüklenmesini, ardından artan 2,3-DPG dokuda O₂ bırakılmasını kolaylaştırır. [[K1 s. 432]]</li>
<li>Eritropoietin uyarısıyla artan eritrosit kütlesi O₂ taşıma kapasitesini normale yaklaştırır. [[K1 s. 432]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Oksihemoglobin eğrisini çizin, alkalozda sola kaymayı ve 2,3-DPG artışıyla P₅₀’nin deniz seviyesi konumuna dönüşünü işaretleyin. [[K1 s. 432]]</div><div class="note plain"><b>Olası ek sorular.</b> Egzersiz difüzyonu neden sınırlayabilir? [[K1 s. 432]] HACE ile AMS’yi hangi bulgular ayırır? [[K1 s. 433]] Plenum vaporizatörde verilen yüzde artarken klinik etki nasıl korunur? [[K1 s. 433]]</div></div></section>
<section class="wrap blk ders-sec" id="d87-ozet"><h2>Özet</h2><ul class="ozet">
<li>Su buharı basıncı sabit kaldığı için irtifada toplam basınçtan aldığı pay büyür. [[K1 s. 431]]</li>
<li>Ventilasyon artışı PaO₂’yi destekler, hipokapni ve alkaloz bu artışı sınırlar. [[K1 s. 431–432]]</li>
<li>Kalp debisi korunabilirken pulmoner kapiller basınç artışı ödeme zemin hazırlayabilir. [[K1 s. 432]]</li>
<li>2,3-DPG eğrinin konumunu, eritropoietin ise eritrosit üretimini değiştirir. [[K1 s. 432]]</li>
<li>Akut irtifa hastalıklarında ek O₂ ve hiperbarik tedavi zaman kazandırır, iniş kesin tedavidir. [[K1 s. 433]]</li>
<li>Plenum vaporizatörde klinik etkiyi alveoler parsiyel basınç belirler. [[K1 s. 433]]</li></ul>
<div data-viz="tamam" data-bolum="87"></div><nav class="ders-gec" aria-label="Bölümler arasında"><a href="#/dersler/fizyoloji/86">← Bölüm 86 · Obezite fizyolojisi</a><a href="#/dersler/fizyoloji/88">Sonraki: Bölüm 88 · Dalış →</a></nav></section>`
};
