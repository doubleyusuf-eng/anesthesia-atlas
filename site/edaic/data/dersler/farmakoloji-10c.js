VERI.sorular = VERI.sorular || {};
VERI.sorular['far10c-1'] = {
  no: 1, kok: 'Siklooksijenaz ve damar–trombosit dengesi', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 154–157]]',
  onermeler: [
    { t: 'Endotelyal prostasiklin trombosit agregasyonunu artırır.', d: false, n: 'Prostasiklin agregasyonu baskılar ve damarları genişletir. [[K3 s. 154]]' },
    { t: 'Düşük doz aspirinin trombositteki etkisi trombositin ömrü boyunca sürer.', d: true, n: 'İnhibisyon geri dönüşümsüzdür ve çekirdeksiz trombosit yeni COX sentezleyemez. [[K3 s. 154]] [[K3 s. 157]]' },
    { t: 'COX-1 böbrek kan akımını düzenleyen prostaglandinlerin sentezine katılır.', d: true, n: 'Konstitutif COX-1, renal kan akımının kontrolüne ve mide mukozasının korunmasına katkıda bulunur. [[K3 s. 156]]' },
    { t: 'NSAİİ’ler lipoksijenazı doğrudan inhibe eder.', d: false, n: 'NSAİİ’lerin inhibe ettiği enzim siklooksijenazdır. [[K3 s. 154]]' },
    { t: 'COX-2 inhibisyonu tromboksan–prostasiklin dengesini tromboemboli yönüne kaydırabilir.', d: true, n: 'Endotelyal prostasiklin üretimi azalınca vazokonstriksiyon ve agregasyon ağır basabilir. [[K3 s. 156]]' }
  ]
};
VERI.sorular['far10c-2'] = {
  no: 2, kok: 'Aspirinin kinetiği, ürat atılımı ve doz aşımı', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 157–159]]',
  onermeler: [
    { t: 'Aspirinin emilen toplam miktarı ince bağırsakta midedekinden fazladır.', d: true, n: 'İnce bağırsağın geniş yüzeyi toplam emilimde belirleyicidir. [[K3 s. 159]]' },
    { t: 'Aspirinin düşük dozunda üratın tübüler sekresyonu artar.', d: false, n: 'Günde 2 g’ın altında sekresyon baskılanır ve ürat tutulur. [[K3 s. 157]]' },
    { t: 'Salisilatın idrarla atılımı asidik idrarda artar.', d: false, n: 'Alkali idrar salisilatın atılımını artırır. [[K3 s. 159]]' },
    { t: 'Aşırı dozda glisin konjugasyonu doyabilir.', d: true, n: 'Doygunluk salisilatın eliminasyonunu sıfırıncı derece kinetiğe kaydırabilir. [[K3 s. 159]]' },
    { t: 'Çocukta aspirin düzeyi yükseldikçe solunum merkezi uyarılır.', d: false, n: 'Çocukta solunum merkezi baskılanır ve karma asidoz daha sık görülür. [[K3 s. 158]]' }
  ]
};
VERI.sorular['far10c-3'] = {
  no: 3, kok: 'Parasetamolün emilimi, metabolizması ve toksisitesi', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 160]]',
  onermeler: [
    { t: 'Parasetamolün oral biyoyararlanımı %80’dir.', d: true, n: 'Parasetamol ince bağırsaktan iyi emilir ve oral biyoyararlanımı %80’e ulaşır. [[K3 s. 160]]' },
    { t: 'Plazma proteinlerine bağlanan parasetamol oranı %85’tir.', d: false, n: 'Parasetamolün proteine bağlanma oranı %10’dur. [[K3 s. 160]]' },
    { t: 'Terapötik dozda da az miktarda toksik metabolit oluşur.', d: true, n: 'Oluşan az miktardaki toksik metaboliti hepatik glutatyon hızla konjuge eder. [[K3 s. 160]]' },
    { t: 'Asetilsisteinin hidrolizi glutatyon sentezi için sistein sağlar.', d: true, n: 'Sistein glutatyonun öncülüdür. [[K3 s. 160]]' },
    { t: 'Aşırı dozdan sonra karaciğer işlevleri ve pıhtılaşma 3–5. günlerde en kötü düzeye ulaşır.', d: true, n: 'Karaciğer yetmezliği 48 saat sonra görülebilir ve en ağır işlev bozukluğu 3–5. günlere denk gelir. [[K3 s. 160]]' }
  ]
};

(function () {
  const nav = [['cox','COX ve seçicilik'], ['risk','Klinik risk'], ['aspirin','Aspirin'], ['parasetamol','Parasetamol'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet']];
  function sekil(id, baslik, sayfa) {
    return '<div class="viz"><div class="viz-head"><h3>' + baslik + '</h3></div><div data-viz="a10c_' + id + '"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. ' + sayfa + ']]</p></div>';
  }
  // Her ilacın kinetik ve klinik satırları aynı kayıttan okunur.
  const ilaclar = [
    ['Aspirin','4 g','Değişken','85','+++','–','–'],
    ['Parasetamol','4 g','2 sa','10','0','0','0'],
    ['İbuprofen','1.2 g / 2.4 g','2–3 sa','99','++/++++','+/+++','+'],
    ['Naproksen','1 g','12–17 sa','99','++++','0','0'],
    ['Ketorolak','40 mg','5 sa','99','++++','?','+'],
    ['Diklofenak','150 mg','1–2 sa','99','++','+++','+'],
    ['Tenoksikam','20 mg','72 sa','99','+','?','0'],
    ['Meloksikam','15 mg','20 sa','99','+','?','0'],
    ['Selekoksib','400 mg','11 sa','97','+','+++','0'],
    ['Etorikoksib','120 mg','22 sa','92','+','+++','0'],
    ['Parekoksib','80 mg','22 dk','98','+','+++','0']
  ];
  function tablo(ad, basliklar, ilk) {
    return '<table class="tbl"><caption>' + ad + ' [[K3 s. 155]]</caption><thead><tr><th scope="col">İlaç</th>' +
      basliklar.map(b => '<th scope="col">' + b + '</th>').join('') + '</tr></thead><tbody>' +
      ilaclar.map(r => '<tr><th scope="row">' + r[0] + '</th>' + r.slice(ilk, ilk + 3).map(v => '<td>' + v + '</td>').join('') + '</tr>').join('') + '</tbody></table>';
  }

  SAYFALAR['dersler/farmakoloji/10c'] = {
    grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 2 · Bölüm 10 · Ders 10c',
    baslik: "NSAİİ'ler: etki mekanizması, nonspesifik COX inhibitörleri ve parasetamol",
    lede: 'Nonsteroid antiinflamatuvar ilaçlar (NSAİİ) hafif ve orta şiddette ağrıda yaygın kullanılır ve perioperatif opioid gereksinimini azaltır. [[K3 s. 153]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id,ad]) => '<button type="button" data-scroll="a10c-' + id + '">' + ad + '</button>').join('')}</nav>
<section class="wrap blk ders-sec" id="a10c-cox">
<h2>COX inhibisyonu damar ve trombositi nasıl etkiler?</h2>
<p class="intro">Siklooksijenaz (COX) inhibisyonu, membran fosfolipitlerinden prostaglandinlerin (prostasiklin dahil) ve tromboksanların sentezini engeller. [[K3 s. 154]]</p>
${sekil('denge','Aynı damar, birbirine karşı çalışan iki sinyal','154–158')}
<p>Düşük doz aspirin bu dengeyi arteriyel tromboemboliyi önleyecek yönde değiştirir. [[K3 s. 154]] Diğer NSAİİ’lerde inhibisyon geri dönüşümlüdür ve plazma düzeyi düşünce COX yeniden çalışır. [[K3 s. 154]]</p>
<div class="cols"><div class="card"><h3>COX-1 · sürekli etkin</h3><p>Böbrek kan akımını düzenleyen ve mide mukozasını koruyan prostaglandinlerin üretimine, ayrıca tromboksan sentezine aracılık eder. [[K3 s. 156]]</p></div>
<div class="card"><h3>COX-2 · indüklenebilir</h3><p>Doku hasarıyla üretimi artar ve inflamasyonu kolaylaştırır. [[K3 s. 156]] Endotelde PGI₂ sentezi baskılanırsa denge agregasyon, vazokonstriksiyon ve tromboemboli yönüne kayabilir. [[K3 s. 156]]</p></div></div>
<p>İzoenzimler arasındaki valin–izolösin farkı, ilacın bağlanabileceği hidrofobik yan cebe erişimi değiştirir. [[K3 s. 156]] COX seçiciliği görelidir. [[K3 s. 156]]</p>
<ul><li><b>İnflamasyon ve ateş.</b> PGE₂ ve PGF₂α sentezinin azalması antiinflamatuvar etkiyi, ateş oluşturan santral prostaglandinlerin azalması antipirezi açıklar. [[K3 s. 154]]</li>
<li><b>Hemostaz ve mukoza.</b> Tromboksan azalınca trombosit adezyonu ve agregasyonu azalır. [[K3 s. 154]] Mide mukozasında prostaglandin kaybı ülserasyona yol açabilir. [[K3 s. 154]]</li>
<li><b>Diğer sentez yolu.</b> Lipoksijenaz inhibe edilmez ve genel mekanizmada lökotrien üretimi değişmez. [[K3 s. 154]]</li></ul>
<h3>İlaçları seçiciliklerine göre yerleştirin</h3>
<div class="cols"><div class="card"><h3>Nonspesifik COX inhibitörleri</h3><ul>
<li>Salisilat: aspirin. [[K3 s. 154]]</li>
<li>Asetik asit türevleri: diklofenak, ketorolak, indometazin. [[K3 s. 154]]</li>
<li>Antranilik asit: mefanamik asit. [[K3 s. 154]]</li>
<li>Pirazolon: fenilbutazon. [[K3 s. 154]]</li>
<li>Propiyonik asit türevleri: ibuprofen, naproksen. [[K3 s. 154]]</li>
<li>Para-aminofenol: parasetamol. [[K3 s. 154]]</li>
<li>Oksikamlar: tenoksikam, piroksikam. [[K3 s. 154]]</li></ul></div>
<div class="card"><h3>COX-2’ye yönelenler</h3><ul>
<li><b>Tercihli:</b> meloksikam (oksikam). [[K3 s. 154]]</li>
<li><b>Spesifik:</b> parekoksib, selekoksib ve kitapta parantezle verilen rofekoksib (pirazoller). [[K3 s. 154]]</li>
<li><b>Spesifik:</b> etorikoksib (metilsülfon) ve lumirakoksib (fenilasetik asit türevi). [[K3 s. 154]]</li></ul></div></div>
<h3>Uygulama ve vücuttaki dağılım</h3>
<ul><li>Genellikle oral veya rektal uygulanırlar, ancak diklofenak, ketorolak ve parekoksib intravenöz de verilebilir. [[K3 s. 153]]</li>
<li>İnce bağırsaktan hızla emilirler, plazma proteinlerine genellikle yüksek oranda bağlanırlar ve dağılım hacimleri küçüktür. [[K3 s. 153]]</li>
<li>Tipik olarak karaciğer metabolizmasını, inaktif ürünlerin idrar ve safrayla atılması izler. [[K3 s. 153]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a10c-risk">
<h2>Organlara göre yarar ve risk</h2>
<p class="intro">Prostaglandin kaybının sonucu dokuya bağlıdır: böbrekte perfüzyon, bağırsakta ise mukozanın savunması aksayabilir. [[K3 s. 156–157]]</p>
${sekil('bobrek','Böbrek vazokonstriksiyon karşısında nasıl korunur?','157')}
<p>Böbrek üzerindeki etkiyi değerlendirirken sıvı tutulmasını ve tetiklenebilen kalp yetmezliğini de hesaba katın. [[K3 s. 157]]</p>
<div class="cols"><div class="card"><h3>Gastrointestinal sistem</h3><ul>
<li>Mukus, bikarbonat, hızlı hücre yenilenmesi ve zengin kanlanma mukozayı asit ve enzimlerden korur. [[K3 s. 156]]</li>
<li>Prostaglandinler bu savunmaların çoğunu destekler. [[K3 s. 156]] Uzun kullanımda mide dışında da sık görülen erozyonlar hafif ağrı, demir eksikliği anemisi veya ölümcül kanamayla sonuçlanabilir. [[K3 s. 156]]</li>
<li>Aspirinde asetilsalisilat ve salisilat iyonları alkali mukoza hücresinde hapsolur, trombosit işlevinin bozulması da kanama olasılığını artırır. [[K3 s. 156]]</li>
<li>Ciddi gastrointestinal (Gİ) yan etki riski ketorolak ve piroksikamda en yüksek, diklofenak ve naproksende orta, ibuprofende (&lt; 1.2 g/gün) en düşüktür. [[K3 s. 156–157]]</li>
<li>COX-2 inhibitörlerinde Gİ risk nonselektif ilaçlardan düşüktür. [[K3 s. 157]]</li></ul></div>
<div class="card"><h3>Kalp ve damarlar</h3><ul>
<li>Majör olaylar arasında miyokard enfarktüsü, inme, atriyal fibrilasyon ve kalp yetmezliği bulunur. [[K3 s. 157]]</li>
<li>Diklofenak (150 mg/gün) ve ibuprofen (2.4 g/gün), majör koroner olaylar açısından COX-2 inhibitörlerine benzer risk taşır. [[K3 s. 157]]</li>
<li>Bir yıl tedavi edilen 1000 hastada biri ölümcül üç ek koroner olay beklenir. [[K3 s. 157]] Kitabın aktardığı uyarılara göre risk artışından muaf bir kullanım süresi yoktur. [[K3 s. 157]]</li>
<li>Daha genç erkeklerde ve inme ya da geçici iskemik atak (TIA) öyküsü olanlarda inme riski daha yüksek görünür. [[K3 s. 157]]</li></ul></div>
<div class="card"><h3>Solunum yolları</h3><ul>
<li>Astımlıların %20’sine kadarında akut ağır astım tetiklenebilir. [[K3 s. 157]] Kronik rinit veya nazal polipler eşlik edebilir, etkilenenler çoğunlukla orta yaşlıdır ve çocuklar görece korunur. [[K3 s. 157]]</li>
<li>Duyarlı hastada COX baskılanınca daha fazla araşidonik asit bronkospazm yapan lökotrienlere yönelir. [[K3 s. 157]] Aspirin bu hastaların trombositlerinden anormal bir yanıtla sitotoksik mediyatör salınmasına da yol açar. [[K3 s. 157]]</li></ul></div>
<div class="card"><h3>Hemostaz ve etkileşimler</h3><ul>
<li>Siklik endoperoksit ürünleri ve TXA₂ azalınca agregasyon ve vazokonstriksiyon baskılanır, perioperatif kan kaybı artabilir. [[K3 s. 157]]</li>
<li>Yüksek dozda bile COX-2 inhibisyonu trombosit işlevini etkilemez. [[K3 s. 157]]</li>
<li>Heparin veya varfarinle birlikte kullanım dikkat gerektirir. [[K3 s. 157]] Varfarin gibi proteine sıkı bağlanan ilaçlar bağlanma yerlerinden ayrılırsa etkileri güçlenebilir. [[K3 s. 153]] [[K3 s. 157]]</li>
<li>Serum lityumu yükselebileceği için düzeyi izlenir. [[K3 s. 157]]</li></ul></div></div>
<p><b>Karaciğer.</b> Hepatotoksisite genellikle uzun veya aşırı kullanımla ortaya çıkar, ancak kısa kürlerde bile hastaların %15’ine kadarında transaminazlar yükselebilir. [[K3 s. 157]]</p>
<h3>Aynı ilacın kinetiğini ve klinik profilini karşılaştırın</h3>
<p>İbuprofendeki eğik çizgi düşük ve yüksek doz verilerini aynı sırayla eşler. [[K3 s. 155]] Klinik sütunlar kitaptaki nitel işaretleri korur: artıların sayısı artışın derecesini, – azalmayı, 0 değişiklik olmadığını, ? belirsizliği gösterir. [[K3 s. 155]]</p>
<div class="a10c-veriler">${tablo('Doz ve kinetik',['En yüksek günlük doz','Eliminasyon yarı ömrü','Proteine bağlanma (%)'],1)}${tablo('Klinik profil',['Üst Gİ erozyon','Koroner olay','İnme'],4)}</div>
</section>
<section class="wrap blk ders-sec" id="a10c-aspirin">
<h2>Aspirin: trombositten asit–baz dengesine</h2>
<p class="intro">Aspirin (asetilsalisilik asit) ağrı ve inflamasyonda kullanılır, metabolik etkileri ise özellikle doz aşımında önem kazanır. [[K3 s. 158]]</p>
${sekil('solunum','Artan CO₂ yüküne verilen yanıt yaşla nasıl değişir?','158–159')}
<p>Solunum paternini yorumlarken hem CO₂ üretimini hem solunum merkezinin yanıtını düşünün. [[K3 s. 158]]</p>
<div class="cols"><div class="card"><h3>Trombosit etkisi neden uzar?</h3><p>Aspirin çekirdeksiz trombositte COX’u geri dönüşümsüz baskılar ve trombosit enzimi yenileyemez. [[K3 s. 154]] [[K3 s. 157]] Yeni trombositlerin oluşumu için kitap 14 güne kadar süre verir. [[K3 s. 157]] Bu antiagregan etkiden akut miyokard enfarktüsünde ve inmenin önlenmesinde yararlanılır. [[K3 s. 158]]</p></div>
<div class="card"><h3>Doz ürat atılımını nasıl değiştirir?</h3><ul>
<li><b>&lt; 2 g/gün:</b> tübüler sekresyon azalır ve ürat tutulur. [[K3 s. 157]]</li>
<li><b>&gt; 5 g/gün:</b> geri emilimin baskılanması ağır basar ve ürikozüri gelişir. [[K3 s. 157]] Yüksek dozun yan etkileri nedeniyle bu amaçla nadiren kullanılır. [[K3 s. 157]]</li>
<li>Uzun kullanım sonrası analjezik nefropatisi papiller nekroz ve interstisyel fibrozisle ortaya çıkabilir. [[K3 s. 157]]</li></ul></div></div>
<h3>Emilimden atılıma</h3>
<ol><li>Aspirin zayıf bir asittir (pKa 3). [[K3 s. 159]] Midede çoğunlukla noniyonize olduğundan emilebilir, ancak alkali mukoza hücresinde hapsolan salisilat sistemik dolaşıma geçemeyebilir. [[K3 s. 159]] Geniş yüzeyiyle ince bağırsak toplamda daha çok ilaç emer. [[K3 s. 159]]</li>
<li>Dolaşımdaki aspirinin %85’i başlıca albümine bağlıdır. [[K3 s. 159]] Bağırsak ve karaciğer esterazları aspirini hızla salisilata hidrolize eder, ardından karaciğerde salisilürik asit ve glukuronid türevleri oluşur. [[K3 s. 159]]</li>
<li>Birinci derece kinetikte aspirinin yarı ömrü 15–30 dakikadır. [[K3 s. 155]] Doz aşımında salisilatı salisilürik aside dönüştüren glisin konjugasyonu doyabilir, eliminasyon sıfırıncı dereceye kayabilir ve yarı ömür belirgin uzar. [[K3 s. 155]] [[K3 s. 159]]</li>
<li>Salisilat ve metabolitleri idrarla atılır, idrarın alkalileşmesi atılımı artırır. [[K3 s. 159]]</li></ol>
<h3>Doz aşımını tanıma</h3>
<div class="cols"><div class="card"><h3>Sık bulgular</h3><ul>
<li>Bilinç çoğunlukla açıktır, kaybı masif doz aşımını düşündürür. [[K3 s. 158]]</li>
<li>Terleme, tinnitus, bulanık görme ve taşikardi. [[K3 s. 158]]</li>
<li>Ateş, hiperventilasyon ve sonradan metabolik asidozun eşlik ettiği respiratuvar alkaloz. [[K3 s. 159]]</li></ul></div>
<div class="card"><h3>Nadir bulgular</h3><ul>
<li>Bulantı, kusma, epigastrik ağrı, Gİ kanama veya oligüri. [[K3 s. 159]]</li>
<li>Kapiller geçirgenlik artışıyla pulmoner ödem, koagülopati veya hipokalemi. [[K3 s. 159]]</li>
<li>Hipo- ya da hiperglisemi, ensefalopati ve bilinç kaybı. [[K3 s. 159]]</li></ul></div></div>
<p><b>Tedavi.</b> Kitap aktif kömür, zorlu alkali diürez ve hemofiltrasyon/hemodiyalizi sayar. [[K3 s. 159]]</p>
<p><b>Reye sendromu.</b> Aspirinle ilişkilendirilen bu nadir sendrom başlıca çocukları etkiler. [[K3 s. 159]] Yaygın mitokondri hasarı, yetmezliğe ilerleyen yağlı karaciğer ve serebral ödemli ensefalopati görülür, mortalite %40’a ulaşabilir. [[K3 s. 159]] Kitap 12 yaş altında aspirini yalnız jüvenil artrit (Still hastalığı) gibi özel endikasyonlara ayırır. [[K3 s. 159]]</p>
</section>
<section class="wrap blk ders-sec" id="a10c-parasetamol">
<h2>Parasetamol: konjugasyondan karaciğer hasarına</h2>
<p class="intro">Parasetamolün küçük bir bölümü çok toksik bir metabolite dönüşür, bu metabolitin akıbetini karaciğerin glutatyon rezervi belirler. [[K3 s. 160]]</p>
${sekil('glutatyon','Doz veya tedavi değişince metabolite ne olur?','160')}
<p>Şekildeki toksik ürün N-asetil-p-amino-benzokinon imindir. [[K3 s. 160]] Karaciğer normalde parasetamolün çoğunu glukuronidle, kalan bir bölümünü sülfat ve sisteinle konjuge eder. [[K3 s. 160]] Konjugatlar idrarla aktif olarak atılır, ilacın yalnız küçük bir kısmı değişmeden çıkar. [[K3 s. 160]]</p>
<div class="cols"><div class="card"><h3>Etki ve kinetik</h3><ul>
<li>İn vitro COX etkisi yok denecek kadar azdır, ancak orta derecedeki analjezik ve antipiretik etkileri nedeniyle kitap parasetamolü NSAİİ sınıfına alır. [[K3 s. 159]]</li>
<li>Santral COX-1 varyantı COX-3’ün inhibisyonuyla prostaglandin sentezinin azalması, ağrı ve ateş üzerindeki etkiler için öne sürülen bir mekanizmadır. [[K3 s. 156]] [[K3 s. 159]]</li>
<li>İnce bağırsaktan iyi emilir, oral biyoyararlanım %80’dir. [[K3 s. 160]] Diğer NSAİİ’lere göre protein bağlanması düşüktür (%10), dağılım hacmi büyüktür ve gastrik irritasyon görülmez. [[K3 s. 160]]</li></ul></div>
<div class="card"><h3>Preparatlar</h3><ul>
<li>500 mg tablet tek başına veya zayıf opioidle kombinasyon halinde bulunur. [[K3 s. 160]]</li>
<li>Supozituvar 125 mg veya 1 g, pediyatrik eliksir 5 ml’de 120 mg içerir. [[K3 s. 160]]</li>
<li>500 mg parasetamol ile 100 mg metiyonini birleştiren preparat daha pahalıdır. [[K3 s. 160]]</li>
<li>İntravenöz çözeltiler 100 ml’de 1 g veya 500 mg içerir. [[K3 s. 160]]</li></ul></div></div>
<h3>Kitaptaki doz şemaları</h3><ul>
<li><b>50 kg altında:</b> intravenöz doz 15 mg/kg, günlük üst sınır 60 mg/kg/gün. [[K3 s. 160]]</li>
<li><b>Pediyatrik:</b> başlangıçta 15–30 mg/kg, ardından 4 saatte bir 10–15 mg/kg, en çok 60 mg/kg/gün. [[K3 s. 160]]</li></ul>
<h3>Doz aşımının klinik seyri</h3><ul>
<li><b>Başvuru bulguları.</b> Bilinç genellikle açıktır, bulantı, kusma, epigastrik ağrı ve terleme görülebilir. [[K3 s. 160]]</li>
<li><b>Deri, kan ve dolaşım.</b> Eritem, ürtiker, mukozal lezyonlar ve akut hemolitik anemi görülebilir. [[K3 s. 160]] Çok yüksek dozlarda periferik vazodilatasyon ve şok gelişebilir. [[K3 s. 160]]</li>
<li><b>Metabolik ve hepatik bulgular.</b> Gecikmiş hiperglisemi ve kolestaz görülebilir. [[K3 s. 160]]</li>
<li><b>Zaman çizgisi.</b> Karaciğer yetmezliği 48 saat sonra görülebilir, karaciğer işlevleri ve pıhtılaşma 3–5. günlerde en kötü düzeye gelir. [[K3 s. 160]] Fulminan hepatik yetmezlik 3–7. günlerde gelişebilir. [[K3 s. 160]]</li></ul>
<p><b>Tedavi.</b> Kitap, alımdan sonraki 1 saat içinde aktif kömürü, erken intravenöz asetilsisteini, sıvı ve antiemetikleri, ayrıca uzman merkeze erken sevki belirtir. [[K3 s. 161]]</p>
</section>
<section class="wrap blk ders-sec" id="a10c-p1"><h2>Part I · MTF</h2><p>Her önermeyi doğru veya yanlış olarak işaretleyin.</p>
<div class="viz"><div data-viz="mtf" data-q="far10c-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far10c-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far10c-3"></div></div></section>
<section class="wrap blk ders-sec" id="a10c-p2"><h2>Part II · SOE 2 (farmakoloji)</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Aspirinin trombosit üzerindeki etkisi neden kalıcıdır? Aspirin ve parasetamolün doz aşımını mekanizma, klinik seyir ve tedavi açısından karşılaştırın.</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Düşük doz aspirin endotelyal prostasiklini korurken trombositin TXA₂ üretimini baskılar. [[K3 s. 154]] İnhibisyon geri dönüşümsüzdür ve çekirdeksiz trombosit yeni enzim üretemez. [[K3 s. 154]] [[K3 s. 157]]</li>
<li>Aspirinde oksidatif fosforilasyonun eşleşmesi bozulur ve CO₂ yükü artar. [[K3 s. 158]] Erişkinde solunum merkezinin uyarılmasıyla alkaloz gelişir, ardından metabolik asidoz eklenir. [[K3 s. 158–159]]</li>
<li>Tinnitus ve hiperventilasyon aspirin doz aşımını düşündürür. [[K3 s. 158–159]] Kitaptaki tedavi seçenekleri aktif kömür, zorlu alkali diürez ve hemofiltrasyon/hemodiyalizdir. [[K3 s. 159]]</li>
<li>Parasetamolde konjugasyon doyar, toksik metabolit glutatyonu tüketir ve sentrilobüler nekroz gelişebilir. [[K3 s. 160]] Bilinç genellikle açık kalır, hepatik yetmezlik gecikebilir. [[K3 s. 160]]</li>
<li>Metiyonin glutatyon sentezini artırır, asetilsistein sistein sağlar. [[K3 s. 160]] Kitap ilk saat içinde aktif kömür, erken İV asetilsistein, sıvı, antiemetik ve erken uzman merkez sevkini belirtir. [[K3 s. 161]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Trombosit TXA₂’si ve endotel PGI₂’si için karşıt iki ok çizip düşük doz aspirinin hedefini işaretleyin. [[K3 s. 154]] Altına aspirinde ventilasyonun değişimini, parasetamolde ise glutatyonun tükenmesini ayrı yollarla gösterin. [[K3 s. 158]] [[K3 s. 160]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Aspirin doz aşımında çocukta asit–baz dengesi nasıl değişir? [[K3 s. 158]] İdrar pH’sı salisilat atılımını nasıl etkiler? [[K3 s. 159]] Parasetamol doz aşımında asetilsisteinin İV yolu neden tercih edilir? [[K3 s. 160]]</div></div></section>
<section class="wrap blk ders-sec" id="a10c-ozet"><h2>Özet</h2><ul class="ozet">
<li>Trombosit TXA₂’si agregasyonu destekler, endotel PGI₂’si ise sınırlar. [[K3 s. 154]]</li>
<li>Prostaglandin sentezinin baskılanması bağırsak mukozasının korunmasını ve böbrek perfüzyonunu bozabilir. [[K3 s. 156–157]]</li>
<li>Aspirinin trombositteki etkisi kalıcıdır, diğer NSAİİ’lerin COX inhibisyonu plazma düzeyi düşünce çözülür. [[K3 s. 154]]</li>
<li>Salisilat toksisitesinde çocukta karma asidoz daha sık görülür. [[K3 s. 158]]</li>
<li>Parasetamol doz aşımında artan toksik metabolit glutatyonu tüketir, asetilsistein sistein sağlayarak glutatyonun yenilenmesine yardım eder. [[K3 s. 160]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="10c"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/10b">← 10b · Diğer opioidler ve opioid antagonistleri</a><a href="#/dersler/farmakoloji/10d">Sonraki: 10d · Tek tek NSAİİ'ler ve COX-2 inhibitörleri →</a></nav></section>`
  };
})();
