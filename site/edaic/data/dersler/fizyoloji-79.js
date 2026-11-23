/* Fizyoloji Bölüm 79 · Stres yanıtı (K1 İngilizce baskı s. 387–390).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz79-1'] = {
  no: 1, kok: 'Stres yanıtının başlaması ve endokrin etkileri için:', kagit: 'Paper A · fizyoloji, Bölüm 79', kaynak: '[[K1 s. 387]]',
  onermeler: [
    { t: 'Nöroendokrin yanıtın büyüklüğü stresörün büyüklüğüyle doğrudan ilişkilidir.', d: true, n: 'Doğru. En sık stresörler travma, yanık, cerrahi ve kritik hastalıktır; büyük stresör büyük yanıt doğurur. [[K1 s. 387]]' },
    { t: 'Hipotalamusu uyaran tek yol yaralanma bölgesinden gelen afferent sinir uyarılarıdır.', d: false, n: 'Yanlış. İkinci yol yerel inflamasyondur: IL-6, interferonlar ve TNF gibi sitokinler sistemik dolaşıma taşıp hipotalamusu uyarır. [[K1 s. 387]]' },
    { t: 'Stres yanıtında Langerhans adacıklarının β-hücrelerinden insülin salgısı artar.', d: false, n: 'Yanlış. İnsülin salgısı azalır; α-hücrelerinden glukagon salgısı ise artar. [[K1 s. 387]]' },
    { t: 'Böbrekten salınan renin, anjiyotensin II aracılığıyla adrenal korteksten aldosteron salgısını artırır.', d: true, n: 'Doğru. Renin salınımı artan sempatik çıkışın sonucudur. [[K1 s. 387]]' },
    { t: 'Kitaba göre stres yanıtı ACTH, GH ve ADH dışındaki hipofiz hormonlarının salgısını da belirgin artırır.', d: false, n: 'Yanlış. Kitaba göre öteki hipofiz hormonlarının salgısı değişmez (prolaktin için sayfadaki Atlas notuna bakın). [[K1 s. 387]]' },
  ],
};
VERI.sorular['fiz79-2'] = {
  no: 2, kok: 'Stres yanıtının metabolik etkileri için:', kagit: 'Paper A · fizyoloji, Bölüm 79', kaynak: '[[K1 s. 387–388]]',
  onermeler: [
    { t: 'İskelet kası yıkımı yaralanmanın ilk saatinde başlar; protein anabolizması etkilenmez.', d: false, n: 'Yanlış. Önce protein anabolizması baskılanır; iskelet kası yıkımı 12–14 saatten sonra başlar. [[K1 s. 388]]' },
    { t: 'Hiperglisemi travmanın ağırlığıyla orantılı olarak gelişir.', d: true, n: 'Doğru. Nedenleri düşük insülin, yüksek glukagon ve katekolamin, kortizol ve daha az ölçüde GH\'nin anti-insülin etkileridir. [[K1 s. 387]]' },
    { t: 'GH\'nin vücut proteini üzerindeki katabolik etkisi anabolik etkisinden büyüktür; bu yüzden kas yıkımını artırır.', d: false, n: 'Yanlış. GH\'nin anabolik etkisi daha büyüktür ve kas yıkımını sınırlayabilir; yıkımı artıran kortizoldür. [[K1 s. 388]]' },
    { t: 'Negatif azot dengesinde vücuttan atılan azot alınan azottan fazladır.', d: true, n: 'Doğru. Protein yıkımının boyutu travmanın ağırlığıyla orantılıdır. [[K1 s. 388]]' },
    { t: 'Lipoliz ve ketogenez yüksek glukagon ve düşük insülinle desteklenir.', d: true, n: 'Doğru. Artmış katekolamin, kortizol ve GH de lipoliz ve ketogenezi destekler. [[K1 s. 388]]' },
  ],
};
VERI.sorular['fiz79-3'] = {
  no: 3, kok: 'Stres yanıtının sonuçları ve anestezistin onu azaltması için:', kagit: 'Paper A · fizyoloji, Bölüm 79', kaynak: '[[K1 s. 388–389]]',
  onermeler: [
    { t: 'Ameliyattan önce yapılan nöraksiyel blok hem afferent sinir girdisini hem sitokin salınımını önler.', d: false, n: 'Yanlış. Nöraksiyel blok afferent sinirsel başlatmayı önler, sitokin salınımını etkilemez. [[K1 s. 389]]' },
    { t: 'Laparoskopik cerrahi eşdeğer açık girişime göre daha çok sitokin salınımına yol açar.', d: false, n: 'Yanlış. Laparoskopik ve öteki minimal invaziv teknikler daha az sitokin salınımıyla ilişkilidir. [[K1 s. 389]]' },
    { t: 'Büyük cerrahiden sonra iskelet kası kaybı günde 0,5 kg\'a dek çıkabilir.', d: true, n: 'Doğru. Solunum kası kaybı ameliyat sonrası solunum yetmezliğine yatkınlık yaratır. [[K1 s. 388]]' },
    { t: 'Torakal epidural stres yanıtını lomber epiduralden daha etkili baskılar.', d: false, n: 'Yanlış. Lomber epidural daha etkilidir; torakal epidural lomber otonom sinirleri güvenilir biçimde bloke etmez. [[K1 s. 389]]' },
    { t: 'Etomidatın tek indüksiyon dozu 11-β-hidroksilazı inhibe ederek kortizol ve aldosteron sentezini 8 saate dek azaltır.', d: true, n: 'Doğru. Öteki genel anesteziklerin stres yanıtına etkisi çok azdır. [[K1 s. 389]]' },
  ],
};

const D79_NAV = [
  ['d79-tetik', 'Tanım ve başlama'], ['d79-endokrin', 'Endokrin kollar'], ['d79-metab', 'Metabolik etkiler'],
  ['d79-zarar', 'Zararlı sonuçlar'], ['d79-azalt', 'Yanıtı azaltmak'],
  ['d79-p1', 'Part I'], ['d79-p2', 'Part II'], ['d79-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/79'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 8 · Bölüm 79', baslik: 'Stres yanıtı',
  lede: 'Travma, yanık, cerrahi ya da kritik hastalık hipotalamusu harekete geçirir; ardından gelen hormon dalgası metabolizmayı, bağışıklığı ve pıhtılaşmayı değiştirir. Bir zamanlar hayatta kalmayı sağlayan bu yanıt bugün cerrahi sonuçları kötüleştirir. [[K1 s. 387]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D79_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d79-tetik">
  <h2>Stres yanıtı nedir, nasıl başlar?</h2>
  <p class="intro">Stres yanıtı fizyolojik strese karşı gelişen karmaşık bir nöroendokrin yanıttır; büyüklüğü stresörün büyüklüğüyle doğrudan ilişkilidir. [[K1 s. 387]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Yaralanmadan hipotalamusa iki yol</h3></div>
    <div data-viz="f79_tetik"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Stresör.</b> En sık stresörler travma, yanık, cerrahi ve kritik hastalıktır. İleri düğmesine basın. [[K1 s. 387]]</p>
    <p class="viz-foot">Şematik akış; yollar kitaptan, uzaklıklar ve süreler temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Sıkça "savaş ya da kaç" (fight or flight) yanıtı diye anılır. Eskiden yararlı bir hayatta kalma stratejisiydi; modern cerrahide ise yol açtığı değişikliklerin çoğu sonuçları kötüleştirir ve hastanede kalışı uzatır. Metabolik etkilerinin yanında bağışıklık ve hematolojik sistemleri de etkinleştirir. [[K1 s. 387]]</p>
    <p>Hipotalamusu iki yol uyarır. Birincisi yaralanma bölgesinden gelen <b>otonom ve duysal afferent</b> sinir uyarılarıdır. İkincisi <b>yerel inflamasyondur</b>: sitokin salınır, kompleman etkinleşir, lökositler çekilir, trombositler etkinleşir, pıhtılaşma kaskadı başlar; IL-6, interferonlar ve TNF gibi sitokinler sistemik dolaşıma taşıp hipotalamusu uyarır. [[K1 s. 387]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d79-endokrin">
  <h2>Hipotalamusun iki kolu: sempatik sistem ve hipofiz</h2>
  <p class="intro">Etkinleşen hipotalamus yanıtı iki kolla yürütür: sempatik çıkışı artırır ve hipofize hormon salgılatır. [[K1 s. 387]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hipotalamustan hedef organlara</h3></div>
    <div data-viz="f79_eksen"></div>
    <p class="viz-cap" aria-live="polite"><b>Sempatik kol.</b> Adrenal medulla, sempatik sinir uçları, böbrek ve pankreas yanıt verir. Hipofiz koluna geçin. [[K1 s. 387]]</p>
    <p class="viz-foot">Şematik harita; ok kalınlıkları nitel.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Sempatik kol:</b> adrenal medulla sistemik adrenalin salar; postganglionik sempatik sinir uçlarından salınan noradrenalinin bir kısmı dolaşıma taşar. Böbrek renin salar; anjiyotensin II oluşur ve adrenal korteksten aldosteron salgısı artar. Langerhans adacıklarının α-hücreleri glukagon salar, β-hücrelerinin insülin salgısı azalır (Bölüm 77). [[K1 s. 387]]</p>
    <p><b>Hipofiz kolu:</b> ACTH adrenal korteksten kortizol salgılatır; kortizol yaptığı çok sayıda etki nedeniyle "stres hormonu" diye bilinir. GH ve ADH de artar; ADH toplayıcı kanalda su geri emilimini artırır. Öteki hipofiz hormonlarının salgısı değişmez. Aldosteron ve kortizolün mineralokortikoid etkisi fazla Na⁺ ve su geri emilimi yapar. [[K1 s. 387]]</p>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> Kitap öteki hipofiz hormonlarının değişmediğini yazar; oysa cerrahi stresle prolaktin de artar. TSH, LH ve FSH'de belirgin değişiklik olmaz.</div>
</section>

<section class="wrap blk ders-sec" id="d79-metab">
  <h2>Metabolik etkiler: karbonhidrat, protein, yağ</h2>
  <p class="intro">Hormon değişiklikleri bütün ana substratları etkiler; hiperglisemi ve protein yıkımı travmanın ağırlığıyla orantılıdır. [[K1 s. 387–388]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Travmanın ağırlığı ve zamanla üç substrat</h3></div>
    <div data-viz="f79_metab"></div>
    <p class="viz-cap" aria-live="polite"><b>Orta travma, 6. saat.</b> Glukoz yükselmiş; protein anabolizması baskılı, kas yıkımı henüz başlamamış. Zamanı ve ağırlığı değiştirin. [[K1 s. 387–388]]</p>
    <p class="viz-foot">Model nitel: kitap değer vermez, yalnız ağırlıkla orantıyı söyler; 12–14 saat eşiği kitaptandır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Karbonhidrat:</b> hiperglisemiyi düşük insülin, yüksek glukagon ve katekolaminlerin, kortizolün ve daha az ölçüde GH'nin anti-insülin etkileri yapar. [[K1 s. 387]]</p>
    <p><b>Protein:</b> önce protein anabolizması baskılanır; 12–14 saatten sonra iskelet kası yıkılır, çünkü amino asitler glukoneogenez substratı ve akut faz proteinlerinin yapımı için gerekir. Sonuç <b>negatif azot dengesidir</b>: atılan azot alınandan fazladır. Kortizol protein yıkımını ve glukoneogenezi artırır; GH'nin vücut proteinine anabolik etkisi katabolik etkisinden büyüktür, kas yıkımını sınırlayabilir. [[K1 s. 388]]</p>
    <p><b>Yağ:</b> lipoliz ve ketogenezi yüksek glukagon, düşük insülin ve artmış katekolamin, kortizol ve GH destekler. [[K1 s. 388]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d79-zarar">
  <h2>Klinik önem: stres yanıtının zararları</h2>
  <p class="intro">Modern cerrahide stres yanıtının etkilerinin çoğu zararlıdır ve birçok sistemi etkiler. [[K1 s. 388]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Yedi sistem, yedi zarar</h3></div>
    <div data-viz="f79_zarar"></div>
    <p class="viz-cap" aria-live="polite"><b>Kardiyovasküler.</b> Katekolaminler ve anjiyotensin II periferik vazokonstriksiyon, hipertansiyon ve taşikardi yapar; miyokardın işi artar, duyarlı hastada iskemi tetiklenebilir. Başka bir sistem seçin. [[K1 s. 388]]</p>
    <p class="viz-foot">Şematik gövde; her sistemin zincirindeki adımlar kitaptan.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Hiperglisemi</b> yara iyileşmesini bozar, yara enfeksiyonunu artırır; kritik hastada mortalite, hastane enfeksiyonu, renal replasman tedavisi gereksinimi ve kritik hastalık polinöropatisiyle ilişkilidir. İnsüline hangi glukozda başlanacağı tartışmalıdır: sıkı kontrol (ör. 4,4–6,1 mmol/L) bu komplikasyonları azaltabilir ama iyatrojenik hipoglisemi riski taşır. [[K1 s. 388]]</p>
    <p><b>Protein katabolizması:</b> büyük cerrahiden sonra kas kaybı günde 0,5 kg'a dek çıkabilir. Hasta güçsüzleşir, hareketsizlik venöz tromboembolizm riskini artırır; solunum kası kaybı solunum yetmezliğine, ağır malnütrisyonda kalp kası kaybı aritmiye zemin hazırlar. Bu yıkımı önleyen bir yöntem bulunamadı; ameliyat öncesi karbonhidrat yüklemesi ve perioperatif düşük doz glukoz infüzyonu azaltır görünüyor. [[K1 s. 388]]</p>
    <p><b>Elektrolit ve sıvı:</b> mineralokortikoid etki Na⁺ ve su tutar, K⁺ atılımını artırır. Hipokalemi yatan hastada, özellikle büyük cerrahi ve kritik hastalıktan sonra çok sıktır; kas güçsüzlüğü, aritmi ve ileus yapabilir. Fazla ADH ve mineralokortikoid etki intravenöz sıvıyla birleşince sıvı yüklenmesi olabilir: duyarlı hastada sol ventrikül yetmezliği, yara açılması ve anastomoz kaçağı. [[K1 s. 388]]</p>
    <p><b>Tromboembolizm:</b> prokoagülan durum DVT ve pulmoner emboli riskini artırır. <b>Bağışıklık:</b> kortizol CD8⁺ sitotoksik T hücrelerinin bölünmesini uyarır, bunlar da CD4⁺ yardımcı T hücrelerinin bölünmesini baskılar; vücut patojenlere açık kalır. Kortizol ayrıca kapiller geçirgenliği, prostaglandin sentezini (fosfolipaz inhibisyonuyla), sitokin salınımını ve lökosit göçünü azaltarak inflamasyonu baskılar. [[K1 s. 388]]</p>
  </div>
  <div class="note plain" style="margin-top:14px"><b>Atlas notu.</b> Sıkı glukoz kontrolü artık önerilmez: NICE-SUGAR (2009) çalışmasında 4,5–6,0 mmol/L hedefi kritik hastada mortaliteyi artırdı. Güncel kılavuzlar yaklaşık 7,8–10 mmol/L hedefler.</div>
</section>

<section class="wrap blk ders-sec" id="d79-azalt">
  <h2>Klinik önem: anestezist stres yanıtını nasıl azaltır?</h2>
  <p class="intro">Yanıt afferent sinir girdisi ve sitokinlerle başladığından, bu kollardan birini ya da hipotalamus–hipofiz–adrenal eksenini kesen yöntem yanıtı küçültür. [[K1 s. 388–389]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hangi yöntem hangi kolu keser?</h3></div>
    <div data-viz="f79_azalt"></div>
    <p class="viz-cap" aria-live="polite"><b>Nöraksiyel blok.</b> Ameliyattan önce yapılırsa afferent sinir kolunu keser; sitokin kolu açık kalır. Başka bir yöntem seçin. [[K1 s. 389]]</p>
    <p class="viz-foot">Şematik; yanıt göstergesi nitel, kitap yöntemleri sayıyla karşılaştırmaz.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Epidural ve spinal anestezi</b> en çok çalışılmış ve en başarılı yöntemdir. Lomber epidural torakal epiduralden etkilidir, çünkü torakal epidural lomber otonom sinirleri güvenilir biçimde bloke etmez. Nöraksiyel blok ayrıca ameliyat sonrası ağrıyı ve ileusu, tromboembolizm riskini (özellikle alt ekstremite cerrahisinde) azaltır. [[K1 s. 389]]</p>
    <p><b>Sistemik opioidler</b> hipotalamus–hipofiz–adrenal eksenini baskılar; yüksek doz fentanil abdominal ve pelvik cerrahiye yanıtı ortadan kaldırır, ama ameliyat sonrası ventilasyon gereksinimini artırır. <b>Etomidat</b> adrenal kortekste 11-β-hidroksilazı inhibe eder: indüksiyon dozu aldosteron ve kortizol sentezini 8 saate dek azaltır (Bölüm 81). Öteki genel anesteziklerin etkisi çok azdır. [[K1 s. 389]]</p>
    <p>Ameliyat içi ısıtmayla <b>normotermiyi korumak</b> yanıtın büyüklüğünü azaltır. Cerrahın da payı vardır: <b>laparoskopik</b> ve öteki minimal invaziv teknikler eşdeğer açık girişimlerden daha az sitokin salınımı yapar. [[K1 s. 389]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d79-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: yanıtı başlatan iki yol, sempatik ve hipofiz kollarının hormonları, hiperglisemi nedenleri, proteinin iki evresi (12–14 saat) ve negatif azot dengesi, GH ile kortizolün protein etkisi, zararlı sonuçlar (0,5 kg/gün, hipokalemi, kortizolün bağışıklık etkileri), nöraksiyel blok, opioid, etomidat, ısıtma ve laparoskopi. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz79-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz79-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz79-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d79-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Açık kolektomi olacak bir hastada cerrahiye stres yanıtını anlatın. Yanıt nasıl başlar, ne zarar verir ve siz anestezist olarak onu nasıl azaltırsınız?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanım.</b> Fizyolojik strese karmaşık nöroendokrin yanıt; büyüklüğü stresörle orantılı; bağışıklık ve hematolojik sistemleri de etkinleştirir. [[K1 s. 387]]</li>
    <li><b>Başlama.</b> Otonom ve duysal afferentler + yerel inflamasyon (IL-6, interferonlar, TNF dolaşıma taşar) → hipotalamus. [[K1 s. 387]]</li>
    <li><b>Endokrin.</b> Sempatik: adrenalin, noradrenalin taşması, renin–anjiyotensin II–aldosteron, glukagon ↑, insülin ↓. Hipofiz: ACTH–kortizol, GH, ADH; öteki hipofiz hormonları değişmez. [[K1 s. 387]]</li>
    <li><b>Metabolizma.</b> Ağırlıkla orantılı hiperglisemi; protein anabolizması baskılanır, 12–14 saatten sonra kas yıkımı ve negatif azot dengesi; lipoliz ve ketogenez. [[K1 s. 387–388]]</li>
    <li><b>Zararlar.</b> Miyokard iskemisi, hiperglisemi (yara, enfeksiyon, mortalite), günde 0,5 kg'a dek kas kaybı, hipokalemi, sıvı yüklenmesi, tromboembolizm, bağışıklık baskısı. [[K1 s. 388]]</li>
    <li><b>Azaltma.</b> Ameliyat öncesi nöraksiyel blok (lomber > torakal; sitokinleri etkilemez), yüksek doz opioid (ventilasyon gereksinimi), etomidat (11-β-hidroksilaz, 8 saate dek), normotermi, laparoskopi. [[K1 s. 389]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Solda yaralanma bölgesi; ondan hipotalamusa iki ok: "afferent sinir" ve "sitokinler". Hipotalamustan iki kol: sempatik (adrenal medulla, böbrek–renin–aldosteron, pankreas glukagon ↑ insülin ↓) ve hipofiz (ACTH–kortizol, GH, ADH). Altına karbonhidrat, protein ve yağ kutuları; afferent oka "nöraksiyel blok", kortizol okuna "etomidat" kesiği koyun. [[K1 s. 387–389]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Neden hiperglisemi olur? Protein yıkımı neden 12–14 saatte başlar ve GH'nin rolü ne? Stres yanıtı hipokalemiyi nasıl açıklar? Torakal epidural neden daha az etkili? Etomidat stres yanıtını nasıl etkiler? Kortizol bağışıklığı nasıl baskılar? [[K1 s. 387–389]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d79-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Stres yanıtı stresörle orantılı bir nöroendokrin yanıttır; eskiden hayatta kalmayı sağlarken bugün cerrahi sonuçları kötüleştirir. [[K1 s. 387]]</li>
    <li>Hipotalamusu yaralanma bölgesinden afferent sinir uyarıları ve dolaşıma taşan sitokinler (IL-6, interferonlar, TNF) etkinleştirir. [[K1 s. 387]]</li>
    <li>Sempatik kol adrenalin, noradrenalin, renin–aldosteron ve glukagonu artırır, insülini azaltır; hipofiz ACTH (kortizol), GH ve ADH salar. [[K1 s. 387]]</li>
    <li>Hiperglisemi ve kas yıkımı travmanın ağırlığıyla orantılıdır; kas yıkımı 12–14 saatten sonra başlar ve negatif azot dengesi doğurur. [[K1 s. 387–388]]</li>
    <li>Zararlar: miyokard iskemisi, hiperglisemi, günde 0,5 kg'a dek kas kaybı, hipokalemi, sıvı yüklenmesi, tromboembolizm ve bağışıklık baskısı. [[K1 s. 388]]</li>
    <li>En etkili yöntem ameliyat öncesi nöraksiyel bloktur (lomber > torakal); sitokinleri etkilemez. Yüksek doz opioid, etomidat, normotermi ve laparoskopi de yanıtı azaltır. [[K1 s. 389]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="79"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/78">← Bölüm 78 · Açlık</a>
    <a href="#/dersler/fizyoloji/80">Sonraki: Bölüm 80 · Hipotalamus ve hipofiz →</a>
  </nav>
</section>`,
};
