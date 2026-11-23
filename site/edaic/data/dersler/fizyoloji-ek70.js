/* Fizyoloji Ek ders (Bölüm 70 ardından) · Asit–baz kompansasyonu: hücre içi tamponlar, in vitro ve in vivo tampon doğruları
   (K2 = Kam & Power, Principles of Physiology for the Anaesthetist, 3. baskı, özgün s. 257;
   bağlam için K1 = Chambers, Bölüm 70, s. 331–333).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi kaynak sayfa işaretiyle özgün sayfaya bağlıdır. Bileşen tarifleri: docs/tasarim/fizek70.md */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fizek70-1'] = {
  no: 1, kok: 'Hücre içi tamponlar için:', kagit: 'Paper A · fizyoloji, Ek ders · Bölüm 70 ardından', kaynak: '[[K2 s. 257]]',
  onermeler: [
    { t: 'Hücre içi pH, plazma pH’ından yüksektir (yaklaşık 7,6–7,8).', d: false, n: 'Yanlış. Hücre içi pH daha düşüktür, yaklaşık 6,8–7,1. [[K2 s. 257]]' },
    { t: 'Çoğu hücrede yaklaşık 6 mmol/L protein ve 6 mmol/L fosfat bulunur.', d: true, n: 'Doğru. Bu miktarlar onları önemli hücre içi tamponlar yapar. [[K2 s. 257]]' },
    { t: 'Hücre içi protein ve fosfat tamponları yalnız karbonik asidi tamponlar; karbonik olmayan asitlere etkisizdir.', d: false, n: 'Yanlış. Hem karbonik hem karbonik olmayan asitleri etkili biçimde tamponlarlar. [[K2 s. 257]]' },
    { t: 'Hücre içi pH’ın düşük olması, pKa değeri 6,8 civarında olan protein ve fosfat tamponlarının etkinliğini artırır.', d: true, n: 'Doğru. Tampon, ortam pH’ı kendi pKa değerine yaklaştıkça en etkili çalışır; hücre içi pH bu değere yakındır. [[K2 s. 257]]' },
    { t: 'Hücre dışı sıvıda konsantrasyonu düşük olduğu için fosfat orada daha az önemli bir tampondur.', d: true, n: 'Doğru. Fosfat hücre içi sıvıda ve idrarda, konsantrasyonunun yüksek olduğu yerlerde önemlidir. [[K1 s. 332]]' },
  ],
};
VERI.sorular['fizek70-2'] = {
  no: 2, kok: 'Kana akut olarak CO₂ eklendiğinde, deney tüpü (in vitro) ile vücut (in vivo) karşılaştırılırsa:', kagit: 'Paper A · fizyoloji, Ek ders · Bölüm 70 ardından', kaynak: '[[K2 s. 257]]',
  onermeler: [
    { t: 'Kan ile interstisyel sıvının asit–baz bileşimi yaklaşık 10–20 dakikada dengeye ulaşır.', d: true, n: 'Doğru. Bu sürede kanda oluşan bikarbonatın bir kısmı interstisyel alana geçmiş olur. [[K2 s. 257]]' },
    { t: 'In vivo plazma bikarbonatındaki artış in vitroya göre daha büyüktür.', d: false, n: 'Yanlış. Oluşan bikarbonatın bir kısmı kapiller duvarını geçip interstisyuma gittiği için in vivo artış daha küçüktür. [[K2 s. 257]]' },
    { t: 'In vivo baz fazlası ve tampon bazı, in vitro koşula göre azalır.', d: true, n: 'Doğru. Bikarbonat damar içinden dışarı difüze olduğu için kan örneğinde ölçülen değerler düşer. [[K2 s. 257]]' },
    { t: 'In vivo arteriyel pH düşüşü in vitroya göre daha büyüktür.', d: true, n: 'Doğru. Plazmada daha az bikarbonat kaldığı için aynı PaCO₂ artışı pH’ı daha çok düşürür. [[K2 s. 257]]' },
    { t: 'Eklenen CO₂’yi esas olarak plazma proteinleri tamponlar.', d: false, n: 'Yanlış. CO₂ esas olarak hemoglobin tarafından tamponlanır ve bu sırada bikarbonat oluşur. [[K2 s. 257]]' },
  ],
};
VERI.sorular['fizek70-3'] = {
  no: 3, kok: 'Asit–baz bozukluklarının kompansasyonu için:', kagit: 'Paper A · fizyoloji, Ek ders · Bölüm 70 ardından', kaynak: '[[K2 s. 257]]',
  onermeler: [
    { t: 'Primer bozukluğun kompansasyonu genellikle tamdır ve pH 7,4’e döner.', d: false, n: 'Yanlış. Kompansasyon genellikle tam değildir; pH 7,4’e tam olarak dönmez. [[K2 s. 257]]' },
    { t: 'pH’taki 0,1 birimlik bir düşüş ventilasyonu yaklaşık iki katına çıkarır.', d: true, n: 'Doğru. Kitabın verdiği tahmin budur. [[K2 s. 257]]' },
    { t: 'Solunum sisteminin asit–baz bozukluklarını tamponlama kapasitesi, ECF kimyasal tamponlarının yaklaşık yarısı kadardır.', d: false, n: 'Yanlış. Yaklaşık iki katıdır; üstelik hızlı yanıt verir. [[K2 s. 257]]' },
    { t: 'Metabolik alkalozda solunum dürtüsü azalır ve PaCO₂ yükselir.', d: true, n: 'Doğru. Artan [HCO₃⁻] ile oran PaCO₂ yükselerek normale yaklaştırılır. [[K2 s. 257]]' },
    { t: 'In vitro yaklaşım, PaCO₂ akut olarak yükseldiğinde yanlışlıkla metabolik alkaloz varmış izlenimi verir.', d: false, n: 'Yanlış. Akut yükselmede yanlış metabolik asidoz, akut düşmede yanlış metabolik alkaloz izlenimi verir. [[K2 s. 257]]' },
  ],
};

const DEK70_NAV = [
  ['dek70-hucre', 'Hücre içi tamponlar'], ['dek70-titrasyon', 'Tüp ve vücut'], ['dek70-fark', 'Fark ne zaman önemli?'],
  ['dek70-kompanzasyon', 'Solunumsal kompansasyon'],
  ['dek70-p1', 'Part I'], ['dek70-p2', 'Part II'], ['dek70-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/ek70'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Ek ders · Bölüm 70 ardından', baslik: 'Asit–baz kompansasyonu: hücre içi tamponlar, in vitro ve in vivo tampon doğruları',
  lede: 'Vücut bir deney tüpü gibi tamponlamaz: hücreler kendi tamponlarını taşır, kanda oluşan bikarbonat interstisyuma yayılır ve solunum, oranı düzeltmek için hızla devreye girer. [[K2 s. 257]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${DEK70_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="dek70-hucre">
  <h2>Hücre içi tamponlar: protein ve fosfat</h2>
  <p class="intro">Hücre içinde protein ve fosfat bol bulunur ve pKa değerleri hücre içi pH’a yakındır; bu yüzden ikisi de güçlü tampondur. [[K2 s. 257]]</p>

  <div class="viz">
    <div class="viz-head"><h3>pH ile pKa yaklaştıkça tampon güçlenir</h3></div>
    <div data-viz="fek70_pka"></div>
    <p class="viz-cap" aria-live="polite">pH sürgüsünü hücre içi aralıktan (6,8–7,1) plazmaya (7,4) kaydırın: pKa’sı ≈ 6,8 olan protein/fosfat tamponunun gücü azalır, pKa’sı 6,1 olan bikarbonat sistemi ise daha da uzakta kalır. [[K2 s. 257]] [[K1 s. 332]]</p>
    <p class="viz-foot">Şematik model: eğri, zayıf asit tamponunun göreli tamponlama gücüdür (pH = pKa’da en yüksek); yükseklikler ölçeksizdir.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>Çoğu hücrede yaklaşık <b>6 mmol/L protein</b> ve <b>6 mmol/L fosfat</b> bulunur. Bu iki tampon hem karbonik hem karbonik olmayan asitleri etkili biçimde tamponlar. Hücre içi pH’ın düşük olması (<b>6,8–7,1</b>), pKa değeri 6,8 civarındaki bu tamponların işini kolaylaştırır. [[K2 s. 257]]</p>
    <p>Fosfat hücre dışı sıvıda az olduğu için orada önemsizdir; hücre içinde ve idrarda önem kazanır. Plazma proteinlerinin payı küçüktür, hücre içi proteinler ise yüksek konsantrasyonları nedeniyle önemlidir. [[K1 s. 332]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek70-titrasyon">
  <h2>Tüpte ve vücutta CO₂: in vivo titrasyon</h2>
  <p class="intro">Tüpteki kanda oluşan bikarbonat tüpte kalır; vücutta ise bir kısmı interstisyel sıvıya kaçar, bu yüzden aynı CO₂ yükü vücutta pH’ı daha çok düşürür. [[K2 s. 257]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Aynı CO₂, iki ayrı kap</h3></div>
    <div data-viz="fek70_tup"></div>
    <p class="viz-cap" aria-live="polite">"Oynat"a basın: CO₂ eklenir, hemoglobin tamponlar ve bikarbonat oluşur; tüpte bikarbonat yerinde kalır, vücutta kapiller duvarını geçip interstisyuma yayılır ve 10–20 dakikada denge kurulur. [[K2 s. 257]]</p>
    <p class="viz-foot">Şematik çizim; parçacık sayıları ve süreler ölçeksizdir.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>CO₂’yi esas olarak <b>hemoglobin</b> tamponlar ve bu sırada bikarbonat oluşur. Kan hacmi ECF’nin yaklaşık <b>üçte biri</b> olduğundan hemoglobin bütün ECF’ye yayılmış gibi düşünülebilir: bu “tek bölme”nin hemoglobini <b>5 g/100 mL ECF</b>, tamponlama kapasitesi kanınkinin üçte biri, yaklaşık <b>10 mmol/L/pH birimi</b>dir. [[K2 s. 257]]</p>
    <p>Sonuç: in vivo, plazma bikarbonatı daha az artar, pH daha çok düşer. Bikarbonat damar içinden dışarı çıktığı için in vivo <b>baz fazlası</b> ve <b>tampon bazı</b> da in vitroya göre azalır. Hemoglobinin H⁺ bağlaması histidin yan zincirleriyle olur; deoksihemoglobin daha iyi bağlar. [[K2 s. 257]] [[K1 s. 332]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek70-fark">
  <h2>In vitro ile in vivo farkı ne zaman önemli?</h2>
  <p class="intro">İki yaklaşımın farkı normal PaCO₂ çevresinde çok küçüktür; ancak PaCO₂ çok yüksek ya da çok düşükse ya da ağır metabolik asidoz varsa önem kazanır. [[K2 s. 257]]</p>

  <div class="viz">
    <div class="viz-head"><h3>PaCO₂’yi değiştirin, iki eğriyi ve baz fazlasını izleyin</h3></div>
    <div data-viz="fek70_egri"></div>
    <p class="viz-cap" aria-live="polite">PaCO₂’yi 5,3 kPa’dan uzaklaştırın: eğriler ayrılır ve kan örneğinden in vitro yöntemle hesaplanan baz fazlası, gerçekte metabolik bozukluk yokken akut hiperkapnide negatife, akut hipokapnide pozitife kayar. [[K2 s. 257]]</p>
    <p class="viz-foot">Şematik model (Henderson–Hasselbalch; kan için ≈ 30, ECF için ≈ 10 mmol/L/pH tampon değeri); sayılar yaklaşıktır, klinik hesap için değildir.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>In vitro yaklaşımın asıl sorunu yanıltıcı olmasıdır: PaCO₂ akut olarak yükseldiğinde ortada <b>metabolik asidoz</b>, akut olarak düştüğünde <b>metabolik alkaloz</b> da varmış gibi görünür. Klinik durumların çoğunda ise iki yöntem arasındaki fark çok küçüktür. [[K2 s. 257]]</p>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> Kan gazı cihazlarının verdiği standart baz fazlası (SBE, BE<sub>ecf</sub>), hemoglobini yaklaşık 5 g/dL kabul ederek tam bu “tüm ECF” modelini kullanır. Bu yüzden akut CO₂ değişikliklerinde kan baz fazlasına göre daha az yanıltır.</div>
</section>

<section class="wrap blk ders-sec" id="dek70-kompanzasyon">
  <h2>Kompansasyon ve solunumsal yanıt</h2>
  <p class="intro">Fizyolojik yanıtlar pH’ı düzeltmek için [HCO₃⁻]/PaCO₂ oranını normale döndürmeye çalışır; bunu ventilasyonla CO₂ atılımını ve böbrekle asit–baz atılımını ayarlayarak yapar, ama genellikle pH 7,4’e tam dönmez. [[K2 s. 257]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Metabolik bozukluğa solunumun yanıtı</h3></div>
    <div data-viz="fek70_solunum"></div>
    <p class="viz-cap" aria-live="polite">Plazma [HCO₃⁻] sürgüsünü düşürün (metabolik asidoz) ya da yükseltin (metabolik alkaloz): kemoreseptörler pH’ı algılar, ventilasyon her 0,1 pH birimi için yaklaşık iki kat değişir, PaCO₂ oranı düzeltir ama pH 7,4’e tam dönmez. [[K2 s. 257]]</p>
    <p class="viz-foot">Şematik model (ventilasyon = 2<sup>ΔpH/0,1</sup>); kompanse değerler yaklaşıktır, beklenen kompansasyon formülü değildir.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>Plazma bikarbonatı metabolik alkalozda artar, metabolik asidozda azalır. Ventilasyonun pH kontrolünü iki algılayıcı belirler: beyin ECF’sinin pH’ını izleyen <b>medulla kemoreseptörleri</b> ve <b>karotis cisimciği kemoreseptörleri</b>. Asidozda düşük bikarbonat ve artan [H⁺] hiperventilasyon yapar, PaCO₂ düşer. Alkalozda solunum dürtüsü azalır, PaCO₂ yükselir. [[K2 s. 257]]</p>
    <p>Solunum sisteminin asit–baz tamponlama kapasitesi ECF kimyasal tamponlarının yaklaşık <b>iki katıdır</b>. Hızlı yanıt verdiği için plazma [H⁺] düzeyinde büyük akut değişiklikleri önler. Alkalozdaki yanıt sınırlıdır, çünkü ventilasyon PAO₂’yi korumak için sürmelidir; böbrek ise günler içinde düzeltir. [[K2 s. 257]] [[K1 s. 333]]</p>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> K2’nin “ventilasyon hızı” iki katına çıkar ifadesini dakika ventilasyonu olarak okuyun. K1’e göre metabolik asidozdaki artış çoğunlukla tidal hacimden gelir, solunum sayısı az değişir (Kussmaul solunumu). [[K1 s. 333]]</div>
</section>

<section class="wrap blk ders-sec" id="dek70-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu ek dersin MTF'de sorulabilecek noktaları: hücre içi protein ve fosfat miktarı, hücre içi pH ve pKa, CO₂’nin tamponlanmasında hemoglobin, in vitro ve in vivo pH ile bikarbonat farkı, dengelenme süresi, ECF’nin tamponlama kapasitesi, baz fazlasındaki değişim ve yanıltıcı sonuçlar, kompansasyonun tamamlanmaması, kemoreseptörler ve solunumun tamponlama gücü. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fizek70-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fizek70-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fizek70-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="dek70-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Akut hiperkapnisi olan, metabolik bozukluğu olmayan bir hastanın kan gazında baz fazlası neden negatif çıkabilir? Vücut bir asit–baz bozukluğunu nasıl kompanse eder?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tamponları sınıflayın.</b> Hücre dışı: bikarbonat (pKa 6,1) ve hemoglobin; hücre içi: fosfat ve proteinler. [[K1 s. 332]]</li>
    <li><b>Hücre içini açıklayın.</b> Yaklaşık 6 mmol/L protein ve 6 mmol/L fosfat; pKa ≈ 6,8, hücre içi pH 6,8–7,1; karbonik ve karbonik olmayan asitleri tamponlar. [[K2 s. 257]]</li>
    <li><b>Tüp ile vücudu karşılaştırın.</b> CO₂’yi hemoglobin tamponlar, bikarbonat oluşur; tüpte kalır, vücutta bir kısmı interstisyuma geçer; denge 10–20 dakikada. [[K2 s. 257]]</li>
    <li><b>Sayıları verin.</b> Kan ECF’nin üçte biri; tüm ECF hemoglobini 5 g/100 mL, tampon kapasitesi ≈ 10 mmol/L/pH. In vivo pH daha çok düşer, bikarbonat daha az artar; baz fazlası ve tampon bazı azalır. [[K2 s. 257]]</li>
    <li><b>Klinik sonucu söyleyin.</b> In vitro yaklaşım akut hiperkapnide yanlış metabolik asidoz, akut hipokapnide yanlış metabolik alkaloz gösterir; fark yalnız uç PaCO₂ ya da ağır metabolik asidozda önemli. [[K2 s. 257]]</li>
    <li><b>Kompansasyonla bitirin.</b> Amaç [HCO₃⁻]/PaCO₂ oranı; medulla ve karotis kemoreseptörleri; 0,1 pH için ventilasyon ≈ 2 kat; solunum kapasitesi ECF tamponlarının ≈ 2 katı ve hızlı; kompansasyon genellikle tam değil. [[K2 s. 257]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada iki çizim işe yarar: solda plazma bikarbonatını (y) PaCO₂’ye (x) karşı çizen, in vitro eğrisi dik, in vivo eğrisi daha yatık iki çizgi; sağda kapiller duvarıyla ayrılmış plazma ve interstisyum, aradan geçen HCO₃⁻ okları.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Hücre içi pH neden tamponlamaya yardım eder? CO₂’yi esas olarak ne tamponlar? ECF’nin tamponlama kapasitesi neden kanın üçte biri? Fark hangi durumda önemli? Metabolik asidozu hangi kemoreseptörler algılar? Solunum kompansasyonu neden tam değildir? Cevapların hepsi yukarıdaki bölümlerde. [[K2 s. 257]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek70-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Hücrede ≈ 6 mmol/L protein ve 6 mmol/L fosfat vardır; pKa ≈ 6,8 ve hücre içi pH 6,8–7,1 olduğu için güçlü tampondurlar. [[K2 s. 257]]</li>
    <li>Eklenen CO₂’yi esas olarak hemoglobin tamponlar; oluşan bikarbonat vücutta 10–20 dakikada interstisyuma da dağılır. [[K2 s. 257]]</li>
    <li>Tüm ECF, hemoglobini 5 g/100 mL ve tampon kapasitesi ≈ 10 mmol/L/pH (kanın üçte biri) olan tek bölme gibi davranır. [[K2 s. 257]]</li>
    <li>In vivo pH daha çok düşer, bikarbonat daha az artar; baz fazlası ve tampon bazı in vitroya göre azalır. [[K2 s. 257]]</li>
    <li>In vitro yöntem akut hiperkapnide yanlış metabolik asidoz, akut hipokapnide yanlış metabolik alkaloz düşündürür; fark çoğu klinik durumda küçüktür. [[K2 s. 257]]</li>
    <li>Kompansasyon [HCO₃⁻]/PaCO₂ oranını düzeltir ama genellikle tam değildir; solunum, medulla ve karotis kemoreseptörleriyle, ECF tamponlarının ≈ 2 katı güçle ve hızla çalışır. [[K2 s. 257]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="ek70"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/70">← Bölüm 70 · Asit–baz fizyolojisi</a>
    <a href="#/dersler/fizyoloji/71">Sonraki: Bölüm 71 · Miksiyon →</a>
  </nav>
</section>`,
};
