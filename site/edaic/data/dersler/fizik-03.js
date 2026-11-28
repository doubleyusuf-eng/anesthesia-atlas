VERI.sorular = VERI.sorular || {};

(() => {
  const onerme = (t, d, n) => ({ t, d, n });
  const soru = (no, kok, kaynak, onermeler) => ({ no, kok, kaynak, kagit: 'Paper A · Fizik', onermeler });
  VERI.sorular['fk03-1'] = soru(1, 'Kuvvet, iş ve güç', '[[K6 s. 43–46]]', [
    onerme('Sabit yükseklikte tutulan çantaya, ağırlığı nedeniyle sürekli mekanik iş yapılır.', false, 'Çanta yer değiştirmediği için ona yapılan mekanik iş sıfırdır. [[K6 s. 43–44]]'),
    onerme('Sistemin dışarıya aktardığı enerji, sistemin yaptığı pozitif işe karşılık gelir.', true, 'İş yoluyla enerji sistemden çıkarken sistemin yaptığı iş pozitiftir. [[K6 s. 44]]'),
    onerme('Verimin SI birimi watt’tır.', false, 'Verim yararlı çıktı enerjisinin girdi enerjisine oranıdır ve birimsizdir. [[K6 s. 45]]'),
    onerme('Bir watt, saniyede bir joule enerji aktarımına karşılık gelir.', true, 'Güç, aktarılan enerjinin zamana oranıdır. [[K6 s. 45–46]]'),
    onerme('Tungsten filamanlı ampulde enerjinin yaklaşık %98’i görünür ışığa dönüşür.', false, 'Görünür ışığın payı yaklaşık %2, ısının payı %98’dir. [[K6 s. 45]]'),
  ]);
  VERI.sorular['fk03-2'] = soru(2, 'Bir solunum çevriminin basınç–hacim grafiği', '[[K6 s. 46–51]]', [
    onerme('Sabit basınçlı körüğün verdiği hacim artırılırsa yaptığı iş artar.', true, 'İnspirasyon işi sabit basınç ile verilen hacmin çarpımıdır. [[K6 s. 46–48]]'),
    onerme('Hava akımı sürerken körük ve akciğer basınçları birbirine eşittir.', false, 'Hava yolu direnci nedeniyle basınçlar akım varken ayrılır. [[K6 s. 47–48]]'),
    onerme('Aynı akciğer basıncında ekspirasyon kolundaki hacim daha büyüktür.', true, 'Elastik histerezis nedeniyle akciğer boşalırken farklı bir yol izler. [[K6 s. 48–49]]'),
    onerme('Basıncın yatay eksende olduğu hacim grafiğinin eğimi kompliyansı verir.', true, 'Hacim değişiminin basınç değişimine oranı kompliyanstır. [[K6 s. 49–50]]'),
    onerme('Pulmoner fibroziste aynı hacmi vermek için gereken basınç azalır.', false, 'Fibroziste kompliyans düşer ve aynı hacim için inspirasyon basıncı artar. [[K6 s. 50]]'),
  ]);
  VERI.sorular['fk03-3'] = soru(3, 'Solunumun ve kalbin güç gereksinimi', '[[K6 s. 51–55]]', [
    onerme('Dinlenimde solunum kaslarının metabolik gücü yaklaşık 90 mW’tır.', false, 'Örnekte 90 mW mekanik çıktıdır ve yaklaşık %10 verimle metabolik girdi 900 mW olur. [[K6 s. 51]]'),
    onerme('Küçük hava yollarında akış hızının düşük olması laminer akımla ilişkilidir.', true, 'Büyük hava yollarında türbülans baskınken daha yavaş akımlı küçük hava yollarında laminer akım baskındır. [[K6 s. 52]]'),
    onerme('Hızlı solunumda kasların ek oksijen gereksinimi kazanılan ek oksijeni aşabilir.', true, 'Bu durumda hipoksi gelişebilir. [[K6 s. 52–53]]'),
    onerme('Sağ ventrikülün işi sol ventrikül işinin yaklaşık beşte biridir.', true, 'Örnek çevrimde sağ ventrikül yaklaşık 0,2 J, sol ventrikül yaklaşık 1 J iş yapar. [[K6 s. 53–54]]'),
    onerme('Çevrim başına 1,2 J iş yapan kalbin 80 atım/dk hızındaki gücü 1,6 W’tır.', true, 'Güç, 1,2 J ile saniyedeki atım sayısının (80/60) çarpımıdır. [[K6 s. 54–55]]'),
  ]);

  const nav = [['is','İş ve enerji'],['verim','Verim ve güç'],['koruk','Körük işi'],['dongu','Histerezis'],['kompliyans','Kompliyans'],['soluk','Spontan solunum'],['akim','Akım ve güç'],['kalp','Kalbin işi'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  const sekil = (ad, baslik, dip) => `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="fk03_${ad}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${dip}</p></div>`;
  SAYFALAR['dersler/fizik/03'] = {
    grup: 'dersler', eyebrow: 'Fizik · Bölüm 3', baslik: 'Enerji ve güç: solunum ve kalbin yaptığı iş',
    lede: 'Bir solukta akciğere, bir atımda kana ne kadar enerji aktarılır? Körüğün ve ventrikülün yaptığı işi basınç ile hacimden, mekanik gücü de bu işin ne sıklıkta tekrarlandığından hesaplayabiliriz. [[K6 s. 46–48]] [[K6 s. 54–55]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad]) => `<button type="button" data-scroll="fk03-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk03-is">
<h2>Bir kuvvet ne zaman iş yapar?</h2>
<p class="intro">Çantayı kaldırırken yerçekimine karşı iş yaparsınız. [[K6 s. 43–44]] Aynı çantayı havada tutmak yorucu gelse de çanta yer değiştirmediği için ona yaptığınız mekanik iş sıfırdır. [[K6 s. 44]]</p>
${sekil('is','Bir newtonluk kuvvetle ne kadar iş yapılır?', 'Yatay eksende kutunun kuvvet doğrultusunda aldığı yolu okuyun. [[K6 s. 43–44]]')}
<p><b>İş</b>, bir sisteme ya da sistemden dışarı aktarılan enerjidir. [[K6 s. 43–44]] Sabit kuvvet hareket doğrultusunda uygulanıyorsa <i>W</i> = <i>F</i> · <i>d</i> olur. [[K6 s. 43–44]] Burada <i>W</i> iş (J), <i>F</i> kuvvet (N), <i>d</i> kutunun aldığı yoldur (m). [[K6 s. 43–46]]</p>
<p>Kutuyu cilalı zeminden kalın halıya alıp aynı mesafeyi itin. Halıdaki sürtünmeyi yenmek için daha büyük kuvvet uyguladığınızdan aynı yol için daha fazla enerji aktarırsınız. [[K6 s. 43]] Sistem dışarıya iş yaptığında yaptığı iş pozitif, dışarıdan iş yoluyla enerji aldığında negatiftir. [[K6 s. 44]]</p>
<div class="fk03-okuma"><h3>Şekli okuyun · Yolu kim alıyor?</h3>
<p>Kaydırıcıyı sıfıra getirin ve çantayı tutan kişiyi düşünün. Kuvveti uygulayan kişi yorulsa da iş denklemine giren yol çantanın aldığı yoldur. [[K6 s. 43–44]] Şimdi bir newtonluk kuvvet uygulanan kutuyu bir metre ilerletin; grafikteki nokta bir joule’e ulaşır. [[K6 s. 46]]</p>
<p>Aynı olayı kutu açısından anlatırsanız kutuya enerji aktarılmıştır; iten kişi açısından anlatırsanız sistem dışarıya iş yapmıştır. [[K6 s. 43–44]] İşin işaretini seçerken önce hangi sistemi ele aldığınızı söyleyin. [[K6 s. 44]]</p></div>
<h3>Hangi biçimde enerji?</h3><p>Enerji iş yapabilme kapasitesidir ve iş sırasında genellikle biçim değiştirir. [[K6 s. 43–44]]</p>
<dl class="fk03-terimler">
<dt>Kinetik</dt><dd>Cismin hareketinden doğan enerji. [[K6 s. 44]]</dd>
<dt>Potansiyel</dt><dd>Depolanmış enerji için genel terimdir ve çoğunlukla kütlenin yerçekimi alanındaki konumuyla ilişkilidir. [[K6 s. 44]]</dd>
<dt>Elektrik</dt><dd>Elektrik yükünün depolanmasıyla ilişkili enerji. [[K6 s. 44]]</dd>
<dt>Termal</dt><dd>Moleküllerin titreşimiyle ilişkilidir ve sıcaklık farkı ısının bir yerden başka bir yere akmasına neden olur. [[K6 s. 44]]</dd>
<dt>Işınım</dt><dd>Işığın veya başka elektromanyetik ışınımın yayılması ya da soğurulmasıyla aktarılan enerji. [[K6 s. 44]]</dd>
<dt>Ses</dt><dd>Hava moleküllerinin dalga biçimindeki mekanik titreşimiyle taşınan enerji. [[K6 s. 44]]</dd>
<dt>Kimyasal</dt><dd>Kimyasal bağlarda depolanan potansiyel enerji. [[K6 s. 44]]</dd>
<dt>Elastik</dt><dd>Gerilen ya da biçimi değişen elastik malzemede depolanan potansiyel enerji. [[K6 s. 44]]</dd></dl>
</section>
<section class="wrap blk ders-sec" id="fk03-verim">
<h2>Enerji nereye gider, ne hızla aktarılır?</h2>
<p class="intro">Güneş enerjili radyoda hücre, üzerine düşen ışığı elektrik enerjisine dönüştürür. [[K6 s. 44]] Hoparlörden ses çıkarken elektrik bileşenleri de ısınır. [[K6 s. 44–45]]</p>
${sekil('verim','Girdinin hangi kısmı yararlı çıktıya dönüşür?', 'Her çubuğun tamamı seçilen sistemin enerji girdisini gösterir. [[K6 s. 45]] [[K6 s. 51]] [[K6 s. 54]]')}
<p><b>Enerjinin korunumu.</b> Radyonun aldığı enerjiden ses, ısı ve diğer çıktıları çıkarınca bakiye sıfırdır. [[K6 s. 44–45]] Enerji yoktan var olmaz ve yok olmaz: bir sistemin kazancı diğerinin kaybına eşittir. [[K6 s. 45]]</p>
<p><b>Verim.</b> Bir otomobil motorunda benzinin kimyasal enerjisi harekete dönüşürken motor da ısınır. [[K6 s. 45]] Tungsten filamanlı ampulde elektrik girdisinin yaklaşık %2’si görünür ışık, kalan %98’i ısı olarak yayılır. [[K6 s. 45]] Termodinamik yasaları gereği hiçbir fiziksel süreç %100 verimli değildir. [[K6 s. 45]]</p>
<p>Verim <i>η</i> = yararlı çıktı enerjisi / girdi enerjisidir; iki enerji aynı birimde alındığında sonuç birimsizdir ve yüzde için 100 ile çarpılır. [[K6 s. 45]] <b>Güç</b> ise iş yapma veya enerji aktarma hızıdır: ortalama güç (W) = iş (J) / süre (s). [[K6 s. 45–46]] Kutuyu aynı mesafede aynı kuvvetle daha kısa sürede itmek daha büyük güç gerektirir. [[K6 s. 43–46]]</p>
<div class="fk03-okuma"><h3>Şekli okuyun · “Kayıp” hangi hesapta?</h3>
<p>Ampulü seçin ve çubuğun iki parçasını toplayın. Işığın payı ile ısının payı birlikte elektrik girdisinin tamamını karşılar. [[K6 s. 45]] Aynı çubuğu aydınlatma açısından okuduğunuzda yalnız görünen ışığın payını yararlı çıktı olarak sayarsınız. [[K6 s. 45]]</p>
<p>Solunum kaslarını seçtiğinizde yararlı çıktı mekanik iştir. [[K6 s. 51]] Çubuğun uzunluğu girdinin nasıl bölüşüldüğünü gösterir; bir saniyede kaç joule aktarıldığını bulmak için ayrıca süreyi bilmeniz gerekir. [[K6 s. 45–46]]</p></div>
<div class="note"><b>Birimleri okuyun.</b> Bir newtonluk kuvvet bir metre boyunca etkidiğinde aktarılan enerji 1 joule’dür (1 J = 1 N·m). [[K6 s. 46]] Bir watt, 1 J·s<sup>−1</sup> eder. [[K6 s. 46]] SI dışı enerji birimi kalorinin beş farklı tanım değeri vardır; yaklaşık karşılık 1 kalori = 4,2 J’dür. [[K6 s. 46]]</div>
</section>
<section class="wrap blk ders-sec" id="fk03-koruk">
<h2>Körüğün hareketinden bir soluğun işine</h2>
<p class="intro">Gazın ya da sıvının akması için başlangıç ve varış noktaları arasında basınç farkı gerekir. [[K6 s. 46]] Gaz akımı sağlayan fan ve sıvı akımı sağlayan pompa, bu basıncı oluşturmak için akışkana iş yapar. [[K6 s. 46]]</p>
${sekil('koruk','Körükten akciğere basıncı izleyin','Sabit basınçla inspirasyon modelinde hareketli yüzü, körüğü ve akciğere giden yolu bulun. [[K6 s. 46–47]]')}
<p>Klinikte ventilatör, akciğere hava girişine ve akciğerden hava çıkışına yardım eden sistemdir. [[K6 s. 46]] Körüğün kesit alanı <i>A</i> (m²), hareketli yüzün aldığı yol <i>d</i> (m) olsun. [[K6 s. 46]] Kuvvet <i>F</i> (N) yüzeye yayıldığında basınç <i>P</i> = <i>F</i>/<i>A</i> (Pa), yer değiştiren hacim ise <i>ΔV</i> = <i>A</i> · <i>d</i> (m³) olur. [[K6 s. 46–47]]</p>
<p>Önce kuvvet yerine <i>P</i> · <i>A</i> yazın, sonra alanla yolun çarpımını hacim olarak okuyun: <i>W</i> = <i>F</i> · <i>d</i> = <i>P</i> · <i>A</i> · <i>d</i> = <i>P</i> · <i>ΔV</i>. [[K6 s. 46–48]] Bu son çarpım, basıncın sabit kaldığı inspirasyonun işini joule olarak verir. [[K6 s. 46–48]]</p>
${sekil('alan','Verilen hacim değişince körük işi','Dikdörtgenin genişliği körük basıncı, yüksekliği verilen hacimdir. [[K6 s. 46–48]]')}
<div class="fk03-okuma"><h3>Şekli okuyun · Birimlerden işe</h3>
<p>Basıncı değiştirmeden verilen hacmi artırın. Dikdörtgenin genişliği aynı kalır, üst kenarı yükselir; körük daha uzun bir yol boyunca kuvvet uyguladığı için yapılan iş büyür. [[K6 s. 46–48]]</p>
<p>Çarpımın birimini iki yoldan kontrol edebilirsiniz: Pa·m³ = (N/m²) · m³ = N·m = J. [[K6 s. 43–48]] Hacmi litre, basıncı kilopascal olarak kullanırsanız kPa·L de joule verir; basınçtaki bin çarpanı ile hacim dönüşümündeki binde bir çarpanı birbirini götürür. [[K6 s. 47–48]]</p>
<p>Örnekteki 450 sayısını doğrudan 0,8 ile çarpmadan önce hacim birimine bakın: 450 mL ile 0,45 L aynı soluğu anlatır, fakat kPa cinsinden basınçla çarpılacak litre değeri 0,45’tir. [[K6 s. 47–48]]</p></div>
<div class="fk03-hesap"><h3>Çözümlü örnek · Bir inspirasyon</h3>
<p>450 mL’lik soluk 0,8 kPa sabit basınçla veriliyor. [[K6 s. 47–48]] Önce hacmi ve basıncı SI birimlerine çevirin. [[K6 s. 48]]</p>
<ul><li>450 mL = 0,45 L = 4,5 × 10<sup>−4</sup> m³. [[K6 s. 48]]</li><li>0,8 kPa = 0,8 × 10<sup>3</sup> Pa. [[K6 s. 48]]</li><li>Bir solukta iş = (0,8 × 10<sup>3</sup>) × (4,5 × 10<sup>−4</sup>) = <b>0,36 J</b>. [[K6 s. 48]]</li></ul></div>
</section>
<section class="wrap blk ders-sec" id="fk03-dongu">
<h2>Aynı basınçta neden iki farklı hacim var?</h2>
<p class="intro">Körükte basınç sabit tutulsa bile akciğer basıncı hava yolu direnci nedeniyle dolum boyunca daha yavaş yükselir. [[K6 s. 47–48]]</p>
${sekil('dongu','Aynı basınçta iki kolu karşılaştırın','Döngü nitel bir çizimdir; eğrinin biçimi ve alanların oranı ölçüm değeri vermez. [[K6 s. 47–49]]')}
<p><b>Dış sınır.</b> Körük basıncı yatay, hacim dikey eksene konduğunda bir inspirasyon ve ekspirasyonun çevrelediği dikdörtgen alan ventilatörün işidir. [[K6 s. 47–48]] Akciğerin hacmi en küçük ve en büyük değerindeyken akım durur ve körük ile akciğerin basınçları eşitlenir. [[K6 s. 48]]</p>
<p><b>İç döngü.</b> Akciğer genişlerken bağ dokusunun ve göğüs duvarının elastik kuvvetleriyle alveollerdeki yüzey gerilimi aşılır. [[K6 s. 48]] Gerilmiş akciğer boşalırken dolum yolunu geri izlemez; aynı basınçta ekspirasyon hacmi inspirasyon hacminden büyüktür. [[K6 s. 48–49]] Elastik cisimlerin gerilme geçmişine bağlı bu davranışına <b>histerezis</b> denir. [[K6 s. 48–49]]</p>
<div class="fk03-okuma"><h3>Şekli okuyun · Nokta, eğim, alan</h3>
<p>Önce dış sınırı izleyin: yatay eksende burada okunan basınç körükte ölçülür. [[K6 s. 47]] İç döngüye geçtiğinizde aynı eksenden bu kez akciğerdeki basıncı okuyun. [[K6 s. 47–48]] Bu iki basıncı yalnızca akımın durduğu uçlarda birbirinin yerine kullanabilirsiniz. [[K6 s. 48]]</p>
<p>İki ucun arasında bir konum seçin. Dikey çizginin alt ve üst kesişimleri, seçtiğiniz tek bir basınca ait iki ayrı hacimdir. [[K6 s. 48–49]] Bu farkı görmek için bir nokta çifti yeterlidir; çevrimde kaybedilen enerjiyi görmek için ise kapalı yolun tamamını izlemek gerekir. [[K6 s. 48–49]]</p></div>
<p>Şekilde dikey çizgiyi uçtan uca taşırken döngünün iki kolunun nerede birleştiğine bakın. Ekspirasyon sonunda başlangıç hacmine dönülmesi, inspirasyonda aktarılan enerjinin tamamının geri kazanıldığı anlamına gelmez; iki farklı yolun arasında bir alan kalır. [[K6 s. 48–49]]</p>
<p><b>İki ayrı kayıp.</b> Akciğer döngüsünün içi bir çevrimde akciğer ve göğüs duvarında kaybedilen enerjiyi gösterir. [[K6 s. 48–49]] Dış dikdörtgenin bu döngü dışında kalan bölümü ise hava yolu direncine bağlı sürtünme kaybıdır. [[K6 s. 48]]</p>
</section>
<section class="wrap blk ders-sec" id="fk03-kompliyans">
<h2>Kompliyans: basınç değişimine karşılık gelen hacim</h2>
<p class="intro">İnce duvarlı bir balon, kalın duvarlı olana göre daha az çabayla şişer; kolay genişleyen balonun kompliyansı daha yüksektir. [[K6 s. 49]]</p>
${sekil('egim','Aynı hacme ulaşmak için gereken basınç','Doğrular yalnızca eğim karşılaştırmasıdır; hasta ölçümü değildir. [[K6 s. 49–50]]')}
<p><i>C</i> = <i>ΔV</i>/<i>ΔP</i> ifadesinde <i>ΔV</i> hacim değişimi, <i>ΔP</i> buna karşılık gelen basınç değişimidir. [[K6 s. 49]] Basıncın yatay, hacmin dikey eksende olduğu grafikte kompliyansı eğim verir; kitap akciğer histerezisiyle ilişkili olarak ekspirasyon kolunda daha yüksek kompliyans tarif eder. [[K6 s. 49–50]] Elastans, kompliyansın çarpmaya göre tersidir (<i>E</i> = 1/<i>C</i>). [[K6 s. 50]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap kompliyans birimini m·N<sup>−1</sup> verir. [[K6 s. 50]] Doğrusu, solunum kompliyansının <i>ΔV</i>/<i>ΔP</i> tanımından çıkan m³·Pa<sup>−1</sup>, elastansınki ise Pa·m<sup>−3</sup> birimidir. [[K6 s. 49–50]]</div>
<div class="fk03-okuma"><h3>Şekli okuyun · Yatay çizgiyi sabit tutun</h3>
<p>Yüksek kompliyansı seçip hedef hacim çizgisinin eğriyi kestiği noktadan basınç eksenine inin. Düşük kompliyansa geçince aynı yatay çizgi daha sağda kesişir: fark hacimde değil, bu hacme ulaşmak için gereken basınç artışındadır. [[K6 s. 49–50]]</p>
<p>Şimdi soruyu tersinden sorun: aynı basınç artışında hangi akciğer daha çok genişler? Hacim değişimini basınç değişimine böldüğünüzde daha büyük bir oran veren, yani eğimi daha dik olan akciğer daha çok genişler. [[K6 s. 49–50]]</p></div>
<p>Solunum sisteminin ne kadar kolay genişlediğini hem akciğerin hem göğüs duvarının kompliyansı belirler. [[K6 s. 50]]</p>
<div class="cols"><div class="card"><h3>Yüksek kompliyans · Boşalma güçleşir</h3><p>Yaşlanmayla akciğerin elastikiyeti azalır, kompliyansı artar; amfizem bu değişimi hızlandırabilir. [[K6 s. 50]] Elastik geri çekilme azalınca pasif ekspirasyon yetersiz kalır ve ekspirasyon kaslarına daha çok iş düşer. [[K6 s. 50]]</p></div>
<div class="card"><h3>Düşük kompliyans · Dolum güçleşir</h3><p>Sert akciğere aynı hacmi almak için daha yüksek inspirasyon basıncı ve daha fazla kas işi gerekir. [[K6 s. 50]] Atelektazi, pulmoner fibrozis, sürfaktan eksikliği, ödem ve pnömoni örnektir. [[K6 s. 50–51]]</p></div></div>
</section>
<section class="wrap blk ders-sec" id="fk03-soluk">
<h2>Spontan solunumun mekanik ve metabolik bedeli</h2>
<p class="intro">İnspirasyonda kasların yaptığı işin bir bölümü akciğerde elastik potansiyel enerji olarak depolanır ve ekspirasyonda geri kazanılır. [[K6 s. 51]]</p>
${sekil('soluk','Dakikadaki soluk sayısından mekanik güce','Hesapta her soluk için 0,36 J alınmıştır. [[K6 s. 51]]')}
<ol class="iskelet"><li><b>Göğüs genişler.</b> Elastik akciğeri, göğüs duvarının içini döşeyen plevraya tutunması açık tutar. [[K6 s. 51]] Diyafram 1–1,5 cm aşağı inerken interkostal kaslar göğüs kafesini dışa doğru hareket ettirir ve göğüs boşluğu genişler. [[K6 s. 51]]</li>
<li><b>Hava içeri girer.</b> İntraplevral basınç atmosfer basıncının altına iner, akciğer basıncı hafifçe düşer ve basınç farkını dengelemek üzere ağız ve burundan hava girer. [[K6 s. 51]]</li>
<li><b>Geri çekilme.</b> Kaslar gevşeyince elastik akciğer dokusu ve alveoler yüzey gerilimi pasif ekspirasyonu sağlar. [[K6 s. 51]] Mekanik enerjinin geri çekilmede kullanılamayan kısmı histerezis ve hava yolu direnciyle kaybedilir. [[K6 s. 51]]</li></ol>
<div class="fk03-hesap"><h3>Çözümlü örnek · Dinlenimde solunum gücü</h3>
<p>Bir inspirasyon yaklaşık 0,36 J ve solunum sayısı dakikada 15 ise mekanik güç 0,36 × 15/60 = 0,09 W = <b>90 mW</b> olur. [[K6 s. 51]]</p>
<p>Kaslara sağlanan enerjinin yaklaşık %90’ı ısıya dönüşür; yalnızca %10’u genişleme için mekanik işe gider. [[K6 s. 51]] Bu nedenle gereken metabolik güç 90/0,10 = <b>900 mW</b>, yani dinlenimdeki toplam 80–90 W’ın yaklaşık %1’idir. [[K6 s. 51]]</p></div>
<p>Enerji hesabını üç basamakta izleyin. İlk ayrım, kasa gelen enerjinin ısı ve mekanik çıktı olarak bölünmesidir. [[K6 s. 51]] İkinci ayrım, mekanik çıktının bir bölümünün elastik enerji olarak depolanmasıdır. [[K6 s. 51]] Son basamak, kas gevşediğinde bu depodan geri gelen enerji ile çevrimde kaybedilen enerjiyi ayırt etmektir. [[K6 s. 51]]</p>
<div class="fk03-okuma"><h3>Bir soluğun hesabını bir dakikaya taşıyın</h3>
<p>Dakikada 15 kez yapılan 0,36 J’lük iş bir dakikada 5,4 J eder. [[K6 s. 51]] Gücü watt olarak söylemek için bu enerjiyi 60 saniyeye bölün; 5,4 J/dk ile 0,09 J/s aynı mekanik çıktıyı anlatır. [[K6 s. 51]]</p>
<p>Şimdi bu çıktıyı hangi girdinin sağladığını sorun. Mekanik güç toplamın onda biri olduğundan girdi gücünü bulurken 0,10’a bölersiniz. [[K6 s. 51]] Ters yönde kontrol için 0,9 W’ın onda birini alın; yine bir dakikalık soluklardan hesapladığınız 0,09 W’a ulaşırsınız. [[K6 s. 51]]</p></div>
<p>Dinlenimde elde ettiğiniz oranı hesaplarken pay ile paydanın aynı tür gücü göstermesine dikkat edin: toplam metabolik gücün içinde solunuma giden payı aradığınız için paya 0,9 W girer. [[K6 s. 51]] Mekanik çıkış olan 0,09 W’ı kullanırsanız solunum kaslarında ısıya dönüşen enerjiyi bu karşılaştırmanın dışında bırakmış olursunuz. [[K6 s. 51]]</p>
<p>Olağan solunumda pek hissedilmeyen çaba, hava yolu direnci çok yükseldiğinde kişiyi tüketebilir. [[K6 s. 51]] Egzersizde soluk hacmi, solunum sayısı ve hava yolu direnci artar; ağır egzersizde solunumun payı toplam metabolizmanın %25’ine çıkabilir. [[K6 s. 51]]</p>
</section>
<section class="wrap blk ders-sec" id="fk03-akim">
<h2>Akım arttığında güç gereksinimi</h2>
<p class="intro">Tüpte sabit bir basınç farkıyla taşınan hacim iki katına çıkarsa yapılan iş de iki katına çıkar; bunu aynı sürede yapmak iki kat güç ister. [[K6 s. 52]]</p>
${sekil('akim','Akımı artırın: güç kendi başlangıç değerinin kaç katına çıkar?', 'Her eğri kendi başlangıç değerine göre ölçeklenmiştir; mutlak güçleri karşılaştırmayın. [[K6 s. 52]]')}
<p>Akışkanı iten basınç farkı <i>ΔP</i> (Pa), taşınan hacim <i>V</i> (m³) ise iş <i>W</i> = <i>ΔP</i> · <i>V</i> olur. [[K6 s. 52]] Basınç farkı sabitken iki tarafı zamana böldüğümüzde güç <i>Ẇ</i> = <i>ΔP</i> · <i>Q</i> (W) bulunur; <i>Q</i> = <i>V̇</i> hacimsel akım (m³/s), sembol üzerindeki nokta zamana göre değişim hızıdır. [[K6 s. 52]]</p>
<ul class="ozet"><li><b>Laminer akım.</b> Küçük hava yollarında hız daha düşüktür ve laminer akım baskındır. [[K6 s. 52]] Basınç farkı akımla doğru orantılı olduğundan (<i>ΔP</i> ∝ <i>Q</i>) güç akımın karesiyle artar (<i>Ẇ</i> ∝ <i>Q</i>²). [[K6 s. 52]]</li>
<li><b>Türbülanslı akım.</b> Normal solunumda iki akım biçimi birlikte görülür ve büyük hava yollarında türbülans baskındır. [[K6 s. 52]] Kitap aynı akımı sürdürmek için türbülanslı akımın laminer akımdan daha fazla güç gerektirdiğini belirtir. [[K6 s. 52]]</li></ul>
<div class="note plain"><b>Atlas notu.</b> Kitap türbülanslı akımı anlatan cümlede akımı basıncın karesiyle ilişkilendirir. [[K6 s. 52]] Doğrusu <i>ΔP</i> ∝ <i>Q</i>², dolayısıyla <i>Ẇ</i> ∝ <i>Q</i>³ ilişkisidir. [[K6 s. 52]]</div>
<div class="fk03-okuma"><h3>Şekli okuyun · Akımın iki katına çıkması</h3>
<p>Laminer akımda iki kat akım için iki kat basınç farkı gerekir. [[K6 s. 52]] Güç hesabında bu iki değişken çarpıldığı için yeni güç, başlangıçtaki laminer akım gücünün dört katıdır. [[K6 s. 52]]</p>
<p>Türbülans eğrisini düzeltilmiş bağıntıyla okuyun. Basınç farkı dört katına çıkarken akım iki katına çıktığında güç, türbülanslı akımın kendi başlangıç gücünün sekiz katına ulaşır. [[K6 s. 52]] Bu nedenle grafiğin başındaki ortak nokta, her iki güç için de kendi başlangıç değerinin seçildiğini belirtir. [[K6 s. 52]]</p></div>
<p><b>İş mi, güç mü?</b> Belirli bir gaz hacmini taşımak için gereken enerjiyi soruyorsanız basınç farkını hacimle çarpın. [[K6 s. 52]] Aynı akımı sürdürürken her saniye ne kadar enerji gerektiğini soruyorsanız çarpımda hacmin yerini saniyede taşınan hacim alır. [[K6 s. 52]] Hızlı solunumun kaslara yükünü yorumlarken bu ikinci hesap özellikle önem kazanır. [[K6 s. 52–53]]</p>
<p><b>Hiperventilasyon.</b> Hızlı solunum akımı ve türbülansı artırdığında solunum kasları daha fazla enerji harcar. [[K6 s. 52]] Kasların ek oksijen gereksinimi hızlanan solunumun kazandırdığı oksijeni aşarsa hipoksi gelişebilir. [[K6 s. 52–53]] Solunum hastalığında tıbbi girişimle solunumun aşırı uyarılması bu nedenle hipoksi tehlikesi doğurabilir. [[K6 s. 53]]</p>
</section>
<section class="wrap blk ders-sec" id="fk03-kalp">
<h2>Kalbin iki pompası bir çevrimde ne kadar iş yapar?</h2>
<p class="intro">Kalp damar ağının direncini yenerek kanı hareket ettirir; metabolik enerji akan kanın kinetik enerjisine dönüşür. [[K6 s. 53]] Sağ ventrikül pulmoner, sol ventrikül sistemik dolaşıma kan pompalar. [[K6 s. 53]]</p>
${sekil('kalp','Sol ventrikülün bir çevrimini izleyin','Basınç ve hacmin çevrim boyunca birlikte değişimi şematiktir; eksenler mutlak değer vermez. [[K6 s. 53]]')}
<p>Sol ventrikül grafiğini okurken solunum grafiğindeki eksen sırasına dikkat edin. Solunum döngüsünde yatay konum basıncı verirken burada yatay konum ventrikül içindeki kan hacmini verir. [[K6 s. 47–49]] [[K6 s. 53]] Bir atımın basıncı çevrim boyunca değişir; aşağıdaki hesapta her anın basıncını tek tek okumak yerine kitapta verilen ortalama ventrikül basınçlarını kullanın. [[K6 s. 53–54]]</p>
<p>Sağ ventrikülün yaptığı iş, sol ventrikül işinin yaklaşık beşte biridir. [[K6 s. 53]] Bunun hesabında iki ventrikül için atım hacmini aynı alıp her birini kendi ortalama basıncıyla çarparız. [[K6 s. 54]]</p>
<div class="fk03-hesap"><h3>Çözümlü örnek · Atım işinden kalp gücüne</h3><p>Kalp hızı 80 atım/dk, bir çevrimde atılan hacim <i>ΔV</i> = 75 mL = 7,5 × 10<sup>−5</sup> m³ olsun. [[K6 s. 54]]</p>
<ol><li><b>Sol ventrikül.</b> Ortalama basınç 100 mmHg ≈ 13,3 kPa olduğunda iş 13,3 × 10³ × 7,5 × 10<sup>−5</sup> = 0,9975 J ≈ 1 J’dür. [[K6 s. 54]]</li>
<li><b>Sağ ventrikül.</b> Ortalama basınç 20 mmHg ≈ 2,7 kPa olduğunda iş 2,7 × 10³ × 7,5 × 10<sup>−5</sup> = 0,2025 J ≈ 0,2 J’dür. [[K6 s. 54]]</li>
<li><b>İki ventrikül birlikte.</b> Çevrim başına iş 1 + 0,2 = <b>1,2 J</b>; mekanik güç 1,2 × 80/60 = <b>1,6 W</b> olur. [[K6 s. 54–55]]</li></ol></div>
<div class="fk03-okuma"><h3>Hesabı basınç oranıyla kontrol edin</h3>
<p>Önce her iki ventrikülün aynı atım hacmini pompaladığını göz önüne alın. [[K6 s. 54]] Sağ ventrikülün 20 mmHg’lik ortalama basıncı, sol ventrikülün 100 mmHg’lik basıncının beşte biri olduğundan atım işi de yaklaşık beşte bir olmalıdır. [[K6 s. 53–54]]</p>
<p>İşleri topladığınızda sonucun birimi hâlâ joule’dür; iki ventrikülün tek bir çevrimde yaptığı işi buldunuz. [[K6 s. 54]] Güce geçerken bu toplamı saniyede kaç çevrim yapıldığıyla çarpın: dakikadaki 80 atımı saniyeye çevirdiğinizde sonuç joule/saniye, yani watt olur. [[K6 s. 45–46]] [[K6 s. 54–55]]</p>
<p>Örnekteki 1,6 W değeri verilen atım hacmi, ortalama basınçlar ve kalp hızı için hesaplanan mekanik çıktıdır. [[K6 s. 54–55]] Dinlenim için verilen yaklaşık değerle karşılaştırırken ikisinin de mekanik çıkış gücünü anlattığına dikkat edin. [[K6 s. 53–55]]</p></div>
<p>İki pompanın toplam işini hesaplarken aynı hacmi iki kez görmek şaşırtıcı olabilir. Sağ ventrikül bu kanı pulmoner dolaşıma, sol ventrikül sistemik dolaşıma pompalar; her biri kendi dolaşımının direncini yenmek için enerji aktarır. [[K6 s. 53–54]] Bu nedenle kalbin toplam mekanik çıktısına her iki ventrikülün katkısı girer. [[K6 s. 54]]</p>
<p>Dinlenimde kalbin tipik mekanik çıkış gücü yaklaşık 1,3 W’tır. [[K6 s. 53]] Girdinin yaklaşık %10’u mekanik işe, %90’ı ısıya dönüştüğünden bunun için yaklaşık 13 W gerekir. [[K6 s. 54]] Egzersizde hem kalp hızının hem kan basıncının yükselmesi kalbin iş yapma hızını artırır. [[K6 s. 53]]</p>
</section>
<section class="wrap blk ders-sec" id="fk03-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
<div class="viz"><div data-viz="mtf" data-q="fk03-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk03-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk03-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk03-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Bir ventilatör 0,8 kPa sabit körük basıncıyla 450 mL soluk veriyor. [[K6 s. 47–48]] Körüğün yaptığı işi nasıl hesaplarsınız? Aynı soluğun akciğerdeki basınç–hacim kaydını nasıl yorumlarsınız?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Basınç kuvvetin alana oranı, körüğün süpürdüğü hacim alan ile yolun çarpımıdır; buradan <i>W</i> = <i>P</i> · <i>ΔV</i> elde edilir. [[K6 s. 46–48]]</li>
<li>800 Pa × 0,00045 m³ = 0,36 J; bu, tek inspirasyonda körüğün yaptığı iştir. [[K6 s. 47–48]]</li>
<li>Akım varken direnç nedeniyle körük ve akciğer basınçları ayrılır, akımın durduğu iki uçta eşitlenir. [[K6 s. 48]]</li>
<li>Akciğer döngüsünün iç alanı dokudaki çevrim kaybını, dış dikdörtgende kalan alan hava yolu sürtünmesini gösterir. [[K6 s. 48–49]]</li></ol>
<div class="note"><b>Çizin.</b> Yatayda basınç, dikeyde hacim olacak şekilde körüğün dikdörtgenini ve içine akciğerin histerezis döngüsünü çizin; aynı basınçta ekspirasyon kolunu üstte işaretleyin. [[K6 s. 47–49]]</div>
<h3>Ek sorular</h3><ul><li>Bu soluk dakikada 15 kez tekrarlanırsa mekanik güç kaç mW olur? [[K6 s. 51]]</li><li>Aynı hacim için daha yüksek basınç gerekiyorsa kompliyansı nasıl yorumlarsınız? [[K6 s. 49–50]]</li><li>Hasta daha hızlı soluduğunda ek oksijen kazancını hangi mekanizma sınırlayabilir? [[K6 s. 52–53]]</li></ul></section>
<section class="wrap blk ders-sec" id="fk03-ozet"><h2>Özet</h2><ul class="ozet">
<li>Enerji iş yapma kapasitesi, iş sistemler arasında aktarılan enerji, güç ise bu aktarımın hızıdır; enerji yoktan var olmaz ve yok olmaz. [[K6 s. 43–46]]</li>
<li>Ventilatör işi sabit basınç ile verilen hacmin çarpımıdır; akciğeri genişletmek ve hava yolu direncini yenmek enerji gerektirir. [[K6 s. 46–48]]</li>
<li>Hacim–basınç grafiğinde eğim kompliyansı, akciğer döngüsünün alanı çevrimde kaybedilen enerjiyi gösterir. [[K6 s. 48–50]]</li>
<li>Türbülans arttığında solunumun güç gereksinimi artar. [[K6 s. 52]] Solunum kaslarının ve kalbin mekanik verimi yaklaşık %10’dur. [[K6 s. 51]] [[K6 s. 54–55]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="03"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/02">← Basit mekanik: kuvvet, basınç, viskozite ve yüzey gerilimi</a><a href="#/dersler/fizik/04a">Sonraki: Isı, sıcaklık, ısı aktarımı ve siyah cisim ışıması →</a></nav></section>`,
  };
})();
