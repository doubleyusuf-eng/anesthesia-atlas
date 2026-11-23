/* Bölüm 85 · Yaşlanma fizyolojisi — SEKIL kiti bileşenleri */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const REF = window.REF || ((s) => s);

  /* 1) Yaşla akciğer hacimleri (CC vs FRC) ve toplam solunum kompliyansı */
  VIZ.f85_solunum = (el) => { const C = {
    vb: [640, 310], vbDar: [380, 330],
    baslik: 'Yaşlanmayla akciğer hacimleri ve kapanma kapasitesi',
    secenek: { id: 'm', ad: 'Grafik', liste: [{ d: 'hacim', ad: 'Hacimler (CC vs FRC)' }, { d: 'komp', ad: 'Basınç–hacim (kompliyans)' }] },
    x: { min: 20, max: 80, ad: 'Yaş (yıl)', adimlar: [20, 30, 45, 60, 80] },
    y: { min: 0, max: 6.2, ad: 'Hacim (L, şematik)', adimlar: [0, 2, 4, 6] },
    yatay: (p) => (p.m === 'hacim' ? [{ y: 5.8, ad: 'TLC (~sabit)', renk: 'muted' }] : []),
    dikey: (p) => (p.m === 'hacim' ? [{ x: 45, ad: '45 yaş: supin CC > FRC', renk: 'crit' }] : []),
    egriler: [
      {
        renk: 'crit', w: 3, ad: 'Kapanma kapasitesi (CC)', adYer: 0.72,
        goster: (p) => p.m === 'hacim',
        f: (x) => 1.6 + 0.036 * (x - 20),
      },
      {
        renk: 'basic', w: 3, ad: 'FRC (supin)', adYer: 0.25,
        goster: (p) => p.m === 'hacim',
        f: (x) => 2.3 + 0.008 * (x - 20),
      },
      {
        renk: 'warn', w: 2.5, kesik: true, ad: 'RV (artar)', adYer: 0.75,
        goster: (p) => p.m === 'hacim',
        f: (x) => 1.2 + 0.017 * (x - 20),
      },
      {
        renk: 'ok', w: 3, ad: '20 yaş (daha dik eğim)', adYer: 0.65,
        goster: (p) => p.m === 'komp',
        f: (x) => 1.2 + 4.4 / (1 + Math.exp(-(x - 44) / 9)),
      },
      {
        renk: 'crit', w: 3, ad: '70 yaş (daha yatık = düşük toplam kompliyans)', adYer: 0.55,
        goster: (p) => p.m === 'komp',
        f: (x) => 2.1 + 3.1 / (1 + Math.exp(-(x - 48) / 14)),
      },
    ],
    /* x ekseni görünüme göre: hacim = yaş; kompliyans = intraplevral basınç (şematik, sayısız) */
    bolgeler: (p) => { C.x.ad = p.m === 'komp' ? 'İntraplevral basınç (şematik; sağa doğru daha negatif)' : 'Yaş (yıl)'; C.x.adimlar = p.m === 'komp' ? [] : [20, 30, 45, 60, 80]; return []; },
    noktalar: (p) => (p.m === 'hacim' ? [{ x: 45, y: 2.5, renk: 'crit' }] : []),
    okuma: (p) => REF(p.m === 'hacim'
      ? '<b>Akciğer hacimleri (20–80 yaş).</b> Elastik lif kaybıyla RV, FRC ve özellikle kapanma kapasitesi (CC) artar; supin pozisyonda CC yaklaşık 45 yaşında FRC\'yi aşarak V̇/Q̇ uyumsuzluğu doğurur. [[K1 s. 422–423]]'
      : '<b>Toplam solunum kompliyansı (şematik).</b> Alveoler elastik lif kaybı akciğer kompliyansını artırsa da sertleşen göğüs duvarı nedeniyle toplam solunum kompliyansı (eğim) yaşla azalır ve RV yükselir. [[K1 s. 422–423]]'),
  }; return SEKIL.grafik(el, C); };

  /* 2) Kardiyovasküler mekanizmalar */
  VIZ.f85_kardiyo = (el) => SEKIL.sahne(el, {
    vb: [640, 290], vbDar: [380, 350], hareket: true, sure: 6,
    baslik: 'Yaşlıda kardiyovasküler sistem değişiklikleri',
    secenek: {
      id: 'm', ad: 'Mekanizma',
      liste: [
        { d: 'aort', ad: 'Sert aorta ve dalga' },
        { d: 'lv', ad: 'LVH, AF ve ven sertliği' },
        { d: 'beta', ad: 'β-yanıt ve CO (−%1/yıl)' },
      ],
    },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 520, bx = cx - bw / 2;
      let s = '';
      if (p.m === 'aort') {
        s += S.kutu(bx, 22, bw, 62, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Sertleşmiş aorta → Sistolik hipertansiyon', 'LV aynı atım hacmi için daha yüksek basınç üretir'], yc: 'b k', lh: 19 });
        s += S.akis([[bx + 30, 122], [bx + bw - 30, 122]], t, { renk: 'warn', n: 4, hiz: 0.75, r: 4.5 });
        s += S.akis([[bx + bw - 30, 146], [bx + 30, 146]], t, { renk: 'crit', n: 4, hiz: 0.75, r: 4.5 });
        s += S.rozet(cx, 134, S.dar ? 'Hızlı yansıma → geç sistol!' : 'Hızlanan yansıyan dalga geç sistolde kalbe döner', { dolgu: 'warn-soft', renk: 'warn', w: S.dar ? 250 : 370 });
        s += S.kutu(bx, 184, bw, 66, { dolgu: 'accent-soft', renk: 'accent', yazi: ['Art yük ↑ → Sol ventrikül hipertrofisi (LVH)', 'Aort kapağı kalsifikasyonu → aort stenozu'], yc: 'b k', lh: 19 });
      } else if (p.m === 'lv') {
        s += S.kutu(bx, 24, bw, 88, { dolgu: 'crit-soft', renk: 'crit', yazi: ['LVH → Sert ventrikül → Diyastolik disfonksiyon', 'Dolum atriyal kasılmaya bağımlı → AF hızla LV yetmezliği yapar'], yc: 'b k', lh: 20 });
        s += S.kutu(bx, 138, bw, 92, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Sertleşen venler → Venöz kompliyans ↓', 'RV ön yük tamponlaması bozulur → hafif hipovolemide hipotansiyon'], yc: 'b k', lh: 20 });
      } else {
        const items = [
          ['Azalmış β-adrenerjik duyarlılık', 'Maksimum KH ↓ (istirahat KH sabit) · Efedrin etkisi ↓', 'warn'],
          ['Baroreseptör yanıtı zayıflar', 'Kan basıncına hızlı KH yanıtı bozulur → postural hipotansiyon', 'basic'],
          ['Kalp debisi: yılda ~%1 düşer', 'β-yanıt ↓ + miyosit işlevi ↓ → LV kontraktilitesi ↓', 'crit'],
        ];
        items.forEach(([h, sub, col], i) => {
          const y = 20 + i * (S.dar ? 96 : 80);
          s += S.kutu(bx, y, bw, S.dar ? 82 : 68, { dolgu: col + '-soft', renk: col, r: 10, yazi: [h, sub], yc: 'b k', lh: 20 });
        });
      }
      return s;
    },
    metin: (p) => {
      if (p.m === 'aort') return REF('<b>Sert aorta ve sistolik hipertansiyon.</b> Aorta genişleyemez ve hızlanan yansıyan basınç dalgası geç sistolde kalbe dönerek LV art yükünü artırır. [[K1 s. 424]]');
      if (p.m === 'lv') return REF('<b>LVH, AF ve ven sertliği.</b> Diyastolik gevşeme bozulduğundan AF kolayca LV yetmezliği yapar; sertleşen venler yüzünden hafif hipovolemide hızla hipotansiyon gelişir. [[K1 s. 424]]');
      return REF('<b>β-yanıt kaybı ve CO.</b> İstirahat KH değişmez ama maksimum KH düşer, postural hipotansiyon sıktır ve kalp debisi yılda yaklaşık %1 azalır. [[K1 s. 424]]');
    },
  });

  /* 3) SSS, böbrek, karaciğer, endokrin (4 adım) */
  VIZ.f85_organlar = (el) => SEKIL.adim(el, {
    vb: [640, 260], vbDar: [380, 310], hareket: false, oto: false,
    baslik: 'Yaşlanmada SSS, böbrek, karaciğer ve endokrin',
    adimlar: [
      {
        ad: 'SSS',
        metin: REF('Hücre kaybıyla beyin ağırlığı ve CMRO₂ azalır (CBF −%10–20); işitme kaybı çok sık, görme kaybı ~1/3, >80 yaşta bilişsel bozukluk %20 oranındadır. [[K1 s. 424]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 500, bx = cx - bw / 2;
          return S.kutu(bx, 24, bw, 68, { dolgu: 'basic-soft', renk: 'basic', yazi: S.dar ? ['Nöron kaybı → CMRO₂ ↓ → CBF −%10–20', 'Parkinson (DA) · demans (kolinerjik)'] : ['Nöron kaybı → CMRO₂ ↓ → CBF −%10–20', 'Dopaminerjik kayıp (Parkinson) · Kolinerjik kayıp (demans)'], yc: 'b k', lh: 19 })
            + S.kutu(bx, 114, bw, 68, { dolgu: 'warn-soft', renk: 'warn', yazi: ['İşitme kaybı çok sık · Görme kaybı ~1/3', '>80 yaş hastalarda bilişsel bozukluk %20'], yc: 'b k', lh: 19 });
        },
      },
      {
        ad: 'Böbrek',
        metin: REF('30 yaşından itibaren ilerleyici glomerül kaybı ve RPF düşüşü GFR ile kreatinin klirensini azaltır; yaşlı erkeklerde prostatizme bağlı obstrüktif nefropati sıktır. [[K1 s. 424–425]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 500, bx = cx - bw / 2;
          return S.kutu(bx, 28, bw, 66, { dolgu: 'accent-soft', renk: 'accent', yazi: ['30 yaşından itibaren glomerül kaybı ve RPF ↓', 'GFR ve kreatinin klirensi kademeli azalır'], yc: 'b k', lh: 19 })
            + S.kutu(bx, 116, bw, 62, { dolgu: 'warn-soft', renk: 'warn', yazi: 'Yaşlı erkeklerde prostatizm → obstrüktif nefropati sık', yc: 'b k' });
        },
      },
      {
        ad: 'Karaciğer',
        metin: REF('Karaciğer boyutu ve kan akımı azaldığından hepatik ilaç klirensi düşer; albümin ve plazma kolinesteraz sentezi azalır. [[K1 s. 425]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 500, bx = cx - bw / 2;
          return S.kutu(bx, 28, bw, 66, { dolgu: 'clin-soft', renk: 'clin', yazi: ['Karaciğer boyutu ↓ · Hepatik kan akımı ↓', 'Hepatik ilaç klirensi azalır'], yc: 'b k', lh: 19 })
            + S.kutu(bx, 116, bw, 66, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Plazma protein sentezi ↓: albümin ↓ (serbest ilaç ↑)', 'Plazma kolinesteraz ↓ (mivaküryum uzar)'], yc: 'b k', lh: 19 });
        },
      },
      {
        ad: 'Endokrin',
        metin: REF('Periferik insülin direnci artar ve hiperglisemiye insülin salgısı bozulur; bu nedenle yaşlılarda diabetes mellitus sıktır. [[K1 s. 425]]'),
        ciz: (S) => {
          const cx = S.w / 2, bw = S.dar ? 340 : 500, bx = cx - bw / 2;
          return S.kutu(bx, 48, bw, 88, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Periferik insülin direnci ↑ + insülin salgısı ↓', 'Yaşlılarda diabetes mellitus sık görülür'], yc: 'b k', lh: 22 });
        },
      },
    ],
  });

  /* 4) Kas-iskelet, deri ve termoregülasyon */
  VIZ.f85_kasisi = (el) => SEKIL.sahne(el, {
    vb: [640, 270], vbDar: [380, 340],
    baslik: 'Yaşlıda kas–iskelet, deri ve termoregülasyon',
    secenek: { id: 'm', ad: 'Odak', liste: [{ d: 'kas', ad: 'Sarkopeni, deri ve rejyonal' }, { d: 'isi', ad: 'Isı dengesi ve bölmeler' }] },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 520, bx = cx - bw / 2;
      let s = '';
      const list = p.m === 'kas'
        ? [
            ['Sarkopeni: 80 yaşta −6 kg kas', 'Motor nöron kaybı → sarkoplazmik Ca²⁺ ↓ (düşünülür)', 'warn'],
            ['İnce deri ve kırılgan venler', 'Zor damar yolu · ekstravazasyon · bası yarası riski', 'crit'],
            ['Artrit ve kalsifiye bağlar', S.dar ? 'Zor rejyonal · kalın iğne · PDPH seyrek' : 'Zor pozisyon/rejyonal · kalın spinal iğne · PDPH çok seyrek', 'ok'],
          ]
        : [
            ['Hipotermi riski (BMR −%1/yıl)', 'Azalmış vazokonstriksiyon · yetersiz titreme / rezerv', 'basic'],
            ['Hipertermi riski', 'Terleme yanıtı yaşla bozulur', 'crit'],
            ['Değişen bölmeler ve proteinler', 'Kan hacmi ↓ · yağ oranı ↑ · albümin ↓ → serbest ilaç ↑', 'accent'],
          ];
      list.forEach(([h, sub, col], i) => {
        const y = 20 + i * (S.dar ? 96 : 76);
        s += S.kutu(bx, y, bw, S.dar ? 82 : 64, { dolgu: col + '-soft', renk: col, r: 10, yazi: [h, sub], yc: 'b k', lh: 20 });
      });
      return s;
    },
    metin: (p) => REF(p.m === 'kas'
      ? '<b>Kas–iskelet ve deri.</b> İnce deri ve kırılgan venler damar yolunu zorlaştırır; 80 yaşta 6 kg kas kaybedilir (sarkopeni); kalsifiye bağlar rejyonal anesteziyi güçleştirir ama PDPH çok daha seyrektir. [[K1 s. 425]]'
      : '<b>Isı dengesi ve bölmeler.</b> BMR yılda %1 düşer ve vazokonstriksiyon/terleme bozulur; azalmış kan hacmi, artmış yağ ve düşük plazma proteini ilaç dağılımını değiştirir. [[K1 s. 425]]'),
  });

  /* 5) Yaşlanmanın 3 kuramı */
  VIZ.f85_kuram = (el) => SEKIL.sahne(el, {
    vb: [640, 230], vbDar: [380, 290],
    baslik: 'Yaşlanmanın başlıca üç kuramı',
    secenek: { id: 'k', ad: 'Kuram', liste: [{ d: 'tel', ad: 'Telomer' }, { d: 'ros', ad: 'Serbest radikal' }, { d: 'mut', ad: 'Somatik mutasyon' }] },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 500, bx = cx - bw / 2;
      if (p.k === 'tel') {
        return S.kutu(bx, 24, bw, 58, { dolgu: 'basic-soft', renk: 'basic', yazi: 'Kromozom uçları: kodlamayan telomerler DNA\'yı korur', yc: 'b k' })
          + S.ok([[cx, 84], [cx, 118]], { renk: 'warn', w: 2.2 })
          + S.kutu(bx, 122, bw, 72, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Yaşla telomer aşınır → kodlayan DNA zarar görür', 'DNA hasarı yanıtı → hücre apoptozu'], yc: 'b k', lh: 20 });
      }
      if (p.k === 'ros') {
        return S.kutu(bx, 24, bw, 58, { dolgu: 'warn-soft', renk: 'warn', yazi: 'Normal metabolizma → Reaktif oksijen türleri (ROS)', yc: 'b k' })
          + S.ok([[cx, 84], [cx, 118]], { renk: 'crit', w: 2.2 })
          + S.kutu(bx, 122, bw, 72, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Oksidatif stres birikimi', 'Hücresel yaşlanma ve hasar'], yc: 'b k', lh: 20 });
      }
      return S.kutu(bx, 24, bw, 58, { dolgu: 'accent-soft', renk: 'accent', yazi: 'Hücre bölünmeleri → Rastgele somatik mutasyonlar', yc: 'b k' })
        + S.ok([[cx, 84], [cx, 118]], { renk: 'crit', w: 2.2 })
        + S.kutu(bx, 122, bw, 72, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Verimsiz hücrelerin yaşla birikmesi', 'İlerleyici organ işlev bozukluğu'], yc: 'b k', lh: 20 });
    },
    metin: (p) => {
      if (p.k === 'tel') return REF('<b>Telomer kuramı.</b> Kromozom uçlarındaki kodlamayan telomerler aşındıkça kodlayan DNA hasar görür ve hücreler apoptoza gider. [[K1 s. 425]]');
      if (p.k === 'ros') return REF('<b>Serbest radikal kuramı.</b> Normal metabolizmanın yan ürünü olan reaktif oksijen türleri (ROS) oksidatif stresle hücre yaşlanmasına yol açar. [[K1 s. 425]]');
      return REF('<b>Somatik mutasyon kuramı.</b> Bölünme sırasında biriken rastgele mutasyonlar verimsiz hücreleri artırarak ilerleyici organ işlev kaybına neden olur. [[K1 s. 425]]');
    },
  });

  /* 6) Yaşlıda anestezi farmakolojisi */
  VIZ.f85_farm = (el) => SEKIL.sahne(el, {
    vb: [640, 270], vbDar: [380, 340],
    baslik: 'Yaşlıda anestezik ilaçların davranışları',
    secenek: {
      id: 'g', ad: 'İlaç grubu',
      liste: [
        { d: 'iv', ad: 'İV indüksiyon ve vazopresör' },
        { d: 'inh', ad: 'İnhalasyon (MAC −%30)' },
        { d: 'nmb', ad: 'Kas gevşeticiler' },
      ],
    },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 520, bx = cx - bw / 2;
      const rows = p.g === 'iv'
        ? [
            ['İV indüksiyon: DOZ ↓ · YAVAŞ ver', S.dar ? 'Serbest ilaç ↑ · uzamış kol–beyin süresi' : 'Düşük Vd + düşük protein → serbest ilaç ↑ · uzamış kol–beyin süresi', 'crit'],
            ['Benzodiazepinler: etki uzar', 'Artan yağda birikim + düşük klirens → postop sarkma', 'warn'],
            ['Fenilefrin (α) > Efedrin (α/β)', S.dar ? 'β-yanıt ↓ → efedrin zayıf, fenilefrin etkin' : 'β-yanıt azaldığından efedrin zayıflar; fenilefrin etkin kalır', 'ok'],
          ]
        : p.g === 'inh'
          ? [
              ['MAC %30\'a kadar azalır', 'Aynı anestezi derinliği için daha düşük end-tidal derişim', 'accent'],
              ['Gaz indüksiyonu uzayabilir', 'Azalmış alveoler difüzyon + artmış V̇/Q̇ uyumsuzluğu', 'warn'],
            ]
          : [
              ['Doz değişmez · Etki başlangıcı uzar', 'Düşük CO nedeniyle entübasyon koşulları daha geç oluşur', 'basic'],
              ['Atraküryum: süre DEĞİŞMEZ', 'Plazma esteraz + Hofmann eliminasyonu (organ bağımsız)', 'ok'],
              ['Mivaküryum / Aminosteroit: uzayabilir', 'Düşük kolinesteraz (süks. önemsiz) · düşük KC/böbrek klirensi', 'warn'],
            ];
      let s = '';
      rows.forEach(([h, sub, col], i) => {
        const y = 20 + i * (S.dar ? 96 : 76);
        s += S.kutu(bx, y, bw, S.dar ? 82 : 64, { dolgu: col + '-soft', renk: col, r: 10, yazi: [h, sub], yc: 'b k', lh: 20 });
      });
      return s;
    },
    metin: (p) => {
      if (p.g === 'iv') return REF('<b>İV indüksiyon ve vazopresör.</b> Yüksek serbest ilaç düzeyi nedeniyle indüksiyon dozu azaltılır ve uzamış kol–beyin süresi yüzünden yavaş verilir; fenilefrin etkinliğini korurken efedrinin etkisi azalır. [[K1 s. 426]]');
      if (p.g === 'inh') return REF('<b>İnhalasyon anestezikleri.</b> MAC %30\'a kadar azalır; azalmış alveoler difüzyon ve artmış V̇/Q̇ uyumsuzluğu inhalasyon indüksiyonunu uzatabilir. [[K1 s. 426]]');
      return REF('<b>Kas gevşeticiler.</b> Nondepolarizan doz sabit kalır ama düşük CO yüzünden başlangıç uzar; atraküryum süresi değişmezken aminosteroitler ve mivaküryum uzayabilir. [[K1 s. 426]]');
    },
  });
})();
