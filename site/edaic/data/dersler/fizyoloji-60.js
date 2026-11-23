/* Fizyoloji Bölüm 60 · Ağrı fizyolojisi (K1 İngilizce baskı s. 272–275).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz60-1'] = {
  no: 1, kok: 'Ağrının tanımı, sınıflaması ve nosiseptörler için:', kagit: 'Paper A · fizyoloji, Bölüm 60', kaynak: '[[K1 s. 272]]',
  onermeler: [
    { t: 'Nosisepsiyon, beynin zararlı sinyalleri yorumlayıp hoş olmayan bir deneyim olarak algılamasıdır.', d: false, n: 'Yanlış. Bu tanım ağrınındır; nosisepsiyon zararlı sinyallerin aksiyon potansiyeline kodlanıp periferden MSS\'ye iletilmesidir. [[K1 s. 272]]' },
    { t: 'Kronik ağrı bugün, doku hasarından sonra beklenen iyileşme süresini aşan ağrı olarak tanımlanır.', d: true, n: 'Doğru. Eski 12 haftalık keyfî sınırın yerini bu tanım almıştır. [[K1 s. 272]]' },
    { t: 'Nosiseptör, miyelinli kapsüllü bir mekanoreseptördür.', d: false, n: 'Yanlış. Nosiseptör serbest, miyelinsiz bir sinir ucudur. [[K1 s. 272]]' },
    { t: 'Doku hasarı bölgesinde serotonin, vasküler hasara yanıt olarak trombositlerden salınır.', d: true, n: 'Doğru. Histamin ise mast hücrelerinden salınır. [[K1 s. 272]]' },
    { t: 'Visseral ağrı keskin ve iyi lokalize bir ağrıdır.', d: false, n: 'Yanlış. Visseral ağrı künt, yaygın ve kötü lokalizedir; keskin, iyi lokalize olan yüzeyel (kutanöz) ağrıdır. [[K1 s. 272]]' },
  ],
};
VERI.sorular['fiz60-2'] = {
  no: 2, kok: 'Ağrı lifleri ve ağrı yolları için:', kagit: 'Paper A · fizyoloji, Bölüm 60', kaynak: '[[K1 s. 272–273]]',
  onermeler: [
    { t: 'C lifleri miyelinsizdir ve iletim hızları 0,5–4,0 m/s\'dir.', d: true, n: 'Doğru. Küçük çaplı, miyelinsiz aksonlar yavaş iletir; künt, kötü lokalize ikinci ağrıyı taşır. [[K1 s. 272–273]]' },
    { t: 'Aδ lifleri termal, mekanik ve kimyasal uyaranlara yanıt verir; C lifleri yalnız mekanik ve termal uyaranlara yanıt verir.', d: false, n: 'Yanlış. Tersidir: Aδ lifleri mekanik ve termal, C lifleri termal, mekanik ve kimyasal uyaranları taşır. [[K1 s. 272]]' },
    { t: 'Birinci nöron, arka boynuzda substantia gelatinosa (lamina II) ya da nucleus proprius\'ta (lamina III–V) sinaps yapar.', d: true, n: 'Doğru. Bu sinapsın nörotransmitteri P maddesidir. [[K1 s. 273]]' },
    { t: 'Spinotalamik yolun ikinci nöronu çapraz yapmadan aynı taraftan beyin sapına çıkar.', d: false, n: 'Yanlış. İkinci nöron ön komissürde çapraz yapar ve karşı tarafın spinotalamik yolunda talamusa çıkar. [[K1 s. 273]]' },
    { t: 'Yüzden gelen ağrı ve ısı duyusu trigeminal çekirdeğin spinal kısmına ulaşır.', d: true, n: 'Doğru. Ana çekirdek yüz ve ağızdan dokunma ve propriosepsiyonu, mezensefalik çekirdek çene propriosepsiyonunu alır. [[K1 s. 273]]' },
  ],
};
VERI.sorular['fiz60-3'] = {
  no: 3, kok: 'Ağrı modülasyonu ve patolojik ağrı için:', kagit: 'Paper A · fizyoloji, Bölüm 60', kaynak: '[[K1 s. 273–275]]',
  onermeler: [
    { t: 'Opioid reseptörleri iyon kanalı reseptörleridir.', d: false, n: 'Yanlış. μ, κ ve δ opioid reseptörleri G proteinine bağlı reseptörlerdir. [[K1 s. 273]]' },
    { t: 'Opioid reseptörü uyarımı presinaptik uçta Ca²⁺ girişini azaltarak P maddesi salınımını düşürür.', d: true, n: 'Doğru. Diğer yol postsinaptik K⁺ kanallarını açıp ikinci nöronu hiperpolarize etmektir. [[K1 s. 274]]' },
    { t: 'İnen inhibisyon yolu periakuaduktal gri maddeden çıkar ve medulladaki rafe çekirdekleri üzerinden arka boynuza iner.', d: true, n: 'Doğru. Başlıca nörotransmitterlerinin serotonin ve noradrenalin olduğu düşünülür. [[K1 s. 274]]' },
    { t: 'Allodini, normalde ağrı oluşturan bir uyarana verilen ağrı yanıtının artmasıdır.', d: false, n: 'Yanlış. Bu hiperaljezidir; allodini normalde ağrı oluşturmayan bir uyaranın (hafif dokunma, serin esinti) ağrılı algılanmasıdır. [[K1 s. 275]]' },
    { t: 'Kompleks bölgesel ağrı sendromunda etkilenen uzvun alttaki kemiğinde yoğunluk artar.', d: false, n: 'Yanlış. Alttaki kemikte osteoporoz gelişir. [[K1 s. 275]]' },
  ],
};

const D60_NAV = [
  ['d60-tanim', 'Tanım ve sınıflama'], ['d60-nosiseptor', 'Nosiseptör ve lifler'], ['d60-yollar', 'Ağrı yolları'],
  ['d60-kapi', 'Segmental inhibisyon'], ['d60-opioid', 'Endojen opioidler'], ['d60-inen', 'İnen inhibisyon'],
  ['d60-hiper', 'Hiperaljezi ve allodini'], ['d60-noropatik', 'Nöropatik ağrı'], ['d60-krps', 'Sempatik sistem ve KBAS'],
  ['d60-p1', 'Part I'], ['d60-p2', 'Part II'], ['d60-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/60'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 4 · Bölüm 60', baslik: 'Ağrı fizyolojisi',
  lede: 'Nosiseptör zararlı uyaranı aksiyon potansiyeline çevirir, iki lif tipi ve spinotalamik yol bunu kortekse taşır; ağrıyı algılayan ise beyindir ve sinyal yolda omurilik ile beyin sapında ayarlanır. [[K1 s. 272–274]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D60_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d60-tanim">
  <h2>Ağrı, nosisepsiyon ve sınıflama</h2>
  <p class="intro">Ağrı bir algıdır, nosisepsiyon ise o algıya hammadde taşıyan sinyal iletimidir. [[K1 s. 272]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Ağrının sınıfları</h3></div>
    <div data-viz="f60_sinif"></div>
    <p class="viz-cap" aria-live="polite"><b>İki eksen.</b> Süreye göre akut/kronik, kaynağına göre nosiseptif/nöropatik. Bir kutuya dokunun. [[K1 s. 272]]</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Uluslararası Ağrı Araştırmaları Derneği (IASP) ağrıyı, gerçek ya da olası doku hasarıyla ilişkili ya da böyle bir hasar cinsinden tanımlanan, hoş olmayan duyusal ve duygusal deneyim olarak tanımlar. <b>Nosisepsiyon</b> zararlı sinyallerin aksiyon potansiyeline kodlanıp periferden MSS'ye iletilmesidir; <b>ağrı</b>, beynin bu sinyalleri yorumlamasıyla doğan algıdır. [[K1 s. 272]]</p>
    <p>Eskiden akut ağrı &lt;12 hafta, kronik ağrı &gt;12 hafta diye ayrılırdı. Bu keyfî sınırın yerine kronik ağrı artık doku hasarından sonra beklenen iyileşme süresini aşan ağrı olarak tanımlanır. [[K1 s. 272]]</p>
    <div class="note plain" style="margin-top:10px"><b>Atlas notu.</b> IASP tanımı 2020'de güncellendi: "gerçek ya da olası doku hasarıyla ilişkili ya da buna benzeyen, hoş olmayan duyusal ve duygusal deneyim". Kitap eski (1979) tanımı verir.</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d60-nosiseptor">
  <h2>Nosiseptör ve ağrı lifleri</h2>
  <p class="intro">Nosiseptör, hücre hasarının ürettiği uyaranlarla aksiyon potansiyeli başlatan serbest, miyelinsiz sinir ucudur; sinyali hızlı Aδ ve yavaş C lifleri taşır. [[K1 s. 272]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hasar, aracılar ve iki hızda ağrı</h3></div>
    <div data-viz="f60_lifler"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Hasar.</b> Hasarlı hücreler K⁺, mast hücreleri histamin, trombositler serotonin salar; inflamasyonla bradikinin artar, lökotrien ve prostaglandinler sentezlenir. "Oynat"a basın. [[K1 s. 272]]</p>
    <p class="viz-foot">Model: hızlar kitaptaki değerlerdir (Aδ ≈ 20 m/s, C 0,5–4,0 m/s); uzaklık ve zaman ölçeği temsilîdir.</p>
  </div>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th></th><th>Aδ lifi</th><th>C lifi</th></tr></thead>
    <tbody>
      <tr><td><b>Uyaran</b></td><td>Mekanik, termal</td><td>Termal, mekanik, kimyasal</td></tr>
      <tr><td><b>Akson</b></td><td>Miyelinli, C'den kalın</td><td>Miyelinsiz, ince</td></tr>
      <tr><td><b>İletim hızı</b></td><td>≈ 20 m/s</td><td>0,5–4,0 m/s</td></tr>
      <tr><td><b>Ağrı</b></td><td>İlk ağrı: keskin, iyi lokalize</td><td>Ardından gelen künt, kötü lokalize ağrı</td></tr>
    </tbody>
  </table></div>
  <p class="small muted" style="margin-top:8px">Lif sınıflaması için Bölüm 52. [[K1 s. 272–273]]</p>
</section>

<section class="wrap blk ders-sec" id="d60-yollar">
  <h2>Ağrı yolları: spinotalamik ve trigeminal</h2>
  <p class="intro">Ağrı üç nöronla kortekse ulaşır: birinci nöron arka boynuzda (yüzde trigeminal çekirdekte) sinaps yapar, ikinci nöron çapraz yapıp talamusa çıkar, üçüncü nöron somatosensoriyel kortekse gider. [[K1 s. 273]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Nosiseptörden kortekse, adım adım</h3></div>
    <div data-viz="f60_yol"></div>
    <p class="viz-cap" aria-live="polite"><b>1 · Birinci nöron.</b> C ya da Aδ lifi, sinyali arka boynuzda substantia gelatinosa (Rexed lamina II) ya da nucleus proprius'a (lamina III, IV, V) getirir. "İleri"ye basın. [[K1 s. 273]]</p>
    <p class="viz-foot">Şematik omurilik ve beyin kesiti; lamina sınırları ve yolların konumu temsilîdir. Spinotalamik yol Bölüm 50'de de işlenir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Spinotalamik yol:</b> birinci ve ikinci nöron arasındaki nörotransmitter P maddesidir. İkinci nöron ön komissürde karşı tarafa geçer, omurilik boyunca spinotalamik yolda yükselir ve talamusta üçüncü nöronla sinaps yapar. [[K1 s. 273]]</p>
    <p><b>Trigeminal yol:</b> yüzün duyusu çoğunlukla trigeminal sinirle, orofarenks ve kulaktan gelen az sayıda lif ise fasiyal, glossofaringeal ve vagus sinirleriyle gelir. Hepsi trigeminal çekirdekte (omuriliğin arka boynuzunun karşılığı) sinaps yapar; burada da P maddesinin aracı olduğu düşünülür. Medulladan mezensefalona uzanan çekirdeğin üç kısmı farklı duyuları alır (şekilde). İkinci nöronlar hemen çapraz yapıp talamusa, üçüncü nöronlar somatosensoriyel kortekse gider. [[K1 s. 273]]</p>
    <div class="note plain" style="margin-top:10px"><b>Atlas notu.</b> Kitap trigeminal çekirdeği "Gasser gangliyonu" olarak da adlandırır; bu bir hatadır. Gasser (trigeminal) gangliyonu birinci nöronların hücre gövdelerini taşıyan periferik duyu gangliyonudur, beyin sapındaki çekirdek değildir.</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d60-kapi">
  <h2>Ağrı modülasyonu ve segmental inhibisyon</h2>
  <p class="intro">Ağrının şiddeti yaranın ağırlığıyla her zaman örtüşmez: ağır savaş yarası olan askerler az ağrı duyabilir, oysa bir uzvun travmatik kopması nosiseptörleri mutlaka uyarır. Demek ki beyne ulaşan sinyal yolda ayarlanır; bunu üç mekanizma yapar: segmental inhibisyon, endojen opioid sistemi ve inen inhibisyon. [[K1 s. 273]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Kapı kontrol kuramı (1965)</h3></div>
    <div data-viz="f60_kapi"></div>
    <p class="viz-cap" aria-live="polite"><b>Kapı açık.</b> Yalnız C lifi ateşlerken ikinci nöron sinyali spinotalamik yola geçirir. Mekanoreseptör lifinin etkinliğini artırın. [[K1 s. 273–274]]</p>
    <p class="viz-foot">Kuramın şematik modeli; bugün büyük ölçüde çürütülmüştür. Ateşleme düzeyleri temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Yarayı ovmak, sıcak ya da buz uygulamak ağrıyı azaltır; bu gözlem 1965'te kapı kontrol kuramına yol açtı. O dönem ağrıyı yalnız C liflerinin, dokunma, basınç ve titreşimi Aδ liflerinin taşıdığı sanılıyordu. Kurama göre iki lif aynı ikinci nörona yakınsar ve Aδ etkinliği arttıkça C lifinden geçen ağrı azalır. [[K1 s. 273]]</p>
    <p>Yalnız Aδ nosiseptif sinyallerini taşıyan ara nöronlar bulununca kuram büyük ölçüde çürütüldü. Yine de başka segmental mekanizmalar olabilir: transkütanöz elektriksel sinir stimülasyonu (TENS), Aδ liflerini deri elektrotlarıyla uyararak bazı hastalarda ağrıyı azaltır. [[K1 s. 273]]</p>
    <div class="note plain" style="margin-top:10px"><b>Atlas notu.</b> Melzack ve Wall'un özgün kuramında kapıyı kapatan, kalın miyelinli Aβ mekanoreseptör lifleridir; TENS de esas olarak Aβ liflerini uyarır. Aδ lifleri ince miyelinlidir, kitaptaki "kalın çaplı" ifadesi Aβ ile karşılaştırınca doğru değildir.</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d60-opioid">
  <h2>Endojen opioid sistemi</h2>
  <p class="intro">Opioid reseptörlerinin uyarılması birinci ile ikinci nöron arasındaki iletimi azaltır, yani ağrı iletimini engeller. [[K1 s. 273–274]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Arka boynuz sinapsında opioid etkisi</h3></div>
    <div data-viz="f60_opioid"></div>
    <p class="viz-cap" aria-live="polite"><b>Opioid yok.</b> Aksiyon potansiyeli presinaptik uca ulaşır, Ca²⁺ girer, P maddesi salınır ve ikinci nöron ateşler. Opioidi ekleyin. [[K1 s. 273–274]]</p>
    <p class="viz-foot">Şematik sinaps; iyon ve vezikül sayıları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Opioid reseptörleri MSS'nin her yerinde, özellikle periakuaduktal gri madde (PAG), ventral medulla ve omurilikte bulunur. Üç sınıfı (μ, κ, δ) G proteinine bağlı reseptördür; endojen ligandları enkefalinler, endorfinler ve dinorfindir. Etkinin iki yolu vardır: postsinaptik K⁺ kanallarını açıp ikinci nöronu hiperpolarize etmek ve presinaptik uca Ca²⁺ girişini engelleyip P maddesi salınımını azaltmak. [[K1 s. 273–274]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d60-inen">
  <h2>İnen inhibisyon</h2>
  <p class="intro">Beyin sapından omuriliğe inen nöronlar birinci ve ikinci nöron arasındaki sinapsı baskılayarak ağrı algısını azaltır. [[K1 s. 274]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>PAG → rafe magnus → arka boynuz</h3></div>
    <div data-viz="f60_inen"></div>
    <p class="viz-cap" aria-live="polite"><b>Yol kapalı.</b> Nosiseptif sinyal birinci nörondan ikinci nörona, oradan üçüncü nörona tam geçer. "İnen yolu etkinleştir"e basın. [[K1 s. 274]]</p>
    <p class="viz-foot">Şematik; ilaç etkilerinin büyüklüğü temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>PAG nöronları medulladaki rafe çekirdekleri (rafe magnus) üzerinden arka boynuza iner ve yükselen ikinci nöronların etkinliğini etkiler. Başlıca nörotransmitterlerinin serotonin ve noradrenalin olduğu düşünülür. Bu, seçici serotonin geri alım inhibitörleri ve trisiklik antidepresanların analjezik etkisini kısmen açıklar; α2-adrenerjik agonist klonidinin analjezisinin de bu yolun etkinliğini artırmasından kaynaklandığı düşünülür. [[K1 s. 274]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d60-hiper">
  <h2>Hiperaljezi ve allodini</h2>
  <p class="intro">Hiperaljezide ağrılı uyaran daha çok acıtır; allodinide ağrısız bir uyaran acıtır. [[K1 s. 275]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hasarlı deri, çevresi ve uyaran</h3></div>
    <div data-viz="f60_hiper"></div>
    <p class="viz-cap" aria-live="polite"><b>Hasarlı bölge · ağrılı uyaran.</b> Duyarlanmış nosiseptörlerin eşiği düşmüştür; ağrı normal deriden fazladır: primer hiperaljezi. Bölge ve uyaran seçin. [[K1 s. 275]]</p>
    <p class="viz-foot">Model: ağrı düzeyleri nitel ve temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Primer hiperaljezi</b> hasarlı dokudadır (güneş yanığı deri gibi): P maddesi, bradikinin ve histamin nosiseptörleri duyarlar, aksiyon potansiyeli eşiğini düşürür. <b>Sekonder hiperaljezi</b> hasarın çevresindeki dokudadır: uyarılmış ikinci nöronlar daha çok P maddesi, kalsitonin geniyle ilişkili peptit (CGRP) ve glutamat salıp komşu ikinci nöronları duyarlar. Omurilik ve beyin somatotopik düzenli olduğundan bu komşular hasarın çevresindeki dokuya karşılık gelir. [[K1 s. 275]]</p>
    <p>Hiperaljezi hasarlı dokuyu daha fazla zarardan koruyabilir; allodininin yararı yoktur. Hafif dokunma ya da serin bir esinti ağrı olarak algılanabilir; trigeminal nevralji gibi nöropatik ağrıların sık özelliğidir. Mekanizması belirsizdir; olası bir açıklama, omurilik devrelerinin yeniden düzenlenip nosiseptör ara nöronlarıyla mekanoreseptör ara nöronlarının yer değiştirmesidir. [[K1 s. 275]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d60-noropatik">
  <h2>Nöropatik ağrı</h2>
  <p class="intro">Nöropatik ağrı, somatosensoriyel sinir sisteminin bir lezyonu ya da hastalığının yol açtığı ağrıdır; nosiseptörlerin uyarılmasından değil, nöronun kendi hasarından doğar. [[K1 s. 272, 275]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hasarlı sinir nasıl kendiliğinden ateşler?</h3></div>
    <div data-viz="f60_noropati"></div>
    <p class="viz-cap" aria-live="polite"><b>Diyabetik nöropati.</b> Miyelinli lifin iskemisi demiyelinizasyon yapar; açığa çıkan akson ektopik aksiyon potansiyelleri üretir, saplanan ya da yanan ağrı olarak algılanır. [[K1 s. 275]]</p>
    <p class="viz-foot">Şematik; ateşleme sıklıkları temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Kaynak periferik ya da merkezi olabilir. PNS'yi diyabet, herpes zoster gibi enfeksiyonlar ya da kanser invazyonu, MSS'yi multipl skleroz ya da omurilik hasarı etkileyebilir. Nosiseptif ağrı genellikle keskin ya da sızlayıcıdır; nöropatik ağrı elektrik çarpması gibi epizodik ya da yanıcıdır, parestezi ve allodini gibi anormal duyumlar sıktır. [[K1 s. 275]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d60-krps">
  <h2>Sempatik sinir sistemi ve kompleks bölgesel ağrı sendromu</h2>
  <p class="intro">Doku travması somatik sinirlerle birlikte sempatik sinirleri de hasarlar; az sayıda hastada nedeni bilinmeden kronik sempatik işlev bozukluğu, yani kompleks bölgesel ağrı sendromu (KBAS, CRPS) gelişir. [[K1 s. 275]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>KBAS'ta etkilenen uzuv</h3></div>
    <div data-viz="f60_krps"></div>
    <p class="viz-cap" aria-live="polite"><b>Beş bulgu</b> yaralanma bölgesinde görülür. Bir bulguya dokunun. [[K1 s. 275]]</p>
    <p class="viz-foot">Şematik karşılaştırma: etkilenen ve sağlam uzuv.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Bulgular: vazomotor değişiklik (uzuv karşı taraftan sıcak ya da soğuk), sudomotor değişiklik (kitapta terleme azalır, klinikte artabilir de), kıl ve tırnak büyümesinde azalma, alttaki kemikte osteoporoz ve hiperaljezi ile allodininin sık olduğu nöropatik ağrı. Sempatik sistemin akut ağrıdaki rolü ise tartışmalıdır (Bölüm 59). [[K1 s. 275]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d60-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: ağrı ile nosisepsiyon farkı, akut/kronik ve nosiseptif sınıflar, aracılar ve kaynakları, Aδ ve C liflerinin özellikleri, spinotalamik ve trigeminal yolun sinapsları, kapı kuramı, opioid reseptörlerinin yeri ve etki yolları, inen inhibisyonun nörotransmitterleri, hiperaljezi ve allodini tanımları, nöropatik ağrı ve KBAS bulguları. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz60-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz60-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz60-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d60-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Ayağınıza bir çivi battığında ağrı sinyali beyninize nasıl ulaşır? Bu sinyal yolda nasıl ayarlanır?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanımlar.</b> IASP ağrı tanımı; nosisepsiyon sinyal iletimi, ağrı beynin yorumu. [[K1 s. 272]]</li>
    <li><b>Nosiseptör.</b> Serbest, miyelinsiz uç; K⁺, histamin, bradikinin, lökotrien ve prostaglandinler, serotonin. [[K1 s. 272]]</li>
    <li><b>Lifler.</b> Aδ miyelinli, ≈ 20 m/s, ilk keskin ağrı; C miyelinsiz, 0,5–4,0 m/s, künt ikinci ağrı. [[K1 s. 272–273]]</li>
    <li><b>Yol.</b> Birinci nöron → lamina II ya da III–V, P maddesi → ikinci nöron ön komissürde çapraz, spinotalamik yol → talamus → üçüncü nöron → somatosensoriyel korteks. Yüz için trigeminal çekirdek. [[K1 s. 273]]</li>
    <li><b>Segmental inhibisyon.</b> Ovma, sıcak, buz; kapı kuramı (1965) ve neden çürütüldüğü; TENS. [[K1 s. 273]]</li>
    <li><b>Opioidler.</b> PAG, ventral medulla, omurilik; μ, κ, δ, G proteinine bağlı; postsinaptik K⁺ açılır, presinaptik Ca²⁺ girişi azalır. [[K1 s. 273–274]]</li>
    <li><b>İnen inhibisyon.</b> PAG → rafe magnus → arka boynuz; serotonin ve noradrenalin; SSRI, trisiklikler, klonidin. [[K1 s. 274]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Omurilik kesiti çizin: arka boynuzda birinci nöron ile ikinci nöron arasında sinaps, ön komissürden çapraz geçiş, yükselen spinotalamik yol, talamus ve korteks. Sinapsa yukarıdan PAG → rafe magnus inen yolunu ve opioid reseptörünün pre/postsinaptik etkisini ekleyin. [[K1 s. 273–274]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Aδ ve C liflerini karşılaştırın. Kapı kuramı neden çürütüldü? Hiperaljezi ile allodini arasındaki fark nedir? Nöropatik ağrı nasıl oluşur? KBAS'ın bulguları nelerdir? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 272–275]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d60-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Nosisepsiyon sinyalin kodlanıp iletilmesi, ağrı beynin onu algılamasıdır; kronik ağrı beklenen iyileşme süresini aşan ağrıdır. [[K1 s. 272]]</li>
    <li>Nosiseptif ağrı yüzeyel, derin ya da visseral; nöropatik ağrı nöronun kendi hasarından doğar. [[K1 s. 272]]</li>
    <li>Aδ: miyelinli, ≈ 20 m/s, ilk ağrı; C: miyelinsiz, 0,5–4,0 m/s, künt ikinci ağrı. [[K1 s. 272–273]]</li>
    <li>Üç nöronlu yol: arka boynuz (P maddesi) → çapraz → spinotalamik yol → talamus → korteks; yüzde trigeminal çekirdek. [[K1 s. 273]]</li>
    <li>Modülasyon: segmental inhibisyon (kapı kuramı büyük ölçüde çürütüldü), opioidler (K⁺ açılır, Ca²⁺ girişi azalır), inen inhibisyon (serotonin, noradrenalin). [[K1 s. 273–274]]</li>
    <li>Primer hiperaljezi hasarlı dokuda nosiseptör duyarlanması, sekonder hiperaljezi çevrede ikinci nöron duyarlanmasıdır; allodinide ağrısız uyaran acıtır. [[K1 s. 275]]</li>
    <li>Nöropatik ağrı: demiyelinize akson ve düzensiz filizlenen uçlarda ektopik ateşleme; KBAS: vazomotor, sudomotor, trofik değişiklik, osteoporoz, nöropatik ağrı. [[K1 s. 275]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="60"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/59">← Bölüm 59 · Otonom sinir sistemi</a>
    <a href="#/dersler/fizyoloji/ek60">Sonraki: Ek ders · Ağrının periferik mekanizmaları →</a>
  </nav>
</section>`,
};
