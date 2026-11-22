/* Fizyoloji Bölüm 37 · Venöz sistem · bileşenler (tarif: docs/tasarim/fiz37.md; K1 s. 163–165).
   Şemalar ölçekli değildir; kitaptan gelen sayılar (30 kat kompliyans, %65/%15, 1/4/12 mmHg eşikleri, tipik basınçlar)
   ve temsilî değerler bileşen altlarında belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (t) => { t = clamp(t, 0, 1); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const isr = (v, d = 2) => (v >= 0 ? '+' : '') + fmt(v, d);
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, a, p) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const capYaz = (el, h) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); if (c) c.innerHTML = REF(h); };
  const capIlk = (el) => { const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap'); return c ? c.innerHTML : ''; };
  const segHtml = (ad, key, opts, cur, cls) => `<div class="seg ${cls || ''}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  /* kapsayıcı 560 px'ten darsa dar yerleşim; yalnız eşik geçilince yeniden çizer */
  const darIzle = (el, cb) => {
    let d = null;
    const f = () => { const w = el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 600; const n = w < 560; if (n !== d) { d = n; cb(n); } };
    f();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(f) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  const okDef = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="${cls}"/></marker>`;
  /* yol üzerinde parçacık: u ∈ [0,1) */
  const yolda = (p) => { const L = p.getTotalLength(); return (u) => p.getPointAtLength((((u % 1) + 1) % 1) * L); };
  const noktalar = (g, n, cls, r) => Array.from({ length: n }, () => mk('circle', { r: r || 3.4, class: cls }, g));

  /* =====================================================================
     1 · f37_rol — dört rol ve taşıma kuralının istisnaları (K1 s. 163)
     ===================================================================== */
  VIZ.f37_rol = (el) => {
    const ROL = [['tasima', 'Taşıma'], ['depolama', 'Depolama'], ['donus', 'Venöz dönüş'], ['isi', 'Isı düzenleme']];
    const ALT = [['ana', 'Ana kural'], ['pulm', 'Pulmoner ven'], ['umb', 'Umbilikal ven'], ['portal', 'Portal venler']];
    const CAP = {
      'tasima-ana': '<b>Taşıma.</b> Venler deoksijenli kanı kapillerlerden kalbin sağ tarafına taşır; bu ana roldür. Bir rol seçin. [[K1 s. 163]]',
      'tasima-pulm': '<b>İstisna: pulmoner venler.</b> Oksijenli kanı pulmoner kapillerlerden kalbin sol tarafına taşır (Bölüm 23). [[K1 s. 163]]',
      'tasima-umb': '<b>İstisna: umbilikal ven.</b> Oksijenli kanı plasentadan fetusa taşır (Bölüm 83). [[K1 s. 163]]',
      'tasima-portal': '<b>İstisna: portal venler.</b> İki kapiller ağı birbirine bağlarlar: hepatik portal ven (bağırsak → karaciğer, deoksijenli kan; Bölüm 65), uzun hipofizer portal venler (alt hipotalamus → ön hipofiz) ve kısa hipofizer portal venler (arka → ön hipofiz; Bölüm 80). [[K1 s. 163]]',
      depolama: '<b>Depolama.</b> Venöz sistem dolaşan kan hacminin %65\'ini tutar. [[K1 s. 163]]',
      donus: '<b>Venöz dönüş.</b> Kanın sağ atriyuma dönüş hızı ön yükü belirler; bu yüzden kalp debisinin başlıca belirleyicilerindendir. [[K1 s. 163]]',
      isi: '<b>Isı düzenleme.</b> Arteriyovenöz anastomozlar arteriolleri kapiller ağı atlayarak venüllere bağlar; deride boldur. Vücut ısısı artınca açılır, deriden bol kan geçer ve ısı çevreye verilir. [[K1 s. 163]]',
    };
    const L = {
      g: { vb: '0 0 560 340', deri: [4, 4, 552, 332], deriT: [546, 20], akc: [220, 18, 120, 42], rh: [220, 130, 60, 72], lh: [280, 130, 60, 72], doku: [200, 276, 160, 42],
        ven: 'M200 297 C 160 297 160 166 220 166', art: 'M340 166 C 400 166 400 297 360 297', venT: [178, 236], artT: [382, 236],
        pa: 'M245 130 L245 60', pv: 'M315 60 L315 130', paT: [238, 100], pvT: [322, 100],
        hip: [24, 22, 150, 26], on: [24, 96, 64, 26], ark: [110, 96, 64, 26], uzun: 'M56 48 L56 96', uzunT: [62, 76], kisa: 'M110 109 L88 109', kisaT: [99, 138],
        bag: [440, 200, 108, 28], kc: [440, 282, 108, 28], hpv: 'M470 228 L470 282', hpvT: [478, 250],
        pl: [14, 290, 64, 26], fe: [98, 290, 52, 26], umb: 'M78 303 L98 303', umbT: [14, 282] },
      d: { vb: '0 0 360 480', deri: [4, 4, 352, 472], deriT: [346, 470], akc: [110, 160, 140, 40], rh: [120, 250, 60, 72], lh: [180, 250, 60, 72], doku: [100, 386, 160, 40],
        ven: 'M100 406 C 50 406 50 286 120 286', art: 'M240 286 C 310 286 310 406 260 406', venT: [70, 350], artT: [290, 350],
        pa: 'M150 250 L150 200', pv: 'M210 200 L210 250', paT: [144, 228], pvT: [216, 228],
        hip: [16, 20, 150, 28], on: [16, 96, 64, 28], ark: [102, 96, 64, 28], uzun: 'M48 48 L48 96', uzunT: [54, 76], kisa: 'M102 110 L80 110', kisaT: [91, 142],
        bag: [196, 20, 148, 28], kc: [196, 96, 148, 28], hpv: 'M228 48 L228 96', hpvT: [236, 68],
        pl: [16, 440, 80, 28], fe: [130, 440, 64, 28], umb: 'M96 454 L130 454', umbT: [16, 434] },
    };
    let rol = 'tasima', alt = 'ana', sicak = false, t = 0, svg = null, dar = false, parc = [], isiParc = [], serit = [];
    el.innerHTML = `<div class="f37-ust">${segHtml('Venöz sistemin rolü', 'rol', ROL, 'tasima', 'f37-seg')}</div>
      <div class="f37-alt">${segHtml('Ana kural ve istisnaları', 'alt', ALT, 'ana', 'f37-seg f37-seg-k')}</div>
      <div class="f37-harita"></div><div class="f37-panel" hidden></div>`;
    const harita = el.querySelector('.f37-harita'), panel = el.querySelector('.f37-panel'), altEl = el.querySelector('.f37-alt');
    const kutu = (r, cls, lbl, ser, izg) => {
      const [x, y, w, h] = r, sat = lbl.split('|'), fs = dar ? 12.5 : 12;
      const s = ser ? ` data-serit="${ser}"` : '';
      return `<rect class="f37-kutu ${cls}"${s} x="${x}" y="${y}" width="${w}" height="${h}" rx="7"/>${izg ? `<rect class="f37-izg"${s} x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h - 4}" rx="5" fill="url(#f37-izgara)"/>` : ''}` +
        sat.map((t2, i) => `<text class="f37-t" x="${x + w / 2}" y="${y + h / 2 + fs * 0.36 + (i - (sat.length - 1) / 2) * (fs + 1)}" text-anchor="middle">${t2}</text>`).join('');
    };
    const yolS = (d, cls, ser) => `<path class="f37-halo ${cls}-h"${ser ? ` data-serit="${ser}"` : ''} d="${d}"/><path class="f37-yol ${cls}"${ser ? ` data-serit="${ser}"` : ''} d="${d}"/>`;
    const etk = (p, s, cls, anc) => `<text class="${cls || 'f37-ts'}" x="${p[0]}" y="${p[1]}" text-anchor="${anc || 'start'}">${s}</text>`;
    const ciz = () => {
      const l = dar ? L.d : L.g;
      harita.innerHTML = `<svg class="f37-svg f37-rmap${dar ? ' f37-dar' : ''}" viewBox="${l.vb}" role="img" aria-label="Şematik dolaşım haritası: venler, arterler, kalp, akciğer, portal sistemler, plasenta ve deri">
        <defs><pattern id="f37-izgara" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M8 0V8M0 8H8" class="f37-izg-c"/></pattern></defs>
        <rect class="f37-deri" x="${l.deri[0]}" y="${l.deri[1]}" width="${l.deri[2]}" height="${l.deri[3]}" rx="18"/>${etk(l.deriT, 'Deri', 'f37-ts f37-deri-t', 'end')}
        <g class="f37-gr f37-gr-pulm">${yolS(l.pa, 'f37-y-pa')}${yolS(l.pv, 'f37-y-pv')}${kutu(l.akc, 'f37-kap', 'Akciğer kapillerleri')}${dar ? etk(l.paT, 'pulmoner arter', 'f37-ts', 'end') + etk(l.pvT, 'pulmoner ven') : etk([l.paT[0], l.paT[1] - 8], 'pulmoner', 'f37-ts', 'end') + etk([l.paT[0], l.paT[1] + 5], 'arter', 'f37-ts', 'end') + etk([l.pvT[0], l.pvT[1] - 8], 'pulmoner') + etk([l.pvT[0], l.pvT[1] + 5], 'ven')}</g>
        <g class="f37-gr f37-gr-sis">${yolS(l.ven, 'f37-y-ven')}${yolS(l.art, 'f37-y-art')}${kutu(l.doku, 'f37-kap', 'Doku kapillerleri')}${etk(l.venT, 'Venler', 'f37-ts f37-ven-t')}${etk(l.artT, 'Arterler', 'f37-ts f37-art-t', 'end')}</g>
        <g class="f37-gr f37-gr-kalp">${kutu(l.rh, 'f37-sag', 'Sağ|kalp')}${kutu(l.lh, 'f37-sol', 'Sol|kalp')}</g>
        <g class="f37-gr f37-gr-hip">${yolS(l.uzun, 'f37-y-por', '2')}${yolS(l.kisa, 'f37-y-por', '3')}${kutu(l.hip, 'f37-org', 'Alt hipotalamus', '2', 1)}${kutu(l.on, 'f37-org', 'Ön|hipofiz', '2 3', 1)}${kutu(l.ark, 'f37-org', 'Arka|hipofiz', '3', 1)}${etk(l.uzunT, 'uzun portal venler')}${etk(l.kisaT, 'kısa portal venler', 'f37-ts', 'middle')}</g>
        <g class="f37-gr f37-gr-bag">${yolS(l.hpv, 'f37-y-por', '1')}${kutu(l.bag, 'f37-org', 'Bağırsak', '1', 1)}${kutu(l.kc, 'f37-org', 'Karaciğer', '1', 1)}<text class="f37-ts" x="${l.hpvT[0]}" y="${l.hpvT[1]}">hepatik</text><text class="f37-ts" x="${l.hpvT[0]}" y="${l.hpvT[1] + 14}">portal ven</text></g>
        <g class="f37-gr f37-gr-umb">${yolS(l.umb, 'f37-y-umb')}${kutu(l.pl, 'f37-org', 'Plasenta')}${kutu(l.fe, 'f37-org', 'Fetus')}${etk(l.umbT, 'umbilikal ven')}</g>
        <g class="f37-parc"></g></svg>`;
      svg = harita.querySelector('svg');
      durum();
    };
    const parcKur = () => {
      const g = svg.querySelector('.f37-parc'); g.innerHTML = ''; parc = [];
      if (RM) return;
      const s = rol === 'tasima' ? 'tasima-' + alt : rol;
      const ek = (sel, cls, per, ser) => svg.querySelectorAll('path.f37-yol.' + sel).forEach((p) => {
        if (ser && p.dataset.serit !== ser) return;
        const f = yolda(p), n = Math.max(2, Math.round(p.getTotalLength() / 34));
        const d = noktalar(g, n, cls); if (ser) d.forEach((c) => c.setAttribute('data-serit', ser));
        parc.push({ f, d, per });
      });
      if (s === 'tasima-ana' || s === 'donus') ek('f37-y-ven', 'f37-dot-b', 3);
      if (s === 'tasima-pulm') ek('f37-y-pv', 'f37-dot-r', 3);
      if (s === 'tasima-umb') ek('f37-y-umb', 'f37-dot-r', 3);
      if (s === 'tasima-portal') { ek('f37-y-por', 'f37-dot-b', 3, '1'); ek('f37-y-por', 'f37-dot-b', 3, '2'); ek('f37-y-por', 'f37-dot-b', 3, '3'); }
    };
    const panelCiz = () => {
      altEl.hidden = rol !== 'tasima';
      panel.hidden = rol === 'tasima';
      isiParc = [];
      if (rol === 'depolama') {
        panel.innerHTML = `<div class="f37-yigin" role="img" aria-label="Dolaşan kan hacminin dağılımı: venöz sistem yüzde 65, arteriyel sistem yüzde 15, diğer yüzde 20">
          <span class="v" style="flex:65">%65</span><span class="a" style="flex:15">%15</span><span class="d" style="flex:20">%20</span></div>
          <div class="f37-lej"><span><i class="v"></i>Venöz sistem</span><span><i class="a"></i>Arteriyel sistem</span><span><i class="d"></i>Diğer (pulmoner dolaşım, kalp, kapillerler)</span></div>`;
      } else if (rol === 'donus') {
        panel.innerHTML = `<div class="f37-zincir"><span>Venöz dönüş hızı</span><i aria-hidden="true">→</i><span>Ön yük</span><i aria-hidden="true">→</i><span>Kalp debisi (CO)</span></div>`;
      } else if (rol === 'isi') {
        panel.innerHTML = `<div class="f37-ust">${segHtml('Vücut ısısı', 'isi', [['normal', 'Vücut ısısı: normal'], ['yuksek', 'Vücut ısısı: yüksek']], sicak ? 'yuksek' : 'normal', 'f37-seg')}</div>
          <svg class="f37-svg f37-isi${sicak ? ' sicak' : ''}" viewBox="0 0 360 170" role="img" aria-label="Deride arteriyovenöz anastomoz: arteriol kapiller ağı atlayarak venüle bağlanır">
            <path class="f37-isi-dalga" d="M130 28 q5 -6 0 -12 q-5 -6 0 -12 M175 28 q5 -6 0 -12 q-5 -6 0 -12 M220 28 q5 -6 0 -12 q-5 -6 0 -12 M265 28 q5 -6 0 -12 q-5 -6 0 -12"/>
            <line class="f37-isi-yuz" x1="4" y1="34" x2="356" y2="34"/><text class="f37-ts" x="8" y="26">Deri yüzeyi</text>
            <rect class="f37-isi-kap" x="128" y="44" width="104" height="26" rx="6"/><rect x="130" y="46" width="100" height="22" rx="5" fill="url(#f37-izgara)" class="f37-izg f37-izg-on"/>
            <path class="f37-yol f37-isi-y f37-y-art" d="M10 100 L80 100"/>
            <path class="f37-isi-k" d="M80 100 C 95 60 110 57 130 57 L230 57 C 250 57 265 100 280 100"/>
            <path class="f37-isi-av" d="M80 100 C 110 140 250 140 280 100"/>
            <path class="f37-yol f37-isi-y f37-y-ven" d="M280 100 L350 100"/>
            <path class="f37-gizli" id="f37-isi-r1" d="M10 100 L80 100 C 95 60 110 57 130 57 L230 57 C 250 57 265 100 280 100 L350 100"/>
            <path class="f37-gizli" id="f37-isi-r2" d="M10 100 L80 100 C 110 140 250 140 280 100 L350 100"/>
            <text class="f37-ts" x="10" y="92">Arteriol</text><text class="f37-ts" x="350" y="92" text-anchor="end">Venül</text>
            <text class="f37-ts" x="180" y="88" text-anchor="middle">kapiller ağ</text>
            <text class="f37-t f37-isi-avt" x="180" y="156" text-anchor="middle">AV anastomoz · ${sicak ? 'açık' : 'kapalı'}</text>
            <g class="f37-isi-p"></g></svg>`;
        const s2 = panel.querySelector('svg'), g = s2.querySelector('.f37-isi-p');
        if (!RM) {
          isiParc.push({ f: yolda(s2.querySelector('#f37-isi-r1')), d: noktalar(g, sicak ? 4 : 5, 'f37-dot-m'), per: sicak ? 3.6 : 4.5 });
          if (sicak) isiParc.push({ f: yolda(s2.querySelector('#f37-isi-r2')), d: noktalar(g, 10, 'f37-dot-m'), per: 2.2 });
        }
      } else panel.innerHTML = '';
    };
    const durum = () => {
      const s = rol === 'tasima' ? 'tasima-' + alt : rol;
      svg.setAttribute('data-s', s);
      parcKur();
      serit = s === 'tasima-portal' ? [...svg.querySelectorAll('[data-serit]')] : [];
      serit.forEach((e) => e.classList.toggle('yan', RM));
      capYaz(el, CAP[s]);
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.rol) { rol = b.dataset.rol; basSec(el, 'rol', rol); panelCiz(); durum(); }
      else if (b.dataset.alt) { alt = b.dataset.alt; basSec(el, 'alt', alt); durum(); }
      else if (b.dataset.isi) { sicak = b.dataset.isi === 'yuksek'; panelCiz(); }
    });
    const ro = darIzle(el, (n) => { dar = n; ciz(); });
    panelCiz();
    const yerles = (p) => p.forEach((q) => q.d.forEach((c, i) => { const pt = q.f(t / q.per + i / q.d.length); c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1)); }));
    const stop = RM ? () => {} : ticker(el, (dt) => {
      t += dt;
      yerles(parc); yerles(isiParc);
      if (serit.length) { const k = String(Math.floor(t / 1.8) % 3 + 1); serit.forEach((e) => e.classList.toggle('yan', e.dataset.serit.split(' ').includes(k))); }
    });
    return () => { stop(); ro(); };
  };

  /* =====================================================================
     2 · f37_yapi — eşit boyutlu arter ve venin kesiti, kapak (K1 s. 163)
     ===================================================================== */
  VIZ.f37_yapi = (el) => {
    const KAT = [['eks', 'Eksterna'], ['med', 'Media'], ['int', 'İntima'], ['lum', 'Lümen']];
    const CAP = {
      bas: '<b>Üç katman.</b> Bir katmana dokunun ya da kapağı açıp kapatın: intima kıvrımları geri akımı durdurur. [[K1 s. 163]]',
      eks: '<b>Tunika eksterna.</b> Vende en kalın katmandır; elastin ve kollajen içerir. [[K1 s. 163]]',
      med: '<b>Tunika media.</b> Arterde en kalın katmandır ve düz kası elastinden çok daha fazladır; vende düz kas çok az, elastin daha çoktur. [[K1 s. 163]]',
      int: '<b>Tunika intima.</b> Vende kıvrımları kapakları oluşturur. [[K1 s. 163]]',
      lum: '<b>Lümen.</b> Ven, eşit boyutlu artere göre ince duvarlı ve geniş lümenlidir; çok daha distansibldir ve sıklıkla kollabe durur. [[K1 s. 163]]',
      ileri: '<b>Kapak açık.</b> Kan kalbe doğru akarken intima kıvrımları duvara yatar. [[K1 s. 163]]',
      geri: '<b>Kapak kapalı.</b> Geri akım kıvrımları kapatır. Vena kavalarda, portal venlerde ve serebral venlerde kapak yoktur. [[K1 s. 163]]',
    };
    let sel = '', akim = 'ileri', dar = false, kap = 0, t = 0, dots = [], P = null;
    el.innerHTML = `<div class="f37-ust">${segHtml('Katman', 'kat', KAT, '', 'f37-seg')}${segHtml('Kapak', 'akim', [['ileri', 'Kapak: ileri akım'], ['geri', 'Kapak: geri akım']], 'ileri', 'f37-seg')}</div>
      <div class="f37-harita"></div>
      <dl class="kv f37-kv"><dt>En kalın katman</dt><dd>Arter: media · Ven: eksterna</dd><dt>Media</dt><dd>Arter: bol düz kas · Ven: az kas, çok elastin</dd></dl>`;
    const harita = el.querySelector('.f37-harita');
    const halka = (cx, cy, a1, b1, a2, b2) => `M${cx - a1} ${cy} a${a1} ${b1} 0 1 0 ${2 * a1} 0 a${a1} ${b1} 0 1 0 ${-2 * a1} 0 Z` + (a2 ? ` M${cx - a2} ${cy} a${a2} ${b2} 0 1 0 ${2 * a2} 0 a${a2} ${b2} 0 1 0 ${-2 * a2} 0 Z` : '');
    const kesit = (cx, cy, R, ven) => {
      // R: [[a,b] dış, eks/med, med/int, int/lüm]
      let s = `<path class="f37-ly f37-ly-eks" data-k="eks" fill-rule="evenodd" d="${halka(cx, cy, ...R[0], ...R[1])}"/>
        <path class="f37-ly f37-ly-med${ven ? ' ven' : ''}" data-k="med" fill-rule="evenodd" d="${halka(cx, cy, ...R[1], ...R[2])}"/>
        <path class="f37-ly f37-ly-int" data-k="int" fill-rule="evenodd" d="${halka(cx, cy, ...R[2], ...R[3])}"/>
        <path class="f37-ly f37-ly-lum${ven ? ' ven' : ''}" data-k="lum" d="${halka(cx, cy, ...R[3])}"/>`;
      // kollajen (eksterna), düz kas (media), elastin
      const ae = (R[0][0] + R[1][0]) / 2, be = (R[0][1] + R[1][1]) / 2, am = (R[1][0] + R[2][0]) / 2, bm = (R[1][1] + R[2][1]) / 2;
      const nE = ven ? 14 : 10, nK = ven ? 4 : 16;
      for (let i = 0; i < nE; i++) { const a = (i / nE) * 6.283, x = cx + ae * Math.cos(a), y = cy + be * Math.sin(a), d = 5; s += `<path class="f37-kol" d="M${(x - d * Math.sin(a)).toFixed(1)} ${(y + d * Math.cos(a)).toFixed(1)} q${(2 * Math.cos(a)).toFixed(1)} ${(2 * Math.sin(a)).toFixed(1)} ${(2 * d * Math.sin(a)).toFixed(1)} ${(-2 * d * Math.cos(a)).toFixed(1)}"/>`; }
      for (let i = 0; i < nK; i++) { const a = (i / nK) * 6.283 + 0.2, x = cx + am * Math.cos(a), y = cy + bm * Math.sin(a); s += `<ellipse class="f37-dk" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${ven ? 3 : 6}" ry="1.8" transform="rotate(${(a * 57.3 + 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }
      const el1 = ven ? [R[1], R[2]] : [R[1], [(R[1][0] + R[2][0]) / 2, (R[1][1] + R[2][1]) / 2]];
      el1.forEach(([a, b]) => { s += `<ellipse class="f37-ela" cx="${cx}" cy="${cy}" rx="${a - 1.5}" ry="${b - 1.5}"/>`; });
      return s;
    };
    const ciz = () => {
      const A = dar ? { cx: 100, cy: 100 } : { cx: 130, cy: 112 }, V = dar ? { cx: 100, cy: 300 } : { cx: 430, cy: 112 };
      const RA = [[80, 80], [70, 70], [38, 38], [33, 33]], RV = [[86, 66], [64, 44], [56, 36], [51, 31]];
      const lab = dar ? [[196, 180], [196, 206], [196, 232], [196, 258]] : [[280, 56], [280, 92], [280, 128], [280, 164]];
      const ad = ['Tunika eksterna', 'Tunika media', 'Tunika intima', 'Lümen'], kk = ['eks', 'med', 'int', 'lum'];
      const aA = dar ? [40, 50, 60, null] : [-40, -12, 14, null], aV = dar ? [-40, -55, -70, null] : [220, 192, 166, null];
      const mr = (R, i) => [(R[i][0] + R[i + 1][0]) / 2, (R[i][1] + R[i + 1][1]) / 2];
      const pt = (C, R, i, aDeg) => { if (i === 3) return [C.cx + (dar ? 6 : 10) * (aDeg === 'v' ? -1 : 1), C.cy + (dar ? 10 : 12)]; const [a, b] = mr(R, i), r = (aDeg * Math.PI) / 180; return [C.cx + a * Math.cos(r), C.cy + b * Math.sin(r)]; };
      let lbl = '';
      lab.forEach(([x, y], i) => {
        const pa = pt(A, RA, i, aA[i]), pv = i === 3 ? [V.cx + (dar ? 8 : -10), V.cy + 10] : pt(V, RV, i, aV[i]);
        const w = ad[i].length * (dar ? 7 : 6.6);
        const xl = dar ? x - 4 : x - w / 2 - 4, xr = dar ? x - 4 : x + w / 2 + 4;
        lbl += `<g class="f37-lbl" data-k="${kk[i]}"><path class="f37-lead" d="M${xl} ${y - 4} L${pa[0].toFixed(1)} ${pa[1].toFixed(1)} M${xr} ${y - 4} L${pv[0].toFixed(1)} ${pv[1].toFixed(1)}"/>
          <circle class="f37-lead-n" cx="${pa[0].toFixed(1)}" cy="${pa[1].toFixed(1)}" r="2.4"/><circle class="f37-lead-n" cx="${pv[0].toFixed(1)}" cy="${pv[1].toFixed(1)}" r="2.4"/>
          <text class="f37-t" x="${x}" y="${y}" text-anchor="${dar ? 'start' : 'middle'}">${ad[i]}</text></g>`;
      });
      const S = dar ? { x0: 30, x1: 330, y: 410, b: 162, vb: '0 0 360 500', tA: [196, 40], tV: [196, 330], tY: 402, kY: 488 } : { x0: 130, x1: 430, y: 214, b: 262, vb: '0 0 560 300', tA: [130, 22], tV: [430, 22], tY: 206, kY: 290 };
      P = S;
      harita.innerHTML = `<svg class="f37-svg f37-yapi${dar ? ' f37-dar' : ''}" viewBox="${S.vb}" role="img" aria-label="Eşit boyutlu arter ve venin enine kesiti ve ven kapağının boyuna kesiti">
        <text class="f37-t f37-bas" x="${S.tA[0]}" y="${S.tA[1]}" text-anchor="${dar ? 'start' : 'middle'}">Arter</text><text class="f37-t f37-bas" x="${S.tV[0]}" y="${S.tV[1]}" text-anchor="${dar ? 'start' : 'middle'}">Ven</text>
        <g class="f37-kes">${kesit(A.cx, A.cy, RA, false)}${kesit(V.cx, V.cy, RV, true)}</g>${lbl}
        <text class="f37-ts" x="${S.x0}" y="${S.tY}">Ven (boyuna kesit)</text><text class="f37-ts f37-acc-t" x="${S.x1}" y="${S.tY}" text-anchor="end">Kalbe doğru →</text>
        <rect class="f37-sl" x="${S.x0}" y="${S.y + 7}" width="${S.x1 - S.x0}" height="40"/>
        <rect class="f37-sw" x="${S.x0}" y="${S.y}" width="${S.x1 - S.x0}" height="7"/><rect class="f37-sw" x="${S.x0}" y="${S.y + 47}" width="${S.x1 - S.x0}" height="7"/>
        <g class="f37-sp"></g>
        <path class="f37-kapak"/><text class="f37-x" x="${S.b + 34}" y="${S.y + 32}" text-anchor="middle">×</text>
        <text class="f37-ts" x="${(S.x0 + S.x1) / 2}" y="${S.kY}" text-anchor="middle">Kapak (intima kıvrımı)</text></svg>`;
      const g = harita.querySelector('.f37-sp');
      dots = Array.from({ length: 9 }, (_, i) => ({ x: S.x0 + 8 + i * ((S.x1 - S.x0 - 16) / 9), y: S.y + 14 + ((i * 37) % 26), c: mk('circle', { r: 3.6, class: 'f37-dot-b' }, g) }));
      durum(); kapakCiz();
    };
    const kapakCiz = () => {
      const S = P, o = 1 - kap, yt = S.y + 7, yb = S.y + 47;
      const tx = S.b + lerp(30, 36, o), tyT = lerp(S.y + 25, yt + 5, o), tyB = lerp(S.y + 29, yb - 5, o);
      harita.querySelector('.f37-kapak').setAttribute('d', `M${S.b} ${yt} Q ${S.b + 20} ${lerp(yt + 12, yt + 2, o)} ${tx} ${tyT} M${S.b} ${yb} Q ${S.b + 20} ${lerp(yb - 12, yb - 2, o)} ${tx} ${tyB}`);
      harita.querySelector('.f37-x').style.opacity = kap > 0.9 ? 1 : 0;
      dots.forEach((d) => { d.c.setAttribute('cx', d.x.toFixed(1)); d.c.setAttribute('cy', d.y.toFixed(1)); });
    };
    const durum = () => { const s = harita.querySelector('svg'); s.setAttribute('data-sel', sel); };
    el.addEventListener('click', (e) => {
      const k = e.target.closest('[data-k],[data-kat],[data-akim]'); if (!k || !el.contains(k)) return;
      if (k.dataset.akim) { akim = k.dataset.akim; basSec(el, 'akim', akim); capYaz(el, CAP[akim]); if (RM) { kap = akim === 'geri' ? 1 : 0; kapakCiz(); } return; }
      const v = k.dataset.kat || k.dataset.k;
      sel = sel === v ? '' : v; basSec(el, 'kat', sel); durum(); capYaz(el, CAP[sel || 'bas']);
    });
    const ro = darIzle(el, (n) => { dar = n; ciz(); });
    const stop = RM ? () => {} : ticker(el, (dt) => {
      t += dt; const S = P;
      kap = clamp(kap + (akim === 'geri' ? 1 : -1) * dt * 3, 0, 1);
      const stopX = S.b + 38;
      dots.forEach((d, i) => {
        if (akim === 'ileri') { d.x += 55 * dt; if (d.x > S.x1 - 6) d.x = S.x0 + 6; }
        else if (d.x > stopX + (i % 3) * 7) { d.x -= 45 * dt; if (d.x < stopX + (i % 3) * 7) d.x = stopX + (i % 3) * 7; }
      });
      kapakCiz();
    });
    return () => { stop(); ro(); };
  };

  /* =====================================================================
     3 · f37_komp — aynı hacim, farklı basınç: ΔP = ΔV/C (K1 s. 163–164)
     ===================================================================== */
  VIZ.f37_komp = (el) => {
    const CAP = {
      atim: '<b>Atım.</b> Sol ventrikül bir atım hacmini venlerden arterlere aktarır: ven basıncı ancak kıpırdar, arter basıncı belirgin yükselir. Hacim ekleyin ya da venokonstriksiyonu açın. [[K1 s. 164]]',
      hacim: '<b>Aynı ΔV, farklı ΔP.</b> Kompliyans C = ΔV/ΔP; venler arterlerden ≈ 30 kat kompliyant olduğundan aynı hacim vende 30 kat daha küçük basınç artışı yapar. Venler bu yüzden kanın %65\'ini, arterler %15\'ini tutar. [[K1 s. 163–164]]',
      vc: '<b>Sempatik venokonstriksiyon.</b> Postganglioner sempatik nöronlar α1-adrenoseptörler aracılığıyla ven düz kasını kasar; kompliyans azalır, aynı hacmin basıncı yükselir. Venlerin yarıçapı büyük olduğundan direnç yalnız biraz artar. [[K1 s. 164]]',
    };
    const K = 30, YB = 220, CA = 1;
    let vc = false, dv = 0, s = RM ? 1 : 0, oto = !RM, tek = false, zt = 0, Wv = 170, Wh = 170;
    el.innerHTML = `<div class="f37-ikili">
      <div class="f37-sahne"><svg class="f37-svg" viewBox="0 0 360 262" role="img" aria-label="Geniş ve esnek ven haznesi ile dar ve sert arter haznesi; sol ventrikül hacmi venden artere aktarır">
        <defs>${okDef('f37-ok-k', 'f37-ok-uc')}</defs>
        <path class="f37-donus" d="M295 40 C 295 4, 34 4, 34 128" marker-end="url(#f37-ok-k)"/><text class="f37-ts" x="170" y="30" text-anchor="middle">kapillerler üzerinden geri dönüş</text>
        <rect class="f37-hz-v" x="20" y="130" width="170" height="90" rx="22"/><rect class="f37-dol-v" x="23" width="164" rx="18"/><line class="f37-taban" x1="22" x2="188"/>
        <rect class="f37-hz-a" x="280" y="40" width="30" height="180" rx="10"/><rect class="f37-dol-a" x="282" width="26" rx="8"/><line class="f37-taban f37-taban-a" x1="278" x2="312"/>
        <line class="f37-boru" x1="186" y1="211" x2="282" y2="211"/><circle class="f37-lv" cx="236" cy="205" r="17"/><text class="f37-t" x="236" y="209" text-anchor="middle">LV</text>
        <circle class="f37-blob" r="7" cy="211"/><g class="f37-rp"></g>
        <text class="f37-p f37-pv-t" text-anchor="middle"></text><text class="f37-p f37-pa-t" x="272" text-anchor="end"></text>
        <text class="f37-ts f37-vc-t" x="105" y="122" text-anchor="middle">α1 → ven düz kası kasılır</text>
        <text class="f37-t" x="105" y="240" text-anchor="middle">Venler</text><text class="f37-ts" x="105" y="255" text-anchor="middle">kan hacminin %65'i</text>
        <text class="f37-t" x="295" y="240" text-anchor="middle">Arterler</text><text class="f37-ts" x="295" y="255" text-anchor="middle">%15</text>
      </svg></div>
      <div class="f37-yan">
        <svg class="f37-svg f37-graf" viewBox="0 0 360 214" role="img" aria-label="Eklenen hacime karşı basınç artışı: arter doğrusu dik, ven doğrusu neredeyse yatay">
          <line class="f37-eks" x1="56" y1="176" x2="344" y2="176"/><line class="f37-eks" x1="56" y1="176" x2="56" y2="14"/>
          ${[0, 1, 2, 3].map((i) => `<text class="f37-tk" x="${56 + i * 94.7}" y="192" text-anchor="middle">${i}</text><text class="f37-tk" x="50" y="${180 - i * 52}" text-anchor="end">${i}</text>`).join('')}
          <line class="f37-g-a" x1="56" y1="176" x2="340" y2="20"/><line class="f37-g-v" x1="56" y1="176"/>
          <text class="f37-ts f37-art-t" x="232" y="64" text-anchor="end">Arter (C düşük)</text><text class="f37-ts f37-ven-t f37-g-vt" x="340" text-anchor="end">Ven (C ≈ 30 × arter)</text>
          <line class="f37-g-k" y1="176" y2="14"/><circle class="f37-g-pa" r="5"/><circle class="f37-g-pv" r="5"/>
          <text class="f37-ts" x="200" y="210" text-anchor="middle">Eklenen hacim ΔV (göreli)</text><text class="f37-ts" x="14" y="96" text-anchor="middle" transform="rotate(-90 14 96)">ΔP (göreli)</text>
        </svg>
        <div class="f37-oku" aria-live="off"></div>
        <div class="btn-row"><button type="button" class="btn" data-a="atim">Atım</button>${RM ? '' : '<button type="button" class="btn ghost" data-a="oto" aria-pressed="true">Duraklat</button>'}
          <button type="button" class="btn ghost f37-tgl" data-a="vc" aria-pressed="false">Sempatik venokonstriksiyon (α1)</button></div>
        <label class="f37-rng"><span>Eklenen hacim <b data-o="dv">0</b></span><input type="range" min="0" max="3" step="0.5" value="0" aria-label="Her iki hazneye eklenen hacim"></label>
      </div></div>`;
    const $ = (q) => el.querySelector(q);
    const rp = $('.f37-rp'), arc = yolda($('.f37-donus')), rdots = RM ? [] : noktalar(rp, 4, 'f37-dot-r');
    const set = (e, a) => { for (const k in a) e.setAttribute(k, typeof a[k] === 'number' ? a[k].toFixed(1) : a[k]); };
    const ciz = (ret) => {
      const Cv = vc ? 21 : 30;
      const Pv = (30 + dv - s) / Cv, Pa = (2 + dv + s) / CA, Pv0 = (30 + dv) / Cv, Pa0 = 2 + dv;
      Wh = lerp(Wh, vc ? 120 : 170, RM ? 1 : 0.15); Wv = Wh;
      set($('.f37-hz-v'), { width: Wv }); set($('.f37-dol-v'), { width: Wv - 6, y: YB - Pv * K, height: Pv * K });
      set($('.f37-taban'), { x2: 18 + Wv, y1: YB - Pv0 * K, y2: YB - Pv0 * K });
      set($('.f37-dol-a'), { y: YB - Pa * K, height: Pa * K }); set($('.f37-taban-a'), { y1: YB - Pa0 * K, y2: YB - Pa0 * K });
      set($('.f37-boru'), { x1: 16 + Wv });
      set($('.f37-pv-t'), { x: 20 + Wv / 2, y: YB - Pv * K - 8 }); $('.f37-pv-t').textContent = 'P ' + fmt(Pv, 2);
      set($('.f37-pa-t'), { y: YB - Pa * K + 4 }); $('.f37-pa-t').textContent = 'P ' + fmt(Pa, 1);
      $('.f37-hz-v').classList.toggle('vc', vc); $('.f37-vc-t').style.opacity = vc ? 1 : 0;
      const bl = $('.f37-blob'), tr = zt < 1.2 && zt > 0 && !RM;
      bl.style.opacity = tr ? 1 : 0; if (tr) set(bl, { cx: lerp(16 + Wv, 286, ease(zt / 1.2)) });
      rdots.forEach((c, i) => { const on = ret != null; c.style.opacity = on ? 1 : 0; if (on) { const p = arc(clamp(ret + i * 0.12, 0, 1) * 0.98); set(c, { cx: p.x, cy: p.y }); } });
      // grafik
      const gx = (v) => 56 + v * 94.7, gy = (p) => 176 - p * 52;
      set($('.f37-g-v'), { x2: gx(3), y2: gy(3 / Cv) }); set($('.f37-g-vt'), { y: gy(3 / Cv) - 8 });
      set($('.f37-g-k'), { x1: gx(dv), x2: gx(dv) });
      set($('.f37-g-pa'), { cx: gx(dv), cy: gy(dv) }); set($('.f37-g-pv'), { cx: gx(dv), cy: gy(dv / Cv) });
    };
    const oku = () => {
      const Cv = vc ? 21 : 30;
      $('.f37-oku').innerHTML = `<div><span>Bir atım (ΔV 1)</span><b>ΔP ven ${isr(-1 / Cv)} · ΔP arter ${isr(1 / CA, 1)}</b></div>
        <div><span>Eklenen ΔV ${fmt(dv, 1)}</span><b>ΔP ven ${isr(dv / Cv)} · ΔP arter ${isr(dv, 1)}</b></div>
        <div><span>ΔP arter / ΔP ven</span><b>${Cv} kat${vc ? ' (C ven azaldı; temsilî)' : ''}</b></div>
        <div><span>Ven akım direnci</span><b class="f37-mini"><i style="width:${vc ? 58 : 50}%"></i></b><em>${vc ? 'biraz artar' : 'temel'}</em></div>`;
      $('[data-o="dv"]').textContent = fmt(dv, 1);
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-a]'); if (!b) return;
      const a = b.dataset.a;
      if (a === 'atim') { if (RM) { s = s ? 0 : 1; ciz(null); } else { zt = 0; tek = !oto; } capYaz(el, CAP.atim); }
      else if (a === 'oto') { oto = !oto; b.setAttribute('aria-pressed', String(oto)); b.textContent = oto ? 'Duraklat' : 'Oynat'; }
      else if (a === 'vc') { vc = !vc; b.setAttribute('aria-pressed', String(vc)); capYaz(el, vc ? CAP.vc : dv > 0 ? CAP.hacim : CAP.atim); oku(); if (RM) ciz(null); }
    });
    $('input[type=range]').addEventListener('input', (e) => { dv = +e.target.value; oku(); capYaz(el, CAP.hacim); if (RM) ciz(null); });
    oku(); ciz(null);
    const stop = RM ? () => {} : ticker(el, (dt) => {
      let ret = null;
      if (oto || tek) {
        zt += dt;
        if (zt >= 3.3) { zt = oto ? zt - 3.3 : 0; if (!oto) tek = false; }
      }
      if (oto || tek) {
        if (zt < 1.2) s = ease(zt / 1.2);
        else if (zt < 2.7) { const f = (zt - 1.2) / 1.5; s = 1 - ease(f); ret = f; }
        else s = 0;
      }
      ciz(ret);
    });
    return () => stop();
  };

  /* =====================================================================
     4 · f37_pompa — kanı kalbe geri getiren mekanizmalar (K1 s. 164)
     ===================================================================== */
  VIZ.f37_pompa = (el) => {
    const SEK = [['kas', 'Kas pompası'], ['sol', 'Solunum pompası'], ['kalp', 'Kalp pompası'], ['dolum', 'Dolum basıncı'], ['poz', 'Pozisyon']];
    const ILK = capIlk(el);
    const CAP = {
      kasG: '<b>Gevşeme.</b> Kan yüzeyel venlerden derin venlere çekilir. [[K1 s. 164]]',
      kasK: '<b>Kasılma.</b> Derin venler sıkışır; kapaklar akımı yalnız kalbe doğru geçirir. Bu pompa egzersizde venöz dönüşü artırır. [[K1 s. 164]]',
      sol: '<b>Solunum (abdominotorasik) pompası.</b> Spontan inspirasyonda negatif intratorasik basınç vena kavaları radyal çekimle açar ve direncini azaltır; artan intraabdominal basınç kanı kalbe iter. Dönüş inspirasyonda artar; egzersizde solunum hızı arttıkça etki büyür. [[K1 s. 164]]',
      kalp: '<b>Kalp pompası.</b> Ventrikül kasılırken fibröz AV halkalar aşağı çekilir; atriyum genişler, basıncı bazen sıfırın altına düşer ve vena kavalardan ve pulmoner venlerden akım kolaylaşır. Venöz kollaps bu etkiyi sınırlar. [[K1 s. 164]]',
      dolum: '<b>Venöz basınç (ortalama sistemik dolum basıncı).</b> Kapasitans venleri doldukça yükselir ve dönüşü artırır: kan hacmi ya da sempatik venöz tonus artınca yükselir; kanamada ya da santral nöroaksiyel blok sonrası sempatik tonus kaybında düşer, venöz dönüş azalır. [[K1 s. 164]]',
      poz: '<b>Vücut pozisyonu.</b> Ayakta kan alt ekstremitelerde göllenir; supin pozisyonda venöz basınç ve dönüş artar, Trendelenburg pozisyonu dönüşü daha da artırır. Ayakta venöz kanın çoğu kalbin altındadır ve yerçekimine karşı dönmelidir. [[K1 s. 164]]',
    };
    let sek = 'kas', S = null;
    el.innerHTML = `<div class="f37-ust">${segHtml('Mekanizma', 'sek', SEK, 'kas', 'f37-seg')}</div>
      <div class="f37-ikili"><div class="f37-sahne"></div><div class="f37-yan"></div></div>`;
    const sv = el.querySelector('.f37-sahne'), pn = el.querySelector('.f37-yan');
    const svgAc = (lbl, ic) => `<svg class="f37-svg" viewBox="0 0 360 320" role="img" aria-label="${lbl}"><defs>${okDef('f37-ok-p', 'f37-ok-uc')}${okDef('f37-ok-pw', 'f37-ok-uc-w')}</defs>${ic}</svg>`;
    const otoBtn = () => (RM ? '' : '<button type="button" class="btn ghost" data-a="oto" aria-pressed="true">Duraklat</button>');
    const fazSeg = (a, b) => segHtml('Faz', 'faz', [['0', a], ['1', b]], '', 'f37-seg');
    const set = (e, a) => { for (const k in a) e.setAttribute(k, typeof a[k] === 'number' ? a[k].toFixed(1) : a[k]); };
    const meter = (ad, k) => `<div class="f37-mtr"><span>${ad}</span><b class="f37-mini"><i data-m="${k}"></i></b><em data-mv="${k}"></em></div>`;

    /* ---- kas pompası ---- */
    const kas = () => {
      const DX = 220, SX = 70, VY = [80, 190, 295];
      sv.innerHTML = svgAc('Baldır kası pompası: yüzeyel, derin ve delici venler ile kapaklar', `
        <rect class="f37-tup" x="${SX - 7}" y="26" width="14" height="290" rx="6"/>
        <ellipse class="f37-kas f37-kL" cy="190"/><ellipse class="f37-kas f37-kR" cy="190"/>
        <rect class="f37-tup f37-dv" y="26" height="290" rx="6"/>
        <line class="f37-perf-o" x1="${SX + 6}" y1="252"/><line class="f37-perf-i" x1="${SX + 6}" y1="252"/>
        <path class="f37-kp f37-kp-perf"/><g class="f37-kps"></g><g class="f37-pp"></g>
        <text class="f37-t" x="${SX}" y="18" text-anchor="middle">Yüzeyel ven</text><text class="f37-t" x="${DX}" y="18" text-anchor="middle">Derin ven</text>
        <text class="f37-t f37-acc-t" x="145" y="18" text-anchor="middle">↑ Kalbe</text>
        <text class="f37-ts" x="96" y="290">Delici ven</text><text class="f37-ts" x="${DX + 22}" y="84">Kapak</text>
        <text class="f37-t" x="300" y="186">Baldır</text><text class="f37-t" x="300" y="201">kası</text>`);
      pn.innerHTML = `<div class="f37-faz">Faz: <b data-o="faz">Gevşeme</b></div>${fazSeg('Gevşeme', 'Kasılma')}<div class="btn-row">${otoBtn()}</div>
        <p class="f37-not">Kapaklar birkaç santimetrede bir dizilir; sağlam kapak sistemi kanın yalnız ileri itilmesine izin verir. [[K1 s. 164]]</p>`;
      pn.querySelector('.f37-not').innerHTML = REF(pn.querySelector('.f37-not').innerHTML);
      const $ = (q) => sv.querySelector(q), kps = $('.f37-kps'), pp = $('.f37-pp');
      const dk = VY.map(() => mk('path', { class: 'f37-kp' }, kps)), yk = VY.map(() => mk('path', { class: 'f37-kp' }, kps));
      const dd = Array.from({ length: 8 }, (_, i) => ({ y: 30 + i * 36, c: mk('circle', { r: 3.4, class: 'f37-dot-b' }, pp) }));
      const sd = Array.from({ length: 5 }, (_, i) => ({ y: 40 + i * 56, c: mk('circle', { r: 3, class: 'f37-dot-b' }, pp) }));
      const pd = Array.from({ length: 3 }, (_, i) => ({ u: i / 3, c: mk('circle', { r: 3, class: 'f37-dot-b' }, pp) }));
      const kapak = (p, cx, y, w, o) => { const tL = [lerp(cx - 1.5, cx - w + 2.5, o), lerp(y - 4, y - 8, o)], tR = [lerp(cx + 1.5, cx + w - 2.5, o), tL[1]]; p.setAttribute('d', `M${cx - w} ${y + 9} L${tL[0].toFixed(1)} ${tL[1].toFixed(1)} M${cx + w} ${y + 9} L${tR[0].toFixed(1)} ${tR[1].toFixed(1)}`); };
      let ph = 0, c = 0, oto = !RM, man = RM ? 1 : null, faz = '';
      const ciz = () => {
        const w = lerp(13, 5, c), mw = lerp(24, 42, c), ry = lerp(80, 72, c);
        set($('.f37-dv'), { x: DX - w, width: 2 * w });
        set($('.f37-kL'), { cx: DX - w - mw / 2 - 1, rx: mw / 2, ry }); set($('.f37-kR'), { cx: DX + w + mw / 2 + 1, rx: mw / 2, ry });
        const ex = DX - w, ey = 214;
        set($('.f37-perf-o'), { x2: ex, y2: ey }); set($('.f37-perf-i'), { x2: ex, y2: ey });
        const mx = (SX + 6 + ex) / 2, my = (252 + ey) / 2, o = 1 - c;
        $('.f37-kp-perf').setAttribute('d', `M${mx - 4} ${my - 6} L${(mx + lerp(-1, 4, o)).toFixed(1)} ${(my + lerp(0, -3, o)).toFixed(1)} M${mx + 2} ${my + 7} L${(mx + lerp(0, 6, o)).toFixed(1)} ${(my + lerp(1, 4, o)).toFixed(1)}`);
        const oD = [c, c, 1 - c];
        VY.forEach((y, i) => { kapak(dk[i], DX, y, w, oD[i]); kapak(yk[i], SX, y, 7, 0.85); });
        const k2 = c > 0.5 ? 'kasK' : 'kasG', fz = c > 0.5 ? 'Kasılma' : 'Gevşeme';
        if (fz !== faz) { faz = fz; pn.querySelector('[data-o="faz"]').textContent = fz; if (man != null) capYaz(el, CAP[k2]); }
        dd.forEach((d) => set(d.c, { cx: DX, cy: d.y })); sd.forEach((d) => set(d.c, { cx: SX, cy: d.y }));
        pd.forEach((d) => { set(d.c, { cx: lerp(SX + 6, ex, d.u), cy: lerp(252, ey, d.u) }); d.c.style.opacity = c < 0.5 ? 1 : 0; });
        if (RM) [...dd, ...sd, ...pd].forEach((d) => (d.c.style.display = 'none'));
      };
      pn.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        if (b.dataset.faz) { man = +b.dataset.faz; oto = false; basSec(pn, 'faz', b.dataset.faz); const ob = pn.querySelector('[data-a="oto"]'); if (ob) { ob.setAttribute('aria-pressed', 'false'); ob.textContent = 'Oynat'; } faz = ''; if (RM) { c = man; ciz(); } }
        else if (b.dataset.a === 'oto') { oto = !oto; if (oto) { man = null; basSec(pn, 'faz', ''); } b.setAttribute('aria-pressed', String(oto)); b.textContent = oto ? 'Duraklat' : 'Oynat'; }
      });
      if (RM) { c = 1; basSec(pn, 'faz', '1'); }
      ciz();
      return {
        adim(dt) {
          if (oto) { ph = (ph + dt / 3) % 1; c = 0.5 - 0.5 * Math.cos(2 * Math.PI * ph); }
          else if (man != null) c = clamp(c + (man ? 1 : -1) * dt * 2.5, 0, 1);
          const kas2 = c > 0.5;
          dd.forEach((d) => { const v = kas2 ? (d.y > 290 ? 0 : 110) : (d.y > 190 ? 12 : 0); d.y -= v * dt; if (d.y < 24) d.y = 312; });
          sd.forEach((d) => { d.y -= 14 * dt; if (d.y < 28) d.y = 312; });
          if (!kas2) pd.forEach((d) => { d.u += dt * 0.55; if (d.u > 1) d.u -= 1; });
          ciz();
        },
      };
    };

    /* ---- solunum pompası ---- */
    const sol = () => {
      sv.innerHTML = svgAc('Solunum pompası: diyafram, göğüs ve karın boşluğu, vena kava', `
        <rect class="f37-govde" x="70" y="22" width="220" height="290" rx="40"/>
        <ellipse class="f37-akc f37-aL" cx="125" cy="95"/><ellipse class="f37-akc f37-aR" cx="235" cy="95"/>
        <ellipse class="f37-ra" cx="180" cy="52" rx="15" ry="13"/>
        <path class="f37-ivc"/><path class="f37-dyf"/>
        <g class="f37-cek"><path class="f37-ok" marker-end="url(#f37-ok-p)" d="M166 120 L150 120 M194 120 L210 120"/></g>
        <g class="f37-bas-o"><path class="f37-ok f37-ok-w" marker-end="url(#f37-ok-pw)" d="M140 255 L162 255 M220 255 L198 255"/></g>
        <g class="f37-pp"></g>
        <text class="f37-t" x="180" y="14" text-anchor="middle">Sağ atriyum</text><text class="f37-ts" x="84" y="44">Göğüs</text><text class="f37-ts" x="84" y="300">Karın</text>
        <text class="f37-ts" x="196" y="290">Vena kava</text><text class="f37-t f37-dyf-t" x="294">Diyafram</text>`);
      pn.innerHTML = `<div class="f37-faz">Faz: <b data-o="faz">İnspirasyon</b></div>${fazSeg('İnspirasyon', 'Ekspirasyon')}
        <dl class="f37-dl"><dt>İntratorasik basınç</dt><dd data-o="it"></dd><dt>İntraabdominal basınç</dt><dd data-o="ia"></dd><dt>Venöz dönüş</dt><dd data-o="vd"></dd></dl>
        <div class="btn-row">${otoBtn()}<button type="button" class="btn ghost f37-tgl" data-a="egz" aria-pressed="false">Egzersiz: solunum hızı ↑</button></div><p class="f37-not" data-o="egz"></p>`;
      const $ = (q) => sv.querySelector(q), pp = $('.f37-pp');
      const dd = Array.from({ length: 8 }, (_, i) => ({ y: 70 + i * 30, c: mk('circle', { r: 3.4, class: 'f37-dot-b' }, pp) }));
      let ph = 0, d = RM ? 1 : 0, oto = !RM, man = RM ? 0 : null, egz = false, faz = '';
      const ciz = () => {
        const Y = lerp(168, 196, d), H = lerp(50, 24, d), wt = lerp(8, 13, d), wa = lerp(11, 6, d);
        $('.f37-dyf').setAttribute('d', `M72 ${Y} Q 180 ${Y - 2 * H} 288 ${Y}`); set($('.f37-dyf-t'), { y: Y + 4 });
        const yd = Y - H; // diyaframın IVC'yi kestiği yer
        $('.f37-ivc').setAttribute('d', `M${180 - wt} 62 L${180 - wt} ${yd} L${180 - wa} ${yd + 10} L${180 - wa} 316 L${180 + wa} 316 L${180 + wa} ${yd + 10} L${180 + wt} ${yd} L${180 + wt} 62 Z`);
        set($('.f37-aL'), { rx: lerp(40, 47, d), ry: lerp(52, 62, d) }); set($('.f37-aR'), { rx: lerp(40, 47, d), ry: lerp(52, 62, d) });
        $('.f37-cek').style.opacity = d; $('.f37-bas-o').style.opacity = d;
        const fz = d > 0.5 ? 'İnspirasyon' : 'Ekspirasyon';
        if (fz !== faz) {
          faz = fz; const i2 = d > 0.5;
          pn.querySelector('[data-o="faz"]').textContent = fz;
          pn.querySelector('[data-o="it"]').textContent = i2 ? 'negatif (↓)' : 'daha az negatif';
          pn.querySelector('[data-o="ia"]').textContent = i2 ? 'artar (↑)' : 'azalır';
          pn.querySelector('[data-o="vd"]').innerHTML = i2 ? '<b class="f37-acc-t">↑ artar</b>' : 'azalır';
        }
        dd.forEach((q) => set(q.c, { cx: 180, cy: q.y })); if (RM) dd.forEach((q) => (q.c.style.display = 'none'));
      };
      pn.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        if (b.dataset.faz) { man = +b.dataset.faz; oto = false; basSec(pn, 'faz', b.dataset.faz); const ob = pn.querySelector('[data-a="oto"]'); if (ob) { ob.setAttribute('aria-pressed', 'false'); ob.textContent = 'Oynat'; } if (RM) { d = man ? 0 : 1; ciz(); } }
        else if (b.dataset.a === 'oto') { oto = !oto; if (oto) { man = null; basSec(pn, 'faz', ''); } b.setAttribute('aria-pressed', String(oto)); b.textContent = oto ? 'Duraklat' : 'Oynat'; }
        else if (b.dataset.a === 'egz') { egz = !egz; b.setAttribute('aria-pressed', String(egz)); pn.querySelector('[data-o="egz"]').textContent = egz ? 'Döngü 4 s → 2 s: pompa etkisi ↑, venöz dönüş artar.' : ''; }
      });
      if (RM) basSec(pn, 'faz', '0');
      ciz();
      return {
        adim(dt) {
          const per = egz ? 2 : 4;
          if (oto) { ph = (ph + dt / per) % 1; d = ph < 0.5 ? ease(ph / 0.5) : 1 - ease((ph - 0.5) / 0.5); }
          else if (man != null) d = clamp(d + (man ? -1 : 1) * dt * 2, 0, 1);
          const ins = oto ? ph < 0.5 : man === 0;
          const v = (ins ? 85 : 22) * (egz ? 1.5 : 1);
          dd.forEach((q) => { q.y -= v * dt; if (q.y < 64) q.y = 314; });
          ciz();
        },
      };
    };

    /* ---- kalp pompası ---- */
    const kalp = () => {
      sv.innerHTML = svgAc('Kalp pompası: ventrikül sistolünde AV halka aşağı iner, atriyum genişler', `
        <g class="f37-vg"><path class="f37-vt-o f37-svc"/><path class="f37-vt-i f37-svc-i"/><path class="f37-vt-o f37-ivcK"/><path class="f37-vt-i f37-ivcK-i"/>
        <path class="f37-vt-o f37-pul f37-pv1"/><path class="f37-vt-i f37-pul-i f37-pv1-i"/><path class="f37-vt-o f37-pul f37-pv2"/><path class="f37-vt-i f37-pul-i f37-pv2-i"/></g>
        <path class="f37-atr f37-RA"/><path class="f37-atr f37-LA"/><path class="f37-ven f37-RV"/><path class="f37-ven f37-LV"/>
        <line class="f37-avh" x1="84" x2="276"/><g class="f37-pp"></g>
        <rect class="f37-gz" x="312" y="150" width="22" height="140" rx="4"/><rect class="f37-gz-f" x="314" width="18"/><line class="f37-gz-0" x1="306" x2="340" y1="250" y2="250"/>
        <text class="f37-tk" x="303" y="254" text-anchor="end">0</text><text class="f37-ts" x="323" y="142" text-anchor="middle">P atriyum</text>
        <text class="f37-t" x="132" y="100" text-anchor="middle">Sağ atriyum</text><text class="f37-t" x="228" y="100" text-anchor="middle">Sol atriyum</text>
        <text class="f37-t f37-vtx" x="140" text-anchor="middle">Sağ</text><text class="f37-t f37-vtx2" x="140" text-anchor="middle">ventrikül</text>
        <text class="f37-t f37-vtx" x="220" text-anchor="middle">Sol</text><text class="f37-t f37-vtx2" x="220" text-anchor="middle">ventrikül</text>
        <text class="f37-ts f37-avt" x="82" text-anchor="end">AV halka</text>
        <text class="f37-ts" x="102" y="22" text-anchor="end">SVC</text><text class="f37-ts" x="18" y="110">IVC</text><text class="f37-ts" x="252" y="20">Pulmoner</text><text class="f37-ts" x="252" y="34">venler</text>`);
      pn.innerHTML = `<div class="f37-faz">Faz: <b data-o="faz">Ventrikül sistolü</b></div>
        <dl class="f37-dl"><dt>AV halka</dt><dd data-o="h"></dd><dt>Atriyum basıncı</dt><dd data-o="p"></dd><dt>Venlerden akım</dt><dd data-o="a"></dd></dl>
        <div class="btn-row">${otoBtn()}</div><p class="f37-not">Turuncu çizgi: giriş venlerinin duvarı içe çöker (venöz kollaps), etkiyi sınırlar.</p>`;
      const $ = (q) => sv.querySelector(q), pp = $('.f37-pp');
      const yollar = [[[110, 6], [110, 62]], [[10, 124], [92, 124]], [[215, 6], [215, 62]], [[245, 6], [245, 62]]];
      const dd = yollar.map((y, j) => Array.from({ length: 3 }, (_, i) => ({ u: i / 3, c: mk('circle', { r: 3, class: j < 2 ? 'f37-dot-b' : 'f37-dot-r' }, pp) })));
      let ph = 0, sys = RM ? 1 : 0, oto = !RM, faz = '';
      const tup = (o, i, p, W) => { const d = `M${p[0][0]} ${p[0][1]} L${p[1][0]} ${p[1][1]}`; set(o, { d, 'stroke-width': W }); set(i, { d, 'stroke-width': W - 5 }); };
      const ciz = () => {
        const R = lerp(140, 168, sys), q = 6 * sys;
        $('.f37-RA').setAttribute('d', `M90 ${R} L90 74 Q90 60 104 60 L161 60 Q175 60 175 74 L175 ${R} Z`);
        $('.f37-LA').setAttribute('d', `M185 ${R} L185 74 Q185 60 199 60 L256 60 Q270 60 270 74 L270 ${R} Z`);
        $('.f37-RV').setAttribute('d', `M${90 + q} ${R} L175 ${R} L178 292 C 130 290 ${96 + q} 250 ${90 + q} ${R} Z`);
        $('.f37-LV').setAttribute('d', `M185 ${R} L${270 - q} ${R} C ${264 - q} 250 230 290 182 292 Z`);
        set($('.f37-avh'), { y1: R, y2: R }); set($('.f37-avt'), { y: R + 4 });
        sv.querySelectorAll('.f37-vtx').forEach((t) => set(t, { y: R + 52 })); sv.querySelectorAll('.f37-vtx2').forEach((t) => set(t, { y: R + 66 }));
        const W = lerp(16, 11, sys);
        tup($('.f37-svc'), $('.f37-svc-i'), yollar[0], W); tup($('.f37-ivcK'), $('.f37-ivcK-i'), yollar[1], W);
        tup($('.f37-pv1'), $('.f37-pv1-i'), yollar[2], W); tup($('.f37-pv2'), $('.f37-pv2-i'), yollar[3], W);
        $('.f37-vg').classList.toggle('kol', sys > 0.6);
        const pa = lerp(24, -10, sys); set($('.f37-gz-f'), { y: Math.min(250, 250 - pa), height: Math.abs(pa) }); $('.f37-gz-f').classList.toggle('neg', pa < 0);
        const fz = sys > 0.5 ? 'Ventrikül sistolü' : 'Diyastol';
        if (fz !== faz) {
          faz = fz; const s2 = sys > 0.5;
          pn.querySelector('[data-o="faz"]').textContent = fz;
          pn.querySelector('[data-o="h"]').textContent = s2 ? 'aşağı çekilir' : 'yukarı döner';
          pn.querySelector('[data-o="p"]').textContent = s2 ? 'düşer (bazen < 0)' : 'yükselir';
          pn.querySelector('[data-o="a"]').innerHTML = s2 ? '<b class="f37-acc-t">↑ kolaylaşır</b>' : 'yavaşlar';
        }
        dd.forEach((g, j) => g.forEach((d) => { const p = yollar[j]; set(d.c, { cx: lerp(p[0][0], p[1][0], d.u), cy: lerp(p[0][1], p[1][1], d.u) }); if (RM) d.c.style.display = 'none'; }));
      };
      pn.addEventListener('click', (e) => { const b = e.target.closest('[data-a="oto"]'); if (!b) return; oto = !oto; b.setAttribute('aria-pressed', String(oto)); b.textContent = oto ? 'Duraklat' : 'Oynat'; });
      ciz();
      return {
        adim(dt) {
          if (oto) { ph = (ph + dt / 2) % 1; sys = ph < 0.35 ? ease(ph / 0.35) : ph < 0.5 ? 1 : 1 - ease((ph - 0.5) / 0.4); }
          const v = sys > 0.5 ? 1.1 : 0.35;
          if (oto) dd.forEach((g) => g.forEach((d) => { d.u += v * dt; if (d.u > 1) d.u -= 1; }));
          ciz();
        },
      };
    };

    /* ---- dolum basıncı ---- */
    const dolum = () => {
      const DUR = { normal: [1, 1, 1], hacim: [1.35, 1, 1.15], symp: [1, 1.35, 0.86], kanama: [0.65, 1, 0.82], blok: [1, 0.7, 1.12] };
      sv.innerHTML = svgAc('Kapasitans venleri haznesi ve sağ atriyuma giden boru; hazne basıncı ortalama sistemik dolum basıncıdır', `
        <line class="f37-boru2" y1="165" x2="282" y2="165"/><line class="f37-boru2-i" y1="165" x2="282" y2="165"/>
        <line class="f37-akok" y1="165" x2="270" y2="165" marker-end="url(#f37-ok-p)"/>
        <ellipse class="f37-hl" cx="110" cy="165"/><ellipse class="f37-blon" cx="110" cy="165"/>
        <rect class="f37-sa" x="282" y="132" width="64" height="66" rx="12"/><text class="f37-t" x="314" y="161" text-anchor="middle">Sağ</text><text class="f37-t" x="314" y="176" text-anchor="middle">atriyum</text>
        <g class="f37-pp"></g>
        <text class="f37-t" x="110" y="161" text-anchor="middle">Kapasitans</text><text class="f37-t" x="110" y="176" text-anchor="middle">venleri</text>
        <text class="f37-ts f37-hl-t" x="110" y="306" text-anchor="middle">kas halkası = venöz tonus</text>`);
      pn.innerHTML = `${segHtml('Değişiklik', 'dl', [['normal', 'Başlangıç'], ['hacim', 'Hacim ↑ (sıvı)'], ['symp', 'Sempatik tonus ↑'], ['kanama', 'Kanama'], ['blok', 'Nöroaksiyel blok']], 'normal', 'f37-seg f37-seg-k')}
        ${meter('Ortalama sistemik dolum basıncı', 'pms')}${meter('Venöz dönüş', 'vd')}`;
      const $ = (q) => sv.querySelector(q), pp = $('.f37-pp');
      const dd = Array.from({ length: 6 }, (_, i) => ({ u: i / 6, c: mk('circle', { r: 3.4, class: 'f37-dot-b' }, pp) }));
      let hd = 'normal', cur = { v: 1, t: 1, s: 1 };
      const pms = (v, t) => v * t, ret = (p) => clamp((p - 0.4) / 0.95, 0.12, 1);
      const ciz = () => {
        const p = pms(cur.v, cur.t), r = ret(p), rx = 70 * cur.s, ry = 92 * cur.s;
        set($('.f37-blon'), { rx, ry, 'fill-opacity': clamp(0.35 + (cur.v - 0.6) * 0.9, 0.25, 1) });
        set($('.f37-hl'), { rx: rx + 6, ry: ry + 6, 'stroke-width': cur.t < 0.85 ? 0 : 2 + (cur.t - 1) * 14 + 2 });
        $('.f37-hl-t').style.opacity = cur.t < 0.85 ? 0.35 : 1;
        $('.f37-hl-t').textContent = cur.t < 0.85 ? 'kas halkası: tonus kaybı' : 'kas halkası = venöz tonus';
        set($('.f37-boru2'), { x1: 104 + rx }); set($('.f37-boru2-i'), { x1: 104 + rx });
        set($('.f37-akok'), { x1: 118 + rx, 'stroke-width': 2 + 7 * r }); $('.f37-akok').classList.toggle('az', r < 0.45);
        const bi = pn.querySelector('[data-m="pms"]'), bv = pn.querySelector('[data-m="vd"]');
        bi.style.width = clamp(p / 1.4, 0, 1) * 100 + '%'; bv.style.width = r * 100 + '%';
        bv.classList.toggle('az', r < 0.45); bi.classList.toggle('az', p < 0.9);
        const t = (x, b) => (x > b + 0.05 ? '↑' : x < b - 0.05 ? '↓' : 'temel');
        pn.querySelector('[data-mv="pms"]').textContent = t(p, 1); pn.querySelector('[data-mv="vd"]').textContent = t(r, ret(1));
        dd.forEach((d) => { set(d.c, { cx: lerp(110 + rx, 276, d.u), cy: 165 }); if (RM) d.c.style.display = 'none'; });
      };
      pn.addEventListener('click', (e) => { const b = e.target.closest('[data-dl]'); if (!b) return; hd = b.dataset.dl; basSec(pn, 'dl', hd); if (RM) { const D = DUR[hd]; cur = { v: D[0], t: D[1], s: D[2] }; ciz(); } });
      ciz();
      return {
        adim(dt) {
          const D = DUR[hd], f = Math.min(1, dt * 5);
          cur = { v: lerp(cur.v, D[0], f), t: lerp(cur.t, D[1], f), s: lerp(cur.s, D[2], f) };
          const r = ret(pms(cur.v, cur.t));
          dd.forEach((d) => { d.u += dt * (0.15 + 0.6 * r); if (d.u > 1) d.u -= 1; });
          ciz();
        },
      };
    };

    /* ---- pozisyon ---- */
    const poz = () => {
      const P = { ayakta: { x: 180, y: 105, a: 0, w: 8, v: 0.12, r: 2.5 }, supin: { x: 100, y: 170, a: -90, w: 4, v: 0.3, r: 5.5 }, trend: { x: 112, y: 192, a: -110, w: 3, v: 0.45, r: 8.5 } };
      sv.innerHTML = svgAc('İnsan silueti üç pozisyonda; kalp düzeyi ve bacak venlerinden dönüş', `
        <line class="f37-kd" x1="0" x2="360"/><text class="f37-ts f37-kd-t" x="354" text-anchor="end">Kalp düzeyi</text>
        <g class="f37-insan">
          <circle class="f37-sil" cx="0" cy="-80" r="18"/><rect class="f37-sil" x="-28" y="-60" width="56" height="112" rx="18"/>
          <rect class="f37-sil" x="-25" y="48" width="21" height="142" rx="9"/><rect class="f37-sil" x="4" y="48" width="21" height="142" rx="9"/>
          <path class="f37-bv" d="M-14 184 L-14 52 Q -12 22 0 6"/><path class="f37-bv" d="M14 184 L14 52 Q 12 22 0 6"/>
          <path class="f37-don" d="M-44 182 L-44 4" marker-end="url(#f37-ok-p)"/>
          <circle class="f37-kalp" cx="0" cy="0" r="9"/><g class="f37-pp"></g>
        </g>
        <text class="f37-t f37-gol-t" x="214" y="262">göllenme</text>`);
      pn.innerHTML = `${segHtml('Pozisyon', 'pz', [['ayakta', 'Ayakta'], ['supin', 'Supin'], ['trend', 'Trendelenburg (baş aşağı)']], 'ayakta', 'f37-seg f37-seg-k')}
        ${meter('Venöz dönüş', 'vd')}<p class="f37-not">Ok kalınlığı venöz dönüşü gösterir; ayakta bacak venleri şişkin (göllenme).</p>`;
      const $ = (q) => sv.querySelector(q), pp = $('.f37-pp');
      const bv = [...sv.querySelectorAll('.f37-bv')].map(yolda);
      const dd = [0, 1].flatMap((j) => Array.from({ length: 4 }, (_, i) => ({ j, u: i / 4, c: mk('circle', { r: 3, class: 'f37-dot-b' }, pp) })));
      let pz = 'ayakta', cur = { ...P.ayakta };
      const ciz = () => {
        $('.f37-insan').setAttribute('transform', `translate(${cur.x.toFixed(1)} ${cur.y.toFixed(1)}) rotate(${cur.a.toFixed(1)})`);
        set($('.f37-kd'), { y1: cur.y, y2: cur.y }); set($('.f37-kd-t'), { y: cur.y - 7 });
        sv.querySelectorAll('.f37-bv').forEach((b) => b.setAttribute('stroke-width', cur.w.toFixed(1)));
        set($('.f37-don'), { 'stroke-width': cur.r });
        $('.f37-gol-t').style.opacity = pz === 'ayakta' ? 1 : 0;
        const r = (cur.r - 1) / 8;
        const m = pn.querySelector('[data-m="vd"]'); m.style.width = clamp(r, 0, 1) * 100 + '%'; m.classList.toggle('az', r < 0.3);
        pn.querySelector('[data-mv="vd"]').textContent = pz === 'ayakta' ? 'en az' : pz === 'supin' ? 'artar' : 'en çok';
        dd.forEach((d) => { const p = bv[d.j](d.u * 0.999); set(d.c, { cx: p.x, cy: p.y }); if (RM) d.c.style.display = 'none'; });
      };
      pn.addEventListener('click', (e) => { const b = e.target.closest('[data-pz]'); if (!b) return; pz = b.dataset.pz; basSec(pn, 'pz', pz); if (RM) { cur = { ...P[pz] }; ciz(); } });
      ciz();
      return {
        adim(dt) {
          const T = P[pz], f = Math.min(1, dt * 4);
          for (const k in cur) cur[k] = lerp(cur[k], T[k], f);
          dd.forEach((d) => { d.u += dt * cur.v; if (d.u > 1) d.u -= 1; });
          ciz();
        },
      };
    };

    const SAHNE = { kas, sol, kalp, dolum, poz };
    const kur = () => { S = SAHNE[sek](); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-sek]'); if (!b) return;
      sek = b.dataset.sek; basSec(el, 'sek', sek); kur();
      capYaz(el, sek === 'kas' ? ILK : CAP[sek]);
    });
    kur();
    const stop = RM ? () => {} : ticker(el, (dt) => S && S.adim(dt));
    return () => stop();
  };

  /* =====================================================================
     5 · f37_klinik — ventilasyon, gebelik ve pozisyon (K1 s. 164–165)
     ===================================================================== */
  VIZ.f37_klinik = (el) => {
    const ILK = capIlk(el);
    const CV = {
      spon: '<b>Spontan solunum.</b> İnspirasyonda intratorasik basınç negatiftir ve venöz dönüş artar. [[K1 s. 164]]',
      ppv: '<b>Pozitif basınçlı ventilasyon.</b> İnspirasyonda intratorasik basınç artar; venöz dönüş, RV ön yükü ve CO düşer. İndüksiyonda sık görülen hipotansiyon kısmen propofol ya da tiyopentonun arteriyol vazodilatasyonundan, kısmen PPV\'den kaynaklanır. [[K1 s. 164]]',
      peep: '<b>PEEP.</b> İntratorasik basıncı daha da artırır; venöz dönüş daha çok azalır. [[K1 s. 164]]',
    };
    const CG = {
      supin: ' <b>Aortokaval bası.</b> Gebeliğin ortasından itibaren supin pozisyonda gebe uterus IVC\'yi sıkıştırır; venöz dönüş azalır, hipotansiyon gelişir (Bölüm 82). Uyanık gebe supin dışında her pozisyonu yeğler; anestezideki hasta kendi pozisyonunu değiştiremez. [[K1 s. 164–165]]',
      tilt: ' <b>Lateral tilt.</b> IVC üzerindeki bası kalkar, venöz dönüş düzelir. Tilt gebede kardiyopulmoner resüsitasyon sırasında özellikle önemlidir. Büyük intraabdominal kitleler (ör. tümörler) de benzer bası yapabilir. [[K1 s. 165]]',
      lat: ' <b>Tam lateral pozisyon.</b> IVC üzerindeki bası kalkar, venöz dönüş düzelir. Tilt gebede kardiyopulmoner resüsitasyon sırasında özellikle önemlidir. Büyük intraabdominal kitleler (ör. tümörler) de benzer bası yapabilir. [[K1 s. 165]]',
    };
    const DV = { spon: 0, ppv: -15, peep: -25 }, DG = { supin: -30, tilt: -10, lat: 0 }, ACI = { supin: 0, tilt: 15, lat: 90 }, UX = { supin: 0, tilt: 14, lat: 34 }, IVR = { supin: 2.5, tilt: 6.5, lat: 10 };
    let ven = 'spon', geb = false, poz = 'supin', ph = 0, cur = null;
    el.innerHTML = `<div class="f37-denet">
        <div><span class="f37-dl-t">Ventilasyon</span>${segHtml('Ventilasyon', 'v', [['spon', 'Spontan'], ['ppv', 'PPV'], ['peep', 'PPV + PEEP']], 'spon', 'f37-seg')}</div>
        <div><span class="f37-dl-t">Gebelik</span>${segHtml('Gebelik', 'g', [['0', 'Gebe değil'], ['1', 'Gebe (gebeliğin ortasından sonra)']], '0', 'f37-seg')}</div>
        <div><span class="f37-dl-t">Pozisyon</span>${segHtml('Pozisyon', 'p', [['supin', 'Supin'], ['tilt', 'Lateral tilt'], ['lat', 'Tam lateral']], 'supin', 'f37-seg')}</div></div>
      <div class="f37-ikili"><div class="f37-sahne"><svg class="f37-svg" viewBox="0 0 360 312" role="img" aria-label="Göğüs şeması ve intratorasik basınç göstergesi; karın kesitinde uterus, IVC ve aorta">
        <rect class="f37-govde" x="40" y="14" width="270" height="100" rx="30"/>
        <ellipse class="f37-akc f37-aL" cx="118" cy="64" ry="34"/><ellipse class="f37-akc f37-aR" cx="232" cy="64" ry="34"/><circle class="f37-kalp" cx="175" cy="72" r="15"/>
        <text class="f37-ts" x="175" y="104" text-anchor="middle">Göğüs</text>
        <rect class="f37-gz" x="326" y="18" width="20" height="96" rx="4"/><rect class="f37-gz-f f37-it" x="328" width="16"/><line class="f37-gz-0" x1="320" x2="352" y1="66" y2="66"/>
        <text class="f37-tk" x="317" y="70" text-anchor="end">0</text><text class="f37-ts" x="336" y="12" text-anchor="middle">İT</text>
        <g class="f37-kes2">
          <ellipse class="f37-govde" cx="180" cy="212" rx="92" ry="60"/><circle class="f37-om" cx="180" cy="258" r="11"/>
          <ellipse class="f37-ivc2" cx="157" cy="244" rx="13"/><circle class="f37-ao" cx="203" cy="244" r="8"/>
          <ellipse class="f37-ut" cy="200" rx="52" ry="40"/>
          <text class="f37-ts f37-rt f37-ut-t" text-anchor="middle">Uterus</text><text class="f37-ts f37-rt" x="140" y="262" text-anchor="end">IVC</text><text class="f37-ts f37-rt" x="218" y="262">Aorta</text>
        </g>
        <text class="f37-ts" x="6" y="290">Karın kesiti</text><text class="f37-ts" x="6" y="304">(ayaktan bakış)</text>
      </svg></div>
      <div class="f37-yan">${['Venöz dönüş', 'RV ön yükü', 'CO'].map((a, i) => `<div class="f37-mtr"><span>${a}</span><b class="f37-mini"><i data-m="${i}"></i></b><em data-mv="${i}"></em></div>`).join('')}
        <div class="f37-mtr"><span>Kan basıncı</span><em class="f37-kb" data-o="kb"></em></div>
        <div class="f37-faz">Solunum fazı: <b data-o="faz">İnspirasyon</b></div><p class="f37-not">Göreli düzey (başlangıç 100); yalnız sıralama anlamlıdır.</p></div></div>`;
    const $ = (q) => el.querySelector(q);
    const set = (e, a) => { for (const k in a) e.setAttribute(k, typeof a[k] === 'number' ? a[k].toFixed(1) : a[k]); };
    const hedef = () => 100 + DV[ven] + (geb ? DG[poz] : 0);
    let a = 0, ux = 0, ivr = 10, uo = 0, faz = '';
    const ciz = (insp, osc) => {
      const T = hedef(), v = T + osc;
      cur = cur == null ? v : cur;
      [0, 1, 2].forEach((i) => { const m = el.querySelector(`[data-m="${i}"]`); m.style.width = clamp(cur, 0, 110) / 1.1 + '%'; m.classList.toggle('az', T < 80); el.querySelector(`[data-mv="${i}"]`).textContent = Math.round(cur); });
      $('[data-o="kb"]').textContent = T >= 95 ? '→ korunur' : T >= 75 ? '↓ düşer' : '↓↓ belirgin düşer';
      $('[data-o="kb"]').classList.toggle('az', T < 95);
      // İT basınç (göreli): spontan insp −1, eksp −0,3; PPV insp +1,2, eksp 0; PEEP insp +1,7, eksp +0,5
      const IT = { spon: [-1, -0.3], ppv: [1.2, 0], peep: [1.7, 0.5] }[ven], it = lerp(IT[1], IT[0], insp);
      const h = it * 26; set($('.f37-it'), { y: h >= 0 ? 66 - h : 66, height: Math.abs(h) }); $('.f37-it').classList.toggle('neg', h < 0);
      set($('.f37-aL'), { rx: lerp(48, 54, insp) }); set($('.f37-aR'), { rx: lerp(48, 54, insp) });
      $('.f37-kes2').setAttribute('transform', `rotate(${a.toFixed(1)} 180 212)`);
      set($('.f37-ut'), { cx: 180 + ux }); $('.f37-ut').style.opacity = uo; $('.f37-ut-t').style.opacity = uo;
      set($('.f37-ivc2'), { ry: ivr }); $('.f37-ivc2').classList.toggle('bas', ivr < 5);
      set($('.f37-ut-t'), { x: 180 + ux, y: 204 });
      el.querySelectorAll('.f37-rt').forEach((t) => { const x = +t.getAttribute('x') || 0, y = +t.getAttribute('y') || 0; t.setAttribute('transform', `rotate(${(-a).toFixed(1)} ${x} ${y - 4})`); });
      const fz = insp > 0.5 ? 'İnspirasyon' : 'Ekspirasyon'; if (fz !== faz) { faz = fz; $('[data-o="faz"]').textContent = fz; }
    };
    const capG = () => {
      if (ven === 'spon' && !geb && poz === 'supin') return capYaz(el, ILK);
      capYaz(el, CV[ven] + (geb ? CG[poz] : ''));
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.v) { ven = b.dataset.v; basSec(el, 'v', ven); }
      else if (b.dataset.g) { geb = b.dataset.g === '1'; basSec(el, 'g', b.dataset.g); }
      else if (b.dataset.p) { poz = b.dataset.p; basSec(el, 'p', poz); }
      else return;
      capG(); if (RM) statik();
    });
    const hedefGeo = () => ({ a: ACI[poz], ux: geb ? UX[poz] : 0, ivr: geb ? IVR[poz] : 10, uo: geb ? 1 : 0 });
    const statik = () => { const G = hedefGeo(); a = G.a; ux = G.ux; ivr = G.ivr; uo = G.uo; cur = null; ciz(1, ven === 'spon' ? 5 : -5); };
    if (RM) { statik(); return () => {}; }
    ciz(0, 0);
    const stop = ticker(el, (dt) => {
      ph = (ph + dt / 4) % 1;
      const insp = ph < 0.4 ? ease(ph / 0.4) : 1 - ease((ph - 0.4) / 0.6);
      const osc = (ven === 'spon' ? 5 : -5) * insp;
      const G = hedefGeo(), f = Math.min(1, dt * 4);
      a = lerp(a, G.a, f); ux = lerp(ux, G.ux, f); ivr = lerp(ivr, G.ivr, f); uo = lerp(uo, G.uo, f);
      cur = lerp(cur, hedef() + osc, Math.min(1, dt / 0.25));
      ciz(insp, osc);
    });
    return () => stop();
  };

  /* =====================================================================
     6 · f37_lumen — intralüminal basınç, lümen biçimi, direnç (K1 s. 165)
     ===================================================================== */
  VIZ.f37_lumen = (el) => {
    const CAP = {
      yuk: '<b>12 mmHg\'nin üstü: dairesel lümen, direnç görece düşük.</b> Basıncı azaltın ya da bir ven düzeyi seçin. [[K1 s. 165]]',
      orta: '<b>12 mmHg\'nin altında lümen elipsleşir.</b> 4 mmHg\'de lümen elips biçimlidir; akım direnci artmıştır. [[K1 s. 165]]',
      dus: '<b>1 mmHg: lümen sıklıkla kollabe.</b> Direnç belirgin artar. [[K1 s. 165]]',
      venul: '<b>Venüller 10–15 mmHg.</b> Dairesel lümen direnci en aza indirir. [[K1 s. 165]]',
      ven: '<b>Venler 4–8 mmHg.</b> Lümen elipse yaklaşır, direnç artar. [[K1 s. 165]]',
      ivc: '<b>IVC 0–2 mmHg.</b> Kollabe IVC akım direncini belirgin artırabilir. [[K1 s. 165]]',
      egz: '<b>Egzersiz.</b> Artan sempatik çıkış venomotor tonusu ve intralüminal basıncı yükseltir; lümen daireselleşir, direnç azalır. İskelet kası ve solunum pompalarının yerel basınç gradyanları da etkin direnci azaltır. [[K1 s. 165]]',
    };
    let p = 14, egz = false, dar = false, t = 0, G = null, k = 1, kh = 1, R = 1, Rh = 1, dots = [];
    el.innerHTML = `<div class="f37-ust"><div class="btn-row">${[['venul', 'Venül', 12.5], ['ven', 'Ven', 6], ['ivc', 'IVC', 1]].map(([v, l, x]) => `<button type="button" class="btn ghost" data-lv="${v}" data-p="${x}" aria-pressed="false">${l}</button>`).join('')}
        <button type="button" class="btn ghost f37-tgl" data-a="egz" aria-pressed="false">Egzersiz: sempatik tonus ↑</button></div></div>
      <label class="f37-rng"><span>İntralüminal basınç <b data-o="p">14 mmHg</b></span><input type="range" min="0" max="15" step="0.5" value="14" aria-label="İntralüminal basınç (mmHg)"></label>
      <div class="f37-harita"></div>`;
    const harita = el.querySelector('.f37-harita');
    const bicim = (q) => { // q: etkin basınç → [en/boy oranı, göreli direnç]
      if (q >= 12) return [1, 1];
      if (q >= 4) { const f = (12 - q) / 8; return [1 - 0.55 * f, 1 + 2 * f]; }
      if (q >= 1) { const f = (4 - q) / 3; return [0.45 - 0.35 * f, 3 + 7 * f]; }
      return [0.1 - 0.06 * (1 - q), 10 + 10 * (1 - q)];
    };
    const PER = 2 * Math.PI * 66;
    const sekil = (cx, cy, kk) => { // çevre sabit elips; çok basıkta ortası büzülür (yarık)
      const h = Math.pow((1 - kk) / (1 + kk), 2), a = PER / (Math.PI * (1 + kk) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)))), b = kk * a;
      const pinch = kk < 0.12 ? (0.12 - kk) / 0.08 : 0;
      let d = '';
      for (let i = 0; i <= 64; i++) { const th = (i / 64) * 2 * Math.PI, c = Math.cos(th), s = Math.sin(th); const y = b * s * (1 - 0.8 * pinch * Math.pow(1 - c * c, 0.5) * (1 - Math.abs(c))); d += (i ? 'L' : 'M') + (cx + a * c).toFixed(1) + ' ' + (cy + y).toFixed(1); }
      return [d + 'Z', a, b];
    };
    const ciz = () => {
      G = dar ? { vb: '0 0 360 498', cx: 180, cy: 92, sx0: 40, sx1: 320, sy: 205, ax0: 30, ax1: 330, ay: 318, ry: 398, fy: 446 }
        : { vb: '0 0 560 300', cx: 128, cy: 104, sx0: 24, sx1: 232, sy: 238, ax0: 268, ax1: 540, ay: 76, ry: 168, fy: 222 };
      const X = (q) => G.ax0 + (q / 15) * (G.ax1 - G.ax0);
      const bant = (a2, b2, l, c) => `<rect class="f37-bant ${c}" x="${X(a2).toFixed(1)}" y="${G.ay - 26}" width="${(X(b2) - X(a2)).toFixed(1)}" height="16" rx="4"/><text class="f37-ts" x="${((X(a2) + X(b2)) / 2).toFixed(1)}" y="${G.ay - 32}" text-anchor="middle">${l}</text>`;
      const esik = (q, l) => `<line class="f37-esik" x1="${X(q).toFixed(1)}" x2="${X(q).toFixed(1)}" y1="${G.ay - 6}" y2="${G.ay + 8}"/><text class="f37-ts f37-esik-t" x="${X(q).toFixed(1)}" y="${G.ay + 36}" text-anchor="middle">${l}</text>`;
      const RX = (r) => G.ax0 + (Math.min(r, 20) / 20) * (G.ax1 - G.ax0);
      harita.innerHTML = `<svg class="f37-svg f37-lsvg${dar ? ' f37-dar' : ''}" viewBox="${G.vb}" role="img" aria-label="Basınca göre ven lümeninin biçimi, tipik venöz basınçlar ve akım direnci">
        <path class="f37-lw"/><path class="f37-ll"/><text class="f37-t" x="${G.cx}" y="${dar ? 14 : 14}" text-anchor="middle">Ven kesiti</text>
        <rect class="f37-sw" x="${G.sx0}" width="${G.sx1 - G.sx0}" height="5" data-r="ust"/><rect class="f37-sw" x="${G.sx0}" width="${G.sx1 - G.sx0}" height="5" data-r="alt"/><rect class="f37-sl" x="${G.sx0}" width="${G.sx1 - G.sx0}" data-r="lum"/>
        <g class="f37-sp"></g><text class="f37-ts" x="${G.sx0}" y="${G.sy - 22}">Boyuna görünüm: akım →</text>
        <line class="f37-eks" x1="${G.ax0}" x2="${G.ax1}" y1="${G.ay}" y2="${G.ay}"/>
        ${[0, 5, 10, 15].map((q) => `<text class="f37-tk" x="${X(q).toFixed(1)}" y="${G.ay + 18}" text-anchor="middle">${q}</text>`).join('')}
        ${bant(0, 2, 'IVC 0–2', 'b-ivc')}${bant(4, 8, 'Venler 4–8', 'b-ven')}${bant(10, 15, 'Venüller 10–15', 'b-vnl')}
        ${esik(1, 'kollabe')}${esik(4, 'elips')}${esik(12, 'dairesel')}
        <text class="f37-ts" x="${G.ax1}" y="${G.ay + 52}" text-anchor="end">intralüminal basınç (mmHg)</text>
        <path class="f37-imlec" d=""/><text class="f37-t f37-imlec-t" text-anchor="middle"></text>
        <text class="f37-t" x="${G.ax0}" y="${G.ry - 12}">Akım direnci (göreli)</text>
        <rect class="f37-rtr" x="${G.ax0}" y="${G.ry}" width="${G.ax1 - G.ax0}" height="14" rx="7"/><rect class="f37-rfl" x="${G.ax0}" y="${G.ry}" height="14" rx="7"/>
        ${[1, 3, 10].map((r) => `<line class="f37-esik" x1="${RX(r).toFixed(1)}" x2="${RX(r).toFixed(1)}" y1="${G.ry + 16}" y2="${G.ry + 22}"/><text class="f37-tk" x="${RX(r).toFixed(1)}" y="${G.ry + 34}" text-anchor="middle">${r}×</text>`).join('')}
        <text class="f37-t f37-rv" x="${G.ax1}" y="${G.ry - 12}" text-anchor="end"></text>
        <rect class="f37-fk" x="${G.ax0}" y="${G.fy}" width="${G.ax1 - G.ax0}" height="44" rx="10"/>
        <text class="f37-t f37-mono" x="${(G.ax0 + G.ax1) / 2}" y="${G.fy + 19}" text-anchor="middle">R = 8ηl / πr⁴</text><text class="f37-ts" x="${(G.ax0 + G.ax1) / 2}" y="${G.fy + 36}" text-anchor="middle">direnç ∝ 1/r⁴ (Hagen–Poiseuille)</text>
      </svg>`;
      const g = harita.querySelector('.f37-sp');
      dots = RM ? [] : Array.from({ length: 10 }, (_, i) => ({ x: G.sx0 + 6 + i * 20, j: ((i * 37) % 11) / 11 - 0.5, c: mk('circle', { r: 3, class: 'f37-dot-b' }, g) }));
      kh = k; Rh = R; guncelle(true);
    };
    const pe = () => Math.min(15, p + (egz ? 4 : 0));
    const guncelle = (ani) => {
      const q = pe(); [k, R] = bicim(q);
      if (ani || RM) { kh = k; Rh = R; }
      el.querySelector('[data-o="p"]').textContent = fmt(p, 1).replace(',0', '') + ' mmHg' + (egz ? ` → ${fmt(q, 1).replace(',0', '')} (egzersiz)` : '');
      const X = (v) => G.ax0 + (v / 15) * (G.ax1 - G.ax0), x = X(q);
      harita.querySelector('.f37-imlec').setAttribute('d', `M${x.toFixed(1)} ${G.ay - 4} l-6 -8 h12 z M${x.toFixed(1)} ${G.ay} v${-30}`);
      const it = harita.querySelector('.f37-imlec-t'); it.setAttribute('x', clamp(x, G.ax0 + 18, G.ax1 - 18).toFixed(1)); it.setAttribute('y', G.ay - 46); it.textContent = fmt(q, 1).replace(',0', '');
      ciz2();
    };
    const ciz2 = () => {
      const [d, a, b] = sekil(G.cx, G.cy, kh), [d2] = sekil(G.cx, G.cy, Math.max(0.03, kh - 0.02));
      harita.querySelector('.f37-lw').setAttribute('d', d); harita.querySelector('.f37-ll').setAttribute('d', d2);
      harita.querySelector('.f37-ll').classList.toggle('kol', kh < 0.12);
      const hh = Math.max(3, 50 * b / 66);
      const yc = G.sy + 24;
      harita.querySelectorAll('[data-r]').forEach((r) => { const w = r.dataset.r; if (w === 'ust') r.setAttribute('y', (yc - hh / 2 - 5).toFixed(1)); else if (w === 'alt') r.setAttribute('y', (yc + hh / 2).toFixed(1)); else { r.setAttribute('y', (yc - hh / 2).toFixed(1)); r.setAttribute('height', hh.toFixed(1)); } });
      dots.forEach((q) => { q.c.setAttribute('cx', q.x.toFixed(1)); q.c.setAttribute('cy', (yc + q.j * Math.max(0, hh - 6)).toFixed(1)); q.c.setAttribute('r', hh < 8 ? 2 : 3); });
      const RX = (r) => (Math.min(r, 20) / 20) * (G.ax1 - G.ax0);
      const fl = harita.querySelector('.f37-rfl'); fl.setAttribute('width', Math.max(14, RX(Rh)).toFixed(1)); fl.classList.toggle('yuk', Rh >= 10);
      harita.querySelector('.f37-rv').textContent = Rh >= 10.5 ? '≫ 10×' : fmt(Rh, 1) + '×';
    };
    const capSec = (lv) => {
      if (egz) return capYaz(el, CAP.egz);
      if (lv) return capYaz(el, CAP[lv]);
      const q = pe(); capYaz(el, q >= 12 ? CAP.yuk : q > 1 ? CAP.orta : CAP.dus);
    };
    const inp = el.querySelector('input[type=range]');
    inp.addEventListener('input', () => { p = +inp.value; basSec(el, 'lv', ''); guncelle(); capSec(); });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.lv) { p = +b.dataset.p; inp.value = p; basSec(el, 'lv', b.dataset.lv); guncelle(); capSec(b.dataset.lv); }
      else if (b.dataset.a === 'egz') { egz = !egz; b.setAttribute('aria-pressed', String(egz)); guncelle(); capSec(); }
    });
    const ro = darIzle(el, (n) => { dar = n; ciz(); });
    const stop = RM ? () => {} : ticker(el, (dt) => {
      t += dt; const f = Math.min(1, dt * 6); kh = lerp(kh, k, f); Rh = lerp(Rh, R, f);
      const v = 70 / Rh;
      dots.forEach((q) => { q.x += v * dt; if (q.x > G.sx1 - 6) q.x = G.sx0 + 6; });
      ciz2();
    });
    return () => { stop(); ro(); };
  };
})();
