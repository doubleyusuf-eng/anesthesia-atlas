(function () {
  'use strict';
  const VIZ = window.VIZ;
  const ortada = { a: 'middle', c: 'b' };
  const secim = (ad, liste) => ({ id: 'secim', ad, liste: liste.map(([d, ad]) => ({ d, ad })) });
  const boyut = h => ({ vb: [640, h], vbDar: [360, h] });
  const sayi = n => n.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });

  VIZ.fk02_hareket = el => SEKIL.sahne(el, {
    ...boyut(230), baslik: 'Çembersel harekette hız ve kuvvet',
    param: [{ id: 'konum', ad: 'Kavşakta tur kesri', min: 0, max: 1, adim: 0.01, deger: 0 }],
    ciz: (S, t, { konum }) => {
      const cx = S.w / 2, cy = 110, r = 66;
      const aci = konum * 2 * Math.PI - Math.PI / 2;
      const x = cx + r * Math.cos(aci), y = cy + r * Math.sin(aci);
      return S.daire(cx, cy, r, { renk: 'line', w: 7 })
        + S.ok([[x,y],[x-47*Math.sin(aci),y+47*Math.cos(aci)]], { renk: 'accent', w: 3 })
        + S.ok([[x,y],[cx+20*Math.cos(aci),cy+20*Math.sin(aci)]], { renk: 'clin', kesik: true })
        + S.daire(x, y, 6, { dolgu: 'accent', renk: 'accent' })
        + S.t(cx, 213, 'Düz ok: hız   ·   Kesikli ok: net kuvvet', { a: 'middle' });
    },
    metin: () => 'Konumu değiştirin: hız oku yörüngeye teğet kalır ve uzunluğu değişmez; içe yönelen kuvvet, 20 km/sa süratle giden aracın yönünü değiştirir. [[K6 s. 30]]',
  });

  VIZ.fk02_agirlik = el => SEKIL.grafik(el, {
    ...boyut(255), baslik: 'Dünya ve Ay için ağırlık–kütle doğruları',
    x: { min: 0, max: 70, ad: 'Kütle (kg)', adimlar: [0,70] },
    y: { min: 0, max: 700, ad: 'Ağırlık (N)', adimlar: [0,700] },
    param: [{ id: 'm', ad: 'Kütle', min: 1, max: 70, adim: 1, deger: 70, birim: 'kg' }],
    egriler: [
      { ad: 'Dünya', f: m => m*9.81, renk: 'accent' },
      { ad: 'Ay', f: m => m*1.62, renk: 'clin', kesik: true },
    ],
    noktalar: ({ m }) => [{ x: m, y: m*9.81 }, { x: m, y: m*1.62, renk: 'clin' }],
    okuma: ({ m }) => `<b>${m} kg</b> için ağırlık Dünya’da ${sayi(m*9.81)} N, Ay’da ${sayi(m*1.62)} N olur. [[K6 s. 31–32]]`,
  });

  VIZ.fk02_raptiye = el => SEKIL.cizim(el, {
    baslik: 'Raptiye ve tahtanın yandan kesiti',
    giris: 'Kuvvetin uygulandığı geniş yüzeyi ve tahtayı biçim değiştirmeye zorlayan dar yüzeyi seçin. [[K6 s. 32]]',
    gorunumler: [{ ad: 'Yandan', resim: 'img/fizik/02-raptiye.webp', en: 1024, boy: 683, noktalar: [
      nokta(527,208,'Başparmak','Başparmak raptiyenin arkasına bastırarak kuvvet uygular. [[K6 s. 32]]'),
      nokta(356,289,'Raptiyenin başı','Geniş baş, başparmağa geniş bir temas alanı sunar. [[K6 s. 32]]'),
      nokta(512,576,'Sivri uç','Tahtaya iletilen kuvvet çok küçük alana etki eder ve yüksek basınç oluşturur. [[K6 s. 32]]'),
      nokta(679,625,'Tahta','Tahta yüzeyi, ucun uyguladığı basınçla şekil değiştirir. [[K6 s. 32]]'),
    ] }],
  });

  VIZ.fk02_alan = el => SEKIL.grafik(el, {
    ...boyut(245), baslik: 'Sabit kuvvet altında temas alanı ve basınç',
    x: { min: 0.5, max: 1, ad: 'Alan / başlangıç alanı', adimlar: [0.5,1] },
    y: { min: 0, max: 2, ad: 'Basınç / başlangıç basıncı', adimlar: [0,1,2] },
    param: [{ id: 'alan', ad: 'Göreli temas alanı', min: 0.5, max: 1, adim: 0.01, deger: 1 }],
    egriler: [{ f: a => 1/a }],
    noktalar: ({ alan }) => [{ x: alan, y: 1/alan }],
    okuma: ({ alan }) => `Temas alanı başlangıç alanının ${sayi(alan)} katı olduğunda basınç başlangıç değerinin ${sayi(1/alan)} katı olur. [[K6 s. 32]]`,
  });

  VIZ.fk02_valf = el => SEKIL.cizim(el, {
    baslik: 'Yay yüklü basınç valfinde yay ile diyaframın teması',
    giris: 'Yayı ve diyaframı seçerek her biri için basınç ile kuvvet arasındaki ilişkiyi izleyin. [[K6 s. 32–33]]',
    gorunumler: [{ ad: 'Mekanizma kesiti', resim: 'img/fizik/02-valf.webp', en: 1024, boy: 525, noktalar: [
      nokta(515,171,'Yay','Yayın denge boyundan sapması elastik sınırlar içinde geri çağırıcı kuvvetin büyüklüğünü belirler. [[K6 s. 32–33]]'),
      nokta(270,324,'Diyafram','Diyaframın yüzeyine uygulanan basınç bir kuvvete karşılık gelir; yay yüklü diyaframlı valflerde Hooke yasasından yararlanılır. [[K6 s. 32–33]]'),
    ] }],
  });

  VIZ.fk02_yay = el => SEKIL.sahne(el, {
    ...boyut(185), baslik: 'Yer değiştirme ile geri çağırıcı kuvvet',
    param: [{ id: 'x', ad: 'Göreli yer değiştirme', min: -1, max: 1, adim: 0.05, deger: 0.5 }],
    ciz: (S, t, { x }) => {
      const sol = S.w/2-108, denge = S.w/2+28, uc = denge+56*x;
      const sivri = Array.from({ length: 15 }, (_, i) => [sol+12+(uc-sol-24)*i/14, 94+(i%2 ? 14 : -14)]);
      let s = S.cizgi([[sol,70],[sol,118]], { w: 5 })
        + S.cizgi([[denge,49],[denge,147]], { renk: 'muted', kesik: true })
        + S.t(denge,30,'Denge ucu',ortada)
        + S.cizgi([[sol,94],...sivri,[uc,94]], { renk: 'accent', w: 3 })
        + S.daire(uc,94,4,{dolgu:'accent',renk:'accent'});
      if (x) s += S.ok([[uc,130],[denge,130]], { renk: 'clin', w: 3 });
      return s + S.t(S.w/2,173,'Geri çağırıcı kuvvet   F = −kx',ortada);
    },
    metin: ({ x }) => (x < 0 ? 'Sıkışan yay ucu sağa iter.' : x > 0 ? 'Uzayan yay ucu sola çeker.' : 'Denge boyunda yer değiştirme ve geri çağırıcı kuvvet sıfırdır.') + ' [[K6 s. 32–33]]',
  });

  VIZ.fk02_kan = el => SEKIL.sahne(el, {
    ...boyut(170), baslik: 'Akımın eritrosit dizilimine etkisi',
    secenek: secim('Akım', [['yavas','Yavaş akım'],['hizli','Hızlı akım']]),
    ciz: (S, t, { secim }) => {
      const hizli = secim === 'hizli', c = S.w/2;
      let svg = S.kutu(c-145,40,290,85,{r:3, dolgu:'clin-soft', renk:'clin'})
        + S.ok([[c-133,22],[c+133,22]],{renk:'muted'});
      const yavas = [[-87,74],[-69,83],[-82,95],[-8,75],[9,83],[-5,97],[78,85],[94,74],[92,97]];
      yavas.forEach(([dx,dy], i) => {
        const x = c + (hizli ? ((i%3)-1)*88+(Math.floor(i/3)-1)*8 : dx);
        const y = hizli ? 59+Math.floor(i/3)*23 : dy;
        svg += `<ellipse cx="${x}" cy="${y}" rx="${hizli?25:12}" ry="${hizli?5:10}" fill="${S.renk('crit-soft')}" stroke="${S.renk('crit')}" stroke-width="2"/>`;
      });
      return svg + S.t(c,155,hizli ? 'Uzama ve hizalanma' : 'Kümelenme',ortada);
    },
    metin: ({ secim }) => (secim === 'yavas' ? 'Yavaş akımda eritrosit kümeleri komşu tabakaların birbirine göre kaymasını güçleştirir.' : 'Hızlı akımda eritrositler uzayıp dizilir, tabakalar arası direnç ve kanın viskozitesi azalır.') + ' [[K6 s. 34]]',
  });

  VIZ.fk02_yuzey = el => SEKIL.sahne(el, {
    ...boyut(205), baslik: 'Sıvıda molekülün çekildiği yönler',
    secenek: secim('Molekülün yeri', [['ic','Sıvının içi'],['ust','Serbest yüzey']]),
    ciz: (S, t, { secim }) => {
      const c = S.w/2, ust = secim === 'ust', y = ust ? 56 : 117;
      let s = S.kutu(c-145,56,290,141,{dolgu:'basic-soft',renk:'basic',r:0})
        + S.t(c,30,'Su yüzeyi',ortada);
      for (let i=0; i<8; i++) {
        const dx=Math.cos(i*Math.PI/4), dy=Math.sin(i*Math.PI/4);
        if (ust && dy < -0.01) continue;
        s += S.daire(c+48*dx,y+48*dy,7,{renk:'basic',dolgu:'paper'})
          + S.ok([[c+11*dx,y+11*dy],[c+36*dx,y+36*dy]],{renk:'basic'});
      }
      return s + S.daire(c,y,9,{dolgu:'accent',renk:'accent'});
    },
    metin: ({ secim }) => (secim === 'ic' ? 'İçteki molekül her yönden komşularıyla çevrilidir.' : 'Yüzeydeki molekülün sıvı dışına doğru komşusu yoktur; kalan moleküllerin çekimi içeri yönelir.') + ' [[K6 s. 35–36]] [[K6 s. 41]]',
  });

  const basinc = (rMm, T, katsayi) => katsayi*T/(rMm/1000);
  VIZ.fk02_laplace = el => SEKIL.grafik(el, {
    ...boyut(280), baslik: 'Sabit gerilimde basınç farkı ile yarıçap',
    x: { min: 0.05, max: 0.1, ad: 'Yarıçap (mm)', adimlar: [0.05,0.1] },
    y: { min: 0, max: 800, ad: 'Basınç farkı (Pa)', adimlar: [0,400,800] },
    param: [{ id: 'r', ad: 'Yarıçap', min: 0.05, max: 0.10, adim: 0.001, deger: 0.1, birim:'mm' }],
    egriler: [
      { ad: 'Küre', f: r => basinc(r,0.02,2), renk:'accent', adYer:0.49 },
      { ad: 'Silindir', f: r => basinc(r,0.02,1), renk:'clin', kesik:true, adYer:0.55 },
    ],
    noktalar: ({ r }) => [{ x:r,y:basinc(r,0.02,2) },{ x:r,y:basinc(r,0.02,1),renk:'clin' }],
    okuma: ({ r }) => `T = 0,02 N/m ve r = ${r.toFixed(3).replace('.',',')} mm için ΔP kürede ${sayi(basinc(r,0.02,2))} Pa, silindirde ${sayi(basinc(r,0.02,1))} Pa’dır. [[K6 s. 36–37]] [[K6 s. 39–40]]`,
  });

  VIZ.fk02_kapanma = el => SEKIL.sahne(el, {
    ...boyut(185), baslik: 'Açık damar ve kritik kapanmada kan akımı',
    secenek: secim('Damar durumu', [['acik','Damar açık'], ['kapali','Kritik kapanma']]),
    ciz: (S, t, { secim }) => {
      const c = S.w/2, acik = secim === 'acik';
      const profil = [[-132,24],[-85,24],[-53,21],[-27,10],[0,0],[27,10],[53,21],[85,24],[132,24]];
      const duvar = yon => profil.map(([x,y]) => [c+x, 96+yon*(acik ? 24 : y)]);
      const ust = duvar(-1), alt = duvar(1);
      let s = S.cizgi([...ust,...alt.slice().reverse()],{dolgu:'clin-soft',renk:'none'})
        + S.cizgi(ust,{renk:'clin',w:4}) + S.cizgi(alt,{renk:'clin',w:4});
      if (acik) s += S.ok([[c-88,96],[c+88,96]],{renk:'accent',w:3});
      else s += S.ok([[c,42],[c,85]],{renk:'accent'}) + S.ok([[c,150],[c,107]],{renk:'accent'});
      return s + S.t(c,25,acik ? 'Lümen açık' : 'Dıştan bası',ortada)
        + S.t(c,175,acik ? 'Kan damardan geçer' : 'Akım durur',ortada);
    },
    metin: ({ secim }) => (secim === 'acik' ? 'Açık lümen boyunca kanın izleyebileceği yolu takip edin.' : 'Kritik kapanma basıncında damar tamamen çöker ve bu damardaki kan akımı durur.') + ' [[K6 s. 36–37]]',
  });

  VIZ.fk02_alveol = el => SEKIL.sahne(el, {
    ...boyut(235), baslik: 'İki alveolde eşit gerilim veya eşit basınç',
    secenek: secim('Surfaktan', [['yok','Surfaktan yok'],['var','Surfaktan var']]),
    ciz: (S, t, { secim }) => {
      const c = S.w/2, k = c-79, b = c+79, surf = secim === 'var';
      let s = S.cizgi([[k,102],[k,52],[b,52],[b,102]], {renk:'basic',w:5})
        + S.daire(k,126,27,{renk:'basic',dolgu:'basic-soft',w:3})
        + S.daire(b,151,54,{renk:'basic',dolgu:'basic-soft',w:3})
        + S.t(k,131,surf?'1':'15',ortada)
        + S.t(b,156,surf?'1':'7,5',ortada)
        + S.t(k,185,'0,005 mm',ortada) + S.t(b,226,'0,01 mm',ortada);
      if (!surf) s += S.ok([[c-32,52],[c+32,52]],{renk:'accent',w:4});
      return s + S.t(c,28,surf ? 'Basınçlar eşit (mmHg)' : 'Hava büyük keseye gider',ortada);
    },
    metin: ({ secim }) => (secim === 'var' ? 'Yüzey gerilimleri farklıdır ve şişirme basınçları her iki kesede yaklaşık 1 mmHg olur.' : 'Yüzey gerilimleri eşittir: küçük kesedeki yaklaşık 15 mmHg ile büyük kesedeki 7,5 mmHg arasındaki fark havayı büyük keseye yöneltir.') + ' [[K6 s. 38–39]]',
  });

  VIZ.fk02_meniskus = el => SEKIL.sahne(el, {
    ...boyut(179), baslik: 'Menisküsün cam duvarla ilişkisi',
    secenek: secim('Yüzey biçimi', [['su','Su'],['civa','Cıva'],['duz','Düz yüzey']]),
    ciz: (S, t, { secim }) => {
      const c = S.w/2, kenar = secim==='su' ? 60 : secim==='civa' ? 85 : 74;
      const orta = secim==='su' ? 85 : secim==='civa' ? 60 : 74;
      const yuzey = `M${c-90} ${kenar} Q${c-82} ${orta} ${c-56} ${orta} H${c+56} Q${c+82} ${orta} ${c+90} ${kenar}`;
      return `<path d="${yuzey} V148 H${c-90} Z" fill="${S.renk('basic-soft')}"/><path d="${yuzey}" fill="none" stroke="${S.renk('accent')}" stroke-width="3"/>`
        + S.cizgi([[c-91,32],[c-91,149],[c+91,149],[c+91,32]],{renk:'muted',w:4})
        + S.t(c,123,secim==='su' ? 'İçbükey' : secim==='civa' ? 'Dışbükey' : 'Düz',ortada);
    },
    metin: ({ secim }) => ({
      su:'Cama çekim baskındır, su cam duvar boyunca yükselir.',
      civa:'Cıva atomlarının birbirini çekmesi baskındır, sıvı yüzeyi ortada daha yüksektir.',
      duz:'Sıvının serbest yüzeyi içbükey ve dışbükey biçimlerin yanı sıra düz de olabilir.',
    }[secim]) + ' [[K6 s. 40–41]]',
  });
})();
