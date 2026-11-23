/* Bölüm 80 · Hipotalamus ve hipofiz — şematik, nitel modeller. */
(function () {
  'use strict';
  const D80_VIZ = window.VIZ;
  const D80_REF = window.VIZ_YARDIM.REF || ((s) => s);
  const D80_RM = window.VIZ_YARDIM.RM;
  const D80_sec = (id, ad, liste) => ({ id, ad, liste: liste.map((ad, i) => ({ d: String(i), ad })) });
  const D80_box = (S, x, y, w, h, yazi, renk = 'basic') => S.kutu(x, y, w, h, { yazi, renk, dolgu: renk + '-soft', yc: 'k', lh: 18 });
  const D80_txt = (S, x, y, s, renk = 'ink') => S.t(x, y, s, { a: 'middle', renk, c: 'k', lh: 18 });
  const D80_flow = (S, pts, t, renk = 'basic', n = 4) => S.ok(pts, { renk }) + S.akis(pts, t, { renk, n });
  const D80_minus = (S, pts) => S.ok(pts, { renk: 'crit', kesik: true }) + D80_txt(S, pts.at(-1)[0] - 9, pts.at(-1)[1] - 6, '−', 'crit');
  function D80_scene(el, cfg) {
    const metin = cfg.metin;
    return SEKIL.sahne(el, { ...cfg, metin: (p, t) => D80_REF(metin(p, t)) });
  }
  function D80_steps(el, cfg) {
    const stop = SEKIL.adim(el, { ...cfg, adimlar: cfg.adimlar.map(a => ({ ...a, metin: D80_REF(a.metin) })) });
    if (D80_RM) el.querySelector('[data-i="' + (cfg.adimlar.length - 1) + '"]').click();
    return stop;
  }

  const D80_types = [
    { ad: 'Peptit', depo: 'Granülde depolanır', reseptor: 'Zar', src: ['Granüller', 'Ekzositozla salınım'], ex: ['Kısa: TRH, ADH, ACTH, insülin', 'Uzun: GH, PRL', 'Glikopeptit: LH, FSH, TSH'], metin: '<b>Peptit hormonlar.</b> Granülde depolanır, ekzositozla salınır, hücre yüzeyi reseptörüne bağlanır. Başka bir sınıf seçin. [[K1 s. 391]]' },
    { ad: 'Steroit', depo: 'Depolanmaz', reseptor: 'Sitozol → çekirdek', src: ['Kolesterol → sentez', 'Hemen salınım'], ex: ['Aldosteron, testosteron,', 'östrojen, kortizol'], metin: '<b>Steroitler.</b> Kolesterolden gerektiğinde sentezlenir; yağda çözünür, zardan geçer. Sitozolik reseptörle oluşan kompleks çekirdekte gen transkripsiyonunu etkiler. [[K1 s. 391]]' },
    { ad: 'Eikozanoit', depo: 'Depolanmaz', reseptor: 'Karmaşık', src: ['Zar fosfolipitleri → sentez', 'Hemen salınım'], ex: ['Prostaglandinler, tromboksanlar,', 'lökotrienler'], metin: '<b>Eikozanoitler.</b> Zar fosfolipitlerinden gerektiğinde sentezlenir ve hemen salınır; işlevleri geniş, mekanizmaları karmaşıktır. [[K1 s. 391]]' },
    { ad: 'Katekolamin / serotonin', depo: 'Granülde depolanır', reseptor: 'Zar', src: ['Granüller', 'Salınım'], ex: ['Fenilalanin / tirozin → katekolamin', 'Triptofan → serotonin'], metin: '<b>Katekolamin ve serotonin.</b> Tek amino asitten türer, granülde depolanır, hücre zarı reseptörüyle etki eder. [[K1 s. 391]]' },
    { ad: 'Tiroksin', depo: 'Tiroglobulinde tutulur', reseptor: 'Çekirdek', src: ['Tiroglobulin', 'içinde tutulur'], ex: ['Tirozin → tiroksin', 'Bölüm 81'], metin: '<b>Tiroksin.</b> Tirozinden türer, tiroglobulin içinde tutulur ve çekirdek reseptörüne bağlanır. Depo, hücre içi granül olarak çizilmemiştir. [[K1 s. 391]]' }
  ];
  D80_VIZ.f80_tur = el => D80_scene(el, {
    baslik: 'Hormonun depolanması ve hedefte reseptör yeri', vb: [640, 370], vbDar: [360, 550], hareket: true, sure: 4,
    secenek: D80_sec('s', 'Hormon sınıfı', D80_types.map(a => a.ad)),
    metin: p => D80_types[+p.s].metin,
    ciz: (S, t, p) => {
      const i = +p.s, a = D80_types[i], c = S.w / 2, narrow = S.dar;
      const sx = narrow ? 55 : 16, sy = narrow ? 35 : 60, sw = narrow ? 250 : 238;
      const cx = narrow ? c : 510, cy = narrow ? 300 : 143, rr = 82;
      let s = D80_txt(S, sx + sw / 2, sy - 12, i === 4 ? 'Salgı kaynağı ve depo' : 'Salgılayan hücre');
      s += D80_box(S, sx, sy, sw, 86, a.src);
      if (i === 0 || i === 3) for (let k = 0; k < 5; k++) s += S.daire(sx + 55 + k * 25, sy + 72, 4, { dolgu: 'basic', renk: 'basic' });
      if (i === 4) s += S.kutu(sx + 12, sy + 12, sw - 24, 60, { renk: 'basic', dolgu: 'none', kesik: true });
      const path = narrow ? [[c, 126], [c, 202]] : [[260, 143], [420, 143]];
      s += S.cizgi(path, { renk: 'basic-soft', w: 23 }) + D80_flow(S, path, t);
      s += D80_txt(S, narrow ? c + 61 : 335, narrow ? 168 : 113, 'Kan');
      s += S.daire(cx, cy, rr, { renk: 'accent', dolgu: 'accent-soft' }) + D80_txt(S, cx, cy - 98, 'Hedef hücre');
      s += S.daire(cx + 18, cy + 25, 34, { renk: 'clin', dolgu: 'clin-soft' }) + D80_txt(S, cx + 18, cy + 30, 'Çekirdek');
      if (i === 0 || i === 3) {
        const rx = narrow ? cx : cx - rr, ry = narrow ? cy - rr : cy;
        s += S.cizgi([[rx - 10, ry - 8], [rx - 10, ry + 8], [rx + 10, ry + 8], [rx + 10, ry - 8]], { renk: 'accent', w: 3 });
        s += S.daire(rx, ry, 4, { dolgu: 'basic' }) + D80_txt(S, cx, cy - 48, 'Zar reseptörü');
      } else if (i === 1 || i === 4) {
        const route = [[cx - 80, cy - 12], [cx - 25, cy - 12], [cx + 18, cy + 1]];
        s += D80_flow(S, route, t, 'accent', 2) + D80_txt(S, cx, cy - 48, i === 1 ? 'Sitozolik reseptör' : 'Nükleer reseptör');
        s += S.daire(cx + 18, cy + 1, 5, { dolgu: 'accent' });
        if (i === 1) s += D80_txt(S, cx, cy + 67, 'Gen transkripsiyonu');
      } else s += D80_txt(S, cx, cy - 38, ['?', 'Mekanizma karmaşık']);
      const y = narrow ? 414 : 262;
      s += D80_txt(S, c, y, [a.depo, 'Reseptör: ' + a.reseptor]);
      s += D80_txt(S, c, y + 52, a.ex, 'muted');
      return s;
    }
  });

  const D80_functions = [
    ['Otonom', ['Limbik sistem → hipotalamus', 'Medulla oblongata → sempatik yanıt'], 'Limbik sistemden gelen girdiyi medulla oblongataya aktarır; korku gibi duygusal stres sempatik yanıt başlatır.'],
    ['Isı', ['Periferik + santral termoreseptörler', 'Isı kaybı ⇄ ısı kazanma'], 'Termoreseptör sinyallerini birleştirip ısı kaybı ve ısı kazanma merkezlerini dengeler (Bölüm 89).'],
    ['Açlık', ['Beslenme ⇄ tokluk merkezi', 'Glukoz, kolesistokinin,', 'glukagon, leptin (yağ dokusu)'], 'Beslenme ve tokluk merkezlerini glukoz, kolesistokinin, glukagon ve leptin etkiler.'],
    ['Vücut suyu', ['Susama → su alımı', 'Ozmoreseptör → ADH → böbrek'], 'Susama merkezi alımı, ozmoreseptörler ADH ile böbrekten atılımı denetler (Bölüm 69).'],
    ['Uyku–uyanıklık', ['Anterior → uyku', 'Posterior → uyanıklık', 'Sirkadiyen ritim'], 'Anterior hipotalamus uyku, posterior hipotalamus uyanıklık yapar; sirkadiyen ritimler buradan kaynaklanıyor olabilir.'],
    ['Davranış', ['Ceza merkezi ⇄ ödül merkezi'], 'Ceza ve ödül merkezleri davranışı düzenler.'],
    ['Cinsel işlev', ['Pulsatil GnRH → gonadotropinler', 'Ani LH yükselişi → ovülasyon'], 'Gonadotropinlerin pulsatil salınımı ve ovülasyonu başlatan ani yükselişi.'],
    ['Hipofiz', ['Portal ven → anterior lob', 'Sinir bağlantısı → posterior lob'], 'Anterior lob portal vene salınan hormonlarla, posterior lob doğrudan sinirlerle denetlenir.']
  ];
  D80_VIZ.f80_islev = el => D80_scene(el, {
    baslik: 'Hipotalamusun sekiz işlevi', vb: [640, 480], vbDar: [360, 520],
    secenek: D80_sec('i', 'İşleve dokunun', D80_functions.map(a => a[0])),
    metin: p => '<b>' + D80_functions[+p.i][0] + '.</b> ' + D80_functions[+p.i][2] + ' [[K1 s. 391–392]]',
    ciz: (S, t, p) => {
      const c = S.w / 2, i = +p.i, row = S.dar ? 190 : 178;
      let s = D80_box(S, c - 66, 10, 132, 30, 'Talamus');
      s += D80_box(S, c - 88, 54, 176, 42, 'Hipotalamus');
      s += S.cizgi([[c, 96], [c, 120]], { renk: 'clin', w: 6 }) + D80_box(S, c - 54, 120, 108, 30, 'Hipofiz', 'clin');
      const width = S.dar ? 156 : 260, gap = 14, start = c - width - gap / 2;
      D80_functions.forEach((a, k) => {
        const x = start + (k % 2) * (width + gap), y = row + Math.floor(k / 2) * 48;
        if (k === i) s += S.ok([[c, 154], [c, 168], [x + width / 2, 168], [x + width / 2, y]], { renk: 'basic' });
        s += D80_box(S, x, y, width, 36, a[0], k === i ? 'basic' : 'accent');
      });
      const y = row + 214;
      s += D80_txt(S, c, y, D80_functions[i][1]);
      if (i === 6) {
        s += S.cizgi([[c - 120, y + 67], [c - 110, y + 49], [c - 100, y + 67], [c - 80, y + 67], [c - 70, y + 49], [c - 60, y + 67]], { renk: 'basic' });
        s += S.cizgi([[c + 15, y + 67], [c + 60, y + 67], [c + 78, y + 40], [c + 95, y + 67], [c + 120, y + 67]], { renk: 'accent' });
      }
      return s;
    }
  });

  const D80_anatomyText = [
    ['Konum', 'Hipofiz sella tursikada; üstünü dura katlantısı diafragma sella örter, sap ortadaki boşluktan geçer. [[K1 s. 392]]'],
    ['Komşular', 'Üstte sap, optik kiazma ve üçüncü ventrikül; iki yanda III, IV, VI, V1, V2 ve ICA ile kavernöz sinüsler bulunur. [[K1 s. 392]]'],
    ['İki köken', 'Anterior lob ve pars intermedia oral ektodermdeki Rathke kesesinden, posterior lob hipotalamusun nöral uzantısından gelişir; sap bağlantısı korunur. [[K1 s. 392]]'],
    ['Uzun portal ven', 'Superior hipofizyal arter (ICA dalı) ilk kapiller ağı besler. Uzun portal venler bu ağı anterior lob kapiller ağına bağlar, hipotalamik hormonları taşır ve lobun kanının çoğunu sağlar. [[K1 s. 392]]'],
    ['Kısa portal ven', 'İnferior hipofizyal arter (ICA dalı) posterior lobu besler. Kısa portal venler bir miktar kanı posterior lobdan anterior loba taşır. [[K1 s. 392–393]]'],
    ['Venöz dönüş', 'İki lobun venöz kanı kavernöz sinüslere boşalır. Tüm damar yolları birlikte gösteriliyor. [[K1 s. 393]]']
  ];
  function D80_anatomy(S, i, t) {
    const c = S.w / 2, a = c - 72, b = c + 60;
    let s = D80_box(S, c - 82, 24, 164, 42, 'Hipotalamus');
    s += S.cizgi([[b, 66], [b, 211]], { renk: 'clin', w: 13 });
    s += D80_txt(S, c - 38, 104, 'Hipofiz sapı');
    s += S.cizgi([[c - 140, 163], [b - 14, 163]], { renk: 'line', w: 5 }) + S.cizgi([[b + 14, 163], [c + 142, 163]], { renk: 'line', w: 5 });
    s += D80_txt(S, c - 36, 151, 'Diafragma sella');
    s += D80_box(S, c - 132, 211, 142, 78, ['Anterior', 'lob'], 'accent');
    s += D80_box(S, c + 26, 211, 102, 78, ['Posterior', 'lob'], 'clin');
    s += S.kutu(c + 15, 218, 6, 63, { dolgu: 'warn', renk: 'warn' });
    s += S.cizgi([[c - 143, 220], [c - 143, 307], [c + 140, 307], [c + 140, 220]], { renk: 'line', w: 7 });
    s += D80_txt(S, c, 333, 'Sella tursika (sfenoit)');
    s += D80_txt(S, c, 360, 'İnce şerit: pars intermedia', 'muted');
    if (i === 1) {
      // Komşuluklar ayrı koronal ek şemada; sagital ve koronal düzlem karıştırılmaz.
      s += D80_box(S, c - 88, 386, 176, 30, 'Üçüncü ventrikül');
      s += S.cizgi([[c - 30, 429], [c + 30, 449]], { renk: 'clin', w: 4 }) + S.cizgi([[c + 30, 429], [c - 30, 449]], { renk: 'clin', w: 4 });
      s += D80_txt(S, c, 472, 'Optik kiazma');
      s += D80_box(S, c - 45, 492, 90, 40, 'Hipofiz', 'accent');
      s += D80_box(S, c - 166, 486, 113, 62, ['III, IV, VI', 'V1, V2, ICA']);
      s += D80_box(S, c + 53, 486, 113, 62, ['III, IV, VI', 'V1, V2, ICA']);
      s += D80_txt(S, c, 575, ['İki yanda kavernöz sinüs', 'Koronal ek şema']);
    } else if (i === 2) {
      s += D80_flow(S, [[a, 420], [a, 293]], t, 'accent', 3);
      s += D80_txt(S, c, 450, ['Farenks tavanı → Rathke kesesi', '(oral ektoderm)', 'Anterior lob + pars intermedia']);
      s += D80_flow(S, [[b, 72], [b, 202]], t, 'clin', 3);
      s += D80_txt(S, c, 533, ['Nöral ektoderm → posterior lob', 'Hipotalamusla bağlantı sürer']);
    } else if (i >= 3) {
      s += D80_flow(S, [[c - 153, 76], [c - 153, 125], [c - 72, 125]], t, 'crit', 3);
      s += S.cizgi([[c - 74, 117], [c - 30, 117], [c - 74, 130], [c - 30, 130]], { renk: 'basic', w: 3 });
      s += D80_flow(S, [[c - 50, 68], [c - 50, 112]], t, 'basic', 2);
      s += D80_flow(S, [[a, 135], [a, 203], [a, 223]], t, 'basic', 5);
      s += S.cizgi([[a - 38, 278], [a + 50, 278], [a - 38, 270]], { renk: 'basic', w: 3 });
      s += D80_txt(S, c, 405, ['ICA → superior hipofizyal arter', 'İlk kapiller ağ → uzun portal ven', '→ anterior lob kapiller ağı']);
      if (i >= 4) {
        s += D80_flow(S, [[c + 152, 183], [c + 152, 274], [c + 114, 274]], t, 'crit', 3);
        s += D80_flow(S, [[c + 44, 286], [c + 44, 297], [c - 20, 297], [c - 20, 285]], t, 'basic', 3);
        s += D80_txt(S, c, 477, ['ICA → inferior hipofizyal arter', 'Posterior lob → kısa portal ven', '→ anterior lob']);
      }
      if (i === 5) {
        s += D80_flow(S, [[c - 132, 247], [c - 165, 247], [c - 165, 315]], t, 'basic', 2);
        s += D80_flow(S, [[c + 128, 247], [c + 168, 247], [c + 168, 315]], t, 'basic', 2);
        s += D80_txt(S, c, 558, ['Her iki lobdan venöz dönüş', '→ kavernöz sinüsler']);
      }
    }
    return s;
  }
  D80_VIZ.f80_kan = el => D80_steps(el, { baslik: 'Hipofiz anatomisi ve kanlanma yolları', vb: [640, 610], vbDar: [360, 610], hareket: true,
    adimlar: D80_anatomyText.map((a, i) => ({ ad: a[0], metin: a[1], ciz: (S, t) => D80_anatomy(S, i, t) })) });

  const D80_axes = [ ['CRH', 'ACTH', ['Adrenal korteks', 'Zona fasikülata'], 'Kortizol'], ['TRH', 'TSH', ['Tiroit'], 'T3 / T4'], ['GnRH', 'FSH / LH', ['Gonad'], 'Östrojen / testosteron'] ];
  D80_VIZ.f80_geri = el => D80_scene(el, {
    baslik: 'Kısa ve uzun negatif geri bildirim', vb: [640, 540], vbDar: [360, 540], hareket: true, sure: 6,
    secenek: D80_sec('e', 'Endokrin eksen', ['HPA', 'HPT', 'HPG']),
    param: [{ id: 'p', ad: 'Periferik hormon düzeyi (göreli model)', min: 0.2, max: 2, adim: 0.1, deger: 1, birim: '× referans' }],
    metin: p => p.p > 1.05 ? '<b>Periferik hormon fazla.</b> Uzun halka hem hipotalamik hem anterior lob hormonunu düşürür. Kısa halka anterior lobdan hipotalamusa fren sağlar. [[K1 s. 393]]' : p.p < 0.95 ? '<b>Periferik hormon az.</b> Uzun halkanın freni azalır; hipotalamik ve anterior lob hormonu yükselir. Kısa halka bu hipotalamik yanıtı sınırlar. [[K1 s. 393]]' : '<b>Denge.</b> Hipotalamik hormon anterior lobu, anterior lob hormonu periferik bezi uyarır; periferik hormon iki üst basamağı baskılar. Periferik hormon düzeyini değiştirin. [[K1 s. 393–394]]',
    ciz: (S, t, p) => {
      const c = S.w / 2, a = D80_axes[+p.e], levels = [2 / (1 + p.p), 2 / (1 + p.p), p.p];
      const labels = [['Hipotalamus', a[0]], ['Anterior lob', a[1]], a[2], ['Hedef doku']];
      let s = '';
      labels.forEach((text, i) => {
        const y = 32 + i * 115;
        s += D80_box(S, c - 98, y, 196, 55, text, ['basic', 'accent', 'ok', 'clin'][i]);
        if (i < 3) {
          s += D80_flow(S, [[c, y + 58], [c, y + 67], [c + (i === 2 ? 100 : 0), y + 67], [c + (i === 2 ? 100 : 0), y + 103], [c, y + 103], [c, y + 108]], t, 'ok', Math.max(1, Math.round(levels[i] * 3)));
          s += S.kutu(c + 109, y + 7, 10, 42, { dolgu: 'paper' });
          s += S.kutu(c + 109, y + 49 - levels[i] * 20, 10, levels[i] * 20, { dolgu: 'ok', renk: 'ok', r: 2 });
          if (i === 2) s += D80_txt(S, c, y + 84, a[3]);
        }
      });
      s += D80_minus(S, [[c + 25, 220], [c + 145, 220], [c + 145, 59], [c + 99, 59]]);
      s += D80_minus(S, [[c - 30, 335], [c - 145, 335], [c - 145, 60], [c - 100, 60]]);
      s += D80_minus(S, [[c - 145, 175], [c - 100, 175]]);
      s += S.t(c + 164, 146, 'Kısa halka', { a: 'middle', r: -90, renk: 'crit' });
      s += S.t(c - 158, 206, 'Uzun halka', { a: 'middle', r: -90, renk: 'crit' });
      s += D80_txt(S, c, 461, ['Kısa: anterior hormon → hipotalamus (−)', 'Uzun: periferik hormon → iki üst düzey (−)', 'Çubuklar: nitel hormon düzeyi'], 'muted');
      return s;
    }
  });

  const D80_hormones = [
    { ad: 'TSH', tip: 'Glikoprotein', up: ['TRH (+)'], down: ['T3 (−)', 'Somatostatin (orta baskı)'], hedef: ['Tiroit → T3 (aktif), T4 (öncül)', 'Sentez ve salınım ↑'], extra: ['Uyarıcı: TSH, FSH, LH, ACTH'], metin: 'Glikoprotein; tiroitte aktif T3 ve öncülü T4 sentezini ve salınımını artırır. TRH uyarır; T3 ve orta derecede somatostatin baskılar.', page: '393' },
    { ad: 'LH', tip: 'Glikoprotein', up: ['Pulsatil GnRH (+)'], down: ['Testosteron / östrojen (−)'], hedef: ['Kadın: LH artışı → ovülasyon', 'Ardından korpus luteum gelişimi', 'Erkek: Leydig hücresi → testosteron'], extra: ['FSH ile birlikte: gonadotropin'], metin: 'Kadında ani yükselişi ovülasyonu başlatır, ardından korpus luteumu geliştirir. Erkekte Leydig hücrelerinden testosteron salgılatır. Pulsatil GnRH uyarır, testosteron ya da östrojen baskılar.', page: '393' },
    { ad: 'FSH', tip: 'Glikoprotein', up: ['Pulsatil GnRH (+)'], down: ['Testosteron / östrojen (−)'], hedef: ['Kadın: folikül gelişimi', 've östrojen sentezi', 'Erkek: sperm olgunlaşması'], extra: ['LH ile birlikte: gonadotropin'], metin: 'Kadında östrojen sentezi ve folikül gelişimini, erkekte sperm olgunlaşmasını destekler. Pulsatil GnRH uyarır, testosteron ya da östrojen baskılar.', page: '393' },
    { ad: 'ACTH', tip: 'Küçük peptit', up: ['CRH (+)'], down: ['Kortizol (−)'], hedef: ['Adrenal korteks: zona fasikülata', '→ kortizol'], extra: ['Atlas notu: POMC → ACTH ve α-MSH', 'Addison: ACTH ↑ → pigmentasyon'], metin: 'CRH uyarır, kortizol baskılar; zona fasikülatadan kortizol salgılatır. [[K1 s. 393]] <b>Atlas notu:</b> ACTH ve α-MSH ortak POMC öncülünden kesilir; Addison pigmentasyonunda artmış ACTH önemlidir.', page: null },
    { ad: 'GH', tip: 'Protein · anabolik', up: ['GHRH (+)'], down: ['Somatostatin (−)', 'IGF-1 (−)'], hedef: ['Yağ hücresi → lipoliz → yağ asidi ↑', 'Karaciğer → IGF-1 → hücre büyümesi', 'Etkilerin çoğu IGF-1 ile'], extra: ['Pulsatil; özellikle gece', '↑ stres, hipoglisemi, egzersiz', 'Bazal düzey çok düşük'], metin: 'Doğrudan lipoliz yapar; etkilerinin çoğu karaciğerden salınan IGF-1 ile oluşur. GHRH uyarır, somatostatin ve IGF-1 baskılar. Gece pulsatil salınır; stres, hipoglisemi ve egzersizde artar.', page: '393–394' },
    { ad: 'PRL', tip: 'Protein', up: ['Uyarıcı hipotalamik', 'hormon yok'], down: ['Tonik dopamin (−)'], hedef: ['Meme: gebelikte gelişim', 'Doğumdan sonra süt yapımı'], extra: ['↑ Emme, cinsel ilişki, stres, nöbet', '↑ Adenom: salgı', '↑ Sap basısı: dopamin ulaşamaz'], metin: 'Tonik dopamin baskılar; uyarıcı hipotalamik hormonu yoktur. Emme, cinsel ilişki, stres, epileptik nöbet ve tümör (salgı ya da sap basısı) artırır.', page: '394' },
    { ad: 'α-MSH', tip: 'Pars intermedia', up: ['Pars intermedia'], down: ['Bu kartta bir denetim', 'ekseni tanımlanmamıştır'], hedef: ['Deri pigmentasyonu'], extra: ['Atlas notu: POMC ortak öncüldür', 'Erişkinde pars intermedia', 'neredeyse yoktur'], metin: 'Kitap pars intermedianın ek hormonu olarak verir ve gebelik / Addison pigmentasyonuyla ilişkilendirir. [[K1 s. 394]] <b>Atlas notu:</b> Erişkinde pars intermedia neredeyse yoktur; Addison pigmentasyonunda artmış ACTH başlıca etkendir.', page: null }
  ];
  D80_VIZ.f80_on = el => D80_scene(el, {
    baslik: 'Anterior hormonlar: uyaran, baskılayan ve hedef', vb: [640, 560], vbDar: [360, 560],
    secenek: D80_sec('h', 'Hormon', D80_hormones.map(a => a.ad === 'α-MSH' ? 'α-MSH · pars intermedia' : a.ad)),
    metin: p => { const a = D80_hormones[+p.h]; return '<b>' + a.ad + '.</b> ' + a.metin + (a.page ? ' [[K1 s. ' + a.page + ']]' : ''); },
    ciz: (S, t, p) => {
      const a = D80_hormones[+p.h], i = +p.h, c = S.w / 2;
      let s = D80_txt(S, c, 23, ['Doğrudan etkili: PRL, GH', 'Bez uyarıcı: TSH, FSH, LH, ACTH']);
      s += D80_box(S, c - 150, 65, 300, 50, a.up, i === 5 ? 'basic' : 'ok');
      if (i !== 5 && i !== 6) s += S.ok([[c, 117], [c, 157]], { renk: 'ok' });
      if (i === 5) s += S.cizgi([[c - 90, 122], [c + 90, 122]], { renk: 'muted' });
      s += D80_box(S, c - 110, 160, 220, 60, [a.ad, a.tip], i === 6 ? 'warn' : 'accent');
      s += D80_box(S, c - 150, 245, 300, 52, a.down, i === 6 ? 'basic' : 'crit');
      if (i !== 6) s += D80_minus(S, [[c + 152, 272], [c + 166, 272], [c + 166, 190], [c + 112, 190]]);
      s += S.ok([[c - 120, 190], [c - 166, 190], [c - 166, 353], [c - 151, 353]], { renk: 'ok' });
      s += D80_box(S, c - 150, 320, 300, 86, a.hedef, 'ok');
      if ([0, 1, 2, 3, 4].includes(i)) s += D80_minus(S, [[c + 152, 363], [c + 166, 363], [c + 166, 272], [c + 151, 272]]);
      s += D80_txt(S, c, 446, a.extra, 'muted');
      return s;
    }
  });

  const D80_posterior = [
    ['Sentez', 'ADH ve oksitosin hipotalamustaki nöronlarda yapılır ve veziküllere paketlenir. [[K1 s. 394]]'],
    ['Akson taşınması', 'Veziküller aksonlarla posterior loba taşınır ve sinir uçlarında depolanır. [[K1 s. 394]]'],
    ['Salınım', 'Hipotalamustan gelen aksiyon potansiyeli granülleri sistemik dolaşıma boşaltır. Posterior lob hormon yapmaz, yalnız salar. [[K1 s. 394]]'],
    ['ADH: böbrek', 'ADH toplayıcı kanal hücre zarına akuaporin ve UT-A1 yerleştirir. Su ve üre ayrı yollarla geri emilir; UT-A1 su kanalı değildir (Bölüm 69). [[K1 s. 395]]'],
    ['ADH geri bildirimi', 'Ozmolarite artışı ADH salgılatır; su geri emilimi ozmolariteyi düşürünce ADH azalır. Stres artırır, alkol baskılar ve diürez yapar. [[K1 s. 395]]'],
    ['ADH: damar', 'Normal düzeyde tonusa katkısı azdır. Yüksek düzeyde güçlü vazokonstriktördür; hipovolemik şokta kan basıncını korumaya yardım eder. [[K1 s. 395]]'],
    ['Oksitosin', 'ADH’ye benzeyen küçük peptit; doğumda uterus kasılması, emzirmede süt boşaltma, anne–bebek bağı ve güvende rol alır. [[K1 s. 395]]']
  ];
  D80_VIZ.f80_arka = el => D80_steps(el, {
    baslik: 'Posterior lob hormonlarının sentezi, taşınması ve etkileri', vb: [640, 600], vbDar: [360, 600], hareket: true,
    adimlar: D80_posterior.map((a, i) => ({ ad: a[0], metin: a[1], ciz: (S, t) => {
      const c = S.w / 2;
      let s = D80_box(S, c - 132, 16, 264, 66, ['Hipotalamus: sentez', 'ADH ve oksitosin']);
      [c - 42, c + 42].forEach((x, k) => {
        const col = k ? 'clin' : 'basic', path = [[x, 83], [x, 207]];
        s += S.daire(x, 77, 5, { dolgu: col, renk: col });
        s += S.cizgi(path, { renk: col, w: 3 });
        if (i >= 1) s += S.akis(path, t, { renk: col, n: 3 });
        s += S.daire(x, 213, 12, { dolgu: col + '-soft', renk: col });
        if (i >= 2) s += D80_flow(S, [[x, 226], [x, 259]], t, col, 2);
      });
      s += D80_txt(S, c + 98, 135, ['Sap', 'Aksonlar']);
      s += S.kutu(c - 77, 190, 154, 47, { dolgu: 'none', renk: 'clin', kesik: true });
      s += D80_txt(S, c, 180, 'Posterior lob: depo');
      s += S.cizgi([[c - 140, 267], [c + 140, 267]], { renk: 'basic-soft', w: 19 });
      if (i >= 2) s += D80_flow(S, [[c - 137, 267], [c + 137, 267]], t, 'basic');
      s += D80_txt(S, c, 298, 'Kapiller → sistemik dolaşım');
      if (i === 0) s += D80_txt(S, c, 365, ['Hormonlar nöron gövdesinde yapılır', 'Veziküllere paketlenir']);
      if (i === 1) s += D80_txt(S, c, 365, ['Akson boyunca taşınma', 'Sinir ucunda depolanma']);
      if (i === 2) {
        s += D80_flow(S, [[c - 12, 87], [c - 12, 205]], t, 'warn', 1);
        s += D80_txt(S, c, 365, ['Aksiyon potansiyeli → salınım', 'Posterior lob sentez yapmaz']);
      }
      if (i === 3) {
        s += D80_txt(S, c, 339, 'Toplayıcı kanal');
        s += D80_box(S, c - 70, 363, 140, 150, ['Hücre', '→ kana'], 'clin');
        s += D80_txt(S, c - 125, 390, 'Lümen');
        s += D80_txt(S, c + 116, 390, 'Kan');
        ['Akuaporin', 'UT-A1'].forEach((label, k) => {
          const y = 422 + k * 62;
          s += S.kutu(c - 77, y - 12, 14, 24, { renk: 'clin', dolgu: 'paper' });
          s += D80_flow(S, [[c - 145, y], [c - 80, y]], t, 'basic', 2);
          s += D80_flow(S, [[c + 72, y], [c + 150, y]], t, 'basic', 2);
          s += D80_txt(S, c, y - 17, label);
          s += D80_txt(S, c - 124, y + 23, k ? 'Üre' : 'Su');
        });
        s += D80_txt(S, c, 557, 'Su geri emilimi ↑');
      }
      if (i === 4) {
        const phase = D80_RM ? 1 : (t % 8) / 8, high = phase < 0.5;
        s += D80_box(S, c - 148, 330, 296, 45, high ? 'Ozmolarite ↑ → ADH ↑' : 'Ozmolarite ↓ → ADH ↓');
        s += S.ok([[c, 378], [c, 404]], { renk: 'ok' });
        s += D80_box(S, c - 148, 410, 296, 46, 'Su geri emilimi ↑', 'ok');
        s += D80_minus(S, [[c + 150, 434], [c + 165, 434], [c + 165, 351], [c + 149, 351]]);
        s += D80_txt(S, c, 488, 'Plazma ozmolaritesi (nitel)');
        s += S.kutu(c - 100, 503, 200, 14, { dolgu: 'paper' });
        s += S.kutu(c - 100, 503, high ? 170 : 70, 14, { dolgu: 'basic', renk: 'basic' });
        s += D80_txt(S, c, 547, ['Stres → ADH ↑', 'Alkol → ADH ↓ → diürez']);
      }
      if (i === 5) {
        s += D80_txt(S, c, 338, 'Normal ADH: tonusa katkı az');
        s += S.cizgi([[c - 130, 355], [c + 130, 355]], { renk: 'clin', w: 5 }) + S.cizgi([[c - 130, 397], [c + 130, 397]], { renk: 'clin', w: 5 });
        s += D80_flow(S, [[c - 120, 376], [c + 120, 376]], t, 'crit');
        s += D80_txt(S, c, 439, ['Yüksek ADH: güçlü daralma', 'Hipovolemik şok']);
        s += S.cizgi([[c - 130, 479], [c - 40, 490], [c + 40, 490], [c + 130, 479]], { renk: 'clin', w: 5 });
        s += S.cizgi([[c - 130, 521], [c - 40, 510], [c + 40, 510], [c + 130, 521]], { renk: 'clin', w: 5 });
        s += D80_flow(S, [[c - 120, 500], [c + 120, 500]], t, 'crit');
        s += D80_txt(S, c, 560, 'Kan basıncını korumaya katkı');
      }
      if (i === 6) {
        s += D80_box(S, c - 152, 326, 304, 60, ['Serviks gerilmesi', '→ uterus düz kası kasılır'], 'clin');
        s += D80_box(S, c - 152, 402, 304, 70, ['Emme → miyoepitel kasılır', '→ süt kanallara boşalır', 'Süt yapımı: PRL; boşaltma: oksitosin'], 'clin');
        s += D80_box(S, c - 152, 490, 304, 58, ['Anne–bebek bağı, güven', '“Sarılma hormonu”'], 'clin');
      }
      return s;
    } }))
  });

  D80_VIZ.f80_adenom = el => D80_scene(el, {
    baslik: 'Hipofiz adenomunun dört sunumu', vb: [640, 600], vbDar: [360, 600],
    secenek: D80_sec('s', 'Salgı özelliği', ['Salgılayan', 'Salgılamayan']),
    param: [{ id: 'b', ad: 'Tümör boyutu (nitel model)', min: 0, max: 1, adim: 0.05, deger: 0.15 }],
    metin: p => p.b >= 0.6 ? '<b>Kitle etkisi.</b> Kiazma basısı bitemporal hemianopi; kranial sinir basısı felç; üçüncü ventrikül basısı obstrüktif hidrosefali yapabilir. Boyut eşikleri yalnız bu çizime aittir. [[K1 s. 395]]' : p.b >= 0.35 ? '<b>Hiposekresyon.</b> Normal hücrelerin sıkışması hipotiroidi, adrenokortikal yetmezlik veya infertilite yapabilir. Büyük tümörler çoğunlukla salgılamaz; salgı seçimi boyuttan bağımsızdır. [[K1 s. 395]]' : p.s === '0' ? '<b>Küçük salgılayan tümör.</b> Hormon fazlalığıyla erken fark edilir; ör. PRL fazlası galaktore yapar. Tümör boyutunu artırın. [[K1 s. 395]]' : '<b>Rastlantısal bulgu.</b> Adenom başka nedenle çekilen BT veya MR’da bulunabilir. [[K1 s. 395]]',
    ciz: (S, t, p) => {
      const c = S.w / 2, r = 6 + p.b * 70, ch = p.b >= 0.6, cav = p.b >= 0.75, vent = p.b >= 0.9;
      let s = D80_txt(S, c, 22, 'Koronal komşuluk şeması');
      s += D80_box(S, c - 45, 87, 90, 24, '', vent ? 'crit' : 'basic');
      s += D80_txt(S, c, 67, 'Üçüncü ventrikül');
      s += S.kutu(c - 90, 122, 180, 10, { renk: ch ? 'crit' : 'clin', dolgu: ch ? 'crit-soft' : 'clin-soft' });
      s += S.t(c - 164, 117, 'Optik kiazma', { c: 'k', renk: ch ? 'crit' : 'clin' });
      s += D80_box(S, c - 162.5, 157, 104, 114, ['Kavernöz', 'sinüs', 'III, IV, VI', 'V1, V2, ICA'], cav ? 'crit' : 'basic');
      s += D80_box(S, c + 58.5, 157, 104, 114, ['Kavernöz', 'sinüs', 'III, IV, VI', 'V1, V2, ICA'], cav ? 'crit' : 'basic');
      s += S.daire(c, 180, 54, { dolgu: 'accent-soft', renk: p.b >= 0.35 ? 'crit' : 'accent', w: 4 });
      s += S.daire(c, 180, r, { dolgu: 'warn-soft', renk: 'warn', w: 3 });
      s += S.cizgi([[c - 56, 220], [c - 56, 270], [c + 56, 270], [c + 56, 220]], { renk: 'line', w: 5 });
      s += D80_txt(S, c, 295, 'Hipofiz dokusu / tümör');
      s += D80_txt(S, c, 325, p.s === '0' ? 'Salgılayan: hormon fazlalığı sürebilir' : 'Salgılamayan: hormon fazlalığı yok');
      if (p.b < 0.35) s += D80_txt(S, c, 365, p.s === '0' ? ['Hipersekresyon', 'Örnek: PRL ↑ → galaktore'] : ['Belirti vermeyebilir', 'BT / MR’da rastlantısal bulgu']);
      else s += D80_txt(S, c, 358, ['Doku basısı → hiposekresyon riski', 'Hipotiroidi / adrenal yetmezlik', '/ infertilite']);
      if (ch) {
        [c - 42, c + 42].forEach((x, k) => {
          s += S.daire(x, 420, 24, { renk: 'clin', dolgu: 'paper' });
          // Dış temporal yarılar; görme alanı, göz anatomisi değildir.
          s += '<path d="M' + x + ' 396 A24 24 0 0 ' + (k ? '1 ' : '0 ') + x + ' 444 Z" style="fill:var(--crit);opacity:.7"/>';
        });
        s += D80_txt(S, c, 466, 'Bitemporal hemianopi');
      }
      if (cav) s += D80_txt(S, c, 490, 'Kranial sinir felci riski', 'crit');
      if (vent) s += D80_txt(S, c, 515, 'Obstrüktif hidrosefali riski', 'crit');
      s += D80_txt(S, c, 549, ['Transsfenoidal cerrahi', 'Cushing / akromegali', 'Akromegali: zor hava yolu'], 'muted');
      return s;
    }
  });
})();
