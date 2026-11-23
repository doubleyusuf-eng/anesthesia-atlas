/* Ek75: K2 s. 320–324; tüm nicel olmayan çizimler şematiktir. */
(function () {
  'use strict';
  const DEK75_VIZ = window.VIZ;
  const DEK75_REF = (s) => window.VIZ_YARDIM.REF(s);
  const DEK75_Y = (S, x, y, renk = 'accent', star = false) =>
    S.cizgi([[x - 7, y - 12], [x, y - 4], [x + 7, y - 12]], { renk, w: 3 }) +
    S.cizgi([[x, y - 4], [x, y + 10]], { renk, w: 3 }) + (star ? S.t(x + 10, y - 7, '✦', { renk }) : '');
  const DEK75_AK = (S, pts, t, renk = 'accent') => S.ok(pts, { renk }) + S.akis(pts, t, { renk, n: 3, r: 3 });
  const DEK75_BOX = (S, x, y, w, h, text, renk = 'accent') => S.kutu(x, y, w, h, { yazi: text, renk, dolgu: renk === 'muted' ? 'paper' : renk + '-soft' });
  // Dikey akış, uzun Türkçe etiketleri dar ekranda da aynı satır sayısıyla korur.
  const DEK75_FLOW = (S, rows, t, start = 24, gap = 94) => rows.map((r, i) => {
    const y = start + i * gap, x = (S.w - 280) / 2;
    return DEK75_BOX(S, x, y, 280, 56, r[0], r[1] || 'accent') +
      (i < rows.length - 1 ? DEK75_AK(S, [ [S.w / 2, y + 58], [S.w / 2, y + gap - 3]], t, r[1] || 'accent') : '');
  }).join('');
  const DEK75_ADIM = (el, cfg) => {
    cfg.adimlar = cfg.adimlar.map(a => ({ ...a, metin: DEK75_REF(a.metin) }));
    const stop = SEKIL.adim(el, cfg);
    if (window.VIZ_YARDIM.RM) el.querySelector(`[data-i="${cfg.adimlar.length - 1}"]`).click();
    return stop;
  };

  DEK75_VIZ.fek75_ret = el => DEK75_ADIM(el, {
    baslik: 'Greft reddinde duyarlanma, hücresel ve hümoral yıkım',
    vb: [640, 490], vbDar: [360, 490], hareket: true,
    adimlar: [
      { ad: 'Duyarlanma', metin: 'Konağın lenfositleri vericinin yabancı antijenleriyle karşılaşır. HLA sınıf II yardımcı T, sınıf I sitotoksik T ile etkileşir; makrofajlar IL-1 salar. [[K2 s. 320]]', ciz: (S, t) => {
        const c = S.w / 2, l = c - 84, r = c + 84;
        return DEK75_BOX(S, c - 160, 18, 320, 80, ['Greft hücresi (verici)', 'Yüzey antijenleri'], 'clin') +
          S.rozet(l, 112, 'HLA II', { renk: 'basic', dolgu: 'basic-soft' }) + S.rozet(r, 112, 'HLA I') +
          DEK75_AK(S, [[l, 128], [l, 210]], t, 'basic') + DEK75_AK(S, [[r, 128], [r, 210]], t, 'crit') +
          S.daire(l, 254, 43, { renk: 'basic', dolgu: 'basic-soft' }) + S.t(l, 250, ['Yardımcı', 'T'], { a: 'middle', c: 'b' }) +
          S.daire(r, 254, 43, { renk: 'crit', dolgu: 'crit-soft' }) + S.t(r, 250, ['Sitotoksik', 'T'], { a: 'middle', c: 'b' }) +
          S.t(c, 324, 'Konak lenfositleri', { a: 'middle' }) +
          DEK75_BOX(S, c - 120, 363, 240, 58, ['Makrofaj → IL-1', 'Duyarlanmaya katkı'], 'warn');
      } },
      { ad: 'IL-2', metin: 'Antijen ve makrofaj kaynaklı IL-1, yardımcı T lenfositlerini IL-2 salmaya uyarır. IL-2 sitotoksik T lenfositlerini etkinleştirir; konak grefte saldırmaya hazırdır. [[K2 s. 320]]', ciz: (S, t) => DEK75_FLOW(S, [
        [['Greft antijeni', '+ makrofajdan IL-1'], 'clin'], ['Yardımcı T lenfositi', 'basic'], ['IL-2 salınımı', 'basic'], [['Sitotoksik T', 'ETKİN'], 'crit']
      ], t) },
      { ad: 'Hücresel yıkım', metin: 'Sitotoksik T greft hücrelerine doğrudan toksiktir. Yardımcı T kaynaklı lenfokinler makrofaj saldırısını uyarır. Makrofajdan IL-1 yardımcı T’yi etkinleştirir; TNF ve IFN-γ ile greftte HLA sınıf II artar. [[K2 s. 320]]', ciz: (S, t) => {
        const c = S.w / 2;
        let s = DEK75_BOX(S, c - 155, 12, 310, 50, 'Sitotoksik T', 'crit');
        s += DEK75_AK(S, [[c, 64], [c, 109]], t, 'crit') + S.t(c + 10, 91, 'Doğrudan toksik', { c: 'k', renk: 'crit' });
        s += DEK75_BOX(S, c - 155, 113, 310, 68, ['Greft hasarı', 'HLA II ↑'], 'clin');
        for (let k = 0; k < 5; k++) s += S.daire(c - 44 + 22 * k, 184, 6, { renk: 'basic', dolgu: 'basic-soft' });
        s += DEK75_AK(S, [[c - 90, 271], [c - 90, 198]], t, 'warn');
        s += S.t(c - 78, 236, 'Saldırı', { c: 'k' });
        s += DEK75_BOX(S, c - 155, 275, 130, 62, ['Makrofaj', 'IL-1'], 'warn');
        s += DEK75_BOX(S, c + 25, 275, 130, 62, ['Yardımcı T', 'lenfokin'], 'basic');
        s += DEK75_AK(S, [[c + 23, 292], [c - 23, 292]], t, 'basic');
        s += DEK75_AK(S, [[c - 23, 326], [c + 23, 326]], t, 'warn');
        s += DEK75_AK(S, [[c + 90, 274], [c + 90, 198]], t, 'basic');
        s += S.t(c + 90, 219, ['TNF', 'IFN-γ'], { a: 'middle', c: 'k' });
        return s + S.t(c, 396, ['IL-1 → yardımcı T → sitokinler', 'Greftte HLA II ekspresyonu artar'], { a: 'middle', c: 'k' });
      } },
      { ad: 'Hümoral yıkım', metin: 'Greftten gelen çözünür antijenler B lenfositlerini antikor salgılamaya uyarır. Antikorlar komplemanı etkinleştirir; greftte ek hücre hasarı oluşur. [[K2 s. 320]]', ciz: (S, t) => {
        const c = S.w / 2;
        return DEK75_FLOW(S, [ [['Greft', 'Çözünür antijen'], 'clin'], ['B lenfosit', 'ok'], ['Antikor → kompleman', 'warn'], [['Greft zarı', 'Hücre hasarı'], 'crit'] ], t) +
          DEK75_Y(S, c - 103, 240, 'ok') + DEK75_Y(S, c + 103, 240, 'ok') +
          S.daire(c - 100, 328, 17, { renk: 'warn' }) +
          S.cizgi([[c + 100, 311], [c + 91, 323], [c + 105, 333], [c + 96, 349]], { renk: 'crit', w: 3 });
      } },
      { ad: 'Ret yolları', metin: 'Doku reddi sitotoksik lenfositler, yardımcı T sitokinleri, kompleman ve NK hücreleriyle gelişebilir. Oklar konağın grefte yönelen efektör yollarını gösterir. [[K2 s. 320]]', ciz: (S, t) => {
        const c = S.w / 2;
        return [ ['1 · Sitotoksik', 'lenfosit', 'crit'], ['2 · Yardımcı T', 'sitokinleri', 'basic'], ['3 · Kompleman', '', 'warn'], ['4 · NK hücresi', '', 'muted'] ].map((a, i) => {
          const x = c - 160, y = 24 + i * 98;
          return DEK75_BOX(S, x, y, 220, 64, a.slice(0, 2), a[2]) +
            DEK75_AK(S, [[x + 222, y + 32], [c + 91, y + 32]], t, a[2]);
        }).join('') + DEK75_BOX(S, c + 95, 24, 68, 358, ['Greft', 'hücresi', '↓', 'Hasar'], 'clin');
      } }
    ]
  });

  const DEK75_TIME = z => Math.pow(1576800, z / 100);
  const DEK75_FMT = m => {
    const [n, u] = m < 60 ? [m, 'dk'] : m < 1440 ? [m / 60, 'saat'] : m < 10080 ? [m / 1440, 'gün'] : m < 43200 ? [m / 10080, 'hafta'] : m < 525600 ? [m / 43200, 'ay'] : [m / 525600, 'yıl'];
    return n.toLocaleString('tr-TR', { maximumFractionDigits: n < 10 ? 1 : 0 }) + ' ' + u;
  };
  const DEK75_BANDS = [
    ['Hiperakut', 1, 60, 'crit', 'Hazır sitotoksik antikorlar endotel HLA I’e bağlanır → kompleman ve koagülasyon → mikrovasküler tromboz → greft enfarktüsü.'],
    ['Hızlanmış', 1, 5760, 'warn', 'İlk 4 günde, verici antijenlerine önceden duyarlı alıcıda hücresel ve hümoral yanıt.'],
    ['Akut ret', 1, 43200, 'accent', 'İlk ayda T lenfosit aracılı rejeksiyon.'],
    ['Kronik ret', 86400, 1576800, 'basic', 'Aylar–yıllar içinde hücresel ve/veya antikor yanıtı; arteriyol daralması, iskemi ve yavaş işlev kaybı.'],
    ['Akut GVHR', 1, 40320, 'clin', 'İlk 4 haftada vericinin aktif lenfositleri alıcıya saldırır (ör. kemik iliği nakli): dermatit, sarılık, hepatosplenomegali ve ağır enfeksiyon.'],
    ['Kronik GVHR', 144000, 1576800, 'clin', '100 gün ve sonrasında hepatit, perikardit, miyozit ve fırsatçı enfeksiyonla ölüm görülebilir.']
  ];
  DEK75_VIZ.fek75_zaman = el => {
    const stop = SEKIL.sahne(el, {
      baslik: 'Nakil reaksiyonlarının logaritmik zaman çizgisi', vb: [640, 480], vbDar: [360, 730],
      param: [{ id: 'z', ad: 'Nakilden sonra zaman', min: 0, max: 100, adim: 1, deger: 5 }],
      ciz: (S, t, p) => {
        const m = DEK75_TIME(p.z), log = v => Math.log(v) / Math.log(1576800);
        let s = S.t(S.w / 2, 24, DEK75_FMT(m), { a: 'middle', c: 'b' });
        const ticks = [[1, '1 dk'], [60, '1 sa'], [1440, '1 gün'], [5760, '4 gün'], [40320, '4 hafta'], [144000, '100 gün'], [525600, '1 yıl']];
        if (S.dar) {
          const Y = v => 88 + 440 * log(v);
          s += S.t(113, 52, 'HVGR', { c: 'b' }) + S.t(260, 52, 'GVHR', { c: 'b' });
          s += S.t(170, 70, ['Konak', '↓ greft'], { a: 'middle', c: 'k' }) + S.t(294, 70, ['Greft', '↓ konak'], { a: 'middle', c: 'k' });
          s += S.cizgi([[91, 88], [91, 528]], { renk: 'line' });
          ticks.forEach(([v, ad]) => { s += S.t(83, Y(v) + 5, ad, { a: 'end', c: 'k' }) + S.cizgi([[88, Y(v)], [340, Y(v)]], { renk: 'line', w: 1 }); });
          DEK75_BANDS.forEach((b, i) => {
            const x = 109 + i * 37, active = m >= b[1] && m <= b[2];
            s += S.kutu(x, Y(b[1]), 22, Math.max(3, Y(b[2]) - Y(b[1])), { renk: b[3], dolgu: b[3] + '-soft', soluk: !active, kesik: i === 5, w: active ? 3 : 1.5 });
            s += S.t(x + 11, 552, String(i + 1), { a: 'middle', c: 'b', renk: b[3] });
          });
          s += S.cizgi([[92, Y(m)], [340, Y(m)]], { renk: 'ink', w: 2 });
          DEK75_BANDS.forEach((b, i) => { s += S.t(16 + (i % 2) * 174, 582 + Math.floor(i / 2) * 24, `${i + 1} ${b[0]}`, { c: 'k', renk: b[3] }); });
        } else {
          const X = v => 155 + 454 * log(v);
          s += S.t(18, 55, 'HVGR : konak → greft', { c: 'b' });
          DEK75_BANDS.forEach((b, i) => {
            const y = 72 + i * 40 + (i > 3 ? 34 : 0), active = m >= b[1] && m <= b[2];
            if (i === 4) s += S.t(18, y - 10, 'GVHR : greft → konak', { c: 'b' });
            s += S.t(18, y + 17, b[0], { c: 'k' });
            s += S.kutu(X(b[1]), y, Math.max(4, X(b[2]) - X(b[1])), 23, { renk: b[3], dolgu: b[3] + '-soft', soluk: !active, kesik: i === 5, w: active ? 3 : 1.5 });
          });
          ticks.forEach(([v, ad], i) => { s += S.cizgi([[X(v), 342], [X(v), 349]], { renk: 'muted' }) + S.t(X(v), 366 + (i % 2) * 19, ad, { a: 'middle', c: 'k' }); });
          s += S.cizgi([[X(m), 65], [X(m), 338]], { renk: 'ink' });
        }
        const y = S.dar ? 650 : 402;
        const active = DEK75_BANDS.filter(b => m >= b[1] && m <= b[2]);
        const hasGVHR = active.some(b => b[0].includes('GVHR'));
        s += DEK75_BOX(S, 18, y, S.w - 36, 62, m <= 60 ? ['Mikrotrombüs → enfarkt', 'Konak → greft'] : m >= 86400 ? ['Daralan arteriyol → iskemi', hasGVHR ? 'HVGR + GVHR olası' : 'Konak → greft'] : hasGVHR ? ['İki yönü ayırt et', 'HVGR: konak → greft; GVHR: tersi'] : ['Şematik zaman aralığı', 'Bantlar tanı veya olasılık değildir'], 'clin');
        return s;
      },
      metin: p => {
        const active = DEK75_BANDS.filter(b => DEK75_TIME(p.z) >= b[1] && DEK75_TIME(p.z) <= b[2]);
        return DEK75_REF(`<b>${DEK75_FMT(DEK75_TIME(p.z))}.</b><br>` + (active.length ? active.map(b => `<b>${b[0]}:</b> ${b[4]} [[K2 s. 320]]`).join('<br>') : 'Bu aralıkta kitabın sınıflamasında yeni bir tip başlamaz; kronik rejeksiyon aylar içinde gelişir. [[K2 s. 320]]'));
      }
    });
    // Kitin sayısal çıktısını logaritmik eksenin gerçek zaman birimine çevir.
    const sync = () => {
      const input = el.querySelector('[data-k="z"]'), out = el.querySelector('[data-o="z"]');
      out.textContent = DEK75_FMT(DEK75_TIME(+input.value));
      input.setAttribute('aria-valuetext', out.textContent);
    };
    el.addEventListener('input', sync); sync();
    return () => { el.removeEventListener('input', sync); stop(); };
  };

  DEK75_VIZ.fek75_test = el => DEK75_ADIM(el, {
    baslik: 'Bağışıklık testlerinin çalışma ilkeleri', vb: [640, 570], vbDar: [360, 570], hareket: true,
    adimlar: [
      { ad: 'Deri prik', metin: 'Çok az alerjen dermise girer, mast hücrelerine bağlı IgE ile tepkimeye girer; dakikalar içinde kabarıklık ve kızarıklık gelişir. Kas gevşetici, indüksiyon ajanı, lokal anestezik, lateks ve antibiyotik alerjisinde ana yöntemdir. [[K2 s. 321]]', ciz: (S, t) => {
        const c = S.w / 2;
        let s = S.kutu(18, 155, S.w - 36, 45, { dolgu: 'clin-soft' }) + S.kutu(18, 201, S.w - 36, 254, { dolgu: 'basic-soft' });
        s += S.t(28, 184, 'Epidermis', { c: 'k' }) + S.t(28, 229, 'Dermis', { c: 'k' });
        s += S.daire(c + 28, 154, 45, { dolgu: 'crit-soft', renk: 'crit' });
        s += S.cizgi([[c - 12, 155], [c, 138], [c + 25, 130], [c + 48, 139], [c + 65, 155]], { renk: 'clin', dolgu: 'clin-soft', w: 3 });
        s += S.t(c, 35, ['Kabarıklık (ödem)', 'Kızarıklık (eritem)'], { a: 'middle', c: 'b' });
        s += S.ok([[c + 95, 66], [c + 48, 115]], { renk: 'crit' });
        s += S.cizgi([[c - 55, 89], [c - 18, 205]], { renk: 'ink', w: 3 }) + S.t(c - 72, 77, 'İğne', { c: 'k' });
        s += DEK75_AK(S, [[c - 18, 207], [c + 16, 267]], t) + S.t(c + 32, 242, 'Alerjen', { c: 'k' });
        s += S.daire(c + 20, 309, 34, { renk: 'warn', dolgu: 'warn-soft' });
        s += DEK75_Y(S, c + 20, 274) + S.t(c + 63, 284, 'IgE', { c: 'k' });
        for (let i = 0; i < 8; i++) {
          const angle = i * Math.PI / 4, r = 43 + 9 * (0.5 + 0.5 * Math.sin(t));
          s += S.daire(c + 20 + r * Math.cos(angle), 309 + r * Math.sin(angle), 3, { renk: 'warn', dolgu: 'warn' });
        }
        s += S.t(c, 378, 'Mast hücresi → granül salınımı', { a: 'middle', c: 'k' });
        return s + DEK75_BOX(S, 34, 401, S.w - 68, 37, 'Kan damarı: vazodilatasyon', 'crit') + S.t(c, 495, 'Yerel yanıt: dakikalar içinde', { a: 'middle' });
      } },
      { ad: 'İntradermal / yama', metin: 'İntradermal test ölçülü alerjenle IgE, IgG ya da T lenfosit aracılı tepki uyandırır. Yama testinde alerjen duyarlı T lenfositleriyle tepkimeye girer; lenfokinler alerjik kontakt dermatit oluşturur. [[K2 s. 321]]', ciz: (S, t) => {
        const c = S.w / 2;
        return S.t(c, 25, 'İntradermal', { a: 'middle', c: 'b' }) +
          DEK75_FLOW(S, [[['Ölçülü alerjen', 'Dermise enjeksiyon'], 'accent'], ['IgE · IgG · T lenfosit yanıtı', 'basic']], t, 44, 92) +
          S.t(c, 245, 'Yama (deri yüzeyinde)', { a: 'middle', c: 'b' }) +
          DEK75_FLOW(S, [[['Alerjenli yama', 'Duyarlı T lenfositi'], 'clin'], ['Lenfokin salınımı', 'basic'], ['Alerjik kontakt dermatit', 'crit']], t, 265, 88);
      } },
      { ad: 'Elektroforez', metin: 'Serum elektroforezi proteinleri albümin, α1, α2, β ve immünoglobulin (γ) bölgelerine ayırır. Total IgE radyoimmünosorban testle ölçülür; anestezide anafilaksi tanısında nadiren yararlıdır. [[K2 s. 321]]', ciz: S => {
        const X = u => 30 + (S.w - 60) * u, gauss = (u, c, w, a) => a * Math.exp(-Math.pow((u - c) / w, 2));
        const pts = Array.from({ length: 181 }, (_, i) => { const u = i / 180; return [X(u), 330 - gauss(u, .16, .11, 65) - gauss(u, .43, .045, 42) - gauss(u, .58, .04, 52) - gauss(u, .70, .035, 38) - gauss(u, .88, .04, 220)]; });
        let s = S.t(S.w / 2, 30, ['Serum proteinlerinin ayrılması', 'Tepe yüksekliği şematik'], { a: 'middle' }) + S.cizgi([[30, 330], [S.w - 25, 330]], { renk: 'muted' }) + S.cizgi(pts, { renk: 'accent', w: 3 });
        [[.16, 'γ'], [.43, 'β1'], [.58, 'α2'], [.70, 'α1'], [.88, 'Albümin']].forEach(([x, label]) => { s += S.t(X(x), label === 'Albümin' ? 91 : 355, label, { a: 'middle', c: 'b' }); });
        return s + S.t(X(.16), 385, 'IgG · IgA · IgM', { a: S.dar ? 'start' : 'middle', c: 'k' }) + DEK75_BOX(S, 20, 435, S.w - 40, 70, ['Total IgE ≠ özgül IgE', 'Anafilaksi tanısında nadiren yararlı'], 'warn');
      } },
      { ad: 'RAST', metin: 'Özgül IgE, RAST ile ölçülür. Katı–sıvı sistemde çözünmez alerjen önce hasta serumundaki özgül antikorla, ardından radyoişaretli anti-insan IgE ile inkübe edilir. Yıkama bağlanmamış maddeleri uzaklaştırır. [[K2 s. 321]]', ciz: (S, t) => {
        let s = DEK75_FLOW(S, [[['Polistiren disk', 'Yüzeye bağlı alerjen'], 'clin'], [['+ Hasta serumu', 'Özgül IgE bağlanır'], 'accent'], [['Yıkama', 'Bağlanmayan antikor uzaklaşır'], 'muted'], [['+ Radyoişaretli anti-IgE', 'Bağlı IgE’ye tutunur'], 'basic']], t, 16, 112);
        const c = S.w / 2;
        s += S.kutu(c - 80, 493, 160, 15, { dolgu: 'clin-soft', renk: 'clin' });
        s += S.daire(c, 486, 6, { dolgu: 'clin', renk: 'clin' }) + DEK75_Y(S, c, 468) + DEK75_Y(S, c, 439, 'basic', true);
        return s + S.t(c + 37, 454, '✦ işaret', { c: 'k' });
      } },
      { ad: 'ELISA / RIA', metin: 'İmmünodifüzyon çöken antijen–antikor kompleksini ölçer. İndirekt ELISA’da antijene hasta antikoru, sonra enzimli ikinci antikor bağlanır; substrat renkli ürün verir (peroksidaz / alkalen fosfataz). RIA’da işaretsiz örnek antijeni, radyoişaretli antijenle yarışır; miktar standart eğriden bulunur. [[K2 s. 321–322]]', ciz: (S, t) => {
        const c = S.w / 2;
        let s = S.t(c, 24, 'İndirekt ELISA', { a: 'middle', c: 'b' });
        s += DEK75_BOX(S, c - 155, 43, 310, 95, ['Plaka antijeni → hasta antikoru', '→ enzimli ikinci antikor', '→ substrat → renk'], 'accent');
        s += S.kutu(c - 130, 159, 62, 40, { dolgu: Math.sin(t) > 0 ? 'accent' : 'accent-soft', renk: 'accent' }) + S.t(c - 50, 183, 'Spektrofotometre', { c: 'k' });
        s += S.t(c, 237, 'RIA: bağlanma için yarış', { a: 'middle', c: 'b' });
        s += DEK75_BOX(S, c - 155, 253, 310, 60, ['Örnek antijeni + ✦ antijen', 'Katı matriksteki antikora bağlanır'], 'basic');
        s += S.t(c, 345, 'Bağlı işaretli antijen ↑', { a: 'middle', c: 'k' });
        s += S.ok([[c - 115, 477], [c - 115, 362]], { renk: 'muted' }) + S.ok([[c - 115, 477], [c + 130, 477]], { renk: 'muted' });
        const pts = Array.from({ length: 61 }, (_, i) => [c - 105 + i * 3.7, 467 - 94 * Math.exp(-i / 19)]);
        return s + S.cizgi(pts, { renk: 'basic', w: 3 }) + S.t(c, 510, 'İşaretsiz örnek antijeni →', { a: 'middle', c: 'k' });
      } },
      { ad: 'Kompleman', metin: 'Radyal immünodifüzyonda özgül antiserum agardadır, hasta serumu kuyucuklara konur. Kompleman akut inflamasyonda artabilir; eksiklik ve tüketimde, karaciğer/böbrek hastalığında azalabilir. Alerjide C3 ya da C4 düşer; C3a, C4a, C5a artar. Doku immün kompleksleri immünohistokimya ve radyoişaretli C1q ile değerlendirilir; serumda rutin bakılmaz. [[K2 s. 322]]', ciz: S => {
        const c = S.w / 2;
        let s = S.t(c, 26, ['Agar + özgül antiserum', 'Kuyucuklarda hasta serumu'], { a: 'middle', c: 'b' }) + S.kutu(c - 152, 78, 304, 142, { dolgu: 'clin-soft', renk: 'clin' });
        [18, 29, 43].forEach((r, i) => { const x = c - 95 + i * 95; s += S.daire(x, 149, r, { renk: 'basic', dolgu: 'clin-soft' }) + S.daire(x, 149, 5, { dolgu: 'basic', renk: 'basic' }); });
        return s + S.t(c, 252, 'Çökelme halkası büyük → düzey yüksek', { a: 'middle', c: 'k' }) +
          S.t(c, 294, ['↑ Akut inflamasyon', '↓ Genetik eksiklik · tüketim', '↓ Karaciğer / böbrek hastalığı'], { a: 'middle', lh: 25 }) +
          DEK75_BOX(S, c - 155, 380, 310, 65, ['Alerjide C3 / C4 ↓', 'C3a · C4a · C5a ↑'], 'warn') +
          S.t(c, 488, ['İmmün kompleks: doku boyaması', 've radyoişaretli C1q'], { a: 'middle', c: 'k' });
      } },
      { ad: 'Lenfositler', metin: 'T ve B lenfositleri monoklonal antikorlarla tanınır. T alt gruplarının sayı ve yüzdesi, ör. edinsel immün yetmezlikte izlem sağlar. İşlev, mitojenle uyarılan çoğalmanın tritiyumlu timidin alımıyla (DNA sentezi) ölçülmesiyle değerlendirilir. [[K2 s. 322–323]]', ciz: (S, t) => {
        const c = S.w / 2;
        let s = DEK75_BOX(S, c - 155, 15, 310, 130, ['T lenfosit: monoklonal antikor', 'Yardımcı / sitotoksik: sayı ve %', 'Mitojen: fitohemaglutinin', 've konkanavalin A'], 'basic');
        s += DEK75_BOX(S, c - 155, 165, 310, 130, ['B: floresan / enzimli antikor', 'Plazma hücresi: PCA1 · PC1', 'Mitojen: stafilokokal protein A', 've pokeweed'], 'ok');
        s += DEK75_AK(S, [[c, 298], [c, 339]], t, 'basic');
        for (let i = 0; i < 4; i++) s += S.daire(c - 69 + i * 46, 365, 17, { renk: 'basic', dolgu: 'basic-soft' });
        return s + S.t(c, 414, ['Mitojen → hücre çoğalması', 'Tritiyumlu timidin alımı', '= DNA sentezi'], { a: 'middle', lh: 25 });
      } },
      { ad: 'Mediyatörler', metin: 'Bazofillerle in vitro histamin salınımı araştırma laboratuvarlarıyla sınırlıdır; anafilaksiyi tetiklemez ama immün olmayan salınımı dışlayamaz. Histamin geçici yükselir. Mast hücresi granüllerindeki nötr proteaz triptaz 1–5 saat yüksek kalır ve mast hücresi aktivasyonunu gösterir. [[K2 s. 323]]', ciz: S => {
        const X = x => 45 + x * (S.w - 70) / 6, Y = y => 323 - 180 * y;
        let s = S.t(S.w / 2, 26, 'Göreli düzey (şematik)', { a: 'middle', c: 'b' }) + S.kutu(X(1), 78, X(5) - X(1), 245, { dolgu: 'accent-soft', renk: 'line' });
        s += S.t((X(1) + X(5)) / 2, 107, 'Triptaz: 1–5 sa', { a: 'middle', renk: 'accent' });
        const a = [], b = [];
        for (let i = 0; i <= 120; i++) { const x = i / 20; a.push([X(x), Y(Math.exp(-Math.pow((x - .24) / .19, 2)))]); b.push([X(x), Y(x < 1 ? .75 * x : x <= 5 ? .75 : .75 * Math.exp(-3 * (x - 5)))]); }
        s += S.cizgi(a, { renk: 'warn', w: 3 }) + S.cizgi(b, { renk: 'accent', w: 3 });
        s += S.cizgi([[45, 78], [45, 323], [S.w - 25, 323]], { renk: 'muted' });
        for (let i = 0; i <= 6; i++) s += S.t(X(i), 349, String(i), { a: 'middle', c: 'k' });
        return s + S.t(S.w / 2, 380, 'Reaksiyondan sonra saat', { a: 'middle', c: 'k' }) + S.t(S.w / 2, 414, 'Histamin: erken, kısa yükseliş', { a: 'middle', c: 'k', renk: 'warn' }) + DEK75_BOX(S, 20, 451, S.w - 40, 76, ['Bazofilden histamin salınımı', 'In vitro test: yalnız araştırma'], 'warn');
      } }
    ]
  });

  const DEK75_SMOOTH = u => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
  const DEK75_DIP = (x, start) => x <= start ? 0 : x <= 4 ? DEK75_SMOOTH((x - start) / (4 - start)) : Math.exp(-(x - 4) / 2.5);
  const DEK75_CURVES = [
    { renk: 'basic', f: (x, p) => 100 - (15 + 45 * p.s) * DEK75_DIP(x, 1.5) },
    { renk: 'crit', f: (x, p) => x <= 2 ? 100 + 30 * (.5 + p.s) * Math.pow(Math.sin(Math.PI * x / 2), 2) : 100 - .8 * (15 + 45 * p.s) * DEK75_DIP(x, 2) },
    { renk: 'warn', kesik: true, f: (x, p) => 100 - .6 * (15 + 45 * p.s) * p.s * Math.exp(-Math.pow((x - 3) / 2, 2)) },
    { renk: 'muted', f: x => x <= 2 ? 75 : 100 - 25 * Math.exp(-(x - 2) / 2.5) }
  ];
  DEK75_VIZ.fek75_anes = el => SEKIL.grafik(el, {
    baslik: 'Cerrahi stres arttıkça geçici bağışıklık baskılanması', vb: [640, 450], vbDar: [380, 490],
    x: { min: 0, max: 10, ad: 'Zaman (şematik)', adimlar: [0, 2, 10] },
    y: { min: 0, max: 150, ad: 'Başlangıca göre etkinlik (%)', adimlar: [0, 50, 100, 150] },
    param: [{ id: 's', ad: 'Cerrahi stres (0 hafif · 1 majör)', min: 0, max: 1, adim: .05, deger: .5 }],
    egriler: DEK75_CURVES, yatay: () => [{ y: 100, ad: 'başlangıç' }],
    bolgeler: () => [{ x1: 0, x2: 2, renk: 'clin-soft' }, { x1: 2, x2: 10, renk: 'paper' }],
    noktalar: p => [{ x: 1, y: DEK75_CURVES[1].f(1, p), renk: 'crit' }, { x: 4, y: DEK75_CURVES[1].f(4, p), renk: 'crit' }, { x: 4, y: DEK75_CURVES[0].f(4, p), renk: 'basic' }],
    ek: (S, p, X, Y) => {
      let s = S.t(X(2.3), Y(140), ['0–2: anestezi / cerrahi', '2–10: ameliyat sonrası'], { c: 'k' });
      ['T sayı / işlevi', 'NK etkinliği', 'Fagositoz', 'Siliyer / engeller'].forEach((ad, i) => {
        const y = Y(37 - i * 9);
        s += S.cizgi([[X(2.4), y - 4], [X(3.2), y - 4]], { renk: DEK75_CURVES[i].renk, kesik: i === 2, w: 3 }) + S.t(X(3.5), y, ad, { c: 'k' });
      });
      return s;
    },
    okuma: p => DEK75_REF(`<b>${p.s >= .7 ? 'Majör' : p.s <= .3 ? 'Hafif' : 'Orta'} cerrahi stres.</b> Siliyer etkinlik ve fizikokimyasal engeller azalır. Fagositoz baskısı stresle artar. Kortizol artışı T lenfosit sayısını ve işlevini azaltır. NK önce damar dışı alan, lenf düğümü ve dalaktan devşirmeyle artar; sonra baskılayıcı monositlerle düşer. Etkiler geri dönüşlüdür. [[K2 s. 323]]`)
  });

  const DEK75_DRUGS = [
    ['Propanidid', 540, 1700, 'warn', 'İndüksiyon ajanları: propanidid (1/540–1/1700) ve althesin (1/900–1/1100), tiyopentalden (1/14 000) çok daha sık reaksiyon yapmıştır.'],
    ['Althesin', 900, 1100, 'warn', 'İndüksiyon ajanı; 1/900–1/1100. Propanididle birlikte tarihsel karşılaştırmadır.'],
    ['Jelatin ürünleri', 1000, 1000, 'clin', '1/1000. Haemaccel kompleman ya da IgE olmadan mast hücrelerinden doğrudan histamin salınımına yol açar.'],
    ['Kas gevşeticiler', 1200, 1200, 'crit', 'Yaşamı tehdit eden reaksiyonların en sık nedeni; 1/1200 maruziyete dek. Çoğu IgE aracılıdır; en sık ajan süksinilkolindir. Alkuronyum ve atrakuryum, pankuronyum ve vekuronyumdan sık reaksiyon verir.'],
    ['Penisilin', 2500, 10000, 'accent', 'En sık intraoperatif antibiyotik nedeni; etkilenenlerde ölüm ≈%10. β-laktam halkası açılır; penisiloil grubu plazma proteinine bağlanır ve IgE yapılır.'],
    ['Tüm anesteziler', 5000, 25000, 'ink', 'Anafilaksi 1/5000–1/25 000 anestezide; ölüm %3,4. İlaç–konak proteini kompleksi bağışıklık yanıtını başlatır.'],
    ['Plazma proteinleri', 10000, 10000, 'clin', 'Plazma protein ürünlerinde reaksiyon sıklığı 1/10 000.'],
    ['Tiyopental', 14000, 14000, 'basic', 'Bildirilen reaksiyon sıklığı 1/14 000; propanidid ve althesinden daha seyrek.'],
    ['Lokal anestezikler', null, null, 'muted', 'Gerçek alerji nadirdir ve IgE aracılıdır; koruyucu metilparabene IgE aracılı alerji de bildirilmiştir.'],
    ['Protamin', null, null, 'muted', 'IgE, IgG ya da kompleman aracılı reaksiyon: anafilaksi ya da akut pulmoner hipertansiyon ve sağ ventrikül yetmezliği. Sıklık verilmemiştir.']
  ];
  DEK75_VIZ.fek75_alerji = el => {
    const list = [3, 0, 1, 2, 4, 5, 6, 7, 8, 9].map(i => ({ d: String(i), ad: DEK75_DRUGS[i][0] }));
    const stop = SEKIL.sahne(el, {
      baslik: 'İlaç reaksiyonlarının bildirilen sıklıkları; satır veya düğme seçin', vb: [640, 605], vbDar: [360, 910],
      secenek: { id: 'ilac', ad: 'İlaç veya reaksiyon seçin', liste: list },
      ciz: (S, t, p) => {
        const lo = S.dar ? 25 : 210, hi = S.w - 25;
        const X = n => lo + Math.log(n / 500) / Math.log(50) * (hi - lo);
        let s = S.t(S.w / 2, 24, 'Sık ← 1 / N vaka → Seyrek', { a: 'middle', c: 'b' });
        [500, 1000, 5000, 10000, 25000].forEach((n, i) => {
          s += S.cizgi([[X(n), 42], [X(n), S.dar ? 705 : 420]], { renk: 'line', w: 1 });
          s += S.t(X(n), 52 + (i % 2) * 19, String(n).replace('10000', '10 bin').replace('25000', '25 bin'), { a: 'middle', c: 'k' });
        });
        DEK75_DRUGS.slice(0, 8).forEach((d, i) => {
          const y = (S.dar ? 117 : 112) + i * (S.dar ? 81 : 41), sel = +p.ilac === i;
          const value = i === 3 ? '1/1200’e dek' : d[1] === d[2] ? `1/${d[1]}` : `1/${d[1]}–1/${d[2]}`;
          // Gerçek HTML düğmeleri klavyeyle seçim sağlar; geniş SVG satırı dokunma hedefidir.
          s += `<g data-i="${i}" style="cursor:pointer"><title>${d[0]}: ${value}</title>`;
          s += S.kutu(8, y - (S.dar ? 32 : 22), S.w - 16, S.dar ? 70 : 38, { dolgu: sel ? 'accent-soft' : 'paper', renk: sel ? 'accent' : 'line', w: sel ? 2 : 1 });
          s += S.t(S.dar ? 19 : 18, S.dar ? y - 10 : y - 4, d[0], { c: 'b k' });
          s += S.t(S.dar ? S.w - 18 : 18, S.dar ? y + 12 : y + 12, value, { a: S.dar ? 'end' : 'start', c: 'k' });
          const yy = S.dar ? y + 25 : y;
          [500, 1000, 5000, 10000, 25000].forEach(n => { s += S.cizgi([[X(n), yy - 6], [X(n), yy + 6]], { renk: 'line', w: 1 }); });
          s += S.cizgi([[X(d[1]), yy], [X(d[2]), yy]], { renk: d[3], w: sel ? 7 : 4 });
          s += S.daire(X(d[1]), yy, 4, { renk: d[3], dolgu: d[3] });
          if (d[1] !== d[2]) s += S.daire(X(d[2]), yy, 4, { renk: d[3], dolgu: d[3] });
          if (i === 3) s += S.t(X(1200) + 10, yy - 5, 'üst sıklık', { c: 'k', renk: 'crit' });
          s += '</g>';
        });
        const y = S.dar ? 761 : 456;
        s += '<g data-i="8" style="cursor:pointer">' + DEK75_BOX(S, 12, y, S.w - 24, 48, ['Lokal anestezik: gerçek alerji nadir'], 'muted') + '</g>';
        return s + '<g data-i="9" style="cursor:pointer">' + DEK75_BOX(S, 12, y + 61, S.w - 24, 70, ['Protamin: IgE / IgG / kompleman', 'Anafilaksi veya pulmoner HT', '+ sağ ventrikül yetmezliği'], 'muted') + '</g>';
      },
      metin: p => { const i = +p.ilac, d = DEK75_DRUGS[i]; return DEK75_REF(`<b>${d[0]}.</b> ${d[4]} [[K2 s. ${i === 4 ? '323–324' : '323'}]]`); }
    });
    const pick = e => { const row = e.target.closest('g[data-i]'); if (row) el.querySelector(`button[data-s="${row.dataset.i}"]`).click(); };
    el.addEventListener('click', pick);
    return () => { el.removeEventListener('click', pick); stop(); };
  };
})();
