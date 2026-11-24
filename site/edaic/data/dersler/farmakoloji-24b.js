/* Farmakoloji · Bölüm 24 · Ders 24b: Heparinler, protamin ve varfarin (K3 s. 376–380, Türkçe çalışma çevirisi). */
VERI.sorular = VERI.sorular || {};
VERI.sorular['far24b-1'] = {
  no: 1, kok: 'Fraksiyone olmayan heparin (UFH) ve LMWH', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 376–378]]',
  onermeler: [
    { t: 'İmmün kökenli olmayan heparin kaynaklı trombositopeni (tip I) uygulamadan 4–14 gün sonra ortaya çıkar ve yüksek pulmoner emboli mortalitesi taşır.', d: false, n: 'Yanlış. Bu tablo immün aracılı tip II HIT’tir (PF4–IgG kompleksi; yarısında ciddi tromboz ve %20 arteriyel tromboz); tip I ise ilk 4 günde gelişir ve heparin kesilmeden düzelir. [[K3 s. 377]]' },
    { t: 'Fraksiyone olmayan heparin antitrombin III ile trombin arasında inaktif kompleks oluşum hızını bin kat artırır ve KBB ile plasentayı geçmez.', d: true, n: 'Doğru. Düşük konsantrasyonlarda FXa’yı, arttıkça FIXa, FXIa ve FXIIa’yı inhibe eder; hipotermide (ör. KPB) klirensi azalır. [[K3 s. 376–377]]' },
    { t: 'Heparine bağlı hiperkalemi yalnız fraksiyone olmayan heparinle görülür; LMWH’lerle bildirilmemiştir.', d: false, n: 'Yanlış. Heparin, LMWH’ler dahil, aldosteron sekresyonunun inhibisyonuna bağlı olabilecek hiperkalemiye neden olabilir; diabetes mellitus ve kronik böbrek yetmezliği olan hastalar özellikle yatkındır ve risk tedavi süresiyle artar. [[K3 s. 377]]' },
    { t: 'LMWH’ler AT-III–trombin kompleksini desteklemede UFH’den daha etkili olup etkileri protaminle tamamen geri çevrilir.', d: false, n: 'Yanlış. LMWH’ler FXa inhibisyonunda daha etkili, AT-III–trombin kompleksini desteklemede daha az etkilidir; protamin etkilerini tam geri çevirmez. [[K3 s. 378]]' },
    { t: 'LMWH’ler APTT’yi değiştirmediğinden izlemde uzmanlaşmış laboratuvarlarda anti-Xa aktivitesi ölçülür.', d: true, n: 'Doğru. UFH ise faktör VIII, IX, XI, XII ve ortak yolu ölçen APTT (normal ~28–35 saniye) ile izlenir. [[K3 s. 378]]' },
  ],
};
VERI.sorular['far24b-2'] = {
  no: 2, kok: 'Protamin ve varfarin etki mekanizması / etkileşimleri', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 378–380]]',
  onermeler: [
    { t: 'Hızlı intravenöz protamin enjeksiyonu histamin salınımına bağlı hipotansiyona ve kompleman aktivasyonu ile tromboksan salınımına bağlı pulmoner hipertansiyona yol açabilir.', d: true, n: 'Doğru. Ayrıca balık alerjisi ve protaminli insülin almış hastalarda alerjik reaksiyon riski artmış olabilir; 1 mg İV protamin 100 i.u. heparini geri çevirir. [[K3 s. 378]]' },
    { t: 'Varfarin halihazırda dolaşımda bulunan faktör II, VII, IX ve X’u doğrudan parçaladığı için tam antikoagülan etkisini 2 saat içinde gösterir.', d: false, n: 'Yanlış. Dolaşımdaki faktörler etkilenmez, karaciğerde K vitaminine bağımlı faktör sentezi inhibe edildiğinden tam etki 72 saate kadar sürer. [[K3 s. 379]]' },
    { t: 'Rifampisin ve karbamazepin hepatik enzimleri indükleyerek varfarinin antikoagülan etkisini antagonize ederken eritromisin, metronidazol ve simetidin güçlendirir.', d: true, n: 'Doğru. NSAİİ, heparin ve kolestiramin de varfarin etkisini güçlendirir. [[K3 s. 379]]' },
    { t: 'Varfarinin etkisini hızla geri çevirmek için 10 mg K vitamini verilir; TDP ise etkisini çok daha yavaş gösterir.', d: false, n: 'Yanlış. Varfarinin etkilerini hızla geri çeviren taze donmuş plazmadır (TDP); 1 mg K vitamini daha yavaş geri çevirirken 10 mg K vitamini birkaç gün boyunca antikoagülasyonu önler. [[K3 s. 379–380]]' },
    { t: 'Protamin fazla miktarda verildiğinde kendisi bir miktar antikoagülan etki gösterebilir.', d: true, n: 'Doğru. Balık sperminden hazırlanan bazik bir proteindir ve pozitif yüküyle heparini bağlayarak RES’ten temizlenen inaktif kompleks yapar. [[K3 s. 378]]' },
  ],
};
VERI.sorular['far24b-3'] = {
  no: 3, kok: 'Varfarin kinetiği, farmakogenetik ve INR izlemi', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 379–380]]',
  onermeler: [
    { t: 'VKORC1 enzimini azaltan mutasyonlar ile daha potent olan S-varfarini metabolize eden CYP2C9 aktivitesindeki düşüş kanama riskini artırır.', d: true, n: 'Doğru. Anormal genetik polimorfizmlere bağlı kanama en belirgin olarak tedavinin başında yükleme dozu kullanıldığında görülür. [[K3 s. 380]]' },
    { t: 'Varfarinle antikoagüle edilmiş hastalarda spinal ve epidural anestezi kontrendikedir; tedavi INR 2,0–4,5 hedeflenerek izlenir.', d: true, n: 'Doğru. Klinik duruma bağlı olarak PT’yi INR 2,0–4,5 aralığına yükseltmek hedeflenir. [[K3 s. 380]]' },
    { t: 'Protrombin zamanı (PT) yalnızca intrinsik sistem faktörleri olan VIII, IX, XI ve XII’yi ölçer ve normalde 28–35 saniyedir.', d: false, n: 'Yanlış. İntrinsik yolu (28–35 sn) ölçen APTT’dir; PT ekstrinsik sistem faktörü VII ile ortak yolu ölçer (sitratlı plazmaya doku tromboplastini + Ca²⁺ eklenir; normal 10–14 sn). [[K3 s. 378, 380]]' },
    { t: 'Varfarin bağırsaktan zayıf emilir ve plazma proteinlerine %10’un altında bağlanır.', d: false, n: 'Yanlış. Bağırsaktan tamamen emilir ve plazma proteinlerine >%95 oranında bağlanır. [[K3 s. 380]]' },
    { t: 'Varfarin ilk trimesterde teratojeniktir; üçüncü trimesterde plasentayı geçerek fetal kanamaya yol açabilir.', d: true, n: 'Doğru. İlk trimesterde teratojenite daha sık ve daha ciddidir. [[K3 s. 379]]' },
  ],
};

const A24B_NAV = [
  ['ufh', 'UFH'], ['lmwh', 'LMWH & İzlem'],
  ['protamin', 'Protamin'], ['varfarin', 'Varfarin & INR'],
  ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/24b'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 4 · Bölüm 24 · Ders 24b', baslik: 'Heparinler, protamin ve varfarin',
  lede: 'Antitrombositlerin ardından (<a href="#/dersler/farmakoloji/24a">24a</a>) parenteral fraksiyone olmayan ve düşük molekül ağırlıklı heparinler, antidot protamin ve oral K vitamini antagonisti varfarin ele alınır. [[K3 s. 376–380]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A24B_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a24b-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a24b-ufh">
  <h2>Fraksiyone olmayan heparin (UFH)</h2>
  <p class="intro">Heparin karaciğer ve mast hücresi granüllerinde doğal olarak bulunan, çok sayıda sülfat kalıntılı ve değişken molekül ağırlıklı (5000–25.000 Da) anyonik bir mukopolisakkarit organik asittir. [[K3 s. 376]]</p>
  <div class="viz"><div class="viz-head"><h3>Fraksiyone olmayan heparin (UFH): mekanizma, kinetik ve HIT</h3></div><div data-viz="a24b_ufh"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şekil 24.2 AT-III hızlandırması, klirens ve HIT farkları kitaptan. [[K3 s. 376–377]]</p></div>
  <ul class="ozet">
    <li><b>Kullanım ve etki mekanizması.</b> DVT, PE, kararsız anjina ve kritik periferik arter tıkanıklığında sürekli İV infüzyonla, ekstrakorporeal devre başlangıç sıvısında ve sınırlı olarak DIC’te kullanılır; perioperatif/kritik VTE profilaksisinde SC uygulamanın yerini böbrek yetmezliği dışında büyük ölçüde LMWH almıştır. Antitrombin III ile trombinin inaktif kompleks oluşturma hızını <b>1000 kat</b> artırır: düşük konsantrasyonda faktör Xa’yı, arttıkça faktör IXa, XIa ve XIIa’yı inhibe eder; yüksek konsantrasyonda trombosit agregasyonunu inhibe eder ve dokulardan salınan lipoprotein lipazla plazma trigliserit düzeyini (bulanıklığı) azaltır. [[K3 s. 376]]</li>
    <li><b>Kinetik ve yan etkiler.</b> Potens değişkenliğinden mg/mL yerine <b>ünite/mL</b> sunulur; oral etkisizdir (SC/İV), lipit çözünürlüğü düşüktür, KBB ve plasentayı geçmez; negatif yükü nedeniyle plazmada AT-III, albümin, proteazlar ve fibrinojene yüksek oranda bağlanır, hepatik heparinazla yıkılıp idrarla atılır ve hipotermide (ör. KPB) klirensi azalır. En sık yan etki göreli doz aşımına bağlı kanamadır. <b>HIT Tip I</b> (non-immün) ilk 4 günde çıkar, nadiren önemlidir ve kesmeden düzelir; <b>HIT Tip II</b> (immün aracılı, İV/SC UFH veya LMWH sonrası <b>4–14 gün</b>) PF4–IgG kompleksiyle agregasyon yapar (yarısında ciddi tromboz ve PE kaynaklı yüksek mortalite; %20’sinde inme/ekstremite iskemisiyle arteriyel tromboz). Hızlı büyük İV doz hipotansiyon yapabilir; kemik minerali kompleksine bağlı osteoporoz ve alopesi bildirilmiştir; hem UFH hem LMWH aldosteron inhibisyonuna bağlı olabilecek <b>hiperkalemiye</b> yol açabilir (DM ve KBY yatkındır, süreyle artar). [[K3 s. 377]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a24b-lmwh">
  <h2>Düşük molekül ağırlıklı heparinler (LMWH) ve heparin izlemi</h2>
  <p class="intro">Enoksaparin, dalteparin ve tinzaparin heparinin kimyasal veya enzimatik depolimerizasyonuyla elde edilir (2000–8000 Da) ve majör ortopedide ölümcül PE’yi azaltmada UFH’ye üstünlüğü gösterilmiştir. [[K3 s. 377]]</p>
  <div class="viz"><div class="viz-head"><h3>Düşük molekül ağırlıklı heparinler (LMWH) ve izlem</h3></div><div data-viz="a24b_lmwh"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">APTT ve anti-Xa izlem farkları kitaptan. [[K3 s. 377–378]]</p></div>
  <ul class="ozet">
    <li><b>Avantajlar ve etki farkı.</b> UFH’ye kıyasla beş avantajı vardır: uzun t½ ile <b>günde tek doz</b>, vWF’ye düşük afinite, trombositler üstünde az etki, düşük HIT riski ve azalmış izlem gereksinimi. Faktör Xa inhibisyonunda daha etkili, AT-III–trombin kompleksini desteklemede daha az etkilidir; <b>protamin</b> LMWH etkisini geri çevirmede tam etkili değildir. [[K3 s. 377–378]]</li>
    <li><b>İzlem: APTT ve Anti-Xa.</b> UFH, intrinsik sistem (VIII, IX, XI, XII) ile ortak yolu değerlendiren <b>APTT</b> ile izlenir (sitratlı kana fosfolipit, yüzey aktivatörü [ör. kaolin] ve Ca²⁺; normal ~28–35 sn). LMWH başlıca FXa’yı inhibe ettiğinden APTT değişmez; gerekirse uzmanlaşmış laboratuvarlarda <b>anti-Xa aktivitesi</b> ölçülür. [[K3 s. 378]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a24b-protamin">
  <h2>Protamin</h2>
  <p class="intro">Protamin balık sperminden hazırlanan bazik bir proteindir; pozitif yüküyle heparini bağlayarak RES tarafından temizlenen inaktif bir kompleks oluşturur (bazı insülinlerde de yer alır). [[K3 s. 378]]</p>
  <div class="viz"><div class="viz-head"><h3>Protamin: heparin nötralizasyonu ve yan etkiler</h3></div><div data-viz="a24b_protamin"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">1 mg : 100 i.u. oranı ve KVS reaksiyonları kitaptan. [[K3 s. 378]]</p></div>
  <ul class="ozet">
    <li><b>Doz ve yan etkiler.</b> İV <b>1 mg</b> protamin <b>100 i.u.</b> heparini geri çevirir; fazla miktarda verildiğinde kendisi bir miktar antikoagülan etki gösterir. Hızlı İV uygulama histamin salınımıyla hipotansiyon, kompleman ve tromboksan salınımıyla <b>pulmoner hipertansiyon</b>, dispne, bradikardi ve kızarmaya yol açabilir. Daha önce protaminli insülin almışlarda ve balık alerjisinde alerjik reaksiyon riski artmış olabilir. [[K3 s. 378]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a24b-varfarin">
  <h2>Varfarin</h2>
  <p class="intro">Kumarin türevi varfarin atriyal fibrilasyon, romatizmal veya protez kapakta sistemik tromboemboli profilaksisi ile DVT ve PE profilaksi/tedavisinde kullanılır. Yeni oral antikoagülanların gelişiminde varfarini tolere edemeyenleri tedavi etme ve öngörülebilir kinetikle izlem gerektirmeme belirleyici olmuştur. [[K3 s. 378–379]]</p>
  <div class="viz"><div class="viz-head"><h3>Varfarin: K vitamini döngüsü, etkileşimler ve INR izlemi</h3></div><div data-viz="a24b_varfarin"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şekil 24.3 mekanizma, VKORC1/CYP2C9 ve INR hedefi kitaptan. [[K3 s. 379–380]]</p></div>
  <ul class="ozet">
    <li><b>Etki mekanizması, kinetik ve farmakogenetik.</b> K vitamininin indirgenmiş forma geri dönüşünü önleyerek karaciğerde K vitaminine bağımlı faktörler olan <b>II, VII, IX ve X</b> öncüllerinin γ-karboksilasyonunu (sentezini) inhibe eder. Dolaşımdaki faktörler etkilenmediğinden tam etki <b>72 saate kadar</b> sürer. Bağırsaktan tamamen emilir, &gt;%95 proteine bağlanır ve oksidasyon/redüksiyonla tamamen karaciğerde metabolize olup idrarla konjuge atılır. K vitamini epoksit redüktaz alt birimini kodlayan <b>VKORC1</b>’in az aktif mutasyonları kanama duyarlılığını artırır; daha potent olan S-varfarinin başlıca metabolik yolu <b>CYP2C9</b> aktivitesindeki düşüş de etkiyi belirgin artırır (kanama en çok başlangıçtaki yükleme dozunda görülür). [[K3 s. 379–380]]</li>
    <li><b>Yan etkiler, etkileşimler ve izlem.</b> Kanamaya ek olarak <b>teratojenitesi</b> ilk trimesterde daha sık ve ağırdır, üçüncü trimesterde plasentayı geçerek fetal kanama yapabilir; varfarin kullananlarda <b>spinal ve epidural anestezi kontrendikedir</b>. Etkisi koagülasyonu bozan ilaçlarla (NSAİİ, heparin), plazma bağlanma rekabetiyle (NSAİİ), metabolizma inhibisyonuyla (simetidin, alkol, allopurinol, eritromisin, siprofloksasin, metronidazol, TCA) ve yağda çözünen vitamin emilimini bozan kolestiraminle güçlenirken; barbitüratlar, rifampisin ve karbamazepinle (enzim indüksiyonu) antagonize olur. Etkisi <b>TDP</b> ile hızla, <b>1 mg K vitaminiyle</b> yavaşça geri çevrilir; <b>10 mg K vitamini</b> birkaç gün antikoagülasyonu önler. Ekstrinsik faktör VII ve ortak yolu ölçen <b>PT</b> (sitratlı plazmaya doku tromboplastini ve Ca²⁺; normal 10–14 sn) üzerinden hesaplanan <b>INR</b> hedefi <b>2,0–4,5</b> arasıdır. [[K3 s. 379–380]]</li>
  </ul>
  <div class="note plain"><b>Atlas notu.</b> Kitapta INR yalnızca hasta PT’sinin kontrol PT’sine oranı olarak verilir; teknik tanım <code>INR = (PT / MNPT)<sup>ISI</sup></code> biçimindedir (MNPT aynı yöntemdeki ortalama normal PT, ISI uluslararası duyarlılık indeksidir).</div>
</section>

<section class="wrap blk ders-sec" id="a24b-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin, ardından gerekçenizi açıklamayla karşılaştırın.</p>
  <div class="viz"><div data-viz="mtf" data-q="far24b-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far24b-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far24b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a24b-p2">
  <h2>Part II · SOE 2</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Kardiyopulmoner baypas sırasında antikoagülasyon için UFH kullanılıyor ve sonrasında protaminle nötralizasyon planlanıyor; serviste ise başka bir hastada varfarin başlandıktan sonra INR yükseliyor. UFH klirens/izlem ve protamin risklerini, HIT tiplerini ve varfarinin neden geç etki ettiğini açıklayın.</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>UFH AT-III–trombin oluşumunu 1000× hızlandırır, KPB sırasındaki hipotermide klirensi azalır ve intrinsik/ortak yolu değerlendiren APTT (normal 28–35 sn) ile izlenir (LMWH’de APTT değişmez, anti-Xa ölçülür). [[K3 s. 376–378]]</li>
    <li>HIT Tip I ilk 4 günde non-immün çıkıp kesilmeden düzelirken, HIT Tip II (4–14 gün, UFH ve LMWH) PF4–IgG ile hastaların yarısında ciddi tromboz (mortalite başlıca PE) ve %20’sinde arteriyel tromboz oluşturur. [[K3 s. 377]]</li>
    <li>1 mg İV protamin 100 i.u. UFH’yi nötralize eder; hızlı İV histamin aracılı hipotansiyon ve kompleman/TXA₂ aracılı pulmoner HT yapabilir, balık alerjisi ve protaminli insülin öyküsünde risk artmış olabilir, fazla dozda antikoagülandır. [[K3 s. 378]]</li>
    <li>Varfarin K vitaminine bağımlı II, VII, IX ve X faktörlerinin karaciğerde γ-karboksilasyonunu/sentezini inhibe ettiği ve dolaşımdaki faktörleri etkilemediği için tam etkisi 72 saate kadar sürer; VKORC1/CYP2C9 polimorfizmleri yüklemede kanamayı artırır. [[K3 s. 379–380]]</li>
    <li>Varfarin TDP ile hızla, 1 mg K vitaminiyle daha yavaş geri çevrilir (10 mg birkaç gün antikoagülasyonu önler); spinal/epidural anestezi kontrendikedir ve hedef INR 2,0–4,5 arasıdır. [[K3 s. 379–380]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> UFH (IIa + Xa; APTT), LMWH (Xa ağırlıklı; anti-Xa) ve varfarin (II, VII, IX, X K vit. epoksit redüktaz döngüsü; PT/INR) etki noktalarını koagülasyon şemasında işaretleyin. [[K3 s. 376–380]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Heparin hangi hasta gruplarında hiperkalemiye daha yatkınlık oluşturur? Protamin LMWH’yi tam geri çevirebilir mi? [[K3 s. 377–378]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a24b-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>UFH AT-III–trombini 1000× hızlandırır (APTT 28–35 sn), KBB/plasentayı geçmez ve KPB hipotermisinde klirensi düşer; HIT tip II (4–14 gün, PF4–IgG) ağır tromboz yapar. [[K3 s. 376–377]]</li>
    <li>LMWH (2000–8000 Da) FXa’da daha etkili, günde tek doz ve düşük HIT risklidir (anti-Xa izlemi); protamin etkisini tam geri çevirmez. [[K3 s. 377–378]]</li>
    <li>1 mg İV protamin 100 i.u. UFH’yi bağlar; hızlı İV hipotansiyon ve kompleman/TXA₂ ile pulmoner hipertansiyon yapabilir. [[K3 s. 378]]</li>
    <li>Varfarin II, VII, IX, X sentezini inhibe eder, tam etkisi 72 saate kadar sürer (VKORC1/CYP2C9 varyantları kanama ↑; spinal/epidural kontrendike). [[K3 s. 379–380]]</li>
    <li>Varfarin TDP ile hızlı, 1 mg K vitaminiyle yavaş geri çevrilir (10 mg günlerce antikoagülasyonu önler); hedef INR 2,0–4,5’tir. [[K3 s. 379–380]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="24b"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/24a">← 24a · Koagülasyon fizyolojisi ve antitrombositler</a><a href="#/dersler/farmakoloji/24c">Sonraki: 24c · Doğrudan oral antikoagülanlar ve etkilerinin geri döndürülmesi →</a></nav>
</section>`,
};
