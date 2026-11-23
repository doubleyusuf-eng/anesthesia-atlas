/* Bölüm 79 · Stres yanıtı — nitel, etkileşimli SEKIL modelleri. */
(function () {
  'use strict';
  const D79_VIZ = window.VIZ;
  const D79_RM = window.VIZ_YARDIM.RM;
  const D79_agirlik = ['', 'Hafif', 'Orta', 'Ağır'];
  function D79_satir(text, limit) {
    return String(text).split('\n').flatMap(line => {
      const out = []; let row = '';
      line.split(' ').forEach(word => {
        if (row && (row + ' ' + word).length > limit) { out.push(row); row = word; }
        else row += (row ? ' ' : '') + word;
      });
      out.push(row); return out;
    });
  }
  function D79_kart(S, x, y, w, text, renk = 'accent', h) {
    const lines = D79_satir(text, Math.floor((w - 22) / (S.dar ? 8.1 : 7.5)));
    const height = h || Math.max(42, lines.length * 19 + 20);
    return { h: height, s: S.kutu(x, y, w, height, { renk, dolgu: renk + '-soft' }) + S.t(x + w / 2, y + height / 2 + 5 - (lines.length - 1) * 9.5, lines, { a: 'middle', lh: 19 }) };
  }
  function D79_yol(S, pts, t, renk, active = true, n = 4) {
    return S.ok(pts, { renk, soluk: !active }) + (active ? S.akis(pts, t, { renk, n, hiz: 0.22 }) : '');
  }
  function D79_adim(el, cfg) {
    const clean = SEKIL.adim(el, cfg);
    if (D79_RM) el.querySelector('[data-i="' + (cfg.adimlar.length - 1) + '"]').click();
    return clean;
  }

  D79_VIZ.f79_tetik = el => D79_adim(el, {
    baslik: 'Yaralanmadan hipotalamusa sinirsel ve sitokin yolları',
    vb: [640, 540], vbDar: [360, 600], hareket: true,
    adimlar: [
      ['Stresör', 'Travma, yanık, cerrahi ve kritik hastalık stres yanıtını başlatır. Yanıtın büyüklüğü stresörün büyüklüğüyle ilişkilidir.'],
      ['Sinirsel yol', 'Otonom ve duysal afferentler yaralanma bölgesinden hipotalamusa uyarı taşır.'],
      ['Yerel inflamasyon', 'Sitokin salınımı, kompleman etkinleşmesi, lökosit çekilmesi, trombosit etkinleşmesi ve pıhtılaşma kaskadı yerel yanıtı oluşturur.'],
      ['Sitokin taşması', 'IL-6, interferonlar ve TNF sistemik dolaşıma taşarak hipotalamusu uyarır.'],
      ['Yanıt başlar', 'Hipotalamus sempatik sistemi ve hipofizi etkinleştirir; metabolik, bağışıklık ve hematolojik yanıtlar oluşur.']
    ].map(([ad, metin], i) => ({ ad, metin: metin + ' [[K1 s. 387]]', ciz: (S, t) => {
      const cx = S.w / 2, bottom = S.dar ? 340 : 280;
      const left = cx - 125, right = cx + 125;
      let s = D79_kart(S, cx - 95, 20, 190, 'Hipotalamus', 'accent', 44).s;
      const nerve = [[left, bottom], [left, 86], [cx - 65, 64]];
      const blood = [[right, bottom], [right, 86], [cx + 65, 64]];
      s += S.cizgi(blood, { renk: 'crit-soft', w: 16 });
      s += D79_yol(S, nerve, t, 'basic', i === 1 || i === 4);
      s += D79_yol(S, blood, t, 'crit', i === 3 || i === 4);
      if (i !== 4) s += S.t(left + 12, 113, ['Otonom ve', 'duysal', 'afferentler'], { lh: 19 });
      s += S.t(right - 12, 195, ['Sistemik', 'dolaşım', 'IL-6 · TNF', 'İnterferonlar'], { a: 'end', lh: 19 });
      const labels = i === 2 ? ['Yaralanma bölgesi', 'Sitokin salınımı', 'Kompleman etkinleşmesi', 'Lökosit çekilmesi', 'Trombosit etkinleşmesi', 'Pıhtılaşma kaskadı'] : ['Yaralanma bölgesi', 'Travma · Yanık', 'Cerrahi · Kritik hastalık'];
      s += D79_kart(S, cx - 155, bottom, 310, labels.join('\n'), 'crit', i === 2 ? 154 : 90).s;
      if (i !== 2) s += S.cizgi([[cx - 136, bottom + 12], [cx - 143, bottom + 24], [cx - 133, bottom + 33]], { renk: 'crit', kesik: true });
      if (i === 0) s += S.t(cx, bottom + 120, ['Küçük stresör → küçük yanıt', 'Büyük stresör → büyük yanıt'], { a: 'middle', lh: 21 });
      if (i === 4) {
        s += D79_kart(S, cx - 105, 91, 210, 'Sempatik çıkış ↑\nHipofiz hormonları', 'warn', 62).s;
        s += S.ok([[cx, 64], [cx, 91]], { renk: 'accent' });
        s += S.t(cx, bottom + 120, ['Metabolik · Bağışıklık', 'Hematolojik yanıt'], { a: 'middle', lh: 21 });
      }
      return s;
    } }))
  });

  function D79_eksenCiz(S, t, step) {
    const w = S.dar ? 316 : 284, x1 = 22, x2 = S.dar ? 22 : 334;
    let s = D79_kart(S, S.w / 2 - 100, 12, 200, 'Hipotalamus', 'accent', 44).s;
    function column(x, y, title, rows, renk, active) {
      let g = D79_kart(S, x, y, w, title, renk, 42).s;
      const path = S.dar ? [[12, 56], [12, y + 21], [x, y + 21]] : [ [S.w / 2, 56], [S.w / 2, 66], [x + w / 2, 66], [x + w / 2, y]];
      g += D79_yol(S, path, t, renk, active);
      y += 62;
      rows.forEach(text => {
        const box = D79_kart(S, x + 20, y, w - 20, text, renk);
        g += D79_yol(S, [[x + 8, y - 20], [x + 8, y + box.h / 2], [x + 20, y + box.h / 2]], t, renk, active, 2);
        g += box.s; y += box.h + 16;
      });
      return g;
    }
    s += column(x1, 80, 'Sempatik sistem ↑', [
      'Adrenal medulla\nAdrenalin ↑ (sistemik)',
      'Sempatik sinir uçları\nNoradrenalinin bir kısmı dolaşıma taşar',
      'Böbrek: renin ↑\n→ Anjiyotensin II\n→ Adrenal korteks\n→ Aldosteron ↑',
      'Pankreas (Langerhans)\nα: glukagon ↑\nβ: insülin ↓'
    ], 'warn', step !== 1);
    s += column(x2, S.dar ? 550 : 80, 'Hipofiz', [
      'ACTH → Adrenal korteks\n→ Kortizol ↑\nStres hormonu',
      'GH ↑',
      'ADH ↑ → Toplayıcı kanal\nSu geri emilimi ↑',
      'Öteki hipofiz hormonları: değişmez (kitaba göre)'
    ], 'accent', step !== 0);
    const y = S.dar ? 1000 : 560;
    if (step === 2) {
      s += D79_kart(S, S.w / 2 - 150, y, 300, 'Aldosteron + kortizol\nMineralokortikoid etki\n↓\nBöbrek: Na⁺ ve su\ngeri emilimi ↑', 'basic').s;
      s += S.ok([ [S.w / 2, y - 25], [S.w / 2, y]], { renk: 'basic', w: 3 });
    }
    return s;
  }
  D79_VIZ.f79_eksen = el => D79_adim(el, {
    baslik: 'Sempatik ve hipofiz kollarının hormonları', vb: [640, 700], vbDar: [360, 1140], hareket: true,
    adimlar: [
      ['Sempatik kol', 'Adrenalin, noradrenalin taşması, renin–anjiyotensin–aldosteron ve glukagon artar; insülin azalır.'],
      ['Hipofiz kolu', 'ACTH kortizolü artırır; GH ve ADH artar. ADH toplayıcı kanalda su geri emilimini artırır.'],
      ['Böbrekte birleşme', 'Aldosteron ve kortizolün mineralokortikoid etkisi Na⁺ ve su geri emilimini artırır.']
    ].map(([ad, metin], i) => ({ ad, metin: metin + ' [[K1 s. 387]]', ciz: (S, t) => D79_eksenCiz(S, t, i) }))
  });

  D79_VIZ.f79_metab = el => {
    const clean = SEKIL.sahne(el, {
      baslik: 'Travma ağırlığı ve zamanın glukoz, protein ve yağ üzerine nitel etkileri',
      vb: [640, 770], vbDar: [360, 930], hareket: true,
      param: [
        { id: 'a', ad: 'Travmanın ağırlığı', min: 1, max: 3, adim: 1, deger: D79_RM ? 3 : 2 },
        { id: 'h', ad: 'Yaralanmadan sonra', min: 0, max: 48, adim: 1, deger: D79_RM ? 24 : 6, birim: 'saat' }
      ],
      ciz: (S, t, p) => {
        const x = 20, w = S.w - 40, cx = S.w / 2;
        let s = D79_kart(S, x, 15, w, 'Karbonhidrat', 'warn', 42).s;
        s += S.t(cx, 82, ['İnsülin ↓ · Glukagon ↑', 'Anti-insülin: katekolamin,', 'kortizol ve daha az GH'], { a: 'middle', lh: 21 });
        const bh = p.h > 0 ? p.a * 18 : 0;
        s += S.kutu(x + 12, 145, 35, 64, { renk: 'warn' });
        if (bh) s += S.kutu(x + 15, 206 - bh, 29, bh, { renk: 'warn', dolgu: 'warn', r: 2 });
        s += S.t(x + 65, 165, ['Plazma glukozu', 'Hiperglisemi ∝ ağırlık', D79_agirlik[p.a] + ' travma'], { lh: 21 });
        s += D79_kart(S, x, 235, w, 'Protein', 'clin', 42).s;
        s += S.t(cx, 300, ['Kortizol: yıkım ve glukoneogenez ↑', 'GH: anabolik etki baskın;', 'kas yıkımını sınırlayabilir'], { a: 'middle', lh: 21 });
        const active = p.h >= 12, shrink = active ? p.a * 6 : 0;
        s += D79_kart(S, x + shrink / 2, 365 + shrink / 2, 100 - shrink, 'Kas', 'clin', 54 - shrink).s;
        s += D79_kart(S, S.w - 132, 365, 112, 'Karaciğer', 'clin', 54).s;
        const path = [[x + 100, 392], [S.w - 132, 392]];
        s += D79_yol(S, path, t * (p.h <= 14 ? 0.35 : 1), 'clin', active, p.a + 1);
        s += S.t(cx, 354, 'Amino asitler', { a: 'middle' });
        const state = p.h === 0 ? 'Yaralanma anı' : p.h < 12 ? 'Protein anabolizması baskılı' : p.h <= 14 ? '12–14 saat: kas yıkımı başlıyor' : 'Kas yıkımı sürüyor';
        s += S.t(cx, 446, state, { a: 'middle' });
        if (active) {
          s += S.ok([ [S.w - 76, 419], [S.w - 76, 470], [cx, 470], [cx, 486]], { renk: 'clin' });
          s += D79_kart(S, x, 486, w, 'Glukoneogenez + akut faz proteinleri\nAtılan azot > alınan azot\nNegatif azot dengesi', 'clin', 88).s;
        }
        const y = S.dar ? 605 : 600;
        s += D79_kart(S, x, y, w, 'Yağ', 'accent', 42).s;
        s += S.t(cx, y + 66, ['Glukagon ↑ · İnsülin ↓', 'Katekolamin, kortizol ve GH ↑'], { a: 'middle', lh: 21 });
        s += D79_kart(S, x, y + 105, 110, 'Yağ dokusu', 'accent', 44).s;
        s += D79_yol(S, [[x + 110, y + 127], [S.w - 130, y + 127]], t, 'accent', p.h > 0, p.a + 1);
        s += D79_kart(S, S.w - 130, y + 100, 110, 'Lipoliz\nKetogenez', 'accent', 54).s;
        return s;
      },
      metin: p => p.h === 0 ? '<b>Yaralanma anı.</b> Saati ilerletin. [[K1 s. 387]]' : '<b>' + D79_agirlik[p.a] + ' travma, ' + p.h + '. saat.</b> ' + (p.h < 12 ? 'Glukoz yükselmiş; protein anabolizması baskılı, kas yıkımı henüz başlamamış.' : p.h <= 14 ? 'Kas yıkımının başladığı geçiş aralığı; amino asit akışı başlar.' : 'Amino asitler glukoneogenez ve akut faz proteinlerine gider. Negatif azot dengesi travma ağırlığıyla büyür.') + ' [[K1 s. 387–388]]'
    });
    const label = () => { el.querySelector('[data-o="a"]').textContent = D79_agirlik[+el.querySelector('[data-k="a"]').value]; };
    el.addEventListener('input', label); label();
    return () => { el.removeEventListener('input', label); clean(); };
  };

  const D79_zararlar = [
    { ad: 'Kardiyovasküler', root: 'Katekolaminler + anjiyotensin II ↑', chain: ['Vazokonstriksiyon, hipertansiyon ve taşikardi', 'Miyokard işi ↑', 'Duyarlı hastada iskemi'] },
    { ad: 'Hiperglisemi', root: 'Glukoz ↑', branches: ['Yara iyileşmesi bozulur; yara enfeksiyonu ↑', 'Kritik hastada: mortalite, hastane enfeksiyonu, renal replasman gereksinimi ve polinöropati ile ilişki'], note: 'Kitaptaki sıkı kontrol: 4,4–6,1 mmol/L; hipoglisemi riski. Güncel hedef olarak kullanmayın; Atlas notuna bakın.' },
    { ad: 'Protein katabolizması', root: 'Negatif azot dengesi\nBüyük cerrahi: kas kaybı günde 0,5 kg’a dek', branches: ['Güçsüzlük → hareketsizlik → venöz tromboembolizm', 'Solunum kası kaybı → solunum yetmezliği', 'Ağır malnütrisyonda kalp kası kaybı → aritmi'], note: 'Kitaba göre önleyen yöntem yok; karbonhidrat yüklemesi ve düşük doz glukoz kaybı azaltabilir.' },
    { ad: 'Elektrolit', root: 'Aldosteron + kortizol\nMineralokortikoid etki', chain: ['Na⁺ ve su tutulumu; K⁺ atılımı ↑', 'Hipokalemi', 'Kas güçsüzlüğü, aritmi, ileus'] },
    { ad: 'Sıvı yüklenmesi', root: 'ADH + mineralokortikoid fazlası + IV sıvı', chain: ['Sıvı yüklenmesi'], branches: ['Duyarlı hastada sol ventrikül yetmezliği', 'Yara açılması ve anastomoz kaçağı'] },
    { ad: 'Tromboembolizm', root: 'Prokoagülan durum', chain: ['Derin ven trombozu (DVT)', 'Pulmoner emboli'] },
    { ad: 'Bağışıklık', root: 'Kortizol', branches: ['Kitaba göre: CD8⁺ T hücresi bölünmesi ↑ → CD4⁺ yardımcı T bölünmesi ↓ → patojenlere açıklık', 'İnflamasyon ↓: kapiller geçirgenlik, prostaglandin sentezi (fosfolipaz inhibisyonu), sitokin salınımı ve lökosit göçü ↓'] }
  ];
  D79_VIZ.f79_zarar = el => {
    const clean = SEKIL.sahne(el, {
      baslik: 'Sistem seçerek stres yanıtının zararlarını inceleyin', vb: [640, 820], vbDar: [360, 1050],
      secenek: { id: 's', ad: 'Sistem', liste: D79_zararlar.map((z, i) => ({ d: String(i), ad: (i + 1) + ' · ' + z.ad })) },
      ciz: (S, t, p) => {
        const cx = S.dar ? 180 : 95, y0 = 10;
        let s = S.daire(cx, y0 + 25, 22, { renk: 'line' });
        s += S.kutu(cx - 35, y0 + 52, 70, 95, { renk: 'line', dolgu: 'paper', r: 20 });
        s += S.cizgi([[cx - 40, 65], [cx - 60, 130]], { renk: 'line', w: 13 });
        s += S.cizgi([[cx + 40, 65], [cx + 60, 130]], { renk: 'line', w: 13 });
        s += S.cizgi([[cx - 17, 150], [cx - 23, 218]], { renk: 'line', w: 18 });
        s += S.cizgi([[cx + 17, 150], [cx + 23, 218]], { renk: 'line', w: 18 });
        const points = [[-16, 83], [17, 119], [-23, 173], [-65, 116], [65, 116], [23, 210], [22, 57]];
        points.forEach(([dx, dy], i) => {
          s += '<g data-f79-system="' + i + '" role="button" tabindex="0" aria-label="' + D79_zararlar[i].ad + '" aria-pressed="' + (p.s === String(i)) + '" style="cursor:pointer">';
          s += S.daire(cx + dx, dy, 17, { renk: 'crit', dolgu: p.s === String(i) ? 'crit-soft' : 'paper' });
          s += S.t(cx + dx, dy + 5, String(i + 1), { a: 'middle', c: 'b' }) + '</g>';
        });
        s += S.t(cx, 250, 'Noktaya dokunun', { a: 'middle' });
        const z = D79_zararlar[+p.s], x = S.dar ? 24 : 200, w = S.dar ? 312 : 416;
        let y = S.dar ? 280 : 16;
        const root = D79_kart(S, x, y, w, z.root, 'crit'); s += root.s; y += root.h;
        (z.chain || []).forEach(text => {
          s += S.ok([[x + w / 2, y], [x + w / 2, y + 22]], { renk: 'crit' }); y += 22;
          const b = D79_kart(S, x, y, w, text, 'crit'); s += b.s; y += b.h;
        });
        if (z.branches) {
          const start = y; y += 24;
          z.branches.forEach(text => {
            const b = D79_kart(S, x + 20, y, w - 20, text, 'crit');
            s += S.ok([[x + 8, start], [x + 8, y + b.h / 2], [x + 20, y + b.h / 2]], { renk: 'crit' });
            s += b.s; y += b.h + 16;
          });
        }
        if (z.note) s += D79_kart(S, x, y + 20, w, z.note, 'warn').s;
        return s;
      },
      metin: p => '<b>' + D79_zararlar[+p.s].ad + '.</b> Oklar neden–sonuç ilişkisini, ayrı dallar paralel sonuçları gösterir. [[K1 s. 388]]'
    });
    const select = event => {
      const target = event.target.closest('[data-f79-system]');
      if (!target || (event.type === 'keydown' && !['Enter', ' '].includes(event.key))) return;
      event.preventDefault();
      const button = el.querySelector('[data-s="' + target.dataset.f79System + '"]');
      button.click(); button.focus();
    };
    el.addEventListener('click', select); el.addEventListener('keydown', select);
    return () => { el.removeEventListener('click', select); el.removeEventListener('keydown', select); clean(); };
  };

  const D79_yontem = [
    ['lomber', 'Nöraksiyel blok (lomber)', 'Ameliyattan önce yapılan nöraksiyel blok afferent girdiyi keser; sitokinleri etkilemez. Ağrı, ileus ve özellikle alt ekstremite cerrahisinde tromboembolizm azalır.'],
    ['yok', 'Yok', 'İki yol da hipotalamusu uyarır.'],
    ['torakal', 'Torakal epidural', 'Lomber otonom sinirler güvenilir biçimde bloke olmaz; kitapta lomber epiduralden daha az etkili olarak anlatılır.'],
    ['opioid', 'Yüksek doz fentanil', 'Hipotalamus–hipofiz–adrenal ekseni baskılanır. Abdominal ve pelvik cerrahide yanıt ortadan kalkabilir; ameliyat sonrası ventilasyon gereksinimi artar.'],
    ['etomidat', 'Etomidat', '11-β-hidroksilaz inhibisyonu kortizol ve aldosteron sentezini azaltır. İndüksiyon dozu 8 saate dek etkilidir; öteki genel anesteziklerin etkisi çok azdır.'],
    ['isitma', 'Ameliyat içi ısıtma', 'Normotermiyi korumak stres yanıtının büyüklüğünü azaltır.'],
    ['lap', 'Laparoskopi', 'Laparoskopi ve diğer minimal invaziv girişimlerde eşdeğer açık cerrahiye göre daha az sitokin salınır.']
  ];
  D79_VIZ.f79_azalt = el => SEKIL.sahne(el, {
    baslik: 'Stres yanıtını azaltan yöntemlerin etki yerleri', vb: [640, 870], vbDar: [360, 970], hareket: true,
    secenek: { id: 'y', ad: 'Yöntem', liste: D79_yontem.map(([d, ad]) => ({ d, ad })) },
    ciz: (S, t, p) => {
      const cx = S.w / 2, left = cx - 125, right = cx + 125;
      let s = D79_kart(S, cx - 120, 15, 240, 'Cerrahi yaralanma', 'crit', 44).s;
      const paths = [[[cx - 80, 59], [left, 90], [left, 215], [cx - 70, 245]], [[cx + 80, 59], [right, 90], [right, 215], [cx + 70, 245]]];
      s += D79_yol(S, paths[0], t, 'basic', p.y !== 'lomber', p.y === 'torakal' ? 1 : 5);
      s += D79_yol(S, paths[1], t, 'crit', true, p.y === 'lap' ? 1 : 5);
      s += S.t(cx, 105, ['Afferent sinir (sol)', 'Sitokinler (sağ)'], { a: 'middle', lh: 22 });
      if (['lomber', 'torakal'].includes(p.y)) {
        s += S.t(left, 161, '✕', { a: 'middle', c: 'b', renk: 'ok' });
        s += S.t(cx, 184, p.y === 'lomber' ? ['Sinirsel girdi bloke', 'Sitokin yolu açık'] : ['Kısmi blok', 'Lomber otonom sinirler', 'güvenilir bloke olmaz'], { a: 'middle', lh: 19 });
      }
      if (p.y === 'lap') s += S.t(cx, 184, ['Daha az sitokin', 'salınımı'], { a: 'middle', lh: 20 });
      s += D79_kart(S, cx - 120, 245, 240, 'Hipotalamus', 'accent', 44).s;
      s += D79_yol(S, [[cx, 289], [cx, 334]], t, 'accent', p.y !== 'opioid');
      if (p.y === 'opioid') s += S.t(cx, 316, '✕ Eksende baskılanma', { a: 'middle', renk: 'ok' });
      s += D79_kart(S, cx - 120, 334, 240, 'Hipofiz → ACTH\n→ Kortizol yolu', 'accent', 64).s;
      s += D79_yol(S, [[cx, 398], [cx, 435]], t, 'accent', p.y !== 'opioid');
      s += D79_kart(S, cx - 150, 435, 300, 'Adrenal korteks\n11-β-hidroksilaz\n' + (p.y === 'etomidat' ? 'Etomidat: sentez inhibisyonu' : 'Steroid sentezi'), p.y === 'etomidat' ? 'ok' : 'accent', 86).s;
      if (p.y === 'etomidat') s += S.t(cx + 128, 480, '✕', { a: 'middle', renk: 'ok', c: 'b' });
      s += D79_yol(S, [[cx, 521], [cx, 553]], t, 'accent', p.y !== 'etomidat' && p.y !== 'opioid');
      s += D79_kart(S, cx - 150, 553, 300, 'Kortizol ve aldosteron sentezi\nAldosteronun uyarısı ayrıca\nrenin–anjiyotensin yolundan gelir', 'accent', 86).s;
      const note = p.y === 'etomidat' ? 'İndüksiyon dozu: 8 saate dek' : p.y === 'opioid' ? 'Ameliyat sonrası ventilasyon\ngereksinimi ↑' : p.y === 'lomber' ? 'Ağrı ↓ · İleus ↓\nTromboembolizm ↓' : p.y === 'isitma' ? 'Normotermi korunur' : p.y === 'torakal' ? 'Lomber bloktan daha az etkili' : p.y === 'lap' ? 'Minimal invaziv cerrahi' : 'İki başlangıç yolu açık';
      s += D79_kart(S, cx - 150, 660, 300, note, p.y === 'opioid' ? 'warn' : 'ok').s;
      // K1 yöntemler arasında sayısal etki büyüklüğü vermediği için sahte oran çizilmez.
      const result = p.y === 'yok' ? 'Stres yanıtı sürer' : p.y === 'etomidat' ? 'Steroid sentezi azalır' : p.y === 'opioid' ? 'Yanıt baskılanır*' : 'Stres yanıtı azalır';
      s += S.t(cx, 790, result, { a: 'middle', c: 'b', renk: 'warn' });
      s += S.t(cx, 818, p.y === 'opioid' ? ['*Yüksek doz; abdominal/pelvik', 'cerrahi bağlamında (kitap)'] : ['Nitel gösterim;', 'yöntemler arası oran verilmez.'], { a: 'middle', lh: 20 });
      return s;
    },
    metin: p => '<b>' + D79_yontem.find(x => x[0] === p.y)[1] + '.</b> ' + D79_yontem.find(x => x[0] === p.y)[2] + ' [[K1 s. 388–389]]'
  });
})();
