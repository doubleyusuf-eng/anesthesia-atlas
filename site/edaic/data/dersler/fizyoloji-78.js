/* Fizyoloji Bölüm 78 · Açlık (K1 İngilizce baskı s. 384–386).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz78-1'] = {
  no: 1, kok: 'Açlığın ilk günlerindeki biyokimyasal değişiklikler için:', kagit: 'Paper A · fizyoloji, Bölüm 78', kaynak: '[[K1 s. 384]]',
  onermeler: [
    { t: 'İlk 24–48 saatte plazma glukozunun düşmesi insülini artırır, glukagonu azaltır.', d: false, n: 'Yanlış. Glukoz düşünce insülin azalır, glukagon artar; açlığın bütün metabolik değişikliklerini bu denge yönetir. [[K1 s. 384]]' },
    { t: 'Karaciğer glikojen deposu yaklaşık 48 saatte tükenir.', d: true, n: 'Doğru. Glukagonun uyardığı glikojenoliz ilk iki günde glukoz sağlar, sonra depo biter. [[K1 s. 384]]' },
    { t: 'Açlığın erken evresinde enerjinin çoğu yağ asitlerinin β-oksidasyonundan gelir.', d: true, n: 'Doğru. Düşük insülin β-oksidasyonu destekler; mitokondride biriken asetil-KoA keton cisimlerine dönüşür. [[K1 s. 384]]' },
    { t: 'Glukoneogenezin substratları gliserol, laktat ve amino asitlerdir.', d: true, n: 'Doğru. Glukoneogenez sonraki birkaç günde artar; gliserol başlıca substrat olarak kalır. [[K1 s. 384]]' },
    { t: 'Lipoliz yüksek insülin ve düşük glukagonla uyarılır.', d: false, n: 'Yanlış. Lipolizi yüksek glukagon ve düşük insülin uyarır; trigliseritten serbest yağ asidi ve gliserol açığa çıkar. [[K1 s. 384]]' },
  ],
};
VERI.sorular['fiz78-2'] = {
  no: 2, kok: 'Uzamış açlık ve yeniden beslenme sendromu için:', kagit: 'Paper A · fizyoloji, Bölüm 78', kaynak: '[[K1 s. 384–385]]',
  onermeler: [
    { t: 'Haftalar süren açlıkta plazma keton konsantrasyonu 7 mmol/L\'ye dek yükselebilir.', d: true, n: 'Doğru. Dokular ketona uyum sağladıkça glukoneogenez yavaşça azalır, bazal metabolizma hızı düşer. [[K1 s. 384]]' },
    { t: '70 kg\'lık bir erkeğin trigliserit deposu yaklaşık 10–15 günlük açlığa yeter.', d: false, n: 'Yanlış. Tipik 70 kg\'lık erkeğin trigliseriti yaklaşık 40–60 günlük açlığa yeter. [[K1 s. 384–385]]' },
    { t: 'Açlıkta olağan ölüm nedeni, kas kütlesinin yarısı yıkıldıktan sonra gelişen pnömonidir.', d: true, n: 'Doğru. Solunum kası sekresyonları temizlemeye yetmez. [[K1 s. 385]]' },
    { t: 'Yeniden beslenme sendromunda hiperfosfatemi ve hiperkalemi görülür.', d: false, n: 'Yanlış. İnsülin hücre içine alımı artırdığı için hipofosfatemi, hipokalemi ve hipomagnezemi gelişir; hücre dışı sıvı artar. [[K1 s. 385]]' },
    { t: 'Yeniden beslenme sendromu riski 5 gün ya da daha uzun aç kalmış hastalarda vardır.', d: true, n: 'Doğru. Bu yüzden acil cerrahi ve yoğun bakım hastalarında karşılaşılabilir. [[K1 s. 385]]' },
  ],
};
VERI.sorular['fiz78-3'] = {
  no: 3, kok: 'Anoreksiya nervoza ve anestezi için:', kagit: 'Paper A · fizyoloji, Bölüm 78', kaynak: '[[K1 s. 385–386]]',
  onermeler: [
    { t: 'Kusmayla arınma metabolik asidoz yapar ve solunum merkezi takipneyle kompanse eder.', d: false, n: 'Yanlış. Arınma metabolik alkaloz yapar; solunum merkezi bradipneyle kısmen kompanse eder. [[K1 s. 385]]' },
    { t: 'Azalmış sempatik çıkış nedeniyle hastalar tipik olarak hipotansif ve bradikardiktir.', d: true, n: 'Doğru. Miyokard kontraktilitesi bozulabilir; aşırı sıvı açık kalp yetersizliğine yol açabilir. [[K1 s. 385]]' },
    { t: 'Mide boşalması hızlandığı için aspirasyon riski düşüktür.', d: false, n: 'Yanlış. Mide boşalma süresi uzar; her hasta "dolu mide" kabul edilir ve hızlı ardışık indüksiyon gerekir. [[K1 s. 385]]' },
    { t: 'Plazma proteini azaldığı için ilacın bağlanmamış (serbest) fraksiyonu artar.', d: true, n: 'Doğru. Dozlar buna ve hastanın ağırlığına göre ayarlanır; klirens de düşük BMR ve böbrek işlevi nedeniyle azalabilir. [[K1 s. 386]]' },
    { t: 'Hipokalemi ve hipokalsemi nöromüsküler bloğun süresini uzatabilir.', d: true, n: 'Doğru. Elektrolit bozuklukları (özellikle K⁺, Mg²⁺, Ca²⁺, Cl⁻) diüretik ve laksatif kötüye kullananlarda görülebilir. [[K1 s. 385–386]]' },
  ],
};

const D78_NAV = [
  ['d78-tanim', 'Tanım ve hormonlar'], ['d78-evre', 'Biyokimyasal evreler'], ['d78-sure', 'Stoklar, davranış, ölüm'],
  ['d78-eras', 'Hızlandırılmış iyileşme'], ['d78-yeniden', 'Yeniden beslenme sendromu'], ['d78-anoreksi', 'Anoreksiya nervoza'],
  ['d78-p1', 'Part I'], ['d78-p2', 'Part II'], ['d78-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/78'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 8 · Bölüm 78', baslik: 'Açlık',
  lede: 'Açlıkta vücut iç depolarıyla yaşar ve önceliği plazma glukozunu korumaktır. Bütün süreci düşen insülin ve yükselen glukagon yönetir; yeniden beslemek de kendi tehlikesini taşır. [[K1 s. 384–385]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D78_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d78-tanim">
  <h2>Açlık nedir, kim yönetir?</h2>
  <p class="intro">Açlık, normal vücut işlevini sürdürecek kalorinin alınamaması ya da emilememesidir; davranışsal, fiziksel ve metabolik değişiklikler doğurur. [[K1 s. 384]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>İnsülin–glukagon dengesi ve dokular</h3></div>
    <div data-viz="f78_hormon"></div>
    <p class="viz-cap" aria-live="polite"><b>Tok.</b> İnsülin yüksek, glukagon düşük: glukoz hücrelere girer, depolar korunur. Açlık durumunu seçin. [[K1 s. 384]]</p>
    <p class="viz-foot">Şematik; hormon düzeyleri nitel gösterilir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Vücut kısmen ya da tamamen iç depolarıyla yaşar. Açlık ilerledikçe insülin çok düşük düzeye iner, glukagon yükselir; başlıca metabolik değişikliklerin hepsi bu kaymadan doğar. Öncelik plazma glukozudur, çünkü beyin ve eritrositler metabolizmaları için glukoza bağımlıdır. [[K1 s. 384]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d78-evre">
  <h2>Biyokimyasal değişiklikler: saatlerden haftalara</h2>
  <p class="intro">Yakıt kaynağı sırayla değişir: önce glikojen, sonra yağ ve glukoneogenez, en sonda keton cisimlerine uyum. [[K1 s. 384]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Açlığın üç evresi</h3></div>
    <div data-viz="f78_evre"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · İlk 24–48 saat.</b> Glukagon karaciğerde glikojenolizi uyarır; depo 48 saatte biter. İleri düğmesine basın. [[K1 s. 384]]</p>
    <p class="viz-foot">Şematik akış; ok kalınlıkları nitel. İlk iki adım aynı 24–48 saatlik evreyi açar. Beynin 100–120 g/gün değeri kitaba aittir; aşağıdaki Atlas notuyla birlikte okuyun.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>İlk 24–48 saat:</b> yüksek glukagon ve düşük insülin lipolizi açar; trigliseritten serbest yağ asidi ve gliserol çıkar. Düşük insülin β-oksidasyonu destekler ve erken evrede enerjinin çoğu buradan gelir. Mitokondride biriken asetil-KoA keton cisimlerine döner. [[K1 s. 384]]</p>
    <p><b>Sonraki günler:</b> glukoneogenez artar (substratlar gliserol, laktat, amino asitler); çok düşük insülin keton yapımını artırır. <b>Sonraki haftalar:</b> dokular ketonu kullanmaya alıştıkça glukoneogenez yavaşça azalır, plazma ketonu 7 mmol/L'ye dek çıkar, bazal metabolizma hızı (BMR) düşer. [[K1 s. 384]]</p>
    <p>Beyin yine de günde 100–120 g glukoz ister ve bunu yalnız glukoneogenez karşılar. Gliserol başlıca substrat kalır ama amino asitlerin payı artar: yüksek glukagon iskelet kasından amino asit salınımını uyarır. [[K1 s. 384]]</p>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> Uzamış açlıkta beyin enerjisinin büyük kısmını (yaklaşık üçte ikisini) keton cisimlerinden alır ve glukoz gereksinimi günde yaklaşık 40 g'a iner. Kitaptaki 100–120 g, beslenen ya da kısa süre aç kalan beynin gereksinimidir.</div>
</section>

<section class="wrap blk ders-sec" id="d78-sure">
  <h2>Stoklar ne kadar yeter, sonunda ne olur?</h2>
  <p class="intro">Tipik 70 kg'lık bir erkeğin trigliseriti yaklaşık 40–60 günlük açlığa yeter; ondan sonra kas proteini yakılır. [[K1 s. 384–385]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Gün gün yakıt stokları</h3></div>
    <div data-viz="f78_sure"></div>
    <p class="viz-cap" aria-live="polite"><b>Gün 1.</b> Karaciğer glikojeni azalıyor, yağ deposu dolu, keton düşük. Günü ilerletin. [[K1 s. 384]]</p>
    <p class="viz-foot">Eğriler şematiktir; kişisel sağkalım tahmini değildir. Kesik keton eğrisi yalnız nitel eğilimdir, yüzde ekseninden okunmaz. Yağın 50. günde bitmesi ve kas eğrisinin biçimi model seçimidir. Kitaptan: glikojen 48 saat, keton en çok 7 mmol/L, 70 kg erkekte yağ 40–60 gün, kasın yarısı yıkılınca pnömoni.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Toplam yağ deposu kişiden kişiye değişir. Trigliserit bitince iskelet kasındaki amino asitler glukoneogenez için açığa çıkar. Kas kütlesinin yarısı yıkılınca kalan solunum kası sekresyonları temizleyemez ve <b>pnömoni</b> gelişir: açlıkta olağan ölüm biçimi budur. [[K1 s. 385]]</p>
    <p><b>Davranış:</b> önce gereksiz hareket azalarak enerji korunur; ağır açlıkta yaşam kurtarıcı olanlar dışında bütün hareket durur. <b>Fizyoloji:</b> ağır açlıkta sempatik etkinlik azalır; vücut ısısı ve kan basıncı denetimi zorlaşır. [[K1 s. 384]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d78-eras">
  <h2>Klinik önem: hızlandırılmış iyileşme</h2>
  <p class="intro">Uzun ameliyat öncesi açlık, cerrahinin zaten bozduğu metabolizmayı daha da kötüleştirir; karbonhidrat yüklemesi bunu hafifletir. [[K1 s. 385]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Geleneksel açlık mı, karbonhidrat içeceği mi?</h3></div>
    <div data-viz="f78_eras"></div>
    <p class="viz-cap" aria-live="polite"><b>Geleneksel.</b> En az 6 saat, çoğu kez çok daha uzun açlık: cerrahinin insülin direnci ve protein yıkımı üstüne açlık eklenir. Öteki yolu seçin. [[K1 s. 385]]</p>
    <p class="viz-foot">Şematik, nitel karşılaştırma; çubuk uzunlukları risk yüzdesi değildir. Kitap hiperglisemi için yüklemeyle oluşan farkı belirtmez. Süreler kitabın anlatımıdır; bireysel açlık talimatı değildir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Geleneksel olarak hasta indüksiyonda aspirasyon pnömonisine karşı en az 6 saat aç bırakılır. Majör cerrahinin metabolik sonuçları (Bölüm 79) insülin direnci, hiperglisemi ve protein katabolizmasıdır ve hepsi sonucu kötüleştirir. [[K1 s. 385]]</p>
    <p><b>Hızlandırılmış iyileşme programı</b>, majör cerrahide perioperatif dönemi yöneten yapılandırılmış, protokole dayalı bir bakım paketidir (nöraksiyel blok, erken mobilizasyon gibi öğeler); hastanede kalışı ve komplikasyonları azaltır. Paketteki <b>ameliyat öncesi karbonhidrat yüklemesi</b>nde hasta ameliyattan 2 saat öncesine dek karbonhidratlı içecek içer: insülin direnci ve kas kaybı azalır, aspirasyon riski artmaz. Glukozun protein koruyucu etkisinin, insülinin protein yıkımını önlemesinden kaynaklandığı düşünülür. [[K1 s. 385]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d78-yeniden">
  <h2>Yeniden beslenme sendromu</h2>
  <p class="intro">Aç kalmış ya da ağır malnütrisyonlu hastada beslenme yeniden başlayınca ağır bir metabolik bozukluk gelişebilir. [[K1 s. 385]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>İnsülin dalgası hücreye ne çeker?</h3></div>
    <div data-viz="f78_yeniden"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Açlıkta.</b> İnsülin çok düşük. Besini başlatmak için ileri düğmesine basın. [[K1 s. 385]]</p>
    <p class="viz-foot">Şematik hücre; iyon okları nitel, kitap düşüşlerin büyüklüğünü vermez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>İlk kez II. Dünya Savaşı'nda Japon toplama kamplarından sağ kurtulanlarda bildirilmiştir. Risk, <b>5 gün ya da daha uzun</b> aç kalanlardadır; bu yüzden acil cerrahi ve yoğun bakım hastalarında görülebilir. Genellikle beslenmeden birkaç gün içinde başlar: <b>hipofosfatemi, hipokalemi, hipomagnezemi</b> ve hücre dışı sıvı artışı. [[K1 s. 385]]</p>
    <p>Beslenmeyle glukoz yükselince pankreas β hücreleri büyük miktarda insülin salar; hücreler glukoz, Mg²⁺, fosfat ve K⁺ alır, plazma düzeyleri hızla düşer. Mekanizması bilinmeyen aşırı Na⁺ ve su tutulumu sol ventrikül yetersizliğini tetikleyebilir. Karbonhidrat solunum oranını (RQ) artırır: kas yıkımıyla zaten zayıf solunum sistemi, artan CO₂ için alveoler ventilasyonu (V̇A) artırmak zorundadır. <b>Tedavi:</b> beslenmeyi yavaş başlatmak ve elektrolitleri agresif düzeltmek. [[K1 s. 385]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d78-anoreksi">
  <h2>Klinik önem: anoreksiya nervoza</h2>
  <p class="intro">Anoreksiya nervoza, diyet kısıtlaması, aşırı egzersiz ve arınmayla (kendini kusturma, laksatif) sıkı, psikolojik kökenli kilo kaybının görüldüğü psikiyatrik bir bozukluktur; her sistemde anestezik sonuç doğurur. [[K1 s. 385]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Sistem sistem anestezi riskleri</h3></div>
    <div data-viz="f78_anoreksi"></div>
    <p class="viz-cap" aria-live="polite"><b>Solunum.</b> Arınma metabolik alkaloz yapabilir; solunum merkezi bradipneyle kısmen kompanse eder. Başka bir sisteme dokunun. [[K1 s. 385]]</p>
    <p class="viz-foot">Şematik vücut haritası.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>En önemli iki pratik nokta: mide boşalması uzadığı için her hasta <b>dolu mide</b> kabul edilir ve hızlı ardışık indüksiyon gerekir; yeniden beslenme sendromu ise neredeyse her hastada görülür. [[K1 s. 385]]</p>
    <p><b>Kalp–damar:</b> sempatik çıkış azaldığı için hipotansiyon ve bradikardi; elektrolit bozukluğuna bağlı EKG değişiklikleri, sık perioperatif aritmi, bozuk kontraktilite; fazla sıvı açık kalp yetersizliği yapabilir. <b>Sindirim:</b> tekrarlayan kusma tükürük bezi hiperplazisi, diş çürüğü, özofagus darlığı ve Mallory–Weiss yırtığı yapar. <b>Böbrek:</b> özellikle diüretik ve laksatif kötüye kullananlarda K⁺, Mg²⁺, Ca²⁺ ve Cl⁻ bozuklukları; glomerüler filtrasyon çoğu kez bozuk. [[K1 s. 385–386]]</p>
    <p><b>Isı:</b> az deri altı yağ ve yetersiz titreme hipotermiye yatkınlık yapar; olağan ısıtmaya ek olarak ameliyathane ısısı artırılabilir. <b>Pozisyon:</b> yağ yastığı olmadığından periferik sinir hasarına yatkınlık vardır; dikkatli pozisyon ve destek gerekir. <b>İlaç:</b> plazma proteini düşük, serbest fraksiyon fazladır; doz buna ve ağırlığa göre ayarlanır. Düşük BMR ve böbrek işlevi klirensi azaltabilir; hipokalemi ve hipokalsemi nöromüsküler bloğu uzatabilir. [[K1 s. 386]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d78-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: insülin–glukagon kayması, glikojenin 48 saatte bitmesi, β-oksidasyon ve keton yapımı, glukoneogenez substratları, 7 mmol/L keton, 40–60 gün yağ deposu, pnömoniyle ölüm, karbonhidrat yüklemesi, yeniden beslenme sendromunun elektrolitleri ve 5 gün eşiği, anoreksiyanın anestezi sorunları. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz78-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz78-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz78-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d78-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Açlıkta oluşan metabolik değişiklikleri anlatın. Bir haftadır ağızdan beslenemeyen bir hastada acil laparotomi sonrası enteral beslenme başlanacak: neye dikkat edersiniz?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım.</b> Normal işlevi sürdürecek kalorinin alınamaması ya da emilememesi; iç depolarla yaşam. [[K1 s. 384]]</li>
    <li><b>Hormonlar.</b> İnsülin çok düşük, glukagon yüksek; öncelik glukoz (beyin, eritrosit). [[K1 s. 384]]</li>
    <li><b>İlk 24–48 saat.</b> Glikojenoliz (depo 48 saatte biter), lipoliz, β-oksidasyon (enerjinin çoğu), asetil-KoA → keton. [[K1 s. 384]]</li>
    <li><b>Günler ve haftalar.</b> Glukoneogenez (gliserol, laktat, amino asit) artar, sonra ketona uyumla azalır; keton 7 mmol/L'ye dek, BMR düşer; beyin 100–120 g/gün glukoz (kitap; uzamış açlıkta azalır, Atlas notu). [[K1 s. 384]]</li>
    <li><b>Son.</b> Yağ 40–60 gün; sonra kas yıkımı; kas kütlesinin yarısında pnömoni. [[K1 s. 384–385]]</li>
    <li><b>Olgu.</b> ≥5 gün aç: yeniden beslenme riski. İnsülin dalgası → fosfat, K⁺, Mg²⁺ düşer; Na⁺ ve su tutulumu → sol ventrikül yetersizliği; RQ artışı → V̇A artmalı. [[K1 s. 385]]</li>
    <li><b>Tedavi.</b> Beslenmeyi yavaş başlat, elektrolitleri agresif düzelt. [[K1 s. 385]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Yatay zaman ekseni (saat → gün → hafta) çizin; üstüne glikojen (48 saatte sıfır), glukoneogenez (yükselip düşen), keton (7 mmol/L'ye çıkan) ve yağ deposu (40–60 günde biten) eğrilerini koyun. Altına insülin ↓ / glukagon ↑ yazın. [[K1 s. 384–385]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Beyin ve eritrosit neden glukoza bağımlı? Keton neden artar? Açlıkta neden pnömoniyle ölünür? Karbonhidrat yüklemesi neden aspirasyonu artırmaz? Yeniden beslenmede neden solunum yetersizliği olur? Anorektik hastada indüksiyonu nasıl yaparsınız? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 384–386]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d78-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Açlıkta insülin çok düşer, glukagon yükselir; amaç beyin ve eritrositler için plazma glukozunu korumaktır. [[K1 s. 384]]</li>
    <li>İlk 48 saatte glikojen biter; lipoliz ve β-oksidasyon enerjinin çoğunu verir, asetil-KoA keton cisimlerine döner. [[K1 s. 384]]</li>
    <li>Günlerce glukoneogenez (gliserol, laktat, amino asit) artar; haftalarca ketona uyum, keton ≤7 mmol/L, BMR düşer. [[K1 s. 384]]</li>
    <li>70 kg'lık erkekte yağ 40–60 gün yeter; sonra kas yıkılır, kas kütlesinin yarısında pnömoni ölüm getirir. Ağır açlıkta hareket ve sempatik etkinlik azalır. [[K1 s. 384–385]]</li>
    <li>Ameliyattan 2 saat öncesine dek karbonhidrat içeceği insülin direncini ve kas kaybını azaltır, aspirasyonu artırmaz. [[K1 s. 385]]</li>
    <li>Yeniden beslenme sendromu (≥5 gün açlık): insülin dalgası → hipofosfatemi, hipokalemi, hipomagnezemi, sıvı tutulumu, yüksek RQ; yavaş besle, elektrolitleri düzelt. [[K1 s. 385]]</li>
    <li>Anoreksiya: alkaloz, hipotansiyon–bradikardi, aritmi, dolu mide, hipotermi, sinir hasarı, serbest ilaç fraksiyonu artışı, uzamış nöromüsküler blok. [[K1 s. 385–386]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="78"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/77">← Bölüm 77 · Metabolizma</a>
    <a href="#/dersler/fizyoloji/79">Sonraki: Bölüm 79 · Stres yanıtı →</a>
  </nav>
</section>`,
};
