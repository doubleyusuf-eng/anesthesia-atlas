/* Fizyoloji Bölüm 76 · Plazma bileşenleri (K1 İngilizce baskı s. 371–372).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz76-1'] = {
  no: 1, kok: 'Kanın bileşenleri ve plazma proteinlerinin sınıflaması için:', kagit: 'Paper A · fizyoloji, Bölüm 76', kaynak: '[[K1 s. 371]]',
  onermeler: [
    { t: 'Plazma kanın yaklaşık %45\'ini oluşturur.', d: false, n: 'Yanlış. Plazma yaklaşık %55, hücresel bileşenler (eritrosit, lökosit, trombosit) yaklaşık %45\'tir. [[K1 s. 371]]' },
    { t: 'Albümin plazma proteinlerinin yaklaşık %60\'ını oluşturur.', d: true, n: 'Doğru. Globulinler yaklaşık %35, fibrinojen yaklaşık %4\'tür. [[K1 s. 371]]' },
    { t: 'γ-globulin dahil bütün plazma proteinleri karaciğerde sentezlenir.', d: false, n: 'Yanlış. Başlıca istisna γ-globulindir; en önemli γ-globulin olan immünoglobulini plazma hücreleri yapar. [[K1 s. 371]]' },
    { t: 'Fibrinojen toplam plazma proteininin yaklaşık %4\'üdür.', d: true, n: 'Doğru. Geleneksel sınıflamanın üçüncü grubudur. [[K1 s. 371]]' },
    { t: 'Transferrin bakır, seruloplazmin demir taşır.', d: false, n: 'Yanlış. Tersidir: transferrin demiri, seruloplazmin bakırı taşır. [[K1 s. 371]]' },
  ],
};
VERI.sorular['fiz76-2'] = {
  no: 2, kok: 'Plazma proteinlerinin işlevleri ve albüminin onkotik etkisi için:', kagit: 'Paper A · fizyoloji, Bölüm 76', kaynak: '[[K1 s. 371]]',
  onermeler: [
    { t: 'α1-asit glikoprotein başlıca asidik ilaçları taşır.', d: false, n: 'Yanlış. α1-asit glikoprotein bazik ve nötr yüklü ilaçları taşır; asidik ilaçların (varfarin, NSAİİ) taşıyıcısı albümindir. [[K1 s. 371–372]]' },
    { t: 'Protein C ve antitrombin III, işlevsel sınıflamada pıhtılaşma ve antikoagülasyon grubundadır.', d: true, n: 'Doğru. Fibrinojen de bu gruptadır. [[K1 s. 371]]' },
    { t: 'Albümin intravasküler onkotik basıncın yaklaşık %80\'inden sorumludur.', d: true, n: 'Doğru. Ancak periferik ödemi başlıca belirleyen damar içi ile interstisyum arasındaki onkotik gradyandır. [[K1 s. 371]]' },
    { t: 'Serum albümini aynı olan iki hastada periferik ödem de aynı derecededir.', d: false, n: 'Yanlış. Kapiller sızdıran hastada (ağır sepsis) belirgin ödem olur, kapilleri sağlam olan malnütrisyonlu yaşlıda çok az. [[K1 s. 371]]' },
    { t: 'Albümin 67 kDa ağırlığıyla normalde kapiller fenestrasyonlardan geçemeyecek kadar büyüktür.', d: true, n: 'Doğru. Kapiller sızdırınca bu engel kalkar ve onkotik gradyan bozulur. [[K1 s. 371]]' },
  ],
};
VERI.sorular['fiz76-3'] = {
  no: 3, kok: 'Albüminin taşıma, asit–baz ve kalsiyum üzerindeki etkileri için:', kagit: 'Paper A · fizyoloji, Bölüm 76', kaynak: '[[K1 s. 372]]',
  onermeler: [
    { t: 'Albümin konjuge olmamış bilirubini taşır.', d: true, n: 'Doğru. Safra tuzları, elektrolitler ve serbest yağ asitleri de albüminle taşınır. [[K1 s. 372]]' },
    { t: 'Varfarin kullanan hastaya NSAİİ verilince protrombin zamanı ve INR kısalır.', d: false, n: 'Yanlış. NSAİİ varfarini albümindeki ortak bağlanma yerinden ayırır; serbest varfarin artar, PZ uzar ve INR yükselir. [[K1 s. 372]]' },
    { t: 'Hipoalbüminemide anyon açığı artar.', d: false, n: 'Yanlış. Albümin ölçülmeyen anyonların büyük kısmıdır; hipoalbüminemide anyon açığı azalır. [[K1 s. 372]]' },
    { t: 'Hipoalbüminemi hafif metabolik alkaloz yapar.', d: true, n: 'Doğru. Bu yüzden Stewart yaklaşımı albümin derişimini hesaba katar (Bölüm 70). [[K1 s. 372]]' },
    { t: 'Albümin negatif yüküyle Ca²⁺ bağlar ve böylece serbest Ca²⁺\'u artırır.', d: false, n: 'Yanlış. Bağlanan Ca²⁺ serbest kalmaz: albümin serbest Ca²⁺ miktarını azaltır. [[K1 s. 372]]' },
  ],
};

const D76_NAV = [
  ['d76-kan', 'Kanın bileşenleri'], ['d76-sinif', 'Plazma proteinleri'], ['d76-onkotik', 'Albümin ve ödem'],
  ['d76-tasima', 'Albümin ve ilaçlar'], ['d76-yuk', 'Albüminin yükü'],
  ['d76-p1', 'Part I'], ['d76-p2', 'Part II'], ['d76-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/76'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 7 · Bölüm 76', baslik: 'Plazma bileşenleri',
  lede: 'Plazma yalnız hücreleri taşıyan bir sıvı değildir: içindeki proteinler sıvıyı damarda tutar, ilaçları taşır, pıhtılaşmayı ve asit–baz dengesini etkiler. Bu işlerin çoğunu albümin yapar. [[K1 s. 371–372]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D76_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d76-kan">
  <h2>Kanın bileşenleri</h2>
  <p class="intro">Kanın yaklaşık %55'i plazma, %45'i hücrelerdir. [[K1 s. 371]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Santrifüj tüpünde kan</h3></div>
    <div data-viz="f76_kan"></div>
    <p class="viz-cap" aria-live="polite"><b>Tam kan.</b> Hücreler plazmada karışık dağılmıştır. Santrifüjü çalıştırın. [[K1 s. 371]]</p>
    <p class="viz-foot">Şematik tüp; katmanlar %55 / %45 oranındadır. İnce lökosit–trombosit tabakası hücresel %45’e dahildir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Plazmada su, elektrolitler, çözünmüş gazlar (O₂, CO₂), plazma proteinleri ve öteki çözünmüş maddeler (hormonlar, glukoz, amino asitler, pıhtılaşma proteinleri, laktik asit, üre) bulunur. Hücresel kısım eritrosit, lökosit ve trombositten oluşur. [[K1 s. 371]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d76-sinif">
  <h2>Plazma proteinlerinin sınıflaması</h2>
  <p class="intro">Plazmada 500'ü aşkın protein vardır; bunlar geleneksel olarak üç gruba ya da işleve göre sınıflanır. [[K1 s. 371]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>İki sınıflama, aynı proteinler</h3></div>
    <div data-viz="f76_sinif"></div>
    <p class="viz-cap" aria-live="polite"><b>Geleneksel sınıflama.</b> Albümin %60, globulinler %35 (α, β, γ), fibrinojen %4. γ-globulin dışındakiler karaciğerde yapılır. Bir dilime dokunun ya da işlevsel sınıflamaya geçin. [[K1 s. 371]]</p>
    <p class="viz-foot">Yüzdeler kitaptan; toplamları %99'dur, kalan dilim adlandırılmamıştır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Toplam plazma proteini 60–85 g/L'dir. En önemli γ-globulin immünoglobulindir (Ig) ve onu karaciğer değil plazma hücreleri yapar. [[K1 s. 371]]</p>
    <p>İşleve göre altı grup vardır: <b>taşıyıcılar</b> (transferrin demir, seruloplazmin bakır, lipoproteinler lipit, tiroksin bağlayıcı globulin tiroksin, α1-asit glikoprotein bazik ve nötr ilaç taşır), <b>enzim inhibitörleri</b> (proteaz inhibitörü α1-antitripsin), <b>pıhtılaşma ve antikoagülasyon</b> (fibrinojen, protein C, antitrombin III), <b>endokrin</b> (ADH, anjiyotensin II), <b>immünolojik</b> (IgG, IgM) ve <b>karma işlevli</b> (albümin: taşıma ve onkotik basınç). [[K1 s. 371]]</p>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> Kitaptaki "60–85 g/dL" ve "albümin 20 g/dL" birim hatasıdır: doğrusu 60–85 g/L ve 20 g/L (normal albümin yaklaşık 35–50 g/L). ADH ve anjiyotensin II küçük peptitlerdir; karaciğerde yapılan plazma proteini öncül anjiyotensinojendir.</div>
</section>

<section class="wrap blk ders-sec" id="d76-onkotik">
  <h2>Albümin, onkotik basınç ve ödem</h2>
  <p class="intro">Albümin intravasküler onkotik basıncın yaklaşık %80'ini sağlar; ama ödemi başlıca albümin düzeyi değil, damar içi ile interstisyum arasındaki onkotik gradyan belirler. [[K1 s. 371]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Aynı albümin, farklı kapiller</h3></div>
    <div data-viz="f76_odem"></div>
    <p class="viz-cap" aria-live="polite"><b>Malnütrisyonlu yaşlı hasta.</b> Albümin 20 g/L, kapiller sağlam: albümin damarda kalır, gradyan korunur, ödem çok azdır. Sepsise geçin. [[K1 s. 371]]</p>
    <p class="viz-foot">Şematik kapiller; molekül sayıları ve ödem derecesi nitel. Ödem fizyolojisi için Bölüm 36.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>67 kDa ağırlığındaki albümin normalde kapiller fenestrasyonlardan geçemez. Kapiller sızdırınca bu engel kalkar: serum albümini aynı iki hastanın ödemi çok farklı olabilir. [[K1 s. 371]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d76-tasima">
  <h2>Albüminle taşınma ve ilaç etkileşimi</h2>
  <p class="intro">Albüminin organik ve inorganik bağlanma yerleri hem içsel maddeleri hem ilaçları taşır; ortak yere yarışan ilaçlar birbirinin serbest kısmını artırır. [[K1 s. 372]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Varfarine NSAİİ eklenince</h3></div>
    <div data-viz="f76_ilac"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Denge.</b> Varfarinin çoğu albümine bağlıdır; etkiyi yalnız serbest kısım yapar. İleri düğmesine basın. [[K1 s. 372]]</p>
    <p class="viz-foot">Şematik; molekül sayıları ve gösterge uzunlukları temsilîdir. Çubuklar değişimin yönünü gösterir; bağlı ilaç oranı, süre veya INR değeri hesaplanmaz.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Albümin konjuge olmamış bilirubin, safra tuzları, elektrolitler ve serbest yağ asitlerini; ilaçlardan varfarin, digoksin, NSAİİ ve tiyopentonu taşır. Bu ilaçların çoğu aynı yere yarışır; serbest kısım artınca toksik etki çıkabilir. [[K1 s. 372]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d76-yuk">
  <h2>Albüminin negatif yükü: asit–baz, Ca²⁺ ve serbest radikaller</h2>
  <p class="intro">Albümin negatif yüklüdür; bu yük anyon açığını, asit–baz dengesini ve serbest Ca²⁺'u etkiler. [[K1 s. 372]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Albümin düşünce ne değişir?</h3></div>
    <div data-viz="f76_yuk"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal albümin.</b> Ölçülmeyen anyonların önemli kısmı albümindir; bir kısım Ca²⁺ ona bağlıdır. Albümini azaltın. [[K1 s. 372]]</p>
    <p class="viz-foot">Model nitel; iyon sütunları yük dengesini koruyan şematik bir gösterimdir, Cl⁻ ve HCO₃⁻ değişimleri hesaplanmaz. Ca²⁺ panelinde yalnız bağlı kısım değişir; serbest Ca²⁺ düzeyi öngörülmez. Kitap anyon açığı, pH veya Ca²⁺ için sayı vermez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Albümin anyon açığına (plazmadaki ölçülmeyen anyonlar) önemli katkı yapar; hipoalbüminemide açık küçülür. Hipoalbüminemi hafif metabolik alkaloz da yapar; Stewart yöntemi bu yüzden albümini hesaba katar (Bölüm 70). Negatif yük Ca²⁺ iyonlarını da bağlayıp serbest Ca²⁺'u azaltır. Ayrıca albümindeki sülfhidril grupları serbest radikal temizler. [[K1 s. 372]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d76-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: plazma/hücre oranı, protein yüzdeleri, karaciğer dışı sentez (Ig), taşıyıcı proteinler, %80 onkotik katkı, sızdıran kapiller, albüminle taşınan ilaçlar, varfarin–NSAİİ etkileşimi, anyon açığı, alkaloz ve Ca²⁺. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz76-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz76-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz76-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d76-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Plazma proteinlerini sınıflayın ve albüminin işlevlerini anlatın. Albümini 20 g/L olan septik hastada neden yaygın ödem var; varfarin kullanıyorsa ağrı için NSAİİ vermek neye yol açar?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Kan.</b> Plazma %55 (su, elektrolit, gaz, protein, öteki çözünenler), hücreler %45. [[K1 s. 371]]</li>
    <li><b>Geleneksel sınıflama.</b> 500'ü aşkın protein, toplam 60–85 g/L; albümin %60, globulinler %35 (α, β, γ), fibrinojen %4. Çoğunu karaciğer yapar; Ig'yi plazma hücreleri. [[K1 s. 371]]</li>
    <li><b>İşlevsel sınıflama.</b> Taşıma, enzim inhibisyonu, pıhtılaşma–antikoagülasyon, endokrin, immünolojik, karma; her birine bir örnek. [[K1 s. 371]]</li>
    <li><b>Onkotik basınç.</b> Albümin %80; 67 kDa, fenestrasyondan geçmez. Sepsiste kapiller sızar, gradyan çöker: aynı albüminle sağlam kapillerdeki hastadan çok daha fazla ödem. [[K1 s. 371]]</li>
    <li><b>Taşıma.</b> Bilirubin, safra tuzu, elektrolit, serbest yağ asidi; varfarin, digoksin, NSAİİ, tiyopenton. NSAİİ varfarini ayırır: serbest varfarin ↑, PZ/INR ↑, kanama riski. [[K1 s. 372]]</li>
    <li><b>Yük ve öteki işlevler.</b> Hipoalbüminemide anyon açığı ↓, hafif metabolik alkaloz (Stewart); Ca²⁺ bağlar; sülfhidril grupları serbest radikal temizler. [[K1 s. 372]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Bir kapiller çizin: içinde albümin daireleri, duvarında fenestrasyonlar. Solda sağlam duvar (albümin içeride, ödem yok), sağda açılmış aralıklar (albümin dışarıda, ödem). Altına albümin %60 / globulin %35 / fibrinojen %4 çubuğunu ekleyin. [[K1 s. 371]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Hangi proteini karaciğer yapmaz? Bazik ilaçları hangi protein taşır? Albümin neden damarda kalır? Hipoalbüminemi anyon açığını nasıl etkiler? Stewart yönteminde albümin neden var? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 371–372]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d76-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Kan: %55 plazma, %45 hücre (eritrosit, lökosit, trombosit). [[K1 s. 371]]</li>
    <li>Plazma proteini 60–85 g/L; albümin %60, globulinler %35, fibrinojen %4; γ-globulin (Ig) dışındakileri karaciğer yapar. [[K1 s. 371]]</li>
    <li>İşlevsel gruplar: taşıyıcı, enzim inhibitörü, pıhtılaşma–antikoagülasyon, endokrin, immünolojik, karma (albümin). [[K1 s. 371]]</li>
    <li>Albümin onkotik basıncın %80'idir; ödemi kapiller sağlamlığı ve onkotik gradyan belirler. [[K1 s. 371]]</li>
    <li>Albümine bağlanan ilaçlar yarışır: varfarine NSAİİ eklemek INR'yi yükseltir. [[K1 s. 372]]</li>
    <li>Hipoalbüminemi anyon açığını küçültür ve hafif metabolik alkaloz yapar; albümin Ca²⁺ bağlar ve serbest radikal temizler. [[K1 s. 372]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="76"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/ek75">← Ek ders · Transplantasyon immünolojisi ve anestezinin bağışıklık işlevine etkisi</a>
    <a href="#/dersler/fizyoloji/77">Sonraki: Bölüm 77 · Metabolizma →</a>
  </nav>
</section>`,
};
