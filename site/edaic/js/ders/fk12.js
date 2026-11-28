(function () {
  'use strict';
  const VIZ = window.VIZ;
  const sec = (ad, liste) => ({ id: 'secim', ad, liste: liste.map(([d, ad]) => ({ d, ad })) });
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });
  const orta = (S, y, metin) => S.t(180, y, metin, { a: 'middle', c: 'b' });
  const boyut = { vb: [360, 210], vbDar: [360, 210] };

  VIZ.fk12_denge = (el) => SEKIL.sahne(el, {
    ...boyut, baslik: 'Sıvı yüzeyinden ayrılan moleküller',
    secenek: sec('Kap', [['acik', 'Açık şişe'], ['kapali', 'Kapalı kapta denge']]),
    ciz: (S, t, p) => {
      const kapali = p.secim === 'kapali';
      let s = S.kutu(78, 135, 204, 48, { dolgu: 'warn-soft', renk: 'warn', yazi: 'Sıvı', r: 0 });
      s += S.cizgi([[76, 48], [76, 185], [284, 185], [284, 48]], { w: 4 });
      if (kapali) s += S.cizgi([[74, 48], [286, 48]], { w: 6 });
      s += S.ok([[133, 128], [133, 83]], { renk: 'accent' });
      s += kapali ? S.ok([[222, 83], [222, 128]], { renk: 'basic' }) : S.ok([[216, 112], [216, 64], [254, 30]], { renk: 'accent' });
      return s + orta(S, kapali ? 32 : 201, kapali ? 'Doymuş buhar' : 'Çevreye yayılma');
    },
    metin: (p) => p.secim === 'acik' ? 'Yüzeyden ayrılan moleküller havada yayılır. [[K6 s. 211–212]]' : 'Kapalı kapta sıvı ve gaz dengeye gelir ve buharın parsiyel basıncı SVP’ye ulaşır. [[K6 s. 212]]',
  });

  VIZ.fk12_konum = (el) => SEKIL.sahne(el, {
    ...boyut, baslik: 'Taze gazdan hastaya', secenek: sec('Yerleşim', [['vic', 'Devre içi · VIC'], ['voc', 'Devre dışı · VOC']]),
    ciz: (S, t, p) => {
      const ic = p.secim === 'vic';
      const satirlar = ['Taze gaz', ...(ic ? ['Solunum sistemine giriş', 'Buharın katılması'] : ['Buharın katılması', 'Solunum sistemine giriş']), 'Hasta'];
      return satirlar.map((ad, i) => {
        const y = 6 + i * 54;
        return S.kutu(60, y, 240, 36, { yazi: ad, dolgu: ad === 'Buharın katılması' ? 'accent-soft' : 'paper' }) +
          (i < 3 ? S.ok([[180, y + 37], [180, y + 52]]) : '');
      }).join('');
    },
    metin: (p) => p.secim === 'vic' ? 'VIC yerleşiminde gaz solunum sistemine girdikten sonra buharla zenginleşir. [[K6 s. 212–213]]' : 'VOC yerleşiminde buhar, taze gaz solunum sistemine ulaşmadan önce eklenir. [[K6 s. 212–213]]',
  });

  VIZ.fk12_kesit = (el) => SEKIL.cizim(el, {
    baslik: 'Değişken baypaslı vaporizatör kesiti', giris: 'Taşıyıcı gaz hazneden geçerken baypas gazı üst kanalı izler. [[K6 s. 213–214]]',
    gorunumler: [{ ad: 'Plenum', resim: 'img/fizik/12-plenum.webp', en: 1024, boy: 525, noktalar: [
      nokta(90, 155, 'Taze gaz girişi', 'Makinedeki pozitif basınç gazı vaporizatörden geçirir. [[K6 s. 214]]'),
      nokta(490, 157, 'Baypas kanalı', 'Taze gazın bir bölümü hazneye uğramadan çıkışa gider. [[K6 s. 213]]'),
      nokta(495, 315, 'Vaporizasyon haznesi', 'Taşıyıcı gaza burada anestezik buhar katılır. [[K6 s. 213–214]]'),
      nokta(315, 354, 'Fitil', 'Sıvıyı emen fitil buharlaşma yüzeyini genişletir. [[K6 s. 214]]'),
      nokta(535, 445, 'Sıvı ajan', 'Taşınan buhar sıvı rezervuarından yenilenir. [[K6 s. 214]]'),
      nokta(595, 79, 'Metal gövde', 'Gövde çevreden anesteziğe ısı iletir. [[K6 s. 215]]'),
      nokta(943, 155, 'Karışım çıkışı', 'Baypas gazı ile hazneden gelen gaz birleşerek hastaya gider. [[K6 s. 213]]'),
    ] }],
  });

  VIZ.fk12_bolunme = (el) => SEKIL.sahne(el, {
    ...boyut, baslik: 'Bölünme oranından iki kolun akım payına',
    param: [{ id: 'oran', ad: 'Hazne akımı / baypas akımı', min: 0, max: 2, adim: 0.1, deger: 1 }],
    ciz: (S, t, p) => {
      const hazne = p.oran / (1 + p.oran);
      const baypas = 1 - hazne;
      return S.ok([[9, 103], [62, 103]]) +
        S.ok([[62, 103], [62, 65], [299, 65], [299, 99]], { renk: 'basic', w: 1 + 7 * baypas }) +
        (hazne ? S.ok([[62, 103], [62, 147], [299, 147], [299, 107]], { renk: 'accent', w: 1 + 7 * hazne }) :
          S.cizgi([[62, 103], [62, 147], [299, 147], [299, 107]], { kesik: true, soluk: true })) +
        S.ok([[299, 103], [350, 103]]) + orta(S, 48, 'Baypas %' + tr(100 * baypas)) +
        orta(S, 174, 'Hazne %' + tr(100 * hazne));
    },
    metin: (p) => 'Giren taze gazın %' + tr(100 * p.oran / (1 + p.oran)) + ' kadarı hazneye yönelir. [[K6 s. 213–214]] Sıcaklık yükseldiğinde telafiyi görmek için bölünme oranını azaltın. [[K6 s. 215]]',
  });

  VIZ.fk12_boyle = (el) => SEKIL.cizim(el, {
    baslik: 'Boyle şişesi ve ılık su banyosu', giris: 'Başlık, gelen gazı sıvının yüzeyine yöneltir. [[K6 s. 214]]',
    gorunumler: [{ ad: 'Boyle şişesi', resim: 'img/fizik/12-boyle.webp', en: 1024, boy: 1121, noktalar: [
      nokta(509, 122, 'Elle ayarlanan piston', 'Piston hareketi gazın sıvı yüzeyine ne kadar yaklaşacağını belirler. [[K6 s. 214]]'),
      nokta(496, 790, 'Yönlendirici başlık', 'Başlık, gazı uçucu sıvının üzerinden geçirir. [[K6 s. 214]]'),
      nokta(573, 933, 'Sıvı anestezik', 'Ajan şişe içinde buharlaşırken ısı kaybeder. [[K6 s. 214]]'),
      nokta(167, 899, 'Ilık su banyosu', 'Şişe, buharlaşmaya bağlı ısı kaybını karşılamak üzere ılık suya yerleştirilebilirdi. [[K6 s. 214–215]]'),
    ] }],
  });

  VIZ.fk12_telafi = (el) => SEKIL.sahne(el, {
    ...boyut, baslik: 'Isınırken biçim değiştiren eleman',
    secenek: sec('Eleman', [['cubuk', 'Metal çubuk'], ['koruk', 'Sıvılı körük'], ['serit', 'Bimetalik şerit']]),
    ciz: (S, t, p) => {
      const parca = (x, sicak) => {
        if (p.secim === 'cubuk') return S.kutu(x, 82, sicak ? 113 : 79, 19, { dolgu: 'basic-soft', renk: 'basic' }) + S.cizgi([[x + 125, 69], [x + 125, 116]]);
        if (p.secim === 'koruk') {
          const dx = sicak ? 15 : 10;
          const ust = Array.from({ length: 8 }, (_, i) => [x + dx * i, i % 2 ? 67 : 78]);
          const alt = ust.map(([xx, y]) => [xx, 180 - y]).reverse();
          return S.cizgi([...ust, ...alt, ust[0]], { renk: 'clin', dolgu: 'clin-soft' });
        }
        const hat = Array.from({ length: 16 }, (_, i) => [x + i * 7, 99 - (sicak ? 0.15 * i * i : 0)]);
        return S.cizgi(hat, { renk: 'basic', w: 6 }) + S.cizgi(hat.map(([xx, y]) => [xx, y + 6]), { renk: 'warn', w: 5 });
      };
      return parca(12, false) + parca(215, true) + S.ok([[153, 95], [196, 95]], { renk: 'accent' }) +
        S.t(75, 145, 'Başlangıç', { a: 'middle' }) + S.t(275, 145, 'Isınınca', { a: 'middle' });
    },
    metin: (p) => ({
      cubuk: 'Metal çubuk ısınınca uzar ve ucu hazneye taşıyıcı gaz girişini daraltır. [[K6 s. 215]]',
      koruk: 'Körüğün içindeki sıvı ısınınca genleşir ve körük bununla şekil değiştirir. [[K6 s. 215–216]]',
      serit: 'Şeridin iki metalinde genleşme katsayıları farklı olduğundan sıcaklık değiştikçe şeridin bükülmesi değişir. [[K6 s. 216]]',
    })[p.secim],
  });

  const ajanlar = { Sevofluran: [21, 58.6], Halotan: [32, 50.2], İzofluran: [33, 48.5], Desfluran: [88.5, 22.8] };
  const tr = (v) => v.toLocaleString('tr-TR', { maximumFractionDigits: 1 });
  VIZ.fk12_ajan = (el) => SEKIL.sahne(el, {
    vb: [360, 150], baslik: 'Aynı sıcaklıkta ajan karşılaştırması', secenek: sec('Ajan', Object.keys(ajanlar).map((ad) => [ad, ad])),
    ciz: (S, t, p) => {
      const [basinc, kaynama] = ajanlar[p.secim];
      return orta(S, 30, p.secim + ' · ' + tr(basinc) + ' kPa') +
        S.kutu(20, 53, 320, 28, { r: 3 }) + S.kutu(20, 53, 320 * basinc / 88.5, 28, { dolgu: 'basic', renk: 'basic', r: 3 }) +
        orta(S, 120, 'Kaynama noktası ' + tr(kaynama) + ' °C');
    },
    metin: (p) => p.secim + ' için 20 °C’de doymuş buhar basıncı ' + tr(ajanlar[p.secim][0]) + ' kPa’dır. [[K6 s. 216–217]]',
  });

  VIZ.fk12_doygunluk = (el) => SEKIL.grafik(el, {
    vb: [640, 315], vbDar: [360, 290], baslik: 'Hazne gazında parsiyel basınç ve yüzde',
    x: { min: 21, max: 88.5, ad: 'Ajanın parsiyel basıncı (kPa)', adimlar: [21, 33, 88.5] },
    y: { min: 0, max: 100, ad: 'Haznede buhar (%)', adimlar: [0, 50, 100] },
    param: [{ id: 'kismi', ad: 'Buharın parsiyel basıncı', min: 21, max: 88.5, adim: 0.1, deger: 21, birim: 'kPa' }],
    egriler: [{ f: (basinc) => 100 * basinc / 101.3 }],
    noktalar: (p) => [{ x: p.kismi, y: 100 * p.kismi / 101.3 }],
    okuma: (p) => 'Seçilen parsiyel basınçta buharın hazne gazındaki payı yaklaşık %' + tr(100 * p.kismi / 101.3) + ' olarak hesaplanır. [[K6 s. 216–217]] [[K6 s. 219]]',
  });

  VIZ.fk12_sunum = (el) => SEKIL.sahne(el, {
    vb: [360, 300], baslik: 'İki farklı ajan sunum yolu',
    secenek: sec('Yöntem', [['enj', 'Doğrudan enjeksiyon'], ['cift', 'Çift devre']]),
    ciz: (S, t, p) => {
      const cift = p.secim === 'cift';
      let s = S.kutu(5, 10, 156, 54, { yazi: cift ? 'Taze gaz' : ['Dereceli valf', 'Taze gaz'], dolgu: 'basic-soft' }) +
        S.kutu(191, 10, 164, 54, { yazi: cift ? ['Desfluran haznesi', '39 °C · 200 kPa'] : ['Sıvı ajan', 'Basınçlı enjeksiyon'], dolgu: 'warn-soft' });
      if (cift) {
        s += S.ok([[83, 66], [83, 239]], { renk: 'basic' }) +
          S.ok([[273, 66], [273, 141]], { renk: 'accent' }) +
          S.kutu(197, 143, 155, 56, { yazi: ['Basınç düzeltme', 'valfi'] }) +
          S.ok([[273, 201], [273, 239], [90, 239]], { renk: 'accent' }) +
          S.cizgi([[83, 91], [156, 91], [156, 109]], { kesik: true }) +
          S.cizgi([[273, 220], [176, 220], [176, 141]], { kesik: true }) +
          S.kutu(103, 109, 136, 31, { yazi: 'Transdüser' }) +
          S.ok([[158, 141], [158, 169], [194, 169]], { kesik: true });
      } else {
        s += S.ok([[83, 66], [83, 239]], { renk: 'basic' }) +
          S.ok([[273, 66], [273, 137]], { renk: 'accent' }) +
          S.kutu(190, 138, 164, 42, { yazi: 'Püskürtme memesi' }) +
          S.ok([[273, 182], [273, 239], [90, 239]], { renk: 'accent' });
      }
      return s + S.ok([[83, 239], [83, 256]]) + S.kutu(5, 258, 156, 34, { yazi: 'Karışım çıkışı' });
    },
    metin: (p) => p.secim === 'cift' ? 'Kesik çizgiler basınçların karşılaştırılmasını ve valfe giden denetim sinyalini gösterir. [[K6 s. 218–219]]' : 'Gaz akımı arttıkça daha fazla ajan püskürtülür ve çıkış konsantrasyonu korunur. [[K6 s. 218]]',
  });

  // C / C₀ = P₀ / P. İki eksen de deniz seviyesi değerine göre normalleştirilir.
  const bagil = (basincYuzdesi) => 10000 / basincYuzdesi;
  VIZ.fk12_basinc = (el) => SEKIL.grafik(el, {
    vb: [640, 310], vbDar: [360, 290], baslik: 'Ortam basıncı ve bağıl buhar konsantrasyonu',
    x: { min: 50, max: 200, ad: 'Basınç (deniz seviyesinin %’si)', adimlar: [50, 100, 200] },
    y: { min: 50, max: 200, ad: 'Bağıl konsantrasyon (%)', adimlar: [50, 100, 200] },
    param: [{ id: 'oran', ad: 'Deniz seviyesine göre basınç', min: 50, max: 200, adim: 1, deger: 100, birim: '%' }],
    egriler: [{ f: bagil }], noktalar: (p) => [{ x: p.oran, y: bagil(p.oran) }],
    okuma: (p) => 'Ortam basıncı ' + tr(101.3 * p.oran / 100) + ' kPa olduğunda, deniz seviyesi %100 kabul edilirse aynı parsiyel basınçtaki bağıl konsantrasyon %' + tr(bagil(p.oran)) + ' olur. [[K6 s. 219]]',
  });
})();
