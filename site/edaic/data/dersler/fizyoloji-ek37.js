/* Fizyoloji Ek ders (Bölüm 37 ardından) · Venöz dönüş, ortalama sistemik dolum basıncı ve kalp debisiyle ilişkisi
   (K2 = Kam & Power, Principles of Physiology for the Anaesthetist, 3. baskı, İngilizce özgün s. 156–160).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi kaynak sayfa işaretiyle özgün sayfaya bağlıdır. Bileşen tarifleri: docs/tasarim/fizek37.md */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fizek37-1'] = {
  no: 1, kok: 'Ortalama sistemik dolum basıncı (MSFP) için:', kagit: 'Paper A · fizyoloji, Ek ders · Bölüm 37 ardından', kaynak: '[[K2 s. 156–159]]',
  onermeler: [
    { t: 'Kitabın verdiği normal değer yaklaşık 25 mmHg\'dir.', d: false, n: 'Yanlış. Kitap normal MSFP\'yi 7 mmHg (aralık 0–20 mmHg) olarak verir; ortalama pulmoner dolum basıncı 2 mmHg\'dir. [[K2 s. 156]]' },
    { t: 'Kalp deneysel olarak durdurulduktan ve arteriyel ile venöz basınçlar eşitlendikten sonra dolaşımda ölçülen statik basınçtır.', d: true, n: 'Doğru. Kalp durunca kan arterlerden venlere geçer ve basınçlar hızla eşitlenir; bütün damarlarda ölçülen bu ortak basınç MSFP\'dir. [[K2 s. 156]]' },
    { t: 'Toplam periferik direnç artınca yükselir.', d: false, n: 'Yanlış. MSFP kan hacmi ya da venomotor tonus artınca yükselir, venodilatasyon ya da kan kaybıyla düşer; toplam periferik dirençteki değişiklikler MSFP\'yi değiştirmez. [[K2 s. 156]]' },
    { t: 'Kalp durduğunda arteriyel basınçtaki düşüş, venöz basınçtaki yükselişten küçüktür.', d: false, n: 'Yanlış. Venlerin kompliyansı çok yüksek olduğu için arterlerden gelen kan venöz basıncı az yükseltir; arteriyel basınçtaki düşüş çok daha büyüktür. Bu yüzden çalışan dolaşımda MSFP ortalama venöz basınca yakındır. [[K2 s. 156]] [[K1 s. 163]]' },
    { t: 'Kitabın örneğinde kan hacminin %15 azalması MSFP\'yi sıfıra indirir.', d: true, n: 'Doğru. Aynı örnekte kan hacminin %15 artması MSFP\'yi iki katına çıkarır; venöz dönüş bu yüzden kan hacmine bağlıdır. [[K2 s. 159]]' },
  ],
};
VERI.sorular['fizek37-2'] = {
  no: 2, kok: 'Venöz dönüşe yardım eden mekanizmalar için:', kagit: 'Paper A · fizyoloji, Ek ders · Bölüm 37 ardından', kaynak: '[[K2 s. 156–157]]',
  onermeler: [
    { t: 'İnspiryumda plevra içi basınç yaklaşık −5\'ten −8 cmH₂O\'ya düşer.', d: true, n: 'Doğru. Diyaframın inişi de karın içi basıncı yükseltir; ikisi birlikte toraks dışı venlerden sağ atriyuma akımı artırır, ekspiryumda etki tersine döner. [[K2 s. 156]]' },
    { t: 'Sol ventrikül atım hacminin inspiryum ile ekspiryum arasındaki değişimi yaklaşık %25\'tir.', d: false, n: 'Yanlış. Bu değişim yalnızca %5 düzeyindedir. [[K2 s. 157]]' },
    { t: 'İnspiryumda sağ ventrikül atım hacmi artarken sol ventrikül atım hacmi azalır.', d: true, n: 'Doğru. İnspiryumda toraks kan hacmi 250 mL, sağ ventrikül atım hacmi 20 mL artar; pulmoner damarların kapasitesi arttığı için sol ventrikül atım hacmi azalır. [[K2 s. 156–157]]' },
    { t: 'Venomotor tonus artışı venlerin kompliyansını ve kapasitesini azaltarak MSFP\'yi yükseltir.', d: true, n: 'Doğru. Venomotor tonus egzersizde ya da kan kaybında sempatik sistem aracılığıyla refleks olarak artar; venöz basınç normal ve venler dairesel kesitliyken etkisi daha büyüktür. [[K2 s. 157]]' },
    { t: 'Ventrikülün hızlı ejeksiyon evresinde atriyum basıncı yükselir.', d: false, n: 'Yanlış. Ventrikül kasılması AV fibröz halkayı aşağı çeker, atriyum uzar ve hacmi artar; atriyum basıncı sıfıra ya da negatif değerlere düşer ve vena kavalardan, pulmoner venlerden akım artar. [[K2 s. 157]]' },
  ],
};
VERI.sorular['fizek37-3'] = {
  no: 3, kok: 'Guyton\'ın kalp debisi ve venöz dönüş eğrileri için:', kagit: 'Paper A · fizyoloji, Ek ders · Bölüm 37 ardından', kaynak: '[[K2 s. 157–160]]',
  onermeler: [
    { t: 'Sağ atriyum basıncı 0 ile MSFP arasındayken venöz dönüş, MSFP ile sağ atriyum basıncı arasındaki farkla orantılıdır.', d: true, n: 'Doğru. Bu aralıkta venöz dönüş = (MSFP − sağ atriyum basıncı) / venöz dönüşe karşı direnç. [[K2 s. 158]]' },
    { t: 'Sağ atriyum basıncı sıfırın altına düşürüldükçe venöz dönüş doğrusal olarak artmaya devam eder.', d: false, n: 'Yanlış. Toraks dışı venler kollabe olup Starling direnci gibi davranır; venöz dönüş RAP 0\'daki değerin %20 üstünde platoya ulaşır, çünkü toraks dışı venlerin basıncı −4 mmHg\'nin altına inemez. [[K2 s. 158]]' },
    { t: 'Yüksek spinal anestezideki yaygın sempatik blokta kalp işlevi eğrisi sağa, venöz dönüş eğrisi sola kayar.', d: true, n: 'Doğru. Kontraktilite azalır ve kapasitans damarları genişleyip MSFP düşer; kitabın modelinde kalp debisi %40 azalır. [[K2 s. 160]]' },
    { t: 'Venöz dönüşe karşı direncin azalması venöz dönüş eğrisini paralel olarak sağa kaydırır.', d: false, n: 'Yanlış. Paralel kaymayı MSFP değişikliği yapar. Direnç değişikliği eğimi değiştirir: azalan direnç eğriyi saat yönünde döndürüp venöz dönüşü artırır. [[K2 s. 159]]' },
    { t: 'Azami sempatik uyarıda kalp debisindeki artışın büyük bölümü venöz dönüş eğrisinin kaymasından kaynaklanır.', d: true, n: 'Doğru. Azami uyarı RAP\'yi düşürürken debiyi iki katına çıkarabilir; artışın çoğu pompa işlevinden değil, kapasitans damarlarının daralmasıyla venöz dönüş eğrisinin kaymasından gelir. [[K2 s. 160]]' },
  ],
};

const DEK37_NAV = [
  ['dek37-msfp', 'Dolum basıncı'], ['dek37-pompa', 'Yardımcı pompalar'], ['dek37-egri', 'İki eğri'],
  ['dek37-denge', 'Denge noktası'], ['dek37-p1', 'Part I'], ['dek37-p2', 'Part II'], ['dek37-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/ek37'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Ek ders · Bölüm 37 ardından', baslik: 'Venöz dönüş, ortalama sistemik dolum basıncı ve kalp debisiyle ilişkisi',
  lede: 'Kalp ancak kendisine dönen kanı pompalayabilir. Venöz dönüşü ne belirler ve Guyton\'ın iki eğrisi kalp debisini birlikte nasıl belirler? [[K2 s. 156–160]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${DEK37_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="dek37-msfp">
  <h2>Ortalama sistemik dolum basıncı: kanı kalbe iten basınç</h2>
  <p class="intro">Venöz dönüşün hızını başlıca, ortalama sistemik dolum basıncı (mean systemic filling pressure, MSFP) ile sağ atriyum basıncı (RAP) arasındaki gradyan belirler. [[K2 s. 156]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Kalbi durdurun: basınçlar MSFP'de eşitlenir</h3></div>
    <div data-viz="fek37_msfp"></div>
    <p class="viz-cap" aria-live="polite">"Kalbi durdur"a basın; sonra kan hacmini, venomotor tonusu ve periferik direnci değiştirip MSFP'yi ve venöz dönüş gradyanını izleyin. [[K2 s. 156]]</p>
    <p class="viz-foot">Şematik iki bölmeli model: venöz kompliyans arteriyelin 30 katı [[K1 s. 163]]; modelde çalışırken ortalama arter basıncı 93, ortalama ven basıncı 4,1 mmHg (ağırlıklı ortalama 7 mmHg), RAP 1 mmHg. Kan hacmi ile MSFP arasındaki ilişki kitabın iki ucundan (%−15 → 0, %+15 → 14 mmHg) doğrusal çizilir; azami venokonstriksiyonda MSFP 17 mmHg'dir, venodilatasyonun büyüklüğü şematiktir. [[K2 s. 156, 159]]</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>Guyton'ın tanımladığı MSFP, damarlardaki basınçların kompliyanslarına göre ağırlıklandırılmış ortalamasıdır: dolaşımın ne kadar dolu olduğunu tek bir basınçla verir. Kalp durdurulunca kan kompliyansı düşük arterlerden kompliyansı yüksek venlere geçer; arter basıncı, ven basıncının yükseldiğinden çok daha fazla düşer ve eşitlenen statik basınç MSFP'dir. Bu yüzden çalışan dolaşımda MSFP ortalama venöz basınca yakındır. [[K2 s. 156]]</p>
    <p>Normal MSFP 7 mmHg (0–20 mmHg), ortalama pulmoner dolum basıncı 2 mmHg'dir. RAP 1 mmHg iken venöz dönüşü sağlayan gradyan 7 − 1 = 6 mmHg'dir. MSFP kan hacmi ya da venomotor tonus artınca yükselir, venodilatasyon ya da kan kaybıyla düşer; toplam periferik direnç onu değiştirmez. [[K2 s. 156]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> 7 mmHg, Guyton'ın hayvan deneylerinden gelen klasik değerdir. İnsanlarda (kalp durması sırasında ya da yoğun bakımda) ölçülen MSFP çoğunlukla bundan yüksek bulunur.</div>
</section>

<section class="wrap blk ders-sec" id="dek37-pompa">
  <h2>Venöz dönüşe yardım eden etkenler</h2>
  <p class="intro">Basınç gradyanının yanında beş etken daha venöz dönüşü belirler: venöz kapakçıklar, iskelet kası pompası, solunum pompası, ventrikülün kasılıp gevşemesi ve venomotor tonus. [[K2 s. 156]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Venöz dönüşün yardımcıları</h3></div>
    <div data-viz="fek37_pompa"></div>
    <p class="viz-cap" aria-live="polite">Bir mekanizma seçin ve döngüyü izleyin: kan hangi anda, neden kalbe doğru itiliyor? [[K2 s. 156–157]]</p>
    <p class="viz-foot">Şematik çizim; atriyum basıncı göstergesindeki değerler örnektir, öbür sayılar kitaptandır. [[K2 s. 156–157]]</p>
  </div>

  <div class="tbl-wrap" style="margin:14px 0 0">
    <table class="tbl">
      <thead><tr><th>Etken</th><th>Nasıl çalışır?</th></tr></thead>
      <tbody>
        <tr><th>Kapakçıklar ve iskelet kası pompası</th><td>Uzuv venlerindeki tek yönlü kapakçıklar geri akımı önler. Kas kasılınca venleri sıkıp kanı kalbe doğru iter, gevşeyince venler yeniden dolar. Ayakta bacağın ritmik kasılması venöz basıncı ve hacmi azaltır; egzersizde venöz dönüş artar. [[K2 s. 156]]</td></tr>
        <tr><th>Solunum pompası</th><td>İnspiryumda plevra içi basınç −5'ten −8 cmH₂O'ya düşer, diyafram inişi karın içi basıncı yükseltir: toraks dışı venlerden sağ atriyuma akım artar, ekspiryumda tersi olur. Toraks kan hacmi 250 mL, sağ ventrikül atım hacmi 20 mL artar; pulmoner damarların kapasitesi arttığı için sol ventrikül atım hacmi azalır (fark yalnız ≈ %5). Etki egzersizde büyür ama göğse giren venlerin kollabe olmasıyla sınırlanır. [[K2 s. 156–157]]</td></tr>
        <tr><th>Ventrikülün kasılması ve gevşemesi</th><td>Hızlı ejeksiyonda AV fibröz halka aşağı çekilir; atriyum uzayıp genişler, basıncı sıfıra ya da altına düşer ve vena kavalarla pulmoner venlerden akım artar. Erken diyastolde ventrikül hızla dolar, iki basınç da düşer (v dalgasının inişi); bu da atriyuma akışı kolaylaştırabilir. [[K2 s. 157]]</td></tr>
        <tr><th>Venomotor tonus</th><td>Artışı venlerin kompliyansını ve kapasitesini azaltıp MSFP'yi yükseltir; egzersizde ya da kan kaybında sempatik sistemle refleks olarak artar. Venöz basınç normal ve venler çok kan taşıyan dairesel kesitteyken etkisi daha büyüktür. [[K2 s. 157]]</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek37-egri">
  <h2>İki eğri: kalp debisi eğrisi ve venöz dönüş eğrisi</h2>
  <p class="intro">Kalbi kontrol eden otonom sinir sistemidir, ama kalp debisini çoğu zaman dolaşımdan kalbe dönen kan, yani venöz dönüş sınırlar. [[K2 s. 157]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Guyton'ın deneyleri: iki eğriyi çizin</h3></div>
    <div data-viz="fek37_egri"></div>
    <p class="viz-cap" aria-live="polite">Bir görünüm seçin ve sağ atriyum basıncını kaydırın: kalp debisi eğrisinde debiyi, baypas düzeneğinde venöz dönüşü okuyun. [[K2 s. 157–159]]</p>
    <p class="viz-foot">Şematik eğriler. Çapalar: RAP 0'da 5 L/dk; normal plato RAP 4 mmHg'de 10–15 L/dk (modelde 13), azami sempatik plato 20–30 L/dk (modelde 25); venöz dönüş platosu RAP 0 değerinin %20 üstü, −4 mmHg'de. Sıfır sempatik eğrinin yeri ve geçiş bölgesinin biçimi şematiktir. [[K2 s. 157–159]]</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p><b>Kalp debisi eğrisi</b> Frank–Starling mekanizmasını gösterir; Guyton onu sağ atriyumu kanüle edip bağlı rezervuarın yüksekliğini değiştirerek çizdi. Yükselen kol çok diktir: RAP'deki küçük değişiklik debiyi çok değiştirir. Normal istirahat sempatik tonusunda RAP 0'da debi 5 L/dk'dır, RAP 4 mmHg'de 10–15 L/dk'lık platoya ulaşır. Plato kalbin azami pompalama kapasitesidir; egzersizdeki gibi sempatik uyarıyla 20–30 L/dk'ya çıkar. Bu büyük rezerv yüzünden kalp, debisini Frank–Starling mekanizmasıyla venöz dönüşe uydurur; debiyi venöz dönüşü düzenleyen periferik etkenler belirler. [[K2 s. 157–158]]</p>
    <p><b>Venöz dönüş eğrisi</b> sağ kalp baypas düzeneğiyle çizilir: pompa sağ ventrikülün yerini alır, kanı kollabe olabilen bir tüpten −10 ile −20 mmHg emişle alıp pulmoner artere verir; RAP tüpün yüksekliğiyle ayarlanır. RAP 7 mmHg'ye çıkarılınca venöz dönüş sıfırlanır, dolaşım durur ve kan kompliyansı yüksek kapasitans venlerinde toplanıp bütün damarlarda basınç eşitlenir. Bu basınç MSFP'dir; kan hacmi ve venöz kapasitans belirler. [[K2 s. 158]]</p>
    <p>RAP 0 ile MSFP arasında eğri doğrudur (insanda RAP 0'da ≈ 5 L/dk): <b>venöz dönüş = (MSFP − RAP) / venöz dönüşe karşı direnç</b>; bu direnç venöz dolaşımın direncini ve kapasitansını yansıtır. RAP sıfırın altında toraks dışı venler kollabe olup Starling direnci gibi davranır, basınçları −4 mmHg'nin altına inemez. Eğri RAP 0 değerinin %20 üstünde platoya ulaşır; bu yüzden yalnız RAP'yi düşüren bir pompa, venöz dönüş artmadıkça debiyi pek artıramaz. [[K2 s. 158]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek37-denge">
  <h2>Eğrileri kaydırmak: denge noktası ve klinik durumlar</h2>
  <p class="intro">Venöz dönüş ile kalp debisi birkaç atımdan uzun süre farklı kalamaz; iki eğrinin kesiştiği yer dolaşımın denge noktasıdır. [[K2 s. 159]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Guyton diyagramı: denge noktasını kaydırın</h3></div>
    <div data-viz="fek37_denge"></div>
    <p class="viz-cap" aria-live="polite">Hazır bir durum seçin ya da kan hacmini, venomotor tonusu, venöz dönüşe karşı direnci ve kalp işlevini değiştirin; denge noktasındaki RAP ve kalp debisini okuyun. [[K2 s. 159–160]]</p>
    <p class="viz-foot">Şematik model. Kitap çapaları: normal kesişme RAP 0, 5 L/dk; kan hacmi %±15 → MSFP 14 / 0 mmHg; azami sempatik MSFP ≈ 17 mmHg; ½R ve 2R; yüksek spinalde debi %40 azalır; azami sempatik uyarıda debi ≈ iki katı [[K2 s. 159–160]]. Azami sempatik durumda direnç %20 yüksek, yüksek spinalde MSFP 5 mmHg, hipovolemi + sempatikte kan kaybı %15 alınmıştır; bunlar modelin varsayımıdır.</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p><b>MSFP değişince</b> venöz dönüş eğrisi paralel kayar: artış sağa (aynı RAP'de daha çok dönüş), azalma sola. Kitabın örneğinde kan hacminin %15 artması MSFP'yi iki katına çıkarır, %15 azalması sıfıra indirir; venöz dönüş bu yüzden kan hacmine bağlıdır. Sempatik tonus kapasitans damarları üzerinden MSFP'yi değiştirir: azami deşarj onu ≈ 17 mmHg'ye çıkarır; hipovolemide bu kompansasyon önemlidir. [[K2 s. 159]]</p>
    <p><b>Venöz dönüşe karşı direnç değişince</b> eğim değişir, MSFP noktası yerinde kalır: direnç azalınca eğri saat yönünde döner ve venöz dönüş artar, artınca tersine döner. Bunlar otoregülatör vazokonstriksiyon ya da vazodilatasyonla periferik direncin değişmesinden doğar; egzersizde kas metabolitlerinin yaptığı vazodilatasyon direnci düşürür. [[K2 s. 159]]</p>
    <p>Normal eğriler RAP 0 ve 5 L/dk'da kesişir; debi ya da venöz dönüş değişince denge noktası ve RAP da değişir. Yüksek spinal anestezideki yaygın sempatik blokta kontraktilite azalır (kalp eğrisi sağa kayar), kapasitans damarları genişler (MSFP düşer, venöz dönüş eğrisi sola kayar) ve debi %40 azalır. Sempatik uyarıda ise kalp işlevi artar, venokonstriksiyon MSFP'yi yükseltir: yeni denge daha düşük RAP'de daha yüksek debidir. Azami uyarı debiyi iki katına çıkarabilir; artışın çoğu pompadan değil, venöz dönüş eğrisinin kaymasından gelir. [[K2 s. 160]]</p>
  </div>
  <div class="card clin" style="margin-top:14px">
    <span class="tag clin">Klinik önem</span>
    <p style="margin-top:8px">Kalp debisi, otonom sistemin değiştirdiği kalp hızı ve atım hacmiyle ve venöz dönüşü etkileyen periferik dolaşım değişiklikleriyle düzenlenir; dolaşım bozukluklarını bu çerçeveyle çözümleyebilirsiniz. [[K2 s. 160]] K1'e göre kanama ve santral nöroaksiyel blok venöz basıncı düşürerek, pozitif basınçlı ventilasyon ve PEEP toraks içi basıncı artırarak venöz dönüşü azaltır. [[K1 s. 164]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek37-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu ek dersin MTF'de en çok sorulan noktaları: MSFP'nin tanımı, normal değeri (7 mmHg) ve onu değiştiren ya da değiştirmeyen etkenler (toplam periferik direnç), venöz dönüş gradyanı, solunum pompasının sayıları, ventrikül kasılmasının atriyum basıncına etkisi, kalp debisi eğrisinin platoları, venöz dönüş denklemi ve RAP sıfırın altındaki plato, MSFP'nin paralel kaydırması ile direncin eğimi döndürmesi, yüksek spinal anestezi ve azami sempatik uyarıda denge noktası. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fizek37-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fizek37-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fizek37-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="dek37-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Kalbe venöz dönüşü ne belirler? Ortalama sistemik dolum basıncını tanımlayın ve Guyton eğrileriyle yüksek spinal anestezinin kalp debisine etkisini açıklayın."</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>İlkeyle başlayın.</b> Kalp yalnız kendisine dönen kanı pompalar; debisini Frank–Starling mekanizmasıyla venöz dönüşe uydurur, bu yüzden debiyi çoğu zaman periferik dolaşım belirler. [[K2 s. 157–158]]</li>
    <li><b>Belirleyicileri sayın.</b> Venöz dönüş gradyanı (MSFP − RAP), venöz kapakçıklar, iskelet kası pompası, solunum pompası (inspiryumda plevra içi basınç −5 → −8 cmH₂O), ventrikülün kasılıp gevşemesi, venomotor tonus. [[K2 s. 156–157]]</li>
    <li><b>MSFP'yi tanımlayın.</b> Kompliyansla ağırlıklandırılmış ortalama damar basıncı; kalp durunca eşitlenen statik basınç; normal 7 mmHg (0–20). Kan hacmi ve venomotor tonusla yükselir, venodilatasyon ve kan kaybıyla düşer, toplam periferik dirençten etkilenmez. Örnek: MSFP 7, RAP 1 → gradyan 6 mmHg. [[K2 s. 156]]</li>
    <li><b>Kalp debisi eğrisini çizin.</b> Dik yükselen kol, RAP 0'da 5 L/dk; RAP 4 mmHg'de 10–15 L/dk plato; sempatik uyarıyla 20–30 L/dk. [[K2 s. 157]]</li>
    <li><b>Venöz dönüş eğrisini çizin.</b> Sağ kalp baypas deneyi; RAP = MSFP'de akım sıfır; 0 ile MSFP arasında VR = (MSFP − RAP) / direnç; RAP sıfırın altında venlerin kollabe olmasıyla RAP 0 değerinin %20 üstünde plato (ven basıncı −4 mmHg'nin altına inemez). MSFP eğriyi paralel kaydırır (kan hacmi %±15 → MSFP iki kat / sıfır), direnç eğimi döndürür. [[K2 s. 158–159]]</li>
    <li><b>Denge noktasını kullanın.</b> Normal kesişme RAP 0, 5 L/dk. Yüksek spinal: kontraktilite azalır (kalp eğrisi sağa), kapasitans venleri genişler (MSFP düşer, VR eğrisi sola); debi %40 azalır. [[K2 s. 160]]</li>
    <li><b>Karşıtlıkla bitirin.</b> Sempatik uyarı, venokonstriksiyonla MSFP'yi ≈ 17 mmHg'ye yükseltir; azami uyarı RAP düşerken debiyi iki katına çıkarabilir ve bunun çoğu venöz dönüş eğrisinin kaymasındandır. K1'e göre venöz basınç, kan hacmi artırılarak ya da sempatik etkinlikle venöz tonus yükseltilerek artar. [[K2 s. 159–160]] [[K1 s. 164]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada en verimli çizim Guyton diyagramıdır: yatay eksen RAP (−4 ile 12 mmHg), dikey eksen kalp debisi ya da venöz dönüş (0–15 L/dk). Sigmoid kalp debisi eğrisini (RAP 0'da 5, platosu 13 L/dk) ve 7 mmHg'de yatay ekseni kesen, solda platoya dönen venöz dönüş eğrisini çizip kesişmeyi "denge noktası" diye işaretleyin. Sonra yüksek spinal için alçalmış kalp eğrisini ve sola kaymış venöz dönüş eğrisini ekleyip yeni, daha düşük kesişmeyi gösterin.</div>
    <div class="note plain"><b>Olası ek sorular.</b> MSFP neden ortalama arter basıncına değil ortalama venöz basınca yakındır? Toplam periferik direnç MSFP'yi neden değiştirmez? RAP sıfırın altına inince venöz dönüş neden artmaz? Kalbin pompa gücünü artırmak tek başına debiyi neden pek yükseltmez? Kan hacmi ile direnç değişikliklerinin venöz dönüş eğrisine etkisi nasıl ayrılır? Sempatik uyarıda debi artışı nereden gelir? İnspiryumda sağ ve sol ventrikül atım hacimleri neden ters yönde değişir? Cevapların hepsi yukarıdaki bölümlerde. [[K2 s. 156–160]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek37-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Venöz dönüşü başlıca MSFP ile sağ atriyum basıncı arasındaki gradyan belirler; kapakçıklar, iskelet kası ve solunum pompaları, ventrikülün kasılıp gevşemesi ve venomotor tonus ona yardım eder. [[K2 s. 156]]</li>
    <li>MSFP kompliyansla ağırlıklandırılmış ortalama damar basıncıdır, kalp durunca ölçülen statik basınçtır; normali 7 mmHg (0–20), pulmoner karşılığı 2 mmHg'dir. Kan hacmi ve venomotor tonus onu yükseltir, venodilatasyon ve kan kaybı düşürür, toplam periferik direnç değiştirmez. [[K2 s. 156]]</li>
    <li>İnspiryumda plevra içi basınç −5'ten −8 cmH₂O'ya düşer; toraks kan hacmi 250 mL, sağ ventrikül atım hacmi 20 mL artar, sol ventrikül atım hacmi azalır (≈ %5). Hızlı ejeksiyonda atriyum basıncı sıfıra ya da altına iner. [[K2 s. 156–157]]</li>
    <li>Kalp debisi eğrisi dik yükselir: RAP 0'da 5 L/dk, RAP 4 mmHg'de 10–15 L/dk plato, sempatik uyarıyla 20–30 L/dk. Bu rezerv yüzünden debiyi çoğu zaman venöz dönüş sınırlar. [[K2 s. 157–158]]</li>
    <li>Venöz dönüş = (MSFP − RAP) / venöz dönüşe karşı direnç (RAP 0 ile MSFP arasında); RAP = MSFP'de akım durur. RAP sıfırın altında venler kollabe olur ve dönüş RAP 0 değerinin %20 üstünde platoya ulaşır (ven basıncı −4 mmHg'nin altına inmez). [[K2 s. 158]]</li>
    <li>MSFP eğriyi paralel kaydırır (kan hacmi %+15 → iki kat, %−15 → sıfır; azami sempatik ≈ 17 mmHg); direnç eğimi döndürür (azalınca saat yönünde, dönüş artar). [[K2 s. 159]]</li>
    <li>Denge noktası iki eğrinin kesişmesidir (normal RAP 0, 5 L/dk). Yüksek spinalde kalp eğrisi sağa, venöz dönüş eğrisi sola kayar, debi %40 azalır; azami sempatik uyarı debiyi daha düşük RAP'de iki katına çıkarabilir, çoğunlukla venöz dönüş eğrisinin kaymasıyla. [[K2 s. 160]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="ek37"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/37">← Bölüm 37 · Venöz sistem</a>
    <a href="#/dersler/fizyoloji/38">Sonraki: Bölüm 38 · Venöz basınç dalga biçimleri →</a>
  </nav>
</section>`,
};
