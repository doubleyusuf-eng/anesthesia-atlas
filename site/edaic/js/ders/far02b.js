(function () {
  'use strict';
  const VIZ = window.VIZ;

  // Dikey yerleşimde açıklama her zaman iki kutunun arasında kalır.
  function gecis(S, giris, bag, sonuc, renk = 'accent') {
    const x = S.w / 2;
    const w = Math.min(S.w - 28, 440);
    return S.kutu(x - w / 2, 10, w, 52, { yazi: giris, renk: 'basic', dolgu: 'basic-soft' })
      + S.ok([[x, 63], [x, 127]], { renk })
      + S.kutu(x - w / 2, 80, w, 29, { yazi: bag, renk: 'line' })
      + S.kutu(x - w / 2, 128, w, 52, { yazi: sonuc, renk, dolgu: renk + '-soft' });
  }
  function secim(el, baslik, soru, durumlar, ciz) {
    return SEKIL.sahne(el, {
      baslik, vb: [640, 194], vbDar: [360, 194],
      secenek: { id: 'durum', ad: soru, liste: Object.entries(durumlar).map(([d, v]) => ({ d, ad: v.ad })) },
      ciz: (S, t, p) => ciz(S, durumlar[p.durum]),
      metin: p => durumlar[p.durum].metin,
    });
  }
  function zincir(S, d) {
    return gecis(S, d.giris, d.bag, d.sonuc, d.renk);
  }

  const dokular = [
    { ad: 'Yüksek akım', etiket: ['Beyin, akciğer, böbrek', 'tiroid ve adrenal bez'], metin: 'İlk grup, birim zamanda en çok kan alan dokulardır. [[K3 s. 15]]' },
    { ad: 'Orta akım', etiket: 'Kas', metin: 'Kan akımı orta düzeydeki kas, yüksek akımlı organlardan sonra gelir. [[K3 s. 15]]' },
    { ad: 'Çok düşük akım', etiket: 'Yağ dokusu', metin: 'Kan akımının çok düşük olduğu yağ dokusu dağılım sırasının sonundadır. [[K3 s. 15]]' },
  ];
  VIZ.a02b_perfuzyon = el => SEKIL.adim(el, {
    baslik: 'Kan akımına göre dokuların dağılım sırası', vb: [640, 235], vbDar: [360, 235], oto: false,
    adimlar: dokular,
    ortak: (S, aktif) => dokular.map((d, i) => {
      const y = 10 + i * 76;
      const renk = i === aktif ? 'accent' : 'line';
      return S.kutu(8, y, 126, 57, { yazi: i === 2 ? ['Çok düşük', 'akım'] : d.ad, renk, dolgu: i === aktif ? 'accent-soft' : 'paper' })
        + S.ok([[134, y + 29], [154, y + 29]], { renk })
        + S.kutu(156, y, S.w - 164, 57, { yazi: d.etiket, renk, dolgu: i === aktif ? 'accent-soft' : 'paper' });
    }).join(''),
  });

  VIZ.a02b_bariyer = el => secim(el, 'Kan-beyin bariyerinden geçiş', 'İlaç grubunu seçin', {
    anestezi: { ad: 'Anestezik', giris: ['İnhalasyon ve intravenöz', 'anestezikler'], bag: 'Basit difüzyon', sonuc: 'Beyne kolay geçiş', metin: 'Sağlıklı bariyeri basit difüzyonla yalnız düşük molekül ağırlıklı, lipitte çözünen ilaçlar geçebilir. [[K3 s. 16]]' },
    kas: { ad: 'Kas gevşetici', giris: 'Büyük, polar kas gevşetici', bag: 'Bariyer geçişi engeller', sonuc: 'Santral etki yok', renk: 'warn', metin: 'Büyük ve polar kas gevşeticiler sağlam bariyeri geçemez. [[K3 s. 16]]' },
    penisilin: { ad: 'Penisilin', giris: 'Sağlıklı bariyer: zayıf geçiş', bag: 'Menenjitte inflamasyon', sonuc: 'Penisilin geçişinde artış', metin: 'Menenjitte bariyer penisilin ve diğer ilaçlara daha geçirgen hale gelir, böylece penisilin tedavi için geçebilir. [[K3 s. 16]]' },
  }, zincir);

  VIZ.a02b_plasenta = el => secim(el, 'Proteine bağlanmanın plasental geçişe etkisi', 'Bağlanmanın arttığı taraf', {
    anne: { ad: 'Annede artış', taraf: 'Anne kanı', sonuc: 'Geçiş yavaşlar', metin: 'Annede bağlanma arttığında plasentayı geçebilecek serbest ilaç konsantrasyonu düşer. [[K3 s. 16]]' },
    fetus: { ad: 'Fetüste artış', taraf: 'Fetal kan', sonuc: 'Geçiş artar', metin: 'Fetüste yüksek bağlanma serbest ilaç düzeyini düşük tutar ve anneden fetüse geçişi artırır. [[K3 s. 16]]' },
  }, (S, d) => {
    const x = S.w / 2;
    const anne = d.taraf === 'Anne kanı';
    const bolme = (sol, ad, secili) => S.kutu(sol, 18, x - 22, 65, {
      yazi: secili ? [ad, 'Serbest ilaç ↓'] : ad,
      renk: secili ? 'basic' : 'line', dolgu: secili ? 'basic-soft' : 'paper',
    });
    return bolme(8, 'Anne kanı', anne) + bolme(x + 14, 'Fetal kan', !anne)
      + S.cizgi([[x, 10], [x, 135]], { renk: 'muted', kesik: true })
      + S.ok([[x / 2, 108], [x * 1.5, 108]], { renk: 'accent' })
      + S.t(x, 164, d.sonuc, { a: 'middle', c: 'b' });
  });

  VIZ.a02b_etkinlik = el => secim(el, 'Metabolizmanın etkinliğe etkisi', 'Etkinlik ilişkisi', {
    az: { ad: 'Azalan etki', giris: 'Etkin ilaç', bag: 'Metabolizma', sonuc: 'Daha az etkin ürün', metin: 'Bir ilacın metabolizması çoğu kez etkinliğini azaltır. [[K3 s. 18]]' },
    on: { ad: 'Ön ilaç', giris: ['Ön ilaç', 'Dönüşüm öncesi etkinlik yok'], bag: 'Metabolizma', sonuc: 'Etkin ürün', metin: 'Ön ilaç vücutta etkin bir bileşiğe dönüştüğünde amaçlanan etki ortaya çıkar. [[K3 s. 18]]' },
    es: { ad: 'Eşdeğer etki', giris: 'Etkin ana ilaç', bag: 'Metabolizma', sonuc: 'Eşdeğer etkinlikte metabolit', metin: 'Metabolit ana ilaç kadar etkinse etki süresi ana ilacın plazma düzeyini izlemez. [[K3 s. 18]]' },
  }, zincir);

  VIZ.a02b_konjugasyon = el => secim(el, 'Faz II’ye ulaşan iki yol', 'Metabolizma yolunu seçin', {
    ard: { ad: 'Faz I ardından II', giris: 'Faz I ile oluşan metabolit', bag: 'Konjugasyon', sonuc: 'Suda çözünürlük ↑', metin: 'Birçok ilaç önce faz I dönüşümüne uğrar ve oluşan metabolit faz II’ye girer. [[K3 s. 19–20]]' },
    tek: { ad: 'Yalnız faz II', giris: 'Ana ilaç', bag: 'Doğrudan konjugasyon', sonuc: 'Suda çözünürlük ↑', metin: 'Bazı ilaçlar yalnız faz II ile değişir ve konjugasyon doğrudan ana ilacın suda çözünürlüğünü artırır. [[K3 s. 19–20]]' },
  }, zincir);

  VIZ.a02b_etkilesim = el => secim(el, 'Alkol ve hepatik mikrozomal enzim etkinliği', 'Kullanım biçimi', {
    akut: { ad: 'Akut kullanım', giris: 'Mikrozomal enzim inhibisyonu', bag: 'İlaç metabolizması yavaşlar', sonuc: 'Plazma ilaç düzeyi yükselebilir', renk: 'warn', metin: 'Akut alkol kullanımı hepatik mikrozomal enzimleri inhibe eden etkenler arasındadır. [[K3 s. 21]]' },
    kronik: { ad: 'Kronik kötüye kullanım', giris: 'Mikrozomal enzim indüksiyonu', bag: 'İlaç metabolizması hızlanır', sonuc: 'Plazma ilaç düzeyi düşebilir', metin: 'Kronik alkol kötüye kullanımı hepatik mikrozomal enzimleri indükleyen etkenler arasındadır. [[K3 s. 21]]' },
  }, zincir);
})();
