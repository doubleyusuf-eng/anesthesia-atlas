VERI.sorular = VERI.sorular || {};
VERI.sorular['fk05b-1'] = {
  no: 1, kagit: 'Paper A · Fizik', kok: 'Salınım ve sönüm için aşağıdaki önermeleri değerlendirin.', kaynak: '[[K6 s. 86–89]]',
  onermeler: [
    { t: 'Basit harmonik harekette denge noktasındaki geri çağırıcı kuvvet en büyüktür.', d: false, n: 'Dengede yer değiştirme sıfır olduğu için geri çağırıcı kuvvet de sıfırdır. [[K6 s. 86–87]]' },
    { t: 'Aynı yaya daha küçük bir kütle asmak salınım frekansını artırır.', d: true, n: 'Aynı yer değiştirmede yayın uyguladığı kuvvet daha küçük kütleye daha büyük ivme kazandırır. [[K6 s. 87]]' },
    { t: 'Salıncağı doğal frekansıyla uyumlu itmek, aynı çabayla daha büyük genlik sağlar.', d: true, n: 'Düzenli itişler salınımla zaman bakımından örtüştüğünde rezonans görülür. [[K6 s. 87]]' },
    { t: 'Arter kateterindeki sürtünme sönümü azaltır.', d: false, n: 'Kateterdeki sürtünme salınıma karşı koyarak sönüm oluşturur. [[K6 s. 89]]' },
    { t: 'Ağır sönümlü bir süspansiyon tümsekten sonra dengeye hızla döner.', d: false, n: 'Ağır sönüm dengeye dönüşü geciktirir. [[K6 s. 88–89]]' },
  ],
};
VERI.sorular['fk05b-2'] = {
  no: 2, kagit: 'Paper A · Fizik', kok: 'Harmonikler ve arter basıncının Fourier spektrumu için:', kaynak: '[[K6 s. 89–91]]',
  onermeler: [
    { t: 'İki ucu sabit bir telin temel titreşiminde her iki uç da düğümdür.', d: true, n: 'Temel titreşimde hareketsiz kalan iki nokta telin sabit uçlarıdır. [[K6 s. 89]]' },
    { t: 'Bir harmonik dizide üçüncü harmoniğin frekansı temel frekansın üç katıdır.', d: true, n: 'Harmonik frekansları temel frekansın tam sayı katlarıdır. [[K6 s. 89]]' },
    { t: 'Fourier genlik spektrumunun yatay ekseni zamandır.', d: false, n: 'Spektrum her bileşenin genliğini frekansa göre gösterir. [[K6 s. 91]]' },
    { t: 'Dakikada 75 kalp atımı, 1,25 Hz temel frekansa karşılık gelir.', d: true, n: 'Bu hızda saniyede 1,25 kalp döngüsü gerçekleşir. [[K6 s. 91]]' },
    { t: 'Ventile hastada arter basıncı spektrumunda solunuma bağlı bir bileşen görülebilir.', d: true, n: 'Kitaptaki örnekte 0,15 Hz’deki bileşen solunumun kan basıncına etkisini yansıtır. [[K6 s. 91]]' },
  ],
};
VERI.sorular['fk05b-3'] = {
  no: 3, kagit: 'Paper A · Fizik', kok: 'Doppler etkisi ve ışığın ölçümü için:', kaynak: '[[K6 s. 91–94]]',
  onermeler: [
    { t: 'Durağan ses kaynağına yaklaşan gözlemci daha düşük frekans duyar.', d: false, n: 'Yaklaşırken dalga cepheleriyle daha sık karşılaşır. [[K6 s. 91]]' },
    { t: 'Hareketli araçtan yansıyan radar dalgasında çift Doppler kayması oluşur.', d: true, n: 'Araç önce hareketli alıcı, yansımada ise hareketli kaynak gibi davranır. [[K6 s. 92]]' },
    { t: 'Işınım akısının SI birimi kandeladır.', d: false, n: 'Işınım akısı yayılan güçtür ve watt ile ölçülür. [[K6 s. 93]]' },
    { t: 'Her yöne eşit ışın yayan bir kaynaktan uzaklık iki katına çıkarsa ışınım şiddeti dörtte bire iner.', d: true, n: 'Aynı güç dört kat büyük küre yüzeyine yayılır. [[K6 s. 93]]' },
    { t: 'Aydınlığa uyum sağlamış gözün en duyarlı olduğu dalga boyu yaklaşık 555 nm’dir.', d: true, n: 'Bu dalga boyu görünür spektrumun sarı-yeşil bölgesindedir. [[K6 s. 94]]' },
  ],
};

(() => {
  const sections = [
    ['hareket', 'Basit harmonik hareket'], ['sonum', 'Rezonans ve sönüm'], ['tel', 'Harmonikler'],
    ['fourier', 'Fourier analizi'], ['doppler', 'Doppler'], ['isik', 'Işığın ölçümü'],
    ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
  ];
  const figure = (id, title, caption, foot = '') => `<div class="viz"><div class="viz-head"><h3>${title}</h3></div>
    <div data-viz="fk05b_${id}"></div><p class="viz-cap" aria-live="polite">${caption}</p>
    ${foot ? `<p class="viz-foot">${foot}</p>` : ''}</div>`;
  SAYFALAR['dersler/fizik/05b'] = {
    grup: 'dersler', eyebrow: 'Fizik · Bölüm 5 · Ders 05b',
    baslik: 'Basit harmonik hareket, rezonans ve sönüm, Fourier analizi, Doppler etkisi',
    lede: 'Arter basıncı ölçülürken iki ayrı dalga önem taşır: arterdeki basınç dalgası ve ölçüm düzeneğinin kendi salınımı. [[K6 s. 89–91]]',
    html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${sections.map(([id, ad]) => `<button type="button" data-scroll="fk05b-${id}">${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="fk05b-hareket">
  <h2>Basit harmonik hareket</h2>
  <p class="intro">Basit harmonik harekette ivme denge noktasına yönelir ve büyüklüğü cismin bu noktadan uzaklığıyla doğru orantılıdır. [[K6 s. 86–87]]</p>
  ${figure('hareket', 'Sarkaç uzadığında bir salınım ne kadar sürer?', 'Aynı zaman aralığında tamamlanan döngüleri sayın. [[K6 s. 86–87]]', 'Eksenler başlangıç periyoduna ve salınım genliğine göre ölçeklenmiştir. [[K6 s. 86–87]]')}
  <p>Çocuk salıncağa oturduğunda, ilk itişten önce oturağın yere en yakın olduğu konum denge noktasıdır. [[K6 s. 85]] Yer değiştirme, hareket eden cismin bu sabit noktaya göre konumudur. [[K6 s. 85–86]] Denge çevresinde tam bir gidiş geliş bir döngüdür ve her döngü aynı sürede tamamlanır. [[K6 s. 86]]</p>
  <p>Bir döngünün süresine <b>periyot</b> denir ve yer değiştirme zamana karşı çizilirse sinüs eğrisi elde edilir. [[K6 s. 86]] Salıncak denge noktasından geçerken geri çağırıcı kuvvet sıfırdır, en uzak konumda ise en büyüktür. [[K6 s. 86–87]] Diyapazonun titreşen kolları ve hoparlörün titreşimi de bu hareketin örnekleridir. [[K6 s. 86]]</p>
  <div class="card fk05b-hesap"><h3>Grafiği okuyun · Periyodu nereden ölçersiniz?</h3>
    <p>Bir tepeden sonraki tepeye kadar geçen zamanı okuyun: cisim aynı konuma dönmüş ve bir döngüyü tamamlamıştır. [[K6 s. 86]] İki tepe arasındaki sıfır geçişinde yer değiştirme sıfırdır, ancak hareket sürer. [[K6 s. 85–87]] Dengeyi geçince yer değiştirmenin işareti değiştiği için geri çağırıcı ivmenin yönü de değişir. [[K6 s. 86–87]]</p>
    <p>Uzunluğu başlangıcın dört katına getirin: √4 = 2 olduğundan bir tam salınım artık iki başlangıç periyodu sürer. [[K6 s. 87]] Aynı sürede sarkaç eskisinin yarısı kadar döngü tamamlar. [[K6 s. 86–87]]</p></div>
  <div class="cols"><div class="card"><h3>Yay ve kütle</h3>
    <p>Geri çağırıcı kuvveti yayın esnekliği sağlar. [[K6 s. 87]] Aynı uzaklıkta yay aynı kuvveti uygularsa daha küçük kütle daha büyük ivme kazanır ve daha yüksek frekansta salınır. [[K6 s. 87]] Kütle değişmeden daha sert bir yay seçilirse yay sabiti büyür, aynı yer değiştirmedeki kuvvet ve salınım frekansı artar. [[K6 s. 87]]</p></div>
    <div class="card"><h3>Sarkaç</h3><p>Geri çağırıcı etki yerçekiminden gelir ve yerçekimi ivmesi kütleye bağlı olmadığı için kütleyi değiştirmek frekansı değiştirmez. [[K6 s. 87]] Basit harmonik harekette genlik de frekansı belirlemez. [[K6 s. 87]] Galileo’nun 1602’de gösterdiği uzunluk ilişkisi <i>T</i> ∝ √<i>L</i> biçimindedir (<i>T</i> saniye cinsinden periyot, <i>L</i> metre cinsinden uzunluk). [[K6 s. 87]]</p></div></div>
</section>

<section class="wrap blk ders-sec" id="fk05b-sonum">
  <h2>Rezonans ve sönüm</h2>
  <p class="intro">Salıncakta doğru anda uygulanan her itiş hareketi büyütür, sönüm ise başlayan salınıma karşı koyar. [[K6 s. 87–88]]</p>
  ${figure('sonum', 'Bir tümsekten sonra dengeye dönüş', 'Hafif ve ağır sönümün dengeye dönüşü nasıl değiştirdiğini karşılaştırın. [[K6 s. 88–89]]', 'Eğriler aynı başlangıç konumundan dönüşü şematik olarak gösterir, eksenler klinik ölçüm ölçeği taşımaz. [[K6 s. 88–89]]')}
  <p><b>Doğal ya da rezonans frekansı</b>, dışarıdan periyodik bir kuvvet uygulanmadan da sistemde görülebilen salınım frekansıdır. [[K6 s. 87]] Sistem bu frekansta titreşmeye eğilimlidir ve onu bu frekansta titreştirmek daha az enerji gerektirir. [[K6 s. 87]] Salıncağı zamansız itmek de hareket ettirir ama aynı çaba daha küçük genlik sağlar. [[K6 s. 87]] İtişler doğal frekansla aynı zamanlamada uygulanınca her itişten en büyük genliğin elde edilmesine <b>rezonans</b> denir. [[K6 s. 87]]</p>
  <ul><li><b>Çalgı.</b> Keman yayı teli doğal frekansında titreştirirken üflemeli çalgıda rezonansa giren yapı hava sütunudur. [[K6 s. 87]]</li>
    <li><b>Köprü.</b> Rüzgârın yinelenen kuvveti düşük frekanslı rezonans oluşturursa köprü sallanabilir, ağır durumda parçalanabilir. [[K6 s. 87]] Londra’da Thames üzerindeki Millennium yaya köprüsünü sallayan ise yayaların adımlarıydı ve uygun yerlere sönümleyiciler eklenince sorun düzeldi. [[K6 s. 87–88]]</li>
    <li><b>Süspansiyon.</b> Yay yolu yumuşatır, amortisör yayın salınımını bastırır. [[K6 s. 88]] Hafif sönüm aracı zıplatır, ağır sönüm ise tümsekten sonra dönüşü süspansiyonun işlevini aksatacak kadar yavaşlatır. [[K6 s. 88–89]] Bu iki uç, cihaz tasarımında kritik sönümün önemini gösterir. [[K6 s. 88–89]]</li></ul>
  <h3>İki eğriyi nasıl ayırırsınız?</h3>
  <p>Tümseği geçen aracın yayına yeni bir itiş uygulanmadığını düşünün. [[K6 s. 88–89]] Hafif sönüm eğrisinde önce denge çizgisini bulun, ardından çizginin iki yanındaki tepe ve çukurları izleyin. [[K6 s. 88–89]] Tepeler küçülürken çizginin yeniden geçilmesi, aracın hâlâ zıpladığını gösterir. [[K6 s. 88–89]]</p>
  <p>Ağır sönümü seçtiğinizde dönüşün uzun bir zaman aralığına yayıldığına dikkat edin. [[K6 s. 88–89]] Bir düzeneği değerlendirirken hem uyarıdan sonra salınımın sürüp sürmediğine hem de dengeye dönüşün ne kadar zaman aldığına bakılır. [[K6 s. 88–89]]</p>
  ${figure('transduser', 'Arter basıncını ölçerken hangi parça salınır?', 'Kateter ve diyaframın işlevlerini karşılaştırın. [[K6 s. 89]]')}
  <p>Arter kateteri ile transdüseri birlikte düşünün: diyafram titreşmeye eğilimlidir, kateter içindeki sürtünme ise bu titreşimi söndürür. [[K6 s. 89]] Hem yetersiz hem aşırı sönüm kaydedilen dalga biçimini bozarak kan basıncının hatalı ölçülmesine yol açabilir. [[K6 s. 89]]</p>
</section>

<section class="wrap blk ders-sec" id="fk05b-tel">
  <h2>Temel frekans ve harmonikler</h2>
  <p class="intro">Bir keman telinin iki ucu sabit kalırken telin arası birden çok biçimde titreşebilir. [[K6 s. 89–90]]</p>
  ${figure('tel', 'Telin hangi noktaları yerinde kalır?', 'Birinci harmonikten dördüncüye geçerken sabit noktaları sayın. [[K6 s. 89–90]]', 'Gri kesikli çizgi dinlenme konumunu, renkli düz ve kesikli çizgiler telin iki uç konumunu, noktalar titreşmeyen düğümleri gösterir. [[K6 s. 89–90]]')}
  <p><b>Düğüm</b>, tel üzerinde titreşim genliğinin sıfır olduğu noktadır. [[K6 s. 89]] Temel titreşimde iki uçta birer düğüm vardır ve bir üst harmoniğe her geçişte eşit aralıklı düğümlere bir yenisi eklenir. [[K6 s. 89–90]]</p>
  <p>Dizinin en düşük frekansı <i>f</i> (Hz) ise üst harmoniklerin frekansları <i>2f</i>, <i>3f</i> gibi tam sayı katlarıdır. [[K6 s. 89]] Çoğu salınıcı bu şekilde birden çok frekansta rezonans gösterebilir. [[K6 s. 89]]</p>
  <div class="card fk05b-hesap"><h3>Tel üzerinde sayın</h3><p>İlk harmonikte yalnız iki ucu işaretleyin, ardından ikinci harmoniği seçin: ortada yeni bir düğüm belirir ve tel iki eşit titreşim bölgesine ayrılır. [[K6 s. 89–90]] Dördüncü harmonikte dört bölgeyi sınırlayan beş düğüm vardır. [[K6 s. 89–90]] İki uç her seçimde düğüm olarak kalır, değişen telin iç kısmındaki düğümlerin sayısı ve aralığıdır. [[K6 s. 89–90]]</p></div>
  <div class="cols"><div class="card"><h3>Kemanın tınısı</h3><p>Acemi bir kemancı yayı uygun kullanmadığında yalnız üst harmonikleri uyarabilir ve telden tiz, gıcırtılı bir ses çıkabilir. [[K6 s. 89]] Doğru yay çekişinde de üst harmonikler bulunur: temel sese eklenen, genlikleri giderek azalan bu bileşenler kemanın zengin tınısını verir. [[K6 s. 89]]</p></div>
    <div class="card"><h3>Org borusunun tınısı</h3><p>Burada titreşen hava sütunudur ve kitabın org borusu örneğinde sese daha çok tek sayılı harmonikler katılır. [[K6 s. 89]] Bu dağılım borudan gelen sesin içi boş gibi duyulmasına katkıda bulunur. [[K6 s. 89]]</p></div></div>
</section>

<section class="wrap blk ders-sec" id="fk05b-fourier">
  <h2>Fourier analizi: basınç izinden frekans spektrumuna</h2>
  <p class="intro">Bir basınç izine bakarken “dalga zamanla nasıl değişiyor?”, Fourier analizinde ise “bu biçimi hangi frekanslar oluşturuyor?” sorusunu sorarız. [[K6 s. 90–91]]</p>
  ${figure('fourier', 'İki sinüs dalgasından bir basınç dalgası taslağı', 'İkinci harmoniğin genliğini değiştirerek toplamın tepesini izleyin. [[K6 s. 90–91]]', 'Genlikler bağıl ve şematiktir, şekil hasta basıncı ölçümü göstermez. [[K6 s. 90–91]]')}
  <p>Joseph Fourier’nin yönteminde biçimi ne olursa olsun periyodik bir dalga, farklı genlik ve frekanslardaki sinüs ve kosinüs bileşenlerine ayrılabilir. [[K6 s. 90]] Ters yönde, bu bileşenler uygun fazlarda toplanarak dalga yeniden kurulabilir. [[K6 s. 90]] Frekanslar aynı kalırken bile bileşenlerin göreli genlikleri değişirse toplamın biçimi değişir. [[K6 s. 90]]</p>
  <p>Arter basıncı, elektrokardiyogram (EKG) ve elektroensefalogram (EEG) bu yolla incelenebilen biyolojik sinyallerdir. [[K6 s. 90]] Çoğu dalga biçimi az sayıda bileşenle oldukça iyi modellenebilir. [[K6 s. 90]] Aort basıncında iki sinüs bileşeni kaba bir taslak verirken dört sinüs dalgası genellikle %95 doğruluk sağlayabilir ve daha yüksek harmonikler yaklaşımı iyileştirebilir. [[K6 s. 90–91]]</p>
  <h3>Toplamı zaman ekseninde izleyin</h3>
  <p>Temel dalga bir döngü tamamlarken ikinci harmonik iki döngü tamamlar. [[K6 s. 89–91]] Bir zaman noktası seçin: iki kesikli eğri o anda aynı işaretliyse katkıları toplanır, ters işaretliyse biri diğerinin katkısını azaltır. [[K6 s. 90–91]] Düz çizginin o andaki yüksekliği işaretleri korunarak toplanan bu iki değerdir. [[K6 s. 90–91]]</p>
  <p>Kaydırıcıyı sıfıra çekince yalnız temel bileşen kalır. [[K6 s. 90–91]] İkinci bileşeni yeniden büyütürken bir döngünün başı ve sonu arasındaki süreyi, sonra da ilk tepenin yerini ve yüksekliğini karşılaştırın. [[K6 s. 90–91]] Böylece aynı temel frekansta farklı dalga biçimleri elde edilebilir. [[K6 s. 90]]</p>
  ${figure('spektrum', 'Hangi tepe kalbe, hangisi solunuma ait?', 'Kalp bileşenlerine solunumu ekleyin. [[K6 s. 91]]', 'Tepe konumları kitaptaki frekanslardır, yükseklikler göreli genlikleri şematik olarak gösterir. [[K6 s. 91]]')}
  <p>Hesap karmaşık olduğu için analiz genellikle bilgisayarda yapılır. [[K6 s. 91]] Sonuç bir <b>frekans spektrumudur</b>: yatay eksendeki konum bileşenin frekansını, tepenin yüksekliği genliğini verir. [[K6 s. 91]] Ventile hastada düşük frekanslı solunum bileşeninin belirmesi kan basıncının solunumla değiştiğini gösterir. [[K6 s. 91]]</p>
  <p>Spektrumda kalbin ikinci harmoniğini ararken ilk tepenin iki katı yüksekliğinde bir tepe aramak yanıltır. [[K6 s. 89–91]] İki katına çıkan, yatay eksendeki frekanstır ve bu örnekte ikinci tepe birinciden daha alçaktır. [[K6 s. 91]] Solunumu eklediğinizde yeni tepenin temel kalp frekansının hangi tarafında belirdiğine dikkat edin. [[K6 s. 91]]</p>
  <div class="card fk05b-hesap"><h3>Hesap · Dakikada 75 atım</h3>
    <p>Kalp frekansı <i>f</i> = 75/60 = <b>1,25 Hz</b> olup en büyük tepe buradadır. [[K6 s. 91]] Sonraki iki tepe <i>2f</i> = 2,5 Hz ve <i>3f</i> = 3,75 Hz’de görülür ve genlikleri giderek küçülür. [[K6 s. 91]] Solunuma ait 0,15 Hz’lik tepe ise kalp frekansının altında yer alır. [[K6 s. 91]]</p></div>
</section>

<section class="wrap blk ders-sec" id="fk05b-doppler">
  <h2>Doppler etkisi: gözlemciye hangi sıklıkta cephe ulaşır?</h2>
  <p class="intro">Christian Doppler’in 1842’de tanımladığı etkide, kaynakla gözlemci birbirine yaklaşırken algılanan frekans yükselir, uzaklaşırken düşer. [[K6 s. 91–92]]</p>
  ${figure('doppler', 'Ambulansın önünde ve arkasında dalga aralığı', 'Kaynağın gidiş yönünü değiştirip dalga cephelerinin hangi tarafta sıklaştığını bulun. [[K6 s. 92]]', 'Daireler eşit zaman aralıklarıyla yayılan ses cephelerinin bir andaki şematik konumlarıdır. [[K6 s. 92]]')}
  <p><b>Trendeki gözlemci.</b> Trendeki yolcu sabit ses kaynağına yaklaşırken dalga cepheleriyle daha sık karşılaşır ve sesi daha tiz duyar. [[K6 s. 91]] Tren kaynağı geçip uzaklaşırken karşılaşma sıklığı ve algılanan ses perdesi azalır. [[K6 s. 91]]</p>
  <p><b>Yoldaki gözlemci.</b> Yolda duran kişi için yaklaşan ambulansın önündeki ses cepheleri birbirine yakındır, aracın arkasındakilerin arası açıktır. [[K6 s. 92]] Bu örnekte gözlemciye göre sesin yayılma hızı değişmez. [[K6 s. 92]]</p>
  <div class="card"><h3>Yansımada neden iki kayma olur?</h3><ol>
    <li>Polis radarı araca radyo dalgası gönderir ve hareketli araç bu dalgayı kendi hareketine bağlı olarak farklı bir frekansta alır. [[K6 s. 92]]</li>
    <li>Araç, aldığı frekansta yansıma yapan hareketli bir kaynak gibi davranır. [[K6 s. 92]]</li>
    <li>Yansıyan dalga radara döndüğünde ikinci bir kayma vardır ve gönderilen frekansla alınan frekans arasındaki farktan aracın hızı ölçülebilir. [[K6 s. 92]]</li></ol>
    <p>Gönderilen frekans <i>f</i><sub>0</sub>, geri alınan frekans <i>f</i><sub>r</sub> ise işaretli fark Δ<i>f</i> = <i>f</i><sub>r</sub> − <i>f</i><sub>0</sub> (Hz), bağıl kayma ise boyutsuz Δ<i>f</i>/<i>f</i><sub>0</sub> oranıdır. [[K6 s. 92]] Çift kaymada bağıl kayma Δ<i>f</i>/<i>f</i> = 2<i>v</i>·cos<i>θ</i>/<i>c</i>, buradan hız <i>v</i> = Δ<i>f</i>·<i>c</i>/(2<i>f</i>·cos<i>θ</i>) olur (<i>θ</i>: hareket yönü ile dedektör arasındaki açı, <i>c</i>: dalga hızı, burada ışık hızı). [[K6 s. 92]]</p></div>
  <p>Sireni dinleyen kişi doğrudan kaynaktan gelen sesi alır. [[K6 s. 92]] Radar örneğinde ise sinyali gönderen ve geri alan cihaz aynı yerde durur, aradaki hareketli hedef iki kez rol oynar. [[K6 s. 92]] İlk kaymayı anlamak için dalgayı aracın nasıl aldığını, ikinciyi anlamak için aracın yansıttığı dalgayı radarın nasıl aldığını izleyin. [[K6 s. 92]]</p>
  <h3>Kaymayı yorumlayın</h3>
  <p>Durağan kaynağı seçip iki yanındaki dalga aralıklarına bakın, ardından kaynağı sağa hareket ettirin. [[K6 s. 92]] Önceden yayılmış cephe ilerlerken kaynak da sağa gittiği için bir sonraki cephe sağdaki gözlemciye daha yakın bir yerden yola çıkar. [[K6 s. 92]] Aynı gözlemciye birim zamanda daha fazla cephe ulaşır ve ses tizleşir. [[K6 s. 91–92]]</p>
  <p>Kaynağı sola çevirdiğinizde gözlemcinin yeri aynı kalsa bile kaymanın yönü değişir. [[K6 s. 91–92]] Tren örneğinde ise cephelerin kaynaktan çıkış düzeni aynı kalır, değişen yolcunun cephelerle karşılaşma sıklığıdır. [[K6 s. 91]]</p>
  <p><b>İki uygulama.</b> Evrenin genişlemesiyle çok yüksek hızlarda uzaklaşan gökadaların ışığı kırmızıya kayar. [[K6 s. 92]] Tıpta kan akımı hem ultrason hem de lazer ışığı kullanılarak Doppler etkisiyle ölçülebilir. [[K6 s. 92]]</p>
</section>

<section class="wrap blk ders-sec" id="fk05b-isik">
  <h2>Işınım akısı, ışınım şiddeti ve luminans</h2>
  <p class="intro">Ameliyat lambasının gücü, cerrahi alana düşen güç ve gözün algıladığı parlaklık ayrı büyüklüklerdir. [[K6 s. 93–94]]</p>
  ${figure('isik', 'Aynı lambadan uzaklaştıkça yüzeye ne kadar güç düşer?', 'Noktayı eğri üzerinde ilerletip uzaklık ile yüzey alanı arasındaki ilişkiyi okuyun. [[K6 s. 93]]', 'Aynı gücü her yöne eşit yayan bir kaynak için başlangıç uzaklığı ve şiddeti birim alınmıştır. [[K6 s. 93]]')}
  <div class="cols"><div class="card"><h3>Kaynağın çıkışı</h3><p><b>Işınım akısı</b> (<i>P</i>), kaynaktan saniyede yayılan enerjidir ve watt (W = J/s) ile ölçülür. [[K6 s. 93]] Bir ampul geniş bir frekans aralığında enerji yaydığı için yaklaşık beyaz görünür. [[K6 s. 93]] Lazerin enerjisi çok dar bir frekans aralığında toplandığından lazer genellikle tek dalga boylu, yani monokromatik kabul edilir. [[K6 s. 93]]</p></div>
    <div class="card"><h3>Yüzeye ulaşan ışınım</h3><p><b>Işınım şiddeti</b> (irradyans, <i>I</i>), birim alana düşen güçtür ve W/m² ile ölçülür. [[K6 s. 93]] Ampul yaklaşık her yöne eşit ışık yaydığında toplam güç, kaynaktan <i>r</i> metre uzakta alanı 4π<i>r</i><sup>2</sup> olan küreye dağılır. [[K6 s. 93]]</p></div></div>
  <div class="card fk05b-hesap"><h3>Hesap · Uzaklığı iki katına çıkarın</h3>
    <p><i>I</i> = <i>P</i>/(4π<i>r</i><sup>2</sup>) olduğundan <i>P</i> sabitken uzaklık <i>r</i>’den 2<i>r</i>’ye çıkarsa alan dört katına, ışınım şiddeti başlangıç değerinin dörtte birine ulaşır. [[K6 s. 93]]</p></div>
  <p><b>Fotometri</b>, görünür ışığı insan gözünün algısına göre ölçer. [[K6 s. 93–94]] Aydınlığa uyum sağlamış göz yaklaşık 555 nm’de, sarı-yeşil ışığa en duyarlıdır. [[K6 s. 94]] Aynı ışınım akısında mavi ışık sarı ışıktan daha sönük görünür, çünkü bu iki dalga boyuna gözün verdiği ağırlık farklıdır. [[K6 s. 94]]</p>
  <div class="card"><h3>İki karşılaştırma</h3><ul>
    <li><b>Aynı lamba, farklı uzaklık.</b> Kaynak her saniye aynı enerjiyi yaymayı sürdürürken uzak yüzeyin her metrekaresine daha küçük bir pay düşer. [[K6 s. 93]] Eğri üzerindeki noktayı ilerletmek bu geometrik etkiyi gösterir. [[K6 s. 93]]</li>
    <li><b>Aynı güç, farklı renk.</b> Mavi ve sarı kaynakların saniyede yaydığı enerji eşit olsa bile algılanan parlaklıklarını karşılaştırmak için ışığın hangi dalga boyunda yayıldığını bilmek gerekir. [[K6 s. 93–94]] Gözün duyarlılık işlevi bu enerjinin görsel karşılığını belirler. [[K6 s. 94]]</li></ul></div>
  <p>Tarihsel parlaklık standardı olan mum gücü, ispermeçet balinasından elde edilen özel bir mumla tanımlanmıştı. [[K6 s. 93]] Günümüzde ışık şiddetinin birimi kandela (cd), yedi temel SI biriminden biridir. [[K6 s. 93]] Kitap, ışınım şiddetini gözün duyarlılık işleviyle (<i>luminosity function</i>) çarparak luminansı (cd·m<sup>−2</sup>), toplam gücü aynı biçimde ağırlıklandırarak ışık akısını tanımlar: eşit güçteki sarı ışığın ışık akısı maviden büyüktür. [[K6 s. 94]]</p>
  <p>Fiziksel ölçümden görsel ölçüme geçerken iki soruyu ayrı sorun: yüzeye ulaşan ışınımın şiddeti nedir ve o dalga boyunda göz ne kadar duyarlıdır? [[K6 s. 93–94]] Kitabın anlattığı ağırlıklandırmada her dalga boyundaki katkı gözün o dalga boyuna duyarlılığına göre hesaba girer. [[K6 s. 94]]</p>
  <div class="note plain"><b>Atlas notu.</b> Kitap luminans ile ışık şiddetini eş anlamlı verir, ağırlıklandırılmış ışınım şiddetini luminans sayar ve ışık akısının birimini kandela olarak yazar. [[K6 s. 94]] Doğrusu, ışık akısının birimi lümen (lm), ışık şiddetinin kandela (cd = lm/sr), ağırlıklandırılmış ışınım şiddetinin (aydınlanma) lüks (lm/m²), yüzeyden yayılan ışığı anlatan luminansın ise cd/m²’dir. [[K6 s. 94]]</div>
</section>

<section class="wrap blk ders-sec" id="fk05b-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi ayrı değerlendirin, ardından açıklamasını açın.</p>
  <div class="viz"><div data-viz="mtf" data-q="fk05b-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fk05b-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fk05b-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="fk05b-p2">
  <h2>Part II · SOE 2</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Ventile bir hastanın arter basıncı dalgasını inceliyorsunuz. Kateter–transdüser düzeneği dalga biçimini nasıl etkileyebilir? Aynı kaydın frekans spektrumunu nasıl yorumlarsınız?</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>Ölçüm sisteminde diyaframın salınım eğilimini ve kateter sürtünmesinin sönümleyici etkisini tanımlayın. [[K6 s. 89]]</li>
    <li>Yetersiz ve aşırı sönümün kaydı bozabileceğini, dolayısıyla ölçülen basıncın hatalı olabileceğini belirtin. [[K6 s. 89]]</li>
    <li>Arter basıncının periyodik bileşenlerini incelemek için Fourier analizini seçin ve spektrumun eksenlerini frekans ile genlik olarak adlandırın. [[K6 s. 90–91]]</li>
    <li>Dakikada 75 atım için 1,25 Hz’de ana tepeyi, 2,5 ve 3,75 Hz’de giderek küçülen harmonikleri gösterin. [[K6 s. 91]]</li>
    <li>0,15 Hz’deki ayrı tepeyi solunumun basınç üzerindeki etkisiyle ilişkilendirin. [[K6 s. 91]]</li></ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Önce aynı başlangıç konumu için hafif ve ağır sönümün yer değiştirme–zaman eğrilerini çizin. [[K6 s. 88–89]] Yanına arter basıncının frekans spektrumunu çizip kalp, harmonik ve solunum tepelerini işaretleyin. [[K6 s. 91]]</div>
  <div class="note plain"><b>Olası ek sorular</b><ul><li>Dört sinüs bileşeni aort basıncını hangi doğrulukta temsil edebilir?</li><li>Hareketli hedeften yansıyan dalgada neden çift kayma görülür?</li><li>Ameliyat lambasının ışınım akısını bilmek algılanan parlaklığı açıklamaya neden yetmez?</li></ul></div></div>
</section>
<section class="wrap blk ders-sec" id="fk05b-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Basit harmonik harekette ivme dengeye yönelir ve büyüklüğü yer değiştirmeyle orantılıdır. [[K6 s. 86]]</li>
    <li>Doğal frekansla uyumlu itişler salınımı büyütürken sönüm hareketi bastırır. [[K6 s. 87–88]]</li>
    <li>Arter basıncı ölçümünde fazla sönüm de az sönüm de kaydı bozabilir. [[K6 s. 89]]</li>
    <li>Temel ses ile harmoniklerinin genlik dağılımı tınıyı belirler ve Fourier analizi periyodik dalganın frekans bileşenlerini ayırır. [[K6 s. 89–91]]</li>
    <li>Doppler etkisinde algılanan frekans bağıl harekete göre değişir ve hareketli hedeften yansımada iki kayma oluşur. [[K6 s. 91–92]]</li>
    <li>Işınım şiddeti uzaklığın karesiyle ters orantılıdır, görünür parlaklık ayrıca gözün dalga boyuna duyarlılığına bağlıdır. [[K6 s. 93–94]]</li></ul>
  <div data-viz="tamam" data-modul="fizik" data-bolum="05b"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/fizik/05a">← Dalgaların özellikleri, ses ve elektromanyetik dalgalar</a><a href="#/dersler/fizik/06a">Sonraki: Mutlak ve bağıl basınç, manometreler, basınç valfleri ve sifon etkisi →</a></nav>
</section>`,
  };
})();
