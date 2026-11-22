/* Fizyoloji Bölüm 31 · Kardiyak basınç–hacim halkaları (K1 İngilizce baskı s. 136–140).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz31-1'] = {
  no: 1, kok: 'Sol ventrikül basınç–hacim halkası ve ön yük ile ard yükün etkisi için:', kagit: 'Paper A · fizyoloji, Bölüm 31', kaynak: '[[K1 s. 136–137]]',
  onermeler: [
    { t: 'İzovolümetrik kasılma sırasında ventrikül hacmi atım hacmi kadar azalır.', d: false, n: 'Yanlış. İzovolümetrik kasılma halkanın dikey kenarıdır: basınç yükselir, hacim değişmez. Atım hacmi ancak aort kapağı açıldıktan sonra, ejeksiyon evresinde atılır. [[K1 s. 136]]' },
    { t: 'Basınç–hacim halkasının genişliği atım hacmini gösterir.', d: true, n: 'Doğru. Genişlik, diyastol sonu hacim ile sistol sonu hacim arasındaki farktır: SV = LVEDV − LVESV. [[K1 s. 137]] [[K1 s. 119]]' },
    { t: 'Ön yük artınca LVESV de hafifçe artar, çünkü artan kalp debisi aort basıncını, yani ard yükü yükseltir.', d: true, n: 'Doğru. Halkanın asıl genişlemesi LVEDV artışındandır (Starling); LVESV\'deki küçük artış artan ard yüke bağlıdır. Sistolik ve diyastolik kan basıncı hafifçe yükselir. [[K1 s. 137]]' },
    { t: 'EDPVR sol ventrikülün pasif diyastolik kompliyansını yansıtır; belirli bir ön yükün ötesinde LVEDP keskin biçimde yükselir.', d: true, n: 'Doğru. Kompliyans doğrusal değildir: miyokarttaki elastik proteinler ve bağ dokusu elastik sınırlarına ulaşınca küçük hacim artışı büyük basınç artışı yapar. [[K1 s. 137]]' },
    { t: 'Ard yük artışının net sonucunda LVESV artışı LVEDV artışından büyüktür; halka daha uzun ve daha dar görünür.', d: true, n: 'Doğru. Sarkomer kısalmasının hızı ve miktarı azalır, LVESV artar; venöz dönüş eklenince LVEDV de artar ama daha az. SV hafifçe azalır. [[K1 s. 137]]' },
  ],
};
VERI.sorular['fiz31-2'] = {
  no: 2, kok: 'Kontraktilite ve kalbin işi için:', kagit: 'Paper A · fizyoloji, Bölüm 31', kaynak: '[[K1 s. 137–139]]',
  onermeler: [
    { t: 'Pozitif inotropi, sistol sonu basınç–hacim ilişkisi (ESPVR) çizgisinin eğimini artırır.', d: true, n: 'Doğru. Kontraktilite grafikte ESPVR eğimiyle gösterilir; otonom sinir sistemi, dolaşan hormonlar ya da pozitif inotrop ilaçlarla dışarıdan değişir ve ön yük ile ard yükten bağımsızdır. [[K1 s. 137–138]]' },
    { t: 'Kontraktilite artınca LVEDV, LVESV\'den daha çok azalır.', d: false, n: 'Yanlış. Tersi doğrudur: LVESV belirgin düşer, venöz dönüş eklenince LVEDV yalnız hafifçe düşer. LVESV daha çok azaldığı için SV artar. [[K1 s. 138]]' },
    { t: 'Halkanın içinde kalan alan iç işi (basınç işi) gösterir.', d: false, n: 'Yanlış. Halkanın alanı (basınç × hacim) dış işi, yani atım işini gösterir. İç iş ESPVR, EDPVR ve izovolümetrik gevşeme çizgisi arasındaki alandır. [[K1 s. 138]]' },
    { t: 'Basınç–hacim alanı (PVA) dış ve iç işin toplamıdır ve miyokardın O₂ tüketimiyle şaşırtıcı ölçüde iyi korelasyon gösterir.', d: true, n: 'Doğru. Küçük bir fark kalır, çünkü kalbin enerji harcamasının küçük bir yüzdesi mekanik iş değil bazal metabolizmadır. [[K1 s. 139]]' },
    { t: 'Ard yük artışı dış işi belirgin artırmasa bile miyokardın O₂ gereksinimini azaltır.', d: false, n: 'Yanlış. Ard yük artışı iç işi artırır; bu yüzden miyokardın O₂ gereksinimi artar. Ön yük artışı dış işi, kontraktilite artışı dış işi artırır; üçünde de O₂ gereksinimi yükselir. [[K1 s. 139]]' },
  ],
};
VERI.sorular['fiz31-3'] = {
  no: 3, kok: 'Sağ ventrikül halkası ve kalp yetmezliğinde halka için:', kagit: 'Paper A · fizyoloji, Bölüm 31', kaynak: '[[K1 s. 139–140]]',
  onermeler: [
    { t: 'Sağ ventrikül halkası, normal sol ventrikülünki gibi yaklaşık dikdörtgen biçimlidir.', d: false, n: 'Yanlış. Sağ ventrikül halkası karakteristik olarak üçgen biçimlidir; sol ventrikül halkası yaklaşık dikdörtgendir. [[K1 s. 136, 139]]' },
    { t: 'Aynı atım hacmini pompalamasına karşın sağ ventrikülün atım işi sol ventrikülünkünün yalnız %20–25\'i kadardır.', d: true, n: 'Doğru. Pulmoner vasküler direnç ve pulmoner arter basıncı düşük olduğundan sağ ventrikül çok daha düşük bir ard yükü yener; halkanın alanı küçüktür. [[K1 s. 139]]' },
    { t: 'Sağ ventrikülde ejeksiyon sistolün erken döneminde başlar: basınç yükselmeye başladıktan kısa süre sonra hacim düşer.', d: true, n: 'Doğru. Bu yüzden halkada belirgin bir izovolümetrik kasılma kenarı yoktur ve halka üçgene benzer. [[K1 s. 139]]' },
    { t: 'Sistolik sol ventrikül yetmezliğinde ESPVR eğimi azalır; LVEDV ve LVESV artar, SV normalin altına düşer.', d: true, n: 'Doğru. Kontraktilite azalır, ventrikül normalden az kan atar ve geride normalden fazla kan kalır. [[K1 s. 140]]' },
    { t: 'Diyastolik sol ventrikül yetmezliğinde ESPVR eğimi azalır, LVEDV artar.', d: false, n: 'Yanlış. Diyastolik yetmezlikte sorun kompliyansın azalmasıdır: EDPVR farklı (daha dik) bir yol izler, ESPVR değişmez. LVEDP artar, LVEDV ve SV azalır. [[K1 s. 139–140]]' },
  ],
};

const D31_NAV = [
  ['d31-halka', 'Sol ventrikül halkası'], ['d31-yuk', 'Ön yük, ard yük, kontraktilite'], ['d31-is', 'Halka ve kalbin işi'],
  ['d31-sag', 'Sağ ventrikül'], ['d31-yetmezlik', 'Kalp yetmezliği'],
  ['d31-p1', 'Part I'], ['d31-p2', 'Part II'], ['d31-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/31'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 3 · Kardiyovasküler fizyoloji · Bölüm 31', baslik: 'Kardiyak basınç–hacim halkaları',
  lede: 'Basınç–hacim halkası bir kalp siklusunu tek bir grafikte özetler: ön yük, ard yük ve kontraktilitenin etkisi, kalbin işi ve O₂ gereksinimi, sağ ventrikülün farkı ve yetmezliğin türü halkanın biçiminden okunur. [[K1 s. 136–140]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D31_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d31-halka">
  <h2>Sol ventrikül basınç–hacim halkası</h2>
  <p class="intro">Sol ventrikülün (LV) basıncı hacmine karşı çizilince bir siklus kapalı bir halka oluşturur; normal LV'de halka yaklaşık dikdörtgendir ve dört evreye ayrılır. [[K1 s. 136]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Bir siklus halkanın çevresinde</h3></div>
    <div data-viz="f31_halka"></div>
    <p class="viz-cap" aria-live="polite"><b>Diyastol sonu.</b> Ventrikül 120 mL kanla dolmuş, basıncı düşüktür (LVEDP). Mitral kapak kapanmak üzere. Oynatın ya da evreleri tek tek izleyin. [[K1 s. 136]] [[K1 s. 119]]</p>
    <p class="viz-foot">Şematik. LVEDV 120 mL, LVESV 50 mL, SV 70 mL tipik değerlerdir [[K1 s. 119]]; diyastolik kan basıncı 80, sistolik 120 mmHg ve LVEDP ≈ 8 mmHg temsilîdir [[K1 s. 136]]. Kalp siklusunun zaman çizelgesi için Bölüm 28 [[K1 s. 117–119]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Köşeler kapak olaylarıdır. Sağ alt köşede mitral kapak kapanır; dikey <b>izovolümetrik kasılma</b> kenarında basınç hacim değişmeden diyastolik kan basıncına çıkar ve aort kapağı açılır. <b>Ejeksiyonda</b> atım hacmi (SV) aorta atılır; üst kenarın tepesi sistolik kan basıncıdır. Sol üst köşede aort kapağı kapanır, dikey <b>izovolümetrik gevşeme</b> kenarında basınç yine hacim değişmeden düşer, mitral kapak açılır ve <b>diyastolik doluş</b> ventrikülü sonraki kasılmaya hazırlar. [[K1 s. 136]]</p>
    <p>Halkanın sağ kenarı diyastol sonu hacmi (LVEDV), sol kenarı sistol sonu hacmi (LVESV), genişliği SV'dir: 120 − 50 = 70 mL, ejeksiyon fraksiyonu 70/120 ≈ %58. [[K1 s. 119, 137]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d31-yuk">
  <h2>Ön yük, ard yük ve kontraktilite halkayı nasıl değiştirir?</h2>
  <p class="intro">Halka iki sınır çizgisi arasında durur: diyastol sonu köşesi EDPVR eğrisinin, sistol sonu köşesi ESPVR doğrusunun üzerindedir; üç belirleyici bu köşeleri farklı yönlere taşır. [[K1 s. 137–138]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Üç belirleyiciyi değiştirin, halkayı izleyin</h3></div>
    <div data-viz="f31_yuk"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal.</b> LVEDV 120 mL, LVESV 50 mL, SV 70 mL. Bir durumu seçin ya da kaydırıcılarla ön yükü, ard yükü ve kontraktiliteyi değiştirin; soluk halka normali gösterir. [[K1 s. 136–138]]</p>
    <p class="viz-foot">Şematik model: ESPVR doğrusal, EDPVR üstel; ventrikülde kalan kanın yarısı sonraki doluşa eklenir (venöz dönüşün eklenmesi). Yönler kitaptandır [[K1 s. 137–138]], sayılar temsilîdir.</p>
  </div>
  <div class="tbl-wrap" style="margin-top:14px">
    <table class="tbl">
      <thead><tr><th>Değişiklik</th><th>Mekanizma</th><th>Halka</th></tr></thead>
      <tbody>
        <tr><td><b>Ön yük ↑</b><br>(LVEDV, kasılmadan önceki hacim)</td><td>Diyastolde daha çok gerilen sarkomerler daha güçlü kasılır (Starling yasası). Artan debi aort basıncını, yani ard yükü yükseltir. [[K1 s. 136–137]]</td><td>LVEDV ve SV artar, halka genişler; LVESV hafifçe artar; sistolik ve diyastolik basınç hafifçe yükselir; LVEDP EDPVR boyunca yükselir. [[K1 s. 137]]</td></tr>
        <tr><td><b>Ard yük ↑</b><br>(ör. diyastolik aort basıncı ↑)</td><td>Ard yük, ejeksiyonda LV duvarında gelişen gerilimdir: miyosit kısalmasına karşı koyan kuvvet. Artınca sarkomer kısalmasının hızı ve miktarı azalır, daha az kan atılır, LVESV artar; venöz dönüş eklenince LVEDV artar, Starling ile SV artar ve LVEDV normale yaklaşır. [[K1 s. 137]]</td><td>Sistolik ve diyastolik basınç artar; LVESV artışı LVEDV artışından büyüktür; SV hafifçe azalır; halka daha uzun ve dar. [[K1 s. 137–138]]</td></tr>
        <tr><td><b>Kontraktilite ↑</b><br>(pozitif inotropi)</td><td>Otonom sinir sistemi, dolaşan hormonlar ya da pozitif inotrop ilaçlarla dışarıdan değişir; ön yük ve ard yükten bağımsızdır. Daha güçlü kasılma ek kan atar. [[K1 s. 137–138]]</td><td>ESPVR eğimi artar; LVESV düşer; venöz dönüş eklenince LVEDV hafifçe düşer; LVESV daha çok düştüğü için SV artar. [[K1 s. 138]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Şekli okumanın anahtarı köşelerdir. Ön yük diyastol sonu köşesini EDPVR boyunca sağa kaydırır; ard yük ejeksiyonun daha yüksek bir basınçta bitmesine yol açar, sistol sonu köşesi aynı ESPVR üzerinde yukarı ve sağa kayar; kontraktilite ise ESPVR'nin kendisini dikleştirir, sistol sonu köşesi sola kayar. SV her durumda iki köşe arasındaki yatay uzaklıktır. [[K1 s. 137–138]]</p>
    <p><b>EDPVR</b> (diyastol sonu basınç–hacim ilişkisi) LV'nin pasif diyastolik kompliyansını yansıtır. Kompliyans doğrusal değildir: belirli bir ön yükün ötesinde miyokarttaki elastik proteinler ve bağ dokusu elastik sınırına ulaşır, LVEDP keskin yükselir. [[K1 s. 137]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap ard yük örneğinde LVEDV artışının "kontraktiliteyi artırdığını" yazar; Starling mekanizması kontraktiliteyi (ESPVR eğimini) değiştirmez, aynı ESPVR üzerinde kasılma kuvvetini artırır. Kontraktilite, kitabın da söylediği gibi, ön yük ve ard yükten bağımsızdır.</div>
</section>

<section class="wrap blk ders-sec" id="d31-is">
  <h2>Halka ve kalbin işi</h2>
  <p class="intro">Kalbin mekanik işi iki alanla ölçülür: halkanın içi dış işi, halkanın solunda ESPVR ile EDPVR arasındaki üçgen iç işi gösterir. [[K1 s. 138]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Dış iş, iç iş ve O₂ gereksinimi</h3></div>
    <div data-viz="f31_is"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal.</b> Halkanın alanı dış iştir (atım işi); ESPVR, EDPVR ve izovolümetrik gevşeme çizgisi arasındaki alan iç iştir. İkisinin toplamı PVA'dır. Ön yük, ard yük ya da kontraktiliteyi artırın: hangi alan büyüyor? [[K1 s. 138–139]]</p>
    <p class="viz-foot">Şematik: alanlar bir önceki şeklin modelinden hesaplanır ve normale göre yüzde olarak gösterilir. Yönler kitaptandır [[K1 s. 139]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Dış iş</b> (atım işi), kanın basınç altında ventrikülden atılması için harcanan enerjidir; bir siklusta halkanın içindeki alana (basınç × hacim) eşittir. <b>İç iş</b> ("basınç işi") izovolümetrik kasılmada harcanır: miyoflamanlar kısalmadığı için bu potansiyel enerji diyastolde ısıya dönüşür. [[K1 s. 138]]</p>
    <p>Toplam iş, yani <b>basınç–hacim alanı</b> (PVA), miyokardın O₂ tüketimiyle şaşırtıcı ölçüde iyi korelasyon gösterir. Kalbin enerjisinin çoğu mekanik işe gider; küçük bir yüzdesi bazal metabolizmadır, PVA ile O₂ tüketimi arasındaki küçük fark buradan gelir. [[K1 s. 139]]</p>
    <p>Şekilde iki alan birbirinden bağımsız değişir; bu yüzden O₂ gereksinimini yalnız atım işine bakarak tahmin etmek yanıltıcıdır. Üç belirleyicinin hepsi O₂ gereksinimini artırır: ön yük dış işi; ard yük dış işi belirgin artırmayabilir ama iç işi artırır; kontraktilite iç işi artırmayabilir ama dış işi artırır. [[K1 s. 139]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap dış işi "kinetik enerji" diye tanımlar; halkanın alanı basınç–hacim işidir, kanın kazandığı kinetik enerji istirahatte bunun yalnız ≈ %1'idir. İç iş (potansiyel enerji) de sistol sonunda kasılmış miyokartta depolanıp gevşemede ısıya dönen elastik enerjidir.</div>
</section>

<section class="wrap blk ders-sec" id="d31-sag">
  <h2>Sağ ventrikül halkası</h2>
  <p class="intro">Sağ ventrikül (RV) aynı atım hacmini çok daha düşük bir basınçla atar; halkası karakteristik olarak üçgendir. [[K1 s. 139]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>İki ventrikül aynı eksende</h3></div>
    <div data-viz="f31_sag"></div>
    <p class="viz-cap" aria-live="polite"><b>Aynı ölçek.</b> İki ventrikül de 70 mL atar, ama RV halkası LV halkasının tabanında küçük bir üçgen olarak kalır: alanı, yani atım işi, LV'ninkinin %20–25'idir. RV'yi büyütün ve köşelerine bakın. [[K1 s. 139]]</p>
    <p class="viz-foot">Şematik: RV halkası 0–30 mmHg aralığında çizilmiştir [[K1 s. 139]]; köşe değerleri temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Şekilde iki halkanın genişliği aynı, yüksekliği çok farklıdır: farkın tamamı basınçtan gelir. Pulmoner vasküler direnç ve dolayısıyla pulmoner arter basıncı düşük olduğundan RV çok daha düşük bir ard yükü yener. Ejeksiyon sistolün erken döneminde başlar: RV basıncı yükselmeye başladıktan kısa süre sonra hacim düşer, bu yüzden halkanın belirgin bir izovolümetrik kenarı yoktur. [[K1 s. 139]]</p>
    <p>RV'de atım işi toplam işin LV'dekinden daha büyük bir kısmını oluşturur. Bu nedenle RV pulmoner hipertansiyonda, LV'nin sistemik hipertansiyonda olduğundan daha kolay yetmezliğe girer. [[K1 s. 140]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d31-yetmezlik">
  <h2>Kalp yetmezliğinde halka</h2>
  <p class="intro">Sol ventrikül yetmezliği sistolik, diyastolik ya da karışıktır; sistolik yetmezlik ESPVR'yi, diyastolik yetmezlik EDPVR'yi değiştirir. [[K1 s. 140]] [[K1 s. 132]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hangi sınır çizgisi bozuldu?</h3></div>
    <div data-viz="f31_yetmezlik"></div>
    <p class="viz-cap" aria-live="polite"><b>Normal.</b> LVEDV 120 mL, LVESV 50 mL, SV 70 mL, EF ≈ %58. Sistolik ya da diyastolik yetmezliği seçin. [[K1 s. 119, 140]]</p>
    <p class="viz-foot">Şematik model (bir önceki modelle aynı); kompansasyon mekanizmaları gösterilmez. Yönler kitaptandır [[K1 s. 139–140]]; sistolik yetmezlikte EF %45'in altındadır [[K1 s. 132]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>İkisinde de SV azalır, ama halka farklı yönde bozulur: sistolik yetmezlikte halka sağa kayar ve daralır, diyastolik yetmezlikte sağ kenarı sola çekilir, sağ alt köşesi (LVEDP) yükselir. Ayrımı yapan, hangi köşenin hangi sınır çizgisi üzerinde yer değiştirdiğidir. [[K1 s. 139–140]]</p>
  </div>
  <div class="cols" style="margin-top:14px">
    <div class="card"><span class="tag crit">Sistolik yetmezlik</span>
      <p style="margin-top:8px">Kontraktilite azalır: ESPVR'nin eğimi düşer. LV normalin altında bir SV atar, LVESV normalden yüksek kalır, LVEDV artar. [[K1 s. 140]]</p>
    </div>
    <div class="card"><span class="tag warn">Diyastolik yetmezlik</span>
      <p style="margin-top:8px">LV kompliyansı azalır: EDPVR farklı (daha dik) bir yol izler, ESPVR değişmez. LVEDP artar, LVEDV ve SV azalır. [[K1 s. 139–140]]</p>
    </div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d31-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF sorularında en çok halkanın evreleri ve köşeleri, ön yük, ard yük ve kontraktilitenin LVEDV, LVESV ve SV'yi hangi yönde değiştirdiği, EDPVR ile ESPVR'nin anlamı, dış ve iç işin hangi alan olduğu, PVA ile O₂ tüketimi, sağ ventrikül halkasının biçimi ve sistolik ile diyastolik yetmezliğin farkı sorulur. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz31-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz31-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz31-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d31-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Sol ventrikülün basınç–hacim halkasını çizip açıklar mısınız? Ard yük artınca halka nasıl değişir? Halka miyokardın O₂ tüketimi hakkında ne söyler?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Eksenler ve dört evre.</b> x ekseni LV hacmi (mL), y ekseni LV basıncı (mmHg). Diyastolik doluş, izovolümetrik kasılma, ejeksiyon, izovolümetrik gevşeme; köşelerde mitral kapanır, aort açılır, aort kapanır, mitral açılır. [[K1 s. 136]]</li>
    <li><b>Sayılar.</b> LVEDV 120 mL, LVESV 50 mL, SV 70 mL (halkanın genişliği), EF ≈ %58; aort kapağı diyastolik, ejeksiyonun tepesi sistolik kan basıncında. [[K1 s. 119, 136–137]]</li>
    <li><b>Sınır çizgileri.</b> EDPVR pasif diyastolik kompliyanstır, büyük hacimlerde keskin yükselir (elastik proteinler, bağ dokusu); ESPVR'nin eğimi kontraktilitedir. [[K1 s. 137–138]]</li>
    <li><b>Ard yük.</b> Ejeksiyonda duvar gerilimi; artınca sarkomer kısalmasının hızı ve miktarı azalır, LVESV artar, venöz dönüşle LVEDV daha az artar; SV hafifçe düşer, halka uzun ve dar. Ön yük (LVEDV ↑, halka genişler) ve kontraktiliteyle (ESPVR dikleşir, LVESV ↓) karşılaştırın. [[K1 s. 137–138]]</li>
    <li><b>İş ve O₂.</b> Dış iş halkanın alanı, iç iş ESPVR, EDPVR ve izovolümetrik gevşeme çizgisi arasındaki alan; toplamları PVA, miyokardın O₂ tüketimiyle iyi korelasyon gösterir (bazal metabolizma küçük farkı açıklar). Ard yük iç işi, ön yük ve kontraktilite dış işi artırır; üçü de O₂ gereksinimini yükseltir. [[K1 s. 138–139]]</li>
    <li><b>Genişletin.</b> RV halkası üçgen, düşük basınçlı, atım işi LV'nin %20–25'i; pulmoner hipertansiyona dayanıksız. Sistolik yetmezlikte ESPVR yatıklaşır, diyastolik yetmezlikte EDPVR dikleşir. [[K1 s. 139–140]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada çizilecek olan halkanın kendisidir: eksenleri etiketleyin, alt kenara EDPVR eğrisini, sol üst köşeden geçen ESPVR doğrusunu çizin, dört köşeye kapak olaylarını, kenarlara LVESV, LVEDV ve SV'yi yazın. Ard yük için aynı ESPVR üzerinde daha uzun ve dar ikinci bir halka ekleyin; iç iş üçgenini tarayın.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Ön yük ve kontraktilite artışı halkayı nasıl değiştirir? Kontraktilite neden ön ve ard yükten bağımsızdır? EDPVR neden büyük hacimlerde dikleşir? Hangi alan dış, hangisi iç iştir, PVA neden O₂ tüketimini tam karşılamaz? RV halkası neden üçgendir ve RV neden pulmoner hipertansiyona dayanıksızdır? Sistolik ve diyastolik yetmezlik halkada nasıl ayrılır? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 137–140]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d31-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Normal LV halkası yaklaşık dikdörtgendir: diyastolik doluş, izovolümetrik kasılma, ejeksiyon ve izovolümetrik gevşeme; genişliği SV'dir (120 − 50 = 70 mL). [[K1 s. 136–137]] [[K1 s. 119]]</li>
    <li>EDPVR pasif kompliyansı gösterir ve belirli bir ön yükün ötesinde dikleşir; ESPVR'nin eğimi kontraktilitedir. [[K1 s. 137–138]]</li>
    <li>Ön yük ↑: LVEDV ve SV ↑, LVESV hafifçe ↑. Ard yük ↑: LVESV, LVEDV'den çok ↑, SV hafifçe ↓, halka uzun ve dar. Kontraktilite ↑: LVESV ↓, LVEDV hafifçe ↓, SV ↑. [[K1 s. 137–138]]</li>
    <li>Dış iş halkanın alanıdır; iç iş (basınç işi) ESPVR, EDPVR ve izovolümetrik gevşeme çizgisi arasındaki alandır ve diyastolde ısıya dönüşür. [[K1 s. 138]]</li>
    <li>PVA = dış iş + iç iş; miyokardın O₂ tüketimiyle iyi korelasyon gösterir. Ön yük ve kontraktilite dış işi, ard yük iç işi artırır; üçü de O₂ gereksinimini yükseltir. [[K1 s. 139]]</li>
    <li>RV halkası üçgendir, basıncı düşüktür, ejeksiyon erken başlar; atım işi LV'nin %20–25'idir ama toplam işin içindeki payı LV'dekinden büyüktür, bu yüzden RV pulmoner hipertansiyonda kolay yetmezliğe girer. [[K1 s. 139–140]]</li>
    <li>Sistolik yetmezlik: ESPVR yatıklaşır, LVEDV ve LVESV ↑, SV ↓. Diyastolik yetmezlik: EDPVR dikleşir, ESPVR değişmez, LVEDP ↑, LVEDV ve SV ↓. [[K1 s. 139–140]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="31"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/30">← Bölüm 30 · Starling yasası ve kardiyak işlev bozukluğu</a>
    <a href="#/dersler/fizyoloji/32">Sonraki: Bölüm 32 · Kardiyak iskemi →</a>
  </nav>
</section>`,
};
