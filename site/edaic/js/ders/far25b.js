/* Oral antidiyabetikler ve diyabetik hastanın perioperatif bakımı · K3, Türkçe çalışma çevirisi, s. 393–400. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  /* 1) Akarboz ve Metformin / MALA (SEKIL.adim) */
  VIZ.a25b_biguanid = (el) => SEKIL.adim(el, {
    baslik: 'Akarboz ve metformin: etki yolu ve laktik asidoz (MALA) dengesi',
    vb: [640, 232], vbDar: [360, 294], hareket: true,
    adimlar: [
      {
        ad: 'Akarboz (α-Gluk.)',
        metin: 'Akarboz sükrazda spesifik kompetitif α-glukozidaz inhibitörüdür; hipoglisemi gelişirse polisakkarit değil oral glukoz verilmelidir. [[K3 s. 393]]',
        ciz: (S) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 76, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Polisakkaritler → İntestinal α-gluk.', 'Akarboz (sükraz spesifik inh.)', 'Postprandiyal hiperglisemi ↓'], lh: 21 })
              + S.kutu(14, 102, W - 28, 80, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Emilim ihmal edilebilir · KCFT geçici ↑', 'Kolonda bakteri fermantasyonu:', 'Borborigmus · Flatulans · Diyare'], lh: 21 })
              + S.kutu(14, 196, W - 28, 78, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Hipoglisemiyi potansiyalize eder:', 'Oral GLUKOZ kullan, polisakkarit YASAK'], lh: 21 });
          }
          return S.kutu(16, 16, 294, 102, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Akarboz (α-Glukozidaz İnh.)', '• Sükraz spesifik kompetitif blokaj', '• Monosakkarit emilimi gecikir', '• Anlamlı emilmez, sistemik etki az'], lh: 21 })
            + S.kutu(330, 16, 294, 102, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Kolonik Yük & Yan Etkiler', '• Kolon bakterilerine karbonhidrat ↑', '• Borborigmus, flatulans, diyare', '• Hepatik transaminazlar geçici ↑'], lh: 21 })
            + S.kutu(16, 136, 608, 74, { dolgu: 'crit-soft', renk: 'crit', yazi: ['İnsülin/diğer ilaçların hipoglisemisini artırır → Acil tedavide', 'mutlaka oral glukoz verilir; polisakkaritler emilemeyeceği için kullanılamaz.'], lh: 22 });
        },
      },
      {
        ad: 'Metformin & Laktat',
        metin: 'Metformin glukoz alımını ve glikolizi artırırken hepatik/renal glukoneogenezi inhibe ederek laktat klirensini düşürür (normal laktat:pirüvat 10:1). [[K3 s. 393–394]]',
        ciz: (S, t) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 78, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Glukoz → Glikoliz → Pirüvat ↔ Laktat', 'Sağlıklı oran 10:1 · 20 mmol/kg/gün', 'PDH + Tiamin → Krebs döngüsü'], lh: 21 })
              + S.ok([[W / 2, 90], [W / 2, 114]], { renk: 'crit' })
              + S.kutu(14, 114, W - 28, 86, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Metformin Çift Etkisi (MALA)', '1) Hücre alımı ↑ → pirüvat/laktat ↑', '2) Glukoneogenez inh. → klirens ↓'], lh: 21 })
              + S.kutu(14, 214, W - 28, 60, { dolgu: 'paper', renk: 'line', yazi: ['%60 biyoyararlanım · Protein bağsız', 'İdrarda değişmeden (işlevsel adacık şart)'], lh: 21 });
          }
          return S.kutu(16, 18, 286, 100, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Fizyolojik Denge (LDH & PDH)', '• Pirüvat ↔ Laktat (10:1 oran)', '• Normal üretim 20 mmol/kg/gün', '• PDH kofaktörü tiamin → Krebs'], lh: 21 })
            + S.ok([[302, 68], [338, 68]], { renk: 'crit' })
            + S.akis([[302, 68], [338, 68]], t, { renk: 'crit', n: 3 })
            + S.kutu(338, 18, 286, 100, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Metformin MALA Mekanizması', '1) Hücresel glukoz/glikoliz artışı ↑', '2) Glukoneogenez bloğu (klirens ↓)', '• Stres + tiamin eksikliği biriktirir'], lh: 21 })
            + S.kutu(16, 134, 608, 76, { dolgu: 'paper', renk: 'line', yazi: ['Metformin kinetiği: %60 oral biyoyararlanım, plazma proteinlerine bağlanmaz ve', 'değişmeden idrarla atılır (böbrek yetmezliğinde etkisi belirgin uzar).'], lh: 22 });
        },
      },
      {
        ad: '4 MALA Riski',
        metin: 'Dört MALA risk faktörü: böbrek yetmezliği/hipovolemi, bozulmuş hepatik/renal laktat klirensi, sepsis/metabolik stres ve tiamin eksikliği. [[K3 s. 394]]',
        ciz: (S) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 120, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Metformin İlişkili Laktik Asidoz', '1) Kötü böbrek fonk. (hipovolemi)', '2) Hepatik/renal klirens bozukluğu', '3) Sepsis · Hipoperfüzyon · Stres', '4) Tiamin eksikliği (alkol/malnüt.)'], lh: 21 })
              + S.kutu(14, 146, W - 28, 124, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Metformin Klinik Özeti', 'Bağırsaktan yavaş emilir (%60)', 'Periferik duyarlılık için endojen', 'insülin (işlevsel adacık) gerekir', 'Hafif diyare dahil Gİ yakınma'], lh: 21 });
          }
          return S.kutu(16, 16, 294, 114, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Üretim ↑ / Pirüvat Kullanımı ↓', '• Sepsis, hipoperfüzyon, sempatik', '  aktivasyon ve metabolik stres', '• Tiamin eksikliği → Krebs’e giriş ↓'], lh: 22 })
            + S.kutu(330, 16, 294, 114, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Klirens Azalması (Birikim)', '• Kötü böbrek fonk. (öz. hipovolemi)', '• Hastalığa bağlı bozulmuş hepatik', '  ve renal laktat metabolizması'], lh: 22 })
            + S.kutu(16, 146, 608, 66, { dolgu: 'paper', renk: 'line', yazi: ['Laktat stres anında beyin, böbrek ve karaciğer için hayati yakıttır;', 'üretim ile klirens dengesi bozulduğunda ağır MALA gelişebilir.'], lh: 22 });
        },
      },
    ],
  });

  /* 2) İnkretin sistemi: GLP-1 ve DPP-4 */
  const inkVeri = {
    'İnkretin Etkisi': {
      renk: 'basic',
      k1: S => S.dar
        ? ['Bağırsak lümenindeki glukoz →', 'GLP-1 salınımı (kitap: gastrik L;', 'gerçekte bağırsak mukozası — not)']
        : ['Lümen glukozu → L hücrelerinden GLP-1 salınır (yer için bkz. not)', 'β-hücre insülin ↑ · α-hücre glukagon ↓ · Tip 2 DM’de GLP-1 ↓'],
      k2: S => S.dar
        ? ['• Gastrik boşalmayı geciktirir', '• İştahı azaltır, tokluğu artırır', '• DPP-4 hızla inaktive eder']
        : ['Gastrik boşalmayı geciktirir, iştah ↓ / tokluk ↑ (DPP-4 hızla yıkar)', 'Her iki sınıf iyi glisemik kontrol, kilo kaybı ve KV profil ile ilişkili'],
      metin: 'GLP-1 insülini artırır, glukagonu azaltır, mide boşalmasını geciktirir ve iştahı azaltır; DPP-4 enzimiyle hızla inaktive edilir. [[K3 s. 394–395]]',
    },
    'GLP-1 Agonistleri': {
      renk: 'warn',
      k1: S => S.dar
        ? ['Dulaglutid, eksenatid, liraglutid,', 'liksisenatid · Kitap: SC uygulama', '(bazıları haftalık, uzun kalıcı etki)']
        : ['Dulaglutid, eksenatid, liraglutid, liksisenatid (kitap: SC uygulama)', 'Bazıları haftalık uygulanır; kesildikten sonra uzun etki sürer'],
      k2: S => S.dar
        ? ['Bulantı sık · Pankreatit ilişkili', 'Diğerleriyle hipoglisemi tetikler', 'Kitap: orta BY’de hepsi yasak (not)']
        : ['Bulantı sık · Pankreatit ile ilişkili · Kombinasyonda hipoglisemi', 'Kitap orta BY’de hepsini kontrendike sayar (ayrım için Atlas notu)'],
      metin: 'Mevcut GLP-1 agonistleri bulantı yapabilir, pankreatitle ilişkilidir ve kitapta SC verildiği ile orta böbrek bozukluğunda kontrendike olduğu belirtilir (ayrımlar için Atlas notu). [[K3 s. 395]]',
    },
    'DPP-4 İnh. (Gliptinler)': {
      renk: 'ok',
      k1: S => S.dar
        ? ['Sitagliptin · Linagliptin · Alogliptin', 'Oral yolla verilirler', 'Endojen GLP-1 etkisini uzatır']
        : ['Sitagliptin, linagliptin, alogliptin (oral uygulama)', 'Endojen GLP-1 ömrünü uzatarak endojen insülin etkisini artırır'],
      k2: S => S.dar
        ? ['Monoterapi veya kombinasyon', 'BY’de doz ayarı (linagliptin HARİÇ)', 'Pankreatit ile ilişkilendirilmiştir']
        : ['Monoterapi veya diğer ajanlarla kombine edilebilir', 'BY’de genelde doz ayarı gerekir (linagliptin hariç); pankreatit ilişkili'],
      metin: 'Sitagliptin, linagliptin ve alogliptin oral DPP-4 inhibitörleridir; linagliptin dışında böbrek bozukluğunda doz değişikliği gerekir ve pankreatitle ilişkilidirler. [[K3 s. 395]]',
    },
  };
  VIZ.a25b_inkretin = (el) => SEKIL.sahne(el, {
    baslik: 'İnkretin sistemi: GLP-1 reseptör agonistleri ve DPP-4 inhibitörleri',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Grup', Object.keys(inkVeri)),
    metin: p => inkVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = inkVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  /* 3) Meglitinidler ve SGLT-2 inhibitörleri */
  const megSgltVeri = {
    'Meglitinid (Repaglinid)': {
      renk: 'basic',
      k1: S => S.dar
        ? ['Repaglinid ve Nateglinid', 'Görece kısa etkili · Öğünden hemen', 'önce (düzensiz beslenende yararlı)']
        : ['Repaglinid & nateglinid: görece kısa etkili, öğünden hemen önce', 'β-hücre ATP-K⁺ kanallarını kapatır → Ca²⁺ kanalı açılır → insülin ↑'],
      k2: S => S.dar
        ? ['Repaglinid: %50 oral biyoyararlanım', '%98 protein bağlı · t½ 1 saat', 'CYP3A4 yıkımı → etkileşim riski']
        : ['Repaglinid kinetiği: %50 oral biyoyararlanım, %98 protein bağlanması', 'Hepatik CYP3A4 metabolizması (ilaç etkileşimi) · t½ 1 saat'],
      metin: 'Meglitinidler öğünlerden hemen önce alınır ve β-hücre ATP-bağımlı K⁺ kanallarını kapatır; repaglinid %50 biyoyararlanım, %98 protein bağlanması, CYP3A4 yıkımı ve 1 saat t½ gösterir. [[K3 s. 395]]',
    },
    'SGLT-2 İnh. & DKA': {
      renk: 'crit',
      k1: S => S.dar
        ? ['Proksimal kıvrımlı tübülde SGLT-2', 'glukoz geri emilimini bloke eder', 'Poliüri · Polidipsi · Dehidratasyon']
        : ['Proksimal kıvrımlı tübülde SGLT-2 glukoz geri emilimini azaltır', 'Beklenen yan etkiler: poliüri, polidipsi ve dehidratasyon'],
      k2: S => S.dar
        ? ['ÖGLİSEMİK DİYABETİK KETOASİDOZ!', 'Belirgin hiperglisemi OLMADAN (T1/T2)', 'Asidoz belirtisinde KETON test et']
        : ['Tip 1 & 2’de ciddi/hayati öglisemik ketoasidoz bildirilmiştir', 'Asidoz belirtisi varsa tanı gecikmesini önlemek için keton test et'],
      metin: 'SGLT-2 inhibitörleri proksimal tübül glukoz geri emilimini azaltır; belirgin hiperglisemi olmadan gelişebilen öglisemik ketoasidoz nedeniyle asidoz belirtisinde keton ölçülmelidir. [[K3 s. 396]]',
    },
  };
  VIZ.a25b_meg_sglt2 = (el) => SEKIL.sahne(el, {
    baslik: 'Meglitinidler ve SGLT-2 inhibitörleri: öglisemik DKA uyarısı',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Sınıf', Object.keys(megSgltVeri)),
    metin: p => megSgltVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = megSgltVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  /* 4) Sülfonilüreler ve Tiyazolidindionlar */
  const suTzdVeri = {
    'Sülfonilüreler: Etki': {
      renk: 'ok',
      k1: S => S.dar
        ? ['1. kuşak: Tolbutamid', '2. kuşak: Glibenklamid, Gliklazid,', 'Glipizid (işlevsel β-hücre şart)']
        : ['1. kuşak tolbutamid · 2. kuşak glibenklamid, gliklazid, glipizid', 'β-hücresinden insülin ↑ · Glukagon & hepatik insülinaz ↓'],
      k2: S => S.dar
        ? ['β-hücre hiperplazisi uyarabilir', 'Uzun sürede periferik direnç ↓', 'Biyoyararlanım >%80 · İdrar atılım']
        : ['β-hücre hiperplazisi + uzun dönemde periferik dirençte azalma', 'Oral >%80 · Çoğu değişmeden veya inaktif metabolitle idrara'],
      metin: 'Sülfonilüreler insülini serbestleştirir (işlevsel β-hücre yoksa etkisiz), glukagon ile hepatik insülinazı azaltır ve >%80 oral biyoyararlanım gösterir. [[K3 s. 396]]',
    },
    'Albümin & Etkileşim': {
      renk: 'warn',
      k1: S => S.dar
        ? ['2. kuşak: albümine NONİYONİK bağ', 'Tolbutamid: İYONİK bağ (fenilbutazon,', 'varfarin, salisilat yerinden eder)']
        : ['2. kuşak albümine noniyonik bağlanır (iyonik tolbutamidden güvenli olabilir)', 'Simetidin metabolizmayı inh. ederek sülfonilüre etkisini artırır'],
      k2: S => S.dar
        ? ['Antagonize: tiyazid, steroid, fenot.', 'Tolbutamid: kolestatik sarılık,', 'bozuk KCFT ve kan diskrazileri']
        : ['Tiyazid, steroid ve fenotiyazin antagonize eder · BY’de t½ uzar', 'Tolbutamid: kolestatik sarılık, KCFT bozukluğu, kan diskrazisi'],
      metin: 'İkinci kuşak sülfonilüreler albümine noniyonik bağlandığından anyonik ilaçlarla yer değiştirme riski tolbutamidden düşüktür; simetidin potansiyalize, steroid/tiyazid antagonize eder. [[K3 s. 396]]',
    },
    'Pioglitazon (TZD)': {
      renk: 'crit',
      k1: S => S.dar
        ? ['BK’de kalan tek TZD (rosiglitazon', 'MI/inme ile çekildi) · Yüksek oral', 'Nükleer PPARγ → tam etki HAFTALAR']
        : ['Nükleer PPARγ aktivasyonu (glukoz/lipit genleri) → duyarlılık ↑', 'Rosiglitazon MI/inmeyle çekildi · Tam etki yerleşmesi haftalar sürer'],
      k2: S => S.dar
        ? ['Hepatik CYP450 (aktif metabolit)', 'Dışkı & idrar · İnsülinle KY riski ↑', 'KALP YETMEZLİĞİNDE VERİLMEZ!']
        : ['Hepatik CYP450 (bazı aktif metabolit) → dışkı ve idrarla atılım', 'Öz. insülinle kalp yetmezliği riski ↑ → KY olanlara VERİLMEZ'],
      metin: 'Pioglitazon nükleer PPARγ reseptörünü aktive eder (tam etkisi haftalar sürer); özellikle insülinle birlikte kalp yetmezliği riskini artırır ve kalp yetmezliğinde verilmemelidir. [[K3 s. 397]]',
    },
  };
  VIZ.a25b_su_tzd = (el) => SEKIL.sahne(el, {
    baslik: 'Sülfonilüreler (1. ve 2. kuşak) ve tiyazolidindion (pioglitazon)',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Başlık', Object.keys(suTzdVeri)),
    metin: p => suTzdVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = suTzdVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  /* 5) Perioperatif diyabet yönetimi (SEKIL.adim) */
  VIZ.a25b_periop = (el) => SEKIL.adim(el, {
    baslik: 'Perioperatif diyabet yönetimi: açlık süresi, VRIII ve oral ajanlar',
    vb: [640, 232], vbDar: [360, 294],
    adimlar: [
      {
        ad: '1 Öğün (Kısa Açlık)',
        metin: 'Yalnızca bir öğün atlanacaksa çoğu zaman VRIII gerekmez; uzun etkili insülin bir gün önce %20 azaltılabilir, GLP-1/DPP-4/pioglitazon ameliyat günü alınabilir. [[K3 s. 397–398]]',
        ciz: (S) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 82, { dolgu: 'ok-soft', renk: 'ok', yazi: ['VRIII: Çoğu zaman GEREKMEZ', 'Uzun etkili insülin: 1 g önce -%20 olab.', 'Orta/kısa ins.: 1 g önce değişiklik yok'], lh: 21 })
              + S.kutu(14, 108, W - 28, 84, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Ameliyat Günü Oral Ajanlar', 'AL: GLP-1 ag., DPP-4 inh., pioglitazon', 'KES: Diğerlerinin tümü (SGLT-2 not!)'], lh: 21 })
              + S.kutu(14, 206, W - 28, 68, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Metformin: iyi böbrek + kontrastsızda', 'azaltıp verilebilir / veya kesilir'], lh: 21 });
          }
          return S.kutu(16, 16, 294, 114, { dolgu: 'ok-soft', renk: 'ok', yazi: ['1 Öğün Atlama (İnsülinler)', '• Çoğu zaman VRIII gerekmez', '• Uzun etkili: 1 gün önce -%20 olabilir', '• Orta/kısa: 1 gün önce ayarlama yok'], lh: 22 })
            + S.kutu(330, 16, 294, 114, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Ameliyat Günü İnsülin Dışı', '• Normal al: GLP-1, DPP-4, pioglitazon', '• Diğer tümüne ara ver (bkz. not)', '• Metformin tartışmalı (kontrast!)'], lh: 22 })
            + S.kutu(16, 146, 608, 66, { dolgu: 'paper', renk: 'line', yazi: ['«Kayan ölçek» yerine VRIII (değişken hızlı İV insülin infüzyonu) denmelidir.', 'Ameliyat günü insülin değişikliği ameliyat saatine göre planlanır.'], lh: 22 });
        },
      },
      {
        ad: '>1 Öğün (VRIII)',
        metin: 'Birden fazla öğün atlanıyorsa çoğunda VRIII gerekir; uzun etkili insülin rebound hiperglisemiyi azaltmak için VRIII ile %20 azaltılarak sürdürülür. [[K3 s. 397–398]]',
        ciz: (S) => {
          const d = S.dar, W = S.w;
          if (d) {
            return S.kutu(14, 12, W - 28, 82, { dolgu: 'warn-soft', renk: 'warn', yazi: ['>1 Öğün Atlama → VRIII GEREKİR', 'Uzun etkili insülin normalde varsa:', 'VRIII ile birlikte (-%20) SÜRDÜR!'], lh: 21 })
              + S.kutu(14, 108, W - 28, 76, { dolgu: 'crit-soft', renk: 'crit', yazi: ['VRIII Sırasında İnsülin Dışı:', 'GLP-1 agonistleri HARİÇ', 'tüm diğer ilaçlara ARA VERİLİR'], lh: 21 })
              + S.kutu(14, 198, W - 28, 74, { dolgu: 'paper', renk: 'line', yazi: ['Amaç: VRIII sona erdiğinde', 'rebound hiperglisemiyi azaltmak'], lh: 21 });
          }
          return S.kutu(16, 16, 294, 114, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Uzun Açlık (>1 Öğün): İnsülin', '• Hastaların çoğunda VRIII gerekir', '• Uzun etkili insülin %20 azaltılarak', '  VRIII ile birlikte sürdürülür'], lh: 22 })
            + S.kutu(330, 16, 294, 114, { dolgu: 'crit-soft', renk: 'crit', yazi: ['VRIII Kullanılırken İnsülin Dışı', '• GLP-1 agonistleri dışındaki TÜM', '  insülin dışı ilaçlara ara verilir', '• Yerleşik protokollere uyulmalıdır'], lh: 22 })
            + S.kutu(16, 146, 608, 66, { dolgu: 'paper', renk: 'line', yazi: ['VRIII sırasında bazal uzun etkili insülini (%20 düşük) sürdürmenin amacı,', 'VRIII durdurulduğunda ortaya çıkan rebound hiperglisemiyi azaltmaktır.'], lh: 22 });
        },
      },
    ],
  });
})();
