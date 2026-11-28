VERI.sorular = VERI.sorular || {};
(() => {
  const kagit = 'Paper A · Fizik · Basınç ölçümü';
  VERI.sorular['fk06a-1'] = {
    no: 1, kagit, kok: 'Basınç ölçümünde referans ve birimler', kaynak: '[[K6 s. 97–103]]',
    onermeler: [
      { t: 'Negatif gösterge basıncı, mutlak basıncın da negatif olduğunu gösterir.', d: false, n: 'Ölçülen basınç seçilen referansın altında olabilir, ancak mutlak basıncın alt sınırı vakumdur. [[K6 s. 97]]' },
      { t: 'Deniz seviyesinde atmosfer 760 mmHg iken 120 mmHg sistolik gösterge basıncı, mutlak ölçekte 880 mmHg eder.', d: true, n: 'Gösterge değerine referans basıncı eklenir. [[K6 s. 98]]' },
      { t: 'Bir bar ile bir atmosferin kPa karşılıkları aynıdır.', d: false, n: 'Bir bar 100 kPa, bir atmosfer ise 101,3 kPa eder. [[K6 s. 98]]' },
      { t: 'Su dolu bir barometrede standart atmosfer basıncını dengeleyen sütun yaklaşık 10,3 m yüksekliğindedir.', d: true, n: 'Suyun yoğunluğu 1000 kg/m³ olduğundan bu basıncı dengelemek için uzun bir sütun gerekir. [[K6 s. 103]]' },
      { t: 'Manometrede aynı basınç farkı daha yoğun sıvıda daha büyük yükseklik farkı oluşturur.', d: false, n: 'Aynı basınçta sıvı yoğunlaştıkça sütunlar arasındaki düşey fark küçülür. [[K6 s. 100–101]]' },
    ],
  };
  VERI.sorular['fk06a-2'] = {
    no: 2, kagit, kok: 'Diyaframlı valfler ve gaz beslemesi', kaynak: '[[K6 s. 105–109]]',
    onermeler: [
      { t: 'APL valfinin yayını vidayla aşağı almak açılma basıncını yükseltir.', d: true, n: 'Diyaframın gaz çıkışına izin verecek kadar yükselmesi için daha büyük basınç gerekir. [[K6 s. 105]]' },
      { t: 'Sabit tahliye valfinin açılma basıncını değiştirmek için valf değiştirilir.', d: true, n: 'Bu tasarımda tahliye basıncı valfin yapısıyla belirlenir. [[K6 s. 106]]' },
      { t: 'Basınç regülatörü çıkış basıncını fazla gazı ortama tahliye ederek düzenler.', d: false, n: 'Regülatörde piston giriş açıklığını değiştirir ve gazı sistemde korur. [[K6 s. 107]]' },
      { t: 'Entonox sisteminde düşürücü valfe ve talep valfine ek olarak bir emniyet valfi bulunur.', d: true, n: 'Üçüncü valf arıza durumunda basıncı tahliye eder. [[K6 s. 109]]' },
      { t: 'Basit bir akış kısıtlayıcının çıkış basıncı giriş basıncındaki dalgalanmalardan bağımsızdır.', d: false, n: 'Sabit daralmanın sağladığı basınç düşüşü besleme basıncının kararlılığına bağlıdır. [[K6 s. 108]]' },
    ],
  };
  VERI.sorular['fk06a-3'] = {
    no: 3, kagit, kok: 'Sifon etkisi ve infüzyon güvenliği', kaynak: '[[K6 s. 110–111]]',
    onermeler: [
      { t: 'İki kaptaki sıvı yüzeyleri aynı düzeyde dengedeyken sifonda net akım sürer.', d: false, n: 'Dengede akım durur, yüzeyler arasında kot farkı varsa sıvı alttaki kaba geçer. [[K6 s. 110]]' },
      { t: 'Hava girişi olmayan sert şişede infüzyon kendiliğinden durabilir.', d: true, n: 'Şişe boşaldıkça iç basınç düşer ve ven basıncıyla dengeye gelince ilaç akışı durur. [[K6 s. 110]]' },
      { t: 'Hasta düzeyinin üzerindeki bir enjektörde gevşek piston hidrostatik yük altında hareket edebilir.', d: true, n: 'Sıvı sütununun ağırlığı piston ile gövde arasındaki sürtünmeyi yenebilir. [[K6 s. 111]]' },
      { t: 'Volümetrik pompada varsayılan güvenli konum setin sıkıştırılarak kapatılmasıdır.', d: true, n: 'Setin kapatılması yerçekimiyle serbest akışı engeller. [[K6 s. 111]]' },
      { t: 'Tek yönlü valf geri akışı önlemek amacıyla kullanılır.', d: true, n: 'Anti-sifon valfi serbest akış riskini azaltırken tek yönlü valf ters yönde akışı önlemeyi amaçlar. [[K6 s. 111]]' },
    ],
  };

  const nav = [
    ['referans', 'Referans ve birimler'], ['manometre', 'Manometre'], ['barometre', 'Barometre'],
    ['bourdon', 'Bourdon göstergesi'], ['tahliye', 'Tahliye valfi'], ['regulator', 'Regülatör'],
    ['sifon', 'Sifon ve infüzyon'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
  ];
  const altyazi = {
    referans: 'Her iki nokta aynı ölçümü gösterir: üst ölçekte uzaklık vakumdan, alt ölçekte ise deniz seviyesindeki atmosfer basıncından başlar. [[K6 s. 97–98]]',
    manometre: 'Sıvının iki yüzeyini karşılaştırın: örnek gazın basıncı arttıkça yüzeylerden biri inerken diğeri yükselir ve aralarındaki düşey fark büyür. [[K6 s. 99–100]]',
    barometre: 'İki çizimde haznedeki basınç aynıdır, değişen yalnızca bu basıncı dengeleyecek sıvının yoğunluğu ve buna karşılık gereken sütun yüksekliğidir. [[K6 s. 102–103]]',
    bourdon: 'Tüpün basınç girişine bağlı ucu ile hareketini ibreye ileten kapalı ucunu ayırt edin. [[K6 s. 101–102]]',
    apl: 'Vidayı, yayı ve diyaframı sırayla izleyin, ardından diyafram kalktığında gazın çıkabileceği yolu bulun. [[K6 s. 105–106]]',
    alan: 'Eğrinin her noktasında açılması için valfe aynı kuvvet uygulanır, alan oranını değiştirerek bu kuvvete karşılık gelen basıncı okuyun. [[K6 s. 108–109]]',
    regulator: 'Besleme tarafından gelen gazın hasta tarafına ulaşmak için önce pistonun denetlediği dar açıklıktan geçmesi gerekir. [[K6 s. 107]]',
    piston: 'Hasta ucundaki basınç değişikliğinin diyafram ve piston üzerinden besleme açıklığına nasıl iletildiğini iki konumda karşılaştırın. [[K6 s. 107]]',
    sifon: 'Alttaki kapta sıvı yüzeyi yükselip üst kaptaki yüzeyle aynı düzeyde dengeye geldiğinde iki kap arasındaki akış durur. [[K6 s. 110]]',
    infuzyon: 'Önce şişedeki basıncı düşünün, sonra infüzyon seti boyunca hastaya ilerleyebilecek içeriği belirleyin. [[K6 s. 110–111]]',
  };
  const sekil = (id, ad) => `<div class="viz"><div class="viz-head"><h3>${ad}</h3></div><div data-viz="fk06a_${id}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${altyazi[id]}</p></div>`;
  SAYFALAR['dersler/fizik/06a'] = {
    grup: 'dersler', eyebrow: 'Fizik · Bölüm 6 · Ders 06a',
    baslik: 'Mutlak ve bağıl basınç, manometreler, basınç valfleri ve sifon etkisi',
    lede: 'Bir basınç değerini yorumlamak için önce sıfırın nerede seçildiğini bilmek gerekir. [[K6 s. 97–98]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad]) => `<button type="button" data-scroll="fk06a-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk06a-referans">
<h2>Bir basınç, iki ayrı sıfır</h2>
<p class="intro">Gaz molekülleri her yönde hareket ederken birbirlerine ve kabın duvarına çarpar. [[K6 s. 96]] Duvarın birim alanına bu çarpışmalarla aktarılan kuvvet, gaz basıncını oluşturur. [[K6 s. 96–97]]</p>
${sekil('referans', 'Sistolik basıncı iki ölçekte okuyun')}
<ul><li><b>Mutlak basınç.</b> Sıfır noktası, duvara çarpacak molekülün bulunmadığı tam vakumdur. [[K6 s. 97]] Bu yüzden mutlak basınç negatif değer alamaz. [[K6 s. 97]] Tam vakum elde etmek çok güçtür, derin uzayda bile metreküp başına bir ya da iki gaz molekülü bulunur. [[K6 s. 97]]</li>
<li><b>Bağıl basınç (gösterge basıncı).</b> Ölçekte sıfır olarak bir referans seçilir ve ölçülen basınç bu düzeyin altındaysa okuma negatiftir. [[K6 s. 97]] Klinikte hemen her zaman bağıl basınç kullanılır ve referans genellikle atmosferdir. [[K6 s. 98]]</li>
<li><b>Atmosfer basıncı (barometrik basınç).</b> Üzerimizdeki hava sütununun ağırlığından doğar ve hava koşullarıyla değişir. [[K6 s. 97]] Dağa çıkıldıkça yukarıdaki hava kütlesi azalır, basınç düşer. [[K6 s. 97]]</li></ul>
<div class="note"><b>Uçak kabininde oksijenlenme</b><p>Yolcu uçağı yaklaşık 11 000 m’ye çıktığında dışarıdaki oksijen parsiyel basıncı, pulmoner kapiller kanı yeterince oksijenlemeye yetmez. [[K6 s. 97]] Gövdeye binen yükü sınırlamak için kabin basıncı deniz seviyesindeki basıncın yaklaşık dörtte üçüne getirilir. [[K6 s. 97]] Deniz seviyesinde oksijenlenmesi ancak yeterli olan ağır kronik solunum hastaları uçuşta ek oksijene ihtiyaç duyabilir. [[K6 s. 97]]</p></div>
<h3>Hesap · Aynı sistolik basıncı iki ölçekte yazmak</h3>
<div class="card"><p>Deniz seviyesinde atmosfer basıncını 760 mmHg, ölçülen sistolik kan basıncını 120 mmHg alalım. [[K6 s. 98]] Klinikte bildirilen 120 mmHg, atmosferin üzerindeki farktır. [[K6 s. 98]] Vakumdan başlayan bir ölçekte önce atmosferin 760 mmHg’sini, sonra bu farkı sayarız: <b>760 + 120 = 880 mmHg</b>. [[K6 s. 98]]</p>
<p>Şekilde mutlak basıncı 760 mmHg’ye indirin: gösterge sıfırı bulduğu halde ölçüm yerinde hâlâ atmosfer basıncı vardır. [[K6 s. 97–98]] Mutlak basıncı biraz daha düşürdüğünüzde yalnız gösterge değerinin işareti değişir. [[K6 s. 97]]</p></div>
<h3>Klinik ölçekte birimler</h3>
<p>SI basınç birimi paskaldır (Pa), uygulamada çoğu kez kilopaskal daha kullanışlıdır (1 kPa = 1000 Pa). [[K6 s. 98]] Deniz seviyesinde atmosfer basıncı 101,3 kPa = 760 mmHg = 1033 cmH₂O = 1 atm’dir. [[K6 s. 98]]</p>
<table class="fk06a-birim"><thead><tr><th>Birim</th><th>1 birim kaç kPa?</th><th>Kullanım örneği</th></tr></thead><tbody>
${[
  ['Kilopaskal (kPa)','1','Gaz parsiyel basıncı'],['Milimetre cıva (mmHg)','0,1333','Kan basıncı'],
  ['Atmosfer (atm)','101,3','Dalış tüpü'],['Bar (bar)','100','Gaz tüpü'],['Milibar (mbar)','0,1','Meteoroloji'],
  ['Santimetre su (cmH₂O)','0,09807','Hava yolu basıncı'],['İnç kare başına libre (psi)','6,895','Lastik basıncı'],
].map(([ad,kpa,ornek]) => `<tr><th scope="row">${ad}</th><td>${kpa}</td><td>${ornek} [[K6 s. 98]]</td></tr>`).join('')}
</tbody></table>
<details><summary>Dönüşümde çarpmalı mı, bölmeli mi?</summary>
<p>Tablonun ortasındaki sütun her birimin kPa karşılığını verir. [[K6 s. 98]] Örneğin mmHg cinsinden bir ölçümü kPa’ya çevirmek için okunan değeri 0,1333 ile çarparsınız. [[K6 s. 98]] Ters yönde, kPa cinsinden bir değerin kaç cmH₂O ettiğini ararken bir cmH₂O’nun kPa karşılığına bölersiniz. [[K6 s. 98]]</p>
<p>Sonucun büyüklüğünü kontrol etmek için iki birimi karşılaştırın: cmH₂O, kPa’dan küçük olduğu için aynı basınç cmH₂O ile yazıldığında sayı büyür. [[K6 s. 98]] Bar ve atmosfer birbirine yakın olsa da bir tüp üzerindeki bar değerini atmosfer kabul etmek aynı dönüşümü vermez. [[K6 s. 98]]</p></details>
<div class="card"><h3>Hesap · Santral venöz basınç</h3><p>Transdüser santral venöz basıncı (SVB) 0,4 kPa gösteriyor. [[K6 s. 98]] Bir cmH₂O, 0,09807 kPa olduğundan 1 kPa yaklaşık 10,2 cmH₂O eder. [[K6 s. 98]] SVB = 0,4 × 10,2 = 4,08 cmH₂O, yuvarlanmış sonuç <b>4,1 cmH₂O</b> olur. [[K6 s. 98–99]] SVB’nin sıklıkla bu birimle verilmesi, transdüserlerden önce ölçümde serum fizyolojik dolu manometre kullanılmasına dayanır. [[K6 s. 99]]</p></div>
</section>
<section class="wrap blk ders-sec" id="fk06a-manometre">
<h2>Manometrede iki yüzey arasındaki fark</h2>
<p class="intro">Manometre, bir gazın basıncını tüpteki sıvının düşey yer değiştirmesiyle ölçer. [[K6 s. 99]]</p>
${sekil('manometre', 'U tüpünde basınç farkını değiştirin')}
<p>Kısmen sıvı dolu U biçimli cam tüpün bir koluna örnek gaz, ötekine referans gaz etki eder. [[K6 s. 99]] Referans kolu genellikle atmosfere açıktır, böylece okunan değer atmosfere göre gösterge basıncıdır. [[K6 s. 99]] Sütunların yükseklik farkı basınç farkıyla doğru orantılıdır. [[K6 s. 99]] Referans basıncı ve sıvının yoğunluğu biliniyorsa iki yüzey arasındaki yükseklik farkından örnek gazın basıncı bulunabilir. [[K6 s. 99–100]]</p>
<details><summary>U tüpünde hangi yüksekliği okumalıyım?</summary>
<ol><li>Önce iki gazı aynı basınçta düşünün: iki koldaki sıvı yüzeyleri aynı düzeydedir. [[K6 s. 99–100]]</li>
<li>Örnek gazın basıncını artırdığınızda bu taraftaki yüzey aşağı iner, açık koldaki yüzey yükselir. [[K6 s. 99–100]] Tek bir yüzeyin ilk konumuna göre hareketini okumak, iki kol arasındaki farkı eksik verir. [[K6 s. 99–100]]</li>
<li>Son durumda iki yüzeyden birer yatay çizgi geçirin, aralarındaki düşey uzaklığı okuyun. [[K6 s. 99–100]] Ölçülen fark örnek gazın referansın üzerine eklediği basıncı verir. [[K6 s. 99–100]]</li></ol></details>
<div class="note"><b>Gaz basıncından santral venöz basınca</b><p>U tüpüyle yapılan karşılaştırmada aranan büyüklük, örnek gazın referans gazı ne kadar aştığıdır. [[K6 s. 99–100]] Santral venöz basınç manometresinde de okunan büyüklük bir sıvı sütununun yüksekliğidir. [[K6 s. 99–101]] Ölçümün sıvı yerine elektronik transdüserle yapılması, aynı basıncın bir sütun yüksekliği olarak ifade edilebilmesini değiştirmez. [[K6 s. 98–99]]</p></div>
<h3>Sütunun ağırlığından basınca</h3>
<ol><li>Basınç <i>P</i> (Pa), kuvvetin <i>F</i> (N) kesit alanına <i>A</i> (m²) bölünmesiyle bulunur: <i>P</i> = <i>F</i>/<i>A</i>. [[K6 s. 100]]</li>
<li>Buradaki kuvvet sıvının ağırlığıdır: <i>F</i> = <i>m</i>·<i>g</i>, burada <i>m</i> kütle (kg), <i>g</i> yerçekimi ivmesidir (m/s²). [[K6 s. 100]]</li>
<li>Yoğunluk <i>ρ</i> (kg/m³) birim hacmin kütlesidir. [[K6 s. 103]] Düşey sütunun hacmi <i>V</i> = <i>A</i>·<i>h</i> (m³), kütlesi <i>m</i> = <i>ρ</i>·<i>A</i>·<i>h</i> olur. [[K6 s. 100]]</li>
<li>Alan sadeleşince hidrostatik basınç <b><i>ΔP</i> = <i>ρ</i>·<i>g</i>·<i>h</i></b> kalır, <i>h</i> iki yüzey arasındaki düşey farktır (m). [[K6 s. 99–100]] Tüpün izlediği yolun uzunluğu ve kesit alanı basıncı belirlemez. [[K6 s. 104]]</li></ol>
<p>Düşük yoğunluklu sıvıda aynı basınç farkı daha büyük yer değiştirme oluşturur ve ölçüm daha hassas okunabilir. [[K6 s. 100–101]] Yoğun sıvı kullanıldığında daha kısa bir manometre yeterlidir. [[K6 s. 101]] Manometre en sık SVB ölçümünde kullanılır. [[K6 s. 101]]</p>
<details><summary>Tüp genişliğinin etkisiyle piston genişliğinin etkisi neden farklı?</summary>
<p>Sıvı sütununun kesiti büyüdüğünde aynı yükseklikte daha çok sıvı bulunur, tabana etkiyen ağırlık da kesit alanıyla aynı oranda artar. [[K6 s. 100]] Kuvvet alana bölündüğünde bu iki değişim birbirini götürür. [[K6 s. 100]]</p>
<p>Enjektör karşılaştırmasında ise başlangıç koşulu iki pistona uygulanan kuvvetin aynı olmasıdır. [[K6 s. 104]] Bu kez alan büyüdüğünde kuvvet artmaz ve birim alana düşen kuvvet azalır. [[K6 s. 104–105]] Enjektörlerin üzerinde yazan hacimlerden doğrudan bir basınç oranı hesaplamak yerine pistonların kesit alanlarını karşılaştırmak gerekir. [[K6 s. 104–105]]</p></details>
<div class="card"><h3>Hesap · İki enjektöre eşit kuvvet</h3><p>2 mL ve 50 mL enjektörlerin pistonlarına aynı kuvvet uygulansın. [[K6 s. 104]] <i>F</i> = <i>P</i>·<i>A</i> olduğundan <i>P</i><sub>2</sub>·<i>A</i><sub>2</sub> = <i>P</i><sub>50</sub>·<i>A</i><sub>50</sub> olur, alt indisler enjektör hacmini belirtir. [[K6 s. 104–105]] Basınç oranı <i>P</i><sub>2</sub>/<i>P</i><sub>50</sub> = <i>A</i><sub>50</sub>/<i>A</i><sub>2</sub> olduğundan kesiti küçük olan <b>2 mL enjektör</b> daha yüksek basınç üretir. [[K6 s. 104–105]]</p></div>
</section>
<section class="wrap blk ders-sec" id="fk06a-barometre"><h2>Barometrede referans vakumdur</h2>
<p class="intro">Geleneksel barometre, atmosfer basıncını mutlak ölçekte veren özel bir manometredir. [[K6 s. 102]]</p>
${sekil('barometre', 'Aynı atmosfer basıncını su ve cıva ile dengeleyin')}
<p>Sıvıyla doldurulup ağzı hazneye daldırılan, üst ucu kapalı tüpte sıvı yerçekimiyle aşağı çekilir ve tepede vakum oluşur. [[K6 s. 102]] Açık haznedeki sıvının üzerine etkiyen atmosfer basıncı, tüpteki sütunun hidrostatik basıncını dengeler. [[K6 s. 102–103]] Bu nedenle aynı sıvı için atmosfer basıncı ile düşey yükseklik doğru orantılıdır. [[K6 s. 102–103]]</p>
<details><summary>Hazneye ve tüpün kapalı ucuna ayrı ayrı bakın</summary>
<p>Açık haznenin serbest yüzeyinde dış hava basıncı vardır. [[K6 s. 102]] Tüpün içindeki sütunun üst yüzeyinde ise referans vakumdur. [[K6 s. 102]] Bu iki yüzeyin yükseklik farkını ölçmek, atmosferin vakuma göre basıncını ölçmek anlamına gelir. [[K6 s. 102–103]]</p>
<p>Sıvı seçimini değiştirdiğinizde şekildeki dış basınç aynı kalır. [[K6 s. 103]] Yoğunluğu daha düşük olan suyla bu basıncı sağlayabilmek için daha yüksek bir sütun gerekir. [[K6 s. 102–103]] Karşılaştırmada başlangıç düzeyi haznedeki sıvı yüzeyidir, tüpün hazneye dalan kısmı yüksekliğe eklenmez. [[K6 s. 102–104]]</p></details>
<div class="card"><h3>Hesap · Cıva yerine su</h3><p>Standart atmosfer basıncı 760 mm cıva sütununu dengeler ve 101,3 kPa = 101 300 Pa eder. [[K6 s. 103]] Suyun yoğunluğu 1 g/cm³ = 1000 kg/m³ olduğundan <i>h</i> = <i>P</i>/(<i>ρ</i>·<i>g</i>) = 101 300/(1000·<i>g</i>) ≈ <b>10,3 m</b> bulunur. [[K6 s. 103]] Bu yükseklikte su barometresi pratik değildir, cıvanın yüksek yoğunluğu ise kullanılabilir boyutta bir düzenek sağlar. [[K6 s. 102–103]]</p></div><details><summary>Su sütunu hesabında birimler nasıl sadeleşir?</summary>
<p>Önce bilinmeyeni ayırın: yoğunluk ile yerçekimi ivmesinin çarpımı sütunun birim yüksekliği başına düşen basıncı verir. [[K6 s. 100–103]] Bu nedenle aranan yükseklik için atmosfer basıncını bu çarpıma bölmek gerekir. [[K6 s. 103]]</p>
<p>Basıncı paskal, yoğunluğu kg/m³ ve yerçekimi ivmesini m/s² ile yazdığınızda yükseklik metre çıkar. [[K6 s. 100–103]] Milimetre cıva cinsinden verilen 760 sayısını paskal yerine koymak, aynı basıncı farklı iki birimde kullanmak olur. [[K6 s. 103]] Cıvalı ve sulu düzeneklerin sonuçlarını karşılaştırırken ölçülen basıncın aynı, sütun yüksekliklerinin farklı olduğunu kontrol edin. [[K6 s. 102–103]]</p></details></section>
<section class="wrap blk ders-sec" id="fk06a-bourdon"><h2>Bourdon göstergesinde basınç nasıl ibreye aktarılır?</h2>
<p class="intro">Adını Fransız sanayici Eugène Bourdon’dan alan gösterge, içi boş C biçimli esnek tüpün iç basıncını dış basınçla karşılaştırır. [[K6 s. 101]]</p>
${sekil('bourdon','Gaz girişinden ibreye')}
<p>İç basınç yükseldiğinde kapalı uç dışarı doğru açılır. [[K6 s. 101]] Tüpün genişleme ya da daralma hareketi ibreye aktarılır ve bağıl basınç kalibre edilmiş kadrandan okunur. [[K6 s. 101–102]]</p>
<details><summary>Kadranda okunan basıncın referansı neresi?</summary>
<p>Tüpün bir ucu ölçülecek basınca açıktır, kapalı uç ise serbestçe hareket edebilir. [[K6 s. 101]] İçerideki gazın tüpü açma eğilimi, dışarıdan etkiyen basınca göre belirlenir. [[K6 s. 101]] Manometrede iki sıvı yüzeyi arasındaki farkla okunan bağıl basınç burada mekanik bir harekete, ardından ibrenin konumuna dönüşür. [[K6 s. 99–102]]</p></details>
<div class="note plain"><b>Atlas notu.</b> Kitap, basınçla tüp hacminin artmasını Boyle yasasıyla açıklar. [[K6 s. 101]] Doğrusu, Boyle yasasına göre sabit sıcaklıkta sabit miktarda gazın basıncı ile hacmi ters orantılıdır, Bourdon tüpünün açılması ise elastik şekil değişimidir. [[K6 s. 101]]</div></section>
<section class="wrap blk ders-sec" id="fk06a-tahliye"><h2>Basıncı tahliye etmek</h2>
<p class="intro">Emniyet valfi belirli bir basınca ulaşıldığında gazı ya da sıvıyı dışarı bırakır ve basınç normal aralığa dönünce yeniden kapanır. [[K6 s. 105]] Çoğu tasarımda yayı sıkıştıran kuvveti bir diyafram iletir. [[K6 s. 105–106]]</p>
${sekil('apl','Ayarlanabilir basınç sınırlama (APL) valfinin kesiti')}
<ul><li><b>Vidayla ayar.</b> Üstteki vida yayı ve diyaframı yukarı ya da aşağı alır. [[K6 s. 105]] Yay aşağı alındığında gazın çıkabileceği konuma erişmek için daha çok sıkışması gerekir, dolayısıyla açılma basıncı yükselir. [[K6 s. 105]]</li>
<li><b>Tahliye yolu.</b> Basınç diyaframı yeterince yukarı kaldırdığında gaz çevreye çıkar. [[K6 s. 105]] Bu geri dönüşsüz valf basit, ucuz ve farklı kullanımlara uyarlanabilirdir, ancak tahliye edilen gaz kaybedilir. [[K6 s. 105]]</li>
<li><b>Sabit tahliye valfi.</b> Noninvaziv pozitif basınç desteği sağlayan cihazlarda kullanılabilir. [[K6 s. 106]] Farklı bir tahliye basıncı gerekiyorsa başka bir valf takılır. [[K6 s. 106]]</li></ul>
<h3>Yayın kuvveti mi, diyaframın alanı mı?</h3>
<p>Hooke yasasında yayın geri çağırıcı kuvveti <i>F</i><sub>yay</sub> = −<i>k</i>·<i>x</i> (N) olup <i>k</i> yay sabiti (N/m), <i>x</i> diyaframla birlikte yayın yer değiştirmesidir (m). [[K6 s. 106]] Eksi işareti yay kuvvetinin basıncın oluşturduğu yer değiştirmeye karşı yöneldiğini gösterir. [[K6 s. 106]] Büyüklükler için <i>P</i>·<i>A</i> = <i>k</i>·|<i>x</i>|, dolayısıyla |<i>x</i>| = <i>P</i>·<i>A</i>/<i>k</i> olur. [[K6 s. 106]]</p>
${sekil('alan','Aynı yayla açılma basıncı')}
<details><summary>Ayar vidasını çevirmek ile diyaframı büyütmek arasındaki fark</summary>
<p>APL valfinde diyafram alanı aynı kalır ve vida, gazın kaçabilmesi için yayın ne kadar sıkıştırılması gerektiğini değiştirir. [[K6 s. 105–106]] Aynı alan üzerinde daha büyük yay kuvvetini yenmek, daha büyük bir basınç gerektirir. [[K6 s. 105–106]]</p>
<p>Grafikte ise vida ayarıyla oynamadan, aynı yayla iki diyafram tasarımı karşılaştırılır. [[K6 s. 108–109]] Kaydırıcıyı sağa alın: daha geniş diyaframda aynı basınç daha büyük bir kuvvete karşılık gelir. [[K6 s. 106–109]] Dolayısıyla yayın gerektirdiği açma kuvvetine daha düşük basınçta ulaşılır. [[K6 s. 108–109]]</p></details>
<div class="card"><h3>Hesap · CPAP valfinin diyaframını büyütmek</h3><p>10 cmH₂O değerli valf, uygulanan basınç bu değere ulaştığında ya da onu aştığında açılır. [[K6 s. 108]] Yay değişmeden diyafram alanı iki katına çıkarılırsa gereken açma kuvveti yine aynıdır. [[K6 s. 108]] <i>P</i><sub>yeni</sub> = <i>P</i><sub>eski</sub>·<i>A</i><sub>eski</sub>/<i>A</i><sub>yeni</sub> = 10/2 = <b>5 cmH₂O</b> olur. [[K6 s. 108–109]]</p></div></section>
<section class="wrap blk ders-sec" id="fk06a-regulator"><h2>Çıkış basıncını düzenlemek</h2>
<p class="intro">Basınç düşürücü valf, yüksek basınçlı bir kaynaktan, örneğin tüpten, çok daha düşük basınçta gazı bir çıkışa, örneğin yüz maskesine verir. [[K6 s. 106–107]]</p>
${sekil('regulator','Regülatörde besleme girişi, piston ve çıkış odası')}
<p>Regülatör, ayarlanabilir tahliye valfinden geliştirilmiştir ve belirli bir basınca ulaşıldığında gaz ya da sıvı girişini otomatik keser. [[K6 s. 106–107]] Çıkış odası yaylı diyaframın altındadır ve diyafram alttaki pistona bağlıdır. [[K6 s. 107]]</p>
<ol><li><b>Çıkış basıncı düşünce</b> pistonun denetlediği açıklıktan besleme gazı odaya girer. [[K6 s. 107]]</li><li><b>Ayar basıncına ulaşınca</b> gaz diyaframa alttan bastırır, diyafram pistonu yukarı çeker ve giriş daralır. [[K6 s. 107]] Küçük açıklığın akışa getirdiği direnç belirgin basınç düşüşü oluşturur. [[K6 s. 107]]</li><li><b>Kullanım boyunca</b> piston hasta ucundaki basınç değişiklikleriyle aşağı yukarı hareket ederek çıkış basıncını sabit tutar. [[K6 s. 107]] Regülatör gazı çevreye boşaltmadan beslemeyi düzenler. [[K6 s. 107]]</li></ol>
${sekil('piston','Hasta ucundaki değişimi pistona kadar izleyin')}
<details><summary>Gazın nereye gittiğini izleyerek valfleri ayırın</summary>
<p>Tahliye valfinde giriş basıncı yükselirken çıkış açılır, fazla gaz sistemden uzaklaşır ve normal basınca dönülünce valf kapanır. [[K6 s. 105]] Regülatörde ise geri bildirim, hastaya gaz veren odanın basıncından gelir. [[K6 s. 107]] Oda doldukça piston besleme tarafındaki geçidi küçültür, böylece yüksek basınçlı kaynaktan içeri giren gaz sınırlanır. [[K6 s. 107]]</p>
<p>Akış kısıtlayıcıda basıncı düşüren de bir daralmadır, ancak açıklığı hasta ucundaki değişime göre ayarlayan hareketli bir piston bulunmaz. [[K6 s. 107–108]] Bu nedenle sabit bir hat basıncı varsayımı, kısıtlayıcının nasıl çalıştığını açıklarken önemlidir. [[K6 s. 108]]</p></details>
<div class="cols"><div class="card"><h3>Tüp ve hat beslemesi</h3><p>Tüp regülatörü basıncı 400 kPa ya da altında tutar. [[K6 s. 107]] Böylece ekipman hasarını, olası barotravmayı ve ventilatörün çalışmasındaki değişkenliği önlemeye yardımcı olur. [[K6 s. 107]]</p></div>
<div class="card"><h3>Akış kısıtlayıcı</h3><p>Basit bir boru darlığı, gaz ya da sıvı akışına direnç oluşturarak basıncı düşürür. [[K6 s. 108]] Giriş basıncının kararlı kalmasına bağımlı olduğu için dalgalanmalara duyarlıdır ve hassas düzenleme sağlayamaz. [[K6 s. 108]] Genellikle gaz hattı ile anestezi cihazı arasına yerleştirilir ve 400 kPa besleme basıncını 100–200 kPa aralığına düşürür. [[K6 s. 108]]</p></div></div>
<details><summary>Üç cihazı çıkışta neyin denetlendiğine göre karşılaştırın</summary>
<ul><li><b>APL valfinde</b> soru, gazın hangi basınçta dışarı kaçmaya başlayacağıdır. [[K6 s. 105]] Vidayla seçilen eşik, diyaframın çıkış yolunu açmasına yetecek basınca karşılık gelir. [[K6 s. 105–106]]</li>
<li><b>Tüp regülatöründe</b> istenen, hasta tarafına kaynaktan çok daha düşük ve kararlı bir basınçta gaz vermektir. [[K6 s. 107]] Çıkış odasının basıncı ayar düzeyine ulaştığında girişin kısılması bu işlevin parçasıdır. [[K6 s. 107]]</li>
<li><b>Hat kısıtlayıcısında</b> basınç düşüşü sabit bir darlıktan geçiş sırasında ortaya çıkar. [[K6 s. 108]] Hat basıncı dalgalanıyorsa çıkış değerini yalnız darlığın varlığından kestirmek güçleşir. [[K6 s. 108]]</li></ul></details>
<h3>Entonox’un iki kademesi</h3><p>Gazı önce basınç düşürücü valf, ardından talep valfi denetler ve bu iki valfin temel tasarımı aynıdır. [[K6 s. 109–110]] Arıza durumunda basıncı boşaltmak üzere ayrıca üçüncü bir emniyet valfi bulunur. [[K6 s. 109]]</p></section>
<section class="wrap blk ders-sec" id="fk06a-sifon"><h2>Sıvı tepeyi nasıl aşar?</h2>
<p class="intro">Sifon, bir kaptaki sıvının tüp içinden daha alçaktaki kaba aktarılmasıdır. [[K6 s. 109–110]]</p>
${sekil('sifon','İki kapta sıvı düzeyi ve akış yönü')}
<p>Bir araç deposundan yakıt çekilmesinde olduğu gibi, kolları eşit uzunlukta olmayan ters U biçimli tüpte sıvı önce yükselebilir. [[K6 s. 110]] Uzun koldaki sıvı aşağı çekilirken tepedeki basınç düşer, kısa koldaki sütunun ağırlığı dengeyi korumaya yetmez ve sıvı tepeyi aşar. [[K6 s. 110]] Sıvıyı yukarı itmek için atmosfer basıncı gerekir, ancak sifonun vakumda da daha az etkili çalıştığı gösterildiğinden yüzey gerilimi de rol oynar. [[K6 s. 110]]</p>
${sekil('infuzyon','Cam şişede sıvının yerini ne alır?')}
<details><summary>Hava girişi neden hem akışın sürmesini sağlar hem risk doğurur?</summary>
<p>Şişede hâlâ ilaç varken sorun, sert kabın sıvıyla birlikte küçülememesidir. [[K6 s. 110]] Hava girişi kapalıysa şişe içinde gelişen negatif basınç, sıvıyı vene taşıyan basınç farkını giderek azaltır. [[K6 s. 110]] Hava girişi olan şişede ise çıkan sıvının hacmini hava doldurur ve bu karşı basınç gelişmez. [[K6 s. 110]]</p>
<p>Şişe boşaldığında aynı hava yolu açık kalabilir. [[K6 s. 110–111]] Bu kez hastaya doğru ilerleyebilecek olan sıvı yerine havadır, dolayısıyla açık hava girişi tek başına güvenliğin göstergesi değildir. [[K6 s. 110–111]]</p></details>
<details><summary>Yüksekteki enjektörde birbirinden farklı iki olasılık</summary>
<p>İlk olasılıkta enjektörün içinden sıvı eksilirken piston gövde içinde ilerler. [[K6 s. 111]] Bunu açıklamak için bir hava girişine gerek yoktur: yeterince büyük hidrostatik yük, iyi sabitlenmemiş pistonun sürtünmesini yenebilir. [[K6 s. 111]]</p>
<p>İkinci olasılıkta ise sıvı hastaya doğru sifonlanırken çatlak veya gevşek bir bağlantı havanın sisteme girmesine izin verir. [[K6 s. 111]] Dolayısıyla yalnız pistonu incelemek, bir bağlantı kusuruna bağlı hava girişini açıklamaya yetmez. [[K6 s. 111]]</p></details>
<h3>İnfüzyonda üç güvenlik sorusu</h3>
<ul><li><b>Sert şişeye hava girebiliyor mu?</b> Cam parasetamol şişesi sıvı çıkarken büzülemez ve içinde negatif basınç gelişir. [[K6 s. 110]] Hava girişi yoksa basınç ven basıncıyla dengeye gelir ve ilaç verilmesi durur. [[K6 s. 110]] Hava girişi açıldığında çıkan sıvının yerini hava alır, şişe atmosfer basıncında kalır. [[K6 s. 110]] Şişe boşalınca periferik ven basıncının düşük olması nedeniyle hava set boyunca hastaya ilerleyebilir ve hava embolisine yol açabilir. [[K6 s. 110–111]]</li>
<li><b>Yüksekteki enjektör sağlam ve pistonu sabit mi?</b> Hastanın belirgin üzerinde duran enjektörde sıvı sütununun ağırlığı, iyi sabitlenmemiş piston ile gövde arasındaki sürtünmeyi yenebilir. [[K6 s. 111]] Enjektör giderek boşalabilir ve infüzyon sıvısı hastaya sifonlanırken çatlak ya da gevşek bağlantıdan içeri hava çekilebilir. [[K6 s. 111]]</li>
<li><b>Cihazın varsayılan konumu akışı kesiyor mu?</b> Serbest akış, sıvının hiçbir engelle karşılaşmadan yerçekimiyle hastaya akmasıdır. [[K6 s. 111]] İnfüzyon cihazının varsayılan konumu akışı engellemelidir: enjektör pompasında kol pistonu kavramalı, volümetrik pompada set sıkıştırılarak kapatılmalıdır. [[K6 s. 111]] Anti-sifon valfi serbest akış riskini azaltır, tek yönlü valf ise geri akışı önlemeyi amaçlar. [[K6 s. 111]]</li></ul><details><summary>Serbest akış ile geri akışı ayırt edin</summary>
<p>Önce sıvının yönünü söyleyin: serbest akışta infüzyon sıvısı yerçekimiyle hastaya doğru ilerler. [[K6 s. 111]] Bu durumda sorun yönün ters olması değil, hastaya giden sıvının hareketini sınırlaması gereken engelin ortadan kalkmasıdır. [[K6 s. 111]] Bir valfin sıvıyı yalnızca tek yönde geçirmesi, bu iki olayın aynı olduğu anlamına gelmez. [[K6 s. 111]]</p>
<p>Sonra fiziksel engelin yerini gösterin: enjektör pompasında tutulan parça piston, volümetrik pompada kapatılan yol ise sıvıyı taşıyan settir. [[K6 s. 111]] Varsayılan durumda bu engellerin etkin olması, cihazın yerçekimine bağlı akışı kendiliğinden serbest bırakmasını önlemeye yöneliktir. [[K6 s. 111]]</p></details></section>
<section class="wrap blk ders-sec" id="fk06a-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="fk06a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk06a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk06a-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk06a-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Santral venöz basınç transdüserde 0,4 kPa görünüyor. [[K6 s. 98]] Bu basıncı bir sıvı sütunuyla nasıl ölçer ve cmH₂O cinsinden nasıl ifade edersiniz?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet"><li>Önce referansı belirtin: klinik basınç ölçümünde sıfır genellikle atmosferdir. [[K6 s. 98]]</li><li>Sıvı sütununun ağırlığını kesit alanına bölün: <i>ΔP</i> = <i>ρgh</i>, burada okunan mesafe düşey yükseklik farkıdır. [[K6 s. 99–100]]</li><li>Su sütunu için 0,4 × 10,2 ≈ 4,1 cmH₂O bulunur. [[K6 s. 98–99]]</li><li>Aynı hidrostatik yük iyi sabitlenmemiş, hastadan yüksekteki bir enjektörün pistonunu hareket ettirebilir. [[K6 s. 111]]</li></ol>
<div class="note"><b>Çizin.</b> Bir U tüpünün örnek ve atmosfer kollarını çizin, yüksek basınç tarafındaki yüzeyi daha aşağıda gösterin ve iki yüzey arasındaki düşey farkı işaretleyin. [[K6 s. 99–100]]</div>
<h3>Olası ek sorular</h3><ul><li>Sıvı yoğunluğunu artırmak manometrede okumayı nasıl değiştirir?</li><li>Bir APL valfiyle bir regülatörde basınç yükselirken gazın izlediği yollar nasıl farklılaşır?</li><li>Cam infüzyon şişesinde hava girişinin açık ya da kapalı olması hangi riskleri doğurur?</li></ul></section>
<section class="wrap blk ders-sec" id="fk06a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Mutlak ölçekte sıfır vakumdur, gösterge basıncında ise seçilen referanstır. [[K6 s. 97–98]]</li>
<li>Manometreyi okurken iki yüzey arasındaki düşey farkı ve sıvının yoğunluğunu kullanın. [[K6 s. 99–101]]</li>
<li>APL valfi gazı tahliye eder, regülatör ise besleme açıklığını değiştirerek çıkış basıncını korur. [[K6 s. 105–107]]</li>
<li>Yerçekimiyle serbest akışı engellemek için pompanın varsayılan konumu pistonu tutmalı ya da seti kapatmalıdır. [[K6 s. 111]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="06a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/05b">← Basit harmonik hareket, rezonans ve sönüm, Fourier analizi, Doppler etkisi</a><a href="#/dersler/fizik/06b">Sonraki: Kan basıncı: noninvaziv ve invaziv ölçüm →</a></nav></section>`,
  };
})();
