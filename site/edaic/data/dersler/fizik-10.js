VERI.sorular = VERI.sorular || {};
VERI.sorular['fk10-1'] = {
  no: 1, kok: 'Alveol ile kan arasında difüzyon', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 180–185]]',
  onermeler: [
    { t: 'Zarın iki yanında derişimler eşitlenince moleküllerin zardan geçişi durur.', d: false, n: 'İki yönlü hareket sürer, yalnız net geçiş sıfırlanır. [[K6 s. 180]]' },
    { t: 'Diğer koşullar aynıyken alveol duvarının kalınlaşması gaz aktarımını yavaşlatır.', d: true, n: 'Aktarım hızı kalınlıkla ters orantılıdır. [[K6 s. 181–182]]' },
    { t: 'Helyumun düşük molekül ağırlığı, kanda hızla çözünmesini sağlar.', d: false, n: 'Helyumun sıvıdaki çözünürlüğü çok düşüktür. [[K6 s. 182]]' },
    { t: 'İstirahatte sağlıklı akciğerde CO₂ dengesi O₂ dengesinden önce kurulur.', d: true, n: 'CO₂ için yaklaşık 0,1 saniye, O₂ için 0,3–0,4 saniye gerekir. [[K6 s. 183]]' },
    { t: 'Difüzyon kapasitesini hesaplamak için hastanın alveol yüzey alanı doğrudan ölçülür.', d: false, n: 'Alan ve kalınlık ayrı ölçülemediği için ikisinin etkisi kapasiteye dahil edilir. [[K6 s. 185]]' },
  ],
};
VERI.sorular['fk10-2'] = {
  no: 2, kok: 'Tek solukla difüzyon kapasitesi ölçümü', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 185–186]]',
  onermeler: [
    { t: 'İnspirasyondan önce hasta maksimum ekspirasyon yapar.', d: true, n: 'Ardından test karışımından vital kapasitesi kadar solur. [[K6 s. 185–186]]' },
    { t: 'Helyumun seyreltmesinden alveol hacmi hesaplanabilir.', d: true, n: 'Helyumun soluk tutma sırasında kana anlamlı miktarda geçmediği varsayılır. [[K6 s. 186]]' },
    { t: 'Analiz için özellikle ekspirasyonun ilk 0,75 litresi toplanır.', d: false, n: 'İlk 0,75 L ölü boşluğu yıkar, örnek bundan sonra alınır. [[K6 s. 186]]' },
    { t: 'Ekspirasyon sonu CO kısmi basıncı kızılötesi gaz analizörüyle ölçülebilir.', d: true, n: 'Soluk tutma sonrasında alınan örnekte CO doğrudan bu yöntemle ölçülür. [[K6 s. 186]]' },
    { t: 'Sonuç hastanın hemoglobin derişimine göre düzeltilir.', d: true, n: 'Hesap ayrıca aynı ölçümde bulunan alveol hacmine göre normalize edilir. [[K6 s. 186]]' },
  ],
};
VERI.sorular['fk10-3'] = {
  no: 3, kok: 'Çözeltiler ve inhalasyon ajanları', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 186–193]]',
  onermeler: [
    { t: 'Ozmotik basınç, zardan net çözücü geçişini durdurmak için gereken basınçtır.', d: true, n: 'Ozmozda çözünen geride kalırken çözücü zarı geçer. [[K6 s. 186]]' },
    { t: 'Henry yasasında sıcaklık sabit tutulur.', d: true, n: 'Belirli bir sıvı hacminde çözünen gaz miktarı bu koşulda gazın kısmi basıncıyla doğru orantılıdır. [[K6 s. 188]]' },
    { t: 'Kan/gaz dağılım katsayısının birimi kPa’dır.', d: false, n: 'Katsayı, aynı birimle ölçülen iki derişimin oranıdır ve birimsizdir. [[K6 s. 190–191]]' },
    { t: 'Kan/gaz katsayısı daha yüksek olan ajanın beyinde etki göstermesi daha uzun sürer.', d: true, n: 'Kanda daha çok ajan çözünürken beyne geçişi belirleyen kısmi basınç farkı daha yavaş gelişir. [[K6 s. 192]]' },
    { t: 'Uçucu olmayan çözünen eklemek çözücünün kaynama noktasını düşürür.', d: false, n: 'Buhar basıncı düşerken kaynama noktası yükselir. [[K6 s. 192–193]]' },
  ],
};

SAYFALAR['dersler/fizik/10'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 10', baslik: 'Difüzyon, ozmoz ve çözünürlük',
  lede: 'Bir gazın zarı ne hızla geçtiği, sıvıda ne kadar çözündüğü ve dengede iki ortam arasında nasıl dağıldığı ayrı sorulardır. [[K6 s. 181–182]] [[K6 s. 188–191]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${[
  ['dif', 'Difüzyon'], ['fick', 'Fick ve Graham'], ['akciger', 'Gaz alışverişi'], ['kapasite', 'Tek soluk testi'],
  ['ozmoz', 'Ozmoz'], ['henry', 'Çözünürlük'], ['dagilim', 'Dağılım'], ['raoult', 'Raoult yasası'],
  ['olcum', 'Ozmometre'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
].map(([id, ad]) => '<button type="button" data-scroll="fk10-' + id + '">' + ad + '</button>').join('')}</nav>

<section class="wrap blk ders-sec" id="fk10-dif">
<h2>Difüzyonda net hareketin yönü</h2>
<p class="intro">Moleküller rastgele her yöne hareket eder, ancak bir maddenin derişimi iki bölgede farklıysa zaman içinde yoğun bölgeden seyreltik bölgeye net geçiş görülür. [[K6 s. 179–180]]</p>
<div class="viz"><div class="viz-head"><h3>U tüpünde denge</h3></div><div data-viz="fk10_tup"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Cam bölmeyle ayrılmış bir su tankının tek tarafına boya damlatıldığını düşünün. [[K6 s. 179]] Boya çözünendir, su çözücüdür ve birlikte çözeltiyi oluştururlar. [[K6 s. 179]] Su molekülleri birbirlerine sabitlenmiş değildir ve sürekli hareket eder, bu nedenle boya o tarafta eşit dağılana kadar yayılır. [[K6 s. 179]]</p>
<p>Bölmeyi suyu karıştırmadan kaldırırsanız boya öbür tarafa da yayılır ve sonunda iki tarafta aynı açık renk görülür. [[K6 s. 179]] Başlangıçta iki tarafı aynı derişimde boyarsanız moleküller yine yer değiştirir, fakat iki tarafın rengi de aynı kalır. [[K6 s. 180]]</p>
<div class="cols"><div class="card"><h3>Akım ve difüzyon</h3><p>Akımda iki nokta arasındaki basınç farkı akışkanı kütle halinde taşır. [[K6 s. 180]] Difüzyonda ise rastgele molekül hareketi yeterlidir ve eşit derişimde bile karşılıklı geçiş sürer. [[K6 s. 180]]</p></div>
<div class="card"><h3>Ortam ve sıcaklık</h3><p>Gazlarda yoğunluk genellikle sıvılardan düşüktür, moleküller arası boşluk daha büyüktür ve çarpışmalar daha seyrektir. [[K6 s. 179]] Moleküller aynı sürede daha uzağa gidebildiğinden koku geniş bir odaya hızla yayılır. [[K6 s. 179]] Sıcaklık artışı kinetik enerjiyi artırarak hem gazda hem sıvıda difüzyonu hızlandırır. [[K6 s. 179]]</p></div></div>
<p>Geçirgen bir zar, geçirebildiği gaz ya da sıvı için kesintisiz bir geçiş yolu sağlar. [[K6 s. 180]] Lateks gibi yarı geçirgen zarlar yalnız bazı molekülleri, çoğu kez küçük olanları geçirir. [[K6 s. 180]] Kitap kapiller duvarı, gazları geçirirken kan hücrelerini ve plazmayı tutan bir zar örneği olarak verir. [[K6 s. 180]]</p>
<p>Solunum gazlarının değişimi, inhale anesteziğin önce kana alınması ve sonra kan–beyin bariyerini geçmesi zar boyunca difüzyona dayanır. [[K6 s. 180]]</p>
<h3>U tüpünü nasıl okumalı?</h3>
<p>Önce incelenen maddeyi seçin: tuzun net hareketini soruyorsanız iki koldaki tuz derişimlerini karşılaştırın. [[K6 s. 179–180]] Sonra aradaki zarın tuzu geçirip geçirmediğine bakın. [[K6 s. 180]] Bir kolda derişim yüksek ve zar geçirgense, her iki yönde tanecik geçmesine rağmen o koldan ayrılan tuz miktarı gelen miktarı aşar. [[K6 s. 179–180]]</p>
<p>Karşı kola geçen tuz oradaki derişimi artırdıkça iki kol arasındaki fark küçülür. [[K6 s. 179–180]] Son durumda alınan iki örnekte aynı derişimin bulunması, tek tek taneciklerin yerinde durduğunu göstermez. [[K6 s. 180]] Dengeyi anlamak için tek bir taneciğin yolunu değil, aynı süre içinde zardan karşılıklı geçen miktarları karşılaştırmak gerekir. [[K6 s. 180]]</p>
</section>

<section class="wrap blk ders-sec" id="fk10-fick">
<h2>Bir zardan gaz aktarımı: Fick ve Graham yasaları</h2>
<p class="intro">Gazı geçirebilen bir dokuda yüzey alanı ve kısmi basınç farkı arttıkça aktarım hızlanır, geçilecek mesafe uzadıkça yavaşlar. [[K6 s. 180–181]]</p>
<div class="viz"><div class="viz-head"><h3>Aynı basınç farkında zarı kalınlaştırın</h3></div><div data-viz="fk10_fick"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Eksenler göreli ölçeklidir. [[K6 s. 181]] Referans hız, aynı gaz ve alan için 0,5 µm kalınlıkta ve referans basınç farkındaki hızdır. [[K6 s. 181–182]]</p></div>
<div class="card"><h3>Fick denklemi</h3><p class="fk10-denklem"><i>V̇</i> = <i>D</i> · <i>A</i> · (<i>P</i><sub>1</sub> − <i>P</i><sub>2</sub>) / <i>L</i> [[K6 s. 181]]</p>
<p><i>V̇</i> birim zamanda aktarılan gaz hacmi, <i>A</i> zarın yüzey alanı, <i>L</i> kalınlığı (kitapta <i>T</i>), <i>P</i><sub>1</sub> − <i>P</i><sub>2</sub> gazın iki yüz arasındaki kısmi basınç farkıdır. [[K6 s. 181]] <i>D</i> gaz ile zarın özelliklerini içeren difüzyon sabitidir. [[K6 s. 181–182]]</p>
<p>Hız mL/dk, basınç kPa, alan m² ve kalınlık m ile yazıldığında <i>D</i> için tutarlı birim mL/(dk·m·kPa) olur. [[K6 s. 181]] [[K6 s. 185]]</p></div>
<p>Helyumla ve havayla şişirilen balonlar gece boyunca aynı miktarda gaz kaybetmez. [[K6 s. 181]] Helyum balonu sabah daha sönüktür, çünkü helyum havanın büyük bölümünü oluşturan azota göre daha küçük taneciklerden oluşur ve balon duvarından daha hızlı geçer. [[K6 s. 181]]</p>
<ul><li><b>Gaz fazında.</b> Molekül boyutu yerine ölçümü daha kolay olan yoğunluk (<i>ρ</i>) kullanılabilir. [[K6 s. 181]] Graham yasasına göre hız ∝ 1/√<i>ρ</i> olur. [[K6 s. 181]] Avogadro yasasına göre aynı koşullarda eşit sayıda gaz molekülü eşit hacim kaplar, dolayısıyla yoğunluk molekül ağırlığıyla (<i>M</i>) doğru orantılıdır. [[K6 s. 181–182]] Böylece iki gaz için hız<sub>a</sub>/hız<sub>b</sub> = √(<i>M</i><sub>b</sub>/<i>M</i><sub>a</sub>) yazılır. [[K6 s. 181–182]]</li>
<li><b>Sıvıya geçerken.</b> Aynı gazın çözünürlüğü sıvıdan sıvıya değişir ve geçiş hızı o sıvıdaki çözünürlükle (<i>S</i>) doğru orantılıdır. [[K6 s. 182]] Su ve kan için özellikle bu özellik önemlidir. [[K6 s. 182]] İki etki birlikte <i>D</i> ∝ <i>S</i>/√<i>M</i> bağıntısını verir. [[K6 s. 182]]</li></ul>
<div class="viz"><div class="viz-head"><h3>Gaz fazında ağırlık iki katına çıkarsa hız yarıya iner mi?</h3></div><div data-viz="fk10_graham"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Her iki oran da aynı referans gazına göre hesaplanır, eğri tek bir gazın zaman içindeki değişimini göstermez. [[K6 s. 181–182]]</p></div>
<p>Eğrinin başlangıcında iki gazın molekül ağırlıkları eşittir ve hızlarının oranı birdir. [[K6 s. 181–182]] Hızın yarıya indiği noktayı bulun: ağırlık oranı iki olduğunda hız oranı 1/√2 iken ağırlık oranı dört olduğunda 1/√4 = 0,5 olur. [[K6 s. 181–182]] Bu hesap gaz fazına aittir, alveol yüzeyindeki sıvıya geçişi karşılaştırırken aynı eğriyi tek başına kullanmayın. [[K6 s. 182]]</p>
<div class="note"><b>Çözümlü örnek · O₂ mi, CO₂ mi?</b> Gaz fazında molekül ağırlığı daha düşük olan O₂ hızlıdır. [[K6 s. 189]] Solunum zarının sıvı tabakasında ise CO₂’nin çözünürlük üstünlüğü molekül ağırlığı farkına baskın gelir ve CO₂ daha hızlı geçer. [[K6 s. 182]] [[K6 s. 189]] Bu kez helyumu düşünün: çok hafif olmasına karşın sıvıda pek çözünmediği için kana geçişi çok azdır. [[K6 s. 182]]</div>
<div class="note plain"><b>Atlas notu.</b> Kitabın bölüm özeti difüzyon sabitini molekül ağırlığıyla doğru orantılı verir. [[K6 s. 194]] Doğru ilişki, bölümün ana metnindeki gibi, diğer koşullar sabitken molekül ağırlığının kareköküyle ters orantıdır. [[K6 s. 182]]</div>
<h3>Doğrunun eğimini okuyun</h3>
<p>Grafikte yatay eksende ilerlerken aynı zarın iki yanı arasındaki basınç farkını büyütürsünüz. [[K6 s. 181]] Kalınlık kaydırıcısıyla ise yatay eksendeki tüm basınç farkları için zarın kendisini değiştirirsiniz. [[K6 s. 181]] Bu nedenle ilk değişiklik aynı doğru üzerinde daha büyük bir aktarıma götürürken ikinci değişiklik doğrunun eğimini değiştirir. [[K6 s. 181]]</p>
<div class="card"><h3>Hesap · Aynı gaz, iki kalınlık</h3>
<p>Alan ve basınç farkı sabitken 0,5 µm ve 1,0 µm kalınlığındaki iki zarı karşılaştırın. [[K6 s. 181–182]] Kalın zarın ince zara göre aktarım hızı, kalınlıkların ters oranı olan 0,5/1,0 = 0,5’tir. [[K6 s. 181–182]] Basınç farkı sıfıra indiğinde ise her iki kalınlık için de net aktarım sıfırdır. [[K6 s. 180–181]]</p>
<p>Bu karşılaştırmayı farklı gazlarla yapacaksanız yalnız kalınlık oranını kullanamazsınız. [[K6 s. 181–182]] Basınç farkı, alan ve kalınlık aynı kaldığında aktarımdaki farkı bu kez gazların o dokudaki difüzyon sabitleri belirler. [[K6 s. 181–182]]</p></div>
</section>

<section class="wrap blk ders-sec" id="fk10-akciger">
<h2>Alveolden kas hücresine gaz alışverişi</h2>
<p class="intro">Sağlıklı akciğerde 0,5–1,0 µm kalınlığındaki solunum zarından geçen gazlar, istirahatte eritrosit pulmoner kapillerden çıkmadan dengeye ulaşır. [[K6 s. 182–183]]</p>
<div class="viz"><div class="viz-head"><h3>Kapiller geçiş süresini ilerletin</h3></div><div data-viz="fk10_gecis"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Yol üzerindeki konum zamanla orantılı çizilmiştir. [[K6 s. 183]]</p></div>
<p>İstirahatte eritrositin kapillerden geçişi 0,75 saniye sürer. [[K6 s. 183]] CO₂ geçişi yaklaşık 0,1 saniyede tamamlanır ve bu gazın iki taraftaki kısmi basınç farkı hemen hemen sıfıra iner. [[K6 s. 183]] O₂ için gereken süre yaklaşık 0,3–0,4 saniyedir, yani eritrosit yolun yaklaşık yarısındayken geçiş tamamlanmıştır. [[K6 s. 183]]</p>
<ol class="iskelet"><li><b>Alveol → plazma.</b> Pulmoner arter kapillere oksijence fakir kan getirdiğinden alveoldeki O₂ kısmi basıncı kandakinden yüksektir. [[K6 s. 183]] O₂ alveol duvarını geçer ve plazmada kısa süre çözünür. [[K6 s. 183]]</li>
<li><b>Plazma → eritrosit.</b> Eritrositteki yüksek deoksihemoglobin derişimi O₂’nin plazmadan hücreye hızla geçmesini sağlayan farkı sürdürür. [[K6 s. 183]] Dolaşım bu iki difüzyon basamağını dokudaki basamaklara bağlar. [[K6 s. 182–183]]</li>
<li><b>Eritrosit → doku.</b> Sistemik kapillerde oksijenlenmiş eritrositle O₂ gereksinimi olan kas hücresi arasında ters yönde bir fark vardır. [[K6 s. 183]] O₂ eritrosit zarını, kapiller duvarı ve interstisyel sıvıyı geçerek kasa ulaşır. [[K6 s. 183]] CO₂ ise hücrelerden uzaklaştırılır. [[K6 s. 182]]</li></ol>
<div class="card"><h3>Hesap · Dengeye gelindiğinde yolun ne kadarı bitmiştir?</h3>
<p>Kapillerdeki toplam geçiş süresini payda, gazın dengeye gelme süresini pay olarak kullanın. [[K6 s. 183]] CO₂ için 0,1/0,75 ≈ 0,13, O₂ için 0,3/0,75 = 0,40 ile 0,4/0,75 ≈ 0,53 arasında bir oran elde edilir. [[K6 s. 183]] Bunlar aktarılan gazın yüzdesi değil, eritrositin toplam geçiş süresinden o ana kadar kullanılan paydır. [[K6 s. 183]]</p></div>
<h3>Gaz alışverişini hangi değişiklik sınırlar?</h3>
<ul><li><b>Mesafe.</b> Fibrozan alveolitte kalınlaşan alveol duvarı difüzyonu güçleştirir. [[K6 s. 182]]</li>
<li><b>Alan.</b> Amfizem veya lobektomi etkin yüzeyi küçültür, ancak etkisi istirahatte klinik olarak seyrek fark edilir. [[K6 s. 183]]</li>
<li><b>Perfüzyon.</b> Pulmoner dolaşım yetersizse zar boyunca gerekli kısmi basınç farkı korunamaz. [[K6 s. 183]]</li></ul>
<p>Çoğu volatil anestezik alveolde CO₂’ye benzer difüzyon özellikleri gösterir. [[K6 s. 183]] Kitaba göre hasta yeterince oksijenleniyorsa ve inspire edilen ajan derişimi yeterliyse kana geçiş genellikle kaygı yaratmaz. [[K6 s. 183]]</p>
<div class="cols"><div class="card"><h3>Solunum devresinde birikme</h3><p>Kauçuk parçalar volatil ajanı difüzyonla alıp depolayabilir ve ajan kapatıldıktan çok sonra bile devreye buhar bırakabilir. [[K6 s. 184]] Eskiden devrede daha fazla kauçuk bulunurdu. [[K6 s. 184]] Büyük ölçüde latekssiz silikon ve PVC parçaların kullanılması ve çoğunun işlem sonunda atılması bu sorunu azaltmıştır. [[K6 s. 184]]</p></div>
<div class="card"><h3>Dalgıçta azot kabarcığı</h3><p>Derinde artan basınç, normalde kanda az çözünen azotun daha çok çözünmesine yol açar. [[K6 s. 184]] Hızlı dekompresyonla azot çözeltiden ayrılıp kanda kabarcık oluşturabilir ve ağrılı, ölümcül olabilen dekompresyon hastalığı gelişebilir. [[K6 s. 184]]</p><p>İndüksiyondan önce kabarcıktaki N₂O kısmi basıncı sıfırdır. [[K6 s. 184]] Azottan daha çözünür olan N₂O alveolden kana, oradan da basınç farkıyla kabarcığa geçerek hacmini artırabilir ve belirtileri ağırlaştırabilir. [[K6 s. 184]] Kitap bu nedenle yakın zamanda derine dalmış kişide N₂O’dan kaçınılmasını önerir. [[K6 s. 184]]</p></div></div>
<div class="viz"><div class="viz-head"><h3>İndüksiyon kabarcığı neden büyütebilir?</h3></div><div data-viz="fk10_kabarcik"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Çaplar şematiktir, hacim değişiminin yalnız yönü gösterilir. [[K6 s. 184]]</p></div>
<p>Bu örnekte iki ayrı gazın izini sürün. [[K6 s. 184]] İlk olayda derinde çözünmüş azot, basınç düşünce çözeltiden ayrılır ve kabarcığı oluşturur. [[K6 s. 184]] İkinci olayda indüksiyonla verilen N₂O kanda çözünerek kapillere taşınır ve zaten var olan azot kabarcığına katılır. [[K6 s. 184]] Kabarcığın oluşması ile anestezi sırasında daha da büyümesi bu nedenle farklı basamaklardır. [[K6 s. 184]]</p>
<h3>Kapiller geçişi zaman ekseninde yorumlayın</h3>
<p>İki gaz aynı eritrositin yolculuğu sırasında değiş tokuş edilir, ancak dengeye gelme süreleri farklıdır. [[K6 s. 183]] Kaydırıcıyı 0,1 saniyede durdurduğunuzda eritrosit kapiller içindedir ve CO₂ için basınç farkı çoktan küçülmüştür. [[K6 s. 183]] Aynı anda O₂ için hâlâ alveolden kana net geçiş beklenir. [[K6 s. 183]]</p>
<p>Şimdi kaydırıcıyı 0,4 saniyeye getirin: O₂ için de yaklaşık dengeye varılmıştır, ama eritrositin dolaşımla taşınması sürer. [[K6 s. 183]] İstirahatte difüzyon için gereken süreyle kanın kapillerden geçmesi için gereken süre bu yüzden aynı şey değildir. [[K6 s. 183]] Dokuya ulaşan eritrositte net hareketin yönünü ise kas hücresiyle arasındaki yeni fark belirler. [[K6 s. 183]]</p>
</section>

<section class="wrap blk ders-sec" id="fk10-kapasite">
<h2>Akciğerin difüzyon kapasitesi nasıl ölçülür?</h2>
<p class="intro">Akciğerin O₂’yi kana aktarma etkinliğini değerlendirmek için az miktarda karbonmonoksit (CO) solutulur ve soluk tutulurken kana geçen miktar hesaplanır. [[K6 s. 184–185]]</p>
<div class="viz"><div class="viz-head"><h3>Tek soluk testinde örneğin yolunu izleyin</h3></div><div data-viz="fk10_test"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>İnspire edilen ve dışarı verilen gazın CO derişimleri arasındaki fark alımı gösterir. [[K6 s. 185]] CO kanda çok iyi çözündüğü, bu yüzden alımı akımla sınırlanmadığı için izleyici gaz olarak kullanılır. [[K6 s. 185]] Tek soluk yöntemi klinikte en sık kullanılan yöntemdir, zamanla geliştirilmiş farklı uygulamaları genel olarak benzer sonuç verir. [[K6 s. 185]]</p>
<div class="card"><h3>Fick denkleminden ölçülebilen büyüklüğe</h3>
<p>Yaşayan hastada kan–gaz bariyerinin alanı ve kalınlığı ayrı ayrı ölçülemez. [[K6 s. 185]] Bu nedenle <i>D</i><sub>L</sub> = <i>D</i> · <i>A</i>/<i>L</i> tanımlanır ve aktarım <i>V̇</i> = <i>D</i><sub>L</sub> · (<i>P</i><sub>1</sub> − <i>P</i><sub>2</sub>) biçimini alır. [[K6 s. 181]] [[K6 s. 185]] Kapasite hem gazın ve dokunun difüzyon özelliklerini hem de etkin alan ve kalınlığı içerir. [[K6 s. 185]]</p>
<p><i>D</i><sub>LCO</sub> = <i>V̇</i><sub>CO</sub> / (<i>P</i><sub>ACO</sub> − <i>P</i><sub>cCO</sub>) ≈ <i>V̇</i><sub>CO</sub> / <i>P</i><sub>ACO</sub>. [[K6 s. 185]] Pay, dakikada kana aktarılan CO hacmidir (mL/dk). [[K6 s. 185]] Paydadaki alveol ve kapiller CO kısmi basınçları kPa ile ölçülür, kapiller değer ihmal edilebilecek kadar küçüktür. [[K6 s. 185]] Böylece her kPa alveoler CO basıncı başına bir dakikada kaç mL CO aktarıldığı bulunur. [[K6 s. 185]]</p></div>
<h3>Ölçümü yeniden kurun</h3>
<ol class="iskelet"><li>Hasta maksimum ekspirasyonu izleyerek vital kapasitesi kadar test gazı solur. [[K6 s. 185–186]] Karışımdaki yaklaşık %0,3 CO aktarımı, yaklaşık %10 helyum ise soluk tutma sırasındaki toplam alveol hacmini ölçmeye yarar. [[K6 s. 185–186]]</li>
<li>Hasta 10 saniye soluğunu tutar, ardından nefes verir. [[K6 s. 186]] İlk 0,75 L ölü boşluğun yıkanması için ayrılır, sonraki gazdan örnek alınır. [[K6 s. 186]] Ekspirasyon sonu CO kısmi basıncını kızılötesi gaz analizörü doğrudan ölçer. [[K6 s. 186]]</li>
<li>Helyum hemen hiç çözünmediğinden bu sürede kanda anlamlı kayıp olmadığı varsayılır. [[K6 s. 186]] Alveol hacmi = solunan hacim (vital kapasite) × (inspire He derişimi / ekspirasyon sonu He derişimi) olarak hesaplanır. [[K6 s. 186]] Derişimler aynı birimde yazıldığında hacmin birimi solunan vital kapasitenin birimidir. [[K6 s. 186]]</li>
<li>Hastanın hemoglobin derişimi için düzeltme yapılır ve kapasite aynı anda helyumla bulunan alveol hacmine göre normalize edilir. [[K6 s. 186]] Bilgisayar genellikle bu hesapları yapar ve sonucu hastanın cinsiyeti, boyu ve yaşı gibi özelliklerden tahmin edilen değerle karşılaştırır. [[K6 s. 186]]</li></ol>
<div class="note"><b>Ölü boşluk neden önce ayrılır?</b> Hesabın paydasında alveol gazının kısmi basıncı bulunur, dolayısıyla ekspirasyon sonu örneğinin alveolde tutulan gazı temsil etmesi gerekir. [[K6 s. 185–186]] İlk çıkan gazı doğrudan analiz etmek yerine önce ölü boşluğu yıkamak, analizörün örneklediği gazı hesapta aranan bölmeyle eşleştirir. [[K6 s. 186]]</div>
<h3>İki gaz, iki ayrı ölçüm</h3>
<div class="cols"><div class="card"><h3>Hangi hacimden örnek aldık?</h3><p>Solunan vital kapasiteyi bilmek tek başına soluk tutma anında test gazının dağıldığı toplam alveol hacmini vermez. [[K6 s. 186]] Helyumun miktarı korunuyorsa solunan hacimle inspire He derişiminin çarpımı, alveol hacmiyle son He derişiminin çarpımına eşittir. [[K6 s. 186]] Son derişim küçüldükçe aynı helyum miktarının dağıldığı hesaplanan hacim büyür. [[K6 s. 186]]</p></div>
<div class="card"><h3>O hacimden ne kadar CO alındı?</h3><p>CO için aynı miktar korunumu varsayımını kullanmak testin ölçmek istediği olayı gözden kaçırır: soluk tutma sırasında CO’nun bir bölümü kana geçer. [[K6 s. 185–186]] Helyumun seyreltmesi hacmi açıklarken CO’daki kayıp zar boyunca aktarımı açıklar. [[K6 s. 185–186]]</p></div></div>
<p>Sonucu söylerken hem hacim hem zaman hem de basınç birimine yer verin. [[K6 s. 185]] Yalnız bir dakikada aktarılan CO hacmini söylemek aktarım hızını verir, o aktarım için var olan kısmi basınç farkını hesaba katmaz. [[K6 s. 185]] Kapasitede aynı hız bu kez onu oluşturan basınç farkına bölünür. [[K6 s. 185]]</p>
</section>

<section class="wrap blk ders-sec" id="fk10-ozmoz">
<h2>Ozmoz: çözünen kalır, su geçer</h2>
<p class="intro">Zar çözücüyü geçirip çözüneni tutarsa çözücü daha seyreltik taraftan daha derişik tarafa net geçiş gösterir. [[K6 s. 186–187]]</p>
<div class="viz"><div class="viz-head"><h3>Sağdaki çözeltinin derişimini değiştirin</h3></div><div data-viz="fk10_ozmoz"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Noktalar zarı geçemeyen tanecikleri şematik olarak gösterir. [[K6 s. 186–187]]</p></div>
<p>Geçirgen U tüpünde tuz da su da karşıya geçebiliyordu. [[K6 s. 180]] Ozmozu ayıran özellik, derişim farkına yol açan çözünenin zarın kendi tarafında kalmasıdır. [[K6 s. 186]] <b>Ozmotik basınç</b>, bu koşullarda zardan net çözücü akışını durdurmak için uygulanması gereken basınçtır. [[K6 s. 186]]</p>
<div class="fk10-kartlar">
<div class="card"><h3>İzotonik</h3><p>Kitabın aynı çözünenle yaptığı karşılaştırmada iki çözeltinin derişimi eşittir. [[K6 s. 187]] Her iki yanda yalnız saf su bulunduğunda olduğu gibi su molekülleri eşit hızla gidip gelir ve net akış olmaz. [[K6 s. 186]]</p></div>
<div class="card"><h3>Hipertonik</h3><p>Karşılaştırılan çözeltilerden çözünen derişimi daha yüksek olanıdır. [[K6 s. 187]] Çözünen zarı geçemiyorsa net su geçişi bu tarafa doğrudur. [[K6 s. 186–187]]</p></div>
<div class="card"><h3>Hipotonik</h3><p>Diğerine göre çözünen derişimi daha düşük olan çözeltidir. [[K6 s. 187]] Aynı koşullarda bu taraf net su kaybeder. [[K6 s. 186–187]]</p></div></div>
<p>Bir damla kanı suya eklediğinizde eritrositin içindeki sodyum ve potasyum gibi elektrolitler ile dış ortam arasında derişim farkı doğar. [[K6 s. 186]] Küçük molekülleri geçirebilen seçici zardan su hücreye girer, eritrosit şişer ve derişimler eşitlenmeden parçalanırsa hemoliz olur. [[K6 s. 186]]</p>
<p>Sümüklüböceğin derisi insan derisinden farklı olarak suyu geçirir, bu nedenle üzerine dökülen tuz vücudundan su çeker. [[K6 s. 186]] Hücrelerde de zarlar genellikle suyu geçirirken nişasta gibi büyük organik molekülleri tutar ve ozmoz suyun hücreye giriş çıkışının başlıca yolunu oluşturur. [[K6 s. 186–187]]</p>
<h3>Aynı zarın iki tarafından bakın</h3>
<p>Hipertonik ve hipotonik sözcükleri tek başına bir sıvının adları değildir: biri ötekine göre tanımlanır. [[K6 s. 187]] Şekilde sağ tarafta daha çok geçemeyen tanecik varken sağdaki çözelti soldakine göre hipertonik, soldaki sağdakine göre hipotoniktir. [[K6 s. 186–187]] Tümüyle geçirgen zardaki tuz örneğinden farklı olarak bu kez derişim farkına yanıt verebilen madde sudur. [[K6 s. 180]] [[K6 s. 186]]</p>
<p>Bu ayrımı eritrosite uygularken önce zarın içini ve dışını belirleyin. [[K6 s. 186]] Bir damla kanın saf suya eklenmesi hücrenin dışını seyreltir, su girişini açıklayan fark da işte bu dış ortamla elektrolitleri içeren hücre içi arasındadır. [[K6 s. 186]] Dengenin mutlaka sağlam bir eritrositle sonuçlanması gerekmez, çünkü su alıp şişen zar daha önce yırtılabilir. [[K6 s. 186]]</p>
</section>

<section class="wrap blk ders-sec" id="fk10-henry">
<h2>Çözünürlük, kısmi basınç ve sıcaklık</h2>
<p class="intro">Çözünürlük, belirli koşullarda birim çözücü hacminde çözünebilen madde miktarıdır. [[K6 s. 187–188]]</p>
<div class="viz"><div class="viz-head"><h3>Gaz basıncı değişince kanda ne kadar N₂O çözünür?</h3></div><div data-viz="fk10_henry"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Doğru, 37 °C’de 101 kPa için verilen 47 mL değerinden Henry yasasıyla hesaplanır. [[K6 s. 188]] [[K6 s. 191]]</p></div>
<p>Sıcak çaya eklenen şeker çözünendir, su çözücüdür, şekerli çay ise çözeltidir. [[K6 s. 187]] Karıştırmak şekerin daha çabuk çözünmesini sağlar, ancak aynı sıcaklıkta çözünebilecek toplam miktarı değiştirmez. [[K6 s. 187]] Bekleyince şeker kendiliğinden de çözünür, fakat çay soğursa suda çözünebilen şeker miktarı azalır. [[K6 s. 187]]</p>
<p>Çözünen bir katı da bir gaz da olabilir ve miktarı birim sıvı hacmi başına mol ile ifade edilebilir. [[K6 s. 188–189]] Çözünenin nötr moleküller halinde kalması veya yüklü iyonlara ayrışması maddenin, çözücünün ve ortam koşullarının özelliklerine bağlıdır. [[K6 s. 188]] Su iyi bir çözücüdür ve onda çözünen madde iyonlara ayrışıyorsa bir elektrolit çözeltisi elde edilir. [[K6 s. 188]]</p>
<div class="card"><h3>Henry yasası · Dengedeki gaz miktarı</h3><p>Belirli bir gaz ile belirli tür ve hacimdeki sıvı dengedeyken, sıcaklık sabitse çözünen gaz miktarı o gazın kısmi basıncıyla doğru orantılıdır. [[K6 s. 188]] Derişim biçiminde <i>C</i> = <i>k</i><sub>H</sub> · <i>P</i> yazılır. [[K6 s. 188]] <i>C</i> sıvıdaki gaz derişimi (mol/L), <i>P</i> dengedeki gaz kısmi basıncı (kPa), <i>k</i><sub>H</sub> ise derişim/basınç birimli Henry yasası sabitidir. [[K6 s. 188–189]]</p>
<p>Henry sabiti gaza, çözücüye ve sıcaklığa özgüdür, bu yüzden bir çözünürlük katsayısının hangi sıcaklıkta geçerli olduğu belirtilmelidir. [[K6 s. 188–189]] Kitap helyum, azot ve oksijenin suda çözünmesini farklı kısmi basınçlarda karşılaştırırken sıcaklığı 25 °C’de sabit tutar. [[K6 s. 189]]</p></div>
<p>Şekerli çay ile gazlı içeceği yan yana düşündüğünüzde sıcaklık etkisinin yönünü maddeye göre belirtmeniz gerekir. [[K6 s. 187–188]] Sıcak suda daha çok şeker çözünebilirken soğuk sudan sıcak suya geçiş gazın sıvıda kalmasını güçleştirir. [[K6 s. 187–188]] Bu yüzden yalnızca “sıcaklık çözünürlüğü değiştirir” demek, hangi maddenin miktarının artacağını öngörmek için yetersizdir. [[K6 s. 187–188]]</p>
<h3>Basınç ve sıcaklığı ayrı düşünün</h3>
<ul><li><b>Dalışta.</b> Azotun olağan koşullarda kandaki çözünürlüğü düşüktür ve solunum gazı alışverişine kayda değer katkısı yoktur. [[K6 s. 188]] Dalgıç indikçe azotun kısmi basıncı ve kanda çözünen miktarı artar, derinde konfüzyon ve çıkış sırasında dekompresyon hastalığı önem kazanır. [[K6 s. 184]] [[K6 s. 188]]</li>
<li><b>Isınırken.</b> Gazların sıvıdaki çözünürlüğü sıcaklık arttıkça azalır. [[K6 s. 188]] Soğuk denizde vücudu soğumuş dalgıç hızlı bir çıkıştan sonra sıcak banyo yaparsa azotun çözeltiden ayrılma tehlikesi artar. [[K6 s. 188]] Bu durumda basınç yanında sıcaklık da değiştiği için aynı Henry sabitini kullanamayız. [[K6 s. 188]]</li>
<li><b>Gazlı içecekte.</b> Şişe açıldığında basınç düşünce gaz sıvıdan ayrılır. [[K6 s. 188]] Sıcak bir günde bardağa dökülen içecek ısınırsa daha da fazla gaz çıkar, köpük artar ve içeceğin gazı azalır. [[K6 s. 188]]</li></ul>
<div class="card"><h3>Hesap · Basınç yarıya inerse</h3>
<p>Grafikteki 100 mL kan başlangıçta 37 °C’de 101 kPa N₂O ile dengededir ve 47 mL gaz içerir. [[K6 s. 191]] Sıcaklığı, sıvı türünü ve miktarını sabit tutup kısmi basıncı 101/2 = 50,5 kPa yapın. [[K6 s. 188]] [[K6 s. 191]] Yeni dengede gaz hacmi 47 × 50,5/101 = 23,5 mL olur. [[K6 s. 188]] [[K6 s. 191]]</p>
<p>Burada bilinmesi gereken büyüklük toplam basınç değil, sıvıyla dengelenen gazın kendi kısmi basıncıdır. [[K6 s. 188]] Başlangıç örneğinde toplam basıncı doğrudan kullanabilmemizin nedeni gazın %100 N₂O olmasıdır. [[K6 s. 191]] Hesap yeni dengenin miktarını verir, o dengeye ulaşmak için gereken süreyi vermez. [[K6 s. 181]] [[K6 s. 188]]</p></div>
</section>

<section class="wrap blk ders-sec" id="fk10-dagilim">
<h2>Dengede dağılım: eşit basınç, farklı derişim</h2>
<p class="intro">Dağılım katsayısı, bir maddenin birbirine karışmayan iki fazdaki denge derişimlerinin oranıdır ve sıvı ile gaz arasındaki dağılım için de tanımlanabilir. [[K6 s. 190–191]]</p>
<div class="viz"><div class="viz-head"><h3>Gaz derişiminden kan derişimini bulun</h3></div><div data-viz="fk10_dagilim"></div><p class="viz-cap" aria-live="polite"></p></div>
<p><i>λ</i>(a,b) = <i>C</i><sub>a</sub>/<i>C</i><sub>b</sub> yazımında ilk faz maddenin gittiği, ikinci faz geldiği ortamdır. [[K6 s. 190–191]] Eşit hacimlerdeki derişimler aynı birimle yazıldığı için oran birimsizdir, ancak sıcaklığa bağlıdır. [[K6 s. 190–191]] Kan/gaz katsayısı vücut sıcaklığında belirlenir ve buharın kanda çözünme eğilimi üzerinden akciğerden alımıyla ilişkilidir. [[K6 s. 191]]</p>
<div class="fk10-kartlar"><div class="card"><h3>Kan/gaz</h3><p>Payda kanla dengedeki gazın, pay ise kandaki ajanın derişimidir. [[K6 s. 190]] Örnekte <i>λ</i> = 0,5 ve inspire edilen derişim %8 ise dengedeki arter kanında derişim 0,5 × %8 = %4 olur. [[K6 s. 191]]</p></div>
<div class="card"><h3>Yağ/gaz</h3><p>Yağdaki ajan derişiminin aynı hacimdeki ve temas halindeki gazın denge derişimine oranıdır. [[K6 s. 190]] Beynin yağ içeriği yüksek olduğundan zeytinyağının ajanı tutma eğilimi, beynin ajanı alma eğilimini modellemek için kullanılmıştır. [[K6 s. 190]]</p></div></div>
<div class="note"><b>Hesap · N₂O, kan ve yağ.</b> Atmosfer basıncında %100 N₂O ile 37 °C’de dengelenmiş 100 mL kanı ele alın. [[K6 s. 191]] Kan/gaz katsayısı 0,47 olduğundan çözünmüş N₂O hacmi 100 × 0,47 = 47 mL’dir. [[K6 s. 191]] Dalton yasasına göre gazda da kanda da N₂O kısmi basıncı 101 kPa’dır. [[K6 s. 191]]</div>
<p>Şimdi aynı dengeye 100 mL yağ ekleyin ve N₂O basıncını koruyun. [[K6 s. 191–192]] Kan/yağ katsayısı 0,34 olduğundan aynı hacimdeki yağ, kandan daha çok N₂O içerir. [[K6 s. 191–192]] Yağdaki miktar 47/0,34 ≈ 140 mL’dir, çünkü katsayı tanımlanırken kandaki derişim paya yazılmıştır. [[K6 s. 191–192]]</p>
<div class="card"><h3>Hesap · Hangi derişimi biliyoruz?</h3>
<p>Grafikte gaz derişimini %8’den %4’e indirin ve katsayıyı 0,5’te tutun. [[K6 s. 191]] Dengedeki kan derişimi de %4’ten %2’ye iner, çünkü her iki durumda kan derişiminin gaz derişimine oranı aynıdır. [[K6 s. 191]] Soruyu ters yönde sorarsanız kandaki denge derişimini 0,5’e bölerek gazdaki derişimi bulursunuz. [[K6 s. 191]]</p>
<p>Kan/gaz oranını aynı ajanın yağ/gaz oranı yerine kullanamazsınız. [[K6 s. 190–191]] Paydadaki gaz aynı olsa da oranın payına hangi ortamın derişiminin yazıldığına göre sonuç değişir: biri kanın, diğeri yağın aynı gazla dengedeyken içerdiği ajanı karşılaştırır. [[K6 s. 190–191]]</p></div>
<h3>Potens ile etkinin başlamasını ayırın</h3>
<p><b>Potens.</b> Minimum alveoler konsantrasyon (MAC), hastaların %50’sinde cilt insizyonuna refleks yanıtı önleyen alveoler buhar derişimidir. [[K6 s. 192]] Meyer–Overton grafiğinde yağ/gaz katsayısı ile MAC arasındaki ilişki iki logaritmik eksende gösterilir. [[K6 s. 190]] Yağda çözünme eğilimi yüksek olan ajan için gereken MAC daha düşük, dolayısıyla potens daha yüksektir. [[K6 s. 190–192]]</p>
<p>MAC’i yorumlarken deneyde sabit tutulan yanıtı düşünün: karşılaştırma her ajan için aynı cilt insizyonuna hastaların yarısında yanıt alınmaması üzerinden yapılır. [[K6 s. 192]] Bu sonuca daha küçük bir alveoler derişimle ulaşılıyorsa o ajan daha potenttir. [[K6 s. 190–192]] Bu ölçüt belirli bir etki için gereken derişimi anlatır, solutmaya başladıktan sonra etkinin kaç sürede ortaya çıkacağını söylemez. [[K6 s. 190–192]]</p>
<p><b>Başlangıç ve sonlanma.</b> Kanda çok iyi çözünen ajan akciğerden kana hızla alınsa bile çözeltide kalır ve kandaki kısmi basıncı daha yavaş yükselir. [[K6 s. 192]] Beyinle kan arasındaki basınç farkı daha küçük kaldığından beyne difüzyon yavaşlar. [[K6 s. 192]] Yüksek kan/gaz katsayısı hem etki başlangıcını hem vücuttan atılmayı geciktirir, hızlı başlangıç ve sonlanma için düşük kan çözünürlüğü istenir. [[K6 s. 192]]</p>
<h3>Oranı ters yazınca hangi soru değişir?</h3>
<p>Kan/yağ oranı verildiğinde yağda kaç mL gaz bulunduğunu arıyorsanız bilinmeyen paydadır. [[K6 s. 191–192]] Bu yüzden kandaki 47 mL’yi 0,34 ile çarpmak yerine bu katsayıya bölersiniz. [[K6 s. 191–192]] Sonucu yön bakımından da kontrol edebilirsiniz: N₂O yağda daha iyi çözündüğüne göre eşit hacimdeki yağın içerdiği gaz miktarı kandakinden fazla olmalıdır. [[K6 s. 191–192]]</p>
<p>Bu işlemin eşit hacimli kan ve yağ için doğrudan gaz miktarlarıyla yapılabilmesinin nedeni dağılım katsayısının aslında bir derişim oranı olmasıdır. [[K6 s. 190–192]] Aynı şekilde kan/gaz örneğinde %8 ile %4’ün farklı olması dengeye ulaşılmadığı anlamına gelmez: denge koşulu gazın iki ortamdaki kısmi basıncıyla ilgilidir. [[K6 s. 191]]</p>
</section>

<section class="wrap blk ders-sec" id="fk10-raoult">
<h2>Tanecik sayısı ve Raoult yasası</h2>
<p class="intro">Koligatif özellikler belirli bir çözücü hacmindeki çözünmüş tanecik sayısına bağlıdır, taneciklerin büyüklüğüne, kütlesine veya kimliğine bağlı değildir. [[K6 s. 192]]</p>
<div class="viz"><div class="viz-head"><h3>Derişimle değişen buhar basıncı düşüşü</h3></div><div data-viz="fk10_raoult"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kitabın seyreltik çözelti modeli göreli birimlerle çizilmiştir, düşey eksen saf çözücüye göre basınç kaybını gösterir. [[K6 s. 192–193]]</p></div>
<p>Ozmotik basınç, buhar basıncındaki düşüş, donma noktası alçalması ve kaynama noktası yükselmesi koligatif özelliklerdir. [[K6 s. 192]] Koligatif olmayan özelliklerde ise hem çözücünün hem de çözünmüş maddenin kimliği önem taşır. [[K6 s. 192]]</p>
<ul><li><b>Donma ve erime.</b> Kışın yola serpilen tuz suda çözündüğünde donma noktasını, dolayısıyla aynı sıcaklıktaki erime noktasını düşürür. [[K6 s. 192]] Su 0 °C’nin altında donar ve tuz çözünmeye devam ettiği sürece her eklenen tanecik donma noktasının daha da düşmesine katkıda bulunur. [[K6 s. 192]]</li>
<li><b>Buharlaşma ve kaynama.</b> Uçucu olmayan çözünenin tanecikleri sıvı yüzeyinin bir kısmını kaplayınca yüzeyde buharlaşabilecek çözücü molekülleri azalır. [[K6 s. 192–193]] Buharlaşma güçleşir, buhar basıncı saf çözücününkinden daha düşük ve çözeltinin kaynama noktası daha yüksek olur. [[K6 s. 192]]</li></ul>
<p>Kitap Raoult yasasını çözücünün buhar basıncındaki düşüşün çözünenin molar derişimiyle orantılı olması şeklinde verir. [[K6 s. 192–193]] Buna göre karşılaştırılan büyüklük <i>ΔP</i> = <i>P</i><sub>saf</sub> − <i>P</i><sub>çözelti</sub> olup her iki basınçla aynı birimdedir. [[K6 s. 192–193]] Çözünen tanecik derişimini artırdığınızda grafikteki basınç kaybı büyürken çözeltinin gerçek buhar basıncı azalır. [[K6 s. 192–193]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap basınç düşüşünü çözünenin molar derişimiyle orantılı ifade eder. [[K6 s. 193]] İdeal çözeltide tam Raoult bağıntısı <i>P</i> = <i>x</i><sub>çözücü</sub> · <i>P</i><sub>saf</sub> şeklindedir ve birimsiz mol kesri <i>x</i> yerine molar derişimle kurulan bu orantı seyreltik çözelti yaklaşımıdır. [[K6 s. 192–193]]</div>
<div class="note"><b>Grafiği tersten okuyun.</b> Düşey eksenin sıfır noktası buhar basıncının kendisinin sıfır olduğu anlamına gelmez. [[K6 s. 192–193]] Çözünen eklenmeden önce saf çözücüye göre bir basınç kaybı yoktur. [[K6 s. 192–193]] Düşey değer büyüdüğünde kayıp artar ve ölçülen buhar basıncı daha düşük çıkar. [[K6 s. 192–193]] Bu ayrım önemlidir, çünkü ozmometrede ölçülen basıncın düşmesi örnekte çözünmüş taneciklerin arttığı yönde yorumlanır. [[K6 s. 193]]</div>
</section>

<section class="wrap blk ders-sec" id="fk10-olcum">
<h2>Ozmometre bir sıcaklık ölçümünden nasıl yararlanır?</h2>
<p class="intro">Küçük iyonları bile tutan kusursuz bir yarı geçirgen zar yapmak zor olduğundan ozmotik basınç, onunla ilişkili bir koligatif özellik üzerinden değerlendirilebilir. [[K6 s. 193]]</p>
<div class="viz"><div class="viz-head"><h3>Donma noktası ozmometresinin kesiti</h3></div><div data-viz="fk10_ozmometre"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Ozmometre plazma ve idrar gibi vücut sıvılarını incelemek için kullanılır. [[K6 s. 193]] Ozmotik basınç ölçümüyle bileşiklerin, özellikle büyük moleküllerin bağıl molekül kütlesi de belirlenebilir. [[K6 s. 193]]</p>
<ol class="iskelet"><li><b>Aşırı soğutma.</b> Numune haznesi soğutma bölmesindeyken örnek sürekli karıştırılarak beklenen donma noktasının altına soğutulur. [[K6 s. 193]]</li>
<li><b>Dengeyi yakalama.</b> Kuvvetli karıştırma sırasında buz ile sıvının bir arada olduğu yarı donmuş bir karışım oluşur. [[K6 s. 193]] Kaydedilecek sıcaklık, aşırı soğutma sırasındaki en düşük değer değil, buz ile sıvının dengede olduğu donma sıcaklığıdır. [[K6 s. 193]]</li>
<li><b>Küçük farkı ölçme.</b> Donma noktasındaki değişim küçük olduğundan sıcaklığı yüksek duyarlıklı termistör ölçer. [[K6 s. 193]] Bu düşüş ozmotik basınçla ilişkili olduğundan doğrudan zar üzerinde basınç ölçmek gerekmez. [[K6 s. 193]]</li></ol>
<p><b>Buhar basıncıyla ölçüm.</b> Kitabın ter örneğinde, ölçülen buhar basıncı tuz içermeyen suyun değeriyle karşılaştırılır. [[K6 s. 193]] Raoult ilişkisinden yararlanılarak örnekteki tuz derişimi kestirilir ve kistik fibroziste terin artmış tuz içeriği bu ilişkiye örnek verilir. [[K6 s. 193]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap buhar basıncını kistik fibrozis ter testinin ilkesi olarak sunar. [[K6 s. 193]] Tanısal ter testinde ölçülen büyüklük ter klorür derişimidir, buhar basıncı ise klorüre özgü değildir. [[K6 s. 193]]</div>
<h3>Ölçüm zincirini kurun</h3>
<p>Önce doğrudan kaydedilen büyüklüğü söyleyin: donma noktası yönteminde prob bir sıcaklık, buhar basıncı yönteminde cihaz bir basınç ölçer. [[K6 s. 193]] İki ölçüm de çözünen taneciklerin çözücünün fiziksel bir özelliğinde yaptığı değişikliğe dayanır. [[K6 s. 192–193]] Sıcaklık yönteminde örneğin buz ve sıvı halinin dengede olması, basınç yönteminde ise saf su değerinin karşılaştırma için bilinmesi gerekir. [[K6 s. 193]]</p>
</section>

<section class="wrap blk ders-sec" id="fk10-p1">
<h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin, sonra gerekçenizi karşılaştırın.</p>
<div class="viz"><div data-viz="mtf" data-q="fk10-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk10-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk10-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="fk10-p2">
<h2>Part II · SOE 2</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Bir hastanın pulmoner difüzyon kapasitesini tek solukla nasıl ölçersiniz? Kızılötesi analizörün ve helyumun ölçüme ayrı ayrı katkısını açıklayın.</b> [[K6 s. 185–186]]</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Fick ilişkisini yazın ve doğrudan ölçülemeyen alan ile kalınlığın <i>D</i><sub>L</sub> içinde toplandığını açıklayın. [[K6 s. 181]] [[K6 s. 185]]</li>
<li>Maksimum ekspirasyondan sonra yaklaşık %0,3 CO ve %10 He içeren karışımdan vital kapasite kadar solutun. [[K6 s. 185–186]]</li>
<li>On saniye soluk tutturun, ilk 0,75 L ile ölü boşluğu yıkadıktan sonra gaz örneğini alın. [[K6 s. 186]]</li>
<li>İnspire ve ekspire CO farkından alımı, kızılötesi analizörle ekspirasyon sonu CO basıncını belirleyin. [[K6 s. 185–186]] Kapiller CO basıncı ihmal edildiğinde kapasite, CO aktarım hızının alveoler CO basıncına bölümüdür. [[K6 s. 185]]</li>
<li>He seyreltmesinden alveol hacmini hesaplayın, hemoglobin düzeltmesini ve alveol hacmine göre normalizasyonu açıklayın. [[K6 s. 186]]</li></ol>
<div class="note"><b>Çizin.</b> Yatay eksene soluk evrelerini yerleştirin, maksimum ekspirasyon, test gazı inspirasyonu, 10 saniyelik tutma ve örnekleme sırasını çizin. [[K6 s. 185–186]] İlk 0,75 L’yi örneğin alındığı bölümden ayırın. [[K6 s. 186]]</div>
<h3>Olası ek sorular</h3><ul><li>Fibrozan alveolit ile lobektomi Fick denkleminin hangi farklı terimlerini değiştirir? [[K6 s. 182–183]]</li><li>Helyum neden CO yerine aktarım belirteci olarak kullanılmaz? [[K6 s. 182]] [[K6 s. 185–186]]</li><li>Bir ozmometre aşırı soğutulmuş numunenin hangi sıcaklığını kaydeder? [[K6 s. 193]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="fk10-ozet">
<h2>Özet</h2><ul class="ozet">
<li>Fick denkleminde alan ve basınç farkı aktarımı artırır, kalınlık azaltır. [[K6 s. 181]] Sıvıya geçen gaz için çözünürlük ve molekül ağırlığı da hesaba katılır. [[K6 s. 182]]</li>
<li>Tek soluk testinde CO kaybı gaz aktarımını, He seyreltmesi alveol hacmini verir. [[K6 s. 185–186]]</li>
<li>Ozmozda net çözücü hareketini durduran basınç ozmotik basınçtır. [[K6 s. 186]]</li>
<li>Henry yasası çözünmüş miktarı kısmi basınca bağlar, dağılım katsayısı iki fazdaki denge derişimlerini karşılaştırır. [[K6 s. 188]] [[K6 s. 190–191]]</li>
<li>Yağ/gaz katsayısı potensle, kan/gaz katsayısı ise etki başlangıcı ve sonlanmasıyla ilişkilidir. [[K6 s. 190–192]]</li>
<li>Uçucu olmayan tanecikler buhar basıncını ve donma noktasını düşürür, kaynama noktasını yükseltir. [[K6 s. 192–193]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="10"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/09b">← Boyle, Charles ve Gay-Lussac yasaları; birleşik ve evrensel gaz yasası</a><a href="#/dersler/fizik/11a">Sonraki: Solunum gazı izlemi, kızılötesi spektroskopi ve kapnografi →</a></nav>
</section>`,
};
