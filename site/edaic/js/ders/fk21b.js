(function () {
  'use strict';
  const VIZ = window.VIZ;
  const orta = { a: 'middle', c: 'b' };
  const kucuk = { a: 'middle', c: 'k' };
  const fmt = (v) => (Math.round(+v * 10) / 10).toString().replace('.', ',');
  const sec = (id, ad, list) => ({ id, ad, liste: list.map(([d, l]) => ({ d, ad: l })) });

  // 1) Ag/AgCl yapışkanlı deri elektrodu kesiti (SEKIL.cizim)
  VIZ.fk21b_elektrot = (el) => SEKIL.cizim(el, {
    baslik: 'Tek kullanımlık Ag/AgCl deri elektrodunun katmanları',
    giris: 'Elektrot ve temas yüzeylerini incelemek için bir numara seçin. [[K6 s. 351–352]]',
    gorunumler: [{
      ad: 'Dikey kesit', resim: 'img/fizik/21b-elektrot.webp', en: 1024, boy: 765,
      noktalar: [
        { x: 500, y: 170, ad: 'Metal çıtçıt bağlantısı', metin: 'EKG kablosunun bağlandığı üst metal uçtur; doğrudan deriye değmez. [[K6 s. 351–352]]' },
        { x: 760, y: 340, ad: 'Yapışkan taşıyıcı', metin: 'Elektrodu deri üzerinde sabit tutar ve jel havuzunu çevreler. [[K6 s. 351–352]]' },
        { x: 408, y: 310, ad: 'Ag/AgCl diski', metin: 'Jelin arkasındaki gümüş/gümüş klorür disk kabloyla elektriksel bağlantıyı kurar. [[K6 s. 351]]' },
        { x: 510, y: 364, ad: 'İletken AgCl jeli', metin: 'Metal olmayan iletken jel yumuşak yapısıyla deriye uyumlu temas kurar ve ter–metal tepkimesini önler. [[K6 s. 351]]' },
        { x: 230, y: 397, ad: 'Deri yüzeyi', metin: 'Yüksek elektriksel direnç gösterir; bu nedenle hücre sinyalleri deri yüzeyinde belirgin biçimde zayıflar (attenuation). [[K6 s. 352]]' },
        { x: 230, y: 475, ad: 'Alttaki doku', metin: 'Yüzeye ulaşan sinyali aradaki dokular da zayıflatır, ancak dirençte en büyük pay deriye aittir. [[K6 s. 352–353]]' },
      ],
    }],
  });

  // 2) Einthoven üçgeni ve bipolar I, II, III projeksiyonları
  VIZ.fk21b_einthoven = (el) => SEKIL.sahne(el, {
    baslik: 'Einthoven üçgeni ve kardiyak vektörün I, II, III yansıması',
    vb: [640, 270], vbDar: [360, 290],
    param: [{ id: 'aci', ad: 'Kardiyak vektör açısı', min: -90, max: 180, adim: 15, deger: 60, birim: '°' }],
    ciz(S, t, { aci }) {
      const cx = S.dar ? S.w / 2 : 196, cy = 116, r = 82;
      const ra = [cx - r * 0.86, cy - r * 0.5], la = [cx + r * 0.86, cy - r * 0.5], ll = [cx, cy + r];
      const rad = (aci * Math.PI) / 180;
      const vx = Math.cos(rad) * 52, vy = Math.sin(rad) * 52;
      let s = S.cizgi([ra, la, ll, ra], { renk: 'line', w: 2 })
        + S.ok([[cx, cy], [cx + vx, cy + vy]], { renk: 'clin', w: 3.5 })
        + S.t(ra[0], ra[1] - 18, 'RA (−)', kucuk)
        + S.t(la[0], la[1] - 18, 'LA (+I/−III)', kucuk)
        + S.t(ll[0], ll[1] + 18, 'LL (+II/+III)', { a: 'middle', c: 'k' })
        + S.t(ra[0] + r * 0.86, ra[1] - 10, 'I', { a: 'middle', c: 'b k', renk: 'accent' })
        + S.t(cx - 56, cy + 32, 'II', { a: 'end', c: 'b k', renk: 'accent' })
        + S.t(cx + 56, cy + 32, 'III', { c: 'b k', renk: 'accent' });

      const p1 = Math.cos(rad), p2 = Math.cos(rad - Math.PI / 3), p3 = Math.cos(rad - (2 * Math.PI) / 3);
      const bx = S.dar ? 34 : 386, bw = S.dar ? S.w - 68 : 216, by0 = S.dar ? 216 : 64;
      if (!S.dar) {
        [ ['Lead I (0°)', p1], ['Lead II (+60°)', p2], ['Lead III (+120°)', p3] ].forEach(([ad, val], idx) => {
          const y = by0 + idx * 54;
          const col = Math.abs(val) < 0.08 ? 'muted' : val > 0 ? 'ok' : 'crit';
          s += S.t(bx, y, `${ad}: ${val > 0.08 ? '+' : val < -0.08 ? '−' : '0'} (${fmt(val)})`, { c: 'k' })
            + S.kutu(bx, y + 8, bw, 14, { renk: 'line', dolgu: 'chip' })
            + S.kutu(bx + bw / 2 + (val < 0 ? (val * bw) / 2 : 0), y + 8, Math.abs(val) * (bw / 2), 14, { renk: col, dolgu: col });
        });
      } else {
        s += S.t(S.w / 2, 242, `I: ${fmt(p1)}  ·  II: ${fmt(p2)}  ·  III: ${fmt(p3)}`, orta);
      }
      return s + S.t(S.dar ? S.w / 2 : 494, S.dar ? 268 : 238, 'Aynı yön +, zıt yön −, dik ise 0 sapma', kucuk);
    },
    metin: ({ aci }) => {
      const rad = (aci * Math.PI) / 180;
      const p1 = Math.cos(rad), p2 = Math.cos(rad - Math.PI / 3), p3 = Math.cos(rad - (2 * Math.PI) / 3);
      return `${aci}° kardiyak vektör açısında derivasyon izdüşümleri — I: ${fmt(p1)}, II: ${fmt(p2)}, III: ${fmt(p3)} (birim vektörün geometrik izdüşümleri). [[K6 s. 353–354]]`;
    },
  });

  // 3) EMG yöntemleri ve lezyon ayrımı
  VIZ.fk21b_emg = (el) => SEKIL.sahne(el, {
    baslik: 'İskelet kası EMG ölçümü ve sinir–kavşak–kas ayrımı',
    vb: [640, 235], vbDar: [360, 270],
    secenek: sec('kip', 'Görünüm', [
      ['yuzey', 'Yüzeyel EMG'],
      ['igne', 'İntramüsküler EMG'],
      ['devre', 'Arıza yeri ayrımı'],
    ]),
    ciz(S, t, { kip }) {
      const cx = S.w / 2;
      if (kip === 'yuzey') {
        return S.kutu(48, 44, S.w - 96, 66, { renk: 'basic', dolgu: 'basic-soft', yazi: 'Deri üzerinde elektrot' })
          + S.kutu(48, 128, S.w - 96, 54, { renk: 'line', dolgu: 'paper', yazi: 'Sıcaklık ve yerel fizyoloji' })
          + S.t(cx, 212, 'Genlik: 50 μV – 30 mV · Frekans: 7–20 Hz', orta);
      }
      if (kip === 'igne') {
        return S.kutu(48, 44, S.w - 96, 66, { renk: 'clin', dolgu: 'clin-soft', yazi: 'Kas içinde iğne elektrot' })
          + S.kutu(48, 128, S.w - 96, 54, { renk: 'line', dolgu: 'paper', yazi: 'Daha çok lif → daha büyük diken' })
          + S.t(cx, 212, 'Kısa diken · hızlı repolarizasyon', orta);
      }
      const items = [['Motor sinir', 'İletim hızı'], ['NM kavşak', 'İletim geçişi'], ['Motor ünite', 'Kas yanıtı']];
      if (S.dar) {
        return items.map(([a, b], i) => S.kutu(36, 18 + i * 74, S.w - 72, 54, { renk: 'accent', dolgu: 'accent-soft', yazi: `${a} · ${b}` })).join('');
      }
      return items.map(([a, b], i) => {
        const x = 30 + i * 202;
        return (i ? S.ok([[x - 26, 108], [x - 4, 108]], { renk: 'muted' }) : '')
          + S.kutu(x, 64, 174, 88, { renk: 'accent', dolgu: 'accent-soft', yazi: [a, b] });
      }).join('') + S.t(cx, 198, 'Sinir iletimi ve EMG dalgaları karşılaştırılarak sorun yeri belirlenir', orta);
    },
    metin: ({ kip }) => ({
      yuzey: 'Yüzeyel EMG noninvazivdir ancak ölçülen sinyal yerel deri sıcaklığına ve fizyolojiye bağlıdır. [[K6 s. 357]]',
      igne: 'İntramüsküler EMG iğne veya iki ince telli iğneyle kas içindeki motor ünite aksiyon potansiyelini kaydeder. [[K6 s. 357]]',
      devre: 'Motor sinir iletimi ile EMG dalga biçimleri karşılaştırılarak patolojinin sinir, nöromüsküler kavşak ya da kasta olduğu ayırt edilir. [[K6 s. 357]]',
    })[kip],
  });

  // 4) EEG frekans bantları ve burst supresyon
  VIZ.fk21b_eeg = (el) => SEKIL.sahne(el, {
    baslik: 'EEG frekans bantları ve anestezi derinliği (burst supresyon)',
    vb: [640, 240], vbDar: [360, 260],
    secenek: sec('bant', 'Bant / Durum', [
      ['delta', 'δ (0,5–4 Hz)'],
      ['theta', 'θ (4–8 Hz)'],
      ['alpha', 'α (8–13 Hz)'],
      ['beta', 'β (13–22 Hz)'],
      ['gamma', 'γ (22–30 Hz)'],
      ['burst', 'Burst supresyon'],
    ]),
    ciz(S, t, { bant }) {
      const frekans = { delta: (0.5 + 4) / 2, theta: (4 + 8) / 2, alpha: (8 + 13) / 2, beta: (13 + 22) / 2, gamma: (22 + 30) / 2 };
      const burst = bant === 'burst';
      const f = frekans[bant];
      const pts = Array.from({ length: 721 }, (_, i) => {
        const u = i / 720;
        const etkin = u > 0.12 && u < 0.28 || u > 0.59 && u < 0.72;
        const y = burst ? (etkin ? 30 * Math.sin(48 * Math.PI * u) : 0)
          : 30 * Math.sin(2 * Math.PI * f * u);
        return [24 + u * (S.w - 48), 108 - y];
      });
      return S.cizgi([[24, 108], [S.w - 24, 108]], { renk: 'line' })
        + S.cizgi(pts, { renk: 'accent', w: 2.2 })
        + S.t(S.w / 2, 166, burst ? 'Boşalım ve baskılanma' : String(f).replace('.', ',') + ' Hz · bir saniyelik pencere', orta)
        + S.t(S.w / 2, 199, 'Genlik şematiktir', kucuk);
    },
    metin: ({ bant }) => ({
      delta: 'Delta (0,5–4 Hz): yüksek genlikli dalgalar; yetişkinde yavaş dalga uykusu, sürekli dikkat veya subkortikal lezyonu gösterebilir. [[K6 s. 358]]',
      theta: 'Teta (4–8 Hz): görevle ilişkili bölgelerden uzakta izlenir; uyku hali ve boşta kalmayla ilişkilidir. [[K6 s. 358]]',
      alpha: 'Alfa (8–13 Hz): posteriorda iki taraflı (baskın tarafta yüksek); gevşeme, gözler kapalı durum ve komada görülür. [[K6 s. 358]]',
      beta: 'Beta (13–22 Hz): simetrik, düşük genlikli; uyanıklık, aktif odaklanma ve anksiyetede görülür. [[K6 s. 358]]',
      gamma: 'Gama (22–30 Hz): somatosensoriyel korteks; kısa süreli bellek çağırma ve çoklu duyu algısıyla ilişkilidir. [[K6 s. 358]]',
      burst: 'Derin anestezide yüksek genlikli boşalımlar baskılanabilir. [[K6 s. 358]] Kitap bu örüntüyü en düşük beyin metabolizma hızıyla ilişkilendirir. [[K6 s. 358]]',
    })[bant],
  });

  // 5) Kalıcı kalp pili ve aktif/pasif fiksasyon uçları (SEKIL.cizim)
  VIZ.fk21b_pil = (el) => SEKIL.cizim(el, {
    baslik: 'Kalıcı kalp pili bileşenleri ve lead fiksasyon mekanizmaları',
    giris: 'Üretece, gövdeye, lead’e ve alttaki iki uç mekanizmasına dokunun. [[K6 s. 360–361]]',
    gorunumler: [{
      ad: 'Sistem ve uçlar', resim: 'img/fizik/21b-pil.webp', en: 1024, boy: 1024,
      noktalar: [
        { x: 430, y: 325, ad: 'Titanyum darbe üreteci', metin: 'Üreteç genellikle prepektoral fasyaya yerleştirilir ve sızdırmaz gövdesinde çoğunlukla lityum iyodür pil bulunur. [[K6 s. 360]]' },
        { x: 430, y: 108, ad: 'Başlık ve bağlantı pimi', metin: 'Esnek yalıtımlı lead’in bağlantı pimi buradan üretecin atriyal veya ventriküler kanalına bağlanır. [[K6 s. 360–361]]' },
        { x: 834, y: 320, ad: 'Esnek yalıtımlı lead', metin: 'Subklavyen venden sağ kalp odacıklarına uzanır; algılanan sinyali üretece ve uyarı darbesini kalbe iletir. [[K6 s. 360–361]]' },
        { x: 508, y: 590, ad: 'Elektrot ucu (EGM)', metin: 'Kalp yüzeyiyle temas eden elektrot yakınındaki miyokardın depolarizasyonu EGM’ye yansır. [[K6 s. 360–362]]' },
        { x: 328, y: 776, ad: 'Aktif fiksasyon (tirbuşon)', metin: 'Kalp yüzeyine vidalanan tirbuşon benzeri uçtur; hem unipolar hem bipolar sistemde kullanılabilir. [[K6 s. 361]]' },
        { x: 710, y: 767, ad: 'Pasif fiksasyon (çıkıntılar)', metin: 'Gemi çapası gibi küçük çıkıntılarla (tines) kalp yüzeyine tutunur; unipolar veya bipolar olabilir. [[K6 s. 361]]' },
      ],
    }],
  });

  // Ortak çizim düzeni: her basamakta kısa etiket ve tek akış yönü.
  function akis(S, satirlar) {
    const cx = S.w / 2;
    const w = Math.min(S.w - 36, 380);
    return satirlar.map((yazi, i) => {
      const y = 14 + 78 * i;
      return (i ? S.ok([[cx, y - 23], [cx, y - 4]], { renk: 'muted' }) : '')
        + S.kutu(cx - w / 2, y, w, 52, { yazi, renk: 'accent', dolgu: 'accent-soft' });
    }).join('');
  }

  VIZ.fk21b_mod = (el) => SEKIL.sahne(el, {
    baslik: 'Ventrikülün kendi atımına pil yanıtı', vb: [640, 238], vbDar: [360, 238],
    secenek: sec('mod', 'Mod', [['voo', 'VOO'], ['vvi', 'VVI'], ['ddd', 'DDD']]),
    param: [{ id: 'atim', ad: 'Bekleme aralığındaki ventrikül atımı', min: 0, max: 1, adim: 1, deger: 1 }],
    ciz(S, t, { mod, atim }) {
      const baslangic = { voo: 'Sabit hız', vvi: 'Ventriküler bekleme aralığı', ddd: 'Atriyal olay → AV gecikme' };
      const atimVar = atim ? 'İntrensek ventrikül atımı var' : 'İntrensek ventrikül atımı yok';
      const sonuc = mod === 'voo' ? 'Sabit hızla uyarı' : atim ? 'Ventrikül uyarısı baskılanır' : 'Süre dolunca ventrikül uyarılır';
      return akis(S, [baslangic[mod], atimVar, sonuc]);
    },
    metin: ({ mod, atim }) => {
      if (mod === 'voo') return 'VOO algılama yapmadığından alttaki ritim sabit uyarı hızını değiştirmez. [[K6 s. 362]]';
      if (mod === 'vvi') return atim ? 'VVI kendi ventrikül atımını algıladığında darbeyi baskılar. [[K6 s. 362]]' : 'VVI programlanan aralıkta atım gelmezse ventrikülü uyarır. [[K6 s. 362]]';
      return atim ? 'DDD atriyal olaydan sonra AV gecikme içinde ventrikül yanıtını algılarsa ventriküler darbe baskılanır. [[K6 s. 362]]' : 'DDD atriyal olaydan sonra AV gecikme boyunca ventrikül yanıtı almazsa ventrikülü uyarır. [[K6 s. 362]]';
    },
  });

  VIZ.fk21b_referans = (el) => SEKIL.sahne(el, {
    baslik: 'EKG bağlantılarını karşılaştırın', vb: [420, 235], vbDar: [360, 235],
    secenek: sec('derivasyon', 'Ölçüm', [['v', 'V1–V6'], ['i', 'I'], ['ii', 'II'], ['iii', 'III']]),
    ciz(S, t, { derivasyon }) {
      const cx = S.w / 2;
      if (derivasyon !== 'v') {
        const uclar = { i: ['Sağ kol', 'Sol kol'], ii: ['Sağ kol', 'Sol bacak'], iii: ['Sol kol', 'Sol bacak'] };
        const pozitifX = S.w - 62;
        const [eksi, arti] = uclar[derivasyon];
        return S.t(62, 80, eksi, orta) + S.t(pozitifX, 80, arti, orta)
          + S.cizgi([[62, 94], [62, 140], [cx - 53, 140]], { renk: 'basic' })
          + S.cizgi([[pozitifX, 94], [pozitifX, 140], [cx + 53, 140]], { renk: 'clin' })
          + S.kutu(cx - 53, 115, 106, 50, { yazi: '−  EKG  +' });
      }
      let svg = '';
      for (const [i, ad] of ['RA', 'LA', 'LL'].entries()) {
        const x = 37 + i * 56;
        svg += S.t(x, 36, ad, orta)
          + S.cizgi([[x, 45], [x, 68]], { renk: 'basic' })
          + S.kutu(x - 14, 68, 28, 38, { yazi: 'R', renk: 'basic' })
          + S.cizgi([[x, 106], [x, 126], [93, 126]], { renk: 'basic' });
      }
      const gogusX = S.w - 66;
      return svg + S.cizgi([[93, 126], [93, 174], [cx - 53, 174]], { renk: 'basic' })
        + S.daire(93, 126, 4, { renk: 'basic', dolgu: 'basic' })
        + S.t(gogusX, 85, ['Göğüs', 'elektrodu'], orta)
        + S.cizgi([[gogusX, 112], [gogusX, 174], [cx + 53, 174]], { renk: 'clin' })
        + S.kutu(cx - 53, 149, 106, 50, { yazi: '−  EKG  +' });
    },
    metin: ({ derivasyon }) => derivasyon === 'v'
      ? 'Üç eşit direnç ortak referansa bağlanır ve göğüs elektrodunun potansiyeli bu noktaya göre ölçülür. [[K6 s. 354–356]]'
      : 'Bipolar derivasyonda gerilim farkı iki ekstremite elektrodu arasında ölçülür. [[K6 s. 354]]',
  });

  VIZ.fk21b_filtre = (el) => SEKIL.sahne(el, {
    baslik: 'Parazit kaynağı ve filtre', vb: [640, 238], vbDar: [360, 238],
    secenek: sec('kaynak', 'Kaynak', [['solunum', 'Solunum'], ['kas', 'Kas hareketi'], ['sebeke', 'Şebeke']]),
    ciz(S, t, { kaynak }) {
      const etiket = { solunum: 'Yavaş gövde hareketi', kas: 'Kas kaynaklı sinyal', sebeke: 'Şebeke · 50–60 Hz' };
      return akis(S, [etiket[kaynak], 'EKG ile birlikte yükseltilir', kaynak === 'solunum' ? 'Yüksek geçiren filtre' : 'Alçak geçiren filtre']);
    },
    metin: ({ kaynak }) => kaynak === 'solunum'
      ? 'Yüksek geçiren filtre solunuma ve gövde hareketine bağlı yavaş değişimleri azaltır. [[K6 s. 356]]'
      : 'Alçak geçiren filtre kas hareketine ve şebeke elektriğine bağlı bozulmaları azaltır. [[K6 s. 356]]',
  });

  function spektralAdim(S, asama) {
    const x = 32, w = S.w - 90, y = 148;
    const iz = Array.from({ length: 241 }, (_, i) => {
      const u = i / 240;
      return [x + w * u, y - 24 * Math.sin(u * 70) * Math.cos(u * 8) - 13 * Math.sin(u * 21)];
    });
    if (!asama) {
      let svg = S.cizgi(iz, { renk: 'accent' });
      for (let i = 0; i <= 4; i++) svg += S.cizgi([[x + i * w / 4, y - 62], [x + i * w / 4, y + 44]], { renk: 'muted', kesik: true });
      return svg + S.t(S.w / 2, 222, 'Eşit süreli epoklar → zaman', orta);
    }
    let svg = '';
    const kat = asama === 1 ? 1 : 4;
    for (let k = kat - 1; k >= 0; k--) {
      const taban = y + 16 - k * 17;
      const noktalar = Array.from({ length: 101 }, (_, i) => {
        const u = i / 100;
        const pik = (m, a) => a * Math.exp(-Math.pow((u - m) / 0.1, 2));
        return [x + w * u + k * 12, taban - pik(0.24, 50 - k * 9) - pik(0.65, 15 + k * 11)];
      });
      svg += S.cizgi(noktalar, { renk: k ? 'muted' : 'accent', w: 2 });
    }
    return svg + S.t(S.w / 2, 210, asama === 1 ? 'Bir epok → frekans spektrumu' : 'Her sıra ayrı bir zaman dilimi', orta);
  }

  VIZ.fk21b_spektrum = (el) => SEKIL.adim(el, {
    baslik: 'Sıkıştırılmış spektral dizi', vb: [640, 245], vbDar: [360, 245],
    adimlar: [
      { ad: 'Epok', ciz: S => spektralAdim(S, 0), metin: 'Kayıt dönemi sabit süreli epoklara ayrılır. [[K6 s. 359]]' },
      { ad: 'Fourier', ciz: S => spektralAdim(S, 1), metin: 'Her epoktan Fourier analiziyle bir frekans spektrumu elde edilir. [[K6 s. 359]]' },
      { ad: 'Dizi', ciz: S => spektralAdim(S, 2), metin: 'Spektrumların zaman sırasıyla dizilmesi spektral özelliklerin değişimini gösterir. [[K6 s. 359]]' },
    ],
  });

  VIZ.fk21b_yol = (el) => SEKIL.sahne(el, {
    baslik: 'Geçici uyarının iletim yolu', vb: [640, 238], vbDar: [360, 238],
    secenek: sec('yol', 'Yol', [['ven', 'Transvenöz'], ['ped', 'Harici'], ['epi', 'Epikardiyal']]),
    ciz(S, t, { yol }) {
      const yollar = {
        ven: ['Sağ venöz giriş', 'Röntgen eşliğinde tel', 'Sağ ventrikül'],
        ped: ['Uyarı işlevli defibrilatör', 'Göğüs pedleri', 'Kalp ve göğüs kaslarında kasılma'],
        epi: ['Kalp cerrahisi sonrası', 'Doğrudan yerleştirilen teller', 'Epikardiyal temas'],
      };
      return akis(S, yollar[yol]);
    },
    metin: ({ yol }) => ({
      ven: 'Geçici transvenöz tel sağ ventriküle ilerletilir. [[K6 s. 362–363]]',
      ped: 'Pedler transvenöz uyarı sağlanana kadar köprü olabilir. [[K6 s. 363]]',
      epi: 'Doğrudan epikarda tutturulan teller genellikle kalp cerrahisinden hemen sonra kullanılır. [[K6 s. 363]]',
    })[yol],
  });
})();
