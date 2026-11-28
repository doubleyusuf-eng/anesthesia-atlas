VERI.sorular = VERI.sorular || {};
VERI.sorular['fk09a-1'] = {
  no: 1, kok: 'İdeal gaz ve standart koşullar', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 159–160]]',
  onermeler: [
    { t: 'İdeal gaz modelinde moleküller arasında belirgin çekim vardır.', d: false, n: 'Modelde moleküller yeterince uzaktır ve aralarındaki çekim ihmal edilir. [[K6 s. 159]]' },
    { t: 'Moleküller rastgele hareket eder ve elastik çarpışır.', d: true, n: 'Rastgele hareket Newton yasalarına uyar ve çarpışmalar elastiktir. [[K6 s. 159]]' },
    { t: 'Yoğuşmaya yaklaşan bir gaz için ideal gaz yaklaşımının doğruluğu artar.', d: false, n: 'Yoğuşma yakınında yaklaşımın doğruluğu azalır. [[K6 s. 159]]' },
    { t: 'Kitaptaki standart sıcaklık 273,15 K’dir.', d: true, n: 'STP için sıcaklık 0 °C, yani 273,15 K alınır. [[K6 s. 160]]' },
    { t: 'Gazın basıncı tek bir molekülün hareket özelliğidir.', d: false, n: 'Basınç gazın bütününü tanımlar, tek molekül için hız ve momentum kullanılabilir. [[K6 s. 159]]' }
  ]
};
VERI.sorular['fk09a-2'] = {
  no: 2, kok: 'Avogadro yasası ve madde miktarı', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 160–163]]',
  onermeler: [
    { t: 'Aynı sıcaklık ve basınçta eşit hacimdeki helyum ve ksenon eşit sayıda tanecik içerir.', d: true, n: 'Avogadro yasasında bu koşullarda tanecik sayısı gazın türünden bağımsızdır. [[K6 s. 160]]' },
    { t: 'STP’de bir mol ideal gaz 22,4 L hacim kaplar.', d: true, n: 'Kitaptaki standart koşullarda molar hacim 22,4 L/mol’dür. [[K6 s. 160]]' },
    { t: '11 g diazot monoksit bir mol madde içerir.', d: false, n: '11 g, molar kütle olan 44 g/mol’e bölündüğünde 0,25 mol bulunur. [[K6 s. 161–162]]' },
    { t: '0,2 mol izofluranın kütlesi 36,9 g’dır.', d: true, n: '0,2 mol × 184,5 g/mol = 36,9 g. [[K6 s. 162]]' },
    { t: 'Eşit sıcaklık ve basınçta nemli hava kuru havadan daha yoğundur.', d: false, n: 'Eşit hacimde tanecik sayısı aynı kalırken su buharı ortalama molar kütleyi düşürür. [[K6 s. 162–163]]' }
  ]
};
VERI.sorular['fk09a-3'] = {
  no: 3, kok: 'Kısmi basınç ve solunan gazın nemlendirilmesi', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 163–166]]',
  onermeler: [
    { t: 'Atmosfer basıncı, havadaki gazların kısmi basınçlarının ortalamasıdır.', d: false, n: 'Dalton yasasına göre kısmi basınçlar toplanır. [[K6 s. 163–164]]' },
    { t: 'Sabit hacim ve sıcaklıkta helyum uzaklaştırılırsa kalan oksijenin basıncı önceki oksijen kısmi basıncına eşittir.', d: true, n: 'Helyumun duvarlara çarpmaktan doğan katkısı ortadan kalkar. [[K6 s. 163]]' },
    { t: 'Ortam havasının su buharı basıncı yerel koşullara bağlıdır.', d: true, n: 'Ortam havasındaki su buharı basıncı sabit değildir; başka değer verilmedikçe 1,3 kPa alınır. [[K6 s. 164]]' },
    { t: '37 °C’de doymuş su buharının basıncı toplam hava basıncından bağımsızdır.', d: true, n: 'Bu sıcaklıkta doymuş su buharı basıncı 6,3 kPa’dır. [[K6 s. 164]]' },
    { t: 'Deniz seviyesinde solunan hava nemlenirken toplam basınç sabit kalır.', d: true, n: 'Su buharının payı artarken diğer gazların payı azalır ve toplam 101,3 kPa kalır. [[K6 s. 164–165]]' }
  ]
};

const FK09A_NAV = [
  ['ideal', 'İdeal gaz'], ['avogadro', 'Avogadro yasası'], ['mol', 'Molden kütleye'],
  ['yogunluk', 'Nem ve yoğunluk'], ['dalton', 'Dalton yasası'], ['nem', 'Solunan oksijen'],
  ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet']
];
SAYFALAR['dersler/fizik/09a'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 9 · Ders 09a', baslik: 'İdeal gaz, Avogadro yasası ve kısmi basınç',
  lede: 'Aynı hacimdeki iki gazın tanecik sayısı ne zaman eşittir? Soluduğumuz hava nemlenirken toplam basınç sabitse oksijenin payı nasıl değişir?',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${FK09A_NAV.map(([id, ad]) => `<button type="button" data-scroll="fk09a-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk09a-ideal">
<h2>İdeal gaz modelinde neyi ölçeriz?</h2>
<p class="intro">Gaz yasaları sıcaklık veya basınç değiştiğinde gazın nasıl davranacağını ideal gaz modeliyle öngörür. [[K6 s. 159]]</p>
<div class="viz"><div class="viz-head"><h3>Bir molekülden gazın bütününe</h3></div><div data-viz="fk09a_ideal"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Ölçek seçin. Ok bir molekülün anlık hareketini, kap ise makroskopik ölçümün kapsadığı gaz örneğini temsil eder. [[K6 s. 159]]</p></div>
<ul><li><b>Uzaklık.</b> Moleküller birbirini çekmeyecek kadar uzak kabul edilir. [[K6 s. 159]]</li>
<li><b>Hacim.</b> Moleküllerin kendi hacmi, gazın kapladığı hacme göre ihmal edilir. [[K6 s. 159]]</li>
<li><b>Hareket.</b> Moleküller Newton yasalarına uyarak rastgele hareket eder ve küçük lastik toplar gibi elastik çarpışır. [[K6 s. 159]]</li></ul>
<p>Tek molekülün hızı, momentumu ve kinetik enerjisi vardır. [[K6 s. 159]] Moleküler ölçekte ortalama çevresinde büyük dalgalanmalar görülür. [[K6 s. 159]] Hacim, sıcaklık ve basınç ise gazın bütününü makroskopik ölçekte tanımlar. [[K6 s. 159]]</p>
<p>Doğada tam ideal gaz yoktur, ancak gerçek gazlar oda sıcaklığında ve atmosfer basıncında genellikle modele yaklaşır. [[K6 s. 159]] Çok yüksek basınçta, çok düşük sıcaklıkta veya gaz yoğuşmak üzereyken tahminin doğruluğu azalır. [[K6 s. 159]]</p>
<div class="fk09a-kart"><h3>Standart sıcaklık ve basınç (STP)</h3><p>Kitap STP için 0 °C (273,15 K) ve deniz seviyesindeki atmosfer basıncını, yani 101,3 kPa (760 mmHg) alır. [[K6 s. 159–160]]</p></div>
<p>“STP’de” ifadesi, anlatılanın olağan koşullar için geçerli olduğunu kısaca bildirir. [[K6 s. 159–160]]</p>
</section>
<section class="wrap blk ders-sec" id="fk09a-avogadro">
<h2>Helyum, oksijen ve ksenon balonları</h2>
<p class="intro">Avogadro yasasına göre aynı sıcaklık ve basınçta eşit hacimdeki gazlar eşit sayıda tanecik içerir. [[K6 s. 160]]</p>
<div class="viz"><div class="viz-head"><h3>Gazı değiştirin, hacmi sabit tutun</h3></div><div data-viz="fk09a_balon"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Balon ve tanecikler şematiktir. [[K6 s. 160]]</p></div>
<p>Helyum, oksijen ve ksenon balonlarında gazın kapladığı hacmi taneciklerin kendi büyüklüğü belirlemez. [[K6 s. 160]] STP’de bir mol ideal gazın hacmi 22,4 L’dir. [[K6 s. 160]]</p>
<p>Madde miktarının birimi mol, SI sisteminin yedi temel biriminden biridir. [[K6 s. 160]] Bir moldeki tanecik sayısını veren sabit adını İtalyan bilim insanı Avogadro’dan alır ve yaklaşık 6,02 × 10<sup>23</sup> mol<sup>−1</sup> değerindedir. [[K6 s. 160]]</p>
<p>Kitabın benzetmesinde bu sayıda ananas Dünya’nın hacmini doldurur, bir mol katı karbon ise kabaca bir kurşun kalemin içindeki grafite karşılık gelir. [[K6 s. 160]] Kitap molü 12 g karbon-12’deki yaklaşık 6,02 × 10<sup>23</sup> atom üzerinden tanıtır. [[K6 s. 161]]</p>
<aside class="fk09a-not"><b>Atlas notu</b><p>Kitap molü karbon-12’nin kütlesiyle tanımlar. [[K6 s. 161]] Güncel SI tanımı, belirtilen türden taneciklerin sayısını bir mol için tam 6,02214076 × 10<sup>23</sup> olarak sabitler. [[K6 s. 161]]</p></aside>
<p>Balonları karşılaştırırken önce sıcaklık ve basıncı eşitleyin, sonra hacimlerine bakın. [[K6 s. 160]] Bu üç koşul sağlandığında bir balondaki tanecik sayısını biliyorsanız diğer ikisindekini de bilirsiniz. [[K6 s. 160]] Aynı karşılaştırmadan kütlelerin eşit olduğu sonucu çıkmaz, çünkü bir molün kütlesi maddenin türüne bağlıdır. [[K6 s. 160–161]]</p>
<p>Taneciği sayarken helyum ve ksenon için tek atomu, oksijen için O₂ molekülünü bir bütün olarak alın. [[K6 s. 160–162]] Oksijen balonunda her iki atomu ayrı saymak, Avogadro yasasındaki karşılaştırmayı atom sayılarıyla yapılan başka bir karşılaştırmaya dönüştürür. [[K6 s. 160–162]]</p>
</section>
<section class="wrap blk ders-sec" id="fk09a-mol">
<h2>Kütleden mol ve molekül sayısına</h2>
<p class="intro">Molar kütle, bir mol taneciğin kütlesidir ve g·mol<sup>−1</sup> ile ifade edilir. [[K6 s. 161]]</p>
<div class="viz"><div class="viz-head"><h3>Tartılan N₂O miktarını değiştirin</h3></div><div data-viz="fk09a_kutle"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Yatay eksenden seçtiğiniz kütleyi doğruya kadar izleyin ve karşılık gelen mol değerini düşey eksenden okuyun. [[K6 s. 161–162]] Doğrunun eğimi N₂O’nun molar kütlesinin tersidir. [[K6 s. 161]]</p></div>
<p>Bağıl molekül kütlesini veren sayı, molar kütleyi g/mol cinsinden verir. [[K6 s. 161]] Örneğin suyun bağıl molekül kütlesi 18’dir ve bir mol su 18 g gelir. [[K6 s. 161]]</p>
<ul><li><i>n</i> = <i>m</i> / <i>M</i>. Kütleyi (<i>m</i>, g) molar kütleye (<i>M</i>, g/mol) bölünce madde miktarı (<i>n</i>, mol) bulunur. [[K6 s. 161]]</li>
<li><i>N</i> = <i>n</i> · <i>N</i><sub>A</sub>. Mol sayısı ile Avogadro sabitinin (<i>N</i><sub>A</sub>, mol<sup>−1</sup>) çarpımı tanecik sayısını (<i>N</i>, birimsiz) verir. [[K6 s. 160–161]]</li></ul>
<div class="fk09a-kart"><h3>11 g diazot monoksitte kaç molekül var?</h3><p>N₂O’da iki azot ve bir oksijen atomu bulunur. [[K6 s. 161]] Azot için 14, oksijen için 16 alındığında molar kütle (2 × 14) + 16 = 44 g/mol olur. [[K6 s. 161]]</p><p>11 g / (44 g/mol) = 0,25 mol. [[K6 s. 161–162]] Molekül sayısı 0,25 × 6,02 × 10<sup>23</sup> ≈ 1,51 × 10<sup>23</sup> olur. [[K6 s. 161–162]]</p></div>
<div class="fk09a-kart"><h3>0,2 mol izofluran kaç gramdır?</h3><p>Uçucu ajan izofluranın formülü C₃H₂ClF₅O, molar kütlesi 184,5 g/mol’dür. [[K6 s. 162]] <i>m</i> = <i>n</i> · <i>M</i> = 0,2 mol × 184,5 g/mol = <b>36,9 g</b>. [[K6 s. 162]]</p></div>
<p>Hesabın yönünü verilen birimden seçin. [[K6 s. 161–162]] İlk örnekte tartı gram verir ve g/mol’e bölmek gramı sadeleştirerek mol bırakır. [[K6 s. 161–162]] İkinci örnekte başlangıç mol olduğundan aynı dönüşüm ters yönde yapılır ve çarpımın birimi gram olur. [[K6 s. 162]] Molekül sayısı isteniyorsa bundan ayrı bir dönüşüm, Avogadro sabitiyle çarpma gerekir. [[K6 s. 160–162]]</p>
</section>
<section class="wrap blk ders-sec" id="fk09a-yogunluk">
<h2>Nemli hava neden daha az yoğundur?</h2>
<p class="intro">Aynı sıcaklık ve basınçta eşit hacimde kuru ve nemli hava alındığında tanecik sayıları eşittir. [[K6 s. 162]]</p>
<div class="viz"><div class="viz-head"><h3>Aynı hacimde hangi tanecikler bulunuyor?</h3></div><div data-viz="fk09a_yogunluk"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Noktalar taneciği temsil eder, nemli örneğin bileşimi şematiktir. [[K6 s. 162–163]]</p></div>
<div class="fk09a-kart"><h3>Bir mol havanın kütlesini tahmin edin</h3><p>Kuru havayı yaklaşık beşte bir O₂ (32 g/mol) ve beşte dört N₂ (28 g/mol) kabul edersek ortalama molar kütle (32 + 4 × 28) / 5 = 28,8 g/mol olur. [[K6 s. 161–163]]</p><p>Gerçek oranlar ve argon gibi daha ağır, az miktardaki bileşenler hesaba katıldığında değer yaklaşık 28,9 g/mol’dür. [[K6 s. 163]]</p><p>Su buharındaki H₂O molekülleri (18 g/mol) hava moleküllerinin bir kısmının yerini alır. [[K6 s. 161–163]] Hacim aynı kalırken kütle azaldığından yoğunluk düşer. [[K6 s. 163]]</p></div>
<p>Burada karşılaştırılan iki örnek aynı hacmi doldurur. [[K6 s. 162]] Bu nedenle nemli örneği düşünürken kuru örnekteki bütün tanecikleri tutup üzerlerine su molekülleri eklemek, Avogadro yasasındaki eşit sayı koşulunu bozar. [[K6 s. 162–163]] Şekilde bir taneciğin yerini değiştirerek kütledeki azalmanın hangi molekülden kaynaklandığını izleyebilirsiniz. [[K6 s. 162–163]]</p>
</section>
<section class="wrap blk ders-sec" id="fk09a-dalton">
<h2>Dalton yasası ve kabın duvarındaki basınç</h2>
<p class="intro">Her gazın molekülleri kabın duvarlarına çarpar ve toplam basınca kendi sayılarıyla ilişkili bir katkı yapar. [[K6 s. 163]]</p>
<div class="viz"><div class="viz-head"><h3>Kaptan yalnız helyumu uzaklaştırın</h3></div><div data-viz="fk09a_dalton"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Tanecik sayıları ve basınç payları şematiktir. [[K6 s. 163]]</p></div>
<p>Bir gazın karışımdaki katkısına <b>kısmi basınç</b> denir. [[K6 s. 163]] Dalton yasası bu katkıları toplar. [[K6 s. 163]]</p>
<div class="fk09a-kart"><p><i>P</i><sub>T</sub> = <i>P</i><sub>1</sub> + <i>P</i><sub>2</sub> + <i>P</i><sub>3</sub> + … [[K6 s. 163]]</p><p><i>P</i><sub>T</sub> toplam basıncı, her alt indis karışımı oluşturan bir gazın kısmi basıncını gösterir ve tüm terimler aynı basınç birimiyle, örneğin kPa ile yazılır. [[K6 s. 163–164]]</p></div>
<p>Helyum ile oksijen içeren kapta helyum uzaklaştırılırsa kalan basınç oksijenin başlangıçtaki kısmi basıncına eşittir. [[K6 s. 163]] Havadaki gazların kısmi basınçları toplandığında atmosfer basıncı bulunur: N₂ 78,1 + O₂ 20,9 + H₂O 1,28 + Ar 0,97 + CO₂ 0,05 = 101,3 kPa. [[K6 s. 164]]</p>
<aside class="fk09a-not"><b>Atlas notu</b><p>Kitabın bir cümlesi her bir gazın kısmi basıncını atmosfer basıncına eşitler. [[K6 s. 164]] Doğrusu, aynı sayfadaki şekil açıklamasında ve Dalton tanımında belirtildiği gibi, atmosfer basıncına eşit olanın bu katkıların toplamı olmasıdır. [[K6 s. 163–164]]</p></aside>
<p>Şekilde kabın duvarı her iki türün çarpışmalarını birlikte algılar. [[K6 s. 163]] Başlangıçtaki toplamdan helyumsuz kaptaki ölçümü çıkarırsanız fark helyumun ilk kısmi basıncını verir. [[K6 s. 163]] Aynı muhasebe havaya uygulandığında su buharına da ayrı bir pay ayırmak gerekir. [[K6 s. 164]]</p>
</section>
<section class="wrap blk ders-sec" id="fk09a-nem">
<h2>Nemlendirme solunan oksijenin payını nasıl değiştirir?</h2>
<p class="intro">Solunan hava nemlenirken deniz seviyesinde toplam basınç 101,3 kPa kalır, su buharına ayrılan pay artar. [[K6 s. 164–165]]</p>
<div class="viz"><div class="viz-head"><h3>Su buharı basıncını ortamdan doygunluğa taşıyın</h3></div><div data-viz="fk09a_nem"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Çubuğun tamamı atmosfer basıncını gösterir. [[K6 s. 164–165]] Kuru gazlara kalan kısmın 0,209’u oksijene aittir ve su buharı arttıkça oksijenin kullanabileceği pay küçülür. [[K6 s. 164–165]]</p></div>
<p>Ortamdaki su buharı basıncı yerel koşullara bağlıdır ve başka değer verilmemişse 1,3 kPa alınır. [[K6 s. 164]] Hava yolları solunan gazı nemlendirir ve alveole ulaşan gazda 37 °C’de suyun doymuş buhar basıncı olan 6,3 kPa’ya erişilir. [[K6 s. 164–165]]</p>
<p>Alveoldeki su buharı basıncı değişmez; bu doymuş buhar basıncı toplam hava basıncından bağımsızdır. [[K6 s. 164]] Yüksek irtifada oksijen kısmi basıncı zaten düşük olduğundan nemlenmeyle daha da azalması ciddi sonuçlar doğurabilir. [[K6 s. 164]]</p>
<div class="fk09a-kart"><h3>Kitabın hesabı · alveole giren gaz</h3><ol><li>Su buharındaki artış 6,3 − 1,3 = 5 kPa’dır. [[K6 s. 165]]</li><li>Kitap bu artışı toplamdan çıkarır ve 101,3 − 5 = 96,3 kPa üzerinden oksijen payını hesaplar. [[K6 s. 165–166]]</li><li>Oksijenin kuru havadaki oranı %20,9 (fraksiyon 0,209) alınır. [[K6 s. 165]] 0,209 × 96,3 ≈ 20,1 kPa ve ara sonucu yuvarlamadan 100 × (0,209 × 96,3) / 101,3 ≈ %19,9 bulunur. [[K6 s. 165–166]]</li></ol><p>Kitabın karşılaştırmasında oksijen oranı %20,9’dan %19,9’a iner, yani fark yaklaşık bir yüzde puanıdır. [[K6 s. 166]]</p></div>
<aside class="fk09a-not"><b>Atlas notu</b><p>Kitap kuru hava fraksiyonu 0,209’u yalnızca eklenen 5 kPa’yı çıkardıktan sonra uygular. [[K6 s. 165–166]] Kuru gaz basıncını bulmak için su buharının tamamı çıkarılır, böylece 0,209 × (101,3 − 6,3) ≈ 19,9 kPa ve oksijen oranı ≈ %19,6 olur. [[K6 s. 164–166]]</p></aside>
<p>Şeklin başlangıcında kuru gazlara 101,3 − 1,3 = 100 kPa kalır ve oksijen bunun 20,9 kPa’sını oluşturur. [[K6 s. 164–165]] Doygunlukta kuru gazlara 95 kPa kalır ve oksijendeki kayıp 0,209 × 5 ≈ 1,05 kPa’dır. [[K6 s. 164–166]]</p>
<p>İki sorunun paydalarını ayırın. [[K6 s. 164–166]] Kuru havanın %20,9 oksijen içermesi, kuru gazlara kalan basıncın ne kadarının oksijene ait olduğunu söyler. [[K6 s. 165]] Alveole giren nemli gazdaki yüzdeyi sorarken ise oksijenin kısmi basıncını su buharını da içeren toplam basınca bölmek gerekir. [[K6 s. 165–166]]</p>
</section>
<section class="wrap blk ders-sec" id="fk09a-p1"><h2>Part I · Doğru mu, yanlış mı?</h2>
<div class="viz"><div data-viz="mtf" data-q="fk09a-1"></div></div><div class="viz"><div data-viz="mtf" data-q="fk09a-2"></div></div><div class="viz"><div data-viz="mtf" data-q="fk09a-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk09a-p2"><h2>Part II · SOE 2</h2>
<h3>Açılış sorusu</h3><p>Deniz seviyesinde bir gaz analizöründe oksijen oranını okuyorsunuz. Ortam havası ile hava yollarında 37 °C’de doygunluğa ulaşan gazı karşılaştırırken toplam basınç, su buharı basıncı ve oksijen fraksiyonunu nasıl ilişkilendirirsiniz?</p>
<details><summary>Cevap iskeleti</summary><ol><li>Dalton yasasıyla başlayın. Her gazın kısmi basıncı toplamda yer alır. [[K6 s. 163]]</li><li>Toplam 101,3 kPa kalırken su buharının payı 1,3’ten 6,3 kPa’ya çıkar. [[K6 s. 164–165]]</li><li>Kuru gaz basıncını bulmak için toplamdan su buharı basıncını çıkarın, ardından oksijenin kuru gaz fraksiyonu ile çarpın. [[K6 s. 163–165]] Oksijenin nemli gazdaki fraksiyonu, kısmi basıncının toplam basınca oranıdır. [[K6 s. 165–166]]</li></ol></details>
<p><b>Çizin.</b> Ortam ve doygun gaz için eşit uzunlukta iki basınç çubuğu çizin. Her birinde su buharı ve diğer gazların payını işaretleyin. [[K6 s. 164–165]]</p>
<h3>Ek sorular</h3><ul><li>Yüksek irtifada oksijen kısmi basıncındaki azalma neden önem kazanır?</li><li>Su buharı arttığında gazın yoğunluğu neden düşer?</li><li>Bir helyum–oksijen karışımından yalnız helyumu uzaklaştırırsanız hangi basıncı ölçersiniz?</li></ul></section>
<section class="wrap blk ders-sec" id="fk09a-ozet"><h2>Özet</h2><ul><li>İdeal gaz yaklaşımı çok yüksek basınçta, çok düşük sıcaklıkta ve yoğuşma yakınında doğruluğunu kaybeder. [[K6 s. 159]]</li><li>Aynı sıcaklık ve basınçta eşit hacim eşit tanecik sayısı demektir. [[K6 s. 160]]</li><li>Kütleden molekül sayısına geçerken önce molar kütleye bölünür, ardından Avogadro sabitiyle çarpılır. [[K6 s. 160–161]]</li><li>Nemlenme sırasında toplam basınç sabitken su buharının payı artar ve oksijenin kısmi basıncı düşer. [[K6 s. 164–165]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="09a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/08b">← Bernoulli, Venturi ve Coanda etkileri; hacim ve akım ölçümü</a><a href="#/dersler/fizik/09b">Sonraki: Boyle, Charles ve Gay-Lussac yasaları; birleşik ve evrensel gaz yasası →</a></nav></section>`
};
