(() => {
  'use strict';
  const VIZ = window.VIZ;
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });
  function resim(el, dosya, boy, baslik, giris, noktalar, kirp) {
    return SEKIL.cizim(el, { baslik, giris, gorunumler: [{
      ad: baslik, resim: 'img/anatomi/04b-' + dosya + '.webp', en: 1024, boy, noktalar, kirp
    }] });
  }

  VIZ.an04b_kok = el => resim(el, 'kok', 936, 'Köklerin skalen aralığa girişi',
    'Kökleri foramenlerden laterale doğru izleyerek üst trunkusun nerede oluştuğunu bulun. [[K5 s. 165–166]]', [
      nokta(577, 189, 'C5 kökü', 'En üstteki kök, vertebral damarları içeren transvers foramenin arkasından geçer. [[K5 s. 165]]'),
      nokta(578, 268, 'C6 kökü', 'C6 kökü C5 ile aynı trunkusa katılır. [[K5 s. 166]]'),
      nokta(473, 339, 'Üst trunkus', 'C5 ve C6 liflerini taşıyan bu trunkustan omuz eklemine giden supraskapular sinir erken ayrılır. [[K5 s. 166]] [[K5 s. 171]]'),
      nokta(542, 405, 'C7 kökü', 'C7 kökü başka bir kökle birleşmeden orta trunkus olarak devam eder. [[K5 s. 166]]'),
      nokta(541, 525, 'C8 kökü', 'Alt trunkusun üstten gelen bileşenidir. [[K5 s. 166]]'),
      nokta(544, 628, 'T1 katkısı', 'T1 ön dalının büyük bölümü pleksusa katılır, C8 ile alt trunkusu oluşturur. [[K5 s. 165–166]]')
    ]);

  VIZ.an04b_oluk = el => resim(el, 'oluk', 683, 'İnterskalen aralığın yakın görünümü',
    'İki skalen kasın karşılıklı yüzlerini ve aradaki yağlı dokuda yer alan sinir kesitlerini bulun. [[K5 s. 166–167]]', [
      nokta(485, 212, 'Ön skalen kas', 'Kasın arka yüzündeki fibröz yaprak ön tüberkülden başlar. [[K5 s. 166]]'),
      nokta(579, 301, 'İnterskalen aralık', 'Kökler ve proksimal trunkuslar bu aralıkta yer alır, C6 düzeyinde interskalen bloğun hedefidir. [[K5 s. 171–172]]'),
      nokta(646, 453, 'Orta skalen kas', 'Arka tüberkülden uzanan fibröz yaprak bu kasın ön yüzünü örter. [[K5 s. 166]]'),
      nokta(511, 354, 'Kılıfın arka yaprağı', 'Ön ve arka yapraklar arasında kalan fibroadipöz aralık lateralde pleksusu saran kılıf boyunca devam eder. [[K5 s. 166]]')
    ], [390, 70, 433, 489]);

  VIZ.an04b_kosta = el => resim(el, 'kosta', 683, 'Birinci kosta üzerinde damar ve sinir komşuluğu',
    'Arteri bulun, sonra üstündeki ve arkasındaki trunkusları ayırt edin. [[K5 s. 169]]', [
      nokta(438, 150, 'Üst ve orta trunkuslar', 'İki trunkus birinci kosta üzerinden geçerken arterin üstünde kalır. [[K5 s. 169]]'),
      nokta(461, 215, 'Subklavyen arter', 'Perivasküler yaklaşımın yüzey işareti nabızdır, kitapta hedef nabzın hemen gerisinde tarif edilir. [[K5 s. 173]]'),
      nokta(422, 270, 'Alt trunkus', 'Arterin arkasından geçer ve birinci kostada arter oluğunun gerisinde bir oluk bırakabilir. [[K5 s. 169]]'),
      nokta(592, 198, 'Ön skalen kas', 'İnterskalen oluğu aşağı doğru izlemek skalen kasların birinci kostaya tutunduğu yere götürür. [[K5 s. 173]]'),
      nokta(823, 310, 'Subklavyen ven', 'Subklavyen damarların yakınlığı perivasküler yaklaşımda damar içine enjeksiyon riskini açıklar. [[K5 s. 167]] [[K5 s. 173]]'),
      nokta(538, 499, 'Birinci kosta', 'Bu kemik perivasküler yaklaşımda dayanak olarak kullanılır. [[K5 s. 173]]'),
      nokta(448, 389, 'Plevra', 'Periklaviküler yaklaşımlarda plevra delinirse pnömotoraks gelişebilir. [[K5 s. 173]]')
    ]);

  VIZ.an04b_kord = el => resim(el, 'kord', 683, 'Pektoralis minör ve aksiller damar ekseni',
    'Median sinirin iki başını birleştikleri yerden proksimale doğru izleyin. [[K5 s. 168]]', [
      nokta(622, 301, 'Pektoralis minör', 'Kordların adları arterle bu kasın arkasındaki ilişkilerini anlatır. [[K5 s. 169]]'),
      nokta(440, 351, 'Aksiller arter', 'Kordları tanımlarken referans alınan damardır. [[K5 s. 168–169]]'),
      nokta(389, 364, 'Median sinirin lateral başı', 'Pektoralis minörün lateral kenarında lateral korddan ayrılan bu baş C6–C7 liflerini getirir. [[K5 s. 168–169]]'),
      nokta(497, 414, 'Median sinirin medial başı', 'Medial korddan gelen ikinci baş C8 ve T1 liflerini taşır. [[K5 s. 168]] [[K5 s. 170]]'),
      nokta(439, 556, 'Median sinir', 'Lateral ve medial başların birleşmesiyle oluşur. [[K5 s. 166]] [[K5 s. 168]]')
    ]);

  VIZ.an04b_aksilla = el => resim(el, 'aksilla', 683, 'Üst aksillada terminal sinirlerin seyri',
    'Ana demet boyunca kalan sinirlerle daha proksimalde ayrılan sinirin yollarını karşılaştırın. [[K5 s. 173–174]]', [
      nokta(618, 324, 'Aksiller arter', 'K5’in yüzey tarifinde arter nabzı, kol 90° abdüksiyondayken aksillanın üst bölümünde aranır. [[K5 s. 174]]'),
      nokta(489, 365, 'Aksiller ven', 'Arter ve ven, üst aksillada humerus boyunca terminal sinirlerle birlikte seyreder. [[K5 s. 173]]'),
      nokta(418, 405, 'Üç terminal sinir', 'Bu düzeyde hedeflenen üç sinir median, ulnar ve radial sinirlerdir. [[K5 s. 173]]'),
      nokta(329, 290, 'Müskülokütanöz sinir', 'Genellikle blok düzeyinin üstünde pleksustan ayrıldığından sıklıkla ayrıca hedeflenir. [[K5 s. 174]]')
    ]);
})();
