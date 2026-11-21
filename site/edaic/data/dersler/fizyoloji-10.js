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
    { t: 'İstirahatte eritrosit pulmoner kapilleri ortalama 0,75 s içinde geçer; normal akciğerde O₂ difüzyonu yaklaşık 0,25 s içinde tamamlanır.', d: true, n: 'Doğru. Bu, istirahatte yaklaşık üç katlık bir güvenlik payı demektir. [[K1 s. 40]]' },
    { t: 'Normal koşullarda O₂ aktarımı difüzyonla sınırlıdır.', d: false, n: 'Yanlış. Normalde O₂ aktarımı perfüzyonla sınırlıdır: eritrosit kapilleri terk etmeden alveoler ve kapiller PO₂ eşitlenir. Bariyerin kalınlaşması, egzersiz ve irtifa gibi durumlarda difüzyonla sınırlı hale gelebilir. [[K1 s. 41–42]]' },
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
    { t: 'Pulmoner fibroziste difüzyon bozukluğunun beklenen sonucu tip 2 solunum yetmezliğidir.', d: false, n: "Yanlış. CO₂ O₂'den yaklaşık 20 kat hızlı difüze olduğu için önce O₂ difüzyonu sınırlanır ve tip 1 solunum yetmezliği gelişir. Klinik olarak anlamlı hiperkapniye difüzyon bozukluğu yol açmaz. [[K1 s. 40]]" },
    { t: 'Akut pulmoner ödemde PEEP, kollabe alveolleri açarak difüzyon yüzeyini artırır ve ödemi yeniden dağıtarak bariyeri inceltir.', d: true, n: 'Doğru. Kitap PEEP\'i FiO₂ artışına ek bir önlem olarak verir. [[K1 s. 43]]' },
  ],
};

const D10_NAV = [['d10-etken', 'Beş etken'], ['d10-alveol', 'Alveolün yapısı'], ['d10-co2', 'O₂ ve CO₂'], ['d10-sinir', 'Perfüzyon mu, difüzyon mu?'], ['d10-o2', 'O₂ ne zaman sınırlanır?'], ['d10-dlco', 'Difüzyon kapasitesi'], ['d10-rezeksiyon', 'Klinik: rezeksiyon'], ['d10-yonetim', 'Klinik: yönetim'], ['d10-p1', 'Part I'], ['d10-p2', 'Part II'], ['d10-ozet', 'Özet']];

SAYFALAR['dersler/fizyoloji/10'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 2 · Solunum fizyolojisi · Bölüm 10', baslik: 'Alveoler difüzyon',
  lede: 'Gazların alveol-kapiller bariyeri geçişi: difüzyon hızını belirleyen beş etken, O₂ ile CO₂ farkı, perfüzyonla ve difüzyonla sınırlı aktarım, O₂ aktarımının ne zaman difüzyonla sınırlandığı, difüzyon kapasitesinin ölçümü ve iki klinik uygulama. [[K1 s. 40–43]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D10_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d10-etken">
  <h2>Difüzyon hızını belirleyen beş etken</h2>
  <p class="intro">Bir maddenin biyolojik bir zardan difüzyon hızı beş etkene bağlıdır. Gazlarda konsantrasyon farkının yerini parsiyel basınç farkı alır. [[K1 s. 40]]</p>
  <div class="tbl-wrap" style="margin-bottom:14px">
    <table class="tbl">
      <thead><tr><th>Etken</th><th>Difüzyon hızıyla ilişkisi</th><th>Neye ait?</th></tr></thead>
      <tbody>
        <tr><th>Konsantrasyon gradyanı<br><span class="small muted">gazlarda parsiyel basınç gradyanı · Fick yasası</span></th><td>Doğru orantılı</td><td>Klinikte değiştirilebilir: O₂ için FiO₂ artırılır [[K1 s. 40]]</td></tr>
        <tr><th>Molekül ağırlığı (MW)<br><span class="small muted">Graham yasası</span></th><td>MW'nin kareköküyle ters orantılı</td><td>Difüze olan maddenin özelliği [[K1 s. 40]]</td></tr>
        <tr><th>Çözünürlük</th><td>Doğru orantılı</td><td>Difüze olan maddenin özelliği [[K1 s. 40]]</td></tr>
        <tr><th>Yüzey alanı</th><td>Doğru orantılı</td><td>Difüzyon bariyerinin özelliği [[K1 s. 40]]</td></tr>
        <tr><th>Zar kalınlığı</th><td>Ters orantılı</td><td>Difüzyon bariyerinin özelliği [[K1 s. 40]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="f10-denklem" role="img" aria-label="Difüzyon hızı, yüzey alanı çarpı parsiyel basınç gradyanı çarpı çözünürlük bölü kalınlık çarpı molekül ağırlığının karekökü ile orantılıdır">
    <span class="f10-dk-sol">Difüzyon hızı ∝</span>
    <span class="f10-kesir"><span>yüzey alanı × gradyan × çözünürlük</span><span>kalınlık × √MW</span></span>
  </div>
  <p class="small muted" style="margin:8px 0 14px">Temel denklem: beş etkenin birleşimi. [[K1 s. 40]]</p>
  <div class="blk-body">
    <p>Beş etkenden ikisi bariyere (yüzey alanı ve kalınlık), ikisi difüze olan maddeye (çözünürlük ve MW) aittir. Kitabın buradan çıkardığı sonuç: belirli bir klinik durumda değiştirilebilen tek etken gradyandır; O₂ için bu, solunan O₂ fraksiyonunu (FiO₂) artırmak demektir. [[K1 s. 40]]</p>
  </div>
  <div class="viz" style="margin-top:14px"><div data-viz="f10_fick"></div></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> (1) Kitap "Fick yasası" adını yalnızca gradyan etkeni için kullanır. Fizyoloji kaynaklarında Fick'in difüzyon yasası denklemin bütünüdür: hız, yüzey alanı, difüzyon katsayısı ve basınç farkıyla doğru, kalınlıkla ters orantılıdır; difüzyon katsayısı da çözünürlükle doğru, MW'nin kareköküyle ters orantılıdır (Graham yasası). İki anlatım aynı denkleme varır. (2) Bölümün sonundaki klinik kısımda kitap, anestezistin gradyanın yanında yüzey alanı ve kalınlık üzerinde de belirli bir kontrolü olduğunu yazar; örneği pulmoner ödemde PEEP'tir [[K1 s. 43]]. "Değiştirilebilen tek etken gradyandır" cümlesini, alanı ve kalınlığı hastalığın belirlediği, kısa sürede değiştirilemeyen durumlar için okuyun.</div>
</section>

<section class="wrap blk ders-sec" id="d10-alveol">
  <h2>Alveol etkin gaz difüzyonu için nasıl yapılanmıştır?</h2>
  <p class="intro">Akciğer anatomisinin iki özelliği gaz değişimini etkin kılar: çok geniş bir yüzey ve çok ince bir bariyer. Difüzyon için ayrılan süre ise sınırlıdır. [[K1 s. 40]]</p>
  <div class="cols cols-3" style="margin-bottom:14px">
    <div class="card basic f10-sayi"><span class="tag basic">Yüzey</span><b>≈ 300 milyon</b><p>alveol, gaz değişimi için toplam yaklaşık <b>70 m²</b> yüzey sağlar. [[K1 s. 40]]</p></div>
    <div class="card basic f10-sayi"><span class="tag basic">Kalınlık</span><b>200 nm</b><p>Alveol-kapiller bariyer bazı yerlerde bu kadar incedir. [[K1 s. 40]]</p></div>
    <div class="card gold f10-sayi"><span class="tag gold">Süre</span><b>0,75 s · 0,25 s</b><p>İstirahatte eritrosit pulmoner kapilleri ortalama 0,75 s'de geçer; O₂ difüzyonu genellikle ilk 0,25 s içinde tamamlanır. [[K1 s. 40]]</p></div>
  </div>
  <div class="blk-body">
    <p>Difüzyon o kadar etkindir ki istirahatte yaklaşık <b>üç katlık bir güvenlik payı</b> vardır (0,75 / 0,25). Bu yüksek pay nedeniyle hipokseminin nedeni, V̇/Q̇ uyumsuzluğu gibi diğer etkenlerle karşılaştırıldığında nadiren bir difüzyon kusurudur. [[K1 s. 40]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Alveol-kapiller bariyer üç doku katmanından oluşur: alveol epiteli (tip I pnömositler), interstisyum (en ince yerlerde epitel ile endotelin bazal membranları kaynaşır) ve kapiller endoteli. Alveol yüzeyini ayrıca ince bir sıvı ve sürfaktan tabakası örter. Kitaptaki 200 nm, bu bariyerin en ince yerleridir. O₂ bariyeri geçtikten sonra Hb'ye ulaşmak için plazmayı ve eritrosit zarını da geçer. V̇/Q̇ ilişkileri Bölüm 15'te işlenir.</div>
</section>

<section class="wrap blk ders-sec" id="d10-co2">
  <h2>Akciğerde O₂ ve CO₂ difüzyonu</h2>
  <p class="intro">Difüzyon hızını belirleyen etkenlerden ikisi difüze olan maddeye özgüdür: MW ve çözünürlük. O₂ (32 Da) ile CO₂'nin (44 Da) molekül ağırlıkları birbirine yakındır; ama CO₂'nin çözünürlük katsayısı çok daha yüksek olduğu için CO₂ O₂'den yaklaşık <b>20 kat</b> hızlı difüze olur. [[K1 s. 40]]</p>
  <div class="cols" style="margin-bottom:14px">
    <div class="card"><span class="tag crit">Difüzyon kusurunda</span><h3>Önce O₂ etkilenir</h3><p>Difüzyon kusuru olan bir hastada (ör. pulmoner fibrozis) O₂ difüzyonunun sınırlanma olasılığı CO₂ difüzyonununkinden daha yüksektir. Sonuç tip 1 solunum yetmezliğidir. [[K1 s. 40]]</p></div>
    <div class="card"><span class="tag basic">Hiperkapni</span><h3>Difüzyondan kaynaklanmaz</h3><p>Klinik olarak anlamlı hiperkapniye hiçbir zaman difüzyon bozukluğu yol açmaz. Yükselmiş bir PaCO₂ gördüğünüzde nedeni başka yerde arayın. [[K1 s. 40]]</p></div>
  </div>
  <p class="small muted" style="margin-bottom:12px">Yukarıdaki modelde gazı CO₂ yapın: aynı gradyanda hız yaklaşık 20 katına çıkar, yön tersine döner. [[K1 s. 40]]</p>
  <div class="note plain"><b>Atlas notu.</b> (1) Graham yasasına göre daha ağır olan CO₂, O₂'den √(44/32) ≈ 1,17 kat yavaş difüze olmalıydı. Demek ki 20 katlık üstünlüğün tamamı çözünürlükten gelir ve çözünürlük oranı 20'nin biraz üzerindedir (20 × 1,17 ≈ 23). Bölüm 9'daki "çözünürlük yaklaşık 20 kat" ifadesi yuvarlatılmış bir değerdir. (2) Akciğerde CO₂ için gradyan zaten küçüktür: miks venöz kanda PCO₂ 6,1 kPa, arteriyel kanda 5,3 kPa [[K1 s. 39]]. Hızlı difüzyon bu küçük farkı yeterli kılar. (3) Tip 1 solunum yetmezliği hiperkapnisiz hipoksemidir; tip 2'de hipoksemiye hiperkapni eşlik eder.</div>
</section>

<section class="wrap blk ders-sec" id="d10-sinir">
  <h2>Diğer gazlarla karşılaştırma: perfüzyonla ve difüzyonla sınırlı aktarım</h2>
  <p class="intro">O₂'yi başka gazlarla karşılaştırmak karmaşıktır: kana geçen O₂'nin çoğu Hb'ye bağlanır, bir kısmı plazmada çözünür (Bölüm 8). PO₂'yi belirleyen, plazmada çözünmüş O₂'dir. Eritrosit kapilleri geçerken plazmaya difüze olan O₂ PO₂'yi yükseltir, bu da bariyerin iki yanı arasındaki basınç farkını küçültür. Yaklaşık 0,25 s sonra alveoler ve plazma PO₂ eşitlenir; bundan sonra net difüzyon durur. [[K1 s. 41]]</p>
  <div class="blk-body" style="margin-bottom:14px">
    <p>Anestezi açısından önemli solunan gazlar N₂O, volatil anestezikler ve karbon monoksittir (CO). Hepsi düşük molekül ağırlıklı küçük moleküllerdir; N₂O suda O₂'den çok daha fazla çözünür (kitap CO'yu da böyle sayar; aşağıdaki Atlas notuna bakın). Davranışlarını ayıran, Hb'ye bağlanıp bağlanmamalarıdır. [[K1 s. 41]]</p>
  </div>
  <div class="cols cols-3" style="margin-bottom:14px">
    <div class="card f10-gk" style="--k:var(--warn)"><span class="tag warn">Difüzyonla sınırlı</span><h3>Karbon monoksit</h3><p>Hb'ye O₂'den 250 kat yüksek afiniteyle bağlanır; plazmada neredeyse hiç çözünmüş CO kalmaz, plazma PCO'su çok düşüktür. Eritrosit kapillerin sonuna vardığında bile bariyerin iki yanı arasında büyük bir parsiyel basınç farkı sürer: denge hiç kurulmaz. Aktarımı, gelen kan miktarı değil difüzyon hızı sınırlar. Difüzyon kapasitesi bu yüzden CO ile ölçülür. [[K1 s. 41]]</p></div>
    <div class="card f10-gk" style="--k:var(--c-clin)"><span class="tag clin">Perfüzyonla sınırlı</span><h3>N₂O ve volatil anestezikler</h3><p>Hb'ye bağlanmazlar, plazmada yalnızca çözünmüş olarak taşınırlar. Alveol ile plazma arasında, eritrosit kapilleri geçmeden çok önce denge kurulur; N₂O en hızlısıdır (0,075 s içinde), volatil anestezikler biraz daha geç. Daha fazla kan gelseydi alveolden daha fazla N₂O geçerdi: aktarımı kan akımı sınırlar. [[K1 s. 41]]</p></div>
    <div class="card f10-gk" style="--k:var(--crit)"><span class="tag crit">Normalde perfüzyonla sınırlı</span><h3>Oksijen</h3><p>Normal koşullarda O₂ aktarımı da perfüzyonla sınırlıdır: N₂O'da olduğu gibi, eritrosit kapilleri terk etmeden alveoler ve kapiller PO₂ eşitlenir. Ne zaman difüzyonla sınırlı hale geldiği bir sonraki başlıktadır. [[K1 s. 41]]</p></div>
  </div>
  <div class="viz"><div data-viz="f10_kapiller"></div></div>
  <div class="tbl-wrap" style="margin-top:14px">
    <table class="tbl">
      <thead><tr><th>Gaz</th><th>Hb'ye bağlanma</th><th>Kapiller sonunda</th><th>Aktarımı sınırlayan</th></tr></thead>
      <tbody>
        <tr><th>N₂O</th><td>Yok</td><td>Denge (0,075 s içinde)</td><td>Perfüzyon [[K1 s. 41]]</td></tr>
        <tr><th>Volatil anestezikler</th><td>Yok</td><td>Denge (N₂O'dan biraz geç)</td><td>Perfüzyon [[K1 s. 41]]</td></tr>
        <tr><th>O₂ (normal koşullar)</th><td>Var; çoğu Hb'ye bağlı</td><td>Denge (≈ 0,25 s)</td><td>Perfüzyon [[K1 s. 41]]</td></tr>
        <tr><th>CO</th><td>Çok güçlü (O₂'nin 250 katı)</td><td>Denge yok</td><td>Difüzyon [[K1 s. 41]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap aynı sayfada N₂O'yu hem "suda O₂'den çok daha fazla çözünür" hem de "görece az çözünür" diye niteler. İki ifade farklı şeyleri karşılaştırır. İlki fiziksel çözünürlüktür: N₂O'nun kan/gaz dağılım katsayısı 0,47'dir, plazmada çözünmüş O₂'ninkinden çok yüksektir. İkincisi kanın gazı taşıma kapasitesidir: Hb'ye bağlanmayan bir gaz yalnızca çözünmüş olarak taşınır; kanın parsiyel basınç birimi başına tutabildiği miktar, Hb'nin bağladığı O₂ ve CO'ya göre küçük kalır ve plazma parsiyel basıncı hızla alveoler değere yükselir. CO'da ise Hb bağladıkça plazma parsiyel basıncı yükselemez; O₂ ikisinin arasında kalır. Kitap aynı yerde CO'yu da suda O₂'den çok daha çözünür sayar; bu doğru değildir: CO'nun sudaki çözünürlüğü O₂'ninkine yakın, biraz daha düşüktür. CO'yu O₂'den ayıran çözünürlüğü değil, Hb'ye çok güçlü bağlanmasıdır.</div>
</section>

<section class="wrap blk ders-sec" id="d10-o2">
  <h2>O₂ aktarımı ne zaman difüzyonla sınırlı olur?</h2>
  <p class="intro">Normalde perfüzyonla sınırlı olan O₂ aktarımı bazı durumlarda difüzyonla sınırlı hale gelebilir. Ortak sonuç, eritrosit kapillerin sonuna vardığında alveoler ve kapiller PO₂'nin eşitlenmemiş olması, yani hipoksemidir. [[K1 s. 42]]</p>
  <div class="cols cols-3" style="margin-bottom:14px">
    <div class="card"><span class="tag crit">1 · Bariyer</span><h3>Kalınlaşmış bariyer</h3><p>Pulmoner fibrozis gibi durumlarda bariyer kalınlaşır, difüzyon hızı düşer. Eritrosit kapillerin sonuna vardığında alveoler ve kapiller PO₂ dengeye gelmemiştir: hipoksemi. [[K1 s. 42]]</p></div>
    <div class="card"><span class="tag warn">2 · Süre</span><h3>Egzersiz</h3><p>Kalp debisi artar, eritrositin kapillerde kaldığı süre kısalır; aşırı egzersizde 0,25 s'ye kadar iner. Normal bariyerde denge bu sürede ancak kurulur. Bariyer hastalığı olan hastada egzersizin geçiş süresini her kısaltışı hipoksemiye yol açar. [[K1 s. 42]]</p></div>
    <div class="card"><span class="tag basic">3 · Gradyan</span><h3>İrtifa</h3><p>Yüksekte düşük barometrik basınç (PB) alveoler PO₂'yi düşürür (Bölüm 18 ve 87); O₂ aktarımı daha düşük bir eşikte difüzyonla sınırlı olur. Deniz seviyesinde istirahatte dengeye ancak ulaşan hafif akciğer hastası, yüksekte O₂ difüzyon bozukluğu geliştirir. Yüksekte normal akciğerde bile yoğun egzersiz difüzyon sınırlamasına ve hipoksemiye yol açabilir. [[K1 s. 42]]</p></div>
  </div>
  <div class="viz"><div data-viz="f10_sinir"></div></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> (1) Kitabın metni hafif akciğer hastalığında istirahatte dengeye "ancak" ulaşıldığını yazar; Şekil 10.2'deki kalınlaşmış bariyer eğrisi ise istirahatte de kapiller sonunda PO₂'nin biraz düşük kaldığını gösterir. Bunlar aynı ilkenin iki derecesidir; modeldeki "hafif" ve "belirgin" kalınlaşma seçenekleri ikisini ayrı ayrı gösterir. (2) İrtifada eğrinin neden yavaş yükseldiği: kan, oksihemoglobin ayrışma eğrisinin dik bölümünde çalışır. PO₂'nin biraz yükselmesi için bile çok miktarda O₂'nin Hb'ye geçmesi gerekir; gradyan ise zaten küçüktür.</div>
</section>

<section class="wrap blk ders-sec" id="d10-dlco">
  <h2>Akciğer difüzyon kapasitesi (DLCO, TLCO)</h2>
  <p class="intro">Akciğerin karbon monoksit için difüzyon kapasitesi (DLCO; "transfer faktörü" ya da TLCO diye de adlandırılır), akciğerlerin gaz aktarma yeteneğinin bir ölçüsüdür ve solunum fonksiyon testlerinin bir parçasıdır. CO difüzyonla sınırlı bir gaz olduğu için alımı, kan akımını değil bariyerin durumunu yansıtır. [[K1 s. 41–42]]</p>
  <div class="blk-body" style="margin-bottom:14px">
    <p>Test: hasta %0,3 CO içeren gazdan tek bir vital kapasite soluğu alır, 10 s tutar ve verir. İnspire ve ekspire edilen PCO ölçülür; aradaki fark, bariyeri geçip Hb'ye bağlanan CO miktarıdır. Sonuç genellikle hastanın Hb konsantrasyonuna göre düzeltilir; irtifa, yaş ve cinsiyet de sonucu etkiler. Difüzyon kapasitesi alveol-kapiller bariyer hastalığının tanısında kullanılır. [[K1 s. 42]]</p>
  </div>
  <div class="viz"><div data-viz="f10_dlco"></div></div>
  <div class="cols" style="margin-top:14px">
    <div class="card"><span class="tag crit">DLCO azalır</span><h3>Bariyer kalınlaşır ya da alan küçülür</h3><ul><li><b>Kalınlaşmış bariyer:</b> pulmoner fibrozis ve diğer interstisyel akciğer hastalıkları (kronik), pulmoner ödem (akut). [[K1 s. 42]]</li><li><b>Azalmış gaz değişim yüzeyi:</b> amfizem, pulmoner emboli, pnömonektomi ya da lobektomi sonrası. [[K1 s. 43]]</li></ul></div>
    <div class="card"><span class="tag ok">DLCO artar · daha seyrek</span><h3>Artmış DLCO nedenleri</h3><ul><li><b>Egzersiz:</b> pulmoner kapillerlerin açılması (recruitment) ve genişlemesiyle. [[K1 s. 43]]</li><li><b>Pulmoner kanama.</b> [[K1 s. 43]]</li><li><b>Astım;</b> ancak DLCO normal de olabilir. [[K1 s. 43]]</li><li><b>Obezite.</b> [[K1 s. 43]]</li></ul></div>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p><b>Transfer katsayısı (KCO).</b> Pnömonektomi ya da lobektomi geçirmiş hastada alveoler hacim kaybını hesaba katan bir düzeltme yapılır. Böylece geride kalan alveollerin difüzyon kapasitesi ayrıca değerlendirilebilir. [[K1 s. 43]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> (1) DLCO, birim zamanda alınan CO miktarının alveoler PCO'ya bölümüdür; kapiller PCO sıfıra yakın kabul edildiği için sürücü basınç alveoler PCO'dur. (2) Gerçek tek soluk testinde karışıma bir iz gaz (ör. helyum ya da metan) da eklenir; onun seyrelmesinden alveoler hacim (VA) ve CO'nun alveoldeki başlangıç konsantrasyonu hesaplanır. KCO = DLCO / VA. (3) Hb düzeltmesinin nedeni: CO'yu bağlayan Hb'dir; anemide ölçülen DLCO düşük, polisitemide yüksek çıkar. (4) Pulmoner kanamada alveol içine geçen eritrositlerin Hb'si de CO bağladığı için DLCO yükselir.</div>
</section>

<section class="wrap blk ders-sec" id="d10-rezeksiyon">
  <h2>Klinik önem: akciğer rezeksiyonu</h2>
  <p class="intro">Pnömonektominin mortalitesi %8'e kadar çıkabilir; lobektomide yaklaşık %2'dir. Bu yüzden preoperatif değerlendirmede hastanın ameliyattan sonraki akciğer işlevini öngörebilmek önemlidir; akciğer rezeksiyonu düşünülen hastalara rutin olarak solunum fonksiyon testleri yapılır. [[K1 s. 43]]</p>
  <div class="cols" style="margin-bottom:14px">
    <div class="card basic"><span class="tag basic">FEV₁</span><h3>Mekanik yetenek</h3><p>Birinci saniyedeki zorlu ekspiratuvar hacim, akciğer ve göğüs duvarının mekanik yeteneğini yansıtır. [[K1 s. 43]]</p></div>
    <div class="card clin"><span class="tag clin">DLCO</span><h3>Alveol-kapiller işlev</h3><p>Difüzyon kapasitesi, alveol-kapiller işlevin kaba bir ölçüsüdür. [[K1 s. 43]]</p></div>
  </div>
  <div class="blk-body">
    <p>Postoperatif akciğer işlevi, preoperatif ölçülen FEV₁ ve DLCO'ya dayanan bir hesapla tahmin edilir ve beklenen değerlerle karşılaştırılır. İkisi birlikte değerlendirilerek hasta, ölüm ve postoperatif pulmoner komplikasyonlar açısından düşük ya da yüksek riskli olarak sınıflanır. [[K1 s. 43]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap hesabın ayrıntısını vermez. Yaygın yöntem segment sayımıdır: öngörülen postoperatif (ppo) değer = preoperatif değer × (kalan segment / toplam segment). İki akciğerde toplam 19 segment sayılır: sağ üst lob 3, orta lob 2, sağ alt lob 5; sol üst lob 3, lingula 2, sol alt lob 4. Aynı hesap FEV₁'e ve DLCO'ya uygulanır. Örnek: preoperatif FEV₁'i beklenenin %80'i olan bir hastada sağ alt lobektomi (5 segment) için ppo-FEV₁ = 80 × 14/19 ≈ %59. Hangi ppo değerinin yüksek risk sayılacağı ve egzersiz testine ne zaman gerek olduğu güncel kılavuzlarda tanımlanır; eşikler kılavuzdan kılavuza farklıdır.</div>
  <div class="tbl-wrap" style="margin-top:12px">
    <table class="tbl">
      <thead><tr><th>Rezeksiyon (Atlas notu)</th><th>Çıkarılan segment</th><th>Kalan oran</th></tr></thead>
      <tbody>
        <tr><th>Sağ üst lobektomi</th><td class="num">3</td><td class="num">16/19 ≈ %84</td></tr>
        <tr><th>Orta lobektomi</th><td class="num">2</td><td class="num">17/19 ≈ %89</td></tr>
        <tr><th>Sağ alt lobektomi</th><td class="num">5</td><td class="num">14/19 ≈ %74</td></tr>
        <tr><th>Sol üst lobektomi (lingula dahil)</th><td class="num">5</td><td class="num">14/19 ≈ %74</td></tr>
        <tr><th>Sol alt lobektomi</th><td class="num">4</td><td class="num">15/19 ≈ %79</td></tr>
        <tr><th>Sağ pnömonektomi</th><td class="num">10</td><td class="num">9/19 ≈ %47</td></tr>
        <tr><th>Sol pnömonektomi</th><td class="num">9</td><td class="num">10/19 ≈ %53</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="wrap blk ders-sec" id="d10-yonetim">
  <h2>Klinik önem: difüzyon bozukluğu olan hastanın yönetimi</h2>
  <p class="intro">Alveoler difüzyon bozukluğunun sonucu hipoksemidir; böyle bir hastada anestezistin başlıca kaygısı hipokseminin önlenmesi ve tedavisidir. Beş etkenden O₂'nin çözünürlüğü ve MW'si sabittir; kalan üçü üzerinde anestezistin belirli bir kontrolü vardır. [[K1 s. 43]]</p>
  <div class="cols" style="margin-bottom:14px">
    <div class="card gold"><span class="tag gold">Gradyan → FiO₂</span><h3>Basınç farkını büyütün</h3><p>Kalınlaşmış bariyerin yavaşlattığı difüzyon, FiO₂ artırılıp O₂ basınç gradyanı yükseltilerek dengelenebilir. Pulmoner fibrozisli hastada egzersize bağlı hipoksemiyi gidermek için taşınabilir ek O₂ kullanılması bu ilkeye dayanır. [[K1 s. 43]]</p></div>
    <div class="card gold"><span class="tag gold">Alan ve kalınlık → PEEP</span><h3>Akut pulmoner ödemde</h3><p>Yükselen pulmoner venöz basınç sıvının alveollere ve pulmoner interstisyuma sızmasına yol açar: bariyer kalınlaşır, gaz değişimine açık alan küçülür; ikisi de difüzyonu yavaşlatır. FiO₂ artışına ek olarak uygulanan PEEP kollabe alveolleri açarak yüzey alanını artırır, alveoler basıncı yükselterek ödemi yeniden dağıtır ve bariyeri inceltir. [[K1 s. 43]]</p></div>
  </div>
  <div class="viz"><div data-viz="f10_odem"></div></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Pulmoner ödemde hipokseminin önemli bir bölümü difüzyondan değil, sıvıyla dolu ya da kollabe alveollerden geçen kanın oluşturduğu şanttan kaynaklanır (Bölüm 14). Şant büyüdükçe FiO₂ artışının etkisi azalır; PEEP'in kollabe alveolleri açması bu açıdan da yararlıdır. Yukarıdaki model şantı hesaba katmaz, yalnızca difüzyon terimlerini gösterir.</div>
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
    <span class="sonraki">Sonraki: Bölüm 11 · Ventilasyon ve ölü boşluk (hazırlanıyor)</span>
  </nav>
</section>`,
};
