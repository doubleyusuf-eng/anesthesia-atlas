/* Fizyoloji Bölüm 20 · Akciğer kompliyansı (K1 İngilizce baskı s. 82–87).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. Bileşen tarifleri: docs/tasarim/fiz20.md */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz20-1'] = {
  no: 1, kok: 'Akciğer, göğüs kafesi ve solunum sistemi kompliyansı için:', kagit: 'Paper A · fizyoloji, Bölüm 20', kaynak: '[[K1 s. 82–83]]',
  onermeler: [
    { t: "Akciğer ve göğüs kafesi kompliyansı 200'er mL/cmH₂O ise solunum sistemi kompliyansı 400 mL/cmH₂O'dur.", d: false, n: "Yanlış. Seri kompliyansların tersleri toplanır: 1/RC = 1/200 + 1/200, yani RC = 100 mL/cmH₂O. [[K1 s. 82]]" },
    { t: "Solunum sistemi kompliyansı, akciğer ve göğüs kafesi kompliyanslarından küçük olanından da düşüktür.", d: true, n: "Doğru. Tersler toplandığı için toplam kompliyans bileşenlerin toplamından küçüktür; aynı denklemden her bir bileşenden de küçük olduğu çıkar (ör. 200 ve 50 mL/cmH₂O için 40 mL/cmH₂O). [[K1 s. 82]]" },
    { t: "FRC'de kompliyansı 200 mL/cmH₂O olan akciğerde 500 mL'lik tidal hacim için yaklaşık 2,5 cmH₂O transpulmoner basınç yeterlidir.", d: true, n: "Doğru. ΔP = ΔV / C = 500 / 200 = 2,5 cmH₂O. Akciğerler FRC'de en kompliyan durumdadır; istirahatte solunum işinin en az olması bundandır. [[K1 s. 82]]" },
    { t: "Amfizemde akciğer kompliyansı azalır.", d: false, n: "Yanlış. Akciğerin elastik dokusu yıkıldığı için kompliyans artar; ileri yaşta da elastik doku dejenerasyonuna bağlı benzer bir artış olur. Yüksek kompliyansın bedeli elastik geri çekilmenin azalması ve ekspirasyonun zorlaşmasıdır. [[K1 s. 82–83]]" },
    { t: "Obezitede göğüs kafesi kompliyansı azalır.", d: true, n: "Doğru. Göğüs duvarının artmış ağırlığı toraksın genişlemesine karşı koyar. İleri gebelik ve kifoskolyoz, ankilozan spondilit gibi göğüs duvarı deformiteleri de göğüs kafesi kompliyansını azaltır. [[K1 s. 83]]" },
  ],
};
VERI.sorular['fiz20-2'] = {
  no: 2, kok: 'Yüzey gerilimi ve pulmoner sürfaktan için:', kagit: 'Paper A · fizyoloji, Bölüm 20', kaynak: '[[K1 s. 83–84]]',
  onermeler: [
    { t: "Yüzey gerilimi sabitken, alveolü açık tutmak için gereken basınç yarıçap küçüldükçe artar.", d: true, n: "Doğru. Laplace yasası (tek yüzeyli küre): P = 2T/r. Ekspirasyonda küçülen alveolü yeniden şişirmek için daha büyük bir transmural basınç gerekir. [[K1 s. 83]]" },
    { t: "Sürfaktan tip I pnömositler tarafından üretilir.", d: false, n: "Yanlış. Sürfaktanı alveol duvarındaki tip II pnömositler üretir: başta DPPC olmak üzere fosfolipitlerle SP-A, SP-B ve SP-C proteinlerinin karışımıdır. [[K1 s. 84]]" },
    { t: "Sürfaktanın yüzey gerilimini azaltma etkisi büyük alveollerde küçük alveollerden daha fazladır.", d: false, n: "Yanlış. Azalma küçük alveollerde daha fazladır: yarıçap küçüldükçe DPPC molekülleri birbirine yaklaşır ve aralarındaki itme kuvvetleri artar. Bu, küçük alveolün Laplace yasasından gelen dezavantajını dengeler. [[K1 s. 84]]" },
    { t: "Sürfaktan, interstisyel sıvının alveole transüdasyonunu azaltır.", d: true, n: "Doğru. Yüzey geriliminin içe doğru kuvveti Starling filtrasyon kuvvetleri aracılığıyla interstisyumdan alveole sıvı çeker; sürfaktan yüzey gerilimini azalttığı için alveole daha az sıvı çekilir. [[K1 s. 83–84]]" },
    { t: "Yenidoğanın solunum sıkıntısı sendromunda akciğer kompliyansı artmıştır.", d: false, n: "Yanlış. Sürfaktan yetersizliğinde kompliyans düşüktür: alveoller kollabe olur ve sıvıyla dolar, solunum işi artar; atelektazi ve pulmoner ödem alanları görülür. [[K1 s. 84]]" },
  ],
};
VERI.sorular['fiz20-3'] = {
  no: 3, kok: 'Statik ve dinamik kompliyans, histerezis ve bölgesel ventilasyon için:', kagit: 'Paper A · fizyoloji, Bölüm 20', kaynak: '[[K1 s. 84–87]]',
  onermeler: [
    { t: "Statik kompliyans, gaz akımının durdurulduğu duraklamalarda alınan basınç ve hacim ölçümleriyle belirlenir.", d: true, n: "Doğru. Hasta 500 mL'lik adımlarla soluk alır; adımlar arasındaki duraklamada akım durur ve intraplevral basınç özofageal balon kateterle ölçülür. [[K1 s. 84]]" },
    { t: "Basınç–hacim döngüsünün alanı, akciğerde elastik potansiyel enerji olarak depolanan işi gösterir.", d: false, n: "Yanlış. Döngünün alanı, direnç kuvvetlerini yenmek için ısı olarak harcanan enerjidir. [[K1 s. 85]]" },
    { t: "Akut astımda dinamik kompliyans statik kompliyanstan belirgin düşüktür.", d: true, n: "Doğru. Hava yolu direncini artıran durumlar dinamik kompliyansı düşürür ve döngüyü genişletir; statik ile dinamik kompliyans arasındaki fark, hava yollarının akım direncinin dolaylı bir ölçüsüdür. [[K1 s. 85–86]]" },
    { t: "Dik duran kişide FRC'de akciğer tepesindeki alveoller tabandakilerden daha şişkindir.", d: true, n: "Doğru. Yerçekimi nedeniyle intraplevral basınç tepede daha negatiftir (−10'a karşı −3 cmH₂O); tepe alveolleri FRC'de neredeyse en büyük hacimlerindedir. Buna karşın tidal inspirasyonda tabanın hacmi daha çok artar, yani taban daha iyi ventile olur. [[K1 s. 86–87]]" },
    { t: "Ekspirasyon sonu noktası alt infleksiyon noktasının üstünde tutulursa tidal soluk eğrinin daha kompliyan bölümüne taşınır.", d: true, n: "Doğru. En uygun PEEP için tidal ventilasyon eğrinin en dik bölümünde olmalıdır: ekspirasyon sonu alt infleksiyon noktasının üstünde, inspirasyon sonu üst infleksiyon noktasının altında. [[K1 s. 87]]" },
  ],
};

const D20_NAV = [
  ['d20-tanim', 'Tanım'], ['d20-solunum', 'Solunum sistemi'], ['d20-laplace', 'Laplace ve sürfaktan'],
  ['d20-statik', 'Statik eğri'], ['d20-dinamik', 'Dinamik kompliyans'], ['d20-bolgesel', 'Tepe ve taban'],
  ['d20-peep', 'En uygun PEEP'], ['d20-p1', 'Part I'], ['d20-p2', 'Part II'], ['d20-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/20'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 20', baslik: 'Akciğer kompliyansı',
  lede: 'Kompliyans, akciğerin uygulanan basınca ne kadar hacimle yanıt verdiğini belirler; basınç–hacim eğrisinin eğimidir. Bu bölüm akciğer, göğüs kafesi ve solunum sistemi kompliyansını, yüzey gerilimini ve sürfaktanı, statik ve dinamik kompliyansı, histerezisi, akciğer tepesiyle tabanı arasındaki ventilasyon farkını ve en uygun PEEP seçimini işler. [[K1 s. 82–87]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D20_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d20-tanim">
  <h2>Kompliyans: basınç–hacim eğrisinin eğimi</h2>
  <p class="intro">Kompliyans, transpulmoner basınçtaki birim değişimin akciğer hacminde oluşturduğu değişimdir, yani basınç–hacim eğrisinin eğimi: <b>kompliyans = Δhacim / Δtranspulmoner basınç</b>. Akciğerlere basınç uygulandığında ne kadar genişleyeceklerini belirler. [[K1 s. 82]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Aynı 500 mL, farklı basınç: kompliyans ve FRC dengesi</h3></div>
    <div data-viz="f20_tanim"></div>
    <p class="viz-cap" aria-live="polite">Bir durum seçin: çizgi ne kadar dikse 500 mL'ye o kadar az basınçla ulaşılır; taralı üçgen genişletme işini, yani elastik enerji olarak depolanan işi gösterir. Sağdaki şema FRC'deki kuvvet dengesidir. [[K1 s. 82]]</p>
    <p class="viz-foot">Tanım, FRC'deki 200 mL/cmH₂O ve 500 mL için 2,5 cmH₂O kitaptandır [[K1 s. 82]]. Yüksek (500) ve düşük (50 mL/cmH₂O) örnekler şematiktir; düz çizgiler yalnız tidal aralık içindir, eğrinin tamamı aşağıdaki statik eğridedir.</p>
  </div>
  <div class="blk-body">
    <p>Uygulanan basınç negatif (spontan solunumda) ya da pozitif (aralıklı pozitif basınçlı ventilasyonda, IPPV) olabilir. Spontan soluyan hastada kompliyans <b>yüksekse</b> solunum kaslarının tidal hacim (V<sub>T</sub>) için küçük bir transpulmoner basınç oluşturması yeter; ama genişlemede az iş yapıldığından elastik potansiyel enerji olarak depolanan iş de azdır: akciğerin elastik geri çekilmesi azalır ve ekspirasyon zorlaşır. Kompliyans <b>düşükse</b> aynı V<sub>T</sub> için yüksek basınç gerekir; kaslar inspirasyonda daha çok çalışır ve solunum yetmezliği gelişebilir. [[K1 s. 82]]</p>
    <p>Normal tidal solunum fonksiyonel rezidüel kapasiteden (FRC) başlar: akciğerin içe elastik geri çekilmesinin göğüs kafesinin dışa yaylanma kuvvetine eşit ve zıt olduğu dinlenme noktası. Akciğer en kompliyan durumuna tam burada ulaşır, bu yüzden istirahatte solunum işi en azdır: tipik hastada FRC'de kompliyans 200 mL/cmH₂O'dur ve 500 mL'lik V<sub>T</sub> için yalnız 2,5 cmH₂O yeter. [[K1 s. 82]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d20-solunum">
  <h2>Solunum sistemi kompliyansı ve onu değiştiren durumlar</h2>
  <p class="intro">Solunum sistemi kompliyansı (RC) akciğer–göğüs kafesi biriminin tümünün kompliyansıdır; iki bileşeni, akciğer (LC) ve göğüs kafesi kompliyansı (TCC), seri bağlıdır ve tersleri toplanır: <b>1/RC = 1/LC + 1/TCC</b>. [[K1 s. 82]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Aynı hacim, toplanan basınçlar: solunum sistemi kompliyansı</h3></div>
    <div data-viz="f20_seri"></div>
    <p class="viz-cap" aria-live="polite">Bir durum seçin ya da kompliyansları kaydırın: 500 mL'yi vermek için gereken basınç iki bileşenin payına ayrılır, toplamı solunum sistemi kompliyansını verir. [[K1 s. 82–83]]</p>
    <p class="viz-foot">Denklem ve normal değerler kitaptandır [[K1 s. 82]]; durum düğmelerinde değişimin yönü ve etkilenen bileşen kitaptandır [[K1 s. 82–83]], sayılar şematiktir. Basınçlar gevşemiş hastaya 500 mL'yi pozitif basınçla vermek için gereken statik (elastik) değişimlerdir; hava yolu direncinin payı gösterilmez.</p>
  </div>
  <div class="blk-body">
    <p>Akciğer ve göğüs kafesi için tipik değer 200'er mL/cmH₂O olduğundan RC tipik olarak 100 mL/cmH₂O'dur. Tersler toplandığı için toplam kompliyans bileşenlerin toplamından her zaman küçüktür; aynı denklemden küçük bileşenden de küçük olduğu çıkar (200 ve 50 için 40 mL/cmH₂O). [[K1 s. 82]]</p>
    <p>Göğüs kafesi kompliyansını göğüs duvarının biçimi (omurga ve kaburga kafesi dahil) ve kas tonusu belirler; akciğer kompliyansını genel olarak bağ dokusunun elastik geri çekilmesi ve alveollerdeki hava–sıvı arayüzünün yüzey gerilimi. Solunum sistemi kompliyansı fizyolojik ve patolojik etkenlerle değişir: [[K1 s. 82–83]]</p>
  </div>
  <div class="tbl-wrap" style="margin-top:10px">
    <table class="tbl">
      <thead><tr><th>Durum</th><th>Kompliyans</th><th>Neden</th></tr></thead>
      <tbody>
        <tr><th>Amfizem</th><td>Akciğer ↑</td><td>Akciğerin elastik dokusu yıkılmıştır. [[K1 s. 83]]</td></tr>
        <tr><th>İleri yaş</th><td>Akciğer ↑</td><td>Elastik doku dejenere olur; hafif amfizeme benzer. [[K1 s. 83]]</td></tr>
        <tr><th>Nöromüsküler hastalık<br><span class="small muted">ör. motor nöron hastalığı</span></th><td>Göğüs kafesi ↑</td><td>Kas tonusu azalır, göğüs kafesi kolay genişler. [[K1 s. 83]]</td></tr>
        <tr><th>Sırtüstü pozisyon</th><td>Akciğer ↓</td><td>Akciğer sırtüstü genellikle daha az kompliyandır. [[K1 s. 83]]</td></tr>
        <tr><th>İleri gebelik</th><td>Göğüs kafesi ↓</td><td>Akciğer kompliyansı görece etkilenmez. [[K1 s. 83]]</td></tr>
        <tr><th>Alveolde ya da interstisyumda sıvı<br><span class="small muted">pnömoni, pulmoner ödem</span></th><td>Akciğer ↓</td><td>Yüzey gerilimi yüzünden sıvı dolu alveol, havalı alveolden çok daha yüksek transmural basınçla genişler; kompliyans belirgin düşer. [[K1 s. 83]]</td></tr>
        <tr><th>Atelektazi</th><td>Akciğer ↓</td><td>Kollabe, yani yarıçapı küçük alveoller yüzey gerilimini yenmek için çok daha yüksek transmural basınç ister (Laplace yasası, aşağıda). [[K1 s. 83]]</td></tr>
        <tr><th>Pulmoner hipertansiyon</th><td>Akciğer ↓</td><td>Kanla dolgun pulmoner kapillerler alveolün genişlemesini engeller. [[K1 s. 83]]</td></tr>
        <tr><th>Pulmoner fibrozis</th><td>Akciğer ↓</td><td>İnterstisyum sertleşir, zor gerilir. [[K1 s. 83]]</td></tr>
        <tr><th>Akciğer hacminin uç değerleri</th><td>Akciğer ↓</td><td>Yüksek hacimde elastik lifler sınırına kadar gerilmiştir; düşük hacimde atelektazi gelişir. [[K1 s. 83]]</td></tr>
        <tr><th>Obezite</th><td>Göğüs kafesi ↓</td><td>Göğüs duvarının artmış ağırlığı toraksın genişlemesine karşı koyar. [[K1 s. 83]]</td></tr>
        <tr><th>Göğüs duvarı deformitesi ya da rijiditesi<br><span class="small muted">kifoskolyoz, ankilozan spondilit</span></th><td>Göğüs kafesi ↓</td><td>Göğüs kafesinin genişlemesi engellenir. [[K1 s. 83]]</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="wrap blk ders-sec" id="d20-laplace">
  <h2>Yüzey gerilimi, Laplace yasası ve sürfaktan</h2>
  <p class="intro">Alveolü örten sıvının yüzey gerilimi alveolü içe doğru büzer ve Laplace yasası gereği en çok küçük alveolü zorlar; sürfaktan yüzey gerilimini, küçük alveolde daha çok olmak üzere, düşürerek akciğer kompliyansını artırır. [[K1 s. 83–84]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Laplace yasası: iki alveol, sürfaktanla ve sürfaktansız</h3></div>
    <div data-viz="f20_laplace"></div>
    <p class="viz-cap" aria-live="polite">Küçük alveolün yarıçapını kaydırın: yüzey gerilimi sabitken gereken basınç P = 2T/r ile artar. "Bağlantıyı aç" ile iki alveol aynı hava yoluna bağlanır; sonra sürfaktanı ekleyip aynı deneyi yineleyin. [[K1 s. 83–84]]</p>
    <p class="viz-foot">Yasa, üç sorun ve DPPC mekanizması kitaptandır [[K1 s. 83–84]]. Yarıçap, yüzey gerilimi ve basınç göreli birimlerdedir; model şematiktir: sürfaktansız yüzey gerilimi sabit, sürfaktanla yarıçapla orantılı kabul edilmiştir, böylece iki alveolde gereken basınç eşitlenir. Molekül ve ok sayıları şematiktir.</p>
  </div>
  <div class="blk-body">
    <p>Yüzey gerilimi su molekülleri arasındaki çekim kuvvetlerinden doğar; bu kuvvetler suyu küresel bir damlacığa çevirip hava–sıvı arayüzünü en aza indirmeye çalışır. Alveolün iç yüzeyi ince bir sıvı tabakasıyla örtülü olduğundan içe doğru bir kuvvet oluşur; buna alveolün transpulmoner basıncı karşı koyar. Yaklaşık küresel alveol Laplace yasasına uyar: tek yüzeyli küre için <b>P = 2T/r</b> (P alveolü açık tutmak için gereken transpulmoner basınç, T yüzey gerilimi, r yarıçap). [[K1 s. 83]]</p>
    <p>Yüzey geriliminin üç sorunu vardır: [[K1 s. 83–84]]</p>
    <ul>
      <li><b>Küçük alveolün kompliyansı düşüktür.</b> Ekspirasyonda yarıçap azalır; T sabitse alveolü yeniden şişirmek için daha büyük transmural basınç gerekir.</li>
      <li><b>Küçük alveol büyüğe boşalır.</b> Bağlı iki alveolden küçüğü açık kalmak için daha yüksek transpulmoner basınç ister; hava yolu basıncı akciğerin her yerinde aynı olduğundan küçük alveol kollabe olur ve havasını büyüğe boşaltır.</li>
      <li><b>Transüdasyon.</b> Yüzey geriliminin içe çekişi, Starling filtrasyon kuvvetleri aracılığıyla interstisyumdan alveole sıvı çeker (Bölüm 36).</li>
    </ul>
    <p><b>Pulmoner sürfaktan</b> bu üç sorunu çözer. Alveol duvarındaki tip II pnömositlerde üretilir; fosfolipitler (en önemlisi dipalmitoilfosfatidilkolin, DPPC) ile proteinlerin, özellikle sürfaktan apolipoproteinlerinin (SP-A, SP-B, SP-C) karışımıdır. Yüzey gerilimini düşürerek (1) akciğerin genel kompliyansını artırır ve genişletme işini azaltır; (2) dağılım biçimi nedeniyle küçük alveolde büyüğe göre daha çok etki eder, Laplace dezavantajını dengeleyip kollaps eğilimini azaltır; (3) interstisyumdan alveole daha az sıvı çekilmesini sağlar. [[K1 s. 84]]</p>
    <p>Yarıçapa bağlı etkinin mekanizması: fosfolipitlerin bir ucu hidrofobik, öbürü hidrofiliktir; bu yüzden alveolü örten sıvının yüzeyine dizilirler. Dizilmiş DPPC molekülleri arasındaki itme kuvvetleri su molekülleri arasındaki çekime karşı koyar ve yüzey gerilimi düşer. Yarıçap küçüldükçe moleküller birbirine yaklaşmak zorunda kalır, itme artar ve yüzey gerilimi daha da düşer. [[K1 s. 84]]</p>
  </div>
  <div class="card clin" style="margin-top:14px">
    <span class="tag clin">Klinik önem</span>
    <h3 style="margin-top:8px">Yenidoğanın solunum sıkıntısı sendromu</h3>
    <p>Sürfaktan intrauterin dönemde yaklaşık 24. haftadan itibaren, kitaba göre annenin kortikosteroid salınımıyla uyarılarak sentezlenir; tam akciğer olgunlaşması yaklaşık 35. haftaya kadar tamamlanmaz. Yenidoğanın solunum sıkıntısı sendromu (IRDS), prematüre bebeğin yetersiz sürfaktanlı akciğerlerle doğmasıdır: kompliyans düşüktür, alveoller kollabe olur ve sıvıyla dolar. Kompliyansı düşük akciğerin artırdığı solunum işine bağlı solunum sıkıntısı, atelektazi ve pulmoner ödem alanları görülür. Tedavi, zaman varsa endojen yapımı uyarmak için doğumdan önce anneye steroid vermek ya da yenidoğanın akciğerine yapay sürfaktan uygulamaktır. Boğulmadan kurtulmada (near-drowning) sürfaktan yıkanıp uzaklaştığı için benzer tablo görülür. [[K1 s. 84]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Sürfaktan yapımının fizyolojik uyarısı esas olarak fetüsün kendi kortizolüdür; annenin kortizolü plasentadaki 11β-hidroksisteroid dehidrogenaz tip 2 ile büyük ölçüde inaktive edilir. Anneye verilen betametazon ve deksametazon bu enzimden büyük ölçüde etkilenmeden plasentayı geçer; antenatal steroidin mantığı budur.</div>
</section>

<section class="wrap blk ders-sec" id="d20-statik">
  <h2>Statik kompliyans ve histerezis</h2>
  <p class="intro">Basınç–hacim eğrisinin eğimi ölçüm tekniğine bağlıdır: statik kompliyans, gaz akımı yokken (kararlı durumda) alınan ölçümlerden çizilen sigmoid eğrinin eğimidir. [[K1 s. 84]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Statik basınç–hacim eğrisini nokta nokta kurun</h3></div>
    <div data-viz="f20_statik"></div>
    <p class="viz-cap" aria-live="polite">Adım adım ilerleyin: önce akım yokken alınan ölçüm noktaları işlenir, sonra sigmoid eğri çizilir. Üçüncü adımda eğrinin herhangi bir noktasındaki eğimi, yani kompliyansı okuyabilirsiniz; dördüncü adım statik histerezisi gösterir. [[K1 s. 84–86]]</p>
    <p class="viz-foot">Ölçüm yöntemi, eğrinin biçimi, normal aralık ve FRC'deki 200 mL/cmH₂O kitaptandır [[K1 s. 82, 84–85]]; RV 1,5 L, FRC 3,0 L ve TLC 6,0 L Bölüm 12'dendir [[K1 s. 50]]. Eğrinin formülü, ölçüm noktalarının basınçları ve histerezis döngüsünün genişliği şematiktir. Akım yokken alveol basıncı atmosfer basıncına eşit olduğundan eğri akciğerin kendi kompliyansını gösterir (aşağıdaki nota bakın).</p>
  </div>
  <div class="blk-body">
    <p>Hasta 500 mL'lik adımlarla soluk alır; adımlar arasındaki duraklamada gaz akımı durur ve intraplevral basınç özofageal balon kateterle ölçülür. Akciğer, giderek negatifleşen intraplevral basınçla doğrusal genişlemez: [[K1 s. 84]]</p>
    <ul>
      <li><b>Az negatif basınç (düşük hacim):</b> eğri yatık, kompliyans düşük. [[K1 s. 84]]</li>
      <li><b>Normal aralık (−5 ile −10 cmH₂O):</b> eğri en dik; transpulmoner basınçtaki küçük değişim büyük hacim değişikliği oluşturur. Akciğer normal tidal solunumda FRC'de en kompliyandır, tidal inspirasyonun işi azdır. [[K1 s. 84–85]]</li>
      <li><b>Çok negatif basınç (yüksek hacim):</b> alveoller zaten iyi şişmiş, elastik sınırlarına yakındır; küçük bir hacim artışı için intraplevral basınç çok düşmelidir, kompliyans yine düşüktür. [[K1 s. 85]]</li>
    </ul>
    <p><b>Histerezis</b>, ölçülen değerin artarken ve azalırken farklı çıkmasıdır. Hacim inspirasyon ve ekspirasyon için ayrı çizildiğinde iki kol farklı yol izler ve bir döngü oluşur (şeklin 4. adımı). Döngü, akciğer hacmindeki değişime karşı viskoz direncin sonucudur; alanı, direnç kuvvetlerini yenmek için ısı olarak harcanan enerjidir. Histerezis hem statik hem dinamik ölçümde görülür. Statik ölçümde akım durduğu için hava yolu direnci payı yoktur; kolların yine ayrılmasını kitap sürfaktanın ve akciğer parankiminin viskoz direncine bağlar. [[K1 s. 85–86]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap bu eğrinin göğüs kafesi ile akciğerin birleşik kompliyansını gösterdiğini yazar; oysa akım yokken alveol basıncı atmosfer basıncına eşit olduğundan intraplevral basınçla çizilen eğri akciğerin kendi kompliyansıdır, birleşik (solunum sistemi) eğrisi ise ventile hastadaki gibi hava yolu (plato) basıncıyla çizilir. Statik histerezisin başlıca nedeni de yüzey gerilimidir: hava–sıvı arayüzü olmayan, serum fizyolojikle doldurulmuş akciğerde histerezis büyük ölçüde kaybolur.</div>
</section>

<section class="wrap blk ders-sec" id="d20-dinamik">
  <h2>Dinamik kompliyans ve dinamik histerezis</h2>
  <p class="intro">Dinamik kompliyans, basınç ve hacim solunum döngüsü boyunca duraklamadan ölçüldüğünde, akımın durduğu iki noktayı (inspirasyon sonu ve ekspirasyon sonu) birleştiren düz çizginin eğimidir. [[K1 s. 85]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Dinamik döngü: solunum sayısı ve hava yolu direnci</h3></div>
    <div data-viz="f20_dinamik"></div>
    <p class="viz-cap" aria-live="polite">Solunum sayısını değiştirin ve normal hava yoluyla akut astımı karşılaştırın. Döngü hava yolu direncini yenmek için harcanan enerjiyi, akımın durduğu iki noktayı birleştiren çizgi dinamik kompliyansı gösterir; kesik çizgi statik eğimdir. [[K1 s. 85–86]]</p>
    <p class="viz-foot">Tanımlar, döngü alanının anlamı ve astım örneği kitaptandır [[K1 s. 85–86]]. Model şematiktir: kompliyansları eşit (0,1 L/cmH₂O) iki paralel akciğer birimi, ortak ve ayrı hava yolu dirençleri, sinüs biçimli plevral basınç; tidal hacim her durumda 500 mL, statik eğride FRC'deki intraplevral basınç −5 cmH₂O. Normal hava yolunda dinamik kompliyansın solunum sayısıyla değişmemesi kitaptan farklıdır, aşağıdaki notta açıklanır. Döngü alanı, 10/dk ve normal hava yoluna göre kat olarak verilir.</p>
  </div>
  <div class="blk-body">
    <p>Kitaba göre bu eğim statik eğrininkinden her zaman küçüktür ve azalma hava yolu direncinden kaynaklanır; statik ile dinamik kompliyans arasındaki fark, hava yollarının akım direncinin dolaylı bir ölçüsü olarak kullanılabilir. [[K1 s. 85]]</p>
    <p>Hava yolu direnci gaz akımı hızlandıkça artar. Kitap, iletici hava yollarındaki akımın inspirasyon ve ekspirasyon başında en hızlı ve en türbülan olduğunu, bu yüzden direncin en büyük, kompliyansın en düşük ve eğrinin en yatık olduğunu yazar. Tidal hacim aynı kalıp solunum sayısı artarsa inspirasyon daha kısa sürede olur: akım hızlanır, direnç artar ve dinamik kompliyans düşer. Akut astım gibi hava yolu direncini artıran durumlar dinamik kompliyansı daha da düşürür ve döngüyü genişletir (kitaptaki örnekler 10/dk ve astımda 30/dk). [[K1 s. 85–86]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Dinamik kompliyans akımın sıfır olduğu noktalardan hesaplandığı için sağlıklı akciğerde statik değere yakındır ve solunum sayısıyla belirgin düşmez; düşüş, astımdaki gibi direnci artmış birimlerin kısa inspirasyonda dolamamasından doğar (kompliyansın frekans bağımlılığı), kitabın "fark direncin ölçüsüdür" yargısı bu anlamda geçerlidir. İnspirasyon ve ekspirasyon başında ise akım en hızlı değil sıfırdır: döngünün oradaki yatıklığı hacmin henüz değişmemesindendir ve döngünün anlık eğimi kompliyans değildir.</div>
</section>

<section class="wrap blk ders-sec" id="d20-bolgesel">
  <h2>Statik eğri ve bölgesel ventilasyon: tepe ve taban</h2>
  <p class="intro">Yerçekimi yüzünden tepe ve taban alveolleri statik eğrinin farklı bölümlerinde durur; aynı basınç değişimi eğrinin dik bölümündeki tabanı daha çok şişirir, bu yüzden taban daha iyi ventile olur. [[K1 s. 86–87]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Aynı 3 cmH₂O, farklı hacim: tepe ve taban</h3></div>
    <div data-viz="f20_bolgesel"></div>
    <p class="viz-cap" aria-live="polite">FRC'yi ve inspirasyon sonunu karşılaştırın ya da oynatın: iki bölge de 3 cmH₂O sağa kayar, tabandaki hacim artışı çok daha büyüktür. [[K1 s. 86–87]]</p>
    <p class="viz-foot">Basınç değerleri kitaptandır [[K1 s. 86–87]]. Eğri tek bir akciğer bölgesi için şematiktir; hacimler o bölgenin en büyük hacminin yüzdesidir ve statik eğri bileşenindeki bütün akciğer eğrisiyle aynı ölçekte değildir.</p>
  </div>
  <div class="blk-body">
    <p>Akciğer parankimi yukarıdan aşağıya eşit dağılmaz; yerçekimi parankime etki eder ve intraplevral basınç tepede daha negatif (tipik olarak −10 cmH₂O), tabanda daha az negatiftir (tipik olarak −3 cmH₂O). FRC'de (tidal ekspirasyon sonu) tepe alveolleri neredeyse en büyük hacimlerinde, taban alveolleri ise çok az şişmiştir; bu yüzden tepe için bazen "daha havalı" denir. [[K1 s. 86–87]]</p>
    <p>Tidal inspirasyonda inspiratuvar kaslar intraplevral basıncı plevra boşluğunun her yerinde 3 cmH₂O düşürür: tepede −13, tabanda −6 cmH₂O'ya. Bu değişim tabanda çok daha büyük hacim artışı oluşturur: taban daha kompliyandır (eğrisi daha dik) ve tepeden daha iyi ventile olur. [[K1 s. 87]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d20-peep">
  <h2>Klinik önemi: en uygun PEEP</h2>
  <p class="intro">Statik kompliyans eğrisi yoğun bakımda en uygun ekstrinsik pozitif ekspirasyon sonu basıncını (PEEP) belirlemeye yarar: tidal ventilasyon eğrinin en kompliyan, yani en dik bölümünde yapılmalıdır. [[K1 s. 87]]</p>
  <div class="viz">
    <div class="viz-head"><h3>PEEP ve tidal hacim: soluk eğrinin neresinde?</h3></div>
    <div data-viz="f20_peep"></div>
    <p class="viz-cap" aria-live="polite">PEEP'i ve tidal hacmi değiştirin: kalın çizgi, tidal soluğun şematik bir ARDS eğrisi üzerinde PEEP'ten plato basıncına kadar kapladığı bölümdür. [[K1 s. 87]]</p>
    <p class="viz-foot">Kurallar ve 6 mL/kg kitaptandır [[K1 s. 87]]; plato basıncı için 30 cmH₂O sınırı Bölüm 12'dendir [[K1 s. 51]]. ARDS eğrisi şematiktir: hacim, sıfır PEEP'teki dinlenme hacminin üstündeki hacimdir; infleksiyon noktaları eğimin en hızlı değiştiği yerlerdir (≈10 ve ≈26 cmH₂O). Hasta 70 kg alınmıştır. Basınçlar akımın durduğu plato basınçlarıdır; hava yolu direncinin payı gösterilmez.</p>
  </div>
  <div class="blk-body">
    <p>Bunun için ekspirasyon sonu noktası alt infleksiyon noktasının üstünde, inspirasyon sonu noktası ise akciğerin aşırı şişmesini önlemek için üst infleksiyon noktasının altında olmalıdır. Sağlıklı akciğerde alt infleksiyon noktası yaklaşık 5 cmH₂O'dadır; bu, larinksin oluşturduğu fizyolojik PEEP ile hemen hemen aynıdır (Bölüm 7). ARDS gibi kompliyansı belirgin azaltan hastalıklarda eğri belirgin biçimde değişir; PEEP alt infleksiyon noktasının hemen üstüne ayarlanırsa tidal solunum eğrinin daha kompliyan bölümüne kayar. [[K1 s. 87]]</p>
    <p>Pratikte bu zordur: ARDS'li hastada statik ölçüm (500 mL'lik adımlar, akımın durup intraplevral basıncın ölçülmesi için duraklamalar) yaşamı tehdit eden hipoksemiye yol açabilir; dinamik kompliyans da alt infleksiyon noktasını bulmak için ideal değildir. Bu yüzden PEEP klinik yargıyla artırılır: yoğun bakım hekimi, 6 mL/kg tidal hacmin "güvenli" tepe ve plato hava yolu basınçlarıyla verilebildiği noktayı arar. [[K1 s. 87]] Bölüm 12'deki sınırlar: tepe basıncı 35 cmH₂O'nun, plato basıncı 30 cmH₂O'nun altında. [[K1 s. 51]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d20-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok sayılar ve yönler üzerinden sorulur: 1/RC denklemi ve 200, 200, 100 mL/cmH₂O değerleri, hangi durumun hangi bileşenin kompliyansını artırıp azalttığı, Laplace yasası, sürfaktanın kaynağı, bileşimi, rolleri ve mekanizması, IRDS, statik ve dinamik kompliyansın nasıl ölçüldüğü, histerezis döngüsünün anlamı, tepe ile taban arasındaki fark ve en uygun PEEP kuralı. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz20-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz20-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz20-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d20-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Akciğer kompliyansını tanımlayın. Statik ve dinamik kompliyans nasıl ölçülür, aralarındaki fark nedir? Statik basınç–hacim eğrisini yoğun bakımda PEEP ayarlarken nasıl kullanırsınız?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım.</b> Transpulmoner basınçtaki birim değişimin oluşturduğu hacim değişimi; basınç–hacim eğrisinin eğimi. FRC'de en yüksek: 200 mL/cmH₂O, 500 mL için 2,5 cmH₂O. Yüksek kompliyans: az basınç ama az elastik geri çekilme, zor ekspirasyon. Düşük kompliyans: yüksek basınç, artmış iş, solunum yetmezliği. [[K1 s. 82]]</li>
    <li><b>Solunum sistemi.</b> 1/RC = 1/LC + 1/TCC; 200 ve 200 → 100 mL/cmH₂O. Göğüs kafesi: duvarın biçimi, kas tonusu. Akciğer: elastik geri çekilme, yüzey gerilimi. Örnekler: amfizem, yaş ve nöromüsküler hastalıkta artar; fibrozis, ödem, atelektazi, obezite, ileri gebelik, kifoskolyozda azalır. [[K1 s. 82–83]]</li>
    <li><b>Yüzey gerilimi ve sürfaktan.</b> Laplace: P = 2T/r. Üç sorun: küçük alveolün düşük kompliyansı, küçükten büyüğe boşalma, transüdasyon. Sürfaktan: tip II pnömosit, DPPC ve SP-A/B/C; T'yi genel olarak ve küçük alveolde daha çok azaltır, transüdasyonu önler. IRDS. [[K1 s. 83–84]]</li>
    <li><b>Statik kompliyans.</b> Akım yokken ölçülür: 500 mL'lik adımlar, duraklama, özofageal balon kateterle intraplevral basınç. Sigmoid eğri: düşük hacimde yatık, −5 ile −10 cmH₂O arasında en dik, yüksek hacimde yeniden yatık. [[K1 s. 84–85]]</li>
    <li><b>Dinamik kompliyans.</b> Sürekli ölçüm; akımın sıfır olduğu iki nokta (inspirasyon ve ekspirasyon sonu) birleştirilir. Statikten düşüktür; fark hava yolu direncinin dolaylı ölçüsüdür; akut astımda belirgin düşer. Sağlıklı akciğerde statiğe yakın olduğunu ekleyin (Atlas notu). [[K1 s. 85–86]]</li>
    <li><b>Histerezis.</b> Artarken ve azalırken farklı yol; döngü alanı ısı olarak harcanan enerji. Dinamik: hava yolu direnci, hızlı solunum ve astımda geniş döngü. Statik: akım olmadan da vardır (kitap: sürfaktan ve parankimin viskoz direnci). Bölgesel fark: FRC'de tepe −10, taban −3 cmH₂O; taban daha iyi ventile. [[K1 s. 85–87]]</li>
    <li><b>Klinikle bitirin: en uygun PEEP.</b> Tidal soluk eğrinin en dik bölümünde: ekspirasyon sonu alt infleksiyon noktasının üstünde, inspirasyon sonu üst infleksiyon noktasının altında. Pratikte ARDS'de statik ölçüm tehlikeli; PEEP klinik yargıyla, 6 mL/kg ve güvenli tepe ve plato basınçlarıyla ayarlanır. [[K1 s. 87]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim statik basınç–hacim eğrisidir: yatay eksende intraplevral basınç (+5'ten sağa doğru −30 cmH₂O'ya), dikey eksende akciğer hacmi; RV, FRC ve TLC işaretli, ortası dik, iki ucu yatık sigmoid; FRC'de 500 mL / 2,5 cmH₂O üçgeni; tepe (−10 → −13) ve taban (−3 → −6) noktaları. İkinci çizim olarak dinamik döngüyü ve akımın sıfır olduğu iki noktayı birleştiren çizgiyi, astımda daha geniş döngü ve daha yatık çizgiyle gösterin.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Solunum sistemi kompliyansı nasıl hesaplanır, neden her iki bileşenden de küçüktür? Laplace yasasını yazın; alveol için neden 2T/r? Sürfaktan nerede yapılır, neyden oluşur, yüzey gerilimini nasıl ve neden küçük alveolde daha çok azaltır? IRDS nasıl gelişir, nasıl tedavi edilir? Dinamik kompliyans neden astımda düşer? Histerezis döngüsünün alanı neyi gösterir? Taban neden tepeden daha iyi ventile olur? PEEP'i neye göre ayarlarsınız? Cevapların hepsi yukarıda. [[K1 s. 82–87]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d20-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Kompliyans = Δhacim / Δtranspulmoner basınç, yani basınç–hacim eğrisinin eğimi. Yüksekse az basınç gerekir ama elastik geri çekilme azalır ve ekspirasyon zorlaşır; düşükse yüksek basınç ve artmış iş gerekir, solunum yetmezliği gelişebilir. [[K1 s. 82]]</li>
    <li>Akciğer FRC'de en kompliyandır: 200 mL/cmH₂O, 500 mL için 2,5 cmH₂O. 1/RC = 1/LC + 1/TCC; 200 ve 200 mL/cmH₂O için RC 100 mL/cmH₂O. [[K1 s. 82]]</li>
    <li>Kompliyansı artıranlar: amfizem, ileri yaş, nöromüsküler hastalık. Azaltanlar: sırtüstü pozisyon, ileri gebelik, alveol ya da interstisyumda sıvı, atelektazi, pulmoner hipertansiyon, pulmoner fibrozis, akciğer hacminin uç değerleri, obezite, göğüs duvarı deformitesi. [[K1 s. 83]]</li>
    <li>Laplace yasası, P = 2T/r: küçük alveol daha düşük kompliyanslıdır, büyüğe boşalır; yüzey gerilimi interstisyel sıvıyı alveole çeker (transüdasyon). [[K1 s. 83–84]]</li>
    <li>Sürfaktan tip II pnömositlerde yapılır (DPPC; SP-A, SP-B, SP-C). Yüzey gerilimini genel olarak ve küçük alveolde daha çok azaltır, transüdasyonu önler. Yetersizliği IRDS'ye yol açar: yaklaşık 24. haftada yapım başlar, olgunlaşma yaklaşık 35. haftada tamamlanır; tedavi antenatal steroid ya da yapay sürfaktandır. [[K1 s. 84]]</li>
    <li>Statik kompliyans akım yokken (500 mL'lik adımlar, özofageal balon) ölçülür; eğri sigmoiddir ve −5 ile −10 cmH₂O arasında en diktir. Dinamik kompliyans akımın sıfır olduğu iki noktadan hesaplanır, statikten düşüktür; fark hava yolu direncini yansıtır ve astımda belirginleşir. [[K1 s. 84–86]]</li>
    <li>Histerezis döngüsünün alanı ısı olarak harcanan enerjidir; dinamik ve statik ölçümde görülür. FRC'de tepe daha şişkin (−10 cmH₂O), taban daha az şişkindir (−3 cmH₂O); inspirasyonda taban daha çok genişler, daha iyi ventile olur. [[K1 s. 85–87]]</li>
    <li>En uygun PEEP: ekspirasyon sonu alt infleksiyon noktasının üstünde, inspirasyon sonu üst infleksiyon noktasının altında. Pratikte klinik yargıyla, 6 mL/kg tidal hacim ve güvenli tepe ve plato basınçlarıyla ayarlanır. [[K1 s. 87]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="20"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/19">← Bölüm 19 · Oksijen kaskadı</a>
    <a href="#/dersler/fizyoloji/21">Sonraki: Bölüm 21 · Solunum işi →</a>
  </nav>
</section>`,
};
