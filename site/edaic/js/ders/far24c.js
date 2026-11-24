/* Doğrudan oral antikoagülanlar ve etkilerinin geri döndürülmesi · K3, Türkçe çalışma çevirisi, s. 380–385. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  const dabVeri = {
    'Etki & Doz / Kinetik': {
      renk: 'basic',
      k1: S => S.dar
        ? ['Kompetitif direkt trombin inh.', 'Artroplasti VTE: 220 mg 1×/gün', 'Atriyal fibrilasyon: 150 mg 2×/gün']
        : ['Kompetitif direkt trombin (son ortak yol) inhibitörü', 'VTE profilaksisi (220 mg 1×/gün) · AF (150 mg 2×/gün)'],
      k2: S => S.dar
        ? ['Dabigatran eteksilat (esterazlar)', '<%10 glukuronidasyon · Renal atılım', 'eGFR < 30 eşiğinde KONTRENDİKE']
        : ['Ön ilaç dabigatran eteksilat → aktif dabigatran (<%10 glukuronid)', 'Başlıca renal eliminasyon · eGFR < 30’da kontrendikedir'],
      metin: 'Dabigatran <%10 oranında karaciğerde glukuronidasyonla metabolize edildiğinden başlıca böbrek yoluyla atılır ve eGFR < 30’da kontrendikedir. [[K3 s. 380–381]]',
    },
    'Etkileşim & Yan Etkiler': {
      renk: 'warn',
      k1: S => S.dar
        ? ['Kaçın: ketokonazol, rifampisin,', 'fenitoin, karb. · Amiod. doz ↓', 'Önceki 2 sa verapamilden kaçın']
        : ['Kaçın: ketokonazol, rifampisin, fenitoin, karbamazepin', 'Amiodaron doz ↓ · Önceki 2 saat içinde verapamilden kaçın'],
      k2: S => S.dar
        ? ['PPİ’ler emilimi %25’e kadar ↓', 'İntrakraniyal kanama varfarinden ↓', 'Gİ rahatsızlık ≤%35 görülebilir']
        : ['PPİ emilimi ≤%25 azaltabilir · İKK varfarine göre daha seyrek', 'Gastrointestinal rahatsızlık ≤%35 oranında görülebilir'],
      metin: 'Dabigatran birçok ilaç etkileşimi taşır, PPİ’lerle emilimi %25’e kadar azalır ve %35’e varan oranda Gİ rahatsızlığa yol açabilir. [[K3 s. 381]]',
    },
  };
  VIZ.a24c_dabigatran = (el) => SEKIL.sahne(el, {
    baslik: 'Dabigatran: dozlar, renal bağımlılık ve etkileşimler',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Başlık', Object.keys(dabVeri)),
    metin: p => dabVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = dabVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const xaVeri = {
    Rivaroksaban: {
      renk: 'ok',
      k1: S => S.dar
        ? ['VTE 10 mg · Ted. 21 g 15→20 mg', 'AF: 20 mg 1×/g · Biyoyar. %80–100', '2–3 saatte etki · %70 CYP3A4 / 2J2']
        : ['VTE prof. 10 mg · VTE ted. 21 g 15 2×→20 1× · AF 20 mg', 'Oral %80–100 · Etki 2–3 sa · %70 CYP3A4/2J2 (kitap eGFR > 30)'],
      k2: S => S.dar
        ? ['Ketokonazol kaçın · Eritro./klar.', 've CYP3A4 ind. ile dikkatli kullan', 'LMWH’ye göre VTE ↓ ama kanama ↑']
        : ['Ketokonazolle kaçın · Eritro./klaritro. ↑ · İndükleyici ↓', 'LMWH’ye göre: daha az VTE fakat daha fazla kanama'],
      metin: 'Rivaroksaban %80–100 oral biyoyararlanıma ve %70 hepatik metabolizmaya sahiptir; ketokonazolle birlikte kullanımından kaçınılmalıdır. [[K3 s. 381]]',
    },
    Apiksaban: {
      renk: 'basic',
      k1: S => S.dar
        ? ['VTE prof. 2,5 mg 2× · AF 5 mg 2×', 'Oral biyoyararlanım yalnızca %50', 'CYP3A4 + daha fazla biliyer atılım']
        : ['VTE profilaksisi 2,5 mg 2×/gün · AF 5 mg 2×/gün', 'Oral biyoyararlanım %50 · CYP3A4 & biliyer atılım (renal sınırlı)'],
      k2: S => S.dar
        ? ['Kitap: eGFR > 30’da doz ayarı yok', 'CYP3A4 ind. düzeyi azaltabilir', 'LMWH’ye göre kanama ↓, VTE eşit']
        : ['CYP3A4 indükleyicileri düzeyi azaltabilir · Kitap eGFR > 30', 'LMWH’ye kıyasla: daha az kanama ve eşdeğer VTE oranları'],
      metin: 'Apiksaban %50 biyoyararlanım ve ağırlıklı hepatik/biliyer klirens gösterir; LMWH ile karşılaştırıldığında daha az kanama ve eşdeğer VTE oranları bildirilir. [[K3 s. 382]]',
    },
    'Edoksaban & Karş.': {
      renk: 'warn',
      k1: S => S.dar
        ? ['Edoksaban 1×/gün (besin etkisiz)', 'P-gp inh. (ketok., erit., verap.,', 'siklosporin) düzeyi belirgin ↑']
        : ['Edoksaban: günde tek doz, besin–ilaç etkileşimi göstermez', 'P-gp inh. (ketokonazol, eritromisin, verapamil, siklosporin) ↑'],
      k2: S => S.dar
        ? ['P-gp indükleyici rifampin düzeyi ↓', 'Dabigatran: VTE/kanama eşdeğer', 'Rivar. VTE↓/kan↑ · Apiks. kanama↓']
        : ['Rifampin (P-gp ind.) edoksabanı düşürür · LMWH karşılaştırması:', 'Dabigatran eşdeğer · Rivaroksaban kanama ↑ · Apiksaban kanama ↓'],
      metin: 'Edoksaban P-gp taşıyıcısı inhibitörleri ve rifampinle belirgin etkileşir; dabigatran, rivaroksaban ve apiksaban LMWH karşısında farklı VTE/kanama dengesi sunar. [[K3 s. 382]]',
    },
  };
  VIZ.a24c_xa = (el) => SEKIL.sahne(el, {
    baslik: 'Direkt Faktör Xa inhibitörleri: rivaroksaban, apiksaban ve edoksaban',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('İlaç', Object.keys(xaVeri)),
    metin: p => xaVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = xaVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const izlVeri = {
    'İzlem & Doz Aşımı': {
      renk: 'warn',
      k1: S => S.dar
        ? ['Kromojenik anti-Xa · Dilüe TT', 'Ekarin temelli pıhtılaşma testleri', 'Hedef/standardizasyon yok (sınırlı)']
        : ['Kromojenik anti-Xa, dilüe trombin zamanı ve ekarin testleri var', 'Doğrulanmış terapötik hedef ve standardizasyon eksikliğiyle sınırlı'],
      k2: S => S.dar
        ? ['Kitap: normal rutin test büyük', 'doz aşımını dışlayabilir (Atlas notu)', 'Anormalse dereceyi ÖLÇEMEZ']
        : ['Kitap normal rutin testin önemli doz aşımını dışlayacağını yazar', 'Ancak test bozuksa koagülopati derecesini ölçemez (bkz. not)'],
      metin: 'Özel NOAC testleri standardizasyon eksikliğiyle sınırlıdır; kitaba göre normal rutin testler önemli doz aşımını dışlayabilir, bozulmuşlarsa koagülopatinin derecesini ölçemez (sınır için Atlas notu). [[K3 s. 382]]',
    },
    'Nöroaksiyel Anestezi': {
      renk: 'accent',
      k1: S => S.dar
        ? ['Varfarinde INR güvenlidir', 'NOAC’lar için güvenilir test YOK', 't½/böbrek duyarlılığı değişir']
        : ['Varfarinde INR güvenliği doğrularken NOAC’larda güvenilir test yok', 't½ ve böbrek fonksiyonu duyarlılığı ajanlar arasında farklıdır'],
      k2: S => S.dar
        ? ['Kesme süresi doz/endikasyona', 've VTE/AF profiline göre değişir', 'Güncel uluslararası kılavuzlara uy']
        : ['Kesme süresi VTE profilaksi vs AF/VTE tedavi dozuna göre değişir', 'En güncel uluslararası kılavuzlara başvurulması önerilir'],
      metin: 'Nöroaksiyel blok öncesinde NOAC’lar için güvenilir rutin test olmadığından doz, endikasyon ve böbrek fonksiyonu için güncel kılavuzlar izlenmelidir. [[K3 s. 383–384]]',
    },
  };
  VIZ.a24c_izlem = (el) => SEKIL.sahne(el, {
    baslik: 'NOAC izlemi, doz aşımı değerlendirmesi ve nöroaksiyel blok',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Odak', Object.keys(izlVeri)),
    metin: p => izlVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = izlVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const antVeri = {
    İdarusizumab: {
      renk: 'ok',
      k1: S => S.dar
        ? ['Dabigatran mAb fragmanı', 'Geri dönüşümsüz bağlar · 30 dk / 24 sa', 'Kitap 2,5 g (+tekrar) · Notta 5 g']
        : ['Dabigatran/metabolitine özgül geri dönüşümsüz mAb fragmanı', '30 dk içinde etki, 24 saat sürer · Kitap 2,5 g (+ tekrar; notta 5 g)'],
      k2: S => S.dar
        ? ['Böbrekle atılır (BY’de maruziyet ↑)', 'Buzdolabında saklanır', 'Işığa maruz kalınca 6 sa kullan']
        : ['Renal atılım (BY’de ikisi de yükselir) · Buzdolabında saklanır', 'Hazır solüsyon; ışığa maruz kalan ilaç 6 saat içinde kullanılmalı'],
      metin: 'İdarusizumab dabigatrana özgül mAb fragmanıdır; 30 dakikada etkir, 24 saat sürer ve ışığa maruz kaldıktan sonra 6 saat içinde kullanılmalıdır. [[K3 s. 383]]',
    },
    'Andeksanet Alfa': {
      renk: 'crit',
      k1: S => S.dar
        ? ['Modifiye insan rFXa (enzimsiz)', 'Direkt Xa & bağlar; fondap. tam,', 'LMWH’yi kısmen geri çevirir']
        : ['Gla’sız rFXa: direkt Xa bağlar · fondaparinuks tam, LMWH kısmen', 't½ 1 sa → 10 dk 400 mg + 120 dk 480 mg (2× çıkabilir)'],
      k2: S => S.dar
        ? ['t½ 1 sa → 400 mg + 480 mg inf. (2×)', 'DVT %6 · İnme %5 · Akut MI %3', 'Pnömoni %5 (sağlıklıda yok)']
        : ['Çalışmalarda DVT %6, inme %5, MI %3, pnömoni %5 (sağlıklıda yok)', 'Buzdolabında saklanır · Son Xa dozuna göre doz 2× artırılabilir'],
      metin: 'Andeksanet alfa direkt faktör Xa inhibitörlerini bağlar, fondaparinuksu tamamen, LMWH’yi kısmen geri çevirir; kısa yarılanma ömrü (1 saat) nedeniyle bolus + infüzyon verilir ve protrombotik olaylar bildirilmiştir. [[K3 s. 383]]',
    },
    Siraparantag: {
      renk: 'basic',
      k1: S => S.dar
        ? ['Küçük, katyonik, sentetik molekül', 'Potansiyel «evrensel antidot» adayı', 'Halen klinik araştırma evresinde']
        : ['Potansiyel «evrensel antidot» olarak araştırılan küçük katyonik molekül', 'Geliştirilmesinde halen klinik araştırma evresindedir'],
      k2: S => S.dar
        ? ['Bağladığı gösterilen ajanlar:', 'UFH, LMWH, direkt IIa ve Xa inh.', 'İnsan kinetiği/etkinliği belirsiz']
        : ['UFH, LMWH, direkt IIa & Xa inhibitörlerini bağlamıştır', 'İnsan kinetiği, PD ve etkinliği hakkında pek çok veri henüz bilinmez'],
      metin: 'Siraparantag UFH, LMWH, direkt trombin ve Xa inhibitörlerini bağlayabilen katyonik bir molekül olarak araştırılmaktadır. [[K3 s. 383]]',
    },
  };
  VIZ.a24c_antidot = (el) => SEKIL.sahne(el, {
    baslik: 'NOAC antidotları: idarusizumab, andeksanet alfa ve siraparantag',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Antidot', Object.keys(antVeri)),
    metin: p => antVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = antVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const fibVeri = {
    Streptokinaz: {
      renk: 'crit',
      k1: S => S.dar
        ? ['C grubu β-hemolitik streptokok', 'Plazminojen kompleksi → plazmin', 'MI, periferik arter, PE ve DVT']
        : ['C grubu β-hemolitik streptokok enzimi · İV yükleme + infüzyon', 'Plazminojenle kompleksleşip plazmin oluşturarak pıhtıyı çözer'],
      k2: S => S.dar
        ? ['Kontrendike: aktif kanama, inme, HT', 'Çok antijenik → 5 gün–12 ay arası', 'alternatif ara · Reperfüzyon aritmisi']
        : ['Kontrendike: aktif iç kanama, yakın inme, ağır HT · Reperfüzyon aritmisi', 'Çok antijenik → önceki dozdan 5 gün–12 ay arası alternatif aranmalı'],
      metin: 'Streptokinaz çok antijeniktir; önceki streptokinaz maruziyetinden 5 gün ile 12 ay arasında yüksek antikor titreleri beklendiğinden alternatif ajan seçilmelidir. [[K3 s. 384]]',
    },
    'Alteplaz & Ürokinaz': {
      renk: 'ok',
      k1: S => S.dar
        ? ['Alteplaz (rt-PA): fibrine bağlı', 'olunca aktive → sistemik lizis ↓', 'Ürokinaz: böbrek hücre kültürü']
        : ['Alteplaz (rt-PA): yalnız fibrine bağlanınca aktif → sistemik lizis az', 'Ürokinaz: böbrek hücre kültürü / rekombinant proürokinaz'],
      k2: S => S.dar
        ? ['Ürokinaz antijenik DEĞİL', 'AV şant pıhtılarının lizisi ve', 'hifemada (ön kamara kanaması)']
        : ['Ürokinaz antijenik değildir; AV şant pıhtısı lizisinde kullanılır', 'Ön kamara kanamasında (dirençli trombüslü hifema) da yer alır'],
      metin: 'Alteplaz fibrine seçiciliğiyle streptokinazdan daha az sistemik fibrinoliz yaparken, ürokinaz antijenik değildir ve AV şant pıhtıları ile hifemada kullanılır. [[K3 s. 384]]',
    },
  };
  VIZ.a24c_fibrinolitik = (el) => SEKIL.sahne(el, {
    baslik: 'Fibrinolitik ajanlar: streptokinaz, alteplaz ve ürokinaz',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Ajan', Object.keys(fibVeri)),
    metin: p => fibVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = fibVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });
})();
