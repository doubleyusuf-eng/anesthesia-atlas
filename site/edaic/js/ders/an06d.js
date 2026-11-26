(function () {
  'use strict';
  const VIZ = window.VIZ;
  function resim(el, dosya, boy, ad, giris, noktalar, kirp) {
    return SEKIL.cizim(el, {
      baslik: ad, giris,
      gorunumler: [{ ad, resim: 'img/anatomi/06d-' + dosya + '.webp', en: 1024, boy, kirp, noktalar }]
    });
  }
  VIZ.an06d_orbita = el => resim(el, 'orbita', 437, 'Orbita, yandan',
    'Lateral rektusu göz küresinden arkaya doğru izleyin. [[K5 s. 275]]', [
      { x: 332, y: 216, ad: 'Lateral rektus', metin: 'Abdusensin tek kas hedefidir. [[K5 s. 275]]' },
      { x: 671, y: 211, ad: 'Abdusens', metin: 'Kas kaldırıldığında sinirin derin yüze giriş yeri görülür. [[K5 s. 275]]' },
      { x: 172, y: 164, ad: 'Göz küresi', metin: 'VI hasarında bu göz dışa dönemez. [[K5 s. 275]]' }
    ]);
  VIZ.an06d_pons = el => resim(el, 'pons', 1536, 'Dördüncü ventrikül tabanı, arkadan',
    'Fasiyal liflerin pons içindeki dönüşünü yüzeydeki kabartıdan tanıyın. [[K5 s. 276]]', [
      { x: 488, y: 522, ad: 'Dördüncü ventrikül tabanı', metin: 'Abdusens çekirdeği tabanın hemen derininde yer alır. [[K5 s. 275]]' },
      { x: 572, y: 651, ad: 'Fasiyal kollikulus', metin: 'Fasiyal motor liflerin VI çekirdeği üzerinden dönüşü bu kabartıyı oluşturur. [[K5 s. 276]]' }
    ], [250, 325, 525, 690]);
  VIZ.an06d_temporal = el => resim(el, 'temporal', 683, 'Temporal kemiğin alt yüzü',
    'Fasiyal sinirin kemikten çıkış yerini iki çıkıntı arasında bulun. [[K5 s. 276–277]]', [
      { x: 488, y: 377, ad: 'Stilomastoid foramen', metin: 'VII burada temporal kemiği terk eder. [[K5 s. 276–277]]' },
      { x: 416, y: 459, ad: 'Stiloid çıkıntı', metin: 'Ana gövde bu çıkıntının lateralinden geçer. [[K5 s. 277]]' },
      { x: 639, y: 506, ad: 'Mastoid çıkıntı', metin: 'Posterior auriküler sinir mastoid üzerinden arkaya döner. [[K5 s. 277]]' },
      { x: 858, y: 254, ad: 'Kemik dış işitme kanalı', metin: 'Ana gövde bu kanal ile mastoid çıkıntı arasındaki aralıkta cerrahi olarak bulunabilir. [[K5 s. 277]]' }
    ]);
  VIZ.an06d_parotis = el => resim(el, 'parotis', 936, 'Parotis bölgesinden yüz ve boyna',
    'Terminal dalları hedef kaslarına doğru izleyin. [[K5 s. 277–278]]', [
      { x: 705, y: 405, ad: 'Parotis', metin: 'Bez dokusu gelişim sırasında sinirin iki bölümü arasına uzanır ve dalları sarar. [[K5 s. 277]]' },
      { x: 510, y: 287, ad: 'Temporal dallar', metin: 'Zigomatik arkı geçip kulak kaslarına, oksipitofrontalisin frontal karnına ve orbikülaris okuliye ulaşırlar. [[K5 s. 278]]' },
      { x: 405, y: 346, ad: 'Zigomatik dallar', metin: 'Zigomatik kemiği aşıp orbikülaris okuliye giderler. [[K5 s. 278]]' },
      { x: 463, y: 514, ad: 'Bukkal dallar', metin: 'Öne yatay ilerleyerek buksinatörü ve dudak kaslarını uyarırlar. [[K5 s. 278]]' },
      { x: 412, y: 688, ad: 'Mandibular dal', metin: 'Mandibula üzerinden öne uzanıp alt dudak ve çene kaslarına ulaşır. [[K5 s. 278]]' },
      { x: 580, y: 726, ad: 'Servikal dal', metin: 'Boyunda aşağı ve öne yönelerek platismayı uyarır. [[K5 s. 278]]' }
    ]);
  VIZ.an06d_yuz = el => resim(el, 'yuz', 1121, 'Sol fasiyal paralizi, önden',
    'Hastanın sol alın ve ağız hareketini kendi sağ tarafıyla karşılaştırın. [[K5 s. 278–279]]', [
      { x: 650, y: 321, ad: 'Sol üst yüz', metin: 'Üst yüzün de etkilenmesi, nükleer ya da infranükleer tutulumla uyumludur. [[K5 s. 278–279]]' },
      { x: 610, y: 820, ad: 'Sol alt yüz', metin: 'Tam fasiyal paralizide aynı tarafta alt yüz kasları da etkilenir. [[K5 s. 278]]' }
    ]);
  VIZ.an06d_labirent = el => resim(el, 'labirent', 683, 'İç kulak ve VIII. sinir',
    'İki lif grubunu iç kulaktaki uçlarından ortak sinire kadar izleyin. [[K5 s. 279–281]]', [
      { x: 622, y: 524, ad: 'Koklea', metin: 'Koklear lifler bipolar spiral ganglion hücrelerinin merkezi uzantılarıdır. [[K5 s. 280]]' },
      { x: 758, y: 392, ad: 'Koklear bölüm', metin: 'Lezyonunda işitme kaybına tinnitus eşlik edebilir. [[K5 s. 281]]' },
      { x: 698, y: 333, ad: 'Vestibüler bölüm', metin: 'Denge bilgisini medulladaki vestibüler çekirdeklere taşır. [[K5 s. 281]]' },
      { x: 465, y: 338, ad: 'Vestibüler labirent', metin: 'Bu bölgede veya vestibüloserebellar yolda lezyon vertigo, ataksi ve nistagmus yapar. [[K5 s. 281]]' }
    ]);
})();
