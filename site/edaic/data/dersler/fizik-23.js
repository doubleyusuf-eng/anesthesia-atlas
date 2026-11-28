VERI.sorular = VERI.sorular || {};
VERI.sorular['fk23-1'] = {
  no: 1, kok: 'Atım, yankı ve tarama', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 378–382]]',
  onermeler: [
    {t:'Tek piezoelektrik eleman aynı anda hem atım gönderir hem yankıyı dinler.', d:false, n:'Eleman kısa süre ses üretir, sonra gönderimi keserek dönen yankıları algılar. [[K6 s. 379]]'},
    {t:'Derinlik hesabında sesin gidiş ve dönüş süreleri birlikte ölçülür.', d:true, n:'Ölçülen süre iki yolu kapsadığı için hız ile sürenin çarpımı ikiye bölünür (2<i>d</i> = <i>v</i>·<i>t</i>). [[K6 s. 379]]'},
    {t:'Curie sıcaklığına erişen kristal piezoelektrik özelliğini kaybeder.', d:true, n:'Kristalin uygulanan akıma uygun titreşebilmesi için bu sıcaklığın altında kalması gerekir. [[K6 s. 379]]'},
    {t:'Dizinin bütün elemanları birlikte uyarıldığında dalga cephesi prob yüzüne diktir.', d:false, n:'Eşzamanlı uyarıda dalga cephesi dizi yüzüne paraleldir. [[K6 s. 380]]'},
    {t:'M-modunda yatay eksen yankı genliğini gösterir.', d:false, n:'Yatay eksen zamandır, yankının şiddeti ise çizginin parlaklığıyla gösterilir. [[K6 s. 382]]'}
  ]
};
VERI.sorular['fk23-2'] = {
  no: 2, kok: 'Görüntünün oluşumu ve sınırları', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 383–389]]',
  onermeler: [
    {t:'Frekans yükseldikçe dokuda birim yol başına zayıflama artar.', d:true, n:'Yüksek frekanslı dalganın enerjisi uzaklıkla daha çabuk azalır. [[K6 s. 384]]'},
    {t:'Eşit akustik empedanslı iki ortamın sınırı güçlü yankı verir.', d:false, n:'Empedans farkı sıfırsa sınırdan yansıyan şiddet de sıfırdır. [[K6 s. 386]]'},
    {t:'Işını hedef derinlikte daraltmak lateral çözünürlüğü artırır.', d:true, n:'Yan yana iki yapının ayrılabilmesi ışın genişliğine bağlıdır. [[K6 s. 388]]'},
    {t:'Prob çapı büyüdüğünde Fresnel bölgesi daha derine uzanır.', d:true, n:'Yakın alanın derinliği prob çapı ve frekansla artar. [[K6 s. 389]]'},
    {t:'Derine özgü kazanç ayarı geç gelen yankıların zayıflamasını telafi edebilir.', d:true, n:'Zamana bağlı kazanç telafisi seçilen derinliklerde alıcı duyarlılığını artırır. [[K6 s. 383–385]]'}
  ]
};
VERI.sorular['fk23-3'] = {
  no: 3, kok: 'Doppler, ekokardiyografi ve tedavi', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 383]] [[K6 s. 390–392]]',
  onermeler: [
    {t:'Sürekli dalga Doppler tek başına hızın hangi derinlikten geldiğini belirler.', d:false, n:'Sürekli dalga ışın boyunca hızları toplar, derinlik seçimi için atımlı Doppler kullanılır. [[K6 s. 383]]'},
    {t:'Ses ışınına dik kan akımında Doppler frekans kayması kaybolur.', d:true, n:'Akım ışına dikse Doppler kayması oluşmaz. [[K6 s. 392]]'},
    {t:'Özofagus varisleri transözofageal ekokardiyografinin kontrendikasyonları arasındadır.', d:true, n:'Kitap özofagus varislerini, hiatus hernisini ve geçirilmiş özofagus cerrahisini TOE kontrendikasyonları olarak sayar. [[K6 s. 390]]'},
    {t:'Termal indeks kabarcık oluşturma potansiyelini gösterir.', d:false, n:'Kavitasyon potansiyelini mekanik indeks, dokuyu ısıtma potansiyelini termal indeks tanımlar. [[K6 s. 391]]'},
    {t:'Fakoemülsifikasyonda parçalanan katarakt aspirasyonla uzaklaştırılır.', d:true, n:'Korneal kesiden ilerletilen probun ultrasonla emülsifiye ettiği parçalar emilerek alınır. [[K6 s. 391]]'}
  ]
};

(() => {
  const nav = [
    ['yanki','Atım ve yankı'], ['prob','Prob kesiti'], ['dizi','Işın yönü'], ['goruntu','Görüntü kipleri'],
    ['doppler','Doppler'], ['zayiflama','Zayıflama'], ['sinir','Doku sınırı'], ['cozunurluk','Çözünürlük'],
    ['kalp','Kalp pencereleri'], ['tedavi','Tedavi'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet']
  ];
  const sekil = (id, ad, alt) => `<div class="viz"><div class="viz-head"><h3>${ad}</h3></div><div data-viz="fk23_${id}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${alt}</p></div>`;
  SAYFALAR['dersler/fizik/23'] = {
    grup:'dersler', eyebrow:'Fizik · Bölüm 23', baslik:'Ultrason',
    lede:'Bir yankının dönüş süresi yansıtıcının derinliğini, hareketli kandan dönerken değişen frekansı ise akım hakkında bilgi verir. [[K6 s. 378]] [[K6 s. 392]]',
    html:`<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id,ad],i)=>`<button type="button" data-scroll="fk23-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="fk23-yanki">
<h2>Yankının süresinden derinliğe</h2>
<p class="intro">Prob kısa bir ses atımı gönderir ve bir sınırdan dönen yankıyı bekler. [[K6 s. 378–379]] Sesin ortamdaki hızı biliniyorsa bekleme süresi, sınırın proba uzaklığını verir. [[K6 s. 378]]</p>
${sekil('yanki','Aynı sürede ses ne kadar derine gider?','Eğri, seçilen ortamdaki ses hızı ve atımın gidiş-dönüş süresinden hesaplanır. [[K6 s. 378]] [[K6 s. 387]]')}
<p>Bir mağarada duvardan dönen ses, duvar uzaklaştıkça daha geç duyulur. [[K6 s. 378]] Geri giden bir otomobilin park sensörü aynı ilkeyle art arda atım gönderir ve dönüş süresi kısaldığında yaklaşan engeli bildirir. [[K6 s. 379]] Denizaltı sonarı da deniz tabanını ve başka araçları yankıyla bulur, ancak kitap bu örnekte işitilebilir frekansları tarif eder. [[K6 s. 377]]</p>
<div class="note"><b>Derinlik hesabı</b><p><i>d</i> = <i>c</i> · Δ<i>t</i> / 2 denkleminde <i>d</i> proba uzaklık (m), <i>c</i> ses hızı (m/s), Δ<i>t</i> atımın gönderilmesiyle yankının alınması arasında geçen süredir (s). [[K6 s. 379]] Çarpım, sesin hedefe varana kadar ve hedeften dönerken aldığı yolların toplamıdır; kitap bunu 2<i>d</i> = <i>v</i>·<i>t</i> (Denklem 23.1) olarak yazar. [[K6 s. 378–379]]</p></div>
<ul class="ozet">
<li><b>Frekans.</b> İnsan kulağının üst işitme sınırı olan 20 000 Hz'i (20 kHz) aşan ses ultrasondur. [[K6 s. 377]] Tıbbi uygulamalarda genellikle megahertz kullanılır ve 1 MHz = 10<sup>6</sup> Hz'dir. [[K6 s. 377]] Frekans seçimi, incelemenin amacı ve erişilmek istenen derinlikle ilişkilidir. [[K6 s. 377]]</li>
<li><b>Yayılma hızı.</b> Dokudaki hız suyun hızına yakındır (yaklaşık 1 500 m/s), havada ise 330 m/s'dir. [[K6 s. 377–378]] Gerçek hız dokudan dokuya değişse de tanısal tarayıcılar ortalama doku için genellikle 1 540 m/s kabul eder. [[K6 s. 378]]</li>
<li><b>Kullanım.</b> Ultrasonla kan akımı saptanabilir ve ölçülebilir, organlar ve fetüs görüntülenebilir. [[K6 s. 377]] Kitap, tanısal taramada kullanılan tipik düşük enerjilerde kalıcı doku etkisi görülmemesini gebelikte görüntüleme açısından bir üstünlük olarak verir. [[K6 s. 377]] Böbrek taşının akustik enerjiyle parçalanması ise tedavi amaçlı kullanıma örnektir. [[K6 s. 377]]</li></ul>
<div class="note plain"><b>Atlas notu.</b> Kitap yoğunluk arttıkça ses hızının arttığını söyler. [[K6 s. 378]] Doğrusu, hız ortamın hem elastik özelliklerine hem yoğunluğuna bağlıdır.</div>
<details><summary>Hesap kartı · Grafikteki noktayı elle bulun</summary>
<p>Ortalama doku seçiliyken kaydırıcıyı 2 µs'ye getirin. Bu örnek sürede sesin aldığı toplam yol 1 540 m/s × 2 × 10<sup>−6</sup> s = 0,00308 m, yani 3,08 mm'dir. [[K6 s. 378]] Sınırın proba uzaklığı bunun yarısı olan 1,54 mm'dir. [[K6 s. 379]]</p>
<p>Süreyi değiştirmeden suyu seçin. Tablodaki su hızıyla aynı hesap 1 480 × 2 × 10<sup>−6</sup> / 2 = 0,00148 m, yani 1,48 mm verir. [[K6 s. 378]] [[K6 s. 387]] Grafikteki iki noktanın yükseklik farkı, aynı gecikmenin farklı ortamlarda farklı uzaklıklara karşılık gelmesinden doğar. [[K6 s. 378]] [[K6 s. 387]]</p>
<p>Şimdi tek bir ortamda kalın ve süreyi yarıya indirin. Hız değişmediğinde gidiş ve dönüş yollarının toplamı da hesaplanan derinlik de yarıya iner. [[K6 s. 378]] Düz çizginin eğimi ses hızının yarısıdır. [[K6 s. 378]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk23-prob">
<h2>Bir prob nasıl hem gönderir hem dinler?</h2>
<p class="intro">Piezoelektrik kristal elektriksel uyarıyı mekanik titreşime, dokudan dönen basınç değişimini ise ölçülebilir bir elektrik sinyaline dönüştürür. [[K6 s. 379]]</p>
${sekil('prob','Probun dokuya bakan yüzünü inceleyin','Kesitte seramik elemanların dizildiği sıra ile dokuyla temas eden dış kaplama gösterilir. [[K6 s. 380]]')}
<ul class="ozet"><li><b>Gönderim.</b> Akım bir yönde geçtiğinde seramik kristal genişler, ters yönde geçtiğinde büzülür. [[K6 s. 379]] Alternatif akım uygulandığında bu hareket akımın frekansında tekrarlanır ve hassas biçimde ses üretilir. [[K6 s. 379]] Yayılan enerji mekanik olduğu için elektronik cihaz ve alanlarla girişim sınırlıdır. [[K6 s. 379]]</li>
<li><b>Sıcaklık sınırı.</b> Kristal, çoğunlukla birkaç yüz santigrat derece düzeyindeki Curie sıcaklığına ulaştığında piezoelektrik özelliğini yitirir. [[K6 s. 379]]</li>
<li><b>Alım.</b> Dönen dalganın sıkışma evresi küçük bir akım oluşturur, seyrelme evresinde akımın yönü tersine döner. [[K6 s. 379]] Bu akımın zamanı, genliği ve frekansı gelen dalganın aynı özelliklerini okumayı sağlar. [[K6 s. 379]]</li>
<li><b>Dinleme aralığı.</b> Tek kristal, hoparlör ve mikrofon işlevlerini sırayla üstlenir. [[K6 s. 379]] Kısa gönderimler arasındaki uzun sessiz aralık, en son yankının da dönmesine yetecek kadar sürmelidir. [[K6 s. 379]]</li></ul>
<p>Başlığın dış yüzü incelenecek anatomik bölgeye oturacak biçimde yapılır. [[K6 s. 380]] Dokunun akustik empedansına yakın silikon kauçuk veya benzeri kaplama ve dönüştürücünün başlık içindeki yerleşimi dokuya enerji iletimini artırır. [[K6 s. 380]] İnce seramik dilim, hedef frekansta rezonansa girecek biçimde boyutlandırılır. [[K6 s. 380]] Kalınlığı kristaldeki yarım dalga boyudur ve hedef frekansa bağlı olarak yaklaşık 2 mm mertebesinde olabilir. [[K6 s. 380]]</p>
<details><summary>Enerjinin yolunu parmağınızla izleyin</summary>
<p>Gönderirken seramik elemandan başlayın. Elektrik akımının yön değiştirmesi kristalin art arda genişleyip büzülmesine yol açar. [[K6 s. 379]] Mekanik titreşim probun temas yüzünden dokuya geçer ve enerjinin ne kadarının geçebileceği bu yüzün dokuyla akustik uyumuna bağlıdır. [[K6 s. 380]]</p>
<p>Dinlerken yolu tersinden izleyin. Yankı prob yüzüne ulaşıp kristali sıkıştırdığında bu kez ölçülen büyüklük küçük bir elektrik akımıdır. [[K6 s. 379]] Akımın ne zaman geldiği derinlik hesabına, ne kadar güçlü olduğu ise görüntüdeki parlaklığa girer. [[K6 s. 378–379]] [[K6 s. 381–382]]</p>
<p>İkinci atımı ne zaman gönderebilirsiniz? En uzak sınırın yankısı henüz dönmeden eleman yeniden gönderime geçerse o sırada yankıyı dinleyemez. [[K6 s. 379]] Bu yüzden dinleme aralığını değerlendirirken yalnız en yakın yapıyı düşünmek yeterli olmaz. [[K6 s. 379]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk23-dizi">
<h2>Probu oynatmadan ışının yönünü değiştirmek</h2>
<p class="intro">Faz dizili probda yan yana sıralanan küçük elemanların her biri bağımsız olarak ses gönderebilir ve yankı alabilir. [[K6 s. 380]] Elemanları uyarma sırası, oluşan dalga cephesinin yönünü belirler. [[K6 s. 380–381]]</p>
${sekil('dizi','Elemanlar hangi sırayla uyarılsın?','Çizgiler ortak dalga cephesini, ok ilerleme yönünü gösterir. [[K6 s. 380–381]]')}
<p>Tüm elemanlara aynı anda akım verilirse küresel dalgalar yapıcı girişimle birleşir ve dizinin yüzüne paralel düz bir cephe oluşturur. [[K6 s. 380–381]] Elemanlar sırayla uyarılırsa bir uçtan çıkan dalga diğer uçtakine göre yol almış olur ve ortak cephe eğilir. [[K6 s. 380–381]] Ardışık uyarılar arasındaki gecikme büyüdükçe ışın daha eğik çıkar. [[K6 s. 380]]</p>
<p>Farklı açılarda art arda atım gönderilmesi dokuyu yelpaze biçiminde tarar. [[K6 s. 381]] Kitap, hastanede iki boyutlu görüntü üreten modern sistemleri bu dizi ilkesiyle açıklar. [[K6 s. 380]] Matris dizili dönüştürücüler ise incelenen yapının üç boyutlu görüntüsünü oluşturabilir. [[K6 s. 381]]</p>
<details><summary>Dalga cephesini ve ışının yönünü ayırt edin</summary>
<p>Eşzamanlı uyarıyı seçin ve dizinin iki ucundaki dalgalara bakın. İki uçtan çıkan ses aynı anda yola koyulduğu için ikisinin de ulaştığı uzaklık aynıdır. [[K6 s. 380–381]] Birleşik cephenin diziye paralel durması, sesin prob yüzünden dokuya doğru ilerlemesiyle uyumludur. [[K6 s. 380–381]]</p>
<p>Uzun gecikmeye geçin ve ilk uyarılan elemanı bulun. Aynı anda bakıldığında bu elemanın dalgası daha uzağa ulaşmıştır. [[K6 s. 380–381]] Bir çizgiyi elde etmek için elemanların zamanlaması birlikte seçilir, yelpazenin sonraki çizgisine geçmek için aynı dizinin zamanlaması değiştirilir. [[K6 s. 380–381]] Böylece prob yüzündeki eleman sırası ile ekranda açılar boyunca sıralanan tarama çizgileri arasındaki ilişki görülebilir. [[K6 s. 380–382]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk23-goruntu">
<h2>Bir yankı ekranda nasıl gösterilir?</h2>
<p class="intro">En sık kullanılan B-modunda yankının gecikmesi noktanın derinliğini, tarama açısı yandaki yerini ve yankının şiddeti parlaklığını belirler. [[K6 s. 381–382]]</p>
${sekil('goruntu','Aynı dokuyu A, B ve M kiplerinde okuyun','Şematik ekranlarda konum, yankı şiddeti ve zaman farklı biçimlerde kodlanır. [[K6 s. 381–382]]')}
<ul class="ozet"><li><b>A-modu · Bir hat boyunca yankı.</b> Tek dönüştürücü dokunun içinden bir çizgiyi tarar. [[K6 s. 382]] Yankılar tek boyutta derinliğe göre çizilir ve yansıtıcının yeri tepenin konumundan okunur. [[K6 s. 382]] Tarihsel olarak ilk ve en basit kiptir, günümüzde kullanımı neredeyse terk edilmiştir. [[K6 s. 382]]</li>
<li><b>B-modu · Bir düzlemde kesit.</b> Doğrusal bir eleman dizisi düzlemi tarar, her hattan alınan yankılar ekran üzerindeki piksellere dönüşür. [[K6 s. 381–382]] Tarama doğrusal veya yelpaze (sektör) biçiminde olabilir. [[K6 s. 382]] Görüntüden dokudaki yapıların konumu, biçimi ve yoğunluğu hakkında bilgi edinilir. [[K6 s. 382]] Koordinatlar lateral yön (X), derinlik (Y) ve kesit düzlemine dik yükselti (Z) olarak tanımlanır. [[K6 s. 382]]</li>
<li><b>M-modu · Aynı hattın zaman içindeki kaydı.</b> Tek boyutlu hat hızla art arda örneklenir ve her örnek, parlaklığı yankı şiddetini temsil eden düşey bir çizgi oluşturur. [[K6 s. 382]] Bu çizgiler soldan sağa yan yana eklendiğinde atan kalpte bölgeler arasındaki sınırlar izlenebilir. [[K6 s. 382]] Bir sınırın zaman içinde proba göre yer değiştirmesinden kalp çevrimi boyunca hızı belirlenebilir. [[K6 s. 382]]</li></ul>
<h3>Ekranda ölçüm ve görüntü ayarı</h3>
<dl class="fk23-terimler"><dt>Dondurma</dt><dd>Görüntüyü sabitleyerek gözlem ve ölçüme zaman tanır, görüntüler tanısal değerlendirme için saklanabilir. [[K6 s. 383]]</dd>
<dt>Büyütme (res/zoom)</dt><dd>İlgilenilen alanı büyütürken görünen alanı daraltır. [[K6 s. 383]]</dd>
<dt>Ölçüm pergeli (caliper)</dt><dd>Seçilen iki nokta arasındaki mesafeyi ölçer, sıklıkla dondurulmuş görüntüde kullanılır. [[K6 s. 383]]</dd>
<dt>Kazanç (gain)</dt><dd>Alınan sinyali yükselterek görüntüyü genel olarak parlaklaştırır, artefaktlar da belirginleşir. [[K6 s. 383]]</dd>
<dt>Zamana bağlı kazanç telafisi (TGC)</dt><dd>Daha derinden dönen zayıf yankılar için alıcı duyarlılığını seçici olarak ayarlar. [[K6 s. 383]]</dd></dl>
<div class="note"><b>Dondurulmuş görüntüde hangi ölçüm yapılabilir?</b>
<p>Bir B kesitinde iki sınırın yerini belirledikten sonra görüntüyü dondurup pergeli bu iki noktaya yerleştirirseniz aralarındaki uzaklığı okursunuz. [[K6 s. 382–383]] Aynı hedefi büyüterek incelemek görünen alanı daraltır, genel kazancı artırmak ise o alandaki zayıf yankılarla birlikte artefaktları da belirginleştirir. [[K6 s. 383]]</p>
<p>Bir kapak sınırının kalp çevrimi boyunca hızı sorulduğunda gereken bilgi bu tek mesafeden farklıdır: zaman geçerken sınırın proba göre konumunun nasıl değiştiği izlenmelidir. [[K6 s. 382]] M-modunda aynı hattın ardışık kayıtları bunun için yan yana dizilir. [[K6 s. 382]]</p></div>
<details><summary>Bir kapak sınırının izini okuyun</summary>
<p>Önce A-modunu seçin. Tek tarama hattındaki iki yansıtıcıdan geç dönen yankı, derinlik ekseninde daha ileride bir tepe verir. [[K6 s. 378]] [[K6 s. 382]] Tepenin yüksekliği ise yankı genliğidir, bu nedenle daha yüksek bir tepe tek başına daha derin bir sınır anlamına gelmez. [[K6 s. 382]]</p>
<p>B-modunda komşu hatları da eklediğinizde bu yansıtıcıların kesitte nasıl uzandığını görürsünüz. [[K6 s. 381–382]] Şimdi M-moduna geçin ve tek bir hattı zaman içinde okuyun. Bir kapak sınırına ait yankının proba erken ve geç dönmesi, çizginin derinlik ekseninde yer değiştirmesi olarak izlenir. [[K6 s. 378]] [[K6 s. 382]]</p>
<p>İz yatay seyrediyorsa o süre boyunca sınırın proba uzaklığı sabittir. [[K6 s. 382]] Aynı zaman aralığında derinlikteki değişim büyürse proba göre hareketin o yöndeki hızı da büyür. [[K6 s. 382]] Dondurulmuş tek bir B kesitinde iki nokta arasını ölçmek ile bir kalp çevrimi boyunca bu hareketi izlemek bu nedenle farklı soruları yanıtlar. [[K6 s. 382–383]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk23-doppler">
<h2>Doppler ile akımın ölçülmesi</h2>
<p class="intro">Hareketli kandan yansıyan sesin frekansı değişir ve bu kayma akım hızının değerlendirilmesini sağlar. [[K6 s. 383]] [[K6 s. 392]] Akım ışına dik olduğunda frekans kayması oluşmaz. [[K6 s. 392]]</p>
${sekil('doppler','Hız bilgisi ışının neresinden geliyor?','Şema, sürekli dalgada ışın boyunca alınan bilgiyi atımlı Doppler örneklem hacmiyle karşılaştırır. [[K6 s. 383]]')}
<ul class="ozet"><li><b>Sürekli dalga (CW).</b> Dokudan geçen bir hat boyunca Doppler bilgisi alınır ve her andaki tüm hızlar zaman eksenine karşı çizilir. [[K6 s. 383]] Bu zaman gösterimi M-modunu andırır. [[K6 s. 383]]</li>
<li><b>Atımlı Doppler.</b> Kullanıcı iki boyutlu görüntü üzerinde küçük bir örneklem hacmi belirler. [[K6 s. 383]] Bu bölgeden alınan hız bilgisi zaman çizelgesinde gösterilir, böylece hızla birlikte hangi derinliğin örneklendiği de bilinir. [[K6 s. 383]]</li>
<li><b>Renkli Doppler.</b> Akım hızını temsil eden renk yelpazesi B-modu görüntünün üzerine bindirilir. [[K6 s. 383]] Kitabın tarif ettiği haritada probdan uzaklaşan akım kırmızı, yaklaşan akım mavidir. [[K6 s. 383]]</li>
<li><b>Dupleks.</b> İki boyutlu görüntü ile Doppler bilgisinin eşzamanlı sunumudur. [[K6 s. 383]]</li></ul>
<div class="note plain"><b>Atlas notu.</b> Kitap uzaklaşan akımı genellikle kırmızı, yaklaşanı mavi verir. [[K6 s. 383]] Doğrusu, yaygın varsayılan haritada yaklaşan kırmızı ve uzaklaşan mavidir, ancak harita ters çevrilebildiği için yön ekrandaki renk ölçeğinden okunur.</div>
<p><b>Kaydı okurken.</b> M-modunun ve Doppler hız kaydının yatay ekseninde zaman bulunur, ancak incelenen değişim farklıdır. [[K6 s. 382–383]] M-modunda bir doku sınırının derinliğini ardışık zamanlarda izlersiniz, Doppler kaydında ise hareketli kandan dönen sesin frekans değişimiyle saptanan hızları okursunuz. [[K6 s. 382–383]] [[K6 s. 392]] Dupleks sunumda kesit, bu hız bilgisinin anatomik bağlamını aynı anda görmeyi sağlar. [[K6 s. 383]]</p>
<details><summary>Tek ışın iki damarı keserse hız hangi damara aittir?</summary>
<p>Şemada sürekli dalgayı seçin ve vurgunun iki damardan da geçtiğini görün. Her iki damarda algılanan hızlar aynı zaman kaydına girebilir. [[K6 s. 383]] Yalnız bu kayda bakarak belirli bir hızın iki derinlikten hangisine ait olduğunu söyleyemezsiniz. [[K6 s. 383]]</p>
<p>Atımlı dalgayı seçtiğinizde vurgulanan hacmi iki boyutlu kesitte bulun. Artık zaman kaydı o hacimden örneklenen hızı gösterir. [[K6 s. 383]] Bunun için hareketin ışın doğrultusunda bir bileşeni bulunmalıdır, tam dik kesişmede akım sürse bile kayma oluşmaz. [[K6 s. 392]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk23-zayiflama">
<h2>Frekans seçimi ve derinden gelen zayıf yankı</h2>
<p class="intro">Atım dokuda ilerlerken genliği ve şiddeti azalır. [[K6 s. 384]] Frekans arttıkça birim uzaklık başına zayıflama artar, seçilebilen ayrıntı artarken ulaşılabilen derinlik azalır. [[K6 s. 384]]</p>
${sekil('zayiflama','Hedef yüzeyde mi, derinde mi?','Frekansın ayrıntı ve erişim üzerindeki karşıt etkileri nitel olarak gösterilir. [[K6 s. 384–385]]')}
<p>Kitabın ses benzetmesinde uzaktaki tiz ses daha anlaşılırken pes ses daha uzaktan duyulabilir. [[K6 s. 383–384]] Tiz seste aynı süreye daha çok çevrim sığar. [[K6 s. 384]] Ultrasonda da tek başına en yüksek frekansı seçmek yerine, incelenecek yapının boyutu ve derinliği birlikte düşünülür. [[K6 s. 384–385]]</p>
<p>Tıbbi görüntüleme dönüştürücüleri 2–19 MHz aralığındadır. [[K6 s. 384]] Örneğin 8 MHz'lik prob 2 MHz'lik prob kadar derine ulaşamaz. [[K6 s. 384]] Küçük ve yüzeysel damarlar için tipik seçim 10 MHz iken derin karındaki büyük yapılar için 2–5 MHz kullanılır. [[K6 s. 384–385]]</p>
<h3>Işından enerji nasıl uzaklaşır?</h3>
<dl class="fk23-terimler">
<dt>Soğurulma</dt><dd>Ortamın aldığı ses enerjisi ısıya dönüşür ve doku sıcaklığı biraz yükselir. [[K6 s. 384]] Kitap, tanısal görüntülemedeki bu küçük ısınmayı zarar oluşturmayacak düzeyde tarif eder. [[K6 s. 377]] [[K6 s. 384]]</dd>
<dt>Saçılma</dt><dd>Akustik empedans her değiştiğinde enerjinin bir bölümü rastgele yönlere dağılır. [[K6 s. 384]] Enerji dokunun içinde kalır ama ışından uzaklaşır, yüksek frekanslarda saçılma daha fazladır. [[K6 s. 384]]</dd>
<dt>Yansıma</dt><dd>Dalganın bir kısmı iki doku arasındaki sınırda yön değiştirip geri döner. [[K6 s. 384]] İlerleyen ışını zayıflatan bu olay aynı zamanda görüntüyü oluşturan yankının kaynağıdır. [[K6 s. 384]]</dd>
<dt>Geometrik yayılma</dt><dd>Kaynaktan uzaklaşan cephe genişledikçe enerji daha geniş alana yayılır. [[K6 s. 384]] Etki cephenin geometrisine bağlıdır, düz bir cephede azdır. [[K6 s. 384]]</dd></dl>
<p><b>Hangi kazanç ayarı?</b> Genel kazanç tüm görüntünün parlaklığını artırır ve dokuların yoğunluğundaki küçük bireysel farklara göre kontrastı ayarlamayı sağlar. [[K6 s. 383–385]] Yalnız derindeki yapılar karanlıksa geç dönen yankıları yükseltmek daha seçicidir. [[K6 s. 385]] TGC bu derinliklere ayrı kazanç uygular, modern cihazlardaki kısmi otomatik telafiye rağmen elle ayar önemini korur. [[K6 s. 385]]</p>
<details><summary>Karanlık bir derin hedef için hangi ayar işe yarar?</summary>
<p>Önce frekans seçimindeki soruyu sorun: küçük, yüzeysel bir damarın sınırını mı, yoksa derindeki büyük bir yapıyı mı görmek istiyorsunuz? Yüksek frekans birincisinde ince ayrıntıyı seçmeye yardım eder, ikincisinde ışının dokuda daha çabuk zayıflamasına neden olur. [[K6 s. 384–385]]</p>
<p>Sonra geri alınan sinyale bakın. Bütün görüntü soluksa genel kazancı artırmak hem yüzeysel hem derin yankıları yükseltir ve görüntüdeki artefaktları da güçlendirebilir. [[K6 s. 383–385]] Yüzeysel yapılar yeterince parlaksa yalnız geç gelen sinyallere ek kazanç uygulamak, derin dokunun kontrastını seçici olarak ayarlamayı sağlar. [[K6 s. 385]]</p>
<p>Bir katı cismin ardında belirgin bir gölge varsa soru değişir. Yakın sınırda neredeyse tüm enerji yansımışsa, daha derindeki yapılardan yükseltilebilecek anlamlı bir yankı gelmez. [[K6 s. 386–387]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk23-sinir">
<h2>Bir sınırı görünür kılan empedans farkı</h2>
<p class="intro">Basınç değişimleri ortamda ilerlerken moleküller salınır. [[K6 s. 385]] Akustik empedans (<i>Z</i>) ortamın bu salınıma gösterdiği direnci ifade eder ve ses hızı aynı kaldığında dokunun yoğunluğuyla doğru orantılıdır. [[K6 s. 385]]</p>
${sekil('yansima','Kasın karşısındaki ortamı değiştirin','Çubuklar yansıyan ve sınırı geçen şiddetin gelen şiddet içindeki paylarını gösterir. [[K6 s. 386–387]]')}
<p>Mağarada hava ile kayanın empedansları çok farklı olduğundan enerjinin büyük bölümü kayadan geri döner. [[K6 s. 385]] İki dokunun empedansları birbirine yaklaştıkça yansıma küçülür, eşit olduklarında sınır yankı vermediği için görünmez. [[K6 s. 386]] Büyük empedans uyumsuzluğunda ise dalganın çok azı ikinci ortama geçer. [[K6 s. 385–387]]</p>
<div class="note"><b>Yansıyan şiddetin payı</b><p><i>R</i> = [(<i>Z</i><sub>2</sub> − <i>Z</i><sub>1</sub>)/(<i>Z</i><sub>2</sub> + <i>Z</i><sub>1</sub>)]<sup>2</sup>. [[K6 s. 386]] <i>Z</i><sub>1</sub> dalganın geldiği, <i>Z</i><sub>2</sub> sınırın ötesindeki ortamın empedansıdır, birimleri rayl (Pa·s·m<sup>−1</sup>), <i>R</i> ise birimsiz şiddet oranıdır. [[K6 s. 386–387]] Şekilde geçen pay 1 − <i>R</i> olarak hesaplanır. [[K6 s. 386]] Kitap şeklinde kas–hava sınırında yansıyan 0,999, geçen 0,001 olarak verilir; böbrek için <i>Z</i> = 1,62 MRayl alınır. [[K6 s. 386]]</p></div>
<div class="tbl-wrap"><table class="tbl fk23-tablo"><caption>Ortamların ses hızı ve akustik empedansı [[K6 s. 387]]</caption><thead><tr><th>Ortam</th><th>Hız (m/s)</th><th><i>Z</i> (MRayl)</th></tr></thead><tbody>
<tr><th>Hava</th><td>330</td><td>0,0004 [[K6 s. 387]]</td></tr>
<tr><th>Yağ</th><td>1 450</td><td>1,38 [[K6 s. 387]]</td></tr>
<tr><th>Su</th><td>1 480</td><td>1,48 [[K6 s. 387]]</td></tr>
<tr><th>Kan</th><td>1 570</td><td>1,65 [[K6 s. 387]]</td></tr>
<tr><th>Kas</th><td>1 580</td><td>1,70 [[K6 s. 387]]</td></tr>
<tr><th>Kemik</th><td>4 000</td><td>7,80 [[K6 s. 387]]</td></tr></tbody></table></div>
<div class="note plain"><b>Atlas notu.</b> Kitabın tablo başlığında sayılar için ×10<sup>−6</sup> rayl yazılıdır. [[K6 s. 387]] Doğrusu, bu sayılar MRayl cinsindendir ve rayle çevirmek için 10<sup>6</sup> ile çarpılır.</div>
<h3>Yansımanın üç klinik sonucu</h3>
<ul class="ozet"><li><b>Akustik gölge.</b> Bir sınırda neredeyse tam yansıma varsa daha derine ulaşan enerji çok azdır ve sınırın arkası seçilemez. [[K6 s. 387]] Kalp pili jeneratörü gibi katı bir cisim de düşük empedanslı bir hava kabarcığı da gölge oluşturabilir. [[K6 s. 387]] Kaburgalar transtorasik ekokardiyografinin pencerelerini sınırlar, akciğer havası komşu yapıların görüntüsünü örtebilir. [[K6 s. 387]]</li>
<li><b>Kontrast.</b> Küçük kabarcıklar güçlü yansımalarıyla ayrı beyaz noktalar gibi görünür. [[K6 s. 387–388]] Çalkalanmış salin içindeki mikrokabarcıkların intravenöz verilmesi ekokardiyografide kontrast sağlayabilir. [[K6 s. 388]] Kitap, mikrokabarcıkların kalpteki septal defektleri ve karaciğer lezyonlarını belirlemeye yardımcı olabildiğini belirtir. [[K6 s. 388]]</li>
<li><b>Jel.</b> Prob ile cilt arasına hava girerse sesin hemen tümü hastaya ulaşmadan geri döner. [[K6 s. 388]] Su bazlı jelin empedansı derininkine yakındır ve hava aralığını doldurması sesin dokuya iletimini belirgin artırır. [[K6 s. 388]]</li></ul>
<details><summary>Hesap kartı · Kan, kas ve kemik sınırlarını karşılaştırın</summary>
<p>Kas ile kan için empedans farkının büyüklüğü 1,70 − 1,65 = 0,05 ve toplam 3,35 MRayl'dir. [[K6 s. 387]] Yansıyan şiddetin oranı (0,05/3,35)<sup>2</sup> ≈ 0,000223 olup gelen şiddetin yaklaşık %0,022'sine karşılık gelir. [[K6 s. 386–387]] Kalan şiddetin hemen tümü ikinci ortama geçtiğinden sınırın yankısı zayıftır. [[K6 s. 386–387]]</p>
<p>Kas ile kemik için fark 7,80 − 1,70 = 6,10 ve toplam 9,50 MRayl olur. [[K6 s. 387]] Bu kez (6,10/9,50)<sup>2</sup> ≈ 0,412 bulunur, yani gelen şiddetin yaklaşık %41,2'si sınırdan geri döner. [[K6 s. 386–387]] İki hesapta da kareye alınan büyüklük, farkın toplama oranıdır. [[K6 s. 386]]</p>
<p>Son olarak iki tarafı da kas seçin. Pay sıfıra düştüğünden bu sınır kendisine ait bir yankı üretmez. [[K6 s. 386]] Hava seçildiğinde ise uyumsuzluk büyür ve enerjinin hemen tümü geri döner. [[K6 s. 387]] Probla cilt arasında hava kalmasının önemini bu uç durum üzerinden açıklayabilirsiniz. [[K6 s. 388]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk23-cozunurluk">
<h2>Yan yana mı, art arda mı, zaman içinde mi?</h2>
<p class="intro">Çözünürlük görüntüde gösterilebilen en küçük yapıyla tanımlanır. [[K6 s. 388]] İki komşu yapıyı ayırırken belirleyici olan, bu yapıların ışına göre hangi doğrultuda yer aldığıdır. [[K6 s. 388]]</p>
${sekil('cozunurluk','Işın hangi yöndeki ayrıntıyı seçiyor?','Hedef çiftleri ve yakın–uzak alan sınırı şematiktir. [[K6 s. 388–389]]')}
<dl class="fk23-terimler"><dt>Aksiyal (derinlik)</dt><dd>Işın ekseni üzerinde biri diğerinin arkasında bulunan iki yapıyı ayırma yetisidir. [[K6 s. 388]] Bir atım yalnız iki ya da üç çevrim içerir ve uzaydaki uzunluğu aksiyal çözünürlüğü belirler. [[K6 s. 388]] Frekans yükseldikçe daha iyi aksiyal ayrıntı elde edilir. [[K6 s. 388]]</dd>
<dt>Lateral (yanal)</dt><dd>Işına dik, prob yüzüne paralel yönde komşu yapıların ayrı seçilebilmesidir. [[K6 s. 388]] Başlıca belirleyici ışının genişliğidir, ışını hedef derinlikte odaklamak bu genişliği azaltarak ayrımı iyileştirir. [[K6 s. 388]]</dd>
<dt>Temporal (zamansal)</dt><dd>Saniyede alınan görüntü sayısıyla, yani kare hızıyla ilişkilidir. [[K6 s. 388]] Zaman çözünürlüğü düşük olduğunda hareket ekranda kesik kesik görünebilir. [[K6 s. 388]]</dd></dl>
<p><b>Yakın alan (Fresnel).</b> Probun önündeki bu bölgede görüntü çözünürlüğü en yüksektir. [[K6 s. 389]] Alanların boyutu probun genişliğine ve dalganın frekansına, dolayısıyla dalga boyuna bağlıdır. [[K6 s. 389]] Prob çapı büyüdüğünde veya frekans yükseldiğinde yakın alan daha derine uzanır. [[K6 s. 389]]</p>
<p><b>Uzak alan (Fraunhofer).</b> Yakın alanın ötesinde ışın giderek açılır. [[K6 s. 389]] Açılma bir odaklama merceğiyle düzeltilebilir ve bazı modern sistemlerde kullanıcı odak noktasını elektronik olarak seçebilir. [[K6 s. 389]]</p>
<details><summary>İki noktayı ayırmak için önce yönü belirleyin</summary>
<p>Şemada aksiyal çifti seçin. Ses önce yakındaki, sonra uzaktaki sınıra ulaşır ve iki yankı arasında dönüş süresi farkı oluşur. [[K6 s. 378]] [[K6 s. 388]] Bu farkı seçebilmek için atımın dokuda kapladığı uzunluk önemlidir. [[K6 s. 388]]</p>
<p>Lateral çifte geçin. Hedefler aynı derinliktedir, bu kez dar bir ışınla yan yana duran bölgeleri ayrı ayrı örnekleyebilmek gerekir. [[K6 s. 388]] Odağı hedef derinliğine taşımak bu nedenle lateral ayrımı iyileştirebilir. [[K6 s. 388–389]] Hareket ise ayrı bir sorudur: tek bir karede iki sınır seçilse bile seyrek alınan karelerde hareket kesintili görünebilir. [[K6 s. 388]]</p>
<p>Yakın alanı derinleştirmek ile ışının erişim derinliğini artırmak da farklı sonuçlardır. [[K6 s. 384]] [[K6 s. 389]] Frekans artışı Fresnel bölgesini uzatırken dokuda birim yol başına zayıflamayı artırır. [[K6 s. 384]] [[K6 s. 389]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk23-kalp">
<h2>Kalbe hangi pencereden bakılıyor?</h2>
<p class="intro">Ekokardiyografi kalbin yapılarını, işlevini ve akımı değerlendirmeye elverişlidir. [[K6 s. 389–390]] Doppler sinyalinden elde edilen sayısal kan hızı ölçümleri ventrikül ve kapak işlevini değerlendirmede kullanılır. [[K6 s. 389–390]]</p>
${sekil('kalp','Probun yeri görülen yapıları nasıl değiştirir?','Göğüs duvarı ve özofagus yaklaşımlarının hedefleri şematik olarak karşılaştırılır. [[K6 s. 390]]')}
<ul class="ozet"><li><b>Transtorasik ekokardiyografi (TTE).</b> Prob dışarıdan göğüs kafesine yerleştirilir ve kaburgalar görüşü kısıtlar. [[K6 s. 390]] Aort ve pulmoner kapak gibi öndeki yapıların görüntülenmesine elverişlidir. [[K6 s. 390]] Arkadaki mitral kapak ve sol atriyum bu yoldan daha güç değerlendirilir. [[K6 s. 390]]</li>
<li><b>Transözofageal ekokardiyografi (TOE).</b> Prob çoğunlukla lokal anestezi ve sedasyonla ağızdan özofagusa ilerletilir. [[K6 s. 390]] Özofagusun özellikle sol atriyuma yakınlığı, mitral kapak, sol atriyum ve apendiksi ile inen aortanın ayrıntılı görülmesini sağlar. [[K6 s. 390]]</li>
<li><b>TOE öncesi sorgulama.</b> Özofagus varisleri, hiatus hernisi ve geçirilmiş özofagus cerrahisi kitapta kontrendikasyonlar arasında sayılır. [[K6 s. 390]] Bu invaziv yaklaşımda prob geçtiği yapılara zarar verebilir, diş hasarı ve özofagus perforasyonu gelişebilir. [[K6 s. 390]]</li></ul>
<details><summary>Mitral kapak için pencereyi gerekçelendirin</summary>
<p>Önce TTE penceresini seçin. Göğüs kafesinden yaklaşırken kaburga üzerinde kalan ışının büyük bir bölümü geri döner ve o hattın arkasındaki kalp dokusu seçilemez. [[K6 s. 387]] Ön yapılara elverişli bir pencereden bakılsa bile arkadaki sol atriyum ve mitral kapak daha güç görüntülenebilir. [[K6 s. 390]]</p>
<p>TOE'ye geçildiğinde probun izlediği yolu ve hangi yapının komşuluğuna geldiğini söyleyin. Özofagustaki başlık, sol atriyuma yakınlığı sayesinde atriyum apendiksi ve mitral kapağa ayrıntılı bakış sağlar. [[K6 s. 390]] Bu pencerenin bedeli invaziv girişimdir: daha iyi görüş beklenmesi, özofagustan prob geçişine ilişkin kontrendikasyonları veya yaralanma olasılığını ortadan kaldırmaz. [[K6 s. 390]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk23-tedavi">
<h2>Ses enerjisi, ısınma ve kavitasyon</h2>
<p class="intro">Tanısal taramada enerji düşük tutulurken yüksek enerjili ses dalgaları doku üzerinde belirgin mekanik ve termal etkiler oluşturabilir. [[K6 s. 390–392]] Dalga ortamda enerji taşır, kütle taşımaz. [[K6 s. 391]]</p>
${sekil('kavitasyon','Basınç değişince kabarcığa ne olur?','Sıvıdaki kabarcığın büyümesi ve sınır yakınında çökmesi ardışık evreler hâlinde gösterilir. [[K6 s. 390–391]]')}
<p>Yüksek sesin pencereyi ya da bardaktaki içeceği titreştirmesi, hatta tiz bir sesin camı kırabilmesi, ses enerjisinin cisme aktarılmasına örnektir. [[K6 s. 390]] Bir ses çevriminde yüksek basınç tepesi ile düşük basınç çukuru birbirini izler. [[K6 s. 390]] Tepe ve çukur büyütülürse ortamdaki basınç dalgalanması artar, dalga biçimi değiştirilip tepeden çukura geçiş keskinleştirilirse basınç daha hızlı değişir. [[K6 s. 390]]</p>
<p><b>Akustik kavitasyon</b> yüksek enerjili ultrasonda çok düşük basıncın sıvıda kabarcık oluşturması ve basınç yeniden değişince bu kabarcığın çökmesidir. [[K6 s. 390–391]] Yerel basınç sıvının buhar basıncının altına indiğinde kabarcık oluşup büyür ve ardından şiddetle çökebilir. [[K6 s. 390–391]]</p>
<dl class="fk23-terimler"><dt>Akustik güç</dt><dd>Birim zamanda taşınan ses enerjisidir: <i>P</i> = <i>E</i>/Δ<i>t</i> (joule/saniye, watt). [[K6 s. 390]]</dd>
<dt>Şiddet</dt><dd>Birim alana düşen güçtür: <i>I</i> = <i>P</i>/<i>A</i>, burada <i>A</i> alanı (m²), <i>I</i> güç yoğunluğunu (W/m²) gösterir. [[K6 s. 391]]</dd>
<dt>Termal ve mekanik indeks</dt><dd>Termal indeks dokunun sıcaklığını yükseltme, mekanik indeks ise kavitasyon oluşturma potansiyelini belirtir. [[K6 s. 391]]</dd></dl>
<div class="note"><b>Hesap kartı · Aynı enerji hangi durumda daha yoğun uygulanır?</b>
<p>İki ses atımı aynı sürede aynı enerjiyi taşıyorsa akustik güçleri eşittir. [[K6 s. 390]] Gücü sabit tutup sesin toplandığı alanı yarıya indirdiğinizde birim alana düşen güç iki katına çıkar: <i>P</i>/(<i>A</i>/2) = 2<i>P</i>/<i>A</i>. [[K6 s. 391]] Bu karşılaştırmada değişen, toplam enerji değil onun alan içindeki dağılımıdır. [[K6 s. 390–391]]</p>
<p>Bu kez alanı sabit tutun ve aynı enerjiyi iki kat uzun sürede verin. Birim zamanda taşınan enerji, dolayısıyla ortalama güç ve ortalama şiddet yarıya iner. [[K6 s. 390–391]] Enerji aktarımını tarif ederken süre ile alanın hangisini değiştirdiğinizi söylemek bu iki karşılaştırmayı birbirinden ayırır. [[K6 s. 390–391]]</p></div>
<h3>Enerjinin kullanıldığı yerler</h3>
<ul class="ozet"><li><b>Odaklanmış ultrason.</b> Işın toplu iğne başı büyüklüğünde bir alana odaklanabilir. [[K6 s. 391]] Kitap, düşük ve yüksek şiddetli odaklanmış ultrasonun prostat kanseri gibi durumlarda tümör ablasyonu ve yıkımı için kullanılabildiğini bildirir. [[K6 s. 391]]</li>
<li><b>Şok dalgasıyla litotripsi.</b> Kabarcık bir böbrek taşının hemen yanında çökerse oluşan yüksek hızlı şok dalgası taşın yüzeyine kuvvet uygular. [[K6 s. 391]] Bu etki taşı doğal yolla atılabilecek parçalara ayırmaya yetebilir. [[K6 s. 391]]</li>
<li><b>Fakoemülsifikasyon.</b> Katarakt cerrahisinde korneadaki küçük bir kesiden ince bir prob sokulur. [[K6 s. 391]] Probun yaydığı ultrason kataraktı emülsifiye eder ve parçalar aspirasyonla çıkarılır. [[K6 s. 391]]</li>
<li><b>Liposuction.</b> Yağ dokusuna yerleştirilen ultrason çubuğu yağ hücrelerini hızla titreştirir. [[K6 s. 391]] Hücre duvarları parçalanınca sıvılaşan yağ, enjekte edilmiş çözücüyle birlikte emilerek uzaklaştırılır. [[K6 s. 391]]</li>
<li><b>Ultrasonik nebülizatör.</b> Su, 1–3 MHz'de ultrason yayan dönüştürücünün üzerine damlatılır ve 1–2 µm çapında damlacıklar oluşur. [[K6 s. 391]]</li></ul>
<details><summary>Kabarcık görüntüde beyaz nokta mı, taşta mekanik etki mi?</summary>
<p>Kontrast incelemesinde sorulan, dolaşıma verilen kabarcığın sesi ne kadar güçlü yansıttığıdır. [[K6 s. 387–388]] Ekokardiyografide belirginleşen beyaz noktalar bu yansımadan kaynaklanır. [[K6 s. 387–388]] Litotripside ise belirleyici olay bir kabarcığın görüntüde saptanması değil, taşın yakınında çökmesidir. [[K6 s. 391]]</p>
<p>Şemada ilk evreden son evreye ilerleyin. Önce yerel sıvı basıncının hangi eşiğin altına indiğini, ardından yeniden basınç değiştiğinde enerjinin taş yüzeyine nasıl ulaştığını tarif edin. [[K6 s. 390–391]] Taşı parçalayabilen etki, çökmenin oluşturduğu yüksek hızlı şok dalgasıyla ilişkilidir. [[K6 s. 391]]</p></details>
</section>

<section class="wrap blk ders-sec" id="fk23-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
<div class="viz"><div data-viz="mtf" data-q="fk23-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk23-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk23-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk23-p2"><h2>Part II · SOE 2 · Klinik ölçüm ve ekipman</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Bir damarı görüntüleyip içindeki kan hızını belirleyeceksiniz. Probu nasıl seçersiniz? Cihazın derinlik ve hız ölçümlerini nasıl elde ettiğini anlatın.</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Yüzeysel damarda tipik 10 MHz iyi ayrıntı verir, daha derin bir hedef için daha düşük frekans seçilir. [[K6 s. 384–385]]</li>
<li>Jel hava aralığını gidererek cilde ses iletimini artırır. [[K6 s. 388]] Kristal kısa atım gönderir ve yankıları dinler. [[K6 s. 379]]</li>
<li>Gidiş-dönüş süresi ortalama doku hızıyla çarpılıp ikiye bölünerek derinlik hesaplanır. [[K6 s. 378–379]] B-modunda açının ve derinliğin belirlediği piksel dönen yankının şiddetine göre aydınlanır. [[K6 s. 381–382]]</li>
<li>İki boyutlu görüntüde damar içinden örneklem hacmi seçilir, atımlı Doppler bu hacimdeki kanın hızını zaman içinde gösterir. [[K6 s. 383]] Akım ışına dikse frekans kayması kaybolur. [[K6 s. 392]]</li></ol>
<div class="note"><b>Çizin.</b> Bir prob, bir doku sınırı ve aralarında gidiş ile dönüş okları çizin. [[K6 s. 378]] Aynı çizimde atımın gönderilmesiyle yankının dönüşünü zaman eksenine yerleştirin ve derinlik hesabında sürenin neden ikiye bölündüğünü açıklayın. [[K6 s. 378–379]]</div>
<details><summary>Ek sorular</summary><ul><li>Derindeki yankıları artırırken yüzeydekileri nasıl korursunuz? [[K6 s. 385]]</li><li>Kaburganın arkasındaki yapıyı görmek neden güçtür? [[K6 s. 387]]</li><li>Atan bir kapak sınırının hareketini hangi kipte izlersiniz? [[K6 s. 382]]</li><li>Ultrasonun doku üzerindeki termal ve mekanik etkilerini hangi indekslerle ayırırsınız? [[K6 s. 391]]</li></ul></details></section>
<section class="wrap blk ders-sec" id="fk23-ozet"><h2>Özet</h2><ul class="ozet">
<li>Yankının gecikmesi derinliği, şiddeti B-modu pikselinin parlaklığını verir. [[K6 s. 378]] [[K6 s. 381–382]]</li>
<li>Yüksek frekans ayrıntıyı artırırken erişim derinliğini azaltır, güçlü empedans uyumsuzluğu ise daha derin yapıları gölgeleyebilir. [[K6 s. 384–387]]</li>
<li>Atımlı Doppler seçilmiş bir hacimde hızı ölçer, ışına dik akım frekans kayması üretmez. [[K6 s. 383]] [[K6 s. 392]]</li>
<li>Odaklanan ses enerjisi dokuyu etkileyebilir ve taş yakınında kabarcık çökmesi parçalanmaya katkıda bulunabilir. [[K6 s. 390–391]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="23"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/22">← Sinyal işleme, saklama ve gösterim</a><a href="#/dersler/fizik/24">Sonraki: Lazerler →</a></nav></section>`
  };
})();
