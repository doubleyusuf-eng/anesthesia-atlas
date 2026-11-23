/* Bölüm 83 · Fetal fizyoloji — SEKIL kiti bileşenleri */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const REF = window.REF || ((s) => s);

  /* 1) Plasenta mimarisi, işlevleri ve preeklampsi (4 adım) */
  VIZ.f83_plasenta = (el) => SEKIL.adim(el, {
    vb: [640, 270], vbDar: [380, 320], hareket: false, oto: false,
    baslik: 'Plasentanın yapısı, işlevleri ve preeklampsi',
    adimlar: [
      {
        ad: 'Yapı ve kan akımı',
        metin: REF('Maternal desidua ile fetal koryon (sinsityo- ve sitotrofoblast) birleşir; 2 umblikal arter villuslara gider, 1 umblikal ven döner; termde uterus akımı 750 mL/dk\'dır (~%85 plasenta). [[K1 s. 411]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 520, bx = cx - bw / 2;
          let s = '';
          s += S.kutu(bx, 22, bw, 62, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Anne · Desidua ve spiral arterler', 'Termde 750 mL/dk (10×) · ~%85 plasenta'], yc: 'b k', lh: 19 });
          s += S.rozet(cx, 114, S.dar ? 'Koryon bariyeri (kan karışmaz)' : 'Fetal endotel + 2 koryonik katman (kan karışmaz)', { dolgu: 'paper', renk: 'muted', w: S.dar ? 280 : 370 });
          s += S.kutu(bx, 144, bw, 72, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Fetüs · Koryonik villuslar (kalp 5. haftada başlar)', '2 umblikal arter → villus kapillerleri → 1 umblikal ven'], yc: 'b k', lh: 19 });
          return s;
        },
      },
      {
        ad: 'Endokrin görev',
        metin: REF('Sinsityotrofoblast hücreleri hem peptit hem steroit hormon sentezler: β-hCG, hPL, östrojen ve progesteron. [[K1 s. 411]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 336 : 480, bx = cx - bw / 2;
          let s = '';
          s += S.kutu(bx, 26, bw, 54, { dolgu: 'basic-soft', renk: 'basic', yazi: 'Sinsityotrofoblast (plasental endokrin hücreler)', yc: 'b k' });
          s += S.ok([[cx, 82], [cx, 118]], { renk: 'basic', w: 2 });
          if (!S.dar) {
            s += S.kutu(bx, 122, 228, 72, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Peptit hormonlar', 'β-hCG · hPL'], yc: 'b k', lh: 20 });
            s += S.kutu(bx + bw - 228, 122, 228, 72, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Steroit hormonlar', 'Östrojen · Progesteron'], yc: 'b k', lh: 20 });
          } else {
            s += S.kutu(bx, 122, bw, 58, { dolgu: 'accent-soft', renk: 'accent', yazi: 'Peptitler: β-hCG · hPL', yc: 'b k' });
            s += S.kutu(bx, 194, bw, 58, { dolgu: 'ok-soft', renk: 'ok', yazi: 'Steroitler: Östrojen · Progesteron', yc: 'b k' });
          }
          return s;
        },
      },
      {
        ad: 'İmmün tolerans ve IgG',
        metin: REF('Trofoblastlar MHC kaybı ve mukoprotein örtüyle gizlenir; fetal bağışıklık doğumdan 6 ay sonra olgunlaşır; fetüs yalnız plasentayı geçebilen maternal IgG\'ye dayanır (RhD hemolizi, geçici MG, anti-Ro kalp bloğu riski). [[K1 s. 412]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 520, bx = cx - bw / 2;
          let s = '';
          s += S.kutu(bx, 22, bw, 68, { dolgu: 'ok-soft', renk: 'ok', yazi: ['İmmün tolerans', 'MHC ↓ + mukoprotein örtü + koryon bariyeri'], yc: 'b k', lh: 19 });
          s += S.kutu(bx, 108, bw, 68, { dolgu: 'clin-soft', renk: 'clin', yazi: ['Yalnız IgG geçer (endositoz)', 'Fetal bağışıklık doğumdan 6 ay sonra olgunlaşır'], yc: 'b k', lh: 19 });
          s += S.rozet(cx, 212, S.dar ? 'Risk: anti-RhD · anti-AChR · anti-Ro' : 'Klinik risk: anti-RhD (hemoliz) · anti-AChR (MG) · anti-Ro (kalp bloğu)', { dolgu: 'crit-soft', renk: 'crit', w: S.dar ? 315 : 490 });
          return s;
        },
      },
      {
        ad: 'Preeklampsi',
        metin: REF('Olası patogenez: spiral arter işlev bozukluğu → hipoksik sinsityotrofoblasttan sitokin, eikozanoit, sVEGFR-1 salınımı ve apoptoz → yaygın maternal endotel/organ hasarı; tek kesin tedavi doğumdur. [[K1 s. 411–412]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 500, bx = cx - bw / 2;
          let s = '';
          s += S.kutu(bx, 18, bw, 46, { dolgu: 'warn-soft', renk: 'warn', yazi: 'Spiral arter işlev bozukluğu (plasental hipoksi)', yc: 'b k' });
          s += S.ok([[cx, 66], [cx, 88]], { renk: 'crit', w: 2 });
          s += S.kutu(bx, 90, bw, 52, { dolgu: 'crit-soft', renk: 'crit', yazi: S.dar ? 'Sitokin · eikozanoit · sVEGFR-1 ↑' : 'Sitokinler · eikozanoitler · sVEGFR-1 salınımı ve apoptoz ↑', yc: 'b k' });
          s += S.ok([[cx, 144], [cx, 166]], { renk: 'crit', w: 2 });
          s += S.kutu(bx, 168, bw, 50, { dolgu: 'crit-soft', renk: 'crit', yazi: 'Maternal endotel hasarı · HT + proteinüri · HELLP', yc: 'b k' });
          s += S.rozet(cx, 248, 'Tek kesin tedavi: plasentanın doğurtulması', { dolgu: 'ok-soft', renk: 'ok', w: 325 });
          return s;
        },
      },
    ],
  });

  /* 2) Plasental geçiş ve ilaçlar */
  VIZ.f83_transfer = (el) => SEKIL.sahne(el, {
    vb: [640, 290], vbDar: [380, 360], hareket: true, sure: 6,
    baslik: 'Plasentadan besin, antikor ve ilaç taşınması',
    secenek: {
      id: 'm', ad: 'Odak',
      liste: [
        { d: 'besin', ad: '5 geçiş mekanizması' },
        { d: 'ilac', ad: 'Anestezik ilaçlar' },
        { d: 'tuzak', ad: 'İyon tuzağı ve norpetidin' },
      ],
    },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 540, bx = cx - bw / 2;
      let s = '';
      if (p.m === 'besin') {
        const rows = [
          ['Basit difüzyon', 'O₂, CO₂ (konsantrasyon gradyanı)', 'ok'],
          ['Kolaylaştırılmış difüzyon', 'Glukoz (insülin bağımsız GLUT-1, GLUT-3)', 'accent'],
          ['Aktif taşıma', 'Amino asitler (Na⁺ bağımlı; serin → glisin)', 'basic'],
          ['Transsitoz / Kitle akışı', 'IgG (vesikül) · Su ve çözünenler (ozmotik)', 'clin'],
        ];
        rows.forEach(([h, sub, col], i) => {
          const y = 18 + i * (S.dar ? 78 : 64);
          s += S.kutu(bx, y, bw, S.dar ? 68 : 54, { dolgu: col + '-soft', renk: col, r: 10, yazi: [h, sub], yc: 'b k', lh: 19 });
        });
      } else if (p.m === 'ilac') {
        s += S.kutu(bx, 18, bw, 56, { dolgu: 'basic-soft', renk: 'basic', yazi: S.dar ? 'Anne · <500 Da · yüksüz · lipofilik geçer' : 'Anne dolaşımı (<500 Da · yüksüz · lipofilik · düşük protein bağlanma)', yc: 'b k' });
        s += S.kutu(bx, 102, bw, 28, { dolgu: 'paper', renk: 'line', kesik: true, yazi: 'Lipitçe zengin plasenta bariyeri', yc: 'k m' });
        s += S.akis([[cx - 90, 76], [cx - 90, 168]], t, { renk: 'ok', n: 3, hiz: 0.55, r: 4 });
        if (!S.dar) {
          s += S.kutu(bx, 152, 260, 114, { dolgu: 'ok-soft', renk: 'ok', yazi: ['GEÇENLER', 'Atropin · İV anestezikler', 'Opioidler · Lidokain'], yc: 'b k', lh: 22 });
          s += S.kutu(bx + 280, 152, 260, 114, { dolgu: 'crit-soft', renk: 'crit', yazi: ['GEÇMEYENLER (yüklü)', 'Kas gevşeticiler', 'Glikopirolat (NH₄⁺ tuzu)'], yc: 'b k', lh: 22 });
        } else {
          s += S.kutu(bx, 152, bw, 84, { dolgu: 'ok-soft', renk: 'ok', yazi: ['GEÇENLER: Atropin · İV anestezikler', 'Opioidler · Lidokain (düşük bağlanma)'], yc: 'b k', lh: 20 });
          s += S.kutu(bx, 250, bw, 84, { dolgu: 'crit-soft', renk: 'crit', yazi: ['GEÇMEYENLER (yüklü moleküller)', 'Kas gevşeticiler · Glikopirolat'], yc: 'b k', lh: 20 });
        }
      } else {
        s += S.kutu(bx, 20, bw, 60, { dolgu: 'basic-soft', renk: 'basic', yazi: 'Anne: yüksüz lokal anestezik veya petidin', yc: 'b k' });
        s += S.akis([[cx, 82], [cx, 134]], t, { renk: 'warn', n: 3, hiz: 0.55, r: 4.5 });
        s += S.kutu(bx, 138, bw, S.dar ? 104 : 88, { dolgu: 'crit-soft', renk: 'crit', yazi: S.dar ? ['Asidemik fetüs: düşük pH → iyonlaşma', 'Geri difüzyon ✗ (iyon tuzağı)', 'Petidin → norpetidin (birikir)'] : ['Asidemik fetüs: düşük pH lokal anesteziği iyonize eder → geri difüzyon ✗ (iyon tuzağı)', 'Petidin fetüste daha az lipofilik norpetidine döner → geri dönemez, birikir'], yc: 'b k', lh: 21 });
        s += S.rozet(cx, S.dar ? 286 : 256, S.dar ? 'Risk: LA toksisitesi · solunum depresyonu' : 'Sonuç: fetal LA toksisitesi · yenidoğanda solunum depresyonu ve beslenme güçlüğü', { dolgu: 'warn-soft', renk: 'warn', w: S.dar ? 336 : 515 });
      }
      return s;
    },
    metin: (p) => {
      if (p.m === 'besin') return REF('<b>Beş geçiş mekanizması.</b> Gazlar basit difüzyonla, glukoz GLUT-1/3 ile, amino asitler Na⁺ bağımlı aktif taşımayla, IgG transsitozla, su ve küçük çözünenler kitle akışıyla geçer. [[K1 s. 412–413]]');
      if (p.m === 'ilac') return REF('<b>Anestezik ilaçlar.</b> Yüklü kas gevşeticiler ve glikopirolat geçmez; yüksüz atropin, lipofilik İV anestezikler (hızla yeniden dağılır) ve opioidler kolayca geçer. [[K1 s. 413]]');
      return REF('<b>İyon tuzağı ve norpetidin.</b> Asidemik fetüste düşük pH lokal anesteziği iyonize ederek geri difüzyonu engeller; petidinin daha az lipofilik metaboliti norpetidin de fetüste birikir. [[K1 s. 413]]');
    },
  });

  /* 3) HbF vs HbA ayrışma eğrileri ve Çift Bohr etkisi */
  VIZ.f83_gaz = (el) => SEKIL.grafik(el, {
    vb: [640, 310], vbDar: [380, 330],
    baslik: 'HbF ve HbA oksihemoglobin ayrışma eğrileri',
    secenek: { id: 'm', ad: 'Odak', liste: [{ d: 'baz', ad: 'HbF vs HbA (2,3-DPG)' }, { d: 'bohr', ad: 'Çift Bohr (CO₂ geçişi)' }] },
    x: { min: 0, max: 16, ad: 'PO₂ (kPa)', adimlar: [0, 2.7, 6.7, 10, 13.3] },
    y: { min: 0, max: 100, ad: 'Hb O₂ satürasyonu (%)', adimlar: [0, 25, 50, 75, 100] },
    dikey: () => [
      { x: 2.7, ad: 'UA 2,7', renk: 'crit' },
      { x: 6.7, ad: 'İV 6,7', renk: 'basic' },
    ],
    egriler: [
      {
        renk: 'accent', w: 3, ad: 'HbF (solda)', adYer: 0.78,
        f: (x, p) => { const p50 = p.m === 'bohr' ? 2.1 : 2.5; const n = 2.6; return (100 * Math.pow(x, n)) / (Math.pow(x, n) + Math.pow(p50, n)); },
      },
      {
        renk: 'basic', w: 3, ad: 'HbA (sağda)', adYer: 0.58,
        f: (x, p) => { const p50 = p.m === 'bohr' ? 4.3 : 3.6; const n = 2.7; return (100 * Math.pow(x, n)) / (Math.pow(x, n) + Math.pow(p50, n)); },
      },
    ],
    ek: (S, p, X, Y) => (p.m === 'bohr'
      ? S.rozet(X(10.5), Y(26), S.dar ? 'HbF ← sola · HbA → sağa' : 'CO₂ (6,7→4,9 kPa): HbF ← sola, HbA → sağa', { dolgu: 'warn-soft', renk: 'warn', w: S.dar ? 215 : 325 })
      : S.rozet(X(10.5), Y(26), 'Doğumda HbF ~18 g/dL', { dolgu: 'ok-soft', renk: 'ok', w: 195 })),
    okuma: (p) => REF(p.m === 'baz'
      ? '<b>HbF vs HbA.</b> 2,3-DPG maternal HbA\'nın β-globinine bağlanıp eğriyi sağa kaydırırken HbF\'nin γ-globinine zayıf bağlanır; geniş 6,7 → 2,7 kPa PO₂ gradyanıyla O₂ fetüse geçer. [[K1 s. 413–414]]'
      : '<b>Çift Bohr ve çift Haldane.</b> CO₂ fetüsten (6,7 kPa) anneye (4,9 kPa) geçtikçe HbF sola, HbA sağa kayar (çift Bohr); O₂ bırakan HbA daha çok CO₂ alır, O₂ bağlayan HbF CO₂ bırakır (çift Haldane). [[K1 s. 414]]'),
  });

  /* 4) Fetal dolaşım ve üç şant (4 adım) */
  VIZ.f83_dolasim = (el) => SEKIL.adim(el, {
    vb: [640, 300], vbDar: [380, 350], hareket: true, oto: false,
    baslik: 'Fetal dolaşım ve üç şantın yolu',
    adimlar: [
      {
        ad: 'UV ve Duktus Venozus',
        metin: REF('Plasentadan gelen oksijenli kan (PO₂ 4,0–5,0 kPa, satürasyon ~%80–90) %40 fetal karaciğere, %60 duktus venozusla doğrudan IVC\'ye ayrılır. [[K1 s. 415–416]]'),
        ciz: (S, t) => {
          const cx = S.w / 2, bw = S.dar ? 336 : 480, bx = cx - bw / 2;
          let s = '';
          s += S.kutu(cx - 105, 22, 210, 44, { dolgu: 'ok-soft', renk: 'ok', yazi: 'IVC → Sağ atriyum', yc: 'b k' });
          s += S.akis([[cx - 40, 174], [cx - 40, 68]], t, { renk: 'ok', n: 3, hiz: 0.6, r: 4.5 });
          s += S.rozet(cx - (S.dar ? 75 : 105), 120, 'DV: %60 baypas', { dolgu: 'ok-soft', renk: 'ok', w: 145 });
          s += S.kutu(cx + (S.dar ? 22 : 52), 96, S.dar ? 136 : 165, 50, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Karaciğer', '%40 akım'], yc: 'b k', lh: 17 });
          s += S.kutu(bx, 184, bw, 64, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Umblikal ven (plasentadan)', 'PO₂ 4,0–5,0 kPa · Satürasyon ~%80–90'], yc: 'b k', lh: 19 });
          return s;
        },
      },
      {
        ad: 'Östaki kapağı ve FO',
        metin: REF('Sağ atriyumdaki Östaki kapağı DV\'den gelen taze kanı foramen ovale üzerinden sol atriyuma, sol ventriküle ve çıkan aortaya (PaO₂ ~3,5 kPa, %65 → beyin ve kalp) yönlendirir. [[K1 s. 415–416]]'),
        ciz: (S, t) => {
          const cx = S.w / 2;
          let s = '';
          s += S.kutu(cx - 130, 18, 260, 50, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Çıkan aorta → Beyin ve kalp', 'PaO₂ ~3,5 kPa · Satürasyon %65'], yc: 'b k', lh: 18 });
          s += S.kutu(cx - (S.dar ? 156 : 210), 118, S.dar ? 130 : 165, 68, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Sağ atriyum', '(Östaki kapağı)'], yc: 'b k', lh: 18 });
          s += S.kutu(cx + (S.dar ? 26 : 45), 118, S.dar ? 130 : 165, 68, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Sol atriyum', '→ Sol ventrikül'], yc: 'b k', lh: 18 });
          s += S.akis([[cx - 26, 152], [cx + 26, 152]], t, { renk: 'ok', n: 3, hiz: 0.65, r: 4.5 });
          s += S.rozet(cx, 218, 'Foramen ovale (RA → LA)', { dolgu: 'accent-soft', renk: 'accent', w: 230 });
          s += S.ok([[cx + (S.dar ? 90 : 125), 116], [cx + 40, 70]], { renk: 'ok', w: 2.2 });
          return s;
        },
      },
      {
        ad: 'RV, HPV ve Duktus Arteriozus',
        metin: REF('SVC ve alt IVC\'den gelen oksijensiz kan (PO₂ ~2,5 kPa, %40) RV\'den pulmoner artere çıkar; yüksek PVR (HPV) yüzünden yalnız %10\'u akciğerlere, %90\'ı duktus arteriozusla inen aortaya geçer. [[K1 s. 415–416]]'),
        ciz: (S, t) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 500, bx = cx - bw / 2;
          let s = '';
          s += S.kutu(bx, 18, bw, 52, { dolgu: 'basic-soft', renk: 'basic', yazi: 'SVC + koroner sinüs + alt IVC (PO₂ ~2,5 kPa · %40) → RV → PA', yc: 'b k' });
          if (!S.dar) {
            s += S.kutu(bx, 118, 220, 76, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Akciğerler: yalnız %10', 'Yüksek PVR (HPV)'], yc: 'b k', lh: 19 });
            s += S.kutu(bx + bw - 245, 118, 245, 76, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Duktus arteriozus: %90', '→ İnen aorta (PO₂ ~3 kPa, %50)'], yc: 'b k', lh: 19 });
          } else {
            s += S.kutu(bx, 102, bw, 66, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Akciğerler: yalnız %10', '(Yüksek PVR / HPV)'], yc: 'b k', lh: 18 });
            s += S.kutu(bx, 184, bw, 72, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Duktus arteriozus: %90 → İnen aorta', '(PO₂ ~3 kPa · %50 → alt gövde + 2 UA)'], yc: 'b k', lh: 18 });
          }
          s += S.akis([[cx, 72], [cx, S.dar ? 102 : 118]], t, { renk: 'crit', n: 2, hiz: 0.6, r: 4 });
          return s;
        },
      },
      {
        ad: 'Plasentaya dönüş',
        metin: REF('İnen aortadan çıkan en düşük oksijenli kan iki umblikal arterle plasentaya dönerek yeniden oksijenlenir. [[K1 s. 415–416]]'),
        ciz: (S, t) => {
          const cx = S.w / 2, bw = S.dar ? 336 : 480, bx = cx - bw / 2;
          let s = '';
          s += S.kutu(bx, 28, bw, 58, { dolgu: 'crit-soft', renk: 'crit', yazi: 'İnen aorta (PO₂ ~3 kPa · Satürasyon %50)', yc: 'b k' });
          s += S.akis([[cx - 45, 88], [cx - 45, 166]], t, { renk: 'crit', n: 3, hiz: 0.6, r: 4.5 });
          s += S.akis([[cx + 45, 88], [cx + 45, 166]], t, { renk: 'crit', n: 3, hiz: 0.6, r: 4.5 });
          s += S.rozet(cx, 128, '2 umblikal arter (UA)', { dolgu: 'warn-soft', renk: 'warn', w: 200 });
          s += S.kutu(bx, 172, bw, 66, { dolgu: 'ok-soft', renk: 'ok', yazi: ['Plasenta', 'Yeniden oksijenlenme ve CO₂ atılımı'], yc: 'b k', lh: 19 });
          return s;
        },
      },
    ],
  });

  /* 5) KTG: erken vs geç deselerasyon */
  VIZ.f83_kalp = (el) => SEKIL.grafik(el, {
    vb: [640, 310], vbDar: [380, 330],
    baslik: 'Doğumda KTG üzerinde erken ve geç deselerasyon',
    secenek: { id: 'd', ad: 'Deselerasyon', liste: [{ d: 'erken', ad: 'Erken deselerasyon' }, { d: 'gec', ad: 'Geç deselerasyon (tehlikeli)' }] },
    x: { min: 0, max: 120, ad: 'Zaman (saniye)', adimlar: [0, 30, 60, 90, 120] },
    y: { min: 70, max: 170, ad: 'Fetal KH (atım/dk)', adimlar: [80, 110, 140, 160] },
    bolgeler: () => [{ x1: 25, x2: 75, renk: 'warn-soft', ad: 'Uterus kasılması' }],
    yatay: () => [
      { y: 110, ad: 'Alt sınır (110)', renk: 'muted' },
      { y: 160, ad: 'Üst sınır (160)', renk: 'muted' },
    ],
    egriler: [
      {
        renk: 'basic', w: 3, ad: 'Erken (vagal)', adYer: 0.42,
        goster: (p) => p.d === 'erken',
        f: (x) => 140 - 30 * Math.exp(-Math.pow((x - 50) / 14, 2)) + 2.5 * Math.sin(x * 0.6),
      },
      {
        renk: 'crit', w: 3, ad: 'Geç (hipoksi → baroreseptör)', adYer: 0.68,
        goster: (p) => p.d === 'gec',
        f: (x) => 140 - 46 * Math.exp(-Math.pow((x - 80) / 16, 2)) + 1.5 * Math.sin(x * 0.5),
      },
    ],
    okuma: (p) => REF(p.d === 'erken'
      ? '<b>Erken deselerasyon.</b> Kasılma başlangıcından hemen sonra hafif hipoksemi veya fetal baş basısıyla parasempatik kaynaklı kalp hızı düşüşü; sağlıklı fetüste görülebilir. [[K1 s. 416]]'
      : '<b>Geç deselerasyon.</b> Şiddetli hipoksemide periferik kemoreseptörler vazokonstriksiyon yapar; oluşan hipertansiyon baroreseptör refleksiyle gecikmeli bradikardi doğurur. [[K1 s. 416]]'),
  });

  /* 6) Doğumda geçiş vs geçiş dolaşımı */
  VIZ.f83_dogum = (el) => SEKIL.sahne(el, {
    vb: [640, 290], vbDar: [380, 360], hareket: true, sure: 6,
    baslik: 'Doğumda normal geçiş ve geçiş dolaşımına dönüş',
    secenek: { id: 'm', ad: 'Senaryo', liste: [{ d: 'norm', ad: 'Normal doğum geçişi' }, { d: 'gecis', ad: 'Geçiş dolaşımı (kısır döngü)' }] },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 540, bx = cx - bw / 2;
      let s = '';
      if (p.m === 'norm') {
        const steps = [
          ['1 · İlk nefes → Alveoler O₂', 'HPV çözülür, PVR hızla düşer · Akciğer akımı ↑', 'ok'],
          ['2 · Plasenta ayrılır (40–60 sn geç klemp)', 'SVR ↑ · RA dönüşü ↓ → DV 1–3 saatte kapanır', 'basic'],
          ['3 · LA basıncı > RA basıncı', 'Kapakçık foramen ovaleyi (FO) kapatır', 'accent'],
          ['4 · Duktus arteriozus (10 saat)', 'PaO₂ ↑ + prostaglandin ↓ + bradikinin → DA kapanır', 'clin'],
        ];
        steps.forEach(([h, sub, col], i) => {
          const y = 16 + i * (S.dar ? 80 : 66);
          s += S.kutu(bx, y, bw, S.dar ? 70 : 56, { dolgu: col + '-soft', renk: col, r: 10, yazi: [h, sub], yc: 'b k', lh: 19 });
        });
      } else {
        s += S.rozet(cx, 34, S.dar ? 'Hipoksi · Hiperkapni · Asidoz · Hipotermi' : 'Tetikleyiciler: hipoksi · hiperkapni · asidoz · hipotermi', { dolgu: 'crit-soft', renk: 'crit', w: S.dar ? 340 : 450 });
        s += S.akis([[cx, 54], [cx, 96]], t, { renk: 'crit', n: 2, hiz: 0.65, r: 4.5 });
        s += S.kutu(bx, 98, bw, 58, { dolgu: 'crit-soft', renk: 'crit', yazi: ['HPV → Yüksek PVR · RA basıncı ↑, LA basıncı ↓', 'FO yeniden açılır · DA açık kalır'], yc: 'b k', lh: 19 });
        s += S.akis([[cx, 158], [cx, 198]], t, { renk: 'crit', n: 2, hiz: 0.65, r: 4.5 });
        s += S.kutu(bx, 200, bw, 54, { dolgu: 'warn-soft', renk: 'warn', yazi: 'Sağ → sol şant → Hipoksemi ve asidoz ağırlaşır (kısır döngü)', yc: 'b k' });
        s += S.rozet(cx, S.dar ? 304 : 274, S.dar ? 'Tedavi: Sürfaktan · O₂/CPAP/MV · İnhale NO' : 'Tedavi: sürfaktan (IRDS) · O₂ / CPAP / MV · PVR için inhale NO', { dolgu: 'ok-soft', renk: 'ok', w: S.dar ? 340 : 475 });
      }
      return s;
    },
    metin: (p) => REF(p.m === 'norm'
      ? '<b>Normal geçiş.</b> İlk nefesle alveollere O₂ girince HPV çözülür ve PVR hızla düşer; plasenta ayrılınca SVR artar, DV 1–3 saatte, FO LA>RA basıncıyla, DA sonraki 10 saatte kapanır. [[K1 s. 416–417]]'
      : '<b>Geçiş dolaşımı.</b> Hipoksi, hiperkapni, asidoz ve hipotermi PVR\'yi yükseltir (hipoksemide HPV); FO yeniden açılır, DA kapanmaz ve sağdan sola şant kısır döngü oluşturur. Tedavide sürfaktan, O₂, CPAP/MV ve inhale NO kullanılır. [[K1 s. 417]]'),
  });
})();
