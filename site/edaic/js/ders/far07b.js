(function () {
  'use strict';
  const VIZ = window.VIZ;
  const frame = { vb: [610, 265], vbDar: [340, 265] };
  const choice = (ad, entries) => ({
    id: 'secim', ad, liste: entries.map(([d, label]) => ({ d, ad: label })),
  });
  const path = (S, points, style) =>
    S.cizgi(points.map(([x, y]) => [24 + x * (S.w - 54), y]), style);

  VIZ.a07b_hedef = el => SEKIL.sahne(el, {
    ...frame, baslik: 'Hedef seçimine göre plazma ve etki yeri eğrileri',
    secenek: choice('Hedef', [['plazma', 'Plazma'], ['etki', 'Etki yeri']]),
    ciz(S, t, p) {
      const etki = p.secim === 'etki';
      const plazma = etki ? [[0, 197], [.09, 65], [.20, 83], [.35, 104], [.52, 117], [.65, 120], [1, 120]]
        : [[0, 197], [.09, 120], [1, 120]];
      const etkiYeri = etki ? [[0, 197], [.09, 194], [.20, 177], [.35, 149], [.52, 128], [.65, 120], [1, 120]]
        : [[0, 197], [.10, 191], [.22, 171], [.40, 149], [.58, 134], [.78, 124], [1, 120]];
      return S.t(24, 25, 'Konsantrasyon', { c: 'b' })
        + S.t(24, 50, 'Plazma ━', { renk: 'basic' })
        + S.t(S.w - 30, 50, 'Etki yeri ┄', { a: 'end', renk: 'clin' })
        + S.ok([[24, 199], [S.w - 16, 199]], { renk: 'muted' })
        + path(S, [[0, 120], [1, 120]], { renk: 'muted', kesik: true })
        + S.t(S.w - 32, 107, 'Hedef', { a: 'end' })
        + path(S, plazma, { renk: 'basic', w: 4 })
        + path(S, etkiYeri, { renk: 'clin', kesik: true, w: 3 })
        + S.t(S.w - 17, 221, 'Zaman', { a: 'end' })
        + S.t(S.w / 2, 249, etki ? 'Bolus → duraklama → idame' : 'Bolus → idame', { a: 'middle', c: 'b' });
    },
    metin: p => p.secim === 'etki'
      ? 'Plazma düzeyi düşerken etki yeri düzeyi hedefi aşmadan yükselir. [[K3 s. 80]] İkisi hedefte buluşunca pompa yeniden çalışır. [[K3 s. 80]]'
      : 'Pompa bolusla plazmayı hedefe getirir ve infüzyonla orada tutar. [[K3 s. 80]] Etki yerinin hedefe yaklaşma hızını model ve kₑ₀ belirler. [[K3 s. 80]]',
  });

  VIZ.a07b_hacim = el => SEKIL.sahne(el, {
    vb: [610, 190], vbDar: [340, 190], baslik: 'İki ağırlıkta merkezi kompartıman hacmi',
    secenek: choice('Ağırlık', [['70', '70 kg'], ['140', '140 kg']]),
    ciz(S, t, p) {
      const agir = p.secim === '140';
      const row = (y, ad, deger, etiket, renk) =>
        S.t(18, y, ad, { c: 'b' }) + S.t(S.w - 18, y, etiket, { a: 'end' })
        + S.kutu(18, y + 14, (S.w - 36) * deger / 31.92, 21, { renk, dolgu: renk + '-soft', r: 3 });
      return row(33, 'Marsh · V₁', agir ? 31.92 : 15.96, agir ? '31,92 L' : '15,96 L', 'basic')
        + row(122, 'Schnider · V₁', 4.27, '4,27 L', 'clin');
    },
    metin: p => p.secim === '70'
      ? '70 kg’da Schnider’in V₁ değeri Marsh’ın yaklaşık dörtte biridir. [[K3 s. 82–83]]'
      : '70 kg’dan 140 kg’a çıkıldığında Marsh’ta V₁ iki katına çıkar, Schnider’de sabit kalır. [[K3 s. 82–83]]',
  });

  const kombinasyonlar = {
    prop: { konum: .14, ad: 'Propofol ağırlıklı', metin: 'Aynı etki için propofol hedefi yükseltildiğinde remifentanil hedefi düşürülebilir. [[K3 s. 84]]' },
    orta: { konum: .43, ad: 'En güçlü sinerji', metin: 'Eğrinin içe doğru en çok büküldüğü bölgede sinerji en güçlüdür. [[K3 s. 85]]' },
    remi: { konum: .83, ad: 'Remifentanil ağırlıklı', metin: 'Remifentanil hedefini artırmak aynı etki için daha düşük bir propofol hedefi seçmeye olanak verir. [[K3 s. 84]]' },
  };
  VIZ.a07b_sinerji = el => SEKIL.sahne(el, {
    ...frame, baslik: 'Propofol ve remifentanil izobologramı',
    secenek: choice('Kombinasyon', Object.entries(kombinasyonlar).map(([d, v]) => [d, v.ad])),
    ciz(S, t, p) {
      const x = u => 28 + u * (S.w - 62);
      const y = u => 202 - 140 * Math.pow(1 - u, 3);
      const u = kombinasyonlar[p.secim].konum;
      return S.t(24, 29, 'Propofol hedefi', { c: 'b' })
        + S.ok([[28, 205], [28, 44]], { renk: 'muted' })
        + S.ok([[28, 205], [S.w - 16, 205]], { renk: 'muted' })
        + S.cizgi(Array.from({ length: 61 }, (_, i) => [x(i / 60), y(i / 60)]), { renk: 'basic', w: 3 })
        + S.daire(x(u), y(u), 7, { dolgu: 'clin', renk: 'paper' })
        + S.t(S.w - 18, 235, 'Remifentanil hedefi', { a: 'end', c: 'b' });
    },
    metin: p => kombinasyonlar[p.secim].metin,
  });

  VIZ.a07b_iletim = el => SEKIL.sahne(el, {
    ...frame, baslik: 'Uygulama yoluna göre iletim kesintisinin izlenmesi',
    secenek: choice('Uygulama', [['tiva', 'TİVA'], ['volatil', 'Volatil anestezi']]),
    ciz(S, t, p) {
      const tiva = p.secim === 'tiva';
      const kutu = (y, yazi, renk) => S.kutu(20, y, S.w - 40, 51, { yazi, renk, dolgu: renk + '-soft' });
      const orta = S.w / 2;
      const ok = y => S.ok([ [orta, y], [orta, y + 19] ], { renk: 'muted' });
      return kutu(15, tiva ? 'Propofol infüzyonu' : 'Volatil ajan', 'basic') + ok(70)
        + kutu(94, tiva ? 'İnfüzyon bağlantısı ayrılır' : 'Solunum devresi arızalanır', 'warn') + ok(150)
        + kutu(175, tiva ? ['İletim kesintisi için', 'eşdeğer bir gösterge yok'] : ['Ekshale gaz analizi', 'iletim kaybını gösterir'], 'clin');
    },
    metin: p => p.secim === 'tiva'
      ? 'Propofol hattının ayrılması pompadaki konsantrasyon tahmininden anlaşılamaz. [[K3 s. 86]]'
      : 'Ekshale gaz analizi derinliğin gerçek zamanlı, dolaylı bir ölçüsüdür ve volatil ajanın iletilememesini saptamaya olanak verir. [[K3 s. 86]]',
  });

  VIZ.a07b_yarilanma = el => SEKIL.adim(el, {
    ...frame, baslik: 'İnfüzyonun bitiminden sonra plazma düzeyinin düşüşü', oto: false,
    ortak(S, i) {
      const x = u => 25 + u * (S.w - 62);
      const base = 202, y = oran => base - 136 * oran;
      const noktalar = [[0, 1], [.08, .70], [.18, .5], [.30, .38], [.53, .25], [.72, .17], [.94, .12]];
      const an = [2, 4, 6][i], [u, oran] = noktalar[an];
      const etiket = ['İlk yarılanma', 'Sonraki yarılanma', 'Uyanma düzeyine iniş'][i];
      return S.t(25, 26, 'Plazma konsantrasyonu', { c: 'b' })
        + S.t(25, 53, 'İnfüzyon sonu', { c: 'm' })
        + S.ok([[25, base], [S.w - 15, base]], { renk: 'muted' })
        + S.cizgi([[25, y(oran)], [x(u), y(oran)], [x(u), base]], { renk: 'clin', kesik: true })
        + S.cizgi(noktalar.map(([a, b]) => [x(a), y(b)]), { renk: 'basic', w: 3 })
        + S.daire(x(u), y(oran), 6, { renk: 'clin', dolgu: 'clin-soft' })
        + S.t(S.w - 20, 109, etiket, { a: 'end', c: 'b' })
        + S.t(S.w - 15, 233, 'İnfüzyon kesildikten sonra geçen süre', { a: 'end' });
    },
    adimlar: [
      { ad: 'İlk yarı', metin: 'İnfüzyonun kesildiği andan işaretli noktaya kadar geçen süre CSHT’dir. [[K3 s. 86]]' },
      { ad: 'İkinci yarı', metin: 'Düzey yeniden yarıya indiğinde geçen ek süre, ilk yarılanmadan muhtemelen çok daha uzundur. [[K3 s. 87]]' },
      { ad: 'Uyanma', metin: 'Uzun ve uyarıcı cerrahi sonrasında uyanma düzeyi ilk yarının çok altında olabilir. [[K3 s. 88]] Pompadaki azalma süresi, infüzyon sonundan seçilen düzeye kadar hesaplanır. [[K3 s. 85]]' },
    ],
  });
})();
