(() => {
  'use strict';
  const VIZ = window.VIZ;
  const merkez = { a: 'middle' };
  const olcek = { vb: [360, 230], vbDar: [360, 230] };
  const sayi = (x, basamak = 1) => x.toLocaleString('tr-TR', { maximumFractionDigits: basamak });
  const secim = (ad, liste) => ({ id: 'durum', ad, liste: liste.map(([d, ad]) => ({ d, ad })) });

  VIZ.fk06a_referans = el => SEKIL.sahne(el, {
    ...olcek, baslik: 'Vakum ve atmosfer referanslı basınç ölçekleri',
    param: [{ id: 'p', ad: 'Mutlak basınç', min: 0, max: 880, adim: 1, deger: 880, birim: 'mmHg' }],
    ciz: (S, t, p) => {
      const x = v => 28 + 300 * v / 880;
      return S.t(28, 28, 'Mutlak basınç (mmHg)', { c: 'b' })
        + S.cizgi([[28, 72], [328, 72]], { renk: 'line', w: 5 })
        + S.cizgi([[28, 72], [x(p.p), 72]], { renk: 'basic', w: 5 })
        + S.daire(x(p.p), 72, 6, { dolgu: 'basic' })
        + S.t(28, 102, '0 · Vakum') + S.t(328, 102, sayi(p.p), { a: 'end' })
        + S.t(28, 142, 'Gösterge basıncı (mmHg)', { c: 'b' })
        + S.cizgi([[28, 171], [328, 171]], { renk: 'line', w: 5 })
        + S.cizgi([[x(760), 171], [x(p.p), 171]], { renk: 'clin', w: 5 })
        + S.cizgi([[x(760), 158], [x(760), 184]], { renk: 'ink' })
        + S.daire(x(p.p), 171, 6, { dolgu: 'clin' })
        + S.t(28, 209, sayi(p.p - 760) + ' mmHg') + S.t(328, 209, '0 · Atmosfer', { a: 'end' });
    },
    metin: p => `Gösterge basıncı = mutlak basınç − atmosfer basıncı = ${p.p} − 760 = <b>${p.p - 760} mmHg</b>. [[K6 s. 97–98]]`,
  });

  VIZ.fk06a_manometre = el => SEKIL.sahne(el, {
    ...olcek, baslik: 'Su dolu U tüpünün yüzeyleri',
    param: [{ id: 'p', ad: 'Örnek gazın gösterge basıncı', min: 0, max: 0.4, adim: 0.01, deger: 0.4, birim: 'kPa' }],
    ciz: (S, t, p) => {
      const fark = p.p * 10.2 * 18;
      const alt = 110 + fark / 2, ust = 110 - fark / 2;
      const u = (a, b) => [[92, a], [92, 175], [106, 192], [220, 192], [234, 175], [234, b]];
      return S.t(92, 26, 'Örnek gaz', merkez) + S.t(234, 26, 'Atmosfer', merkez)
        + S.cizgi(u(48, 48), { w: 25, renk: 'muted' }) + S.cizgi(u(48, 48), { w: 20, renk: 'paper' })
        + S.cizgi(u(alt + 5, ust + 5), { w: 16, renk: 'basic' })
        + S.cizgi([[80, alt], [105, alt]], { renk: 'basic' }) + S.cizgi([[221, ust], [247, ust]], { renk: 'basic' })
        + S.cizgi([[108, alt], [185, alt]], { renk: 'muted', kesik: true })
        + S.cizgi([[180, ust], [218, ust]], { renk: 'muted', kesik: true })
        + S.cizgi([[180, alt], [180, ust]], { renk: 'accent' })
        + S.t(169, 113, 'h', { a: 'end', c: 'b' });
    },
    metin: p => `Basınç farkı ${sayi(p.p, 2)} kPa iken su yüzeylerinin düşey farkı <b>${sayi(p.p * 10.2, 2)} cm</b> olur. [[K6 s. 98–100]]`,
  });

  VIZ.fk06a_barometre = el => SEKIL.sahne(el, {
    ...olcek, baslik: 'Ortak yükseklik ölçeğinde barometre',
    secenek: secim('Barometre sıvısı', [['su', 'Su'], ['civa', 'Cıva']]),
    ciz: (S, t, p) => {
      const su = p.durum === 'su', ust = 177 - 132 * (su ? 1 : 0.760 / 10.3);
      const renk = su ? 'basic' : 'muted';
      return S.kutu(56, 177, 106, 36, { r: 0, dolgu: renk, renk })
        + S.kutu(89, ust, 32, 30 + 177 - ust, { r: 0, dolgu: renk, renk })
        + S.cizgi([[88, 196], [88, 22], [122, 22], [122, 196]], { renk: 'ink' })
        + S.cizgi([[53, 157], [53, 214], [165, 214], [165, 157]], { renk: 'ink' })
        + S.cizgi([[126, ust], [203, ust]], { kesik: true, renk: 'muted' })
        + S.cizgi([[168, 177], [203, 177]], { kesik: true, renk: 'muted' })
        + S.cizgi([[199, ust], [199, 177]], { renk: 'accent' })
        + S.t(214, (177 + ust) / 2 + 4, su ? '10,3 m' : '760 mm', { c: 'b' })
        + S.t(138, 36, 'Vakum') + S.ok([[70, 144], [70, 172]], { renk: 'clin' });
    },
    metin: p => `Açık hazneye etkiyen bir atmosferi ${p.durum === 'su' ? '10,3 m su' : '760 mm cıva'} dengeler, kapalı uçtaki boşluk her iki seçimde de vakumdur. [[K6 s. 102–103]]`,
  });

  function cihaz(el, dosya, baslik, boy, giris, noktalar) {
    return SEKIL.cizim(el, { baslik, giris, gorunumler: [{
      ad: baslik, en: 1024, boy, resim: 'img/fizik/06a-' + dosya + '.webp',
      noktalar: noktalar.map(([x, y, ad, metin]) => ({ x, y, ad, metin })),
    }] });
  }
  VIZ.fk06a_bourdon = el => cihaz(el, 'bourdon', 'Bourdon göstergesinin iç yapısı', 1024,
    'C biçimli tüpün kapalı ucundan başlayarak hareketin ibreye nasıl ulaştığını izleyin. [[K6 s. 101–102]]', [
      [496, 846, 'Basınç girişi', 'Ölçülen gazın basıncı tüpün içine etki eder. [[K6 s. 101]]'],
      [249, 400, 'Esnek C tüp', 'Yay gibi davranan içi boş tüp, iç ve dış basınç farkına yanıt verir. [[K6 s. 101]]'],
      [752, 357, 'Kapalı uç', 'İç basınç yükselirken tüpün kapalı ucu dışa doğru hareket eder. [[K6 s. 101]]'],
      [725, 455, 'Hareket aktarımı', 'Tüpün genişleme ve daralması ibreye aktarılır. [[K6 s. 101–102]]'],
      [588, 359, 'İbre', 'İbre kalibre edilmiş kadranda gösterge basıncını belirtir. [[K6 s. 101–102]]'],
    ]);
  VIZ.fk06a_apl = el => cihaz(el, 'apl', 'APL valfinin kapalı konumu', 1024,
    'Ayarlama vidası, yay ve diyaframın birbirine göre konumlarını bulun. [[K6 s. 105–106]]', [
      [481, 188, 'Ayar vidası', 'Vida çevrilerek yay ve diyaframın konumu değiştirilir. [[K6 s. 105]]'],
      [457, 459, 'Yay', 'Yayın uyguladığı kuvvet sıkışmasıyla orantılıdır. [[K6 s. 106]]'],
      [305, 560, 'Diyafram', 'Basınç diyaframı yukarı kaldırır ve yeterli yükselmede gazın çıkış yolu açılır. [[K6 s. 105]]'],
      [481, 767, 'Gaz girişi', 'Gaz basıncı diyaframa yayın karşı yönünde kuvvet uygular. [[K6 s. 105–106]]'],
      [864, 611, 'Tahliye çıkışı', 'Valf açıldığında gaz çevreye boşalır. [[K6 s. 105]]'],
    ]);
  VIZ.fk06a_regulator = el => cihaz(el, 'regulator', 'Basınç düşürücü valfin kesiti', 1088,
    'Gazın besleme girişinden çıkış odasına geçerken aştığı dar açıklığı bulun. [[K6 s. 107]]', [
      [115, 940, 'Besleme girişi', 'Oda basıncı ayarın altındayken beslemeden gelen gaz odaya girer. [[K6 s. 107]]'],
      [510, 858, 'Piston', 'Diyaframla birlikte yukarı hareket eden piston giriş açıklığını daraltır. [[K6 s. 107]]'],
      [525, 800, 'Giriş açıklığı', 'Daralan açıklık akışı kısıtlayarak belirgin basınç düşüşü sağlar. [[K6 s. 107]]'],
      [335, 626, 'Çıkış odası', 'Diyafram altındaki odadan hasta ucuna gaz verilir. [[K6 s. 107]]'],
      [270, 487, 'Diyafram', 'Oda basıncı yükseldiğinde gaz diyaframı yukarı iter. [[K6 s. 107]]'],
      [495, 331, 'Yay', 'Diyafram üstten yaya, alttan pistona bağlıdır. [[K6 s. 107]]'],
      [922, 635, 'Hasta tarafı', 'Hasta ucundaki basınç değiştikçe pistonun konumu değişir. [[K6 s. 107]]'],
    ]);

  VIZ.fk06a_alan = el => SEKIL.grafik(el, {
    baslik: 'Diyafram alan oranına göre açılma basıncı', vb: [410, 282], vbDar: [360, 280],
    x: { min: 1, max: 2, ad: 'Alan oranı (yeni / eski)', adimlar: [1, 2] },
    y: { min: 0, max: 10, ad: 'Basınç (cmH₂O)', adimlar: [0, 5, 10] },
    param: [{ id: 'oran', ad: 'Yeni alan / eski alan', min: 1, max: 2, adim: 0.01, deger: 2 }],
    egriler: [{ ad: 'Açılma basıncı', adYer: 0.55, renk: 'basic', f: x => 10 / x }],
    noktalar: p => [{ x: p.oran, y: 10 / p.oran, ad: '' }],
    okuma: p => `Açma kuvveti sabitken alan ${sayi(p.oran, 2)} katına çıkarsa basınç 10 / ${sayi(p.oran, 2)} ≈ <b>${sayi(10 / p.oran, 2)} cmH₂O</b> olur. [[K6 s. 108–109]]`,
  });

  VIZ.fk06a_piston = el => SEKIL.sahne(el, {
    ...olcek, baslik: 'Geri bildirimle giriş açıklığının değişmesi',
    secenek: secim('Oda basıncı', [['dusuk', 'Ayarın altında'], ['ayar', 'Ayara ulaştı']]),
    ciz: (S, t, p) => {
      const acik = p.durum === 'dusuk', y = acik ? 94 : 77, uc = acik ? 172 : 155;
      return S.t(180, 25, acik ? 'Piston aşağıda' : 'Piston yukarıda', merkez)
        + S.kutu(92, 50, 176, 151, { dolgu: 'basic-soft', r: 5 })
        + S.kutu(94, 52, 172, y - 52, { dolgu: 'paper', r: 0 })
        + S.cizgi([[94,y],[266,y]], { w: 6 })
        + S.cizgi([[180,y],[180,uc]], { w: 4 })
        + S.cizgi([[96,157],[171,157]], { w: 5 }) + S.cizgi([[189,157],[264,157]], { w: 5 })
        + S.cizgi([[169,uc+9],[180,uc-4],[191,uc+9],[169,uc+9]], { dolgu: 'muted' })
        + S.ok([[48,182],[105,182]], { renk: 'clin' })
        + S.ok([[249,121],[304,121]], { renk: 'basic' })
        + S.t(44,211,'Besleme',merkez) + S.t(304,101,'Çıkış',merkez);
    },
    metin: p => p.durum === 'dusuk' ? 'Çıkış odasında basınç düşünce giriş açıklığı büyür ve besleme gazı odaya geçer. [[K6 s. 107]]' : 'Ayar basıncına erişen gaz diyaframı kaldırır, piston giriş açıklığını daraltarak beslemeyi sınırlar. [[K6 s. 107]]',
  });

  VIZ.fk06a_infuzyon = el => SEKIL.sahne(el, {
    ...olcek, baslik: 'Cam şişede hava girişi ve set içeriği',
    secenek: secim('Şişenin durumu', [['kapali','Hava girişi kapalı'],['acik','Açık ve dolu'],['bos','Açık ve boş']]),
    ciz: (S,t,p) => {
      const bos = p.durum === 'bos', kapali = p.durum === 'kapali';
      return S.kutu(70,23,79,91,{ r: 8, dolgu:'paper', renk:'ink' })
        + (bos ? '' : S.kutu(74,63,71,47,{r: 2, dolgu:'basic-soft',renk:'basic-soft'}))
        + S.cizgi([[110,116],[110,175],[258,175]],{renk:'muted', w: 9})
        + S.cizgi([[110,116],[110,175],[258,175]],{renk:bos?'paper':'basic-soft',w:5})
        + (kapali ? S.t(126,149,'Akış durur',{renk:'crit'}) : S.ok([[167,175],[213,175]],{renk:bos?'warn':'basic'}))
        + (kapali ? '' : S.ok([[43,43],[85,43]],{renk:'clin'}))
        + S.t(167,56,bos ? 'Hava' : 'Cam şişe')
        + S.t(260,205,'Periferik ven',merkez);
    },
    metin: p => ({
      kapali:'Sıvı çıktıkça şişe içi basınç düşer, venle dengeye ulaşıldığında ilaç akışı durur. [[K6 s. 110]]',
      acik:'Hava sıvının yerini alır ve şişe içi basınç atmosfer düzeyinde kalır. [[K6 s. 110]]',
      bos:'Şişe boşalınca hava setten vene ilerleyebilir ve hava embolisi riski doğar. [[K6 s. 110–111]]',
    })[p.durum],
  });

  VIZ.fk06a_sifon = el => SEKIL.sahne(el, {
    ...olcek, baslik: 'Sifonda denge ve kot farkı', hareket: true,
    secenek: secim('Kapların seviyesi', [['fark', 'Sağ kap alçakta'], ['denge', 'Düzeyler eşit']]),
    ciz: (S, t, p) => {
      const akar = p.durum === 'fark', sag = akar ? 153 : 98;
      const kap = (x,y) => S.kutu(x, y, 86, 46, { renk: 'basic-soft', dolgu: 'basic-soft', r: 0 })
        + S.cizgi([[x,y-12],[x,y+47],[x+86,y+47],[x+86,y-12]], { renk: 'muted' })
        + S.cizgi([[x+1,y],[x+85,y]], { renk: 'basic' });
      const yol = [[78,122],[78,63],[94,47],[245,47],[261,63],[261,sag+24]];
      return kap(32,98) + kap(217,sag)
        + S.cizgi(yol, { renk:'muted', w:12 }) + S.cizgi(yol, { renk:'basic-soft', w:8 })
        + (akar ? S.akis(yol,t,{renk:'basic',r:3,n:7,hiz:0.15}) + S.ok([[143,47],[188,47]], { renk:'accent' }) : '')
        + S.t(180,225,akar ? 'Üst kaptan alt kaba' : 'Dengede net akış yok',merkez);
    },
    metin: p => p.durum === 'fark' ? 'Uzun kolda aşağı çekilen sıvı, kısa koldaki sıvının tepeye çıkmasını sağlar. [[K6 s. 110]]' : 'Yüzeyler aynı düzeyde dengedeyken kaplar arasında akış yoktur. [[K6 s. 110]]',
  });
})();
