(function () {
  'use strict';
  const VIZ = window.VIZ;
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });

  VIZ.an04e_pleksus = el => SEKIL.cizim(el, {
    baslik: 'Pelvis girişinden sakruma',
    giris: 'Ön sakral deliklerden çıkan dalları yukarıdan aşağı izleyin. [[K5 s. 202]]',
    gorunumler: [{
      ad: 'Ön sakral yüz', resim: 'img/anatomi/04e-pleksus.webp', en: 1024, boy: 877,
      noktalar: [
        nokta(514, 147, 'Lumbosakral trunkus', 'Psoasın medial kenarında birleşen L4 ve L5 liflerini pelvis girişinden S1’e kadar izleyin. [[K5 s. 202]]'),
        nokta(397, 296, 'S1 ön dalı', 'En üstteki ön sakral foramenden çıkan S1, sakroiliak eklemin önünde lumbosakral trunkusla birleşir. [[K5 s. 202]]'),
        nokta(390, 394, 'S2 ön dalı', 'S2’nin ön dalı bütünüyle sakral pleksusa katılır. [[K5 s. 201]]'),
        nokta(398, 485, 'S3 ön dalı', 'S3 lifleri üçüncü ön sakral foramenden pelvis boşluğuna çıkar. [[K5 s. 202]]'),
        nokta(410, 568, 'S4 ön dalı', 'S4 lifleri sakral ve koksigeal pleksuslar arasında paylaşılır. [[K5 s. 201–202]]'),
        nokta(608, 326, 'Piriformis', 'Pelvik fasya ile kasın ön yüzü arasındaki kökler pelvisin arka duvarındadır. [[K5 s. 202]]'),
        nokta(285, 726, 'Koksiks', 'S5, sakrumun alt lateral köşesi ile koksiksin transvers çıkıntısı arasından çıkar. [[K5 s. 202]]'),
      ],
    }],
  });

  VIZ.an04e_rotator = el => SEKIL.cizim(el, {
    baslik: 'Derin gluteal kasları bulun',
    giris: 'Gluteus maksimusun derininde, gemellusları aralarındaki tendona göre ayırt edin. [[K5 s. 206]]',
    gorunumler: [{
      ad: 'Arkadan', resim: 'img/anatomi/04e-rotator.webp', en: 1024, boy: 936,
      noktalar: [
        nokta(392, 214, 'Piriformis', 'Büyük siyatik foramenin kasın üstünde kalan bölümünden üst gluteal damarlar ve sinir geçer. [[K5 s. 204]]'),
        nokta(456, 381, 'Siyatik sinir', 'Yassı sinir bandı piriformisin altından kalçaya çıkar ve kısa rotatorların arkasından aşağı iner. [[K5 s. 205–206]]'),
        nokta(629, 410, 'Üst gemellus', 'Obturator internus siniri spina iskiadika çevresindeki kısa gluteal seyri sırasında bu kasa dal verir. [[K5 s. 204]]'),
        nokta(338, 453, 'Obturator internus tendonu', 'Tendon iki gemellus arasındadır ve siyatik sinirin önünden geçer. [[K5 s. 206]]'),
        nokta(635, 510, 'Alt gemellus', 'Kuadratus femoris kasına ulaşan sinir alt gemellusu da inerve eder. [[K5 s. 204]]'),
        nokta(342, 643, 'Kuadratus femoris', 'Siyatik sinirin önündeki kas yatağında alt gemellustan sonra kuadratus femoris gelir. [[K5 s. 206]]'),
      ],
    }],
  });

  VIZ.an04e_kutan = el => SEKIL.cizim(el, {
    baslik: 'Kalça kıvrımından baldıra',
    giris: 'Uyluğun posterior kutanöz sinirinin ana gövdesini kalçaya dönen ince dallardan ayırın. [[K5 s. 205]]',
    gorunumler: [{
      ad: 'Arka yüz', resim: 'img/anatomi/04e-kutan.webp', en: 1024, boy: 1536,
      noktalar: [
        nokta(547, 410, 'Gluteal dallar', 'Gluteus maksimusun alt kenarında yukarı dönen dallar kalçanın alt dış bölümüne dağılır. [[K5 s. 205]]'),
        nokta(504, 782, 'Posterior kutanöz sinir', 'S1–S3 liflerini taşıyan sinir arka uyluğun derisine dallar verir. [[K5 s. 205]]'),
        nokta(502, 1051, 'Popliteal bölge', 'Diz arkasının derisi de uyluğun posterior kutanöz sinirinden dal alır. [[K5 s. 205]]'),
        nokta(506, 1198, 'Üst baldır', 'Ana sinirin seyri baldır ortasına kadar izlenebilir ve üst baldır derisi dallarından pay alır. [[K5 s. 205]]'),
      ],
    }],
  });

  VIZ.an04e_siyatik = el => SEKIL.cizim(el, {
    baslik: 'Piriformis düzeyinde iki görünüm',
    giris: 'Piriformisin alt kenarını bulun ve iki görünümde çıkan sinirleri karşılaştırın. [[K5 s. 205–206]]',
    gorunumler: [{
      ad: 'Olağan çıkış', resim: 'img/anatomi/04e-siyatik.webp', en: 1024, boy: 512, kirp: [0, 0, 512, 512],
      noktalar: [
        nokta(227, 326, 'Ortak gövde', 'Tibial ve ortak peroneal bileşenler genellikle ortak fibröz bir kılıf içerisinde piriformisin altından geçer. [[K5 s. 205–206]]'),
        nokta(250, 189, 'Piriformis', 'Olağan seyirde piriformis, siyatik sinirin gluteal bölgeye çıktığı yerin üstündedir. [[K5 s. 206]]'),
      ],
    }, {
      ad: 'Proksimal ayrılma', resim: 'img/anatomi/04e-siyatik.webp', en: 1024, boy: 512, kirp: [512, 0, 512, 512],
      noktalar: [
        nokta(802, 253, 'Ortak peroneal bileşen', 'Bileşenler pleksustan ayrı çıktığında ortak peroneal sinir genellikle piriformisi deler. [[K5 s. 205]]'),
        nokta(742, 357, 'Tibial bileşen', 'Proksimal ayrılmada gerçek hamstringlere kas dalları doğrudan tibial sinirden gider. [[K5 s. 209]]'),
      ],
    }],
  });

  VIZ.an04e_yuzey = el => SEKIL.cizim(el, {
    baslik: 'Kemik işaretlerini seçin',
    giris: 'Yüzey izdüşümünü kurmak için üç kemik işaretini ve aralarından geçen siniri bulun. [[K5 s. 207]]',
    gorunumler: [{
      ad: 'Arka oblik', resim: 'img/anatomi/04e-yuzey.webp', en: 1024, boy: 1536,
      noktalar: [
        nokta(238, 286, 'Spina iliaka posterior superior', 'Sakral çukurcuğun derininde palpe edilen bu çıkıntı, sinirin yüzey çizgisini başlatan iki işaretten biridir. [[K5 s. 207]]'),
        nokta(413, 826, 'Tuber iskiadikum', 'Tuberin ucu ile spina iliaka posterior superiorun ortası, eğri çizginin başlangıcını verir. [[K5 s. 207]]'),
        nokta(768, 638, 'Büyük trokanter', 'Trokanter ile tuber iskiadikumun ortasını bulun ve izdüşümü bu noktanın hemen medialinden geçirin. [[K5 s. 207]]'),
        nokta(528, 1058, 'Arka uylukta siyatik sinir', 'Kalçadaki eğri arka uyluğun orta hattında dikey bir çizgi olarak devam eder. [[K5 s. 207]]'),
      ],
    }],
  });

  VIZ.an04e_labat = el => SEKIL.cizim(el, {
    baslik: 'Labat yaklaşımının yüzey işaretleri',
    giris: 'Labat yaklaşımında başlangıç çizgisini iki kemik işareti belirler. [[K5 s. 207]]',
    gorunumler: [{
      ad: 'Gluteal yüzey', resim: 'img/anatomi/04e-labat.webp', en: 1024, boy: 683,
      noktalar: [
        nokta(136, 213, 'Arka üst iliak çıkıntı', 'Çizginin pelvik ucu spina iliaka posterior superiordur. [[K5 s. 207]]'),
        nokta(523, 246, 'Büyük trokanter', 'Çizginin femoral ucunu büyük trokanter belirler. [[K5 s. 207]]'),
        nokta(330, 230, 'Çizginin ortası', 'İki kemik işaretini birleştiren çizginin orta noktasından dik inilir. [[K5 s. 207]]'),
        nokta(323, 322, 'Posterior giriş bölgesi', 'K5 giriş noktasını bu dik üzerinde orta noktadan 4–5 cm uzakta tarif eder. [[K5 s. 207]]'),
        nokta(293, 29, 'İliak krest', 'Gluteal enjeksiyon alanının üst sınırını belirlerken kalçanın tüm anatomik genişliği dikkate alınır. [[K5 s. 208]]'),
      ],
    }],
  });

  VIZ.an04e_tibial = el => SEKIL.cizim(el, {
    baslik: 'Fossada sinir ve damar ilişkisi',
    giris: 'Fossa tepesinden aşağı inerken tibial sinirin popliteal damarlara göre yerini izleyin. [[K5 s. 209]]',
    gorunumler: [{
      ad: 'Diz arkası', resim: 'img/anatomi/04e-tibial.webp', en: 1024, boy: 1189,
      noktalar: [
        nokta(507, 188, 'Siyatik sinirin ayrılması', 'Tibial ve ortak peroneal dallar çoğunlukla fossanın tepesinde belirginleşir. [[K5 s. 205]]'),
        nokta(648, 381, 'Ortak peroneal sinir', 'Siyatik sinirin iki terminal dalından daha küçüğüdür. [[K5 s. 209]]'),
        nokta(494, 515, 'Tibial sinir', 'Fossaya girdiğinde popliteal damarların lateralindedir, ilerlerken damarların yüzeyinden geçer. [[K5 s. 209]]'),
        nokta(539, 771, 'Popliteal damarlar', 'Fossanın alt ucunda damarlar tibial sinirin lateralinde kalır. [[K5 s. 209]]'),
        nokta(708, 959, 'Gastroknemius', 'Aşağıda gastroknemiusun iki başı siniri örter. [[K5 s. 209]]'),
      ],
    }],
  });
})();
