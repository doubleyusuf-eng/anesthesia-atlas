(function () {
  'use strict';
  const VIZ = window.VIZ;
  VIZ.fek88_dag = el => SEKIL.sahne(el, {
    baslik: 'Kronik dağ hastalığında arteriyel gaz basınçları',
    vb: [640, 185], vbDar: [360, 185],
    ciz: S => {
      const orta = S.w / 2;
      const genislik = Math.min(180, orta - 16);
      return S.t(orta, 26, 'Hipoksiye yanıt bozukluğu', { a: 'middle', c: 'b' })
        + [ ['PaO₂', 'Düşük', 'basic'], ['PaCO₂', 'Yüksek', 'clin'] ].map(([ad, durum, renk], i) => {
          const x = orta + (i ? 1 : -1) * (genislik / 2 + 6);
          return S.kutu(x - genislik / 2, 48, genislik, 122, { renk, dolgu: renk + '-soft' })
            + S.t(x, 76, ad, { a: 'middle', c: 'b' })
            + S.ok([[x, i ? 122 : 93], [x, i ? 93 : 122]], { renk, w: 3 })
            + S.t(x, 152, durum, { a: 'middle' });
        }).join('');
    },
    metin: () => 'Arter kanında oksijenin parsiyel basıncı düşük, karbondioksitinki yüksektir. [[K2 s. 445]]'
  });

  const etkiler = {
    renk: ['4 G', 'Retina', 'Renk ve ayrıntı kaybı', 'Baş yönünde 4 G ile ivmelenirken renkleri ve ince ayrıntıları seçmek güçleşir (grey-out). [[K2 s. 445]]'],
    gorme: ['4,5–5 G', 'Retina', 'Görme kaybı', '4,5–5 G’de retina kanlanmasındaki azalma görme kaybına (blackout) yol açar. [[K2 s. 445]]'],
    bilinc: ['5 G üzeri', 'Beyin', 'Bilinç kaybı', '5 G’nin üzerinde serebral kan akımı azalınca bilinç kaybolur. [[K2 s. 445]]']
  };
  VIZ.fek88_ivme = el => SEKIL.sahne(el, {
    baslik: 'İvmenin düzeyine göre etkilenen işlev',
    vb: [640, 176], vbDar: [360, 176],
    secenek: { id: 'duzey', ad: 'Baş yönünde ivme', liste: Object.entries(etkiler).map(([d, satir]) => ({ d, ad: satir[0] })) },
    ciz: (S, t, p) => {
      const [ivme, organ, sonuc] = etkiler[p.duzey];
      const x = S.w / 2;
      return S.t(x, 26, ivme + ' · Baş yönünde ivme', { a: 'middle', c: 'b' })
        + S.kutu(x - 102, 45, 204, 40, { yazi: organ + ' kan akımı ↓', renk: 'basic', dolgu: 'basic-soft' })
        + S.ok([[x, 88], [x, 112]], { renk: 'clin' })
        + S.kutu(x - 126, 116, 252, 44, { yazi: sonuc, renk: 'clin', dolgu: 'clin-soft' });
    },
    metin: p => etkiler[p.duzey][3]
  });

  VIZ.fek88_akciger = el => SEKIL.sahne(el, {
    baslik: 'İvmelenmede akciğerin bölgesel yanıtı',
    vb: [640, 185], vbDar: [360, 185],
    secenek: { id: 'bolge', ad: 'Akciğer bölgesi', liste: [{ d: 'apeks', ad: 'Apeks' }, { d: 'taban', ad: 'Taban' }] },
    ciz: (S, t, p) => {
      const apeks = p.bolge === 'apeks';
      const x = S.w / 2 - 24;
      const y = apeks ? 55 : 136;
      return S.cizgi([[x-60,156],[x-48,102],[x-24,54],[x-5,27],[x+7,30],[x+10,150],[x-60,156]], { dolgu: 'basic-soft', renk: 'basic' })
        + S.daire(x - 5, y, 6, { dolgu: 'clin', renk: 'clin' })
        + S.ok([[x + 3,y],[x + 38,y]], { renk: 'clin' })
        + S.t(x + 46, y - 4, apeks ? 'Apeks' : 'Taban', { c: 'b' })
        + S.t(x + 46, y + 19, apeks ? 'V/Q yüksek' : 'V/Q düşük');
    },
    metin: p => p.bolge === 'apeks'
      ? 'Apikal alveoller tam gerilidir ve az ventile olur. [[K2 s. 445]] Perfüzyon sıfıra inerken V/Q çok yükselir. [[K2 s. 445]]'
      : 'Bazal alveollere bol kan gelir. [[K2 s. 445]] Ventilasyon da artar ancak kan akımındaki artış daha büyük olduğu için V/Q düşer. [[K2 s. 445]]'
  });

  const hacimYaniti = [
    { ad: 'Sıvı kayması', neden: 'Alt ekstremiteler', sonuc: 'Toraks, boyun ve baş', metin: 'Yaklaşık 2 L vücut sıvısı aşağıda kalan bölgelerden toraks, boyun ve başa kayar. [[K2 s. 446]]' },
    { ad: 'Gerilme', neden: 'Venöz basınç ↑', sonuc: 'Hacim reseptörlerinde gerilme', metin: 'Venöz basınç artışı atriyumlardaki ve venüllerdeki hacim reseptörlerini gerer. [[K2 s. 446]]' },
    { ad: 'Hormon yanıtı', neden: 'Hacim reseptörleri', sonuc: 'ADH ↓     ANP ↑', metin: 'Antidiüretik hormon (ADH) üretimi azalır, atriyal natriüretik peptit (ANP) artar. [[K2 s. 446]]' },
    { ad: 'Diürez', neden: 'İdrar çıkışı ↑', sonuc: 'Torakstaki kan hacmi ↓', metin: 'Diürez, başlangıçta artmış olan intratorasik kan hacmini azaltır. [[K2 s. 446]]' }
  ];
  VIZ.fek88_sivi = el => SEKIL.adim(el, {
    baslik: 'Ağırlıksızlıkta hacim yanıtının aşamaları',
    vb: [640, 165], vbDar: [360, 165], oto: false,
    adimlar: hacimYaniti.map(({ ad, metin, neden, sonuc }) => ({
      ad, metin, ciz: S => {
        const x = S.w / 2;
        return S.kutu(x - 145, 12, 290, 48, { yazi: neden, renk: 'basic', dolgu: 'basic-soft' })
          + S.ok([[x, 64], [x, 95]], { renk: 'accent' })
          + S.kutu(x - 150, 99, 300, 48, { yazi: sonuc, renk: 'clin', dolgu: 'clin-soft' });
      }
    }))
  });
})();
