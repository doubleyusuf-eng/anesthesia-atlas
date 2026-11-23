/* Fizyoloji Bölüm 61 · Göz ve göz içi basınç (K1 İngilizce baskı s. 276–278).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz61-1'] = {
  no: 1, kok: 'Göz küresinin yapısı ve retina için:', kagit: 'Paper A · fizyoloji, Bölüm 61', kaynak: '[[K1 s. 276–277]]',
  onermeler: [
    { t: 'Koroid, göz küresinin yoğun fibröz dış tabakasıdır.', d: false, n: 'Yanlış. Fibröz dış tabaka skleradır; koroid, skleraya ve retinaya besin sağlayan orta vasküler tabakadır. [[K1 s. 276]]' },
    { t: 'Çubuklar sayıca en fazla olan fotoreseptörlerdir ve ışığın farklı dalga boylarını ayırt edemez.', d: true, n: 'Doğru. Çubuklar ışığa çok duyarlıdır ve daha çok loş ışıkta çalışır; rengi koniler algılar. [[K1 s. 276]]' },
    { t: 'Arka kamara, lensin arkasında kalan ve vitreus hümörü içeren boşluktur.', d: false, n: 'Yanlış. Arka kamara iris, lens ve siliyer cisim arasındaki üçgen boşluktur ve aköz hümör içerir; lensin arkası vitreus kamarasıdır. [[K1 s. 276]]' },
    { t: 'Fovea, koni yoğunluğu yüksek küçük bir çöküntüdür ve okuma gibi işler için gereken görme keskinliğini sağlar.', d: true, n: 'Doğru. [[K1 s. 276]]' },
    { t: 'Optik diskin üzerinde yalnız koniler bulunur; bu nedenle optik disk görme keskinliğinin en yüksek olduğu yerdir.', d: false, n: 'Yanlış. Optik diskte ne çubuk ne koni vardır; bu, fizyolojik kör noktayı oluşturur. [[K1 s. 277]]' },
  ],
};
VERI.sorular['fiz61-2'] = {
  no: 2, kok: 'Gözün kanlanması ve innervasyonu için:', kagit: 'Paper A · fizyoloji, Bölüm 61', kaynak: '[[K1 s. 276–277]]',
  onermeler: [
    { t: 'Göz küresinin arteriyel kanı tek bir kaynaktan, oftalmik arterden gelir.', d: true, n: 'Doğru. Dalları santral retinal arter, anterior siliyer arterler ve posterior siliyer arterdir. [[K1 s. 276–277]]' },
    { t: 'Korneanın duyusu trigeminal sinirin oftalmik dalının lakrimal dalıyla taşınır.', d: false, n: 'Yanlış. Lakrimal dal konjonktivayı innerve eder; korneayı, sklerayı, irisi ve siliyer cismi nazosiliyer dal innerve eder. [[K1 s. 277]]' },
    { t: 'Parasempatik postgangliyonik lifler siliyer gangliyondan kısa siliyer sinirle sfinkter pupilla ve siliyer kasa gider.', d: true, n: 'Doğru. Sonuç miyozis ve akomodasyondur; pregangliyonik nöronlar Edinger–Westphal çekirdeğinden çıkar. [[K1 s. 277]]' },
    { t: 'Sempatik pregangliyonik nöronlar siliyer gangliyonda sinaps yapar.', d: false, n: 'Yanlış. T1 kökünden çıkar ve süperior servikal gangliyonda sinaps yapar; postgangliyonik lifler internal karotis arter üzerinde yükselir. [[K1 s. 277]]' },
    { t: 'Süperior oblik kas troklear sinirle, lateral rektus kası abdusens siniriyle innerve edilir.', d: true, n: 'Doğru. Kalan ekstraoküler kaslar (süperior, inferior ve medial rektus, inferior oblik) okülomotor sinirle innerve edilir. [[K1 s. 277]]' },
  ],
};
VERI.sorular['fiz61-3'] = {
  no: 3, kok: 'Göz içi basınç (GİB) ve anestezi için:', kagit: 'Paper A · fizyoloji, Bölüm 61', kaynak: '[[K1 s. 277–278]]',
  onermeler: [
    { t: 'Aköz hümörün yaklaşık %80\'i plazma ultrafiltrasyonuyla, %20\'si Na⁺\'un aktif taşınmasıyla oluşur.', d: false, n: 'Yanlış. Oranlar tersidir: %80 Na⁺/K⁺-ATPaz\'a bağlı aktif Na⁺ taşınması, %20 ultrafiltrasyon. [[K1 s. 277]]' },
    { t: 'Aköz hümörün emilimi GİB ile episkleral venöz basınç arasındaki farkla doğrudan ilişkilidir.', d: true, n: 'Doğru. Schlemm kanalı doğrudan episkleral venlere açılır. [[K1 s. 278]]' },
    { t: 'Öksürme, ıkınma ve kusma GİB\'i 30–40 mmHg artırabilir.', d: true, n: 'Doğru. Venöz basınç artışı aköz drenajını azaltır; derin ekstübasyon ya da ETT\'nin LMA ile değiştirilmesi öksürük riskini azaltabilir. [[K1 s. 278]]' },
    { t: 'Hiperkapni koroidal vazokonstriksiyonla GİB\'i düşürür.', d: false, n: 'Yanlış. Hiperkapni koroidal vazodilatasyon yapar ve GİB\'i biraz artırır. [[K1 s. 278]]' },
    { t: 'Süksinilkolin GİB\'i 5–10 dakika süreyle en çok 10 mmHg kadar artırabilir.', d: true, n: 'Doğru. Mekanizması bilinmez; aç olmayan penetran göz yaralanmasında hızlı ardışık indüksiyon için roküronyum en iyi seçenek olabilir. [[K1 s. 278]]' },
  ],
};

const D61_NAV = [
  ['d61-kure', 'Göz küresi'], ['d61-retina', 'Retina ve optik disk'], ['d61-sinir', 'Kanlanma ve sinirler'], ['d61-horner', 'Stellat blok ve Horner'],
  ['d61-gib', 'GİB ve aköz hümör'], ['d61-penetran', 'Penetran göz yaralanması'],
  ['d61-p1', 'Part I'], ['d61-p2', 'Part II'], ['d61-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/61'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 4 · Bölüm 61', baslik: 'Göz ve göz içi basınç',
  lede: 'Göz küresi üç tabakalı, üç kamaralı bir küredir; içindeki basınç büyük ölçüde aköz hümörün üretim ve drenaj dengesiyle belirlenir. Anestezistin işi, açık göz yaralanmasında bu basıncı ani yükselişlerden korumaktır. [[K1 s. 276–278]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D61_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d61-kure">
  <h2>Göz küresi: üç tabaka, üç kamara, iki sıvı</h2>
  <p class="intro">Göz küresi yaklaşık küreseldir: dışta sklera, ortada koroid, içte retina; içi üç kamaraya ayrılır ve bu kamaralarda iki ayrı sıvı bulunur. [[K1 s. 276]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Göz küresinin kesiti</h3></div>
    <div data-viz="f61_kure"></div>
    <p class="viz-cap" aria-live="polite"><b>Sklera.</b> Yoğun, fibröz dış tabaka; göze yapı ve koruma sağlar. Önde kornea, arkada optik sinir için iki açıklığı vardır. Bir parçaya dokunun. [[K1 s. 276]]</p>
    <p class="viz-foot">Şematik kesit; oranlar temsilîdir.</p>
  </div>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>Kamara</th><th>Sınırları</th><th>İçeriği</th></tr></thead>
    <tbody>
      <tr><td><b>Ön kamara</b></td><td>Kornea ile iris arası</td><td rowspan="2"><b>Aköz hümör:</b> su ve elektrolitlerden oluşan, hücre dışı sıvıya benzeyen sulu, optik olarak berrak çözelti</td></tr>
      <tr><td><b>Arka kamara</b></td><td>İris, lens ve siliyer cisim arasındaki üçgen boşluk</td></tr>
      <tr><td><b>Vitreus kamarası</b></td><td>Lensin arkası</td><td><b>Vitreus hümörü:</b> üç boyutlu kollajen ağı, hiyalüronik asit ve sudan oluşan saydam jel</td></tr>
    </tbody>
  </table></div>
  <p class="small muted" style="margin-top:8px">[[K1 s. 276]]</p>
</section>

<section class="wrap blk ders-sec" id="d61-retina">
  <h2>Retina, fovea ve optik disk</h2>
  <p class="intro">Retina ışığı iki fotoreseptörle algılar: loş ışıkta çubuklar, parlak ışıkta ve renkte koniler; sinyali gangliyon hücreleri beyne taşır. [[K1 s. 276]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Işık düzeyi: hangi alıcı çalışıyor?</h3></div>
    <div data-viz="f61_retina"></div>
    <p class="viz-cap" aria-live="polite"><b>Parlak ışık.</b> Koniler çalışır: kırmızı, yeşil ve mavi koniler birlikte renk algısını oluşturur. Işık düzeyini azaltın. [[K1 s. 276]]</p>
    <p class="viz-foot">Model: etkinlik düzeyleri nitel; kitap sayı vermez.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Çubuklar sayıca en fazla olan ve ışığa son derece duyarlı fotoreseptördür ama dalga boylarını ayırt edemez. Gangliyon hücrelerinin aksonları optik siniri (II. kraniyal sinir) oluşturur; görsel bilgi lateral genikulat çekirdekte sinaps yaparak oksipital loba ulaşır. [[K1 s. 276]]</p>
    <p><b>Fovea</b>, konilerin yoğun olduğu küçük bir çöküntüdür ve okuma gibi işler için gereken keskinliği verir. <b>Optik disk</b> optik sinirin başıdır: gangliyon aksonları retinayı burada terk eder; fundoskopide soluk turuncu bir disk olarak görülür. Üzerinde çubuk ya da koni olmadığından her gözün görme alanında küçük bir boşluk, fizyolojik <b>kör nokta</b> vardır; beyin boşluğu çevredeki renk ve desenlerle "doldurduğu" için fark etmeyiz. [[K1 s. 276–277]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d61-sinir">
  <h2>Kanlanma ve sinirler</h2>
  <p class="intro">Göz küresinin kanı tek kaynaktan, oftalmik arterden gelir; görmeyi taşıyan optik sinirden başka dört sinir sistemi daha vardır: duyu, parasempatik, sempatik ve motor. [[K1 s. 276–277]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Gözün sinir yolları</h3></div>
    <div data-viz="f61_sinir"></div>
    <p class="viz-cap" aria-live="polite"><b>Duyu.</b> Trigeminal sinirin oftalmik dalı (V1): lakrimal dal konjonktivayı, nazosiliyer dal korneayı, sklerayı, irisi ve siliyer cismi innerve eder. Bir yol seçin. [[K1 s. 277]]</p>
    <p class="viz-foot">Şematik yol haritası; anatomik konumlar temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Kan.</b> Oftalmik arterin dalları santral retinal arter, anterior siliyer arterler ve posterior siliyer arterdir; venöz kan santral retinal ven ve vorteks venleriyle boşalır. [[K1 s. 276–277]]</p>
    <p><b>Pupilla iki kasla ayarlanır:</b> parasempatik lifler sfinkter pupillayı kasıp miyozis, sempatik lifler dilatatör pupillayı kasıp midriyazis yapar. Parasempatik lifler ayrıca siliyer kasla lensin şeklini değiştirir (akomodasyon); sempatik lifler üst kapağın süperior tarsal kasına da gider. [[K1 s. 277]]</p>
    <p><b>Ekstraoküler kaslar:</b> lateral rektus (abdüksiyon) abdusens (VI), süperior oblik (intorsiyon) troklear (IV), geri kalanlar (süperior, inferior ve medial rektus, inferior oblik) okülomotor (III) sinirle çalışır. Kitaba göre üst kapağın asıl kaldırıcısı levator palpebrae superioris fasiyal sinirle (VII) innerve edilir. [[K1 s. 277]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Bu bir kitap hatasıdır: levator palpebrae superioris okülomotor sinirle (III, üst dal) innerve edilir; fasiyal sinir kapağı kapatan orbikülaris okuliyi innerve eder. Horner sendromunda pitozisin kısmi kalmasının nedeni de levatorun III. sinirle sağlam kalmasıdır.</div>
</section>

<section class="wrap blk ders-sec" id="d61-horner">
  <h2>Klinik önem: stellat gangliyon bloğu ve Horner sendromu</h2>
  <p class="intro">Göze giden sempatik yol bloke edilince Horner sendromu ortaya çıkar; stellat gangliyon bloğunda bu, bloğun tuttuğunu doğrulayan işarettir. [[K1 s. 277]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Blok öncesi ve sonrası</h3></div>
    <div data-viz="f61_horner"></div>
    <p class="viz-cap" aria-live="polite"><b>Blok yok.</b> Sempatik tonus dilatatör pupillayı, süperior tarsal kası ve ter bezlerini çalıştırır. "Blok uygula"ya basın. [[K1 s. 277]]</p>
    <p class="viz-foot">Şematik yüz yarısı; bulguların büyüklüğü temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Stellat gangliyon, inferior servikal ve birinci torasik gangliyonun birleşmesiyle oluşan sempatik sinir topluluğudur; C7 vertebra gövdesinin hemen önündedir. Lokal anestezik bloğu, koldan, boyundan, yüzden ve kalpten kaynaklanan sempatik aracılı kronik ağrıda ya da Raynaud sendromunun belirtilerini azaltmak için yapılır. [[K1 s. 277]]</p>
    <p>Horner üçlüsü: <b>miyozis</b> (dilatatör pupilla bloğu), <b>kısmi pitozis</b> (süperior tarsal kas bloğu; asıl kaldırıcı levator çalıştığı için kısmi) ve <b>anhidroz</b> (ter bezlerinin sempatik uyarısı kesilir). [[K1 s. 277]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d61-gib">
  <h2>Göz içi basınç ve aköz hümör</h2>
  <p class="intro">Göz içi basınç (GİB), göz içeriğinin doku basıncıdır ve normalde 10–20 mmHg ölçülür; vitreus hacmi görece sabit olduğundan GİB'i asıl aköz hümörün üretim ve drenaj dengesi belirler. [[K1 s. 277]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Aköz hümörün yolu ve basınç dengesi</h3></div>
    <div data-viz="f61_akoz"></div>
    <p class="viz-cap" aria-live="polite"><b>Üretim.</b> Siliyer cisim aköz hümörü arka kamaraya salgılar: %80 Na⁺/K⁺-ATPaz'a bağlı aktif Na⁺ taşınması, %20 plazma ultrafiltrasyonu. Üretimi ve episkleral venöz basıncı değiştirin. [[K1 s. 277]]</p>
    <p class="viz-foot">Model: GİB, üretim ile basınç farkına bağlı drenajın dengesinden hesaplanır; sayılar temsilîdir, yalnız 10–20 mmHg normal aralığı kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Aköz hümör arka kamaradan lens ile iris arasındaki dar aralıktan geçer, pupilladan ön kamaraya girer, orada dolaşır ve trabeküler ağdan Schlemm kanalına süzülür. Kanal doğrudan episkleral venlere açılır: emilim, GİB ile venöz basınç arasındaki farkla doğru orantılıdır. Bu yüzden venöz basınç yükselince drenaj azalır ve GİB artar. [[K1 s. 277–278]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d61-penetran">
  <h2>Klinik önem: penetran göz yaralanması</h2>
  <p class="intro">GİB'deki akut bir artış, göz içeriğini travmatik açıklıktan dışarı itebilir; anestezide amaç bu ani artışları önlemektir. [[K1 s. 278]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Anestezide GİB'i yükseltenler ve önlemleri</h3></div>
    <div data-viz="f61_artis"></div>
    <p class="viz-cap" aria-live="polite"><b>Laringoskopi.</b> Sempatik yanıt GİB'i 10–20 mmHg artırabilir. Önlem: güçlü bir opioid eklemek ya da entübasyon yerine LMA kullanmak. Bir olay ve bir önlem seçin. [[K1 s. 278]]</p>
    <p class="viz-foot">Artış miktarları kitaptandır; eğrinin biçimi ve süresi (süksinilkolin dışında) temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Öksürme, ıkınma ve kusma episkleral venöz basıncı artırıp drenajı azaltarak GİB'i 30–40 mmHg yükseltebilir; uyanmada derin ekstübasyon ya da ETT'yi LMA ile değiştirmek bu riski azaltır. Tüp bağı juguler venleri sıkabilir; ETT ya da LMA bantla tespit edilmeli, baş yukarı pozisyon episkleral venöz basıncı daha da düşürür. [[K1 s. 278]]</p>
    <p>Süksinilkolin GİB'i bilinmeyen bir mekanizmayla 5–10 dakika boyunca en çok 10 mmHg artırır. Bu hastalar çoğu zaman aç değildir; hızlı ardışık indüksiyonda roküronyum en iyi seçenek olabilir. Hiperkapni koroidal vazodilatasyonla GİB'i biraz artırır. Süksinilkolin dışında GİB'i artıranlar kafa içi basıncı artıranlarla aynıdır (<a href="#/dersler/fizyoloji/49">Bölüm 49</a>). [[K1 s. 278]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d61-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: göz küresinin tabakaları ve kamaraları, çubuk–koni farkı, fovea ve optik disk, oftalmik arterin dalları, gözün duyu, otonom ve motor sinirleri, Horner üçlüsü, GİB'in normal değeri, aköz hümörün üretim oranları ve drenajı, GİB'i artıran anestezi olayları. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz61-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz61-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz61-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d61-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Göz içi basınç nedir, nasıl oluşur? Penetran göz yaralanması olan aç olmayan bir hastanın anestezisinde neye dikkat edersiniz?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım.</b> Göz içeriğinin doku basıncı; normal 10–20 mmHg. Vitreus hacmi görece sabit, GİB'i aköz hümörün üretim–drenaj dengesi belirler. [[K1 s. 277]]</li>
    <li><b>Anatomi.</b> Sklera, koroid, retina; ön ve arka kamarada aköz hümör, vitreus kamarasında vitreus jeli. [[K1 s. 276]]</li>
    <li><b>Üretim.</b> Siliyer cisim: %80 Na⁺/K⁺-ATPaz'a bağlı aktif Na⁺ taşınması, %20 ultrafiltrasyon; arka kamaraya. [[K1 s. 277]]</li>
    <li><b>Drenaj.</b> Lens–iris aralığı → pupilla → ön kamara → trabeküler ağ → Schlemm kanalı → episkleral venler; emilim GİB − venöz basınç farkıyla orantılı. [[K1 s. 277–278]]</li>
    <li><b>Akut artışlar.</b> Laringoskopi +10–20 mmHg; öksürme, ıkınma, kusma +30–40 mmHg; süksinilkolin ≤ 10 mmHg, 5–10 dk; hiperkapni hafif artış. [[K1 s. 278]]</li>
    <li><b>Önlemler.</b> Güçlü opioid ya da LMA; derin ekstübasyon ya da ETT→LMA değişimi; tüpü bağ yerine bantla tespit; baş yukarı; hızlı ardışık indüksiyonda roküronyum. [[K1 s. 278]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Göz küresinin ön yarısını çizin: kornea, iris, lens, siliyer cisim; arka kamaradan pupilladan ön kamaraya, oradan açıdaki trabeküler ağa ve Schlemm kanalına giden okları, kanalın episkleral vene açıldığını gösterin. Üretime "%80 aktif / %20 ultrafiltrasyon" yazın. [[K1 s. 276–278]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Venöz basınç GİB'i neden artırır? Süksinilkolin mi roküronyum mu? Horner sendromunda pitozis neden kısmidir? Kör nokta neden vardır, neden fark edilmez? GİB'i artıranlar hangi açıdan kafa içi basıncı artıranlara benzer? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 277–278]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d61-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Tabakalar: sklera (yapı, koruma), koroid (besin), retina (çubuk, koni, gangliyon hücreleri); kamaralar: ön ve arka (aköz), vitreus (jel). [[K1 s. 276]]</li>
    <li>Çubuklar çok, duyarlı, renksiz ve loş ışıkta; üç tip koni parlak ışıkta ve renkte; fovea koni yoğun, optik disk alıcısız (kör nokta). [[K1 s. 276–277]]</li>
    <li>Arteriyel kanın tek kaynağı oftalmik arterdir; venler santral retinal ve vorteks venleridir. [[K1 s. 276–277]]</li>
    <li>V1 duyu; Edinger–Westphal → III → siliyer gangliyon → miyozis ve akomodasyon; T1 → süperior servikal gangliyon → midriyazis ve süperior tarsal kas; VI lateral rektus, IV süperior oblik, gerisi III. [[K1 s. 277]]</li>
    <li>Stellat gangliyon bloğunun doğrulayıcı işareti Horner üçlüsüdür: miyozis, kısmi pitozis, anhidroz. [[K1 s. 277]]</li>
    <li>GİB 10–20 mmHg; aköz hümör %80 aktif Na⁺ taşınması, %20 ultrafiltrasyonla üretilir, Schlemm kanalıyla episkleral venlere drene olur. [[K1 s. 277–278]]</li>
    <li>Laringoskopi +10–20, öksürme/kusma +30–40, süksinilkolin ≤ +10 mmHg (5–10 dk), hiperkapni hafif artış; açık göz yaralanmasında bu artışlar önlenir. [[K1 s. 278]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="61"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/ek60">← Ek ders · Ağrının periferik mekanizmaları</a>
    <a href="#/dersler/fizyoloji/62">Sonraki: Bölüm 62 · Tükürük, özofagus ve yutma →</a>
  </nav>
</section>`,
};
