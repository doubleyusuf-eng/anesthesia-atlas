VERI.sorular = VERI.sorular || {};
VERI.sorular['far03a-1'] = {
  no: 1, kagit: 'Paper A · Farmakoloji', kok: 'İlaç hedefleri ve iyon kanalları', kaynak: '[[K3 s. 26–29]]',
  onermeler: [
    { t: 'Sugammadeks roküronyum bloğunu kolinesterazı inhibe ederek çözer.', d: false, n: 'Sugammadeks roküronyumu seçici olarak bağlar. [[K3 s. 26]]' },
    { t: 'ACE inhibisyonu sırasında bradikinin birikimi öksürüğe yol açabilir.', d: true, n: 'ACE bradikinini inaktif parçalara dönüştürür. [[K3 s. 26]]' },
    { t: 'Nöromüsküler kavşakta nikotinik reseptörün iki α alt birimi asetilkolin bağlar.', d: true, n: 'İki asetilkolin molekülünün bağlanması Na⁺ akımını hızla artırır. [[K3 s. 27]]' },
    { t: '5-HT₃ reseptörü G proteini üzerinden çalışır.', d: false, n: '5-HT₃ pentamerik bir iyon kanalıdır. [[K3 s. 28]]' },
    { t: 'Ketamin NMDA reseptöründe kompetitif antagonisttir.', d: false, n: 'Ketamin burada nonkompetitif antagonizma gösterir. [[K3 s. 29]]' }
  ]
};
VERI.sorular['far03a-2'] = {
  no: 2, kagit: 'Paper A · Farmakoloji', kok: 'G proteini döngüsü ve ikinci haberciler', kaynak: '[[K3 s. 29–31]]',
  onermeler: [
    { t: 'İnaktif G proteininin α alt birimine GDP bağlıdır.', d: true, n: 'Aktif reseptörle etkileşimde GDP yerini GTP’ye bırakır. [[K3 s. 29]]' },
    { t: 'Gq adenilil siklazı inhibe eder.', d: false, n: 'Gq fosfolipaz C’yi uyarır, adenilil siklazı inhibe eden Gi’dir. [[K3 s. 31]]' },
    { t: 'Bir aktif reseptör birden çok G proteinini uyarabilir.', d: true, n: 'Bu çoğalma, sinyalin büyütüldüğü iki basamaktan ilkidir. [[K3 s. 29]]' },
    { t: 'DAG protein kinaz C’yi etkinleştirir.', d: true, n: 'PIP₂ parçalandığında oluşan DAG, etkisini protein kinaz C üzerinden gösterir. [[K3 s. 31]]' },
    { t: 'Milrinon cAMP yıkımını hızlandırır.', d: false, n: 'Milrinon PDE III inhibisyonuyla cAMP yıkımını azaltır. [[K3 s. 31]]' }
  ]
};
VERI.sorular['far03a-3'] = {
  no: 3, kagit: 'Paper A · Farmakoloji', kok: 'Enzime bağlı ve hücre içi reseptörler', kaynak: '[[K3 s. 31–32]]',
  onermeler: [
    { t: 'Nitrik oksidin uyardığı guanilil siklaz hücre zarında yer alır.', d: false, n: 'Nitrik oksit sitozolik enzimi uyarır. [[K3 s. 32]]' },
    { t: 'Atriyal natriüretik peptidin reseptörü guanilil siklaz aktivitesi taşır.', d: true, n: 'Zardaki reseptör üzerinden hücre içi cGMP artar. [[K3 s. 31]]' },
    { t: 'İnsülin reseptörünün β alt birimleri zarı kat eder.', d: true, n: 'İki β alt biriminin hücre içindeki tirozinleri fosforile olur. [[K3 s. 32]]' },
    { t: 'Toplayıcı tübülün mineralokortikoid reseptörü taşıyan hücrelerinde glukokortikoid reseptörü de bulunur.', d: true, n: 'Kitap böbrek ve kolondaki bu epitellerde her iki reseptörü tarif eder. [[K3 s. 32]]' },
    { t: 'Pioglitazon nükleer bir reseptörde agonisttir.', d: true, n: 'Hedef reseptör yağ dokusunda insülin duyarlılığıyla ilişkili proteinlerin transkripsiyonunu düzenler. [[K3 s. 32]]' }
  ]
};

const A03A_NAV = [
  ['hedef','İlaç hedefleri'], ['kanal','Ligand kapılı kanallar'], ['dongu','G proteini döngüsü'],
  ['haberci','Gs, Gi ve Gq'], ['enzim','Enzime bağlı yollar'], ['gen','Gen transkripsiyonu'],
  ['p1','Part I'], ['p2','Part II'], ['ozet','Özet']
];
SAYFALAR['dersler/farmakoloji/03a'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 1 · Bölüm 3 · Ders 03a',
  baslik: 'Etki mekanizmaları ve reseptör türleri',
  lede: 'Bir ilaç mide asidini doğrudan nötralize edebilir, bir enzimi durdurabilir veya reseptöre bağlanarak hücreye sinyal verebilir. [[K3 s. 26–27]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A03A_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a03a-${id}"><span>${i+1}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a03a-hedef">
<h2>İlaç hangi hedefe etki eder?</h2>
<p>Etki, ilacın fizikokimyasal özelliklerinden doğabilir veya bir proteine son derece özgül ve stereoselektif olabilir. [[K3 s. 26]]</p>
<div class="viz"><div class="viz-head"><h3>ACE inhibisyonunun iki sonucu</h3></div><template data-aciklama="anj">Ramipril anjiyotensin I’in II’ye dönüşümünü azaltır. [[K3 s. 26]] Hipertansiyon ve kalp yetersizliğindeki terapötik etki anjiyotensin II’nin azalmasına bağlıdır. [[K3 s. 26]]</template>
<template data-aciklama="bra">Bradikininin inaktif parçalara dönüşmesi de yavaşlar, biriken bradikinin inatçı öksürüğe neden olabilir. [[K3 s. 26]]</template>
<div data-viz="a03a_ace"></div><p class="viz-cap"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 26]]</p></div>
<p>Enzimler biyolojik katalizörlerdir ve onları hedefleyen ilaçların çoğu inhibitördür. [[K3 s. 26]] Şekilde anjiyotensin dönüştürücü enzim (ACE) inhibitörü ramiprilin etkisini izleyin: dönüşüm yavaşlayınca substrat birikir, ürün azalır. [[K3 s. 26]]</p>
<div class="cols">
<div class="card"><h3>Kimyasal etki</h3><ul>
<li>Antasitler mide asidini nötralize eder, şelatörler belirli metal iyonlarının konsantrasyonunu düşürür. [[K3 s. 26]]</li>
<li>Dikobalt edetat siyanürü bağlar ve siyanür zehirlenmesinde veya potansiyel olarak toksik bir sodyum nitroprussid dozundan sonra kullanılabilir. [[K3 s. 26]]</li>
<li>Bir γ-siklodekstrin olan sugammadeks roküronyumu seçici olarak bağlar ve antikolinesterazlara göre daha derin nöromüsküler bloğu geri döndürebilir. [[K3 s. 26]]</li></ul></div>
<div class="card"><h3>Protein hedefleri</h3><ul>
<li>Enzim inhibisyonu kompetitif (edrofonyum–kolinesteraz), nonkompetitif ya da geri dönüşümsüz olabilir (aspirin–siklooksijenaz, omeprazol–proton pompası). [[K3 s. 26]]</li>
<li>Kas ve sinirde elektriksel impuls iletimine katılan voltaj kapılı kanallar seçici olarak bloke edilebilir. [[K3 s. 26]]</li>
<li>Lokal anestezikler sinirdeki Na⁺ kanallarını, bazı antikonvülzanlar beyindeki benzer kanalları bloke eder. [[K3 s. 26]]</li>
<li>Kalsiyum kanal blokerleri damar düz kasındaki kanallara etki eder, antiaritmikler miyokarddaki iyon kanallarını bloke eder. [[K3 s. 26–27]]</li></ul></div></div>
<aside class="note plain"><b>Atlas notu.</b> Kitap omeprazolün hedefini Na⁺/H⁺ ATPaz olarak verir. Doğrusu gastrik H⁺/K⁺ ATPazdır.</aside>
</section>
<section class="wrap blk ders-sec" id="a03a-kanal">
<h2>Ligand bağlanınca hangi iyon geçer?</h2>
<p>İyonotropik reseptörde ligandın bağlanması, zarı geçen alt birimlerin biçimini değiştirip kanalı açar ve belirli iyonlara geçirgenliği artırır. [[K3 s. 27]]</p>
<div class="viz"><div class="viz-head"><h3>Ligand, kanal ve akım</h3></div><template data-aciklama="ach">İki α birimine asetilkolin bağlandığında Na⁺ akımı hızla artar ve membran depolarize olur. [[K3 s. 27]]</template>
<template data-aciklama="gaba">GABA bağlanınca klorüre seçici kanal açılır ve membran hiperpolarize olur. [[K3 s. 27]] Benzodiazepinler bu reseptörde Cl⁻ iletkenliğini allosterik yolla artırır. [[K3 s. 27]]</template>
<template data-aciklama="nmda">NMDA kanalında Na⁺ ve K⁺ geçirgenlikleri eşittir, iki değerlikli Ca²⁺ için geçirgenlik özellikle yüksektir. [[K3 s. 28–29]]</template>
<template data-aciklama="atp">ATP’nin açtığı katyon kanalından Na⁺ ve K⁺ eşit geçirgenlikle geçer, kanal Ca²⁺ da geçirir. [[K3 s. 29]]</template>
<div data-viz="a03a_kanal"></div><p class="viz-cap"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 27–29]]</p></div>
<p>Açık kanalda iyonlar elektriksel ve konsantrasyon gradyanları yönünde geçer. [[K3 s. 27]] GABA, doğal bir ligandın iki reseptörde farklı mekanizmalarla etki gösterebilmesine örnektir: GABA<sub>A</sub> iyonotropik, GABA<sub>B</sub> metabotropiktir. [[K3 s. 27]]</p>
<div class="cols">
<div class="card"><h3>Reseptörün yeri</h3><p>Reseptör, doğal ligandını özgül bir bölgede tanıyıp yanıt oluşturan, sıklıkla zarın parçası olan bir proteindir. [[K3 s. 27]] Genellikle protein veya glikoprotein yapısındadır. [[K3 s. 27]]</p>
<ul><li>Hücreye güç giren ligandların reseptörleri zarla ilişkili olabilir veya zarı baştan başa geçebilir. [[K3 s. 27]]</li>
<li>Organel zarlarında, sitozolde veya çekirdekte bulunan reseptörlere yağda çözünen ligandlar difüzyonla ulaşabilir, hücrede üretilen ara haberciler de etki edebilir. [[K3 s. 27]]</li></ul></div>
<div class="card"><h3>Bağlanmanın sonucu</h3><ul>
<li>Agonist reseptörün tanıma bölgesine bağlanıp yanıt oluşturur. [[K3 s. 27]]</li>
<li>İnhibitör doğal ligandın etkisini engeller, ters agonist ise reseptörün kendiliğinden süren aktivitesini azaltır. [[K3 s. 27]]</li>
<li>Reseptörler iyon geçirgenliğini değiştirme, ara haberci üretme veya gen transkripsiyonunu düzenleme yollarıyla etki eder. [[K3 s. 27]]</li></ul></div></div>
<h3>Ligand kapılı kanalların üç ailesi</h3>
<dl class="a03a-karsilastirma">
<dt>Pentamerik</dt><dd>Beş alt birim zarı kat eder. [[K3 s. 27]] Nöromüsküler kavşaktaki nikotinik reseptör iki α, birer β, ε ve δ alt birimi içerir. [[K3 s. 27]] GABA<sub>A</sub> da bu ailedendir. [[K3 s. 27]] Serotonin reseptörleri arasında iyon kanalı açarak çalışan tek üye pentamerik 5-HT₃’tür. [[K3 s. 28]]</dd>
<dt>Glutamat</dt><dd>Merkezi sinir sisteminin eksitatör ileticilerinden glutamatın açtığı kanallar arasında N-metil-D-aspartat (NMDA), α-amino-3-hidroksi-5-metil-4-izoksazolpropiyonik asit (AMPA) ve kainat reseptörleri bulunur. [[K3 s. 28]]</dd>
<dt>NMDA yapısı</dt><dd>Kitap NR1’i por oluşturan, NR2’yi koaktivatör glisini bağlayan düzenleyici alt birim olarak tanımlar ve in vivo dimerleşmeyle dört alt birimli kompleks oluştuğunun düşünüldüğünü belirtir. [[K3 s. 28]] NR1’in üç transmembran heliksinden ikisinin arasında zara yeniden girip pora katılan bir ilmek vardır. [[K3 s. 28–29]] Ketamin, ksenon ve nitröz oksit nonkompetitif antagonistlerdir. [[K3 s. 29]]</dd>
<dt>Pürinerjik</dt><dd>Metinde PX1 ve PX2 olarak geçen kanallarda iki transmembran heliks bulunur, por oluşturan ilmek yoktur. [[K3 s. 29]] ATP ile açılan bu kanallar mekanik duyu ve ağrıda rol oynar. [[K3 s. 29]] G proteinine kenetli iki pürinerjik reseptör biçimi ise adenozin veya ATP seçiciliğiyle ayrılır. [[K3 s. 29]]</dd></dl>
<aside class="note plain"><b>Atlas notu.</b> Kitap glisin bağlanmasını NR2’ye atfeder. Doğrusu glisinin GluN1’e (NR1), glutamatın GluN2’ye (NR2) bağlanmasıdır.</aside>
</section>
<section class="wrap blk ders-sec" id="a03a-dongu">
<h2>G proteini sinyali nasıl açıp kapatır?</h2>
<p>Zarın dışındaki ligandın hücre içinde haberci yanıtına çevrilmesinde en yaygın sistem G proteinine kenetli reseptördür (GPCR). [[K3 s. 29]]</p>
<div class="viz"><div class="viz-head"><h3>α alt birimindeki nükleotidi izleyin</h3></div><template data-aciklama="Dinlenme">Zarın iç yaprağındaki G proteininde α, β ve γ birliktedir, GDP α’ya bağlıdır. [[K3 s. 29]]</template>
<template data-aciklama="Değişim">Dışarıda ligand bağlanınca GPCR biçim değiştirir ve G proteiniyle kenetlenme olasılığı artar. [[K3 s. 29]] GDP’nin yerini GTP alınca α-GTP–βγ kompleksi oluşur. [[K3 s. 29]]</template>
<template data-aciklama="Ayrılma">α-GTP, βγ dimerinden ayrılır ve efektör enzimin ya da kanalın etkinliğini değiştirir. [[K3 s. 29]]</template>
<template data-aciklama="Birleşme">α kendi GTPaz etkinliğiyle bağlı GTP’yi parçalar. [[K3 s. 29]] α-GDP bir βγ dimeriyle birleşince inaktif kompleks yeniden kurulur. [[K3 s. 29–30]]</template>
<div data-viz="a03a_dongu"></div><p class="viz-cap"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 29–30]]</p></div>
<p>GPCR, zarı yedi kez geçen helikslerden oluşur. [[K3 s. 29]] İç yapraktaki sinyal dönüştürücü heterotrimerik G proteininin adı, bağladığı GDP ve GTP’den gelir. [[K3 s. 29]] α, β ve γ bu proteinin üç farklı alt birimidir. [[K3 s. 29]] Bu metabotropik sistemde sinyal iletimi GTP yıkımıyla eşleşir. [[K3 s. 29]]</p>
<ul><li><b>Efektör seçimi.</b> Ayrılan α-GTP bir enzimi (adenilil siklaz veya fosfolipaz C gibi) ya da iyon kanalını uyarabilir veya baskılayabilir. [[K3 s. 29]] Bazı sistemlerde βγ dimeri de sinyal iletir. [[K3 s. 29]]</li>
<li><b>Klinik örnek.</b> β-adrenerjik agonistler adenilil siklazı uyarır. [[K3 s. 29]] Morfin gibi opioid agonistleri G proteini aracılığıyla N tipi Ca²⁺ kanallarını baskılayarak ağrı sinyalinin iletimini azaltır. [[K3 s. 29]]</li>
<li><b>Sinyal büyümesi.</b> Tek bir aktif GPCR birden çok G proteinini, her G proteini de birden çok ara haberciyi etkinleştirebilir. [[K3 s. 29]] G proteini/GPCR oranının yaklaşık 100:1 olması küçük bir uyarının büyütülmesine olanak verir. [[K3 s. 31]]</li>
<li><b>Yanıtın düzenlenmesi.</b> Reseptörün hücre içi karboksil ucunun fosforilasyonu β-arrestin bağlanmasını kolaylaştırır ve reseptörün zardan uzaklaştırılması için sinyal oluşturur. [[K3 s. 31]] Agonist bu fosforilasyonu artırabilir ve kendi etkisini sınırlayabilir: β-adrenerjik agonistlerle görülen taşifilaksi böyle açıklanır. [[K3 s. 31]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a03a-haberci">
<h2>Gs, Gi ve Gq hangi yolları seçer?</h2>
<p>Reseptörün kenetlendiği G proteini yanıtı belirler: α alt biriminin en az 17 moleküler varyantı üç ana sınıfta toplanır. [[K3 s. 31]]</p>
<div class="viz"><div class="viz-head"><h3>Efektörden ikinci haberciye</h3></div><template data-aciklama="gs">Kitap β-adrenerjik etkileri Gs ile ilişkilendirir: adenilil siklaz uyarılınca cAMP üretimi artar. [[K3 s. 31]]</template>
<template data-aciklama="gi">Opiyat etkilerine aracılık eden Gi, adenilil siklazı inhibe eder ve cAMP üretimini azaltır. [[K3 s. 31]]</template>
<template data-aciklama="gq">Aktif ligand–reseptör kompleksi Gq aracılığıyla fosfolipaz C’yi uyarınca aynı zar lipidinden iki haberci doğar. [[K3 s. 31]]</template>
<div data-viz="a03a_yollar"></div><p class="viz-cap"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 31]]</p></div>
<div class="cols"><div class="card"><h3>cAMP ve kasılma</h3>
<ul><li>Adenilil siklazın ürettiği cAMP, çeşitli hücre dışı uyaranların ortak habercisidir. [[K3 s. 31]]</li>
<li>Protein kinaz A’nın iki düzenleyici (R) ve iki katalitik (C) birimi vardır. [[K3 s. 31]] cAMP R’ye bağlanınca serbestleşen aktif C, protein sentezini, gen aktivasyonunu veya iyon geçirgenliğini değiştirebilir. [[K3 s. 31]]</li>
<li>Fosfodiesterazlar (PDE) cAMP’yi yıkar. [[K3 s. 31]] Kitabın ele aldığı beş izoenzim içinde kalp kasında en önemlisi PDE III’tür. [[K3 s. 31]] Teofilin ve enoksimon PDE inhibisyonuyla hücre içi cAMP’yi artırır. [[K3 s. 31]]</li>
<li>Pozitif inotropi için β-adrenerjik agonistler veya adrenerjik olmayan glukagon cAMP üretimini artırır, milrinon ise PDE III inhibisyonuyla yıkımı azaltır. [[K3 s. 31]]</li></ul></div>
<div class="card"><h3>Bir lipitten iki haberci</h3><ul>
<li>Gq’nun uyardığı fosfolipaz C, zar lipidi fosfatidilinozitol 4,5-bisfosfatı (PIP₂) inozitol trifosfata (IP₃) ve diaçilgliserole (DAG) ayırır. [[K3 s. 31]]</li>
<li>IP₃ endoplazmik retikulumdan Ca²⁺ salıverilmesini sağlar. [[K3 s. 31]] Ca²⁺ artışı enzim aktivitesini veya hiperpolarizasyonu tetikleyebilir. [[K3 s. 31]]</li>
<li>DAG protein kinaz C’yi uyarır, biyokimyasal yanıt hücreye özgüdür. [[K3 s. 31]] Aynı habercinin etkisi, sinyali alan hücresel bileşene bağlıdır. [[K3 s. 31]]</li>
<li>α₁-adrenoseptör, muskarinik M₁, M₃, M₅ ve anjiyotensin II tip 1 reseptörleri Gq ile çalışır. [[K3 s. 31]]</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="a03a-enzim">
<h2>Guanilil siklaz ve tirozin kinaz</h2>
<p>Hücre dışındaki sinyal, membran guanilil siklazı veya tirozin kinaz sistemi üzerinden de hücre içine aktarılabilir. [[K3 s. 29]]</p>
<div class="viz"><div class="viz-head"><h3>Ligandı seçin, enzimin yerini bulun</h3></div><template data-aciklama="anp">Atriyal natriüretik peptit, kendisi guanilil siklaz aktivitesi taşıyan zar reseptörüyle cGMP’yi artırır. [[K3 s. 31]]</template>
<template data-aciklama="no">Nitrik oksit sitozolik guanilil siklazı uyararak aynı ikinci habercinin düzeyini artırır. [[K3 s. 32]]</template>
<template data-aciklama="insulin">İnsülinin bağlanmasıyla β biriminin kinazı etkinleşir ve başka hedef proteinleri fosforile eder. [[K3 s. 32]]</template>
<div data-viz="a03a_enzimler"></div><p class="viz-cap"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 31–32]]</p></div>
<p>Guanilil siklaz yollarında ortak ürün olan cGMP, hücre içi enzimlerin fosforilasyonu üzerinden ikinci haberci olarak iş görür. [[K3 s. 31–32]]</p>
<ul><li><b>Tirozin kinaz bağlantılı reseptörler.</b> İnsülin, epidermal büyüme faktörü ve trombosit kaynaklı büyüme faktörü bu reseptörleri uyararak çeşitli fizyolojik yanıtlar oluşturur. [[K3 s. 32]]</li>
<li><b>İnsülin reseptörü.</b> İki α ve zarı geçen iki β birimi içerir. [[K3 s. 32]] Ligand α’ya bağlanınca β’nın hücre içi tirozinleri fosforile olur ve β’nın kinaz aktivitesi açığa çıkar. [[K3 s. 32]]</li>
<li><b>Hedef proteinler.</b> Kinazın diğer proteinleri fosforile etmesi metabolizmayı, glukoz taşıyıcılarının zara yerleşmesini ve gen transkripsiyonunu etkiler. [[K3 s. 32]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a03a-gen">
<h2>Hormon bağlanmasından protein üretimine</h2>
<p>Steroidler ve tiroid hormonları hücre içi reseptörlerle gen ifadesini düzenler, protein üretimini dolaylı değiştirdikleri için etkileri yavaş gelişir. [[K3 s. 32]]</p>
<div class="viz"><div class="viz-head"><h3>Transkripsiyonun basamakları</h3></div><template data-aciklama="Bekleme">Sitoplazmik steroid reseptörü, inhibitör proteinle birlikteyken inaktif kalan bir transkripsiyon faktörüdür. [[K3 s. 32]]</template>
<template data-aciklama="Bağlanma">Uygun hormonun bağlanması reseptörün biçimini değiştirir ve yer değiştirmesine olanak verir. [[K3 s. 32]]</template>
<template data-aciklama="Transkripsiyon">Aktif reseptör özgül DNA promotör dizileriyle birleşir, mRNA üretimi ve ardından hücresel protein üretimi değişir. [[K3 s. 32]]</template>
<div data-viz="a03a_gen"></div><p class="viz-cap"></p><p class="viz-foot">Şematik/nitel. [[K3 s. 32]]</p></div>
<aside class="note plain"><b>Atlas notu.</b> Kitap aktif steroid reseptörünün çekirdekçiğe geçtiğini söyler. Doğrusu çekirdeğe geçiştir.</aside>
<dl class="a03a-karsilastirma">
<dt>Glukokortikoid reseptörü (GR)</dt><dd>GR birçok hücrede bulunur. [[K3 s. 32]] Stres sırasında kortikosteroidler karaciğerde protein üretimini akut faz proteinlerine yönlendirir. [[K3 s. 32]]</dd>
<dt>Mineralokortikoid reseptörü (MR)</dt><dd>Kitap MR’yi böbrek toplayıcı tübülü ve kolon gibi epitellerle sınırlar, aynı hücreler GR de taşır. [[K3 s. 32]] Yerel seçiciliği sağlayan 11-β hidroksisteroid dehidrogenaz kortizolü kortizona çevirir ve kortizon GR’de inaktiftir. [[K3 s. 32]]</dd>
<dt>Pioglitazonun hedefi</dt><dd>Bu antidiyabetik, peroksizom proliferatörüyle aktive edilen nükleer reseptörün agonistidir. [[K3 s. 32]] Reseptör yağ dokusunda insülin duyarlılığındaki artışla ilişkili proteinlerin transkripsiyonunu düzenler. [[K3 s. 32]]</dd></dl>
</section>
<section class="wrap blk ders-sec" id="a03a-p1"><h2>Part I · MTF</h2>
<p>Her önermeyi ayrı ayrı doğru veya yanlış olarak değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="far03a-1"></div></div><div class="viz"><div data-viz="mtf" data-q="far03a-2"></div></div><div class="viz"><div data-viz="mtf" data-q="far03a-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a03a-p2"><h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><h3>Açılış sorusu</h3><p>Asetilkolinin nöromüsküler kavşaktaki etkisini, bir β-adrenerjik agonistin ve bir steroid hormonun sinyal iletimiyle karşılaştırın. Her birinde yanıtı başlatan adım nedir?</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li><b>Hedefleri ayırın.</b> Nikotinik reseptör kanal oluşturur, β-adrenoseptör G proteinine kenetlenir, steroid reseptörü hücre içinde transkripsiyonu düzenler. [[K3 s. 27–32]]</li>
<li><b>Akımı gösterin.</b> İki asetilkolin iki α birimine bağlanır, Na⁺ akımı artar ve membran depolarize olur. [[K3 s. 27]]</li>
<li><b>Sinyali izleyin.</b> Aktif GPCR, G proteininde GDP’nin GTP ile değişimini kolaylaştırır. [[K3 s. 29–30]] Gs adenilil siklazı uyarır, cAMP protein kinaz A’nın katalitik birimini serbestleştirir. [[K3 s. 31]]</li>
<li><b>Büyütmeyi açıklayın.</b> Tek reseptör birden fazla G proteinini, bunların her biri de çeşitli habercileri uyarabilir. [[K3 s. 29]]</li>
<li><b>Yavaş yanıtı gerekçelendirin.</b> Steroidle etkinleşen reseptör DNA promotörü üzerinden mRNA üretimini düzenler, protein üretimindeki değişiklik zaman alır. [[K3 s. 32]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Yan yana üç yol çizin: nikotinik kanal ve Na⁺ akımı, Gs–adenilil siklaz–cAMP zinciri, steroid reseptöründen promotöre ve mRNA’ya giden yol. [[K3 s. 27–32]]</div>
<div class="note plain"><b>Olası ek sorular.</b> G proteini nasıl inaktive olur? [[K3 s. 29–30]] Milrinon ile bir β-agonist hangi basamaklarda ayrılır? [[K3 s. 31]] İnsülin reseptörünün hangi biriminde tirozinler fosforile olur? [[K3 s. 32]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a03a-ozet"><h2>Özet</h2><ul class="ozet">
<li>ACE inhibisyonu iki dönüşümü yavaşlatır: anjiyotensin II azalırken bradikinin birikebilir. [[K3 s. 26]]</li>
<li>Nikotinik reseptörde Na⁺ akımı depolarizasyonla, GABA<sub>A</sub> reseptöründe Cl⁻ iletkenliği hiperpolarizasyonla ilişkilidir. [[K3 s. 27]]</li>
<li>G proteininin α birimi GTP bağladığında efektörle etkileşir, GTP’yi parçaladığında inaktif komplekse döner. [[K3 s. 29–30]]</li>
<li>Gs ve Gi adenilil siklaz üzerinde zıt etkilidir, Gq fosfolipaz C’yi uyarır. [[K3 s. 31]]</li>
<li>Atriyal natriüretik peptit ve nitrik oksit farklı yerlerdeki guanilil siklazlar üzerinden cGMP’yi artırır. [[K3 s. 31–32]]</li>
<li>İnsülin sinyali tirozin fosforilasyonuyla başlar, steroid reseptörü ise transkripsiyon faktörü olarak çalışır. [[K3 s. 32]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="03a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/02c">← 02c · Atılım, hastalık ve yaşamın uç dönemleri</a><a href="#/dersler/farmakoloji/03b">Sonraki: 03b · İlaç–reseptör etkileşimi: agonizm, antagonizm, tolerans →</a></nav>
</section>`
};
