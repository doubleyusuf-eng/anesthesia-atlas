(() => {
  'use strict';
  const VIZ = window.VIZ;
  const n = (v) => v.toLocaleString('tr-TR', { maximumFractionDigits: 4 });
  const eksen = (max, ad, adimlar) => ({ min: 0, max, ad, adimlar });
  const grafik = { vb: [570, 285], vbDar: [340, 265] };
  const oran = { id: 'u', ad: 'Basınç eksenindeki konum', min: 0, max: 1, adim: 0.01, deger: 0.5 };
  const secim = (ad, liste) => ({ id: 'tur', ad, liste: liste.map(([d, ad]) => ({ d, ad })) });

  VIZ.fk03_is = (el) => SEKIL.grafik(el, {
    ...grafik, baslik: 'Sabit 1 N kuvvet altında iş',
    x: eksen(1, 'Alınan yol (m)', [0, 1]), y: eksen(1, 'İş (J)', [0, 1]),
    param: [{ id: 'd', ad: 'Alınan yol', min: 0, max: 1, deger: 1, adim: 0.01, birim: 'm' }],
    egriler: [{ f: (d) => d }], noktalar: ({ d }) => [{ x: d, y: d }],
    okuma: ({ d }) => `1 N × ${n(d)} m = <b>${n(d)} J</b> iş. [[K6 s. 43–46]]`,
  });

  const verim = {
    ampul: [2, 'Görünür ışık', '[[K6 s. 45]]'], kas: [10, 'Mekanik iş', '[[K6 s. 51]]'], kalp: [10, 'Mekanik iş', '[[K6 s. 54]]'],
  };
  VIZ.fk03_verim = (el) => SEKIL.sahne(el, {
    baslik: 'Yararlı çıktı ve ısı payları', vb: [440, 140], vbDar: [320, 140],
    secenek: secim('Sistem', [['ampul', 'Tungsten ampul'], ['kas', 'Solunum kasları'], ['kalp', 'Kalp']]),
    ciz: (S, t, p) => {
      const [pay, ad] = verim[p.tur], w = S.w - 40;
      return S.t(20, 30, 'Girdi enerjisi', { c: 'b' })
        + S.kutu(20, 44, w, 38, { r: 0, dolgu: 'warn-soft', renk: 'warn' })
        + S.kutu(20, 44, w * pay / 100, 38, { r: 0, dolgu: 'accent', renk: 'accent' })
        + S.t(20, 112, ad + ' %' + pay, { renk: 'accent' })
        + S.t(S.w - 20, 112, 'Isı %' + (100 - pay), { a: 'end' });
    },
    metin: ({ tur }) => `Yaklaşık %${verim[tur][0]} yararlı çıktı, %${100-verim[tur][0]} ısı. ${verim[tur][2]}`,
  });

  VIZ.fk03_koruk = (el) => SEKIL.cizim(el, {
    baslik: 'Körük ile akciğer arasındaki bağlantı', giris: 'Bir parçaya dokunup inspirasyondaki rolünü okuyun. [[K6 s. 46–48]]',
    gorunumler: [{ ad: 'İnspirasyon düzeneği', resim: 'img/fizik/03-koruk.webp', en: 1024, boy: 683, noktalar: [
      { x: 185, y: 230, ad: 'Hareketli yüz', metin: 'Yüzeye etki eden kuvvetin yüzey alanına oranı körük basıncını verir. [[K6 s. 46]]' },
      { x: 195, y: 365, ad: 'Körük', metin: 'Körüğün kesit alanıyla hareket mesafesinin çarpımı verilen gaz hacmidir. [[K6 s. 46–47]]' },
      { x: 742, y: 116, ad: 'Gaz yolu', metin: 'İnspirasyonda basınç farkı gazı ventilatörden akciğere doğru hareket ettirir. [[K6 s. 46–47]]' },
      { x: 909, y: 459, ad: 'Akciğer', metin: 'Hava yolu direnci nedeniyle akciğerdeki basınç körüktekinden daha yavaş yükselir. [[K6 s. 47–48]]' },
    ] }],
  });

  VIZ.fk03_alan = (el) => SEKIL.grafik(el, {
    ...grafik, baslik: 'Körüğün yaptığı iş', x: eksen(0.8, 'Körük basıncı (kPa)', [0, 0.8]),
    y: eksen(450, 'Hacim (mL)', [0, 450]),
    param: [{ id: 'v', ad: 'Verilen hacim', min: 0, max: 450, deger: 450, adim: 1, birim: 'mL' }],
    ek: (S, p, X, Y) => S.cizgi([[X(0), Y(0)], [X(0.8), Y(0)], [X(0.8), Y(p.v)], [X(0), Y(p.v)], [X(0), Y(0)]],
      { dolgu: 'accent-soft', renk: 'accent' }),
    okuma: ({ v }) => `0,8 kPa × ${n(v / 1000)} L = <b>${n(0.8 * v / 1000)} J</b>. [[K6 s. 46–48]]`,
  });

  // Ortak uçları olan iki nitel dal. Eğriler hastaya ait örneklenmiş veri değildir.
  const dal = (u, isaret) => u + isaret * 0.65 * u * (1 - u);
  VIZ.fk03_dongu = (el) => SEKIL.grafik(el, {
    ...grafik, baslik: 'Körük dikdörtgeni ve akciğer döngüsü', x: eksen(1, 'Basınç (göreli)', []),
    y: eksen(1, 'Hacim (göreli)', []), param: [oran],
    ek: (S, p, X, Y) => {
      const kol = (sign) => Array.from({ length: 61 }, (_, i) => [X(i/60), Y(dal(i/60, sign))]);
      const ust = kol(1), alt = kol(-1);
      return S.kutu(X(0), Y(1), X(1)-X(0), Y(0)-Y(1), { r: 0, renk: 'warn', dolgu: 'warn-soft' })
        + S.cizgi([...ust, ...alt.slice().reverse()], { dolgu: 'clin-soft', renk: 'clin' })
        + S.cizgi(alt, { renk: 'accent', kesik: true })
        + S.cizgi([[X(p.u), Y(0)], [X(p.u), Y(1)]], { renk: 'muted', kesik: true, w: 1 })
        + [1, -1].map((sign) => S.daire(X(p.u), Y(dal(p.u, sign)), 5, { dolgu: sign === 1 ? 'clin' : 'accent' })).join('');
    },
    okuma: ({ u }) => u === 0 || u === 1 ? 'Uç noktada akım durur; körük ve akciğer basınçları eşittir. [[K6 s. 48]]' :
      'Dikey çizgi aynı basınçta kesikli inspirasyon kolunu aşağıda, sürekli ekspirasyon kolunu yukarıda keser. [[K6 s. 48–49]]',
  });

  VIZ.fk03_egim = (el) => SEKIL.grafik(el, {
    ...grafik, baslik: 'Kompliyans ve gereken basınç', x: eksen(1, 'Basınç değişimi (göreli)', []),
    y: eksen(1, 'Hacim değişimi (göreli)', []),
    secenek: secim('Kompliyans', [['y', 'Yüksek'], ['d', 'Düşük']]),
    egriler: [{ f: (x, p) => x * (p.tur === 'y' ? 1 : 0.5) }],
    yatay: () => [{ y: 0.45, ad: 'Hedef hacim' }], noktalar: ({ tur }) => [{ x: tur === 'y' ? 0.45 : 0.9, y: 0.45 }],
    okuma: ({ tur }) => tur === 'y' ? 'Dik eğimde hedef hacme daha küçük bir basınç artışıyla ulaşılır. [[K6 s. 49–50]]' :
      'Eğim azaldığında aynı hacme ulaşmak için basıncı daha fazla artırmak gerekir. [[K6 s. 49–50]]',
  });

  VIZ.fk03_soluk = (el) => SEKIL.grafik(el, {
    ...grafik, baslik: 'Mekanik solunum gücü', x: eksen(15, 'Solunum sayısı (/dk)', [0, 15]),
    y: eksen(90, 'Mekanik güç (mW)', [0, 90]),
    param: [{ id: 'f', ad: 'Solunum sayısı', min: 0, max: 15, deger: 15, adim: 1, birim: '/dk' }],
    egriler: [{ f: (f) => 1000 * 0.36 * f / 60 }],
    noktalar: ({ f }) => [{ x: f, y: 6 * f }],
    okuma: ({ f }) => `Mekanik çıktı <b>${6*f} mW</b>; yaklaşık %10 verimde gereken metabolik girdi <b>${60*f} mW</b>. [[K6 s. 51]]`,
  });

  VIZ.fk03_akim = (el) => SEKIL.grafik(el, {
    ...grafik, baslik: 'Akım katına göre güç katı', x: { min: 1, max: 2, ad: 'Akım / başlangıç akımı', adimlar: [1, 2] },
    y: eksen(8, 'Güç / başlangıç gücü', [1, 4, 8]),
    param: [{ id: 'q', ad: 'Akım oranı', min: 1, max: 2, deger: 2, adim: 0.05 }],
    egriler: [{ f: (x) => x ** 2, renk: 'accent' }, { f: (x) => x ** 3, renk: 'clin', kesik: true }],
    noktalar: ({ q }) => [{ x: q, y: q ** 2 }, { x: q, y: q ** 3, renk: 'clin' }],
    okuma: ({ q }) => `Akım ${n(q)} katına çıktığında güç, laminer akımda (sürekli) ${n(q ** 2)} katına, türbülanslı akımda (kesikli) ${n(q ** 3)} katına çıkar; aşağıdaki düzeltmeye bakın. [[K6 s. 52]]`,
  });

  const cevrim = [[0.12,0.08],[0.48,0.09],[0.87,0.15],[0.87,0.76],[0.72,0.9],[0.53,0.92],[0.34,0.86],[0.12,0.7],[0.12,0.08]];
  VIZ.fk03_kalp = (el) => SEKIL.grafik(el, {
    ...grafik, baslik: 'Sol ventrikül basınç–hacim döngüsü', x: eksen(1, 'Ventrikül hacmi', []), y: eksen(1, 'Ventrikül basıncı', []),
    param: [{ id: 'sira', ad: 'Çevrim boyunca ilerle', min: 0, max: 1, deger: 0, adim: 0.01 }],
    ek: (S, p, X, Y) => {
      const yol = cevrim.map(([x,y]) => [X(x),Y(y)]);
      const [x,y] = S.boyunca(yol,p.sira);
      return S.cizgi(yol, { dolgu: 'clin-soft', renk: 'clin' }) + S.ok(yol.slice(1,3), { renk: 'clin' })
        + S.ok(yol.slice(5,7), { renk: 'clin' }) + S.daire(x,y,7,{ dolgu: 'accent' });
    },
    okuma: () => 'Noktayı bir tam çevrim boyunca ilerletin; yatay konum hacmi, dikey konum sol ventrikül basıncını gösterir. [[K6 s. 53]]',
  });
})();
