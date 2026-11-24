/* Koagülasyon fizyolojisi ve antitrombositler · K3, Türkçe çalışma çevirisi, s. 371–376. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  const hemVeri = {
    'Klasik Model': {
      renk: 'basic',
      k1: S => S.dar
        ? ['1) Trombosit: adezyon (vWF gerekli)', '   TXA₂ agregasyon ↔ endotel PGI₂', '2) FXII ve FVII yolları → FX']
        : ['1) Trombosit (vWF ile adezyon · TXA₂ ↔ endotel PGI₂) + 2) Kaskad', 'İntrinsik (kollajen → FXII) + Ekstrinsik (TF → FVII) → FX'],
      k2: S => S.dar
        ? ['Venöz: fibrin · Arteriyel: trombosit', '3) Sınırlama: AT-III (en güçlü) &', '   fibrinoliz (plazminojen → plazmin)']
        : ['Venöz trombüs (fibrin ağı) vs Arteriyel (trombosit ağırlıklı)', 'Sınırlayıcılar: AT-III (en güçlü) & fibrinoliz (plazminojen → plazmin)'],
      metin: 'Klasik model trombositler, koagülasyon kaskadı (FX’te birleşen intrinsik/ekstrinsik yollar) ve sınırlayıcı fibrinoliz/AT-III dengesine dayanır. [[K3 s. 371]]',
    },
    'Hücre Temelli Model': {
      renk: 'accent',
      k1: S => S.dar
        ? ['FXII eksikliği: kanama eğilimi artmaz', '1. Başlatma: TF taşıyan hücreler', '2. Amplifikasyon: sinyal ↑']
        : ['FXII eksikliğinde testler anormal; in vivo kanama artmaz', '1. TF ile başlatma → 2. Trombositlerde aktif kofaktörler'],
      k2: S => S.dar
        ? ['3. Yayılma: TF taşıyan hücreler', 've trombositler → bol trombin', 'Hemofilide yayılma evresi yetersiz']
        : ['3. Yayılma: TF taşıyan hücreler ve trombositler → bol trombin → fibrin', 'Hemofilide başlatma/amplifikasyon görece normal, yayılma yetersizdir'],
      metin: 'Hücre temelli model in vivo hemostazı başlatma, amplifikasyon ve yayılma evreleriyle açıklar; hemofilide yetersiz kalan evre yayılmadır. [[K3 s. 371–372]]',
    },
  };
  VIZ.a24a_hemostaz = (el) => SEKIL.sahne(el, {
    baslik: 'Hemostazın klasik ve hücre temelli modelleri',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Model', Object.keys(hemVeri)),
    metin: p => hemVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = hemVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const coxVeri = {
    'Aspirin (COX-1)': {
      renk: 'ok',
      k1: S => S.dar
        ? ['COX asetilasyonu (geri dönüşümsüz)', 'TXA₂ üretimi ↓', 'Günlük 75 mg ile etki sağlanabilir']
        : ['Trombosit COX’unu asetilasyonla geri dönüşümsüz inhibe → TXA₂ ↓', 'Bu antiagregan etki günde 75 mg ile sağlanabilir'],
      k2: S => S.dar
        ? ['Kararsız anjinada MI ilerlemesi ↓', 'Akut MI sonrası mortaliteyi ↓', 'GİA hastalarında inme riskini ↓']
        : ['Kararsız anjinada akut MI ilerlemesini ve MI sonrası mortaliteyi azaltır', 'Geçici iskemik atak (GİA) hastalarında inme riskini düşürür'],
      metin: 'Aspirin günlük 75 mg dozda trombosit siklooksijenazını geri dönüşümsüz asetilleyerek TXA₂ üretimini azaltır. [[K3 s. 372]]',
    },
    Dipiridamol: {
      renk: 'warn',
      k1: S => S.dar
        ? ['Adenozin alımı ↓ · PGI₂ etkisini ↑', 'Yüksek doz: PDE inh. → cAMP ↑, Ca²⁺ ↓', 'Adezyonu agregasyondan fazla ↓']
        : ['Adenozin alımı ↓, PGI₂ etkisi ↑ · Yüksek dozda PDE inh. → cAMP ↑, Ca²⁺ ↓', 'Aspirine kıyasla adezyonu agregasyondan fazla inhibe eder'],
      k2: S => S.dar
        ? ['Protez kapak + varfarin (sınırlı)', 'Aspirinle inme riski daha da azalabilir', 'Güçlü koroner vazodilatör (Tl-201)']
        : ['Protez kapaklarda varfarinle sınırlı · + Aspirin inmeyi daha ↓ olabilir', 'Güçlü koroner vazodilatör → miyokart görüntülemede talyum-201'],
      metin: 'Dipiridamol trombosit adezyonunu agregasyondan daha fazla inhibe eder ve güçlü bir koroner arter vazodilatörü olarak talyum-201 görüntülemede kullanılabilir. [[K3 s. 373]]',
    },
  };
  VIZ.a24a_cox_pde = (el) => SEKIL.sahne(el, {
    baslik: 'Aspirin ve dipiridamol: mekanizma ve etkiler',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('İlaç', Object.keys(coxVeri)),
    metin: p => coxVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = coxVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const adpVeri = {
    Klopidogrel: {
      renk: 'warn',
      k1: S => S.dar
        ? ['Ön ilaç (CYP3A4/3A5 & CYP2C19)', 'P2Y₁₂ geri dönüşümsüz (IIb/IIIa ↓)', '300 mg yükleme → 75 mg idame']
        : ['Ön ilaç (çoğu esterazla inaktif; CYP3A4/3A5/CYP2C19 ile aktif)', 'P2Y₁₂ geri dönüşümsüz disülfit bağı → GP IIb/IIIa aktivasyonunu önler'],
      k2: S => S.dar
        ? ['Başlangıç ≤2 sa · Etki 7 gün', 'CYP2C19 varyantları değişken etki', 'Omeprazol (CYP2C19 ↓) dönüşümü ↓']
        : ['300 mg oral → 75 mg · Başlangıç ≤2 sa · Etki 7 gün', 'CYP2C19 varyantları: aktif metabolit ↑/↓ · Omeprazol: ↓'],
      metin: 'Klopidogrelin aktif metaboliti P2Y₁₂ reseptörüne geri dönüşümsüz bağlandığından etkisi 7 gün sürer (son doz–nöroaksiyel blok arası süre); omeprazol CYP2C19’u inhibe edip dönüşümünü azaltır. [[K3 s. 373–374]]',
    },
    Prasugrel: {
      renk: 'crit',
      k1: S => S.dar
        ? ['Ön ilaç · AKS-PCI (+ aspirin)', '12 ay süreyle sürdürülebilir', 'Klopidogrelden hızlı ve etkili']
        : ['Ön ilaç · Yalnızca AKS’de PCI için ruhsatlı (aspirinle 12 ay sürdürülebilir)', 'Klopidogrele göre daha hızlı başlar ve daha etkilidir'],
      k2: S => S.dar
        ? ['Daha ciddi kanamayla ilişkili', 'Polimorfizmin etkisi daha az görünür', 'CYP450 inhibitöründen etkilenmez']
        : ['Daha ciddi kanama epizotlarıyla ilişkilidir', 'Polimorfizmden daha az etkileniyor görünür (inh. etkilemez)'],
      metin: 'Prasugrel klopidogrelden daha hızlı ve etkilidir ancak daha ciddi kanama epizotlarıyla ilişkilidir; CYP450 inhibitörlerinden etkilenmez. [[K3 s. 374]]',
    },
    Tikagrelor: {
      renk: 'basic',
      k1: S => S.dar
        ? ['AKS + aspirin · Biyoyararlanım %40', 'CYP3A4 aktif metabolit → safra', 'Allosterik ADP (P2Y₁₂) antagonisti']
        : ['AKS’de + aspirin · Biyoyararlanım %40 · CYP3A4 aktif met. → safra', 'Farklı bölgeye bağlanan allosterik ADP (P2Y₁₂) antagonisti'],
      k2: S => S.dar
        ? ['CYP3A4 substratları ve inhibitörleri', 'tikagrelor plazma düzeyini artırabilir', 'Farklı bağlanma bölgesi (allosterik)']
        : ['CYP3A4 ile metabolize olan / inhibe eden ilaçlar düzeyi artırabilir'],
      metin: 'Tikagrelor P2Y₁₂’ye farklı bölgeden bağlanan allosterik bir ADP antagonistidir; CYP3A4 ile metabolize olur ve başlıca safrayla atılır. [[K3 s. 374]]',
    },
  };
  VIZ.a24a_adp = (el) => SEKIL.sahne(el, {
    baslik: 'P2Y₁₂ (ADP) inhibitörleri: klopidogrel, prasugrel ve tikagrelor',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('İlaç', Object.keys(adpVeri)),
    metin: p => adpVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = adpVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const gpVeri = {
    'GP IIb/IIIa Antagonistleri': {
      renk: 'accent',
      k1: S => S.dar
        ? ['Son ortak yol (agregasyon) blokajı', 'Adezyon/sekresyon/trombin bloksuz', 'UFH + APTT/ACT · Trombositopeni']
        : ['GP IIb/IIIa blokajı (agregasyon son ortak yolu; adezyon/trombin bloksuz)', 'AKS’de UFH + APTT/ACT izlemiyle kısa İV · Nadir ciddi trombositopeni'],
      k2: S => S.dar
        ? ['Absiksimab: mAb, t½ 20 dk', 'Eptifibatid: t½ 200 dk, %50 renal', 'Tirofiban: %65 renal, %25 fekal']
        : ['Absiksimab (t½ 20 dk; ≤15 gün bağlı) · Eptifibatid (200 dk)', 'Eptifibatid %50 renal · Tirofiban %65 renal, %25 fekal'],
      metin: 'GP IIb/IIIa antagonistleri agregasyonun son ortak yolunu bloke eder ancak trombosit adezyonunu veya trombin aktivasyonunu durdurmazlar. [[K3 s. 374]]',
    },
    'Dekstran 70 & Epoprostenol': {
      renk: 'ok',
      k1: S => S.dar
        ? ['Dekstran 70: glukoz zincirleri', 'Olası etki: yapışkanlık ↓, vWF inh.', 'Rulo → çapraz eşlemeyi bozabilir']
        : ['Dekstran 70: eritrosit agregasyonu ↓; vWF inhibisyonu olası', 'Sıvı yükü/anafilaksi · Rulo ile çapraz karşılaştırma bozulabilir'],
      k2: S => S.dar
        ? ['Epoprostenol (PGI₂): hemofiltrasyon', 'cAMP ↑ → Ca²⁺ ↓ · 2–12 ng/kg/dk', 'Hipotansiyon, taşikardi, kızarma']
        : ['Epoprostenol: hemofiltrasyon, cAMP ↑/Ca²⁺ ↓, 2–12 ng/kg/dk', 'Vazodilatör yan etkiler: hipotansiyon, taşikardi, kızarma, baş ağrısı'],
      metin: 'Dekstran 70 rulo oluşumuyla çapraz karşılaştırma testini bozabilir; epoprostenol (PGI₂) hemofiltrasyonda 2–12 ng/kg/dk infüze edilir ve vazodilatasyon yapar. [[K3 s. 375]]',
    },
  };
  VIZ.a24a_gp = (el) => SEKIL.sahne(el, {
    baslik: 'GP IIb/IIIa antagonistleri, dekstran 70 ve epoprostenol',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Grup', Object.keys(gpVeri)),
    metin: p => gpVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = gpVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });
})();
