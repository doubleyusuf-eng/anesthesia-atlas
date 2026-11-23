/* Bölüm 86 · Obezite fizyolojisi — SEKIL kiti bileşenleri */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const REF = window.REF || ((s) => s);

  /* 1) Etkileşimli VKİ ve DSÖ sınıfı hesaplayıcısı */
  VIZ.f86_bmi = (el) => SEKIL.sahne(el, {
    vb: [640, 260], vbDar: [380, 320],
    baslik: 'DSÖ VKİ sınıflaması etkileşimli hesaplayıcı',
    param: [
      { id: 'kg', ad: 'Ağırlık', min: 45, max: 165, adim: 1, deger: 100, birim: 'kg' },
      { id: 'cm', ad: 'Boy', min: 150, max: 200, adim: 1, deger: 170, birim: 'cm' },
    ],
    ciz: (S, t, p) => {
      const bmi = p.kg / Math.pow(p.cm / 100, 2);
      const bStr = bmi.toFixed(1).replace('.', ',');
      let sinif = 'Sağlıklı ağırlık', col = 'ok';
      if (bmi < 18.5) { sinif = 'Zayıf (<18,5)'; col = 'basic'; }
      else if (bmi < 25) { sinif = 'Sağlıklı ağırlık (18,5–24,9)'; col = 'ok'; }
      else if (bmi < 30) { sinif = 'Fazla kilolu (25,0–29,9)'; col = 'warn'; }
      else if (bmi < 35) { sinif = 'Obezite Sınıf I (30,0–34,9)'; col = 'warn'; }
      else if (bmi < 40) { sinif = 'Obezite Sınıf II (35,0–39,9)'; col = 'crit'; }
      else { sinif = 'Obezite Sınıf III (>40,0)'; col = 'crit'; }

      const cx = S.w / 2, bw = S.dar ? 340 : 540, bx = cx - bw / 2;
      let s = '';
      s += S.kutu(bx, 18, bw, 76, { dolgu: col + '-soft', renk: col, r: 12, yazi: [`VKİ = ${bStr} kg/m²`, sinif], yc: 'b', lh: 24 });

      const yBar = 122, minB = 15, maxB = 50;
      const segs = [
        [15, 18.5, 'basic-soft', 'basic'],
        [18.5, 25, 'ok-soft', 'ok'],
        [25, 30, 'warn-soft', 'warn'],
        [30, 35, 'warn-soft', 'warn'],
        [35, 40, 'crit-soft', 'crit'],
        [40, 50, 'crit-soft', 'crit'],
      ];
      segs.forEach(([a, b, d, r]) => {
        const x1 = bx + ((a - minB) / (maxB - minB)) * bw;
        const x2 = bx + ((b - minB) / (maxB - minB)) * bw;
        s += S.kutu(x1, yBar, x2 - x1, 24, { dolgu: d, renk: r, r: 3 });
      });
      const px = bx + (S.clamp(bmi, minB, maxB) - minB) / (maxB - minB) * bw;
      s += S.cizgi([[px, yBar - 8], [px, yBar + 32]], { renk: 'ink', w: 3 });
      [18.5, 25, 30, 35, 40].forEach((v) => {
        const vx = bx + ((v - minB) / (maxB - minB)) * bw;
        s += S.t(vx, yBar + 46, String(v).replace('.', ','), { a: 'middle', c: 'k m' });
      });
      s += S.rozet(cx, S.dar ? 236 : 216, S.dar ? 'Doğal bağışıklık → TNF-α ve IL-6 ↑' : 'Obezite → doğal bağışıklık uyarımı → TNF-α ve IL-6 (düşük dereceli inflamasyon)', { dolgu: 'accent-soft', renk: 'accent', w: S.dar ? 310 : 515 });
      return s;
    },
    metin: (p) => {
      const bmi = p.kg / Math.pow(p.cm / 100, 2);
      const bStr = bmi.toFixed(1).replace('.', ',');
      const sinif = bmi < 18.5 ? 'Zayıf' : bmi < 25 ? 'Sağlıklı ağırlık' : bmi < 30 ? 'Fazla kilolu' : bmi < 35 ? 'Obezite Sınıf I' : bmi < 40 ? 'Obezite Sınıf II' : 'Obezite Sınıf III';
      return REF(`<b>VKİ ${bStr} kg/m² · ${sinif}.</b> Ağırlık (${p.kg} kg) ve boy (${p.cm} cm) değerlerini değiştirerek DSÖ obezite sınıflarını inceleyin. [[K1 s. 427]]`);
    },
  });

  /* 2) Solunum, sol kalp ve sağ kalp / VTE */
  VIZ.f86_solkvs = (el) => SEKIL.sahne(el, {
    vb: [640, 270], vbDar: [380, 340], hareket: true, sure: 6,
    baslik: 'Obezitede solunum ve kardiyovasküler değişiklikler',
    secenek: {
      id: 's', ad: 'Sistem',
      liste: [
        { d: 'sol', ad: 'Solunum ve desatürasyon' },
        { d: 'solk', ad: 'Sol kalp ve koroner' },
        { d: 'sagk', ad: 'Sağ kalp ve VTE' },
      ],
    },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 520, bx = cx - bw / 2;
      const rows = p.s === 'sol'
        ? [
            ['FRC ↓ + Toraks kompliyansı ↓', S.dar ? 'CC > FRC → atelektazi · V̇/Q̇ ↓' : 'CC > FRC → atelektazi ve V̇/Q̇ uyumsuzluğu · solunum işi ↑', 'crit'],
            ['O₂ tüketimi ↑ + CO₂ üretimi ↑', S.dar ? 'Hızlı desatürasyon → HFNO ile pre-O₂' : 'İndüksiyonda hızlı desatürasyon → preoksijenasyon (HFNO)', 'warn'],
            ['OSA ve 2× astım riski', S.dar ? 'Baş yükseltici yastık kritik' : 'Üst hava yolu kollapsı ve zor laringoskopi → baş yükseltici yastık', 'basic'],
          ]
        : p.s === 'solk'
          ? [
              ['Kan hacmi ↑ · Atım hacmi ↑ → CO ↑', 'Artmış doku kütlesi ve metabolik gereksinime uyum', 'basic'],
              ['Sistemik HT + SV ↑ → LV hipertrofisi', 'Sol ventrikül iş yükü belirgin artar', 'crit'],
              ['İskemik kalp hastalığı (HT, DM, dislipidemi)', S.dar ? 'Hareketsizlik belirtileri maskeler' : 'Belirgin koroner darlık belirtileri hareketsizlikle maskelenebilir', 'warn'],
            ]
          : [
              ['Hipoksemi/hiperkapni (OSA, V̇/Q̇) → HPV', 'Pulmoner vasküler direnç ve pulmoner arter basıncı ↑', 'warn'],
              ['Pulmoner hipertansiyon → Kor pulmonale', 'Sağ ventrikül iş yükü ↑ → RV hipertrofisi ve yetmezliği', 'crit'],
              ['Venöz tromboembolizm (VTE) riski ↑', S.dar ? 'İntra-/postop aralıklı baldır kompresyonu' : 'Hasta hareketlenene dek intra- ve postoperatif aralıklı baldır kompresyonu', 'ok'],
            ];
      let s = '';
      rows.forEach(([h, sub, col], i) => {
        const y = 20 + i * (S.dar ? 96 : 76);
        s += S.kutu(bx, y, bw, S.dar ? 82 : 64, { dolgu: col + '-soft', renk: col, r: 10, yazi: [h, sub], yc: 'b k', lh: 20 });
      });
      return s;
    },
    metin: (p) => {
      if (p.s === 'sol') return REF('<b>Solunum ve hızlı desatürasyon.</b> Artmış O₂ tüketimi ve azalmış FRC (CC > FRC) birleşerek indüksiyonda hızlı desatürasyona yol açar; preoksijenasyonda yüksek akımlı nazal oksijen (HFNO) öne çıkar. [[K1 s. 427]]');
      if (p.s === 'solk') return REF('<b>Sol kalp ve koroner.</b> Artmış SV ile CO yükselir, sistemik hipertansiyonla LVH gelişir ve fiziksel hareketsizlik belirgin koroner darlığı maskeleyebilir. [[K1 s. 427–428]]');
      return REF('<b>Sağ kalp ve VTE.</b> HPV pulmoner hipertansiyon ve kor pulmonaleye ilerleyebilir; artan VTE riski için hasta hareketlenene dek aralıklı baldır kompresyonu gerekir. [[K1 s. 428]]');
    },
  });

  /* 3) Leptin döngüsü, direnci ve pratik zorluklar */
  VIZ.f86_leptin = (el) => SEKIL.sahne(el, {
    vb: [640, 250], vbDar: [380, 310],
    baslik: 'Leptin negatif geri bildirim döngüsü ve obezitede leptin direnci',
    secenek: { id: 'm', ad: 'Durum', liste: [{ d: 'norm', ad: 'Normal leptin döngüsü' }, { d: 'obez', ad: 'Obezitede leptin direnci' }, { d: 'pratik', ad: 'Pratik ve monitörizasyon' }] },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 500, bx = cx - bw / 2;
      if (p.m === 'norm') {
        return S.kutu(bx, 22, bw, 56, { dolgu: 'basic-soft', renk: 'basic', yazi: 'Yağ hücreleri (adipositler) → Leptin salgısı ↑', yc: 'b k' })
          + S.ok([[cx, 80], [cx, 114]], { renk: 'ok', w: 2.2 })
          + S.kutu(bx, 118, bw, S.dar ? 66 : 58, { dolgu: 'ok-soft', renk: 'ok', yazi: S.dar ? ['Hipotalamus: açlığı baskılar (tokluk)', 'Yağ deposu dengede kalır'] : 'Hipotalamus: açlığı baskılar (tokluk) → yağ deposu dengede', yc: 'b k', lh: 19 })
          + S.rozet(cx, S.dar ? 236 : 214, S.dar ? 'Baskılayan: leptin, CCK · Uyaran: ghrelin' : 'İştah baskılayan: leptin, CCK · İştah uyaran: ghrelin (bağırsak)', { dolgu: 'accent-soft', renk: 'accent', w: S.dar ? 320 : 440 });
      }
      if (p.m === 'obez') {
        return S.kutu(bx, 22, bw, 56, { dolgu: 'warn-soft', renk: 'warn', yazi: 'Artmış yağ kütlesi → Paradoksal YÜKSEK leptin', yc: 'b k' })
          + S.ok([[cx, 80], [cx, 114]], { renk: 'crit', w: 2.2, kesik: true })
          + S.kutu(bx, 118, bw, 62, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Hipotalamus dolaşımdaki leptine DİRENÇLİ', 'Tokluk hissi oluşmaz → aşırı enerji alımı sürer'], yc: 'b k', lh: 19 });
      }
      return S.kutu(bx, 20, bw, 64, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Damar yolu, rejyonal/cerrahi erişim ve turnike zor', 'Üst kol NIBP güvenilmez → ön kol/baldır veya arter hattı'], yc: 'b k', lh: 19 })
        + S.kutu(bx, 106, bw, 68, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Pozisyon ve transfer için daha çok personel', 'Entübasyon yastığı · havalı yatak · bariatrik masa/yatak'], yc: 'b k', lh: 19 });
    },
    metin: (p) => {
      if (p.m === 'norm') return REF('<b>Normal leptin döngüsü.</b> Yağ hücreleri arttıkça salgılanan leptin hipotalamusta açlığı baskılayıp yağ depolarını dengede tutar. [[K1 s. 428]]');
      if (p.m === 'obez') return REF('<b>Obezitede leptin direnci.</b> Dolaşımdaki leptin paradoksal olarak yüksektir, ancak hipotalamus leptine direnç geliştirdiği için tokluk hissi oluşturamaz. [[K1 s. 428]]');
      return REF('<b>Pratik ve monitörizasyon.</b> Üst kol manşonu güvenilmezse ön kol/baldır manşonu veya invaziv arter hattı kullanılır; pozisyon ve transfer için ek personel ve bariatrik donanım gerekir. [[K1 s. 428]]');
    },
  });

  /* 4) Farmakokinetik (4 adım) */
  VIZ.f86_pk = (el) => SEKIL.adim(el, {
    vb: [640, 240], vbDar: [380, 290], hareket: false, oto: false,
    baslik: 'Obezitede emilim, dağılım, metabolizma ve volatiller',
    adimlar: [
      {
        ad: 'Emilim',
        metin: REF('Mide boşalması hızlanabilir ya da yavaşlayabilir; zayıf kanlanma nedeniyle cilt altı emilim azalır; kısa iğnelerle İM uygulama başarısız olabilir ve İV erişim güçleşir. [[K1 s. 428]]'),
        ciz: (S) => {
          if (S.dar) {
            const items = [
              ['Oral · Mide', 'Mide boşalması ↑ veya ↓', 'warn'],
              ['Cilt altı (SC)', 'Zayıf kanlanma → emilim ↓', 'basic'],
              ['Kas içi (İM)', 'Kısa iğneyle başarısız olabilir', 'crit'],
              ['İntravenöz (İV)', 'Damar yolu erişimi zor', 'accent'],
            ];
            return items.map(([bas, alt, col], i) => {
              const y = 16 + i * 66;
              return S.kutu(20, y, 340, 56, { dolgu: col + '-soft', renk: col, r: 10, yazi: [bas, alt], yc: 'b k', lh: 19 });
            }).join('');
          }
          return S.kutu(28, 22, 282, 88, { dolgu: 'warn-soft', renk: 'warn', r: 10, yazi: ['Oral · Mide', 'Mide boşalması ↑ veya ↓'], yc: 'b k', lh: 22 })
            + S.kutu(330, 22, 282, 88, { dolgu: 'basic-soft', renk: 'basic', r: 10, yazi: ['Cilt altı (SC)', 'Zayıf kanlanma → emilim ↓'], yc: 'b k', lh: 22 })
            + S.kutu(28, 128, 282, 88, { dolgu: 'crit-soft', renk: 'crit', r: 10, yazi: ['Kas içi (İM)', 'Kısa iğneyle başarısız olabilir'], yc: 'b k', lh: 22 })
            + S.kutu(330, 128, 282, 88, { dolgu: 'accent-soft', renk: 'accent', r: 10, yazi: ['İntravenöz (İV)', 'Damar yolu erişimi zor'], yc: 'b k', lh: 22 });
        },
      },
      {
        ad: 'Dağılım ve doz',
        metin: REF('Lipofilik boluslarda (midazolam, fentanil, propofol, tiyopental) IBW/LBM, hidrofilik nondepolarizanlarda LBM kullanılır; süksametonyum TBW ile dozlanır ve remifentanil PK\'si benzerdir. [[K1 s. 428–429]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 520, bx = cx - bw / 2;
          return S.kutu(bx, 20, bw, 64, { dolgu: 'basic-soft', renk: 'basic', yazi: S.dar ? ['Lipofilik bolus → IBW veya LBM', '(propofol, fentanil, midazolam)'] : ['Lipofilik bolus (propofol, fentanil, midazolam, tiyopental)', 'Vd ↑ → TBW yerine IBW veya LBM'], yc: 'b k', lh: 19 })
            + S.kutu(bx, 102, bw, 68, { dolgu: 'ok-soft', renk: 'ok', yazi: S.dar ? ['Nondepolarizan (hidrofilik) → LBM', 'Süksametonyum TBW · remi benzer'] : ['Hidrofilik nondepolarizan → LBM', 'İstisna: süksametonyum TBW · remifentanil PK benzer'], yc: 'b k', lh: 19 });
        },
      },
      {
        ad: 'Metabolizma ve atılım',
        metin: REF('Karaciğer yağlanması hepatik klirensi artırabilir veya azaltabilir; diyabetik/hipertansif nefropati gibi eşlik eden hastalıklar böbrek atılımını etkiler. [[K1 s. 429]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 500, bx = cx - bw / 2;
          return S.kutu(bx, 24, bw, 60, { dolgu: 'warn-soft', renk: 'warn', yazi: 'Yağlı karaciğer infiltrasyonu → hepatik klirens ↑ veya ↓', yc: 'b k' })
            + S.kutu(bx, 104, bw, 60, { dolgu: 'crit-soft', renk: 'crit', yazi: 'Diyabetik / hipertansif nefropati → renal atılım bozulabilir', yc: 'b k' });
        },
      },
      {
        ad: 'Volatiller',
        metin: REF('Volatil anesteziklerde derlenme süresi obez ve obez olmayan hastalarda benzerdir; en az lipofilik olan desfluran en lipofilik izoflurana karşı yalnız küçük bir üstünlük taşır. [[K1 s. 429]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 500, bx = cx - bw / 2;
          return S.kutu(bx, 34, bw, 88, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Obez ve obez olmayanda derlenme süresi benzer', 'Desfluran (en az lipofilik) vs izofluran: yalnız küçük üstünlük'], yc: 'b k', lh: 22 });
        },
      },
    ],
  });

  /* 5) TCI modelleri: James LBM formülünün yüksek VKİ'de paradoksal düşüşü */
  VIZ.f86_tci = (el) => SEKIL.grafik(el, {
    vb: [640, 310], vbDar: [380, 330],
    baslik: 'Schnider ve Minto TCI modellerinde James LBM formülünün yüksek VKİ davranışı',
    secenek: { id: 'c', ad: 'Cinsiyet (James LBM)', liste: [{ d: 'e', ad: 'Erkek (eşik VKİ 42)' }, { d: 'k', ad: 'Kadın (eşik VKİ 37)' }] },
    x: { min: 20, max: 56, ad: 'VKİ (kg/m²)', adimlar: [20, 30, 37, 42, 50, 56] },
    y: { min: 30, max: 85, ad: 'Hesaplanan LBM (kg)', adimlar: [30, 45, 60, 75] },
    dikey: (p) => [p.c === 'e' ? { x: 42, ad: 'VKİ 42 (E)', renk: 'crit' } : { x: 37, ad: 'VKİ 37 (K)', renk: 'crit' }],
    egriler: [
      {
        renk: 'accent', w: 3, ad: 'James LBM (erkek, 175 cm)', adYer: 0.34,
        goster: (p) => p.c === 'e',
        f: (bmi) => { const h = 1.75, w = bmi * h * h; return 1.1 * w - 128 * Math.pow(w / 175, 2); },
      },
      {
        renk: 'clin', w: 3, ad: 'James LBM (kadın, 165 cm)', adYer: 0.3,
        goster: (p) => p.c === 'k',
        f: (bmi) => { const h = 1.65, w = bmi * h * h; return 1.07 * w - 148 * Math.pow(w / 165, 2); },
      },
    ],
    ek: (S, p, X, Y) => S.rozet(X(S.dar ? 40 : 45), Y(40), S.dar ? 'LBM ↓ → Schnider aşırı / Minto eksik doz' : 'Paradoksal LBM ↓ → Schnider (propofol aşırı doz) · Minto (remi eksik doz)', { dolgu: 'crit-soft', renk: 'crit', w: S.dar ? 275 : 405 }),
    okuma: (p) => REF(p.c === 'e'
      ? '<b>Erkek hasta (eşik VKİ 42 kg/m²).</b> Schnider ve Minto\'nun kullandığı James LBM formülü VKİ 42\'ye kadar doğru çalışır, üstünde paradoksal düşer: Schnider propofolde aşırı doza, Minto remifentanilde eksik doza gider. [[K1 s. 429]]'
      : '<b>Kadın hasta (eşik VKİ 37 kg/m²).</b> James LBM formülü kadınlarda VKİ 37 üzerinde paradoksal olarak düşmeye başlar; güvenli TIVA için Schnider ve Minto işlenmiş EEG ile titre edilmelidir. [[K1 s. 429]]'),
  });
})();
