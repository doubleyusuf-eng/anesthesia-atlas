(function () {
  'use strict';
  const VIZ = window.VIZ;
  const center = { a: 'middle', c: 'b' };
  const choice = (ad, labels) => ({ id: 'mode', ad, liste: labels.map(ad => ({ d: ad, ad })) });
  const scene = (baslik, height) => ({ baslik, vb: [600, height], vbDar: [360, height] });
  const point = (x, y, ad, metin) => ({ x, y, ad, metin });

  const losses = [
    ['Işınım', 40, 'Deri kan akımı arttıkça ışınımla kayıp artar, yansıtıcı örtü bu yolla yayılan enerjinin bir kısmını geri gönderir. [[K6 s. 65]]'],
    ['Taşınım', 30, 'Giysiler taşınımla ısı kaybını da azaltır. [[K6 s. 65]]'],
    ['Buharlaşma', 20, 'Derideki su buharlaşırken deriden enerji alır, nemli havada bu süreç yavaşlar. [[K6 s. 65]]'],
    ['Solunum', 10, 'Solunumun payı, derideki nemin buharlaşmasına ayrılan payın yarısıdır. [[K6 s. 65]]'],
  ];
  VIZ.fk04b_kayip = el => SEKIL.sahne(el, {
    ...scene('Vücuttan ısı kaybının dört yolu', 208),
    secenek: choice('Isı kaybı yolu', losses.map(row => row[0])),
    ciz: (S, t, p) => losses.map(([ad, pay], i) => {
      const y = 14 + i * 48, x = 118, w = (S.w - x - 59) * pay / 40;
      return S.t(x - 12, y + 21, ad, { a: 'end' })
        + S.kutu(x, y, w, 30, { dolgu: ad === p.mode ? 'accent' : 'basic-soft', renk: 'basic' })
        + S.t(x + w + 5, y + 21, '%' + pay, { c: 'b' });
    }).join(''),
    metin: p => losses.find(row => row[0] === p.mode)[2],
  });

  VIZ.fk04b_guc = el => SEKIL.grafik(el, {
    ...scene('Birim alan başına sabit ısı yayımında toplam güç', 250),
    x: { min: 0, max: 1.6, ad: 'Ele alınan yüzey alanı (m²)', adimlar: [0, .8, 1.6] },
    y: { min: 0, max: 80, ad: 'Yayılan güç (W)', adimlar: [0, 40, 80] },
    param: [{ id: 'alan', ad: 'Ele alınan alan', min: 0, max: 1.6, adim: .1, deger: 1.6, birim: 'm²' }],
    egriler: [{ f: alan => 50 * alan, renk: 'accent' }],
    noktalar: p => [{ x: p.alan, y: 50 * p.alan }],
    okuma: p => '50 W/m² × ' + p.alan.toLocaleString('tr-TR') + ' m² ≈ ' + Math.round(50 * p.alan) + ' W. [[K6 s. 64]]',
  });

  VIZ.fk04b_hat = el => SEKIL.sahne(el, {
    ...scene('İnfüzyon hattında akış yönü ve gaz kabarcığı', 230),
    secenek: choice('Hattın kesiti', ['Giriş', 'Isıtıcı çıkışı', 'Tutucu sonrası']),
    ciz: (S, t, p) => {
      const x = S.w / 2, index = ['Giriş', 'Isıtıcı çıkışı', 'Tutucu sonrası'].indexOf(p.mode);
      let svg = S.t(x, 24, 'Hastaya doğru akış', center);
      ['Sıvı', 'Isıtıcı', 'Tutucu', 'Hasta'].forEach((ad, i) => {
        const a = 7 + i * (S.w - 78) / 3;
        svg += S.kutu(a, 49, 64, 37, { yazi: ad, dolgu: 'basic-soft' });
        if (i < 3) svg += S.ok([[a + 65, 68],[a + (S.w - 78) / 3 - 2, 68]], { renk: index === i ? 'accent' : 'muted', w: index === i ? 4 : 2 });
      });
      svg += S.kutu(x - 120, 120, 240, 57, { dolgu: 'basic-soft', renk: 'basic' });
      if (index < 2) svg += S.daire(x, 148, index === 0 ? 9 : 18, { dolgu: 'paper', renk: 'basic' });
      return svg + S.t(x, 209, ['Sıvı içinde gaz','Isınan gazın hacmi artar','Kabarcık tutulur'][index], center);
    },
    metin: p => ({
      'Giriş': 'Isıtıcıya giren sıvı gaz kabarcığı içerebilir. [[K6 s. 66]]',
      'Isıtıcı çıkışı': 'Isı sıvıya ve içindeki gaza geçer, kabarcık genleşir. [[K6 s. 66]]',
      'Tutucu sonrası': 'Kabarcığı yakalamak için tutucu sıklıkla ısıtıcı ile hasta arasına yerleştirilir. [[K6 s. 66]]',
    })[p.mode],
  });

  VIZ.fk04b_cam = el => SEKIL.cizim(el, {
    baslik: 'Cam termometrenin boyuna kesiti', giris: 'Hazne ile ince sütun arasındaki boğumu bulun. [[K6 s. 67]]',
    gorunumler: [{ ad: 'Boyuna kesit', resim: 'img/fizik/04b-cam.webp', en: 1024, boy: 683,
      kirp: [0, 224, 1024, 234], noktalar: [
        point(120, 350, 'Sıvı haznesi', 'Isınan sıvı genleşerek hazneden ince sütuna doğru ilerler. [[K6 s. 66–67]]'),
        point(246, 342, 'Boğum', 'Bu daralma sayesinde termometre hastadan çıkarıldığında okuma korunur. [[K6 s. 67]]'),
        point(630, 343, 'Sıvı sütunu', 'Sıcaklık yükseldikçe sıvı sütununun uzunluğu doğrusal artar. [[K6 s. 66]]'),
        point(858, 305, 'Cam gövde', 'Cam, dar sıvı sütununu büyüterek görünür kılar. [[K6 s. 67]]'),
      ] }],
  });
  VIZ.fk04b_bourdon = el => SEKIL.cizim(el, {
    baslik: 'Gazla dolu Bourdon termometresi', giris: 'Haznenin kılcal boruyla tüpe bağlandığı yeri ve tüpün ibreye bağlanan ucunu izleyin. [[K6 s. 67]]',
    gorunumler: [{ ad: 'Açık kadran', resim: 'img/fizik/04b-bourdon.webp', en: 1024, boy: 683, noktalar: [
      point(170, 625, 'Hazne', 'Bu örnekte sıcaklığa yanıt veren akışkan gazdır, hazne sıvıyla da doldurulabilir. [[K6 s. 67–68]]'),
      point(490, 621, 'Kılcal boru', 'Haznedeki basınç değişikliği bu bağlantıyla Bourdon tüpüne iletilir. [[K6 s. 67]]'),
      point(577, 222, 'Bourdon tüpü', 'İçi boş kıvrımlı tüp, iç basınç arttığında açılma yönünde hareket eder. [[K6 s. 67]]'),
      point(894, 326, 'Mekanik bağlantı', 'Tüpün ucundaki hareket ibreye aktarılır. [[K6 s. 67]]'),
      point(742, 210, 'İbre', 'İbrenin konumu tüpün açılmasını gösterir. [[K6 s. 67]]'),
      point(842, 107, 'Kadran', 'Kalibre edilmiş kadran sıcaklığın okunmasını sağlar. [[K6 s. 67]]'),
    ] }],
  });

  VIZ.fk04b_direnc = el => SEKIL.sahne(el, {
    ...scene('Isınma ve soğumada iki algılayıcının yanıtı', 182),
    secenek: choice('Prob sıcaklığı', ['Isınıyor','Soğuyor']),
    ciz: (S, t, p) => {
      const hot = p.mode === 'Isınıyor';
      return ['Platin tel','NTC termistör'].map((ad, i) => {
        const x = S.w * (i ? .74 : .26), up = i ? !hot : hot;
        return S.t(x, 25, ad, center)
          + S.ok([[x, up ? 109 : 49],[x, up ? 49 : 109]], { renk: up ? 'accent' : 'clin', w: 6 })
          + S.t(x, 146, up ? 'Direnç artar' : 'Direnç azalır', center);
      }).join('');
    },
    metin: p => p.mode === 'Isınıyor' ? 'Isınmayla platin telin direnci artar, NTC termistörün direnci azalır. [[K6 s. 68–69]]' : 'Soğumayla platin telin direnci azalırken NTC termistörün direnci artar. [[K6 s. 68–69]]',
  });

  VIZ.fk04b_seebeck = el => SEKIL.grafik(el, {
    ...scene('Küçük sıcaklık farkında Seebeck gerilimi', 254),
    x: { min: 0, max: 2, ad: 'Birleşimler arası fark (K)', adimlar: [0, 1, 2] },
    y: { min: 0, max: 2, ad: 'V/S (K)', adimlar: [0, 1, 2] },
    param: [{ id: 'dt', ad: 'Ölçüm ile referans farkı', min: 0, max: 2, adim: 1, deger: 1, birim: 'K' }],
    egriler: [{ f: dt => dt, renk: 'accent' }], noktalar: p => [{ x: p.dt, y: p.dt }],
    okuma: p => 'Referans 0 °C, ölçüm ucu ' + p.dt + ' °C iken V/S = ' + p.dt + ' K olur. [[K6 s. 69–70]]',
  });

  VIZ.fk04b_devre = el => SEKIL.sahne(el, {
    ...scene('Bakır ve konstantan ile iki birleşimli termokupl', 226),
    secenek: choice('Birleşimler', ['Aynı sıcaklık','Ölçüm ucu sıcak']),
    ciz: (S, t, p) => {
      const x = S.w / 2, l = x - 105, r = x + 105, warm = p.mode === 'Ölçüm ucu sıcak';
      return S.cizgi([[l,117],[l,50],[x-25,50]], {renk:'basic',w:4})
        + S.cizgi([[x+25,50],[r,50],[r,117]], {renk:'basic',w:4})
        + S.cizgi([[l,117],[l,176],[r,176],[r,117]], {renk:'clin',w:4})
        + S.daire(x,50,24,{dolgu:'paper'}) + S.t(x,56,'V',center)
        + S.t(l+12,35,'Bakır',center) + S.t(r-12,35,'Bakır',center)
        + S.t(x,201,'Konstantan',center)
        + S.daire(l,117,11,{dolgu:'basic',renk:'basic'})
        + S.daire(r,117,11,{dolgu:warm?'warn':'basic',renk:warm?'warn':'basic'})
        + S.t(l,150,'Referans',center) + S.t(r,150,'Ölçüm',center)
        + S.t(x,105,warm?'V = S · ΔT':'V = 0',center);
    },
    metin: p => p.mode === 'Aynı sıcaklık' ? 'İki birleşim aynı sıcaklıktayken sıcaklık farkından doğan net gerilim sıfırdır. [[K6 s. 69–70]]' : 'Referans sabitken ölçüm ucunu ısıtmak iki birleşim arasında sıcaklık farkı oluşturur ve gerilim okunur. [[K6 s. 69–70]]',
  });

  VIZ.fk04b_kulak = el => SEKIL.sahne(el, {
    ...scene('Kulak kanalından algılayıcıya ışınım yolu', 208),
    secenek: choice('Probun görüş hattı', ['Kanal duvarı','Kulak yukarıda']),
    ciz: (S, t, p) => {
      const clear = p.mode === 'Kulak yukarıda', x = S.w - 50, bend = clear ? 63 : 118;
      let svg = S.cizgi([[65,67],[122,65],[185,bend],[x,63]], { renk: 'basic', w: 5 })
        + S.cizgi([[65,145],[122,144],[185,bend + 66],[x - 10,143]], { renk: 'basic', w: 5 })
        + S.cizgi([[x,63],[x - 10,143]], { renk: 'clin', w: 8 })
        + S.kutu(12,88,59,33,{yazi:'Prob', dolgu:'accent-soft'})
        + S.t(x,45,'Zar',center)
        + S.t(173,31,'Kanal duvarı',center);
      const hitX = clear ? x - 5 : 122 + (105 - 65) * (185 - 122) / (bend - 65);
      return svg + S.ok([[hitX,105],[72,105]], { renk: 'warn', w: 4 })
        + S.t(S.w / 2,201, clear ? 'Zardan gelen ışınım' : 'Duvardan gelen ışınım',center);
    },
    metin: p => p.mode === 'Kulak yukarıda' ? 'Kulağı yukarı kaldırmak cihazla zar arasında açık bir görüş hattı sağlar. [[K6 s. 70–71]]' : 'Cihazın gördüğü kanal duvarı yaklaşık 2 °C daha soğuktur, ölçüm yanlış düşük çıkabilir. [[K6 s. 70–71]]',
  });

  VIZ.fk04b_enerji = el => SEKIL.grafik(el, {
    ...scene('Birinci yasa: alınan ısıya göre iş ve iç enerji', 255),
    x: { min: 0, max: 1, ad: 'İşe giden pay (W/Q)', adimlar: [0, .5, 1] },
    y: { min: 0, max: 1, ad: 'İç enerjide kalan (ΔU/Q)', adimlar: [0, .5, 1] },
    param: [{ id: 'pay', ad: 'İşe giden pay', min: 0, max: 1, adim: .1, deger: .5 }],
    egriler: [{ f: pay => 1 - pay, renk: 'basic' }], noktalar: p => [{ x: p.pay, y: 1 - p.pay }],
    okuma: p => 'Verilen ısının %' + Math.round(p.pay * 100) + ' kadarı iş olarak çıkarsa iç enerjideki artış verilen ısının %' + Math.round((1 - p.pay) * 100) + ' kadarıdır. [[K6 s. 72]]',
  });

  VIZ.fk04b_pompa = el => SEKIL.sahne(el, {
    ...scene('Sıkıştırma sırasında sistem sınırından ısı aktarımı', 190),
    secenek: choice('Lastiği şişirme hızı', ['Hızlı','Yavaş']),
    ciz: (S, t, p) => {
      const x = S.w / 2, quick = p.mode === 'Hızlı';
      return S.t(x,22,'Sıkıştırma işi',center) + S.ok([[x,31],[x,58]],{renk:'accent',w:4})
        + S.kutu(x - 134,61,268,52,{yazi:'Pompa · valf · lastik',dolgu: quick ? 'warn-soft' : 'basic-soft'})
        + S.ok([[x,115],[x,147]],{renk:'clin',w: quick ? 1.5 : 5,kesik:quick})
        + S.t(x,176,quick ? 'Çevreye çok az ısı geçer' : 'Isı çevreye yayılır',center);
    },
    metin: p => p.mode === 'Hızlı' ? 'Hızlı sıkıştırmada gazın sıcaklığı yükselir ve valf ısınır, kısa süredeki ısı alışverişi çok azdır. [[K6 s. 74]]' : 'Yavaş sıkıştırmada ısı çevreye aktarılabildiği için valfte aynı ısınma görülmez. [[K6 s. 74]]',
  });
})();
