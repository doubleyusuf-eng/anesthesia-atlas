(function () {
  'use strict';
  const VIZ = window.VIZ;
  const orta = { a: 'middle', c: 'b' };
  const kucuk = { a: 'middle', c: 'k' };
  const fmt = (v) => v.toLocaleString('tr-TR', { maximumFractionDigits: 3 });
  const sec = (id, ad, list) => ({ id, ad, liste: list.map(([d, l]) => ({ d, ad: l })) });

  // 1) Geleneksel akım (I), elektron akışı ve alternatif akım (AC)
  VIZ.fk18_akim = (el) => SEKIL.sahne(el, {
    baslik: 'Geleneksel akım yönü, elektron akışı ve alternatif akım',
    vb: [640, 260], vbDar: [360, 280], hareket: true,
    secenek: sec('kip', 'Akım kipi', [
      ['geleneksel', 'Geleneksel DC (I)'],
      ['elektron', 'Elektron akışı (DC)'],
      ['ac', 'Alternatif akım (AC)'],
    ]),
    ciz(S, t, { kip }) {
      const x1 = S.dar ? 70 : 96, x2 = S.w - (S.dar ? 70 : 96), ym = 128;
      const yuk = S.dar ? 66 : 74;
      const pilX = x1 - 36, dirX = x2 + 36;
      const bat = S.kutu(pilX - 24, ym - 34, 48, 68, { renk: kip === 'ac' ? 'basic' : 'accent', dolgu: kip === 'ac' ? 'basic-soft' : 'accent-soft', yazi: kip === 'ac' ? 'AC' : ['+', 'Pil', '−'] });
      const load = S.kutu(dirX - 24, ym - 34, 48, 68, { renk: 'line', dolgu: 'paper', yazi: 'R' });
      const ust = [[pilX, ym - 34], [pilX, yuk], [dirX, yuk], [dirX, ym - 34]];
      const alt = [[dirX, ym + 34], [dirX, ym + 68], [pilX, ym + 68], [pilX, ym + 34]];
      let s = S.cizgi(ust, { renk: 'line', w: 3 }) + S.cizgi(alt, { renk: 'line', w: 3 }) + bat + load;

      const cx = S.w / 2;
      if (kip === 'geleneksel') {
        s += S.akis(ust, t, { renk: 'accent', n: 5, hiz: 0.32 })
          + S.akis(alt, t, { renk: 'accent', n: 5, hiz: 0.32 })
          + S.ok([[cx - 42, yuk - 16], [cx + 42, yuk - 16]], { renk: 'accent', w: 2.5 })
          + S.t(cx, yuk - 24, 'Geleneksel akım (I): + → −', { ...kucuk, renk: 'accent' })
          + S.t(cx, ym + 104, '1 A = 1 C yük / 1 s', kucuk);
      } else if (kip === 'elektron') {
        s += S.akis(ust, t, { renk: 'clin', n: 5, hiz: 0.32, ters: true })
          + S.akis(alt, t, { renk: 'clin', n: 5, hiz: 0.32, ters: true })
          + S.ok([[cx + 42, yuk - 16], [cx - 42, yuk - 16]], { renk: 'clin', w: 2.5 })
          + S.t(cx, yuk - 24, 'Elektron akışı (e⁻): − → +', { ...kucuk, renk: 'clin' })
          + S.t(cx, ym + 104, 'e⁻ yükü = −1,602 × 10⁻¹⁹ C', kucuk);
      } else {
        const faz = Math.sin(t * 2.4);
        const ters = Math.cos(t * 2.4) < 0;
        const okX1 = cx - 42, okX2 = cx + 42;
        s += S.akis(ust, 1 + faz, { renk: 'basic', n: 5, hiz: 0.15 })
          + S.akis(alt, 1 + faz, { renk: 'basic', n: 5, hiz: 0.15 })
          + S.ok(ters ? [[okX2, yuk - 16], [okX1, yuk - 16]] : [[okX1, yuk - 16], [okX2, yuk - 16]], { renk: 'basic', w: 2.5 })
          + S.t(S.w / 2, yuk - 24, 'Yön düzenli olarak değişir (AC)', { ...kucuk, renk: 'basic' })
          + S.t(S.w / 2, ym + 104, 'Örnek: şebeke elektriği', kucuk);
      }
      return s;
    },
    metin: ({ kip }) => ({
      geleneksel: 'Devre şemalarında I oku, uzlaşımla pozitif uçtan negatif uca doğru gösterilir. [[K6 s. 303]]',
      elektron: 'Metallerde negatif yüklü elektronlar dış devrede pilin negatif ucundan pozitif ucuna akar. [[K6 s. 303]]',
      ac: 'Alternatif akımda yük akışı yönünü belirli aralıklarla iki yöne doğru değiştirir. [[K6 s. 303–304]]',
    })[kip],
  });

  // 2) Ohm yasası: V, I, R ilişkisi (çözümlü örnek 6 V / 240 Ω = 25 mA varsayılan)
  VIZ.fk18_ohm = (el) => SEKIL.grafik(el, {
    baslik: 'Ohm yasası: potansiyel fark ve direnç değiştikçe akım',
    vb: [640, 310], vbDar: [380, 310],
    x: { min: 0, max: 24, ad: 'Potansiyel fark V (V)', adimlar: [0, 6, 12, 18, 24] },
    y: { min: 0, max: 200, ad: 'Akım I (mA)', adimlar: [0, 50, 100, 150, 200] },
    param: [
      { id: 'v', ad: 'Gerilim V', min: 1, max: 24, adim: 1, deger: 6, birim: 'V' },
      { id: 'r', ad: 'Direnç R', min: 120, max: 480, adim: 120, deger: 240, birim: 'Ω' },
    ],
    egriler: [{ f: (x, p) => (x / p.r) * 1000, renk: 'accent' }],
    noktalar: ({ v, r }) => [{ x: v, y: (v / r) * 1000 }],
    dikey: ({ v }) => [{ x: v }],
    yatay: ({ v, r }) => [{ y: (v / r) * 1000 }],
    okuma: ({ v, r }) => {
      const iMa = (v / r) * 1000;
      return `<i>V</i> = ${v} V, <i>R</i> = ${r} Ω için <i>I</i> = <b>${iMa.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} mA</b> (${(v / r).toLocaleString('tr-TR', { maximumFractionDigits: 4 })} A). [[K6 s. 305]] Örnek hesap: 6 V ve 240 Ω için 25 mA. [[K6 s. 305–306]]`;
    },
  });

  // 3) Enerji bantları ve yarı iletken sıcaklıkla iletimi
  VIZ.fk18_bant = (el) => SEKIL.sahne(el, {
    baslik: 'İletken, yalıtkan ve yarı iletkende enerji bantları',
    vb: [640, 270], vbDar: [360, 280],
    secenek: sec('kip', 'Malzeme', [
      ['iletken', 'İletken (metal)'],
      ['yalitkan', 'Yalıtkan'],
      ['saf', 'Saf yarı iletken'],
      ['katkili', 'Katkılı yarı iletken'],
    ]),
    ciz(S, t, { kip }) {
      const x = S.w / 2;
      if (kip === 'iletken' || kip === 'yalitkan') {
        const serbest = kip === 'iletken';
        let svg = '';
        for (const dx of [-80, 0, 80]) {
          svg += S.daire(x + dx, 124, 24, { renk: 'basic', dolgu: 'basic-soft' })
            + S.t(x + dx, 130, '+', orta)
            + S.daire(x + dx + 23, serbest ? 70 : 113, 8, { renk: 'accent', dolgu: 'accent' });
        }
        if (serbest) svg += S.ok([[x - 94, 52], [x + 95, 52]], { renk: 'accent' });
        return svg + S.t(x, 196, serbest ? 'Elektronlar örgüde hareket edebilir' : 'Elektronlar atomlara sıkı bağlı', orta);
      }
      const katkili = kip === 'katkili';
      let svg = S.kutu(x - 130, 36, 260, 38, { yazi: 'İletim bandı', renk: 'accent', dolgu: 'accent-soft' })
        + S.kutu(x - 130, 192, 260, 38, { yazi: 'Değerlik bandı', renk: 'basic', dolgu: 'basic-soft' });
      if (katkili) svg += S.cizgi([[x - 125, 132], [x + 125, 132]], { renk: 'clin', kesik: true })
        + S.t(x, 122, 'Katkıyla erişilen düzey', orta);
      return svg + S.ok([[x - 60, 184], [x - 60, katkili ? 139 : 81]], { renk: 'accent' })
        + S.t(x + 32, 166, 'Enerji alır', kucuk);
    },
    metin: ({ kip }) => ({
      iletken: 'Metalde serbest elektronlar yük taşır. [[K6 s. 303]] Isınmayla artan atom titreşimleri elektronların hareketini zorlaştırır. [[K6 s. 308]]',
      yalitkan: 'Yalıtkanda sıkı bağlı elektronlar hareket ederek akıma katılamaz. [[K6 s. 306]]',
      saf: 'Saf silisyumda yüksek enerjili iletim bandına ulaşmak için elektronun enerji alması gerekir. [[K6 s. 307–308]]',
      katkili: 'Katkılama daha düşük enerjide erişilebilen iletim düzeyleri sağlar. [[K6 s. 308]]',
    })[kip],
  });

  // 4) Kirchhoff yasaları
  VIZ.fk18_kirchhoff = (el) => SEKIL.sahne(el, {
    baslik: 'Kirchhoff akım (1. yasa) ve gerilim (2. yasa) kuralları',
    vb: [640, 260], vbDar: [360, 270],
    secenek: sec('yasa', 'Yasa', [
      ['birinci', '1. Yasa (Düğüm · Akım)'],
      ['ikinci', '2. Yasa (Çevre · Gerilim)'],
    ]),
    ciz(S, t, { yasa }) {
      const cx = S.w / 2, cy = 128;
      if (yasa === 'birinci') {
        const r = S.dar ? 120 : 170;
        let s = S.daire(cx, cy, 18, { renk: 'accent', dolgu: 'accent-soft' }) + S.t(cx, cy + 5, '•', { a: 'middle', c: 'b k' });
        s += S.ok([[cx - r, cy - 52], [cx - 22, cy - 12]], { renk: 'accent', w: 2.5 })
          + S.ok([[cx - r, cy + 2], [cx - 24, cy + 2]], { renk: 'accent', w: 2.5 })
          + S.ok([[cx - r, cy + 56], [cx - 22, cy + 14]], { renk: 'accent', w: 2.5 })
          + S.ok([[cx + 22, cy - 12], [cx + r, cy - 44]], { renk: 'clin', w: 2.5 })
          + S.ok([[cx + 22, cy + 12], [cx + r, cy + 44]], { renk: 'clin', w: 2.5 });
        s += S.t(cx - r + 4, cy - 62, `+I₁`, { c: 'b k', renk: 'accent' })
          + S.t(cx - r + 4, cy - 10, `+I₂`, { c: 'b k', renk: 'accent' })
          + S.t(cx - r + 4, cy + 74, `+I₃`, { c: 'b k', renk: 'accent' })
          + S.t(cx + r - 4, cy - 54, `−I₄`, { a: 'end', c: 'b k', renk: 'clin' })
          + S.t(cx + r - 4, cy + 62, `−I₅`, { a: 'end', c: 'b k', renk: 'clin' })
          + S.t(cx, 238, `I₁ + I₂ + I₃ − I₄ − I₅ = 0`, orta);
        return s;
      }
      const x1 = S.dar ? 56 : 110, x2 = S.w - (S.dar ? 56 : 110), y1 = 56, y2 = 188;
      return S.cizgi([[x1, y1], [x2, y1], [x2, y2], [x1, y2], [x1, y1]], { renk: 'line', w: 2.5 })
        + S.kutu(x1 - 28, (y1 + y2) / 2 - 26, 56, 52, { renk: 'ok', dolgu: 'ok-soft', yazi: `+V` })
        + S.kutu(cx - 88, y1 - 20, 74, 40, { renk: 'warn', dolgu: 'warn-soft', yazi: `−V₁` })
        + S.kutu(cx + 14, y1 - 20, 74, 40, { renk: 'warn', dolgu: 'warn-soft', yazi: `−V₂` })
        + S.t(x1 - 12, y1 + 4, 'A', { a: 'end', c: 'b' })
        + S.t(x1 - 12, y2 + 4, 'D', { a: 'end', c: 'b' })
        + S.t(cx, 232, `+V − V₁ − V₂ = 0`, orta);
    },
    metin: ({ yasa }) => yasa === 'birinci'
      ? 'Kirchhoff’un 1. yasası: bir düğüme giren akımların toplamı çıkan akımların toplamına eşittir (cebirsel toplam = 0). [[K6 s. 308–309]]'
      : 'Kirchhoff’un 2. yasası: kapalı bir devrede pilin gerilim kazancı dirençlerdeki gerilim düşüşlerinin toplamına eşittir (∑V = 0). [[K6 s. 309–310]]',
  });

  // 5) Güç P = I²R ve enerji E = P·t
  VIZ.fk18_guc = (el) => SEKIL.grafik(el, {
    baslik: 'Elektriksel güç ve harcanan enerji (P = I²·R)',
    vb: [640, 300], vbDar: [380, 300],
    x: { min: 0, max: 50, ad: 'Akım (mA)', adimlar: [0, 25, 50] },
    y: { min: 0, max: 600, ad: 'Güç (mW)', adimlar: [0, 150, 300, 600] },
    param: [
      { id: 'i', ad: 'Akım', min: 0, max: 50, adim: 1, deger: 25, birim: 'mA' },
      { id: 'r', ad: 'Direnç', min: 120, max: 240, adim: 120, deger: 240, birim: 'Ω' },
    ],
    egriler: [{ f: (x, p) => x ** 2 * p.r / 1000, renk: 'clin' }],
    noktalar: ({ i, r }) => [{ x: i, y: i ** 2 * r / 1000 }],
    okuma: ({ i, r }) => {
      const guc = (i / 1000) ** 2 * r;
      return `Dirençteki gerilim ${fmt(i * r / 1000)} V, harcanan güç ${guc.toLocaleString('tr-TR', { maximumSignificantDigits: 4 })} W ve bir saatte aktarılan enerji ${fmt(guc * 3600)} J olur. [[K6 s. 310–311]]`;
    },
  });

  // 6) Seri ve paralel dirençler
  VIZ.fk18_direnc = (el) => SEKIL.sahne(el, {
    baslik: 'Seri ve paralel dirençler',
    vb: [640, 260], vbDar: [360, 280],
    secenek: sec('kip', 'Devre', [
      ['seri', 'Seri bağlama'],
      ['paralel', 'Paralel bağlama'],
    ]),
    param: [
      { id: 'r1', ad: 'R₁', min: 120, max: 480, adim: 120, deger: 240, birim: 'Ω' },
      { id: 'r2', ad: 'R₂', min: 120, max: 480, adim: 120, deger: 240, birim: 'Ω' },
    ],
    ciz(S, t, { kip, r1, r2 }) {
      const cx = S.w / 2;
      if (kip === 'seri') {
        const rt = r1 + r2;
        return S.cizgi([[48, 108], [S.w - 48, 108]], { renk: 'line', w: 2.5 })
          + S.kutu(cx - 110, 84, 92, 48, { renk: 'basic', dolgu: 'basic-soft', yazi: `R₁ ${r1} Ω` })
          + S.kutu(cx + 18, 84, 92, 48, { renk: 'basic', dolgu: 'basic-soft', yazi: `R₂ ${r2} Ω` })
          + S.t(cx, 178, `Rₜ = R₁ + R₂ = ${rt} Ω`, orta);
      }
      const rt = (r1 * r2) / (r1 + r2);
      const x1 = S.dar ? 72 : 140, x2 = S.w - x1;
      return S.cizgi([[x1 - 36, 114], [x1, 114], [x1, 68], [x2, 68], [x2, 114], [x2 + 36, 114]], { renk: 'line', w: 2.5 })
        + S.cizgi([[x1, 114], [x1, 160], [x2, 160], [x2, 114]], { renk: 'line', w: 2.5 })
        + S.kutu(cx - 56, 46, 112, 44, { renk: 'basic', dolgu: 'basic-soft', yazi: `R₁ ${r1} Ω` })
        + S.kutu(cx - 56, 138, 112, 44, { renk: 'basic', dolgu: 'basic-soft', yazi: `R₂ ${r2} Ω` })
        + S.t(cx, 224, `Rₜ = ${fmt(rt)} Ω`, orta);
    },
    metin: ({ kip, r1, r2 }) => {
      if (kip === 'seri') return `Seride aynı akım her dirençten geçer ve toplam direnç (${r1 + r2} Ω) her zaman en büyük dirençten büyüktür. [[K6 s. 311]]`;
      return `Paralelde toplam direnç (${((r1 * r2) / (r1 + r2)).toLocaleString('tr-TR', { maximumFractionDigits: 1 })} Ω) her zaman en küçük dirençten bile küçüktür. [[K6 s. 311]]`;
    },
  });

  // K6'nın 6 V ve 240 Ω örneğinden türetilen bölücü.
  const besleme = 6, direnc = 240;
  const bol = (ust, alt) => besleme * alt / (ust + alt);
  function yukluCikis(kip, rl) {
    const alt = kip === 'acik' ? direnc : direnc * rl / (direnc + rl);
    return bol(direnc, alt);
  }

  VIZ.fk18_bolucu = (el) => SEKIL.sahne(el, {
    baslik: 'Ölçü aletinin bölücü çıkışına etkisi', vb: [640, 280], vbDar: [360, 280],
    secenek: sec('kip', 'Ölçü aleti', [['bagli', 'Ölçer bağlı'], ['acik', 'Açık çıkış']]),
    param: [{ id: 'rl', ad: 'Ölçerin direnci', min: 240, max: 2400, adim: 240, deger: 240, birim: 'Ω' }],
    ciz(S, t, { kip, rl }) {
      const x = S.w / 2 - 54, sag = x + 148;
      let svg = S.cizgi([[x, 32], [x, 222]], { w: 3 })
        + S.cizgi([[x, 118], [sag, 118]], { renk: 'accent' })
        + S.kutu(x - 52, 48, 104, 45, { yazi: 'R₁ 240 Ω', dolgu: 'basic-soft' })
        + S.kutu(x - 52, 146, 104, 45, { yazi: 'R₂ 240 Ω', dolgu: 'basic-soft' })
        + S.t(x, 24, '6 V', orta) + S.t(x, 248, '0 V', orta)
        + S.t(x + 22, 110, 'B', orta);
      if (kip === 'bagli') svg += S.cizgi([[sag, 118], [sag, 222], [x, 222]], { renk: 'accent' })
        + S.kutu(sag - 52, 146, 104, 45, { yazi: 'Ölçer', dolgu: 'accent-soft' });
      return svg + S.t(sag, 98, fmt(yukluCikis(kip, rl)) + ' V', orta);
    },
    metin: ({ kip, rl }) => kip === 'acik'
      ? 'Ölçer ayrıyken iki eşit direnç kaynak gerilimini eşit paylaşır ve B noktasında 3 V okunur. [[K6 s. 311–312]]'
      : `Ölçerin ${rl} Ω direnci R₂’ye paralel bağlanınca çıkış 3 V’tan ${fmt(yukluCikis(kip, rl))} V’a iner. [[K6 s. 311–312]]`,
  });

  VIZ.fk18_wheatstone = (el) => SEKIL.sahne(el, {
    baslik: 'Wheatstone köprüsünde sıfır yöntemi', vb: [640, 308], vbDar: [360, 308],
    param: [
      { id: 'rtr', ad: 'Transdüser direnci', min: 120, max: 480, adim: 2, deger: 240, birim: 'Ω' },
      { id: 'rvar', ad: 'Potansiyometre', min: 60, max: 240, adim: 1, deger: 119, birim: 'Ω' },
    ],
    ciz(S, t, { rtr, rvar }) {
      const cx = S.w / 2, sol = cx - 96, sag = cx + 96;
      const renk = rtr === 2 * rvar ? 'ok' : 'warn';
      const tel = (pts) => S.cizgi(pts, { renk: 'ink', w: 2 });
      const parca = (x, y, ad, deger, dolgu) => S.kutu(x - 60, y, 120, 53,
        { yazi: [ad, deger + ' Ω'], dolgu });
      return tel([[sol, 137], [sol, 38], [sag, 38], [sag, 247], [sol, 247], [sol, 137]])
        + tel([[sol, 137], [sag, 137]]) + tel([[cx, 28], [cx, 38]]) + tel([[cx, 247], [cx, 258]])
        + S.t(cx, 22, '+6 V (DC)', orta) + S.t(cx, 279, '0 V', orta)
        + parca(sol, 64, 'R₁', 120, 'basic-soft') + parca(sag, 64, 'R₂', 240, 'basic-soft')
        + parca(sol, 167, 'Potansiyometre', rvar, 'accent-soft')
        + parca(sag, 167, 'Transdüser', rtr, 'clin-soft')
        + S.rozet(cx, 137, fmt(bol(120, rvar) - bol(240, rtr)) + ' V', { w: 98, renk })
        + S.t(sol - 15, 144, 'A', orta) + S.t(sag + 15, 144, 'B', orta);
    },
    metin: ({ rtr, rvar }) => {
      const va = bol(120, rvar), vb = bol(240, rtr);
      return `A noktasında ${fmt(va)} V, B noktasında ${fmt(vb)} V bulunur. [[K6 s. 312–313]] ` +
        (rtr === 2 * rvar
          ? `A–B arasında akım yoktur ve bilinmeyen direnç 2 × ${rvar} Ω = ${rtr} Ω olarak okunur. [[K6 s. 313–314]]`
          : 'İki okuma eşitlenene kadar potansiyometreyi ayarlayın. [[K6 s. 313]]');
    },
  });
})();
