/* Fizyoloji Bölüm 15 · Ventilasyon–perfüzyon ilişkileri (K1 İngilizce baskı s. 68–70).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. Komşu bölümlere yapılan atıflar (Bölüm 12, 14, 20)
   o bölümlerin K1 sayfalarıyla işaretlidir. Bileşenlerin tarifi: docs/tasarim/fiz15.md */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz15-1'] = {
  no: 1, kok: 'Dik duran sağlıklı bir erişkinde yerçekiminin akciğer kan akımına ve ventilasyonuna etkisi için:', kagit: 'Paper A · fizyoloji, Bölüm 15', kaynak: '[[K1 s. 68]]',
  onermeler: [
    { t: "İntraplevral basınç akciğer tabanında apekstekinden daha negatiftir.", d: false, n: "Yanlış. Akciğer parankiminin ağırlığı nedeniyle intraplevral basınç apekste daha negatiftir; Bölüm 20'deki tipik değerler FRC'de apekste yaklaşık −10, tabanda −3 cmH₂O'dur. [[K1 s. 68, 86]]" },
    { t: "Apeks ile taban arasındaki hidrostatik basınç farkı, ortalama pulmoner arter basıncından büyüktür.", d: true, n: "Doğru. 30 cm'lik kan sütunu yaklaşık 30 cmH₂O, yani 22 mmHg fark yaratır; MPAP ise tipik olarak yalnızca 15 mmHg'dır. Pulmoner dolaşım düşük basınçlı olduğu için bu fark kan akımının dağılımında belirleyicidir. [[K1 s. 68]]" },
    { t: "Sırtüstü yatan hastada akciğerin arka bölümü ön bölümünden daha çok perfüze olur.", d: true, n: "Doğru. Sırtüstü yatışta apeks–taban arasındaki dikey fark ortadan kalkar; bu kez ön akciğer arka akciğerden yukarıdadır ve aynı hidrostatik nedenle arka bölüm daha çok kan alır. [[K1 s. 68]]" },
    { t: "Egzersizde kalp debisi arttıkça kan akımının apeks ile taban arasındaki farkı daha belirgin hâle gelir.", d: false, n: "Yanlış. Kalp debisi artınca MPAP de yükselir; hidrostatik basınç farkı görece önemsizleşir ve kan akciğerin her yerine daha eşit dağılır. [[K1 s. 68]]" },
    { t: "FRC'de bazal alveoller apikal alveollerden daha kompliyandır.", d: true, n: "Doğru. Bazal alveoller parankimin ağırlığıyla daha az gerilmiştir ve basınç–hacim eğrisinin dik bölümündedir; birim basınç değişikliği onlarda daha büyük hacim artışı yapar. Apikal alveoller FRC'de neredeyse tümüyle şişmiştir. [[K1 s. 68]]" },
  ],
};
VERI.sorular['fiz15-2'] = {
  no: 2, kok: 'Ventilasyon–perfüzyon (V̇/Q̇) oranı için:', kagit: 'Paper A · fizyoloji, Bölüm 15', kaynak: '[[K1 s. 68–69]]',
  onermeler: [
    { t: "Ortalama V̇/Q̇ oranı, dakika ventilasyonunun (V̇E) kalp debisine bölünmesiyle bulunur.", d: false, n: "Yanlış. Oranda alveoler ventilasyon kullanılır: V̇A ≈ 4 L/dk, Q̇ ≈ 5 L/dk (kalp debisi), oran 0,8. V̇E yaklaşık 5 L/dk'dır ama bunun yaklaşık beşte biri ölü boşluk ventilasyonudur ve gaz değişimine katılmaz. [[K1 s. 68]]" },
    { t: "Dik duruşta akciğer tabanlarında V̇/Q̇ oranı yaklaşık 0,6'dır.", d: true, n: "Doğru. Tabanda perfüzyon ventilasyondan fazladır; alveollerden daha çok O₂ çekilir ve PAO₂ düşüktür. Apekste ise oran 3'ün üzerindedir. [[K1 s. 69]]" },
    { t: "Dik duruşta apikal alveollerin PACO₂'si bazal alveollerinkinden yüksektir.", d: false, n: "Yanlış. Apekste ventilasyon perfüzyona göre orantısal olarak fazladır: PAO₂ yüksek, PACO₂ düşüktür. [[K1 s. 69]]" },
    { t: "Apeksten çıkan kan tam oksijenlenmiştir, ancak apekste gaz değişimi azdır.", d: true, n: "Doğru. V̇/Q̇ > 3 olduğu için apikal kapillerlerden çıkan kan tam oksijenlenmiştir; ama apikal alveollerin yanından az kan geçtiğinden toplam gaz değişimine katkıları küçüktür. [[K1 s. 69]]" },
    { t: "Akciğer perfüzyonunun apeks–taban eğimi, ventilasyonunkinden daha düzdür.", d: false, n: "Yanlış. Yerçekimi perfüzyonu ventilasyondan daha çok etkiler; perfüzyon doğrusunun eğimi daha diktir. Bu yüzden V̇/Q̇ oranı tabandan tepeye doğru artar. [[K1 s. 69]]" },
  ],
};
VERI.sorular['fiz15-3'] = {
  no: 3, kok: 'V̇/Q̇ uyumsuzluğunun nedenleri, sonuçları ve düzeltilmesi için:', kagit: 'Paper A · fizyoloji, Bölüm 15', kaynak: '[[K1 s. 69–70]]',
  onermeler: [
    { t: "Perikard tamponadı yüksek V̇/Q̇ oranına yol açabilir.", d: true, n: "Doğru. Tamponad, hipovolemi ve sağ ventrikül enfarktüsü sağ ventrikül atım hacmini azaltır; perfüzyon ventilasyona göre azalır ve V̇/Q̇ yükselir. Bu grubun öbür örneği pulmoner embolidir. [[K1 s. 69]]" },
    { t: "Pulmoner embolinin distalindeki alveollerde PACO₂ yükselir.", d: false, n: "Yanlış. Tıkanmanın distalinde ventilasyon sürer ama perfüzyon durur: bu alveollere CO₂ getiren kan yoktur. PAO₂ yükselir, PACO₂ düşer; artan, alveoler ölü boşluktur. [[K1 s. 70]]" },
    { t: "PE'li hastadaki düşük PaCO₂, J reseptörlerinin uyarılmasıyla artan dakika ventilasyonuyla açıklanır.", d: true, n: "Doğru. Alveol duvarındaki J reseptörleri emboliyle uyarılır; nefes darlığı hissi doğar ve V̇E artar. Kitaba göre PE'de görülen düşük PaCO₂'nin açıklaması budur. [[K1 s. 70]]" },
    { t: "Hipoksik pulmoner vazokonstriksiyon kanı iyi ventile olan bölgelerden kötü ventile olan bölgelere yönlendirir.", d: false, n: "Yanlış. Yön tersidir: kötü ventile olan bölgede PAO₂ düşüktür ve pulmoner arteriyoller daralır; kan iyi ventile olan bölgelere yönelir, oradaki kapillerler açılarak ve genişleyerek artan hacmi karşılar. İki bölgenin de V̇/Q̇ oranı normale yaklaşır. [[K1 s. 70]]" },
    { t: "Düşük V̇/Q̇ oranına bağlı hipoksemi oksijen tedavisine yanıt verir.", d: true, n: "Doğru. Kötü ventile olan ama perfüze olan alveollerde PAO₂ düşüktür; FiO₂ artınca PAO₂ ve alveol–kapiller O₂ gradyanı yükselir, kapillerden çıkan kan daha iyi oksijenlenir. Bölüm 14'e göre V̇/Q̇ sıfıra yaklaştıkça bu yanıt azalır ve tablo şanta benzer. [[K1 s. 69–70, 65]]" },
  ],
};

const D15_NAV = [
  ['d15-kan', 'Kan akımı'], ['d15-vent', 'Ventilasyon'], ['d15-oran', 'V̇/Q̇ oranı'], ['d15-neden', 'Nedenler'],
  ['d15-tedavi', 'Hipoksemi yönetimi'], ['d15-pe', 'Klinik: PE'], ['d15-esleme', 'Yerçekimi dışı'],
  ['d15-p1', 'Part I'], ['d15-p2', 'Part II'], ['d15-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/15'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 15', baslik: 'Ventilasyon–perfüzyon ilişkileri',
  lede: 'Gaz değişiminin verimi, her alveole gelen hava ile kanın birbirine ne kadar uyduğuna bağlıdır. Bu bölüm yerçekiminin kan akımını ve ventilasyonu nasıl dağıttığını, V̇/Q̇ oranının apeksten tabana nasıl değiştiğini, uyumsuzluğun nedenlerini ve tedavisini, pulmoner embolide hipokseminin mekanizmasını ve eşleşmeyi sağlayan yerçekimi dışı etkenleri işler. [[K1 s. 68–70]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D15_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d15-kan">
  <h2>Yerçekimi akciğer kan akımını nasıl etkiler?</h2>
  <p class="intro">Dik duran insanda akciğer kan akımı (perfüzyon, Q̇) tepeden tabana doğrusal artar; nedeni kan sütununun ağırlığıdır. [[K1 s. 68]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Kan sütunu: pozisyon ve egzersiz perfüzyonu nasıl dağıtır?</h3></div>
    <div data-viz="f15_kan"></div>
    <p class="viz-cap" aria-live="polite"><b>Dik duruş.</b> Apeks tabandan yaklaşık 30 cm yukarıdadır: aradaki kan sütunu 30 cmH₂O ≈ 22 mmHg'lık bir fark yaratır, ortalama pulmoner arter basıncı ise yalnızca 15 mmHg'dır. Perfüzyon tepeden tabana doğru artar. [[K1 s. 68]]</p>
    <p class="viz-foot">Şematik model; 30 cm, 22 mmHg ve 15 mmHg kitaptandır [[K1 s. 68]]. Renk yoğunluğu göreli perfüzyondur; egzersizde MPAP artışının büyüklüğü ve sırtüstü profilin daha düz oluşu kitapta verilmez.</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Şekildeki iki çubuğu karşılaştırın: hidrostatik fark, ortalama pulmoner arter basıncından (MPAP) büyüktür. Pulmoner dolaşım düşük basınçlı olduğu için bu fark belirleyicidir ve apekse az kan ulaşır; ayrıntısı Bölüm 16'da. [[K1 s. 68]]</p>
    <p>Dağılımı iki etken değiştirir. Egzersizde kalp debisi (CO) ile MPAP artar, sabit kalan hidrostatik fark görece küçülür ve kan daha eşit dağılır. Sırtüstü yatışta apeks–taban farkı kalkar, ön akciğer arkadakinden yukarıda kalır ve arka (posterior) akciğer, yan yatışta alttaki (dependan) akciğer daha çok kan alır. [[K1 s. 68]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap farkı yerçekiminin alveol hacmine etkisine de bağlar; asıl kaynak kanın kendi ağırlığıdır: damar içi basınç kalp düzeyinden her santimetre aşağıda yaklaşık 1 cmH₂O artar. Alveoler basıncın kapillerleri sıkıştırması ikinci etkendir ve West zonlarının konusudur (Bölüm 16).</div>
</section>

<section class="wrap blk ders-sec" id="d15-vent">
  <h2>Yerçekimi alveoler ventilasyonu nasıl etkiler?</h2>
  <p class="intro">Alveoler ventilasyon (V̇A) da tabana doğru artar, çünkü az gerilmiş bazal alveoller daha kompliyandır. [[K1 s. 68]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Aynı basınç düşüşü, farklı hacim artışı</h3></div>
    <div data-viz="f15_alveol"></div>
    <p class="viz-cap" aria-live="polite"><b>FRC.</b> İntraplevral basınç apekste yaklaşık −10, tabanda −3 cmH₂O'dur. Apikal alveol eğrinin düz üst bölümünde ve neredeyse tümüyle şişmiştir; bazal alveol eğrinin dik bölümünün başındadır. [[K1 s. 68, 86]]</p>
    <p class="viz-foot">Eğri ve hacim yüzdeleri şematiktir; FRC ve inspirasyon sonu intraplevral basınçları (−10/−3 ve −13/−6 cmH₂O) kitaptandır [[K1 s. 86–87]].</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Parankimin ağırlığı intraplevral basıncı apekste daha negatif yapar; bu yüzden fonksiyonel rezidüel kapasitede (FRC) apikal alveoller neredeyse tümüyle, bazal alveoller çok az şişmiştir. Bazal alveoller birim basınç başına daha çok genişler (kompliyans budur). İnspirasyonda intraplevral basınç her yerde aynı ölçüde düşer, ama tabanın hacmi daha çok artar; ayrıntısı Bölüm 20'de. [[K1 s. 68, 86–87]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d15-oran">
  <h2>Ventilasyon–perfüzyon oranı</h2>
  <p class="intro">V̇/Q̇, bir bölgenin alveoler ventilasyonunun perfüzyonuna oranıdır; sağlıklı akciğerde ortalama 0,8'dir ve tabandan tepeye doğru artar. [[K1 s. 68–69]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Apeksten tabana: V̇, Q̇ ve V̇/Q̇</h3></div>
    <div data-viz="f15_egim"></div>
    <p class="viz-cap" aria-live="polite">Bir akciğer dilimi seçin. Tabandan tepeye çıkıldıkça perfüzyon ventilasyondan daha hızlı azalır; bu yüzden V̇/Q̇ oranı tabanda yaklaşık 0,6 iken apekste 3'ün üzerine çıkar. [[K1 s. 68–69]]</p>
    <p class="viz-foot">Şematik model: taban ≈ 0,6, apeks &gt; 3 ve ortalama 0,8 kitaptandır [[K1 s. 68–69]]; aradaki dilimler doğrusal eğimle hesaplanmıştır (model ortalaması ≈ 0,81).</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>İdeal gaz değişiminde her alveolün ventilasyonu, yanından geçen kanı tam oksijenlemeye tam yeter: V̇/Q̇ = 1. Ventilasyon az kalırsa kan kısmen oksijenlenir, fazlaysa solunum eforu boşa gider. Bütün akciğerde V̇A ≈ 4 L/dk, Q̇ (kalp debisi) ≈ 5 L/dk olduğundan oran 0,8'dir. Dakika ventilasyonu (V̇E ≈ 5 L/dk) kullanılmaz, çünkü yaklaşık beşte biri ölü boşluk ventilasyonudur (Bölüm 11). [[K1 s. 68]]</p>
    <p>Yerçekimi ikisini de tabanda artırır, ama perfüzyonun eğimi daha diktir. Tabanda (≈ 0,6) alveollerden daha çok O₂ çekilir, PAO₂ düşer ve kanın bir bölümü tam oksijenlenmeden çıkabilir; kitap buna sağdan sola şant der, Bölüm 14'teki adı fonksiyonel şanttır. Apekste (&gt; 3) kan tam oksijenlenir, ama az kan geçtiği için gaz değişimi azdır: PAO₂ yüksek, PACO₂ düşük. [[K1 s. 69, 64]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d15-neden">
  <h2>Anormal V̇/Q̇ oranının nedenleri</h2>
  <p class="intro">Patolojik uyumsuzluk iki gruptur: ventilasyon bozulursa V̇/Q̇ düşer, perfüzyon bozulursa yükselir. [[K1 s. 69]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Nedenlerin haritası: ventilasyon mu, perfüzyon mu?</h3></div>
    <div data-viz="f15_neden"></div>
    <p class="viz-cap" aria-live="polite"><b>İki grup.</b> Ventilasyonu bozan durumlar V̇/Q̇'yu düşürür, perfüzyonu bozanlar yükseltir. Bir nedene dokunun: nerede etki ettiği ve V̇/Q̇ ölçeğini hangi yöne kaydırdığı görünür. [[K1 s. 69]]</p>
    <p class="viz-foot">Şematik harita, yerleşimler simgeseldir. Nedenler ve gruplar kitaptandır [[K1 s. 69]]; ölçeğin uçları Bölüm 14'ten [[K1 s. 64–65]].</p>
  </div>
  <div class="cols" style="margin-top:14px">
    <div class="card"><span class="tag crit">Düşük V̇/Q̇ · ventilasyon sorunu</span><h3>Hipokseminin en sık nedeni</h3><p>Üst hava yolu obstrüksiyonu, yabancı cisim aspirasyonu, pnömoni, pnömotoraks, atelektazi, akut solunum sıkıntısı sendromu (ARDS), amfizem, tek akciğer ventilasyonu, normal yaşlanma, obezitede artmış kapanma kapasitesi. [[K1 s. 69]]</p></div>
    <div class="card"><span class="tag clin">Yüksek V̇/Q̇ · perfüzyon sorunu</span><h3>Ventilasyon boşa gider</h3><p>Pulmoner emboli (PE); sağ ventrikül atım hacminin azalması: hipovolemi, sağ ventrikül enfarktüsü, perikard tamponadı. [[K1 s. 69]]</p></div>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Bölüm 14'e göre alveol tümüyle sıvıyla dolarsa (pnömoni, ödem) ya da proksimal hava yolu tıkanırsa (bronş tıkanması, tek akciğer ventilasyonu) V̇/Q̇ = 0 olur: akciğer içi şant. Perfüzyonu azalmış bölgede kan yine ventile alveollerden geçer; PaO₂ normal kalır, ama alveoler ölü boşluk ve solunum işi artar. [[K1 s. 64–65]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d15-tedavi">
  <h2>V̇/Q̇ uyumsuzluğuna bağlı hipoksemi nasıl yönetilir?</h2>
  <p class="intro">Hipokseminin en sık nedeni düşük V̇/Q̇'dur; tedavinin iki dayanağı O₂ vermek ve uyumsuzluğun nedenini geri çevirmektir. [[K1 s. 69–70]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Düşük V̇/Q̇ mı, şant mı? Oksijene yanıt</h3></div>
    <div data-viz="f15_o2"></div>
    <p class="viz-cap" aria-live="polite">Akciğerin bir bölgesinin V̇/Q̇ oranını ve FiO₂'yi değiştirin. Düşük V̇/Q̇'lu bölgede FiO₂ artışı PAO₂'yi ve kapiller sonu kanın oksijenlenmesini belirgin artırır; şantta (V̇/Q̇ = 0) bölgeden çıkan kan miks venöz kan olarak kalır. [[K1 s. 69–70, 65]]</p>
    <p class="viz-foot">Şematik iki bölmeli model: O₂ kütle dengesi; Hb 15 g/dL, miks venöz PO₂ 5,3 kPa ve içerik denklemi kitaptan [[K1 s. 65–66]]. Satürasyon Hill denklemiyle yaklaştırılır; CO₂ ve zamana bağlı değişimler gösterilmez.</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>O₂ işe yarar, çünkü kötü ventile olan ama normal perfüze olan alveolde PAO₂ düşüktür: FiO₂ artınca bu alveolün PAO₂'si ve alveol–kapiller O₂ gradyanı yükselir, kan daha iyi oksijenlenir. Nedeni geri çevirmeye örnek: pnömonide antibiyotik, atelektazide pozitif ekspirasyon sonu basıncı (PEEP). [[K1 s. 69–70]]</p>
    <p>V̇/Q̇ sıfıra yaklaştıkça uyumsuzluk, şant gibi O₂'ye kötü yanıt verir: şant kanı ventile alveole uğramaz, ek O₂ yalnız ventile alveollerden gelen kana biraz çözünmüş O₂ ekler. [[K1 s. 65]]</p>
  </div>
  <p class="small muted" style="margin-top:10px">Kitap burada hipoksemiyi PaO₂ &lt; 8 kPa diye tanımlar; Bölüm 14'te hipoksemi PaO₂'nin azalmasıdır, 8 kPa ise satürasyonun dik düşmeye başladığı değerdir. [[K1 s. 69, 63]]</p>
</section>

<section class="wrap blk ders-sec" id="d15-pe">
  <h2>Klinik önem: pulmoner embolide hipoksemi</h2>
  <p class="intro">PE'de tıkanmanın distalindeki yüksek V̇/Q̇ tek başına hipoksemi yapmaz; hipoksemiyi embolinin yarattığı düşük V̇/Q̇ bölgeleri açıklar. [[K1 s. 70]]</p>
  <div class="viz">
    <div class="viz-head"><h3>PE'de hipoksemi: adım adım</h3></div>
    <div data-viz="f15_pe"></div>
    <p class="viz-cap" aria-live="polite"><b>Başlangıç.</b> Üç akciğer bölgesinde ventilasyon ve perfüzyon uyumludur; PaO₂, PaCO₂ ve V̇E normaldir. Bir sonraki adımda emboli bir pulmoner arter dalını tıkayacak. [[K1 s. 70]]</p>
    <p class="viz-foot">Şematik çizim; mekanizma ve sıra kitaptandır [[K1 s. 70]]. Son adımdaki ek mekanizmalar (geri çevrilen akım, düşük miks venöz PO₂, açık foramen ovale) kitapta yoktur: Atlas notu.</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Pulmoner arter ağacının bir ya da daha çok büyük dalı pıhtı, gaz, yağ ya da amniyotik sıvıyla tıkanınca distalde ventilasyon sürer, perfüzyon durur: PAO₂ yükselir, PACO₂ düşer. Beklenen tablo, artmış alveoler ölü boşluk yüzünden artmış V̇E ve normal PaO₂'dir; oysa hastalar hipoksemiktir. Uzun süre tartışılan bu farkın en çok kabul gören açıklaması üç halkalıdır. [[K1 s. 70]]</p>
  </div>
  <div class="cols cols-3" style="margin-top:12px">
    <div class="card"><span class="tag clin">1 · Mekanik tıkanma</span><p class="small">Distalde kan akımı durur: yüksek V̇/Q̇, artmış alveoler ölü boşluk. [[K1 s. 70]]</p></div>
    <div class="card"><span class="tag basic">2 · J reseptörleri</span><p class="small">Alveol duvarında emboliyle uyarılır: nefes darlığı ve V̇E artışı; düşük PaCO₂'yi bu açıklar. [[K1 s. 70]]</p></div>
    <div class="card"><span class="tag crit">3 · Mediyatörler</span><p class="small">Küçük hava yollarında bronkokonstriksiyon, bariyer hasarıyla pulmoner ödem, sürfaktan azalmasıyla atelektazi: üçü de düşük V̇/Q̇ ve hipoksemi yapar. [[K1 s. 70]]</p></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d15-esleme">
  <h2>Yerçekimi V̇/Q̇ eşleşmesini belirleyen tek etken mi?</h2>
  <p class="intro">Hayır: yaklaşık 50 yıldır kullanılan yerçekimi modeli bazı bulguları açıklayamaz; eşleşmeye iki yerçekimi dışı etken katkıda bulunur. [[K1 s. 70]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Eşleşik dallanma ve HPV</h3></div>
    <div data-viz="f15_esleme"></div>
    <p class="viz-cap" aria-live="polite"><b>Eşleşik dallanma.</b> Hava yolu ve damar aynı noktalarda dallanır, çapları birbirine uyar. Dallanma asimetrik olduğu için uç birimlerin aldığı hava ve kan birbirinden farklıdır, ama her birimde ikisi benzer kalır. [[K1 s. 70]]</p>
    <p class="viz-foot">Şematik model; dallanma oranları ve HPV'nin derecesi örnek amaçlıdır, "eşleşmesiz dallanma" varsayımsaldır. Birlikte dallanma ve HPV'nin yönü kitaptandır [[K1 s. 70]].</p>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Modelin açıklayamadıkları: aynı dikey yükseklikteki bölgelerin V̇/Q̇'su farklı olabilir ve sıfır yerçekiminde bile dağılım homojen değildir. [[K1 s. 70]]</p>
    <p><b>Birlikte dallanma:</b> hava yolları ve damarlar embriyonik dönemde birlikte gelişir; çapları bu yüzden uyar ve alveol düzeyinde ventilasyonla perfüzyon benzer olur. <b>Hipoksik pulmoner vazokonstriksiyon (HPV):</b> az ventile bölgede düşük PAO₂ arteriyolleri daraltır ve perfüzyonu azaltır. Kan iyi ventile bölgelere yönelir; oradaki kapillerler açılarak (recruitment) ve genişleyerek bu hacmi karşılar, iki bölgenin oranı da normale yaklaşır (Bölüm 23). [[K1 s. 70]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d15-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok yönler ve sayılar üzerinden sorulur: perfüzyon ve ventilasyon hangi yönde artar, hangisinin eğimi daha diktir; 30 cm, 22 mmHg ve 15 mmHg; ortalama 0,8, taban 0,6, apeks 3'ün üzeri; apekste PAO₂ ve PACO₂ nasıldır; hangi durum düşük, hangisi yüksek V̇/Q̇ yapar; PE'de kan gazları neden beklenenden farklıdır; HPV kanı nereye yönlendirir. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz15-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz15-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz15-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d15-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Ventilasyon–perfüzyon oranı nedir? Dik duran bir insanda akciğerin tepesinden tabanına ventilasyon, perfüzyon ve V̇/Q̇ nasıl değişir? Çizerek anlatın. V̇/Q̇ uyumsuzluğuna bağlı hipoksemiyi nasıl tedavi edersiniz?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım ve sayılar.</b> Alveoler ventilasyonun perfüzyona oranı. İdeal eşleşme kavramsal olarak 1; bütün akciğerde V̇A ≈ 4 L/dk, Q̇ ≈ 5 L/dk (kalp debisi), ortalama 0,8. V̇E (≈ 5 L/dk) değil V̇A kullanılır; V̇E'nin yaklaşık beşte biri ölü boşluktur. [[K1 s. 68]]</li>
    <li><b>Perfüzyon.</b> Dik duruşta tepeden tabana doğrusal artar. Neden: 30 cm kan sütunu ≈ 30 cmH₂O ≈ 22 mmHg, düşük basınçlı dolaşımda MPAP yalnızca 15 mmHg. Egzersiz (CO ve MPAP artar) dağılımı eşitler; sırtüstü yatışta arka, yan yatışta alttaki akciğer daha çok kan alır. [[K1 s. 68]]</li>
    <li><b>Ventilasyon.</b> Parankim ağırlığı intraplevral basıncı apekste daha negatif yapar (FRC'de ≈ −10, tabanda −3 cmH₂O). Apikal alveoller neredeyse tümüyle şişmiş, bazal alveoller az şişmiş ve daha kompliyandır; inspirasyondaki 3 cmH₂O'luk düşüş tabanda daha büyük hacim artışı yapar. [[K1 s. 68, 86–87]]</li>
    <li><b>Oran.</b> Perfüzyonun eğimi daha diktir, bu yüzden V̇/Q̇ yukarı doğru artar. Taban ≈ 0,6: PAO₂ düşük, kanın bir bölümü tam oksijenlenmeden çıkar (fonksiyonel şant). Apeks &gt; 3: kan tam oksijenlenir ama az kan geçer; PAO₂ yüksek, PACO₂ düşük. [[K1 s. 69, 64]]</li>
    <li><b>Nedenler.</b> Yelpazenin uçları: şant (V̇/Q̇ = 0) ve alveoler ölü boşluk (∞). Düşük V̇/Q̇ (ventilasyon sorunları; hipokseminin en sık nedeni): üst hava yolu obstrüksiyonu, yabancı cisim, pnömoni, pnömotoraks, atelektazi, ARDS, amfizem, tek akciğer ventilasyonu, yaşlanma, obezitede artmış kapanma kapasitesi. Yüksek V̇/Q̇ (perfüzyon sorunları): PE, azalmış sağ ventrikül atım hacmi. [[K1 s. 69, 65]]</li>
    <li><b>Tedavi.</b> O₂: kötü ventile alveolde PAO₂'yi ve alveol–kapiller gradyanı artırır. Nedeni geri çevirin: pnömoniye antibiyotik, atelektaziye PEEP. V̇/Q̇ sıfıra yaklaştıkça ve şantta O₂ yanıtı zayıftır. [[K1 s. 69–70, 65]]</li>
    <li><b>Klinik bağlantı ve yerçekimi dışı etkenlerle bitirin.</b> PE: distalde yüksek V̇/Q̇ tek başına hipoksemi yapmaz; hipoksemi mediyatörlerin oluşturduğu düşük V̇/Q̇ bölgelerinden, düşük PaCO₂ J reseptörü kaynaklı V̇E artışından gelir. Eşleşmeye birlikte dallanma ve HPV de katkıda bulunur. [[K1 s. 70]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim bölgesel ventilasyon ve perfüzyon grafiğidir: yatay eksende akciğer yüksekliği (solda taban, sağda apeks), sol dikey eksende akım. Perfüzyon doğrusu tabandan apekse dik biçimde, ventilasyon doğrusu daha az eğimle azalır; sağ dikey eksendeki V̇/Q̇ eğrisi apekse doğru giderek hızlanarak yükselir. İki doğrunun kesiştiği düzeyi V̇/Q̇ = 1 diye, uçları 0,6 ve &gt; 3 diye işaretleyin.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Sırtüstü ve yan yatışta dağılım nasıl değişir? Apeksin PAO₂'si yüksekken arteriyel kana katkısı neden küçüktür? Düşük V̇/Q̇ ile şant arasındaki fark nedir, O₂'ye yanıtları neden farklıdır? Hangi durumlar yüksek V̇/Q̇ yapar? PE'li hasta neden hipoksemik ve hipokapniktir? HPV V̇/Q̇ eşleşmesine nasıl katkıda bulunur? Yerçekimi modelinin açıklayamadığı bulgular nelerdir? Cevapların hepsi yukarıda. [[K1 s. 68–70]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d15-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Dik akciğerde perfüzyon tepeden tabana doğrusal artar: 30 cm kan sütunu ≈ 30 cmH₂O ≈ 22 mmHg, MPAP ise yalnızca 15 mmHg. Egzersiz (CO ve MPAP artar) dağılımı eşitler; sırtüstü yatışta arka, yan yatışta alttaki akciğer daha çok kan alır. [[K1 s. 68]]</li>
    <li>Ventilasyon da tabana doğru artar: parankim ağırlığı intraplevral basıncı apekste daha negatif yapar (FRC'de ≈ −10 ve −3 cmH₂O); az gerilmiş bazal alveoller daha kompliyandır ve inspirasyonda daha çok genişler. [[K1 s. 68, 86–87]]</li>
    <li>Ortalama V̇/Q̇ = V̇A 4 L/dk / Q̇ 5 L/dk = 0,8 (V̇E değil V̇A). Perfüzyonun eğimi daha dik olduğu için oran yukarı doğru artar: taban ≈ 0,6 (düşük PAO₂), apeks &gt; 3 (yüksek PAO₂, düşük PACO₂, az kan, az gaz değişimi). [[K1 s. 68–69]]</li>
    <li>Düşük V̇/Q̇ (ventilasyon sorunları: hava yolu tıkanması, pnömoni, atelektazi, ARDS, tek akciğer ventilasyonu, yaşlanma, obezite …) hipokseminin en sık nedenidir. Yüksek V̇/Q̇ perfüzyon sorunlarındadır: PE ve sağ ventrikül atım hacminin azalması. [[K1 s. 69]]</li>
    <li>Tedavi: O₂ (kötü ventile alveolde PAO₂ ve gradyan artar) ve nedeni düzeltmek (pnömoniye antibiyotik, atelektaziye PEEP). Şant ve sıfıra yakın V̇/Q̇ O₂'ye kötü yanıt verir. [[K1 s. 69–70, 65]]</li>
    <li>PE: distalde V̇/Q̇ yüksek, PAO₂ yükselir, PACO₂ düşer ve bu tek başına hipoksemi yapmaz. Hipoksemi bronkokonstriksiyon, ödem ve atelektazinin oluşturduğu düşük V̇/Q̇ bölgelerinden; düşük PaCO₂ J reseptörü kaynaklı V̇E artışından gelir. [[K1 s. 70]]</li>
    <li>Yerçekimi tek etken değildir: aynı yükseklikteki bölgeler farklı V̇/Q̇ gösterebilir, sıfır yerçekiminde bile dağılım homojen değildir. Hava yolu ve damarların aynı noktalarda dallanması ve HPV eşleşmeyi destekler. [[K1 s. 70]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="15"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/14">← Bölüm 14 · Hipoksi ve şantlar</a>
    <a href="#/dersler/fizyoloji/16">Sonraki: Bölüm 16 · Akciğerde ventilasyon–perfüzyon zonları →</a>
  </nav>
</section>`,
};
