(function () {
  'use strict';
  const VIZ = window.VIZ;
  const ortada = { a: 'middle', c: 'b' };
  const secim = (ad, kayitlar) => ({
    id: 'secili', ad, liste: Object.keys(kayitlar).map(ad => ({ d: ad, ad })),
  });

  const alkiller = ['metil', 'etil', 'propil', 'bütil', 'pentil', 'heksil',
    'heptil', 'oktil', 'nonil', 'desil', 'undesil', 'duodesil'];
  VIZ.a08b_zincir = el => SEKIL.sahne(el, {
    baslik: 'Karbon sayısından alkil adına', vb: [620, 155], vbDar: [360, 155],
    param: [{ id: 'karbon', ad: 'Karbon sayısı', min: 1, max: 12, adim: 1, deger: 3 }],
    ciz: (S, t, { karbon }) => {
      const aralik = (S.w - 60) / 11;
      let svg = '';
      for (let i = 0; i < karbon; i++) {
        const x = 30 + i * aralik, y = i % 2 ? 63 : 85;
        if (i) svg += S.cizgi([ [x - aralik, 148 - y], [x, y]], { renk: 'muted', w: 3 });
        svg += S.daire(x, y, 8, { renk: 'accent', dolgu: 'accent' });
      }
      return svg + S.t(S.w / 2, 130, karbon + ' karbon · ' + alkiller[karbon - 1], ortada);
    },
    metin: ({ karbon }) => 'Seçilen ' + alkiller[karbon - 1] + ' grubu ' + karbon
      + ' karbon taşır. [[K3 s. 96]] Zincir uzadıkça suda çözünürlük azalır, yağda çözünürlük artar. [[K3 s. 96]]',
  });

  const baglar = {
    Ester: ['R–O–C(=O)–R′', 'Oksijene komşu karbonil', 'Remifentanilin ester bağını oksijen ile yanındaki karbonilden tanıyabilirsiniz. [[K3 s. 97]]'],
    Eter: ['R–O–R′', 'İki organik grup arasında O', 'Eterde oksijen iki karbon temelli grubu birleştirir. [[K3 s. 97]]'],
    Amid: ['R–C(=O)–NH₂', 'Azota komşu karbonil', 'Bu gösterim sözlükteki basit amiddir. [[K3 s. 96]]'],
    Amin: ['R–NH₂', 'Primer amin', 'Primer aminde azot iki hidrojen ve bir R grubu taşır. [[K3 s. 96]]'],
  };
  VIZ.a08b_bag = el => SEKIL.sahne(el, {
    baslik: 'Bağdaki komşu atomlar', vb: [620, 155], vbDar: [360, 155],
    secenek: secim('Bağ veya grup', baglar),
    ciz: (S, t, { secili }) => S.kutu(S.w / 2 - 110, 12, 220, 54, {
      yazi: baglar[secili][0], renk: 'accent', dolgu: 'accent-soft',
    }) + S.ok([ [S.w / 2, 72], [S.w / 2, 95]], { renk: 'muted' })
      + S.t(S.w / 2, 130, baglar[secili][1], ortada),
    metin: ({ secili }) => baglar[secili][2],
  });

  const halkalar = {
    İmidazol: { atomlar: 'NCNCC', etiket: '2 N · 3 C', metin: 'Etomidat, enoksimon ve fentolamin imidazol halkası taşır. [[K3 s. 98]]' },
    Piperazin: { atomlar: 'NCCNCC', etiket: 'C₄H₁₀N₂', metin: 'Piperazinin iki azotu 1 ve 4 konumlarında karşı karşıya gelir. [[K3 s. 100]]' },
    Piperidin: { atomlar: 'NCCCCC', etiket: 'C₅H₁₁N', metin: 'Fentanil, alfentanil, remifentanil, bupivakain ve ropivakain piperidin halkası taşır. [[K3 s. 100]]' },
    Pirazol: { atomlar: 'NNCCC', etiket: 'C₃H₃·N·NH', metin: 'Selekoksibin beş üyeli pirazol çekirdeğinde iki azot ve üç karbon bulunur. [[K3 s. 101]]' },
  };
  VIZ.a08b_halka = el => SEKIL.sahne(el, {
    baslik: 'Heterosiklik halkaların karşılaştırması', vb: [620, 216], vbDar: [360, 216],
    secenek: secim('Halka', halkalar),
    ciz: (S, t, { secili }) => {
      const { atomlar, etiket } = halkalar[secili];
      const koseler = Array.from(atomlar, (_, i) => {
        const aci = 2 * Math.PI * i / atomlar.length - Math.PI / 2;
        return [S.w / 2 + 66 * Math.cos(aci), 89 + 66 * Math.sin(aci)];
      });
      let svg = S.cizgi([...koseler, koseler[0]], { renk: 'muted', w: 3 });
      koseler.forEach(([x, y], i) => {
        const azot = atomlar[i] === 'N';
        svg += S.daire(x, y, 16, { renk: azot ? 'accent' : 'line', dolgu: azot ? 'accent-soft' : 'paper' })
          + S.t(x, y + 5, atomlar[i], ortada);
      });
      return svg + S.t(S.w / 2, 201, etiket, ortada);
    },
    metin: ({ secili }) => halkalar[secili].metin,
  });

  const metil = {
    Noradrenalin: ['Adrenalin', '+ CH₃', 'Adrenal medullada noradrenaline metil eklenerek adrenalin oluşur. [[K3 s. 99]]'],
    Diazepam: ['Nordiazepam', '− CH₃', 'Karaciğerde diazepam metil kaybederek nordiazepama dönüşür. [[K3 s. 99]]'],
    Ketamin: ['Norketamin', '− CH₃', 'Ketaminin demetilasyonu norketamin oluşturur. [[K3 s. 99]]'],
  };
  VIZ.a08b_metil = el => SEKIL.sahne(el, {
    baslik: 'Metilasyon ve demetilasyon', vb: [620, 175], vbDar: [360, 175],
    secenek: secim('Başlangıç molekülü', metil),
    ciz: (S, t, { secili }) => {
      const merkez = S.w / 2, [urun, grup] = metil[secili];
      return S.kutu(merkez - 95, 6, 190, 44, { yazi: secili, dolgu: 'basic-soft' })
        + S.ok([ [merkez, 55], [merkez, 109]], { renk: 'accent' })
        + S.t(merkez + 19, 87, grup, { c: 'b', renk: 'accent' })
        + S.kutu(merkez - 95, 118, 190, 44, { yazi: urun, dolgu: 'accent-soft' });
    },
    metin: ({ secili }) => metil[secili][2],
  });
})();
