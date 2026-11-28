(function () {
  'use strict';
  const VIZ = window.VIZ;
  const alan = { vb: [640, 220], vbDar: [360, 220] };
  const orta = { a: 'middle', c: 'b' };
  const sec = (ad, adlar) => ({
    id: 'secim', ad, liste: adlar.map(ad => ({ ad, d: ad })),
  });
  const goreli = ad => [{
    id: 'oran', ad, min: 0, max: 1, deger: 0.5, adim: 0.01,
  }];
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });

  VIZ.fk11b_terazi = el => SEKIL.cizim(el, {
    baslik: 'Sıfır sapmalı analizörün terazisi',
    giris: 'Oksijen yokken iki küre mıknatısın kutupları üzerinde durur. [[K6 s. 200]]',
    gorunumler: [{ ad: 'Örnek haznesi', resim: 'img/fizik/11b-terazi.webp', en: 1024, boy: 683,
      noktalar: [
        nokta(512, 199, 'Burulma askısı', 'Askı, küreleri birleştiren kolu taşır ve kolun dönmesine olanak verir. [[K6 s. 200]]'),
        nokta(289, 309, 'Azot dolu küre', 'Kolun iki ucundaki küreler zayıf diyamanyetik azot içerir. [[K6 s. 200]]'),
        nokta(400, 313, 'Bağlantı kolu', 'Küreler kutuplardan uzaklaşınca kol döner. [[K6 s. 200]]'),
        nokta(512, 311, 'Ayna', 'Kola bağlı ayna döndüğünde yansıttığı ışık noktası ölçekte yer değiştirir. [[K6 s. 200]]'),
        nokta(736, 400, 'Mıknatıs kutbu', 'Oksijen güçlü mıknatısın alanına çekilir. [[K6 s. 199–200]]'),
      ] }],
  });

  VIZ.fk11b_yakit = el => SEKIL.cizim(el, {
    baslik: 'Galvanik yakıt hücresinin kesiti',
    giris: 'Katottan anoda doğru ilerleyen hidroksit iyonlarının geçtiği elektroliti bulun. [[K6 s. 202–203]]',
    gorunumler: [{ ad: 'Kesit', resim: 'img/fizik/11b-yakit.webp', en: 1024, boy: 512,
      noktalar: [
        nokta(381, 214, 'Altın ağ katot', 'Oksijen katotta tepkimeye girerek hidroksit iyonlarının oluşmasını sağlar. [[K6 s. 202]]'),
        nokta(493, 315, 'Potasyum hidroksit', 'Elektrolit çözeltisi katot ile anodu ayırır ve hidroksit iyonları bu çözeltide anoda ilerler. [[K6 s. 202–203]]'),
        nokta(604, 405, 'Kurşun anot', 'Elektron akışı sırasında anot zamanla küçülür. [[K6 s. 203]]'),
      ] }],
  });

  VIZ.fk11b_darbe = el => SEKIL.sahne(el, {
    ...alan, baslik: 'Manyetik alanın basınç sinyaline etkisi',
    secenek: sec('Manyetik alan', ['Açık', 'Kapalı']),
    param: goreli('Örneğin referansa göre O₂ fazlası (göreli)'),
    metin: p => p.secim === 'Kapalı'
      ? 'Alan kapandığında oksijenin alanda birikmesine bağlı basınç artışı ortadan kalkar. [[K6 s. 201]]'
      : 'Alan açıksa basınç sinyali, örnek ve referanstaki oksijen kısmi basınçlarının farkını yansıtır. [[K6 s. 201]]',
    ciz: (S, t, p) => {
      const m = S.w / 2, etkin = p.secim === 'Açık';
      const sonuc = etkin ? p.oran : 0;
      return S.kutu(6, 6, m - 12, 45, { yazi: 'Devre gazı' })
        + S.kutu(m + 6, 6, m - 12, 45, { yazi: 'Referans gaz' })
        + S.ok([[m / 2, 52], [m / 2, 68], [m - 40, 85]])
        + S.ok([[m * 1.5, 52], [m * 1.5, 68], [m + 40, 85]])
        + S.kutu(24, 89, S.w - 48, 45, { yazi: etkin ? 'Karışım · alan açık' : 'Karışım · alan kapalı', dolgu: etkin ? 'basic-soft' : 'paper' })
        + S.t(m, 162, 'Dönüştürücüde basınç farkı', orta)
        + S.cizgi([[24, 188], [S.w - 24, 188]], { renk: 'line', w: 9 })
        + S.daire(24 + sonuc * (S.w - 48), 188, 7, { dolgu: 'accent', renk: 'accent' });
    },
  });

  VIZ.fk11b_devre = el => SEKIL.sahne(el, {
    ...alan, baslik: 'Elektrokimyasal hücrede yük taşınması',
    secenek: sec('İzlenecek yol', ['Dış devrede akım', 'Elektrolitte katyon']),
    ciz: (S, t, p) => {
      const sol = 55, sag = S.w - 55, m = S.w / 2;
      const dis = p.secim === 'Dış devrede akım';
      return S.kutu(12, 96, S.w - 24, 101, { dolgu: 'basic-soft' })
        + S.cizgi([[sol, 151], [sol, 52], [sag, 52], [sag, 151]], { renk: 'muted', w: 3 })
        + S.t(m, 22, 'Ampul', orta) + S.daire(m, 52, 16)
        + S.cizgi([[m - 9, 43], [m + 9, 61]]) + S.cizgi([[m - 9, 61], [m + 9, 43]])
        + (dis ? S.ok([[sag - 8, 52], [m + 23, 52]], { renk: 'accent', w: 4 })
          : S.ok([[sol + 14, 136], [sag - 14, 136]], { renk: 'accent', w: 4 }))
        + S.t(sol, 177, 'Anot', orta) + S.t(sag, 177, 'Katot', orta)
        + S.t(m, 117, 'Elektrolit', orta);
    },
    metin: p => p.secim === 'Dış devrede akım'
      ? 'Konvansiyonel akım katottan ampul üzerinden anoda yönelir. [[K6 s. 201]]'
      : 'Anotta elektron kaybeden metal atomlarından oluşan katyonlar elektrolit içinde katoda yönelir. [[K6 s. 201]]',
  });

  function basamaklar(el, baslik, veriler) {
    return SEKIL.adim(el, {
      ...alan, baslik, oto: false,
      adimlar: veriler.map(([ad, , metin]) => ({ ad, metin })),
      ortak: (S, i) => veriler[i][1].map((ad, j) => {
        const y = 5 + j * 73, m = S.w / 2;
        return (j ? S.ok([[m, y - 22], [m, y - 4]], { renk: 'accent' }) : '')
          + S.kutu(8, y, S.w - 16, 49, { yazi: ad, dolgu: j === 2 ? 'basic-soft' : 'paper' });
      }).join(''),
    });
  }
  VIZ.fk11b_ornek = el => basamaklar(el, 'Örneğin güvenilirliği', [
    ['Pıhtı', ['Antikoagülansız örnek', 'Analizör içinde pıhtı', 'Akış yolunda tıkanma'], 'Heparin ya da benzeri antikoagülan kullanımı örneğin analizörü tıkamasını önler. [[K6 s. 204]]'],
    ['Kabarcık', ['Kanda hava kabarcığı', 'Gazların havayla dengelenmesi', 'Hatalı kısmi basınç'], 'Örnek kabarcıksız olmalı ve alındıktan hemen sonra analiz edilmelidir. [[K6 s. 204]]'],
    ['Membran', ['Kan proteinleri', 'Membran yüzeyinde birikim', 'Hatalı sensör yanıtı'], 'Düzenli membran değişimi protein kaplanmasına bağlı hatayı önler. [[K6 s. 204]]'],
  ]);

  VIZ.fk11b_akim = el => SEKIL.sahne(el, {
    ...alan, baslik: 'Oksijen kısmi basıncı ve hücre akımı',
    param: goreli('Göreli oksijen kısmi basıncı'),
    secenek: sec('Hücre', ['Clark', 'Yakıt hücresi']),
    metin: p => p.secim === 'Clark'
      ? 'Clark elektrodunda yaklaşık 0,6 V sabit gerilim altında ölçülen akım örneğin oksijen kısmi basıncını yansıtır. [[K6 s. 204–205]]'
      : 'Yakıt hücresinde dış besleme olmadan üretilen akım oksijen kısmi basıncıyla doğru orantılıdır. [[K6 s. 202]]',
    ciz: (S, t, p) => {
      const x0 = 38, x1 = S.w - 36, y0 = 165, y1 = 47;
      const x = x0 + (x1 - x0) * p.oran, y = y0 + (y1 - y0) * p.oran;
      return S.t(x0, 22, 'Göreli akım', { c: 'b' })
        + S.ok([[x0, y0], [x0, y1 - 14]]) + S.ok([[x0, y0], [x1 + 14, y0]])
        + S.cizgi([[x0, y0], [x1, y1]], { renk: 'accent', w: 3 })
        + S.cizgi([[x0, y], [x, y], [x, y0]], { renk: 'muted', kesik: true })
        + S.daire(x, y, 7, { dolgu: 'accent', renk: 'accent' })
        + S.t(x1, 196, 'Göreli O₂ kısmi basıncı', { a: 'end' });
    },
  });

  VIZ.fk11b_cam = el => basamaklar(el, 'Ölçüm kanalını izleyin', [
    ['Sanz', ['Kan örneğindeki H⁺', 'Camdaki potansiyel farkı', 'Kanın pH değeri'], 'İç tampon sabitken ölçüm potansiyeli kandaki hidrojen iyonu derişimine bağlıdır. [[K6 s. 205]]'],
    ['Severinghaus', ['CO₂ membrandan geçer', 'Bikarbonat tamponunda H⁺ değişir', 'Cam elektrot pH değişimini algılar'], 'Ölçülen pH değişiminden kanın karbondioksit kısmi basıncı belirlenir. [[K6 s. 206–207]]'],
    ['Diğer iyonlar', ['Örnekte K⁺, Ca²⁺ veya Na⁺', 'Hedef iyona duyarlı elektrot', 'İyon derişimi'], 'Referans elektrot korunur, ölçüm elektrodu hedef iyona göre seçilir. [[K6 s. 207]]'],
  ]);

  VIZ.fk11b_kolon = el => SEKIL.sahne(el, {
    ...alan, baslik: 'Geçiş süresi ve derişim',
    param: goreli('Göreli örnek derişimi'),
    secenek: sec('Sabit faza ilgi', ['Daha az', 'Daha fazla']),
    metin: () => 'Pikin yeri bileşiğin geçiş süresini, yüksekliği derişimini gösterir. [[K6 s. 208]]',
    ciz: (S, t, p) => {
      const sol = 32, sag = S.w - 20, y = 168;
      const x = sol + (sag - sol) * (p.secim === 'Daha az' ? 0.32 : 0.72);
      return S.t(sol, 23, 'Dedektör sinyali', { c: 'b' })
        + S.ok([[sol, y], [sol, 39]]) + S.ok([[sol, y], [sag, y]])
        + S.cizgi([[sol, y], [x - 20, y], [x, y - 113 * p.oran], [x + 20, y], [sag - 8, y]], { renk: 'accent', w: 3 })
        + S.t(sag, 203, 'Kolondan geçiş süresi', { a: 'end' });
    },
  });

  VIZ.fk11b_sapma = el => SEKIL.sahne(el, {
    ...alan, baslik: 'Aynı yükte iki iyonun sapması',
    secenek: sec('İyon kütlesi', ['Daha hafif', 'Daha ağır']),
    metin: () => 'Sabit manyetik alanda daha ağır iyon daha az sapar ve dedektör dizisinin farklı bir bölümüne ulaşır. [[K6 s. 208]]',
    ciz: (S, t, p) => {
      const m = S.w / 2, son = S.w - 47;
      const yol = p.secim === 'Daha hafif' ? 98 : 34;
      const iz = Array.from({ length: 31 }, (_, i) => {
        const u = i / 30;
        return [m - 36 + u * (son - m + 36), 160 - yol * u * u];
      });
      return S.t(9, 36, 'Hızlandırma', { c: 'b' })
        + S.t(son + 32, 36, 'Dedektörler', { a: 'end', c: 'b' })
        + S.ok([[10, 160], [m - 39, 160]])
        + S.cizgi(iz, { renk: 'accent', w: 4 })
        + [62, 126].map(y => S.kutu(son, y - 10, 24, 20, { dolgu: y === 160 - yol ? 'accent' : 'paper' })).join('')
        + S.t(m, 201, 'Sabit manyetik alan', orta);
    },
  });

  VIZ.fk11b_raman = el => SEKIL.sahne(el, {
    ...alan, baslik: 'Foton enerjisi ve algılama yönü',
    secenek: sec('Saçılma', ['Raman', 'Elastik']),
    metin: p => p.secim === 'Raman'
      ? 'Raman saçılmasında yayılan fotonun enerjisi değişir ve örnekten saçılan ışık lazere dik yönde ölçülür. [[K6 s. 209]]'
      : 'Elastik saçılmada fotonun enerjisi, frekansı ve dalga boyu korunur. [[K6 s. 209]]',
    ciz: (S, t, p) => {
      const m = S.w / 2, raman = p.secim === 'Raman';
      return S.t(m, 24, raman ? 'Dedektör' : 'Saçılan foton', orta)
        + S.ok([[m, 95], [m, 38]], { renk: raman ? 'clin' : 'basic', w: 4 })
        + S.ok([[12, 126], [m - 30, 126]], { renk: 'basic', w: 4 })
        + S.daire(m, 126, 24, { renk: 'muted', dolgu: 'basic-soft' })
        + S.t(9, 160, 'Argon lazeri') + S.t(m, 180, 'Örnek', orta)
        + S.t(m + 13, 73, raman ? 'Enerji değişir' : 'Aynı enerji');
    },
  });
})();
