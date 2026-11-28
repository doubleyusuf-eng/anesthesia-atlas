VERI.sorular = VERI.sorular || {};
(function () {
  'use strict';
  const mtf = (no, kok, kaynak, onermeler) => ({
    no, kok, kaynak, kagit: 'Paper A · Fizik ve klinik ölçüm',
    onermeler: onermeler.map(([t, d, n]) => ({ t, d, n })),
  });
  VERI.sorular['fk29-1'] = mtf(1, 'Ölçüm ve araştırma tasarımı', '[[K6 s. 452–455]]', [
    ['Yanlış kalibrasyon rastgele hataya örnektir.', false, 'Yanlış kalibrasyon sonuçları aynı yönde kaydırabilir ve sistematik hataya yol açar. [[K6 s. 453]]'],
    ['Kesitsel araştırmayla prevalans ölçülebilir.', true, 'Belirli bir anda hastalığı olanlarla olmayanlar aynı popülasyonda sayılır. [[K6 s. 454]]'],
    ['Olgu-kontrol çalışması genel insidansı doğrudan verir.', false, 'Katılımcılar sonuçlarına göre seçildiğinden genel insidans bu verilerden hesaplanamaz. [[K6 s. 454]]'],
    ['Kohort çalışması nadir bir maruziyetin etkisini incelemeye elverişlidir.', true, 'Maruziyet geçiren grup zaman içinde izlenebilir. [[K6 s. 454]]'],
    ['Medyan, en sık karşılaşılan değerdir.', false, 'En sık değer moddur, medyan ise sıralanmış verinin ortasındadır. [[K6 s. 453]]'],
  ]);
  VERI.sorular['fk29-2'] = mtf(2, 'Veri türü ve dağılım', '[[K6 s. 457–462]]', [
    ['ABO kan grubu nominal bir değişkendir.', true, 'Kan grupları birbirini dışlar ve büyüklük sırasına konmaz. [[K6 s. 457]]'],
    ['Normal dağılım tek tepelidir.', true, 'Gauss eğrisi ortalama çevresinde simetrik bir çan oluşturur. [[K6 s. 459–460]]'],
    ['Standart sapma varyansın karesidir.', false, 'Standart sapma varyansın kareköküdür. [[K6 s. 460]]'],
    ['Pozitif çarpıklıkta uzun kuyruk sağdadır.', true, 'Pozitif çarpık dağılım büyük değerler yönüne uzanır. [[K6 s. 459]]'],
    ['Spearman katsayısı sıralara dayalı korelasyonu ölçer.', true, 'K6, Pearson korelasyonunun parametrik olmayan karşılığı olarak Spearman sıra korelasyonunu verir. [[K6 s. 462]]'],
  ]);
  VERI.sorular['fk29-3'] = mtf(3, 'Karar hataları ve klinik öngörü', '[[K6 s. 463–465]] [[K6 s. 471–472]]', [
    ['Gücü düşük bir çalışmada fark saptanmaması farkın bulunmadığını kanıtlamaz.', true, 'Çalışma klinik açıdan önemli bir farkı kaçırmış olabilir. [[K6 s. 465]]'],
    ['Gerçek bir farkı gözden kaçırmak tip I hatadır.', false, 'Var olan farkı saptayamamak tip II hata, yani yanlış negatif karardır. [[K6 s. 463–464]]'],
    ['Güç, birden tip II hata olasılığının çıkarılmasıyla bulunur.', true, 'β = 0,2 seçilirse güç 1 − 0,2 = 0,8 olur. [[K6 s. 464]]'],
    ['Pozitif öngörü değerinin paydası tüpünü çeken bütün hastalardır.', false, 'Pozitif öngörü değeri test pozitifleri içinde tüpünü çekenlerin payıdır. [[K6 s. 471–472]]'],
    ['Deliryum örneğinde beş hasta yanlış negatiftir.', true, 'Devirde deliryum saptanmayan beş hasta gece tüpünü çekmiştir. [[K6 s. 471]]'],
  ]);

  const nav = [
    ['olcum','Ölçüm'], ['tasarim','Tasarım'], ['sonuc','Sonlanım'], ['kanit','Kanıt'],
    ['veri','Veri'], ['normal','Dağılım'], ['karar','Hipotez'], ['guc','Güç'],
    ['inhaler','İnhaler'], ['sprey','Sprey'], ['kulak','Korelasyon'], ['tup','Tanı testi'],
    ['p1','Part I'], ['p2','Part II'], ['ozet','Özet'],
  ];
  const sekil = (ad, baslik, alt) => `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="fk29_${ad}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${alt}</p></div>`;
  const kart = (baslik, metin) => `<article class="card fk29-kart"><h3>${baslik}</h3><p>${metin}</p></article>`;
  const not = metin => `<aside class="card fk29-not"><strong>Atlas notu</strong><p>${metin}</p></aside>`;
  SAYFALAR['dersler/fizik/29'] = {
    grup: 'dersler', eyebrow: 'Fizik · Bölüm 29', baslik: 'İstatistik',
    lede: 'İstatistik, ham veriyi içerdiği bilgiyi koruyarak özetler. [[K6 s. 452]] Bir sonucun nasıl yorumlanacağı, ölçümün nasıl yapıldığına, araştırmanın tasarımına ve veriye uygun testin seçimine bağlıdır. [[K6 s. 452–453]] [[K6 s. 457]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="fk29-${id}"><span>${i + 1}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="fk29-olcum">
<h2>Bir ölçüm ne kadar güvenilir?</h2>
<p class="intro">Belirsizlik, ölçülen büyüklüğün değerinin bulunabileceği aralığı anlatır. [[K6 s. 452]] Hata ise elde edilen sonucun doğru ya da kabul edilen değerden sapmasıdır. [[K6 s. 452]]</p>
${sekil('hata','Tekrarlı ölçümler referansa göre nerede toplanıyor?','Noktalar tek tek ölçümleri, dikey çizgi kabul edilen değeri temsil eder. [[K6 s. 452–453]]')}
<p>Tek bir sonuçta sapmayı görmek, kaynağını anlamaya yetmez. [[K6 s. 452–453]] Tekrarlı ölçümlerde hem sonuçların birbirinden ne kadar ayrıldığına hem de grubun referansa göre konumuna bakılır. [[K6 s. 453]]</p>
<div class="fk29-izgara">
${kart('Rastgele hata','Gözlemler doğru değerin iki yanına öngörülemez biçimde dağılır. [[K6 s. 453]] Yalnız rastgele hata varsa çok sayıda ölçümün dağılımı doğru değer çevresinde merkezlenir. [[K6 s. 453]] Uygulayıcının işlemi her seferinde farklı yapması, cihazın düşük çözünürlüğü ve veri kaydındaki hatalar buna örnektir. [[K6 s. 453]]')}
${kart('Sistematik hata','Ölçüm doğru değerden belirli bir miktarda ve aynı yönde sapar. [[K6 s. 453]] Kalibrasyonu bozuk bir cihaz ya da kablodaki sinyal kaybının tam hesaba katılmaması buna yol açabilir. [[K6 s. 453]] Ölçümü tekrarlamak bu ortak kaymayı gidermez. [[K6 s. 453]]')}
</div>
<h3>Tipik değeri seçmek</h3>
<ul class="ozet"><li><b>Aritmetik ortalama.</b> Örneklemdeki tüm değerleri toplayıp gözlem sayısına bölün: x̄ = Σxᵢ / n. [[K6 s. 453]] Burada xᵢ tek ölçümü, n gözlem sayısını gösterir ve sonuç ölçümle aynı birimdedir. [[K6 s. 453]]</li>
<li><b>Mod.</b> Değerlerin sıklıklarını karşılaştırın ve en çok tekrarlananı seçin. [[K6 s. 453]] Veriler aralıklarda toplanmışsa en sık gözlenen dar aralık da modu gösterebilir. [[K6 s. 453]]</li>
<li><b>Medyan (ortanca).</b> Ölçümleri küçükten büyüğe sıraladığınızda diziyi iki yarıya bölen merkez değeri bulun. [[K6 s. 453]] Bu seçimde belirleyici olan gözlemlerin sırasıdır. [[K6 s. 453]]</li></ul>
<h3>Bir monitörün çıktısını nasıl tarif edersiniz?</h3>
<p>Kablo boyunca oluşan ve hesaba katılmayan sinyal kaybını düşünün. [[K6 s. 453]] Aynı giriş tekrar verildiğinde sonuçların birbirine yakın çıkması, ölçümlerin kabul edilen değere de yakın olduğunu tek başına göstermez. [[K6 s. 453]] Ölçümlerin merkezini referansla karşılaştırmak, ortak yönlü sapmayı görünür kılar. [[K6 s. 453]]</p>
<p>Şimdi aynı işlemin her defasında biraz farklı yapıldığını düşünün. [[K6 s. 453]] Bu kez tek bir okumaya bakmak yerine ölçümlerin referansın iki yanındaki dağılımını değerlendirin. [[K6 s. 453]] Bir ortalama bütün ölçümleri tek değerde özetlerken ölçümlerin tek tek birbirinden ne kadar ayrıldığını ayrıca belirtmek gerekir. [[K6 s. 453]] [[K6 s. 460]]</p>
</section>

<section class="wrap blk ders-sec" id="fk29-tasarim">
<h2>Araştırma hangi noktadan başlıyor?</h2>
<p class="intro">Önce araştırmanın amacını ve ilgilenilen sonucu belirleyin. [[K6 s. 453]] Aynı sonuç farklı tasarımlarla incelenebilir, ancak her tasarım aynı soruyu yanıtlayamaz. [[K6 s. 453–455]]</p>
${sekil('tasarim','Başlangıçtan sonuca giden yolu seçin','Oklar araştırmacının bilgiyi izlediği yönü gösterir. [[K6 s. 454–455]]')}
<p>Gözlemsel çalışmada araştırmacı bir kesiti, olgularla kontrolleri ya da bir kohortu inceler. [[K6 s. 453–454]] Deneysel çalışmada müdahaleyi araştırma tasarımı belirler. [[K6 s. 455]] Tasarımın gücü kadar bütçe, diğer kaynaklar ve etik kurulun görüşü de uygulanacak yöntemi etkiler. [[K6 s. 453]] Bu nedenle uygulamadaki tasarım idealden uzak kalabilir. [[K6 s. 453]]</p>
<div class="fk29-izgara">
${kart('Kesitsel • Bugün kimde var?','Tanımlayıcı çalışma veya prevalans araştırması, tanımlı bir topluluğun tek andaki görünümünü verir. [[K6 s. 454]] Hastalığı olanların sıklığı aynı anda kaydedilen yaş ve cinsiyet gibi özelliklerle karşılaştırılabilir. [[K6 s. 454]] Bu ilişkiler, başka bir tasarımla sınanacak hipotezler doğurabilir. [[K6 s. 454]]')}
${kart('Olgu-kontrol • Geçmişte ne olmuştu?','Hastalığı ya da işlemi geçirmiş olgularla aynı kaynak topluluktan seçilen, bu özelliği taşımayan kontroller karşılaştırılır. [[K6 s. 454]] Geriye dönük inceleme az kişiyle yürütülebilir ve nadir hastalıklara uygundur. [[K6 s. 454]] Kohorta göre daha hızlı ve genellikle daha ucuzdur. [[K6 s. 454]] Uygun olgu ve kontrol seçimi güçtür ve bu seçimden toplumun genel insidansı hesaplanamaz. [[K6 s. 454]]')}
${kart('Kohort • Maruziyetten sonra ne gelişti?','Genellikle ileriye dönüktür: ilaca veya işleme maruz kalan kişiler izlenir, hastalanan ya da iyileşenlerin özellikleri belirlenir. [[K6 s. 454]] Yeni hastalıkların insidansı doğrudan hesaplanabilir ve nadir bir maruziyetin etkisi araştırılabilir. [[K6 s. 454]] Geniş bir topluluğu uzun süre izlemek güç ve pahalıdır, nedensel ilişkiyi göstermek de zor olabilir. [[K6 s. 454]]')}
${kart('Randomize kontrollü çalışma • Müdahale neyi değiştirdi?','Gözlemsel bir bulgu, bir müdahalenin deneysel olarak sınanmasına yol açabilir. [[K6 s. 455]] Katılımcılar çoğunlukla müdahale ile kontrol (plasebo) gruplarına rastgele atanır. [[K6 s. 455]] Rastgele atama karıştırıcı değişkenlerin sonuca etki etme olasılığını azaltır. [[K6 s. 455]] İyi tasarlanmış bir çalışma neden-sonuç ilişkisi için en güçlü kanıtı sağlar. [[K6 s. 454–455]]')}
</div><h3>Nadir olan hastalık mı, maruziyet mi?</h3>
<p>Hastalık nadirse olguları doğrudan bulmak ve aynı topluluktan kontroller seçmek, çok sayıda insanı hastalık gelişene kadar izleme gereğini azaltır. [[K6 s. 454]] Bunun bedeli, incelemenin hastalık durumuna göre seçilmiş iki grupla sınırlanmasıdır. [[K6 s. 454]] Olgu sayısının çalışmadaki toplam kişi sayısına bölünmesi toplumdaki yeni hastalık hızını vermez. [[K6 s. 454]]</p>
<p>Maruziyet nadirse hareket noktası değişir: maruziyeti geçirmiş kişileri bulup sonrasında kimlerin hastalandığını izleyebilirsiniz. [[K6 s. 454]] İzlenen grubun içinden yeni olgular çıktığı için insidans doğrudan değerlendirilebilir. [[K6 s. 454]] Bir maruziyetten sonra hastalık görülmesi ise tek başına o maruziyetin hastalığın nedeni olduğunu kanıtlamaya yetmeyebilir. [[K6 s. 454]]</p>
</section>

<section class="wrap blk ders-sec" id="fk29-sonuc">
<h2>Sonlanımı tanımlamak ve ölüm oranını okumak</h2>
<p class="intro">Sağlık hizmetinin kalitesi ve etkinliği, önceden tanımlanan bir sonuca ne ölçüde ulaşıldığıyla değerlendirilebilir. [[K6 s. 455]] Aynı müdahalenin hasta, hastane ve maliyet açısından sonuçları farklı ölçüler gerektirebilir. [[K6 s. 455]]</p>
${sekil('olum','Aynı ölüm sayılarını iki ölçekte okuyun','Gözlenen ve beklenen ölümler kişi sayısıdır, oran birimsizdir. [[K6 s. 455]]')}
<ul class="ozet"><li><b>Biyomedikal ölçüler.</b> Vücut ağırlığı veya baş çevresi doğrudan ölçülebilir. [[K6 s. 455]]</li>
<li><b>Hastanın deneyimi.</b> Algılanan sağlık düzelmesi, memnuniyet, ağrı veya rahatsızlık puanı ölçülebilir. [[K6 s. 455]]</li>
<li><b>Klinik ve ekonomik sonuçlar.</b> Tedavinin yan etkileri, morbidite veya mortalitede azalma, tedavi maliyeti ve yatış süresi izlenebilir. [[K6 s. 455]]</li></ul>
<p>Sonlanım verileri araştırmacıların değerlendirmelerini ve uygulayıcıların geri bildirim almasını sağlar. [[K6 s. 455]] Sürekli kalite iyileştirmesinde hangi uygulamaların işe yaradığını göstererek kanıta dayalı rehberlerin zaman içinde geliştirilmesine yardım eder. [[K6 s. 455]]</p>
<div class="fk29-izgara">
${kart('Risk ve tedavi için gereken sayı (NNT)','Risk bir olayın gerçekleşme olasılığıdır. [[K6 s. 455]] Risk faktörü, belirli bir hastalığın gelişme olasılığındaki artışla ilişkilidir. [[K6 s. 455]] NNT, bir olumsuz sonlanımı önlemek için müdahale uygulanması gereken hasta sayısıdır ve müdahalenin etkinliğini hasta sayısıyla ifade eder. [[K6 s. 455]]')}
${kart('Standartlaştırılmış mortalite oranı (SMR)','SMR = gözlenen ölüm sayısı / beklenen ölüm sayısı. [[K6 s. 455]] Beklenen ölümleri bulurken geniş referans topluluğundaki yaşa ve cinsiyete özgü ölüm hızları, incelenen grubun yaş ve cinsiyet dağılımına göre değerlendirilir. [[K6 s. 455]]')}
${kart('Hastane standartlaştırılmış mortalite oranı (HSMR)','HSMR = 100 × hastanede gözlenen ölüm sayısı / beklenen ölüm sayısı. [[K6 s. 455–456]] Pek çok ülkede hastane bakımını taramak için kullanılır. [[K6 s. 456]] Yalnız elektif hasta kabul eden bir hastane ile travma nedeniyle birden çok bakım dönemi geçiren hastaları izleyen bir hastanenin olgu bileşimi yorumu güçleştirebilir. [[K6 s. 456]]')}
</div><p>Sonlanımı açıklarken hastada neyin ölçüldüğünü, sonuç karşılaştırmasını açıklarken hangi verilerin birlikte kullanıldığını belirtin. [[K6 s. 455]] NNT ile ilgileniliyorsa soru, olumsuz bir sonucu önlemek için kaç hastaya müdahale gerektiğidir. [[K6 s. 455]] Standartlaştırılmış ölüm oranıyla ilgileniliyorsa aynı popülasyondaki gözlenen ölümler, o yaş ve cinsiyet dağılımında beklenen ölümlerle karşı karşıya getirilir. [[K6 s. 455]]</p>
<h3>Bir hastanenin ölüm sayısı nasıl karşılaştırılır?</h3>
<ol class="ozet"><li>Önce gözlenen sayının hangi hasta grubuna ait olduğunu tanımlayın. [[K6 s. 455–456]] Hastane göstergesinde sayılan olay, hastane içinde gerçekleşen ölümdür. [[K6 s. 455]]</li>
<li>Referans topluluğun yaşa ve cinsiyete göre ölüm hızlarını kullanarak incelenen hasta dağılımına karşılık gelen beklenen sayıyı bulun. [[K6 s. 455]] Payda genel toplulukta gerçekleşen bütün ölümlerin sayısı değildir. [[K6 s. 455]]</li>
<li>Gözlenen ve beklenen sayılar eşitse bölüm 1 olur, hastane ölçeğindeki karşılığı 100’dür. [[K6 s. 455]] Gözlenen sayı beklenenden yüksekse oran yükselir, ancak hastanelerin kabul ettiği hasta tipleri farklıysa bunun bakım kalitesi açısından yorumu güçleşir. [[K6 s. 455–456]]</li></ol>
</section>

<section class="wrap blk ders-sec" id="fk29-kanit">
<h2>Ayrı çalışmalardan ortak bir etki tahminine</h2>
<p class="intro">Sistematik derleme, aynı sağlık sorununu inceleyen çalışmaları kapsamlı bir aramayla bulur ve bilgiyi belirli bir yöntemle bir araya getirir. [[K6 s. 456]] Meta-analiz, bu derlemenin bulgularını sayısal olarak birleştirmede kullanılabilecek araçlardan biridir. [[K6 s. 456]]</p>
${sekil('kanit','Araştırma sorusundan etki tahminine','Birleştirilen sonuçlar bağımsız çalışmalardan gelir. [[K6 s. 456]]')}
<p>Meta-analiz birden çok çalışmanın sonuçlarından tek bir genel etki tahmini üretir. [[K6 s. 456]] Çok miktarda veriyi özetler, tek bir çalışmadaki hatanın ağırlığını azaltabilir ve ilgilenilen etkiyi saptama gücünü artırabilir. [[K6 s. 456]] Yeni bir çalışmaya gerek kalmazsa zaman ve maliyet azalabilir. [[K6 s. 456]] Birleşik sonuç yine de yanlılık içerebilir. [[K6 s. 456]]</p>
<p>1990’larda gelişen kanıta dayalı tıp, kişisel görüş ve tekil deneyime dayanan kararlar karşısında araştırma bulgularını sistematik biçimde değerlendirmeyi öne çıkardı. [[K6 s. 456]] Cochrane Collaboration veri tabanlarındaki sistematik derlemelerden yararlanır ve klinik kanıtları yanlılıktan ne ölçüde korunduklarına göre sıralar. [[K6 s. 456]]</p>
<h3>Kitaptaki NHS ve Oxford kanıt düzeylerini birlikte okuyun</h3>
<p>Kitabın aktardığı Birleşik Krallık NHS sınıflaması A–D harflerini, Oxford Kanıta Dayalı Tıp Merkezi ise en güçlüden en zayıfa 1–5 düzeylerini kullanır. [[K6 s. 456–457]]</p>
<div class="fk29-izgara">
${kart('A • Tutarlı düzey 1','Tutarlı randomize kontrollü klinik araştırmalar, kohort çalışmaları ve farklı topluluklarda doğrulanmış klinik karar kuralları bu başlıkta verilir. [[K6 s. 456–457]] Kitap A satırında ayrıca “none” ifadesini kullanır. [[K6 s. 456]]')}
${kart('B • Tutarlı düzey 2 veya 3','Tutarlı retrospektif kohortlar, keşif amaçlı kohortlar, ekolojik araştırmalar, sonlanım araştırmaları ve olgu-kontrol çalışmaları örnektir. [[K6 s. 456]] A düzeyinden, Oxford karşılığıyla düzey 1’den, yapılan çıkarımlar da B kapsamındadır. [[K6 s. 456–457]]')}
${kart('C • Düzey 4','Olgu serileri veya B düzeyindeki çalışmalardan yapılan çıkarımlardır. [[K6 s. 456]] Oxford karşılığı, düzey 4 çalışmalar veya düzey 2–3 bulgulardan yapılan çıkarımlardır. [[K6 s. 457]]')}
${kart('D • Düzey 5','Açık eleştirel değerlendirme içermeyen uzman görüşü, fizyoloji, laboratuvar araştırması veya temel ilkelerden akıl yürütme bu gruptadır. [[K6 s. 456]] Herhangi bir düzeyde ciddi biçimde tutarsız ya da sonuca ulaştırmayan çalışmalar da D sayılabilir. [[K6 s. 457]]')}
</div><h3>Bir derlemenin sonucunu okurken</h3>
<p>Önce hangi sağlık sorusunun araştırıldığını ve bu soruyla ilgili çalışmaların ne ölçüde kapsamlı arandığını değerlendirin. [[K6 s. 456]] Sonra okuduğunuz sonucun ayrı bir klinik çalışmanın tahmini mi, bağımsız çalışmaların birleşik tahmini mi olduğunu ayırt edin. [[K6 s. 456]] Birleştirme işlemi daha çok bilgiyi tek sonuçta toplayabilir, ancak başlangıçtaki araştırmaların yanlılığını kendiliğinden ortadan kaldırmaz. [[K6 s. 456]]</p>
<p>Kanıt düzeyini yorumlarken yalnız çalışma türünün adına bakmak yeterli olmayabilir: kitabın sınıflamasında sonuçların tutarlılığı ve bulgunun doğrudan mı yoksa başka çalışmalardan çıkarımla mı elde edildiği de önemlidir. [[K6 s. 456–457]] Örneğin tutarlı düzey 1 bulgular A iken aynı düzeyden yapılan bir çıkarım B’ye yerleştirilir. [[K6 s. 457]]</p>
</section>

<section class="wrap blk ders-sec" id="fk29-veri">
<h2>Veriye hangi soru sorulabilir?</h2>
<p class="intro">İstatistiksel test seçiminde önce kaydın neyi temsil ettiği belirlenir. [[K6 s. 457]] Bir sayının ağırlığı mı, bir sıralamayı mı yoksa yalnızca bir kategoriyi mi gösterdiği, o sayıdan çıkarılabilecek sonucu değiştirir. [[K6 s. 457–458]]</p>
${sekil('veri','Ölçüm, sayım, sıra veya kategori','Ağrı yüzleri örneğinde sayılar çocuğun seçtiği sıralı kategorileri belirtir. [[K6 s. 457–458]]')}
<div class="fk29-izgara">
${kart('Nicel • Sürekli veya kesikli','Metre cinsinden uzunluk sürekli bir büyüklüktür ve alabileceği değerler tam sayılarla sınırlı değildir. [[K6 s. 457]] Yıllık izin günü gibi sayımlar ise kesiklidir ve yalnız tam sayı değerler alır. [[K6 s. 457]] Nicel veride aritmetik oran anlamlıdır: 120 kg, 40 kg’ın üç katıdır. [[K6 s. 457]]')}
${kart('Nitel • Nominal veya ikili','Nominal değişkende kategoriler birbirini dışlar ve aralarında büyüklük sırası yoktur. [[K6 s. 457]] ABO kan grubu ve kitapta verilen kadın/erkek sınıflaması örnektir. [[K6 s. 457]] Dikotom değişken yalnız iki seçenek alır: evet/hayır veya sağ/ölü. [[K6 s. 458]]')}
${kart('Nitel • Ordinal','Birbirini dışlayan kategoriler sıralıdır, fakat kategori numaraları arasındaki uzaklık ölçülmüş bir büyüklük değildir. [[K6 s. 457–458]] Wong–Baker yüzlerinde çocuk ağrısına en uygun yüzü, açıklamasını ve karşılık gelen 0–5 puanını seçer. [[K6 s. 457]] Yeni bir lokal anestezikle ortalama puanın 4’ten 2’ye inmesi iki puanlık azalmadır, ağrıda %50 azalma anlamına gelmez. [[K6 s. 457–458]]')}
</div>
<h3>Ham veriden grafiğe</h3>
<p>Tablo, elektronik çizelge veya veri tabanı ölçümlerin saklanmasını, geri çağrılmasını ve analiz edilmesini kolaylaştırır. [[K6 s. 458]] Çok sayıda gözlemi okunabilir hâle getirecek grafik, dağılım tanındıktan sonra daha kolay seçilir. [[K6 s. 458–459]]</p>
<ul class="ozet"><li>Histogram sıklıkların dağılımını, saçılım grafiği iki değişken arasındaki ilişkiyi gösterir. [[K6 s. 458–459]]</li>
<li>Pasta grafiği parçaların bütün içindeki göreli payını, çubuk grafik kategorilere ait büyüklükleri görselleştirir. [[K6 s. 458]]</li>
<li>Kutu-bıyık grafiğinde aralık ve medyan birlikte okunur. [[K6 s. 458–459]] Alt çeyreğin altında gözlemlerin %25’i, üst çeyreğin üstünde yine %25’i yer alır. [[K6 s. 458]]</li>
<li>Bir dağılımın tek, iki veya çok tepesi olabilir. [[K6 s. 459]] Simetrik dağılımın iki yanı birbirini dengelerken pozitif çarpıklıkta uzun kuyruk sağa, negatif çarpıklıkta sola uzanır. [[K6 s. 459]]</li></ul>
<h3>Grafiği okumaya nereden başlamalı?</h3>
${sekil('dagilim','Tepe sayısı ile kuyruğun yönünü ayrı ayrı inceleyin','Sütun yükseklikleri dağılım biçimini anlatan şematik sıklıklardır. [[K6 s. 458–459]]')}
<p>Önce en sık değerlerin bir bölgede mi yoksa ayrı bölgelerde mi toplandığına bakın. [[K6 s. 453]] [[K6 s. 459]] Tek tepeli örnekte bir baskın bölge görülür, iki tepeli örnekte iki ayrı bölge öne çıkar. [[K6 s. 459]] Ardından tepeden uçlara doğru ilerleyin ve daha seyrek gözlemlerin hangi yönde uzandığını belirleyin. [[K6 s. 459]] Çarpıklığa adını veren, yüksek sütunların toplandığı taraf değil kuyruğun yönüdür. [[K6 s. 459]]</p>
<p>Saçılım grafiğine geçildiğinde artık başka bir soru sorulur: bir kişide ölçülen iki özelliğin değerleri birlikte nasıl değişmektedir? [[K6 s. 458]] [[K6 s. 469–470]] Kulak uzunluğu çalışmasında her kişinin yaşı ile ona ait düzeltilmiş kulak ölçümü aynı gözlemin iki bileşenidir. [[K6 s. 469–470]] Bir kutu-bıyık grafiği ise bir değişkenin aralığını ve sıralamadaki belirli konumlarını özetler. [[K6 s. 458–459]]</p>
${sekil('kutu','Kutu ve bıyıkların hangi bölümü neyi gösterir?','Yatay konumlar şematiktir; bu çizim belirli bir hasta örnekleminin ölçümlerini içermez. [[K6 s. 458–459]]')}
<p>Grafiğin uçlarından başlayarak en küçük ve en büyük ölçümü, sonra kutunun iki kenarından alt ve üst çeyrekleri okuyun. [[K6 s. 458–459]] Kutu içindeki çizgi ortancayı verir; bu çizgi ile kutunun geometrik ortasını aynı kabul etmeyin. [[K6 s. 453]] [[K6 s. 458–459]] Çeyrekler, mutlak ölçü değerinden önce o değerin sıralanmış veri içindeki yerini anlatır. [[K6 s. 458]]</p>
</section>

<section class="wrap blk ders-sec" id="fk29-normal">
<h2>Normal dağılım ve test seçimi</h2>
<p class="intro">Normal ya da Gauss dağılımı, sürekli veriler için sık kullanılan, simetrik ve tek tepeli bir parametrik dağılımdır. [[K6 s. 459–460]] Merkezini ortalama (μ), yayılımını varyans (σ²) belirler. [[K6 s. 460]]</p>
${sekil('normal','Ortalamanın iki yanında hangi alan kalır?','Çan biçimi şematiktir, işaretlenen sınırlar ve kapsama yüzdeleri K6’daki normal dağılıma aittir. [[K6 s. 460–461]]')}
<p>Varyans, gözlemlerin ne kadar dağıldığını gösterir ve grupların farklı topluluklardan gelme olasılığını değerlendiren testlerde kullanılır, sonuçlara ne kadar güvenilebileceğine de işaret eder. [[K6 s. 460]] Standart sapma (SS), varyansın kareköküdür: σ = √σ². [[K6 s. 460]] Ölçümle aynı birimde ifade edildiğinden yayılımın yorumlanmasını kolaylaştırır. [[K6 s. 460]] SS büyüdükçe gözlemler daha geniş bir aralığa yayılır. [[K6 s. 460]]</p>
<p>Kitabın örneği, geniş bir topluluktaki Wechsler zekâ puanlarıdır. [[K6 s. 460–461]] Normal dağılımda gözlemlerin yaklaşık %68’i μ ± 1 SS içinde, yaklaşık %95’i μ ± 2 SS içinde, %99,7’si μ ± 3 SS içinde yer alır. [[K6 s. 460]] Daha kesin karşılıklar, ortadaki %95 için ±1,96 SS ve ±2 SS için yaklaşık %95,4’tür. [[K6 s. 460–461]] Böyle bir dağılımda bir gözlemin merkezî %95’lik sınırların dışına düşme olasılığı yaklaşık %5’tir; kitap bu aralığın dışındaki bir verinin incelenen topluluktan gelme olasılığını %5’ten küçük (p &lt; 0,05) sayar. [[K6 s. 460]]</p>
<div class="fk29-izgara">
${kart('Şekli okuyun • Gözlem mi, ortalama mı?','Çanın yatay ekseninde bir kişinin ölçülebilecek puanları yer alır. [[K6 s. 460–461]] Taralı alan genişletildiğinde ortalama yerinde kalır, kapsanan gözlemlerin oranı yükselir. [[K6 s. 460]] Örneğin merkezî %95 seçilirse gözlemlerin yaklaşık %5’i iki kuyruğa dağılır. [[K6 s. 460]]')}
${kart('Testi seçin • Eşleşme nerede?','Bağımsız iki örneklem için verilen t testi ile eşleştirilmiş t testi tabloda ayrı satırlardadır. [[K6 s. 461–462]] İnhaler çalışmasında aynı hastanın önceki ve sonraki ölçümü iyileşmeyi tanımlarken, ilaç ve plasebo kolları arasındaki karşılaştırma ayrı hasta gruplarının iyileşmelerini kullanır. [[K6 s. 466–467]]')}
</div>
<h3>Çan biçimi görülmüyorsa</h3>
<p>Olasılığın standart kurallarına uyan dağılım parametrik, uymayan dağılım parametrik olmayan diye adlandırılır. [[K6 s. 459–460]] Parametrik yöntemler, parametrik olmayan yöntemlere göre dağılım hakkında daha fazla varsayım gerektirir. [[K6 s. 459–460]] Varsayımlar sağlandığında daha doğru ve hassas sonuç verebilir, sağlanmadığında ise ciddi biçimde yanıltabilir. [[K6 s. 460]] Tıbbi araştırmalarda normal dağılıma uymayan verilerle sık karşılaşılır. [[K6 s. 460–461]]</p>
<ol class="ozet"><li>Dağılımın biçimine bakın ve ortalamanın iki SS altı ile üstünün ölçülen büyüklük için mümkün olup olmadığını sorgulayın. [[K6 s. 461]] Kolmogorov–Smirnov uyum iyiliği testi biçimsel bir değerlendirme seçeneğidir. [[K6 s. 461]]</li>
<li>Karekök, tersini alma veya logaritma dönüşümü uygulanabilir. [[K6 s. 461]] Dönüşmüş veri varsayımları karşılıyorsa parametrik bir test kullanılabilir. [[K6 s. 461]]</li>
<li>Uygunluk sağlanamıyorsa parametrik olmayan bir yöntem seçilebilir. [[K6 s. 461]] Bu testler geçerlidir, ancak kitap güçlerinin parametrik karşılıklarından genellikle daha düşük kabul edildiğini belirtir. [[K6 s. 461]]</li></ol>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Soru</th><th>Parametrik test</th><th>Sıralara dayalı karşılığı</th></tr></thead><tbody>
<tr><td>İki bağımsız örneklem</td><td>İki örneklem t testi</td><td>Mann–Whitney U [[K6 s. 461–462]]</td></tr>
<tr><td>Eşleştirilmiş ölçümler</td><td>Eşleştirilmiş t testi</td><td>Wilcoxon (aşağıdaki düzeltme) [[K6 s. 462]]</td></tr>
<tr><td>Birden çok grup</td><td>Varyans analizi (ANOVA)</td><td>Kruskal–Wallis [[K6 s. 462]]</td></tr>
<tr><td>Birlikte değişim</td><td>Pearson korelasyonu</td><td>Spearman sıra korelasyonu [[K6 s. 462]]</td></tr></tbody></table></div>
${not('Kitap eşleştirilmiş t testinin karşısına Wilcoxon sıra toplamı testini yazar. [[K6 s. 462]] Eşleştirilmiş ölçümlerde doğru karşılık Wilcoxon işaretli sıralar testidir. [[K6 s. 462]]')}
<h3>Merkezî alanı bir hasta ölçümüyle ilişkilendirmek</h3>
<p>Wechsler örneğinde tek bir puanı yorumlarken önce topluluğun ortalamasını, sonra o puanın ortalamadan kaç standart sapma uzakta olduğunu düşünün. [[K6 s. 460–461]] Aynı uzaklık sayısal olarak daha büyük bir SS ile karşılaştırıldığında dağılımın merkezine göre daha küçük bir sapmayı ifade eder. [[K6 s. 460]]</p>
<p>Kaydırıcıyı birden ikiye getirdiğinizde aynı dağılımın daha geniş bir bölgesini seçersiniz. [[K6 s. 460–461]] Üç SS’ye geldiğinizde iki kuyrukta kalan toplam pay yaklaşık %0,3’tür. [[K6 s. 460]] Buradaki yüzde tek tek gözlemlerin nerede yer aldığını tarif eder; örneklem ortalamasının güven aralığının hesabında ayrıca örneklem büyüklüğü kullanılır. [[K6 s. 460]] [[K6 s. 464]]</p>
</section>

<section class="wrap blk ders-sec" id="fk29-karar">
<h2>Örneklemden karara: hipotez, hata ve güven aralığı</h2>
<p class="intro">Bir araştırmada örneklemden yola çıkarak kaynak topluluk hakkında sonuca varmak isteriz. [[K6 s. 462]] Gözlenen farkın gerçek olduğuna karar vermeden önce örnekleme bağlı rastlantısal değişkenlik, yanlılık ve karıştırıcı etkenler değerlendirilir. [[K6 s. 462]]</p>
${sekil('karar','Gerçek durum ile araştırma kararını karşılaştırın','Mahkeme benzetmesinde başlangıç varsayımı sanığın suçsuzluğudur. [[K6 s. 462–463]]')}
<p>Sıfır hipotezi (H₀) iki grup arasında fark bulunmadığını, başka bir deyişle müdahalenin etkisi olmadığını öne sürer. [[K6 s. 462]] Buna karşı bir alternatif hipotez kurulur, sonra örneklem verileri anlamlılık testiyle değerlendirilir. [[K6 s. 462]] Mahkeme benzetmesinde kanıtlar yeterliyse başlangıç varsayımı reddedilir, yetersizse suçluluk kararı verilmez. [[K6 s. 462–463]]</p>
<div class="fk29-izgara">
${kart('Tip I hata • Yanlış pozitif','Gerçekte H₀ doğruyken reddedilir: etkisiz bir müdahale için fark var denir. [[K6 s. 463–464]] Benzetmedeki sonuç masum kişinin mahkûm edilmesidir. [[K6 s. 463]] Bu hatanın olasılığı α ile belirtilir ve bilimsel çalışmalarda sıklıkla 0,05 seçilir. [[K6 s. 463–464]]')}
${kart('Tip II hata • Yanlış negatif','Gerçekte H₀ yanlışken reddedilmez: mevcut bir fark gözden kaçar. [[K6 s. 463–464]] Mahkemede bu, suçu işlemiş bir kişi için mahkûmiyet kararı çıkmamasına karşılık gelir. [[K6 s. 463]] Tip II hata olasılığı β ile gösterilir. [[K6 s. 464]]')}
</div>
<p>Anlamlılık eşiği 0,05 seçilmişse p &lt; 0,05 sonucu H₀’ın reddi yönünde yorumlanır. [[K6 s. 463–464]] Örneklem büyüklüğü sabitken tip I hatayı önlemek için daha katı bir karar eşiği seçmek, gerçek bir farkı kaçırma olasılığını artırabilir. [[K6 s. 463–464]]</p>
<h3>Gözlemlerin yayılımı ile ortalamanın belirsizliği</h3>
<p>İlgili topluluğun tamamını incelemek çoğu zaman mümkün olmadığı için araştırma yönetilebilir büyüklükte bir örneklemle yürütülür. [[K6 s. 463–464]] Güven aralığı, örneklemde elde edilen ortalamayla topluluğun gerçek ortalamasının ne kadar iyi tahmin edildiğini göstermek için kullanılır. [[K6 s. 464]] Hesapta hem ölçümlerin standart sapması hem de örneklem büyüklüğü rol oynar. [[K6 s. 464]]</p>
${not('Kitap, %95 güven aralığını gerçek değerin hesaplanan sınırlar içinde bulunma olasılığı %95, dışında bulunma olasılığı %5 diye açıklar. [[K6 s. 464]] Sıklıkçı yorumda %95, aynı yöntemle tekrarlanan örneklemelerde kurulan aralıkların uzun dönemde gerçek değeri kapsama oranıdır. [[K6 s. 464]]')}
<p>Karar tablosunu iki yönden okumak, α ve β’nın neden birbirinin tümleyeni olmadığını gösterir. [[K6 s. 463–464]] H₀ doğru olduğunda iki olası karar doğru biçimde reddetmemek ve yanlış biçimde reddetmektir. [[K6 s. 463]] H₀ yanlış olduğunda ise iki olası karar gerçek farkı saptamak ve onu kaçırmaktır. [[K6 s. 463–464]] Bu ikinci durumda doğru kararın olasılığı ile β’nın toplamı birdir. [[K6 s. 464]]</p>
<h3>Sonucu iki ayrı soruyla okuyun</h3>
<p>İlk soru, “Gerçekte fark olmasaydı örneklemler arasında bir fark görebilir miydik?” sorusudur. [[K6 s. 462–463]] İki grupta gözlenen sayılar örnekleme bağlı olarak değişebildiğinden, ortalamaların farklı çıkması tek başına müdahale etkisinin kanıtı sayılmaz. [[K6 s. 462]] Test kararı bu değişkenlik dikkate alınarak verilir. [[K6 s. 462–463]]</p>
<p>İkinci soru, farkın saptanmadığı bir çalışmanın onu yakalamaya yetecek güçte olup olmadığıdır. [[K6 s. 464–465]] Mahkeme örneğinde suçsuz birini mahkûm etmekten kaçınmak ile suçlu birini serbest bırakmaktan kaçınmak ayrı hedeflerdir. [[K6 s. 463]] Aynı biçimde bir çalışmada yanlış pozitif kararı seyrekleştiren seçim, yanlış negatif karara karşı tek başına güvence sağlamaz. [[K6 s. 463–464]]</p>
</section>

<section class="wrap blk ders-sec" id="fk29-guc">
<h2>Güç hesabı: kaç kişiyle hangi fark saptanabilir?</h2>
<p class="intro">Güç, gerçek bir fark varken sıfır hipotezini doğru biçimde reddetme olasılığıdır: güç = 1 − β. [[K6 s. 464–465]] Araştırma tasarlanırken hedef, klinik bakımdan önemli sayılan en küçük farkı saptayacak örneklem büyüklüğünü bulmaktır. [[K6 s. 465]]</p>
${sekil('guc','Size Zero çalışmasında hedef farkı değiştirin','Kaydırıcının iki konumu kitapta hesabı verilen iki ayrı hedefe karşılık gelir. [[K6 s. 470–471]]')}
<p>β sıklıkla 0,2 seçilir, bu durumda güç 0,8’dir. [[K6 s. 464]] α = 0,05 ile birlikte düşünüldüğünde kabul edilen tip II hata olasılığı tip I hata olasılığının dört katıdır. [[K6 s. 464]] Sabit örneklemde bir hata olasılığını azaltmak ötekini artırabilir, her ikisini birlikte azaltmak için örneklemi büyütmek gerekir. [[K6 s. 464]] Uygulamada bu her zaman mümkün olmayabilir. [[K6 s. 464]]</p>
<h3>Hesaptan önce belirlenmesi gerekenler</h3>
<ul class="ozet"><li>Hasta veya klinik uygulama için anlam taşıyan en küçük farkı tanımlayın. [[K6 s. 465]] İstatistiksel olarak saptanabilen bir fark klinik açıdan önemsiz olabilir. [[K6 s. 465]]</li>
<li>Çalışmanın türü ve amacına uygun α ve β olasılıklarını seçin. [[K6 s. 465]]</li>
<li>Örneklemlerin standart sapmasını önceki yayınlar, pilot çalışmalar ve makul bir değerlendirmeyle tahmin edin. [[K6 s. 465]] Bu girdi başta tahmin olduğundan kesin güç hesabı ancak geriye dönük yapılabilir. [[K6 s. 465]]</li></ul>
<p>İnsan veya hayvanların katıldığı deneylerde araştırmanın yararlı bir soruya yanıt verecek ve gerçek farkı saptayabilecek biçimde tasarlanması etik açıdan önemlidir. [[K6 s. 465]] Gücü yetersiz bir araştırmada H₀ reddedilmemişse buradan fark bulunmadığı sonucu güvenle çıkarılamaz. [[K6 s. 465]]</p>
${kart('Çözümlü örnek • Kilo kaybını ne kadar hızlandırmalı?','Mevcut programda beden kitle indeksinin (BKİ) beş puan azalması ortalama 100 gün sürmektedir. [[K6 s. 470]] Size Zero adlı ilacın yararlı sayılması için bu süreyi 90 güne veya daha aza indirmesi istenir. [[K6 s. 470–471]] Hesabın girdileri: plasebo ortalaması 100 gün, iki grupta SS 20 gün (önceki verilerden), α = 0,05, β = 0,2. [[K6 s. 471]] Hedef fark 100 − 90 = 10 gündür ve gereken toplam en az 98 kişi, yani kol başına 49 kişidir. [[K6 s. 470–471]] Hedef süre 98 gün seçilirse fark yalnız 2 gün olur ve gereken toplam örneklem 2474 kişiye çıkar. [[K6 s. 471]] Küçük etkiler veya nadir sonlanımlar bu nedenle çok geniş örneklemler gerektirebilir. [[K6 s. 471]]')}
<p>Size Zero hesabında her iki senaryoda da sonlanım aynıdır: BKİ’nin beş puan düşmesine kadar geçen süre ölçülür. [[K6 s. 470–471]] Değişen, yararlı kabul edilecek zaman kazancıdır. [[K6 s. 470–471]] Hedef ortalama 90 günden 98 güne getirildiğinde ilaçtan beklenen yarar küçülür, fakat bunu göstermek için araştırmanın karşılaması gereken örneklem gereksinimi büyür. [[K6 s. 471]]</p>
</section>

<section class="wrap blk ders-sec" id="fk29-inhaler">
<h2>İnhaler denemesi: ortalamalar ne kadar ayrılıyor?</h2>
<p class="intro">Standart tedavi alan 200 astım hastasında yeni bir inhalerin tepe ekspiratuvar akım hızını (PEFR) artırıp artırmadığı araştırılır. [[K6 s. 466]] Katılımcılar olabildiğince eşleştirilir ve ardından ilaç ile plaseboya, her kolda 100 kişi olacak biçimde rastgele atanır. [[K6 s. 466]]</p>
${sekil('inhaler','İki senaryoda ortalamaları ve yayılımı karşılaştırın','Nokta ortalama iyileşmeyi, çizgi ortalamanın iki yanında birer standart sapmayı gösterir. [[K6 s. 466–467]]')}
<p>PEFR hem başlangıçta hem iki haftalık tedavi sonunda ölçülür. [[K6 s. 466]] Birincil sonlanım, iki hafta sonunda PEFR’deki iyileşmedir. [[K6 s. 466]] Her hasta için değişim elde edildikten sonra karşılaştırılan değerler, ilaç ve plasebo kollarının ortalama iyileşmeleridir. [[K6 s. 466–467]] Veriler normal dağıldığından kitap bu iki grup için iki yönlü Student t testini kullanır. [[K6 s. 467]]</p>
<div class="fk29-izgara">
${kart('Hesap • Belirgin ayrışma','İlaç grubunda ortalama iyileşme 100, plaseboda 2 ve her iki grupta SS 20’dir. [[K6 s. 466]] Ortalamalar arasındaki fark 98 puandır. [[K6 s. 466]] Ayrım gözle de belirgin olsa bile teste başvurulur: p &lt; 0,0001 bulunur ve tedavinin fark oluşturmadığını söyleyen H₀ reddedilir. [[K6 s. 467]]')}
${kart('Hesap • Örtüşen gruplar','İlaç grubunda ortalama iyileşme 10 (SS 20), plaseboda 5 (SS 30) puandır. [[K6 s. 467]] Fark 5 puana inerken plasebo grubunun yayılımı genişlemiştir. [[K6 s. 467]] Kitap p = 0,16 bildirir; bu değer beşte bire yakındır ve sonuç seçilen %5 eşiğinde anlamlı değildir. [[K6 s. 467–468]]')}
</div>
<p>İkinci senaryoda fark aynı 5 puanda tutulup toplam katılımcı sayısı on katına, 2000’e çıkarıldığında küçük bir farkı saptamak kolaylaşır. [[K6 s. 468]] Kitap bu sonucu yüksek derecede anlamlı diye niteler; metindeki “p &gt; 0,001” yazımı bu nitelemeyle çelişir, kastedilen p &lt; 0,001’dir. [[K6 s. 468]] Hastanın PEFR’sindeki küçük bir değişimin ilacı piyasaya çıkarmak için gerekli yatırımı haklı kılıp kılmadığı ayrı bir klinik karardır. [[K6 s. 468]]</p>
<h3>Sonuç sunarken üç büyüklüğü ayırın</h3>
<ol class="ozet"><li><b>Etkinin büyüklüğü.</b> İkinci senaryoda ilacın ortalama iyileşmesi 10 puan olsa da plasebo grubunun ortalaması 5 puandır. [[K6 s. 467]] Müdahaleler arasındaki farkı anlatan değer 10 puanın tamamı değil, plaseboya göre kazanılan 5 puandır. [[K6 s. 467–468]]</li>
<li><b>Ölçümlerin yayılımı.</b> Plasebo grubundaki 30 değeri ortalama iyileşme değil, o gruptaki değişimin standart sapmasıdır. [[K6 s. 467]] Bu nedenle şekilde plasebo çizgisi ilaç grubunun çizgisinden daha geniş görünür. [[K6 s. 467]]</li>
<li><b>Katılımcı sayısı.</b> İkinci senaryonun genişletilmiş biçiminde grup ortalamaları arasındaki fark büyütülmemiştir. [[K6 s. 468]] Daha çok hastanın incelenmesi, küçük bir farkın istatistiksel olarak seçilebilmesini kolaylaştırmıştır. [[K6 s. 468]]</li></ol>
</section>

<section class="wrap blk ders-sec" id="fk29-sprey">
<h2>Kategorik sonlanım: köpekbalığı kovucu sprey</h2>
<p class="intro">İnsanlarda köpekbalığı saldırısı yaklaşık 1,3 milyarda bir görüldüğünden kitap, varsayımsal bir spreyi sınamak için Seal Island’daki fokları model olarak kullanır. [[K6 s. 468]] Burada ölçüm bir ortalama değildir: her fok gözlem süresi sonunda saldırıya uğramış veya uğramamıştır. [[K6 s. 468]]</p>
${sekil('sprey','Örneklem değişince olay oranlarını yeniden okuyun','Çubukların ortak ekseni, ilgili grupta saldırıya uğrayanların yüzdesini gösterir. [[K6 s. 468–469]]')}
<p>Adadaki 20 000 fok rastgele sprey ve plasebo gruplarına ayrılır. [[K6 s. 468]] İşaretleme ve tek tek tanıma gibi güçlüklerin hesaba katıldığı varsayılır. [[K6 s. 468]] İzlem sonunda her gruptaki iki olası sonucun sayıları bir çapraz tabloya yazılır ve kategorik değişkenlerin ilişkisi ki-kare (χ²) testiyle incelenir. [[K6 s. 468–469]]</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Örneklem ve grup</th><th>Saldırı var</th><th>Saldırı yok</th></tr></thead><tbody>
<tr><td>20 000 • Plasebo</td><td>680</td><td>9320 [[K6 s. 468]]</td></tr><tr><td>20 000 • Sprey</td><td>600</td><td>9400 [[K6 s. 468]]</td></tr>
<tr><td>100 • Plasebo</td><td>4</td><td>46 [[K6 s. 469]]</td></tr><tr><td>100 • Sprey</td><td>2</td><td>48 [[K6 s. 469]]</td></tr>
</tbody></table></div>
${kart('Hesap • Geniş ve küçük örneklem','K6 geniş örneklem için p = 0,02 bildirir; seyrek bir olayda küçük bir farkı belirlemek için çok sayıda gözlem gerekebilir. [[K6 s. 468–469]] Küçük örneklemde grup başına 50 fok vardır: plaseboda 4/50 = %8, spreyde 2/50 = %4 saldırı görülür. [[K6 s. 469]] Yüzde puan farkı daha büyük olduğu hâlde p = 0,4 bulunur ve fark anlamlı değildir. [[K6 s. 469]]')}
${not('Kitap büyük örneklemde saldırı yüzdelerini %7,3 ve %6,4 verir. [[K6 s. 469]] Tablodaki grup toplamlarıyla doğru riskler plaseboda 680/10 000 = %6,8 ve spreyde 600/10 000 = %6,0’dır. [[K6 s. 468–469]]')}
<p>Bu örnekte oranı hesaplarken önce tek bir tedavi kolu seçilir. [[K6 s. 468–469]] Saldırıya uğramayanlar da gözleme katıldıkları için o grubun paydasında yer alır. [[K6 s. 468–469]] Geniş çalışmada gruplar arasındaki mutlak fark 0,8 yüzde puanken küçük çalışmada 4 yüzde puandır. [[K6 s. 468–469]] Yalnız bu iki farkı sıralamak, hangi çalışmanın müdahale etkisi için daha güçlü istatistiksel kanıt sunduğunu göstermez. [[K6 s. 469]]</p>
</section>

<section class="wrap blk ders-sec" id="fk29-kulak">
<h2>Korelasyon: yaşla kulak uzunluğu birlikte değişiyor mu?</h2>
<p class="intro">1996’da BMJ’de yayımlanan bir Japon araştırmasında 400 hastanın kulak uzunluğu, boyu ve yaşı kaydedildi. [[K6 s. 469–470]] İlk inceleme uzun boylu kişilerde kulağın da daha uzun olma eğiliminde olduğunu gösterdi. [[K6 s. 469]]</p>
${sekil('kulak','Boy düzeltmesinden sonra hangi ilişki okunur?','Şema analiz sırasını gösterir, hasta gözlemleri metinde tek tek verilmemiştir. [[K6 s. 469–470]]')}
${kart('Çözümlü örnek • Pearson r','Araştırmacılar kulak uzunluğunu önce boya göre düzeltti, sonra düzeltilmiş değerleri her hastanın yaşıyla karşılıklı olarak saçılım grafiğine yerleştirdi. [[K6 s. 469–470]] En iyi uyum doğrusu yukarı eğimliydi ve birimsiz Pearson korelasyon katsayısı r = 0,6 (%95 güven aralığı 0,53–0,66) bulundu. [[K6 s. 470]] Buna göre yaş ilerledikçe düzeltilmiş kulak uzunluğu artma eğilimindedir. [[K6 s. 470]] Katsayı ilişkinin yönü ve gücü hakkında bilgi verir, bu birlikteliğin nedenini açıklamaz. [[K6 s. 470]]')}
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Pearson r</th><th>Geleneksel yorum</th></tr></thead><tbody>
<tr><td>0–0,2</td><td>Çok düşük, büyük olasılıkla anlamsız [[K6 s. 470]]</td></tr><tr><td>0,2–0,4</td><td>Düşük; ileri inceleme gerektirebilir [[K6 s. 470]]</td></tr>
<tr><td>0,4–0,6</td><td>Makul [[K6 s. 470]]</td></tr><tr><td>0,6–0,8</td><td>Yüksek [[K6 s. 470]]</td></tr><tr><td>0,8–1,0</td><td>Çok yüksek [[K6 s. 470]]</td></tr></tbody></table></div>
<p>Grafiği tarif ederken önce eksenlerde hangi iki değişkenin yer aldığını söyleyin: yaş ile boya göre düzeltilmiş kulak uzunluğu karşı karşıyadır. [[K6 s. 469–470]] Boy, ilk incelemede kulak uzunluğuyla ilişkili bulunduğu için düzeltmeye girmiştir. [[K6 s. 469]] Pozitif katsayı, uyum doğrusunun yaş arttıkça yukarı yönelmesiyle tutarlıdır. [[K6 s. 470]] Bu sonuçtan kulaktaki değişimin hangi mekanizmayla geliştiği çıkarılamaz. [[K6 s. 470]]</p>
</section>

<section class="wrap blk ders-sec" id="fk29-tup">
<h2>Tanı ve öngörü: paydaya kim giriyor?</h2>
<p class="intro">Yoğun bakımda gece devrinde saptanan deliryumun, hastanın gece nazogastrik tüpünü çekmesini ne kadar iyi öngördüğü incelenir. [[K6 s. 471–472]] Test sonucu devir sırasındaki değerlendirme, gerçekleşen olay ise tüpün çekilmesidir. [[K6 s. 471]]</p>
${sekil('tup','Bir ölçü seçin ve hesaba giren hücreleri izleyin','Renkli hücreler paydayı, çift çerçeveli hücre payı gösterir. [[K6 s. 471–472]]')}
<p>İdeal testte duyarlılık da özgüllük de %100’dür. [[K6 s. 464]] Uygulamada duyarlılığı artırmak çoğu zaman özgüllükten ödün vermeyi gerektirir. [[K6 s. 464]] Kitabın tromboemboli örneğinde D-dimer oldukça duyarlıdır ve negatif sonuç olayı büyük ölçüde dışlar. [[K6 s. 464]] Pozitiflik çok çeşitli fizyolojik koşullarda görülebildiğinden tek başına tromboemboliye bağlanamaz. [[K6 s. 464]]</p>
<h3>Çözümlü örnek • Gece izlenen 100 hasta</h3>
<p>Devirde deliryumu olanlardan 30’u tüpünü çeker (doğru pozitif), 20’si çekmez (yanlış pozitif). [[K6 s. 471]] Deliryumu olmayanlardan 5’i tüpünü çeker (yanlış negatif), 45’i çekmez (doğru negatif). [[K6 s. 471]]</p>
<div class="fk29-izgara">
${kart('Duyarlılık • Olayı yaşayanlardan başlayın','Tüpünü çekenlerin kaçında deliryum öngörüsü pozitifti? Duyarlılık = doğru pozitif / (doğru pozitif + yanlış negatif) = 30/(30 + 5) ≈ %85,7 (kitapta 0,86). [[K6 s. 471]]')}
${kart('Özgüllük • Olayı yaşamayanlardan başlayın','Tüpünü çekmeyenlerin kaçında deliryum öngörüsü negatifti? Özgüllük = doğru negatif / (doğru negatif + yanlış pozitif) = 45/(45 + 20) ≈ %69,2 (kitapta 0,69). [[K6 s. 471]]')}
${kart('Pozitif öngörü değeri (PPV) • Test pozitiflerinden başlayın','Devirde deliryumu olanların kaçı gerçekten tüpünü çekti? PPV = doğru pozitif / (doğru pozitif + yanlış pozitif) = 30/(30 + 20) = %60. [[K6 s. 471–472]]')}
${kart('Negatif öngörü değeri (NPV) • Test negatiflerinden başlayın','Devirde deliryumu olmayanların kaçı tüpünü yerinde bıraktı? NPV = doğru negatif / (doğru negatif + yanlış negatif) = 45/(45 + 5) = %90. [[K6 s. 471–472]]')}
</div>
<p>Bu dört oranın birimi yoktur ve her biri farklı bir hasta grubunu kendi içinde karşılaştırır. [[K6 s. 471–472]] Örneğin özgüllüğün paydasına tüpünü çekmemiş ama deliryumu olan hastalar da girer. [[K6 s. 471]] Negatif öngörü değerinin paydasına ise deliryumu olmayıp tüpünü çekmiş hastalar da girer. [[K6 s. 471–472]] Her ikisinde payın 45 olması bu iki ölçüye aynı anlamı vermez. [[K6 s. 471–472]]</p>
<p>Bu örnekte değerlendirme oldukça duyarlı, ancak orta derecede özgüldür. [[K6 s. 471–472]] Oryante bir hastada gece tüpü yeniden takmak nadiren gerekirken deliryumu olan hasta geceyi uyuyarak da geçirebilir. [[K6 s. 471–472]] Devirde deliryum saptanması, tüp çekilmesi riskini azaltacak bakım planı yapılmasını destekler. [[K6 s. 472]]</p>
<h3>Gece devrinde hangi oran işe yarar?</h3>
<p>Devirde tüpün gece çekilip çekilmeyeceği henüz bilinmez, bilinen bilgi deliryum değerlendirmesidir. [[K6 s. 471–472]] Deliryumu olan bir hasta için soruyu bu nedenle “Deliryumu olanların kaçı sonradan tüpünü çekti?” diye kurun. [[K6 s. 471–472]] Otuz doğru pozitifi, aynı satırdaki 20 yanlış pozitifle birlikte değerlendirmeniz gerekir. [[K6 s. 471–472]]</p>
<p>Ertesi gün değerlendirmeyi denetlerken soru değişebilir: “Gece tüpünü çekmiş hastaların kaçını devirde saptadık?” [[K6 s. 471–472]] Pay yine 30’dur, fakat bu kez hesaba eklenenler deliryumu olmayıp tüpünü çeken beş hastadır. [[K6 s. 471]] Aynı paydan iki ayrı yüzde çıkmasının nedeni, sorunun başlangıcında seçilen hasta grubudur. [[K6 s. 471–472]]</p>
</section>

<section class="wrap blk ders-sec" id="fk29-p1"><h2>Part I · Doğru / yanlış</h2>
<div class="viz"><div data-viz="mtf" data-q="fk29-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk29-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="fk29-3"></div></div></section>
<section class="wrap blk ders-sec" id="fk29-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Gece yoğun bakım devrinde bir hastanın deliryumu var. Bu bulgunun nazogastrik tüpün çekilmesini öngörme değerini nasıl incelersiniz? [[K6 s. 471–472]]</p></div>
<h3>Cevap iskeleti</h3><ol class="ozet"><li>Öngörüyü devirde deliryum varlığı, sonlanımı gece tüpün çekilmesi olarak tanımlayın. [[K6 s. 471]]</li><li>Satırlara deliryumu, sütunlara gerçekleşen olayı koyun ve sırasıyla 30, 20, 5, 45 hastayı yerleştirin. [[K6 s. 471]]</li><li>Olayı yaşayan 35 hastadan 30’u test pozitiftir, olayı yaşamayan 65 hastadan 45’i test negatiftir. [[K6 s. 471]] Bunlar sırasıyla duyarlılık ve özgüllüğün pay ve paydalarıdır. [[K6 s. 471]]</li><li>Devirde sonucu bilinen hasta için uygun satıra dönün: pozitif öngörü değeri %60, negatif öngörü değeri %90’dır. [[K6 s. 471–472]]</li></ol>
<p><b>Çizin.</b> İkiye iki tabloyu çizip duyarlılık için bir sütunu, pozitif öngörü değeri için bir satırı çevreleyin. [[K6 s. 471–472]]</p>
<h3>Ek sorular</h3><ul class="ozet"><li>D-dimer örneğinde pozitif ve negatif sonuçların yorumu neden farklıdır? [[K6 s. 464]]</li><li>Yeni inhalerle ortalama PEFR değişimini hangi testle karşılaştırırdınız? [[K6 s. 466–467]]</li><li>İstatistiksel olarak anlamlı bulunan beş puanlık değişimin hastaya yararı konusunda ne söyleyebilirsiniz? [[K6 s. 468]]</li></ul></section>
<section class="wrap blk ders-sec" id="fk29-ozet"><h2>Özet</h2><ul class="ozet">
<li>Ölçümler referans çevresinde dağılabilir veya topluca aynı yöne kayabilir. [[K6 s. 452–453]]</li>
<li>Araştırma sorusu tasarımı, veri türü ve dağılımı test seçimini yönlendirir. [[K6 s. 453–455]] [[K6 s. 457–462]]</li>
<li>Tip I hata olmayan farkı bildirmek, tip II hata var olan farkı kaçırmaktır. [[K6 s. 463–464]]</li>
<li>Örneklem büyüdüğünde klinik değeri küçük bir fark da istatistiksel anlamlılık kazanabilir. [[K6 s. 468]]</li>
<li>Duyarlılık ve özgüllük gerçekleşen sonuca, öngörü değerleri ise test sonucuna göre hesaplanır. [[K6 s. 471–472]]</li></ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="29"></div>
<div class="btn-row fk29-gecis"><a href="#/dersler/fizik/28">← Fiziksel nicelikler ve SI birimleri</a><a href="#/dersler/fizik">İçindekiler →</a></div></section>`,
  };
})();
