/* Bölüm 40 · Kardiyovasküler refleksler · bileşenler (tarif: docs/tasarim/fiz40.md; K1 s. 170–174).
   Bütün şemalar ölçeksizdir; kitaptan gelen sayılar: 80–150 mmHg, MAP < 60 mmHg, ≈ 500 mL (ototransfüzyon ve dolum),
   30 dk / 2 gün / 4–6 gün / 8 hafta ve Tablo 40.1. Eğri biçimleri ve çubuk boyları temsilîdir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (t) => { t = clamp(t, 0, 1); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  const capYaz = (el, h) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(h); };
  const segHtml = (ad, key, opts, cur, cls) => `<div class="seg ${cls || ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const darIzle = (el, cb) => {
    let d = null;
    const f = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < 560; if (n !== d) { d = n; cb(n); } };
    f();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const tx = (x, y, s, cls, anc) => `<text class="${cls || 'f40-t'}" x="${x}" y="${y}" text-anchor="${anc || 'middle'}">${s}</text>`;
  const satir = (x, y, arr, lh, cls, anc) => arr.map((s, i) => tx(x, y + i * lh, s, cls, anc)).join('');
  const okDef = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="${cls}"/></marker>`;
  let SAY = 0;
  const yeniId = (p) => `f40-${p}-${++SAY}`;
  const mtr = (k, l, c, son) => `<div class="f40-mtr"><span>${l}</span><span class="f40-bar f40-bar-${c}"><i data-m="${k}"></i></span><b data-o="${k}">${son || ''}</b></div>`;
  /* tween: RM'de anında son durum */
  const tween = (ms, f) => {
    if (RM || ms <= 0) { f(1); return () => {}; }
    let r = 0, t0 = null;
    const k = (t) => { if (t0 === null) t0 = t; const u = Math.min(1, (t - t0) / ms); f(ease(u)); if (u < 1) r = requestAnimationFrame(k); };
    r = requestAnimationFrame(k);
    return () => cancelAnimationFrame(r);
  };
  /* yol üzerinde akan darbeler (SVG çemberleri havuzu) */
  const darbeHatti = (svg, path, n, cls, r) => {
    const L = path.getTotalLength();
    const g = document.createElementNS(NS, 'g');
    path.parentNode.appendChild(g);
    const dots = Array.from({ length: n }, () => { const c = document.createElementNS(NS, 'circle'); c.setAttribute('r', r || 3.4); c.setAttribute('class', cls); c.style.display = 'none'; g.appendChild(c); return c; });
    let us = [], acc = 0;
    const ciz = () => dots.forEach((c, i) => {
      if (i < us.length) { const p = path.getPointAtLength(clamp(us[i], 0, 1) * L); c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1)); c.style.display = ''; } else c.style.display = 'none';
    });
    return {
      adim(dt, hiz, sure) { acc += dt * hiz; while (acc >= 1) { acc -= 1; if (us.length < n) us.push(0); } us = us.map((u) => u + dt / (sure || 1.6)).filter((u) => u < 1); ciz(); },
      durgun(k) { us = Array.from({ length: Math.min(n, k) }, (_, i) => (i + 0.5) / Math.max(1, k)); ciz(); },
      bos() { us = []; acc = 0; ciz(); },
    };
  };

  /* =====================================================================
     1 · f40_harita — refleks sınıflaması (K1 s. 170)
     ===================================================================== */
  VIZ.f40_harita = (el) => {
    const R = {
      baro: { ad: 'Baroreseptör refleksi', u: 'MAP değişimi', a: 'aort kavsi ve karotis sinüsü mekanoreseptörleri', y: "SSS'den sempatik çıkış hızla değişir → HR ve SVR → MAP ayar noktasına döner",
        c: "<b>Arteriyel baroreseptör refleksi.</b> Aort kavsi ve karotis sinüsü MAP değişimini algılar; sempatik çıkış değişir, HR ve SVR MAP'yi ayar noktasına döndürür. Kısa süreli MAP kontrolünün başlıca refleksidir. Bir refleks seçin. [[K1 s. 170]]" },
      bain: { ad: 'Bainbridge refleksi', u: 'CVP ↑', a: "büyük venler ve RA'daki düşük basınç mekanoreseptörleri", y: 'izole taşikardi',
        c: '<b>Bainbridge refleksi.</b> Santral venöz basınç (CVP) artınca yalnız kalp hızı artar: izole taşikardi. [[K1 s. 170]]' },
      kemo: { ad: 'Kemoreseptör refleksi', u: 'aşırı hipotansiyon, kardiyovasküler kollaps', a: 'periferik kemoreseptörler', y: 'sempatik etkinlik ↑ → HR ↑, MAP ↑',
        c: '<b>Kemoreseptör refleksi.</b> Periferik kemoreseptörlerin uyarılması sempatik etkinliği artırır, HR ve MAP yükselir. Genellikle yalnız kanama ya da sepsisteki gibi ağır hipotansiyonda önem kazanır. [[K1 s. 170]]' },
      sss: { ad: 'SSS iskemik yanıtı', u: 'SSS iskemisi', a: 'beyin sapı (vazomotor merkez)', y: 'sempatik etkinlik ↑ → HR ↑, MAP ↑',
        c: '<b>SSS iskemik yanıtı.</b> SSS iskemisi sempatik sinir etkinliğini artırır; HR ve MAP yükselir. Klinikteki örneği Cushing refleksidir. [[K1 s. 170, 172]]' },
      dis: { ad: 'Dış uyaranlar', u: 'ağrı, duygu, sıcaklık', a: 'kardiyovasküler sistem dışındaki reseptörler', y: 'kardiyovasküler refleks yanıt',
        c: '<b>Dış uyaranlar.</b> Kardiyovasküler sistemin dışından gelen ağrı, duygu ve sıcaklık gibi uyaranlar da kardiyovasküler refleksleri tetikler. [[K1 s. 170]]' },
    };
    const AD = { baro: ['Baroreseptör', 'refleksi'], bain: ['Bainbridge', 'refleksi'], kemo: ['Kemoreseptör', 'refleksi'], sss: ['SSS iskemik', 'yanıtı'] };
    const ROZ = { baro: ['başlıca · kısa süreli', 'ok', 146], kemo: ['ağır hipotansiyonda', 'clin', 136] };
    let sec = 'baro', dar = false, yollar = {};
    el.innerHTML = '<div class="f40-cizim f40-harita"></div><div class="f40-kart f40-detay"></div>';
    const kap = el.querySelector('.f40-cizim'), det = el.querySelector('.f40-detay');
    const rozet = (cx, y, k, anc) => { const [s, c, w] = ROZ[k]; const x = anc === 'start' ? cx : cx - w / 2; return `<rect class="f40-roz f40-roz-${c}" x="${x}" y="${y}" width="${w}" height="21" rx="10.5"/>${tx(x + w / 2, y + 15, s, `f40-roz-t f40-roz-t-${c}`)}`; };
    const cip = (x, y, w, s) => `<rect class="f40-cipr" x="${x}" y="${y}" width="${w}" height="21" rx="10.5"/>${tx(x + w / 2, y + 15, s, 'f40-ts f40-ink')}`;
    const ciz = () => {
      let s = '', vb, taban;
      const nd = (k, inner) => `<g class="f40-nd" data-k="${k}" tabindex="0" role="button" aria-pressed="false" aria-label="${R[k].ad}">${inner}</g>`;
      if (!dar) {
        vb = '0 0 680 226';
        const xs = [8, 134, 260, 386];
        taban = 'M340 60 V72 M256 72 H596 M256 72 V86 M596 72 V86 M256 110 V116 M67 116 H445 M67 116 V128 M193 116 V128 M319 116 V128 M445 116 V128 M596 110 V128';
        ['baro', 'bain', 'kemo', 'sss'].forEach((k, i) => {
          const cx = xs[i] + 59;
          yollar[k] = `M340 60 V72 H256 V86 M256 110 V116 H${cx} V128`;
          s += nd(k, `<rect class="f40-ndr" x="${xs[i]}" y="128" width="118" height="58" rx="10"/>${satir(cx, 152, AD[k], 17, 'f40-t f40-b')}${ROZ[k] ? rozet(cx, 194, k) : ''}`);
        });
        yollar.dis = 'M340 60 V72 H596 V86 M596 110 V128';
        s += nd('dis', `<rect class="f40-ndr" x="514" y="128" width="164" height="58" rx="10"/>${cip(548, 134, 40, 'ağrı')}${cip(594, 134, 52, 'duygu')}${cip(561, 160, 66, 'sıcaklık')}`);
        s = `<rect class="f40-kok" x="240" y="6" width="200" height="54" rx="10"/>${tx(340, 29, 'Kardiyovasküler refleksler', 'f40-t f40-b')}${tx(340, 48, "MAP'yi ayar noktasında tutar", 'f40-ts')}
          ${tx(256, 104, 'Dolaşım içi uyaranlar', 'f40-t f40-dal')}${tx(596, 104, 'Dış uyaranlar', 'f40-t f40-dal')}` + s;
      } else {
        vb = '0 0 360 402';
        const ys = [98, 150, 202, 254];
        taban = 'M180 60 V70 H12 V368 ' + ys.map((y) => `M12 ${y + 23} H24`).join(' ') + ' M12 368 H24';
        ['baro', 'bain', 'kemo', 'sss'].forEach((k, i) => {
          const y = ys[i];
          yollar[k] = `M180 60 V70 H12 V${y + 23} H24`;
          s += nd(k, `<rect class="f40-ndr" x="24" y="${y}" width="330" height="46" rx="10"/>${tx(38, y + 28, AD[k].join(' '), 'f40-t f40-b', 'start')}${ROZ[k] ? rozet(354 - ROZ[k][2] - 8, y + 12, k, 'start') : ''}`);
        });
        yollar.dis = 'M180 60 V70 H12 V368 H24';
        s += nd('dis', `<rect class="f40-ndr" x="24" y="345" width="330" height="46" rx="10"/>${cip(40, 357, 46, 'ağrı')}${cip(94, 357, 58, 'duygu')}${cip(160, 357, 76, 'sıcaklık')}`);
        s = `<rect class="f40-kok" x="80" y="6" width="200" height="54" rx="10"/>${tx(180, 29, 'Kardiyovasküler refleksler', 'f40-t f40-b')}${tx(180, 48, "MAP'yi ayar noktasında tutar", 'f40-ts')}
          ${tx(22, 89, 'Dolaşım içi uyaranlar', 'f40-t f40-dal', 'start')}${tx(22, 336, 'Dış uyaranlar', 'f40-t f40-dal', 'start')}` + s;
      }
      kap.innerHTML = `<svg class="f40-svg${dar ? ' f40-dar' : ''}" viewBox="${vb}" role="group" aria-label="Kardiyovasküler reflekslerin sınıflama ağacı"><path class="f40-agac" d="${taban}"/><path class="f40-secyol" d=""/>${s}</svg>`;
      goster();
    };
    const goster = () => {
      const r = R[sec];
      kap.querySelectorAll('.f40-nd').forEach((g) => { const on = g.dataset.k === sec; g.classList.toggle('on', on); g.setAttribute('aria-pressed', String(on)); });
      const p = kap.querySelector('.f40-secyol'); if (p) p.setAttribute('d', yollar[sec]);
      det.innerHTML = `<h4>${r.ad}</h4><dl class="f40-dl"><dt>Uyaran</dt><dd>${r.u}</dd><dt>Algılayıcı / yol</dt><dd>${r.a}</dd><dt>Yanıt</dt><dd>${r.y}</dd></dl>`;
      capYaz(el, r.c);
    };
    const sec2 = (k) => { if (k && R[k]) { sec = k; goster(); } };
    const onClick = (e) => { const g = e.target.closest('.f40-nd'); if (g) sec2(g.dataset.k); };
    const onKey = (e) => { const g = e.target.closest('.f40-nd'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sec2(g.dataset.k); } };
    el.addEventListener('click', onClick); el.addEventListener('keydown', onKey);
    const durDar = darIzle(el, (n) => { dar = n; ciz(); });
    return () => { durDar(); el.removeEventListener('click', onClick); el.removeEventListener('keydown', onKey); };
  };

  /* =====================================================================
     2 · f40_baro — baroreseptör refleks halkası (K1 s. 170–171)
     ===================================================================== */
  VIZ.f40_baro = (el) => {
    const CAP = {
      dinlenme: '<b>Dinlenme.</b> MAP ayar noktasında; baroreseptörler orta frekansta ateşler. "MAP düşsün" ya da "MAP yükselsin" seçip halkayı adım adım izleyin. [[K1 s. 170]]',
      dus: [
        '<b>1 · MAP düşer.</b> Karotis sinüsü ve aort kavsi duvarı daha az gerilir. [[K1 s. 170]]',
        '<b>2 · Ateşleme azalır.</b> Baroreseptör afferentlerinin aksiyon potansiyeli frekansı düşer; sinyal IX (karotis sinüsü) ve X (aort kavsi) ile medulladaki vazomotor merkeze gider. [[K1 s. 170]]',
        '<b>3 · Presör alan öne çıkar.</b> Vazokonstriktör alan sempatik çıkışı artırır. [[K1 s. 171]]',
        '<b>4 · Efektörler.</b> Taşikardi, kontraktilite artışı, periferik vazokonstriksiyon (SVR ↑), venokonstriksiyon; adrenal medulladan adrenalin. [[K1 s. 170–171]]',
        '<b>5 · MAP normale döner.</b> Ateşleme ve sempatik çıkış dinlenme düzeyine iner. [[K1 s. 171]]',
      ],
      yuk: [
        '<b>1 · MAP yükselir.</b> Karotis sinüsü ve aort kavsi duvarı gerilir. [[K1 s. 170]]',
        '<b>2 · Ateşleme artar.</b> Afferentlerin aksiyon potansiyeli frekansı artar; IX ve X ile vazomotor merkeze. [[K1 s. 170]]',
        '<b>3 · Depresör alan öne çıkar.</b> Vazodilatör alan vazokonstriktör merkezi baskılar, sempatik çıkış azalır. [[K1 s. 171]]',
        '<b>4 · Efektörler.</b> Periferik vazodilatasyon; HR ve kontraktilite azalır. [[K1 s. 171]]',
        '<b>5 · MAP normale döner.</b> [[K1 s. 171]]',
      ],
    };
    const EF = [['Kalp', 'HR, kontraktilite'], ['Arterioller · SVR', 'vazokonstriksiyon'], ['Venler', 'venokonstriksiyon'], ['Adrenal medulla', 'adrenalin']];
    const ACIK = [1, 0.3, 0.45, 0.6, 0.8, 1];
    const traj = (x, sg) => (x < 0.15 ? 0 : x < 0.25 ? sg * ease((x - 0.15) / 0.1) : x < 0.6 ? sg : sg * Math.exp(-(x - 0.6) / 0.09));
    const L = {
      g: { vb: '0 0 700 356', arch: 'M50 326 C50 258 190 258 190 326', cc: 'M120 278 V150', ica: 'M120 150 C112 130 104 110 100 40', eca: 'M120 150 C130 130 140 110 146 40',
        sin: [107, 128, 9, 15], sinT: tx(94, 132, 'karotis sinüsü', 'f40-ts', 'end'), archT: tx(120, 348, 'aort kavsi (daha az önemli)', 'f40-ts'),
        ix: 'M110 116 C150 70 220 68 298 76', ixT: tx(196, 60, 'IX · glossofaringeal', 'f40-ts f40-acc-t'), x: 'M168 286 C232 250 252 150 298 112', xT: tx(250, 214, 'X · vagus', 'f40-ts f40-acc-t', 'start'), key: '',
        med: [290, 14, 210, 150], medT: [395, 32], pres: [298, 42, 104, 88], presL: [['Vazokonstriktör', '(presör,', 'savunma)', 'alan'], 350, 64, 16], dep: [410, 42, 82, 88], depL: [['Vazodilatör', '(depresör)', 'alan'], 451, 72, 16],
        inh: 'M451 130 C451 152 352 152 352 134', inhBar: 'M344 134 H360', inhT: [401, 160], eff: 'M320 130 V180 H508', bus: 'M508 41 V203', busX: 508,
        effT: tx(414, 174, 'sempatik efferentler', 'f40-ts f40-warn-t'), efx: 520, efw: 172, efy: [18, 72, 126, 180], efh: 46,
        eksi: [330, 206], eksiT: tx(348, 211, 'negatif geribildirim', 'f40-ts', 'start'),
        gx0: 300, gx1: 690, gmid: 286, gamp: 40, gax: 'M300 236 V336 H690', gl: [[294, 250, 'yüksek'], [294, 290, 'ayar noktası'], [294, 330, 'düşük']], gxT: tx(495, 352, 'zaman →', 'f40-ts') },
      d: { vb: '0 0 360 572', arch: 'M30 384 C30 326 150 326 150 384', cc: 'M90 342 V236', ica: 'M90 236 C84 220 80 204 78 182', eca: 'M90 236 C98 220 104 204 108 182',
        sin: [82, 220, 7, 12], sinT: tx(118, 222, 'karotis', 'f40-ts', 'start') + tx(118, 237, 'sinüsü', 'f40-ts', 'start'), archT: tx(90, 404, 'aort kavsi', 'f40-ts') + tx(90, 419, '(daha az önemli)', 'f40-ts'),
        ix: 'M80 210 C44 200 34 186 40 160', ixT: tx(30, 196, 'IX', 'f40-ts f40-acc-t f40-b', 'end'), x: 'M118 338 C146 296 146 210 104 160', xT: tx(146, 280, 'X', 'f40-ts f40-acc-t f40-b', 'start'),
        key: tx(10, 442, 'IX glossofaringeal · X vagus (afferent)', 'f40-ts f40-acc-t', 'start'),
        med: [10, 10, 340, 150], medT: [180, 28], pres: [20, 38, 158, 86], presL: [['Vazokonstriktör', '(presör, savunma)', 'alan'], 99, 62, 17], dep: [186, 38, 154, 86], depL: [['Vazodilatör', '(depresör)', 'alan'], 263, 62, 17],
        inh: 'M263 124 C263 144 99 144 99 128', inhBar: 'M91 128 H107', inhT: [181, 154], eff: 'M150 124 V166 H178', bus: 'M178 166 V356', busX: 178,
        effT: tx(190, 175, 'sempatik efferentler', 'f40-ts f40-warn-t', 'start'), efx: 190, efw: 160, efy: [180, 230, 280, 330], efh: 44,
        eksi: [334, 400], eksiT: tx(316, 405, 'negatif geribildirim', 'f40-ts', 'end'),
        gx0: 94, gx1: 350, gmid: 508, gamp: 36, gax: 'M94 462 V552 H350', gl: [[88, 478, 'yüksek'], [88, 512, 'ayar noktası'], [88, 546, 'düşük']], gxT: tx(222, 568, 'zaman →', 'f40-ts') },
    };
    let mod = null, adim = 0, dar = false, oyn = false, sure = 0, acik = 1, ates = 1, symp = 1, refs = null, durT = null;
    el.innerHTML = `<div class="f40-ust">${segHtml('MAP bozulması', 'mod', [['dus', 'MAP düşsün'], ['yuk', 'MAP yükselsin'], ['sifir', 'Sıfırla']], '', 'f40-seg')}
      <button type="button" class="btn ghost f40-btn" data-a="adim">Adım ▸</button>${RM ? '' : '<button type="button" class="btn ghost f40-btn" data-a="oyn" aria-pressed="false">Oynat</button>'}<span class="f40-adimno"></span></div>
      <div class="f40-cizim f40-baro"></div>
      <div class="f40-mtrler">${mtr('ates', 'Afferent AP frekansı', 'acc')}${mtr('symp', 'Sempatik çıkış', 'warn')}${mtr('map', 'MAP', 'crit')}</div>`;
    const kap = el.querySelector('.f40-cizim'), no = el.querySelector('.f40-adimno'), oynB = el.querySelector('[data-a="oyn"]');
    const ciz = () => {
      const l = dar ? L.d : L.g, ok = yeniId('ok'), okw = yeniId('okw');
      const r4 = (a, cls, h) => `<rect class="${cls}"${h ? ` data-h="${h}"` : ''} x="${a[0]}" y="${a[1]}" width="${a[2]}" height="${a[3]}" rx="10"/>`;
      const ef = EF.map(([a, b], i) => {
        const y = l.efy[i];
        return `<g class="f40-ef" data-ef="${i}"><path class="f40-efd" d="M${l.busX} ${y + l.efh / 2} H${l.efx}"/>${r4([l.efx, y, l.efw, l.efh], 'f40-efr', 'efk')}${tx(l.efx + 10, y + 19, a, 'f40-t f40-b', 'start')}${tx(l.efx + 10, y + 36, b, 'f40-ts', 'start')}<text class="f40-ind" x="${l.efx + l.efw - 10}" y="${y + 22}" text-anchor="end">–</text></g>`;
      }).join('');
      kap.innerHTML = `<svg class="f40-svg${dar ? ' f40-dar' : ''}" viewBox="${l.vb}" role="img" aria-label="Baroreseptör refleks halkası: karotis sinüsü ve aort kavsi, IX ve X afferentleri, medulladaki presör ve depresör alanlar, sempatik efektörler ve MAP–zaman grafiği">
        <defs>${okDef(ok, 'f40-uc-acc')}${okDef(okw, 'f40-uc-warn')}</defs>
        <path class="f40-art" data-h="arch" d="${l.arch}"/><path class="f40-art f40-art-ince" d="${l.cc}"/><path class="f40-art f40-art-ince" d="${l.ica}"/><path class="f40-art f40-art-ince" d="${l.eca}"/>
        <ellipse class="f40-sinus" data-h="sin" cx="${l.sin[0]}" cy="${l.sin[1]}" rx="${l.sin[2]}" ry="${l.sin[3]}"/>${l.sinT}${l.archT}
        <path class="f40-sinir" data-h="ix" d="${l.ix}" marker-end="url(#${ok})"/>${l.ixT}<path class="f40-sinir" data-h="x" d="${l.x}" marker-end="url(#${ok})"/>${l.xT}${l.key}
        ${r4(l.med, 'f40-med')}${tx(l.medT[0], l.medT[1], 'Medulla oblongata · vazomotor merkez', 'f40-ts f40-b')}
        ${r4(l.pres, 'f40-pres', 'pres')}${satir(l.presL[1], l.presL[2], l.presL[0], l.presL[3], 'f40-t f40-warn-t')}
        ${r4(l.dep, 'f40-dep', 'dep')}${satir(l.depL[1], l.depL[2], l.depL[0], l.depL[3], 'f40-t f40-bas-t')}
        <path class="f40-inh" data-h="inh" d="${l.inh}"/><path class="f40-inh f40-inh-bar" data-h="inh" d="${l.inhBar}"/>${tx(l.inhT[0], l.inhT[1], 'baskılar', 'f40-ts f40-bas-t')}
        <path class="f40-eff" data-h="eff" d="${l.eff}"/><path class="f40-eff" data-h="eff" d="${l.bus}"/>${l.effT}${ef}
        <circle class="f40-eksi" cx="${l.eksi[0]}" cy="${l.eksi[1]}" r="13"/>${tx(l.eksi[0], l.eksi[1] + 6, '−', 'f40-eksi-t')}${l.eksiT}
        <path class="f40-eksen" d="${l.gax}"/><line class="f40-ayar" x1="${l.gx0}" x2="${l.gx1}" y1="${l.gmid}" y2="${l.gmid}"/>${l.gl.map(([x, y, s]) => tx(x, y, s, 'f40-ts', 'end')).join('')}${l.gxT}
        <path class="f40-mapc" data-h="graf" d=""/><circle class="f40-mapn" r="5"/>
      </svg>`;
      const svg = kap.querySelector('svg');
      refs = { l, svg, sin: svg.querySelector('.f40-sinus'), arch: svg.querySelector('[data-h="arch"]'), c: svg.querySelector('.f40-mapc'), n: svg.querySelector('.f40-mapn'),
        ix: darbeHatti(svg, svg.querySelector('[data-h="ix"]'), 12, 'f40-darbe'), x: darbeHatti(svg, svg.querySelector('[data-h="x"]'), 12, 'f40-darbe'),
        ef: darbeHatti(svg, svg.querySelector('.f40-eff'), 10, 'f40-darbe-w') };
      durum(); guncelle(0);
    };
    const hedef = () => {
      const st = mod ? adim : 0;
      return { a: mod && st >= 2 && st < 5 ? (mod === 'dus' ? 0.4 : 2) : 1, s: mod && st >= 3 && st < 5 ? (mod === 'dus' ? 1.8 : 0.35) : 1, k: ACIK[st] };
    };
    const durum = () => {
      if (!refs) return;
      const st = mod ? adim : 0, svg = refs.svg;
      const hl = st === 1 ? ['sin', 'arch', 'graf'] : st === 2 ? ['ix', 'x'] : st === 3 ? (mod === 'dus' ? ['pres'] : ['dep', 'inh']) : st === 4 ? ['eff', 'efk'] : st === 5 ? ['graf'] : [];
      svg.querySelectorAll('[data-h]').forEach((e) => e.classList.toggle('f40-hl', hl.includes(e.dataset.h)));
      svg.querySelector('.f40-pres').classList.toggle('f40-aktif', mod === 'dus' && st >= 3 && st < 5);
      svg.querySelector('.f40-dep').classList.toggle('f40-aktif', mod === 'yuk' && st >= 3 && st < 5);
      svg.querySelectorAll('.f40-inh').forEach((e) => e.classList.toggle('f40-aktif', mod === 'yuk' && st >= 3 && st < 5));
      svg.querySelectorAll('.f40-ef').forEach((g, i) => {
        const ind = g.querySelector('.f40-ind');
        let v = '–', c = '';
        if (mod && st >= 4) { if (mod === 'dus') { v = '↑'; c = 'up'; } else if (i < 2) { v = '↓'; c = 'dn'; } }
        ind.textContent = v; ind.setAttribute('class', `f40-ind ${c}${st === 5 ? ' eski' : ''}`);
        g.classList.toggle('f40-soluk', mod === 'yuk' && st >= 4 && i >= 2);
        g.classList.toggle('f40-yanan', !!c && st === 4);
      });
      no.textContent = mod ? `Adım ${adim}/5` : '';
      capYaz(el, mod ? CAP[mod][adim - 1] : CAP.dinlenme);
      if (oynB) { oynB.textContent = oyn ? 'Duraklat' : 'Oynat'; oynB.setAttribute('aria-pressed', String(oyn)); }
      if (RM) { const h = hedef(); ates = h.a; symp = h.s; acik = h.k; guncelle(0); refs.ix.durgun(Math.round(3 * ates)); refs.x.durgun(Math.round(3 * ates)); refs.ef.durgun(Math.round(3 * symp)); }
    };
    const guncelle = (dt) => {
      if (!refs) return;
      const l = refs.l, sg = mod === 'yuk' ? 1 : mod === 'dus' ? -1 : 0;
      const pts = [];
      for (let i = 0; i <= 60; i++) { const u = (i / 60) * acik; pts.push(`${(l.gx0 + u * (l.gx1 - l.gx0)).toFixed(1)} ${(l.gmid - traj(u, sg) * l.gamp).toFixed(1)}`); }
      refs.c.setAttribute('d', 'M' + pts.join(' L'));
      const mv = traj(acik, sg);
      refs.n.setAttribute('cx', (l.gx0 + acik * (l.gx1 - l.gx0)).toFixed(1)); refs.n.setAttribute('cy', (l.gmid - mv * l.gamp).toFixed(1));
      refs.sin.setAttribute('rx', (l.sin[2] * (1 + 0.32 * mv)).toFixed(2)); refs.sin.setAttribute('ry', (l.sin[3] * (1 + 0.22 * mv)).toFixed(2));
      refs.arch.style.strokeWidth = (dar ? 14 : 16) * (1 + 0.22 * mv);
      el.querySelector('[data-m="ates"]').style.width = (ates / 2.2) * 100 + '%';
      el.querySelector('[data-m="symp"]').style.width = (symp / 2.2) * 100 + '%';
      el.querySelector('[data-m="map"]').style.width = ((mv + 1.5) / 3) * 100 + '%';
      el.querySelector('[data-o="ates"]').textContent = ates < 0.8 ? '↓' : ates > 1.2 ? '↑' : 'orta';
      el.querySelector('[data-o="symp"]').textContent = symp < 0.8 ? '↓' : symp > 1.2 ? '↑' : 'orta';
      el.querySelector('[data-o="map"]').textContent = mv < -0.15 ? '↓' : mv > 0.15 ? '↑' : 'ayar n.';
      if (!RM && dt > 0) { refs.ix.adim(dt, 1.6 * ates, 1.4); refs.x.adim(dt, 1.6 * ates, 1.4); refs.ef.adim(dt, 1.6 * symp, 1.4); }
    };
    const ileri = () => { if (!mod) { mod = 'dus'; adim = 1; acik = 0.12; basSec(el, 'mod', 'dus'); } else if (adim < 5) adim++; else { adim = 1; acik = 0.12; } durum(); };
    const onClick = (e) => {
      const m = e.target.closest('[data-mod]'), a = e.target.closest('[data-a]');
      if (m) {
        const v = m.dataset.mod;
        if (v === 'sifir') { mod = null; adim = 0; oyn = false; acik = 1; basSec(el, 'mod', ''); }
        else { mod = v; adim = 1; acik = 0.12; sure = 0; oyn = !RM; basSec(el, 'mod', v); }
        durum();
      } else if (a && a.dataset.a === 'adim') { oyn = false; sure = 0; ileri(); }
      else if (a && a.dataset.a === 'oyn') { if (oyn) oyn = false; else { oyn = true; sure = 0; if (!mod || adim === 5) { mod = mod || 'dus'; adim = 0; basSec(el, 'mod', mod); ileri(); return; } } durum(); }
    };
    el.addEventListener('click', onClick);
    const durDar = darIzle(el, (n) => { dar = n; ciz(); });
    const durTik = RM ? () => {} : ticker(el, (dt) => {
      if (oyn) { sure += dt; if (sure >= 2.5) { sure = 0; ileri(); if (adim === 5) { oyn = false; durum(); } } }
      const h = hedef(), f = Math.min(1, dt * 2.6);
      acik = lerp(acik, h.k, Math.min(1, dt * 2)); ates = lerp(ates, h.a, f); symp = lerp(symp, h.s, f);
      guncelle(dt);
    });
    return () => { durDar(); durTik(); if (durT) durT(); el.removeEventListener('click', onClick); };
  };

  /* =====================================================================
     3 · f40_egri — A ve C lifleri, duyarlı aralık, yeniden ayarlanma (K1 s. 171)
     ===================================================================== */
  VIZ.f40_egri = (el) => {
    const DUR = [['kom', 'A ve C lifleri birlikte'], ['a', 'Yalnız A lifleri'], ['c', 'Yalnız C lifleri'], ['ht', 'Kronik hipertansiyon'], ['yas', 'Yaşlanma, ateroskleroz']];
    const CAP = {
      kom: '<b>A ve C lifleri birlikte.</b> Büyük miyelinli A lifleri düşük, küçük miyelinsiz C lifleri yüksek basınçta etkinleşir; birlikte refleks 80–150 mmHg arasında duyarlıdır. Bir durum seçin. [[K1 s. 171]]',
      a: '<b>A lifleri.</b> Büyük, miyelinli; daha düşük basınçta etkinleşir. [[K1 s. 171]]',
      c: '<b>C lifleri.</b> Küçük, miyelinsiz; daha yüksek basınçta etkinleşir. [[K1 s. 171]]',
      ht: '<b>Kronik hipertansiyon.</b> Baroreseptörler çalışma aralığını ve duyarlılığını yeniden ayarlar: refleks yüksek basıncı "normal" diye savunur. [[K1 s. 171]]',
      yas: '<b>Yaşlanma ve ateroskleroz.</b> Arter ağacının kompliyansı azalır; refleksin duyarlılığı ve hızı düşer. Ayağa kalkınca MAP düşüşü telafi edilemez: postüral hipotansiyon yaşlılarda sıktır. [[K1 s. 171]]',
    };
    const PAR = { kom: [0, 1], a: [0, 1], c: [0, 1], ht: [30, 1.3], yas: [0, 2] };
    const sA = (m) => 1 / (1 + Math.exp(-(m - 95) / 8));
    const sC = (m) => 1 / (1 + Math.exp(-(m - 135) / 8));
    const kom = (m, sh, st) => { const q = 115 + (m - 115 - sh) / st; return (sA(q) + sC(q)) / 2; };
    let dur = 'kom', dar = false, sh = 0, st = 1, imlec = 100, refs = null, durTw = () => {}, surukle = false;
    el.innerHTML = `<div class="f40-ust">${segHtml('Lif ve durum', 'dur', DUR, 'kom', 'f40-seg')}</div>
      <div class="f40-ikili"><div class="f40-sahne"><div class="f40-cizim"></div>
        <div class="f40-lej"><span><i class="f40-lj-a"></i>A lifleri</span><span><i class="f40-lj-c"></i>C lifleri</span><span><i class="f40-lj-k"></i>birlikte</span><span class="f40-lj-ghost-s"><i class="f40-lj-g"></i>önceki (normal)</span></div>
        <label class="f40-rng"><span>İmleç: MAP <b data-o="m">100 mmHg</b></span><input type="range" min="40" max="200" step="1" value="100" aria-label="İmleçteki MAP (mmHg)"></label>
        <div class="f40-mtr"><span>Afferent AP frekansı</span><span class="f40-bar f40-bar-acc"><i data-m="f"></i></span><b data-o="f"></b></div></div>
      <div class="f40-panel f40-kart"><h4>Plazma hacmi</h4>
        <div class="f40-zincir">${['MAP ↓', 'sempatik ↑', 'renin ↑', 'RAA', 'plazma hacmi ↑'].map((s, i) => `<span class="f40-cip${i === 0 ? ' f40-cip-crit' : i === 4 ? ' f40-cip-ok' : ''}">${s}</span>`).join('<span class="f40-ok">→</span>')}</div>
        <div class="f40-zincir">${['MAP ↑', 'sempatik ↓', 'renin ↓', 'plazma hacmi ↓'].map((s, i) => `<span class="f40-cip${i === 0 ? ' f40-cip-crit' : i === 3 ? ' f40-cip-bas' : ''}">${s}</span>`).join('<span class="f40-ok">→</span>')}</div>
        <p class="f40-klinik">Preeklampsi: sürekli yüksek MAP → göreli hipovolemi</p></div></div>`;
    const kap = el.querySelector('.f40-cizim'), rng = el.querySelector('input[type=range]'), ikili = el.querySelector('.f40-ikili');
    const G = () => (dar ? { W: 360, X0: 50, X1: 346 } : { W: 460, X0: 56, X1: 446 });
    const Y0 = 248, Y1 = 52;
    const X = (m) => { const g = G(); return g.X0 + ((m - 40) / 160) * (g.X1 - g.X0); };
    const Y = (f) => Y0 - f * (Y0 - Y1);
    const yol = (fn) => { const p = []; for (let m = 40; m <= 200; m += 2) p.push(`${X(m).toFixed(1)} ${Y(fn(m)).toFixed(1)}`); return 'M' + p.join(' L'); };
    const ciz = () => {
      const g = G();
      kap.innerHTML = `<svg class="f40-svg${dar ? ' f40-dar' : ''}" viewBox="0 0 ${g.W} 296" role="img" aria-label="Baroreseptör afferent ateşleme frekansı – MAP eğrileri">
        <rect class="f40-bant" x="0" y="${Y1 - 6}" width="0" height="${Y0 - Y1 + 6}"/><text class="f40-ts f40-ok-t f40-bantT" x="0" y="${Y1 - 12}" text-anchor="middle"></text>
        <path class="f40-eksen" d="M${g.X0} ${Y1 - 6} V${Y0} H${g.X1}"/>
        ${[40, 80, 120, 150, 200].map((m) => `<line class="f40-tik" x1="${X(m)}" x2="${X(m)}" y1="${Y0}" y2="${Y0 + 5}"/>${tx(X(m), Y0 + 19, m, 'f40-ts', m === 200 ? 'end' : 'middle')}`).join('')}
        ${tx((g.X0 + g.X1) / 2, Y0 + 40, 'MAP (mmHg)', 'f40-ts f40-b')}
        <text class="f40-ts" transform="translate(18 ${(Y0 + Y1) / 2}) rotate(-90)" text-anchor="middle">Afferent AP frekansı (göreli)</text>
        <path class="f40-cg" d="${yol((m) => kom(m, 0, 1))}"/>
        <path class="f40-ca" d="${yol(sA)}"/><path class="f40-cc" d="${yol(sC)}"/><path class="f40-ck" d=""/>
        <g class="f40-saat"><circle class="f40-saat-c" r="10"/><path class="f40-saat-k" d="M0 -6 V0 H5"/><text class="f40-ts f40-clin-t" x="15" y="5">yavaş</text></g>
        <line class="f40-iml" y1="${Y1 - 6}" y2="${Y0}"/><circle class="f40-imln" r="5.5"/>
      </svg>`;
      const svg = kap.querySelector('svg');
      refs = { svg, ck: svg.querySelector('.f40-ck'), bant: svg.querySelector('.f40-bant'), bt: svg.querySelector('.f40-bantT'), saat: svg.querySelector('.f40-saat'), iml: svg.querySelector('.f40-iml'), imln: svg.querySelector('.f40-imln') };
      svg.addEventListener('pointerdown', (e) => { surukle = true; try { svg.setPointerCapture(e.pointerId); } catch (_) { /* */ } surAl(e); });
      svg.addEventListener('pointermove', (e) => { if (surukle) surAl(e); });
      svg.addEventListener('pointerup', () => { surukle = false; });
      svg.addEventListener('pointercancel', () => { surukle = false; });
      sinif(); egri();
    };
    const surAl = (e) => {
      const r = refs.svg.getBoundingClientRect(), g = G();
      const vx = ((e.clientX - r.left) / r.width) * g.W;
      imlec = Math.round(clamp(40 + ((vx - g.X0) / (g.X1 - g.X0)) * 160, 40, 200)); rng.value = imlec; egri();
    };
    const aktif = (m) => (dur === 'a' ? sA(m) : dur === 'c' ? sC(m) : kom(m, sh, st));
    const egri = () => {
      if (!refs) return;
      refs.ck.setAttribute('d', yol((m) => kom(m, sh, st)));
      const b0 = 80 + sh, b1 = 150 + sh;
      refs.bant.setAttribute('x', X(b0)); refs.bant.setAttribute('width', X(b1) - X(b0));
      refs.bt.setAttribute('x', clamp((X(b0) + X(b1)) / 2, 110, G().W - 110));
      refs.bt.textContent = dur === 'ht' ? 'yeniden ayarlanmış aralık' : 'duyarlı aralık 80–150 mmHg';
      const sm = 168; refs.saat.setAttribute('transform', `translate(${X(sm) - 4} ${Y(kom(sm, sh, st)) + 34})`);
      const f = aktif(imlec);
      refs.iml.setAttribute('x1', X(imlec)); refs.iml.setAttribute('x2', X(imlec));
      refs.imln.setAttribute('cx', X(imlec)); refs.imln.setAttribute('cy', Y(f));
      el.querySelector('[data-o="m"]').textContent = `${imlec} mmHg`;
      el.querySelector('[data-m="f"]').style.width = (f * 100).toFixed(1) + '%';
      el.querySelector('[data-o="f"]').textContent = f < 0.15 ? 'düşük' : f > 0.85 ? 'doyum' : 'orta';
    };
    const sinif = () => { if (refs) refs.svg.setAttribute('class', `f40-svg${dar ? ' f40-dar' : ''} f40-egri-${dur}`); el.querySelector('.f40-lej').className = `f40-lej f40-egri-${dur}`; };
    const secDur = (v) => {
      dur = v; basSec(el, 'dur', v); sinif(); capYaz(el, CAP[v]);
      const [s0, t0] = [sh, st], [s1, t1] = PAR[v];
      durTw(); durTw = tween(400, (u) => { sh = lerp(s0, s1, u); st = lerp(t0, t1, u); egri(); });
    };
    const onClick = (e) => { const b = e.target.closest('[data-dur]'); if (b) secDur(b.dataset.dur); };
    const onInput = () => { imlec = +rng.value; egri(); };
    el.addEventListener('click', onClick); rng.addEventListener('input', onInput);
    const durDar = darIzle(el, (n) => { dar = n; ikili.classList.toggle('f40-tek', n); ciz(); });
    return () => { durDar(); durTw(); el.removeEventListener('click', onClick); rng.removeEventListener('input', onInput); };
  };

  /* =====================================================================
     4 · f40_bainbridge — CVP ↑ → RA gerilmesi → izole taşikardi (K1 s. 170–171)
     ===================================================================== */
  VIZ.f40_bainbridge = (el) => {
    const CAP = {
      sol: '<b>Solunumsal sinüs aritmisi.</b> İnspirasyonda negatif intratorasik basınç RA\'ya venöz dönüşü geçici olarak artırır; RA gerilir, HR artar. Ekspirasyonda HR azalır. [[K1 s. 171]]',
      ute: '<b>Uterin ototransfüzyon.</b> Doğumdan sonra süren uterus kasılması ≈ 500 mL uteroplasental kanı anne dolaşımına döndürür; CVP artar, RA gerilir ve taşikardi olur. Kontraktilite ve SVR değişmez. [[K1 s. 171]]',
    };
    let mod = 'sol', dar = false, oyn = !RM, T = 0, ev = 0, refs = null;
    el.innerHTML = `<div class="f40-ust">${segHtml('Örnek', 'mod', [['sol', 'Solunumsal sinüs aritmisi'], ['ute', 'Uterin ototransfüzyon']], 'sol', 'f40-seg')}
      ${RM ? '' : '<button type="button" class="btn ghost f40-btn" data-a="oyn" aria-pressed="true">Duraklat</button>'}<button type="button" class="btn ghost f40-btn" data-a="yen" hidden>Yeniden oynat</button></div>
      <div class="f40-ikili"><div class="f40-sahne f40-bb-sahne"></div>
      <div class="f40-yan f40-kart">
        <p class="f40-faz" data-o="faz"></p>
        ${mtr('cvp', 'CVP', 'bas')}${mtr('hr', 'HR', 'warn')}
        <div class="f40-sabit"><span>Kontraktilite</span><b>değişmez</b></div><div class="f40-sabit"><span>SVR</span><b>değişmez</b></div>
        <p class="f40-not" data-o="not"></p></div></div>
      <div class="f40-cizim f40-ekg"></div>`;
    const sahneK = el.querySelector('.f40-bb-sahne'), ekgK = el.querySelector('.f40-ekg'), ikili = el.querySelector('.f40-ikili');
    const vol = (t) => { const p = ((t % 4) + 4) % 4; return p < 1.6 ? ease(p / 1.6) : 1 - ease((p - 1.6) / 2.4); };
    const insp = (t) => (((t % 4) + 4) % 4) < 1.6;
    const ute = (e) => ({ k: 1 - 0.38 * ease(e / 3), cvp: 0.32 + 0.42 * ease((e - 0.8) / 3.6), akis: e > 0.4 && e < 4.6 });
    /* durum: str (RA gerilmesi 0–1), cvp, hr (/dk, temsilî) */
    const hal = (t) => {
      if (mod === 'sol') { const v = vol(t - 0.3); return { str: v, cvp: 0.32 + 0.26 * v, hr: 62 + 22 * v, gv: vol(t), ins: insp(t) }; }
      const u = ute(t); const str = clamp((u.cvp - 0.32) / 0.42, 0, 1); return { str, cvp: u.cvp, hr: 62 + 34 * str, gv: 0, ins: false, u };
    };
    const sahne = (h, baslik) => {
      const sx = 1 + 0.07 * h.gv, k = h.u ? h.u.k : 1, ok = yeniId('ok'), okw = yeniId('okw');
      return `<svg class="f40-svg f40-buyuk" viewBox="0 0 360 ${mod === 'ute' ? 340 : 290}" role="img" aria-label="Göğüs, vena kavalar, sağ atriyum, düşük basınç mekanoreseptörleri, vagus afferenti ve yalnız SA düğüme giden sempatik çıkış">
        <defs>${okDef(ok, 'f40-uc-acc')}${okDef(okw, 'f40-uc-warn')}</defs>
        ${baslik ? tx(8, 18, baslik, 'f40-t f40-b f40-bas-t', 'start') : `<text class="f40-ts f40-bas-t f40-intra" x="8" y="18" style="opacity:${mod === 'sol' ? h.gv.toFixed(2) : 0}">intratorasik basınç negatif</text>`}
        <g class="f40-gogus-g" transform="translate(115 150) scale(${sx.toFixed(3)} ${(1 + 0.04 * h.gv).toFixed(3)}) translate(-115 -150)">
          <ellipse class="f40-gogus" cx="115" cy="150" rx="100" ry="116"/>${[72, 108, 144, 180, 216].map((y) => `<path class="f40-kaburga" d="M${y < 100 || y > 200 ? 40 : 24} ${y} Q115 ${y - 20} ${y < 100 || y > 200 ? 190 : 206} ${y}"/>`).join('')}
        </g>
        <path class="f40-ven" d="M100 34 V118"/><path class="f40-ven" d="M100 182 V${mod === 'ute' ? 292 : 272}"/>
        ${satir(92, 52, ['vena kava', 'superior'], 14, 'f40-ts f40-bas-t', 'end')}${satir(92, 246, ['vena kava', 'inferior'], 14, 'f40-ts f40-bas-t', 'end')}
        <circle class="f40-ra" cx="100" cy="150" r="${(30 * (1 + 0.2 * h.str)).toFixed(1)}"/>${tx(100, 155, 'RA', 'f40-t f40-b')}
        <rect class="f40-vent" x="138" y="126" width="76" height="62" rx="16"/>${tx(176, 152, 'ventrikül', 'f40-t')}${tx(176, 168, 'değişmez', 'f40-ts')}
        ${[[100, 116], [100, 184], [100, 70], [100, 232]].map(([x, y]) => `<circle class="f40-res" cx="${x}" cy="${y}" r="${(4.2 + 2.2 * h.str).toFixed(1)}" style="opacity:${(0.45 + 0.55 * h.str).toFixed(2)}"/>`).join('')}
        <path class="f40-ld" d="M106 232 H186"/>${satir(190, 229, ['düşük basınç', 'mekanoreseptörleri'], 14, 'f40-ts f40-acc-t', 'start')}
        <circle class="f40-sa" cx="124" cy="122" r="5.5"/><path class="f40-ld f40-ld-w" d="M86 101 L120 119"/>${tx(84, 100, 'SA düğüm', 'f40-ts f40-warn-t f40-b', 'end')}
        <rect class="f40-vmc" x="214" y="8" width="138" height="44" rx="10"/>${tx(283, 35, 'vazomotor merkez', 'f40-t f40-b')}
        <path class="f40-sinir f40-on" data-p="vag" d="M106 96 C150 80 180 40 212 34" marker-end="url(#${ok})"/>${tx(160, 92, 'vagus (afferent)', 'f40-ts f40-acc-t', 'start')}
        <path class="f40-symp" data-p="sym" d="M300 54 C300 110 180 124 132 122" marker-end="url(#${okw})"/>${satir(220, 146, ['sempatik:', 'yalnız SA düğüme'], 14, 'f40-ts f40-warn-t', 'start')}
        <path class="f40-symp-x" d="M204 112 L186 126"/>${tx(195, 124, '✕', 'f40-ts f40-x')}
        <path class="f40-symp-x" d="M334 54 V186"/>${tx(334, 124, '✕', 'f40-ts f40-x')}
        <rect class="f40-arteriol" x="290" y="188" width="60" height="14" rx="7"/>${tx(318, 220, 'arteriol', 'f40-ts f40-ink')}${tx(318, 234, 'değişmez', 'f40-ts')}
        ${mod === 'ute' ? `<ellipse class="f40-uterus" cx="100" cy="312" rx="${(34 * k).toFixed(1)}" ry="${(22 * k).toFixed(1)}"/>${tx(60, 317, 'uterus', 'f40-ts f40-crit-t f40-b', 'end')}${satir(146, 306, ['≈ 500 mL', 'uteroplasental kan'], 15, 'f40-ts f40-crit-t', 'start')}<path class="f40-gizli" data-p="dam" d="M100 292 V186"/>` : `<path class="f40-gizli" data-p="ust" d="M100 34 V118"/><path class="f40-gizli" data-p="alt" d="M100 272 V182"/>`}
      </svg>`;
    };
    const kur = () => {
      if (RM && mod === 'sol') {
        sahneK.innerHTML = `<div class="f40-iki-yari">${sahne({ ...hal(1.5), gv: 1, str: 1 }, 'inspirasyon')}${sahne({ ...hal(3.9), gv: 0, str: 0 }, 'ekspirasyon')}</div>`;
        refs = null;
      } else {
        sahneK.innerHTML = sahne(hal(mod === 'sol' ? T : ev));
        const svg = sahneK.querySelector('svg'), q = (s) => svg.querySelector(s);
        refs = { svg, gg: q('.f40-gogus-g'), ra: q('.f40-ra'), res: [...svg.querySelectorAll('.f40-res')], intra: q('.f40-intra'), ut: q('.f40-uterus'),
          vag: darbeHatti(svg, q('[data-p="vag"]'), 10, 'f40-darbe'), sym: darbeHatti(svg, q('[data-p="sym"]'), 10, 'f40-darbe-w'),
          ust: q('[data-p="ust"]') && darbeHatti(svg, q('[data-p="ust"]'), 8, 'f40-darbe-b', 3.6), alt: q('[data-p="alt"]') && darbeHatti(svg, q('[data-p="alt"]'), 10, 'f40-darbe-b', 3.6),
          dam: q('[data-p="dam"]') && darbeHatti(svg, q('[data-p="dam"]'), 12, 'f40-damla', 4.2) };
      }
      el.querySelector('[data-a="yen"]').hidden = mod !== 'ute' || RM;
      el.querySelector('[data-o="not"]').textContent = mod === 'sol' ? 'çocuklar ve genç erişkinler' : 'olay bir kez: doğum sonrası';
      simule(); ekgCiz(true);
      if (RM) panel(hal(mod === 'sol' ? 1.5 : 99));
    };
    /* EKG şeridi: atımlar HR'nin integrali (kalıcı liste); pencere 6 sn */
    const PEN = 6;
    let faz = 0, atim = [];
    const simdi = () => (RM ? (mod === 'sol' ? 6 : 12) : (mod === 'sol' ? T : ev));
    const simule = () => {
      const t1 = simdi(), dt = 0.02; atim = []; faz = 0.5;
      for (let t = t1 - PEN - 2; t <= t1; t += dt) { faz += (hal(t).hr / 60) * dt; if (faz >= 1) { faz -= 1; atim.push(t); } }
    };
    const ekgCiz = (yeni) => {
      const W = dar ? 360 : 900, x0 = 10, x1 = W - 10, sol = mod === 'sol';
      const t1 = simdi();
      const X = (t) => x0 + ((t - (t1 - PEN)) / PEN) * (x1 - x0);
      if (yeni || !ekgK.firstChild) {
        ekgK.innerHTML = `<svg class="f40-svg" viewBox="0 0 ${W} ${sol ? 112 : 84}" role="img" aria-label="Kayan EKG şeridi${sol ? ' ve solunum eğrisi' : ''}"><g class="f40-golge"></g><path class="f40-solc" d=""/><path class="f40-ekgc" d=""/>${sol ? tx(x0, 12, 'solunum', 'f40-ts', 'start') : ''}${tx(x0, sol ? 106 : 78, 'EKG', 'f40-ts', 'start')}<text class="f40-ts f40-warn-t f40-rr" x="${x1}" y="${sol ? 106 : 78}" text-anchor="end"></text></svg>`;
      }
      const svg = ekgK.querySelector('svg'), base = sol ? 84 : 56;
      if (sol) {
        let sh = '', p = [];
        for (let t = Math.floor((t1 - PEN) / 4) * 4; t < t1; t += 4) { const a = Math.max(x0, X(t)), b = Math.min(x1, X(t + 1.6)); if (b > a) sh += `<rect class="f40-ins" x="${a.toFixed(1)}" y="16" width="${(b - a).toFixed(1)}" height="40"/>`; }
        if (!dar) { const tm = Math.floor((t1 - 1) / 4) * 4; const xi = X(tm + 0.8), xe = X(tm + 2.8); if (xi > x0 + 60 && xi < x1 - 50) sh += tx(xi, 52, 'insp.', 'f40-ts f40-bas-t'); if (xe > x0 + 60 && xe < x1 - 50) sh += tx(xe, 52, 'eksp.', 'f40-ts'); }
        svg.querySelector('.f40-golge').innerHTML = sh;
        for (let i = 0; i <= 120; i++) { const t = t1 - PEN + (i / 120) * PEN; p.push(`${X(t).toFixed(1)} ${(48 - 28 * vol(t)).toFixed(1)}`); }
        svg.querySelector('.f40-solc').setAttribute('d', 'M' + p.join(' L'));
      }
      const at = atim.filter((t) => X(t) > x0 + 12 && X(t) < x1 - 22);
      const G = [[-10, 0], [-8, -3], [-6, 0], [-2, 0], [0, 5], [2, -26], [4, 7], [6, 0], [12, 0], [16, -6], [20, 0]];
      let d = `M${x0} ${base}`;
      at.forEach((t) => { const x = X(t); G.forEach(([dx, dy]) => { d += ` L${(x + dx).toFixed(1)} ${base + dy}`; }); });
      d += ` L${x1} ${base}`;
      svg.querySelector('.f40-ekgc').setAttribute('d', d);
      const rr = at.length > 1 ? at[at.length - 1] - at[at.length - 2] : 0;
      svg.querySelector('.f40-rr').textContent = rr ? `RR ${rr < 0.8 ? 'kısa' : rr > 0.9 ? 'uzun' : 'orta'}` : '';
    };
    const panel = (h) => {
      el.querySelector('[data-m="cvp"]').style.width = (h.cvp * 100).toFixed(1) + '%';
      el.querySelector('[data-m="hr"]').style.width = (((h.hr - 40) / 60) * 100).toFixed(1) + '%';
      let yon;
      if (mod === 'sol') { const art = hal(T + 0.05).hr - h.hr; yon = RM ? 'insp. ↑ · eksp. ↓' : art > 0.02 ? '↑' : art < -0.02 ? '↓' : '–'; }
      else yon = h.str > 0.1 ? '↑' : '–';
      el.querySelector('[data-o="hr"]').textContent = yon;
      el.querySelector('[data-o="cvp"]').textContent = mod === 'sol' ? (RM ? 'insp. ↑' : (h.ins ? '↑' : '↓')) : h.cvp > 0.4 ? '↑' : '–';
      el.querySelector('[data-o="faz"]').innerHTML = mod === 'sol' ? (RM ? 'Sol: <b>inspirasyon</b> · sağ: <b>ekspirasyon</b>' : (h.ins ? '<b>İnspirasyon</b>: venöz dönüş ↑, RA gerilir' : '<b>Ekspirasyon</b>: venöz dönüş ↓')) : (ev < 4.6 && !RM ? '<b>Uterus kasılıyor</b>: kan vena kava inferiora' : '<b>Sonrası</b>: CVP yüksek, taşikardi sürer');
    };
    const kare = (dt) => {
      if (oyn) {
        if (mod === 'sol') T += dt; else ev += dt;
        const n = simdi(); faz += (hal(n).hr / 60) * dt; if (faz >= 1) { faz -= 1; atim.push(n); }
        if (atim.length > 40) atim = atim.filter((b) => b > n - PEN - 1);
      }
      const h = hal(simdi());
      if (refs) {
        refs.gg.setAttribute('transform', `translate(115 150) scale(${(1 + 0.07 * h.gv).toFixed(3)} ${(1 + 0.04 * h.gv).toFixed(3)}) translate(-115 -150)`);
        refs.ra.setAttribute('r', (30 * (1 + 0.2 * h.str)).toFixed(1));
        refs.res.forEach((c) => { c.setAttribute('r', (4.2 + 2.2 * h.str).toFixed(1)); c.style.opacity = (0.45 + 0.55 * h.str).toFixed(2); });
        if (refs.intra) refs.intra.style.opacity = mod === 'sol' ? h.gv.toFixed(2) : 0;
        if (refs.ut) { refs.ut.setAttribute('rx', (34 * h.u.k).toFixed(1)); refs.ut.setAttribute('ry', (22 * h.u.k).toFixed(1)); }
        const d = oyn ? dt : 0;
        refs.vag.adim(d, 0.6 + 2.6 * h.str, 1.2); refs.sym.adim(d, 0.6 + 2.6 * h.str, 1.2);
        if (refs.ust) { const vr = mod === 'sol' ? 0.6 + 2.4 * h.gv : 0; refs.ust.adim(d, vr, 1.1); refs.alt.adim(d, vr, 1.1); }
        if (refs.dam) refs.dam.adim(d, h.u.akis ? 3.2 : 0, 1.3);
      }
      ekgCiz(false); panel(h);
    };
    const onClick = (e) => {
      const m = e.target.closest('[data-mod]'), a = e.target.closest('[data-a]');
      if (m) { mod = m.dataset.mod; basSec(el, 'mod', mod); ev = 0; T = 0; if (!RM) oyn = true; capYaz(el, CAP[mod]); kur(); butonlar(); if (!RM) kare(0); }
      else if (a && a.dataset.a === 'oyn') { oyn = !oyn; butonlar(); }
      else if (a && a.dataset.a === 'yen') { ev = 0; oyn = true; kur(); butonlar(); }
    };
    const butonlar = () => { const b = el.querySelector('[data-a="oyn"]'); if (b) { b.textContent = oyn ? 'Duraklat' : 'Oynat'; b.setAttribute('aria-pressed', String(oyn)); } };
    if (RM) ev = 12;
    el.addEventListener('click', onClick);
    const durDar = darIzle(el, (n) => { dar = n; ikili.classList.toggle('f40-tek', n); kur(); if (!RM) kare(0); });
    const durTik = RM ? () => {} : ticker(el, kare);
    return () => { durDar(); durTik(); el.removeEventListener('click', onClick); };
  };

  /* =====================================================================
     5 · f40_cushing — kemoreseptör refleksi ve Cushing refleksi (K1 s. 170–172)
     ===================================================================== */
  VIZ.f40_cushing = (el) => {
    const CAP = {
      kemo0: '<b>Kemoreseptör refleksi.</b> Karotis ve aort cisimcikleri uyarılır; sinyal solunum merkezine, oradan komşu vazomotor merkeze geçer ve sempatik çıkış artar. Adımları izleyin ya da Cushing refleksine geçin. [[K1 s. 171]]',
      kemo: [
        '<b>1 · Uyaranlar.</b> Karotis ve aort cisimcikleri düşük PaO₂ ve yüksek PaCO₂ ile, karotis cisimcikleri ayrıca düşük pH ile uyarılır (Bölüm 22); ağır hipotansiyon (MAP < 60 mmHg) da etkinleştirir. [[K1 s. 171]]',
        '<b>2 · Solunum merkezi.</b> Aksiyon potansiyelleri medulla ve ponstaki solunum merkezine ulaşır. [[K1 s. 171]]',
        '<b>3 · Komşu merkez.</b> Medüller solunum merkezi vazomotor merkeze yakındır ve ona sinirsel olarak bağlıdır. [[K1 s. 171]]',
        "<b>4 · Sempatik çıkış ↑.</b> Hipoksi, hiperkapni ve asidoz HR ve MAP'yi artırır; ama kemoreseptörlerin kan basıncı düzenlemesine katkısı küçüktür ve önemi genellikle ağır hipotansiyonla sınırlıdır. [[K1 s. 170–171]]",
      ],
      cush0: '<b>Cushing refleksi.</b> Beyin sapı iskemisiyle başlayan dört adım. Adım ▸ ya da Oynat ile izleyin. [[K1 s. 172]]',
      cush: [
        '<b>1 · Beyin sapı iskemisi.</b> Örneğin kafa içi basıncı artışında (Bölüm 49) beyin sapı iskemik olur. [[K1 s. 172]]',
        "<b>2 · Büyük sempatik boşalım.</b> Yaygın periferik vazokonstriksiyon MAP'yi yükseltir; amaç serebral perfüzyon basıncını korumaktır. [[K1 s. 172]]",
        '<b>3 · Baroreseptörler algılar.</b> Yükselen MAP\'yi karotis sinüsü ve aort kavsi baroreseptörleri vazomotor alana bildirir. [[K1 s. 172]]',
        '<b>4 · Cushing üçlüsü.</b> Hipertansiyon, bradikardi ve düzensiz solunum: beyin sapı iskemisinin işareti. [[K1 s. 172]]',
      ],
    };
    let mod = 'kemo', adim = 0, oyn = false, sure = 0, refs = null, dar = false, tS = 0;
    el.innerHTML = `<div class="f40-ust">${segHtml('Refleks', 'mod', [['kemo', 'Kemoreseptör refleksi'], ['cush', 'Cushing refleksi']], 'kemo', 'f40-seg')}
      <button type="button" class="btn ghost f40-btn" data-a="adim">Adım ▸</button>${RM ? '' : '<button type="button" class="btn ghost f40-btn" data-a="oyn" aria-pressed="false">Oynat</button>'}<button type="button" class="btn ghost f40-btn" data-a="bas">Başa</button><span class="f40-adimno"></span></div>
      <div class="f40-ikili"><div class="f40-sahne f40-cizim"></div>
      <div class="f40-yan f40-kart">${mtr('map', 'MAP', 'crit')}${mtr('hr', 'HR', 'warn')}
        <div class="f40-solk"><span>Solunum</span><svg class="f40-svg" viewBox="0 0 200 40" role="img" aria-label="Solunum şeridi"><path class="f40-solc" d=""/></svg></div>
        <div class="f40-uclu">${['hipertansiyon', 'bradikardi', 'düzensiz solunum'].map((s) => `<span class="f40-cip">${s}</span>`).join('')}</div></div></div>`;
    const kap = el.querySelector('.f40-cizim'), no = el.querySelector('.f40-adimno'), ikili = el.querySelector('.f40-ikili'), solc = el.querySelector('.f40-solk .f40-solc');
    const ciz = () => {
      const ok = yeniId('ok'), okw = yeniId('okw'), okb = yeniId('okb');
      kap.innerHTML = `<svg class="f40-svg f40-buyuk" viewBox="0 0 360 332" role="img" aria-label="Beyin sapında solunum ve vazomotor merkezler, karotis ve aort cisimcikleri, karotis sinüsü, aort kavsi, kalp ve arteriol">
        <defs>${okDef(ok, 'f40-uc-acc')}${okDef(okw, 'f40-uc-warn')}${okDef(okb, 'f40-uc-bas')}</defs>
        <g class="f40-kafa" data-g="kafa"><rect class="f40-kafatasi" x="30" y="0" width="300" height="134" rx="54"/>${tx(180, 124, 'kafa içi basıncı ↑', 'f40-ts f40-clin-t f40-b')}</g>
        <text class="f40-ts f40-b f40-bs-t" x="180" y="15" text-anchor="middle">beyin sapı</text>
        <rect class="f40-bs" x="58" y="20" width="244" height="84" rx="12"/>
        <rect class="f40-mrk" data-g="solm" x="64" y="26" width="120" height="56" rx="9"/>${satir(124, 43, ['solunum merkezi', '(medulla, pons)'], 16, 'f40-ts f40-ink')}
        <rect class="f40-mrk" data-g="vmc" x="198" y="26" width="98" height="56" rx="9"/>${satir(247, 50, ['vazomotor', 'merkez'], 16, 'f40-ts f40-ink f40-b')}
        <path class="f40-bag" data-g="bag" d="M185 54 H197" marker-start="url(#${ok})" marker-end="url(#${ok})"/>${tx(190, 98, 'sinirsel bağlantı', 'f40-ts')}
        <path class="f40-art" d="M40 320 C40 266 150 266 150 320"/><path class="f40-art f40-art-ince" d="M74 284 V200"/><path class="f40-art f40-art-ince" d="M74 200 C68 186 62 172 60 152"/><path class="f40-art f40-art-ince" d="M74 200 C80 186 86 172 90 152"/>
        <ellipse class="f40-sinus" data-g="sin" cx="66" cy="184" rx="6" ry="10"/><circle class="f40-cis" data-g="kc" cx="76" cy="200" r="6"/><circle class="f40-cis" data-g="ac" cx="112" cy="282" r="6"/>
        ${tx(98, 176, 'karotis sinüsü', 'f40-ts', 'start')}${tx(98, 203, 'karotis cisimciği', 'f40-ts f40-ok-t', 'start')}${tx(150, 296, 'aort cisimciği', 'f40-ts f40-ok-t', 'start')}${tx(95, 330, 'aort kavsi', 'f40-ts')}
        <g data-g="uy"><rect class="f40-uy" x="96" y="210" width="158" height="22" rx="11"/>${tx(175, 225, 'PaO₂ ↓ · PaCO₂ ↑ · pH ↓', 'f40-ts f40-ink')}
          <rect class="f40-uy" x="150" y="248" width="114" height="22" rx="11"/>${tx(207, 263, 'PaO₂ ↓ · PaCO₂ ↑', 'f40-ts f40-ink')}
          <rect class="f40-uy f40-uy-c" x="150" y="302" width="110" height="22" rx="11"/>${tx(205, 317, 'MAP &lt; 60 mmHg', 'f40-ts f40-crit-t')}</g>
        <path class="f40-sinir" data-p="kc" d="M76 194 C92 150 112 120 116 86" marker-end="url(#${ok})"/>
        <path class="f40-sinir" data-p="ac" d="M106 278 C60 262 22 230 24 170 C26 120 80 110 96 86" marker-end="url(#${ok})"/>
        <path class="f40-sinir" data-p="bs" d="M66 176 C130 150 250 160 256 88" marker-end="url(#${ok})"/>
        <path class="f40-sinir" data-p="ba" d="M118 280 C200 250 264 170 266 88" marker-end="url(#${ok})"/>
        <path class="f40-symp" data-p="sk" d="M280 84 C296 120 312 146 316 166" marker-end="url(#${okw})"/>
        <path class="f40-symp" data-p="sa" d="M276 84 C268 180 292 238 304 262" marker-end="url(#${okw})"/>
        <path class="f40-vagal" data-p="vg" d="M296 76 C340 96 352 140 342 166" marker-end="url(#${okb})"/>
        <path class="f40-kalp" d="M330 176 C330 168 318 164 314 172 C310 164 298 168 298 176 C298 188 314 196 314 202 C314 196 330 188 330 176 Z" transform="translate(-0 0)"/>${tx(314, 222, 'kalp', 'f40-ts f40-ink')}
        <rect class="f40-arteriol" data-g="art" x="282" y="266" width="70" height="14" rx="7"/>${tx(317, 298, 'arteriol', 'f40-ts f40-ink')}
      </svg>`;
      const svg = kap.querySelector('svg'), q = (s) => svg.querySelector(s);
      const P = {}; ['kc', 'ac', 'bs', 'ba', 'sk', 'sa', 'vg'].forEach((k) => { P[k] = q(`[data-p="${k}"]`); });
      refs = { svg, P, kalp: q('.f40-kalp'), art: q('[data-g="art"]'),
        d: { kc: darbeHatti(svg, P.kc, 8, 'f40-darbe'), ac: darbeHatti(svg, P.ac, 10, 'f40-darbe'), bs: darbeHatti(svg, P.bs, 8, 'f40-darbe'), ba: darbeHatti(svg, P.ba, 10, 'f40-darbe'),
          sk: darbeHatti(svg, P.sk, 6, 'f40-darbe-w'), sa: darbeHatti(svg, P.sa, 10, 'f40-darbe-w'), vg: darbeHatti(svg, P.vg, 6, 'f40-darbe-b') } };
      durum();
    };
    /* her adımda görünen ve akan yollar */
    const AKIS = { kemo: [[], ['kc', 'ac'], [], ['sk', 'sa']], cush: [[], ['sk', 'sa'], ['bs', 'ba'], ['vg']] };
    const GOR = { kemo: [['kc', 'ac'], ['kc', 'ac'], ['kc', 'ac'], ['kc', 'ac', 'sk', 'sa']], cush: [[], ['sk', 'sa'], ['sk', 'sa', 'bs', 'ba'], ['sk', 'sa', 'bs', 'ba', 'vg']] };
    const akan = () => (adim ? AKIS[mod][adim - 1] : []);
    const durum = () => {
      if (!refs) return;
      const svg = refs.svg, k = mod === 'kemo', s = adim;
      const gor = s ? GOR[mod][s - 1] : k ? ['kc', 'ac'] : [];
      Object.entries(refs.P).forEach(([key, p]) => { p.style.display = gor.includes(key) ? '' : 'none'; p.classList.toggle('f40-on', akan().includes(key)); });
      Object.entries(refs.d).forEach(([key, d]) => { if (!gor.includes(key) || !akan().includes(key)) d.bos(); else if (RM) d.durgun(4); });
      const g = (n) => svg.querySelector(`[data-g="${n}"]`);
      g('kafa').style.display = k ? 'none' : '';
      g('uy').style.display = k && s >= 1 ? '' : 'none';
      svg.querySelector('.f40-bs').classList.toggle('f40-iskemi', !k && s >= 1);
      svg.querySelector('.f40-bs-t').textContent = !k && s >= 1 ? 'beyin sapı · iskemi' : 'beyin sapı';
      svg.querySelector('.f40-bs-t').classList.toggle('f40-crit-t', !k && s >= 1);
      g('kc').classList.toggle('f40-yanan', k && s >= 1); g('ac').classList.toggle('f40-yanan', k && s >= 1);
      g('solm').classList.toggle('f40-yanan', k && s === 2);
      g('bag').classList.toggle('f40-yanan', k && s === 3); g('vmc').classList.toggle('f40-yanan', (k && s >= 3) || (!k && (s === 2 || s === 3)));
      g('sin').classList.toggle('f40-yanan', !k && s >= 3);
      refs.art.classList.toggle('f40-dar-art', s >= (k ? 4 : 2));
      const ws = !k && s >= 2;
      ['sk', 'sa'].forEach((p) => refs.P[p].classList.toggle('f40-kalin', ws));
      /* göstergeler */
      let map = 0.5, hr = 0.5, mo = '–', ho = '–';
      if (k && s >= 4) { map = 0.62; hr = 0.62; mo = '↑'; ho = '↑'; }
      if (!k && s >= 2) { map = 0.92; mo = '↑↑'; }
      if (!k && s >= 4) { hr = 0.26; ho = '↓'; }
      el.querySelector('[data-m="map"]').style.width = map * 100 + '%'; el.querySelector('[data-o="map"]').textContent = mo;
      el.querySelector('[data-m="hr"]').style.width = hr * 100 + '%'; el.querySelector('[data-o="hr"]').textContent = ho;
      el.querySelector('.f40-uclu').classList.toggle('on', !k && s >= 4);
      el.querySelector('.f40-uclu').hidden = k;
      no.textContent = s ? `Adım ${s}/4` : '';
      capYaz(el, s ? CAP[mod][s - 1] : CAP[mod + '0']);
      const b = el.querySelector('[data-a="oyn"]'); if (b) { b.textContent = oyn ? 'Duraklat' : 'Oynat'; b.setAttribute('aria-pressed', String(oyn)); }
      solCiz();
    };
    const solCiz = () => {
      const duz = mod === 'cush' && adim >= 4, p = [];
      for (let i = 0; i <= 100; i++) {
        const x = i * 2, t = tS + i * 0.06;
        const y = duz ? 20 - 13 * Math.sin(t * 2.1) * (0.5 + 0.5 * Math.sin(t * 0.7)) * (Math.sin(t * 0.33) > -0.2 ? 1 : 0.15) : 20 - 12 * Math.sin(t * 1.6);
        p.push(`${x} ${y.toFixed(1)}`);
      }
      solc.setAttribute('d', 'M' + p.join(' L'));
    };
    const ileri = () => { if (adim < 4) adim++; else adim = 1; durum(); };
    const onClick = (e) => {
      const m = e.target.closest('[data-mod]'), a = e.target.closest('[data-a]');
      if (m) { mod = m.dataset.mod; basSec(el, 'mod', mod); adim = 0; oyn = false; durum(); }
      else if (a) {
        if (a.dataset.a === 'adim') { oyn = false; ileri(); }
        else if (a.dataset.a === 'bas') { oyn = false; adim = 0; durum(); }
        else if (a.dataset.a === 'oyn') { oyn = !oyn; sure = 0; if (oyn && (adim === 0 || adim === 4)) { adim = 0; ileri(); } else durum(); }
      }
    };
    el.addEventListener('click', onClick);
    const durDar = darIzle(el, (n) => { dar = n; ikili.classList.toggle('f40-tek', n); if (!refs) ciz(); });
    void dar;
    const durTik = RM ? () => {} : ticker(el, (dt) => {
      if (oyn) { sure += dt; if (sure >= 2.5) { sure = 0; if (adim >= 4) { oyn = false; durum(); } else ileri(); } }
      tS += dt;
      const ak = akan();
      Object.entries(refs.d).forEach(([key, d]) => { if (ak.includes(key)) d.adim(dt, key === 'sa' && mod === 'cush' ? 4.5 : 2.4, 1.3); });
      const bpm = mod === 'kemo' ? (adim >= 4 ? 1.6 : 1.2) : (adim >= 4 ? 0.8 : 1.2);
      const ph = (tS * bpm) % 1, sc = 1 + 0.1 * Math.exp(-ph * 9);
      refs.kalp.setAttribute('transform', `translate(314 182) scale(${sc.toFixed(3)}) translate(-314 -182)`);
      solCiz();
    });
    return () => { durDar(); durTik(); el.removeEventListener('click', onClick); };
  };

  /* =====================================================================
     6 · f40_dagilim — kanamada organ akımları (K1 s. 172)
     ===================================================================== */
  VIZ.f40_dagilim = (el) => {
    const CAP = [
      [10, '<b>Kanamadan önce.</b> Bütün organ akımları dinlenme düzeyinde. Zamanı ilerletin: sempatik çıkış artınca hangi organın akımı korunur, hangisininki düşer? [[K1 s. 172]]'],
      [30, '<b>Saniyeler · refleksler.</b> RA\'daki düşük basınç mekanoreseptörleri ile karotis sinüsü ve aort kavsi baroreseptörleri kanamayı algılar; sempatik çıkış artar: kayıpla orantılı taşikardi, kontraktilite artışı, genel arteriol vazokonstriksiyonu. [[K1 s. 172]]'],
      [70, '<b>Otoregülasyon.</b> Böbrek, beyin ve kalp akımı önce düşer, sonra otoregülasyonla normale yakın döner; deri, bağırsak ve iskelet kası akımı belirgin düşer. Kapasitans venlerinin daralması venöz dönüşü korur. [[K1 s. 172]]'],
      [101, '<b>Laktik asit ve takipne.</b> Akımı düşen dokularda anaerobik metabolizma laktik asit üretir; arteriyel pH düşer ve karotis cisimcikleri üzerinden solunum merkezi uyarılır: takipne. [[K1 s. 172]]'],
    ];
    const kor = (t) => (t < 10 ? 1 : t < 30 ? 1 - 0.25 * ease((t - 10) / 20) : t < 60 ? 0.75 + 0.2 * ease((t - 30) / 30) : 0.95);
    const fed = (t) => (t < 10 ? 1 : t < 40 ? 1 - 0.7 * ease((t - 10) / 30) : 0.3);
    const sym = (t) => clamp((t - 10) / 20, 0, 1);
    const ORG = [['Beyin', 0], ['Kalp', 0], ['Böbrek', 0], ['Deri', 1], ['Bağırsak', 1], ['İskelet kası', 1]];
    const ZIN = ['anaerobik metabolizma', 'laktik asit', 'arteriyel pH ↓', 'karotis cisimcikleri', 'takipne'];
    let t = RM ? 100 : 0, oyn = false, ph = 0, capI = -1;
    el.innerHTML = `<div class="f40-ust"><label class="f40-rng f40-rng-gen"><span>Kanamadan sonra <b data-o="t">önce</b></span><input type="range" min="0" max="100" step="1" value="${t}" aria-label="Kanamadan sonra geçen zaman (temsilî)"><span class="f40-olcek"><i>önce</i><i>saniyeler</i><i>dakikalar</i></span></label>
      ${RM ? '' : '<button type="button" class="btn ghost f40-btn" data-a="oyn" aria-pressed="false">Oynat</button>'}</div>
      <div class="f40-algi"><span class="f40-cip">RA düşük basınç mekanoreseptörleri</span><span class="f40-cip">karotis sinüsü, aort kavsi baroreseptörleri</span><span class="f40-ok">→</span><span class="f40-cip">vazomotor merkez</span><span class="f40-ok">→</span><span class="f40-cip f40-cip-w" data-o="sym">sempatik çıkış ↑</span></div>
      <div class="f40-ikili"><div class="f40-sahne"><svg class="f40-svg f40-buyuk" viewBox="0 0 360 262" role="img" aria-label="Altı organın akımı, dinlenmenin yüzdesi olarak (temsilî)">
          ${tx(8, 18, 'otoregülasyon · korunur', 'f40-ts f40-b f40-ok-t', 'start')}${tx(8, 142, 'belirgin düşer', 'f40-ts f40-b f40-clin-t', 'start')}
          ${ORG.map(([a, g], i) => { const y = g ? 152 + (i - 3) * 30 : 28 + i * 30; return `${tx(8, y + 14, a, 'f40-t', 'start')}<rect class="f40-cubuk-z" x="104" y="${y}" width="240" height="18" rx="5"/><rect class="f40-cubuk ${g ? 'f40-cubuk-f' : 'f40-cubuk-k'}" data-o="${i}" x="104" y="${y}" width="200" height="18" rx="5"/>`; }).join('')}
          <line class="f40-dinl" x1="304" x2="304" y1="24" y2="236"/>${tx(304, 254, 'dinlenme', 'f40-ts')}
        </svg></div>
        <div class="f40-yan"><svg class="f40-svg f40-buyuk" viewBox="0 0 300 176" role="img" aria-label="Kapasitans veni ve kalp">
          ${tx(150, 18, 'kapasitans venleri', 'f40-t f40-b f40-bas-t')}
          <path class="f40-venk" d="M24 48 H262"/><path class="f40-venok" d="M262 30 L292 48 L262 66 Z"/>
          <text class="f40-ts f40-bas-t" data-o="vn" x="150" y="88" text-anchor="middle">kompliyans ↓ → venöz dönüş korunur</text>
          <path class="f40-kalp" d="M62 128 C62 118 48 112 42 122 C36 112 22 118 22 128 C22 142 42 152 42 160 C42 152 62 142 62 128 Z"/>
          <g data-o="kl">${tx(80, 134, 'HR ↑ (kayıpla orantılı)', 'f40-ts f40-warn-t', 'start')}${tx(80, 152, 'kontraktilite ↑', 'f40-ts f40-warn-t', 'start')}</g>
        </svg></div></div>
      <div class="f40-zincir f40-zin">${ZIN.map((s, i) => `<span class="f40-cip" data-z="${i}">${s}</span>`).join('<span class="f40-ok">→</span>')}</div>`;
    const rng = el.querySelector('input[type=range]'), ven = el.querySelector('.f40-venk'), kalp = el.querySelector('.f40-kalp');
    const ciz = () => {
      const k = kor(t), f = fed(t), s = sym(t);
      el.querySelectorAll('.f40-cubuk').forEach((r) => { const i = +r.dataset.o; r.setAttribute('width', (200 * (ORG[i][1] ? f : k)).toFixed(1)); });
      el.querySelector('[data-o="t"]').textContent = t < 10 ? 'önce' : t < 30 ? 'saniyeler' : 'dakikalar';
      el.querySelector('[data-o="sym"]').classList.toggle('on', t > 10);
      el.querySelectorAll('.f40-algi .f40-cip').forEach((c) => c.classList.toggle('acik', t > 10));
      ven.style.strokeWidth = (30 - 14 * s).toFixed(1);
      el.querySelector('[data-o="vn"]').style.opacity = (0.15 + 0.85 * clamp((t - 25) / 15, 0, 1)).toFixed(2);
      el.querySelector('[data-o="kl"]').style.opacity = (0.15 + 0.85 * s).toFixed(2);
      el.querySelectorAll('[data-z]').forEach((c) => c.classList.toggle('on', t >= 70 + 6 * +c.dataset.z));
      const ci = CAP.findIndex(([lim]) => t < lim);
      if (ci !== capI) { capI = ci; capYaz(el, CAP[ci][1]); }
    };
    const onInput = () => { t = +rng.value; oyn = false; buton(); ciz(); };
    const buton = () => { const b = el.querySelector('[data-a="oyn"]'); if (b) { b.textContent = oyn ? 'Duraklat' : 'Oynat'; b.setAttribute('aria-pressed', String(oyn)); } };
    const onClick = (e) => { const a = e.target.closest('[data-a="oyn"]'); if (a) { oyn = !oyn; if (oyn && t >= 100) t = 0; buton(); } };
    rng.addEventListener('input', onInput); el.addEventListener('click', onClick);
    ciz();
    const ikili = el.querySelector('.f40-ikili');
    const durDar = darIzle(el, (n) => ikili.classList.toggle('f40-tek', n));
    const durTik = RM ? () => {} : ticker(el, (dt) => {
      if (oyn) { t = Math.min(100, t + dt * 12.5); rng.value = Math.round(t); if (t >= 100) { oyn = false; buton(); } ciz(); }
      ph = (ph + dt * (1.1 + 1.2 * sym(t))) % 1;
      const sc = 1 + 0.1 * Math.exp(-ph * 9);
      kalp.setAttribute('transform', `translate(42 136) scale(${sc.toFixed(3)}) translate(-42 -136)`);
    });
    return () => { durDar(); durTik(); rng.removeEventListener('input', onInput); el.removeEventListener('click', onClick); };
  };

  /* =====================================================================
     7 · f40_onarim — kanamadan sonra onarım zaman çizelgesi (K1 s. 172–173)
     ===================================================================== */
  VIZ.f40_onarim = (el) => {
    const DUR = [['0', '30 dk', 0.5], ['1', 'saatler', 6], ['2', '2 gün', 48], ['3', '4–6 gün', 120], ['4', '8 hafta', 1344]];
    const KART = [
      ['İlk 30 dakika', ['<b>Transkapiller dolum:</b> arteriol vazokonstriksiyonu → kapiller hidrostatik basıncı ↓ → interstisyel sıvı kapillere döner (≈ 500 mL / 30 dk)', '<b>Glukoz ↑</b> (karaciğerde sempatik glikojenoliz ve glukoneogenez) → plazma ozmotik basıncı ↑ → hücre dışı alandan su; dolumla aynı ya da daha fazla hacim'], 'starling'],
      ['Dakikalar–saatler · böbrek', ['RBF ↓ → GFR ↓ → idrar ↓', 'RAA ↑ (sempatik ↑, RBF ↓, makula densaya Na⁺ ↓) → Na⁺ ve su geri emilimi, başlıca DCT', 'Atriyum ve ventrikül gerilmesi ↓ → ANP, BNP ↓ → Na⁺ ve su atılımı ↓', 'ADH: vazopresör (noradrenalin etkisini güçlendirir), toplayıcı kanalda su geri emilimi, susama', 'Kortizol ↑: küçük mineralokortikoid etki (DCT, toplayıcı kanal), glukoneogenez'], 'bobrek'],
      ['2 gün', ['Plazma hacmi normal: ağızdan su alımı + böbrekte elektrolit geri emilimi', 'Yalnız su ve elektrolit döndü → hematokrit ve plazma proteini düşük']],
      ['4–6 gün', ['Karaciğer albümini hızla yapar → plazma albümini normal']],
      ['8 hafta', ['Hemoglobin normal (yeterli demir varsa)']],
    ];
    const CAP = [
      '<b>İlk 30 dakika.</b> Transkapiller dolum ≈ 500 mL interstisyel sıvıyı damar içine alır; glukozun çektiği su da buna eşit ya da daha fazladır. Zaman çizelgesinde ilerleyin. [[K1 s. 172]]',
      '<b>Dakikalar–saatler · böbrek.</b> Hipotansiyon RBF ve GFR\'yi düşürür; RAA, ADH ve kortizol Na⁺ ve suyu tutar, ANP ve BNP azalır. ADH ayrıca vazopresördür ve susama yaratır. [[K1 s. 172–173]]',
      '<b>2 gün.</b> Plazma hacmi ağızdan su ve böbrekte elektrolit geri emilimiyle düzelir; ama kan seyrelmiştir: hematokrit ve plazma proteini düşüktür. [[K1 s. 173]]',
      '<b>4–6 gün.</b> Karaciğerin hızlı sentezi plazma albüminini normale getirir. [[K1 s. 173]]',
      '<b>8 hafta.</b> Hemoglobin konsantrasyonu, yeterli demir varsa 8 hafta içinde normale döner. [[K1 s. 173]]',
    ];
    const EG = [
      ['pv', 'Plazma hacmi', [[0, 0.72], [0.3, 0.73], [0.5, 0.86], [6, 0.93], [48, 1], [1344, 1]], true],
      ['hct', 'Hematokrit, plazma proteini', [[0, 1], [0.5, 0.97], [6, 0.9], [48, 0.83], [120, 0.84], [1344, 0.99]]],
      ['alb', 'Albümin', [[0, 1], [0.5, 0.98], [6, 0.92], [48, 0.87], [120, 1], [1344, 1]]],
      ['hb', 'Hemoglobin', [[0, 1], [0.5, 0.97], [6, 0.89], [48, 0.79], [120, 0.8], [1344, 1]]],
    ];
    const LMIN = Math.log10(0.2), LMAX = Math.log10(1344);
    const u = (h) => (h <= 0.2 ? 0 : (Math.log10(h) - LMIN) / (LMAX - LMIN));
    let sec = 0, dar = false, cx = 0, refs = null, durTw = () => {};
    const clipId = yeniId('clip');
    el.innerHTML = `<div class="f40-ust">${segHtml('Zaman durağı', 'dur', DUR.map(([v, l]) => [v, l]), '0', 'f40-seg')}</div>
      <div class="f40-ikili"><div class="f40-sahne"><div class="f40-cizim"></div>
        <div class="f40-lej">${EG.map(([k, a]) => `<span><i class="f40-lj-${k}"></i>${a}</span>`).join('')}</div></div>
      <div class="f40-yan f40-kart f40-mek" aria-live="off"></div></div>`;
    const kap = el.querySelector('.f40-cizim'), kart = el.querySelector('.f40-mek'), ikili = el.querySelector('.f40-ikili');
    const G = () => (dar ? { W: 360, X0: 16, Xb: 36, X1: 344 } : { W: 460, X0: 20, Xb: 42, X1: 444 });
    const Yt = 34, Yb = 222, Y = (f) => Yb - ((f - 0.62) / 0.46) * (Yb - Yt);
    const X = (h) => { const g = G(); return g.Xb + u(h) * (g.X1 - g.Xb); };
    const yol = (pts, dusus) => {
      const g = G(); let d = `M${g.X0} ${Y(1).toFixed(1)} L${g.Xb} ${Y(1).toFixed(1)}`;
      if (dusus) d += ` L${g.Xb} ${Y(pts[0][1]).toFixed(1)}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const [h0, f0] = pts[i], [h1, f1] = pts[i + 1], n = 12;
        for (let j = 1; j <= n; j++) { const s = j / n, uu = lerp(u(h0), u(h1), s); d += ` L${(g.Xb + uu * (G().X1 - g.Xb)).toFixed(1)} ${Y(lerp(f0, f1, ease(s))).toFixed(1)}`; }
      }
      return d;
    };
    const ciz = () => {
      const g = G();
      const tik = [[0, '0', 0], [0.5, '30 dk', 0], [6, '6 sa', 0], [48, '2 gün', 0], [120, '5 gün', 1], [1344, '8 hafta', 0]];
      kap.innerHTML = `<svg class="f40-svg${dar ? ' f40-dar' : ''}" viewBox="0 0 ${g.W} 272" role="img" aria-label="Kanamadan sonra plazma hacmi, hematokrit, albümin ve hemoglobinin logaritmik zaman çizelgesi">
        <defs><clipPath id="${clipId}"><rect class="f40-cliprect" x="0" y="0" width="0" height="272"/></clipPath></defs>
        <path class="f40-eksen" d="M${g.X0} ${Yb + 8} H${g.X1}"/>
        <line class="f40-ayar" x1="${g.X0}" x2="${g.X1}" y1="${Y(1)}" y2="${Y(1)}"/>${tx(g.Xb + 4, Y(1) - 7, 'normal', 'f40-ts', 'start')}
        ${tx(g.X1, Y(1) - 7, 'Hb: yeterli demir varsa', 'f40-ts f40-acc-t', 'end')}
        <line class="f40-kanama" x1="${g.Xb}" x2="${g.Xb}" y1="${Yt}" y2="${Yb + 8}"/>
        ${tik.map(([h, s, r]) => `<line class="f40-tik" x1="${X(h)}" x2="${X(h)}" y1="${Yb + 8}" y2="${Yb + 13}"/>${tx(X(h), Yb + 27 + r * 15, s, 'f40-ts', h === 1344 ? 'end' : 'middle')}`).join('')}
        ${tx(g.Xb, Yb + 42, 'kanama', 'f40-ts f40-crit-t', 'start')}
        ${tx(g.X0, 16, 'normalin %\'si (göreli) · zaman logaritmik →', 'f40-ts', 'start')}
        <g class="f40-soluk-e">${EG.map(([k, , p, d]) => `<path class="f40-e f40-e-${k}" d="${yol(p, d)}"/>`).join('')}</g>
        <g clip-path="url(#${clipId})">${EG.map(([k, , p, d]) => `<path class="f40-e f40-e-${k}" d="${yol(p, d)}"/>`).join('')}</g>
        <line class="f40-iml" y1="${Yt - 6}" y2="${Yb + 8}"/>
      </svg>`;
      const svg = kap.querySelector('svg');
      refs = { cr: svg.querySelector('.f40-cliprect'), iml: svg.querySelector('.f40-iml') };
      cx = X(DUR[sec][2]); yerles();
    };
    const yerles = () => { if (!refs) return; refs.cr.setAttribute('width', cx.toFixed(1)); refs.iml.setAttribute('x1', cx.toFixed(1)); refs.iml.setAttribute('x2', cx.toFixed(1)); };
    const sekil = (k) => k === 'starling'
      ? `<svg class="f40-svg f40-mini" viewBox="0 0 240 70" role="img" aria-label="Kapiller duvarından içeri dönen sıvı"><rect class="f40-kap" x="10" y="24" width="220" height="22" rx="11"/>${tx(120, 39, 'kapiller', 'f40-ts f40-crit-t')}${[40, 90, 150, 200].map((x) => `<path class="f40-icok" d="M${x} 4 V20 M${x - 4} 15 L${x} 20 L${x + 4} 15 M${x} 66 V50 M${x - 4} 55 L${x} 50 L${x + 4} 55"/>`).join('')}${tx(232, 12, 'interstisyum', 'f40-ts f40-bas-t', 'end')}</svg>`
      : k === 'bobrek'
        ? `<svg class="f40-svg f40-mini" viewBox="0 0 240 70" role="img" aria-label="Böbrek: Na⁺ ve su tutulur"><path class="f40-bobrek" d="M50 8 C20 8 12 34 16 46 C20 62 44 66 56 58 C64 52 58 42 64 36 C70 30 74 20 66 12 C62 9 56 8 50 8 Z"/>${tx(96, 30, 'Na⁺ ve su tutulur', 'f40-ts f40-ok-t', 'start')}${tx(96, 50, 'idrar ↓', 'f40-ts f40-crit-t', 'start')}</svg>`
        : '';
    const goster = () => {
      const [b, m, s] = KART[sec];
      kart.innerHTML = `<h4>${b}</h4>${sekil(s)}<ul class="f40-ul">${m.map((x) => `<li>${x}</li>`).join('')}</ul>`;
      capYaz(el, CAP[sec]);
    };
    const secDur = (i) => {
      sec = i; basSec(el, 'dur', String(i)); goster();
      const c0 = cx, c1 = X(DUR[i][2]);
      durTw(); durTw = tween(300, (q) => { cx = lerp(c0, c1, q); yerles(); });
    };
    const onClick = (e) => { const b = e.target.closest('[data-dur]'); if (b) secDur(+b.dataset.dur); };
    el.addEventListener('click', onClick);
    const durDar = darIzle(el, (n) => { dar = n; ikili.classList.toggle('f40-tek', n); ciz(); });
    goster();
    return () => { durDar(); durTw(); el.removeEventListener('click', onClick); };
  };

  /* =====================================================================
     8 · f40_sok — kan kaybı ve şok sınıfları (Tablo 40.1, K1 s. 173)
     ===================================================================== */
  VIZ.f40_sok = (el) => {
    const TAB = [
      { HR: '< 100/dk', SBP: 'normal', DBP: 'normal', RR: '< 20/dk', U: '> 30 mL/sa', B: 'normal' },
      { HR: '> 100/dk', SBP: 'normal', DBP: 'yüksek', RR: '20–30/dk', U: '20–30 mL/sa', B: 'anksiyöz' },
      { HR: '> 120/dk', SBP: 'düşük', DBP: 'düşük', RR: '30–40/dk', U: '5–15 mL/sa', B: 'konfüze' },
      { HR: '> 140/dk', SBP: 'çok düşük', DBP: 'çok düşük', RR: '> 35/dk', U: 'ihmal edilebilir', B: 'uykulu ya da bilinçsiz' },
    ];
    const sinifi = (p) => (p < 15 ? 1 : p < 30 ? 2 : p <= 40 ? 3 : 4);
    const capM = (p, s, hizli) => [
      `<b>%${p} kayıp · sınıf 1.</b> HR &lt; 100/dk, sistolik ve diyastolik basınç normal. Kaydırıcıyla kaybı artırın. [[K1 s. 173]]`,
      `<b>%${p} kayıp · sınıf 2 · kompanse.</b> HR &gt; 100/dk; SBP normal, DBP yüksek; hasta anksiyöz. Kan basıncı korunduğu için kompanse şoktur. [[K1 s. 173]]`,
      `<b>%${p} kayıp · sınıf 3 · dekompanse.</b> &gt; %30 hızlı kayıpta kompansasyon MAP'yi koruyamaz: SBP ve DBP düşer, hasta konfüzedir. Gerilmiş hacimden gerilmemiş hacme geçilmiştir. [[K1 s. 173]]`,
      hizli ? `<b>%${p} kayıp · sınıf 4 · dekompanse.</b> Paradoks vazodilatasyon ve taşikardide azalma (olasılıkla endojen opioidler) → miyokard iskemisi, kardiyak depresyon, MAP'de hızlı düşüş. Dekompanse şokta mortalite &gt; %50. [[K1 s. 173]]`
        : `<b>%${p} kayıp · sınıf 4.</b> HR &gt; 140/dk, SBP çok düşük, idrar ihmal edilebilir, hasta uykulu ya da bilinçsiz. Dekompanse şokta mortalite &gt; %50. [[K1 s. 173]]`,
    ][s - 1];
    const hrF = (p, hizli) => { const b = 0.15 + 0.016 * p; return hizli && p > 40 ? 0.79 + 0.01 * (p - 40) - 0.0045 * (p - 40) * (p - 40) : b; };
    const sbpF = (p) => (p <= 30 ? 0.75 : p <= 40 ? 0.75 - 0.25 * ((p - 30) / 10) : 0.5 - 0.35 * ((p - 40) / 10));
    let p = 10, hizli = true, dar = false, refs = null;
    el.innerHTML = `<div class="f40-ust"><label class="f40-rng f40-rng-gen"><span>Kan kaybı <b data-o="p"></b></span><input type="range" min="0" max="50" step="1" value="10" aria-label="Kan kaybı (%)"></label>
      ${segHtml('Kayıp hızı', 'hiz', [['h', 'Hızlı kayıp'], ['y', 'Yavaş kayıp']], 'h', 'f40-seg')}</div>
      <div class="f40-ikili f40-ikili-sok"><div class="f40-sahne"><div class="f40-cizim"></div><p class="f40-not f40-parnot" hidden>Hızlı kayıp: %40'ın üzerinde HR eğrisi aşağı kıvrılır → taşikardi azalır (paradoks).</p></div>
      <div class="f40-yan"><div class="f40-kart f40-monitor"><div class="f40-rozet-b" data-o="roz"></div><dl class="f40-dl f40-dl-m" data-o="dl"></dl></div>
        <svg class="f40-svg f40-buyuk f40-damar" viewBox="0 0 320 140" role="img" aria-label="Damar kesiti: gerilmemiş ve gerilmiş hacim">
          <circle class="f40-duvar" cx="62" cy="62" r="50"/><circle class="f40-gerilmis" cx="62" cy="62" r="40"/><circle class="f40-gerilmemis" cx="62" cy="62" r="28"/>
          ${satir(124, 34, ['dış: gerilmiş hacim', '(duvarı gerer)'], 15, 'f40-ts f40-crit-t', 'start')}${satir(124, 76, ['iç: gerilmemiş hacim', '(lümeni doldurur)'], 15, 'f40-ts f40-ink', 'start')}
          <text class="f40-ts f40-b f40-crit-t" data-o="gec" x="8" y="132" text-anchor="start">gerilmişten gerilmemiş hacme geçiş</text>
        </svg></div></div>`;
    const kap = el.querySelector('.f40-cizim'), rng = el.querySelector('input[type=range]'), ikili = el.querySelector('.f40-ikili');
    const G = () => (dar ? { W: 360, X0: 30, X1: 348 } : { W: 470, X0: 34, X1: 384 });
    const Y0 = 226, Yt = 48, Y = (f) => Y0 - f * (Y0 - Yt);
    const X = (q) => { const g = G(); return g.X0 + (q / 50) * (g.X1 - g.X0); };
    const yol = (fn) => { const a = []; for (let q = 0; q <= 50; q += 0.5) a.push(`${X(q).toFixed(1)} ${Y(fn(q)).toFixed(1)}`); return 'M' + a.join(' L'); };
    const ciz = () => {
      const g = G();
      const bant = [[0, 15, 'Sınıf 1', 'ok'], [15, 30, 'Sınıf 2', 'ok'], [30, 40, 'Sınıf 3', 'crit'], [40, 50, 'Sınıf 4', 'crit']];
      kap.innerHTML = `<svg class="f40-svg${dar ? ' f40-dar' : ''}" viewBox="0 0 ${g.W} 270" role="img" aria-label="Kan kaybına göre HR ve SBP (şematik), şok sınıfı bantlarıyla">
        ${bant.map(([a, b, s, c], i) => `<rect class="f40-bnt f40-bnt-${c}${i % 2 ? ' f40-bnt-2' : ''}" x="${X(a)}" y="${Yt - 8}" width="${X(b) - X(a)}" height="${Y0 - Yt + 8}"/>${tx((X(a) + X(b)) / 2, Y0 - 8, s, 'f40-ts f40-b f40-ink')}`).join('')}
        ${tx((X(0) + X(30)) / 2, Yt - 16, 'kompanse', 'f40-ts f40-b f40-ok-t')}${tx((X(30) + X(50)) / 2, Yt - 16, 'dekompanse', 'f40-ts f40-b f40-crit-t')}
        <path class="f40-eksen" d="M${g.X0} ${Yt - 8} V${Y0} H${g.X1}"/>
        ${[0, 15, 30, 40, 50].map((q) => `<line class="f40-tik" x1="${X(q)}" x2="${X(q)}" y1="${Y0}" y2="${Y0 + 5}"/>${tx(X(q), Y0 + 19, q, 'f40-ts')}`).join('')}
        ${tx((g.X0 + g.X1) / 2, Y0 + 38, 'Kan kaybı (%)', 'f40-ts f40-b')}
        <text class="f40-ts" transform="translate(14 ${(Y0 + Yt) / 2}) rotate(-90)" text-anchor="middle">göreli</text>
        <path class="f40-sbp" d="${yol(sbpF)}"/>
        ${tx(X(14), Y(0.75) - 8, 'SBP normal', 'f40-ts f40-crit-t')}${tx(X(37), Y(sbpF(37)) + 20, 'düşük', 'f40-ts f40-crit-t')}${tx(X(43), Y(sbpF(43)) + 24, 'çok düşük', 'f40-ts f40-crit-t', 'end')}
        <path class="f40-hr" d=""/>${tx(X(2), Y(hrF(2)) - 10, 'HR', 'f40-ts f40-b f40-warn-t', 'start')}
        <g class="f40-hrn"></g>
        <g class="f40-parT">${dar ? '' : satir(g.X1 + 4, Y(0.62), ['taşikardi', 'azalır', '(paradoks)'], 14, 'f40-ts f40-warn-t', 'start')}</g>
        <line class="f40-iml" y1="${Yt - 8}" y2="${Y0}"/><circle class="f40-imln f40-imln-w" r="5"/><circle class="f40-imln f40-imln-c" r="5"/>
      </svg>`;
      const svg = kap.querySelector('svg');
      el.querySelector('.f40-parnot').hidden = !(dar && hizli);
      refs = { svg, hr: svg.querySelector('.f40-hr'), hrn: svg.querySelector('.f40-hrn'), par: svg.querySelector('.f40-parT'), iml: svg.querySelector('.f40-iml'), nw: svg.querySelector('.f40-imln-w'), nc: svg.querySelector('.f40-imln-c') };
      egri(); guncelle();
    };
    const egri = () => {
      if (!refs) return;
      refs.hr.setAttribute('d', yol((q) => hrF(q, hizli)));
      refs.hrn.innerHTML = [[7, '&lt; 100'], [22, '&gt; 100'], [35, '&gt; 120'], [42, '&gt; 140']].map(([q, s]) => `<circle class="f40-hrd" cx="${X(q)}" cy="${Y(hrF(q, hizli))}" r="4"/>${tx(X(q), Y(hrF(q, hizli)) - 9, s, 'f40-ts f40-warn-t')}`).join('');
      refs.par.style.display = hizli ? '' : 'none';
      el.querySelector('.f40-parnot').hidden = !(dar && hizli);
    };
    const guncelle = () => {
      const s = sinifi(p), d = TAB[s - 1], komp = s <= 2;
      el.querySelector('[data-o="p"]').textContent = `%${p} · ≈ ${p * 50} mL`;
      el.querySelector('[data-o="roz"]').className = `f40-rozet-b ${komp ? 'ok' : 'crit'}`;
      el.querySelector('[data-o="roz"]').textContent = `Sınıf ${s} · ${komp ? 'kompanse' : 'dekompanse'}`;
      el.querySelector('[data-o="dl"]').innerHTML = [['HR', d.HR], ['SBP', d.SBP], ['DBP', d.DBP], ['Solunum sayısı', d.RR], ['İdrar', d.U], ['Bilinç', d.B]].map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('');
      if (refs) {
        refs.iml.setAttribute('x1', X(p)); refs.iml.setAttribute('x2', X(p));
        refs.nw.setAttribute('cx', X(p)); refs.nw.setAttribute('cy', Y(hrF(p, hizli)));
        refs.nc.setAttribute('cx', X(p)); refs.nc.setAttribute('cy', Y(sbpF(p)));
      }
      const th = 12 * (1 - Math.min(p, 30) / 30), ri = 28 * (p > 30 ? 1 - 0.35 * ((p - 30) / 20) : 1);
      const ger = el.querySelector('.f40-gerilmis'), gm = el.querySelector('.f40-gerilmemis');
      ger.setAttribute('r', (ri + th / 2).toFixed(1)); ger.style.strokeWidth = th.toFixed(1); ger.style.opacity = th > 0.3 ? 1 : 0;
      gm.setAttribute('r', ri.toFixed(1));
      el.querySelector('.f40-duvar').setAttribute('r', (ri + th + 4).toFixed(1));
      el.querySelector('[data-o="gec"]').style.opacity = p >= 30 ? 1 : 0;
      capYaz(el, capM(p, s, hizli));
    };
    const onInput = () => { p = +rng.value; guncelle(); };
    const onClick = (e) => { const b = e.target.closest('[data-hiz]'); if (b) { hizli = b.dataset.hiz === 'h'; basSec(el, 'hiz', b.dataset.hiz); egri(); guncelle(); } };
    rng.addEventListener('input', onInput); el.addEventListener('click', onClick);
    const durDar = darIzle(el, (n) => { dar = n; ikili.classList.toggle('f40-tek', n); ciz(); });
    return () => { durDar(); rng.removeEventListener('input', onInput); el.removeEventListener('click', onClick); };
  };
})();
