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

const D3_NAV = [['d03-kromozom', 'Kromozom'], ['d03-dna', 'DNA'], ['d03-rna', 'RNA'], ['d03-kodon', 'Kodon ve protein sentezi'], ['d03-mutasyon', 'Gen mutasyonları'], ['d03-mayoz', 'Diploit, haploit, mayoz'], ['d03-kalitim', 'Mendel kalıtımı'], ['d03-penetrans', 'Penetrans'], ['d03-p1', 'Part I'], ['d03-p2', 'Part II'], ['d03-ozet', 'Özet']];

SAYFALAR['dersler/fizyoloji/03'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 1 · Temel bilgiler · Bölüm 3', baslik: 'Genetik',
  lede: 'Genetik kod hücrede nerede ve nasıl saklanır, nasıl okunup proteine çevrilir, kopyalama hataları hangi hastalıklara yol açar ve özellikler kuşaktan kuşağa nasıl aktarılır? [[K1 s. 9–12]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D3_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d03-kromozom">
  <h2>Kromozom: paketlenmiş DNA</h2>
  <div class="blk-body">
    <p>İnsan Genom Projesi 2003'te tamamlandığında bütün insan genlerinin dizisi çıkarılmış ve "genom çağı" başlamıştı. Genetik bilgisi tıbbı kökten değiştirdi; yine de genlerin çoğunun fenotipte ne işe yaradığı hâlâ iyi anlaşılmamıştır ve bu, fizyoloji araştırmalarının önümüzdeki dönemdeki başlıca konularından biri olacaktır. [[K1 s. 9]]</p>
    <p>Bir kişinin genetik kodu her hücrenin çekirdeğinde, <b>kromatin</b> denen yoğun bir yapı içinde paketlenmiştir. Hücre bölünmeye hazırlanırken kromatin iplik benzeri <b>kromozomlar</b> hâlinde düzenlenir; her kromozom aslında tek parça, kıvrılmış bir DNA molekülüdür. Hücrelerde toplam 46 kromozom (23 çift) bulunur. Başlıca istisna gametlerdir: sperm ve yumurta 23 kromozom taşır. [[K1 s. 9]]</p>
  </div>
  <div class="cols" style="margin-top:16px">
    <div class="card basic"><span class="tag basic">22 çift</span><h3>Otozomlar</h3><p>Cinsiyet kromozomu olmayan kromozomlar. DNA taşırlar, bireyin cinsiyetini belirlemezler. [[K1 s. 9]]</p></div>
    <div class="card basic"><span class="tag basic">1 çift</span><h3>Allozomlar (cinsiyet kromozomları)</h3><p>Kadında XX, erkekte XY. İki kromozom tipi de DNA taşır; bireyin cinsiyetini belirleyen yalnızca allozomlardır. [[K1 s. 9]]</p></div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d03-dna">
  <h2>DNA: dört harfli bir polimer</h2>
  <p class="intro">DNA, dört nükleotidin art arda dizilmesiyle oluşan bir polimerdir. Çoğu zaman tamamlayıcı ikinci bir zincire bağlıdır ve onunla birlikte çift sarmal biçiminde kıvrılır. Tek bir zinciri iki bölümden oluşmuş gibi düşünmek kolaylık sağlar. [[K1 s. 9]]</p>
  <div class="cols">
    <div class="card"><h3>Şeker–fosfat omurgası</h3><p>Birbirini izleyen deoksiriboz şekeri ve fosfat grupları. Omurgadaki şekerler beş karbonlu (pentoz) karbonhidratlardır; kitap bunların pentoz fosfat yolundan geldiğini belirtir (Bölüm 77). [[K1 s. 9]]</p></div>
    <div class="card"><h3>Nükleobazlar</h3><p>Dizilişleri genetik kodu oluşturan dört baz: guanin (G), adenin (A), timin (T) ve sitozin (C). Kimyasal yapılarına göre A ve G <b>pürin</b>, T ve C <b>pirimidindir</b>. [[K1 s. 9]]</p></div>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Çift sarmalın üç özelliği:</p>
    <ul>
      <li><b>Antiparalel zincirler.</b> İki zincir ters yönlerde uzanır: birinin 5′ ucunun karşısında öbürünün 3′ ucu durur. [[K1 s. 9–10]]</li>
      <li><b>Tamamlayıcı baz çiftleri.</b> Zincirler yapboz parçaları gibi kenetlenir: C yalnızca G ile, A yalnızca T ile eşleşir; bir A, başka bir A'nın karşısına oturamaz. Bu yüzden iki zincirin birbirine uyması için birinin bütün dizisi öbürünün bütün dizisine karşılık gelmelidir. [[K1 s. 9]]</li>
      <li><b>Hidrojen bağları.</b> Eşleşen bazlar arasındaki hidrojen bağları iki zinciri bir arada tutar. [[K1 s. 9]]</li>
    </ul>
  </div>
  <div class="viz" style="margin-top:16px"><div data-viz="f03_dna"></div></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap hidrojen bağını "van der Waals etkileşiminin özellikle güçlü bir türü" diye tanımlar. Biyokimya kaynaklarının çoğu hidrojen bağını van der Waals kuvvetlerinden ayrı ve onlardan daha güçlü, kovalent olmayan bir etkileşim olarak sınıflar. A–T çifti arasında iki, G–C çifti arasında üç hidrojen bağı vardır. Pentoz fosfat yolu doğrudan riboz-5-fosfat üretir; DNA'daki deoksiriboz, ribonükleotitlerden ribonükleotit redüktaz enzimiyle oluşur.</div>
</section>

<section class="wrap blk ders-sec" id="d03-rna">
  <h2>RNA: kodun taşınabilir kopyası</h2>
  <p class="intro">Bir proteinin amino asit dizisi çekirdekteki DNA'da yazılıdır, ama kod çekirdekte sabittir; proteini üreten aygıt (endoplazmik retikulum ve Golgi aygıtı, Bölüm 2) ise sitoplazmadadır. Bu sorunu RNA çözer: çekirdekte DNA'daki kodun kopyası olarak üretilir, sitoplazmaya taşınır ve orada protein sentezinde kullanılır. [[K1 s. 9–10]]</p>
  <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Özellik</th><th>DNA</th><th>RNA</th></tr></thead>
      <tbody>
        <tr><th>Omurga</th><td>Deoksiriboz ve fosfat</td><td>Riboz ve fosfat; şekerde DNA'nın şekerinde olmayan bir hidroksil grubu vardır (DNA'nın adındaki "deoksi" bu yüzden) [[K1 s. 10]]</td></tr>
        <tr><th>Bazlar</th><td>A, G, C, T</td><td>A, G, C, U: timin yerine urasil [[K1 s. 10]]</td></tr>
        <tr><th>Zincir</th><td>İki antiparalel zincir, çift sarmal</td><td>Genellikle tek zincir; çift sarmal kuracağı antiparalel bir eşi yoktur [[K1 s. 10]]</td></tr>
        <tr><th>Görevi</th><td>Kodu çekirdekte saklar</td><td>Kodu sitoplazmaya taşır ve protein sentezinde kullanılır [[K1 s. 9–10]]</td></tr>
      </tbody>
    </table>
  </div>
  <h3 style="margin:20px 0 10px">Üç ana RNA tipi</h3>
  <div class="cols cols-3">
    <div class="card"><span class="tag">mRNA · haberci</span><p>Çekirdekte DNA'nın belirli bir bölümünün kopyası olarak sentezlenir; bu sürece <b>transkripsiyon</b> denir. Sonra çekirdekten çıkar ve hücrenin protein fabrikası olan granüllü ER'nin ribozomlarına gider. [[K1 s. 10]]</p></div>
    <div class="card"><span class="tag">tRNA · taşıyıcı</span><p>Sitoplazmada amino asitleri toplar ve protein sentezi için ribozoma getirir. Kitap 20 amino asit için 20 tip tRNA olduğunu yazar. [[K1 s. 10]]</p></div>
    <div class="card"><span class="tag">rRNA · ribozomal</span><p>Ribozomun içinde, amino asitlerini taşıyan tRNA'ları mRNA dizisi boyunca doğru konumlara dizer. Amino asitler birbirine bağlanır ve tamamlanan protein serbest bırakılır. [[K1 s. 10]]</p></div>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Genetik kod dejeneredir: 61 anlamlı kodon 20 amino asidi kodlar ve birçok amino asidi birden fazla tRNA türü taşır; bu yüzden hücredeki tRNA türlerinin sayısı 20'den fazladır. Ayrıca bütün proteinler granüllü ER'de yapılmaz: sitozolde kalacak proteinler serbest ribozomlarda, salgılanacak ya da zara yerleşecek proteinler ER'ye bağlı ribozomlarda sentezlenir.</div>
</section>

<section class="wrap blk ders-sec" id="d03-kodon">
  <h2>Kodon, antikodon ve protein sentezi</h2>
  <p class="intro">Kodon, mRNA'da yan yana duran ve tek bir amino asidi kodlayan üç bazlık bir dizidir. Kitabın örneğinde GCA alanini kodlar. tRNA da aynı üçlüleri kullanır: mRNA'ya bağlanabilmesi için taşıdığı üçlünün kodonun yapboz eşi olması gerekir; buna <b>antikodon</b> denir. GCA'nın eşi CGU'dur, dolayısıyla CGU antikodonlu tRNA alanin taşır. Aşağıda kısa bir genin çekirdekten proteine yolculuğunu adım adım izleyin. [[K1 s. 10]]</p>
  <div class="viz"><div data-viz="f03_sentez"></div></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitap kodonu ve mutasyonları "nükleozit" üzerinden anlatır. Zincirin birimleri fosfat da içerdiği için doğru terim nükleotittir: nükleozit baz ve şekerden, nükleotit baz, şeker ve fosfattan oluşur. Antikodon kodonla antiparalel eşleşir. Kitaptaki CGU, antikodonun kodonla aynı hizada (3′→5′) yazılmış hâlidir; diziler kural olarak 5′→3′ yönünde yazıldığında aynı antikodon UGC olur.</div>
</section>

<section class="wrap blk ders-sec" id="d03-mutasyon">
  <h2>Klinik önem: gen mutasyonları</h2>
  <p class="intro">DNA kopyalanırken (replikasyon) ya da onarılırken hata olabilir. Hatalı DNA protein sentezinde kullanılmaya devam eder: hatayı taşıyan mRNA ribozoma gider ve anormal bir proteine çevrilir. Anormal proteinlerin klinik sonuçları vardır. [[K1 s. 11]]</p>
  <div class="cols cols-3">
    <div class="card"><h3>Nokta mutasyonu</h3><p>Dizide tek bir birimin yanlış kopyalanması. [[K1 s. 11]]</p></div>
    <div class="card"><h3>Delesyon</h3><p>Bir ya da daha fazla birimin diziden yanlışlıkla çıkması. [[K1 s. 11]]</p></div>
    <div class="card"><h3>İnsersiyon</h3><p>Diziye kısa bir DNA parçasının yanlışlıkla eklenmesi. [[K1 s. 11]]</p></div>
  </div>
  <p class="small muted" style="margin:12px 0 16px;max-width:80ch">Delesyon ve insersiyonlar nokta mutasyonlarından çok daha ağır olabilir: okuma çerçevesi kayarsa sonraki bütün kodonlar farklı okunur ve DNA belirgin biçimde değişmiş bir protein kodlar. [[K1 s. 11]]</p>
  <div class="viz"><div data-viz="f03_mutasyon"></div></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Çerçeve kayması yalnızca eklenen ya da silinen nükleotit sayısı üçün katı değilse olur. Üç nükleotit (ya da üçün bir katı) eklenir veya silinirse çerçeve korunur ve protein bir ya da birkaç amino asit fazla ya da eksik olur. Kistik fibrozisin ΔF508 mutasyonu bunun örneğidir.</div>

  <h3 style="margin:24px 0 10px">Üç klinik örnek</h3>
  <div class="cols cols-3">
    <div class="card clin"><span class="tag clin">Nokta mutasyonu</span><h3>Orak hücre hastalığı</h3><p>11. kromozomdaki hemoglobin β-zinciri geninde nokta mutasyonu: altıncı amino asidin kodonu GAG (glutamik asit) yerine GTG (valin) okunur. Polar bir amino asidin yerini polar olmayan bir amino asit alır; düşük O₂ basıncında Hb kümelenir ve eritrositin biçimi değişir. Otozomal resesif geçer. [[K1 s. 11–12]]</p></div>
    <div class="card clin"><span class="tag clin">Delesyon</span><h3>Kistik fibrozis</h3><p>Transmembran Cl⁻ kanalını kodlayan CFTR genindeki mutasyonlar. Zarın Cl⁻ geçirgenliği ve buna bağlı olarak hücreden dışarı su hareketi azalır; koyulaşan salgıları silyalı epitel temizleyemez. Küçük hava yolları (pnömoni), pankreas kanalları (sindirim enzimlerinin akışı engellenir) ve vas deferens (erkekte eksik gelişim ve infertilite) tıkanır. En sık mutasyon ΔF508: üç nükleotit silinir ve proteinde 508. konumdaki fenilalanin (F) eksilir. Otozomal resesif geçer. [[K1 s. 11–12]]</p></div>
    <div class="card clin"><span class="tag clin">Trinükleotit tekrarı</span><h3>Huntington hastalığı</h3><p>Nörodejeneratif bir hastalık. 4. kromozomdaki Huntington geninde glutamin kodonu CAG art arda çok sayıda tekrarlanır ("trinükleotit tekrar hastalığı"). Bu bölge kararsızdır ve tekrar sayısı her kuşakta artma eğilimindedir; bu yüzden hastalık sonraki kuşaklarda daha genç yaşta ya da daha ağır görülebilir: <b>antisipasyon</b>. [[K1 s. 11]]</p></div>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu · orak hücre.</b> Kitap aynı paragrafta yer değiştirmenin yönünü İngilizcede ters kuran bir cümle kullanır. Doğru yön önceki cümlenin söylediğidir: polar glutamik asidin yerini polar olmayan valin alır (Glu → Val).</div>
  <div class="note plain"><b>Atlas notu · kistik fibrozis.</b> Kitap CFTR geninde 1000'den fazla nokta mutasyonu tanımlandığını yazar. Bugün CFTR'de 2000'i aşkın varyant bilinmektedir ve bunlar yalnızca nokta mutasyonları değildir; en sık görülen ΔF508 (F508del) de bir nokta mutasyonu değil, okuma çerçevesini koruyan üç nükleotitlik bir delesyondur. Kitap bunu bir kodonun tamamının silinmesi diye anlatır; aslında silinen üç nükleotit (CTT) 507. ve 508. kodonlara yayılır, 507. amino asit (izolösin) değişmeden kalır ve proteinden yalnızca 508. konumdaki fenilalanin eksilir.</div>
  <div class="viz" style="margin-top:16px"><div data-viz="f03_tekrar"></div></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu · Huntington.</b> Hastalık otozomal dominant geçer. CAG tekrar sayısı için yerleşik eşikler: 26 ve altı normal; 27–35 ara (kişide hastalık beklenmez, ama tekrar sonraki kuşakta uzayabilir); 36–39 eksik penetrans; 40 ve üstü tam penetrans. Tekrarın uzama eğilimi babadan geçişte daha belirgindir.</div>
</section>

<section class="wrap blk ders-sec" id="d03-mayoz">
  <h2>Diploit ve haploit hücreler: mayoz</h2>
  <p class="intro">İnsan hücrelerinin hemen hepsi 46 kromozom (23 çift) taşıdığı için <b>diploittir</b>. Gametler (sperm ya da yumurta) 23 tek kromozom taşır ve <b>haploittir</b>. Gametler birleşince kromozomları eşleşir ve 23 çift kromozomlu yeni bir hücre oluşur. Gametlerin oluştuğu süreçte (<b>mayoz</b>) her çiftin hangi üyesinin gamete gideceği rastlantıyla belirlenir. Bu yüzden bir kişi kuramsal olarak 2²³ farklı gamet, bir çift de 2⁴⁶ farklı çocuk oluşturabilir. [[K1 s. 11]]</p>
  <div class="viz"><div data-viz="f03_gamet"></div></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> 2²³ = 8.388.608, yani yaklaşık 8,4 milyon; 2⁴⁶ yaklaşık 7 × 10¹³, yani 70 trilyon kadardır. Bu hesap yalnızca çiftlerin rastgele ayrılmasını sayar. Mayozda homolog kromozomlar arasında parça değişimi (krossing-over, rekombinasyon) de olduğu için gerçek çeşitlilik bundan çok daha büyüktür.</div>
</section>

<section class="wrap blk ders-sec" id="d03-kalitim">
  <h2>Mendel kalıtımı</h2>
  <div class="blk-body">
    <p><b>Karakter</b> (trait), bir kişide bir genin kodladığı özellik, yani fenotiptir: göz rengi gibi görünür ya da bir plazma proteini gibi görünmez olabilir. Bir genin her farklı biçimine <b>alel</b> denir (ör. mavi göz alelleri ve kahverengi göz alelleri). Her kişide her karakter için biri anneden, biri babadan gelen en az iki alel bulunur ve kişinin o karakteri gösterip göstermeyeceğini bu alellerin etkileşimi belirler. <b>Dominant</b> aleller (büyük harfle gösterilir) <b>resesif</b> alellerin (küçük harfle gösterilir) etkisini örter. [[K1 s. 11]]</p>
  </div>
  <div class="tbl-wrap" style="margin-top:16px">
    <table class="tbl">
      <thead><tr><th>Kalıtım biçimi</th><th>Fenotip ne zaman görülür?</th><th>Kitaptaki çaprazlama</th><th>Örnekler</th></tr></thead>
      <tbody>
        <tr><th>Otozomal dominant</th><td>Tek hastalık aleli yeter (<b>A</b>a; kalın A hastalık alelidir). Kitaba göre hastanın ebeveynlerinden biri de hastadır; istisnalar için aşağıdaki Atlas notuna bakın. [[K1 s. 11]]</td><td>Hasta ebeveyn (<b>A</b>a) × sağlıklı ebeveyn (aa): her çocuk için %50 hasta (<b>A</b>a), %50 sağlıklı (aa) [[K1 s. 11–12]]</td><td>Hipertrofik kardiyomiyopati, polikistik böbrek hastalığı, miyotonik distrofi [[K1 s. 11]]</td></tr>
        <tr><th>Otozomal resesif</th><td>Yalnızca iki alel de resesifse (aa, homozigot). Hastanın ebeveynleri çoğu zaman hasta değil, taşıyıcıdır (heterozigot, Aa). [[K1 s. 11–12]]</td><td>Aa × Aa: %25 AA (hastalıksız), %50 Aa (taşıyıcı), %25 aa (hasta) [[K1 s. 12]]</td><td>Orak hücre hastalığı, Wilson hastalığı, kistik fibrozis [[K1 s. 12]]</td></tr>
        <tr><th>X'e bağlı resesif</th><td>Gen X kromozomundadır; hastalanan çoğunlukla erkektir (XY). Kadında (XX) öbür X'teki normal alel korur. [[K1 s. 12]]</td><td>Taşıyıcı anne × sağlıklı baba: %25 taşıyıcı kız, %25 sağlıklı kız, %25 sağlıklı oğul, %25 hasta oğul [[K1 s. 12]]</td><td>Hemofili A, Duchenne musküler distrofisi, kırmızı–yeşil renk körlüğü [[K1 s. 12]]</td></tr>
      </tbody>
    </table>
  </div>
  <p class="small muted" style="margin:12px 0 16px;max-width:80ch">Resesif hastalıklar dominant olanlara göre tipik olarak daha erken yaşta, çoğu zaman doğumdan itibaren belirti verir; dominant hastalıklar sıklıkla genç erişkinlikte ortaya çıkar. [[K1 s. 12]]</p>
  <div class="viz"><div data-viz="f03_kalitim"></div></div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu · otozomal dominant.</b> Kitap, otozomal dominant hastalığı olan kişinin ebeveynlerinden birinin de hasta olması gerektiğini yazar. Bu her zaman geçerli değildir: hastalık yeni (de novo) bir mutasyonla ortaya çıkabilir (ör. akondroplazi olgularının çoğu) ya da eksik penetrans nedeniyle hastalığı göstermeyen bir ebeveynden geçebilir.</div>
  <div class="note plain"><b>Atlas notu · X kromozomu.</b> Erkeklerde X kromozomundaki genlerin çoğunun tek kopyası vardır (hemizigot); "her karakter için en az iki alel" kuralı bu genler için geçerli değildir. X'e bağlı resesif hastalıkların erkeklerde görülmesinin nedeni budur.</div>
  <div class="note plain"><b>Atlas notu · anesteziyle bağlantı.</b> Malign hipertermiye yatkınlık otozomal dominant geçer (en sık RYR1 geni). Plazma kolinesteraz (butirilkolinesteraz) eksikliği otozomal resesiftir; homozigotlarda süksinilkolinin etkisi belirgin biçimde uzar.</div>
</section>

<section class="wrap blk ders-sec" id="d03-penetrans">
  <h2>Penetrans ve karmaşık kalıtım</h2>
  <p class="intro">Mendel kalıtımı genotipin aktarılmasını anlatır; ama genotipi almak her zaman fenotipi göstermek demek değildir. Genotipin fenotipe dönüşme oranına <b>penetrans</b> denir. Hipertrofik kardiyomiyopatinin penetransı yaklaşık %70'tir: mutasyonu alan yaklaşık her 100 hastadan 70'inde hastalık gerçekten gelişir (eksik penetrans). Penetransın %100 olduğu duruma tam penetrans denir; örneği nörofibromatozistir. Eksik penetrans çoğunlukla otozomal dominant, bazen de otozomal resesif hastalıklar için söz konusudur. [[K1 s. 12]]</p>
  <div class="viz"><div data-viz="f03_penetrans"></div></div>
  <div class="cols" style="margin-top:16px">
    <div class="card"><h3>Tek gen kuralına uymayanlar</h3><p>Kalıtsal özelliklerin çoğu basit, tek genli Mendel kurallarına uymaz. Diyabet ve iskemik kalp hastalığı ailesel olabilir, ama kalıtımları çok daha karmaşıktır: çoğu zaman çok genlidir (poligenik), yaşla ilişkilidir ve genetik etkenlerin yanında çevresel etkenleri de içerir. [[K1 s. 12]]</p></div>
    <div class="note plain"><b>Atlas notu.</b> Penetrans hastalığın görülüp görülmediğini, ekspresivite ise ne ağırlıkta görüldüğünü anlatır. Nörofibromatozis tip 1'de penetrans tama yakındır, ama bulgular aynı ailede bile hafiften ağıra çok değişkendir (değişken ekspresivite).</div>
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
