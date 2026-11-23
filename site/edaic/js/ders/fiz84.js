/* Bölüm 84 · Pediatrik fizyoloji — SEKIL kiti bileşenleri */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const REF = window.REF || ((s) => s);

  /* 1) Hava yolu farkları ve yaşa göre ETT hesaplayıcı */
  VIZ.f84_havayolu = (el) => SEKIL.sahne(el, {
    vb: [640, 290], vbDar: [380, 350],
    baslik: 'Pediatrik hava yolu ve ETT boyutu',
    secenek: { id: 'm', ad: 'Görünüm', liste: [{ d: 'ett', ad: 'Yaşa göre ETT boyutu' }, { d: 'anat', ad: 'Anatomik farklar' }] },
    param: [{ id: 'yas', ad: 'Çocuk yaşı', min: 1, max: 10, adim: 1, deger: 4, birim: 'yaş' }],
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 540, bx = cx - bw / 2;
      let s = '';
      if (p.m === 'ett') {
        const kafsiz = (p.yas / 4 + 4).toFixed(2).replace('.', ',');
        const kafli = (p.yas / 4 + 3.5).toFixed(2).replace('.', ',');
        const r = 10 + p.yas * 1.4;
        if (!S.dar) {
          s += S.kutu(bx, 28, 256, 152, { dolgu: 'basic-soft', renk: 'basic', r: 12 });
          s += S.t(bx + 128, 56, 'Kafsız ETT: (yaş/4) + 4', { a: 'middle', c: 'b k', renk: 'basic' });
          s += S.daire(bx + 128, 108, r, { dolgu: 'paper', renk: 'basic', w: 2.5 });
          s += S.t(bx + 128, 113, kafsiz + ' mm', { a: 'middle', c: 'b k' });
          s += S.t(bx + 128, 162, 'Pozitif basınçta hafif hava kaçağı', { a: 'middle', c: 'k m' });

          s += S.kutu(bx + 284, 28, 256, 152, { dolgu: 'accent-soft', renk: 'accent', r: 12 });
          s += S.t(bx + 412, 56, 'Kaflı ETT: (yaş/4) + 3,5', { a: 'middle', c: 'b k', renk: 'accent' });
          s += S.daire(bx + 412, 108, r + 6, { dolgu: 'warn-soft', renk: 'warn', w: 1.5 });
          s += S.daire(bx + 412, 108, r - 3, { dolgu: 'paper', renk: 'accent', w: 2.5 });
          s += S.t(bx + 412, 113, kafli + ' mm', { a: 'middle', c: 'b k' });
          s += S.t(bx + 412, 162, 'Düşük basınçlı kaf · iç çap daha dar', { a: 'middle', c: 'k m' });
        } else {
          s += S.kutu(bx, 20, bw, 110, { dolgu: 'basic-soft', renk: 'basic', r: 12, yazi: ['Kafsız ETT: (yaş/4) + 4', kafsiz + ' mm · hafif hava kaçağı'], yc: 'b k', lh: 22 });
          s += S.kutu(bx, 146, bw, 110, { dolgu: 'accent-soft', renk: 'accent', r: 12, yazi: ['Kaflı ETT: (yaş/4) + 3,5', kafli + ' mm · düşük basınçlı kaf (R ↑)'], yc: 'b k', lh: 22 });
        }
        s += S.rozet(cx, S.dar ? 302 : 232, S.dar ? 'Krikoid ödemi → R ∝ 1/r⁴ (hızla artar)' : 'Hagen–Poiseuille (R ∝ 1/r⁴): krikoid halkada küçük ödem direnci katlar', { dolgu: 'crit-soft', renk: 'crit', w: S.dar ? 336 : 485 });
      } else {
        const items = [
          ['Nötral baş pozisyonu', 'Büyük oksiput · kısa boyun · büyük dil · U-epiglot', 'basic'],
          ['Zorunlu burun solunumu', 'İlk 4 ay kritik; sekresyon/NG tıkanması riskli', 'warn'],
          ['Larinks C3 / C4 · Trakea ~4 cm', 'Sağ/sol bronş açısı benzer · maksillaya tespit', 'accent'],
          ['En dar yer: krikoid halka', 'Gevşek psödostratifiye epitel → ödeme yatkın', 'crit'],
        ];
        items.forEach(([h, sub, col], i) => {
          const y = 16 + i * (S.dar ? 80 : 66);
          s += S.kutu(bx, y, bw, S.dar ? 70 : 56, { dolgu: col + '-soft', renk: col, r: 10, yazi: [h, sub], yc: 'b k', lh: 19 });
        });
      }
      return s;
    },
    metin: (p) => {
      const kafsiz = (p.yas / 4 + 4).toFixed(2).replace('.', ',');
      const kafli = (p.yas / 4 + 3.5).toFixed(2).replace('.', ',');
      return REF(p.m === 'ett'
        ? `<b>Yaşa göre ETT (${p.yas} yaş).</b> Kafsız ETT = (yaş/4) + 4 = ${kafsiz} mm; modern düşük basınçlı yüksek hacimli kaflı ETT = (yaş/4) + 3,5 = ${kafli} mm (yarım numara küçük, daha yüksek direnç). [[K1 s. 418–419]]`
        : '<b>Anatomik farklar.</b> Büyük oksiput (nötral pozisyon), zorunlu burun solunumu (<4 ay), U-epiglot, C3/C4 larinks, 4 cm kadar kısa trakea ve en dar yer olan krikoid halka. [[K1 s. 418]]');
    },
  });

  /* 2) Solunum rezervi: yenidoğan vs erişkin */
  VIZ.f84_solunum = (el) => SEKIL.sahne(el, {
    vb: [640, 280], vbDar: [380, 340],
    baslik: 'Yenidoğan ve erişkin solunum fizyolojisi karşılaştırması',
    secenek: { id: 'm', ad: 'Odak', liste: [{ d: 'o2', ad: 'O₂ tüketimi ve ventilasyon' }, { d: 'frc', ad: 'FRC, CC ve yorgunluk' }] },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 520, bx = cx - bw / 2;
      let s = '';
      if (p.m === 'o2') {
        const barW = S.dar ? 130 : 210, xBar = S.dar ? 170 : 270;
        const rows = [
          ['Yenidoğan O₂ tüketimi', '6 mL/kg/dk', 1.0, 'crit'],
          ['Erişkin O₂ tüketimi', '3 mL/kg/dk', 0.5, 'basic'],
          ['Tidal hacim (ikisinde)', '6–8 mL/kg', 0.65, 'ok'],
        ];
        rows.forEach(([ad, val, fr, col], i) => {
          const y = 32 + i * 58;
          s += S.t(bx + 4, y + 17, S.dar ? ad.replace('O₂ tüketimi', 'V̇O₂') : ad, { c: 'b k' });
          s += S.kutu(xBar, y, barW, 24, { dolgu: 'bg', renk: 'line', r: 6 });
          s += S.kutu(xBar, y, barW * fr, 24, { dolgu: col + '-soft', renk: col, r: 6 });
          s += S.t(xBar + barW + 8, y + 17, val, { c: 'b k', renk: col });
        });
        s += S.rozet(cx, S.dar ? 256 : 236, S.dar ? 'Yüksek V̇A → solunum hızıyla sağlanır' : 'Tidal hacim benzerdir; artmış V̇A gereksinimi solunum hızıyla karşılanır', { dolgu: 'warn-soft', renk: 'warn', w: S.dar ? 320 : 475 });
      } else {
        const items = [
          ['Yumuşak yatay kaburgalar', 'Göğüs duvarı kompliyansı ↑ · Kova sapı yok → interkostal çekilme', 'warn'],
          ['Düşük FRC ve GA etkisi', 'Vokal kord addüksiyonu ve inspiratuvar tonus GA ile kaybolur', 'crit'],
          ['CC > FRC (yenidoğan)', 'Küçük hava yolu kapanması → belirgin V̇/Q̇ uyumsuzluğu', 'accent'],
          ['Tip I kas lifi azlığı', 'Diyafram ve interkostaller yüksek iş yükünde çabuk yorulur', 'basic'],
        ];
        items.forEach(([h, sub, col], i) => {
          const y = 16 + i * (S.dar ? 78 : 64);
          s += S.kutu(bx, y, bw, S.dar ? 68 : 54, { dolgu: col + '-soft', renk: col, r: 10, yazi: [h, sub], yc: 'b k', lh: 19 });
        });
      }
      return s;
    },
    metin: (p) => REF(p.m === 'o2'
      ? '<b>O₂ tüketimi ve ventilasyon.</b> Yenidoğanın O₂ tüketimi erişkinin iki katıdır (6 vs 3 mL/kg/dk); VT benzer (6–8 mL/kg) olduğundan artmış V̇A solunum hızıyla sağlanır. [[K1 s. 419]]'
      : '<b>FRC, CC ve yorgunluk.</b> Yumuşak kaburgalar FRC\'yi düşürür, CC > FRC V̇/Q̇ uyumsuzluğu yaratır ve tip I lif azlığı solunum kaslarını hızla yorar; GA altında desatürasyon çok hızlıdır. [[K1 s. 419]]'),
  });

  /* 3) Kardiyovasküler: yaşla KH ve SKB eğrisi */
  VIZ.f84_kardiyo = (el) => SEKIL.grafik(el, {
    vb: [640, 310], vbDar: [380, 330],
    baslik: 'Yaşa göre tipik kalp hızı ve sistolik kan basıncı',
    x: { min: 0, max: 18, ad: 'Yaş (yıl)', adimlar: [0, 1, 5, 10, 15, 18] },
    y: { min: 40, max: 140, ad: 'KH (atım/dk) · SKB (mmHg)', adimlar: [60, 80, 100, 120, 140] },
    yatay: () => [{ y: 60, ad: 'Yenidoğan <60/dk = KPR', renk: 'crit' }],
    egriler: [
      {
        renk: 'accent', w: 3, ad: 'Kalp hızı (120→75)', adYer: 0.42,
        f: (x) => 75 + 45 * Math.exp(-x / 6.5),
      },
      {
        renk: 'basic', w: 3, ad: 'Sistolik KB (70→120)', adYer: 0.68,
        f: (x) => 120 - 50 * Math.exp(-x / 6.5),
      },
    ],
    noktalar: () => [
      { x: 0, y: 120, renk: 'accent' },
      { x: 0, y: 70, renk: 'basic' },
    ],
    ek: (S, p, X, Y) => S.rozet(X(11.5), Y(130), S.dar ? 'Kardiyak indeks +%30–60 · Sabit SV' : 'Yenidoğanda kardiyak indeks +%30–60 · Sabit SV (KH bağımlı)', { dolgu: 'warn-soft', renk: 'warn', w: S.dar ? 255 : 375 }),
    okuma: () => REF('<b>Yaşla KH ve SKB.</b> Tipik kalp hızı yenidoğanda 120/dk\'dan erişkinde 75/dk\'ya inerken sistolik basınç 70 mmHg\'dan 120 mmHg\'ya yükselir; sabit SV nedeniyle yenidoğanda KH <60/dk KPR endikasyonudur ve hipoksik bradikardide ilk tedavi O₂ + ventilasyondur. [[K1 s. 419–420]]'),
  });

  /* 4) SSS, böbrek, hematoloji ve karaciğer (4 adım) */
  VIZ.f84_organlar = (el) => SEKIL.adim(el, {
    vb: [640, 270], vbDar: [380, 320], hareket: false, oto: false,
    baslik: 'Pediatrik SSS, böbrek, hematoloji ve karaciğer olgunlaşması',
    adimlar: [
      {
        ad: 'SSS ve omurilik',
        metin: REF('Ön fontanel ve sütürler KİBAS\'ı kısmen telafi eder; immatür KBB opioid/barbitürat duyarlılığını artırır; omurilik L3 (yenidoğan) → L2/3 (1 yaş) → L1/2 (~8 yaş) düzeyinde biter. [[K1 s. 420]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 500, bx = cx - bw / 2;
          let s = '';
          s += S.kutu(bx, 24, bw, 62, { dolgu: 'basic-soft', renk: 'basic', yazi: S.dar ? ['Ön fontanel + sütürler (KİBAS telafisi)', 'İmmatür KBB: opioid/barbitürat ↑'] : ['Ön fontanel + sütür ayrılması (KİBAS telafisi)', 'İmmatür KBB → bilirubin, opioid, barbitürat geçişi ↑'], yc: 'b k', lh: 19 });
          s += S.kutu(bx, 108, bw, 66, { dolgu: 'accent-soft', renk: 'accent', yazi: S.dar ? ['Omurilik: L3 → L2/3 (1y) → L1/2 (8y)', 'LA penetrasyonu ↑ · hipotansiyon seyrek'] : ['Omurilik sonlanması: L3 (YD) → L2/3 (1 yaş) → L1/2 (~8 yaş)', 'Eksik miyelinizasyon: LA penetrasyonu ↑ · blokta hipotansiyon seyrek'], yc: 'b k', lh: 19 });
          return s;
        },
      },
      {
        ad: 'Böbrek (2 yaş)',
        metin: REF('Böbrek işlevi 2 yaşta erişkin düzeye ulaşır; süt çocuğu GFR\'si erişkinin yarısıdır (65 vs 120 mL/dk), ilk haftada konsantrasyon düşüktür ve preterm Na⁺ yükünü atamaz. [[K1 s. 420]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 500, bx = cx - bw / 2;
          let s = '';
          s += S.kutu(bx, 24, bw, 62, { dolgu: 'warn-soft', renk: 'warn', yazi: S.dar ? ['Süt çocuğu GFR ~65 vs 120 (1,73 m²)', 'Erişkin böbrek işlevi ~2 yaş'] : ['Süt çocuğu GFR ~65 vs erişkin 120 mL/dk (1,73 m²)', 'Erişkin böbrek işlevi ~2 yaşında'], yc: 'b k', lh: 19 });
          s += S.kutu(bx, 108, bw, 72, { dolgu: 'crit-soft', renk: 'crit', yazi: S.dar ? ['İlk haftada konsantrasyon düşük', 'Preterm fazla Na⁺ yükünü atamaz'] : ['İlk haftada konsantrasyon düşük → su koruma sınırlı', 'Preterm fazla kristaloidde Na⁺ atılımını artıramaz'], yc: 'b k', lh: 19 });
          return s;
        },
      },
      {
        ad: 'Hematoloji',
        metin: REF('Hb doğumda ~180 g/L (+10–20 hemokonsantrasyon) → 3. ayda 100 g/L; kan hacmi 90 → 80 → 70 mL/kg; K vitamini (F II, VII, IX, X) profilaktik verilir. [[K1 s. 420]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 520, bx = cx - bw / 2;
          let s = '';
          s += S.kutu(bx, 20, bw, 62, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Hb: ~180 g/L (+10–20) → 3. ayda 100 g/L → ergenlik', 'Kan hacmi: 90 (YD) → 80 (6 ay) → 70 mL/kg (1 yaş)'], yc: 'b k', lh: 19 });
          s += S.kutu(bx, 104, bw, 70, { dolgu: 'warn-soft', renk: 'warn', yazi: ['K vitamini eksikliği (plasenta geçişi az, anne sütü düşük)', 'Faktör II, VII, IX, X ↓ → profilaktik K vitamini'], yc: 'b k', lh: 19 });
          return s;
        },
      },
      {
        ad: 'Karaciğer',
        metin: REF('Glukuronoziltransferaz yetersizliği konjuge olmamış bilirubini artırıp kernikterus riski yaratır; faz 1–2 ilaçlarının (barbitürat, opioid) etkisi uzar. [[K1 s. 420]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 500, bx = cx - bw / 2;
          let s = '';
          s += S.kutu(bx, 24, bw, 66, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Düşük glukuronoziltransferaz → konjuge olmamış bilirubin ↑', 'İmmatür KBB geçişi → kernikterus riski'], yc: 'b k', lh: 19 });
          s += S.kutu(bx, 112, bw, 64, { dolgu: 'basic-soft', renk: 'basic', yazi: ['Faz 1 ve 2 metabolizması yavaş → barbitürat/opioid uzar', '(Kitap 3 ayda erişkin işlev der; bkz. Atlas notu)'], yc: 'b k', lh: 19 });
          return s;
        },
      },
    ],
  });

  /* 5) Sıvı bölmeleri (TBW/ECF) ve metabolizma/ısı */
  VIZ.f84_metab = (el) => SEKIL.sahne(el, {
    vb: [640, 280], vbDar: [380, 340],
    baslik: 'Yaşa göre sıvı bölmeleri, BMR ve termoregülasyon',
    secenek: { id: 'm', ad: 'Odak', liste: [{ d: 'sivi', ad: 'Sıvı bölmeleri (TBW ve ECF)' }, { d: 'isi', ad: 'BMR ve termoregülasyon' }] },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 520, bx = cx - bw / 2;
      let s = '';
      if (p.m === 'sivi') {
        const barW = S.dar ? 130 : 210, xBar = S.dar ? 170 : 265;
        const rows = [
          ['Preterm TBW', '%85', 0.85, 'accent'],
          ['Term yenidoğan TBW', '%75', 0.75, 'basic'],
          ['Erişkin TBW', '%60', 0.60, 'muted'],
          ['Yenidoğan / Erişkin ECF', '%40 / %20', 0.40, 'warn'],
        ];
        rows.forEach(([ad, val, fr, col], i) => {
          const y = 24 + i * 50;
          s += S.t(bx + 4, y + 17, S.dar ? ad.replace('Term yenidoğan', 'Term YD').replace('Yenidoğan / Erişkin', 'YD / Erişkin') : ad, { c: 'b k' });
          s += S.kutu(xBar, y, barW, 22, { dolgu: 'bg', renk: 'line', r: 5 });
          s += S.kutu(xBar, y, barW * fr, 22, { dolgu: col + '-soft', renk: col, r: 5 });
          s += S.t(xBar + barW + 8, y + 17, val, { c: 'b k', renk: col });
        });
        s += S.rozet(cx, S.dar ? 268 : 244, S.dar ? 'Açlıkta hızlı dehidratasyon (buharlaşma + V̇E)' : 'Açlıkta hızlı dehidratasyon: yüksek yüzey/ağırlık, yüksek V̇E, düşük konsantrasyon', { dolgu: 'crit-soft', renk: 'crit', w: S.dar ? 336 : 515 });
      } else {
        const items = [
          ['BMR: 50 vs 25 kcal/kg/gün', 'Gaz değişimi BMR\'nin ≤%25\'i · Hipoglisemi riski (İV glukoz)', 'warn'],
          ['Titremesiz termogenez', 'Kahverengi yağda eşleşmesiz oksidasyon → O₂ tüketimi ↑', 'accent'],
          ['Başlıca GA ısı kaybı: radyasyon', 'Hipotermi → asidoz, solunum depresyonu, CO ↓ (sıcak salon)', 'crit'],
        ];
        items.forEach(([h, sub, col], i) => {
          const y = 24 + i * (S.dar ? 94 : 78);
          s += S.kutu(bx, y, bw, S.dar ? 80 : 66, { dolgu: col + '-soft', renk: col, r: 10, yazi: [h, sub], yc: 'b k', lh: 20 });
        });
      }
      return s;
    },
    metin: (p) => REF(p.m === 'sivi'
      ? '<b>Sıvı bölmeleri.</b> Toplam vücut suyu pretermde %85\'e, term yenidoğanda %75\'e (erişkin %60), ECF ise yenidoğanda %40\'a (erişkin %20) ulaşır; açlıkta dehidratasyon çok hızlıdır. [[K1 s. 421]]'
      : '<b>BMR ve termoregülasyon.</b> Neonatal BMR erişkinin iki katıdır (50 vs 25 kcal/kg/gün); kahverengi yağda titremesiz termogenez O₂ tüketimini artırır ve GA altında başlıca ısı kaybı radyasyondur. [[K1 s. 420–421]]'),
  });

  /* 6) Yaşa göre volatil MAC seyri */
  VIZ.f84_pk = (el) => SEKIL.grafik(el, {
    vb: [640, 300], vbDar: [380, 320],
    baslik: 'Yaşa göre volatil anestezik MAC düzeyi',
    x: { min: 0, max: 16, ad: 'Yaş (yıl · 0: doğum, 0,5: süt çocuğu, 15: ergen)', adimlar: [0, 1, 4, 8, 12, 16] },
    y: { min: 80, max: 165, ad: 'Erişkin MAC\'ına göre (%)', adimlar: [100, 125, 150] },
    yatay: () => [{ y: 100, ad: 'Erişkin MAC (%100)', renk: 'muted' }],
    egriler: [
      {
        renk: 'accent', w: 3, ad: 'Volatil MAC', adYer: 0.55,
        f: (x) => (x < 0.5 ? 100 + 100 * x : 100 + 50 * Math.exp(-(x - 0.5) / 5.5)),
      },
    ],
    noktalar: () => [{ x: 0, y: 100, renk: 'basic' }, { x: 0.5, y: 150, renk: 'warn' }],
    ek: (S, p, X, Y) => S.t(X(1.3), Y(155), 'Süt çocuğu +%50', { c: 'b k', renk: 'warn' }) + S.rozet(X(S.dar ? 8.8 : 10.2), Y(136), S.dar ? 'Küçük FRC + yüksek V̇A → hızlı gaz' : 'Küçük FRC + yüksek CBF ve V̇A → hızlı gaz indüksiyonu ve uyanma', { dolgu: 'ok-soft', renk: 'ok', w: S.dar ? 240 : 385 }),
    okuma: () => REF('<b>Volatil MAC seyri.</b> MAC doğumda erişkinle aynıdır, süt çocukluğunda %50 yükselir ve ergenliğe dek kademeli olarak erişkin düzeyine iner; küçük FRC, yüksek CBF ve yüksek V̇A gaz indüksiyonunu hızlandırır. [[K1 s. 421]]'),
  });
})();
