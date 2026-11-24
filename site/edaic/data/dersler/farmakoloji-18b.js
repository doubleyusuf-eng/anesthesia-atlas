/* Farmakoloji · Bölüm 18 · Ders 18b: Antidepresanlar (K3 s. 284–289, Türkçe çalışma çevirisi). */
VERI.sorular = VERI.sorular || {};
VERI.sorular['far18b-1'] = {
  no: 1, kok: 'Trisiklik antidepresanlar (TCA) ve doz aşımı', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 285–286]]',
  onermeler: [
    { t: 'Trisiklik antidepresanlar noradrenalin ve serotoninin nöronal alımını (alım 1) kompetitif bloke eder.', d: true, n: 'Doğru. Sinapstaki transmiter konsantrasyonunu artırırlar; antidepresan etki 2 haftayı bulabilir. [[K3 s. 285]]' },
    { t: 'Antidepresan etki sinaptik transmiter artışıyla aynı gün içinde tam olarak ortaya çıkar.', d: false, n: 'Yanlış. Antidepresan etkinin ortaya çıkması 2 haftayı bulabilir. [[K3 s. 285]]' },
    { t: 'TCA doz aşımında QRS süresi 0,16 saniyeden uzunsa ventriküler aritmiler daha olasıdır.', d: true, n: 'Doğru. Nöbetler 0,1 sn üzeri QRS ile, ventriküler aritmiler ise 0,16 sn üzeri QRS ile ilişkilidir. [[K3 s. 285–286]]' },
    { t: 'TCA doz aşımında hipotansiyonu düzeltmek için genellikle intravasküler hacim artırımı yeterlidir.', d: true, n: 'Doğru. Aritmileri tetikleyebileceğinden mümkün olduğunda inotroplardan kaçınılmalıdır. [[K3 s. 286]]' },
    { t: 'TCA doz aşımının antikolinerjik bulgularını geri çevirmek için rutin antikolinesteraz uygulanmalıdır.', d: false, n: 'Yanlış. Nöbet, bradikardi ve kalp yetmezliğini tetikleyebileceğinden antikolinesteraz önerilmez. [[K3 s. 286]]' },
  ],
};
VERI.sorular['far18b-2'] = {
  no: 2, kok: 'SSRI’lar ve serotonerjik sendrom', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 286]]',
  onermeler: [
    { t: 'SSRI’lar standart antidepresanlardan daha yüksek antidepresan etkinliğe sahiptir.', d: false, n: 'Yanlış. Standart antidepresanlardan daha etkili değildirler, ancak daha az sedatif ve antikolinerjik etkilidirler. [[K3 s. 286]]' },
    { t: 'SSRI’lar trombositlerde 5-HT alımını inhibe ederek trombosit fonksiyonunu bozabilir.', d: true, n: 'Doğru. Bu durum diğer antitrombosit ajanların varlığında önem kazanabilir. [[K3 s. 286]]' },
    { t: 'Serotonerjik sendrom bradikardi ve derin hipotermi ile karakterizedir.', d: false, n: 'Yanlış. Hiperrefleksi, ajitasyon, klonus ve hipertermi ile karakterizedir. [[K3 s. 286]]' },
    { t: 'Fenilpiperidin opioidlerden özellikle petidin serotonerjik sendromu tetikleyebilir.', d: true, n: 'Doğru. Petidin zayıf serotonin geri alım inhibitörü özelliklerine sahiptir. [[K3 s. 286]]' },
    { t: 'Fluoksetin eşit derecede aktif iki izomerin 50:50 karışımıdır.', d: true, n: 'Doğru. Minimal sedasyona neden olan etkili bir antidepresandır. [[K3 s. 286]]' },
  ],
};
VERI.sorular['far18b-3'] = {
  no: 3, kok: 'MAOI’ler, mianserin ve lityum karbonat', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 287–288]]',
  onermeler: [
    { t: 'MAO-B izoenzimi tercihen serotonini (5-HT) ve katekolaminleri deamine eder.', d: false, n: 'Yanlış. 5-HT ve katekolaminleri tercihen MAO-A deamine eder; MAO-B tercihen tiramin ve feniletilamini deamine eder. [[K3 s. 287]]' },
    { t: 'Antibiyotik linezolid aynı zamanda bir MAOI olduğundan benzer uyarı ve kontrendikasyonlara sahiptir.', d: true, n: 'Doğru. MRSA ve VRE tedavisinde kullanılan linezolid bir MAOI’dir. [[K3 s. 287]]' },
    { t: 'Mianserin antidepresan etkisini presinaptik α₂-adrenoseptörleri bloke ederek gösterir.', d: true, n: 'Doğru. Negatif geri bildirimi azaltarak sinaptik nörotransmiteri artırır; geri alımı bloke etmez. [[K3 s. 288]]' },
    { t: 'Lityum karbonat nöromüsküler blokajın süresini belirgin şekilde kısaltır.', d: false, n: 'Yanlış. Lityum nöromüsküler blokajı uzatır ve beyin sapından NA ile dopamin salınımını bloke ederek anestezik gereksinimini azaltabilir. [[K3 s. 288]]' },
    { t: 'Lityum antidiüretik hormonun etkisini güçlendirerek idrar konsantrasyonunu artırır.', d: false, n: 'Yanlış. Birçok hastada antidiüretik hormon antagonizmasına bağlı poliüri ve polidipsi gelişir. [[K3 s. 288]]' },
  ],
};

const A18B_NAV = [
  ['tca', 'TCA'], ['dozasimi', 'TCA Doz Aşımı'], ['ssri', 'SSRI'],
  ['maoi', 'MAOI & Anestezi'], ['atipik', 'Mianserin & Lityum'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/18b'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 4 · Bölüm 18 · Ders 18b', baslik: 'Antidepresanlar',
  lede: 'Depresyon tedavisinde trisiklikler (TCA), SSRI’lar, MAOI’ler ve atipik ajanlar kullanılır; bu ilaçlar güçlü ilaç etkileşimleri ve doz aşımı toksisiteleri nedeniyle anestezi açısından önemlidir. [[K3 s. 284–288]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A18B_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a18b-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a18b-tca">
  <h2>Trisiklik antidepresanlar (TCA)</h2>
  <p class="intro">Bölüm 18’in santral inhibisyon girişi <a href="#/dersler/farmakoloji/18a">18a · Hipnotikler</a> dersindedir; burada amitriptilin, nortriptilin, imipramin ve dotiepin gibi TCA’lar başlangıç grubudur. [[K3 s. 284–285]]</p>
  <div class="viz"><div class="viz-head"><h3>Antidepresan gruplarının sinaptik etki yerleri</h3></div><div data-viz="a18b_sinaps"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel monoaminerjik sinaps. [[K3 s. 285–288]]</p></div>
  <ul class="ozet">
    <li><b>Yapı ve kullanım.</b> Başlangıçta trisiklik halkaya dayansa da birçok ikinci kuşak ilaç farklı halka sayılarına sahiptir. Depresif hastalık, noktürnal enürezis ve kronik ağrıda adjuvan olarak kullanılırlar. [[K3 s. 285]]</li>
    <li><b>Mekanizma.</b> NA ve 5-HT nöronal alımını (alım 1) kompetitif bloke ederler, ancak antidepresan etki 2 haftayı bulabilir. Muskarinik, histaminerjik ve α-adrenoseptör blokajı ile özgül olmayan sedasyon yaparlar. [[K3 s. 285]]</li>
    <li><b>Sistem etkileri.</b> MSS’de sedasyon ve epilepside zaman zaman nöbet; antikolinerjik olarak ağız kuruluğu, kabızlık, idrar retansiyonu ve bulanık görme; KVS’de özellikle yaşlılarda postüral hipotansiyon görülür. [[K3 s. 285]]</li>
    <li><b>Kinetik.</b> Yüksek lipit çözünürlüğüyle bağırsaktan iyi emilir, plazma proteinlerine yüksek oranda bağlanır ve yüksek dağılım hacmine sahiptirler. Karaciğer metabolizması hastalar arasında değişkendir ve sık aktif metabolit oluşturur (kitap örneği: imipraminin desipramin ve nortriptiline dönüşmesi). [[K3 s. 285]]</li>
  </ul>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>İlaç</th><th>Antikolinerjik</th><th>Sedasyon</th><th>Postüral hipotansiyon</th></tr></thead>
    <tbody>
      <tr><td><b>Amitriptilin (TCA)</b></td><td>++++</td><td>++++</td><td>++</td></tr>
      <tr><td><b>İmipramin (TCA)</b></td><td>++</td><td>++</td><td>+++</td></tr>
      <tr><td><b>Nortriptilin (TCA)</b></td><td>++</td><td>++</td><td>+</td></tr>
      <tr><td><b>Desipramin (TCA)</b></td><td>+</td><td>+</td><td>+</td></tr>
      <tr><td><b>Fluoksetin (SSRI)</b></td><td>+</td><td>Yok</td><td>+</td></tr>
    </tbody>
  </table></div>
  <div class="note plain"><b>Atlas notu.</b> Kitap imipraminin desipramin ve nortriptiline dönüştüğünü yazar; desipramin imipraminin, nortriptilin ise amitriptilinin aktif metabolitidir.</div>
</section>

<section class="wrap blk ders-sec" id="a18b-dozasimi">
  <h2>Trisiklik doz aşımı ve yönetimi</h2>
  <p class="intro">Depresif hastalarda nadir olmayan TCA doz aşımı; kardiyovasküler, santral ve antikolinerjik bulguların karışımını içerir. [[K3 s. 285]]</p>
  <div class="viz"><div class="viz-head"><h3>QRS genişlemesiyle artan toksisite eşikleri</h3></div><div data-viz="a18b_qrs"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">0,1 sn ve 0,16 sn eşikleri kitaptan; EKG çizimi şematiktir. [[K3 s. 285–286]]</p></div>
  <div class="cols" style="margin-top:16px">
    <div class="card"><span class="tag clin">Kardiyovasküler ve santral bulgular</span><ul class="ozet" style="margin-top:8px">
      <li>Sinüs taşikardisi sıktır; doza bağlı QT uzaması, QRS genişlemesi ve sağ dal bloğu görülür. [[K3 s. 285–286]]</li>
      <li>QRS &gt;0,16 saniye olduğunda ventriküler aritmiler daha olasıdır. Kan basıncı yüksek veya düşük olabilir; ciddi aşım dirençli hipotansiyon ve nabızsız elektriksel aktiviteyle sonuçlanabilir. [[K3 s. 285–286]]</li>
      <li>Eksitasyon, nöbetler (QRS &gt;0,1 sn ile ilişkili) ve ardından depresyon görülür; midriyazis ve hipertermi karakteristiktir. [[K3 s. 286]]</li>
    </ul></div>
    <div class="card"><span class="tag basic">Tedavi ilkeleri</span><ul class="ozet" style="margin-top:8px">
      <li>Gastrik lavaj ardından aktif kömür, destekleyici bakım ve özgül tedavi uygulanır. [[K3 s. 286]]</li>
      <li>Kitaba göre nöbetler BDZ veya fenitoinle, ventriküler aritmiler fenitoin veya lidokainle tedavi edilebilir. [[K3 s. 286]]</li>
      <li>Aritmileri tetikleyebileceğinden mümkünse inotroplardan kaçınılır; hipotansiyonu düzeltmek için genellikle intravasküler hacmin artırılması yeterlidir. [[K3 s. 286]]</li>
      <li>Antikolinerjik etkiler antikolinesterazla geri çevrilebilir, ancak nöbet, bradikardi ve kalp yetmezliğini tetikleyebileceğinden önerilmez. [[K3 s. 286]]</li>
    </ul></div>
  </div>
  <div class="note plain"><b>Atlas notu.</b> Kitap TCA doz aşımında nöbet ve ventriküler aritmi tedavisi için fenitoini sayar; ek sodyum kanalı blokajı riski nedeniyle güncel yaklaşımda fenitoinden kaçınılır, geniş QRS ve ventriküler aritmide sodyum bikarbonat temel tedavidir.</div>
</section>

<section class="wrap blk ders-sec" id="a18b-ssri">
  <h2>SSRI’lar ve serotonerjik sendrom</h2>
  <p class="intro">Selektif serotonin geri alım inhibitörleri (fluoksetin, paroksetin, sertralin; kitap başlığı altında venlafaksin) 5-HT’nin nöronal geri alımını seçici olarak inhibe eder. [[K3 s. 286]]</p>
  <div class="viz"><div class="viz-head"><h3>Serotonerjik sendroma giden basamaklar</h3></div><div data-viz="a18b_serotonin"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Etkileşim mekanizması ve klinik bulgular kitaptan. [[K3 s. 286–288]]</p></div>
  <ul class="ozet">
    <li><b>Klinik profil.</b> Standart antidepresanlardan daha etkili değildirler, ancak daha az sedatif, daha az antikolinerjik ve doz aşımında daha az kardiyotoksik görünürler. GİS yan etkileri (bulantı, kabızlık) görülür; trombosit 5-HT alımını inhibe ederek trombosit fonksiyonunu bozduklarına ilişkin bazı kanıtlar vardır (diğer antitrombositlerle önemli olabilir). [[K3 s. 286]]</li>
    <li><b>Serotonerjik sendrom.</b> Potansiyel olarak ölümcül bu tablo hiperrefleksi, ajitasyon, klonus ve hipertermiyle karakterizedir. En sık neden MAOI + SSRI kombinasyonudur; fenilpiperidin opioidler (özellikle petidin) zayıf 5-HT geri alım inhibitörü olup sendromu tetikleyebilir. [[K3 s. 286]]</li>
    <li><b>Fluoksetin.</b> Minimal sedasyon yapar ve eşit aktif iki izomerin 50:50 karışımıdır. İyi emilir, karaciğerde CYP450 enzimleri ve kontrolsüz yükselmeyi önleyen doyurulamayan enzimlerle metabolize olur; birikim olabileceğinden kitap böbrek yetmezliğinde doz azaltımını belirtir. [[K3 s. 286]] Yan etkileri bulantı, kusma, baş ağrısı, uykusuzluk, libido azalması ve %1’e varan mani/hipomanidir. [[K3 s. 286]]</li>
    <li><b>Venlafaksin.</b> Muskarinik, histaminerjik veya α-adrenoseptörlerde çok az etki gösterirken hem NA hem 5-HT (daha az ölçüde dopamin) geri alımını bloke ediyor görünmektedir. [[K3 s. 286]]</li>
  </ul>
  <div class="note plain"><b>Atlas notu.</b> Kitap başlığı venlafaksini SSRI grubunda sıralar; hem serotonin hem noradrenalin geri alımını bloke ettiği için SNRI olarak sınıflandırılır.</div>
</section>

<section class="wrap blk ders-sec" id="a18b-maoi">
  <h2>Monoamin oksidaz inhibitörleri ve genel anestezi</h2>
  <p class="intro">MAOI’ler dirençli depresyon, obsesif kompulsif bozukluk, kronik ağrı sendromları ve migrende oral kullanılır; ciddi yan etki ve hepatotoksisite riski nedeniyle birinci basamak değildirler. [[K3 s. 287]]</p>
  <div class="viz"><div class="viz-head"><h3>MAOI altında sempatomimetik ve opioid seçimi</h3></div><div data-viz="a18b_maoi"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Metabolik yollar ve kontrendikasyonlar kitaptan. [[K3 s. 287–288]]</p></div>
  <div class="cols" style="margin-top:16px">
    <div class="card"><span class="tag clin">Nonselektif geri dönüşümsüz ve RIMA</span><ul class="ozet" style="margin-top:8px">
      <li>MAO-A tercihen 5-HT ve katekolaminleri, MAO-B tiramin ve feniletilamini deamine eder. [[K3 s. 287]]</li>
      <li>1. kuşak (MAO-A ve -B, geri dönüşümsüz): hidrazinler (fenelzin, izokarboksazid; hepatotoksisite) ve hidrazin olmayan stimülan etkili tranilsipromin (potansiyel en tehlikeli). [[K3 s. 287]]</li>
      <li>Etkiler: sedasyon, bulanık görme, ortostatik hipotansiyon, hepatik enzim inhibisyonu; tiraminden zengin besinler (peynir, salamura ringa balığı, tavuk karaciğeri, Bovril, çikolata) ve dolaylı sempatomimetiklerle hipertansif kriz. Petidinle serebral irritabilite, hiperpireksi, KVS instabilite; fentanille de etkileşim bildirilmiştir. [[K3 s. 287]]</li>
      <li>RIMA (moklobemid): yalnız MAO-A’yı selektif geri dönüşümlü inhibe eder. Tiramin etkisi daha az güçlenir ve genelde aynı diyet kısıtlaması gerekmez; ancak duyarlı hastalar nedeniyle tiramin ve dolaylı sempatomimetiklerden kaçınma önerilir. Oral tam emilim, ilk geçişle %60–80 biyoyararlanım; CYP450 (beyazlarda %2, Asya kökenlilerde %15’e varan yavaş metabolize edici); metabolitler idrarla. [[K3 s. 287]]</li>
      <li>Antibiyotik linezolid (MRSA, VRE) aynı zamanda bir MAOI olup aynı uyarıları taşır. [[K3 s. 287]]</li>
    </ul></div>
    <div class="card"><span class="tag basic">Genel anestezi ve ilaç değişimi</span><ul class="ozet" style="margin-top:8px">
      <li>Acil cerrahide petidin ve dolaylı etkili sempatomimetik aminler (örn. efedrin) verilmemelidir; büyük ölçüde MAO’ya bağımlı olduklarından aşırı hipertansiyon ve aritmi gelişebilir. [[K3 s. 288]]</li>
      <li>KVS destek gerekiyorsa doğrudan etkili ajanlar kullanılmalıdır (COMT ile de metabolize olurlar), ancak aşırı hipertansiyon riski nedeniyle son derece dikkatli olunmalıdır. [[K3 s. 288]]</li>
      <li>Elektif cerrahide MAOI’nin 14–21 gün önce kesilmesi yıkıcı depresyon nüksüne yol açabilir; yeni ajanlar etkileşim olasılığını azaltabilir. [[K3 s. 288]]</li>
      <li>Alternatif antidepresandan önce MAOI 2 hafta kesilmiş olmalı; TCA bitimiyle MAOI başlangıcı arasında da 2 hafta geçmelidir. [[K3 s. 288]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="a18b-atipik">
  <h2>Atipik ajanlar: mianserin ve lityum karbonat</h2>
  <p class="intro">Tetrasiklik mianserin presinaptik α₂ blokajıyla etki ederken, dar terapötik indeksli lityum karbonat nörotransmiter salınımını azaltır ve perioperatif riskler taşır. [[K3 s. 288]]</p>
  <div class="viz"><div class="viz-head"><h3>Lityumun dar terapötik aralığı ve toksisitesi</h3></div><div data-viz="a18b_lityum"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">0,5–1,5 mmol/L eşikleri kitaptan; bant genişlikleri şematiktir. [[K3 s. 288]]</p></div>
  <div class="cols" style="margin-top:16px">
    <div class="card"><span class="tag basic">Mianserin</span><ul class="ozet" style="margin-top:8px">
      <li>Özellikle sedasyon gereken depresif hastalıkta kullanılan tetrasiklik bileşiktir. [[K3 s. 288]]</li>
      <li>Nöronal geri alımı bloke etmez; presinaptik α₂-adrenoseptörleri bloke ederek negatif geri bildirimi azaltır ve sinaptik nörotransmiteri artırır. [[K3 s. 288]]</li>
      <li>Muskarinik ve periferik α blokajı çok düşük olduğundan antimuskarinik etki ve postüral hipotansiyon azdır. [[K3 s. 288]]</li>
      <li>Önemli yan etkileri yaşlılarda daha sık görülen agranülositoz ve aplastik anemidir. [[K3 s. 288]]</li>
    </ul></div>
    <div class="card"><span class="tag clin">Lityum karbonat</span><ul class="ozet" style="margin-top:8px">
      <li>Bipolar depresyon, mani ve tekrarlayan afektif bozukluklarda kullanılır; plazma düzeyi 0,5–1,5 mmol/L tutulmalıdır. Uyarılabilir hücrelerde Na⁺’u taklit edip nörotransmiter salınımını azaltır. [[K3 s. 288]]</li>
      <li>Kas tonusunu artırabilir, epilepside nöbet eşiğini düşürebilir; ADH antagonizmasına bağlı poliüri ve polidipsi, ayrıca serum Na⁺, Mg²⁺ ve Ca²⁺ artışı görülebilir. [[K3 s. 288]]</li>
      <li>Nöromüsküler blokajı uzatır ve beyin sapından NA ile dopamin salınımını bloke ederek anestezik gereksinimini azaltabilir; tiroid büyümesi, hipotiroidizm, kilo artışı ve tremor yapabilir. [[K3 s. 288]]</li>
      <li>Terapötik düzey üstünde kusma, karın ağrısı, ataksi, konvülziyonlar, aritmiler ve ölüm gelişir. [[K3 s. 288]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="a18b-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin, ardından gerekçenizi açıklamayla karşılaştırın.</p>
  <div class="viz"><div data-viz="mtf" data-q="far18b-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far18b-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far18b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a18b-p2">
  <h2>Part II · SOE 2</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Nonselektif bir MAOI kullanan hasta acil apendektomi için geliyor. Bu ilacın etki mekanizmasını, anestezik açıdan kritik ilaç etkileşimlerini ve acil ile elektif olgudaki yaklaşım farkını anlatın.</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>MAOI’ler presinaptik MAO’yu inhibe ederek amin nörotransmiterlerin deaminasyonunu azaltır (MAO-A: 5-HT, katekolaminler; MAO-B: tiramin, feniletilamin). [[K3 s. 287]]</li>
    <li>Petidin verilmez: zayıf 5-HT geri alım inhibisyonu nedeniyle serotonerjik sendrom veya serebral irritabilite, hiperpireksi ve KVS instabilite gelişebilir (fentanille de etkileşim bildirilmiştir). [[K3 s. 286–288]]</li>
    <li>Efedrin gibi dolaylı sempatomimetikler MAO’ya bağımlı olduğundan kontrendikedir (aşırı hipertansiyon, aritmi); KVS destek için COMT ile de yıkılan doğrudan etkili ajanlar çok dikkatle kullanılır. [[K3 s. 288]]</li>
    <li>Acil olguda kesim beklenemez; elektif olguda cerrahiden 14–21 gün önce kesim yıkıcı depresyon nüksüne yol açabileceği için risk dengesi değerlendirilir. [[K3 s. 288]]</li>
    <li>Linezolidin de MAOI özellik taşıdığı ve MAOI ile başka antidepresan ya da TCA geçişlerinde 2 hafta bekleme gerektiği unutulmamalıdır. [[K3 s. 287–288]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Monoaminerjik sinapsta TCA (alım 1), SSRI (5-HT geri alımı), MAOI (presinaptik yıkım) ve mianserin (presinaptik α₂) etki yerlerini ve yanında dolaylı vs doğrudan sempatomimetik yıkım yollarını çizin. [[K3 s. 285–288]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> TCA doz aşımında 0,1 sn ve 0,16 sn QRS eşikleri neyi öngörür? Lityumun anestezi üzerindeki iki temel etkisi nedir? [[K3 s. 285–286]] [[K3 s. 288]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a18b-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>TCA’lar NA/5-HT alım 1 blokajı yanında muskarinik, histaminerjik ve α blokajı yapar; doz aşımında QRS &gt;0,1 sn nöbetle, &gt;0,16 sn ventriküler aritmiyle ilişkilidir. [[K3 s. 285–286]]</li>
    <li>SSRI’lar daha az sedatif ve antikolinerjiktir ancak trombosit fonksiyonunu bozabilir ve MAOI veya petidinle serotonerjik sendroma yol açabilir. [[K3 s. 286]]</li>
    <li>MAOI alan hastada petidin ve dolaylı sempatomimetikler kontrendikedir; doğrudan etkili ajanlar dikkatle kullanılır. [[K3 s. 288]]</li>
    <li>Mianserin presinaptik α₂ blokajıyla etki eder, az antimuskarinik etki yapar ancak yaşlılarda agranülositoz/aplastik anemi riski taşır. [[K3 s. 288]]</li>
    <li>Lityum (0,5–1,5 mmol/L) nöromüsküler blokajı uzatır, anestezik gereksinimini azaltabilir ve ADH antagonizmasıyla poliüri yapar. [[K3 s. 288]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="18b"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/18a">← 18a · Hipnotikler ve anksiyolitikler</a><a href="#/dersler/farmakoloji/18c">Sonraki: 18c · Antikonvülzanlar →</a></nav>
</section>`,
};
