/* Farmakoloji · Bölüm 18 · Ders 18a: Hipnotikler ve anksiyolitikler (K3 s. 279–284, Türkçe çalışma çevirisi). */
VERI.sorular = VERI.sorular || {};
VERI.sorular['far18a-1'] = {
  no: 1, kok: 'GABA reseptörleri ve benzodiazepinler', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 279–282]]',
  onermeler: [
    { t: 'GABAB reseptörlerinin uyarılması Cl⁻ iletkenliğini artırarak nöronu hiperpolarize eder.', d: false, n: 'Yanlış. Cl⁻ iletkenliğini artıran GABAA reseptörüdür; metabotropik GABAB reseptörü K⁺ iletkenliğini artırır. [[K3 s. 279]]' },
    { t: 'Midazolam pKa değeri 6,5 olduğundan fizyolojik pH’da başlıca iyonize olmayan formda bulunur.', d: true, n: 'Doğru. Fizyolojik pH’da %89’u iyonize olmayan lipitte çözünür formdadır. [[K3 s. 280]]' },
    { t: 'Lorazepamın karaciğerdeki glukuronik asit konjugasyonu aktif metabolitler oluşturur.', d: false, n: 'Yanlış. Lorazepam metabolitleri inaktiftir; aktif metabolit oluşturanlar diazepam ve midazolamdır. [[K3 s. 280–281]]' },
    { t: 'Alfentanil midazolamla aynı hepatik P450 izoenzimi (3A3/4) tarafından metabolize edilir.', d: true, n: 'Doğru. Birlikte uygulandıklarında etkileri uzayabilir. [[K3 s. 280]]' },
    { t: 'Diazepam ele alınan benzodiazepinler arasında en düşük klirense sahiptir.', d: true, n: 'Doğru. Klirensi 0,2–0,5 mL/kg/dk’dır; infüzyon şeklinde kullanımı yarılanma ömrünü çok artırır. [[K3 s. 281]]' },
  ],
};
VERI.sorular['far18a-2'] = {
  no: 2, kok: 'Diğer benzodiazepinler, flumazenil ve Z ilaçları', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 281–284]]',
  onermeler: [
    { t: '1–12 yaş arasındaki çocuklarda status epileptikusta lorazepam dozu 50–100 μg/kg’dır.', d: true, n: 'Doğru. İV, sublingual veya rektal yolla maksimum 4 mg’a kadar uygulanır; >12 yaşta doz 4 mg’dır. [[K3 s. 281]]' },
    { t: 'Flumazenilin eliminasyon yarılanma ömrü çoğu benzodiazepinden uzundur.', d: false, n: 'Yanlış. Flumazenilin yarılanma ömrü yaklaşık 1 saat ile görece kısadır; bu nedenle ek doz ya da infüzyon gerekebilir. [[K3 s. 282]]' },
    { t: 'Klordiazepoksid alkol yoksunluğu belirtilerinin tedavisinde kullanılan bir benzodiazepindir.', d: true, n: 'Doğru. Klinik kullanıma sunulan ilk BDZ türevidir. [[K3 s. 282]]' },
    { t: 'Flumazenil birden fazla ilacın alındığı doz aşımında her zaman güvenle verilir.', d: false, n: 'Yanlış. Nöbetleri tetikleyebileceğinden çoklu ilaç doz aşımında dikkatli olunmalıdır. [[K3 s. 282]]' },
    { t: 'Z ilaçları arasında en uzun eliminasyon yarılanma ömrü zopiklondadır.', d: true, n: 'Doğru. Zopiklon ~5 saat, zolpidem 2 saat ve zaleplon 1 saat yarılanma ömrüne sahiptir. [[K3 s. 284]]' },
  ],
};
VERI.sorular['far18a-3'] = {
  no: 3, kok: 'Deksmedetomidin', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 283–284]]',
  onermeler: [
    { t: 'Medetomidinin farmakolojik olarak aktif olan biçimi R-enantiomeridir.', d: false, n: 'Yanlış. Deksmedetomidin S-enantiomeridir; R-formunun farmakolojik aktivitesi yoktur. [[K3 s. 283]]' },
    { t: 'Deksmedetomidin α₂ reseptörler için α₁’e kıyasla 1600:1 oranında seçicidir.', d: true, n: 'Doğru. Bu seçicilik klonidinden sekiz kat yüksektir. [[K3 s. 283]]' },
    { t: 'Bukkal uygulamada biyoyararlanımı %75’in üzerindedir ve başlangıç hipertansiyonunu önler.', d: true, n: 'Doğru. Oral biyoyararlanım %20’nin altındayken bukkal emilim yüksektir. [[K3 s. 284]]' },
    { t: 'Ağır böbrek yetmezliğinde aktif metabolit birikimi nedeniyle doz azaltılmalıdır.', d: false, n: 'Yanlış. Karaciğerde Faz I ve II ile inaktif metabolitlere dönüşür; yalnızca karaciğer fonksiyon bozukluğu doz azaltımı gerektirir. [[K3 s. 284]]' },
    { t: 'Dekonjestan ve antisiyalagog etkileri fiberoptik entübasyon sedasyonunda avantaj sağlayabilir.', d: true, n: 'Doğru. Solunumu bozmuyor görünmesi ve hava yolunun açık kalmasıyla birlikte bu etkiler yararlıdır. [[K3 s. 284]]' },
  ],
};

const A18A_NAV = [
  ['gaba', 'GABA'], ['midazolam', 'Midazolam'], ['digerbdz', 'Diğer BDZ'],
  ['flumazenil', 'Flumazenil & Z'], ['deks', 'Deksmedetomidin'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/18a'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 4 · Bölüm 18 · Ders 18a', baslik: 'Hipnotikler ve anksiyolitikler',
  lede: 'Merkezi sinir sisteminin başlıca inhibitör sistemi olan GABA üzerinden etki eden benzodiazepinler, Z ilaçları, flumazenil ve α₂-agonist deksmedetomidin bu dersin konusudur. [[K3 s. 279–284]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A18A_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a18a-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a18a-gaba">
  <h2>GABA reseptörleri ve benzodiazepin yapısı</h2>
  <p class="intro">γ-Aminobütirik asit (GABA), merkezi sinir sistemindeki başlıca inhibitör nörotransmiterdir ve GABAA ile GABAB reseptörleriyle etki eder. [[K3 s. 279]]</p>
  <div class="viz"><div class="viz-head"><h3>GABAA ve GABAB reseptörlerinin etki biçimi</h3></div><div data-viz="a18a_gaba"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel reseptör gösterimi. [[K3 s. 279]]</p></div>
  <div class="cols" style="margin-top:16px">
    <div class="card"><span class="tag basic">GABAA ve BDZ alt tipleri</span><ul class="ozet" style="margin-top:8px">
      <li>Ligand kapılı Cl⁻ kanalıdır; beş alt birimden (2α, β, δ ve γ; çeşitli varyantlar) oluşur ve esas olarak (yalnız değil) postsinaptiktir ve MSS’de yaygındır. [[K3 s. 279]]</li>
      <li>GABA kanalın açılma sıklığını ve Cl⁻ iletkenliğini artırarak membranı hiperpolarize eder; BDZ’ler aktive reseptörün α alt birimine bağlanıp etkiyi güçlendirir. [[K3 s. 279]]</li>
      <li>Özgül α alt birimi farmakolojiyi belirler: BZ1 (omurilik, serebellum) anksiyolizden; BZ2 (omurilik, hipokampus, korteks) sedasyon ve antikonvülzan etkiden sorumludur. [[K3 s. 279]]</li>
    </ul></div>
    <div class="card"><span class="tag clin">GABAB, BDZ kullanımı ve yapı</span><ul class="ozet" style="margin-top:8px">
      <li>GABAB metabotropiktir (G-proteini ve ikinci haberciler); K⁺ iletkenliğini artırıp hiperpolarize eder. Beyinde pre/postsinaptik ve omurilik arka boynuzundadır; baklofen yalnız GABAB ile spastisiteyi azaltır. [[K3 s. 279]]</li>
      <li>BDZ’ler premedikasyon, küçük işlem sedasyonu, anksiyolitik, hipnotik ve antikonvülzan olarak kullanılır. [[K3 s. 279]]</li>
      <li>Temel yapı benzen ve 7 üyeli (5 C, 2 N) diazepin halkasıdır; aktivite için 2 konumunda karbonil, ikinci benzen halkası ve ilk halkada halojen gerekir. [[K3 s. 280]]</li>
    </ul></div>
  </div>
  <div class="note plain"><b>Atlas notu.</b> Kitap GABAA alt birimlerini 2α, β, δ, γ diye sıralar ve BZ1’i anksiyoliz, BZ2’yi sedasyonla ilişkilendirir; yaygın bileşim 2α, 2β, 1γ’dır ve sedasyon α1 (BZ1), anksiyoliz α2 içeren reseptörlerle ilişkilidir.</div>
</section>

<section class="wrap blk ders-sec" id="a18a-midazolam">
  <h2>Midazolam ve pH’ya bağlı halka yapısı</h2>
  <p class="intro">Midazolamın yapısı çevresindeki pH’ya göre değişir; bu özellik onu benzodiazepinler arasında benzersiz kılar. [[K3 s. 280]]</p>
  <div class="viz"><div class="viz-head"><h3>Flakondan plazmaya halka kapanması</h3></div><div data-viz="a18a_midazolam"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">pH değerleri ve %89 oranı kitaptan; halka çizimi şematiktir. [[K3 s. 280]]</p></div>
  <ul class="ozet">
    <li><b>Sunum ve geçiş.</b> pH 3,5’te berrak çözelti halindedir; açık halka suda çözünür ve enjeksiyonda ağrı yapmaz. pH &gt;4’te halka kapanıp lipitte çözünür hale gelir; pKa 6,5 nedeniyle fizyolojik pH’da %89’u iyonize değildir. [[K3 s. 280]]</li>
    <li><b>Kullanım.</b> Küçük işlemlerde İV sedasyon (güçlü amnezik) ve YBÜ’de ventile hastaların sedasyonu; premedikasyonda oral (~%40 biyoyararlanım), intranazal veya İM. [[K3 s. 280]]</li>
    <li><b>Kinetik.</b> Kısa etki süresi dağılıma bağlıdır. Hidroksilasyonla aktif 1-α hidroksimidazolam oluşur ve glukuronik asitle konjuge edilip böbrekten atılır; &lt;%5’i oksazepama dönüşür. [[K3 s. 280]]</li>
    <li><b>Etkileşim.</b> Alfentanil aynı P450 izoenzimiyle (3A3/4) metabolize olduğundan birlikte etkileri uzayabilir. [[K3 s. 280]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a18a-digerbdz">
  <h2>Diğer benzodiazepinler ve karşılaştırmalı kinetik</h2>
  <p class="intro">Diazepam, lorazepam, temazepam ve klordiazepoksid; yarılanma ömrü, klirens ve aktif metabolit oluşturma bakımından ayrılır. [[K3 s. 281–282]]</p>
  <div class="viz"><div class="viz-head"><h3>Benzodiazepinlerin metabolizma ve kinetik profili</h3></div><div data-viz="a18a_bdz_met"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Yollar ve kinetik değerler kitaptan. [[K3 s. 280–282]]</p></div>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>Parametre</th><th>Diazepam</th><th>Midazolam</th><th>Lorazepam</th></tr></thead>
    <tbody>
      <tr><td>Proteine bağlanma (%)</td><td>95</td><td>95</td><td>95</td></tr>
      <tr><td>Eliminasyon t½ (saat)</td><td>20–45</td><td>1–4</td><td>10–20</td></tr>
      <tr><td>Dağılım hacmi (L/kg)</td><td>1,0–1,5</td><td>1,0–1,5</td><td>0,75–1,30</td></tr>
      <tr><td>Aktif metabolitler</td><td>Var</td><td>Var</td><td>Yok</td></tr>
      <tr><td>Klirens (mL/kg/dk)</td><td>0,2–0,5</td><td>6–10</td><td>1,0–1,5</td></tr>
    </tbody>
  </table></div>
  <ul class="ozet" style="margin-top:14px">
    <li><b>Diazepam.</b> Yüksek lipit çözünürlüğü oral emilimi ve hızlı santral etkiyi kolaylaştırır; albümine ~%95 bağlanır, enzim indüklemez. [[K3 s. 281]] Karaciğerde oksidasyonla aktif metabolitlere (desmetildiazepam, oksazepam, temazepam) dönüşüp glukuronid olarak idrarla atılır; infüzyonda bağlama duyarlı yarılanma ömrü çok büyür. [[K3 s. 281]] Bir miktar kardiyorespiratuvar depresyon yapabilir; karaciğer yetmezliği ve simetidin etkiyi uzatır, opioid/alkol solunum depresyonunu belirginleştirir, diğer BDZ’ler gibi MAC’ı azaltır. [[K3 s. 281]]</li>
    <li><b>Lorazepam.</b> Oral ve İM iyi emilir, proteine ~%95 bağlanır, glukuronidasyonla inaktif metabolitler oluşturup idrarla atılır; premedikasyonda anksiyolitik ve amneziktir. [[K3 s. 281]] Status epileptikusta birinci basamaktır: 1–12 yaşta İV, sublingual veya rektal 50–100 μg/kg (maks 4 mg), &gt;12 yaşta 4 mg. [[K3 s. 281]]</li>
    <li><b>Temazepam.</b> Gece sedatifi ve anksiyolitik premedikasyonda kullanılır, kendine özgü özelliği yoktur. [[K3 s. 282]] Bağırsaktan iyi emilir, proteine %75 bağlanır, Vd 0,8 L/kg ve t½ ~8 saattir; %80’i idrarla değişmeden atılırken karaciğerde glukuronidasyon olur ve çok azı oksazepama dönüşür, ertesi güne sarkan etki yapabilir. [[K3 s. 282]]</li>
    <li><b>Klordiazepoksid.</b> İlk klinik BDZ’dir; alkol yoksunluğunda anksiyolitik sedatif olarak ve kısa süreli anksiyetede günde 3×5 mg ile 4×25 mg arası bireysel titrasyonla kullanılır. [[K3 s. 282]] Oral biyoyararlanımı yüksektir, çeşitli aktif metabolitlere uzanan karmaşık bir yolu vardır, t½ 5–30 saattir ve yaşlılarda artabilir. [[K3 s. 282]]</li>
  </ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap midazolamın &lt;%5’inin oksazepama dönüştüğünü ve temazepamın %80’inin idrarla değişmeden atıldığını yazar; midazolamın küçük metaboliti 4-hidroksimidazolamdır, temazepam ise başlıca konjuge metabolit olarak idrarla atılır.</div>
</section>

<section class="wrap blk ders-sec" id="a18a-flumazenil">
  <h2>Flumazenil ve Z ilaçları</h2>
  <p class="intro">Flumazenil benzodiazepin etkilerini kompetitif olarak geri çevirirken, Z ilaçları BDZ reseptörüne etki eden yapıca farklı hipnotiklerdir. [[K3 s. 282–284]]</p>
  <div class="viz"><div class="viz-head"><h3>Flumazenil ile geri döndürmenin sınırları</h3></div><div data-viz="a18a_flumazenil"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Doz, etki başlangıcı ve t½ kitaptan. [[K3 s. 282–283]]</p></div>
  <div class="cols" style="margin-top:16px">
    <div class="card"><span class="tag clin">Flumazenil (imidazobenzodiazepin)</span><ul class="ozet" style="margin-top:8px">
      <li>Küçük işlem sonrası aşırı sedasyonu ve BDZ doz aşımını geri çevirir; çoklu ilaç doz aşımında nöbet tetikleyebileceğinden dikkat edilmelidir. [[K3 s. 282]]</li>
      <li>Kompetitif antagonisttir, bir miktar agonist aktivitesi vardır; nöbet tetiklemesi ters agonist aktiviteye bağlı olabilir. [[K3 s. 283]]</li>
      <li>Bulantı ve kusma yapabilir; özellikle epilepsilide anksiyete, ajitasyon ve nöbet tetikleyebilir. [[K3 s. 283]]</li>
      <li>Proteine %50 bağlanır; belirgin hepatik metabolizmayla inaktif bileşiklere dönüşüp idrarla atılır. [[K3 s. 283]]</li>
    </ul></div>
    <div class="card"><span class="tag basic">Z ilaçları (BDZ dışı hipnotikler)</span><ul class="ozet" style="margin-top:8px">
      <li>Zopiklon (t½ ~5 sa), zolpidem (2 sa) ve zaleplon (1 sa) BDZ reseptörü üzerinden etki eder ancak yapısal olarak BDZ değildir. [[K3 s. 284]]</li>
      <li>Bağımlılığı ve ertesi gün sedasyonunu aşmak için geliştirilmiş olsalar da BDZ’lerin tüm yan etkilerini taşırlar. [[K3 s. 284]]</li>
      <li>Yalnız belirli bir BDZ’ye özgül intolerans varsa geçiş önerilir; genel intoleransta Z ilaçlarına da aynı olasılıkla intolerans gelişir. [[K3 s. 284]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="a18a-deks">
  <h2>α₂-agonist: deksmedetomidin</h2>
  <p class="intro">Deksmedetomidin, medetomidinin aktif S-enantiomeri olup yüksek α₂ seçiciliğiyle fizyolojik uykuya yakın sedasyon oluşturur (R-formu inaktiftir). [[K3 s. 283]]</p>
  <div class="viz"><div class="viz-head"><h3>Deksmedetomidinin bifazik dolaşım ve solunum profili</h3></div><div data-viz="a18a_deks"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel etki zaman çizelgesi. [[K3 s. 283–284]]</p></div>
  <ul class="ozet">
    <li><b>Sunum ve kullanım.</b> 100 μg/mL renksiz flakon tipik 4–8 μg/mL’ye seyreltilir. YBÜ’de (genellikle ventile) hastalarda hafif–orta sedasyon (RASS), prosedürel sedasyon (pediyatrik dahil) ve dengeli genel anestezide kullanılır. [[K3 s. 283]]</li>
    <li><b>Doz.</b> YBÜ başlangıç 0,7 μg/kg/saat (aralık 0,2–1,4 μg/kg/saat). Anestezide 10 dk boyunca 1 μg/kg/saat yükleme ve 0,2–0,6 μg/kg/saat idame; tek ajan genel anestezide seyrek 5–10 μg/kg/saat tanımlanmıştır. [[K3 s. 283]]</li>
    <li><b>MSS etkileri.</b> α₂:α₁ oranı 1600:1’dir (klonidinden 8 kat seçici). Sedasyon ve anksiyoliz; sedasyon EEG ile desteklendiği üzere fizyolojik uykuya benzer, bazı protokollere göre daha az deliryum ve omurilik arka boynuzundaki substantia gelatinosa’da nosisepsiyonda rol alan transmiterlerin salınımını azaltarak analjezi sağlar. [[K3 s. 283]]</li>
    <li><b>KVS ve solunum.</b> Başta vasküler α₂B ile hipertansiyon, ardından santral NA azalmasıyla hipotansiyon ve bradikardi gelişir; bu profil yükleme aşamasında daha sıktır, tek ajanla nadiren asistoli bildirilmiştir, ileti kusurunda son derece dikkatli olunmalıdır. [[K3 s. 284]] Solunum bozulmuyor görünür ve hava yolu açık kalır; dekonjestan ve antisiyalagog etkileri fiberoptik entübasyonda avantaj sağlayabilir. [[K3 s. 284]]</li>
    <li><b>Kinetik.</b> Oral emilim öngörülemez (&lt;%20), bukkal &gt;%75’tir ve başlangıç hipertansiyonunu önler. Proteine %94 bağlanır, beyne kolay geçer; Faz I (hidroksilasyon) ve Faz II (glukuronidasyon, metilasyon) ile inaktif metabolitler idrarla atılır, yalnız karaciğer bozukluğunda doz azaltılır. Dağılım t½ 6 dk, eliminasyon t½ ~2 sa, klirens ~40 L/saat ve Vd 118 L’dir (hipoalbüminemide artar). [[K3 s. 284]]</li>
  </ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap anestezi yükleme dozunu 10 dakika boyunca 1 μg/kg/saat olarak yazar; standart erişkin yükleme dozu 10 dakikada verilen toplam 1 μg/kg’dır.</div>
</section>

<section class="wrap blk ders-sec" id="a18a-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin, ardından gerekçenizi açıklamayla karşılaştırın.</p>
  <div class="viz"><div data-viz="mtf" data-q="far18a-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far18a-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far18a-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a18a-p2">
  <h2>Part II · SOE 2</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Yoğun bakımda sedasyon amacıyla midazolam veya deksmedetomidin infüzyonu planlanıyor. İki ilacın etki mekanizmasını, farmakokinetik özelliklerini ve aşırı sedasyon geliştiğinde midazolamın nasıl geri döndürüleceğini açıklayın.</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Midazolam GABAA reseptörünün α alt birimine bağlanıp Cl⁻ iletkenliğini güçlendirir; deksmedetomidin α₂ seçici (1600:1) olup locus coeruleus’ta NA salınımını inhibe eder. [[K3 s. 279]] [[K3 s. 283]]</li>
    <li>Midazolam pH 3,5’te açık halka ve suda çözünür (ağrısız), pH &gt;4’te kapalı halka ve lipitte çözünürdür (pKa 6,5; %89 noniyonize). [[K3 s. 280]]</li>
    <li>Midazolamın klirensi 6–10 mL/kg/dk ile diazepamdan yüksektir; aktif 1-α hidroksimidazolam ve konjugasyonla böbrekten atılır, alfentanille CYP3A3/4 üzerinden etkileşebilir. [[K3 s. 280–281]]</li>
    <li>Deksmedetomidin fizyolojik uykuya yakın sedasyon ve analjezi sağlar; bifazik KB yanıtı verir, solunumu bozmuyor görünür, t½ ~2 saattir ve yalnız karaciğer bozukluğunda doz azaltılır. [[K3 s. 283–284]]</li>
    <li>Flumazenil İV 100 μg artışlarla 2 dk içinde etki eder; kısa t½ (~1 sa) nedeniyle ek doz ya da infüzyon gerekebilir; çoklu ilaç aşımı ya da epilepside nöbet tetikleyebilir. [[K3 s. 282–283]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Midazolamın pH 3,5 (açık, iyonize) ve pH 7,4 (kapalı, lipofilik) denge şemasını ve yanında deksmedetomidin yükleme/idame kan basıncı–kalp hızı eğrisini, flumazenil için de 100 μg artışlarla titrasyonu çizin. [[K3 s. 280]] [[K3 s. 282]] [[K3 s. 284]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Diazepam infüzyonunda yarılanma ömrü neden uzar? Status epileptikusta lorazepam dozu nedir? Z ilaçlarına ne zaman geçilir? [[K3 s. 281–282]] [[K3 s. 284]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a18a-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>GABAA Cl⁻ iletkenliğini, metabotropik GABAB K⁺ iletkenliğini artırır; baklofen yalnız GABAB üzerinden etki eder. [[K3 s. 279]]</li>
    <li>Midazolam pH 3,5’te suda çözünür (ağrısız), fizyolojik pH’da %89 iyonize değil ve lipofilik olup klirensi 6–10 mL/kg/dk’dır. [[K3 s. 280–281]]</li>
    <li>Diazepam en düşük klirense (0,2–0,5 mL/kg/dk) ve aktif metabolitlere sahiptir; lorazepam inaktif metabolit oluşturur. [[K3 s. 281]]</li>
    <li>Flumazenil kompetitif antagonisttir (t½ ~1 sa); ek doz/infüzyon gerekebilir, epilepsi/çoklu ilaç aşımında nöbet riski vardır. [[K3 s. 282–283]]</li>
    <li>Deksmedetomidin (α₂:α₁ 1600:1) bifazik KB etkisi gösterir, solunumu koruyor görünür ve karaciğerde inaktif metabolitlere dönüşür. [[K3 s. 283–284]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="18a"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/17">← 17 · Antihipertansifler</a><a href="#/dersler/farmakoloji/18b">Sonraki: 18b · Antidepresanlar →</a></nav>
</section>`,
};
