VERI.sorular = VERI.sorular || {};
VERI.sorular['fk08a-1'] = {
  no: 1, kok: 'Aortta hız ve hacim akımı', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 136–138]]',
  onermeler: [
    { t: 'Doppler ile ölçülen ortalama hız, tek başına kalp debisini verir.', d: false, n: 'Debiyi bulmak için hızı kesit alanıyla çarpmak gerekir. [[K6 s. 137]]' },
    { t: 'Hacim akımı litre/saniye ile ifade edilebilir.', d: true, n: 'Birim zamanda belirli bir noktadan geçen hacim ölçülür. [[K6 s. 136]]' },
    { t: 'Sabit debide kesit daralırsa ortalama hız artar.', d: true, n: 'Alan ile ortalama hızın çarpımı sabit kalır. [[K6 s. 136–137]]' },
    { t: 'Aorttan 6 L/dk kan geçmesi saniyede 1 L akıma karşılık gelir.', d: false, n: 'Dakikadan saniyeye çevrilince 6 L/dk = 0,1 L/s bulunur. [[K6 s. 137]]' },
    { t: 'Yarıçapı 1,5 cm olan aortta 6 L/dk debi, yaklaşık 14 cm/s ortalama hız verir.', d: true, n: 'Hacim akımı πr² değerine bölünür. [[K6 s. 137–138]]' },
  ],
};
VERI.sorular['fk08a-2'] = {
  no: 2, kok: 'Laminer akımda basınç ve direnç', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 138–142]]',
  onermeler: [
    { t: 'Düz bir tüpte laminer akımın en hızlı tabakası merkezdedir.', d: true, n: 'Duvarla sürtünme nedeniyle dış tabakalar daha yavaş ilerler. [[K6 s. 138–139]]' },
    { t: 'Düşey eksende basınç farkı, yatay eksende akım olan laminer akım grafiğinde eğim, direncin tersidir.', d: false, n: 'Düşey eksen basınç farkı olduğunda eğim ΔP/Q̇ = R olur. [[K6 s. 140–141]]' },
    { t: 'Diğer koşullar sabitken tüp uzunluğunun ikiye katlanması direnci yarıya indirir.', d: false, n: 'Direnç uzunlukla doğru orantılıdır ve iki katına çıkar. [[K6 s. 141]]' },
    { t: 'Diğer koşullar sabitken yarıçap iki katına çıkarsa akım 16 katına çıkar.', d: true, n: 'Laminer akım yarıçapın dördüncü kuvvetiyle orantılıdır. [[K6 s. 141–142]]' },
    { t: 'Dar tüpte %50 glukoz çözeltisi aynı basınç farkında sudan daha hızlı akar.', d: false, n: 'Daha viskoz olan glukoz çözeltisinin karşılaştığı direnç daha yüksektir. [[K6 s. 141]]' },
  ],
};
VERI.sorular['fk08a-3'] = {
  no: 3, kok: 'Türbülansı öngörme ve tanıma', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 142–146]]',
  onermeler: [
    { t: 'Reynolds sayısının birimi m/s’dir.', d: false, n: 'Yoğunluk, hız, çap ve dinamik viskozitenin oluşturduğu oran boyutsuzdur. [[K6 s. 143–144]]' },
    { t: 'Geçiş akımında yer yer girdaplar görülebilir.', d: true, n: '2000–4000 aralığında laminer akıma yerel dönmeler eşlik edebilir. [[K6 s. 143]]' },
    { t: 'Diğer değişkenler sabitken yoğunluğun artması türbülans eğilimini artırır.', d: true, n: 'Yoğunluk arttığında Reynolds sayısı yükselir. [[K6 s. 143–144]]' },
    { t: 'Türbülanslı akımı iki katına çıkarmak için basınç farkını dört katına çıkarmak gerekir.', d: true, n: 'Türbülanslı akım basınç farkının kareköküyle orantılıdır. [[K6 s. 145]]' },
    { t: 'Bir solunum devresindeki keskin dirsek ek direnç oluşturabilir.', d: true, n: 'Keskin dönüşte gelişebilen girdaplar türbülansa ve ek dirence yol açabilir. [[K6 s. 145–146]]' },
  ],
};

(() => {
  const nav = [['debi', 'Akım ve hız'], ['tabaka', 'Laminer profil'], ['direnc', 'Tüp direnci'], ['re', 'Reynolds sayısı'], ['basinc', 'Basınç–akım'], ['baglanti', 'Devre bağlantısı'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet']];
  const sekil = (ad, baslik) => `<div class="viz fk08a-sekil"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="fk08a_${ad}"></div><p class="viz-cap" aria-live="polite"></p></div>`;
  SAYFALAR['dersler/fizik/08a'] = {
    grup: 'dersler', eyebrow: 'Fizik · Bölüm 8 · Ders 08a', baslik: 'Akım: laminer ve türbülanslı akım',
    lede: 'Doppler aorttaki kanın hızını ölçer. [[K6 s. 137]] Aynı hız ölçümünden debiyi nasıl buluruz? Bir solunum devresinde aynı debiyi sağlamak için gereken basınç neden değişir?',
    html: `<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="fk08a-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk08a-debi">
<h2>Akım ve hız nasıl ayrılır?</h2>
<p class="intro">Bir akarsuyun dar geçidinde su hızlanır, ama aynı sürede geçen su hacmi korunur. [[K6 s. 136–137]]</p>
${sekil('debi', 'Aort yarıçapını değiştirin, debiyi sabit tutun')}
<p>Gazın ya da sıvının bir tüp veya sistem boyunca hareketini, seçtiğimiz bir noktadan birim zamanda geçen miktarla tarif ederiz. [[K6 s. 136]] <i>Q̇</i> simgesinde <i>Q</i> miktarı, üzerindeki nokta ise miktarın zamana göre değişim hızını gösterir. [[K6 s. 136]]</p>
<ul><li><b>Hacim akımı (debi).</b> Bu derste akım, geçen hacmin süreye bölümüdür: <i>Q̇</i> = Δ<i>V</i>/Δ<i>t</i>, genellikle L/s veya mL/s olarak verilir. [[K6 s. 136]]</li>
<li><b>Kütle akımı.</b> Bazı uygulamalarda birim zamanda geçen miktar hacim yerine kütleyle ifade edilir. [[K6 s. 136]]</li>
<li><b>Ortalama hız.</b> Bir kesitte <i>v</i> = <i>Q̇</i>/<i>A</i> olur; akım m³/s, kesit alanı m² ise hız m/s çıkar. [[K6 s. 137–138]]</li></ul>
<p>Debi korunuyorsa değişken çaplı tüpün iki kesitinde <i>A</i><sub>1</sub><i>v</i><sub>1</sub> = <i>A</i><sub>2</sub><i>v</i><sub>2</sub> olur. [[K6 s. 137]] Gaz akımının ölçümü anestezi ve solunum fizyolojisinde kullanılır; kan akımında aynı ilişkiyi kalp debisini hesaplarken kullanırız. [[K6 s. 136–137]] Doppler ile bulunan aort hızını debiye çevirmek için aortun kesit alanını da bilmek gerekir. [[K6 s. 137]]</p>
<p>Önce şekilde iki yarıçapı eşitleyin: aynı debi eşit alanlardan geçerken giriş ve çıkış hızları da eşittir. [[K6 s. 137]] Sonra yalnız çıkışı daraltın; aynı hacmin aynı sürede daha küçük bir kesitten geçebilmesi için çıkıştaki hız oku uzar. [[K6 s. 136–137]]</p>
<div class="card fk08a-hesap"><h3>Hesap · Aortta ortalama hız</h3><ol>
<li>Debiyi çevirin: 6,0 L/dk = 0,1 L/s = 0,0001 m³/s. [[K6 s. 137]]</li>
<li>Yarıçap 1,5 cm = 0,015 m olduğundan alan <i>A</i> = π<i>r</i><sup>2</sup> = π × (0,015 m)<sup>2</sup> olur. [[K6 s. 137]]</li>
<li>Debiyi alana bölün: 0,0001 / [π × (0,015)<sup>2</sup>] ≈ <b>0,14 m/s</b>, yani yaklaşık <b>14 cm/s</b>. [[K6 s. 137–138]]</li></ol></div>
<p><b>Tersinden kontrol.</b> Kalp debisini bulmanız istenseydi aynı işlemi ters yönde yapardınız: Doppler ile ölçülen ortalama hızı, yarıçaptan hesaplanan alanla çarpardınız. [[K6 s. 137]] Hızı m/s, alanı m² olarak kullanınca sonuç m³/s çıkar; aort örneğinin başlangıç değeri 0,0001 m³/s’dir. [[K6 s. 137–138]]</p>
</section>
<section class="wrap blk ders-sec" id="fk08a-tabaka">
<h2>Laminer akımda hız profili</h2>
<p class="intro">Düz ve geniş bir tüpte yavaş ilerleyen akışkanı, birbirine paralel hareket eden iç içe silindir tabakaları olarak düşünebiliriz. [[K6 s. 138–139]]</p>
${sekil('profil', 'Duvara yakın bir tabaka ile merkezdeki tabakayı karşılaştırın')}
<p>Düzenli akan nehirde su ortada hızlı, kıyıya yakın kesimde yavaştır; tüpte de duvarla sürtünme en dıştaki tabakayı yavaşlatır. [[K6 s. 138]] Aynı kesitte farklı hızlar bir arada bulunduğundan ölçümlerde ve hesaplarda genellikle <b>ortalama hız</b> kullanılır. [[K6 s. 138]]</p>
<p>Şekle tüp boyunca yandan bakıyorsunuz; merkezden eşit uzaklıktaki iki ok aynı silindirik tabakanın iki tarafını temsil eder. [[K6 s. 138–139]] Hız oklarını duvardan eksene doğru izleyin: tüm tabakalar aynı yöne gitse de aynı sürede aldıkları yol farklıdır. [[K6 s. 138–139]]</p>
<p>Aort hesabında bulduğunuz 14 cm/s de böyle bir ortalamadır; sonuçtan, kesitin her noktasındaki kanın aynı hızla ilerlediği çıkarılamaz. [[K6 s. 137–138]]</p>
<p>Tabakalar birbirine göre farklı hızlarda düzenli ilerlediği sürece akım laminerdir; girdap veya türbülans gelişince bu profil korunmaz. [[K6 s. 138–139]] [[K6 s. 142]]</p>
</section>
<section class="wrap blk ders-sec" id="fk08a-direnc">
<h2>Laminer akımda basınç farkı ve tüp direnci</h2>
<p class="intro">Akışkanı yüksek basınçtan düşük basınca doğru hareket ettiren, iki nokta arasındaki basınç farkıdır. [[K6 s. 139]]</p>
${sekil('tup', 'Yarıçapın etkisini hangi uzunluk dengeler?')}
<p>Akım varken direncin iki ucu arasında basınç düşüşü vardır. [[K6 s. 139–140]] Tüpteki darlık belirli bir basınç farkında akımı kısıtlar; aynı debiyi sürdürmek için daha yüksek itici basınç gerekir. [[K6 s. 139–140]] Damar hastalığına sıklıkla hipertansiyon eşlik eder; artmış sistemik dirence karşı yeterli kan akımı sağlamak kalbin daha yüksek basınç üretmesini gerektirir. [[K6 s. 140]]</p>
<div class="card fk08a-hesap"><h3>Basınçtan debiye</h3><ul>
<li><b>Ohm benzetmesi.</b> Laminer akımda <i>Q̇</i> = Δ<i>P</i>/<i>R</i>; sabit dirençte debi, itici basınç farkıyla doğru orantılıdır. [[K6 s. 140]]</li>
<li><b>Hagen–Poiseuille.</b> Sıkıştırılamayan viskoz bir sıvı tüpte laminer akıyorsa <i>R</i> = 8<i>ηL</i>/(π<i>r</i><sup>4</sup>) ve <i>Q̇</i> = π<i>r</i><sup>4</sup>Δ<i>P</i>/(8<i>ηL</i>) olur. [[K6 s. 141–142]]</li>
<li><b>Birimler.</b> Δ<i>P</i> basınç farkı (Pa), <i>R</i> akıma direnç (Pa·s/m³), <i>η</i> dinamik viskozite (Pa·s), <i>L</i> uzunluk ve <i>r</i> iç yarıçaptır (m). [[K6 s. 140–142]]</li></ul></div>
<p>Grafikte önce uzunluk oranını birde bırakıp yarıçapı değiştirin: yatay eksende iki katına çıkan yarıçapın karşılığı düşey eksende 16 kat debidir. [[K6 s. 141–142]] Ardından yarıçap oranını ikide tutup uzunluk oranını 16’ya getirin; aynı basınç farkında debi başlangıç değerine döner. [[K6 s. 141–142]]</p>
<p>Bu karşılaştırmayı basınç yönünden de okuyabilirsiniz: aynı sıvıyla ve aynı tüpte hedef debi artarsa itici basıncı artırmanız gerekir. [[K6 s. 140–141]] Buna karşılık hedef debi sabitse gerekli basıncı belirleyen tüpün direncidir; eşit dirençli iki tüpün görünüşleri farklı olsa bile gerektirdikleri basınç farkı aynıdır. [[K6 s. 140–142]]</p>
<p>Pay ile paydayı ayrı okuyun: aynı sıvı ve aynı uzunlukta daha geniş bir lümen debiyi artırır; aynı lümende daha viskoz bir sıvı kullanmak ise debiyi azaltır. [[K6 s. 141–142]] Bu nedenle bir kanülden geçecek akımı yalnız kanül numarasıyla tarif etmek için eksik bilgi kalır; sıvı özellikleri ve uygulanan basınç farkı da sonucu belirler. [[K6 s. 140–142]]</p>
<h3>Kanül seçimi ve sıvının etkisi</h3>
<ul><li><b>Çap.</b> Daha dar olan 15 G kanülün akıma direnci 14 G kanülünkinden belirgin biçimde yüksektir. [[K6 s. 141]]</li>
<li><b>Viskozite.</b> Dar tüpte %50 glukoz çözeltisi sudan daha yavaş akar. [[K6 s. 141]]</li>
<li><b>Uzunluk.</b> Direnç uzunlukla doğru orantılıdır; öteki koşullar sabitken yarıçap iki katına çıkarsa aynı basınçla 16 kat debi elde edilir. [[K6 s. 141–142]] Geniş tüp aynı zamanda 16 kat daha uzunsa iki tüpün direnci eşit olur. [[K6 s. 142]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="fk08a-re">
<h2>Girdaplar ne zaman gelişir?</h2>
<p class="intro">Türbülanslı akımda akışkan bütünüyle bir yöne ilerlerken içindeki küçük akımlar düzensiz yollar izler. [[K6 s. 142]]</p>
${sekil('re', 'Su örneğinde hızı artırın ve akım desenini izleyin')}
<p>Akarsuyun çağlayan kesiminde suyun izleyeceği yolu kestirmek güçtür; sakin bir nehrin kıyısındaki küçük dönmeler ise türbülansın öncüsü olabilir. [[K6 s. 142]] Tüpte engeller, keskin açılar ve çatallanma noktaları yakınında önce küçük dönmeler, akım arttıkça belirgin girdaplar ve sonunda tam gelişmiş türbülans görülebilir. [[K6 s. 142–143]]</p>
<p>Manchester Üniversitesinin ilk mühendislik profesörlerinden Osborne Reynolds’un (1842–1912) adını taşıyan sayı, kontrollü koşullarda hangi akım tipinin baskın olacağını kestirmeye yarar. [[K6 s. 143]] <b>Re = ρ<i>vD</i>/η = 2ρ<i>vr</i>/η</b> boyutsuzdur; ρ yoğunluk (kg/m³), <i>v</i> ortalama hız (m/s), <i>D</i> iç çap (m), <i>r</i> yarıçap (m), η dinamik viskozitedir (Pa·s). [[K6 s. 143–144]]</p>
<ul><li><b>Re &lt; 2000.</b> Laminer akım baskındır. [[K6 s. 143]]</li>
<li><b>Re 2000–4000.</b> Geçiş bölgesinde laminer akıma küçük dönmeler veya girdaplar eşlik edebilir. [[K6 s. 143]]</li>
<li><b>Re &gt; 4000.</b> Türbülanslı akım baskındır. [[K6 s. 143]]</li></ul>
<p>Şekilde suyun özellikleri ve tüpün çapı sabittir; hız kaydırıcısı bu nedenle Reynolds sayısını hızla aynı oranda değiştirir. [[K6 s. 143–144]] Geçiş bölgesinde tek bir yerel dönme görmek, tüpün bütününde tam gelişmiş türbülans olduğunu söylemek için yeterli değildir. [[K6 s. 142–143]]</p>
<p>Diğer değişkenler sabitken hızın, yoğunluğun veya yarıçapın artması ya da viskozitenin azalması türbülansı kolaylaştırır. [[K6 s. 143–144]]</p>
<div class="card fk08a-hesap"><h3>Hesap · Suyla dolu tüpte hangi akım baskın?</h3>
<p>Suyun yoğunluğu 1000 kg/m³, hızı 0,2 m/s, tüpün yarıçapı 1 cm ve dinamik viskozite 8,9 × 10<sup>−4</sup> Pa·s alınır. [[K6 s. 144]] Çap 0,02 m olduğundan Re = (1000 × 0,2 × 0,02)/(8,9 × 10<sup>−4</sup>) ≈ <b>4494</b> bulunur; 4000’in üzerinde türbülans baskındır. [[K6 s. 143–144]]</p></div>
<p><b>Sonucu değiştiren bir okuma hatası.</b> Verilen 1 cm’yi çap yerine koyarsanız hesaplanan Re yarıya iner ve yaklaşık 2247 çıkar. [[K6 s. 143–144]] Bu değer sizi geçiş bölgesine götürürdü; oysa sorudaki 1 cm yarıçaptır ve doğru hesap 4000 sınırını aşar. [[K6 s. 143–144]]</p>
<p>Hesapta verilen uzunluğun yarıçap mı çap mı olduğuna bakın: 1 cm yarıçap, Reynolds denklemindeki çap için 2 cm anlamına gelir. [[K6 s. 143–144]] Sayısal sonucu yorumlarken önce 2000 ve 4000 ile karşılaştırın, sonra baskın akım desenini adlandırın. [[K6 s. 143–144]]</p>
<p class="note"><b>Atlas notu.</b> Kitap su örneğinde dinamik viskozite birimini N·m⁻³·s olarak verir. [[K6 s. 144]] Doğrusu N·m⁻²·s, yani Pa·s’dir; bu birimle Reynolds sayısında boyutlar sadeleşir. [[K6 s. 143–144]]</p>
<p><b>Hız kaydırıcısında sınırları bulun.</b> Aynı su ve aynı tüp için denklemi hıza göre düzenleyin: <i>v</i> = Re·η/(ρ<i>D</i>). [[K6 s. 143–144]] Re = 2000 için yaklaşık 0,089 m/s, Re = 4000 için yaklaşık 0,178 m/s elde edilir. [[K6 s. 143–144]] Bu iki hız arasında küçük dönmeler görülebilirken suyun ana akım yönü yine tüp boyunca ileridir. [[K6 s. 142–144]] Bunlar verilen su örneğine ait hızlardır; farklı bir çap, yoğunluk veya viskozite ile aynı Reynolds sayısına başka bir hızda ulaşılır. [[K6 s. 143–144]]</p>
<p>Manşon sorusunda ve tüp sorusunda hangi büyüklüğün sabit tutulduğunu ayırın: manşon altında daralan damarda debi korunurken, su hesabında hız ve çap ayrı ayrı verilmiştir. [[K6 s. 137]] [[K6 s. 144]]</p>
<h3>Yatak başında ne duyulur, hava yollarında ne değişir?</h3>
<ul><li><b>Damar sesleri.</b> Ejeksiyon üfürümleri, karotis üfürümleri ve manşonla ölçümde duyulan Korotkoff sesleri türbülansla ilişkilidir. [[K6 s. 144]]</li>
<li><b>Manşon.</b> Basınç diyastolik değeri aştığında brakiyal arter kısmen daralır; manşon basıncı sistolik değere yaklaşana kadar akım korunur ve dar kesitte kan hızlanır. [[K6 s. 144]] Reynolds sayısındaki artışla gelişen türbülansın sesi stetoskopla duyulabilir. [[K6 s. 144]]</li>
<li><b>Hava yolları.</b> Büyük hava yollarında baskın olan türbülans her solukta trakea ve büyük bronşlardaki havanın tazelenmesini sağlar. [[K6 s. 144]] Küçük hava yollarında hız ve Re düşüktür; baskın laminer akımla hava alveollere az enerji harcanarak ulaşır. [[K6 s. 144]]</li></ul>
<p class="note"><b>Atlas notu.</b> Kitap manşon örneğinde hem daralmayı hem hızlanmayı Re artışının nedenleri olarak sayar. [[K6 s. 144]] Doğrusu, hız sabitken daralma Re’yi düşürür; debi sabitken ise hız 1/<i>r</i><sup>2</sup> ile arttığından net etki Re’nin 1/<i>r</i> ile artmasıdır. [[K6 s. 137]] [[K6 s. 143–144]]</p>
</section>
<section class="wrap blk ders-sec" id="fk08a-basinc">
<h2>Basınç–akım eğrisini okumak</h2>
<p class="intro">Akım laminerken debiyi ikiye katlamak için basınç farkını ikiye katlamak yeterlidir; türbülanslı akımda aynı artış dört kat basınç farkı gerektirir. [[K6 s. 140–141]] [[K6 s. 145]]</p>
${sekil('basinc', 'Seçtiğiniz debi için gereken basınç farkını okuyun')}
<p>Şekilde bir kat debiden başlayın ve kaydırıcıyı iki kat debiye taşıyın. Kesikli doğru üzerinde her eşit debi artışı için eşit bir basınç artışı gerekir. [[K6 s. 140–141]] Sürekli eğri üzerinde ise aynı yatay adımın düşey karşılığı, yüksek debiye gidildikçe büyür. [[K6 s. 145]]</p>
<p>Basınç farkı verildiğinde eğriyi ters yönde okuyabilirsiniz: türbülanslı akımda düşey eksende dört kat basınç farkından yatay eksene dönünce iki kat debi bulursunuz. [[K6 s. 145]] Laminer doğru üzerinde ise basınç farkındaki oransal değişim, debide aynı oransal değişimi verir. [[K6 s. 140–141]]</p>
<p>Laminer akım grafiğinde düşey eksene itici basınç farkını, yatay eksene debiyi koyarsanız doğrunun eğimi tüpün direncini verir. [[K6 s. 140–141]] Türbülanslı akımda akışkan daha hızlı, ancak daha dolambaçlı bir yoldan ilerler. [[K6 s. 145]] <i>Q̇</i> ∝ √Δ<i>P</i> olduğundan Δ<i>P</i> ∝ <i>Q̇</i><sup>2</sup> olur; debi yükseldikçe eğri dikleşir ve akıma karşı direnç artar. [[K6 s. 145]]</p>
</section>
<section class="wrap blk ders-sec" id="fk08a-baglanti">
<h2>Solunum devresinde bağlantının iç yolu</h2>
<p class="intro">Solunum devresinde aynı debiye karşı oluşan direnç, bağlantının dönüş biçimine göre değişebilir. [[K6 s. 145–146]]</p>
${sekil('baglanti', 'İki bağlantıda gazın dönüş yerini bulun')}
<p>Önce her bağlantının girişinden çıkışına kadar lümeni izleyin. Solda duvar gazı bir yay boyunca yönlendirir; sağda gazın yolu iç köşede aniden döner. [[K6 s. 145–146]] İki devreyi aynı akımda karşılaştırırken sorun, gazı bu dönüşten geçirmek için ne kadar basınç farkına ihtiyaç duyulduğudur. [[K6 s. 145–146]]</p>
<p>İyi tasarlanmış bir kateter bağlantısında akımın laminer kalması beklenir. [[K6 s. 146]] Dik açılı bir birleşimde keskin köşe girdapların oluşmasına elverişlidir; gelişen türbülans devreye ek direnç getirebilir. [[K6 s. 145–146]]</p>
</section>
<section class="wrap blk ders-sec" id="fk08a-p1"><h2>Part I · Doğru mu, yanlış mı?</h2>
<div class="viz"><div data-viz="mtf" data-q="fk08a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk08a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk08a-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk08a-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><b>Açılış sorusu</b><p>Solunum devresine keskin dirsekli bir bağlantı takıldı. Aynı gaz akımını sağlamak için daha fazla basınç gerekmesini nasıl açıklarsınız?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>İki uç arasındaki basınç farkı akımı sürdürür; laminer akımda bu fark debiyle doğru orantılıdır. [[K6 s. 139–141]]</li>
<li>Keskin dönüş çevresinde yerel girdaplar doğabilir ve debi yükseldikçe türbülans gelişebilir. [[K6 s. 142–143]] [[K6 s. 145–146]]</li>
<li>Türbülans baskınsa gereken basınç farkı debinin karesiyle artar. [[K6 s. 145]]</li>
<li>Yoğunluk, hız, çap ve viskoziteden Re’yi hesaplayıp kontrollü koşullarda beklenen rejimi tarif ederim. [[K6 s. 143–144]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Yatay eksene debiyi, düşey eksene basınç farkını yerleştirin; laminer doğruyu ve türbülanslı akımın giderek dikleşen eğrisini gösterin. [[K6 s. 140–141]] [[K6 s. 145]]</div>
<div class="note plain"><b>Ek sorular.</b> Aortta Doppler hızını debiye çevirmek için hangi ölçüm eksik? [[K6 s. 137]] Korotkoff sesleriyle kısmi damar daralması arasında nasıl bir ilişki var? [[K6 s. 144]]</div></div></section>
<section class="wrap blk ders-sec" id="fk08a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Debi, kesit alanı ile ortalama hızın çarpımıdır. [[K6 s. 137]]</li>
<li>Laminer akımda tüp direnci uzunluk ve viskoziteyle artar, yarıçapın dördüncü kuvvetiyle ters orantılıdır. [[K6 s. 141–142]]</li>
<li>Reynolds sayısı 2000’in altındayken laminer, 4000’in üzerindeyken türbülanslı akım baskındır. [[K6 s. 143]]</li>
<li>Türbülanslı akımda debiyi iki katına çıkarmak dört kat basınç farkı gerektirir; keskin dönüşler ek direnç yaratabilir. [[K6 s. 145–146]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="08a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/07">← Nem, nemlendirme ve nebülizörler</a><a href="#/dersler/fizik/08b">Sonraki: Bernoulli, Venturi ve Coanda etkileri; hacim ve akım ölçümü →</a></nav></section>`,
  };
})();
