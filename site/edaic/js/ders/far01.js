(function () {
  'use strict';
  const VIZ = window.VIZ;
  const boyut = h => ({ vb: [640, h], vbDar: [360, h] });
  const secim = (ad, liste) => ({ id: 'secili', ad, liste: liste.map(ad => ({ d: ad, ad })) });
  const etiket = (S, x, y, ad) => S.t(x, y, ad, { a: 'middle', c: 'b' });
  const ok = (S, x, y, x2, y2, renk = 'accent', w = 3) =>
    S.ok([[x, y], [x2, y2]], { renk, w });

  VIZ.a01_zar = el => SEKIL.sahne(el, {
    ...boyut(185), baslik: 'Fosfolipit çift tabakanın kesiti',
    metin: () => 'Her yaprakçıkta başlar sulu yüzeye, lipofilik zincirler karşı yaprakçığın zincirlerine bakar. [[K3 s. 1]]',
    ciz: S => {
      const x0 = S.w / 2 - 145;
      let s = '';
      for (let i = 0; i < 7; i++) {
        const x = x0 + i * 18;
        for (const [y, yon] of [[44, 1], [139, -1]]) {
          for (const dx of [-3, 3]) {
            s += S.cizgi([[x + dx, y], [x + dx, y + yon * 26], [x + dx + 4, y + yon * 39]], { renk: 'basic' });
          }
          s += S.daire(x, y, 7, { renk: 'accent', dolgu: 'accent-soft' });
        }
      }
      return s + S.t(x0 + 138, 49, 'Hidrofilik başlar')
        + S.t(x0 + 138, 97, 'Lipofilik zincirler') + S.t(x0 + 138, 144, 'Hidrofilik başlar')
        + etiket(S, S.w / 2, 177, 'Çift tabaka ≈ 10 nm');
    },
  });

  VIZ.a01_ach = el => SEKIL.adim(el, {
    ...boyut(210), baslik: 'Asetilkolin reseptörünün merkezî kanalına üstten bakış', oto: false,
    adimlar: [
      { ad: 'Kapalı kanal', metin: 'Zarı geçen kanalın çevresindeki beş alt birimden ikisi özdeş α alt birimidir. [[K3 s. 2]]' },
      { ad: 'ACh bağlanır', metin: 'İki ACh molekülünün α alt birimlerine bağlanması reseptörün biçimini değiştirir ve kanalı açar. [[K3 s. 2–3]]' },
      { ad: 'Katyon geçişi', metin: 'Açık kanalda iyon geçiş hızı yaklaşık 10⁷ s⁻¹’dir. [[K3 s. 2]] Akış eşiğe ulaşırsa impuls iletimini sağlayan depolarizasyon gelişir. [[K3 s. 2]]' },
    ],
    ortak: (S, adim) => {
      const cx = S.w / 2, cy = 87;
      let s = '';
      for (let i = 0; i < 5; i++) {
        const aci = (i * 72 - 90) * Math.PI / 180;
        const r = adim ? 43 : 32;
        const x = cx + Math.cos(aci) * r, y = cy + Math.sin(aci) * r;
        const alfa = i === 1 || i === 4;
        s += S.daire(x, y, 23, { renk: alfa ? 'accent' : 'muted', dolgu: alfa ? 'accent-soft' : 'chip' });
        if (alfa) {
          s += etiket(S, x, y + 5, 'α');
          if (adim) {
            const yon = i === 1 ? 1 : -1;
            s += S.kutu(x + yon * 47 - 24, y - 13, 48, 26, { yazi: 'ACh', dolgu: 'basic-soft', renk: 'basic' });
          }
        }
      }
      if (adim === 0) s += S.cizgi([[cx - 10, cy], [cx + 10, cy]], { renk: 'muted', w: 5 });
      if (adim === 2) s += S.daire(cx, cy, 12, { renk: 'clin', dolgu: 'clin-soft' }) + etiket(S, cx, cy + 5, '+');
      return s + etiket(S, cx, 186, ['Merkezî kanal kapalı', 'Merkezî kanal açık', 'Küçük katyon kanaldan geçer'][adim]);
    },
  });

  VIZ.a01_pompa = el => SEKIL.adim(el, {
    ...boyut(210), baslik: 'Na⁺ gradyanı ve onunla eşleşen amino asit geçişi', oto: false,
    adimlar: [
      { ad: 'Pompa', metin: 'Na⁺/K⁺ ATPaz, ATP hidrolizinden aldığı enerjiyle iyonları karşıt yönlerde taşır. [[K3 s. 4]]' },
      { ad: 'Simport', metin: 'Pompanın kurduğu gradyan sayesinde Na⁺ taşıyıcıya bağlanıp hücreye girerken amino asidi de aynı yöne taşır. [[K3 s. 4]]' },
    ],
    ortak: (S, i) => {
      const x = S.w / 2;
      const sol = x - 60, sag = x + 60;
      return S.kutu(12, 78, S.w - 24, 42, { dolgu: 'chip' })
        + S.kutu(sol - 25, 75, sag - sol + 50, 48, { dolgu: 'basic-soft', renk: 'basic' })
        + etiket(S, x, 104, i ? 'Simport' : 'ATPaz')
        + S.t(15, 22, i ? 'Lümen' : 'Hücre dışı') + S.t(15, 173, 'Hücre')
        + etiket(S, sol, 48, 'Na⁺') + etiket(S, sag, 48, i ? 'Amino asit' : 'K⁺')
        + ok(S, sol, i ? 56 : 149, sol, i ? 149 : 56, 'basic')
        + ok(S, sag, 56, sag, 149, 'clin')
        + etiket(S, x, 199, i ? 'Na⁺ gradyanı → simport' : 'ATP hidrolizi → antiport');
    },
  });

  VIZ.a01_gradyan = el => SEKIL.sahne(el, {
    ...boyut(180), baslik: 'Plazma ve etki yeri arasındaki serbest ilaç farkı',
    secenek: secim('Konsantrasyon farkı', ['Küçük', 'Büyük']),
    metin: ({ secili }) => secili === 'Büyük'
      ? 'Etki yerindeki konsantrasyon aynıyken plazmadaki serbest ilaç artarsa gradyan büyür ve geçiş hızlanır. [[K3 s. 5]]'
      : 'Plazma ile etki yeri arasındaki fark küçükken geçiş daha yavaştır. [[K3 s. 5]]',
    ciz: (S, t, { secili }) => {
      const cx = S.w / 2, buyuk = secili === 'Büyük';
      let s = etiket(S, cx - 90, 28, 'Plazma') + etiket(S, cx + 90, 28, 'Etki yeri')
        + S.kutu(cx - 7, 44, 14, 87, { dolgu: 'chip' });
      for (let i = 0; i < (buyuk ? 12 : 5); i++) {
        s += S.daire(cx - 130 + i % 4 * 19, 60 + Math.floor(i / 4) * 19, 5, { dolgu: 'basic', renk: 'basic' });
      }
      for (let i = 0; i < 3; i++) s += S.daire(cx + 72 + i * 19, 78, 5, { dolgu: 'basic', renk: 'basic' });
      return s + ok(S, cx - 40, 90, cx + 44, 90, 'accent', buyuk ? 6 : 2)
        + etiket(S, cx, 159, buyuk ? 'Daha hızlı geçiş' : 'Daha yavaş geçiş');
    },
  });

  const phSecenekleri = ['pH < pKa', 'pH = pKa', 'pH > pKa'];
  VIZ.a01_iyon = el => SEKIL.sahne(el, {
    ...boyut(172), baslik: 'pH değiştiğinde asit ve bazın baskın biçimleri',
    secenek: secim('Ortam', phSecenekleri),
    metin: ({ secili }) => ({
      'pH < pKa': 'Düşük pH’da proton almış biçimler baskındır: asit yüksüz XH, baz yüklü XH⁺ hâlindedir. [[K3 s. 6]]',
      'pH = pKa': 'Her iki ilaç türünde de yüklü ve yüksüz biçimlerin konsantrasyonları eşittir. [[K3 s. 6]]',
      'pH > pKa': 'Yüksek pH’da proton vermiş biçimler baskındır: asit yüklü X⁻, baz yüksüz X hâlindedir. [[K3 s. 6]]',
    })[secili],
    ciz: (S, t, { secili }) => {
      const i = phSecenekleri.indexOf(secili);
      function satir(y, ad, bicimler, yuksuz) {
        return S.t(12, y + 27, ad, { c: 'b' }) + S.kutu(109, y, S.w - 121, 45, {
          yazi: bicimler[i], dolgu: i === 1 ? 'chip' : yuksuz ? 'ok-soft' : 'basic-soft',
        });
      }
      return satir(14, 'Zayıf asit', ['XH · yüksüz', 'XH ve X⁻ eşit', 'X⁻ · yüklü'], i === 0)
        + satir(75, 'Zayıf baz', ['XH⁺ · yüklü', 'X ve XH⁺ eşit', 'X · yüksüz'], i === 2)
        + etiket(S, S.w / 2, 153, 'Lipit tabakadan yüksüz biçim geçer');
    },
  });

  function zincir(S, satirlar) {
    const x = S.w / 2, genislik = Math.min(S.w - 24, 450);
    return satirlar.map((yazi, i) => {
      const y = 8 + i * 69;
      const bag = i ? ok(S, x, y - 18, x, y - 3) : '';
      return bag + S.kutu(x - genislik / 2, y, genislik, 48, {
        yazi, renk: i === 2 ? 'accent' : 'line', dolgu: i === 2 ? 'accent-soft' : 'paper',
      });
    }).join('');
  }

  VIZ.a01_opioid = el => SEKIL.sahne(el, {
    ...boyut(210), baslik: 'İki opioidin aynı fizyolojik pH’da karşılaştırılması',
    secenek: secim('Zayıf baz', ['Alfentanil', 'Fentanil']),
    metin: ({ secili }) => secili === 'Alfentanil'
      ? 'Alfentanilin daha büyük yüksüz fraksiyonu ve daha büyük başlangıç gradyanı hızlı etki başlangıcına katkı verir. [[K3 s. 7]]'
      : 'Fentanilin lipitte çözünürlüğü daha yüksektir, fakat fizyolojik pH’da zarı geçebilen fraksiyonu daha küçüktür. [[K3 s. 7]]',
    ciz: (S, t, { secili }) => zincir(S, secili === 'Alfentanil'
      ? ['Alfentanil · pKa 6,5', 'Yüksüz fraksiyon daha büyük', 'Etki daha hızlı başlar']
      : ['Fentanil · pKa 8,4', 'Yüksüz fraksiyon daha küçük', 'Etki daha yavaş başlar']),
  });

  VIZ.a01_serbest = el => SEKIL.sahne(el, {
    ...boyut(210), baslik: 'Bağlanma azalınca metabolizmanın serbest ilaca etkisi',
    secenek: secim('Metabolik yol', ['Genel durum', 'Doygunluğa yakın']),
    metin: ({ secili }) => secili === 'Genel durum'
      ? 'Metabolizma genellikle hızlanır ve yeni dengede serbest ilaç konsantrasyonu çok az değişir. [[K3 s. 7]]'
      : 'Fenitoin gibi az sayıda, yüksek oranda bağlanan ilaçta metabolik yol doygunluğa yakındır ve serbest konsantrasyon toksik düzeye çıkabilir. [[K3 s. 7]]',
    ciz: (S, t, { secili }) => zincir(S, secili === 'Genel durum'
      ? ['Bağlanma azalır, serbest ilaç artar', 'Metabolizma hızlanır', 'Yeni dengede küçük değişim']
      : ['Bağlanma azalır, serbest ilaç artar', 'Metabolik kapasite sınırlı', 'Serbest ilaç toksik düzeye çıkabilir']),
  });
})();
