/* Fizyoloji Bölüm 26 · Anestezi ve akciğer · bileşenler (K1 s. 107–110). Tarif: docs/tasarim/fiz26.md
   1 f26_ilac        ilaç sınıfı → hedef haritası ve solunum izi (RR, VT, V̇E, V̇A) (K1 s. 47, 91, 96, 100, 107–108)
   2 f26_tup         hava yolu aracı: Hagen–Poiseuille direnci (iç çap) ve mekanik ölü boşluk (K1 s. 47, 89, 108, 418–419)
   3 f26_frc         FRC ile kapanma kapasitesi: ayakta → sırtüstü → indüksiyon → pozisyon → PEEP (K1 s. 50–55, 108–109)
   4 f26_atelektazi  kapalı hava yolunun ardındaki alveol: solunan gaza göre absorpsiyon atelektazisi (K1 s. 108–109)
   5 f26_vq          sırtüstü akciğer kesiti: kapanma, atelektazi, zon 1, HPV, FiO₂ ve PEEP (K1 s. 64–65, 69–72, 99–100, 108–109)
   6 f26_ppc         PPC zinciri: etkenler → mekanizmalar → komplikasyonlar; önlemler bağlantıları keser (K1 s. 107–110)
   Modeller şematiktir; sayfadaki viz-foot notları bunu söyler. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;

  /* ---------- ortak ---------- */
  const DAR = 560; // bileşen bu genişliğin altındaysa telefon yerleşimi
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2);
  const fmt = (v, d = 1) => {
    const m = Math.pow(10, d);
    let s = (Math.round(v * m) / m).toFixed(d);
    if (/^-0(\.0+)?$/.test(s)) s = s.slice(1);
    return s.replace('.', ',').replace('-', '−');
  };
  const n0 = (v) => fmt(v, 0);
  const r1 = (v) => Math.round(v * 10) / 10;
  const yuzdeFark = (yeni, eski) => {
    const p = Math.round(((yeni - eski) / eski) * 100);
    return { p, s: p === 0 ? '%0' : (p < 0 ? '−%' : '+%') + Math.abs(p) };
  };
  const segHtml = (ad, key, opts, cur) => `<div class="f26-segk"><span>${ad}</span><div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(String(v) === String(cur))}">${l}</button>`).join('')}</div></div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  /* açıklama yazıcı: null → sayfadaki varsayılan metin */
  const capYazici = (el) => {
    const v = el.closest('.viz'), cap = v && v.querySelector('.viz-cap');
    const ilk = cap ? cap.innerHTML : '';
    let son = null;
    return (h) => {
      const html = h == null ? ilk : REF(h);
      if (cap && html !== son) { cap.innerHTML = html; son = html; }
    };
  };
  const genislikIzle = (el, cb) => {
    if (!('ResizeObserver' in window)) return () => {};
    let son = el.clientWidth < DAR;
    const ro = new ResizeObserver(() => { const d = el.clientWidth < DAR; if (d !== son) { son = d; cb(); } });
    ro.observe(el);
    return () => ro.disconnect();
  };
  const T = (x, y, cls, s, a, ek = '') => `<text x="${r1(x)}" y="${r1(y)}" class="${cls}"${a ? ` text-anchor="${a}"` : ''}${ek}>${s}</text>`;
  const Ln = (x1, y1, x2, y2, cls, ek = '') => `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" class="${cls}"${ek}/>`;
  const Rc = (x, y, w, h, cls, ek = '') => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(Math.max(0, w))}" height="${r1(Math.max(0, h))}" class="${cls}"${ek}/>`;
  const at = (e, o) => { if (e) for (const k in o) e.setAttribute(k, typeof o[k] === 'number' ? r1(o[k]) : o[k]); };
  const gor = (e, on) => { if (e) e.style.display = on ? '' : 'none'; };
  const svgAc = (W, H, cls, etiket, ic) => `<svg class="f26-svg ${cls}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${etiket}">${ic}</svg>`;
  /* kelime sarma: '|' zorunlu satır sonu, n = satırdaki en çok karakter */
  const sar = (s, n) => {
    const out = [];
    String(s).split('|').forEach((par) => {
      let cur = '';
      par.trim().split(/\s+/).forEach((w) => {
        if (!cur) cur = w;
        else if ((cur + ' ' + w).length <= n) cur += ' ' + w;
        else { out.push(cur); cur = w; }
      });
      if (cur) out.push(cur);
    });
    return out;
  };
  const harf = (w, fs) => Math.max(4, Math.floor(w / (fs * 0.56)));
  const tsp = (lines, x, y0, lh) => lines.map((l, i) => `<tspan x="${r1(x)}" y="${r1(y0 + i * lh)}">${gvFix(l)}</tspan>`).join('');
  const gvFix = (l) => String(l).replace(/V̇\/Q̇/g, '<tspan class="f26-gv">V̇/Q̇</tspan>');
  const VD = (alt, cls = 'f26-gv') => `<tspan class="${cls}">V̇${alt ? `<tspan baseline-shift="sub" font-size="70%">${alt}</tspan>` : ''}</tspan>`;
  /* sayısal geçiş; RM'de anında */
  const tween = (ciz, sure = 300) => {
    let raf = 0, cur = null;
    const f = (hedef, aninda) => {
      cancelAnimationFrame(raf);
      if (RM || !cur || aninda) { cur = { ...hedef }; ciz(cur); return; }
      const bas = { ...cur }, t0 = performance.now();
      const adim = (t) => {
        const k = ease(Math.min(1, (t - t0) / sure));
        for (const key in hedef) cur[key] = lerp(bas[key] ?? hedef[key], hedef[key], k);
        ciz(cur);
        if (k < 1) raf = requestAnimationFrame(adim);
      };
      raf = requestAnimationFrame(adim);
    };
    f.dur = () => cancelAnimationFrame(raf);
    return f;
  };
  /* adım denetimi: Önceki / Sonraki (+ Oynat) ve tıklanabilir .phase göstergesi */
  const adimHtml = (adlar, oyn) => `<div class="f26-adim"><div class="btn-row f26-adim-dug"><button type="button" class="btn ghost" data-a="geri">← Önceki</button><button type="button" class="btn" data-a="ileri">Sonraki →</button>${oyn && !RM ? `<button type="button" class="btn ghost" data-a="oyn" aria-pressed="false">${oyn}</button>` : ''}</div>
    <div class="phase f26-faz" role="group" aria-label="Adımlar">${adlar.map((a, i) => `<button type="button" data-i="${i}" aria-pressed="${i === 0}" aria-label="Adım ${i + 1}: ${a}"><b>${i + 1}</b><span>${a}</span></button>`).join('')}</div></div>`;
  const fazGuncelle = (el, i) => el.querySelectorAll('.f26-faz button').forEach((b, k) => {
    b.classList.toggle('on', k === i); b.classList.toggle('past', k < i); b.setAttribute('aria-pressed', String(k === i));
  });

  /* =====================================================================
     1 · İlaçlar solunum sistemini nerede etkiler?
     ===================================================================== */
  VIZ.f26_ilac = (el) => {
    const capY = capYazici(el);
    const AD = {
      1: 'Solunum merkezi|(medulla)', 2: 'Periferik kemoreseptörler|(karotis cisimciği)', 3: 'Larinks ·|laringeal refleksler',
      4: 'Hava yolları|(bronş düz kası)', 5: 'Nöromüsküler kavşak ·|solunum kasları', 6: 'Göğüs duvarı ·|interkostal kaslar',
      7: 'Diyafram (C3–5)', 8: 'Pulmoner|arteriyoller · HPV',
    };
    const IL = [
      { k: 'uyanik', ad: 'Uyanık', rr: 15, vt: 500, h: {}, cap: null },
      { k: 'volatil', ad: 'Volatil ajan', rr: 20, vt: 350, h: { 1: ['c', 'CO₂ yanıtı körelir'], 2: ['c', 'yanıt azalır'], 4: ['o', 'bronkodilatasyon'], 8: ['c', 'HPV bozulur'] },
        cap: "<b>Volatil ajan.</b> İnhalasyon ajanlarının etkisi doza bağımlıdır: solunum sayısı artar, tidal hacim azalır. Hiperkapniye ventilatuvar yanıt körelir; körelme enfluran > desfluran > izofluran > sevofluran > halotan sırasını izler, N₂O'nun etkisi yoktur. Yüzeyel solukta ölü boşluğun payı büyüdüğü için dakika ventilasyonu aynı kalsa bile alveoler ventilasyon düşer. Volatil ajanlar ayrıca küçük hava yollarını genişletir ve hipoksik pulmoner vazokonstriksiyonu bozar. [[K1 s. 107]] [[K1 s. 91, 100]]" },
      { k: 'propofol', ad: 'İV indüksiyon (propofol)', rr: 0, vt: 0, h: { 1: ['c', 'depresyon, apne'], 2: ['c', 'hipoksemi yanıtı kalkar'], 3: ['c', 'refleksler baskılanır (LMA)'] },
        cap: "<b>İntravenöz indüksiyon.</b> İndüksiyonu kısa bir solunum uyarılması izler, ardından solunum merkezi aniden baskılanır: tidal hacim düşer ve özellikle propofolle apne gelişebilir. Propofol laringeal refleksleri baskılar (laringeal maske yerleştirilebilir) ve periferik kemoreseptörlerin hipoksemiye yanıtını ortadan kaldırdığı düşünülür. [[K1 s. 107]]" },
      { k: 'ketamin', ad: 'Ketamin', rr: 15, vt: 480, h: { 1: ['o', 'spontan ventilasyon korunur'], 3: ['o', 'refleksler korunur'] },
        cap: '<b>Ketamin.</b> Öteki intravenöz ajanlardan ayrılır: kardiyovasküler stabilitenin yanında hava yolu reflekslerini ve spontan ventilasyonu da korur. [[K1 s. 107]]' },
      { k: 'opioid', ad: 'Opioid', rr: 8, vt: 500, h: { 1: ['c', 'RR azalır, CO₂ yanıtı körelir; öksürük baskılanır'], 4: ['w', 'morfin: histamin'], 6: ['c', 'tahta göğüs (nadir)'] },
        cap: "<b>Opioid.</b> Solunum merkezi baskılanır: solunum sayısı azalır ve hiperkapniye ventilatuvar yanıt körelir. Öksürük refleksi baskılanır; morfin histamin salınımıyla duyarlı hastalarda bronkospazmı tetikleyebilir; güçlü opioidlerin hızlı intravenöz enjeksiyonundan sonra nadiren göğüs duvarı rijiditesi görülür. Bölüm 22'ye göre etki kemoreseptörlerde değil, medulladaki solunum merkezindedir. [[K1 s. 107]] [[K1 s. 96]]" },
      { k: 'benzo', ad: 'Benzodiazepin', rr: 10, vt: 450, h: { 1: ['c', 'RR azalır, CO₂ yanıtı körelir'] },
        cap: '<b>Benzodiazepin.</b> Solunum merkezini baskılar: solunum sayısı azalır ve hiperkapniye ventilatuvar yanıt körelir. [[K1 s. 107]]' },
      { k: 'kas', ad: 'Kas gevşetici', rr: 0, vt: 0, h: { 5: ['c', 'paralizi; mekanik ventilasyon'], 4: ['w', 'atrakuryum: histamin'] },
        cap: '<b>Kas gevşetici.</b> En belirgin etki solunum kası paralizisidir: mekanik ventilasyon gerekir ve postoperatif solunum yetmezliğini önlemek için blok yeterince geri döndürülmelidir. Atrakuryum histamin salınımıyla bronkospazma yol açabilir; süksametonyum ve mivakuryum, plazma kolinesteraz düzeyi düşük hastalarda uzamış güçsüzlük yapabilir. [[K1 s. 107]]' },
      { k: 'nsaii', ad: 'NSAİİ', rr: 15, vt: 500, h: { 4: ['w', 'duyarlı astımlıda bronkospazm'] },
        cap: '<b>NSAİİ.</b> Solunum merkezine ve kaslara etkisi yoktur; duyarlı astımlılarda bronkospazmı tetikleyebilir. [[K1 s. 108]]' },
      { k: 'spinal', ad: 'Yüksek spinal blok', rr: 16, vt: 420, h: { 6: ['c', 'interkostal güçsüzlük'], 7: ['o', 'korunur (C3–5)'] },
        cap: '<b>Yüksek spinal blok.</b> İntratekal lokal anestezik interkostal kaslarda güçsüzlük yapacak kadar yükselebilir; bu en sık, duyusal düzeyin tipik olarak T2–T4 olduğu obstetrik anestezide görülür. Tidal hacim biraz küçülebilir, ama diyafram C3–5 kökleriyle innerve edildiği için blok olağanüstü yüksek değilse çalışmayı sürdürür. [[K1 s. 108]]' },
    ];
    const BY = Object.fromEntries(IL.map((d) => [d.k, d]));
    const VDA = 150; // anatomik ölü boşluk (K1 s. 47)
    const va = (d) => d.rr * Math.max(0, d.vt - VDA);
    const U = BY.uyanik;
    // harita yerleşimi: satırlar [kutu, x, genişlik]
    const MW = { W: 440, fsN: 12.5, fsE: 12, lh: 15, pad: 9, gap: 18, rows: [[[1, 110, 220]], [[2, 6, 206], [3, 228, 206]], [[4, 110, 220]], [[5, 6, 206], [6, 228, 206]], [[8, 6, 168], [7, 186, 248]]] };
    const MN = { W: 360, fsN: 13, fsE: 12.5, lh: 15, pad: 8, gap: 12, rows: [[[1, 50, 260]], [[2, 0, 176], [3, 184, 176]], [[4, 50, 260]], [[5, 0, 176], [6, 184, 176]], [[8, 0, 150], [7, 158, 202]]] };
    const TW = { W: 420, H: 202, x0: 44, x1: 408, y0: 162, y1: 30 };
    const TN = { W: 360, H: 192, x0: 40, x1: 350, y0: 150, y1: 26 };
    const s = { k: 'uyanik', off: 0 };
    let M = null, TL = null, B = {}, E = {};

    el.innerHTML = `<div class="f26-ctl">${segHtml('İlaç sınıfı', 'ilac', IL.map((d) => [d.k, d.ad]), s.k)}</div>
      <div class="f26-il-izgara"><div class="f26-il-harita"></div><div class="f26-il-sag"><div class="f26-il-iz"></div><dl class="f26-oku f26-oku-2 f26-il-oku"></dl></div></div>
      <div class="legend f26-il-lej"><span><i class="f26-li-c"></i>baskılanır · bozulur</span><span><i class="f26-li-w"></i>bronkospazm riski</span><span><i class="f26-li-o"></i>korunur · genişler</span></div>`;
    const harita = el.querySelector('.f26-il-harita'), izK = el.querySelector('.f26-il-iz'), oku = el.querySelector('.f26-il-oku');

    const kurHarita = (dar) => {
      M = dar ? MN : MW;
      const chN = (w) => harf(w - 2 * M.pad, M.fsN), chE = (w) => harf(w - 2 * M.pad, M.fsE);
      let y = 6, h = '';
      B = {};
      M.rows.forEach((row) => {
        let rh = 0;
        row.forEach(([id, x, w]) => {
          const nL = sar(AD[id], chN(w)).length;
          const eMax = Math.max(0, ...IL.map((d) => (d.h[id] ? sar(d.h[id][1], chE(w)).length : 0)));
          const bh = 2 * M.pad + (nL + eMax) * M.lh + (eMax ? 5 : 0) - 3;
          B[id] = { x, y, w, h: bh };
          rh = Math.max(rh, bh);
        });
        row.forEach(([id]) => { B[id].h = rh; });
        y += rh + M.gap;
      });
      const H = y + 14;
      const cx = (id) => B[id].x + B[id].w / 2;
      // bağlantılar: kemoreseptör → merkez, merkez → kaslar ve diyafram
      h += `<path class="f26-il-bag" d="M${r1(cx(2))} ${r1(B[2].y)} C${r1(cx(2))} ${r1(B[1].y + B[1].h / 2)} ${r1(B[1].x - 30)} ${r1(B[1].y + B[1].h / 2)} ${r1(B[1].x)} ${r1(B[1].y + B[1].h / 2)}"/>`;
      h += `<path class="f26-il-bag" d="M${r1(cx(1) - 30)} ${r1(B[1].y + B[1].h)} C${r1(cx(1) - 30)} ${r1(B[5].y - 40)} ${r1(cx(5))} ${r1(B[5].y - 40)} ${r1(cx(5))} ${r1(B[5].y)}"/>`;
      h += `<path class="f26-il-bag" d="M${r1(cx(1) + 30)} ${r1(B[1].y + B[1].h)} C${r1(cx(1) + 30)} ${r1(B[7].y - 60)} ${r1(cx(7))} ${r1(B[7].y - 60)} ${r1(cx(7))} ${r1(B[7].y)}"/>`;
      Object.keys(AD).forEach((id) => {
        const b = B[id];
        h += `<g data-b="${id}"><rect class="f26-il-kutu" x="${b.x + 0.75}" y="${b.y}" width="${b.w - 1.5}" height="${b.h}" rx="8"/><text class="f26-il-t"></text></g>`;
      });
      h += T(M.W / 2, H - 6, 'f26-il-saglam', 'Hedefler sağlam', 'middle');
      harita.innerHTML = svgAc(M.W, H, 'f26-il-svg', 'Solunum sistemindeki ilaç hedefleri: solunum merkezi, periferik kemoreseptörler, larinks, hava yolları, nöromüsküler kavşak, göğüs duvarı, diyafram ve pulmoner arteriyoller', h);
      Object.keys(AD).forEach((id) => { B[id].g = harita.querySelector(`[data-b="${id}"]`); B[id].t = B[id].g.querySelector('text'); });
      E.saglam = harita.querySelector('.f26-il-saglam');
    };

    const yazKutular = () => {
      const d = BY[s.k];
      Object.keys(AD).forEach((id) => {
        const b = B[id], ef = d.h[id];
        const nL = sar(AD[id], harf(b.w - 2 * M.pad, M.fsN));
        const eL = ef ? sar(ef[1], harf(b.w - 2 * M.pad, M.fsE)) : [];
        const blok = (nL.length + eL.length) * M.lh + (eL.length ? 5 : 0) - 3;
        const y0 = b.y + (b.h - blok) / 2 + M.fsN * 0.8;
        const x = b.x + b.w / 2;
        let ic = nL.map((l, i) => `<tspan class="f26-il-ad" x="${r1(x)}" y="${r1(y0 + i * M.lh)}">${l}</tspan>`).join('');
        ic += eL.map((l, i) => `<tspan class="f26-il-ef" x="${r1(x)}" y="${r1(y0 + nL.length * M.lh + 5 + i * M.lh)}">${l}</tspan>`).join('');
        b.t.innerHTML = ic;
        b.t.setAttribute('text-anchor', 'middle');
        b.g.setAttribute('class', ef ? `f26-il-on f26-il-${ef[0]}` : '');
      });
      gor(E.saglam, s.k === 'uyanik');
    };

    const kurIz = (dar) => {
      TL = dar ? TN : TW;
      const L = TL, Y = (v) => L.y0 - (v / 600) * (L.y0 - L.y1), X = (t) => L.x0 + (t / 30) * (L.x1 - L.x0);
      L.Y = Y; L.X = X;
      let h = `<defs><clipPath id="f26-ilac-ds"><rect x="${L.x0}" y="${r1(Y(150))}" width="${L.x1 - L.x0}" height="${r1(L.y0 - Y(150))}"/></clipPath></defs>`;
      [0, 200, 400, 600].forEach((v) => { h += Ln(L.x0, Y(v), L.x1, Y(v), 'f26-izg') + T(L.x0 - 6, Y(v) + 4, 'f26-tk', v, 'end'); });
      [0, 10, 20, 30].forEach((t) => { h += Ln(X(t), L.y0, X(t), L.y0 + 4, 'f26-eks') + T(X(t), L.y0 + 17, 'f26-tk', t, 'middle'); });
      h += Ln(L.x0, L.y0, L.x1, L.y0, 'f26-eks') + Ln(L.x0, L.y1, L.x0, L.y0, 'f26-eks');
      h += T(L.x0 - 6, L.y1 - 10, 'f26-ax', 'Hacim (mL)', 'start', ' dx="-30"');
      h += T(L.x1, L.y0 + 34, 'f26-ax', 'Zaman (s)', 'end');
      h += `<path class="f26-il-dolgu"/><path class="f26-il-dsd" clip-path="url(#f26-ilac-ds)"/>`;
      h += Ln(L.x0, Y(150), L.x1, Y(150), 'f26-il-dsc');
      h += `<path class="f26-il-egri"/>`;
      h += T(L.x1 - 4, Y(150) - 5, 'f26-il-dst f26-hale', 'ölü boşluk 150 mL', 'end');
      h += T((L.x0 + L.x1) / 2, (L.y0 + L.y1) / 2, 'f26-il-apne f26-hale', 'Apne · mekanik ventilasyon gerekir', 'middle');
      izK.innerHTML = svgAc(L.W, L.H, 'f26-il-izsvg', 'Otuz saniyelik hacim–zaman izi; her soluğun alt 150 mL’si ölü boşluktur', h);
      E.dolgu = izK.querySelector('.f26-il-dolgu'); E.dsd = izK.querySelector('.f26-il-dsd'); E.egri = izK.querySelector('.f26-il-egri');
      E.apne = izK.querySelector('.f26-il-apne'); E.dst = izK.querySelector('.f26-il-dst');
    };

    const cizIz = () => {
      if (!TL) return;
      const d = BY[s.k], L = TL;
      const apne = d.rr === 0;
      gor(E.apne, apne);
      E.dst.setAttribute('opacity', apne ? '0.4' : '1');
      const f = d.rr / 60, N = 220;
      let p = '';
      for (let i = 0; i <= N; i++) {
        const t = (i / N) * 30;
        const v = apne ? 0 : (d.vt * (1 - Math.cos(2 * Math.PI * f * (t + s.off)))) / 2;
        p += (i ? 'L' : 'M') + r1(L.X(t)) + ' ' + r1(L.Y(v));
      }
      const alan = p + `L${L.x1} ${L.y0}L${L.x0} ${L.y0}Z`;
      E.egri.setAttribute('d', p); E.dolgu.setAttribute('d', alan); E.dsd.setAttribute('d', alan);
    };

    const yazOku = () => {
      const d = BY[s.k], v = va(d), ve = d.rr * d.vt;
      const fk = yuzdeFark(v, va(U));
      const fkE = yuzdeFark(ve, U.rr * U.vt);
      const renk = (p) => (p < 0 ? 'f26-dus' : p > 0 ? 'f26-art' : 'f26-ayni');
      oku.innerHTML = `<div><dt>Solunum sayısı (RR)</dt><dd>${d.rr} /dk</dd></div>
        <div><dt>Tidal hacim (V<sub>T</sub>)</dt><dd>${d.vt} mL</dd></div>
        <div><dt>Dakika ventilasyonu</dt><dd>${ve} mL/dk${s.k !== 'uyanik' ? ` <small class="${renk(fkE.p)}">${fkE.s}</small>` : ''}</dd></div>
        <div><dt>Alveoler ventilasyon</dt><dd>${v} mL/dk${s.k !== 'uyanik' ? ` <small class="${renk(fk.p)}">${fk.s}</small>` : ''}</dd></div>`;
    };

    const kur = () => {
      const dar = el.clientWidth < DAR;
      el.classList.toggle('f26-dar', dar);
      kurHarita(dar); kurIz(dar);
      guncelle();
    };
    const guncelle = () => {
      basSec(el, 'ilac', s.k);
      yazKutular(); yazOku(); cizIz();
      capY(BY[s.k].cap);
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-ilac]');
      if (b) { s.k = b.dataset.ilac; guncelle(); }
    });
    kur();
    const durRO = genislikIzle(el, kur);
    const durT = RM ? () => {} : ticker(el, (dt) => {
      if (BY[s.k].rr === 0) return;
      s.off = (s.off + dt * (30 / 8)) % 600;
      cizIz();
    });
    return () => { durT(); durRO(); };
  };

  /* =====================================================================
     2 · Tüp ne kadar dar, ölü boşluk ne kadar büyük?
     ===================================================================== */
  VIZ.f26_tup = (el) => {
    const capY = capYazici(el);
    const ORN = [['10', 'LMA #4'], ['8', 'ETT 8,0'], ['7', 'ETT 7,0'], ['5', 'ETT 5,0 (4 yaş)'], ['4.5', 'ETT 4,5 (4 yaş, kaflı)'], ['3', 'ETT 3,0']];
    const HAS = {
      eris: { ad: 'Erişkin 70 kg', vt: 500, rr: 15, vda: 150, max: 150, adim: 5, bas: 50 },
      cocuk: { ad: 'Çocuk 16 kg', vt: 112, rr: 24, vda: 32, max: 40, adim: 2, bas: 20 },
    };
    const oran = (d) => Math.pow(8 / d, 4); // R ∝ 1/r⁴, 8,0 mm = ×1 (K1 s. 89)
    const oranS = (v) => (v < 1 ? fmt(v, 2) : v < 9.95 ? fmt(v, 1) : n0(v));
    const s = { gor: 'direnc', d: 8, hasta: 'eris', mek: { eris: 50, cocuk: 20 }, str: 've' };
    let L = null;
    const E = {};

    el.innerHTML = `<div class="f26-ctl">${segHtml('Görünüm', 'gor', [['direnc', 'Direnç'], ['olu', 'Ölü boşluk']], s.gor)}</div>
      <div class="f26-tp-direnc">
        <label class="f26-rng"><span>İç çap <b data-o="d"></b></span><input type="range" min="3" max="10" step="0.5" value="8" aria-label="Tüpün iç çapı, mm" data-r="d"></label>
        <div class="f26-ctl">${segHtml('Örnek', 'orn', ORN, '8')}</div>
        <div class="f26-tp-graf"><div class="f26-tp-kesit"></div><div class="f26-tp-sutun"></div></div>
        <p class="f26-formul" aria-live="polite"></p>
      </div>
      <div class="f26-tp-olu" hidden>
        <div class="f26-ctl">${segHtml('Hasta', 'has', [['eris', 'Erişkin 70 kg'], ['cocuk', 'Çocuk 16 kg']], s.hasta)}${segHtml('Strateji', 'str', [['ve', '<span class="f26-gvh">V̇<sub>E</sub></span> sabit'], ['va', '<span class="f26-gvh">V̇<sub>A</sub></span> sabit']], s.str)}</div>
        <label class="f26-rng"><span>Mekanik ölü boşluk <b data-o="m"></b></span><input type="range" min="0" max="150" step="5" value="50" aria-label="Mekanik ölü boşluk, mL" data-r="m"></label>
        <div class="f26-tp-bant"></div>
      </div>`;
    const pD = el.querySelector('.f26-tp-direnc'), pO = el.querySelector('.f26-tp-olu');
    const rD = el.querySelector('[data-r="d"]'), rM = el.querySelector('[data-r="m"]');
    const oD = el.querySelector('[data-o="d"]'), oM = el.querySelector('[data-o="m"]');
    const kesK = el.querySelector('.f26-tp-kesit'), sutK = el.querySelector('.f26-tp-sutun'), bantK = el.querySelector('.f26-tp-bant'), formul = el.querySelector('.f26-formul');

    /* --- direnç görünümü --- */
    const LMIN = Math.log10(0.4), LMAX = Math.log10(51);
    const kurDirenc = (dar) => {
      // kesit
      const K = dar ? { W: 360, H: 200, cx: 180, cy: 92, ro: 82, k: 7, ty: 194 } : { W: 260, H: 300, cx: 130, cy: 128, ro: 96, k: 8.4, ty: 262 };
      L = { K };
      let h = `<circle class="f26-tp-duvar" cx="${K.cx}" cy="${K.cy}" r="${K.ro}"/><circle class="f26-tp-lumen" cx="${K.cx}" cy="${K.cy}" r="10"/>`;
      h += `<circle class="f26-tp-ref" cx="${K.cx}" cy="${K.cy}" r="${r1(8 * K.k)}"/>`;
      h += T(K.cx, K.cy - 8 * K.k - 5, 'f26-tp-reft f26-hale', 'referans 8,0 mm', 'middle');
      h += T(K.cx, K.ty, 'f26-tp-cap', '', 'middle');
      kesK.innerHTML = svgAc(K.W, K.H, '', 'Tüp kesiti: lümen yarıçapı seçili iç çapla orantılı; kesikli daire 8,0 mm referans lümen', h);
      E.lumen = kesK.querySelector('.f26-tp-lumen'); E.capT = kesK.querySelector('.f26-tp-cap');
      // sütunlar (log ölçek)
      const S = dar ? { W: 360, H: 224, y0: 188, y1: 44, xr: 80, xs: 190, w: 64, xl: 300 } : { W: 300, H: 300, y0: 262, y1: 50, xr: 40, xs: 140, w: 70, xl: 236 };
      S.Y = (v) => S.y0 - ((Math.log10(v) - LMIN) / (LMAX - LMIN)) * (S.y0 - S.y1);
      L.S = S;
      let g = '';
      [1, 2, 5, 10, 20, 50].forEach((v) => { g += Ln(S.xr - 10, S.Y(v), S.xl, S.Y(v), 'f26-izg f26-izg-log') + T(S.xl + 5, S.Y(v) + 4, 'f26-tk', '×' + v); });
      g += Ln(S.xr - 10, S.y0, S.xl, S.y0, 'f26-eks');
      g += Rc(S.xr, S.Y(1), S.w, S.y0 - S.Y(1), 'f26-tp-sref');
      g += T(S.xr + S.w / 2, S.Y(1) - 6, 'f26-tp-srt', '×1', 'middle');
      g += `<rect class="f26-tp-ssec" x="${S.xs}" width="${S.w}" y="${S.y0}" height="0"/>`;
      g += T(S.xs + S.w / 2, S.y0, 'f26-tp-big f26-hale', '', 'middle');
      g += T(S.xr + S.w / 2, S.y0 + 18, 'f26-tk2', '8,0 mm', 'middle');
      g += T(S.xs + S.w / 2, S.y0 + 18, 'f26-tk2', '', 'middle');
      g += T(S.xr - 10, 16, 'f26-ax', 'Direnç (8,0 mm = ×1, log ölçek)', 'start');
      sutK.innerHTML = svgAc(S.W, S.H, '', 'Logaritmik ölçekte direnç oranı: seçili çap ile 8,0 mm referans tüp', g);
      E.ssec = sutK.querySelector('.f26-tp-ssec'); E.big = sutK.querySelector('.f26-tp-big'); E.sdT = sutK.querySelectorAll('.f26-tk2')[1];
    };
    const cizDirenc = (D) => {
      if (!L || !L.K) return;
      const K = L.K, S = L.S, o = oran(D.d);
      at(E.lumen, { r: D.d * K.k });
      const yv = S.Y(clamp(o, 0.4, 51));
      at(E.ssec, { y: yv, height: S.y0 - yv });
      at(E.big, { y: yv - 8 });
    };
    const twD = tween(cizDirenc, 250);
    const yazDirenc = () => {
      const d = s.d, o = oran(d), ds = fmt(d, 1);
      oD.textContent = ds + ' mm';
      rD.value = d;
      basSec(el, 'orn', String(d));
      if (E.capT) E.capT.textContent = `İç çap ${ds} mm`;
      if (E.big) E.big.textContent = '×' + oranS(o);
      if (E.sdT) E.sdT.textContent = ds + ' mm';
      formul.innerHTML = `R ∝ 1 / r⁴  →  (8,0 / ${ds})⁴ = <b>×${oranS(o)}</b>`;
      twD({ d });
      if (d === 8) { capY(null); return; }
      const ek = d >= 9 ? "LMA'nın geniş yarıçapı onu spontan ventilasyona uygun kılar."
        : d >= 6.5 ? 'Tipik erişkin tüpleri bu aralıktadır; dar tüp spontan solunumda iş yükünü artırır.'
          : 'Çocuk tüpleri bu aralıktadır: ETT yarıçapı burada özellikle önemlidir, çünkü solunum işindeki artış spontan solunumu güçleştirir. Yoğun bakım hastaları ventilatörden ayrılırken de olabildiğince geniş tüp yeğlenir.';
      capY(`<b>İç çap ${ds} mm.</b> Direnç 8,0 mm'lik tüpe göre ×${oranS(o)}. Hagen–Poiseuille denklemine göre laminer akımda direnç yarıçapın dördüncü kuvvetiyle ters orantılıdır, bu yüzden çaptaki küçük bir azalma direnci çok artırır. ${ek} [[K1 s. 89, 108]]`);
    };

    /* --- ölü boşluk görünümü --- */
    const BW = { W: 520, H: 300, bx: 14, bmax: 290, bh: 40, rows: [40, 162], tY: -10, lab1: 18, lab2: 31, vbx: 410, vbw: 106, ext: 272, fs: 11.5 };
    const BN = { W: 360, H: 306, bx: 6, bmax: 200, bh: 40, rows: [34, 150], tY: -10, lab1: 18, lab2: 32, vbx: 272, vbw: 86, ext: 256, fs: 12 };
    const hesapOlu = () => {
      const H = HAS[s.hasta], x = s.mek[s.hasta];
      const va0 = H.rr * (H.vt - H.vda);
      const va1 = H.rr * (H.vt - H.vda - x);
      const vt2 = va0 / H.rr + H.vda + x, ve2 = H.rr * vt2;
      return { H, x, va0, va1, vt2, ve2 };
    };
    const etiketYerles = (segs, sol, sag, fs) => {
      // segs: {c (merkez), w (etiket genişliği)} → x konumları (çakışmasız)
      const out = segs.map((g) => ({ ...g, x: g.c }));
      for (let i = 0; i < out.length; i++) {
        out[i].x = Math.max(out[i].x, sol + out[i].w / 2);
        if (i) out[i].x = Math.max(out[i].x, out[i - 1].x + (out[i - 1].w + out[i].w) / 2 + 8);
      }
      for (let i = out.length - 1; i >= 0; i--) {
        out[i].x = Math.min(out[i].x, sag - out[i].w / 2);
        if (i < out.length - 1) out[i].x = Math.min(out[i].x, out[i + 1].x - (out[i + 1].w + out[i].w) / 2 - 8);
      }
      return out;
    };
    const cizOlu = () => {
      const dar = el.clientWidth < DAR;
      const P = dar ? BN : BW, R = hesapOlu(), H = R.H;
      const maxVT = H.vt + H.max + 2;
      const k = P.bmax / maxVT;
      let h = `<defs><marker id="f26-tup-ok" viewBox="0 0 10 10" refX="8.6" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 1 L9 5 L0 9 z" class="f26-mk"/></marker></defs>`;
      h += T(P.vbx + P.vbw, 14, 'f26-ax', `${VD('A')} (mL/dk)`, 'end');
      const satir = (i, mek, vt, vaV) => {
        const y = P.rows[i];
        const parca = [['anatomik', H.vda, 'w'], ['mekanik', mek, 'a'], ['alveoler', vt - H.vda - mek, 'o']].filter((p) => p[1] > 0);
        let x = P.bx, g = '';
        const segs = [];
        parca.forEach(([ad, v, c]) => {
          const w = v * k;
          g += Rc(x, y, w, P.bh, `f26-tp-p f26-tp-p${c}`);
          const t2 = `${n0(v)} mL`;
          segs.push({ c: x + w / 2, w: Math.max(ad.length, t2.length) * P.fs * 0.58, ad, t2, cl: c });
          x += w;
        });
        const son = x;
        const yer = etiketYerles(segs, 2, P.vbx - 70, P.fs);
        yer.forEach((g2, j) => {
          const ly = y + P.bh + P.lab1;
          if (Math.abs(g2.x - segs[j].c) > 3) g += `<path class="f26-tp-kil" d="M${r1(segs[j].c)} ${y + P.bh} L${r1(segs[j].c)} ${y + P.bh + 4} L${r1(g2.x)} ${ly - P.fs + 1}"/>`;
          g += `<text class="f26-tp-lb f26-tp-l${g2.cl}" text-anchor="middle">${tsp([g2.ad, g2.t2], g2.x, ly, P.fs + 2)}</text>`;
        });
        // ok ve V̇A kutusu
        const cy = y + P.bh / 2;
        g += Ln(son + 6, cy, P.vbx - 6, cy, 'f26-tp-ok', ' marker-end="url(#f26-tup-ok)"');
        g += T((son + P.vbx) / 2, cy - 7, 'f26-tp-rr', `× ${H.rr}/dk`, 'middle');
        g += `<rect class="f26-tp-vak" x="${P.vbx}" y="${y - 3}" width="${P.vbw}" height="${P.bh + 6}" rx="8"/>`;
        g += T(P.vbx + P.vbw / 2, cy + 3, 'f26-tp-van', n0(vaV), 'middle') + T(P.vbx + P.vbw / 2, cy + 17, 'f26-tp-vab', 'mL/dk', 'middle');
        return g;
      };
      const vt2 = s.str === 'va' ? R.vt2 : H.vt;
      const va2 = s.str === 'va' ? R.va0 : R.va1;
      h += `<text class="f26-tp-bas" x="${P.bx}" y="${P.rows[0] + P.tY}">Mekanik ölü boşluk yok · V<tspan baseline-shift="sub" font-size="70%">T</tspan> ${H.vt} mL</text>`;
      h += satir(0, 0, H.vt, R.va0);
      h += `<text class="f26-tp-bas" x="${P.bx}" y="${P.rows[1] + P.tY}">Mekanik ölü boşluk ${R.x} mL · V<tspan baseline-shift="sub" font-size="70%">T</tspan> ${n0(vt2)} mL</text>`;
      h += satir(1, R.x, vt2, va2);
      const fk = yuzdeFark(va2, R.va0);
      const my = (P.rows[0] + P.bh + 3 + P.rows[1] - 3) / 2 + 5;
      h += T(P.vbx + P.vbw / 2, my, `f26-tp-yuz ${fk.p < 0 ? 'f26-f-dus' : fk.p > 0 ? 'f26-f-art' : 'f26-f-ayni'}`, (fk.p === 0 ? '= ' : '') + fk.s, 'middle');
      if (s.str === 'va') {
        const metin = `Aynı alveoler ventilasyon için V<tspan baseline-shift="sub" font-size="70%">T</tspan> ${n0(R.vt2)} mL → dakika ventilasyonu ${n0(R.ve2)} mL/dk`;
        if (dar) h += `<text class="f26-tp-ext"><tspan x="${P.bx}" y="${P.ext}">Aynı alveoler ventilasyon için V<tspan baseline-shift="sub" font-size="70%">T</tspan> ${n0(R.vt2)} mL</tspan><tspan x="${P.bx}" y="${P.ext + 17}">→ dakika ventilasyonu ${n0(R.ve2)} mL/dk</tspan></text>`;
        else h += `<text class="f26-tp-ext" x="${P.bx}" y="${P.ext}">${metin}</text>`;
      } else {
        const ve = H.rr * H.vt;
        h += `<text class="f26-tp-ext f26-tp-ext2" x="${P.bx}" y="${P.ext}">Dakika ventilasyonu iki satırda da ${ve} mL/dk</text>`;
      }
      bantK.innerHTML = svgAc(P.W, dar ? P.H : P.H, '', 'Her soluk bant olarak: anatomik ölü boşluk, mekanik ölü boşluk ve alveollere ulaşan bölüm; sağda alveoler ventilasyon', h);
    };
    const yazOlu = () => {
      const R = hesapOlu(), H = R.H;
      rM.max = H.max; rM.step = H.adim; rM.value = R.x;
      oM.textContent = R.x + ' mL';
      basSec(el, 'has', s.hasta); basSec(el, 'str', s.str);
      cizOlu();
      let c = s.hasta === 'eris'
        ? `<b>Erişkin, mekanik ölü boşluk ${R.x} mL.</b> Her soluğun 150 mL'si zaten anatomik ölü boşlukta kalır; aracın ve devrenin hacmi bunun üzerine eklenir. Dakika ventilasyonu değişmezse alveoler ventilasyon ${n0(R.va1)} mL/dk'ya iner. Bütün hava yolu araçları mekanik ölü boşluğu artırır: alveoler ventilasyon korunacaksa dakika ventilasyonu artmalıdır. [[K1 s. 47, 108]]`
        : `<b>Çocuk 16 kg, mekanik ölü boşluk ${R.x} mL.</b> Tidal hacim 7 mL/kg, yani yaklaşık 112 mL'dir; aynı 20 mL'lik bir ısı–nem değiştirici erişkinde küçük bir pay, çocukta tidal hacmin altıda biridir. Bu yüzden çocuklarda mekanik ölü boşluk en aza indirilir: tüpler kısaltılır, kateter bağlantısı kısa tutulur, açılı parçalardan kaçınılır. [[K1 s. 47]] [[K1 s. 419]]`;
      if (s.str === 'va') c += ` Alveoler ventilasyonu korumak için tidal hacim ${n0(R.vt2)} mL'ye, dakika ventilasyonu ${n0(R.ve2)} mL/dk'ya çıkmalıdır. [[K1 s. 47]]`;
      capY(c);
    };

    const kur = () => {
      const dar = el.clientWidth < DAR;
      el.classList.toggle('f26-dar', dar);
      kurDirenc(dar);
      twD({ d: s.d }, true);
      if (s.gor === 'direnc') yazDirenc(); else yazOlu();
    };
    const gorunum = () => {
      basSec(el, 'gor', s.gor);
      pD.hidden = s.gor !== 'direnc'; pO.hidden = s.gor === 'direnc';
      if (s.gor === 'direnc') yazDirenc(); else yazOlu();
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b || !el.contains(b)) return;
      if (b.dataset.gor) { s.gor = b.dataset.gor; gorunum(); }
      else if (b.dataset.orn) { s.d = +b.dataset.orn; yazDirenc(); }
      else if (b.dataset.has) { s.hasta = b.dataset.has; yazOlu(); }
      else if (b.dataset.str) { s.str = b.dataset.str; yazOlu(); }
    });
    rD.addEventListener('input', () => { s.d = +rD.value; yazDirenc(); });
    rM.addEventListener('input', () => { s.mek[s.hasta] = +rM.value; yazOlu(); });
    kur();
    const durRO = genislikIzle(el, kur);
    return () => { twD.dur(); durRO(); };
  };

  /* =====================================================================
     3 · FRC ile kapanma kapasitesi
     ===================================================================== */
  VIZ.f26_frc = (el) => {
    const capY = capYazici(el);
    const FRC = [3000, 2000, 1600, 1300, 1900]; // K1 s. 50–51; 3–5 temsilî
    const ADIM = ['Ayakta', 'Sırtüstü', 'İndüksiyon', 'Pozisyon', 'PEEP'];
    const ADIM_UZUN = ['Ayakta, uyanık', 'Sırtüstü', 'Anestezi indüksiyonu', 'Ameliyat pozisyonu', 'Ekstrinsik PEEP'];
    const HAS = {
      y30: { ad: '30 yaş', cc: 1500, d: 0, ek: 'Genç sağlıklı erişkinde kapanma kapasitesi FRC\'nin çok altındadır; kapanma ancak hacim iyice düştüğünde başlar. [[K1 s. 55]]' },
      y45: { ad: '45 yaş', cc: 2000, d: 0, ek: '' },
      y65: { ad: '65 yaş', cc: 3100, d: 0, ek: 'Kapanma kapasitesi yaşla artar ve 65 yaşında ayakta bile FRC\'yi aşar: hasta daha ilk adımda tidal solunum sırasında hava yolu kapanmasıyla karşı karşıyadır. [[K1 s. 55]]' },
      obez: { ad: 'Obez', cc: 2000, d: -400, ek: 'Obezitede karın içi basıncın artması FRC\'yi her pozisyonda daha da küçültür; bu hastalar yeterli preoksijenasyona karşın indüksiyonda hipoksemiye özellikle yatkındır. [[K1 s. 108]]' },
    };
    const VT = 500, VO2 = 250; // K1 s. 50, 52
    const s = { i: 0, has: 'y45', o2: 'hava', oyn: false };
    let L = null, tmr = 0;
    const E = {};
    const frcDeg = (i) => FRC[i] + HAS[s.has].d;

    el.innerHTML = `${adimHtml(ADIM, 'Oynat')}
      <div class="f26-ctl">${segHtml('Hasta', 'has', Object.entries(HAS).map(([k, h]) => [k, h.ad]), s.has)}${segHtml('Preoksijenasyon', 'o2', [['hava', 'Hava'], ['o2', '%100 O₂']], s.o2)}</div>
      <div class="f26-frc-ust"><span class="tag f26-durum"></span><span class="f26-frc-adim"></span></div>
      <div class="f26-frc-graf"></div>
      <div class="f26-frc-o2"><dl class="f26-oku f26-oku-2"></dl><p class="f26-not"></p></div>`;
    const graf = el.querySelector('.f26-frc-graf'), durum = el.querySelector('.f26-durum'), adimAd = el.querySelector('.f26-frc-adim');
    const o2dl = el.querySelector('.f26-frc-o2 dl'), o2not = el.querySelector('.f26-not');
    const oynB = el.querySelector('[data-a="oyn"]');

    const LW = { W: 620, H: 362, x0: 76, cw: 66, cg: 24, y0: 312, y1: 34, tk: 500, ccx: 512 };
    const LN = { W: 360, H: 400, x0: 52, cw: 48, cg: 10, y0: 360, y1: 30, tk: 1000, ccx: 0 };
    const kur = () => {
      const dar = el.clientWidth < DAR;
      el.classList.toggle('f26-dar', dar);
      L = { ...(dar ? LN : LW), dar };
      L.Y = (v) => L.y0 - (v / 3600) * (L.y0 - L.y1);
      L.cx = (i) => L.x0 + i * (L.cw + L.cg);
      const xr = L.cx(4) + L.cw + 8;
      let h = `<defs><pattern id="f26-frc-kapali" patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)"><rect width="7" height="7" class="f26-pt-z"/><line x1="2" y1="0" x2="2" y2="7" class="f26-pt-c"/></pattern></defs>`;
      for (let v = 0; v <= 3500; v += L.tk) h += Ln(L.x0 - 8, L.Y(v), xr, L.Y(v), 'f26-izg') + T(L.x0 - 12, L.Y(v) + 4, 'f26-tk', v, 'end');
      h += Ln(L.x0 - 8, L.y0, xr, L.y0, 'f26-eks') + Ln(L.x0 - 8, L.y1, L.x0 - 8, L.y0, 'f26-eks');
      h += `<text class="f26-ax" text-anchor="middle" transform="translate(${dar ? 11 : 16} ${(L.y0 + L.y1) / 2}) rotate(-90)">Akciğer hacmi (mL)</text>`;
      for (let i = 0; i < 5; i++) {
        const x = L.cx(i);
        h += `<g data-c="${i}" class="f26-frc-col"><rect class="f26-frc-frc" x="${x}" width="${L.cw}" rx="3"/><rect class="f26-frc-tid" x="${x}" width="${L.cw}" height="${r1(L.Y(0) - L.Y(VT))}"/><line class="f26-frc-tidu" x1="${x}" x2="${x + L.cw}"/></g>`;
        h += `<g data-dug="${i}" class="f26-frc-dg" role="button" tabindex="-1"><rect x="${x}" y="${L.y0 + 2}" width="${L.cw}" height="${dar ? 34 : 44}" fill="transparent"/>${T(x + L.cw / 2, L.y0 + 17, 'f26-tk2', i + 1, 'middle')}${dar ? '' : T(x + L.cw / 2, L.y0 + 32, 'f26-tk', ADIM[i], 'middle')}</g>`;
      }
      h += `<rect class="f26-frc-kap" fill="url(#f26-frc-kapali)"/><text class="f26-frc-kapt f26-hale" text-anchor="middle"><tspan>hava yolu</tspan><tspan>kapanması</tspan></text>`;
      h += `<line class="f26-frc-cc" x1="${L.x0 - 8}" x2="${dar ? xr : L.W - 6}"/>`;
      h += dar ? `<text class="f26-frc-cct f26-hale" x="${L.x0 - 4}"></text>` : `<text class="f26-frc-cct" x="${L.ccx}"><tspan x="${L.ccx}">Kapanma</tspan><tspan x="${L.ccx}">kapasitesi</tspan><tspan x="${L.ccx}" class="f26-frc-ccv"></tspan></text>`;
      h += `<text class="f26-frc-val f26-hale" text-anchor="middle"></text><text class="f26-frc-fark f26-hale" text-anchor="middle"></text>`;
      graf.innerHTML = svgAc(L.W, L.H, 'f26-frc-svg', 'Beş adımda FRC sütunları, üstlerinde 500 mL tidal bant ve yatay kapanma kapasitesi çizgisi', h);
      E.col = [...graf.querySelectorAll('.f26-frc-col')].map((g) => ({ g, f: g.querySelector('.f26-frc-frc'), t: g.querySelector('.f26-frc-tid'), u: g.querySelector('.f26-frc-tidu') }));
      E.kap = graf.querySelector('.f26-frc-kap'); E.kapt = graf.querySelector('.f26-frc-kapt');
      E.cc = graf.querySelector('.f26-frc-cc'); E.cct = graf.querySelector('.f26-frc-cct'); E.ccv = graf.querySelector('.f26-frc-ccv');
      E.val = graf.querySelector('.f26-frc-val'); E.fark = graf.querySelector('.f26-frc-fark');
      tw(hedef(), true);
      guncelle(true);
    };
    const hedef = () => ({ f0: frcDeg(0), f1: frcDeg(1), f2: frcDeg(2), f3: frcDeg(3), f4: frcDeg(4), cc: HAS[s.has].cc });
    const ciz = (D) => {
      if (!L) return;
      const Y = L.Y;
      for (let i = 0; i < 5; i++) {
        const f = D['f' + i], c = E.col[i];
        at(c.f, { y: Y(f), height: Y(0) - Y(f) });
        at(c.t, { y: Y(f + VT) });
        at(c.u, { y1: Y(f + VT), y2: Y(f + VT) });
        c.g.setAttribute('class', 'f26-frc-col ' + (i === s.i ? 'f26-sec' : i < s.i ? 'f26-gec' : 'f26-gel'));
      }
      at(E.cc, { y1: Y(D.cc), y2: Y(D.cc) });
      if (L.dar) { at(E.cct, { y: Y(D.cc) - 6 }); E.cct.textContent = `Kapanma kapasitesi ${n0(D.cc)} mL`; }
      else { E.cct.querySelectorAll('tspan').forEach((t, k) => at(t, { y: Y(D.cc) + (k === 2 ? 15 : k === 0 ? -19 : -6) })); E.ccv.textContent = `${n0(D.cc)} mL`; }
      const f = D['f' + s.i], x = L.cx(s.i);
      const ust = Math.min(D.cc, f + VT);
      if (D.cc > f) {
        gor(E.kap, true);
        at(E.kap, { x: x - 5, width: L.cw + 10, y: Y(ust), height: Y(f) - Y(ust) });
        const hh = Y(f) - Y(ust);
        gor(E.kapt, hh >= 28);
        const ts = E.kapt.querySelectorAll('tspan');
        at(ts[0], { x: x + L.cw / 2, y: (Y(f) + Y(ust)) / 2 - 2 }); at(ts[1], { x: x + L.cw / 2, y: (Y(f) + Y(ust)) / 2 + 12 });
      } else { gor(E.kap, false); gor(E.kapt, false); }
      at(E.val, { x: x + L.cw / 2, y: Y(f + VT) - (s.i ? 22 : 8) });
      E.val.textContent = `${n0(f)} mL`;
      at(E.fark, { x: x + L.cw / 2, y: Y(f + VT) - 7 });
      if (s.i) {
        const fd = f - D['f' + (s.i - 1)];
        E.fark.textContent = (fd < 0 ? '−' : '+') + n0(Math.abs(fd)) + ' mL';
        E.fark.setAttribute('class', 'f26-frc-fark f26-hale ' + (fd < 0 ? 'f26-f-dus' : 'f26-f-art'));
        gor(E.fark, true);
      } else gor(E.fark, false);
    };
    const tw = tween(ciz, 350);

    const guncelle = (aninda) => {
      fazGuncelle(el, s.i);
      basSec(el, 'has', s.has); basSec(el, 'o2', s.o2);
      tw(hedef(), aninda);
      const f = frcDeg(s.i), cc = HAS[s.has].cc;
      const k = cc < f ? 'ok' : cc < f + VT ? 'warn' : 'crit';
      durum.className = 'tag f26-durum ' + k;
      durum.textContent = k === 'ok' ? 'Hava yolları açık' : k === 'warn' ? 'Ekspirasyon sonunda kapanma' : 'Solunum boyunca kapanma';
      adimAd.textContent = `${s.i + 1} · ${ADIM_UZUN[s.i]} · FRC ${f} mL · CC ${cc} mL`;
      // O₂ deposu (K1 s. 52)
      const dep = (s.o2 === 'o2' ? 0.9 : 0.135) * f;
      o2dl.innerHTML = `<div><dt>FRC'deki O₂</dt><dd>${n0(dep)} mL</dd></div><div><dt>${s.o2 === 'o2' ? "%100 O₂'den sonra, 250 mL/dk tüketimle" : '250 mL/dk tüketimle'}</dt><dd>${fmt(dep / VO2, 1)} dk</dd></div>`;
      o2not.innerHTML = REF("Kitabın örneği: sırtüstü, FRC 2000 mL; hava solurken 1 dakikadan biraz uzun, preoksijenasyondan sonra 1800 mL O₂ ile yaklaşık 8 dakika (1800 / 250 = 7,2 dk). [[K1 s. 52]]");
      // açıklama
      const varsayilan = s.has === 'y45';
      const ek = HAS[s.has].ek ? ' ' + HAS[s.has].ek : '';
      let c;
      if (s.i === 0) c = varsayilan ? null : "<b>1 · Ayakta, uyanık.</b> FRC yaklaşık 3000 mL'dir, tidal solunum (500 mL) bunun üzerinde olur. [[K1 s. 50]]";
      else if (s.i === 1) c = varsayilan ? "<b>2 · Sırtüstü.</b> Yalnızca sırtüstü yatmak FRC'yi 1000 mL azaltır: 3000 mL'den 2000 mL'ye. 45 yaşındaki hastada kapanma kapasitesi tam bu düzeydedir; ekspirasyon sonunda küçük hava yolları kapanmaya başlar. [[K1 s. 51, 55]]"
        : "<b>2 · Sırtüstü.</b> Yalnızca sırtüstü yatmak FRC'yi 1000 mL azaltır. [[K1 s. 51]]";
      else if (s.i === 2) c = "<b>3 · Anestezi indüksiyonu.</b> Göğüs duvarı kaslarının gevşemesi ve fizyolojik PEEP'in kaybı FRC'yi daha da düşürür. FRC kapanma kapasitesinin altına inince küçük hava yolları tidal solunum sırasında kapanır: V̇/Q̇ uyumsuzluğu, absorpsiyon atelektazisi ve hipoksemi için zemin hazırdır. [[K1 s. 108]]";
      else if (s.i === 3) c = "<b>4 · Ameliyat pozisyonu.</b> Litotomi ve Trendelenburg pozisyonları ile pnömoperitoneum, karın içeriğinin diyaframa basıncını artırarak FRC'yi daha da azaltır. Düşük hacim ayrıca hava yolu yarıçapını küçültüp gaz akımına direnci ve solunum işini, bir yandan da pulmoner vasküler direnci artırır. [[K1 s. 108]] [[K1 s. 99]]";
      else c = f > cc ? "<b>5 · Ekstrinsik PEEP.</b> Ekspirasyon sonu basıncı akciğer hacmini yükseltir: FRC kapanma kapasitesinin üstüne döner, atelektazi azalır ve V̇/Q̇ uyumsuzluğuna bağlı hipoksemi düzelir. Entübasyondan sonra fizyolojik düzeyde (3–5 cmH₂O) PEEP uygulamanın mantığı da budur. [[K1 s. 109]] [[K1 s. 24, 108]]"
        : "<b>5 · Ekstrinsik PEEP.</b> Ekspirasyon sonu basıncı akciğer hacmini yükseltir: atelektazi azalır ve V̇/Q̇ uyumsuzluğuna bağlı hipoksemi düzelir. Bu modelde FRC yükselse de kapanma kapasitesinin altında kalır. Entübasyondan sonra fizyolojik düzeyde (3–5 cmH₂O) PEEP uygulamanın mantığı da budur. [[K1 s. 109]] [[K1 s. 24, 108]]";
      capY(c == null ? null : c + ek);
      if (oynB) { oynB.textContent = s.oyn ? 'Duraklat' : 'Oynat'; oynB.setAttribute('aria-pressed', String(s.oyn)); }
    };
    const git = (i) => { s.i = clamp(i, 0, 4); guncelle(); };
    const durdur = () => { s.oyn = false; clearTimeout(tmr); };
    const oynat = () => {
      clearTimeout(tmr);
      if (!s.oyn) return;
      tmr = setTimeout(() => { if (s.i >= 4) { durdur(); guncelle(); return; } git(s.i + 1); if (s.i >= 4) { durdur(); guncelle(); } else oynat(); }, 2500);
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button, [data-dug]');
      if (!b || !el.contains(b)) return;
      if (b.dataset.a === 'geri') { durdur(); git(s.i - 1); }
      else if (b.dataset.a === 'ileri') { durdur(); git(s.i + 1); }
      else if (b.dataset.a === 'oyn') { if (s.oyn) durdur(); else { s.oyn = true; if (s.i >= 4) s.i = 0; oynat(); } guncelle(); }
      else if (b.dataset.i != null) { durdur(); git(+b.dataset.i); }
      else if (b.dataset.dug != null) { durdur(); git(+b.dataset.dug); }
      else if (b.dataset.has) { s.has = b.dataset.has; guncelle(); }
      else if (b.dataset.o2) { s.o2 = b.dataset.o2; guncelle(); }
    });
    kur();
    const durRO = genislikIzle(el, kur);
    return () => { clearTimeout(tmr); tw.dur(); durRO(); };
  };

  /* =====================================================================
     4 · Kapalı hava yolunun ardındaki alveol: absorpsiyon atelektazisi
     ===================================================================== */
  VIZ.f26_atelektazi = (el) => {
    const capY = capYazici(el);
    const GAZ = {
      hava: { ad: 'Oda havası', d: 0.21, n: 0.79, dAd: 'O₂', tau: 0.85, cap: "<b>Oda havası.</b> Alveol gazının çoğu N₂'dir; O₂ kana geçer, ama N₂ alveol–kapiller bariyerden çok az difüze olduğu için alveolde kalır ve onu açık tutar. [[K1 s. 108]]" },
      fi80: { ad: 'FiO₂ 0,8 + %20 N₂', d: 0.8, n: 0.2, dAd: 'O₂', tau: 0.85, cap: '<b>FiO₂ 0,8, taze gazda %20 azot.</b> O₂ emilir, ama azot alveolde kalır ve hacmin yaklaşık beşte birini açık tutar. Kitap da absorpsiyon atelektazisini önlemek için taze gaz akımına %20 azot eklemenin işe yaradığını yazar. [[K1 s. 109]]' },
      o2: { ad: '%100 O₂', d: 1, n: 0, dAd: 'O₂', tau: 0.85, cap: "<b>%100 O₂.</b> Alveolde azot kalmaz: kapalı hava yolunun ardındaki bütün gaz kana difüze olabilir ve alveol çöker. Anestezi idamesinde %100 O₂'den kaçınılmasının nedeni budur. [[K1 s. 108–109]]" },
      n2o: { ad: 'O₂ + N₂O', d: 1, n: 0, dAd: 'O₂ + N₂O', tau: 0.85, cap: '<b>O₂ ve N₂O.</b> İki gaz da alveol–kapiller bariyerden kolayca difüze olur; azot desteği yine yoktur. Kitap absorpsiyon atelektazisinin anestezi sırasındaki koşulunu tam böyle tanımlar: difüze olabilen gazlar ve kapanan küçük hava yolları bir aradadır. [[K1 s. 108]]' },
    };
    const SIRA = ['hava', 'fi80', 'o2', 'n2o'];
    const ADIM = ['Açık hava yolu', 'Hava yolu kapanıyor', 'Gazlar emiliyor', 'Sonuç'];
    const ACIK = [
      '<b>1 · Açık hava yolu.</b> Alveol ventile oluyor; kan alveolden O₂ alıyor, alveol hacmi soluktan soluğa yerine konuyor. [[K1 s. 108]]',
      '<b>2 · Hava yolu kapanıyor.</b> Anestezide FRC azalır ve kapanma kapasitesine ulaşır: küçük hava yolları kapanır, alveolün dışarıyla bağlantısı kesilir. [[K1 s. 108]]',
      '<b>3 · Gazlar emiliyor.</b> Kapiller kan alveolden gaz almayı sürdürür. O₂ ve N₂O kolayca difüze olur; N₂ alveol–kapiller bariyerden çok az geçtiği için alveolde kalır. [[K1 s. 108]]',
      '<b>4 · Sonuç.</b>',
    ];
    const TUR = 8; // s, şematik
    const kalan = (g, u) => 1 - ease(clamp(u / g.tau, 0, 1)); // difüze olan gazın kalan payı
    const hacim = (g, u) => g.n + g.d * kalan(g, u);
    const s = { g: 'hava', i: 0, u: 0, oyn: false, kenet: 0, t: 0 };
    if (RM) { s.i = 3; s.u = 1; s.kenet = 1; }
    let L = null;
    const E = {};
    let parc = [];
    // birim daire içinde sabit nokta düzeni (molekül yerleri)
    const NOKTA = [];
    for (let k = 0; k < 22; k++) { const a = k * 2.39996, rr = Math.sqrt((k + 0.5) / 22) * 0.82; NOKTA.push([Math.cos(a) * rr, Math.sin(a) * rr]); }

    el.innerHTML = `${adimHtml(ADIM, 'Oynat')}
      <div class="f26-ctl">${segHtml('Solunan gaz', 'gaz', SIRA.map((k) => [k, GAZ[k].ad]), s.g)}</div>
      <div class="f26-at-graf"></div>`;
    const graf = el.querySelector('.f26-at-graf');
    const oynB = el.querySelector('[data-a="oyn"]');

    const LW = { W: 520, H: 300, cx: 196, cy: 140, rM: 88, rm: 18, ax: 16, kx: 66, cap: [98, 296, 252, 18], gx0: 356, gx1: 506, gy0: 216, gy1: 44, xl: 236, res: 274 };
    const LN = { W: 360, H: 496, cx: 200, cy: 134, rM: 76, rm: 16, ax: 6, kx: 52, cap: [96, 300, 232, 17], gx0: 50, gx1: 344, gy0: 430, gy1: 300, xl: 452, res: 482 };
    // eşit alan: dairenin alttan h yüksekliğindeki kesitinin alan payı
    const altPay = (h, r) => { const d = r - h; return (r * r * Math.acos(clamp(d / r, -1, 1)) - d * Math.sqrt(Math.max(0, 2 * r * h - h * h))) / (Math.PI * r * r); };
    const sinirH = (f, r) => { let a = 0, b = 2 * r; for (let k = 0; k < 30; k++) { const m = (a + b) / 2; if (altPay(m, r) < f) a = m; else b = m; } return (a + b) / 2; };

    const kur = () => {
      const dar = el.clientWidth < DAR;
      el.classList.toggle('f26-dar', dar);
      L = { ...(dar ? LN : LW), dar };
      const [cx0, cx1, cy0, ch] = L.cap;
      let h = `<defs><clipPath id="f26-at-clip"><circle class="f26-at-clipc" cx="${L.cx}" cy="${L.cy}" r="${L.rM}"/></clipPath></defs>`;
      // kapiller
      h += `<rect class="f26-at-kap" x="${cx0}" y="${cy0}" width="${cx1 - cx0}" height="${ch}" rx="${ch / 2}"/>`;
      h += T(cx1, cy0 + ch + 15, 'f26-lb f26-crt', 'kapiller kan', 'end');
      h += `<g class="f26-at-akim"></g>`;
      // hava yolu
      h += `<path class="f26-at-yol"/><path class="f26-at-yolk"/>`;
      h += `<g class="f26-at-kenet"><rect class="f26-at-kn" width="14" height="10" rx="2"/><rect class="f26-at-kn" width="14" height="10" rx="2"/></g>`;
      h += `<text class="f26-at-knt f26-hale" x="${L.ax}" y="${dar ? L.cy - 40 : L.cy - L.rM - 22}">${dar ? tsp(['küçük hava yolu kapandı', 'CC > FRC'], L.ax, L.cy - 52, 15) : 'küçük hava yolu kapandı · CC > FRC'}</text>`;
      // alveol
      h += `<g class="f26-at-alv"><g clip-path="url(#f26-at-clip)"><rect class="f26-at-dif"/><rect class="f26-at-n2"/><line class="f26-at-sin"/></g><circle class="f26-at-kese"/><path class="f26-at-cok"/><g class="f26-at-mol"></g>
        <text class="f26-at-gt f26-at-gtd f26-hale" text-anchor="middle"></text><text class="f26-at-gt f26-at-gtn f26-hale" text-anchor="middle"></text></g>`;
      h += `<g class="f26-at-uc"></g>`;
      // hacim–zaman grafiği
      const GX = (u) => L.gx0 + u * (L.gx1 - L.gx0), GY = (p) => L.gy0 - (p / 100) * (L.gy0 - L.gy1);
      L.GX = GX; L.GY = GY;
      [0, 50, 100].forEach((p) => { h += Ln(L.gx0, GY(p), L.gx1, GY(p), 'f26-izg') + T(L.gx0 - 6, GY(p) + 4, 'f26-tk', p, 'end'); });
      h += Ln(L.gx0, L.gy0, L.gx1, L.gy0, 'f26-eks') + Ln(L.gx0, L.gy1, L.gx0, L.gy0, 'f26-eks');
      h += dar ? T(L.gx0 - 6, L.gy1 - 12, 'f26-ax', 'Alveol hacmi (%)', 'start', ' dx="-26"')
        : `<text class="f26-ax" text-anchor="middle" transform="translate(${L.gx0 - 30} ${(L.gy0 + L.gy1) / 2}) rotate(-90)">Alveol hacmi (%)</text>`;
      h += T((L.gx0 + L.gx1) / 2, L.xl, 'f26-ax', 'Zaman (şematik) · kapanmadan sonra', 'middle');
      SIRA.forEach((k) => {
        const g = GAZ[k];
        let p = '';
        for (let j = 0; j <= 60; j++) { const u = j / 60; p += (j ? 'L' : 'M') + r1(GX(u)) + ' ' + r1(GY(hacim(g, u) * 100)); }
        h += `<path class="f26-at-e" data-e="${k}" d="${p}"/>`;
      });
      h += `<path class="f26-at-esec"/><line class="f26-at-n2c" x1="${L.gx0}" x2="${L.gx1}"/><text class="f26-at-n2t f26-hale" text-anchor="end" x="${L.gx1}"></text><circle class="f26-at-nok" r="5"/>`;
      h += T((L.gx0 + L.gx1) / 2, L.res, 'f26-at-sonuc', '', 'middle');
      graf.innerHTML = svgAc(L.W, L.H, 'f26-at-svg', 'Küçük hava yolu, ardındaki alveol ve kapiller; sağda alveol hacminin zamanla değişimi', h);
      ['f26-at-dif', 'f26-at-n2', 'f26-at-sin', 'f26-at-kese', 'f26-at-cok', 'f26-at-mol', 'f26-at-gtd', 'f26-at-gtn', 'f26-at-yol', 'f26-at-yolk', 'f26-at-kenet', 'f26-at-knt', 'f26-at-akim', 'f26-at-uc', 'f26-at-esec', 'f26-at-n2c', 'f26-at-n2t', 'f26-at-nok', 'f26-at-sonuc', 'f26-at-clipc']
        .forEach((c) => { E[c.slice(7)] = graf.querySelector('.' + c); });
      E.kn = E.kenet.querySelectorAll('rect');
      E.eler = graf.querySelectorAll('[data-e]');
      guncelle();
    };

    const ciz = () => {
      if (!L) return;
      const g = GAZ[s.g], V = s.i === 0 ? 1 : hacim(g, s.u);
      const nefes = s.i === 0 && !RM ? 1 + 0.035 * Math.sin(s.t * 2 * Math.PI / 4) : 1;
      const cokuk = V < 0.025;
      const r = (L.rm + (L.rM - L.rm) * V) * nefes;
      const cx = L.cx, cy = L.cy;
      at(E.clipc, { r });
      at(E.kese, { cx, cy, r });
      gor(E.kese, !cokuk);
      if (cokuk) {
        let p = '';
        for (let k = 0; k <= 16; k++) { const a = (k / 16) * 2 * Math.PI, rr = L.rm * (k % 2 ? 0.55 : 1.05); p += (k ? 'L' : 'M') + r1(cx + Math.cos(a) * rr) + ' ' + r1(cy + Math.sin(a) * rr); }
        E.cok.setAttribute('d', p + 'Z'); gor(E.cok, true);
      } else gor(E.cok, false);
      // katmanlar: alt N₂, üst difüze olan gaz
      const fN = V > 0 ? g.n / V : 0;
      const hN = fN >= 0.999 ? 2 * r : fN <= 0.001 ? 0 : sinirH(fN, r);
      const yb = cy + r - hN;
      at(E.n2, { x: cx - r, y: yb, width: 2 * r, height: hN });
      at(E.dif, { x: cx - r, y: cy - r, width: 2 * r, height: Math.max(0, yb - (cy - r)) });
      at(E.sin, { x1: cx - r, x2: cx + r, y1: yb, y2: yb });
      gor(E.sin, hN > 0 && hN < 2 * r);
      // etiketler
      const pD = V > 0 ? Math.round(((g.d * kalan(g, s.i === 0 ? 0 : s.u)) / V) * 100) : 0;
      const pN = V > 0 ? 100 - pD : 0;
      const ustH = yb - (cy - r);
      gor(E.gtd, !cokuk && ustH >= 20 && pD > 0);
      at(E.gtd, { x: cx, y: (cy - r + yb) / 2 + 5 }); E.gtd.textContent = `${g.dAd} %${pD}`;
      gor(E.gtn, !cokuk && hN >= 20 && g.n > 0);
      at(E.gtn, { x: cx, y: (yb + cy + r) / 2 + 5 }); E.gtn.textContent = `N₂ %${pN}`;
      // moleküller (alveol içinde)
      let m = '';
      if (!cokuk) NOKTA.forEach(([px, py]) => { const x = cx + px * r, y = cy + py * r; m += `<circle cx="${r1(x)}" cy="${r1(y)}" r="2.6" class="${y > yb ? 'f26-at-mn' : 'f26-at-md'}"/>`; });
      E.mol.innerHTML = m;
      // hava yolu
      const yx1 = cx - r + 3, yw = L.dar ? 9 : 11;
      E.yol.setAttribute('d', `M${L.ax} ${cy - yw}L${r1(yx1)} ${cy - yw}M${L.ax} ${cy + yw}L${r1(yx1)} ${cy + yw}`);
      E.yolk.setAttribute('d', `M${L.ax} ${cy - yw}L${r1(yx1)} ${cy - yw}L${r1(yx1)} ${cy + yw}L${L.ax} ${cy + yw}Z`);
      const kk = s.kenet;
      E.yol.setAttribute('class', 'f26-at-yol' + (kk > 0.5 ? ' f26-kapali' : ''));
      at(E.kn[0], { x: L.kx - 7, y: cy - yw - 12 + kk * (yw + 1) });
      at(E.kn[1], { x: L.kx - 7, y: cy + yw + 2 - kk * (yw + 1) });
      gor(E.kenet, s.i >= 1);
      gor(E.knt, s.i >= 1 && kk > 0.6);
      // akan moleküller
      let a = '';
      parc.forEach((p) => { a += `<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="${p.tip === 'k' ? 2.4 : 2.6}" class="${p.tip === 'n' ? 'f26-at-mn' : p.tip === 'k' ? 'f26-at-mk' : 'f26-at-md'}" opacity="${r1(clamp(p.op, 0, 1))}"/>`; });
      E.uc.innerHTML = a;
      // grafik
      E.eler.forEach((e) => e.classList.toggle('on', e.dataset.e === s.g));
      const uu = s.i <= 1 ? 0 : s.u;
      let p = '';
      for (let j = 0; j <= 60; j++) { const u = (j / 60) * uu; p += (j ? 'L' : 'M') + r1(L.GX(u)) + ' ' + r1(L.GY(hacim(g, u) * 100)); }
      E.esec.setAttribute('d', p);
      at(E.nok, { cx: L.GX(uu), cy: L.GY(hacim(g, uu) * 100) });
      gor(E.n2c, g.n > 0); gor(E.n2t, g.n > 0);
      at(E.n2c, { y1: L.GY(g.n * 100), y2: L.GY(g.n * 100) });
      at(E.n2t, { y: L.GY(g.n * 100) + 15 }); E.n2t.textContent = `N₂ desteği %${Math.round(g.n * 100)}`;
      const bitti = s.i === 3 || (s.i === 2 && s.u >= 1);
      E.sonuc.textContent = bitti ? (g.n > 0 ? 'Alveol açık kalır' : 'Alveol çöker · atelektazi') : '';
      E.sonuc.setAttribute('class', 'f26-at-sonuc ' + (g.n > 0 ? 'f26-okt' : 'f26-crt'));
    };

    const guncelle = () => {
      fazGuncelle(el, s.i);
      basSec(el, 'gaz', s.g);
      if (oynB) { oynB.textContent = s.oyn ? 'Duraklat' : 'Oynat'; oynB.setAttribute('aria-pressed', String(s.oyn)); }
      const ilk = s.i === 0 && s.g === 'hava';
      capY(ilk ? null : ACIK[s.i] + ' ' + GAZ[s.g].cap);
      ciz();
    };
    const git = (i) => {
      s.i = clamp(i, 0, 3);
      s.oyn = false; parc = [];
      if (s.i <= 1) s.u = 0;
      if (s.i === 3) s.u = 1;
      if (s.i === 2) s.u = RM ? 1 : 0;
      s.kenet = s.i === 0 ? 0 : (s.i === 1 && !RM ? 0 : 1);
      if (s.i === 2 && !RM) s.oyn = true;
      guncelle();
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b || !el.contains(b)) return;
      if (b.dataset.a === 'geri') git(s.i - 1);
      else if (b.dataset.a === 'ileri') git(s.i + 1);
      else if (b.dataset.i != null) git(+b.dataset.i);
      else if (b.dataset.a === 'oyn') {
        if (s.i !== 2) git(2);
        else if (s.u >= 1) { s.u = 0; parc = []; s.oyn = true; guncelle(); }
        else { s.oyn = !s.oyn; guncelle(); }
      } else if (b.dataset.gaz) {
        s.g = b.dataset.gaz; parc = [];
        if (s.i === 2) { s.u = RM ? 1 : 0; s.oyn = !RM; }
        guncelle();
      }
    });
    kur();
    const durRO = genislikIzle(el, kur);
    const durT = RM ? () => {} : ticker(el, (dt) => {
      if (!L) return;
      s.t += dt;
      const g = GAZ[s.g];
      const [cx0, cx1, cy0, ch] = L.cap;
      // kapiller akım (sürekli)
      if (Math.random() < dt * 3) parc.push({ tip: 'k', x: cx0 + 6, y: cy0 + ch / 2, vx: 46, vy: 0, op: 1, kal: 99 });
      if (s.i === 1 && s.kenet < 1) s.kenet = Math.min(1, s.kenet + dt / 0.7);
      const r = L.rm + (L.rM - L.rm) * (s.i === 0 ? 1 : hacim(g, s.u));
      if (s.i === 0) {
        // solunan gaz hava yolundan girer, bir kısmı kana geçer
        if (Math.random() < dt * 4) parc.push({ tip: 'd', x: L.ax + 2, y: L.cy + (Math.random() - 0.5) * 10, vx: 70, vy: 0, op: 1, kal: 1.4, giris: true });
        if (Math.random() < dt * 1.5) parc.push({ tip: 'd', x: L.cx + (Math.random() - 0.5) * r, y: L.cy + r * 0.7, vx: 0, vy: 40, op: 1, kal: 1.2 });
      }
      if (s.i === 2 && s.oyn) {
        const u0 = s.u;
        s.u = Math.min(1, s.u + dt / TUR);
        const kayip = g.d * (kalan(g, u0) - kalan(g, s.u)); // bu karede emilen pay
        s.biriken = (s.biriken || 0) + kayip * 60;
        while (s.biriken >= 1) { s.biriken -= 1; parc.push({ tip: 'd', x: L.cx + (Math.random() - 0.5) * r * 1.2, y: L.cy + r * 0.6, vx: (Math.random() - 0.5) * 10, vy: 45 + Math.random() * 25, op: 1, kal: 1.3 }); }
        if (g.n > 0 && Math.random() < dt * 0.12) parc.push({ tip: 'n', x: L.cx + (Math.random() - 0.5) * r * 0.6, y: L.cy + r * 0.75, vx: 0, vy: 9, op: 1, kal: 3 });
        if (s.u >= 1) { s.oyn = false; s.i = 3; s.u = 1; guncelle(); }
      }
      parc.forEach((p) => {
        p.x += p.vx * dt; p.y += p.vy * dt; p.kal -= dt;
        if (p.giris && p.x > L.cx - r) { p.vx = 0; p.op -= dt * 3; }
        if (p.tip !== 'k' && p.y > cy0 + ch / 2) { p.vy = 0; p.vx = 40; p.tip = p.tip === 'n' ? 'n' : 'k'; }
        if (p.tip === 'k' && p.x > cx1 - 6) p.op = 0;
        if (p.kal < 0.3) p.op = Math.min(p.op, p.kal / 0.3);
      });
      parc = parc.filter((p) => p.op > 0.02 && p.kal > 0);
      ciz();
    });
    return () => { durT(); durRO(); };
  };

  /* =====================================================================
     5 · Sırtüstü akciğer: uyanıkken ve genel anestezide (V̇/Q̇)
     ===================================================================== */
  VIZ.f26_vq = (el) => {
    const capY = capYazici(el);
    const ADIM = ['Uyanık', 'İndüksiyon', 'Atelektazi', 'Zon 1', 'HPV', 'FiO₂', 'PEEP'];
    // [ventilasyon, perfüzyon] ön / orta / arka; değerler temsilî, yön kitaptan
    const D = [
      { v: [0.6, 1.0, 1.4], q: [0.5, 1.0, 1.5], k: 0, sant: 3, arka: [14, 0, 0] },
      { v: [1.2, 1.0, 0.5], q: [0.5, 1.0, 1.5], k: 1, sant: 4, arka: [7, 7, 0] },
      { v: [1.2, 1.0, 0], q: [0.5, 1.0, 1.3], k: 1, sant: 10, arka: [0, 4, 10] },
      { v: [1.3, 1.0, 0], q: [0.15, 1.0, 1.3], k: 1, sant: 10, arka: [0, 4, 10] },
      { v: [1.3, 1.0, 0], q: [0.15, 1.0, 1.5], k: 1, sant: 15, arka: [0, 4, 10] },
      { v: [1.3, 1.0, 0], q: [0.15, 1.0, 1.5], k: 1, sant: 15, arka: [0, 4, 10], fio2: true },
      { v: [1.1, 1.0, 0.8], q: [0.2, 1.0, 1.4], k: 0.45, sant: 6, arka: [9, 3, 2], fio2: true, peep: true },
    ];
    const CAP = [null,
      "<b>2 · İndüksiyon ve kas gevşetici.</b> FRC düşer ve kapanma kapasitesine ulaşır: arka (bağımlı) bölgede küçük hava yolları kapanır. Diyafram pasifleştiği ve karın içeriği arkadan bastırdığı için ventilasyon ön bölgelere kayarken perfüzyon yerçekimiyle arkada kalır: arkada düşük, önde yüksek V̇/Q̇ oranı. [[K1 s. 108–109]] (Ventilasyonun öne kayması Atlas notudur.)",
      '<b>3 · Atelektazi.</b> Diyafram tonusunun azalması ve karın içeriğinin basısı bazal atelektaziye yol açar (kompresyon); kapalı hava yollarının ardındaki alveollerde gazların emilmesi buna eklenir (absorpsiyon). Atelektatik bölge ventile olmaz ama perfüze olmayı sürdürür: gerçek şant. [[K1 s. 108–109]]',
      '<b>4 · Pozitif basınçlı ventilasyon.</b> İntratorasik basınç yükselir, sağ ventrikül ön yükü ve pulmoner kapiller dinamiği değişir. Alveol basıncının pulmoner arter basıncını aştığı bölgede West zon 1 oluşur: alveol ventile olur ama perfüze olmaz, yani alveoler ölü boşluk artar. [[K1 s. 109]] [[K1 s. 71–72]]',
      "<b>5 · Volatil ajan HPV'yi bozar.</b> Hipoksik pulmoner vazokonstriksiyon normalde kanı kötü ventile alveollerden uzaklaştırır. Volatil ajanlar bu yanıtı bozar: atelektatik bölgenin perfüzyonu sürer ve şant büyür. Bölüm 23'e göre belirgin inhibisyon 1 MAC'ın üzerinde görülür; N₂O'nun etkisi azdır, intravenöz ajanların etkisi yoktur. [[K1 s. 109]] [[K1 s. 100]]",
      '<b>6 · FiO₂ artırılır.</b> Düşük V̇/Q̇ oranlı, az da olsa ventile olan alveollerde PAO₂ yükselir ve bu bölgelerden geçen kan daha iyi oksijenlenir. Atelektatik bölgeden geçen kan ise ventile alveollerle hiç karşılaşmaz: şanta bağlı hipoksemi ek oksijene az yanıt verir. [[K1 s. 65, 70, 109]]',
      '<b>7 · Ekstrinsik PEEP.</b> Akciğer hacmi artar, atelektatik alveoller yeniden açılır ve şant küçülür; kitabın önerdiği yönetim de budur: FiO₂\'yi artırmak ve atelektaziyi azaltıp akciğer hacmini artırmak için ekstrinsik PEEP eklemek. [[K1 s. 109]]',
    ];
    const BOL = ['Ön', 'Orta', 'Arka'];
    const s = { i: 0, oyn: false };
    let L = null, tmr = 0;
    const E = {};

    el.innerHTML = `${adimHtml(ADIM, 'Oynat')}
      <div class="f26-vq-graf"></div>
      <div class="f26-vq-alt"><div class="legend f26-vq-lej"><span><i class="f26-li-o"></i>ventile alveol</span><span><i class="f26-li-w"></i>kapanan / düşük <span class="f26-gvh">V̇/Q̇</span></span><span><i class="f26-li-c"></i>atelektatik</span><span><i class="f26-li-v"></i>damar (kalınlık ∝ perfüzyon)</span></div>
      <div class="f26-rozet"><span data-roz="fio2">FiO₂ ↑</span><span data-roz="peep">PEEP</span></div></div>`;
    const graf = el.querySelector('.f26-vq-graf');
    const oynB = el.querySelector('[data-a="oyn"]');

    // geniş: akciğer solda, panel sağda; dar: akciğer üstte, panel altta
    const LW = { W: 560, H: 312, lx0: 20, lx1: 262, ly0: 44, ly1: 262, abx: 312, px: 338, pw: 120, py: 40, prow: 70, sy: 270, ncol: 7, ax0: 92, adx: 30 };
    const LN = { W: 360, H: 590, lx0: 8, lx1: 288, ly0: 40, ly1: 262, abx: 352, px: 74, pw: 170, py: 318, prow: 70, sy: 548, ncol: 7, ax0: 80, adx: 32 };
    const lungPath = (k) => {
      // ön (üst) kenar düz, baş (sol) yuvarlak, sağda diyafram kubbesi; k: diyaframın kraniyale itilmesi (arka bölümü daha çok)
      const xa = L.lx1 + 10 - k * 8, xp = L.lx1 + 36 - k * 56;
      const xc = L.lx1 - 48 - k * 22;
      const ym = (L.ly0 + L.ly1) / 2;
      return `M${L.lx0 + 40} ${L.ly0} L${r1(xa)} ${L.ly0} Q${r1(xc)} ${r1(ym)} ${r1(xp)} ${L.ly1} L${L.lx0 + 40} ${L.ly1} C${L.lx0 - 6} ${L.ly1} ${L.lx0 - 6} ${L.ly0} ${L.lx0 + 40} ${L.ly0} Z`;
    };
    const abdPath = (k) => {
      const xa = L.lx1 + 10 - k * 8, xp = L.lx1 + 36 - k * 56, xc = L.lx1 - 48 - k * 22, ym = (L.ly0 + L.ly1) / 2;
      return `M${r1(xa)} ${L.ly0} Q${r1(xc)} ${r1(ym)} ${r1(xp)} ${L.ly1} L${L.abx} ${L.ly1} L${L.abx} ${L.ly0} Z`;
    };
    const kur = () => {
      const dar = el.clientWidth < DAR;
      el.classList.toggle('f26-dar', dar);
      L = { ...(dar ? LN : LW), dar };
      const bh = (L.ly1 - L.ly0) / 3;
      L.bh = bh;
      let h = `<defs><clipPath id="f26-vq-clip"><path class="f26-vq-clipp"/></clipPath></defs>`;
      h += `<path class="f26-vq-abd"/>`;
      h += T(L.abx - 4, (L.ly0 + L.ly1) / 2 + 4, 'f26-lb f26-wrn', 'karın', 'end');
      h += `<g clip-path="url(#f26-vq-clip)">`;
      for (let b = 0; b < 3; b++) {
        const y = L.ly0 + b * bh;
        h += `<rect class="f26-vq-bant" data-bb="${b}" x="${L.lx0 - 10}" y="${r1(y)}" width="${L.abx - L.lx0 + 10}" height="${r1(bh)}"/>`;
        h += `<line class="f26-vq-dam" data-dm="${b}" x1="${L.lx0 + 8}" x2="${L.lx1 + 30}" y1="${r1(y + bh - 11)}" y2="${r1(y + bh - 11)}"/>`;
        for (let rI = 0; rI < 2; rI++) for (let c = 0; c < L.ncol; c++) {
          h += `<circle class="f26-vq-a" data-a="${b}-${rI * L.ncol + c}" cx="${L.ax0 + c * L.adx + (rI ? L.adx / 2 : 0)}" cy="${r1(y + 15 + rI * 23)}" r="5"/>`;
        }
      }
      h += `</g><path class="f26-vq-ana"/><path class="f26-vq-diy"/>`;
      for (let b = 0; b < 3; b++) h += T(L.lx0 + 16, L.ly0 + b * bh + bh / 2 + 2, 'f26-vq-bad f26-hale', BOL[b]);
      h += T(L.lx0 + 40, L.ly0 - 22, 'f26-tk', dar ? 'ön (bağımlı olmayan) ↑' : 'ön (bağımlı olmayan) · yerçekimine göre üstte', 'start');
      h += T(L.lx0 + 40, L.ly1 + 17, 'f26-tk', dar ? 'arka (bağımlı) ↓' : 'arka (bağımlı) · masaya yakın', 'start');
      h += T(L.lx0 + 40, L.ly0 - 8, 'f26-tk', '← baş', 'start') + T(L.abx - 6, L.ly0 - 8, 'f26-tk', 'diyafram, karın →', 'end');
      h += `<text class="f26-vq-z1 f26-wrn f26-hale" text-anchor="end">zon 1 · ölü boşluk</text><text class="f26-vq-hpv f26-crt f26-hale" text-anchor="end">HPV bozuldu</text>`;
      // panel
      const px = L.px, pw = L.pw;
      const vx = (v) => (v / 1.6) * pw;
      L.vx = vx;
      h += `<text class="f26-tk" x="${dar ? L.lx0 : px}" y="${L.py - 14}"><tspan class="f26-bsc">■</tspan> ventilasyon  <tspan class="f26-crt">■</tspan> perfüzyon</text>`;
      for (let b = 0; b < 3; b++) {
        const y = L.py + b * L.prow;
        if (dar) h += T(L.lx0, y + 14, 'f26-vq-pad', BOL[b]);
        else h += T(px, y, 'f26-vq-pad', BOL[b]);
        const by = dar ? y + 2 : y + 8;
        h += `<rect class="f26-vq-bz" x="${px}" y="${by}" width="${pw}" height="10" rx="2"/><rect class="f26-vq-bv" data-bv="${b}" x="${px}" y="${by}" height="10" rx="2"/>`;
        h += `<rect class="f26-vq-bz" x="${px}" y="${by + 14}" width="${pw}" height="10" rx="2"/><rect class="f26-vq-bq" data-bq="${b}" x="${px}" y="${by + 14}" height="10" rx="2"/>`;
        h += T(px + pw + 8, by + 20, 'f26-vq-oran', '', 'start', ` data-or="${b}"`);
        h += T(dar ? px : px, by + 42, 'f26-vq-dur', '', 'start', ` data-du="${b}"`);
      }
      // şant ölçeği
      const sx0 = dar ? L.lx0 + 4 : px, sx1 = dar ? L.W - 16 : L.W - 12;
      const SX = (p) => sx0 + (p / 20) * (sx1 - sx0);
      L.SX = SX;
      h += Rc(SX(2), L.sy, SX(5) - SX(2), 12, 'f26-vq-norm');
      h += Ln(sx0, L.sy + 12, sx1, L.sy + 12, 'f26-eks');
      [0, 5, 10, 15, 20].forEach((p) => { h += Ln(SX(p), L.sy + 12, SX(p), L.sy + 16, 'f26-eks') + T(SX(p), L.sy + 28, 'f26-tk', '%' + p, 'middle'); });
      h += T(SX(3.5), L.sy - 4, 'f26-vq-normt', 'normal %2–5', 'middle');
      h += `<path class="f26-vq-im"/>`;
      h += T(sx0, L.sy - 22, 'f26-vq-st', '', 'start');
      graf.innerHTML = svgAc(L.W, L.H, 'f26-vq-svg', 'Sırtüstü hastanın yandan akciğer kesiti: ön, orta ve arka bölgelerde alveoller ve damarlar; sağda ventilasyon, perfüzyon ve şant payı', h);
      E.clipp = graf.querySelector('.f26-vq-clipp'); E.ana = graf.querySelector('.f26-vq-ana'); E.diy = graf.querySelector('.f26-vq-diy'); E.abd = graf.querySelector('.f26-vq-abd');
      E.bant = [...graf.querySelectorAll('[data-bb]')]; E.dam = [...graf.querySelectorAll('[data-dm]')];
      E.alv = [0, 1, 2].map((b) => [...graf.querySelectorAll(`[data-a^="${b}-"]`)]);
      E.bv = [...graf.querySelectorAll('[data-bv]')]; E.bq = [...graf.querySelectorAll('[data-bq]')];
      E.or = [...graf.querySelectorAll('[data-or]')]; E.du = [...graf.querySelectorAll('[data-du]')];
      E.im = graf.querySelector('.f26-vq-im'); E.st = graf.querySelector('.f26-vq-st');
      E.z1 = graf.querySelector('.f26-vq-z1'); E.hpv = graf.querySelector('.f26-vq-hpv');
      tw(hedef(), true);
      guncelle(true);
    };
    const hedef = () => { const d = D[s.i]; return { v0: d.v[0], v1: d.v[1], v2: d.v[2], q0: d.q[0], q1: d.q[1], q2: d.q[2], k: d.k, sant: d.sant }; };
    const ciz = (X) => {
      if (!L) return;
      E.clipp.setAttribute('d', lungPath(X.k)); E.ana.setAttribute('d', lungPath(X.k)); E.abd.setAttribute('d', abdPath(X.k));
      const xa = L.lx1 + 10 - X.k * 8, xp = L.lx1 + 36 - X.k * 56, xc = L.lx1 - 48 - X.k * 22, ym = (L.ly0 + L.ly1) / 2;
      E.diy.setAttribute('d', `M${r1(xa)} ${L.ly0} Q${r1(xc)} ${r1(ym)} ${r1(xp)} ${L.ly1}`);
      for (let b = 0; b < 3; b++) {
        const v = X['v' + b], q = X['q' + b];
        at(E.bv[b], { width: L.vx(v) });
        at(E.bq[b], { width: L.vx(q) });
        at(E.dam[b], { 'stroke-width': 1 + 5 * q });
        E.alv[b].forEach((c) => at(c, { r: c.classList.contains('f26-vq-c') ? 3.4 : 3.4 + 2.4 * Math.min(1.4, Math.max(v, 0.3)) }));
      }
      // şant işaretçisi
      const x = L.SX(clamp(X.sant, 0, 20));
      E.im.setAttribute('d', `M${r1(x)} ${L.sy + 12} l-6 -11 h12 z`);
      E.st.textContent = `Şant payı ≈ %${Math.round(X.sant)}`;
    };
    const tw = tween(ciz, 350);
    const durum = (v, q, fio2) => {
      if (v <= 0.01) return ['şant' + (fio2 ? ' · O₂ yanıtı az' : ''), 'c'];
      if (q < 0.3) return ['alveoler ölü boşluk', 'w'];
      const r = v / q;
      if (r >= 1.6) return ['yüksek V̇/Q̇', 'w'];
      if (r < 0.7) return ['düşük V̇/Q̇', 'w'];
      return [fio2 ? 'uyumlu · PAO₂ ↑' : 'uyumlu', 'o'];
    };
    const guncelle = (aninda) => {
      const d = D[s.i];
      fazGuncelle(el, s.i);
      tw(hedef(), aninda);
      // alveol durumları
      for (let b = 0; b < 3; b++) {
        const n = E.alv[b].length;
        let sayi = [n, 0, 0];
        if (b === 2) { const t = d.arka[0] + d.arka[1] + d.arka[2]; sayi = d.arka.map((x) => Math.round((x / t) * n)); sayi[0] = n - sayi[1] - sayi[2]; }
        if (b === 1 && s.i >= 1 && s.i < 6) sayi = [n - 2, 2, 0];
        // kapanan/atelektatik alveoller arkada, diyaframa yakın (sağda) toplanır
        E.alv[b].forEach((c, j) => {
          const sira = (j % L.ncol) * 2 + (j >= L.ncol ? 1 : 0); // soldan sağa
          const yer = (L.ncol * 2 - 1) - sira; // sağdan sola sıra
          const tip = yer < sayi[2] ? 'c' : yer < sayi[2] + sayi[1] ? 'w' : 'o';
          const o2 = d.fio2 && tip === 'w';
          c.setAttribute('class', `f26-vq-a f26-vq-${o2 ? 'x' : tip}`);
        });
        const du = durum(d.v[b], d.q[b], d.fio2);
        E.or[b].innerHTML = gvFix(d.v[b] <= 0.01 ? 'V̇/Q̇ 0' : d.q[b] < 0.3 ? 'V̇/Q̇ ≫ 1' : `V̇/Q̇ ${fmt(d.v[b] / d.q[b], 1)}`);
        E.du[b].innerHTML = gvFix(du[0]);
        E.du[b].setAttribute('class', 'f26-vq-dur f26-vq-d' + du[1]);
        E.bant[b].setAttribute('class', 'f26-vq-bant' + (b === 2 && d.v[2] <= 0.01 ? ' f26-vq-atel' : '') + (b === 0 && d.q[0] < 0.3 ? ' f26-vq-zon' : ''));
        E.dam[b].setAttribute('class', 'f26-vq-dam' + (b === 0 && d.q[0] < 0.3 ? ' f26-vq-damz' : ''));
      }
      const bh = L.bh;
      at(E.z1, { x: L.lx1 - 30, y: L.ly0 + bh - 16 }); gor(E.z1, d.q[0] < 0.3);
      at(E.hpv, { x: L.lx1 - 50, y: L.ly0 + 3 * bh - 16 }); gor(E.hpv, s.i === 4 || s.i === 5);
      el.querySelectorAll('[data-roz]').forEach((r) => r.classList.toggle('on', !!d[r.dataset.roz]));
      capY(CAP[s.i]);
      if (oynB) { oynB.textContent = s.oyn ? 'Duraklat' : 'Oynat'; oynB.setAttribute('aria-pressed', String(s.oyn)); }
    };
    const git = (i) => { s.i = clamp(i, 0, 6); guncelle(); };
    const durdur = () => { s.oyn = false; clearTimeout(tmr); };
    const oynat = () => {
      clearTimeout(tmr);
      if (!s.oyn) return;
      tmr = setTimeout(() => { git(s.i + 1); if (s.i >= 6) { durdur(); guncelle(); } else oynat(); }, 3000);
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b || !el.contains(b)) return;
      if (b.dataset.a === 'geri') { durdur(); git(s.i - 1); }
      else if (b.dataset.a === 'ileri') { durdur(); git(s.i + 1); }
      else if (b.dataset.a === 'oyn') { if (s.oyn) durdur(); else { s.oyn = true; if (s.i >= 6) s.i = 0; oynat(); } guncelle(); }
      else if (b.dataset.i != null) { durdur(); git(+b.dataset.i); }
    });
    kur();
    const durRO = genislikIzle(el, kur);
    return () => { clearTimeout(tmr); tw.dur(); durRO(); };
  };

  /* =====================================================================
     6 · PPC zinciri: etkenler, mekanizmalar, önlemler
     ===================================================================== */
  VIZ.f26_ppc = (el) => {
    const capY = capYazici(el);
    const N = {
      e1: ['e', 'Üst abdominal / torasik cerrahi', 'Üst abdominal, torasik cerrahi', "<b>Üst abdominal ve torasik cerrahi.</b> Postoperatif pulmoner komplikasyonlar için en yüksek riskli girişimlerdir: FRC azalması, bazal atelektazi ve V̇/Q̇ uyumsuzluğu kaçınılmazdır ve çoğu zaman günlerce sürer. V̇/Q̇ uyumsuzluğu hipoksemiye yol açar, atelektazi ve düşük akciğer hacmi solunum işini artırır. [[K1 s. 109]]"],
      e2: ['e', 'Yetersiz analjezi', 'Yetersiz analjezi', '<b>Yetersiz analjezi.</b> Laparotomi, sternotomi ve torakotomiden sonra ağrı öksürüğü yetersiz, inspirasyonu sınırlı bırakır: atelektazi ağırlaşır, sekresyon retansiyonu ve pnömoni riski artar. [[K1 s. 109]]'],
      e3: ['e', 'Genel anestezi ve ilaçları', 'Genel anestezi, ilaçlar', "<b>Genel anestezi ve ilaçları.</b> Göğüs duvarı kaslarının gevşemesi FRC'yi düşürür, volatil ajanlar hipoksik pulmoner vazokonstriksiyonu bozar, anestezik ajanlar ve opioidler solunum merkezini baskılar; etkiler erken postoperatif döneme uzanır. [[K1 s. 107–109]]"],
      e4: ['e', 'Hava yolu aracı ve yüksek FiO₂', 'Hava yolu aracı, yüksek FiO₂', "<b>Hava yolu aracı ve yüksek FiO₂.</b> Fizyolojik PEEP'in kaybı ve dar tüp solunum işini artırır, mekanik ölü boşluk dakika ventilasyonu gereksinimini büyütür, %100 O₂ absorpsiyon atelektazisine yol açar. [[K1 s. 108–109]]"],
      e5: ['e', 'Postoperatif titreme', 'Postop titreme', '<b>Postoperatif titreme.</b> Metabolik gereksinimi, solunum merkezinin hiperkapni ve hipoksemiye yanıtının rezidüel anestezik ve opioid etkisiyle körelmiş olduğu bir anda artırır; tip 1 ya da tip 2 solunum yetmezliği gelişebilir. [[K1 s. 109]]'],
      e6: ['e', 'Rezidüel nöromüsküler blok · elektrolit bozukluğu', 'Rezidüel blok, elektrolit', '<b>Rezidüel blok ve elektrolit bozukluğu.</b> Yeterince geri döndürülmemiş nöromüsküler blok erken postoperatif dönemde solunum kası güçsüzlüğü yapar; sıvı kaymasından ve artmış mineralokortikoit etkinliğinden doğan hipokalemi ya da hipokalsemi güçsüzlüğü ağırlaştırır. [[K1 s. 109]]'],
      m1: ['m', 'FRC azalır, küçük hava yolları kapanır', 'FRC ↓, hava yolu kapanması', "<b>FRC azalır, küçük hava yolları kapanır.</b> Sırtüstü pozisyon, göğüs duvarı kaslarının gevşemesi ve karın basısı FRC'yi kapanma kapasitesinin altına indirir; düşük hacim hava yolu direncini ve solunum işini de artırır. [[K1 s. 108–109]]"],
      m2: ['m', 'Atelektazi (kompresyon + absorpsiyon)', 'Atelektazi', '<b>Atelektazi.</b> Diyafram tonusunun azalması ve karın içeriğinin basısı (kompresyon) ile kapalı hava yollarının ardında gazların emilmesi (absorpsiyon) bazal atelektazi yapar. [[K1 s. 108–109]]'],
      m3: ['m', 'V̇/Q̇ uyumsuzluğu ve şant', 'V̇/Q̇ uyumsuzluğu, şant', '<b>V̇/Q̇ uyumsuzluğu ve şant.</b> Düşük akciğer hacmi, atelektazi, pozitif basınçlı ventilasyon ve HPV\'nin bozulması birleşir; sonuç hipoksemidir. [[K1 s. 109]]'],
      m4: ['m', 'Solunum işi artar', 'Solunum işi ↑', '<b>Solunum işi artar.</b> Atelektazi, düşük akciğer hacmi ve dar hava yolu aracı solunum işini artırır. [[K1 s. 108–109]]'],
      m5: ['m', 'Zayıf öksürük, sekresyon retansiyonu', 'Zayıf öksürük, sekresyon', '<b>Zayıf öksürük, sekresyon retansiyonu.</b> Ağrı öksürüğü yetersiz, inspirasyonu sınırlı bırakır; sekresyonlar birikir, pnömoni kolaylaşır. [[K1 s. 109]]'],
      m6: ['m', 'Solunum merkezi depresyonu ve kas güçsüzlüğü', 'Merkez depresyonu, kas güçsüzlüğü', '<b>Solunum merkezi depresyonu ve kas güçsüzlüğü.</b> Rezidüel anestezik ve opioid etkisi merkezin hiperkapni ve hipoksemiye yanıtını köreltir; rezidüel blok ve elektrolit bozukluğu solunum kaslarını güçsüz bırakır. [[K1 s. 109]]'],
      k1: ['k', 'Atelektazi', 'Atelektazi', '<b>Atelektazi.</b> Ameliyatı izleyen haftada sık görülen postoperatif pulmoner komplikasyonlardan biridir. Ona giden yollar vurgulandı. [[K1 s. 109]]'],
      k2: ['k', 'Bronkospazm', 'Bronkospazm', '<b>Bronkospazm.</b> Hava yolu araçlarıyla uyarı ve bazı ilaçlar (morfin, atrakuryum: histamin salınımı) tetikler; reaktif hava yolu olan hastada sıktır. [[K1 s. 107–109]]'],
      k3: ['k', 'Pnömoni', 'Pnömoni', '<b>Pnömoni.</b> Atelektazi ile yetersiz öksürük ve sekresyon retansiyonu zemin hazırlar. [[K1 s. 109]]'],
      k4: ['k', 'Pulmoner ödem', 'Pulmoner ödem', '<b>Pulmoner ödem.</b> Kitap pulmoner ödemi postoperatif pulmoner komplikasyonlar arasında sayar, mekanizmasını bu bölümde açmaz. [[K1 s. 109]]'],
      k5: ['k', 'Ventilatuvar yetmezlik', 'Ventilatuvar yetmezlik', '<b>Ventilatuvar yetmezlik.</b> V̇/Q̇ uyumsuzluğu, artmış solunum işi, baskılanmış solunum merkezi ve güçsüz kaslar birleşince tip 1 ya da tip 2 solunum yetmezliği gelişebilir. [[K1 s. 109]]'],
    };
    const KOL = { e: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'], m: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'], k: ['k1', 'k2', 'k3', 'k5', 'k4'] };
    const BAG = 'e1>m1 e1>m2 e1>m4 e2>m5 e2>m1 e3>m1 e3>m2 e3>m3 e3>m6 e4>m2 e4>m3 e4>m4 e5>m6 e6>m6 e6>m5 m1>m2 m1>m3 m1>m4 m2>m3 m2>k1 m2>k3 m3>k5 m4>k5 m5>k3 m6>k5 e3>k2 e4>k2'.split(' ');
    const ONLEM = [
      { ad: 'Preoperatif değerlendirme ve risk sınıflaması', kes: [], zay: ['e1>m1', 'e1>m2', 'e1>m4'], cap: '<b>Preoperatif değerlendirme.</b> Hastalar cerrahi türüne ve altta yatan akciğer hastalığına göre risk sınıflarına ayrılır: zincir kesilmez, ama yüksek riskli hasta önceden bilinir ve plan buna göre yapılır. [[K1 s. 109]]' },
      { ad: 'Rejyonal anestezi', kes: ['e3>m1', 'e3>m2', 'e3>m3', 'e3>m6'], zay: [], cap: '<b>Rejyonal anestezi.</b> Cerrahinin türüne bağlı olarak genel anestezinin akciğerler üzerindeki olumsuz etkilerinin çoğundan kaçınmayı sağlar. [[K1 s. 109]]' },
      { ad: 'Laparoskopik cerrahi', kes: ['e1>m1', 'e1>m4'], zay: [], cap: '<b>Laparoskopik cerrahi.</b> Postoperatif pulmoner komplikasyonların sıklığını azaltır. [[K1 s. 109]]' },
      { ad: 'Düşük V<sub>T</sub> (< 8 mL/kg)', kes: [], zay: ['e4>m4', 'm4>k5'], cap: "<b>Düşük tidal hacimle ventilasyon.</b> Hastalar 8 mL/kg'ın altında tidal hacimle ventile edildiğinde postoperatif pulmoner komplikasyonlarda belirgin azalma olur. İntraoperatif PEEP'in en etkili düzeyi ve akciğer açma manevralarının rolü henüz belirlenmemiştir. [[K1 s. 109]]" },
      { ad: "%100 O₂'den kaçınma (taze gaza %20 N₂)", kes: ['e4>m2'], zay: [], cap: "<b>%100 O₂'den kaçınmak.</b> Absorpsiyon atelektazisini önler; taze gaz akımına %20 azot eklemek bile alveolleri açık tutmaya yardım eder. [[K1 s. 109]]" },
      { ad: 'Normotermi', kes: ['e5>m6'], zay: [], cap: '<b>Normotermi.</b> İntraoperatif sıcaklık yönetimi postoperatif titreme riskini en aza indirir. [[K1 s. 109]]' },
      { ad: 'Nöromüsküler monitörizasyon ve geri döndürme', kes: ['e6>m6', 'e6>m5'], zay: [], cap: '<b>Nöromüsküler monitörizasyon ve geri döndürme.</b> Uzun etkili ajanlar (ör. pankuronyum) kısa ve orta etkililere göre daha sık postoperatif solunum yetmezliğine yol açar; blok izlenmeli ve yeterince geri döndürülmelidir. [[K1 s. 109–110]]' },
      { ad: 'Yeterli analjezi (torasik epidural, paravertebral)', kes: ['e2>m5', 'e2>m1'], zay: [], cap: '<b>Yeterli analjezi.</b> Özellikle üst abdominal ve torasik cerrahide önemlidir; çoğu zaman torasik epidural ya da paravertebral kateterden sürekli lokal anestezik infüzyonu gibi rejyonal bir teknik kullanılır. [[K1 s. 110]]' },
    ];
    const s = { sec: null, onlem: false, oi: null };
    let L = null;
    const P = {}; // düğüm konumları
    const EG = []; // bağlantılar

    el.innerHTML = `<div class="f26-ctl">${segHtml('Önlemler', 'onl', [['0', 'Kapalı'], ['1', 'Açık']], '0')}<button type="button" class="btn ghost f26-ppc-sil" hidden>Vurguyu kaldır</button></div>
      <div class="f26-ppc-graf"></div>
      <p class="f26-not f26-ppc-k4" hidden>Kitap pulmoner ödemi komplikasyonlar arasında sayar, mekanizmasını bu bölümde açmaz.</p>
      <div class="f26-ppc-onl" hidden><p class="f26-not">× keser · / zayıflatır. Bir önleme basın: kestiği halkalar vurgulanır.</p><ol>${ONLEM.map((o, i) => `<li><button type="button" data-oi="${i}" aria-pressed="false"><b>${i + 1}</b><span>${o.ad}</span></button></li>`).join('')}</ol></div>`;
    const graf = el.querySelector('.f26-ppc-graf'), onlK = el.querySelector('.f26-ppc-onl'), silB = el.querySelector('.f26-ppc-sil'), k4not = el.querySelector('.f26-ppc-k4');

    const bez = (a, b, t) => { const u = 1 - t; return [u * u * u * a[0] + 3 * u * u * t * a[2] + 3 * u * t * t * a[4] + t * t * t * a[6], u * u * u * a[1] + 3 * u * u * t * a[3] + 3 * u * t * t * a[5] + t * t * t * a[7]]; };
    const kur = () => {
      const dar = el.clientWidth < DAR;
      el.classList.toggle('f26-dar', dar);
      L = dar ? { W: 360, H: 0, col: { e: [2, 106], m: [127, 106], k: [252, 106] }, fs: 12, lh: 14, top: 34, hdr: 16, gapMin: 10 }
        : { W: 580, H: 470, col: { e: [6, 146], m: [210, 160], k: [428, 146] }, fs: 11.5, lh: 13.5, top: 40, hdr: 20, gapMin: 12 };
      // düğüm boyları
      const lines = {};
      Object.keys(N).forEach((id) => { const [c, uzun, kisa] = N[id]; const w = L.col[c][1]; lines[id] = sar(dar ? kisa : uzun, harf(w - 12, L.fs)); });
      const yuk = (id) => lines[id].length * L.lh + 12;
      let H = 0;
      const notH = dar ? 0 : 4 * 13 + 8;
      Object.entries(KOL).forEach(([c, ids]) => {
        const top = L.top;
        const toplam = ids.reduce((a, id) => a + yuk(id), 0);
        const alan = dar ? toplam + (ids.length - 1) * 16 : L.H - top - 10 - (c === 'k' ? notH : 0);
        const ara = Math.max(L.gapMin, (alan - toplam) / (ids.length - 1));
        let y = top;
        ids.forEach((id) => { P[id] = { x: L.col[c][0], y, w: L.col[c][1], h: yuk(id), c }; y += yuk(id) + ara; });
        H = Math.max(H, y - ara + (c === 'k' ? notH : 0) + 10);
      });
      if (dar) { L.H = H + 8; } else L.H = Math.max(L.H, H);
      // ortak düzeyleme: dar yerleşimde sütunlar aynı yüksekliğe yayılsın
      if (dar) {
        Object.entries(KOL).forEach(([c, ids]) => {
          const toplam = ids.reduce((a, id) => a + P[id].h, 0);
          const ara = (L.H - 8 - L.top - toplam) / (ids.length - 1);
          let y = L.top;
          ids.forEach((id) => { P[id].y = y; y += P[id].h + ara; });
        });
      }
      const sag = (id) => [P[id].x + P[id].w, P[id].y + P[id].h / 2];
      const sol = (id) => [P[id].x, P[id].y + P[id].h / 2];
      let h = `<defs>${['', '-e', '-m', '-k'].map((k) => `<marker id="f26-ppc-ok${k}" viewBox="0 0 10 10" refX="8.6" refY="5" markerWidth="${dar ? 6 : 7}" markerHeight="${dar ? 6 : 7}" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 1 L9 5 L0 9 z" class="f26-ppc-mk${k}"/></marker>`).join('')}</defs>`;
      h += T(L.col.e[0], L.hdr, 'f26-ppc-h f26-wrn', 'Etkenler') + T(L.col.m[0], L.hdr, 'f26-ppc-h f26-bsc', 'Mekanizmalar') + T(L.col.k[0], L.hdr, 'f26-ppc-h f26-crt', dar ? 'Komplikas.' : 'Komplikasyonlar');
      EG.length = 0;
      BAG.forEach((key) => {
        const [a, b] = key.split('>');
        let d;
        if (P[a].c === P[b].c) { // aynı sütun: sağdan kavis
          const [x1, y1] = sag(a), [x2, y2] = sag(b), bk = (dar ? 9 : 16) + Math.abs(y2 - y1) * 0.06;
          d = [x1, y1, x1 + bk, y1, x2 + bk, y2, x2 + 1, y2];
        } else {
          const [x1, y1] = sag(a), [x2, y2] = sol(b), dx = (x2 - x1) / 2;
          d = [x1, y1, x1 + dx, y1, x2 - dx, y2, x2 - 1, y2];
        }
        EG.push({ key, a, b, d });
        h += `<path class="f26-ppc-b" data-g="${key}" d="M${r1(d[0])} ${r1(d[1])} C${r1(d[2])} ${r1(d[3])} ${r1(d[4])} ${r1(d[5])} ${r1(d[6])} ${r1(d[7])}" marker-end="url(#f26-ppc-ok)"/>`;
      });
      Object.keys(N).forEach((id) => {
        const p = P[id], ln = lines[id];
        const y0 = p.y + (p.h - ln.length * L.lh) / 2 + L.fs * 0.85;
        h += `<g class="f26-ppc-n f26-ppc-${p.c}" data-n="${id}" tabindex="0" role="button" aria-pressed="false" aria-label="${N[id][1]}"><rect x="${r1(p.x)}" y="${r1(p.y)}" width="${p.w}" height="${r1(p.h)}" rx="7"/><text text-anchor="middle">${tsp(ln, p.x + p.w / 2, y0, L.lh)}</text></g>`;
      });
      if (!dar) {
        const p = P.k4;
        h += `<text class="f26-ppc-not">${tsp(sar('Kitap pulmoner ödemi komplikasyonlar arasında sayar, mekanizmasını bu bölümde açmaz', harf(p.w, 10.5)), p.x, p.y + p.h + 15, 13)}</text>`;
      }
      // önlem işaretleri
      const say = {};
      ONLEM.forEach((o, i) => [...o.kes, ...o.zay].forEach((k) => { (say[k] = say[k] || []).push(i); }));
      h += `<g class="f26-ppc-isa">`;
      EG.forEach((g) => {
        const lst = say[g.key];
        if (!lst) return;
        lst.forEach((i, j) => {
          const t = lst.length === 1 ? 0.5 : 0.36 + (0.28 * j) / (lst.length - 1);
          const [x, y] = bez(g.d, null, t);
          const kes = ONLEM[i].kes.includes(g.key);
          const z = dar ? 4 : 4.5;
          h += `<g class="f26-ppc-is" data-is="${i}">${kes ? `<path class="f26-ppc-x" d="M${r1(x - z)} ${r1(y - z)}L${r1(x + z)} ${r1(y + z)}M${r1(x + z)} ${r1(y - z)}L${r1(x - z)} ${r1(y + z)}"/>` : `<path class="f26-ppc-x" d="M${r1(x - z)} ${r1(y + z)}L${r1(x + z)} ${r1(y - z)}"/>`}<text class="f26-ppc-no f26-hale" x="${r1(x)}" y="${r1(y - z - 3)}" text-anchor="middle">${i + 1}</text></g>`;
        });
      });
      h += `</g>`;
      graf.innerHTML = svgAc(L.W, L.H, 'f26-ppc-svg', 'Postoperatif pulmoner komplikasyon zinciri: solda etkenler, ortada mekanizmalar, sağda komplikasyonlar; oklar nedensellik bağlantıları', h);
      graf.querySelectorAll('.f26-ppc-n').forEach((g) => {
        g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); secNode(g.dataset.n); } });
      });
      k4not.hidden = !dar;
      guncelle();
    };
    const ileri = (id) => { const set = new Set([id]), q = [id]; while (q.length) { const a = q.shift(); BAG.forEach((k) => { const [x, y] = k.split('>'); if (x === a && !set.has(y)) { set.add(y); q.push(y); } }); } return set; };
    const geri = (id) => { const set = new Set([id]), q = [id]; while (q.length) { const a = q.shift(); BAG.forEach((k) => { const [x, y] = k.split('>'); if (y === a && !set.has(x)) { set.add(x); q.push(x); } }); } return set; };
    const guncelle = () => {
      basSec(el, 'onl', s.onlem ? '1' : '0');
      onlK.hidden = !s.onlem;
      graf.classList.toggle('f26-ppc-acik', s.onlem);
      let dug = null, bag = null;
      if (s.sec) {
        dug = N[s.sec][0] === 'k' ? geri(s.sec) : ileri(s.sec);
        bag = new Set(BAG.filter((k) => { const [a, b] = k.split('>'); return dug.has(a) && dug.has(b); }));
      } else if (s.onlem && s.oi != null) {
        const o = ONLEM[s.oi];
        bag = new Set([...o.kes, ...o.zay]);
        dug = new Set(); bag.forEach((k) => k.split('>').forEach((x) => dug.add(x)));
      }
      const kesik = new Set(); const zayif = new Set();
      if (s.onlem) ONLEM.forEach((o, i) => { if (s.oi == null || s.oi === i) { o.kes.forEach((k) => kesik.add(k)); o.zay.forEach((k) => zayif.add(k)); } });
      graf.querySelectorAll('.f26-ppc-n').forEach((g) => {
        const id = g.dataset.n;
        g.classList.toggle('on', !!dug && dug.has(id));
        g.classList.toggle('dim', !!dug && !dug.has(id));
        g.setAttribute('aria-pressed', String(s.sec === id));
      });
      graf.querySelectorAll('.f26-ppc-b').forEach((p) => {
        const k = p.dataset.g, src = N[k.split('>')[0]][0];
        const on = !!bag && bag.has(k);
        p.setAttribute('class', 'f26-ppc-b' + (on ? ' on f26-ppc-b' + src : '') + (bag && !on ? ' dim' : '') + (kesik.has(k) ? ' kes' : '') + (zayif.has(k) ? ' zay' : ''));
        p.setAttribute('marker-end', `url(#f26-ppc-ok${on ? '-' + src : ''})`);
      });
      graf.querySelectorAll('.f26-ppc-is').forEach((g) => { g.classList.toggle('dim', s.oi != null && +g.dataset.is !== s.oi); });
      onlK.querySelectorAll('[data-oi]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.oi === s.oi)));
      silB.hidden = !(s.sec || s.oi != null);
      if (s.sec) capY(N[s.sec][3]);
      else if (s.onlem && s.oi != null) capY(ONLEM[s.oi].cap);
      else if (s.onlem) capY('<b>Önlemler açık.</b> Yeşil × işareti önlemin kestiği bağlantıyı, tek çizgi zayıflattığını gösterir; preoperatif değerlendirme zinciri kesmez, riski bilerek planlamayı sağlar. Bir önlemin numarasına basın. [[K1 s. 109–110]]');
      else capY(null);
    };
    const secNode = (id) => { s.sec = s.sec === id ? null : id; s.oi = null; guncelle(); };
    el.addEventListener('click', (e) => {
      const n = e.target.closest('[data-n]');
      if (n && el.contains(n)) { secNode(n.dataset.n); return; }
      const b = e.target.closest('button');
      if (!b || !el.contains(b)) return;
      if (b.dataset.onl != null) { s.onlem = b.dataset.onl === '1'; s.oi = null; guncelle(); }
      else if (b.dataset.oi != null) { const i = +b.dataset.oi; s.oi = s.oi === i ? null : i; s.sec = null; guncelle(); }
      else if (b === silB) { s.sec = null; s.oi = null; guncelle(); }
    });
    kur();
    const durRO = genislikIzle(el, kur);
    return () => { durRO(); };
  };
})();
