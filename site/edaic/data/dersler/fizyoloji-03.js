/* Fizyoloji Bölüm 3 · Genetik (K1 s. 9–12). Ders metni, sorular ve bileşenler bu atlas için yazılmıştır;
   kitaptan metin ya da şekil kopyalanmaz. Her bilgi [[K1 s. n]] ile İngilizce özgün sayfaya bağlanır;
   kitapta olmayan kısa açıklamalar "Atlas notu" olarak işaretlidir. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz03-1'] = {
  no: 1, kok: 'Kromozomlar, DNA ve RNA için:', kagit: 'Paper A · fizyoloji, Bölüm 3', kaynak: '[[K1 s. 9–11]]',
  onermeler: [
    { t: 'Adenin ve guanin pürin, timin ve sitozin pirimidin bazlarıdır.', d: true, n: 'Doğru. Nükleobazlar kimyasal yapılarına göre ikiye ayrılır: A ve G pürin, T ve C pirimidindir. [[K1 s. 9]]' },
    { t: 'Çift sarmalı oluşturan iki DNA zinciri aynı yönde (paralel) uzanır.', d: false, n: 'Yanlış. İki zincir antiparaleldir, yani ters yönlerde uzanır: birinin 5′ ucunun karşısında öbürünün 3′ ucu bulunur. [[K1 s. 9–10]]' },
    { t: 'Somatik bir hücrede 22 çift otozom ve bir çift cinsiyet kromozomu (allozom) bulunur.', d: true, n: 'Doğru. Toplam 46 kromozom (23 çift): 22 çift otozom ve bir çift allozom (XX ya da XY). [[K1 s. 9]]' },
    { t: 'RNA\'da timin yerine urasil bulunur.', d: true, n: 'Doğru. Kitabın saydığı, RNA\'yı DNA\'dan ayıran üç farktan biri budur; öbür ikisi şekerdeki fazladan hidroksil grubu ve RNA\'nın genellikle tek zincirli olmasıdır. [[K1 s. 10]]' },
    { t: 'Gamet hücreleri (sperm ve yumurta) 46 kromozom içerir.', d: false, n: 'Yanlış. Gametler haploittir: 23 tek kromozom taşırlar. İki gamet birleşince 23 çift kromozomlu diploit hücre oluşur. [[K1 s. 9]] [[K1 s. 11]]' },
  ],
};
VERI.sorular['fiz03-2'] = {
  no: 2, kok: 'Protein sentezi ve gen mutasyonları için:', kagit: 'Paper A · fizyoloji, Bölüm 3', kaynak: '[[K1 s. 10–11]]',
  onermeler: [
    { t: 'GCA kodonu glutamini kodlar.', d: false, n: 'Yanlış. Kitaptaki örnekte GCA alanini kodlar. CAG ise glutamini kodlar; Huntington hastalığında tekrarlanan kodon budur. [[K1 s. 10–11]]' },
    { t: 'Transkripsiyon çekirdekte olur; oluşan mRNA protein sentezi için sitoplazmadaki ribozomlara gider.', d: true, n: 'Doğru. mRNA çekirdekte DNA\'nın belirli bir bölümünün kopyası olarak yapılır, sonra çekirdekten çıkıp sitoplazmadaki ribozomlara gider. Kitap bunu granüllü ER\'nin ribozomları üzerinden anlatır; serbest ribozomlar için RNA bölümündeki Atlas notuna bakın. [[K1 s. 10]]' },
    { t: 'Kodlayan diziye tek bir nükleotidin eklenmesi ya da silinmesi, o noktadan sonraki okuma çerçevesini kaydırır.', d: true, n: 'Doğru. Kodonlar üçerli okunduğu için bir nükleotitlik insersiyon ya da delesyon sonraki bütün üçlüleri kaydırır; bu yüzden bu mutasyonlar nokta mutasyonlarından çok daha ağır olabilir. [[K1 s. 11]]' },
    { t: 'Kistik fibrozisin en sık mutasyonu olan ΔF508, tek bir nükleotidin yanlış kopyalandığı bir nokta mutasyonudur.', d: false, n: 'Yanlış. ΔF508 bir delesyondur: üç nükleotit silinir ve proteinde 508. konumdaki fenilalanin (F) eksilir. [[K1 s. 11]]' },
    { t: 'Orak hücre hastalığında hemoglobin β-zinciri geninde altıncı amino asidin kodonu GAG yerine GTG okunur; glutamik asidin yerini valin alır.', d: true, n: 'Doğru. 11. kromozomdaki hemoglobin β-zinciri genindeki bir nokta mutasyonudur (mRNA\'da GAG yerine GUG); polar glutamik asidin yerine polar olmayan valin geçer ve düşük O₂ basıncında Hb kümelenir. [[K1 s. 11]]' },
  ],
};
VERI.sorular['fiz03-3'] = {
  no: 3, kok: 'Mendel kalıtımı ve penetrans için:', kagit: 'Paper A · fizyoloji, Bölüm 3', kaynak: '[[K1 s. 11–12]]',
  onermeler: [
    { t: 'Kistik fibrozis ve Wilson hastalığı otozomal dominant geçer.', d: false, n: 'Yanlış. Kitapta ikisi de, orak hücre hastalığıyla birlikte, otozomal resesif hastalık örneğidir. Otozomal dominant örnekler hipertrofik kardiyomiyopati, polikistik böbrek hastalığı ve miyotonik distrofidir. [[K1 s. 11–12]]' },
    { t: 'İki heterozigot (Aa) ebeveynin her çocuğu için otozomal resesif hastalığa yakalanma olasılığı %25\'tir.', d: true, n: 'Doğru. Aa × Aa çaprazlamasında olasılıklar %25 AA (hastalıksız), %50 Aa (taşıyıcı) ve %25 aa (hasta, homozigot) şeklindedir. [[K1 s. 12]]' },
    { t: 'X\'e bağlı resesif bir hastalıkta taşıyıcı anne ile sağlıklı babanın bütün oğulları hastadır.', d: false, n: 'Yanlış. Oğulların yarısı hasta, yarısı sağlıklıdır; kızların yarısı taşıyıcı, yarısı sağlıklıdır. Bütün çocuklar içinde her grup %25\'tir. [[K1 s. 12]]' },
    { t: 'Hipertrofik kardiyomiyopati otozomal dominant geçer ve penetransı yaklaşık %70\'tir.', d: true, n: 'Doğru. Mutasyonu alan yaklaşık her 100 kişiden 70\'inde hastalık gelişir: eksik penetrans. Nörofibromatozis ise tam penetrans örneğidir. [[K1 s. 11–12]] Atlas notu: %70 kitabın verdiği yaklaşık değerdir; hipertrofik kardiyomiyopatide penetrans yaşla artar ve gene göre değişir.' },
    { t: 'Huntington hastalığında CAG tekrar sayısının kuşaktan kuşağa artması, hastalığın sonraki kuşaklarda daha genç yaşta ya da daha ağır görülmesine yol açabilir.', d: true, n: 'Doğru. Tekrar bölgesi kararsızdır ve her kuşakta uzama eğilimindedir; buna antisipasyon denir. [[K1 s. 11]]' },
  ],
};

const D03_NAV = [['d03-kromozom', 'Kromozom'], ['d03-dna', 'DNA ve RNA'], ['d03-sentez', 'Genden proteine'], ['d03-mutasyon', 'Gen mutasyonları'], ['d03-mayoz', 'Diploit, haploit, mayoz'], ['d03-kalitim', 'Mendel kalıtımı'], ['d03-penetrans', 'Penetrans'], ['d03-p1', 'Part I'], ['d03-p2', 'Part II'], ['d03-ozet', 'Özet']];

SAYFALAR['dersler/fizyoloji/03'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 1 · Temel bilgiler · Bölüm 3', baslik: 'Genetik',
  lede: 'Genetik kod hücrede nerede ve nasıl saklanır, nasıl okunup proteine çevrilir, kopyalama hataları hangi hastalıklara yol açar ve özellikler kuşaktan kuşağa nasıl aktarılır? [[K1 s. 9–12]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D03_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d03-kromozom">
  <h2>Kromozom: paketlenmiş DNA</h2>
  <p class="intro">Genetik kod her hücrenin çekirdeğinde paketlenmiş DNA olarak saklanır; hücre bölünmeye hazırlanırken bu paket kromozomlara dönüşür. [[K1 s. 9]]</p>
  <div class="viz">
    <div class="viz-head"><h3>Çekirdekten kromozoma</h3></div>
    <div data-viz="f03_kromozom"></div>
    <p class="viz-cap" aria-live="polite">Çekirdekteki yoğun kromatin, bölünme öncesinde iplik benzeri kromozomlara düzenlenir; her kromozom kıvrılmış tek bir DNA molekülüdür. Hücrede 46 kromozom (23 çift): 22 çift otozom ve 1 çift allozom (XX ya da XY); gamette 23. [[K1 s. 9]]</p>
    <p class="viz-foot">Şematik çizim; kromozom boyları yaklaşık oranlıdır.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>İki kromozom tipi de DNA taşır; bireyin cinsiyetini yalnız allozomlar (cinsiyet kromozomları) belirler. [[K1 s. 9]]</p>
    <p>İnsan Genom Projesi 2003'te bütün insan genlerinin dizisini çıkardı ve "genom çağı"nı başlattı. Genetik tıbbı kökten değiştirdi, ama genlerin çoğunun fenotipteki önemi hâlâ iyi bilinmiyor; bu, fizyoloji araştırmalarının gelecekteki ana konularından biri. [[K1 s. 9]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d03-dna">
  <h2>DNA ve RNA: dört harfli zincirler</h2>
  <p class="intro">DNA dört nükleotidin art arda dizildiği bir polimerdir; çoğu zaman tamamlayıcı ikinci bir zincire bağlanıp çift sarmal hâlinde kıvrılır. [[K1 s. 9]]</p>
  <div class="viz"><div data-viz="f03_dna"></div></div>
  <div class="blk-body" style="margin-top:16px">
    <p>Her zincirin iki parçası vardır. <b>Şeker–fosfat omurgası</b>, deoksiriboz ile fosfatın sırayla dizilmesidir; şekerler pentoz fosfat yolunda üretilen beş karbonlu pentozlardır (Bölüm 77). Dizilişi genetik kodu oluşturan dört <b>nükleobaz</b> guanin (G), adenin (A), timin (T) ve sitozindir (C); A ve G <b>pürin</b>, T ve C <b>pirimidindir</b>. [[K1 s. 9]]</p>
    <p>Zincirler <b>antiparaleldir</b>: ters yönlerde uzanır [[K1 s. 9–10]]. Yapboz gibi kenetlenirler: C yalnız G ile, A yalnız T ile <b>tamamlayıcı çift</b> kurar, bir A başka bir A'nın karşısına oturamaz; bu yüzden iki zincirin bütün dizileri birbirine uymalıdır. Eşleşen bazları <b>hidrojen bağları</b> bir arada tutar. [[K1 s. 9]]</p>
    <p>RNA da şeker–fosfat omurgasına dizilmiş bazlardan oluşur, ama üç farkı vardır: şekerinde DNA'nın şekerinde olmayan bir hidroksil grubu bulunur ("deoksi" adı buradan gelir), timin yerine urasil (U) taşır ve genellikle tek zincirlidir, çift sarmal kuracağı antiparalel eşi yoktur. Şekildeki "RNA olsaydı" düğmesi bu farkları gösterir. [[K1 s. 10]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap hidrojen bağını "van der Waals etkileşiminin özellikle güçlü bir türü" sayar; biyokimyada hidrojen bağı van der Waals kuvvetlerinden ayrı ve daha güçlü, kovalent olmayan bir etkileşimdir. Kitabın kodon ve mutasyon anlatımında "nükleozit" dediği zincir birimi nükleotittir (baz + şeker + fosfat; nükleozitte fosfat yoktur).</div>
</section>

<section class="wrap blk ders-sec" id="d03-sentez">
  <h2>Genden proteine: RNA tipleri ve kodon</h2>
  <p class="intro">Kod çekirdekte sabittir, proteini yapan aygıt (endoplazmik retikulum ve Golgi aygıtı, Bölüm 2) ise sitoplazmadadır; RNA, kodun kopyası olarak çekirdekte yapılıp sitoplazmaya taşınarak bu sorunu çözer. [[K1 s. 9–10]]</p>
  <div class="viz"><div data-viz="f03_sentez"></div></div>
  <div class="tbl-wrap" style="margin-top:16px">
    <table class="tbl">
      <thead><tr><th>RNA tipi</th><th>Nerede, ne yapar?</th></tr></thead>
      <tbody>
        <tr><th>mRNA · haberci</th><td>Çekirdekte DNA'nın belirli bir bölümünün kopyası olarak yapılır (<b>transkripsiyon</b>); çekirdekten çıkıp hücrenin protein fabrikası olan granüllü ER'nin ribozomlarına gider. [[K1 s. 10]]</td></tr>
        <tr><th>tRNA · taşıyıcı</th><td>Sitoplazmada 20 amino asidi toplayıp ribozoma getirir; kitaba göre 20 tip tRNA vardır. [[K1 s. 10]]</td></tr>
        <tr><th>rRNA · ribozomal</th><td>Ribozomda amino asit yüklü tRNA'ları mRNA dizisi boyunca doğru yerlere dizer; amino asitler bağlanır ve tamamlanan protein serbest kalır. [[K1 s. 10]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Kodon</b>, mRNA'da tek bir amino asidi kodlayan üç nükleotitlik dizidir: GCA alanini kodlar. tRNA'nın mRNA'ya bağlanan üçlüsü kodonun yapboz eşidir (<b>antikodon</b>): GCA'nın eşi CGU'dur, yani CGU antikodonlu tRNA alanin taşır. [[K1 s. 10]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Genetik kod dejenere olduğu için (61 anlamlı kodon, 20 amino asit) birçok amino asidi birden çok tRNA türü taşır; tRNA türü 20'den fazladır. Bütün proteinler granüllü ER'de yapılmaz: sitozolde kalacak proteinler serbest ribozomlarda sentezlenir.</div>
</section>

<section class="wrap blk ders-sec" id="d03-mutasyon">
  <h2>Klinik önem: gen mutasyonları</h2>
  <p class="intro">DNA kopyalanırken (replikasyon) ya da onarılırken oluşan bir hata mRNA ile ribozoma taşınır ve klinik sonucu olan anormal bir proteine çevrilir. [[K1 s. 11]]</p>
  <div class="viz"><div data-viz="f03_mutasyon"></div></div>
  <div class="blk-body" style="margin-top:16px">
    <p>Sık hata tipleri üçtür: <b>nokta mutasyonu</b> (tek nükleotidin yanlış kopyalanması), <b>delesyon</b> (bir ya da daha çok nükleotidin silinmesi) ve <b>insersiyon</b> (kısa bir DNA dizisinin araya girmesi). Delesyon ve insersiyon nokta mutasyonundan çok daha ağır olabilir: okuma çerçevesi kayarsa DNA belirgin biçimde değişmiş bir protein kodlar. [[K1 s. 11]]</p>
  </div>
  <div class="cols cols-3" style="margin-top:16px">
    <div class="card clin"><span class="tag clin">Nokta mutasyonu</span><h3>Orak hücre hastalığı</h3><p>11. kromozomdaki hemoglobin β-zinciri geninde altıncı amino asidin kodonu GAG (glutamik asit) yerine GTG (valin) okunur. Polar glutamik asidin yerini polar olmayan valin alır; düşük O₂ basıncında Hb kümelenir ve eritrositin biçimi değişir. [[K1 s. 11]]</p></div>
    <div class="card clin"><span class="tag clin">Delesyon</span><h3>Kistik fibrozis</h3><p>Transmembran Cl⁻ kanalını kodlayan CFTR geninde mutasyon: zarın Cl⁻ geçirgenliği, buna bağlı olarak hücreden dışarı su hareketi azalır. Koyulaşan salgıyı silyalı epitel temizleyemez; küçük hava yolları (pnömoni), pankreas kanalları (sindirim enzimlerinin akışı engellenir) ve vas deferens (erkekte eksik gelişim, infertilite) tıkanır. 1000'den fazla mutasyon tanımlanmıştır; en sık ΔF508'de üç nükleotit silinir ve proteinden 508. konumdaki fenilalanin (F) eksilir. [[K1 s. 11]]</p></div>
    <div class="card clin"><span class="tag clin">Trinükleotit tekrarı</span><h3>Huntington hastalığı</h3><p>Nörodejeneratif hastalık; nedeni tekrarlayan DNA parçalarının araya girmesidir: 4. kromozomdaki Huntington geninde glutamin kodonu CAG art arda çok kez tekrarlanır (trinükleotit tekrar hastalığı). Bölge kararsızlaşır, tekrar sayısı her kuşakta artma eğilimindedir; hastalık sonraki kuşaklarda daha genç yaşta ya da daha ağır görülebilir: <b>antisipasyon</b>. [[K1 s. 11]]</p></div>
  </div>
  <div class="viz" style="margin-top:16px"><div data-viz="f03_tekrar"></div></div>
</section>

<section class="wrap blk ders-sec" id="d03-mayoz">
  <h2>Diploit ve haploit hücreler: mayoz</h2>
  <p class="intro">İnsan hücrelerinin hemen hepsi 46 kromozomla (23 çift) <b>diploittir</b>; gametler (sperm, yumurta) 23 tek kromozomla <b>haploittir</b>. [[K1 s. 11]]</p>
  <div class="viz"><div data-viz="f03_gamet"></div></div>
  <div class="blk-body" style="margin-top:16px">
    <p>Gametler birleşince kromozomları eşleşir ve 23 çiftli yeni bir hücre oluşur. Gametlerin oluştuğu <b>mayozda</b> her çiftin hangi üyesinin gamete gideceği rastlantıyla belirlenir; bu yüzden bir kişi kuramsal olarak 2²³ (≈ 8,4 milyon) farklı gamet, bir çift 2⁴⁶ farklı çocuk oluşturabilir. [[K1 s. 11]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d03-kalitim">
  <h2>Mendel kalıtımı</h2>
  <p class="intro">Her karakter için biri anneden, biri babadan en az iki alel vardır; kişinin o özelliği gösterip göstermeyeceğini bu alellerin etkileşimi belirler. [[K1 s. 11]]</p>
  <div class="viz"><div data-viz="f03_kalitim"></div></div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>Karakter</b> (trait), bir genin kodladığı özelliktir (fenotip): göz rengi gibi görünür ya da bir plazma proteini gibi görünmez olabilir. Bir genin her farklı biçimi bir <b>aleldir</b> (ör. mavi göz ve kahverengi göz alelleri). <b>Dominant</b> aleller (büyük harf) <b>resesif</b> alellerin (küçük harf) etkisini örter. [[K1 s. 11]]</p>
  </div>
  <div class="tbl-wrap" style="margin-top:12px">
    <table class="tbl">
      <thead><tr><th>Kalıtım biçimi</th><th>Fenotip ne zaman görülür?</th><th>Kitaptaki çaprazlama</th><th>Örnekler</th></tr></thead>
      <tbody>
        <tr><th>Otozomal dominant</th><td>Tek hastalık aleli yeter (<b>A</b>a; kalın A hastalık alelidir); kitaba göre ebeveynlerden biri de hastadır. [[K1 s. 11]]</td><td>Hasta (<b>A</b>a) × sağlıklı (aa): %50 hasta, %50 sağlıklı [[K1 s. 11–12]]</td><td>Hipertrofik kardiyomiyopati, polikistik böbrek hastalığı, miyotonik distrofi [[K1 s. 11]]</td></tr>
        <tr><th>Otozomal resesif</th><td>Yalnız iki alel de resesifse (aa, homozigot); ebeveynler çoğu zaman hasta değil, taşıyıcıdır (heterozigot, Aa). [[K1 s. 11–12]]</td><td>Aa × Aa: %25 AA (hastalıksız), %50 Aa (taşıyıcı), %25 aa (hasta) [[K1 s. 12]]</td><td>Orak hücre hastalığı, Wilson hastalığı, kistik fibrozis [[K1 s. 12]]</td></tr>
        <tr><th>X'e bağlı resesif</th><td>Gen X kromozomundadır; genellikle yalnız erkek (XY) hastalanır, kadında (XX) öbür X'teki normal alel korur. [[K1 s. 12]]</td><td>Taşıyıcı anne × sağlıklı baba: %25 taşıyıcı kız, %25 sağlıklı kız, %25 sağlıklı oğul, %25 hasta oğul [[K1 s. 12]]</td><td>Hemofili A, Duchenne musküler distrofisi, kırmızı–yeşil renk körlüğü [[K1 s. 12]]</td></tr>
      </tbody>
    </table>
  </div>
  <p class="small muted" style="margin:12px 0 0;max-width:80ch">Resesif hastalıklar tipik olarak daha erken yaşta, çoğu zaman doğumdan itibaren belirti verir; dominant hastalıklar sıklıkla genç erişkinlikte ortaya çıkar. [[K1 s. 12]]</p>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Otozomal dominant hastalık hasta bir ebeveyn olmadan da görülebilir: yeni (de novo) mutasyonla (ör. akondroplazi olgularının çoğu) ya da eksik penetrans nedeniyle hastalığı göstermeyen bir ebeveynden. Erkekte X'teki genlerin tek kopyası vardır (hemizigot); "en az iki alel" kuralı bu genlerde geçmez ve X'e bağlı resesif hastalığın erkekte görülmesinin nedeni budur.</div>
</section>

<section class="wrap blk ders-sec" id="d03-penetrans">
  <h2>Penetrans ve karmaşık kalıtım</h2>
  <p class="intro">Mendel kalıtımı genotipin aktarılmasını anlatır, ama genotipi almak her zaman fenotipi göstermek demek değildir; genotipin fenotipe yansıma oranına <b>penetrans</b> denir. [[K1 s. 12]]</p>
  <div class="viz"><div data-viz="f03_penetrans"></div></div>
  <div class="blk-body" style="margin-top:16px">
    <p>Hipertrofik kardiyomiyopatinin penetransı yaklaşık %70'tir: mutasyonu alan yaklaşık her 100 kişiden 70'inde hastalık gelişir (<b>eksik penetrans</b>). Nörofibromatoziste penetrans %100'dür (<b>tam penetrans</b>). Eksik penetrans çoğunlukla otozomal dominant, bazen de otozomal resesif hastalıklar için söz konusudur. [[K1 s. 12]]</p>
    <p>Kalıtsal özelliklerin çoğu tek genli Mendel kurallarına uymaz: diyabet ve iskemik kalp hastalığı ailede görülebilir, ama kalıtımları çok daha karmaşıktır; çoğu zaman çok genli (poligenik), yaşla ilişkilidir ve genetik etkenlerin yanında çevresel etkenleri de içerir. [[K1 s. 12]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d03-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu bölüm MTF sorularında çoğunlukla tanımlar, sayılar ve eşleştirmeler üzerinden sorulur: hangi baz pürin, hangisi pirimidindir; DNA ile RNA nasıl ayrılır; hangi RNA tipi ne iş yapar; hangi kodon hangi amino asidi kodlar; hangi mutasyon hangi hastalığa yol açar; kalıtım biçimleri, olasılıkları ve penetrans. Aşağıdaki sorular bu atlas için yazılmıştır; her önermenin açıklaması kitaptaki sayfasına bağlıdır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz03-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz03-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz03-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d03-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"DNA'nın yapısını anlatın. Bir gendeki bilgi nasıl proteine dönüşür ve tek bir baz değişikliği nasıl hastalığa yol açabilir?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Nerede saklanır?</b> Çekirdekte kromatin olarak; bölünmeye hazırlanırken kromozomlara düzenlenir. 46 kromozom (23 çift): 22 çift otozom ve bir çift allozom; gametlerde 23. [[K1 s. 9]]</li>
    <li><b>DNA'nın yapısı, çizerek.</b> Deoksiriboz–fosfat omurgası ve dört baz (A ve G pürin, T ve C pirimidin). Antiparalel iki zincir, tamamlayıcı çiftler A–T ve C–G, eşleşen bazlar arasında hidrojen bağları. [[K1 s. 9–10]]</li>
    <li><b>RNA'nın farkları.</b> Şekerde fazladan hidroksil grubu, T yerine U, genellikle tek zincir. Üç tip: mRNA, tRNA, rRNA. [[K1 s. 10]]</li>
    <li><b>Genden proteine.</b> Transkripsiyonla çekirdekte mRNA yapılır ve ribozoma gider. Her kodon bir amino asidi kodlar (durdurma kodonları dışında); tRNA'nın antikodonu kodona eşleşir (GCA–CGU, alanin); rRNA tRNA'ları dizer ve amino asitler birbirine bağlanır. [[K1 s. 10]]</li>
    <li><b>Mutasyon tipleri.</b> Nokta mutasyonu, delesyon, insersiyon. Okuma çerçevesi kayması neden daha ağırdır? Sonraki bütün kodonlar değişir. [[K1 s. 11]]</li>
    <li><b>Klinik örnekle bitirin.</b> Orak hücre hastalığı: 11. kromozom, β-zinciri, altıncı amino asit GAG → GTG (Glu → Val); düşük O₂ basıncında Hb kümelenir, eritrositin biçimi değişir. Otozomal resesif: iki taşıyıcı ebeveynin her çocuğu için %25 hasta, %50 taşıyıcı. [[K1 s. 11–12]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim DNA "merdivenidir": iki omurga, 5′ ve 3′ uçları, A–T ve C–G basamakları. İkinci çizim olarak otozomal resesif çaprazlamanın 2 × 2 karesi.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Kistik fibrozis hangi mutasyonla, hangi organlarda nasıl bulgu verir? Huntington hastalığında antisipasyon nedir? Taşıyıcı bir annenin çocuklarında X'e bağlı resesif hastalığın olasılıkları nelerdir? Penetrans nedir, bir örnek verin. Cevapların hepsi yukarıda. [[K1 s. 11–12]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d03-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>46 kromozom (23 çift): 22 çift otozom ve bir çift allozom (XX ya da XY); cinsiyeti allozomlar belirler. Gametler 23 kromozom taşır. [[K1 s. 9]]</li>
    <li>DNA: deoksiriboz–fosfat omurgası ve dört baz; A ve G pürin, T ve C pirimidin. Antiparalel çift sarmal, A–T ve C–G çiftleri, hidrojen bağları. [[K1 s. 9]]</li>
    <li>RNA: şekerde fazladan hidroksil, T yerine U, genellikle tek zincir. mRNA kodu taşır (transkripsiyon), tRNA amino asidi getirir, rRNA dizer ve bağlar. [[K1 s. 10]]</li>
    <li>Kodon, mRNA'da bir amino asidi kodlayan üç bazdır (GCA = alanin); antikodon onun tRNA'daki eşidir (CGU). [[K1 s. 10]]</li>
    <li>Mutasyonlar: nokta, delesyon, insersiyon; okuma çerçevesi kayarsa sonuç nokta mutasyonundan çok daha ağır olabilir. Orak hücre GAG → GTG (Glu → Val); kistik fibrozis CFTR'de ΔF508; Huntington'da CAG tekrarı ve antisipasyon. [[K1 s. 11]]</li>
    <li>Mayozda çiftler rastgele ayrılır: kuramsal olarak 2²³ farklı gamet, bir çift için 2⁴⁶ farklı çocuk. [[K1 s. 11]]</li>
    <li>Otozomal dominant Aa × aa: %50 hasta. Otozomal resesif Aa × Aa: %25 hasta, %50 taşıyıcı. X'e bağlı resesif, taşıyıcı anne: oğulların yarısı hasta, kızların yarısı taşıyıcı. [[K1 s. 11–12]]</li>
    <li>Penetrans: hipertrofik kardiyomiyopatide yaklaşık %70, nörofibromatoziste %100. Çoğu kalıtsal özellik poligeniktir ve çevreyle etkileşir. [[K1 s. 12]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="3"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/02">← Bölüm 2 · Hücrenin bileşenleri ve işlevi</a>
    <a href="#/dersler/fizyoloji/04">Sonraki: Bölüm 4 · Hücre zarı →</a>
  </nav>
</section>`,
};
