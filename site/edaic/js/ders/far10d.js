(function () {
  'use strict';
  const VIZ = window.VIZ;
  const merkez = { a: 'middle', c: 'b' };
  function secim(ad, adlar) {
    return { id: 'secili', ad, liste: adlar.map(ad => ({ ad, d: ad })) };
  }
  function kutu(S, y, yazi, renk = 'accent') {
    return S.kutu(S.w / 2 - 146, y, 292, 52, { yazi, renk, dolgu: renk + '-soft', lh: 20 });
  }
  function asagi(S, y, son) {
    const x = S.w / 2;
    return S.ok([[x, y], [x, son]], { renk: 'muted' });
  }

  const profiller = {
    Diklofenak: ['Postoperatif ağrı', 'Renal kolik', 'Hafif–orta ağrıda tek başına, şiddetli ağrıda opioid tüketimini azaltmak için kullanılabilir. [[K3 s. 161]]'],
    Ketorolak: ['Güçlü analjezi', 'Sınırlı antiinflamatuvar etki', 'Ketorolak ağrıyı güçlü biçimde giderirken inflamasyon üzerindeki etkisi sınırlı kalır. [[K3 s. 161]]'],
    Fenilbutazon: ['Güçlü antiinflamatuvar etki', 'Ciddi hematolojik risk', 'Güçlü antiinflamatuvar etkisine karşın agranülositoz ve aplastik anemi kullanımı sınırlar. [[K3 s. 162]]'],
    İbuprofen: ['Daha az yan etki', ['Daha zayıf', 'antiinflamatuvar etki'], 'Karşılaştırma diğer birçok NSAİİ iledir. [[K3 s. 162]]'],
  };
  VIZ.a10d_profil = el => SEKIL.sahne(el, {
    baslik: 'İlaçların ayırt edici klinik özellikleri', vb: [560, 165], vbDar: [340, 165],
    secenek: secim('İlaç', Object.keys(profiller)),
    metin: p => profiller[p.secili][2],
    ciz: (S, t, p) => S.t(S.w / 2, 23, p.secili, merkez)
      + kutu(S, 37, profiller[p.secili][0], 'basic') + kutu(S, 99, profiller[p.secili][1], 'clin'),
  });

  const atilim = {
    Tenoksikam: { idrar: 66, safra: 33, aciklama: 'Klirens inaktif bir metabolite dönüşümle olur, bu metabolitin %66’sı idrarla ve %33’ü safrayla atılır. [[K3 s. 163]]' },
    Meloksikam: { idrar: 50, safra: 50, aciklama: 'Karaciğerde oluşan inaktif metabolitlerin idrar ve safra yoluyla atılan payları eşittir (%50 ve %50). [[K3 s. 163]]' },
  };
  VIZ.a10d_atilim = el => SEKIL.sahne(el, {
    baslik: 'Metabolitlerin idrar ve safrayla atılım payları', vb: [560, 170], vbDar: [340, 170],
    secenek: secim('Oksikam', Object.keys(atilim)), metin: p => atilim[p.secili].aciklama,
    ciz: (S, t, p) => {
      const { idrar, safra } = atilim[p.secili];
      function cubuk(y, ad, yuzde, renk) {
        return S.t(18, y, ad) + S.t(S.w - 18, y, '%' + yuzde, { a: 'end', c: 'b' })
          + S.kutu(18, y + 10, S.w - 36, 14, { dolgu: 'chip', r: 5 })
          + S.kutu(18, y + 10, (S.w - 36) * yuzde / 100, 14, { renk, dolgu: renk, r: 5 });
      }
      return S.t(S.w / 2, 21, p.secili, merkez) + cubuk(56, 'İdrar', idrar, 'basic') + cubuk(121, 'Safra', safra, 'clin');
    },
  });

  const oranlar = [
    ['Selekoksib', 30], ['Parekoksib / valdekoksib', 61], ['Etorikoksib', 344],
  ];
  VIZ.a10d_oran = el => SEKIL.sahne(el, {
    baslik: 'COX-1 bir birim kabul edildiğinde COX-2 inhibisyonu', vb: [560, 206], vbDar: [340, 206],
    ciz: S => oranlar.map(([ad, oran], i) => {
      const y = 25 + i * 65;
      return S.t(15, y, ad) + S.t(S.w - 15, y, '1:' + oran, { a: 'end', c: 'b' })
        + S.kutu(15, y + 11, S.w - 30, 12, { dolgu: 'chip', r: 4 })
        + S.kutu(15, y + 11, (S.w - 30) * oran / 344, 12, { dolgu: 'accent', renk: 'accent', r: 4 });
    }).join(''),
    metin: () => 'Selekoksib için oran 1:30, parekoksib/valdekoksib için 1:61’dir. [[K3 s. 163–164]] Etorikoksib 1:344 ile bu üçü arasında COX-2’ye en seçici ajandır. [[K3 s. 163–166]]',
  });

  const donusum = [
    { ad: 'Ön ilaç', etiket: ['Parekoksib', 'Plazma yarı ömrü 20 dakika'], metin: 'Parekoksibin kendi başına farmakolojik etkisi yoktur. [[K3 s. 164]]' },
    { ad: 'Hidroliz', etiket: ['Valdekoksib', 'Eliminasyon yarı ömrü 8 saat'], metin: 'Karaciğerde enzimatik hidroliz aktif valdekoksibi oluşturur. [[K3 s. 165]] Valdekoksibin eliminasyon yarı ömrü 8 saattir. [[K3 s. 166]]' },
    { ad: 'Metabolitler', etiket: ['Birçok metabolit', 'Biri COX-2 antagonisti'], metin: 'Valdekoksib karaciğerde CYP2C9, CYP3A4 ve glukuronidasyon yoluyla metabolize olur, ürünlerden biri COX-2 antagonizmasını sürdürür. [[K3 s. 165]]' },
  ];
  VIZ.a10d_hidroliz = el => SEKIL.adim(el, {
    baslik: 'Ön ilacın karaciğerde dönüşümü', vb: [560, 225], vbDar: [340, 225], oto: false,
    adimlar: donusum,
    ortak: (S, i) => donusum.map((adim, j) => {
      const y = 8 + j * 78;
      return (j ? asagi(S, y - 23, y - 3) : '') + S.kutu(S.w / 2 - 146, y, 292, 52,
        { yazi: adim.etiket, lh: 20, dolgu: i === j ? 'accent-soft' : 'paper', renk: i === j ? 'accent' : 'line', w: i === j ? 3 : 1 });
    }).join(''),
  });

  const romatoid = 'Romatoid artrit';
  VIZ.a10d_bilesen = el => SEKIL.sahne(el, {
    baslik: 'Kalın bağırsakta sülfasalazinin bileşenlerine ayrılması', vb: [560, 198], vbDar: [340, 198],
    secenek: secim('Hastalık', [romatoid, 'İnflamatuvar bağırsak hastalığı']),
    metin: p => 'Sülfasalazin, 5-aminosalisilik asit (5-ASA) ile sülfapiridinin bağlı olduğu bir ön ilaçtır. [[K3 s. 168]] Kalın bağırsakta ayrılan bileşenlerden '
      + (p.secili === romatoid ? 'sülfapiridin romatoid artritte' : '5-ASA inflamatuvar bağırsak hastalığında') + ' etkindir. [[K3 s. 168]]',
    ciz: (S, t, p) => {
      const x = S.w / 2;
      const yari = (S.w - 28) / 2;
      let svg = kutu(S, 8, 'Sülfasalazin', 'basic') + S.t(x, 86, 'Kalın bağırsakta ayrışma', merkez);
      ['Sülfapiridin', '5-ASA'].forEach((ad, i) => {
        const sol = 8 + i * (yari + 12);
        const etkin = (p.secili === romatoid) === (i === 0);
        svg += S.ok([[x, 95], [sol + yari / 2, 116]], { renk: 'muted' })
          + S.kutu(sol, 121, yari, 60, { yazi: etkin ? [ad, 'Etkin bileşen'] : ad, lh: 21,
            renk: etkin ? 'accent' : 'line', dolgu: etkin ? 'accent-soft' : 'paper' });
      });
      return svg;
    },
  });

  const yaralar = ['İyi iyileşme, enfeksiyon bulgusu yok', 'Enfeksiyon bulgusu var', 'İyileşme kuşkulu'];
  VIZ.a10d_yara = el => SEKIL.sahne(el, {
    baslik: 'Ameliyattan iki hafta sonra DMARD kullanımı', vb: [560, 180], vbDar: [340, 180],
    secenek: secim('Yara ve enfeksiyon bulguları', yaralar),
    metin: p => p.secili === yaralar[0]
      ? 'Ameliyattan 2 hafta sonra yara yeterince iyileşmişse ve enfeksiyon bulgusu yoksa DMARD’a yeniden başlanabilir. [[K3 s. 168]]'
      : 'Yeterli iyileşme ve enfeksiyon bulgusu olmaması birlikte aranır, şüphe sürüyorsa ilaca ara verilmeye devam edilir. [[K3 s. 168]]',
    ciz: (S, t, p) => {
      const uygun = p.secili === yaralar[0];
      return kutu(S, 10, uygun ? ['Yeterli yara iyileşmesi', 'Enfeksiyon bulgusu yok'] : p.secili, 'basic')
        + asagi(S, 66, 98) + kutu(S, 103, uygun ? 'Yeniden başlanabilir' : 'İlaç kesili tutulur', uygun ? 'ok' : 'warn');
    },
  });
})();
