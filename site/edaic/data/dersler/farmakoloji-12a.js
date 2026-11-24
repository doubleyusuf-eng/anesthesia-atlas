VERI.sorular = VERI.sorular || {};
VERI.sorular['far12a-1'] = {
  no: 1, kok: 'Nöromüsküler kavşakta iletim', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 182–183]]',
  onermeler: [
    {t:'En plaque innervasyonda kas lifine çok sayıda Aγ terminali gelir.', d:false, n:'En plaque lifte hızlı bir Aα nöronunun tek terminali vardır. [[K3 s. 182]]'},
    {t:'İlk ACh molekülünün bağlanması ikinci α alt biriminin ACh’ye afinitesini artırır.', d:true, n:'İlk bağlanma ikinci bağlanmayı kolaylaştırır. [[K3 s. 182]]'},
    {t:'Nikotinik reseptörün kanalı yalnız Na⁺ geçirir.', d:false, n:'Kanal Na⁺ yanında K⁺ ve Ca²⁺ da geçirir. [[K3 s. 183]]'},
    {t:'Asetilkolinesterazın esteratik bölgesi ACh’nin ester grubunu bağlar.', d:true, n:'Ester grubunu esteratik bölge, kuaterner amonyumu anyonik bölge tutar. [[K3 s. 183]]'},
    {t:'Kasılmayı başlatan Ca²⁺ kas lifinde sinaptik veziküllerden salınır.', d:false, n:'T tübüllerine ulaşan uyarı, sarkoplazmik retikulumdan Ca²⁺ salınmasını sağlar. [[K3 s. 183]]'}
  ]
};
VERI.sorular['far12a-2'] = {
  no: 2, kok: 'Sinir stimülatörü, tek seğirme, tetani ve posttetanik sayım', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 184–185]]',
  onermeler: [
    {t:'Negatif elektrot doğrudan sinir üzerine yerleştirilir.', d:true, n:'Negatif elektrot doğrudan sinir üzerine, pozitif elektrot kası etkileyemeyeceği bir yere konur. [[K3 s. 184]]'},
    {t:'Tek seğirmeyi yorumlamak için başlangıç yüksekliği bilinmelidir.', d:true, n:'Azalma, blok öncesi seğirme yüksekliğine göre değerlendirilir. [[K3 s. 184]]'},
    {t:'Kısmi depolarizan blokta tetanik yanıt zamanla söner.', d:false, n:'Yanıtın kuvveti azalır ama tetani boyunca korunur. [[K3 s. 185]]'},
    {t:'Posttetanik sayımda daha fazla seğirme, daha derin bloğu gösterir.', d:false, n:'Seğirme sayısı ile blok derinliği ters orantılıdır. [[K3 s. 185]]'},
    {t:'Tetanik uyarı sonraki TOF değerlendirmesini etkileyebilir.', d:true, n:'Altı dakikaya kadar sürebilen etki, bloğu olduğundan yüzeyel gösterebilir. [[K3 s. 185]]'}
  ]
};
VERI.sorular['far12a-3'] = {
  no: 3, kok: 'Dörtlü ve çift patlamalı uyarının yorumu', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 186]]',
  onermeler: [
    {t:'TOF oranı ilk seğirme yüksekliğinin dördüncüye bölünmesiyle bulunur.', d:false, n:'Payda T1, pay T4 yüksekliğidir. [[K3 s. 186]]'},
    {t:'TOF sayımı, dörtlü uyarının oluşturduğu seğirmelerin sayısıdır.', d:true, n:'Yanıt sayısı derin nondepolarizan bloğun derecesini değerlendirmeye yarar. [[K3 s. 186]]'},
    {t:'Kısmi depolarizan blokta TOF oranı 1’dir.', d:true, n:'Dört seğirme küçülse de yükseklikleri eşit kalır. [[K3 s. 184]] [[K3 s. 186]]'},
    {t:'DBS’de iki uyarı patlaması arasında 0,75 saniye vardır.', d:true, n:'Patlamalar arası süre 0,75 saniye, bir patlama içindeki uyarılar arası süre 20 milisaniyedir. [[K3 s. 186]]'},
    {t:'Mekanik ölçümde DBS’nin duyarlılığı TOF’yi aşmaz.', d:true, n:'DBS’nin amacı küçük rezidüel bloğun elle fark edilmesini kolaylaştırmaktır. [[K3 s. 186]]'}
  ]
};

const A12A_NAV = [['kavsak','Kavşak'],['iletim','ACh döngüsü'],['uyari','Uyarı ve sönme'],['tof','TOF ve DBS'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
SAYFALAR['dersler/farmakoloji/12a'] = {
  grup:'dersler', eyebrow:'Farmakoloji · Kısım 2 · Bölüm 12 · Ders 12a', baslik:'Nöromüsküler kavşak ve blok monitörizasyonu',
  lede:'Bir kas seğirmesi ne zaman küçülür? Art arda gelen seğirmeler hangi blokta söner? Sinir ucundaki asetilkolinden başlayıp kasın uyarıya verdiği yanıtı izleyin. [[K3 s. 182–186]]',
  html:`
<nav class="wrap ders-nav" aria-label="Bu derste">${A12A_NAV.map(([id,ad],i)=>`<button type="button" data-scroll="a12a-${id}"><span>${i+1}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a12a-kavsak">
<h2>Motor sinir kas lifine nerede ulaşır?</h2>
<p class="intro">Nöromüsküler kavşakta motor nöron, iskelet kası lifine kimyasal yolla sinyal iletir. [[K3 s. 182]]</p>
<div class="viz"><div class="viz-head"><h3>Kas lifi üzerinde sinir uçları</h3></div><div data-viz="a12a_uc"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel innervasyon haritası. [[K3 s. 182]]</p></div>
<ul><li><b>En plaque.</b> Hızlı Aα nöronunun son kısa parçası miyelinsizdir ve tek terminali lifin ortasındaki yüzey oluğuna yerleşir. [[K3 s. 182]]</li>
<li><b>En grappe.</b> İntraoküler kaslarda, intrinsik larenks kaslarında ve bazı yüz kaslarında daha yavaş Aγ nöronlarının terminalleri yüzeye dağılır. [[K3 s. 182]] Kasılma için uyarı dalgasının bütün terminallere yayılması gerekir. [[K3 s. 182]]</li></ul>
<p>Postsinaptik zarın çok sayıdaki kıvrımının omuzlarında nikotinik asetilkolin (ACh) reseptörleri kümelenir. [[K3 s. 182]] ACh’yi hidroliz eden asetilkolinesteraz (AChE) ise yarıklarda bulunur. [[K3 s. 182–183]]</p>
</section>
<section class="wrap blk ders-sec" id="a12a-iletim">
<h2>Bir sinir impulsundan kasılmaya</h2>
<p class="intro">Sinir ucuna giren Ca²⁺ ACh salınımını, kas lifinde sarkoplazmik retikulumdan salınan Ca²⁺ ise kasılmayı başlatır. [[K3 s. 182–183]]</p>
<div class="viz"><div class="viz-head"><h3>ACh’nin izlediği yol</h3></div><div data-viz="a12a_dongu"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel süreç. [[K3 s. 182–183]]</p></div>
<div class="cols"><div class="card"><h3>Sentez ve depolama</h3><p>Aksoplazmada asetil-koenzim A ile kolinden ACh sentezlenir ve küçük sinaptik veziküllere taşınır. [[K3 s. 182]] Kolin hem besinlerden hem parçalanan ACh’den sağlanır. [[K3 s. 182]]</p><p>Bir aksiyon potansiyeli yaklaşık 200 vezikülün içeriğini boşaltır ve her vezikülde yaklaşık 10 000 ACh molekülü bulunur. [[K3 s. 182]]</p></div>
<div class="card"><h3>Reseptör ve kanal</h3><p>Erişkin nikotinik reseptörü, beş alt birimli (2α, β, ε, δ), 250 000 Da’lık integral zar proteinidir. [[K3 s. 182]] İki α alt biriminin her biri 40 000 Da’dır ve ilk ACh’nin bağlanması ikincinin ACh’ye afinitesini artırır. [[K3 s. 182]]</p><p>ACh ve tüm nöromüsküler blokerlerde α alt birimine çekilen grup kuaterner azottur [−N⁺(CH₃)₃]. [[K3 s. 182–183]]</p></div></div>
<p><b>Reseptör akımından aksiyon potansiyeline.</b> İki α alt birimine ACh bağlanınca merkezi kanal açılır. [[K3 s. 182]] Na⁺, K⁺ ve Ca²⁺ geçişiyle oluşan minyatür son plak potansiyelleri toplanır. [[K3 s. 183]] Eşiğe ulaşılınca voltaj kapılı Na⁺ kanalları açılır ve hızlı depolarizasyon kas yüzeyi boyunca yayılan aksiyon potansiyelini doğurur. [[K3 s. 183]]</p>
<p><b>İletimin sonlanması.</b> AChE’nin anyonik bölgesi ACh’nin pozitif kuaterner amonyumuna, esteratik bölgesi ester grubuna bağlanır. [[K3 s. 183]] Kolin ayrıldığında enzim asetillenmiş kalır ve hızla hidrolize uğrayarak asetik asit açığa çıkarır. [[K3 s. 183]]</p>
</section>
<section class="wrap blk ders-sec" id="a12a-uyari">
<h2>Uyarıyı verin, kas yanıtını okuyun</h2>
<p class="intro">Beş temel uyarı örüntüsü, motor siniri uyardıktan sonra kasın nasıl kasıldığını izleyerek bloğu değerlendirmeyi sağlar. [[K3 s. 184]]</p>
<div class="viz"><div class="viz-head"><h3>Aynı uyarı dizisi, farklı blok</h3></div><div data-viz="a12a_sonme"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel kas yanıtları. [[K3 s. 184–186]]</p></div>
<div class="tbl-wrap"><table class="tbl"><caption>Kısmi blokta kas yanıtını karşılaştırma</caption>
<thead><tr><th scope="col">Uyarı</th><th scope="col">Depolarizan blok</th><th scope="col">Nondepolarizan blok</th></tr></thead>
<tbody><tr><th scope="row">Dörtlü uyarı</th><td>Dört seğirme de küçülür, yükseklikleri eşit kalır. [[K3 s. 184]]</td><td>Ardışık seğirmeler küçülür, T4 ilk yanıttan düşüktür. [[K3 s. 184]] [[K3 s. 186]]</td></tr>
<tr><th scope="row">Tetani</th><td>Kuvvet azalır ve uyarı boyunca aynı düzeyde kalır. [[K3 s. 185]]</td><td>Süren uyarıya rağmen kasılma kuvveti giderek azalır. [[K3 s. 185]]</td></tr>
<tr><th scope="row">Tetani sonrası</th><td>Sonraki seğirmelerde güçlenme görülmez. [[K3 s. 184–185]]</td><td>Tekrarlanan dörtlü uyarının yanıtları geçici olarak güçlenir. [[K3 s. 184–185]]</td></tr></tbody></table></div>
<p><b>Kurulum.</b> Tüm sinir liflerini depolarize etmek için 60–80 mA supramaksimal akım ve 0,1 milisaniyelik uyarı kullanılır. [[K3 s. 184]] Negatif elektrodu doğrudan sinir üzerine, pozitif elektrodu ise kası etkilemeyeceği yere koyun. [[K3 s. 184]]</p>
<div class="cols"><div class="card"><h3>Tek seğirme</h3><p>En basit yöntemde, seğirme yüksekliği blok öncesi değerle karşılaştırılır. [[K3 s. 184]] Kısmi depolarizan ve nondepolarizan blok yanıtı küçültür, ancak reseptör işgali %75’e ulaşıncaya kadar yükseklik korunur. [[K3 s. 184]] Bu güvenlik payı, kas aksiyon potansiyelini başlatan toplam son plak potansiyeli için az sayıda reseptörün yetmesinden kaynaklanır. [[K3 s. 184]]</p></div>
<div class="card"><h3>Tetani</h3><p>Frekans 30 Hz’yi aşınca seğirmeler birleşir ve kasılma sürekli hâle gelir. [[K3 s. 185]] Kasın elastik direncini her seğirmede yeniden yenmek gerekmediğinden yanıt tek seğirmeden güçlü olabilir. [[K3 s. 185]] Çoğu cihaz en yüksek duyarlılık için 50 Hz’de 0,1 milisaniyelik uyarılar verir. [[K3 s. 185]]</p></div></div>
<p>Presinaptik ACh reseptörlerinin pozitif geri bildirimi, yoğun aktivitede ACh mobilizasyonunu ve salınımını sürdürür. [[K3 s. 183]] [[K3 s. 185]] Nondepolarizan gevşeticilerin bu reseptörleri bloke etmesi sönmeyi açıklayabilir. [[K3 s. 183]]</p>
<h3>Tek seğirme ve TOF sessizse</h3>
<ul><li><b>Posttetanik potansiyasyon.</b> Tetani sonrası seğirmelerin güçlenmesi, ACh sentezi ve mobilizasyonunun artmasına ve/veya sinir ucunda Ca²⁺ artışına bağlı olabilir. [[K3 s. 185]]</li>
<li><b>Posttetanik sayım.</b> Tetaniden 3 saniye sonra 1 Hz uyarıya başlayın ve seğirmeleri sayın. [[K3 s. 185]] Sayı azaldıkça blok derinleşir. [[K3 s. 185]] Sayım en çok, reseptör işgali %95’i aştığında ve tek seğirme ya da dörtlü uyarıyla yanıt alınamadığında işe yarar. [[K3 s. 185]]</li>
<li><b>Zamanlama.</b> Tetaninin etkisi 6 dakikaya kadar sürebilir ve ardından yapılan tek seğirme veya TOF ölçümü bloğu olduğundan yüzeyel gösterebilir. [[K3 s. 185]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a12a-tof">
<h2>Dörtlü uyarıda yükseklik ve sayı</h2>
<p class="intro">Dörtlü uyarıda (TOF) dört kez, 2 Hz frekansta, 0,1 milisaniyelik uyarı verilir ve başlangıç seğirme yüksekliğini bilmek gerekmez. [[K3 s. 186]]</p>
<div class="viz"><div class="viz-head"><h3>Nondepolarizan blok derinleşirken</h3></div><div data-viz="a12a_tof"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel yükseklikler. Reseptör işgali basamakları çevirideki değerlerdir. [[K3 s. 186]]</p></div>
<ul><li><b>Oran.</b> Dördüncü seğirme yüksekliğini ilkine bölün (T4/T1). [[K3 s. 186]] Oranı pratikte değerlendirmek güçtür. [[K3 s. 186]]</li>
<li><b>Sayım.</b> Yanıt veren seğirmelerin sayısı derin nondepolarizan blok hakkında bilgi verir. [[K3 s. 186]]</li></ul>
<p><b>Sönme nerede başlar?</b> Reseptör işgali %70’i geçtiğinde T4 küçülmeye başlar. [[K3 s. 186]] T4 yüksekliğinin dörtte birini kaybettiğinde T1 de küçülmeye başlar ve işgal %75–80’e ulaşmıştır. [[K3 s. 186]]</p>
<p><b>Yanıt ne zaman kaybolur?</b> T1 başlangıcın yaklaşık dörtte birine indiğinde T4 kaybolur ve reseptör işgali %90’ı aşmıştır. [[K3 s. 186]] İşgal %95 olduğunda yalnız ilk uyarının yanıtı seçilebilir. [[K3 s. 186]]</p>
<h3>Çift patlamalı uyarı (DBS)</h3>
<p>İki patlama arasında 0,75 saniye vardır. [[K3 s. 186]] Her patlamada 20 milisaniye arayla (50 Hz) üç uyarı verilir ve her uyarı 0,2 milisaniye sürer. [[K3 s. 186]]</p>
<p>Amaç, hafif rezidüel bloğu elle fark etmeyi kolaylaştırmaktır. [[K3 s. 186]] Kitap iki yanıtın eşitliğini klinik olarak anlamlı rezidüel blok bulunmadığı şeklinde yorumlar ve mekanik ölçümde DBS’nin TOF’den daha duyarlı olmadığını belirtir. [[K3 s. 186]]</p>
<div class="note plain"><b>Atlas notu.</b> Kitap iki DBS yanıtının eşitliğini anlamlı rezidüel bloğun yokluğu olarak yorumlar. Doğrusu, elle eşit hissedilen iki yanıt rezidüel bloğu güvenle dışlayamaz.</div>
</section>
<section class="wrap blk ders-sec" id="a12a-p1"><h2>Part I · MTF</h2><p>Her önermeyi doğru veya yanlış olarak değerlendirin.</p>
<div data-viz="mtf" data-q="far12a-1"></div><div data-viz="mtf" data-q="far12a-2"></div><div data-viz="mtf" data-q="far12a-3"></div></section>
<section class="wrap blk ders-sec" id="a12a-p2"><h2>Part II · SOE 2 (farmakoloji)</h2>
<div class="card soe-soru"><h3>Açılış sorusu</h3><p>Kısmi blokta tek seğirme küçüldü. Blok türünü ayırmak için neyi karşılaştırırsınız? Blok derinleşip TOF yanıtı kaybolursa nasıl ilerlersiniz?</p></div>
<ol class="iskelet">
<li>Tek seğirme için başlangıç yüksekliği gerekir ve her iki blok türü de seğirmeyi küçültür. [[K3 s. 184]]</li>
<li>Kısmi depolarizan blokta dört yanıt eşit küçülür ve T4/T1 oranı 1 kalır. [[K3 s. 184]] [[K3 s. 186]] Tetanik yanıt sönmez, posttetanik potansiyasyon görülmez. [[K3 s. 185]]</li>
<li>Kısmi nondepolarizan blokta TOF ve tetanik yanıtta sönme görülür. [[K3 s. 184–186]] Presinaptik geri bildirimin engellenmesi ACh mobilizasyonunu sınırlar. [[K3 s. 185]]</li>
<li>TOF sayımı derin nondepolarizan bloğu değerlendirir ve %95 reseptör işgalinde yalnız T1 kalır. [[K3 s. 186]]</li>
<li>TOF yanıtı yoksa tetaniden 3 saniye sonra 1 Hz’de alınan yanıtları sayın. [[K3 s. 185]] Daha az seğirme daha derin bloğa işaret eder ve tetani sonraki ölçümleri 6 dakikaya kadar etkileyebilir. [[K3 s. 185]]</li></ol>
<p class="note"><b>Çizin.</b> Kontrol ve iki kısmi blok için yan yana TOF, tetani ve tetani sonrası TOF yanıtlarını çizin. [[K3 s. 184–185]]</p>
<p><b>Olası ek sorular</b> İlk seğirme neden geç küçülür? DBS’de uyarılar nasıl gruplanır? AChE, ACh’nin hangi gruplarını bağlar?</p></section>
<section class="wrap blk ders-sec" id="a12a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Sinir ucunda Ca²⁺ girişi ACh dolu veziküllerin boşalmasını tetikler. [[K3 s. 182]]</li>
<li>Son plakta eşik aşılınca voltaj kapılı Na⁺ kanalları açılır ve uyarı kas yüzeyinde yayılır. [[K3 s. 183]]</li>
<li>Tek seğirme hem depolarizan hem nondepolarizan blokta küçülür. [[K3 s. 184]]</li>
<li>Kısmi nondepolarizan blokta T4, T1’den küçüktür. [[K3 s. 186]]</li>
<li>Tek seğirme ve TOF kayıpsa posttetanik sayım derin bloğu değerlendirmeye yardım eder. [[K3 s. 185]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="12a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/11b">← 11b · Tek tek lokal anestezikler</a><a href="#/dersler/farmakoloji/12b">Sonraki: 12b · Depolarizan kas gevşeticiler →</a></nav>
</section>`
};
