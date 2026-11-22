/* Bölüm 12 · Statik akciğer hacimleri · bileşenler (K1 s. 50–55).
   Tarifler: docs/tasarim/fiz12.md. Bütün modeller şematiktir; kitaptan alınan sayılar bileşen altlarında belirtilir.
   Kutu 640 px'ten darsa her bileşen telefon yerleşimine geçer (ResizeObserver ile). */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const yum = (u) => (1 - Math.cos(Math.PI * clamp(u, 0, 1))) / 2;
  const fmt = (v, d = 1) => { const k = Math.pow(10, d); let r = Math.round(v * k) / k; if (Math.abs(r) < 0.5 / k) r = 0; return r.toFixed(d).replace('.', ',').replace('-', '−'); };
  const tam = (v) => String(Math.round(v));
  const q = (v) => (Math.round(v * 10) / 10).toFixed(1);
  const r4 = (v) => Math.round(v * 1e4) / 1e4;
  // mulberry32: yakın tohumlarda da birbirinden bağımsız diziler
  const seedRnd = (seed) => { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

  /* Durum açıklamasını bileşenin dışındaki p.viz-cap içine yazar; null → sayfadaki ilk metin */
  function kapsiyon(el) {
    const viz = el.closest('.viz'), cap = viz && viz.querySelector('.viz-cap');
    const ilk = cap ? cap.innerHTML : '';
    let son = null;
    return (html) => {
      if (!cap) return;
      if (html == null) { if (son !== null) { cap.innerHTML = ilk; son = null; } return; }
      if (html !== son) { cap.innerHTML = REF(html); son = html; }
    };
  }
  /* Kutu genişliğine göre masaüstü / telefon yerleşimi */
  function yerlesim(el, cb) {
    let dar = null;
    const bak = () => { const w = el.clientWidth || el.getBoundingClientRect().width; const d = w > 0 && w < 640; if (d !== dar) { dar = d; cb(d); } };
    bak();
    let ro = null;
    if ('ResizeObserver' in window) { ro = new ResizeObserver(bak); ro.observe(el); } else window.addEventListener('resize', bak);
    return () => { if (ro) ro.disconnect(); else window.removeEventListener('resize', bak); };
  }
  const segHtml = (ad, key, opts, cur, cls = '') => `<div class="seg ${cls}" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}">${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`button[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  /* ok: gövde + uç tek yol (stroke ve fill aynı renk) */
  const okD = (x1, y1, x2, y2, h = 7, w = 0.6) => {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    const hh = Math.min(h, L * 0.8), bx = x2 - ux * hh, by = y2 - uy * hh, px = -uy * hh * w, py = ux * hh * w;
    return `M${q(x1)} ${q(y1)}L${q(bx)} ${q(by)}M${q(bx + px)} ${q(by + py)}L${q(x2)} ${q(y2)}L${q(bx - px)} ${q(by - py)}Z`;
  };
  const tarama = (id) => `<pattern id="${id}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" class="f12-tar-z"/><line x1="0" y1="0" x2="0" y2="7" class="f12-tar-c"/></pattern>`;
  const adimHtml = (n) => `<div class="f12-adim"><button type="button" class="btn ghost" data-a="geri">‹ Önceki</button><div class="f12-nokta" role="group" aria-label="Adımlar">${Array.from({ length: n }, (_, i) => `<button type="button" data-n="${i + 1}" aria-label="Adım ${i + 1}" aria-pressed="${i === 0}">${i + 1}</button>`).join('')}</div><button type="button" class="btn" data-a="ileri">Sonraki ›</button><button type="button" class="btn ghost" data-a="bas">Baştan</button></div>`;
  const adimYaz = (el, a, n) => {
    el.querySelectorAll('.f12-nokta [data-n]').forEach((b) => { const k = +b.dataset.n; b.setAttribute('aria-pressed', String(k === a)); b.classList.toggle('gecti', k < a); });
    el.querySelector('[data-a="geri"]').disabled = a <= 1; el.querySelector('[data-a="ileri"]').disabled = a >= n;
  };
  const sinifla = (e, k, on) => { if (e) e.classList.toggle(k, !!on); };

  /* ================= 1 · Spirogram: dört hacim, dört kapasite ================= */
  VIZ.f12_spiro = (el) => {
    const cap = kapsiyon(el);
    const T = {
      VT: { ad: 'Tidal hacim', en: 'tidal volume', lo: 3, hi: 3.5, v: 500, olc: true, kol: 'h' },
      IRV: { ad: 'İnspiratuvar rezerv hacmi', en: 'inspiratory reserve volume', lo: 3.5, hi: 6, v: 2500, olc: true, kol: 'h' },
      ERV: { ad: 'Ekspiratuvar rezerv hacmi', en: 'expiratory reserve volume', lo: 1.5, hi: 3, v: 1500, olc: true, kol: 'h' },
      RV: { ad: 'Rezidüel hacim', en: 'residual volume', lo: 0, hi: 1.5, v: 1500, olc: false, kol: 'h' },
      FRC: { ad: 'Fonksiyonel rezidüel kapasite', en: 'functional residual capacity', bil: 'RV + ERV', lo: 0, hi: 3, v: 3000, olc: false, kol: 1 },
      IC: { ad: 'İnspiratuvar kapasite', en: 'inspiratory capacity', bil: 'VT + IRV', lo: 3, hi: 6, v: 3000, olc: true, kol: 1 },
      VC: { ad: 'Vital kapasite', en: 'vital capacity', bil: 'ERV + VT + IRV', lo: 1.5, hi: 6, v: 4500, olc: true, kol: 2 },
      TLC: { ad: 'Total akciğer kapasitesi', en: 'total lung capacity', bil: 'RV + ERV + VT + IRV', lo: 0, hi: 6, v: 6000, olc: false, kol: 3 },
    };
    const HAC = ['VT', 'IRV', 'ERV', 'RV'], KAP = ['FRC', 'IC', 'VC', 'TLC'];
    const CAP = {
      VT: '<b>Tidal hacim (VT) · 500 mL.</b> Normal, sakin solunumda her solukta inspire edilen hava; 70 kg erişkinde yaklaşık 7 mL/kg. [[K1 s. 50–51]]',
      IRV: '<b>İnspiratuvar rezerv hacmi (IRV) · 2500 mL.</b> VT\'nin üstüne ek olarak inspire edilebilen hava. [[K1 s. 50]]',
      ERV: '<b>Ekspiratuvar rezerv hacmi (ERV) · 1500 mL.</b> Normal bir tidal ekspirasyondan sonra ek olarak ekspire edilebilen hava. [[K1 s. 50]]',
      RV: '<b>Rezidüel hacim (RV) · 1500 mL.</b> Maksimal ekspirasyondan sonra akciğerde kalan hava. Spirometreye hiç ulaşmadığı için spirometreyle ölçülemez. [[K1 s. 50, 52]]',
      FRC: '<b>Fonksiyonel rezidüel kapasite (FRC) = RV + ERV = 3000 mL.</b> Sakin ekspirasyonun sonunda akciğerde kalan hacim, tidal solunumun başlangıç noktası. RV\'yi içerdiği için spirometreyle doğrudan ölçülemez. [[K1 s. 50–52]]',
      IC: '<b>İnspiratuvar kapasite (IC) = VT + IRV = 3000 mL.</b> Sakin ekspirasyonun sonundan (FRC) maksimal inspirasyona kadar alınabilen hava. [[K1 s. 50]]',
      VC: '<b>Vital kapasite (VC) = ERV + VT + IRV = 4500 mL.</b> Maksimal inspirasyondan sonra maksimal ekspirasyonla verilebilen hava; spirometreyle ölçülür. [[K1 s. 50, 52]]',
      TLC: '<b>Total akciğer kapasitesi (TLC) = RV + ERV + VT + IRV = 6000 mL.</b> Maksimal inspirasyondan sonra akciğerdeki bütün gaz. RV\'yi içerdiği için spirometreyle doğrudan ölçülemez. [[K1 s. 50, 52]]',
    };
    const OLC = '<b>Spirometre yalnızca ağızdan giren ve çıkan gazı ölçer.</b> VT, IRV, ERV, IC ve VC ölçülür. RV maksimal ekspirasyondan sonra da akciğerde kaldığı için ölçülemez; onu içeren FRC ve TLC de doğrudan ölçülemez. FRC gaz dilüsyonu, vücut pletismografisi ya da çok soluklu N₂ yıkamayla hesaplanır. [[K1 s. 52]]';
    const FAZ = [
      { k: 'VT', c: '<b>Sakin soluklar.</b> Her solukta yaklaşık 500 mL (VT) alınıp verilir; her ekspirasyonun bittiği düzey FRC\'dir. [[K1 s. 50–51]]' },
      { k: 'IC', c: '<b>Maksimal inspirasyon.</b> TLC\'ye, 6000 mL\'ye kadar. FRC\'den buraya kadar alınan hava inspiratuvar kapasitedir (VT + IRV = 3000 mL). [[K1 s. 50]]' },
      { k: 'VC', c: '<b>Maksimal ekspirasyon.</b> TLC\'den verilebilen havanın tamamı vital kapasitedir (4500 mL). Akciğerde yine de 1500 mL kalır: rezidüel hacim. [[K1 s. 50]]' },
      { k: 'FRC', c: '<b>Sakin solunuma dönüş.</b> Hacim yeniden FRC\'ye, iç ve dış elastik kuvvetlerin dengelendiği düzeye gelir. [[K1 s. 50–51]]' },
    ];
    const TMAX = 34.5;
    const V = (t) => (t < 12 ? 3 + 0.25 * (1 - Math.cos((2 * Math.PI * t) / 4))
      : t < 15 ? 3 + 3 * yum((t - 12) / 3)
      : t < 20 ? 6 - 4.5 * yum((t - 15) / 5)
      : t < 22.5 ? 1.5 + 1.5 * yum((t - 20) / 2.5)
      : 3 + 0.25 * (1 - Math.cos((2 * Math.PI * (t - 22.5)) / 4)));
    const fazOf = (t) => (t < 12 ? 0 : t < 15 ? 1 : t < 20 ? 2 : 3);
    let gor = 'hk', sec = null, tEnd = TMAX, run = false, oyn = false, faz = 3, L = null;
    const dugme = (k) => `<button type="button" data-t="${k}" aria-pressed="false">${k}<i class="f12-isr"></i></button>`;
    el.innerHTML = `<div class="f12-ust">${segHtml('Görünüm', 'g', [['hk', 'Hacimler ve kapasiteler'], ['olc', 'Spirometre neyi ölçer?']], 'hk')}<button type="button" class="btn" data-a="oynat">Kaydı oynat</button></div>
      <div class="f12-sp-terim">
        <div class="f12-grp"><span class="f12-grp-ad">4 hacim</span><div class="seg" role="group" aria-label="Hacimler">${HAC.map(dugme).join('')}</div></div>
        <div class="f12-grp"><span class="f12-grp-ad">4 kapasite</span><div class="seg" role="group" aria-label="Kapasiteler">${KAP.map(dugme).join('')}</div></div>
      </div>
      <div class="f12-sp-cz"></div>
      <div class="f12-sp-bilgi" aria-live="polite"></div>`;
    const kutu = el.querySelector('.f12-sp-cz'), bilgi = el.querySelector('.f12-sp-bilgi'), btn = el.querySelector('[data-a="oynat"]');
    let egri, uc, bant, rv, brs = {};
    const kur = (dar) => {
      L = dar
        ? { dar, W: 360, H: 330, x0: 44, x1: 250, y0: 290, y1: 24, dx: 10, kh: 260, kk: { 1: 316, 2: 316, 3: 316 }, hw: 46 }
        : { dar, W: 760, H: 380, x0: 56, x1: 496, y0: 340, y1: 30, dx: 5, kh: 520, kk: { 1: 584, 2: 646, 3: 708 }, hw: 54 };
      const X = (L.X = (t) => L.x0 + (t / 35) * (L.x1 - L.x0)), Y = (L.Y = (v) => L.y0 - (v / 6) * (L.y0 - L.y1));
      let g = '';
      for (let v = 0; v <= 6; v++) g += `<line class="f12-grid" x1="${L.x0}" x2="${L.x1}" y1="${q(Y(v))}" y2="${q(Y(v))}"/><text class="f12-tk" x="${L.x0 - 8}" y="${q(Y(v) + 4)}" text-anchor="end">${v}</text>`;
      for (let t = 0; t <= 35; t += L.dx) g += `<line class="f12-ax" x1="${q(X(t))}" x2="${q(X(t))}" y1="${L.y0}" y2="${L.y0 + 5}"/><text class="f12-tk" x="${q(X(t))}" y="${L.y0 + 18}" text-anchor="middle">${t}</text>`;
      const kes = [1.5, 3, 6].map((v) => `<line class="f12-kes" x1="${L.x0}" x2="${L.x1}" y1="${q(Y(v))}" y2="${q(Y(v))}"/>`).join('');
      const br = Object.keys(T).map((k) => {
        const d = T[k], x = d.kol === 'h' ? L.kh : L.kk[d.kol], yt = Y(d.hi) + 2, yb = Y(d.lo) - 2, ym = (yt + yb) / 2;
        return `<g class="f12-sp-br ${d.kol === 'h' ? 'hac' : 'kap'}" data-t="${k}"><rect class="f12-hit" x="${x - 9}" y="${q(yt)}" width="${L.hw}" height="${q(yb - yt)}"/><path d="M${x - 6} ${q(yt)}H${x}V${q(yb)}H${x - 6}"/><text class="f12-br-ad" x="${x + 6}" y="${q(ym - 1)}">${k}<tspan class="f12-br-isr"></tspan></text><text class="f12-br-v" x="${x + 6}" y="${q(ym + 13)}">${d.v}</text></g>`;
      }).join('');
      kutu.innerHTML = `<svg class="f12-svg f12-sp-svg${dar ? ' f12-dar' : ''}" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Spirogram: zamana karşı akciğer hacmi; dört hacim ve dört kapasite köşeli parantezlerle gösterilir">
        <defs>${tarama('f12-sp-tar')}</defs>
        ${g}
        <line class="f12-ax" x1="${L.x0}" x2="${L.x1}" y1="${L.y0}" y2="${L.y0}"/><line class="f12-ax" x1="${L.x0}" x2="${L.x0}" y1="${L.y0}" y2="${L.y1}"/>
        <text class="f12-tk" transform="translate(${dar ? 12 : 16} ${q((L.y0 + L.y1) / 2)}) rotate(-90)" text-anchor="middle">Akciğer hacmi (L)</text>
        <text class="f12-tk" x="${q((L.x0 + L.x1) / 2)}" y="${L.y0 + 34}" text-anchor="middle">Zaman (s)</text>
        <rect class="f12-sp-bant" x="${L.x0}" width="${L.x1 - L.x0}" y="0" height="0"/>
        <g class="f12-sp-rv"><rect x="${L.x0}" width="${L.x1 - L.x0}" y="${q(Y(1.5))}" height="${q(Y(0) - Y(1.5))}" fill="url(#f12-sp-tar)"/><text class="f12-sp-rvt" x="${q((L.x0 + L.x1) / 2)}" y="${q((Y(1.5) + Y(0)) / 2 + 4)}" text-anchor="middle">RV · spirometreye ulaşmaz</text></g>
        ${kes}
        <text class="f12-tk f12-sp-fl f12-halo" x="${L.x0 + 6}" y="${q(Y(3) + 14)}">${dar ? 'eksp. sonu' : 'ekspirasyon sonu'}</text>
        <path class="f12-sp-egri"/><circle class="f12-sp-uc" r="4.5"/>
        ${br}
      </svg>`;
      egri = kutu.querySelector('.f12-sp-egri'); uc = kutu.querySelector('.f12-sp-uc'); bant = kutu.querySelector('.f12-sp-bant'); rv = kutu.querySelector('.f12-sp-rv');
      brs = {}; kutu.querySelectorAll('.f12-sp-br').forEach((b) => { brs[b.dataset.t] = b; });
    };
    const egriCiz = () => {
      const n = Math.max(2, Math.ceil(tEnd / 0.08));
      let d = '';
      for (let i = 0; i <= n; i++) { const t = (i / n) * tEnd; d += (i ? 'L' : 'M') + q(L.X(t)) + ' ' + q(L.Y(V(t))); }
      egri.setAttribute('d', d); uc.setAttribute('cx', q(L.X(tEnd))); uc.setAttribute('cy', q(L.Y(V(tEnd))));
    };
    const vurguK = () => ((run || oyn) ? FAZ[faz].k : sec);
    const bilgiYaz = () => {
      const k = vurguK();
      if (!k) { bilgi.innerHTML = '<span class="f12-ipucu">Bir hacim ya da kapasite seçin: grafikte kapladığı aralık vurgulanır.</span>'; return; }
      const d = T[k];
      bilgi.innerHTML = `<div class="f12-sp-b1"><b>${k}</b> · ${d.ad} <i>(${d.en})</i></div><div class="f12-sp-b2"><span>${d.bil ? 'Bileşim: <b>' + d.bil + '</b>' : 'Hacim · doğrudan ölçülen büyüklük'}</span><span class="f12-sp-deger">${d.v} mL</span><span class="tag ${d.olc ? 'ok' : 'crit'}">Spirometreyle: ${d.olc ? 'ölçülür ✓' : 'ölçülemez ✗'}</span></div>`;
    };
    const vurgu = () => {
      const k = vurguK();
      Object.keys(brs).forEach((kk) => {
        const g = brs[kk], d = T[kk];
        sinifla(g, 'on', kk === k); sinifla(g, 'sol', !!k && kk !== k); sinifla(g, 'x', gor === 'olc' && !d.olc);
        if (L.dar && d.kol !== 'h') g.style.display = kk === k ? '' : 'none'; else g.style.display = '';
        const isr = g.querySelector('.f12-br-isr');
        isr.textContent = gor === 'olc' ? (d.olc ? ' ✓' : ' ✗') : '';
        isr.setAttribute('class', 'f12-br-isr ' + (d.olc ? 'ok' : 'crit'));
      });
      if (k) { bant.setAttribute('y', q(L.Y(T[k].hi))); bant.setAttribute('height', q(L.Y(T[k].lo) - L.Y(T[k].hi))); bant.style.display = ''; } else bant.style.display = 'none';
      rv.style.display = gor === 'olc' ? '' : 'none';
      el.querySelectorAll('button[data-t]').forEach((b) => {
        const d = T[b.dataset.t]; b.setAttribute('aria-pressed', String(b.dataset.t === sec));
        const i = b.querySelector('.f12-isr'); i.textContent = gor === 'olc' ? (d.olc ? ' ✓' : ' ✗') : ''; i.className = 'f12-isr ' + (d.olc ? 'ok' : 'crit');
      });
      bilgiYaz();
    };
    const capYaz = () => {
      if (run || oyn) cap(FAZ[faz].c);
      else if (sec) cap(CAP[sec]);
      else if (gor === 'olc') cap(OLC);
      else cap(null);
    };
    const btnYaz = () => { btn.textContent = run ? 'Duraklat' : (oyn && tEnd < TMAX ? 'Sürdür' : (oyn ? 'Yeniden oynat' : 'Kaydı oynat')); };
    const hepsi = () => { egriCiz(); vurgu(); capYaz(); btnYaz(); };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const g = e.target.closest('button[data-g]');
      if (g) { gor = g.dataset.g; basSec(el, 'g', gor); if (!run) oyn = false; hepsi(); return; }
      const t = e.target.closest('[data-t]');
      if (t) { const k = t.dataset.t; sec = sec === k ? null : k; run = false; oyn = false; tEnd = TMAX; faz = 3; hepsi(); return; }
      if (e.target.closest('[data-a="oynat"]')) {
        if (run) run = false;
        else if (oyn && tEnd < TMAX) run = true;
        else { oyn = true; if (RM) { tEnd = TMAX; run = false; } else { tEnd = 0; run = true; } }
        faz = fazOf(tEnd); hepsi();
      }
    });
    const durY = yerlesim(el, (dar) => { kur(dar); egriCiz(); vurgu(); });
    capYaz(); btnYaz();
    const durT = ticker(el, (dt) => {
      if (!run) return;
      tEnd = Math.min(TMAX, tEnd + (dt * TMAX) / 8);
      const f = fazOf(tEnd);
      egriCiz();
      if (f !== faz) { faz = f; vurgu(); capYaz(); }
      if (tEnd >= TMAX) { run = false; btnYaz(); }
    });
    return () => { durT(); durY(); };
  };

  /* ================= 2 · FRC bir denge hacmidir ================= */
  VIZ.f12_denge = (el) => {
    const cap = kapsiyon(el);
    const ETK = [['yok', 'Etken yok'], ['karin', 'Karın içi basıncı ↑'], ['anes', 'Anestezi'], ['fib', 'Fibrozis'], ['amf', 'Amfizem / yaş'], ['peep', 'PEEP'], ['ast', 'Astım']];
    const M = { yok: {}, karin: { Y: 600 }, anes: { kG: 0.8 }, fib: { kA: 1.6 }, amf: { kA: 0.6 }, peep: { P: 600 }, ast: { P: 600 } };
    const CAP = {
      ayak: '<b>Denge: FRC.</b> Ekspirasyonun sonunda solunum kasları gevşektir; akciğerin içe doğru elastik geri çekilmesi göğüs duvarının dışa yaylanmasına eşit ve zıttır. Ayakta duran 70 kg erkekte bu hacim yaklaşık 3000 mL\'dir. [[K1 s. 50–51]]',
      sirt: '<b>Sırtüstü.</b> Yalnızca sırtüstü yatmak FRC\'yi 1000 mL azaltır, yaklaşık 2000 mL\'ye. Modelde karın içeriği diyaframı göğse doğru iter ve dışa yaylanan göğüs duvarına ek bir yük olur (Atlas notu). [[K1 s. 51–52]]',
      karin: '<b>Karın içi basıncı artmış</b> (obezite, gebelik, akut batın, laparoskopik cerrahi): diyaframı iten yük büyür, denge daha düşük bir hacimde kurulur; FRC azalır. [[K1 s. 51]]',
      anes: '<b>Genel anestezi.</b> Ventilasyon spontan da olsa kontrollü de olsa FRC azalır. Nedeni bilinmez; göğüs kafesi kas tonusunun azalması (modelde dışa yaylanmanın zayıflaması) ve fizyolojik PEEP\'in kaybıyla ilişkili olduğu düşünülür. [[K1 s. 51]]',
      fib: '<b>Akciğer hastalığı.</b> Fibrozisle sertleşen akciğerin içe doğru geri çekilmesi artar (Atlas notu); denge daha düşük hacimdedir, FRC azalır. Kitap pulmoner ödem, atelektazi ve ARDS\'yi de FRC\'yi azaltanlar arasında sayar. [[K1 s. 51]]',
      amf: '<b>Amfizem ve ileri yaş.</b> Elastik doku yıkılır ya da azalır, içe doğru geri çekilme zayıflar; iki kuvvetin dengesi daha yüksek bir hacimde kurulur. FRC artar; amfizemde fıçı göğüs gelişir. [[K1 s. 51–52]]',
      peep: '<b>PEEP.</b> Ekspirasyon sonunda hava yollarında bırakılan pozitif basınç akciğeri daha büyük bir hacimde tutar; FRC artar. Özellikle pediatrik anestezide ve entübasyonla fizyolojik PEEP kaybolduktan sonra FRC\'yi korumak için kullanılır. [[K1 s. 51]]',
      ast: '<b>Astım.</b> Hava hapsi ve yüksek intrinsik PEEP: alveolde ekspirasyon sonunda basınç kalır, FRC artar. [[K1 s. 52]]',
    };
    const par = (pz, ek) => { const m = M[ek]; return { kA: m.kA || 1, kG: m.kG || 1, Y: (pz === 'sirt' ? 2000 : 0) + (m.Y || 0), P: m.P || 0 }; };
    const denge = (p) => (p.kA * 1000 + p.kG * 5000 - p.Y + p.P) / (p.kA + p.kG);
    const FA = (p, v) => p.kA * (v - 1000), FG = (p, v) => p.kG * (5000 - v) - p.Y + p.P;
    let poz = 'ayak', etk = 'yok', P = par(poz, etk), Vs = denge(P), Vc = Vs, V0 = Vs, ta = 1, dar = false;
    el.innerHTML = `<div class="f12-ust f12-dg-ctl">${segHtml('Pozisyon', 'p', [['ayak', 'Ayakta'], ['sirt', 'Sırtüstü']], 'ayak')}${segHtml('Etken', 'e', ETK, 'yok')}</div>
      <div class="f12-dg-cz"><div class="f12-dg-g"></div><div class="f12-dg-f"></div></div>
      <div class="f12-lej"><span style="--k:var(--c-basic)"><i></i>akciğer: içe geri çekilme</span><span style="--k:var(--c-clin)"><i></i>göğüs duvarı: dışa yaylanma</span><span style="--k:var(--warn)"><i></i>karın yükü</span><span style="--k:var(--ok)"><i></i>PEEP</span><span style="--k:var(--accent)"><i class="nok"></i>denge: FRC</span></div>`;
    const kG = el.querySelector('.f12-dg-g'), kF = el.querySelector('.f12-dg-f');
    let Lg, Lf, E = {};
    const kur = (d) => {
      dar = d;
      Lg = d ? { W: 340, H: 230, s: 0.72, cx: 170, cy: 110 } : { W: 300, H: 320, s: 1, cx: 150, cy: 152 };
      Lf = d ? { W: 340, H: 240, px0: 30, px1: 328, py0: 190, py1: 20 } : { W: 440, H: 320, px0: 44, px1: 428, py0: 266, py1: 22 };
      kG.innerHTML = `<svg class="f12-svg${d ? ' f12-dar' : ''}" viewBox="0 0 ${Lg.W} ${Lg.H}" role="img" aria-label="Göğüs kesiti: akciğer içe, göğüs duvarı dışa çeker; denge hacmi FRC">
        <line class="f12-dg-tr" x1="${Lg.cx}" y1="2" x2="${Lg.cx}"/>
        <ellipse class="f12-dg-hal" cx="${Lg.cx}" cy="${Lg.cy}"/>
        <ellipse class="f12-dg-akc" cx="${Lg.cx}" cy="${Lg.cy}"/>
        <g class="f12-dg-oklar"><path class="f12-ok-a"/><path class="f12-ok-a"/><path class="f12-ok-a"/><path class="f12-ok-a"/><path class="f12-ok-g"/><path class="f12-ok-g"/><path class="f12-ok-g"/><path class="f12-ok-g"/></g>
        <path class="f12-ok-y"/><path class="f12-ok-p"/><path class="f12-ok-p f12-ok-p2"/>
        <text class="f12-lb f12-dg-akl" x="${Lg.cx}" text-anchor="middle"></text>
        <text class="f12-tk f12-dg-yl"></text><text class="f12-tk f12-dg-yl2"></text>
        <text class="f12-tk f12-dg-pl"></text>
      </svg>`;
      let g = '';
      const X = (Lf.X = (v) => Lf.px0 + ((v - 1000) / 4000) * (Lf.px1 - Lf.px0)), Yf = (Lf.Y = (f) => Lf.py0 - (f / 4000) * (Lf.py0 - Lf.py1));
      for (let v = 1000; v <= 5000; v += 500) g += `<line class="f12-ax" x1="${q(X(v))}" x2="${q(X(v))}" y1="${Lf.py0}" y2="${Lf.py0 + (v % 1000 ? 3 : 6)}"/>`;
      g += `<line class="f12-dg-ref" x1="${q(X(2000))}" x2="${q(X(2000))}" y1="${Lf.py1}" y2="${Lf.py0}"/><line class="f12-dg-ref" x1="${q(X(3000))}" x2="${q(X(3000))}" y1="${Lf.py1}" y2="${Lf.py0}"/>`;
      g += `<text class="f12-tk" x="${q(X(2000))}" y="${Lf.py1 - 6}" text-anchor="middle">sırtüstü</text><text class="f12-tk" x="${q(X(3000))}" y="${Lf.py1 - 6}" text-anchor="middle">ayakta</text>`;
      g += `<text class="f12-tk" x="${q(X(2000))}" y="${Lf.py0 + 18}" text-anchor="middle">≈ 2000 mL</text><text class="f12-tk" x="${q(X(3000))}" y="${Lf.py0 + 18}" text-anchor="middle">3000 mL</text>`;
      kF.innerHTML = `<svg class="f12-svg${d ? ' f12-dar' : ''}" viewBox="0 0 ${Lf.W} ${Lf.H}" role="img" aria-label="Kuvvet–hacim grafiği: içe çekiş ile dışa yaylanmanın kesiştiği hacim FRC'dir">
        <defs><clipPath id="f12-dg-clip"><rect x="${Lf.px0}" y="${Lf.py1}" width="${Lf.px1 - Lf.px0}" height="${Lf.py0 - Lf.py1}"/></clipPath></defs>
        ${g}
        <line class="f12-ax" x1="${Lf.px0}" x2="${Lf.px1}" y1="${Lf.py0}" y2="${Lf.py0}"/><line class="f12-ax" x1="${Lf.px0}" x2="${Lf.px0}" y1="${Lf.py0}" y2="${Lf.py1}"/>
        <text class="f12-tk" x="${q((Lf.px0 + Lf.px1) / 2)}" y="${Lf.py0 + 38}" text-anchor="middle">Akciğer hacmi</text>
        <text class="f12-tk" transform="translate(${d ? 12 : 16} ${q((Lf.py0 + Lf.py1) / 2)}) rotate(-90)" text-anchor="middle">Kuvvet (ölçeksiz)</text>
        <g clip-path="url(#f12-dg-clip)"><line class="f12-dg-la"/><line class="f12-dg-lg"/><line class="f12-dg-gec"/><circle class="f12-dg-ga" r="4"/><circle class="f12-dg-gg" r="4"/></g>
        <line class="f12-dg-dik"/><circle class="f12-dg-nok" r="7"/>
        <text class="f12-lb f12-dg-ta f12-halo" style="fill:var(--c-basic)">içe çekiş</text>
        <text class="f12-lb f12-dg-tg f12-halo" style="fill:var(--c-clin)">dışa yaylanma</text>
        <text class="f12-lb f12-dg-frc f12-halo" style="fill:var(--accent-ink)"></text>
      </svg>`;
      E = {
        tr: kG.querySelector('.f12-dg-tr'), hal: kG.querySelector('.f12-dg-hal'), akc: kG.querySelector('.f12-dg-akc'),
        oka: [...kG.querySelectorAll('.f12-ok-a')], okg: [...kG.querySelectorAll('.f12-ok-g')], oky: kG.querySelector('.f12-ok-y'),
        okp: kG.querySelector('.f12-ok-p'), okp2: kG.querySelector('.f12-ok-p2'), akl: kG.querySelector('.f12-dg-akl'), yl: kG.querySelector('.f12-dg-yl'), yl2: kG.querySelector('.f12-dg-yl2'), pl: kG.querySelector('.f12-dg-pl'),
        la: kF.querySelector('.f12-dg-la'), lg: kF.querySelector('.f12-dg-lg'), gec: kF.querySelector('.f12-dg-gec'), ga: kF.querySelector('.f12-dg-ga'), gg: kF.querySelector('.f12-dg-gg'),
        dik: kF.querySelector('.f12-dg-dik'), nok: kF.querySelector('.f12-dg-nok'), ta: kF.querySelector('.f12-dg-ta'), tg: kF.querySelector('.f12-dg-tg'), frc: kF.querySelector('.f12-dg-frc'),
      };
    };
    const set = (e, o) => { for (const k in o) e.setAttribute(k, o[k]); };
    const cizGogus = () => {
      const { s, cx, cy } = Lg, r = s * (30 + 0.024 * Vc), rx = r * 1.12, ry = r, gp = 8 * s;
      set(E.akc, { rx: q(rx), ry: q(ry) }); set(E.hal, { rx: q(rx + gp), ry: q(ry + gp) });
      E.tr.setAttribute('y2', q(cy - ry + 2));
      sinifla(E.akc, 'sert', etk === 'fib'); sinifla(E.akc, 'gevsek', etk === 'amf'); sinifla(E.hal, 'kesik', etk === 'anes');
      const fa = FA(P, Vc), fg = FG(P, Vc), LA = s * (7 + Math.max(0, fa) * 0.011), LG = s * (7 + Math.max(0, fg) * 0.011);
      [45, 135, 225, 315].forEach((a, i) => {
        const t = (a * Math.PI) / 180, c = Math.cos(t), sn = Math.sin(t);
        const ex = cx + rx * c, ey = cy + ry * sn, hx = cx + (rx + gp) * c, hy = cy + (ry + gp) * sn;
        E.oka[i].setAttribute('d', okD(ex - c * 1, ey - sn * 1, ex - c * LA, ey - sn * LA, 7 * s));
        E.okg[i].setAttribute('d', okD(hx + c * 1, hy + sn * 1, hx + c * LG, hy + sn * LG, 7 * s));
      });
      const alt = cy + ry + gp;
      if (P.Y > 0) {
        E.oky.setAttribute('d', okD(cx, alt + 36 * s, cx, alt + 4 * s, 10 * s, 0.7)); E.oky.style.strokeWidth = q(s * (3 + P.Y / 500)); E.oky.style.display = '';
        if (dar) { set(E.yl, { x: q(cx + 14), y: q(alt + 26 * s) }); E.yl.textContent = 'karın yükü'; E.yl2.textContent = ''; }
        else { set(E.yl, { x: q(cx + 14), y: q(alt + 20) }); set(E.yl2, { x: q(cx + 14), y: q(alt + 34) }); E.yl.textContent = 'karın içeriği'; E.yl2.textContent = 'diyaframı iter'; }
      } else { E.oky.style.display = 'none'; E.yl.textContent = ''; E.yl2.textContent = ''; }
      const ust = cy - ry - gp;
      if (etk === 'peep') {
        E.okp.setAttribute('d', okD(cx + 11 * s, Math.max(4, ust - 24 * s), cx + 11 * s, ust + 10 * s, 7 * s)); E.okp.style.display = ''; E.okp2.style.display = 'none';
        set(E.pl, { x: q(cx + 20 * s), y: q(Math.max(13, ust - 6 * s)) }); E.pl.textContent = 'PEEP';
      } else if (etk === 'ast') {
        E.okp.setAttribute('d', okD(cx - 10 * s, cy + 16 * s, cx - rx * 0.62, cy + 16 * s, 7 * s)); E.okp2.setAttribute('d', okD(cx + 10 * s, cy + 16 * s, cx + rx * 0.62, cy + 16 * s, 7 * s));
        E.okp.style.display = ''; E.okp2.style.display = ''; E.pl.textContent = '';
      } else if (etk === 'anes') {
        E.okp.style.display = 'none'; E.okp2.style.display = 'none';
        set(E.pl, { x: q(cx + 12 * s), y: q(Math.max(13, ust - 6 * s)) }); E.pl.textContent = 'kas tonusu ↓';
      } else { E.okp.style.display = 'none'; E.okp2.style.display = 'none'; E.pl.textContent = ''; }
      E.akl.setAttribute('y', q(cy + (etk === 'ast' ? -4 : 4)));
      E.akl.textContent = etk === 'fib' ? 'sert akciğer' : etk === 'amf' ? 'elastik doku ↓' : etk === 'ast' ? 'intrinsik PEEP' : 'akciğer';
    };
    const cizGraf = () => {
      const { X, Y, px0, px1, py0, py1 } = Lf;
      set(E.la, { x1: q(X(1000)), y1: q(Y(FA(P, 1000))), x2: q(X(5000)), y2: q(Y(FA(P, 5000))) });
      set(E.lg, { x1: q(X(1000)), y1: q(Y(FG(P, 1000))), x2: q(X(5000)), y2: q(Y(FG(P, 5000))) });
      const Fs = FA(P, Vs);
      set(E.nok, { cx: q(X(Vs)), cy: q(Y(Fs)) }); set(E.dik, { x1: q(X(Vs)), x2: q(X(Vs)), y1: q(Y(Fs) + 7), y2: py0 });
      const taban = denge(par(poz, 'yok'));
      E.frc.textContent = Vs < taban - 1 ? 'FRC ↓' : Vs > taban + 1 ? 'FRC ↑' : 'FRC';
      set(E.frc, { x: q(X(Vs) + 6), y: q(py0 - 8) });
      // çizgi etiketleri: çizim alanında kalan bir noktada
      let va = 1000 + 3200 / P.kA; if (va > 4300) va = 4300;
      set(E.ta, { x: q(X(va) + 8), y: q(clamp(Y(FA(P, va)) + 16, py1 + 14, py0 - 24)) });
      let vg = 5000 - (3200 + P.Y - P.P) / P.kG; if (vg < 1150) vg = 1150;
      set(E.tg, { x: q(X(vg) + 8), y: q(clamp(Y(FG(P, vg)) - 4, py1 + 14, py0 - 24)) });
      // geçiş: anlık hacimde iki kuvvet
      const gor = Math.abs(Vc - Vs) > 8;
      [E.gec, E.ga, E.gg].forEach((e) => { e.style.display = gor ? '' : 'none'; });
      if (gor) { set(E.gec, { x1: q(X(Vc)), x2: q(X(Vc)), y1: py1, y2: py0 }); set(E.ga, { cx: q(X(Vc)), cy: q(Y(FA(P, Vc))) }); set(E.gg, { cx: q(X(Vc)), cy: q(Y(FG(P, Vc))) }); }
      void px0; void px1;
    };
    const capYaz = () => cap(etk === 'yok' ? CAP[poz] : CAP[etk]);
    const degis = () => {
      V0 = Vc; P = par(poz, etk); Vs = denge(P); ta = RM ? 1 : 0; if (RM) Vc = Vs;
      cizGogus(); cizGraf(); capYaz();
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const p = e.target.closest('button[data-p]'); if (p) { poz = p.dataset.p; basSec(el, 'p', poz); degis(); return; }
      const k = e.target.closest('button[data-e]'); if (k) { etk = k.dataset.e; basSec(el, 'e', etk); degis(); }
    });
    const durY = yerlesim(el, (d) => { kur(d); cizGogus(); cizGraf(); });
    capYaz();
    const durT = ticker(el, (dt) => {
      if (ta >= 1) return;
      ta = Math.min(1, ta + dt / 0.7); Vc = lerp(V0, Vs, yum(ta));
      cizGogus(); cizGraf();
    });
    return () => { durT(); durY(); };
  };

  /* ================= 3 · Apnede FRC: O₂ deposu ================= */
  VIZ.f12_apne = (el) => {
    const cap = kapsiyon(el);
    let gaz = 'hava', FRC = 2000, VO2 = 250, apox = false, mod = 'bos', tp = 0, ta = 0, bitti = false, dar = false;
    const n2 = (u) => (0.75 * (Math.exp(-4 * u) - Math.exp(-4))) / (1 - Math.exp(-4));
    const oran = () => (gaz === 'o2' ? 0.9 : 0.15);
    const dilim = () => (mod === 'preox' ? { o2: 0.9 - n2(tp), n2: n2(tp) } : gaz === 'o2' ? { o2: 0.9, n2: 0 } : { o2: 0.15, n2: 0.75 });
    const depo = () => FRC * dilim().o2, sure = () => depo() / VO2;
    el.innerHTML = `<div class="f12-ust">${segHtml('Solunan gaz', 'g', [['hava', 'Hava'], ['o2', '%100 O₂ (preoksijenasyon)']], 'hava')}<div class="btn-row"><button type="button" class="btn" data-a="apne">Apneyi başlat</button><button type="button" class="btn ghost" data-a="preox">Preoksijenasyonu oynat</button></div></div>
      <div class="f12-ap-ctl">
        <div class="f12-rng"><span>FRC <b data-o="frc"></b></span><input type="range" min="800" max="3000" step="100" value="2000" data-r="frc" aria-label="FRC (mL)"><div class="f12-hazir"><button type="button" class="btn ghost f12-kucuk" data-h="3000">Ayakta 3000</button><button type="button" class="btn ghost f12-kucuk" data-h="2000">Sırtüstü 2000</button></div></div>
        <div class="f12-rng"><span>O₂ tüketimi <b data-o="vo2"></b></span><input type="range" min="150" max="500" step="10" value="250" data-r="vo2" aria-label="O₂ tüketimi (mL/dk)"></div>
        <label class="f12-chk"><input type="checkbox" data-c="apox"><span>Hava yolu açık, %100 O₂ sürüyor (apneik oksijenasyon)</span></label>
      </div>
      <div class="f12-durum"><span class="f12-saat" data-o="saat">Apne: 0,0 dk</span><span class="tag crit" data-o="bitti" hidden>Akciğerdeki O₂ tükendi</span></div>
      <div class="f12-ap-cz"><div class="f12-ap-b"></div><div class="f12-ap-f"></div></div>
      <p class="f12-oku" data-o="oku"></p>`;
    const o = (k) => el.querySelector(`[data-o="${k}"]`);
    const kB = el.querySelector('.f12-ap-b'), kF = el.querySelector('.f12-ap-f'), btnA = el.querySelector('[data-a="apne"]'), chk = el.querySelector('[data-c="apox"]');
    let Lb, Lf, E = {};
    const NOK = Array.from({ length: 16 }, () => ({ on: false, x: 0, t: 0, dx: 0 }));
    let birikim = 0;
    const kur = (d) => {
      dar = d;
      Lb = d ? { W: 340, H: 108, yat: true, x0: 14, len: 312, y0: 34, kal: 30 } : { W: 220, H: 326, yat: false, x0: 70, w: 80, y0: 282, len: 240 };
      Lf = d ? { W: 340, H: 252, px0: 50, px1: 330, py0: 204, py1: 44, dx: 4, dy: 800, r1: 14, r2: 30 } : { W: 540, H: 320, px0: 60, px1: 524, py0: 262, py1: 46, dx: 2, dy: 400, r1: 14, r2: 30 };
      kB.innerHTML = `<svg class="f12-svg${d ? ' f12-dar' : ''}" viewBox="0 0 ${Lb.W} ${Lb.H}" role="img" aria-label="FRC içindeki alveoler gazın bileşimi: O₂, N₂, CO₂ ve su buharı">
        <line class="f12-ap-tup"/>
        <rect class="f12-ap-o2"/><rect class="f12-ap-tuk"/><rect class="f12-ap-n2"/><rect class="f12-ap-co2"/><rect class="f12-ap-cer"/>
        <text class="f12-tk f12-ap-tukt" text-anchor="middle">tüketildi</text>
        <g class="f12-ap-nok">${NOK.map(() => '<circle r="2.6"/>').join('')}</g>
        <path class="f12-ok-o2"/><text class="f12-tk f12-ap-apt"></text><text class="f12-tk f12-ap-apt2"></text>
        <text class="f12-lb f12-ap-l1">O₂</text><text class="f12-lb f12-ap-l2">N₂</text><text class="f12-lb f12-ap-l3">CO₂ + H₂O</text>
        <text class="f12-tk f12-ap-fl"></text><text class="f12-lb f12-ap-dl"></text>
      </svg>`;
      const X = (Lf.X = (m) => Lf.px0 + (m / 20) * (Lf.px1 - Lf.px0)), Y = (Lf.Y = (v) => Lf.py0 - (v / 2800) * (Lf.py0 - Lf.py1));
      let g = '';
      for (let v = 0; v <= 2800; v += Lf.dy) g += `<line class="f12-grid" x1="${Lf.px0}" x2="${Lf.px1}" y1="${q(Y(v))}" y2="${q(Y(v))}"/><text class="f12-tk" x="${Lf.px0 - 6}" y="${q(Y(v) + 4)}" text-anchor="end">${v}</text>`;
      for (let m = 0; m <= 20; m += Lf.dx) g += `<line class="f12-ax" x1="${q(X(m))}" x2="${q(X(m))}" y1="${Lf.py0}" y2="${Lf.py0 + 5}"/><text class="f12-tk" x="${q(X(m))}" y="${Lf.py0 + 18}" text-anchor="middle">${m}</text>`;
      const kitap = (m, y, t) => `<line class="f12-ap-kk" x1="${q(X(m))}" x2="${q(X(m))}" y1="${y + 4}" y2="${Lf.py0}"/><path class="f12-ap-ku" d="M${q(X(m) - 5)} ${Lf.py0 - 9}L${q(X(m) + 5)} ${Lf.py0 - 9}L${q(X(m))} ${Lf.py0 - 1}Z"/><text class="f12-tk f12-ap-kt" x="${q(X(m) - 3)}" y="${y}">${t}</text>`;
      g += kitap(1.2, Lf.r1, d ? 'kitap ≈1 dk' : 'kitap: hava, sırtüstü · 1 dk\'dan biraz uzun') + kitap(8, Lf.r2, d ? 'kitap ≈8 dk' : 'kitap: preoksijenasyon, sırtüstü · ≈ 8 dk');
      kF.innerHTML = `<svg class="f12-svg${d ? ' f12-dar' : ''}" viewBox="0 0 ${Lf.W} ${Lf.H}" role="img" aria-label="Apne süresine karşı akciğerdeki O₂ miktarı; tükenme noktası işaretli">
        ${g}
        <line class="f12-ax" x1="${Lf.px0}" x2="${Lf.px1}" y1="${Lf.py0}" y2="${Lf.py0}"/><line class="f12-ax" x1="${Lf.px0}" x2="${Lf.px0}" y1="${Lf.py0}" y2="${Lf.py1}"/>
        <text class="f12-tk" x="${q((Lf.px0 + Lf.px1) / 2)}" y="${Lf.py0 + 38}" text-anchor="middle">Apne süresi (dk)</text>
        <text class="f12-tk" transform="translate(${d ? 11 : 16} ${q((Lf.py0 + Lf.py1) / 2)}) rotate(-90)" text-anchor="middle">Akciğerdeki O₂ (mL)</text>
        <path class="f12-ap-ox"/><text class="f12-tk f12-ap-oxt f12-halo"></text>
        <line class="f12-ap-dog"/><circle class="f12-ap-bit" r="6"/><text class="f12-lb f12-ap-bitt f12-halo"></text>
        <circle class="f12-ap-imle" r="6"/>
      </svg>`;
      E = {
        tup: kB.querySelector('.f12-ap-tup'), o2: kB.querySelector('.f12-ap-o2'), tuk: kB.querySelector('.f12-ap-tuk'), tukt: kB.querySelector('.f12-ap-tukt'), n2: kB.querySelector('.f12-ap-n2'), co2: kB.querySelector('.f12-ap-co2'), cer: kB.querySelector('.f12-ap-cer'),
        nok: [...kB.querySelectorAll('.f12-ap-nok circle')], oko: kB.querySelector('.f12-ok-o2'), apt: kB.querySelector('.f12-ap-apt'), apt2: kB.querySelector('.f12-ap-apt2'),
        l: [kB.querySelector('.f12-ap-l1'), kB.querySelector('.f12-ap-l2'), kB.querySelector('.f12-ap-l3')], fl: kB.querySelector('.f12-ap-fl'), dl: kB.querySelector('.f12-ap-dl'),
        ox: kF.querySelector('.f12-ap-ox'), oxt: kF.querySelector('.f12-ap-oxt'), dog: kF.querySelector('.f12-ap-dog'), bit: kF.querySelector('.f12-ap-bit'), bitt: kF.querySelector('.f12-ap-bitt'), imle: kF.querySelector('.f12-ap-imle'),
      };
    };
    const set = (e, a) => { for (const k in a) e.setAttribute(k, a[k]); };
    const kalan = () => Math.max(0, depo() - VO2 * ta);
    const cizBar = () => {
      const dl = dilim(), dep = FRC * dl.o2, kal = mod === 'apne' || bitti ? kalan() : dep, f = dep > 0 ? kal / dep : 1;
      const tot = (FRC / 3000) * Lb.len, fo = dl.o2, fn = dl.n2, fc = 0.1;
      const apOn = apox && gaz === 'o2' && mod !== 'preox';
      if (!Lb.yat) {
        const x = Lb.x0, w = Lb.w, b = Lb.y0, top = b - tot, ho = tot * fo, hn = tot * fn, hc = tot * fc;
        set(E.o2, { x, width: w, y: q(b - ho * f), height: q(ho * f) });
        set(E.tuk, { x: x + 1, width: w - 2, y: q(b - ho), height: q(Math.max(0, ho * (1 - f) - 1)) });
        set(E.n2, { x, width: w, y: q(b - ho - hn), height: q(hn) }); set(E.co2, { x, width: w, y: q(top), height: q(hc) });
        set(E.cer, { x, width: w, y: q(top), height: q(tot) });
        set(E.tup, { x1: x + w / 2, x2: x + w / 2, y1: q(top), y2: q(top - 16) });
        const hk = ho * (1 - f); E.tukt.style.display = hk > 18 ? '' : 'none'; set(E.tukt, { x: x + w / 2, y: q(b - ho + hk / 2 + 4) });
        // dilim etiketleri: sağda, üst üste binmesin
        const ys = [b - (ho * f) / 2, b - ho - hn / 2, top + hc / 2];
        const ok = [true, fn > 0.01, true];
        ys[2] = Math.min(ys[2], b - tot + 12); let lim = ys[2] + 14;
        if (ok[1]) { ys[1] = Math.max(ys[1], lim); lim = ys[1] + 14; }
        ys[0] = Math.max(ys[0], lim);
        E.l.forEach((t, i) => { set(t, { x: x + w + 8, y: q(ys[i] + 4) }); t.style.display = ok[i] ? '' : 'none'; });
        set(E.fl, { x: x + w / 2, y: b + 20, 'text-anchor': 'middle' }); E.fl.textContent = `Alveoler gaz · FRC ${FRC} mL`;
        set(E.dl, { x: x + w / 2, y: b + 38, 'text-anchor': 'middle' });
        if (apOn) { E.oko.setAttribute('d', okD(x + w / 2 + 12, top - 34, x + w / 2 + 12, top - 4, 7)); set(E.apt, { x: x + w / 2 + 20, y: q(top - 22) }); set(E.apt2, { x: x + w / 2 + 20, y: q(top - 9) }); E.apt.textContent = 'O₂ içeri'; E.apt2.textContent = 'çekilir'; }
        E.noktaTaban = { x: x + w / 2, y: top - 16, yon: -1 };
      } else {
        const x = Lb.x0, y = Lb.y0, h = Lb.kal, wo = tot * fo, wn = tot * fn, wc = tot * fc;
        set(E.o2, { x, y, height: h, width: q(wo * f) });
        set(E.tuk, { x: q(x + wo * f), y: y + 1, height: h - 2, width: q(Math.max(0, wo * (1 - f) - 1)) });
        set(E.n2, { x: q(x + wo), y, height: h, width: q(wn) }); set(E.co2, { x: q(x + wo + wn), y, height: h, width: q(wc) });
        set(E.cer, { x, y, height: h, width: q(tot) });
        const cx = x + tot / 2;
        set(E.tup, { x1: q(cx), x2: q(cx), y1: y, y2: y - 16 });
        const wk = wo * (1 - f); E.tukt.style.display = wk > 60 ? '' : 'none'; set(E.tukt, { x: q(x + wo * f + wk / 2), y: y + h / 2 + 4 });
        // etiketler altta, soldan sağa çakışmasız
        const ws = [16, 16, 64], xs = [x + (wo * f) / 2, x + wo + wn / 2, x + wo + wn + wc / 2], ok = [true, fn > 0.01, true];
        let lim = -1e9;
        [0, 1, 2].forEach((i) => { if (!ok[i]) return; let s = xs[i] - ws[i] / 2; if (s < lim + 8) s = lim + 8; if (i === 2 && s + ws[i] > Lb.W - 4) s = Lb.W - 4 - ws[i]; xs[i] = s + ws[i] / 2; lim = s + ws[i]; });
        E.l.forEach((t, i) => { set(t, { x: q(xs[i]), y: y + h + 16, 'text-anchor': 'middle' }); t.style.display = ok[i] ? '' : 'none'; });
        E.fl.textContent = ''; set(E.dl, { x: x, y: y + h + 36, 'text-anchor': 'start' });
        if (apOn) { E.oko.setAttribute('d', okD(cx - 12, y - 28, cx - 12, y - 3, 6)); set(E.apt, { x: q(cx + 12), y: y - 14, 'text-anchor': 'start' }); E.apt.textContent = 'O₂ içeri çekilir'; E.apt2.textContent = ''; }
        E.noktaTaban = { x: cx, y: y - 16, yon: -1 };
      }
      E.oko.style.display = apOn ? '' : 'none'; if (!apOn) { E.apt.textContent = ''; E.apt2.textContent = ''; }
      E.dl.textContent = `O₂ deposu: ${tam(mod === 'apne' || bitti ? kal : dep)} mL`;
    };
    const cizNokta = () => {
      const b = E.noktaTaban || { x: 0, y: 0 };
      E.nok.forEach((c, i) => { const n = NOK[i]; if (!n.on) { c.setAttribute('opacity', 0); return; } c.setAttribute('cx', q(b.x + n.dx * n.t * 18)); c.setAttribute('cy', q(b.y - n.t * 26)); c.setAttribute('opacity', q(1 - n.t)); });
    };
    const cizGraf = () => {
      const { X, Y, px1, py0 } = Lf, dp = depo(), su = sure();
      set(E.dog, { x1: q(X(0)), y1: q(Y(dp)), x2: q(X(su)), y2: q(Y(0)) });
      set(E.bit, { cx: q(X(su)), cy: q(Y(0)) });
      const sag = X(su) + 8 + 110 > px1;
      set(E.bitt, { x: q(sag ? X(su) - 8 : X(su) + 8), y: q(py0 - 10), 'text-anchor': sag ? 'end' : 'start' });
      E.bitt.textContent = `tükendi: ${fmt(su)} dk`;
      const apOn = apox && gaz === 'o2';
      E.ox.style.display = apOn ? '' : 'none'; E.oxt.style.display = apOn ? '' : 'none';
      if (apOn) {
        const x1 = X(su) + 4, x2 = Math.min(px1, X(su + 4)), yy = py0 - 30;
        E.ox.setAttribute('d', okD(x1, yy, Math.max(x1 + 18, x2), yy, 7));
        const sagO = x1 + 190 > px1;
        set(E.oxt, { x: q(sagO ? Math.max(x1 + 18, x2) : x1), y: q(yy - 8), 'text-anchor': sagO ? 'end' : 'start' });
        E.oxt.textContent = dar ? 'süre uzar' : 'süre uzar (kitap miktar vermez)';
      }
      const im = mod === 'apne' || bitti;
      E.imle.style.display = im ? '' : 'none';
      if (im) set(E.imle, { cx: q(X(Math.min(ta, su))), cy: q(Y(kalan())) });
    };
    const capYaz = () => {
      if (mod === 'preox') { cap('<b>Preoksijenasyon.</b> Hasta bir süre (geleneksel olarak 3 dakika) %100 O₂ solur; FRC içindeki N₂ molekülleri zamanla O₂ molekülleriyle yer değiştirir. [[K1 s. 52]]'); return; }
      let c = gaz === 'hava'
        ? `<b>Hava solurken</b> akciğerdeki O₂ deposu küçüktür: ${FRC} mL × 0,15 ≈ ${tam(depo())} mL. ${VO2} mL/dk tüketimle yaklaşık ${fmt(sure())} dakikada biter. Kitaba göre sırtüstü erişkinde (FRC ≈ 2000 mL) bu süre 1 dakikadan biraz uzundur. [[K1 s. 52]]`
        : `<b>Preoksijenasyondan sonra</b> FRC'deki N₂ yerini O₂'ye bırakmıştır: ${FRC} mL × 0,9 ≈ ${tam(depo())} mL. Süre yaklaşık ${fmt(sure())} dakika; kitap sırtüstü erişkin (1800 mL) için yaklaşık 8 dakika verir (aradaki fark için alttaki model notu). [[K1 s. 52]]`;
      if (FRC < 2000 || VO2 > 250) c += ' FRC\'si azalmış ya da O₂ tüketimi artmış hastada kritik hipoksemi daha da hızlı gelişir. [[K1 s. 52]]';
      if (apox && gaz === 'o2') c += ' Tüketilen her beş O₂ molekülüne karşılık dört CO₂ molekülü üretildiği (RQ 0,8) için apnede akciğer hacmi küçülür; hava yolu açıksa O₂ içeri çekilir ve hipoksemiye kadar geçen süre uzar. [[K1 s. 52]]';
      cap(c);
    };
    const yaz = () => {
      o('frc').textContent = `${FRC} mL`; o('vo2').textContent = `${VO2} mL/dk`;
      const f = mod === 'preox' ? 0.9 - n2(tp) : oran(), dp = FRC * f;
      o('oku').innerHTML = `O₂ deposu = ${FRC} mL × ${fmt(f, 2).replace(/0$/, '')} ≈ <b>${tam(dp)} mL</b> · Tüketim ${VO2} mL/dk · Süre ≈ ${tam(dp)} ÷ ${VO2} ≈ <b>${fmt(dp / VO2)} dk</b>`;
      o('saat').textContent = mod === 'preox' ? `Preoksijenasyon: ${fmt(tp * 3)} / 3 dk` : `Apne: ${fmt(mod === 'apne' || bitti ? Math.min(ta, sure()) : 0)} dk`;
      o('bitti').hidden = !bitti;
      btnA.textContent = mod === 'apne' ? 'Duraklat' : (bitti ? 'Apneyi yeniden başlat' : (ta > 0 ? 'Sürdür' : 'Apneyi başlat'));
      chk.disabled = gaz !== 'o2'; chk.closest('label').classList.toggle('pasif', gaz !== 'o2');
      basSec(el, 'g', gaz);
    };
    const hepsi = () => { yaz(); cizBar(); cizNokta(); cizGraf(); capYaz(); };
    const sifirla = () => { mod = 'bos'; ta = 0; bitti = false; };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const g = e.target.closest('button[data-g]'); if (g) { gaz = g.dataset.g; sifirla(); hepsi(); return; }
      const h = e.target.closest('button[data-h]'); if (h) { FRC = +h.dataset.h; el.querySelector('[data-r="frc"]').value = FRC; sifirla(); hepsi(); return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'apne') {
        if (mod === 'preox') return;
        if (mod === 'apne') mod = 'bos';
        else { if (bitti) { ta = 0; bitti = false; } if (RM) { ta = sure(); bitti = true; mod = 'bos'; } else mod = 'apne'; }
        hepsi();
      } else if (a.dataset.a === 'preox') {
        sifirla(); gaz = 'hava';
        if (RM) { gaz = 'o2'; } else { mod = 'preox'; tp = 0; }
        hepsi();
      }
    });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]');
      if (r) { if (r.dataset.r === 'frc') FRC = +r.value; else VO2 = +r.value; if (mod === 'preox') { mod = 'bos'; gaz = 'o2'; } sifirla(); hepsi(); return; }
      const c = e.target.closest('[data-c]'); if (c) { apox = c.checked; hepsi(); }
    });
    const durY = yerlesim(el, (d) => { kur(d); cizBar(); cizNokta(); cizGraf(); });
    hepsi();
    const durT = ticker(el, (dt) => {
      if (mod === 'preox') {
        tp = Math.min(1, tp + dt / 3);
        birikim += dt * 9 * (n2(tp) / 0.75 + 0.1);
        while (birikim >= 1) { birikim -= 1; const n = NOK.find((k) => !k.on); if (n) { n.on = true; n.t = 0; n.dx = (Math.random() - 0.5) * 1.6; } }
        if (tp >= 1) { mod = 'bos'; gaz = 'o2'; hepsi(); } else { yaz(); cizBar(); cizGraf(); }
      } else if (mod === 'apne') {
        ta += dt / 0.6;
        if (ta >= sure()) { ta = sure(); bitti = true; mod = 'bos'; hepsi(); } else { yaz(); cizBar(); cizGraf(); }
      }
      let any = false;
      NOK.forEach((n) => { if (n.on) { any = true; n.t += dt / 1.1; if (n.t >= 1) n.on = false; } });
      if (any || mod === 'preox') cizNokta();
    });
    return () => { durT(); durY(); };
  };

  /* ================= 4 · Helyum dilüsyonu adım adım ================= */
  VIZ.f12_he = (el) => {
    const cap = kapsiyon(el);
    const V1 = 3000, C1 = 10, N = 60, HAPS = 1000;
    let mod = 'frc', FRC = 3000, haps = false, adim = 1, ta = 0, dar = false, zaman = 0, L, G, E = {};
    const hesap = () => { const VA = mod === 'tlc' ? FRC + 3000 : FRC, Vb = haps ? VA - HAPS : VA, C2 = (C1 * V1) / (V1 + Vb); return { VA, Vb, C2, olc: (V1 * (C1 - C2)) / C2 }; };
    el.innerHTML = `<div class="f12-ust">${segHtml('Kapağın açıldığı hacim', 'm', [['frc', 'FRC\'de aç'], ['tlc', 'TLC\'de aç']], 'frc')}<label class="f12-chk"><input type="checkbox" data-c="haps"><span>Hava hapsi (KOAH)</span></label></div>
      <div class="f12-he-ctl"><div class="f12-rng"><span>Gerçek FRC <b data-o="frc"></b></span><input type="range" min="1500" max="4500" step="100" value="3000" data-r="frc" aria-label="Gerçek FRC (mL)"></div>${adimHtml(5)}</div>
      <div class="f12-he-cz"></div>
      <p class="f12-he-dk" data-o="dk"></p>
      <div class="f12-he-kar">
        <div class="f12-he-sat"><span>Gerçek hacim</span><div class="f12-he-bar"><i class="ger" data-o="bger"></i></div><b data-o="vger"></b></div>
        <div class="f12-he-sat"><span>Hesaplanan</span><div class="f12-he-bar"><i class="hes" data-o="bhes"></i><i class="fark" data-o="bfark"></i></div><b data-o="vhes"></b></div>
        <p class="f12-he-fark" data-o="tfark"></p>
      </div>`;
    const o = (k) => el.querySelector(`[data-o="${k}"]`);
    const kutu = el.querySelector('.f12-he-cz');
    const PARC = Array.from({ length: N }, (_, i) => { const r = seedRnd(i * 7919 + 17); return { r1: r(), r2: r(), ph: r() * 6.28, i }; });
    const geo = () => {
      const h = hesap(), k = L.k;
      const sp = { x: L.spx, y: L.spy, w: L.sw, h: (V1 * k) / L.sw };
      const A = (h.VA * k) / 2, rx = Math.sqrt(A / (Math.PI * L.asp)), ry = rx * L.asp;
      const lob = L.lob.map((cx) => ({ cx, cy: L.lobY, rx, ry }));
      let z = null;
      if (haps) { const fr = HAPS / h.VA; let a = -1, b = 1; for (let i = 0; i < 50; i++) { const m = (a + b) / 2, f = (Math.acos(m) - m * Math.sqrt(1 - m * m)) / Math.PI; if (f > fr) a = m; else b = m; } z = (a + b) / 2; }
      return { h, sp, lob, z };
    };
    const yolUzun = (pts) => { const c = [0]; for (let i = 1; i < pts.length; i++) c.push(c[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return c; };
    const yolNokta = (pts, cum, u) => {
      const d = u * cum[cum.length - 1]; let i = 1; while (i < cum.length - 1 && cum[i] < d) i++;
      const f = cum[i] === cum[i - 1] ? 0 : (d - cum[i - 1]) / (cum[i] - cum[i - 1]);
      return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)];
    };
    const kur = () => {
      L = dar
        ? { W: 340, H: 452, k: 5.55, spx: 20, spy: 46, sw: 170, asp: 1.28, lob: [92, 248], lobY: 316, trX: 170, trY: 216, cikis: (sp) => [sp.x + sp.w - 6, sp.y + 22], tup: (sp) => [[sp.x + sp.w, sp.y + 22], [306, sp.y + 22], [306, 202], [170, 202], [170, 216]], kap: [306, 132] }
        : { W: 760, H: 346, k: 6, spx: 40, spy: 92, sw: 200, asp: 1.75, lob: [540, 680], lobY: 192, trX: 610, trY: 60, cikis: (sp) => [sp.x + sp.w - 26, sp.y + 6], tup: (sp) => [[sp.x + sp.w - 26, sp.y], [sp.x + sp.w - 26, 34], [610, 34], [610, 60]], kap: [380, 34] };
      G = geo();
      const { sp, lob, z } = G;
      const tp = L.tup(sp);
      const bron = lob.map((l) => { const dx = (l.cx < L.trX ? 1 : -1) * l.rx * 0.35; return [l.cx + dx, l.cy - l.ry * Math.sqrt(1 - 0.1225) + 4]; });
      const tupD = 'M' + tp.map((p) => q(p[0]) + ' ' + q(p[1])).join('L') + bron.map((b) => `M${L.trX} ${L.trY}L${q(b[0])} ${q(b[1])}`).join('');
      const seal = `<rect class="f12-he-su" x="${sp.x - 10}" y="${q(sp.y + sp.h)}" width="${sp.w + 20}" height="22" rx="3"/>${[0, 1, 2].map((i) => `<line class="f12-he-sudl" x1="${sp.x - 4}" x2="${sp.x + sp.w + 4}" y1="${q(sp.y + sp.h + 6 + i * 6)}" y2="${q(sp.y + sp.h + 6 + i * 6)}"/>`).join('')}`;
      const lobD = lob.map((l) => `<ellipse class="f12-he-lob" cx="${q(l.cx)}" cy="${q(l.cy)}" rx="${q(l.rx)}" ry="${q(l.ry)}"/>`).join('');
      let hapsD = '';
      if (z != null) {
        hapsD = lob.map((l) => {
          const yc = l.cy + z * l.ry, hw = l.rx * Math.sqrt(1 - z * z);
          return `<path class="f12-he-hap" d="M${q(l.cx - hw)} ${q(yc)}A${q(l.rx)} ${q(l.ry)} 0 ${z < 0 ? 1 : 0} 0 ${q(l.cx + hw)} ${q(yc)}Z" fill="url(#f12-he-tar)"/><line class="f12-he-duv" x1="${q(l.cx - hw)}" x2="${q(l.cx + hw)}" y1="${q(yc)}" y2="${q(yc)}"/><path class="f12-he-x" d="M${q(l.cx - 5)} ${q(yc - 5)}L${q(l.cx + 5)} ${q(yc + 5)}M${q(l.cx + 5)} ${q(yc - 5)}L${q(l.cx - 5)} ${q(yc + 5)}"/>`;
        }).join('') + `<text class="f12-lb f12-he-hapt" x="${L.trX}" y="${q(L.lobY + lob[0].ry + 34)}" text-anchor="middle">hapsolmuş gaz · ${HAPS} mL</text>`;
      }
      hapsD += `<text class="f12-lb f12-he-akl" x="${L.trX}" y="${q(L.lobY + lob[0].ry + 18)}" text-anchor="middle"></text>`;
      const [kx, ky] = L.kap;
      const etiket = dar
        ? `<text class="f12-lb" x="${sp.x}" y="${sp.y - 26}">Spirometre · V₁ = ${V1} mL</text><text class="f12-tk" x="200" y="${sp.y + 38}">He</text><text class="f12-he-c" x="200" y="${sp.y + 60}"></text><text class="f12-tk" x="${kx - 16}" y="${ky + 4}" text-anchor="end">kapak</text>`
        : `<text class="f12-lb" x="${sp.x}" y="${sp.y - 14}">Spirometre · V₁ = ${V1} mL</text><text class="f12-tk" x="${sp.x + sp.w / 2}" y="${q(sp.y + sp.h + 46)}" text-anchor="middle">spirometredeki He</text><text class="f12-he-c" x="${sp.x + sp.w / 2}" y="${q(sp.y + sp.h + 70)}" text-anchor="middle"></text><text class="f12-tk" x="${kx}" y="${ky - 15}" text-anchor="middle">kapak</text>`;
      kutu.innerHTML = `<svg class="f12-svg f12-he-svg${dar ? ' f12-dar' : ''}" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Helyum dilüsyonu: spirometredeki He akciğerle dengelenir; hapsolmuş gaza ulaşamaz">
        <defs>${tarama('f12-he-tar')}</defs>
        <path class="f12-he-tup" d="${tupD}"/>
        ${lobD}${hapsD}
        ${seal}
        <rect class="f12-he-sp" x="${sp.x}" y="${sp.y}" width="${sp.w}" height="${q(sp.h)}" rx="6"/>
        <g class="f12-he-kap" transform="translate(${kx} ${ky})"><circle r="11"/><line class="f12-he-kc" x1="0" y1="-9" x2="0" y2="9"/></g>
        ${etiket}
        <g class="f12-he-p">${PARC.map(() => `<circle r="${dar ? 2.6 : 3}"/>`).join('')}</g>
      </svg>`;
      E = { akl: kutu.querySelector('.f12-he-akl'), c: kutu.querySelector('.f12-he-c'), kap: kutu.querySelector('.f12-he-kap'), kc: kutu.querySelector('.f12-he-kc'), p: [...kutu.querySelectorAll('.f12-he-p circle')] };
      // tanecikler: evde (spirometre) ve hedefte (akciğerin bağlantılı bölümü)
      const nS = Math.round((N * V1) / (V1 + G.h.Vb)), mig = [];
      PARC.forEach((pt, i) => {
        pt.hx = sp.x + 6 + pt.r1 * (sp.w - 12); pt.hy = sp.y + 6 + pt.r2 * (sp.h - 12);
        pt.gc = i >= nS;
        if (pt.gc) {
          const l = lob[i % 2], r = seedRnd(i * 104729 + Math.round(G.h.VA) + (haps ? 7 : 0));
          let x = l.cx, y = l.cy;
          for (let k = 0; k < 200; k++) {
            const a = (r() * 2 - 1) * 0.86, b = (r() * 2 - 1) * 0.86;
            if (a * a + b * b > 0.74) continue;
            const yy = l.cy + b * l.ry; if (z != null && yy > l.cy + z * l.ry - 6) continue;
            x = l.cx + a * l.rx; y = yy; break;
          }
          pt.tx = x; pt.ty = y;
          const b = bron[i % 2];
          pt.yol = [[pt.hx, pt.hy], L.cikis(sp), ...tp, [b[0], b[1]], [x, y]];
          pt.cum = yolUzun(pt.yol);
          mig.push(pt);
        }
      });
      mig.forEach((pt, j) => { pt.s0 = (j / Math.max(1, mig.length)) * 0.55; });
    };
    const cizParc = () => {
      E.p.forEach((c, i) => {
        const pt = PARC[i]; let x, y, yolda = false;
        if (!pt.gc || adim < 3) { x = pt.hx; y = pt.hy; }
        else if (adim > 3 || ta >= 1) { x = pt.tx; y = pt.ty; }
        else { const u = clamp((ta - pt.s0) / 0.45, 0, 1); yolda = u > 0 && u < 1; [x, y] = yolNokta(pt.yol, pt.cum, yum(u)); }
        if (!RM && !yolda) { x += 1.8 * Math.sin(zaman * 1.3 + pt.ph); y += 1.8 * Math.cos(zaman * 1.1 + pt.ph * 1.7); }
        c.setAttribute('cx', q(x)); c.setAttribute('cy', q(y));
      });
    };
    const capYaz = () => {
      const h = hesap(), C2 = fmt(h.C2, 2), tl = mod === 'tlc', ad = tl ? 'TLC' : 'FRC';
      const r2 = Math.round(h.C2 * 100) / 100, yak = Math.abs((V1 * (C1 - r2)) / r2 - h.Vb) > 1;
      const C = {
        1: '<b>1 · Başlangıç.</b> Spirometrede bilinen hacimde (V₁ = 3000 mL) ve konsantrasyonda (C₁ = %10) He vardır; He miktarı C₁ × V₁\'dir (mol sayısı = konsantrasyon × hacim). ' + (tl ? 'Hasta tam bir inspirasyon yapmıştır; akciğerdeki hacim TLC\'dir. [[K1 s. 52–53]]' : 'Tidal ekspirasyonun sonunda akciğerdeki hacim FRC\'dir. [[K1 s. 52–53]]'),
        2: tl ? '<b>2 · Kapak açılır.</b> Spirometre tam bir inspirasyondan sonra, TLC\'de açılır; hesap bu kez TLC\'yi verir. [[K1 s. 53]]' : '<b>2 · Kapak açılır.</b> Tidal ekspirasyonun sonunda spirometre hastaya açılır. [[K1 s. 53]]',
        3: '<b>3 · Dengelenme.</b> Hasta spirometre üzerinden soluk alıp verir; He akciğerle spirometre arasında eşit dağılana kadar karışır. He kana neredeyse hiç geçmediği için miktarı değişmez, yalnızca daha büyük bir hacme yayılır. [[K1 s. 52–53]]' + (haps ? ' Hapsolmuş bölgenin hava yolu kapalıdır; He oraya ulaşamaz. [[K1 s. 53]]' : ''),
        4: `<b>4 · C₂ ölçülür.</b> Spirometredeki yeni He konsantrasyonu %${C2}'dir: aynı miktar He artık V₁ + akciğer hacmine dağılmıştır. [[K1 s. 53]]`,
        5: `<b>5 · Hesap.</b> C₁V₁ = C₂(V₁ + ${ad}) ⇒ ${ad} = V₁ × (C₁ − C₂) / C₂ = 3000 × (10 − ${C2}) / ${C2} ${yak ? '≈' : '='} ${tam(h.olc)} mL. [[K1 s. 53]]` + (haps ? ` Gerçek hacim ${tam(h.VA)} mL'dir: hapsolmuş 1000 mL hesaba girmedi, yöntem olduğundan düşük ölçtü (KOAH'ta hava hapsi). [[K1 s. 53]]` : ''),
      };
      cap(C[adim]);
    };
    const yaz = () => {
      const h = hesap(), tl = mod === 'tlc', ad = tl ? 'TLC' : 'FRC';
      o('frc').textContent = `${FRC} mL${tl ? ` · TLC ${FRC + 3000} mL` : ''}`;
      const c = adim < 3 ? C1 : adim === 3 ? lerp(C1, h.C2, yum(ta)) : h.C2;
      E.c.textContent = `%${fmt(c, 2)}`; sinifla(E.c, 'on', adim === 4);
      E.akl.textContent = adim === 5 ? `Akciğer · hesaplanan ${ad} = ${tam(h.olc)} mL` : `Akciğer · ${ad} bilinmiyor`;
      const acik = adim >= 2; sinifla(E.kap, 'acik', acik); E.kc.setAttribute('transform', acik ? (dar ? 'rotate(0)' : 'rotate(90)') : (dar ? 'rotate(90)' : 'rotate(0)'));
      const r2 = Math.round(h.C2 * 100) / 100, yak = Math.abs((V1 * (C1 - r2)) / r2 - h.Vb) > 1;
      o('dk').innerHTML = adim === 5 ? `${ad} = V₁ × (C₁ − C₂) / C₂ = 3000 × (10 − ${fmt(h.C2, 2)}) / ${fmt(h.C2, 2)} ${yak ? '≈' : '='} <b>${tam(h.olc)} mL</b>` : `C₁V₁ = C₂(V₁ + ${ad}) <span>· C₂ ${adim >= 4 ? '= %' + fmt(h.C2, 2) : 'henüz ölçülmedi'}</span>`;
      const W = (v) => `${((v / 7500) * 100).toFixed(1)}%`;
      o('bger').style.width = W(h.VA); o('vger').textContent = `${tam(h.VA)} mL`;
      const son = adim === 5;
      o('bhes').style.width = son ? W(h.olc) : '0%'; o('vhes').textContent = son ? `${tam(h.olc)} mL` : '?';
      o('bfark').style.width = son && haps ? W(HAPS) : '0%'; o('bfark').style.left = son ? W(h.olc) : '0%';
      o('tfark').textContent = son && haps ? 'Taralı bölüm: hesaba girmeyen 1000 mL (hapsolmuş gaz)' : '';
      adimYaz(el, adim, 5);
    };
    const git = (a) => { adim = clamp(a, 1, 5); if (adim === 3) ta = RM ? 1 : 0; yaz(); cizParc(); capYaz(); };
    const yeniden = () => { adim = 1; ta = 0; kur(); yaz(); cizParc(); capYaz(); };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const m = e.target.closest('button[data-m]'); if (m) { mod = m.dataset.m; basSec(el, 'm', mod); yeniden(); return; }
      const n = e.target.closest('button[data-n]'); if (n) { git(+n.dataset.n); return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'geri') git(adim - 1); else if (a.dataset.a === 'ileri') git(adim + 1); else if (a.dataset.a === 'bas') git(1);
    });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (r) { FRC = +r.value; yeniden(); return; }
      const c = e.target.closest('[data-c]'); if (c) { haps = c.checked; yeniden(); }
    });
    const durY = yerlesim(el, (d) => { dar = d; kur(); yaz(); cizParc(); });
    capYaz();
    const durT = ticker(el, (dt) => {
      zaman += dt;
      if (adim === 3 && ta < 1) { ta = Math.min(1, ta + dt / 3); yaz(); }
      cizParc();
    });
    return () => { durT(); durY(); };
  };

  /* ================= 5 · Vücut pletismografisi ================= */
  VIZ.f12_pleth = (el) => {
    const cap = kapsiyon(el);
    const P1 = 101.3, V1 = 500000, HAPS = 1000;
    let dV = 40, FRC = 3000, haps = false, adim = 1, p = 0, dar = false, S = 1, E = {};
    const hes = () => { const P2 = (P1 * V1) / (V1 - dV), P4 = (P1 * FRC) / (FRC + dV); return { P2, P4, dPa: (P2 - P1) * 1000, dk: P1 - P4, cm: (P1 - P4) * 10.2, dVh: (V1 * (P2 - P1)) / P2, FRCh: (P4 * dV) / (P1 - P4) }; };
    el.innerHTML = `<div class="f12-pl-ctl"><div class="f12-rng"><span>İnspirasyon çabası ΔV <b data-o="dv"></b></span><input type="range" min="10" max="60" step="5" value="40" data-r="dv" aria-label="İnspirasyon çabasında akciğer hacmindeki artış ΔV (mL)"></div><div class="f12-rng"><span>Gerçek FRC <b data-o="frc"></b></span><input type="range" min="2000" max="4500" step="100" value="3000" data-r="frc" aria-label="Gerçek FRC (mL)"></div><label class="f12-chk"><input type="checkbox" data-c="haps"><span>Hapsolmuş gaz (1000 mL)</span></label></div>
      ${adimHtml(5)}
      <div class="f12-pl-cz"><div class="f12-pl-k"></div>
        <div class="f12-pl-hesap">
          <div class="f12-pl-satir" data-o="s1"><span class="tag basic">Önce kabin</span><p>P₁V₁ = P₂(V₁ − ΔV) → <b data-o="r1"></b></p></div>
          <div class="f12-pl-satir" data-o="s2"><span class="tag basic">Sonra akciğer</span><p>P₃ × FRC = P₄(FRC + ΔV) → FRC = P₄ΔV / (P₃ − P₄) = <b data-o="r2"></b></p></div>
          <dl class="f12-pl-deg">
            <div><dt>P₁ · kabin, önce</dt><dd>101,300 kPa</dd></div><div><dt>V₁ · kabin gaz hacmi</dt><dd>500 L</dd></div>
            <div><dt>P₂ · kabin, çabadan sonra</dt><dd data-o="p2"></dd></div><div><dt>P₃ · ağız, önce</dt><dd>101,300 kPa</dd></div>
            <div><dt>P₄ · ağız, çabadan sonra</dt><dd data-o="p4"></dd></div><div><dt>ΔV · hesaplanan</dt><dd data-o="dvh"></dd></div>
          </dl>
          <p class="f12-pl-he" data-o="he"></p>
        </div></div>`;
    const o = (k) => el.querySelector(`[data-o="${k}"]`);
    const kutu = el.querySelector('.f12-pl-k');
    const kur = () => {
      S = dar ? 0.81 : 1;
      const s = (v) => q(v * S), W = dar ? 340 : 420, H = dar ? 300 : 364;
      const gauge = (cx, cy, cls) => `<g class="f12-pl-gs ${cls}"><circle class="f12-pl-gd" cx="${s(cx)}" cy="${s(cy)}" r="${s(22)}"/>${[-60, -30, 0, 30, 60].map((a) => { const t = ((a - 90) * Math.PI) / 180; return `<line class="f12-pl-gt" x1="${q(cx * S + Math.cos(t) * 16 * S)}" y1="${q(cy * S + Math.sin(t) * 16 * S)}" x2="${q(cx * S + Math.cos(t) * 21 * S)}" y2="${q(cy * S + Math.sin(t) * 21 * S)}"/>`; }).join('')}<line class="f12-pl-ib" x1="${s(cx)}" y1="${s(cy)}" x2="${s(cx)}" y2="${s(cy - 17)}"/><circle class="f12-pl-gm" cx="${s(cx)}" cy="${s(cy)}" r="${s(3)}"/></g>`;
      const lbl = dar
        ? `<text class="f12-lb" x="${s(330)}" y="${s(62)}" text-anchor="end">kabin P</text><text class="f12-tk" x="${s(330)}" y="${s(62) * 1 + 14}" text-anchor="end">P₁ → P₂</text><text class="f12-pl-v" x="${s(330)}" y="${s(62) * 1 + 29}" text-anchor="end" data-o="gk"></text>
           <text class="f12-lb" x="${s(300)}" y="${s(216)}" text-anchor="middle">ağız P</text><text class="f12-tk" x="${s(300)}" y="${s(216) * 1 + 14}" text-anchor="middle">P₃ → P₄</text><text class="f12-pl-v" x="${s(300)}" y="${s(216) * 1 + 29}" text-anchor="middle" data-o="ga"></text>`
        : `<text class="f12-lb" x="326" y="62" text-anchor="end">kabin basıncı</text><text class="f12-tk" x="326" y="77" text-anchor="end">P₁ → P₂</text><text class="f12-pl-v" x="326" y="94" text-anchor="end" data-o="gk"></text>
           <text class="f12-lb" x="300" y="216" text-anchor="middle">ağız (= alveol) basıncı</text><text class="f12-tk" x="300" y="231" text-anchor="middle">P₃ → P₄</text><text class="f12-pl-v" x="300" y="248" text-anchor="middle" data-o="ga"></text><text class="f12-tk" x="300" y="263" text-anchor="middle" data-o="ga2"></text>`;
      kutu.innerHTML = `<svg class="f12-svg f12-pl-svg${dar ? ' f12-dar' : ''}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Vücut kabininde oturan hasta; ağızlık kapağı, ağız ve kabin basınç göstergeleri">
        <defs>${tarama('f12-pl-tar')}</defs>
        <text class="f12-lb" x="${s(14)}" y="${s(18) * 1 + 2}">Vücut kabini · hava geçirmez</text>
        <rect class="f12-pl-kab" x="${s(10)}" y="${s(30)}" width="${s(400)}" height="${s(326)}" rx="${s(22)}"/>
        <line class="f12-pl-duv" x1="${s(378)}" y1="${s(70)}" x2="${s(410)}" y2="${s(70)}"/>
        <g class="f12-pl-san"><line x1="${s(96)}" y1="${s(160)}" x2="${s(96)}" y2="${s(262)}"/><line x1="${s(92)}" y1="${s(262)}" x2="${s(200)}" y2="${s(262)}"/><line x1="${s(104)}" y1="${s(262)}" x2="${s(104)}" y2="${s(330)}"/><line x1="${s(190)}" y1="${s(262)}" x2="${s(190)}" y2="${s(330)}"/></g>
        <rect class="f12-pl-gov" x="${s(112)}" y="${s(150)}" height="${s(108)}" rx="${s(18)}"/>
        <rect class="f12-pl-dv" y="${s(156)}" height="${s(96)}" rx="${s(4)}"/>
        <rect class="f12-pl-bac" x="${s(150)}" y="${s(244)}" width="${s(84)}" height="${s(22)}" rx="${s(9)}"/><rect class="f12-pl-bac" x="${s(214)}" y="${s(256)}" width="${s(19)}" height="${s(76)}" rx="${s(8)}"/><rect class="f12-pl-bac" x="${s(212)}" y="${s(326)}" width="${s(36)}" height="${s(9)}" rx="${s(4)}"/>
        <rect class="f12-pl-bac" x="${s(141)}" y="${s(136)}" width="${s(18)}" height="${s(18)}"/>
        <circle class="f12-pl-bas" cx="${s(150)}" cy="${s(118)}" r="${s(23)}"/>
        <ellipse class="f12-pl-akc" data-i="0" cy="${s(198)}"/><ellipse class="f12-pl-akc" data-i="1" cy="${s(198)}"/>
        <path class="f12-pl-hap" fill="url(#f12-pl-tar)"/><path class="f12-pl-hx"/>
        <text class="f12-lb f12-pl-hapt" x="${s(20)}" y="${s(196)}" style="fill:var(--crit)">hapsolmuş</text><text class="f12-tk f12-pl-hapt" x="${s(20)}" y="${s(196) * 1 + 14}">${HAPS} mL</text><line class="f12-pl-hapl f12-pl-hapt" x1="${s(70)}" y1="${s(214)}" x2="${s(128)}" y2="${s(222)}"/>
        <path class="f12-pl-tup" d="M${s(171)} ${s(124)}H${s(300)}M${s(290)} ${s(124)}V${s(150)}"/>
        <g class="f12-pl-kap" transform="translate(${s(236)} ${s(124)})"><circle r="${s(10)}"/><line class="f12-pl-kc" x1="0" y1="${s(-8)}" x2="0" y2="${s(8)}"/></g>
        ${gauge(356, 70, 'kab')}${gauge(300, 172, 'agz')}
        <line class="f12-pl-gbag" x1="${s(334)}" y1="${s(70)}" x2="${s(378)}" y2="${s(70)}"/>
        ${lbl}
        <text class="f12-tk f12-pl-dvt" x="${s(22)}" y="${s(346)}">${dar ? '▮ kabin gaz hacmi ΔV azalır (abartılı)' : '▮ kabin gaz hacmi ΔV kadar azalır (çizim abartılı)'}</text>
      </svg>`;
      E = {
        gov: kutu.querySelector('.f12-pl-gov'), dv: kutu.querySelector('.f12-pl-dv'), akc: [...kutu.querySelectorAll('.f12-pl-akc')], hap: kutu.querySelector('.f12-pl-hap'), hx: kutu.querySelector('.f12-pl-hx'), hapt: [...kutu.querySelectorAll('.f12-pl-hapt')],
        kap: kutu.querySelector('.f12-pl-kap'), kc: kutu.querySelector('.f12-pl-kc'), ibk: kutu.querySelector('.kab .f12-pl-ib'), iba: kutu.querySelector('.agz .f12-pl-ib'), gk: kutu.querySelector('.kab'), ga: kutu.querySelector('.agz'),
        tk: o('gk'), ta: o('ga'), ta2: o('ga2'), dvt: kutu.querySelector('.f12-pl-dvt'),
      };
    };
    const ciz = () => {
      const h = hes(), pp = adim >= 4 ? 1 : adim === 3 ? yum(p) : 0, ex = 64 * 0.14 * (dV / 40) * pp;
      const s = (v) => v * S;
      E.gov.setAttribute('width', q(s(64 + ex)));
      E.dv.style.display = ex > 0.3 ? '' : 'none'; E.dv.setAttribute('x', q(s(176))); E.dv.setAttribute('width', q(Math.max(0, s(ex))));
      E.dvt.style.display = ex > 0.3 ? '' : 'none';
      const sc = 1 + 0.14 * (dV / 40) * pp;
      const cxs = [134, 158];
      E.akc.forEach((e, i) => { e.setAttribute('cx', q(s(cxs[i] + (i ? ex * 0.6 : ex * 0.2)))); e.setAttribute('rx', q(s(11 * sc))); e.setAttribute('ry', q(s(30 * (1 + (sc - 1) * 0.4)))); });
      E.hap.style.display = haps ? '' : 'none'; E.hx.style.display = haps ? '' : 'none'; E.hapt.forEach((t) => { t.style.display = haps ? '' : 'none'; });
      if (haps) {
        const cx = s(cxs[0] + ex * 0.2), cy = s(198), rx = s(11 * sc), ry = s(30 * (1 + (sc - 1) * 0.4)), yc = cy + ry * 0.35, hw = rx * Math.sqrt(1 - 0.35 * 0.35);
        E.hap.setAttribute('d', `M${q(cx - hw)} ${q(yc)}A${q(rx)} ${q(ry)} 0 0 0 ${q(cx + hw)} ${q(yc)}Z`);
        E.hx.setAttribute('d', `M${q(cx - 4)} ${q(yc - 4)}L${q(cx + 4)} ${q(yc + 4)}M${q(cx + 4)} ${q(yc - 4)}L${q(cx - 4)} ${q(yc + 4)}`);
      }
      const kapali = adim >= 2; sinifla(E.kap, 'kapali', kapali); E.kc.setAttribute('transform', kapali ? 'rotate(0)' : 'rotate(90)');
      const ak = clamp(h.dPa / 12, 0, 1) * 60 * pp, aa = -clamp(h.dk / 2, 0, 1) * 60 * pp;
      E.ibk.setAttribute('transform', `rotate(${q(ak)} ${q(s(356))} ${q(s(70))})`); E.iba.setAttribute('transform', `rotate(${q(aa)} ${q(s(300))} ${q(s(172))})`);
      sinifla(E.gk, 'on', adim === 4); sinifla(E.ga, 'on', adim === 5);
      E.tk.textContent = pp > 0 ? `+${fmt(h.dPa * pp)} Pa` : '0 Pa';
      if (dar) E.ta.textContent = pp > 0 ? `−${fmt(h.dk * pp, 2)} kPa` : '0 kPa';
      else { E.ta.textContent = pp > 0 ? `−${fmt(h.dk * pp, 2)} kPa` : '0 kPa'; E.ta2.textContent = pp > 0 ? `≈ −${fmt(h.cm * pp)} cmH₂O` : ''; }
    };
    const yaz = () => {
      const h = hes();
      o('dv').textContent = `${dV} mL`; o('frc').textContent = `${FRC} mL`;
      o('p2').textContent = adim >= 3 ? `${fmt(h.P2, 3)} kPa (+${fmt(h.dPa)} Pa)` : '?';
      o('p4').textContent = adim >= 3 ? `${fmt(h.P4, 3)} kPa (−${fmt(h.dk, 2)} kPa ≈ −${fmt(h.cm)} cmH₂O)` : '?';
      o('dvh').textContent = adim >= 4 ? `${tam(h.dVh)} mL` : '?';
      o('r1').textContent = adim >= 4 ? `ΔV = ${tam(h.dVh)} mL` : 'ΔV = ?';
      o('r2').textContent = adim >= 5 ? `${tam(h.FRCh)} mL` : '?';
      sinifla(o('s1'), 'on', adim === 4); sinifla(o('s1'), 'bitti', adim >= 4); sinifla(o('s2'), 'on', adim === 5); sinifla(o('s2'), 'bitti', adim >= 5);
      o('he').innerHTML = haps ? `Hapsolmuş gaz da göğüs kafesinin içinde olduğu için ölçülür: pletismografi <b>${FRC} mL</b> bulur; aynı hastada helyum dilüsyonu <b>${FRC - HAPS} mL</b> ölçerdi.` : '';
      adimYaz(el, adim, 5);
    };
    const capYaz = () => {
      const h = hes();
      const C = {
        1: '<b>1 · Ekspirasyon sonu.</b> Hasta hava geçirmez kabinde ağızlıktan soluyor. Kabin basıncı P₁ ve gaz hacmi V₁, ağızlık basıncı P₃ ölçülür; akciğerdeki hacim FRC\'dir. [[K1 s. 53–54]]',
        2: '<b>2 · Kapak kapanır.</b> Normal ekspirasyonun sonunda ağızlık kapağı kapanır; akciğerdeki gaz artık dışarıyla bağlantısız, sabit kütlede bir gazdır. [[K1 s. 54]]',
        3: `<b>3 · Kapalı ağızlığa karşı inspirasyon.</b> Solunum çabası göğüs kafesinin ön–arka çapını artırır; akciğerdeki gaz ΔV kadar genişler ve basıncı P₄'e düşer (${fmt(h.dk, 2)} kPa ≈ ${fmt(h.cm)} cmH₂O). [[K1 s. 54]]`,
        4: `<b>4 · Önce kabin.</b> Akciğer ne kadar genişlediyse kabin hacmi o kadar azalır (V₁ − ΔV); kabin hava geçirmez olduğu için basıncı P₂'ye yükselir (+${fmt(h.dPa)} Pa). P₁V₁ = P₂(V₁ − ΔV) ⇒ ΔV = ${tam(h.dVh)} mL. [[K1 s. 54]]`,
        5: `<b>5 · Sonra akciğer.</b> P₃ × FRC = P₄(FRC + ΔV) ⇒ FRC = P₄ΔV / (P₃ − P₄) = ${tam(h.FRCh)} mL. Gerçekte bütün hesapları bilgisayar yapar. [[K1 s. 54]]` + (haps ? ` Hapsolmuş gaz da göğüs kafesinin içindedir ve çabayla genişler; pletismografi onu da ölçer. Aynı hastada helyum dilüsyonu ${FRC - HAPS} mL ölçerdi. [[K1 s. 53]]` : ''),
      };
      cap(C[adim]);
    };
    const git = (a) => { adim = clamp(a, 1, 5); if (adim === 3) p = RM ? 1 : 0; yaz(); ciz(); capYaz(); };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const n = e.target.closest('button[data-n]'); if (n) { git(+n.dataset.n); return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'geri') git(adim - 1); else if (a.dataset.a === 'ileri') git(adim + 1); else if (a.dataset.a === 'bas') git(1);
    });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (r) { if (r.dataset.r === 'dv') dV = +r.value; else FRC = +r.value; yaz(); ciz(); capYaz(); return; }
      const c = e.target.closest('[data-c]'); if (c) { haps = c.checked; yaz(); ciz(); capYaz(); }
    });
    const durY = yerlesim(el, (d) => { dar = d; kur(); yaz(); ciz(); });
    capYaz();
    const durT = ticker(el, (dt) => { if (adim === 3 && p < 1) { p = Math.min(1, p + dt / 1.2); ciz(); } });
    return () => { durT(); durY(); };
  };

  /* ================= 6 · Kapanma kapasitesi ve FRC ================= */
  VIZ.f12_kapanma = (el) => {
    const cap = kapsiyon(el);
    const FRC0 = { ayak: 0.62, otur: 0.56, sirt: 0.5 }, VT = 0.08, EPS = 0.003;
    const CC = (y) => r4(0.3 + 0.008 * (y - 20));
    const HAZIR = {
      p25: { yas: 25, poz: 'ayak', karin: false, anes: false, ad: '25 yaş · ayakta' },
      p45: { yas: 45, poz: 'sirt', karin: false, anes: false, ad: '45 yaş · sırtüstü', c: ' Kitaba göre CC sırtüstü pozisyonda 45 yaşında FRC\'ye ulaşır. [[K1 s. 55]]' },
      p60: { yas: 60, poz: 'ayak', karin: false, anes: false, ad: '60 yaş · ayakta', c: ' Kitaba göre CC ayakta 60 yaşında FRC\'ye ulaşır. [[K1 s. 55]]' },
      rsi: { yas: 65, poz: 'sirt', karin: true, anes: false, ad: 'RSI olgusu: 65 yaş, sırtüstü, akut batın', kisa: 'RSI olgusu', c: ' 65 yaşında, akut batınlı, sırtüstü yatan hasta: FRC belirgin azalmış, CC artmıştır; eşlik eden hastalık olmadan bile tidal solunumda küçük hava yolları kapanır. [[K1 s. 55]]' },
      rsi45: { yas: 65, poz: 'otur', karin: true, anes: false, ad: 'Aynı olgu 45° oturur', kisa: '45° oturt', c: ' 45° oturur pozisyon FRC\'yi artırır (modelde kapalı kalan hava yolu azalır); RSI öncesi preoksijenasyon ve indüksiyon bu pozisyonda yapılabilir. [[K1 s. 55]]' },
    };
    const POZAD = { ayak: 'ayakta', otur: '45° oturur', sirt: 'sırtüstü' };
    let yas = 25, poz = 'ayak', karin = false, anes = false, hz = null, t = 0, dar = false, Lg, Ll, E = {};
    const frcH = () => r4(FRC0[poz] - (karin ? 0.06 : 0) - (anes ? 0.06 : 0));
    let frcA = frcH(), frc0 = frcA, frc1 = frcA, fa = 1;
    const durum = () => { const c = CC(yas), f = frcH(); return c < f ? 'acik' : c <= r4(f + VT) ? 'eks' : 'kapali'; };
    el.innerHTML = `<div class="f12-kp-ctl">
        <div class="f12-rng"><span>Yaş <b data-o="yas"></b></span><input type="range" min="20" max="80" step="1" value="25" data-r="yas" aria-label="Yaş (yıl)"></div>
        <div class="f12-kp-sat">${segHtml('Pozisyon', 'p', [['ayak', 'Ayakta'], ['otur', '45° oturur'], ['sirt', 'Sırtüstü']], 'ayak')}
          <label class="f12-chk"><input type="checkbox" data-c="karin"><span>Karın içi basıncı artmış (akut batın, obezite, gebelik, laparoskopi)</span></label>
          <label class="f12-chk"><input type="checkbox" data-c="anes"><span>Genel anestezi</span></label></div>
        <div class="f12-hazir">${Object.keys(HAZIR).map((k) => `<button type="button" class="btn ghost f12-kucuk" data-h="${k}"><span class="uzun">${HAZIR[k].ad}</span>${HAZIR[k].kisa ? `<span class="kisa">${HAZIR[k].kisa}</span>` : ''}</button>`).join('')}</div>
      </div>
      <div class="f12-kp-cz"><div class="f12-kp-g"></div><div class="f12-kp-l"><div class="f12-kp-ls"></div><p class="f12-kp-dur" data-o="dur"></p></div></div>
      <div class="f12-lej f12-kp-lej"><span style="--k:var(--crit)"><i></i>CC: kapanma kapasitesi</span><span style="--k:var(--c-clin)"><i></i>FRC ayakta</span><span style="--k:var(--c-clin)" class="kesik"><i></i>FRC sırtüstü</span><span style="--k:var(--c-clin)" class="nokta"><i></i>FRC 45° oturur</span><span style="--k:var(--c-clin)"><i class="bant"></i>tidal solunum</span></div>`;
    const o = (k) => el.querySelector(`[data-o="${k}"]`);
    const kG = el.querySelector('.f12-kp-g'), kL = el.querySelector('.f12-kp-ls');
    const set = (e, a) => { for (const k in a) e.setAttribute(k, a[k]); };
    const KAT = [{ ad: 'apikal', y: 92, d: 0.24 }, { ad: 'orta', y: 168, d: 0.12 }, { ad: 'bazal', y: 246, d: 0 }];
    const KUM = [[-10, -5], [10, -5], [0, 9]];
    const kur = (d) => {
      dar = d;
      Lg = d ? { W: 340, H: 250, px0: 30, px1: 330, py0: 210, py1: 24 } : { W: 470, H: 334, px0: 46, px1: 456, py0: 290, py1: 28 };
      const X = (Lg.X = (a) => Lg.px0 + ((a - 20) / 60) * (Lg.px1 - Lg.px0)), Y = (Lg.Y = (u) => Lg.py0 - ((u - 0.25) / 0.6) * (Lg.py0 - Lg.py1));
      let g = '';
      for (let a = 20; a <= 80; a += d ? 20 : 10) { if (a !== 60) g += `<line class="f12-ax" x1="${q(X(a))}" x2="${q(X(a))}" y1="${Lg.py0}" y2="${Lg.py0 + 5}"/><text class="f12-tk" x="${q(X(a))}" y="${Lg.py0 + 18}" text-anchor="middle">${a}</text>`; }
      [45, 60].forEach((a) => { g += `<line class="f12-ax f12-kp-vt" x1="${q(X(a))}" x2="${q(X(a))}" y1="${Lg.py0}" y2="${Lg.py0 + 8}"/><text class="f12-tk f12-kp-vtt" x="${q(X(a))}" y="${Lg.py0 + 18}" text-anchor="middle">${a}</text>`; });
      const ccA = CC(20), ccB = CC(80);
      const ang = (Math.atan2(Y(ccB) - Y(ccA), X(80) - X(20)) * 180) / Math.PI;
      const ccl = d ? '' : `<text class="f12-lb f12-kp-ccl f12-halo" transform="translate(${q(X(27))} ${q(Y(CC(27)) + 16)}) rotate(${q(ang)})">kapanma kapasitesi (CC)</text>`;
      kG.innerHTML = `<svg class="f12-svg${d ? ' f12-dar' : ''}" viewBox="0 0 ${Lg.W} ${Lg.H}" role="img" aria-label="Yaşa karşı kapanma kapasitesi ve FRC; kesişme sırtüstü 45, ayakta 60 yaşında">
        ${g}
        <line class="f12-ax" x1="${Lg.px0}" x2="${Lg.px1}" y1="${Lg.py0}" y2="${Lg.py0}"/><line class="f12-ax" x1="${Lg.px0}" x2="${Lg.px0}" y1="${Lg.py0}" y2="${Lg.py1}"/>
        <text class="f12-tk" x="${Lg.px1}" y="${Lg.py0 + 34}" text-anchor="end">Yaş (yıl)</text>
        <text class="f12-tk" transform="translate(${d ? 12 : 16} ${q((Lg.py0 + Lg.py1) / 2)}) rotate(-90)" text-anchor="middle">${d ? 'Akciğer hacmi (şematik)' : 'Akciğer hacmi (şematik, ölçeksiz)'}</text>
        <rect class="f12-kp-bant" x="${Lg.px0}" width="${Lg.px1 - Lg.px0}"/>
        <line class="f12-kp-frc ayak" x1="${Lg.px0}" x2="${Lg.px1}"/><line class="f12-kp-frc sirt" x1="${Lg.px0}" x2="${Lg.px1}"/><line class="f12-kp-frc otur" x1="${Lg.px0}" x2="${Lg.px1}"/>
        <line class="f12-kp-sec" x1="${Lg.px0}" x2="${Lg.px1}"/>
        <text class="f12-tk f12-kp-bl f12-halo">tidal solunum</text><text class="f12-tk f12-kp-sl f12-halo" x="${Lg.px1 - 5}" text-anchor="end">FRC ↓ (etkenler)</text>
        <line class="f12-kp-cc" x1="${q(X(20))}" y1="${q(Y(ccA))}" x2="${q(X(80))}" y2="${q(Y(ccB))}"/>
        <circle class="f12-kp-kes" cx="${q(X(45))}" cy="${q(Y(0.5))}" r="4.5"/><circle class="f12-kp-kes" cx="${q(X(60))}" cy="${q(Y(0.62))}" r="4.5"/>
        <line class="f12-kp-kk" x1="${q(X(45))}" x2="${q(X(45))}" y1="${q(Y(0.5) + 5)}" y2="${Lg.py0}"/><line class="f12-kp-kk" x1="${q(X(60))}" x2="${q(X(60))}" y1="${q(Y(0.62) + 5)}" y2="${Lg.py0}"/>
        <text class="f12-tk f12-kp-kest" x="${q(X(45))}" y="${Lg.py0 + 31}" text-anchor="middle">sırtüstü</text><text class="f12-tk f12-kp-kest" x="${q(X(60))}" y="${Lg.py0 + 31}" text-anchor="middle">ayakta</text>
        <line class="f12-kp-imle" y1="${Lg.py1}" y2="${Lg.py0}"/><text class="f12-lb f12-kp-imt f12-halo" y="${Lg.py1 - 8}" text-anchor="middle"></text>
        <text class="f12-tk f12-kp-fl f12-halo ayak" x="${Lg.px0 + 5}">FRC ayakta</text><text class="f12-tk f12-kp-fl f12-halo sirt" x="${Lg.px0 + 5}">FRC sırtüstü</text><text class="f12-tk f12-kp-fl f12-halo otur" x="${Lg.px0 + 5}">FRC 45°</text>${ccl}
        <circle class="f12-kp-ccn" r="6.5"/><circle class="f12-kp-vn" r="4.5"/>
      </svg>`;
      // akciğer şeması (temel koordinatlar 240×310)
      Ll = d ? { W: 340, H: 206, s: 0.62, ox: 26, oy: 4, lx: 178 } : { W: 280, H: 320, s: 1, ox: 6, oy: 4, lx: 218 };
      const sx = (x) => q(Ll.ox + x * Ll.s), sy = (y) => q(Ll.oy + y * Ll.s), S = Ll.s;
      const lung = `M110 18C160 18 192 100 198 200C202 268 182 304 142 304L78 304C38 304 18 268 22 200C28 100 60 18 110 18Z`;
      let dal = '', kum = '';
      KAT.forEach((k, i) => {
        [62, 158].forEach((cx, j) => {
          dal += `<line class="f12-kp-dal" data-k="${i}" x1="${sx(110)}" y1="${sy(k.y - 22)}" x2="${sx(cx + (j ? -8 : 8))}" y2="${sy(k.y - 2)}"/>`;
          const mx = (110 + cx + (j ? -8 : 8)) / 2, my = k.y - 12;
          dal += `<path class="f12-kp-pin" data-k="${i}" d="M${sx(mx - 5)} ${sy(my - 7)}Q${sx(mx)} ${sy(my - 2)} ${sx(mx + 5)} ${sy(my - 7)}M${sx(mx - 5)} ${sy(my + 5)}Q${sx(mx)} ${sy(my)} ${sx(mx + 5)} ${sy(my + 5)}"/>`;
          KUM.forEach(([dx, dy]) => { kum += `<circle class="f12-kp-alv" data-k="${i}" cx="${sx(cx + dx)}" cy="${sy(k.y + dy)}" data-r="${q(8.5 * S)}"/>`; });
        });
      });
      const lbl = KAT.map((k, i) => `<text class="f12-lb" x="${Ll.lx}" y="${sy(k.y - 2)}">${k.ad}</text><text class="f12-tk f12-kp-kd" data-k="${i}" x="${Ll.lx}" y="${q(+sy(k.y - 2) + 15)}"></text>`).join('');
      kL.innerHTML = `<svg class="f12-svg${d ? ' f12-dar' : ''}" viewBox="0 0 ${Ll.W} ${Ll.H}" role="img" aria-label="Dik akciğer: apikal, orta ve bazal küçük hava yolları; kapananlar taralı">
        <defs>${tarama('f12-kp-tar')}</defs>
        <path class="f12-kp-akc" transform="translate(${Ll.ox} ${Ll.oy}) scale(${S})" d="${lung}"/>
        <line class="f12-kp-tra" x1="${sx(110)}" y1="${sy(-4)}" x2="${sx(110)}" y2="${sy(KAT[2].y - 22)}"/>
        ${dal}${kum}${lbl}
      </svg>`;
      E = {
        bant: kG.querySelector('.f12-kp-bant'), frc: { ayak: kG.querySelector('.f12-kp-frc.ayak'), sirt: kG.querySelector('.f12-kp-frc.sirt'), otur: kG.querySelector('.f12-kp-frc.otur') },
        fl: { ayak: kG.querySelector('.f12-kp-fl.ayak'), sirt: kG.querySelector('.f12-kp-fl.sirt'), otur: kG.querySelector('.f12-kp-fl.otur') },
        sec: kG.querySelector('.f12-kp-sec'), bl: kG.querySelector('.f12-kp-bl'), sl: kG.querySelector('.f12-kp-sl'),
        imle: kG.querySelector('.f12-kp-imle'), imt: kG.querySelector('.f12-kp-imt'), ccn: kG.querySelector('.f12-kp-ccn'), vn: kG.querySelector('.f12-kp-vn'),
        dal: [...kL.querySelectorAll('.f12-kp-dal')], pin: [...kL.querySelectorAll('.f12-kp-pin')], alv: [...kL.querySelectorAll('.f12-kp-alv')], kd: [...kL.querySelectorAll('.f12-kp-kd')],
      };
    };
    const V = () => (RM ? frcA : frcA + 0.04 * (1 - Math.cos((2 * Math.PI * t) / 4)));
    const cizGraf = () => {
      const { X, Y } = Lg, f0 = FRC0[poz], kay = frcH() < f0 - 1e-6;
      Object.keys(E.frc).forEach((k) => {
        const e = E.frc[k], l = E.fl[k], gor = k !== 'otur' || poz === 'otur';
        e.style.display = gor ? '' : 'none'; l.style.display = gor ? '' : 'none';
        set(e, { y1: q(Y(FRC0[k])), y2: q(Y(FRC0[k])) }); set(l, { y: q(Y(FRC0[k]) + 14) });
        sinifla(e, 'secili', k === poz && !kay); sinifla(e, 'hayalet', k === poz && kay);
      });
      E.sec.style.display = kay || fa < 1 ? '' : 'none'; set(E.sec, { y1: q(Y(frcA)), y2: q(Y(frcA)) });
      set(E.bant, { y: q(Y(frcA + VT)), height: q(Y(frcA) - Y(frcA + VT)) });
      // bant etiketi: CC'nin bandı kestiği yaş aralığından ve sol FRC etiketinden uzak bir yere
      const cw = dar ? 6.9 : 6.6, a1 = 20 + (frcA - 0.3) / 0.008, a2 = a1 + VT / 0.008;
      const solBas = Lg.px0 + 5 + (kay ? 13 * cw + 8 : 0), solSon = X(clamp(a1, 20, 80)) - 6, sagBas = X(clamp(a2, 20, 80)) + 6, sagSon = Lg.px1 - 5;
      let metin = 'tidal solunum', w = 13 * cw, yer = null;
      for (const [m, ww] of [['tidal solunum', 13 * cw], ['tidal', 5 * cw]]) {
        if (sagSon - sagBas >= ww) { yer = { x: sagSon, a: 'end' }; metin = m; w = ww; break; }
        if (solSon - solBas >= ww) { yer = { x: solBas, a: 'start' }; metin = m; w = ww; break; }
      }
      void w;
      E.bl.style.display = yer ? '' : 'none';
      if (yer) { set(E.bl, { x: q(yer.x), y: q(Y(frcA + VT) + 13), 'text-anchor': yer.a }); E.bl.textContent = metin; }
      E.sl.style.display = kay ? '' : 'none'; set(E.sl, { y: q(Y(frcA) + 14) });
      const c = CC(yas);
      set(E.imle, { x1: q(X(yas)), x2: q(X(yas)) }); set(E.imt, { x: q(clamp(X(yas), Lg.px0 + 26, Lg.px1 - 26)) }); E.imt.textContent = `yaş: ${yas}`;
      set(E.ccn, { cx: q(X(yas)), cy: q(Y(c)) }); set(E.vn, { cx: q(X(yas)), cy: q(Y(V())) });
    };
    const cizAkc = () => {
      const c = CC(yas), v = V();
      const kapali = KAT.map((k) => v < c - k.d + EPS);
      E.dal.forEach((e) => { e.classList.toggle('kapali', kapali[+e.dataset.k]); });
      E.pin.forEach((e) => { e.style.display = kapali[+e.dataset.k] ? '' : 'none'; });
      const genis = RM ? 0 : (v - frcA) / VT;
      E.alv.forEach((e) => { const k = +e.dataset.k, r0 = +e.dataset.r; e.classList.toggle('kapali', kapali[k]); e.setAttribute('r', q(kapali[k] ? r0 * 0.82 : r0 * (0.9 + 0.22 * genis))); if (kapali[k]) e.setAttribute('fill', 'url(#f12-kp-tar)'); else e.removeAttribute('fill'); });
      E.kd.forEach((e) => { const k = +e.dataset.k; e.textContent = kapali[k] ? 'kapalı' : 'açık'; e.setAttribute('class', 'f12-tk f12-kp-kd ' + (kapali[k] ? 'kapali' : 'acik')); });
    };
    const yaz = () => {
      o('yas').textContent = `${yas}`;
      const d = durum();
      const R = { acik: ['ok', 'açık · CC tidal aralığın altında'], eks: ['warn', 'ekspirasyon sonunda kapanma'], kapali: ['crit', 'soluk boyunca kapalı'] }[d];
      o('dur').innerHTML = `<span class="tag ${R[0]}">${R[1]}</span><span class="f12-kp-poz">${POZAD[poz]}${karin ? ' · karın içi basıncı ↑' : ''}${anes ? ' · anestezi' : ''}</span>`;
      basSec(el, 'p', poz);
      el.querySelector('[data-c="karin"]').checked = karin; el.querySelector('[data-c="anes"]').checked = anes; el.querySelector('[data-r="yas"]').value = yas;
      el.querySelectorAll('button[data-h]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.h === hz)));
    };
    const capYaz = () => {
      const d = durum();
      let c = {
        acik: '<b>CC, FRC\'nin altında.</b> Genç, sağlıklı erişkinde olduğu gibi tidal solunum boyunca küçük hava yolları açık kalır. [[K1 s. 55]]',
        eks: '<b>CC tidal solunum aralığında.</b> Ekspirasyonun sonunda bazal küçük hava yolları kapanır ve her inspirasyonda yeniden açılmaları gerekir: V̇/Q̇ uyumsuzluğu ve artmış solunum işi. [[K1 s. 55]]',
        kapali: '<b>CC tidal aralığın üstünde.</b> Bazal hava yolları soluk boyunca kapalı kalır; bu alveoller ventile olmaz ama kanlanmaya devam eder: V̇/Q̇ uyumsuzluğu ve hipoksemi. [[K1 s. 55]]',
      }[d];
      if (hz && HAZIR[hz].c) c += HAZIR[hz].c;
      if (anes) c += ' Anestezi FRC\'yi ayrıca azaltır. [[K1 s. 51]]';
      cap(c);
    };
    const hzKontrol = () => { if (hz) { const h = HAZIR[hz]; if (h.yas !== yas || h.poz !== poz || h.karin !== karin || h.anes !== anes) hz = null; } };
    const degis = () => {
      hzKontrol();
      const yeni = frcH();
      if (Math.abs(yeni - frc1) > 1e-6) { frc0 = frcA; frc1 = yeni; fa = RM ? 1 : 0; if (RM) frcA = yeni; }
      yaz(); cizGraf(); cizAkc(); capYaz();
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const p = e.target.closest('button[data-p]'); if (p) { poz = p.dataset.p; degis(); return; }
      const h = e.target.closest('button[data-h]'); if (h) { const z = HAZIR[h.dataset.h]; hz = h.dataset.h; yas = z.yas; poz = z.poz; karin = z.karin; anes = z.anes; degis(); }
    });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (r) { yas = +r.value; degis(); return; }
      const c = e.target.closest('[data-c]'); if (c) { if (c.dataset.c === 'karin') karin = c.checked; else anes = c.checked; degis(); }
    });
    const durY = yerlesim(el, (d) => { kur(d); cizGraf(); cizAkc(); });
    yaz(); capYaz();
    const durT = ticker(el, (dt) => {
      if (fa < 1) { fa = Math.min(1, fa + dt / 0.45); frcA = lerp(frc0, frc1, yum(fa)); }
      if (!RM) t += dt;
      cizGraf(); cizAkc();
    });
    return () => { durT(); durY(); };
  };

  /* ================= 7 · VALI: hacim ve basınç sınırları ================= */
  VIZ.f12_vt = (el) => {
    const cap = kapsiyon(el);
    const RAD = { 6: 18, 7: 20, 12: 30 };
    const C_NOR = '<b>Normal VT ≈ 500 mL</b>, yani 70 kg\'lık erişkinde 7 mL/kg. [[K1 s. 51]]';
    const C_GEL = '<b>Geleneksel strateji: 12 mL/kg.</b> Bugün akciğeri aşırı gerdiği, volütravmaya (yaygın alveoler hasar) ve akciğer hasarına yol açtığı düşünülür. [[K1 s. 51]]';
    const C_KOR = '<b>Düşük VT: 6 mL/kg.</b> ARDS\'de mortaliteyi azalttığı gösterildiği için yoğun bakımların çoğu bu stratejiyi benimsemiştir. [[K1 s. 51]]';
    const C_BAR = '<b>Barotravma</b>, yüksek hava yolu basıncının yaptığı akciğer hasarıdır; önlemek için Ppeak 35, Pplat 30 cmH₂O\'nun altında tutulur. [[K1 s. 51]]';
    const C_KOM = '<b>Kompliyansı çok düşük akciğer.</b> Koruyucu sınırlarla (VT 6 mL/kg, Pplat ≤ 30 cmH₂O) V̇A normokapniyi sürdürmeye yetmeyebilir. [[K1 s. 51]]';
    const C_SOL = '<b>VT ya da basıncı artırmak</b> yeni volütravma ve barotravma, yani ek akciğer hasarı riski taşır. [[K1 s. 51]]';
    const C_SAG = '<b>Permisif hiperkapni</b> tercih edilir; bu yaklaşımın bütününe akciğer koruyucu ventilasyon stratejisi denir. [[K1 s. 51]]';
    const CAP = { v6: C_KOR, v7: C_NOR, v12: C_GEL, pp: C_BAR, pl: C_BAR, k1: C_KOM, k2: C_KOM, k3: C_KOM, sol1: C_SOL, sol2: C_SOL, sag: C_SAG, bant: C_SAG };
    let sec = null, vt = 7, rA = RAD[7], r0 = rA, r1 = rA, fa = 1, dar = false;
    el.innerHTML = `<div class="f12-ust">${segHtml('Strateji', 's', [['12', 'Geleneksel 12 mL/kg'], ['6', 'Koruyucu 6 mL/kg']], null)}<span class="f12-ipucu f12-vt-ip">Şeklin parçalarına basın.</span></div><div class="f12-vt-cz"></div>`;
    const kutu = el.querySelector('.f12-vt-cz');
    const hit = (k, ad, ic) => `<g class="f12-vt-h" data-k="${k}" role="button" tabindex="0" aria-label="${ad}">${ic}</g>`;
    const tx = (x, y, s, cls = 'f12-tk', an = 'start') => `<text class="${cls}" x="${q(x)}" y="${q(y)}" text-anchor="${an}">${s}</text>`;
    /* A · tidal hacim ölçeği + alveol */
    const parcaA = (d) => {
      const G = d ? { sx: 150, y0: 222, y1: 40, ax: 58, ay: 112, lx: 166, ty: 18, ust: 38 } : { sx: 118, y0: 300, y1: 52, ax: 50, ay: 128, lx: 134, ty: 24, ust: 60 };
      const Y = (v) => G.y0 - (v / 14) * (G.y0 - G.y1);
      let s = tx(d ? 10 : 20, G.ty, 'Tidal hacim (mL/kg)', 'f12-vt-bas');
      s += `<line class="f12-ax" x1="${G.sx}" x2="${G.sx}" y1="${G.y0}" y2="${G.y1}"/>`;
      for (let v = 0; v <= 14; v += 2) s += `<line class="f12-ax" x1="${G.sx - 5}" x2="${G.sx}" y1="${q(Y(v))}" y2="${q(Y(v))}"/>${tx(G.sx - 8, Y(v) + 4, v, 'f12-tk', 'end')}`;
      const M = [
        [6, 'ok', d ? 8 : 14, d ? '6 · koruyucu' : '6 mL/kg', 'akciğer koruyucu (düşük VT)', '6 mL/kg, akciğer koruyucu düşük tidal hacim'],
        [7, 'nor', d ? -8 : -14, d ? '7 · normal' : '7 mL/kg', 'normal ≈ 500 mL (70 kg)', '7 mL/kg, normal tidal hacim'],
        [12, 'crit', 0, d ? '12 · geleneksel' : '12 mL/kg', 'geleneksel → volütravma', '12 mL/kg, geleneksel strateji'],
      ];
      M.forEach(([v, c, off, t1, t2, ad]) => {
        const y = Y(v), ly = y + off, lc = d ? ly : ly - 5;
        let ic = `<path class="f12-vt-kl" d="M${G.sx + 6} ${q(y)}L${G.sx + 12} ${q(y)}L${G.lx - 4} ${q(lc)}"/><circle class="f12-vt-m ${c}" cx="${G.sx}" cy="${q(y)}" r="6"/>`;
        ic += d ? tx(G.lx, ly + 4.5, t1, `f12-lb f12-vt-mt ${c}`) : tx(G.lx, ly - 1, t1, `f12-lb f12-vt-mt ${c}`) + tx(G.lx, ly + 12, t2);
        const top = d ? ly - 10 : ly - 13, bot = d ? ly + 8 : ly + 16;
        ic += `<rect class="f12-hit" x="${G.sx - 10}" y="${q(Math.min(top, y - 9))}" width="${(d ? 330 : 284) - G.sx + 10}" height="${q(Math.max(bot, y + 9) - Math.min(top, y - 9))}"/>`;
        s += hit('v' + v, ad, ic);
      });
      // alveol
      s += `<g class="f12-vt-alv"><path class="f12-vt-sap"/><circle class="f12-vt-a" cx="${G.ax}" cy="${G.ay}"/><g class="f12-vt-cat">${[30, 150, 210, 330].map((a) => '<line data-a="' + a + '"/>').join('')}</g>
        ${tx(G.ax + 8, G.ust + 8, 'alveol')}
        <g class="f12-vt-hl">${tx(G.ax, G.ay + 58, 'aşırı gerilme:', 'f12-tk f12-vt-hz', 'middle')}${tx(G.ax, G.ay + 71, 'yaygın alveoler', 'f12-tk f12-vt-hz', 'middle')}${tx(G.ax, G.ay + 84, 'hasar', 'f12-tk f12-vt-hz', 'middle')}</g></g>`;
      return { s, G };
    };
    /* B · basınç sütunları */
    const parcaB = (d, ox) => {
      const G = d ? { sx: 46, y0: 176, y1: 56, ty: 18, c: [90, 210], w: 60, bl: 196 } : { sx: ox + 28, y0: 300, y1: 60, ty: 24, c: [ox + 55, ox + 125], w: 40, bl: 318 };
      const Y = (p) => G.y0 - (p / 40) * (G.y0 - G.y1);
      let s = tx(d ? 10 : ox, G.ty, 'Hava yolu basıncı (cmH₂O)', 'f12-vt-bas');
      s += `<line class="f12-ax" x1="${G.sx}" x2="${G.sx}" y1="${G.y0}" y2="${G.y1}"/>`;
      for (let p = 0; p <= 40; p += 10) s += `<line class="f12-ax" x1="${G.sx - 5}" x2="${G.sx}" y1="${q(Y(p))}" y2="${q(Y(p))}"/>${tx(G.sx - 8, Y(p) + 4, p, 'f12-tk', 'end')}`;
      const orta = (G.c[0] + G.c[1] + G.w) / 2;
      s += tx(orta, G.y1 - 20, 'üstü: barotravma', 'f12-tk f12-vt-bt', 'middle') + tx(orta, G.y1 - 7, d ? '(yüksek hava yolu basıncı)' : '(yüksek hava yolu basıncı)', 'f12-tk', 'middle');
      [['pp', 35, 'Ppeak', '(tepe)', 'Ppeak, tepe basıncı: 35 cmH₂O altında'], ['pl', 30, 'Pplat', '(plato)', 'Pplat, plato basıncı: 30 cmH₂O altında']].forEach(([k, lim, a1, a2, ad], i) => {
        const x = G.c[i], w = G.w, yl = Y(lim);
        let ic = `<rect class="f12-vt-ok" x="${x}" y="${q(yl)}" width="${w}" height="${q(G.y0 - yl)}"/><rect class="f12-vt-kr" x="${x}" y="${G.y1}" width="${w}" height="${q(yl - G.y1)}"/><rect class="f12-vt-kr2" x="${x}" y="${G.y1}" width="${w}" height="${q(yl - G.y1)}" fill="url(#f12-vt-tarama)"/>
          <rect class="f12-vt-cer" x="${x}" y="${G.y1}" width="${w}" height="${G.y0 - G.y1}"/>
          <line class="f12-vt-sin" x1="${x - 6}" x2="${x + w + 6}" y1="${q(yl)}" y2="${q(yl)}"/>${tx(x + w / 2, yl + 16, '&lt; ' + lim, 'f12-lb f12-vt-st', 'middle')}`;
        ic += d ? tx(x + w / 2, G.bl, `${a1} ${a2}`, 'f12-tk', 'middle') : tx(x + w / 2, G.bl, a1, 'f12-lb', 'middle') + tx(x + w / 2, G.bl + 14, a2, 'f12-tk', 'middle');
        ic += `<rect class="f12-hit" x="${x - 8}" y="${G.y1}" width="${w + 16}" height="${G.bl + (d ? 4 : 18) - G.y1}"/>`;
        s += hit(k, ad, ic);
      });
      return s;
    };
    /* C · karar yolu */
    const parcaC = (d, ox) => {
      const W = d ? 300 : 255, x0 = d ? 20 : ox, ty = d ? 18 : 24;
      const bx = (k, x, y, w, h, sat, cls, ad, rozet = '') => {
        const n = sat.length, lh = 14, y1 = y + h / 2 - ((n - 1) * lh) / 2 + 4;
        let ic = `<rect class="f12-vt-bx ${cls}" x="${q(x)}" y="${q(y)}" width="${q(w)}" height="${h}" rx="8"/>` + sat.map((t, i) => tx(x + w / 2, y1 + i * lh, t, 'f12-vt-bxt', 'middle')).join('');
        if (rozet) ic += `<circle class="f12-vt-rz ${cls}" cx="${q(x + w - 4)}" cy="${q(y + 4)}" r="9"/>${tx(x + w - 4, y + 8.5, rozet, 'f12-vt-rzt', 'middle')}`;
        return hit(k, ad, ic);
      };
      const ok = (x, y1, y2) => `<path class="f12-vt-yol" d="${okD(x, y1, x, y2, 6)}"/>`;
      let s = tx(x0, ty, 'Kompliyans çok düşükse', 'f12-vt-bas');
      const cx = x0 + W / 2;
      if (!d) {
        s += bx('k1', x0, 34, W, 26, ['Kompliyans çok düşük (ör. ARDS)'], 'nt', 'Kompliyans çok düşük, örneğin ARDS') + ok(cx, 60, 72);
        s += bx('k2', x0, 72, W, 26, ['VT 6 mL/kg + Pplat ≤ 30 cmH₂O'], 'iy', 'VT 6 mL/kg ve Pplat 30 cmH₂O veya altı') + ok(cx, 98, 110);
        s += bx('k3', x0, 110, W, 40, ['V̇A normokapniye yetmeyebilir', '→ PaCO₂ ↑'], 'uy', 'Alveoler ventilasyon normokapniye yetmeyebilir, PaCO₂ yükselir');
        const xl = x0 + 70, xr = x0 + 202;
        s += ok(xl, 150, 166) + ok(xr, 150, 166);
        s += bx('sol1', x0, 166, 140, 40, ['VT ya da inspiratuvar', 'basıncı artır'], 'nt', 'VT ya da inspiratuvar basıncı artır') + ok(xl, 206, 218);
        s += bx('sol2', x0, 218, 140, 54, ['volütravma /', 'barotravma:', 'yeni hasar'], 'kt', 'Volütravma ve barotravma: yeni hasar', '✗');
        s += bx('sag', x0 + 150, 166, 105, 106, ['Permisif', 'hiperkapni'], 'iyd', 'Permisif hiperkapni', '✓') + ok(xr, 272, 288);
        s += bx('bant', x0, 288, W, 40, ['= akciğer koruyucu', 'ventilasyon stratejisi'], 'bnt', 'Akciğer koruyucu ventilasyon stratejisi');
      } else {
        s += bx('k1', x0, 28, W, 28, ['Kompliyans çok düşük (ör. ARDS)'], 'nt', 'Kompliyans çok düşük, örneğin ARDS') + ok(cx, 56, 68);
        s += bx('k2', x0, 68, W, 28, ['VT 6 mL/kg + Pplat ≤ 30 cmH₂O'], 'iy', 'VT 6 mL/kg ve Pplat 30 cmH₂O veya altı') + ok(cx, 96, 108);
        s += bx('k3', x0, 108, W, 42, ['V̇A normokapniye yetmeyebilir', '→ PaCO₂ ↑'], 'uy', 'Alveoler ventilasyon normokapniye yetmeyebilir, PaCO₂ yükselir');
        s += ok(87.5, 150, 166) + ok(252.5, 150, 166);
        s += bx('sol1', 10, 166, 155, 40, ['VT ya da inspiratuvar', 'basıncı artır'], 'nt', 'VT ya da inspiratuvar basıncı artır') + ok(87.5, 206, 218);
        s += bx('sol2', 10, 218, 155, 54, ['volütravma /', 'barotravma:', 'yeni hasar'], 'kt', 'Volütravma ve barotravma: yeni hasar', '✗');
        s += bx('sag', 175, 166, 155, 106, ['Permisif', 'hiperkapni'], 'iyd', 'Permisif hiperkapni', '✓') + ok(252.5, 272, 286);
        s += bx('bant', x0, 286, W, 28, ['= akciğer koruyucu ventilasyon stratejisi'], 'bnt', 'Akciğer koruyucu ventilasyon stratejisi');
      }
      return s;
    };
    const desen = `<defs>${tarama('f12-vt-tarama')}</defs>`;
    let A = null;
    const kur = (d) => {
      dar = d;
      if (!d) {
        A = parcaA(false);
        kutu.innerHTML = `<svg class="f12-svg" viewBox="0 0 760 340" role="img" aria-label="Tidal hacim ölçeği (mL/kg), hava yolu basınç sınırları ve kompliyansı düşük akciğerde karar yolu">${desen}${A.s}${parcaB(false, 296)}${parcaC(false, 490)}</svg>`;
      } else {
        A = parcaA(true);
        kutu.innerHTML = `<svg class="f12-svg f12-dar" viewBox="0 0 340 240" role="img" aria-label="Tidal hacim ölçeği (mL/kg) ve alveol">${A.s}</svg>
          <svg class="f12-svg f12-dar" viewBox="0 0 340 210" role="img" aria-label="Tepe ve plato hava yolu basıncı sınırları">${desen}${parcaB(true)}</svg>
          <svg class="f12-svg f12-dar" viewBox="0 0 340 320" role="img" aria-label="Kompliyansı çok düşük akciğerde karar yolu">${parcaC(true)}</svg>`;
      }
      cizAlv(); vurgu();
    };
    const cizAlv = () => {
      const { ax, ay, ust } = A.G, r = rA;
      const a = kutu.querySelector('.f12-vt-a'); a.setAttribute('r', q(r));
      const hasar = vt === 12;
      sinifla(a, 'hasar', hasar);
      kutu.querySelector('.f12-vt-sap').setAttribute('d', `M${ax - 3} ${ust}L${ax - 3} ${q(ay - r + 1)}M${ax + 3} ${ust}L${ax + 3} ${q(ay - r + 1)}`);
      kutu.querySelectorAll('.f12-vt-cat line').forEach((l) => {
        const t = (+l.dataset.a * Math.PI) / 180;
        l.setAttribute('x1', q(ax + Math.cos(t) * (r + 3))); l.setAttribute('y1', q(ay + Math.sin(t) * (r + 3)));
        l.setAttribute('x2', q(ax + Math.cos(t) * (r + 10))); l.setAttribute('y2', q(ay + Math.sin(t) * (r + 10)));
      });
      kutu.querySelector('.f12-vt-cat').style.display = hasar && fa >= 1 ? '' : 'none';
      kutu.querySelector('.f12-vt-hl').style.display = hasar ? '' : 'none';
    };
    const vurgu = () => {
      kutu.querySelectorAll('.f12-vt-h').forEach((g) => { const on = g.dataset.k === sec; g.classList.toggle('on', on); g.classList.toggle('sol', !!sec && !on); g.setAttribute('aria-pressed', String(on)); });
      basSec(el, 's', String(vt));
    };
    const sec_ = (k) => {
      sec = k;
      const m = /^v(\d+)$/.exec(k);
      if (m && +m[1] !== vt) { vt = +m[1]; r0 = rA; r1 = RAD[vt]; fa = RM ? 1 : 0; if (RM) rA = r1; }
      cap(CAP[k]); vurgu(); cizAlv();
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const b = e.target.closest('button[data-s]'); if (b) { sec_('v' + b.dataset.s); return; }
      const g = e.target.closest('.f12-vt-h'); if (g) sec_(g.dataset.k);
    });
    el.addEventListener('keydown', (e) => {
      const g = e.target.closest('.f12-vt-h'); if (!g) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sec_(g.dataset.k); }
    });
    const durY = yerlesim(el, kur);
    const durT = ticker(el, (dt) => { if (fa < 1) { fa = Math.min(1, fa + dt / 0.3); rA = lerp(r0, r1, yum(fa)); cizAlv(); } });
    return () => { durT(); durY(); };
  };

  /* ================= 8 · FRC olmasaydı ne olurdu? ================= */
  VIZ.f12_onem = (el) => {
    const cap = kapsiyon(el);
    let frc = true, oyn = !RM, t = RM ? 4 : 0, dar = false, E = {}, G = {};
    const C_VAR = '<b>FRC var.</b> Ekspirasyon sonunda alveolde gaz kalır; O₂ kapillere sürekli geçerken PAO₂ soluktan soluğa pek değişmez ve alveoller açık kalır. [[K1 s. 51]]';
    const C_YOK = '<b>FRC yok.</b> Ekspirasyon rezidüel hacme kadar sürer: alveoller kollabe olur (atelektazi → V̇/Q̇ uyumsuzluğu, hipoksemi), PAO₂ her ekspirasyonda düşer ve kapiller kan yalnız inspirasyonda tam oksijenlenir. Kollabe alveolleri her solukta yeniden açmak solunum işini belirgin artırır. [[K1 s. 51]]';
    const C_MEK = '<b>En uygun mekanik.</b> Akciğer kompliyansı FRC\'de en yüksek, pulmoner vasküler direnç en düşüktür (Bölüm 23). [[K1 s. 51]]';
    const vHac = (tt) => { const c = ((tt % 4) + 4) % 4; return c < 1.5 ? yum(c / 1.5) : 1 - yum((c - 1.5) / 2.5); };
    const pO2 = (v, f) => (f ? 0.8 + 0.03 * v : 0.2 + 0.65 * v);
    const rAlv = (v, f) => (f ? 40 + 10 * v : 6 + 44 * v);
    const NK = 6, KAN = Array.from({ length: NK }, (_, i) => ({ s: i / NK, ox: true }));
    el.innerHTML = `<div class="f12-ust">${segHtml('Durum', 'f', [['var', 'FRC var'], ['yok', 'FRC yok (ekspirasyon RV\'ye kadar)']], 'var')}<div class="btn-row"><button type="button" class="btn ghost" data-a="oyn">Duraklat</button></div></div><div class="f12-on-cz"></div>`;
    const kutu = el.querySelector('.f12-on-cz'), btn = el.querySelector('[data-a="oyn"]');
    const tx = (x, y, s, cls = 'f12-tk', an = 'start', ek = '') => `<text class="${cls}" x="${q(x)}" y="${q(y)}" text-anchor="${an}" ${ek}>${s}</text>`;
    const kur = (d) => {
      dar = d;
      // geometri
      const A = d ? { ox: 0, ty: 16, ax: 110, ay: 84, bt: 24, kx0: 20, kx1: 320, ky: 146, kh: 24, kl: 190, lx: 200, ly: 92 } : { ox: 20, ty: 22, ax: 135, ay: 120, bt: 32, kx0: 40, kx1: 230, ky: 200, kh: 26, kl: 248, lx: 135, ly: 188 };
      const B = d ? { ox: 10, ty: 16, px0: 40, px1: 328, py0: 146, py1: 30 } : { ox: 270, ty: 22, px0: 298, px1: 512, py0: 220, py1: 48 };
      const Cg = d ? { ox: 10, ty: 16, px0: 30, px1: 326, py0: 122, py1: 26 } : { ox: 540, ty: 22, px0: 556, px1: 740, py0: 226, py1: 48 };
      G = { A, B, C: Cg };
      B.X = (s) => B.px0 + (s / 12) * (B.px1 - B.px0); B.Y = (p) => B.py0 - p * (B.py0 - B.py1);
      Cg.X = (x) => Cg.px0 + x * (Cg.px1 - Cg.px0); Cg.Y = (v) => Cg.py0 - (v / 1.2) * (Cg.py0 - Cg.py1);
      // A
      let sA = tx(A.ox || 10, A.ty, 'Alveol ve kapiller', 'f12-vt-bas');
      sA += `<path class="f12-on-br"/><circle class="f12-on-alv" cx="${A.ax}" cy="${A.ay}" r="40"/>`;
      sA += `<rect class="f12-on-kap" x="${A.kx0}" y="${A.ky}" width="${A.kx1 - A.kx0}" height="${A.kh}" rx="${A.kh / 2}"/>`;
      sA += `<g class="f12-on-rbc">${KAN.map(() => '<ellipse rx="9" ry="6"/>').join('')}</g>`;
      sA += tx((A.kx0 + A.kx1) / 2, A.kl, '', 'f12-lb f12-on-kl', 'middle');
      sA += tx(A.lx, A.ly, '', 'f12-lb f12-on-col f12-halo', d ? 'start' : 'middle');
      sA += tx(A.lx, d ? A.ly : A.ly - 14, '', 'f12-lb f12-on-ac f12-halo', d ? 'start' : 'middle') + tx(A.lx, A.ly, '', 'f12-lb f12-on-ac2 f12-halo', 'middle');
      // B
      let sB = tx(B.ox, B.ty, 'PAO₂', 'f12-vt-bas');
      for (let k = 0; k < 3; k++) sB += `<rect class="f12-on-ins" x="${q(B.X(4 * k))}" y="${B.py0 + 4}" width="${q(B.X(1.5) - B.X(0))}" height="6"/>`;
      sB += tx(B.X(0.75), B.py0 + 22, 'insp.', 'f12-tk', 'middle');
      for (let s = 0; s <= 12; s += 2) sB += `<line class="f12-ax" x1="${q(B.X(s))}" x2="${q(B.X(s))}" y1="${B.py0}" y2="${B.py0 + 4}"/>`;
      sB += `<line class="f12-ax" x1="${B.px0}" x2="${B.px1}" y1="${B.py0}" y2="${B.py0}"/><line class="f12-ax" x1="${B.px0}" x2="${B.px0}" y1="${B.py0}" y2="${B.py1}"/>`;
      sB += tx((B.px0 + B.px1) / 2, B.py0 + 36, 'zaman', 'f12-tk', 'middle');
      sB += `<text class="f12-tk" transform="translate(${B.px0 - 12} ${q((B.py0 + B.py1) / 2)}) rotate(-90)" text-anchor="middle">PAO₂ (ölçeksiz)</text>`;
      const yol = (f) => { let p = ''; for (let s = 0; s <= 12.0001; s += 0.05) p += (p ? 'L' : 'M') + q(B.X(s)) + ' ' + q(B.Y(pO2(vHac(s), f))); return p; };
      sB += `<path class="f12-on-pe" data-f="var" d="${yol(true)}"/><path class="f12-on-pe" data-f="yok" d="${yol(false)}"/>`;
      sB += tx(B.px1 - 2, B.Y(0.83) - 9, 'FRC var', 'f12-tk f12-on-pl f12-halo', 'end', 'data-f="var"');
      sB += tx(B.X(3.6), B.Y(0.2) + 4, 'FRC yok', 'f12-tk f12-on-pl f12-halo', 'end', 'data-f="yok"');
      sB += `<line class="f12-on-iml" y1="${B.py1}" y2="${B.py0}"/><circle class="f12-on-imn" r="5"/>`;
      // C
      let sC = tx(Cg.ox, Cg.ty, 'Mekanik', 'f12-vt-bas');
      const XF = 1500 / 4500;
      sC += `<line class="f12-ax" x1="${Cg.px0}" x2="${Cg.px1}" y1="${Cg.py0}" y2="${Cg.py0}"/>`;
      [[0, 'RV'], [XF, 'FRC'], [1, 'TLC']].forEach(([x, l]) => { sC += `<line class="f12-ax" x1="${q(Cg.X(x))}" x2="${q(Cg.X(x))}" y1="${Cg.py0}" y2="${Cg.py0 + 5}"/>` + tx(Cg.X(x), Cg.py0 + 17, l, 'f12-tk', 'middle'); });
      sC += tx((Cg.px0 + Cg.px1) / 2, Cg.py0 + 32, 'akciğer hacmi', 'f12-tk', 'middle');
      const kom = (x) => (x <= XF ? 1 - 0.8 * ((XF - x) / XF) ** 2 : 1 - ((x - XF) / (1 - XF)) ** 2);
      const pvr = (x) => (x <= XF ? 0.25 + 0.9 * ((XF - x) / XF) ** 2 : 0.25 + 0.75 * ((x - XF) / (1 - XF)) ** 2);
      const eg = (fn) => { let p = ''; for (let i = 0; i <= 100; i++) { const x = i / 100; p += (p ? 'L' : 'M') + q(Cg.X(x)) + ' ' + q(Cg.Y(fn(x))); } return p; };
      sC += `<line class="f12-on-frc" x1="${q(Cg.X(XF))}" x2="${q(Cg.X(XF))}" y1="${Cg.py1 - 4}" y2="${Cg.py0}"/>`;
      sC += `<path class="f12-on-kom" d="${eg(kom)}"/><path class="f12-on-pvr" d="${eg(pvr)}"/>`;
      sC += `<circle class="f12-on-kn" cx="${q(Cg.X(XF))}" cy="${q(Cg.Y(1))}" r="4.5"/><circle class="f12-on-pn" cx="${q(Cg.X(XF))}" cy="${q(Cg.Y(0.25))}" r="4.5"/>`;
      if (d) {
        sC += tx(Cg.X(XF) + 10, Cg.Y(1) + 4, 'kompliyans en yüksek', 'f12-lb f12-on-kt f12-halo') + tx(Cg.X(XF) + 10, Cg.Y(0.25) + 16, 'PVR en düşük (Bölüm 23)', 'f12-lb f12-on-pt f12-halo');
      } else {
        sC += tx(Cg.X(XF) - 16, Cg.Y(1) - 10, 'kompliyans en yüksek', 'f12-lb f12-on-kt f12-halo') + tx(Cg.X(XF) + 22, Cg.Y(0.25) + 16, 'PVR en düşük', 'f12-lb f12-on-pt f12-halo', 'middle') + tx(Cg.X(XF) + 22, Cg.Y(0.25) + 29, '(Bölüm 23)', 'f12-tk f12-halo', 'middle');
      }
      sC += `<rect class="f12-hit" x="${Cg.ox}" y="0" width="${d ? 330 : 210}" height="${d ? 170 : 290}"/>`;
      const cG = `<g class="f12-on-c" role="button" tabindex="0" aria-label="Mekanik: kompliyans FRC'de en yüksek, pulmoner vasküler direnç en düşük">${sC}</g>`;
      const desen = `<defs>${tarama('f12-on-tarama')}</defs>`;
      if (!d) {
        kutu.innerHTML = `<svg class="f12-svg" viewBox="0 0 760 300" role="img" aria-label="FRC var ve yok iken alveol, kapiller oksijenlenme, PAO₂ eğrisi; kompliyans ve PVR'nin akciğer hacmiyle değişimi">${desen}${sA}${sB}${cG}</svg>`;
      } else {
        kutu.innerHTML = `<svg class="f12-svg f12-dar" viewBox="0 0 340 200" role="img" aria-label="Alveol ve kapiller oksijenlenme">${desen}${sA}</svg>
          <svg class="f12-svg f12-dar" viewBox="0 0 340 190" role="img" aria-label="Zamana karşı PAO₂">${sB}</svg>
          <svg class="f12-svg f12-dar" viewBox="0 0 340 170" role="img" aria-label="Kompliyans ve PVR'nin akciğer hacmiyle değişimi">${cG}</svg>`;
      }
      E = {
        br: kutu.querySelector('.f12-on-br'), alv: kutu.querySelector('.f12-on-alv'), rbc: [...kutu.querySelectorAll('.f12-on-rbc ellipse')],
        kl: kutu.querySelector('.f12-on-kl'), col: kutu.querySelector('.f12-on-col'), ac: kutu.querySelector('.f12-on-ac'), ac2: kutu.querySelector('.f12-on-ac2'),
        pe: [...kutu.querySelectorAll('.f12-on-pe')], pl: [...kutu.querySelectorAll('.f12-on-pl')], iml: kutu.querySelector('.f12-on-iml'), imn: kutu.querySelector('.f12-on-imn'),
      };
      ciz(0);
    };
    const ciz = (dt) => {
      const A = G.A, B = G.B, v = vHac(t), p = pO2(v, frc), r = rAlv(v, frc), c = ((t % 4) + 4) % 4;
      E.alv.setAttribute('r', q(r));
      E.br.setAttribute('d', `M${A.ax - 4} ${A.bt}L${A.ax - 4} ${q(A.ay - r + 1)}M${A.ax + 4} ${A.bt}L${A.ax + 4} ${q(A.ay - r + 1)}`);
      const kol = !frc && r < 14, ac = !frc && c < 1.0 && !RM, parla = !frc && c < 0.4 && !RM;
      sinifla(E.alv, 'kol', kol); sinifla(E.alv, 'parla', parla);
      E.col.textContent = kol && !ac ? (dar ? 'kollaps' : 'kollaps (atelektazi)') : '';
      E.ac.textContent = ac ? (dar ? 'yeniden açılma → iş ↑' : 'her solukta yeniden açılma') : '';
      E.ac2.textContent = ac && !dar ? '→ solunum işi ↑' : '';
      E.kl.textContent = frc ? (dar ? 'kapiller: sürekli O₂' : 'kapiller: sürekli oksijenlenme') : (dar ? 'kapiller: aralıklı O₂' : 'kapiller: aralıklı oksijenlenme');
      // eritrositler
      const L = A.kx1 - A.kx0 - 20, z0 = A.ax - 50, z1 = A.ax + 50, cy = A.ky + A.kh / 2;
      KAN.forEach((k, i) => {
        const s0 = k.s;
        k.s = (k.s + (dt * 40) / L) % 1;
        if (k.s < s0) k.ox = false;
        const x = A.kx0 + 10 + k.s * L;
        if (x < z0) k.ox = false;
        else if (x <= z1) k.ox = p >= 0.7;
        if (RM && x > z1) k.ox = p >= 0.7;
        const e = E.rbc[i]; e.setAttribute('cx', q(x)); e.setAttribute('cy', q(cy)); e.setAttribute('class', k.ox ? 'ox' : 'dox');
      });
      // PAO₂
      E.pe.forEach((pa) => { const on = (pa.dataset.f === 'var') === frc; pa.classList.toggle('on', on); });
      E.pl.forEach((pa) => { const on = (pa.dataset.f === 'var') === frc; pa.classList.toggle('on', on); });
      const im = !RM;
      E.iml.style.display = im ? '' : 'none'; E.imn.style.display = im ? '' : 'none';
      if (im) { const s = ((t % 12) + 12) % 12, x = q(B.X(s)); E.iml.setAttribute('x1', x); E.iml.setAttribute('x2', x); E.imn.setAttribute('cx', x); E.imn.setAttribute('cy', q(B.Y(p))); }
    };
    const yaz = () => { basSec(el, 'f', frc ? 'var' : 'yok'); btn.textContent = oyn ? 'Duraklat' : 'Oynat'; btn.disabled = RM; };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const f = e.target.closest('button[data-f]'); if (f) { frc = f.dataset.f === 'var'; cap(frc ? C_VAR : C_YOK); yaz(); ciz(0); return; }
      if (e.target.closest('[data-a="oyn"]')) { oyn = !oyn; yaz(); return; }
      if (e.target.closest('.f12-on-c')) cap(C_MEK);
    });
    el.addEventListener('keydown', (e) => { if (e.target.closest('.f12-on-c') && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); cap(C_MEK); } });
    const durY = yerlesim(el, kur);
    yaz();
    const durT = ticker(el, (dt) => { if (!oyn || RM) return; t += dt; ciz(dt); });
    return () => { durT(); durY(); };
  };

  /* ================= 9 · Çok soluklu N₂ yıkama ================= */
  VIZ.f12_n2 = (el) => {
    const cap = kapsiyon(el);
    const VT = 500, FI = 0.79, HAP = 1000;
    let FRC = 3000, hap = false, n = 0, o2 = false, oyn = false, ta = 0, th = 0, puf = -1, dar = false, S = null, E = {}, GG = null;
    const seri = () => {
      const Vb = hap ? FRC - HAP : FRC, F = [FI], V = [0];
      let k = 0;
      while (F[k] >= 0.01 && k < 200) { k++; F[k] = (F[k - 1] * Vb) / (Vb + VT); V[k] = V[k - 1] + VT * F[k]; }
      return { Vb, F, V, N: k };
    };
    const pct = (f, d = 2) => fmt(f * 100, d);
    el.innerHTML = `<div class="f12-ust"><div class="btn-row"><button type="button" class="btn" data-a="oyn">Yıkamayı oynat</button><button type="button" class="btn ghost" data-a="ileri">Sonraki soluk ›</button><button type="button" class="btn ghost" data-a="bas">Baştan</button></div></div>
      <div class="f12-n2-ctl"><div class="f12-rng"><span>Gerçek FRC <b data-o="frc"></b></span><input type="range" min="1500" max="4500" step="100" value="3000" data-r="frc" aria-label="Gerçek FRC (mL)"></div><label class="f12-chk"><input type="checkbox" data-c="hap"><span>Gaz hapsi (1000 mL)</span></label></div>
      <div class="f12-durum"><span class="f12-saat" data-o="saat"></span></div>
      <div class="f12-n2-cz"><div class="f12-n2-d"></div><div class="f12-n2-g"><div class="f12-n2-gs"></div><div class="f12-lej"><span><i style="--k:var(--muted)"></i>ekspire N₂ (%) · çubuk</span><span><i style="--k:var(--c-clin)"></i>toplanan N₂ (mL) · çizgi</span></div></div></div>
      <div class="f12-n2-hesap" data-o="hesap"></div>`;
    const o = (k) => el.querySelector(`[data-o="${k}"]`);
    const kD = el.querySelector('.f12-n2-d'), kG = el.querySelector('.f12-n2-gs'), btnO = el.querySelector('[data-a="oyn"]'), btnI = el.querySelector('[data-a="ileri"]');
    const tx = (x, y, s, cls = 'f12-tk', an = 'start') => `<text class="${cls}" x="${q(x)}" y="${q(y)}" text-anchor="${an}">${s}</text>`;
    // devre: tek geometri (340 × 304)
    const LOB = [[196, 200], [264, 200]], LRX = 32, LRY = 66, LT = 134, LB = 266;
    const PUF = [[222, 96], [150, 96], [60, 96], [60, 168], [60, 214]];
    const valf = (x, y, yon) => { const a = { s: Math.PI, a: Math.PI / 2 }[yon]; const p = (ang, rr) => `${q(x + Math.cos(ang) * rr)} ${q(y + Math.sin(ang) * rr)}`; return `<circle class="f12-n2-vf" cx="${x}" cy="${y}" r="9"/><path class="f12-n2-vu" d="M${p(a, 5)}L${p(a + 2.4, 5)}L${p(a - 2.4, 5)}Z"/>`; };
    const kurD = () => {
      kD.innerHTML = `<svg class="f12-svg${dar ? ' f12-dar' : ''}" viewBox="0 0 340 304" role="img" aria-label="N₂ yıkama devresi: O₂ kaynağı, inspiratuvar kol, hasta akciğeri, ekspiratuvar koldaki N₂ analizörü ve toplanan gaz torbası">
        <defs>${tarama('f12-n2-tarama')}<clipPath id="f12-n2-klip">${LOB.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="${LRX}" ry="${LRY}"/>`).join('')}</clipPath></defs>
        <path class="f12-n2-boru" d="M136 34L322 34L322 96L238 96"/><path class="f12-n2-boru" d="M222 96L60 96L60 118"/><path class="f12-n2-boru" d="M60 168L60 190"/>
        <path class="f12-n2-ok" d="${okD(262, 96, 246, 96, 7)}"/><path class="f12-n2-ok" d="${okD(100, 96, 84, 96, 7)}"/>
        ${valf(322, 64, 'a')}${valf(150, 96, 's')}
        <rect class="f12-n2-kay" x="14" y="16" width="90" height="36" rx="7"/><text class="f12-lb f12-n2-kayt" x="59" y="39" text-anchor="middle"></text>
        <path class="f12-n2-boru" d="M104 34L116 34"/><circle class="f12-n2-v3" cx="126" cy="34" r="10"/><path class="f12-n2-v3c" d="M116 34L136 34M126 34L126 24"/>
        ${tx(14, 70, 'FRC\'de havadan O₂\'ye')}
        ${tx(229, 24, 'inspiratuvar kol', 'f12-tk', 'middle')}${tx(214, 113, 'ekspiratuvar kol', 'f12-tk', 'end')}
        <path class="f12-n2-tr" d="M230 96L230 122M230 122L198 140M230 122L262 140"/><circle class="f12-n2-y" cx="230" cy="96" r="5"/>
        <g clip-path="url(#f12-n2-klip)"><rect class="f12-n2-lo2" x="160" y="${LT}" width="140" height="${LB - LT}"/><rect class="f12-n2-ln2" x="160" width="140"/><rect class="f12-n2-lh" x="160" width="140"/><rect class="f12-n2-lht" x="160" width="140" fill="url(#f12-n2-tarama)"/></g>
        ${LOB.map(([x, y]) => `<ellipse class="f12-n2-lob" cx="${x}" cy="${y}" rx="${LRX}" ry="${LRY}"/>`).join('')}
        <line class="f12-n2-duv"/><g class="f12-n2-x"><path/><path/></g>
        <text class="f12-lb f12-n2-to2 f12-halo" x="264" text-anchor="middle">O₂</text><text class="f12-lb f12-n2-tn2 f12-halo" x="264" text-anchor="middle">N₂</text>
        <g class="f12-n2-hapl">${tx(230, 284, 'hapsolmuş · 1000 mL', 'f12-tk f12-n2-ht', 'middle')}${tx(230, 298, '(yıkanmaz)', 'f12-tk f12-n2-ht', 'middle')}</g>
        <rect class="f12-n2-an" x="10" y="118" width="100" height="50" rx="7"/>${tx(60, 136, 'N₂ analizörü', 'f12-lb', 'middle')}<text class="f12-n2-ant" x="60" y="159" text-anchor="middle"></text>
        <circle class="f12-n2-tor" cx="60"/>
        ${tx(60, 284, 'toplanan gaz', 'f12-tk', 'middle')}<text class="f12-lb f12-n2-tv" x="60" y="298" text-anchor="middle"></text>
        <circle class="f12-n2-puf" r="5"/>
      </svg>`;
      E.kay = kD.querySelector('.f12-n2-kay'); E.kayt = kD.querySelector('.f12-n2-kayt'); E.ln2 = kD.querySelector('.f12-n2-ln2'); E.lh = kD.querySelector('.f12-n2-lh'); E.lht = kD.querySelector('.f12-n2-lht');
      E.duv = kD.querySelector('.f12-n2-duv'); E.x = kD.querySelector('.f12-n2-x'); E.to2 = kD.querySelector('.f12-n2-to2'); E.tn2 = kD.querySelector('.f12-n2-tn2'); E.hapl = kD.querySelector('.f12-n2-hapl');
      E.ant = kD.querySelector('.f12-n2-ant'); E.tor = kD.querySelector('.f12-n2-tor'); E.tv = kD.querySelector('.f12-n2-tv'); E.puf = kD.querySelector('.f12-n2-puf');
    };
    const kurG = () => {
      const g = (GG = dar ? { W: 340, H: 230, px0: 36, px1: 284, py0: 186, py1: 22, dx: 10, rx: 290, rt: 334, lt: 10, xl: 220 } : { W: 400, H: 340, px0: 46, px1: 332, py0: 286, py1: 30, dx: 5, rx: 338, rt: 392, lt: 12, xl: 322 });
      const sl = (g.px1 - g.px0) / 46;
      g.X = (i) => g.px0 + (i + 0.5) * sl; g.Y = (f) => g.py0 - (f / 0.8) * (g.py0 - g.py1); g.Yr = (v) => g.py0 - (v / 3600) * (g.py0 - g.py1); g.bw = sl * 0.62;
      let s = '';
      for (let f = 0; f <= 80; f += 20) s += `<line class="f12-grid" x1="${g.px0}" x2="${g.px1}" y1="${q(g.Y(f / 100))}" y2="${q(g.Y(f / 100))}"/>${tx(g.px0 - 6, g.Y(f / 100) + 4, f, 'f12-tk', 'end')}`;
      for (let v = 0; v <= 3600; v += 1200) s += `<line class="f12-ax" x1="${g.px1}" x2="${g.px1 + 4}" y1="${q(g.Yr(v))}" y2="${q(g.Yr(v))}"/>${tx(g.rx, g.Yr(v) + 4, v, 'f12-tk f12-n2-rt')}`;
      for (let i = 0; i <= 45; i += g.dx) s += `<line class="f12-ax" x1="${q(g.X(i))}" x2="${q(g.X(i))}" y1="${g.py0}" y2="${g.py0 + 5}"/>${tx(g.X(i), g.py0 + 18, i, 'f12-tk', 'middle')}`;
      s += `<line class="f12-ax" x1="${g.px0}" x2="${g.px1}" y1="${g.py0}" y2="${g.py0}"/><line class="f12-ax" x1="${g.px0}" x2="${g.px0}" y1="${g.py0}" y2="${g.py1}"/><line class="f12-ax f12-n2-rax" x1="${g.px1}" x2="${g.px1}" y1="${g.py0}" y2="${g.py1}"/>`;
      s += tx((g.px0 + g.px1) / 2, g.xl, 'Soluk', 'f12-tk', 'middle');
      s += `<text class="f12-tk" transform="translate(${g.lt} ${q((g.py0 + g.py1) / 2)}) rotate(-90)" text-anchor="middle">Ekspire N₂ (%)</text>`;
      s += `<text class="f12-tk f12-n2-rt" transform="translate(${g.rt} ${q((g.py0 + g.py1) / 2)}) rotate(-90)" text-anchor="middle">${dar ? 'toplanan (mL)' : 'Toplanan N₂ (mL)'}</text>`;
      s += `<line class="f12-n2-bir" x1="${g.px0}" x2="${g.px1}" y1="${q(g.Y(0.01))}" y2="${q(g.Y(0.01))}"/>${tx(g.px1 - 4, g.Y(0.01) - 6, 'test biter: &lt; %1', 'f12-lb f12-n2-birt f12-halo', 'end')}`;
      s += `<rect class="f12-n2-ref" x="${q(g.X(0) - g.bw / 2)}" y="${q(g.Y(FI))}" width="${q(g.bw)}" height="${q(g.py0 - g.Y(FI))}"/>${tx(g.X(0) - g.bw / 2, g.Y(FI) - 6, 'hava', 'f12-tk')}`;
      s += `<g class="f12-n2-bar"></g><path class="f12-n2-cum"/><circle class="f12-n2-cn" r="4"/><text class="f12-lb f12-n2-ct f12-halo"></text>`;
      kG.innerHTML = `<svg class="f12-svg${dar ? ' f12-dar' : ''}" viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="Her solukta ekspire edilen N₂ yüzdesi (çubuklar) ve toplanan N₂ hacmi (çizgi)">${s}</svg>`;
      E.bar = kG.querySelector('.f12-n2-bar'); E.cum = kG.querySelector('.f12-n2-cum'); E.cn = kG.querySelector('.f12-n2-cn'); E.ct = kG.querySelector('.f12-n2-ct');
      kurBar();
    };
    const kurBar = () => {
      const g = GG;
      let s = '';
      for (let i = 1; i <= S.N; i++) s += `<rect data-i="${i}" class="${i === S.N ? 'son' : ''}" x="${q(g.X(i) - g.bw / 2)}" y="${q(g.Y(S.F[i]))}" width="${q(g.bw)}" height="${q(Math.max(0.6, g.py0 - g.Y(S.F[i])))}"/>`;
      E.bar.innerHTML = s; E.bars = [...E.bar.querySelectorAll('rect')];
    };
    const set = (e, a) => { for (const k in a) e.setAttribute(k, a[k]); };
    const ciz = () => {
      const bitti = n >= S.N, Fn = S.F[n], V = S.V[n];
      // kaynak
      E.kayt.textContent = o2 ? '%100 O₂' : 'hava'; sinifla(E.kay, 'o2', o2);
      // akciğer katmanları
      const ht = hap ? ((LB - LT) * HAP) / FRC : 0, bc = LB - ht, hn = (bc - LT) * (Fn / FI);
      set(E.ln2, { y: q(bc - hn), height: q(Math.max(0, hn)) });
      E.lh.style.display = hap ? '' : 'none'; E.lht.style.display = hap ? '' : 'none'; E.duv.style.display = hap ? '' : 'none'; E.x.style.display = hap ? '' : 'none'; E.hapl.style.display = hap ? '' : 'none';
      if (hap) {
        set(E.lh, { y: q(bc), height: q(ht) }); set(E.lht, { y: q(bc), height: q(ht) });
        set(E.duv, { x1: 160, x2: 300, y1: q(bc), y2: q(bc) });
        const xs = E.x.querySelectorAll('path'); [LOB[0][0], LOB[1][0]].forEach((x, i) => xs[i].setAttribute('d', `M${x - 5} ${q(bc - 5)}L${x + 5} ${q(bc + 5)}M${x + 5} ${q(bc - 5)}L${x - 5} ${q(bc + 5)}`));
      }
      const ho = bc - hn - LT;
      E.to2.style.display = ho > 18 ? '' : 'none'; E.to2.setAttribute('y', q(LT + Math.max(ho / 2, 14) + 5));
      E.tn2.style.display = hn > 18 ? '' : 'none'; E.tn2.setAttribute('y', q(bc - hn / 2 + 5));
      // analizör, torba
      E.ant.textContent = '%' + pct(Fn, 1);
      const rt = 10 + 24 * Math.sqrt(Math.min(1, n / 45));
      set(E.tor, { cy: 226, r: q(rt) });
      E.tv.textContent = `N₂: ${tam(V)} mL`;
      // puf
      if (puf >= 0) {
        const L = PUF.length - 1, u = Math.min(0.999, puf) * L, k = Math.floor(u), f = u - k;
        set(E.puf, { cx: q(lerp(PUF[k][0], PUF[k + 1][0], f)), cy: q(lerp(PUF[k][1], PUF[k + 1][1], f)) }); E.puf.style.display = '';
      } else E.puf.style.display = 'none';
      // grafik
      const g = GG;
      E.bars.forEach((b) => { b.style.display = +b.dataset.i <= n ? '' : 'none'; });
      let p = `M${q(g.X(0))} ${q(g.Yr(0))}`; for (let i = 1; i <= n; i++) p += `L${q(g.X(i))} ${q(g.Yr(S.V[i]))}`;
      E.cum.setAttribute('d', p);
      const cx = g.X(n), cy = g.Yr(V), sag = cx + 70 > g.px1;
      set(E.cn, { cx: q(cx), cy: q(cy) });
      set(E.ct, { x: q(sag ? cx - 8 : cx + 8), y: q(cy - 8), 'text-anchor': sag ? 'end' : 'start' }); E.ct.textContent = n > 0 ? `${tam(V)} mL` : '';
      E.cn.style.display = n > 0 ? '' : 'none';
      // metinler
      o('frc').textContent = `${FRC} mL`;
      o('saat').textContent = n === 0 ? (o2 ? 'Gaz %100 O₂\'ye çevrildi' : 'Soluk 0 · hasta oda havası soluyor') : `Soluk ${n} / ${S.N} · ekspire N₂ %${pct(Fn)}`;
      const fs = fmt(S.F[S.N], 4), Vs = tam(S.V[S.N]);
      const sonFRC = tam(S.V[S.N] / (FI - S.F[S.N])), kitap = tam((S.V[S.N] * S.F[S.N]) / FI);
      o('hesap').innerHTML = `<p class="f12-n2-h1">Toplanan N₂: <b>${tam(V)} mL</b> · son N₂ %${pct(Fn)} · ${n} soluk</p>` + (bitti
        ? `<p class="f12-n2-h2"><span>FRC = ${Vs} ÷ (0,79 − ${fs}) = <b>${sonFRC} mL</b></span><span class="tag ok">doğru denklem</span></p><p class="f12-n2-h3"><span>Kitaptaki basılı denklemle: ${Vs} × ${fs} ÷ 0,79 ≈ ${kitap} mL</span><span class="tag crit">hatalı</span></p>` + (hap ? `<p class="f12-n2-h4">Gerçek FRC ${FRC} mL; ölçülen ${sonFRC} mL: hapsolmuş gazdaki N₂ yıkanmadı.</p>` : '')
        : '<p class="f12-ipucu">Ekspire N₂ %1\'in altına inince test biter ve FRC hesaplanır.</p>');
      btnO.textContent = oyn ? 'Duraklat' : bitti ? 'Yeniden oynat' : n > 0 || o2 ? 'Sürdür' : 'Yıkamayı oynat';
      btnI.disabled = bitti;
      if (n === 0) cap('<b>Başlangıç.</b> Hasta oda havası solur; kuru havanın %79\'u N₂\'dir. Tidal ekspirasyonun sonunda (FRC\'de) inspire edilen gaz %100 O₂\'ye çevrilir. [[K1 s. 54]]');
      else if (!bitti) cap(`<b>Soluk ${n}.</b> Ekspire edilen bütün gaz N₂ analizöründen geçip toplanır; akciğerdeki N₂ yerini O₂'ye bırakır. Ekspire N₂: %${pct(Fn)}. [[K1 s. 54]]`);
      else cap(`<b>Test bitti: ekspire N₂ %1'in altında.</b> Toplanan N₂ hacmi (toplanan gaz hacmi × N₂ konsantrasyonu) ${Vs} mL; FRC = ${Vs} ÷ (0,79 − ${fs}) = ${sonFRC} mL. Bu yöntem, anatomik ölü boşluğu ve CC'yi ölçen tek soluk N₂ yıkamadan (Fowler yöntemi) farklıdır. [[K1 s. 54–55]]` + (hap ? ' Hapsolmuş 1000 mL\'deki N₂ yıkanmadı: yöntem, gaz dilüsyonu gibi hacmi olduğundan düşük ölçtü. [[K1 s. 54]]' : ''));
    };
    const sifirla = () => { S = seri(); n = 0; o2 = false; oyn = false; ta = 0; th = 0; puf = -1; if (E.bar) kurBar(); };
    const nefes = () => { o2 = true; if (n < S.N) { n++; puf = RM ? -1 : 0; } };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const a = e.target.closest('[data-a]'); if (!a) return;
      const k = a.dataset.a;
      if (k === 'oyn') {
        if (oyn) oyn = false;
        else {
          if (n >= S.N) sifirla();
          if (RM) { o2 = true; n = S.N; } else oyn = true;
        }
      } else if (k === 'ileri') { oyn = false; nefes(); } else if (k === 'bas') sifirla();
      ciz();
    });
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (r) { FRC = +r.value; sifirla(); ciz(); return; }
      const c = e.target.closest('[data-c]'); if (c) { hap = c.checked; sifirla(); ciz(); }
    });
    S = seri();
    const durY = yerlesim(el, (d) => { dar = d; kurD(); kurG(); ciz(); });
    const durT = ticker(el, (dt) => {
      let deg = false;
      if (oyn) {
        if (!o2) { th += dt; if (th >= 0.8) { o2 = true; ta = 0; } deg = true; }
        else { ta += dt; while (ta >= 0.25 && n < S.N) { ta -= 0.25; nefes(); deg = true; } if (n >= S.N) { oyn = false; deg = true; } }
      }
      if (puf >= 0) { puf += dt / 0.22; if (puf >= 1) puf = -1; deg = true; }
      if (deg) ciz();
    });
    return () => { durT(); durY(); };
  };
})();
