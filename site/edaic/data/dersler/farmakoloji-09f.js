VERI.sorular = VERI.sorular || {};
VERI.sorular['far09f-1'] = {
  no: 1, kok: 'Ksenon ve oksijen', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 133–135]]',
  onermeler: [
    { t: 'Ksenonun etkisi desflurandan daha yavaş sonlanır.', d: false, n: 'Ksenonun kan:gaz partisyon katsayısı 0,14’tür ve etkisi desflurandan daha hızlı sonlanır. [[K3 s. 133]]' },
    { t: 'Ksenon solunum sıklığını azaltırken tidal hacmi artırır.', d: true, n: 'Bu iki değişim dakika hacmini sabit tutar. [[K3 s. 134]]' },
    { t: 'Ksenon vücuttan atılmadan önce metabolize edilir.', d: false, n: 'Ksenon metabolize edilmeden akciğerlerden atılır. [[K3 s. 134]]' },
    { t: 'Oksijen konsantratöründeki zeolit azotu adsorbe eder.', d: true, n: 'Azot tutulunca geriye yaklaşık %97 O₂ içeren gaz kalır. [[K3 s. 134]]' },
    { t: 'Uzun süre %100 oksijen verilmesi koroner arterleri genişletir.', d: false, n: 'Uzun süre %100 O₂ koroner vazokonstriksiyona yol açar ve kardiyak debiyi hafifçe düşürür. [[K3 s. 135]]' }
  ]
};
VERI.sorular['far09f-2'] = {
  no: 2, kok: 'Nitrik oksidin sentezi ve etkileri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 135–136]]',
  onermeler: [
    { t: 'Konstitütif NOS, Ca²⁺/kalmoduline bağımlıdır.', d: true, n: 'Endotel ve nöronlar dahil çeşitli dokularda bulunan konstitütif form Ca²⁺/kalmoduline bağımlıdır. [[K3 s. 135]]' },
    { t: 'Endotel kaynaklı nitrik oksit trombosit agregasyonunu kolaylaştırır.', d: false, n: 'Endotel kaynaklı NO trombosit agregasyonunu inhibe eder. [[K3 s. 135]]' },
    { t: 'İnhale NO eritrositlerde hızla inaktive edilir.', d: true, n: 'Hızlı inaktivasyon inhale NO’nun sistemik dolaşımda etki göstermemesini açıklar. [[K3 s. 136]]' },
    { t: 'İnhale NO, ARDS’deki etkisini bronkodilatasyonla gösterir.', d: false, n: 'NO bronkodilatasyon yapmaz, ancak ARDS’de ventilasyon/perfüzyon uyumsuzluğunu azaltabilir. [[K3 s. 136]]' },
    { t: 'L-NMMA, NOS’yi inhibe eden bir L-arjinin analoğudur.', d: true, n: 'L-NMMA’nın guanidino grubu değişmiştir ve bu analog NOS’yi antagonize eder. [[K3 s. 136]]' }
  ]
};
VERI.sorular['far09f-3'] = {
  no: 3, kok: 'Helyum, karbondioksit ve absorbanlar', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 137]]',
  onermeler: [
    { t: 'Heliox’un özgül ağırlığı saf helyumunkinden düşüktür.', d: false, n: 'Heliox için 0,337 olan özgül ağırlık saf helyumda 0,178’dir. [[K3 s. 137]]' },
    { t: 'Helyum/oksijen karışımları derin dalışta azot narkozundan kaçınmak için kullanılır.', d: true, n: 'Derin dalışta solunan karışımda helyum kullanmanın amacı azot narkozunu önlemektir. [[K3 s. 137]]' },
    { t: 'Karbondioksit kriyoterapide kullanılabilir.', d: true, n: 'CO₂’nin kullanım alanları arasında kriyoterapi ve laparoskopik insuflasyon vardır. [[K3 s. 137]]' },
    { t: 'PaCO₂’nin 10 kPa’yı aşması solunumu baskılayabilir.', d: true, n: 'Bu düzeyin üzerinde solunum depresyonu ve narkoz gelişebilir. [[K3 s. 137]]' },
    { t: 'Soda lime reaksiyonunun son basamağında NaOH yeniden oluşur.', d: true, n: 'Sodyum karbonat ile kalsiyum hidroksitten kalsiyum karbonat ve NaOH oluşur. [[K3 s. 137]]' }
  ]
};

const A09F_NAV = [
  ['xe', 'Ksenon'], ['o2', 'Oksijen'], ['no', 'Nitrik oksit'], ['he', 'Helyum'],
  ['co2', 'Karbondioksit'], ['absorban', 'Absorbanlar'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet']
];
const A09F_SEKIL = (ad, baslik, dip) => `<div class="viz a09f-sekil"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="${ad}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${dip}</p></div>`;

SAYFALAR['dersler/farmakoloji/09f'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 2 · Bölüm 9 · Ders 09f',
  baslik: 'Ksenon ve anestezik olmayan tıbbi gazlar',
  lede: 'Ksenonun anestezik etkisinin hızını kandaki düşük çözünürlüğü, Heliox’un dar hava yolundaki yararını ise düşük yoğunluğu açıklar. [[K3 s. 133]] [[K3 s. 137]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A09F_NAV.map(([id, ad]) => `<button type="button" data-scroll="a09f-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a09f-xe">
<h2>Ksenon</h2>
<p class="intro">Ksenonun kan:gaz partisyon katsayısı yalnız 0,14’tür. [[K3 s. 133]] Bu nedenle etkisi hem desflurandan hem de N₂O’dan daha hızlı başlar ve sonlanır. [[K3 s. 133]]</p>
${A09F_SEKIL('a09f_ksenon', 'Solunum yavaşlarken dakika hacmi nasıl korunur?', 'Şematik/nitel akım ve ventilasyon karşılaştırması. [[K3 s. 134]]')}
<ul class="ozet">
<li><b>Özellik ve üretim.</b> İnert, kokusuz ksenon atmosferin %0,0000087’sini oluşturur, mesleki veya çevresel tehlike taşımaz ve MAC değeri %71’dir. [[K3 s. 133]] Havanın fraksiyonel distilasyonuyla elde edilir, üretim maliyeti N₂O’nunkinin yaklaşık 2000 katıdır. [[K3 s. 134]]</li>
<li><b>Solunum ve dolaşım.</b> Diğer inhalasyon anesteziklerinden farklı olarak solunum yavaşlarken tidal hacim artar. [[K3 s. 134]] Yüksek konsantrasyonda bile N₂O’daki gibi difüzyon hipoksisine yol açıyor görünmez. [[K3 s. 134]] Miyokard kontraktilitesi değişmez, kalp hızı hafifçe azalabilir. [[K3 s. 134]]</li>
<li><b>Beyin ve analjezi.</b> Ksenon beyin BT görüntüsünü güçlendirmek, ¹³³Xe ise serebral kan akımını ölçmek için kullanılabilir. [[K3 s. 134]] İnsanlarda serebral akımı değişken ölçüde artırıyor göründüğünden nöroşirürji anestezisinde önerilmez. [[K3 s. 134]] Belirgin analjezi sağlar. [[K3 s. 134]]</li>
<li><b>Atılım.</b> Metabolize edilmeden akciğerlerden uzaklaştırılır. [[K3 s. 134]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="a09f-o2">
<h2>Oksijen</h2>
<p class="intro">Hipoksemiyi önlemek için verilen oksijen de diğer tedaviler gibi reçetelenmelidir. [[K3 s. 134]]</p>
${A09F_SEKIL('a09f_oksijen', 'Depolama yerini seçin', 'Şematik depo karşılaştırması. [[K3 s. 134]]')}
<p>O₂ havanın fraksiyonel distilasyonuyla üretilebilir. [[K3 s. 134]] Konsantratörde ise zeolit azotu adsorbe eder ve kalan gazın yaklaşık %97’si O₂ olur. [[K3 s. 134]] Kaynama noktası −182°C, kritik sıcaklık −119°C ve kritik basınç 50 bar’dır. [[K3 s. 134]]</p>
<div class="tbl-wrap a09f-tablo"><table class="tbl"><thead><tr><th>Ölçüm ortamı</th><th>Yöntem</th></tr></thead><tbody>
<tr><th>Gaz karışımı</th><td>Kütle spektrometresi, paramanyetik analizör veya yakıt hücresi [[K3 s. 135]]</td></tr>
<tr><th>Kanda çözünmüş O₂</th><td>Clarke elektrodu, transkutan elektrot veya nabız oksimetrisi [[K3 s. 135]]</td></tr>
<tr><th>İn vitro kan örneği</th><td>Masaüstü analiz veya ko-oksimetri [[K3 s. 135]]</td></tr></tbody></table></div>
<ul class="ozet">
<li><b>Dolaşım.</b> Hipoksemi düzeldiğinde tüm kardiyovasküler parametreler iyileşir. [[K3 s. 135]] Uzun süre %100 O₂, kardiyak debiyi doğrudan hafifçe azaltır ve koroner arterleri daraltır. [[K3 s. 135]] Pulmoner damar direnci ve pulmoner arter basıncı düşer. [[K3 s. 135]]</li>
<li><b>Ventilasyon.</b> Yüksek konsantrasyon sağlıklı kişide hafif solunum depresyonu yapar. [[K3 s. 135]] Solunumu gerçekten hipoksik dürtüye bağımlı hastada orta konsantrasyon bile ölümcül olabilir. [[K3 s. 135]]</li>
<li><b>Serbest radikal toksisitesi.</b> O₂ parsiyel basıncı 200 kPa’yı aşınca anksiyete, bulantı ve nöbet görülebilir. [[K3 s. 135]] Alveol–kapiller membranda lipit peroksidasyonu gelişir, akciğerin bazı bölgeleri kollabe olabilir. [[K3 s. 135]] Yenidoğanda gelişen retina damarlarının daralması retrolental fibroplaziye yol açabilir. [[K3 s. 135]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="a09f-no">
<h2>Nitrik oksit</h2>
<p class="intro">Nitrik oksit sentaz (NOS), L-arjininin uç guanidino grubundaki azotlardan birini kullanarak nitrik oksit (NO) üretir. [[K3 s. 135]]</p>
${A09F_SEKIL('a09f_no', 'Hangi NOS formu, hangi koşulda çalışır?', 'Şematik/nitel sentez karşılaştırması. [[K3 s. 135]]')}
<div class="note plain"><b>Atlas notu.</b> Kitap konstitütif NOS’un cGMP ile uyarıldığını yazar. Doğrusu, cGMP NOS’u uyarmaz; NO’nun çözünür guanilat siklazı uyararak oluşturduğu ikinci habercidir.</div>
<p>Eskiden endotel kaynaklı gevşetici faktör (EDRF) denen bu endojen molekül, nitrik asit üretiminin de yan ürünüdür ve nitröz oksit tüplerinde kirletici olarak bulunabilir. [[K3 s. 135]]</p>
<ul class="ozet">
<li><b>Damarlar.</b> Küçük arter ve arteriyollerde bazal genişlemeyi sürekli yerel NO üretimi sağlar. [[K3 s. 135]] Kayma geriliminin sentezi artırması akıma bağlı vazodilatasyonu açıklayabilir. [[K3 s. 135]] Endotelden salınan NO trombosit agregasyonunu engeller. [[K3 s. 135]]</li>
<li><b>İnflamasyon.</b> İndüksiyonla yüksek miktarda üretilen NO sitotoksik olabilir, oluşturduğu radikaller hücre hasarı ve kapiller kaçağa yol açabilir. [[K3 s. 135]] Septik şokta aşırı üretim hipotansiyona ve kapiller kaçağa neden olur. [[K3 s. 135]] Makrofaj ve nötrofil kaynaklı NO bazı patojenlere toksik olabilir ve konak savunmasında önemli rol oynayabilir. [[K3 s. 136]]</li>
<li><b>Akciğer.</b> Endojen NO pulmoner ve bronşiyal damarlarda bazal vazodilatasyon sağlar, hipoksi bu etkiyi tersine çevirebilir. [[K3 s. 136]] İnhale NO (40 ppm’ye kadar) ARDS’de ventilasyon/perfüzyon uyumsuzluğunu, yenidoğanda pulmoner hipertansiyonu azaltabilir. [[K3 s. 136]] Eritrositlerde hızla inaktive olduğundan sistemik dolaşımı etkilemez. [[K3 s. 136]] Hemoglobine afinitesi CO’nunkinin 1500 katıdır ve bronkodilatör etkisi yoktur. [[K3 s. 136]]</li>
<li><b>Sinir sistemi.</b> NO içeren sinirler merkezi sinir sistemine yayılmıştır. [[K3 s. 136]] Uyanıklık, ağrı algısı, programlanmış hücre ölümü ve önceki sinyallerin izini taşıyan uzun süreli nöronal depresyon ve eksitasyonda rol oynayabileceği düşünülür. [[K3 s. 136]] Periferde korpus kavernozumun bölgesel kan akımını düzenlerler. [[K3 s. 136]]</li>
<li><b>Farmakolojik etkiler.</b> Guanidino grubu değiştirilmiş L-arjinin analoğu N-monometil-L-arjinin (L-NMMA), NOS’yi inhibe eder. [[K3 s. 136]] Septik şokta kan basıncını yükseltmek için kullanılmıştır, ancak hastalığın seyrini değiştirmez ve sağkalıma etkisi gösterilmemiştir. [[K3 s. 136]] Sodyum nitroprussidin ve organik nitratların (ör. gliseril trinitrat) etkisi, düz kasta kendiliğinden NO salınmasına veya NO’ya metabolize olmalarına bağlıdır. [[K3 s. 136]]</li></ul>
<h3>Erişkin yoğun bakımda inhale NO · Birleşik Krallık, 1997</h3>
<p>Bu uygulama sınırları, hekimler ile Sağlık ve Sanayi Bakanlıklarının temsilcilerinden oluşan grubun 1997’de yayımladığı kılavuza aittir. [[K3 s. 136]]</p>
<div class="tbl-wrap a09f-tablo"><table class="tbl"><thead><tr><th>Başlık</th><th>1997 kılavuzundaki karşılığı</th></tr></thead><tbody>
<tr><th>Endikasyon</th><td>Sağ kalp yetersizliği veya ağır ARDS (optimal ventilasyona rağmen FiO₂ = 1 iken PaO₂ &lt; 12 kPa). [[K3 s. 136]]</td></tr>
<tr><th>Doz</th><td>En düşük etkili doz, en çok 40 ppm. [[K3 s. 136]]</td></tr>
<tr><th>Uygulama</th><td>Tercih inspiryumla senkron enjeksiyondur. [[K3 s. 136]] Sürekli sistemde gaz kalibre akımölçerle verilir. [[K3 s. 136]] Basınç düzenleyicileri ve bağlantılar paslanmaz çelikten olmalıdır. [[K3 s. 136]]</td></tr>
<tr><th>Gaz izlemi</th><td>Kemilüminesans veya elektrokimyasal analizörün doğruluğu 1 ppm’dir. [[K3 s. 136]]</td></tr>
<tr><th>Methemoglobin</th><td>Başlamadan önce, başladıktan sonra ve ardından her gün ölçülür. [[K3 s. 136]] Klinik açıdan önemli methemoglobinemi çok seyrektir, çocuklarda ve methemoglobin redüktaz eksikliğinde daha olasıdır. [[K3 s. 136]]</td></tr>
<tr><th>Ortam</th><td>8 saatlik zaman ağırlıklı ortalama en çok 25 ppm’dir. [[K3 s. 136]] İyi havalandırılan ünitede atık gaz uzaklaştırması gerekmez. [[K3 s. 136]]</td></tr>
<tr><th>Kontrendikasyonlar</th><td>Methemoglobinemi (kitabın parantez içinde sıraladıkları: kanama diyatezi, intrakraniyal kanama, ağır sol ventrikül yetersizliği). [[K3 s. 136]]</td></tr>
</tbody></table></div></section>

<section class="wrap blk ders-sec" id="a09f-he">
<h2>Helyum</h2>
<p class="intro">Heliox’un düşük yoğunluğu türbülanslı akımda hızı artırır. [[K3 s. 137]]</p>
${A09F_SEKIL('a09f_helyum', 'Oksijenle karışınca helyumun özgül ağırlığı nasıl değişir?', 'Çubuk uzunluğu özgül ağırlıkla orantılıdır. [[K3 s. 137]]')}
<ul class="ozet">
<li><b>Sunum.</b> Helyum inerttir ve yanmayı desteklemez. [[K3 s. 137]] %100 He kahverengi tüpte 137 bar’da, Heliox (%79 He, %21 O₂) beyaz omuzlu kahverengi tüpte sunulur. [[K3 s. 137]]</li>
<li><b>Dar hava yolu.</b> Tümör gibi üst hava yolu obstrüksiyonlarında Heliox solunum işini azaltır ve oksijenlenmeyi iyileştirir. [[K3 s. 137]]</li>
<li><b>Dalış ve ses.</b> Derin dalışta He/O₂ karışımı azot narkozunu önlemek için kullanılır. [[K3 s. 137]] Düşük yoğunluk ses frekansını yükselttiğinden konuşma ince duyulur. [[K3 s. 137]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="a09f-co2">
<h2>Karbondioksit</h2>
<p class="intro">PaCO₂ yükseldikçe dakika hacmi artar, ancak 10 kPa aşıldığında solunum baskılanabilir. [[K3 s. 137]]</p>
${A09F_SEKIL('a09f_karbondioksit', 'PaCO₂ artışına iki yanıt', 'Şematik/nitel yanıtlar. [[K3 s. 137]]')}
<ul class="ozet">
<li><b>Sunum.</b> CO₂ renksizdir ve yüksek konsantrasyonda keskin kokar. [[K3 s. 137]] Gri tüplerde (C tipi 450 litre, E tipi 1800 litre) 20°C’de, 51 bar’da sıvı halde depolanır. [[K3 s. 137]]</li>
<li><b>Fiziksel özellikler.</b> Kritik sıcaklık 31°C, kritik basınç 73,8 bar’dır. [[K3 s. 137]] Kitap −78,5°C’yi kaynama noktası olarak verir. [[K3 s. 137]]</li>
<li><b>Kullanım.</b> Laparoskopide insuflasyon, kriyoterapi ve bazen genel anesteziden sonra solunumu uyarmak için kullanılır. [[K3 s. 137]]</li>
<li><b>Dolaşım.</b> Sempatik uyarıyla kalp hızı, kan basıncı ve kardiyak debi artar, koroner arterler genişler. [[K3 s. 137]] Yüksek PaCO₂ aritmi olasılığını artırır. [[K3 s. 137]]</li></ul>
<div class="tbl-wrap a09f-tablo"><table class="tbl"><thead><tr><th>Kalp ve damarlar</th><th>Uzun süre %100 O₂</th><th>CO₂ artışı</th></tr></thead><tbody>
<tr><th>Kardiyak debi</th><td>Doğrudan hafifçe azalır. [[K3 s. 135]]</td><td>Sempatik uyarıyla artar. [[K3 s. 137]]</td></tr>
<tr><th>Koroner arterler</th><td>Daralır. [[K3 s. 135]]</td><td>Genişler. [[K3 s. 137]]</td></tr>
</tbody></table></div>
<div class="note plain"><b>Atlas notu.</b> Kitap −78,5°C için “kaynama” der. Atmosfer basıncında doğru terim süblimleşmedir: katı CO₂ doğrudan gaza geçer.</div>
</section>

<section class="wrap blk ders-sec" id="a09f-absorban">
<h2>Karbondioksit absorbanları</h2>
<p class="intro">Halka sisteminde absorban CO₂’yi kimyasal olarak bağlar, böylece CO₂’nin yeniden solunmasını önler. [[K3 s. 137]]</p>
${A09F_SEKIL('a09f_absorban', 'CO₂’nin karbonunu üç basamak boyunca izleyin', 'Şematik kimyasal dönüşüm. [[K3 s. 137]]')}
<p>Kitap Birleşik Krallık için başlıca sodyum hidroksit temelli soda lime’ı, ABD için potasyum hidroksit temelli baralyme’ı tanımlar. [[K3 s. 137]]</p>
</section>

<section class="wrap blk ders-sec" id="a09f-p1">
<h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin ve yanıtınızı gerekçeyle karşılaştırın.</p>
<div class="viz"><div data-viz="mtf" data-q="far09f-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far09f-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far09f-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="a09f-p2">
<h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>ARDS’de inhale NO neden düşünülebilir? Etkisinin neden akciğerle sınırlı kaldığını açıklayın. Kitapta aktarılan 1997 kılavuzuna göre hastayı seçerken, gazı verirken ve izlerken nelere bakardınız?</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>İnhale NO, ARDS’de ventilasyon/perfüzyon uyumsuzluğunu azaltabilir. [[K3 s. 136]]</li>
<li>Eritrositler NO’yu hızla inaktive eder, bu yüzden sistemik dolaşım etkilenmez. [[K3 s. 136]]</li>
<li>Kılavuz ağır ARDS’yi optimal ventilasyona ve FiO₂ = 1’e rağmen PaO₂ &lt; 12 kPa olarak tanımlar, ayrıca sağ kalp yetersizliğini sayar. [[K3 s. 136]]</li>
<li>Kontrendikasyon başlığında methemoglobinemi, kanama diyatezi, intrakraniyal kanama ve ağır sol ventrikül yetersizliği yer alır. [[K3 s. 136]]</li>
<li>Tercih senkron inspiratuvar enjeksiyonla en düşük etkili dozdur (en çok 40 ppm). [[K3 s. 136]] Sürekli sistem kalibre akımölçer gerektirir. [[K3 s. 136]]</li>
<li>Gaz analizöründe doğruluk 1 ppm, ortamda 8 saatlik ortalama sınır 25 ppm’dir. [[K3 s. 136]] Methemoglobin tedavi öncesi, başlangıç sonrası ve günlük ölçülür. [[K3 s. 136]]</li>
</ol>
<div class="cols"><div class="note"><b>Çizin.</b> Akciğer damarından eritrosite uzanan bir ok çizin. Pulmoner vazodilatasyonu ve hızlı eritrosit inaktivasyonunu işaretleyin, yanına doz ve izlem sınırlarını yazın. [[K3 s. 136]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Hipoksi endojen NO’nun pulmoner etkisini nasıl değiştirir? Septik şokta NOS inhibisyonunun kan basıncına ve sağkalıma etkileri nasıl ayrılır? [[K3 s. 136]]</div></div>
</section>

<section class="wrap blk ders-sec" id="a09f-ozet">
<h2>Özet</h2><ul class="ozet">
<li>Ksenonun etkisi hızla başlar ve biter, ksenon akciğerlerden değişmeden atılır. [[K3 s. 133–134]]</li>
<li>O₂ toksisitesinde serbest radikaller merkezi sinir sistemini ve alveol–kapiller membranı etkiler. [[K3 s. 135]]</li>
<li>İnhale NO’nun pulmoner etkisi eritrositte hızla sonlanır. [[K3 s. 136]]</li>
<li>Heliox düşük yoğunluğu sayesinde üst hava yolu obstrüksiyonunda solunum işini azaltır. [[K3 s. 137]]</li>
<li>PaCO₂ 10 kPa’yı aşınca solunum depresyonu ve narkoz gelişebilir. [[K3 s. 137]]</li>
<li>Soda lime reaksiyonunda CO₂’nin karbonu kalsiyum karbonatta tutulur. [[K3 s. 137]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="09f"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/09e">← 09e · İnhalasyon ajanlarının farmakolojisi ve tek tek ajanlar</a><a href="#/dersler/farmakoloji/10a">Sonraki: 10a · Opioidler: fizyoloji, reseptörler ve morfin →</a></nav>
</section>`
};
