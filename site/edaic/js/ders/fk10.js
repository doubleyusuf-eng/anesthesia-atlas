(function () {
  'use strict';
  const VIZ = window.VIZ;
  const n = (x, y, ad, metin) => ({ x, y, ad, metin });
  const boyut = { vb: [640, 280], vbDar: [360, 265] };
  const sayi = x => x.toLocaleString('tr-TR', { maximumFractionDigits: 3 });
  const eksen = (ad, max, adimlar) => ({ ad, min: 0, max, adimlar });
  const orta = { a: 'middle', c: 'b' };

  VIZ.fk10_tup = el => SEKIL.cizim(el, {
    baslik: 'Geçirgen zarla ayrılmış tuz çözeltisi', giris: 'İki kol arasındaki geçiş yolunu izleyin. [[K6 s. 180]]',
    gorunumler: [{ ad: 'Dengede', resim: 'img/fizik/10-u-tupu.webp', en: 1024, boy: 936, noktalar: [
      n(260, 435, 'Çözücü', 'Suyun molekülleri geçirgen zardan her iki yönde geçebilir. [[K6 s. 180]]'),
      n(512, 837, 'Geçirgen zar', 'Bu zar hem suyu hem çözünmüş tuzu geçirir. [[K6 s. 180]]'),
      n(753, 550, 'Karşı koldaki çözelti', 'Dengede tuz derişimleri eşittir ve net difüzyon sıfırdır. [[K6 s. 180]]'),
    ] }],
  });

  VIZ.fk10_fick = el => SEKIL.grafik(el, {
    ...boyut, baslik: 'Aynı gaz ve yüzey alanında Fick ilişkisi',
    x: eksen('Kısmi basınç farkı (göreli)', 1, [0, 0.5, 1]),
    y: eksen('Aktarım hızı (göreli)', 1, [0, 0.5, 1]),
    param: [{ id: 'l', ad: 'Zar kalınlığı', min: 0.5, max: 1, adim: 0.01, deger: 0.5, birim: 'µm' }],
    egriler: [{ f: (x, p) => x * 0.5 / p.l }],
    okuma: p => 'Aynı basınç farkında ' + sayi(p.l) + ' µm kalınlığındaki zardan aktarım, 0,5 µm kalınlığındaki zarın ' + sayi(0.5 / p.l) + ' katıdır. [[K6 s. 181–182]]',
  });

  VIZ.fk10_graham = el => SEKIL.grafik(el, {
    ...boyut, baslik: 'Gaz fazında molekül ağırlığı ve difüzyon hızı',
    x: { ad: 'Molekül ağırlığı oranı', min: 1, max: 4, adimlar: [1, 2, 3, 4] },
    y: eksen('Hız oranı', 1, [0, 0.5, 1]),
    param: [{ id: 'm', ad: 'Referansa göre molekül ağırlığı', min: 1, max: 4, adim: 0.1, deger: 1 }],
    egriler: [{ f: x => 1 / Math.sqrt(x) }],
    noktalar: p => [{ x: p.m, y: 1 / Math.sqrt(p.m) }],
    okuma: p => 'Molekül ağırlığı referansın ' + sayi(p.m) + ' katı olan gaz için hız oranı 1/√' + sayi(p.m) + ' ≈ ' + sayi(1 / Math.sqrt(p.m)) + ' olur. [[K6 s. 181–182]]',
  });

  VIZ.fk10_kabarcik = el => SEKIL.sahne(el, {
    baslik: 'İndüksiyon sırasında azot kabarcığı', vb: [640, 196], vbDar: [360, 196],
    secenek: { id: 'evre', ad: 'N₂O uygulaması', liste: [{ d: 'once', ad: 'İndüksiyon öncesi' }, { d: 'sonra', ad: 'N₂O kana geçince' }] },
    ciz: (S, t, p) => {
      const sonra = p.evre === 'sonra', x = S.w * 0.65;
      return S.kutu(8, 28, S.w - 16, 132, { dolgu: 'crit-soft', renk: 'crit' })
        + S.t(26, 57, 'Kan', { c: 'b' })
        + S.daire(x, 94, sonra ? 55 : 36, { dolgu: 'paper', renk: 'basic' })
        + S.t(x, 99, sonra ? 'N₂ + N₂O' : 'N₂', orta)
        + (sonra ? S.t(55, 87, 'N₂O', orta) + S.ok([[42, 102], [x - 58, 102]], { renk: 'clin', w: 4 }) : '');
    },
    metin: p => (p.evre === 'sonra' ? 'Kandan kabarcığa N₂O difüzyonu kabarcığı büyütebilir.' : 'İndüksiyondan önce azot kabarcığında N₂O kısmi basıncı sıfırdır.') + ' [[K6 s. 184]]',
  });

  VIZ.fk10_gecis = el => SEKIL.sahne(el, {
    vb: [640, 195], vbDar: [360, 195], baslik: 'Eritrositin pulmoner kapillerdeki yolculuğu',
    param: [{ id: 't', ad: 'Kapillere girişten beri geçen süre', min: 0, max: 0.75, adim: 0.01, deger: 0.1, birim: 's' }],
    ciz: (S, t, p) => {
      const x = zaman => 26 + (S.w - 52) * zaman / 0.75;
      return S.t(26, 28, 'Giriş') + S.t(S.w - 26, 28, 'Çıkış', { a: 'end' })
        + S.kutu(16, 48, S.w - 32, 32, { dolgu: 'crit-soft' }) + S.daire(x(p.t), 64, 9, { dolgu: 'crit', renk: 'crit' })
        + S.cizgi([[x(0.1), 83], [x(0.1), 101]], { renk: 'basic' }) + S.t(x(0.1), 124, 'CO₂', orta)
        + S.cizgi([[x(0.3), 90], [x(0.4), 90]], { renk: 'clin', w: 5 })
        + S.t(x(0.35), 124, 'O₂', orta) + S.t(S.w / 2, 168, 'İşaretler: dengenin kurulduğu yer', { a: 'middle' });
    },
    metin: p => (p.t < 0.1 ? 'Her iki gaz için de kısmi basınç farkı sürer.' : p.t < 0.3 ? 'CO₂ dengelenirken O₂ geçişi hâlâ sürer.' : p.t < 0.4 ? 'O₂ için yaklaşık dengelenme aralığındasınız.' : 'Her iki gaz da dengelenmiştir.') + ' [[K6 s. 183]]',
  });

  const test = [
    ['Soluk al', 'Maksimum ekspirasyon', 'Vital kapasite kadar karışım', 'Hasta akciğerini olabildiğince boşaltıp yaklaşık %0,3 CO ve %10 He içeren karışımı solur. [[K6 s. 185–186]]'],
    ['Tut', 'Soluk tutma', '10 saniye', 'Beklerken CO kana geçer, helyumun kana geçen miktarı ihmal edilir. [[K6 s. 186]]'],
    ['Örnekle', 'İlk 0,75 L dışarı', 'Ardından gaz örneği', 'Ölü boşluk yıkandıktan sonra örnek alınır ve ekspirasyon sonu CO kısmi basıncı kızılötesi analizörle ölçülür. [[K6 s. 186]]'],
    ['Hesapla', 'He seyreltmesi → alveol hacmi', 'CO alımı → difüzyon kapasitesi', 'Hesaplanan kapasite hemoglobin derişimine göre düzeltilir ve ölçülen alveol hacmine göre normalize edilir. [[K6 s. 186]]'],
  ];
  VIZ.fk10_test = el => SEKIL.adim(el, {
    baslik: 'Tek soluk yönteminde ölçüm sırası', oto: false, vb: [640, 138], vbDar: [360, 138],
    adimlar: test.map(([ad, ust, alt, metin]) => ({ ad, metin, ciz: S =>
      S.t(S.w / 2, 29, ust, orta) + S.ok([ [S.w / 2, 42], [S.w / 2, 78]], { renk: 'clin' })
      + S.t(S.w / 2, 111, alt, orta) })),
  });

  VIZ.fk10_ozmoz = el => SEKIL.sahne(el, {
    baslik: 'Geçemeyen tanecikler ve net su geçişi', vb: [640, 178], vbDar: [360, 178],
    secenek: { id: 'durum', ad: 'Sağdaki çözelti', liste: ['Hipertonik', 'İzotonik', 'Hipotonik'].map(ad => ({ d: ad, ad })) },
    ciz: (S, t, p) => {
      const m = S.w / 2, yon = p.durum === 'Hipertonik' ? 1 : -1, esit = p.durum === 'İzotonik';
      const noktalar = (merkez, adet) => Array.from({ length: adet }, (_, i) =>
        S.daire(merkez - 25 + (i % 3) * 23, 50 + Math.floor(i / 3) * 21, 5, { dolgu: 'basic', renk: 'basic' })).join('');
      return S.kutu(8, 10, S.w - 16, 115, { dolgu: 'basic-soft' })
        + S.cizgi([[m, 10], [m, 125]], { renk: 'ink', kesik: true })
        + noktalar(m / 2, 3) + noktalar(m * 1.5, esit ? 3 : yon === 1 ? 6 : 1)
        + (esit ? '' : S.ok([[m - yon * 40, 99], [m + yon * 40, 99]], { renk: 'clin', w: 4 }))
        + S.t(m, 155, esit ? 'Net su geçişi yok' : 'Ok: net su geçişi', orta);
    },
    metin: p => (p.durum === 'İzotonik' ? 'Su iki yönde eşit hızla geçer.' : 'Su, geçemeyen taneciklerin daha yoğun olduğu ' + (p.durum === 'Hipertonik' ? 'sağ' : 'sol') + ' tarafa net geçiş gösterir.') + ' [[K6 s. 186–187]]',
  });

  VIZ.fk10_henry = el => SEKIL.grafik(el, {
    ...boyut, baslik: 'Sabit sıcaklıkta kısmi basınç ve çözünmüş gaz',
    x: eksen('N₂O kısmi basıncı (kPa)', 101, [0, 50.5, 101]),
    y: eksen('Çözünmüş N₂O (mL)', 47, [0, 23.5, 47]),
    param: [{ id: 'p', ad: 'N₂O kısmi basıncı', min: 0, max: 101, adim: 0.5, deger: 101, birim: 'kPa' }],
    egriler: [{ f: x => 47 * x / 101 }], noktalar: p => [{ x: p.p, y: 47 * p.p / 101 }],
    okuma: p => '37 °C’de 100 mL kan için ' + sayi(p.p) + ' kPa değerinde hesaplanan çözünmüş N₂O hacmi ' + sayi(47 * p.p / 101) + ' mL’dir. [[K6 s. 188]] [[K6 s. 191]]',
  });

  VIZ.fk10_dagilim = el => SEKIL.grafik(el, {
    ...boyut, baslik: 'Dengede gaz ve kan derişimleri',
    x: eksen('Gazdaki derişim (%)', 8, [0, 4, 8]), y: eksen('Kandaki derişim (%)', 4, [0, 2, 4]),
    param: [{ id: 'c', ad: 'Gazdaki derişim', min: 0, max: 8, adim: 0.1, deger: 8, birim: '%' }],
    egriler: [{ f: x => 0.5 * x }], noktalar: p => [{ x: p.c, y: 0.5 * p.c }],
    okuma: p => 'Kan/gaz katsayısı 0,5 olan ajan için dengede kan derişimi %' + sayi(p.c) + ' × 0,5 = %' + sayi(p.c * 0.5) + ' olur. [[K6 s. 191]]',
  });

  VIZ.fk10_raoult = el => SEKIL.grafik(el, {
    ...boyut, baslik: 'Raoult yasasında buhar basıncı düşüşü',
    x: eksen('Çözünen derişimi (göreli)', 1, [0, 0.5, 1]), y: eksen('Basınç düşüşü (göreli)', 1, [0, 0.5, 1]),
    param: [{ id: 'c', ad: 'Göreli tanecik derişimi', min: 0, max: 1, adim: 0.01, deger: 0.5 }],
    egriler: [{ f: x => x }], noktalar: p => [{ x: p.c, y: p.c }],
    okuma: p => 'Derişim referansın %' + sayi(100 * p.c) + ' kadarken buhar basıncındaki düşüş de referans düşüşün %' + sayi(100 * p.c) + ' kadardır. [[K6 s. 192–193]]',
  });

  VIZ.fk10_ozmometre = el => SEKIL.cizim(el, {
    baslik: 'Donma noktası ozmometresinin ölçüm bölümü', giris: 'Sıcaklık probu ile karıştırıcının uçlarını numune içinde bulun. [[K6 s. 193]]',
    gorunumler: [{ ad: 'Ölçüm haznesi', resim: 'img/fizik/10-ozmometre.webp', en: 1024, boy: 683, noktalar: [
      n(523, 341, 'Numune haznesi', 'Numune burada sıvı ve buzun dengede olduğu kıvama gelir. [[K6 s. 193]]'),
      n(427, 454, 'Karıştırıcı', 'Numune soğutulurken sürekli karıştırılır. [[K6 s. 193]]'),
      n(601, 450, 'Termistör', 'Hassas sıcaklık probu donma noktasındaki küçük değişiklikleri ölçer. [[K6 s. 193]]'),
      n(742, 314, 'Soğutma bölmesi', 'Numune bu bölmede beklenen donma noktasının altına soğutulur. [[K6 s. 193]]'),
    ] }],
  });
})();
