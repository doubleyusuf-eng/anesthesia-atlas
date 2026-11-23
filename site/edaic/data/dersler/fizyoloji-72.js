VERI.sorular = VERI.sorular || {};
/* Bölüm 72: özgün anlatım ve atlas için hazırlanmış sınav soruları. */
VERI.sorular['fiz72-1'] = {
  no: 1, kok: 'Endotel ve trombosit tıkacı için:', kagit: 'Paper A · Fizyoloji', kaynak: '[[K1 s. 341–344]]',
  onermeler: [
    {t: 'Endotelin salgıladığı ADPaz, trombosit aktivasyonunu sınırlar.', d: true, n: 'ADPaz, aktivasyon için gerekli ADP’yi parçalar. [[K1 s. 341]]'},
    {t: 'von Willebrand faktörü, dolaşımdaki faktör VIII’in yıkımını hızlandırır.', d: false, n: 'vWF faktör VIII’e bağlanır ve onu yıkımdan korur. [[K1 s. 342]]'},
    {t: 'Aktif trombositlerde Gp IIb/IIIa, fibrinojen aracılı agregasyona katılır.', d: true, n: 'Fibrinojen ve vWF, bu reseptör üzerinden trombositleri birbirine bağlar. [[K1 s. 342–343]]'},
    {t: 'Aspirin kesilince mevcut trombositler birkaç saat içinde yeni COX sentezler.', d: false, n: 'Çekirdeksiz trombosit yeni COX üretemez; geri dönüşsüz inhibisyon yaklaşık 7 günlük ömrü boyunca sürer. Saatler içinde enzimi yenileyebilen hücre endoteldir. [[K1 s. 343–344]]'},
    {t: 'Dipiridamolün trombosit cAMP düzeyini artırması ADP salımını azaltır.', d: true, n: 'Fosfodiesteraz inhibisyonu cAMP yıkımını azaltır; ADP salımı, agregasyon ve tromboksan sentezi baskılanır. [[K1 s. 344]]'}
  ]
};
VERI.sorular['fiz72-2'] = {
  no: 2, kok: 'Koagülasyon ve laboratuvar testleri için:', kagit: 'Paper A · Fizyoloji', kaynak: '[[K1 s. 344–347]]',
  onermeler: [
    {t: 'Klasik ekstrinsik yolun ilk aktive edilen faktörü XII’dir.', d: false, n: 'TF–VIIa ekstrinsik yolu başlatır; XII yüzey temasıyla başlayan intrinsik yoldadır. [[K1 s. 344]]'},
    {t: 'Faktör XIIIa fibrin lifleri arasında kovalent çapraz bağlar oluşturur.', d: true, n: 'Trombinin aktive ettiği XIII, fibrin ağını sağlamlaştırır. [[K1 s. 345]]'},
    {t: 'Hücre temelli modelin yayılma evresi aktive trombosit yüzeyinde gerçekleşir.', d: true, n: 'Aktif faktör ve kofaktörlerin bir araya geldiği bu yüzeyde bol trombin üretilir. [[K1 s. 346]]'},
    {t: 'Trombin zamanı ölçümünde plazmaya doku faktörü eklenir.', d: false, n: 'TT’de trombin eklenir; TF eklenerek ölçülen test PT’dir. [[K1 s. 346–347]]'},
    {t: 'Aktive protein C, protein S ile birlikte faktör Va ve VIIIa’yı aktive eder.', d: false, n: 'Bu kompleks Va ve VIIIa’yı inaktive ederek koagülasyonu sınırlar. [[K1 s. 341, 345]]'}
  ]
};
VERI.sorular['fiz72-3'] = {
  no: 3, kok: 'Antikoagülasyon ve fibrinoliz için:', kagit: 'Paper A · Fizyoloji', kaynak: '[[K1 s. 347–349]]',
  onermeler: [
    {t: 'Dabigatran doğrudan faktör Xa inhibitörüdür.', d: false, n: 'Dabigatran doğrudan trombini inhibe eder; rivaroksaban, apiksaban ve edoksaban Xa inhibitörleridir. [[K1 s. 347]]'},
    {t: 'Traneksamik asit plazminojenin plazmine dönüşümünü artırır.', d: false, n: 'Plazminojen aktivasyonunu engelleyerek fibrinolizi azaltır ve pıhtının korunmasına yardım eder. [[K1 s. 348–349]]'},
    {t: 'D-dimer çapraz bağlı fibrinin yıkım ürünüdür.', d: true, n: 'Plazmin fibrini parçalar; oluşan ürünlerden D-dimer venöz tromboemboli değerlendirmesinde kullanılır. [[K1 s. 348]]'},
    {t: 'İdarusizumab dabigatranın antikoagülan etkisini geri döndürebilir.', d: true, n: 'Dabigatrana özgü monoklonal antikor kökenli geri döndürücüdür; kitap hemodiyalizi de belirtir. [[K1 s. 348]]'},
    {t: 'Fizyolojik fibrinoliz, koagülasyondan daha yavaş ilerler.', d: true, n: 'Oluşum ile çözülme arasındaki gecikme doku iyileşmesine zaman tanır. [[K1 s. 348]]'}
  ]
};

(function () {
  const nav = [['denge','Hemostatik denge'],['tikac','Trombosit tıkacı'],['antiagregan','Antiagreganlar'],['caglayan','Klasik çağlayan'],['hucre','Hücre temelli model'],['kalitsal','Kalıtsal kanamalar'],['test','Pıhtılaşma testleri'],['antikoagulan','Antikoagülanlar'],['teg','Tromboelastografi'],['fibrinoliz','Fibrinoliz'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
  SAYFALAR['dersler/fizyoloji/72'] = {
    grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 7 · Bölüm 72', baslik: 'Hemostaz',
    lede: 'Kan kaybını durdurmak için damar daralır, trombosit tıkacı kurulur ve fibrinle sağlamlaştırılır. Endotel bu yanıtı hasarlı bölgeyle sınırlar; fibrinoliz ise iyileşme sırasında pıhtıyı çözer. [[K1 s. 341–342, 348]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${nav.map(([id,ad],i)=>`<button type="button" data-scroll="d72-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d72-denge">
<h2>Hemostaz: kanamayı durdur, akımı koru</h2>
<p class="intro">Hemostaz, kan kaybını durduran mekanizmaların bütünüdür; etkinliği trombositlerin, endotelin ve koagülasyon proteinlerinin birlikte sağlam olmasına bağlıdır. [[K1 s. 341]]</p>
<div class="viz"><div class="viz-head"><h3>Sağlam endotel ile hasarlı damar</h3></div><div data-viz="f72_denge"></div><p class="viz-cap" aria-live="polite">Sağlam yüzeyde üç fren: trombosit inhibisyonu, antikoagülasyon ve fibrinoliz; hasarda yerel pıhtı yanıtı başlar. [[K1 s. 341–342]]</p><p class="viz-foot">Seçenekleri karşılaştırın; şema anatomik ölçekli değildir.</p></div>
<p><b>Koagülasyon</b>, sıvı kanın katı bir jel oluşturmasıdır; kitap pıhtı oluşumunu <b>tromboz</b> olarak adlandırır. Hasarda hızlı yanıt yaşam kurtarır, fakat yaygınlaşırsa akımı kesebilir. Mikrodamarlardaki pıhtılar eritrositleri zedeleyerek mikroanjiyopatik hemolitik anemiye; yaygın damar içi pıhtılaşma (DIC) faktörleri tüketerek paradoksal kanamaya yol açabilir. [[K1 s. 341]]</p>
<p>Sağlam endotel akışkanlığı aktif biçimde korur: <b>NO ve prostasiklin (PGI₂)</b> trombositlerin yüzeye tutunmasını baskılar; <b>adenozin difosfataz (ADPaz)</b> aktivasyon sinyali olan ADP’yi parçalar. Hasarlı endotel ise aynı bölgede hemostatik yanıtın başlamasına katkı verir; denge bütün damar ağında değil, yaralanma yerinde değişmelidir. [[K1 s. 341]]</p>
<p>Endotel zarındaki <b>heparan sülfat</b> heparine benzer ve antitrombin III’ün etkisini artırır; antitrombin trombini (IIa) ve Xa’yı inaktive eder. <b>Trombomodülin</b> trombini bağlayarak pıhtılaştırıcı etkiden uzaklaştırır; oluşan kompleks protein C’yi aktive eder. Aktive protein C, kofaktörü protein S ile birlikte Va ve VIIIa’yı inaktive eder. [[K1 s. 341]]</p>
<p>Üçüncü koruma endotel kaynaklı <b>doku plazminojen aktivatörüdür (t-PA)</b>: plazminojenden plazmin oluşturur, plazmin yüzeydeki fibrini yıkar. Hasarda denge tersine döner: önce vazokonstriksiyon akımı ve kan kaybını azaltır, gelişen tıkacın sürüklenmesini önler; trombosit agregasyonunu izleyen fibrin ağı tıkacı kararlı bir pıhtıya dönüştürür. [[K1 s. 341–342]]</p>
</section>

<section class="wrap blk ders-sec" id="d72-tikac">
<h2>Trombosit tıkacı: tutunma, çağırma, köprü kurma</h2>
<p class="intro">Hasar kollajeni ve doku faktörünü kanla buluşturur; vWF trombositleri yaraya tutundururken trombin bu yanıtı güçlendirir. [[K1 s. 342]]</p>
<div class="viz"><div class="viz-head"><h3>Yumuşak tıkaç nasıl sağlamlaşır?</h3></div><div data-viz="f72_tikac"></div><p class="viz-cap" aria-live="polite">Kollajen–vWF teması ilk trombositleri tutar; ADP yeni trombositleri çağırır, Gp IIb/IIIa köprüleri tıkacı büyütür. [[K1 s. 342–343]]</p><p class="viz-foot">Adımları ilerletin; son adımda fibrin desteği eklenir.</p></div>
<p>Trombositler disk biçimli, çekirdeksiz hücre parçalarıdır; dolaşımdaki ömürleri yaklaşık <b>7 gündür</b>. Uyarılınca yıldızsı hâle gelir ve granül içeriklerini salar. Kollajen/vWF ile temas ve TF’nin başlattığı koagülasyondan oluşan trombin, aktivasyonda birlikte rol oynar. [[K1 s. 342]]</p>
<p><b>vWF</b> başlıca endotel hücrelerinde sentezlenir ve depolanır. Normalde lümene sınırlı salınır ve VIII’i yıkımdan korur; yaralanmada bol salınıp trombosit ile subendotelyal kollajen arasında köprü kurar. <b>TF</b>, düz kas gibi subendotelyal hücrelerde bulunur; endotel ise TF’yi yalnız hasar görünce ifade eder; hasarda TF taşıyan yüzey kanla temas eder ve ekstrinsik yol üzerinden trombin oluşur. [[K1 s. 342]]</p>
<p>Aktivasyon çevresindeki moleküller <b>serotonin (5-HT), tromboksan A₂, ADP, trombosit aktive edici faktör (PAF), vWF, fibrinojen, trombin, Ca²⁺ ve trombosit kaynaklı büyüme faktörüdür (PDGF)</b>. Serotonin ve tromboksan güçlü vazokonstriktörlerdir. İlk trombosit tabakası kollajeni kapattığında arkadan gelenler kollajene erişemez; ADP reseptörlerinin uyarılması şekil değişimi ve yeni salımla yanıtı çoğaltır. [[K1 s. 342–343]]</p>
<p>Aktif <b>Gp IIb/IIIa</b> reseptörlerine bağlanan fibrinojen ve vWF, komşu trombositleri birbirine bağlar. Bu yumuşak tıkaç tek başına yeterince dayanıklı değildir: içindeki çözünür fibrinojeni trombin çözünmeyen fibrine dönüştürür. Böylece trombosit yanıtı ve plazma koagülasyonu ayrı olaylar olarak kalmaz, aynı pıhtıda birleşir. [[K1 s. 342]]</p>
<div class="note plain"><b>Atlas notu · trombosit çiziminin düzeltilmesi.</b> Kitabın s. 343 şekli vWF tutunmasını Gp Ia/IIa ile eşleştirir; doğru eşleşme vWF–Gp Ib/IX/V, doğrudan kollajen bağlanmasında ise Gp Ia/IIa’dır (<a href="https://www.merckmanuals.com/professional/hematology/hemostasis/overview-of-hemostasis" target="_blank" rel="noopener">reseptör açıklaması</a>). S. 342 listesinin tümünü granül içeriği saymayın: tromboksan aktivasyon sırasında sentezlenir, trombin koagülasyonla oluşur; listede salınan ve sonradan oluşan aracılar birlikte verilmiştir (<a href="https://www.ncbi.nlm.nih.gov/books/NBK53455/" target="_blank" rel="noopener">trombosit biyolojisi</a>). [[K1 s. 342–343]]</div>
</section>

<section class="wrap blk ders-sec" id="d72-antiagregan">
<h2>Antiagreganlar: tıkacın hangi bağlantısı kesilir?</h2>
<p class="intro">Miyokart enfarktüsü veya inme gibi arteriyel tromboz riski taşıyan hastalarda antiagreganlar trombosit aktivasyonunun farklı basamaklarını hedefler. [[K1 s. 343–344]]</p>
<div class="viz"><div class="viz-head"><h3>Dört hedef, ortak sonuç: agregasyon azalır</h3></div><div data-viz="f72_antiagregan"></div><p class="viz-cap" aria-live="polite">Bir ilaç sınıfını seçip engellenen basamağı izleyin. [[K1 s. 343–344]]</p><p class="viz-foot">Etki yeri gösterilir; doz veya etki büyüklüğü modellenmez.</p></div>
<p><b>Aspirin</b>, siklooksijenazı (COX) seçici olmayan ve geri dönüşsüz biçimde inhibe eder. Trombosit zar fosfolipitlerinden türeyen tromboksan A₂, COX aracılı sentezlenir; trombosit aktivasyonu ve vazokonstriksiyon yapar. Endotelde yine COX aracılı oluşan PGI₂ karşı yönde etkilidir; iki sinyal arasındaki denge pıhtı oluşumunu etkiler. [[K1 s. 343]]</p>
<p>Aspirin hem tromboksanı hem PGI₂’yi azaltır, fakat iki hücre eşit hızda toparlanmaz. Endotel saatler içinde yeni COX yapabilir; çekirdeksiz trombositin inhibisyonu yaklaşık 7 günlük ömrü boyunca sürer. Sonuçta toplam etki trombosit inhibisyonu yönündedir. [[K1 s. 343–344]]</p>
<div class="cols">
<div class="card"><h3>ADP reseptör antagonistleri</h3><p><b>Klopidogrel, tikagrelor, prasugrel:</b> ADP sinyalini keser, sonraki trombosit aktivasyonunu ve Gp IIb/IIIa kompleksinin işlevsel aktivasyonunu engelleyerek agregasyonu azaltır. [[K1 s. 344]]</p></div>
<div class="card"><h3>Gp IIb/IIIa inhibitörleri</h3><p><b>Tirofiban, absiksimab:</b> fibrinojenin trombositleri bağlamasını engeller; tıkaçtaki hücreler arası köprü kurulamaz. [[K1 s. 344]]</p></div>
<div class="card"><h3>Fosfodiesteraz inhibisyonu</h3><p><b>Dipiridamol:</b> olası mekanizmalarından biri trombosit fosfodiesterazını inhibe etmesidir; cAMP yıkımı azalır, cAMP artar, ADP salımı baskılanır ve hem agregasyon hem tromboksan A₂ sentezi azalır. [[K1 s. 344]]</p></div>
</div>
</section>

<section class="wrap blk ders-sec" id="d72-caglayan">
<h2>Klasik çağlayan: iki giriş, ortak fibrin çıkışı</h2>
<p class="intro">Az sayıda aktive molekülün ardışık faktör aktivasyonuyla büyük trombin yanıtı üretmesi, biyolojik amplifikasyon örneğidir. [[K1 s. 342]]</p>
<div class="viz"><div class="viz-head"><h3>Ekstrinsik → intrinsik → ortak yol → geri bildirim</h3></div><div data-viz="f72_caglayan"></div><p class="viz-cap" aria-live="polite">Yollar X aktivasyonunda birleşir; trombin fibrin üretirken hem çoğaltıcı hem sınırlayıcı geri bildirim oluşturur. [[K1 s. 344–345]]</p><p class="viz-foot">Roma rakamı faktörü, “a” aktif biçimini gösterir; şema özgün bir öğrenme düzenidir.</p></div>
<p><b>Ekstrinsik yol:</b> başlatıcı TF sağlam damar lümeninde bulunmadığı için “dış” yol denir. Hasarda TF ile karşılaşan VII, VIIa’ya dönüşür; TF–VIIa kompleksi X’u aktive ederek ortak yola girer. <b>İntrinsik yol:</b> plazma dışarıdan TF eklenmeden de pıhtılaşabilir; negatif yüklü yüzeyle temas (deneyde cam, klasik açıklamada subendotelyal kollajen) XII → XI → IX aktivasyon dizisini başlatır. [[K1 s. 344]]</p>
<p>IXa, <b>VIIIa, Ca²⁺ ve trombosit fosfolipit yüzeyi (PF3)</b> yardımıyla X’u Xa’ya çevirir. Ortak yolda <b>Xa + Va + Ca²⁺ + PF3</b>, protrombinden (II) trombin (IIa) üretir. Trombin tıkaç içindeki çözünür fibrinojeni (I) hidroliz ederek çözünmeyen fibrin liflerini oluşturur; aktive ettiği XIIIa, lifler arasında kovalent çapraz bağ kurarak pıhtıyı sağlamlaştırır. [[K1 s. 344–345]]</p>
<p>Trombinin işlevi fibrin yapımıyla bitmez: <b>V ve VIII’i aktive etmesi</b> daha çok trombin üretir, yani pozitif geri bildirimdir. Buna karşılık sağlam endotel üzerindeki trombomodüline bağlandığında protein C’yi aktive eder; protein C/S, Va ve VIIIa’yı kapatır. Antitrombin de Xa ve trombini inaktive ederek aynı sistemin yayılmasını sınırlar. [[K1 s. 341, 344–345]]</p>
<p>Klasik iki yol modeli <b>in vitro</b> pıhtılaşmayı ve laboratuvar taramasını iyi açıklar; faktör eksikliklerini yorumlamak için yararlıdır. Bununla birlikte temas aktivasyonunun canlıdaki payı sınırlıdır; bu, VIII ve IX’un önemsiz olduğu anlamına gelmez. Canlıdaki koagülasyonu anlamak için faktörlerin hangi hücre yüzeyinde buluştuğuna da bakmak gerekir. [[K1 s. 345–346]]</p>
</section>

<section class="wrap blk ders-sec" id="d72-hucre">
<h2>Hücre temelli model: trombin üretimi yer değiştirir</h2>
<p class="intro">Başlangıç TF taşıyan hücrede, büyük trombin üretimi ise aktive trombosit yüzeyinde gerçekleşir. [[K1 s. 345–346]]</p>
<div class="viz"><div class="viz-head"><h3>Başlatma → amplifikasyon → yayılma</h3></div><div data-viz="f72_hucre"></div><p class="viz-cap" aria-live="polite">Önce az trombin oluşur; bu trombin sonraki büyük üretim için trombosit ve kofaktörleri hazırlar. [[K1 s. 345–346]]</p><p class="viz-foot">Molekül sayıları temsilîdir; evreler klinikte birbirinin içine geçer.</p></div>
<p><b>Başlatma:</b> hasar plazmayı TF ile karşılaştırır; TF taşıyan hücre yüzeyinde VII ve V etkinleşir. TF–VIIa, IX ve X aktivasyonunu destekler; Xa ve Va’nın ortak etkisiyle küçük miktarda trombin oluşur. Geçen trombositler vWF ile tutunur ve oluşan trombinle aktive olur; TF bu sürece koagülasyonu başlatarak katkıda bulunur. [[K1 s. 345–346]]</p>
<p><b>Amplifikasyon:</b> ilk trombin, daha fazla trombositi ve pıhtılaşma faktörünü aktive eder. Özellikle Va ve VIIIa’nın bulunduğu trombosit yüzeyi hazırlanır; IXa–VIIIa üzerinden X aktivasyonu, ardından Xa–Va üzerinden protrombin dönüşümü için gerekli bileşenler aynı yerde toplanır. Bu evrenin amacı büyük ölçekli trombin üretiminin koşullarını oluşturmaktır. [[K1 s. 345–346]]</p>
<p><b>Yayılma:</b> aktif faktörlerle yüklü trombosit yüzeyi bol trombin üretimini katalizler. Trombin fibrinojeni fibrine dönüştürür ve XIII’ü aktive eder; çapraz bağlı fibrin polimeri tıkacı sağlamlaştırır. Böylece trombin hem kendi üretiminin ve düzenlenmesinin merkezinde hem de nihai pıhtı oluşumunda yer alır. [[K1 s. 346]]</p>
<p>Klasik modelde intrinsik yola yerleştirilen <b>XII ve prekallikrein</b> canlıdaki hemostaza az katkı verir; hücre temelli modelde yer almaz. İki modeli farklı sorular için kullanın: plazma testindeki gecikmeyi klasik faktör dizisiyle, hasarlı yüzeyde büyüyen pıhtıyı hücre temelli modelle açıklayın. [[K1 s. 345–346]]</p>
</section>

<section class="wrap blk ders-sec" id="d72-kalitsal">
<h2>Kalıtsal kanama: fibrin desteği mi, vWF köprüsü mü?</h2>
<p class="intro">Hemofili A’da VIII eksikliği fibrin desteğini bozar; von Willebrand hastalığında hem trombosit tutunması hem VIII’in korunması etkilenir. [[K1 s. 345]]</p>
<div class="viz"><div class="viz-head"><h3>Eksik parçayı seçin</h3></div><div data-viz="f72_kalitsal"></div><p class="viz-cap" aria-live="polite">Hemofili A ile vWF eksikliği aynı yerde aksama yapmaz. [[K1 s. 345]]</p><p class="viz-foot">Nitel karşılaştırma; kanama şiddeti sayısallaştırılmaz.</p></div>
<p><b>Hemofili A</b>, faktör VIII eksikliğidir. Yarada yumuşak trombosit tıkacı oluşur fakat onu pekiştirecek fibrin üretimi yetersiz kalır; kanama uzar. Eklem içi kanamalar kalıcı işlev kaybı yapabilir; intraserebral kanama sıklıkla ölümcüldür. Yönetim profilaktik olabilir veya kanama epizotlarının tedavisine dayanabilir. [[K1 s. 345]]</p>
<p>Ağır hemofilide insan kaynaklı ya da rekombinant <b>faktör VIII infüzyonu</b> kullanılır. Hafif hemofili A’da sentetik antidiüretik hormon analoğu <b>desmopressin (DDAVP)</b>, kişinin kendi VIII düzeyini artırmak için kullanılabilir. Faktör IX eksikliği ise <b>hemofili B (Christmas hastalığı)</b> olarak adlandırılır ve APTT uzaması nedenlerindendir. [[K1 s. 345, 347]]</p>
<p><b>Von Willebrand hastalığı</b> en sık kalıtsal kanama bozukluğudur; vWF miktarı azdır veya işlevi bozuktur. vWF’nin kollajen–trombosit köprüsü kurma ve VIII’i yıkımdan koruma görevleri birlikte aksar. Klinik yelpaze geniştir ama çoğu olgu hafiftir: burun kanaması, kolay morarma ve diş çekimi sonrası kanama tipiktir. [[K1 s. 345]]</p>
<p>Hafif kanama genellikle tedavi gerektirmez. Uygun olgularda cerrahi veya diş çekimi öncesi DDAVP, VIII ve vWF düzeylerini yükseltmek için kullanılabilir; ağır kanamada vWF içeriği yüksek VIII konsantresi intravenöz verilebilir. Burada amaç yalnız bir laboratuvar sayısını düzeltmek değil, eksik hemostatik işlevi geri kazandırmaktır. [[K1 s. 345]]</p>
<div class="note plain"><b>Atlas notu · kalıtım ve salım.</b> Kitabın “X’e bağlı otozomal resesif” ifadesi çelişkilidir: hemofili A <b>X’e bağlı resesiftir</b> (<a href="https://www.genome.gov/Genetic-Disorders/Hemophilia" target="_blank" rel="noopener">NHGRI</a>). DDAVP etkisini “yeni üretim” diye ezberlemeyin: depolanmış vWF’nin endotel salımını artırır ve VIII düzeyini yükseltir; yanıt hastalığın tipine göre değişir (<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7805326/" target="_blank" rel="noopener">ASH/ISTH/NHF/WFH kılavuzu</a>). [[K1 s. 345]]</div>
</section>

<section class="wrap blk ders-sec" id="d72-test">
<h2>Testler: tüpe ne eklenir, hangi basamak sınanır?</h2>
<p class="intro">PT ve APTT farklı giriş yollarını, TT ise trombinin fibrinojen üzerindeki son etkisini değerlendirir. [[K1 s. 346–347]]</p>
<div class="viz"><div class="viz-head"><h3>Testi seç, girdiyi ve kapsadığı yolu gör</h3></div><div data-viz="f72_test"></div><p class="viz-cap" aria-live="polite">Testler birbirinin yerine geçmez; kanama zamanı trombosit tıkacına, plazma testleri koagülasyona bakar. [[K1 s. 347]]</p><p class="viz-foot">Referans süre veya tedavi hedefi verilmez; kitap bu değerleri belirtmez.</p></div>
<p><b>Protrombin zamanı (PT):</b> plazmaya TF eklenir, pıhtı oluşana kadar geçen süre ölçülür. Ekstrinsik yolun VII’sini ve ortak yolun faktörlerini değerlendirir; kitap özellikle II, X ve fibrinojeni sayar. Hastanın PT’sinin normal kontrol ortalamasına göre standardizasyonu <b>INR</b> ile bildirilir. [[K1 s. 346–347]]</p>
<p>PT, karaciğerde K vitaminine bağımlı <b>II, VII, IX, X</b> üretimi azaldığında uzayabilir: varfarin kullanımı, yağ malabsorpsiyonu gibi nedenlerle K vitamini eksikliği ve karaciğer hastalığı örnektir. DIC’de faktör tüketimi de PT’yi uzatır; IX bu vitamin bağımlı gruptadır ama PT’nin intrinsik IX’u doğrudan sınadığı sonucu çıkarılmamalıdır. [[K1 s. 347]]</p>
<p><b>Aktive parsiyel tromboplastin zamanı (APTT):</b> plazmaya fosfolipit ve silika gibi aktivatör eklenir; VIII, IX, XI, XII ile ortak yol değerlendirilir. Fraksiyone olmayan heparin, antitrombin üzerinden Xa ve trombini inaktive ederek APTT’yi uzatır. Hemofili A, Christmas hastalığı, vWF eksikliğinin VIII’i azaltması ve DIC’de faktör tüketimi diğer uzama nedenleridir. [[K1 s. 347]]</p>
<p><b>Düşük molekül ağırlıklı heparin (DMAH)</b> kullanırken APTT çoğunlukla uzamaz; normal APTT’yi ilacın etkisiz olduğu şeklinde yorumlamayın. <b>Trombin zamanı (TT)</b>, plazmaya trombin eklenince pıhtı oluşma süresidir; trombin–fibrinojen etkileşimini sınar ve DIC gibi fibrinojen eksikliği durumlarında uzar. [[K1 s. 347]]</p>
<p><b>Kanama zamanı:</b> standart bir kesi açılıp kanamanın durması beklenir; etkin trombosit tıkacı oluşma süresini gösterir. Cerrahi kanamayı öngörmeye yardımcı olmadığı için nadiren yapılır; PT/APTT’nin “trombosit işlev testi” olmadığını hatırlatan ayrı bir kavramdır. [[K1 s. 347]]</p>
</section>

<section class="wrap blk ders-sec" id="d72-antikoagulan">
<h2>Antikoagülanlar: faktör üretimini veya etkin enzimi azalt</h2>
<p class="intro">Oral antikoagülasyonun başlıca bağlamları atriyal fibrilasyonda sistemik emboliyi önleme, derin ven trombozu/pulmoner emboli ve mekanik kalp kapağıdır. [[K1 s. 347]]</p>
<div class="viz"><div class="viz-head"><h3>Hedef ve geri döndürme eşleşmesi</h3></div><div data-viz="f72_antikoagulan"></div><p class="viz-cap" aria-live="polite">Varfarin, dabigatran veya Xa inhibitörünü seçin; aynı antikoagülasyon sonucu farklı hedeflerden doğar. [[K1 s. 347–348]]</p><p class="viz-foot">Kitabın klinik düzeyindeki mekanizma karşılaştırması; reçete veya doz aracı değildir.</p></div>
<p>Atriyal fibrilasyonda amaç iskemik inme gibi sistemik embolileri önlemektir; venöz tromboemboli bağlamı alt ekstremite artroplastisi sonrasını da kapsar. Mekanik kapakta ilaç seçimi farklıdır: kitap oral seçenek olarak varfarini belirtir; DOAC’larla daha fazla trombotik olay görüldüğünden bu endikasyona taşınamazlar. [[K1 s. 347–348]]</p>
<p><b>Varfarin</b> bir kumarin türevi ve K vitamini antagonistidir; işlevsel II, VII, IX, X ile protein C ve S oluşumunu azaltır. Yaklaşık <b>%99 proteine bağlıdır</b>; başka yüksek bağlanmalı ilaçların yerinden etmesi etkisini artırabilir. Karaciğerde sitokrom P450 ile metabolize olur; genetik enzim farklılıkları, besin ve ilaç etkileşimleri yanıtı değiştirir, dolayısıyla PT/INR ile yakın takip gerekir. [[K1 s. 347]]</p>
<p>Yaşamı tehdit eden kanamada, örneğin intrakraniyal hematomda, varfarin etkisi <b>K vitamini ve hesaplanmış dozda protrombin kompleks konsantresi (PCC)</b> ile geri döndürülebilir. Kitap ağır böbrek bozukluğunda varfarinin bir avantajı olabileceğini belirtir. Geri döndürülebilirlik ve mekanik kapaktaki yeri, izlem yüküne rağmen önemini korumasının nedenleridir. [[K1 s. 347]]</p>
<p><b>Doğrudan oral antikoagülanlar (DOAC)</b> kısa ve uzun süreli kullanımda sabit doz, daha öngörülebilir farmakokinetik, daha az ilaç etkileşimi ve rutin koagülasyon izlemi gerektirmemeleriyle öne çıkar. <b>Dabigatran</b> doğrudan trombin; <b>rivaroksaban, apiksaban ve edoksaban</b> doğrudan Xa inhibitörleridir. Varfarine kıyasla intrakraniyal kanama daha az, gastrointestinal kanama bazı bağlamlarda daha fazla olabilir; ağır kanamada geri döndürme tarihsel olarak önemli bir güçlük olmuştur. [[K1 s. 347]]</p>
<p>Dabigatran etkisi <b>hemodiyaliz</b> veya özgül antikor kökenli <b>idarusizumab</b> ile azaltılabilir. Kitap 2019’da bunun Birleşik Krallık hastanelerindeki acil kullanımını ve dipnotunda rivaroksaban/apiksaban için <b>andeksanet alfa</b>nın 2018 FDA onayını bildirir; bu tarihsel bilgiyi güncel bulunabilirlik olarak okumayın. [[K1 s. 348]]</p>
<div class="note plain"><b>Atlas notu · test ve ilaç düzeltmeleri.</b> S. 347’nin kısaltmalarını düzeltin: INR = (PT<sub>hasta</sub>/PT<sub>normal ortalama</sub>)<sup>ISI</sup>; DMAH’ın Xa inhibisyonu <b>antitrombin aracılıdır</b>, varfarin ise K vitamininin yeni sentezini değil <b>geri dönüşümünü</b> engeller (<a href="https://www.mayocliniclabs.com/test-catalog/overview/40934" target="_blank" rel="noopener">INR</a>, <a href="https://www.ema.europa.eu/en/documents/assessment-report/thorinane-epar-public-assessment-report_en.pdf" target="_blank" rel="noopener">DMAH</a>, <a href="https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bd6ea120-5d1c-4815-94f2-81e28dc6b7a9" target="_blank" rel="noopener">varfarin</a>). Andeksanetin ABD’de üretim ve satışı güvenlik değerlendirmesi sonrasında 22 Aralık 2025 sonrası sonlandırılmıştır; kitabın “yakında kullanıma girecek” ifadesi güncel değildir (<a href="https://www.fda.gov/safety/medical-product-safety-information/update-safety-andexxa-astrazeneca-fda-safety-communication" target="_blank" rel="noopener">FDA güncellemesi</a>). [[K1 s. 347–348]]</div>
</section>

<section class="wrap blk ders-sec" id="d72-teg">
<h2>Tromboelastografi: tam kanda pıhtının yaşamı</h2>
<p class="intro">Tromboelastografi, trombosit katkısını, koagülasyonu ve fibrinolizi tek bir hasta başı değerlendirmesinde birleştirir. [[K1 s. 348]]</p>
<div class="viz"><div class="viz-head"><h3>Başlama, güçlenme ve çözülme</h3></div><div data-viz="f72_teg"></div><p class="viz-cap" aria-live="polite">Pıhtı başlayana dek iz dardır, kuvvet kazandıkça açılır, çözülürken daralır. [[K1 s. 348]]</p><p class="viz-foot">Şematik tromboelastogram; sayısal eşik, normal aralık veya tanı algoritması değildir.</p></div>
<p>Tam kan örneği yavaş dönen bir küvete konur; bu düşük kaymalı ortam yavaş venöz akımı taklit eder. Torsiyon teline bağlı plastik bir pim kan içine indirilir. Fibrin lifleri küvet ile pim arasında bağlantı kurdukça tele aktarılan burulma değişir; sistem bu değişimden pıhtı oluşma hızını ve dayanıklılığını hesaplar. [[K1 s. 348]]</p>
<p>Sonuç, puro benzeri açılan bir izdir: oluşumun başlaması, pıhtının güçlenmesi ve sonradan çözülmesi birlikte izlenebilir. Büyük hemostaz bozuklukları şekilden hızla fark edilebilir; daha ayrıntılı değerlendirme için çeşitli ölçüm parametreleri analiz edilir. Kitap tek tek parametre adları veya eşikleri vermediğinden şekilde yalnız mekanik ilişki gösterilir. [[K1 s. 348]]</p>
<p>Laboratuvar temelli testlere göre daha hızlı sonuç verebilir ve canlıdaki hemostazı daha iyi temsil ettiği düşünülür. PT/APTT bir plazma örneğinin belirli koşullarda pıhtılaşma süresini verirken burada tam kandaki pıhtının mekanik gelişimi izlenir; bu fark, testlerin birbirini tamamlamasının nedenidir. [[K1 s. 346–348]]</p>
</section>

<section class="wrap blk ders-sec" id="d72-fibrinoliz">
<h2>Fibrinoliz: oluşmuş pıhtıyı kontrollü çöz</h2>
<p class="intro">Fibrinoliz yara iyileşmesinin normal parçasıdır; fibrini yavaşça uzaklaştırır ve küçük damarları açık tutar. [[K1 s. 348]]</p>
<div class="viz"><div class="viz-head"><h3>Doğal çözülme, tromboliz ve antifibrinoliz</h3></div><div data-viz="f72_fibrinoliz"></div><p class="viz-cap" aria-live="polite">t-PA plazminojeni plazmine dönüştürür; plazmin çapraz bağlı fibrini parçalar ve D-dimer dahil yıkım ürünleri oluşturur. [[K1 s. 348]]</p><p class="viz-foot">Seçenekler yolun yönünü öğretir; görüntüdeki ağ yoğunluğu bir klinik ölçüm değildir.</p></div>
<p><b>Plazminojen</b> karaciğerde sentezlenen, β-globulin yapısında bir proenzimdir. Pıhtı kurulurken fibrin ağına katılır; endotel kaynaklı başlıca fizyolojik aktivatör <b>t-PA</b> ile proteaz olan <b>plazmine</b> dönüşür. Böylece endotel yüzeyi fibrin birikiminden temizlenir ve özellikle küçük damarların açıklığı korunur. [[K1 s. 348]]</p>
<p>Plazmin fibrini <b>fibrin yıkım ürünlerine (FDP)</b> ayırır. Bunlardan <b>D-dimer</b>, çapraz bağlı fibrinin parçalanma ürünüdür; kan düzeyi pulmoner emboli gibi venöz tromboembolik hastalıkların tanısına yardımcı olmak için ölçülür. Fibrinoliz koagülasyondan çok daha yavaştır; pıhtının oluşumu ile çözülmesi arasındaki gecikme, yaranın iyileşmesine zaman bırakır. [[K1 s. 348]]</p>
<p><b>Tromboliz:</b> ST yükselmeli miyokart enfarktüsü, akut iskemik inme veya masif pulmoner emboli gibi ağır tromboz bağlamlarında pıhtıyı çözmek için kullanılabilir. Rekombinant t-PA örneği <b>alteplaz</b> ve ayrıca <b>streptokinaz</b>, plazminojenden plazmin oluşumunu artırarak fibrinolizi hızlandırır. Burada amaç pıhtının yapılmasını engellemekten farklı olarak mevcut fibrinin yıkımını artırmaktır. [[K1 s. 348]]</p>
<p><b>Antifibrinoliz:</b> kanama sonrasında oluşmuş pıhtıyı korumak yararlı olabilir. <b>Traneksamik asit</b>, plazminojen aktivasyonunu inhibe ederek fibrinolizi azaltır ve hemostazı destekler. Kitaptaki kullanım bağlamları travma, ortopedik cerrahi, spinal cerrahi, kalp cerrahisi ve menorajidir; etki yeri trombin üretimi değil fibrin ağının çözülmesidir. [[K1 s. 348–349]]</p>
</section>

<section class="wrap blk ders-sec" id="d72-p1">
<h2>Part I'de</h2><p class="intro">Bu atlas için yazılmış üç MTF: her önermeyi ayrı doğru veya yanlış olarak değerlendirin; özellikle tıkaç, fibrin ve fibrinoliz hedeflerini ayırın.</p>
<div class="viz"><div data-viz="mtf" data-q="fiz72-1"></div></div><div class="viz"><div data-viz="mtf" data-q="fiz72-2"></div></div><div class="viz"><div data-viz="mtf" data-q="fiz72-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="d72-p2">
<h2>Part II'de (SOE 1)</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu · atlas örneği</span><p><b>“Bir damar kesildiğinde kanama nasıl durur? Yanıtın yalnız hasarlı alanda kalmasını ve iyileşme sırasında pıhtının çözülmesini açıklayın; kullandığınız testleri bu mekanizmayla ilişkilendirin.”</b></p></div>
<h3>Cevap iskeleti</h3>
<ol class="iskelet">
<li><b>Çerçeve:</b> endotel, trombosit ve koagülasyon proteinleri; vazokonstriksiyon → tıkaç → fibrin desteği. [[K1 s. 341–342]]</li>
<li><b>Tıkaç:</b> kollajen/vWF ile tutunma; şekil değişimi ve ADP ile çoğalma; Gp IIb/IIIa üzerinden fibrinojen/vWF köprüleri. [[K1 s. 342–343]]</li>
<li><b>Koagülasyon:</b> TF–VIIa ve klasik intrinsik yol X’da birleşir; Xa–Va, Ca²⁺ ve fosfolipit yüzeyi trombin üretir; trombin fibrin ve XIIIa üzerinden kararlı pıhtı sağlar. [[K1 s. 344–345]]</li>
<li><b>Hücre yüzeyi:</b> TF taşıyan hücrede az trombin; amplifikasyonla hazırlanmış trombosit üzerinde yayılma ve bol trombin. [[K1 s. 345–346]]</li>
<li><b>Sınırlama:</b> NO/PGI₂/ADPaz; heparan–antitrombin; trombomodülin–trombin–protein C/S ile Va/VIIIa inhibisyonu. [[K1 s. 341]]</li>
<li><b>Ölçüm:</b> PT ekstrinsik/ortak, APTT intrinsik/ortak, TT trombin–fibrinojen; tromboelastografi tam kanda oluşum, kuvvet ve çözülme. [[K1 s. 346–348]]</li>
<li><b>Çözülme:</b> t-PA → plazmin → fibrin yıkımı/D-dimer; trombolitikler hızlandırır, traneksamik asit yavaşlatır. [[K1 s. 348–349]]</li>
</ol>
<div class="cols"><div class="note"><b>Çizin.</b> TF taşıyan hücre ve trombosit için iki ayrı yüzey çizin; aralarına az trombin, trombosit üzerine IXa–VIIIa ve Xa–Va, çıkışa bol trombin → fibrin → XIIIa ile çapraz bağ koyun; alta t-PA → plazmin → yıkım ürünlerini ekleyin. [[K1 s. 345–348]]</div><div class="note plain"><b>Olası ek sorular.</b> Aspirin neden bir trombosit ömrü boyunca etkilidir? vWF eksikliği neden iki hemostaz işlevini bozar? PT ile APTT neden DIC’de birlikte uzayabilir? Trombin nasıl antikoagülan yola katılır? Dabigatran ile traneksamik asidin hedefleri nasıl ayrılır? [[K1 s. 341, 343–348]]</div></div>
</section>
<section class="wrap blk ders-sec" id="d72-ozet">
<h2>Özet</h2><ul class="ozet">
<li>Endotel hasarsızken trombositleri, trombini ve fibrin birikimini baskılar; hasarda yerel hemostaz başlar. [[K1 s. 341–342]]</li>
<li>vWF hem trombosit–kollajen bağlantısını kurar hem VIII’i korur; Gp IIb/IIIa üzerinden hücreler arası köprüler tıkacı büyütür. [[K1 s. 342–343]]</li>
<li>Trombin fibrin oluşturur, XIII’ü aktive eder ve V/VIII ile kendi üretimini güçlendirir; trombomodüline bağlanınca protein C yoluyla sınırlayıcı olur. [[K1 s. 345]]</li>
<li>Klasik model plazma testlerini, hücre temelli model TF yüzeyinden trombosit yüzeyine geçen trombin üretimini açıklar. [[K1 s. 345–346]]</li>
<li>PT, APTT ve TT farklı basamakları sınar; tromboelastografi tam kanda pıhtının mekanik gelişimini ve çözülmesini bir arada gösterir. [[K1 s. 346–348]]</li>
<li>Varfarin vitamin K bağımlı faktörleri; dabigatran trombini; rivaroksaban, apiksaban ve edoksaban Xa’yı hedefler. [[K1 s. 347]]</li>
<li>Plazmin fibrini yıkar; D-dimer çapraz bağlı fibrinden gelir, trombolitikler çözülmeyi artırırken traneksamik asit azaltır. [[K1 s. 348–349]]</li>
</ul><div data-viz="tamam" data-bolum="72"></div>
<nav class="ders-gec" aria-label="Bölümler arasında"><a href="#/dersler/fizyoloji/71">← Bölüm 71 · Miksiyon</a><a href="#/dersler/fizyoloji/73">Sonraki: Bölüm 73 · Transfüzyon →</a></nav>
</section>`
  };
})();
