VERI.sorular = VERI.sorular || {};
VERI.sorular['an06d-1'] = {
  no: 1, kok: 'Abdusensin seyri ve işlevi', kagit: 'Paper A · Uygulamalı anatomi', kaynak: '[[K5 s. 275]]',
  onermeler: [
    { t: 'Kavernöz sinüste VI, internal karotid arterin medialindedir.', d: false, n: 'Sinir arterin lateralinden geçer. [[K5 s. 275]]' },
    { t: 'VI, pons ile medullanın birleşiminden çıkar.', d: true, n: 'Pontin tegmentumu geçen lifler bu birleşimde beyin tabanına ulaşır. [[K5 s. 275]]' },
    { t: 'VI, tendinöz halkayı III. sinirin üzerinden geçer.', d: false, n: 'Halkada III. sinirin hemen altındadır. [[K5 s. 275]]' },
    { t: 'VI, lateral rektusa derin yüzünden girer.', d: true, n: 'Sinirin orbitadaki hedefi lateral rektusun derin yüzüdür. [[K5 s. 275]]' },
    { t: 'Tek taraflı VI hasarı karşı gözün abdüksiyonunu engeller.', d: false, n: 'Abdüksiyon kaybı hasarla aynı taraftadır. [[K5 s. 275]]' }
  ]
};
VERI.sorular['an06d-2'] = {
  no: 2, kok: 'Fasiyal sinirin dalları ve komşulukları', kagit: 'Paper A · Uygulamalı anatomi', kaynak: '[[K5 s. 276–278]]',
  onermeler: [
    { t: 'Büyük petrozal sinir, fasiyal sinirin genu düzeyinde ayrılır.', d: true, n: 'Lakrimal beze giden lifler genikulat ganglion düzeyinde ayrılır. [[K5 s. 276]]' },
    { t: 'Korda timpani, dilin ön üçte ikisinin tat liflerini taşır.', d: true, n: 'Bu tat lifleri lingual sinirle bağlantı kuran korda timpani içinde seyreder. [[K5 s. 276]]' },
    { t: 'Fasiyal sinirin terminal dalları parotisin yüzeyel yüzünden çıkar.', d: false, n: 'Dallar bezin kenarlarından çıkar. [[K5 s. 278]]' },
    { t: 'Mandibular dal çene açısının altında platismaya yüzeyeldir.', d: false, n: 'Bu kesimde dal platismanın derininde seyreder. [[K5 s. 278]]' },
    { t: 'Parotiste fasiyal dallar retromandibular vene yüzeyeldir.', d: true, n: 'Hem retromandibular ven hem eksternal karotis arter sinir dallarının derinindedir. [[K5 s. 278]]' }
  ]
};
VERI.sorular['an06d-3'] = {
  no: 3, kok: 'Koklear ve vestibüler yollar', kagit: 'Paper A · Uygulamalı anatomi', kaynak: '[[K5 s. 280–281]]',
  onermeler: [
    { t: 'Trapezoid cismi dorsal koklear çekirdekten çıkan lifler oluşturur.', d: false, n: 'Dorsal çekirdeğin lifleri işitme çizgilerini, ventral çekirdeğinkiler trapezoid cismi oluşturur. [[K5 s. 280]]' },
    { t: 'İnferior kollikulus işitme reflekslerine katılır.', d: true, n: 'Buradan kraniyal motor çekirdeklere uzanan lifler refleks yolunu kurar. [[K5 s. 280]]' },
    { t: 'İşitme radyasyonu süperior temporal girusa ulaşır.', d: true, n: 'Medial genikulat cisimden çıkan lifler bu girustaki işitme korteksine gider. [[K5 s. 280–281]]' },
    { t: 'Bazı vestibüler lifler vestibüler çekirdekleri atlayıp serebelluma gider.', d: true, n: 'Bu lifler inferior serebellar pedinkülden geçer. [[K5 s. 281]]' },
    { t: 'Koklear bölüm lezyonunda tinnitus olmadan işitme kaybı görülebilir.', d: true, n: 'Koklear hasarda işitme kaybına tinnitus eşlik edebilir. [[K5 s. 281]]' }
  ]
};
const AN06D_NAV = [['orbita','Abdusens'],['pons','Fasiyal çekirdekler'],['temporal','Temporal kemik'],['parotis','Parotis ve dallar'],['yuz','Fasiyal paralizi'],['labirent','İşitme ve denge'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
SAYFALAR['dersler/anatomi/06d'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 6 · Ders 06d', baslik: 'Abdusens, fasiyal ve vestibülokoklear sinirler',
  lede: 'Çift gören bir hastada göz hareketini, yüzü asimetrik bir hastada alın ve ağız hareketlerini karşılaştırın. [[K5 s. 275–279]] Yüz felcine tat ve işitme kaybının eşlik etmesi lezyonun yerini düşündürür. [[K5 s. 279]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${AN06D_NAV.map(([id, ad]) => `<button type="button" data-scroll="an06d-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="an06d-orbita">
<h2>Abdusens ve gözün dışa bakışı</h2>
<p class="intro">Abdusens de troklear sinir gibi tek bir göz kasını uyarır. [[K5 s. 275]] VI hasarında lateral rektus çalışamaz, etkilenen gözün abdüksiyonu (lateral deviasyon) mümkün olmaz. [[K5 s. 275]]</p>
<div class="viz"><div data-viz="an06d_orbita"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Önce resimde kasta sonlanan ince siniri bulun. Gözün dışa hareketi kaybolduğunda bu tek kasın innervasyonu ile hastanın tarif ettiği çift görme arasında bağ kurabilirsiniz. [[K5 s. 275]] Şimdi aynı siniri beyin sapından başlayarak üç durakta izleyin.</p>
<ol class="iskelet"><li><b>Pons.</b> Somatik efferent sütundaki VI çekirdeği dördüncü ventrikül tabanının hemen derinindedir. [[K5 s. 275]] Lifleri pontin tegmentumu geçip pons ile medullanın birleşiminde beyin tabanına çıkar. [[K5 s. 275]]</li>
<li><b>Kavernöz sinüs.</b> Öne ilerleyen VI, sinüs içinde internal karotid arterin lateralinde, III, IV ve V’in medialinde kalır. [[K5 s. 275]]</li>
<li><b>Orbita.</b> Tendinöz halkayı III’ün hemen altından geçer ve lateral rektusa derin yüzünden girer. [[K5 s. 275]]</li></ol>
<p>Uzun, oblik intrakraniyal seyri VI’yı kafa tabanı yaralanmalarına açık kılar. [[K5 s. 275]] Hastada diplopi ve konverjan şaşılık görülür. [[K5 s. 275]]</p>
<aside class="note plain"><b>Atlas notu.</b> Kitap VI çekirdeğinin ponsun üst kısmında olduğunu söyler; doğrusu kaudal (alt) ponstur. [[K5 s. 275]]</aside>
</section>
<section class="wrap blk ders-sec" id="an06d-pons"><h2>Fasiyal sinir hangi lifleri taşır?</h2>
<p class="intro">VII’nin mimik, salgı ve tat işlevlerinin her birinin ayrı bir çekirdek bağlantısı vardır. [[K5 s. 275–276]]</p>
<div class="viz"><div data-viz="an06d_pons"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Resimdeki kabartı fasiyal sinirin çekirdeğini göstermez. [[K5 s. 276]] Kabartının altında VI’nın çekirdeği, onun üzerinden geçen kıvrımda ise VII’nin motor lifleri vardır. [[K5 s. 275–276]] Bu iki yapıyı ayırdıktan sonra VII’nin liflerini işlevlerine göre izleyin.</p>
<dl class="an06d-iliskiler"><div><dt>Mimik · brankiyal efferent</dt><dd>Motor çekirdek alt ponsun retiküler formasyonunda, V’in spinal traktus çekirdeğinin ventromedialindedir. [[K5 s. 276]] Motor korteksten kortikobulber lifler alır. [[K5 s. 276]] Alt bölümü üst yüzü yönetir ve iki hemisferden lif alır. [[K5 s. 276]] Üst bölümü alt yüzü yönetir ve yalnız karşı hemisferden lif alır. [[K5 s. 276]]</dd></div>
<div><dt>Salgı · genel visseral efferent</dt><dd>Üst salivator çekirdek pontin retiküler formasyonda, motor çekirdeğin dorsolateralindedir. [[K5 s. 276]] Sekretomotor lifler lakrimal, submandibular ve sublingual bezlere gider. [[K5 s. 275–276]]</dd></div>
<div><dt>Tat · özel visseral afferent</dt><dd>Dilin ön üçte ikisinden gelen tat liflerinin ilk hücre durağı genikulat gangliondur. [[K5 s. 276]] Merkezi uzantılar traktus solitarius çekirdeğinin üst bölümüne gelir. [[K5 s. 276]] Buradan lifler çapraz yapıp karşı talamusun lateral çekirdeğine, ardından postsantral duyu korteksinin yüz alanına ulaşır. [[K5 s. 276]]</dd></div></dl>
<p>Motor lifler VI çekirdeği üzerinden dönerek fasiyal kollikulusu oluşturur. [[K5 s. 276]] Aşağı ve öne yönelip ponsun alt kenarından, oliva ile inferior serebellar pedinkül arasından çıkarlar. [[K5 s. 276]] Küçük duyu kökü <i>nervus intermedius</i>, medialindeki VII motor kökü ile lateralindeki VIII arasında belirir. [[K5 s. 276]]</p>
<details><summary>Pons kesitinde diğer işaretler</summary><p>K5’in enine kesitinde üst serebellar pedinkül, medial lemniskus ve piramidal traktus da seçilir. [[K5 s. 275]] V’in spinal traktusu, mezensefalik, ana duyu ve motor çekirdekleri aynı çizimde işaretlenmiştir. [[K5 s. 275]]</p></details></section>
<section class="wrap blk ders-sec" id="an06d-temporal"><h2>İç işitme kanalından stilomastoid foramene</h2>
<p class="intro">VII’nin iki kökü iç işitme kanalına VIII ile girer, kanalın dibinde VIII’den ayrılıp fasiyal kanala geçer. [[K5 s. 276]]</p>
<div class="viz"><div data-viz="an06d_temporal"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Kemik üzerinde önce kalın mastoid çıkıntıyı, ardından ince stiloid çıkıntıyı bulun. Aralarındaki küçük açıklık, ana gövdenin orta kulak komşuluğundan yüz bölgesine geçtiği yerdir. [[K5 s. 276–277]] Siniri bu çıkışa kadar izlerken gözyaşı, tat ve tükürük liflerinin hangi noktada gövdeden ayrıldığına dikkat edin. [[K5 s. 276]]</p>
<ol class="iskelet"><li><b>Genu.</b> Sinir vestibülün üzerinden laterale, epitimpanik resesin medial duvarına ilerler ve orta kulağın promontoryumu üzerinde keskin biçimde arkaya döner. [[K5 s. 276]] Bu kıvrımda genikulat ganglion bulunur ve lakrimal bezin sekretomotor lifleri büyük petrozal sinirle ayrılır. [[K5 s. 276]]</li>
<li><b>Arka duvar.</b> VII timpanik boşluğun kemik arka duvarında stilomastoid foramene doğru iner. [[K5 s. 276]] Temporal kemikteki dağılımında stapedius dalı ve vestibül penceresi de ayırt edilir. [[K5 s. 277]]</li>
<li><b>Korda timpani.</b> Foramenden hemen önce ayrılıp zarın derin yüzüne yakın bir noktada arka duvarı deler. [[K5 s. 276]] Mukoza altında, zarın pars flaccida bölümü ve malleus boynu üzerinden öne geçer. [[K5 s. 276]] Petrotimpanik fissürün iç ucundaki kanalcıktan orta kulağı önde terk eder. [[K5 s. 276]]</li>
<li><b>Lingual sinirle birleşme.</b> Korda timpani kafa tabanının yaklaşık 2,5 cm altında lingual sinire katılır. [[K5 s. 276]] Dilin ön üçte ikisinden tat taşır ve sekretomotor lifleri submandibular gangliona götürür. [[K5 s. 276]]</li></ol>
<details><summary>Gözyaşı ile tükürük lifleri nerede ayrılır?</summary><p>Gözyaşı için yönü genuda değiştirin ve büyük petrozal siniri izleyin. [[K5 s. 276]] Submandibular ve sublingual bezlerin sekretomotor lifleri için ise inen gövdeyi kordaya kadar izleyin. [[K5 s. 276]] Korda timpaninin lingual sinirle birleştiği nokta, orta kulağı terk ettiği noktanın dışındadır. [[K5 s. 276]]</p></details>
<p>Stilomastoid foramenden çıkan ana gövde artık yalnız motor lif taşır. [[K5 s. 277]] Terminal dallanmadan önce üç dal ayrılır. [[K5 s. 277]]</p>
<ul class="ozet"><li><b>Posterior auriküler sinir</b> mastoid üzerinden arkaya geçer, auriküler dalıyla kulağın dış kaslarına, oksipital dalıyla oksipitofrontalisin oksipital karnına ulaşır. [[K5 s. 277]]</li><li><b>Digastrik dal</b> digastrik kasın arka karnına gider. [[K5 s. 277]]</li><li><b>Stilohiyoid dal</b> stilohiyoid kası uyarır. [[K5 s. 277]]</li></ul></section>
<section class="wrap blk ders-sec" id="an06d-parotis"><h2>Parotis içinde dallanma</h2>
<p class="intro">Parotis cerrahisinde gövdeyi ararken mastoid çıkıntı ile kemik dış işitme kanalı arasındaki aralık yol gösterir. [[K5 s. 277]]</p>
<div class="viz"><div data-viz="an06d_parotis"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Resimde bez dokusunda açılan pencereden gövdeyi ve öne yayılan dalları izleyin. Göz çevresine ulaşan iki dalı ayırmak için izlerini geriye, zigomatik ark ve zigomatik kemiğe kadar sürün. [[K5 s. 278]]</p>
<dl class="an06d-iliskiler"><div><dt>Gövde ve damarlar</dt><dd>Gövde stiloid çıkıntının, eksternal karotisin ve retromandibular venin lateralinden dolaşarak beze arkadan girer. [[K5 s. 277]] Bez içindeki dallar da bu iki damarın yüzeyelinde kalır. [[K5 s. 278]] Retromandibular veni yüzeyel temporal ve maksiller venler oluşturur. [[K5 s. 278]]</dd></div>
<div><dt>İki ana bölüm</dt><dd>Gövde genellikle beze girdikten hemen sonra, bazen girmeden ikiye ayrılır. [[K5 s. 277]] Temporofasiyal bölüm temporal ve zigomatik dalları, daha küçük servikofasiyal bölüm mandibular ve servikal dalları verir. [[K5 s. 277]] Bukkal dal her iki bölümden de çıkabilir. [[K5 s. 277]]</dd></div>
<div><dt>Dalların çevresindeki bez</dt><dd>Parotis bukkal bir divertikül olarak sinirin çatalına doğru büyür, gövdeleri örter ve siniri içine alır. [[K5 s. 277]] Yüzeyel ve derin loblar dalların hem çevresinde hem aralarında kaynaşır. [[K5 s. 277]] İki sinir bölümü ayrı kalabilir veya pleksus oluşturabilir. [[K5 s. 277–278]] En sık, diseksiyonda zarar vermeden kesilebilen çapraz bağlantılar görülür. [[K5 s. 278]]</dd></div></dl>
<h3>Daldan kasa</h3>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Dal</th><th>Seyri ve hedefi</th></tr></thead><tbody>
<tr><th scope="row">Temporal</th><td>Zigomatik arkı çaprazlar ve kulak kaslarına, oksipitofrontalisin frontal karnına, orbikülaris okuliye dallar verir. [[K5 s. 278]]</td></tr>
<tr><th scope="row">Zigomatik</th><td>Zigomatik kemiği aşarak orbikülaris okuliye gider. [[K5 s. 278]]</td></tr>
<tr><th scope="row">Bukkal</th><td>Yanakta yatay olarak öne uzanır, buksinatör ile dudak kaslarını uyarır. [[K5 s. 278]]</td></tr>
<tr><th scope="row">Mandibular</th><td>Mandibula yüzeyinden alt dudak ve çene kaslarına ulaşır. [[K5 s. 278]]</td></tr>
<tr><th scope="row">Servikal</th><td>Aşağı ve öne doğru boyna iner, platismaya dağılır. [[K5 s. 278]]</td></tr>
</tbody></table></div>
<p>Terminal dalların tümü bezin kenarlarından çıkar. [[K5 s. 278]] Bu nedenle yüzeyel yüzün tamamı sinir zedelenmeden açığa çıkarılabilir. [[K5 s. 278]]</p>
<p><b>Mandibular dalı izleyin.</b> Çene açısının altında platismanın derininde seyreder, digastrik üçgende submandibular bezin yüzeyinden geçer, sonra mandibula üzerinden öne döner. [[K5 s. 278]] Bez eksizyonunda, boynun blok diseksiyonunda veya aynı bölgenin diğer ameliyatlarında zedelenebilir. [[K5 s. 278]] Depresör anguli oris felci nedeniyle aynı tarafta ağız köşesi belirgin yükselir. [[K5 s. 278]]</p>
<details><summary>Parotisin yatay kesitinde yön bulma</summary><p>K5’in parotis kesitinde mandibula, masseter, medial pterigoid ve farenksin üst konstriktörü işaretlenmiştir. [[K5 s. 279]] Mastoid, digastrik arka karın ve sternokleidomastoid diğer kas ve kemik işaretleridir. [[K5 s. 279]] K5 aynı kesitte iç karotisi, iç juguler veni, vagusu ve sempatik zinciri de gösterir. [[K5 s. 279]]</p></details></section>
<section class="wrap blk ders-sec" id="an06d-yuz"><h2>Fasiyal paralizide lezyon düzeyi</h2>
<p class="intro">Alt yüz güçsüzlüğüne üst yüzün katılıp katılmadığı, kortikobulber yolun hasarını çekirdek veya sinir hasarından ayırmaya yardım eder. [[K5 s. 278–279]]</p>
<div class="viz"><div data-viz="an06d_yuz"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Hastanın sağ ve sol alın hareketlerini karşılaştırdıktan sonra ağız köşelerine bakın. Resimde sol üst ve alt yüz birlikte etkilenmiştir. [[K5 s. 278–279]] Nükleer ve infranükleer paralizilerin ikisinde de bir yüz yarısının tüm kasları etkilenir. [[K5 s. 278]] Bu yüzden tam paralizi yalnız supranükleer lezyonu dışlar. [[K5 s. 278–279]]</p>
<dl class="an06d-iliskiler"><div><dt>Supranükleer</dt><dd>Tek taraflı kortikal lezyonda karşı alt yüz etkilenir. [[K5 s. 276]] Üst yüz iki hemisferden uyarı aldığından göz aralığının üstündeki kaslar korunur. [[K5 s. 279]] Hasta istemli hareketi yapamasa da yüz kaslarını istemsiz kullanabilir. [[K5 s. 279]] En sık neden, serebral kanama gibi kortikobulber yolları etkileyen damar hastalıklarıdır. [[K5 s. 279]]</dd></div>
<div><dt>Nükleer</dt><dd>Bir yüz yarısındaki kasların tümü etkilenir. [[K5 s. 278]] Poliomiyelit ve diğer bulber paraliziler örnektir. [[K5 s. 279]]</dd></div>
<div><dt>İnfranükleer</dt><dd>Aynı tarafta üst ve alt yüz birlikte felç olur. [[K5 s. 278]] Serebellopontin açıda akustik nörinom basısı, temporal kemik kırığı veya malign parotis tümörü invazyonu neden olabilir. [[K5 s. 279]] Fasiyal paralizinin açık ara en sık nedeni Bell paralizisidir. [[K5 s. 279]] Etiyolojisi bilinmez, ancak viral köken olasıdır. [[K5 s. 279]]</dd></div></dl>
<p>İntrakraniyal tutulumda veya kafa tabanı kırığında yüz felcine genellikle ön üçte ikide tat kaybı ve işitme kaybı eklenir. [[K5 s. 279]] Tat kaybı korda timpani, işitme kaybı VIII hasarını düşündürür. [[K5 s. 279]]</p></section>
<section class="wrap blk ders-sec" id="an06d-labirent"><h2>VIII. sinir ile işitme ve denge</h2>
<p class="intro">Koklear lifler işitme bilgisini taşır, vestibüler lifler ise denge ve göz-boyun reflekslerine katılır. [[K5 s. 279–281]]</p>
<div class="viz"><div data-viz="an06d_labirent"></div><p class="viz-cap" aria-live="polite"></p></div>
<p>Spiral biçimli kokleaya giden dalı bulun, sonra yanındaki vestibüler dalı izleyin. İki bölüm iç kulakta birbirine yakın olsa da medullada farklı çekirdeklerde sonlanır. [[K5 s. 280–281]] İşitme kaybı olan bir hastada önce koklear bölümü, vertigo ve nistagmusu olan bir hastada vestibüler bağlantıları düşünün. [[K5 s. 281]]</p>
<h3>Sesi kortekse kadar izleyin</h3>
<ol class="iskelet"><li>Kokleadaki bipolar spiral ganglion hücrelerinin santral uzantıları iç işitme kanalından medullanın lateral yüzüne gelir ve dorsal ile ventral koklear çekirdeklerde sonlanır. [[K5 s. 280]]</li>
<li>Çekirdeklerden çıkan liflerin çoğu çapraz yapar. [[K5 s. 280]] Dorsal lifler dördüncü ventrikül tabanında işitme çizgilerini, ventral lifler ventral ponsta trapezoid cismi oluşturur. [[K5 s. 280]] Çoğu aynı ya da karşı tarafta trapezoid cisimle ilişkili çekirdeklerde sonlanır. [[K5 s. 280]]</li>
<li>Yol lateral lemniskus içinde inferior kollikulusa veya medial genikulat cisme yükselir. [[K5 s. 280]] İnferior kollikulustan kraniyal motor çekirdeklere giden lifler işitme reflekslerini sağlar. [[K5 s. 280]] Medial genikulat cisimden çıkanlar işitme radyasyonuyla laterale, süperior temporal girustaki işitme korteksine ulaşır. [[K5 s. 280–281]]</li></ol>
<p>Koklear sinir lezyonunda işitme azalır, tinnitus bulunabilir. [[K5 s. 281]] Daha merkezi, tek taraflı bir lezyon işitme keskinliğini genellikle pek azaltmaz, çünkü projeksiyonlar iki taraflıdır. [[K5 s. 281]] Temporal lob tümörü işitme radyasyonuna veya süperior temporal girusa uzanırsa işitsel halüsinasyonlar gelişebilir. [[K5 s. 281]]</p>
<details><summary>Sesi duymakla sese refleks yanıt vermek hangi düzeyde ayrılır?</summary><p>Lateral lemniskustan sonraki iki hedefi karşılaştırın. [[K5 s. 280]] İnferior kollikulus sesi bir motor yanıta bağlayan yolun durağıdır. [[K5 s. 280]] Medial genikulat cisimden sonra ise lifleri kortekse kadar izleyebilirsiniz. [[K5 s. 280–281]] Bu nedenle bir temporal lob tümörünün işitsel halüsinasyona yol açmasını açıklarken radyasyon ile korteksin yerini belirtin. [[K5 s. 281]]</p></details>
<h3>Denge bilgisinin üç hedefi</h3><p>Vestibüler lifler koklear bölümün hemen medialinden medullaya girerek vestibüler çekirdeklere ulaşır. [[K5 s. 281]]</p>
<ul class="ozet"><li><b>Serebellum.</b> Çekirdeklerden çıkan liflerin önemli bir bölümü inferior serebellar pedinkülden geçer. [[K5 s. 281]] Çekirdeklere uğramadan serebelluma giden lifler de onlara katılır. [[K5 s. 281]]</li>
<li><b>Kraniyal motor çekirdekler.</b> Medial longitudinal demet III, IV, VI ve XI’in çekirdekleriyle bağlantı kurar. [[K5 s. 281]]</li>
<li><b>Üst servikal omurilik.</b> Vestibülospinal traktus bu düzeye ulaşır. [[K5 s. 281]] Kraniyal ve servikal bağlantılar göz ve boyun kaslarının vestibüler reflekslerini sağlar. [[K5 s. 281]]</li></ul>
<p>Vestibüler labirent veya vestibüloserebellar yol tutulduğunda vertigo, ataksi ve nistagmus ortaya çıkar. [[K5 s. 281]]</p></section>
<section class="wrap blk ders-sec" id="an06d-p1"><h2>Part I · Çoklu doğru/yanlış</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div class="viz"><div data-viz="mtf" data-q="an06d-1"></div></div><div class="viz"><div data-viz="mtf" data-q="an06d-2"></div></div><div class="viz"><div data-viz="mtf" data-q="an06d-3"></div></div></section>
<section class="wrap blk ders-sec" id="an06d-p2"><h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
<div class="card soe-soru"><h3>Açılış sorusu</h3><p>Submandibular bez eksizyonundan sonra hastanın sol ağız köşesi yükselmiş. Alın hareketleri simetrik. Hangi dalı düşünürsünüz? Cerrahi sahadaki seyrini ve santral yüz felcinden ayrımını açıklayın.</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet"><li>Sol mandibular dal yaralanmasını düşünürüm. [[K5 s. 278]]</li><li>Bu dal servikofasiyal bölümden gelir, çene açısının altında platismanın derininden geçer. [[K5 s. 277–278]]</li><li>Digastrik üçgende submandibular bezin yüzeyinde ilerlediği için eksizyonda risk altındadır. [[K5 s. 278]]</li><li>Depresör anguli oris felci ağız köşesinin aynı tarafta yükselmesini açıklar. [[K5 s. 278]]</li><li>Santral lezyonda karşı alt yüz etkilenir, üst yüz iki taraflı kortikal girdiyle korunur. [[K5 s. 276]] Bu olguda ameliyat sahası ile seçici kas kaybı aynı dalı işaret eder. [[K5 s. 278]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> Çene açısını, platismayı ve submandibular bezi yerleştirip mandibular dalın iki yapıyla derinlik ilişkisini gösterin. [[K5 s. 278]]</div><div class="note plain"><b>Olası ek sorular.</b> Parotiste VII’nin derininde hangi damarlar bulunur? [[K5 s. 278]] Tam yüz felcine tat ve işitme kaybı eklenmesi hangi düzeyi düşündürür? [[K5 s. 279]]</div></div></section>
<section class="wrap blk ders-sec" id="an06d-ozet"><h2>Özet</h2><ul class="ozet"><li>Kafa tabanı yaralanmasından sonra diplopiyle birlikte aynı tarafta abdüksiyon kaybı VI’yı düşündürür. [[K5 s. 275]]</li><li>VII’nin büyük petrozal dalı lakrimal salgıyla, korda timpani ise dilin ön üçte ikisinin tadı ve submandibular ganglionla ilişkilidir. [[K5 s. 276]]</li><li>Parotiste sinir dalları retromandibular ven ve eksternal karotise yüzeyeldir, bezi kenarlarından terk eder. [[K5 s. 278]]</li><li>Üst yüzün korunması supranükleer tutulumu, bir yüz yarısının bütünüyle etkilenmesi nükleer veya infranükleer tutulumu düşündürür. [[K5 s. 278–279]]</li><li>Koklear sinir lezyonu işitme kaybıyla, vestibüler labirent veya vestibüloserebellar yol lezyonu vertigo, ataksi ve nistagmusla kendini gösterir. [[K5 s. 281]]</li></ul>
<div data-viz="tamam" data-modul="anatomi" data-bolum="06d"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/06c">← Mandibular sinir ve ilişkili bloklar</a><a href="#/dersler/anatomi/06e">Sonraki: Glossofaringeal, vagus, aksesuar ve hipoglossal sinirler →</a></nav></section>`
};
