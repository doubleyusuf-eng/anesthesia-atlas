(function () {
  'use strict';
  const VIZ = window.VIZ;

  // Aynı üç basamağı telefonda yukarıdan aşağı, geniş ekranda soldan sağa okut.
  function yol(S, etiketler) {
    const dar = S.dar;
    return etiketler.map((yazi, i) => {
      const x = dar ? 20 : 6 + 216 * i;
      const y = dar ? 8 + 78 * i : 18;
      const w = dar ? 280 : 196;
      const h = dar ? 54 : 68;
      const renk = ['basic', 'accent', 'clin'][i];
      const ok = dar ? [[160, y - 23], [160, y - 3]] : [[x - 19, 52], [x - 2, 52]];
      return (i ? S.ok(ok, {renk: 'muted'}) : '') +
        S.kutu(x, y, w, h, {yazi, renk, dolgu: renk + '-soft'});
    }).join('');
  }

  function secimliYol(el, baslik, kontrol, durumlar) {
    return SEKIL.sahne(el, {
      baslik, vb: [640, 104], vbDar: [320, 228],
      secenek: {id: 'secim', ad: kontrol, liste: Object.entries(durumlar).map(([d, durum]) => ({d, ad: durum.ad}))},
      ciz: (S, t, p) => {
        const durum = durumlar[p.secim];
        return durum.ciz ? durum.ciz(S) : yol(S, durum.yol);
      },
      metin: p => durumlar[p.secim].metin
    });
  }

  VIZ.a13c_klirens = el => secimliYol(el, 'Etken seçimine göre aminofilin eliminasyonu', 'Eşlik eden etken', {
    inhibisyon: {
      ad: 'P450 inhibisyonu', yol: [['Hepatik P450', 'inhibisyonu'], ['Eliminasyon', 'gecikebilir'], ['Doz azaltılması', 'önerilir']],
      metin: 'Simetidin, eritromisin, siprofloksasin ve oral kontraseptifler eliminasyonu geciktirme eğilimindedir. [[K3 s. 221]]'
    },
    fluvoksamin: {
      ad: 'Fluvoksamin', yol: ['Fluvoksamin', ['Aminofilin düzeyi', 'hızla yükselebilir'], ['Birlikte kullanımdan', 'kaçınma']],
      metin: 'Selektif serotonin geri alım inhibitörlerinden fluvoksamin, aminofilin düzeyinde keskin artışa yol açabilir. [[K3 s. 221]]'
    },
    induksiyon: {
      ad: 'P450 indüksiyonu', yol: [['Hepatik P450', 'indüksiyonu'], 'Klirens ↑', ['Doz artışı', 'gerekebilir']],
      metin: 'Fenitoin, karbamazepin, barbitüratlar ve rifampisin aminofilin klirensini artırır. [[K3 s. 221]]'
    },
    sigara: {
      ad: 'Sigara', yol: ['Sigara kullanımı', ['Aminofilin', 'eliminasyonu'], 'Klirens ↑'],
      metin: 'Sigara kullananlarda aminofilin klirensi artar. [[K3 s. 221]]'
    }
  });

  VIZ.a13c_doku = el => secimliYol(el, 'Enoksimonun dokuya göre kalsiyum ve kas tonusu üzerindeki etkileri', 'Doku veya dolaşım yanıtı', {
    kalp: {
      ad: 'Miyokard', yol: [['cAMP ↑', 'Yavaş Ca²⁺ girişi ↑'], ['Depolardan', 'Ca²⁺ salınımı ↑'], ['Kasılma', 'gücü ↑']],
      metin: 'Aksiyon potansiyeli sırasında artan yavaş Ca²⁺ girişi, depolardan salınımı artırarak kasılabilir proteinlerin çevresindeki Ca²⁺ düzeyini yükseltir. [[K3 s. 222]]'
    },
    damar: {
      ad: 'Damar düz kası', yol: ['PDE III inhibisyonu', ['Düz kasa Ca²⁺', 'akışı değişir'], 'Vazodilatasyon'],
      metin: 'Enoksimon damar düz kasına Ca²⁺ akışını etkileyerek vazodilatasyona yol açar. [[K3 s. 222]]'
    },
    dolasim: {
      ad: 'Kalp yetmezliğinde yanıt',
      ciz: S => {
        const orta = S.w / 2;
        const birim = (orta - 20) / 35;
        const ust = S.dar ? 55 : 23;
        const alt = S.dar ? 145 : 76;
        return S.cizgi([[orta, ust - 20], [orta, alt + 23]], {renk: 'muted', kesik: true}) +
          S.t(orta - 8, ust + 5, 'Debi', {a: 'end', c: 'b'}) +
          S.kutu(orta, ust - 13, 30 * birim, 26, {dolgu: 'clin-soft', renk: 'clin', yazi: '≈ +%30'}) +
          S.kutu(orta - 35 * birim, alt - 13, 35 * birim, 26, {dolgu: 'basic-soft', renk: 'basic', yazi: '≈ −%35'}) +
          S.t(orta + 8, alt - 4, ['Diyastol sonu', 'dolum basıncı'], {c: 'b'});
      },
      metin: 'Kesikli çizgi başlangıç düzeyini gösterir. Kalp yetmezliğinde enoksimonla debi yaklaşık %30 artarken diyastol sonu dolum basınçları yaklaşık %35 azalır. [[K3 s. 222]]'
    }
  });

  VIZ.a13c_duyarlilik = el => secimliYol(el, 'Levosimendanın kalp ve damar hedefleri', 'Hedef', {
    troponin: {
      ad: 'Troponin C', yol: ['Troponin C', ['Ca²⁺', 'duyarlılığı ↑'], ['Miyokard', 'kontraktilitesi ↑']],
      metin: 'Kalpte troponin C’nin kalsiyuma yanıtı güçlenir. [[K3 s. 223]]'
    },
    kanal: {
      ad: 'K⁺ kanalı', yol: [['ATP’ye duyarlı', 'K⁺ kanalı açılır'], ['Düz kas', 'gevşeyebilir'], ['Sistemik damar', 'direnci ↓']],
      metin: 'Damar düz kasındaki gevşeme inodilatör etkinin damar bileşenidir. [[K3 s. 223]]'
    }
  });

  VIZ.a13c_kullanim = el => secimliYol(el, 'Seçilen ajanın kullanım bağlamı', 'Ajan', {
    glukagon: {
      ad: 'Glukagon', yol: [['β-bloker', 'doz aşımı'], 'Glukagon', ['Adenilat siklaz ↑', 'cAMP ↑']],
      metin: 'Glukagonun reseptörü G proteini aracılığıyla adenilat siklazı uyarır ve hücre içi cAMP’yi artırır. [[K3 s. 223]]'
    },
    kalsiyum: {
      ad: 'Ca²⁺ tuzları', yol: [['İntravenöz', 'Ca²⁺ tuzları'], ['Kan basıncı', 'birkaç dakika ↑'], ['Kullanım sınırı:', 'hiperkalemi ve Ca²⁺', 'antagonisti kollapsı']],
      metin: 'Ca²⁺ tuzları kan basıncını çoğu kez birkaç dakikalığına iyileştirir. Kitap kullanımlarını hiperkalemi ve Ca²⁺ kanal antagonisti doz aşımına bağlı dolaşım kollapsıyla sınırlar. [[K3 s. 223]]'
    },
    tiroid: {
      ad: 'T₃ ve T₄', yol: ['Hipotiroidizm', 'T₃ ve T₄', ['Pozitif inotropi', 've kronotropi']],
      metin: 'Tiroid hormonlarının bu bağlamda tek kullanım alanı hipotiroidizm tedavisidir. [[K3 s. 223]]'
    }
  });
})();
