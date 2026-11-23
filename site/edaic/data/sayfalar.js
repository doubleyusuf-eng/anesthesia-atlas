/* Sayfa metinleri (Türkçe). [[S6 s. 7]] = kaynak işareti (data/kaynaklar.js); <div data-viz="ad"></div> = etkileşimli bileşen (js/viz.js).
   Sınav bilgileri ESAIC'in herkese açık belgelerinden özetlenmiştir; erişim tarihi 21 Kasım 2026. */
window.GRUPLAR = {
  sinav: { ad: 'Sınavlar', sekmeler: [['genel', 'Genel bakış'], ['part1', 'Part I'], ['part2', 'Part II'], ['ola', 'Deneme sınavları']] },
  hazirlik: { ad: 'Hazırlık', sekmeler: [['bilgi', 'Beklenen bilgi'], ['part1', 'Part I stratejisi'], ['part2', 'Part II stratejisi'], ['gun', 'Sınav günü'], ['araclar', 'Araçlar ve okuma'], ['liste', 'Hazırlık listem']] },
};

window.SAYFALAR = {};

/* ================= GİRİŞ ================= */
SAYFALAR['giris'] = {
  baslik: 'EDAIC’e Hazırlık Atlası',
  html: `
<section class="wrap hero">
  <div>
    <p class="eyebrow" lang="en">European Diploma in Anaesthesiology and Intensive Care</p>
    <h1>EDAIC’e Hazırlık Atlası</h1>
    <p class="lede">EDAIC, uzman anesteziyoloğun bilmesi gereken temel bilimleri ve klinik konuları kapsayan, çok dilli, iki aşamalı bir eğitim sonu sınavıdır. Part I yazılı, Part II sözlüdür. [[S6 s. 3]] Bu atlas iki sınavı tanıtır, ESAIC'in resmi hazırlık rehberine göre nasıl çalışılacağını anlatır ve sınav konularını animasyonlu derslerle işler.</p>
    <ul class="facts">
      <li><b>Part I</b> · 2 × 60 MTF</li>
      <li><b>Part II</b> · 4 sözlü (SOE)</li>
      <li><b>TR</b> · Türkçe sınav dili</li>
      <li><b>Türkiye</b> · resmi tanınma</li>
    </ul>
  </div>
  <div class="viz">
    <div class="viz-head"><h3>Tıp diplomasından EDAIC'e</h3><button class="btn ghost play" data-yol-play>Duraklat</button></div>
    <div data-viz="yol"></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Atlasın bölümleri</h2>
  <ol class="steps" style="margin-top:16px">
    <li><a href="#/sinav/genel"><span class="n">01</span><b>Sınavlar</b><span>Part I ve Part II nasıl yapılır, nasıl puanlanır; kimler girebilir, Türkiye'den adaylar için neler geçerli, deneme sınavları.</span></a></li>
    <li><a href="#/hazirlik/bilgi"><span class="n">02</span><b>Hazırlık</b><span>ESAIC'in "How to prepare for the EDAIC" rehberine göre: beklenen bilgi, iki sınavın stratejisi, sınav günü, araçlar.</span></a></li>
    <li><a href="#/dersler"><span class="n">03</span><b>Dersler</b><span>Sınav konuları, bir kaynak kitabın bölümleri sırasıyla ve animasyonlarla. İlk modül fizyoloji.</span></a></li>
    <li><a href="#/kaynaklar"><span class="n">04</span><b>Kaynaklar</b><span>Her bilginin dayandığı resmi ESAIC belgesi, sayfa numarasıyla.</span></a></li>
  </ol>
</section>

<section class="wrap blk">
  <h2>Yaklaşan tarihler</h2>
  <p class="intro">ESAIC sayfalarında 21 Kasım 2026'da yazan tarihler. Başvurmadan önce güncel sayfayı kontrol edin.</p>
  <div class="news">
    <div class="card gold"><span class="when">Kayıt 21 Aralık 2026'da kapanıyor</span><h3>Part II 2027 kayıtları açık</h3><p class="small">Türkiye'deki yüz yüze merkezler: Ankara 19–21 Mart, İzmir 2–4 Temmuz, İstanbul 9–10 Ekim 2027. 15 Aralık'ta Türkçe için sınırlı sayıda ek yer açılacak. [[S3]]</p></div>
    <div class="card gold"><span class="when">22 Nisan–4 Mayıs 2027</span><h3>HOLA (evden deneme sınavı)</h3><p class="small">Bireysel kayıt 6 Ocak 2027'de açılır, 10 Mart 2027'de kapanır. Part I ile aynı yapı ve puanlama. [[S4]]</p></div>
    <div class="card gold"><span class="when">11 Eylül 2027, Cumartesi</span><h3>Part I 2027</h3><p class="small">Kayıt dönemi henüz duyurulmadı; 2026'da kayıt 11 Haziran'da kapanmıştı. [[S2]]</p></div>
  </div>
</section>

<section class="wrap blk">
  <div class="note plain"><b>Bağımsız eğitim kaynağı.</b> Bu atlas ESAIC ile bağlantılı değildir; ESAIC tarafından düzenlenmemiş ya da onaylanmamıştır. Sınav bilgileri ESAIC'in herkese açık belgelerinden Türkçe özetlenmiştir. Kesin bilgi için her zaman ESAIC'in güncel belgesi geçerlidir. Atlasta gerçek sınav sorusu yayımlanmaz.</div>
</section>`,
};

/* ================= SINAVLAR · GENEL ================= */
SAYFALAR['sinav/genel'] = {
  grup: 'sinav', eyebrow: 'Sınavlar', baslik: 'EDAIC\'e genel bakış',
  lede: 'Avrupa genelinde anesteziyologlar için ortak ve yüksek bir bilgi standardı hedefleyen, bağımsız bir sınav kurulunca yapılan iki aşamalı sınav. EDAIC bilgiyi ölçer; beceri ya da tutumları ölçmez. [[S6 s. 3]] [[S7 s. 3]]',
  html: `
<section class="wrap blk">
  <div class="cols">
    <div class="card"><h3>Kim düzenler?</h3><p>Sınavı ESAIC (European Society of Anaesthesiology and Intensive Care) düzenler. EDAIC, UEMS'in Avrupa Anesteziyoloji Kurulu (EBA) tarafından CESMA aracılığıyla onaylanmıştır. Bütün sorular UEMS'in Avrupa anesteziyoloji eğitim gereksinimlerindeki alanlara göre yazılır. [[S1]]</p></div>
    <div class="card"><h3>Neden girilir?</h3><p>Diploma, adayın bağımsız bir sınav kurulunca kuramsal eğitimini tamamlamış bir anesteziyolog olarak değerlendirildiğini gösterir. Rehber bunun eğitim programlarına, terfi değerlendirmesine, başka ülkeden gelen hekimin değerlendirilmesine ve kadro başvurularına katkısını sayar. Bazı ülkelerde sınav zorunludur ya da resmi olarak tanınır. [[S7 s. 3–4]] [[S1]]</p></div>
  </div>
</section>

<section class="wrap blk">
  <h2>İki sınav yan yana</h2>
  <div class="tbl-wrap" style="margin-top:14px"><table class="tbl">
    <thead><tr><th></th><th>Part I</th><th>Part II</th></tr></thead>
    <tbody>
      <tr><th>Biçim</th><td>Yazılı. İki kâğıt (Paper A ve Paper B), her birinde 60 çoklu doğru/yanlış (MTF) sorusu. [[S2]] [[S6 s. 3]]</td><td>Sözlü. Tek günde dört yapılandırılmış sözlü sınav (SOE), her biri 25 dakika, her birinde iki sınavcı. [[S6 s. 4]]</td></tr>
      <tr><th>İçerik</th><td>Paper A temel bilimler; Paper B klinik anestezi ve yoğun bakım. [[S6 s. 3]]</td><td>Sabah iki temel bilim, öğleden sonra iki klinik SOE; Part I ile aynı konu yelpazesi. [[S6 s. 7]] [[S7 s. 6]]</td></tr>
      <tr><th>Ne zaman?</th><td>Yılda bir kez Eylül'de, birçok merkezde aynı anda. Sonraki: 11 Eylül 2027. [[S2]]</td><td>Şubat–Aralık arasında farklı merkezlerde ve çevrim içi. [[S3]]</td></tr>
      <tr><th>Kimler girer?</th><td>Tıp fakültesi mezunları, eğitimin herhangi bir aşamasında. [[S7 s. 8]] [[S6 s. 3]]</td><td>Part I'i geçmiş uzmanlar ya da DSÖ Avrupa Bölgesi'ne üye bir ülkede veya Brezilya'da eğitiminin son yılındaki asistanlar. [[S7 s. 8]]</td></tr>
      <tr><th>Puanlama</th><td>Her doğru cevap +1; yanlış ya da boş 0. Kâğıt başına 300 puan. İki kâğıt ayrı ayrı geçilmelidir. [[S4]] [[S6 s. 7]]</td><td>Her konu için her sınavcı 0, 1 ya da 2 verir; toplam 80 puan. Üç eşik birlikte aşılmalıdır. [[S6 s. 8]]</td></tr>
      <tr><th>Dil</th><td>11 dil, Türkçe dahil; seçilen dilin yanında İngilizce metin de verilir. [[S2]]</td><td>10 dil seçeneği, Türkçe dahil (talep yeterliyse; dil başına yer sınırlı). [[S3]]</td></tr>
      <tr><th>Sonuç</th><td>Kâğıt ve konu alanı bazında performans gösteren aday raporu. [[S6 s. 7]]</td><td>Aynı gün, sınavcıların değerlendirme toplantısından (call-over) sonra; sonuç kesindir. [[S3]] [[S10 s. 2]]</td></tr>
    </tbody>
  </table></div>
</section>

<section class="wrap blk">
  <h2>Yıllık döngü</h2>
  <p class="intro">Bir yıl içinde kayıtlar ve sınavlar. Tarihler 2026–2027 döngüsünden; ayın üzerindeki etikete basınca ayrıntı açılır.</p>
  <div class="viz"><div data-viz="takvim"></div></div>
</section>

<section class="wrap blk">
  <h2>Türkiye'den adaylar için</h2>
  <div class="cols" style="margin-top:14px">
    <div class="card gold"><h3>Resmi tanınma ve ücret</h3><p>Türkiye, Part I'in zorunlu olduğu ya da resmi olarak tanındığı ülkeler arasındadır. Türkiye'de ulusal tabip siciline kayıtlı adaylar indirimli Part I ücreti öder. Part II de Türkiye'de resmi olarak tanınır, bu nedenle Part II ücreti de indirimlidir. Bu ücretler ESAIC üyesi olan ve olmayanlar için aynıdır. [[S1]]</p></div>
    <div class="card gold"><h3>Sınav dili</h3><p>Part I, Part II ve OLA/HOLA Türkçe yapılabilir. Part I'de Türkçe metnin yanında İngilizce asıl metin de verilir. Part II'de her dilin yer sayısı sınırlıdır; kayıtta Türkçe için ayrıca ek yer dönemi tanımlanmıştır. [[S2]] [[S3]] [[S4]]</p></div>
    <div class="card gold"><h3>Merkezler</h3><p>Part I merkez listesinde Ankara (bilgisayarla), İstanbul, İzmir ve Mersin var. 2027 Part II yüz yüze merkezleri: Ankara, İzmir ve İstanbul. Ankara ve İzmir'de aday merkezde bulunur, sınavcılar Zoom ile bağlanır. [[S2]] [[S3]]</p></div>
    <div class="card gold"><h3>Uzmanlık belgesi</h3><p>ESAIC'in ülke listesinde Türkiye için "Sağlık Bakanlığı, Uzmanlık Belgesi, Anesteziyoloji ve Reanimasyon" ile "Üniversite Diploması, Tıp Fakültesi, Anesteziyoloji ve Reanimasyon" Part II'ye uygun belgeler sütunundadır. Türkiye, kaydın ulusal bir kurum üzerinden yapılması gereken ülkeler arasında sayılmaz; kayıt myESAIC üzerinden bireysel yapılır. [[S11]] [[S2]]</p></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Ücretler</h2>
  <p class="intro">ESAIC ana sayfasındaki ücret tablosu (21 Kasım 2026'da). Ücretler değişebilir; ödeme kayıt sırasında yapılır.</p>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Ülke grubu</th><th>Part I</th><th>Part II</th><th>OLA/HOLA</th></tr></thead>
    <tbody>
      <tr><th>Zorunlu sınav / resmi tanınma ülkeleri¹ (üye ve üye olmayan)</th><td class="num">180 €</td><td class="num">300 €</td><td class="num">50 €²</td></tr>
      <tr><th>Avrupa orta gelirli ülkeleri · ESAIC üyesi³</th><td class="num">290 €</td><td class="num">450 €</td><td class="num">60 €</td></tr>
      <tr><th>Avrupa orta gelirli ülkeleri · üye olmayan</th><td class="num">360 €</td><td class="num">510 €</td><td class="num">60 €</td></tr>
      <tr><th>Diğer ülkeler · ESAIC üyesi³</th><td class="num">380 €</td><td class="num">600 €</td><td class="num">70 €</td></tr>
      <tr><th>Diğer ülkeler · üye olmayan</th><td class="num">450 €</td><td class="num">660 €</td><td class="num">70 €</td></tr>
    </tbody>
  </table></div>
  <p class="small muted" style="margin-top:10px">¹ Part I için Avusturya, Belçika, Mısır, Finlandiya, Endonezya, Macaristan, Malta, Polonya, Portekiz, Romanya, İsviçre, Hollanda ve Türkiye; Part II için Malta (zorunlu) ve Türkiye (resmi tanınma). İndirim, o ülkenin ulusal tabip siciline kayıtlı adaylar içindir. ² OLA'nın zorunlu olduğu ülkeler: Moldova, Slovenya, Belçika (Fransızca konuşulan). ³ Active, Affiliate, Trainee ya da Allied üyelik. [[S1]]</p>
</section>

<section class="wrap blk">
  <h2>Önerilen zamanlama, muafiyetler, diploma</h2>
  <div class="cols cols-3" style="margin-top:14px">
    <div class="card"><h3>Ne zaman girmeli?</h3><p>Sınav Komitesi başarı şansını artırmak için Part I'e uzmanlık eğitiminin 3. yılından, Part II'ye 5. yılından sonra kaydolmayı önerir. [[S7 s. 9]]</p></div>
    <div class="card"><h3>Karşılıklı tanınma</h3><p>FRCA, FCAI/FCARCSI ve Brezilya TSA sahipleri Part I'den muaftır. EDAIC sahipleri de Royal College of Anaesthetists ve College of Anaesthetists of Ireland Primary sınavlarından ve TSA'dan muafiyet alabilir; ek koşulları ilgili kurumdan öğrenin. [[S7 s. 4]] [[S7 s. 9]]</p></div>
    <div class="card"><h3>Diploma</h3><p>Diploma dijitaldir: blok zinciri ile doğrulanan, ömür boyu paylaşılabilen bir bağlantı ve QR kodlu PDF. Diplomalılar DESAIC unvanını kullanır. [[S1]] [[S7 s. 6]]</p></div>
  </div>
</section>`,
};

/* ================= SINAVLAR · PART I ================= */
SAYFALAR['sinav/part1'] = {
  grup: 'sinav', eyebrow: 'Sınavlar · Part I', baslik: 'Part I · yazılı sınav',
  lede: 'İki kâğıt, her birinde 60 soru. Her soru bir kök ve onu izleyen beş doğru/yanlış önermeden oluşur. Her doğru cevap bir puandır; yanlış ya da boş cevap puan götürmez. [[S6 s. 6]]',
  html: `
<section class="wrap blk">
  <h2>Sınav günü</h2>
  <p class="intro">Avrupa'da Paper A sabah, Paper B öğleden sonra yapılır; diğer bölgelerde saatler uyarlanır. İki kâğıt arasında 90 dakika ara vardır. Kâğıt üzerinde her kâğıt 120 dakika, bilgisayarda 90 dakika sürer. [[S6 s. 3]] [[S6 s. 6]]</p>
  <div class="viz"><div data-viz="gun1"></div></div>
</section>

<section class="wrap blk">
  <h2>İki kâğıdın kapsamı</h2>
  <div class="cols" style="margin-top:14px">
    <div class="card basic"><span class="tag basic">Paper A</span><h3>Temel bilimler</h3><p>Anestezi ve yoğun bakımla ilgili bütün temel bilimler: anatomi, farmakoloji, fizyoloji ve biyokimya, fizik ve ölçüm ilkeleri, istatistik. [[S6 s. 3–4]]</p><p><a href="#/hazirlik/bilgi">Konuların ayrıntısı →</a></p></div>
    <div class="card clin"><span class="tag clin">Paper B</span><h3>Klinik anestezi ve yoğun bakım</h3><p>Dahiliye ve acil tıp, genel anestezi, rejyonel anestezi, ağrı dahil özel anestezi ve yoğun bakım. [[S6 s. 6]] [[S7 s. 4]]</p><p><a href="#/hazirlik/bilgi">Konuların ayrıntısı →</a></p></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Soru biçimi: çoklu doğru/yanlış (MTF)</h2>
  <p class="intro">Kök kısa olabilir ("Opioidler:") ya da birkaç satırlık bir klinik tablo olabilir. Beş önermenin her biri kendi başına doğru ya da yanlıştır; beşi birden doğru, beşi birden yanlış ya da arada herhangi bir bileşim olabilir. Her önermeyi kökle birlikte okuyun ve diğer önermelerden bağımsız değerlendirin. [[S6 s. 6]] [[S9]]</p>
  <div class="viz"><div data-viz="mtf"></div></div>
</section>

<section class="wrap blk">
  <h2>Puanlama ve geçme notu</h2>
  <div class="cols" style="margin-top:14px;align-items:start">
    <div class="blk-body">
      <ul>
        <li>Her kâğıt 60 soru × 5 önerme = <b>300 puan</b>. Her doğru cevap +1; yanlış ya da boş cevap 0. [[S4]] [[S7 s. 5]]</li>
        <li>Negatif puan yoktur, bu yüzden bütün önermeleri cevaplamak adayın yararınadır. [[S2]]</li>
        <li>Geçme notu yıldan yıla biraz değişir. Komite iki şeye bakar: yeni ve değiştirilmiş sorular nedeniyle kâğıdın zorluğu ve adayların referans (ayırt edici) sorulardaki performansı. Bir adayın, güçlü bir yılda başkalarıyla kıyaslandığı için kalması istenmez. [[S7 s. 5]] [[S8]]</li>
        <li>Geçme notu her kâğıt için ayrı değerlendirilir ve <b>iki kâğıdın ikisi de</b> geçilmelidir. [[S6 s. 7]]</li>
        <li>Geçen ve kalan her aday, kâğıt ve konu alanı bazında performansını gösteren bir aday raporu alır; bu rapor yeniden girecek adaya yol gösterir. [[S6 s. 7]]</li>
        <li>Part I'in zorunlu ya da ulusal sınava denk sayıldığı ülkelerde kalan adaylar, soru kitapçığını ve cevap kâğıdını gözetim altında inceleyebilir. [[S7 s. 5]]</li>
      </ul>
    </div>
    <div class="viz"><div data-viz="esik"></div></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Salon kuralları (kâğıt üzerinde Part I)</h2>
  <div class="cols" style="margin-top:14px">
    <div class="card"><h3>Giriş ve süre</h3><ul>
      <li>Her kâğıttan 30 dakika önce kimlik ya da pasaport ve davet mektubuyla hazır olun. Geç kalan o kâğıda alınmaz; bu da Part I'den kalmak demektir. [[S8]]</li>
      <li>Her kâğıt 120 dakikada bitirilir. Disleksi ya da travma sonrası stres bozukluğu olan adaylara, kayıt bitiminden en geç 1 ay sonra tanı mektubu göndermeleri koşuluyla kâğıt başına 15 dakika ek süre verilir. [[S8]] [[S2]]</li>
      <li>Süre bitmeden salondan çıkmak yalnızca gözetmen onayıyla olur. [[S8]]</li>
    </ul></div>
    <div class="card"><h3>Malzeme ve davranış</h3><ul>
      <li>Telefon, akıllı saat, tablet, kamera, USB bellek ve internete bağlanabilen her cihaz salona alınmaz; eşyalar salonun arkasında bırakılır. [[S8]]</li>
      <li>Yalnızca ESAIC'in verdiği kurşun kalem (HB) kullanılır; hata silgiyle silinir, tükenmez kalem kullanılmaz. Not yalnızca soru kitapçığına alınır. [[S8]] [[S9]]</li>
      <li>Yalnızca cevap kâğıdı puanlanır; kitapçıktaki işaretler dikkate alınmaz. [[S9]]</li>
      <li>Adaylar arasında iletişim yasaktır; ESAIC adayların sonuçları arasında benzerlik analizi yapar. Soruları herhangi bir yolla kopyalamak diskalifiye ve 2 yıl sınav yasağıyla sonuçlanır. [[S8]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Diller, merkezler, kayıt</h2>
  <div class="cols" style="margin-top:14px">
    <div class="card"><h3>Diller ve merkezler</h3><p>İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Rusça, Lehçe, Macarca, Portekizce, Türkçe ve Romence. Seçilen dilin yanında İngilizce asıl metin de verilir. [[S2]]</p><p>Ankara dahil bazı merkezler sınavı bilgisayarda yapar; aday yine de akredite merkeze gitmelidir. Part I evden ya da başka bir yerden alınamaz. [[S2]]</p></div>
    <div class="card"><h3>Kayıt</h3><ul>
      <li>Kayıt myESAIC hesabı üzerinden yapılır. 2026'da son gün 11 Haziran'dı; 2027 kayıt dönemi henüz duyurulmadı. [[S2]]</li>
      <li>Tıp diplomasının asıl dildeki kopyası yüklenir; ad değiştiyse resmî belgesi de. Belgesiz başvuru otomatik iptal edilir. [[S2]]</li>
      <li>Merkezlerin kapasitesi sınırlıdır; dolan merkez için bekleme listesi yoktur. [[S2]]</li>
      <li>İleride Part II'ye girmek istiyorsanız, uzmanlık belgenizin Part II'ye uygun olduğunu Part I'e kaydolmadan önce kontrol edin. [[S2]] [[S11]]</li>
    </ul></div>
  </div>
</section>`,
};

/* ================= SINAVLAR · PART II ================= */
SAYFALAR['sinav/part2'] = {
  grup: 'sinav', eyebrow: 'Sınavlar · Part II', baslik: 'Part II · sözlü sınav',
  lede: 'Tek günde dört yapılandırılmış sözlü sınav (Structured Oral Examination, SOE): sabah iki temel bilim, öğleden sonra iki klinik. Her SOE 25 dakika sürer ve karşınızda iki sınavcı vardır; gün sonunda sekiz sınavcının verdiği puanlar toplanır. [[S6 s. 4]] [[S6 s. 7–8]]',
  html: `
<section class="wrap blk">
  <h2>Kimler girebilir?</h2>
  <div class="cols" style="margin-top:14px">
    <div class="card"><h3>Koşullar</h3><p>Part I'i geçmiş olmak <b>ve</b> şunlardan birini taşımak: [[S7 s. 8]]</p><ul>
      <li>verildiği ülkede anesteziyolojiyi tam ve kısıtlamasız uygulama yetkisi veren uzmanlık belgesi, ya da</li>
      <li>DSÖ Avrupa Bölgesi'ne üye bir ülkede (Türkiye dahil) veya Brezilya'da anesteziyoloji eğitiminin son yılında olmak.</li>
    </ul><p class="small muted">FRCA, FCAI/FCARCSI ve TSA sahipleri Part I'den muaftır. [[S7 s. 9]]</p></div>
    <div class="card"><h3>Son yıl asistanları</h3><p>Kayıtta doldurulmuş ESAIC Trainee Letter yüklenir. 2027 sınavları için son eğitim yılı 1 Ocak 2027'de ya da daha önce başlamış olmalıdır. [[S3]] [[S7 s. 8]]</p><p>Diploma, uzmanlık belgenizin kopyası ESAIC'e ulaşınca verilir; belgeyi alır almaz gönderin. [[S7 s. 8]]</p></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Günün akışı ve dört SOE</h2>
  <p class="intro">Her SOE'den önce 10 dakikalık hazırlık vardır: bir giriş senaryosu ya da sorusu verilir ve SOE onunla başlar. Bir SOE'ye basınca ayrıntısı açılır. Saatler ESAIC'in yaklaşık 3 hafta önce gönderdiği geçici programda yazar. [[S6 s. 8]] [[S6 s. 12]]</p>
  <div class="viz"><div data-viz="gun2"></div></div>
</section>

<section class="wrap blk">
  <h2>Bir SOE nasıl ilerler?</h2>
  <p class="intro">Hazırlık odasında 10 dakika; ardından iki sınavcının karşısında 25 dakika. Bir sınavcı sorarken diğeri not alır; 12,5. dakikada zil çalar ve roller değişir. Her SOE'de sınavcıların 25 dakikada bitirmesi gereken beş yönlendirilmiş soru vardır ve beşi de aynı puan değerindedir. [[S6 s. 8]]</p>
  <div class="viz"><div data-viz="soe"></div></div>
  <div class="cols cols-3" style="margin-top:14px">
    <div class="card"><h3>Sınavcılar</h3><p>Her SOE'de bir sınavcı çifti vardır; çoğunlukla biri ev sahibi ülkeden, diğeri ülke dışındandır. Aday mümkün olduğunca kendisini tanıyan sınavcıya düşmez. [[S7 s. 5–6]]</p></div>
    <div class="card"><h3>Dil</h3><p>Sınavcıların ve adayların bazen anadillerini kullanmadığı kabul edilir ve dil güçlüğü için bir pay bırakılır. [[S6 s. 8]]</p></div>
    <div class="card"><h3>Görüntüler</h3><p>Klinik sözlülerde grafi, BT, MR ve ultrason görüntüleri kullanılır. [[S7 s. 6]]</p></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Puanlama</h2>
  <p class="intro">Günün 20 konusunun (4 SOE × 5 soru) her biri için her sınavcı 0, 1 ya da 2 verir; sekiz sınavcının puanları toplanır. Geçmek için üç koşulun hepsi gerekir: sabah (SOE 1 + 2) en az 25/40, öğleden sonra (SOE 3 + 4) en az 25/40 ve toplam en az 60/80. [[S6 s. 8]] Puanlara basarak değiştirin ya da hazır senaryolardan birini seçin.</p>
  <div class="viz"><div data-viz="puan"></div></div>
  <div class="tbl-wrap" style="margin-top:14px"><table class="tbl">
    <thead><tr><th>Puan</th><th>Sınavcının gördüğü [[S6 s. 8]]</th></tr></thead>
    <tbody>
      <tr><th><span class="tag ok">2 · geçer</span></th><td>Akıcı; bilgiyi uygulayabiliyor; temel konularda kendinden emin; kapsamlı ve uygun derinlikte; kendi hatasını düzeltebiliyor.</td></tr>
      <tr><th><span class="tag warn">1 · sınırda</span></th><td>Yalnızca olgu bilgisi (açıklamasız ezber); zayıf ya da eksik kavrayış; özellikle temel konularda yüzeysel; dağınık, yapısız; mantıksız ama tehlikeli klinik karar yok.</td></tr>
      <tr><th><span class="tag crit">0 · kalır</span></th><td>Yönlendirmeye rağmen sorulan soruyu cevaplamıyor ya da susuyor; konuyu ciddi biçimde kavramamış; sınavcı seçsin diye birden çok cevap sunuyor; tehlikeli klinik yaklaşım.</td></tr>
    </tbody>
  </table></div>
  <div class="note" style="margin-top:14px">Sınavcılar gün sonundaki toplantıya kadar adayın diğer SOE'lerdeki puanlarını bilmez. Bu nedenle dar alanlarda uzmanlaşmak yerine geniş ve tutarlı bir bilgi düzeyi hedeflenmelidir. [[S6 s. 8]] [[S7 s. 6]]</div>
</section>

<section class="wrap blk">
  <h2>Yüz yüze ve çevrim içi</h2>
  <p class="intro">2027'de 6 çevrim içi oturum ve 12 yüz yüze merkez var. Sınav Komitesi çevrim içi sınavdan gözetimli yüz yüze sınava doğru kademeli geçişi hedefliyor. Ankara, İzmir, Londra ve Kahire'de aday merkezde bulunur, sınavcılar Zoom ile bağlanır. Vize gereken adaylara Schengen dışı ya da çevrim içi sınav önerilir. [[S3]]</p>
  <div class="cols">
    <div class="card"><h3>İki biçimde de</h3><ul>
      <li>Sınav bireyseldir: hazırlıkta ve hazırlıkla sınav arasında konuşmak yasaktır. Fiziksel ya da dijital not, yapay zekâ dahil hiçbir dış kaynak kullanılamaz. [[S10 s. 2–3]]</li>
      <li>Sınav anonimdir: kendinizi yalnızca aday numaranızla tanıtın; adınızı ya da hastanenizi söylemeyin. [[S10 s. 2]]</li>
      <li>Yüzünüz çeneden saç çizgisine kadar her an açık olmalıdır. [[S10 s. 2]]</li>
      <li>Konuşma bozukluğu olan adaylara, tanı mektubu kayıt bitiminden en geç 1 ay sonra gönderilirse SOE başına 3 dakika ek süre verilir. [[S10 s. 2]]</li>
    </ul></div>
    <div class="card"><h3>Farklar</h3><ul>
      <li><b>Yüz yüze:</b> her SOE'den en az 15 dakika önce bekleme odasında olun. Saat dahil hiçbir cihaz hazırlık odasına ve sınav salonuna giremez. Kalemi görevli verir; sorular ve notlar sınav masasında bırakılır. [[S10 s. 2]]</li>
      <li><b>Çevrim içi:</b> her SOE'den en az 30 dakika önce bilgisayar başında olun (güvenlik kontrolleri için). Odada yalnız olun; notlar her oturumdan sonra yırtılıp atılır. Donanım listesi <a href="#/hazirlik/gun">Sınav günü</a> sekmesinde. [[S10 s. 3]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk">
  <h2>2027 takvimi ve kayıt</h2>
  <div class="cols" style="margin-top:14px;align-items:start">
    <div>
      <div class="tbl-wrap"><table class="tbl">
        <thead><tr><th>Kayıt aşaması (CET)</th><th>Kimler için</th></tr></thead>
        <tbody>
          <tr><td class="num">17 Kas 2026, 13:30</td><td>Avrupa'da çalışanlar için tüm merkezler; Mısır'da çalışanlar için Kahire; Brezilya'da çalışanlar için Porto ve 20–22 Ağustos çevrim içi oturumu</td></tr>
          <tr><td class="num">2 Ara 2026, 13:30</td><td>Kalan yerler bütün adaylara</td></tr>
          <tr><td class="num">15 Ara 2026, 13:30</td><td>İngilizce, Portekizce ve Türkçe için sınırlı sayıda ek yer</td></tr>
          <tr><td class="num">21 Ara 2026, 23:59</td><td><b>Kayıt kapanır</b>; sonrasında kayıt yapılamaz</td></tr>
        </tbody>
      </table></div>
      <p class="small muted" style="margin-top:10px">Kayıtta uzmanlık belgesinin asıl dildeki kopyası (son yıl asistanları için Trainee Letter) ve son 6 ayda çekilmiş, net, değiştirilmemiş, baş ve omuzları gösteren bir fotoğraf yüklenir. 2027 üye ücretinden yararlanmak için üyelik kayıttan önce alınmalıdır. [[S3]]</p>
    </div>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Yüz yüze merkez</th><th>Tarih (2027)</th></tr></thead>
      <tbody>
        <tr><td>Ankara*</td><td class="num">19–21 Mar</td></tr>
        <tr><td>Göttingen</td><td class="num">9–10 Nis</td></tr>
        <tr><td>Porto</td><td class="num">16–17 Nis</td></tr>
        <tr><td>Uppsala</td><td class="num">11–12 May</td></tr>
        <tr><td>Varşova</td><td class="num">12–13 Haz</td></tr>
        <tr><td>Frankfurt</td><td class="num">19–20 Haz</td></tr>
        <tr><td>İzmir*</td><td class="num">2–4 Tem</td></tr>
        <tr><td>Londra*</td><td class="num">17–19 Eyl</td></tr>
        <tr><td>Erlangen</td><td class="num">1–2 Eki</td></tr>
        <tr><td>İstanbul</td><td class="num">9–10 Eki</td></tr>
        <tr><td>Madrid</td><td class="num">13–14 Kas</td></tr>
        <tr><td>Kahire*</td><td class="num">26–28 Kas</td></tr>
        <tr><td colspan="2" class="small muted">Çevrim içi: 19–21 Şub (Fransızca/İngilizce), 5–7 Mar (Romence/İngilizce), 20–22 Ağu (Brezilya saati; Portekizce/İngilizce), 4–5 Eyl (İngilizce), 30–31 Eki (İtalyanca/İngilizce), 10–12 Ara (Almanca/İngilizce). * Aday merkezde, sınavcılar Zoom ile. [[S3]]</td></tr>
      </tbody>
    </table></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Sonuç ve yeniden giriş</h2>
  <div class="blk-body"><ul>
    <li>Sonuç aynı gün, sınavcıların değerlendirme toplantısından (call-over) sonra verilir. Sınavcı kurulunun kararı ve her puan kesindir; sınavcılar sonucu adayla tartışamaz. [[S3]] [[S10 s. 2]]</li>
    <li>EDAIC geç/kal sınavıdır, başka derece verilmez. Daha sonra sabah, öğleden sonra ve toplam puanı gösteren bir performans raporu gönderilir. [[S6 s. 12]]</li>
    <li>Kalan aday Part I'i tekrarlamaz; Part I başarısı geçerli kalır. Part II'ye, denemeler arasında süre sınırı olmadan, geçene kadar girilebilir. [[S6 s. 13]]</li>
    <li>ESAIC'in resmi Part II örnek soruları İngilizce, Fransızca, İtalyanca, Almanca ve İspanyolca olarak hazırlık sayfasında. [[S13]]</li>
  </ul></div>
</section>`,
};

/* ================= SINAVLAR · OLA/HOLA ================= */
SAYFALAR['sinav/ola'] = {
  grup: 'sinav', eyebrow: 'Sınavlar · deneme', baslik: 'Deneme sınavları · OLA ve HOLA',
  lede: 'On-Line Assessment (OLA), Part I ile aynı yapıyı ve puanlamayı kullanan, her yıl Nisan\'da yapılan bilgisayar tabanlı bir değerlendirmedir. Home On-Line Assessment (HOLA) evden girilen sürümüdür. [[S4]]',
  html: `
<section class="wrap blk">
  <div class="cols">
    <div class="card"><h3>Ne işe yarar?</h3><ul>
      <li>Part I'e hazırlık için deneme sınavı; Nisan'da yapıldığı için sonbahardaki Part I'den önce ideal bir prova. [[S4]]</li>
      <li>Bölüm düzeyinde asistanların bilgisini ölçmek ve eğitimi yönlendirmek. [[S4]]</li>
      <li>Kendi gelişimini yıldan yıla izlemek ya da akranlarla karşılaştırmak. [[S4]]</li>
      <li>Moldova, Slovenya ve Fransızca konuşulan Belçika'da resmî sınav olarak. [[S4]] [[S1]]</li>
    </ul></div>
    <div class="card"><h3>Yapı ve rapor</h3><ul>
      <li>İki set, her birinde 60 soru ve her soruda 5 doğru/yanlış: ilk set Paper A (temel bilim), ikinci set Paper B (klinik). Her set en fazla 300 puan; doğru +1, boş ya da yanlış 0. [[S4]]</li>
      <li>Rapor, A ve B bölümleri ile konu alanlarına göre performansı, aynı eğitim aşamasındaki adayların ulusal ve genel ortalamalarıyla birlikte verir; karşılaştırma için önceki yılların Part I geçme notları da bildirilir. [[S4]]</li>
      <li>ESAIC OLA/HOLA için geçme notu belirlemez. [[S4]]</li>
      <li>HOLA'nın yaklaşık 2000 kişilik bir katılımcı grubu vardır ve kontenjanı sınırsızdır. [[S4]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk">
  <h2>2027 tarihleri ve kayıt</h2>
  <div class="tbl-wrap" style="margin-top:14px"><table class="tbl">
    <tbody>
      <tr><th>OLA</th><td>16 Nisan 2027, Cuma. Yalnızca Moldova, Slovenya ve Fransızca konuşulan Belçika'daki adaylar için; diğer ülkelerden adaylar HOLA'yı seçer. [[S4]]</td></tr>
      <tr><th>HOLA</th><td>22 Nisan–4 Mayıs 2027 arasında, evden. [[S4]]</td></tr>
      <tr><th>Grup kaydı</th><td>Eğitim sorumluları asistanlarını toplu kaydedebilir; 5 Şubat 2027, 13:30 CET'te kapanır. Grubu kaydedilen asistan ayrıca bireysel kayıt yapmamalıdır. [[S4]]</td></tr>
      <tr><th>Bireysel kayıt</th><td>myESAIC üzerinden; 6 Ocak 2027, 13:30 CET'te açılır, 10 Mart 2027'de kapanır. [[S4]]</td></tr>
      <tr><th>Diller</th><td>İngilizce, Fransızca, Almanca, İtalyanca, Lehçe, Portekizce, Romence, Rusça, İspanyolca ve Türkçe. [[S4]]</td></tr>
      <tr><th>İptal</th><td>OLA/HOLA kayıtları iade edilmez. Merkez ya da dil yalnızca kayıt bitiminden önce değiştirilebilir; merkez değişikliği bir kez yapılabilir. [[S4]]</td></tr>
    </tbody>
  </table></div>
  <div class="note" style="margin-top:14px">OLA'ya hazırlık Part I ile aynıdır: ESAIC, adaylara "How to prepare for the EDAIC" rehberini, örnek Part I sorularını ve önerilen okuma listesini okumalarını önerir. 2022 rehberi Part I merkezlerinde düşük ücretle yapılan bir de In-Training Assessment (ITA) tanımlar; ITA'da geçme notuna ulaşmak Part I'i geçmek sayılmaz. [[S4]] [[S6 s. 4]] <a href="#/hazirlik/part1">Part I stratejisi →</a></div>
</section>`,
};

/* ================= HAZIRLIK · BEKLENEN BİLGİ ================= */
const HAZIRLIK_LEDE = 'Bu bölüm ESAIC\'in "How to prepare for the EDAIC" rehberine dayanır (2022, İngilizce, 13 sayfa; ESAIC hazırlık sayfasında "EDAIC Preparation Guide" olarak bağlantılı). Rehberdeki öneriler Türkçe özetlenmiş, gereken yerlerde güncel ESAIC belgeleriyle tamamlanmıştır. [[S6]] <a href="https://esaic.org/wp-content/uploads/2023/11/how-to-prepare-for-the-edaic-2022english.pdf" target="_blank" rel="noopener">Rehberin aslı (PDF)</a>';

SAYFALAR['hazirlik/bilgi'] = {
  grup: 'hazirlik', eyebrow: 'Hazırlık · resmi rehbere göre', baslik: 'Sınava nasıl hazırlanılır?', lede: HAZIRLIK_LEDE,
  html: `
<section class="wrap blk">
  <h2>Beklenen bilgi</h2>
  <p class="intro">Rehber, sınavın ölçtüğü bilgiyi altı başlıkta toplar: temel bilimler, klinik anesteziyoloji (obstetrik dahil), resüsitasyon ve acil tıp, yoğun bakım, kronik ağrı ve güncel literatür. Bir alana basınca ayrıntısı ve Part I ile Part II'de nerede sınandığı açılır. [[S6 s. 4–5]]</p>
  <div class="viz"><div data-viz="alanlar"></div></div>
</section>

<section class="wrap blk">
  <div class="cols">
    <div class="note"><b>Bu liste bir müfredat değildir.</b> Rehber, listenin sınav müfredatı ya da sınavdaki konuların tam listesi olmadığını özellikle vurgular; adaya yol göstermek için hazırlanmıştır. EDAIC, Avrupa Anesteziyoloji Kurulu'nun uzmanlık eğitim programı müfredatını kapsamayı amaçlar. [[S6 s. 5]] [[S7 s. 9]]</div>
    <div class="note"><b>Güncel literatür.</b> Adaylardan anestezi, ağrı ve yoğun bakım literatüründeki önemli konuları bilmeleri beklenir. Ulusal farklılıklar kabul edilse de uluslararası önemdeki konular (örneğin yeni ajanlar) her ülkede kullanılmasa bile bilinmelidir. [[S6 s. 5]] [[S7 s. 9]]</div>
  </div>
</section>`,
};

SAYFALAR['hazirlik/part1'] = {
  grup: 'hazirlik', eyebrow: 'Hazırlık · resmi rehbere göre', baslik: 'Sınava nasıl hazırlanılır?', lede: HAZIRLIK_LEDE,
  html: `
<section class="wrap blk">
  <h2>Part I stratejisi</h2>
  <p class="intro">Rehberin önerisi: her aday Part I soruları için kendi stratejisini sınavdan önce belirlesin. Rehber iki olası strateji anlatır; aşağıda ikisi de 60 soruluk bir kâğıt üzerinde canlandırılmıştır. [[S6 s. 6]]</p>
  <div class="viz"><div data-viz="strateji"></div></div>
</section>

<section class="wrap blk">
  <h2>Soru başında</h2>
  <div class="cols cols-3" style="margin-top:14px">
    <div class="card"><h3>Kökü her önermeyle okuyun</h3><p>Her önermeyi kökle birlikte okuyun. Her önerme aynı kökteki diğer önermelerden bağımsız cevaplanır. [[S6 s. 6]]</p></div>
    <div class="card"><h3>Hepsini cevaplayın</h3><p>Yanlış ya da boş cevap puan götürmez. Bütün önermeleri cevaplamak adayın yararınadır. [[S2]] [[S6 s. 6]]</p></div>
    <div class="card"><h3>Aktarmayı planlayın</h3><p>Kâğıt sınavda cevaplar önce kitapçığa işaretlenip sonra optik forma aktarılırsa bu yaklaşık 30 dakika sürer. Formu talimata uygun doldurmak adayın sorumluluğudur; yalnızca verilen kalem kullanılır. [[S6 s. 6]] [[S9]]</p></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Deneme ve geri bildirim</h2>
  <div class="cols" style="margin-top:14px">
    <div class="card"><h3>HOLA ile prova</h3><p>OLA/HOLA, Part I ile aynı yapı ve puanlamayı kullanır ve Nisan'da yapılır. Konu alanı raporu, sonbahardaki sınavdan önce hangi alanlara çalışmanız gerektiğini gösterir. Sınav Komitesi de OLA'yı Part I için ideal hazırlık aracı olarak görür. [[S4]] [[S7 s. 9]]</p></div>
    <div class="card"><h3>Aday raporu</h3><p>Part I'den sonra her aday kâğıt ve konu alanı bazında bir aday raporu alır. Kalan aday için yeniden girmeden önce en değerli bilgi budur. [[S6 s. 7]]</p></div>
  </div>
</section>`,
};

SAYFALAR['hazirlik/part2'] = {
  grup: 'hazirlik', eyebrow: 'Hazırlık · resmi rehbere göre', baslik: 'Sınava nasıl hazırlanılır?', lede: HAZIRLIK_LEDE,
  html: `
<section class="wrap blk">
  <h2>Sınavcı ne arar?</h2>
  <p class="intro">Beklenen düzey, eğitimini tamamlamış bir uzman anesteziyoloğun düzeyidir. Sınavcılar hem adayın deneyime ve kavrayışa dayanan yaklaşımına hem de olgu bilgisine bakar. Temel bilim SOE'leri, temel bilimin anestezi ve yoğun bakım pratiğine uygulanışının anlaşılıp anlaşılmadığını sınar. [[S6 s. 8–9]]</p>
  <h3 style="margin:18px 0 10px">Rehbere göre adayların kalma nedenleri [[S6 s. 9]]</h3>
  <div class="cols cols-3">
    <div class="card"><span class="tag crit">1</span><p>Kavramadan, olguları derinlemesine anlamadan tekrarlamak.</p></div>
    <div class="card"><span class="tag crit">2</span><p>Bilgiyi ve temel bilimi klinik duruma uygulayamamak.</p></div>
    <div class="card"><span class="tag crit">3</span><p>Düşüncelerini düzenleyip açıkça ifade edememek.</p></div>
    <div class="card"><span class="tag crit">4</span><p>Karar verme ve sorun çözmede sağlam olmayan muhakeme ya da kararsızlık.</p></div>
    <div class="card"><span class="tag crit">5</span><p>Bilgi eksikliği ya da bilgiyi hatırlayamamak.</p></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Alan alan nasıl çalışmalı?</h2>
  <p class="intro">Hangi kitap, ne kadar ayrıntı? Rehberin cevabı: temel, ülkenizde tercih edilen standart anestezi ders kitabıdır; uluslararası ve ulusal dergilerdeki güncel konular da beklenir; ESAIC'in önerilen okuma listesi ayrıca vardır. [[S6 s. 9]] Alanlara göre öne çıkanlar:</p>
  <details class="acc"><summary>Fizyoloji</summary><div class="acc-b">Kardiyovasküler ve solunum fizyolojisi ayrıntılı sınanır. Nöro, böbrek ve karaciğer fizyolojisinin anestezi ve yoğun bakıma uygulanışı da iyi bilinmelidir; anesteziyle ilgili diğer fizyoloji alanları da gerektiği ölçüde sorulur. [[S6 s. 9]]</div></details>
  <details class="acc"><summary>Farmakoloji</summary><div class="acc-b">Farmakokinetik ve farmakodinamik ilkeleri ayrıntılı sınanır. Anestezide kullanılan ilaçların ve yoğun bakımda sık kullanılan birçok ilacın farmakolojisi ve toksikolojisi iyi bilinmelidir. Dergi okuyan bir anestezist, makalelerin değerini yargılayabilmek için araştırma protokollerini ve kullanılan istatistik yöntemlerin anlamını da kavramalıdır. [[S6 s. 9]]</div></details>
  <details class="acc"><summary>Uygulamalı anatomi</summary><div class="acc-b">İğne, kanül, endotrakeal ve endobronşiyal tüp yerleştirilen bölgelerin temel anatomisi; kalbin ve akciğerin uygulamalı anatomisi. [[S6 s. 9]]</div></details>
  <details class="acc"><summary>Fizik ve klinik ölçüm</summary><div class="acc-b">Anestezist pek çok parametreyi ölçer ve gördüğüne göre davranır; bu yüzden monitörlerin çalışma ilkesini, sınırlılıklarını, doğruluğunu ve hata kaynaklarını bilmelidir. Gaz ve buharların temel fiziği ve elektrik güvenliği; anestezi makinesi ve ventilatörlerin çalışma ilkeleri, güvenlik özellikleri ve arıza nedenleri temel bilgidir. [[S6 s. 9]]</div></details>
  <details class="acc"><summary>Klinik anestezi ve yoğun bakım</summary><div class="acc-b">Aday eğitimini bitirmiş ya da son yılındadır; anestezi ve yoğun bakımın her türünde deneyimi olmalıdır. Pediatrik, nöro, kardiyak ve obstetrik anestezi gibi yan dalların ilke ve uygulaması sorulur ama bu alanlarda geniş deneyim beklenmez. [[S6 s. 9]]</div></details>
  <details class="acc"><summary>Acil tıp</summary><div class="acc-b">Her yaş grubunda her tür kardiyopulmoner resüsitasyon ve temel/ileri yaşam desteği algoritmaları; hastane öncesi bakım, travma dahil tıbbi ve cerrahi acillerin ilk bakımı, hastane içi ve hastaneler arası transport. Sık bir kalma nedeni, sorulan kritik duruma gelişigüzel yaklaşmak ve ALS protokollerini izlememektir: değerlendirme ABCDE'ye, CPR başladıktan sonra 4H ve 4T'ye dayanmalı; uygun olduğu yerde ERC kılavuzları izlenmelidir. [[S6 s. 10]]</div></details>
  <details class="acc"><summary>Ağrı</summary><div class="acc-b">Ağrı fizyolojisi, akut ve kronik ağrı farkı, farmakolojik tedavi, diğer tedavi yöntemleri, ağrılı hastanın psikolojik yönetimi, multidisipliner bakım ve terminal dönemde ağrı ve semptom kontrolü. [[S6 s. 10]]</div></details>
</section>

<section class="wrap blk">
  <h2>Sınav tekniği</h2>
  <div class="cols" style="margin-top:14px">
    <div class="card"><h3>Söylemediğiniz yapılmamış sayılır</h3><p>Sınavcı bir sorunu nasıl yöneteceğinizi görmemiştir; yargısını yalnızca sözlüdeki performansınıza dayandırır. Bir işlemi yaptığınızı ya da bir monitörü kontrol ettiğinizi varsayamaz: söylemeniz gerekir. Her kuramsal soruda mantıklı bir yapı gösterin. [[S6 s. 10]]</p></div>
    <div class="card"><h3>Sorgu değil, diyalog</h3><p>Sınavcının amacı yalnızca bilmediğinizi bulmak değil, sizinle konu üzerine bir diyaloğa girmektir. Konuyu bilgiyle tartışın; bir konu deneyiminizin tamamen dışındaysa bunu söylemekten çekinmeyin. Çoğu sorunun tek doğru cevabı yoktur; kanıta dayanan ve gerekçesi gösterilen görüş kabul edilir. [[S6 s. 11]]</p></div>
    <div class="card"><h3>Bildiğiniz yoldan gidin</h3><p>Adayların standart, yaygın tekniklerle eğitildiği varsayılır. Sınavcının istediğini sandığınız ama bilmediğiniz yöntemlere sapmak yerine kendi kurumunuzda olağan olan, iyi bildiğiniz yöntemlere dayanın. Sınavcı, emin olup olmadığınızı görmek için cevabınızı sorgulayabilir. [[S6 s. 11]]</p></div>
    <div class="card"><h3>Süreyi beş soruya yayın</h3><p>Her SOE'nin beş sorusu aynı değerdedir. Bir konuda sınavcıyı ikna ettiyseniz orada fazla zaman harcamanın yararı yoktur. Sınavcı konuyu birden kesip başka bir konuya geçebilir; bu, cevabınızdan memnun olmadığı anlamına gelmez. [[S6 s. 8]] [[S6 s. 10]]</p></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Klinik senaryoyu yapılandırmak</h2>
  <p class="intro">Rehberdeki örnek, 10 dakika önce verilen bir klinik senaryo ve onu ele almanın yapısıdır. Mantıklı, iyi yapılandırılmış ve gerekçesini açıklayan bir cevap veren aday, sınavcının az konuştuğunu ve sürekli araya girmek zorunda kalmadığını görür. Sunum pratiği şarttır; eğitmenlerinizle ve arkadaşlarınızla çalışın. Sınava anadilinizde girmiyorsanız bu daha da önemlidir. [[S6 s. 10]]</p>
  <div class="viz"><div data-viz="senaryo"></div></div>
</section>

<section class="wrap blk">
  <h2>Görüntü okumak</h2>
  <p class="intro">Adaylardan görüntüleri sistematik ve mantıklı bir yaklaşımla okumaları ve sistemlerini sınavcıya anlatabilmeleri beklenir; her tür tıbbi görüntü gelebilir. Rehber akciğer grafisi için altı adımlı bir sistem önerir. Aşağıdaki grafi bu atlas için çizilmiş bir şemadır, gerçek grafi değildir. [[S6 s. 11]]</p>
  <div class="viz"><div data-viz="grafi"></div></div>
</section>

<section class="wrap blk">
  <h2>Diyagram ve grafik çizmek</h2>
  <p class="intro">Diyagram ve grafikleri sınavcı gösterebilir, aday çizebilir ya da giriş senaryosunda yer alabilir. Yüz yüze sınavda kâğıt ve kalem her zaman verilir. Rehberin örneği: temel bilim SOE'sinde "Kanda oksijen taşınmasını etkileyen faktörleri tartışın" sorusuna, değerleri işaretlenmiş oksihemoglobin dissosiyasyon eğrileriyle başlamak iyi bir izlenim bırakır ve yapılandırılmış bir cevaba yerleşmenize yardım eder. Farmakolojide de farmakodinamik ve farmakokinetik ilkeleri grafikle anlatmak açık bir avantajdır. [[S6 s. 11]]</p>
  <div class="viz"><div data-viz="ohdc"></div></div>
</section>`,
};

SAYFALAR['hazirlik/gun'] = {
  grup: 'hazirlik', eyebrow: 'Hazırlık · resmi rehbere göre', baslik: 'Sınava nasıl hazırlanılır?', lede: HAZIRLIK_LEDE,
  html: `
<section class="wrap blk">
  <h2>Part II sınav günü</h2>
  <div class="cols" style="margin-top:14px">
    <div class="card"><h3>Gelmeden önce</h3><ul>
      <li>Her SOE'nin saatini gösteren geçici program sınavdan yaklaşık 3 hafta önce gelir; güncel hali bekleme alanında asılıdır ve gün içinde değişebilir. [[S6 s. 12]]</li>
      <li>Zamanında gelin: sınav başladıktan sonra gelen adayın alınacağı garanti değildir. Trafik ve grev gibi aksaklıkları ve yerel saati hesaba katın. [[S6 s. 11]]</li>
      <li>Davet mektubunu ve geçerli kimliği (tercihen pasaport) getirin; kimliği doğrulanamayan aday sınava alınmaz. [[S6 s. 11]]</li>
    </ul></div>
    <div class="card"><h3>Gün içinde</h3><ul>
      <li>SOE aralarında bekleme alanından ayrılabilirsiniz, ama bir sonraki SOE'den en az 15 dakika (çevrim içinde 30 dakika) önce dönmelisiniz. Grubunuza senaryo verilirken orada değilseniz hazırlıksız başlamak zorunda kalabilirsiniz. [[S6 s. 12]]</li>
      <li>Her SOE'den yaklaşık 15 dakika önce, seçtiğiniz dilde kısa bir klinik durumun yazılı olduğu kâğıt verilir. Sağ üst köşede aday numaranız ve masa harfiniz (ör. "12 B") yazar. Notlarınızı bu kâğıda alırsınız; ama yalnızca sözlü cevabınız puanlanır. [[S6 s. 12]]</li>
      <li>Hazırlık odasına eller ve cepler boş girilir; kendi kaleminizi ve kâğıdınızı kullanamazsınız. Akıllı saat dahil kapalı olsa bile hiçbir iletişim cihazı bulunamaz. [[S6 s. 12]] [[S10 s. 2]]</li>
      <li>Gün boyunca aday numaranızla anılırsınız. Kahve, çay, meşrubat ve hafif bir öğle yemeği ücretsizdir. [[S6 s. 12]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Çevrim içi Part II: oda ve donanım</h2>
  <p class="intro">2027 aday sözleşmesindeki koşullar. Hazır olanları işaretleyin; işaretler yalnız bu tarayıcıda saklanır. Ayrıntılar için ESAIC Office'in gönderdiği çevrim içi sınav kurallarını da izleyin. [[S10 s. 3–5]] [[S6 s. 12]]</p>
  <div class="viz"><div data-viz="ekipman"></div></div>
</section>

<section class="wrap blk">
  <h2>Part I sınav günü</h2>
  <div class="blk-body"><ul>
    <li>Her kâğıttan 30 dakika önce kimlik ya da pasaport ve davet mektubuyla salonun önünde olun; geç kalan o kâğıda alınmaz ve Part I'den kalır. [[S8]]</li>
    <li>Eşyalar salonun arkasında bırakılır ve her kâğıdın sonunda geri alınır. Kitap, kâğıt ve elektronik cihaz salona giremez; yalnızca ESAIC'in verdiği kurşun kalem kullanılır. [[S8]]</li>
    <li>Cevap kâğıdına aday numaranız önceden basılmıştır; doğru olduğunu kontrol edin. Formu katlamayın, buruşturmayın. [[S9]]</li>
  </ul></div>
  <p style="margin-top:14px"><a href="#/sinav/part1">Part I salon kurallarının tamamı →</a></p>
</section>`,
};

SAYFALAR['hazirlik/araclar'] = {
  grup: 'hazirlik', eyebrow: 'Hazırlık · resmi rehbere göre', baslik: 'Sınava nasıl hazırlanılır?', lede: HAZIRLIK_LEDE,
  html: `
<section class="wrap blk">
  <h2>ESAIC'in resmi hazırlık araçları</h2>
  <p class="intro">ESAIC'in hazırlık sayfasında sıralanan araçlar. Rehberin önerisi açık: en iyi hazırlık, geniş okumayla desteklenen kapsamlı pratik anestezi deneyimidir; vakaları eğitmenlerinizle, meslektaşlarınızla ve mentorlarınızla olabildiğince çok sunup tartışın. MCQ ya da SOE tabanlı başka hazırlık kursları da uygun olabilir. [[S5]] [[S6 s. 13]]</p>
  <div class="cols cols-3">
    <div class="card"><span class="tag basic">Part I</span><h3>EDAIC Trainer</h3><p>Asistanlar Komitesi'nin girişimi olan mobil uygulama. Part I ile aynı biçimde ve aynı konularda doğrulanmış sorular, doğru cevaplar ve açıklamaları. [[S5]]</p></div>
    <div class="card"><span class="tag basic">Part I</span><h3>OLA / HOLA</h3><p>Nisan'daki deneme sınavı; hangi konulara daha çok çalışmanız gerektiğini gösterir. <a href="#/sinav/ola">Ayrıntı →</a> [[S5]] [[S4]]</p></div>
    <div class="card"><span class="tag gold">Part I · II</span><h3>BCSAC</h3><p>Basic and Clinical Sciences Anaesthetic Course: temel ve klinik bilimlerin farklı alanlarındaki kavrayışı ve bilgiyi geliştirmek için bir hazırlık kursu. [[S5]]</p></div>
    <div class="card"><span class="tag clin">Part II</span><h3>VIVAC</h3><p>Viva Course: adayı Part II sınav düzeni ve tekniğiyle tanıştırır; açıklayıcı dersler ve Part II deneme sınavı atölyesi içerir. [[S5]]</p></div>
    <div class="card"><span class="tag gold">Part I · II</span><h3>ESAIC Academy</h3><p>Sınav hazırlığıyla ilgili e-öğrenme içerikleri; bazı modüller yalnızca ESAIC üyelerine açıktır. [[S5]]</p></div>
    <div class="card"><span class="tag gold">Part I · II</span><h3>Örnek sorular</h3><p>Part I örnekleri İngilizce, Fransızca, İtalyanca, Almanca, İspanyolca ve <b>Türkçe</b>; Part II örnekleri İngilizce, Fransızca, İtalyanca, Almanca ve İspanyolca. ESAIC bu soruların bilimsel içeriğine dair soruları yanıtlamaz. <a href="https://esaic.org/professional-growth/edaic/how-to-prepare-for-the-exam/" target="_blank" rel="noopener">İndirme sayfası →</a> [[S13]]</p></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Önerilen okuma listesi</h2>
  <p class="intro">ESAIC'in listesi, listenin hazırlığın yalnızca bir parçası olduğunu belirtir: adaylar güncel kılavuz ve önerileri de bilmeli; dernek üyeliği ilgili dergilere erişim sağlar; eğitim boyunca edinilen deneyim vazgeçilmezdir. Listede İngilizce, Fransızca, Almanca, Portekizce ve İspanyolca kitaplar var; Türkçe kitap yok. İngilizce kitaplardan bazıları: [[S12]]</p>
  <div class="cols" style="align-items:start">
    <div class="card"><h3>Fizyoloji ve anatomi</h3><ul class="small">
      <li>West's Respiratory Physiology: The Essentials, 11. baskı (West, Luks; 2020)</li>
      <li>Principles of Physiology for the Anaesthetist, 4. baskı (Power, Kam; 2020)</li>
      <li>Ganong's Review of Medical Physiology, 26. baskı (2019)</li>
      <li>Physics, Pharmacology and Physiology for Anaesthetists (Cross, Plunkett; 2014)</li>
      <li>Clinical Anesthesia Fundamentals (Cullen; 2022)</li>
      <li>Anatomy for Anaesthetists, 9. baskı (Ellis, Lawson; 2013)</li>
    </ul></div>
    <div class="card"><h3>Farmakoloji, fizik ve ölçüm</h3><ul class="small">
      <li>Pharmacology for Anaesthesia and Intensive Care (Peck, Harris; 2021)</li>
      <li>Drugs in Anaesthesia and Intensive Care, 5. baskı (Scarth, Smith; 2016)</li>
      <li>Maths, Physics and Clinical Measurement for Anaesthesia and Intensive Care (Ebrahim; 2019)</li>
      <li>Physics in Anaesthesia, 2. baskı (Middleton, Phillips, Stacey; 2021)</li>
      <li>The Physics, Clinical Measurement and Equipment of Anaesthetic Practice (Magee, Tooley; 2011)</li>
    </ul></div>
    <div class="card"><h3>Anestezi ve yoğun bakım</h3><ul class="small">
      <li>Smith and Aitkenhead's Textbook of Anaesthesia, 7. baskı (2019)</li>
      <li>Morgan and Mikhail's Clinical Anesthesiology, 7. baskı (2022)</li>
      <li>Miller's Anesthesia, 9. baskı (2019)</li>
      <li>Oxford Textbook of Anaesthesia (2017)</li>
      <li>Oh's Intensive Care Manual, 8. baskı (2018)</li>
      <li>Textbook of Critical Care, 8. baskı (Vincent, Abraham; 2022)</li>
    </ul></div>
    <div class="card"><h3>Sınava yönelik</h3><ul class="small">
      <li>How to pass the EDAIC (Varvinskiy, Zerafa, Hill; Oxford University Press 2023)</li>
      <li>1,000 Practice MTF MCQs for the Primary and Final FRCA (Ebrahim ve ark.; 2019)</li>
      <li>MCQs in Regional Anaesthesia and Pain Therapy (Sehmbi; 2017)</li>
      <li>Web: frca.co.uk, dr-podcast.co.uk, bjaed.org</li>
    </ul></div>
  </div>
  <p style="margin-top:12px"><a href="https://esaic.org/wp-content/uploads/2025/10/Recommended-Reading-List-for-EDAIC.pdf" target="_blank" rel="noopener">Listenin tamamı (PDF) →</a></p>
</section>

<section class="wrap blk">
  <div class="note warn"><b>Sınav soruları gizlidir.</b> Sorular ESAIC'in mülkiyetindedir. Part I'de soruları herhangi bir yolla kopyalamak diskalifiye ve 2 yıl yasakla sonuçlanır. Part II adayları soruları açıklamamayı ve hazırlık notlarını sınavdan hemen sonra imha etmeyi taahhüt eder. "Hatırlanan sorular" dolaşımına güvenmeyin; bu atlas da gerçek sınav sorusu yayımlamaz. [[S8]] [[S10 s. 1]]</div>
</section>`,
};

SAYFALAR['hazirlik/liste'] = {
  grup: 'hazirlik', eyebrow: 'Hazırlık · resmi rehbere göre', baslik: 'Sınava nasıl hazırlanılır?', lede: HAZIRLIK_LEDE,
  html: `
<section class="wrap blk">
  <h2>Hazırlık listem</h2>
  <p class="intro">Rehberden ve güncel ESAIC belgelerinden çıkarılmış adımlar. Tamamladıklarınızı işaretleyin; işaretler yalnız bu tarayıcıda saklanır.</p>
  <div class="viz"><div data-viz="liste"></div></div>
</section>`,
};

/* ================= DERSLER ================= */
SAYFALAR['dersler'] = {
  grup: 'dersler', eyebrow: 'Dersler', baslik: 'Ders bölümleri',
  lede: 'Sınav konuları, bir kaynak kitabın bölümleri sırasıyla ve her bölüm kendi animasyonlarıyla işlenecek. İlk modül fizyoloji; diğer modüller sırayla eklenecek.',
  html: `
<section class="wrap blk">
  <div class="modul">
    <a class="card" href="#/dersler/fizyoloji"><span class="no">01 · Yayında · bölüm bölüm</span><h3>Fizyoloji</h3><p class="small muted">Solunum, kardiyovasküler, nöro, böbrek, karaciğer, endokrin; gebelik, çocukluk, yaşlanma; koagülasyon, asit–baz; fizyolojik ölçüm.</p><span class="where"><span class="tag basic">Paper A</span><span class="tag basic">SOE 1</span></span></a>
    <a class="card" href="#/dersler/farmakoloji"><span class="no">02 · Yazılıyor · ders ders</span><h3>Farmakoloji</h3><p class="small muted">Farmakokinetik, farmakodinamik, reseptörler; anestezik, analjezik, kas gevşetici, kardiyovasküler ilaçlar; sıvılar, antimikrobiyaller, koagülasyon, hormonlar.</p><span class="where"><span class="tag basic">Paper A</span><span class="tag basic">SOE 2</span></span></a>
    <div class="card planned"><span class="no">03 · Planlanıyor</span><h3>Fizik ve klinik ölçüm</h3><p class="small muted">Gazlar, buharlar, akım ve basınç; monitörler, makine ve ventilatör; elektrik güvenliği.</p><span class="where"><span class="tag basic">Paper A</span><span class="tag basic">SOE 2</span></span></div>
    <div class="card planned"><span class="no">04 · Planlanıyor</span><h3>Anatomi</h3><p class="small muted">Baş, boyun, toraks, omurga; periferik sinirler ve damarlar; yüzey işaretleri.</p><span class="where"><span class="tag basic">Paper A</span><span class="tag basic">SOE 1</span></span></div>
    <div class="card planned"><span class="no">05 · Planlanıyor</span><h3>İstatistik</h3><p class="small muted">Veri, olasılık, dağılımlar; parametrik ve parametrik olmayan testler.</p><span class="where"><span class="tag basic">Paper A</span></span></div>
    <div class="card planned"><span class="no">06 · Planlanıyor</span><h3>Klinik anesteziyoloji</h3><p class="small muted">Preoperatif değerlendirme, genel ve rejyonel anestezi, obstetrik, yan dallar, komplikasyonlar.</p><span class="where"><span class="tag clin">Paper B</span><span class="tag clin">SOE 3</span></span></div>
    <div class="card planned"><span class="no">07 · Planlanıyor</span><h3>Yoğun bakım</h3><p class="small muted">Dolaşım ve solunum yetmezliği, sepsis, sıvı-elektrolit, böbrek yetmezliği, travma, etik.</p><span class="where"><span class="tag clin">Paper B</span><span class="tag clin">SOE 4</span></span></div>
    <div class="card planned"><span class="no">08 · Planlanıyor</span><h3>Resüsitasyon ve acil tıp</h3><p class="small muted">Temel ve ileri yaşam desteği, hastane öncesi bakım, travma, transport.</p><span class="where"><span class="tag clin">Paper B</span><span class="tag clin">SOE 4</span></span></div>
    <div class="card planned"><span class="no">09 · Planlanıyor</span><h3>Ağrı</h3><p class="small muted">Ağrı fizyolojisi, akut ve kronik ağrı tedavisi, multidisipliner bakım, terminal dönem.</p><span class="where"><span class="tag clin">Paper B</span></span></div>
  </div>
  <p class="small muted" style="margin-top:12px">Etiketler konunun nerede sınandığını gösterir (Hazırlık › Beklenen bilgi). [[S6 s. 4–9]]</p>
</section>`,
};

SAYFALAR['dersler/fizyoloji'] = {
  grup: 'dersler', eyebrow: 'Dersler · 01', baslik: 'Fizyoloji',
  lede: 'Fizyoloji Part I\'de Paper A\'nın, Part II\'de SOE 1\'in konusudur. SOE 1, 10 dakika önce verilen bir fizyoloji sorusuyla açılır; rehbere göre kardiyovasküler ve solunum fizyolojisi ayrıntılı sorulur. [[S6 s. 7]] [[S6 s. 9]] Dersler Chambers, Huang ve Matthews\'in Basic Physiology for Anaesthetists kitabının 89 bölümünü sırayla izler [[K1]]; kitapta olmayan konular Power ve Kam\'dan ek derslerle tamamlanır [[K2]].',
  html: `
<section class="wrap blk">
  <h2>Kapsam (rehbere göre)</h2>
  <div class="cols" style="margin-top:14px">
    <div class="card basic"><h3>Beklenen bilgi</h3><ul>
      <li>Solunum, kardiyovasküler ve nörofizyoloji</li>
      <li>Böbrek ve karaciğer fizyolojisi, endokrinoloji</li>
      <li>Gebelik, çocukluk ve yaşlanma fizyolojisi</li>
      <li>Koagülasyon ve asit–baz düzenlenmesi</li>
      <li>Fizyolojik ölçüm: kan basıncı, kalp debisi, akciğer, böbrek ve karaciğer fonksiyonu, kan gazı analizi, koagülasyon</li>
    </ul><p class="small muted">Normal ve patolojik fizyoloji ile biyokimya birlikte. [[S6 s. 4]]</p></div>
    <div class="card basic"><h3>Nasıl sınanır?</h3><ul>
      <li><b>Paper A:</b> temel bilim kâğıdındaki MTF soruları. [[S6 s. 6]]</li>
      <li><b>SOE 1:</b> fizyoloji sorusuyla açılır; fizyoloji ve patofizyolojinin bütün konuları sorulabilir; en az bir anatomi sorusu eşlik eder. [[S6 s. 7]]</li>
      <li>Temel bilim SOE'leri bilginin anestezi ve yoğun bakım pratiğine uygulanışını sınar: ezber değil, kavrayış ve uygulama. [[S6 s. 9]]</li>
      <li>Grafik çizmek avantajdır; ör. oksijen taşınması sorusunda değerleri işaretli dissosiyasyon eğrileri. <a href="#/hazirlik/part2">Örnek →</a> [[S6 s. 11]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Her bölüm nasıl işlenecek?</h2>
  <ol class="ders-format" style="margin-top:14px">
    <li><b>Animasyon</b>Bölümün ana mekanizması adım adım, oynatılıp durdurulabilen bir animasyonla.</li>
    <li><b>Temel kavramlar</b>Tanımlar, denklemler ve bilinmesi gereken değerler, birimleriyle.</li>
    <li><b>Part I'de</b>Konunun MTF önermelerine dönüşebilecek noktaları; atlas için yazılmış örnek önermeler.</li>
    <li><b>Part II'de</b>SOE 1 tarzı bir açılış sorusu, yapılandırılmış cevap iskeleti ve çizilecek grafik.</li>
    <li><b>Kendini sına</b>Bölüm sonu soruları ve ilerleme kaydı.</li>
  </ol>
</section>

<section class="wrap blk">
  <h2>Bölümler</h2>
  <p class="intro">Hazır bölümler bağlantılıdır; tamamladıklarınız bu tarayıcıda işaretli kalır. Ders metinleri ve çizimler bu atlas için yazılmıştır; kitaplardan kopyalanmaz.</p>
  <div class="viz"><div data-viz="icindekiler"></div></div>
</section>`,
};

SAYFALAR['dersler/farmakoloji'] = {
  grup: 'dersler', eyebrow: 'Dersler · 02', baslik: 'Farmakoloji',
  lede: 'Farmakoloji Part I\'de Paper A\'nın, Part II\'de SOE 2\'nin konusudur. SOE 2, 10 dakika önce verilen bir farmakoloji sorusuyla açılır; farmakokinetik ve farmakodinamik ilkeleri ayrıntılı sorulur. [[S6 s. 7]] [[S6 s. 9]] Dersler Peck ve Harris\'in Pharmacology for Anaesthesia and Intensive Care kitabının 26 bölümünü sırayla izler; uzun bölümler kitabın kendi başlıklarına göre birkaç kısa derse bölünür. [[K3]]',
  html: `
<section class="wrap blk">
  <h2>Kapsam (rehbere göre)</h2>
  <div class="cols" style="margin-top:14px">
    <div class="card basic"><h3>Beklenen bilgi</h3><ul>
      <li>İlaç etkisinin temel ilkeleri; farmakokinetik ve farmakodinamik</li>
      <li>Reseptör–ilaç etkileşimi</li>
      <li>İlaçların fizikokimyasal özellikleri ve formülasyonları</li>
      <li>İlaç etkileri ve toksisitesi</li>
      <li>Anestezide ve iç hastalıklarında kullanılan ilaçların farmakolojisi</li>
    </ul><p class="small muted">[[S6 s. 4]]</p></div>
    <div class="card basic"><h3>Nasıl sınanır?</h3><ul>
      <li><b>Paper A:</b> temel bilim kâğıdındaki MTF soruları. [[S6 s. 6]]</li>
      <li><b>SOE 2:</b> farmakoloji sorusuyla açılır ve anestezistle ilgili uygulamalı farmakolojiyi kapsar; en az bir soru klinik ölçümdür. [[S6 s. 7]]</li>
      <li>Anestezi ilaçlarının ve yoğun bakımda sık kullanılan ilaçların farmakolojisi ve toksikolojisi iyi bilinmelidir. [[S6 s. 9]]</li>
    </ul></div>
  </div>
</section>

<section class="wrap blk">
  <h2>Her ders nasıl işlenir?</h2>
  <ol class="ders-format" style="margin-top:14px">
    <li><b>Şekil ve animasyon</b>Her konu bir şekille: etki mekanizması, kinetik eğri, doz–yanıt ya da karşılaştırma.</li>
    <li><b>Kısa anlatım</b>Kitabın bütün bilgisi, tekrar ve dolgu olmadan; ilaç özellikleri kart ve tablolarla.</li>
    <li><b>Part I'de</b>Atlas için yazılmış üç MTF sorusu.</li>
    <li><b>Part II'de</b>SOE 2 tarzı açılış sorusu, cevap iskeleti ve çizilecek grafik.</li>
    <li><b>Kendini sına</b>Özet ve ilerleme kaydı.</li>
  </ol>
</section>

<section class="wrap blk">
  <h2>Dersler</h2>
  <p class="intro">Hazır dersler bağlantılıdır; tamamladıklarınız bu tarayıcıda işaretli kalır. Ders metinleri ve çizimler bu atlas için yazılmıştır; kitaptan kopyalanmaz. Doz ve uygulama bilgileri sınav hazırlığı içindir, klinik karar için güncel ürün bilgisine ve kılavuzlara bakın.</p>
  <div class="viz"><div data-viz="farIcindekiler"></div></div>
</section>`,
};

/* ================= KAYNAKLAR ================= */
SAYFALAR['kaynaklar'] = {
  grup: 'kaynaklar', eyebrow: 'Kaynaklar', baslik: 'Kaynaklar',
  lede: 'S: sınav bilgilerinin dayandığı resmi ESAIC belgeleri. K: ders modüllerinin kaynak kitapları. Metindeki kaynak işaretlerine (S6 · 7, K1 · 3 gibi) basınca ilgili belge ve sayfa görünür.',
  html: `
<section class="wrap blk">
  <div data-viz="kaynaklar"></div>
</section>
<section class="wrap blk">
  <h2>Bu atlasın yöntemi</h2>
  <div class="blk-body"><ul>
    <li>Sınav biçimi, koşullar, tarihler ve ücretler yalnızca ESAIC'in herkese açık belgelerinden alınmış, Türkçe özetlenmiştir. Belgeler arasında fark olduğunda yenisi esas alınmıştır: örneğin 2022 rehberi Part II'yi Şubat–Kasım, güncel Part II sayfası Şubat–Aralık arası olarak verir.</li>
    <li>Hazırlık bölümü ESAIC hazırlık sayfasında "EDAIC Preparation Guide" olarak bağlantılı 2022 tarihli "How to prepare for the EDAIC" rehberine dayanır. Rehberde olmayan ama açıklama için eklenen bilgiler (ör. akciğer grafisi kalite ölçütleri) metinde öyle belirtilmiştir.</li>
    <li>Örnek MTF sorusu, Part II puan senaryoları, şematik grafi ve eğriler bu atlas için hazırlanmıştır ve öyle etiketlenmiştir. Gerçek sınav sorusu ya da "hatırlanan soru" kullanılmaz.</li>
    <li>Tarih ve ücret içeren her bilgi 21 Kasım 2026'da kontrol edilmiştir.</li>
  </ul></div>
</section>`,
};
