/* Fizyoloji Bölüm 16 · Akciğerde ventilasyon–perfüzyon zonları (K1 İngilizce baskı s. 71–73).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır (komşu bölümlerden alınan sayılar kendi sayfalarıyla). */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz16-1'] = {
  no: 1, kok: 'Dik konumdaki akciğerin West zonları için:', kagit: 'Paper A · fizyoloji, Bölüm 16', kaynak: '[[K1 s. 71]]',
  onermeler: [
    { t: 'Zon 1 akciğer tabanında yer alır.', d: false, n: 'Yanlış. Zonlar tepeden tabana numaralanır: zon 1 apekste, zon 3 tabandadır. [[K1 s. 71]]' },
    { t: 'Zon 3\'te pulmoner arter basıncı da pulmoner ven basıncı da alveoler basınçtan yüksektir.', d: true, n: 'Doğru. Zon 3\'te Pa > Pv > PA; kapiller kardiyak döngü boyunca açık kalır. [[K1 s. 71]]' },
    { t: 'Zon 2\'de kapiller kan akımını arteriyel–venöz basınç farkı belirler.', d: false, n: 'Yanlış. Zon 2\'de alveoler basınç venöz basıncı aşar ve kapillerin venöz ucunu sıkıştırır; akımı arteriyel–alveoler basınç farkı belirler. Arteriyel–venöz fark zon 3\'te belirleyicidir. [[K1 s. 71]]' },
    { t: 'Zon 3\'te kapiller kan akımı kardiyak döngü boyunca süreklidir.', d: true, n: 'Doğru. Arteriyel ve venöz basınç alveoler basıncın üstünde kaldığı için akım sistolde de diyastolde de sürer. [[K1 s. 71–72]]' },
    { t: 'Sağlıklı akciğerde apeksle hilus arasındaki kesim zon 2 gibi davranır.', d: true, n: 'Doğru. Sağlıklı akciğerde hilusun altı zon 3, apeksle hilus arası zon 2 gibi davranır; zon 1 normal akciğerde yoktur. [[K1 s. 71]]' },
  ],
};
VERI.sorular['fiz16-2'] = {
  no: 2, kok: 'West zon 1 için:', kagit: 'Paper A · fizyoloji, Bölüm 16', kaynak: '[[K1 s. 71–72]]',
  onermeler: [
    { t: 'Alveoler basınç sistolik pulmoner arter basıncından yüksektir.', d: true, n: 'Doğru. Zon 1\'de PA > Pa > Pv: alveoler basınç sistolik pulmoner arter basıncını da aşar ve kapiller tamamen sıkışır. [[K1 s. 71]]' },
    { t: 'Sağlıklı, anestezi almamış, spontan soluyan bir erişkinde apekste bulunur.', d: false, n: 'Yanlış. Sağlıklı, anestezi almamış kişide alveoler basınç atmosfer basıncına yakındır (0 ± 2 cmH₂O) ve sistolik pulmoner arter basıncını aşmaz; zon 1 normal akciğerde yoktur. [[K1 s. 71–72]]' },
    { t: 'Hemorajik şokta ortaya çıkabilir.', d: true, n: 'Doğru. Pulmoner arter basıncı anormal düştüğünde normal bir alveoler basınç bile onu aşabilir. [[K1 s. 72]]' },
    { t: 'Apikal alveoller ventile edilmediği için V̇/Q̇ oranı düşüktür.', d: false, n: 'Yanlış. Perfüzyon durur ama apikal alveoller ventile edilmeye devam eder; V̇/Q̇ oranı yüksektir ve alveoler ölü boşluk büyüktür. [[K1 s. 71]]' },
    { t: 'Zon 1\'deki alveoller sağdan sola şant oluşturur.', d: false, n: 'Yanlış. Zon 1 alveolleri ventile edilir ama perfüze edilmez: bu alveoler ölü boşluktur ve o alveollere giden ventilasyon boşa gider. Sağdan sola şant, perfüzyonun ventilasyondan fazla olduğu düşük V̇/Q̇ bölgelerinde oluşur. [[K1 s. 69, 72]]' },
  ],
};
VERI.sorular['fiz16-3'] = {
  no: 3, kok: 'Pulmoner arter kateteri (PAC) ile pulmoner kapiller kama basıncı (PCWP) ölçümü için:', kagit: 'Paper A · fizyoloji, Bölüm 16', kaynak: '[[K1 s. 72–73]]',
  onermeler: [
    { t: 'Doğru ölçüm için kateter ucu West zon 2\'deki bir pulmoner arter dalında kama olmalıdır.', d: false, n: 'Yanlış. Uç zon 3\'te kama olmalıdır: sol atriyuma uzanan kesintisiz, durağan kan sütunu yalnızca kapiller akımın sürekli olduğu zon 3\'te sağlanır. [[K1 s. 72]]' },
    { t: 'Kateter ile sol atriyum arasında kesintisiz, durağan bir kan sütunu bulunmalıdır.', d: true, n: 'Doğru. Ölçülen basıncın sol atriyum basıncını yansıtması bu sütuna bağlıdır. [[K1 s. 72]]' },
    { t: 'Pulmoner kan akımının çoğu zon 3\'e gittiği için akımla yönlendirilen kateterin ucu çoğu kez zon 3\'e yerleşir.', d: true, n: 'Doğru. Kateter kan akımıyla yüzdürüldüğü için akımın en çok gittiği yere, yani zon 3\'e gitme eğilimindedir. [[K1 s. 72]]' },
    { t: 'PEEP 10 cmH₂O artırıldığında PCWP\'nin %25\'ten fazla yükselmesi, ucun zon 3\'te olduğunu doğrular.', d: false, n: 'Yanlış. Tersine: kitabın verdiği yatak başı sınamada %25\'ten fazla artış ucun büyük olasılıkla zon 3\'te olmadığını düşündürür. Zon 3 dışında okunan değer alveoler basıncı izlediği için PEEP artışından belirgin etkilenir (Atlas notu). [[K1 s. 73]]' },
    { t: 'Balonlu uç şişirildiğinde kan akımıyla sağ ventrikülden geçirilir ve pulmoner arter ağacında bir dalda kama konumuna gelir.', d: true, n: 'Doğru. Balon şişirilince kateter akımla sağ ventrikülden pulmoner arter ağacına "yüzdürülür" ve bir dala kama olur. [[K1 s. 72]]' },
  ],
};

const D16_NAV = [
  ['d16-west', 'West zonları'], ['d16-neden', 'Neden yükseklikle?'], ['d16-zon1', 'Zon 1 ne zaman?'], ['d16-pac', 'PAC ve PCWP'],
  ['d16-p1', 'Part I'], ['d16-p2', 'Part II'], ['d16-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/16'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 16', baslik: 'Akciğerde ventilasyon–perfüzyon zonları',
  lede: 'Dik akciğerde pulmoner arter, pulmoner ven ve alveol basınçlarının sıralaması yükseklikle değişir; bu sıralama kapiller akımın sürekli mi, yalnızca sistolde mi, yoksa hiç mi olmayacağını belirler. Bölüm West\'in üç zonunu, zon 1\'in hangi klinik durumlarda ortaya çıktığını ve pulmoner arter kateterinin ucunun neden zon 3\'te olması gerektiğini işler. [[K1 s. 71–73]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D16_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d16-west">
  <h2>West zonları: üç basınç, üç zon</h2>
  <p class="intro">West dik akciğeri apekste 1'den tabanda 3'e üç dikey zona ayırdı; her zonda pulmoner arter (Pa), pulmoner ven (Pv) ve alveol (PA, büyük A) basınçlarının sıralaması, dolayısıyla kapiller akım farklıdır. [[K1 s. 71]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Bir kapiller, üç zon: kardiyak döngü boyunca akım</h3></div>
    <div data-viz="f16_kapiller"></div>
    <p class="viz-cap"><b>Tabandan, zon 3'ten başlayın:</b> kapillerin iki ucu da alveoler basıncın üstünde, kapiller açık ve akım döngü boyunca sürer; sonra öteki zonları seçin. [[K1 s. 71]]</p>
    <p class="viz-foot">Şematik model; değerler aşağıdaki zon haritasındaki West modelinden. Döngü yavaşlatıldı, zon 1'deki alveoler basınç (22 cmH₂O) örnektir.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>Kural basit: alveoler basınç bir damar basıncını aşarsa kapilleri orada sıkıştırır. Zon 2'de venöz ucu sıkıştırır ve akımı artık Pa − PA belirler; sistolik Pa alveoler basıncın üstünde, diyastolik Pa altında kaldığı için kan yalnız sistolde geçer. Bu kesintili akım ventilasyonla perfüzyonu uyumsuzlaştırır: V̇/Q̇ yükselir, alveoler ölü boşluk artar ve ventilasyonun bir kısmı boşa gider. [[K1 s. 71]]</p>
  </div>
  <div class="tbl-wrap" style="margin:12px 0 10px">
    <table class="tbl">
      <thead><tr><th>Zon</th><th>Basınç sırası</th><th>Kapiller · akım</th><th>Akımı belirleyen</th><th>V̇/Q̇</th><th>Sağlıklı akciğerde</th></tr></thead>
      <tbody>
        <tr><th>1</th><td style="white-space:nowrap">PA &gt; Pa &gt; Pv</td><td>tamamen sıkışık · yok</td><td>—</td><td>yüksek: ventilasyon sürer, perfüzyon yok</td><td>bulunmaz</td></tr>
        <tr><th>2</th><td style="white-space:nowrap">Pa &gt; PA &gt; Pv</td><td>venöz ucu sıkışık · yalnız sistolde</td><td>Pa − PA</td><td>yüksek</td><td>apeks–hilus arası</td></tr>
        <tr><th>3</th><td style="white-space:nowrap">Pa &gt; Pv &gt; PA</td><td>açık · sürekli</td><td>Pa − Pv (sağ ventrikül oluşturur)</td><td>—</td><td>hilusun altı</td></tr>
      </tbody>
    </table>
  </div>
  <div class="blk-body">
    <p>Dik konumda ventilasyon da perfüzyon da tepeden tabana artar; bu eskiden yalnız yerçekimine bağlanırdı (yerçekimi modeli), bugün pulmoner arterlerle bronşiyollerin yapısal benzerliğinin de katkısı olduğu düşünülüyor (Bölüm 15). West bu modeli geliştirirken kapiller akımın alveoldeki gaz basıncına bağlı olduğunu varsaydı; pozitif basınçlı ventilasyon alveoler basıncı belirgin değiştirdiği için bu anestezide önemlidir. [[K1 s. 71]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap zon 2'yi anlatırken V̇/Q̇ oranının "zon 3'te" yüksek olduğunu yazar; bağlam ve kitabın şekli bunun zon 2 olduğunu gösterir (zon 3'te akım süreklidir). [[K1 s. 71–72]]</div>

  <div class="viz" style="margin-top:16px">
    <div class="viz-head"><h3>Hangi zon? Üç basınçtan zonu bulun</h3></div>
    <div data-viz="f16_zonbul"></div>
    <p class="viz-cap">Her örnekte üç basıncı (cmH₂O, atlas örneği) sıralayıp zonu seçin. [[K1 s. 71]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d16-neden">
  <h2>Basınçlar neden yükseklikle değişir?</h2>
  <p class="intro">Kitap zonları akciğerin kendi ağırlığına bağlar: bu ağırlık tabandaki alveolleri az, tepedekileri çok gerer. [[K1 s. 71]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Asılı akciğer: alveol gerilmesi ve kan sütunu</h3></div>
    <div data-viz="f16_agirlik"></div>
    <p class="viz-cap">Akciğer büyük hava yollarından asılıdır: taban alveolleri küçük ve basınç–hacim eğrisinin kompliyan kesiminde; yukarı çıktıkça çekilerek açılır ve sertleşir, apekste en gerilmiştir. Sağdaki kan sütunu damar tarafıdır: 30 cm'lik akciğerde apeks–taban farkı 30 cmH₂O (22 mmHg), ortalama pulmoner arter basıncı ise yalnız 15 mmHg. [[K1 s. 68, 71]]</p>
    <p class="viz-foot">Durağan şema; alveol boyları orantılı değildir, zon sınırı kitaptaki gibi hilusta çizildi [[K1 s. 71]].</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>Kitaba göre küçük bazal alveoller damarlara çok az dış (ekstramural) basınç uygular; iki damar basıncı da alveoler basıncın üstünde kalır (zon 3). Yukarıya doğru gerilen alveollerde alveoler basınç ve dış basınç artar: önce venöz basıncı (zon 2), apekste tüm akciğerin ağırlığıyla sistolik pulmoner arter basıncını da aşabilir (zon 1). [[K1 s. 71]]</p>
    <p>Düşük basınçlı pulmoner dolaşımda bu hidrostatik fark büyüktür. Egzersizde pulmoner arter basıncı yükselir ve kan daha eşit dağılır; sırtüstü yatışta arka, yan yatışta alttaki akciğer daha çok perfüze olur. [[K1 s. 68]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Klasik West modelinde hava akımı yokken alveoler basınç akciğerin her yerinde aynıdır; yükseklikle değişen damar basınçlarıdır (hilusun üstünde her santimetrede ≈ 1 cmH₂O düşer, altında artar) [[K1 s. 68]]. Zonlar bu eğik çizgilerin sabit alveoler basıncı kestiği yerde ayrılır; aşağıdaki harita bu modelle çizildi.</div>
</section>

<section class="wrap blk ders-sec" id="d16-zon1">
  <h2>Zon 1 ne zaman ortaya çıkar?</h2>
  <p class="intro">Zon 1 normalde yoktur; pulmoner arter basıncı anormal düşer ya da alveoler basınç anormal yükselirse ortaya çıkar. [[K1 s. 72]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Zon haritası: basınçları değiştirin, sınırlar kaysın</h3></div>
    <div data-viz="f16_zonlar"></div>
    <p class="viz-cap"><b>Normal, spontan solunum:</b> zon 1 yok; apekse yakın kesim zon 2, büyük bölüm zon 3. <b>Hemorajik şok</b>, <b>PPV</b> ve <b>Şok + PPV</b> durumlarını deneyin: zon 1 apeksten aşağı genişler. [[K1 s. 71–72]]</p>
    <p class="viz-foot">Şematik West modeli: akciğer 30 cm, 1 cmH₂O/cm [[K1 s. 68]], hilus ortada; hilusta Pa 25/8 (ortalama 15), Pv 5 mmHg [[K1 s. 146]], PA ≈ 0 [[K1 s. 72]]; öteki sayılar örnektir. Modelde zon 2'nin alt kesiminde diyastolik Pa da PA'yı aştığından akım süreklidir; zon 2/3 sınırı hilusun biraz üstündedir (kitapta hilus düzeyi [[K1 s. 71]]).</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>Sağlıklı, anestezi almamış kişide alveoler basınç atmosfer basıncına yakındır (solunumla 0 ± 2 cmH₂O) ve sistolik pulmoner arter basıncını aşmaz. Pulmoner arter basıncı düşünce (hemorajik şok) normal alveoler basınç bile onu aşabilir; alveoler basınç da pozitif basınçlı ventilasyonda ya da akut ağır astımdaki yüksek intrinsik PEEP'te anormal yükselebilir. [[K1 s. 72]]</p>
    <p>Zon 1'de alveoler ölü boşluk büyür ve ventilasyon boşa gider; akut ağır astımda bunu karşılamak için artan solunum eforu solunum yetmezliğini tetikleyebilir. [[K1 s. 72]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d16-pac">
  <h2>Klinik önem: pulmoner arter kateteri ve kama basıncı</h2>
  <p class="intro">Pulmoner kapiller kama basıncının (PCWP) doğru ölçülmesi için pulmoner arter kateterinin (PAC) ucu West zon 3'teki bir dalda kama olmalıdır. [[K1 s. 72]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Kateter ucu hangi zonda? PEEP testi</h3></div>
    <div data-viz="f16_pac"></div>
    <p class="viz-cap"><b>Uç alt lobda, zon 3'te:</b> sol atriyuma kan sütunu kesintisiz. Başka bir uç seçin, PEEP'i 10 cmH₂O artırıp PCWP'nin değişimine bakın. [[K1 s. 72–73]]</p>
    <p class="viz-foot">Şematik model: sol atriyum 5 mmHg [[K1 s. 98]], başlangıç PEEP 5 cmH₂O, okuma ekspirasyon sonunda, 1 cmH₂O/cm [[K1 s. 68]]; PEEP'in plevral ve sol atriyum basıncına etkisi yok sayıldı.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>PCWP, PAC'nin temel ölçümlerinden biridir: balonlu uç şişirilir ve kateter akımla sağ ventrikülden pulmoner arter ağacına, bir dalda kama olana dek "yüzdürülür". Kateterle sol atriyum arasında kesintisiz, durağan bir kan sütunu gerekir; bu yalnız kapiller akımın sürekli olduğu zon 3'te vardır. Pulmoner kan akımının çoğu zon 3'e gittiği için akımla yönlendirilen uç çoğu kez doğru yere yerleşir. [[K1 s. 72]]</p>
  </div>
  <div class="card clin" style="margin-top:14px">
    <span class="tag clin">Yatak başı sınama</span>
    <p style="margin-top:8px">PEEP'i 10 cmH₂O artırın: PCWP %25'ten fazla yükselirse uç büyük olasılıkla zon 3'te değildir. [[K1 s. 73]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Zon 3 dışında aradaki kapillerler sıkışır ve okuma sol atriyumu değil alveoler basıncı izler (modelde uçtaki alveoler basınç + uç–sol atriyum hidrostatik farkı); PEEP artışı bu yüzden okumaya geçer. PEEP de zon 3 sınırını aşağı iterek bir ucu zon 2'de bırakabilir.</div>
</section>

<section class="wrap blk ders-sec" id="d16-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok basınç sıralamaları ve sonuçları üzerinden sorulur: hangi zonda hangi basınç büyüktür, akımı hangi fark belirler, akım sürekli mi kesintili mi, zon 1 hangi durumlarda ortaya çıkar ve neden şant değil ölü boşluk yaratır, PCWP ölçümü için kateter ucu nerede olmalıdır ve bu nasıl sınanır. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz16-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz16-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz16-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d16-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Akciğerin West zonlarını çizerek anlatın. Zon 1 hangi durumlarda ortaya çıkar; bunun anestezi ve yoğun bakımda önemi nedir?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Çerçeve.</b> Dik konumda ventilasyon ve perfüzyon tepeden tabana artar. West'in yerçekimi modeli kapiller akımın alveoldeki gaz basıncına bağlı olduğunu varsayar; dik akciğer üç dikey zona ayrılır (apekste 1, tabanda 3); üç basınç: Pa, Pv ve alveoler basınç PA. [[K1 s. 71]]</li>
    <li><b>Basınçlar neden farklı?</b> Pulmoner dolaşım düşük basınçlıdır (ortalama 15 mmHg); 30 cm'lik akciğerde apeks–taban hidrostatik farkı 30 cmH₂O (22 mmHg) eder; alveoler basınç atmosfer basıncına yakındır (0 ± 2 cmH₂O). Kitap ayrıca yukarıya doğru artan alveol gerilmesini anlatır; West modelinde alveoler basınç her yerde aynıdır, değişen damar basınçlarıdır (Atlas notu). [[K1 s. 68, 71–72]]</li>
    <li><b>Zon 3, tabandan başlayın.</b> Pa &gt; Pv &gt; PA; kapiller açık, akım Pa − Pv farkıyla ve sürekli; sağlıklı akciğerde hilusun altı. [[K1 s. 71]]</li>
    <li><b>Zon 2.</b> Pa &gt; PA &gt; Pv; venöz uç sıkışır, akımı Pa − PA belirler; sistolik Pa alveoler basıncı aşar, diyastolik aşamaz, kan yalnız sistolde geçer; V̇/Q̇ yükselir, alveoler ölü boşluk artar; apeks–hilus arası. [[K1 s. 71]]</li>
    <li><b>Zon 1.</b> PA &gt; Pa &gt; Pv; kapiller tamamen kapanır, perfüzyon durur, ventilasyon sürer; V̇/Q̇ yüksek, alveoler ölü boşluk; sağlıklı akciğerde yok. [[K1 s. 71]]</li>
    <li><b>Zon 1 ne zaman?</b> Pa düşükse (hemorajik şok) ya da PA yüksekse (pozitif basınçlı ventilasyon, akut ağır astımda yüksek intrinsik PEEP). Sonuç: ölü boşluk ve boşa giden ventilasyon; astımda artan efor solunum yetmezliğini tetikleyebilir. [[K1 s. 72]]</li>
    <li><b>Klinik bağlantıyla bitirin: PAC.</b> PCWP için uç zon 3'te kama olmalıdır (sol atriyuma kesintisiz, durağan kan sütunu); akımın çoğu zon 3'e gittiği için uç çoğu kez oraya yerleşir; PEEP 10 cmH₂O artırıldığında PCWP %25'ten fazla yükseliyorsa uç büyük olasılıkla zon 3'te değildir. [[K1 s. 72–73]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim, dik akciğerin üç yatay şeride ayrıldığı şemadır: her şeritte iki alveol arasından geçen bir kapiller, solunda Pa, sağında Pv, üstünde ve altında alveoler basınç PA. Zon 1'de kapiller kapalı, zon 2'de venöz ucu daralmış, zon 3'te açık çizilir. Her şeridin yanına basınç sıralamasını yazın, kenara tepeden tabana artan bir kan akımı oku ekleyin.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Zon 1 neden sağlıklı akciğerde yoktur? Zon 2'de akımı hangi basınç farkı belirler? Pozitif basınçlı ventilasyon ve PEEP zonları nasıl kaydırır? Zon 1 neden şant değil ölü boşluktur? Sırtüstü ve yan yatışta, egzersizde perfüzyon dağılımı nasıl değişir? PAC ucunun zon 3'te olduğunu yatak başında nasıl sınarsınız? Cevapların hepsi yukarıda. [[K1 s. 68, 71–73]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d16-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Dik akciğerde ventilasyon ve perfüzyon tepeden tabana artar; yerçekiminin yanında hava yolu ve damar dallanmasının yapısal benzerliği de katkıda bulunur. [[K1 s. 70–71]]</li>
    <li>West modeli: kapiller akım alveoldeki gaz basıncına bağlıdır; dik akciğer apekste 1'den tabanda 3'e üç dikey zona ayrılır. [[K1 s. 71]]</li>
    <li>Zon 3: Pa &gt; Pv &gt; PA; akım Pa − Pv farkıyla, döngü boyunca sürekli; sağlıklı akciğerde hilusun altı. [[K1 s. 71]]</li>
    <li>Zon 2: Pa &gt; PA &gt; Pv; venöz uç sıkışır, akımı Pa − PA belirler, kan yalnız sistolde geçer; V̇/Q̇ ve alveoler ölü boşluk artar; apeks–hilus arası. [[K1 s. 71]]</li>
    <li>Zon 1: PA &gt; Pa &gt; Pv; perfüzyon yok, ventilasyon sürer; V̇/Q̇ yüksek, alveoler ölü boşluk; sağlıklı akciğerde yoktur. [[K1 s. 71]]</li>
    <li>Zonları düşük basınçlı pulmoner dolaşımdaki yaklaşık 30 cmH₂O (22 mmHg) apeks–taban hidrostatik farkı yaratır; hava akımı yokken alveoler basınç her yerde aynıdır (Atlas notu). [[K1 s. 68]]</li>
    <li>Zon 1, Pa düşünce (hemorajik şok) ya da PA yükselince (pozitif basınçlı ventilasyon, akut ağır astımda intrinsik PEEP) oluşur ve ventilasyonu boşa harcatır. [[K1 s. 72]]</li>
    <li>PCWP için kateter ucu zon 3'te olmalıdır; PEEP 10 cmH₂O artırıldığında PCWP %25'ten fazla yükseliyorsa uç büyük olasılıkla zon 3'te değildir. [[K1 s. 72–73]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="16"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/15">← Bölüm 15 · Ventilasyon–perfüzyon ilişkileri</a>
    <a href="#/dersler/fizyoloji/17">Sonraki: Bölüm 17 · Oksijen sunumu ve gereksinimi →</a>
  </nav>
</section>`,
};
