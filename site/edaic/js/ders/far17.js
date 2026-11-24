(function () {
  const boyut = { vb: [620, 212], vbDar: [360, 212] };
  const orta = { a: 'middle', c: 'b' };

  // Her durumda üst kutu hedefi, alt kutu sonucu gösterir.
  function baglanti(S, ilk, islem, son) {
    const x = S.w / 2;
    const w = Math.min(410, S.w - 24);
    return S.kutu(x - w / 2, 7, w, 54, { yazi: ilk, renk: 'basic', dolgu: 'basic-soft' })
      + S.ok([[x, 65], [x, 87]], { renk: 'accent' })
      + S.t(x, 111, islem, orta)
      + S.ok([[x, 121], [x, 146]], { renk: 'accent' })
      + S.kutu(x - w / 2, 151, w, 54, { yazi: son, renk: 'clin', dolgu: 'clin-soft' });
  }

  function basamaklar(el, baslik, adimlar) {
    return SEKIL.adim(el, { ...boyut, baslik, oto: false, adimlar: adimlar.map(
      ([ad, ilk, islem, son, metin]) => ({ ad, metin, ciz: S => baglanti(S, ilk, islem, son) })
    ) });
  }

  function karsilastir(el, baslik, secimler) {
    return SEKIL.sahne(el, {
      ...boyut, baslik,
      secenek: { id: 'durum', ad: baslik, liste: Object.keys(secimler).map(ad => ({ ad, d: ad })) },
      ciz: (S, t, p) => {
        const { ilk, islem, son } = secimler[p.durum];
        return baglanti(S, ilk, islem, son);
      },
      metin: p => secimler[p.durum].metin,
    });
  }

  VIZ.a17_raas = el => basamaklar(el, 'Renin–anjiyotensin–aldosteron sistemi', [
    ['Renin', 'Anjiyotensinojen', 'Renin ile parçalanma', 'Anjiyotensin I · dekapeptit',
      'Renin, dolaşımdaki anjiyotensinojenden on aminoasitli anjiyotensin I’i ayırır. [[K3 s. 269]]'],
    ['ACE', 'Anjiyotensin I', 'ACE ile dönüşüm', 'Anjiyotensin II · aktif oktapeptit',
      'ACE sekiz aminoasitli aktif anjiyotensin II’yi oluşturur ve bradikinini inaktive eder. [[K3 s. 269]]'],
    ['Geri bildirim', 'Anjiyotensin II', 'Adrenal korteks ve böbrek', ['Aldosteron salınımı ↑', 'Renin salınımı ↓'],
      'Anjiyotensin II adrenal korteksten aldosteron salınımını uyarırken jukstaglomerüler hücrelerden renin salınımını baskılar. [[K3 s. 270]]'],
  ]);

  VIZ.a17_perfuzyon = el => karsilastir(el, 'Ramipril altında renal perfüzyon', {
    'Korunmuş': { ilk: 'Normal perfüzyon', islem: 'Renal vazodilatasyon olabilir', son: 'Natriürez',
      metin: 'Perfüzyon korunuyorsa renal damarların genişlemesi sodyum atılımına yol açabilir. [[K3 s. 271]]' },
    'Yetersiz': { ilk: 'Yetersiz perfüzyon', islem: 'Efferent arteriyolde destek kaybı', son: ['Renal perfüzyon basıncı ↓', 'Böbrek yetmezliği olasılığı'],
      metin: 'Anjiyotensin II’nin efferent arteriyolü daraltarak sağladığı basınç desteği kalkınca renal perfüzyon basıncı düşer ve yetmezlik gelişebilir. [[K3 s. 271]]' },
  });

  VIZ.a17_hedef = el => karsilastir(el, 'Ramipril ve losartanın hedefleri', {
    'Ramipril': { ilk: 'Ramiprilat', islem: 'ACE inhibisyonu', son: ['Anjiyotensin II oluşumu ↓', 'Bradikinin yıkımı ↓'],
      metin: 'Enzim blokajında bradikinin birikimi kuru öksürüğe neden olabilir. [[K3 s. 271]]' },
    'Losartan': { ilk: 'Losartan ve aktif metaboliti', islem: 'AT₁ blokajı', son: ['Anjiyotensin II’nin AT₁ etkisi ↓', 'Bradikinin yıkımı sürer'],
      metin: 'ACE çalışmayı sürdürür, bradikinin yükselmez ve ACE inhibisyonuyla ilişkili kuru öksürük ortaya çıkmaz. [[K3 s. 272]]' },
  });

  const evreler = [
    ['Dilatasyon', 'Arteriyolde doğrudan dilatasyon', 'Basınç düşer', 1,
      'İntravenöz guanetidin başlangıçta arteriyolleri doğrudan genişletir ve bir miktar hipotansiyon oluşturur. [[K3 s. 274]]'],
    ['Yer değiştirme', 'Noradrenalin yerinden ayrılır', 'Basınç yükselebilir', -1,
      'Guanetidin noradrenalini bağlanma yerinden uzaklaştırırken geçici hipertansiyon görülebilir. [[K3 s. 274]]'],
    ['Salınım blokajı', 'Kalan noradrenalin salınamaz', 'Basınç düşer', 1,
      'Son evrede terminalde kalan az miktardaki noradrenalinin salınımı engellenir ve basınç düşer. [[K3 s. 274]]'],
  ];
  VIZ.a17_guan = el => SEKIL.adim(el, {
    ...boyut, baslik: 'İntravenöz guanetidine basınç yanıtı', oto: false,
    adimlar: evreler.map(([ad, olay, sonuc, , metin], i) => ({
      ad, metin, ciz: S => {
        const genislik = (S.w - 20) / 3;
        return S.t(S.w / 2, 29, olay, orta) + evreler.map((evre, j) => {
          const x = 10 + (j + 0.5) * genislik;
          const renk = i === j ? 'accent' : 'muted';
          return S.kutu(x - genislik / 2 + 2, 51, genislik - 4, 90,
            { renk, dolgu: i === j ? 'accent-soft' : 'paper' })
            + S.ok([[x, 96 - evre[3] * 22], [x, 96 + evre[3] * 22]], { renk, w: i === j ? 4 : 2 });
        }).join('') + S.t(S.w / 2, 180, sonuc, orta);
      },
    })),
  });

  VIZ.a17_metil = el => basamaklar(el, 'Metildopanın santral etki basamakları', [
    ['Beyne geçiş', 'Metildopa', 'Beyne geçer, dekarboksile olur', 'α-metilnoradrenalin',
      'Kan–beyin bariyerini kolayca geçip dekarboksile olan metildopadan oluşan α-metilnoradrenalin güçlü α₂ ve sınırlı α₁ agonistidir (α₂:α₁ oranı 10:1). [[K3 s. 275]]'],
    ['Geri bildirim', 'Nucleus tractus solitarius', 'Presinaptik α₂ uyarısı', 'Noradrenalin salınımı ↓',
      'Bu çekirdekte presinaptik α₂ uyarısı, daha fazla noradrenalin salınmasını negatif geri bildirimle sınırlar. [[K3 s. 275]]'],
    ['Dolaşım', 'Merkezi sempatik tonus ↓', 'Sistemik vasküler direnç ↓', 'Kan basıncı ↓',
      'Direnç azalırken göreli bradikardiye rağmen kalp debisi korunur. [[K3 s. 275]]'],
  ]);

  VIZ.a17_klon = el => karsilastir(el, 'Klonidinin santral hedefleri', {
    'Beyin sapı': { ilk: 'Lateral retiküler çekirdek', islem: 'α₂ uyarısı', son: 'Santral sempatik çıkış ↓',
      metin: 'Lateral retiküler çekirdekte α₂ uyarısı sempatik çıkışı azaltır. [[K3 s. 276]]' },
    'Omurilik': { ilk: 'Spinal α₂ reseptörleri', islem: 'Omurilikte iki etki', son: ['Endojen opiyat salınımı ↑', 'İnen noradrenerjik yollar modüle olur'],
      metin: 'Spinal α₂ uyarısı hem endojen opiyat salınımını artırır hem de spinal nosiseptif işlemlemeye katılan inen noradrenerjik yolları modüle eder. [[K3 s. 276]]' },
    'Anestezik etki': { ilk: 'Merkezi postsinaptik reseptör', islem: 'α₂ uyarısı', son: 'Volatil anestezik MAC ↓',
      metin: 'MAC azalması merkezi postsinaptik α₂ uyarısıyla ilişkili görünmektedir. [[K3 s. 276]]' },
  });
})();
