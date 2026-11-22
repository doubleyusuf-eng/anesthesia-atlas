/* Fizyoloji Bölüm 10 · Alveoler difüzyon (K1 s. 40–44). Ders sayfası ve soruları.
   Metinler, sorular ve animasyonlar bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz10-1'] = {
  no: 1, kok: 'Alveol-kapiller bariyerden difüzyon hızı için:', kagit: 'Paper A · fizyoloji, Bölüm 10', kaynak: '[[K1 s. 40]]',
  onermeler: [
    { t: 'Bir gazın difüzyon hızı, bariyerin iki yanı arasındaki parsiyel basınç farkıyla doğru orantılıdır.', d: true, n: 'Doğru. Kitap bunu Fick yasası olarak verir; gazlarda konsantrasyon gradyanının yerini parsiyel basınç gradyanı alır. [[K1 s. 40]]' },
    { t: 'Difüzyon hızı, gazın molekül ağırlığıyla ters orantılıdır.', d: false, n: 'Yanlış. Graham yasasına göre hız molekül ağırlığıyla değil, molekül ağırlığının kareköküyle ters orantılıdır. [[K1 s. 40]]' },
    { t: 'Alveol-kapiller bariyerin kalınlığı bazı yerlerde 200 nm kadar azdır.', d: true, n: 'Doğru. İnce bariyer, yaklaşık 300 milyon alveolün sağladığı 70 m² dolayındaki yüzeyle birlikte etkin gaz değişiminin iki anatomik temelidir. [[K1 s. 40]]' },
    { t: "CO₂'nin O₂'den yaklaşık 20 kat hızlı difüze olmasının nedeni molekül ağırlığının daha küçük olmasıdır.", d: false, n: "Yanlış. CO₂ daha ağırdır (44 Da; O₂ 32 Da). Hız farkı CO₂'nin çok daha yüksek çözünürlük katsayısından gelir. [[K1 s. 40]]" },
    { t: 'Yüzey alanı ve kalınlık bariyere, çözünürlük ve molekül ağırlığı difüze olan maddeye ait etkenlerdir.', d: true, n: 'Doğru. Beşinci etken parsiyel basınç gradyanıdır; O₂ için FiO₂ artırılarak değiştirilebilir. [[K1 s. 40]]' },
  ],
};
VERI.sorular['fiz10-2'] = {
  no: 2, kok: 'Pulmoner kapillerde gaz aktarımı için:', kagit: 'Paper A · fizyoloji, Bölüm 10', kaynak: '[[K1 s. 40–42]]',
  onermeler: [
    { t: 'Normal koşullarda O₂ aktarımı difüzyonla sınırlıdır.', d: false, n: 'Yanlış. Normalde O₂ aktarımı perfüzyonla sınırlıdır: eritrosit kapilleri terk etmeden alveoler ve kapiller PO₂ eşitlenir. Bariyerin kalınlaşması, egzersiz ve irtifa gibi durumlarda difüzyonla sınırlı hale gelebilir. [[K1 s. 41–42]]' },
    { t: 'İstirahatte eritrosit pulmoner kapilleri ortalama 0,75 s içinde geçer; normal akciğerde O₂ difüzyonu yaklaşık 0,25 s içinde tamamlanır.', d: true, n: 'Doğru. Bu, istirahatte yaklaşık üç katlık bir güvenlik payı demektir. [[K1 s. 40]]' },
    { t: "N₂O Hb'ye bağlandığı için plazmadaki parsiyel basıncı alveoler değere geç ulaşır.", d: false, n: "Yanlış. N₂O Hb'ye bağlanmaz, plazmada yalnızca çözünmüş olarak taşınır; plazma parsiyel basıncı 0,075 s içinde alveoler değere ulaşır. [[K1 s. 41]]" },
    { t: 'CO aktarımını sınırlayan, kapillere gelen kan miktarı değil difüzyon hızıdır.', d: true, n: "Doğru. CO Hb'ye çok güçlü bağlandığından plazma PCO'su düşük kalır ve kapiller sonunda bile denge kurulmaz: aktarım difüzyonla sınırlıdır. [[K1 s. 41]]" },
    { t: "Aşırı egzersizde eritrositin pulmoner kapillerde geçirdiği süre 0,25 s'ye kadar kısalabilir.", d: true, n: 'Doğru. Artan kalp debisi geçiş süresini kısaltır; normal bariyerde alveoler ve plazma PO₂ bu sürede ancak dengeye gelir. [[K1 s. 42]]' },
  ],
};
VERI.sorular['fiz10-3'] = {
  no: 3, kok: 'Difüzyon kapasitesi (DLCO) ve difüzyon bozukluğu için:', kagit: 'Paper A · fizyoloji, Bölüm 10', kaynak: '[[K1 s. 40, 42–43]]',
  onermeler: [
    { t: 'DLCO testinde %0,3 CO içeren tek bir vital kapasite soluğu alınır ve 10 s tutulur.', d: true, n: "Doğru. Sonra soluk verilir; inspire ve ekspire edilen PCO arasındaki fark, bariyeri geçip Hb'ye bağlanan CO miktarıdır. [[K1 s. 42]]" },
    { t: "Amfizem, pulmoner emboli ve pnömonektomi, gaz değişim yüzeyini azaltarak DLCO'yu düşürür.", d: true, n: "Doğru. Kitap bu üçünü yüzey alanı azalmasına bağlı düşük DLCO örnekleri olarak sayar; pulmoner fibrozis ve pulmoner ödem ise bariyeri kalınlaştırarak DLCO'yu düşürür. [[K1 s. 42–43]]" },
    { t: "Pulmoner kanama ve obezite DLCO'yu azaltır.", d: false, n: "Yanlış. İkisi de DLCO'nun artabildiği durumlardandır (artmış DLCO, azalmış DLCO'dan daha seyrek görülür); egzersiz ve astım da bu gruptadır (astımda DLCO normal de olabilir). [[K1 s. 43]]" },
    { t: 'Akut pulmoner ödemde PEEP, kollabe alveolleri açarak difüzyon yüzeyini artırır ve ödemi yeniden dağıtarak bariyeri inceltir.', d: true, n: 'Doğru. Kitap PEEP\'i FiO₂ artışına ek bir önlem olarak verir. [[K1 s. 43]]' },
    { t: 'Pulmoner fibroziste difüzyon bozukluğunun beklenen sonucu tip 2 solunum yetmezliğidir.', d: false, n: "Yanlış. CO₂ O₂'den yaklaşık 20 kat hızlı difüze olduğu için önce O₂ difüzyonu sınırlanır ve tip 1 solunum yetmezliği gelişir. Klinik olarak anlamlı hiperkapniye difüzyon bozukluğu yol açmaz. [[K1 s. 40]]" },
  ],
};

const D10_NAV = [['d10-etken', 'Beş etken · O₂ ve CO₂'], ['d10-alveol', 'Alveolün yapısı'], ['d10-sinir', 'Perfüzyon mu, difüzyon mu?'], ['d10-o2', 'O₂ ne zaman sınırlanır?'], ['d10-dlco', 'Difüzyon kapasitesi'], ['d10-rezeksiyon', 'Klinik: rezeksiyon'], ['d10-yonetim', 'Klinik: yönetim'], ['d10-p1', 'Part I'], ['d10-p2', 'Part II'], ['d10-ozet', 'Özet']];

SAYFALAR['dersler/fizyoloji/10'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 10', baslik: 'Alveoler difüzyon',
  lede: 'Difüzyon hızını belirleyen beş etken, O₂ ile CO₂ farkı, perfüzyonla ve difüzyonla sınırlı aktarım, difüzyon kapasitesi ve iki klinik uygulama. [[K1 s. 40–43]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D10_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d10-etken">
  <h2>Difüzyon hızı: beş etken, O₂ ve CO₂</h2>
  <p class="intro">Bir gazın zardan difüzyon hızını beş etken belirler: ikisi bariyere, ikisi gaza aittir, beşincisi iki yan arasındaki basınç farkıdır. [[K1 s. 40]]</p>
  <div class="viz"><div data-viz="f10_fick"></div></div>
  <div class="tbl-wrap" style="margin-top:14px">
    <table class="tbl">
      <thead><tr><th>Etken</th><th>Difüzyon hızıyla ilişkisi</th><th>Neye ait?</th></tr></thead>
      <tbody>
        <tr><th>Konsantrasyon gradyanı<br><span class="small muted">gazlarda parsiyel basınç gradyanı · Fick yasası</span></th><td>Doğru orantılı</td><td>Klinikte değiştirilebilir: O₂ için FiO₂ artırılır [[K1 s. 40]]</td></tr>
        <tr><th>Molekül ağırlığı (MW)<br><span class="small muted">Graham yasası</span></th><td>MW'nin kareköküyle ters orantılı</td><td>Difüze olan madde [[K1 s. 40]]</td></tr>
        <tr><th>Çözünürlük</th><td>Doğru orantılı</td><td>Difüze olan madde [[K1 s. 40]]</td></tr>
        <tr><th>Yüzey alanı</th><td>Doğru orantılı</td><td>Bariyer [[K1 s. 40]]</td></tr>
        <tr><th>Zar kalınlığı</th><td>Ters orantılı</td><td>Bariyer [[K1 s. 40]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="f10-denklem" style="margin-top:14px" role="img" aria-label="Difüzyon hızı, yüzey alanı çarpı parsiyel basınç gradyanı çarpı çözünürlük bölü kalınlık çarpı molekül ağırlığının karekökü ile orantılıdır">
    <span class="f10-dk-sol">Difüzyon hızı ∝</span>
    <span class="f10-kesir"><span>yüzey alanı × gradyan × çözünürlük</span><span>kalınlık × √MW</span></span>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>Kitaba göre belirli bir klinik durumda değiştirilebilen tek etken gradyandır: O₂ için solunan O₂ fraksiyonu (FiO₂) artırılır [[K1 s. 40]]. Bölüm sonunda kitap, pulmoner ödemde PEEP ile alanın ve kalınlığın da etkilenebildiğini ekler [[K1 s. 43]].</p>
    <p>O₂ (32 Da) ile CO₂'nin (44 Da) MW'leri yakındır; ama çözünürlük katsayısı çok daha yüksek olan CO₂ yaklaşık <b>20 kat</b> hızlı difüze olur (modelde gazı CO₂ yapın). Bu yüzden difüzyon kusurunda (ör. pulmoner fibrozis) önce O₂ sınırlanır ve <b>tip 1 solunum yetmezliği</b> gelişir; klinik olarak anlamlı hiperkapniye difüzyon bozukluğu yol açmaz. [[K1 s. 40]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Graham yasasına göre daha ağır CO₂, O₂'den √(44/32) ≈ 1,17 kat yavaş difüze olmalıydı; 20 katlık üstünlüğün tümü çözünürlükten gelir. Tip 1 solunum yetmezliği hiperkapnisiz hipoksemidir.</div>
</section>

<section class="wrap blk ders-sec" id="d10-alveol">
  <h2>Alveol: geniş yüzey, ince bariyer, kısa süre</h2>
  <p class="intro">Gaz değişimini etkin kılan iki anatomik özellik çok geniş yüzey ve çok ince bariyerdir; difüzyona ayrılan süre kısadır ama O₂ için fazlasıyla yeter. [[K1 s. 40]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Alveol-kapiller birim: yüzey, kalınlık, süre</h3></div>
    <div data-viz="f10_bariyer"></div>
    <p class="viz-cap" aria-live="polite"><b>Üç sayı.</b> ≈ 300 milyon alveol ≈ 70 m² yüzey sağlar; bariyer en ince yerinde 200 nm'dir. İstirahatte eritrosit kapilleri ortalama 0,75 s'de geçer, O₂ dengesi genellikle 0,25 s'de kurulur. [[K1 s. 40]]</p>
    <p class="viz-foot">Şematik çizim, ölçeksiz; sayılar kitaptandır [[K1 s. 40]].</p>
  </div>
  <div class="blk-body">
    <p>Süre çubuğunda denge, geçişin ilk üçte birinde kurulur: istirahatte yaklaşık <b>üç katlık güvenlik payı</b> vardır. Pay bu kadar geniş olduğu için hipokseminin nedeni, V̇/Q̇ uyumsuzluğu gibi etkenlere göre nadiren difüzyon kusurudur. [[K1 s. 40]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d10-sinir">
  <h2>Perfüzyonla ve difüzyonla sınırlı aktarım</h2>
  <p class="intro">Bir gazın aktarımını neyin sınırladığı, Hb'ye bağlanıp bağlanmamasına bağlıdır: bağlanmayan gaz plazmada hızla dengeye gelir, çok güçlü bağlanan gaz hiç gelmez. [[K1 s. 41]]</p>
  <div class="viz"><div data-viz="f10_kapiller"></div></div>
  <div class="blk-body" style="margin-top:14px">
    <p>PO₂'yi Hb'ye bağlı O₂ değil, plazmada çözünmüş O₂ belirler (Bölüm 8). Eritrosit kapilleri geçerken plazmaya giren O₂ PO₂'yi yükseltir, gradyan küçülür; ≈ 0,25 s'de alveoler ve plazma PO₂ eşitlenir ve net difüzyon durur. [[K1 s. 41]]</p>
    <p>Anestezi için önemli solunan gazlar N₂O, volatil anestezikler ve karbon monoksittir (CO); hepsi düşük MW'li küçük moleküllerdir, kitaba göre CO ve N₂O suda O₂'den çok daha çözünürdür. [[K1 s. 41]]</p>
    <p>Ayrımın mekanizması: Hb'ye bağlanmayan gaz kana girdikçe plazma parsiyel basıncını hemen yükseltir ve gradyan kısa sürede kapanır; Hb'nin çekip bağladığı gaz plazma parsiyel basıncını düşük tutar, gradyan kapiller boyunca sürer. [[K1 s. 41]]</p>
  </div>
  <div class="tbl-wrap" style="margin-top:14px">
    <table class="tbl">
      <thead><tr><th>Gaz</th><th>Hb ve plazma</th><th>Kapiller sonunda</th><th>Aktarımı sınırlayan</th></tr></thead>
      <tbody>
        <tr><th>N₂O</th><td>Hb'ye bağlanmaz; görece az çözünür, yalnız çözünmüş taşınır</td><td>Denge, en hızlı: 0,075 s içinde</td><td><b>Perfüzyon:</b> daha çok kan gelse daha çok N₂O geçerdi [[K1 s. 41]]</td></tr>
        <tr><th>Volatil anestezikler</th><td>N₂O gibi</td><td>Denge, N₂O'dan biraz geç</td><td>Perfüzyon [[K1 s. 41]]</td></tr>
        <tr><th>O₂ (normal koşullar)</th><td>Çoğu Hb'ye bağlı, bir kısmı çözünmüş</td><td>Denge (≈ 0,25 s), eritrosit kapilleri terk etmeden</td><td>Perfüzyon [[K1 s. 41]]</td></tr>
        <tr><th>CO</th><td>Hb afinitesi O₂'nin 250 katı; plazmada neredeyse hiç çözünmüş CO yok, PCO çok düşük</td><td>Denge yok: büyük basınç farkı sürer</td><td><b>Difüzyon:</b> bu yüzden difüzyon kapasitesi CO ile ölçülür [[K1 s. 41]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap N₂O'yu hem "O₂'den çok daha çözünür" hem "görece az çözünür" diye niteler: ilki fiziksel çözünürlüktür, ikincisi Hb'si olmayan taşımada kanın parsiyel basınç birimi başına tutabildiği küçük miktardır. CO'nun suda O₂'den çok daha çözünür olduğu ise doğru değildir (çözünürlüğü O₂'ninkine yakın, biraz düşüktür); CO'yu ayıran Hb'ye çok güçlü bağlanmasıdır.</div>
</section>

<section class="wrap blk ders-sec" id="d10-o2">
  <h2>O₂ aktarımı ne zaman difüzyonla sınırlı olur?</h2>
  <p class="intro">Normalde perfüzyonla sınırlı O₂ aktarımı üç durumda difüzyonla sınırlanabilir: eritrosit kapillerin sonuna vardığında alveoler ve kapiller PO₂ eşitlenmemiştir, sonuç hipoksemidir. [[K1 s. 42]]</p>
  <div class="viz"><div data-viz="f10_sinir"></div></div>
  <div class="cols cols-3" style="margin-top:14px">
    <div class="card"><span class="tag crit">1 · Bariyer</span><h3>Kalınlaşmış bariyer</h3><p>Pulmoner fibroziste difüzyon hızı düşer; denge kapiller sonuna kadar kurulamaz. [[K1 s. 42]]</p></div>
    <div class="card"><span class="tag warn">2 · Süre</span><h3>Egzersiz</h3><p>Artan kalp debisi geçiş süresini kısaltır, aşırı egzersizde 0,25 s'ye kadar. Normal bariyerde denge ancak kurulur; bariyer hastasında her kısalma hipoksemi yapar. [[K1 s. 42]]</p></div>
    <div class="card"><span class="tag basic">3 · Gradyan</span><h3>İrtifa</h3><p>Düşük PB alveoler PO₂'yi düşürür (Bölüm 18 ve 87); sınırlanma daha düşük eşikte başlar. Deniz seviyesinde dengeye ancak ulaşan hafif hasta yüksekte difüzyon bozukluğu geliştirir; normal akciğerde bile yoğun egzersiz hipoksemi yapabilir. [[K1 s. 42]]</p></div>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitabın metni hafif hastalıkta istirahatte dengeye "ancak" ulaşıldığını yazar, Şekil 10.2'deki kalın bariyer eğrisi ise kapiller sonunda PO₂'yi biraz düşük gösterir. Modeldeki "hafif" ve "belirgin" kalınlaşma bu iki dereceyi ayrı gösterir.</div>
</section>

<section class="wrap blk ders-sec" id="d10-dlco">
  <h2>Akciğer difüzyon kapasitesi (DLCO, TLCO)</h2>
  <p class="intro">DLCO ("transfer faktörü", TLCO), solunum fonksiyon testlerinde akciğerlerin gaz aktarma yeteneğinin ölçüsüdür; CO difüzyonla sınırlı olduğu için alımı bariyerin durumunu yansıtır. [[K1 s. 41–42]]</p>
  <div class="viz"><div data-viz="f10_dlco"></div></div>
  <div class="blk-body" style="margin-top:14px">
    <p>Hasta %0,3 CO içeren tek bir vital kapasite soluğu alır, 10 s tutar ve verir; inspire ve ekspire PCO farkı, bariyeri geçip Hb'ye bağlanan CO'dur. Sonuç genellikle Hb konsantrasyonuna göre düzeltilir; irtifa, yaş ve cinsiyet de etkiler. Test, alveol-kapiller bariyer hastalığının tanısında kullanılır. [[K1 s. 42]]</p>
  </div>
  <div class="cols" style="margin-top:14px">
    <div class="card"><span class="tag crit">DLCO azalır</span><ul><li><b>Kalın bariyer:</b> pulmoner fibrozis ve diğer interstisyel hastalıklar (kronik), pulmoner ödem (akut). [[K1 s. 42]]</li><li><b>Küçük yüzey:</b> amfizem, pulmoner emboli, pnömonektomi ya da lobektomi sonrası. [[K1 s. 43]]</li></ul></div>
    <div class="card"><span class="tag ok">DLCO artar · daha seyrek</span><ul><li><b>Egzersiz:</b> pulmoner kapillerlerin açılması (recruitment) ve genişlemesi. [[K1 s. 43]]</li><li>Pulmoner kanama; obezite. [[K1 s. 43]]</li><li>Astım (DLCO normal de olabilir). [[K1 s. 43]]</li></ul></div>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p><b>Transfer katsayısı (KCO):</b> pnömonektomi ya da lobektomi sonrası alveoler hacim kaybına göre yapılan düzeltmedir; kalan alveollerin difüzyon kapasitesini gösterir. [[K1 s. 43]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d10-rezeksiyon">
  <h2>Klinik önem: akciğer rezeksiyonu</h2>
  <p class="intro">Akciğer rezeksiyonundan önce FEV₁ ve DLCO birlikte, ameliyattan sonraki akciğer işlevini ve riski öngörür. [[K1 s. 43]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Rezeksiyon öncesi risk: iki ölçüm, bir karar</h3></div>
    <div data-viz="f10_rezeksiyon"></div>
    <p class="viz-cap" aria-live="polite"><b>Soldan sağa okuyun.</b> FEV₁ akciğer ve göğüs duvarının mekanik yeteneğini, DLCO alveol-kapiller işlevi kabaca ölçer; ikisinden postoperatif değer hesaplanır, beklenen değerle karşılaştırılır ve hasta düşük ya da yüksek riskli sayılır. [[K1 s. 43]]</p>
    <p class="viz-foot">Şematik akış; kitap hesabın ayrıntısını ve risk eşiklerini vermez [[K1 s. 43]].</p>
  </div>
  <div class="blk-body">
    <p>Pnömonektominin mortalitesi %8'e kadar çıkar, lobektominin yaklaşık %2'dir; bu yüzden rezeksiyon düşünülen hastalara rutin solunum fonksiyon testi yapılır. Risk, hem ölüm hem postoperatif pulmoner komplikasyonlar içindir. [[K1 s. 43]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d10-yonetim">
  <h2>Klinik önem: difüzyon bozukluğu olan hastanın yönetimi</h2>
  <p class="intro">Difüzyon bozukluğunun sonucu hipoksemidir; anestezistin başlıca kaygısı onu önlemek ve tedavi etmektir. O₂'nin çözünürlüğü ve MW'si sabittir, kalan üç etken üzerinde belirli bir kontrol vardır. [[K1 s. 43]]</p>
  <div class="viz"><div data-viz="f10_odem"></div></div>
  <div class="cols" style="margin-top:14px">
    <div class="card gold"><span class="tag gold">Gradyan → FiO₂</span><p>FiO₂ artışı O₂ gradyanını büyüterek kalın bariyerin yavaşlattığı difüzyonu dengeler; pulmoner fibroziste egzersize bağlı hipoksemi için taşınabilir ek O₂ bu yüzden kullanılır. [[K1 s. 43]]</p></div>
    <div class="card gold"><span class="tag gold">Alan ve kalınlık → PEEP</span><p>Akut pulmoner ödemde yükselen pulmoner venöz basınç sıvıyı alveollere ve interstisyuma sızdırır: bariyer kalınlaşır, alan küçülür. FiO₂'ye ek PEEP kollabe alveolleri açar (alan artar) ve alveoler basıncı yükselterek ödemi yeniden dağıtır (bariyer incelir). [[K1 s. 43]]</p></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d10-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında en çok orantılar ve sayılar üzerinden sorulur: hangi etken hızla doğru, hangisi ters orantılıdır; 0,75 s ile 0,25 s; CO₂'nin 20 kat hızı ve nedeni; hangi gaz perfüzyonla, hangisi difüzyonla sınırlıdır; DLCO hangi durumlarda azalır ya da artar. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz10-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz10-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz10-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d10-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Alveol-kapiller bariyerden gaz difüzyonunu hangi etkenler belirler? Perfüzyonla sınırlı ve difüzyonla sınırlı aktarım ne demektir? O₂ aktarımı ne zaman difüzyonla sınırlı olur?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Beş etken ve denklem.</b> Hız ∝ yüzey alanı × parsiyel basınç gradyanı × çözünürlük / (kalınlık × √MW). Alan ve kalınlık bariyere, çözünürlük ve MW gaza ait; klinikte değiştirilen gradyan (FiO₂). [[K1 s. 40]]</li>
    <li><b>Alveolün tasarımı.</b> Yaklaşık 300 milyon alveol, 70 m², bazı yerlerde 200 nm bariyer. İstirahatte geçiş 0,75 s, O₂ dengesi 0,25 s: üç katlık güvenlik payı; hipoksemi nadiren difüzyon kaynaklıdır. [[K1 s. 40]]</li>
    <li><b>O₂ ve CO₂.</b> MW 32 ve 44 Da; CO₂ çözünürlüğü sayesinde 20 kat hızlı. Difüzyon kusuru tip 1 solunum yetmezliği yapar, anlamlı hiperkapni yapmaz. [[K1 s. 40]]</li>
    <li><b>Perfüzyonla ve difüzyonla sınırlı aktarım.</b> N₂O ve volatiller Hb'ye bağlanmaz, hızla dengeye gelir (N₂O 0,075 s): daha fazla kan, daha fazla aktarım. CO Hb'ye 250 kat afiniteyle bağlanır, plazma PCO'su düşük kalır, denge kurulmaz: aktarımı difüzyon hızı sınırlar. O₂ normalde perfüzyonla sınırlıdır. [[K1 s. 41]]</li>
    <li><b>O₂ ne zaman difüzyonla sınırlı olur?</b> Kalınlaşmış bariyer (pulmoner fibrozis), egzersiz (geçiş süresi 0,25 s'ye kadar kısalır), irtifa (düşük PAO₂, daha düşük eşik). [[K1 s. 42]]</li>
    <li><b>Ölçüm: DLCO.</b> %0,3 CO, tek vital kapasite soluğu, 10 s nefes tutma; Hb'ye göre düzeltme. Azalır: kalın bariyer (fibrozis, ödem), küçük alan (amfizem, emboli, rezeksiyon); artabilir: egzersiz, pulmoner kanama, astım (normal de olabilir), obezite. Rezeksiyon sonrası KCO. [[K1 s. 42–43]]</li>
    <li><b>Klinik bağlantıyla bitirin.</b> Akciğer rezeksiyonu öncesi FEV₁ ve DLCO ile postoperatif işlev ve risk öngörülür. Difüzyon bozukluğunda FiO₂'yi artırın; akut pulmoner ödemde PEEP alanı artırır ve bariyeri inceltir. [[K1 s. 43]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim, kapillerde geçen süreye (0–0,75 s) karşı kapiller parsiyel basıncıdır: hızla platoya çıkan N₂O, 0,25 s'de dengeye gelen O₂ ve tabanda kalan CO. İkinci çizim olarak aynı eksenlerde normal ve kalınlaşmış bariyerde O₂ eğrisini, istirahat (0,75 s) ve aşırı egzersiz (0,25 s) çizgileriyle gösterin.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Difüzyon kapasitesi neden CO ile ölçülür? Difüzyon bozukluğu neden anlamlı hiperkapni yapmaz? Egzersiz ve irtifa O₂ difüzyonunu nasıl etkiler? DLCO hangi durumlarda artar? KCO nedir, ne zaman kullanılır? Pulmoner ödemli hastada difüzyonu nasıl iyileştirirsiniz? Akciğer rezeksiyonu öncesinde FEV₁ ve DLCO neden birlikte değerlendirilir? Cevapların hepsi yukarıda. [[K1 s. 40–43]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d10-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Difüzyon hızı ∝ yüzey alanı × gradyan × çözünürlük / (kalınlık × √MW). Alan ve kalınlık bariyere, çözünürlük ve MW gaza aittir; belirli bir klinik durumda değiştirilebilen etken gradyandır (FiO₂). [[K1 s. 40]]</li>
    <li>Yaklaşık 300 milyon alveol, 70 m² yüzey, bazı yerlerde 200 nm bariyer. İstirahatte geçiş 0,75 s, O₂ dengesi 0,25 s: üç katlık güvenlik payı. [[K1 s. 40]]</li>
    <li>CO₂ O₂'den 20 kat hızlı difüze olur; nedeni MW değil çözünürlüktür. Difüzyon kusuru tip 1 solunum yetmezliği yapar, anlamlı hiperkapni yapmaz. [[K1 s. 40]]</li>
    <li>N₂O ve volatiller Hb'ye bağlanmaz, hızla dengeye gelir (N₂O 0,075 s): perfüzyonla sınırlı. CO Hb'ye 250 kat afiniteyle bağlanır, denge kurulmaz: difüzyonla sınırlı. O₂ normalde perfüzyonla sınırlıdır. [[K1 s. 41]]</li>
    <li>O₂ aktarımı kalınlaşmış bariyerde, egzersizde (geçiş 0,25 s'ye kadar kısalır) ve irtifada (düşük alveoler PO₂) difüzyonla sınırlı olabilir. [[K1 s. 42]]</li>
    <li>DLCO (TLCO): %0,3 CO, tek vital kapasite soluğu, 10 s; Hb'ye göre düzeltilir. Kalın bariyerde ve küçük alanda düşer; egzersiz, pulmoner kanama, astım ve obezitede artabilir. Rezeksiyondan sonra KCO kullanılır. [[K1 s. 42–43]]</li>
    <li>Akciğer rezeksiyonu öncesinde FEV₁ (mekanik) ve DLCO (alveol-kapiller işlev) birlikte postoperatif işlevi ve riski öngörür. [[K1 s. 43]]</li>
    <li>Difüzyon bozukluğunda FiO₂ gradyanı artırır; akut pulmoner ödemde PEEP alanı artırır ve bariyeri inceltir. [[K1 s. 43]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="10"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/09">← Bölüm 9 · Karbondioksit taşınması</a>
    <a href="#/dersler/fizyoloji/11">Sonraki: Bölüm 11 · Ventilasyon ve ölü boşluk →</a>
  </nav>
</section>`,
};
