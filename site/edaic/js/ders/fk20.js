(function () {
  'use strict';
  const VIZ = window.VIZ;
  const merkez = { a: 'middle', c: 'b' };
  const sayi = n => n.toLocaleString('tr-TR', { maximumFractionDigits: 3 });
  const boyut = { vb: [560, 224], vbDar: [320, 224] };

  function secim(ad, secenekler) {
    return { id: 'kip', ad, liste: secenekler.map(([d, ad]) => ({ d, ad })) };
  }

  function etiket(S, x, y, w, yazi, renk) {
    return S.kutu(x, y, w, 42, { yazi, renk, dolgu: renk + '-soft' });
  }

  const direncler = { ciplak: 1500, ayakkabi: 240000, yuksek: 10000 };
  const miliamper = (v, kip) => 1000 * v / direncler[kip];
  VIZ.fk20_akim = el => SEKIL.grafik(el, {
    ...boyut, baslik: 'Gerilim ve şok akımı',
    secenek: secim('Akım yolu', [['ciplak', 'Çıplak ayak'], ['ayakkabi', 'Ayakkabılı'], ['yuksek', 'Tabloda yüksek direnç']]),
    param: [{ id: 'v', ad: 'Temas gerilimi', min: 0, max: 240, deger: 240, adim: 1, birim: 'V' }],
    x: { min: 0, max: 240, ad: 'Gerilim (V)', adimlar: [0, 100, 240] },
    y: { min: 0, max: 160, ad: 'Akım (mA)', adimlar: [0, 100, 160] },
    egriler: [{ f: (v, p) => miliamper(v, p.kip), renk: 'clin' }],
    noktalar: p => [{ x: p.v, y: miliamper(p.v, p.kip) }],
    okuma: p => `Gerilim ${p.v} V ve direnç ${sayi(direncler[p.kip])} Ω iken I = V / R hesabıyla ${sayi(miliamper(p.v, p.kip))} mA bulunur. [[K6 s. 329–331]]`,
  });

  VIZ.fk20_izolasyon = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Hasta devresinin beslemesi',
    secenek: secim('Besleme', [['trafo', 'İzolasyon transformatörü'], ['pil', 'Pil']]),
    ciz(S, t, { kip }) {
      const x = S.w / 2, pil = kip === 'pil';
      const sol = pil ? x - 96 : x + 14, sag = S.w - 26;
      const loop = [[sol, 72], [sol, 42], [sag, 42], [sag, 156], [sol, 156], [sol, 114]];
      let devre = S.cizgi(loop, { renk: 'clin' })
        + etiket(S, sol - 10, 72, 90, pil ? 'Pil' : 'Sekonder', 'clin')
        + etiket(S, sag - 68, 135, 78, 'Cihaz', 'clin');
      if (!pil) {
        devre += S.cizgi([[x - 22, 72], [x - 22, 42], [24, 42], [24, 156], [x - 22, 156], [x - 22, 114]], { renk: 'basic' })
          + etiket(S, x - 111, 72, 98, 'Primer', 'basic') + S.t(36, 148, 'Şebeke', { c: 'k' })
          + S.cizgi([[x, 27], [x, 171]], { renk: 'muted', kesik: true });
      }
      return devre + S.t(x, 205, pil ? 'Taşınabilir düşük gerilim kaynağı' : 'Sargılar arasında iletken bağlantı yok', merkez);
    },
    metin: ({ kip }) => kip === 'pil' ? 'Pil düşük gerilim sağlar ve düzenli şarj ya da değişim gerektirir. [[K6 s. 330]]'
      : 'Alçaltıcı transformatör hasta tarafını şebekeden ayırır ve hasta devresine daha düşük gerilim uygular. [[K6 s. 330]]',
  });

  VIZ.fk20_toprak = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Lamba gövdesinden toprağa giden yol',
    secenek: secim('Bağlantı', [['saglam', 'Topraklı gövde'], ['kopuk', 'Topraksız gövde'], ['ac', 'Kapasitif kaçak']]),
    ciz(S, t, { kip }) {
      const x = S.w / 2, sol = 70, sag = S.w - 70;
      let hat = S.ok([[sol + 50, 53], [sag - 50, 53]], { renk: 'muted', kesik: kip === 'ac' });
      if (kip === 'saglam') hat += S.ok([[sol, 74], [sol, 174], [x - 46, 174]], { renk: 'ok', w: 4 });
      hat += S.ok([[sag, 74], [sag, 174], [x + 46, 174]], { renk: kip === 'saglam' ? 'muted' : 'warn', soluk: kip === 'saglam' });
      return hat + etiket(S, sol - 54, 32, 108, kip === 'ac' ? 'AC tel' : 'Gövde', 'basic')
        + etiket(S, sag - 54, 32, 108, 'Hasta', 'clin') + etiket(S, x - 46, 153, 92, 'Toprak', 'basic')
        + S.t(x, 119, kip === 'saglam' ? 'Koruyucu tel' : kip === 'ac' ? 'Yalıtım üzerinden kuplaj' : 'Yatak üzerinden dönüş', merkez);
    },
    metin: ({ kip }) => ({
      saglam: 'Arızalı gövdenin toprak teli hastadan çok daha düşük dirençli bir yol sağlar. [[K6 s. 332–333]]',
      kopuk: 'Koruyucu yol bulunmadığında topraklı yatağa dokunan hasta, gövdeden toprağa giden yolu tamamlar. [[K6 s. 332–333]]',
      ac: 'Kesikli çizgi, yalıtılmış AC telinden parmağa kapasitif kuplajla geçebilen küçük kaçak akımı gösterir. [[K6 s. 334–335]]',
    })[kip],
  });

  VIZ.fk20_rcd = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Çalışma akımı ve arıza akımı',
    secenek: secim('Durum', [['normal', 'Normal çalışma'], ['sigorta', 'Toprak sağlam'], ['rcd', 'Toprak kopuk']]),
    ciz(S, t, { kip }) {
      const sag = S.w - 64, sol = 64, renk = kip === 'normal' ? 'clin' : 'warn';
      return S.ok([[sol, 90], [sol, 49], [sag, 49], [sag, 90]], { renk })
        + S.ok([[sag, 132], [sag, 166], [sol, 166], [sol, 132]], { renk: 'basic' })
        + etiket(S, sol - 52, 90, 104, kip === 'sigorta' ? 'Sigorta' : 'RCD', 'basic')
        + etiket(S, sag - 52, 90, 104, 'Cihaz', 'clin')
        + S.t(S.w / 2, 38, 'Faz', merkez) + S.t(S.w / 2, 187, 'Nötr', merkez)
        + (kip === 'normal' ? '' : S.ok([[sag, 132], [sag + 44, 183]], { renk: 'warn' }) + S.t(sag + 48, 205, 'Toprak', { a: 'end' }))
        + S.t(S.w / 2, 76, kip === 'normal' ? 'Giren = dönen' : kip === 'sigorta' ? 'Büyük arıza akımı' : 'Giren > dönen', merkez);
    },
    metin: ({ kip }) => ({
      normal: 'Kapalı devrede fazdan giren akımın tamamı nötrden döner. [[K6 s. 336]]',
      sigorta: 'Faz topraklı gövdeye değdiğinde koruyucu telden geçen büyük arıza akımı sigortayı eritebilir. [[K6 s. 335]]',
      rcd: 'Toprak teli kopukken hasta üzerinden kaçak oluşursa faz ve nötr akımları farklılaşır ve RCD beslemeyi keser. [[K6 s. 335–336]]',
    })[kip],
  });

  VIZ.fk20_sinif = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Giriş noktası değişince akım yolu',
    secenek: secim('Giriş noktası', [['parmak', 'Sol başparmak'], ['kateter', 'Santral kateter']]),
    ciz(S, t, { kip }) {
      const x = S.w / 2, ic = kip === 'kateter';
      return S.ok([[x, 62], [x, 158]], { renk: ic ? 'crit' : 'clin' })
        + etiket(S, x - 83, 20, 166, ic ? 'Santral kateter' : 'Sol başparmak', 'basic')
        + (ic ? etiket(S, x - 76, 90, 152, 'Olası kalp yolu', 'crit') : '')
        + etiket(S, x - 83, 158, 166, 'Sol işaret parmağı', 'clin');
    },
    metin: ({ kip }) => kip === 'parmak' ? 'Başparmaktan işaret parmağına uzanan yol ile santral kateterden aynı parmağa uzanan yolun riski farklıdır. [[K6 s. 337]]'
      : 'Kateter deri engelini aşar ve akım kalpten geçebilir. [[K6 s. 337]] Kalple doğrudan temasta 50 μA kadar küçük bir akım fibrilasyona yol açabilir. [[K6 s. 337]]',
  });

  VIZ.fk20_statik = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Yüzey yükü ve nem',
    secenek: secim('Ortam', [['kuru', 'Kuru hava'], ['nemli', 'Nemli hava']]),
    ciz(S, t, { kip }) {
      const x = S.w / 2, kuru = kip === 'kuru';
      const sol = x - 72, sag = x + 72;
      const aktarim = S.ok([[sol + 22, 52], [sag - 22, 52]], { renk: 'basic' });
      const dagilma = kuru ? '' : S.ok([[sag, 118], [sag, 153]], { renk: 'clin' });
      return S.t(x, 34, 'Elektron aktarımı', merkez) + aktarim
        + etiket(S, sol - 55, 76, 110, kuru ? '+  +  +' : '+', 'warn')
        + etiket(S, sag - 55, 76, 110, kuru ? '−  −  −' : '−', 'basic')
        + dagilma + S.t(x, 187, kuru ? 'Yüzeylerde yük birikir' : 'Yük yavaşça dağılır', merkez);

    },
    metin: ({ kip }) => kip === 'kuru' ? 'Kuru koşullarda yük daha kolay birikir ve boşalma kıvılcımı yanıcı gazları tutuşturabilir. [[K6 s. 339]]'
      : 'Nemli havanın su içeriği yükün aşamalı olarak dağılmasına yardım eder. [[K6 s. 339]]',
  });

  VIZ.fk20_yogunluk = el => SEKIL.grafik(el, {
    ...boyut, baslik: 'Sabit akımda alan ve yoğunluk',
    x: { min: 1, max: 100, ad: 'Alan / başlangıç alanı', adimlar: [1, 20, 100] },
    y: { min: 0, max: 100, ad: 'J (mA/mm²)', adimlar: [5, 100] },
    param: [{ id: 'oran', ad: 'Temas alanı / başlangıç alanı', min: 1, max: 100, adim: 1, deger: 20 }],
    egriler: [{ f: oran => 100 / oran, renk: 'clin' }],
    noktalar: ({ oran }) => [{ x: oran, y: 100 / oran }],
    okuma: ({ oran }) => `Alan başlangıcın ${oran} katı olduğunda aynı akım için yoğunluk 100 / ${oran} = ${sayi(100 / oran)} mA·mm⁻² olur. [[K6 s. 339–340]]`,
  });
  VIZ.fk20_diyatermi = (el) => SEKIL.cizim(el, {
    baslik: 'Unipolar ve bipolar diyatermi düzenekleri',
    giris: 'Soldaki unipolar ve sağdaki bipolar bileşenlere tıklayarak farkları inceleyin. [[K6 s. 340–342]]',
    gorunumler: [{
      ad: 'İki sistem', resim: 'img/fizik/20-diyatermi.webp', en: 1024, boy: 572,
      noktalar: [
        { x: 240, y: 179, ad: 'Unipolar kalem (aktif elektrot)', metin: '0,4–3 MHz (genelde 1 MHz) RF akımı hasta dokusuna küçük alandan iletir; hasta devrenin parçasıdır. [[K6 s. 340]]' },
        { x: 52, y: 283, ad: 'Aktif elektrodun bıçak ucu', metin: 'Küçük uçla temas eden hücreler 1000 °C’nin üzerine çıkabilir, doku suyu kaynar ve damarlar koterize olur. [[K6 s. 340]]' },
        { x: 265, y: 360, ad: 'Hasta dönüş plağı (dispersif)', metin: 'Geniş alan ve iyi kanlanan dokuya tam temas ederek dönüşte akım yoğunluğunu düşürür; kemik çıkıntıdan kaçınılır ve hasta metal masaya değmemelidir. [[K6 s. 341]]' },
        { x: 424, y: 249, ad: 'Dönüş kablosu', metin: 'Akımı hastadan jeneratöre geri taşır; gevşek veya küçük temas alanında ciddi yanıklar oluşabilir. [[K6 s. 340–341]]' },
        { x: 879, y: 196, ad: 'Yalıtımlı bipolar sap', metin: 'Forsepsin iki kolunu elektriksel olarak ayırır; ayrı bir dönüş plağına gerek kalmaz. [[K6 s. 342]]' },
        { x: 733, y: 262, ad: 'Forsepsin iki kolu', metin: 'Akım yolu yalnızca forseps uçları arasındaki kısa mesafeyle sınırlıdır; kalp pili girişimi unipolardan düşüktür. [[K6 s. 342]]' },
        { x: 570, y: 367, ad: 'Bipolar forseps uçları', metin: 'Mikrokoagülasyon ve periferik bölgelerde noktasal koagülasyon sağlar; daha yerel kaldığından unipolardan daha az güçlü algılanabilir. [[K6 s. 342]]' },
      ],
    }],
  });


  VIZ.fk20_dalga = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Elektrocerrahide akımın zaman içindeki biçimi',
    secenek: secim('Kip', [['kesme', 'Kesme'], ['kurut', 'Desikasyon'], ['fulgur', 'Fulgurasyon'], ['karma', 'Karma']]),
    ciz(S, t, { kip }) {
      const x = 24, w = S.w - 48, y = 99;
      const sinyal = [];
      for (let i = 0; i <= 384; i++) {
        const u = i / 384, surekli = kip === 'kesme' || (kip === 'karma' && u < 0.5);
        const etkin = surekli || (u * 4) % 1 < 0.5;
        const genlik = kip === 'kurut' ? 24 : 43;
        sinyal.push([x + u * w, y - (etkin ? genlik * Math.sin(32 * Math.PI * u) : 0)]);
      }
      return S.cizgi([[x, y], [x + w, y]], { renk: 'line' })
        + S.cizgi(sinyal, { renk: 'clin' }) + S.t(x, 30, 'Akım', { c: 'k' })
        + S.ok([[x, 159], [x + w, 159]], { renk: 'muted' }) + S.t(S.w / 2, 187, 'Zaman', merkez);
    },
    metin: ({ kip }) => ({
      kesme: 'Sürekli sinüs dalgası yüksek akım yoğunluğunu hızla iletir ve hücre içeriği kaynar. [[K6 s. 343]]',
      kurut: 'Düşük güçte kısa sinüs dizileri dokuyu kıvılcım oluşturmadan yavaşça kurutur. [[K6 s. 342–343]]',
      fulgur: 'Daha yüksek güçte kısa sinüs dizileri hücreleri aralıklı ısıtır ve doku hızla kurur. [[K6 s. 342–343]]',
      karma: 'Şema, kesme ile COAG bileşenlerini yan yana gösterir ve belirli bir cihazın dalga kaydını temsil etmez. [[K6 s. 342–343]]',
    })[kip],
  });
})();
