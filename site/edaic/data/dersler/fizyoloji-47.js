/* Fizyoloji Bölüm 47 · Kan–beyin bariyeri (K1 İngilizce baskı s. 200–201).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz47-1'] = {
  no: 1, kok: 'Kan–beyin bariyerinin (BBB) yapısı ve işlevleri için:', kagit: 'Paper A · fizyoloji, Bölüm 47', kaynak: '[[K1 s. 200]]',
  onermeler: [
    { t: 'BBB\'nin en önemli işlevi, beyin hücre dışı sıvısının bileşimini kandaki dalgalanmalardan bağımsız olarak sabit tutmaktır.', d: true, n: 'Doğru. Örneğin egzersizdeki plazma pH ve K⁺ değişiklikleri MSS\'ye geçseydi nöron etkinliğini baskılayabilirdi. [[K1 s. 200]]' },
    { t: 'BBB, MSS nörotransmiterlerinin sistemik dolaşıma salınmasını da önler.', d: true, n: 'Doğru. Bu, BBB\'nin üç işlevinden biridir; ötekiler sabit ortamı korumak ve beyni zararlı ya da nöroaktif maddelerden korumaktır. [[K1 s. 200]]' },
    { t: 'BBB kapillerlerinde mitokondri yoğunluğu beyin dışı kapillerlerden düşüktür.', d: false, n: 'Yanlış. Yüksek mitokondri yoğunluğu BBB kapillerlerini ayırt eder ve iyonların aktif taşınmasının yüksek metabolik etkinliğini yansıtır. [[K1 s. 200]]' },
    { t: 'Astrositlerin ayaksı uzantıları kapiller endotelin geçirgenliğini artıran maddeler salgılar.', d: false, n: 'Yanlış. Astrositler endotel geçirgenliğini azaltan kimyasallar salgılar. [[K1 s. 200]]' },
    { t: 'Koroid pleksus endoteli astrositlerle çevrili olmadığından geçirgenliği yüksektir.', d: true, n: 'Doğru. BBB\'nin üç tabakası endotel, kalın bazal membran ve astrosit ayaksı uzantılarıdır; koroid pleksusta üçüncüsü yoktur. [[K1 s. 200]]' },
  ],
};
VERI.sorular['fiz47-2'] = {
  no: 2, kok: 'Maddelerin BBB\'yi geçişi için:', kagit: 'Paper A · fizyoloji, Bölüm 47', kaynak: '[[K1 s. 200–201]]',
  onermeler: [
    { t: 'Glukoz GLUT1 taşıyıcılarıyla, ATP harcanarak konsantrasyon gradyanına karşı taşınır.', d: false, n: 'Yanlış. GLUT1 kolaylaştırılmış difüzyonla, gradyan yönünde ve ATP gerektirmeden taşır. [[K1 s. 200]]' },
    { t: 'İyonların taşınması zarla denetlendiği için kan ile BOS\'un pH\'sı ve iyon konsantrasyonları farklı olabilir.', d: true, n: 'Doğru. Na⁺, K⁺, Mg²⁺, Ca²⁺, Cl⁻, HCO₃⁻ ve H⁺ aktif taşıma dahil zar süreçleriyle geçer. [[K1 s. 200]]' },
    { t: 'Dopamin BBB\'yi geçemez; öncülü L-DOPA ise kolaylaştırılmış difüzyonla taşınır.', d: true, n: 'Doğru. Bu yüzden Parkinson hastalığında dopamin değil L-DOPA verilir. [[K1 s. 201]]' },
    { t: 'Amonyak küçük ve lipofilik olduğu için normalde nöronlara önemli konsantrasyonlarda ulaşır.', d: false, n: 'Yanlış. NH₃ astrositlerde hızla glutamine metabolize edilir ve normalde nöronlara önemli miktarda ulaşmaz. [[K1 s. 201]]' },
    { t: 'İnsülinin BBB\'yi pinositozla geçtiği düşünülür.', d: true, n: 'Doğru. Su ise akuaporin porlarından geçer. [[K1 s. 200]]' },
  ],
};
VERI.sorular['fiz47-3'] = {
  no: 3, kok: 'İlaçların BBB\'yi geçişi ve sirkumventriküler organlar için:', kagit: 'Paper A · fizyoloji, Bölüm 47', kaynak: '[[K1 s. 201]]',
  onermeler: [
    { t: 'Diamorfin, morfinden daha lipofilik olduğu için BBB\'yi yaklaşık 100 kat daha kolay geçer.', d: true, n: 'Doğru. Lipofilikliği artırmak, ilaçları beyne ulaştırma yollarından biridir. [[K1 s. 201]]' },
    { t: 'Menenjitte BBB güçlenir ve antibiyotiklerin beyne geçişi azalır.', d: false, n: 'Yanlış. İnflamasyon BBB\'yi zayıflatır; normalde geçmeyen antibiyotikler menenjitte etkili olabilir. [[K1 s. 201]]' },
    { t: 'Sirkumventriküler organların kapillerleri fenestralıdır.', d: true, n: 'Doğru. Bu yüzden BBB burada "sızdıran" bir bariyerdir ve bu yapıların BBB dışında olduğu söylenir. [[K1 s. 201]]' },
    { t: 'Sirkumventriküler organlarda kan–BOS bariyeri de bozuktur; kapillerden sızan maddeler BOS yoluyla nöronlara ulaşır.', d: false, n: 'Yanlış. Kan–BOS bariyeri sağlam kalır; maddeler organa sızar ama BOS\'a girip nöronlara ulaşamaz. [[K1 s. 201]]' },
    { t: 'Hipofiz arka lobu altı hormonu doğrudan sistemik dolaşıma salgılar.', d: false, n: 'Yanlış. Hipofiz sekiz hormon salgılar: altısı ön, ikisi arka lobdan. [[K1 s. 201]]' },
  ],
};

const D47_NAV = [
  ['d47-yapi', 'İşlev ve katmanlar'], ['d47-gecis', 'Geçiş yolları'], ['d47-ilac', 'Klinik: ilaçlar'],
  ['d47-cvo', 'BBB dışı yapılar'], ['d47-p1', 'Part I'], ['d47-p2', 'Part II'], ['d47-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/47'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 4 · Nörofizyoloji · Bölüm 47', baslik: 'Kan–beyin bariyeri',
  lede: 'Kan–beyin bariyeri (BBB), serebral kapillerler düzeyinde fizyolojik, hücresel ve metabolik bir bariyerdir; kapillerlerle beynin hücre dışı sıvısı (ECF) arasındaki serbest madde geçişini kısıtlar. [[K1 s. 200]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D47_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d47-yapi">
  <h2>BBB ne işe yarar, nelerden oluşur?</h2>
  <p class="intro">Üç katman, beyni kandaki dalgalanmalardan yalıtan ve lipofobik moleküllere neredeyse geçit vermeyen bir duvar kurar. [[K1 s. 200]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Beyin kapilleri kesiti: üç katman</h3></div>
    <div data-viz="f47_katman"></div>
    <p class="viz-cap" aria-live="polite"><b>Endotel hücreleri.</b> Sıkı bağlantılarla birbirine kenetlenir; çok sayıda mitokondri içerir. Bir katmana dokunun ya da koroid pleksusla karşılaştırın. [[K1 s. 200]]</p>
    <p class="viz-foot">Şematik kesit; boyutlar ölçekli değildir. Koroid pleksus görünümündeki aralıklar yalnız yüksek geçirgenliği simgeler.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>BBB'nin üç işlevi vardır. En önemlisi MSS'de sabit bir hücre dışı ortamı korumaktır: kandaki çözünen konsantrasyonları çok değişir ve nöronlar buna doğrudan maruz kalsa işlevleri bozulabilir; örneğin egzersizin yol açtığı plazma pH ve K⁺ değişiklikleri nöron etkinliğini baskılayabilirdi. Ayrıca beyni kanla gelen zararlı ya da nöroaktif maddelerden korur ve MSS nörotransmiterlerinin sistemik dolaşıma kaçmasını önler. [[K1 s. 200]]</p>
    <p>Katmanlar: (1) sıkı bağlantılı endotel; beyin dışı kapillerlerden farkı yüksek mitokondri yoğunluğudur. (2) Endotelin altındaki kalın bazal membran. (3) Destek glia hücresi olan astrositlerin, kapilleri sarıp ona yapışan ayaksı uzantıları; astrositler endotel geçirgenliğini azaltan kimyasallar salgılar. Koroid pleksus astrositlerle sarılı değildir; endoteli bu yüzden çok geçirgendir. [[K1 s. 200]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap bu duvarı "sürekli kapillere benzer" diye anlatır; oysa sıradan sürekli kapillerde endotel arası yarıklar küçük suda çözünen maddeleri geçirir. BBB, sıkı bağlantıları sayesinde ondan çok daha sızdırmazdır.</div>
</section>

<section class="wrap blk ders-sec" id="d47-gecis">
  <h2>Maddeler nasıl geçer, hangileri dışarıda kalır?</h2>
  <p class="intro">Bazı sinyal ve besin maddeleri dört yoldan beyin ECF'sine girer; katekolaminler gibi bazı maddeler ise geçemez ya da sıkı denetlenir. [[K1 s. 200–201]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Molekül seçin: BBB'yi hangi yoldan geçer?</h3></div>
    <div data-viz="f47_gecis"></div>
    <p class="viz-cap" aria-live="polite"><b>O₂ · basit difüzyon.</b> Küçük, lipitte çözünen molekül endotelin fosfolipit çift katmanından doğrudan geçer. Başka bir molekül seçin. [[K1 s. 200]]</p>
    <p class="viz-foot">Şematik; taşıyıcı ve por simgeleri temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Yol</th><th>Örnekler</th><th>Not</th></tr></thead>
      <tbody>
        <tr><td>Basit difüzyon</td><td>O₂, CO₂, etanol, steroid hormonlar</td><td>Küçük, lipitte çözünen; başka hücresel bariyerlerdeki gibi [[K1 s. 200]]</td></tr>
        <tr><td>Aktif taşıma</td><td>Na⁺, K⁺, Mg²⁺, Ca²⁺, Cl⁻, HCO₃⁻, H⁺</td><td>Zar denetler; kan ile BOS'un pH'sı ve iyonları farklı olabilir. Bol mitokondri bu yükü karşılar [[K1 s. 200]]</td></tr>
        <tr><td>Kolaylaştırılmış difüzyon</td><td>Glukoz (GLUT1), su (akuaporin), L-DOPA</td><td>Gradyan yönünde; GLUT1 ATP gerektirmez [[K1 s. 200–201]]</td></tr>
        <tr><td>Pinositoz</td><td>İnsülin (olası)</td><td>Bölüm 4 [[K1 s. 200]]</td></tr>
      </tbody>
    </table></div>
    <p>Geçemeyenler: noradrenalin ve dopamin gibi katekolaminler. Dopamin geçmez ama öncülü L-DOPA kolaylaştırılmış difüzyonla girer; substantia nigrada dopamin eksikliği olan Parkinson hastasına bu yüzden L-DOPA verilir. Glisin ve glutamik asit gibi nörotransmiter olan amino asitlerin taşınması sıkı düzenlenir. Amonyak (NH₃) küçük ve lipofiliktir, geçmesi beklenir; ama astrositlerde hızla glutamine çevrilir ve nöronlara normalde önemli miktarda ulaşmaz. [[K1 s. 201]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d47-ilac">
  <h2>Klinik önem: ilaçlar BBB'yi nasıl geçer?</h2>
  <p class="intro">Sıkı bağlantılar dışarıdan gelen molekülleri de durdurur; BBB, MSS'ye ilaç ulaştırmanın başlıca engelidir. [[K1 s. 201]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Dört yol ve inflamasyon</h3></div>
    <div data-viz="f47_ilac"></div>
    <p class="viz-cap" aria-live="polite"><b>Lipitte çözünen ilaç.</b> Propofol, tiyopental, volatil anestezikler, benzodiazepinler ve fenitoin basit difüzyonla geçer. Bir yol seçin ya da inflamasyonu açın. [[K1 s. 201]]</p>
    <p class="viz-foot">Şematik; geçiş çubukları yalnız yönü gösterir, ölçülmüş değer değildir (100 kat oranı kitaptandır).</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>İkinci yol bariyeri atlamaktır: intratekal metotreksat ya da polimere bağlı kemoterapi ajanlarının beyin içine yerleştirilmesi. Üçüncüsü transmembran taşıyıcıdır: L-DOPA nötral amino asit taşıyıcısıyla girer ve beyinde dopamine çevrilir. Dördüncüsü lipofilikliği artırmaktır: diamorfin, ana bileşiği morfinden 100 kat kolay geçer. İnflamasyon da bariyeri zayıflatır; normalde geçmeyen antibiyotikler menenjitte etkili olabilir. [[K1 s. 201]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d47-cvo">
  <h2>Hangi yapılar BBB'nin dışındadır?</h2>
  <p class="intro">Beyin, kanın bileşimini algılamak ve hormon salgılamak için dolaşımla doğrudan bağını korur: sirkumventriküler organların kapillerleri fenestralıdır, BBB burada "sızdırır". [[K1 s. 201]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Sirkumventriküler organlar ve sağlam kan–BOS bariyeri</h3></div>
    <div data-viz="f47_cvo"></div>
    <p class="viz-cap" aria-live="polite"><b>Area postrema.</b> Kemoreseptör tetik bölgesi: kanda zararlı madde olunca kusma merkezine afferent sinyal gönderip kusmayı tetikler. Bir yapıya dokunun ya da sızıntıyı oynatın. [[K1 s. 201]]</p>
    <p class="viz-foot">Şematik orta hat kesiti; konumlar yaklaşık.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Kitap bu yapıları üçüncü ventrikül çevresinde sayar: area postrema, ozmolariteyi izleyen osmoreseptörleriyle hipotalamus, sekiz hormonu doğrudan kana veren hipofiz (altısı ön, ikisi arka lob), melatonin salgılayan pineal bez ve plazmadan BOS üreten koroid pleksus. Bu organlarda BBB eksik olsa da kan–BOS bariyeri sağlamdır: maddeler organa sızar, ama BOS'a geçip beyin nöronlarına ulaşamaz. [[K1 s. 201]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Area postrema üçüncü değil dördüncü ventrikülün tabanında, obeksin yanındadır (kitabın Bölüm 63'ünde de böyle geçer, K1 s. 287). Öteki yapılar üçüncü ventrikül çevresindedir.</div>
</section>

<section class="wrap blk ders-sec" id="d47-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: BBB'nin üç işlevi ve üç katmanı, mitokondri yoğunluğu, astrositlerin etkisi, koroid pleksusun geçirgenliği, dört geçiş yolu ve örnekleri, GLUT1'in ATP gerektirmemesi, dopamin–L-DOPA, amonyağın glutamine çevrilmesi, ilaç geçiş yolları (diamorfin 100 kat, menenjit), sirkumventriküler organlar ve sağlam kan–BOS bariyeri. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz47-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz47-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz47-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d47-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Kan–beyin bariyerini anlatın. Hangi maddeler geçer, hangileri geçemez ve bunun anestezistler için önemi nedir?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım ve işlev.</b> Serebral kapillerler düzeyinde fizyolojik, hücresel, metabolik bariyer; sabit ECF (en önemlisi; ör. egzersizde pH ve K⁺), zararlı/nöroaktif maddelerden koruma, nörotransmiterlerin kana kaçmasını önleme. [[K1 s. 200]]</li>
    <li><b>Katmanlar.</b> Sıkı bağlantılı, mitokondrisi bol endotel; kalın bazal membran; geçirgenliği azaltan astrosit ayaksı uzantıları. Koroid pleksusta astrosit yok, endotel geçirgen. [[K1 s. 200]]</li>
    <li><b>Geçiş yolları.</b> Basit difüzyon (O₂, CO₂, etanol, steroid); iyonların aktif taşınması (kan ve BOS farklı olabilir); kolaylaştırılmış difüzyon (GLUT1, ATP'siz; su akuaporinle); pinositoz (insülin). [[K1 s. 200]]</li>
    <li><b>Dışlananlar.</b> Katekolaminler (dopamin geçmez, L-DOPA geçer: Parkinson tedavisi); nörotransmiter amino asitler sıkı denetimli; NH₃ astrositte glutamine çevrilir. [[K1 s. 201]]</li>
    <li><b>İlaçlar.</b> Lipitte çözünenler (propofol, tiyopental, volatiller, benzodiazepinler, fenitoin); atlama (intratekal metotreksat, beyin içi implant); taşıyıcı (L-DOPA); lipofiliklik (diamorfin morfinden 100 kat); menenjitte antibiyotik geçişi artar. [[K1 s. 201]]</li>
    <li><b>Sirkumventriküler organlar.</b> Fenestralı kapillerler: area postrema, hipotalamus, hipofiz (8 hormon: 6 ön, 2 arka), pineal bez, koroid pleksus; kan–BOS bariyeri sağlam. [[K1 s. 201]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Bir beyin kapillerinin enine kesitini çizin: lümen, sıkı bağlantılı endotel (içinde mitokondriler), kalın bazal membran, dışta astrosit ayaksı uzantıları. Duvarın yanına dört okla geçiş yollarını ve örneklerini yazın. [[K1 s. 200]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Parkinson'da neden dopamin değil L-DOPA verilir? Diamorfin BBB'yi neden morfinden daha kolay geçer? Menenjitte antibiyotik seçimi neden farklı düşünülür? Kemoreseptör tetik bölgesi neden kandaki toksinleri algılayabilir? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 201]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d47-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>BBB sabit bir beyin ECF'si sağlar, beyni zararlı maddelerden korur ve nörotransmiterlerin kana kaçmasını önler. [[K1 s. 200]]</li>
    <li>Üç katman: sıkı bağlantılı ve mitokondrisi bol endotel, kalın bazal membran, astrosit ayaksı uzantıları; koroid pleksusta astrosit yoktur. [[K1 s. 200]]</li>
    <li>Lipitte çözünen küçük moleküller difüzyonla, iyonlar aktif taşımayla, glukoz GLUT1 ve su akuaporinle, insülin pinositozla geçer. [[K1 s. 200]]</li>
    <li>Katekolaminler geçmez, L-DOPA geçer; amonyak astrositte glutamine dönüşür. [[K1 s. 201]]</li>
    <li>İlaçlar lipitte çözünerek, bariyeri atlayarak, taşıyıcıyla ya da lipofiliklik artırılarak girer; inflamasyon bariyeri zayıflatır. [[K1 s. 201]]</li>
    <li>Sirkumventriküler organların fenestralı kapillerleri kanı algılamaya ve hormon salgılamaya izin verir; kan–BOS bariyeri yine sağlamdır. [[K1 s. 201]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="47"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/46">← Bölüm 46 · Beyin–omurilik sıvısı</a>
    <a href="#/dersler/fizyoloji/48">Sonraki: Bölüm 48 · Serebral kan akımı →</a>
  </nav>
</section>`,
};
