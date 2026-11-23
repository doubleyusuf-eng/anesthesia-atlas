VERI.sorular = VERI.sorular || {};
VERI.sorular['fizek88-1'] = {
  no: 1, kagit: 'Paper A · Fizyoloji', kaynak: '[[K2 s. 445]]',
  kok: 'Kronik dağ hastalığında aşağıdaki önermeleri değerlendirin.',
  onermeler: [
    { t: 'Yüksek irtifada yaşayanların çoğunda gelişir.', d: false, n: 'Yüksek irtifa sakinlerinin küçük bir bölümünde görülür. [[K2 s. 445]]' },
    { t: 'Özellikle orta yaşlı erkeklerde görülür.', d: true, n: 'Kaynak, etkilenenler arasında orta yaşlı erkekleri özellikle belirtir. [[K2 s. 445]]' },
    { t: 'Hipoksiye yanıt güçlenmiştir.', d: false, n: 'Kronik dağ hastalığında hipoksiye yanıt bozulur. [[K2 s. 445]]' },
    { t: 'Pulmoner hipertansiyon tablonun bir parçasıdır.', d: true, n: 'Pulmoner hipertansiyonun yanı sıra siyanoz, dispne ve letarji görülür. [[K2 s. 445]]' },
    { t: 'Arteriyel karbondioksit parsiyel basıncı düşüktür.', d: false, n: 'Arteriyel oksijen basıncı düşükken karbondioksit basıncı yüksektir. [[K2 s. 445]]' }
  ]
};

VERI.sorular['fizek88-2'] = {
  no: 2, kagit: 'Paper A · Fizyoloji', kaynak: '[[K2 s. 445–446]]',
  kok: 'Baş yönünde ivmelenme için önermeleri değerlendirin.',
  onermeler: [
    { t: 'Retina kanlanması azalınca renkleri ayırt etmek güçleşir.', d: true, n: '4 G’de retina kan akımının azalması ayrıntı ve renk algısını bozar. [[K2 s. 445]]' },
    { t: 'Blackout terimi bilinç kaybını tanımlar.', d: false, n: 'Blackout görmenin kaybıdır. [[K2 s. 445]]' },
    { t: 'Kademeli ivmelenmede barorefleks retinal kan akımını 6 G’ye kadar sürdürebilir.', d: true, n: 'Karotis sinüsü refleksleri kademeli artışta hem gözü hem beyni koruyabilir. [[K2 s. 445]]' },
    { t: 'Akciğer tabanında ventilasyon/perfüzyon oranı düşer.', d: true, n: 'Tabanda kan akımı ventilasyondan daha fazla artar. [[K2 s. 445]]' },
    { t: 'Anti-G giysisi diyaframın aşağı hareketini artırır.', d: false, n: 'Giysi diyaframın aşağı inişini sınırlar ve venöz göllenmeyi önler. [[K2 s. 446]]' }
  ]
};
VERI.sorular['fizek88-3'] = {
  no: 3, kagit: 'Paper A · Fizyoloji', kaynak: '[[K2 s. 446]]',
  kok: 'Ağırlıksızlık ve Dünya’ya dönüş için önermeleri değerlendirin.',
  onermeler: [
    { t: 'Ağırlıksızlığın başlangıcında kalp debisi düşer.', d: false, n: 'Sıvı toraksa kaydığında debi önce artar. [[K2 s. 446]]' },
    { t: 'Atriyum ve venüllerdeki hacim reseptörlerinin gerilmesi ADH üretimini azaltır.', d: true, n: 'ADH azalırken atriyal natriüretik peptit artar ve diürez gelişir. [[K2 s. 446]]' },
    { t: 'Ekstansör kasların tonik etkinliği azalır.', d: true, n: 'Yerçekimine karşı çalışan kaslarda etkinliğin azalması atrofiye zemin hazırlar. [[K2 s. 446]]' },
    { t: 'Bacaklara negatif basınç uygulanması uzayda venöz göllenmeyi artırır.', d: true, n: 'Uzay giysisiyle uygulanan negatif basınç kanın bacaklarda toplanmasını destekler. [[K2 s. 446]]' },
    { t: 'Dünya’ya dönüşte retikülositoz gelişir.', d: true, n: 'Kaynak, azalmış kan hacmine dönüşte verilen yanıtlar arasında retikülositozu sayar. [[K2 s. 446]]' }
  ]
};

const DEK88_DAG = `
<section class="wrap blk ders-sec" id="dek88-dag">
  <h2>Kronik dağ hastalığı</h2>
  <p class="intro">Yüksek irtifada yaşayanların küçük bir bölümünde hipoksiye yanıt bozulur ve kronik dağ hastalığı gelişir. [[K2 s. 445]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Arter kan gazındaki iki ipucu</h3></div>
    <div data-viz="fek88_dag"></div>
    <p class="viz-cap"></p>
    <p class="viz-foot">Şematik/nitel gösterim, arteriyel parsiyel basınçların yönünü belirtir. [[K2 s. 445]]</p>
  </div>
  <p>Bu kan gazı örüntüsüne siyanoz, pulmoner hipertansiyon, dispne ve letarji eşlik eder. [[K2 s. 445]] Özellikle orta yaşlı erkekler etkilenir. [[K2 s. 445]]</p>
</section>`;

SAYFALAR['dersler/fizyoloji/ek88'] = {
  grup: 'dersler',
  eyebrow: 'Fizyoloji · Ek ders · Bölüm 88 ardından',
  baslik: 'İvmelenme, uzay yolculuğu ve kronik dağ hastalığı',
  lede: 'Baş yönünde ivmelenirken görme neden bilinçten önce kaybolur? Ağırlıksızlıkta sıvı nereye gider ve Dünya’ya dönüşte ayakta durmak neden güçleşir?',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">
  <button type="button" data-scroll="dek88-dag">Kronik dağ hastalığı</button>
  <button type="button" data-scroll="dek88-g">G kuvvetleri</button>
  <button type="button" data-scroll="dek88-solunum">Solunum ve korunma</button>
  <button type="button" data-scroll="dek88-uzay">Ağırlıksızlık ve dönüş</button>
  <button type="button" data-scroll="dek88-p1">Part I</button>
  <button type="button" data-scroll="dek88-p2">Part II</button>
  <button type="button" data-scroll="dek88-ozet">Özet</button>
</nav>
${DEK88_DAG}
<section class="wrap blk ders-sec" id="dek88-g">
  <h2>G kuvvetleri ve kanın dağılımı</h2>
  <p class="intro">Hızlanma ve yavaşlama sırasında vücuda etkiyen kuvvet değişir, kan aşağıda kalan bölgelerde göllenebilir ve düzeltici refleksler devreye girer. [[K2 s. 445]]</p>
  <div class="viz"><div class="viz-head"><h3>Baş yönünde ivme artarken görme ve bilinç</h3></div>
    <div data-viz="fek88_ivme"></div><p class="viz-cap"></p>
    <p class="viz-foot">G değerleri K2’de anlatılan ivmelenmeye ait yaklaşık eşiklerdir, kişiye göre değişir. [[K2 s. 445]]</p></div>
  <p>Newton’un hareket yasalarıyla açıklanan bu etkide duruş önemlidir. [[K2 s. 445]] Fırlatma sırasında Dünya’nın çekimi düşeydir, uygulanan merkezcil kuvvetin vücuda göre yönü ise astronotun duruşuna bağlıdır. [[K2 s. 445]]</p>
  <div class="card"><h3>Bir sıvı sütununda P = h × d × G</h3>
  <p>İki nokta arasındaki basınç farkı P (cmH₂O), ivme doğrultusundaki uzaklık h (cm), sıvı yoğunluğu d (g/cm³) ve normal yerçekiminin katı olarak ivme G ile hesaplanır. [[K2 s. 445]] Vücudun ivmeye göre konumu ve ivmenin büyüklüğü basınç gradyanının yönünü ve büyüklüğünü belirler. [[K2 s. 445]]</p></div>
  <div class="cols">
  <div class="card"><h3>Göz ve beyin</h3><p>Retinada damar içi basınç düşer, damar direnci artar ve göze daha az kan ulaşır. [[K2 s. 445]] Beyinde otoregülasyon perfüzyonu daha iyi korur. [[K2 s. 445]] Beyin-omurilik sıvısı basıncı ile serebral damar basıncı aynı miktarda değiştiğinden damar duvarı boyunca basınç farkı ve damar çapı çok az değişir. [[K2 s. 445]]</p></div>
  <div class="card"><h3>Dolaşım ve refleks yanıt</h3><p>Aşağıda kalan bölgelerde göllenme arttıkça venöz dönüş, ardından kalp debisi düşer. [[K2 s. 445]] Arter basıncının düşmesi barorefleksi uyarır. [[K2 s. 445]] Karotis sinüsü aracılı yanıt yaklaşık 5–10 saniye sonra göz ve beyin kan akımını yeniden sağlar. [[K2 s. 445]] İvme kademeli artarsa refleksler bu akımı 6 G’ye kadar sürdürebilir. [[K2 s. 445]]</p></div></div>
</section>
<section class="wrap blk ders-sec" id="dek88-solunum">
  <h2>Artmış G altında solunum ve korunma</h2>
  <p class="intro">Baş yönündeki ivme diyaframı aşağı çekerken nefes almak kolaylaşır, nefes vermek güçleşir. [[K2 s. 445]]</p>
  <div class="viz"><div class="viz-head"><h3>Apeks ve tabanda ventilasyon/perfüzyon (V/Q)</h3></div>
    <div data-viz="fek88_akciger"></div><p class="viz-cap"></p>
    <p class="viz-foot">Şematik/nitel karşılaştırma, bölgesel kan akımı ile ventilasyonun nasıl ayrıştığını gösterir. [[K2 s. 445]]</p></div>
  <p>Apeksten tabana doğru hem kan akımı hem ventilasyon gradyanı belirginleşir. [[K2 s. 445]] Apekste alveoler ölü boşluk, tabanda venöz şant artar ve sonuçta hipoksemi gelişir. [[K2 s. 445–446]]</p>
  <h3>İvmenin etkisi nasıl azaltılabilir?</h3>
  <ul><li><strong>Duruş.</strong> Sırtüstü yatmak vücuttaki basınç değişimlerini en aza indirebilir. [[K2 s. 446]]</li>
  <li><strong>Kaslar.</strong> Bacak ve uyluk kaslarını aktif olarak kasmak venöz dönüşü artırabilir. [[K2 s. 446]]</li>
  <li><strong>Anti-G giysisi.</strong> Venöz göllenmeyi önleyip diyaframın aşağı hareketini sınırlayan giysiler yararlı olabilir. [[K2 s. 446]]</li>
  <li><strong>Gözlük.</strong> Özel gözlükler göz dışı basıncı azaltarak transmural basıncı koruyabilir ve retina kanlanmasını destekleyebilir. [[K2 s. 446]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="dek88-uzay">
  <h2>Ağırlıksızlıktan Dünya’ya dönüşe</h2>
  <p class="intro">Ağırlıksızlıkta (sıfır yerçekimi) alt ekstremite venlerindeki hidrostatik etki ortadan kalkar ve bacaklarda daha az kan göllenir. [[K2 s. 446]]</p>
  <div class="viz"><div class="viz-head"><h3>Sıvının yer değiştirmesinden diüreze</h3></div>
    <div data-viz="fek88_sivi"></div><p class="viz-cap"></p>
    <p class="viz-foot">Şematik akış, ağırlıksızlığın başlangıcındaki hacim yanıtını izler. [[K2 s. 446]]</p></div>
  <p>Boyun venleri dolgunlaşır ve baş şiş görünebilir. [[K2 s. 446]] Kalp debisi başlangıçta artar. [[K2 s. 446]] Daha sonra sempatik etkinlik refleks olarak azalır, parasempatik tonus artar ve hem kalp hızı hem debi düşer. [[K2 s. 446]]</p>
  <div class="cols">
  <div class="card"><h3>Kalp ve kemik iliği</h3><p>Miyokardın iş yükü azalınca gelişen dekondisyon ventriküllerde bir miktar atrofiye yol açar. [[K2 s. 446]] K2, nedeni bilinmeyen bir kemik iliği etkinliği durmasıyla birlikte alyuvar ve akyuvar sayılarında azalma bildirir; bu evrensel bir kural değildir. [[K2 s. 446]]</p></div>
  <div class="card"><h3>Yatak istirahatiyle benzerlik</h3><p>Uzun süre yatan hastalarda yerçekimi vücudun enine etki eder. [[K2 s. 446]] Böylece sağlıklı bir kişi ayağa kalktığında bacaklarda görülen olağan göllenme gerçekleşmez ve ağırlıksızlıktaki sorunların bazıları yatak istirahatinde de görülür. [[K2 s. 446]]</p></div>
  <div class="card"><h3>İlk günlerde yönelim</h3><p>Deri, kas ve eklem reseptörlerinin bildirdiği postüral kuvvetler ile otolitlerin bildirdiği baş yönelimine ilişkin girdiler değişir. [[K2 s. 446]] Baş dönmesi, yönelim bozukluğu, bulantı ve kusma muhtemelen bu girdiler arasındaki dengesizlikten doğar. [[K2 s. 446]]</p></div>
  <div class="card"><h3>Kas ve kemik</h3><p>Yerçekimine karşı çalışan ekstansörlerin tonik etkinliği azalınca kaslar atrofiye yatkınlaşır. [[K2 s. 446]] Yorgunluk ve güçsüzlüğe idrarla üre atılımında artış eşlik eder. [[K2 s. 446]] Özellikle yük taşıyan kemiklerde mineral kaybı, dönüşte kırık tehlikesini artırır. [[K2 s. 446]]</p></div></div>
  <h3>Dünya’ya dönünce</h3>
  <p>Kan yeniden aşağıda kalan bölgelerde göllenir. [[K2 s. 446]] Kan hacmi yaklaşık %10 azaldığı ve doku tonusu düştüğü için astronot ayakta durmakta zorlanır. [[K2 s. 446]] Sıvı alımı ve böbreklerin sodyum tutması artar, retikülositoz gelişir. [[K2 s. 446]]</p>
  <p>Kalp ve iskelet kaslarının toparlanması daha yavaştır ve beş aylık bir döneme yayılır. [[K2 s. 446]] Kemiklerin yeniden mineral kazanması da yavaştır ve osteoporoz kalıcı olabilir. [[K2 s. 446]]</p>
  <h3>Uzayda ve dönüş öncesinde alınabilen önlemler</h3>
  <ul><li>Baş hareketini bir başlıkla kısıtlamak bulantıyı hafifletebilir. [[K2 s. 446]]</li>
  <li>Uzay giysisinin bacaklara uyguladığı negatif basınç venöz göllenmeyi artırır. [[K2 s. 446]]</li>
  <li>İzometrik kasılmalar, özel egzersiz programları ve egzersiz ekipmanı kas atrofisini azaltabilir. [[K2 s. 446]]</li>
  <li>Dönüşten hemen önce tuzlu su içerek sıvı hacmini artırmak dönüşteki sorunları hafifletebilir. [[K2 s. 446]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="dek88-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2>
  <p>Her önermeyi bağımsız değerlendirin.</p>
  <div data-viz="mtf" data-q="fizek88-1"></div>
  <div data-viz="mtf" data-q="fizek88-2"></div>
  <div data-viz="mtf" data-q="fizek88-3"></div>
</section>
<section class="wrap blk ders-sec" id="dek88-p2">
  <h2>Part II · SOE 1</h2>
  <div class="card soe-soru"><h3>Açılış sorusu</h3><p>Fırlatma, ağırlıksızlık ve Dünya’ya dönüş sırasında kanın dağılımı nasıl değişir? Bu değişiklikleri astronotun görmesi ve ayakta durabilmesiyle ilişkilendirin.</p></div>
  <h3>Cevap iskeleti</h3>
  <ol class="iskelet"><li>Basınç farkını ivme doğrultusundaki uzaklık, yoğunluk ve G ile ilişkilendirin. [[K2 s. 445]]</li>
  <li>Baş yönünde ivmelenirken göllenmeden venöz dönüş ve debi düşüşüne geçin. [[K2 s. 445]]</li>
  <li>Retina kanlanmasındaki azalmayı, beyin otoregülasyonunu ve karotis sinüsü refleksinin zamanlamasını açıklayın. [[K2 s. 445]]</li>
  <li>Ağırlıksızlıkta sıvının toraksa kaymasını hacim reseptörleri, hormon yanıtı ve diürezle bağlayın. [[K2 s. 446]]</li>
  <li>Dönüşte yeniden başlayan göllenmenin, azalmış kan hacmi ve düşük doku tonusuyla birlikte ayakta durmayı güçleştirdiğini açıklayın. [[K2 s. 446]]</li></ol>
  <div class="note"><strong>Çizin.</strong> Fırlatma ve ağırlıksızlık için iki vücut taslağı çizin. Kanın hangi yöne kaydığını oklarla, venöz dönüşteki değişimi sözcüklerle gösterin. [[K2 s. 445–446]]</div>
  <h3>Olası ek sorular</h3><ul><li>İvmelenirken apekste ve tabanda V/Q neden farklı yönlerde değişir?</li><li>Uzun süreli yatak istirahati ağırlıksızlığa hangi açıdan benzer?</li><li>Kronik dağ hastalığında arter kan gazında hangi iki değişikliği beklersiniz?</li></ul>
</section>
<section class="wrap blk ders-sec" id="dek88-ozet">
  <h2>Özet</h2><ul class="ozet">
  <li>Kronik dağ hastalığında hipoksiye yanıt bozulur, PaO₂ düşüktür ve PaCO₂ yüksektir. [[K2 s. 445]]</li>
  <li>Baş yönünde ivmelenmede önce renk ve ayrıntı algısı bozulur, ardından görme kaybolur. [[K2 s. 445]]</li>
  <li>Apekste perfüzyon sıfıra kadar inerken tabanda kan akımındaki artış ventilasyondaki artışı aşar. [[K2 s. 445]]</li>
  <li>Ağırlıksızlıkta merkeze kayan sıvı, diürezi başlatan hacim yanıtını uyarır. [[K2 s. 446]]</li>
  <li>Dünya’ya dönünce azalmış kan hacmi ayakta durmayı güçleştirir, kemik mineral kaybı ise kırık riskini artırır. [[K2 s. 446]]</li></ul>
  <div data-viz="tamam" data-bolum="ek88"></div>
</section>
<nav class="wrap ders-gec">
  <a href="#/dersler/fizyoloji/88">← Bölüm 88 · Dalış</a>
  <a href="#/dersler/fizyoloji/89">Sonraki: Bölüm 89 · Sıcaklık düzenlenmesi →</a>
</nav>`
};
