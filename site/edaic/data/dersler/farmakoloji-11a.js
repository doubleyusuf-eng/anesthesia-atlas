VERI.sorular = VERI.sorular || {};

VERI.sorular['far11a-1'] = {
  no: 1, kok: 'Sinir lifinde iletim ve lokal anestezik blok için:', kagit: 'Paper A · farmakoloji', kaynak: '[[K3 s. 170–172]]',
  onermeler: [
    {t:'Hipokalemi istirahat membran potansiyelini daha az negatif yapar.', d:false, n:'Hipokalemide hücre içi/dışı K⁺ oranı artar ve hücre içi daha negatif olur. [[K3 s. 170]]'},
    {t:'Na⁺ kanallarının inaktivasyonu normal koşullarda geriye iletimi önler.', d:true, n:'Aksiyon potansiyelini yeni geçirmiş bölgede Na⁺ kanalları inaktiftir. [[K3 s. 170]]'},
    {t:'Fosfolipit zarı geçen biçim protonlanmış lokal anesteziktir.', d:false, n:'Zarı yüksüz biçim geçer ve aksoplazmada protonlanır. [[K3 s. 171]]'},
    {t:'İn vitro uyarı sıklığı arttıkça blok derinleşir.', d:true, n:'İlacın açık Na⁺ kanallarına ilgisi nedeniyle blok derecesi uyarı sıklığıyla orantılıdır. [[K3 s. 171]]'},
    {t:'Aynı pH’da daha yüksek pKa etki başlangıcını hızlandırır.', d:false, n:'pKa yükseldiğinde zarı geçebilen yüksüz fraksiyon azalır ve başlangıç yavaşlar. [[K3 s. 172]]'}
  ]
};
VERI.sorular['far11a-2'] = {
  no: 2, kok:'Sistemik etkiler ve dağılım için:', kagit:'Paper A · farmakoloji', kaynak:'[[K3 s. 174–175]]',
  onermeler:[
    {t:'Bupivakain kardiyak Na⁺ kanalından lidokaine göre daha yavaş ayrılır.', d:true, n:'Ayrılma bupivakainde on kat daha yavaştır ve miyokard depresyonu sürer. [[K3 s. 174]]'},
    {t:'Ropivakain tek S enantiyomeri olarak hazırlanır.', d:true, n:'Ropivakain tek S enantiyomeridir ve bupivakaindeki bütil yerine propil grubu taşır. [[K3 s. 174]]'},
    {t:'SSS toksisitesinin eksitatör evresi inhibitör internöronların blokajıyla açıklanır.', d:true, n:'İlk etkilenen inhibitör internöronlardır ve bu blok eksitatör belirtiler doğurur. [[K3 s. 174–175]]'},
    {t:'Subkütan enjeksiyonda sistemik konsantrasyon interkostal enjeksiyondan yüksektir.', d:false, n:'Verilen sıralamada interkostal yol en yüksek, subkütan yol en düşük düzeye karşılık gelir. [[K3 s. 175]]'},
    {t:'Fetal asidoz lokal anesteziğin fetüste birikmesini azaltır.', d:false, n:'Asidozla iyonize fraksiyon artar ve ilaç iyon tuzağıyla fetüste birikir. [[K3 s. 175]]'}
  ]
};
VERI.sorular['far11a-3'] = {
  no:3, kok:'Metabolizma, toksisite ve intravenöz rejyonal anestezi için:', kagit:'Paper A · farmakoloji', kaynak:'[[K3 s. 175–177]]',
  onermeler:[
    {t:'Kokainin başlıca hidroliz yeri plazmadır.', d:false, n:'Kokain esterler arasında istisnadır ve karaciğerde hidrolize uğrar. [[K3 s. 175]]'},
    {t:'Azalmış hepatik kan akımı amidlerin metabolizmasını yavaşlatabilir.', d:true, n:'Hepatik amidazlarla metabolizma kan akımının azalmasından veya karaciğer işlev bozukluğundan etkilenebilir. [[K3 s. 175]]'},
    {t:'Lipit emülsiyonu lokal anesteziği bağlayarak hedef organdan uzaklaştırır.', d:true, n:'Emülsiyonun oluşturduğu lipit havuzu lipitte iyi çözünen ilaçları bağlar. [[K3 s. 176]]'},
    {t:'Akut lipit infüzyonunun advers etkileri toplam dozla ilişkili görünür.', d:true, n:'Kitap hem infüzyon hızı hem de toplam dozla ilişki bildirir. [[K3 s. 177]]'},
    {t:'Prilokain intravenöz rejyonal anestezide %0,5 konsantrasyonda kullanılır.', d:true, n:'Bu teknikte yaygın seçenek %0,5 prilokaindir ve lidokain de kullanılabilir. [[K3 s. 177]]'}
  ]
};

(function () {
  const nav = [
    ['lif','Sinir lifi'], ['blok','Preparat ve blok'], ['ph','Yapı ve pH'], ['organ','Kalp ve beyin'],
    ['kinetik','Kinetik'], ['toksisite','Toksisite'], ['p1','Part I'], ['p2','Part II'], ['ozet','Özet']
  ];
  function figure(id, title, foot) {
    return `<div class="viz"><div class="viz-head"><h3>${title}</h3></div><div data-viz="a11a_${id}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${foot}</p></div>`;
  }
  // İkişerli sütunlar dar ekranda ajanları yan yana tutar.
  const drugs = [
    ['Ametokain','8','yavaş','uzun','—','8,5','7','75','200','80'],
    ['Kokain','—','orta','kısa','0,5','8,6','5','95','—','100'],
    ['Lidokain','2','hızlı','orta','>5','7,9','25','70','150','100'],
    ['Prilokain','2','hızlı','orta','>5','7,7','33','55','50','100'],
    ['Bupivakain','8','orta','uzun','>1,5','8,1','15','95','1000','160'],
    ['Ropivakain','8','orta','uzun','>4','8,1','15','94','300','120']
  ];
  const labels = ['Göreli potens','Başlangıç','Etki süresi','Toksik plazma düzeyi (µg/mL)','pKa','pH 7,4’te yüksüz (%)','Proteine bağlı (%)','Göreli lipit çözünürlüğü','Eliminasyon yarı ömrü (dk)'];
  SAYFALAR['dersler/farmakoloji/11a'] = {
    grup:'dersler', eyebrow:'Farmakoloji · Kısım 2 · Bölüm 11 · Ders 11a',
    baslik:'Lokal anesteziklerin fizyolojisi, etkisi ve toksisitesi',
    lede:'Sinir lifinde uyarıyı taşıyan Na⁺ kanalı lokal anesteziğin de hedefidir. [[K3 s. 170–171]] İlacın kalbe ve beyne ulaşması ise bloktan sistemik toksisiteye geçişi açıklar. [[K3 s. 174–176]]',
    html:`
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id,ad],i)=>`<button type="button" data-scroll="a11a-${id}"><span>${String(i+1).padStart(2,'0')}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a11a-lif"><h2>Sinir lifi istirahatten uyarıya nasıl geçer?</h2>
<p>İstirahatte zar potansiyelini ağırlıklı olarak K⁺ belirlerken aksiyon potansiyelini Na⁺ geçirgenliğindeki hızlı değişim başlatır. [[K3 s. 170]]</p>
${figure('lif','Eşikten repolarizasyona','Zaman ekseni şematik/nitel, potansiyeller kaynak metindeki değerlerdir. [[K3 s. 170–171]]')}
<p>Potansiyel eğrisinin yükselen kolunda önce Na⁺ iletkenliği artar. [[K3 s. 170–171]] K⁺ iletkenliğindeki artış daha geç ortaya çıkar ve potansiyelin istirahat değerine dönmesine eşlik eder. [[K3 s. 170–171]] Kitabın çizimi 0–5 ms’lik bir pencere kullanır, aksiyon potansiyelinin kendisi 1–2 ms sürer. [[K3 s. 170–171]]</p>
<ul><li><b>Lifin yapısı.</b> Aksoplazmayı çevreleyen fosfolipit zardaki integral proteinlerin bir bölümü iyon kanalıdır. [[K3 s. 170]]</li>
<li><b>Gradiyent.</b> Na⁺/K⁺ ATPaz, K⁺ derişimini içeride dışarıdakinin 30 katında, Na⁺ derişimini dışarıda içeridekinin 10 katında tutar. [[K3 s. 170]]</li>
<li><b>İstirahat.</b> Seçici geçirgenlik K⁺ çıkışına izin verirken hücre içi anyonik proteinler buna karşı koyar ve denge −80 mV’ta kurulur. [[K3 s. 170]] Hipokalemi iç/dış K⁺ oranını artırarak iç tarafı daha negatif yapar. [[K3 s. 170]] İstirahatte Na⁺ geçirgenliği çok düşük olduğundan Na⁺ derişiminin etkisi küçüktür. [[K3 s. 170]]</li>
<li><b>İletim.</b> Miyelinsiz lif yavaş iletirken miyelinli lifte akım Ranvier düğümleri arasında sıçrayarak 120 m/s hıza ulaşır. [[K3 s. 170]] Gerideki Na⁺ kanallarının inaktivasyonu normalde geriye iletimi engeller. [[K3 s. 170]]</li></ul></section>

<section class="wrap blk ders-sec" id="a11a-blok"><h2>Preparattan kanal blokajına</h2>
<p>Lokal anestezik zarı yüksüz biçimde aşar, kanalın iç yüzüne ise iyonize biçimde bağlanır. [[K3 s. 171–172]]</p>
${figure('blok','İlacın iki biçimini izleyin','Şematik/nitel. [[K3 s. 171–172]]')}
<p>Açık Na⁺ kanallarına ilgi, in vitro blok derecesinin uyarı sıklığıyla orantılı olmasını açıklar. [[K3 s. 171]] Ek bir mekanizma olarak yüksüz ilaç zarda çözünüp kanalın lipoprotein matriksini şişirebilir ve kanalı inaktive edebilir. [[K3 s. 171]]</p>
<div class="cols"><div class="card"><h3>Çözünürlük ve koruyucular</h3><p>Hidroklorür tuzu ilacı suda çözünür kılar. [[K3 s. 171]] Preparatlar sıklıkla sodyum metabisülfit ve bir fungisit, çok dozlu şişeler ayrıca 1 mg/mL metil parahidroksibenzoat içerir. [[K3 s. 171]]</p></div>
<div class="card"><h3>Subaraknoid kullanım</h3><p>Koruyucuların araknoidit riski nedeniyle yalnız katkısız tek dozluk ampuller uygundur. [[K3 s. 171]] “Ağır” bupivakaindeki 80 mg/mL glukoz istisnadır. [[K3 s. 171]]</p></div>
<div class="card"><h3>Enjeksiyon yerinde kalış</h3><p>Bazı çözeltilere emilimi yavaşlatıp etkiyi uzatmak amacıyla adrenalin veya felipressin eklenir. [[K3 s. 171]] Felipressin antidiüretik etkisi olmayan sentetik bir vazopressin türevidir. [[K3 s. 171]]</p></div>
<div class="card"><h3>Mukoza anestezisi</h3><p>Lidokain %0,5–%10 aralığında bulunur ve yüksek konsantrasyonları mukozada sprey olarak kullanılır. [[K3 s. 171]] %1 çözelti 10 mg/mL içerir. [[K3 s. 171]]</p></div></div></section>

<section class="wrap blk ders-sec" id="a11a-ph"><h2>Yapı, pH ve klinik etki</h2>
<p>Lokal anestezikler pKa değerleri 7,4’ün üzerinde olan zayıf bazlardır ve normal pH’da çoğu molekül iyonizedir. [[K3 s. 171–172]]</p>
${figure('ph','Lidokainin ne kadarı sinire geçebilir?','Çubuklar lidokain için kitapta yuvarlanmış fraksiyonları gösterir. [[K3 s. 174]]')}
<p><b>Hesabı okuyun.</b> pH = pKa + log₁₀([B]/[BH⁺]) denkleminde B yüksüz bazı, BH⁺ protonlanmış biçimi gösterir. [[K3 s. 174]] Lidokainin pKa’sı 7,9 olduğundan pH 7,4’te logaritma −0,5 ve [B]/[BH⁺] yaklaşık 0,3’tür. [[K3 s. 174]] pH 7,1’de oran 0,16’ya iner. [[K3 s. 174]]</p>
<p>Enfekte dokuda asidite sinire girebilen fraksiyonu küçültür ve lokal anestezi genellikle etkisiz kalır. [[K3 s. 173]] Bölgenin damarlanması da artmış olabilir, böylece ilaç daha hızlı uzaklaşır. [[K3 s. 173]]</p>
<ul><li><b>Kimyasal bağ.</b> Aromatik lipofilik uçla hidrofilik uç arasındaki ester bağı (−CO.O−) prokain, ametokain ve kokainde bulunur. [[K3 s. 171–172]] Amid bağı (−NH.CO−) lidokain, prilokain, bupivakain, ropivakain ve dibukainde bulunur. [[K3 s. 172]] Çözeltide esterler görece kararsızdır, amidlerin raf ömrü iki yıla ulaşabilir. [[K3 s. 172]] Yapı karşılaştırmasında mepivakain de gösterilir ve yıldız kiral merkezi belirtir. [[K3 s. 173]]</li>
<li><b>Potens.</b> Lipit çözünürlüğü ile ilişki in vitro güçlüdür, in vivo daha zayıftır çünkü vazodilatasyon ve doku dağılımı sinire ulaşan miktarı değiştirir. [[K3 s. 172]]</li>
<li><b>Süre ve başlangıç.</b> Proteine az bağlanma kısa, güçlü bağlanma uzun etkiyle ilişkilidir. [[K3 s. 172]] Aynı pH’da pKa yükseldikçe zarı geçemeyen iyonize pay artar ve başlangıç yavaşlar, daha düşük pKa ise başlangıcı hızlandırır. [[K3 s. 172]]</li>
<li><b>Damar yanıtı.</b> İntrinsik vazodilatasyon potens ve süreyi etkiler. [[K3 s. 172]] Kitap düşük derişimde vazodilatasyonu prilokain &gt; lidokain &gt; bupivakain &gt; ropivakain olarak sıralar, yüksek derişimde vazokonstriksiyon bildirir. [[K3 s. 172]] Kokain yalnız vazokonstriksiyon yapar, katekolaminlerin nöronal geri alımını (uptake 1) ve monoamin oksidazları inhibe eder. [[K3 s. 172]]</li>
<li><b>Klinik blok.</b> Molekülün özelliklerine ek olarak uygulanan toplam doz ve konsantrasyon da sonucu belirgin biçimde etkiler. [[K3 s. 172–173]]</li></ul></section>

<section class="wrap blk ders-sec" id="a11a-organ"><h2>Kalpte ve beyinde blok</h2>
<p>Na⁺ kanalı blokajı kalpte faz 0 yükselişini yavaşlatır, beyinde ise ilk etkilenen inhibitör internöronlar olduğu için başlangıçta eksitasyon görülür. [[K3 s. 174–175]]</p>
${figure('sss','SSS bulgularını sırayla açın','Şematik/nitel. [[K3 s. 174–175]]')}
<div class="cols"><div class="card"><h3>Lidokain ve bupivakain</h3><p>İkisi de faz 0’ın maksimum yükselme hızını azaltır, PR ve QRS’yi ve refrakter dönemi uzatır. [[K3 s. 174]] Ventriküler aritmilerde lidokain kullanılabilir, bupivakain bu amaçla kullanılmaz. [[K3 s. 174]]</p></div>
<div class="card"><h3>Bupivakain neden daha toksik?</h3><p>Doğrudan miyokard depresyonu lidokainden güçlüdür ve kanaldan on kat yavaş ayrılması depresyonu sürdürür. [[K3 s. 174]] Reentran aritmi ve ventriküler fibrilasyon gelişebilir. [[K3 s. 174]] Taşikardi frekansa bağımlı bloğu artırabilir, yaşamı tehdit eden aritmilere Ca²⁺ ve K⁺ kanal bozuklukları da katkıda bulunabilir. [[K3 s. 174]]</p></div>
<div class="card"><h3>Ropivakain nasıl ayrılır?</h3><p>Bütil yerine propil grubu taşır ve tek S enantiyomeri olarak hazırlanır. [[K3 s. 174]] Kardiyak Na⁺ kanalından bupivakainden hızlı ayrılır, miyokardı daha az deprese eder ve toksisitesi daha düşüktür. [[K3 s. 174]] Etkisi biraz daha kısa, potensi biraz daha düşük olduğundan eşdeğer blok için biraz daha yüksek doz gerekir. [[K3 s. 174]]</p></div></div></section>

<section class="wrap blk ders-sec" id="a11a-kinetik"><h2>Enjeksiyon yerinden eliminasyona</h2>
<p>Sistemik emilimi ajanın özellikleri, eklenen vazokonstriktör ve enjeksiyon bölgesi birlikte belirler. [[K3 s. 175]]</p>
${figure('emilim','Uygulama yerine göre sistemik düzey','Şematik/nitel sıralama. [[K3 s. 175]]')}
<p>Kazara ven veya arter içine enjeksiyon, çok yüksek sistemik düzeylerle SSS ya da kardiyovasküler toksisiteye yol açabilir. [[K3 s. 175]] Kitabın örneğinde karotis veya vertebral artere kazara verilen 10 mg’dan az lidokain bile SSS düzeyini hızla yükseltip komaya, olasılıkla apne ve arreste yol açar. [[K3 s. 175]]</p>
<ul><li><b>Plazma.</b> Esterler grup olarak az bağlanır, amidlerin bağlanma sırası bupivakain &gt; ropivakain &gt; lidokain &gt; prilokaindir. [[K3 s. 175]] α₁-asit glikoproteinin afinitesi yüksektir, daha bol bulunan albümin ise miktar olarak daha çok ilaç bağlar. [[K3 s. 175]]</li>
<li><b>Serbest fraksiyon.</b> Bağlanma arttığında serbest pay azalır. [[K3 s. 175]] Kitap örnek olarak gebelik, miyokard enfarktüsü, böbrek yetmezliği, ameliyat sonrası dönem ve bebekliği sayar. [[K3 s. 175]]</li></ul>
<aside class="note plain"><b>Atlas notu.</b> Kitap gebelik ve bebeklikte proteine bağlanmanın arttığını söyler. Bu iki durumda bağlayıcı protein düzeyleri düşebilir ve serbest fraksiyon artabilir.</aside>
<ul><li><b>Plasenta.</b> Bupivakain lidokainden daha çok proteine bağlandığı için plasentadan daha az geçer. [[K3 s. 175]] Fetal asidoz iyonize fraksiyonu artırır ve iyon tuzağıyla fetüste birikime yol açar. [[K3 s. 175]] Hızlı metabolize edilen esterlerin plasental geçişi anlamlı düzeye ulaşmaz. [[K3 s. 175]]</li>
<li><b>Esterler.</b> Plazma kolinesterazları ve diğer esterazlar hızla inaktif ürünlere hidroliz sağlar, dolayısıyla eliminasyon yarı ömrü kısadır. [[K3 s. 175]] Başlıca metabolitlerden para-aminobenzoat özellikle atopik hastalarda aşırı duyarlılıkla ilişkilidir. [[K3 s. 175]] İstisna olan kokain karaciğerde hidrolize olur ve suda çözünen metabolitleri idrarla atılır. [[K3 s. 175]]</li>
<li><b>Amidler.</b> Karaciğerde amidazlarla metabolizma plazmadaki hidrolizden yavaş olduğundan sürekli infüzyonda birikim daha olasıdır. [[K3 s. 175]] Hepatik kan akımı azalırsa veya karaciğer işlevi bozulursa metabolizma yavaşlayabilir. [[K3 s. 175]]</li></ul></section>

<section class="wrap blk ders-sec" id="a11a-toksisite"><h2>Sistemik toksisite ve lipit emülsiyonu</h2>
<p>Kan düzeyi yükseldikçe önce SSS, ardından kardiyovasküler toksisite gelişir. [[K3 s. 176]]</p>
${figure('lipit','Lipit havuzu hedef organdaki ilacı nasıl etkiler?','Şematik/nitel. [[K3 s. 176]]')}
<p>Uygulama yeri ve vazokonstriktör emilimi değiştirdiği için tek başına uygulanan doz toksisiteyi tanımlamaz. [[K3 s. 176]] Aşağıdaki toksisite değerleri plazma konsantrasyonudur. [[K3 s. 176]]</p>
<h3>Ajanları karşılaştırın</h3><p>Çizgi, kitap tablosunda değer verilmediğini gösterir. [[K3 s. 176]]</p>
<div class="a11a-profiles">${[0,2,4].map(index=>{
  const [left,right] = drugs.slice(index,index+2);
  return `<table><caption>${left[0]} ve ${right[0]} [[K3 s. 176]]</caption><thead><tr><th scope="col">Özellik</th><th scope="col">${left[0]}</th><th scope="col">${right[0]}</th></tr></thead><tbody>${labels.map((label,i)=>`<tr><th scope="row">${label}</th><td>${left[i+1]}</td><td>${right[i+1]}</td></tr>`).join('')}</tbody></table>`;
}).join('')}</div>
<p>Tabloyu yatay okuyun. Lidokain ve prilokainin göreli potensi ve başlangıç sınıfı aynıdır, ancak pH 7,4’te yüksüz fraksiyon prilokainde daha büyüktür. [[K3 s. 176]] Bupivakain ve ropivakain aynı başlangıç ve süre sınıflarında yer alsa da lipit çözünürlükleri, eliminasyon yarı ömürleri ve toksik plazma düzeyleri farklıdır. [[K3 s. 176]]</p>
<h3>İntravenöz lipit tedavisi</h3>
<p>Kitap, toksisitede destek tedavisinin yerini intravenöz lipit emülsiyonunun aldığını söyler ve parenteral beslenmede de kullanılan Intralipid’i örnek verir. [[K3 s. 176]]</p>
<aside class="note plain"><b>Atlas notu.</b> Kitap lipit emülsiyonunu destek tedavisinin yerine koyar. Lipit, solunum ve dolaşım desteğiyle birlikte kullanılır.</aside>
<p>Lipitler alternatif enerji substratı sağlayarak lokal anesteziğin yağ asidi metabolizmasını baskılamasını dengeleyebilir ve Na⁺ kanalı inhibisyonunu önleyebilir. [[K3 s. 176]]</p>
<h3>Kitaptaki doz şeması</h3>
<aside class="note plain"><b>Atlas notu.</b> Kitap %20 lipit bolusunu 1,5 mg/kg olarak yazar. Doğru birim mL’dir ve bolus 1,5 mL/kg’dır.</aside>
<ul><li><b>Başlangıç.</b> Metinde %20 Intralipid için 1 dakikada “1,5 mg/kg” bolus yazılıdır (birim hatası, yukarıdaki düzeltmeye bakın). [[K3 s. 176]]</li>
<li><b>İnfüzyon.</b> Kitabın verdiği hız 0,25 mL/kg/dk’dır. [[K3 s. 176]] Dirençli olgularda bolus tekrarlanabilir ve infüzyon hızı iki katına çıkarılabilir. [[K3 s. 176]]</li>
<li><b>Toplam.</b> Kitap ilk 30 dakika için üst sınırı 10 mL/kg olarak verir. [[K3 s. 176]]</li></ul>
<h3>Akut infüzyonun advers etkileri</h3><p>Risk hem infüzyon hızıyla hem de toplam dozla ilişkili görünür. [[K3 s. 177]]</p>
<ul><li>Akut böbrek hasarı, kardiyak arrest, ventilasyon-perfüzyon uyumsuzluğu ve akut akciğer hasarı. [[K3 s. 177]]</li>
<li>Venöz tromboemboli, yağ embolisi ve yağ yüklenmesi sendromu. [[K3 s. 177]]</li>
<li>Aşırı duyarlılık, alerjik reaksiyon, pankreatit ve enfeksiyona artmış yatkınlık. [[K3 s. 177]]</li></ul>
<h3>İntravenöz rejyonal anestezi</h3><p>Bu teknikte bupivakain kullanımı kardiyak toksisiteye bağlanan ölümlerden sonra bırakılmıştır. [[K3 s. 177]] Yaygın seçenek %0,5 prilokaindir, lidokain de kullanılabilir. [[K3 s. 177]]</p></section>

<section class="wrap blk ders-sec" id="a11a-p1"><h2>Part I · MTF</h2><p>Her önermeyi bağımsız olarak doğru veya yanlış işaretleyin.</p>
<div data-viz="mtf" data-q="far11a-1"></div><div data-viz="mtf" data-q="far11a-2"></div><div data-viz="mtf" data-q="far11a-3"></div></section>
<section class="wrap blk ders-sec" id="a11a-p2"><h2>Part II · SOE 2 (farmakoloji)</h2>
<div class="card soe-soru"><h3>Açılış sorusu</h3><p>Lokal anestezik sinirde bloğu nasıl oluşturur? Enfekte dokuda etkinin zayıflamasını ve sistemik düzey yükseldiğinde beklediğiniz bulguları açıklayın.</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Yaklaşık −50 mV’ta açılan voltaja duyarlı Na⁺ kanalları aksiyon potansiyelinin yükselişini sağlar. [[K3 s. 170]]</li>
<li>Yüksüz ilaç zarı geçer, aksoplazmada protonlanır ve içten bağlanarak kanalın inaktif durumda kalmasını sağlar. [[K3 s. 171]]</li>
<li>Enfeksiyonda asidite yüksüz fraksiyonu azaltır, artabilen damarlanma ilacı uzaklaştırır. [[K3 s. 173]]</li>
<li>Sistemik düzeyi ajanın özellikleri, enjeksiyon bölgesi ve vazokonstriktör etkiler. [[K3 s. 175]]</li>
<li>İnhibitör internöronların blokajı eksitasyonla başlar, konvülsiyonları yaygın depresyon, koma ve apne izler. [[K3 s. 174–175]]</li>
<li>Kardiyak depresyon ve iletim yavaşlaması gelişir, bupivakainin yavaş ayrılması reentran aritmi ve fibrilasyonu kolaylaştırabilir. [[K3 s. 174]]</li></ol>
<div class="note"><b>Çizin.</b> Na⁺ kanalını, zarı geçen B’yi ve içte bağlanan BH⁺’yı yerleştirin. [[K3 s. 171–172]] Yanına pH 7,4 ve 7,1’de lidokainin yüksüz payını, ardından SSS ve kalp bulgularının sırasını ekleyin. [[K3 s. 174–176]]</div>
<h3>Olası ek sorular</h3><ul><li>Fetal asidozda iyon tuzağı nasıl oluşur?</li><li>Ropivakain ile bupivakainin kardiyak etkileri nasıl ayrılır?</li><li>Lipit havuzu toksisitede nasıl rol oynar?</li></ul></section>
<section class="wrap blk ders-sec" id="a11a-ozet"><h2>Özet</h2><ul class="ozet">
<li>İstirahat potansiyeli K⁺ dengesine, hızlı yükseliş voltaja duyarlı Na⁺ kanallarının açılmasına bağlıdır. [[K3 s. 170]]</li>
<li>Yüksüz ilaç zarı aşar ve protonlanmış biçim Na⁺ kanalını içeriden bloke eder. [[K3 s. 171]]</li>
<li>Başlangıcı pKa, süreyi proteine bağlanma, in vitro potensi lipit çözünürlüğü öngörür. [[K3 s. 172]]</li>
<li>Bupivakainin kardiyak Na⁺ kanalından yavaş ayrılması depresyonu uzatır. [[K3 s. 174]]</li>
<li>Enjeksiyon yeri sistemik düzeyi, proteine bağlanma ise plasental geçişi etkiler. [[K3 s. 175]]</li>
<li>SSS toksisitesi kardiyovasküler toksisiteden önce gelir ve lipit emülsiyonu ilacı hedef organdan uzaklaştırır. [[K3 s. 176]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="11a"></div>
<nav class="ders-gec"><a href="#/dersler/farmakoloji/10d">← 10d · Tek tek NSAİİ'ler ve COX-2 inhibitörleri</a><a href="#/dersler/farmakoloji/11b">Sonraki: 11b · Tek tek lokal anestezikler →</a></nav></section>`
  };
})();
