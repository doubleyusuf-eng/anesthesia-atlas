/* Sıvı kompartımanları ve kristalloidler · K3, Türkçe çalışma çevirisi, s. 313–319. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  VIZ.a21a_kompartiman = (el) => SEKIL.sahne(el, {
    baslik: 'Vücut sıvı kompartımanları ve günlük gereksinimler',
    vb: [640, 224], vbDar: [360, 268],
    secenek: secim('Görünüm', ['Hacim Dağılımı (45 L)', 'Elektrolit ve Gereksinim']),
    metin: p => p.secili.startsWith('Hacim')
      ? '75 kg erkekte toplam vücut suyu ~45 L’dir (~%60): 30 L intraselüler (%66) ve 15 L ekstraselüler (%33); kitap bunu 3 L intravasküler (%25) ve 12 L interstisyel (%75) diye ayırır. [[K3 s. 313]]'
      : 'İntraselülerde Na⁺ düşük (10 mmol/L) ve K⁺ yüksektir (150 mmol/L); interstisyelde Na⁺ 140, K⁺ 4 mmol/L’dir. Günlük su gereksinimi 25–30 mL/kg’dır. [[K3 s. 313]] [[K3 s. 315]]',
    ciz: (S, t, { secili }) => {
      const hacim = secili.startsWith('Hacim'), W = S.w;
      if (hacim) {
        if (S.dar) {
          return S.kutu(14, 10, W - 28, 72, { dolgu: 'basic-soft', renk: 'basic', yazi: ['İntraselüler sıvı · 30 L (%66)', 'Na⁺ 10 · K⁺ 150 mmol/L'], lh: 22 })
            + S.kutu(14, 94, W - 28, 72, { dolgu: 'ok-soft', renk: 'ok', yazi: ['İnterstisyel · 12 L (ESF %75)', 'Na⁺ 140 · K⁺ 4 · Az protein'], lh: 22 })
            + S.kutu(14, 178, W - 28, 76, { dolgu: 'clin-soft', renk: 'clin', yazi: ['Plazma 3 L (ESF %25)', '+ 2 L hücre = 5 L toplam İV'], lh: 22 });
        }
        return S.kutu(16, 22, 240, 176, { dolgu: 'basic-soft', renk: 'basic', yazi: ['İntraselüler Sıvı', '30 L (%66)', 'Na⁺ 10 · K⁺ 150 mmol/L'], lh: 28 })
          + S.kutu(268, 22, 212, 176, { dolgu: 'ok-soft', renk: 'ok', yazi: ['İnterstisyel', '12 L (ESF %75)', 'Na⁺ 140 · K⁺ 4'], lh: 28 })
          + S.kutu(492, 22, 132, 176, { dolgu: 'clin-soft', renk: 'clin', yazi: ['Plazma 3 L', '(ESF %25)', '+ 2 L hücre'], lh: 28 });
      }
      if (S.dar) {
        return S.kutu(14, 10, W - 28, 114, {
          dolgu: 'paper', renk: 'line',
          yazi: ['İCS: Na⁺ 10 · K⁺ 150 mmol/L', 'İnterstisyel: Na⁺ 140 · K⁺ 4', 'İnterstisyel onkotik basınç ↓'], lh: 24,
        }) + S.kutu(14, 138, W - 28, 116, {
          dolgu: 'accent-soft', renk: 'accent',
          yazi: ['Günlük: Su 25–30 mL/kg', 'Na⁺, K⁺, Cl⁻: 1 mmol/kg/gün', 'Glukoz: 50–100 g/gün'], lh: 24,
        });
      }
      return S.kutu(16, 22, 296, 176, {
        dolgu: 'paper', renk: 'line',
        yazi: ['Kompartıman İyonları', 'İCS: Na⁺ 10 · K⁺ 150 mmol/L', 'İnterstisyel: Na⁺ 140 · K⁺ 4'], lh: 28,
      }) + S.kutu(328, 22, 296, 176, {
        dolgu: 'accent-soft', renk: 'accent',
        yazi: ['Günlük Gereksinimler', 'Su: 25–30 mL/kg/gün', 'Na⁺, K⁺, Cl⁻: 1 mmol/kg/gün', 'Glukoz: 50–100 g/gün'], lh: 27,
      });
    },
  });

  const starlingVeri = {
    'Geleneksel Starling': {
      renk: 'basic',
      yol: 'Arteriyol çıkış → Venöz geri emilim',
      alt: ['Arteriyol: dışarı · Venül: geri emilim', 'Kolloid πc artışı geri emilimi destekler'],
      metin: 'Geleneksel modele göre net sıvı akışı arteriyoler uçta interstisyuma, venöz uçta ise geri kapiller içine doğrudur. [[K3 s. 313–314]]',
    },
    'Revize (Övolemi)': {
      renk: 'warn',
      yol: 'Emilim olmaması kuralı · Lenfatik',
      alt: ['πsg, πi’nin yerini alır (emilim yok)', 'Övolemide infüzyon Pc ↑ → Jv dışarı'],
      metin: 'Revize modele göre venöz uçta bile geri emilim olmaz; övolemide Jv tamamen Pc’ye bağlıdır ve kolloid de sıvıyı dışarı iter. [[K3 s. 314]]',
    },
    'Hipovolemi / İndüksiyon': {
      renk: 'ok',
      yol: 'Pc düşük → Jv ≈ 0 (V₁ → V₂ ↓)',
      alt: ['Pc, πc – πsg üzerine çıkmaz', 'Anestezide V₁→V₂ ↓, etki daha uzun'],
      metin: 'Hipovolemide ve anestezi indüksiyonunda Pc düştüğünden V₁’den V₂’ye sıvı geçişi azalır veya geçici olarak tamamen durabilir. [[K3 s. 314–315]]',
    },
  };
  VIZ.a21a_starling = (el) => SEKIL.sahne(el, {
    baslik: 'Geleneksel ve revize Starling modelleri ile hacim kinetiği',
    vb: [640, 214], vbDar: [360, 250],
    secenek: secim('Model / Durum', Object.keys(starlingVeri)),
    metin: p => starlingVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = starlingVeri[secili], W = S.w;
      return S.kutu(14, 14, W - 28, 66, { dolgu: v.renk + '-soft', renk: v.renk, yazi: [secili, v.yol], lh: 22 })
        + S.kutu(14, 96, W - 28, S.dar ? 138 : 102, { dolgu: 'paper', renk: 'line', yazi: v.alt, lh: 26 });
    },
  });

  const krisVeri = {
    '%0,9 NaCl': {
      renk: 'warn', na: 154, cl: 154, ozm: '308 mOsm/L · 286 mOsm/kg',
      ek: ['K⁺ 0 · Ca²⁺ 0 · pH 4,5–7,0', 'Plazmadan ~%50 fazla Cl⁻ · Asidoz'],
      metin: '%0,9 NaCl 154 mmol/L Na⁺ ve Cl⁻ içerir; sağlıklı gönüllülerde hiperkloremik metabolik asidoz, renal vazokonstriksiyon ve GFH düşüşü göstermiştir. [[K3 s. 315–316]]',
    },
    Hartmann: {
      renk: 'ok', na: 131, cl: 111, ozm: '278 mOsm/L · 256 mOsm/kg',
      ek: ['K⁺ 5 · Ca²⁺ 2 · Laktat 29 · pH 5–7', 'İn vivo hipotonik (256 mOsm/kg)'],
      metin: 'Hartmann çözeltisi 29 mmol/L laktat ve 2 mmol/L Ca²⁺ içerir; etkin in vivo ozmolalitesi 256 mOsm/kg ile hipotoniktir. [[K3 s. 316]] [[K3 s. 318]]',
    },
    'Plasma-lyte': {
      renk: 'basic', na: 140, cl: 98, ozm: '295 mOsm/L · 271 mOsm/kg',
      ek: ['K⁺ 5 · Mg²⁺ 1,5 · Ca²⁺ 0 · pH 7,4', 'Asetat 27 + Glukonat 23 mmol/L'],
      metin: 'Plasma-lyte 140 mmol/L Na⁺, 98 mmol/L Cl⁻, 27 mmol/L asetat ve 23 mmol/L glukonat içerir; Ca²⁺ içermez. [[K3 s. 316]]',
    },
    '%5 Glukoz': {
      renk: 'accent', na: 0, cl: 0, ozm: '278 mOsm/L · 0 mOsm/kg',
      ek: ['Glukoz 278 mmol/L · pH 3,5–5,5', 'Glukoz yıkılır → su TVS’ye dağılır'],
      metin: '%5 glukoz 278 mmol/L glukoz içerir; glukoz hızla metabolize edildiğinden etkin ozmolalitesi 0 mOsm/kg’dır ve su toplam vücut suyuna dağılır. [[K3 s. 316]] [[K3 s. 318]]',
    },
  };
  VIZ.a21a_kristalloid = (el) => SEKIL.sahne(el, {
    baslik: 'Başlıca kristalloidlerin iyon ve tonisite karşılaştırması',
    vb: [640, 214], vbDar: [360, 250],
    secenek: secim('Çözelti', Object.keys(krisVeri)),
    metin: p => krisVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = krisVeri[secili], W = S.w;
      return S.kutu(14, 14, W - 28, 70, {
        dolgu: v.renk + '-soft', renk: v.renk,
        yazi: [`Na⁺ ${v.na} · Cl⁻ ${v.cl} mmol/L`, v.ozm], lh: 23,
      }) + S.kutu(14, 100, W - 28, S.dar ? 134 : 98, { dolgu: 'paper', renk: 'line', yazi: v.ek, lh: 25 });
    },
  });

  const anyonVeri = {
    Laktat: {
      renk: 'ok', hiz: 'Normal KC: 100 mmol/saat’e kadar',
      nokta: ['70 kg’da birikmeden ≤4 L verilebilir', 'CO₂ / glukoneogenez · İşlevsel KC şart', 'O₂ tüketimi ↑ · Asidemi eşlik etmez'],
      metin: 'Laktatlı Ringer / Hartmann içindeki laktat normal karaciğerde 100 mmol/saat’e kadar metabolize edilir; hipoperfüzyon belirtecini karıştırabilir. [[K3 s. 317]]',
    },
    Asetat: {
      renk: 'basic', hiz: 'KC içi/dışı: 300 mmol/saat’e kadar',
      nokta: ['L-laktattan üç kat hızlı · Alkalileştirici', 'Diyalizde kardiyotoksik (Avustralya)', 'Perioperatif/YBÜ zarar kanıtı çok az'],
      metin: 'Asetat hem karaciğer içi hem dışında L-laktattan üç kat hızlı bikarbonata dönüşür. [[K3 s. 317]]',
    },
    Glukonat: {
      renk: 'warn', hiz: 'Akıbeti hakkında daha az şey bilinir',
      nokta: ['Bikarbonat öncülü olarak tanımlanır', 'Çoğu değişmeden idrarla atılır görünür', 'Ozmotik diüretik olabilir (belirsiz)'],
      metin: 'Glukonat bikarbonat öncülü sayılsa da çoğunun değişmeden idrarla atıldığı ve ozmotik diüretik olabileceği görülmektedir. [[K3 s. 317]]',
    },
  };
  VIZ.a21a_anyon = (el) => SEKIL.sahne(el, {
    baslik: 'Dengeli çözeltilerdeki bikarbonat öncülü anyonlar',
    vb: [640, 214], vbDar: [360, 256],
    secenek: secim('Anyon', Object.keys(anyonVeri)),
    metin: p => anyonVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = anyonVeri[secili], W = S.w;
      return S.kutu(14, 14, W - 28, 58, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.hiz })
        + S.kutu(14, 88, W - 28, S.dar ? 152 : 112, { dolgu: 'paper', renk: 'line', yazi: v.nokta, lh: S.dar ? 25 : 27 });
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

  VIZ.a21a_tonisite = (el) => SEKIL.adim(el, zincir('Ozmolarite ile etkin in vivo tonisite farkı', [
    { ad: 'Tanımlar', satir: ['Ozmolarite (L) ≠ Ozmolalite (kg)', 'Tonisite: zara göre etkin ozmolalite'], metin: 'Ozmolarite çözelti litresi başına, ozmolalite çözücü kg başına ozmoldür; tonisite ise zar boyunca etkin ozmolalitedir. [[K3 s. 318]]' },
    { ad: '%0,9 NaCl', satir: ['308 mOsm/L → Etkin 286 mOsm/kg', 'İn vivo izotonik (plazma 275–295)'], metin: 'İyonların tam ayrışmaması nedeniyle %0,9 NaCl’nin etkin ozmolalitesi 286 mOsm/kg’dır; “hipertonik” tanımı yanlıştır. [[K3 s. 318]]' },
    { ad: '%5 Glukoz', satir: ['278 mOsm/L → Etkin 0 mOsm/kg', 'Glukoz hızla yıkılır → Su TVS’ye'], metin: 'Glukoz hızla metabolize edildiğinden etkin ozmolalite 0’dır; %0,18 NaCl + %4 glukoz çocuklarda hiponatremi nedeniyle önerilmez. [[K3 s. 316]] [[K3 s. 318]]' },
    { ad: 'Dengeliler', satir: ['Etkin 256–271 → İn vivo hipotonik', 'Beyin hasarı / nöroşirürjide ödem'], metin: 'Dengeli çözeltilerin hesaplanan ozmolaritesi plazma aralığında olsa da in vivo hipotoniktirler ve serebral ödeme yol açabilirler. [[K3 s. 316]] [[K3 s. 318]]' },
  ]));
})();
