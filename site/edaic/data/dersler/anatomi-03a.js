VERI.sorular = VERI.sorular || {};
VERI.sorular['an03a-1'] = {
  no: 1, kok: 'Servikal vertebralar ve sinirler', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 109–113]]',
  onermeler: [
    { t: 'C1’in arka arkında bifid bir spinöz çıkıntı bulunur.', d: false, n: 'C1’de spinöz çıkıntının yerinde küçük bir arka tüberkül vardır. [[K5 s. 110]]' },
    { t: 'C2’nin üst eklem yüzleri yukarı ve dışa bakar.', d: true, n: 'Aksis gövdesinin iki yanındaki büyük, oval üst fasetler yukarı ve dışa yönelir. [[K5 s. 111]]' },
    { t: 'Vertebral arter servikal transvers foramenlere C7’den girer.', d: false, n: 'Arter C6’dan girer, C7’nin küçük transvers forameninden yalnız aksesuar vertebral venüller geçer. [[K5 s. 111]]' },
    { t: 'C6’nın ön tüberkülü ana karotis arterin önünde kalır.', d: false, n: 'Ana karotis arter tüberkülün önünde yer alır ve ona doğru bastırılabilir. [[K5 s. 110]]' },
    { t: 'C8 siniri T1 vertebrasının üstünden çıkar.', d: true, n: 'C1–C7 kendi vertebrasının üstünden çıkar, C8 ise birinci torakal vertebranın üstünde yer alır. [[K5 s. 113]]' }
  ]
};
VERI.sorular['an03a-2'] = {
  no: 2, kok: 'Kosta ile eklemleşme ve torasik ark', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 113–115]]',
  onermeler: [
    { t: 'T1’de birinci kosta başı için tam bir faset vardır.', d: true, n: 'C7’de eş yarım faset bulunmadığı için ilk kosta başını T1’in tam üst faseti karşılar. [[K5 s. 114]]' },
    { t: 'T9, onuncu kosta başıyla her zaman eklemleşir.', d: false, n: 'T9 çoğu kez onuncu kosta başına katılmaz ve yalnız üst yarım faseti taşır. [[K5 s. 114–115]]' },
    { t: 'T11’in transvers çıkıntısında kosta tüberkülü için faset bulunmaz.', d: true, n: 'T11’in kosta eklemi gövdedeki dairesel fasettedir. [[K5 s. 114]]' },
    { t: 'Tipik torasik üst eklem yüzleri arkaya ve dışa bakar.', d: true, n: 'Üst faset arkaya ve dışa, karşısındaki alt faset öne ve içe yönelir. [[K5 s. 114]]' },
    { t: 'İnen aorta T5–T8 gövdelerinin sağ yanını basıklaştırır.', d: false, n: 'İnen aortanın basısı bu dört gövdenin sol yanındadır. [[K5 s. 113]]' }
  ]
};
VERI.sorular['an03a-3'] = {
  no: 3, kok: 'Lomber ponksiyonun anatomik dayanakları', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 114–120]]',
  onermeler: [
    { t: 'Öne fleksiyonda lomber interlaminar aralık daralır.', d: false, n: 'Fleksiyon aralığı genişletir ve ligamentum flavumun daha büyük bir bölümünü açığa çıkarır. [[K5 s. 115]] [[K5 s. 117]]' },
    { t: 'Lomber transvers çıkıntıların en uzunu L3’tedir.', d: true, n: 'Uzunluk L3’e kadar artar, ardından azalır. [[K5 s. 114]]' },
    { t: 'L5 gövdesinin ön yüksekliği arka yüksekliğinden fazladır.', d: true, n: 'Bu kama biçimi lumbosakral açıya katkıda bulunur. [[K5 s. 115]]' },
    { t: 'Erişkinde omurilik bazen L3’e kadar uzanabilir.', d: true, n: 'En sık L1 düzeyinde sonlanır, ancak L2’ye hatta L3’e kadar inebilir. [[K5 s. 119]]' },
    { t: 'İnterkristal çizginin hemen altındaki aralık genellikle L4/5’tir.', d: true, n: 'Çizgi genellikle L4 gövdesinden geçer, üst aralık L3/4 ve alt aralık L4/5 olarak değerlendirilir. [[K5 s. 118–119]]' }
  ]
};

(() => {
  const nav = [['plan','Temel plan'],['boyun','Servikal'],['gogus','Torasik'],['bel','Lomber'],['yuzey','Yüzey işaretleri'],['giris','İğnenin yolu'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  const katmanlar = [
    { ad: 'Deri', metin: 'Lokal anestezik infiltrasyonunu izleyen orta hat girişinde ilk geçilen tabaka deridir. [[K5 s. 119]]' },
    { ad: 'Deri altı', metin: 'Deri altı dokusu, yüzey ile omurganın arka bağları arasında geçilir. [[K5 s. 119]]' },
    { ad: 'Supraspinöz bağ', metin: 'Orta hatta ilerleyen iğne, deri altından sonra ilk olarak supraspinöz bağı geçer. [[K5 s. 119]]' },
    { ad: 'İnterspinöz bağ', metin: 'Komşu spinöz çıkıntıların arasındaki bağ, supraspinöz bağdan sonra ve sarı bağdan önce geçilir. [[K5 s. 119]]' },
    { ad: 'Ligamentum flavum', metin: 'İki lamina arasındaki sarı bağ, orta hat yolunda duraya ulaşmadan önce geçilen son bağdır. [[K5 s. 117]] [[K5 s. 119]]' },
    { ad: 'Dura', metin: 'Dura delinirken çoğu kez direnç kaybı hissedilir. [[K5 s. 119]] Spinal iğnenin stilesi çıkarıldığında bağlantı yerinde beyin omurilik sıvısı görülmesi beklenir. [[K5 s. 119]]' }
  ];
  const okumalar = {
    katman: 'Şemayı yüzeyden derine doğru okuyun. Renkli satır seçtiğiniz katmanı gösterir. Orta hat girişini paramedyan girişle karşılaştırırken, kalsifikasyonu iğne geçişini güçleştirebilen iki bağı bulun. [[K5 s. 119]]', 
    egri: 'Soldan sağa ilerleyin. Hangi evrede bel eğriliği ilk kez öne konveks görünüyor? [[K5 s. 109]]',
    atlas: 'Kemik halkayı önden arkaya izleyin. Öndeki kısa arkın iç yüzü densi karşılar, arka ark üzerindeki oluk ise damarın foramen magnuma dönüş yeridir. [[K5 s. 110–112]] İki konkav üst eklem yüzünün derinliği, atlasın üstünde oturan oksipital kondillerle ilişkisini gösterir. [[K5 s. 110]]',
    servikal: 'Ortadaki geniş açıklığı iki yandaki küçük açıklıklardan ayırın. Ortada omurilik için vertebral foramen, yanlarda vertebral damarlar için birer foramen transversarium vardır. [[K5 s. 109]] Yan açıklığın dış sınırı boyunca önden arkaya ilerlerseniz ön tüberkül, kostotransvers çubuk ve arka tüberkülü sırasıyla bulursunuz. [[K5 s. 109–111]]',
    torasik: 'Gövdenin yan yüzündeki iki küçük eklem yüzünü bulun. Üstteki pedikülün tabanına oturur, alttaki ise alt vertebral çentiğin hemen önünde kalır. [[K5 s. 113]] Transvers çıkıntının ucuna doğru ilerlediğinizde bu kez kosta başını değil, kosta tüberkülünü karşılayan yüzü görürsünüz. [[K5 s. 110]] [[K5 s. 114]]',
    lomber: 'Gövdenin arka kenarından başlayarak foramenin bir yanını izleyin. Kalın pedikülü geçince eklem çıkıntısına, oradan kısa ve geniş laminaya ulaşırsınız. [[K5 s. 114–116]] İki lamina arkada orta hatta buluşur, yatay spinöz çıkıntı bu hattın devamında yer alır. [[K5 s. 109]] [[K5 s. 115–116]]',
    isaret: 'Sakrumdan yukarı doğru sayarak krestlerin hizasındaki gövdeyi kontrol edin. [[K5 s. 118–119]]',
    yaklasim: 'İlk iki örnekte spinöz çıkıntının üst kenarını, son örnekte iki lamina arasındaki sarı bağı bulun. [[K5 s. 114–115]] [[K5 s. 117]]'
  };
  function lejant(id) {
    if (id === 'katman') return `<ol>${katmanlar.map(k => `<li><b>${k.ad}.</b> ${k.metin}</li>`).join('')}</ol>`;
    return '';
  }
  const sekil = (id, ad) => `<div class="viz"><div class="viz-head"><h3>${ad}</h3></div><div data-viz="an03a_${id}">${lejant(id)}</div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${okumalar[id]}</p></div>`;
  SAYFALAR['dersler/anatomi/03a'] = {
    katmanlar, grup: 'dersler', eyebrow: 'Anatomi · Bölüm 3 · Ders 03a', baslik: 'Servikal, torasik ve lomber vertebralar',
    lede: 'Spinal ve epidural blokta aynı kemik işaretler önce parmakla, sonra ilerleyen iğneyle tanınır. [[K5 s. 109]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="an03a-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="an03a-plan"><h2>Omurganın eğrilikleri ve ortak kemik planı</h2>
<p class="intro">Erişkinde boyun ve bel öne konveks, torasik ve sakral bölgeler öne konkavdır. [[K5 s. 109]]</p>
${sekil('egri','Tek fetal eğrilikten erişkin omurgasına')}
<p>Servikal ve lomber lordoz postürle gelişir, torasik ve sakral kifoz ise kemiklerin biçiminden kaynaklanır. [[K5 s. 109]]</p>
<div class="an03a-kartlar">
<div class="card"><h3>Segment sayısı</h3><p>Omurgada yedi servikal, on iki torasik ve beş lomber vertebra bulunur. [[K5 s. 109]] Sakrum beş, koksiks dört kaynaşmış segment içerir. [[K5 s. 109]]</p></div>
<div class="card"><h3>Yük ve koruma</h3><p>Orta torasik vertebra ortak planı gösterir. [[K5 s. 109]] Gövde yükü iletir, nöral ark vertebral foramen içindeki omuriliği çevreler ve korur. [[K5 s. 109]]</p></div>
<div class="card"><h3>Arkın parçaları</h3><p>Her yanda bir pedikül ve bir lamina, arkada tek spinöz çıkıntı vardır. [[K5 s. 109]] Her lamina bir transvers çıkıntı ile faset taşıyan üst ve alt eklem çıkıntılarını içerir. [[K5 s. 109]]</p></div>
<div class="card"><h3>Sinirin çıkışı</h3><p>Üst üste gelen iki omurun pedikül çentikleri intervertebral forameni sınırlar. [[K5 s. 109]] Spinal sinir kanaldan bu yan açıklık yoluyla çıkar. [[K5 s. 109]]</p></div></div>
</section>

<section class="wrap blk ders-sec" id="an03a-boyun"><h2>Boyunda hangi omuru tutuyorsunuz?</h2>
<p class="intro">C3–C6 tipik servikal omurlardır, C1 ise gövdesiz bir halkadır. [[K5 s. 109–110]]</p>
${sekil('atlas','Atlası üstten okuyun')}
</section>
<section class="wrap blk ders-sec" id="an03a-tipik"><h2>Tipik servikal omur ve komşulukları</h2>
${sekil('servikal','C3–C6’da orta ve yan açıklıkları ayırt edin')}
<ul class="an03a-liste">
<li><b>Gövde ve kanal.</b> Küçük, yassı gövdenin arkasında geniş, üçgen bir vertebral foramen bulunur. [[K5 s. 109]]</li>
<li><b>Pedikül ve fasetler.</b> Pediküller arkaya ve laterale uzanır, üst ve alt çentiklerinin boyları birbirine yakındır. [[K5 s. 109]] Pedikülle lamina arasındaki artiküler sütunda üst yüz yukarı ve arkaya, alt yüz aşağı ve öne bakar. [[K5 s. 109]]</li>
<li><b>Transvers çıkıntı.</b> İnce boyunda yandan palpe edilebilen kısa çıkıntıyı vertebral damarların geçtiği foramen transversarium deler. [[K5 s. 109]] Ön ve arka kökler lateralde birer tüberkülle sonlanır ve foramenin dışında kostotransvers çubukla birleşir. [[K5 s. 109]] Ön kökle çubuk kostaya homologdur ve kosta gibi gövdenin yanına tutunur. [[K5 s. 109–110]]</li>
<li><b>Palpasyon.</b> C6’nın büyük ön tüberkülü (Chassaignac) sternokleidomastoidin medialinde ele gelir. [[K5 s. 110]] Önünden geçen ana karotis arter bu tüberküle bastırılabilir. [[K5 s. 110]] Tipik servikal spinöz çıkıntı kısa ve bifiddir. [[K5 s. 110]]</li></ul>
<div class="an03a-kartlar">
<div class="card"><h3>C1 · atlas</h3><p>Her lateral kitle üst ve alt eklem yüzlerini taşır, Şekil 91’de transvers bağın tutunma yeri ayrıca gösterilir. [[K5 s. 110]] [[K5 s. 112]] Vertebral arter arka ark üzerindeki oluktan mediale ve yukarı kıvrılıp foramen magnuma yönelir. [[K5 s. 110]] C1’in posterior dalı arterin altından suboksipital üçgene girerek komşu kasları innerve eder. [[K5 s. 110]]</p></div>
<div class="card"><h3>C2 · aksis</h3><p>Gövdenin üstünden yükselen dens (odontoid çıkıntı) C1 ön arkındaki fasete dayanır, aralarında küçük bir bursa vardır. [[K5 s. 111]] [[K5 s. 113]] Gövdenin yanlarındaki büyük oval üst fasetler yukarı ve dışa, laminalardaki alt fasetler aşağı ve öne bakar. [[K5 s. 111]] Transvers çıkıntı küçük ve tüberküllere ayrılmamıştır, laminalar kalın, bifid spinöz çıkıntı ise iri ve sağlamdır. [[K5 s. 111]] Transvers foramen küçük çıkıntının içinde görülür. [[K5 s. 113]]</p></div>
<div class="card"><h3>C7 · vertebra prominens</h3><p>Adını sağlam, çatallanmayan spinöz çıkıntısından alır. [[K5 s. 111]] Transvers çıkıntısı büyüktür ama ön tüberkülü küçüktür, bazen de bulunmaz. [[K5 s. 111]] Küçük transvers forameninden yalnız aksesuar vertebral venüller geçer, vertebral arter ise C6’dan girer. [[K5 s. 111]]</p></div></div>
<h3>Sinirlerin faset ve arterle ilişkisi</h3>
<ul class="an03a-liste"><li>C3–C7 ön primer dalları fasetlerin önünden çıkıp vertebral arterin arkasından geçer. [[K5 s. 111]]</li>
<li>C1 ve C2 kendi fasetlerinin arkasından çıkar, C1’in ön dalı arterin medialinden öne ilerler. [[K5 s. 111–112]]</li>
<li>Sekiz servikal sinirden C1–C7 aynı adlı vertebranın üstünden, C8 ise T1’in üstünden çıkar. [[K5 s. 113]] Bundan sonraki spinal sinirlerin çıkışı aynı adlı vertebranın altındadır. [[K5 s. 113]]</li></ul></section>

<section class="wrap blk ders-sec" id="an03a-gogus"><h2>Torasik omurda kosta başı ve tüberkülü</h2>
<p class="intro">T2–T8’de kosta başı gövdedeki yarım fasetlerle, kosta tüberkülü ise transvers çıkıntıdaki fasetle eklemleşir. [[K5 s. 113–114]]</p>
${sekil('torasik','Gövdenin kenarından transvers çıkıntının ucuna')}
<p>İlk iki torasik gövde servikal geçiş özellikleri taşır, alt torasik gövdeler lomber omurlara benzer. [[K5 s. 113]] İnen aorta T5–T8 gövdelerinin sol yanını basıklaştırır, bu aort segmentinin anevrizması dört gövdede erozyona yol açar. [[K5 s. 113]]</p>
<p>Vertebral foramen küçük ve daireseldir. [[K5 s. 113]] Geniş laminalar üstten alta kiremit gibi örtüşür. [[K5 s. 114]] T1’in hemen hemen yatay spinöz çıkıntısı orta torasik bölgede yerini uzun, kaudale eğimli çıkıntılara bırakır. [[K5 s. 114]] T11 ve T12’de çıkıntı yeniden yataya yaklaşır, kısalır ve lomber tipte kare biçim alır. [[K5 s. 114]]</p>
<div class="note plain"><b>Bir kostanın iki temas noktası.</b> Yandan bakarken gövde üzerindeki fasetleri üst ve alt artiküler çıkıntıların fasetlerinden ayırın. [[K5 s. 109–110]] İlk grup kosta başına aittir, artiküler çıkıntıların yüzleri ise arkada ve farklı yönelimdedir. [[K5 s. 110]] [[K5 s. 113–114]] Atipik omurları tanımak için önce gövdedeki kosta fasetinin tam mı yarım mı olduğuna, sonra transvers çıkıntıda faset bulunup bulunmadığına bakın. [[K5 s. 114–115]]</div>
<h3>Atipik torasik omurlar</h3>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Düzey</th><th>Kosta eklemi ve ayırt edici özellik</th></tr></thead><tbody>
<tr><th>T1</th><td>Servikal tip gövde, belirgin üst çentik ve yatay spinöz çıkıntı taşır. [[K5 s. 114]] C7’de eş yarım faset bulunmadığından ilk kosta başı için üstte tam faset vardır, alttaki yarım faset küçüktür. [[K5 s. 114]]</td></tr>
<tr><th>T9</th><td>Genellikle tipik yapıdadır, ancak çoğu kez onuncu kosta başıyla eklemleşmez. [[K5 s. 114]] Böyle bir T9’da yalnız dokuzuncu kosta başına ait üst yarım faset görülür. [[K5 s. 114–115]]</td></tr>
<tr><th>T10</th><td>Yalnız onuncu kosta başıyla eklemleşir. [[K5 s. 114]] Üst yarım faset, T9’da karşılığı yoksa tam faset biçimindedir. [[K5 s. 114]] Transvers çıkıntıdaki faset bulunmayabilir. [[K5 s. 114]]</td></tr>
<tr><th>T11</th><td>Gövdenin üst kenarına yakın dairesel faset yalnız kendi kosta başını karşılar, küçük transvers çıkıntıda faset yoktur. [[K5 s. 114]]</td></tr>
<tr><th>T12</th><td>Lomber tipteki gövdede üst kenarın altında tam faset yer alır. [[K5 s. 114]] Küçük transvers çıkıntı fasetsizdir, üst, alt ve lateral tüberküller taşır. [[K5 s. 114]] Alt artiküler faset dışa bakar, spinöz çıkıntı yataydır. [[K5 s. 114]]</td></tr>
</tbody></table></div>
<p><a href="https://atlas.anesthesiabriefs.com/nerve-block/?blok=esp">Sinir Bloğu Atlası · Erektör spina plan bloğu</a></p></section>

<section class="wrap blk ders-sec" id="an03a-bel"><h2>Lomber omur ve interlaminar pencere</h2>
<p class="intro">Lomber omurda büyük gövdenin arkasındaki laminalar torasik bölgedeki gibi üst üste binmez. [[K5 s. 114–115]]</p>
${sekil('lomber','L3’te gövdeden spinöz çıkıntıya')}
<ul class="an03a-liste">
<li><b>Küçük çıkıntılar.</b> Aksesuar çıkıntı transvers çıkıntı tabanının arka-alt yüzündedir, mamiller çıkıntı üst eklem çıkıntısına komşudur. [[K5 s. 115]]</li>
<li><b>L5’i ayıran biçim.</b> Gövde önde arkadan daha yüksektir, bu kama biçimi lumbosakral açıyı oluşturur. [[K5 s. 115]] Kısa, kalın ve sağlam transvers çıkıntılar hem arktan hem gövdenin yanından çıkar. [[K5 s. 115–116]]</li>
<li><b>Arkadan bakış.</b> Eklemleşmiş omurgada laminalar ve spinöz çıkıntılar birbirine geçerek alt lomber bölge dışında kanalı örter. [[K5 s. 115]] Öne fleksiyonla laminalar arası aralık genişler; bu özellikler bir araya gelince lomber ponksiyon mümkün olur. [[K5 s. 115]]</li></ul>
<h3>Üç bölgeyi aynı işaretlerle karşılaştırın</h3>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>İşaret</th><th>Üstten ya da yandan ne aranır?</th></tr></thead><tbody>
<tr><th>Gövde</th><td>Tipik servikal omurda küçük ve yassı gövdeyi, torasik omurda kalp biçimini ve kosta başı fasetlerini, lomber omurda büyük böbrek biçimli gövdeyi arayın. [[K5 s. 109]] [[K5 s. 113–114]]</td></tr>
<tr><th>Merkezî açıklık</th><td>Üçgen bir foramen hem boyunda hem belde karşınıza çıkabilir. [[K5 s. 109]] [[K5 s. 114]] Lomber açıklık boyundakinden daha küçük, torasik bölgenin dairesel açıklığından daha büyüktür. [[K5 s. 113–114]]</td></tr>
<tr><th>Üst artiküler yüz</th><td>Arkaya bakan yüzün ikinci yönünü izleyin. [[K5 s. 109]] [[K5 s. 114–115]] Tipik servikal omurda yukarı, torasik omurda dışa, lomber omurda ise içe yönelir. [[K5 s. 109]] [[K5 s. 114–115]]</td></tr>
<tr><th>Arka çıkıntı</th><td>Kısa ve çift uçlu spinöz çıkıntı tipik servikal omuru düşündürür. [[K5 s. 110]] Kaudale uzanan uzun çıkıntı orta torasik bölgeyi, yatay ve dikdörtgene yakın biçim lomber bölgeyi gösterir. [[K5 s. 114–115]]</td></tr>
</tbody></table></div></section>

<section class="wrap blk ders-sec" id="an03a-yuzey"><h2>Palpasyonla düzey bulma</h2>
<p class="intro">Boyunda ense oluğu, belde iliak krestlerin en yüksek noktaları omur düzeyini bulmaya yardım eder. [[K5 s. 111]] [[K5 s. 118–119]]</p>
${sekil('isaret','Ense oluğundan ve interkristal çizgiden düzeyi okuyun')}
<p>Erişkinde omurilik genellikle L1’de sonlanır, ancak L2’ye, hatta L3’e uzanabilir. [[K5 s. 119]] Bu nedenle tanısal ya da anestezi amaçlı spinal iğne, istisnai durumlar dışında L3/4’ün üzerinden ilerletilmez. [[K5 s. 119]]</p></section>

<section class="wrap blk ders-sec" id="an03a-giris"><h2>Kemik aralıktan dural kılıfa</h2>
<p class="intro">Orta hattan yaklaşırken spinöz çıkıntıların eğimi iğnenin yönünü, lomber fleksiyon ise giriş aralığının genişliğini belirler. [[K5 s. 114–115]] [[K5 s. 118]]</p>
${sekil('yaklasim','Orta torasik ve lomber aralığı karşılaştırın')}
<div class="an03a-kartlar">
<div class="card"><h3>Orta hat</h3><p>Lomber ponksiyon veya spinal anestezi için hasta genellikle yan yatar ya da oturur ve belini olabildiğince büker. [[K5 s. 118]]</p></div>
<div class="card"><h3>Paramedyan giriş</h3><p>Bazı merkezlerde lomber ponksiyon, spinal veya epidural anestezi için lateral yaklaşım tercih edilir. [[K5 s. 119]] Fleksiyon kısıtlıysa veya supraspinöz ve interspinöz bağların kalsifikasyonu geçişi güçleştiriyorsa özellikle yararlı olabilir. [[K5 s. 119]] Üst torasik epiduralde orta hattın gerektirdiği dik sefalad açıdan kaçınmayı sağlar. [[K5 s. 119]]</p>
<p>Yaygın tariflerden birinde giriş, spinöz çıkıntının alt kenarının yaklaşık 1,5 cm lateralindedir. [[K5 s. 120]] İğne başa ve hafif mediale yöneltilir. [[K5 s. 120]] Laminaya değerse küçük adımlarla başa kaydırılarak sarı bağ geçilir, ardından epidural ya da subaraknoid aralığa ulaşılabilir. [[K5 s. 120]]</p></div></div>
</section>
<section class="wrap blk ders-sec" id="an03a-katmanlar"><h2>Orta hat ponksiyonunda doku katmanları</h2>
${sekil('katman','Orta hatta hangi katman geçilir?')}
<h3>Görüntüleme ve klinik kullanım</h3>
<ul class="an03a-liste"><li>Bağlardan geçişte direncin değişimini ve kemiklerle sinir dokusu ve dural kılıfın ilişkisini bilmek gerekir. [[K5 s. 109]] Bazı anestezistler spinal enjeksiyona yardımcı olarak ultrason veya X ışını kullanır. [[K5 s. 109]]</li>
<li>Orta hat kesitinde disk ile gövdelerin ön ve arka longitudinal bağları, ponksiyon katmanlarına göre daha önde görülür. [[K5 s. 119]]</li>
<li>Omurga kaynaklı kronik ağrıda faset ekleme giden medial dal lokal anestezikle bloke edilebilir. [[K5 s. 117]] Yeterli rahatlama sağlanırsa radyofrekans denervasyon uygulanabilir, blok iğneleri ön-arka ve yan floroskopide izlenebilir. [[K5 s. 117–118]]</li>
<li>Kitap, Birleşik Krallık’ta sezaryenlerin büyük bölümünde spinal anestezi uygulandığını ve sıklıkla intratekal diamorfin eklendiğini bildirir. [[K5 s. 119]]</li></ul></section>

<section class="wrap blk ders-sec" id="an03a-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
<p>Her önermeyi ayrı değerlendirin, ardından gerekçeyi açın.</p>
<div class="viz"><div data-viz="mtf" data-q="an03a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an03a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="an03a-3"></div></div></section>
<section class="wrap blk ders-sec" id="an03a-p2"><h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Oturur konumdaki bir erişkinde lomber ponksiyon planlıyorsunuz. Aralığı nasıl seçersiniz? Fleksiyonun neden işe yaradığını ve orta hattan hangi yapılardan geçeceğinizi anlatın.</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>İki iliak krestin en yüksek noktalarını birleştiren çizgi genellikle L4 gövdesini gösterir. [[K5 s. 118–119]] Üstündeki aralık genellikle L3/4, altındaki L4/5’tir. [[K5 s. 119]]</li>
<li>Omurilik genellikle L1’de sonlansa da L3’e kadar uzanabilir, bu nedenle istisnalar dışında L3/4’ün üzerine çıkılmaz. [[K5 s. 119]]</li>
<li>Öne fleksiyonda spinöz çıkıntılar birbirinden uzaklaşır ve laminalar arasındaki pencere genişler. [[K5 s. 115]] [[K5 s. 118]]</li>
<li>Deri ve deri altından sonra sırasıyla supraspinöz bağ, interspinöz bağ, sarı bağ ve dura geçilir. [[K5 s. 119]] Stile çekilince bağlantı ucunda beyin omurilik sıvısı görülmelidir. [[K5 s. 119]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> İki lomber omuru yandan gösterin, aradaki sarı bağı ve onun önündeki durayı işaretleyin. [[K5 s. 117–119]] Orta torasik spinöz çıkıntıların eğimini yanına çizin. [[K5 s. 114]]</div>
<div class="note plain"><b>Ek sorular.</b> Fleksiyonu kısıtlı bir hastada paramedyan giriş neden avantaj sağlayabilir? [[K5 s. 119–120]] C7 ile T1’i ense oluğunda nasıl ayırırsınız? [[K5 s. 111]] T10’daki fasetin tam veya yarım oluşunu ne belirler? [[K5 s. 114]]</div></div></section>
<section class="wrap blk ders-sec" id="an03a-ozet"><h2>Özet</h2><ul class="ozet">
<li>C1’i gövdesiz halka, C2’yi dens, C7’yi sağlam ve bifid olmayan spinöz çıkıntı tanıtır. [[K5 s. 110–111]]</li>
<li>Torasik gövde kosta başıyla, tipik transvers çıkıntının ucu kosta tüberkülüyle eklemleşir. [[K5 s. 113–114]]</li>
<li>Orta torasik spinöz çıkıntılar kaudale eğilir, lomber çıkıntılar yatay uzanır. [[K5 s. 114–115]]</li>
<li>İnterkristal çizgi genellikle L4’ü gösterir, öne fleksiyon interlaminar aralığı genişletir. [[K5 s. 115]] [[K5 s. 118–119]]</li></ul>
<div data-viz="tamam" data-modul="anatomi" data-bolum="03a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/02b">← Kalbin gelişimi, fetal dolaşım ve boynun büyük venleri</a><a href="#/dersler/anatomi/03b">Sonraki: Sakrum, omur anomalileri ve omurlar arası bağlar →</a></nav>
</section>`
  };
})();
