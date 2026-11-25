VERI.sorular = VERI.sorular || {};
VERI.sorular['far12b-1'] = {
  no: 1, kagit: 'Paper A · Farmakoloji', kok: 'Süksametonyumun etkisi ve yıkımı', kaynak: '[[K3 s. 187]]',
  onermeler: [
    { t: 'İlk intravenöz dozun çoğu nöromüsküler kavşağa ulaşır.', d: false, n: 'Hızlı plazma hidrolizi nedeniyle kavşağa yalnız %20 ulaşır. [[K3 s. 187]]' },
    { t: 'Kalıcı depolarizasyon yakındaki voltaja duyarlı sodyum kanallarını inaktive eder.', d: true, n: 'Yerel akımların etkisiyle 1–2 mm içindeki kanallar inaktive olur ve iletim kesilir. [[K3 s. 187]]' },
    { t: 'Süksinilmonokolin güçlü bir metabolittir.', d: false, n: 'İlk hidroliz ürünü süksinilmonokolinin etkisi zayıftır. [[K3 s. 187]]' },
    { t: 'Antikolinesterazlar parsiyel Faz I bloğu artırır.', d: true, n: 'Antikolinesterazla Faz I blok derinleşirken Faz II blok antagonize edilir. [[K3 s. 187]]' },
    { t: 'Parsiyel Faz II blokta posttetanik potansiyalizasyon kaybolur.', d: false, n: 'Posttetanik potansiyalizasyon Faz II’de görülür, Faz I’de görülmez. [[K3 s. 187]]' },
  ],
};
VERI.sorular['far12b-2'] = {
  no: 2, kagit: 'Paper A · Farmakoloji', kok: 'Süksametonyumun sistemik etkileri', kaynak: '[[K3 s. 187–189]]',
  onermeler: [
    { t: 'İkinci dozdan sonra bradikardi sıklıkla daha ağırdır.', d: true, n: 'Tekrar dozunda bradikardi belirginleşebilir ve atropin bunu önleyebilir. [[K3 s. 187]]' },
    { t: 'Paraplejide hiperkalemi açısından özellikle riskli dönem ilk altı aydır.', d: true, n: 'Paraplejide ilk altı ay öne çıkar, ilerleyici kas hastalığında ise risk kas tutulumu arttıkça büyür. [[K3 s. 188]]' },
    { t: 'Mide içi basınçla birlikte reflü riski de artar.', d: false, n: 'Alt özofagus sfinkterinin tonusu da yükseldiğinden reflü riski artmaz. [[K3 s. 189]]' },
    { t: 'Göz içi basınç artışını eşzamanlı tiyopental dengeleyebilir.', d: true, n: 'Tiyopentalle basınç sabit kalabilir, hatta düşebilir. [[K3 s. 189]]' },
    { t: 'Anafilaksi olasılığı nondepolarizan gevşeticilerdekinden düşüktür.', d: false, n: 'Kitap süksametonyumla yaklaşık iki kat olasılık bildirir. [[K3 s. 189]]' },
  ],
};
VERI.sorular['far12b-3'] = {
  no: 3, kagit: 'Paper A · Farmakoloji', kok: 'Malign hipertermi ve süksametonyum apnesi', kaynak: '[[K3 s. 189–191]]',
  onermeler: [
    { t: 'Dibukain sayısı plazmadaki kolinesteraz miktarını ölçer.', d: false, n: 'Sayı, enzimin dibukainle yüzde inhibisyonunu ve dolayısıyla genetik özelliğini yansıtır. [[K3 s. 191]]' },
    { t: 'Dantrolen çizgili kasta retikulumdan kalsiyum salınımını engeller.', d: true, n: 'Riyanodin reseptörüne bağlanınca uyarılma ile kontraksiyon birbirinden ayrılır. [[K3 s. 190]]' },
    { t: 'Önceki anestezilerde sorun yaşanmamış olsa da malign hipertermi ortaya çıkabilir.', d: true, n: 'Daha önce birçok kez anestezi almış olmak malign hipertermi olasılığını dışlamaz. [[K3 s. 189]]' },
    { t: 'Kas biyopsisinde yalnız kafeine pozitif yanıt kuşkulu gruba girer.', d: true, n: 'İki ajandan yalnız birine yanıt veren kişi MHE olarak sınıflanır. [[K3 s. 190]]' },
    { t: 'Eu:Es ile Eu:Eu aynı dibukain sayısını verebilir.', d: true, n: 'Her ikisinde sayı 80’dir, ancak Eu:Es ile blok süresi uzar. [[K3 s. 191]]' },
  ],
};

const A12B_NAV = [['blok','Blok ve yıkım'],['etki','Sistemik etkiler'],['mh','Malign hipertermi'],['tedavi','Dantrolen'],['apne','Uzamış blok'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
SAYFALAR['dersler/farmakoloji/12b'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 2 · Bölüm 12 · Ders 12b', baslik: 'Depolarizan kas gevşeticiler',
  lede: 'Süksametonyum kası hızla ve kısa süreyle gevşetir. [[K3 s. 186]] Etki kavşakta başlar, süresini ise büyük ölçüde plazmadaki hidroliz belirler. [[K3 s. 187]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A12B_NAV.map(([id,ad],i) => `<button type="button" data-scroll="a12b-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a12b-blok">
<h2>Kavşakta blok, plazmada yıkım</h2>
<p class="intro">1952’de kullanıma giren süksametonyumun tübokürarine üstünlüğü, derin gevşemeyi hızla ve kısa süre için sağlamasıydı. [[K3 s. 186]]</p>
<div class="viz"><div class="viz-head"><h3>Depolarizasyon iletimi nasıl keser?</h3></div><div data-viz="a12b_kavsak"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. Oklar ilacın net hareketini gösterir. [[K3 s. 187]]</p></div>
<ul class="ozet">
<li><b>Yapı ve sunum.</b> Molekülü, asetil gruplarından sırt sırta birleşmiş iki asetilkolin (ACh) gibi düşünün. [[K3 s. 186]] Renksiz çözelti 50 mg/ml içerir ve 4 °C’de saklanır. [[K3 s. 186]]</li>
<li><b>Kullanım.</b> Hızlı seri indüksiyonda hızla gevşeme sağlar. [[K3 s. 186–187]] Kısa cerrahi girişimlerde infüzyonla da kullanılmıştır. [[K3 s. 187]]</li>
<li><b>Başlangıç.</b> Nikotinik ACh reseptörünü uyaran ilaç membranı depolarize eder. [[K3 s. 187]] Plazma kolinesterazı (psödokolinesteraz) karaciğer ve plazmada bulunur, kavşakta bulunmaz. [[K3 s. 187]] Bu yüzden depolarizasyon ACh’ninkinden uzun sürer. [[K3 s. 187]]</li>
<li><b>İletim kaybı.</b> Süren depolarizasyonun oluşturduğu yerel akımlar, 1–2 mm içindeki voltaja duyarlı Na⁺ kanallarını inaktive eder. [[K3 s. 187]] Bu alan yeni aksiyon potansiyelini iletemeyince kas gevşer. [[K3 s. 187]]</li>
<li><b>Sonlanma.</b> Hızlı hidroliz nedeniyle ilk intravenöz dozun yalnız %20’si kavşağa ulaşır. [[K3 s. 187]] Plazmada konsantrasyon düşünce gradyan tersine döner ve kavşakta iletim düzelir. [[K3 s. 187]]</li>
<li><b>Metabolitler.</b> İlk hidrolizde kolin ve zayıf etkili süksinilmonokolin oluşur. [[K3 s. 187]] Aynı enzim süksinilmonokolini süksinik asit ve koline parçalar. [[K3 s. 187]] Hızlı metabolizma nedeniyle ilacın %10’dan azı idrarla atılır. [[K3 s. 187]]</li>
</ul>
<div class="note plain"><b>Atlas notu.</b> Kitap, gradyan tersine dönünce kavşaktan uzaklaşan molekülü ACh olarak adlandırır. Burada kavşaktan plazmaya dönen molekül süksametonyumdur.</div>
<h3>Parsiyel blokta uyarı yanıtı</h3>
<p>Başlangıçtaki Faz I blok ek dozlarla Faz II’ye dönüşebilir. [[K3 s. 187]] Faz II nondepolarizan bloğa benzer, ancak mekanizmasının farklı ve muhtemelen presinaptik olduğu düşünülür. [[K3 s. 187]]</p>
<div class="tbl-wrap"><table class="tbl a12b-faz"><thead><tr><th>Ölçüt</th><th>Faz I</th><th>Faz II / nondepolarizan</th></tr></thead><tbody>
<tr><th>Tek seğirme</th><td>Azalır</td><td>Azalır [[K3 s. 187]]</td></tr>
<tr><th>Dörtlü uyarı (T₄:T₁)</th><td>&gt; 0.7</td><td>&lt; 0.7 [[K3 s. 187]]</td></tr>
<tr><th>1 Hz uyarı</th><td>Yanıt sürer</td><td>Sönme [[K3 s. 187]]</td></tr>
<tr><th>Posttetanik potansiyalizasyon</th><td>Yok</td><td>Var [[K3 s. 187]]</td></tr>
<tr><th>Antikolinesteraz</th><td>Blok artar</td><td>Blok antagonize edilir [[K3 s. 187]]</td></tr>
</tbody></table></div></section>
<section class="wrap blk ders-sec" id="a12b-etki">
<h2>Potasyum çıkışı ve diğer sistemik etkiler</h2>
<p class="intro">Depolarizasyon K⁺’u hücre dışına taşır. [[K3 s. 188]] Sağlıklı kişideki küçük serum K⁺ artışı, yaygın yanıkta veya nöromüsküler hastalıkta kardiyak arreste yol açabilecek ani bir salınıma dönüşebilir. [[K3 s. 188]]</p>
<div class="viz"><div class="viz-head"><h3>Hangi durumda K⁺ yanıtı değişir?</h3></div><div data-viz="a12b_potasyum"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. Ok, K⁺ çıkış yönünü gösterir. [[K3 s. 188]]</p></div>
<p>Kas yüzeyinde çoğalan kavşak dışı ACh reseptörleri erişkin ε yerine fetal γ alt birimini taşır. [[K3 s. 188]] Uyarıldıklarında dolaşıma K⁺ salarlar. [[K3 s. 188]]</p>
<ul class="ozet">
<li><b>Riskin zamanı.</b> Yanık &gt; %10 ise risk yaralanmadan yaklaşık 24 saat sonra başlar, 18 aya kadar sürebilir. [[K3 s. 188]] Paraplejide özellikle ilk 6 ay risklidir. [[K3 s. 188]] İlerleyici kas hastalığında risk sürer ve tutulan kas miktarıyla artar. [[K3 s. 188]] Travmaya bağlı immobilite de benzer mekanizmayla risk taşır. [[K3 s. 188]]</li>
<li><b>Böbrek yetmezliği.</b> Tek başına ani hiperkalemik yanıt riskini artırmaz. [[K3 s. 188]] Akut yetmezlikte ise önceden ciddi biçimde bozulmuş serum K⁺ düzeyi aritmi riskini artırabilir. [[K3 s. 188]]</li>
<li><b>Ritim.</b> Sinüs düğümündeki muskarinik uyarı sinüs veya nodal bradikardiye ve ventriküler aritmilere yol açabilir. [[K3 s. 187]] Bradikardi ikinci dozla sıklıkla ağırlaşır, çocuklarda sıklıkla daha belirgindir ve atropinle önlenebilir. [[K3 s. 187]]</li>
<li><b>Miyalji.</b> En sık ameliyat sonrasında erken hareketlenen genç kadınlarda görülür. [[K3 s. 188]] Önceden küçük doz nondepolarizan gevşetici (örneğin vekuronyum), diazepam veya dantrolen verilmesi sınırlı başarı sağlamıştır. [[K3 s. 188]]</li>
<li><b>Göz.</b> Normalde 10–15 mmHg olan göz içi basıncı birkaç dakika yaklaşık 10 mmHg yükselir, bu artış göz küresi perforasyonunda önemlidir. [[K3 s. 189]] Mekanizma kısmen açıklanabilmiştir: tonik miyofibriller kasılır ve koroid damarları geçici olarak genişler. [[K3 s. 189]] Eşzamanlı tiyopentalle basınç sabit kalabilir, hatta düşebilir. [[K3 s. 189]]</li>
<li><b>Mide.</b> İntragastrik basınç yaklaşık 10 cmH₂O yükselir. [[K3 s. 189]] Alt özofagus sfinkter tonusu da arttığından reflü riski artmaz. [[K3 s. 189]]</li>
<li><b>Anafilaksi.</b> Yaklaşık 10000 uygulamada 1 görülür, olasılık nondepolarizan gevşeticilerdekinin iki katıdır. [[K3 s. 189]] Diğer önemli komplikasyonlar malign hipertermi ve uzamış bloktur. [[K3 s. 189]]</li>
</ul></section>
<section class="wrap blk ders-sec" id="a12b-mh">
<h2>Malign hipertermi: rijiditeden ısı üretimine</h2>
<p class="intro">Malign hipertermide (MH) anormal RYR1 kanalından aşırı Ca²⁺ geçişi yaygın kas rijiditesine yol açar. [[K3 s. 189]]</p>
<div class="viz"><div class="viz-head"><h3>Ca²⁺ hareketi ile ATP tüketimini izleyin</h3></div><div data-viz="a12b_kalsiyum"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 189]]</p></div>
<ul class="ozet">
<li><b>Yatkınlık.</b> Kalıtım otozomal dominanttır, Birleşik Krallık’ta sıklık 50000–70000’de 1’dir. [[K3 s. 189]] Olguların %62’si erkek, %38’i kadındır. [[K3 s. 189]] Daha önce birçok anesteziyi sorunsuz geçiren kişide de görülebilir. [[K3 s. 189]]</li>
<li><b>Kanal.</b> Mekanizmanın tümü bilinmese de kromozom 19’da kodlanan, sarkoplazmik retikulum zarındaki RYR1 ile yakın ilişki vardır. [[K3 s. 189]] Üç ayrı genin kodladığı izoformlardan RYR1 başlıca iskelet kasında, RYR2 kalpte, RYR3 beyindedir. [[K3 s. 189]]</li>
<li><b>Enerji maliyeti.</b> Normalde ana kanal RYR1’den sitoplazmaya geçen depo Ca²⁺’u kasılmayı başlatır. [[K3 s. 189]] Aşırı salınan Ca²⁺’u geri pompalamak ATP tüketimini, dolayısıyla CO₂, ısı ve laktat üretimini artırır. [[K3 s. 189]] Sonunda hücre yıkımı miyoglobinemi ve hiperkalemiye neden olur. [[K3 s. 189]]</li>
<li><b>Tanı.</b> Biyopsi kası %2 halotan ve kafeine (2 mmol/l) verdiği yanıtla değerlendirilir. [[K3 s. 190]] İkisi pozitifse duyarlı (MHS), yalnız biri pozitifse kuşkulu (MHE), ikisi negatifse duyarlı olmayan (MHN) olarak sınıflanır. [[K3 s. 190]]</li>
<li><b>İlaç seçimi.</b> Kitabın güvenli saydığı ilaçlar opioidler, tiyopental, propofol, etomidat, ketamin, benzodiazepinler, atropin, lokal anestezikler ve N₂O’dur. [[K3 s. 190]] Kitap, Birleşik Krallık’ta şüpheli olgular için Leeds’teki MH araştırma birimine sevk önerir. [[K3 s. 190]]</li>
</ul></section>
<section class="wrap blk ders-sec" id="a12b-tedavi">
<h2>Malign hipertermi tedavisi ve dantrolen</h2>
<p class="intro">Dantrolen çizgili kasta riyanodin reseptörüne bağlanır ve retikulumdan Ca²⁺ salınımını engelleyerek elektriksel uyarı ile kasılmayı birbirinden ayırır. [[K3 s. 190]]</p>
<div class="viz"><div class="viz-head"><h3>İki ilaç kasın neresinde etkilidir?</h3></div><div data-viz="a12b_hedef"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel ilaç karşılaştırması. [[K3 s. 187]] [[K3 s. 190]]</p></div>
<ul class="ozet">
<li><b>Şüpheli MH’de doz.</b> Kitabın tedavi özeti intravenöz dantroleni 1 mg/kg artışlarla 10 mg/kg’a kadar tarif eder. [[K3 s. 189]] Ayrıntılı ilaç bölümünde başlangıç 2.5 mg/kg’dır, metabolik bulgular düzelmeye başlayana kadar her 5 dakikada 1 mg/kg verilir. [[K3 s. 190]] Burada kesin üst sınır belirtilmez, ancak 10 mg/kg üzerindeki ek yarar çok azdır. [[K3 s. 190]]</li>
<li><b>Eşzamanlı tedavi.</b> Agresif soğutma için mesane ve açıksa periton buz gibi soğuk serum fizyolojikle yıkanır. [[K3 s. 189]] Biyokimyasal ve hematolojik bozukluklar düzeltilir. [[K3 s. 189]] Nüks olabileceğinden yoğun bakımda tedaviye belirtiler tamamen düzelene kadar devam edilir. [[K3 s. 189]]</li>
<li><b>Sonuç.</b> Dantrolenin 1979’da kullanıma girmesinden önce mortalite %70’e ulaşabiliyordu. [[K3 s. 189]] Kitap tedaviyle mortaliteyi %5’in altında bildirir. [[K3 s. 189]]</li>
<li><b>Kullanım alanları.</b> MH tedavisi ve profilaksisi, nöroleptik malign sendrom, istemli kasların kronik spastisitesi ve ecstasy zehirlenmesi. [[K3 s. 190]]</li>
<li><b>Sunum.</b> Kapsül ve turuncu toz içeren flakon bulunur. [[K3 s. 190]] Her flakonda 20 mg dantrolen, 3 g mannitol ve sodyum hidroksit vardır. [[K3 s. 190]] 60 ml suyla hazırlanan çözeltinin pH’sı 9.5’tir. [[K3 s. 190]] Ekstravazasyon belirgin irritasyon yapar, mannitol nedeniyle intravenöz uygulamayı diürez izler. [[K3 s. 190]]</li>
<li><b>Seçicilik.</b> Damar düz kası ve kalp kası kasılmak için öncelikle depo Ca²⁺ salınımına dayanmadığından genellikle etkilenmez. [[K3 s. 190]] Dantrolen kas aksiyon potansiyelini değiştirmez, nondepolarizan gevşeticilerin klinik etki süresini genellikle çok az etkiler. [[K3 s. 190]]</li>
<li><b>Yan etkiler.</b> İskelet kasındaki güçsüzlük solunum yetmezliğine yol açabilir. [[K3 s. 190]] Kronik kullanım hepatit ve plevral efüzyonla ilişkilidir. [[K3 s. 190]]</li>
<li><b>Kinetik.</b> Oral biyoyararlanım değişkendir, plazmada yaklaşık %85’i albümine bağlanır. [[K3 s. 190]] Karaciğerde metabolize edilir ve idrarla atılır. [[K3 s. 190]]</li>
</ul></section>
<section class="wrap blk ders-sec" id="a12b-apne">
<h2>Uzamış blok ve dibukain sayısı</h2>
<p class="intro">Kalıtsal veya edinilmiş düşük plazma kolinesteraz aktivitesi, süksametonyum bloğunu uzatabilir. [[K3 s. 190]] Dibukain sayısı enzimin genetik özelliğini gösterir. [[K3 s. 191]]</p>
<div class="viz"><div class="viz-head"><h3>Aynı dibukain sayısı, farklı blok süresi?</h3></div><div data-viz="a12b_dibukain"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Çubuk benzilkolinle ölçülen inhibisyon yüzdesini gösterir. [[K3 s. 191]]</p></div>
<ul class="ozet">
<li><b>Genetik.</b> Tek amino asit değişimleri enzim aktivitesini değiştirebilir. [[K3 s. 190]] Kromozom 3’te tek lokustaki olağan (Eu), dibukaine dirençli atipik (Ea), sessiz (Es, enzim yok) ve florüre dirençli (Ef) aleller 10 genotip oluşturur. [[K3 s. 190–191]]</li>
<li><b>Süre.</b> Toplumun %96’sı Eu homozigottur ve ilacı hızla metabolize eder. [[K3 s. 190]] Heterozigotluk %4’e kadar görülebilir ve blok 10 dakikaya kadar uzayabilir. [[K3 s. 190]] Çok seyrek genotiplerde blok birkaç saat sürebilir. [[K3 s. 190–191]]</li>
<li><b>Destek.</b> Kendiliğinden çözülmeye kadar sedasyon ve ventilasyon uygulanabilir. [[K3 s. 191]] Kitap diğer seçenek olarak enzim sağlayan taze donmuş plazmayla bloğun geri döndürülebileceğini belirtir. [[K3 s. 191]]</li>
<li><b>Ölçüm.</b> Amid tipi lokal anestezik dibukain (sinkokain) normal enzimi varyantlardan daha güçlü inhibe eder. [[K3 s. 191]] Benzilkolin substratıyla 10⁻⁵ mol/l dibukain kullanıldığında inhibisyon Eu:Eu için %80, Ea:Ea için %20’dir. [[K3 s. 191]] Diğer ölçülebilen değerler %20–80 aralığındadır. [[K3 s. 191]] Bu yüzdeye dibukain sayısı denir, plazmadaki enzim miktarı bu testle ölçülmez. [[K3 s. 191]]</li>
</ul>
<div class="tbl-wrap"><table class="tbl a12b-gen"><caption>Genotipe göre sıklık, blokta uzama (+ işaretleri) ve dibukain sayısı. [[K3 s. 191]]</caption>
<thead><tr><th>Genotip</th><th>Sıklık</th><th>Blok</th><th>Dibukain sayısı</th></tr></thead><tbody>
${[['Eu:Eu','%96','Normal','80'],['Eu:Ea','1:25','+','60'],['Eu:Es','1:90','+','80'],['Eu:Ef','1:200','+','75'],['Ea:Ea','1:2800','++++','20'],['Ea:Ef','1:20000','++','50'],['Es:Ea','1:29000','++++','20'],['Es:Es','1:100000','++++','−'],['Ef:Es','1:150000','++','60'],['Ef:Ef','1:154000','++','70']].map(([g,f,b,d])=>`<tr><th scope="row">${g}</th><td>${f}</td><td>${b}</td><td>${d}</td></tr>`).join('')}
</tbody></table></div>
<h3>Aktiviteyi azaltabilen edinilmiş etkenler</h3><ul class="ozet">
<li>Gebelik, karaciğer hastalığı, böbrek veya kalp yetmezliği, tirotoksikoz ve kanser. [[K3 s. 191]]</li>
<li>İlaçlar doğrudan ya da asetilkolinesteraz substratı veya inhibitörü olarak etki edebilir. [[K3 s. 191]] Kitap metoklopramid, ketamin, oral kontraseptif, lityum, lidokain, ester tipi lokal anestezikler, sitotoksik ajanlar, edrofonyum, neostigmin ve trimetafanı sayar. [[K3 s. 191]]</li></ul></section>

<section class="wrap blk ders-sec" id="a12b-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
<div class="viz"><div data-viz="mtf" data-q="far12b-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far12b-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far12b-3"></div></div></section>
<section class="wrap blk ders-sec" id="a12b-p2"><h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Süksametonyum nasıl blok oluşturur? Blok beklenenden uzun sürerse bunu nasıl açıklar, dibukain sayısını nasıl yorumlar ve hastayı nasıl desteklersiniz?</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Nikotinik reseptör uyarısı depolarizasyonu sürdürür, yakındaki Na⁺ kanalları inaktive olur ve yeni aksiyon potansiyeli iletilemez. [[K3 s. 187]]</li>
<li>Blok süresi plazmadaki hidrolize bağlıdır. [[K3 s. 187]] Genetik varyantlar veya edinilmiş nedenler enzim aktivitesini azaltabilir. [[K3 s. 190–191]]</li>
<li>Dibukain sayısı yüzde inhibisyondur: Eu:Eu’da 80, Ea:Ea’da 20’dir. [[K3 s. 191]] Enzim miktarını göstermez. [[K3 s. 191]]</li>
<li>Kendiliğinden düzelene kadar sedasyon ve ventilasyon uygulanabilir. [[K3 s. 191]] Kitap enzim kaynağı olarak taze donmuş plazmayı da belirtir. [[K3 s. 191]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Plazma ile kavşağı çizin. İlk dozun kavşağa ulaşan kısmını, depolarizasyon bölgesini ve plazma hidrolizinden sonra gradyanın yönünü işaretleyin. [[K3 s. 187]]</div><div class="note plain"><b>Olası ek sorular.</b> Faz I ile Faz II’yi 1 Hz uyarıyla nasıl ayırırsınız? [[K3 s. 187]] Yanıkta K⁺ yanıtı neden değişir? [[K3 s. 188]] MH’de dantrolen hangi basamağı etkiler? [[K3 s. 189–190]]</div></div></section>
<section class="wrap blk ders-sec" id="a12b-ozet"><h2>Özet</h2><ul class="ozet">
<li>İlk intravenöz dozun %20’si kavşağa ulaşır, hidroliz hızı blok süresini belirler. [[K3 s. 187]]</li>
<li>Kavşak dışı reseptörlerin çoğalması ani, ağır hiperkalemiye zemin hazırlar. [[K3 s. 188]]</li>
<li>MH’de aşırı Ca²⁺ salınımı rijiditeye, geri taşınması artmış ATP tüketimine yol açar. [[K3 s. 189]] Dantrolen salınımı engeller. [[K3 s. 190]]</li>
<li>Dibukain sayısı genetik varyantı değerlendirmeye yardım eder, aynı sayı farklı blok süreleriyle görülebilir. [[K3 s. 191]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="12b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/12a">← 12a · Nöromüsküler kavşak ve blok monitörizasyonu</a><a href="#/dersler/farmakoloji/12c">Sonraki: 12c · Nondepolarizan kas gevşeticiler →</a></nav></section>`,
};
