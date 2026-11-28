(function () {
  'use strict';
  const VIZ = window.VIZ;
  const tau = 2 * Math.PI;
  const secim = (ad, adlar) => ({ id: 'tur', ad, liste: adlar.map(ad => ({ d: ad, ad })) });
  const olcu = h => ({ vb: [600, h], vbDar: [350, h] });
  const orta = { a: 'middle', c: 'b' };
  const sayi = n => n.toLocaleString('tr-TR', { maximumFractionDigits: 3 });

  VIZ.fk05a_titresim = el => SEKIL.sahne(el, {
    ...olcu(167), baslik: 'Yayılma yönü ve taneciğin hareketi', hareket: true, sure: 4,
    secenek: secim('Salınım yönü', ['Boyuna', 'Enine']),
    ciz(S, t, p) {
      const boyuna = p.tur === 'Boyuna';
      let svg = S.t(S.w / 2, 24, 'Dalganın ilerleyişi', orta) +
        S.ok([ [S.w * 0.25, 39], [S.w * 0.75, 39]], { renk: 'muted' });
      for (let i = 0; i < 29; i++) {
        const x = 25 + (S.w - 50) * i / 28;
        const faz = tau * (2 * i / 28 - t / 4);
        const renk = i === 14 ? 'clin' : 'basic';
        svg += S.daire(x + (boyuna ? 13 * Math.sin(faz) : 0), 97 + (boyuna ? 0 : 27 * Math.sin(faz)),
          i === 14 ? 6 : 3, { renk, dolgu: renk });
      }
      return svg + S.t(S.w / 2, 155, 'Ortadaki iri taneciği izleyin', orta);
    },
    metin: p => p.tur === 'Boyuna' ? 'Tanecik sağa ve sola salınırken sıkışma bölgesi sağa ilerler. [[K6 s. 76–79]]' :
      'Dalga sağa ilerlerken işaretli tanecik yukarı ve aşağı salınır. [[K6 s. 76–77]]',
  });

  VIZ.fk05a_ses = el => SEKIL.grafik(el, {
    ...olcu(230), baslik: 'Aynı havada frekans ve dalga boyu',
    x: { min: 0, max: 340 / 440, ad: 'Başlangıçtan uzaklık (m)', adimlar: [0] },
    y: { min: -1.4, max: 1.4, ad: 'Basınç sapması (göreli)', adimlar: [0] },
    param: [{ id: 'f', ad: 'Frekans', min: 440, max: 880, adim: 1, deger: 440, birim: 'Hz' }],
    egriler: [{ f: (x, p) => Math.sin(tau * x * p.f / 340), renk: 'accent' }],
    ek(S, p, X, Y) {
      const dalgaBoyu = 340 / p.f;
      return S.ok([ [X(0), Y(-1.18)], [X(dalgaBoyu), Y(-1.18)]], { renk: 'clin', cift: true }) +
        S.t(X(dalgaBoyu / 2), Y(-1.18) - 5, 'λ', orta);
    },
    okuma: p => 'Kuru havada hız ≈ 340 m/s iken dalga boyu ≈ ' + sayi(340 / p.f) +
      ' m, bir salınımın süresi ≈ ' + sayi(1000 / p.f) + ' ms olur. [[K6 s. 77–80]]',
  });

  VIZ.fk05a_periyot = el => SEKIL.grafik(el, {
    ...olcu(230), baslik: 'Sabit noktada basıncın zamana göre değişimi',
    x: { min: 0, max: 2000 / 440, ad: 'Zaman (ms)', adimlar: [0] },
    y: { min: -1.4, max: 1.4, ad: 'Basınç sapması (göreli)', adimlar: [0] },
    param: [{ id: 'f', ad: 'Frekans', min: 440, max: 880, adim: 1, deger: 440, birim: 'Hz' }],
    egriler: [{ f: (ms, p) => Math.sin(tau * ms * p.f / 1000), renk: 'basic' }],
    ek(S, p, X, Y) {
      const T = 1000 / p.f;
      return S.ok([ [X(T / 4), Y(1.12)], [X(1.25 * T), Y(1.12)]], { renk: 'clin', cift: true }) +
        S.t(X(0.75 * T), Y(1.12) - 5, 'T', orta);
    },
    okuma: p => 'Ardışık iki basınç tepesinin arasında yaklaşık ' + sayi(1000 / p.f) + ' ms geçer. [[K6 s. 77–80]]',
  });

  VIZ.fk05a_alan = el => SEKIL.sahne(el, {
    ...olcu(200), baslik: 'Yayılma doğrultusuna karşıdan bakış',
    secenek: secim('Gösterilecek alan', ['İki alan', 'Elektrik', 'Manyetik']),
    ciz(S, t, p) {
      const x = S.w / 2, y = 94;
      let svg = '';
      if (p.tur !== 'Manyetik') svg += S.ok([ [x, 151], [x, 43]], { renk: 'accent', cift: true }) + S.t(x, 25, 'Elektrik alanı', orta);
      if (p.tur !== 'Elektrik') svg += S.ok([ [x - 84, y], [x + 84, y]], { renk: 'clin', cift: true }) + S.t(x + 63, y + 27, 'Manyetik alan', orta);
      return svg + S.daire(x, y, 8, { dolgu: 'paper' }) + S.daire(x, y, 2, { dolgu: 'ink' }) +
        S.t(x, 182, '⊙  Yayılma yönü size doğru', orta);
    },
    metin: () => 'Dikey polarizasyonda elektrik alanı dikey, manyetik alan yatay doğrultuda salınır. [[K6 s. 83]]',
  });

  VIZ.fk05a_foton = el => SEKIL.adim(el, {
    ...olcu(120), baslik: 'Işığı nasıl gözlüyoruz?', oto: false,
    adimlar: [
      { ad: 'Yayılma', metin: 'Ayrı kaynaklardan gelen ışığın girişimi dalga davranışını gösterir. [[K6 s. 82]]',
        ciz: S => S.kutu(15, 24, S.w - 30, 70, { yazi: ['İki ışık kaynağı', '→ örtüşen dalgalar → girişim'], dolgu: 'basic-soft' }) },
      { ad: 'Enerji alışverişi', metin: 'Atom ışınım yayarken ya da soğururken enerji, foton adı verilen paketler hâlinde aktarılır. [[K6 s. 82]]',
        ciz: S => S.kutu(15, 24, S.w - 30, 70, { yazi: ['Atom ile ışınım arasında', 'bir kuantum enerji · E = h f'], dolgu: 'clin-soft' }) },
    ],
  });

  VIZ.fk05a_polarizor = el => SEKIL.cizim(el, {
    baslik: 'Çapraz polarizörlerin ortak alanı', giris: 'Tek filtreden ve iki filtreden görülen alanları karşılaştırın. [[K6 s. 83–84]]',
    gorunumler: [{ ad: 'Karşıdan', resim: 'img/fizik/05a-polarizor.webp', en: 1024, boy: 683, noktalar: [
      { x: 280, y: 340, ad: 'İlk filtre', metin: 'İlk filtre yalnız kendi geçirgenlik doğrultusundaki elektrik alan bileşenini geçirir. [[K6 s. 83]]' },
      { x: 735, y: 340, ad: 'İkinci filtre', metin: 'İkinci filtrenin geçirgenlik doğrultusu ilkine diktir. [[K6 s. 83–84]]' },
      { x: 512, y: 340, ad: 'Ortak alan', metin: 'Bu bölgede ışık iki filtreyle art arda karşılaşır ve çapraz filtrelerden geçemez. [[K6 s. 83–84]]' },
    ] }],
  });

  VIZ.fk05a_eksen = el => SEKIL.sahne(el, {
    ...olcu(170), baslik: 'İkinci polarizörün geçirgenlik doğrultusu',
    secenek: secim('İkinci filtreyi döndürün', ['Paralel', 'Çapraz']),
    ciz(S, t, p) {
      const merkezler = [S.w / 4, 3 * S.w / 4];
      let svg = '';
      merkezler.forEach((x, i) => {
        const dikey = !i || p.tur === 'Paralel';
        svg += S.t(x, 24, i ? 'İkinci filtre' : 'İlk filtre', orta) +
          S.daire(x, 84, 40, { renk: i ? 'clin' : 'basic', dolgu: i ? 'clin-soft' : 'basic-soft' }) +
          S.ok(dikey ? [ [x, 112], [x, 56]] : [ [x - 28, 84], [x + 28, 84]], { cift: true });
      });
      return svg + S.t(S.w / 2, 152, p.tur === 'Paralel' ? 'Çıkış: dikey polarize ışık' : 'Çıkış: ışık geçmez', orta);
    },
    metin: p => p.tur === 'Paralel' ? 'İlk filtrenin geçirdiği dikey bileşen ikinci filtrenin de geçirgenlik doğrultusundadır. [[K6 s. 83]]' :
      'İkinci filtre ilkine göre 90° döndürüldüğünde gelen ışığın bu doğrultuda bileşeni kalmaz. [[K6 s. 83–84]]',
  });

  VIZ.fk05a_girisim = el => SEKIL.sahne(el, {
    ...olcu(305), baslik: 'İki dalga ve nokta nokta toplamları',
    param: [{ id: 'faz', ad: 'Faz farkı', min: 0, max: 180, deger: 0, adim: 1, birim: '°' }],
    ciz(S, t, p) {
      const faz = Math.PI * p.faz / 180;
      let svg = '';
      ['Birinci dalga', 'İkinci dalga', 'Toplam'].forEach((ad, i) => {
        const y = 54 + i * 99;
        const renk = ['basic', 'clin', 'accent'][i];
        const noktalar = Array.from({ length: 121 }, (_, k) => {
          const a = tau * 2 * k / 120;
          const v = [Math.sin(a), Math.sin(a + faz), Math.sin(a) + Math.sin(a + faz)][i];
          return [16 + (S.w - 32) * k / 120, y - 17 * v];
        });
        svg += S.t(16, y - 38, ad, { c: 'b', renk }) +
          S.cizgi([ [16, y], [S.w - 16, y]], { renk: 'line', kesik: true }) + S.cizgi(noktalar, { renk, w: 3 });
      });
      return svg;
    },
    metin: p => p.faz === 180 ? 'Birinin tepesi diğerinin çukuruna denk gelir. [[K6 s. 84]] Eşit genlikli bu iki dalganın toplamı sıfırdır. [[K6 s. 84]]' :
      p.faz === 0 ? 'Tepeler çakışır ve toplam genlik tek dalganın genliğinin iki katına çıkar. [[K6 s. 84]]' :
      'Aynı noktadaki iki sapmayı işaretleriyle toplayarak alttaki eğriyi elde edin. [[K6 s. 84]]',
  });

  VIZ.fk05a_kulaklik = el => SEKIL.cizim(el, {
    baslik: 'Gürültü önleyici kulaklığın sinyal yolu', giris: 'Ortamdan dinleyiciye doğru sinyali izleyin. [[K6 s. 85]]',
    gorunumler: [{ ad: 'Tek kulaklık kesiti', resim: 'img/fizik/05a-kulaklik.webp', en: 1024, boy: 683, noktalar: [
      { x: 228, y: 352, ad: 'Dış mikrofon', metin: 'Her kulaklığın dışındaki küçük mikrofon ortam sesini alıp elektronik devreye iletir. [[K6 s. 85]]' },
      { x: 394, y: 355, ad: 'Elektronik devre', metin: 'Devre sinyali tersine çevirerek ortam sesine göre 180° faz farkı oluşturur. [[K6 s. 85]]' },
      { x: 659, y: 363, ad: 'Dinleyiciye ses çıkışı', metin: 'Karşı sinyal uygun genliğe yükseltilip hemen dinleyiciye verildiğinde ortam sesi neredeyse bütünüyle söner. [[K6 s. 85]]' },
    ] }],
  });
})();
