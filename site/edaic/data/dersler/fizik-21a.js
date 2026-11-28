VERI.sorular = VERI.sorular || {};
VERI.sorular['fk21a-1'] = {
  no: 1, kok: 'Kapasitörün yapısı, enerjisi ve AC/DC davranışı', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 345–347]]',
  onermeler: [
    { t: 'Paralel plakalı bir kapasitörde plakalar arasındaki uzaklık azaldıkça kapasitans düşer.', d: false, n: 'Plaka alanı arttıkça ve plakalar arasındaki uzaklık küçüldükçe kapasitans büyür. [[K6 s. 346]]' },
    { t: 'Kapasitörde depolanan elektrik enerjisi uygulanan gerilimin karesiyle orantılıdır (E = ½·C·V²).', d: true, n: 'Depolanan enerji E = ½·C·V² = ½·Q·V formülüyle hesaplanır. [[K6 s. 347]]' },
    { t: 'Tam şarj olmuş bir kapasitör doğru akım (DC) devresinde sürekli akım geçişini engeller.', d: true, n: 'Dielektrik yalıtkan olduğundan kapasitör DC akımını engeller; oysa AC devrede frekansa ve kapasitansa bağlı olarak akım geçebilir. [[K6 s. 347]]' },
    { t: 'Elektronlar normal çalışma sırasında dielektrik tabakayı doğrudan aşarak karşı plakaya geçer.', d: false, n: 'Dielektrik bir yalıtkandır; elektronlar bu boşluğu geçemez, pratikte yalnızca gövde veya dielektrikten çok yavaş sızıntı olabilir. [[K6 s. 347]]' },
    { t: 'Kapasitör şarj devresinden ayrılıp yüke bağlandığında yükü zamanla azalarak deşarj olur.', d: true, n: 'Devreye bağlanan yüklü kapasitörde elektronlar negatif plakadan devre üzerinden pozitif plakaya akarak boşalır. [[K6 s. 346–347]]' },
  ],
};
VERI.sorular['fk21a-2'] = {
  no: 2, kok: 'Eksternal defibrilatör devresi ve OED güvenliği', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 347–349]]',
  onermeler: [
    { t: 'Eksternal defibrilatördeki kapasitör, şebeke AC gerilimini doğrultucudan geçirmeden doğrudan AC ile şarj edilir.', d: false, n: 'Yükseltici transformatör gerilimi artırır, doğrultucu ise kapasitörün şarjı için gereken doğru akımı sağlar. [[K6 s. 348]]' },
    { t: 'Devredeki indüktör kapasitörün deşarj süresini yaklaşık 3 milisaniyeye uzatır.', d: true, n: 'İndüktör boşalmayı ≈ 3 ms’ye uzatarak deşarj sırasında göğüsten ≈ 30 A akım geçmesini sağlar. [[K6 s. 348]]' },
    { t: 'İç defibrilatörlerde aynı enerjiyi kalbe ulaştırmak için daha düşük gerilim yeterlidir.', d: true, n: 'Doğrudan kalbe uygulamada derinin yüksek direnci akım yolundan çıkar. [[K6 s. 348]]' },
    { t: 'Otomatik eksternal defibrilatörlerde yanlış elektrot yerleşimi deri yanıklarına yol açabilir.', d: true, n: 'Yanlış yerleştirilmiş elektrotlar yanık oluşturabilir; ayrıca hastaya veya iletken yatağa dokunan personel çarpılma riski altındadır. [[K6 s. 348–349]]' },
    { t: 'Kendinden yapışkanlı pedlere geçiş personel güvenliğini artırmıştır.', d: true, n: 'Yapışkanlı pedlere geçiş personel güvenliğini, konum doğruluğunu ve deri temasını artırmış, yanıkları azaltmıştır. [[K6 s. 348]]' },
  ],
};
VERI.sorular['fk21a-3'] = {
  no: 3, kok: 'Bifazik dalga biçimi, senkronizasyon ve ICD', kagit: 'Paper A · Fizik', kaynak: '[[K6 s. 349–351]]',
  onermeler: [
    { t: 'Bifazik defibrilatör akımı kalpten iki ayrı yönde geçirerek daha düşük tepe akımı ve enerjiyle aynı etkiyi sağlar.', d: true, n: 'İki yönlü akımla aynı etki daha düşük tepe akımı ve enerjiyle elde edilir. [[K6 s. 349–350]]' },
    { t: 'Ventriküler fibrilasyonda şokun EKG R dalgasına göre senkronize edilmesi zorunludur.', d: false, n: 'VF’de şokun R dalgasına göre zamanlanması gerekmez. [[K6 s. 350]] R dalgasına senkronizasyon atriyal fibrilasyon, flutter ve VT gibi diğer aritmilerde gerekir. [[K6 s. 350–351]]' },
    { t: 'İmplante kardiyoverter defibrilatörün şok vermeden önce mutlaka antitaşikardi pacing denemesi gerekir.', d: false, n: 'ICD tehlikeli ventriküler aritmi algıladığında programlı algoritmasına göre hemen şok verebilir veya ATP başarısız olursa şoka geçer. [[K6 s. 349]]' },
    { t: 'ICD üretecinin değiştirilmesini gerektiren tek durum elektrodun yerinden çıkmasıdır.', d: false, n: 'ICD darbe üreteci genellikle yaklaşık 5 yılda bir değiştirilir ve tekrarlayan deşarjlar pili erken tüketebilir. [[K6 s. 349]]' },
    { t: 'ICD’lerde primer korumanın en sık endikasyonu iskemik kalp hastalığına bağlı kötü sol ventrikül işlevidir (sol ventrikül ejeksiyon fraksiyonu %30’un altında).', d: true, n: 'Tablo 21.1’de primer koruma için en sık neden iskemik kalp hastalığına bağlı sol ventrikül ejeksiyon fraksiyonu %30’un altında olarak verilir (enerji 25–40 J). [[K6 s. 351]]' },
  ],
};

(function () {
  const nav = [
    ['kapasitans', 'Kapasitans'], ['enerji', 'Yük ve enerji'], ['devre', 'Defibrilatör devresi'], ['ped', 'Pedler ve güvenlik'], ['icd', 'İmplante cihaz'],
    ['dalga', 'Dalga ve zamanlama'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
  ];
  function sekil(ad, baslik, alt) {
    return `<div class="viz"><div class="viz-head"><h3>${baslik}</h3></div><div data-viz="fk21a_${ad}"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">${alt}</p></div>`;
  }
  SAYFALAR['dersler/fizik/21a'] = {
    grup: 'dersler', eyebrow: 'Fizik · Bölüm 21 · Ders 21a', baslik: 'Kapasitans ve defibrilatörler',
    lede: 'Kapasitör elektrik enerjisini yük olarak depolar ve devreye bağlandığında hızla boşaltır. [[K6 s. 345–347]] Eksternal ve implante defibrilatörler bu kontrollü boşalmayı miyokardı yeniden düzenlemek için kullanır. [[K6 s. 347–350]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${nav.map(([id, ad], i) => `<button type="button" data-scroll="fk21a-${id}"><span>${i + 1}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="fk21a-kapasitans">
<h2>İki plaka arasında yük nasıl tutulur?</h2>
<p class="intro">Kapasitör, hava ya da kâğıt, mum, porselen gibi yalıtkan bir dielektrikle ayrılmış iki veya daha çok paralel metal plakadan oluşan yük depolama aygıtıdır. [[K6 s. 345]]</p>
${sekil('plaka', 'Kapasitörün simgesi ve elektronların yolu', 'Şarj, kaynaktan ayırma ve dış devreye bağlama evrelerini sırayla seçin. [[K6 s. 345–347]]')}
<p>Doğru gerilim uygulandığında plakalara giden elektron akışına <b>şarj akımı</b> denir. [[K6 s. 345]] Elektron toplayan plaka negatif yüklenirken karşı plakada aynı büyüklükte bir elektron eksikliği ve dolayısıyla pozitif yük oluşur. [[K6 s. 345]] Plakalar arasındaki gerilim kaynağın uyguladığı gerilime ulaştığında kapasitör tam şarjlıdır ve şarj akımı durur. [[K6 s. 345–346]]</p>
<p>Plakalar yüklenirken dielektrik boyunca elektrostatik alan oluşur ve negatif plakadaki elektronlar pozitif plakaya çekilir. [[K6 s. 347]] Aradaki yalıtkanı aşamadıkları için, dış devreden ayrılmış ideal bir kapasitör yükünü süresiz koruyabilir. [[K6 s. 347]] Gerçek bir kapasitörde gövdeden ya da dielektrikten çok yavaş yük sızıntısı olur. [[K6 s. 347]]</p>
${sekil('gerilim', 'Önce kaynak, sonra dış devre', 'Gerilim–zaman çizimi şematiktir ve evrelerin süresini sayısal olarak göstermez. [[K6 s. 346–347]]')}
<p><b>Grafiği okuyun.</b> Düşey eksen iki plaka arasındaki gerilimi gösterir. [[K6 s. 346–347]] Yükselen bölümde kaynak bağlıdır ve yük birikir. [[K6 s. 345–346]] Eğrinin tepesinde plaka gerilimi kaynak gerilimine ulaşmıştır. [[K6 s. 346]] Azalan bölüm ise kapasitörün bir yüke bağlandığı evreyi gösterir. [[K6 s. 346–347]]</p>
<p><b>Deşarj yolunu izleyin.</b> Yüklü plakaları bir dış devreyle birleştirdiğinizde elektronlar negatif plakadan ayrılır ve devre üzerinden pozitif plakaya gider. [[K6 s. 346]] Şarj sırasında yükselen plaka gerilimi deşarj sırasında düşer ve kapasitörde kalan yük azalır. [[K6 s. 346–347]]</p>
</section>

<section class="wrap blk ders-sec" id="fk21a-enerji">
<h2>Kapasitans, yük ve enerji</h2>
<p class="intro">Kapasitans, uygulanan her volt başına depolanabilen yükü gösterir ve farad (F) ile ölçülür. [[K6 s. 345–347]]</p>
${sekil('kapasitor', 'Gerilim değişince depolanan enerji', 'Kaydırıcıyı hareket ettirin ve aynı kapasitörde yük ile enerjinin gerilime nasıl farklı yanıt verdiğini izleyin. 28,8 µF’lık kapasitör kitap değerlerinden türetilmiş bir örnektir. [[K6 s. 346–348]]')}
<ul>
<li><b>Alan.</b> Plakaların alanı büyüdükçe kapasitans artar. [[K6 s. 346]]</li>
<li><b>Aralık.</b> Diğer özellikler aynıyken plakaları birbirine yaklaştırmak kapasitansı artırır. [[K6 s. 346]]</li>
<li><b>Yalıtkan.</b> Aynı plaka alanı ve aralığında kapasitans, aradaki dielektriğin özelliklerine de bağlıdır. [[K6 s. 345–346]]</li></ul>
<div class="card fk21a-hesap"><h3>Gerilimden yüke, yükten enerjiye</h3>
<p><i>Q</i> coulomb cinsinden yükü, <i>V</i> volt cinsinden plaka gerilimini, <i>C</i> farad cinsinden kapasitansı gösterir. [[K6 s. 345–347]] <i>C</i> = <i>Q</i>/<i>V</i> olduğundan tam şarjda depolanan yük <i>Q</i> = <i>C</i>·<i>V</i> olur. [[K6 s. 346–347]]</p>
<p>Depolanan enerji joule cinsinden <i>E</i> = ½<i>C</i>·<i>V</i><sup>2</sup> ya da eşdeğer olarak ½<i>Q</i>·<i>V</i>’dir. [[K6 s. 347]] Şekildeki hesap için 5000 V’ta 360 J depolayan bir kapasitör seçildiğinde <i>C</i> = 2 × 360 / 5000<sup>2</sup> = 28,8 µF bulunur. [[K6 s. 347–348]] Aynı kapasitörde 3000 V için yük 0,0864 C, enerji ise 129,6 J olur. [[K6 s. 346–348]]</p></div>
<details><summary>Aynı gerilim her kapasitörde aynı yükü mü gösterir?</summary><p>İki kapasitör aynı kaynağa bağlanıp tam şarj edilirse ikisinin de plaka gerilimi kaynağın gerilimine eşit olur. [[K6 s. 345–346]] Ancak kapasitansı daha büyük olan aygıt her volt için daha çok yük tutar. [[K6 s. 346–347]] Bu nedenle aynı gerilimde depoladığı enerji de daha büyüktür. [[K6 s. 347]]</p></details>
<div class="cols"><div class="card"><h3>Doğru ve alternatif akım</h3><p>Doğru akım devresinde başlangıçtaki şarj akımı sona erince kapasitör sürekli akımı engeller. [[K6 s. 345–347]] Alternatif akım devresinde bir miktar akım geçebilir ve bu miktar hem frekansa hem de kapasitansa bağlıdır. [[K6 s. 347]]</p></div>
<div class="card"><h3>Güç kaynağında kullanım</h3><p>Birçok elektronik aygıtın güç kaynağında büyük kapasitörler bulunur. [[K6 s. 347]] Ana besleme kesildiğinde depolanmış yük kontrollü biçimde boşaltılarak besleme geri gelene kadar aygıta güç sağlanır. [[K6 s. 347]]</p></div></div>
</section>

<section class="wrap blk ders-sec" id="fk21a-devre">
<h2>Eksternal defibrilatörün şarj ve deşarj devreleri</h2>
<p class="intro">Defibrilatör kontrollü bir elektrik yükü boşaltır ve şokun büyüklüğü enerji birimiyle ifade edilir. [[K6 s. 347]] Kalpten geçen akımın amacı, kritik büyüklükte bir miyokard kitlesini depolarize ederek aritmiyi sonlandırmak ve sinoatriyal düğümün doğal uyarı merkezi işlevini geri kazanmasını sağlamaktır. [[K6 s. 347]]</p>
${sekil('devre', '240 V AC şebekeden 30 A göğüs akımına', 'Dört adımı izleyerek yükseltme, doğrultma ve indüktör rolünü görün. [[K6 s. 348]]')}
<div class="cols"><div class="card"><h3>Şarj tarafı</h3>
<p>Şebekeden gelen 240 V alternatif gerilim ile kapasitörü şarj etmek için gereken besleme arasında iki fark vardır. [[K6 s. 348]] Yükseltici transformatör gerilimi 3000–5000 V aralığına çıkarır, doğrultucu ise şarj için doğru akım sağlar. [[K6 s. 348]] Büyük kapasitör belirlenen gerilime kadar şarj edildiğinde enerji, kaşıklardan boşaltılmak üzere hazırdır. [[K6 s. 348]]</p></div>
<div class="card"><h3>Deşarj tarafı</h3><p>Kitabın eksternal devre örneğinde tipik enerji 360 J’dür. [[K6 s. 348]] Deşarj yolundaki indüktör boşalmayı yavaşlatır, böylece yaklaşık 3 milisaniye süren deşarj sırasında göğüsten yaklaşık 30 A akım geçer. [[K6 s. 348]] Bu örnekte joule depolanan enerjiyi, amper göğüsten geçen akımı, milisaniye ise boşalmanın süresini tanımlar. [[K6 s. 348]]</p></div></div>
<p><b>Göğüs duvarı neden önemlidir?</b> Belirli bir gerilim uygulandığında dokudan geçen akımın büyüklüğünü doku direnci belirler. [[K6 s. 347]] Dışarıdan uygulamada elektrotlarla kalp arasındaki yol deriyi içerir. [[K6 s. 347–348]] İç defibrilatörde yüksek deri direnci aradan çıktığı için aynı enerjiyi kalbe iletmek üzere çok daha düşük gerilim yeterlidir. [[K6 s. 348]]</p>
<p><b>Giyilebilir cihaz.</b> Yaşamı tehdit edebilecek bir aritmi açısından kısa süreli risk taşıyan hastalar için yelek biçiminde defibrilatörler geliştirilmiştir. [[K6 s. 348]]</p>
</section>

<section class="wrap blk ders-sec" id="fk21a-ped">
<h2>Göğüsle temas ve OED güvenliği</h2>
<p class="intro">Eksternal şok, göğüste tutulan iki kaşıkla ya da deriye yapışan temas elektrotlarıyla verilir. [[K6 s. 348]] Elektrotun konumu ve deriyle temas derecesi şokun başarısını etkileyebilir. [[K6 s. 347–348]]</p>
${sekil('defib', 'Eksternal ünite, kablo ve pedler', 'Kabloları üniteden temas elektrotlarına kadar izleyin ve numaralara dokunun. [[K6 s. 348]]')}
<p>El kaşıklarının yerine kendinden yapışkanlı pedlerin kullanılması yerleşim doğruluğunu ve deriyle temas kalitesini artırmıştır. [[K6 s. 348]] Personel güvenliği de artmış, deride görülen yanıklar azalmıştır. [[K6 s. 348]] Kitap, bu değişiklikle birlikte dokuya aktarılan enerji oranının da azaldığını bildirir. [[K6 s. 348]]</p>
<p><b>Otomatik eksternal defibrilatör (OED).</b> Otomasyon, deneyimi sınırlı kullanıcıların da yaşam kurtarıcı müdahalede bulunabilmesine olanak tanır. [[K6 s. 348]] Kitap hastane ve ambulansların yanı sıra havalimanı ve alışveriş merkezi gibi kamusal alanları örnek verir. [[K6 s. 348]]</p>
<ul><li><b>Yanık.</b> Elektrot yanlış yerleştirilirse hastanın derisinde yanık oluşabilir. [[K6 s. 349]]</li>
<li><b>Personelin şok alması.</b> Temas doğrudan hastaya olabileceği gibi hastaya değen yatak ya da başka bir iletken nesne üzerinden de olabilir. [[K6 s. 349]]</li>
<li><b>Ritmin yanlış tanınması.</b> Yanlış aritmi tanısıyla verilen şok, hastayı ventriküler fibrilasyona sokabilir. [[K6 s. 349]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="fk21a-icd">
<h2>İmplante kardiyoverter defibrilatör ritmi nasıl izler?</h2>
<p class="intro">İmplante kardiyoverter defibrilatör (ICD), ventriküler fibrilasyon (VF) veya ventriküler taşikardi (VT) nedeniyle ani kardiyak ölüm riski yüksek hastalarda kullanılan küçük, pilli bir uyarı üretecidir. [[K6 s. 349]]</p>
${sekil('icd', 'Ventriküler aritmi algılandığında', 'Programın seçtiği müdahaleyi değiştirerek doğrudan şok ile önce uyarım denenen yolu karşılaştırın. [[K6 s. 349]]')}
<p>Üreteç genellikle pektoral kasın önündeki fasyaya yerleştirilir. [[K6 s. 349]] Bir ya da daha fazla elektrot kablosu toplardamar sistemi içinden sağ kalp boşluklarına uzanır ve cihaz bu kablolar üzerinden kalp ritmini sürekli izler. [[K6 s. 349]]</p>
<p>Tehlikeli bir ventriküler aritmi algılanınca cihaz hemen şok verebilir veya antitaşikardi uyarımıyla (ATP) ritmi taşikardiden daha hızlı uyararak aritmiyi sonlandırmayı deneyebilir. [[K6 s. 349]] ATP başarısız olursa cihaz şok verir. [[K6 s. 349]] Müdahale algoritması genellikle implantasyon sırasında programlanır ve hastanın klinik durumu değiştikçe ritmi ayırt etme özgüllüğü yeniden ayarlanabilir. [[K6 s. 349]]</p>
<p>Yüksek VF riskinde ICD’nin eksternal defibrilatöre göre üstünlüğü, yaşam kurtarıcı müdahaleyi gecikmeden uygulayabilmesidir; bu nedenle bu hastalarda daha etkilidir. [[K6 s. 349]] Uyarı üretecinin genellikle yaklaşık beş yılda bir değiştirilmesi gerekir. [[K6 s. 349]]</p>
<ul><li><b>Uygunsuz şok.</b> Elektrot kablosunun hasarı, bir atriyal aritminin yanlış sınıflandırılması veya bazen dış girişim, hastada ağrı ve sıkıntı yaratan şoklara yol açabilir. [[K6 s. 349]]</li>
<li><b>Tekrarlayan deşarj.</b> Miyokard kalıcı hasar görebilir ve pil erken tükenirse cihaz işlevini yitirebilir. [[K6 s. 349]]</li>
<li><b>Uzun dönem.</b> Elektrotların yüzeyi dokuyla kaplanabilir, elektrotlar yerinden kayabilir veya uç olgularda miyokardda yırtılmaya yol açabilir. [[K6 s. 349]]</li></ul>
</section>

<section class="wrap blk ders-sec" id="fk21a-dalga">
<h2>Monofazik, bifazik dalgalar ve defibrilatör tipleri</h2>
<p class="intro">Bifazik dalga akımı kalpten iki yönde geçirerek daha düşük tepe akımı ve enerjiyle aynı defibrilasyon etkisini sağlar. [[K6 s. 349–350]]</p>
${sekil('dalga', 'Monofazik ve bifazik akım–zaman dalgaları', 'Şematik dalgaları tek tek veya üst üste karşılaştırın. Kitabın örnek eğrisinde monofazik deşarj (200 J) ≈ 45 A tepeye çıkar; bifazik deşarj (150 J) ≈ 30 A ile başlar, ≈ 5 ms’de ≈ −15 A’ya döner ve ≈ 10 ms’de biter. [[K6 s. 350]]')}
<p>Monofazik defibrilatör, kapasitörün tek yönde deşarjıyla çalışır. [[K6 s. 349]] Başta ICD’lerde pil ömrünü uzatmak ve miyokard hasarını azaltmak için geliştirilen <b>bifazik</b> yöntem artık eksternal cihazlarda da yaygındır. [[K6 s. 349]] Gelişmiş cihazlar vücut empedansını tahmin edip şok gerilimini buna göre ayarlar; bu özellik bifazik dalgayla birleşince miyokard hasarı olasılığı azalır. [[K6 s. 350]]</p>
<p><b>Eğriyi okuyun.</b> Yatay eksen zamanı, düşey eksen kalpten geçen akımı gösterir. [[K6 s. 349–350]] Monofazik eğri zaman ekseninin tek tarafında kalırken bifazik eğrinin ikinci bölümü eksenin karşı tarafına geçer. [[K6 s. 349–350]] Bu geçiş, aynı şok içinde akımın yön değiştirdiğini gösterir. [[K6 s. 349–350]] Tepe akımlarını karşılaştırırken her eğrinin sıfır çizgisinden en büyük uzaklığına bakın. [[K6 s. 350]]</p>
<p><b>Senkronizasyon.</b> Ventriküler fibrilasyonda şokun kalp döngüsü içinde belirli bir ana denk getirilmesi gerekmez. [[K6 s. 350]] Kitap diğer aritmilerde cihazın şoku <b>EKG’deki R dalgasıyla eşzamanlı</b> verecek şekilde programlandığını belirtir. [[K6 s. 350]] Zamanlama yanlışsa müdahale başarısız olabilir veya şok, ventriküler fibrilasyon dahil daha ağır bir aritmi başlatabilir. [[K6 s. 350]]</p>
<p><b>Tabloyu okuyun.</b> İlk iki satırda şok dışarıdan aynı araçlarla uygulanabilir, ancak endikasyon ve enerji aralığı farklıdır. [[K6 s. 350–351]] Elektif grupta atriyal fibrilasyon, atriyal flutter ve ventriküler taşikardi için R dalgasıyla eşzamanlı doğru akım kardiyoversiyonu yer alır. [[K6 s. 350–351]] Kalp cerrahisinde doğrudan uygulama ile kalıcı olarak yerleştirilen cihaz ise ayrı satırlarda gösterilmiştir. [[K6 s. 351]]</p>
<div class="tbl-wrap"><table class="tbl fk21a-tablo"><caption>Tablo 21.1 · Defibrilatör türleri, endikasyonları ve enerji düzeyleri [[K6 s. 350–351]]</caption><thead><tr><th>Tür</th><th>Endikasyon</th><th>Uygulama yolu</th><th>Enerji (J)</th></tr></thead><tbody>
<tr><th scope="row">Acil defibrilatör</th><td data-alan="Endikasyon">Hemodinamik bozulmaya yol açan herhangi bir aritmi</td><td data-alan="Uygulama">Eksternal ped / kaşık</td><td data-alan="Enerji">200–360 J [[K6 s. 350]]</td></tr>
<tr><th scope="row">Elektif senkronize DC kardiyoversiyon</th><td data-alan="Endikasyon">Atriyal fibrilasyon, atriyal flutter, ventriküler taşikardi</td><td data-alan="Uygulama">Eksternal ped / kaşık</td><td data-alan="Enerji">50–360 J [[K6 s. 350–351]]</td></tr>
<tr><th scope="row">Doğrudan kalbe</th><td data-alan="Endikasyon">Kalp cerrahisi sırasında</td><td data-alan="Uygulama">İnternal kaşıklar</td><td data-alan="Enerji">5–50 J [[K6 s. 351]]</td></tr>
<tr><th scope="row">İmplante (ICD)</th><td data-alan="Endikasyon">Primer koruma: en sık iskemik kalp hastalığında sol ventrikül ejeksiyon fraksiyonu %30’un altında · Sekonder koruma: en sık VT/VF geçirmiş ve hemodinamisi bozulmuş ya da sol ventrikül işlevi kötü hastalar</td><td data-alan="Uygulama">Normal kalp pili gibi implante</td><td data-alan="Enerji">25–40 J [[K6 s. 351]]</td></tr>
</tbody></table></div>
<p><b>ICD satırında iki hasta grubunu ayırın.</b> Kitabın primer koruma örneğinde seçim, iskemik kalp hastalığına bağlı sol ventrikül işlev bozukluğuna dayanır. [[K6 s. 351]] Sekonder koruma örneğinde hasta daha önce VT veya VF geçirmiştir ve değerlendirmeye hemodinamik bozulma ya da kötü sol ventrikül işlevi girer. [[K6 s. 351]] Tablo en sık örnekleri verir ve endikasyonların tam listesi için NICE kılavuzuna yönlendirir. [[K6 s. 351]]</p>
</section>

<section class="wrap blk ders-sec" id="fk21a-p1"><h2>Part I · Doğru mu, yanlış mı?</h2><p>Her önermeyi bağımsız değerlendirin.</p>
<div data-viz="mtf" data-q="fk21a-1"></div><div data-viz="mtf" data-q="fk21a-2"></div><div data-viz="mtf" data-q="fk21a-3"></div></section>

<section class="wrap blk ders-sec" id="fk21a-p2"><h2>Part II · SOE 2</h2>
<div class="card soe-soru"><h3>Klinik ölçüm ve ekipman</h3><p>Eksternal bir defibrilatörün elektrik devresini ana bileşenleriyle anlatın. Devrede neden doğrultucu ve indüktör bulunur; bifazik dalga biçimi monofaziğe göre ne avantaj sağlar? [[K6 s. 348–350]]</p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li><b>Güç ve gerilim hazırlığı.</b> 240 V AC şebeke gerilimi yükseltici transformatörle 3000–5000 V’a çıkarılır ve doğrultucudan geçirilerek DC’ye çevrilir. [[K6 s. 348]]</li>
<li><b>Enerji depolama.</b> Büyük kapasitör yük depolayarak tipik 360 J enerjiyi (<i>E</i> = ½<i>CV</i>²) deşarja hazır tutar. [[K6 s. 347–348]]</li>
<li><b>İndüktörün rolü.</b> Deşarj yolundaki indüktör boşalmayı ≈ 3 ms’ye uzatarak göğüsten ≈ 30 A kontrollü akım akmasını sağlar. [[K6 s. 348]]</li>
<li><b>Bifazik dalga.</b> Akım yön değiştirir ve aynı etki için gereken tepe akımı ile enerji azalır. [[K6 s. 349–350]] Gelişmiş cihazlarda empedans tahminine göre gerilim ayarı da yapılır. [[K6 s. 350]]</li>
<li><b>Zamanlama ve güvenlik.</b> VF dışında R dalgası senkronizasyonu şarttır; yapışkanlı pedler teması ve personel güvenliğini artırır. [[K6 s. 348]] [[K6 s. 350]]</li>
</ol>
<p class="note"><b>Çizin.</b> Şarj tarafında doğrultucu + 3000–5000 V kaynak, ortada anahtarlanabilir kapasitör, deşarj tarafında indüktör, ped anahtarı ve hasta pedlerinden oluşan defibrilatör devresini ve bifazik akım–zaman eğrisini çizin. [[K6 s. 348]] [[K6 s. 350]]</p>
<p><b>Ek sorular.</b> Kapasitansı hangi üç etken belirler? Acil, elektif kardiyoversiyon, internal ve ICD enerji aralıklarını söyleyin. ICD hangi mekanizmalarla uygunsuz şok verebilir? [[K6 s. 346]] [[K6 s. 349–351]]</p></section>

<section class="wrap blk ders-sec" id="fk21a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Kapasitör yükü <i>Q</i> = <i>C</i>·<i>V</i>, enerjiyi <i>E</i> = ½<i>CV</i>² = ½<i>QV</i> olarak depolar; DC’yi engeller, AC’yi frekans ve kapasitansa bağlı geçirir. [[K6 s. 346–347]]</li>
<li>Eksternal defibrilatör 3000–5000 V DC ile şarj edilmiş kapasitör ve deşarjı ≈ 3 ms’ye yavaşlatan indüktör kullanır (≈ 30 A, tipik 360 J). [[K6 s. 348]]</li>
<li>Kendinden yapışkanlı pedler kaşıklara göre personel güvenliğini ve deri temasını iyileştirip yanıkları azaltır. [[K6 s. 348]]</li>
<li>Bifazik defibrilasyon iki yönde daha düşük tepe akımıyla etki gösterir; gelişmiş cihazlar vücut empedansına göre gerilimi ayarlar. [[K6 s. 349–350]]</li>
<li>VF dışında şok R dalgasıyla senkronize edilmelidir; iç kaşıklar 5–50 J, ICD’ler 25–40 J kullanır. [[K6 s. 350–351]]</li>
</ul>
<div data-viz="tamam" data-modul="fizik" data-bolum="21a"></div>
<nav class="ders-gec"><a href="#/dersler/fizik/20">← Elektrik çarpması, topraklama, mikroşok ve elektrocerrahi</a><a href="#/dersler/fizik/21b">Sonraki: Biyolojik potansiyeller: EKG, EMG, EEG ve kalp pilleri →</a></nav></section>`,
  };
})();
