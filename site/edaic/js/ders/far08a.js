(function () {
  'use strict';
  const VIZ = window.VIZ;
  const boyut = { vb: [560, 192], vbDar: [360, 192] };
  const ortala = { a: 'middle', c: 'b' };

  function kutu(S, x, y, w, h, yazi, secili = false) {
    return S.kutu(x, y, w, h, { yazi, renk: secili ? 'accent' : 'line', dolgu: secili ? 'accent-soft' : 'paper' });
  }
  function secim(ad, adlar) {
    return { id: 'secim', ad, liste: adlar.map(ad => ({ d: ad, ad })) };
  }
  function kose(n, x, y, r, aci) {
    return Array.from({ length: n }, (_, i) => {
      const a = aci + 2 * Math.PI * i / n;
      return [x + r * Math.cos(a), y + r * Math.sin(a)];
    });
  }

  const tasarim = [
    ['Öncü bileşik', 'Hayvan modeli', 'İstenen etki', 'Modelde istenen etkiyi gösteren bileşik henüz ideal olmayabilir. [[K3 s. 89]] Nörotransmittere benzeyen bir molekül veya enzim inhibitörü başlangıç noktası olabilir. [[K3 s. 89]]'],
    ['Hedef seçimi', 'Fonksiyonel grup ekle', 'Daha özgül hedefleme', 'Öncüye eklenen gruplar istenen sisteme özgüllüğü artırabilir. [[K3 s. 89]] Örneğin ilişkili ilaçlar yapısal farklarına göre agonist veya antagonist olabilir. [[K3 s. 89]]'],
    ['Kinetik', 'Elverişli farmakodinami', 'Kinetiği iyileştir', 'Hedefte uygun etkiyi veren bileşik seçilince, farmakokinetik davranışını iyileştirmek için yapısı yeniden değiştirilebilir. [[K3 s. 89]]'],
  ];
  VIZ.a08a_tasarim = el => SEKIL.adim(el, {
    ...boyut, baslik: 'Öncü bileşikten farmakokinetik düzenlemeye', oto: false,
    adimlar: tasarim.map(([ad, girdi, sonuc, metin]) => ({
      ad, metin, ciz: S => kutu(S, S.w / 2 - 135, 12, 270, 55, girdi)
        + S.ok([
          [S.w / 2, 72], [S.w / 2, 102],
        ], { renk: 'accent' })
        + kutu(S, S.w / 2 - 135, 110, 270, 58, sonuc, true),
    })),
  });

  const birimler = ['Baz', 'Nükleozid', 'Nükleotid'];
  const birimNotu = {
    Baz: 'Baz ailesini belirleyin: adenin ve guanin pürindir. [[K3 s. 90]]',
    Nükleozid: 'Şeker genellikle ribozdur ve nükleozidlere adenozin ile guanozin örnektir. [[K3 s. 90]]',
    Nükleotid: 'Fosfatın eklenmesiyle DNA ve RNA’nın yapı taşı olan nükleotid oluşur. [[K3 s. 90]]',
  };
  VIZ.a08a_nukleotid = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Nükleotidi bileşenlerinden kurma', secenek: secim('Yapı', birimler),
    ciz(S, t, p) {
      const i = birimler.indexOf(p.secim);
      const x = S.w / 2 - 146;
      let svg = '';
      ['Baz', 'Şeker', 'Fosfat'].slice(0, i + 1).forEach((ad, j) => {
        if (j) svg += S.cizgi([[x + j * 104 - 20, 62], [x + j * 104, 62]]);
        svg += kutu(S, x + j * 104, 36, 84, 52, ad, j === i);
      });
      return svg + S.t(S.w / 2, 143, p.secim, ortala);
    }, metin: p => birimNotu[p.secim],
  });

  const katekolNotu = {
    Halka: 'Benzen halkasındaki komşu iki –OH, COMT’nin tanıdığı katekol yapısını oluşturur. [[K3 s. 91]]',
    'Yan zincir': 'Amin ucundan başlayıp α ve β karbonlarını izleyin: α-karbon ve terminal amindeki gruplar reseptör seçimini etkiler. [[K3 s. 91]]',
  };
  VIZ.a08a_katekol = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Katekol halkası ve etilamin yan zinciri', secenek: secim('İzlenecek yapı', Object.keys(katekolNotu)),
    ciz(S, t, p) {
      const x = S.w / 2 - 66;
      const halka = p.secim === 'Halka' ? 'accent' : 'muted';
      const zincir = p.secim === 'Yan zincir' ? 'accent' : 'muted';
      const noktalar = kose(6, x, 92, 43, 0);
      return S.cizgi([...noktalar, noktalar[0]], { renk: halka, w: 3 })
        + S.daire(x, 92, 21, { renk: halka, w: 2 })
        + S.cizgi([noktalar[3], [x - 63, 92]], { renk: halka })
        + S.t(x - 78, 97, 'HO', { ...ortala, renk: halka })
        + S.cizgi([noktalar[4], [x - 35, 35]], { renk: halka })
        + S.t(x - 40, 28, 'OH', { ...ortala, renk: halka })
        + S.cizgi([noktalar[0], [x + 81, 70], [x + 121, 92], [x + 159, 70]], { renk: zincir, w: 3 })
        + S.t(x + 81, 58, 'β', ortala) + S.t(x + 121, 115, 'α', ortala)
        + S.t(x + 181, 70, 'Amin', ortala)
        + S.t(S.w / 2, 164, p.secim === 'Halka' ? 'Komşu hidroksiller' : 'Halka — β — α — amin', ortala);
    }, metin: p => katekolNotu[p.secim],
  });

  const barbituratlar = [
    ['Fenobarbiton', '=O', 'Uzun'], ['Pentobarbiton', '=O', 'Orta'], ['Tiyopenton', '=S', 'Kısa'],
  ];
  VIZ.a08a_barbiturat = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Barbitüratlarda keto veya tiyo grubu ve etki süresi',
    ciz(S) {
      const x = S.w / 2 - 159;
      let svg = S.t(x + 69, 22, 'İlaç', ortala) + S.t(x + 185, 22, 'Grup', ortala) + S.t(x + 266, 22, 'Etki', ortala);
      barbituratlar.forEach(([ilac, grup, sure], i) => {
        const y = 32 + 50 * i;
        svg += kutu(S, x, y, 139, 40, ilac) + kutu(S, x + 150, y, 68, 40, grup, grup === '=S')
          + kutu(S, x + 231, y, 70, 40, sure);
      });
      return svg;
    }, metin: () => 'Fenobarbiton ve pentobarbiton aynı keto grubunu taşısa da etki süreleri farklıdır. [[K3 s. 92]]',
  });

  VIZ.a08a_midazolam = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Midazolamda halka kapanması', secenek: secim('Ortam', ['Ampul', 'Plazma']),
    ciz(S, t, p) {
      const kapali = p.secim === 'Plazma';
      const x = S.w / 2 - 80;
      const koseler = kose(7, x, 85, 46, -Math.PI / 2);
      return S.cizgi(koseler, { renk: 'basic', w: 3 })
        + (kapali ? S.cizgi([koseler[6], koseler[0]], { renk: 'accent', w: 5 }) : '')
        + S.t(x, 161, kapali ? 'Kapalı halka' : 'Açık halka', ortala)
        + kutu(S, x + 70, 56, 160, 64, kapali ? ['Yağda daha', 'iyi çözünür'] : ['Suda', 'çözünür'], true);
    }, metin: p => p.secim === 'Ampul' ? 'Ampulde açık halka biçimi sulu sunuma olanak verir. [[K3 s. 93]]'
      : 'Plazmada yedi üyeli halka yeniden kapanır ve yağda çözünürlük artar. [[K3 s. 93]]',
  });

  VIZ.a08a_ester = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'İki kas gevşeticide ester yöneliminin karşılaştırılması',
    secenek: secim('İlaç', ['Atrakuryum', 'Mivakuryum']),
    ciz(S, t, p) {
      const x = S.w / 2;
      const atra = p.secim === 'Atrakuryum';
      function yon(a, b) { return S.ok(atra ? [a, b] : [b, a], { renk: 'accent', w: 3 }); }
      return kutu(S, x - 159, 46, 62, 54, 'N⁺') + kutu(S, x + 97, 46, 62, 54, 'N⁺')
        + S.t(x, 26, 'Ester bağlarının göreli yönü', ortala)
        + yon([x - 84, 74], [x - 25, 74]) + yon([x + 84, 74], [x + 25, 74])
        + kutu(S, x - 144, 124, 288, 48, atra ? 'Hofmann yıkımı kolaylaşır' : 'Hofmann yıkımı gerçekleşmez', true);
    }, metin: p => p.secim === 'Atrakuryum' ? 'Atrakuryumda esterlerin yönelimi Hofmann yıkımını kolaylaştırır. [[K3 s. 93]]'
      : 'Mivakuryumda ester bağları atrakuryumdakinin ters yönündedir ve bu yıkıma izin vermez. [[K3 s. 93]]',
  });

  VIZ.a08a_morfin = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Morfin glukuronidlerinde konum ve aktivite',
    secenek: secim('Glukuronidasyon yeri', ['3 konumu', '6 konumu']),
    ciz(S, t, p) {
      const uc = p.secim === '3 konumu';
      const x = S.w / 2;
      return kutu(S, x - 160, 18, 155, 56, ['3 · Fenolik', '–OH'], uc)
        + kutu(S, x + 5, 18, 155, 56, ['6 · Sikloheksanol', '–OH'], !uc)
        + S.ok([[x + (uc ? -80 : 80), 80], [x + (uc ? -80 : 80), 96], [x, 116]], { renk: 'accent' })
        + kutu(S, x - 130, 124, 260, 46, uc ? '3-glukuronid · inaktif' : '6-glukuronid · aktif', true);
    }, metin: p => p.secim === '3 konumu' ? 'Fenolik –OH üzerinde oluşan 3-glukuronid inaktiftir. [[K3 s. 94]]'
      : '6 konumunda oluşan 6-glukuronid aktiftir; bu konumdaki –OH aktivite için zorunlu değildir. [[K3 s. 94]]',
  });
})();
