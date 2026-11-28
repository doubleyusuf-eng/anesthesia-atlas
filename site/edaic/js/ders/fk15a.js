(function () {
  'use strict';
  const VIZ = window.VIZ;
  const rad = Math.PI / 180;
  const kritik = Math.asin(1 / 1.5) / rad;
  const derece = aci => aci.toLocaleString('tr-TR', { maximumFractionDigits: 1 }) + '°';
  const secim = (ad, adlar) => ({ id: 'secili', ad, liste: adlar.map(ad => ({ d: ad, ad })) });
  const ortala = { a: 'middle', c: 'b' };

  // İki ışın da aynı uzunluk ölçeğinde, yüzey normaline göre çizilir.
  function isinlar(S, gelis, cikis, yansir, camdan) {
    const x = S.w / 2, y = 144, boy = 103;
    const uc = (aci, yonX, yonY) => [x + yonX * boy * Math.sin(aci * rad), y + yonY * boy * Math.cos(aci * rad)];
    return S.kutu(4, camdan ? 36 : y, S.w - 8, 108, { dolgu: 'basic-soft', r: 0 }) +
      S.cizgi([[5, y], [S.w - 5, y]], { renk: 'ink' }) +
      S.cizgi([[x, 34], [x, 253]], { renk: 'muted', kesik: true }) +
      S.t(x, 24, 'Normal', ortala) +
      S.t(12, 59, camdan ? 'Cam' : 'Hava') + S.t(12, 244, camdan ? 'Hava' : 'Cam') +
      S.ok([uc(gelis, -1, -1), [x, y]], { renk: 'accent', w: 4 }) +
      S.ok([[x, y], uc(cikis, 1, yansir ? -1 : 1)], { renk: 'clin', w: 4 });
  }
  VIZ.fk15a_snell = el => SEKIL.sahne(el, {
    baslik: 'Havadan cama geçen ışın', vb: [420, 260], vbDar: [320, 260],
    param: [{ id: 'aci', ad: 'Geliş açısı', min: 0, max: 89, adim: 1, deger: 30, birim: '°' }],
    ciz: (S, t, p) => isinlar(S, p.aci, Math.asin(Math.sin(p.aci * rad) / 1.5) / rad, false, false),
    metin: p => 'Geliş ' + derece(p.aci) + ' · Kırılma ' + derece(Math.asin(Math.sin(p.aci * rad) / 1.5) / rad) +
      ' (hava ≈ 1, cam ≈ 1,5). [[K6 s. 261–262]]'
  });

  const esikler = ['Kritik açının altında', 'Kritik açıda', 'Kritik açının üstünde'];
  function esikIsini(secili) {
    if (secili === esikler[1]) return { gelis: kritik, cikis: 90, yansir: false };
    if (secili === esikler[2]) {
      const gelis = (kritik + 90) / 2;
      return { gelis, cikis: gelis, yansir: true };
    }
    const gelis = kritik / 2;
    return { gelis, cikis: Math.asin(1.5 * Math.sin(gelis * rad)) / rad, yansir: false };
  }
  VIZ.fk15a_esik = el => SEKIL.sahne(el, {
    baslik: 'Camdan havaya geçişte kritik açı', vb: [420, 260], vbDar: [320, 260],
    secenek: secim('Geliş açısını seçin', esikler),
    ciz: (S, t, p) => {
      const a = esikIsini(p.secili);
      return isinlar(S, a.gelis, a.cikis, a.yansir, true);
    },
    metin: p => {
      const a = esikIsini(p.secili);
      const sonuc = a.yansir ? 'Işın bütünüyle cama geri yansır' :
        p.secili === esikler[1] ? 'Kırılan ışın yüzey boyunca gider (90°)' : 'Işın havaya ' + derece(a.cikis) + ' açıyla çıkar';
      return 'Geliş ' + derece(a.gelis) + ' · ' + sonuc + '. [[K6 s. 261–264]]';
    }
  });

  // Ters okumada çıkış açısı seçilir. Eğrinin son noktası kritik geliş açısıdır.
  VIZ.fk15a_egri = el => SEKIL.grafik(el, {
    baslik: 'Camdan havaya kırılmanın sınırı', vb: [530, 285], vbDar: [332, 260],
    x: { min: 0, max: kritik, ad: 'Camdaki geliş açısı (°)', adimlar: [0, 15, 30] },
    y: { min: 0, max: 90, ad: 'Havadaki kırılma açısı (°)', adimlar: [0, 45, 90] },
    param: [{ id: 'cikis', ad: 'Havadaki kırılma açısı', min: 0, max: 90, adim: 1, deger: 45, birim: '°' }],
    egriler: [{ f: x => Math.asin(Math.min(1, 1.5 * Math.sin(x * rad))) / rad }],
    noktalar: p => [{ x: Math.asin(Math.sin(p.cikis * rad) / 1.5) / rad, y: p.cikis }],
    okuma: p => 'Havada ' + derece(p.cikis) + ' için camdaki geliş açısı ≈ ' +
      derece(Math.asin(Math.sin(p.cikis * rad) / 1.5) / rad) + '. [[K6 s. 261–264]]'
  });

  const katlar = ['Çekirdek', 'Cam kaplama', 'Birincil koruyucu'];
  const renkler = ['accent', 'basic', 'muted'];
  const katMetni = [
    'Işık, saydam silika çekirdekte çekirdek–kaplama sınırından art arda tam iç yansıma yaparak ilerler. [[K6 s. 264–265]]',
    'Kırılma indisi çekirdekten düşük cam kaplama, ışığın yansıdığı sınırı oluşturur. [[K6 s. 265]]',
    'En dıştaki plastik katman kırılgan cam kaplamayı korur. [[K6 s. 265]]'
  ];
  VIZ.fk15a_lif = el => SEKIL.sahne(el, {
    baslik: 'Lifin enine ve boyuna kesitleri', vb: [360, 252], vbDar: [320, 252],
    secenek: secim('Katmanı seçin', katlar),
    ciz: (S, t, p) => {
      const i = katlar.indexOf(p.secili), x = S.w / 2;
      let svg = '';
      for (let k = 2; k >= 0; k--) {
        const stil = { renk: renkler[k], dolgu: k === i ? renkler[k] : 'paper', r: 0 };
        svg += S.daire(x, 65, [29, 42, 55][k], stil) +
          S.kutu(12, [171, 160, 149][k], S.w - 24, [42, 64, 86][k], stil);
      }
      const pas = (S.w - 40) / 7;
      const pts = [192, 171, 213, 171, 213].map((y, k) => [20 + (k ? 2 * k - 1 : 0) * pas, y]);
      return svg + S.ok(pts, { renk: i === 0 ? 'paper' : 'accent', w: 3 });
    },
    metin: p => katMetni[katlar.indexOf(p.secili)]
  });

  const duraklar = ['Verici', 'Tekrarlayıcı', 'Alıcı'];
  const sinyaller = [
    ['Analog elektrik sinyali', 'Kızılötesi ışık darbeleri'],
    ['Zayıflayan ışık darbeleri', 'Güçlendirilmiş darbeler'],
    ['Kızılötesi ışık darbeleri', 'Elektrik sinyali']
  ];
  VIZ.fk15a_iletim = el => SEKIL.adim(el, {
    baslik: 'Uzun mesafeli optik bağlantı', vb: [430, 230], vbDar: [320, 230], oto: false,
    adimlar: [
      { ad: duraklar[0], metin: 'Telefon konuşmasını taşıyan analog elektrik sinyali vericide sayısal kızılötesi lazer darbelerine çevrilir. [[K6 s. 264]]' },
      { ad: duraklar[1], metin: 'Uzun kabloda optik sinyal zayıflar. [[K6 s. 264]] Yaklaşık 200 km aralıklarla yerleştirilen lazer tekrarlayıcılar sinyali güçlendirir. [[K6 s. 264]]' },
      { ad: duraklar[2], metin: 'Alıcıdaki ışık dedektörü optik darbeleri yeniden bir elektrik sinyaline çevirir. [[K6 s. 264]]' }
    ],
    ortak: (S, i) => {
      const x = S.w / 2;
      return S.kutu(x - 118, 6, 236, 45, { yazi: sinyaller[i][0] }) +
        S.ok([[x, 54], [x, 84]], { renk: 'muted' }) +
        S.kutu(x - 96, 89, 192, 45, { yazi: duraklar[i], dolgu: 'basic-soft', renk: 'basic' }) +
        S.ok([[x, 137], [x, 169]], { renk: 'muted' }) +
        S.kutu(x - 118, 174, 236, 45, { yazi: sinyaller[i][1] });
    }
  });

  const demetler = ['Düzenli', 'Düzensiz'];
  VIZ.fk15a_demet = el => SEKIL.sahne(el, {
    baslik: 'Bir desenin iki lif demetinden geçişi', vb: [340, 155], vbDar: [320, 155],
    secenek: secim('Lif demeti', demetler),
    ciz: (S, t, p) => {
      const giris = [0, 3, 6, 7, 8], karisik = [4, 2, 7, 8, 6, 0, 1, 3, 5];
      function yuz(x, acik) {
        let svg = S.kutu(x - 50, 39, 100, 104, { dolgu: 'chip' });
        for (let i = 0; i < 9; i++) {
          svg += S.daire(x + ((i % 3) - 1) * 29, 63 + Math.floor(i / 3) * 29, 11,
            { dolgu: acik.includes(i) ? 'accent' : 'paper', renk: 'muted' });
        }
        return svg;
      }
      const sol = S.w / 4, sag = 3 * sol;
      return S.t(sol, 26, 'Giriş', ortala) + S.t(sag, 26, 'Çıkış', ortala) +
        yuz(sol, giris) + yuz(sag, p.secili === 'Düzenli' ? giris : giris.map(i => karisik[i])) +
        S.ok([[sol + 54, 90], [sag - 54, 90]], { renk: 'muted' });
    },
    metin: p => p.secili === 'Düzenli' ? 'Aydınlık liflerin oluşturduğu L deseni çıkışta da seçilir, çünkü liflerin göreli konumları korunur. [[K6 s. 266]]' :
      'Aydınlık lifler çıkışta farklı yerlere dağılır. [[K6 s. 266]] Böyle bir demet görüş alanına ışık taşımaya uygundur. [[K6 s. 266]]'
  });

  VIZ.fk15a_transduser = el => SEKIL.cizim(el, {
    baslik: 'Kateter ucundaki basınç algılayıcısının boyuna kesiti',
    giris: 'Işığın yansıtıcı zarla buluştuğu ucu bulun. [[K6 s. 265–266]]',
    gorunumler: [{ ad: 'Boyuna kesit', resim: 'img/fizik/15a-transduser.webp', en: 1024, boy: 342, kirp: [180, 48, 840, 256], noktalar: [
      { x: 571, y: 177, ad: 'Optik lif demeti', metin: 'Lifler zarın üzerine ışık taşır ve yansıyan ışığı geri iletir. [[K6 s. 265–266]]' },
      { x: 960, y: 173, ad: 'Yansıtıcı metal zar', metin: 'Dış basınç zarı eğdiğinde geri dönen ışığın şiddeti değişir. [[K6 s. 265]]' }
    ] }]
  });
  VIZ.fk15a_bronkoskop = el => SEKIL.cizim(el, {
    baslik: 'Fiberoptik bronkoskop ve distal ucu',
    giris: 'Distal uçtaki yolları bulun, sonra genel görünümde görüntünün gözlemciye ulaştığı yeri seçin. [[K6 s. 266–267]]',
    gorunumler: [{ ad: 'Distal uç', resim: 'img/fizik/15a-bronkoskop.webp', en: 1024, boy: 683, kirp: [160, 38, 840, 630], noktalar: [
      { x: 378, y: 261, ad: 'Görüntü penceresi', metin: 'Görüntü düzenli demetin distal yüzüne odaklanır. [[K6 s. 266]]' },
      { x: 577, y: 273, ad: 'Aydınlatma penceresi', metin: 'Düzensiz lif demeti dış kaynaktan gelen ışığı hava yoluna taşır. [[K6 s. 266–267]]' },
      { x: 457, y: 472, ad: 'Aspirasyon kanalı', metin: 'Bu kanaldan mukus aspire edilebilir veya biyopsi forsepsi ilerletilebilir. [[K6 s. 267]]' },
      { x: 829, y: 138, ad: 'Dış kılıf', metin: 'Esnek, su geçirmez kılıf iç bileşenleri vücut sıvılarından korur. [[K6 s. 267]]' }
    ] }, { ad: 'Genel görünüm', resim: 'img/fizik/15a-govde.webp', en: 1024, boy: 683, noktalar: [
      { x: 43, y: 46, ad: 'Oküler', metin: 'Gözlemci proksimal uçtaki okülerden hava yolunun görüntüsünü izleyebilir. [[K6 s. 266–267]]' },
      { x: 82, y: 234, ad: 'Kontrol tekerleği', metin: 'Tekerlek çevrilince gövde içindeki ince teller distal uçtaki esnek bölümün yönünü değiştirir. [[K6 s. 267]]' },
      { x: 747, y: 107, ad: 'Işık kılavuzu', metin: 'Dış kaynaktan gelen ışık görüş alanına iletilir. [[K6 s. 266]]' },
      { x: 555, y: 630, ad: 'Gövde', metin: 'Gövde, görüntü demeti, ışık kılavuzu ve yardımcı tüpleri bir arada tutar. [[K6 s. 266]]' },
      { x: 995, y: 543, ad: 'Yönlendirilebilir uç', metin: 'Ucu bükmek, bronş ağacında seçilen dalın izlenmesini sağlar. [[K6 s. 267]]' }
    ] }]
  });
})();
