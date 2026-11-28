VERI.sorular = VERI.sorular || {};
VERI.sorular['fk06b-1'] = {
  no: 1, kok: 'Manşonla basınç ölçümü', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 112–115]]',
  onermeler: [
    { t: 'Ortalama arter basıncı, sistolik ve diyastolik basınçların aritmetik ortalamasıdır.', d: false, n: 'Her basıncın çevrim içinde sürdüğü zaman hesaba katılır. [[K6 s. 112]]' },
    { t: 'İlk tekrarlayan vuru sesi, brakiyal arterden kısa sürelerle kan geçmeye başladığını gösterir.', d: true, n: 'Manşon basıncı sistolik basıncın hemen altına indiğinde kesikli akım başlar. [[K6 s. 113]]' },
    { t: 'Osilometrede en büyük salınım diyastolik basınca karşılık gelir.', d: false, n: 'En büyük genlik, manşon basıncı ortalama arter basıncına eşitken görülür. [[K6 s. 114]]' },
    { t: 'Atriyal fibrilasyon manşonla ölçülen değeri bozabilir.', d: true, n: 'Ritim düzensizliği ölçümün güvenilirliğini azaltabilir. [[K6 s. 114]]' },
    { t: 'Periferik kan akımı bozulduğunda Peñáz ölçümünün doğruluğu artar.', d: false, n: 'Periferik dolaşımın bozulması parmak ölçümünün doğruluğunu azaltır. [[K6 s. 115]]' },
  ],
};
VERI.sorular['fk06b-2'] = {
  no: 2, kok: 'Arter hattı ve transdüser', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 116–118]]',
  onermeler: [
    { t: 'Membrana bağlı dört gerinim ölçer bir Wheatstone köprüsü oluşturabilir.', d: true, n: 'Bu direnç ağı küçük basınç değişimlerinin algılanmasını sağlar. [[K6 s. 116]]' },
    { t: 'Yıkama sıvısı normal ölçüm sırasında kateter ucundan dışarı akar.', d: true, n: 'Saatte 3–5 mL sürekli akış, uçta pıhtı oluşmasını önlemeye yöneliktir. [[K6 s. 116]]' },
    { t: 'Yalnız transdüserin yüksekliğini değiştirmek elektronik sıfırlamayı zorunlu kılar.', d: false, n: 'Oda içindeki yükseklik farkının atmosfer basıncına etkisi ihmal edilebilir. [[K6 s. 118]]' },
    { t: 'Silikon jel elektriksel yalıtım sağlarken basıncı çipe iletir.', d: true, n: 'Esnek jel basıncı sıvıdan çipe aktarır ve elektrik bağlantısını salinden ayırır. [[K6 s. 116]]' },
    { t: 'Elektronik sıfırlama sırasında sensör hastanın arter basıncına açık tutulur.', d: false, n: 'Sensör sıvı üzerinden atmosfere açılır ve sıfırlamadan sonra yeniden hastaya bağlanır. [[K6 s. 117–118]]' },
  ],
};
VERI.sorular['fk06b-3'] = {
  no: 3, kok: 'Arter dalgasının dinamik yanıtı', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 118–119]]',
  onermeler: [
    { t: 'Aşırı sönüm sistolik basıncı yüksek gösterir.', d: false, n: 'Yavaş yanıt tepeyi bastırır ve sistolik basıncı düşük gösterir. [[K6 s. 119]]' },
    { t: 'Kateterdeki hava kabarcığı basınç değişiminin bir bölümünü soğurabilir.', d: true, n: 'Sıkışabilen hava dalgayı düzleştirip sönümü artırabilir. [[K6 s. 119]]' },
    { t: 'Diyafram kendi doğal frekansında salınma eğilimindedir.', d: true, n: 'Diyaframın kütlesi ve esnekliği yay ucundaki kütleye benzer bir yanıt oluşturur. [[K6 s. 118]]' },
    { t: 'Yetersiz sönüm diyastolik basıncın düşük okunmasına yol açabilir.', d: true, n: 'Gerçek dalgaya eklenen salınımlar tepeyi yükseltip en düşük değeri aşağı çekebilir. [[K6 s. 119]]' },
    { t: 'Kateterin uzaması sıvının akış direncini ve ataletini artırır.', d: true, n: 'Kitap her ikisinin de kateter uzunluğuyla orantılı olduğunu belirtir. [[K6 s. 119]]' },
  ],
};

const FK06B_NAV = [
  ['dalga','Arter dalgası'], ['dinle','Oskültasyon'], ['osil','Osilometri'], ['parmak','Peñáz'],
  ['hat','Arter hattı'], ['sifir','Sıfırlama'], ['sonum','Sönüm'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet'],
];
// Şekil kurulana kadar aynı açıklamalar metin olarak okunabilir.
const FK06B_OKUMA = {
  dalga: [
    'Sistolik tepe ile diyastolik dip arasındaki düşey fark nabız basıncını verir. [[K6 s. 112]]',
    'Kesikli çizgi, bu çevrim boyunca basıncın zaman ortalamasını gösterir. [[K6 s. 112]]',
    'Vurgulanan çıkışın eğiminden miyokardın kasılma gücü tahmin edilebilir. [[K6 s. 112]]',
    'Bir çevrimde dalganın altında kalan alandan atım hacmi indeksi tahmin edilebilir. [[K6 s. 112]]',
  ],
  manson: [
    'Manşon basıncını değiştiren iki parçayı ve basıncı gösteren ibreyi bulun. [[K6 s. 113]]',
    'Üst kola sarılan manşon brakiyal artere dışarıdan basınç uygular. [[K6 s. 113]]',
    'Manşon içi basınç mekanik Bourdon göstergesiyle veya sıvı sütunlu manometreyle okunabilir. [[K6 s. 113]]',
    'Puar manşon basıncını artırır. [[K6 s. 113]]',
    'Valften hava boşaltılması manşon basıncını düşürür. [[K6 s. 113]]',
  ],
  ses: [
    'İlk ses, sistolik basıncın hemen altında başlayan kesikli akıma karşılık gelir. [[K6 s. 113]]',
    'Düşük kan akımıyla yumuşak bir hışırtı duyulur. [[K6 s. 113]]',
    'Akım arttıkça ses keskinleşir. [[K6 s. 113]]',
    'Diyastolik basıncın yaklaşık 10 mmHg üzerinde tok veya üfleyici ses duyulur. [[K6 s. 113]]',
    'Manşon basıncı diyastolik basıncın altındayken laminer akım geri döner ve ses kaybolur. [[K6 s. 113]]',
  ],
  osil: [
    'Sistolik basıncın üstünde manşon arteri kapatır. [[K6 s. 113–114]]',
    'Manşon basıncı sistolik değerin altına inince küçük salınımlar başlar. [[K6 s. 114]]',
    'En büyük salınımların görüldüğü manşon basıncı OAB’ye karşılık gelir. [[K6 s. 114]]',
    'Diyastolik düzeyde salınımlar hâlâ görülebilir. [[K6 s. 114]]',
  ],
  parmak: [
    'Işık kaynağından parmağın karşı yüzündeki dedektöre uzanan yolu izleyin. [[K6 s. 115]]',
    'Küçük manşon parmağa sarılır ve pompayla şişirilir. [[K6 s. 115]]',
    'Manşon içindeki diyot kızılötesi ışık yayar. [[K6 s. 115]]',
    'Arter kan hacmi arttığında soğurma artar ve dedektöre ulaşan ışık azalır. [[K6 s. 115]]',
  ],
  geri: [
    'Arterde kan hacmi artınca ışığın daha büyük bölümü soğurulur, fotodedektör daha az ışık algılar. [[K6 s. 115]]',
    'Başlangıçta pompa manşonu şişirirken mikroişlemci optik nabız sinyalinin en büyük olduğu düzeyi saptar. [[K6 s. 115]]',
    'Ölçüm sürerken hızlı geri besleme, manşonun basıncını değiştirerek arterdeki kan hacmini sabit tutar. [[K6 s. 115]]',
  ],
  transduser: [
    'Torba tarafındaki sıvı hattından başlayıp yıkama kolunu, sensörü ve hasta tarafındaki musluğu bulun. [[K6 s. 116–117]]',
    'Torbadaki salin saydam hattan geçerek sensöre gelir. [[K6 s. 116]]',
    'Kol çekilince valf açılır ve kateter salin veya heparinli salin bolusuyla yıkanabilir. [[K6 s. 116–117]]',
    'Saydam plastik, sıvı yolundaki hava kabarcıklarının fark edilmesini sağlar. [[K6 s. 116]]',
    'Esnek silikon jel basıncı çipe aktarırken elektrik bağlantısını salinden ayırır. [[K6 s. 116]]',
    'Transdüser ile kateter arasındaki bu musluktan arter kanı örneği alınabilir. [[K6 s. 116]]',
    'Sürekli yıkamada sıvı kateter ucundan saatte 3–5 mL hızla çıkar. [[K6 s. 116]]',
  ],
  kopru: [
    'Membrana bağlı dört gerinim ölçer köprünün dört direnç kolunu oluşturur. [[K6 s. 116]]',
    'Basınç artışı membranı saptırır ve köprünün çıkış gerilimi değişir. [[K6 s. 116–118]]',
  ],
  sifir: [
    'Çip ile oda havası arasında yalnız sıvı kalacak şekilde hasta yolu kapatılır. [[K6 s. 117–118]]',
    'Monitör, atmosfere açık sensörün sinyalini bağıl basıncın sıfırı olarak kaydeder. [[K6 s. 117–118]]',
    'Musluk hasta yoluna döndürülür ve sensör yeniden arter basıncını algılar. [[K6 s. 116–117]]',
  ],
  sonum: [
    'Kitabın tasarım hedefinde sistem, arter dalgasını monitöre aslına yakın aktarır. [[K6 s. 119]]',
    'Ek salınımlar sistolik tepeyi yükseltebilir ve diyastolik dibi düşürebilir. [[K6 s. 119]]',
    'Yavaş yanıt tepeyi bastırır, dibi yükseltir ve dalgayı düzleştirir. [[K6 s. 119]]',
  ],
};
const fk06bSekil = (ad, baslik, alt = '') => `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="fk06b_${ad}">${(FK06B_OKUMA[ad] || []).map(metin => '<p>'+metin+'</p>').join('')}</div><p class="viz-cap" aria-live="polite"></p>${alt ? '<p class="viz-foot">'+alt+'</p>' : ''}</div>`;
SAYFALAR['dersler/fizik/06b'] = {
  grup: 'dersler', eyebrow: 'Fizik · Bölüm 6 · Ders 06b', baslik: 'Kan basıncı: noninvaziv ve invaziv ölçüm',
  lede: 'Manşonu boşaltırken hangi işaret sistolü, hangisi ortalama basıncı gösterir? Arter kanülüne geçtiğinizde monitördeki dalganın biçimine ne kadar güvenebilirsiniz?',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${FK06B_NAV.map(([id,ad],i)=>`<button type="button" data-scroll="fk06b-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="fk06b-dalga">
<h2>Arter dalgasından ne okunur?</h2>
<p class="intro">Ventrikül miyokardının aralıklı kasılması, kanı dolaşım boyunca ilerleten basıncı oluşturur. [[K6 s. 112]]</p>
${fk06bSekil('dalga','Bir kalp çevrimini okuyun','Dalga şematiktir ve hastadan hastaya biçim değiştirebilir. [[K6 s. 112]]')}
<ul><li><b>Basınç.</b> Dalganın tepe ve dip değerlerinden sistolik ve diyastolik basınçlar, aralarındaki farktan nabız basıncı bulunur. [[K6 s. 112]]</li>
<li><b>Zaman.</b> Ortalama arter basıncı (OAB), bir kalp çevrimi boyunca basıncın zaman ortalamasıdır. [[K6 s. 112]] Diyastol daha uzun sürdüğünden OAB genellikle diyastolik basınca biraz daha yakındır. [[K6 s. 112]]</li>
<li><b>Kalp işlevi.</b> Arter kaydı kalp hızını ve dalgaların biçim ve büyüklüğünden anlaşılabilen bazı aritmileri gösterir. [[K6 s. 112]] Yükselişin eğimi miyokardın kasılma gücünü, eğri altındaki alan ise atım hacmi indeksini tahmin etmeye yardım eder. [[K6 s. 112]]</li>
<li><b>Birim.</b> Kan basıncı genellikle mmHg ile ölçülürken santral venöz basınç bazen geleneksel olarak cmH₂O ile bildirilir. [[K6 s. 113]]</li></ul></section>

<section class="wrap blk ders-sec" id="fk06b-dinle"><h2>Oskültasyon ve Korotkoff sesleri</h2>
<p class="intro">Üst koldaki manşonun basıncı sistolik basıncı aştığında brakiyal arter kapanır ve kan akışı kesilir. [[K6 s. 113]]</p>
${fk06bSekil('manson','Manuel sfigmomanometrenin parçaları')}
<p>Manşonu boşaltırken antekübital fossa üzerinde stetoskopla dinleyin. [[K6 s. 113]] Sol ventrikülün oluşturduğu basınç manşonunkini aşınca kan kısa atımlar halinde geçer ve kesilip başlayan türbülanslı akış ses verir. [[K6 s. 113]] Rus hekim Nicolai Korotkoff bu sesleri beş evreye ayırmıştır. [[K6 s. 113]]</p>
${fk06bSekil('ses','Manşon boşalırken beş evre','Damar açıklığı ve akış yolları şematiktir. [[K6 s. 113]]')}
<ol><li><b>Belirgin, tekrarlayan vuru.</b> İlk kısa akım atımları sistolik basıncı işaretler. [[K6 s. 113]]</li>
<li><b>Yumuşak hışırtı.</b> Kan akımı henüz düşüktür. [[K6 s. 113]]</li>
<li><b>Net, keskin ses.</b> Kan akımı artmıştır. [[K6 s. 113]]</li>
<li><b>Tok vuru veya üfleme.</b> Yaklaşık olarak diyastolik basıncın 10 mmHg üzerinde duyulur. [[K6 s. 113]]</li>
<li><b>Sessizlik.</b> Manşon basıncı diyastolik basıncın altına inince kararlı laminer akış geri döner. [[K6 s. 113]]</li></ol>
<h3>Ölçüm beklenmedik çıktığında</h3>
<ul><li><b>Manşon seçimi.</b> Kitap manşonun kol çapından biraz büyük olmasını, standart erişkin boyunun 25–35 cm kol çevresine uyduğunu ve başka boyların bulunduğunu belirtir. [[K6 s. 113–114]]</li>
<li><b>Ritim ve dış bası.</b> Uç değerlerde okuma daha az güvenilirdir. [[K6 s. 114]] Atriyal fibrilasyon, ekipmanın manşona bastırması veya cerrahın şişen manşona yaslanması sonucu bozabilir. [[K6 s. 114]]</li>
<li><b>Yükseklik.</b> Brakiyal arter, sfigmomanometre ve kalp aynı yatay düzeyde olmalıdır. [[K6 s. 114]] Arterdeki hidrostatik basınç ölçüm düzeyiyle değiştiğinden seviyeler arasındaki fark hem sistolik hem diyastolik okumaya yansır. [[K6 s. 114]]</li>
<li><b>Hasta güvenliği.</b> Şişirme ve boşaltmaya bağlı zarar nadirdir ancak morarma, peteşiyal kanama ve ulnar sinir felci bildirilmiştir. [[K6 s. 114]]</li></ul>
<div class="card"><h3>Kitabın örneği · Kalp düzeyinden baş düzeyine</h3><p>Kalp düzeyindeki sistolik okumaya <i>S</i>, diyastolik okumaya <i>D</i> diyelim ve her ikisini mmHg cinsinden yazalım. [[K6 s. 114]] Kitaptaki yükseklik farkında baş düzeyindeki okumalar yaklaşık <i>S</i> − 35 mmHg ve <i>D</i> − 35 mmHg olur. [[K6 s. 114]] Buradaki 35 mmHg, örnekteki iki konum arasındaki hidrostatik farkı gösterir. [[K6 s. 114]]</p></div>
<div class="note plain"><b>Atlas notu.</b> Kitap büyük manşonun yüksek, küçük manşonun düşük değer verebileceğini söyler. [[K6 s. 114]] Doğrusu, gereğinden küçük manşonun basıncı yüksek, büyük manşonun düşük gösterebilmesidir. [[K6 s. 114]]</div></section>

<section class="wrap blk ders-sec" id="fk06b-osil"><h2>Osilometri ile aralıklı ölçüm</h2>
<p class="intro">Osilometre, özellikle ekstremite arterlerinde nabızla oluşan salınımların değişimini ölçer ve noninvaziv kan basıncı cihazlarının çoğu bu ilkeye dayanır. [[K6 s. 114]]</p>
${fk06bSekil('osil','Manşon boşalırken salınım genliğini izleyin','Çizim, manşon basıncına binen küçük salınımları görünür kılmak için şematik olarak büyütür. [[K6 s. 114]]')}
<ul><li><b>İki manşondan tek manşona.</b> Von Recklinghausen’ın 1931’de tanımladığı osilotonometrede proksimal manşon arteri kapatırdı. [[K6 s. 114]] Distal manşona bağlı duyarlı göstergenin ibresinden proksimal manşon altındaki pulsatil akımın salınımları izlenebilirdi. [[K6 s. 114]] Modern elektronik cihaz tek manşonla hem oklüzyon hem ölçüm yapar ve sabit aralıklara ayarlanabilir. [[K6 s. 114]]</li>
<li><b>Ölçüm döngüsü.</b> Mikroişlemci hava pompasıyla manşonu şişirir, tahliye valfi manşonu yavaşça boşaltır. [[K6 s. 114]] Sensör aynı anda manşon basıncını ve bu basınca eklenen salınımları algılar. [[K6 s. 114]]</li>
<li><b>Üç işaret.</b> Salınımlar sistolik basıncın hemen altında başlar, OAB düzeyinde en büyük genliğe ulaşır ve tam diyastolik basınçta kaybolmaz. [[K6 s. 114]] Kitap diyastolik basıncın hesaplandığını, sonucun monitörün ön yüzündeki sayısal ekranda gösterildiğini belirtir. [[K6 s. 114]]</li>
<li><b>Zaman ve doğruluk sınırı.</b> Her ölçüm zaman aldığından izlem kesintilidir ve çoğu monitör 30 saniyede birden sık ölçemez. [[K6 s. 114–115]] Manşon kaynaklı hatalar burada da geçerlidir ve doğruluk arter kateteriyle yapılan invaziv ölçümden düşüktür. [[K6 s. 115]]</li></ul>
<div class="card"><h3>Denklem 6.7 ile hesap</h3>
<p><b>OAB ≈ <i>D</i> + (<i>S</i> − <i>D</i>) / 3</b>, burada <i>S</i> sistolik, <i>D</i> diyastolik basınçtır ve üç basınç da mmHg cinsindendir. [[K6 s. 114]]</p>
<p>Nabız basıncını bulmak için diyastolik değeri sistolikten çıkarın, farkın üçte birini diyastolik basınca ekleyin. [[K6 s. 114]] Örneğin kaydırıcıda sistolik 125 ve diyastolik 75 mmHg seçildiğinde fark 50 mmHg, yaklaşık OAB ise 75 + 50/3 ≈ 91,7 mmHg olur. [[K6 s. 112]] [[K6 s. 114]] OAB ve sistolik basınç biliniyorsa aynı yaklaşık bağıntı <i>D</i> ≈ (3 × OAB − <i>S</i>) / 2 biçiminde düzenlenebilir. [[K6 s. 114]]</p></div>
${fk06bSekil('baginti','Bir basıncı sabit tutup diğerini değiştirin','Kaydırıcı seçenekleri arter dalgası şeklinin mmHg eksen işaretlerinden alınmıştır ve doğru, denklem 6.7’den hesaplanır. [[K6 s. 112]] [[K6 s. 114]]')}
<div class="note plain"><b>Atlas notu.</b> Kitap diyastolik basıncın hesaplanmasında bir bağıntı verir. [[K6 s. 114]] Bu, yaklaşık bir OAB bağıntısıdır ve cihazların sistolik ve diyastolik basıncı tahmin etme yöntemi üreticiye göre değişebilir. [[K6 s. 114]]</div></section>

<section class="wrap blk ders-sec" id="fk06b-parmak"><h2>Peñáz tekniği ile parmakta sürekli izlem</h2>
<p class="intro">Finapres, ilkesi osilometriye benzeyen Peñáz hacim sabitleme yöntemiyle her kalp atımında veya en azından birkaç saniyede bir basınç bildirir. [[K6 s. 115]]</p>
${fk06bSekil('parmak','Parmak manşonunda ışığın yolu')}
${fk06bSekil('geri','Işık sinyalinden manşon basıncına geri besleme','Bir basamak seçin ve vurgulanan bağlantıyı izleyin. [[K6 s. 115]]')}
<ol><li><b>Hacmi algıla.</b> Küçük manşonun içindeki kızılötesi ışık kaynağı ve fotodedektör, basınç sensörünün yerini alır. [[K6 s. 115]] Arterlerde daha çok kan olduğunda daha fazla ışık soğurulur ve dedektöre daha az ışık ulaşır. [[K6 s. 115]]</li>
<li><b>Başlangıç düzeyini bul.</b> Mikroişlemci pompayla manşonu şişirirken fotopletismografik nabız sinyalini izler ve en büyük sinyalden ortalama arter basıncı düzeyini belirler. [[K6 s. 115]]</li>
<li><b>Hacmi sabitle.</b> Hızlı geri besleme, arterdeki kan hacmini sabit tutacak biçimde manşon basıncını değiştirir. [[K6 s. 115]]</li></ol>
<div class="note plain"><b>Atlas notu.</b> Kitap bu aşamada manşon basıncını yaklaşık OAB olarak tanımlar. [[K6 s. 115]] Doğrusu, hacim sabit tutulurken değişen manşon basıncının arter basınç dalgasını izlemesidir. [[K6 s. 115]]</div>
<p>Yöntem normal dolaşımda ve vazodilatasyonda doğru kabul edilirken hipotansiyon veya periferik akım bozukluğunda doğruluğu azalır. [[K6 s. 115]] Aynı hastada bile parmak manşonunun konumu veya sıkılığındaki küçük değişiklikler okumayı belirgin oynatabilir ve klinik kullanımı sınırlar. [[K6 s. 115]]</p></section>

<section class="wrap blk ders-sec" id="fk06b-hat"><h2>Arter hattı ve basınç transdüseri</h2>
<p class="intro">Arter kanülündeki basınç sıvı dolu kateterle dışarıdaki transdüsere iletilerek doğrudan ölçülür. [[K6 s. 116]] Damar içi transdüserler yüksek maliyet ve karmaşıklık nedeniyle artık seyrek kullanılır. [[K6 s. 116]]</p>
${fk06bSekil('transduser','Yıkama kolundan örnekleme musluğuna')}
<ul><li><b>Basıncın yolu.</b> Salin-heparinle dolu sistemde kanülden gelen basınç membranı hareket ettirir. [[K6 s. 116]] Membrana yapıştırılmış dört ince yarı iletken gerinim ölçer, küçük basınç değişikliklerini ölçebilen Wheatstone direnç köprüsünü oluşturur. [[K6 s. 116]]</li></ul>
${fk06bSekil('kopru','Membranın hareketi nasıl bir elektrik sinyaline dönüşür?','Membran hareketi ve direnç ağı şematiktir. [[K6 s. 116–118]]')}
<ul>
<li><b>Seviye.</b> Kateterde hidrostatik basınç etkisini azaltmak için transdüseri kanül düzeyine, kateteri de kalp düzeyine olabildiğince yakın yerleştirin. [[K6 s. 116]]</li>
<li><b>Yıkama ve örnekleme.</b> Torbadaki salin veya heparinli salin saydam hattan sensörü geçerek saatte 3–5 mL hızla kateter ucundan çıkar ve uçta pıhtılaşmayı önler. [[K6 s. 116]] Transdüser ile kateter arasındaki üç yollu musluktan arter kanı alınabilir. [[K6 s. 116]] Örnek alındıktan sonra kolu çekmek yıkama valfini açar ve hızlı bir sıvı bolusu verilmesini sağlar. [[K6 s. 116–117]]</li>
<li><b>Görsel ve elektriksel güvenlik.</b> Saydam plastik gövde hava kabarcıklarını görmeyi kolaylaştırır. [[K6 s. 116]] Esnek silikon elastomer jel, sıvının basıncını silisyum çipe aktarırken elektrik bağlantısını salinden yalıtır. [[K6 s. 116]] Böylece hastayı sensörden gelebilecek elektrik çarpmasına, çipi de defibrilasyonun yüksek akımına karşı korur. [[K6 s. 116]]</li>
<li><b>Tek kullanım.</b> Transdüser ve kateter kırılgandır ve arıza oranları yüksektir. [[K6 s. 116]] Tek kullanımlık üretilmeleri hastalar arasında bu araçlarla çapraz bulaş riskini de ortadan kaldırır. [[K6 s. 116]]</li></ul></section>

<section class="wrap blk ders-sec" id="fk06b-sifir"><h2>Seviyeleme ve elektronik sıfırlama</h2>
<p class="intro">Kan basıncı bir bağıl basınçtır ve vücuttaki diğer basınçlar gibi atmosfer basıncına göre ölçülür. [[K6 s. 118]]</p>
${fk06bSekil('sifir','Musluğun hangi yolu açık?')}
<p>Sensörler aynı basınç artışına köprü geriliminde benzer bir artış verecek biçimde üretilir ancak sıfır basınçtaki dirençleri belirgin farklı olabilir. [[K6 s. 117]] Bu yüzden kullanmadan önce her sensörün sıfırını belirlemek gerekir. [[K6 s. 117]]</p>
<ol><li>Çipin yanındaki musluğu atmosfere açın ve hasta yolunu kapatın: çip ile oda havası arasında yalnız sıvı kalır. [[K6 s. 117–118]]</li>
<li>Monitörün sıfırlama kumandasını etkinleştirerek o anda algılanan atmosfer basıncını bağıl basıncın sıfırı olarak kaydedin. [[K6 s. 117–118]]</li>
<li>Musluğu yeniden hastaya açın. [[K6 s. 117]]</li></ol>
<p>Transdüserin yüksekliği değiştiğinde sıvı sütununun hidrostatik etkisi için kanül düzeyini yeniden dikkate alın. [[K6 s. 116]] Atmosfer basıncı rakımla yavaş azalır ve bir servis ya da ameliyathanede zeminle tavan arasındaki fark ihmal edilebilir. [[K6 s. 118]] Dolayısıyla yalnız bu yükseklik değişikliği elektronik sıfırlamayı yinelemeyi gerektirmez. [[K6 s. 118]]</p></section>

<section class="wrap blk ders-sec" id="fk06b-sonum"><h2>Dalga biçimi neden bozulur?</h2>
<p class="intro">Arterdeki basınç değişimi kateterdeki salini hafifçe hareket ettirir, sıvı da sensör diyaframını oynatır. [[K6 s. 118]] Kütlesi ve esnekliği olan diyafram, yay ucundaki bir kütle gibi doğal frekansında salınmaya eğilimlidir. [[K6 s. 118]]</p>
${fk06bSekil('sonum','Aynı arter dalgasını üç sistemle ölçün','Kesikli çizgi arterdeki basıncı, renkli çizgi sensörün yanıtını şematik olarak gösterir. [[K6 s. 118–119]]')}
<p>Sıvının akış direnci ve ataleti salınımı bir ölçüde sönümler. [[K6 s. 118]] Kateter ve sensörün fiziksel özellikleri yüzünden kaydedilen basınç, çevrimin her anında gerçek arter basıncına uymayabilir. [[K6 s. 118]]</p>
<ul><li><b>Yetersiz sönüm.</b> Diyaframın yüksek frekanslı salınımları dalganın üzerine biner. [[K6 s. 119]] Sistolik basınç yüksek, diyastolik basınç düşük okunabilirken ortalama basınç daha az etkilenir. [[K6 s. 119]]</li>
<li><b>Aşırı sönüm.</b> Yavaş yanıt dalgayı düzleştirip genliğini azaltır. [[K6 s. 119]] Sistolik basıncın düşük, diyastolik basıncın yüksek okunması ciddi klinik hataya yol açabilir. [[K6 s. 119]]</li>
<li><b>Hatta ne aranır?</b> Fazla uzun kateterde salinin direnci ve ataleti uzunlukla orantılı artar, fazla ince kateterde akış direnci yükselir. [[K6 s. 119]] Sıkışabilen bir hava kabarcığı basınç değişiminin bir kısmını soğurup iletimi azaltabilir ve sönümü belirgin artırabilir. [[K6 s. 119]]</li>
<li><b>Tasarım hedefi.</b> Klinik ölçüm ve fizyolojik araştırmada dalgayı doğru kaydetmek önemlidir. [[K6 s. 118]] Kitap, kateter ve transdüserin dalgayı monitörde aslına en yakın biçimde göstermek üzere kritik sönümlü tasarlandığını belirtir. [[K6 s. 119]]</li></ul></section>

<section class="wrap blk ders-sec" id="fk06b-p1"><h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="fk06b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk06b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk06b-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk06b-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Ameliyatta osilometrik manşondan arter hattına geçtiniz. Arter trasesinin tepesi basık, sistolik değer beklediğinizden düşük. Hangi fiziksel etkenleri ve ölçüm basamaklarını kontrol edersiniz?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet"><li>Manşonda salınımların en büyük olduğu basınç OAB’yi verir ve ölçüm aralıklıdır. [[K6 s. 114–115]]</li>
<li>Kanülden membrana uzanan sıvı yolunu ve transdüserin kanül ve kalple düzey ilişkisini tarif edin. [[K6 s. 116]]</li>
<li>Çipi sıvı üzerinden atmosfere açıp monitörü sıfırlayın, sonra hasta yolunu açın. [[K6 s. 117–118]]</li>
<li>Basık tepe ve daralmış nabız basıncı aşırı sönümü düşündürür. [[K6 s. 119]] Hava kabarcığını, kateterin uzunluğunu ve inceliğini değerlendirin. [[K6 s. 119]]</li></ol>
<div class="note"><b>Çizin.</b> Aynı zaman ekseninde gerçek dalgayı, aşırı sönümle düzleşen dalgayı ve yetersiz sönümle üzerine salınımlar binen dalgayı çizin. [[K6 s. 119]]</div>
<div class="note plain"><b>Ek sorular.</b> Örnekleme musluğu nerede bulunur? [[K6 s. 116]] Yalnız transdüserin yüksekliğini değiştirmek neden elektronik sıfırı değiştirmez? [[K6 s. 118]] Hangi sönüm kusurunda sistolik değer yüksek okunabilir? [[K6 s. 119]]</div></section>
<section class="wrap blk ders-sec" id="fk06b-ozet"><h2>Özet</h2><ul class="ozet">
<li>İlk Korotkoff sesi sistolik, sesin kaybolması diyastolik basıncı işaretler. [[K6 s. 113]]</li>
<li>Osilometrede en büyük genlik OAB’yi gösterir, Peñáz yönteminde hızlı geri besleme parmak arterindeki kan hacmini sabit tutar. [[K6 s. 114–115]]</li>
<li>Arter hattında atmosfer elektronik sıfırı belirler, kanül ve transdüser arasındaki düzey farkı hidrostatik hataya neden olabilir. [[K6 s. 116–118]]</li>
<li>Yetersiz sönüm dalgayı sivriltirken aşırı sönüm tepeyle dip arasındaki farkı küçültür. [[K6 s. 119]]</li></ul>
<p>Önceki dersteki ölçüm araçları da aynı referans kavramına dayanır: bağıl basınç, mutlak basınçtan referans basıncının çıkarılmasıyla bulunur. [[K6 s. 119]] Manometre ve Bourdon göstergesi bağıl basıncı ölçebilir, barometre ise atmosfer basıncına özgü bir manometredir. [[K6 s. 120]] Basınç düzenleme valfleri çeşitli uygulamalar için yay yüklü diyaframlarla yapılır. [[K6 s. 120]]</p>
<div data-viz="tamam" data-modul="fizik" data-bolum="06b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/06a">← Mutlak ve bağıl basınç, manometreler, basınç valfleri ve sifon etkisi</a><a href="#/dersler/fizik/07">Sonraki: Nem, nemlendirme ve nebülizörler →</a></nav></section>`,
};
