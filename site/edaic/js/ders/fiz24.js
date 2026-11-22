/* Fizyoloji Bölüm 24 · Oksijen toksisitesi · bileşenler (K1 s. 102–103). Tarif: docs/tasarim/fiz24.md
   Altı bileşen: f24_organlar (üç hedef organ), f24_elektron (O₂'ye dört elektron), f24_denge (ROS üretimi ve temizleme),
   f24_yarar (ROS'un iki yararlı işi), f24_doz (inspire O₂ basıncı ve süre), f24_bleomisin (bleomisin–demir–O₂ zinciri). Renk sözlüğü dördünde aynı: O₂ --c-basic, ROS --crit, su --ok,
   antioksidan --c-clin, e⁻ --accent, metal --warn. Modeller şematiktir; bileşen altlarında öyle belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const easeOut = (f) => 1 - Math.pow(1 - f, 3);
  const r1 = (v) => Math.round(v * 10 + 1e-7) / 10;
  const fmt = (v, d = 1) => { let s = v.toFixed(d); if (/^-0(\.0+)?$/.test(s)) s = s.slice(1); return s.replace('.', ',').replace('-', '−'); };
  const DAR = 600; // bileşen bu genişliğin altındaysa dar (telefon) yerleşimi
  const darMi = (el) => (el.clientWidth || el.getBoundingClientRect().width || 800) < DAR;
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const kok = (el, ad) => { el.classList.add('f24-kok', ad); if (RM) el.classList.add('f24-rm'); };

  // Sayfadaki .viz-cap: ilk metin kullanıcı dokunana kadar kalır; sonra duruma göre değişir
  const aciklama = (el) => {
    const kutu = el.closest('.viz'), cap = kutu && kutu.querySelector(':scope > .viz-cap');
    if (!cap) return { yaz() {} };
    cap.setAttribute('aria-live', 'polite');
    let son = cap.innerHTML;
    return { yaz(h) { const x = REF(h); if (x !== son) { cap.innerHTML = x; son = x; } } };
  };
  // Genişlik eşiği aşılınca yeniden kur
  const boyutIzle = (el, cb) => {
    if (!('ResizeObserver' in window)) return () => {};
    let dar = darMi(el), raf = 0;
    const ro = new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { const d = darMi(el); if (d !== dar) { dar = d; cb(d); } }); });
    ro.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  };
  // rAF geçişi (easeOutCubic); RM'de anlık. İptal işlevi döndürür.
  const gecis = (ms, adim, bitti) => {
    if (RM || ms <= 0) { adim(1); if (bitti) bitti(); return () => {}; }
    let raf = 0, t0 = 0, on = true;
    const f = (t) => {
      if (!on) return;
      if (!t0) t0 = t;
      const k = Math.min(1, (t - t0) / ms);
      adim(easeOut(k));
      if (k < 1) raf = requestAnimationFrame(f); else if (bitti) bitti();
    };
    raf = requestAnimationFrame(f);
    return () => { on = false; cancelAnimationFrame(raf); };
  };

  /* ---------- ortak kimyasal gösterimler (tarifteki sözlük) ----------
     Nokta = eşleşmemiş elektron. O₂'de iki nokta (iki eşleşmemiş elektron, K1 s. 102), O₂•⁻ ve OH•'de bir nokta,
     H₂O₂ ve H₂O'da nokta yok. */
  const hTop = (x, y) => `<g class="f24-h"><circle cx="${x}" cy="${y}" r="6.5"/><text x="${x}" y="${y + 3.1}">H</text></g>`;
  const nk = (x, y) => `<circle class="f24-nk" cx="${x}" cy="${y}" r="2.6"/>`;
  const CIFT = '<circle class="f24-a" cx="-9" cy="0" r="13"/><circle class="f24-a" cx="9" cy="0" r="13"/>';
  const MOL = {
    o2: `<g class="f24-mol m-o2">${CIFT}${nk(-9, -16.6)}${nk(9, -16.6)}<text y="4">O₂</text></g>`,
    sup: `<g class="f24-mol m-ros">${CIFT}${nk(19, -14)}<text class="f24-yuk" x="26" y="-10">−</text><text y="4">O₂•⁻</text></g>`,
    hp: `<g class="f24-mol m-ros">${hTop(-27, 7)}${hTop(27, -7)}${CIFT}<text y="4">H₂O₂</text></g>`,
    oh: `<g class="f24-mol m-ros">${hTop(-15, 10)}<circle class="f24-a" r="13"/>${nk(11, -14)}<text class="k" y="3.6">OH•</text></g>`,
    su: `<g class="f24-mol m-su">${hTop(-14, 11)}${hTop(14, 11)}<circle class="f24-a" r="13"/><text class="k" y="3.6">H₂O</text></g>`,
  };
  const ELK = '<g class="f24-e"><circle r="7"/><text y="3">e⁻</text></g>';
  const JETON = '<g class="f24-jet"><circle class="f24-a" r="7"/><circle class="f24-nk" cx="6.4" cy="-6.4" r="2.2"/></g>';
  const altigen = (r) => Array.from({ length: 6 }, (_, k) => { const a = (Math.PI / 3) * k - Math.PI / 2; return `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`; }).join(' ');
  const METAL = (ad = 'Fe', r = 13) => `<g class="f24-fe"><polygon points="${altigen(r)}"/><text y="${(r * 0.3).toFixed(1)}" style="font-size:${r > 14 ? 12.5 : 11}px">${ad}</text></g>`;
  // konum grubu (transform özniteliği); canlandırılan iç grup her zaman ayrı (CSS transform özniteliği ezmesin)
  const yer = (x, y, ic, s = 1) => `<g transform="translate(${+x.toFixed ? x.toFixed(1) : x} ${+y.toFixed ? y.toFixed(1) : y})${s !== 1 ? ` scale(${s})` : ''}">${ic}</g>`;
  const anim = (cls, st, ic) => `<g class="${cls}"${st ? ` style="${st}"` : ''}>${ic}</g>`;
  const okUcu = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse"><path class="${cls}" d="M0 0 L10 5 L0 10 z"/></marker>`;

  /* =====================================================================
     1 · f24_elektron — O₂'ye dört elektron: ara basamaklar ve kaçış (K1 s. 102)
     ===================================================================== */
  VIZ.f24_elektron = (el) => {
    // sol/sag/ust/alt: çizimin merkezden uzanımı (ok uçlarını hesaplamak için)
    const A = [
      { tur: 'o2', ad: 'Oksijen', f: 'O₂', ros: false, sol: 22, sag: 22, ust: 19, alt: 13, ek: '' },
      { tur: 'sup', ad: 'Süperoksit anyonu', f: 'O₂•⁻', ros: true, sol: 22, sag: 30, ust: 17, alt: 13, ek: '' },
      { tur: 'hp', ad: 'Hidrojen peroksit', f: 'H₂O₂', ros: true, radDegil: true, sol: 34, sag: 34, ust: 14, alt: 14, ek: '+ 2H⁺' },
      { tur: 'oh', ad: 'Hidroksil radikali', f: 'OH• + H₂O', ros: true, yan: true, sol: 22, sag: 36, ust: 17, alt: 26, ek: '+ H⁺' },
      { tur: 'su', ad: 'Su', f: '2 H₂O', ros: false, yan: true, sol: 21, sag: 36, ust: 13, alt: 26, ek: '+ H⁺' },
    ];
    const TEP = [
      'Başlangıç: O₂ · iki suya indirgenmesi için 4 e⁻ gerekir',
      'O₂ + e⁻ → O₂•⁻',
      'O₂•⁻ + e⁻ + 2H⁺ → H₂O₂',
      'H₂O₂ + e⁻ + H⁺ → OH• + H₂O',
      'OH• + e⁻ + H⁺ → H₂O · toplam 2 H₂O',
    ];
    const CAP = [
      "<b>1 · Moleküler O₂.</b> Her iki oksijen atomunun dış kabuğunda birer eşleşmemiş elektron vardır; O₂'yi paramanyetik yapan budur. Bu elektronlar az reaktif olduğu için O₂'nin elektron alması metal iyonlarının yardımını gerektirir. [[K1 s. 102]]",
      '<b>2 · Birinci elektron: süperoksit anyonu (O₂•⁻).</b> İlk ROS. Eşleşmemiş elektron taşır, yani serbest radikaldir. [[K1 s. 102]]',
      '<b>3 · İkinci elektron: hidrojen peroksit (H₂O₂).</b> Kitabın ROS listesindeki ikinci ara ürün. Eşleşmemiş elektronu yoktur, yani radikal değildir; ama reaktiftir ve zarlardan kolayca geçer (sayfadaki Atlas notu). [[K1 s. 102]]',
      '<b>4 · Üçüncü elektron: hidroksil serbest radikali (OH•).</b> ROS\'un en reaktif olanı; oluştuğu yerin hemen yakınındaki moleküllerle tepkimeye girer (Atlas notu). [[K1 s. 102]]',
      '<b>5 · Dördüncü elektron: su.</b> Dört elektron tamamlandı ve O₂ iki su molekülüne indirgendi. Yol boyunca oluşan üç ara ürün reaktif oksijen türleridir; nükleik asitlere, yağ asitlerine, amino asitlere ve sülfhidril içeren enzimlere zarar verirler. [[K1 s. 102]]',
    ];
    const K4_ARA = "Kompleks IV'te bu ara ürün metal merkeze bağlı kalır, hücreye kaçmaz (Atlas notu). ";
    const K4_SON = '<b>5 · Dördüncü elektron: su.</b> Elektron taşıma zincirinin sonunda elektronlar, bakır içeren sitokrom c oksidaz (Kompleks IV) aracılığıyla O₂\'ye aktarılır ve su oluşur. Ara ürünler metal merkezde bağlı tutulduğu için bu yoldan serbest ROS hemen hemen çıkmaz (Atlas notu). [[K1 s. 102]]';
    const HEDEF = ['Nükleik asitler', 'Yağ asitleri', 'Amino asitler', ['Sülfhidril (–SH)', 'içeren enzimler']];
    const VUR = { 2: [0, 1, 2], 3: [1, 2, 3], 4: [2, 3, 0] }; // her ROS basamağında üç kopya üç hedefe
    const vurus = (n) => { const c = [0, 0, 0, 0]; for (let s = 2; s <= Math.min(n, 4); s++) VUR[s].forEach((t) => { c[t]++; }); return c; };
    const AKIS0 = 800, AKISJ = 130, VARIS = 740; // ms: kaçışın başlaması, kopyalar arası, hedefe varış

    const geo = (d) => (d ? {
      W: 360, H: 614, kw: 60, kh: 24, kutu: (k) => [30 + 80 * k, 26], cntL: [20, 18, 'start'], cntR: [340, 18],
      st: (i) => [84, [100, 182, 264, 346, 430][i]],
      hedef: (t) => [[20, 476], [186, 476], [20, 532], [186, 532]][t].concat([154, 50]),
      cer: [6, 60, 348, 542], cerT: [18, 76],
      k4: [30, 474, 300, 118], k4t: 494, k4m: [180, 526], fe: [146, 566], cu: [214, 566], cik: [[296, 514], [296, 558]], k4y: [180, 608],
    } : {
      W: 720, H: 354, kw: 46, kh: 26, kutu: (k) => [250 + 58 * k, 18], cntL: [238, 36, 'end'], cntR: [486, 36],
      st: (i) => [[80, 228, 378, 528, 650][i], 116],
      hedef: (t) => [60 + 160 * t, 250, 140, 58],
      cer: [8, 54, 704, 282], cerT: [20, 328],
      k4: [160, 222, 400, 104], k4t: 243, k4m: [360, 274], fe: [322, 306], cu: [398, 306], cik: [[604, 262], [654, 292]], k4y: [360, 346],
    });

    const cap = aciklama(el);
    kok(el, 'f24-el');
    let gor = 'serbest', adim = RM ? 5 : 1, dar = darMi(el), oyn = 0, dokundu = RM;
    el.innerHTML = `<div class="f24-ust">${segHtml('Görünüm', 'g', [['serbest', 'Serbest'], ['k4', "Kompleks IV'te"]], 'serbest')}
      <div class="btn-row f24-btns"><button type="button" class="btn ghost" data-a="geri">◀ Geri</button><button type="button" class="btn" data-a="ileri">İleri ▶</button><button type="button" class="btn ghost" data-a="bas">Baştan</button>${RM ? '' : '<button type="button" class="btn ghost" data-a="oynat" aria-pressed="false">Oynat</button>'}<span class="f24-adim"></span></div></div>
      <div class="f24-sahne"></div>
      <p class="f24-tep" aria-hidden="true"></p>`;
    const $ = (s) => el.querySelector(s);
    const sahne = $('.f24-sahne'), tep = $('.f24-tep'), oynB = $('[data-a="oynat"]');
    let svg = null, ic = null;

    const kur = () => {
      const G = geo(dar);
      sahne.innerHTML = `<svg class="f24-svg ${dar ? 'f24-dar' : 'f24-gen'}" viewBox="0 0 ${G.W} ${G.H}" role="img"><defs>${okUcu('f24-ok-e', 'f24-okuc')}</defs><g></g></svg>`;
      svg = sahne.querySelector('svg'); ic = svg.querySelector('g');
    };
    const rozet = (x, y, w, t, c) => `<g class="f24-rz ${c}"><rect x="${x.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="${dar ? 19 : 17}" rx="${dar ? 9.5 : 8.5}"/><text x="${(x + w / 2).toFixed(1)}" y="${y + (dar ? 13.6 : 12.3)}">${t}</text></g>`;
    const rozetler = (i, G) => {
      const a = A[i], L = [a.ros ? ['ROS', 'ros'] : ['ROS değil', 'yok']];
      if (a.radDegil) L.push(['radikal değil', 'uyari']);
      if (gor === 'k4' && i >= 1 && i <= 3) L.push(['bağlı kalır', 'bagli']);
      const w = L.map(([t]) => t.length * (dar ? 7.6 : 6.4) + 14), gap = 6, [x, y] = G.st(i);
      let out = '';
      if (dar) {
        let cx = 146, cy = y + 21;
        L.forEach(([t, c], k) => { if (cx + w[k] > 354) { cx = 146; cy += 20; } out += rozet(cx, cy, w[k], t, c); cx += w[k] + gap; });
      } else {
        let cx = x - (w.reduce((s, v) => s + v, 0) + gap * (L.length - 1)) / 2;
        L.forEach(([t, c], k) => { out += rozet(cx, 162, w[k], t, c); cx += w[k] + gap; });
      }
      return out;
    };
    const etiket = (i, G) => {
      const a = A[i], [x, y] = G.st(i);
      return dar
        ? `<text class="f24-ad" x="146" y="${y - 4}">${a.ad}</text><text class="f24-fm" x="146" y="${y + 13}">${a.f}</text>`
        : `<text class="f24-ad" x="${x}" y="80" text-anchor="middle">${a.ad}</text><text class="f24-fm" x="${x}" y="152" text-anchor="middle">${a.f}</text>`;
    };
    const durak = (i, G, yeni) => {
      const a = A[i], [x, y] = G.st(i), cur = i === adim - 1;
      let cls = 'f24-ist' + (cur ? ' cur' : '');
      if (cur && yeni) cls += ' f24-yeni'; else if (yeni && i === adim - 2) cls += ' f24-kucul';
      const icerik = MOL[a.tur] + (a.yan ? yer(24, 16, MOL.su, 0.55) : '');
      const lbl = etiket(i, G) + (cur ? rozetler(i, G) : '');
      return yer(x, y, anim(cls, '--d:300ms', icerik)) + (cur && yeni ? anim('f24-gir', '--d:380ms', lbl) : lbl);
    };
    const ok = (k, G, yeni) => { // durak k-1 → k
      const a0 = A[k - 1], a1 = A[k], s0 = k - 1 === adim - 1 ? 1.25 : 1, s1 = k === adim - 1 ? 1.25 : 1;
      const [x0, y0] = G.st(k - 1), [x1, y1] = G.st(k);
      let ln, eX, eY, pX, pY, hX, hY, hA;
      if (dar) {
        const ya = y0 + a0.alt * s0 + 4, yb = y1 - a1.ust * s1 - 6, m = (ya + yb) / 2;
        ln = [x0, ya, x0, yb]; eX = 120; eY = m - 5; pX = 102; pY = m - 1; hX = 102; hY = m + 17; hA = 'start';
      } else {
        const xa = x0 + a0.sag * s0 + 6, xb = x1 - a1.sol * s1 - 8, m = (xa + xb) / 2;
        ln = [xa, y0, xb, y0]; eX = m + 7; eY = y0 - 15; pX = m - 7; pY = y0 - 11; hX = m; hY = y0 + 20; hA = 'middle';
      }
      const cizgi = `<line class="f24-okc" x1="${ln[0].toFixed(1)}" y1="${ln[1].toFixed(1)}" x2="${ln[2].toFixed(1)}" y2="${ln[3].toFixed(1)}" marker-end="url(#f24-ok-e)"/>`
        + `<text class="f24-art" x="${pX.toFixed(1)}" y="${pY.toFixed(1)}" text-anchor="${dar ? 'start' : 'middle'}">+</text>`
        + (a1.ek ? `<text class="f24-hp" x="${hX.toFixed(1)}" y="${hY.toFixed(1)}" text-anchor="${hA}">${a1.ek}</text>` : '');
      const [bx, by] = G.kutu(k - 1), kx = bx + G.kw / 2, ky = by + G.kh / 2;
      const e = yeni ? anim('f24-ucus', `--dx:${(kx - eX).toFixed(1)}px;--dy:${(ky - eY).toFixed(1)}px`, ELK) : ELK;
      return (yeni ? anim('f24-gir', '--d:300ms', cizgi) : cizgi) + yer(eX, eY, e);
    };
    const hedefler = (G, yeni) => {
      const c = vurus(adim), c0 = yeni ? vurus(adim - 1) : c, liste = yeni ? VUR[adim] || [] : [];
      let s = '';
      HEDEF.forEach((h, t) => {
        const [x, y, w, hh] = G.hedef(t), j = liste.indexOf(t), dv = j >= 0 ? AKIS0 + j * AKISJ + VARIS : 0;
        const cls = 'f24-hd' + (c[t] ? ' hasar' : '') + (j >= 0 ? (c0[t] ? ' f24-vur' : ' f24-yeni') : '');
        const satir = Array.isArray(h) ? h : [h];
        s += `<g class="${cls}" style="--d:${dv}ms"><rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="10"/>`
          + satir.map((tx, k) => `<text x="${x + w / 2}" y="${(y + hh / 2 + 4.5 + (k - (satir.length - 1) / 2) * 16).toFixed(1)}">${tx}</text>`).join('');
        for (let k = 0; k < c[t]; k++) {
          const ye = k >= c0[t];
          s += `<circle class="f24-hdn${ye ? ' f24-gir' : ''}" cx="${x + w - 10 - k * 8}" cy="${y + 9}" r="3"${ye ? ` style="--d:${dv}ms"` : ''}/>`;
        }
        s += '</g>';
      });
      if (liste.length) {
        const [sx, sy] = G.st(adim - 1), m = MOL[A[adim - 1].tur];
        liste.forEach((t, j) => {
          const [x, y, w, hh] = G.hedef(t), tx = x + w / 2, ty = y + hh / 2;
          s += yer(tx, ty, anim('f24-kacis', `--dx:${(sx - tx).toFixed(1)}px;--dy:${(sy - ty).toFixed(1)}px;--d:${AKIS0 + j * AKISJ}ms`, yer(0, 0, m, 0.55)));
        });
      }
      return s;
    };
    const kompleks4 = (G, yeni) => {
      const [bx, by, bw, bh] = G.k4, [mx, my] = G.k4m, a = A[adim - 1];
      let s = '';
      if (!dar && adim < 5) { const [sx] = G.st(adim - 1); s += `<path class="f24-bagla" d="M${sx} 184 C ${sx} 206, ${mx} 200, ${mx} ${by}"/>`; }
      s += `<rect class="f24-k4" x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="12"/><text class="f24-lb" x="${bx + bw / 2}" y="${G.k4t}" text-anchor="middle">Sitokrom c oksidaz (Kompleks IV)</text>`;
      if (adim < 5) s += `<line class="f24-bag" x1="${G.fe[0]}" y1="${G.fe[1]}" x2="${mx}" y2="${my}"/><line class="f24-bag" x1="${G.cu[0]}" y1="${G.cu[1]}" x2="${mx}" y2="${my}"/>`;
      s += yer(G.fe[0], G.fe[1], METAL('Fe')) + yer(G.cu[0], G.cu[1], METAL('Cu'));
      if (!dar) s += `<text class="f24-t" x="${G.cu[0] + 22}" y="${G.cu[1] + 4}">metal merkez</text>`;
      if (adim < 5) s += yer(mx, my, anim(yeni ? 'f24-gir' : '', yeni ? '--d:300ms' : '', MOL[a.tur] + '<ellipse class="f24-halka" rx="42" ry="19"/>'));
      const say = (n) => (n >= 5 ? 2 : n === 4 ? 1 : 0), n = say(adim), n0 = yeni ? say(adim - 1) : n;
      for (let k = 0; k < n; k++) {
        const [cx, cy] = G.cik[k];
        s += yer(cx, cy, k >= n0 ? anim('f24-cik', `--dx:${mx - cx}px;--dy:${my - cy}px;--d:350ms`, MOL.su) : MOL.su);
      }
      if (adim >= 5) s += `<text class="f24-k f24-okyazi${yeni ? ' f24-gir' : ''}" style="--d:900ms" x="${G.k4y[0]}" y="${G.k4y[1]}" text-anchor="middle">ara ürün serbest kalmaz</text>`;
      return s;
    };
    const ciz = (yeni) => {
      const G = geo(dar), s = [];
      if (gor === 'serbest') s.push(`<rect class="f24-cer" x="${G.cer[0]}" y="${G.cer[1]}" width="${G.cer[2]}" height="${G.cer[3]}" rx="16"/><text class="f24-t" x="${G.cerT[0]}" y="${G.cerT[1]}">hücre içi</text>`);
      s.push(`<text class="f24-t2" x="${G.cntL[0]}" y="${G.cntL[1]}" text-anchor="${G.cntL[2]}">Eklenen elektron</text>`);
      for (let k = 0; k < 4; k++) {
        const [bx, by] = G.kutu(k), dolu = k < adim - 1, son = yeni && k === adim - 2;
        s.push(`<g class="f24-sy${dolu ? ' dolu' : ''}${son ? ' f24-yeni' : ''}"><rect x="${bx}" y="${by}" width="${G.kw}" height="${G.kh}" rx="6"/>${dolu ? `<text x="${bx + G.kw / 2}" y="${by + G.kh / 2 + 4}">e⁻</text>` : ''}</g>`);
      }
      s.push(`<text class="f24-m" x="${G.cntR[0]}" y="${G.cntR[1]}" text-anchor="${dar ? 'end' : 'start'}">${adim - 1} / 4</text>`);
      s.push(gor === 'serbest' ? hedefler(G, yeni) : kompleks4(G, yeni));
      for (let k = 1; k < adim; k++) s.push(ok(k, G, yeni && k === adim - 1));
      for (let i = 0; i < adim; i++) s.push(durak(i, G, yeni));
      // kaçan kopyalar duraklardan çıkıp hedeflere gider: en üstte görünsünler
      ic.innerHTML = s.join('');
      ic.querySelectorAll('.f24-kacis').forEach((k) => ic.appendChild(k.parentNode));
      svg.setAttribute('aria-label', `O₂'ye ${adim - 1} elektron eklendi; ulaşılan ürün: ${A[adim - 1].ad} (${A[adim - 1].f}). Görünüm: ${gor === 'serbest' ? 'serbest, ara ürünler hücredeki hedeflere ulaşır' : "Kompleks IV'te, ara ürünler metal merkezde bağlı"}.`);
      tep.textContent = TEP[adim - 1];
      $('.f24-adim').textContent = `Adım ${adim} / 5`;
      $('[data-a="geri"]').disabled = adim <= 1;
      $('[data-a="ileri"]').disabled = adim >= 5;
      if (dokundu) {
        let c = CAP[adim - 1];
        if (gor === 'k4') { if (adim >= 2 && adim <= 4) c = c.replace('</b> ', '</b> ' + K4_ARA); else if (adim === 5) c = K4_SON; }
        cap.yaz(c);
      }
    };
    const durdur = () => { if (oyn) { clearInterval(oyn); oyn = 0; } if (oynB) { oynB.textContent = 'Oynat'; oynB.setAttribute('aria-pressed', 'false'); } };
    const ileri = () => { if (adim >= 5) return; adim++; ciz(!RM); };
    const git = (n) => { adim = clamp(n, 1, 5); ciz(false); };
    const oynat = () => {
      if (adim >= 5) git(1); else ileri();
      oyn = setInterval(() => { ileri(); if (adim >= 5) durdur(); }, 2400);
      oynB.textContent = 'Durdur'; oynB.setAttribute('aria-pressed', 'true');
      if (adim >= 5) durdur();
    };
    el.addEventListener('click', (e) => {
      const g = e.target.closest('[data-g]');
      if (g) { gor = g.dataset.g; basSec(el, 'g', gor); dokundu = true; ciz(false); return; }
      const b = e.target.closest('[data-a]'); if (!b) return;
      dokundu = true;
      const a = b.dataset.a;
      if (a === 'oynat') { if (oyn) durdur(); else oynat(); return; }
      durdur();
      if (a === 'ileri') ileri(); else if (a === 'geri') git(adim - 1); else if (a === 'bas') git(1);
    });
    kur(); ciz(false);
    const boyutBirak = boyutIzle(el, (d) => { dar = d; kur(); ciz(false); });
    return () => { durdur(); boyutBirak(); };
  };

  /* =====================================================================
     2 · f24_denge — Üretim ve temizleme: denge ne zaman bozulur? (K1 s. 102–103)
     Şematik model, birimler keyfî: U = 1,0 + 3,0 × FiO₂ (+1,2 radyasyon, +1,5 bleomisin–demir);
     T = açık savunmaların toplamı (SOD 0,9, katalaz 0,7, glutatyon 0,9, C vitamini 0,3); taşma K = max(0, U − T).
     Dört savunma açıkken taşma FiO₂ ≈ 0,60'ın üstünde başlar (kitaptaki "50 kPa altı güvenli" sınırına uyum).
     ===================================================================== */
  VIZ.f24_denge = (el) => {
    const SAV = [
      { k: 'sod', ad: 'Süperoksit dismutaz', kisa: 'SOD', c: 0.9 },
      { k: 'kat', ad: 'Katalaz', kisa: 'Katalaz', c: 0.7 },
      { k: 'glu', ad: 'Glutatyon', kisa: 'Glutatyon', c: 0.9 },
      { k: 'vitc', ad: 'C vitamini (ekzojen)', kisa: 'C vitamini', c: 0.3 },
    ];
    const HED = [['Nükleik asitler', 'Nükleik', 'asitler'], ['Yağ asitleri', 'Yağ', 'asitleri'], ['Amino asitler', 'Amino', 'asitler'], ['–SH enzimler', '–SH', 'enzimler']];
    const DURUM = { denge: 'Dengede', sinir: 'Sınırda', asim: 'Savunma aşıldı' };
    const UMAX = 7; // çubuk ölçeği (U en çok 6,7)
    const cap = aciklama(el);
    kok(el, 'f24-dn');
    let f = 0.21, rad = false, bleo = false, hasar = 0, dur = false, dokundu = false, dar = darMi(el);
    const acik = { sod: true, kat: true, glu: true, vitc: true };
    const model = () => {
      const U = r1(1 + 3 * f + (rad ? 1.2 : 0) + (bleo ? 1.5 : 0));
      const T = r1(SAV.reduce((s, d) => s + (acik[d.k] ? d.c : 0), 0));
      const K = r1(Math.max(0, U - T));
      return { U, T, K, d: K === 0 ? 'denge' : K <= 0.8 ? 'sinir' : 'asim' };
    };
    el.innerHTML = `<div class="f24-dn-ic">
        <div class="f24-dn-sahne"></div>
        <div class="f24-yan">
          <label class="f24-rng"><span>Solunan O₂ <b data-o="fi"></b></span><input type="range" min="0.21" max="1" step="0.01" value="0.21" data-r="f" aria-label="FiO₂"></label>
          <div class="f24-grp"><span class="f24-grp-ad">Ek kaynak</span><div class="seg" role="group" aria-label="Ek ROS kaynağı"><button type="button" data-ek="rad" aria-pressed="false">İyonlaştırıcı radyasyon</button><button type="button" data-ek="bleo" aria-pressed="false">Bleomisin + demir</button></div></div>
          <div class="f24-grp" role="group" aria-label="Savunma"><span class="f24-grp-ad">Savunma</span><div class="f24-sav">${SAV.map((d) => `<label class="f24-chk"><input type="checkbox" data-s="${d.k}" checked><span>${d.ad}</span></label>`).join('')}</div></div>
          <div class="btn-row f24-btns">${RM ? '' : '<button type="button" class="btn ghost" data-a="dur" aria-pressed="false">Duraklat</button>'}<button type="button" class="btn ghost" data-a="sifir">Sıfırla</button></div>
          <ul class="facts f24-cip"><li>Üretim <b data-o="U"></b></li><li>Temizleme <b data-o="T"></b></li><li>Taşma <b data-o="K"></b></li><li>Hasar <b data-o="H"></b></li></ul>
        </div>
      </div>`;
    const $ = (s) => el.querySelector(s), o = (k) => el.querySelector(`[data-o="${k}"]`);
    const sahne = $('.f24-dn-sahne');

    // ---- yerleşimler ----
    const GG = {
      W: 720, H: 330, dar: false,
      kay: [[16, 36], [16, 96], [16, 156]], kw: 150, kh: 46,
      boru: [236, 28, 100, 224], suz: [92, 128, 164, 200], sh: 18,
      havuz: [350, 216, 64, 36], hed: (t) => [236 + 118 * t, 274, 110, 44], kanal: 262,
      yak: [[344, 70], [344, 84]], tas: [344, 266],
      lej: [16, [238, 262, 286, 310]],
    };
    const GD = {
      W: 360, H: 512, dar: true,
      kay: [[8, 130], [124, 130], [240, 130]], kw: 112, kh: 28,
      boru: [120, 184, 120, 238], suz: [234, 274, 314, 354], sh: 20,
      havuz: [254, 382, 78, 38], hed: (t) => [8 + 87 * t, 452, 80, 50], kanal: 438,
      yak: [[248, 214], [248, 228]], tas: [248, 444],
      lej: [10, [238, 264, 290, 316]],
    };
    let R = null;
    const kur = () => {
      const G = dar ? GD : GG, [bx, by, bw, bh] = G.boru;
      const s = [];
      // kaynaklar
      const KAD = ['Metabolizma (taban)', 'Solunan O₂', 'Ek kaynak'], KKIS = ['Taban', 'O₂', 'Ek'];
      G.kay.forEach(([x, y], i) => {
        s.push(`<g class="f24-kay" data-k="${i}"><rect x="${x}" y="${y}" width="${G.kw}" height="${G.kh}" rx="${dar ? 8 : 10}"/>`
          + (dar ? `<text class="f24-m f24-kayv" x="${x + G.kw / 2}" y="${y + 19}" text-anchor="middle" data-kv="${i}">${KKIS[i]}</text>`
            : `<text class="f24-k" x="${x + 12}" y="${y + 19}">${KAD[i]}</text><text class="f24-fm f24-kayv" x="${x + 12}" y="${y + 36}" data-kv="${i}"></text>`) + '</g>');
        s.push(`<path class="f24-akok" data-ok="${i}"/><polygon class="f24-akuc" data-uc="${i}"/>`);
      });
      // boru, jetonlar, süzgeçler
      s.push(`<rect class="f24-boru" x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="14"/>`);
      SAV.forEach((d, i) => {
        const y = G.suz[i];
        s.push(`<g class="f24-suz" data-s="${d.k}"><rect x="${bx}" y="${y}" width="${bw}" height="${G.sh}" rx="6"/><text x="${bx + bw / 2}" y="${y + G.sh / 2 + 4}">${d.kisa} ${fmt(d.c)}</text></g>`);
      });
      const [hx, hy, hw, hh] = G.havuz;
      s.push(`<rect class="f24-havuz" x="${hx}" y="${hy}" width="${hw}" height="${hh}" rx="8"/><text class="f24-havuzt" x="${hx + hw / 2}" y="${hy + hh / 2 + 4.5}" text-anchor="middle">H₂O</text>`);
      s.push('<g class="f24-jtl"></g>'); // jetonlar süzgeçlerin ve H₂O havuzunun üstünde görünsün
      s.push(`<text class="f24-fm" x="${G.yak[0][0]}" y="${G.yak[0][1]}">yakalanan</text><text class="f24-fm f24-ink" x="${G.yak[1][0]}" y="${G.yak[1][1]}" data-v="yak"></text>`);
      s.push(`<text class="f24-fm" x="${G.tas[0]}" y="${G.tas[1]}" data-v="tas"></text>`);
      // hedefler
      HED.forEach((h, t) => {
        const [x, y, w, hh2] = G.hed(t);
        s.push(`<g class="f24-dhd" data-h="${t}"><rect class="f24-dhd-z" x="${x}" y="${y}" width="${w}" height="${hh2}" rx="8"/><rect class="f24-dhd-h" x="${x}" y="${y}" width="${w}" height="${hh2}" rx="8"/>`
          + (dar ? `<text x="${x + w / 2}" y="${y + 21}">${h[1]}</text><text x="${x + w / 2}" y="${y + 38}">${h[2]}</text>` : `<text x="${x + w / 2}" y="${y + hh2 / 2 + 4.5}">${h[0]}</text>`) + '</g>');
      });
      // açıklama (lejant)
      const [lx, ly] = G.lej, LT = dar ? ['ROS', 'H₂O', 'savunma', 'hasar'] : ['ROS (O₂•⁻, H₂O₂, OH•)', 'H₂O: temizlendi', 'antioksidan savunma', 'hedefte hasar'];
      s.push(yer(lx + 8, ly[0], JETON) + `<text class="f24-k" x="${lx + 22}" y="${ly[0] + 4}">${LT[0]}</text>`);
      s.push(`<circle class="f24-damla" cx="${lx + 8}" cy="${ly[1]}" r="6"/><text class="f24-k" x="${lx + 22}" y="${ly[1] + 4}">${LT[1]}</text>`);
      s.push(`<rect class="f24-lej-s" x="${lx - 2}" y="${ly[2] - 5}" width="20" height="10" rx="4"/><text class="f24-k" x="${lx + 22}" y="${ly[2] + 4}">${LT[2]}</text>`);
      s.push(`<rect class="f24-lej-h" x="${lx - 2}" y="${ly[3] - 7}" width="20" height="14" rx="4"/><text class="f24-k" x="${lx + 22}" y="${ly[3] + 4}">${LT[3]}</text>`);
      // durum paneli
      if (dar) {
        s.push(`<rect class="f24-panel" x="8" y="6" width="344" height="112" rx="12"/><text class="f24-durum" x="22" y="31" data-v="durum"></text>
          <text class="f24-k" x="22" y="55">Üretim</text><text class="f24-m" x="112" y="55" text-anchor="end" data-v="Uv"></text>
          <rect class="f24-cz" x="120" y="45" width="218" height="12" rx="3"/><rect class="f24-bU" x="120" y="45" height="12" rx="3"/><rect class="f24-bK" y="45" height="12"/>
          <text class="f24-k" x="22" y="77">Temizleme</text><text class="f24-m" x="112" y="77" text-anchor="end" data-v="Tv"></text>
          <rect class="f24-cz" x="120" y="67" width="218" height="12" rx="3"/><rect class="f24-bT" x="120" y="67" height="12" rx="3"/>
          <line class="f24-kap" y1="40" y2="84"/><text class="f24-kapt" y="39">kapasite</text>
          <text class="f24-k" x="22" y="103">Hasar</text><rect class="f24-cz" x="120" y="94" width="178" height="10" rx="5"/><rect class="f24-bH" x="120" y="94" height="10" rx="5"/><text class="f24-m" x="338" y="103.5" text-anchor="end" data-v="Hv"></text>`);
      } else {
        s.push(`<rect class="f24-panel" x="430" y="22" width="274" height="228" rx="14"/><text class="f24-durum" x="448" y="50" data-v="durum"></text>
          <line class="f24-ax" x1="456" x2="636" y1="176" y2="176"/>
          <rect class="f24-bU" x="466" width="44"/><rect class="f24-bK" x="466" width="44"/><rect class="f24-bT" x="576" width="44"/>
          <line class="f24-kap" x1="456" x2="630"/><text class="f24-kapt" x="634">kapasite</text><text class="f24-tasmat" x="516">taşma</text>
          <text class="f24-k" x="488" y="194" text-anchor="middle">Üretim</text><text class="f24-m" x="488" y="211" text-anchor="middle" data-v="Uv"></text>
          <text class="f24-k" x="598" y="194" text-anchor="middle">Temizleme</text><text class="f24-m" x="598" y="211" text-anchor="middle" data-v="Tv"></text>
          <text class="f24-k" x="448" y="237">Hasar</text><rect class="f24-cz" x="494" y="228" width="156" height="10" rx="5"/><rect class="f24-bH" x="494" y="228" height="10" rx="5"/><text class="f24-m" x="690" y="237.5" text-anchor="end" data-v="Hv"></text>`);
      }
      sahne.innerHTML = `<svg class="f24-svg ${dar ? 'f24-dar' : 'f24-gen'}" viewBox="0 0 ${G.W} ${G.H}" role="img" aria-label="ROS kaynakları, antioksidan süzgeçler ve hedeflere ulaşan ROS">${s.join('')}</svg>`;
      const svg = sahne.querySelector('svg'), q = (x) => svg.querySelector(x);
      const jtl = q('.f24-jtl'), NS = 'http://www.w3.org/2000/svg';
      const havuz = [hx + hw / 2, hy + hh / 2];
      const pool = Array.from({ length: 26 }, () => {
        const g = document.createElementNS(NS, 'g'); g.innerHTML = JETON; g.setAttribute('opacity', '0'); jtl.appendChild(g);
        return { g, on: false, faz: '', x: 0, y: 0, t: 0, x0: 0, y0: 0, ys: 0, suz: -1, hed: 0 };
      });
      R = { G, svg, q, pool, havuz, dU: null, dT: null, dW: [0, 0, 0], flas: [0, 0, 0, 0], acc: 0, yakAcc: 0, kredi: {}, hedSira: 0, sonH: -1 };
      yaz(true);
    };
    // ---- akış okları (kalınlık katkıyla orantılı: 1–8 px) ----
    const okCiz = (i, w) => {
      const G = R.G, p = R.q(`[data-ok="${i}"]`), u = R.q(`[data-uc="${i}"]`), a = 4 + w * 1.15;
      if (w <= 0.01) { p.setAttribute('d', ''); u.setAttribute('points', ''); return; }
      p.style.strokeWidth = w.toFixed(2);
      if (G.dar) {
        const [x, y] = G.kay[i], cx = x + G.kw / 2, cy = y + G.kh, ex = [150, 180, 210][i], ey = G.boru[1];
        p.setAttribute('d', `M${cx} ${cy} C ${cx} ${cy + 14}, ${ex} ${ey - 16}, ${ex} ${ey - a + 1}`);
        u.setAttribute('points', `${ex},${ey + 1} ${(ex - a * 0.62).toFixed(1)},${(ey - a).toFixed(1)} ${(ex + a * 0.62).toFixed(1)},${(ey - a).toFixed(1)}`);
      } else {
        const [x, y] = G.kay[i], sx = x + G.kw, sy = y + G.kh / 2, ex = G.boru[0], ey = [50, 62, 74][i];
        p.setAttribute('d', `M${sx} ${sy} C ${sx + 34} ${sy}, ${ex - 34} ${ey}, ${ex - a + 1} ${ey}`);
        u.setAttribute('points', `${ex + 1},${ey} ${(ex - a).toFixed(1)},${(ey - a * 0.62).toFixed(1)} ${(ex - a).toFixed(1)},${(ey + a * 0.62).toFixed(1)}`);
      }
    };
    // ---- çubuklar ----
    const cubukCiz = (U, T) => {
      const q = R.q, bU = q('.f24-bU'), bK = q('.f24-bK'), bT = q('.f24-bT'), kp = q('.f24-kap'), kt = q('.f24-kapt');
      if (R.G.dar) {
        const X = (v) => 120 + (clamp(v, 0, UMAX) / UMAX) * 218;
        bU.setAttribute('width', Math.max(0, X(Math.min(U, T)) - 120).toFixed(1));
        bK.setAttribute('x', X(T).toFixed(1)); bK.setAttribute('width', Math.max(0, X(U) - X(T)).toFixed(1));
        bT.setAttribute('width', Math.max(0, X(T) - 120).toFixed(1));
        kp.setAttribute('x1', X(T).toFixed(1)); kp.setAttribute('x2', X(T).toFixed(1));
        kt.setAttribute('x', (X(T) + 4).toFixed(1));
      } else {
        const Y = (v) => 176 - (clamp(v, 0, UMAX) / UMAX) * 106;
        bU.setAttribute('y', Y(Math.min(U, T)).toFixed(1)); bU.setAttribute('height', (176 - Y(Math.min(U, T))).toFixed(1));
        bK.setAttribute('y', Y(U).toFixed(1)); bK.setAttribute('height', Math.max(0, Y(T) - Y(U)).toFixed(1));
        bT.setAttribute('y', Y(T).toFixed(1)); bT.setAttribute('height', (176 - Y(T)).toFixed(1));
        kp.setAttribute('y1', Y(T).toFixed(1)); kp.setAttribute('y2', Y(T).toFixed(1));
        kt.setAttribute('y', (Y(T) + 4).toFixed(1));
        const tm = q('.f24-tasmat'), fark = Y(T) - Y(U);
        tm.setAttribute('y', ((Y(T) + Y(U)) / 2 + 4).toFixed(1)); tm.style.display = fark > 12 ? '' : 'none';
      }
    };
    const hasarCiz = () => {
      const h = Math.floor(hasar);
      if (h === R.sonH) return;
      R.sonH = h;
      R.q('.f24-bH').setAttribute('width', ((R.G.dar ? 178 : 156) * hasar / 100).toFixed(1));
      R.q('[data-v="Hv"]').textContent = String(h);
      o('H').textContent = String(h);
      R.svg.querySelectorAll('.f24-dhd-h').forEach((r) => { r.style.opacity = (hasar / 100).toFixed(3); });
      R.svg.querySelectorAll('.f24-dhd').forEach((g) => g.classList.toggle('on', hasar > 0));
    };
    const katki = (m) => [1, 3 * f, (rad ? 1.2 : 0) + (bleo ? 1.5 : 0)];
    const liste = (a) => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' ve ' + a[a.length - 1]);
    // ---- durum metinleri (kontrol değişince) ----
    const yaz = (ilk) => {
      const m = model(), q = R.q, k3 = katki(m);
      o('fi').textContent = `FiO₂ ${fmt(f, 2)} · inspire O₂ ≈ ${fmt(f * 101.3)} kPa`;
      o('U').textContent = fmt(m.U); o('T').textContent = fmt(m.T); o('K').textContent = fmt(m.K);
      const kv = R.svg.querySelectorAll('[data-kv]'), ekAd = rad && bleo ? 'ikisi de' : rad ? 'radyasyon' : bleo ? 'bleomisin + Fe' : '';
      if (R.G.dar) { kv[0].textContent = `Taban ${fmt(1)}`; kv[1].textContent = `O₂ ${fmt(k3[1])}`; kv[2].textContent = k3[2] ? `Ek +${fmt(k3[2])}` : 'Ek kapalı'; }
      else { kv[0].textContent = fmt(1); kv[1].textContent = `${fmt(k3[1])} (FiO₂ ${fmt(f, 2)})`; kv[2].textContent = k3[2] ? `+${fmt(k3[2])} · ${ekAd}` : 'kapalı'; }
      q('[data-k="2"]').classList.toggle('kapali', !k3[2]);
      SAV.forEach((d) => q(`.f24-suz[data-s="${d.k}"]`).classList.toggle('kapali', !acik[d.k]));
      const dm = q('[data-v="durum"]'); dm.textContent = DURUM[m.d]; dm.setAttribute('class', 'f24-durum ' + m.d);
      q('[data-v="Uv"]').textContent = fmt(m.U); q('[data-v="Tv"]').textContent = fmt(m.T);
      q('[data-v="yak"]').textContent = `${fmt(Math.min(m.U, m.T))} /sn`;
      q('[data-v="tas"]').textContent = `taşan ${fmt(m.K)} /sn`;
      q('[data-v="tas"]').classList.toggle('f24-kirmizi', m.K > 0);
      if (RM) { hasar = Math.min(100, m.K * 10); R.sonH = -1; R.dU = m.U; R.dT = m.T; R.dW = k3.slice(); durgunJeton(m); }
      if (R.dU === null) { R.dU = m.U; R.dT = m.T; R.dW = k3.slice(); }
      if (RM || ilk) { cubukCiz(R.dU, R.dT); R.dW.forEach((w, i) => okCiz(i, kalin(w))); }
      R.sonH = -1; hasarCiz();
      if (dokundu) {
        const kap = SAV.filter((d) => d.k !== 'vitc' && !acik[d.k]);
        let on = '';
        if (kap.length) { const ad = liste(kap.map((d) => d.ad)); on += `${ad.charAt(0).toUpperCase() + ad.slice(1)} kapalı: kapasite ${fmt(kap.reduce((s, d) => s + d.c, 0))} birim azaldı; glutatyon, katalaz ve SOD en önemli endojen sistemlerdir. `; }
        if (!acik.vitc) on += 'C vitamini kapalı: ekzojen antioksidanlar besinle alınır, kapasitenin küçük ama gerçek bir parçasıdır. ';
        let ana;
        if (m.d === 'denge') ana = `<b>Dengede.</b> ${on}Üretim ${fmt(m.U)}, temizleme kapasitesi ${fmt(m.T)} birim/sn: oluşan ROS savunma sistemleri tarafından temizleniyor, hedeflere ulaşan yok. [[K1 s. 102]]`;
        else if (m.d === 'sinir') ana = `<b>Sınırda.</b> ${on}Üretim ${fmt(m.U)}, temizleme kapasitesi ${fmt(m.T)}: kapasite az farkla aşıldı, saniyede ${fmt(m.K)} birim ROS hedeflere ulaşıyor.${f > 0.5 ? " Kitap, inspire O₂'nin 50 kPa'nın (1 atm'de FiO₂ %50) altında olmasını güvenli kabul eder; riski basınç kadar süre de belirler." : ''} [[K1 s. 102]]`;
        else ana = `<b>Savunma aşıldı.</b> ${on}Üretim ${fmt(m.U)}, kapasite ${fmt(m.T)}: saniyede ${fmt(m.K)} birim ROS hedeflere ulaşıyor ve hasar birikiyor. Oksidatif stres dönemlerinde endojen sistemlerin kapasitesi ROS tarafından aşılır ve hücre hasarı gelişir. [[K1 s. 102]]`;
        if (rad) ana += ' Hücreler iyonlaştırıcı radyasyona maruz kaldığında da ROS oluşur. [[K1 s. 102]]';
        if (bleo) ana += " Bleomisin–demir kompleksi O₂ ile tepkimeye girip DNA'yı parçalayan ROS üretir. [[K1 s. 103]]";
        cap.yaz(ana);
      }
    };
    const kalin = (c) => (c <= 0 ? 0 : clamp(1 + 7 * (c / 3), 1, 8));
    // ---- jetonlar ----
    const jetonYaz = (j, x, y, op, su, s = 1) => {
      j.g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})${s !== 1 ? ` scale(${s.toFixed(2)})` : ''}`);
      j.g.setAttribute('opacity', op.toFixed(2));
      j.g.setAttribute('class', su ? 'su' : '');
    };
    const durgunJeton = (m) => { // RM: akış yok, sabit bir dizi
      const G = R.G, [bx, by, bw] = G.boru;
      R.pool.forEach((j) => { j.on = false; j.g.setAttribute('opacity', '0'); });
      let n = 0;
      const koy = (x, y, su, s) => { const j = R.pool[n++]; if (j) jetonYaz(j, x, y, 1, su, s); };
      const ust = clamp(Math.round(m.U * 1.5), 1, 8);
      for (let k = 0; k < ust; k++) koy(bx + 18 + (k % 4) * ((bw - 36) / 3), by + 18 + Math.floor(k / 4) * 18, false);
      const [hx, hy] = R.havuz;
      if (m.T > 0) for (let k = 0; k < 3; k++) koy(hx - 16 + k * 16, hy, true, 0.75);
      const alt = m.K > 0 ? clamp(Math.round(m.K * 2), 1, 4) : 0;
      for (let k = 0; k < alt; k++) koy(bx + 20 + k * ((bw - 40) / 3), G.suz[3] + G.sh + 18, false);
    };
    const suzSec = (m) => { // ağırlıklı, sapmasız seçim
      let en = null;
      SAV.forEach((d) => { if (!acik[d.k]) return; R.kredi[d.k] = (R.kredi[d.k] || 0) + d.c / m.T; if (!en || R.kredi[d.k] > R.kredi[en]) en = d.k; });
      R.kredi[en] -= 1;
      return SAV.findIndex((d) => d.k === en);
    };
    const kare = (dt) => {
      if (!R) return;
      const m = model(), G = R.G, [bx, by, bw, bh] = G.boru, k = 1 - Math.exp(-dt / 0.13), k3 = katki(m);
      // görüntülenen değerler 400 ms'de yeni değere kayar
      R.dU = lerp(R.dU, m.U, k); R.dT = lerp(R.dT, m.T, k);
      cubukCiz(R.dU, R.dT);
      R.dW = R.dW.map((w, i) => lerp(w, k3[i], k));
      R.dW.forEach((w, i) => okCiz(i, kalin(w)));
      R.flas = R.flas.map((v) => Math.max(0, v - dt));
      R.svg.querySelectorAll('.f24-dhd-z').forEach((r, t) => { r.style.strokeWidth = R.flas[t] > 0 ? '3' : ''; });
      if (dur) return;
      if (m.K > 0) { hasar = Math.min(100, hasar + m.K * dt); hasarCiz(); }
      const v = G.dar ? 100 : 88, yAlt = by + bh - 9;
      // doğum: saniyede U jeton, boruda en çok 12
      R.acc += m.U * dt;
      const borudaki = R.pool.filter((j) => j.on && j.faz === 'boru').length;
      if (R.acc >= 1) {
        R.acc -= 1;
        const j = R.pool.find((q) => !q.on);
        if (j && borudaki < 12) {
          j.on = true; j.faz = 'boru'; j.t = 0; j.x = bx + 13 + Math.random() * (bw - 26); j.y = by + 10;
          R.yakAcc += m.U > 0 ? Math.min(1, m.T / m.U) : 0;
          if (R.yakAcc >= 1 - 1e-6 && m.T > 0) { R.yakAcc -= 1; j.suz = suzSec(m); j.ys = G.suz[j.suz] - 4; } else j.suz = -1;
        }
        R.acc = Math.min(R.acc, 1.5);
      }
      R.pool.forEach((j) => {
        if (!j.on) return;
        if (j.faz === 'boru') {
          j.y += v * dt;
          if (j.suz >= 0 && !acik[SAV[j.suz].k]) j.suz = -1; // süzgeç kapatıldı: geçer
          if (j.suz >= 0 && j.y >= j.ys) { j.faz = 'temiz'; j.t = 0; j.x0 = j.x; j.y0 = j.ys; }
          else if (j.y >= yAlt) { j.faz = 'cik'; j.t = 0; j.x0 = j.x; j.y0 = yAlt; j.hed = R.hedSira++ % 4; }
          jetonYaz(j, j.x, j.y, 1, false);
        } else if (j.faz === 'temiz') {
          j.t += dt; const q = clamp(j.t / 0.75, 0, 1), e = easeOut(q);
          const [hx, hy] = R.havuz;
          jetonYaz(j, lerp(j.x0, hx, e), lerp(j.y0, hy, q * q), q < 0.75 ? 1 : (1 - q) * 4, true, lerp(1, 0.7, q));
          if (q >= 1) { j.on = false; j.g.setAttribute('opacity', '0'); }
        } else if (j.faz === 'cik') {
          j.t += dt; const q = clamp(j.t / 0.9, 0, 1), [tx, ty, tw, th] = G.hed(j.hed), hx2 = tx + tw / 2, hy2 = ty + th / 2;
          let x, y;
          if (q < 0.55) { const e = q / 0.55; x = lerp(j.x0, hx2, easeOut(e)); y = lerp(j.y0, G.kanal, e); }
          else { const e = (q - 0.55) / 0.45; x = hx2; y = lerp(G.kanal, hy2, e * e); }
          jetonYaz(j, x, y, q < 0.85 ? 1 : (1 - q) / 0.15, false);
          if (q >= 1) { j.on = false; j.g.setAttribute('opacity', '0'); R.flas[j.hed] = 0.3; }
        }
      });
    };
    // ---- olaylar ----
    el.addEventListener('input', (e) => { const r = e.target.closest('[data-r="f"]'); if (!r) return; f = +r.value; dokundu = true; yaz(); });
    el.addEventListener('change', (e) => { const c = e.target.closest('[data-s]'); if (!c) return; acik[c.dataset.s] = c.checked; dokundu = true; yaz(); });
    el.addEventListener('click', (e) => {
      const ek = e.target.closest('[data-ek]');
      if (ek) { if (ek.dataset.ek === 'rad') rad = !rad; else bleo = !bleo; ek.setAttribute('aria-pressed', String(ek.dataset.ek === 'rad' ? rad : bleo)); dokundu = true; yaz(); return; }
      const b = e.target.closest('[data-a]'); if (!b) return;
      if (b.dataset.a === 'dur') { dur = !dur; b.textContent = dur ? 'Sürdür' : 'Duraklat'; b.setAttribute('aria-pressed', String(dur)); }
      else if (b.dataset.a === 'sifir') { hasar = 0; R.pool.forEach((j) => { j.on = false; j.g.setAttribute('opacity', '0'); }); R.acc = 0; R.sonH = -1; hasarCiz(); if (RM) durgunJeton(model()); }
    });
    kur();
    const durT = RM ? () => {} : ticker(el, kare);
    const boyutBirak = boyutIzle(el, (d) => { dar = d; kur(); });
    return () => { durT(); boyutBirak(); };
  };

  /* =====================================================================
     3 · f24_doz — İnspire O₂ basıncı: FiO₂, ortam basıncı ve süre (K1 s. 77, 102–103, 434)
     İnspire O₂ = FiO₂ × ortam basıncı (su buharı düşülmez); deniz seviyesi 101,3 kPa; su altında +100 kPa / 10 m.
     ===================================================================== */
  VIZ.f24_doz = (el) => {
    const PB = 101.3, ESIK = 50, HIP = 101.3, YMAX = 170, SMAX = 72;
    const ORN = [
      { k: 'oda', ad: 'Oda havası', yer: 'deniz', fio2: 0.21, sure: 6, cap: '<b>Oda havası.</b> Deniz seviyesinde FiO₂ 0,21: inspire O₂ 21,3 kPa, güvenli sınırın çok altında. [[K1 s. 102]]' },
      { k: 'yb', ad: 'YB: FiO₂ 0,5', yer: 'deniz', fio2: 0.5, sure: 24, cap: '<b>Yoğun bakım sınırı.</b> FiO₂ 0,5 atmosfer basıncında yaklaşık 50 kPa eder: kitabın güvenli saydığı üst değer. Daha yükseği gerekiyorsa süre en aza indirilir; hipoksemik hastada O₂ asla esirgenmez. [[K1 s. 102–103]]' },
      { k: 'o24', ad: '%100 O₂ · 24 saat', yer: 'deniz', fio2: 1, sure: 24, cap: '<b>%100 O₂, 24 saat.</b> Sağlıklı gönüllülerde bu maruziyetten sonra akciğer işlevinde azalma gösterilmiştir. [[K1 s. 103]]' },
      { k: 'o48', ad: '%100 O₂ · 48 saat', yer: 'deniz', fio2: 1, sure: 48, cap: '<b>%100 O₂, 48 saat.</b> Bu sürede erken ARDS bulguları gelişebilir. Toksisite için gereken süre ve FiO₂ hastadan hastaya belirgin biçimde değişir. [[K1 s. 103]]' },
      { k: 'dal', ad: 'Dalış 30 m, hava', yer: 'dalis', kar: 'hava', der: 30, sure: 1, cap: '<b>Dalış, 30 m, basınçlı hava.</b> Ortam basıncı 101,3 + 10 × 30 = 401,3 kPa; FiO₂ aynı kalsa bile inspire O₂ 84,3 kPa\'ya çıkar. Dalgıçlar azami O₂ maruziyet sürelerini dalışın derinliğine ve su altında geçirilen toplam süreye göre hesaplar. [[K1 s. 103, 434]]' },
    ];
    const cap = aciklama(el);
    kok(el, 'f24-dz');
    let yerS = 'deniz', fio2 = 0.21, kar = 'hava', der = 30, sure = 6, orn = '', dokundu = false, dar = darMi(el), tw = null;
    const Fi = () => (yerS === 'deniz' ? fio2 : kar === 'hava' ? 0.21 : 0.32);
    const ortam = () => (yerS === 'deniz' ? PB : PB + 10 * der);
    const P = () => Fi() * ortam();
    const esikDer = () => (ESIK / Fi() - PB) / 10;
    const sinif = (p) => (p <= ESIK ? 'ok' : p <= HIP + 0.05 ? 'warn' : 'crit');
    el.innerHTML = `<div class="f24-ust">${segHtml('Yer', 'yer', [['deniz', 'Deniz seviyesi'], ['dalis', 'Dalış']], 'deniz')}</div>
      <div class="f24-dz-ic">
        <div class="f24-dz-sahne"></div>
        <div class="f24-yan">
          <div class="f24-hesap" aria-live="off">
            <div><span data-h="o1">ortam basıncı</span><b data-h="o2"></b></div>
            <div><span>× FiO₂</span><b data-h="f"></b></div>
            <div class="son"><span>= inspire O₂</span><b data-h="p"></b></div>
            <div class="ek" data-gor="dalis"><span>50 kPa'nın aşıldığı derinlik</span><b data-h="e"></b></div>
          </div>
          <label class="f24-rng" data-gor="deniz"><span>FiO₂ <b data-o="fio2"></b></span><input type="range" min="0.21" max="1" step="0.01" value="0.21" data-r="fio2" aria-label="FiO₂"></label>
          <label class="f24-rng" data-gor="dalis"><span>Derinlik <b data-o="der"></b></span><input type="range" min="0" max="40" step="1" value="30" data-r="der" aria-label="Derinlik (m)"></label>
          <div class="f24-grp" data-gor="dalis"><span class="f24-grp-ad">Karışım</span>${segHtml('Karışım', 'kar', [['hava', 'Hava (0,21)'], ['nitroks', 'Nitroks %32']], 'hava')}</div>
          <label class="f24-rng"><span>Maruziyet süresi <b data-o="sure"></b></span><input type="range" min="0" max="72" step="1" value="6" data-r="sure" aria-label="Maruziyet süresi (saat)"></label>
          <ul class="facts f24-cip"><li>Ortam <b data-o="ort"></b></li><li>FiO₂ <b data-o="fi"></b></li><li>İnspire O₂ <b data-o="pi"></b></li><li>Süre <b data-o="su"></b></li></ul>
        </div>
      </div>
      <div class="f24-grp f24-dz-orn"><span class="f24-grp-ad">Hazır örnekler</span>${segHtml('Hazır örnekler', 'orn', ORN.map((x) => [x.k, x.ad]), '')}</div>`;
    const $ = (s) => el.querySelector(s), o = (k) => el.querySelector(`[data-o="${k}"]`), h = (k) => el.querySelector(`[data-h="${k}"]`);
    const sahne = $('.f24-dz-sahne'), inp = { fio2: $('[data-r="fio2"]'), der: $('[data-r="der"]'), sure: $('[data-r="sure"]') };
    let R = null;
    const geo = () => {
      if (!dar) return { W: 720, H: 400, X0: 130, X1: 676, Y0: 352, Y1: 48, xt: [0, 12, 24, 36, 48, 60, 72] };
      const top = yerS === 'dalis' ? 86 : 34;
      return { W: 360, H: top + 352, X0: 50, X1: 344, Y0: top + 310, Y1: top, xt: [0, 24, 48, 72] };
    };
    const kur = () => {
      const G = geo(), { X0, X1, Y0, Y1 } = G;
      const X = (t) => X0 + (clamp(t, 0, SMAX) / SMAX) * (X1 - X0), Y = (p) => Y0 - (clamp(p, 0, YMAX) / YMAX) * (Y0 - Y1);
      const Yh = Y(HIP), s = [];
      s.push(`<defs><linearGradient id="f24-risk" x1="0" y1="1" x2="1" y2="0"><stop offset="0" style="stop-color:var(--crit);stop-opacity:.08"/><stop offset="1" style="stop-color:var(--crit);stop-opacity:.3"/></linearGradient></defs>`);
      s.push(`<rect fill="url(#f24-risk)" x="${X0}" y="${Y1}" width="${X1 - X0}" height="${(Y(ESIK) - Y1).toFixed(1)}"/>`);
      s.push(`<rect class="f24-guv" x="${X0}" y="${Y(ESIK).toFixed(1)}" width="${X1 - X0}" height="${(Y0 - Y(ESIK)).toFixed(1)}"/>`);
      [0, 50, 100, 150].forEach((p) => s.push(`<line class="f24-grid" x1="${X0}" x2="${X1}" y1="${Y(p).toFixed(1)}" y2="${Y(p).toFixed(1)}"/><text class="f24-t" x="${X0 - 8}" y="${(Y(p) + 4).toFixed(1)}" text-anchor="end">${p}</text>`));
      G.xt.forEach((t) => s.push(`<line class="f24-tik" x1="${X(t).toFixed(1)}" x2="${X(t).toFixed(1)}" y1="${Y0}" y2="${Y0 + 5}"/><text class="f24-t" x="${X(t).toFixed(1)}" y="${Y0 + 18}" text-anchor="middle">${t}</text>`));
      s.push(`<line class="f24-ax" x1="${X0}" x2="${X1}" y1="${Y0}" y2="${Y0}"/><line class="f24-ax" x1="${X0}" x2="${X0}" y1="${Y1}" y2="${Y0}"/>`);
      s.push(`<text class="f24-t2" x="${X1}" y="${Y0 + 36}" text-anchor="end">Maruziyet süresi (saat)</text>`);
      s.push(`<text class="f24-t2" x="${dar ? 8 : X0}" y="${dar ? Y1 - 12 : 30}">İnspire O₂ basıncı (kPa)</text>`);
      s.push(`<line class="f24-guvc" x1="${X0}" x2="${X1}" y1="${Y(ESIK).toFixed(1)}" y2="${Y(ESIK).toFixed(1)}"/>`);
      s.push(dar ? `<text class="f24-guvt" x="${X0 + 6}" y="${(Y(ESIK) + 17).toFixed(1)}">güvenli sınır 50 kPa</text>` : `<text class="f24-guvt" x="${X1 - 4}" y="${(Y(ESIK) - 7).toFixed(1)}" text-anchor="end">güvenli sınır 50 kPa</text>`);
      s.push(`<text class="f24-riskt" x="${X1 - 6}" y="${Y1 + 16}" text-anchor="end">risk ↑</text>`);
      s.push(`<line class="f24-hipc" x1="${X0}" x2="${X1}" y1="${Yh.toFixed(1)}" y2="${Yh.toFixed(1)}"/>`);
      if (dar) s.push(`<text class="f24-hipt" x="${X0 + 5}" y="${(Yh - 11).toFixed(1)}">%100 O₂, deniz seviyesi · 101,3</text><text class="f24-hipt" x="${X1 - 4}" y="${(Yh - 7).toFixed(1)}" text-anchor="end">hiperbarik ↑</text>`);
      else s.push(`<text class="f24-hipt b" x="${X0 + 6}" y="${(Yh - 7).toFixed(1)}">hiperbarik bölge ↑</text><text class="f24-hipt" x="${X0 + 6}" y="${(Yh + 19).toFixed(1)}">deniz seviyesinde %100 O₂ · 101,3 kPa</text>`);
      if (yerS === 'deniz') {
        [[24, 'f24-im24', 'akciğer', 'işlevinde azalma'], [48, 'f24-im48', 'erken ARDS', 'bulguları']].forEach(([t, c, a, b]) => {
          s.push(`<circle class="${c}" cx="${X(t).toFixed(1)}" cy="${Yh.toFixed(1)}" r="6"/>`);
          if (dar) s.push(`<text class="f24-imt" x="${X(t).toFixed(1)}" y="${(Yh + 19).toFixed(1)}">${t} sa</text>`);
          else s.push(`<text class="f24-imt" x="${X(t).toFixed(1)}" y="${(Yh - 36).toFixed(1)}">${t} sa: ${a}</text><text class="f24-imt" x="${X(t).toFixed(1)}" y="${(Yh - 23).toFixed(1)}">${b}</text>`);
        });
      }
      // dalış derinlik ölçeği
      let D = null;
      if (yerS === 'dalis') {
        if (dar) {
          const xd = (d) => 20 + (d / 40) * 320;
          D = { xd, yat: true };
          s.push(`<rect class="f24-su" x="20" y="26" width="320" height="14" rx="3"/><rect class="f24-kusak" y="26" height="14" data-d="kusak"/><line class="f24-kusakc" y1="24" y2="42" data-d="kc"/>
            <line class="f24-yuzey" x1="20" x2="20" y1="20" y2="46"/>${[10, 20, 30].map((d) => `<line class="f24-tik" x1="${xd(d)}" x2="${xd(d)}" y1="26" y2="40"/>`).join('')}
            <text class="f24-t" x="20" y="57" data-d="t0">0 m</text><text class="f24-t" x="340" y="57" text-anchor="end" data-d="t40">40 m</text>
            <text class="f24-kusakt" y="57" data-d="kt"></text>
            <g data-d="dalgic"><path class="f24-dalgic" d="M-6 6 L6 6 L0 -3 Z"/><circle class="f24-dalgic" cy="-7" r="3.6"/></g><text class="f24-dlb" y="14" text-anchor="middle" data-d="dl"></text>`);
        } else {
          const yd = (d) => Y1 + (d / 40) * (Y0 - Y1);
          D = { yd, yat: false };
          s.push(`<text class="f24-t2" x="12" y="30">derinlik</text><rect class="f24-su" x="18" y="${Y1}" width="24" height="${Y0 - Y1}" rx="3"/><rect class="f24-kusak" x="18" width="24" data-d="kusak"/><line class="f24-kusakc" x1="14" x2="46" data-d="kc"/>
            <line class="f24-yuzey" x1="12" x2="48" y1="${Y1}" y2="${Y1}"/>${[10, 20, 30].map((d) => `<line class="f24-tik" x1="18" x2="42" y1="${yd(d)}" y2="${yd(d)}"/>`).join('')}
            <text class="f24-t" x="50" y="${Y1 + 4}" data-d="t0">0 m</text><text class="f24-t" x="50" y="${Y0 + 4}" data-d="t40">40 m</text><text class="f24-t" x="50" y="${yd(10) + 4}" data-d="t10">+100 kPa</text>
            <text class="f24-kusakt" x="50" data-d="kt"></text>
            <g data-d="dalgic"><path class="f24-dalgic" d="M-6 6 L6 6 L0 -3 Z"/><circle class="f24-dalgic" cy="-7" r="3.6"/></g><text class="f24-dlb" x="50" data-d="dl"></text>`);
        }
      }
      s.push('<polyline class="f24-iz" points=""/>');
      s.push(`<line class="f24-kil" data-k="v"/><line class="f24-kil" data-k="y"/>`);
      s.push(`<circle class="f24-nok" r="${dar ? 8 : 9}"/>`);
      if (!dar) s.push('<g class="f24-etk"><rect rx="6" height="22"/><text></text></g>');
      sahne.innerHTML = `<svg class="f24-svg ${dar ? 'f24-dar' : 'f24-gen'}" viewBox="0 0 ${G.W} ${G.H}" role="img">${s.join('')}</svg>`;
      const svg = sahne.querySelector('svg');
      // nokta etiketinin kaçınacağı yazı alanları (geniş yerleşim)
      const engel = dar ? [] : [[X0, Yh - 22, 125, 20], [X0, Yh + 4, 250, 20], [X1 - 150, Y(ESIK) - 22, 150, 18], [X1 - 60, Y1, 60, 22]];
      if (!dar && yerS === 'deniz') [24, 48].forEach((t) => engel.push([X(t) - 62, Yh - 52, 124, 46]));
      R = { G, X, Y, D, svg, engel, q: (x) => svg.querySelector(x) };
      el.querySelectorAll('[data-gor]').forEach((n) => { n.hidden = n.dataset.gor !== yerS; });
      basSec(el, 'yer', yerS);
    };
    const izNok = [];
    const guncelle = (izle) => {
      const { G, X, Y, D, q, svg } = R, p = P(), F = Fi(), on = ortam(), c = sinif(p), st = Math.round(sure);
      const px = X(sure), py = Y(p);
      const nok = q('.f24-nok'); nok.setAttribute('cx', px.toFixed(1)); nok.setAttribute('cy', py.toFixed(1)); nok.setAttribute('class', 'f24-nok ' + c);
      const kv = q('[data-k="v"]'), ky = q('[data-k="y"]');
      kv.setAttribute('x1', px.toFixed(1)); kv.setAttribute('x2', px.toFixed(1)); kv.setAttribute('y1', py.toFixed(1)); kv.setAttribute('y2', G.Y0);
      ky.setAttribute('x1', G.X0); ky.setAttribute('x2', px.toFixed(1)); ky.setAttribute('y1', py.toFixed(1)); ky.setAttribute('y2', py.toFixed(1));
      const etk = q('.f24-etk');
      if (etk) {
        const tx = `${fmt(p)} kPa · ${st} saat`, w = tx.length * 7.3 + 14, hh = 22;
        // dört aday konum: grafiğin içinde kalan ve etiketlerle çakışmayan ilki
        const icte = ([x, y]) => x >= G.X0 + 2 && x + w <= G.X1 + 30 && y >= G.Y1 - 4 && y + hh <= G.Y0 - 4;
        const bos = ([x, y]) => !R.engel.some(([a, b, c, d]) => x < a + c && x + w > a && y < b + d && y + hh > b);
        const aday = [[px + 14, py + 14], [px + 14, py - 36], [px - 14 - w, py + 14], [px - 14 - w, py - 36]].filter(icte);
        const [ex, ey] = aday.find(bos) || aday[0] || [px + 14, py + 14];
        etk.querySelector('rect').setAttribute('x', ex.toFixed(1)); etk.querySelector('rect').setAttribute('y', ey.toFixed(1)); etk.querySelector('rect').setAttribute('width', w.toFixed(1));
        const t = etk.querySelector('text'); t.setAttribute('x', (ex + 7).toFixed(1)); t.setAttribute('y', (ey + 15).toFixed(1)); t.textContent = tx;
      }
      if (izle && !RM) { izNok.push(`${px.toFixed(1)},${py.toFixed(1)}`); const iz = q('.f24-iz'); iz.classList.remove('sil'); iz.setAttribute('points', izNok.join(' ')); }
      if (D) {
        const dz = esikDer(), lbl = `${fmt(dz)} m`, dd = q('[data-d="dalgic"]'), dl = q('[data-d="dl"]'), ku = q('[data-d="kusak"]'), kc = q('[data-d="kc"]'), kt = q('[data-d="kt"]');
        const yak = (a, b) => Math.abs(a - b) < 2.6;
        if (D.yat) {
          const x = D.xd(der), xz = D.xd(dz);
          dd.setAttribute('transform', `translate(${x.toFixed(1)} 33)`); dl.setAttribute('x', clamp(x, 16, 344).toFixed(1)); dl.textContent = `${der} m`;
          ku.setAttribute('x', xz.toFixed(1)); ku.setAttribute('width', (340 - xz).toFixed(1));
          kc.setAttribute('x1', xz.toFixed(1)); kc.setAttribute('x2', xz.toFixed(1));
          kt.setAttribute('x', (xz + 3).toFixed(1)); kt.textContent = lbl;
          q('[data-d="t0"]').style.display = xz < 60 ? 'none' : '';
        } else {
          const y = D.yd(der), yz = D.yd(dz);
          dd.setAttribute('transform', `translate(30 ${y.toFixed(1)})`); dl.setAttribute('y', (y + 4).toFixed(1)); dl.textContent = `${der} m`;
          ku.setAttribute('y', yz.toFixed(1)); ku.setAttribute('height', (G.Y0 - yz).toFixed(1));
          kc.setAttribute('y1', yz.toFixed(1)); kc.setAttribute('y2', yz.toFixed(1));
          kt.setAttribute('y', (yz + 4).toFixed(1)); kt.textContent = lbl; kt.style.display = yak(der, dz) ? 'none' : '';
          q('[data-d="t0"]').style.display = der < 3 || dz < 3 ? 'none' : '';
          q('[data-d="t40"]').style.display = der > 37 ? 'none' : '';
          q('[data-d="t10"]').style.display = yak(der, 10) || yak(dz, 10) ? 'none' : '';
        }
      }
      svg.setAttribute('aria-label', `İnspire O₂ basıncı ${fmt(p)} kPa, maruziyet ${st} saat; güvenli sınır 50 kPa${p <= ESIK ? ' altında' : ' üstünde'}.`);
      // denetimler ve okumalar
      inp.fio2.value = String(fio2); inp.der.value = String(der); inp.sure.value = String(st);
      o('fio2').textContent = fmt(fio2, 2); o('der').textContent = `${der} m`; o('sure').textContent = `${st} saat`;
      o('ort').textContent = `${fmt(on)} kPa`; o('fi').textContent = fmt(F, 2); o('pi').textContent = `${fmt(p)} kPa`; o('su').textContent = `${st} saat`;
      if (yerS === 'deniz') { h('o1').textContent = 'ortam basıncı'; h('o2').textContent = `${fmt(on)} kPa`; }
      else { h('o1').textContent = `101,3 + 10 × ${der} m`; h('o2').textContent = `${fmt(on)} kPa`; h('e').textContent = `${fmt(esikDer())} m`; }
      h('f').textContent = fmt(F, 2); h('p').textContent = `${fmt(p)} kPa`;
      $('.f24-hesap .son').setAttribute('data-c', c);
      if (dokundu) cap.yaz(metin(p, F, on, st));
    };
    const metin = (p, F, on, st) => {
      if (orn) return ORN.find((x) => x.k === orn).cap;
      const pf = fmt(p);
      let c;
      if (p <= ESIK) c = `<b>Güvenli aralıkta.</b> FiO₂ ${fmt(F, 2)} × ${fmt(on)} kPa = <b>${pf} kPa</b>. İnspire O₂'nin 50 kPa'nın altında olması (atmosfer basıncında FiO₂ %50) güvenli kabul edilir. [[K1 s. 102]]`;
      else if (p < 51) c = `<b>Sınırda.</b> FiO₂ ${fmt(F, 2)} × ${fmt(on)} kPa = <b>${pf} kPa</b>: kitabın güvenli saydığı üst değer (≈ 50 kPa, atmosfer basıncında FiO₂ %50). Daha yüksek FiO₂ gerekiyorsa maruziyet süresi en aza indirilir. [[K1 s. 102–103]]`;
      else if (p <= HIP + 0.05) {
        c = yerS === 'dalis'
          ? `<b>Sınırın üstünde.</b> ${der} m'de ortam basıncı ${fmt(on)} kPa; FiO₂ ${fmt(F, 2)} ile inspire O₂ ${pf} kPa. Risk basınç yükseldikçe ve süre (${st} saat) uzadıkça artar; dalgıçlar azami O₂ maruziyet sürelerini dalışın derinliğine ve su altında geçirilen toplam süreye göre hesaplar. [[K1 s. 102–103]]`
          : `<b>Sınırın üstünde.</b> İnspire O₂ ${pf} kPa. Risk, inspire O₂ parsiyel basıncı yükseldikçe ve maruziyet süresi (${st} saat) uzadıkça artar. Yoğun bakım kılavuzlarının çoğu FiO₂'yi mümkün olduğunda %50'nin altında tutmayı, daha yüksek FiO₂ gerekiyorsa süreyi kısaltmayı önerir. [[K1 s. 102–103]]`;
      } else c = `<b>Hiperbarik bölge.</b> İnspire O₂ ${pf} kPa: deniz seviyesinde %100 O₂'nin verdiği basıncın da üstünde. MSS toksisitesi (Paul Bert etkisi) hiperbarik O₂ solunurken görülür; su altında bilinç kaybının sonuçları ağırdır. [[K1 s. 102–103]]`;
      if (yerS === 'dalis' && kar === 'nitroks') c += ` Oksijence zenginleştirilmiş karışımda aynı derinlik daha yüksek inspire O₂ basıncı verir: ${pf} kPa. (Dalış pratiğindeki sınır bileşenin altındaki notta.)`;
      return c;
    };
    const izBitir = () => { izNok.length = 0; const iz = R && R.q('.f24-iz'); if (iz) iz.classList.add('sil'); };
    const ornekSec = (k) => {
      const x = ORN.find((q) => q.k === k); if (!x) return;
      if (tw) tw();
      orn = k; basSec(el, 'orn', k);
      if (x.yer !== yerS) { yerS = x.yer; kur(); }
      if (x.kar) { kar = x.kar; basSec(el, 'kar', kar); }
      const b = { fio2, der, sure }, hd = { fio2: x.fio2 !== undefined ? x.fio2 : fio2, der: x.der !== undefined ? x.der : der, sure: x.sure };
      izNok.length = 0;
      tw = gecis(500, (e) => {
        fio2 = Math.round(lerp(b.fio2, hd.fio2, e) * 100) / 100; der = Math.round(lerp(b.der, hd.der, e)); sure = lerp(b.sure, hd.sure, e);
        guncelle(true);
      }, () => { fio2 = hd.fio2; der = hd.der; sure = hd.sure; tw = null; guncelle(false); setTimeout(izBitir, 30); });
    };
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      if (tw) { tw(); tw = null; }
      dokundu = true; orn = ''; basSec(el, 'orn', '');
      if (r.dataset.r === 'fio2') fio2 = +r.value; else if (r.dataset.r === 'der') der = +r.value; else sure = +r.value;
      guncelle(false);
    });
    el.addEventListener('click', (e) => {
      const y = e.target.closest('[data-yer]');
      if (y) { if (tw) { tw(); tw = null; } dokundu = true; orn = ''; basSec(el, 'orn', ''); if (y.dataset.yer !== yerS) { yerS = y.dataset.yer; kur(); } guncelle(false); return; }
      const k = e.target.closest('[data-kar]');
      if (k) { if (tw) { tw(); tw = null; } dokundu = true; orn = ''; basSec(el, 'orn', ''); kar = k.dataset.kar; basSec(el, 'kar', kar); guncelle(false); return; }
      const ob = e.target.closest('[data-orn]');
      if (ob) { dokundu = true; ornekSec(ob.dataset.orn); }
    });
    kur(); guncelle(false);
    const boyutBirak = boyutIzle(el, (d) => { dar = d; kur(); guncelle(false); });
    return () => { if (tw) tw(); boyutBirak(); };
  };

  /* =====================================================================
     4 · f24_bleomisin — Bleomisin, demir ve O₂: adım adım (K1 s. 103)
     ===================================================================== */
  VIZ.f24_bleomisin = (el) => {
    const BAS = ['Bleomisin', 'Demiri şelatlar', 'Kompleks O₂ ile tepkimeye girer', "ROS DNA'yı parçalar", 'Pulmoner fibrozis', 'Pratik kural'];
    const CAP = [
      '<b>1 · Bleomisin.</b> Hodgkin lenfoması ve testis karsinomunun tedavisinde kullanılan bir kemoterapi ilacıdır. En ciddi yan etkisi pulmoner fibrozistir. [[K1 s. 103]]',
      '<b>2 · Demiri şelatlar.</b> Bleomisinin etki biçimi demiri şelatlamaktır: bleomisin–demir kompleksi oluşur. [[K1 s. 103]]',
      '<b>3 · Kompleks O₂ ile tepkimeye girer.</b> Bleomisin–demir kompleksi O₂ ile tepkimeye girer ve reaktif oksijen türleri oluşur: süperoksit ve hidroksil radikali. (Kitapta "hidroksit" yazar; sayfadaki Atlas notuna bakın.) [[K1 s. 103]]',
      "<b>4 · ROS DNA'yı parçalar.</b> Oluşan ROS DNA'yı keser (cleave). [[K1 s. 103]]",
      "<b>5 · Pulmoner fibrozis.</b> Fibrozis genellikle tedavinin ilk 6 ayında ortaya çıkar. Anestezistleri ilgilendiren nokta: bleomisin almış ve sonradan ek O₂ gereken hastalarda (pnömoni, genel anestezi) hızla gelişen, yaşamı tehdit eden fibrozis riski artmış görünür. O₂ verilmesinin, koruyucu mekanizmaları aşan fazla ROS'a yol açması olasıdır; bağlantı tartışmalıdır ve mekanizma tam çözülmemiştir. [[K1 s. 103]]",
    ];
    const satCap = (s) => (s >= 88 && s <= 92
      ? `<b>6 · Pratik kural.</b> Bleomisinle tedavi edilmiş hastalar uyarı kartı taşır: mümkünse O₂ verilmez, kesinlikle gerekliyse SaO₂ %${s} gibi %88–92 aralığına titre edilir. [[K1 s. 103]]`
      : s < 88 ? `<b>6 · Pratik kural.</b> SaO₂ %${s}: hedefin altında. Hedef aralık %88–92'dir; O₂ gerekliyse bu aralığa titre edin. [[K1 s. 103]]`
        : `<b>6 · Pratik kural.</b> SaO₂ %${s}: hedefin üstünde, yani gereğinden fazla O₂ veriliyor. Bleomisin almış hastada hedef %88–92'dir; mümkünse O₂'den kaçınılır. [[K1 s. 103]]`);
    const VURGU = { 3: [0, 1, 2], 4: [2, 3], 5: [1] };
    const cap = aciklama(el);
    kok(el, 'f24-bl');
    let adim = 1, sat = 90, dar = darMi(el), oyn = 0, dokundu = false;
    el.innerHTML = `<div class="f24-ust"><div class="btn-row f24-btns"><button type="button" class="btn ghost" data-a="geri">◀ Geri</button><button type="button" class="btn" data-a="ileri">İleri ▶</button><button type="button" class="btn ghost" data-a="bas">Baştan</button>${RM ? '' : '<button type="button" class="btn ghost" data-a="oynat" aria-pressed="false">Oynat</button>'}<span class="f24-adim"></span></div></div>
      <div class="f24-sahne"></div>
      <p class="f24-form" aria-hidden="true"><span data-f="0">bleomisin–Fe</span> <span data-f="1">+ O₂</span> <span data-f="2">→ ROS (O₂•⁻, OH•)</span> <span data-f="3">→ DNA kırığı</span></p>
      <label class="f24-rng f24-satk"><span>Hedef SaO₂ <b data-o="sat"></b></span><input type="range" min="80" max="100" step="1" value="90" data-r="sat" aria-label="SaO₂ (%)"></label>`;
    const $ = (s) => el.querySelector(s);
    const sahne = $('.f24-sahne'), oynB = $('[data-a="oynat"]');
    let svg = null;

    // --- ortak parçalar ---
    const kompleks = (ad = true) => `<rect class="f24-kutu" x="-46" y="-44" width="92" height="84" rx="11"/>${ad ? '<text class="f24-t" y="-27" text-anchor="middle">bleomisin</text>' : ''}${yer(0, 8, METAL('Fe', 15))}<circle class="f24-sel" cy="8" r="25"/>`;
    const yildiz = (x, y, r = 9) => `<polygon class="f24-kiv" points="${Array.from({ length: 8 }, (_, k) => { const a = (Math.PI / 4) * k, rr = k % 2 ? r * 0.38 : r; return `${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`; }).join(' ')}"/>`;
    const dna = (x0, x1, yc, A, kirik, d0) => {
      const P = (x1 - x0) / 2.5, yol = (ters) => { const p = []; for (let x = x0; x <= x1 + 0.1; x += 3) p.push(`${x.toFixed(1)} ${(yc + (ters ? -1 : 1) * A * Math.sin((2 * Math.PI * (x - x0)) / P)).toFixed(1)}`); return 'M' + p.join(' L'); };
      let s = `<path class="f24-dna" d="${yol(false)}"/><path class="f24-dna b" d="${yol(true)}"/>`;
      for (let k = 0; k < 5; k++) {
        const x = x0 + P / 4 + (k * P) / 2, ya = yc - A + 2, yb = yc + A - 2;
        if (kirik.includes(k)) {
          s += `<line class="f24-bsm f24-kir" style="transform-origin:${x.toFixed(1)}px ${ya}px;--d:${d0}ms;--r:-18deg" x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${ya}" y2="${yc - 3}"/>`
            + `<line class="f24-bsm f24-kir" style="transform-origin:${x.toFixed(1)}px ${yb}px;--d:${d0}ms;--r:-18deg" x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${yc + 3}" y2="${yb}"/>`
            + anim('f24-pop', `--d:${d0}ms;transform-origin:${x.toFixed(1)}px ${yc}px`, yildiz(x, yc));
        } else s += `<line class="f24-bsm" x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${ya}" y2="${yb}"/>`;
      }
      return { s, x: (k) => x0 + P / 4 + (k * P) / 2 };
    };
    // akciğer şeması (yerel koordinat: merkez x 0, trakea üstü y 0); gerçekçi anatomi değil
    const SOLL = 'M -10 38 C -28 26, -60 40, -70 80 C -80 120, -82 170, -74 200 C -68 218, -42 220, -24 210 C -12 204, -8 190, -8 170 L -8 50 Z';
    const ayna = (d) => d.replace(/(-?\d+(\.\d+)?) (-?\d+(\.\d+)?)/g, (m, a, _, b) => `${-a} ${b}`);
    const FIB = [[-54, 92, -42, 82], [-62, 142, -46, 134], [-42, 184, -30, 176], [54, 92, 42, 82], [62, 142, 46, 134], [42, 184, 30, 176]];
    const akciger = (cx, cy, s) => yer(cx, cy, `<path class="f24-trak" d="M0 0 L0 38 M0 38 L-14 52 M0 38 L14 52"/><path class="f24-akc" d="${SOLL}"/><path class="f24-akc" d="${ayna(SOLL)}"/>`
      + FIB.map(([a, b, c, d], k) => anim('f24-gir', `--d:${350 + k * 200}ms`, `<line class="f24-fib" x1="${a}" y1="${b}" x2="${c}" y2="${d}"/>`)).join(''), s);
    const tag = (x, y, w, t, c = '') => `<g class="f24-tag ${c}"><rect x="${(x - w / 2).toFixed(1)}" y="${y}" width="${w}" height="30" rx="8"/><text x="${x}" y="${y + 19.5}" text-anchor="middle">${t}</text></g>`;

    const sahneGenis = () => [
      // 1
      anim('f24-gir', '--d:0ms', `<rect class="f24-kapak" x="328" y="102" width="64" height="16" rx="4"/><rect class="f24-kutu" x="300" y="116" width="120" height="104" rx="12"/><text class="f24-lb" x="360" y="166" text-anchor="middle" style="font-size:15px">Bleomisin</text><text class="f24-t" x="360" y="186" text-anchor="middle">kemoterapi ilacı</text>`)
        + `<line class="f24-ince" x1="420" y1="160" x2="452" y2="143"/><line class="f24-ince" x1="420" y1="176" x2="452" y2="191"/><text class="f24-t" x="456" y="120">endikasyon</text>`
        + anim('f24-kay', '--dx:24px;--o0:0;--d:250ms', tag(532, 128, 156, 'Hodgkin lenfoması', 'mavi'))
        + anim('f24-kay', '--dx:24px;--o0:0;--d:400ms', tag(532, 176, 156, 'Testis karsinomu', 'mavi'))
        + `<line class="f24-ince" x1="300" y1="168" x2="268" y2="168"/><text class="f24-t" x="98" y="138">en ciddi yan etki</text>`
        + anim('f24-kay', '--dx:-24px;--o0:0;--d:550ms', tag(183, 153, 170, 'Pulmoner fibrozis', 'kirmizi')),
      // 2
      yer(360, 166, anim('f24-kay', '--dx:-180px;--d:0ms', '<rect class="f24-kutu" x="-46" y="-44" width="92" height="84" rx="11"/><text class="f24-t" y="-27" text-anchor="middle">bleomisin</text>')
        + anim('f24-kay', '--dx:110px;--o0:0;--d:0ms', yer(0, 8, METAL('Fe', 15)))
        + anim('f24-gir', '--d:520ms', '<circle class="f24-sel" cy="8" r="25"/>'))
        + anim('f24-gir', '--d:560ms', '<text class="f24-lb" x="360" y="236" text-anchor="middle">bleomisin–demir kompleksi</text><text class="f24-t" x="424" y="150">şelasyon</text><path class="f24-ince" d="M422 154 Q 404 158 392 166"/>'),
      // 3
      yer(220, 182, anim('f24-kay', '--dx:140px;--d:0ms', kompleks()))
        + yer(220, 118, anim('f24-kay', '--dx:300px;--o0:0;--d:250ms', MOL.o2))
        + anim('f24-gir', '--d:620ms', '<line class="f24-okc b" x1="296" y1="182" x2="412" y2="182" marker-end="url(#f24-ok-b)"/><text class="f24-t" x="354" y="172" text-anchor="middle">tepkime</text>')
        + yer(468, 146, anim('f24-akis', '--dx:-150px;--dy:36px;--d:760ms', MOL.sup)) + yer(468, 220, anim('f24-akis', '--dx:-150px;--dy:-38px;--d:900ms', MOL.oh))
        + anim('f24-gir', '--d:1300ms', '<text class="f24-k" x="504" y="150">süperoksit anyonu</text><text class="f24-k" x="504" y="224">hidroksil radikali</text>'),
      // 4
      (() => {
        const D = dna(470, 660, 182, 36, [1, 3], 1150);
        return `<g opacity=".75">${yer(112, 196, kompleks(false), 0.7)}${yer(112, 150, MOL.o2, 0.7)}</g>`
          + yer(250, 146, MOL.sup) + yer(250, 220, MOL.oh)
          + '<line class="f24-okc" x1="292" y1="182" x2="452" y2="182" marker-end="url(#f24-ok-b2)" style="opacity:.45"/>'
          + '<text class="f24-t" x="565" y="128" text-anchor="middle">DNA</text>' + D.s
          + yer(D.x(1), 182, anim('f24-kacis', `--dx:${(250 - D.x(1)).toFixed(1)}px;--dy:-36px;--d:250ms`, yer(0, 0, MOL.sup, 0.7)))
          + yer(D.x(3), 182, anim('f24-kacis', `--dx:${(250 - D.x(3)).toFixed(1)}px;--dy:38px;--d:400ms`, yer(0, 0, MOL.oh, 0.7)))
          + anim('f24-gir', '--d:1250ms', '<text class="f24-lb f24-kirmizi" x="565" y="250" text-anchor="middle">DNA kırıkları</text>');
      })(),
      // 5
      `<line class="f24-zc" x1="40" x2="230" y1="150" y2="150"/><rect class="f24-zb" x="40" y="143" width="95" height="14" rx="3"/>${[[40, '0'], [135, '6 ay'], [230, '12 ay']].map(([x, t]) => `<line class="f24-tik" x1="${x}" x2="${x}" y1="143" y2="157"/><text class="f24-t" x="${x}" y="172" text-anchor="middle">${t}</text>`).join('')}
        <text class="f24-k f24-kirmizi" x="88" y="134" text-anchor="middle">genellikle ilk 6 ay</text><text class="f24-t" x="135" y="190" text-anchor="middle">tedavinin başından</text>`
        + akciger(360, 80, 1)
        + '<text class="f24-lb f24-kirmizi" x="360" y="312" text-anchor="middle">pulmoner fibrozis</text>'
        + anim('f24-kay', '--dx:40px;--o0:0;--d:300ms', '<rect class="f24-o2k" x="512" y="92" width="188" height="58" rx="10"/><text class="f24-lb f24-mavi" x="606" y="116" text-anchor="middle">sonradan ek O₂</text><text class="f24-t" x="606" y="136" text-anchor="middle">ör. pnömoni, genel anestezi</text><text class="f24-k f24-sari" x="606" y="170" text-anchor="middle">olası mekanizma</text>')
        + anim('f24-gir', '--d:650ms', '<path class="f24-okc o2" d="M522 150 Q 484 160 452 176" marker-end="url(#f24-ok-m)"/><path class="f24-okc o2" d="M540 152 Q 498 196 452 214" marker-end="url(#f24-ok-m)"/>')
        + [[486, 152], [500, 196], [472, 236]].map(([x, y], k) => yer(x, y, anim('f24-gir', `--d:${850 + k * 220}ms`, JETON))).join(''),
      // 6
      `<g transform="rotate(-2 195 160)"><rect class="f24-kart" x="60" y="94" width="270" height="136" rx="12"/><text class="f24-kartb" x="80" y="120">UYARI KARTI</text><text class="f24-lb" x="80" y="154" style="font-size:14px">Bleomisin tedavisi aldım.</text><text class="f24-k" x="80" y="180" style="font-size:13.5px">Mümkünse O₂ verilmesin.</text><text class="f24-k" x="80" y="206" style="font-size:13.5px">Gerekirse SaO₂ %88–92.</text></g>`
        + saoOlcek(380, 150, 15, 140, 200, 224, 530),
    ];
    const sahneDar = () => [
      // 1
      anim('f24-gir', '--d:0ms', '<rect class="f24-kapak" x="148" y="92" width="64" height="16" rx="4"/><rect class="f24-kutu" x="120" y="106" width="120" height="104" rx="12"/><text class="f24-lb" x="180" y="156" text-anchor="middle" style="font-size:15px">Bleomisin</text><text class="f24-t" x="180" y="177" text-anchor="middle">kemoterapi ilacı</text>')
        + '<text class="f24-t" x="180" y="240" text-anchor="middle">endikasyon</text>'
        + anim('f24-kay', '--dy:16px;--o0:0;--d:250ms', tag(180, 248, 200, 'Hodgkin lenfoması', 'mavi'))
        + anim('f24-kay', '--dy:16px;--o0:0;--d:400ms', tag(180, 286, 200, 'Testis karsinomu', 'mavi'))
        + '<text class="f24-t" x="180" y="346" text-anchor="middle">en ciddi yan etki</text>'
        + anim('f24-kay', '--dy:16px;--o0:0;--d:550ms', tag(180, 354, 200, 'Pulmoner fibrozis', 'kirmizi')),
      // 2
      yer(180, 210, anim('f24-kay', '--dy:-100px;--d:0ms', '<rect class="f24-kutu" x="-46" y="-44" width="92" height="84" rx="11"/><text class="f24-t" y="-27" text-anchor="middle">bleomisin</text>')
        + anim('f24-kay', '--dy:130px;--o0:0;--d:0ms', yer(0, 8, METAL('Fe', 15)))
        + anim('f24-gir', '--d:520ms', '<circle class="f24-sel" cy="8" r="25"/>'))
        + anim('f24-gir', '--d:560ms', '<text class="f24-lb" x="180" y="290" text-anchor="middle">bleomisin–demir kompleksi</text><text class="f24-t" x="240" y="168">şelasyon</text><path class="f24-ince" d="M238 172 Q 226 178 214 190"/>'),
      // 3
      yer(160, 158, anim('f24-kay', '--dx:20px;--dy:52px;--d:0ms', kompleks()))
        + yer(250, 118, anim('f24-kay', '--dx:110px;--o0:0;--d:250ms', MOL.o2))
        + anim('f24-gir', '--d:620ms', '<line class="f24-okc b" x1="160" y1="210" x2="160" y2="282" marker-end="url(#f24-ok-b)"/><text class="f24-t" x="172" y="250">tepkime</text>')
        + yer(96, 322, anim('f24-akis', '--dx:64px;--dy:-100px;--d:760ms', MOL.sup)) + yer(250, 322, anim('f24-akis', '--dx:-90px;--dy:-100px;--d:900ms', MOL.oh))
        + anim('f24-gir', '--d:1300ms', '<text class="f24-k" x="96" y="364" text-anchor="middle">süperoksit anyonu</text><text class="f24-k" x="250" y="364" text-anchor="middle">hidroksil radikali</text>'),
      // 4
      (() => {
        const D = dna(40, 320, 330, 40, [1, 3], 1150);
        return `<g opacity=".75">${yer(180, 124, kompleks(false), 0.62)}${yer(180, 84, MOL.o2, 0.62)}</g>`
          + yer(84, 176, MOL.sup) + yer(276, 176, MOL.oh)
          + '<text class="f24-t" x="40" y="280">DNA</text>' + D.s
          + yer(D.x(1), 330, anim('f24-kacis', `--dx:${(84 - D.x(1)).toFixed(1)}px;--dy:-154px;--d:250ms`, yer(0, 0, MOL.sup, 0.7)))
          + yer(D.x(3), 330, anim('f24-kacis', `--dx:${(276 - D.x(3)).toFixed(1)}px;--dy:-154px;--d:400ms`, yer(0, 0, MOL.oh, 0.7)))
          + anim('f24-gir', '--d:1250ms', '<text class="f24-lb f24-kirmizi" x="180" y="404" text-anchor="middle">DNA kırıkları</text>');
      })(),
      // 5
      `<line class="f24-zc" x1="40" x2="320" y1="96" y2="96"/><rect class="f24-zb" x="40" y="89" width="140" height="14" rx="3"/>${[[40, '0', 'start'], [180, '6 ay', 'middle'], [320, '12 ay', 'end']].map(([x, t, a]) => `<line class="f24-tik" x1="${x}" x2="${x}" y1="89" y2="103"/><text class="f24-t" x="${x}" y="117" text-anchor="${a}">${t}</text>`).join('')}
        <text class="f24-k f24-kirmizi" x="110" y="82" text-anchor="middle">genellikle ilk 6 ay</text>`
        + akciger(180, 130, 0.84)
        + anim('f24-kay', '--dy:30px;--o0:0;--d:300ms', '<rect class="f24-o2k" x="50" y="344" width="260" height="54" rx="10"/><text class="f24-lb f24-mavi" x="180" y="366" text-anchor="middle">sonradan ek O₂</text><text class="f24-t" x="180" y="386" text-anchor="middle">ör. pnömoni, genel anestezi</text><text class="f24-k f24-sari" x="180" y="418" text-anchor="middle">olası mekanizma</text>')
        + anim('f24-gir', '--d:650ms', '<line class="f24-okc o2" x1="130" y1="342" x2="140" y2="318" marker-end="url(#f24-ok-m)"/><line class="f24-okc o2" x1="230" y1="342" x2="220" y2="318" marker-end="url(#f24-ok-m)"/>')
        + [[108, 326], [252, 326], [180, 330]].map(([x, y], k) => yer(x, y, anim('f24-gir', `--d:${850 + k * 220}ms`, JETON))).join(''),
      // 6
      `<g transform="rotate(-2 180 136)"><rect class="f24-kart" x="20" y="76" width="320" height="120" rx="12"/><text class="f24-kartb" x="40" y="102">UYARI KARTI</text><text class="f24-lb" x="40" y="134" style="font-size:14px">Bleomisin tedavisi aldım.</text><text class="f24-k" x="40" y="160" style="font-size:13.5px">Mümkünse O₂ verilmesin.</text><text class="f24-k" x="40" y="184" style="font-size:13.5px">Gerekirse SaO₂ %88–92.</text></g>`
        + saoOlcek(30, 300, 15, 290, 350, 378, 180),
    ];
    // SaO₂ ölçeği: x0 → %80, 1 % = k px; şerit y..y+30
    function saoOlcek(x0, y, k, yEt, yTik, yDur, xOrta) {
      const X = (s) => x0 + (s - 80) * k;
      return `<text class="f24-t2" x="${x0}" y="${yEt}">SaO₂ (%)</text><text class="f24-k f24-yesil" x="${(X(88) + X(92)) / 2}" y="${yEt}" text-anchor="middle">hedef %88–92</text>
        <rect class="f24-sz" x="${X(80)}" y="${y}" width="${X(88) - X(80)}" height="30" rx="4"/><rect class="f24-sz" x="${X(92)}" y="${y}" width="${X(100) - X(92)}" height="30" rx="4"/>
        <rect class="f24-sh" x="${X(88)}" y="${y}" width="${X(92) - X(88)}" height="30"/><line class="f24-shc" x1="${X(88)}" x2="${X(88)}" y1="${y - 4}" y2="${y + 34}"/><line class="f24-shc" x1="${X(92)}" x2="${X(92)}" y1="${y - 4}" y2="${y + 34}"/>
        ${[80, 85, 90, 95, 100].map((s) => `<line class="f24-tik" x1="${X(s)}" x2="${X(s)}" y1="${y + 30}" y2="${y + 36}"/><text class="f24-t" x="${X(s)}" y="${yTik}" text-anchor="middle">${s}</text>`).join('')}
        <g class="f24-sim" data-x0="${x0}" data-k="${k}" data-y="${y}"><line class="f24-simc" y1="${y - 6}" y2="${y + 40}"/><rect class="f24-simk" y="${y - 46}" width="46" height="22" rx="6"/><text class="f24-simt" y="${y - 30}" text-anchor="middle"></text></g>
        <text class="f24-durt" x="${xOrta}" y="${yDur}" text-anchor="middle"></text>`;
    }
    const kur = () => {
      const W = dar ? 360 : 720, H = dar ? 424 : 318, S = dar ? sahneDar() : sahneGenis();
      const xs = (k) => (dar ? 40 + 56 * k : 120 + 96 * k), ys = dar ? 46 : 50, r = dar ? 10 : 11;
      const serit = `<text class="f24-bslk" x="${W / 2}" y="${dar ? 22 : 24}" text-anchor="middle"></text><line class="f24-sc" x1="${xs(0)}" x2="${xs(5)}" y1="${ys}" y2="${ys}"/><line class="f24-sc on" x1="${xs(0)}" y1="${ys}" y2="${ys}"/>`
        + BAS.map((b, k) => `<g class="f24-sd" data-adim="${k + 1}"><circle cx="${xs(k)}" cy="${ys}" r="${r}"/><text x="${xs(k)}" y="${ys + 4}">${k + 1}</text><title>${k + 1} · ${b}</title></g>`).join('');
      sahne.innerHTML = `<svg class="f24-svg ${dar ? 'f24-dar' : 'f24-gen'}" viewBox="0 0 ${W} ${H}" role="img"><defs>${okUcu('f24-ok-b', 'f24-okuc')}${okUcu('f24-ok-b2', 'f24-okuc')}${okUcu('f24-ok-m', 'f24-okuc-m')}</defs>${serit}${S.map((x, k) => `<g class="f24-bs" data-s="${k + 1}">${x}</g>`).join('')}</svg>`;
      svg = sahne.querySelector('svg');
      svg.querySelector('.f24-sc.on').setAttribute('x2', xs(0));
      R = { xs };
    };
    let R = null;
    const satCiz = () => {
      const g = svg.querySelector('.f24-sim'), x0 = +g.dataset.x0, k = +g.dataset.k, x = x0 + (sat - 80) * k;
      g.querySelector('.f24-simc').setAttribute('x1', x); g.querySelector('.f24-simc').setAttribute('x2', x);
      g.querySelector('.f24-simk').setAttribute('x', x - 23); const t = g.querySelector('.f24-simt'); t.setAttribute('x', x); t.textContent = `%${sat}`;
      const d = svg.querySelector('.f24-durt'), ic = sat >= 88 && sat <= 92;
      d.textContent = ic ? 'hedefte' : sat < 88 ? 'hedefin altında' : 'hedefin üstünde: gereğinden fazla O₂';
      d.setAttribute('class', 'f24-durt ' + (ic ? 'ok' : 'warn'));
      $('[data-o="sat"]').textContent = `%${sat}`;
    };
    const ciz = () => {
      svg.querySelectorAll('.f24-bs').forEach((g) => g.classList.toggle('on', +g.dataset.s === adim));
      svg.querySelectorAll('.f24-sd').forEach((g) => { const k = +g.dataset.adim; g.classList.toggle('on', k <= adim); g.classList.toggle('cur', k === adim); });
      svg.querySelector('.f24-sc.on').setAttribute('x2', R.xs(adim - 1));
      svg.querySelector('.f24-bslk').textContent = BAS[adim - 1];
      svg.setAttribute('aria-label', `Adım ${adim} / 6: ${BAS[adim - 1]}`);
      const fm = $('.f24-form'), vv = VURGU[adim];
      fm.classList.toggle('gizli', !vv);
      fm.querySelectorAll('[data-f]').forEach((s) => s.classList.toggle('on', !!vv && vv.includes(+s.dataset.f)));
      $('.f24-satk').hidden = adim !== 6;
      satCiz();
      $('.f24-adim').textContent = `Adım ${adim} / 6`;
      $('[data-a="geri"]').disabled = adim <= 1; $('[data-a="ileri"]').disabled = adim >= 6;
      if (dokundu) cap.yaz(adim === 6 ? satCap(sat) : CAP[adim - 1]);
    };
    const durdur = () => { if (oyn) { clearInterval(oyn); oyn = 0; } if (oynB) { oynB.textContent = 'Oynat'; oynB.setAttribute('aria-pressed', 'false'); } };
    const git = (n) => { adim = clamp(n, 1, 6); ciz(); };
    const oynat = () => {
      git(adim >= 6 ? 1 : adim + 1);
      oyn = setInterval(() => { git(adim + 1); if (adim >= 6) durdur(); }, 2800);
      oynB.textContent = 'Durdur'; oynB.setAttribute('aria-pressed', 'true');
      if (adim >= 6) durdur();
    };
    el.addEventListener('click', (e) => {
      const sd = e.target.closest('.f24-sd');
      if (sd) { dokundu = true; durdur(); git(+sd.dataset.adim); return; }
      const b = e.target.closest('[data-a]'); if (!b) return;
      dokundu = true;
      const a = b.dataset.a;
      if (a === 'oynat') { if (oyn) durdur(); else oynat(); return; }
      durdur();
      if (a === 'ileri') git(adim + 1); else if (a === 'geri') git(adim - 1); else if (a === 'bas') git(1);
    });
    el.addEventListener('input', (e) => { const r = e.target.closest('[data-r="sat"]'); if (!r) return; sat = +r.value; dokundu = true; satCiz(); cap.yaz(satCap(sat)); });
    kur(); ciz();
    const boyutBirak = boyutIzle(el, (d) => { dar = d; kur(); ciz(); });
    return () => { durdur(); boyutBirak(); };
  };

  /* =====================================================================
     5 · f24_organlar — Üç hedef organ, üç tablo (K1 s. 102)
     Durağan, etiketli şema; organ ya da karta gelince/dokununca o çift vurgulanır. Silüet şematiktir.
     ===================================================================== */
  VIZ.f24_organlar = (el) => {
    const K = [
      { k: 'mss', ust: 'Paul Bert etkisi', bas: 'Merkezi sinir sistemi', org: 'MSS', sat: [['nöbet · bilinç kaybı'], ['hiperbarik O₂ solurken'], ['dalgıçlar için önemli']] },
      { k: 'akc', ust: 'Lorrain Smith etkisi', bas: 'Akciğer', org: 'akciğer', sat: [['prematüre yenidoğan', '→ bronkopulmoner displazi'], ['büyük çocuk, erişkin', '→ absorpsiyon atelektazisi, ARDS']] },
      { k: 'ret', ust: 'yenidoğan', bas: 'Retina', org: 'retina', sat: [['retrolental fibroplazi'], ['= prematüre retinopatisi (ROP)']] },
    ];
    const ADI = { mss: 'Merkezi sinir sistemi: Paul Bert etkisi', akc: 'Akciğer: Lorrain Smith etkisi', ret: 'Retina: yenidoğanda prematüre retinopatisi' };
    kok(el, 'f24-or');
    let dar = darMi(el), sec = '', uz = '';
    const dugme = (k) => `data-p="${k}" tabindex="0" role="button" aria-pressed="false" aria-label="${ADI[k]}"`;
    // silüet (geniş yerleşim koordinatları; dar yerleşimde ölçeklenir). Gerçekçi anatomi değil.
    const SOLL = 'M352 198 C 340 184, 312 190, 304 224 C 298 250, 298 284, 302 306 Q 304 314, 313 312 L 344 305 Q 352 303, 352 294 Z';
    const ayna = (d) => d.replace(/(\d+(\.\d+)?) (\d+(\.\d+)?)/g, (m, a, _, b) => `${720 - a} ${b}`);
    const silu = () => '<g class="f24-or-sil"><rect x="282" y="150" width="156" height="196" rx="40"/><circle cx="360" cy="82" r="54"/></g>'
      + '<rect class="f24-or-boyun" x="346.8" y="128" width="26.4" height="27"/><path class="f24-or-boyunk" d="M346 134.5 L346 150.5 M374 134.5 L374 150.5"/>'
      + '<path class="f24-or-trak" d="M360 152 L360 190 M360 190 L347 203 M360 190 L373 203"/>'
      + `<g class="f24-or-org" ${dugme('mss')}><ellipse cx="360" cy="68" rx="38" ry="26"/><path class="f24-or-kiv" d="M330 62 q 7.5 -9 15 0 q 7.5 9 15 0 q 7.5 -9 15 0 q 7.5 9 15 0 M334 78 q 6.5 7 13 0 q 6.5 -7 13 0 q 6.5 7 13 0 q 6.5 -7 13 0 M360 43 L360 52"/></g>`
      + `<g class="f24-or-org f24-or-goz" ${dugme('ret')}><ellipse cx="342" cy="100" rx="8" ry="5"/><ellipse cx="378" cy="100" rx="8" ry="5"/><circle class="f24-or-bebek" cx="342" cy="100" r="2.5"/><circle class="f24-or-bebek" cx="378" cy="100" r="2.5"/></g>`
      + `<g class="f24-or-org" ${dugme('akc')}><path d="${SOLL}"/><path d="${ayna(SOLL)}"/></g>`;
    // kart: üst etiket hapı, başlık, satırlar. Akciğer kartında her satır iki alt satır (yaş soluk, tablo koyu).
    const kart = (c, x, y, w, h) => {
      let s = `<g class="f24-or-kart" ${dugme(c.k)}><rect class="f24-or-kz" x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/>`
        + `<rect class="f24-or-hap" x="${x + 14}" y="${y + 12}" width="120" height="20" rx="10"/><text class="f24-or-hapt" x="${x + 22}" y="${y + 26}">${c.ust}</text>`
        + `<text class="f24-or-bas" x="${x + 14}" y="${y + 54}">${c.bas}</text>`;
      let yy = y + 77;
      c.sat.forEach((sv) => {
        if (sv.length === 1) { s += `<text class="f24-or-sat" x="${x + 14}" y="${yy}">${sv[0]}</text>`; yy += 18; }
        else { s += `<text class="f24-or-yas" x="${x + 14}" y="${yy}">${sv[0]}</text><text class="f24-or-sat" x="${x + 24}" y="${yy + 17}">${sv[1]}</text>`; yy += 39; }
      });
      return s + '</g>';
    };
    const kur = () => {
      const s = [];
      let W, H;
      if (!dar) {
        W = 720; H = 360;
        s.push(silu());
        s.push(kart(K[0], 16, 20, 240, 130), kart(K[1], 16, 182, 240, 160), kart(K[2], 464, 20, 240, 130));
        [['mss', 256, 70, 324, 66], ['akc', 256, 250, 306, 248], ['ret', 464, 84, 386, 100]].forEach(([k, x1, y1, x2, y2]) => {
          s.push(`<g class="f24-or-kil" data-p="${k}"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><circle cx="${x2}" cy="${y2}" r="3"/></g>`);
        });
        s.push(`<g class="f24-or-ortak"><rect x="464" y="236" width="240" height="106" rx="12"/><text class="f24-or-bas" x="478" y="266">Ortak koşul</text>`
          + '<text class="f24-or-sat" x="478" y="292">yüksek parsiyel basınçta O₂</text><text class="f24-or-sat" x="478" y="312">risk: basınç ↑ · süre ↑</text></g>');
      } else {
        W = 360; H = 736;
        s.push(`<g transform="translate(-108 0) scale(0.8)">${silu()}</g>`);
        s.push(`<text class="f24-or-etk" data-p="mss" x="232" y="58">MSS</text><text class="f24-or-etk" data-p="ret" x="232" y="86">retina</text><text class="f24-or-etk" data-p="akc" x="110" y="202" text-anchor="end">akciğer</text>`);
        s.push(kart(K[0], 12, 284, 336, 124), kart(K[1], 12, 418, 336, 146), kart(K[2], 12, 574, 336, 108));
        s.push('<g class="f24-or-ortak dz"><text class="f24-or-sat" x="180" y="708" text-anchor="middle"><tspan font-weight="700">Ortak koşul:</tspan> yüksek parsiyel basınçta O₂</text><text class="f24-or-sat" x="180" y="727" text-anchor="middle">risk: basınç ↑ · süre ↑</text></g>');
      }
      el.innerHTML = `<svg class="f24-svg ${dar ? 'f24-dar' : 'f24-gen'}" viewBox="0 0 ${W} ${H}" role="group" aria-label="Oksijen toksisitesinin üç hedef organı: merkezi sinir sistemi, akciğer, retina">${s.join('')}</svg>`;
      // hap genişliği yazıya göre
      el.querySelectorAll('.f24-or-kart').forEach((g) => {
        const t = g.querySelector('.f24-or-hapt'), r = g.querySelector('.f24-or-hap');
        let w = 0; try { w = t.getComputedTextLength(); } catch (e) { w = 0; }
        if (!w) w = t.textContent.length * 7;
        r.setAttribute('width', (w + 16).toFixed(1));
      });
      boya();
    };
    const boya = () => {
      const a = uz || sec;
      el.querySelectorAll('[data-p]').forEach((n) => {
        const on = n.dataset.p === a;
        n.classList.toggle('on', on); n.classList.toggle('sonuk', !!a && !on);
        if (n.hasAttribute('aria-pressed')) n.setAttribute('aria-pressed', String(on));
      });
    };
    el.addEventListener('pointerover', (e) => { if (e.pointerType !== 'mouse') return; const p = e.target.closest('[data-p]'); const v = p ? p.dataset.p : ''; if (v !== uz) { uz = v; boya(); } });
    el.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'mouse') return; uz = ''; sec = ''; boya(); });
    el.addEventListener('click', (e) => { const p = e.target.closest('[data-p]'); sec = p ? p.dataset.p : ''; boya(); });
    el.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const p = e.target.closest('[data-p]'); if (!p) return;
      e.preventDefault(); sec = sec === p.dataset.p ? '' : p.dataset.p; boya();
    });
    el.addEventListener('focusin', (e) => { const p = e.target.closest('[data-p]'); if (p && p.hasAttribute('tabindex')) { sec = p.dataset.p; boya(); } });
    el.addEventListener('focusout', (e) => { if (!el.contains(e.relatedTarget)) { sec = ''; boya(); } });
    kur();
    const boyutBirak = boyutIzle(el, (d) => { dar = d; kur(); });
    return () => { boyutBirak(); };
  };

  /* =====================================================================
     6 · f24_yarar — İki hücre, iki iş (K1 s. 102)
     A: fagosit O₂'den ROS yapıp fagozoma salgılar (solunumsal patlama). B: tiroit folikül hücresi H₂O₂ ile iyodürü iyoda oksitler.
     Hücre çizimleri şematiktir; kitapta olmayan ayrıntı (enzim adları, kolloid vb.) çizilmez.
     ===================================================================== */
  VIZ.f24_yarar = (el) => {
    const IKI = 620; // kap bu genişlikte ya da üstündeyse paneller yan yana
    const CAP_YAN = "Solda fagosit, sağda tiroit folikül hücresi; oklar O₂'nin ve ROS'un izlediği yolu gösterir. [[K1 s. 102]]";
    const CAP_UST = "Üstte fagosit, altta tiroit folikül hücresi; oklar O₂'nin ve ROS'un izlediği yolu gösterir. [[K1 s. 102]]";
    const cap = aciklama(el);
    kok(el, 'f24-yr');
    const q2 = (a, c, b, t) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b; // ikinci derece Bezier
    const YOL = [[60, 100, 118, 90, 166, 124], [60, 214, 118, 236, 166, 189]]; // O₂ giriş okları: x0 y0 cx cy x1 y1
    const ROS = [[168, 144], [232, 144], [176, 180], [224, 180]];
    const rosOk = ROS.map(([x, y]) => {
      const dx = 200 - x, dy = 160 - y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
      return `<line class="f24-yr-rok" x1="${(x + ux * 8).toFixed(1)}" y1="${(y + uy * 8).toFixed(1)}" x2="${(x + ux * (L - 17)).toFixed(1)}" y2="${(y + uy * (L - 17)).toFixed(1)}" marker-end="url(#f24-yr-ok3)"/>`;
    }).join('');
    const cerceve = (bas, alt) => `<rect class="f24-yr-cer" x="1" y="1" width="338" height="298" rx="12"/><text class="f24-yr-bas" x="170" y="24" text-anchor="middle">${bas}</text><text class="f24-yr-alt" x="170" y="284" text-anchor="middle">${alt}</text>`;
    const panelA = `<svg class="f24-svg f24-yr-p" viewBox="0 0 340 300" role="img" aria-label="Fagosit: O₂ fagozomda ROS'a dönüşür ve bakteriyi öldürür; bu O₂ tüketimi solunumsal patlamadır">
      <defs>${okUcu('f24-yr-ok', 'f24-yr-ucb')}${okUcu('f24-yr-ok3', 'f24-yr-ucr')}</defs>
      ${cerceve('Fagosit · solunumsal patlama', 'O₂ → ROS → bakteri öldürülür')}
      <circle class="f24-yr-hc" cx="170" cy="150" r="100"/>
      <text class="f24-yr-k" x="330" y="52" text-anchor="end">nötrofil · makrofaj</text>
      <g class="f24-yr-cek"><circle cx="112" cy="140" r="14"/><circle cx="124" cy="166" r="14"/><circle cx="106" cy="182" r="14"/></g>
      <circle class="f24-yr-fz" cx="200" cy="156" r="44"/><text class="f24-yr-k" x="200" y="126" text-anchor="middle">fagozom</text>
      <rect class="f24-yr-bak" x="180" y="151" width="40" height="18" rx="9"/><path class="f24-yr-kir" d="M195 149 L201 158 L197 162 L204 171"/>
      <text class="f24-yr-k f24-yr-kr" x="200" y="216" text-anchor="middle">bakteri ölür</text>
      <text class="f24-yr-k f24-yr-kr" x="206" y="88" text-anchor="middle">ROS fagozoma</text><text class="f24-yr-k f24-yr-kr" x="206" y="102" text-anchor="middle">salgılanır</text>
      ${rosOk}${ROS.map(([x, y]) => yer(x, y, JETON, 0.86)).join('')}
      ${YOL.map(([a, b, c, d, e, f]) => `<path class="f24-yr-o2ok" d="M${a} ${b} Q ${c} ${d} ${e} ${f}" marker-end="url(#f24-yr-ok)"/>`).join('')}
      ${yer(38, 98, MOL.o2, 0.75)}${yer(38, 214, MOL.o2, 0.75)}
      <text class="f24-yr-o2t" x="12" y="246">O₂ tüketimi</text><text class="f24-yr-o2t" x="12" y="261">= solunumsal patlama</text>
      ${YOL.map((_, i) => `<g class="f24-yr-gez" data-g="${i}" opacity="0"><g class="f24-yr-g-o2">${yer(0, 0, MOL.o2, 0.75)}</g><g class="f24-yr-g-ros" opacity="0">${yer(0, 0, JETON, 0.86)}</g></g>`).join('')}
    </svg>`;
    const panelB = `<svg class="f24-svg f24-yr-p" viewBox="0 0 340 300" role="img" aria-label="Tiroit folikül hücresi H₂O₂ sentezler; H₂O₂ iyodürü iyoda oksitler">
      <defs>${okUcu('f24-yr-ok2', 'f24-yr-uca')}${okUcu('f24-yr-ok4', 'f24-yr-ucr')}</defs>
      ${cerceve('Tiroit folikül hücresi', 'H₂O₂ → I⁻ iyoda (I₂) oksitlenir')}
      <rect class="f24-yr-hc" x="40" y="70" width="150" height="160" rx="14"/>
      <g class="f24-yr-cek"><circle cx="90" cy="170" r="22"/></g>
      ${yer(140, 112, MOL.hp, 0.85)}<text class="f24-yr-ink" x="140" y="140" text-anchor="middle">H₂O₂ sentezi</text>
      <path class="f24-yr-hok" d="M164 113 L244 146" marker-end="url(#f24-yr-ok4)"/>
      <rect class="f24-yr-cip" x="228" y="82" width="54" height="28" rx="8"/><text class="f24-yr-cipt" x="255" y="101" text-anchor="middle">I⁻</text><text class="f24-yr-k" x="288" y="100">iyodür</text>
      <line class="f24-yr-aok" x1="255" y1="118" x2="255" y2="182" marker-end="url(#f24-yr-ok2)"/>
      <text class="f24-yr-k" x="264" y="154">oksitlenir</text>
      <g class="f24-yr-i2"><rect class="f24-yr-cip i2" x="228" y="190" width="54" height="28" rx="8"/><text class="f24-yr-cipt i2" x="255" y="209" text-anchor="middle">I₂</text></g><text class="f24-yr-k" x="288" y="208">iyot</text>
      <text class="f24-yr-k" x="115" y="252" text-anchor="middle">ayrıntı: Bölüm 81</text>
      <g class="f24-yr-hgez" opacity="0">${yer(0, 0, MOL.hp, 0.42)}</g>
    </svg>`;
    el.innerHTML = `<div class="f24-yr-izg">${panelA}${panelB}</div>`;
    const gez = [...el.querySelectorAll('.f24-yr-gez')], hgez = el.querySelector('.f24-yr-hgez'), i2 = el.querySelector('.f24-yr-i2');
    let iki = null;
    const yerlesim = () => {
      const v = (el.clientWidth || 800) >= IKI;
      if (v === iki) return;
      iki = v; el.classList.toggle('f24-yr-iki', v);
      cap.yaz(v ? CAP_YAN : CAP_UST);
    };
    yerlesim();
    let ro = null, raf = 0;
    if ('ResizeObserver' in window) { ro = new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(yerlesim); }); ro.observe(el); }
    // döngü: 2,4 s yol + 0,8 s bekleme
    const PER = 3.2, YOLS = 2.4;
    let t = 0;
    const kare = (dt) => {
      t = (t + dt) % PER;
      const f = Math.min(1, t / YOLS);
      gez.forEach((g, i) => {
        const [a, b, c, d, e, h] = YOL[i], k = Math.min(1, f / 0.8), x = q2(a, c, e, k), y = q2(b, d, h, k);
        g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
        const ros = f >= 0.8, son = t > YOLS ? Math.max(0, 1 - (t - YOLS) / 0.5) : 1;
        g.setAttribute('opacity', (f < 0.06 ? f / 0.06 : son).toFixed(2));
        g.querySelector('.f24-yr-g-o2').setAttribute('opacity', ros ? '0' : '1');
        g.querySelector('.f24-yr-g-ros').setAttribute('opacity', ros ? '1' : '0');
      });
      const kh = Math.min(1, f / 0.78), hx = lerp(164, 242, kh), hy = lerp(113, 145, kh);
      hgez.setAttribute('transform', `translate(${hx.toFixed(1)} ${hy.toFixed(1)})`);
      hgez.setAttribute('opacity', (f < 0.06 ? f / 0.06 : f < 0.78 ? 1 : Math.max(0, 1 - (f - 0.78) / 0.1)).toFixed(2));
      const vardi = t - 0.78 * YOLS;
      i2.setAttribute('opacity', (vardi < 0 ? 0.7 : Math.min(1, 0.7 + vardi / 0.3 * 0.3)).toFixed(2));
    };
    const durT = RM ? () => {} : ticker(el, kare);
    return () => { durT(); if (ro) ro.disconnect(); cancelAnimationFrame(raf); };
  };
})();
