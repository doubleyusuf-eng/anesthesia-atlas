VERI.sorular = VERI.sorular || {};
VERI.sorular['fk14b-1'] = {
  no: 1, kok: 'Anestezi ventilatöründe gaz iletimi ve çevrim', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 252–254]]',
  onermeler: [
    { t: 'Manley MP3 sürücü enerjisini taze gazdan bağımsız bir kaynaktan alır.', d: false, n: 'Manley MP3’ü taze gaz akımı çalıştırır. [[K6 s. 253]]' },
    { t: 'Zaman çevriminde faz değişiminin zamanı akciğer kompliyansından bağımsızdır.', d: true, n: 'Faz ayarlanan süre dolunca değişir, dakika hacmi küçük kalabilir. [[K6 s. 253]]' },
    { t: 'Basınç çevriminde aynı basınca ulaşılınca verilen hacim kompliyans değişse de sabit kalır.', d: false, n: 'Hedef basınca kadar verilen hacim ve geçen süre kompliyansa bağlıdır. [[K6 s. 253]]' },
    { t: 'Şişe içindeki körük sıkışırken hastaya körüğün dışındaki sürücü gaz gider.', d: false, n: 'Hastaya körüğün içindeki anestezi gazı gider. [[K6 s. 254]]' },
    { t: 'Penlon Nuffield 200’de inspiratuvar akım tidal hacim hedefine göre ayarlanabilir.', d: true, n: 'İnspirasyon ve ekspirasyon sürelerini seçen anestezist, istenen hacim için inspiratuvar akımı ayarlar. [[K6 s. 254]]' },
  ],
};
VERI.sorular['fk14b-2'] = {
  no: 2, kok: 'Tetikleme, hedef ve destek', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 255–257]]',
  onermeler: [
    { t: 'SIMV’de hasta ayarlanan zorunlu frekansın üzerinde soluyabilir.', d: true, n: 'Zorunlu frekans alt sınırdır, hasta ek soluk tetikleyebilir. [[K6 s. 256]]' },
    { t: 'Saf basınç desteğinde cihaz hasta çabasından bağımsız zorunlu soluk verir.', d: false, n: 'Saf basınç desteğinde inspirasyonu hasta tetikler ve zorunlu soluk verilmez. [[K6 s. 256]]' },
    { t: 'Hacim desteğinde kompliyans değiştikçe cihaz inspiratuvar basıncı değiştirebilir.', d: true, n: 'Cihaz hedef tidal hacmi koruyacak basınç desteğini ayarlar. [[K6 s. 256]]' },
    { t: 'Bilevel modunda hasta zorunlu soluğun içinde de destekli soluk alabilir.', d: true, n: 'Özel valf döngünün herhangi bir anında ek destekli soluğa izin verir. [[K6 s. 257]]' },
    { t: 'Klasik IMV’de talep valfinden alınan spontan soluk PEEP’i korur.', d: false, n: 'Talep valfi hastayı devreden ayırdığı için o solukta uygulanan PEEP kaybolur. [[K6 s. 255]]' },
  ],
};
VERI.sorular['fk14b-3'] = {
  no: 3, kok: 'Osilasyon, maske ve negatif basınç', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 257–259]]',
  onermeler: [
    { t: 'HFOV’de tidal hacim genellikle ölü boşluk hacmini aşar.', d: false, n: 'Osilasyonla verilen tidal hacim genellikle ölü boşluktan küçüktür. [[K6 s. 257]]' },
    { t: 'Osilasyon sırasında gaz değişimine kardiyojenik karışımın katkısı olabilir.', d: true, n: 'Kardiyojenik karışım önerilen açıklamalardan biridir, mekanizma tam bilinmez. [[K6 s. 257–258]]' },
    { t: 'Uyku apnesinde gece CPAP’ı için hava kompresörü kullanılabilir.', d: true, n: 'Obstrüksiyonu gidermek için pozitif basınç gerekir, ek oksijen çoğu kez gerekmez. [[K6 s. 258]]' },
    { t: 'Duvar CPAP sisteminin oksijen gereksinimi 100 L/dk’ya ulaşabilir.', d: true, n: 'Bu tüketim, çok sayıda hasta eşzamanlı destek aldığında hastanenin oksijen altyapısını zorlayabilir. [[K6 s. 259]]' },
    { t: 'Göğüs zırhı ön göğüs duvarıyla hava geçirmez bir sınır oluşturur.', d: true, n: 'Zırh bu sınır içinde göğse negatif basınç uygular. [[K6 s. 259]]' },
  ],
};

const FK14B_NAV = [
  ['uretec', 'Gaz iletimi'], ['koruk', 'Anestezi cihazı'], ['akim', 'Akım ve PEEP'],
  ['soluk', 'Zorunlu ve spontan'], ['hedef', 'İleri modlar'], ['osilasyon', 'HFOV'], ['niv', 'Maske ve kanül'],
  ['zirh', 'Negatif basınç'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];
SAYFALAR['dersler/fizik/14b'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 14 · Ders 14b', baslik: 'Ventilatörler ve ventilasyon modları',
  lede: 'Bir ventilatör soluğunu üç soruyla okuyun. Gazı akciğere hangi basınç farkı taşır? Soluğu kim başlatır? İnspirasyon hangi koşulda sona erer? [[K6 s. 252–256]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${FK14B_NAV.map(([id, ad], i) => `<button type="button" data-scroll="fk14b-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk14b-uretec">
<h2>Ventilatör gazı nasıl hareket ettirir?</h2>
<p class="intro">Mekanik ventilasyon, oksijenin akciğere taşınması ve karbondioksitin uzaklaştırılması için gazı yapay olarak akciğere sokup çıkarır. [[K6 s. 252]] Elle yapılabilir, ancak uzun süreli destek için genellikle makine kullanılır. [[K6 s. 252]]</p>
<div class="viz"><div class="viz-head"><h3>Kaçak mı var, kompliyans mı değişti?</h3></div><div data-viz="fk14b_uretec"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Pozitif basınçlı inspirasyonda akımın hastaya yönelmesi için uygulanan basınç akciğer içi basıncı aşmalıdır. [[K6 s. 252–253]] Ekspirasyon pasiftir: akciğerin elastik geri çekilmesiyle gaz dışarı çıkar ve basınç, ek bir pozitif basınç uygulanmıyorsa atmosfer basıncına döner. [[K6 s. 253–255]]</p>
<div class="fk14b-kartlar">
<div class="card"><h3>Basınç üreteci</h3><p>Önceden belirlenen sabit basınç akciğer içi basınçtan yüksek tutulur ve ileri akım doğar. [[K6 s. 252–253]] Kompliyans değiştiğinde verilen hacim değişebilir, ancak devredeki kaçak telafi edilebilir. [[K6 s. 253]]</p></div>
<div class="card"><h3>Akım üreteci</h3><p>Önceden belirlenen sabit akımı üretir ve oluşan basınç akciğer içi basıncı aşınca gaz akciğere girer. [[K6 s. 253]] Kompliyans değişimini karşılayabilir, devredeki kaçağı karşılayamaz. [[K6 s. 253]]</p></div></div>
<h3>İnspirasyon ne zaman biter?</h3>
<p>Jeneratör gazın nasıl verildiğini, çevrim ise cihazın hangi koşulda bir solunum fazından diğerine geçtiğini tanımlar. [[K6 s. 252–253]]</p>
<ul class="ozet">
<li><b>Hacim çevrimi.</b> Ayarlanan hacme ulaşılınca faz değişir. [[K6 s. 253]] Hedefe ulaşılması üretilen akıma ve akciğer kompliyansına bağlıdır. [[K6 s. 253]]</li>
<li><b>Zaman çevrimi.</b> Ayarlı süre dolunca faz değişir. [[K6 s. 253]] Kompliyans geçiş zamanını değiştirmez, ancak dakika hacmi düşük kalabilir. [[K6 s. 253]]</li>
<li><b>Basınç çevrimi.</b> Ayarlı basınca ulaşıldığında faz değişir. [[K6 s. 253]] Bu basınca ulaşana kadar geçen süre ve verilen hacim akciğer kompliyansına bağlıdır. [[K6 s. 253]]</li>
<li><b>Akım çevrimi.</b> Akım önceden seçilen değere ulaştığında faz değişir. [[K6 s. 253]]</li></ul>
<details class="fk14b-sinama"><summary>Aynı hastada zaman çevrimi ve basınç çevrimi nasıl ayırt edilir?</summary>
<p>Kompliyans değiştiğinde hangi büyüklüğün sabit kalacağını düşünün. [[K6 s. 253]] Zaman çevriminde ayarlı süre dolunca inspirasyon biter, bu sürede yeterli hacim verilememiş olabilir. [[K6 s. 253]] Basınç çevriminde ise cihaz aynı basınca ulaşmayı bekler, bu sırada hem geçen süre hem verilen hacim değişebilir. [[K6 s. 253]]</p></details>
<p>1950’lerdeki dünya çapında çocuk felci salgınına kadar en yaygın yöntem demir akciğerle negatif basınçlı ventilasyondu. [[K6 s. 252]] 1952 Kopenhag salgınında Danimarkalı anestezist ve yoğun bakım öncüsü Bjørn Aage Ibsen, hastaları entübe ederek uzun süreli hava yolu koruması ve ventilasyon sağlayan ilk hekimlerdendi. [[K6 s. 252]]</p>
<p>200 tıp öğrencisi vardiyalarla gece gündüz pozitif basınçlı ventilasyon uyguladı. [[K6 s. 252]] Mortalitedeki büyük azalma bu teknolojinin hızla gelişmesine öncülük etti ve mekanik ventilasyonun büyük çoğunluğu artık pozitif basınçla yapılıyor. [[K6 s. 252]]</p>
</section>
<section class="wrap blk ders-sec" id="fk14b-koruk">
<h2>Anestezi cihazında gaz kaynağından hastaya</h2>
<p class="intro">Şişe içinde körük tasarımında bir gaz diğerini hareket ettirir: şişeye verilen sürücü gaz, körükteki anestezi gazını hastaya doğru iter. [[K6 s. 254]]</p>
<div class="viz"><div class="viz-head"><h3>Körüğün içi ve dışı</h3></div><div data-viz="fk14b_koruk"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Anestezi ventilatörü, mekaniği görece normal akciğerleri kısa veya orta süre ventile etmek ve anestezi gazını ekonomik kullanan bir devreyle çalışmak için tasarlanır. [[K6 s. 252]] Yoğun bakım ventilatörü ise ileri derecede bozulmuş kompliyansla uzun süre çalışabilir ve geri bildirimle spontan solunumu destekler. [[K6 s. 252]]</p>
<div class="fk14b-kartlar"><div class="card"><h3>Manley MP3</h3><p>Taze gaz akımıyla çalışan, bütünüyle mekanik bir basınç üreteci ve dakika hacmi bölücüsüdür. [[K6 s. 253–254]] İstenen dakika hacmi cihaza taze gaz olarak verilir. [[K6 s. 253–254]] Körükler, valfler ve ağırlıklar gaz sunumunu inspirasyon ve ekspirasyon fazlarına böler, anestezist tidal hacmi ve inspirasyon süresini ayarlar. [[K6 s. 254]]</p></div>
<div class="card"><h3>Penlon Nuffield 200</h3><p>Çocuklarda da kullanılabilen küçük ve çok yönlü bir akım üretecidir. [[K6 s. 254]] Akımı taze gazdan bağımsız bir yüksek basınç kaynağı üretir. [[K6 s. 254]] Zaman çevrimlidir: önce inspirasyon ve ekspirasyon süreleri seçilir, ardından hedef tidal hacmi verecek inspiratuvar akım ayarlanır. [[K6 s. 254]]</p></div>
<div class="card"><h3>Şişe içinde körük</h3><p>Anestezi cihazlarındaki ventilatörlerin çoğu bu tip akım üreteçleridir. [[K6 s. 253–254]] İnspirasyonda dış haznenin basıncı hızla artar ve körük sıkışır. [[K6 s. 254]] Ekspirasyonda hazne atmosfer basıncına açılır, akciğerin geri çekilmesi ve taze gaz girişi körüğü yeniden şişirir. [[K6 s. 254]]</p><p>Cihaz ayarlı hacim veya basınç verebilir. [[K6 s. 254]] Tidal hacim, inspiratuvar basınç, solunum frekansı ve inspirasyon/ekspirasyon süre oranı (I:E) değiştirilebilir. [[K6 s. 254]]</p></div></div>
<div class="viz"><div class="viz-head"><h3>Fazı değiştirin ve körüğün yüksekliğini izleyin</h3></div><div data-viz="fk14b_faz"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Ok hasta devresindeki gazın yönünü gösterir; körük yüksekliği şematiktir. [[K6 s. 254]]</p></div>
<details class="fk14b-sinama"><summary>Gazla çalışan cihazları bağlantılarından nasıl ayırt edersiniz?</summary>
<p>Önce taze gaz çıkışını izleyin. [[K6 s. 253–254]] Manley’de bu akım hem cihazı çalıştırır hem de bölünecek dakika hacmini belirler. [[K6 s. 253–254]] Penlon’da inspiratuvar akım ayrı bir basınç kaynağından elde edildiği için taze gaz akımına bakmak, hastaya verilecek tidal hacmi belirlemeye yetmez. [[K6 s. 254]]</p>
<p>Şişe içinde körükte ise bağımsız hattın nerede sonlandığına bakın: yüksek basınçlı gaz körüğün çevresine gelir. [[K6 s. 254]] Dolayısıyla şişedeki basıncın atmosfer basıncına dönmesi, dış haznenin boşalmasını ve iç körüğün yeniden dolabilmesini açıklar. [[K6 s. 254]]</p></details>
<p>Yeni üretilen ventilatörlerin hemen hepsi mikroişlemci kontrollüdür. [[K6 s. 252]] Buna karşılık verimli ve güvenilir gazla çalışan dakika hacmi bölücüleri bazı anestezi odalarında hâlâ kullanılır ve gelişmekte olan ülkelerde yılda milyonlarca anestezide görev alır. [[K6 s. 252]]</p>
</section>
<section class="wrap blk ders-sec" id="fk14b-akim">
<h2>Yoğun bakımda akım biçimi ve taban basıncı</h2>
<p class="intro">Modern yoğun bakım ventilatörleri elektrikle çalışan, mikroişlemci kontrollü akım üreteçleridir. [[K6 s. 254]] Hızlı servo geri bildirimi, inspirasyon sırasında akımın biçimini değiştirmeye olanak verir. [[K6 s. 254]]</p>
<div class="viz"><div class="viz-head"><h3>Aynı inspirasyonun başında ve sonunda akım</h3></div><div data-viz="fk14b_akim"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Nitel akım–zaman çizimi; imleç inspirasyondaki göreli konumu gösterir. [[K6 s. 254]]</p></div>
<ul class="ozet"><li><b>Sabit akım.</b> İstenen hacme veya basınca ulaşıncaya kadar akım değişmez, çizim kare dalga biçimindedir. [[K6 s. 254]]</li>
<li><b>Yavaşlayan akım.</b> İnspirasyon boyunca akım giderek azalır. [[K6 s. 254]]</li>
<li><b>Sinüzoidal akım.</b> Spontan soluyan hastanın akım biçimine daha çok benzer. [[K6 s. 254]]</li></ul>
<p>Akım grafiği cihaz çıkışını gösterir; alveollere ulaşan gazın dağılımı ayrıca değerlendirilir. [[K6 s. 254]] Aynı akım örüntüsü her alveole aynı şekilde yansımaz: gazın dağılımı akciğerin toplam kompliyansına ve bölgelerin farklı zaman sabitlerine bağlıdır. [[K6 s. 254]]</p>
<h3>Ekspirasyon sonunda neden pozitif basınç bırakılır?</h3>
<p>Yoğun bakımda ventile edilen hastaların çoğunda ventilatör, ekspirasyon sonu pozitif basıncı (PEEP) taban basıncı olarak uygular. [[K6 s. 255]] Örneğin PEEP 5 cmH₂O ise hava yolu aracında veya akciğerde kaçak yokken devre ve akciğer basıncı 5 cmH₂O’nun altına düşmez. [[K6 s. 255]]</p>
<p>Yatan hastada bazal segmentler kollabe olur, fonksiyonel rezidüel kapasite ve kompliyans azalır. [[K6 s. 255]] PEEP, altta kalan alveolleri döngü boyunca açık tutarak bu etkiyi sınırlar. [[K6 s. 255]] İnspirasyonda ileri akım oluşturabilmek için ventilatörün basıncı bu tabanın üzerine çıkarması gerekir. [[K6 s. 255]]</p>
<details class="fk14b-sinama"><summary>PEEP 5 cmH₂O iken inspirasyon nasıl başlar?</summary>
<p>Önce devredeki taban basıncını, sonra ileri akım için gereken basınç farkını bulun. [[K6 s. 255]] Kaçaksız devrede ekspirasyon bittiğinde hem devrede hem akciğerde pozitif basınç kalır. [[K6 s. 255]] Bir sonraki inspirasyonda ventilatör basıncı bu düzeyi aşarsa gaz akciğere doğru hareket eder. [[K6 s. 255]] Akımın sabit, yavaşlayan veya sinüzoidal olması ise bu taban basıncından ayrı bir özelliktir. [[K6 s. 254–255]]</p></details>
<p>Sürekli pozitif hava yolu basıncı (CPAP) ile PEEP terimleri sıkça birbirinin yerine kullanılır. [[K6 s. 255]] Kitap ortak ilkeyi, akciğer içi basıncın tüm döngü boyunca atmosfer basıncının üzerinde tutulması olarak verir ve noninvaziv uygulamada CPAP adının yaygın olduğunu belirtir. [[K6 s. 255]]</p>
</section>
<section class="wrap blk ders-sec" id="fk14b-soluk">
<h2>Soluğu kim başlatır, desteği kim belirler?</h2>
<p class="intro">Kitap bu karşılaştırmada zorunlu soluğu hasta tetiklemesinden bağımsız verilen soluk, spontan soluğu ise hastanın tetiklemesine yanıt olarak tanımlar. [[K6 s. 255]] Basınç veya hacim hedefi, soluğu kimin başlattığından ayrı bir özelliktir. [[K6 s. 255–256]]</p>
<div class="viz"><div class="viz-head"><h3>SIMV’den saf basınç desteğine geçiş</h3></div><div data-viz="fk14b_soluk"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Basınç–zaman çiziminde taban kitaptaki PEEP örneğidir; solukların yüksekliği, süresi ve aralığı şematiktir. [[K6 s. 255–256]]</p></div>
<p>Mikroişlemciler, üretim ve güvenlik standartlarındaki gelişmelerle çoğu standart ventilatör birbirine yaklaşmıştır. [[K6 s. 255]] Buna karşılık modların ortak bir adlandırması yoktur. [[K6 s. 255]] Bir modu tanımlarken üç ayrım yapın: basınç mı hacim mi veriliyor, soluk zorunlu mu spontan mı, arayüz invaziv mi noninvaziv mi? [[K6 s. 255]]</p>
<div class="fk14b-kartlar"><div class="card"><h3>IMV’de çakışma</h3><p>Aralıklı zorunlu ventilasyon (IMV), spontan soluyabilen ancak ek destek olmadan yeterli gaz değişimi sağlayamayan hastalarda kullanılırdı. [[K6 s. 255]] Talep valfi hastayı ventilatör devresinden ayırır ve hasta negatif basınçla gerçek bir spontan soluk alırdı. [[K6 s. 255]]</p><p>Ventilatör bu soluğu algılamadığından hemen üzerine bir zorunlu soluk bindirebilirdi. [[K6 s. 255]] Talep valfinden inspirasyon sırasında uygulanan PEEP de kaybolurdu. [[K6 s. 255]]</p></div>
<div class="card"><h3>SIMV’de eşzamanlama</h3><p>Senkronize aralıklı zorunlu ventilasyonda (SIMV) ventilatör, tetikleme eşiğine ulaşan hasta çabasını algılar. [[K6 s. 256]] Hasta devreden ayrılmadan spontan solur ve inspirasyonda önceden ayarlanan basınç desteğini alır. [[K6 s. 256]] Cihazın vereceği zorunlu soluk sayısı alt sınırdır, hasta bunun üzerinde soluyabilir. [[K6 s. 256]]</p></div>
<div class="card"><h3>Saf basınç desteği</h3><p>Hasta spontan soluyacak kadar uyandığında zorunlu soluklar kaldırılabilir. [[K6 s. 256]] Tetiklenen her solukta sağlanan destek aynı ayardaki SIMV desteğine eşdeğerdir. [[K6 s. 256]] Yalnız SIMV sunan bir cihazda zorunlu frekansı sıfıra indirmek kuramsal olarak aynı sonucu verir. [[K6 s. 256]]</p></div></div>
<details class="fk14b-sinama"><summary>Spontan soluk dönünce zorunlu frekans neyi gösterir?</summary>
<p>IMV’de hastanın devre dışında aldığı soluk ventilatör tarafından algılanmaz. [[K6 s. 255]] SIMV’de hasta aynı devre içinde soluduğu için cihaz inspiratuvar çabayı algılayıp seçilen desteği verebilir. [[K6 s. 256]] Bu nedenle SIMV ekranındaki zorunlu frekansı hastanın toplam solunum frekansı olarak okumayın: hasta cihazın verdiği zorunlu solukların arasına kendi soluklarını ekleyebilir. [[K6 s. 256]]</p></details>
<h3>Basınç kontrolü, basınç desteği ve hacim desteği</h3>
<ul class="ozet"><li><b>Basınç kontrolü.</b> PEEP üzerindeki basıncın standart bir adı yoktur. [[K6 s. 256]] Çoğu cihazda zorunlu solukta PEEP üzerine eklenen basınçtır ve bu ayar zorunlu frekans içeren modlarda görülür. [[K6 s. 256]]</li>
<li><b>Basınç desteği.</b> Hastanın tetiklediği spontan inspirasyona verilen basınç yardımıdır ve yardımlı spontan solunum (ASB) adıyla da karşılaşılır. [[K6 s. 256]]</li>
<li><b>Hacim desteği.</b> Hedef tidal hacim seçilir, cihaz bu hacmi verecek inspiratuvar basıncı sağlar. [[K6 s. 256]] Kompliyans değiştikçe gereken desteği otomatik olarak değiştirir. [[K6 s. 256]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="fk14b-hedef">
<h2>İleri modlarda hacim hedefi ve basınç sınırı</h2>
<p class="intro">Yaygın ileri modlar arasında basınç düzenlemeli hacim kontrolü (PRVC) ve bilevel vardır. [[K6 s. 256–257]] Birçok ventilatörde hedef hacim seçilir, ancak bu hacme ulaşma çabası önceden belirlenen basınç sınırıyla kısıtlanır. [[K6 s. 257]]</p>
<div class="viz"><div class="viz-head"><h3>ARDSNet çalışmasında hangi hacimler karşılaştırıldı?</h3></div><div data-viz="fk14b_hedef"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Akut solunum sıkıntısı sendromunda (ARDS) 12 mL/kg yerine 6 mL/kg tidal hacimle mortalitenin düşmesi, daha düşük hacim hedefinin yoğun bakımda benimsenmesine yol açmıştır. [[K6 s. 257–258]] Hasar yalnızca verilen hacme (volütravma) değil, o hacme ulaşmak için gereken basınca da (barotravma) bağlı olabilir. [[K6 s. 257]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap 6 ve 12 mL/kg karşılaştırmasında ağırlığın türünü belirtmez ve HFOV’yi ARDS’de kullanılan bir seçenek olarak anlatır. [[K6 s. 257–258]] Çalışmadaki payda öngörülen vücut ağırlığıdır ve orta veya ağır erişkin ARDS’de rutin HFOV önerilmez. [[K6 s. 257–258]]</div>
<p>Basınç sınırına ulaşılınca hedef hacim elde edilemeyebilir. [[K6 s. 257]] Hekim veya cihaz PEEP’i, inspirasyonda basıncın yükselme süresini (rampa) ve tepe akımını değiştirerek o hastada hacim sunumunu iyileştirmeye çalışabilir. [[K6 s. 257]]</p>
<p>İnspirasyon ve ekspirasyon süreleri (T<sub>i</sub>, T<sub>e</sub>), bunların oranı I:E ve hasta tetikleme ayarları da oksijenasyon ile ventilasyonu ince ayarlamak için değiştirilebilir. [[K6 s. 256]] Uygun ayarlar hastanın solunum mekaniğine ve kısmen hekimin o ventilatör modeliyle deneyimine bağlıdır. [[K6 s. 256]]</p>
<details class="fk14b-sinama"><summary>Hacim desteği ile basınç sınırı aynı soruya mı yanıt verir?</summary>
<p>Hacim desteğinde soru, seçilen tidal hacme ulaşabilmek için inspiratuvar basıncın ne kadar değişmesi gerektiğidir. [[K6 s. 256]] Basınç sınırında ise soru, aynı hacmi verme çabasının hangi basınçta duracağıdır. [[K6 s. 257]] Hedef hacim ve sınır birlikte seçildiğinde, ilk değer ulaşılmak istenen hacmi, ikincisi cihazın bu amaçla uygulayabileceği basıncın üst sınırını tanımlar. [[K6 s. 257]]</p></details>
<h3>Hasta ventilatörle neden uyumsuzlaşır?</h3>
<p>Yüksek destek gereken hastada sunulan akım yetersiz kalırsa hasta ventilatöre karşı negatif basınç oluşturarak açığı kapatmaya çalışabilir. [[K6 s. 257]] Geleneksel çözümlerden derin sedasyon sıklıkla hipotansiyon pahasına uygulanır, paralizi ise kritik hastalık polinöropatisi ve miyopatisi riskini artırır. [[K6 s. 257]]</p>
<p><b>İki düzeyli ventilasyon (bilevel)</b> SIMV ilkesini genişletir: hekim asgari solunum frekansını belirler, hasta gerektiğinde ek soluk alabilir. [[K6 s. 257]] Özel bir valf, zorunlu soluğun herhangi bir anında dahi aynı düzeyde yardımla spontan soluk alınmasını sağlar. [[K6 s. 257]] Böylece hasta ventilatöre karşı daha az mücadele eder ve genellikle derin sedasyon gerekmez. [[K6 s. 257]]</p>
</section>
<section class="wrap blk ders-sec" id="fk14b-osilasyon">
<h2>Yüksek frekanslı osilatuvar ventilasyon (HFOV)</h2>
<p class="intro">HFOV’de amaç, her solukta alveolleri yeniden şişirmek yerine bir kez açılmış akciğerde küçük hacimlerle gaz değişimini sürdürmektir. [[K6 s. 257]]</p>
<div class="viz"><div class="viz-head"><h3>Osilasyon hangi basıncın üzerine eklenir?</h3></div><div data-viz="fk14b_osilasyon"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Basınç–zaman çizimi nitel bir gösterimdir; salınımların genliği ve aralığı klinik ölçüm değildir. [[K6 s. 257]]</p></div>
<p>Uzun süreli ventilasyon sonrası akciğerde skar ve fibrozise, alveollerin tekrar tekrar şişmesiyle salınan enflamatuvar aracılar katkıda bulunabilir. [[K6 s. 257]] Kitap bu hacim hasarını volütravma olarak tanımlar. [[K6 s. 257]]</p>
<ol class="iskelet"><li>HFOV’de alveoller önce görece yüksek basınçla açılır. [[K6 s. 257]] Ardından yüksek ortalama hava yolu basıncı üzerinde dakikada 900’e varan küçük soluklar verilir. [[K6 s. 257]]</li>
<li>Tidal hacim genellikle ölü boşluktan bile küçüktür, buna rağmen çoğu hastada karbondioksit atılımı yeterli olur. [[K6 s. 257]] Sürekli yüksek ortalama hava yolu basıncı oksijenasyonu iyileştirebilir. [[K6 s. 257]]</li>
<li>Gaz değişimi tam açıklanamamıştır; Pendelluft etkisi, doğrudan kütlesel akım ve kalp hareketine bağlı gaz karışımı birlikte rol oynayabilir. [[K6 s. 257–258]]</li></ol>
<details class="fk14b-sinama"><summary>Ölü boşluktan küçük bir solukla gaz değişimi nasıl açıklanabilir?</summary>
<p>Oksijenasyon ile karbondioksit atılımını ayrı açıklayın. [[K6 s. 257–258]] Yüksek ortalama hava yolu basıncının sürdürülmesi daha iyi oksijenasyonla ilişkilendirilir. [[K6 s. 257]] Tek bir tidal hacim ölü boşluğu havalandırmaya yetmese bile karbondioksit çoğunlukla uzaklaştırılabilir. [[K6 s. 257]] Bunun için öne sürülen gaz hareketi ve karışım mekanizmalarından hiçbiri kitapta tek başına kesin açıklama olarak verilmez. [[K6 s. 257–258]]</p></details>
<p>Kitap HFOV’nin özellikle çocuk yoğun bakımında ve ağır pnömoni ya da ARDS’ye bağlı hipoksemide kullanımını anlatır. [[K6 s. 257–258]] Kitabın kanıt değerlendirmesinde ARDS’de küçük tidal hacimlerin yararı dışında bir ventilasyon modunun diğerine üstünlüğü için ikna edici kanıt yoktur. [[K6 s. 258]] Seçimde hastanın patolojisi kadar hekimin tercihi ve cihazı tanıması da etkili olur. [[K6 s. 258]]</p>
</section>
<section class="wrap blk ders-sec" id="fk14b-niv">
<h2>Maske ve nazal kanülle solunum desteği</h2>
<p class="intro">Noninvaziv ventilasyonda (NIV) entübasyon yerine yüze sıkı oturan bir maske kullanılır. [[K6 s. 258]] Sunulabilen modlar ve temel ilkeler invaziv ventilasyondakilere çok benzer. [[K6 s. 258]]</p>
<div class="viz"><div class="viz-head"><h3>İnspirasyon ve ekspirasyonda maske basıncı</h3></div><div data-viz="fk14b_niv"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Basınç düzeyleri ve faz süreleri şematiktir. [[K6 s. 255]] [[K6 s. 258]]</p></div>
<div class="fk14b-kartlar"><div class="card"><h3>Obstrüktif uyku apnesi · CPAP</h3><p>Temel sorun üst hava yolunun tıkanmasıdır. [[K6 s. 258]] Gece uygulanan pozitif basınç, uykuda farengeal kas tonusu azalmasına rağmen orofarinksi açık tutar. [[K6 s. 258]] Ek oksijen çoğu kez gerekmediğinden basıncı hava kompresörü sağlayabilir ve rahatlık için genellikle burun maskesi kullanılır. [[K6 s. 258]]</p></div>
<div class="card"><h3>Hiperkapni · BPAP</h3><p>Hiperkapnide karbondioksiti azaltmak için iki düzeyli pozitif hava yolu basıncı kullanılabilir. [[K6 s. 258]] Sıklıkla “BiPAP” denir, genel adı BPAP’tır. [[K6 s. 258]] İnvaziv basınç desteğiyle ilke aynıdır: daha büyük tidal hacimle dakika ventilasyonunu artırmak ve karbondioksiti düşürmek amaçlanır. [[K6 s. 258]]</p><p>NIV cihazında ekspiratuvar pozitif hava yolu basıncı (EPAP) tabanı, inspiratuvar pozitif hava yolu basıncı (IPAP) üst düzeyi gösterir. [[K6 s. 258]]</p></div>
<div class="card"><h3>Yüksek akımlı nazal oksijen · HFNO</h3><p>Isıtılmış ve nemlendirilmiş oksijen yüksek akımla nazal kanülden verilir. [[K6 s. 258]] Sürücü gaza katılan oksijen akımı değiştirilerek inspire edilen oksijen fraksiyonu ayarlanır. [[K6 s. 258]] Yüksek akım anatomik ölü boşluğu azaltır ve üst hava yolunda düşük düzeyde pozitif basınç oluşturur. [[K6 s. 258–259]]</p></div></div>
<div class="note plain"><b>Atlas notu.</b> Kitap basınç desteğini IPAP ile eşleştirir ve HFNO’yu sıkı oturan kanülle düşük CPAP olarak tarif eder. [[K6 s. 258–259]] BPAP’ta basınç desteği IPAP − EPAP farkıdır; HFNO kanülü burun deliklerini tıkamamalıdır ve oluşan değişken basınç ayarlı CPAP’a eşdeğer değildir. [[K6 s. 258–259]]</div>
<details class="fk14b-sinama"><summary>Maske desteğinin amacını oksijen tüketiminden nasıl ayırırsınız?</summary>
<p>Önce desteğin hangi sorunu çözmek için kullanıldığını belirleyin. [[K6 s. 258]] Uyku apnesinde basıncı üretmek için hava kompresörü yeterli olabilir, çünkü amaç gece daralan hava yolunu açık tutmaktır. [[K6 s. 258]] Hiperkapnide iki basınç düzeyi seçmenin amacı ise inspirasyona yardım ederek tidal hacmi ve dakika ventilasyonunu artırmaktır. [[K6 s. 258]] Sistemi çalıştırmak için duvardan çekilen oksijeni, hastaya sunulan basınçtan ayrı değerlendirin. [[K6 s. 258–259]]</p></details>
<div class="note"><b>Hastanenin oksijen kaynağı.</b> Duvar CPAP sistemini çalıştırmak için 100 L/dk’ya kadar oksijen gerekebilir. [[K6 s. 259]] HFNO sistemleri ve bazı NIV ventilatörleri 50 L/dk’nın üzerinde oksijen tüketebilir. [[K6 s. 259]] Çok sayıda hasta eşzamanlı duvar CPAP’ı veya HFNO kullanırsa hastanenin oksijen dağıtım kapasitesi aşılabilir, hatta besleme kesilebilir. [[K6 s. 259]]</div>
</section>
<section class="wrap blk ders-sec" id="fk14b-zirh">
<h2>Negatif basınç göğse nereden uygulanır?</h2>
<p class="intro">Negatif basınçlı ventilasyon, göğüs duvarını dışarıdan hareket ettirerek tidal hacim oluşturur. [[K6 s. 259]] Yirminci yüzyıl ortasında pozitif basınçlı ventilasyon yaygınlaşıncaya kadar uzun süreli desteğin tek yolu demir akciğerdi. [[K6 s. 259]]</p>
<div class="viz"><div class="viz-head"><h3>Negatif basıncın uygulandığı alan</h3></div><div data-viz="fk14b_zirh"></div><p class="viz-cap" aria-live="polite"></p></div>
<ul class="ozet"><li><b>Demir akciğer.</b> Göğsü hareket ettirecek negatif basınç için baş dışında bütün vücut haznenin içine alınır. [[K6 s. 259]] Hastaya erişmek ve hastayı izlemek bu nedenle çok güçtür. [[K6 s. 259]]</li>
<li><b>Göğüs zırhı (cuirass).</b> Hayek MRTX gibi düzeneklerde ön göğüs duvarına hava geçirmez biçimde oturan bir plak kullanılır. [[K6 s. 259]] Ventilasyon için yapay bir hava yolu gerekmez, ancak hava yolunu korumak için ayrıca gerekebilir. [[K6 s. 259]]</li></ul>
<details class="fk14b-sinama"><summary>Göğüs zırhı erişim sorununu nasıl değiştirir?</summary>
<p>Demir akciğerde tidal hacim oluşturacak basınç farkını sağlamak için hastanın başı dışındaki vücudu hazneyle çevrilir. [[K6 s. 259]] Zırhta basınç uygulanan alan ön göğüs duvarıyla sınırlıdır ve sızdırmazlık bu alanın çevresinde sağlanır. [[K6 s. 259]] Hastanın hava yolunu koruyup koruyamadığı, zırhın göğüs hareketini sağlayabilmesinden ayrı bir sorudur. [[K6 s. 259]]</p></details>
<p>Normal kalbin doluş ve boşalması spontan negatif basınçlı solunuma uyumludur. [[K6 s. 259]] Pozitif basınca ani geçiş, özellikle PEEP uygulandığında venöz dönüşü ve sağ ventrikül doluşunu azaltabilir. [[K6 s. 259]] İnvaziv ventilasyon için verilen anesteziklerin kardiyovasküler depresyonu, kalp debisindeki azalmayı artırabilir. [[K6 s. 259]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap pozitif basıncın art yükü artırarak her iki ventrikülün ejeksiyonunu engellediğini söyler. [[K6 s. 259]] Sağ ventrikül art yükü artabilirken sol ventrikülün transmural art yükü azalabilir. [[K6 s. 259]]</div>
<p>Hemodinamik sakıncalarına karşın pozitif basınçlı ventilasyon uygulama kolaylığı nedeniyle yaygınlaşmıştır. [[K6 s. 259]]</p>
</section>
<section class="wrap blk ders-sec" id="fk14b-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
<p>Her önermeyi bağımsız değerlendirin ve gerekçenizi cevapla karşılaştırın.</p>
<div class="viz"><div data-viz="mtf" data-q="fk14b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk14b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk14b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="fk14b-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Yoğun bakım ventilatöründe SIMV ve 5 cmH₂O PEEP seçili. Hasta spontan solumaya başladı. Basınç–zaman ekranında zorunlu ve tetiklenen soluğu nasıl açıklarsınız? Saf basınç desteğine geçince ne değişir?</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Önce tabanı gösterin: kaçak yoksa devre ve akciğer basıncı ayarlanan 5 cmH₂O’nun altına düşmez. [[K6 s. 255]]</li>
<li>Zorunlu frekans hastanın alacağı en az soluk sayısını belirler. [[K6 s. 256]] Hasta tetikleme eşiğine ulaşırsa cihaz inspiratuvar destek sağlar. [[K6 s. 256]]</li>
<li>Çoğu cihazda zorunlu soluk için PEEP üzerine verilen basınç “basınç kontrolü”, spontan soluğa verilen yardım “basınç desteği” olarak adlandırılır. [[K6 s. 256]]</li>
<li>İnspiratuvar akım için ventilatör basıncı taban basıncını aşar. [[K6 s. 255]]</li>
<li>Saf basınç desteğinde zorunlu soluklar kalkar, tetiklenen soluğa verilen yardım aynı ayarda kalabilir. [[K6 s. 256]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Basınç–zaman eksenlerinde 5 cmH₂O tabanını işaretleyin. [[K6 s. 255]] Üzerine bir zorunlu ve bir hasta tetiklemeli soluk çizin, ardından saf desteğe geçince hangi soluğun kalktığını gösterin. [[K6 s. 256]]</div>
<div class="note plain"><b>Ek sorular.</b> IMV’de soluklar neden üst üste binebilir? [[K6 s. 255]] Basınç sınırına ulaşan cihaz hedef hacmi verebilir mi? [[K6 s. 257]] Duvar CPAP’ı alan çok sayıda hasta oksijen kaynağını nasıl etkiler? [[K6 s. 259]]</div></div>
</section>
<section class="wrap blk ders-sec" id="fk14b-ozet"><h2>Özet</h2>
<ul class="ozet"><li>Pozitif basınçlı ventilatör akciğere doğru bir basınç farkı oluşturur; basınç ve akım üreteci ayrımı günümüzde daha çok tarihsel bir sınıflamadır. [[K6 s. 260]]</li>
<li>Yoğun bakım ventilatörü, bozulmuş akciğer mekaniğinde spontan soluyan hastaya da destek sağlayabilir. [[K6 s. 260]]</li>
<li>Mod adları değişse de hedef basınç veya hacim, soluğun tetiklenmesi ve arayüz üzerinden karşılaştırma yapılabilir. [[K6 s. 255–256]]</li>
<li>HFOV yeni bir pozitif basınçlı yöntemdir: sürekli yüksek ortalama basınç üzerinde küçük hacimler salınır; gaz değişiminin mekanizması tam bilinmez. [[K6 s. 257–258]]</li>
<li>Noninvaziv desteğin değerlendirilmesi, hasta arayüzünün yanı sıra sistemin oksijen tüketimini de içerir. [[K6 s. 258–259]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="14b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/14a">← Solunum devreleri: halka sistem ve Mapleson sınıflaması</a><a href="#/dersler/fizik/15a">Sonraki: Kırılma, optik lifler ve fiberoptik endoskoplar →</a></nav>
</section>`,
};
