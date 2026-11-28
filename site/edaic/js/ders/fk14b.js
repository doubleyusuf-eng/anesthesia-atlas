(function () {
  'use strict';
  const VIZ = window.VIZ;
  const ortada = { a: 'middle', c: 'b' };
  const boyut = { vb: [600, 220], vbDar: [360, 220] };
  const secim = (ad, adlar) => ({ id: 'tur', ad, liste: adlar.map(ad => ({ d: ad, ad })) });
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });

  VIZ.fk14b_uretec = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Kaçak ve kompliyans değişiminde üreteç yanıtı',
    secenek: secim('Devredeki değişiklik', ['Kaçak', 'Kompliyans değişimi']),
    ciz: (S, t, p) => {
      const orta = S.w / 2;
      let sekil = S.t(orta, 30, p.tur, ortada);
      ['Basınç üreteci', 'Akım üreteci'].forEach((ad, i) => {
        const x = (i + 0.5) * orta;
        const telafi = (p.tur === 'Kaçak') === (i === 0);
        sekil += S.ok([[orta, 43], [x, 74]], { renk: 'muted' })
          + S.kutu(x - orta / 2 + 4, 80, orta - 8, 46, { yazi: ad })
          + S.ok([[x, 130], [x, 153]], { renk: 'muted' })
          + S.kutu(x - orta / 2 + 4, 158, orta - 8, 44, { yazi: telafi ? 'Telafi edebilir' : 'Telafi edemez', dolgu: telafi ? 'ok-soft' : 'warn-soft' });
      });
      return sekil;
    },
    metin: p => p.tur === 'Kaçak' ? 'Devrede kaçak varsa sabit basınç üreteci bunu karşılayabilir, sabit akım üreteci karşılayamaz. [[K6 s. 253]]' : 'Kompliyans değişimini akım üreteci telafi edebilir, basınç üreteci edemez. [[K6 s. 253]]',
  });

  VIZ.fk14b_koruk = el => SEKIL.cizim(el, {
    baslik: 'Şişe içindeki körük ve iki gaz yolu', giris: 'Körüğün içindeki taze gaz ile dışındaki sürücü gazın bağlantılarını bulun. [[K6 s. 254]]',
    gorunumler: [{ ad: 'Yandan', resim: 'img/fizik/14b-koruk.webp', en: 1024, boy: 1024, noktalar: [
      nokta(505, 504, 'Körük', 'Körüğün içinde taze gaz çıkışından gelen anestezi gazı bulunur. [[K6 s. 254]]'),
      nokta(498, 200, 'Dış hazne', 'Şişedeki basınç hızla yükseldiğinde körük sıkışır. [[K6 s. 254]]'),
      nokta(875, 249, 'Sürücü gaz bağlantısı', 'Bağımsız yüksek basınç kaynağı körüğün dışındaki hazneyi besler. [[K6 s. 254]]'),
      nokta(313, 976, 'Solunum devresi bağlantısı', 'Körük sıkışınca gaz hastaya gider, hazne basıncı bırakılınca akciğerin elastik geri çekilmesi ve taze gaz körüğü yeniden doldurur. [[K6 s. 254]]'),
    ] }],
  });

  VIZ.fk14b_faz = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Dış hazne basıncı, körük hacmi ve devre akımı',
    secenek: secim('Solunum fazı', ['İnspirasyon', 'Ekspirasyon']),
    ciz: (S, t, p) => {
      const basili = p.tur === 'İnspirasyon', x = S.w / 2;
      const ust = basili ? 107 : 65, alt = 141, sol = x - 48, sag = x + 48;
      const kivrim = [];
      for (let i = 0; i <= 10; i++) {
        const y = ust + (alt - ust) * i / 10;
        const dis = i % 2 ? 8 : 0;
        kivrim.push([sol - dis, y]);
      }
      const ters = kivrim.map(([kenar, y]) => [2 * x - kenar, y]).reverse();
      const hasta = [x + 123, 187], cikis = [x, 187];
      return S.t(x, 25, basili ? 'Dış hazne basıncı yükselir' : 'Dış hazne atmosfere açılır', ortada)
        + S.kutu(x - 75, 41, 150, 105, { renk: 'basic', dolgu: 'basic-soft' })
        + S.cizgi([...kivrim, ...ters, kivrim[0]], { renk: 'clin', dolgu: 'clin-soft' })
        + S.cizgi([[x, alt], cikis], { renk: 'clin' })
        + S.ok(basili ? [cikis, hasta] : [hasta, cikis], { renk: 'clin', w: 3 })
        + S.t(x + 97, 211, basili ? 'Hastaya' : 'Hastadan', ortada);
    },
    metin: p => p.tur === 'İnspirasyon' ? 'Sürücü gazın basıncı körüğü dıştan sıkıştırır ve içindeki anestezi gazı akciğere gider. [[K6 s. 254]]' : 'Akciğerin elastik geri çekilmesiyle dönen gaza taze gaz da eklenir ve körük yeniden dolar. [[K6 s. 254]]',
  });

  VIZ.fk14b_akim = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'İnspiratuvar akımın zamanla değişimi',
    secenek: secim('Akım biçimi', ['Sabit', 'Yavaşlayan', 'Sinüzoidal']),
    param: [{ id: 'konum', ad: 'İnspirasyon boyunca imleç', min: 0, max: 100, adim: 1, deger: 50, birim: '%' }],
    ciz: (S, t, p) => {
      const sol = 38, sag = S.w - 26, taban = 168;
      const konum = u => {
        let akim = 1;
        if (p.tur === 'Yavaşlayan') akim = 1 - u;
        if (p.tur === 'Sinüzoidal') akim = Math.sin(Math.PI * u);
        return [sol + (sag - sol) * u, taban - 108 * akim];
      };
      const yol = Array.from({ length: 81 }, (_, i) => konum(i / 80));
      yol.unshift([sol, taban]);
      yol.push([sag, taban]);
      const [x, y] = konum(p.konum / 100);
      return S.t(sol, 22, 'İnspiratuvar akım', { c: 'b' })
        + S.ok([[sol, taban], [sol, 36]], { renk: 'muted' })
        + S.ok([[sol, taban], [sag + 13, taban]], { renk: 'muted' })
        + S.cizgi(yol, { renk: 'accent', w: 4 })
        + S.cizgi([[x, taban], [x, y]], { renk: 'basic', kesik: true })
        + S.daire(x, y, 5, { dolgu: 'basic', renk: 'paper' })
        + S.t(sol, 198, 'Başlangıç') + S.t(sag, 198, 'İnspirasyon sonu', { a: 'end' });
    },
    metin: p => ({
      Sabit: 'Kare dalgada hedef tidal hacme veya basınca ulaşılıncaya kadar akım aynı kalır. [[K6 s. 254]]',
      Yavaşlayan: 'İnspirasyon ilerledikçe akım azalır. [[K6 s. 254]]',
      Sinüzoidal: 'Akımın yükselip alçalması spontan solunumdaki örüntüye benzer. [[K6 s. 254]]',
    })[p.tur],
  });

  VIZ.fk14b_soluk = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'PEEP üzerinde zorunlu ve tetiklenen soluklar',
    secenek: secim('Solunum modu', ['SIMV', 'Basınç desteği']),
    ciz: (S, t, p) => {
      const sol = 21, sag = S.w - 18, gen = sag - sol;
      let svg = S.t(sol, 24, 'Hava yolu basıncı', { c: 'b' })
        + S.cizgi([[sol, 148], [sag, 148]], { renk: 'muted', kesik: true })
        + S.t(sol, 177, 'PEEP · 5 cmH₂O') + S.t(sag, 202, 'Zaman →', { a: 'end' });
      const yol = [[sol, 148]];
      for (const [u, ad] of [[0.12, 'Zorunlu'], [0.57, 'Tetiklenen']]) {
        if (ad === 'Zorunlu' && p.tur !== 'SIMV') continue;
        const x = sol + u * gen, w = gen * 0.23;
        yol.push([x, 148], [x + w * 0.16, 82], [x + w * 0.8, 82], [x + w, 148]);
        svg += S.t(x + w / 2, 62, ad, ortada);
      }
      yol.push([sag, 148]);
      return svg + S.cizgi(yol, { renk: 'clin', w: 4 });
    },
    metin: p => p.tur === 'SIMV' ? 'SIMV’de ayarlanan zorunlu soluklara hastanın tetiklediği destekli soluklar eklenebilir. [[K6 s. 256]]' : 'Saf basınç desteğinde tetiklenen soluğun desteği sürer, zorunlu soluk kalkar. [[K6 s. 256]]',
  });

  VIZ.fk14b_hedef = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'ARDSNet çalışmasında karşılaştırılan tidal hacimler',
    param: [{ id: 'hacim', ad: 'Çalışma kolunun tidal hacmi', min: 6, max: 12, adim: 6, deger: 6, birim: 'mL/kg' }],
    ciz: (S, t, p) => {
      const g = S.w - 52;
      return S.t(26, 39, 'Tidal hacim / vücut ağırlığı', { c: 'b' })
        + S.kutu(26, 64, g, 45, { dolgu: 'chip' })
        + S.kutu(26, 64, g * p.hacim / 12, 45, { dolgu: 'clin-soft', renk: 'clin', yazi: p.hacim + ' mL/kg' })
        + S.t(26, 152, p.hacim === 6 ? 'Daha düşük mortalite' : 'Karşılaştırma kolu', { c: 'b' });
    },
    metin: () => 'Çalışmada 6 mL/kg ile mortalite 12 mL/kg koluna göre daha düşüktü. [[K6 s. 257]]',
  });

  VIZ.fk14b_osilasyon = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Önce açılan alveoller, ardından sürdürülen ortalama basınç',
    secenek: secim('HFOV evresi', ['Alveolleri aç', 'Osilasyonları ekle']),
    ciz: (S, t, p) => {
      const sol = 24, sag = S.w - 22, acilma = sol + (sag - sol) * 0.22;
      const orta = 80, salinim = p.tur === 'Osilasyonları ekle';
      const yol = [[sol, 154], [acilma, orta]];
      for (let i = 0; i <= 160; i++) {
        const u = i / 160;
        yol.push([acilma + (sag - acilma) * u, orta - (salinim ? 7 * Math.sin(u * Math.PI * 24) : 0)]);
      }
      return S.t(sol, 25, 'Hava yolu basıncı', { c: 'b' })
        + S.cizgi([[acilma, orta], [sag, orta]], { renk: 'muted', kesik: true })
        + S.cizgi(yol, { renk: 'clin', w: 3 })
        + S.t(sag, 121, 'Yüksek ortalama basınç', { a: 'end' })
        + S.ok([[sol, 169], [sag, 169]], { renk: 'muted' })
        + S.t(sag, 197, 'Zaman', { a: 'end' });
    },
    metin: p => p.tur === 'Alveolleri aç'
      ? 'Alveoller başlangıçta görece yüksek basınçla açılır. [[K6 s. 257]]'
      : 'Sürdürülen ortalama hava yolu basıncına hızlı, küçük hacimli soluklar eklenir. [[K6 s. 257]]',
  });

  VIZ.fk14b_niv = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Maskede sürekli basınç ve iki düzeyli basınç',
    secenek: secim('Maske desteği', ['CPAP', 'BPAP']),
    ciz: (S, t, p) => {
      const sol = 28, sag = S.w - 28, orta = S.w / 2;
      const ust = p.tur === 'BPAP' ? 70 : 135;
      return S.t(sol, 25, 'Maske basıncı', { c: 'b' })
        + S.cizgi([[sol, 135], [sol + 18, ust], [orta - 16, ust], [orta, 135], [sag, 135]], { renk: 'clin', w: 4 })
        + S.t((sol + orta) / 2, ust - 15, p.tur === 'BPAP' ? 'IPAP' : 'CPAP', ortada)
        + S.t((orta + sag) / 2, 120, p.tur === 'BPAP' ? 'EPAP' : 'CPAP', ortada)
        + S.t((sol + orta) / 2, 175, 'İnspirasyon', ortada)
        + S.t((orta + sag) / 2, 175, 'Ekspirasyon', ortada);
    },
    metin: p => p.tur === 'CPAP' ? 'CPAP, spontan solunum boyunca pozitif basıncı sürdürür. [[K6 s. 255]]' : 'BPAP cihazında inspiratuvar basınç düzeyi IPAP, ekspiratuvar düzey EPAP olarak gösterilir. [[K6 s. 258]]',
  });

  VIZ.fk14b_zirh = el => SEKIL.cizim(el, {
    baslik: 'Ön göğüs duvarına oturan zırh', giris: 'Zırhın sınırını ve serbest kalan hava yolunu bulun. [[K6 s. 259]]',
    gorunumler: [{ ad: 'Ön-yan görünüm', resim: 'img/fizik/14b-gogus-zirhi.webp', en: 1024, boy: 683, noktalar: [
      nokta(483, 317, 'Göğüs zırhı', 'Zırh ön göğüs duvarı üzerinde negatif basınç uygulanmasına olanak verir. [[K6 s. 259]]'),
      nokta(543, 464, 'Temas kenarı', 'Zırhın çevresi ön göğüs duvarıyla hava geçirmez bir sınır oluşturur. [[K6 s. 259]]'),
      nokta(212, 237, 'Açıkta kalan hava yolu', 'Ventilasyon için yapay hava yolu gerekmez, ancak hava yolunu koruma gereksinimi ayrıca değerlendirilir. [[K6 s. 259]]'),
    ] }],
  });
})();
