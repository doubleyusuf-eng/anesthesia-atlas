VERI.sorular = VERI.sorular || {};
VERI.sorular['far09e-1'] = {
  no: 1, kok: 'Nitröz oksit ve Entonox', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 124–128]]',
  onermeler: [
    { t: 'Sıvı N₂O içeren tüpte manometre kalan miktarı gösterir.', d: false, n: 'Sıvı faz tükeninceye kadar basınçtan içerik okunamaz. [[K3 s. 124]]' },
    { t: 'Yüksek inspire N₂O fraksiyonunda FA/FI daha hızlı yükselir.', d: true, n: 'Yüksek konsantrasyonun oluşturduğu büyük gradyan kapillere gaz geçişini artırır. [[K3 s. 125]]' },
    { t: 'Difüzyon hipoksisinin nedeni N₂O’nun alveolden kana geçmesidir.', d: false, n: 'Anestezi sonunda kandan alveole dönen N₂O, oksijen dahil alveoler gazları seyreltir. [[K3 s. 126]]' },
    { t: 'Entonox doğum eyleminde analjezi için kullanılır.', d: true, n: 'Eşit oranlı N₂O/O₂ karışımı doğumda ve diğer ağrılı işlemlerde kullanılır. [[K3 s. 127]]' },
    { t: 'N₂O, B₁₂ vitaminindeki kobaltı indirgeyerek inaktive eder.', d: false, n: 'Kobalt oksitlenir ve B₁₂ metiyonin sentetaza kofaktörlük edemez. [[K3 s. 126]]' },
  ],
};
VERI.sorular['far09e-2'] = {
  no: 2, kok: 'İzofluran ve sevofluran', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 128–132]]',
  onermeler: [
    { t: 'İzofluranın sistemik damar direncini azaltmasına refleks taşikardi eşlik eder.', d: true, n: 'Bu yanıt karotis sinüs refleksinin korunduğunu düşündürür. [[K3 s. 128]]' },
    { t: 'İzofluranın %3,5’i metabolize edilir.', d: false, n: 'Metabolize edilen izofluran oranı %0,2’dir. [[K3 s. 129]]' },
    { t: 'Sevofluran akiraldir.', d: true, n: 'Sevofluran, kiralite açısından diğer volatil ajanlardan ayrılır. [[K3 s. 130]]' },
    { t: 'Sevofluranın hepatik metabolizmasında inorganik florür oluşur.', d: true, n: 'CYP2E1 aracılı metabolizmanın ürünleri heksafloroizopropanol ve inorganik F⁻’dir. [[K3 s. 131]]' },
    { t: 'A bileşiği için 150–200 ppm, insanlarda doğrudan ölçülmüş nefrotoksisite eşiğidir.', d: false, n: 'Bu aralık hayvan çalışmalarından insana yapılan bir tahmindir. [[K3 s. 131–132]]' },
  ],
};
VERI.sorular['far09e-3'] = {
  no: 3, kok: 'Halotan, enfluran ve desfluran', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 130–133]]',
  onermeler: [
    { t: 'Hipoksik karaciğerde halotanın oksidatif metabolizması baskındır.', d: false, n: 'Hipokside redüktif yol ağırlık kazanır. [[K3 s. 132]]' },
    { t: 'Halotan miyokardı ekzojen katekolaminlere duyarlılaştırır.', d: true, n: 'Bu nedenle adrenalin içeren lokal anestezik preparatları dikkat gerektirir. [[K3 s. 132]]' },
    { t: 'Yüksek enfluran konsantrasyonunda EEG’de 3 Hz diken-dalga görülebilir.', d: true, n: 'Bu epileptiform patern grand mal aktivitesiyle uyumludur. [[K3 s. 133]]' },
    { t: 'Desfluranın kan:gaz partisyon katsayısı 0,42’dir.', d: true, n: 'Düşük katsayı hızlı başlangıç ve sonlanmayı açıklar. [[K3 s. 133]]' },
    { t: 'Desfluran 1 MAK üzerinde taşikardi ve hipertansiyon oluşturabilir.', d: true, n: 'Kardiyovasküler uyarılma iskemik kalp hastalığında özellikle önemlidir. [[K3 s. 133]]' },
  ],
};

(function () {
  const nav = [['gaz','Nitröz oksit'],['b12','B₁₂'],['entonox','Entonox'],['profil','Ajan karşılaştırması'],['izo','İzofluran'],['sevo','Sevofluran'],['halo','Halotan'],['eter','Enfluran ve desfluran'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  // Kit, şekli kurmadan önce bu erişilebilir açıklamaları okur.
  const aciklamalar = {
    alveol: [
      ['yuksek','%70 N₂O','Başlangıçta %70 N₂O verildiğinde son alveoler fraksiyon %59,5’tir; ikinci ajanın payı %2’den %2,7’ye çıkar. [[K3 s. 124–125]]'],
      ['dusuk','%20 N₂O','Başlangıçta %20 N₂O verildiğinde aynı anda FA/FI yalnız 0,60’tır; ikinci ajanın payı %2,2 olur. [[K3 s. 124–125]]'],
    ],
    kobalt: [
      ['0','Normal yol','Etkin kobalt içeren B₁₂, homosistein ve metil-tetrahidrofolatın metiyonin ve tetrahidrofolata (THF) dönüşümünü destekler. [[K3 s. 126]]'],
      ['1','N₂O etkisi','Kofaktör kaybına ek olarak N₂O, metiyonin sentetazı doğrudan da inhibe ediyor görünmektedir. [[K3 s. 126]]'],
      ['2','Maruziyet','Maruziyet yalnız birkaç saat sürse de megaloblastik değişiklik görülebilir; günlere uzarsa agranülositoz gelişebilir. [[K3 s. 126]]'],
    ],
    tup: [
      ['karisik','Karışmış','Birlikte çözünen iki gazın oluşturduğu karışım doğum eyleminde veya ağrılı işlemlerde kullanılabilir. [[K3 s. 127]]'],
      ['bas','Ayrışma sonrası ilk gaz','Ayrışmış tüp kullanılırsa ilk solunan gazda O₂ baskındır ve analjezi azdır. [[K3 s. 128]]'],
      ['son','Tüp boşalırken','Boşalmaya devam eden tüp giderek daha potent ve hipoksik gaz verir. [[K3 s. 128]]'],
    ],
    dolasim: [
      ['Halotan','Halotan','Kontraktilite ve hız birlikte düşer; katekolaminlere duyarlılaşma en belirgin halotandadır. [[K3 s. 130]]'],
      ['İzofluran','İzofluran','Direnç düşerken kalp hızı artar; kitap koroner çalmayı olası olarak sınıflar. [[K3 s. 130]]'],
      ['Enfluran','Enfluran','Kontraktilite ve splanknik kan akımı azalırken kalp hızı ve katekolamin duyarlılığı artar. [[K3 s. 130]]'],
      ['Desfluran','Desfluran','¹ Kalp hızındaki artış 1,5 MAK üzerinde daha belirgindir. [[K3 s. 130]]'],
      ['Sevofluran','Sevofluran','² Karşılaştırma tablosunda kontraktilite hafif azalır; izleyen sayfanın metninde etkilenmediği belirtilir. [[K3 s. 130–131]]'],
    ],
    perfuzyon: [
      ['varsayim','Çalma varsayımı','Öne sürülen mekanizmada normal arteriyoller genişler, hastalıklı damarlar yanıt veremez ve kan dağılımı değişebilir. [[K3 s. 128]]'],
      ['korunmus','Perfüzyon korunursa','Kitabın aktardığı daha yeni çalışmalar, perfüzyon korunduğunda koroner çalma oluşmadığını düşündürür. [[K3 s. 128]]'],
    ],
    ortam: [
      ['sise','Şişe','Eklenen su 100 ppm’nin altındaysa depolama sırasında bağlar Lewis asitlerinin saldırısına duyarlı hale gelir ve HF açığa çıkar. [[K3 s. 129–130]]'],
      ['karaciger','Karaciğer','Sevofluranın %3,5’i metabolize edilir. [[K3 s. 123]] Yaygın kullanılan volatil ajanlardan yalnız halotan daha fazla hepatik metabolizmaya uğrar; inorganik florür renal toksisiteyle ilişkilidir. [[K3 s. 131]]'],
      ['devre','Devre','Kuru potasyum hidroksit temelli absorban ürün oluşumunu destekler. [[K3 s. 131]] Düşük akımda bile doruk A bileşiği düzeyinin 20 ppm altında kaldığını düşündüren çalışmalar vardır. [[K3 s. 132]]'],
    ],
    karaciger: [
      ['oks','Oksidatif yol','İnhale halotanın %25’ine kadarı oksidatif metabolizmayla trifloroasetik asit, Br⁻ ve Cl⁻ oluşturur. [[K3 s. 132]] Trifloroasetil klorür hapten gibi davranarak fulminan hepatite zemin hazırlayabilir. [[K3 s. 132]]'],
      ['red','Hipoksik karaciğer','İndirgenmiş ürünler toksiktir, ancak halotan hepatitinden sorumlu oldukları düşünülmez. [[K3 s. 132]] Geri dönüşümlü transaminaz artışının olası nedeni hepatik hipoksidir. [[K3 s. 132]]'],
    ],
    eter: [
      ['enf','Enfluran','Enfluran metabolizmasında açığa çıkan florürün geri dönüşümlü nefropati yapabildiği bilinmektedir. [[K3 s. 133]]'],
      ['des','Desfluran','Desfluran çok uçucu olduğundan kitap, ajanı 2 atmosfer basınçta 39 °C’ye ısıtan elektronik Tec 6 vaporizatörünü tarif eder. [[K3 s. 133]]'],
    ],
  };
  function sekil(ad, baslik, dip) {
    return `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="a09e_${ad}"><dl>${aciklamalar[ad].map(([id, etiket, metin]) => `<dt>${etiket}</dt><dd data-durum="${id}">${metin}</dd>`).join('')}</dl></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${dip}</p></div>`;
  }
  function kart(ad, maddeler) {
    return `<div class="card"><h3>${ad}</h3><ul>${maddeler.map(m => `<li>${m}</li>`).join('')}</ul></div>`;
  }
  // Her satır dar ekranda kendi sütun etiketleriyle okunur.
  function tablo(ad, basliklar, satirlar) {
    return `<table class="tbl a09e-tablo"><caption>${ad}</caption><thead><tr>${basliklar.map(b => `<th scope="col">${b}</th>`).join('')}</tr></thead><tbody>${satirlar.map(([ajan, ...degerler]) =>
      `<tr><th scope="row">${ajan}</th>${degerler.map((d,i) => `<td><span class="a09e-etiket" aria-hidden="true">${basliklar[i+1]}</span><span>${d}</span></td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
  SAYFALAR['dersler/farmakoloji/09e'] = {
    grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 2 · Bölüm 9 · Ders 09e',
    baslik: 'İnhalasyon ajanlarının farmakolojisi ve tek tek ajanlar',
    lede: 'Bir gazın alveole girişini, bir tüpün boşalmasını ve bir volatil ajanın metabolizmasını izleyerek klinik sonuçlarını açıklayın.',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id,ad]) => `<button type="button" data-scroll="a09e-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a09e-gaz">
<h2>Nitröz oksit alveoldeki diğer gazları nasıl etkiler?</h2>
<p class="intro">Yüksek fraksiyonda solunan nitröz oksit (N₂O), alveoler fraksiyonun inspire edilen fraksiyona oranını (FA/FI) orantısız hızla yükseltir. [[K3 s. 124–125]]</p>
${sekil('alveol','Aynı anda iki farklı gaz karışımı','Model başlangıçtaki N₂O’nun yarısının kapillere geçtiğini varsayar. [[K3 s. 124–125]]')}
<p>Şekilde renkli şeritlerin altındaki yüzdeleri okuyun. Her şerit o andaki karışımın bileşimini gösterir. Büyük gradyan, düşük kan:gaz çözünürlüğüne (0,47) rağmen çok miktarda N₂O’yu kana taşır. [[K3 s. 125]] Hacim açığını iletici hava yollarından gelen, başlangıçla aynı bileşimdeki gaz kapatır. [[K3 s. 125]]</p>
<div class="cols">${kart('Alım ve geri dönüş',[
'Konsantrasyon etkisini gösterecek kadar yüksek fraksiyonda kullanılan tek ajan N₂O’dur. [[K3 s. 125]] Düşük fraksiyonlu örnekte başlangıç hacminin %20’si N₂O’dur; yarısı alınınca başlangıç hacminin %10’u kadar N₂O kalır. [[K3 s. 124–125]] Modelin sınırları vardır: başka gazların emilimini ve vücuttan çıkan N₂’yi hesaba katmaz. [[K3 s. 125]]',
'İkinci gaz etkisi: hızlı N₂O alımı ve artan alveoler ventilasyon, eşlik eden O₂’yi ve varsa volatil ajanı yoğunlaştırır, indüksiyonu kısaltır. [[K3 s. 125–126]]',
'Difüzyon hipoksisi: N₂O/O₂’den havaya geçildiğinde alveole dönen N₂O hacmi, kana geçen N₂ hacmini aşar ve tüm alveoler gazlar seyrelir. [[K3 s. 126]] Kitapta çoğu volatil anestezinin %100 O₂ ile sonlandırılması bu etkiyi önler. [[K3 s. 126]]',
'Hava içeren boşluklar hızla genişler: pnömotoraks, damar içi hava embolisi ve bağırsak lümeni buna örnektir. [[K3 s. 126]]'
])}${kart('Klinik profil',[
'N₂O volatil ajanlara eşlik edebilir veya O₂ ile Entonox olarak verilebilir. [[K3 s. 123]] Yüksek MAK dışında fiziksel özellikleri elverişlidir, ancak bulantı-kusma ve çevresel kaygılar ameliyathane kullanımını azaltmaktadır. [[K3 s. 123]]',
'Tidal hacim hafif düşer, solunum hızındaki artış bunu karşılar; dakika hacmi ve PaCO₂ korunur. [[K3 s. 125]]',
'Hafif doğrudan miyokard depresyonunu santral sempatik uyarı dengeler, sağlıklı kişide dolaşım az değişir. [[K3 s. 124–125]] Sempatik yanıtını artıramayan kalp yetersizliği hastasında debi belirgin düşebilir; katekolamin duyarlılığı artmaz. [[K3 s. 125]]',
'Serebral kan akımı artar; intrakraniyal basınç yüksekse bazen N₂O’dan kaçınılır. [[K3 s. 125]] MAK %105 olsa da özellikle yaşlılarda anestezi oluşabilir. [[K3 s. 125]]',
'Ameliyat sonrası bulantı-kusma riski, özellikle risk faktörleri varsa, muhtemelen artar. [[K3 s. 125]]'
])}</div>
<h3>Üretim ve tüp içeriği</h3>
<p>Üretimin temel tepkimesi NH₄NO₃ → N₂O + 2 H₂O’dur (250 °C). [[K3 s. 123]] Sıcaklık denetimi yetersizse NH₃, N₂, NO, NO₂ ve HNO₃ bulunabilir; arıtmada yıkayıcılar, su ve kostik soda kullanılır. [[K3 s. 124]]</p>
<ul><li>Fransız mavisi tüpte N₂O sıvı halde depolanır (C: 450 litre, G: 9000 litre); 20 °C’de manometrik basınç 51 bar’dır. [[K3 s. 124]] Sıvının tümü gaz oluncaya kadar basınç kalan miktarı göstermez. [[K3 s. 124]]</li>
<li>Dolum oranı, N₂O kütlesinin tüpün alabileceği su kütlesine oranıdır. [[K3 s. 124]] Ilıman bölgede 0,75 olan oran, tüpün patlamasını önlemek için tropik bölgede 0,67’ye indirilir. [[K3 s. 124]]</li>
<li>Kritik sıcaklık 36,5 °C, kritik basınç 72 bar’dır. [[K3 s. 124]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a09e-b12">
<h2>N₂O maruziyetinden kemik iliğine</h2>
<p class="intro">N₂O, B₁₂ vitamininin kobaltını oksitleyerek metiyonin sentetazın kofaktörünü etkisizleştirir. [[K3 s. 126]]</p>
${sekil('kobalt','Kofaktör kaybının sonuçları','Şematik/nitel. Biyokimyasal yol ve maruziyet süreleri. [[K3 s. 126]]')}
<p>İyileşme, birkaç gün süren yeni metiyonin sentetaz sentezine bağlıdır; alternatif tetrahidrofolat kaynağı sağlayan folinik asit yardımcı olabilir. [[K3 s. 126]]</p>
<ul><li>Atık gazların uygun uzaklaştırıldığı ortamda N₂O konsantrasyonu 50 ppm’nin altındaysa DNA sentezi etkilenmez. [[K3 s. 126]]</li>
<li>Atık gaz uzaklaştırması olmayan, yoğun N₂O kullanılan diş kliniklerinde kronik B₁₂ inaktivasyonuyla omuriliğin subakut kombine dejenerasyonuna benzer sendromlar bildirilmiştir. [[K3 s. 126]]</li>
<li>Sıçanlarda deneysel teratojeniteyi folinik asit önler. [[K3 s. 126]] İnsanlarda teratojenite kesin gösterilmemiştir; anestezi gerektiğinde ilk trimesterde N₂O çoğunlukla kullanılmaz. [[K3 s. 126]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a09e-entonox">
<h2>Entonox tüpü ayrışırsa ne değişir?</h2>
<p class="intro">Doğumda ve diğer ağrılı girişimlerde analjezi sağlayan Entonox, 50:50 N₂O/O₂ karışımıdır. [[K3 s. 127]]</p>
${sekil('tup','Ayrışan tüpten çıkan gaz','Şematik/nitel. Tüp boşalırken verilen gazın bileşimi. [[K3 s. 127–128]]')}
<p>Gazlar birbirinde çözündüğü için karışımın davranışı, bileşenlerin tek başına özelliklerinden farklıdır (Poynting etkisi). [[K3 s. 127]]</p>
<ul><li>Entonox gaz halde 137 bar’da saklanır; Fransız mavisi tüpün omuzları beyaz-mavi karelidir (G: 3200 litre, J: 6400 litre). [[K3 s. 127]]</li>
<li>Tüpte psödokritik sıcaklık yaklaşık −7 °C’dir; bunun altında ayrışma olasılığı 117 bar’da en yüksektir, daha düşük ve daha yüksek basınçta azalır. [[K3 s. 127–128]]</li>
<li>Boru hattında 4,1 bar basınçta psödokritik sıcaklık −30 °C’nin altına iner. [[K3 s. 128]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a09e-profil">
<h2>Aynı sisteme farklı etkiler</h2>
<p class="intro">Volatil ajanların tümü serebral oksijen gereksinimini azaltır; serebral kan akımındaki artışın büyüklüğü ise ajana göre değişir. [[K3 s. 130–131]]</p>
${sekil('dolasim','Ajan seçerek dolaşım yanıtını karşılaştırın','Şematik/nitel. Ok sayısı tablodaki göreli değişimi gösterir. [[K3 s. 130]]')}
<p>Minimal alveoler konsantrasyon (MAK) ve partisyon katsayıları için <a href="#/dersler/farmakoloji/09d">09d dersine</a> dönün. Bir ajandan diğerine geçerken kan basıncının yanı sıra kontraktiliteyi, kalp hızını ve sistemik damar direncini izleyin. Ardından aşağıdaki tablolarda aynı ajanın fiziksel özelliklerini ve diğer sistemlerdeki etkilerini okuyun. Solunum tablosunda okların yönü değişimin yönünü, sayısı kitapta verilen göreli büyüklüğü gösterir. [[K3 s. 129]]</p>
${tablo('Fiziksel özellikler ve potentlik', ['Ajan','Molekül ağırlığı','Kaynama (°C)','20 °C’de doymuş buhar basıncı (kPa)','MAK (%)','Kan:gaz','Yağ:gaz','Koku'], [
['Halotan','197,0','50,2','32,3','0,75','2,40','224','Tatlı, irritan değil [[K3 s. 128]]'],
['İzofluran','184,5','48,5','33,2','1,17','1,40','98','İrritan [[K3 s. 128]]'],
['Enfluran','184,5','56,5','23,3','1,68','1,80','98','İrritan değil [[K3 s. 128]]'],
['Desfluran','168,0','23,5','89,2','6,60','0,42','29','Keskin [[K3 s. 129]]'],
['Sevofluran','200,1','58,5','22,7','1,80','0,70','80','İrritan değil [[K3 s. 129]]'],
['N₂O','44,0','−88,0','5200','105','0,47','1,4','Kokusuz [[K3 s. 129]]'],
['Ksenon','131,0','−108','Verilmemiş','71,0','0,14','1,9','Kokusuz [[K3 s. 129]]']
])}
${tablo('Solunum ve serebral etkiler', ['Ajan','Solunum hızı','Tidal hacim','PaCO₂','Serebral kan akımı','EEG'], [
['Halotan','↑','↓','Değişmez [[K3 s. 129]]','↑↑↑','Burst supresyonu [[K3 s. 130]]'],
['İzofluran','↑↑','↓↓','↑↑ [[K3 s. 129]]','↑ (1 MAK altında artış yok)','Burst supresyonu [[K3 s. 130]]'],
['Enfluran','↑↑','↓↓↓','↑↑↑ [[K3 s. 129]]','↑','Epileptiform, 3 Hz diken-dalga [[K3 s. 130]]'],
['Desfluran','↑↑','↓↓','↑↑ [[K3 s. 129]]','↑','Burst supresyonu [[K3 s. 131]]'],
['Sevofluran','↑↑','↓','↑ [[K3 s. 129]]','↑','Burst supresyonu [[K3 s. 131]]']
])}
<p>Beş volatil ajan da uterusu bir miktar gevşetir. [[K3 s. 130–131]] Halotan kas gevşemesini bir miktar güçlendirir ve analjezi sağlamaz; diğer dördü kas gevşemesini belirgin güçlendirir ve bir miktar analjezi sağlar. [[K3 s. 130–131]]</p>
</section>
<section class="wrap blk ders-sec" id="a09e-izo">
<h2>İzofluran: idamede damar direnci ve perfüzyon</h2>
<p class="intro">Anestezi idamesinde yaygın kullanılan izofluran, enfluranın yapısal izomeri olan halojenli bir etil metil eterdir. [[K3 s. 128]]</p>
${sekil('perfuzyon','Koroner çalma varsayımı','Şematik/nitel. Koroner perfüzyon, çalma olasılığının yorumunu değiştirir. [[K3 s. 128]]')}
<p>İzofluranın ATP’ye bağımlı potasyum kanalları aracılığıyla miyokardı koruyucu etkisi de olabilir. [[K3 s. 128]]</p>
<div class="cols">${kart('Solunum ve dolaşım',[
'Keskin koku üst hava yolunu irrite edebilir, öksürük ve nefes tutmaya yol açabilir; bu nedenle indüksiyonda seyrek kullanılır. [[K3 s. 128]] Bir miktar bronkodilatasyon yapar. [[K3 s. 128]]',
'Ventilasyon depresyonu halotan ile enfluran arasındadır; dakika hacmi düşerken solunum hızı ve PaCO₂ artar. [[K3 s. 128]]',
'Başlıca etki sistemik damar direncinde düşüştür; refleks taşikardi karotis sinüs refleksinin korunduğunu düşündürür. [[K3 s. 128]] Kontraktilite ve kardiyak debi az miktarda düşer. [[K3 s. 128]]'
])}${kart('Beyin ve derlenme',[
'Volatil ajanlar arasında serebral oksijen gereksinimindeki azalma ile kan akımındaki minimal artışın dengesi en elverişli olan izoflurandır. [[K3 s. 129]] Serebral otoregülasyon 1 MAK’ye kadar korunur. [[K3 s. 129]]',
'Bulantı-kusmada olası yol, medullada dördüncü ventrikül tabanındaki area postremanın uyarılmasıdır. [[K3 s. 129]] Etki dozla ilişkili olabilir ve erken ameliyat sonrası dönemle sınırlıdır. [[K3 s. 129]] Süre uzadıkça olasılık artar, ancak uzun cerrahide daha fazla opioid kullanılması da olasıdır. [[K3 s. 129]]'
])}</div>
<h3>Metabolizma ile devredeki reaksiyonu ayırın</h3>
<p>İzofluranın yalnız %0,2’si metabolize edilir; ürünleri toksisiteyle ilişkilendirilmemiştir. [[K3 s. 129]] Buna karşılık –CHF₂ grubu kuru soda lime veya baralyme ile reaksiyona girdiğinde karbonmonoksit açığa çıkabilir. [[K3 s. 129]]</p>
<p>Hafta sonu kuru gaz akışı açık bırakılan halka devrelerinde, ardından izofluran kullanıldığında karbonmonoksit bildirilmiştir. [[K3 s. 129]] Aynı grubu taşıyan enfluran ve desfluran da benzer reaksiyon verebilir. [[K3 s. 129]]</p>
</section>
<section class="wrap blk ders-sec" id="a09e-sevo">
<h2>Sevofluran: şişe, karaciğer ve absorban</h2>
<p class="intro">Sevofluran, hoş kokusu, düşük kan:gaz katsayısı (0,7) ve görece düşük MAK değeri (%1,8) ile indüksiyona elverişli, poliflorlu bir izopropil metil eterdir. [[K3 s. 129]] [[K3 s. 131]]</p>
${sekil('ortam','Hangi ortamda hangi ürün oluşur?','Şematik/nitel. Depolama, hepatik metabolizma ve devre ayrı süreçlerdir. [[K3 s. 129–131]]')}
<p>Şişede cam bir Lewis asidi kaynağıdır; hidroflorik asit (HF) camı aşındırdıkça sevofluran daha fazla Lewis asidine maruz kalır. [[K3 s. 129–130]] Lewis asitleri elektron çifti kabul eder; birçok metal oksit ve H⁺ bu gruptadır. [[K3 s. 130]]</p>
<div class="cols">${kart('Formülasyon ve üretim',[
'Lewis asitlerini inhibe etmek için 300 ppm su içeren formülasyon polietilen naftalat şişede saklanır. [[K3 s. 130]]',
'Kuru formülasyon 130 ppm’den az su içerir ve epoksifenolik reçine laklı alüminyum şişede sunulur. [[K3 s. 130]] Kitabın yapı çizimlerinde yıldız kiral merkezi gösterir. [[K3 s. 127]] Sevofluran diğer volatil ajanlardan farklı olarak akiraldir. [[K3 s. 130]]',
'Tek kap yönteminde bileşenler birlikte eklenir, ardından su 300 ppm’ye tamamlanır. [[K3 s. 131]] Kloro-floro yönteminde önce klorlu molekül iskeleti hazırlanır, ardından klorun yerini flor alır. [[K3 s. 131]]'
])}${kart('Sistem etkileri',[
'Dakika hacmi azalır ve PaCO₂ yükselir. [[K3 s. 131]]',
'Sistemik damar direnci düşer; kalp hızı değişmediği için kan basıncı azalır. [[K3 s. 131]] Kitabın tablosu kontraktilitede hafif azalma gösterirken açıklama metni kontraktilitenin etkilenmediğini belirtir. [[K3 s. 130–131]]',
'Miyokard katekolaminlere duyarlılaşmaz; serebral ve koroner damar direnci düşer. [[K3 s. 131]]',
'Çocuklarda halotana göre daha sık ameliyat sonrası ajitasyon ve deliryum görülebileceğini, bunun erken derlenmeyi aşabileceğini gösteren kanıtlar vardır. [[K3 s. 131]] Bulantı-kusma mekanizması diğer volatil ajanlarınkine benzer. [[K3 s. 131]]'
])}</div>
<h3>Absorbandaki A bileşiğini nasıl yorumlamalı?</h3>
<p>CO₂ absorbanında A–E bileşikleri saptanmıştır; yalnız A ve daha az toksik olan B analiz edilebilecek miktardadır. [[K3 s. 131]] Özellikle kuruyken KOH temelli absorbanlar NaOH temellilerden daha fazla ürün oluşumunu destekler. [[K3 s. 131]] Reaksiyonun iki gözlenebilir işareti ısı açığa çıkması ve sevofluran tüketimidir. [[K3 s. 131]]</p>
<ul><li><b>Hayvan deneyi.</b> Üç saatlik 300–400 ppm A bileşiği maruziyeti sıçanların %50’sinde öldürücüdür. [[K3 s. 131]]</li>
<li><b>İnsana uyarlama.</b> Hayvan verilerinden tahmin edilen insan nefrotoksisite eşiği 150–200 ppm’dir. [[K3 s. 131–132]]</li>
<li><b>Düşük akım gözlemi.</b> Beş saat boyunca 0,25 L·dk⁻¹ akımda bile doruk düzeyin 20 ppm altında kaldığını ve anormal böbrek işlev testleriyle ilişki bulunmadığını düşündüren çalışmalar vardır. [[K3 s. 132]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a09e-halo">
<h2>Halotan: hangi karaciğer hasarı?</h2>
<p class="intro">Halotana bağlı transaminaz artışı genellikle subklinik ve geri dönüşümlüyken fulminan hepatik nekroz ayrı bir klinik tablodur. [[K3 s. 132]]</p>
${sekil('karaciger','Karaciğerde iki yol, iki farklı yorum','Şematik/nitel. Oksidatif metabolit ile hepatit arasındaki bağ olasıdır. [[K3 s. 132]]')}
<p>Fulminan halotan hepatitinin tanısı diğer karaciğer hasarı nedenleri dışlanarak konur. [[K3 s. 132]] Çocuklarda sıklık 80 000–200 000’de 1, erişkinlerde 2 500–35 000’de 1, mortalite %50–75’tir. [[K3 s. 132]]</p>
<div class="cols">${kart('Sunum ve kullanım',[
'Işıkta kararsız olan bu halojenli hidrokarbon bazı metalleri aşındırır; serbest brom çıkışını önlemek için %0,01 timolle saklanır. [[K3 s. 132]]',
'Kauçukta çözünmesi nedeniyle vaporizatör kapatıldıktan sonra devreye sızabilir. [[K3 s. 132]] Sınırlı özel kullanımları sürse de yerini büyük ölçüde sevofluran almıştır. [[K3 s. 132]]',
'Tatlı ve irritan olmayan kokusu indüksiyona uygundur; yüksek konsantrasyonda dakika ventilasyonu belirgin azalır. [[K3 s. 132]] Belirgin bronkodilatasyonu astımda yararlıdır. [[K3 s. 132]]'
])}${kart('Kalp, beyin ve karaciğer',[
'Artan vagal tonus ve doğrudan miyokard depresyonu kardiyak debiyi düşürür. [[K3 s. 132]] Endojen ve ekzojen katekolaminlere duyarlılaşma nedeniyle adrenalinli lokal anesteziklerde dikkat gerekir. [[K3 s. 132]]',
'Serebral kan akımını en fazla artıran volatil ajandır; 0,6 MAK üzerinde intrakraniyal basınç belirgin yükselirken serebral oksijen gereksinimi azalır. [[K3 s. 132]]',
'Hepatit risk faktörleri çoklu maruziyet, obezite, orta yaş ve kadın cinsiyettir. [[K3 s. 132]] Önceki üç ayda halotan verilmişse, önceki maruziyette olumsuz reaksiyon veya mevcut karaciğer hastalığı varsa halotandan kaçınılır. [[K3 s. 132]]',
'Enfluranla da hepatik nekroz bildirilmiştir; metabolizma daha az olduğundan sıklığı çok düşüktür. [[K3 s. 132–133]] Daha da az metabolize olan diğer volatil ajanlarda benzer reaksiyon teorik olarak mümkün, ancak daha düşük olasılıklıdır. [[K3 s. 133]]'
])}</div>
</section>
<section class="wrap blk ders-sec" id="a09e-eter">
<h2>Enfluran ve desfluran: klinik kullanımı ne sınırlar?</h2>
<p class="intro">Enfluranda florür oluşumu böbrek işlevi açısından önem taşırken desfluranın yüksek uçuculuğu vaporizatör seçimini belirler. [[K3 s. 133]]</p>
${sekil('eter','Ajandan uygulamaya','Şematik/nitel. Ajan seçildiğinde belirleyici özellik ve klinik sonuç değişir. [[K3 s. 133]]')}
<p>Desfluranın hazırlanması ve uygulanmasındaki güçlükler anesteziye girişini geciktirmiştir. [[K3 s. 133]] Kan:gaz katsayısının 0,42 olması hızlı başlangıç ve sonlanma sağlar; kitap bu nedenle uzun cerrahilerde ve bariatrik cerrahide tercih edildiğini aktarır. [[K3 s. 133]]</p>
<div class="cols">${kart('Enfluran',[
'İzofluranla yapısal izomer olan bu halojenli etil metil eter yerini başka ajanlara bırakmıştır. [[K3 s. 133]]',
'Yüksek konsantrasyonda EEG’de grand mal aktivitesiyle uyumlu 3 Hz diken-dalga görülür. [[K3 s. 133]]'
])}${kart('Desfluran',[
'Florlu etil metil eterdir; sera gazı etkisi sevofluran ve izofluranınkinden belirgin fazladır. [[K3 s. 133]]',
'Solunumu halotandan daha güçlü, izofluran ve enflurandan daha zayıf baskılar. [[K3 s. 133]] Konsantrasyon yükseldikçe dakika ventilasyonu azalır ve PaCO₂ artar. [[K3 s. 133]] Keskin kokusu öksürük ve nefes tutmaya neden olduğundan indüksiyona uygun değildir. [[K3 s. 133]]',
'Dolaşım etkileri izoflurana benzer, ancak 1 MAK üzerinde taşikardi ve hipertansiyon gelişebilir; iskemik kalp hastalığında dikkat gerekir. [[K3 s. 133]] Kalbi katekolaminlere duyarlılaştırmaz, serebral ve koroner damar direncini azaltır. [[K3 s. 133]]',
'Yalnız %0,02’si metabolize olduğundan toksik etki potansiyeli çok düşüktür. [[K3 s. 133]]'
])}</div>
</section>
<section class="wrap blk ders-sec" id="a09e-p1"><h2>Part I · Çoklu doğru/yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div data-viz="mtf" data-q="far09e-1"></div><div data-viz="mtf" data-q="far09e-2"></div><div data-viz="mtf" data-q="far09e-3"></div></section>
<section class="wrap blk ders-sec" id="a09e-p2"><h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><h3>Açılış sorusu</h3><p>N₂O ile birlikte bir volatil ajan verildiğinde alveoler gaz bileşimi nasıl değişir? İndüksiyon, anestezinin sonlandırılması ve uzun N₂O maruziyeti açısından sonuçlarını açıklayın.</p></div>
<h3>Cevap iskeleti</h3>
<ol class="iskelet">
<li><b>Gradyan.</b> Yüksek inspire N₂O fraksiyonu kapillere hızlı alımı sağlar. [[K3 s. 125]]</li>
<li><b>Hacmin tamamlanması.</b> Hava yolundan alveole gaz çekilir; yüksek N₂O fraksiyonunda FA/FI aynı anda daha büyüktür. [[K3 s. 124–125]]</li>
<li><b>İkinci gaz.</b> O₂ ve eşlik eden volatil ajan yoğunlaşır; indüksiyon süresi kısalır. [[K3 s. 125–126]]</li>
<li><b>Geri dönüş.</b> Havaya geçişte alveole dönen N₂O, O₂’yi seyreltir; %100 O₂’ye geçiş difüzyon hipoksisini önler. [[K3 s. 126]]</li>
<li><b>Maruziyet.</b> B₁₂’deki kobaltın oksidasyonu metiyonin sentetaz etkinliğini ve DNA sentezini azaltır; kemik iliğinde megaloblastik değişiklikler görülebilir. [[K3 s. 126]]</li></ol>
<div class="note"><b>Çizin.</b> Alveol ile kapiller arasında indüksiyondaki ve sonlandırmadaki N₂O akımını karşılıklı iki çizimde gösterin; alveolde O₂ değişiminin yönünü işaretleyin. [[K3 s. 125–126]]</div>
<h3>Olası ek sorular</h3><ul><li>N₂O tüpünün içeriği neden basınçtan okunamaz? [[K3 s. 124]]</li><li>Entonox ayrışırsa tüp boşalırken analjezi ve oksijen sunumu nasıl değişir? [[K3 s. 127–128]]</li><li>Sevofluranda hepatik florür üretimini absorbandaki A bileşiği oluşumundan nasıl ayırırsınız? [[K3 s. 131–132]]</li></ul>
</section>
<section class="wrap blk ders-sec" id="a09e-ozet"><h2>Özet</h2><ul class="ozet">
<li>N₂O alımı ikinci gazı yoğunlaştırır; anestezi sonunda alveole geri dönen N₂O ise gazları seyreltir. [[K3 s. 125–126]]</li>
<li>N₂O’nun B₁₂’yi etkisizleştirmesi metiyonin ve DNA sentezini azaltır. [[K3 s. 126]]</li>
<li>Ayrışmış Entonox tüpünden önce O₂ ağırlıklı, sonunda N₂O bakımından zengin ve hipoksik gaz gelir. [[K3 s. 128]]</li>
<li>İzofluranda sistemik damar direnci düşer ve refleks taşikardi gelişir; sevofluranda basınç düşerken hız değişmez. [[K3 s. 128]] [[K3 s. 131]]</li>
<li>Halotanda oksidatif metabolit hepatit mekanizmasıyla, enfluranda florür geri dönüşümlü nefropatiyle ilişkilidir. [[K3 s. 132–133]]</li>
<li>Desfluran hızlı derlenme sağlar; keskin kokusu indüksiyonu, düşük kaynama noktası klasik vaporizatör kullanımını sınırlar. [[K3 s. 133]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="09e"></div>
<nav class="ders-gec"><a href="#/dersler/farmakoloji/09d">← 09d · İnhalasyon ajanları: MAK, fiziksel özellikler ve kinetik</a><a href="#/dersler/farmakoloji/09f">Sonraki: 09f · Ksenon ve anestezik olmayan tıbbi gazlar →</a></nav></section>`
  };
})();
