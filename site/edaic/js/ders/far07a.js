(function () {
  'use strict';
  const VIZ = window.VIZ;
  const boyut = { vb: [640, 200], vbDar: [360, 200] };

  VIZ.a07a_pompa = (el) => SEKIL.sahne(el, {
    ...boyut, baslik: 'İlaç pompaları ve bağımsız ayar',
    secenek: { id: 'duzen', ad: 'Pompa düzeni', liste: [
      { d: 'ayri', ad: 'Ayrı pompalar' }, { d: 'karisim', ad: 'Tek pompada karışım' }
    ] },
    ciz: (S, t, p) => {
      const ayri = p.duzen === 'ayri';
      const orta = S.w / 2;
      const kol = S.w / 4;
      const sol = S.kutu(10, 12, orta - 20, 48, { yazi: 'Propofol', dolgu: 'basic-soft', renk: 'basic' });
      const sag = S.kutu(orta + 10, 12, orta - 20, 48, { yazi: ayri ? 'Remifentanil' : 'Alfentanil', dolgu: 'clin-soft', renk: 'clin' });
      if (ayri) {
        return sol + sag + [kol, S.w - kol].map(x =>
          S.ok([[x, 62], [x, 108]], { renk: 'ink' }) +
          S.kutu(x - kol + 10, 112, orta - 20, 66, { yazi: ['Pompa', 'Bağımsız ayar'] })
        ).join('');
      }
      return sol + sag + S.cizgi([[kol, 62], [kol, 88], [S.w - kol, 88], [S.w - kol, 62]]) +
        S.ok([[orta, 88], [orta, 116]]) + S.kutu(orta - 100, 120, 200, 58, { yazi: ['Tek pompa', 'Ortak infüzyon'] });
    },
    metin: p => p.duzen === 'ayri'
      ? 'Propofol ile hipnoz, remifentanil ile analjezi birbirinden bağımsız ayarlanabilir. [[K3 s. 75]]'
      : 'Kısa olgularda kullanılan bu karışımda alfentanilin hedef konsantrasyonu doğrudan kontrol edilemez. [[K3 s. 75]]'
  });

  VIZ.a07a_bolus = (el) => SEKIL.adim(el, {
    ...boyut, oto: false, baslik: 'Bolustan sonra plazma ve beyin düzeylerinin karşılaştırılması',
    ortak: (S, i) => {
      const boylar = [[90, 42], [64, 64], [30, 55]][i];
      return ['Plazma', 'Beyin'].map((ad, k) => {
        const x = S.w * (k ? 0.68 : 0.32);
        const renk = k ? 'clin' : 'basic';
        return S.kutu(x - 34, 132 - boylar[k], 68, boylar[k], { renk, dolgu: renk + '-soft' }) +
          S.cizgi([[x - 48, 133], [x + 48, 133]]) + S.t(x, 161, ad, { a: 'middle', c: 'b' });
      }).join('');
    },
    adimlar: [
      { ad: 'İndüksiyon', metin: 'Beyne girişteki kısa gecikme nedeniyle indüksiyonda plazma düzeyi beyin düzeyinden yüksektir. [[K3 s. 76]]' },
      { ad: 'Denge', metin: 'Beyin ile plazma dengelendiğinde plazma konsantrasyonu etkiyle ilişkilidir. [[K3 s. 76]]' },
      { ad: 'Eliminasyon', metin: 'Beyinden çıkış da gecikir, bu evrede beyindeki düzey plazmadakinden yüksektir. [[K3 s. 76]]' }
    ]
  });

  VIZ.a07a_analjezi = (el) => SEKIL.sahne(el, {
    ...boyut, baslik: 'Remifentanil kesilmeden önce analjezi planı',
    secenek: { id: 'plan', ad: 'Kesilmeden önceki analjezi', liste: [
      { d: 'var', ad: 'Analjezi planlanmış' }, { d: 'yetersiz', ad: 'Analjezi yetersiz' }
    ] },
    ciz: (S, t, p) => {
      const planli = p.plan === 'var';
      return S.kutu(16, 12, S.w - 32, 58, { yazi: planli ? ['Rejyonal teknik veya cerrahi', 'bitmeden uzun etkili opioid'] : ['Remifentanil kesilirken', 'analjezi yetersiz'], dolgu: 'clin-soft', renk: 'clin' }) +
        S.ok([ [S.w / 2, 72], [S.w / 2, 116] ]) +
        S.kutu(16, 120, S.w - 32, 60, { yazi: planli ? ['Derlenmede ağrı için', 'analjezi önceden sağlanır'] : ['Derlenmede hiperaljezi', 'görülebilir'], dolgu: planli ? 'ok-soft' : 'warn-soft' });
    },
    metin: p => p.plan === 'var'
      ? 'Ameliyat sonrası ağrı için rejyonal teknik kullanılabilir veya ameliyat bitmeden daha uzun etkili bir opioid verilebilir. [[K3 s. 77]]'
      : 'Analjezik etki hızla kaybolduğunda hiperaljezinin tedavisi başka opiatların yüksek dozlarını gerektirebilir. [[K3 s. 77]]'
  });

  VIZ.a07a_bristol = (el) => SEKIL.adim(el, {
    vb: [640, 224], vbDar: [360, 224], oto: false, baslik: 'Bristol modelinde seçilen dönem ve infüzyon hızı',
    ortak: (S, i) => {
      const hizlar = [10, 8, 6];
      const donemler = [['İlk', '10 dakika'], ['Sonraki', '10 dakika'], ['Daha', 'sonra']];
      return S.t(S.w / 2, 23, 'Propofol infüzyonu (mg/kg/h)', { a: 'middle', c: 'b' }) +
        hizlar.map((hiz, k) => {
          const x = S.w * (k + 0.5) / 3;
          const ust = 156 - hiz * 9;
          return S.kutu(x - 32, ust, 64, hiz * 9, { renk: k === i ? 'accent' : 'line', dolgu: k === i ? 'accent-soft' : 'paper', w: k === i ? 3 : 1.6 }) +
            S.t(x, ust - 7, String(hiz), { a: 'middle', c: 'b' }) + S.t(x, 181, donemler[k], { a: 'middle' });
        }).join('');
    },
    adimlar: [
      { ad: 'İlk 10 dakika', metin: 'İndüksiyon bolusundan sonra infüzyon 10 mg/kg/h ile başlar. [[K3 s. 78]]' },
      { ad: 'Sonraki 10 dakika', metin: 'İkinci 10 dakika boyunca propofol 8 mg/kg/h hızında verilir. [[K3 s. 78]]' },
      { ad: 'Devamı', metin: 'İkinci dönemden sonra şemadaki idame hızı 6 mg/kg/h’dir. [[K3 s. 78]]' }
    ]
  });
})();
