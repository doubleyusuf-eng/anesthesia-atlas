/* Bölüm 65 · Karaciğer: anatomi ve kanlanma · bileşenler (K1 s. 295–298).
   Sayılar yalnız kitaptandır (akımlar, satürasyonlar, %60/%80/%10, %50); damar kalınlığı, çubuk boyu ve tampon yanıtın
   büyüklüğü şematiktir. Her bileşen geniş (≥ 560 px) ve dar (390 px) yerleşimi ayrı çizer. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const capOf = (el) => el.closest('.viz').querySelector('.viz-cap');
  const say = (el, h) => { capOf(el).innerHTML = REF(h); };

  /* ---------- ortak yardımcılar ---------- */
  const T = (x, y, t, o = {}) => {
    const L = Array.isArray(t) ? t : [t];
    const st = (o.s ? `font-size:${o.s}px;` : '') + (o.ls ? `letter-spacing:${o.ls}px;` : '');
    return `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" class="f65-tx ${o.c || ''}"${st ? ` style="${st}"` : ''}>${L.map((l, i) => `<tspan x="${x}" dy="${i ? o.lh || 13 : 0}">${l}</tspan>`).join('')}</text>`;
  };
  const box = (x, y, w, h) => `<rect class="f65-kutu" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>` + T(x + w / 2, y + 18, 'KARACİĞER', { c: 'm', ls: 1 });
  const seg = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const svgW = (w, h, lab, inner, y0 = 0) => `<svg class="f65-svg" viewBox="0 ${y0} ${w} ${h}" role="img" aria-label="${lab}">${inner}</svg>`;
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };

  /* Genişliğe göre geniş/dar yerleşimi kurar; mod değişince build(mod) yeniden çalışır. */
  function kur(el, build) {
    let mode = null, cl = null;
    const dene = () => {
      const m = el.clientWidth && el.clientWidth < 560 ? 'n' : 'w';
      if (m !== mode) { if (cl) cl(); mode = m; cl = build(m); }
    };
    dene();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(dene) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); if (cl) cl(); };
  }

  /* Akan parçacıklar: defs = [{n, r, f(u)->[x,y], cls, st(u), sp}] */
  function mkParts(g, defs) {
    const L = [];
    defs.forEach((d) => { for (let i = 0; i < d.n; i++) { const c = mk('circle', { r: d.r || 3.5, class: d.cls || '' }, g); L.push({ c, d, i }); } });
    return (t) => {
      for (const { c, d, i } of L) {
        const u = (((i / d.n) + t * (d.sp || 0.25)) % 1 + 1) % 1;
        const p = d.f(u);
        c.setAttribute('cx', p[0].toFixed(1)); c.setAttribute('cy', p[1].toFixed(1));
        if (d.st) c.setAttribute('style', d.st(u));
        if (d.op) c.setAttribute('opacity', d.op(u).toFixed(2));
      }
    };
  }

  /* ============================================================
     1 · İki kaynak, iki görev
     ============================================================ */
  VIZ.f65_cift = (el) => {
    let tok = false, akis = true, t = 0, upd = null;
    const CAP = {
      ac: "<b>Açlık.</b> Portal kanın satürasyonu yaklaşık %85'tir. Toplam akım 1500 mL/dk: hepatik arterler 500 mL/dk, portal ven 1000 mL/dk. Oksijenin yarısını arter, yarısını portal ven getirir. Tokluk düğmesine basın. [[K1 s. 295]]",
      tok: '<b>Tokluk.</b> Karın organlarından geçen kan daha çok oksijen bıraktığı için portal satürasyon yaklaşık %70\'e düşer. Şemada akımlar aynı bırakılmıştır; kitap tokluktaki akım değeri vermez. [[K1 s. 295]]',
    };
    return kur(el, (m) => {
      const N = m === 'n';
      el.innerHTML = `<div class="btn-row f65-ctl">${seg('Beslenme durumu', 'd', [['ac', 'Açlık'], ['tok', 'Tokluk']], tok ? 'tok' : 'ac')}<button type="button" class="btn ghost" data-ak aria-pressed="${akis}">${akis ? 'Akışı durdur' : 'Akışı başlat'}</button></div><div class="f65-sv"></div>`;
      const sv = el.querySelector('.f65-sv');
      const render = () => {
        const sat = tok ? '%70' : '%85';
        const badge = (x, y, w, h) => `<rect class="f65-rozet ${tok ? 'tok' : ''}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>` + T(x + w / 2, y + h / 2 + 6, 'SaO₂ ' + sat, { s: 18, c: 'b' });
        let s, defs;
        if (!N) {
          s = box(250, 70, 170, 150) +
            `<rect class="f65-va" x="20" y="103" width="230" height="14" rx="7"/><rect class="f65-vp" x="100" y="192" width="150" height="26" rx="13"/><rect class="f65-vh" x="420" y="130" width="180" height="30" rx="15"/>` +
            T(20, 80, ['Hepatik arterler', '500 mL/dk · akımın ⅓\'ü'], { a: 'start', c: 'b' }) +
            T(425, 96, ['Hepatik ven · 1500 mL/dk', 'kalp debisinin %25\'i'], { a: 'start', c: 'b' }) +
            T(110, 238, ['Portal ven', '1000 mL/dk'], { a: 'start', c: 'b' }) +
            [150, 178, 206, 234].map((y, i) => `<rect class="f65-chip" x="4" y="${y}" width="92" height="22" rx="6"/>` + T(50, y + 15, ['Bağırsaklar', 'Mide', 'Dalak', 'Pankreas'][i]) + `<path class="f65-ok" d="M96 ${y + 11} L108 205"/>`).join('') +
            T(4, 276, 'iki kapiller sistemi bağlar', { a: 'start', c: 'm' }) +
            `<rect class="f65-rozet" x="130" y="122" width="100" height="19" rx="6"/>` + T(180, 135, 'SaO₂ yüksek') + badge(130, 146, 112, 38) +
            `<rect class="f65-ob a" x="170" y="262" width="160" height="26" rx="4"/><rect class="f65-ob p" x="330" y="262" width="160" height="26" rx="4"/>` + T(250, 279, 'arter: oksijenin yarısı') + T(410, 279, 'portal ven: oksijenin yarısı') +
            '<g class="f65-p"></g>';
          defs = [
            { n: 4, f: (u) => [20 + 230 * u, 110], cls: 'f65-pa' },
            { n: 8, f: (u) => [100 + 150 * u, 205], cls: tok ? 'f65-pt' : 'f65-pp' },
            { n: 12, f: (u) => [420 + 180 * u, 145], cls: 'f65-pv' },
          ];
          sv.innerHTML = svgW(640, 240, 'Karaciğere iki damarla kan gelir: hepatik arter ve portal ven; tek damarla çıkar: hepatik ven', s, 62);
        } else {
          s = box(60, 180, 270, 100) +
            `<rect class="f65-va" x="93" y="70" width="14" height="110" rx="7"/><rect class="f65-vp" x="277" y="62" width="26" height="118" rx="13"/><rect class="f65-vh" x="180" y="280" width="30" height="70" rx="15"/>` +
            `<rect class="f65-chip" x="200" y="6" width="180" height="22" rx="6"/>` + T(290, 21, 'Bağırsaklar · Mide') + `<rect class="f65-chip" x="200" y="32" width="180" height="22" rx="6"/>` + T(290, 47, 'Dalak · Pankreas') +
            `<path class="f65-ok" d="M290 54 L290 62"/>` + T(8, 22, ['iki kapiller', 'sistemi bağlar'], { a: 'start', c: 'm' }) +
            T(112, 90, ['Hepatik arterler', '500 mL/dk', 'akımın ⅓\'ü'], { a: 'start', c: 'b' }) + T(268, 90, ['Portal ven', '1000 mL/dk'], { a: 'end', c: 'b' }) +
            `<rect class="f65-rozet" x="8" y="124" width="84" height="19" rx="6"/>` + T(50, 137, 'SaO₂ yüksek') + badge(150, 128, 112, 38) +
            T(218, 308, ['Hepatik ven · 1500 mL/dk', 'kalp debisinin %25\'i'], { a: 'start', c: 'b' }) +
            `<rect class="f65-ob a" x="20" y="378" width="175" height="26" rx="4"/><rect class="f65-ob p" x="195" y="378" width="175" height="26" rx="4"/>` + T(107, 395, 'arter: oksijenin yarısı') + T(282, 395, 'portal: oksijenin yarısı') +
            '<g class="f65-p"></g>';
          defs = [
            { n: 4, f: (u) => [100, 70 + 110 * u], cls: 'f65-pa' },
            { n: 8, f: (u) => [290, 62 + 118 * u], cls: tok ? 'f65-pt' : 'f65-pp' },
            { n: 8, f: (u) => [195, 280 + 70 * u], cls: 'f65-pv' },
          ];
          sv.innerHTML = svgW(390, 420, 'Karaciğere iki damarla kan gelir: hepatik arter ve portal ven; tek damarla çıkar: hepatik ven', s);
        }
        upd = mkParts(sv.querySelector('.f65-p'), defs);
        upd(t);
      };
      render();
      el.querySelectorAll('[data-d]').forEach((b) => { b.onclick = () => { tok = b.dataset.d === 'tok'; basSec(el, 'd', tok ? 'tok' : 'ac'); render(); say(el, tok ? CAP.tok : CAP.ac); }; });
      const ak = el.querySelector('[data-ak]');
      ak.onclick = () => { akis = !akis; ak.setAttribute('aria-pressed', String(akis)); ak.textContent = akis ? 'Akışı durdur' : 'Akışı başlat'; };
      if (RM) { ak.hidden = true; return () => {}; }
      return ticker(el, (dt) => { if (akis && upd) { t += dt; upd(t); } });
    });
  };

  /* ============================================================
     2 · Hepatik arteriyel tampon yanıt
     ============================================================ */
  VIZ.f65_tampon = (el) => {
    let A = 1000, B = 500;
    const CAP = {
      r: '<b>Dinlenme.</b> Hepatik arter 500 mL/dk, portal ven 1000 mL/dk, toplam 1500 mL/dk. Portal akımı azaltın: hepatik arter adenozine bağlı vazodilatasyonla genişler ve toplam akımı korur. Sonra hepatik arter akımını azaltın; portal venin karşılık veremediğini görün. [[K1 s. 295]]',
      a: '<b>Portal akım düştü.</b> Hepatik arterler adenozin aracılığıyla genişler ve toplam karaciğer kan akımını korumaya çalışır: tampon yanıtın çalıştığı yön budur. [[K1 s. 295]]',
      b: '<b>Arteriyel akım düştü.</b> Portal ven karşılık veremez; duvarında çok az düz kas vardır, akım basınç gradiyentiyle orantılıdır. İlişki bu yüzden <i>yarı</i> karşılıklıdır. [[K1 s. 295]]',
    };
    const model = () => {
      const tampon = Math.min(B * 0.6, (1000 - A) * 0.5);
      const arter = B + tampon;
      return { tampon, arter, toplam: arter + A };
    };
    return kur(el, (m) => {
      const N = m === 'n';
      el.innerHTML = `<div class="f65-sv"></div>
        <dl class="kv f65-kv"><dt>Hepatik arter</dt><dd data-o="a"></dd><dt>Portal ven</dt><dd data-o="p"></dd><dt>Toplam</dt><dd data-o="t"></dd></dl>
        <div class="f65-ctl2">
          <label class="f65-rng"><span>Portal ven akımı <b data-o="A"></b></span><input type="range" min="0" max="1000" step="50" value="${A}" data-r="A" aria-label="Portal ven akımı, mL/dk"></label>
          <label class="f65-rng"><span>Hepatik arter akımı (damar hastalığı/ilaç) <b data-o="B"></b></span><input type="range" min="0" max="500" step="25" value="${B}" data-r="B" aria-label="Hepatik arter akımı, mL/dk"></label>
          <button type="button" class="btn ghost" data-reset>Başa dön</button>
        </div>`;
      const sv = el.querySelector('.f65-sv');
      const o = (k) => el.querySelector(`[data-o="${k}"]`);
      const sA = el.querySelector('[data-r="A"]'), sB = el.querySelector('[data-r="B"]');
      const draw = () => {
        const { tampon, arter, toplam } = model();
        const tA = Math.max(4, 14 * arter / 500), tP = Math.max(4, 26 * A / 1000), tV = Math.max(4, 30 * toplam / 1500);
        const ring = (cx, cy, vert) => {
          const op = 4 + (tampon / 300) * 9 + (vert ? tA : tA) / 2;
          return vert ? `<ellipse class="f65-halka ${tampon > 0 ? 'on' : ''}" cx="${cx}" cy="${cy}" rx="${op}" ry="6"/>` : `<ellipse class="f65-halka ${tampon > 0 ? 'on' : ''}" cx="${cx}" cy="${cy}" rx="6" ry="${op}"/>`;
        };
        const ad = `<g class="f65-adn ${tampon > 0 ? 'on' : ''}">`;
        let s;
        if (!N) {
          s = box(250, 60, 170, 150) +
            `<rect class="f65-va" x="20" y="${110 - tA / 2}" width="230" height="${tA}" rx="${tA / 2}"/><rect class="f65-vp" x="20" y="${180 - tP / 2}" width="230" height="${tP}" rx="${tP / 2}"/><rect class="f65-vh" x="420" y="${135 - tV / 2}" width="180" height="${tV}" rx="${tV / 2}"/>` +
            ring(190, 110, false) + T(20, 62, 'Hepatik arter', { a: 'start', c: 'b' }) + ad + T(20, 80, 'adenozin → vazodilatasyon', { a: 'start', c: 'ok' }) + '</g>' +
            T(20, 220, 'Portal ven', { a: 'start', c: 'b' }) + T(20, 236, 'çok az düz kas → akım basınç gradiyentiyle orantılı', { a: 'start', c: 'm' }) +
            `<circle class="f65-nokta" cx="266" cy="140" r="4"/>` + T(274, 144, ['Otoregülasyon: ortalama', 'arter basıncı > 60 mmHg'], { a: 'start', c: 'm' }) +
            T(510, 104, 'Hepatik ven', { c: 'b' }) + T(636, 30, 'Toplam akım: ' + Math.round(toplam) + ' mL/dk', { a: 'end', s: 16, c: toplam < 0.85 * 1500 ? 'crit b' : 'ok b' });
          sv.innerHTML = svgW(640, 236, 'Hepatik arter ve portal ven karaciğere girer; arter, portal akım düşünce genişler', s, 14);
        } else {
          s = box(40, 170, 310, 100) +
            `<rect class="f65-va" x="${90 - tA / 2}" y="40" width="${tA}" height="130" rx="${tA / 2}"/><rect class="f65-vp" x="${300 - tP / 2}" y="40" width="${tP}" height="130" rx="${tP / 2}"/><rect class="f65-vh" x="${195 - tV / 2}" y="270" width="${tV}" height="90" rx="${tV / 2}"/>` +
            ring(90, 105, true) + T(90, 20, 'Hepatik arter', { c: 'b' }) + T(300, 20, 'Portal ven', { c: 'b' }) + ad + T(116, 126, ['adenozin →', 'vazodilatasyon'], { a: 'start', c: 'ok' }) + '</g>' +
            T(278, 64, ['çok az düz kas →', 'akım basınç', 'gradiyentiyle', 'orantılı'], { a: 'end', c: 'm' }) +
            `<circle class="f65-nokta" cx="56" cy="238" r="4"/>` + T(66, 242, 'Otoregülasyon: ort. arter basıncı > 60 mmHg', { a: 'start', c: 'm', s: 11 }) +
            T(215, 300, 'Hepatik ven', { a: 'start', c: 'b' }) + T(215, 322, 'Toplam: ' + Math.round(toplam) + ' mL/dk', { a: 'start', s: 15, c: toplam < 0.85 * 1500 ? 'crit b' : 'ok b' });
          sv.innerHTML = svgW(390, 380, 'Hepatik arter ve portal ven karaciğere girer; arter, portal akım düşünce genişler', s);
        }
        o('A').textContent = A + ' mL/dk'; o('B').textContent = B + ' mL/dk';
        o('a').textContent = Math.round(arter) + ' mL/dk'; o('p').textContent = A + ' mL/dk';
        const tt = o('t'); tt.textContent = Math.round(toplam) + ' mL/dk'; tt.className = toplam < 0.85 * 1500 ? 'f65-bad' : 'f65-good';
      };
      const durum = () => { say(el, B < 500 ? CAP.b : A < 1000 ? CAP.a : CAP.r); };
      sA.oninput = () => { A = +sA.value; draw(); durum(); };
      sB.oninput = () => { B = +sB.value; draw(); durum(); };
      el.querySelector('[data-reset]').onclick = () => { A = 1000; B = 500; sA.value = A; sB.value = B; draw(); durum(); };
      draw();
      return () => {};
    });
  };

  /* ============================================================
     3 · Ameliyatta karaciğer kan akımı
     ============================================================ */
  VIZ.f65_ameliyat = (el) => {
    let resp = 'insp', co2 = 'norm', vol = false, nöro = false, retr = false, dongu = false, tt = 0;
    const CAP = {
      insp: '<b>Spontan solunum, inspiryum.</b> Negatif göğüs içi basınç hepatik venöz akımı artırır; ekspiryumda tersi olur. Etkenleri tek tek açıp akımın nasıl değiştiğini izleyin. [[K1 s. 295–296]]',
      exp: '<b>Spontan solunum, ekspiryum.</b> Göğüs içi basınç yükselir, hepatik venöz akım azalır. [[K1 s. 295]]',
      ppv: '<b>Pozitif basınçlı ventilasyon.</b> Pozitif göğüs içi basınç hepatik venöz akımı azaltır. [[K1 s. 295]]',
      peep: '<b>PEEP.</b> Göğüs içi basıncı daha da artırır; hepatik venöz akım daha çok düşer. [[K1 s. 295]]',
      hipo: '<b>Hipokapni.</b> Dakika ventilasyonunun artması portal ven kan akımını azaltır. [[K1 s. 296]]',
      hiper: '<b>Hiperkapni.</b> Portal ven kan akımını artırır. [[K1 s. 296]]',
      vol: '<b>Volatil ajan ve vazopressör.</b> Hepatik arteriyel kan akımını azaltır. [[K1 s. 296]]',
      noro: '<b>Nöroaksiyel blok.</b> Karaciğer kan akımını genel anesteziye benzer ölçüde azaltır. [[K1 s. 296]]',
      retr: '<b>Cerrahi retraksiyon ve paketleme.</b> Karaciğer kan akımını, yukarıdaki anestezi etkenlerinin hepsinden belirgin olarak fazla azaltır: ameliyatta akımı en çok bozan etken budur. [[K1 s. 296]]',
    };
    const RET = 'Cerrahi retraksiyon ve paketleme: anestezi etkenlerinin hepsinden belirgin olarak fazla azaltır. [[K1 s. 296]]';
    // nitel düzeyler (−3 … +3); sayı değil
    const hesap = () => {
      let a = 0, p = 0, thor = { insp: 1, exp: -1, ppv: -1, peep: -2 }[resp];
      if (co2 === 'hipo') p -= 1; if (co2 === 'hiper') p += 1;
      if (vol) a -= 1;
      if (nöro) { a -= 1; p -= 1; }
      const chips = { a: [], p: [], v: [] };
      if (vol) { chips.a.push('volatil/vazopressör'); }
      if (nöro) { chips.a.push('nöroaksiyel'); chips.p.push('nöroaksiyel'); }
      if (co2 === 'hipo') chips.p.push('hipokapni'); if (co2 === 'hiper') chips.p.push('hiperkapni');
      let v = (a + 2 * p) / 3 + thor * 0.9;
      chips.v = [...chips.v, { insp: 'inspiryum', exp: 'ekspiryum', ppv: 'PPV', peep: 'PPV + PEEP' }[resp], ...(co2 !== 'norm' ? [co2 === 'hipo' ? 'hipokapni' : 'hiperkapni'] : []), ...(vol ? ['volatil/vazopressör'] : []), ...(nöro ? ['nöroaksiyel'] : [])];
      if (retr) { a = -3; p = -3; v = -3.4; chips.a = chips.p = chips.v = ['cerrahi retraksiyon']; }
      return { a, p, v, thor, chips };
    };
    const capKey = () => retr ? 'retr' : nöro ? 'noro' : vol ? 'vol' : co2 === 'hipo' ? 'hipo' : co2 === 'hiper' ? 'hiper' : resp;
    return kur(el, (m) => {
      const N = m === 'n';
      el.innerHTML = `<div class="f65-ctl3">
        ${seg('Solunum', 'r', [['insp', 'Spontan: inspiryum'], ['exp', 'Spontan: ekspiryum'], ['ppv', 'Pozitif basınçlı ventilasyon'], ['peep', 'PPV + PEEP']], resp)}
        ${seg('Karbondioksit', 'c', [['norm', 'Normokapni'], ['hipo', 'Hipokapni'], ['hiper', 'Hiperkapni']], co2)}
        <div class="btn-row"><button type="button" class="btn ghost" data-t="vol" aria-pressed="${vol}">Volatil ajan / vazopressör</button><button type="button" class="btn ghost" data-t="noro" aria-pressed="${nöro}">Nöroaksiyel blok</button><button type="button" class="btn ghost" data-t="retr" aria-pressed="${retr}">Cerrahi retraksiyon ve paketleme</button><button type="button" class="btn ghost" data-dongu aria-pressed="${dongu}">Solunum döngüsünü oynat</button></div></div>
        <div class="f65-sv"></div><div class="f65-uyari" ${retr ? '' : 'hidden'}>${REF(RET)}</div>`;
      const sv = el.querySelector('.f65-sv');
      const bX0 = N ? 10 : 70, bW = N ? 370 : 500, cx = bX0 + bW / 2, unit = (bW / 2) / 3.5;
      const rows = ['Hepatik arteriyel akım', 'Portal ven akımı', 'Hepatik venöz akım'];
      const y0 = N ? 236 : 196, pitch = 58, H = y0 + 3 * pitch + 6;
      // sabit iskelet
      let top;
      if (!N) {
        top = box(230, 30, 180, 110) +
          '<rect class="f65-va" data-v="a" x="20" y="58" width="210" height="8" rx="4"/><rect class="f65-vp" data-v="p" x="20" y="102" width="210" height="14" rx="7"/><rect class="f65-vh" data-v="v" x="410" y="76" width="110" height="18" rx="9"/>' +
          T(20, 50, 'Hepatik arter', { a: 'start', c: 'b' }) + T(20, 96, 'Portal ven', { a: 'start', c: 'b' }) + T(415, 70, 'Hepatik ven', { a: 'start', c: 'b' }) +
          '<rect class="f65-chip" x="525" y="20" width="108" height="130" rx="10"/>' + T(579, 44, ['göğüs içi', 'basınç'], { c: 'b' }) + '<g data-ok></g>';
      } else {
        top = box(90, 20, 160, 100) +
          '<rect class="f65-va" data-v="a" x="8" y="41" width="82" height="8" rx="4"/><rect class="f65-vp" data-v="p" x="8" y="88" width="82" height="14" rx="7"/><rect class="f65-vh" data-v="v" x="250" y="61" width="50" height="18" rx="9"/>' +
          T(8, 34, 'Hepatik arter', { a: 'start', c: 'b' }) + T(8, 82, 'Portal ven', { a: 'start', c: 'b' }) + T(250, 56, 'Hepatik ven', { a: 'start', c: 'b' }) +
          '<rect class="f65-chip" x="300" y="12" width="82" height="116" rx="10"/>' + T(341, 34, ['göğüs içi', 'basınç'], { c: 'b' }) + '<g data-ok></g>';
      }
      let bars = T(bX0, y0 - 24, '↓ azalır', { a: 'start', c: 'm' }) + T(cx, y0 - 24, 'başlangıç', { c: 'm' }) + T(bX0 + bW, y0 - 24, '↑ artar', { a: 'end', c: 'm' });
      rows.forEach((r, i) => {
        const y = y0 + i * pitch;
        bars += T(bX0, y, r, { a: 'start', c: 'b' }) + `<text class="f65-tx m" x="${bX0 + bW}" y="${y}" text-anchor="end" data-ch="${i}"></text>` +
          `<rect class="f65-trk" x="${bX0}" y="${y + 8}" width="${bW}" height="16" rx="4"/><rect class="f65-bar" data-b="${i}" x="${cx}" y="${y + 8}" width="0" height="16"/><line class="f65-mid" x1="${cx}" y1="${y + 4}" x2="${cx}" y2="${y + 28}"/>`;
      });
      sv.innerHTML = svgW(N ? 390 : 640, H, 'Karaciğer kan akımı etkenlere göre nitel olarak artar ya da azalır', top + bars);
      const q = (s) => sv.querySelector(s);
      const upd = () => {
        const d = hesap();
        const th = (b, v, base, mn) => { const r = q(`[data-v="${b}"]`); const h = Math.max(3, base * (1 + 0.2 * v)); const cy = +r.dataset.cy || (+r.getAttribute('y') + +r.getAttribute('height') / 2); r.dataset.cy = cy; r.setAttribute('height', h); r.setAttribute('y', cy - h / 2); r.setAttribute('rx', h / 2); };
        th('a', d.a, 8); th('p', d.p, 14); th('v', d.v, 18);
        [d.a, d.p, d.v].forEach((val, i) => {
          const b = q(`[data-b="${i}"]`), w = Math.abs(val) * unit;
          b.setAttribute('width', w.toFixed(1)); b.setAttribute('x', (val < 0 ? cx - w : cx).toFixed(1));
          b.setAttribute('class', 'f65-bar ' + (val < -0.01 ? 'neg' : val > 0.01 ? 'pos' : ''));
          q(`[data-ch="${i}"]`).textContent = [d.chips.a, d.chips.p, d.chips.v][i].join(' · ');
        });
        // göğüs oku
        const ax = N ? 341 : 579, ay = N ? 50 : 62, ah = N ? 70 : 76;
        const pos = d.thor < 0, cls = pos ? 'f65-ok2 neg' : 'f65-ok2 pos';
        const line = (x, up) => `<path class="${d.thor > 0 ? 'f65-ok2 pos' : d.thor === -1 && resp === 'exp' ? 'f65-ok2 warn' : cls}" d="${up ? `M${x} ${ay + ah} L${x} ${ay + 4} M${x - 6} ${ay + 12} L${x} ${ay + 3} L${x + 6} ${ay + 12}` : `M${x} ${ay} L${x} ${ay + ah - 4} M${x - 6} ${ay + ah - 12} L${x} ${ay + ah - 3} L${x + 6} ${ay + ah - 12}`}"/>`;
        q('[data-ok]').innerHTML = d.thor > 0 ? line(ax, false) : d.thor === -2 ? line(ax - 10, true) + line(ax + 10, true) : line(ax, true);
        const wr = el.querySelector('.f65-uyari'); wr.hidden = !retr;
      };
      upd();
      const set = (k) => { upd(); basSec(el, 'r', resp); say(el, CAP[k || capKey()]); };
      el.querySelectorAll('[data-r]').forEach((b) => { b.onclick = () => { resp = b.dataset.r; basSec(el, 'r', resp); upd(); say(el, CAP[capKey()]); }; });
      el.querySelectorAll('[data-c]').forEach((b) => { b.onclick = () => { co2 = b.dataset.c; basSec(el, 'c', co2); upd(); say(el, CAP[capKey()]); }; });
      el.querySelectorAll('[data-t]').forEach((b) => { b.onclick = () => { const k = b.dataset.t; if (k === 'vol') vol = !vol; if (k === 'noro') nöro = !nöro; if (k === 'retr') retr = !retr; b.setAttribute('aria-pressed', String({ vol, noro: nöro, retr }[k])); upd(); say(el, CAP[capKey()]); }; });
      const db = el.querySelector('[data-dongu]');
      if (RM) db.hidden = true;
      db.onclick = () => { dongu = !dongu; db.setAttribute('aria-pressed', String(dongu)); db.textContent = dongu ? 'Döngüyü durdur' : 'Solunum döngüsünü oynat'; if (dongu && (resp === 'ppv' || resp === 'peep')) { resp = 'insp'; basSec(el, 'r', resp); upd(); } };
      if (RM) return () => {};
      return ticker(el, (dt) => {
        if (!dongu) return;
        tt += dt; if (tt < 1.5) return; tt = 0;
        if (resp === 'insp' || resp === 'exp') { resp = resp === 'insp' ? 'exp' : 'insp'; basSec(el, 'r', resp); upd(); if (!retr && !nöro && !vol && co2 === 'norm') say(el, CAP[resp]); }
      });
    });
  };

  /* ============================================================
     4 · İki haritada aynı karaciğer
     ============================================================ */
  VIZ.f65_makro = (el) => {
    let mode = 'mor', sel = null;
    const OUT = 'M490 70 C440 30 320 10 200 10 C80 10 10 50 5 110 C2 170 60 215 140 225 C200 232 250 205 300 200 C360 196 410 170 450 140 C480 120 500 95 490 70 Z';
    // Segment çokgenleri (anterior görünüm: hastanın sağı izleyicinin solunda; 1 → 8 saat yönünde)
    const SEG = {
      1: { p: '190,0 335,0 335,100 205,100', c: [262, 58] },
      2: { p: '335,0 520,0 520,108 335,108', c: [412, 58] },
      3: { p: '335,108 520,108 520,260 335,260', c: [410, 162] },
      4: { p: '205,100 335,100 335,260 215,260', c: [268, 172] },
      5: { p: '95,108 205,108 215,260 95,260', c: [152, 176] },
      6: { p: '-10,108 95,108 95,260 -10,260', c: [48, 172] },
      7: { p: '-10,0 95,0 95,108 -10,108', c: [48, 62] },
      8: { p: '95,0 190,0 205,108 95,108', c: [145, 62] },
    };
    const CAP = {
      mor: '<b>Morfolojik harita.</b> Falsiform ligament karaciğeri sağ (çok daha büyük) ve sol anatomik loba ayırır. Alttan bakıldığında sağ ve sol lob arasında iki küçük lob görülür: kaudat (arka) ve kuadrat (alt) lob. Fonksiyonel haritaya geçin. [[K1 s. 296]]',
      fon: "<b>Couinaud sınıflaması.</b> Sekiz işlevce bağımsız segment; kaudat lobdan başlayarak saat yönünde 1'den 8'e numaralanır. Bir segmente dokunun. [[K1 s. 296]]",
      seg: (n) => `<b>Segment ${n}.</b> Hepatik arter ve portal ven dallarından kendi kanlanması, kendi hepatik venöz drenajı ve kendi safra drenajı vardır; komşuları çıkarıldığında normal işlevini sürdürür. [[K1 s. 296]]` + (n === 1 ? ' Numaralandırma bu kaudat lobdan başlar. [[K1 s. 296]]' : ''),
      can: '<b>Cantlie çizgisi.</b> Safra kesesi çukuru ile vena kava inferior arasındaki hayalî çizgi; karaciğerin fonksiyonel sağ ve sol yarısını ayırır ve falsiform ligament değildir. Porta hepatisin damarları tam bu noktada sağ ve sol dallarına ayrılır. [[K1 s. 296]]',
      hil: '<b>Porta hepatis (hilus).</b> Portal ven, ortak safra kanalı ve hepatik arterin karaciğere girdiği nokta. [[K1 s. 296]]',
    };
    return kur(el, (m) => {
      const N = m === 'n', S = N ? 0.74 : 1, fs = (px) => (px / S).toFixed(1);
      el.innerHTML = `<div class="btn-row f65-ctl">${seg('Harita', 'h', [['mor', 'Morfolojik'], ['fon', 'Fonksiyonel (Couinaud)']], mode)}</div><div class="f65-sv"></div><div class="f65-lej"></div><p class="f65-not"></p>`;
      const sv = el.querySelector('.f65-sv'), lej = el.querySelector('.f65-lej'), not = el.querySelector('.f65-not');
      const tr = N ? 'translate(10,14) scale(.74)' : 'translate(60,26)';
      const render = () => {
        let g = `<defs><clipPath id="f65-mk-c"><path d="${OUT}"/></clipPath></defs><g transform="${tr}"><path class="f65-out" d="${OUT}"/>`;
        if (mode === 'mor') {
          g += `<line class="f65-fal" x1="330" y1="10" x2="330" y2="196"/>` +
            T(130, 100, ['Sağ anatomik lob', '(çok daha büyük)'], { s: fs(11), c: 'b', lh: 16 / S }) + T(412, 92, ['Sol anatomik', 'lob'], { s: fs(11), c: 'b', lh: 16 / S }) +
            `<rect class="f65-kes" x="205" y="92" width="115" height="44" rx="8"/>` + T(262, 110, ['Kaudat lob', '(arka)'], { s: fs(11), lh: 15 / S }) +
            `<rect class="f65-kes" x="205" y="148" width="115" height="44" rx="8"/>` + T(262, 166, ['Kuadrat lob', '(alt)'], { s: fs(11), lh: 15 / S }) +
            T(330, 222, 'Falsiform ligament', { s: fs(11), c: 'acc b' });
        } else {
          g += '<g clip-path="url(#f65-mk-c)">';
          for (const n in SEG) g += `<g class="f65-sg ${sel === +n ? 'sel' : sel !== null ? 'dim' : ''} ${n === '1' ? 'k' : ''}" data-s="${n}" role="button" tabindex="0" aria-label="Segment ${n}"><polygon points="${SEG[n].p}"/></g>`;
          g += '</g>';
          g += `<path class="f65-out2" d="${OUT}"/><line class="f65-fal ghost" x1="330" y1="10" x2="330" y2="196"/>`;
          for (const n in SEG) g += `<text class="f65-nm ${sel === +n ? 'sel' : sel !== null ? 'dim' : ''}" x="${SEG[n].c[0]}" y="${SEG[n].c[1] + 6 / S}" text-anchor="middle" style="font-size:${fs(17)}px" pointer-events="none">${n}</text>`;
          g += T(262, 80, 'kaudat', { s: fs(11), c: 'm' });
          g += `<g class="f65-cn ${sel === 'can' ? 'sel' : ''}" data-s="can" role="button" tabindex="0" aria-label="Cantlie çizgisi"><line class="hit" x1="212" y1="222" x2="190" y2="12"/><line class="f65-cant" x1="212" y1="222" x2="190" y2="12"/></g>`;
          g += `<ellipse class="f65-gb" cx="212" cy="218" rx="9" ry="13"/><circle class="f65-vki" cx="190" cy="14" r="8"/>` + T(190, 18, 'VKİ', { s: fs(11) - 1 });
          g += `<g class="f65-hl ${sel === 'hil' ? 'sel' : ''}" data-s="hil" role="button" tabindex="0" aria-label="Porta hepatis"><circle class="hit" cx="200" cy="130" r="22"/><path class="f65-br" d="M200 130 L150 142 M200 130 L255 142"/><path class="f65-hr" d="M200 130 L186 108"/><path class="f65-hp" d="M200 130 L200 104"/><path class="f65-hb" d="M200 130 L214 108"/><circle class="f65-hn" cx="200" cy="130" r="7"/></g>`;
        }
        g += '</g>';
        sv.innerHTML = svgW(N ? 390 : 620, N ? 226 : 274, 'Karaciğerin tek dış çizgisi üzerinde morfolojik ve Couinaud bölünmesi', g, N ? 0 : 14);
        if (mode === 'mor') { lej.innerHTML = ''; not.innerHTML = 'Kaudat ve kuadrat lob yalnız alttan bakışta görülür. Morfolojik bölünme hepatobiliyer cerrahide pek işe yaramaz.'; }
        else {
          lej.innerHTML = `<button type="button" class="f65-lj ${sel === 'can' ? 'sel' : ''}" data-s="can"><i class="d dash"></i>Cantlie çizgisi · fonksiyonel sağ/sol yarı (falsiform ligament değil)</button><button type="button" class="f65-lj ${sel === 'hil' ? 'sel' : ''}" data-s="hil"><i class="d tri"></i>Hilus (porta hepatis) · damarlar burada sağ ve sol dala ayrılır</button><span class="f65-lj plain"><i class="d gb"></i>Safra kesesi çukuru · <i class="d vk"></i>VKİ: vena kava inferior</span>`;
          not.innerHTML = '↻ Numaralandırma kaudat lobdan başlayarak saat yönünde, 1 → 8.';
        }
        sv.querySelectorAll('[data-s]').forEach((b) => bag(b));
        lej.querySelectorAll('[data-s]').forEach((b) => bag(b));
      };
      const bag = (b) => {
        const f = () => { const k = b.dataset.s; sel = /^\d$/.test(k) ? +k : k; render(); say(el, sel === 'can' ? CAP.can : sel === 'hil' ? CAP.hil : CAP.seg(sel)); };
        b.onclick = f; b.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f(); } };
        if (!/^\d$/.test(b.dataset.s)) return;
        b.onmouseenter = () => { if (sel !== +b.dataset.s) { sel = +b.dataset.s; render(); say(el, CAP.seg(sel)); } };
      };
      render();
      el.querySelectorAll('[data-h]').forEach((b) => { b.onclick = () => { mode = b.dataset.h; sel = null; basSec(el, 'h', mode); render(); say(el, mode === 'mor' ? CAP.mor : CAP.fon); }; });
      return () => {};
    });
  };

  /* ============================================================
     5 · Lobül ve asinus
     ============================================================ */
  VIZ.f65_asinus = (el) => {
    let mode = 'lob', zon = null, run = false, t = 0, upd = null;
    const CAP = {
      lob: '<b>Lobül görünümü.</b> Altıgenin merkezinde hepatik venin bir dalı; altı köşesinin her birinde bir hepatik triad: portal venül, hepatik arteriyol ve safra kanalı. Merkezî venden dışa doğru hepatosit kolonları ile hepatik sinüzoidler ışınsal olarak uzanır. Asinus görünümüne geçip kanı akıtın. [[K1 s. 296]]',
      asi: '<b>Asinus görünümü.</b> Eliptik asinusun iki ucunda hepatik venin birer terminal dalı, yan kenarlarının orta noktasında iki portal triad vardır. Kan triaddan terminal vene akar. "Kanı akıt" düğmesine basın. [[K1 s. 296]]',
      1: '<b>Zon 1.</b> İki portal triada en yakın bölge, en iyi oksijenlenen yer. En çok enerji harcayan işlemler burada olur: glukoneogenez ve yağ asitlerinin β-oksidasyonu. [[K1 s. 296]]',
      2: "<b>Zon 2.</b> Ara bölge; hepatositler hem zon 1'in hem zon 3'ün işlemlerini yapar. [[K1 s. 296]]",
      3: '<b>Zon 3.</b> Terminal vene en yakın, oksijen basıncının en düşük olduğu bölge. En az enerji harcayan işlemler burada: glikoliz ve ilaç metabolizması. [[K1 s. 296–297]]',
      tri: '<b>Hepatik triad.</b> Portal venül, hepatik arteriyol ve safra kanalı. Lobülün altı köşesinde, asinusun yan kenarlarının orta noktasında bulunur. [[K1 s. 296]]',
    };
    const ISL = { 1: 'glukoneogenez · β-oksidasyon', 2: 'her ikisinin işlemleri', 3: 'glikoliz · ilaç metabolizması' };
    const triad = (x, y, k) => `<g class="f65-tri" data-z="tri" role="button" tabindex="0" aria-label="Hepatik triad"><circle class="hit" cx="${x}" cy="${y}" r="16"/><circle class="a" cx="${x - 7}" cy="${y + 4}" r="6"/><circle class="p" cx="${x + 7}" cy="${y + 4}" r="6"/><circle class="s" cx="${x}" cy="${y - 7}" r="6"/></g>`;
    const mixc = (u) => `fill:color-mix(in srgb, var(--crit) ${Math.round(100 - u * 100)}%, var(--muted))`;
    return kur(el, (m) => {
      const N = m === 'n';
      el.innerHTML = `<div class="btn-row f65-ctl">${seg('Model', 'm', [['lob', 'Lobül (histolojik)'], ['asi', 'Asinus (fonksiyonel)']], mode)}<button type="button" class="btn" data-run ${mode === 'asi' ? '' : 'hidden'}>${run ? 'Durdur' : 'Kanı akıt'}</button></div><div class="f65-sv"></div><div class="f65-lej"></div>`;
      const sv = el.querySelector('.f65-sv'), lej = el.querySelector('.f65-lej'), rb = el.querySelector('[data-run]');
      const render = () => {
        let g = '', defs = [];
        if (mode === 'lob') {
          const cx = N ? 195 : 300, cy = N ? 200 : 165, R = N ? 130 : 120;
          const V = Array.from({ length: 6 }, (_, i) => [cx + R * Math.cos(i * Math.PI / 3), cy + R * Math.sin(i * Math.PI / 3)]);
          g += `<polygon class="f65-hex" points="${V.map((p) => p.join(',')).join(' ')}"/>`;
          V.forEach((p, i) => {
            const ang = i * Math.PI / 3, ux = Math.cos(ang), uy = Math.sin(ang), nx = -uy, ny = ux;
            for (const off of [-16, 0, 16]) g += `<line class="f65-sn" x1="${(cx + ux * 26 + nx * off).toFixed(1)}" y1="${(cy + uy * 26 + ny * off).toFixed(1)}" x2="${(cx + ux * (R - 20) + nx * off).toFixed(1)}" y2="${(cy + uy * (R - 20) + ny * off).toFixed(1)}"/>`;
            for (const off of [-8, 8]) for (let r = 34; r < R - 22; r += 11) g += `<rect class="f65-hcl" x="${(cx + ux * r + nx * off - 3.5).toFixed(1)}" y="${(cy + uy * r + ny * off - 3.5).toFixed(1)}" width="7" height="7" rx="2"/>`;
          });
          g += `<circle class="f65-mv" cx="${cx}" cy="${cy}" r="22"/>`;
          V.forEach((p, i) => { g += triad(p[0] + (cx - p[0]) * 0.1, p[1] + (cy - p[1]) * 0.1); });
          if (!N) g += T(110, 36, ['Hepatik venin bir dalı', '(merkezî ven)'], { c: 'b' }) + `<path class="f65-ld" d="M150 56 L${cx - 14} ${cy - 18}"/>` + T(300, 304, 'Hepatik triad: portal venül + hepatik arteriyol + safra kanalı', { c: 'm' }) + T(300, 322, 'altı köşe, altı triad', { c: 'm' });
          else g += T(195, 22, ['Hepatik venin bir dalı (merkezî ven)'], { c: 'b' }) + `<path class="f65-ld" d="M195 30 L${cx} ${cy - 24}"/>` + T(195, 380, ['Hepatik triad:', 'portal venül + hepatik arteriyol + safra kanalı'], { c: 'm' }) + T(195, 424, 'altı köşe, altı triad', { c: 'm' });
          sv.innerHTML = svgW(N ? 390 : 600, N ? 440 : 313, 'Altıgen lobül: merkezde hepatik ven dalı, altı köşede hepatik triad', g, N ? 0 : 22);
          lej.innerHTML = '<div class="legend"><span><i style="background:var(--accent-ink)"></i>portal venül</span><span><i style="background:var(--crit)"></i>hepatik arteriyol</span><span><i style="background:var(--ok)"></i>safra kanalı</span></div>';
          upd = null;
        } else {
          let ell, z, vein, tri, bar;
          const op = zon;
          if (!N) {
            const cx = 300, cy = 165, rx = 200, ry = 95;
            const bands = [[3, -200, -130], [2, -130, -60], [1, -60, 60], [2, 60, 130], [3, 130, 200]];
            g += `<defs><clipPath id="f65-ac"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/></clipPath><linearGradient id="f65-gr" x1="0" x2="1"><stop offset="0" style="stop-color:var(--muted)"/><stop offset=".5" style="stop-color:var(--crit)"/><stop offset="1" style="stop-color:var(--muted)"/></linearGradient></defs>`;
            g += '<g clip-path="url(#f65-ac)">';
            ['1', '2', '3'].forEach((zz) => { g += `<g class="f65-z z${zz} ${zon === +zz ? 'sel' : ''}" data-z="${zz}" role="button" tabindex="0" aria-label="Zon ${zz}">${bands.filter((b) => b[0] === +zz).map((b) => `<rect x="${cx + b[1]}" y="0" width="${b[2] - b[1]}" height="340"/>`).join('')}</g>`; });
            g += `</g><ellipse class="f65-el" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`;
            bands.forEach((b) => { g += T(cx + (b[1] + b[2]) / 2, cy + 8, String(b[0]), { s: 22, c: 'b' }); });
            [100, 500].forEach((x, i) => { g += `<circle class="f65-tv" cx="${x}" cy="${cy}" r="18"/>`; });
            g += T(88, 216, ['Terminal', 'hepatik ven dalı'], { c: 'b' }) + triad(300, 70) + triad(300, 260) + T(322, 50, 'İki portal triad (yan kenarların orta noktası)', { a: 'start', c: 'm' });
            g += `<rect class="f65-gbar" x="100" y="288" width="400" height="16" rx="4" style="fill:url(#f65-gr)"/>` + T(100, 322, 'düşük O₂', { a: 'start', c: 'm' }) + T(300, 322, 'yüksek O₂', { c: 'm' }) + T(500, 322, 'düşük O₂', { a: 'end', c: 'm' });
            g += '<g class="f65-p"></g>';
            defs = [[300, 70, 100, 165, 1], [300, 70, 500, 165, 1], [300, 260, 100, 165, 1], [300, 260, 500, 165, 1]].map((p) => ({ n: 5, r: 4, sp: 0.5, f: (u) => [p[0] + (p[2] - p[0]) * u, p[1] + (p[3] - p[1]) * Math.sin(u * Math.PI / 2)], st: mixc }));
            sv.innerHTML = svgW(600, 299, 'Eliptik asinus: iki portal triad ortada, terminal venler uçlarda; zonlar 3-2-1-2-3', g, 36);
          } else {
            const cx = 215, cy = 200, rx = 95, ry = 160;
            const bands = [[3, -160, -120], [2, -120, -60], [1, -60, 60], [2, 60, 120], [3, 120, 160]];
            g += `<defs><clipPath id="f65-ac"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/></clipPath><linearGradient id="f65-gr" x1="0" x2="1"><stop offset="0" style="stop-color:var(--muted)"/><stop offset=".5" style="stop-color:var(--crit)"/><stop offset="1" style="stop-color:var(--muted)"/></linearGradient></defs>`;
            g += '<g clip-path="url(#f65-ac)">';
            ['1', '2', '3'].forEach((zz) => { g += `<g class="f65-z z${zz} ${zon === +zz ? 'sel' : ''}" data-z="${zz}" role="button" tabindex="0" aria-label="Zon ${zz}">${bands.filter((b) => b[0] === +zz).map((b) => `<rect x="0" y="${cy + b[1]}" width="390" height="${b[2] - b[1]}"/>`).join('')}</g>`; });
            g += `</g><ellipse class="f65-el" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`;
            bands.forEach((b) => { g += T(cx, cy + (b[1] + b[2]) / 2 + 8, String(b[0]), { s: 22, c: 'b' }); });
            [28, 372].forEach((y) => { g += `<circle class="f65-tv" cx="${cx}" cy="${y}" r="15"/>`; });
            g += T(238, 30, ['Terminal hepatik', 'ven dalı'], { a: 'start', c: 'b' }) + triad(120, 200) + triad(310, 200) + T(98, 232, ['portal', 'triad'], { a: 'end', c: 'm' }) + T(332, 232, ['portal', 'triad'], { a: 'start', c: 'm' });
            g += `<rect class="f65-gbar" x="40" y="396" width="310" height="16" rx="4" style="fill:url(#f65-gr)"/>` + T(40, 430, 'düşük O₂', { a: 'start', c: 'm' }) + T(195, 430, 'yüksek O₂', { c: 'm' }) + T(350, 430, 'düşük O₂', { a: 'end', c: 'm' });
            g += '<g class="f65-p"></g>';
            defs = [[120, 200, 215, 28], [120, 200, 215, 372], [310, 200, 215, 28], [310, 200, 215, 372]].map((p) => ({ n: 5, r: 4, sp: 0.5, f: (u) => [p[0] + (p[2] - p[0]) * Math.sin(u * Math.PI / 2), p[1] + (p[3] - p[1]) * u], st: mixc }));
            sv.innerHTML = svgW(390, 445, 'Dikey eliptik asinus: portal triadlar yan kenarlarda, terminal venler uçlarda; zonlar 3-2-1-2-3', g);
          }
          lej.innerHTML = [1, 2, 3].map((z) => `<button type="button" class="f65-lj ${zon === z ? 'sel' : ''}" data-z="${z}"><b>Zon ${z}</b> · ${ISL[z]}</button>`).join('');
          const gp = sv.querySelector('.f65-p');
          upd = mkParts(gp, defs); upd(t); gp.style.display = run ? '' : 'none';
        }
        sv.querySelectorAll('[data-z]').forEach(bagz); lej.querySelectorAll('[data-z]').forEach(bagz);
      };
      const bagz = (b) => {
        const f = () => { const k = b.dataset.z; run = false; rb.textContent = 'Kanı akıt'; zon = k === 'tri' ? null : +k; render(); say(el, CAP[k]); };
        b.onclick = f; b.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f(); } };
      };
      render();
      el.querySelectorAll('[data-m]').forEach((b) => { b.onclick = () => { mode = b.dataset.m; zon = null; run = false; basSec(el, 'm', mode); rb.hidden = mode !== 'asi'; rb.textContent = 'Kanı akıt'; render(); say(el, CAP[mode]); }; });
      const zonla = (z) => { if (z !== zon) { zon = z; sv.querySelectorAll('.f65-z').forEach((g) => g.classList.toggle('sel', g.dataset.z === String(z))); lej.querySelectorAll('.f65-lj').forEach((g) => g.classList.toggle('sel', g.dataset.z === String(z))); say(el, CAP[z]); } };
      rb.onclick = () => {
        if (RM) { run = false; zonla(3); return; }
        run = !run; rb.textContent = run ? 'Durdur' : 'Kanı akıt';
        if (run) { t = 0; zon = null; const p = sv.querySelector('.f65-p'); if (p) p.style.display = ''; zonla(1); }
        else { const p = sv.querySelector('.f65-p'); if (p) p.style.display = 'none'; }
      };
      if (RM) return () => {};
      return ticker(el, (dt) => {
        if (!run || !upd) return;
        t += dt; upd(t);
        if (t >= 6) { run = false; rb.textContent = 'Kanı akıt'; const p = sv.querySelector('.f65-p'); if (p) p.style.display = 'none'; zonla(3); return; }
        zonla(t < 2 ? 1 : t < 4 ? 2 : 3);
      });
    });
  };

  /* ============================================================
     6 · Sinüzoid, hepatosit kolonu, safra kanalikülü
     ============================================================ */
  VIZ.f65_sinuzoid = (el) => {
    let akis = true, mod = 'ikisi', sel = null, t = 0, upd = null;
    const CAP = {
      def: '<b>Yerleşim.</b> Hepatositler kolonlar hâlinde dizilir; kolonun içinde safra kanalikülleri, iki yanında kanla dolu hepatik sinüzoidler bulunur. Bir öğeye dokunun ya da akışı başlatın: kan hepatik arteriyol ve portal venülden hepatik ven dalına, safra ters yöne akar. [[K1 s. 297]]',
      hep: '<b>Hepatosit.</b> Kütlece karaciğerin %60\'ı, hacimce yaklaşık %80\'i; kolonlar hâlinde dizilir ve geniş bir metabolik, sentez ve ekzokrin işlev yelpazesini yürütür. [[K1 s. 297]]',
      kan: '<b>Safra kanalikülü.</b> Hepatosit kolonunun içindeki küçük kanal; hepatositin salgıladığı safra buradan safra duktüllerine, sonra safra kanallarına geçer ve karaciğeri ortak hepatik kanal olarak terk eder. [[K1 s. 297]]',
      sin: '<b>Hepatik sinüzoid.</b> Hepatosit kolonlarının iki yanındaki kanla dolu boşluk; kan hepatik arteriyol ve portal venülden hepatik venin bir dalına doğru akar. [[K1 s. 297]]',
      fen: '<b>Sinüzoid duvarı.</b> Örtü hücrelerinin çok büyük fenestraları vardır ve sıkı bağlantıları yoktur; duvar bu yüzden yüksek geçirgenlidir. [[K1 s. 297]]',
      per: '<b>Perisinüzoidal boşluk.</b> Kandaki besin maddeleri, ilaçlar ve toksinler sinüzoid örtü hücrelerinden süzülüp buraya geçer ve hepatositlerle burada temas eder. [[K1 s. 297]]',
      kup: '<b>Kupffer hücresi.</b> Sinüzoid duvarını döşeyen özelleşmiş makrofaj; gastrointestinal kanaldan gelen venöz kandaki bakteri ve yabancı maddeyi yok eder, yaşlanmış eritrosit ve lökositleri dolaşımdan temizler. [[K1 s. 297]]',
      art: '<b>Hepatik arteriyol.</b> Oksijenden zengin kanı sinüzoide getirir. [[K1 s. 297]]',
      pv: '<b>Portal venül.</b> Karın organlarından gelen, oksijeni düşük ama besinden zengin kanı sinüzoide getirir. [[K1 s. 297]]',
      hv: '<b>Hepatik venül.</b> Sinüzoidlerden çıkan kan hepatik venin bir dalına buradan boşalır; kan akışının çıkış ucudur. [[K1 s. 297]]',
    };
    const LEJ = [['art', 'Hepatik arteriyol', 'var(--crit)'], ['pv', 'Portal venül', 'var(--accent-ink)'], ['sin', 'Hepatik sinüzoid', 'var(--accent-soft)'], ['fen', 'Fenestralar (sıkı bağlantı yok)', 'var(--accent-ink)'], ['per', 'Perisinüzoidal boşluk', 'var(--chip)'], ['hep', 'Hepatosit kolonu · hacmin ≈%80\'i, kütlenin %60\'ı', 'var(--paper)'], ['kan', 'Safra kanalikülü', 'var(--ok)'], ['kup', 'Kupffer hücresi · kütlenin %10\'u, özelleşmiş makrofaj', 'var(--warn)'], ['hv', 'Hepatik venül', 'var(--muted)']];
    return kur(el, (m) => {
      const N = m === 'n';
      el.innerHTML = `<div class="btn-row f65-ctl"><button type="button" class="btn ghost" data-ak aria-pressed="${akis}">${akis ? 'Akışı durdur' : 'Akışı başlat'}</button>${seg('Gösterilen akış', 'a', [['kan', 'Kan'], ['safra', 'Safra'], ['ikisi', 'İkisi']], mod)}</div><div class="f65-sv"></div>
        <div class="f65-lej">${LEJ.map(([k, l, c]) => `<button type="button" class="f65-lj" data-id="${k}"><i class="d" style="background:${c}"></i>${l}</button>`).join('')}</div>
        <p class="f65-not">Safra yolu: kanalikül → safra duktülü → safra kanalı → ortak hepatik kanal (kanın tersi yönde, portal triada doğru).</p>
        <p class="f65-not">Diğer parankim dışı hücreler: sinüzoid örtü hücreleri, perisinüzoidal hücreler, safra yolu epitel hücreleri.</p>`;
      const sv = el.querySelector('.f65-sv');
      const CU0 = N ? 110 : 120, NC = N ? 3 : 5, CU1 = CU0 + NC * 70 + (NC - 1) * 6, L = CU1 - CU0;
      const SU1 = N ? 410 : 566, HV0 = SU1 + 6, HV1 = HV0 + (N ? 40 : 48), VT = N ? 30 : 54, VB = N ? 270 : 252;
      const P = N ? (u, v) => [v + 45, u] : (u, v) => [u, v];
      const R = (u0, v0, u1, v1) => { const a = P(u0, v0), b = P(u1, v1); return `x="${Math.min(a[0], b[0])}" y="${Math.min(a[1], b[1])}" width="${Math.abs(b[0] - a[0])}" height="${Math.abs(b[1] - a[1])}"`; };
      const TT = (u, v, s, o) => { const p = P(u, v); return T(p[0], p[1], s, o); };
      const star = (u, v) => { const pts = []; for (let i = 0; i < 12; i++) { const r = i % 2 ? 9 : 15, a = i * Math.PI / 6; const p = P(u + r * Math.cos(a), v + r * Math.sin(a)); pts.push(p.map((q) => q.toFixed(1)).join(',')); } return `<polygon points="${pts.join(' ')}"/>`; };
      const grp = (id, inner) => `<g class="f65-e" data-id="${id}" role="button" tabindex="0">${inner}</g>`;
      const kupU = [CU0 + L * 0.25, CU0 + L * 0.72];
      let g = '';
      g += grp('sin', `<rect class="f65-sinz" ${R(66, 60, SU1, 105)} rx="4"/><rect class="f65-sinz" ${R(66, 195, SU1, 240)} rx="4"/>`);
      g += grp('per', `<rect class="f65-pr" ${R(CU0 - 4, 105, CU1 + 4, 115)}/><rect class="f65-pr" ${R(CU0 - 4, 185, CU1 + 4, 195)}/>`);
      g += grp('fen', [105, 195].map((v) => { const a = P(70, v), b = P(SU1 - 4, v); return `<line class="f65-fn" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`; }).join(''));
      g += grp('hep', Array.from({ length: NC }, (_, i) => `<rect class="f65-hc" ${R(CU0 + i * 76, 115, CU0 + i * 76 + 70, 185)} rx="10"/>`).join(''));
      g += grp('kan', `<rect class="f65-cn2" ${R(CU0 - 22, 146, CU1, 154)} rx="3"/>`);
      g += grp('hv', `<rect class="f65-hvv" ${R(HV0, 60, HV1, 240)} rx="6"/>`);
      g += grp('art', `<rect class="f65-ta" ${R(8, 64, 70, 78)} rx="5"/>`) + grp('pv', `<rect class="f65-tp" ${R(8, 222, 70, 236)} rx="5"/>`);
      g += grp('kup', kupU.map((u) => `<g class="f65-kp">${star(u, 82)}</g>`).join('') + `<g class="f65-kp">${star(CU0 + L * 0.5, 218)}</g>`);
      g += TT(37, VT, 'arteriyol', { c: 'b' }) + TT(37, VB, 'portal venül', { c: 'b' }) + TT(CU0 + L * 0.25, VT - (N ? 0 : 0), 'Kupffer', { c: 'warn b' }) + TT(CU0 + L * 0.62, VT, 'fenestralar', { c: 'b' }) + TT(SU1 - 50, VT, 'sinüzoid', { c: 'b' }) + TT(N ? CU1 + 20 : CU0 + L * 0.5, N ? 150 : 274, 'hepatosit kolonu', { c: 'b' }) + TT(N ? 40 : 62, 150, 'safra kanalikülü', { c: 'ok b' }) + TT(N ? CU1 + 56 : CU1 + 37, N ? 144 : 144, ['perisinüzoidal', 'boşluk'], { c: 'm' }) + TT(N ? 480 : (HV0 + HV1) / 2, N ? 150 : VB, 'hepatik venül', { c: 'b' });
      g += '<g class="f65-pk"></g><g class="f65-pn"></g><g class="f65-pb"></g>';
      sv.innerHTML = svgW(N ? 390 : 640, N ? 510 : 258, 'Hepatosit kolonu, iki yanında fenestralı sinüzoidler; kan hepatik arteriyol ve portal venülden hepatik venüle, safra kanalikülden ters yönde akar', g, N ? 0 : 36);
      const vur = () => sv.querySelectorAll('.f65-e').forEach((e) => e.classList.toggle('dim', sel !== null && e.dataset.id !== sel));
      const lj = () => el.querySelectorAll('.f65-lj[data-id]').forEach((b) => b.classList.toggle('sel', b.dataset.id === sel));
      const pick = (id) => { sel = sel === id ? null : id; vur(); lj(); say(el, sel ? CAP[sel] : CAP.def); };
      sv.querySelectorAll('.f65-e').forEach((e) => { e.onclick = () => pick(e.dataset.id); e.onkeydown = (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); pick(e.dataset.id); } }; });
      el.querySelectorAll('.f65-lj[data-id]').forEach((b) => { b.onclick = () => pick(b.dataset.id); });
      vur(); lj();
      // parçacıklar
      const U1 = HV1 - 6, nP = N ? 5 : 7;
      const gk = sv.querySelector('.f65-pk'), gn = sv.querySelector('.f65-pn'), gb = sv.querySelector('.f65-pb');
      const clr = (x) => Math.max(0, Math.min(100, x));
      const upK = mkParts(gk, [
        { n: nP, r: 3.5, sp: 0.1, f: (u) => P(8 + (U1 - 8) * u, 72), st: (u) => `fill:color-mix(in srgb, var(--crit) ${clr(100 - ((8 + (U1 - 8) * u - 66) / 230) * 100)}%, var(--accent-ink))` },
        { n: nP, r: 3.5, sp: 0.1, f: (u) => P(8 + (U1 - 8) * u, 229), cls: 'f65-pp' },
      ]);
      const upB = mkParts(gb, [{ n: nP, r: 3, sp: 0.09, f: (u) => P(CU1 - 4 - (CU1 - CU0 + 70) * u, 150), cls: 'f65-ps' }]);
      const nut = Array.from({ length: 5 }, (_, k) => ({ c: mk('circle', { r: 2.6, class: 'f65-pnu' }, gn), k }));
      const bak = mk('circle', { r: 3.2, class: 'f65-pnu' }, gn);
      upd = (tm) => {
        upK(tm); upB(tm);
        nut.forEach(({ c, k }) => {
          const tt = (tm + k * 0.5) % 2.6, up = k % 2 === 0, u = CU0 + 25 + ((k * 83) % (L - 50));
          const v = up ? lerp(105, 111, clamp(tt / 0.5, 0, 1)) : lerp(195, 189, clamp(tt / 0.5, 0, 1));
          const p = P(u, v); c.setAttribute('cx', p[0]); c.setAttribute('cy', p[1]);
          c.setAttribute('opacity', (tt < 0.5 ? tt / 0.5 : Math.max(0, 1 - (tt - 0.5) / 2)).toFixed(2));
        });
        const b4 = tm % 4, p = P(kupU[0] - 70 + 62 * clamp(b4 / 2, 0, 1), 76);
        bak.setAttribute('cx', p[0]); bak.setAttribute('cy', p[1]); bak.setAttribute('opacity', b4 < 2 ? 1 : b4 < 2.3 ? (1 - (b4 - 2) / 0.3).toFixed(2) : 0);
      };
      const modu = () => { gk.style.display = mod === 'safra' ? 'none' : ''; gn.style.display = mod === 'safra' ? 'none' : ''; gb.style.display = mod === 'kan' ? 'none' : ''; };
      modu(); upd(t);
      el.querySelectorAll('[data-a]').forEach((b) => { b.onclick = () => { mod = b.dataset.a; basSec(el, 'a', mod); modu(); upd(t); }; });
      const ak = el.querySelector('[data-ak]');
      ak.onclick = () => { akis = !akis; ak.setAttribute('aria-pressed', String(akis)); ak.textContent = akis ? 'Akışı durdur' : 'Akışı başlat'; };
      if (RM) { ak.hidden = true; return () => {}; }
      return ticker(el, (dt) => { if (akis) { t += dt; upd(t); } });
    });
  };

  /* ============================================================
     7 · Halotan: iki yol, iki hepatit
     ============================================================ */
  VIZ.f65_halotan = (el) => {
    let view = 'hal', step = 1;
    const CAP = {
      hip: '<b>Hipoksik hasar.</b> Zon 3 hepatositleri portal triada uzaklıkları nedeniyle hipoksik hasara en duyarlıdır; karaciğer işlev bozukluğuyla seyreden ağır sepsiste karaciğer biyopsisinde sentrilobüler nekroz sık bulunur. [[K1 s. 297–298]]',
      ilac: '<b>İlaç metabolizması.</b> Zon 3 ilaç metabolizmasının asıl yeridir; sitokrom P450 sisteminin ürettiği toksik metabolitler yerel hepatositlere zarar verir ve parasetamol aşırı dozunda toksik metabolit NAPQI bu zonda birikir. [[K1 s. 298]]',
      1: '<b>Oksidatif yol.</b> Halotan zon 2 ve 3\'te sitokrom P450 ile çoğunlukla oksidatif yolda yıkılır; ürün trifloroasetik asittir. Redüktif yolu ve tip II yolunu adım adım çalıştırın. [[K1 s. 298]]',
      2: '<b>İki yol.</b> Metabolizmanın çoğu oksidatiftir; az bir bölümü redüktif yoldan gider ve bu yol zon 3\'ün görece hipoksik ortamında kolaylaşır. [[K1 s. 298]]',
      3: '<b>Tip I halotan hepatiti.</b> Redüktif yolun ürettiği serbest radikaller hepatositlere zarar verir; sonuç hafif ve geçici bir ameliyat sonrası serum karaciğer enzim yükselmesidir. [[K1 s. 298]]',
      4: '<b>Hapten oluşumu.</b> Trifloroasetil metabolitleri zon 3\'te hepatosit proteinlerine bağlanarak bağışıklık sistemini uyaran bir hapten kompleksi oluşturur. [[K1 s. 298]]',
      5: '<b>Tip II halotan hepatiti.</b> Otoimmün mekanizma: antikorlar hepatosit–metabolit komplekslerini hedef alır, sonuç yaygın sentrilobüler nekroz ve fulminan karaciğer yetmezliğidir. Seyrektir ama ölüm oranı %50\'dir. [[K1 s. 298]]',
    };
    // kutu: [x,y,w,h] geniş; narrow [x,y,w,h] adım içi; s: görüneceği adım; k: ctx adımları (dar); st: stil
    const VIEWS = {
      hip: { n: 1, boxes: {
        b1: { t: ['Portal triada uzak →', 'oksijen basıncı en düşük'], s: 1, W: [260, 40, 360, 40], N: [10, 8, 370, 40] },
        b2: { t: ['hipoksik hasara en duyarlı hepatositler'], s: 1, W: [260, 104, 360, 28], N: [10, 70, 370, 28] },
        b3: { t: ['Ağır sepsis + karaciğer işlev bozukluğu →', 'biyopside sentrilobüler nekroz'], s: 1, st: 'crit', W: [260, 160, 360, 44], N: [10, 120, 370, 44] },
      }, ar: [['b1', 'b2'], ['b2', 'b3']] },
      ilac: { n: 1, boxes: {
        d1: { t: ['ilaç'], s: 1, W: [300, 20, 120, 26], N: [135, 8, 120, 26] },
        d2: { t: ['sitokrom P450', '(zon 3)'], s: 1, W: [280, 72, 160, 40], N: [115, 58, 160, 40] },
        d3: { t: ['zararsız metabolit'], s: 1, st: 'ok', W: [260, 144, 170, 28], N: [10, 122, 180, 28] },
        d4: { t: ['toksik metabolit →', 'yerel hepatosit hasarı'], s: 1, st: 'crit', W: [450, 144, 170, 40], N: [200, 122, 180, 40] },
        d5: { t: ['Parasetamol aşırı dozu →', 'NAPQI zon 3\'te birikir'], s: 1, st: 'warn', W: [300, 216, 280, 40], N: [10, 184, 370, 40] },
      }, ar: [['d1', 'd2'], ['d2', 'd3'], ['d2', 'd4']] },
      hal: { n: 5, boxes: {
        H: { t: ['Halotan'], s: 1, W: [250, 6, 180, 26], N: [105, 8, 180, 26] },
        P: { t: ['Zon 2 ve 3 · sitokrom P450'], s: 1, k: [2], W: [250, 46, 180, 26], N: [105, 56, 180, 26], N2: [105, 8, 180, 26] },
        O: { t: ['oksidatif · çoğunluk', '→ trifloroasetik asit'], s: 2, k: [4], W: [250, 92, 180, 38], N: [10, 56, 180, 38], N4: [105, 8, 180, 38] },
        R: { t: ['redüktif · az miktarda'], s: 2, k: [3], W: [450, 92, 180, 38], N: [200, 56, 180, 38], N3: [200, 8, 180, 38] },
        W: { t: ["zon 3'ün görece hipoksik", 'ortamı bu yolu kolaylaştırır'], s: 2, st: 'warn', W: [450, 134, 180, 38], N: [200, 102, 180, 38] },
        FR: { t: ['serbest radikaller'], s: 3, W: [450, 188, 180, 26], N: [105, 62, 180, 26] },
        HH: { t: ['hepatosit hasarı'], s: 3, st: 'crit', W: [450, 228, 180, 26], N: [105, 106, 180, 26] },
        T1: { t: ['Tip I halotan hepatiti', 'hafif, geçici ameliyat sonrası', 'karaciğer enzim yükselmesi'], s: 3, st: 'critsoft', W: [450, 268, 180, 54], N: [10, 150, 370, 52] },
        M: { t: ['trifloroasetil metabolitleri'], s: 4, W: [250, 146, 180, 26], N: [105, 62, 180, 26] },
        B: { t: ['zon 3 hepatosit', 'proteinlerine bağlanır'], s: 4, W: [250, 188, 180, 38], N: [105, 106, 180, 38] },
        HP: { t: ['hapten kompleksi'], s: 4, W: [250, 240, 180, 26], N: [105, 158, 180, 26] },
        IM: { t: ['bağışıklık sistemi uyarılır'], s: 4, k: [5], W: [250, 280, 180, 26], N: [105, 202, 180, 26], N5: [105, 8, 180, 26] },
        AB: { t: ['antikorlar hepatosit–metabolit', 'komplekslerini hedef alır'], s: 5, W: [250, 320, 180, 38], N: [105, 62, 180, 38] },
        NK: { t: ['Yaygın sentrilobüler nekroz ·', 'fulminan karaciğer yetmezliği'], s: 5, st: 'crit', W: [250, 372, 180, 40], N: [10, 118, 370, 40] },
        RZ: { t: ['seyrek · ölüm oranı %50'], s: 5, st: 'rozet', W: [450, 378, 180, 28], N: [105, 172, 180, 28] },
      }, ar: [['H', 'P', 1], ['P', 'O', 2], ['P', 'R', 2], ['W', 'FR', 3, 'R'], ['FR', 'HH', 3], ['HH', 'T1', 3], ['O', 'M', 4], ['M', 'B', 4], ['B', 'HP', 4], ['HP', 'IM', 4], ['IM', 'AB', 5], ['AB', 'NK', 5]] },
    };
    VIEWS.hal.boxes.M.s = 4;
    return kur(el, (m) => {
      const N = m === 'n';
      const V = () => VIEWS[view], nSteps = () => V().n;
      el.innerHTML = `<div class="f65-ctl">${seg('Görünüm', 'v', [['hip', 'Hipoksik hasar'], ['ilac', 'İlaç metabolizması'], ['hal', 'Halotan']], view)}</div>
        <div class="stepper-lite f65-st" ${view === 'hal' ? '' : 'hidden'}><button type="button" class="btn ghost" data-g>◀ Geri</button><span class="f65-dots" aria-hidden="true"></span><button type="button" class="btn ghost" data-i>İleri ▶</button></div><div class="f65-sv"></div>`;
      const sv = el.querySelector('.f65-sv'), stp = el.querySelector('.f65-st');
      const pos = (b, st) => {
        if (!N) return b.W;
        return b['N' + st] || b.N;
      };
      const render = () => {
        const vw = V();
        const ids = Object.keys(vw.boxes).filter((id) => {
          const b = vw.boxes[id];
          return N ? (b.s === step || (b.k && b.k.includes(step))) : b.s <= step;
        });
        // zon 3 hasar düzeyi
        let hasar = 0;
        if (view === 'hip') hasar = 1; else if (view === 'ilac') hasar = 0.5; else if (view === 'hal') hasar = step >= 5 ? 1 : step === 3 ? 0.5 : 0;
        const ax = N ? 0 : 20, ay = N ? 0 : 0;
        let g = '';
        // asinus şeridi
        if (!N) {
          const cx = 130, cy = 215, rx = 105, ry = 72, bd = [[3, -105, -65], [2, -65, -30], [1, -30, 30], [2, 30, 65], [3, 65, 105]];
          g += `<defs><clipPath id="f65-hc"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/></clipPath><pattern id="f65-hs" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" style="stroke:var(--crit);stroke-width:2.2"/></pattern><marker id="f65-hm" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L8 4 L0 8 Z" style="fill:var(--muted)"/></marker></defs>`;
          g += T(130, 120, ['Asinus · zon 3', 'terminal vene komşu'], { c: 'b' }) + '<g clip-path="url(#f65-hc)">';
          bd.forEach((b) => { g += `<rect class="f65-az z${b[0]}" x="${cx + b[1]}" y="0" width="${b[2] - b[1]}" height="340"/>`; if (b[0] === 3 && hasar) g += `<rect x="${cx + b[1]}" y="0" width="${b[2] - b[1]}" height="340" class="f65-hs" style="opacity:${hasar === 1 ? 1 : 0.45}" fill="${hasar === 1 ? 'var(--crit-soft)' : 'url(#f65-hs)'}"/>`; });
          g += `</g><ellipse class="f65-el" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`;
          if (hasar) g += `<ellipse class="f65-z3f" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" clip-path="none" style="fill:none"/>`;
          bd.forEach((b) => { g += T(cx + (b[1] + b[2]) / 2, cy + 7, String(b[0]), { s: 18, c: b[0] === 3 && hasar ? 'crit b' : 'b' }); });
          if (view === 'hip') g += `<path class="f65-ok" d="M130 306 L222 306" marker-end="url(#f65-hm)"/>` + T(130, 326, 'oksijen basıncı düşer →', { c: 'm' });
        } else {
          const x0 = 15, w = [65, 75, 80, 75, 65], zz = [3, 2, 1, 2, 3];
          g += `<defs><pattern id="f65-hs" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" style="stroke:var(--crit);stroke-width:2.2"/></pattern><marker id="f65-hm" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L8 4 L0 8 Z" style="fill:var(--muted)"/></marker></defs>` + T(195, 16, 'Asinus · zon 3 terminal vene komşu', { c: 'b' });
          let x = x0;
          zz.forEach((z, i) => { g += `<rect class="f65-az z${z}" x="${x}" y="26" width="${w[i]}" height="46" ${i === 0 ? 'rx="22"' : ''}/>`; if (z === 3 && hasar) g += `<rect x="${x}" y="26" width="${w[i]}" height="46" fill="${hasar === 1 ? 'var(--crit-soft)' : 'url(#f65-hs)'}" style="opacity:${hasar === 1 ? 1 : 0.45}"/>`; g += T(x + w[i] / 2, 56, String(z), { s: 18, c: z === 3 && hasar ? 'crit b' : 'b' }); x += w[i]; });
          g += `<rect class="f65-el2" x="${x0}" y="26" width="360" height="46" rx="14"/>`;
          if (view === 'hip') g += T(195, 90, 'oksijen basıncı uçlara doğru düşer', { c: 'm' });
        }
        // kutular
        const oy = N ? 100 : 0, ox = N ? 0 : 0;
        const rect = {};
        ids.forEach((id) => {
          const b = vw.boxes[id], p = pos(b, step), dim = N ? (b.s !== step) : (b.s < step && view === 'hal');
          rect[id] = [p[0] + ox, p[1] + oy, p[2], p[3]];
          const cl = 'f65-bx ' + (b.st || '') + (dim ? ' dim' : '') + (b.s === step || view !== 'hal' ? ' yeni' : '');
          g += `<g class="${cl}"><rect x="${p[0] + ox}" y="${p[1] + oy}" width="${p[2]}" height="${p[3]}" rx="8"/>${T(p[0] + ox + p[2] / 2, p[1] + oy + p[3] / 2 - (b.t.length - 1) * 6.5 + 4, b.t, { c: b.st === 'rozet' ? '' : '' })}</g>`;
        });
        // oklar
        vw.ar.forEach((a) => {
          const A = rect[a[0]] || (N && a[3] && rect[a[3]]), B = rect[a[1]]; if (!A || !B) return;
          const ax1 = A[0] + A[2] / 2, ay1 = A[1] + A[3], bx = B[0] + B[2] / 2, by = B[1];
          const my = (ay1 + by) / 2;
          const d = ax1 === bx ? `M${ax1} ${ay1} L${bx} ${by - 1}` : `M${ax1} ${ay1} L${ax1} ${my} L${bx} ${my} L${bx} ${by - 1}`;
          const yeni = view !== 'hal' || a[2] === step || N;
          g += `<path class="f65-ay ${yeni ? 'yeni' : ''}" pathLength="1" d="${d}" marker-end="url(#f65-hm)"/>`;
        });
        const tall = Math.max(...Object.values(rect).map((r) => r[1] + r[3]));
        sv.innerHTML = svgW(N ? 390 : 640, N ? tall + 16 : Math.max(340, tall + 16), 'Zon 3 ve halotan metabolizması', g);
        stp.hidden = view !== 'hal';
        const dots = el.querySelector('.f65-dots'); dots.innerHTML = [1, 2, 3, 4, 5].map((i) => `<i class="${i === step ? 'on' : i < step ? 'ok' : ''}"></i>`).join('') + `<span>${step}/5</span>`;
        el.querySelector('[data-g]').disabled = step <= 1; el.querySelector('[data-i]').disabled = step >= 5;
      };
      const git = (s) => { step = clamp(s, 1, 5); render(); say(el, CAP[step]); };
      render();
      el.querySelectorAll('[data-v]').forEach((b) => { b.onclick = () => { view = b.dataset.v; step = 1; basSec(el, 'v', view); render(); say(el, view === 'hal' ? CAP[1] : CAP[view]); }; });
      el.querySelector('[data-g]').onclick = () => git(step - 1);
      el.querySelector('[data-i]').onclick = () => git(step + 1);
      return () => {};
    });
  };
})();
