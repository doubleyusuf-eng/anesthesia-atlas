/* Diyabet ve insülinler · K3, Türkçe çalışma çevirisi, s. 389–393. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  /* 1) DM tipleri */
  const dmVeri = {
    'Tip 1 DM': {
      renk: 'crit',
      k1: S => S.dar
        ? ['Langerhans β-hücrelerinin yıkımı', 'Mutlak insülin üretimi eksikliği', 'Sıklıkla otoimmün mekanizma']
        : ['Langerhans adacıklarındaki β-hücrelerinin yıkımı → mutlak eksik', 'Sıklıkla otoimmün kökenlidir; ağır hiperglisemi gelişir'],
      k2: S => S.dar
        ? ['Tipik: çocukluk / erken erişkinlik', 'Ancak her yaşta ortaya çıkabilir', 'Çoklu organ/sistem bozulması']
        : ['Çoğunlukla çocukluk ve erken erişkinlikte başlar (her yaş olası)', 'Ağır hiperglisemi; birçok vücut sisteminde tehlikeli bozulma'],
      metin: 'Tip 1 DM çoğunlukla otoimmün β-hücre yıkımına bağlı mutlak insülin eksikliğidir; en sık çocukluk ve erken erişkinlikte ama her yaşta görülebilir. [[K3 s. 389]]',
    },
    'Tip 2 DM': {
      renk: 'basic',
      k1: S => S.dar
        ? ['Mutlak insülin yokluğunun aksine', 'Temel özellik: insülin DİRENCİ', 'Kronik persistan hiperglisemi']
        : ['Mutlak üretim yokluğunun aksine insülin direnciyle karakterize', 'Karbonhidrat, yağ ve protein metabolizmasını bozar'],
      k2: S => S.dar
        ? ['Tipik: yaşamın ileri dönemleri', 'Ancak çocuklarda da görülebilir', 'Çoklu doku ve organ hasarı']
        : ['Tipik olarak ileri yaşta gelişir; ancak çocuklarda da görülebilir', 'Persistan hiperglisemi zamanla çoklu organ hasarına yol açar'],
      metin: 'Tip 2 DM insülin direnciyle karakterize kronik bir durumdur; tipik olarak yaşamın ileri dönemlerinde ortaya çıksa da çocuklarda da gelişebilir. [[K3 s. 389]]',
    },
    'Gestasyonel & Sekonder': {
      renk: 'warn',
      k1: S => S.dar
        ? ['Gestasyonel DM (daha nadir):', 'Gebelik sırasında gelişir ve', 'doğum sonrasında düzelir']
        : ['Gestasyonel DM: gebelikte ortaya çıkıp doğum sonrası düzelir', 'Persistan hiperglisemi tüm tiplerin ortak metabolik sonucudur'],
      k2: S => S.dar
        ? ['Sekonder DM nedenleri:', '• Pankreas yıkımı veya hasarı', '• Endokrin, antiviral, antipsikotik']
        : ['Sekonder DM: pankreas yıkımı veya hasarına bağlı gelişebilir', 'Ayrıca belirli endokrin, antiviral ve antipsikotik ilaçlar'],
      metin: 'Daha nadir tipler gebelikte başlayıp doğum sonrası düzelen gestasyonel diyabet ile pankreas hasarına veya endokrin/antiviral/antipsikotik ilaçlara sekonder diyabettir. [[K3 s. 389]]',
    },
  };
  VIZ.a25a_dm = (el) => SEKIL.sahne(el, {
    baslik: 'Diabetes mellitus sınıflaması: Tip 1, Tip 2, gestasyonel ve sekonder',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Tip', Object.keys(dmVeri)),
    metin: p => dmVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = dmVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  /* 2) İnsülin yapısı, β-hücre salınımı ve reseptör (SEKIL.adim) */
  VIZ.a25a_fizyoloji = (el) => SEKIL.adim(el, {
    baslik: 'İnsülin yapısı, β-hücre salınım zinciri ve karaciğer hedefleri',
    vb: [640, 232], vbDar: [360, 294], hareket: true,
    adimlar: [
      {
        ad: 'Yapı (51 aa)',
        metin: 'Proinsülinden C peptidi (kitapta 34 aa; bkz. Atlas notu) koparılır; 51 amino asitlik A ve B zincirleri 2 zincirler arası + 1 A-içi disülfid köprüsü taşır. [[K3 s. 389–390]]',
        ciz: (S) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 72, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Proinsülin (A + B + C peptidi)', 'Koparılır → C peptidi (kitap 34 aa;', 'gerçekte 31 aa — Atlas notu)'], lh: 21 })
              + S.ok([[W / 2, 84], [W / 2, 112]], { renk: 'accent' })
              + S.kutu(14, 112, W - 28, 86, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Olgun İnsan İnsülini (51 aa)', 'A & B zincirleri: 2 disülfid bağı', 'A zinciri içi: 3. disülfid köprüsü'], lh: 21 })
              + S.kutu(14, 212, W - 28, 62, { dolgu: 'paper', renk: 'line', yazi: ['Sürekli bazal salınım +', 'glukoz yükseldikçe atımlar'], lh: 21 });
          }
          return S.kutu(16, 16, 260, 96, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Proinsülin', 'C peptidi çıkarılır (kitap 34 aa)', '(gerçek insan C peptidi 31 aa)'], lh: 22 })
            + S.ok([[276, 64], [326, 64]], { renk: 'accent' })
            + S.kutu(326, 16, 298, 96, { dolgu: 'accent-soft', renk: 'accent', yazi: ['İnsan İnsülini (51 Amino Asit)', '• A & B arası: 2 disülfid köprüsü', '• A zinciri içi: 1 disülfid (toplam 3)'], lh: 22 })
            + S.kutu(16, 132, 608, 78, { dolgu: 'paper', renk: 'line', yazi: ['Sağlıklı bireyde sürekli bazal salınım vardır; plazma glukozu yükseldiğinde', 'buna salınım atımları eklenir.'], lh: 22 });
        },
      },
      {
        ad: 'β-Hücre Salınımı',
        metin: 'Glukoz β-hücreye girer → ATP ↑ → K⁺ kanalı kapanır → depolarizasyon → Ca²⁺ girişi → insülin ekzositozu; negatif geri bildirim K⁺ kanalını açar. [[K3 s. 389]]',
        ciz: (S, t) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 66, { dolgu: 'ok-soft', renk: 'ok', yazi: ['1) Glukoz ↑ (en güçlü uyaran)', 'β-hücresine giriş → ATP artar'], lh: 22 })
              + S.ok([[W / 2, 78], [W / 2, 102]], { renk: 'warn' })
              + S.kutu(14, 102, W - 28, 78, { dolgu: 'warn-soft', renk: 'warn', yazi: ['2) K⁺ Kanalları Kapanır', 'Hücre depolarize olur →', 'Voltaj duyarlı Ca²⁺ kanalı açılır'], lh: 21 })
              + S.ok([[W / 2, 180], [W / 2, 206]], { renk: 'accent' })
              + S.kutu(14, 206, W - 28, 68, { dolgu: 'accent-soft', renk: 'accent', yazi: ['3) Ca²⁺ Girişi → İnsülin Salınımı', 'Negatif geri bildirim K⁺’yı açar'], lh: 22 });
          }
          const yol = [[105, 66], [238, 66], [390, 66], [536, 66]];
          return S.kutu(16, 20, 134, 92, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Glukoz Girişi', 'ATP ↑', '(en güçlü uyarı)'], lh: 22 })
            + S.ok([[150, 66], [178, 66]], { renk: 'ok' })
            + S.kutu(178, 20, 140, 92, { dolgu: 'warn-soft', renk: 'warn', yazi: ['K⁺ Kanalı', 'Kapanır →', 'Depolarizasyon'], lh: 22 })
            + S.ok([[318, 66], [346, 66]], { renk: 'warn' })
            + S.kutu(346, 20, 130, 92, { dolgu: 'clin-soft', renk: 'clin', yazi: ['Ca²⁺ Kanalları', 'Açılır →', 'Ca²⁺ İçeri'], lh: 22 })
            + S.ok([[476, 66], [504, 66]], { renk: 'accent' })
            + S.kutu(504, 20, 120, 92, { dolgu: 'accent-soft', renk: 'accent', yazi: ['İnsülin', 'Salınımı', '(Ekzositoz)'], lh: 22 })
            + S.akis(yol, t, { renk: 'accent', n: 5 })
            + S.kutu(16, 134, 608, 76, { dolgu: 'paper', renk: 'line', yazi: ['Negatif geri bildirim yoluyla K⁺ kanalları yeniden açılır.', 'Salınan insülin portal dolaşımla doğrudan karaciğere taşınır.'], lh: 22 });
        },
      },
      {
        ad: 'Karaciğer & Reseptör',
        metin: 'Portal dolaşımdaki insülinin ~yarısı karaciğerde alınır ve parçalanır; hücrede 2α+2β reseptörünün α alt birimine bağlanır (β tirozin kinaz önemli). [[K3 s. 389–390]]',
        ciz: (S, t) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 76, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Portal Dolaşım → Karaciğer', 'İnsülinin ~yarısı ilk geçişte yıkılır', 'Glukoz → Glikojen dönüşümü'], lh: 21 })
              + S.kutu(14, 102, W - 28, 86, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Reseptör: 2α + 2β Alt Birim', 'α alt birimine bağlanma → kompleks', 'içeri alınır · β tirozin kinaz önemli'], lh: 21 })
              + S.kutu(14, 202, W - 28, 72, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Anabolik Net Etki', 'Glikojen/TG/protein ↑ · Yıkım ↓'], lh: 22 });
          }
          return S.kutu(16, 16, 294, 100, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Portal Dolaşım → Karaciğer', '• Başlıca hedef organ', '• İnsülinin ~yarısı alınıp yıkılır', '• Glukoz glikojene dönüştürülür'], lh: 21 })
            + S.ok([[310, 66], [338, 66]], { renk: 'accent' })
            + S.akis([[310, 66], [338, 66]], t, { renk: 'accent', n: 3 })
            + S.kutu(338, 16, 286, 100, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Membran Reseptörü (2α + 2β)', '• İnsülin α alt birimine bağlanır', '• Tüm kompleks hücre içine alınır', '• β alt birimi tirozin kinazı önemli'], lh: 21 })
            + S.kutu(16, 134, 608, 76, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Anabolik etkiler: glukoz alımı ve glikojen ↑ (glikojenoliz ↓ → kan glukozu ↓) ·', 'hepatik yağ asidi ve trigliserid depolanması ↑ (lipoliz ↓) · protein sentezi ↑ (yıkım ↓)'], lh: 22 });
        },
      },
    ],
  });

  /* 3) Preparatların zaman–etki profilleri (SEKIL.grafik + saat kaydırıcısı) */
  const gauss = (x, mu, sig, pik) => (x < 0.05 ? 0 : pik * Math.exp(-Math.pow((Math.log(x) - Math.log(mu)) / sig, 2)));
  const egriler = {
    hizli: x => (x > 5.5 ? 0 : gauss(x, 1.0, 0.72, 92)),
    cozunur: x => (x > 8.5 ? 0 : gauss(x, 2.2, 0.72, 74)),
    orta: x => (x < 0.8 || x > 24.5 ? 0 : gauss(x, 6.5, 0.78, 56)),
    uzun: x => (x < 1.2 ? Math.min(34, (x / 1.2) * 34) : (x <= 36 ? 34 - 0.15 * x : 0)),
  };
  VIZ.a25a_preparat = (el) => SEKIL.grafik(el, {
    baslik: 'SC insülinlerin şematik zaman–etki profilleri (K3 başlangıç/pik aralıklarıyla)',
    vb: [640, 290], vbDar: [380, 340],
    x: { min: 0, max: 36, ad: 'Enjeksiyon sonrası süre (saat)', adimlar: [0, 5, 12, 24, 36] },
    y: { min: 0, max: 100, ad: 'Şematik etki (%)', adimlar: [0, 50, 100] },
    param: [{ id: 't', ad: 'Saat işareti', min: 0.5, max: 36, adim: 0.5, deger: 2, birim: 'sa' }],
    egriler: [
      { f: x => egriler.hizli(x), renk: 'crit' },
      { f: x => egriler.cozunur(x), renk: 'warn' },
      { f: x => egriler.orta(x), renk: 'basic' },
      { f: x => egriler.uzun(x), renk: 'ok' },
    ],
    ek: (S, p, X, Y) => {
      const lx = X(S.dar ? 12.5 : 14);
      const satirlar = [
        ['Hızlı analog (15 dk–≤5 sa)', 'crit', 92],
        ['Çözünür insan (SC 30 dk; süre şematik)', 'warn', 80],
        ['Orta (1–2 sa, pik 3–12, ≤24 sa)', 'basic', 68],
        ['Uzun (yavaş, ≤36 sa, düz bazal)', 'ok', 56],
      ];
      return satirlar.map(([yazi, renk, yv]) => S.t(lx, Y(yv), '— ' + yazi, { c: 'b k', renk })).join('');
    },
    dikey: p => [{ x: p.t, ad: `t = ${p.t} sa`, renk: 'accent' }],
    okuma: p => {
      const a = [];
      if (p.t <= 5) a.push('Hızlı analog (aspart/glulisin/lispro: SC 15 dk başlangıç, ≤5 sa)');
      if (p.t >= 0.5 && p.t <= 8) a.push('Çözünür insan (Actrapid/Humulin S: SC 30 dk, İV dakikalar)');
      if (p.t >= 1 && p.t <= 24) a.push('Orta etkili (SC 1–2 sa başlangıç, 3–12 sa pik, 11–24 sa)');
      if (p.t >= 1.5 && p.t <= 36) a.push('Uzun etkili (36 saate kadar; kararlı durum birkaç gün)');
      return `Şematik SC profil · <b>${p.t}. saatte</b> etkin gruplar: ${a.join('; ')}. (Eğri yükseklikleri ve çözünür insülinin SC süresi şematiktir, kitapta yoktur; bireysel değişkenlik belirgindir.) [[K3 s. 391–392]]`;
    },
  });

  /* 4) Güvenli kullanım ve yan etkiler */
  const guvVeri = {
    'Konsantrasyon & Reçete': {
      renk: 'crit',
      k1: S => S.dar
        ? ['BK standardı: 100 ünite/mL', 'Kalibre 100 ünite/mL enjektör şart', 'Aşırı dirençte: 200 / 300 ünite/mL']
        : ['Standart konsantrasyon 100 ünite/mL → kalibre insülin enjektörü şart', 'Aşırı dirençli Tip 2’de 200 veya 300 ünite/mL (belirgin hata riski)'],
      k2: S => S.dar
        ? ['«ünite» tam yaz (ASLA U / IU değil)', 'Tam ticari ad · Kılavuz/protokol', 'Hipoglisemi tedavisi + İV substrat']
        : ['Tam ticari ad + «ünite» (asla U/IU değil) + hipoglisemi tedavisi', 'Protokol kullan · İV insülin (VRIII) sırasında sürekli substrat infüzyonu'],
      metin: 'İnsülin hataları sık ölüm nedenidir; kalibre 100 ünite/mL enjektör kullanılmalı, «ünite» tam yazılmalı (asla U/IU değil) ve İV insülinle eşzamanlı sürekli substrat verilmelidir. [[K3 s. 392]]',
    },
    'Hipoglisemi & İmmünojenisite': {
      renk: 'warn',
      k1: S => S.dar
        ? ['Yetersiz kalori/substrat →', 'HİPOGLİSEMİ riski', 'Tedavisiz bırakılırsa koma ve ölüm']
        : ['Yetersiz kalori/substrat alımında hipoglisemi gelişir', 'Tedavi edilmezse koma ve ölüme yol açar'],
      k2: S => S.dar
        ? ['Tüm insülinler immünojeniktir', 'Ancak immünolojik direnç nadirdir', 'Sığır 3 aa · Domuz 1 aa farklı']
        : ['Tüm insülinler immünojeniktir fakat immünolojik direnç nadirdir', 'Sığır 3, domuz 1 amino asit farklı (domuz daha az immünojenik)'],
      metin: 'Hipoglisemi tedavisiz koma ve ölüme gider; tüm insülinler immünojenik olsa da direnç nadirdir ve insana 1 amino asit farklı domuz insülini sığırdan (3 aa) daha az immünojeniktir. [[K3 s. 392]]',
    },
  };
  VIZ.a25a_guvenlik = (el) => SEKIL.sahne(el, {
    baslik: 'İnsülin güvenliği (100/200/300 ünite/mL, VRIII substratı) ve yan etkiler',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Başlık', Object.keys(guvVeri)),
    metin: p => guvVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = guvVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });
})();
