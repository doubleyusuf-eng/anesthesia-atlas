/* Farmakoloji · Bölüm 22 · Diüretikler (K3 s. 328–333, Türkçe çalışma çevirisinin sayfaları). Pilot ders: biçim örneği. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['far22-1'] = {
  no: 1, kok: 'Tiyazid diüretikler', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 328–330]]',
  onermeler: [
    { t: 'Başlıca etki yerleri Henle kulpunun kalın çıkan koludur.', d: false, n: 'Yanlış. Tiyazidler başlıca distal tübülün erken segmentinde Na⁺ ve Cl⁻ geri emilimini inhibe eder; kalın çıkan kol loop diüretiklerin yeridir. [[K3 s. 328]] [[K3 s. 330]]' },
    { t: 'Renal Ca²⁺ atılımını azaltarak hiperkalsemiye yol açabilirler.', d: true, n: 'Doğru. Loop diüretikler ise tersine Ca²⁺ atılımını artırır. [[K3 s. 329–330]]' },
    { t: 'Antihipertansif etkileri doz arttıkça orantılı olarak artmaya devam eder.', d: false, n: 'Yanlış. Antihipertansif etki düşük dozda maksimuma ulaşır. [[K3 s. 329]]' },
    { t: 'Oluşturdukları hipokalemi nondepolarizan kas gevşeticilerin etkisini uzatabilir.', d: true, n: 'Doğru. Bu, tiyazidlerin anestezi açısından önemli etkileşimidir. [[K3 s. 330]]' },
    { t: 'Klorotiyazid bağırsaktan bendroflumetiyazidden daha iyi emilir.', d: false, n: 'Yanlış. Bendroflumetiyazid iyi emilir; klorotiyazidin emilimi eksik ve değişkendir. [[K3 s. 330]]' },
  ],
};
VERI.sorular['far22-2'] = {
  no: 2, kok: 'Loop diüretikler, amilorid ve spironolakton', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 330–332]]',
  onermeler: [
    { t: 'Furosemid renal kan akımını artırır.', d: true, n: 'Doğru. Kan jukstaglomerüler bölgeden dış kortekse yönelir; tiyazidler ise renal kan akımını azaltır. [[K3 s. 329–330]]' },
    { t: 'Akut pulmoner ödemde furosemidin yararı yalnız diürez başladıktan sonra görülür.', d: false, n: 'Yanlış. Preload ve dispne, diüreze bağlanabilecek bir değişiklikten önce azalır. [[K3 s. 330]]' },
    { t: 'Bumetanidin oral biyoyararlanımı furosemidinkinden yüksektir.', d: true, n: 'Doğru. Furosemidde %65, bumetanidde %95’tir. [[K3 s. 331]]' },
    { t: 'Amilorid hipokalemik, hipokloremik metabolik alkaloza yol açar.', d: false, n: 'Yanlış. Bu tablo tiyazid ve loop diüretiklerin özelliğidir; amiloridle bazen hiperkalemi gelişir. [[K3 s. 331]]' },
    { t: 'Spironolaktonun oluşturduğu diürez sınırlıdır.', d: true, n: 'Doğru. Na⁺ geri emiliminin yalnız %2’si aldosteronun kontrolündedir. [[K3 s. 331]]' },
  ],
};
VERI.sorular['far22-3'] = {
  no: 3, kok: 'Mannitol ve asetazolamid', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 332–333]]',
  onermeler: [
    { t: 'Mannitol böbrek tübüllerinde geri emilir.', d: false, n: 'Yanlış. Glomerülden serbestçe filtre edilir, geri emilmez; bu yüzden filtratın osmolalitesini artırır. [[K3 s. 332]]' },
    { t: 'Kan–beyin bariyeri hasarlıysa mannitol serebral ödemi artırabilir.', d: true, n: 'Doğru. Mannitol bariyeri geçer ve suyu beyne doğru sürükler. [[K3 s. 332]]' },
    { t: 'Mannitolün İKB’yi düşürücü etkisi uzun süreli uygulamada da sürer.', d: false, n: 'Yanlış. Akut azalma uzun süreli uygulama sırasında devam etmez. [[K3 s. 332]]' },
    { t: 'Mannitolün eliminasyon yarılanma ömrü 100 dakikadır.', d: true, n: 'Doğru. Filtre edilip geri emilmemesi bu kısa yarılanma ömrünü açıklar. [[K3 s. 333]]' },
    { t: 'Asetazolamid alkali idrar oluşturur.', d: true, n: 'Doğru. H⁺ atılımı inhibe edilir, HCO₃⁻ geri emilmez ve idrar alkali olur. [[K3 s. 333]]' },
  ],
};

const A22_NAV = [
  ['gruplar', 'Gruplar'], ['tiyazid', 'Tiyazidler'], ['loop', 'Loop'], ['tutucu', 'K⁺ tutucular'],
  ['mannitol', 'Mannitol'], ['ka', 'Asetazolamid'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/22'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 4 · Bölüm 22', baslik: 'Diüretikler',
  lede: 'Diüretikler idrar üretimini artırmak için böbreğe etki eden ilaçlardır. [[K3 s. 328]] Gruplar arasındaki farkı büyük ölçüde nefronun neresine etki ettikleri belirler. [[K3 s. 328–333]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A22_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a22-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a22-gruplar">
  <h2>Altı grup ve nefrondaki etki yerleri</h2>
  <p class="intro">Böbrek sıvı, elektrolit ve asit–baz dengesini sürdürür; renin ve eritropoietin salgılayarak endokrin işlev de görür. [[K3 s. 328]] Diüretikler altı gruba ayrılır. [[K3 s. 328]]</p>
  <div class="viz"><div class="viz-head"><h3>Hangi grup nefronun neresine etki eder?</h3></div><div data-viz="a22_yer"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik nefron; etki yerleri kitaptan. [[K3 s. 328–333]]</p></div>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>Grup</th><th>Örnek</th><th>K⁺ ve asit–baz</th></tr></thead>
    <tbody>
      <tr><td><b>Tiyazidler</b></td><td>Bendroflumetiyazid, klorotiyazid, metolazon</td><td>Hipokalemi, hipokloremik alkaloz [[K3 s. 328]]</td></tr>
      <tr><td><b>Loop</b></td><td>Furosemid, bumetanid</td><td>Hipokalemi, hipokloremik alkaloz [[K3 s. 330]]</td></tr>
      <tr><td><b>K⁺ tutucu</b></td><td>Amilorid</td><td>Bazen hiperkalemi; alkaloz yapmaz [[K3 s. 331]]</td></tr>
      <tr><td><b>Aldosteron antagonisti</b></td><td>Spironolakton, potasyum kanrenoat</td><td>Hiperkalemi [[K3 s. 331–332]]</td></tr>
      <tr><td><b>Ozmotik</b></td><td>Mannitol</td><td>Kitapta belirtilmez</td></tr>
      <tr><td><b>Karbonik anhidraz inhibitörü</b></td><td>Asetazolamid</td><td>Hiperkloremik asidoz, alkali idrar [[K3 s. 333]]</td></tr>
    </tbody>
  </table></div>
</section>

<section class="wrap blk ders-sec" id="a22-tiyazid">
  <h2>Tiyazidler</h2>
  <p class="intro">Kimyasal olarak sülfonamidlerle ilişkili, orta derecede potent diüretiklerdir; distal tübülün erken segmentinde Na⁺ ve Cl⁻ geri emilimini inhibe ederler. [[K3 s. 328]]</p>
  <div class="viz"><div class="viz-head"><h3>Distale ulaşan Na⁺ neden K⁺ kaybettirir?</h3></div><div data-viz="a22_tiyazid"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 328]]</p></div>
  <ul class="ozet">
    <li><b>Kullanım.</b> Hafif kalp yetmezliği ve hipertansiyon, tek başına ya da başka ilaçlarla. [[K3 s. 328]] Diabetes insipidusta da kullanılmıştır: diürez glomerüler filtrasyonu azaltır, proksimal tübülde Na⁺ ve su emilimi artar. [[K3 s. 328]] Renal tübüler asidozda da kullanılmıştır. [[K3 s. 328]]</li>
    <li><b>Metolazon.</b> Loop diüretikle birlikte çok güçlü sinerjistik etki gösterir; ağır ödemde yararlıdır. [[K3 s. 328]]</li>
    <li><b>Kardiyovasküler ve renal.</b> Antihipertansif etki plazma hacmini ve sistemik vasküler direnci azaltmalarına bağlı görünür; düşük dozda maksimuma ulaşır. [[K3 s. 329]] Renal kan akımını ve glomerüler filtrasyon hızını azaltabilirler. [[K3 s. 329]]</li>
    <li><b>Biyokimyasal.</b> Hipokalemi (digoksin alanlarda tehlikeli aritmi; oral K⁺ ya da K⁺ tutucu diüretikle kontrol), hiperkalsemi, hiponatremi, hipomagnezemi, hipokloremik alkaloz. [[K3 s. 329]] Ürik asitle aynı tübüler yoldan salgılandıkları için gutu tetikleyebilirler. [[K3 s. 329]] Karbonik anhidrazı azaltarak bikarbonat atılımını artırma etkileri küçüktür. [[K3 s. 328]]</li>
    <li><b>Metabolik.</b> Glikogenez ve insülin sekresyonunun azalması ve glikojenolizin artmasıyla glukoz yükselir, en belirgin diyabetiklerde. [[K3 s. 329]] Kolesterol ve trigliserit artar. [[K3 s. 329]]</li>
    <li><b>Seyrek.</b> Aplastik ve hemolitik anemi, lökopeni, agranülositoz, trombositopeni; impotans, döküntü, fotosensitivite; bendroflumetiyazidle pankreatit. [[K3 s. 329]]</li>
    <li><b>Etkileşim.</b> Hipokalemi nondepolarizan kas gevşeticilerin etkisini uzatabilir; NSAİİ’ler tiyazidleri antagonize eder. [[K3 s. 330]]</li>
  </ul>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>Kinetik</th><th>Bendroflumetiyazid</th><th>Klorotiyazid</th></tr></thead>
    <tbody>
      <tr><td>Emilim</td><td>İyi</td><td>Eksik ve değişken</td></tr>
      <tr><td>Etki başlangıcı (oral)</td><td colspan="2">90 dakika içinde</td></tr>
      <tr><td>Etki süresi</td><td>18–24 saat</td><td>Yarısı kadar</td></tr>
      <tr><td>Eliminasyon</td><td>%70’i karaciğerde aktif metabolitlere; kalanı değişmeden idrarla</td><td>Lipitte az çözünür; metabolize edilmeden böbrekle</td></tr>
    </tbody>
  </table></div>
  <p class="small muted">İlaçlar arasındaki farklar emilim hızında (lipit çözünürlüğü) ile etki başlangıcı ve süresindedir (tübüler işlenme). [[K3 s. 328]] [[K3 s. 330]]</p>
</section>

<section class="wrap blk ders-sec" id="a22-loop">
  <h2>Loop diüretikler</h2>
  <p class="intro">Furosemid ve bumetanid (karboksilik asit türevleri), Na⁺ ve Cl⁻ geri emilimini Henle kulpunun kalın çıkan kolunda, daha az ölçüde erken distal tübülde inhibe eder. [[K3 s. 330]] Karşı akım çoğaltıcı bozulur, medulla hipertonisitesini kaybeder ve toplayıcı sistemde su geri emilimi azalır. [[K3 s. 330]] Bu segmentin NaCl geri emilim kapasitesi büyük olduğundan etki belirgindir. [[K3 s. 330]]</p>
  <div class="viz"><div class="viz-head"><h3>Tiyazid ile loop: nerede ayrılırlar?</h3></div><div data-viz="a22_kars"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Ok yönleri kitaptan; büyüklükler nitel. [[K3 s. 329–331]]</p></div>
  <ul class="ozet">
    <li><b>Kullanım.</b> Ağır kalp yetmezliğinde periferik ve pulmoner ödem; kronik ve akut böbrek yetmezliği. [[K3 s. 330]]</li>
    <li><b>Kardiyovasküler.</b> Arteriyoler vazodilatasyonla sistemik vasküler direnç azalır. [[K3 s. 330]] Akut pulmoner ödemde preload ve dispne diürezden önce azalır. [[K3 s. 330]]</li>
    <li><b>Biyokimyasal.</b> Hiponatremi, hipokalemi, hipomagnezemi ve hipokloremik alkaloz tiyazidlerdeki gibidir. [[K3 s. 330]] Bazen hiperürisemi, zaman zaman gut görülür. [[K3 s. 330]]</li>
    <li><b>Etkileşim.</b> Lityum düzeyi yükselebilir. [[K3 s. 331]]</li>
  </ul>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>Kinetik</th><th>Furosemid</th><th>Bumetanid</th></tr></thead>
    <tbody>
      <tr><td>Oral biyoyararlanım</td><td>%65</td><td>%95</td></tr>
      <tr><td>Proteine bağlanma</td><td colspan="2">> %95</td></tr>
      <tr><td>Atılım</td><td colspan="2">Büyük ölçüde değişmeden idrarla</td></tr>
    </tbody>
  </table></div>
  <p class="small muted">İkisi de bağırsaktan iyi emilir. [[K3 s. 331]]</p>
</section>

<section class="wrap blk ders-sec" id="a22-tutucu">
  <h2>Potasyum tutucular ve aldosteron antagonistleri</h2>
  <p class="intro">İkisi de distal tübülde Na⁺ geri emilimini K⁺ atılımına bağlayan mekanizmayı bozar; diürez zayıftır, K⁺ tutulur. [[K3 s. 331]]</p>
  <div class="viz"><div class="viz-head"><h3>Distal tübül hücresinde Na⁺ girer, K⁺ çıkar</h3></div><div data-viz="a22_aldo"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik tübül hücresi; kalınlıklar nitel. [[K3 s. 331]]</p></div>
  <div class="cols" style="margin-top:16px">
    <div class="card"><span class="tag basic">Amilorid</span><p style="margin-top:8px">Zayıf bir diüretiktir; hipokalemiyi önlemek için sıklıkla loop diüretiklerle birlikte verilir. [[K3 s. 331]] Distal kıvrımlı tübülde Na⁺/K⁺ değişimini bloke eder. [[K3 s. 331]] Bazen hiperkalemi gelişir. [[K3 s. 331]] Bağırsaktan zayıf emilir, proteine çok az bağlanır, metabolize edilmez. [[K3 s. 331]]</p></div>
    <div class="card"><span class="tag clin">Spironolakton</span><p style="margin-top:8px">Kompetitif aldosteron antagonistidir; yalnız oral preparatı vardır. [[K3 s. 331]] Parenteral potasyum kanrenoat, spironolaktonun da metaboliti olan kanrenona dönüşür. [[K3 s. 331]] Etkisi birkaç günde yerleşir. [[K3 s. 331]] Asit, nefrotik sendrom ve Conn sendromunda kullanılır. [[K3 s. 331]]</p></div>
  </div>
  <ul class="ozet" style="margin-top:14px">
    <li><b>Spironolakton yan etkileri.</b> Hiperkalemi en sık böbrek işlev bozukluğunda; ACE inhibitörleri de aldosteronu azaltarak yatkınlık yaratır. [[K3 s. 332]] Hiponatremi olabilir. [[K3 s. 332]] Antiandrojenik etkiyle erkekte jinekomasti, kadında menstrüel düzensizlik. [[K3 s. 332]] Addison hastalığında kontrendikedir. [[K3 s. 332]]</li>
    <li><b>Spironolakton kinetiği.</b> Bağırsaktan eksik emilir, proteine yüksek oranda bağlanır, hızla metabolize edilip idrarla atılır. [[K3 s. 332]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a22-mannitol">
  <h2>Ozmotik diüretik: mannitol</h2>
  <p class="intro">Mannitol, bir karbonhidrat türevi olan polihidrik alkoldür. [[K3 s. 332]] Glomerülden serbestçe filtre edilir, geri emilmez; filtratın osmolalitesini artırarak idrar hacmini artırır. [[K3 s. 332]]</p>
  <div class="viz"><div class="viz-head"><h3>Kan–beyin bariyeri sağlamken ve hasarlıyken</h3></div><div data-viz="a22_mannitol"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 332]]</p></div>
  <ul class="ozet">
    <li><b>Kullanım.</b> Serebral ödemde ya da nöroşirürjide İKB’yi azaltmak; sarılıklı hastalarda ve büyük vasküler cerrahide perioperatif böbrek işlevini korumak. [[K3 s. 332]]</li>
    <li><b>Preparat ve doz.</b> Suda %10 ya da %20 çözelti. [[K3 s. 332]] Yüksek İKB’de başlangıç 1 g/kg, sonra 0,1–0,2 g/kg. [[K3 s. 332]] Serum osmolalitesi 320 mOsm/kg’ı aşarsa böbrek yetmezliği riski nedeniyle ek doz verilmez. [[K3 s. 332]]</li>
    <li><b>Kardiyovasküler.</b> Dolaşan hacim, preload ve kalp debisi önce artar; duyarlı hastada kalp yetmezliği tetiklenebilir. [[K3 s. 332]]</li>
    <li><b>Renal.</b> Ozmotik diürez intravasküler hacmi azaltabilir; renal kan akımı artar. [[K3 s. 332]]</li>
    <li><b>MSS.</b> İKB akut olarak düşer; uzun süreli uygulamada bu etki sürmez. [[K3 s. 332]] BOS oluşum hızı azalabilir. [[K3 s. 332]] Alerjik yanıt nadirdir. [[K3 s. 332]]</li>
    <li><b>Kinetik.</b> Bağırsaktan çok az emilir; İV verilince bütün ekstraselüler sıvıya dağılır. [[K3 s. 333]] Geri emilmediği için eliminasyon yarılanma ömrü 100 dakikadır; anlamlı metabolize edilmez. [[K3 s. 333]]</li>
  </ul>
  <div class="note plain"><b>Atlas notu.</b> 320 mOsm/kg eşiği tek başına kesin bir durdurma kuralı değildir; mannitol verilirken böbrek işlevi ve hacim durumu da izlenir.</div>
</section>

<section class="wrap blk ders-sec" id="a22-ka">
  <h2>Karbonik anhidraz inhibitörü: asetazolamid</h2>
  <p class="intro">Asetazolamid zayıf bir diüretiktir; daha çok dağ hastalığına karşı profilakside kullanılır. [[K3 s. 333]] Proksimal tübülde karbonik anhidrazı nonkompetitif olarak inhibe eder. [[K3 s. 333]]</p>
  <div class="viz"><div class="viz-head"><h3>Enzim durunca H⁺ ve HCO₃⁻ ne olur?</h3></div><div data-viz="a22_ka"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 333]]</p></div>
  <ul class="ozet">
    <li><b>Biyokimyasal.</b> Na⁺ ve su atılımı hafifçe artar ve K⁺ sekresyonunun itici gücü büyür. [[K3 s. 333]] Hiperkloremik asidoz varken bile idrar alkalidir. [[K3 s. 333]]</li>
    <li><b>Göz.</b> Aköz hümör üretimini inhibe eder; kitap glokomda göz damlası olarak kullanıldığını yazar. [[K3 s. 333]]</li>
    <li><b>Kinetik.</b> Oral biyoyararlanım %95’in üzerinde; proteine yüksek oranda bağlanır, değişmeden idrarla atılır. [[K3 s. 333]]</li>
  </ul>
  <div class="note plain"><b>Atlas notu.</b> Asetazolamid glokomda sistemik (oral) olarak verilir; göz damlası olarak kullanılan karbonik anhidraz inhibitörü dorzolamiddir.</div>
</section>

<section class="wrap blk ders-sec" id="a22-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin, ardından gerekçenizi açıklamayla karşılaştırın.</p>
  <div class="viz"><div data-viz="mtf" data-q="far22-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far22-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far22-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a22-p2">
  <h2>Part II · SOE 2</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Kalp yetmezliği nedeniyle furosemid ve bendroflumetiyazid kullanan bir hasta ameliyata geliyor. Bu ilaçların etki yerlerini ve anestezi açısından önemli yan etkilerini anlatın.</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Tiyazid erken distal tübülde, loop kalın çıkan kolda Na⁺/Cl⁻ geri emilimini inhibe eder. [[K3 s. 328]] [[K3 s. 330]]</li>
    <li>Distale ulaşan Na⁺ K⁺ ve H⁺ ile değişir: hipokalemi ve hipokloremik alkaloz. [[K3 s. 328]] [[K3 s. 330]]</li>
    <li>Hipokalemi nondepolarizan kas gevşeticilerin etkisini uzatabilir; digoksinle tehlikeli aritmiler tetiklenebilir. [[K3 s. 329–330]]</li>
    <li>Hiponatremi, hipomagnezemi; Ca²⁺ tiyazidde yükselir, loopta düşer. [[K3 s. 329–330]]</li>
    <li>Glukoz ve lipitler yükselebilir; hızlı yüksek doz furosemid sağırlık yapabilir. [[K3 s. 329–330]]</li>
    <li>Metolazon loop diüretikle güçlü sinerji gösterir; NSAİİ tiyazidleri antagonize eder, lityum düzeyi loopla yükselir. [[K3 s. 328]] [[K3 s. 330–331]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Bir nefron çizin ve diüretik gruplarının etki yerlerini işaretleyin: proksimal tübül (asetazolamid), kalın çıkan kol (loop), erken distal tübül (tiyazid), distal tübül (amilorid, spironolakton); mannitol glomerülden süzülür, tübülde geri emilmez. [[K3 s. 328–333]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Spironolaktonun diürezi neden sınırlıdır? Mannitol kafa travmasında neden zararlı olabilir? Asetazolamid dağ hastalığında nasıl işe yarar? [[K3 s. 331–333]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a22-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Tiyazidler erken distal tübülde, loop diüretikler kalın çıkan kolda Na⁺/Cl⁻ geri emilimini inhibe eder; ikisi de hipokalemik, hipokloremik alkaloz yapar. [[K3 s. 328]] [[K3 s. 330]]</li>
    <li>Ca²⁺ ve renal kan akımı iki grupta ters yöne gider. [[K3 s. 329–330]]</li>
    <li>Amilorid ve spironolakton zayıf diüretiktir, K⁺ tutar; spironolakton antiandrojeniktir. [[K3 s. 331–332]]</li>
    <li>Mannitol filtre edilip geri emilmez; sağlam kan–beyin bariyerinde beyinden su çeker. [[K3 s. 332]]</li>
    <li>Asetazolamid H⁺ atılımını azaltır: alkali idrar, metabolik asidoz. [[K3 s. 333]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="22"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/21b">← 21b · Kolloidler, bikarbonat, mineraller ve beslenme</a><a href="#/dersler/farmakoloji/23a">Sonraki: 23a · Bakteriler ve antibiyotik tedavisinin ilkeleri →</a></nav>
</section>`,
};
