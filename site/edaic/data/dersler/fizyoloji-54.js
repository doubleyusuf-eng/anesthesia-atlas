/* Fizyoloji Bölüm 54 · İskelet kası (K1 İngilizce baskı s. 239–245).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz54-1'] = {
  no: 1, kok: 'İskelet kasının yapısı ve sarkomer için:', kagit: 'Paper A · fizyoloji, Bölüm 54', kaynak: '[[K1 s. 239–241]]',
  onermeler: [
    { t: 'İskelet kası hücrelerinin çekirdekleri, kalp ve düz kastaki gibi hücrenin ortasında yer alır.', d: false, n: 'Yanlış. Miyositler çok çekirdeklidir ve çekirdekleri çevrede (sarkolemmanın altında) durur; kalp ve düz kastan farkı budur. [[K1 s. 239]]' },
    { t: 'Yaklaşık 100 miyositin perimisyumla sarılı demetine fasikül denir.', d: true, n: 'Doğru. Endomisyum tek miyositi, perimisyum fasikülü, epimisyum bütün kası sarar. [[K1 s. 239]]' },
    { t: 'Kasılma sırasında A bandının genişliği azalır.', d: false, n: 'Yanlış. Kalın filamanlar kısalmadığı için A bandı değişmez; Z diskleri yaklaşır, I bandı daralır. [[K1 s. 243]]' },
    { t: 'H bandı, A bandının yalnız miyozin içeren kısmıdır.', d: true, n: 'Doğru. A bandı kalın filamanın bütün boyudur; ortasında ince filamanla örtüşmeyen kısım H bandıdır. [[K1 s. 240]]' },
    { t: 'Troponin C, troponin kompleksini tropomiyozine bağlayan alt birimdir.', d: false, n: 'Yanlış. Kompleksi tropomiyozine troponin T bağlar; troponin C Ca²⁺ bağlama bölgesini taşır. [[K1 s. 241]]' },
  ],
};
VERI.sorular['fiz54-2'] = {
  no: 2, kok: 'Uyarılma–kasılma eşleşmesi ve malign hipertermi için:', kagit: 'Paper A · fizyoloji, Bölüm 54', kaynak: '[[K1 s. 241–242]]',
  onermeler: [
    { t: 'SR\'den Ca²⁺ salınması hücre içi Ca²⁺ derişimini yaklaşık 2000 kat artırır.', d: true, n: 'Doğru. [[K1 s. 242]]' },
    { t: 'Malign hipertermiye yol açan genetik bozukluk bir RyR mutasyonudur.', d: true, n: 'Doğru. Tetiklenen anormal RyR, SR\'den denetimsiz Ca²⁺ salınmasına izin verir. [[K1 s. 242]]' },
    { t: 'İskelet kasında kasılmayı başlatan Ca²⁺, ağırlıkla DHPR kanalından hücre dışından girer.', d: false, n: 'Yanlış. DHPR depolarizasyonu algılar ama çok az Ca²⁺ geçirir; Ca²⁺, DHPR\'ye fiziksel olarak bağlı RyR açılınca SR\'den salınır. [[K1 s. 242]]' },
    { t: 'Evrensel olarak kabul gören malign hipertermi tetikleyicileri halojenli volatil anestezikler ve süksametonyumdir.', d: true, n: 'Doğru. Kitaba göre kabul gören tetikleyiciler yalnız bunlardır. [[K1 s. 242]]' },
    { t: 'Malign hipertermide SR\'nin Ca²⁺-ATPaz etkinliği azalır, bu da ATP tüketimini azaltır.', d: false, n: 'Yanlış. SR\'nin Ca²⁺ geri alımı artar ve ATP tüketimini daha da artırır; sonuç hipermetabolizma ve metabolik asidozdur. [[K1 s. 242]]' },
  ],
};
VERI.sorular['fiz54-3'] = {
  no: 3, kok: 'Çapraz köprü döngüsü, kasılma kuvveti ve kas hastalıkları için:', kagit: 'Paper A · fizyoloji, Bölüm 54', kaynak: '[[K1 s. 242–245]]',
  onermeler: [
    { t: 'Kuadriseps femoriste bir motor ünitede 1000\'den fazla miyosit bulunur.', d: true, n: 'Doğru. İnce denetim isteyen ekstraoküler kaslarda ise bu sayı 10\'a kadar iner. [[K1 s. 244]]' },
    { t: 'Miyozin başına ATP bağlanınca başın aktine afinitesi artar ve çapraz köprü oluşur.', d: false, n: 'Yanlış. Miyozin–ATP kompleksinin aktine afinitesi düşüktür; ATP bağlanması çapraz köprüyü koparır. Köprüyü, ATP hidrolizi ile enerji yüklenmiş baş kurar. [[K1 s. 242–243]]' },
    { t: 'İskelet kasında refrakter dönem, gerimin gevşemesinden ve Ca²⁺\'un SR\'ye geri alınmasından daha kısadır.', d: true, n: 'Doğru. Bu yüzden sık aksiyon potansiyelleri sitoplazmada Ca²⁺ biriktirir ve tetanus oluşur. [[K1 s. 244]]' },
    { t: 'Duchenne musküler distrofisi otozomal dominant geçişlidir ve genellikle ergenlikte başlar.', d: false, n: 'Yanlış. DMD X\'e bağlı resesiftir; 3–5 yaşında proksimal güçsüzlükle başlar. Ergenlikte başlayan, daha hafif olan Becker distrofisidir. [[K1 s. 244–245]]' },
    { t: 'Yoğun bakım kaynaklı güçsüzlükte kranial sinirler görece korunur.', d: true, n: 'Doğru. Simetrik, flask, bütün kas gruplarını tutan güçsüzlüktür; hastalar günde ortalama %2–4 kas kütlesi kaybeder. [[K1 s. 245]]' },
  ],
};

const D54_NAV = [
  ['d54-islev', 'İşlevler'], ['d54-yapi', 'Kasın yapısı'], ['d54-sarkomer', 'Sarkomer'], ['d54-filaman', 'Filamanlar'],
  ['d54-ukm', 'Uyarılma–kasılma'], ['d54-mh', 'Malign hipertermi'], ['d54-kopru', 'Çapraz köprü'], ['d54-motor', 'Motor ünite'],
  ['d54-kuvvet', 'Kasılma kuvveti'], ['d54-hastalik', 'Kas hastalıkları'], ['d54-atrofi', 'Atrofi ve YBÜ'],
  ['d54-p1', 'Part I'], ['d54-p2', 'Part II'], ['d54-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/54'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 4 · Nörofizyoloji · Bölüm 54', baslik: 'İskelet kası',
  lede: 'Sarkolemmadaki aksiyon potansiyeli SR\'den Ca²⁺ salınmasına, Ca²⁺ da aktin ile miyozin arasında ATP harcayan çapraz köprü döngüsüne yol açar; bu zincir malign hipertermiden kas hastalıklarına kadar anestezinin birçok sorununun temelidir. [[K1 s. 241–244]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D54_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d54-islev">
  <h2>İskelet kası ne işe yarar?</h2>
  <p class="intro">İskelet kası yalnız hareket ettirmez: duruşu, iç organları, sfinkterleri, ısıyı ve venöz dönüşü de sağlar. [[K1 s. 239]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Altı işlev, vücut üzerinde</h3></div>
    <div data-viz="f54_islev"></div>
    <p class="viz-cap" aria-live="polite"><b>Hareket (lokomosyon).</b> Kas kasılınca orijin ile insersiyon noktası arasındaki uzaklık kısalır ve eklem hareket eder. Başka bir işlev seçin. [[K1 s. 239]]</p>
    <p class="viz-foot">Şematik insan silueti.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Duruş ve eklem dengesi, birbirini destekleyen ve karşıt kas gruplarının sürekli (tonik) kasılmasıyla sağlanır. Karın duvarı ve pelvik taban kasları altlarındaki organları taşır ve korur. Yutma, defekasyon ve işemenin istemli denetimi iskelet kası sfinkterleriyle olur. [[K1 s. 239]]</p>
    <p>Isı, kasın bazal metabolizmasının değişmesiyle ve titremeyle (kasın art arda kasılıp gevşemesi) üretilir. Bacak kasları kasıldıkça yerel basınç farkı oluşturur ve venöz kanı kalbe doğru iter. [[K1 s. 239]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d54-yapi">
  <h2>Kastan miyofilamana: makroskopik ve mikroskopik yapı</h2>
  <p class="intro">Bir kas, bağ dokusu kılıflarıyla gruplanmış çok sayıda kas lifinden (miyosit) oluşur; her lifin içinde de paralel miyofibriller ve onların içinde aktin–miyozin miyofilamanları vardır. [[K1 s. 239]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Beş büyütme düzeyi</h3></div>
    <div data-viz="f54_yapi"></div>
    <p class="viz-cap" aria-live="polite"><b>Kas.</b> Bütün kası kalın epimisyum sarar; iki uçta bağ dokusu katmanları birleşip tendon ya da aponevroz olur ve kası genellikle kemiğe bağlar. Yakınlaştırın. [[K1 s. 239]]</p>
    <p class="viz-foot">Şematik; ölçekler gerçek oranda değildir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Kası kan damarları ve sinirler besler. Bağ dokusu üç katmandır: tek miyositi saran ince <b>endomisyum</b>, yaklaşık 100 miyositlik demetleri (fasikül) saran <b>perimisyum</b> ve bütün kası saran kalın <b>epimisyum</b>. [[K1 s. 239]]</p>
    <p>Miyositin üç olağan dışı özelliği vardır: bir lif kasın bütün boyunca uzanabilir ve çapı 50 μm'ye ulaşabilir; hücre çok çekirdeklidir ve çekirdekler, kalp ve düz kastan farklı olarak çevrededir; tekrarlayan sarkomerler hücreye çizgili görünüm verir (kalp kasında da var, düz kasta yok). [[K1 s. 239]]</p>
    <p>Golgi aygıtı, mitokondri ve ribozomlara ek olarak miyositte özel yapılar bulunur: Ca²⁺'u depolayıp hızla salan ve geri alan <b>sarkoplazmik retikulum</b> (SR, değişmiş bir endoplazmik retikulum); aksiyon potansiyelini hücrenin derinine taşıyan sarkolemma çöküntüleri olan <b>T-tübüller</b>; uçlarından sarkolemmaya tutunduğu için kasılınca bütün hücreyi kısaltan <b>miyofibriller</b>; ve kasılmaya glukoz sağlayan <b>glikojen</b> depoları. [[K1 s. 239]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d54-sarkomer">
  <h2>Sarkomer ve bantları</h2>
  <p class="intro">Sarkomer iskelet kası lifinin işlevsel birimidir: iç içe geçmiş kalın (miyozin) ve ince (aktin) filamanların düzenli tekrarı açık ve koyu bantları, yani çizgilenmeyi oluşturur. [[K1 s. 240]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Sarkomeri kısaltın: hangi bant değişir?</h3></div>
    <div data-viz="f54_sarkomer"></div>
    <p class="viz-cap" aria-live="polite"><b>Dinlenme uzunluğu.</b> Sarkomer iki Z diski arasındadır: ortada bir A bandı, iki yanda yarım I bantları. Kaydırıcıyla kısaltın. [[K1 s. 240]]</p>
    <p class="viz-foot">Şematik; filaman uzunlukları ve sarkomer boyu temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Z diski</b> sarkomerin iki ucundadır ve I bandını ikiye böler; ince filamanlar bir ucundan Z diskine bağlıdır, kalın filamanlar ortadadır. <b>I bandı</b> (izotropik, açık) ince filamanın kalınla örtüşmeyen kısmıdır. <b>A bandı</b> (anizotropik, koyu) kalın filamanın örtüşen bölgeler dahil bütün boyudur; <b>H bandı</b> (Heller) A bandının yalnız miyozin içeren kısmıdır. Her memeli sarkomerinde bir A bandı ve iki yarım I bandı bulunur. [[K1 s. 240]]</p>
    <p>Kasılmada ince filamanlar kayar, filamanların kendisi kısalmaz: Z diskleri yaklaşır ve sarkomer kısalır, örtüşme arttıkça I bandı daralır, A bandı değişmez. [[K1 s. 243]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d54-filaman">
  <h2>Kalın ve ince filamanlar</h2>
  <p class="intro">Kalın filaman çapraz köprüyü kuran miyozin başlarını taşır; ince filamanda aktinin miyozin bağlama yerlerini tropomiyozin örter ve troponin, Ca²⁺ gelince bu örtüyü kaldırır. [[K1 s. 240–241]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Ca²⁺ ekleyin: bağlama yeri açılıyor</h3></div>
    <div data-viz="f54_filaman"></div>
    <p class="viz-cap" aria-live="polite"><b>Ca²⁺ yok.</b> Tropomiyozin aktindeki miyozin bağlama yerlerini kapatır; çapraz köprü kurulamaz. Ca²⁺ ekleyin ya da bir proteine dokunun. [[K1 s. 241]]</p>
    <p class="viz-foot">Şematik; kitaptaki gibi aktinin çift zinciri yerine tek zincir çizildi.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Kalın filaman:</b> miyozin büyük bir proteindir; iki küresel başı ve uzun bir kuyruğu vardır. Başlarda aktin ve ATP için ayrı bağlanma yerleri bulunur. Her kalın filamanı yaklaşık altıgen düzende altı ince filaman çevreler. [[K1 s. 240–241]]</p>
    <p><b>İnce filaman</b> üç proteinden oluşur. <b>Aktin</b> küresel bir proteindir; zincirleri çift sarmal yapar ve bir ince filamanda düzenli aralıklı miyozin bağlama yerleri taşıyan 300–400 aktin molekülü vardır. <b>Tropomiyozin</b> iki aktin zinciri arasındaki olukta uzanan lifli zincirdir. <b>Troponin</b> kompleksi tropomiyozin boyunca düzenli aralıklarla durur ve üç alt birimden oluşur: troponin <b>T</b> kompleksi tropomiyozine bağlar; troponin <b>I</b>'nın rolü kitaba göre belirsizdir, miyozin ATPaz etkinliğini inhibe ediyor olabilir; troponin <b>C</b> Ca²⁺ bağlama yerini taşır ve Ca²⁺ bağlanınca tropomiyozin aktin oluğunun derinine yuvarlanır. [[K1 s. 241]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Troponin I'nın işlevi bugün iyi bilinir: dinlenmede aktine bağlanır, tropomiyozini örtücü konumda tutarak aktin–miyozin etkileşimini engeller. Ca²⁺ troponin C'ye bağlanınca troponin I aktinden ayrılır.</div>
</section>

<section class="wrap blk ders-sec" id="d54-ukm">
  <h2>Uyarılma–kasılma eşleşmesi</h2>
  <p class="intro">Uyarılma–kasılma eşleşmesi, kas hücresi zarının depolarizasyonunu kasılmanın başlamasına bağlayan süreçlerin bütünüdür; iskelet kasında aracı, iki kanal arasındaki fiziksel bağlantıdır. [[K1 s. 241–242]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Aksiyon potansiyelinden çapraz köprüye, sonra gevşeme</h3></div>
    <div data-viz="f54_ukm"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Dinlenme.</b> Sarkolemmanın dinlenme membran potansiyeli yaklaşık −90 mV'tur; Ca²⁺ SR'de yüksek, sarkoplazmada düşük derişimdedir. Oynatın ya da adım adım ilerleyin. [[K1 s. 241–242]]</p>
    <p class="viz-foot">Şematik triad (T-tübül ve SR); 2000 kat artış kitaptandır, derişim çubukları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Sarkolemma, nöron gibi uyarılabilirdir (Bölüm 51–52): motor son plaktaki sinaptik etkinlik sarkolemmayı depolarize eder ve yüzey zarı boyunca yayılan bir aksiyon potansiyeli başlatır. [[K1 s. 241–242]]</p>
    <p>T-tübül potansiyeli SR'nin yanına taşır. <b>Dihidropiridin reseptörü</b> (DHPR), voltaj kapılı L-tipi Ca²⁺ kanalının değişmiş bir alt tipidir: depolarizasyonla biçim değiştirir ama çok az Ca²⁺ geçirir. DHPR, SR zarına gömülü <b>riyanodin reseptörünün</b> (RyR) sitoplazmik kısmıyla allosterik (fiziksel) temastadır; DHPR biçim değiştirince RyR açılır ve Ca²⁺ SR'den sarkoplazmaya akar. [[K1 s. 242]]</p>
    <p>DHPR'den giren az miktardaki Ca²⁺ kasılmayı tetiklemek için hem yetersiz hem yavaştır; işlevi belirsizdir, kas lifinde gen ifadesini denetliyor olabilir ("uyarılma–transkripsiyon eşleşmesi"). Kalp kasında düzen farklıdır: Ca²⁺ plato fazında hücreye girer ve SR'den Ca²⁺ ile uyarılan Ca²⁺ salınmasını tetikler (Bölüm 57). [[K1 s. 242]]</p>
    <p>Gevşeme için Ca²⁺, SR/ER Ca²⁺-ATPazı (<b>SERCA</b>) ile SR'ye geri alınır. Ca²⁺ troponin C'den ayrılır, troponin T ve tropomiyozin dinlenme konumuna döner, bağlama yerleri yeniden örtülür; kas gevşer ve sarkomer eski uzunluğuna döner. [[K1 s. 243]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d54-mh">
  <h2>Klinik önem: malign hipertermi</h2>
  <p class="intro">Malign hipertermi (MH), hipermetabolizma (ve sonucunda hipertermi), kas rijiditesi ve rabdomiyolizi birleştirebilen, ölümcül olabilen kalıtsal bir iskelet kası hastalığıdır. [[K1 s. 242]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Tetikleyiciden asidoza; dantrolen nereyi keser?</h3></div>
    <div data-viz="f54_mh"></div>
    <p class="viz-cap" aria-live="polite"><b>Duyarlı hasta, tetikleyici yok.</b> RyR mutasyonu sessizdir; Ca²⁺ salınması normal denetim altındadır. Tetikleyici verin. [[K1 s. 242]]</p>
    <p class="viz-foot">Şematik akış; mortalite oranları kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Anestezistler için önemi, evrensel olarak kabul gören tetikleyicilerin yalnız halojenli volatil anestezikler ve süksametonyum olmasıdır. Genetik bozukluk bir RyR mutasyonudur: tetiklenen anormal RyR SR'den denetimsiz Ca²⁺ salar. [[K1 s. 242]]</p>
    <p>Sonuç ATP tüketen ve ısı üreten tetanik kasılmadır; uzayan tetani rabdomiyolize yol açabilir. Bu sırada SR, Ca²⁺-ATPazıyla sitozolik Ca²⁺'u daha hızlı geri alır ve ATP tüketimini daha da artırır. Hipermetabolizma toplam O₂ tüketimini ve CO₂ üretimini artırır, metabolik asidoz gelişir. [[K1 s. 242]]</p>
    <p>Destek tedavisi dışında tek özgül tedavi <b>dantrolendir</b>; RyR'ye bağlanıp Ca²⁺ geçirgenliğini engelleyerek salınmayı durdurduğu düşünülür. Tedavisiz mortalite yaklaşık %80'dir; dantrolen ve artan farkındalıkla %2–3'e inmiştir. [[K1 s. 242]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d54-kopru">
  <h2>Kas nasıl kasılır: çapraz köprü döngüsü</h2>
  <p class="intro">Aktindeki bağlama yeri açılınca miyozin başları dört adımlı bir döngüyle aktine tutunur, onu sarkomerin ortasına çeker ve bırakır; her turda bir ATP harcanır (kayan filaman kuramı). [[K1 s. 242–243]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Dört adım ve ATP'nin üç görevi</h3></div>
    <div data-viz="f54_kopru"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · ATP bağlı.</b> Miyozin başı ATP bağlamıştır; bu hâlde aktine afinitesi düşüktür. ATP hidroliz edilir, açığa çıkan bağ enerjisi başa aktarılır. Oynatın. [[K1 s. 242–243]]</p>
    <p class="viz-foot">Şematik tek miyozin başı ve aktin filamanı; adım süreleri temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Enerji yüklü baş (üzerinde ADP ve Pi) komşu aktine bağlanır ve çapraz köprü kurulur. Baş aktin üzerinde bükülür, kuyruğa etkisiyle <b>güç vuruşu</b> aktini sarkomerin ortasına doğru kaydırır; bu sırada ADP ve Pi ayrılır. Yeni bir ATP bağlanınca miyozin–ATP kompleksinin aktine afinitesi düşer ve baş ayrılır; ATP yeniden hidroliz edilir, döngü tekrarlar. Döngü, hücre içi Ca²⁺ düşene kadar sürer. [[K1 s. 242–243]]</p>
    <p>ATP'nin üç kritik görevi: başı güç vuruşu için <b>enerjilendirmek</b>, güç vuruşundan sonra köprüyü <b>koparmak</b> ve SERCA ile Ca²⁺'u SR'ye geri alarak <b>gevşemeyi</b> sağlamak. Ölümden sonra ATP hızla tükenir; SERCA çalışamaz, Ca²⁺ troponin C'ye bağlı kalır, köprüler kopamaz ve kas tonusu yükselir: <b>rigor mortis</b>. [[K1 s. 244]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Rigor mortisin ana nedeni, köprüyü koparacak ATP'nin kalmamasıdır: miyozin başları aktine bağlı (rigor) durumda kilitlenir. Ca²⁺'un geri alınamaması köprü kurulmasını sürdürür ama tek başına sertliği açıklamaz.</div>
</section>

<section class="wrap blk ders-sec" id="d54-motor">
  <h2>Motor ünite</h2>
  <p class="intro">Motor ünite tek bir α-motor nöron, aksonu ve onun uyardığı bütün kas hücreleridir; nörondaki tek aksiyon potansiyeli ünitedeki bütün miyositleri kasar. [[K1 s. 244]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Büyük güç ya da ince denetim</h3></div>
    <div data-viz="f54_motor"></div>
    <p class="viz-cap" aria-live="polite"><b>Kuadriseps femoris.</b> Büyük, güçlü, kaba hareketler yapan kas: bir motor ünitede 1000'den fazla miyosit vardır. Ekstraoküler kasa geçin ya da nöronu ateşleyin. [[K1 s. 244]]</p>
    <p class="viz-foot">Şematik; çizilen lif sayıları gerçek sayıları temsil eder, tek tek göstermez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Bir motor ünite yalnız tek tip miyositi uyarır (ör. yalnız tip I lifler; Bölüm 42). Bir kasın kasılmasını çoğu zaman birçok motor ünite birlikte düzenler ve kasın kuvveti etkinleşen ünite sayısıyla ayarlanır. Ünite başına lif sayısı kastan kasa çok değişir: ince denetim isteyen kaslarda (ekstraoküler kaslar) oransal olarak daha çok ve daha küçük ünite vardır, ünite başına 10 miyosite kadar iner. [[K1 s. 244]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d54-kuvvet">
  <h2>Kasılma kuvvetini ne belirler?</h2>
  <p class="intro">Kas gerimini üç ana etken belirler: motor ünite katılımı (recruitment), aksiyon potansiyeli sıklığı ve başlangıç kas uzunluğu. [[K1 s. 244]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Üç etkeni değiştirin, gerimi izleyin</h3></div>
    <div data-viz="f54_kuvvet"></div>
    <p class="viz-cap" aria-live="polite"><b>Katılım.</b> İstenen gerim arttıkça önce en küçük motor üniteler, sonra giderek daha büyükleri devreye girer. Kaydırıcıyı artırın ya da başka bir etken seçin. [[K1 s. 244]]</p>
    <p class="viz-foot">Şematik eğriler; gerim değerleri temsilîdir. Uzunluk–gerim eğrisi için Bölüm 30 ve Şekil 30.2.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Katılım:</b> bütün kasın kuvveti kasılan miyosit sayısına bağlıdır. <b>Sıklık:</b> sinir ve iskelet kasında refrakter dönem, hem gerimin gevşemesinden hem Ca²⁺'un SR'ye geri alınmasından kısadır; yüksek sıklıktaki aksiyon potansiyelleri sitoplazmada giderek Ca²⁺ biriktirir ve artan, süreğen bir gerim, yani <b>tetanus</b> oluşturur. [[K1 s. 244]]</p>
    <p><b>Başlangıç uzunluğu:</b> tek lifteki gerim kurulan çapraz köprü sayısıyla ilişkilidir (Bölüm 30). En uygun sarkomer uzunluğunda miyozin başlarının aktinle örtüşmesi en fazladır. Aşırı germe örtüşmeyi tümüyle kaldırabilir ve köprü kurulamaz; aşırı kısalmada filamanlar çarpışır, sürtünme artar ve sarkomer bozulur, kasılma daha fazla süremez. Kasta sarkomerler normalde en uygun uzunluğa yakındır; bu yüzden başlangıç uzunluğunun gerime katkısı genellikle azdır. [[K1 s. 244]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d54-hastalik">
  <h2>Klinik önem: iskelet kası hastalıkları</h2>
  <p class="intro">İskelet kası hastalığı distrofileri, miyotonileri, miyopatileri ve metabolik bozuklukları kapsayan geniş bir terimdir; en sık dört tanesi bir miyosit üzerinde iki farklı yere vurur: distrofin bağlantısına ya da sarkolemma iyon kanallarına. [[K1 s. 244–245]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Dört hastalık, bozukluğun yeri</h3></div>
    <div data-viz="f54_hastalik"></div>
    <p class="viz-cap" aria-live="polite"><b>Duchenne musküler distrofisi.</b> Distrofin eksik: aktini destek proteiniyle sarkolemmaya bağlayan halka kopar. Bir hastalık seçin. [[K1 s. 244]]</p>
    <p class="viz-foot">Şematik miyosit kesiti.</p>
  </div>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>Hastalık</th><th>Geçiş ve bozukluk</th><th>Klinik</th></tr></thead>
    <tbody>
      <tr><td><b>Duchenne (DMD)</b></td><td>X'e bağlı resesif; distrofin eksikliği. Sarkomerler zara yetersiz bağlanır, yerini fibröz doku alır. [[K1 s. 244]]</td><td>3–5 yaşında proksimal güçsüzlük; psödohipertrofi; genellikle ergenlik sonunda solunum ya da kalp yetersizliğiyle ölüm. [[K1 s. 244]]</td></tr>
      <tr><td><b>Becker (BMD)</b></td><td>X'e bağlı resesif; distrofin azalmış ve yapısı bozuk. [[K1 s. 244]]</td><td>DMD'den hafif; ergenlikte başlar, ölüm 30'lu–40'lı yaşlarda. [[K1 s. 244–245]]</td></tr>
      <tr><td><b>Miyotonik distrofi</b></td><td>Otozomal dominant trinükleotit tekrar hastalığı, antisipasyon gösterebilir. DMPK (DM1) ya da CNBP (DM2) mutasyonu sarkolemmada Na⁺ ya da Cl⁻ kanallarının anormal ifadesine yol açar; miyosit aşırı uyarılabilir, tekrarlayan aksiyon potansiyelleri ve süreğen kasılma olur. [[K1 s. 245]]</td><td>Miyotoni (istemli gevşeme ya da perküsyondan sonra uzamış veya tekrarlayan kasılma), kas erimesi, insülin direnci, kardiyomiyopati, kalp ileti bozuklukları. [[K1 s. 245]]</td></tr>
      <tr><td><b>Konjenital miyotoni</b></td><td>Otozomal dominant; sarkolemmanın ClC-1 klorür kanalı anormal, miyosit aşırı uyarılabilir. [[K1 s. 245]]</td><td>Miyotoni; yaygın güçsüzlük yok, ama palatofaringeal işlev bozukluğuyla disfaji yapabilir. [[K1 s. 245]]</td></tr>
    </tbody>
  </table></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Yalnız DM1 trinükleotit (CTG) tekrarıdır; DM2'deki CNBP tekrarı tetranükleotittir (CCTG), ve her ikisinde de miyotoninin ana nedeni ClC-1 klorür kanalının azalmasıdır. Konjenital miyotoninin otozomal resesif (Becker) biçimi de vardır.</div>
</section>

<section class="wrap blk ders-sec" id="d54-atrofi">
  <h2>Klinik önem: kas atrofisi ve yoğun bakım kaynaklı güçsüzlük</h2>
  <p class="intro">Kas atrofisi kas kütlesinin azalmasıdır; yoğun bakımda bu kayıp günler içinde ventilatörden ayrılmayı zorlaştıracak düzeye ulaşır. [[K1 s. 245]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Yoğun bakımda geçen günler ve kalan kas kütlesi</h3></div>
    <div data-viz="f54_atrofi"></div>
    <p class="viz-cap" aria-live="polite"><b>0. gün.</b> Kas kütlesi %100. Yoğun bakımda geçen gün sayısını artırın: kayıp günde ortalama %2–4'tür. [[K1 s. 245]]</p>
    <p class="viz-foot">Günlük %2–4 kayıp kitaptandır; hesapta kaybın her gün kalan kütleye uygulandığı varsayıldı (model).</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Atrofinin nedenleri: <b>inaktivite</b> (kırık ekstremitenin hareketsizliği, uzun yatak istirahati, uzay yolculuğu); <b>nörojenik atrofi</b> (denervasyon); <b>kaşeksi</b> (kanser, kistik fibroz, KOAH, HIV; büyük olasılıkla TNF-α, interferon-γ ve interlökin-6 gibi inflamatuvar sitokinlerle); <b>ilaçlar</b> (kortikosteroidler, katabolizmayı artırıp özellikle proksimal kasları eritir); <b>açlık</b> (kas katabolizması); <b>yaşlanma</b> (sarkopeni: kas kütlesi ve işlevinde yaygın azalma). [[K1 s. 245]]</p>
    <p><b>Yoğun bakım kaynaklı güçsüzlük</b> (ICUAW), kritik hastada sık bir morbidite nedenidir: simetrik, flask, klasik olarak bütün kas gruplarını tutan ve kranial sinirleri görece koruyan güçsüzlük. İç içe geçen üç sendroma ayrılır: kritik hastalık polinöropatisi, miyopatisi ve nöromiyopatisi. Fizyopatolojisi karmaşıktır: kortikosteroid ve nöromüsküler blokör kullanımı, ağır sepsiste dolaşan sitokinler ve immobilizasyon. Kayıp ventilatörden ayrılmayı zorlaştırır, ventilatörle ilişkili pnömoni ve venöz tromboembolizm riskini artırır. [[K1 s. 245]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d54-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: bağ dokusu katmanları, çevresel çekirdekler, bantların tanımı ve kasılmada hangisinin değiştiği, troponin alt birimleri, DHPR–RyR bağlantısı ve 2000 kat Ca²⁺ artışı, MH tetikleyicileri ve dantrolen, çapraz köprü adımlarında ATP'nin rolü, rigor mortis, motor ünite boyutları, tetanus, distrofilerin geçişi ve ICUAW. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz54-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz54-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz54-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d54-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Motor son plakta başlayan bir aksiyon potansiyeli iskelet kasını nasıl kasar? Bu sürecin malign hipertermide nasıl bozulduğunu anlatır mısınız?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Yapı.</b> Endomisyum, perimisyum (≈ 100 miyositlik fasikül), epimisyum; çok çekirdekli, çevresel çekirdekli miyosit; SR, T-tübüller, miyofibriller, glikojen. [[K1 s. 239]]</li>
    <li><b>Sarkomer ve filamanlar.</b> Z diski, A, I, H bantları; miyozin (iki baş, aktin ve ATP yerleri), altıgen düzende altı ince filaman; aktin (300–400 molekül), tropomiyozin, troponin T, I, C. [[K1 s. 240–241]]</li>
    <li><b>Uyarılma.</b> Dinlenme potansiyeli ≈ −90 mV; son plak depolarizasyonu → sarkolemmada yayılan aksiyon potansiyeli → T-tübül. [[K1 s. 241–242]]</li>
    <li><b>Eşleşme.</b> DHPR (değişmiş L-tipi kanal, az Ca²⁺ geçirir) → fiziksel bağlantıyla RyR açılır → SR'den Ca²⁺, derişim ≈ 2000 kat → troponin C → tropomiyozin yuvarlanır; kalpte ise Ca²⁺ ile uyarılan Ca²⁺ salınması. [[K1 s. 242]]</li>
    <li><b>Çapraz köprü döngüsü.</b> ATP hidrolizi → bağlanma → güç vuruşu, ADP + Pi ayrılır → yeni ATP ile kopma; Z diskleri yaklaşır, I bandı daralır, A bandı sabit; gevşeme SERCA ile; ATP'nin üç görevi, rigor mortis. [[K1 s. 242–244]]</li>
    <li><b>Malign hipertermi.</b> RyR mutasyonu; volatil ajanlar ve süksametonyum; denetimsiz Ca²⁺ → tetani, ısı, ATP tüketimi, artmış SERCA etkinliği → O₂ tüketimi ve CO₂ üretiminde artış, metabolik asidoz, rabdomiyoliz; dantrolen RyR'yi engeller; mortalite %80'den %2–3'e. [[K1 s. 242]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Bir triad çizin: sarkolemmadan inen T-tübül, içinde DHPR; ona dokunan SR zarında RyR; SR'den sarkoplazmaya Ca²⁺ oku ve dönüşte SERCA. Yanına troponin–tropomiyozinli ince filamanı ve dört adımlı çapraz köprü döngüsünü ekleyin. [[K1 s. 241–243]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Kasılmada hangi bantlar değişir? Kalp kasında eşleşme neden farklıdır? Rigor mortis neden olur? Kasın kuvvetini hangi etkenler belirler ve tetanus nasıl oluşur? Dantrolen nasıl etki eder? Yoğun bakım kaynaklı güçsüzlüğün nedenleri nelerdir? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 242–245]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d54-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>İskelet kası hareket, duruş, organ desteği, sfinkter denetimi, ısı üretimi ve venöz dönüş sağlar; endomisyum, perimisyum ve epimisyumla sarılı, çok çekirdekli liflerden oluşur. [[K1 s. 239]]</li>
    <li>Sarkomer iki Z diski arasıdır; kasılmada filamanlar kayar: sarkomer ve I bandı kısalır, A bandı sabit kalır. [[K1 s. 240, 243]]</li>
    <li>Dinlenmede tropomiyozin aktindeki miyozin bağlama yerini örter; Ca²⁺ troponin C'ye bağlanınca yer açılır. [[K1 s. 241]]</li>
    <li>T-tübüldeki DHPR, fiziksel bağlantıyla SR'deki RyR'yi açar; sarkoplazmik Ca²⁺ yaklaşık 2000 kat artar, gevşemeyi SERCA sağlar. [[K1 s. 242–243]]</li>
    <li>MH bir RyR mutasyonudur; volatil ajanlar ve süksametonyum tetikler, dantrolen tek özgül tedavidir ve mortaliteyi %80'den %2–3'e indirmiştir. [[K1 s. 242]]</li>
    <li>ATP miyozin başını enerjilendirir, çapraz köprüyü koparır ve SERCA'yı çalıştırır; ATP bitince rigor mortis gelişir. [[K1 s. 243–244]]</li>
    <li>Kuvveti motor ünite katılımı (küçükten büyüğe), aksiyon potansiyeli sıklığı (tetanus) ve başlangıç uzunluğu belirler; ünite başına lif kuadrisepste 1000'in üstünde, ekstraoküler kasta 10 kadardır. [[K1 s. 244]]</li>
    <li>DMD ve BMD distrofin, miyotonik distrofi ve konjenital miyotoni iyon kanalı hastalıklarıdır; ICUAW'da günde %2–4 kas kaybı ventilatörden ayrılmayı zorlaştırır. [[K1 s. 244–245]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="54"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/53">← Bölüm 53 · Sinapslar ve nöromüsküler kavşak</a>
    <a href="#/dersler/fizyoloji/55">Sonraki: Bölüm 55 · Kas iğcikleri ve Golgi tendon organları →</a>
  </nav>
</section>`,
};
