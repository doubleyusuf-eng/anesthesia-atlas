(function () {
  'use strict';
  const VIZ = window.VIZ;

  // Her sütun kendi başlığını taşır. Dar ekranda aynı okuma sırası yukarıdan aşağıya sürer.
  function karsilastir(el, baslik, kontrol, basliklar, secimler) {
    return SEKIL.sahne(el, {
      baslik, vb: [720, 130], vbDar: [360, 300],
      secenek: {id: 'secim', ad: kontrol, liste: Object.keys(secimler).map(ad => ({d: ad, ad}))},
      metin: p => secimler[p.secim].aciklama,
      ciz: (S, t, p) => basliklar.map((ad, i) => {
        const x = S.dar ? 16 : 8 + i * 240;
        const y = S.dar ? 8 + i * 98 : 8;
        const w = S.dar ? 328 : 224;
        return S.t(x + w / 2, y + 19, ad, {a: 'middle', c: 'b'}) +
          S.kutu(x, y + 29, w, 55, {
            yazi: secimler[p.secim].alanlar[i], dolgu: ['basic-soft','accent-soft','clin-soft'][i],
            renk: ['basic','accent','clin'][i],
          });
      }).join(''),
    });
  }

  VIZ.a13b_yol = el => karsilastir(el, 'Fenilefrinin yola göre etki zamanları', 'Uygulama yolu',
    ['Uygulama','Etki başlangıcı','Etki süresi'], {
      'IV bolus': {
        alanlar: ['50–100 µg','Hızlı','5–10 dakika'],
        aciklama: '50–100 µg IV bolustan sonra kan basıncı hızla yükselir ve artış 5–10 dakika sürer. [[K3 s. 215]]',
      },
      'Kas içi / deri altı': {
        alanlar: ['2–5 mg','15 dakika','1 saate kadar'],
        aciklama: 'Daha uzun etki için intramüsküler veya subkütan 2–5 mg verilebilir, etki 15 dakikada başlar ve 1 saate kadar sürer. [[K3 s. 215]]',
      },
    });

  VIZ.a13b_debi = el => karsilastir(el, 'Üç katekolaminde kalp debisi ve arter basıncı', 'Katekolamin',
    ['Kalpte baskın etki','Sistemik damar yanıtı','Arter basıncı'], {
      'İzoprenalin': {
        alanlar: [['β₁: Hız ↑','Kontraktilite ↑'],['β₂: Direnç','azalabilir'],'Değişken'],
        aciklama: 'β₁ uyarısı debiyi artırır, ancak β₂ aracılı direnç düşüşü nedeniyle basınç korunamayabilir. [[K3 s. 215]]',
      },
      'Dobutamin': {
        alanlar: [['β₁: Kontraktilite ↑','Hız ↑'],['β₂: Dirençte','sınırlı düşüş'],'Genellikle artar'],
        aciklama: 'Dobutaminde doğrudan β₁ uyarısı baskındır, sınırlı vazodilatasyona rağmen basınç genellikle yükselir. [[K3 s. 216]]',
      },
      'Dopeksamin': {
        alanlar: [['Kardiyak β₂:','Kontraktilite ↑'],['Periferik β₂:','Artyük ↓'],'Düşebilir'],
        aciklama: 'Pozitif inotropiye artyük azalması eklenir, böylece debi artarken kan basıncı düşebilir. [[K3 s. 217]]',
      },
    });

  VIZ.a13b_doku = el => karsilastir(el, 'Salbutamolde dokuya göre mekanizma ve sonuç', 'Etki yeri',
    ['Etki yeri','İlk değişiklik','Sonuç'], {
      'Akciğer': {
        alanlar: ['Pulmoner damarlar',['Hipoksik daralma','geri döner'],['Şant ↑','Hipoksemi olabilir']],
        aciklama: 'Hipoksik pulmoner vazokonstriksiyonun çözülmesi şantı artırıp hipoksemiye yol açabilir. [[K3 s. 217]] Bu nedenle nebülize salbutamolle birlikte yeterli oksijen verilmelidir. [[K3 s. 217]]',
      },
      'Potasyum': {
        alanlar: ['Na⁺/K⁺ ATPaz',['Pompa uyarılır','K⁺ hücreye girer'],'Hipokalemi'],
        aciklama: 'Na⁺/K⁺ ATPaz uyarıldığında potasyum hücre içine taşınır ve kandaki düzeyi düşer. [[K3 s. 218]]',
      },
      'Uterus': {
        alanlar: ['Gebe uterus','Düz kas gevşer',['Prematüre eylemde','bazen kullanılır']],
        aciklama: 'Bazen prematüre doğum eyleminde kullanılır. [[K3 s. 217]] Gebe uterusu gevşetir, küçük bir miktarı plasentadan fetüse geçer. [[K3 s. 218]]',
      },
    });

  VIZ.a13b_karma = el => karsilastir(el, 'Karma agonistlerde dolaşım yanıtları', 'Karma agonist',
    ['Baskın dolaşım yanıtı','Kalp debisi','Arter basıncı'], {
      'Efedrin': {
        alanlar: ['Kalp hızı ↑','Artar','Yükselir'],
        aciklama: 'Efedrinle kalp hızı, debi ve kan basıncı birlikte yükselir. [[K3 s. 219]]',
      },
      'Metaraminol': {
        alanlar: ['Sistemik direnç ↑','Sıklıkla düşer','Yükselir'],
        aciklama: 'Metaraminolle basıncı yükselten başlıca etki direnç artışıdır, β aktivitesine rağmen debi sıklıkla düşer. [[K3 s. 219]]',
      },
    });
})();
