(function () {
  'use strict';
  const VIZ = window.VIZ;
  const sec = (ad, liste) => ({ id: 'secim', ad, liste: liste.map(([d, ad]) => ({ d, ad })) });
  function kutu(S, y, etiket, renk = 'accent') {
    const w = Math.min(S.w - 32, 360);
    return S.kutu((S.w - w) / 2, y, w, 52, { yazi: etiket, renk, dolgu: renk + '-soft' });
  }
  function ok(S, y) {
    const x = S.w / 2;
    return S.ok([[x, y], [x, y + 20]], { renk: 'muted' });
  }

  VIZ.a12c_blok = el => SEKIL.adim(el, {
    baslik: 'Reseptörde yarışmadan saptanabilir bloğa', oto: false, vb: [640, 180], vbDar: [360, 180],
    adimlar: [
      { ad: 'Yarışma', metin: 'Gevşeticinin kuaterner amonyum grubu ile asetilkolin (ACh), postjunksiyonel nikotinik reseptörde aynı bağlanma yeri için yarışır. [[K3 s. 191]]',
        ciz: S => kutu(S, 12, 'ACh ↔ Kas gevşetici') + ok(S, 67) + kutu(S, 90, 'Nikotinik reseptör · α alt birimi', 'basic') },
      { ad: 'İşgal', metin: 'Gevşetici α alt birimine bağlandığında kavşakta ACh’nin etkisi baskılanır. [[K3 s. 191]]',
        ciz: S => kutu(S, 12, 'α alt birimine bağlı gevşetici', 'basic') + ok(S, 67) + kutu(S, 90, 'ACh etkisi azalır', 'clin') },
      { ad: 'Saptama', metin: 'Kavşaktaki güvenlik payı kasılmayı korur. [[K3 s. 192]] Periferik sinir stimülatörüyle bloğun saptanması için reseptör işgali %70’i aşmalıdır. [[K3 s. 192]]',
        ciz: S => kutu(S, 12, 'Reseptör işgali > %70', 'basic') + ok(S, 67) + kutu(S, 90, 'Stimülatörle saptanabilir blok', 'clin') }
    ]
  });

  VIZ.a12c_potasyum = el => SEKIL.sahne(el, {
    baslik: 'Potasyum ve iki blok tipi', vb: [640, 175], vbDar: [360, 175],
    secenek: sec('Potasyum durumu', [['dusuk', 'Akut hipokalemi'], ['yuksek', 'Hiperkalemi']]),
    ciz: (S, t, p) => {
      const dusuk = p.secim === 'dusuk';
      return kutu(S, 15, ['Nondepolarizan blok', dusuk ? 'Güçlenir ↑' : 'Zayıflar ↓'], 'basic') +
        kutu(S, 94, ['Depolarizan blok', dusuk ? 'Zayıflar ↓' : 'Güçlenir ↑'], 'clin');
    },
    metin: p => p.secim === 'dusuk' ? 'Akut hipokalemide istirahat membran potansiyeli daha negatif olur. [[K3 s. 194]]' :
      'Hiperkalemide her iki ilaç grubunun yanıtı da hipokalemidekinin tersine döner. [[K3 s. 194]]'
  });

  VIZ.a12c_doz = el => SEKIL.sahne(el, {
    baslik: 'Rokuronyum dozu ile entübasyon zamanı ve etki süresi', vb: [640, 190], vbDar: [360, 190],
    secenek: sec('Rokuronyum dozu', [['standart', '0,6 mg/kg'], ['yuksek', '0,9–1,2 mg/kg']]),
    ciz: (S, t, p) => {
      const yuksek = p.secim === 'yuksek';
      return kutu(S, 15, ['Entübasyon koşulları', yuksek ? '60 saniyeye inebilir' : '100–120 saniye']) +
        kutu(S, 100, ['Etki süresi', yuksek ? 'Belirgin uzar' : 'Vekuronyuma benzer'], 'clin');
    },
    metin: p => p.secim === 'standart' ? 'Düşük potens nedeniyle etkili dozda çok sayıda molekül verilir. [[K3 s. 195]]' :
      'Hızlı entübasyon için yüksek doz kullanıldığında kalp hızı da artabilir. [[K3 s. 196]]'
  });

  VIZ.a12c_yikim = el => SEKIL.sahne(el, {
    baslik: 'Ana ilaçtan metabolitlere iki yıkım yolu', vb: [640, 246], vbDar: [360, 246],
    secenek: sec('Yıkım yolunu seçin', [['ester', 'Atrakuryum · ester'], ['hof', 'Atrakuryum · Hofmann'], ['sis', 'Sisatrakuryum']]),
    ciz: (S, t, p) => {
      const ester = p.secim === 'ester', sis = p.secim === 'sis';
      return kutu(S, 5, sis ? 'Sisatrakuryum' : 'Atrakuryum') + ok(S, 59) +
        kutu(S, 82, ester ? 'Nonspesifik esterazlar' : 'Hofmann eliminasyonu', 'basic') + ok(S, 137) +
        kutu(S, 160, ester ? ['Kuaterner alkol ve asit', '+ laudanozin'] : [sis ? 'Monokuaterner akrilat' : 'Kuaterner monoakrilat', '+ laudanozin'], 'clin');
    },
    metin: p => ({
      ester: 'Atrakuryum metabolizmasının %60’ını ester hidrolizi karşılar. [[K3 s. 197]]',
      hof: 'Normal vücut sıcaklığı ve pH’sında bu parçalanma kendiliğinden gerçekleşir. [[K3 s. 197]]',
      sis: 'Sisatrakuryumda baskın yol Hofmann eliminasyonudur. [[K3 s. 197]] Esterazlar daha sonra akrilatı monokuaterner alkol ve akrilik aside hidrolize eder. [[K3 s. 197]]'
    })[p.secim]
  });

  const izomerler = [
    { ad: 'Sis-trans', oran: 36 }, { ad: 'Trans-trans', oran: 58 }, { ad: 'Sis-sis', oran: 6 }
  ];
  VIZ.a12c_izomer = el => SEKIL.sahne(el, {
    baslik: 'Mivakuryum izomerlerinin karışımdaki payı ve metabolizması', vb: [640, 200], vbDar: [360, 200],
    secenek: sec('İzomeri seçin', izomerler.map(i => [i.ad, i.ad])),
    ciz: (S, t, p) => izomerler.map((i, n) => {
      const y = 25 + 60 * n;
      return S.t(18, y, i.ad + ' · %' + i.oran, { c: 'b' }) +
        S.kutu(18, y + 8, S.w - 36, 14, { dolgu: 'paper', r: 3 }) +
        S.kutu(18, y + 8, (S.w - 36) * i.oran / 100, 14, { dolgu: p.secim === i.ad ? 'accent' : 'muted', r: 3 });
    }).join(''),
    metin: p => p.secim === 'Sis-sis' ? 'Sis-sis enzimatik metabolizmaya uğramaz. [[K3 s. 198]] Potensi diğer iki izomerin yaklaşık %10’u, yarı ömrü ise onların 10 katıdır. [[K3 s. 198]]' :
      p.secim + ' izomerini plazma kolinesterazı metabolize eder. [[K3 s. 199]]'
  });
})();
