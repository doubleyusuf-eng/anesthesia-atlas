(function () {
  'use strict';
  const VIZ = window.VIZ;
  const orta = { a: 'middle', c: 'b' };
  const boyut = { vb: [420, 220], vbDar: [360, 220] };
  const sec = (ad, adlar) => ({ id: 'kip', ad, liste: adlar.map(ad => ({ d: ad, ad })) });
  function tane(S, x, y, isaret, renk, r = 12) {
    return S.daire(x, y, r, { renk, dolgu: renk + '-soft' }) + S.t(x, y + 5, isaret, orta);
  }

  VIZ.fk01_atom = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Helyum çekirdeğinde ne değişir?',
    param: [{ id: 'n', ad: 'Nötron sayısı', min: 1, max: 2, adim: 1, deger: 2 }],
    ciz(S, t, { n }) {
      const x = S.w / 2;
      let s = S.daire(x, 100, 74, { renk: 'line' });
      s += tane(S, x - 11, 87, '+', 'clin') + tane(S, x + 11, 110, '+', 'clin');
      s += tane(S, x + 12, 86, '0', 'basic');
      if (n === 2) s += tane(S, x - 12, 111, '0', 'basic');
      return s + tane(S, x - 74, 100, '−', 'accent') + tane(S, x + 74, 100, '−', 'accent')
        + S.t(x, 201, 'He-' + (2 + n) + '     Z = 2     A = ' + (2 + n), orta);
    },
    metin: ({ n }) => 'İki proton ve ' + (n === 1 ? 'bir nötron He-3' : 'iki nötron He-4') + ' çekirdeğini oluşturur. [[K6 s. 20]]',
  });

  VIZ.fk01_bag = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Paylaşım ve aktarım', secenek: sec('Bağ', ['Kovalent', 'İyonik']),
    ciz(S, t, { kip }) {
      const x = S.w / 2, ortak = kip === 'Kovalent';
      let s = tane(S, x - 83, 99, ortak ? '+' : 'Na⁺', 'clin', 31)
        + tane(S, x + 83, 99, ortak ? '+' : 'Cl⁻', 'basic', 31);
      if (ortak) {
        s += S.daire(x, 99, 19, { renk: 'accent', dolgu: 'accent-soft' })
          + S.t(x, 104, 'e⁻', orta)
          + S.ok([[x - 21,99],[x - 48,99]], { renk: 'accent' })
          + S.ok([[x + 21,99],[x + 48,99]], { renk: 'accent' });
      } else {
        s += S.ok([[x - 72,60],[x - 42,40],[x + 42,40],[x + 72,60]], { renk: 'accent' })
          + S.t(x, 31, 'e⁻ aktarımı', orta);
      }
      return s + S.t(x, 175, ortak ? 'İki çekirdeğin çektiği elektron' : 'Aktarım sonrası karşıt yüklü iyonlar', orta);
    },
    metin: ({ kip }) => kip === 'Kovalent' ? 'Ortak elektron bulutunu iki çekirdek birden çeker. [[K6 s. 21]]' : 'Elektronu veren sodyum katyon, alan klor anyon olur. [[K6 s. 21]]',
  });

  const haller = {
    Katı: 'Yakın ve düzenli tanecikler denge konumları çevresinde titreşir. [[K6 s. 22]]',
    Sıvı: 'Yakın tanecikler birbirlerinin yanından kayarak yer değiştirir. [[K6 s. 22]]',
    Gaz: 'Birbirinden uzak moleküller bağımsız hareket eder ve rastgele çarpışır. [[K6 s. 22]]',
    Plazma: 'Çok yüksek sıcaklıkta atomlardan elektronlar ayrılır ve gaz benzeri ortamda serbest yükler bulunur. [[K6 s. 25]]',
  };
  VIZ.fk01_hal = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Taneciklerin aralığı, düzeni ve hareketi', hareket: true,
    secenek: sec('Madde hâli', Object.keys(haller)), metin: p => haller[p.kip],
    ciz(S, t, { kip }) {
      let s = S.kutu(10, 12, S.w - 20, 190, { renk: 'line' });
      for (let i = 0; i < 12; i++) {
        const sutun = i % 4, sira = Math.floor(i / 4);
        let x, y;
        if (kip === 'Katı' || kip === 'Sıvı') {
          const sivi = kip === 'Sıvı';
          x = S.w / 2 + (sutun - 1.5) * 25 + Math.sin(t * 2 + (sivi ? sira : i)) * (sivi ? 13 : 1.6);
          y = 105 + (sira - 1) * 26 + Math.cos(t + i) * (sivi ? 5 : 1.6);
        } else {
          const sek = a => 1 - Math.abs((a % 2) - 1);
          x = 29 + sek(i * 0.53 + t * (0.09 + i * 0.003)) * (S.w - 58);
          y = 31 + sek(i * 0.79 + t * (0.12 + (i % 3) * 0.014)) * 150;
        }
        s += kip === 'Plazma' ? tane(S, x, y, i % 2 ? '−' : '+', i % 2 ? 'basic' : 'clin', 10)
          : S.daire(x, y, 9, { renk: 'basic', dolgu: 'basic-soft' });
      }
      return s;
    },
  });

  const enerji = dt => 4.18 * dt;
  VIZ.fk01_isi = el => SEKIL.grafik(el, {
    baslik: 'Bir gram sıvı suda sıcaklık artışının enerji karşılığı', vb: [500, 240], vbDar: [360, 240],
    x: { min: 0, max: 1, ad: 'Sıcaklık artışı (°C)', adimlar: [0, 1] },
    y: { min: 0, max: 4.18, ad: 'Q (J)', adimlar: [0] },
    param: [{ id: 'dt', ad: 'Sıcaklık artışı', min: 0, max: 1, adim: 0.01, deger: 1, birim: '°C' }],
    egriler: [{ f: enerji }], yatay: () => [{ y: 4.18 }],
    ek: (S, p, X, Y) => S.t(X(0) + 7, Y(4.18) + 20, '4,18 J'), noktalar: ({ dt }) => [{ x: dt, y: enerji(dt) }],
    okuma: ({ dt }) => '1 g su için ΔT = ' + dt.toLocaleString('tr-TR') + ' °C ve Q = ' + enerji(dt).toLocaleString('tr-TR', { maximumFractionDigits: 4 }) + ' J. [[K6 s. 23]]',
  });

  const evre = ['Katı ısınır', 'Erime', 'Sıvı ısınır', 'Buharlaşma'];
  VIZ.fk01_plato = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Parafinin ısıtılması', secenek: sec('Evre', evre),
    ciz(S, t, { kip }) {
      const nokta = [[0,172],[0.24,104],[0.51,104],[0.72,47],[1,47]].map(([u,y]) => [54 + u * (S.w - 77), y]);
      const i = evre.indexOf(kip);
      return S.ok([[38,181],[38,29]]) + S.ok([[38,181],[S.w - 12,181]])
        + S.t(38, 20, 'Sıcaklık') + S.t(S.w / 2, 210, 'Eklenen ısı', orta)
        + S.cizgi(nokta, { renk: 'muted' }) + S.cizgi(nokta.slice(i, i + 2), { renk: 'accent', w: 6 })
        + S.t(nokta[1][0], 89, '≈59 °C', orta);
    },
    metin: ({ kip }) => ({
      'Katı ısınır': 'Oda sıcaklığındaki parafin ısı aldıkça erime noktasına yaklaşır. [[K6 s. 23]]',
      'Erime': 'Erime tamamlanana kadar alınan enerji bağları çözmek için kullanılır. [[K6 s. 23]]',
      'Sıvı ısınır': 'Son katı parça da eridikten sonra sıcaklık yeniden artar. [[K6 s. 23]]',
      'Buharlaşma': 'Fırın yeterince sıcaksa parafin buharlaşır ve faz değişimi boyunca sıcaklık sabit kalır. [[K6 s. 23]]',
    })[kip],
  });

  VIZ.fk01_faz = el => SEKIL.sahne(el, {
    vb: [420, 275], vbDar: [360, 275], baslik: 'Suyun basınç–sıcaklık diyagramı',
    secenek: sec('Sınır', ['Üçlü nokta', 'Erime çizgisi', 'Kritik nokta']),
    ciz(S, t, { kip }) {
      const u = [128,174], k = [S.w - 55,58], erime = [[109,43],u];
      const etkin = (ad) => kip === ad ? 'accent' : 'muted';
      return S.ok([[30,225],[30,32]]) + S.ok([[30,225],[S.w - 13,225]]) + S.t(30,22,'Basınç')
        + S.t(S.w/2,258,'Sıcaklık',orta)
        + S.cizgi([[47,213],[82,201],u], { renk:'muted' }) + S.cizgi(erime, { renk: etkin('Erime çizgisi'), w: 3 })
        + S.cizgi([u,[173,160],[218,136],[k[0]-28,96],k], { renk:'muted' })
        + S.daire(...u, 6, { dolgu: etkin('Üçlü nokta') }) + S.daire(...k, 6, { dolgu: etkin('Kritik nokta') })
        + S.t(74,139,'Katı',orta) + S.t(181,104,'Sıvı',orta) + S.t(242,196,'Gaz',orta);
    },
    metin: ({ kip }) => ({
      'Üçlü nokta': 'Üç sınırın kesiştiği noktada buz, su ve buhar dengededir. [[K6 s. 25–27]]',
      'Erime çizgisi': 'Basınç arttıkça suyun katı–sıvı sınırı daha düşük sıcaklığa kayar. [[K6 s. 26]]',
      'Kritik nokta': 'Sıvı–gaz sınırı su için 374 °C ve 218 bar değerinde sonlanır. [[K6 s. 26]]',
    })[kip],
  });

  VIZ.fk01_caydanlik = el => SEKIL.cizim(el, {
    baslik: 'Çaydanlığın ağzından çıkan su hangi hâlde?', giris: 'İki bölgeye sırayla dokunun.',
    gorunumler: [{ ad: 'Yandan', resim: 'img/fizik/01-caydanlik.webp', en: 1024, boy: 525,
      noktalar: [
        { x: 471, y: 251, ad: 'Görünmeyen buhar', metin: 'Çaydanlığın ağzının hemen dışında su gaz fazındadır ve gözle görülmez. [[K6 s. 27]]' },
        { x: 762, y: 154, ad: 'Görünen damlacıklar', metin: 'Beyaz bulutu, buhar yoğuşunca oluşan küçük sıvı su damlacıkları oluşturur. [[K6 s. 27]]' },
      ],
    }],
  });
})();
