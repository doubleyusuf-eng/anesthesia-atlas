(function () {
  'use strict';
  const VIZ = window.VIZ;
  const sec = (ad, adlar) => ({ id: 'durum', ad, liste: adlar.map(ad => ({ d: ad, ad })) });
  const orta = { a: 'middle', c: 'b' };

  function basamak(S, y, ad, renk = 'accent') {
    const w = Math.min(S.w - 26, 430);
    return S.kutu((S.w - w) / 2, y, w, 48, {
      yazi: ad, renk, dolgu: renk + '-soft', lh: 20,
    });
  }
  function bag(S, y, son) {
    const x = S.w / 2;
    return S.ok([[x, y], [x, son]], { renk: 'muted' });
  }
  const turler = {
    Farmasötik: ['Preparat', 'Fiziksel veya kimyasal geçimsizlik', 'Çözeltide çökelme', 'Aynı sette bikarbonat ve kalsiyumun çökelmesi preparatların fizikokimyasal özellikleriyle ilgilidir. [[K3 s. 40]]'],
    Farmakokinetik: ['İlacın vücutta işlenmesi', 'Metabolizmanın baskılanması', 'Aktif ilaç düzeyinde artış', 'Amiodaron S-varfarinin metabolizmasını yavaşlatarak plazma düzeyini yükseltebilir. [[K3 s. 41]]'],
    Farmakodinamik: ['Reseptör sistemi', 'Kompetitif antagonizma', 'Opioid etkisinin geri çevrilmesi', 'Nalokson opioid etkisini aynı reseptör sisteminde geri çevirir. [[K3 s. 42]]'],
  };
  VIZ.a04_tur = el => SEKIL.sahne(el, {
    baslik: 'Seçilen etkileşimin yeri, mekanizması ve sonucu', vb: [620, 210], vbDar: [360, 210],
    secenek: sec('Etkileşim türü', Object.keys(turler)),
    metin: p => turler[p.durum][3],
    ciz(S, t, p) {
      const [yer, yol, sonuc] = turler[p.durum];
      return basamak(S, 4, yer, 'basic') + bag(S, 54, 77) + basamak(S, 80, yol)
        + bag(S, 130, 153) + basamak(S, 156, sonuc, 'clin');
    },
  });

  VIZ.a04_pgp = el => SEKIL.sahne(el, {
    baslik: 'PGP etkinliği ve hücreden lümene geri taşıma', vb: [620, 228], vbDar: [360, 228],
    secenek: sec('PGP etkinliği', ['İndüksiyon', 'İnhibisyon']),
    metin: p => p.durum === 'İndüksiyon'
      ? 'Rifampisin veya fenitoin PGP’yi indükleyerek duyarlı ilacın oral biyoyararlanımını azaltabilir. [[K3 s. 41]]'
      : 'Amiodaron veya verapamil PGP’yi inhibe ederek duyarlı ilacın oral biyoyararlanımını artırabilir. [[K3 s. 41]]',
    ciz(S, t, p) {
      const ind = p.durum === 'İndüksiyon', x = S.w / 2;
      const yol = [[x, 137], [x, 53]];
      return S.kutu(8, 15, S.w - 16, 71, { renk: 'basic', dolgu: 'basic-soft' })
        + S.kutu(8, 89, S.w - 16, 84, { renk: 'clin', dolgu: 'clin-soft' })
        + S.t(x, 40, 'Bağırsak lümeni', orta) + S.t(x, 162, 'Bağırsak hücresi', orta)
        + S.ok(yol, { renk: 'accent', w: ind ? 7 : 2, kesik: !ind })
        + S.t(x - 16, 108, 'PGP', { a: 'end', c: 'b' })
        + S.t(x + 14, 108, ind ? 'Geri taşıma ↑' : 'Geri taşıma ↓', { c: 'b' })
        + S.t(x, 208, ind ? 'Biyoyararlanım azalabilir' : 'Biyoyararlanım artabilir', orta);
    },
  });

  VIZ.a04_enzim = el => SEKIL.sahne(el, {
    baslik: 'P450 etkinliğinin yıkıma ve aktivasyona etkisi', vb: [620, 210], vbDar: [360, 210],
    secenek: sec('P450 etkinliği', ['İndüksiyon', 'İnhibisyon']),
    metin: p => p.durum === 'İndüksiyon'
      ? 'İndüksiyon, P450 ile inaktive edilen ilacın yıkımını hızlandırırken aktivasyon gerektiren ön ilacın aktif forma dönüşümünü artırır. [[K3 s. 42]]'
      : 'İnhibisyon aktif ilacın plazma düzeyini yükseltebilirken ön ilaçtan aktif metabolit oluşumunu azaltır. [[K3 s. 42]]',
    ciz(S, t, p) {
      const ind = p.durum === 'İndüksiyon', x = S.w / 2;
      const w = (S.w - 36) / 2;
      function kol(left, ad, sonuc, renk) {
        const cx = left + w / 2;
        return S.ok([[x,54],[x,72],[cx,72],[cx,91]], { renk })
          + S.kutu(left, 95, w, 92, { yazi: [ad, sonuc], lh: 27, dolgu: renk + '-soft', renk });
      }
      return basamak(S, 4, ind ? 'P450 etkinliği ↑' : 'P450 etkinliği ↓')
        + kol(12, 'Aktif ilaç', ind ? 'Yıkım ↑' : 'Yıkım ↓', 'basic')
        + kol(x + 6, 'Ön ilaç', ind ? 'Aktivasyon ↑' : 'Aktivasyon ↓', 'clin');
    },
  });

  const kavsak = [
    { ad: 'Enzim', etiket: 'Asetilkolinesteraz inhibisyonu', metin: 'Neostigmin asetilkolinesterazı inhibe eder. [[K3 s. 43]]' },
    { ad: 'Sinaptik aralık', etiket: 'Asetilkolin artışı', metin: 'Enzim inhibisyonu sinaptik aralıktaki asetilkolin konsantrasyonunu yükseltir. [[K3 s. 43]]' },
    { ad: 'Reseptör', etiket: 'Nikotinik reseptörde yarışma', metin: 'Asetilkolin nikotinik reseptörlerde yarışarak nondepolarizan kas gevşeticiyi yerinden uzaklaştırabilir. [[K3 s. 43]]' },
  ];
  VIZ.a04_kavsak = el => SEKIL.adim(el, {
    baslik: 'Nondepolarizan bloğun dolaylı olarak çözülmesi', vb: [620, 208], vbDar: [360, 208],
    oto: false, adimlar: kavsak,
    ortak(S, secili) {
      return kavsak.slice(0, secili + 1).map(({ etiket }, i) => {
        const y = 5 + i * 75;
        return (i ? bag(S, y - 25, y - 3) : '') + basamak(S, y, etiket, i === secili ? 'accent' : 'basic');
      }).join('');
    },
  });

  const izobol = {
    '½': { b: 0.5, ad: 'Aditivite', renk: 'basic', metin: 'A ve B yarı konsantrasyonlarda hedef etkiyi sağlar, işaretli nokta aditivite doğrusu üzerindedir. [[K3 s. 44]]' },
    '¼': { b: 0.25, ad: 'Sinerjizm', renk: 'ok', metin: 'A sabitken B’nin dörtte biri yeterlidir, nokta aditivite doğrusunun altındadır. [[K3 s. 44]]' },
    '¾': { b: 0.75, ad: 'Antagonizm', renk: 'warn', metin: 'A sabitken B’nin dörtte üçü gerekir, nokta aditivite doğrusunun üstündedir. [[K3 s. 44]]' },
  };
  VIZ.a04_izobol = el => SEKIL.sahne(el, {
    baslik: 'A yarı düzeyde sabitken B gereksinimine göre eşit etki eğrisi', vb: [620, 302], vbDar: [360, 302],
    secenek: sec('Hedef etki için gereken B kesri', Object.keys(izobol)),
    metin: p => izobol[p.durum].metin,
    ciz(S, t, p) {
      const { b, ad, renk } = izobol[p.durum];
      const X = a => 49 + a * (S.w - 84);
      const Y = b => 242 - 170 * b;
      // Ara çizgi şematiktir. İki uç ve A = ½ noktasında kitaptaki değerlerden geçer.
      const noktalar = Array.from({ length: 49 }, (_, i) => {
        const a = i / 48;
        return [X(a), Y(1 - a + (b - 0.5) * 4 * a * (1 - a))];
      });
      return S.t(X(0), 26, 'B kesri', { c: 'b' }) + S.t(X(1), 26, ad, { a: 'end', c: 'b', renk })
        + S.ok([[X(0),Y(0)],[X(0),48]], { renk: 'muted' })
        + S.ok([[X(0),Y(0)],[X(1)+17,Y(0)]], { renk: 'muted' })
        + S.cizgi([[X(0),Y(1)],[X(1),Y(0)]], { renk: 'muted', kesik: true })
        + S.cizgi([[X(0),Y(b)],[X(0.5),Y(b)],[X(0.5),Y(0)]], { renk, kesik: true })
        + S.cizgi(noktalar, { renk, w: 3 }) + S.daire(X(0.5),Y(b),6,{ renk, dolgu: renk })
        + S.t(X(0)-10,Y(1)+5,'1',{a:'end'}) + S.t(X(0)-10,Y(b)+5,p.durum,{a:'end',c:'b'})
        + S.t(X(0.5),Y(0)+23,'½',orta) + S.t(X(1),Y(0)+23,'1',orta)
        + S.t(X(1),292,'A kesri',{a:'end',c:'b'});
    },
  });
})();
