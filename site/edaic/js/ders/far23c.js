/* Diğer antibakteriyel ilaçlar · K3, Türkçe çalışma çevirisi, s. 347–359. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  const glikoVeri = {
    Vankomisin: {
      renk: 'basic',
      k1: S => S.dar
        ? ['Doğal 1. kuşak glikopeptit', 'Aerob/anaerob G+ · MRSA (VRE suşları ↑)', 'Sağlıklı GİS emilmez → oral kolit']
        : ['1. kuşak glikozillenmiş heptapeptit · Aerob/anaerob G+, MRSA', 'Sağlıklı bağırsaktan emilmez → ciddi enf. İV, kolit oral', 'Zaman-bağımlı · Penisilinlerle aktif bağlanma rekabeti yok'],
      k2: S => S.dar
        ? ['İdrarla değişmeden · Çukur 10–20 mg/L', 'Kırmızı adam: hızlı inf. + hist.', 'Renal toksisite ve ototoksisite riski']
        : ['Minimal PAE · İdrarla değişmeden · Çukur 10–20 mg/L tutulur', 'Kırmızı adam sendromu (histamin, hızlı inf.) · Renal/ototoksik'],
      metin: 'Vankomisin sağlıklı bağırsaktan emilmediğinden klostridiyal kolitte oral, sistemik Gram-pozitif enfeksiyonlarda İV verilir ve çukur düzeyi 10–20 mg/L arasında tutulur. [[K3 s. 347–348]]',
    },
    'Teikoplanin & 2. Kuşak': {
      renk: 'warn',
      k1: S => S.dar
        ? ['Teikoplanin: uzun t½, yüksek potens', '2 gün 2× yükleme → 1×/gün idame', '2. kuşak: dalbavansin & telavansin']
        : ['Teikoplanin daha uzun süre/yüksek potens · 2 gün 2× → 1×/gün', 'Yarı sentetik 2. kuşak glikopeptitler: dalbavansin, telavansin'],
      k2: S => S.dar
        ? ['Vankomisine göre daha az renal toksik', 'Vanko. kırmızı adamında kullanılabilir', 'BK denetimi: 17× anafilaksi']
        : ['Vankomisine göre az yan etki/renal toksisite (kırmızı adam bildirildi)', 'BK cerrahi profilaksi denetiminde 17 kat anafilaksi olasılığı'],
      metin: 'Teikoplaninin vankomisine göre yan etkisi ve renal toksisitesi daha azdır; ancak BK ulusal denetiminde anafilaksi olasılığı alternatiflerin 17 katı bulunmuştur. [[K3 s. 347–348]]',
    },
  };
  VIZ.a23c_gliko = (el) => SEKIL.sahne(el, {
    baslik: 'Glikopeptit antibiyotikler: vankomisin ve teikoplanin',
    vb: [640, 224], vbDar: [360, 284],
    secenek: secim('Grup', Object.keys(glikoVeri)),
    metin: p => glikoVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = glikoVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 120 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 146 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const aminoVeri = {
    'Etki & Uzatılmış Aralık': {
      renk: 'ok',
      k1: S => S.dar
        ? ['30S geri dönüşümsüz → yanlış protein', '→ Membran hasarı & giriş artışı', 'Ca²⁺/Mg²⁺/asidoz/hipoksi girişi ↓']
        : ['30S geri dönüşümsüz → yanlış translasyonlu protein membranı bozar', 'Lipitte çözünmez (BOS zayıf) · Ca²⁺/Mg²⁺/asidoz/düşük PO₂ girişi ↓'],
      k2: S => S.dar
        ? ['Uzatılmış aralık (yüksek/seyrek):', '1) Konsantrasyon-bağımlı öldürme', '2) Hızlı eliminasyon · 3) Uzun PAE']
        : ['İdrarla değişmeden filtrasyon (İYE ideal) · Uzatılmış aralıklı doz:', 'Konsantrasyon-bağımlı öldürme + hızlı eliminasyon + uzun PAE'],
      metin: 'Aminoglikozidler konsantrasyon-bağımlı öldürme, hızlı eliminasyon ve uzun PAE nedeniyle uzatılmış aralıklı dozlama için uygundur ve böbrek yetmezliğinde doz azaltılır. [[K3 s. 349]]',
    },
    'Toksisite & Önlemler': {
      renk: 'crit',
      k1: S => S.dar
        ? ['Nefrotoksisite: ≤%10 proks. tübül', 'Neomisin > gentamisin > amikasin', 'K⁺/Mg²⁺ düzelt · Hacmi koru']
        : ['≤%10 proksimal tübülde birikir (Neomisin > gentamisin > amikasin)', 'K⁺/Mg²⁺ düzelt, hacmi koru, tek dozda bile geçici kreatinin ↑ olabilir'],
      k2: S => S.dar
        ? ['Ototoksisite (BY/furosemid ↑)', 'ACh salınımı/duyarlılığı ↓ (MG!)', 'Nondepolarizan blokaj güçlenir']
        : ['Ototoksisite (koklear/vestibüler; BY ve furosemid ↑ · genetik bileşen)', 'Prejunksiyonel ACh ↓, MG’de kaçın · Nondepolarizan blokaj artar'],
      metin: 'Doza bağımlı nefrotoksisite ve ototoksisite başlıca yan etkilerdir; ayrıca prejunksiyonel ACh salınımını azaltıp nondepolarizan kas gevşeticileri güçlendirirler. [[K3 s. 350]]',
    },
  };
  VIZ.a23c_amino = (el) => SEKIL.sahne(el, {
    baslik: 'Aminoglikozidler: 30S etki, uzatılmış aralık ve toksisiteler',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Görünüm', Object.keys(aminoVeri)),
    metin: p => aminoVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = aminoVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const protVeri = {
    'Kloramfenikol & Tetrasiklin': {
      renk: 'warn',
      k1: S => S.dar
        ? ['Kloramfenikol (50S): bakteriyostatik', 'Aplastik anemi / agranülositoz', 'Sık TKS · Topikal risk çok düşük']
        : ['Kloramfenikol (50S): peptit bağı engeli · Topikal/İV (menenjit)', 'Aplastik anemi / agranülositoz riski → sık TKS, tekrar dozdan kaçın'],
      k2: S => S.dar
        ? ['30S inh. · Doksisiklin oral %95', 'Süt/Ca²⁺ şelasyonu · Pen. ant.', 'Gebelik & çocukta diş renklenmesi']
        : ['Tetrasiklinler (30S): doksisiklin oral %95 · süt/Ca²⁺ şelasyonu', 'MG ↑, SLE ↑ · Çocuk diş renklenmesi · Gebelik 2.–3. trim. kontrendike'],
      metin: 'Kloramfenikol nadir fakat ciddi aplastik anemi nedeniyle TKS izlemi gerektirir; tetrasiklinler Ca²⁺ şelasyonuyla süt/antasitle verilmemeli ve gebelik/çocukta diş-kemik etkileri gözetilmelidir. [[K3 s. 350–352]]',
    },
    Makrolidler: {
      renk: 'basic',
      k1: S => S.dar
        ? ['Eritro., klaritromisin, azitro.', '50S · Zayıf BOS, iyi balgam/akciğer', 'Eritro/klaritro: CYP3A4 inh.']
        : ['50S (bakterisidal/statik) · Penisilin alerjisi, Mycoplasma, Legionella', 'Zayıf BOS, iyi akciğer/lökosit · Eritro/klaritro CYP3A4 & P-gp inh.'],
      k2: S => S.dar
        ? ['Tümü QT uzaması (torsades uyarısı)', 'Prokinetik İV Gİ yakınma sık', 'Porfiride eritromisinden kaçın']
        : ['Tümü QT uzaması ile ilişkili (klaritro/azitro ölümcül torsades)', 'İV prokinetik Gİ yan etki sık · Porfiride eritromisinden kaçınılır'],
      metin: 'Makrolidler 50S alt birimine bağlanır; eritromisin ve klaritromisin CYP3A4/P-gp’yi güçlü inhibe eder, tüm sınıf QT uzamasıyla ilişkilendirilmiştir. [[K3 s. 352–353]]',
    },
    'Oksazolidinon & Klindamisin': {
      renk: 'accent',
      k1: S => S.dar
        ? ['Linezolid (50S): MRSA & VRE', 'G− yok · Optik nöropati / TKS', 'Haftalık TKS & görme kontrolü']
        : ['Linezolid/tedizolid (50S): G+ (MRSA, VRE), G− etkisiz', 'Optik nöropati & hematopoietik yan etki → haftalık TKS/görme izlemi'],
      k2: S => S.dar
        ? ['Klindamisin (50S): kemik/safra ↑', 'Alfa toksin ↓ (stafilokok TŞS)', 'Yüksek C. difficile koliti riski']
        : ['Klindamisin (50S): anaerop/MRSA/kemik, makrolidle çapraz direnç', 'Alfa toksin inh. (stafilokok TŞS) · Yüksek ishal / C. difficile riski'],
      metin: 'Linezolid haftalık TKS ve görme takibi gerektirirken, klindamisin kemik/safraya iyi geçer, alfa toksini baskılar ancak yüksek C. difficile koliti riski taşır. [[K3 s. 353–354]]',
    },
  };
  VIZ.a23c_protein = (el) => SEKIL.sahne(el, {
    baslik: 'Protein sentezi inhibitörleri (30S / 50S)',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Sınıf', Object.keys(protVeri)),
    metin: p => protVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = protVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const memVeri = {
    'Polimiksin B vs Kolistin': {
      renk: 'crit',
      k1: S => S.dar
        ? ['Polimiksin B & kolistin (G−)', 'LPS/fosfolipit bağlar (PAE yok)', 'Konsantrasyon-bağımlı · Sık doz']
        : ['Polimiksin B & kolistin: Pseudomonas/Acinetobacter · LPS bağlar', 'Konsantrasyon-bağımlı ama PAE yok (sık doz) · İV/intratekal/inhalasyon'],
      k2: S => S.dar
        ? ['Kolistin idrarla (İYE / BY doz ↓)', 'Polimiksin B idrarsız (ayar yok)', 'MG’de kaçın · ATN/nefrotoksisite']
        : ['Kolistin idrarla (İYE/BY doz ayarı) vs Polimiksin B idrarsız (ayar yok)', 'Miyastenia graviste kaçınılmalı · Yüksek nefrotoksisite / ATN'],
      metin: 'Polimiksinlerde PAE bulunmadığından sık doz gerekir; kolistin idrarla atılıp böbrek yetmezliğinde doz ayarı isterken polimiksin B idrarla atılmaz. [[K3 s. 354–355]]',
    },
    'Daptomisin (Lipodepsipeptit)': {
      renk: 'basic',
      k1: S => S.dar
        ? ['Siklik lipodepsipeptit (dirençli G+)', 'Komplike deri & yumuşak doku enf.', 'Membranı hızla depolarize eder']
        : ['Siklik lipodepsipeptit: yüksek dirençli Gram-pozitif deri/yumuşak doku', 'Hücre membranına bağlanıp hızlı depolarizasyon yapar'],
      k2: S => S.dar
        ? ['Konsantrasyon-bağımlı bakterisidal', 'Bildirilen ciddi yan etkiler:', 'Eozinofilik pnömoni & rabdomiyoliz']
        : ['Konsantrasyon-bağımlı bakterisidal aktivite', 'Yan etkiler arasında eozinofilik pnömoni ve rabdomiyoliz bildirilmiştir'],
      metin: 'Daptomisin dirençli Gram-pozitif komplike deri/yumuşak doku enfeksiyonlarında hızlı membran depolarizasyonuyla bakterisidal etki gösterir. [[K3 s. 355]]',
    },
  };
  VIZ.a23c_membran = (el) => SEKIL.sahne(el, {
    baslik: 'Sitoplazmik membranı bozan ajanlar: polimiksinler ve daptomisin',
    vb: [640, 224], vbDar: [360, 284],
    secenek: secim('Grup', Object.keys(memVeri)),
    metin: p => memVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = memVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 120 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 146 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const nukVeri = {
    Florokinolonlar: {
      renk: 'warn',
      k1: S => S.dar
        ? ['Topoizomeraz inh. (bakterisidal)', 'Sipro.: şarbon & veba 1. basamak', 'Mükemmel BOS/doku geçişi']
        : ['C-6 florlu bisiklik · Topoizomeraz inh. (bakterisidal) · Mükemmel BOS', 'Siprofloksasin (şarbon/veba 1. basamak) · Moksifloksasin (pnömokok ↑)'],
      k2: S => S.dar
        ? ['C. difficile koliti · QT uzaması', 'Nöbet (NSAİİ!) · Perif. nöropati', 'Tendinopati/rüptür · MG ↑']
        : ['Direnç (gonore, Pseudomonas) · C. difficile koliti · QT uzaması', 'Epilepside nöbet (NSAİİ ile) · Periferik nöropati · MG ↑ · Tendinopati'],
      metin: 'Florokinolonlar mükemmel BOS/doku geçişine sahip bakterisidal ajanlardır ancak C. difficile koliti, QT uzaması, nöbet, periferik nöropati, MG alevlenmesi ve tendinopati riski taşırlar. [[K3 s. 355–356]]',
    },
    'Ko-trimoksazol (Sülfonamid)': {
      renk: 'crit',
      k1: S => S.dar
        ? ['Sülfametoksazol + trimetoprim', 'PABA + DHFR sinerjistik blokaj', 'Hastane pnömonisi & P. jirovecii']
        : ['Sülfametoksazol (PABA kompetitif inh.) + trimetoprim (DHFR inh.)', 'Sinerjistik folik asit blokajı · Hastane pnömonisi ve P. jirovecii'],
      k2: S => S.dar
        ? ['Akut porfiride KONTRENDİKE', 'Sık: Gİ bozukluk & döküntü', 'Yaşamı tehdit: agranülositoz & SJS']
        : ['Akut porfiride kontrendike · Gİ rahatsızlık ve döküntü en sık', 'Yaşamı tehdit eden: agranülositoz ve Stevens–Johnson sendromu'],
      metin: 'Ko-trimoksazol PABA ve DHFR basamaklarını ardışık bloke eder; P. jirovecii enfeksiyonlarında kullanılır ve akut porfiride kontrendikedir. [[K3 s. 356–357]]',
    },
  };
  VIZ.a23c_nukleik = (el) => SEKIL.sahne(el, {
    baslik: 'Nükleik asit sentezini bozan ilaçlar: florokinolonlar ve ko-trimoksazol',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Sınıf', Object.keys(nukVeri)),
    metin: p => nukVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = nukVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const digerVeri = {
    'Fusidik Asit': {
      renk: 'basic',
      k1: S => S.dar
        ? ['S. aureus, MRSA, S. epidermidis', 'Uzama faktörü + GTP ile kompleks', 'Translokasyonu/proteini keser']
        : ['S. aureus, MRSA, S. epidermidis’e bakterisidal (streptokok dirençli)', 'Ribozoma değil uzama faktörü + GTP kompleksine bağlanır'],
      k2: S => S.dar
        ? ['Kemik & apse iyi (BOS’ta yok)', 'Safrada yoğunlaşır · BY az etkiler', 'Genelde iyi tolere (döküntü/Gİ)']
        : ['Kemik/eklem sepsisi & beyin apsesine iyi geçer (BOS’ta aktif değil)', 'Safrada yoğunlaşır, BY az etkiler · Nadiren Gİ/döküntü'],
      metin: 'Fusidik asit kemik ve serebral apselere iyi geçmesine karşın BOS’ta aktif değildir; safrada yoğunlaşır ve böbrek yetmezliğinden az etkilenir. [[K3 s. 357]]',
    },
    Rifamisinler: {
      renk: 'warn',
      k1: S => S.dar
        ? ['RNA polimeraz β-alt birimi inh.', 'TB temeli (M. avium dirençli)', 'Direnç kolay → tek ajan kullanılmaz']
        : ['Rifampisin: RNA polimeraz β-alt birimi inh. · TB’nin temel unsuru', 'Rifabutin (TB dışı) · Rifaksimin (hepatik ensef.) · Siprofloksasin ant.'],
      k2: S => S.dar
        ? ['BOS/apse/kalp kapağı · Kırmızı idrar', 'Güçlü CYP450 ind. (varfarin, OKS ↓)', 'BY plazma düzeyini etkilemez']
        : ['Lipofilik (BOS/apse/kapak) · Safra doyunca idrarla kırmızı atılım', 'Güçlü CYP450 indükleyici (antikonvülzan, OKS, varfarin ↓) · BY etkilemez'],
      metin: 'Rifampisin tek ajan verilmemelidir, siprofloksasin gibi bazı ilaçları antagonize eder ve güçlü CYP450 indüksiyonuyla pek çok ilacın düzeyini düşürür. [[K3 s. 357–358]]',
    },
    Metronidazol: {
      renk: 'ok',
      k1: S => S.dar
        ? ['Zorunlu anaeroplar & protozoon', 'Pirüvat–ferredoksin oksidoredüktaz', 'Serbest radikaller → DNA kırığı']
        : ['Zorunlu anaeroplar + protozoon · Anaerobik streptokok/laktobasil dirençli', 'Pirüvat–ferredoksin oksidoredüktazla indirgenir → DNA kırılması'],
      k2: S => S.dar
        ? ['Emilim ~%100 · t½ 8 sa · BOS iyi', 'KC yıkımı (aktif hidroksi met.)', 'Alkolle ağır disülfiram etkisi']
        : ['~%100 biyoyararlanım · BOS/apse/prostat/plevra · t½ 8 sa · KC aktif met.', 'Bulantı/metalik tat · Alkolle ağır disülfiram reaksiyonundan kaçın'],
      metin: 'Metronidazol zorunlu anaeroplarda DNA kırılmasıyla ölüm sağlar; ~%100 biyoyararlanıma sahiptir, t½ 8 saattir ve alkolle ağır disülfiram benzeri reaksiyon oluşturur. [[K3 s. 358–359]]',
    },
  };
  VIZ.a23c_diger = (el) => SEKIL.sahne(el, {
    baslik: 'Fusidik asit, rifamisinler ve nitroimidazol (metronidazol)',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('İlaç', Object.keys(digerVeri)),
    metin: p => digerVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = digerVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });
})();
