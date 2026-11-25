(function () {
  'use strict';
  const VIZ = window.VIZ;
  const merkez = { a: 'middle', c: 'b' };
  function secim(ad, adlar) {
    return { id: 'sec', ad, liste: adlar.map((etiket, i) => ({ d: String(i), ad: etiket })) };
  }

  VIZ.a12b_kavsak = el => SEKIL.adim(el, {
    baslik: 'Süksametonyumun kavşağa gelişi, blok ve gradyanın tersine dönmesi',
    vb: [640, 215], vbDar: [360, 215], oto: false,
    ortak(S, i) {
      const x = S.w / 2, blok = i === 1;
      const yol = [[x, 56], [x, 111]];
      return S.kutu(8, 8, S.w - 16, 45, { yazi: 'Plazma', dolgu: 'basic-soft' })
        + S.kutu(8, 116, S.w - 16, 87, { renk: blok ? 'crit' : 'clin', dolgu: blok ? 'crit-soft' : 'clin-soft' })
        + S.t(x, 145, 'Nöromüsküler kavşak', merkez)
        + S.t(x, 179, ['Nikotinik reseptör uyarılır', 'Na⁺ kanalları inaktif · iletim kesilir', 'İletim düzelir'][i], { a: 'middle' })
        + (blok ? S.t(x, 89, 'Depolarizasyon sürer', merkez) : S.ok(i === 2 ? yol.reverse() : yol, { renk: 'accent', w: 3 }));
    },
    adimlar: [
      { ad: 'Geliş', metin: 'Plazmadan kavşağa geçen süksametonyum nikotinik ACh reseptörünü uyarır. [[K3 s. 187]]' },
      { ad: 'Blok', metin: 'Kalıcı depolarizasyon çevresindeki uyarılamayan alan, yeni aksiyon potansiyelinin ilerlemesini engeller. [[K3 s. 187]]' },
      { ad: 'Çözülme', metin: 'Plazmadaki hidroliz konsantrasyon gradyanını tersine çevirir. [[K3 s. 187]]' },
    ],
  });

  const risk = [
    ['Sağlıklı', 'Olağan depolarizasyon', 'Küçük artış', 'Normal kasta depolarizasyon serum K⁺ düzeyini az yükseltir. [[K3 s. 188]]'],
    ['Yanık', 'Yanık > %10', 'Ani ve büyük artış olabilir', 'Risk yaklaşık 24 saat sonra başlar ve 18 aya kadar sürebilir. [[K3 s. 188]]'],
    ['Parapleji', 'Kavşak dışı reseptör artışı', 'Ani ve büyük artış olabilir', 'Paraplejide özellikle ilk 6 ay risklidir. [[K3 s. 188]]'],
    ['Kas hastalığı', 'İlerleyici kas tutulumu', 'Risk tutulumla artar', 'İlerleyici kas hastalığında tutulan kas miktarı arttıkça risk büyür. [[K3 s. 188]]'],
  ];
  VIZ.a12b_potasyum = el => SEKIL.sahne(el, {
    baslik: 'Klinik duruma göre depolarizasyona potasyum yanıtı', vb: [640, 210], vbDar: [360, 210],
    secenek: secim('Klinik durum', risk.map(r => r[0])),
    ciz(S, t, p) {
      const x = S.w / 2, r = risk[p.sec];
      return S.kutu(12, 8, S.w - 24, 61, { yazi: ['Kas yüzeyi', r[1]], dolgu: 'basic-soft' })
        + S.ok([[x, 74], [x, 123]], { renk: 'accent', w: 3 })
        + S.t(x + 13, 103, 'K⁺', { c: 'b' })
        + S.kutu(12, 130, S.w - 24, 67, { yazi: ['Serum K⁺', r[2]], dolgu: p.sec === '0' ? 'clin-soft' : 'warn-soft' });
    },
    metin: p => risk[p.sec][3],
  });

  VIZ.a12b_kalsiyum = el => SEKIL.adim(el, {
    baslik: 'Malign hipertermide kalsiyum akışı ve metabolik sonuçları', vb: [640, 255], vbDar: [360, 255], oto: false,
    ortak(S, i) {
      const x = S.w / 2;
      const akis = [[x, 57], [x, 111]];
      return S.kutu(12, 6, S.w - 24, 46, { yazi: 'Sarkoplazmik retikulum', dolgu: 'basic-soft' })
        + (i < 2 ? S.ok(i === 1 ? akis.reverse() : akis, { renk: 'accent', w: 3 }) : '')
        + S.t(i < 2 ? x + 18 : x, 89, i === 1 ? 'Ca²⁺ · ATP' : i === 0 ? 'Ca²⁺ · RYR1' : 'Hücre yıkımı', i === 2 ? merkez : {})
        + S.kutu(12, 119, S.w - 24, 46, { yazi: 'Kas hücresi', dolgu: 'clin-soft' })
        + S.t(x, 207, [['Aşırı salınım', 'Yaygın rijidite'], ['Geri taşıma', 'CO₂, ısı ve laktat artışı'], ['Miyoglobinemi', 'Hiperkalemi']][i], merkez);
    },
    adimlar: [
      { ad: 'Salınım', metin: 'Anormal RYR1 kanalı sitoplazmaya aşırı Ca²⁺ geçişine izin verir. [[K3 s. 189]]' },
      { ad: 'Geri taşıma', metin: 'Ca²⁺ retikuluma geri pompalanırken artan ATP tüketimine CO₂, ısı ve laktat üretimi eşlik eder. [[K3 s. 189]]' },
      { ad: 'Yıkım', metin: 'Hücreler parçalandığında miyoglobinemi ve hiperkalemi gelişir. [[K3 s. 189]]' },
    ],
  });

  VIZ.a12b_hedef = el => SEKIL.sahne(el, {
    baslik: 'Süksametonyum ile dantrolenin etki yerleri', vb: [640, 229], vbDar: [360, 229],
    secenek: secim('İlaç', ['Süksametonyum', 'Dantrolen']),
    ciz(S, t, p) {
      const kavsak = p.sec === '0', x = S.w / 2;
      function bolge(y, ad, etkin) {
        return S.kutu(12, y, S.w - 24, 78, { yazi: ad, dolgu: etkin ? 'accent-soft' : 'paper', renk: etkin ? 'accent' : 'line', w: etkin ? 3 : 1 });
      }
      return bolge(8, ['Kavşak · nikotinik reseptör', kavsak ? 'Kalıcı depolarizasyon' : 'Elektriksel uyarı'], kavsak)
        + S.ok([[x, 91], [x, 127]], { renk: 'muted' })
        + bolge(134, ['Retikulum · RYR1', kavsak ? 'Dantrolenin etki yeri' : 'Ca²⁺ salınımı engellenir'], !kavsak);
    },
    metin: p => p.sec === '0'
      ? 'Süksametonyumun hedefi kavşaktır: kalıcı depolarizasyon yeni uyarının iletimini keser. [[K3 s. 187]]'
      : 'Dantrolen kas aksiyon potansiyelini değiştirmeden uyarılma ile kasılma arasındaki eşleşmeyi keser. [[K3 s. 190]]',
  });

  const varyant = [
    { ad: 'Eu:Eu', sayi: 80, blok: 'Normal süre' },
    { ad: 'Eu:Es', sayi: 80, blok: 'Uzama (+)' },
    { ad: 'Ea:Ea', sayi: 20, blok: 'Uzama (++++)' },
  ];
  VIZ.a12b_dibukain = el => SEKIL.sahne(el, {
    baslik: 'Seçilen genotipte dibukainle inhibisyon ve blok süresi', vb: [640, 190], vbDar: [360, 190],
    secenek: secim('Genotip', varyant.map(v => v.ad)),
    ciz(S, t, p) {
      const v = varyant[p.sec], w = S.w - 52;
      return S.t(S.w / 2, 34, v.ad + ' · inhibisyon %' + v.sayi, merkez)
        + S.kutu(26, 55, w, 32, { dolgu: 'paper' })
        + S.kutu(26, 55, w * v.sayi / 100, 32, { dolgu: 'basic', renk: 'basic' })
        + S.t(S.w / 2, 125, 'Süksametonyum bloğu', { a: 'middle' })
        + S.t(S.w / 2, 156, v.blok, merkez);
    },
    metin: p => ['Olağan homozigotta inhibisyon %80 ve blok süresi normaldir. [[K3 s. 191]]',
      'Eu:Es aynı sayıyı verir, ancak blok uzar. [[K3 s. 191]]',
      'Atipik homozigot enzim daha az inhibe olurken blok belirgin uzar. [[K3 s. 191]]'][p.sec],
  });
})();
