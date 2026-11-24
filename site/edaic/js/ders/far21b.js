/* Kolloidler, bikarbonat, mineraller ve beslenme · K3, Türkçe çalışma çevirisi, s. 319–327. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  const kolVeri = {
    Jelatinler: {
      renk: 'basic',
      ozellik: ['Gelofusine™ (süksinillenmiş)', 'Hemaccel™ (üre bağlı, Ca²⁺ ↑)', '>%95 idrarla · RES birikimi yok'],
      uyari: ['Anafilaksi ~6,2/100 bin (rok. gibi)', 'Hemaccel™ setinden kan verilmez', 'AB: sepsis/ABH/kafa trv.da kaçın'],
      metin: 'Jelatinlerin >%95’i değişmeden idrarla atılır ve RES’te depolanmaz; “emilim olmaması kuralı” ve revize Starling nedeniyle plazma genişletici etki çoğu kez kristalloidlere benzer. [[K3 s. 319–320]]',
    },
    HES: {
      renk: 'crit',
      ozellik: ['Amilopektin · Orta MA en iyi', 'Sübstitüsyon & C2:C6 · RES ↑', 'Çözünürlük ↑, yıkım ↓ → t½ uzar'],
      uyari: ['Tüm gruplarda ABH ↑ · Kaşıntı', 'Anafilaksi ~1/20.000 · Koag. değ.', 'Sepsis/ABH ölüm → AB askıya aldı'],
      metin: 'HES tüm hasta gruplarında akut böbrek hasarını artırır ve RES’te birikerek kaşıntıya yol açar; kitap 2018’de AB ruhsatlarının askıya alındığını yazar. [[K3 s. 320]]',
    },
    Albümin: {
      renk: 'ok',
      ozellik: ['585 aa · 69.000 Da · Negatif yük', 'KC 10–15 g/gün · t½ 20 gün', '<%50 İV · %4,5/5 vs %20 çözelti'],
      uyari: ['Asidik ilaç bağlar (varf., fur.)', 'Asit parasentez, HRS, SBP, yanık', 'Kafa trav.: kötü sonuç ilişkili'],
      metin: 'Albümin kolloid onkotik basınca en büyük katkıyı sağlar ve asidik ilaçları bağlar; HAS kafa travmalarında daha kötü sonuçlarla ilişkilidir. [[K3 s. 321]]',
    },
  };
  VIZ.a21b_kolloid = (el) => SEKIL.sahne(el, {
    baslik: 'Kolloid gruplarının özellikleri ve güvenlik uyarıları',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Kolloid', Object.keys(kolVeri)),
    metin: p => kolVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = kolVeri[secili], W = S.w;
      if (S.dar) {
        return S.kutu(14, 10, W - 28, 124, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.ozellik, lh: 24 })
          + S.kutu(14, 148, W - 28, 124, { dolgu: 'paper', renk: 'line', yazi: v.uyari, lh: 24 });
      }
      return S.kutu(14, 24, 298, 174, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.ozellik, lh: 28 })
        + S.kutu(328, 24, 298, 174, { dolgu: 'paper', renk: 'line', yazi: v.uyari, lh: 28 });
    },
  });

  const bikVeri = {
    'Çözeltiler': {
      renk: 'basic',
      kutu1: ['%1,26 (150 mmol/L) & %1,4 çözelti', 'İzotonik/hafif hipotonik · Cl⁻ yok'],
      kutu2: ['%4,2 & %8,4 (%8,4 = 1000 mmol/L)', 'Hipertonik & iritan → Santral ven'],
      metin: 'Hipertonik %4,2 ve %8,4 çözeltiler ileri derecede iritan olduğundan yalnız santral vene infüze edilmeli ve belirgin sodyum yükü taşırlar. [[K3 s. 322]]',
    },
    'Kullanım Alanları': {
      renk: 'ok',
      kutu1: ['pH < 7,1 inorg. asidoz · Diyalizat', 'Alkali diürez · Hiperkalemi · Enzim'],
      kutu2: ['TCA doz aşımı disritmileri / QT ↑', 'pH > 7,1: miyokard depr. geri çev.'],
      metin: 'pH’ın 7,1 üzerine çıkarılmasının miyokard depresyonunu ve düşük katekolamin duyarlılığını geri çevirdiği düşünülmektedir; yavaş verilmelidir. [[K3 s. 322]]',
    },
    'Yan Etkiler': {
      renk: 'crit',
      kutu1: ['Hipokalemi · Hipernatremi · Ca²⁺ ↓', 'Hb-O₂ sola kayar (O₂ salınımı ↓)'],
      kutu2: ['Ventilede hiperkarbi (MV ↑ yoksa)', 'CO₂ zarı geçer → hücre içi asidoz ↑'],
      metin: 'Çözünmüş CO₂ zardan kolayca geçerken bikarbonat çok daha az geçtiğinden intraselüler asidoz kötüleşip kontraktiliteyi bozabilir. [[K3 s. 322–323]]',
    },
  };
  VIZ.a21b_bikarbonat = (el) => SEKIL.sahne(el, {
    baslik: 'Sodyum bikarbonat çözeltileri, endikasyonlar ve yan etkiler',
    vb: [640, 210], vbDar: [360, 246],
    secenek: secim('Başlık', Object.keys(bikVeri)),
    metin: p => bikVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = bikVeri[secili], W = S.w;
      return S.kutu(14, 14, W - 28, S.dar ? 100 : 84, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.kutu1, lh: 24 })
        + S.kutu(14, S.dar ? 128 : 112, W - 28, S.dar ? 104 : 84, { dolgu: 'paper', renk: 'line', yazi: v.kutu2, lh: 24 });
    },
  });

  VIZ.a21b_magnezyum = (el) => SEKIL.sahne(el, {
    baslik: 'Magnezyum sülfat: klinik dozlar ve toksisite eşikleri',
    vb: [640, 224], vbDar: [360, 284],
    secenek: secim('Görünüm', ['Klinik Dozlar', 'Hipermagnezemi Eşikleri']),
    metin: p => p.secili === 'Klinik Dozlar'
      ? 'Normal serum Mg²⁺ 0,7–1,0 mmol/L’dir; 10 mL %50 MgSO₄ flakonu 5 g (20 mmol) içerir. [[K3 s. 323]]'
      : 'Hipermagnezemi (> 1,05 mmol/L) tedavisinde fizyolojik antagonist olan intravenöz kalsiyum kullanılır. [[K3 s. 323]]',
    ciz: (S, t, { secili }) => {
      const doz = secili === 'Klinik Dozlar', W = S.w;
      if (doz) {
        return S.kutu(14, 12, W - 28, S.dar ? 72 : 62, {
          dolgu: 'basic-soft', renk: 'basic',
          yazi: S.dar
            ? ['Normal: 0,7–1,0 mmol/L', '10 mL %50 = 5 g (20 mmol) · %99 i.c.']
            : ['Normal: 0,7–1,0 mmol/L · 10 mL %50 = 5 g (20 mmol)', 'İntraselüler %99 · K⁺’dan sonra 2. katyon'], lh: 21,
        }) + S.kutu(14, S.dar ? 98 : 88, W - 28, S.dar ? 172 : 122, {
          dolgu: 'paper', renk: 'line',
          yazi: S.dar
            ? ['Eklampsi: 4 g İV (5–15 dk)', '+ 1 g/sa 24 sa (ek nöbette 2–4 g)', 'Astım 2 g (20 dk) · Torsades · Ağrı']
            : ['Preeklampsi/eklampsi: 4 g İV (5–15 dk) + 1 g/saat (24 sa); ek nöbette 2–4 g', 'Akut şiddetli astım: 20 dk’da 2 g İV (kanıt sınırlı)', 'Aritmiler (torsades de pointes, VT/SVT) · Analjeziye yardımcı (opiyat ↓)'], lh: 26,
        });
      }
      return S.kutu(14, 12, W - 28, S.dar ? 68 : 56, {
        dolgu: 'warn-soft', renk: 'warn',
        yazi: S.dar ? ['> 1,05 mmol/L Hipermagnezemi', 'Tedavi: İV Kalsiyum'] : '> 1,05 mmol/L Hipermagnezemi · Tedavi: İV Kalsiyum', lh: 21,
      }) + S.kutu(14, S.dar ? 94 : 82, W - 28, S.dar ? 176 : 126, {
        dolgu: 'crit-soft', renk: 'crit',
        yazi: S.dar
          ? ['> 4 mmol/L: Bulantı · Hiporefleksi', '> 6 mmol/L: Güçsüzlük · Solunum ↓', '> 10 mmol/L: Kardiyak arrest']
          : ['> 4 mmol/L: Bulantı · Hiporefleksi · Peltek konuşma', '> 6 mmol/L: Kas güçsüzlüğü · Solunum depr. · Bradikardi', '> 10 mmol/L: Kardiyak arrest'], lh: 27,
      });
    },
  });

  VIZ.a21b_ca_p = (el) => SEKIL.sahne(el, {
    baslik: 'Kalsiyum preparatları ve fosfor dengesi',
    vb: [640, 214], vbDar: [360, 254],
    secenek: secim('Mineral', ['Kalsiyum', 'Fosfor (0,8–1,4 mmol/L)']),
    metin: p => p.secili === 'Kalsiyum'
      ? 'Kalsiyum klorür gram başına kalsiyum glukonatın üç katı Ca²⁺ içerir; hiperkalemide miyokard stabilizasyonu için 10 mL %10 CaCl₂ (santral) veya 30 mL %10 glukonat verilir. [[K3 s. 324]]'
      : 'Hipofosfatemi nedenleri yeniden dağılım, artmış idrar atılımı ve azalmış emilimdir; hızlı İV fosfat tromboflebit veya hipokalsemi yapabileceğinden uzun infüzyonla verilir. [[K3 s. 324]]',
    ciz: (S, t, { secili }) => {
      const ca = secili === 'Kalsiyum', W = S.w;
      const k1 = ca
        ? (S.dar ? ['CaCl₂: glukonattan 3× Ca²⁺/g', '10 mL %10 CaCl₂ / 30 mL glukonat'] : ['CaCl₂: glukonattan 3× daha fazla Ca²⁺/g', '10 mL %10 CaCl₂ (santral) veya 30 mL %10 glukonat'])
        : (S.dar ? ['Kemikte · ATP, 2,3-DPG · PTH kontrol', 'Refeeding, alkaloz, sepsis, insülin'] : ['Çoğu kemikte · ATP, cAMP, 2,3-DPG · PTH kontrolü', 'Yeniden dağılım: refeeding, alk., sepsis, insülin']);
      const k2 = ca
        ? (S.dar ? ['Hipokalsemik tetani tedavisi', 'Hiperkalemide miyokard koruma'] : ['Hipokalsemik tetani tedavisi', 'Akut hiperkalemide miyokard stabilizasyonu'])
        : (S.dar ? ['Aritmi · Diyafram → solunum yetm.', 'Nöbet, konfüzyon · Uzun infüzyon'] : ['Aritmi · Diyafram güçsüzlüğü → solunum yetm.', 'Nöbet, konfüzyon, parestezi · Uzun infüzyon']);
      return S.kutu(14, 14, W - 28, S.dar ? 106 : 86, { dolgu: 'basic-soft', renk: 'basic', yazi: k1, lh: 24 })
        + S.kutu(14, S.dar ? 134 : 114, W - 28, S.dar ? 106 : 86, { dolgu: 'paper', renk: 'line', yazi: k2, lh: 24 });
    },
  });

  function zincir(baslik, adimlar) {
    return {
      baslik, vb: [640, 316], vbDar: [360, 316], oto: false, adimlar,
      ortak: (S, secili) => adimlar.map(({ satir }, i) => {
        const y = 8 + i * 78, etkin = secili === i, orta = S.w / 2;
        const bag = i ? S.ok([[orta, y - 18], [orta, y - 4]], { renk: 'muted' }) : '';
        return bag + S.kutu(S.w * 0.05, y, S.w * 0.9, 56, {
          yazi: satir, yc: etkin ? 'b' : 'normal', lh: 20, w: etkin ? 3 : 1,
          renk: etkin ? 'accent' : 'line', dolgu: etkin ? 'accent-soft' : 'paper',
        });
      }).join(''),
    };
  }

  VIZ.a21b_pn = (el) => SEKIL.adim(el, zincir('Parenteral beslenme ve yeniden beslenme sendromu', [
    { ad: 'Yol & Enerji', satir: ['Yüksek ozmolalite → Santral ven', 'Akut 20–25 · İyil. 25–30 kcal/kg'], metin: 'Düşük ozmolariteli çözeltilerde periferik ven kullanılabilir; vitamin ve eser elementler steril eczanede eklenir. [[K3 s. 324]]' },
    { ad: 'Makrobesin', satir: ['Glukoz ≤%60 · Lipit ≤%40', 'Azot 0,8–1,5 g protein / kg / gün'], metin: 'Soya (en yaygın), balık, zeytinyağı ve OZT emülsiyonları kullanılır; OZT şilomikronlara katılmadan karaciğere gider ve mitokondriyi pasif geçer. [[K3 s. 325]]' },
    { ad: 'Refeeding', satir: ['Risklide 10 (hatta 5) kcal/kg · %50 N', 'PO₄³⁻↓ · K⁺↓ · KKY · Ödem · Nöbet'], metin: 'Agresif rehabilitasyonda ölümcül olabilir; yüksek doz B vitamini ve sık elektrolit izlemiyle agresif yerine koyma gerekir. [[K3 s. 324–325]]' },
    { ad: 'İzlem', satir: ['Başlangıç & 6. haftada mikrobesin', 'Zn, Se, Mn, ferritin, folat, B12, D'], metin: 'Komplikasyonlar arasında vasküler erişim sorunları, karaciğer yağlanması, anormal KCFT ve hiperglisemi de yer alır. [[K3 s. 325]]' },
  ]));

  VIZ.a21b_enteral = (el) => SEKIL.sahne(el, {
    baslik: 'Enteral beslenme kategorileri ve tiamin (Pabrinex)',
    vb: [640, 224], vbDar: [360, 278],
    secenek: secim('Konu', ['Enteral Beslenme', 'Tiamin ve Pabrinex']),
    metin: p => p.secili === 'Enteral Beslenme'
      ? 'Enteral beslenmede kalorilerin ~%50’si karbonhidrat, %30’u lipit ve kalanı proteindir; bağışıklık güçlendirici ürünlerin yararını gösteren kanıt yoktur. [[K3 s. 326]]'
      : 'Kalori alımı B vitamini tükenmiş hastada Wernicke sendromunu tetikleyebileceğinden PN başında 3 gün İV B vitaminleri (Pabrinex) önerilir. [[K3 s. 326]]',
    ciz: (S, t, { secili }) => {
      const ent = secili === 'Enteral Beslenme', W = S.w;
      const k1 = ent
        ? ['Polimerik · Standart 1 kcal/mL', 'Ön sindirilmiş (malabsorpsiyon)', 'İmmün ürün: yarar kanıtı yok']
        : ['Alkol/malnütrisyonda B₁ eksikliği', 'Wernicke · Alkol: 100 mg/gün B₁', 'PN başında 3 gün İV Pabrinex'];
      const k2 = ent
        ? ['Standart: laktozsuz · izotonik', 'Sıvı kısıtlı: 2 kcal/mL → diyare']
        : ['Ampul 1: tiamin, B₂, piridoksin', 'Ampul 2: askorbat, B₃, glukoz', 'Wernicke: 3 × 2–3 çift İV / İM'];
      if (S.dar) {
        return S.kutu(14, 10, W - 28, 122, { dolgu: 'ok-soft', renk: 'ok', yazi: k1, lh: 23 })
          + S.kutu(14, 144, W - 28, 122, { dolgu: 'paper', renk: 'line', yazi: k2, lh: 23 });
      }
      return S.kutu(14, 22, 298, 178, { dolgu: 'ok-soft', renk: 'ok', yazi: k1, lh: 27 })
        + S.kutu(328, 22, 298, 178, { dolgu: 'paper', renk: 'line', yazi: k2, lh: 27 });
    },
  });
})();
