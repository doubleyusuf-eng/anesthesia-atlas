/* Bölüm 74 · Anemi ve polisitemi — özgün, şematik çizimler. */
(function () {
  'use strict';
  const D74_VIZ = window.VIZ;
  const D74_RM = window.VIZ_YARDIM.RM;
  const D74_sec = (id, ad, labels) => ({ id, ad, liste: labels.map((ad, i) => ({ d: String(i), ad })) });
  const D74_kutu = (S, x, y, w, h, text, col = 'accent', active = true) =>
    S.kutu(x, y, w, h, { renk: active ? col : 'line', dolgu: active ? col + '-soft' : 'paper' }) +
    S.t(x + w / 2, y + h / 2 + 5 - (Array.isArray(text) ? (text.length - 1) * 9 : 0), text, { a: 'middle', c: 'k', lh: 18 });
  const D74_akis = (S, pts, t, n = 4, col = 'accent', w = 2) =>
    S.ok(pts, { renk: col, w }) + (n > 0 ? S.akis(pts, t, { n, renk: col, r: 3 }) : '');
  const D74_hucre = (S, x, y, type, active = true) => {
    let s = S.daire(x, y, 20, { dolgu: type > 2 ? 'crit-soft' : 'basic-soft', renk: active ? 'accent' : 'line', w: active ? 3 : 1.5 });
    if (type < 4) s += S.daire(x, y, type < 3 ? 11 : 8, { dolgu: 'muted', renk: 'muted' });
    if (type === 4) for (let j = 0; j < 5; j++) s += S.daire(x + (j % 3 - 1) * 9, y + (Math.floor(j / 3) - 0.5) * 10, 2, { dolgu: 'muted', renk: 'muted' });
    if (type === 5) s += S.daire(x, y, 10, { dolgu: 'paper', renk: 'crit' });
    return s;
  };
  const D74_eritroMetin = [
    'Ortak pluripotent hematopoietik kök hücre, eritropoeze ayrılmış miyeloid öncüllere farklılaşır. [[K1 s. 356]]',
    "Öncül önce eritroid patlama oluşturan birim (BFU-E), sonra eritroid koloni oluşturan birim (CFU-E) olur. İkisi de EPO\'nun hedefidir. [[K1 s. 356]]",
    'Eritroblastlar DNA sentezi için B12 ve folat ister; Hb sentezi erken başlar: globin sitoplazmada, demirli hem mitokondride yapılır. [[K1 s. 356]]',
    'Sondan bir önceki hücre: çekirdeksizdir ama kalan ribozomal RNA ile Hb yapmayı sürdürür. [[K1 s. 356]]',
    "Dolaşımda 1–2 gün sonra RNA'sını ve Hb yapma yeteneğini yitirip olgun eritrosit olur. [[K1 s. 356]]",
    "Hipoksemi böbrekte (≈%10'u karaciğerde) EPO salgısını artırır; EPO BFU-E ve CFU-E'yi uyarır, artan O₂ taşıma kapasitesi hipoksemiyi giderir: negatif geribildirim. Karaciğer payı son dönem böbrek yetmezliğinde önemlidir. [[K1 s. 356]]"
  ];
  D74_VIZ.f74_eritropoez = el => SEKIL.adim(el, {
    baslik: 'Eritropoez basamakları ve EPO negatif geribildirimi', vb: [640, 650], vbDar: [360, 950], hareket: true, oto: false,
    adimlar: ['Kök hücre', 'BFU-E → CFU-E', 'Eritroblast', 'Retikülosit', 'Eritrosit', 'EPO döngüsü'].map((ad, i) => ({ ad, metin: D74_eritroMetin[i] })),
    ortak: (S, i, t) => {
      const names = ['Kök hücre', 'BFU-E', 'CFU-E', 'Eritroblast', 'Retikülosit', 'Eritrosit'];
      const pts = names.map((_, j) => S.dar ? [55, 58 + j * 57] : [55 + j * 105, 72]);
      let s = S.kutu(20, 14, S.dar ? 302 : 495, S.dar ? 303 : 106, { kesik: true });
      s += S.t(S.dar ? 305 : 260, 34, 'Kemik iliği', { a: S.dar ? 'end' : 'middle', c: 'k m' });
      names.forEach((n, j) => {
        const [x, y] = pts[j], active = i === 5 || (i === 1 ? j === 1 || j === 2 : j === (i > 1 ? i + 1 : i));
        if (j) s += S.ok(S.dar ? [[x, y - 36], [x, y - 23]] : [[x - 82, y], [x - 25, y]], { renk: 'muted' });
        s += D74_hucre(S, x, y, j, active);
        s += S.t(S.dar ? 88 : x, S.dar ? y + 5 : 110, n, { a: S.dar ? 'start' : 'middle', c: 'k', renk: active ? 'ink' : 'muted' });
      });
      s += S.t(S.dar ? 230 : 580, S.dar ? 347 : 34, 'Dolaşım', { a: 'middle', c: 'k m' });
      const y = S.dar ? 390 : 155;
      if (i === 2) {
        const cw = S.dar ? 300 : 580, half = (cw - 30) / 2;
        s += S.kutu(30, y, cw, 118, { dolgu: 'crit-soft', renk: 'crit', r: 24 });
        s += S.t(30 + cw / 2, y + 21, 'Eritroblast', { a: 'middle', c: 'b k' });
        s += D74_kutu(S, 40, y + 31, half, 48, ['Globin', 'Sitoplazma'], 'basic');
        s += D74_kutu(S, 50 + half, y + 31, half, 48, ['Hem + Fe', 'Mitokondri'], 'warn');
        s += S.t(30 + cw / 2, y + 105, 'B12 + folat → DNA', { a: 'middle', c: 'k' });
      } else if (i === 3 || i === 4) {
        const u = D74_RM ? 1 : S.clamp(t / 2, 0, 1), x = 80 + (i === 4 ? u * (S.dar ? 180 : 440) : 0);
        s += D74_hucre(S, x, y + 35, 5);
        if (i === 3) {
          s += '<g opacity="' + (1 - u) + '">' + S.daire(x + u * 65, y + 35, 9, { dolgu: 'muted' }) + '</g>';
          s += S.t(S.dar ? 180 : 330, y + 88, ['Çekirdek dışarı atılır', 'rRNA ile Hb sentezi sürer'], { a: 'middle', c: 'k' });
        } else s += S.t(S.dar ? 180 : 320, y + 88, ['Dolaşıma geçiş → 1–2 gün', 'RNA ve Hb sentez yeteneği kaybolur'], { a: 'middle', c: 'k' });
        s += '<g opacity="' + (i === 3 ? 1 : 1 - u) + '">';
        for (let j = 0; j < 5; j++) s += S.daire(x - 10 + j * 5, y + 30 + (j % 2) * 10, 2, { dolgu: 'muted' });
        s += '</g>';
      } else s += D74_kutu(S, 30, y, S.dar ? 300 : 580, 95, i === 5 ? ['EPO → BFU-E ve CFU-E', 'Eritrosit üretimi ↑'] : ['Eritrosit üretimi', 'Hücre dizisini adım adım izleyin']);
      const top = S.dar ? 540 : 305, cx = S.dar ? 180 : 320, w = S.dar ? 250 : 340;
      const rows = [['Hipoksemi'], ['Böbrek ≈%90', 'Karaciğer ≈%10'], ['EPO → BFU-E ve CFU-E'], ['O₂ taşıma kapasitesi ↑']];
      s += '<g opacity="' + (i === 5 ? 1 : 0.55) + '">';
      rows.forEach((r, j) => {
        s += D74_kutu(S, cx - w / 2, top + j * 78, w, 54, r, j === 3 ? 'ok' : 'accent');
        if (j) s += D74_akis(S, [[cx, top + (j - 1) * 78 + 54], [cx, top + j * 78]], i === 5 ? t : 0, i === 5 ? 2 : 0);
      });
      s += S.ok([[cx - w / 2, top + 261], [24, top + 261], [24, top + 27], [cx - w / 2, top + 27]], { renk: 'ok' });
      s += S.rozet(24, top + 145, '−', { renk: 'ok', dolgu: 'ok-soft', w: 28 });
      s += S.t(cx, top + 318, 'Negatif geribildirim', { a: 'middle', c: 'k', renk: 'ok' });
      return s + '</g>';
    }
  });

  const D74_neden = [
    { items: [['Üretim = kayıp', 'Hb sabit']], metin: 'Üretim kaybı karşıladıkça Hb sabit kalır. Anemi, kayıp üretimi aşınca gelişir. [[K1 s. 356]]' },
    { items: [['Demir eksikliği', 'Mikrositik, hipokrom'], ['B12 / folat eksikliği', 'Megaloblastik'], ['Son dönem böbrek hastalığı', 'EPO ↓ · normositik'], ['Kronik hastalık', 'IL-6 → hepsidin ↑']], metin: 'Kemik iliği yeterince eritrosit yapamaz; eritrositin görünümü nedene ipucu verir. [[K1 s. 356]]' },
    { items: [['Sferositoz'], ['Orak hücre'], ['G6PD eksikliği → MetHb'], ['ABO uyumsuz transfüzyon', 'Damar içi hemoliz'], ['Otoimmün'], ['Mekanik: KPB, kapak']], metin: 'Eritrositler damar içinde ya da daha sık dalakta yıkılır; ömür kısalır. [[K1 s. 356–357]]' },
    { items: [['Akut: postpartum kanama'], ['Kronik: kolon karsinomu,', 'menstrüasyon'], ['Yoğun bakım: tekrarlanan', 'arter kanı örneklemesi']], metin: 'Kayıp akut ya da kronik olabilir; yoğun bakımda kan örneklemesi bile önemli bir kayıptır. [[K1 s. 357]]' }
  ];
  D74_VIZ.f74_nedenler = el => {
    let previous = '0', from = 0, angle = 0;
    return SEKIL.sahne(el, {
      baslik: 'Anemide üretim ve kayıp dengesi', vb: [640, 440], vbDar: [360, 720], hareket: true,
      secenek: D74_sec('neden', 'Aneminin nedeni', ['Denge', 'Yetersiz üretim', 'Hemoliz', 'Kanama']),
      metin: p => D74_neden[+p.neden].metin,
      ciz: (S, t, p) => {
        if (previous !== p.neden) { from = angle; previous = p.neden; }
        const paused = el.querySelector?.('.sk-oyn')?.getAttribute('aria-pressed') === 'false';
        angle = S.lerp(from, p.neden === '0' ? 0 : 18, D74_RM || paused ? 1 : S.clamp(t / 0.4, 0, 1));
        const cx = S.dar ? 180 : 155, y = 145, a = angle * Math.PI / 180;
        let s = S.t(cx, 30, p.neden === '0' ? 'Üretim = kayıp' : 'Üretim &lt; kayıp', { a: 'middle', c: 'b' });
        s += S.cizgi([[cx, y], [cx - 25, 260], [cx + 25, 260], [cx, y]], { dolgu: 'basic-soft', renk: 'basic' });
        const ends = [-1, 1].map(sign => [cx + sign * 102 * Math.cos(a), y + sign * 102 * Math.sin(a)]);
        s += S.cizgi(ends, { w: 5, renk: 'ink' });
        ends.forEach(([x, yy], j) => {
          s += S.cizgi([[x, yy], [x, yy + 35]], { renk: j ? 'crit' : 'basic' });
          s += D74_kutu(S, x - 47, yy + 35, 94, 46, j ? 'Kayıp' : 'Üretim', j ? 'crit' : 'basic');
          s += S.t(x, yy - 18, j ? (p.neden === '2' ? 'Yıkım ↑' : p.neden === '3' ? 'Kanama ↑' : 'Kayıp') : (p.neden === '1' ? 'İlik ↓' : 'İlik'), { a: 'middle', c: 'k' });
        });
        const h = p.neden === '0' ? 53 : 24;
        s += S.kutu(cx - 12, 48, 24, 60) + S.kutu(cx - 10, 106 - h, 20, h, { dolgu: p.neden === '0' ? 'ok' : 'crit', renk: 'line', r: 2 });
        s += S.t(cx + 22, 85, 'Hb', { c: 'k' });
        s += S.t(cx, 291, p.neden === '2' ? ['Çoğu: dalakta yıkım', 'Daha az: damar içi'] : p.neden === '3' ? 'Kan vücut dışına kaybedilir' : 'Kemik iliği → eritrosit', { a: 'middle', c: 'k' });
        const x = S.dar ? 25 : 320, top = S.dar ? 335 : 26, w = S.dar ? 310 : 300;
        D74_neden[+p.neden].items.forEach((v, j) => { s += D74_kutu(S, x, top + j * 61, w, 53, v, p.neden === '0' ? 'ok' : 'warn'); });
        return s;
      }
    });
  };

  const D74_sonuc = [
    { title: 'Hipovolemi', labels: [[0, 'Taşikardi'], [2, 'Hipotansiyon'], [3, 'Oligüri']], metin: 'Akut kan kaybında tablo hipovolemidir: taşikardi, hipotansiyon, oligüri. [[K1 s. 357]]' },
    { title: 'Hafif kronik anemi', labels: [[4, 'Halsizlik'], [1, 'Eforla dispne']], metin: 'Hafif kronik anemide halsizlik ve eforla dispne olur; asıl önemli olan altta yatan nedendir (ör. kolon karsinomu). [[K1 s. 357]]' },
    { title: 'Şiddetli kronik anemi', labels: [[0, ['Kalp debisi ↑', 'Çarpıntı']]], metin: 'O₂ taşıma kapasitesi düşünce kalp debisi artmak zorundadır; hasta çarpıntı duyar. [[K1 s. 357]]' },
    { title: 'Arter hastalığı + anemi', labels: [[0, 'Angina'], [5, 'Kladikasyon'], [0, ['Yüksek debili', 'kalp yetmezliği']]], metin: 'Önceden koroner ya da periferik arter hastalığı olanda angina ya da kladikasyon görülür; yüksek debili kalp yetmezliği gelişebilir. [[K1 s. 357]]' }
  ];
  D74_VIZ.f74_sonuc = el => SEKIL.sahne(el, {
    baslik: 'Aneminin organ bulguları', vb: [640, 380], vbDar: [360, 400],
    secenek: D74_sec('durum', 'Hasta grubu', ['Akut kan kaybı', 'Kronik · hafif', 'Kronik · şiddetli', 'Koroner / periferik arter hastalığı']),
    metin: p => D74_sonuc[+p.durum].metin,
    ciz: (S, t, p) => {
      const cx = S.dar ? 76 : 160, d = D74_sonuc[+p.durum], x = S.dar ? 154 : 340, w = S.dar ? 192 : 275;
      let s = S.t(S.dar ? 180 : 320, 28, d.title, { a: 'middle', c: 'b' });
      s += S.daire(cx, 78, 24, { renk: 'line', dolgu: 'basic-soft' });
      s += S.kutu(cx - 36, 110, 72, 150, { dolgu: 'basic-soft', r: 24 });
      s += S.cizgi([[cx - 24, 260], [cx - 27, 340]], { renk: 'line', w: 18 });
      s += S.cizgi([[cx + 24, 260], [cx + 27, 340]], { renk: 'line', w: 18 });
      const organs = [[cx + 10, 162], [cx - 19, 142], [cx, 200], [cx + 23, 226], [cx, 78], [cx + 27, 303]];
      organs.forEach(([a, b], j) => { s += S.daire(a, b, j === 1 ? 12 : 8, { dolgu: d.labels.some(l => l[0] === j) ? 'crit' : 'line', renk: 'paper' }); });
      d.labels.forEach(([j, label], k) => {
        const yy = 90 + k * 91;
        s += S.cizgi([organs[j], [x - 13 - k * 5, organs[j][1]], [x - 13 - k * 5, yy + 31], [x, yy + 31]], { renk: 'warn', w: 1.5 });
        s += D74_kutu(S, x, yy, w, 62, label, 'warn');
      });
      return s;
    }
  });

  const D74_pbm = [
    ['Önce', 'Preoperatif aneminin en sık nedeni demir eksikliğidir; intravenöz demirle eritrosit kitlesi optimize edilir. [[K1 s. 357]]'],
    ['Sırasında', 'Kan kaybı en aza indirilir; kan ürünü gerekirse tromboelastografi yol gösterir. [[K1 s. 357]]'],
    ['Sonra', 'NICE eşiği 70 g/L, kardiyovasküler hastalıkta 80 g/L; aktif kanaması olmayan stabil hastada tek ünite stratejisi. [[K1 s. 357]]'],
    ['Neden?', 'Perioperatif anemi de transfüzyon da kötü postoperatif sonucun bağımsız risk etkenidir; hasta kan yönetimi gereksiz transfüzyonu azaltır. [[K1 s. 357]]']
  ];
  D74_VIZ.f74_pbm = el => SEKIL.adim(el, {
    baslik: 'Hasta kan yönetimi ve kitapta verilen Hb eşikleri', vb: [640, 780], vbDar: [360, 1000], oto: false,
    adimlar: D74_pbm.map(([ad, metin]) => ({ ad, metin })),
    ortak: (S, i) => {
      const cols = [
        ['Ameliyattan önce', 'Eritrosit kitlesini', 'optimize et', 'En sık: demir eksikliği', 'IV demir'],
        ['Ameliyat', 'Minimal invaziv cerrahi', 'Topikal hemostatik', 'Traneksamik asit', 'Hücre kurtarma', 'Tromboelastografi', 'ile kan ürünü'],
        ['Ameliyattan sonra', 'Eşik: 70 g/L', 'Kardiyovasküler', 'hastalıkta: 80 g/L*', 'Stabil, kanamasız:', 'tek ünite']
      ];
      let s = S.t(S.dar ? 180 : 320, 27, i === 3 ? ['Anemi = bağımsız risk', 'Transfüzyon = bağımsız risk'] : 'Hasta kan yönetimi', { a: 'middle', c: 'b', lh: 22 });
      cols.forEach((v, j) => {
        const x = S.dar ? 25 : 10 + j * 210, y = S.dar ? 65 + j * 164 : 72, w = S.dar ? 310 : 200;
        s += D74_kutu(S, x, y, w, S.dar ? 150 : 194, v, 'accent', i === j || i === 3);
        if (S.dar && j < 2) s += S.ok([[180, y + 150], [180, y + 162]], { renk: 'muted' });
      });
      const top = S.dar ? 605 : 350, axis = S.dar ? 58 : 150;
      const Y = hb => top + (160 - hb) * 2.5;
      s += S.t(axis, top - 20, 'Hb (g/L)', { c: 'b' });
      s += S.cizgi([[axis, top], [axis, top + 300]], { renk: 'ink' });
      [[130, ['DSÖ erkek'], 0], [120, ['DSÖ kadın', '(gebe değil)'], 0], [80, ['K1: kardiyovasküler', 'hastalık*'], 2], [70, ['K1: NICE eşiği'], 2]].forEach(([hb, label, step], j) => {
        const yy = Y(hb), ly = top + [49, 104, 180, 258][j], active = i === step || i === 3;
        s += S.cizgi([[axis - 8, yy], [axis + 13, yy], [axis + 35, ly], [axis + 48, ly]], { renk: active ? 'accent' : 'muted' });
        s += S.t(axis - 14, yy + 5, String(hb), { a: 'end', c: 'k b', renk: active ? 'accent' : 'muted' });
        s += S.t(axis + 53, ly + 5, label, { c: 'k' });
      });
      if (i === 2 || i === 3) s += D74_kutu(S, S.dar ? 245 : 460, top + 265, S.dar ? 90 : 130, 40, '1 ünite', 'crit');
      s += S.t(S.dar ? 180 : 320, top + 343, ['* K1’deki eşikler; güncel ayrım için', 'aşağıdaki Atlas notuna bakın.'], { a: 'middle', c: 'k m' });
      return s;
    }
  });

  D74_VIZ.f74_dongu = el => SEKIL.sahne(el, {
    baslik: 'Demir emilimi, geri kazanımı ve vücutta dağılımı', vb: [640, 900], vbDar: [360, 920], hareket: true, sure: 8,
    metin: () => "Diyetle gelen 15 mg'ın yalnız 1–2 mg'ı emilir; kemik iliği günde 20 mg kullanır, farkı yıkılan eritrositten transferrinle geri dönen demir kapatır. Atılım yolu yoktur. [[K1 s. 357–358]]",
    ciz: (S, t) => {
      const cx = S.dar ? 180 : 300, w = S.dar ? 244 : 300, left = cx - w / 2;
      let s = D74_kutu(S, left, 12, w, 48, 'Diyet: 15 mg/gün');
      s += D74_akis(S, [[cx, 60], [cx, 82]], t, 2);
      s += D74_kutu(S, left, 82, w, 76, ['Duodenum', 'Gebelik / demir eksikliği:', 'emilim ×2’ye dek']);
      s += S.ok([[left, 120], [20, 120], [20, 174], [left, 174]], { renk: 'muted' });
      s += S.t(left + 8, 177, ['13–14 mg/gün', 'dışkıyla'], { c: 'k m' });
      s += D74_akis(S, [[cx + 85, 158], [cx + 85, 213]], t, 2);
      s += D74_kutu(S, left, 213, w, 70, ['1–2 mg/gün emilir', 'Plazma: transferrin–Fe³⁺']);
      s += D74_akis(S, [[cx, 283], [cx, 338]], t, 7, 'crit', 5);
      s += S.t(cx + 17, 315, '20 mg/gün', { c: 'k' });
      s += D74_kutu(S, left, 338, w, 48, 'Kemik iliği', 'crit');
      s += D74_akis(S, [[cx, 386], [cx, 420]], t, 5, 'crit', 4);
      s += D74_kutu(S, left, 420, w, 48, 'Eritrositler (Hb)', 'crit');
      s += D74_akis(S, [[cx, 468], [cx, 502]], t, 5, 'crit', 4);
      s += D74_kutu(S, left, 502, w, 48, 'Ömür sonu: yıkım', 'crit');
      const rx = S.dar ? 337 : 530;
      s += D74_akis(S, [[cx + w / 2, 526], [rx, 526], [rx, 248], [cx + w / 2, 248]], t, 12, 'crit', 5);
      s += S.t(rx + 17, 390, 'Geri kazanım', { a: 'middle', c: 'k', r: -90, renk: 'crit' });
      s += S.ok([[left, 249], [35, 249], [35, 600], [left, 600]], { cift: true, renk: 'basic' });
      s += D74_kutu(S, left, 573, w, 60, ['Karaciğer deposu', 'Ferritin, hemosiderin'], 'basic');
      s += S.t(cx, 665, '× Düzenlenmiş atılım yolu yok', { a: 'middle', c: 'k m' });
      const by = S.dar ? 720 : 710, bx = S.dar ? 25 : 80, bw = S.dar ? 310 : 480;
      s += S.t(S.dar ? 180 : 320, by - 20, 'Toplam vücut demiri: 3–5 g', { a: 'middle', c: 'b' });
      // Temsili %65 / %10 / %25 toplamı 100'dür; etiketler kitabın aralıklarını korur.
      [[0, 0.65, 'crit'], [0.65, 0.10, 'warn'], [0.75, 0.25, 'basic']].forEach(([start, frac, col]) => { s += S.kutu(bx + start * bw, by, frac * bw, 20, { dolgu: col, renk: col, r: 0 }); });
      const labels = [['Hb: %60–70', 'crit'], ['Miyoglobin + enzimler: %5–10', 'warn'], ['Karaciğer deposu: %20–30', 'basic']];
      labels.forEach(([l, c], j) => { s += S.t(bx, by + 47 + j * 26, l, { c: 'k', renk: c }); });
      s += S.t(bx, by + 137, ['Enzimler: sitokromlar,', 'katalaz, peroksidaz'], { c: 'k m' });
      return s;
    }
  });

  const D74_hepsidinMetin = [
    "<b>Hepsidin düşük.</b> Ferroportin açık: Fe²⁺ dolaşıma geçer, plazmada Fe³⁺'e oksitlenip transferrine bağlanır ve kemik iliğine taşınır. Depolar azken böyledir; herediter hemokromatozda hepsidin uygunsuz düşüktür ve demir birikir. [[K1 s. 358]]",
    '<b>Hepsidin orta.</b> Ferroportinin bir kısmı kapalıdır; emilim depolara göre ayarlanır. Eskiden bu ayarın mukozada olduğu sanılırdı (mukozal blok teorisi). [[K1 s. 358]]',
    '<b>Hepsidin yüksek.</b> Hepsidin ferroportine bağlanıp onu engeller: Fe²⁺ hücrede ferritinde kalır ve mukoza hücresi dökülünce atılır. Kronik hastalık anemisinde IL-6 hepsidini bu yönde artırır. [[K1 s. 356, 358]]'
  ];
  D74_VIZ.f74_enterosit = el => SEKIL.sahne(el, {
    baslik: 'Enterositte hepsidin ve mide asidinin demir emilimine etkisi', vb: [640, 880], vbDar: [360, 880], hareket: true, sure: 8,
    param: [{ id: 'hepsidin', ad: 'Hepsidin düzeyi (nitel)', min: 0, max: 100, adim: 1, deger: 20 }],
    secenek: D74_sec('asit', 'Mide asidi', ['Normal mide asidi', 'Proton pompası inhibitörü']),
    metin: p => D74_hepsidinMetin[p.hepsidin <= 33 ? 0 : p.hepsidin <= 66 ? 1 : 2] + (p.asit === '1' ? ' Mide asidi azalınca Fe³⁺ indirgenemez ve duodenumda çöker; duodenal Fe²⁺ azalır, demir eksikliği gelişir. Demir ilaçları bu yüzden ferro tuzudur. [[K1 s. 358]]' : ''),
    ciz: (S, t, p) => {
      // Zarlar yatay: dar ekranda da aynı apikal → bazolateral sıra korunur.
      const cx = S.dar ? 180 : 320, left = S.dar ? 25 : 80, w = S.dar ? 310 : 480;
      const a = cx - (S.dar ? 76 : 130), b = cx + (S.dar ? 76 : 130), high = p.hepsidin > 66, ppi = p.asit === '1';
      const shed = high ? (D74_RM ? 1 : S.clamp((t - 6) / 2, 0, 1)) : 0;
      let s = S.t(cx, 27, 'LÜMEN', { a: 'middle', c: 'b' });
      s += S.t(a, 64, 'Hem', { a: 'middle', c: 'b' });
      s += S.t(b, 64, 'Fe³⁺', { a: 'middle', c: 'b' });
      s += D74_akis(S, [[a, 76], [a, 240]], t, 4);
      s += D74_akis(S, [[b, 76], [b, 170]], t, ppi ? 1 : 6, 'basic');
      s += D74_kutu(S, b - (S.dar ? 73 : 105), 90, S.dar ? 146 : 210, 60, ppi ? ['Asit azalır', 'İndirgeme ↓'] : ['Asit kimus', 'Enzimatik indirgeme'], 'basic');
      s += S.t(b, 188, 'Fe²⁺', { a: 'middle', c: 'b' });
      s += D74_akis(S, [[b, 198], [b, 255]], t, ppi ? 1 : 5, 'basic');
      s += D74_kutu(S, a - (S.dar ? 73 : 105), 102, S.dar ? 146 : 210, 60, ['Hem taşıyıcı', 'protein']);
      if (ppi) {
        for (let j = 0; j < 7; j++) s += S.daire(cx - 20 + j * 6, 204 + (j % 2) * 7, 3, { dolgu: 'muted', renk: 'muted' });
        s += S.t(cx, 232, 'Fe³⁺: pH > 3’te çöker', { a: 'middle', c: 'k m' });
      }
      s += S.t(left, 274, 'Apikal zar', { c: 'k m' });
      s += '<g transform="translate(0 ' + (-shed * 35) + ')" opacity="' + (1 - shed * 0.65) + '">';
      s += S.kutu(left, 284, w, 230, { dolgu: 'basic-soft', renk: 'basic', r: 25 });
      s += S.t(cx, 312, 'DUODENAL ENTEROSİT', { a: 'middle', c: 'b k' });
      s += S.t(a, 342, 'Fe ayrılır', { a: 'middle', c: 'k' });
      s += S.t(b, 342, 'Fe²⁺', { a: 'middle', c: 'b' });
      s += S.ok([[a, 350], [cx, 382]], { renk: 'basic' }) + S.ok([[b, 350], [cx, 382]], { renk: 'basic' });
      const n = 3 + Math.round(p.hepsidin / 6);
      for (let j = 0; j < n; j++) s += S.daire(cx - 35 + (j % 7) * 11, 389 + Math.floor(j / 7) * 11, 4, { dolgu: 'warn', renk: 'warn' });
      s += S.t(cx, 445, 'Ferritin: hücre içi depo', { a: 'middle', c: 'k' });
      s += '</g>';
      s += D74_kutu(S, cx - 70, 486, 140, 44, 'Ferroportin', high ? 'warn' : 'ok');
      s += S.t(left, 555, 'Bazolateral zar → KAN', { c: 'k b' });
      const path = [[cx, 531], [cx, 566], [left + w - 6, 566], [left + w - 6, 615], [cx, 615], [cx, 619]], count = Math.ceil(10 * (1 - p.hepsidin / 100));
      s += D74_akis(S, path, t, count, high ? 'muted' : 'ok', 2);
      const bound = Math.round(p.hepsidin / 17);
      for (let j = 0; j < bound; j++) s += S.daire(cx - 48 + j * 19, 531, 5, { dolgu: 'warn', renk: 'warn' });
      s += S.t(S.dar ? 180 : 320, 589, ['Karaciğer → hepsidin: ' + (p.hepsidin <= 33 ? 'düşük' : p.hepsidin <= 66 ? 'orta' : 'yüksek')], { a: 'middle', c: 'k', renk: 'warn' });
      s += S.ok([[left + 10, 595], [left + 10, 509], [cx - 73, 509]], { renk: 'warn' });
      s += D74_kutu(S, left, 625, w, 68, ['Fe²⁺ → Fe³⁺ (oksidasyon)', 'Fe³⁺ + transferrin'], 'ok');
      s += D74_akis(S, [[cx, 693], [cx, 723]], t, count, 'ok');
      s += D74_kutu(S, left, 727, w, 62, ['Kemik iliğine taşınır', 'Fazlası hücre içi ferritinde depo'], 'ok');
      if (high) s += S.t(cx, 824, ['Mukoza hücresi lümene dökülür:', 'tutulan demir dışkıyla kaybedilir'], { a: 'middle', c: 'k', renk: 'warn' });
      return s;
    }
  });

  const D74_vis = h => 0.35 * Math.exp(4 * h);
  const D74_esik = p => p.cins === '0' ? 0.51 : 0.48;
  D74_VIZ.f74_viskozite = el => SEKIL.grafik(el, {
    baslik: 'Hematokrit arttıkça viskozite artar: nitel model', vb: [640, 500], vbDar: [360, 480],
    x: { min: 0.25, max: 0.70, ad: 'Hematokrit', adimlar: [0.3, 0.4, 0.5, 0.6, 0.7] },
    y: { min: 0, max: 6, ad: 'Göreli viskozite (nitel)', adimlar: [0, 2, 4, 6] },
    param: [{ id: 'hct', ad: 'Hematokrit', min: 0.30, max: 0.70, adim: 0.01, deger: 0.45 }],
    secenek: D74_sec('cins', 'Cinsiyet', ['Erkek', 'Kadın']),
    egriler: [{ f: D74_vis, renk: 'crit' }],
    dikey: p => [{ x: D74_esik(p), ad: '', renk: 'warn' }],
    bolgeler: p => [{ x1: D74_esik(p), x2: 0.70, renk: 'warn-soft' }],
    noktalar: p => [{ x: p.hct, y: D74_vis(p.hct), renk: 'accent' }],
    ek: (S, p, X, Y) => {
      const x = X(0.27), y = Y(5.8), w = S.dar ? 134 : 245, color = p.hct > D74_esik(p) ? 'crit' : 'basic';
      let s = S.kutu(x, y, w, 141, { dolgu: 'paper' });
      s += S.t(x + w / 2, y + 22, 'Damar', { a: 'middle', c: 'k' });
      s += S.kutu(x + 10, y + 33, w - 20, 29, { renk: 'crit', dolgu: 'crit-soft' });
      for (let j = 0; j < Math.round(p.hct * 20); j++) s += S.daire(x + 17 + (j % 7) * (w - 37) / 6, y + 41 + Math.floor(j / 7) * 13, 3, { dolgu: 'crit', renk: 'crit' });
      s += S.t(x + w / 2, y + 84, ['Direnç ∝', 'viskozite'], { a: 'middle', c: 'k' });
      s += S.kutu(x + 10, y + 120, (w - 20) * D74_vis(p.hct) / 6, 9, { dolgu: color, renk: color, r: 2 });
      s += S.t(X(0.69), Y(0.55), ['Eşik: > ' + D74_esik(p).toFixed(2).replace('.', ','), 'Polisitemi →'], { a: 'end', c: 'k', renk: 'warn' });
      return s;
    },
    okuma: p => '<b>Hematokrit ' + p.hct.toFixed(2).replace('.', ',') + '.</b> ' + (p.hct > D74_esik(p) ? 'Polisitemi: viskozite ve akım direnci artar, venöz akım yavaşlar, kalbin işi artar.' : 'Polisitemi eşiği aşılmadı.') + ' Direnç ∝ viskozite (Hagen–Poiseuille; diğer etkenler sabit). Primer polisitemide (PRV) yavaş venöz akıma hiperkoagülabilite ve bazı hastalarda trombositoz eklenir; ven ve arter trombozu riski artar. Sekonder polisitemide viskozite artar ama tromboz riski artmış görünmez. [[K1 s. 358]]'
  });

  const D74_prv = [
    ['Tromboz', "PRV'de perioperatif arter ve ven trombozu riski artar: inme, pulmoner emboli, miyokard enfarktüsü, hepatik ve portal ven trombozu. [[K1 s. 359]]"],
    ['Kanama', 'Paradoks olarak trombosit işlevi çoğu kez bozuktur ve kanama riski de yüksektir. [[K1 s. 359]]'],
    ['Elektif', 'Elektif cerrahiden önce Hb flebotomi ya da hidroksiüre gibi ilaçlarla normal düzeye indirilir. [[K1 s. 359]]'],
    ['Acil', 'Acil cerrahiden önce venöz kan alınır; alınan tam kan aynı hacimde kristaloidle yerine konur. [[K1 s. 359]]'],
    ['Nöraksiyel blok', 'Koagülasyon ve trombosit işlevi bozuk olabileceği için nöraksiyel blok göreceli kontrendikedir. [[K1 s. 359]]']
  ];
  D74_VIZ.f74_prv = el => SEKIL.adim(el, {
    baslik: 'PRV riskleri ve cerrahi hazırlık', vb: [640, 470], vbDar: [360, 710], hareket: true, oto: false,
    adimlar: D74_prv.map(([ad, metin]) => ({ ad, metin })),
    ortak: (S, i, t) => {
      const cx = S.dar ? 120 : 110, top = S.dar ? 300 : 40, x = S.dar ? 25 : 265, w = S.dar ? 310 : 350;
      const u = D74_RM ? 1 : S.clamp(t / (i === 3 ? 1 : 3), 0, 1), h = i === 2 || i === 3 ? S.lerp(160, 90, u) : 160;
      let s = S.daire(cx, 53, 23, { dolgu: 'basic-soft', renk: 'basic' });
      s += S.kutu(cx - 36, 86, 72, 100, { dolgu: 'basic-soft' });
      s += S.cizgi([[cx - 20, 188], [cx - 20, 246]], { renk: 'basic', w: 15 }) + S.cizgi([[cx + 20, 188], [cx + 20, 246]], { renk: 'basic', w: 15 });
      s += S.t(cx, 275, 'PRV', { a: 'middle', c: 'b' });
      const bx = cx + 75;
      s += S.kutu(bx, 62, 25, 170) + S.kutu(bx + 2, 230 - h, 21, h, { dolgu: h < 95 ? 'ok' : 'crit', renk: 'line', r: 2 });
      s += S.t(bx + 12, 38, 'Hct', { a: 'middle', c: 'k b' });
      s += S.t(bx + 12, 257, h < 95 ? 'Normal' : 'Yüksek', { a: 'middle', c: 'k' });
      if (i === 0) {
        s += S.t(x + w / 2, top, 'Arter + ven trombozu', { a: 'middle', c: 'b' });
        const labels = ['İnme', 'Pulmoner emboli', 'Miyokard enfarktüsü', ['Hepatik / portal', 'ven trombozu']];
        s += S.cizgi([[x + 12, top + 28], [x + 12, top + 290]], { renk: 'crit', w: 4 });
        labels.forEach((l, j) => {
          s += S.daire(x + 12, top + 45 + j * 76, 6, { dolgu: 'crit', renk: 'crit' });
          s += S.cizgi([[x + 12, top + 45 + j * 76], [x + 35, top + 45 + j * 76]], { renk: 'crit' });
          s += D74_kutu(S, x + 35, top + 18 + j * 76, w - 35, 56, l, 'crit');
        });
      } else if (i === 1) {
        for (let j = 0; j < 5; j++) {
          s += S.daire(x + 45 + j * 46, top + 45, 14, { dolgu: 'line', renk: 'muted' });
          s += S.cizgi([[x + 35 + j * 46, top + 35], [x + 55 + j * 46, top + 55]], { renk: 'crit' });
        }
        s += D74_kutu(S, x, top + 100, w, 95, ['Trombosit işlevi bozuk', 'Paradoks: kanama riski ↑'], 'warn');
        s += S.cizgi([[x + w / 2, top + 220], [x + w / 2 - 14, top + 250], [x + w / 2, top + 265], [x + w / 2 + 14, top + 250], [x + w / 2, top + 220]], { dolgu: 'crit', renk: 'crit' });
      } else if (i === 2) {
        s += D74_kutu(S, x, top + 20, w, 110, ['Elektif cerrahi öncesi', 'Flebotomi ya da hidroksiüre', 'Hb normal düzeye indirilir'], 'ok');
        s += D74_kutu(S, x, top + 175, w, 80, ['Hct normale inse de', 'koagülasyon riski sürebilir'], 'warn');
      } else if (i === 3) {
        s += D74_kutu(S, x, top, w, 65, ['Venöz kan alma', 'Tam kan dışarı'], 'crit');
        s += D74_akis(S, [[x + w / 2, top + 127], [x + w / 2, top + 67]], t, 5, 'crit');
        s += D74_kutu(S, x, top + 130, w, 50, 'Hasta / damar içi', 'accent');
        s += D74_akis(S, [[x + w / 2, top + 243], [x + w / 2, top + 183]], t, 5, 'basic');
        s += D74_kutu(S, x, top + 246, w, 65, ['Aynı hacim kristaloid', 'Hastaya verilir'], 'basic');
        s += S.cizgi([[x + 15, top + 340], [x + w - 15, top + 340]], { renk: 'ok', w: 4 });
        s += S.t(x + w / 2, top + 368, 'Yerine konan hacim = alınan hacim', { a: 'middle', c: 'k' });
      } else {
        for (let j = 0; j < 6; j++) s += S.kutu(x + w / 2 - 18, top + j * 25, 36, 19, { dolgu: 'basic-soft', renk: 'basic' });
        s += D74_kutu(S, x, top + 180, w, 105, ['Nöraksiyel blok', 'Göreceli kontrendike', 'Koagülasyon + trombosit işlevi'], 'warn');
      }
      return s;
    }
  });
})();
