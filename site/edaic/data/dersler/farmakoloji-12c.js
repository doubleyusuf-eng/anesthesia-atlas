VERI.sorular = VERI.sorular || {};
VERI.sorular['far12c-1'] = {
  no: 1, kok: 'Nondepolarizan blok ve etkileşimleri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 191–194]]',
  onermeler: [
    { t: 'Nondepolarizan gevşeticiler nikotinik reseptörün α alt biriminde ACh ile yarışır.', d: true, n: 'Kuaterner amonyum grubu postjunksiyonel reseptöre kompetitif bağlanır. [[K3 s. 191]]' },
    { t: 'Reseptörlerin tam %70’inin işgali, bloğu periferik sinir stimülatörüyle saptamak için yeterlidir.', d: false, n: 'Kavşağın güvenlik payı nedeniyle işgalin %70’i aşması gerekir. [[K3 s. 192]]' },
    { t: 'Akut hipokalemi nondepolarizan bloğu güçlendirir.', d: true, n: 'İstirahat potansiyeli daha negatif olur ve nondepolarizanların etkisi artar. [[K3 s. 194]]' },
    { t: 'Asidoz gallaminin etkisini uzatır.', d: false, n: 'Asidoz çoğu gevşeticinin etkisini uzatırken gallamininkini kısaltır. [[K3 s. 194]]' },
    { t: 'Lityum, Na⁺ kanal blokajıyla kas gevşetici etkisini uzatır.', d: true, n: 'K3, lityumla uzayan blok için sodyum kanallarının blokajını gösterir. [[K3 s. 194]]' }
  ]
};
VERI.sorular['far12c-2'] = {
  no: 2, kok: 'Aminosteroidlerin başlangıcı, dolaşım etkileri ve atılımı', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 193–196]]',
  onermeler: [
    { t: 'Rokuronyumun hızlı başlangıcı yüksek potensinden kaynaklanır.', d: false, n: 'Düşük potens daha yüksek doz gerektirir ve artan konsantrasyon gradyanı kavşağa difüzyonu hızlandırır. [[K3 s. 195]]' },
    { t: 'Vekuronyum, fentanille ilişkili bradikardiyi karşılamadan bırakabilir.', d: true, n: 'Vekuronyumun doğrudan kardiyak etkisi yoktur. [[K3 s. 193]]' },
    { t: 'Değişmemiş pankuronyumun başlıca atılım yolu safradır.', d: false, n: 'Ana ilaç çoğunlukla idrara, metabolitleri safraya geçer. [[K3 s. 196]]' },
    { t: 'Pankuronyum kardiyak muskarinik reseptörleri bloke ederek taşikardiye yol açar.', d: true, n: 'Kalp hızındaki artış, kardiyak muskarinik blokla açıklanır. [[K3 s. 196]]' },
    { t: 'Rokuronyumun dozu yükseltildiğinde etki süresi kısalır.', d: false, n: 'Yüksek dozla başlangıç hızlanırken etki süresi belirgin biçimde uzar. [[K3 s. 195]]' }
  ]
};
VERI.sorular['far12c-3'] = {
  no: 3, kok: 'Benzilizokinolinyumların yıkımı ve metabolitleri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 197–199]]',
  onermeler: [
    { t: 'Atrakuryumun ester hidrolizini plazma kolinesterazı gerçekleştirir.', d: false, n: 'Bu yoldan plazma kolinesterazıyla ilişkisi olmayan nonspesifik esterazlar sorumludur. [[K3 s. 197]]' },
    { t: 'Hipotermi atrakuryumun Hofmann eliminasyonunu yavaşlatır.', d: true, n: 'Kendiliğinden parçalanma hipotermide ve asidozda yavaşlar. [[K3 s. 197]]' },
    { t: 'Sisatrakuryumun metabolitlerinde nöromüsküler bloker etki yoktur.', d: true, n: 'Hofmann eliminasyonu ve ardından gelen ester hidrolizi nöromüsküler blok yapan bir metabolit oluşturmaz. [[K3 s. 197]]' },
    { t: 'Mivakuryumun sis-sis izomerinin yarı ömrü diğer iki izomerinkinin on katıdır.', d: true, n: 'Enzimatik olarak metabolize edilmeyen sis-sis düşük potenttir ve yarı ömrü diğerlerininkinin 10 katıdır. [[K3 s. 198]]' },
    { t: 'Son dönem karaciğer hastalığında mivakuryumun etkisi uzar.', d: true, n: 'Uzatıcı başlıca etken plazma kolinesteraz aktivitesinin azalmasıdır. [[K3 s. 199]]' }
  ]
};

(function () {
  const nav = [['blok','Blok ve sınıflar'],['etki','Etkileşimler'],['amino','Aminosteroidler'],['yikim','Atrakuryum ve sisatrakuryum'],['miva','Mivakuryum'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  function tablo(ad, basliklar, satirlar, sayfa) {
    return '<div class="tbl-wrap a12c-tablo"><table class="tbl"><caption>' + ad + '</caption><thead><tr>' +
      basliklar.map(b => '<th scope="col">' + b + '</th>').join('') + '</tr></thead><tbody>' +
      satirlar.map(([ilac, ...deger]) => '<tr><th scope="row">' + ilac + '</th>' +
        deger.map((d, i) => '<td data-alan="' + basliklar[i + 1] + '"><span>' + d + (i === deger.length - 1 ? ' [[K3 s. ' + sayfa + ']]' : '') + '</span></td>').join('') +
        '</tr>').join('') + '</tbody></table></div>';
  }
  SAYFALAR['dersler/farmakoloji/12c'] = {
    grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 2 · Bölüm 12 · Ders 12c', baslik: 'Nondepolarizan kas gevşeticiler',
    lede: 'Nondepolarizan gevşeticiler kasın motor son plağında asetilkolinle yarışır. [[K3 s. 191]] Hızlı başlangıç rokuronyumu, kısa etki süresi ise mivakuryumu ayırt ettirir. [[K3 s. 195]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="a12c-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a12c-blok">
<h2>Bağlanma ne zaman saptanabilir bloğa dönüşür?</h2>
<p class="intro">Reseptörlerin bir bölümü gevşeticiyle işgal edilse bile nöromüsküler kavşaktaki güvenlik payı kasılmayı korur. [[K3 s. 192]]</p>
<div class="viz"><div class="viz-head"><h3>Yarışma, işgal ve saptama</h3></div><div data-viz="a12c_blok"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel gösterim. Saptama eşiği periferik sinir stimülatörü içindir. [[K3 s. 192]]</p></div>
<p>İki kuaterner amonyum grubu taşıyan biskuaterner bileşikler, tek grup taşıyan monokuaterner bileşiklerden daha potenttir. [[K3 s. 191]] Nondepolarizan bloğun özellikleri esas olarak Faz II bloğunkilerle aynıdır. [[K3 s. 192]]</p>
<div class="cols"><div class="card"><h3>Aminosteroidler</h3><p>Vekuronyum, rokuronyum ve pankuronyum bu gruptadır. [[K3 s. 192]]</p></div><div class="card"><h3>Benzilizokinolinyumlar</h3><p>Atrakuryum, mivakuryum ve tübokürarin bu gruptadır. [[K3 s. 192]] Sisatrakuryum, atrakuryumun stereoizomerlerinden biridir. [[K3 s. 197]]</p></div></div>
<p>Görece polar oldukları için lipit zarları geçemezler ve dağılım hacimleri küçüktür. [[K3 s. 192]] Atrakuryum ve mivakuryum plazmada hidrolize uğrarken pankuronyum ve vekuronyum kısmen karaciğerde metabolize olur. [[K3 s. 192]] Değişmeden kalan ilaç idrar veya safrayla atılır. [[K3 s. 192]]</p>
${tablo('Entübasyon dozu, zaman profili ve sistemik etkiler', ['İlaç','Doz (mg/kg)','Başlangıç / süre','Kardiyovasküler etki / histamin salınımı'], [
  ['Rokuronyum','0,6','Hızlı / orta','Yok / nadir'], ['Vekuronyum','0,1','Orta / orta','Yok veya bradikardi / nadir'],
  ['Pankuronyum','0,1','Orta / uzun','Taşikardi / nadir'], ['Atrakuryum','0,5','Orta / orta','Yok / hafif'],
  ['Sisatrakuryum','0,2','Orta / orta','Yok / nadir'], ['Mivakuryum','0,2','Orta / kısa','Yok / hafif']
], '195')}
</section>

<section class="wrap blk ders-sec" id="a12c-etki">
<h2>Bloğu hangi koşullar değiştirir?</h2>
<p class="intro">Kas gevşeticiler tek başına verilmediğinden birlikte kullanılan ilaçların blok üzerine etkisi de hesaba katılır. [[K3 s. 192]]</p>
<div class="viz"><div class="viz-head"><h3>Potasyumu değiştirin, iki blok tipini karşılaştırın</h3></div><div data-viz="a12c_potasyum"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. Oklar blok şiddetindeki değişimin yönünü gösterir. [[K3 s. 194]]</p></div>
<p>Potasyumda yön, gevşeticinin tipine bağlıdır. [[K3 s. 194]] Diğer etkileşimleri ayırmak için ilacın metabolizmasına, sinir ucundan ACh salınımına ve membran üzerindeki etkilere bakın. [[K3 s. 194]]</p>
${tablo('İlaçlarla etkileşim', ['Etken','Blok','Mekanizma'], [
  ['Volatil anestezikler','Uzar','Merkezî sinir sisteminde somatik reflekslerin baskılanmasıyla kavşakta verici salınımı azalır.'],
  ['Aminoglikozidler (yüksek intraperitoneal dozlar), polimiksinler ve tetrasiklin','Uzar','Olasılıkla Ca²⁺ ile yarışma ACh salınımını azaltır. [[K3 s. 194]] Kalsiyumla geri dönüş öngörülemez.'],
  ['Lokal anestezikler','Değişken','Düşük dozda kısmi Na⁺ kanal blokajı, gevşeticinin etkisini artırabilir.'],
  ['Lityum','Uzar','Na⁺ kanallarını bloke eder.'], ['Diüretikler','Değişken','cAMP etkisi değişkendir. [[K3 s. 194]] Serum K⁺ düzeyi üzerinden de etkili olabilirler.'],
  ['Ca²⁺ kanal antagonistleri','Uzar','Sinir ucuna Ca²⁺ girişi azalınca ACh salınımı azalır.']
], '194')}
<ul class="a12c-liste"><li><b>Hipotermi.</b> Gevşeticinin metabolizması yavaşlar ve blok uzar. [[K3 s. 194]]</li>
<li><b>Asidoz.</b> Çoğu ilacın bloğunu uzatır, gallamininkini kısaltır. [[K3 s. 194]] Tübokürarinin (dTC) tersiyer amini protonlanınca ACh reseptörüne afinitesi artar. [[K3 s. 194]]</li>
<li><b>Hipermagnezemi.</b> Mg²⁺, Ca²⁺ ile yarışarak ACh salınımını azaltır ve postjunksiyonel zarı stabilize eder, böylece blok uzar. [[K3 s. 194]] Örneğin preeklampside normalin üzerindeki magnezyum düzeyleri benzer mekanizmayla apneye yol açabilir. [[K3 s. 194]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="a12c-amino">
<h2>Aminosteroidlerde başlangıç, dolaşım ve atılım</h2>
<p class="intro">Rokuronyumun düşük potensi, etkili dozda daha fazla molekül verilmesini gerektirir. [[K3 s. 195]]</p>
<div class="viz"><div class="viz-head"><h3>Rokuronyum dozunu değiştirin</h3></div><div data-viz="a12c_doz"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Süreler seçilen dozda entübasyon koşullarına ulaşmayı gösterir. [[K3 s. 195]]</p></div>
<p>Plazma ile nöromüsküler kavşak arasındaki konsantrasyon farkı büyüdükçe difüzyon hızlanır ve etki daha çabuk başlar. [[K3 s. 195]] Kitap rokuronyum için genel olarak 60–90 saniye bildirir ve adındaki “RO”yu hızlı başlangıçla ilişkilendirir. [[K3 s. 195]]</p>
<article class="card a12c-kart"><h3>Vekuronyum</h3><ul class="a12c-liste">
<li><b>Yapı ve hazırlama.</b> Pankuronyumdan tek metil grubu farkıyla ayrılan monokuaterner analogdur. [[K3 s. 192]] Çözeltide kararsız olabileceğinden mannitol ve sodyum hidroksit içeren 10 mg liyofilize toz halinde sunulur ve uygulama öncesi 5 ml suda çözülür. [[K3 s. 192]]</li>
<li><b>Başlangıç.</b> 0,1 mg/kg ile yaklaşık 90–120 saniyede entübasyon koşulları sağlanır, etki orta sürelidir. [[K3 s. 192]]</li>
<li><b>Dolaşım.</b> Kardiyovasküler etki ve histamin salınımı beklenmediğinden “temiz” diye anılır. [[K3 s. 192]] Pankuronyum ve tübokürarinden farklı olarak fentanil veya propofolle ilişkili bradikardiyi karşılamayabilir. [[K3 s. 193]]</li>
<li><b>Kas.</b> Kritik hastalık miyopatisi en sık kritik hastalarda kortikosteroidler, kas gevşeticiler veya ikisiyle birlikte görülür ve iyileşme uzun sürebilir. [[K3 s. 193]]</li>
<li><b>Kinetik.</b> Karaciğerde deasetilasyonla 3-hidroksi, 17-hidroksi ve 3,17-dihidroksi türevleri oluşur. [[K3 s. 194]] Aktif 3-hidroksivekuronyumun yarı ömrü, pankuronyumun karşılık gelen metabolitinden farklı olarak çok kısadır ve böbrek işlevi normalse klinik önemi azdır. [[K3 s. 194]]</li>
<li><b>Atılım.</b> Tek yüklü grubu nedeniyle pankuronyumdan daha lipofiliktir ve hepatik metabolizma oranları benzer olsa da safraya daha büyük bir pay geçer. [[K3 s. 194–195]] İnfüzyon sırasında birikebilir. [[K3 s. 195]]</li></ul></article>
<article class="card a12c-kart"><h3>Rokuronyum</h3><ul class="a12c-liste">
<li><b>Yapı ve sunum.</b> Vekuronyumdan geliştirilmiştir ve yapısı dört konumda farklıdır. [[K3 s. 195]] Renksiz çözeltinin 5 ml’sinde 50 mg bulunur. [[K3 s. 195]]</li>
<li><b>Doz ve süre.</b> 0,6 mg/kg ile entübasyon koşulları 100–120 saniyede sağlanır. [[K3 s. 195]] 0,9–1,2 mg/kg ile süre 60 saniyeye inebilir, ancak gevşeme belirgin biçimde uzar. [[K3 s. 195]]</li>
<li><b>Dolaşım ve geri döndürme.</b> Vekuronyum gibi dolaşım etkileri minimaldir, ancak yüksek dozda kalp hızı artabilir. [[K3 s. 196]] Blok antikolinesterazlarla veya sugammadeksle geri döndürülebilir. [[K3 s. 195]]</li>
<li><b>Atılım.</b> Bazı deasetillenmiş metabolitleri oluşabilse de çoğu değişmeden safraya, daha küçük bir pay idrara geçer. [[K3 s. 196]] Karaciğer ve böbrek yetmezliğinde etki uzayabilir. [[K3 s. 196]]</li></ul></article>
<article class="card a12c-kart"><h3>Pankuronyum</h3><ul class="a12c-liste">
<li><b>Sunum ve zaman profili.</b> Biskuaterner aminosteroidin renksiz çözeltisi 2 ml’de 4 mg içerir ve 4 °C’de saklanır. [[K3 s. 196]] 0,1 mg/kg ile entübasyon koşulları 90–150 saniyede oluşur ve etki yaklaşık 45 dakika sürer. [[K3 s. 196]]</li>
<li><b>Taşikardi.</b> Kalpte muskarinik reseptörleri bloke eder. [[K3 s. 196]] Postganglionik sinir uçlarında noradrenalin alımını engelleyerek dolaylı sempatomimetik etki de gösterebilir. [[K3 s. 196]]</li>
<li><b>Kinetik.</b> Dağılım hacmi düşüktür. [[K3 s. 196]] Kitabın anlatısında plazma proteinlerine bağlanma %10–40, karaciğerde deasetilasyon yaklaşık %35’tir. [[K3 s. 196]] 3-hidroksi, 17-hidroksi ve 3,17-dihidroksi türevleri oluşur, ilkinin potensi ana ilacın yarısıdır. [[K3 s. 196]] Değişmemiş ilaç başlıca idrarla, metabolitleri safrayla atılır. [[K3 s. 196]]</li></ul></article>
</section>

<section class="wrap blk ders-sec" id="a12c-yikim">
<h2>Atrakuryum ve sisatrakuryum nasıl parçalanır?</h2>
<p class="intro">Atrakuryum iki yolla parçalanır, sisatrakuryumda ise başlıca yol Hofmann eliminasyonudur. [[K3 s. 197]]</p>
<div class="viz"><div class="viz-head"><h3>Ana ilacı ve yıkım ürünlerini izleyin</h3></div><div data-viz="a12c_yikim"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. Oklar seçilen ilacın parçalanma yolunu gösterir. [[K3 s. 197]]</p></div>
<p>Esterazın devreye girdiği basamağa dikkat edin. Sisatrakuryum plazma esterazlarıyla doğrudan hidrolize uğramaz, ancak Hofmann yolunda oluşan akrilat bu enzimlere substrattır. [[K3 s. 197]]</p>
<article class="card a12c-kart"><h3>Atrakuryum</h3><ul class="a12c-liste">
<li><b>Yapı ve sunum.</b> Dört kiral merkezi vardır ve preparat 10 stereoizomer içerir. [[K3 s. 196]] Renksiz 10 mg/ml çözelti, 2,5, 5 ve 25 ml flakonlarda sunulur ve 4 °C’de saklanır. [[K3 s. 196]] 0,5 mg/kg ile entübasyon koşulları 90–120 saniyede sağlanır. [[K3 s. 196]]</li>
<li><b>Uygulama hızı.</b> Hızlı enjeksiyonda histamin salınımı enjeksiyon yerinde sınırlı kalabilir veya yayılarak bronkospazm ve hipotansiyona yol açabilir. [[K3 s. 196]] Yavaş intravenöz enjeksiyon bu etkileri en aza indirir. [[K3 s. 196]] Vekuronyum gibi kritik hastalık miyopatisiyle ilişkilidir. [[K3 s. 197]]</li>
<li><b>Ester hidrolizi.</b> Nonspesifik esterazların plazma kolinesterazıyla ilişkisi yoktur. [[K3 s. 197]] Asidik ortam hidrolizi hızlandırır, ancak klinik aralıktaki pH değişimlerinin hızı etkilemesi olası görünmez. [[K3 s. 197]]</li>
<li><b>Hofmann eliminasyonu.</b> İlaç pH 4 ve 4 °C’de stabildir. [[K3 s. 197]] Asidoz ve hipotermi kendiliğinden parçalanmayı yavaşlatır. [[K3 s. 197]] Her iki Hofmann ürünü de klinikte karşılaşılandan daha yüksek konsantrasyonlarda nöbete yol açabilir. [[K3 s. 197]]</li>
<li><b>Organ işlevi.</b> Ana ilacın eliminasyonu karaciğer ve böbrek işlevinden bağımsızdır ve bu bazı klinik durumlarda avantaj sağlar. [[K3 s. 197]] Laudanozin ise böbrekten temizlenen bir glisin antagonistidir ve nöromüsküler blok yapmaz. [[K3 s. 197]]</li></ul></article>
<article class="card a12c-kart"><h3>Sisatrakuryum</h3><ul class="a12c-liste">
<li><b>Sunum.</b> Atrakuryumun 10 stereoizomerinden biri olan sisatrakuryumun renksiz çözeltisi 2 veya 5 mg/ml içerir ve 4 °C’de saklanır. [[K3 s. 197]]</li>
<li><b>Potens.</b> Atrakuryumdan yaklaşık üç ile dört kat daha potent olduğu için etkisi daha yavaş başlar. [[K3 s. 197]] Histamin salma olasılığı çok düşük olduğundan doz artırılarak başlangıç hızlandırılabilir. [[K3 s. 197]]</li>
<li><b>Kinetik.</b> Genel kinetiği atrakuryuma benzer ve metabolitleri nöromüsküler blok yapmaz. [[K3 s. 197]] İki yaşından itibaren çocuklarda ve yaşlılarda kinetiği çok az değişerek güvenle kullanılmıştır. [[K3 s. 197]] Son dönem böbrek veya karaciğer işlev bozukluğunda kinetik profili değişmez. [[K3 s. 197]]</li></ul></article>
</section>

<section class="wrap blk ders-sec" id="a12c-miva">
<h2>Mivakuryumun etkisi ne zaman uzar?</h2>
<p class="intro">Atrakuryuma benzeyen bu benzilizokinolinyum esteri kısa etkilidir, ancak üç stereoizomeri aynı hızda metabolize olmaz. [[K3 s. 198–199]]</p>
<div class="viz"><div class="viz-head"><h3>Karışımdan bir izomer seçin</h3></div><div data-viz="a12c_izomer"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Çubuk uzunluğu izomerin karışımdaki yüzdesini gösterir. [[K3 s. 198]]</p></div>
<p>Karışımın çoğunu oluşturan sis-trans ve trans-trans izomerlerini plazma kolinesterazı parçalar. [[K3 s. 198–199]] Genetik olarak düşük enzim düzeylerinde blok uzar. [[K3 s. 199]] Son dönem karaciğer hastalığında da başlıca enzim aktivitesinin azalması nedeniyle etki belirgin biçimde uzar. [[K3 s. 199]]</p>
<ul class="a12c-liste">
<li><b>Sunum ve saklama.</b> Asidik sulu çözelti (pH 3,5–5,0) 2 mg/ml içerir ve 5 veya 10 ml ampullerde sunulur. [[K3 s. 198]] 25 °C’nin altında raf ömrü 18 aydır. [[K3 s. 198]]</li>
<li><b>Dolaşım ve solunum.</b> Yüksek doz histamin salınımıyla kan basıncında düşmeye ve bronkospazma neden olabilir. [[K3 s. 199]]</li>
<li><b>Geri döndürme.</b> Hızlı enzimatik yıkım nedeniyle rutin neostigmin gerekmeyebilir. [[K3 s. 198]] Üstelik neostigmin plazma kolinesterazını inhibe ederek mivakuryum metabolizmasını engelleyebilir. [[K3 s. 198]] Blok geri döndürülecekse edrofonyum daha uygun olabilir. [[K3 s. 198]]</li></ul>
${tablo('Altı ilacın kinetiği · K3 Tablo 12.5', ['İlaç','Proteine bağlı (%)','Dağılım hacmi (L/kg)','Metabolize (%)','Safra / idrar (%)'], [
  ['Mivakuryum','10','0,21–0,32 (izomere özgü)','90','0 / 5'],
  ['Atrakuryum','15','0,15','90','0 / 10'], ['Sisatrakuryum','15','0,15','95','0 / 5'],
  ['Rokuronyum','10','0,20','&lt;5','60 / 40'], ['Vekuronyum','10','0,23','20','70 / 30'],
  ['Pankuronyum','20–60','0,27','30','20 / 80']
], '198')}
<p>K3’ün kinetik tablosu pankuronyum için proteine bağlanmayı %20–60, metabolize olan payı %30 verir. [[K3 s. 198]] İlaç anlatısındaki karşılıkları sırasıyla %10–40 ve yaklaşık %35’tir. [[K3 s. 196]]</p>
</section>

<section class="wrap blk ders-sec" id="a12c-p1"><h2>Part I · MTF</h2><p>Her önermeyi bağımsız olarak doğru veya yanlış işaretleyin.</p>
<div class="viz"><div data-viz="mtf" data-q="far12c-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far12c-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far12c-3"></div></div></section>
<section class="wrap blk ders-sec" id="a12c-p2"><h2>Part II · SOE 2 (farmakoloji)</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Rokuronyumun hızlı başlangıcını ve mivakuryumun kısa etkisini nasıl açıklarsınız? Organ işlevleri bozulduğunda rokuronyum, mivakuryum ve atrakuryumun davranışını karşılaştırın.</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li><b>Hedef.</b> Gevşetici, kavşağın postjunksiyonel nikotinik reseptöründe α alt birimi için ACh ile yarışır. [[K3 s. 191]]</li>
<li><b>Başlangıç.</b> Rokuronyumun düşük potensi daha çok molekül verilmesini gerektirir ve plazmadan kavşağa artan gradyan difüzyonu hızlandırır. [[K3 s. 195]]</li>
<li><b>Rokuronyumun süresi.</b> Başlıca değişmeden safrayla, daha azı idrarla atılır ve karaciğer veya böbrek yetmezliğinde etkisi uzayabilir. [[K3 s. 196]]</li>
<li><b>Mivakuryumun süresi.</b> Plazma kolinesterazı başlıca iki izomeri hızla metabolize eder. [[K3 s. 198–199]] Son dönem karaciğer hastalığında düşük enzim aktivitesi bloğu uzatır. [[K3 s. 199]]</li>
<li><b>Atrakuryumun farkı.</b> Ester hidrolizi ve Hofmann eliminasyonu sayesinde ana ilacın eliminasyonu böbrek ve karaciğer işlevinden bağımsızdır. [[K3 s. 197]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Rokuronyum için plazmadan kavşağa difüzyonu ve safra/idrarla atılımı gösterin. [[K3 s. 195–196]] Mivakuryumun iki ana izomerini kolinesteraza bağlayın. [[K3 s. 198–199]] Atrakuryum için ester hidrolizi ve Hofmann yollarını yan yana çizin. [[K3 s. 197]]</div>
<div class="note plain"><b>Olası ek sorular</b><ul><li>Yüksek doz rokuronyumda başlangıç ve etki süresi nasıl değişir? [[K3 s. 195]]</li><li>Hipotermi hangi parçalanma yolunu yavaşlatır? [[K3 s. 197]]</li><li>Neostigmin mivakuryumun yıkımını nasıl etkileyebilir? [[K3 s. 198]]</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="a12c-ozet"><h2>Özet</h2><ul class="ozet">
<li>Kavşağın güvenlik payı nedeniyle periferik sinir stimülatörüyle saptama için reseptör işgali %70’i aşmalıdır. [[K3 s. 192]]</li>
<li>Akut hipokalemi nondepolarizan bloğu güçlendirir, hiperkalemi ters yönde etki eder. [[K3 s. 194]]</li>
<li>Rokuronyum hızlı başlar ve doz arttığında etki süresi uzar. [[K3 s. 195]]</li>
<li>Pankuronyum taşikardi yapar, vekuronyum ise fentanil veya propofolle ilişkili bradikardiyi karşılamayabilir. [[K3 s. 193]] [[K3 s. 196]]</li>
<li>Atrakuryumun ester hidrolizi ve Hofmann yoluyla yıkımı organ işlevinden bağımsız eliminasyon sağlar. [[K3 s. 197]] Sisatrakuryumda Hofmann yolu baskındır. [[K3 s. 197]]</li>
<li>Mivakuryum kısa etkilidir, ancak plazma kolinesterazı düşükse blok uzar. [[K3 s. 198–199]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="12c"></div>
<nav class="ders-gec" aria-label="Ders geçişi"><a href="#/dersler/farmakoloji/12b">← 12b · Depolarizan kas gevşeticiler</a><a href="#/dersler/farmakoloji/12d">Sonraki: 12d · Geri döndürücü ajanlar →</a></nav>
</section>`
  };
})();
