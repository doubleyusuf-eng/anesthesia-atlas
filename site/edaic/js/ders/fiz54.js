/* Bölüm 54 · İskelet kası · bileşenler (tarif: docs/tasarim/fiz54.md; K1 s. 239–245).
   Şematik modeller; sayılar kitaptan, süreler ve oranlar temsilîdir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const segH = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const capSet = (el, html) => { const c = el.closest('.viz'); const p = c && c.querySelector('.viz-cap'); if (p) p.innerHTML = REF(html); };
  const tx = (x, y, t, cls = '', anc = '') => `<text x="${x}" y="${y}" class="f54-t ${cls}"${anc ? ` text-anchor="${anc}"` : ''}>${t}</text>`;

  /* Kapsayıcı genişliğine göre geniş/dar yerleşim; durum çağıranın kapanışında kalır */
  function comp(el, mk) {
    let nr = null, disp = null, ro = null;
    const go = () => {
      const n = !!(el.clientWidth && el.clientWidth < 560);
      if (n === nr) return;
      nr = n; if (disp) disp();
      el.classList.toggle('f54-dar', n);
      disp = mk(n) || (() => {});
    };
    go();
    if ('ResizeObserver' in window) { ro = new ResizeObserver(go); ro.observe(el); }
    return () => { if (ro) ro.disconnect(); if (disp) disp(); disp = null; };
  }

  /* Sarkomer çizimi (sarkomer, köprü, kuvvet bileşenleri ortak): Z diskleri x0 ve x1; A ve T piksel uzunluğu */
  const zig = (x, cy, hh) => { let d = `M${x} ${cy - hh}`; for (let i = 1; i <= 8; i++) d += `L${x + (i % 2 ? 4 : -4)} ${cy - hh + (i * 2 * hh) / 8}`; return `<path d="${d}" fill="none" stroke="var(--ink)" stroke-width="2.4"/>`; };
  function sarkG(x0, x1, cy, A, T, o = {}) {
    const mid = (x0 + x1) / 2, gap = o.gap || 22, sw = o.sw || 5;
    let s = '';
    const ty = [cy - gap, cy, cy + gap], my = [cy - gap / 2, cy + gap / 2];
    // ince filamanlar: soldan ve sağdan
    ty.forEach((y, i) => {
      const L = i % 2 === 0;
      const a = L ? x0 : x1 - T, b = L ? x0 + T : x1;
      s += `<line x1="${a}" y1="${y}" x2="${b}" y2="${y}" stroke="var(--c-basic)" stroke-width="${sw - 1.6}" stroke-linecap="round"/>`;
      const a2 = L ? x1 - T : x0, b2 = L ? x1 : x0 + T, y2 = y + gap / 2 + (i === 2 ? -gap * 1.5 : 0);
      void a2; void b2; void y2;
    });
    // diğer taraftan gelenler ara sıralarda
    [cy - gap * 1.5, cy - gap * 0.5, cy + gap * 0.5, cy + gap * 1.5].forEach((y, i) => {
      const L = i % 2 === 1;
      const a = L ? x0 : x1 - T, b = L ? x0 + T : x1;
      s += `<line x1="${a}" y1="${y}" x2="${b}" y2="${y}" stroke="var(--c-basic)" stroke-width="${sw - 1.6}" stroke-linecap="round" opacity=".9"/>`;
    });
    const t0 = mid - A / 2, t1 = mid + A / 2;
    my.forEach((y) => {
      s += `<line x1="${t0}" y1="${y}" x2="${t1}" y2="${y}" stroke="var(--accent)" stroke-width="${sw + 2.2}" stroke-linecap="round"/>`;
      for (let x = t0 + 8; x < t1 - 4; x += 9) {
        if (Math.abs(x - mid) < 5) continue;
        s += `<line x1="${x}" y1="${y}" x2="${x + (x < mid ? -4 : 4)}" y2="${y + (y < cy ? -9 : 9)}" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round"/>`;
      }
    });
    return s + zig(x0, cy, gap * 2) + zig(x1, cy, gap * 2);
  }
  /* aktin boncukları (Z diski ile birlikte) */
  const bead = (x, y, r, fill = 'var(--c-basic)') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="var(--paper)" stroke-width="1"/>`;

  /* ---------- 1 · Altı işlev ---------- */
  VIZ.f54_islev = (el) => {
    const IS = [
      ['hareket', 'Hareket', 'Orijin ile insersiyon arası kısalır', '<b>Hareket (lokomosyon).</b> Kas kasılınca orijin ile insersiyon noktası arasındaki uzaklık kısalır ve eklem hareket eder. Başka bir işlev seçin. [[K1 s. 239]]'],
      ['durus', 'Duruş', 'Tonik kasılma: sinerjist + karşıt kaslar', '<b>Duruş ve eklem dengesi.</b> Birbirini destekleyen ve karşıt birçok kas grubunun sürekli (tonik) kasılmasıyla sağlanır. [[K1 s. 239]]'],
      ['organ', 'Organ desteği', 'Karın duvarı ve pelvik taban organları taşır', '<b>Yumuşak doku desteği.</b> Karın duvarı ve pelvik taban kasları altlarındaki iç organları taşır ve korur. [[K1 s. 239]]'],
      ['sfinkter', 'Sfinkterler', 'Yutma · defekasyon · işeme', '<b>Sfinkter işlevi.</b> Sindirim ve idrar yollarında iskelet kası yutma, defekasyon ve işemenin istemli denetimini sağlar. [[K1 s. 239]]'],
      ['isi', 'Isı', 'Bazal metabolizma + titreme', '<b>Isı üretimi.</b> Kasın bazal metabolizma hızının değişmesiyle ve titremeyle (kasın art arda kasılıp gevşemesi) olur. [[K1 s. 239]]'],
      ['venoz', 'Venöz dönüş', 'Kas pompası: kan kalbe', '<b>Venöz dönüş.</b> Bacak kasları kasıldıkça yerel basınç farkları oluşturur ve venöz kanı kalbe doğru iter. [[K1 s. 239]]'],
    ];
    let cur = 'hareket';
    const arr = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--accent-ink)" stroke-width="2.4" marker-end="url(#f54-ok)" marker-start="url(#f54-ok)"/>`;
    const reg = {
      hareket: () => `<rect x="54" y="180" width="34" height="66" rx="14"/><rect x="92" y="180" width="34" height="66" rx="14"/>`,
      durus: () => `<rect x="52" y="60" width="18" height="112" rx="9"/><rect x="130" y="60" width="18" height="112" rx="9"/>`,
      organ: () => `<rect x="62" y="116" width="76" height="56" rx="14"/><ellipse cx="100" cy="180" rx="34" ry="9"/>`,
      sfinkter: () => `<circle cx="100" cy="58" r="9"/><circle cx="92" cy="178" r="8"/><circle cx="108" cy="188" r="8"/>`,
      isi: () => `<path d="M62 90q8-8 16 0t16 0t16 0t16 0M62 120q8-8 16 0t16 0t16 0t16 0M62 150q8-8 16 0t16 0t16 0t16 0M58 210q6-6 12 0t12 0M118 210q6-6 12 0t12 0M58 270q6-6 12 0t12 0M118 270q6-6 12 0t12 0" fill="none"/>`,
      venoz: () => `<rect x="56" y="254" width="30" height="58" rx="13"/><rect x="114" y="254" width="30" height="58" rx="13"/>`,
    };
    const extra = {
      hareket: '<g class="f54-ex"><line x1="71" y1="186" x2="71" y2="244" stroke="var(--accent-ink)" stroke-width="2.4" marker-end="url(#f54-ok)" marker-start="url(#f54-ok)"/></g>',
      durus: '<g class="f54-ex">' + arr(76, 116, 92, 116) + arr(124, 116, 108, 116) + '</g>',
      organ: '', sfinkter: '',
      isi: '',
      venoz: '<g class="f54-ex"><path d="M71 318V196M129 318V196" stroke="var(--c-basic)" stroke-width="3" stroke-dasharray="3 7" class="f54-flow" fill="none" marker-end="url(#f54-ok2)"/></g>',
    };
    return comp(el, (nr) => {
      el.innerHTML = `${segH('İskelet kası işlevi', 'i', IS.map((x) => [x[0], x[1]]), cur)}
        <div class="f54-islev"><svg class="f54-svg f54-body" viewBox="0 0 200 330" role="img" aria-label="Şematik insan silueti; seçilen işlevin bölgesi vurgulanır">
          <defs><marker id="f54-ok" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L8 4L0 8z" fill="var(--accent-ink)"/></marker><marker id="f54-ok2" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L8 4L0 8z" fill="var(--c-basic)"/></marker></defs>
          <g fill="var(--chip)" stroke="var(--line)" stroke-width="2"><circle cx="100" cy="30" r="22"/><rect x="56" y="56" width="88" height="122" rx="28"/><rect x="26" y="62" width="24" height="112" rx="12"/><rect x="150" y="62" width="24" height="112" rx="12"/><rect x="54" y="176" width="36" height="140" rx="16"/><rect x="110" y="176" width="36" height="140" rx="16"/></g>
          <g class="f54-regs"></g></svg>
          <div class="f54-card"><b class="f54-card-t"></b><span class="f54-card-s"></span></div></div>`;
      const g = el.querySelector('.f54-regs');
      const draw = () => {
        g.innerHTML = IS.map(([k]) => `<g class="f54-reg${k === cur ? ' f54-sel' : ''} f54-r-${k}" data-i="${k}" tabindex="0" role="button" aria-label="${IS.find((x) => x[0] === k)[1]}">${reg[k]()}</g>`).join('') + (extra[cur] || '');
        const it = IS.find((x) => x[0] === cur);
        el.querySelector('.f54-card-t').textContent = it[1];
        el.querySelector('.f54-card-s').textContent = it[2];
        basSec(el, 'i', cur); capSet(el, it[3]);
        el.querySelectorAll('[data-i]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.i === cur)));
      };
      const pick = (e) => { const t = e.target.closest('[data-i]'); if (!t) return; cur = t.dataset.i; draw(); };
      el.addEventListener('click', pick);
      el.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('g[data-i]')) { e.preventDefault(); pick(e); } });
      draw();
      return () => { el.removeEventListener('click', pick); };
    });
  };

  /* ---------- 2 · Beş büyütme düzeyi ---------- */
  VIZ.f54_yapi = (el) => {
    const AD = ['Kas', 'Fasikül', 'Kas lifi', 'Miyofibril', 'Miyofilaman'];
    const CAP = [
      '<b>Kas.</b> Bütün kası kalın epimisyum sarar; iki uçta bağ dokusu katmanları birleşip tendon ya da aponevroz olur ve kası genellikle kemiğe bağlar. Yakınlaştırın. [[K1 s. 239]]',
      '<b>Fasikül.</b> Yaklaşık 100 miyositlik demetler perimisyumla sarılıdır; bu demetlere fasikül denir. Kası kan damarları ve sinirler besler. [[K1 s. 239]]',
      '<b>Kas lifi (miyosit).</b> Her lifi ince endomisyum sarar. Lif kasın bütün boyunca uzanabilir, çapı 50 μm\'ye ulaşabilir; çok çekirdeklidir ve çekirdekler çevrededir. [[K1 s. 239]]',
      '<b>Miyofibril.</b> Lifin boyunca paralel uzanan kasılma aygıtıdır; uçlarından sarkolemmaya tutunduğu için kasılınca bütün hücre kısalır. Çevresinde SR (Ca²⁺ deposu) ve T-tübüller bulunur. [[K1 s. 239]]',
      '<b>Miyofilaman.</b> Miyofibrillerin içindeki demetler kasılma proteinleri aktin ve miyozini içerir; düzenli tekrar çizgilenmeyi verir. [[K1 s. 239]]',
    ];
    // Her düzey: [şekil, etiketler[x,y,metin,anchor,renk]] (tasarım uzayı 600×280)
    const sc = [];
    sc[0] = () => ({ s: `<path d="M70 140C150 50 410 50 490 140C410 230 150 230 70 140Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="5"/>
      ${[0, 1, 2, 3, 4].map((i) => `<path d="M${95 + i * 6} ${140 - 2 * i}C190 ${95 + i * 8} 370 ${95 + i * 8} ${465 - i * 6} ${140 + 2 * i}" fill="none" stroke="var(--accent)" stroke-width="1.4" opacity=".55"/>`).join('')}
      <rect x="18" y="130" width="54" height="20" rx="6" fill="var(--chip)" stroke="var(--line)" stroke-width="3"/><rect x="488" y="130" width="54" height="20" rx="6" fill="var(--chip)" stroke="var(--line)" stroke-width="3"/><rect x="540" y="116" width="36" height="48" rx="10" fill="var(--paper)" stroke="var(--line)" stroke-width="3"/>
      <path d="M130 212C220 246 340 246 430 212" fill="none" stroke="var(--crit)" stroke-width="3.5"/><path d="M130 220C220 254 340 254 430 220" fill="none" stroke="var(--warn)" stroke-width="2.4" stroke-dasharray="5 4"/>`,
      l: [[280, 40, 'Epimisyum (kalın kılıf)', 'middle', 'var(--accent-ink)'], [290, 268, 'Kan damarı, sinir', 'middle', 'var(--crit)'], [590, 100, 'Tendon / aponevroz → kemik', 'end', 'var(--muted)'], [20, 108, 'Tendon', 'start', 'var(--muted)']] });
    sc[1] = () => {
      const c = [[300, 140, 26]];
      for (let i = 0; i < 6; i++) { const a = (i * 60) * Math.PI / 180; c.push([300 + 60 * Math.cos(a), 140 + 60 * Math.sin(a), 26]); }
      for (let i = 0; i < 6; i++) { const a = (30 + i * 60) * Math.PI / 180; c.push([300 + 100 * Math.cos(a), 140 + 100 * Math.sin(a), 18]); }
      const dots = [[-9, -6], [5, -9], [10, 4], [-4, 8], [-12, 6], [0, 0], [8, -1]].map((p) => `<circle cx="${(c[1][0] + p[0]).toFixed(1)}" cy="${(c[1][1] + p[1]).toFixed(1)}" r="3.4" fill="var(--accent)" opacity=".75"/>`).join('');
      return { s: `<circle cx="300" cy="140" r="128" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="5"/>` +
        c.map((b, i) => `<circle cx="${b[0].toFixed(1)}" cy="${b[1].toFixed(1)}" r="${b[2]}" fill="var(--paper)" stroke="${i === 1 ? 'var(--accent)' : 'var(--line)'}" stroke-width="${i === 1 ? 4.5 : 2.5}"/>`).join('') + dots +
        `<circle cx="338" cy="88" r="4" fill="var(--crit)"/><circle cx="262" cy="196" r="4" fill="var(--warn)"/>`,
      l: [[440, 54, 'Epimisyum', 'start', 'var(--accent-ink)'], [372, 112, 'Perimisyum · fasikül ≈ 100 miyosit', 'start', 'var(--ink)'], [165, 232, 'Kan damarı, sinir', 'end', 'var(--crit)']] };
    };
    sc[2] = () => ({ s: `<rect x="70" y="84" width="460" height="112" rx="56" fill="none" stroke="var(--line)" stroke-width="3" stroke-dasharray="6 4"/><rect x="80" y="94" width="440" height="92" rx="46" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="3"/>
      ${Array.from({ length: 28 }, (_, i) => `<line x1="${112 + i * 13}" y1="100" x2="${112 + i * 13}" y2="180" stroke="var(--accent)" stroke-width="2" opacity=".28"/>`).join('')}
      ${[[150, 102], [235, 178], [330, 102], [420, 178], [480, 104]].map((p) => `<ellipse cx="${p[0]}" cy="${p[1]}" rx="14" ry="6" fill="var(--paper)" stroke="var(--accent-ink)" stroke-width="2.2"/>`).join('')}
      <line x1="548" y1="94" x2="548" y2="186" stroke="var(--muted)" stroke-width="2" marker-start="url(#f54-ya)" marker-end="url(#f54-ya)"/>`,
      l: [[300, 58, 'Endomisyum (lifi saran ince kılıf)', 'middle', 'var(--muted)'], [300, 226, 'Çekirdekler çevrede (çok çekirdekli)', 'middle', 'var(--accent-ink)'], [300, 252, 'Çizgilenme · lif kas boyunca uzanabilir', 'middle', 'var(--ink)'], [540, 78, 'Çap ≈ 50 μm', 'end', 'var(--muted)']] });
    sc[3] = () => ({ s: `<rect x="40" y="52" width="520" height="176" rx="22" fill="var(--paper)" stroke="var(--line)" stroke-width="4"/>
      ${[0, 1, 2, 3].map((i) => { const y = 72 + i * 38; return `<path d="M60 ${y - 6}H540M60 ${y + 28}H540" stroke="var(--warn)" stroke-width="1.6" fill="none" stroke-dasharray="2 3"/><rect x="60" y="${y}" width="480" height="22" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/>` + Array.from({ length: 11 }, (_, j) => `<rect x="${86 + j * 44}" y="${y}" width="14" height="22" fill="var(--accent)" opacity=".4"/>`).join(''); }).join('')}
      <rect x="296" y="52" width="9" height="176" fill="var(--ink)" opacity=".85"/><ellipse cx="190" cy="140" rx="22" ry="8" fill="var(--ok-soft)" stroke="var(--ok)" stroke-width="2.4"/><ellipse cx="420" cy="102" rx="22" ry="8" fill="var(--ok-soft)" stroke="var(--ok)" stroke-width="2.4"/>
      ${[[150, 98], [244, 176], [352, 134], [468, 176], [470, 130]].map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="3.2" fill="var(--muted)"/>`).join('')}`,
      l: [[300, 24, 'T-tübül: aksiyon potansiyelini içeri taşır', 'middle', 'var(--ink)'], [48, 252, 'Sarkoplazmik retikulum: Ca²⁺ deposu', 'start', 'var(--warn)'], [552, 252, 'Mitokondri · glikojen granülleri', 'end', 'var(--ok)'], [300, 274, 'Miyofibril uçlarından sarkolemmaya tutunur', 'middle', 'var(--accent-ink)']] });
    sc[4] = () => {
      let s = `<rect x="40" y="84" width="520" height="116" rx="10" fill="var(--paper)" stroke="var(--line)" stroke-width="2.5"/>`;
      for (let i = 0; i < 3; i++) { const x0 = 70 + i * 150, x1 = x0 + 150; s += `<rect x="${x0 + 15}" y="86" width="120" height="112" fill="var(--accent-soft)" opacity=".7"/>` + sarkG(x0, x1, 142, 108, 70, { gap: 14, sw: 4 }); }
      s += zig(520, 142, 28);
      return { s, l: [[300, 240, 'Aktin (ince) · Miyozin (kalın)', 'middle', 'var(--ink)'], [300, 264, '→ sarkomer: sonraki şekil', 'middle', 'var(--accent-ink)'], [220, 66, 'A bandı (koyu)', 'middle', 'var(--accent-ink)'], [145, 66, 'I', 'middle', 'var(--muted)']] };
    };
    let lv = 0;
    return comp(el, (nr) => {
      el.innerHTML = `<div class="f54-stp"><button type="button" class="btn ghost" data-s="-1" aria-label="Uzaklaştır">−</button>${segH('Büyütme düzeyi', 'lv', AD.map((a, i) => [i, a]), lv)}<button type="button" class="btn ghost" data-s="1" aria-label="Yakınlaştır">+</button></div>
        <svg class="f54-svg f54-yp" viewBox="${nr ? '0 0 600 330' : '0 0 600 290'}" role="img" aria-label="Kas yapısının beş büyütme düzeyi"><defs><marker id="f54-ya" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" fill="var(--muted)"/></marker></defs><g class="f54-zm"></g><g class="f54-inset"></g></svg>
        <ul class="f54-lg"></ul>`;
      const g = el.querySelector('.f54-zm'), ins = el.querySelector('.f54-inset'), lg = el.querySelector('.f54-lg');
      const draw = () => {
        const d = sc[lv]();
        const stroke = (c) => c;
        if (nr) {
          g.innerHTML = d.s; lg.innerHTML = d.l.map((x) => `<li><i style="background:${stroke(x[4])}"></i>${x[2]}</li>`).join('');
        } else {
          g.innerHTML = d.s + d.l.map((x) => `<text x="${x[0]}" y="${x[1]}" class="f54-t f54-yl" text-anchor="${x[3]}" fill="${x[4]}">${x[2]}</text>`).join(''); lg.innerHTML = '';
        }
        // küçük büyüteç çerçevesi: önceki düzey
        if (lv > 0) { const p = sc[lv - 1]().s; ins.innerHTML = `<g transform="translate(8 ${nr ? 8 : 6}) scale(.2)"><rect x="-10" y="-10" width="620" height="300" fill="var(--paper)" stroke="var(--line)" stroke-width="12" rx="20"/>${p}</g><rect x="${8 + 25}" y="${(nr ? 8 : 6) + 12}" width="22" height="26" fill="none" stroke="var(--crit)" stroke-width="2.2" rx="3"/>`; } else ins.innerHTML = '';
        g.classList.remove('f54-zin'); void g.getBoundingClientRect(); if (!RM) g.classList.add('f54-zin');
        basSec(el, 'lv', lv); capSet(el, CAP[lv]);
        el.querySelector('[data-s="-1"]').disabled = lv === 0; el.querySelector('[data-s="1"]').disabled = lv === 4;
      };
      const clk = (e) => { const b = e.target.closest('[data-lv],[data-s]'); if (!b) return; if (b.dataset.lv !== undefined) lv = +b.dataset.lv; else lv = clamp(lv + +b.dataset.s, 0, 4); draw(); };
      el.addEventListener('click', clk); draw();
      return () => el.removeEventListener('click', clk);
    });
  };

  /* ---------- 3 · Sarkomer ---------- */
  VIZ.f54_sarkomer = (el) => {
    let k = 0, mode = 'sark', defn = null, stopT = null, playing = false;
    const DEF = {
      Z: 'Z diski — Sarkomerin iki ucunda, I bandını ikiye böler; ince filamanlar buna bağlıdır. [[K1 s. 240]]',
      I: 'I bandı — İzotropik, açık bant: ince filamanın kalınla örtüşmeyen kısmı. [[K1 s. 240]]',
      A: 'A bandı — Anizotropik, koyu bant: örtüşen bölgeler dahil kalın filamanın bütün boyu. [[K1 s. 240]]',
      H: 'H bandı — Heller bandı: A bandının yalnız miyozin içeren ortası. [[K1 s. 240]]',
    };
    const capK = () => {
      if (defn) { const [a, ...r] = DEF[defn].split(' — '); return `<b>${a}.</b> ${r.join(' — ')}`; }
      if (mode === 'fib') return '<b>Miyofibril.</b> Sarkomerler uç uca dizilir: A ve I bantları sırayla tekrarlar, her sarkomer bir A bandı ve iki yarım I bandı içerir. [[K1 s. 240]]';
      if (k === 0) return '<b>Dinlenme uzunluğu.</b> Sarkomer iki Z diski arasındadır: ortada bir A bandı, iki yanda yarım I bantları. Kaydırıcıyla kısaltın. [[K1 s. 240]]';
      if (k >= 100) return '<b>En kısa.</b> H bandı kayboldu; I bantları en dar. Filamanların boyu yine aynı: kısalma tümüyle kaymadandır. [[K1 s. 243]]';
      return '<b>Kasılıyor.</b> İnce filamanlar sarkomerin ortasına kayar: Z diskleri yaklaşır, I bandı ve H bandı daralır. A bandı değişmez, çünkü kalın filamanlar kısalmaz. [[K1 s. 243]]';
    };
    return comp(el, (nr) => {
      const W = nr ? 360 : 640, base = nr ? 1.0 : 1.5, H = nr ? 236 : 246;
      el.innerHTML = `<div class="btn-row f54-ctl">${segH('Görünüm', 'm', [['sark', 'Sarkomer'], ['fib', 'Miyofibril']], mode)}<button type="button" class="btn ghost" data-play aria-pressed="false">Oynat</button></div>
        <label class="f54-rng"><span>Kısalma: <b data-o="k"></b></span><input type="range" min="0" max="100" step="1" value="${k}" data-r aria-label="Sarkomer kısalması, yüzde"></label>
        <svg class="f54-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Sarkomerin Z diskleri, A, I ve H bantları; kısalmada I ve H bandı daralır, A bandı sabit kalır"><g class="f54-sk"></g></svg>
        <div class="f54-chips"><span class="f54-chip" data-c="s"></span><span class="f54-chip" data-c="i"></span><span class="f54-chip" data-c="h"></span><span class="f54-chip ok" data-c="a">A bandı: sabit</span></div>`;
      const g = el.querySelector('.f54-sk'), rng = el.querySelector('[data-r]'), pbtn = el.querySelector('[data-play]');
      const draw = () => {
        const n = mode === 'sark' ? 1 : 2, u = base / n, S = (300 - k) , A = 160, T = 100;
        const Sp = S * u, tot = Sp * n, x0 = (W - tot) / 2, top = 38, cy = 126;
        let s = '';
        for (let i = 0; i < n; i++) {
          const a = x0 + i * Sp, b = a + Sp, m = (a + b) / 2, a0 = m - A * u / 2, a1 = m + A * u / 2, hw = Math.max(0, S - 2 * T) * u;
          s += `<g data-b="I"><rect x="${a}" y="${top}" width="${a0 - a}" height="26" fill="var(--paper)" stroke="var(--line)" stroke-width="2"/><rect x="${a1}" y="${top}" width="${b - a1}" height="26" fill="var(--paper)" stroke="var(--line)" stroke-width="2"/></g>`;
          s += `<g data-b="A"><rect x="${a0}" y="${top}" width="${A * u}" height="26" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/></g>`;
          if (hw > 0.5) s += `<g data-b="H"><rect x="${m - hw / 2}" y="${top + 3}" width="${hw}" height="20" fill="var(--paper)" opacity=".85"/></g>`;
          s += `<rect x="${a0}" y="${top + 26}" width="${A * u}" height="${cy + 52 - top - 26}" fill="var(--accent-soft)" opacity=".35"/>`;
          s += sarkG(a, b, cy, A * u, T * u, { gap: nr ? 15 : 17, sw: 4.6 });
          if (n === 1) {
            const lab = (x, t, cl = '') => `<text x="${x}" y="${top - 9}" class="f54-t f54-bl ${cl}" text-anchor="middle">${t}</text>`;
            s += lab(a, 'Z') + lab(b, 'Z') + lab((a + a0) / 2, '½ I', 'i') + lab((a1 + b) / 2, '½ I', 'i') + lab(m, nr ? 'A' : 'A bandı', 'a');
            if (hw > 30) s += `<text x="${m}" y="${top + 47}" class="f54-t f54-bl h" text-anchor="middle">${nr ? 'H' : 'H bandı'}</text>`;
          } else {
            s += `<text x="${m}" y="${top - 9}" class="f54-t f54-bl a" text-anchor="middle">A</text><text x="${b}" y="${top - 9}" class="f54-t f54-bl i" text-anchor="middle">${i < n - 1 ? 'I' : ''}</text>`;
            if (i === 0) s += `<text x="${a}" y="${top - 9}" class="f54-t f54-bl" text-anchor="middle">Z</text>`;
            if (i === 0) s += `<text x="${b}" y="${top - 9}" class="f54-t f54-bl" text-anchor="middle" dy="-14">Z</text>`;
          }
        }
        // Z–Z ölçü çizgisi
        const yb = cy + 66;
        s += `<path d="M${x0} ${yb}v8H${x0 + tot}v-8" fill="none" stroke="var(--muted)" stroke-width="2"/><text x="${W / 2}" y="${yb + 26}" class="f54-t f54-m" text-anchor="middle">${n === 1 ? 'Sarkomer (Z–Z)' : 'İki sarkomer (Z–Z–Z)'}</text>`;
        g.innerHTML = s;
        g.querySelectorAll('[data-b]').forEach((e) => { e.style.cursor = 'pointer'; });
        const H0 = Math.max(0, S - 2 * T);
        el.querySelector('[data-o="k"]').textContent = '%' + k + (k === 0 ? ' · dinlenme' : k >= 100 ? ' · en kısa' : ' · kısalıyor');
        const ch = (c, t, cl) => { const e = el.querySelector(`[data-c="${c}"]`); e.textContent = t; e.className = 'f54-chip ' + cl; };
        ch('s', 'Sarkomer: ' + (k === 0 ? 'dinlenme' : 'kısalıyor'), k ? 'warn' : '');
        ch('i', 'I bandı: ' + (k ? 'daralıyor' : 'geniş'), k ? 'warn' : '');
        ch('h', 'H bandı: ' + (H0 <= 0 ? 'kayboldu' : k ? 'daralıyor' : 'geniş'), k ? 'warn' : '');
        basSec(el, 'm', mode); rng.value = k; capSet(el, capK());
      };
      const stop = () => { playing = false; if (stopT) { stopT(); stopT = null; } pbtn.textContent = 'Oynat'; pbtn.setAttribute('aria-pressed', 'false'); };
      const play = () => {
        if (playing) { stop(); return; }
        if (RM) { k = k >= 100 ? 0 : 100; defn = null; draw(); return; }
        playing = true; pbtn.textContent = 'Duraklat'; pbtn.setAttribute('aria-pressed', 'true');
        let dir = k >= 100 ? -1 : 1;
        stopT = ticker(el, (dt) => {
          k += dir * dt * 40; defn = null;
          if (k >= 100) { k = 100; dir = -1; } else if (k <= 0 && dir < 0) { k = 0; draw(); stop(); return; }
          k = clamp(k, 0, 100); const kk = k; k = Math.round(k); draw(); k = kk;
        });
      };
      const onClick = (e) => {
        const b = e.target.closest('[data-b]'); if (b) { defn = b.dataset.b; capSet(el, capK()); return; }
        if (e.target.closest('[data-m]')) { mode = e.target.closest('[data-m]').dataset.m; defn = null; draw(); }
        else if (e.target.closest('[data-play]')) play();
      };
      const onIn = (e) => { if (e.target.matches('[data-r]')) { if (playing) stop(); k = +e.target.value; defn = null; draw(); } };
      el.addEventListener('click', onClick); el.addEventListener('input', onIn);
      draw();
      return () => { stop(); el.removeEventListener('click', onClick); el.removeEventListener('input', onIn); };
    });
  };

  /* ---------- 4 · Ca²⁺ ve filaman ---------- */
  VIZ.f54_filaman = (el) => {
    let ca = false, pick = null;
    const P = {
      miyozin: ['Miyozin', 'İki küresel baş ve uzun kuyruklu büyük protein; başlarda aktin ve ATP için ayrı bağlanma yerleri. [[K1 s. 240–241]]'],
      aktin: ['Aktin', 'Küresel protein; zincirleri çift sarmal yapar, düzenli aralıklı miyozin bağlama yerleri taşır; ince filamanda 300–400 molekül. [[K1 s. 241]]'],
      tm: ['Tropomiyozin', 'İki aktin zinciri arasındaki olukta uzanan lifli zincir; bağlama yerine erişimi engeller. [[K1 s. 241]]'],
      tnt: ['Troponin T', "Kompleksi tropomiyozine bağlar ('T'). [[K1 s. 241]]"],
      tni: ['Troponin I', "Rolü kitaba göre belirsiz; miyozin ATPaz etkinliğini inhibe ediyor olabilir ('I'). [[K1 s. 241]]"],
      tnc: ['Troponin C', "Ca²⁺ bağlama yerini taşır ('C'). [[K1 s. 241]]"],
      z: ['Z diski', 'İnce filamanlar bir ucundan Z diskine bağlıdır. [[K1 s. 240]]'],
      yer: ['Miyozin bağlama yeri', 'Aktin boncuklarında düzenli aralıklarla bulunur; tropomiyozin kapattığında miyozin başı bağlanamaz. [[K1 s. 241]]'],
    };
    const capK = () => {
      if (pick) return `<b>${P[pick][0]}.</b> ${P[pick][1]}`;
      return ca ? '<b>Ca²⁺ troponin C\'ye bağlandı.</b> Tropomiyozin aktin oluğunun derinine yuvarlanır, miyozin bağlama yerleri açılır ve aktin ile miyozin arasında çapraz köprü kurulabilir. [[K1 s. 241]]'
        : '<b>Ca²⁺ yok.</b> Tropomiyozin aktindeki miyozin bağlama yerlerini kapatır; çapraz köprü kurulamaz. Ca²⁺ ekleyin ya da bir proteine dokunun. [[K1 s. 241]]';
    };
    return comp(el, (nr) => {
      const W = nr ? 360 : 640, H = nr ? 440 : 340;
      const by = nr ? 346 : 262, d = nr ? 11.2 : 17.5, bx0 = nr ? 16 : 34, nb = nr ? 29 : 31, r = nr ? 5 : 7.6, zx = bx0 + (nb - 1) * d + r + 8;
      const tx0 = nr ? 118 : 232, tx1 = nr ? 244 : 560;
      const hx = bx0 + 18 * d; // bağlanan baş
      const tnx = [bx0 + 6 * d, bx0 + 22 * d];
      const ty0 = nr ? 188 : 170; // alt panel kalın filaman çubuğu
      const hs = (cx, cy, id, extra = '') => `<g data-p="${id}" ${extra}><ellipse cx="${cx - 6}" cy="${cy}" rx="11" ry="8.5" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.4"/><ellipse cx="${cx + 7}" cy="${cy + 12}" rx="11" ry="8.5" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.4"/></g>`;
      // üst panel: miyozin molekülü + kalın filaman + enine kesit
      const mY = nr ? 52 : 66, mX0 = nr ? 14 : 24, mX1 = nr ? 118 : 168;
      const top = `<text x="${mX0}" y="${nr ? 18 : 22}" class="f54-t f54-m">Kalın filaman (miyozin)</text>
        <g data-p="miyozin" class="f54-hit"><line x1="${mX0}" y1="${mY}" x2="${mX1}" y2="${mY}" stroke="var(--accent)" stroke-width="5" stroke-linecap="round"/>${hs(mX1 + 14, mY - 10, 'miyozin')}</g>
        <circle cx="${mX1 + 14}" cy="${mY - 24}" r="0.01"/>
        <circle cx="${mX1 + 18}" cy="${mY - 3}" r="5" fill="var(--ok-soft)" stroke="var(--ok)" stroke-width="2"/><path d="M${mX1 + 30} ${mY - 4}l5 -5l0 7z" fill="var(--ink)"/>
        <text x="${mX0}" y="${mY + (nr ? 34 : 38)}" class="f54-t f54-s" fill="var(--ok)">○ ATP bağlama yeri</text><text x="${mX0}" y="${mY + (nr ? 52 : 56)}" class="f54-t f54-s">▸ aktin bağlama yeri · kuyruk</text>`;
      let bar = `<g data-p="miyozin" class="f54-hit"><rect x="${tx0}" y="${mY - 8}" width="${tx1 - tx0}" height="16" rx="7" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.4"/>` +
        Array.from({ length: Math.floor((tx1 - tx0) / 24) }, (_, i) => `<line x1="${tx0 + 12 + i * 24}" y1="${mY - 8}" x2="${tx0 + 18 + i * 24}" y2="${mY - 19}" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round"/><line x1="${tx0 + 18 + i * 24}" y1="${mY + 8}" x2="${tx0 + 12 + i * 24}" y2="${mY + 19}" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round"/>`).join('') + '</g>';
      const cxs = nr ? 308 : 596, cys = nr ? 82 : 72;
      const sect = `<circle cx="${cxs}" cy="${cys}" r="${nr ? 30 : 40}" fill="none" stroke="var(--line)" stroke-dasharray="3 3"/><circle cx="${cxs}" cy="${cys}" r="9" fill="var(--accent)"/>` + [0, 1, 2, 3, 4, 5].map((i) => { const a = i * Math.PI / 3; return `<circle cx="${(cxs + (nr ? 22 : 29) * Math.cos(a)).toFixed(1)}" cy="${(cys + (nr ? 22 : 29) * Math.sin(a)).toFixed(1)}" r="5" fill="var(--c-basic)"/>`; }).join('') +
        `<text x="${cxs}" y="${cys + (nr ? 48 : 58)}" class="f54-t f54-s f54-m" text-anchor="middle">${nr ? '6 ince filaman' : '6 ince filaman, ≈ altıgen düzen'}</text>`;
      void bar;
      el.innerHTML = `<div class="btn-row f54-ctl">${segH('Ca²⁺ durumu', 'ca', [['0', 'Ca²⁺ yok'], ['1', 'Ca²⁺ var']], ca ? 1 : 0)}</div>
        <svg class="f54-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Kalın filaman ve miyozin molekülü üstte; ince filaman altta. Ca²⁺ gelince tropomiyozin kayar ve miyozin bağlama yerleri açılır">
          <g>${top}${bar}${sect}</g>
          <line x1="8" x2="${W - 8}" y1="${nr ? 150 : 128}" y2="${nr ? 150 : 128}" stroke="var(--line)"/>
          <text x="${nr ? 14 : 24}" y="${nr ? 172 : 152}" class="f54-t f54-m">İnce filaman (aktin + tropomiyozin + troponin)</text>
          <g class="f54-thick"><rect x="${hx - 70}" y="${ty0 + (nr ? 6 : 4)}" width="150" height="14" rx="7" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.2"/>
            <g class="f54-hd f54-tr" data-p="miyozin"><line x1="${hx - 4}" y1="${ty0 + 20}" x2="${hx - 4}" y2="${by - 54}" stroke="var(--accent)" stroke-width="3.4"/><ellipse cx="${hx - 4}" cy="${by - 46}" rx="12" ry="14" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.4"/></g></g>
          <g data-p="z" class="f54-hit"><path d="M${zx} ${by - 36}l4 7l-8 7l8 7l-8 7l8 7l-8 7l8 7l-4 6" fill="none" stroke="var(--ink)" stroke-width="2.6"/></g>
          <g data-p="aktin" class="f54-hit">${Array.from({ length: nb }, (_, i) => bead(bx0 + i * d, by, r)).join('')}</g>
          <g data-p="yer" class="f54-hit">${Array.from({ length: nb }, (_, i) => `<circle cx="${bx0 + i * d}" cy="${by - r + 0.5}" r="2.4" class="f54-site" fill="var(--ink)"/>`).join('')}</g>
          <g class="f54-tm f54-tr" data-p="tm"><path d="M${bx0 - 6} ${by - r - 3}${Array.from({ length: nb }, (_, i) => `q${d / 2} -3 ${d} 0`).join('')}" fill="none" stroke="var(--c-clin)" stroke-width="3.6" stroke-linecap="round"/>
            ${tnx.map((x) => `<g><rect data-p="tnt" x="${x - 21}" y="${by - r - 26}" width="18" height="18" rx="4" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="2"/><text x="${x - 12}" y="${by - r - 12.5}" class="f54-t f54-s" text-anchor="middle" fill="var(--c-clin)">T</text>
              <rect data-p="tni" x="${x - 1}" y="${by - r - 26}" width="18" height="18" rx="4" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="2"/><text x="${x + 8}" y="${by - r - 12.5}" class="f54-t f54-s" text-anchor="middle" fill="var(--c-clin)">I</text>
              <rect data-p="tnc" x="${x + 19}" y="${by - r - 26}" width="18" height="18" rx="4" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="2"/><text x="${x + 28}" y="${by - r - 12.5}" class="f54-t f54-s" text-anchor="middle" fill="var(--c-clin)">C</text>
              <circle class="f54-ca f54-tr" cx="${x + 28}" cy="${by - r - 42}" r="6" fill="var(--warn)"/></g>`).join('')}</g>
          <text x="${nr ? 14 : 24}" y="${by + (nr ? 30 : 30)}" class="f54-t f54-s f54-m">300–400 aktin molekülü / ince filaman</text>
          <text x="${W - 10}" y="${by + 30}" class="f54-t f54-s" text-anchor="end" fill="var(--ok)">${''}</text>
        </svg>
        <div class="f54-chips">${[['miyozin', 'Miyozin'], ['aktin', 'Aktin'], ['tm', 'Tropomiyozin'], ['tnt', 'Troponin T'], ['tni', 'Troponin I'], ['tnc', 'Troponin C'], ['z', 'Z diski'], ['yer', 'Bağlama yeri']].map(([i, l]) => `<button type="button" class="f54-pill" data-p="${i}" aria-pressed="false">${l}</button>`).join('')}</div>`;
      const svg = el.querySelector('svg'), tm = svg.querySelector('.f54-tm'), hd = svg.querySelector('.f54-hd');
      const apply = () => {
        tm.style.transform = `translateY(${ca ? (nr ? 8 : 13) : 0}px)`;
        svg.querySelectorAll('.f54-ca').forEach((c) => { c.style.opacity = ca ? 1 : 0; c.style.transform = `translateY(${ca ? 0 : -14}px)`; });
        hd.style.transform = ca ? 'translateY(14px)' : 'translateY(0)';
        svg.querySelectorAll('.f54-site').forEach((s, i) => { s.setAttribute('fill', ca ? 'var(--ok)' : 'var(--ink)'); s.setAttribute('r', ca ? 3.2 : 2.4); void i; });
        basSec(el, 'ca', ca ? 1 : 0);
        el.querySelectorAll('.f54-pill').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.p === pick)));
        capSet(el, capK());
      };
      const onClick = (e) => {
        const c = e.target.closest('[data-ca]'); if (c) { ca = c.dataset.ca === '1'; pick = null; apply(); return; }
        const p = e.target.closest('[data-p]'); if (p && P[p.dataset.p]) { pick = p.dataset.p; apply(); }
      };
      el.addEventListener('click', onClick); apply();
      return () => el.removeEventListener('click', onClick);
    });
  };

  /* ---------- 5 · Uyarılma–kasılma eşleşmesi ---------- */
  VIZ.f54_ukm = (el) => {
    const AD = [
      '<b>1 · Dinlenme.</b> Sarkolemmanın dinlenme membran potansiyeli yaklaşık −90 mV\'tur; Ca²⁺ SR\'de yüksek, sarkoplazmada düşük derişimdedir. Oynatın ya da adım adım ilerleyin. [[K1 s. 241–242]]',
      '<b>2 · Aksiyon potansiyeli.</b> Motor son plaktaki sinaptik etkinlik sarkolemmayı depolarize eder; aksiyon potansiyeli yüzey zarı boyunca yayılır. [[K1 s. 241–242]]',
      '<b>3 · T-tübül.</b> T-tübül aksiyon potansiyelini hücrenin derinine, SR\'deki Ca²⁺ deposunun yanına taşır. [[K1 s. 242]]',
      '<b>4 · DHPR.</b> Değişmiş bir L-tipi voltaj kapılı Ca²⁺ kanalı olan DHPR depolarizasyonu algılar ve biçim değiştirir; içinden çok az Ca²⁺ geçer. [[K1 s. 242]]',
      '<b>5 · RyR açılır.</b> DHPR, RyR\'nin sitoplazmik kısmıyla fiziksel temastadır; biçim değişikliği RyR\'yi açar ve Ca²⁺ yüksek derişimli SR\'den düşük derişimli sarkoplazmaya akar. [[K1 s. 242]]',
      '<b>6 · Ca²⁺ 2000 kat.</b> Hücre içi Ca²⁺ derişimi yaklaşık 2000 kat artar. [[K1 s. 242]]',
      '<b>7 · Troponin C.</b> Ca²⁺ troponin C\'ye bağlanır; bütün troponin–tropomiyozin kompleksi biçim değiştirir, bağlama yeri açılır ve aktin–miyozin etkileşimi başlar. [[K1 s. 242]]',
      '<b>8 · Gevşeme.</b> SERCA Ca²⁺\'u SR\'ye geri alır; Ca²⁺ troponin C\'den ayrılır, troponin T ve tropomiyozin dinlenme konumuna döner, bağlama yerleri örtülür ve sarkomer eski uzunluğuna döner. [[K1 s. 243]]',
    ];
    const CA = [0.05, 0.05, 0.05, 0.05, 0.4, 1, 1, 0.07];
    let st = 1, playing = false, stopT = null, kalp = false;
    return comp(el, (nr) => {
      const dots = [];
      [[128, 152, 176, 200], [262, 286, 310, 334]].forEach((xs, side) => xs.forEach((x) => [126, 186].forEach((y) => dots.push([x, y, side]))));
      el.innerHTML = `<div class="btn-row f54-ctl"><button type="button" class="btn" data-a="play">Oynat</button><button type="button" class="btn ghost" data-a="geri">‹ Geri</button><button type="button" class="btn ghost" data-a="ileri">İleri ›</button><button type="button" class="btn ghost" data-a="bas">Baştan</button><span class="f54-adim" data-o="adim"></span></div>
        <div class="f54-ukm"><svg class="f54-svg" viewBox="0 0 460 330" role="img" aria-label="Triad: sarkolemma, T-tübül, iki yanda sarkoplazmik retikulum; DHPR ve RyR, Ca²⁺ salınımı ve ince filaman">
          <path d="M12 ${nr ? 30 : 30}h88a6 6 0 0 1 6 6v18h-100z" fill="var(--c-basic-soft)" stroke="var(--c-basic)" stroke-width="2.4" transform="translate(0 -8)"/>
          <rect x="8" y="58" width="444" height="9" rx="3" fill="var(--chip)" stroke="var(--line)" stroke-width="2.4"/>
          <line class="f54-hl f54-tr" data-h="mem" x1="12" y1="62.5" x2="214" y2="62.5" stroke="var(--warn)" stroke-width="6" stroke-linecap="round"/>
          <rect x="219" y="58" width="22" height="160" rx="4" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.6"/>
          <line class="f54-hl f54-tr" data-h="tub" x1="230" y1="64" x2="230" y2="214" stroke="var(--warn)" stroke-width="7" stroke-linecap="round"/>
          <rect x="112" y="112" width="103" height="88" rx="14" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="2.4"/><rect x="245" y="112" width="103" height="88" rx="14" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="2.4"/>
          ${[[215, 1], [245, 0]].map(([x, l]) => `<g data-ry><rect class="f54-ryr" data-v="-1" x="${x - (l ? 11 : 0)}" y="140" width="11" height="12" fill="var(--paper)" stroke="var(--warn)" stroke-width="2.4"/><rect class="f54-ryr" data-v="1" x="${x - (l ? 11 : 0)}" y="160" width="11" height="12" fill="var(--paper)" stroke="var(--warn)" stroke-width="2.4"/></g><rect class="f54-dh f54-tr" x="${l ? 241 : 237}" y="146" width="6" height="20" rx="2" fill="var(--c-clin)"/>`).join('')}
          <circle class="f54-az f54-tr" cx="228" cy="86" r="4.5" fill="var(--warn)" style="opacity:0"/>
          ${[[160, 1], [300, 0]].map(([x]) => `<circle cx="${x}" cy="201" r="9" fill="var(--ok-soft)" stroke="var(--ok)" stroke-width="2.4"/><path class="f54-sp f54-tr" d="M${x} 206V196M${x - 4} 200l4 -5l4 5" fill="none" stroke="var(--ok)" stroke-width="2.2"/>`).join('')}
          ${dots.map((d, i) => `<circle class="f54-cad f54-tr" data-i="${i}" cx="${d[0]}" cy="${d[1]}" r="3.6" fill="var(--warn)"/>`).join('')}
          <rect x="100" y="238" width="260" height="14" rx="7" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.2"/>
          <g class="f54-hd f54-tr"><line x1="310" y1="252" x2="310" y2="270" stroke="var(--accent)" stroke-width="3.2"/><ellipse cx="310" cy="278" rx="10" ry="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.4"/></g>
          ${Array.from({ length: 22 }, (_, i) => bead(100 + i * 12.5, 300, 5)).join('')}
          <g class="f54-tm f54-tr"><path d="M94 294${Array.from({ length: 22 }, () => 'q6.25 -3 12.5 0').join('')}" fill="none" stroke="var(--c-clin)" stroke-width="3.2"/><rect x="214" y="276" width="18" height="14" rx="3" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="2"/><circle class="f54-tca f54-tr" cx="223" cy="270" r="5" fill="var(--warn)"/></g>
          ${nr ? '' : `<text x="116" y="28" class="f54-t f54-s">Motor son plak</text><text x="262" y="50" class="f54-t f54-s f54-m">Sarkolemma</text><text x="252" y="96" class="f54-t f54-s">T-tübül</text><text x="163" y="106" class="f54-t f54-s" fill="var(--warn)" text-anchor="middle">SR</text><text x="297" y="106" class="f54-t f54-s" fill="var(--warn)" text-anchor="middle">SR</text>
            <path d="M257 150L356 132M246 156L356 154M308 204L356 196" fill="none" stroke="var(--muted)" stroke-width="1"/><text x="358" y="136" class="f54-t f54-s">RyR</text><text x="358" y="158" class="f54-t f54-s" fill="var(--c-clin)">DHPR</text><text x="358" y="200" class="f54-t f54-s" fill="var(--ok)">SERCA</text><text class="f54-az-l f54-t f54-s f54-m" x="248" y="82" style="opacity:0">az ve yavaş</text><text x="12" y="326" class="f54-t f54-s f54-m">sarkoplazma: ince filaman ve miyozin başı</text>`}
        </svg>
        <div class="f54-side"><div class="f54-em" data-o="em"></div><div class="f54-camt"><span>Sarkoplazmik Ca²⁺</span><div class="f54-cabar"><i data-o="cab"></i></div><b data-o="cat"></b></div></div></div>
        ${nr ? '<ul class="f54-lg"><li><i style="background:var(--warn)"></i>SR: Ca²⁺ deposu</li><li><i style="background:var(--c-clin)"></i>DHPR: T-tübülde</li><li><i style="background:var(--warn);opacity:.55"></i>RyR: SR zarında</li><li><i style="background:var(--ok)"></i>SERCA: Ca²⁺ pompası</li></ul>' : ''}
        <button type="button" class="tag f54-kalp" aria-expanded="false">Kalp kasında?</button><p class="f54-kalp-m" hidden>Kalpte Ca²⁺ plato fazında hücreye girer ve SR'den Ca²⁺ ile uyarılan Ca²⁺ salınmasını tetikler (Bölüm 57). ${REF('[[K1 s. 242]]')}</p>`;
      const q = (s) => el.querySelector(s), svg = q('svg');
      const adimE = q('[data-o="adim"]'), emE = q('[data-o="em"]'), cab = q('[data-o="cab"]'), cat = q('[data-o="cat"]');
      const apply = () => {
        const s = st;
        const o = (sel, v) => { const e = svg.querySelector(sel); if (e) e.style.opacity = v; };
        o('[data-h="mem"]', s === 2 ? 1 : s === 3 ? 0.3 : 0); o('[data-h="tub"]', s === 3 ? 1 : s === 4 ? 0.4 : 0);
        o('.f54-az', s === 4 ? 1 : 0); o('.f54-az-l', s === 4 ? 1 : 0);
        const az = svg.querySelector('.f54-az'); az.style.transform = s === 4 ? 'translateY(40px)' : 'translateY(0)';
        svg.querySelectorAll('.f54-dh').forEach((e) => { e.style.transform = s >= 4 && s <= 7 ? 'rotate(-30deg)' : 'none'; e.style.fill = s >= 4 && s <= 7 ? 'var(--warn)' : 'var(--c-clin)'; });
        const open = s >= 5 && s <= 7;
        svg.querySelectorAll('.f54-ryr').forEach((e) => { e.style.transform = `translateY(${open ? +e.dataset.v * 5 : 0}px)`; e.style.transition = RM ? 'none' : 'transform .5s'; });
        const rel = s >= 5 && s <= 7 ? 1 : 0;
        svg.querySelectorAll('.f54-cad').forEach((c) => {
          const i = +c.dataset.i, x = +c.getAttribute('cx'), y = +c.getAttribute('cy');
          const tx2 = rel ? (x < 230 ? 12 : -12) : 0, ty2 = rel ? 216 + (i % 4) * 6 - y + (i % 2) * 2 : 0;
          c.style.transform = `translate(${tx2}px,${ty2}px)`; c.style.transitionDelay = RM ? '0s' : `${(i % 8) * 0.04}s`;
        });
        svg.querySelectorAll('.f54-sp').forEach((p) => { p.style.opacity = s === 8 ? 1 : 0.25; });
        svg.querySelector('.f54-tm').style.transform = `translateY(${s === 7 ? 9 : 0}px)`;
        o('.f54-tca', s === 7 ? 1 : 0);
        svg.querySelector('.f54-hd').style.transform = s === 7 ? 'translateY(14px) rotate(-10deg)' : 'none';
        const em = s >= 2 && s <= 4;
        emE.innerHTML = em ? `Em: <b style="color:var(--warn)">depolarizasyon (+)</b>` : 'Em: <b>−90 mV</b> (dinlenme)';
        cab.style.height = (CA[s - 1] * 100) + '%'; cat.textContent = s === 6 || s === 7 ? '≈ 2000 ×' : s === 5 ? '↑' : s === 8 ? '↓' : '1 ×';
        adimE.textContent = `Adım ${s} / 8`;
        q('[data-a="play"]').textContent = playing ? 'Duraklat' : 'Oynat';
        q('[data-a="geri"]').disabled = s === 1; q('[data-a="ileri"]').disabled = s === 8;
        capSet(el, AD[s - 1]);
      };
      const stop = () => { playing = false; if (stopT) { stopT(); stopT = null; } };
      const play = () => {
        if (playing) { stop(); apply(); return; }
        if (RM) { st = 8; apply(); return; }
        if (st === 8) st = 1;
        playing = true; let acc = 0;
        stopT = ticker(el, (dt) => { acc += dt; if (acc >= 2.2) { acc = 0; if (st < 8) st++; if (st >= 8) { stop(); } apply(); } });
        apply();
      };
      const onClick = (e) => {
        const b = e.target.closest('[data-a]');
        if (b) { const a = b.dataset.a; if (a === 'play') { play(); return; } stop(); if (a === 'geri') st = Math.max(1, st - 1); else if (a === 'ileri') st = Math.min(8, st + 1); else st = 1; apply(); return; }
        if (e.target.closest('.f54-kalp')) { kalp = !kalp; q('.f54-kalp-m').hidden = !kalp; q('.f54-kalp').setAttribute('aria-expanded', String(kalp)); }
      };
      el.addEventListener('click', onClick);
      q('.f54-kalp-m').hidden = !kalp; apply();
      return () => { stop(); el.removeEventListener('click', onClick); };
    });
  };

  /* ---------- 6 · Malign hipertermi ---------- */
  VIZ.f54_mh = (el) => {
    let stage = 0, kind = 'vol'; const V = { isi: 0, o2: 0, asi: 0 };
    return comp(el, (nr) => {
      const KUTU = [['ca', 'Denetimsiz Ca²⁺ salınması'], ['tet', 'Tetanik kasılma (rijidite)'], ['atp', 'ATP tüketimi + ısı → hipertermi'], ['rab', 'Uzamış tetani → rabdomiyoliz'], ['ser', 'SERCA etkinliği artar → ATP tüketimi daha da artar'], ['son', 'Hipermetabolizma: O₂ tüketimi ↑, CO₂ üretimi ↑ → metabolik asidoz']];
      const kb = Object.fromEntries(KUTU);
      el.innerHTML = `<div class="btn-row f54-ctl">${segH('Aşama', 'st', [[0, 'Tetikleyici yok'], [1, 'Tetikleyici ver'], [2, 'Dantrolen ver']], stage)}${segH('Tetikleyici türü', 'kd', [['vol', 'Volatil anestezik'], ['sux', 'Süksametonyum']], kind)}</div>
        <div class="f54-mh">
          <div class="f54-mh-sr"><svg class="f54-svg" viewBox="0 0 170 150" role="img" aria-label="Sarkoplazmik retikulum ve ryanodin reseptörü; tetikleyicide Ca²⁺ denetimsiz akar, dantrolen kanalı kapatır">
            <ellipse cx="85" cy="56" rx="72" ry="44" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="2.6"/><text x="85" y="30" class="f54-t f54-s" fill="var(--warn)" text-anchor="middle">SR</text>
            <g class="f54-mh-ca"></g><rect x="62" y="96" width="46" height="9" rx="2" class="f54-mh-ryr" fill="var(--paper)" stroke="var(--crit)" stroke-width="2.6"/>
            <rect class="f54-mh-cap f54-tr" x="56" y="90" width="58" height="22" rx="6" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="2.6" style="opacity:0"/>
            <text x="85" y="128" class="f54-t f54-s" fill="var(--crit)" text-anchor="middle">RyR mutasyonu</text><text x="85" y="145" class="f54-t f54-s f54-cap-l" fill="var(--c-clin)" text-anchor="middle"></text></svg></div>
          <div class="f54-flow">${KUTU.map(([k, t]) => `<div class="f54-box" data-k="${k}">${t}</div>`).join('')}</div>
          <div class="f54-mort"><b>Mortalite</b><span class="f54-m1">Tedavisiz ≈ %80</span><span class="f54-m2">Dantrolen + farkındalık: %2–3</span></div>
        </div>
        <div class="f54-meters">${[['isi', 'Isı'], ['o2', 'O₂ tüketimi / CO₂ üretimi'], ['asi', 'Asidoz']].map(([k, l]) => `<div class="f54-mt"><span>${l}</span><div class="f54-bar"><i data-m="${k}"></i></div></div>`).join('')}</div>`;
      const sr = el.querySelector('.f54-mh-ca');
      const caS = [[50, 50], [78, 36], [106, 48], [64, 66], [96, 70], [122, 62], [84, 54]];
      const paint = () => {
        const on = stage >= 1, dan = stage === 2;
        sr.innerHTML = caS.map((c, i) => `<circle cx="${c[0]}" cy="${on && !dan ? c[1] + 36 + (i % 3) * 5 : c[1]}" r="4" fill="var(--warn)"/>`).join('');
        el.querySelector('.f54-mh-cap').style.opacity = dan ? 1 : 0;
        el.querySelector('.f54-cap-l').textContent = dan ? 'dantrolen: RyR üstünde' : '';
        el.querySelectorAll('.f54-box').forEach((b) => { b.classList.toggle('on', on && !dan); b.classList.toggle('dim', dan); });
        el.querySelector('.f54-m2').classList.toggle('hl', dan);
        el.querySelector('[data-st="2"]').disabled = stage === 0;
        basSec(el, 'st', stage); basSec(el, 'kd', kind);
        const msg = stage === 0 ? '<b>Duyarlı hasta, tetikleyici yok.</b> RyR mutasyonu sessizdir; Ca²⁺ salınması normal denetim altındadır. Tetikleyici verin. [[K1 s. 242]]'
          : stage === 1 ? '<b>Tetiklendi.</b> Evrensel olarak kabul gören tetikleyiciler yalnız halojenli volatil anestezikler ve süksametonyumdir. Anormal RyR SR\'den denetimsiz Ca²⁺ salar: tetanik kasılma ATP tüketir ve ısı üretir; SR\'nin Ca²⁺-ATPazı da ATP tüketimini artırır. O₂ tüketimi ve CO₂ üretimi artar, metabolik asidoz gelişir; uzayan tetani rabdomiyoliz yapabilir. [[K1 s. 242]]'
          : '<b>Dantrolen.</b> Destek tedavisi dışında tek özgül tedavidir; RyR\'ye bağlanıp Ca²⁺ geçirgenliğini engelleyerek salınmayı durdurduğu düşünülür. Tedavisiz mortalite yaklaşık %80 iken dantrolen ve artan farkındalıkla %2–3\'e inmiştir. [[K1 s. 242]]';
        capSet(el, msg);
      };
      const bars = () => el.querySelectorAll('[data-m]').forEach((b) => { b.style.width = (V[b.dataset.m] * 100).toFixed(1) + '%'; });
      let stopT = null;
      const tick = () => {
        if (stopT) stopT();
        const tgt = stage === 1 ? 1 : 0;
        if (RM) { V.isi = V.o2 = V.asi = tgt; bars(); return; }
        stopT = ticker(el, (dt) => {
          let moving = false;
          for (const k in V) { const sp = tgt > V[k] ? dt / 2 : dt / 3; const n = tgt > V[k] ? Math.min(tgt, V[k] + sp) : Math.max(tgt, V[k] - sp); if (n !== V[k]) { V[k] = n; moving = true; } }
          if (moving) bars();
        });
      };
      const onClick = (e) => {
        const s = e.target.closest('[data-st]'); const kd = e.target.closest('[data-kd]');
        if (s && !s.disabled) { stage = +s.dataset.st; paint(); tick(); } else if (kd) { kind = kd.dataset.kd; paint(); }
      };
      el.addEventListener('click', onClick); paint(); bars(); tick(); void kb;
      return () => { if (stopT) stopT(); el.removeEventListener('click', onClick); };
    });
  };

  /* ---------- 7 · Çapraz köprü döngüsü ---------- */
  VIZ.f54_kopru = (el) => {
    let step = 1, atp = true, n = 0, tot = 0, playing = false, stopT = null;
    const ADIM = [
      '<b>1 · ATP bağlı.</b> Miyozin başı ATP bağlamıştır; bu hâlde aktine afinitesi düşüktür. ATP hidroliz edilir, açığa çıkan bağ enerjisi başa aktarılır. Oynatın. [[K1 s. 242–243]]',
      '<b>2 · Enerji yüklü baş bağlanır.</b> Başta ADP ve Pi vardır; baş komşu aktin molekülüne bağlanır ve çapraz köprü kurulur. [[K1 s. 242]]',
      '<b>3 · Güç vuruşu.</b> Baş aktin üzerinde bükülür; kuyruğa etkisiyle aktin sarkomerin ortasına doğru kayar. Bu sırada ADP ve Pi ayrılır. [[K1 s. 242–243]]',
      '<b>4 · Kopma.</b> Yeni ATP başa bağlanır; miyozin–ATP kompleksinin aktine afinitesi düşüktür ve baş ayrılır. ATP yeniden hidroliz edilir, döngü Ca²⁺ düşene kadar tekrarlar. [[K1 s. 243]]',
    ];
    const RIGOR = '<b>ATP yok: rigor mortis.</b> Ölümden sonra ATP hızla tükenir; SERCA çalışamaz, Ca²⁺ troponin C\'ye bağlı kalır ve köprüler kopamaz: kas tonusu yükselir. [[K1 s. 244]]';
    const POSE = [[22, 0.86], [22, 1], [-10, 1], [-18, 0.84]];
    const ETK = ['ATP', 'ADP + Pi', 'ADP + Pi ayrılır', 'yeni ATP'];
    return comp(el, (nr) => {
      const vb = nr ? '200 0 440 300' : '0 0 640 300';
      const HX = 300, D = 38, X0 = 60, PY = 142;
      el.innerHTML = `<div class="btn-row f54-ctl"><button type="button" class="btn" data-a="play">Oynat</button><button type="button" class="btn ghost" data-a="ileri">İleri ›</button>${segH('ATP durumu', 'atp', [['1', 'ATP var'], ['0', 'ATP yok (ölüm sonrası)']], atp ? 1 : 0)}<span class="f54-adim" data-o="sy"></span></div>
        <svg class="f54-svg f54-big" viewBox="${vb}" role="img" aria-label="İnce filaman üstte, kalın filaman altta; tek miyozin başı bağlanır, bükülür, aktini sarkomer ortasına çeker ve ATP ile kopar">
          <g class="f54-ak f54-tr">${Array.from({ length: 17 }, (_, i) => bead(X0 + (i - 3) * D, 74, 13)).join('')}<path d="M${X0 - 3 * D - 14} 74h${17 * D}" stroke="var(--c-basic)" stroke-width="2" opacity=".5"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => `<circle cx="${X0 + i * D}" cy="88" r="2.6" fill="var(--ok)"/>`).join('')}
            <path d="M${X0 + 13 * D + 24} 36l5 10l-10 10l10 10l-10 10l10 10l-10 10l10 10l-5 6" fill="none" stroke="var(--ink)" stroke-width="3"/><text x="${X0 + 13 * D + 36}" y="42" class="f54-t f54-s">Z diski</text></g>
          <text x="${nr ? 214 : 20}" y="22" class="f54-t f54-s f54-m">Aktin (ince filaman) · bağlama yerleri yeşil</text>
          <rect x="${nr ? 200 : 40}" y="150" width="${nr ? 300 : 460}" height="16" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.4"/><text x="${nr ? 214 : 52}" y="192" class="f54-t f54-s f54-m">Miyozin (kalın filaman)</text>
          <g class="f54-ph f54-tr"><line x1="0" y1="0" x2="0" y2="-46" stroke="var(--accent)" stroke-width="3.6"/><ellipse cx="0" cy="-58" rx="12" ry="13" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.6"/></g>
          <g class="f54-rozet"><rect x="${HX + 34}" y="104" width="96" height="24" rx="12" fill="var(--paper)" stroke="var(--line)" stroke-width="2"/><text x="${HX + 82}" y="121" class="f54-t f54-s f54-rz" text-anchor="middle"></text></g>
          <g class="f54-kil" style="opacity:0"><rect x="${HX - 74}" y="105" width="38" height="28" rx="6" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="2.4"/><path d="M${HX - 65} 105v-8a10 10 0 0 1 20 0v8" fill="none" stroke="var(--crit)" stroke-width="2.6"/><text x="${HX - 91}" y="124" class="f54-t f54-s" fill="var(--crit)" text-anchor="end">Rigor</text></g>
          <text x="${nr ? 214 : 450}" y="${nr ? 232 : 232}" class="f54-t f54-s f54-m">← sarkomer ortasına doğru</text>
          <text x="${nr ? 214 : 450}" y="${nr ? 256 : 256}" class="f54-t f54-s" data-o="n">Güç vuruşu: 0</text></svg>
        <ol class="f54-cyc">${['ATP bağlı → hidroliz: baş enerjili', 'Baş aktine bağlanır', 'Güç vuruşu: ADP + Pi ayrılır', 'Yeni ATP → kopma'].map((t, i) => `<li data-c="${i + 1}"><b>${i + 1}</b>${t}</li>`).join('')}</ol>
        <div class="f54-atp"><div data-g="1"><b>1 Enerjilendirme</b> ATP hidroliz edilir, başa enerji verir</div><div data-g="2"><b>2 Köprüyü koparma</b> ATP bağlanınca baş ayrılır</div><div data-g="3"><b>3 Gevşeme</b> SERCA Ca²⁺ pompalar</div></div>`;
      const q = (s) => el.querySelector(s);
      const ak = q('.f54-ak'), ph = q('.f54-ph');
      const apply = () => {
        const s = atp ? step : 3, [th, sy] = POSE[s - 1];
        const sh = -(n % 5) * D;
        ak.style.transform = `translateX(${(s >= 3 ? sh : sh)}px)`;
        ph.style.transform = `translate(${HX}px,${PY}px) rotate(${th}deg) scaleY(${sy})`;
        q('.f54-rz').textContent = atp ? ETK[s - 1] : 'bağlı · kilitli';
        q('.f54-kil').style.opacity = atp ? 0 : 1;
        q('[data-o="n"]').textContent = 'Güç vuruşu: ' + tot;
        q('[data-o="sy"]').textContent = atp ? `Adım ${s} / 4` : 'Rigor';
        el.querySelectorAll('[data-c]').forEach((c) => c.classList.toggle('on', atp && +c.dataset.c === s));
        el.querySelectorAll('[data-g]').forEach((c) => { const g = +c.dataset.g; c.classList.toggle('on', atp && ((g === 1 && s <= 2 && s === 1) || (g === 2 && s === 4))); c.classList.toggle('x', !atp); });
        q('[data-a="play"]').textContent = playing ? 'Duraklat' : 'Oynat'; q('[data-a="play"]').disabled = !atp; q('[data-a="ileri"]').disabled = !atp;
        basSec(el, 'atp', atp ? 1 : 0);
        capSet(el, atp ? ADIM[s - 1] : RIGOR);
      };
      const adv = () => { step = step % 4 + 1; if (step === 3) { n++; tot++; } apply(); };
      const stop = () => { playing = false; if (stopT) { stopT(); stopT = null; } };
      const play = () => {
        if (playing) { stop(); apply(); return; }
        if (RM) { step = 4; n = Math.max(n, 1); tot = Math.max(tot, 1); apply(); return; }
        playing = true; let acc = 0; stopT = ticker(el, (dt) => { acc += dt; if (acc >= 1.2) { acc = 0; adv(); } }); apply();
      };
      const onClick = (e) => {
        const b = e.target.closest('[data-a]'), a = e.target.closest('[data-atp]');
        if (a) { atp = a.dataset.atp === '1'; stop(); if (atp) step = 1; apply(); return; }
        if (b && !b.disabled) { if (b.dataset.a === 'play') play(); else { stop(); if (RM) { step = step % 4 + 1; if (step === 3) { n++; tot++; } apply(); } else adv(); } }
      };
      el.addEventListener('click', onClick); apply();
      return () => { stop(); el.removeEventListener('click', onClick); };
    });
  };

  /* ---------- 8 · Motor ünite ---------- */
  VIZ.f54_motor = (el) => {
    let kas = 'quad', fireT = null, ph = 0, stopT = null, tmo = null;
    const rnd = (() => { let s = 11; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();
    const CAPS = {
      quad: '<b>Kuadriseps femoris.</b> Büyük, güçlü, kaba hareketler yapan kas: bir motor ünitede 1000\'den fazla miyosit vardır. Ekstraoküler kasa geçin ya da nöronu ateşleyin. [[K1 s. 244]]',
      eye: '<b>Ekstraoküler kas.</b> İnce denetim için oransal olarak daha çok ve daha küçük ünite vardır: ünite başına 10 miyosite kadar iner. [[K1 s. 244]]',
      fire: '<b>Tek aksiyon potansiyeli.</b> α-motor nörondaki tek aksiyon potansiyeli ünitedeki bütün miyositleri kasar; bir ünite yalnız tek tip lif (ör. tip I) içerir. [[K1 s. 244]]',
    };
    return comp(el, (nr) => {
      const W = nr ? 360 : 640, H = nr ? 400 : 300;
      const cols = nr ? 2 : 3, rows = nr ? 22 : 24, fx0 = nr ? 20 : 236, fw = nr ? 140 : 112, gx = nr ? 170 : 128, fy0 = nr ? 120 : 20, dy = nr ? 12 : 11.4;
      const all = []; for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) all.push({ x: fx0 + c * gx + (r % 2) * 8, y: fy0 + r * dy });
      const idx = all.map((_, i) => i).sort(() => rnd() - 0.5);
      const own = new Set(idx.slice(0, kas === 'quad' ? (nr ? 24 : 40) : 5));
      const B = nr ? [180, 70] : [190, 150], S0 = nr ? [40, 40] : [44, 150];
      const render = () => {
        const con = ph === 2;
        const trunk = `M${S0[0]} ${S0[1]}L${B[0]} ${B[1]}`;
        let s = `<circle cx="${S0[0]}" cy="${S0[1]}" r="17" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="3"/><text x="${S0[0]}" y="${S0[1] + 34}" class="f54-t f54-s" text-anchor="middle">α-motor nöron</text>`;
        s += `<path d="${trunk}" stroke="${ph === 1 ? 'var(--warn)' : 'var(--accent)'}" stroke-width="3.4" fill="none"/>`;
        all.forEach((f, i) => {
          const o = own.has(i);
          if (o) s += `<line x1="${B[0]}" y1="${B[1]}" x2="${f.x}" y2="${f.y + 2.5}" stroke="${ph === 1 ? 'var(--warn)' : 'var(--c-basic)'}" stroke-width=".8" opacity=".55"/>`;
        });
        all.forEach((f, i) => {
          const o = own.has(i), w = o && con ? fw * 0.92 : fw, x = o && con ? f.x + fw * 0.04 : f.x;
          s += `<rect x="${x}" y="${f.y}" width="${w}" height="5.4" rx="2.7" fill="${o ? (con ? 'var(--accent)' : 'var(--c-basic-soft)') : 'var(--chip)'}" stroke="${o ? (con ? 'var(--accent-ink)' : 'var(--c-basic)') : 'var(--line)'}" stroke-width="1.2"/>`;
        });
        if (ph === 1) { const f = fireT; const p = clamp(f / 0.6, 0, 1); const px = lerp(S0[0], B[0], p), py = lerp(S0[1], B[1], p); s += `<circle cx="${px}" cy="${py}" r="7" fill="var(--warn)"/>`; }
        s += `<g transform="translate(${nr ? 190 : 20} ${nr ? 22 : 62})"><rect width="${nr ? 150 : 176}" height="${nr ? 62 : 56}" rx="10" fill="var(--paper)" stroke="var(--line)" stroke-width="2"/>${tx(nr ? 75 : 88, 22, kas === 'quad' ? '&gt; 1000 miyosit / ünite' : '≈ 10 miyosit / ünite', 'f54-s', 'middle')}${tx(nr ? 75 : 88, 44, kas === 'quad' ? 'Büyük, güçlü · kaba hareket' : 'İnce denetim · çok ünite', 'f54-s f54-m', 'middle')}</g>`;
        s += `<text x="${nr ? 20 : 20}" y="${nr ? 108 : 262}" class="f54-t f54-s f54-m">Mavi lifler: bu ünite · gri: başka üniteler (kasta karışık)</text><text x="${nr ? 20 : 20}" y="${nr ? 390 : 284}" class="f54-t f54-s f54-m">Bir ünite = tek lif tipi (ör. tip I)</text>`;
        svg.innerHTML = s;
      };
      el.innerHTML = `<div class="btn-row f54-ctl">${segH('Kas', 'k', [['quad', 'Kuadriseps femoris'], ['eye', 'Ekstraoküler kas']], kas)}<button type="button" class="btn" data-fire>Ateşle</button></div><svg class="f54-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Bir α-motor nöron ve bağlı olduğu kas lifleri: motor ünite"></svg><p class="f54-not" data-o="t">Tek AP → ünitedeki bütün lifler</p>`;
      const svg = el.querySelector('svg');
      const clean = () => { if (stopT) { stopT(); stopT = null; } if (tmo) { clearTimeout(tmo); tmo = null; } ph = 0; };
      const fire = () => {
        clean(); capSet(el, CAPS.fire);
        if (RM) { ph = 2; render(); tmo = setTimeout(() => { ph = 0; render(); }, 1000); return; }
        ph = 1; fireT = 0; render();
        stopT = ticker(el, (dt) => {
          fireT += dt;
          if (ph === 1 && fireT >= 0.6) { ph = 2; render(); tmo = setTimeout(() => { ph = 0; render(); }, 300); if (stopT) { const s = stopT; stopT = null; s(); } return; }
          if (ph === 1) render();
        });
      };
      const onClick = (e) => {
        const k = e.target.closest('[data-k]');
        if (k) { clean(); kas = k.dataset.k; basSec(el, 'k', kas); capSet(el, CAPS[kas]); render(); }
        else if (e.target.closest('[data-fire]')) fire();
      };
      el.addEventListener('click', onClick); capSet(el, CAPS[kas]); render();
      return () => { clean(); el.removeEventListener('click', onClick); };
    });
  };

  /* ---------- 9 · Kuvvet: katılım, sıklık, uzunluk ---------- */
  VIZ.f54_kuvvet = (el) => {
    let tab = 'kat', g = 20, hz = 2, u = 55;
    const SZ = [2, 3, 5, 8, 12, 18];
    const tens = (x) => (x >= 62 ? clamp(1 - (x - 62) / 38, 0, 1) : x >= 48 ? 1 : 0.3 + 0.7 * Math.pow(x / 48, 1.5));
    const Sof = (x) => (x >= 55 ? 200 + (x - 55) * 3.5 : 200 - (55 - x) * 0.75);
    return comp(el, (nr) => {
      el.innerHTML = `<div class="btn-row f54-ctl">${segH('Etken', 'tb', [['kat', 'Katılım'], ['sik', 'Sıklık'], ['uz', 'Uzunluk']], tab)}</div><div class="f54-kv-body"></div>`;
      const body = el.querySelector('.f54-kv-body');
      const rngH = (lab, min, max, v, id, valTxt) => `<label class="f54-rng"><span>${lab}: <b data-o="v">${valTxt}</b></span><input type="range" min="${min}" max="${max}" step="1" value="${v}" data-r="${id}" aria-label="${lab}"></label>`;
      const build = () => {
        basSec(el, 'tb', tab);
        if (tab === 'kat') {
          body.innerHTML = rngH('İstenen gerim', 0, 100, g, 'g', '%' + g) + `<svg class="f54-svg" viewBox="0 0 ${nr ? '360 270' : '640 250'}" role="img" aria-label="Altı motor ünite küçükten büyüğe; istenen gerim arttıkça sırayla devreye girer"></svg>`;
        } else if (tab === 'sik') {
          body.innerHTML = rngH('AP sıklığı', 1, 50, hz, 'hz', hz + ' Hz') + `<svg class="f54-svg" viewBox="0 0 ${nr ? '360 280' : '640 280'}" role="img" aria-label="Aksiyon potansiyelleri ve toplanan kasılma; düşük sıklıkta ayrı kasılmalar, yüksek sıklıkta düz tetanus"></svg><div class="f54-chips" data-o="rej"><span class="f54-chip" data-j="0">Tek kasılma</span><span class="f54-chip" data-j="1">Toplanma</span><span class="f54-chip" data-j="2">Tetanus</span></div>`;
        } else {
          body.innerHTML = rngH('Sarkomer uzunluğu', 0, 100, u, 'u', u < 48 ? 'çok kısa' : u > 62 ? 'çok uzun' : 'en uygun') + `<svg class="f54-svg" viewBox="0 0 ${nr ? '360 400' : '640 270'}" role="img" aria-label="Sarkomer uzunluğuna göre gerim eğrisi ve filamanların örtüşmesi"></svg>`;
        }
        draw();
      };
      const draw = () => {
        const svg = body.querySelector('svg'), vo = body.querySelector('[data-o="v"]');
        if (tab === 'kat') {
          const act = SZ.map((_, i) => (i === 0 ? g > 0 : g > i * 17));
          const T = SZ.reduce((a, n, i) => a + (act[i] ? n : 0), 0) / 48;
          const cw = nr ? 100 : 86, cx0 = nr ? 8 : 20; let s = '';
          SZ.forEach((n, i) => {
            const col = nr ? i % 3 : i, row = nr ? Math.floor(i / 3) : 0, x = cx0 + col * (nr ? 106 : 90), y0 = nr ? 20 + row * 124 : 20, on = act[i];
            s += `<g opacity="${on ? 1 : 0.4}"><circle cx="${x + 14}" cy="${y0 + 12}" r="9" fill="${on ? 'var(--accent)' : 'var(--chip)'}" stroke="var(--accent-ink)" stroke-width="2"/><path d="M${x + 23} ${y0 + 12}h10" stroke="var(--accent)" stroke-width="2.4"/>`;
            for (let j = 0; j < n; j++) s += `<rect x="${x + 36}" y="${y0 + j * (nr ? 5.2 : 9.8)}" width="${nr ? 46 : 40}" height="${nr ? 3.8 : 5.5}" rx="2" fill="${on ? 'var(--accent-soft)' : 'var(--chip)'}" stroke="${on ? 'var(--accent)' : 'var(--line)'}" stroke-width="1.2"/>`;
            s += `</g>` + `<text x="${x + 14}" y="${y0 + (nr ? 108 : 200)}" class="f54-t f54-s f54-m" text-anchor="middle">${n} lif</text>`;
          });
          void cw;
          const bx = nr ? 332 : 596, bh = nr ? 200 : 190;
          s += `<rect x="${bx}" y="14" width="22" height="${bh}" rx="6" fill="var(--chip)" stroke="var(--line)" stroke-width="2"/><rect x="${bx}" y="${14 + bh * (1 - T)}" width="22" height="${bh * T}" rx="6" fill="var(--accent)"/><text x="${bx + 11}" y="${14 + bh + 22}" class="f54-t f54-s" text-anchor="middle">Gerim</text>`;
          svg.innerHTML = s; vo.textContent = '%' + g;
          capSet(el, '<b>Katılım.</b> İstenen gerim arttıkça önce en küçük motor üniteler, sonra giderek daha büyükleri devreye girer; bütün kasın kuvveti kasılan miyosit sayısına bağlıdır. [[K1 s. 244]]');
        } else if (tab === 'sik') {
          const X0 = 46, X1 = nr ? 346 : 620, YT = 20, YB = 190, N = 300, tau = 0.03;
          const ap = []; for (let t = 0.04; t < 1; t += 1 / hz) ap.push(t);
          const pts = [], ca = [];
          for (let i = 0; i <= N; i++) { const t = i / N; let sm = 0; ap.forEach((a) => { if (t >= a) { const x = (t - a) / tau; sm += x * Math.exp(1 - x); } }); pts.push([X0 + (X1 - X0) * t, YB - (YB - YT) * (3 * Math.tanh(sm / 3)) / 3.2]); ca.push([X0 + (X1 - X0) * t, YB - (YB - YT) * Math.min(1, sm / 5.5) * 0.45]); }
          const path = (p) => p.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join('');
          let s = `<line x1="${X0}" y1="${YB}" x2="${X1}" y2="${YB}" stroke="var(--line)" stroke-width="2"/><line x1="${X0}" y1="${YT - 6}" x2="${X0}" y2="${YB}" stroke="var(--line)" stroke-width="2"/>`;
          s += `<text x="${X0 - 8}" y="${YT + 8}" class="f54-t f54-s f54-m" text-anchor="end">Gerim</text>`;
          s += `<path d="${path(ca)}" fill="none" stroke="var(--warn)" stroke-width="1.8" opacity=".85"/><path d="${path(pts)}" fill="none" stroke="var(--accent)" stroke-width="3.2" stroke-linejoin="round"/>`;
          s += `<text x="${X1}" y="${YT + 4}" class="f54-t f54-s" fill="var(--warn)" text-anchor="end">Sitoplazmik Ca²⁺ (ince)</text>`;
          ap.forEach((a) => { const x = X0 + (X1 - X0) * a; s += `<line x1="${x}" y1="${YB + 16}" x2="${x}" y2="${YB + 36}" stroke="var(--warn)" stroke-width="2.4"/>`; });
          s += `<text x="${X0 - 8}" y="${YB + 32}" class="f54-t f54-s f54-m" text-anchor="end">AP</text>`;
          [0, 0.5, 1].forEach((t) => { s += `<text x="${X0 + (X1 - X0) * t}" y="${YB + 62}" class="f54-t f54-s f54-m" text-anchor="${t === 1 ? 'end' : t === 0 ? 'start' : 'middle'}">${t === 0 ? '0' : fmt(t, t === 1 ? 0 : 1)} s</text>`; });
          svg.innerHTML = s; vo.textContent = hz + ' Hz';
          const j = hz < 8 ? 0 : hz <= 30 ? 1 : 2;
          body.querySelectorAll('[data-j]').forEach((c) => c.classList.toggle('on', +c.dataset.j === j));
          capSet(el, j === 0 ? '<b>Düşük sıklık.</b> Her aksiyon potansiyeli ayrı bir kasılma yapar; Ca²⁺ arada SR\'ye geri alınır. [[K1 s. 244]]' : j === 1 ? '<b>Toplanma.</b> Refrakter dönem, gerimin gevşemesinden ve Ca²⁺\'un SR\'ye geri alınmasından kısadır; yeni potansiyeller önceki kasılma bitmeden gelir ve sitoplazmada Ca²⁺ birikir. [[K1 s. 244]]' : '<b>Tetanus.</b> Yüksek sıklıkta Ca²⁺ birikimi artan ve süreğen bir gerim oluşturur: tetanus. [[K1 s. 244]]');
        } else {
          const cx0 = nr ? 40 : 40, cx1 = nr ? 330 : 300, cy0 = nr ? 24 : 36, cy1 = nr ? 190 : 200;
          const gx = (x) => cx0 + (cx1 - cx0) * x / 100, gy = (t) => cy1 - (cy1 - cy0) * t;
          let s = `<rect x="${gx(48)}" y="${cy0 - 4}" width="${gx(62) - gx(48)}" height="${cy1 - cy0 + 4}" fill="var(--ok-soft)"/><text x="${(gx(48) + gx(62)) / 2}" y="${cy0 - 12}" class="f54-t f54-s" fill="var(--ok)" text-anchor="middle">${nr ? 'normal aralık' : 'Kasın normal çalışma aralığı'}</text>`;
          s += `<line x1="${cx0}" y1="${cy1}" x2="${cx1}" y2="${cy1}" stroke="var(--line)" stroke-width="2"/><line x1="${cx0}" y1="${cy0 - 4}" x2="${cx0}" y2="${cy1}" stroke="var(--line)" stroke-width="2"/>`;
          let d = ''; for (let x = 0; x <= 100; x += 2) d += (x ? 'L' : 'M') + gx(x).toFixed(1) + ' ' + gy(tens(x)).toFixed(1);
          s += `<path d="${d}" fill="none" stroke="var(--accent)" stroke-width="3.2"/><circle cx="${gx(u)}" cy="${gy(tens(u))}" r="7" fill="var(--paper)" stroke="var(--accent-ink)" stroke-width="3.4"/>`;
          s += `<text x="${cx0}" y="${cy1 + 22}" class="f54-t f54-s f54-m">kısa</text><text x="${cx1}" y="${cy1 + 22}" class="f54-t f54-s f54-m" text-anchor="end">uzun</text><text x="${(cx0 + cx1) / 2}" y="${cy1 + 22}" class="f54-t f54-s f54-m" text-anchor="middle">Sarkomer uzunluğu</text><text x="${cx0 + 6}" y="${cy0 + 10}" class="f54-t f54-s f54-m">Gerim</text>`;
          // sarkomer çizimi
          const sc = nr ? 0.9 : 0.8, S = Sof(u), cxs = nr ? 180 : 478, cys = nr ? 300 : 120, a = cxs - S * sc / 2, b = cxs + S * sc / 2;
          s += sarkG(a, b, cys, 160 * sc, 100 * sc, { gap: 13, sw: 4.2 });
          if (u < 48) { s += `<circle cx="${a}" cy="${cys}" r="${nr ? 30 : 28}" fill="none" stroke="var(--crit)" stroke-width="2.6"/><circle cx="${b}" cy="${cys}" r="${nr ? 30 : 28}" fill="none" stroke="var(--crit)" stroke-width="2.6"/><path d="M${cxs - 14} ${cys - 34}l28 68M${cxs + 14} ${cys - 34}l-28 68" stroke="var(--crit)" stroke-width="3"/>`; }
          const ov = u > 62 ? Math.max(0, 1 - (u - 62) / 38) : 1;
          s += `<text x="${cxs}" y="${cys + 64}" class="f54-t f54-s ${u < 48 || u > 62 ? '' : 'f54-m'}" text-anchor="middle" ${u < 48 ? 'fill="var(--crit)"' : u > 62 ? 'fill="var(--warn)"' : ''}>${u < 48 ? 'ince filamanlar çarpışıyor' : u > 62 ? (ov <= 0.02 ? 'örtüşme yok: köprü kurulamaz' : 'örtüşme azalıyor') : 'tüm başlar aktinle örtüşüyor'}</text>`;
          svg.innerHTML = s; vo.textContent = u < 48 ? 'çok kısa' : u > 62 ? 'çok uzun' : 'en uygun';
          capSet(el, u > 62 ? '<b>Aşırı germe.</b> Aktin–miyozin örtüşmesi azalır, sonunda tümüyle kalkar ve hiç köprü kurulamaz. [[K1 s. 244]]' : u < 48 ? '<b>Aşırı kısalma.</b> Filamanlar çarpışır, sürtünme artar ve sarkomer bozulur; kasılma daha fazla süremez. [[K1 s. 244]]' : '<b>En uygun uzunluk.</b> Miyozin başlarının aktinle örtüşmesi en fazladır, en çok çapraz köprü kurulur. Kasta sarkomerler normalde bu uzunluğa yakındır; bu yüzden başlangıç uzunluğunun gerime katkısı genellikle azdır. [[K1 s. 244]]');
        }
      };
      const onClick = (e) => { const t = e.target.closest('[data-tb]'); if (t) { tab = t.dataset.tb; build(); } };
      const onIn = (e) => { const r = e.target.dataset && e.target.dataset.r; if (!r) return; const v = +e.target.value; if (r === 'g') g = v; else if (r === 'hz') hz = v; else u = v; draw(); };
      el.addEventListener('click', onClick); el.addEventListener('input', onIn); build();
      return () => { el.removeEventListener('click', onClick); el.removeEventListener('input', onIn); };
    });
  };

  /* ---------- 10 · Hastalıklar ---------- */
  VIZ.f54_hastalik = (el) => {
    let hk = 'duchenne';
    const H = {
      duchenne: ['Duchenne', "X'e bağlı resesif", 'Distrofin eksik: aktin–sarkolemma bağlantısı kopar', "3–5 yaş · proksimal güçsüzlük · psödohipertrofi · ergenlik sonunda solunum/kalp yetersizliği", '<b>Duchenne musküler distrofisi.</b> Distrofin eksik: aktini destek proteiniyle sarkolemmaya bağlayan halka kopar. Bir hastalık seçin. [[K1 s. 244]]'],
      becker: ['Becker', "X'e bağlı resesif", 'Distrofin az ve yapısı bozuk', "Duchenne'den hafif · ergenlikte başlar · ölüm 30'lu–40'lı yaşlar", '<b>Becker musküler distrofisi.</b> Distrofin vardır ama azalmış ve yapısı bozuktur; tablo DMD\'den hafiftir. [[K1 s. 244–245]]'],
      dm: ['Miyotonik distrofi', 'Otozomal dominant', 'Nükleotit tekrarı (DM1: trinükleotit), antisipasyon · DMPK (DM1) / CNBP (DM2) → Na⁺ ya da Cl⁻ kanalı anormal; aşırı uyarılabilir zar → tekrarlayan AP, süreğen kasılma', 'Miyotoni, kas erimesi, insülin direnci, kardiyomiyopati, ileti bozukluğu', '<b>Miyotonik distrofi.</b> DMPK ya da CNBP mutasyonu sarkolemmada Na⁺ ya da Cl⁻ kanallarının anormal ifadesine yol açar; zar aşırı uyarılabilir, tekrarlayan aksiyon potansiyelleri süreğen kasılma (miyotoni) yapar. [[K1 s. 245]]'],
      kon: ['Konjenital miyotoni', 'Otozomal dominant', 'ClC-1 klorür kanalı', 'Miyotoni · yaygın güçsüzlük yok · palatofaringeal işlev bozukluğu → disfaji', '<b>Konjenital miyotoni.</b> Bozukluk sarkolemmanın ClC-1 klorür kanalındadır; miyotoni olur ama yaygın güçsüzlük olmaz. [[K1 s. 245]]'],
    };
    return comp(el, (nr) => {
      el.innerHTML = `${segH('Hastalık', 'h', [['duchenne', 'Duchenne'], ['becker', 'Becker'], ['dm', 'Miyotonik distrofi'], ['kon', 'Konjenital miyotoni']], hk)}<div class="f54-hst"><svg class="f54-svg" viewBox="0 0 400 290" role="img" aria-label="Miyosit zarı: kanallar ve aktin–distrofin–sarkolemma bağlantısı; seçilen hastalıkta bozulan yer işaretlenir"><defs><pattern id="f54-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="var(--muted)" stroke-width="2"/></pattern></defs><g class="f54-hg"></g></svg><div class="f54-card f54-hcard"></div></div>`;
      const g = el.querySelector('.f54-hg'), card = el.querySelector('.f54-hcard');
      const draw = () => {
        const dys = hk === 'duchenne', bek = hk === 'becker', na = hk === 'dm', cl = hk === 'dm' || hk === 'kon', spikes = na || cl;
        const lab = (x, y, t, c = '', a = 'start') => `<text x="${x}" y="${y}" class="f54-t f54-s" fill="${c || 'var(--ink)'}" text-anchor="${a}">${t}</text>`;
        let s = `<rect x="6" y="38" width="388" height="9" rx="3" fill="var(--chip)" stroke="var(--line)" stroke-width="2.4"/>${lab(390, 80, 'sarkolemma', 'var(--muted)', 'end')}`;
        s += `<rect x="60" y="28" width="16" height="28" rx="4" fill="${na ? 'var(--crit-soft)' : 'var(--c-basic-soft)'}" stroke="${na ? 'var(--crit)' : 'var(--c-basic)'}" stroke-width="${na ? 3.4 : 2.4}"/>${lab(68, 20, 'Na⁺ kanalı', na ? 'var(--crit)' : '', 'middle')}`;
        s += `<rect x="150" y="28" width="16" height="28" rx="4" fill="${cl ? 'var(--crit-soft)' : 'var(--ok-soft)'}" stroke="${cl ? 'var(--crit)' : 'var(--ok)'}" stroke-width="${cl ? 3.4 : 2.4}"/>${lab(158, 20, hk === 'kon' ? 'Cl⁻ kanalı (ClC-1)' : 'Cl⁻ kanalı', cl ? 'var(--crit)' : '', 'middle')}`;
        if (spikes) s += `<path d="M10 100l14 0l6-26l6 40l6-14h14l6-26l6 40l6-14h14l6-26l6 40l6-14h40" transform="translate(0 -4)" fill="none" stroke="var(--crit)" stroke-width="2.2"/>${lab(6, 132, 'tekrarlayan AP', 'var(--crit)')}`;
        const oy = dys ? 22 : 0;
        // distrofin zinciri
        if (dys) s += `<line x1="250" y1="50" x2="250" y2="128" stroke="var(--crit)" stroke-width="3.4" stroke-dasharray="6 6"/>${lab(262, 92, 'Distrofin eksik', 'var(--crit)')}<rect x="150" y="56" width="240" height="68" fill="url(#f54-hatch)" opacity=".28"/>${lab(390, 140, 'fibröz doku', 'var(--muted)', 'end')}`;
        else if (bek) s += `<path d="M250 50v20M250 84v14M250 112v14" stroke="var(--warn)" stroke-width="3" stroke-linecap="round"/>${lab(262, 92, 'Az ve yapısı bozuk', 'var(--warn)')}`;
        else s += `<path d="M250 50c-8 12 8 20 0 32s8 20 0 34" fill="none" stroke="var(--c-clin)" stroke-width="4"/>${lab(262, 92, 'Distrofin', 'var(--c-clin)')}`;
        s += `<g transform="translate(0 ${oy})"><rect x="214" y="128" width="72" height="22" rx="6" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>${lab(250, 144, 'destek prot.', '', 'middle')}`;
        s += `<line x1="250" y1="150" x2="250" y2="168" stroke="var(--c-basic)" stroke-width="3"/><line x1="40" y1="176" x2="380" y2="176" stroke="var(--c-basic)" stroke-width="5" stroke-linecap="round"/>${[60, 110, 160, 210, 290, 340].map((x) => `<circle cx="${x}" cy="176" r="5" fill="var(--c-basic)"/>`).join('')}${lab(46, 164, 'Aktin', 'var(--c-basic)')}`;
        s += `<g stroke="var(--ink)" stroke-width="2.6" fill="none"><path d="M64 150l5 8l-10 8l10 8l-10 8l10 8l-10 8l5 8"/></g>${lab(76, 154, 'Z diski')}`;
        s += `<rect x="90" y="196" width="260" height="14" rx="7" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.2"/>${lab(220, 232, 'miyozin (kalın filaman)', 'var(--muted)', 'middle')}</g>`;
        if (dys) s += lab(214, 262 + 8, 'sarkomer zardan kopuk', 'var(--crit)');
        g.innerHTML = s;
        const d = H[hk];
        card.innerHTML = `<b>${d[0]}</b><dl class="kv"><dt>Kalıtım</dt><dd>${d[1]}</dd><dt>Bozukluk</dt><dd>${d[2]}</dd><dt>Klinik</dt><dd>${d[hk === 'dm' ? 3 : 3]}</dd></dl>`;
        basSec(el, 'h', hk); capSet(el, d[hk === 'dm' ? 5 : 4]);
      };
      const onClick = (e) => { const b = e.target.closest('[data-h]'); if (b) { hk = b.dataset.h; draw(); } };
      el.addEventListener('click', onClick); draw();
      return () => el.removeEventListener('click', onClick);
    });
  };

  /* ---------- 11 · Atrofi ---------- */
  VIZ.f54_atrofi = (el) => {
    let day = 0, playing = false, stopT = null, acc = 0;
    const lo = (n) => 100 * Math.pow(0.96, n), hi = (n) => 100 * Math.pow(0.98, n);
    return comp(el, (nr) => {
      const W = nr ? 360 : 640, Hh = nr ? 430 : 270;
      el.innerHTML = `<div class="btn-row f54-ctl"><button type="button" class="btn" data-play>Oynat</button></div>
        <label class="f54-rng"><span>Yoğun bakımda gün: <b data-o="d"></b></span><input type="range" min="0" max="21" step="1" value="${day}" data-r aria-label="Yoğun bakımda geçen gün"></label>
        <svg class="f54-svg" viewBox="0 0 ${W} ${Hh}" role="img" aria-label="Kas kesitinde kalan kas kütlesi ve günlere göre kayıp bandı"></svg>
        <div class="f54-tags"><span class="tag" data-t>Ventilatörden ayırmada güçlük</span><span class="tag" data-t>Ventilatörle ilişkili pnömoni ↑</span><span class="tag" data-t>Venöz tromboembolizm ↑</span></div>
        <div class="f54-neden"><b>Atrofi nedenleri</b><ul><li>İnaktivite</li><li>Nörojenik (denervasyon)</li><li>Kaşeksi (TNF-α, IFN-γ, IL-6)</li><li>İlaçlar (kortikosteroid: proksimal kaslar)</li><li>Açlık</li><li>Yaşlanma (sarkopeni)</li></ul></div>`;
      const svg = el.querySelector('svg'), rng = el.querySelector('[data-r]'), pb = el.querySelector('[data-play]');
      const draw = () => {
        const a = lo(day), b = hi(day), mid = (a + b) / 2;
        const cx = nr ? 180 : 120, cy = nr ? 100 : 118, R0 = nr ? 78 : 92, rb = 22, R = Math.sqrt(rb * rb + (R0 * R0 - rb * rb) * mid / 100);
        let s = `<circle cx="${cx}" cy="${cy}" r="${R0}" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="5 5"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${rb}" fill="var(--chip)" stroke="var(--line)" stroke-width="3"/><text x="${cx}" y="${cy + 5}" class="f54-t f54-s f54-m" text-anchor="middle">kemik</text>`;
        s += `<text x="${cx}" y="${cy + R0 + 26}" class="f54-t" text-anchor="middle">Kalan kas: %${fmt(a, 1)}–${fmt(b, 1)}</text>`;
        // grafik
        const gx0 = nr ? 52 : 286, gx1 = nr ? 340 : 620, gy0 = nr ? 262 : 24, gy1 = nr ? 392 : 214;
        const X = (n) => gx0 + (gx1 - gx0) * n / 21, Y = (p) => gy1 - (gy1 - gy0) * (p - 40) / 60;
        let up = '', dn = '', lw = ''; for (let n = 0; n <= 21; n++) { up += (n ? 'L' : 'M') + X(n).toFixed(1) + ' ' + Y(hi(n)).toFixed(1); lw += (n ? 'L' : 'M') + X(n).toFixed(1) + ' ' + Y(lo(n)).toFixed(1); dn = 'L' + X(n).toFixed(1) + ' ' + Y(lo(n)).toFixed(1) + dn; }
        s += `<path d="${up}${dn}Z" fill="var(--crit-soft)" opacity=".9"/><path d="${up}" fill="none" stroke="var(--warn)" stroke-width="2.4"/><path d="${lw}" fill="none" stroke="var(--crit)" stroke-width="2.4"/>`;
        s += `<line x1="${gx0}" y1="${gy1}" x2="${gx1}" y2="${gy1}" stroke="var(--line)" stroke-width="2"/><line x1="${gx0}" y1="${gy0 - 4}" x2="${gx0}" y2="${gy1}" stroke="var(--line)" stroke-width="2"/>`;
        [0, 7, 14, 21].forEach((n) => { s += `<text x="${X(n)}" y="${gy1 + 20}" class="f54-t f54-s f54-m" text-anchor="middle">${n}</text>`; });
        [40, 60, 80, 100].forEach((p) => { s += `<line x1="${gx0 - 4}" y1="${Y(p)}" x2="${gx0}" y2="${Y(p)}" stroke="var(--line)" stroke-width="2"/><text x="${gx0 - 8}" y="${Y(p) + 4}" class="f54-t f54-s f54-m" text-anchor="end">${p}</text>`; });
        s += `<text x="${(gx0 + gx1) / 2}" y="${gy1 + 40}" class="f54-t f54-s f54-m" text-anchor="middle">Gün</text><text x="${gx0 + 6}" y="${gy0 - 8}" class="f54-t f54-s f54-m">Kas kütlesi (%)</text>`;
        s += `<text x="${gx1 - 4}" y="${Y(hi(21)) - 8}" class="f54-t f54-s" fill="var(--warn)" text-anchor="end">%2 / gün</text><text x="${gx1 - 4}" y="${Y(lo(21)) + 20}" class="f54-t f54-s" fill="var(--crit)" text-anchor="end">%4 / gün</text>`;
        s += `<line x1="${X(day)}" y1="${gy0 - 4}" x2="${X(day)}" y2="${gy1}" stroke="var(--ink)" stroke-width="2" stroke-dasharray="4 3"/><circle cx="${X(day)}" cy="${Y(hi(day))}" r="4.6" fill="var(--warn)"/><circle cx="${X(day)}" cy="${Y(lo(day))}" r="4.6" fill="var(--crit)"/>`;
        svg.innerHTML = s;
        el.querySelector('[data-o="d"]').textContent = day + '. gün';
        el.querySelectorAll('[data-t]').forEach((t) => t.classList.toggle('crit', day >= 7));
        rng.value = day; pb.textContent = playing ? 'Duraklat' : 'Oynat';
        capSet(el, day === 0 ? '<b>0. gün.</b> Kas kütlesi %100. Yoğun bakımda geçen gün sayısını artırın: kayıp günde ortalama %2–4\'tür. [[K1 s. 245]]'
          : `<b>${day}. gün.</b> Kalan kas kütlesi ≈ %${fmt(a, 1)}–${fmt(b, 1)}. ICUAW simetrik, flask, kranial sinirleri görece koruyan bir güçsüzlüktür; kortikosteroidler, nöromüsküler blokörler, sepsiste dolaşan sitokinler ve immobilizasyon katkıda bulunur. [[K1 s. 245]]` + (day >= 7 ? ' Bu kayıp ventilatörden ayrılmayı zorlaştırır; ventilatörle ilişkili pnömoni ve venöz tromboembolizm riski artar. [[K1 s. 245]]' : ''));
      };
      const stop = () => { playing = false; if (stopT) { stopT(); stopT = null; } };
      const play = () => {
        if (playing) { stop(); draw(); return; }
        if (RM) { day = 21; draw(); return; }
        if (day >= 21) day = 0; playing = true; acc = 0;
        stopT = ticker(el, (dt) => { acc += dt; while (acc >= 0.25 && day < 21) { acc -= 0.25; day++; } if (day >= 21) { stop(); } draw(); });
        draw();
      };
      const onClick = (e) => { if (e.target.closest('[data-play]')) play(); };
      const onIn = (e) => { if (e.target.matches('[data-r]')) { stop(); day = +e.target.value; draw(); } };
      el.addEventListener('click', onClick); el.addEventListener('input', onIn); draw();
      return () => { stop(); el.removeEventListener('click', onClick); el.removeEventListener('input', onIn); };
    });
  };
})();
