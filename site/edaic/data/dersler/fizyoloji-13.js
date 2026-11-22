/* Fizyoloji Bölüm 13 · Spirometri (K1 İngilizce baskı s. 56–62).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. Bileşen tarifleri: docs/tasarim/fiz13.md */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz13-1'] = {
  no: 1, kok: 'Zorlu spirometri ve spirometreyle ölçülen değişkenler için:', kagit: 'Paper A · fizyoloji, Bölüm 13', kaynak: '[[K1 s. 56–57]]',
  onermeler: [
    { t: 'Pnömotakograf, hacim algılayan bir spirometredir.', d: false, n: 'Yanlış. Pnömotakograf akım algılayan bir spirometredir ve kolay taşınır; hacim algılayan cihaza örnek, körük düzeneğiyle çalışan vitalograftır. [[K1 s. 56]]' },
    { t: 'FEV₁ ve FVC; yaş, cinsiyet, boy ve etnik köken bakımından eşleştirilmiş sağlıklı bireylere dayanan beklenen değerlerle karşılaştırılır.', d: true, n: 'Doğru. İki parametre de ölçülür ve “beklenen” değerlerle karşılaştırılır; FEV₁/FVC oranı ise bu ikisinden hesaplanır. [[K1 s. 56]]' },
    { t: 'Fonksiyonel rezidüel kapasite, basit spirometriyle doğrudan ölçülebilir.', d: false, n: 'Yanlış. FRC rezidüel hacmi içerir; rezidüel hacim tam ekspirasyondan sonra akciğerde kalan gazdır ve spirometreye hiç verilmez. Bu yüzden RV, FRC ve TLC spirometriyle ölçülemez; FRC gaz dilüsyonu, vücut pletismografisi ya da N₂ yıkamayla hesaplanır. [[K1 s. 52, 56]]' },
    { t: 'Tepe ekspiratuvar akım hızı, zorlu ekspiratuvar hacim–zaman eğrisinin başlangıç eğimine karşılık gelir.', d: true, n: 'Doğru. Akım birim zamandaki hacimdir, yani hacim–zaman eğrisinin eğimi akımı verir; en yüksek akım eğrinin başlangıçtaki eğimidir. Uygulamada PEFR daha çok ayrı bir tepe akım ölçerle ölçülür. [[K1 s. 56–57]]' },
    { t: 'FVC’si düşük bir hastada FEV₁’in de düşük olması, tek başına obstrüktif bir hastalığı göstermez.', d: true, n: 'Doğru. FVC küçükse dışarı atılacak gaz da azdır ve FEV₁ bu yüzden düşer. FEV₁/FVC oranı bu göreli farkı ortaya koymak için kullanılır. [[K1 s. 56]]' },
  ],
};
VERI.sorular['fiz13-2'] = {
  no: 2, kok: 'Obstrüktif ve restriktif akciğer hastalığında zorlu spirometri için:', kagit: 'Paper A · fizyoloji, Bölüm 13', kaynak: '[[K1 s. 57]]',
  onermeler: [
    { t: 'Kitabın tanı ölçütlerine göre obstrüktif hava yolu hastalığında FEV₁ beklenen değerin %80’inden azdır ve FEV₁/FVC oranı 0,7’nin altındadır.', d: true, n: 'Doğru. İki ölçüt birlikte aranır; hastalığın şiddeti FEV₁’in beklenen değere oranıyla derecelendirilir. [[K1 s. 57]]' },
    { t: 'Restriktif akciğer hastalığında FEV₁/FVC oranı tipik olarak 0,7’nin altına düşer.', d: false, n: 'Yanlış. Restriktif hastalıkta FEV₁ ve FVC birlikte azalır, oran 0,7’nin üstünde kalır: normal ya da yüksektir. Yüksek oranın nedeni sert akciğerin artmış elastik geri çekilmesidir (Atlas notu). [[K1 s. 57]]' },
    { t: 'Bronkodilatörden 15 dakika sonra FEV₁’de 400 mL düzelme, astımı düşündüren anlamlı geri dönüşümlülük olarak kabul edilir.', d: true, n: 'Doğru. Zorlu spirometri bronkodilatörden önce ve 15 dakika sonra yapılır; kitap 400 mL’lik düzelmeyi anlamlı geri dönüşümlülük ve astım lehine bulgu sayar. [[K1 s. 57]]' },
    { t: 'PEFR’nin gün içinde %20’den fazla değişmesi KOAH’ı düşündürür.', d: false, n: 'Yanlış. Gün içi %20’nin üzerindeki değişkenlik astımı düşündürür. PEFR daha çok hastanın başlangıçtaki solunum işlevini alevlenme sırasındakiyle karşılaştırmak için kullanılır. [[K1 s. 57]]' },
    { t: 'Astım ile KOAH ayrımı yalnızca FEV₁/FVC oranına dayanır.', d: false, n: 'Yanlış. Oran iki hastalıkta da düşüktür. Ayrım öyküye ve obstrüksiyonun bronkodilatörle geri dönüp dönmediğine dayanır; kısmen geri dönen, iki hastalığın özelliklerini birlikte taşıyan tabloya astım–KOAH örtüşme sendromu (ACOS) denir. [[K1 s. 57]]' },
  ],
};
VERI.sorular['fiz13-3'] = {
  no: 3, kok: 'Akım–hacim eğrileri ve halkaları için:', kagit: 'Paper A · fizyoloji, Bölüm 13', kaynak: '[[K1 s. 58–61]]',
  onermeler: [
    { t: 'Ekspiratuvar akım–hacim eğrisinin başlangıçtan PEFR’ye kadar olan bölümü efordan bağımsızdır.', d: false, n: 'Yanlış. Bu bölüm efora bağımlıdır: ekspiratuvar kasların oluşturduğu pozitif intraplevral basınç ne kadar büyükse PEFR ve FEV₁ o kadar büyüktür. Efordan bağımsız olan, dinamik hava yolu kompresyonunun sınırladığı ardından gelen azalan bölümdür. [[K1 s. 58–59]]' },
    { t: 'Küçük hava yolu obstrüksiyonu, akım–hacim halkasının inspiratuvar bölümünü belirgin biçimde düzleştirir.', d: false, n: 'Yanlış. Küçük hava yolu obstrüksiyonunda inspirasyon görece etkilenmez; değişen ekspiratuvar bölümdür (PEFR azalır, efordan bağımsız bölüm konkavlaşır, hava hapsiyle rezidüel hacim artabilir). [[K1 s. 60]]' },
    { t: 'Değişken ekstratorasik obstrüksiyonda (ör. vokal kord paralizisi) inspiratuvar akım–hacim eğrisi düzleşirken ekspiratuvar eğri etkilenmez.', d: true, n: 'Doğru. İnspirasyonda trakeadaki atmosfer altı basınç lezyonu içe çeker ve inspiratuvar akımı sınırlar; ekspirasyonda pozitif hava yolu basıncı lezyonu dışa iter. [[K1 s. 60–61]]' },
    { t: 'Değişken intratorasik obstrüksiyonda zorlu ekspirasyon sırasında ekspiratuvar akım–hacim eğrisi düzleşir.', d: true, n: 'Doğru. Zorlu ekspirasyonda pozitif intraplevral basınç dinamik hava yolu kompresyonu yapar, lezyon bunu ağırlaştırır; akım sınırlanır ve efordan bağımsızdır. İnspirasyonda negatif plevral basınç hava yolunu açtığı için inspiratuvar akım etkilenmez. [[K1 s. 61]]' },
    { t: 'Akım–hacim halkasında tidal soluğun ekspirasyon sonu noktası rezidüel hacimdir.', d: false, n: 'Yanlış. Tidal ekspirasyonun bittiği nokta x ekseninde FRC’dir. Rezidüel hacim, zorlu ekspirasyonun sonunda ulaşılan, halkanın sağ ucudur. [[K1 s. 60]]' },
  ],
};

const D13_NAV = [
  ['d13-sft', 'SFT ve spirometri'], ['d13-zorlu', 'Zorlu spirometri'], ['d13-gbs', 'Klinik: GBS'],
  ['d13-akim', 'Akım–hacim eğrisi'], ['d13-bicim', 'Dinamik kompresyon'], ['d13-halka', 'Akım–hacim halkası'],
  ['d13-stridor', 'Klinik: stridor'], ['d13-rezeksiyon', 'Klinik: rezeksiyon'],
  ['d13-p1', 'Part I'], ['d13-p2', 'Part II'], ['d13-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/13'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 13', baslik: 'Spirometri',
  lede: 'Zorlu bir ekspirasyonun kaydından FEV₁, FVC ve PEFR okunur, obstrüktif ve restriktif örüntü ayrılır; akım–hacim halkasının biçimi de hava yolu obstrüksiyonunun yerini gösterir. Bu bölüm eğrinin biçimini açıklayan dinamik hava yolu kompresyonunu ve üç klinik uygulamayı (Guillain–Barré sendromu, stridor, akciğer rezeksiyonu) da işler. [[K1 s. 56–62]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D13_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d13-sft">
  <h2>Solunum fonksiyon testleri: neden, hangi cihazla, neyi ölçer?</h2>
  <p class="intro">Solunum fonksiyon testleri (SFT) tek bir hastanın solunum fizyolojisini sayılarla ortaya koyar; temel araçları spirometrelerdir. [[K1 s. 56]]</p>
  <div class="viz">
    <div class="viz-head"><h3>SFT haritası: neyi sınar, neden yapılır, ne ölçer?</h3></div>
    <div data-viz="f13_sft"></div>
    <p class="viz-cap">Yukarıdan aşağıya okuyun: sınanan dört akciğer bileşeni, üç klinik kullanım, iki spirometre tipi ve üç ölçüm grubu; statik hacim çubuğunun taralı kısmı spirometreye görünmez. [[K1 s. 52, 56]]</p>
  </div>
  <div class="blk-body">
    <p>Bir dizi test ve manevra büyük ve küçük hava yollarını, alveolleri, pulmoner damar yatağını ve solunum kaslarını ayrı ayrı sınar. Klinik kullanımları üçtür: tanı, hastalığın şiddetini derecelendirip farmakolojik tedaviye yön vermek ve cerrahi riski, özellikle toraks cerrahisinde, kestirmek. Spirometreler hacim algılayan (ör. körük düzenekli vitalograf) ve akım algılayan (ör. çok daha kolay taşınan pnömotakograf) olarak ikiye ayrılır. [[K1 s. 56]]</p>
    <p>Statik hacimler için hasta spirometreye önce tidal, sonra vital kapasite soluklarıyla solur. Rezidüel hacim (RV), fonksiyonel rezidüel kapasite (FRC) ve total akciğer kapasitesi (TLC) dışındaki bütün hacim ve kapasiteler böyle ölçülür: RV hiç dışarı verilmez, onu içeren FRC ve TLC de spirometreye görünmez (Bölüm 12). [[K1 s. 52, 56]]</p>
    <p>Dinamik ölçümler havanın akış hızına, yani birim zamandaki hacme bağlıdır: FEV₁, FVC, PEFR, ekspiratuvar akım–hacim eğrisi ve akım–hacim halkaları. Özel testler ayrı yöntemlerdir: difüzyon kapasitesi alveoler difüzyonu ölçer (Bölüm 10), gaz dilüsyonu ve N₂ yıkama FRC’yi hesaplar (Bölüm 12). [[K1 s. 56]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d13-zorlu">
  <h2>Zorlu spirometri: FEV₁, FVC, PEFR ve tanı</h2>
  <p class="intro">Tam inspirasyondan sonra olabildiğince güçlü ve hızlı, akciğerler boşalana dek yapılan tek bir ekspirasyonun hacim–zaman kaydı obstrüktif ve restriktif hastalığı ayırır. [[K1 s. 56–57]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Zorlu ekspirasyon: hacim–zaman eğrisi ve yorum</h3></div>
    <div data-viz="f13_zorlu"></div>
    <p class="viz-cap"><b>Normal.</b> Sağlıklı akciğer FVC’nin yaklaşık beşte dördünü ilk saniyede dışarı atar: FVC ≈ 5 L, FEV₁ ≈ 4 L, FEV₁/FVC = 0,8. Eğrinin başlangıçtaki eğimi PEFR’dir. Hasta örneğini seçip “Üfle” ile kaydı yeniden çizdirin. [[K1 s. 56–57]]</p>
    <p class="viz-foot">Normal değerler kitabın Şekil 13.1’inden [[K1 s. 57]]; tanı ölçütleri, şiddet basamakları ve 400 mL eşiği kitaptandır [[K1 s. 57]]. Astım, KOAH ve restriktif örneklerin sayıları şematiktir; eğri tek üstel bir boşalmayla çizilir.</p>
  </div>
  <div class="blk-body">
    <p>Zorlu spirometri basit bir yatak başı testidir. Ölçülen iki değer, FEV₁ (ilk saniyede atılan hacim) ve FVC (toplam atılan hacim), yaş, cinsiyet, boy ve etnik kökene göre eşleştirilmiş sağlıklı bireylerden gelen “beklenen” değerlerle karşılaştırılır. Hesaplanan FEV₁/FVC oranının 0,7’nin altı anormaldir. Oran göreli farkı gösterir: FVC’si küçük hastanın FEV₁’i de yalnızca atılacak gaz az olduğu için düşüktür; bu tek başına obstrüksiyon demek değildir. [[K1 s. 56]]</p>
    <p>Akım birim zamandaki hacim olduğundan eğrinin başlangıç eğimi PEFR’dir; ama PEFR çoğunlukla ayrı bir cihazla, tepe akım ölçerle ölçülür. [[K1 s. 56–57]]</p>
  </div>
  <div class="tbl-wrap" style="margin:14px 0">
    <table class="tbl">
      <thead><tr><th>Ölçüt</th><th>Obstrüktif<br><span class="small muted">astım, KOAH</span></th><th>Restriktif<br><span class="small muted">akciğer fibrozisi, kifoskolyoz, solunum kası güçsüzlüğü</span></th></tr></thead>
      <tbody>
        <tr><th>FEV₁</th><td>&lt; %80 beklenen</td><td>&lt; %80 beklenen</td></tr>
        <tr><th>FVC</th><td>ölçüt değil</td><td>&lt; %80 beklenen</td></tr>
        <tr><th>FEV₁/FVC</th><td>&lt; 0,7</td><td>&gt; 0,7: “normal”, hatta “yüksek” (kitaba göre azalmış pulmoner kompliyansla artan FEV₁) [[K1 s. 57]]</td></tr>
        <tr><th>Şiddet (FEV₁)</th><td>hafif %50–79 · orta %30–49 · ağır &lt; %30 [[K1 s. 57]]</td><td>–</td></tr>
      </tbody>
    </table>
  </div>
  <div class="blk-body">
    <p>PEFR’nin gün içinde %20’den fazla değişmesi astımı düşündürür, ama PEFR daha çok hastanın başlangıçtaki solunum işlevini alevlenmedekiyle karşılaştırmaya yarar. Astım–KOAH ayrımı öyküye ve geri dönüşümlülüğe dayanır: spirometri bronkodilatörden önce ve 15 dakika sonra yapılır; FEV₁’de 400 mL düzelme anlamlı geri dönüşümlülüktür ve astımı düşündürür. [[K1 s. 57]]</p>
    <p>Çoğu 40 yaşın üzerindeki bazı hastalarda yalnız kısmen geri dönen kronik obstrüksiyon, astım ve KOAH özellikleriyle birliktedir: astım–KOAH örtüşme sendromu (ACOS). Astımdan KOAH’a uzanan yelpazede bir ara durum olabilir. [[K1 s. 57]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu · kitaptaki iki ifade.</b> Kitap restriktif ölçütlerin ilkini “FVC₁ &lt; %80” diye yazar; FVC sonraki satırda ayrıca geçtiğinden kastedilen FEV₁ &lt; %80’dir. “Artan FEV₁” de mutlak değer değil FEV₁’in küçülmüş FVC içindeki payıdır: sert akciğerin elastik geri çekilmesi ve hava yollarını açık tutan radyal çekim yüksek olduğundan küçük vital kapasitenin büyük bölümü ilk saniyede atılır.</div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu · güncel kılavuzlar.</b> Kitabın şiddet basamakları eskidir: KOAH’ta GOLD, bronkodilatör sonrası FEV₁/FVC &lt; 0,7 olan hastada FEV₁ ≥ %80’i hafif, %50–79’u orta, %30–49’u ağır, &lt; %30’u çok ağır sayar. ATS/ERS ise sabit 0,7 yerine yaşa göre alt normal sınırı (LLN) önerir ve anlamlı bronkodilatör yanıtını 400 mL’den düşük tanımlar (2005: ≥ %12 ve 200 mL; 2022: beklenenin &gt; %10’u).</div>
</section>

<section class="wrap blk ders-sec" id="d13-gbs">
  <h2>Klinik önem: Guillain–Barré sendromu</h2>
  <p class="intro">Guillain–Barré sendromunda (GBS) seri FVC ölçümü, solunum desteği gerekecek hastayı solunum yetmezliği gelişmeden tanımaya yarar. [[K1 s. 57–58]]</p>
  <div class="viz">
    <div class="viz-head"><h3>GBS’de seri FVC izlemi</h3></div>
    <div data-viz="f13_gbs"></div>
    <p class="viz-cap"><b>Başlangıç ölçümü.</b> İzlem, ilk FVC değerine göre yapılır. Ölçümler başlangıçta en az 6 saatte bir yinelenir; iki eşik birlikte izlenir: 20 mL/kg ve başlangıca göre %30 azalma. “Sonraki ölçüm” ile 6 saat ilerleyin. [[K1 s. 58]]</p>
    <p class="viz-foot">Eşikler ve ölçüm sıklığı kitaptandır [[K1 s. 58]]. FVC’nin zamanla düşüşü şematiktir; varsayılan başlangıç FVC’si 70 kg’lık erişkinin tipik vital kapasitesidir (4,5 L) [[K1 s. 50]].</p>
  </div>
  <div class="blk-body">
    <p>GBS motor, duyusal ve otonom işlev bozukluğu yapan bir grup akut polinöropatinin adıdır. En sık varyantı akut inflamatuvar demiyelinizan polinöropatidir (AIDP): periferik sinir aksonunu saran, miyelin yapan Schwann hücrelerine otoimmün saldırıdır ve klasik olarak aşağıdan yukarı ilerleyen motor paraliziyle görülür. [[K1 s. 57]]</p>
    <p>Hastaların yaklaşık %25’i solunum kası güçsüzlüğü ya da sekresyonları atamamaya ikincil pnömoni nedeniyle solunum desteğine gereksinir; sekresyonlar temizlenebildiği için invaziv ventilasyon noninvazife yeğlenir. Bulber güçsüzlük ve zayıf öksürük entübasyon gereksinimini düşündürür. Yerleşik entübasyon ölçütlerinin birçoğu spirometriye dayanır; en sık kullanılanı şekildeki seri FVC izlemidir: FVC 20 mL/kg’ın altına inerse ya da başlangıca göre %30’dan fazla düşerse entübasyon düşünülür. [[K1 s. 57–58]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d13-akim">
  <h2>Ekspiratuvar akım–hacim eğrisi</h2>
  <p class="intro">Zorlu ekspirasyondaki akım atılan hacme karşı çizilince ekspiratuvar akım–hacim eğrisi çıkar; eğri, hacim–zaman kaydına ek tanısal bilgi verir. [[K1 s. 58]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Akım–hacim eğrisi: efor nereye kadar işe yarar?</h3></div>
    <div data-viz="f13_akim"></div>
    <p class="viz-cap"><b>Normal, en yüksek efor.</b> Akım hızla yükselip PEFR’de (≈ 8 L/s) tepe yapar, sonra rezidüel hacme dek doğrusal azalır. Eforu azaltın: tepe düşer ve geç gelir, ama eğrinin inen kolu aynı çizgiye oturur. İnen kol efordan bağımsızdır. [[K1 s. 58–59]]</p>
    <p class="viz-foot">Normal PEFR ≈ 8 L/s ve VC ≈ 5 L kitabın örneklerindendir [[K1 s. 57, 59]]; hastalıklı eğriler ve efor eğrileri şematiktir.</p>
  </div>
  <div class="blk-body">
    <p>Normal eğride tepeye kadarki kısım efora bağımlıdır; ardından bütün hava atılana dek süren düzenli iniş, dinamik hava yolu kompresyonuyla sınırlandığı için efordan bağımsızdır. [[K1 s. 58]]</p>
    <p>Obstrüktif hastalıkta küçük hava yolu direnci artar ve akım azalır: PEFR düşer, efordan bağımsız kısım doğrusal olmaktan çıkıp konkavlaşır ve tam ekspirasyonda hava hapsi rezidüel hacmi artırır. Konkavlık da hava hapsi de şiddetle artar. [[K1 s. 58–59]]</p>
    <p>Restriktif hastalıkta TLC karakteristik olarak azalır. Solunum kası güçsüzlüğü en yüksek ekspiratuvar eforu düşürdüğü için PEFR azalabilir; efordan bağımsız kısım doğrusal kalır, rezidüel hacim görece korunur. [[K1 s. 59]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d13-bicim">
  <h2>Eğrinin biçimi neden böyle? Dinamik hava yolu kompresyonu</h2>
  <p class="intro">Eğrinin biçimini hava yolu yarıçapının akciğer hacmiyle değişmesi açıklar; kitap bunun basitleştirilmiş bir anlatım olduğunu, tam açıklamanın “eşit basınç noktası” hipotezine dayandığını belirtir. [[K1 s. 59]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Dinamik hava yolu kompresyonu, adım adım</h3></div>
    <div data-viz="f13_dinamik"></div>
    <p class="viz-cap"><b>1 · İnspirasyon sonu.</b> Akım yok: alveoler basınç 0, intraplevral basınç −10. Hava yolunun içi çevresinden yüksek basınçta olduğu için hava yolu açıktır. [[K1 s. 60]]</p>
    <p class="viz-foot">Basınçlar kitabın şematik Şekil 13.4’ündendir; şekilde birim yazılmaz, burada cmH₂O okunur [[K1 s. 60]]. Üçüncü adımda PA, azalan elastik geri çekilmeyi göstermek için +35 alınmıştır (kitapta +40); dördüncü adım kitap dışı bir eklemedir, aşağıdaki nota bakın.</p>
  </div>
  <div class="blk-body">
    <p>Zorlu ekspirasyonun başında akciğer hacmi yüksektir: parankim gergin, hava yolu yarıçapı en büyüktür ve Hagen–Poiseuille denklemine göre (Bölüm 21; kitapta “Hagan”) geniş hava yolu çok daha yüksek akıma izin verir. Ekspiratuvar kasların oluşturduğu yüksek intraplevral basınç (Ppl) alveoler basıncı (PA) yükseltir. Akım bu evrede efora bağımlıdır: pozitif Ppl ne kadar büyükse PEFR ve FEV₁ o kadar büyüktür. [[K1 s. 59]]</p>
    <p>Hacim azaldıkça parankim gevşer ve yarıçap küçülür, Ppl ise yüksek kalır. Kıkırdak desteği olmayan en küçük hava yolları bu basınçla ezilir: dinamik hava yolu kompresyonu. Direnç artar, akım düşer; akım artık efordan bağımsızdır, akciğer hacmine bağlıdır ve rezidüel hacme yaklaştıkça doğrusal azalır. [[K1 s. 59–60]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu · eşit basınç noktası.</b> Hava yolu içindeki basınç alveolden (PA = Ppl + Pel, Pel elastik geri çekilme basıncı) ağza doğru sürtünmeyle düşer ve bir noktada Ppl’ye eşitlenir; bu noktanın ağız tarafında transmural basınç ters döner ve hava yolu sıkışır. Efor Ppl ile PA’yı aynı ölçüde artırdığından akımı süren fark yine Pel kalır ve akım değişmez; hacim azaldıkça Pel küçülür, nokta daha küçük hava yollarına kayar ve akım düşer.</div>
</section>

<section class="wrap blk ders-sec" id="d13-halka">
  <h2>Akım–hacim halkası ve obstrüksiyonun yeri</h2>
  <p class="intro">Akım–hacim halkası ekspiratuvar eğriye inspiratuvar eğriyi ekler; inspiratuvar bölüm, hava yolu obstrüksiyonunun anatomik yeri belirsiz olduğunda ek bilgi verir. [[K1 s. 60]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Akım–hacim halkası atlası</h3></div>
    <div data-viz="f13_halka"></div>
    <p class="viz-cap"><b>Normal halka.</b> Kayıt saat yönünde ilerler: TLC’den rezidüel hacme zorlu ekspirasyon (x ekseninin üstü), ardından en yüksek eforla TLC’ye inspirasyon (altı). İçteki küçük halka tidal solumadır; tidal ekspirasyonun bittiği nokta FRC’dir. [[K1 s. 60]]</p>
    <p class="viz-foot">Halka biçimleri kitabın Şekil 13.5 ve 13.6’sındaki niteliklere göre çizilmiş şematik çizimlerdir [[K1 s. 60–62]]; hacim ekseninde sayı yoktur. Stridor eşleştirmesi bu atlasındır [[K1 s. 62]].</p>
  </div>
  <div class="blk-body">
    <p>Örneğin hışıltıyla gelen ama öyküsü astım ya da KOAH’a uymayan hastada işe yarar. Küçük hava yolu obstrüksiyonunda ekspiratuvar bölüm yukarıdaki eğri gibi değişir (düşük PEFR, konkav iniş, hava hapsiyle artmış olabilen RV); inspirasyon görece etkilenmez. Restriktif hastalıkta PEFR azalır, inen kol normal görünümdedir ve vital kapasite belirgin küçüktür; şiddete göre TLC çok, RV orantısal olarak daha az azalır: halka sağa kayar, FRC belirgin küçülür. [[K1 s. 60]]</p>
  </div>
  <div class="tbl-wrap" style="margin:14px 0">
    <table class="tbl">
      <thead><tr><th>Üst hava yolu obstrüksiyonu</th><th>İnspirasyonda</th><th>Ekspirasyonda</th><th>Halka</th></tr></thead>
      <tbody>
        <tr><th>Sabit<br><span class="small muted">daralma döngü boyunca aynı; ör. trakeal stenoz, yabancı cisim</span></th><td>tepe akım azalır</td><td>tepe akım azalır</td><td>iki bölüm de düz; ek efor aşamaz, efordan bağımsız [[K1 s. 60]]</td></tr>
        <tr><th>Değişken ekstratorasik<br><span class="small muted">altıncı trakeal halkanın üstü, lezyon basınçla hareket eder; ör. vokal kord paralizisi</span></th><td>Paw &lt; PB lezyonu içe çeker: akım azalır</td><td>Paw &gt; PB lezyonu dışa iter: etkilenmez</td><td>inspiratuvar bölüm düz [[K1 s. 60–61]]</td></tr>
        <tr><th>Değişken intratorasik<br><span class="small muted">altıncı halka ve altı, intratorasik basınca maruz; ör. tümör</span></th><td>negatif Ppl radyal çekimle hava yolunu açar (Paw &gt; Ppl): etkilenmez</td><td>pozitif Ppl dinamik kompresyon yapar, lezyon ağırlaştırır (Paw &lt; Ppl): akım sınırlı, efordan bağımsız</td><td>ekspiratuvar bölüm düz [[K1 s. 61–62]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="blk-body">
    <p>Sabit ve değişken ekstratorasik tipte akciğer hacimleri değişmez. Değişken ekstratorasik tipi akılda tutmak için ekstübasyon sonrası kısmi laringospazmı düşünün: hasta soluk almakta çok zorlanır, vermekte zorlanmaz. [[K1 s. 60–61]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d13-stridor">
  <h2>Klinik önem: stridor</h2>
  <p class="intro">Stridor, solunumda türbülan hava akımının oluşturduğu hava yolu sesidir ve solunum işini artırır; inspiratuvar, ekspiratuvar ya da bifazik olması halkalardaki mantığı izler. [[K1 s. 62]]</p>
  <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Stridor</th><th>Mekanizma</th><th>Örnekler</th><th>Halkadaki karşılığı</th></tr></thead>
      <tbody>
        <tr><th>İnspiratuvar</th><td>Genellikle dinamik üst hava yolu (ekstratorasik trakea ve yukarısı) obstrüksiyonu: yumuşak yapılar inspirasyondaki negatif hava yolu basıncıyla içe çöker. [[K1 s. 62]]</td><td>Krup, epiglottit, trakeomalazi, kısmi laringospazm [[K1 s. 62]]</td><td>değişken ekstratorasik</td></tr>
        <tr><th>Ekspiratuvar</th><td>Dinamik alt hava yolu (intratorasik trakea ve aşağısı) obstrüksiyonu. [[K1 s. 62]]</td><td>Trakeal ya da bronşiyal yabancı cisim [[K1 s. 62]]</td><td>değişken intratorasik</td></tr>
        <tr><th>Bifazik</th><td>Sabit üst ya da alt hava yolu obstrüksiyonu; üst hava yolu lezyonlarında genellikle inspirasyonda, alt hava yolu lezyonlarında ekspirasyonda daha belirgin. [[K1 s. 62]]</td><td>Subglottik stenoz, trakeit [[K1 s. 62]]</td><td>sabit</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="wrap blk ders-sec" id="d13-rezeksiyon">
  <h2>Klinik önem: akciğer rezeksiyonu ve spirometri</h2>
  <p class="intro">Spirometri akciğer rezeksiyonu öncesi değerlendirmenin temel incelemelerinden biridir; basit zorlu spirometri bile hastanın rezeksiyona uygunluğunu öngörebilir. [[K1 s. 61]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Rezeksiyon öncesi spirometri: iki basamak</h3></div>
    <div data-viz="f13_rezeksiyon"></div>
    <p class="viz-cap">Önce FEV₁ planlanan ameliyatın kaba eşiğiyle karşılaştırılır; eşiğin altındaki hastada öngörülen postoperatif (ppo) değerlere geçilir. [[K1 s. 61]]</p>
  </div>
  <div class="blk-body">
    <p>FEV₁ &gt; 2,0 L pnömonektomiye, &gt; 1,5 L lobektomiye uygunluğu gösterir. Bu eşiklerin altında ek ölçümler yapılır: öngörülen postoperatif FEV₁ (ppoFEV₁) beklenenin %30’undan azsa postoperatif ventilasyon gereksinimi olasılığı ve mortalite daha yüksektir. Öngörülen postoperatif transfer faktörü (ppoTLCO) postoperatif difüzyon kapasitesini tahmin eder; beklenenin %40’ından azı artmış morbidite ve mortaliteyle ilişkilidir. [[K1 s. 61]]</p>
  </div>
  <p class="small muted">ppo değerlerinin segment sayımıyla hesaplanışı <a href="#/dersler/fizyoloji/10">Bölüm 10 · Alveoler difüzyon</a> içindedir.</p>
</section>

<section class="wrap blk ders-sec" id="d13-p1">
  <h2>Part I’de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok eşikler ve yönler üzerinden sorulur: FEV₁/FVC’nin 0,7 eşiği, obstrüktif ve restriktif ölçütler, şiddet basamakları, bronkodilatör sonrası 400 mL, gün içi PEFR değişkenliğinin %20’si, spirometreyle ölçülemeyen RV, FRC ve TLC, efora bağımlı ve efordan bağımsız bölüm, halkada FRC’nin yeri, üç üst hava yolu obstrüksiyonunun halkası, GBS’de 20 mL/kg ve %30 eşikleri ile rezeksiyon eşikleri. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz13-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz13-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz13-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d13-p2">
  <h2>Part II’de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>“Normal bir zorlu akım–hacim halkası çizin ve biçimini açıklayın. Obstrüktif ve restriktif akciğer hastalığında ve üst hava yolu obstrüksiyonunda halka nasıl değişir?”</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Manevra ve eksenler.</b> TLC’den rezidüel hacme zorlu ekspirasyon, ardından en yüksek eforla TLC’ye inspirasyon; kayıt saat yönünde izlenir. x ekseni hacim (TLC solda, rezidüel hacim sağda), y ekseni akım (ekspirasyon yukarıda, inspirasyon aşağıda). İçteki tidal halkanın ekspirasyon sonu FRC’dir. [[K1 s. 60]]</li>
    <li><b>Ekspiratuvar bölümün biçimi.</b> Hızlı yükseliş ve PEFR’de tepe (≈ 8 L/s): efora bağımlı. Ardından rezidüel hacme dek doğrusal iniş: efordan bağımsız, dinamik hava yolu kompresyonuyla sınırlı. [[K1 s. 58–59]]</li>
    <li><b>Mekanizma.</b> Yüksek hacimde parankim gergin, yarıçap en büyük (Hagen–Poiseuille); ekspiratuvar kaslar Ppl’yi ve PA’yı yükseltir, efor arttıkça PEFR artar. Hacim azaldıkça yarıçap küçülür, Ppl yüksek kalır, kıkırdaksız küçük hava yolları ezilir; akım hacme bağlı ve doğrusal azalır. İsterseniz eşit basınç noktasıyla tamamlayın (Atlas notu). [[K1 s. 59–60]]</li>
    <li><b>Obstrüktif hastalık.</b> PEFR düşük, efordan bağımsız bölüm konkav (şiddetle artar), hava hapsiyle rezidüel hacim artmış; inspirasyon görece korunur. Spirometride FEV₁ &lt; %80 ve FEV₁/FVC &lt; 0,7; şiddeti FEV₁ belirler; 400 mL’lik geri dönüşümlülük astımı düşündürür. [[K1 s. 57–60]]</li>
    <li><b>Restriktif hastalık.</b> Vital kapasite belirgin küçük; TLC çok, rezidüel hacim orantısal olarak daha az azalır, halka sağa kayar ve FRC küçülür. PEFR azalabilir, efordan bağımsız bölüm doğrusal kalır; FEV₁/FVC &gt; 0,7. [[K1 s. 57, 59–60]]</li>
    <li><b>Üst hava yolu obstrüksiyonu.</b> Sabit (trakeal stenoz): iki bölüm de düz. Değişken ekstratorasik (vokal kord paralizisi): inspiratuvar bölüm düz, çünkü Paw &lt; PB lezyonu içe çeker. Değişken intratorasik (tümör): ekspiratuvar bölüm düz, çünkü Ppl &gt; Paw. Sabit ve ekstratorasik tipte akciğer hacimleri değişmez. [[K1 s. 60–62]]</li>
    <li><b>Klinik bağlantıyla bitirin.</b> Stridorun tipi aynı mantığı izler (inspiratuvar, ekspiratuvar, bifazik); ekstübasyon sonrası kısmi laringospazm değişken ekstratorasik obstrüksiyondur. GBS’de seri FVC (20 mL/kg, %30 azalma) ve rezeksiyon öncesi FEV₁ eşikleri (2,0 L ve 1,5 L) spirometrinin günlük kullanımlarıdır. [[K1 s. 58, 61–62]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Eksenleri adlandırın, TLC’yi sola ve rezidüel hacmi sağa yazın; normal halkayı saat yönü oklarıyla, içine tidal halkayı ve FRC’yi çizin. PEFR’yi işaretleyip efora bağımlı ve efordan bağımsız bölümleri ayırın. Aynı eksenlere obstrüktif (düşük tepe, konkav iniş, hava hapsiyle sola çekilmiş rezidüel hacim ucu) ve restriktif (dar, sağa kaymış) halkayı başka renkle ekleyin; üç üst hava yolu biçimini yanına küçük çizimlerle gösterin. [[K1 s. 59–62]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Spirometre FRC’yi neden ölçemez? Restriktif hastalıkta FEV₁/FVC neden yüksek olabilir? “Efordan bağımsız” ne demektir, nedeni nedir? Ekstübasyon sonrası laringospazmda hangi akım bozulur, neden? Hacim–zaman eğrisinde PEFR nerededir? GBS’li hastayı ne zaman entübe edersiniz? Pnömonektomi için hangi FEV₁ yeterlidir? Cevaplar yukarıdaki bölümlerde. [[K1 s. 52, 56–62]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d13-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>SFT tanı, şiddetin derecelendirilmesi ve tedavi ile cerrahi risk tahmini için yapılır; spirometreler hacim algılayan (vitalograf) ve akım algılayan (pnömotakograf) olarak ikiye ayrılır. Spirometri RV, FRC ve TLC’yi ölçemez. [[K1 s. 52, 56]]</li>
    <li>Zorlu spirometride FEV₁ ve FVC ölçülür, beklenen değerlerle karşılaştırılır; FEV₁/FVC &lt; 0,7 anormaldir. PEFR hacim–zaman eğrisinin başlangıç eğimidir, daha çok tepe akım ölçerle ölçülür. Normal örnek: FVC ≈ 5 L, FEV₁ ≈ 4 L, oran 0,8. [[K1 s. 56–57]]</li>
    <li>Obstrüktif: FEV₁ &lt; %80 ve oran &lt; 0,7; kitaba göre hafif %50–79, orta %30–49, ağır &lt; %30 (GOLD basamakları farklıdır, Atlas notu). Restriktif: FEV₁ ve FVC &lt; %80, oran &gt; 0,7. Gün içi PEFR değişkenliği &gt; %20 ve bronkodilatörden 15 dakika sonra FEV₁’de 400 mL düzelme astımı düşündürür. [[K1 s. 57]]</li>
    <li>GBS’li hastaların yaklaşık %25’i solunum desteğine gereksinir; seri FVC başlangıçta en az 6 saatte bir ölçülür ve FVC &lt; 20 mL/kg ya da başlangıca göre &gt; %30 azalma entübasyonu düşündürür. [[K1 s. 57–58]]</li>
    <li>Ekspiratuvar akım–hacim eğrisi PEFR’ye kadar efora bağımlı, sonra efordan bağımsızdır. Obstrüksiyonda PEFR düşer, iniş konkavlaşır ve hava hapsiyle RV artar; restriksiyonda TLC azalır, iniş doğrusal kalır. [[K1 s. 58–59]]</li>
    <li>Yüksek hacimde hava yolları geniştir ve akım eforla artar; hacim azaldıkça yarıçap küçülür, yüksek Ppl kıkırdaksız küçük hava yollarını ezer (dinamik hava yolu kompresyonu) ve akım hacme bağlı olarak doğrusal azalır. [[K1 s. 59–60]]</li>
    <li>Halka saat yönünde izlenir, tidal ekspirasyon sonu FRC’dir. Küçük hava yolu obstrüksiyonu inspirasyonu görece korur; restriktif halka küçük ve sağa kaymıştır. Sabit üst hava yolu obstrüksiyonu iki bölümü, değişken ekstratorasik inspiratuvar bölümü, değişken intratorasik ekspiratuvar bölümü düzleştirir; stridorun tipi aynı mantığı izler. [[K1 s. 60–62]]</li>
    <li>Rezeksiyon öncesi FEV₁ &gt; 2,0 L pnömonektomiye, &gt; 1,5 L lobektomiye uygunluk gösterir; altında ppoFEV₁ &lt; %30 ve ppoTLCO &lt; %40 yüksek risk demektir. [[K1 s. 61]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="13"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/12">← Bölüm 12 · Statik akciğer hacimleri</a>
    <a href="#/dersler/fizyoloji/14">Sonraki: Bölüm 14 · Hipoksi ve şantlar →</a>
  </nav>
</section>`,
};
