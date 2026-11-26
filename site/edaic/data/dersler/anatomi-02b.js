VERI.sorular = VERI.sorular || {};

VERI.sorular['an02b-1'] = {
  no: 1, kok: 'Kalbin bölünmesi ve aort arkları', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 92–95]]',
  onermeler: [
    { t: 'Septum sekundum, septum primumun solunda gelişir.', d: false, n: 'Sekundum primumun sağında gelişir ve serbest alt kenarıyla primumdaki açıklığı örter. [[K5 s. 92]]' },
    { t: 'Pektinat kaslı sağ atriyum duvarı ilkel atriyumdan gelişir.', d: true, n: 'İlkel atriyum trabeküllü duvarı verir, sinüs venozusun katıldığı bölüm düz kalır. [[K5 s. 93]]' },
    { t: 'İnterventriküler septumun kaslı kısmı apeks yönünde büyür.', d: false, n: 'Kaslı bölüm apeksten endokardiyal yastıklara doğru yükselir. [[K5 s. 93]]' },
    { t: 'Sağ rekürren laringeal sinir sağ subklavyen arteri dolanır.', d: true, n: 'Sağdaki distal altıncı ark geriler ve sinir dördüncü ark türevi çevresinde kalır. [[K5 s. 94]]' },
    { t: 'Beşinci ark erişkinde sol pulmoner arteri oluşturur.', d: false, n: 'Beşinci ark geriler, pulmoner arterler altıncı arklardan gelişir. [[K5 s. 94]]' },
  ],
};

VERI.sorular['an02b-2'] = {
  no: 2, kok: 'Fetal akım ve doğuma geçiş', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 95–97]]',
  onermeler: [
    { t: 'Vena kava inferior kapağı kanı foramen ovaleye yöneltir.', d: true, n: 'Bu yönlenme sağ atriyumda iki kaval akımın karışmasını sınırlar. [[K5 s. 95]]' },
    { t: 'Fetüste sağ ventrikülden çıkan kanın çoğu duktus arteriozus yoluyla inen aorta geçer.', d: true, n: 'Akciğere ulaşan akım sınırlıdır, pulmoner trunkusun başlıca çıkış yolu duktustur. [[K5 s. 96]]' },
    { t: 'Doğumda pulmoner vasküler direnç artar.', d: false, n: 'Akciğerlerin genişlemesiyle damar kıvrımları açılır ve direnç hızla düşer. [[K5 s. 96]]' },
    { t: 'Artan oksijen gerilimi duktus arteriozus duvarını kasar.', d: true, n: 'Kasılma işlevsel kapanmayı sağlar, tam obliterasyon sonraki 2–3 ayda gerçekleşir. [[K5 s. 96]]' },
    { t: 'Fallot tetralojisinde aort yalnızca sol ventrikülün üzerine oturur.', d: false, n: 'Geniş aort iki ventrikülün çıkışı üzerine biner ve sağ ventrikülden de kan alır. [[K5 s. 97]]' },
  ],
};

VERI.sorular['an02b-3'] = {
  no: 3, kok: 'Boynun büyük venleri ve santral kateter', kagit: 'Paper A · Anatomi', kaynak: '[[K5 s. 99–103]]',
  onermeler: [
    { t: 'Servikal sempatik zincir karotis kılıfının içinde seyreder.', d: false, n: 'Zincir kılıfın hemen arkasında yükselir. [[K5 s. 99]]' },
    { t: 'Eksternal juguler venin derin fasyayı deldiği yerdeki yaralanma hava embolisine yol açabilir.', d: true, n: 'Fasyadan geçen venin lümeni açık kalmaya eğilimlidir ve içine hava çekilebilir. [[K5 s. 100]]' },
    { t: 'Sağ frenik sinir sağ brakiyosefalik ven ile plevra arasından geçer.', d: true, n: 'Sinir venin lateral yüzü boyunca aşağı iner. [[K5 s. 100]]' },
    { t: 'Sol brakiyosefalik ven timik veni alır.', d: true, n: 'Timik ven ve sol superior interkostal ven sol tarafın ek kollarıdır. [[K5 s. 101]]' },
    { t: 'Juguler yoldan ilerletilen santral kateterin hedefi sağ atriyum girişindeki superior vena kavadır.', d: true, n: 'K5, juguler ve subklavyen yollar için ucun bu birleşimde kava içinde kalmasını tarif eder. [[K5 s. 103]]' },
  ],
};

SAYFALAR['dersler/anatomi/02b'] = {
  grup: 'dersler', eyebrow: 'Anatomi · Bölüm 2 · Ders 02b',
  baslik: 'Kalbin gelişimi, fetal dolaşım ve boynun büyük venleri',
  lede: 'Plasentadan gelen kan hangi yolu izleyerek beyne ulaşır? Boyundan ilerletilen bir kateter hangi damarların birleşiminden geçer?',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">
  <button type="button" data-scroll="an02b-kalp"><span>01</span>Kalp tüpü</button>
  <button type="button" data-scroll="an02b-ark"><span>02</span>Aort arkları</button>
  <button type="button" data-scroll="an02b-fetus"><span>03</span>Fetal dolaşım</button>
  <button type="button" data-scroll="an02b-anomali"><span>04</span>Doğumsal anomaliler</button>
  <button type="button" data-scroll="an02b-juguler"><span>05</span>Juguler venler</button>
  <button type="button" data-scroll="an02b-birlesim"><span>06</span>Toraks girişi</button>
  <button type="button" data-scroll="an02b-kateter"><span>07</span>Santral kateter</button>
  <button type="button" data-scroll="an02b-p1"><span>08</span>Part I</button>
  <button type="button" data-scroll="an02b-p2"><span>09</span>Part II</button>
  <button type="button" data-scroll="an02b-ozet"><span>10</span>Özet</button>
</nav>
<section class="wrap blk ders-sec" id="an02b-kalp">
  <h2>Kalp tüpünden dört boşluğa</h2>
  <p class="intro">Başlangıçta tek tüpte art arda bulunan venöz giriş ile arteriyel çıkış, tüpün kıvrılmasıyla ön-arka komşuluğu kazanır. [[K5 s. 92]]</p>
  <div class="viz"><div class="viz-head"><h3>Ortak boşluklar nasıl ayrılır?</h3></div><div data-viz="an02b_bolunme"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Tüpün dışındaki oluklar arkadan öne sinüs venozusu, atriyumu, ventrikülü ve bulbus kordisi sınırlar. [[K5 s. 92]] Büyüyen tüpte kaudal venöz uç, sefalik arteriyel ucun arkasına geçer. [[K5 s. 92]] Sinüs atriyuma, bulbus ventriküle katılır. [[K5 s. 92]] Erişkinde atriyumlar ve büyük venler bu nedenle ventriküllerin ve büyük arter köklerinin arkasındadır. [[K5 s. 92]]</p>
  <h3>Doğumdan sonra atriyal septum</h3>
  <p>Foramen ovale genellikle tamamen kapanır ve sağ atriyumun septal yüzünde fossa ovalis kalır. [[K5 s. 92–93]] K5’e göre erişkinlerin yaklaşık %10’unda geçiş işlevsel olarak kapalıyken açıklıktan sonda geçebilir. [[K5 s. 93]]</p>
  <h3>Geçici interventriküler foramen</h3>
  <p>Kaslı septum apeksten yastıklara doğru yükselir. [[K5 s. 93]] Serbest üst kenarının üzerinde kalan geçici interventriküler foramen, septumun küçük membranöz bölümü oluşunca kapanır. [[K5 s. 93]] İki büyük arterin birbirini dolanan seyri, ortak çıkışın spiral biçimde bölünmesinden gelir. [[K5 s. 93]]</p>
  <div class="cols"><div class="card"><h3>Sağ atriyum duvarı</h3><p>Sinüs venozusun katıldığı yüz düzdür ve daha önce sinüse dökülen iki vena kava artık ayrı ağızlarla atriyuma açılır. [[K5 s. 93]] Pektinat kasların kabarttığı bölüm ilkel atriyumdan kalır. [[K5 s. 93]]</p></div>
  <div class="card"><h3>Sol atriyum duvarı</h3><p>Başlangıçtaki tek pulmoner venöz trunkus atriyuma katılınca düzgün yüzlü bölüm ve dört ayrı pulmoner ven ağzı ortaya çıkar. [[K5 s. 93]] Trabeküllü bölümün kaynağı ilkel atriyum duvarıdır. [[K5 s. 93]]</p></div></div>

</section>
<section class="wrap blk ders-sec" id="an02b-ark">
  <h2>Aort arkları ve rekürren laringeal sinirler</h2>
  <p class="intro">Rekürren laringeal sinirin hangi damarı dolanacağını, o tarafta hangi ark bölümünün kalıcı olduğu belirler. [[K5 s. 94–95]]</p>
  <div class="viz"><div class="viz-head"><h3>Sağ ve sol sinirin dönüş noktasını izleyin</h3></div><div data-viz="an02b_ark"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Bulbus kordisten çıkan trunkus arteriozus altı çift ark verir. [[K5 s. 93–94]] Balıklarda solungaç yarıklarını besleyen arterlerin karşılığı olan bu arklar farenksin iki yanından arkaya kıvrılır. [[K5 s. 94]] Her yanda uzunlamasına bir dorsal aorta açılırlar, iki dorsal aort distalde birleşerek inen aortu oluşturur. [[K5 s. 94]]</p>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Ark</th><th>Gelişim sonunda</th></tr></thead><tbody>
  <tr><th>Birinci, ikinci ve beşinci</th><td>Birinci ve ikinci kaybolur, rudimenter beşinci de geriler. [[K5 s. 94]]</td></tr>
  <tr><th>Üçüncü çift</th><td>Karotis arterleri gelişir. [[K5 s. 94]]</td></tr>
  <tr><th>Sağ dördüncü</th><td>K5 brakiyosefalik arter ile sağ subklavyen arteri bu arkla ilişkilendirir. [[K5 s. 94]]</td></tr>
  <tr><th>Sol dördüncü</th><td>Kalıcı aort arkını oluşturur, sol subklavyen arteri verir ve distalde inen aortla birleşir. [[K5 s. 94]]</td></tr>
  <tr><th>Altıncı çift</th><td>Trunkus uzunlamasına çıkan aort ve pulmoner trunkusa ayrılınca altıncı arklar pulmoner trunkusa bağlı kalır ve iki pulmoner arteri verir. [[K5 s. 94]] Soldaki dorsal bağlantı fetüste duktus arteriozus, erişkinde ligamentum arteriozum olarak izlenir. [[K5 s. 94]]</td></tr>
  </tbody></table></div>
  <p>Erken dönemde vagus farenksin lateralindedir, arada aort arkları bulunur. [[K5 s. 94]] Larinksi innerve edecek dallar arkların kaudalinden mediale geçer. [[K5 s. 94]] Boyun uzayıp kalp aşağı indikçe sinirlerin arkların altından geçen bölümleri de aşağı çekilir. [[K5 s. 94]]</p>
  <p>Duktus arteriozus açık kaldığında sol rekürren sinir bu damarın hemen komşusundadır. [[K5 s. 98]]</p>
</section>
<section class="wrap blk ders-sec" id="an02b-fetus">
  <h2>Plasentadan beyne ve yeniden plasentaya</h2>
  <p class="intro">Alt ve üst vena kavadan gelen kan sağ atriyuma girer, ancak kaval akımların yönü farklı olduğundan karışım sınırlı kalır. [[K5 s. 95]]</p>
  <div class="viz"><div class="viz-head"><h3>Bir kan akımını seçip çıkışını izleyin</h3></div><div data-viz="an02b_fetus"></div><p class="viz-cap" aria-live="polite"></p></div>
  <div class="cols"><div class="card"><h3>Kalbe ve beyne giden yol</h3><p>Plasentadan umbilikal venle gelen oksijenlenmiş kanın çoğu duktus venozus yoluyla karaciğeri atlayarak vena kava inferiora ulaşır. [[K5 s. 95]] Kava ağzındaki kapak bu akımı foramen ovaleye yöneltir. [[K5 s. 95]] Sol atriyumda akciğerlerden dönen az miktarda, oksijeni düşük kan da bu akıma katılır. [[K5 s. 95–96]]</p><p>Sol ventrikülden çıkan aorta geçen kan vertebral ve karotis arterleriyle beyne, koronerlerle kalbe ulaşır. [[K5 s. 96]]</p></div>
  <div class="card"><h3>Alt gövdeye giden yol</h3><p>Superior vena kavanın oksijeni az kanı triküspit kapaktan sağ ventriküle yönelir. [[K5 s. 95]] Fetal akciğerler henüz işlev görmediğinden pulmoner trunkustaki kanın çoğu duktus arteriozustan inen aorta geçer. [[K5 s. 96]]</p><p>Bu kan karın organlarını ve alt ekstremiteleri besler, internal iliak arterlerin dalları olan umbilikal arterlerle yeniden oksijenlenmek üzere plasentaya döner. [[K5 s. 96]]</p></div></div>
  <h3>İlk solukla hangi basınçlar değişir?</h3>
  <p>Akciğerler genişlerken kıvrımlı pulmoner damarlar açılır, pulmoner direnç hızla düşer ve pulmoner arter akımı artar. [[K5 s. 96]] Sistemik direnç yükselirken sağ atriyum basıncı düşer, sol atriyum basıncı artar. [[K5 s. 96]] Basınç farkı iki septumu birbirine bastırıp foramen ovaleyi işlevsel olarak kapatır. [[K5 s. 96]]</p>
  <p>Artan oksijen gerilimi duktus arteriozusun kas duvarını kasar ve önce işlevsel kapanma sağlar. [[K5 s. 96]] Tam obliterasyon sonraki 2–3 ayda tamamlanır. [[K5 s. 96]] Kordon kesildikten sonra umbilikal damarlarda tromboz ve obliterasyon 3–4 haftada gelişir, ancak doğumun hemen ardından bu damarlar transfüzyon için kullanılabilir. [[K5 s. 96]]</p>
  <details class="an02b-okuma"><summary>İki fetal duktusu yalnızca giriş ve çıkışlarına bakarak ayırt edin.</summary><p>Plasentadan dönen kanı izliyorsanız aradığınız geçiş karaciğer düzeyindedir ve alt kavaya ulaşır. [[K5 s. 95]] Sağ ventrikülden çıkan kanı izliyorsanız geçiş pulmoner trunkustan inen aorta uzanır. [[K5 s. 96]] Aynı fetüste ilk yol görece iyi oksijenlenmiş kanı kalbe getirirken ikinci yol oksijeni az kanın çoğunu alt gövdeye yöneltir. [[K5 s. 95–96]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an02b-anomali">
  <h2>Doğumsal anomalilerde açıklığın ve darlığın yeri</h2>
  <p class="intro">Kalp ve büyük arterlerin gelişimindeki bozukluklar tek bir yapıyı etkileyebilir veya birlikte görülebilir. [[K5 s. 96]]</p>
  <div class="viz"><div class="viz-head"><h3>Defekti seçin ve etkilenen yapıları izleyin</h3></div><div data-viz="an02b_fallot"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p><b>Yerleşim.</b> Dekstropozisyonda kalp ve kalpten çıkan damarlar olağan düzenin ayna görüntüsüdür. [[K5 s. 96]] Karın organlarının tümü de ters yerleşimli olabilir (situs inversus). [[K5 s. 96]]</p>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Defekt</th><th>Ayırt ettiren bulgu</th></tr></thead><tbody>
  <tr><th>Kalıcı açık foramen ovale</th><td>Kişilerin yaklaşık %10’unda görülür ve septal defektler arasında sayılır. [[K5 s. 96]]</td></tr>
  <tr><th>Ostium sekundum</th><td>Atriyal septal defekt yukarıdadır ve cerrahi kapatma görece kolaydır. [[K5 s. 96]]</td></tr>
  <tr><th>Ostium primum</th><td>Defekt atriyoventriküler sınırın hemen üstündedir ve membranöz ventriküler septumda da defekt bulunabilir, bu nedenle onarımı daha güçtür. [[K5 s. 96]]</td></tr>
  <tr><th>Ventriküler septal defekt</th><td>Geniş bir açıklık iki ventrikülü tek boşluğa dönüştürebilir ve üç odacıklı kalp ortaya çıkabilir. [[K5 s. 96]]</td></tr>
  <tr><th>Pulmoner stenoz</th><td>Darlık pulmoner trunkusta, kapakta veya sağ ventrikül infundibulumunda olabilir. [[K5 s. 96]] Hipertrofik sağ ventrikülde basınç yeterince yükselirse eşlik eden septal defektten sola kan geçer ve çocuk doğumda siyanotik olabilir. [[K5 s. 96–97]]</td></tr>
  <tr><th>Patent duktus arteriozus</th><td>Sol rekürren laringeal sinir açık duktusun yakınından geçer. [[K5 s. 98]] Görece sık görülen bu defekt düzeltilmezse sol kalpte ilerleyici hipertrofi ve pulmoner hipertansiyon gelişir. [[K5 s. 97]]</td></tr>
  </tbody></table></div>
  <p>Fallot tetralojisi, K5’te siyanoz yapan doğumsal anomalilerin en sık birlikteliği olarak verilir. [[K5 s. 97]] Spiral septum çıkışı eşitsiz böler, dar pulmoner trunkusun yanında geniş aort iki ventrikül üzerine biner. [[K5 s. 97]] Yer değiştiren septum ventriküler açıklığı kapatamaz, pulmoner darlık da sağ ventrikül hipertrofisine yol açar. [[K5 s. 97]]</p>
  <h3>Koarktasyonda alt gövde kanı nereden alır?</h3>
  <p>Koarktasyonun duktusu kapatan süreçteki bir bozuklukla ilişkili olduğu düşünülür. [[K5 s. 97]] Yaygın darlık sol subklavyen arterden genişçe açık duktusa kadar uzanabilir ve alt gövdeyi duktus besler. [[K5 s. 97]] Bu bebeklerde sıklıkla başka defektler bulunur ve erken ölüm sık görülür. [[K5 s. 97]]</p>
  <p>Daha sık görülen kısa darlık ligamentum arteriozum ya da açık duktus düzeyindedir. [[K5 s. 97]] Skapula çevresindeki arterlerin interkostallerle, internal torasik arterlerin de inferior epigastriklerle bağlantıları alt ekstremite dolaşımını sürdürür. [[K5 s. 97–98]] Genişlemiş damarlar skapula kenarlarında elle hissedilebilir, geniş interkostal arterler grafide kaburgaların alt kenarlarında çentiklenmeye neden olur. [[K5 s. 98]]</p>
  <p><b>Diğer arter anomalileri.</b> Ark sağda ya da çift olabilir. [[K5 s. 98]] Dorsal aorttan çıkan anormal sağ subklavyen arter özofagusun arkasından geçerek nadiren disfaji lusoriaya yol açabilir. [[K5 s. 98]] Trunkus arteriozusun bölünmesi tamamlanmazsa aort ile pulmoner arter arasında nadir bir doğumsal fistül, aortopulmoner pencere kalabilir. [[K5 s. 98]]</p>
  <details class="an02b-okuma"><summary>Bir çocukta siyanozu, yalnızca dört bulgunun adını saymadan nasıl açıklarsınız?</summary><p>Önce sağ ventrikülün boşalmasını güçleştiren darlığı gösterin. [[K5 s. 96–97]] Ardından iki ayrı çıkışı izleyin. [[K5 s. 97]] Desatüre kan ventriküler açıklıktan sol ventriküle geçebilir, her iki ventriküle açılan geniş aorta ise sağ ventrikülden doğrudan da girebilir. [[K5 s. 97]] Böylece sistemik dolaşıma karışan kanın nereden geldiği anlaşılır. [[K5 s. 97]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an02b-juguler">
  <h2>İnternal juguler veni kesitte tanımak</h2>
  <p class="intro">Sigmoid sinüsün devamı olan internal juguler ven, juguler foramenden klavikulanın sternal ucunun arkasındaki subklavyen venle birleşimine kadar uzanır. [[K5 s. 98]]</p>
  <div class="viz"><div class="viz-head"><h3>Sağ karotis kılıfı · aşağıdan enine görünüm</h3></div><div data-viz="an02b_kilif"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Karotis kılıfındaki ven yukarıda internal karotisin, aşağıda ana karotisin lateralindedir. [[K5 s. 99]] Ön üçgende eksternal karotisin yüzeyelinden geçer, burada arterin atımı genellikle hem görülür hem elle alınır. [[K5 s. 99]] Daha aşağıda ven sternokleidomastoid kasın derinine girer. [[K5 s. 99]]</p>
  <ul class="ozet">
  <li><b>Sinirler.</b> Vagus iki damar arasında, biraz arkadadır, sempatik zincir ise kılıfın hemen arkasında yükselir. [[K5 s. 99]] Bu yakınlık nedeniyle iki damar ve iki sinirin çevre yapılarla komşulukları ortaktır. [[K5 s. 99]]</li>
  <li><b>Lenf düğümleri.</b> Derin servikal zincir vene yakındır ve malign ya da inflamatuvar tutulumda düğümler ven duvarına sıkıca yapışabilir. [[K5 s. 99]]</li>
  <li><b>Doğrudan kollar.</b> Farengeal venöz pleksus, ortak fasiyal ven, lingual ven ve superior ile orta tiroid venleri internal jugulere boşalır. [[K5 s. 99]]</li></ul>
  <h3>Yüzeyel venleri birleşimlerinden izleyin</h3>
  <p>Yüzeyel ven düzeni değişkenlik gösterir. [[K5 s. 99]] Olağan düzende yüzeyel temporal ven, pterigoid pleksusu drene eden maksiller venle birleşip retromandibular veni oluşturur. [[K5 s. 99–100]] Parotis içindeki ayrımdan sonra ön dal fasiyal venle birleşir, oluşan ortak fasiyal ven internal jugulere açılır. [[K5 s. 99–100]] Arka dal eksternal juguler ven olarak devam eder. [[K5 s. 99–100]] Posterior auriküler ven de bu olağan yüzeyel düzende yer alır. [[K5 s. 100]]</p>
  <div class="cols"><div class="card"><h3>Eksternal juguler</h3><p>Yüzeyel fasya içinde sternokleidomastoidi çaprazlar ve arka üçgenin tavanından geçer. [[K5 s. 100]] Klavikulanın 2,5 cm üstünde derin fasyayı delip subklavyen vene dökülür. [[K5 s. 100]] Fasya lümeni açık tutabildiğinden tam burada yırtılan vene hava girip emboliye yol açabilir. [[K5 s. 100]]</p></div>
  <div class="card"><h3>Anterior juguler</h3><p>Orta hattın iki yanında birer ven aşağı inerken tiroid istmusunu çaprazlar. [[K5 s. 100]] Sternumun hemen üstünde karşı tarafla bağlantı kurar, ardından sternokleidomastoidin derininden laterale dönüp eksternal jugulere açılırlar. [[K5 s. 100]]</p></div></div>
  <details class="an02b-okuma"><summary>Boyunda yüzeyden derine giderken iki juguler veni nasıl ayırırsınız?</summary><p>Önce sternokleidomastoid kası bulun. [[K5 s. 99–100]] Kasın üzerinden çapraz geçen damar eksternal jugulerdir ve arka üçgenin tavanına yönelir. [[K5 s. 100]] Kasın derininde karotisle birlikte aşağı inen damar internal jugulerdir. [[K5 s. 99]] Kesitte önce arterle veni, sonra ikisinin arkasındaki vagusu, en son ortak kılıfın gerisindeki sempatik zinciri işaretleyin. [[K5 s. 99]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an02b-birlesim">
  <h2>Subklavyen venden superior vena kavaya</h2>
  <p class="intro">Her iki tarafta venöz birleşim sternoklaviküler eklemin arkasındadır, ancak buradan superior vena kavaya giden yolların uzunluğu ve yönü farklıdır. [[K5 s. 100–101]]</p>
  <div class="viz"><div class="viz-head"><h3>Boyun kökünün büyük venleri · önden görünüm</h3></div><div data-viz="an02b_venler"></div><p class="viz-cap" aria-live="polite"></p></div>
  <p>Aksiller ven birinci kaburganın dış kenarında subklavyen ven adını alır. [[K5 s. 100]] Kaburganın üst yüzünde sığ bir oluk açarak önce yukarı kavis yapar, sonra mediale, aşağıya ve biraz öne yönelir. [[K5 s. 100]] Anterior skalenin medial kenarında internal jugulerle birleşir. [[K5 s. 100]]</p>
  <ul class="ozet">
  <li><b>Subklavyen venin önü.</b> Klavikula ve subklavius kası damarın önündedir. [[K5 s. 100]] Solda torasik kanalın son bölümü subklavyen vene açılır. [[K5 s. 100]]</li>
  <li><b>Brakiyosefalik (innominat) venler.</b> İkisi de ana karotisin lateralinde ve anterior skalenin önündedir. [[K5 s. 100]] Vertebral, inferior tiroid ve internal torasik venleri alırlar, bu kollar subklavyen arterin ilk bölümünden çıkan dallara karşılık gelir. [[K5 s. 100]]</li>
  <li><b>Sağ yol.</b> Yaklaşık 3 cm’lik sağ brakiyosefalik ven manubriumun sağ kenarının arkasında dikey iner. [[K5 s. 100]] Lateralinde aşağı inen sağ frenik sinir veni plevradan ayırır. [[K5 s. 100]]</li>
  <li><b>Sol yol.</b> Yaklaşık 6 cm’lik sol ven manubriumun arkasında oblik inerken aort arkının üstünden, sol ana karotis, trakea ve brakiyosefalik arterin önünden geçer. [[K5 s. 101]] Ayrıca timik veni ve sol superior interkostal veni alır. [[K5 s. 101]]</li>
  <li><b>Birleşim.</b> Birinci kostal kıkırdağın alt kenarında iki ven superior vena kavayı oluşturur, azigos veninin açıldığı yer bu birleşimin aşağısındadır. [[K5 s. 101]]</li></ul>
  <div class="note"><b>Plevra kubbesi.</b> Sibson fasyasının örttüğü kubbe, klavikulanın medial üçte birinin 2,5 cm üstüne çıkar. [[K5 s. 101]] Grafide görülen bu kabarıklık üst toraks açıklığının eğimine bağlıdır. [[K5 s. 101]] Plevra, internal juguler ve brakiyosefalik venlerin hemen arkasında olduğundan bu bölgede iğne plevrayı delip pnömotoraksa neden olabilir. [[K5 s. 101]]</div>
  <details class="an02b-okuma"><summary>Önden görünümde taraf etiketleri gizlense sağı ve solu nasıl bulursunuz?</summary><p>İnternal juguler ve subklavyen venlerin birleştiği iki köşeyi bulun ve her birinden kavanın başlangıcına kadar ilerleyin. [[K5 s. 100–101]] Manubrium arkasında orta hattı aşan uzun, eğik yol hastanın solundadır. [[K5 s. 101]] Karşıdaki kısa ven sağda kalır ve aşağı inerken lateral yüzü boyunca sağ frenik sinir ona eşlik eder. [[K5 s. 100]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an02b-kateter">
  <h2>Santral venöz kateterin yolu ve uç konumu</h2>
  <p class="intro">Juguler girişte ultrason iğne ucunu gösterir. [[K5 s. 102–103]] Yerinde bırakılan kateterin konumu radyografiyle kontrol edilir. [[K5 s. 102]]</p>
  <div class="viz"><div class="viz-head"><h3>Boyunda iğne ucu ve toraksta kateter ucu</h3></div><div data-viz="an02b_kesit"></div><p class="viz-cap" aria-live="polite"></p></div>
  <h3>Hangi amaçla, hangi yoldan?</h3>
  <p>Boyun ve üst mediasten venlerine erişim yüksek riskli cerrahi ve yoğun bakımın yanı sıra ara yoğun bakımda ve servislerde de kullanılır. [[K5 s. 101]] Santral venöz basınç izlemi, sağ kalp kateterizasyonu ve gerektiğinde pulmoner arter kateteriyle kalp debisi ile mikst venöz oksijen satürasyonu (SvO₂) ölçümü bu yolla yapılabilir. [[K5 s. 101]]</p>
  <p>Diğer kullanım alanları hızlı kan transfüzyonu, uzun süreli parenteral beslenme, intravenöz ilaç tedavisi ve kalp pili uygulamalarıdır. [[K5 s. 98]] [[K5 s. 101]] Ameliyathane ve yoğun bakımda çok lümenli kateterler kullanılır. [[K5 s. 102]] En sık yollar juguler ve subklavyen venlerdir. [[K5 s. 102]] Antekübital fossadan ilerletilen uzun kanül kendi üzerine kıvrılabilir ya da yukarı dönüp internal jugulere girebilir. [[K5 s. 102]]</p>
  <div class="cols"><div class="card"><h3>Subklavyen yol</h3>
  <p>Hickman gibi uzun süreli tünelli kateterlerde bu yol tercih edilir. [[K5 s. 103]] Enfeksiyon riski juguler ve özellikle femoral yola göre düşüktür, diğer majör komplikasyonların da azalabileceğini düşündüren bulgular vardır. [[K5 s. 103]] Başın çevrilmesi gerekmez, giriş yeri daha konforludur ve kateteri uzun süre sabit tutmak daha kolaydır. [[K5 s. 103]]</p>
  <p>En sık kullanılan infraklaviküler yaklaşımda giriş, klavikulanın orta ve medial üçte birlerinin birleşiminde, kemiğin hemen altındadır. [[K5 s. 103]] İğne suprasternal çentiğe doğru ultrason eşliğinde kan aspire edilene kadar ilerletilir. [[K5 s. 103]] Ven çoğu kez klavikulanın 1–2 cm altındadır. [[K5 s. 103]]</p>
  <p>Seldinger tekniğinde kılavuz tel iğneden geçer, yol genişletildikten sonra kateter tel üzerinden ilerler. [[K5 s. 103]] Sağ subklavyen girişte sağ atriyuma ilerleme olasılığını azaltmak amacıyla sıklıkla daha kısa, 15 cm’lik kateter kullanılır. [[K5 s. 103]]</p>
  <p>Veni ultrasonla bulmak güç olabilir, mekanik ventilasyon sırasında pnömotoraks riski artar. [[K5 s. 103]] Yanlışlıkla subklavyen artere girilirse damara bası uygulanamaz, sol tarafta torasik kanal da yaralanabilir. [[K5 s. 103–104]]</p></div>
  <div class="card"><h3>İnternal juguler yol</h3>
  <p>Yoğun bakımda ve subklavyen yol uygun olmadığında kısa süreli kateter için sık seçilir. [[K5 s. 104]] Yüksek ve düşük girişlerden daha sık kullanılanı düşük yaklaşımdır. [[K5 s. 104]] Sırtüstü hastada baş karşı yana döndürülür, güvenliyse venleri genişletmek için 10–20° baş aşağı eğim verilir. [[K5 s. 104]]</p>
  <p>Yüzey işareti, sternokleidomastoidin mastoid ve sternal tutunmaları arasındaki orta noktadır. [[K5 s. 104]] Kasın medial kenarının hemen medialinde karotis nabzı alınır. [[K5 s. 104]] Ven bunun lateralinde, çoğunlukla kas karnının derinindedir ve deneyimli bir elde yumuşak, sıvı dolu bir yapı gibi hissedilebilir. [[K5 s. 104]]</p>
  <p>Aşağıda ven, kasın sternal ve klaviküler başları arasındaki oluğun derininden geçer. [[K5 s. 104–105]] Klasik yön aynı taraftaki meme başına doğrudur, iğne ciltle yaklaşık 30–40° yapabilir. [[K5 s. 105]] İlerlerken sürekli aspirasyonla vene giriş aranır, erişkinde ven sıklıkla 1–2 cm derindedir. [[K5 s. 105]] Kılavuz tel iğneden geçirilir. [[K5 s. 105]]</p></div></div>
  <h3>Konumu doğrulama</h3>
  <p>K5 tüm santral venöz kateter yerleştirmelerinde iki boyutlu ultrason önerir; cihaz subklavyen ve juguler girişte kullanılabilir, gerçek zamanlı görüntüde komşu yapılar ve iğne ucu izlenebilir. [[K5 s. 102–103]] Juguler girişte gerçek zamanlı rehberlik yaygın kullanılır. [[K5 s. 105]] K5 venöz kanı koyu renkli ve pulsatil olmayan akımla tarif eder. [[K5 s. 103]] Kateterler radyoopaktır, yerinde bırakılacak kanülün konumu radyografiyle kontrol edilir. [[K5 s. 102]]</p>
  <h3>Komplikasyonu anatomisiyle hatırlayın</h3>
  <p>Özellikle deneyimsiz ellerde ciddi morbidite ve ölüm bildirildiğinden K5, komplikasyonların bilinmesini ve kesin endikasyon aranmasını vurgular. [[K5 s. 102]]</p>
  <ul class="ozet">
  <li><b>Damar ve plevra.</b> Antikoagülasyon sonrasında büyük hematom gelişebilir. [[K5 s. 102]] K5’in kör teknikler için bildirdiği oranlar pnömotoraksta %3, karotis ponksiyonunda %9,4’tür. [[K5 s. 102]] Hemotoraks, karotis vazospazmı veya embolisi ve arteriyovenöz fistül de bildirilmiştir. [[K5 s. 102]]</li>
  <li><b>Kateter ve çevre dokular.</b> Hava veya kateter embolisi, tromboflebit, yanlışlıkla sağ ventriküle giriş, hemoperikardiyuma bağlı tamponad ve trakeal tüp kafının delinmesi görülebilir. [[K5 s. 102]] Bebeklerde geç tortikollis bildirilmiştir. [[K5 s. 102]] Kısmen çıkan kanülden boyun veya göğüs dokularına kaçan sıvı ve ilaçlar kimyasal hasar yapabilir. [[K5 s. 102]]</li>
  <li><b>Enfeksiyon.</b> K5 en sık komplikasyon olarak kateter ilişkili sepsisi verir, sıklığını %10’a kadar, geliştiğinde mortaliteyi yaklaşık %20 olarak bildirir. [[K5 s. 102]] Olağanüstü koşullar dışında tam aseptik yerleştirme gerekir, kateterlerin birçoğu antibiyotik kaplıdır. [[K5 s. 102]]</li></ul>
  <details class="an02b-okuma"><summary>Venöz kanın aspirasyonu ile kateter ucunun konumu aynı soruyu mu yanıtlar?</summary><p>Juguler girişte aspirasyon iğne ilerlerken ven lümenine ulaşılmasını değerlendirmek için kullanılır. [[K5 s. 105]] Kateterin son konumu ayrı bir anatomik sorudur, çünkü kılavuz üzerinden ilerleyen kateter sağ atriyuma kadar ulaşabilir. [[K5 s. 103]] Bu nedenle uç hedefini anlatırken hem damarın adını hem de seviyeyi belirtin. [[K5 s. 103]]</p></details>
</section>
<section class="wrap blk ders-sec" id="an02b-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız yanıtlayın.</p>
  <div class="viz"><div data-viz="mtf" data-q="an02b-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an02b-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="an02b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="an02b-p2">
  <h2>Part II · SOE 1 · Uygulamalı anatomi</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p>Sağ internal juguler venden santral kateter yerleştireceksiniz. Boynun enine kesitinde veni nasıl tanırsınız? Kateterin izleyeceği yolu, hedefini ve bu yolun plevrayla ilişkisini anlatın.</p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
  <li>Aşağı boyunda ven sternokleidomastoidin iki başı arasındaki oluğun derinindedir. [[K5 s. 104–105]]</li>
  <li>Ven ana karotisin lateralinde, vagus iki damarın arasında ve biraz arkada, sempatik zincir kılıfın hemen arkasındadır. [[K5 s. 99]]</li>
  <li>Gerçek zamanlı ultrasonla iğne ucu ve komşu yapıların ilişkisi gözlenebilir. [[K5 s. 102–103]]</li>
  <li>Ven subklavyen venle sternoklaviküler eklem arkasında birleşir, sağ brakiyosefalik ven manubriumun sağ kenarı arkasından aşağı iner. [[K5 s. 100]]</li>
  <li>Plevra venlerin hemen arkasındadır, kubbesi klavikulanın medial üçte birinin 2,5 cm üzerine çıkar. [[K5 s. 101]] Plevranın delinmesi pnömotoraksa yol açabilir. [[K5 s. 101]]</li>
  <li>Hedef sağ atriyuma giriş düzeyinde superior vena kavanın içidir. [[K5 s. 103]] Yerinde kalacak kateterin konumu radyografide denetlenir. [[K5 s. 102]]</li></ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Önce sağ boyun kesitinde karotis kılıfını ve iki siniri gösterin. Ardından önden görünümde iki brakiyosefalik veni birleştirip kateter ucunu işaretleyin. [[K5 s. 99–101]] [[K5 s. 103]]</div>
  <div class="note plain"><b>Ek sorular.</b> Sol subklavyen girişte hangi lenfatik yapı risk altındadır? Eksternal juguler venin fasyayı deldiği yerde yırtılması neden hava embolisine yol açabilir? [[K5 s. 100]] [[K5 s. 103–104]]</div></div>
</section>
<section class="wrap blk ders-sec" id="an02b-ozet">
  <h2>Özet</h2><ul class="ozet">
  <li>İki atriyal septumun örtüşmesi fetüste sağdan sola açılan bir kapak oluşturur. [[K5 s. 92–93]]</li>
  <li>Arkların asimetrik gerilemesi sağ rekürren siniri subklavyen arter, solu ligamentum arteriozum çevresinde bırakır. [[K5 s. 94–95]]</li>
  <li>Fetüste kaval akımların yönlenmesiyle oksijeni yüksek kan öncelikle beyin ve kalbe ulaşır. [[K5 s. 95–96]]</li>
  <li>Fallot tetralojisinde sağ ventrikülden hem septal defekte hem de üzerine binen aorta geçen kan siyanoza katkıda bulunur. [[K5 s. 97]]</li>
  <li>Her brakiyosefalik ven, kendi tarafındaki internal juguler ve subklavyen venlerin birleşiminden doğar; sağdaki kısa ve dikey, soldaki uzun ve oblik seyreder. [[K5 s. 100–101]]</li>
  <li>Venöz erişimde ultrason iğne ucunu izletir, yerinde kalacak radyoopak kateterin son konumu radyografiyle denetlenir. [[K5 s. 102–103]]</li></ul>
  <div data-viz="tamam" data-modul="anatomi" data-bolum="02b"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/anatomi/02a">← Perikard ve kalp</a><a href="#/dersler/anatomi/03a">Sonraki: Servikal, torasik ve lomber vertebralar →</a></nav>
</section>`,
};
