(function () {
  'use strict';
  const VIZ = window.VIZ;
  const boyut = { vb: [640, 230], vbDar: [360, 230] };
  const orta = { a: 'middle', c: 'b' };
  const secenek = (ad, adlar) => ({ id: 'secim', ad, liste: adlar.map(ad => ({ d: ad, ad })) });
  const kutu = (S, x, y, w, h, yazi, renk) =>
    S.kutu(x, y, w, h, { yazi, renk, dolgu: renk + '-soft' });

  const bolgeler = [
    ['Talamus', 'Olası birincil hedef', 'İşitsel ve duyusal uyarılmış potansiyeller talamusu öne çıkarır. [[K3 s. 105]]'],
    ['Limbik sistem', 'Bellek', 'Limbik sistem bellekle ilişkili ikincil hedeflerdendir. [[K3 s. 105]]'],
    ['Korteks', 'Belirli alanlar', 'Korteksin belirli alanları ikincil hedefler arasındadır. [[K3 s. 105]]'],
    ['Omurilik', 'Hareketsizlik', 'Omurilikteki etkinlik farkındalıktan çok hareketsizlikle ilişkilidir; volatil ajanlar için daha önemli bir etki yeri olabilir. [[K3 s. 105]] [[K3 s. 107]]'],
  ];
  VIZ.a09a_yer = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Beyin ve omurilikteki etki yerleri', secenek: secenek('Bölge', bolgeler.map(b => b[0])),
    metin: p => bolgeler.find(b => b[0] === p.secim)[2],
    ciz: (S, t, p) => {
      const x = S.w / 2 - 70;
      let svg = S.kutu(x - 80, 9, 162, 136, { renk: 'basic', kesik: true });
      svg += S.t(x, 34, 'Beyin', orta);
      bolgeler.forEach(([ad, sonuc], i) => {
        const y = i === 3 ? 166 : 41 + 33 * i;
        const etkin = ad === p.secim;
        svg += S.kutu(x - 73, y, 146, 29, { yazi: ad, dolgu: etkin ? 'accent-soft' : 'paper', renk: etkin ? 'accent' : 'line' });
        if (etkin) {
          svg += S.ok([[x + 85, y + 14], [x + 107, y + 14]], { renk: 'accent' });
          const etiket = i === 0 ? ['Olası birincil', 'hedef'] : i === 2 ? ['Belirli', 'alanlar'] : sonuc;
          svg += S.t(x + 165, y + (Array.isArray(etiket) ? 10 : 20), etiket, orta);
        }
      });
      return svg;
    },
  });

  VIZ.a09a_lipit = el => SEKIL.adim(el, {
    ...boyut, baslik: 'Lipit kuramını sınayan gözlemler', oto: false,
    adimlar: [
      { ad: 'Korelasyon', metin: 'Yağ:gaz katsayısı yüksek ajanların MAC değeri daha düşüktür. [[K3 s. 106]]',
        ciz: S => {
          const x = S.w / 2 - 108;
          return S.ok([[x, 156], [x, 36]]) + S.ok([[x, 156], [x + 216, 156]])
            + S.t(x, 25, 'log MAC', orta) + S.t(x + 108, 190, 'log yağ:gaz partisyon katsayısı', orta)
            + S.cizgi([[x + 19, 54], [x + 192, 139]], { renk: 'accent', w: 4 });
        } },
      { ad: 'Sıcaklık', metin: 'Sıcaklık 1 °C arttığında membran volatil ajanlarla benzer ölçüde kalınlaşır, ancak anestezi güçlenmek yerine zayıflar. [[K3 s. 106]]',
        ciz: S => {
          const x = S.w / 2;
          return kutu(S, x - 96, 10, 192, 42, 'Sıcaklık ↑ 1 °C', 'warn')
            + S.ok([[x, 53], [x, 77]]) + kutu(S, x - 123, 80, 246, 42, 'Membran kalınlığı ↑', 'basic')
            + S.t(x, 164, 'Gözlenen anestezik etki', orta)
            + S.t(x, 195, 'Zayıflar ↓', { ...orta, renk: 'warn' });
        } },
      { ad: 'İzomerler', metin: 'Etomidatın izomerleri lipitte eşit çözünürken anestezik özellik yalnız R formunda görülür. [[K3 s. 105]]',
        ciz: S => {
          const x = S.w / 2;
          return S.t(x, 32, 'Lipitte eşit çözünürlük', orta)
            + S.ok([[x - 6, 46], [x - 81, 75]]) + S.ok([[x + 6, 46], [x + 81, 75]])
            + kutu(S, x - 157, 84, 150, 50, 'R(+)-etomidat', 'basic')
            + kutu(S, x + 7, 84, 150, 50, 'S(−)-etomidat', 'clin')
            + S.t(x - 82, 170, 'Anestezik', orta) + S.t(x + 82, 170, ['Klinik olarak', 'etkisiz'], orta);
        } },
    ],
  });

  const kanalAdimlari = [
    ['GABA', 'α ile ilişkili iki agonist bölgesi', 'GABA iki agonist bölgesine bağlanır. [[K3 s. 108]]'],
    ['Modülatörler', 'α/γ ve β bölgeleri', 'Benzodiazepinler α/γ arayüzünden, genel anestezikler β ile ilişkili bölgeden modülasyon yapar. [[K3 s. 106–108]]'],
    ['Kanal yanıtı', 'Açık kalma süresi ↑', 'Etomidat, propofol, barbitüratlar ve halojenli volatil ajanlar kanalın açık kalma süresini uzatır. [[K3 s. 107]]'],
    ['İyon akımı', 'Cl⁻ girişi ↑ → hiperpolarizasyon', 'Hücreye daha fazla klorür girer ve membran hiperpolarize olur. [[K3 s. 107]]'],
  ];
  VIZ.a09a_gaba = el => SEKIL.adim(el, {
    ...boyut, baslik: 'GABAₐ kanalında bağlanma ve yanıt', oto: false,
    adimlar: kanalAdimlari.map(([ad, etiket, metin], i) => ({
      ad, metin, ciz: S => {
        const x = S.w / 2;
        let svg = S.daire(x, 91, 33, { renk: 'clin', dolgu: 'clin-soft' });
        ['γ', 'α', 'β', 'α', 'β'].forEach((birim, j) => {
          const aci = j * 2 * Math.PI / 5 - Math.PI / 2;
          const xx = x + 58 * Math.cos(aci), yy = 91 + 58 * Math.sin(aci);
          const etkin = (i === 0 && birim === 'α') || (i === 1 && birim === 'β');
          svg += S.daire(xx, yy, 25, { dolgu: etkin ? 'accent-soft' : 'paper', renk: etkin ? 'accent' : 'line' })
            + S.t(xx, yy + 6, birim, orta);
        });
        if (i === 1) svg += S.daire(x + 31, 51, 7, { dolgu: 'warn', renk: 'warn' });
        svg += S.t(x, 96, 'Cl⁻', orta);
        if (i === 3) svg += S.ok([[x - 9, 107], [x - 9, 124]], { renk: 'clin' }) + S.ok([[x + 9, 107], [x + 9, 124]], { renk: 'clin' });
        return svg + S.t(x, 199, etiket, orta);
      },
    })),
  });

  const profiller = {
    'Propofol': ['++++', '+', '0', '−'],
    'Tiyopental': ['+++++', '++', '0', '−'],
    'R-etomidat': ['+++++', '0', '0', '0'],
    'S-etomidat': ['0', '0', '0', '0'],
    'Ketamin': ['0', '0', '−', '0'],
    'İzofluran': ['++++', '+++', '0', '−'],
    'Nitröz oksit': ['0', '0', '−', '0'],
    'Ksenon': ['0', '0', '−', '0'],
  };
  VIZ.a09a_profil = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Seçilen ajanın dört santral reseptördeki etkisi', secenek: secenek('Anestezik ajan', Object.keys(profiller)),
    metin: p => {
      const [gaba, glisin, nmda, nikotinik] = profiller[p.secim];
      return `<b>${p.secim}</b> · GABAₐ ${gaba}, glisin ${glisin}, NMDA ${nmda}, nöronal nikotinik ${nikotinik}. [[K3 s. 107]]`;
    },
    ciz: (S, t, p) => {
      const x = S.w / 2;
      let svg = S.t(x - 80, 32, 'İnhibitör', orta) + S.t(x + 80, 32, 'Eksitatör', orta);
      ['GABAₐ', 'Glisin', 'NMDA', 'Nöronal nACh'].forEach((ad, i) => {
        const sol = i < 2;
        const isaret = profiller[p.secim][i];
        svg += kutu(S, x + (sol ? -155 : 5), i % 2 ? 130 : 51, 150, 64, [ad, isaret], sol ? 'basic' : 'clin');
      });
      return svg;
    },
  });
})();
