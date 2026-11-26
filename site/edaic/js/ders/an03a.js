(() => {
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });
  const cizimler = {
    servikal: { baslik: 'Tipik servikal vertebra · üstten', giris: 'Önde gövdeyi, arkada iki uçlu spinöz çıkıntıyı bulun. [[K5 s. 109–111]]', noktalar: [
      nokta(506, 122, 'Gövde', 'Tipik servikal gövde küçük ve yassıdır. [[K5 s. 109]]'),
      nokta(504, 331, 'Vertebral foramen', 'Ortadaki geniş açıklığın biçimi üçgene yaklaşır. [[K5 s. 109]]'),
      nokta(779, 179, 'Foramen transversarium', 'Vertebral damarların geçtiği açıklık transvers çıkıntının içindedir. [[K5 s. 109]]'),
      nokta(883, 97, 'Ön tüberkül', 'Ön kökün lateral ucunda yer alır. [[K5 s. 109]]'),
      nokta(862, 185, 'Kostotransvers çubuk', 'İki kök foramenin lateralinde bu kemik köprüyle birleşir. [[K5 s. 109]]'),
      nokta(912, 264, 'Arka tüberkül', 'Arka kökün lateral ucunu işaretler. [[K5 s. 109]]'),
      nokta(276, 352, 'Üst eklem yüzü', 'Pedikülle lamina arasındaki artiküler sütunun üst faseti yukarı ve arkaya bakar. [[K5 s. 109]]'),
      nokta(389, 439, 'Lamina', 'Lamina nöral arkın arka bölümünü oluşturur. [[K5 s. 109]] [[K5 s. 111]]'),
      nokta(460, 613, 'Bifid spinöz çıkıntı', 'İki uç tek ve kısa bir spinöz çıkıntıya aittir. [[K5 s. 110–111]]')
    ] },
    atlas: { baslik: 'Atlas · üstten', giris: 'Ön ark üstte, arka ark altta görülüyor. [[K5 s. 110–112]]', noktalar: [
      nokta(513, 89, 'Ön tüberkül', 'Ön arkın ön yüzündedir. [[K5 s. 110]]'),
      nokta(419, 120, 'Ön ark', 'Arka yüzündeki fasete C2’nin densi dayanır. [[K5 s. 110–111]]'),
      nokta(310, 265, 'Üst eklem yüzü', 'Lateral kitlenin belirgin konkav üst yüzü oksipital kondille eklemleşir. [[K5 s. 110]]'),
      nokta(820, 304, 'Foramen transversarium', 'Transvers çıkıntıdaki açıklık lateral kitlenin dış yanındadır. [[K5 s. 112]]'),
      nokta(932, 295, 'Transvers çıkıntı', 'Lateral kitleden uzanan uzun çıkıntıda tüberkül bulunmaz. [[K5 s. 110]]'),
      nokta(689, 469, 'Vertebral arter oluğu', 'Üst fasetin hemen arkasındaki geniş, derin oluktan vertebral arter ve C1’in posterior primer dalı geçer. [[K5 s. 110]]'),
      nokta(391, 539, 'Arka ark', 'Ön ve arka arkları iki yanda kalın lateral kitleler birleştirir. [[K5 s. 110]]'),
      nokta(512, 598, 'Arka tüberkül', 'Spinöz çıkıntının yerini küçük bir tüberkül alır. [[K5 s. 110]]')
    ] },
    torasik: { baslik: 'Orta torasik vertebra · yandan', giris: 'Gövde solda, spinöz çıkıntı sağda ve aşağıdadır. [[K5 s. 110]] [[K5 s. 114]]', noktalar: [
      nokta(207, 287, 'Gövde', 'Tipik torasik gövde klasik kalp biçimindedir. [[K5 s. 113]]'),
      nokta(360, 208, 'Üst yarım faset', 'Kosta başına bakan üst yarım faset pedikül tabanında, gövdenin üst kenarındadır. [[K5 s. 113]]'),
      nokta(349, 392, 'Alt yarım faset', 'Alt yarım faset gövdenin alt kenarında, alt vertebral çentiğin önündedir. [[K5 s. 113]]'),
      nokta(436, 253, 'Pedikül', 'Pediküller gövdeden doğrudan arkaya uzanır. [[K5 s. 113–114]]'),
      nokta(425, 312, 'Alt çentik', 'Alt çentik derindir, üst çentik ise T1 dışında belirsizdir. [[K5 s. 114]]'),
      nokta(557, 65, 'Üst eklem yüzü', 'Üst faset arkaya ve dışa, alt faset öne ve içe yönelir. [[K5 s. 114]]'),
      nokta(784, 214, 'Kosta tüberkülü için faset', 'Arkaya ve dışa uzanan büyük transvers çıkıntının uç faseti, aynı düzeydeki kostanın tüberkülüyle eklemleşir. [[K5 s. 114]]'),
      nokta(756, 550, 'Spinöz çıkıntı', 'Orta torasik bölgede uzun spinöz çıkıntı kaudale eğimlidir. [[K5 s. 114]]')
    ] },
    lomber: { baslik: 'L3 · üstten', giris: 'Gövde üstte, tek spinöz çıkıntı altta görülüyor. [[K5 s. 114–116]]', noktalar: [
      nokta(505, 140, 'Gövde', 'Büyük lomber gövde böbrek biçimindedir. [[K5 s. 114]]'),
      nokta(510, 355, 'Vertebral foramen', 'Kabaca üçgen açıklık torasik foramenlerden geniş, servikal foramenlerden dardır. [[K5 s. 114]]'),
      nokta(369, 313, 'Pedikül', 'Kalın pedikülün üst çentiği sığdır. [[K5 s. 114]]'),
      nokta(838, 382, 'Transvers çıkıntı', 'İnce çıkıntının boyu L1’den L3’e artar, sonra yeniden azalır; üçüncü transvers çıkıntı en uzunudur. [[K5 s. 114]]'),
      nokta(628, 404, 'Üst eklem yüzü', 'Üst yüz arkaya ve içe bakar, alt yüz ise öne ve dışa yönelir. [[K5 s. 115]]'),
      nokta(441, 475, 'Lamina', 'Lomber laminalar kısa, geniş ve sağlamdır. [[K5 s. 115]]'),
      nokta(505, 591, 'Spinöz çıkıntı', 'Spinöz çıkıntı yatay uzanır ve dikdörtgene yakın biçimdedir. [[K5 s. 115]]')
    ] },
    egri: { dosya: 'egrilik', boy: 683, baslik: 'Omurga eğriliklerinin gelişimi', giris: 'Üç yandan görünümde ön taraf solda, arka taraf sağdadır. [[K5 s. 109]]', noktalar: [
      nokta(218, 232, 'Fetüs', 'Fetal omurga öne konkav tek bir yay oluşturur. [[K5 s. 109]]'),
      nokta(429, 74, 'Baş kontrolü · servikal lordoz', 'Yenidoğan başını dik tutabildiğinde boyunda öne konveks kompansatuvar eğrilik gelişir. [[K5 s. 109]]'),
      nokta(773, 419, 'Oturma ve ayakta durma · lomber lordoz', 'Çocuk önce oturmayı, ardından ayakta durmayı öğrendikçe belde öne konveks eğrilik belirir. [[K5 s. 109]]')
    ] },
    isaret: { dosya: 'palpasyon', boy: 512, baslik: 'Palpasyonda iki yüzey işareti', giris: 'Solda ense arkadan, sağda lomber gövdeler ve pelvis önden görülür. [[K5 s. 111]] [[K5 s. 118–119]]', noktalar: [
      nokta(256, 339, 'C7 · ense oluğu', 'Ense oluğunda aşağı inerken ilk belirgin spinöz çıkıntı C7’ye aittir. [[K5 s. 111]]'),
      nokta(256, 408, 'T1 · ilk kaburga düzeyi', 'C7’nin hemen altındaki T1 spinöz çıkıntısı en kolay palpe edilendir. [[K5 s. 111]] [[K5 s. 114]]'),
      nokta(598, 195, 'İliak krest', 'İki krestin en yüksek noktalarını birleştiren interkristal çizgi genellikle L4 gövdesini keser. [[K5 s. 118–119]]'),
      nokta(747, 145, 'L3 gövdesi', 'İnterkristal çizginin hemen üstündeki aralık genellikle L3 ile L4 arasındadır. [[K5 s. 119]]'),
      nokta(791, 197, 'L4 gövdesi', 'Çizginin gövdeden geçtiği olağan düzey dördüncü lomber vertebradır. [[K5 s. 118–119]]'),
      nokta(748, 251, 'L5 gövdesi', 'Çizginin hemen altındaki aralık genellikle L4 ile L5 arasındadır. [[K5 s. 119]]')
    ] },
    yaklasim: { dosya: 'aralik', boy: 437, baslik: 'Spinöz çıkıntıların eğimi ve giriş aralığı', giris: 'Solda orta torasik, ortada lomber omurlar yandan, sağda fleksiyondaki lomber aralık arkadan görülür. [[K5 s. 114–115]] [[K5 s. 117]]', noktalar: [
      nokta(224, 215, 'Orta torasik · sefalad yön', 'Kaudale eğik spinöz çıkıntılar arasından orta hatta geçiş için iğne belirgin biçimde başa yöneltilir. [[K5 s. 114]]'),
      nokta(611, 131, 'Lomber · orta hat', 'Yatay lomber spinöz çıkıntının üst kenarı, gövdeyle ve sırt derisiyle yaklaşık 90° açı yapar. [[K5 s. 114]]'),
      nokta(824, 172, 'Fleksiyon · genişleyen aralık', 'Öne fleksiyon interlaminar pencereyi genişletir. [[K5 s. 115]] Ekstansiyona göre daha fazla ligamentum flavum açığa çıkar. [[K5 s. 117]]')
    ] },
  };

  function resim(el, id) {
    const { baslik, giris, noktalar, dosya = id, boy = 683 } = cizimler[id];
    return SEKIL.cizim(el, { baslik, giris, gorunumler: [{
      ad: baslik, resim: 'img/anatomi/03a-' + dosya + '.webp', en: 1024, boy, noktalar
    }] });
  }
  VIZ.an03a_servikal = (el) => resim(el, 'servikal');
  VIZ.an03a_atlas = (el) => resim(el, 'atlas');
  VIZ.an03a_torasik = (el) => resim(el, 'torasik');
  VIZ.an03a_lomber = (el) => resim(el, 'lomber');
  VIZ.an03a_egri = (el) => resim(el, 'egri');
  VIZ.an03a_isaret = (el) => resim(el, 'isaret');
  VIZ.an03a_yaklasim = (el) => resim(el, 'yaklasim');

  VIZ.an03a_katman = (el) => {
    const katmanlar = SAYFALAR['dersler/anatomi/03a'].katmanlar;
    return SEKIL.adim(el, { baslik: 'Orta hatta yüzeyden derine', vb: [300, 206], oto: false,
      adimlar: katmanlar.map(({ad, metin}, secili) => ({ ad, metin, ciz: () =>
        katmanlar.map((katman, i) => {
          const y = 5 + i * 33;
          const zemin = i === secili ? '#225f60' : '#eee6d8';
          const yazi = i === secili ? '#fff' : '#3b3831';
          return `<rect x="32" y="${y}" width="236" height="29" rx="5" fill="${zemin}"/><text x="150" y="${y+20}" text-anchor="middle" style="fill:${yazi}">${katman.ad}</text>`;
        }).join('') }))
    });
  };
})();
