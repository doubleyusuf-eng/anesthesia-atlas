/* Fizyoloji Bölüm 35 · Arteriyel basınç dalga biçimleri (K1 İngilizce baskı s. 155–157).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz35-1'] = {
  no: 1, kok: 'Windkessel etkisi ve arteriyel basınç dalgası için:', kagit: 'Paper A · fizyoloji, Bölüm 35', kaynak: '[[K1 s. 155]]',
  onermeler: [
    { t: 'Radiyal arterde parmakla hissedilen nabız, kan akım dalgasıdır.', d: false, n: 'Yanlış. Nabız olarak hissedilen, aort duvarının sistolde gerilmesiyle oluşan basınç dalgasıdır; akım dalgası değildir. [[K1 s. 155]]' },
    { t: 'Basınç dalgası arter ağacında ortalama aort kan hızından çok daha hızlı ilerler.', d: true, n: 'Doğru. Basınç dalgası yaklaşık 4 m/s, ortalama aort kan hızı ise 20 cm/s\'dir. [[K1 s. 155]]' },
    { t: 'Diyastolde aort duvarının geri yaylanması, depolanmış potansiyel enerjiyi kinetik enerjiye çevirerek kan akımını sürdürür.', d: true, n: 'Doğru. Bu Windkessel etkisidir; diyastolde ileri akımı ve böylece diyastolik basıncı korur. [[K1 s. 155]]' },
    { t: 'Yaşla aort duvarının kompliyansı artar; bu yaşlıda diyastolik hipertansiyonu açıklar.', d: false, n: 'Yanlış. Yaşla elastin dejenere olur, aort kompliyansı azalır; atım hacmi daha büyük basınç artışı yapar ve yaşlıda sistolik hipertansiyon gelişir. [[K1 s. 155]]' },
    { t: 'Aort kapağının kapanması aortik dalga biçiminin inişinde dikrotik çentiği oluşturur.', d: true, n: 'Doğru. Aortta eğrinin düzgün inişi, aort kapağı kapanınca dikrotik çentikle kesilir. [[K1 s. 155]]' },
  ],
};
VERI.sorular['fiz35-2'] = {
  no: 2, kok: 'Ölçüm yeri aorttan periferik arterlere kaydıkça arteriyel basınç dalga biçiminde:', kagit: 'Paper A · fizyoloji, Bölüm 35', kaynak: '[[K1 s. 156]]',
  onermeler: [
    { t: 'Diyastolik basınç düşer.', d: true, n: 'Doğru. Distalde diyastolik basınç azalır. [[K1 s. 156]]' },
    { t: 'Sistolik basınç düşer.', d: false, n: 'Yanlış. Distale gidildikçe yükseliş dikleşir ve sistolik basınç artar. [[K1 s. 156]]' },
    { t: 'Ortalama arter basıncı belirgin biçimde düşer.', d: false, n: 'Yanlış. MAP ölçüldüğü yerden bağımsız olarak görece sabittir; bu, MAP\'ın kan basıncının en önemli ölçüsü sayılmasının bir nedenidir. [[K1 s. 156]]' },
    { t: 'Dikrotik çentik eğride daha aşağıya kayar ve keskin bir kesinti yerine bir dikrotik dalgaya dönüşür.', d: true, n: 'Doğru. Periferik dikrotik dalga aort kapağı kapanmasından değil, basınç dalgasının yansımalarından kaynaklanır. [[K1 s. 156]]' },
    { t: 'Femoral arterdeki dikrotik dalga esas olarak aort kapağının kapanmasıyla oluşur.', d: false, n: 'Yanlış. Periferde dikrotik dalganın biçim ve konum değişikliği, onun basınç dalgasının yansımalarıyla oluşmasındandır. [[K1 s. 156]]' },
  ],
};
VERI.sorular['fiz35-3'] = {
  no: 3, kok: 'Arteriyel basınç dalga biçiminden çıkarılabilecek bilgiler için:', kagit: 'Paper A · fizyoloji, Bölüm 35', kaynak: '[[K1 s. 156–157]]',
  onermeler: [
    { t: 'Alçak dikrotik çentikli, dik inişli, ince ve sivri bir dalga yüksek SVR\'yi düşündürür.', d: false, n: 'Yanlış. Dik iniş ve alçak dikrotik çentik düşük SVR\'yi gösterir; yüksek dikrotik çentik yüksek SVR demektir. [[K1 s. 156]]' },
    { t: 'Aort darlığında yükseliş eğimi azalabilir ve nabız basıncı düşer.', d: true, n: 'Doğru. Aort darlığında yükselişin eğimi bazen azalır; dalga biçiminde nabız basıncı düşüktür. [[K1 s. 156–157]]' },
    { t: 'Aort yetmezliğinde dalga bisferiens (çift tepeli) görünümde olabilir ve nabız basıncı artmıştır.', d: true, n: 'Doğru. Aort yetmezliğinde kontraktilite genellikle normaldir; dalga çift tepeli olabilir ve nabız basıncı geniştir. [[K1 s. 156–157]]' },
    { t: 'Pozitif basınçlı ventilasyondaki hastada sistolik basıncın solunumla atımdan atıma değişmesi hipovoleminin göstergesidir.', d: true, n: 'Doğru. Değişim, solunum siklusu boyunca önyükün değişmesinden kaynaklanır. [[K1 s. 156]]' },
    { t: 'Atım hacmi dalga biçiminin diyastolik bölümünün altındaki alanla orantılıdır.', d: false, n: 'Yanlış. Atım hacmi sistolik bölümün altındaki alanla orantılıdır; nabız kontur analizi kalp debisini buradan hesaplar. [[K1 s. 156]]' },
  ],
};

const D35_NAV = [
  ['d35-windkessel', 'Windkessel'], ['d35-dalga', 'Basınç dalgası'], ['d35-aort', 'Aort dalga biçimi'],
  ['d35-periferik', 'Periferik arterler'], ['d35-bilgi', 'Dalgadan bilgi'], ['d35-p1', 'Part I'], ['d35-p2', 'Part II'], ['d35-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/35'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 3 · Kardiyovasküler fizyoloji · Bölüm 35', baslik: 'Arteriyel basınç dalga biçimleri',
  lede: 'Nabzın hızı ve niteliği binlerce yıldır tanıda kullanılır; arter kanülasyonu ise dalga biçiminden sayısal bilgi çıkarmayı sağlar. [[K1 s. 155]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D35_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d35-windkessel">
  <h2>Windkessel etkisi: esnek aort bir basınç deposudur</h2>
  <p class="intro">Aort sistolde gerilerek atım hacmini depolar, diyastolde geri yaylanarak onu ileri iter; böylece kalbin kesik kesik pompası dokularda sürekli bir basınca dönüşür. [[K1 s. 155]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Aort gerilir, sonra geri yaylanır</h3></div>
    <div data-viz="f35_windkessel"></div>
    <p class="viz-cap" aria-live="polite"><b>Genç, esnek aort.</b> Sistolde LV yaklaşık 70 mL atım hacmi atar; aort genişler ve basınç 80'den yalnız 120 mmHg'ye çıkar. Diyastolde duvar geri yaylanır, akım sürer. Kompliyansı azaltın. [[K1 s. 155]]</p>
    <p class="viz-foot">Şematik model. 70 mL, 120/80 mmHg ve yaşla sistolik hipertansiyon kitaptandır [[K1 s. 155]]; sert aorttaki basınç değerleri temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Atılan kan kinetik enerji taşır; gerilen aort duvarında ise potansiyel enerji depolanır. Diyastolde duvarın geri yaylanması bu potansiyel enerjiyi yeniden kinetik enerjiye çevirir: ileri akım ve diyastolik kan basıncı (DBP) korunur. Kalp kapaklarıyla birlikte bu etki, kalpteki sinüzoidal basınç dalgasını dokuda pozitif ve sabit bir basınca çevirir; alternatif akımın doğru akıma çevrilmesi gibi. [[K1 s. 155]]</p>
    <p>Yaşla aort duvarındaki elastin dejenere olur ve kompliyans azalır. Sert aort atım hacmini büyük basınç artışı olmadan karşılayamaz; yaşlıda sistolik hipertansiyonun nedeni budur. [[K1 s. 155]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d35-dalga">
  <h2>Basınç dalgası akım dalgasından hızlıdır</h2>
  <p class="intro">Aorta kan atılması iki dalga doğurur: bir basınç dalgası ve bir akım dalgası; nabız olarak hissedilen basınç dalgasıdır. [[K1 s. 155]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>İki dalganın yarışı</h3></div>
    <div data-viz="f35_yayilim"></div>
    <p class="viz-cap" aria-live="polite"><b>Bir atım.</b> Basınç dalgası (duvardaki şişkinlik) ≈ 4 m/s, kanın kendisi ortalama 20 cm/s ilerler. Basınç dalgası bilekteki parmağa çoktan ulaşmışken kan aorttan henüz çıkmamıştır. [[K1 s. 155]]</p>
    <p class="viz-foot">Hızlar kitaptandır [[K1 s. 155]]; arter boyu ve süreler şematiktir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Basınç dalgası, aortun esnek duvarının sistolde gerilmesiyle oluşur ve duvar boyunca arter ağacına yayılır. Kan ise çok daha yavaş akar; radiyal nabız bu yüzden akım dalgasını değil basınç dalgasını yansıtır. [[K1 s. 155]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d35-aort">
  <h2>Aortta dalga biçimi: yükseliş, tepe, dikrotik çentik</h2>
  <p class="intro">Aort dalga biçimi diyastol sonundan başlayarak okunur: LV kanı atınca basınç sistolik tepeye yükselir, sonra diyastolik dibe iner; inişi aort kapağının kapanması keser. [[K1 s. 155]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Bir kalp siklusunda aort basıncı</h3></div>
    <div data-viz="f35_aort"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Diyastol sonu.</b> Basınç dipte, DBP 80 mmHg. Aort kapağı açılmak üzere. İleri düğmesiyle siklusu adım adım izleyin. [[K1 s. 155]]</p>
    <p class="viz-foot">Basınçlar (120/80 mmHg) kitaptandır [[K1 s. 155]]; eğrinin biçimi ve süreler şematiktir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Yükselişte kan aorta girer ve basınç artar; tepe sistolik kan basıncıdır (SBP). Aort kapağı kapandığında düzgün iniş kısa bir çentikle kesilir: dikrotik çentik. Diyastolde kan aorttan çıkıp gittikçe basınç DBP'ye düşer. [[K1 s. 155]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d35-periferik">
  <h2>Periferik arterlerde dalga biçimi değişir, MAP değişmez</h2>
  <p class="intro">Ölçüm yeri distale kaydıkça dalga sivrileşir: SBP artar, DBP azalır, ama ortalama arter basıncı (MAP) görece sabit kalır. [[K1 s. 156]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Aorttan dorsalis pedise dalga biçimi</h3></div>
    <div data-viz="f35_bolge"></div>
    <p class="viz-cap" aria-live="polite"><b>Aort.</b> Yükseliş görece yavaş, dikrotik çentik keskin ve yüksekte; aort kapağının kapanmasıyla oluşur. Ölçüm yerini distale kaydırın. [[K1 s. 155–156]]</p>
    <p class="viz-foot">Şematik. Ölçüm yerleri ve değişimlerin yönü kitaptandır [[K1 s. 156]]; her yerdeki basınç değerleri temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Distalde yükseliş dikleşir; dikrotik çentik eğride daha aşağıya iner ve keskin bir kesinti olmaktan çıkıp bir dikrotik dalgaya dönüşür. Nedeni, periferdeki dikrotik dalganın aort kapağı kapanmasından değil, basınç dalgasının yansımalarından oluşmasıdır. [[K1 s. 156]]</p>
    <p>MAP'ın ölçüm yerinden bağımsız olarak hemen aynı kalması, onun kan basıncının en önemli ölçüsü sayılmasının bir başka nedenidir. [[K1 s. 156]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d35-bilgi">
  <h2>Dalga biçiminden başka ne okunur?</h2>
  <p class="intro">Arter çizgisi çoğu zaman yalnız SBP, DBP, MAP ve kalp hızı için kullanılır; oysa dalganın yükselişi, inişi, solunumla salınımı ve alanı kontraktilite, SVR, volüm durumu ve atım hacmi hakkında bilgi verir. [[K1 s. 156]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Karakteristik dalga biçimleri</h3></div>
    <div data-viz="f35_morfoloji"></div>
    <p class="viz-cap" aria-live="polite"><b>"Normal".</b> Yükselişin eğimi kontraktiliteyi, inişin biçimi ve dikrotik çentiğin yüksekliği SVR'yi yansıtır. Bir durum seçin. [[K1 s. 156–157]]</p>
    <p class="viz-foot">Şematik dalgalar; değişimlerin yönü ve etiketler kitaptandır [[K1 s. 156–157]], sayısal değerler temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Kontraktilite.</b> Yükselişin eğimi birim zamanda üretilen basıncı gösterir: dik yükseliş daha güçlü kasılmayı düşündürür. Aort darlığında (AS) eğim bazen azalır ve nabız basıncı düşüktür. Aort yetmezliğinde (AR) kontraktilite genellikle normaldir; dalga çoğu kez bisferiens (çift tepeli) görünür, nabız basıncı artmıştır. [[K1 s. 156–157]]</p>
    <p><b>Sistemik vasküler direnç (SVR).</b> İniş SVR'yi yansıtır. Dik iniş ve alçak dikrotik çentik düşük SVR'dir; dalga ince ve sivri görünür. Yüksek dikrotik çentik yüksek SVR'yi düşündürür. [[K1 s. 156–157]]</p>
  </div>
  <div class="viz" style="margin-top:18px">
    <div class="viz-head"><h3>Pozitif basınçlı ventilasyonda solunumsal salınım</h3></div>
    <div data-viz="f35_solunum"></div>
    <p class="viz-cap" aria-live="polite"><b>Normovolemi.</b> Sistolik tepeler solunumla az değişir. Volümü azaltın: inspiryum ve ekspiryum arasında atımdan atıma fark büyür. Alan 1 en büyük, Alan 2 en küçük atım hacmidir. [[K1 s. 156–157]]</p>
    <p class="viz-foot">Şematik: 0–15 s, inspiryum–ekspiryum–inspiryum düzeni kitaptandır [[K1 s. 157]]; salınım büyüklükleri ve SVV değerleri temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Hipovolemi.</b> Pozitif basınçla ventile edilen hastada arter dalgasının solunumla salınması hipovolemi göstergesidir: önyük solunum siklusu boyunca değiştiği için sistolik basınç atımdan atıma değişir. [[K1 s. 156]]</p>
    <p><b>Nabız kontur analizi.</b> Atım hacmi dalganın sistolik bölümünün altındaki alanla orantılıdır; nabız kontur analizi kalp debisini buradan hesaplar (Bölüm 29). Atım hacmi değişimi (SVV) en küçük (Alan 2) ve en büyük (Alan 1) atım hacminden bulunur. [[K1 s. 156]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap SVV'yi "en küçük atım hacminin en büyüğe bölünmesi" diye verir; bu bir orandır, değişim değildir. Klinik monitörler SVV'yi (SVmaks − SVmin) / SVortalama × %100 olarak hesaplar.</div>
</section>

<section class="wrap blk ders-sec" id="d35-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de bu bölümden Windkessel etkisi ve yaşla sistolik hipertansiyon, basınç dalgası (≈ 4 m/s) ile akım hızının (20 cm/s) farkı, dikrotik çentiğin kaynağı, distalde SBP–DBP–MAP değişimi ve dalga biçiminin klinik okunuşu (AS, AR, SVR, solunumsal salınım, nabız kontur analizi) sorulur. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz35-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz35-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz35-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d35-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Radiyal arter kanülü olan bir hastanın monitöründeki dalgayı çizin ve bölümlerini anlatın. Aortta ölçülen dalgadan nasıl farklıdır ve bu dalgadan başka hangi bilgileri çıkarabilirsiniz?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Windkessel.</b> LV ≈ 70 mL atar; esnek aort gerilir, basınç 80'den 120 mmHg'ye çıkar. Diyastolde geri yaylanma potansiyel enerjiyi kinetik enerjiye çevirir, akımı ve DBP'yi korur: kesikli pompa dokuda sabit basınç (AC → DC). Yaşla elastin kaybı → sistolik hipertansiyon. [[K1 s. 155]]</li>
    <li><b>Basınç dalgası.</b> Duvarın gerilmesiyle oluşur, ≈ 4 m/s yayılır; ortalama aort kan hızı 20 cm/s. Nabız basınç dalgasıdır. [[K1 s. 155]]</li>
    <li><b>Aort dalga biçimi.</b> Diyastol sonu → kapak açılır, yükseliş → SBP → iniş → aort kapağı kapanır: dikrotik çentik → diyastolde DBP'ye iniş. [[K1 s. 155]]</li>
    <li><b>Periferde fark.</b> Daha dik yükseliş, daha yüksek SBP, daha düşük DBP, MAP görece sabit; dikrotik çentik aşağı kayar ve dikrotik dalgaya dönüşür, çünkü yansımalardan oluşur. [[K1 s. 156]]</li>
    <li><b>Ek bilgiler.</b> Yükseliş eğimi kontraktilite (AS'de azalır, nabız basıncı düşük; AR'de bisferiens, nabız basıncı geniş); iniş ve dikrotik çentik SVR (alçak çentik düşük, yüksek çentik yüksek SVR). [[K1 s. 156–157]]</li>
    <li><b>Volüm ve debi.</b> PPV'de sistolik basıncın solunumla salınması hipovolemi (önyük değişimi); sistolik alan atım hacmiyle orantılı → nabız kontur analizi ile kalp debisi ve SVV (Alan 1 en büyük, Alan 2 en küçük). [[K1 s. 156–157]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. y ekseni 60–120 mmHg, x ekseni zaman (s). Bir aort dalgası çizin: SBP 120, DBP 80, keskin dikrotik çentik "aort kapağı kapanır" etiketiyle. Yanına radiyal dalgayı ekleyin: daha dik ve yüksek tepe, daha alçak dip, aşağıda yumuşak dikrotik dalga; ikisinden geçen yatay MAP çizgisi.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Windkessel etkisi yaşlıda neden zayıflar ve sonucu nedir? Nabız neden akım dalgası değildir? Periferde dikrotik çentik neden aşağı kayar? Düşük SVR'de dalga nasıl görünür? Arter dalgasından volüm durumu ve atım hacmi nasıl çıkarılır? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 155–157]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d35-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Windkessel: aort sistolde gerilip ≈ 70 mL'yi depolar (80 → 120 mmHg), diyastolde geri yaylanarak akımı ve DBP'yi sürdürür; kapaklarla birlikte pulsatil basıncı dokuda sabit basınca çevirir. [[K1 s. 155]]</li>
    <li>Yaşla elastin dejenerasyonu aort kompliyansını azaltır; sonuç yaşlıda sistolik hipertansiyondur. [[K1 s. 155]]</li>
    <li>Nabız, ≈ 4 m/s yayılan basınç dalgasıdır; kanın ortalama aort hızı yalnız 20 cm/s'dir. [[K1 s. 155]]</li>
    <li>Aortta dikrotik çentik aort kapağının kapanmasıdır; periferde aşağı kayıp yansımalardan oluşan bir dikrotik dalgaya dönüşür. [[K1 s. 155–156]]</li>
    <li>Distale doğru: yükseliş dikleşir, SBP artar, DBP azalır, MAP görece sabit kalır. [[K1 s. 156]]</li>
    <li>Yükseliş eğimi kontraktilite (AS'de azalır; AR'de bisferiens, geniş nabız basıncı); iniş ve çentik yüksekliği SVR. [[K1 s. 156–157]]</li>
    <li>PPV'de solunumsal salınım hipovolemiyi gösterir; sistolik alan atım hacmiyle orantılıdır: nabız kontur analizi, kalp debisi, SVV. [[K1 s. 156–157]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="35"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/34">← Bölüm 34 · Arteriyel sistem</a>
    <a href="#/dersler/fizyoloji/36">Sonraki: Bölüm 36 · Kapillerler ve endotel →</a>
  </nav>
</section>`,
};
