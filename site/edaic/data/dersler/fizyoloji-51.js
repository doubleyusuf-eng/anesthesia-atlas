/* Fizyoloji Bölüm 51 · İstirahat membran potansiyeli (K1 İngilizce baskı s. 221–224).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz51-1'] = {
  no: 1, kok: 'İstirahat membran potansiyeli (RMP) ve iyon dağılımı için:', kagit: 'Paper A · fizyoloji, Bölüm 51', kaynak: '[[K1 s. 221–222]]',
  onermeler: [
    { t: 'Membran potansiyeli, hücre dışının hücre içine göre elektriksel gerilimidir.', d: false, n: 'Yanlış. Tersidir: hücre içinin hücre dışına göre gerilimidir. [[K1 s. 221]]' },
    { t: 'İskelet kası hücresinin RMP\'si sinir hücresininkinden daha negatiftir.', d: true, n: 'Doğru. Sinirde ≈ −70 mV, iskelet kasında ≈ −90 mV; uyarılamayan hücrelerde ≈ −30 mV. [[K1 s. 221]]' },
    { t: 'K⁺ iyonları fosfolipid çift tabakadan doğrudan geçerek hücreyi terk eder.', d: false, n: 'Yanlış. Polar oldukları için çift tabakadan geçemezler; açık K⁺ sızıntı kanallarından (iki gözenekli K⁺ kanalları) çıkarlar. [[K1 s. 221]]' },
    { t: 'İstirahatteki zarın Na⁺ geçirgenliği K⁺ geçirgenliğinin yaklaşık yüzde biridir.', d: true, n: 'Doğru. K⁺ sızıntı kanalları K⁺\'ya tam özgü olmadığından az miktarda Na⁺ geçer; geçirgenlik ≈ 100 kat düşüktür. [[K1 s. 221]]' },
    { t: 'Kas hücresinde Cl⁻ hareketi RMP\'yi belirleyen başlıca etkendir.', d: false, n: 'Yanlış. Kasta Cl⁻ kanalları açıktır ama Cl⁻ elektrokimyasal gradyanına göre pasif dağılır: RMP Cl⁻\'yi yönlendirir, tersi değil. Cl⁻ yalnız "balast" gibi RMP değişikliğini zorlaştırır. [[K1 s. 221–222]]' },
  ],
};
VERI.sorular['fiz51-2'] = {
  no: 2, kok: 'Nernst ve Goldman–Hodgkin–Katz (GHK) denklemleri için:', kagit: 'Paper A · fizyoloji, Bölüm 51', kaynak: '[[K1 s. 222–223]]',
  onermeler: [
    { t: 'Nernst denklemi bir iyonun değerliğini, zarın iki yanındaki derişimlerini ve sıcaklığı kullanır.', d: true, n: 'Doğru. E<sub>X</sub> = (RT/zF) · ln([X]o/[X]i). [[K1 s. 222]]' },
    { t: '37 °C\'de, ICF K⁺ 150 ve ECF K⁺ 5 mmol/L iken E<sub>K</sub> yaklaşık +90 mV\'dir.', d: false, n: 'Yanlış. ln(5/150) negatif olduğundan E<sub>K</sub> ≈ −90 mV\'dir. [[K1 s. 222]]' },
    { t: 'GHK denkleminde Cl⁻ derişimleri, negatif değerliği nedeniyle K⁺ ve Na⁺\'ya göre ters yazılır.', d: true, n: 'Doğru. Üstteki terimde (pay) [Cl⁻]i, paydada [Cl⁻]o bulunur. [[K1 s. 223]]' },
    { t: 'GHK denkleminde değerlik terimi bulunur, çünkü Ca²⁺ de hesaba katılır.', d: false, n: 'Yanlış. Yalnız tek değerlikli iyonlar (K⁺, Na⁺, Cl⁻) alındığından değerlik terimi yoktur. [[K1 s. 223]]' },
    { t: 'P<sub>Na</sub> ve P<sub>Cl</sub> sıfır alınırsa GHK denklemi K⁺ için Nernst denklemine indirgenir.', d: true, n: 'Doğru. Zar yalnız K⁺\'ya geçirgen olur. [[K1 s. 223]]' },
  ],
};
VERI.sorular['fiz51-3'] = {
  no: 3, kok: 'Na⁺/K⁺-ATPaz ve elektrolit bozukluklarının RMP\'ye etkisi için:', kagit: 'Paper A · fizyoloji, Bölüm 51', kaynak: '[[K1 s. 223–224]]',
  onermeler: [
    { t: 'Na⁺/K⁺-ATPaz her döngüde hücre içine üç K⁺ alıp dışarı iki Na⁺ verir.', d: false, n: 'Yanlış. Üç Na⁺ dışarı, iki K⁺ içeri; her döngüde hücre bir pozitif yük kaybeder. [[K1 s. 223]]' },
    { t: 'Pompanın elektrojenik etkisi hücre içini yaklaşık 3–6 mV daha negatif yapar.', d: true, n: 'Doğru. Etkinin büyüklüğü zarın toplam direncine bağlıdır. [[K1 s. 223]]' },
    { t: 'Hipokalemi zarı hiperpolarize eder ve iskelet kasında güçsüzlük yapar.', d: true, n: 'Doğru. Aksiyon potansiyeli oluşturmak ve yaymak güçleşir; kalpte K⁺ kanallarının doğrudan inhibisyonu QT\'yi uzatır. [[K1 s. 223]]' },
    { t: 'Hiponatremi, ECF Na⁺\'sı düştüğü için RMP\'yi doğrudan hiperpolarize eder.', d: false, n: 'Yanlış. İstirahatte zar Na⁺\'ya görece geçirgen olmadığından doğrudan etki azdır; hücre şişer, hücre içi K⁺ seyrelir ve zar eşiğe doğru depolarize olur. [[K1 s. 224]]' },
    { t: 'Hipokalsemi eşik potansiyelini RMP\'ye yaklaştırarak tetani, parestezi ve aritmiye yatkınlık yapar.', d: true, n: 'Doğru. Ca²⁺ istirahatte RMP\'ye doğrudan katılmaz; yüzey yükü yoluyla zarı stabilize eder. [[K1 s. 224]]' },
  ],
};

const D51_NAV = [
  ['d51-olusum', 'Potansiyel nasıl oluşur?'], ['d51-iyon', 'K⁺, Na⁺, Cl⁻'], ['d51-nernst', 'Nernst denklemi'], ['d51-ghk', 'RMP ve GHK'],
  ['d51-pompa', 'Na⁺/K⁺-ATPaz'], ['d51-kalyum', 'Potasyum bozuklukları'], ['d51-naca', 'Sodyum ve kalsiyum'],
  ['d51-p1', 'Part I'], ['d51-p2', 'Part II'], ['d51-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/51'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 4 · Nörofizyoloji · Bölüm 51', baslik: 'İstirahat membran potansiyeli',
  lede: 'Dinlenen hücrenin içi dışına göre negatiftir; bunu iyon derişim farkları, zarın seçici geçirgenliği ve Na⁺/K⁺-ATPaz yaratır. Potasyum belirleyicidir; bu yüzden elektrolit bozuklukları uyarılabilirliği değiştirir. [[K1 s. 221–224]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D51_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d51-olusum">
  <h2>Membran potansiyeli nasıl oluşur?</h2>
  <p class="intro">Membran potansiyeli hücre içinin dışına göre gerilimidir; zarın iki yanında yüklü iyonlar eşit dağılmadığında sıfırdan farklı olur. [[K1 s. 221]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Yük ayrımı ve potansiyelin işareti</h3></div>
    <div data-viz="f51_yuk"></div>
    <p class="viz-cap" aria-live="polite"><b>Eşit dağılım.</b> Zarın iki yanında pozitif ve negatif yükler tam eşitse potansiyel 0 mV'dir. Katyonları kaydırın ya da bir hücre tipi seçin. [[K1 s. 221]]</p>
    <p class="viz-foot">Şematik: iyon sayıları temsilîdir; RMP değerleri kitaptandır [[K1 s. 221]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Dağılımı üç şey belirler: ICF ile ECF'nin farklı iyon bileşimi, zarın iyonlara seçici geçirgenliği ve hücre içindeki negatif yüklü büyük proteinler. Proteinler zardan geçemez; katyonları tutar, anyonları iter. Dışarıda daha çok pozitif yük varsa potansiyel negatif, içeride daha çok varsa pozitiftir. [[K1 s. 221]]</p>
    <p>Dinlenen hücrenin RMP'si negatiftir ve uyarılabilir hücrelerde daha derindir: sinirde −70, iskelet kasında −90 mV; uyarılamayan hücrelerde ≈ −30 mV. Uyarılan hücrede aksiyon potansiyeli, yani RMP'den pozitif değere geçici sıçrama (depolarizasyon) olur (Bölüm 52). [[K1 s. 221]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d51-iyon">
  <h2>Üç ana iyon: derişim farkı ve geçirgenlik</h2>
  <p class="intro">RMP'yi en çok K⁺, Na⁺ ve Cl⁻'nin derişimleri ve zarın bunlara geçirgenliği belirler; istirahatte zar en çok K⁺'ya geçirgendir. [[K1 s. 221]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hangi iyon nerede, hangi yoldan geçer?</h3></div>
    <div data-viz="f51_iyon"></div>
    <p class="viz-cap" aria-live="polite"><b>K⁺.</b> İçeride 150, dışarıda 5 mmol/L. Polar olduğu için çift tabakadan geçemez; açık sızıntı kanallarından gradyanı yönünde dışarı çıkar. Bir iyon seçin. [[K1 s. 221]]</p>
    <p class="viz-foot">Geçirgenlik çubukları logaritmik ve K⁺'ya göredir; derişimler ve oranlar kitaptandır [[K1 s. 221]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>K⁺ sızıntı kanallarına iki gözenek bölgeli (two-pore-domain) K⁺ kanalları da denir. Na⁺ dışarıda 140, içeride 20 mmol/L'dir; Na⁺ kanalları RMP'de kapalıdır. Yine de zar Na⁺'ya bütünüyle kapalı değildir: sızıntı kanalları K⁺'ya tam özgü olmadığından Na⁺ geçirgenliği K⁺'nınkinin ≈ yüzde biridir. [[K1 s. 221]]</p>
    <p>Cl⁻ geçirgenliği hücre tipine göre değişir. Nöronda K⁺'nınkinin ≈ binde biridir ve çoğu kez göz ardı edilir. Kasta açık Cl⁻ kanalları vardır: Cl⁻ elektrokimyasal gradyanına göre pasif dağılır, RMP'de negatif iç onu dışarı iter, depolarizasyonda içeri girer. Yani RMP Cl⁻'yi yönlendirir; Cl⁻ ise bir "balast" gibi RMP'nin değişmesini zorlaştırıp zarı stabilize eder. [[K1 s. 221–222]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d51-nernst">
  <h2>Nernst denklemi: tek iyonun denge potansiyeli</h2>
  <p class="intro">Zardan geçebilen bir iyon, kimyasal ve elektriksel gradyanları birbirini sıfırlayana, yani elektrokimyasal dengeye ulaşana dek hareket eder; o noktadaki gerilim Nernst potansiyelidir. [[K1 s. 222]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>K⁺ çıkar, iç negatifleşir, akım durur</h3></div>
    <div data-viz="f51_nernst"></div>
    <p class="viz-cap" aria-live="polite"><b>Başlangıç.</b> Yalnız K⁺ kanalları açık; içeride 150, dışarıda 5 mmol/L K⁺ var. Oynatın ya da ECF K⁺'yı değiştirin. [[K1 s. 222]]</p>
    <p class="viz-foot">Model: 37 °C (310 K), RT/F ≈ 26,7 mV; hesaplanan değerler denklemle bulunur. Kitap E<sub>K</sub> ≈ −90, E<sub>Na</sub> ≈ +50, E<sub>Cl</sub> ≈ −70 mV verir [[K1 s. 222]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <div class="card f51-denk" style="text-align:center;font-size:18px;margin:4px 0 12px"><span class="tag basic">Temel denklem · Nernst</span><p style="margin-top:8px">E<sub>X</sub> = (RT / zF) · ln ([X]<sub>o</sub> / [X]<sub>i</sub>)</p></div>
    <p>E<sub>X</sub> mV cinsinden Nernst potansiyeli; R evrensel gaz sabiti (8,314 J K⁻¹ mol⁻¹), T mutlak sıcaklık (K), F Faraday sabiti (bir mol elektronun yükü, 96 500 C/mol), z değerlik, [X]<sub>o</sub> ve [X]<sub>i</sub> hücre dışı ve içi derişim (mmol/L). 37 °C'de K⁺ için ln(5/150) ile E<sub>K</sub> ≈ −90 mV; Na⁺ için +50, Cl⁻ için −70 mV bulunur. [[K1 s. 222]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d51-ghk">
  <h2>RMP neden E<sub>K</sub>'ya yakın? Goldman–Hodgkin–Katz denklemi</h2>
  <p class="intro">Membran potansiyeli, zarın en çok geçirgen olduğu iyonun Nernst potansiyeline çekilir; istirahatte bu K⁺'dır. [[K1 s. 222]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Geçirgenlikleri değiştirin, E<sub>m</sub> nereye gider?</h3></div>
    <div data-viz="f51_ghk"></div>
    <p class="viz-cap" aria-live="polite"><b>İstirahatteki nöron.</b> P<sub>K</sub> yüksek, P<sub>Na</sub> ve P<sub>Cl</sub> düşük: E<sub>m</sub> E<sub>K</sub>'nın yakınındadır. Bir hazır ayar seçin ya da geçirgenlikleri kaydırın. [[K1 s. 222–223]]</p>
    <p class="viz-foot">Model: 37 °C, K⁺ ve Na⁺ derişimleri kitaptan; Cl⁻ derişimleri kitapta yoktur, E<sub>Cl</sub> = −70 mV verecek temsilî değerler (dış 110, iç 8 mmol/L) alınmıştır. Kitabın oranlarıyla (P<sub>Na</sub>/P<sub>K</sub> 0,01, P<sub>Cl</sub>/P<sub>K</sub> 0,001) model ≈ −84 mV verir; ölçülen nöron RMP'si −70 mV'dir [[K1 s. 221–223]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>K⁺ gradyanı yönünde çıktıkça iç negatifleşir ve doğan ters elektriksel gradyan daha fazla çıkışı sınırlar; potansiyel E<sub>K</sub>'ya yaklaşır. Na⁺ geçirgenliği çok düşük olduğundan Na⁺ dağılımının katkısı azdır. Bu yüzden ölçülen nöron RMP'si (−70 mV) E<sub>K</sub>'ya yakındır. [[K1 s. 222]]</p>
    <p>Nernst denklemi zarın yalnız o iyona geçirgen olduğunu varsayar. Zar birçok iyona farklı geçirgen olduğu için RMP'yi bütün geçirgenlik ve derişimleri hesaba katan GHK denklemi daha kesin verir: [[K1 s. 222]]</p>
    <div class="card f51-denk" style="text-align:center;font-size:16px;margin:4px 0 12px;overflow-wrap:anywhere"><span class="tag basic">Temel denklem · Goldman–Hodgkin–Katz</span><p style="margin-top:8px">E<sub>m</sub> = (RT / F) · ln [(P<sub>K</sub>[K⁺]<sub>o</sub> + P<sub>Na</sub>[Na⁺]<sub>o</sub> + P<sub>Cl</sub>[Cl⁻]<sub>i</sub>) / (P<sub>K</sub>[K⁺]<sub>i</sub> + P<sub>Na</sub>[Na⁺]<sub>i</sub> + P<sub>Cl</sub>[Cl⁻]<sub>o</sub>)]</p></div>
    <p>P<sub>X</sub>, zarın X iyonuna geçirgenliğidir. P<sub>Na</sub> = P<sub>Cl</sub> = 0 olursa denklem K⁺ için Nernst denklemine indirgenir. Yalnız tek değerlikli iyonlar alındığı için değerlik terimi yoktur; Cl⁻ derişimleri negatif değerliği nedeniyle K⁺ ve Na⁺'nınkilere göre ters yazılır. [[K1 s. 222–223]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d51-pompa">
  <h2>Na⁺/K⁺-ATPaz RMP'ye nasıl katkı yapar?</h2>
  <p class="intro">Pompa her döngüde üç Na⁺'yı dışarı, iki K⁺'yı içeri taşır; RMP'yi asıl yaratan derişim farklarını korur, kendisi de küçük bir negatiflik ekler. [[K1 s. 223]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Pompa döngüsü ve üç sonucu</h3></div>
    <div data-viz="f51_pompa"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Üç Na⁺ bağlanır.</b> Pompanın iç yüzüne üç Na⁺ oturur. Adım adım ilerletin. [[K1 s. 223]]</p>
    <p class="viz-foot">Şematik döngü; pompanın biçimi ve adım bölünmesi temsilîdir. 3:2 oranı ve −3 ile −6 mV kitaptandır [[K1 s. 223]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Derişim gradyanları:</b> dışarıda yüksek Na⁺, içeride yüksek K⁺ pompayla sürer ve sonuçta RMP'yi bunlar oluşturur. <b>Ozmotik denge:</b> geçemeyen dış Na⁺'nın ozmotik etkisi, içerideki yüksek negatif yüklü proteininkini dengeler. <b>Elektrojenik etki:</b> her döngü hücreden net bir pozitif yük çıkarır ve içeriyi zar direncine bağlı olarak ≈ 3–6 mV hiperpolarize eder. [[K1 s. 223]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d51-kalyum">
  <h2>Klinik önem: potasyum bozuklukları</h2>
  <p class="intro">RMP iyon derişimlerine bağlı olduğu için ECF iyon değişiklikleri RMP'yi kaydırır; en güçlü etki K⁺'dan gelir. [[K1 s. 223]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>ECF K⁺ değişince RMP, eşik ve EKG</h3></div>
    <div data-viz="f51_kalyum"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal.</b> RMP ile eşik potansiyeli arasında güvenli bir fark var. ECF K⁺'yı kaydırın. [[K1 s. 223]]</p>
    <p class="viz-foot">Model: E<sub>K</sub> Nernst denklemiyle (37 °C, ICF K⁺ 150 mmol/L) hesaplanır; RMP, eşik ve EKG biçimleri şematiktir (Şekil 51.1'den esinlenilmiştir) [[K1 s. 223]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Hiperkalemi</b> RMP'yi depolarize eder: kitaba göre ECF K⁺ 4,0'dan 7,5 mmol/L'ye çıkınca E<sub>K</sub> −90'dan −80 mV'ye gelir. RMP eşik potansiyeline (aksiyon potansiyelinin tetiklendiği gerilim) yaklaşır ve geçici olarak kendiliğinden aksiyon potansiyeli kolaylaşır. ECF K⁺ başka kanalların kinetiğini de, özellikle kalpte repolarizasyon fazında değiştirir: yüksek, sivri T dalgaları; ventriküler fibrilasyon gibi tehlikeli aritmiler gelişebilir. [[K1 s. 223]]</p>
    <p><b>Hipokalemi</b> zarı hiperpolarize eder: aksiyon potansiyeli oluşturmak ve yaymak güçleşir, iskelet kası güçsüzleşir. Kalpte K⁺ kanallarını doğrudan inhibe ederek QT'yi proaritmik biçimde uzatır. [[K1 s. 223]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitabın kendi denklemiyle (37 °C, ICF K⁺ 150 mmol/L) ECF K⁺ 4,0 mmol/L'de E<sub>K</sub> ≈ −97 mV'dir; −90 mV, 5 mmol/L'nin değeridir. 7,5 mmol/L'deki −80 mV doğrudur, yani kayma ≈ 17 mV'dir.</div>
</section>

<section class="wrap blk ders-sec" id="d51-naca">
  <h2>Klinik önem: sodyum ve kalsiyum</h2>
  <p class="intro">Na⁺ ve Ca²⁺ istirahatte zardan pek geçmediği için RMP'ye doğrudan katılmaz; etkileri dolaylıdır: Na⁺ hücre suyu üzerinden, Ca²⁺ yüzey yükü üzerinden. [[K1 s. 224]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hiponatremi ve hipokalsemi: iki dolaylı yol</h3></div>
    <div data-viz="f51_naca"></div>
    <p class="viz-cap" aria-live="polite"><b>Hiponatremi · 1.</b> ECF ozmolaritesi düşer, su hücreye girer ve hücre şişer. Adım adım ilerletin ya da hipokalsemiye geçin. [[K1 s. 224]]</p>
    <p class="viz-foot">Şematik; hücre hacmi ve gerilim kaymaları temsilîdir [[K1 s. 223–224]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Hiponatremi</b> suyun vücuttaki dağılımını değiştirir (Bölüm 69). Düşük ECF ozmolaritesi hücreleri şişirir; ağır hiponatremide serebral ödem olur. Hücreye giren su içerideki K⁺'yı seyreltir, zar eşiğe doğru depolarize olur ve kendiliğinden aksiyon potansiyeli kolaylaşır. Hiponatremiye bağlı serebral ödemin nöbetle ilişkisini bu kısmen açıklar. [[K1 s. 224]]</p>
    <p><b>Ca²⁺</b> "yüzey yükü hipotezi"yle zarı stabilize eder: zarın dış yüzündeki glikoproteinlere bağlanır, zara bitişik pozitif yükü artırır ve zarı genel RMP'ye göre hiperpolarize eder. <b>Hipokalsemide</b> eşik potansiyeli RMP'ye yaklaşır, uyarılabilirlik artar: tetani, parestezi ve aritmi. Hiperkalemide Ca²⁺ kardiyoproteksiyon için verilir ve altta yatan nedeni düzeltmeye zaman kazandırır. [[K1 s. 224]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d51-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: RMP'nin tanımı ve hücre tiplerine göre değerleri, K⁺, Na⁺ ve Cl⁻ derişimleri ve geçirgenlik oranları, Nernst ve GHK denklemlerinin terimleri, E<sub>K</sub>, E<sub>Na</sub>, E<sub>Cl</sub>, Na⁺/K⁺-ATPaz'ın 3:2 oranı ve üç sonucu, K⁺, Na⁺ ve Ca²⁺ bozukluklarının RMP ve eşiğe etkisi. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz51-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz51-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz51-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d51-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"İstirahat membran potansiyeli nedir ve nasıl oluşur? Serum potasyumu 7,5 mmol/L olan hastada RMP'ye ne olur ve neden kalsiyum verirsiniz?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım.</b> Hücre içinin dışına göre gerilimi; yük dağılımının eşitsizliğinden doğar. Sinir −70, iskelet kası −90, uyarılamayan hücre ≈ −30 mV. [[K1 s. 221]]</li>
    <li><b>Üç etken.</b> ICF/ECF bileşim farkı, seçici geçirgenlik, hücre içi geçemeyen negatif proteinler. K⁺ içeride 150/dışarıda 5, Na⁺ 20/140 mmol/L; P<sub>Na</sub> ≈ P<sub>K</sub>/100, nöronda P<sub>Cl</sub> ≈ P<sub>K</sub>/1000; kasta Cl⁻ pasif, balast. [[K1 s. 221–222]]</li>
    <li><b>Nernst.</b> E<sub>X</sub> = (RT/zF) ln([X]o/[X]i); E<sub>K</sub> ≈ −90, E<sub>Na</sub> ≈ +50, E<sub>Cl</sub> ≈ −70 mV. K⁺ çıkışı ters elektriksel gradyanla sınırlanır; RMP E<sub>K</sub>'ya yakın. [[K1 s. 222]]</li>
    <li><b>GHK.</b> Bütün geçirgenlik ve derişimler; değerlik yok, Cl⁻ ters; P<sub>Na</sub> = P<sub>Cl</sub> = 0 ise Nernst'e indirgenir. [[K1 s. 222–223]]</li>
    <li><b>Na⁺/K⁺-ATPaz.</b> 3 Na⁺ dışarı, 2 K⁺ içeri: gradyanları korur, ozmotik denge, elektrojenik −3 ile −6 mV. [[K1 s. 223]]</li>
    <li><b>Hiperkalemi.</b> E<sub>K</sub> −80 mV'ye kayar, RMP eşiğe yaklaşır; sivri T, VF riski. Hipokalemi tersi: hiperpolarizasyon, güçsüzlük, uzun QT. [[K1 s. 223]]</li>
    <li><b>Ca²⁺.</b> Yüzey yükü ile zarı stabilize eder; hipokalsemide eşik RMP'ye yaklaşır (tetani, parestezi, aritmi); hiperkalemide kardiyoproteksiyon ve zaman kazandırır. Hiponatremi: hücre şişmesi, K⁺ seyrelmesi, nöbet. [[K1 s. 224]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Bir zar çizin: içeride K⁺ 150, Na⁺ 20, protein⁻; dışarıda K⁺ 5, Na⁺ 140 mmol/L. Açık K⁺ sızıntı kanalını, kapalı Na⁺ kanalını ve 3 Na⁺/2 K⁺ pompasını gösterin. Yanına −100 ile +60 mV arası dikey bir gerilim ekseni koyup E<sub>K</sub> −90, RMP −70, E<sub>Cl</sub> −70, E<sub>Na</sub> +50 mV'yi işaretleyin. [[K1 s. 221–223]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> RMP neden E<sub>K</sub>'ya eşit değil? GHK'de neden değerlik yok? Pompa durursa RMP'ye ne olur? Hipokalemide neden güçsüzlük olur? Hiponatremi neden nöbet yapar? Cl⁻ neden "balast"tır? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 221–224]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d51-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>RMP, hücre içinin dışa göre gerilimidir: sinir −70, iskelet kası −90, uyarılamayan hücre ≈ −30 mV. [[K1 s. 221]]</li>
    <li>İstirahatte zar en çok K⁺'ya geçirgendir (sızıntı kanalları); P<sub>Na</sub> ≈ P<sub>K</sub>/100, nöronda P<sub>Cl</sub> ≈ P<sub>K</sub>/1000. [[K1 s. 221]]</li>
    <li>Nernst denklemi tek iyonun denge potansiyelini verir: E<sub>K</sub> ≈ −90, E<sub>Na</sub> ≈ +50, E<sub>Cl</sub> ≈ −70 mV; RMP E<sub>K</sub>'ya yakındır. [[K1 s. 222]]</li>
    <li>GHK denklemi bütün geçirgenlikleri birleştirir; P<sub>Na</sub> ve P<sub>Cl</sub> sıfırsa Nernst'e indirgenir. [[K1 s. 222–223]]</li>
    <li>Na⁺/K⁺-ATPaz (3 Na⁺ dışarı, 2 K⁺ içeri) gradyanları ve ozmotik dengeyi korur, elektrojenik olarak ≈ 3–6 mV negatiflik ekler. [[K1 s. 223]]</li>
    <li>Hiperkalemi depolarize eder (sivri T, VF); hipokalemi hiperpolarize eder (güçsüzlük, uzun QT). [[K1 s. 223]]</li>
    <li>Hiponatremi hücre şişmesiyle depolarize eder (nöbet); hipokalsemi eşiği RMP'ye yaklaştırır (tetani); Ca²⁺ hiperkalemide kalbi korur. [[K1 s. 224]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="51"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/50">← Bölüm 50 · Omurilik</a>
    <a href="#/dersler/fizyoloji/52">Sonraki: Bölüm 52 · Sinir aksiyon potansiyeli ve yayılması →</a>
  </nav>
</section>`,
};
