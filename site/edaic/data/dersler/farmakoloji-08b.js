VERI.sorular = VERI.sorular || {};
VERI.sorular['far08b-1'] = {
  no: 1, kok: 'Karbon zinciri ve bağlar', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 95–97]]',
  onermeler: [
    { t: 'Normal bütanın karbon zinciri dallanmıştır.', d: false, n: 'Normal alkanlarda karbon zinciri dallanmaz. [[K3 s. 95]]' },
    { t: 'Ropivakain propil, bupivakain bütil grubu taşır.', d: true, n: 'Mepivakain serisinde bu iki sübstitüent sırasıyla üç ve dört karbonludur. [[K3 s. 96]]' },
    { t: 'Alkana hidroksil eklenmesi suda çözünürlüğü azaltır.', d: false, n: 'Alkanolün hidroksil grubu suda çözünürlüğü artırır. [[K3 s. 95]]' },
    { t: 'Remifentanilin ester bağı esterazlarla hidrolize duyarlıdır.', d: true, n: 'Remifentanil, plazma veya karaciğer esterazlarının hidroliz edebildiği ester bağına örnektir. [[K3 s. 97]]' },
    { t: 'Halotan eter bağı içerir.', d: false, n: 'Halotan halojenlenmiş etandır. [[K3 s. 97]]' },
  ],
};
VERI.sorular['far08b-2'] = {
  no: 2, kok: 'Azot taşıyan gruplar ve halkalar', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 96–100]]',
  onermeler: [
    { t: 'Kuaterner azot dört bağ yapar ve kalıcı yük taşır.', d: true, n: 'Vekuronyum ve atrakuryum bu azotu taşıyan nondepolarizan blokerlerdendir. [[K3 s. 96]]' },
    { t: 'İmidazol halkasında beş karbon bulunur.', d: false, n: 'Halkanın üç üyesi karbon, ikisi azottur. [[K3 s. 98]]' },
    { t: 'Piperazindeki azotlar karşılıklı konumdadır.', d: true, n: 'İki azot, altı üyeli halkanın 1 ve 4 konumlarındadır. [[K3 s. 100]]' },
    { t: 'Piperidin halkası remifentanilin yapısında bulunur.', d: true, n: 'Fentanil, alfentanil ve remifentanil piperidin halkası taşır. [[K3 s. 100]]' },
    { t: 'Papaverin düz kası gevşetir.', d: true, n: 'İzokinolin halka sistemi taşıyan papaverin düz kas gevşeticidir. [[K3 s. 98–99]]' },
  ],
};
VERI.sorular['far08b-3'] = {
  no: 3, kok: 'Metabolik dönüşümler', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 97–102]]',
  onermeler: [
    { t: 'Morfinin 3-glukuronidi aktiftir.', d: false, n: 'Morfinin 6-glukuronidi aktif, 3-glukuronidi inaktiftir. [[K3 s. 97]]' },
    { t: 'Nordiazepam, diazepama metil eklenmesiyle oluşur.', d: false, n: 'Karaciğerde diazepamdan bir metil grubunun ayrılması nordiazepamı oluşturur. [[K3 s. 99]]' },
    { t: 'Atrakuryumun Hofmann yıkımı laudanozin oluşturur.', d: true, n: 'Yıkım ürünleri arasında laudanozin ve bir akrilat bulunur. [[K3 s. 98]]' },
    { t: 'Propofol infüzyonunda idrarın yeşil rengini kinoller açıklar.', d: true, n: 'Propofolün kinol türevi, infüzyon sırasında görülen yeşil idrarla ilişkilidir. [[K3 s. 101]]' },
    { t: 'MEGX, lidokainin metabolitlerinden biridir.', d: true, n: 'Lidokain metabolize olurken monoetilglisin-ksilid oluşur. [[K3 s. 102]]' },
  ],
};
const A08B_NAV = [['zincir','Karbon zinciri'],['bag','Bağlar ve yük'],['halka','Halkalar'],['donusum','Dönüşümler'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
SAYFALAR['dersler/farmakoloji/08b'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 1 · Bölüm 8 · Ders 08b', baslik: 'Medisinal kimya mini sözlüğü',
  lede: 'Bir zincirin uzunluğu, bir halkadaki azot ya da bir ester bağı, ilacın çözünürlüğü veya yıkımı hakkında ipucu verir. [[K3 s. 96–100]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A08B_NAV.map(([id, ad]) => `<button type="button" data-scroll="a08b-${id}">${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a08b-zincir">
<h2>Karbon zinciri ve çözünürlük</h2>
<p class="intro">Alkil zincirini uzatmak yağda, zincire hidroksil eklemek suda çözünürlüğü artırır. [[K3 s. 95–96]]</p>
<div class="viz"><div class="viz-head"><h3>Bir karbon daha ekleyin</h3></div><div data-viz="a08b_zincir"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Her düğüm bir karbonu gösterir, çözünürlük karşılaştırması nitelikseldir. [[K3 s. 96]]</p></div>
<p><b>Alkil</b> bir alkan grubunu belirtir. [[K3 s. 96]] Mepivakain serisinde ropivakainin propil zinciri üç, bupivakainin bütil zinciri dört karbonludur. [[K3 s. 96]]</p>
<div class="cols"><div class="card"><h3>Alkan</h3><p>Alkanlar yalnız karbon ve hidrojenden oluşan doymuş hidrokarbonlardır. [[K3 s. 95]] Dallanmayan normal serinin ilk üyeleri metan (CH₄), etan (CH₃CH₃), propan (CH₃CH₂CH₃) ve bütandır (CH₃CH₂CH₂CH₃). [[K3 s. 95]]</p></div>
<div class="card"><h3>Alkanol ve karboksilik asit</h3><p>Alkanolde bir veya daha fazla –OH vardır. [[K3 s. 95]] Kitap, –OH uç karbondaysa n-alkanol, iç karbondaysa izo-alkanol adını kullanır. [[K3 s. 95]] Alkanollerden türeyen karboksilik asitler proton verir ve suda çözünür. [[K3 s. 96]]</p></div></div>
<ul><li>Metanolden formik asit, etanolden asetik (etanoik) asit, n-propanolden propiyonik asit türetilir. [[K3 s. 95–96]]</li>
<li>Propiyonik asit ibuprofenin, fenilasetik asit ise diklofenak, ketorolak ve indometazinin dayandığı NSAİİ yapısıdır. [[K3 s. 95]] [[K3 s. 100]]</li>
<li>Asetik asit CH₃COOH biçiminde yazılır, proton verebilir ve hidrofiliktir. [[K3 s. 95]] Aspirin asetilsalisilik asittir ve salisilik aside metabolize olur. [[K3 s. 95]] [[K3 s. 101]] Asetilkolin de asetil taşır. [[K3 s. 95]]</li></ul>
<div class="note plain"><b>Atlas notu.</b> Kitap asetili CH₃COO–R olarak verir (R karbon temellidir) ve asitlikle ilişkilendirir, oysa asetil CH₃CO–, CH₃COO–R ise asetat esteridir. Kitap yağda çözünen kısa alkanların suyla karışabildiğini söyler, ancak örneğin n-bütan suda az çözünür.</div>
</section>
<section class="wrap blk ders-sec" id="a08b-bag">
<h2>Bağları ve azotun yükünü okuyun</h2>
<p class="intro">Oksijenin komşularına bakarak ester ile eteri, azotun komşularına bakarak amid ile amini ayırt edebilirsiniz. [[K3 s. 96–97]]</p>
<div class="viz"><div class="viz-head"><h3>Bağı seçin, komşu grupları izleyin</h3></div><div data-viz="a08b_bag"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel bağ karşılaştırması. [[K3 s. 96–97]]</p></div>
<ul><li><b>Ester.</b> Karboksilik asitle alkol birleşirken ester ve su oluşur. [[K3 s. 97]] Aspirin, remifentanil, esmolol ve mivakuryumun ester bağı plazma veya karaciğer esterazlarıyla hidrolize duyarlıdır. [[K3 s. 97]]</li>
<li><b>Eter ve halojen.</b> Eterler yağda çözünür, suda çözünmez. [[K3 s. 97]] Günümüzdeki volatil ajanlardan halotan halojenlenmiş etan, diğerlerinin tümü eterdir. [[K3 s. 97]] VII. grup elementlerinden flor, klor ve brom volatil anesteziklerin geliştirilmesinde öncü yapılara eklenmiştir. [[K3 s. 98]] En elektronegatif element olan flor eterleri kararlı kılar, metabolizma olasılığını azaltır. [[K3 s. 98]]</li>
<li><b>Amid ve karbamil.</b> Lidokain gibi amid lokal anesteziklerde amid bağı, ksilidin halkası ile sübstitüe amin arasındaki zincirdedir. [[K3 s. 96]] Karbamil –CONH₂ biçimindedir. [[K3 s. 96]] Neostigminde dimetil türevi ester bağıyla tutunur (karbamat esteri). [[K3 s. 96]] Enzim asetillenmek yerine karbamillenir, esteratik bölgenin işlevi daha geç geri döner. [[K3 s. 96]]</li></ul>
<div class="card"><h3>Amin ve kuaterner azot</h3><p>Primer amin R–NH₂, sekonder amin R–NH–R′ taşır. [[K3 s. 96]] Tersiyer aminde üç hidrojenin de yerini başka gruplar alır. [[K3 s. 96]] Amino asidin iki ucunda amin ve karboksil bulunur, amin grubu sayısına göre monoamin ya da diamin olabilir. [[K3 s. 96]]</p>
<p>Amin proton alınca pozitif yük kazanır, suda çözünürlüğü artabilir. [[K3 s. 96]] Dört bağlı kuaterner azot ise kalıcı yüklüdür ve bazen yanlışlıkla “kuaterner amin” diye anılır. [[K3 s. 96]] Vekuronyum ve atrakuryum bu azotu taşıyan nondepolarizan kas gevşeticilerdir. [[K3 s. 96]] Kolin, asetilkolinin (ACh) öncülüdür. [[K3 s. 97]]</p></div>
<div class="note plain"><b>Atlas notu.</b> Kitap pKa üzerinde protonlanmanın, altında yağda çözünmenin arttığını söyler, oysa protonlanmış amin pH &lt; pKa iken, yüksüz biçim pH &gt; pKa iken baskındır. Kitabın kolin için verdiği CH₃N(CH₃)₃ gösteriminin doğrusu HO–CH₂–CH₂–N⁺(CH₃)₃ biçimindedir.</div>
</section>
<section class="wrap blk ders-sec" id="a08b-halka">
<h2>Halkanın üyelerini sayın</h2>
<p class="intro">Bir halkada karbon dışında en az bir atom varsa halka heterosikliktir. [[K3 s. 98]]</p>
<div class="viz"><div class="viz-head"><h3>Halkada azot nerede?</h3></div><div data-viz="a08b_halka"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel halka iskeletleri, bağ dereceleri gösterilmez. [[K3 s. 98]] [[K3 s. 100–101]]</p></div>
<p>İmidazol zayıf bazdır, piperazin ve piperidinin –NH grupları da proton alır. [[K3 s. 98]] [[K3 s. 100]] İyonizasyon pH ve pKa ile değişir, imidazol ve piperazinde bu değişim suda çözünürlüğe yansır. [[K3 s. 98]] [[K3 s. 100]]</p>
<div class="a08b-grid">
<div class="card"><h3>Benzen, benzil ve fenil</h3><p>Kitabın “benzil” maddesi düzlemsel, doymamış, altı karbonlu benzeni (C₆H₆) anlatır. [[K3 s. 96]] Benzen lipitleri çözer, suda çözünmez. [[K3 s. 96]] Etomidat benzen halkası taşır, ketamin ve bazı benzodiazepinlerde halka klorludur. [[K3 s. 96]]</p>
<p>Fenol (C₆H₅OH) hidroksillenmiş benzendir ve suda çözünür. [[K3 s. 100]] Kitabın “fenil” maddesi –C₆H₄OH yazımını verir, parasetamol, propofol ve edrofonyumu, sübstitüent örneği olarak da fentolamin ile fentanili sıralar. [[K3 s. 100]]</p></div>
<div class="card"><h3>Altı karbonlu iskeletler</h3><p>Tramadolün dayandığı sikloheksanol (C₆H₁₁OH), özellikleri aromatik fenolden farklı bir siklik alkanoldür. [[K3 s. 97]] Fensiklidin, ketaminin temelindeki altı karbonlu halka ve kitaptaki ifadeyle “fenolik” sübstitüentle tanımlanır. [[K3 s. 100]] Morfinle ilişkili fenantren ise çok halkalı bir karbon iskeletidir. [[K3 s. 100]]</p></div>
<div class="card"><h3>İzokinolin ve papaverin</h3><p>Papaverin izokinolin içerir, afyonda morfinle birlikte bulunur ve opioidlerle yapısal ilişki gösterir. [[K3 s. 98–99]] Düz kası gevşetir. [[K3 s. 99]] Bazı nondepolarizan blokerlerin bis-benzilizokinolinyum iskeletinde papaverine benzer iki halka sistemi bulunur. [[K3 s. 98–99]]</p></div>
<div class="card"><h3>Diğer ilaç çekirdekleri</h3><ul>
<li>Oksikam yapılı NSAİİ’ler arasında piroksikam ve meloksikam vardır. [[K3 s. 99]]</li>
<li>Pirazalon, fenilbutazon ve ilişkili NSAİİ’lerdeki keto sübstitüsyonlu pirazol halkasıdır. [[K3 s. 101]]</li>
<li>Tiyazid diüretiklerin çekirdeği kükürtlü bir heterosikldir. [[K3 s. 101]]</li>
<li>Kitap aminofilini “ksanten” başlığında fosfodiesteraz inhibitörlerine örnek verir. [[K3 s. 102]]</li></ul></div></div>
<div class="note plain"><b>Atlas notu.</b> Kitap benzili benzenle, fenili hidroksifenille karıştırır, benzil C₆H₅CH₂–, fenil C₆H₅– ve hidroksifenil –C₆H₄OH biçiminde yazılır. Kitap rofekoksibi selekoksible birlikte pirazol, aminofilini de metilksanten olarak sınıflar, ancak rofekoksib furanon türevidir ve aminofilin metilksantin grubundadır.</div>
</section>
<section class="wrap blk ders-sec" id="a08b-donusum">
<h2>Yapıdan metabolite</h2>
<p class="intro">Bir metilin eklenmesi veya uzaklaşması karaciğerde de başka dokularda da ilaç metabolizmasının bir parçası olabilir. [[K3 s. 99]]</p>
<div class="viz"><div class="viz-head"><h3>Metil hangi yönde taşınıyor?</h3></div><div data-viz="a08b_metil"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel dönüşüm yönleri. [[K3 s. 97]] [[K3 s. 99]]</p></div>
<ul><li><b>Katekol.</b> Benzen halkasında iki –OH yan yanadır (1,2). [[K3 s. 97]] Noradrenalinde etilamin taşıyan karbon 1 sayılınca hidroksiller 3 ve 4 konumlarına gelir. [[K3 s. 97]] COMT’nin (katekol O-metiltransferaz) bir –OH grubunu –OCH₃’e çevirebilmesi için iki hidroksil de gerekir. [[K3 s. 97]]</li>
<li><b>Metoksi ve metil.</b> Metoksi (–OCH₃), hidroksile göre yağda çözünürlüğü artırır, kodein 3-metoksimorfindir. [[K3 s. 99]] Kitap, benzilizokinolinyum tipi blokerlerdeki çoklu metoksi sübstitüsyonunu suda çözünürlükle ilişkilendirir. [[K3 s. 99]] Nor- ve desmetil- önekleri ana yapıdan bir metilin (–CH₃) ayrıldığını belirtebilir. [[K3 s. 99]]</li>
<li><b>Mandelik asit.</b> MAO ve COMT, adrenalin ve noradrenalinin metabolizmasında mandelik asit türevlerinin oluşumuna katılır, örnek ürün 3-metoksi-4-hidroksimandelik asittir. [[K3 s. 99]]</li>
<li><b>Enol ⇄ keto.</b> Barbitüratların halkasında C=C üzerindeki –OH ile tek C–C bağına komşu karbonil (=O) arasında tautomerik dönüşüm olabilir. [[K3 s. 97–98]]</li></ul>
<div class="cols"><div class="card"><h3>Glukuronid ve kinol</h3><p>Karaciğerde faz II glukuronidasyonda polar grup çoğu kez –OH üzerinden bağlanır. [[K3 s. 97]] Benzodiazepinlerde bu basamak faz I’i izler, morfinde 6-glukuronid aktif, 3-glukuronid inaktiftir. [[K3 s. 97]]</p><p>Propofol ve kinol türevi glukuronidasyona uğrar. [[K3 s. 97]] Kinol (hidrokinon) 1,4-dihidroksibenzendir. [[K3 s. 101]] Propofol metabolitlerinden biri 2,6-diizopropilkinolün 4-glukuronididir, infüzyonda yeşil idrar renginden kinoller sorumludur. [[K3 s. 101]]</p></div>
<div class="card"><h3>Laudanozin ve ksilidin</h3><p>Atrakuryum ve cis-atrakuryumun Hofmann yıkımında laudanozin ve bir akrilat (CH₂=CH–R) oluşur. [[K3 s. 98]] Laudanozin bazı primat dışı türlerde nörotoksiktir. [[K3 s. 98]]</p><p>Kitap ksilidini 2,6-bismetilaminobenzen olarak adlandırır, birçok amid lokal anesteziğin metabolitleri ksilid yapısı taşır. [[K3 s. 102]] Lidokainin örneği monoetilglisin-ksiliddir (MEGX). [[K3 s. 102]]</p></div></div>
</section>
<section class="wrap blk ders-sec" id="a08b-p1"><h2>Part I · Çoklu doğru/yanlış</h2><p>Her önermeyi ayrı değerlendirin.</p>
<div data-viz="mtf" data-q="far08b-1"></div><div data-viz="mtf" data-q="far08b-2"></div><div data-viz="mtf" data-q="far08b-3"></div></section>
<section class="wrap blk ders-sec" id="a08b-p2"><h2>Part II · SOE 2 (Farmakoloji)</h2>
<div class="card soe-soru"><h3>Açılış sorusu</h3><p>Remifentanil ve lidokainin yapısında hangi bağları ararsınız? Bu bağları, azot içeren yapıları ve verilen metabolizma örneklerini karşılaştırın.</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Remifentanilde ester bağını R–O–C(=O)–R′ olarak tanımlayın. [[K3 s. 97]]</li>
<li>Ester bağının plazma veya karaciğer esterazlarıyla hidrolize duyarlılığını belirtin. [[K3 s. 97]]</li>
<li>Remifentanildeki piperidin halkasının beş karbonu ve proton alabilen bir azotu vardır. [[K3 s. 100]]</li>
<li>Lidokainde amid bağı ksilidin halkasını sübstitüe amine bağlayan zincirdedir. [[K3 s. 96]]</li>
<li>Lidokainin metabolitine örnek olarak MEGX’i (monoetilglisin-ksilid) verin. [[K3 s. 102]]</li></ol>
<p class="note"><b>Çizin.</b> Remifentanil için ester bağını ve ayrı bir piperidin halkasını, lidokain için ksilidin → amidli zincir → amin sırasını gösterin. [[K3 s. 96–97]] [[K3 s. 100]]</p>
<h3>Olası ek sorular</h3><ul><li>Piperazin ve piperidin halkalarının azotları nasıl ayırt edilir? [[K3 s. 100]]</li><li>Neostigminle etkileşimden sonra enzimin esteratik bölgesi neden daha yavaş toparlanır? [[K3 s. 96]]</li></ul></section>
<section class="wrap blk ders-sec" id="a08b-ozet"><h2>Özet</h2><ul class="ozet">
<li>Propil ve bütil arasındaki tek karbonluk farkı ropivakain ile bupivakain örnekler. [[K3 s. 96]]</li>
<li>Esterazların hidroliz edebildiği ester bağında karbonil bulunur, eterin köprüsü R–O–R′ biçimindedir. [[K3 s. 97]]</li>
<li>Kuaterner azotun yükü kalıcıdır. [[K3 s. 96]]</li>
<li>Piperidin tek azot, piperazin karşılıklı iki azot taşır. [[K3 s. 100]]</li>
<li>Metabolitin bağlanma yeri önemlidir, morfinin 6-glukuronidi aktifken 3-glukuronidi inaktiftir. [[K3 s. 97]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="08b"></div>
<nav class="ders-gec"><a href="#/dersler/farmakoloji/08a">← 08a · Kimyasal yapılar ve ilaç sınıfları</a><a href="#/dersler/farmakoloji/09a">Sonraki: 09a · Genel anestezik etkinin mekanizmaları →</a></nav></section>`,
};
