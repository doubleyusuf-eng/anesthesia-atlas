/* Heparinler, protamin ve varfarin · K3, Türkçe çalışma çevirisi, s. 376–380. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  const ufhVeri = {
    'Etki & Kinetik': {
      renk: 'basic',
      k1: S => S.dar
        ? ['Mukopolisakkarit · 5000–25.000 Da', 'AT-III–trombin hızını 1000× ↑', 'Düşük: FXa · Yüksek: IXa/XIa/XIIa']
        : ['Mukopolisakkarit (5–25 bin Da) · Ünite/mL (oral etkisiz)', 'AT-III–trombin hızını 1000× ↑ · Düşük FXa, yüksek IXa/XIa/XIIa'],
      k2: S => S.dar
        ? ['KBB & plasenta GEÇMEZ (SC/İV)', 'Hepatik heparinaz → idrar', 'Hipotermide (KPB) klirens ↓']
        : ['KBB/plasenta geçmez · Hepatik heparinazla yıkılıp idrarla', 'Hipotermide (KPB) klirens azalır · Protaminle geri çevrilir'],
      metin: 'Fraksiyone olmayan heparin antitrombin III–trombin kompleks oluşumunu bin kat hızlandırır, KBB ve plasentayı geçmez ve KPB hipotermisinde klirensi azalır. [[K3 s. 376–377]]',
    },
    'HIT Tip I / II & Yan Etkiler': {
      renk: 'crit',
      k1: S => S.dar
        ? ['HIT I (≤4 g): non-immün, düzelir', 'HIT Tip II (4–14 g): PF4 + IgG', 'Yarısında ciddi tromboz · %20 arteriyel']
        : ['HIT Tip I (≤4 gün): non-immün, kesilmeden düzelir', 'HIT Tip II (4–14 g, UFH/LMWH): PF4–IgG → %50 ciddi tromboz'],
      k2: S => S.dar
        ? ['Kanama · Hızlı İV hipotansiyon', 'Hiperkalemi (aldosteron inh. olab.)', 'DM & KBY yatkın · Osteoporoz']
        : ['Kanama · Hızlı İV hipotansiyon · Osteoporoz / alopesi', 'Hiperkalemi (LMWH dahil; DM/KBY yatkın, tedavi süresiyle artar)'],
      metin: 'HIT tip II, UFH veya LMWH sonrası 4–14. günlerde PF4–IgG kompleksiyle ağır venöz/arteriyel tromboz oluşturur; heparinler ayrıca hiperkalemi yapabilir. [[K3 s. 377]]',
    },
  };
  VIZ.a24b_ufh = (el) => SEKIL.sahne(el, {
    baslik: 'Fraksiyone olmayan heparin (UFH): mekanizma, kinetik ve HIT',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Başlık', Object.keys(ufhVeri)),
    metin: p => ufhVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = ufhVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const lmwhVeri = {
    'LMWH Avantajları': {
      renk: 'ok',
      k1: S => S.dar
        ? ['Enoksaparin, dalteparin, tinzaparin', 'Depolimerizasyon · 2000–8000 Da', 'Majör ortopedide PE’de UFH’ye üstün']
        : ['Enoksaparin, dalteparin, tinzaparin (2000–8000 Da)', 'Majör ortopedik cerrahide ölümcül PE’de UFH’ye üstün'],
      k2: S => S.dar
        ? ['1×/gün · vWF/trombosit/HIT/izlem ↓', 'FXa’da daha etkili · AT–trombinde az', 'Protamin tam geri çevirmede yetersiz']
        : ['Uzun t½ (1×/gün) · vWF/trombosit/HIT/izlem ↓ · FXa baskın', 'Protamin LMWH etkisini geri çevirmede tam etkili değildir'],
      metin: 'LMWH’ler FXa inhibisyonunda UFH’den daha etkilidir, günde tek doz verilir ve HIT riski daha düşüktür; ancak protamin etkilerini tam geri çevirmez. [[K3 s. 377–378]]',
    },
    'İzlem: APTT vs Anti-Xa': {
      renk: 'basic',
      k1: S => S.dar
        ? ['UFH → APTT ile izlenir (28–35 sn)', 'İntrinsik (VIII, IX, XI, XII) + ortak', 'Sitrat + fosfolipit + kaolin + Ca²⁺']
        : ['UFH → APTT (VIII, IX, XI, XII + ortak; 28–35 sn)', 'Sitratlı kana fosfolipit, yüzey aktivatörü (kaolin) ve Ca²⁺ eklenir'],
      k2: S => S.dar
        ? ['LMWH: başlıca FXa → APTT değişmez', 'Gerekirse uzman laboratuvarda', 'anti-Xa aktivitesi ölçülebilir']
        : ['LMWH başlıca FXa’yı inhibe ettiğinden APTT değişmez', 'Anti-Xa aktivitesi uzmanlaşmış laboratuvarlarda ölçülebilir'],
      metin: 'UFH intrinsik ve ortak yolu ölçen APTT (normal ~28–35 sn) ile izlenirken, LMWH’de APTT değişmez ve gerekirse anti-Xa aktivitesi ölçülür. [[K3 s. 378]]',
    },
  };
  VIZ.a24b_lmwh = (el) => SEKIL.sahne(el, {
    baslik: 'Düşük molekül ağırlıklı heparinler (LMWH) ve izlem',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Görünüm', Object.keys(lmwhVeri)),
    metin: p => lmwhVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = lmwhVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const protVeri = {
    Nötralizasyon: {
      renk: 'accent',
      k1: S => S.dar
        ? ['Balık sperminden bazik protein', 'Bazı insülin formlarında da bulunur', 'Pozitif yükle inaktif kompleks → RES']
        : ['Balık sperminden bazik protein (bazı insülin formlarında var)', 'Pozitif yüküyle heparini bağlar → RES’te temizlenen inaktif'],
      k2: S => S.dar
        ? ['İntravenöz uygulanır:', '1 mg protamin = 100 i.u. heparin', 'Fazla miktarda antikoagülan etkili']
        : ['İV 1 mg protamin, 100 i.u. heparinin etkisini geri çevirir', 'Fazla miktarda verildiğinde bir miktar antikoagülan etki gösterir'],
      metin: 'Protamin pozitif yüküyle heparini bağlayarak inaktif kompleks oluşturur; 1 mg İV protamin 100 i.u. heparini nötralize eder. [[K3 s. 378]]',
    },
    'Yan Etkiler': {
      renk: 'crit',
      k1: S => S.dar
        ? ['Hızlı İV → hipotansiyon (histamin)', 'Pulmoner HT (kompleman + TXA₂)', 'Dispne · Bradikardi · Kızarma']
        : ['Hızlı İV: hipotansiyon (histamin) & pulmoner HT (kompleman/TXA₂)', 'Dispne, bradikardi ve kızarma gelişebilir'],
      k2: S => S.dar
        ? ['Alerji riski artmış olabilir:', '• Protaminli insülin kullanmışlar', '• Balık alerjisi olan hastalar']
        : ['Protaminli insülin/balık alerjisinde risk artmış olabilir', 'Aşırı dozda kendisi hafif antikoagülan etki gösterir'],
      metin: 'Hızlı İV protamin histamin aracılı hipotansiyon ile kompleman/TXA₂ aracılı pulmoner hipertansiyon yapabilir; balık alerjisi ve protaminli insülin öyküsünde risk artmış olabilir. [[K3 s. 378]]',
    },
  };
  VIZ.a24b_protamin = (el) => SEKIL.sahne(el, {
    baslik: 'Protamin: heparin nötralizasyonu ve yan etkiler',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Odak', Object.keys(protVeri)),
    metin: p => protVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = protVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const varfVeri = {
    'Etki & VKORC1 / CYP2C9': {
      renk: 'warn',
      k1: S => S.dar
        ? ['Faktör II, VII, IX, X sentezi ↓', 'İndirgenmiş K vit. geri dönüşünü ↓', 'Tam etki 72 saate kadar · >%95 prot.']
        : ['II, VII, IX, X γ-karboksilasyonunu / K vit. dönüşünü önler', 'Dolaşımdaki faktörler kalır → tam etki 72 sa · >%95 prot.'],
      k2: S => S.dar
        ? ['VKORC1 ↓ → kanama duyarlılığı ↑', 'CYP2C9 (S-varfarin) ↓ → etki ↑', 'Teratojen · Spinal/epidural YASAK']
        : ['VKORC1 & CYP2C9 (S-varfarin) varyantı kanamayı artırır', 'Teratojen (en çok 1. trim.) · 3. trim. fetal kanama · Nöroaksiyel YASAK'],
      metin: 'Varfarin K vitaminine bağımlı faktörlerin (II, VII, IX, X) sentezini inhibe ettiğinden tam etkisi 72 saate kadar sürer; VKORC1 ve CYP2C9 varyantları kanamayı artırır. [[K3 s. 379–380]]',
    },
    'Etkileşimler, Geri Çevirme & INR': {
      renk: 'crit',
      k1: S => S.dar
        ? ['Güçlendirir: NSAİİ, alkol, sipro.,', 'eritro., met., kolestiramin', 'Zayıflatır: barbitürat, rif., karb.']
        : ['Güçlendirir: NSAİİ, alkol, eritro., met., kolestiramin', 'Antagonize eder (ind.): barbitürat, rifampisin, karbamazepin'],
      k2: S => S.dar
        ? ['TDP hızlı · 1 mg K vit. yavaş', '10 mg K vit.: günlerce etki önler', 'PT 10–14 sn · Hedef INR 2,0–4,5']
        : ['Geri çevirme: TDP (hızlı), 1 mg K vit. (yavaş), 10 mg (önler)', 'PT (VII + ortak; 10–14 sn) → Hedef INR 2,0–4,5'],
      metin: 'Varfarin TDP ile hızlı, 1 mg K vitaminiyle yavaş geri çevrilir (10 mg birkaç gün antikoagülasyonu önler); PT üzerinden hesaplanan INR hedefi 2,0–4,5 arasıdır. [[K3 s. 379–380]]',
    },
  };
  VIZ.a24b_varfarin = (el) => SEKIL.sahne(el, {
    baslik: 'Varfarin: K vitamini döngüsü, etkileşimler ve INR izlemi',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Konu', Object.keys(varfVeri)),
    metin: p => varfVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = varfVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });
})();
