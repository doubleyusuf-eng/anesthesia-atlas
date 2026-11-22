/* Fizyoloji Bölüm 13 · Spirometri · bileşenler (K1 s. 56–62). Tarifler: docs/tasarim/fiz13.md.
   Modeller şematiktir; sayılar kitaptaki değerlere oturtulmuştur ve bileşen altlarında öyle belirtilir. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, f) => a + (b - a) * f;
  const yum = (f) => f * f * (3 - 2 * f);
  const fmt = (v, d = 1) => (Math.round(v * 10 ** d) / 10 ** d).toFixed(d).replace('.', ',').replace('-', '−');
  const isaretli = (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v);
  const yuzde = (p) => { const r = Math.round(p * 10) / 10; return Number.isInteger(r) ? String(r) : fmt(r, 1); };
  const yol = (p) => p.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' ');
  const segHtml = (ad, key, opts, cur) => `<div class="seg" role="group" aria-label="${ad}">${opts.map(([v, l, a]) => `<button type="button" data-${key}="${v}" aria-pressed="${String(v === cur)}"${a ? ` aria-label="${a}"` : ''}>${l}</button>`).join('')}</div>`;
  const basSec = (el, key, v) => el.querySelectorAll(`[data-${key}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[key] === String(v))));
  const at = (e, o) => { for (const k in o) e.setAttribute(k, typeof o[k] === 'number' ? String(+o[k].toFixed(2)) : o[k]); return e; };
  const gor = (e, on) => { e.style.display = on ? '' : 'none'; };
  const dugumler = (root) => { const o = {}; root.querySelectorAll('[data-n]').forEach((e) => { o[e.dataset.n] = e; }); return o; };
  const ciktilar = (root) => { const o = {}; root.querySelectorAll('[data-y]').forEach((e) => { o[e.dataset.y] = e; }); return o; };
  const okTanim = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="8.6" refY="5" markerWidth="4.6" markerHeight="4.6" orient="auto-start-reverse"><path d="M0 0.6 L10 5 L0 9.4 z" class="${cls}"/></marker>`;
  // sayfadaki viz-cap'e yazar (aynı metni yinelemez)
  const capYaz = (el) => {
    const v = el.closest('.viz'), c = v && v.querySelector('.viz-cap');
    if (c) c.setAttribute('aria-live', 'polite');
    let son = null;
    return (h) => { if (!c || h === son) return; son = h; c.innerHTML = REF(h); };
  };
  // ilk kez ekrana girince bir kez çalışır
  const ilkGorunus = (el, fn) => {
    if (!('IntersectionObserver' in window)) return () => {};
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { io.disconnect(); fn(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  };

  /* ---------- Akım–hacim modeli (f13_akim, f13_dinamik, f13_halka) ----------
     Efora bağımlı yükseliş R ile efordan bağımsız zarf E'nin yumuşak minimumu (tarif, bölüm 3). */
  const AKR = (v, e) => e * 12 * (1 - Math.exp(-v / 0.12));
  const AKE = (v, d) => (v >= d.vc ? 0 : d.A * Math.pow(1 - v / d.vc, d.k));
  const AKF = (v, e, d) => { const r = AKR(v, e), q = AKE(v, d); return r <= 0 || q <= 0 ? 0 : Math.pow(Math.pow(r, -5) + Math.pow(q, -5), -0.2); };
  const NORMAL_AK = { vc: 5.0, A: 9.0, k: 1 };
  const akimEgri = (d, e) => {
    const N = 240, p = []; let pk = [0, 0];
    for (let i = 0; i <= N; i++) { const v = d.vc * Math.pow(i / N, 1.5), f = AKF(v, e, d); p.push([v, f]); if (f > pk[1]) pk = [v, f]; }
    return { p, pk };
  };

  /* ---------- 1 · Zorlu ekspirasyon: hacim–zaman eğrisi ve yorum ---------- */
  VIZ.f13_zorlu = (el) => {
    const BEK = { fev: 4.0, fvc: 5.0 };
    const O = {
      normal: { fvc: 5.0, fev: 4.0, renk: 'var(--accent)' },
      astim: { fvc: 4.4, fev: 2.6, renk: 'var(--crit)', bd: { fvc: 4.6, fev: 3.1 } },
      koah: { fvc: 3.8, fev: 1.6, renk: 'var(--crit)', bd: { fvc: 3.9, fev: 1.75 } },
      restr: { fvc: 2.8, fev: 2.5, renk: 'var(--c-basic)' },
    };
    const CAP = {
      normal: '<b>Normal.</b> Sağlıklı akciğer FVC’nin yaklaşık beşte dördünü ilk saniyede dışarı atar: FVC ≈ 5 L, FEV₁ ≈ 4 L, FEV₁/FVC = 0,8. Eğrinin başlangıçtaki eğimi PEFR’dir. Hasta örneğini seçip “Üfle” ile kaydı yeniden çizdirin. [[K1 s. 56–57]]',
      astim: '<b>Astım, bronkodilatör öncesi.</b> FEV₁ 2,60 L (beklenenin %65’i) ve FEV₁/FVC 0,59: iki ölçüt de karşılanıyor, örüntü obstrüktif. Kitabın sınıflamasında FEV₁’in %50–79 olması hafif hastalıktır. Başlangıç eğimi, yani PEFR de düşmüştür. Şimdi “Bronkodilatör sonrası”na basın. [[K1 s. 57–58]]',
      astim_bd: '<b>Bronkodilatörden 15 dakika sonra.</b> FEV₁ 2,60 L’den 3,10 L’ye çıktı: +500 mL. 400 mL’yi aşan düzelme anlamlı geri dönüşümlülük sayılır ve astımı düşündürür. [[K1 s. 57]]',
      koah: '<b>KOAH.</b> FEV₁ 1,60 L (beklenenin %40’ı) ve FEV₁/FVC 0,42: obstrüktif örüntü; kitabın sınıflamasında FEV₁’in %30–49 olması orta hastalıktır. Akciğerin boşalması uzun sürer; FVC de biraz düşüktür, çünkü obstrüksiyonda hava hapsi rezidüel hacmi artırır. [[K1 s. 57–58]]',
      koah_bd: '<b>KOAH, bronkodilatör sonrası.</b> FEV₁ yalnızca 150 mL arttı (1,75 L): 400 mL’nin altında, anlamlı geri dönüşümlülük yok. Ayrımı öykü ile birlikte yapın; kısmen geri dönen obstrüksiyonda iki hastalığın özellikleri birlikteyse astım–KOAH örtüşme sendromu (ACOS) düşünülür. [[K1 s. 57]]',
      restr: '<b>Restriktif.</b> FVC 2,80 L (beklenenin %56’sı) ve FEV₁ 2,50 L (%62,5): ikisi de %80’in altında, ama FEV₁/FVC 0,89, yani yüksek. FEV₁ düşük çünkü atılacak gaz azdır; bu bir obstrüksiyon değildir. [[K1 s. 56–57]]',
    };
    // tek üstel boşalma: V(t) = FVC · (1 − e^(−t/τ)), τ = −1 / ln(1 − FEV₁/FVC) → V(1 s) = FEV₁
    const tau = (o) => -1 / Math.log(1 - o.fev / o.fvc);
    const V = (o, t) => o.fvc * (1 - Math.exp(-t / tau(o)));
    const X = (t) => 52 + 44 * t, Y = (v) => 262 - 40 * v;
    const egri = (o, ts) => { const n = Math.max(2, Math.round(ts * 40)), p = []; for (let i = 0; i <= n; i++) { const t = (ts * i) / n; p.push([X(t), Y(V(o, t))]); } return yol(p); };
    let ornek = 'normal', bd = false, t = 8, oyn = false, ufledi = false;
    const izg = [1, 2, 3, 4, 5, 6].map((v) => `<line class="f13-izg" x1="52" x2="404" y1="${Y(v)}" y2="${Y(v)}"/>`).join('');
    const xt = Array.from({ length: 9 }, (_, i) => `<line class="f13-eks" x1="${X(i)}" x2="${X(i)}" y1="262" y2="267"/><text class="f13-tk" x="${X(i)}" y="281" text-anchor="middle">${i}</text>`).join('');
    const yt = Array.from({ length: 7 }, (_, v) => `<text class="f13-tk" x="45" y="${Y(v) + 4}" text-anchor="end">${v}</text>`).join('');
    el.innerHTML = `
      <div class="f13-kont">
        ${segHtml('Örnek', 'ornek', [['normal', 'Normal'], ['astim', 'Astım'], ['koah', 'KOAH'], ['restr', 'Restriktif']], 'normal')}
        <div class="f13-dug">
          <button type="button" class="btn ghost f13-tog" data-bd aria-pressed="false" disabled>Bronkodilatör sonrası (15 dk)</button>
          <button type="button" class="btn" data-ufle>▶ Üfle</button>
        </div>
      </div>
      <div class="f13-iz">
        <svg class="f13-svg f13-g" viewBox="0 0 420 302" role="img" aria-label="Zorlu ekspirasyonun hacim–zaman eğrisi: FEV₁ birinci saniyede, FVC platoda, PEFR başlangıç eğiminde okunur">
          <defs>${okTanim('f13-ok-z', 'f13-of-ok')}</defs>
          ${izg}
          <line class="f13-eks" x1="52" x2="404" y1="262" y2="262"/><line class="f13-eks" x1="52" x2="52" y1="22" y2="262"/>
          ${xt}${yt}
          <text class="f13-ax" x="228" y="299" text-anchor="middle">Zaman (s)</text>
          <text class="f13-ax" transform="translate(15 142) rotate(-90)" text-anchor="middle">Ekspire edilen hacim (L)</text>
          <line class="f13-bir" x1="96" x2="96" y1="22" y2="262"/>
          <text class="f13-tk" x="96" y="15" text-anchor="middle">1 s</text>
          <path data-n="ref" class="f13-ref" d="${egri(O.normal, 8)}"/>
          <text data-n="refT" class="f13-tk f13-hl" x="402" y="${Y(5) - 6}" text-anchor="end">normal</text>
          <line data-n="egim" class="f13-egim"/>
          <line data-n="fvcC" class="f13-fvc"/>
          <path data-n="once" class="f13-egri f13-once"/>
          <path data-n="egri" class="f13-egri"/>
          <line data-n="fevH" class="f13-kes"/>
          <circle data-n="fevO" class="f13-bos" r="3.6"/>
          <circle data-n="fevN" r="4.6"/>
          <line data-n="bdOk" class="f13-okl"/>
          <text data-n="bdT" class="f13-lb f13-hl f13-ok"></text>
          <text data-n="fevT" class="f13-lb f13-hl"></text>
          <text data-n="fvcT" class="f13-lb f13-hl" text-anchor="end"></text>
          <text data-n="saat" class="f13-tk" x="60" y="40"></text>
          <line class="f13-egim" x1="178" x2="200" y1="246" y2="246"/>
          <text class="f13-tk" x="206" y="250">başlangıç eğimi = PEFR</text>
        </svg>
        <div class="f13-panel">
          <dl class="f13-oku">
            <div><dt>FEV₁</dt><dd data-y="fev"></dd></div>
            <div><dt>FVC</dt><dd data-y="fvc"></dd></div>
            <div><dt>FEV₁/FVC</dt><dd data-y="oran"></dd></div>
            <div><dt>PEFR (başlangıç eğimi)</dt><dd data-y="pefr"></dd></div>
          </dl>
          <p class="f13-rozet" data-y="roz"></p>
          <p class="f13-rozet" data-y="roz2" hidden></p>
          <p class="f13-not">Beklenen: FEV₁ 4,0 L · FVC 5,0 L (şematik hasta)</p>
        </div>
      </div>`;
    const n = dugumler(el), y = ciktilar(el), cap = capYaz(el);
    const bdBtn = el.querySelector('[data-bd]'), ufBtn = el.querySelector('[data-ufle]');
    const ak = () => (bd && O[ornek].bd ? Object.assign({ renk: O[ornek].renk }, O[ornek].bd) : O[ornek]);
    const yorum = (o) => {
      const r = o.fev / o.fvc, pf = (o.fev / BEK.fev) * 100, pv = (o.fvc / BEK.fvc) * 100;
      if (r < 0.7 && pf < 80) return ['crit', `Obstrüktif · ${pf >= 50 ? 'hafif' : pf >= 30 ? 'orta' : 'ağır'} (kitap)`];
      if (r >= 0.7 && pv < 80) return ['basic', 'Restriktif örüntü'];
      return ['ok', 'Normal'];
    };
    let sonPanel = '';
    const panel = () => {
      const o = ak(), pre = bd ? O[ornek] : null, bitti = t >= 8;
      const fev = t >= 1 ? `${fmt(o.fev, 2)} L<span>%${yuzde((o.fev / BEK.fev) * 100)} beklenen</span>` : '…';
      const fvc = bitti ? `${fmt(o.fvc, 2)} L<span>%${yuzde((o.fvc / BEK.fvc) * 100)} beklenen</span>` : '…';
      const oran = bitti ? fmt(o.fev / o.fvc, 2) : '…';
      const pefr = `≈ ${fmt(o.fvc / tau(o), 1)} L/s`;
      const [rk, rt] = bitti ? yorum(o) : ['', 'Kayıt sürüyor…'];
      let r2 = '';
      if (pre && t >= 1) { const d = Math.round((o.fev - pre.fev) * 1000); r2 = d >= 400 ? `Geri dönüşümlülük: +${d} mL ≥ 400 mL → anlamlı` : `Geri dönüşümlülük: +${d} mL < 400 mL → anlamlı değil`; }
      const key = [fev, fvc, oran, pefr, rk, rt, r2].join('|');
      if (key === sonPanel) return; sonPanel = key;
      y.fev.innerHTML = fev; y.fvc.innerHTML = fvc; y.oran.textContent = oran; y.pefr.textContent = pefr;
      y.roz.className = 'f13-rozet ' + rk; y.roz.textContent = rt;
      y.roz2.hidden = !r2; y.roz2.textContent = r2;
    };
    const ciz = () => {
      const o = ak(), pre = bd ? O[ornek] : null, ts = clamp(t, 0, 8), ta = tau(o);
      at(n.egri, { d: egri(o, Math.max(ts, 0.02)) }); n.egri.style.stroke = o.renk;
      gor(n.ref, ornek !== 'normal'); gor(n.refT, ornek !== 'normal');
      gor(n.once, !!pre); if (pre) { at(n.once, { d: egri(pre, 8) }); n.once.style.stroke = o.renk; }
      at(n.egim, { x1: 52, y1: 262, x2: X(ta), y2: Y(o.fvc) });
      const fg = ts >= 1;
      [n.fevH, n.fevN, n.fevT].forEach((e) => gor(e, fg));
      at(n.fevH, { x1: 52, x2: 96, y1: Y(o.fev), y2: Y(o.fev) });
      at(n.fevN, { cx: 96, cy: Y(o.fev) }); n.fevN.style.fill = o.renk;
      at(n.fevT, { x: 102, y: Y(pre ? pre.fev : o.fev) + 18 });
      n.fevT.textContent = pre ? `FEV₁ ${fmt(pre.fev, 2)} → ${fmt(o.fev, 2)} L` : `FEV₁ ${fmt(o.fev, 2)} L`;
      gor(n.fevO, !!pre && fg);
      gor(n.bdT, !!pre && fg);
      const okVar = !!pre && fg && Y(pre.fev) - Y(o.fev) > 12;
      gor(n.bdOk, okVar);
      if (pre) {
        at(n.fevO, { cx: 96, cy: Y(pre.fev) }); n.fevO.style.stroke = o.renk;
        at(n.bdOk, { x1: 96, x2: 96, y1: Y(pre.fev) - 5, y2: Y(o.fev) + 6 }); n.bdOk.setAttribute('marker-end', 'url(#f13-ok-z)');
        at(n.bdT, { x: 102, y: (Y(pre.fev) + Y(o.fev)) / 2 + 4 }); n.bdT.textContent = `+${Math.round((o.fev - pre.fev) * 1000)} mL`;
      }
      const son = ts >= 8;
      gor(n.fvcC, son); gor(n.fvcT, son);
      at(n.fvcC, { x1: 52, x2: 404, y1: Y(o.fvc), y2: Y(o.fvc) });
      at(n.fvcT, { x: 402, y: Y(o.fvc) - 6 }); n.fvcT.textContent = `FVC ${fmt(o.fvc, 2)} L`;
      n.saat.textContent = oyn ? `t = ${fmt(ts, 1)} s · ${fmt(V(o, ts), 2)} L` : '';
      panel();
    };
    const dugme = () => {
      bdBtn.disabled = !O[ornek].bd; bdBtn.setAttribute('aria-pressed', String(bd));
      ufBtn.textContent = ufledi ? '↺ Yeniden üfle' : '▶ Üfle';
    };
    const ufle = () => { if (RM) { t = 8; oyn = false; ufledi = true; } else { t = 0; oyn = true; } dugme(); ciz(); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b) || b.disabled) return;
      if (b.dataset.ornek) { ornek = b.dataset.ornek; bd = false; basSec(el, 'ornek', ornek); ufle(); }
      else if (b.hasAttribute('data-bd')) { bd = !bd; if (bd) ufle(); else { t = 8; oyn = false; dugme(); ciz(); } }
      else if (b.hasAttribute('data-ufle')) ufle();
      else return;
      cap(CAP[ornek + (bd ? '_bd' : '')]);
    });
    dugme(); ciz(); cap(CAP.normal);
    const gozcu = ilkGorunus(el, () => { if (!RM && !ufledi && !oyn) { t = 0; oyn = true; ciz(); } });
    const dur = ticker(el, (dt) => {
      if (!oyn) return;
      t += dt * 2;
      if (t >= 8) { t = 8; oyn = false; ufledi = true; dugme(); }
      ciz();
    });
    return () => { dur(); gozcu(); };
  };

  /* ---------- 2 · GBS'de seri FVC izlemi ---------- */
  VIZ.f13_gbs = (el) => {
    const SEYIR = [100, 97, 92, 85, 76, 68, 58, 47, 37, 29]; // başlangıç FVC'nin yüzdesi, 6 saatte bir (şematik)
    const X = (h) => 52 + (h * 352) / 54, Y = (L) => 240 - (L * 216) / 5.5;
    let W = 70, F0 = 4.5, sayi = 1, bul = false, oks = false, ilr = 1;
    const olc = (i) => { const p = SEYIR[i], x = (F0 * p) / 100; return { i, h: i * 6, p, x, mk: (x * 1000) / W, d: 100 - p, rel: p < 70, abs: x * 1000 < 20 * W }; };
    const mkYaz = (m) => (m < 20 && Math.round(m) >= 20 ? fmt(m, 1) : String(Math.round(m)));
    const CAP0 = '<b>Başlangıç ölçümü.</b> İzlem, ilk FVC değerine göre yapılır. Ölçümler başlangıçta en az 6 saatte bir yinelenir; iki eşik birlikte izlenir: 20 mL/kg ve başlangıca göre %30 azalma. “Sonraki ölçüm” ile 6 saat ilerleyin. [[K1 s. 58]]';
    const EK = ' Bulber güçsüzlük ve zayıf öksürük, sayılardan bağımsız olarak entübasyon gereksinimini düşündürür; sekresyonların temizlenebilmesi için invaziv ventilasyon yeğlenir. [[K1 s. 57]]';
    const capMetin = (m) => {
      const x = fmt(m.x, 2), yk = mkYaz(m.mk);
      let s;
      if (m.i === 0) s = CAP0;
      else if (m.rel && m.abs) s = `<b>${m.h}. saat: iki ölçüt birlikte.</b> FVC ${yk} mL/kg ve başlangıca göre %${m.d} azalmış. Solunum yetmezliği gelişmeden davranmak gerekir. [[K1 s. 57–58]]`;
      else if (m.rel) s = `<b>${m.h}. saat: başlangıca göre %${m.d} azalma.</b> FVC başlangıç değerinin %30’undan fazla düştü: kitabın ölçütüne göre entübasyon düşünülür, oysa FVC henüz ${yk} mL/kg’dır. Göreli düşüş, mutlak eşikten önce uyarabilir. [[K1 s. 58]]`;
      else if (m.abs) s = `<b>${m.h}. saat: ${yk} mL/kg.</b> FVC 20 mL/kg’ın altına indi: kitabın ölçütüne göre entübasyon düşünülür. [[K1 s. 58]]`;
      else s = `<b>${m.h}. saat.</b> FVC ${x} L, yani ${yk} mL/kg; başlangıca göre %${m.d} azalma. İki eşik de aşılmadı; ölçüm 6 saat sonra yinelenir. [[K1 s. 58]]`;
      return s + (bul || oks ? EK : '');
    };
    const rozet = (m) => {
      const kl = bul || oks; let t, c = 'crit';
      if (m.rel && m.abs) t = 'Entübasyonu düşünün: iki ölçüt';
      else if (m.rel) t = 'Entübasyonu düşünün: > %30 azalma';
      else if (m.abs) t = 'Entübasyonu düşünün: < 20 mL/kg';
      else if (kl) t = 'Entübasyonu düşünün';
      else { t = 'Ölçüme devam (6 saatte bir)'; c = 'ok'; }
      return [c, kl ? t + ' · klinik bulgu' : t];
    };
    const izg = [1, 2, 3, 4, 5].map((v) => `<line class="f13-izg" x1="52" x2="404" y1="${Y(v)}" y2="${Y(v)}"/>`).join('');
    const xt = Array.from({ length: 10 }, (_, i) => `<line class="f13-eks" x1="${X(i * 6)}" x2="${X(i * 6)}" y1="240" y2="${i % 2 ? 244 : 246}"/>${i % 2 ? '' : `<text class="f13-tk" x="${X(i * 6)}" y="259" text-anchor="middle">${i * 6}</text>`}`).join('');
    const yt = [0, 1, 2, 3, 4, 5].map((v) => `<text class="f13-tk" x="45" y="${Y(v) + 4}" text-anchor="end">${v}</text>`).join('');
    el.innerHTML = `
      <div class="f13-iz">
        <div class="f13-sol">
          <svg class="f13-svg f13-g" viewBox="0 0 420 280" role="img" aria-label="Guillain–Barré sendromunda 6 saatte bir ölçülen FVC; 20 mL/kg ve başlangıca göre %30 azalma eşikleri">
            ${izg}
            <line class="f13-eks" x1="52" x2="404" y1="240" y2="240"/><line class="f13-eks" x1="52" x2="52" y1="24" y2="240"/>
            ${xt}${yt}
            <text class="f13-ax" x="228" y="277" text-anchor="middle">Saat</text>
            <text class="f13-ax" transform="translate(15 132) rotate(-90)" text-anchor="middle">FVC (L)</text>
            <line data-n="e20" class="f13-esik w"/>
            <line data-n="e70" class="f13-esik c"/>
            <path data-n="cizgi" class="f13-gbs-cz"/>
            <g data-n="nok"></g>
            <g data-n="kutu" class="f13-kutu"><line data-n="kl" class="f13-kl"/><rect data-n="kr" rx="7"/><text data-n="k1" class="f13-lb"></text><text data-n="k2" class="f13-tk"></text></g>
            <text data-n="e20T" class="f13-lb2 f13-hl f13-w"></text>
            <text data-n="e70T" class="f13-lb2 f13-hl f13-c"></text>
          </svg>
          <p class="f13-rozet" data-y="roz"></p>
        </div>
        <div class="f13-panel">
          <label class="f13-rng"><span>Vücut ağırlığı <b data-y="W"></b></span><input type="range" min="50" max="100" step="5" value="70" data-r="W" aria-label="Vücut ağırlığı (kg)"></label>
          <label class="f13-rng"><span>Başlangıç FVC <b data-y="F0"></b></span><input type="range" min="2.5" max="5" step="0.1" value="4.5" data-r="F0" aria-label="Başlangıç FVC (L)"></label>
          <button type="button" class="btn f13-tam" data-ileri>Sonraki ölçüm (+6 sa)</button>
          <div class="f13-chk"><label><input type="checkbox" data-c="bul"> Bulber güçsüzlük</label><label><input type="checkbox" data-c="oks"> Zayıf öksürük</label></div>
          <dl class="f13-oku">
            <div><dt>Saat</dt><dd data-y="saat"></dd></div>
            <div><dt>FVC</dt><dd data-y="fvc"></dd></div>
            <div><dt>FVC / ağırlık</dt><dd data-y="mk"></dd></div>
            <div><dt>Başlangıca göre</dt><dd data-y="d"></dd></div>
          </dl>
        </div>
      </div>`;
    const n = dugumler(el), y = ciktilar(el), cap = capYaz(el), ileri = el.querySelector('[data-ileri]');
    // değer kutusu: son noktanın çevresinde, ölçümlere, eşik etiketlerine ve kenarlara en az değen yer
    const kutu = (m, P) => {
      const p = P[P.length - 1];
      n.k1.textContent = `${fmt(m.x, 2)} L · ${mkYaz(m.mk)} mL/kg`;
      n.k2.textContent = m.i === 0 ? 'başlangıç' : `başlangıca göre −%${m.d}`;
      let w = 190, h = 40, etk = [];
      try {
        const b1 = n.k1.getBBox(), b2 = n.k2.getBBox();
        w = Math.max(b1.width, b2.width) + 18; h = b1.height + b2.height + 12;
        etk = [n.e20T.getBBox(), n.e70T.getBBox()];
      } catch (_) { /* ölçülemedi: tahmin */ }
      const iz = [];
      P.forEach((q, i) => { iz.push(q); if (i) for (let k = 1; k < 6; k++) iz.push([lerp(P[i - 1][0], q[0], k / 6), lerp(P[i - 1][1], q[1], k / 6)]); });
      const aday = [[p[0] + 10, p[1] - h - 8], [p[0] - 10 - w, p[1] + 10], [p[0] + 10, p[1] + 10], [p[0] - w / 2, p[1] - h - 14], [p[0] - 10 - w, p[1] - h - 8], [p[0] - w / 2, p[1] + 14], [418 - w, 4], [418 - w, 60]];
      let en = aday[0], enC = Infinity;
      for (const [x, yy] of aday) {
        let c = Math.hypot(x + w / 2 - p[0], yy + h / 2 - p[1]) / 50;
        if (x < 56 || x + w > 418 || yy < 2 || yy + h > 238) c += 1000;
        for (const q of iz) if (q[0] > x - 6 && q[0] < x + w + 6 && q[1] > yy - 6 && q[1] < yy + h + 6) c += 10;
        for (const b of etk) if (!(b.x > x + w || b.x + b.width < x || b.y > yy + h || b.y + b.height < yy)) c += 30;
        if (c < enC) { enC = c; en = [x, yy]; }
      }
      const [x, yy] = [clamp(en[0], 56, 418 - w), clamp(en[1], 2, 238 - h)];
      at(n.kr, { x, y: yy, width: w, height: h });
      const lx = clamp(p[0], x, x + w), ly = clamp(p[1], yy, yy + h), uz = Math.hypot(lx - p[0], ly - p[1]);
      gor(n.kl, uz > 16); at(n.kl, { x1: p[0], y1: p[1], x2: lx, y2: ly });
      at(n.k1, { x: x + 9, y: yy + h / 2 - 3 }); at(n.k2, { x: x + 9, y: yy + h - 7 });
    };
    const ciz = () => {
      const e20 = 0.02 * W, e70 = 0.7 * F0;
      // üstteki eşiğin etiketi sağda çizginin üstünde, alttakinin solda çizginin altında: ölçümler bu iki yere hiç düşmez
      const etiket = (t, v, ust) => at(t, ust ? { x: 402, y: Y(v) - 6, 'text-anchor': 'end' } : { x: 58, y: Y(v) + 16, 'text-anchor': 'start' });
      at(n.e20, { x1: 52, x2: 404, y1: Y(e20), y2: Y(e20) }); etiket(n.e20T, e20, e20 > e70); n.e20T.textContent = `20 mL/kg · ${fmt(e20, 2)} L`;
      at(n.e70, { x1: 52, x2: 404, y1: Y(e70), y2: Y(e70) }); etiket(n.e70T, e70, e70 >= e20); n.e70T.textContent = `%30 azalma · ${fmt(e70, 2)} L`;
      const M = Array.from({ length: sayi }, (_, i) => olc(i)), P = M.map((m) => [X(m.h), Y(m.x)]);
      const cz = P.slice();
      if (sayi > 1 && ilr < 1) { const a = P[sayi - 2], b = P[sayi - 1]; cz[sayi - 1] = [lerp(a[0], b[0], ilr), lerp(a[1], b[1], ilr)]; }
      at(n.cizgi, { d: yol(cz) });
      n.nok.innerHTML = M.map((m, i) => (i === sayi - 1 && ilr < 1 ? '' : `<circle cx="${P[i][0].toFixed(1)}" cy="${P[i][1].toFixed(1)}" r="${i === sayi - 1 ? 5.6 : 4.2}" class="f13-gbs-n${m.rel || m.abs ? ' alt' : ''}${i === sayi - 1 ? ' son' : ''}"/>`)).join('');
      const m = M[sayi - 1];
      gor(n.kutu, ilr >= 1);
      if (ilr >= 1) kutu(m, P);
      const [rc, rt] = rozet(m);
      y.roz.className = 'f13-rozet ' + rc; y.roz.textContent = rt;
      y.W.textContent = `${W} kg`; y.F0.textContent = `${fmt(F0, 1)} L`;
      y.saat.textContent = `${m.h}. saat`; y.fvc.textContent = `${fmt(m.x, 2)} L`; y.mk.textContent = `${mkYaz(m.mk)} mL/kg`;
      y.d.textContent = m.i === 0 ? '—' : `−%${m.d}`;
      ileri.textContent = sayi >= SEYIR.length ? '↺ Baştan' : 'Sonraki ölçüm (+6 sa)';
      cap(capMetin(m));
    };
    el.addEventListener('input', (e) => {
      const r = e.target.closest('[data-r]'); if (!r) return;
      if (r.dataset.r === 'W') W = +r.value; else F0 = Math.round(+r.value * 10) / 10;
      sayi = 1; ilr = 1; ciz();
    });
    el.addEventListener('change', (e) => {
      const c = e.target.closest('[data-c]'); if (!c) return;
      if (c.dataset.c === 'bul') bul = c.checked; else oks = c.checked;
      ciz();
    });
    ileri.addEventListener('click', () => {
      if (sayi >= SEYIR.length) { sayi = 1; ilr = 1; } else { sayi++; ilr = RM ? 1 : 0; }
      ciz();
    });
    ciz();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (el.isConnected) ciz(); });
    return ticker(el, (dt) => { if (ilr < 1) { ilr = Math.min(1, ilr + dt / 0.45); ciz(); } });
  };

  /* ---------- 3 · Akım–hacim eğrisi: efor nereye kadar işe yarar? ---------- */
  VIZ.f13_akim = (el) => {
    const D = {
      normal: { vc: 5.0, A: 9.0, k: 1, renk: 'var(--accent)' },
      hafif: { vc: 4.4, A: 7.2, k: 1.7, renk: 'var(--crit)' },
      agir: { vc: 3.4, A: 5.0, k: 3, renk: 'var(--crit)' },
      restr: { vc: 2.8, A: 7.0, k: 1, renk: 'var(--c-basic)' },
    };
    const CAP = {
      normal: '<b>Normal, en yüksek efor.</b> Akım hızla yükselip PEFR’de (≈ 8 L/s) tepe yapar, sonra rezidüel hacme dek doğrusal azalır. Eforu azaltın: tepe düşer ve geç gelir, ama eğrinin inen kolu aynı çizgiye oturur. İnen kol efordan bağımsızdır. [[K1 s. 58–59]]',
      hafif: '<b>Hafif obstrüktif.</b> Küçük hava yolu direnci artmıştır: PEFR düşük (≈ 6,5 L/s), inen kol doğrusal değil, hafifçe konkav. Eğri normalden önce biter: tam ekspirasyonda hava hapsi rezidüel hacmi artırmıştır. [[K1 s. 58–59]]',
      agir: '<b>Ağır obstrüktif.</b> PEFR belirgin düşük (≈ 4,5 L/s); tepeden hemen sonra akım çöker ve inen kol belirgin konkavdır. Konkavlık da hava hapsi de hastalığın şiddetiyle artar. [[K1 s. 58–59]]',
      restr: '<b>Restriktif.</b> TLC azaldığı için vital kapasite küçüktür. PEFR biraz düşüktür (≈ 6,3 L/s): solunum kası güçsüzlüğü oluşturulabilecek en yüksek ekspiratuvar eforu azaltır. İnen kol doğrusal kalır. [[K1 s. 59]]',
      dort: '<b>Dört efor, tek inen kol.</b> %40, %60, %80 ve %100 eforla çizilen eğriler farklı tepelere çıkar, ama sonunda aynı çizgide birleşir: bu kısım dinamik hava yolu kompresyonuyla sınırlıdır ve daha fazla zorlamak akımı artırmaz. [[K1 s. 58–60]]',
    };
    const efEk = (e, x) => ` Efor %${e}: tepe akım ${x} L/s’ye indi ve daha geç geldi; inen kolda eğri en yüksek eforlu eğriyle birleşir. Efora bağımlı olan yalnız ilk bölümdür. [[K1 s. 59]]`;
    const X = (v) => 52 + 64 * v, Y = (f) => 250 - (228 / 9) * f;
    const onbellek = new Map();
    const egri = (d, e) => { const k = d.vc + '|' + e; if (!onbellek.has(k)) { const c = akimEgri(d, e); c.d = yol(c.p.map(([v, f]) => [X(v), Y(f)])); onbellek.set(k, c); } return onbellek.get(k); };
    let dur = 'normal', ef = 100, dort = false, oyn = false, p = 0;
    const izg = [2, 4, 6, 8].map((f) => `<line class="f13-izg" x1="52" x2="404" y1="${Y(f)}" y2="${Y(f)}"/>`).join('');
    const xt = [0, 1, 2, 3, 4, 5].map((v) => `<line class="f13-eks" x1="${X(v)}" x2="${X(v)}" y1="250" y2="${v ? 254 : 250}"/><text class="f13-tk" x="${X(v)}" y="273" text-anchor="middle">${v}</text>`).join('');
    const yt = [0, 2, 4, 6, 8].map((f) => `<text class="f13-tk" x="45" y="${Y(f) + 4}" text-anchor="end">${f}</text>`).join('');
    el.innerHTML = `
      <div class="f13-kont">
        ${segHtml('Durum', 'durum', [['normal', 'Normal'], ['hafif', 'Hafif obstrüktif'], ['agir', 'Ağır obstrüktif'], ['restr', 'Restriktif']], 'normal')}
        <label class="f13-rng f13-rng-ust"><span>Ekspiratuvar efor <b data-y="ef">%100</b></span><input type="range" min="40" max="100" step="10" value="100" data-r="ef" aria-label="Ekspiratuvar efor (yüzde)"></label>
        <div class="f13-dug">
          <button type="button" class="btn ghost f13-tog" data-dort aria-pressed="false">Dört eforu üst üste çiz</button>
          <button type="button" class="btn" data-oyn>▶ Oynat</button>
        </div>
      </div>
      <div class="f13-iz">
        <svg class="f13-svg f13-g" viewBox="0 0 420 310" role="img" aria-label="Ekspiratuvar akım–hacim eğrisi: PEFR'ye kadar efora bağımlı, sonra efordan bağımsız bölüm">
          <defs>${okTanim('f13-ok-a', 'f13-of-ink')}</defs>
          ${izg}
          <line class="f13-eks" x1="52" x2="404" y1="250" y2="250"/><line class="f13-eks" x1="52" x2="52" y1="22" y2="250"/>
          ${xt}${yt}
          <text class="f13-ax" x="228" y="306" text-anchor="middle">Ekspire edilen hacim (L)</text>
          <text class="f13-ax" transform="translate(15 136) rotate(-90)" text-anchor="middle">Ekspiratuvar akım (L/s)</text>
          <rect data-n="serD" class="f13-ser-d" y="${254}" height="5" rx="1.5"/>
          <rect data-n="serB" class="f13-ser-b" y="${254}" height="5" rx="1.5"/>
          <path data-n="ref" class="f13-ref" d="${egri(D.normal, 1).d}"/>
          <path data-n="tam" class="f13-egri f13-soluk"/>
          <g data-n="dort"></g>
          <path data-n="egri" class="f13-egri"/>
          <line data-n="hapOk" class="f13-hap" marker-start="url(#f13-ok-a)" marker-end="url(#f13-ok-a)"/>
          <text data-n="hapT" class="f13-lb2 f13-hl" text-anchor="middle"><tspan data-n="hap1">hava hapsi</tspan><tspan data-n="hap2" dy="15">(RV ↑)</tspan></text>
          <text data-n="resT" class="f13-lb2 f13-hl f13-b"><tspan data-n="res1">VC küçük</tspan><tspan data-n="res2" dy="15">(TLC ↓)</tspan></text>
          <circle data-n="tepe" r="4.6"/>
          <text data-n="tepeT" class="f13-lb f13-hl"></text>
          <text class="f13-lb2" x="52" y="290" text-anchor="middle">TLC</text>
          <text data-n="rvT" class="f13-lb2" y="290" text-anchor="middle">RV</text>
          <text data-n="rvR" class="f13-lb2 f13-m" y="290" text-anchor="middle" x="${X(5)}">RV</text>
          <circle data-n="nk" class="f13-nok" r="5.5"/>
          <text data-n="fazT" class="f13-lb2 f13-hl" x="402" y="40" text-anchor="end"></text>
        </svg>
        <div class="f13-panel">
          <dl class="f13-oku f13-oku-3">
            <div><dt>PEFR</dt><dd data-y="pefr"></dd></div>
            <div><dt>VC</dt><dd data-y="vc"></dd></div>
            <div><dt>Efor</dt><dd data-y="efor"></dd></div>
          </dl>
          <p class="f13-lej"><span style="--k:var(--warn)"><i></i>efora bağımlı</span><span style="--k:var(--c-clin)"><i></i>efordan bağımsız</span></p>
          <p class="f13-lej" data-y="dortLej" hidden><span class="f13-lej-op" style="--k:var(--x);--o:.3"><i></i>%40</span><span class="f13-lej-op" style="--k:var(--x);--o:.5"><i></i>%60</span><span class="f13-lej-op" style="--k:var(--x);--o:.72"><i></i>%80</span><span class="f13-lej-op" style="--k:var(--x);--o:1"><i></i>%100</span></p>
          <p class="f13-not">Kesikli gri: normal, en yüksek efor (başvuru).</p>
        </div>
      </div>`;
    const n = dugumler(el), y = ciktilar(el), cap = capYaz(el), rng = el.querySelector('[data-r="ef"]');
    const ciz = () => {
      const d = D[dur], e = dort ? 1 : ef / 100, c = egri(d, e), c100 = egri(d, 1);
      n.egri.setAttribute('d', c.d); n.egri.style.stroke = d.renk;
      gor(n.ref, dur !== 'normal'); gor(n.rvR, dur !== 'normal');
      gor(n.tam, !dort && ef < 100); n.tam.setAttribute('d', c100.d); n.tam.style.stroke = d.renk;
      n.dort.innerHTML = dort ? [[0.4, 0.3], [0.6, 0.5], [0.8, 0.72]].map(([ee, op]) => `<path class="f13-egri f13-dort" d="${egri(d, ee).d}" style="stroke:${d.renk};opacity:${op}"/>`).join('') : '';
      el.style.setProperty('--x', d.renk);
      const [vp, fp] = c.pk;
      // düşük eforda tepeden sonraki kısım en yüksek eforlu eğriye oturana dek hâlâ efora bağımlıdır
      let vm = vp; if (e < 1) { const q = c.p.find(([v, f]) => v > vp && f >= 0.97 * AKF(v, 1, d)); if (q) vm = q[0]; }
      at(n.tepe, { cx: X(vp), cy: Y(fp) }); n.tepe.style.fill = d.renk;
      at(n.tepeT, { x: X(vp) + 8, y: Y(fp) - 7 }); n.tepeT.textContent = `PEFR ${fmt(fp, 1)} L/s`;
      at(n.serD, { x: X(0), width: X(vm) - X(0) }); at(n.serB, { x: X(vm), width: X(d.vc) - X(vm) });
      at(n.rvT, { x: X(d.vc) }); n.rvT.style.fill = d.renk;
      // hava hapsi: normalin RV'si ile hastalıklı eğrinin RV'si arasında
      const hap = dur === 'hafif' || dur === 'agir';
      gor(n.hapOk, hap); gor(n.hapT, hap);
      if (hap) {
        const x1 = X(d.vc) + 3, x2 = X(5) - 3, orta = Math.min((x1 + x2) / 2, 404 - 40);
        at(n.hapOk, { x1, x2, y1: 242, y2: 242 });
        at(n.hapT, { x: orta, y: 214 }); at(n.hap1, { x: orta }); at(n.hap2, { x: orta });
      }
      gor(n.resT, dur === 'restr');
      if (dur === 'restr') { const x = X(d.vc) + 7; at(n.resT, { x, y: 224 }); at(n.res1, { x }); at(n.res2, { x }); }
      // oynatma noktası
      const oynGor = oyn || (RM && p > 0);
      gor(n.nk, oynGor); gor(n.fazT, oynGor);
      if (oynGor) {
        const v = p < 0.2 ? vp * (p / 0.2) : vp + (d.vc - vp) * ((p - 0.2) / 0.8), f = AKF(v, e, d), bag = v <= vm + 1e-6;
        at(n.nk, { cx: X(v), cy: Y(f) }); n.nk.style.stroke = d.renk;
        n.fazT.textContent = bag ? 'efora bağımlı' : 'efordan bağımsız';
        n.fazT.setAttribute('class', 'f13-lb2 f13-hl ' + (bag ? 'f13-w' : 'f13-k'));
      }
      y.pefr.textContent = `${fmt(fp, 1)} L/s`; y.vc.textContent = `${fmt(d.vc, 1)} L`;
      y.efor.textContent = dort ? '%40–100' : `%${ef}`; y.ef.textContent = dort ? '—' : `%${ef}`;
      y.dortLej.hidden = !dort;
      rng.disabled = dort;
      el.querySelector('[data-dort]').setAttribute('aria-pressed', String(dort));
      cap(dort ? CAP.dort : CAP[dur] + (ef < 100 ? efEk(ef, fmt(fp, 1)) : ''));
    };
    el.addEventListener('input', (e) => { if (e.target === rng) { ef = +rng.value; ciz(); } });
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.durum) { dur = b.dataset.durum; basSec(el, 'durum', dur); }
      else if (b.hasAttribute('data-dort')) dort = !dort;
      else if (b.hasAttribute('data-oyn')) { if (RM) { p = 0.2; oyn = false; } else { p = 0; oyn = true; } }
      else return;
      ciz();
    });
    ciz();
    const durdur = ticker(el, (dt) => {
      if (!oyn) return;
      p += dt / 3;
      if (p >= 1) { p = 1; oyn = false; }
      ciz();
    });
    return durdur;
  };

  /* ---------- 4 · Dinamik hava yolu kompresyonu, adım adım ---------- */
  VIZ.f13_dinamik = (el) => {
    const CX = 120, S0 = 222, SL = 178.8, sy = (s) => S0 - s * SL; // s: alveolden (0) ağza (1)
    const F100 = (v) => AKF(v, 1, NORMAL_AK), F60 = (v) => AKF(v, 0.6, NORMAL_AK);
    const TEPE = akimEgri(NORMAL_AK, 1).pk;
    const ADIM = [null,
      { PA: 0, Ppl: -10, Pel: 10, r: 40, w: 16, akim: 0, comp: null, nokta: [0, 0], akT: ['0', 'akım yok'] },
      { PA: 40, Ppl: 30, Pel: 10, r: 40, w: 16, akim: 1, comp: null, nokta: TEPE, akT: [`≈ ${fmt(TEPE[1], 1)} L/s`, 'PEFR · efora bağımlı'] },
      { PA: 35, Ppl: 30, Pel: 5, r: 28, w: 10, akim: 0.45, comp: [0.40, 0.55, 3], nokta: [3.0, F100(3.0)], akT: [`≈ ${fmt(F100(3.0), 1)} L/s`, 'azalıyor · efordan bağımsız'] },
    ];
    let adim = 1, efor = 'normal', hac = 'yuk';
    const durum = () => {
      if (adim < 4) return ADIM[adim];
      const yuk = hac === 'yuk', g = efor === 'guc', Ppl = g ? 60 : 30, Pel = yuk ? 10 : 5, v = yuk ? 1.0 : 3.5;
      return { PA: Ppl + Pel, Ppl, Pel, r: yuk ? 40 : 28, w: yuk ? 16 : 10, akim: yuk ? 1 : 0.5, sE: yuk ? 0.5 : 0.3, comp: [yuk ? 0.5 : 0.3, 0.55, yuk ? (g ? 4 : 7) : (g ? 3 : 5)], nokta: [v, F100(v)], akT: [`≈ ${fmt(F100(v), 1)} L/s`, g ? 'güçlü eforda da aynı' : (yuk ? 'yüksek hacim' : 'düşük hacim')] };
    };
    const genislik = (s, st) => {
      const kucuk = (u) => { let w = st.w; if (st.comp) { const [a, b, wc] = st.comp; if (u >= a) { const dd = Math.min(0.05, (b - a) * 0.6); w = lerp(st.w, wc, yum(clamp((u - a) / dd, 0, 1))); } } return w; };
      if (s <= 0.55) return kucuk(s);
      if (s < 0.58) return lerp(kucuk(0.55), 18, yum((s - 0.55) / 0.03));
      return 18;
    };
    const CAP = [null,
      '<b>1 · İnspirasyon sonu.</b> Akım yok: alveoler basınç 0, intraplevral basınç −10. Hava yolunun içi çevresinden yüksek basınçta olduğu için hava yolu açıktır. [[K1 s. 60]]',
      '<b>2 · Zorlu ekspirasyonun başı.</b> Ekspiratuvar kaslar intraplevral basıncı +30’a, alveoler basıncı +40’a çıkarır. Akciğer hacmi yüksek, parankim gergin, hava yolu en geniştir: akım hızla PEFR’ye çıkar. Bu evrede akım efora bağımlıdır; Ppl ne kadar yüksekse PEFR ve FEV₁ o kadar büyüktür. [[K1 s. 59–60]]',
      '<b>3 · Hacim azaldıkça.</b> Ppl yüksek kalır (+30), ama parankim gevşer ve hava yolu daralır. Kıkırdak desteği olmayan küçük hava yolu çevresindeki yüksek basınçla ezilir: dinamik hava yolu kompresyonu. Direnç artar, akım düşer ve artık efordan bağımsızdır; rezidüel hacme doğru doğrusal azalır. [[K1 s. 59–60]]',
      '<b>4 · Eşit basınç noktası (Atlas notu).</b> Hava yolu içindeki basınç alveolden ağza doğru düşer; Ppl’ye eşitlendiği yer eşit basınç noktasıdır (EBN). EBN’nin ağız tarafında içerideki basınç çevredekinden düşüktür ve hava yolu sıkışır. Kitap bu açıklamanın adını verir. [[K1 s. 59]]',
    ];
    const capMetin = (st) => {
      if (adim < 4) return CAP[adim];
      let s = CAP[4];
      if (efor === 'guc') s += ` Güçlü efor: Ppl +${st.Ppl}, PA +${st.PA}. Sıkışan kesim daha da daralır, ama akımı süren fark (PA − Ppl = Pel = ${st.Pel}) değişmedi; akım aynı kalır.`;
      if (hac === 'dus') s += ' Düşük hacim: elastik geri çekilme azaldı (Pel = 5). EBN alveole, daha küçük hava yollarına kaydı ve akımı süren fark yarıya indi; akım düşük.';
      return s;
    };
    // küçük akım–hacim grafiği (220 × 172)
    const mX = (v) => 30 + v * 35.2, mY = (f) => 146 - f * (132 / 9);
    const mYol = (fn) => { const p = []; for (let i = 0; i <= 160; i++) { const v = 5 * Math.pow(i / 160, 1.5); p.push([mX(v), mY(fn(v))]); } return yol(p); };
    const kik = []; for (let s = 0.6; s < 0.99; s += 0.04) { const yy = sy(s).toFixed(1); kik.push(`<line x1="${CX - 15}" x2="${CX - 9}" y1="${yy}" y2="${yy}"/><line x1="${CX + 9}" x2="${CX + 15}" y1="${yy}" y2="${yy}"/>`); }
    el.innerHTML = `
      <div class="f13-kont">
        ${segHtml('Adım', 'adim', [['1', '1 İnspirasyon sonu'], ['2', '2 Ekspirasyonun başı'], ['3', '3 Hacim azaldıkça'], ['4', '4 Eşit basınç noktası']], '1')}
        <div class="f13-dug"><button type="button" class="btn ghost" data-git="-1">← Önceki</button><button type="button" class="btn" data-git="1">Sonraki →</button></div>
      </div>
      <div class="f13-kont f13-ek" data-y="ek" hidden>
        <div class="f13-grp"><span>Efor</span>${segHtml('Efor', 'efor', [['normal', 'Normal'], ['guc', 'Güçlü']], 'normal')}</div>
        <div class="f13-grp"><span>Akciğer hacmi</span>${segHtml('Akciğer hacmi', 'hac', [['yuk', 'Yüksek'], ['dus', 'Düşük']], 'yuk')}</div>
      </div>
      <div class="f13-din">
        <svg class="f13-svg f13-sema" viewBox="0 0 300 338" role="img" aria-label="Göğüs kafesi içinde alveol ve hava yolu; intraplevral ve alveoler basınç, hava yolunun sıkışması">
          <defs>${okTanim('f13-ok-dc', 'f13-of-crit')}${okTanim('f13-ok-da', 'f13-of-acc')}</defs>
          <text class="f13-ax" x="${CX}" y="30" text-anchor="middle">ağız · atmosfer (0)</text>
          <rect class="f13-gogus" x="14" y="70" width="272" height="242" rx="26"/>
          <text data-n="ppl" class="f13-lb f13-c" x="28" y="96"></text>
          <circle data-n="alv" class="f13-alv" cx="${CX}"/>
          <path data-n="lumen" class="f13-lumen"/>
          <path data-n="solD" class="f13-duvar"/><path data-n="sagD" class="f13-duvar"/>
          <g class="f13-kik">${kik.join('')}</g>
          <g data-n="oklar"></g>
          <g data-n="parc" class="f13-parc"></g>
          <path data-n="akok" class="f13-akok" marker-end="url(#f13-ok-da)"/>
          <text data-n="pa" class="f13-lb" x="${CX}" text-anchor="middle"></text>
          <g data-n="etk">
            <text class="f13-tk f13-ink" x="138" y="58">trakea (toraks dışı)</text>
            <text class="f13-lb2" x="160" y="${sy(0.33) - 2}">küçük hava yolu</text>
            <text class="f13-tk" x="160" y="${sy(0.33) + 13}">kıkırdaksız</text>
            <text class="f13-lb2" x="160" y="${sy(0.71) - 2}">bronş</text>
            <text class="f13-tk" x="160" y="${sy(0.71) + 13}">kıkırdaklı</text>
          </g>
          <g data-n="prof">
            <rect data-n="pr1" class="f13-pr-a" x="146" width="6"/><rect data-n="pr2" class="f13-pr-s" x="146" width="6"/><rect data-n="pr3" class="f13-pr-a" x="146" width="6"/>
            <line data-n="ebn" class="f13-ebn" x1="${CX - 16}" x2="154"/>
            <text data-n="ebnT" class="f13-lb2 f13-w" x="159"></text>
            <text data-n="acT" class="f13-lb2 f13-b" x="159">P &gt; Ppl · açık</text>
            <text data-n="skT" class="f13-lb2 f13-c" x="159">P &lt; Ppl · sıkışır</text>
            <text data-n="disT" class="f13-tk f13-b" x="159">P &gt; PB · açık</text>
          </g>
          <text class="f13-tk" x="150" y="332" text-anchor="middle">basınçlar cmH₂O (şematik)</text>
        </svg>
        <div class="f13-panel">
          <svg class="f13-svg f13-mini" viewBox="0 0 220 172" role="img" aria-label="Normal akım–hacim eğrisinde bu adımın yeri">
            <line class="f13-eks" x1="30" x2="206" y1="146" y2="146"/><line class="f13-eks" x1="30" x2="30" y1="14" y2="146"/>
            <line class="f13-izg" x1="30" x2="206" y1="${mY(8)}" y2="${mY(8)}"/>
            <text class="f13-mtk" x="30" y="159" text-anchor="middle">0</text><text class="f13-mtk" x="${mX(5)}" y="159" text-anchor="middle">5</text>
            <text class="f13-mtk" x="25" y="150" text-anchor="end">0</text><text class="f13-mtk" x="25" y="${mY(8) + 4}" text-anchor="end">8</text>
            <text class="f13-mtk" x="118" y="170" text-anchor="middle">hacim (L)</text>
            <text class="f13-mtk" transform="translate(9 80) rotate(-90)" text-anchor="middle">akım (L/s)</text>
            <path data-n="m60" class="f13-egri f13-soluk" d="${mYol(F60)}" style="stroke:var(--accent)"/>
            <path class="f13-egri" d="${mYol(F100)}" style="stroke:var(--accent);stroke-width:2.4"/>
            <text data-n="m60T" class="f13-mtk f13-hl" x="${mX(0.25)}" y="${mY(6.53) + 27}">%60 efor</text>
            <circle data-n="mn" class="f13-mn" r="5.5"/>
          </svg>
          <dl class="f13-oku">
            <div><dt>PA (alveoler)</dt><dd data-y="pa"></dd></div>
            <div><dt>Ppl (intraplevral)</dt><dd data-y="ppl"></dd></div>
            <div><dt>PA − Ppl</dt><dd data-y="fark"></dd></div>
            <div><dt>Akım</dt><dd data-y="akim"></dd></div>
          </dl>
          <p class="f13-denk" data-y="denk" hidden></p>
        </div>
      </div>`;
    const n = dugumler(el), y = ciktilar(el), cap = capYaz(el);
    const PARC = Array.from({ length: 16 }, (_, i) => ({ s: -0.2 + (1.24 * i) / 16, o: (((i * 7) % 5) / 4 - 0.5) }));
    const pc = PARC.map(() => { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', '2.7'); n.parc.appendChild(c); return c; });
    let st = durum();
    const parcaYerles = () => {
      PARC.forEach((q, i) => {
        let x, yy;
        if (q.s < 0) { const f = -q.s / 0.2; x = CX + q.o * st.r * 0.9 * f; yy = S0 + st.r * 1.1 * f; }
        else { const s = Math.min(q.s, 1), w = genislik(s, st); x = CX + q.o * w * 0.5; yy = sy(s); }
        at(pc[i], { cx: x, cy: yy }); pc[i].style.opacity = q.s > 1 ? String(Math.max(0, 1 - (q.s - 1) / 0.04)) : '1';
      });
    };
    const oklar = () => {
      const len = 8 + Math.abs(st.Ppl) * 0.3, ic = st.Ppl > 0, sag = adim < 4;
      const ok = (x1, y1, x2, y2) => `<line class="f13-pok" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" marker-end="url(#f13-ok-dc)"/>`;
      let h = '';
      for (const s of [0.22, 0.45, 0.66]) {
        const w = genislik(s, st), yy = sy(s), xl = CX - w / 2 - 3, xr = CX + w / 2 + 3;
        h += ic ? ok(xl - len, yy, xl, yy) : ok(xl, yy, xl - len, yy);
        if (sag) h += ic ? ok(xr + len, yy, xr, yy) : ok(xr, yy, xr + len, yy);
      }
      const cy = S0 + st.r;
      for (const a of sag ? [180, 0, 225, 315] : [180, 225]) {
        const ux = Math.cos((a * Math.PI) / 180), uy = Math.sin((a * Math.PI) / 180), r0 = st.r + 3;
        const p0 = [CX + ux * r0, cy + uy * r0], p1 = [CX + ux * (r0 + len), cy + uy * (r0 + len)];
        h += ic ? ok(p1[0], p1[1], p0[0], p0[1]) : ok(p0[0], p0[1], p1[0], p1[1]);
      }
      n.oklar.innerHTML = h;
    };
    const ciz = () => {
      st = durum();
      const cy = S0 + st.r;
      at(n.alv, { cy, r: st.r });
      at(n.pa, { y: cy + 5 }); n.pa.textContent = `PA ${isaretli(st.PA)}`;
      n.ppl.textContent = `Ppl ${isaretli(st.Ppl)}`;
      const L = [], R = [];
      for (let i = 0; i <= 200; i++) { const s = i / 200, w = genislik(s, st), yy = sy(s); L.push([CX - w / 2, yy]); R.push([CX + w / 2, yy]); }
      n.solD.setAttribute('d', yol(L)); n.sagD.setAttribute('d', yol(R));
      n.lumen.setAttribute('d', yol([[CX - st.w / 2, S0 + 7], ...L, ...R.slice().reverse(), [CX + st.w / 2, S0 + 7]]) + 'Z');
      oklar();
      gor(n.parc, !RM); gor(n.akok, RM && st.akim > 0);
      if (RM) { at(n.akok, { d: `M${CX} ${sy(0.08)} L${CX} ${sy(0.97)}` }); n.akok.style.strokeWidth = String(1.6 + 1.6 * st.akim); }
      else parcaYerles();
      gor(n.etk, adim < 4); gor(n.prof, adim === 4);
      if (adim === 4) {
        const sE = st.sE;
        at(n.pr1, { y: sy(sE), height: sy(0) - sy(sE) }); at(n.pr2, { y: sy(0.85), height: sy(sE) - sy(0.85) }); at(n.pr3, { y: sy(1), height: sy(0.85) - sy(1) });
        at(n.ebn, { y1: sy(sE), y2: sy(sE) });
        at(n.ebnT, { y: sy(sE) + 4 }); n.ebnT.textContent = `EBN · P = Ppl (${isaretli(st.Ppl)})`;
        at(n.acT, { y: sy(sE / 2) + 4 }); at(n.skT, { y: sy((sE + 0.85) / 2) + 4 }); at(n.disT, { y: sy(0.925) + 4 });
      }
      // küçük grafik
      at(n.mn, { cx: mX(st.nokta[0]), cy: mY(st.nokta[1]) });
      gor(n.m60, adim === 4); gor(n.m60T, adim === 4);
      // okuma paneli
      y.pa.innerHTML = `${isaretli(st.PA)}<span>cmH₂O</span>`; y.ppl.innerHTML = `${isaretli(st.Ppl)}<span>cmH₂O</span>`;
      y.fark.innerHTML = `${isaretli(st.PA - st.Ppl)}<span>${adim === 1 ? 'akım yok (PA = ağız)' : adim === 4 ? '= Pel, akımı süren fark' : 'Pel'}</span>`;
      y.akim.innerHTML = `${st.akT[0]}<span>${st.akT[1]}</span>`;
      y.denk.hidden = adim !== 4;
      if (adim === 4) y.denk.textContent = `Akımı süren fark: PA − Ppl = Pel = ${st.Pel}`;
      y.ek.hidden = adim !== 4;
      basSec(el, 'adim', adim); basSec(el, 'efor', efor); basSec(el, 'hac', hac);
      el.querySelector('[data-git="-1"]').disabled = adim === 1; el.querySelector('[data-git="1"]').disabled = adim === 4;
      cap(capMetin(st));
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b) || b.disabled) return;
      if (b.dataset.adim) adim = +b.dataset.adim;
      else if (b.dataset.git) adim = clamp(adim + +b.dataset.git, 1, 4);
      else if (b.dataset.efor) efor = b.dataset.efor;
      else if (b.dataset.hac) hac = b.dataset.hac;
      else return;
      if (!b.dataset.efor && !b.dataset.hac && adim < 4) { efor = 'normal'; hac = 'yuk'; }
      ciz();
    });
    ciz();
    if (RM) return () => {};
    return ticker(el, (dt) => {
      if (st.akim <= 0) return;
      PARC.forEach((q) => {
        const f = q.s < 0 ? 0.6 : Math.min(2.4, st.w / genislik(Math.min(q.s, 1), st));
        q.s += dt * 0.3 * st.akim * f;
        if (q.s > 1.04) q.s -= 1.24;
      });
      parcaYerles();
    });
  };

  /* ---------- 5 · Akım–hacim halkası atlası ---------- */
  VIZ.f13_halka = (el) => {
    const H = {
      normal: { ad: 'Normal', kisa: 'Normal', tlc: 6, rv: 1, frc: 3, A: 9, k: 1, pif: 5, renk: 'var(--accent)', soft: 'var(--accent-soft)' },
      kucuk: { ad: 'Küçük hava yolu', kisa: 'Küçük HY', tlc: 6, rv: 2.6, A: 5, k: 3, pif: 4.5, renk: 'var(--crit)', soft: 'var(--crit-soft)' },
      restr: { ad: 'Restriktif', kisa: 'Restriktif', tlc: 3.6, rv: 0.8, frc: 1.8, A: 7, k: 1, pif: 4, renk: 'var(--c-basic)', soft: 'var(--c-basic-soft)' },
      sabit: { ad: 'Sabit üst', kisa: 'Sabit', tlc: 6, rv: 1, A: 9, k: 1, pif: 5, kE: 3, kI: 3, ust: true, renk: 'var(--crit)' },
      ekstra: { ad: 'Değişken ekstratorasik', kisa: 'Ekstratorasik', tlc: 6, rv: 1, A: 9, k: 1, pif: 5, kI: 2, ust: true, renk: 'var(--crit)' },
      intra: { ad: 'Değişken intratorasik', kisa: 'İntratorasik', tlc: 6, rv: 1, A: 9, k: 1, pif: 5, kE: 2.5, ust: true, renk: 'var(--crit)' },
    };
    const CAP = {
      normal: '<b>Normal halka.</b> Kayıt saat yönünde ilerler: TLC’den rezidüel hacme zorlu ekspirasyon (x ekseninin üstü), ardından en yüksek eforla TLC’ye inspirasyon (altı). İçteki küçük halka tidal solumadır; tidal ekspirasyonun bittiği nokta FRC’dir. [[K1 s. 60]]',
      kucuk: '<b>Ağır küçük hava yolu obstrüksiyonu.</b> Ekspiratuvar bölümde PEFR düşük ve inen kol belirgin konkav; hava hapsi rezidüel hacmi artırdığı için halkanın sağ ucu sola çekilmiştir. İnspiratuvar bölüm görece korunur. [[K1 s. 60]]',
      restr: '<b>Restriktif hastalık.</b> Vital kapasite belirgin küçük: TLC çok, rezidüel hacim orantısal olarak daha az azalmıştır; halka sağa kaymış ve FRC küçülmüştür. PEFR azalmış, inen kol normal görünümdedir. [[K1 s. 60]]',
      sabit: '<b>Sabit üst hava yolu obstrüksiyonu</b> (ör. trakeal stenoz, yabancı cisim). Daralma solunum döngüsü boyunca değişmez: tepe ekspiratuvar ve tepe inspiratuvar akım birlikte düşer, iki bölüm de düzleşir. Ek efor darlığı aşamaz, akım efordan bağımsızdır; akciğer hacimleri değişmez. Bu tip darlık bifazik stridor yapar. [[K1 s. 60, 62]]',
      ekstra: '<b>Değişken ekstratorasik obstrüksiyon</b> (ör. vokal kord paralizisi). İnspirasyonda trakeadaki basınç atmosferin altındadır (Paw &lt; PB) ve lezyonu içe çeker: inspiratuvar bölüm düzleşir. Ekspirasyonda Paw &gt; PB lezyonu dışa iter, ekspiratuvar bölüm etkilenmez. Ekstübasyon sonrası kısmi laringospazm böyledir; ses inspiratuvar stridordur. [[K1 s. 60–62]]',
      intra: '<b>Değişken intratorasik obstrüksiyon</b> (ör. tümör). İnspirasyonda negatif Ppl radyal çekimle hava yolunu açar (Paw &gt; Ppl), inspiratuvar bölüm etkilenmez. Zorlu ekspirasyonda pozitif Ppl dinamik kompresyon yapar, lezyon bunu ağırlaştırır (Paw &lt; Ppl): ekspiratuvar bölüm düzleşir ve akım efordan bağımsızdır. Ses ekspiratuvar stridordur. [[K1 s. 61–62]]',
    };
    const STR = { sabit: 'Bifazik stridor', ekstra: 'İnspiratuvar stridor', intra: 'Ekspiratuvar stridor' };
    const HACNOT = { normal: 'Tidal halka FRC’de biter; hacimler normal.', kucuk: 'Hava hapsi: RV artmış, vital kapasite küçülmüş.', restr: 'TLC çok, RV daha az azalmış; FRC küçük.' };
    const kirp = (f, L) => (f === 0 ? 0 : Math.sign(f) * Math.pow(Math.pow(Math.abs(f), -8) + Math.pow(L, -8), -1 / 8));
    const X = (V) => 40 + ((6.9 - V) * 364) / 6.6, Y = (f) => 22 + (9 - f) * (260 / 15);
    const vc = (d) => d.tlc - d.rv;
    const eks = (d, x) => { let f = AKF(x, 1, { vc: vc(d), A: d.A, k: d.k }); if (d.kE) f = kirp(f, d.kE); return f; };
    const ins = (d, x) => { let f = -d.pif * Math.pow(Math.max(0, Math.sin((Math.PI * x) / vc(d))), 0.6); if (d.kI) f = kirp(f, d.kI); return f; };
    const halkaYol = (d) => {
      const c = vc(d), p = [];
      for (let i = 0; i <= 220; i++) { const x = c * Math.pow(i / 220, 1.5); p.push([X(d.tlc - x), Y(eks(d, x))]); }
      for (let i = 220; i >= 0; i--) { const x = c * (i / 220); p.push([X(d.tlc - x), Y(ins(d, x))]); }
      return yol(p) + 'Z';
    };
    const noktaXY = (d, u) => { const c = vc(d); if (u < 0.5) { const x = c * (u / 0.5); return [X(d.tlc - x), Y(eks(d, x))]; } const x = c * (1 - (u - 0.5) / 0.5); return [X(d.tlc - x), Y(ins(d, x))]; };
    let dur = 'normal', oyn = false, u = 0.2, faz = 'eks';
    const izg = [8, 4, -4].map((f) => `<line class="f13-izg" x1="40" x2="404" y1="${Y(f)}" y2="${Y(f)}"/>`).join('');
    const yt = [8, 4, 0, -4].map((f) => `<text class="f13-tk" x="34" y="${Y(f) + 4}" text-anchor="end">${f < 0 ? '−' + -f : f}</text>`).join('');
    const SIRA = ['normal', 'kucuk', 'restr', 'sabit', 'ekstra', 'intra'];
    el.innerHTML = `
      <div class="f13-kont">
        <div class="seg" role="group" aria-label="Halka">${SIRA.map((k) => `<button type="button" data-durum="${k}" aria-pressed="${String(k === 'normal')}" aria-label="${H[k].ad}"><span class="f13-uzun">${H[k].ad}</span><span class="f13-kisa">${H[k].kisa}</span></button>`).join('')}</div>
        <div class="f13-dug">
          <button type="button" class="btn" data-izle>▶ Halkayı izle</button>
          ${segHtml('Faz', 'faz', [['eks', 'Ekspirasyon'], ['ins', 'İnspirasyon']], 'eks')}
        </div>
      </div>
      <div class="f13-iz">
        <svg class="f13-svg f13-g" viewBox="0 0 420 300" role="img" aria-label="Akım–hacim halkası: x ekseninde hacim (solda TLC), y ekseninde akım; ekspirasyon üstte, inspirasyon altta">
          <defs>${okTanim('f13-ok-h', 'f13-of-muted')}</defs>
          ${izg}
          <line class="f13-eks" x1="40" x2="40" y1="22" y2="282"/>
          <line class="f13-sifir" x1="40" x2="404" y1="${Y(0)}" y2="${Y(0)}"/>
          ${yt}
          <text class="f13-ax" transform="translate(13 152) rotate(-90)" text-anchor="middle">Akım (L/s)</text>
          <text class="f13-ax" x="222" y="297" text-anchor="middle">Hacim (TLC solda, RV sağda)</text>
          <text class="f13-ax f13-hl" x="378" y="40" text-anchor="end">Ekspirasyon</text>
          <line class="f13-yon" x1="383" x2="402" y1="36" y2="36" marker-end="url(#f13-ok-h)"/>
          <text class="f13-ax f13-hl" x="68" y="277">İnspirasyon</text>
          <line class="f13-yon" x1="63" x2="44" y1="273" y2="273" marker-end="url(#f13-ok-h)"/>
          <path data-n="ref" class="f13-ref"/>
          <path data-n="halka" class="f13-egri f13-halka"/>
          <ellipse data-n="tidal" class="f13-tidal"/>
          <circle data-n="frcN" r="3.6"/>
          <text data-n="frcT" class="f13-lb2 f13-hl">FRC</text>
          <text data-n="tlcR" class="f13-lb2 f13-m" text-anchor="end">TLC</text>
          <text data-n="rvR" class="f13-lb2 f13-m">RV</text>
          <text data-n="tlcT" class="f13-lb2 f13-hl" text-anchor="end">TLC</text>
          <text data-n="rvT" class="f13-lb2 f13-hl">RV</text>
          <circle data-n="nk" class="f13-nok" r="6"/>
        </svg>
        <div class="f13-panel f13-hy-p">
          <svg class="f13-svg f13-hy" viewBox="0 0 300 232" role="img" aria-label="Trakea, toraks girişi ve obstrüksiyon yapan lezyon; ya da akciğer hacimleri">
            <defs>${okTanim('f13-ok-hy', 'f13-of-crit')}</defs>
            <g data-n="gU">
              <rect class="f13-gogus f13-gogus-hy" x="10" y="108" width="280" height="118" rx="20"/>
              <text class="f13-ax" x="20" y="216">Ppl</text>
              <text class="f13-ax" x="20" y="30">PB</text>
              <text class="f13-ax f13-ink" x="286" y="26" text-anchor="end">ekstratorasik</text>
              <text class="f13-ax f13-ink" x="286" y="132" text-anchor="end">intratorasik</text>
              <text class="f13-htk" x="286" y="101" text-anchor="end">altıncı trakeal halka · toraks girişi</text>
              <path data-n="lumH" class="f13-lumen"/>
              <path data-n="solH" class="f13-duvar"/><path data-n="sagH" class="f13-duvar"/>
              <g data-n="kikH" class="f13-kik"></g>
              <line class="f13-giris" x1="30" x2="118" y1="108" y2="108"/>
              <path data-n="lez" class="f13-lez"/>
              <g data-n="hok"></g>
              <text data-n="pT" class="f13-lb2 f13-c" x="286" text-anchor="end"></text>
            </g>
            <g data-n="gV"></g>
          </svg>
          <p class="f13-faz" data-y="faz"></p>
          <p class="f13-rozet crit" data-y="str" hidden></p>
        </div>
      </div>`;
    const n = dugumler(el), y = ciktilar(el), cap = capYaz(el), izleB = el.querySelector('[data-izle]');
    // trakea duvarları: intratorasik kesim (y 128–206) radyal çekim / kompresyonla oynar
    const kayma = (dx, yy) => (dx ? dx * yum(clamp((yy - 124) / 14, 0, 1)) * yum(clamp((210 - yy) / 14, 0, 1)) : 0);
    const duvarlar = (dx) => {
      const L = [], R = [];
      for (let yy = 12; yy <= 226; yy += 2) { const g = kayma(dx, yy); L.push([56 - g, yy]); R.push([92 + g, yy]); }
      n.solH.setAttribute('d', yol(L)); n.sagH.setAttribute('d', yol(R));
      n.lumH.setAttribute('d', yol([...L, ...R.slice().reverse()]) + 'Z');
      let h = '';
      for (let yy = 16; yy < 224; yy += 13) { const g = kayma(dx, yy); h += `<line x1="${(50 - g).toFixed(1)}" x2="${(56 - g).toFixed(1)}" y1="${yy}" y2="${yy}"/><line x1="${(92 + g).toFixed(1)}" x2="${(98 + g).toFixed(1)}" y1="${yy}" y2="${yy}"/>`; }
      n.kikH.innerHTML = h;
    };
    // lezyon: f > 0 ekspirasyon, f < 0 inspirasyon (−1…1)
    const lezyon = (f) => {
      const d = H[dur];
      if (!d.ust) return;
      if (dur === 'sabit') { n.lez.setAttribute('d', 'M56 76 C68 80 68 98 56 102 Z M92 76 C80 80 80 98 92 102 Z'); return; }
      if (dur === 'ekstra') { const p = 9 - 6 * f; n.lez.setAttribute('d', `M92 42 C${92 - p * 1.25} 50 ${92 - p * 1.25} 76 92 84 Z`); return; }
      const dx = -3 * f, p = 9 + 6 * f; // intratorasik: ekspirasyonda içe (dx < 0), inspirasyonda dışa
      duvarlar(dx);
      n.lez.setAttribute('d', `M${92 + dx} 142 C${92 + dx - p * 1.25} 150 ${92 + dx - p * 1.25} 176 ${92 + dx} 184 Z`);
    };
    const hacimCubuk = () => {
      const yv = (V) => 206 - V * (186 / 6.5);
      const cubuk = (d, x, sol) => {
        const w = 44, ax = sol ? x - 6 : x + w + 6, an = sol ? 'end' : 'start';
        const et = (V, t) => `<text class="f13-lb2" x="${ax}" y="${(yv(V) + 4).toFixed(1)}" text-anchor="${an}" style="fill:${d.renk}">${t}</text>`;
        let h = `<rect class="f13-vrv" x="${x}" y="${yv(d.rv).toFixed(1)}" width="${w}" height="${(yv(0) - yv(d.rv)).toFixed(1)}" rx="3"/>`;
        h += `<rect x="${x}" y="${yv(d.tlc).toFixed(1)}" width="${w}" height="${(yv(d.rv) - yv(d.tlc)).toFixed(1)}" rx="3" style="fill:${d.soft};stroke:${d.renk};stroke-width:1.6"/>`;
        h += et(d.tlc, 'TLC') + et(d.rv, 'RV');
        if (d.frc) h += `<line class="f13-frcc" x1="${x - 3}" x2="${x + w + 3}" y1="${yv(d.frc).toFixed(1)}" y2="${yv(d.frc).toFixed(1)}" style="stroke:${d.renk}"/>` + et(d.frc, 'FRC');
        h += `<text class="f13-ax" x="${x + w / 2}" y="226" text-anchor="middle">${d === H.normal ? 'Normal' : d.kisa}</text>`;
        return h;
      };
      n.gV.innerHTML = `<line class="f13-izg" x1="30" x2="270" y1="${yv(0)}" y2="${yv(0)}"/>` + (dur === 'normal' ? cubuk(H.normal, 128, false) : cubuk(H.normal, 90, true) + cubuk(H[dur], 172, false));
    };
    const fazYaz = () => {
      const d = H[dur], ins_ = faz === 'ins', F = ins_ ? 'İnspirasyon' : 'Ekspirasyon';
      basSec(el, 'faz', faz);
      if (!d.ust) { y.faz.textContent = HACNOT[dur]; n.hok.innerHTML = ''; return; }
      let t = '', p = '', hok = '';
      const okH = (x1, yy, x2) => `<line class="f13-pok" x1="${x1}" x2="${x2}" y1="${yy}" y2="${yy}" marker-end="url(#f13-ok-hy)"/>`;
      if (dur === 'sabit') { t = 'daralma döngü boyunca aynı · efor aşamaz.'; p = 'sert darlık · değişmez'; n.pT.setAttribute('y', '82'); }
      else if (dur === 'ekstra') {
        t = ins_ ? 'Paw &lt; PB · lezyon içe çekilir, inspiratuvar akım sınırlanır.' : 'Paw &gt; PB · lezyon dışa itilir, akım etkilenmez.';
        p = ins_ ? 'Paw < PB · içe çekilir' : 'Paw > PB · dışa itilir'; n.pT.setAttribute('y', '67');
        hok = ins_ ? okH(116, 63, 100) : okH(100, 63, 116);
      } else {
        t = ins_ ? 'Ppl negatif · radyal çekim hava yolunu açar (Paw &gt; Ppl), akım etkilenmez.' : 'Ppl pozitif · dinamik kompresyon (Paw &lt; Ppl), lezyon bunu ağırlaştırır; ekspiratuvar akım sınırlanır.';
        p = ins_ ? 'Paw > Ppl · radyal çekim açar' : 'Paw < Ppl · kompresyon'; n.pT.setAttribute('y', '168');
        hok = ins_ ? okH(48, 163, 32) + okH(102, 163, 118) : okH(32, 163, 48) + okH(118, 163, 102);
      }
      n.pT.textContent = p; n.hok.innerHTML = hok;
      y.faz.innerHTML = `<b>${F}:</b> ${t}`;
    };
    const ciz = () => {
      const d = H[dur];
      n.halka.setAttribute('d', halkaYol(d)); n.halka.style.stroke = d.renk; n.halka.style.fill = d.renk;
      gor(n.ref, dur !== 'normal'); if (dur !== 'normal') n.ref.setAttribute('d', halkaYol(H.normal));
      const tid = !!d.frc;
      gor(n.tidal, tid); gor(n.frcN, tid); gor(n.frcT, tid);
      if (tid) {
        at(n.tidal, { cx: X(d.frc + 0.25), cy: Y(0), rx: X(d.frc) - X(d.frc + 0.25), ry: 0.6 * (260 / 15) }); n.tidal.style.stroke = d.renk;
        at(n.frcN, { cx: X(d.frc), cy: Y(0) }); n.frcN.style.fill = d.renk;
        at(n.frcT, { x: X(d.frc) + 6, y: Y(0) + 16 }); n.frcT.style.fill = d.renk;
      }
      at(n.tlcT, { x: X(d.tlc) - 5, y: Y(0) + 4 }); at(n.rvT, { x: X(d.rv) + 5, y: Y(0) + 4 });
      n.tlcT.style.fill = d.renk; n.rvT.style.fill = d.renk;
      const N = H.normal, refTlc = dur !== 'normal' && Math.abs(d.tlc - N.tlc) > 0.6, refRv = dur !== 'normal' && Math.abs(d.rv - N.rv) > 0.6;
      gor(n.tlcR, refTlc); gor(n.rvR, refRv);
      at(n.tlcR, { x: X(N.tlc) - 5, y: Y(0) + 4 }); at(n.rvR, { x: X(N.rv) + 5, y: Y(0) + 4 });
      gor(n.gU, !!d.ust); gor(n.gV, !d.ust);
      if (d.ust) { duvarlar(0); lezyon(faz === 'eks' ? 0.9 : -0.9); } else hacimCubuk();
      y.str.hidden = !d.ust; if (d.ust) y.str.textContent = STR[dur];
      fazYaz(); nokta();
      cap(CAP[dur]);
    };
    const nokta = () => { const [x, yy] = noktaXY(H[dur], u); at(n.nk, { cx: x, cy: yy }); n.nk.style.stroke = H[dur].renk; };
    const fazaGit = (f) => { faz = f; u = f === 'eks' ? 0.2 : 0.75; };
    const izleYaz = () => { izleB.textContent = oyn ? '❚❚ Durdur' : '▶ Halkayı izle'; izleB.setAttribute('aria-pressed', String(oyn)); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.dataset.durum) {
        dur = b.dataset.durum; basSec(el, 'durum', dur);
        if (!oyn) fazaGit(dur === 'ekstra' ? 'ins' : dur === 'intra' ? 'eks' : faz);
        ciz();
      } else if (b.dataset.faz) { oyn = false; izleYaz(); fazaGit(b.dataset.faz); ciz(); }
      else if (b.hasAttribute('data-izle')) {
        if (RM) { fazaGit(faz === 'eks' ? 'ins' : 'eks'); ciz(); return; }
        oyn = !oyn; izleYaz();
      }
    });
    ciz(); izleYaz();
    return ticker(el, (dt) => {
      if (!oyn) return;
      u = (u + dt / 4) % 1;
      const f = u < 0.5 ? 'eks' : 'ins';
      if (f !== faz) { faz = f; fazYaz(); }
      if (H[dur].ust) lezyon(Math.sin(2 * Math.PI * u));
      nokta();
    });
  };

  /* ---------- 6 · SFT haritası: neyi sınar, neden yapılır, ne ölçer? (durağan) ---------- */
  VIZ.f13_sft = (el) => {
    // statik hacim çubuğu: TLC 6 L = 150 birim (25 birim/L), taban y 155; 70 kg erkek değerleri [K1 s. 50]
    const yv = (L) => 155 - L * 25;
    const dilim = (a, b, cls) => `<rect class="${cls}" x="24" y="${yv(b)}" width="40" height="${yv(a) - yv(b)}"/>`;
    const ayrac = (x, y1, y2, cls) => `<path class="${cls}" d="M${x} ${y1} H${x + 5} V${y2} H${x}"/><line class="${cls}" x1="${x + 5}" x2="${x + 8}" y1="${(y1 + y2) / 2}" y2="${(y1 + y2) / 2}"/>`;
    const hacim = `
      <svg class="f13-sft-hac" viewBox="0 0 192 160" role="img" aria-label="Statik hacimler: VT, IRV, ERV, IC ve VC ölçülür; RV ile onu içeren FRC ve TLC ölçülemez">
        <defs><pattern id="f13-sft-tarama" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect class="f13-sft-tz" width="6" height="6"/><line class="f13-sft-tc" x1="0" x2="0" y1="0" y2="6"/></pattern></defs>
        <g transform="translate(12 0)">
        <rect x="24" y="${yv(1.5)}" width="40" height="${yv(0) - yv(1.5)}" fill="url(#f13-sft-tarama)"/>
        ${dilim(1.5, 3.0, 'f13-sft-dl')}${dilim(3.0, 3.5, 'f13-sft-dl')}${dilim(3.5, 6.0, 'f13-sft-dl')}
        <g class="f13-sft-ay">${[1.5, 3.0, 3.5].map((L) => `<line x1="24" x2="64" y1="${yv(L)}" y2="${yv(L)}"/>`).join('')}</g>
        <rect class="f13-sft-cr" x="24" y="${yv(6)}" width="40" height="150" rx="2"/>
        <text class="f13-sft-t" x="19" y="${(yv(0) + yv(1.5)) / 2 + 4}" text-anchor="end">RV</text>
        <text class="f13-sft-t" x="19" y="${(yv(1.5) + yv(3)) / 2 + 4}" text-anchor="end">ERV</text>
        <text class="f13-sft-t" x="19" y="${(yv(3) + yv(3.5)) / 2 + 4}" text-anchor="end">VT</text>
        <text class="f13-sft-t" x="19" y="${(yv(3.5) + yv(6)) / 2 + 4}" text-anchor="end">IRV</text>
        ${ayrac(70, yv(6) + 1.5, yv(1.5) - 1.5, 'f13-sft-ok')}
        <text class="f13-sft-e f13-ok" x="82" y="${(yv(6) + yv(1.5)) / 2 + 4}">VC ✓</text>
        ${ayrac(70, yv(1.5) + 1.5, yv(0) - 1, 'f13-sft-x')}
        <text class="f13-sft-e f13-c" x="82" y="${(yv(1.5) + yv(0)) / 2 + 4}">RV ✗</text>
        ${ayrac(118, yv(3) + 1, yv(0) - 1, 'f13-sft-x f13-sft-kes')}
        <text class="f13-sft-e f13-c" x="130" y="${(yv(3) + yv(0)) / 2 + 4}">FRC ✗</text>
        </g>
      </svg>`;
    const korukS = (() => {
      const L = [], R = [];
      for (let i = 0; i <= 8; i++) { const yy = 15 + i * 3.5, x = i % 2 ? 9 : 15; L.push(`${x} ${yy}`); R.push(`${56 - x} ${yy}`); }
      return `<svg viewBox="0 0 56 44" aria-hidden="true" class="f13-sft-ik bas"><path d="M15 15 H41"/><path d="M${L.join(' L')}"/><path d="M${R.join(' L')}"/><path d="M15 43 H41"/><path d="M28 12 V3 M24.5 6.5 L28 3 L31.5 6.5"/></svg>`;
    })();
    const boruS = `<svg viewBox="0 0 56 44" aria-hidden="true" class="f13-sft-ik acc"><rect x="2" y="13" width="52" height="18" rx="9"/><path d="M9 22 H19 M16 19 L19 22 L16 25 M23 22 H33 M30 19 L33 22 L30 25 M37 22 H47 M44 19 L47 22 L44 25"/></svg>`;
    const bant = (bas, cls, ic) => `<div class="f13-sft-bant"><p class="f13-sft-bb">${bas}</p><div class="${cls}">${ic}</div></div>`;
    const ok = '<div class="f13-sft-asg" aria-hidden="true">↓</div>';
    el.innerHTML = `
      <div class="f13-sft">
        ${bant('SFT neyi sınar?', 'f13-sft-a', ['Büyük ve küçük hava yolları', 'Alveoller', 'Pulmoner damar yatağı', 'Solunum kasları'].map((t) => `<div class="f13-sft-hap" data-k>${t}</div>`).join(''))}
        ${ok}
        ${bant('Neden yapılır?', 'f13-sft-b', `
          <div class="f13-sft-hap" data-k><b>Tanı</b><span>solunum sistemi hastalıkları</span></div>
          <div class="f13-sft-hap" data-k><b>Şiddet ve tedavi</b><span>şiddeti derecelendirir, farmakolojik tedaviye yön verir</span></div>
          <div class="f13-sft-hap klin" data-k><b>Cerrahi risk</b><span>özellikle toraks cerrahisi</span><button type="button" class="f13-sft-git" data-scroll="d13-rezeksiyon">rezeksiyon bölümü ↓</button></div>`)}
        ${ok}
        ${bant('Cihaz: spirometre', 'f13-sft-c', `
          <div class="f13-sft-kart bas" data-k>${korukS}<div><b class="f13-sft-kb">Hacim algılayan</b><span class="f13-sft-tn">ör. vitalograf · körük düzeneği</span></div></div>
          <div class="f13-sft-kart acc" data-k>${boruS}<div><b class="f13-sft-kb">Akım algılayan</b><span class="f13-sft-tn">ör. pnömotakograf · çok daha kolay taşınır</span></div></div>`)}
        ${ok}
        ${bant('Spirometri ne ölçer?', 'f13-sft-d', `
          <div class="f13-sft-dk bas" data-k>
            <b class="f13-sft-kb">Statik hacimler</b><span class="f13-sft-tn">önce tidal, sonra vital kapasite solukları</span>
            ${hacim}
            <p class="f13-sft-x1">RV, FRC ve TLC ✗ · RV hiç dışarı verilmez (Bölüm 12)</p>
            <p class="f13-sft-x2">ölçülür: VT, IRV, ERV, IC, VC</p>
          </div>
          <div class="f13-sft-dk acc" data-k>
            <b class="f13-sft-kb">Dinamik ölçümler</b><span class="f13-sft-tn">havanın akış hızına, yani birim zamandaki hacme bağlı</span>
            <ul class="f13-sft-lis"><li>FEV₁</li><li>FVC</li><li>PEFR</li><li>ekspiratuvar akım–hacim eğrisi</li><li>akım–hacim halkaları</li></ul>
            <span class="f13-sft-roz">bu bölümün konusu</span>
          </div>
          <div class="f13-sft-dk kes" data-k>
            <b class="f13-sft-kb">Özel testler</b><span class="f13-sft-tn">spirometre dışı yöntemler</span>
            <div class="f13-sft-sat"><b>Difüzyon kapasitesi</b><span>→ alveoler difüzyonun ölçüsü (Bölüm 10)</span></div>
            <div class="f13-sft-sat"><b>Gaz dilüsyonu · N₂ yıkama</b><span>→ FRC hesabı (Bölüm 12)</span></div>
          </div>`)}
        <p class="f13-not f13-sft-kay">${REF('Kaynak: [[K1 s. 56]] · hacimler [[K1 s. 50, 52]]')}</p>
      </div>`;
    // dokununca yalnız o kutu vurgulanır
    const tik = (e) => {
      if (e.target.closest('button, a')) return;
      const k = e.target.closest('[data-k]'); if (!k || !el.contains(k)) return;
      const on = !k.classList.contains('on');
      el.querySelectorAll('[data-k].on').forEach((x) => x.classList.remove('on'));
      k.classList.toggle('on', on);
    };
    el.addEventListener('click', tik);
    return () => el.removeEventListener('click', tik);
  };

  /* ---------- 7 · Rezeksiyon öncesi spirometri: iki basamak ---------- */
  VIZ.f13_rezeksiyon = (el) => {
    const AM = {
      lob: { ad: 'Lobektomi', e: 'lobektomiye', esik: 15 },
      pno: { ad: 'Pnömonektomi', e: 'pnömonektomiye', esik: 20 },
    };
    let am = 'lob', fev = 18, degisti = false; // FEV₁ desilitre cinsinden tamsayı (kayan nokta karşılaştırması yok)
    const X = (L) => 40 + (L - 0.5) * 190; // cetvel 0,5–3,5 L → x 40–610
    const L1 = (d) => fmt(d / 10, 1);
    const tikler = [];
    for (let d = 5; d <= 35; d += 5) {
      tikler.push(`<line class="f13-eks" x1="${X(d / 10)}" x2="${X(d / 10)}" y1="54" y2="${d % 10 ? 60 : 63}"/>`);
      if (d >= 10 && d !== 15 && d !== 20) tikler.push(`<text class="f13-rz-tk" x="${X(d / 10)}" y="82" text-anchor="middle">${L1(d)}</text>`);
    }
    el.innerHTML = `
      <div class="f13-kont">
        <div class="f13-grp"><span>Planlanan ameliyat</span>${segHtml('Planlanan ameliyat', 'am', [['lob', 'Lobektomi'], ['pno', 'Pnömonektomi']], 'lob')}</div>
        <label class="f13-rng f13-rng-ust"><span>Ölçülen FEV₁ <b data-y="fevT"></b></span><input type="range" min="0.8" max="3.5" step="0.1" value="1.8" data-r="fev" aria-label="Ölçülen FEV₁ (L)"></label>
      </div>
      <div class="f13-rz" data-y="rz">
        <svg class="f13-rz-cet" viewBox="0 0 640 116" role="img" data-n="svg">
          <rect data-n="sW" class="f13-rz-sw" y="51" height="6"/><rect data-n="sO" class="f13-rz-so" y="51" height="6"/>
          <line class="f13-rz-cz" x1="${X(0.5)}" x2="${X(3.5)}" y1="54" y2="54"/>
          ${tikler.join('')}
          <text class="f13-rz-ax" x="0" y="82">FEV₁ (L)</text>
          <line data-n="eL" class="f13-rz-es" x1="${X(1.5)}" x2="${X(1.5)}" y1="30" y2="96"/>
          <line data-n="eP" class="f13-rz-es" x1="${X(2.0)}" x2="${X(2.0)}" y1="30" y2="96"/>
          <text data-n="eLT" class="f13-rz-et" x="${X(1.5) - 6}" y="110" text-anchor="end">1,5 L · lobektomi</text>
          <text data-n="ePT" class="f13-rz-et" x="${X(2.0) + 6}" y="110">2,0 L · pnömonektomi</text>
          <g data-n="isr" class="f13-rz-isr">
            <path class="f13-rz-uc" d="M-10 30 L10 30 L0 48 Z"/>
            <text data-n="isrT" class="f13-rz-dg f13-hl" x="0" y="23" text-anchor="middle"></text>
          </g>
        </svg>
        <div class="f13-rz-k1"><span>1. basamak · basit zorlu spirometri</span><b data-y="soru"></b></div>
        <div class="f13-rz-dallar">
          <div class="f13-rz-dal evet">
            <i class="f13-rz-ray" aria-hidden="true"></i>
            <div class="f13-rz-bag" aria-hidden="true"><span>evet</span><i></i></div>
            <div class="f13-rz-uy f13-rz-hd"><b>Uygun</b><span data-y="uyT"></span></div>
          </div>
          <div class="f13-rz-dal hayir">
            <div class="f13-rz-bag" aria-hidden="true"><span>hayır</span><i></i></div>
            <div class="f13-rz-k2 f13-rz-hd">
              <p class="f13-rz-bas">2. basamak · ek ölçümler</p>
              <div class="f13-rz-kr">
                <div><b>ppoFEV₁ &lt; %30 beklenen</b><span class="c">postoperatif ventilasyon gereksinimi olasılığı ↑</span><span class="c">mortalite ↑</span></div>
                <div><b>ppoTLCO &lt; %40 beklenen</b><span class="m">postoperatif difüzyon kapasitesi tahmini</span><span class="c">morbidite ↑ · mortalite ↑</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    const n = dugumler(el), y = ciktilar(el), cap = capYaz(el), rng = el.querySelector('[data-r="fev"]');
    const capMetin = () => {
      const a = AM[am], uy = fev > a.esik, es = L1(a.esik);
      const bas = `<b>${a.ad}, FEV₁ ${L1(fev)} L.</b> `;
      if (uy) return bas + `${es} L’lik kaba eşiğin üstünde: basit zorlu spirometri hastayı ${a.e} uygun gösterir. [[K1 s. 61]]`;
      return bas + `${es} L’lik kaba eşiğin ${fev < a.esik ? 'altında' : 'üstünde değil'}: ek ölçümler gerekir. ppoFEV₁ beklenenin %30’undan azsa postoperatif ventilasyon gereksinimi olasılığı ve mortalite, ppoTLCO beklenenin %40’ından azsa morbidite ve mortalite artar. [[K1 s. 61]]`;
    };
    const ciz = () => {
      const a = AM[am], uy = fev > a.esik, xE = X(a.esik / 10), xF = X(fev / 10);
      at(n.sW, { x: X(0.5), width: xE - X(0.5) }); at(n.sO, { x: xE, width: X(3.5) - xE });
      n.eL.classList.toggle('on', am === 'lob'); n.eLT.classList.toggle('on', am === 'lob');
      n.eP.classList.toggle('on', am === 'pno'); n.ePT.classList.toggle('on', am === 'pno');
      n.isr.style.transform = `translateX(${xF.toFixed(1)}px)`;
      // değer etiketi cetvelin dışına taşmasın
      at(n.isrT, { x: clamp(xF, 34, 606) - xF }); n.isrT.textContent = `${L1(fev)} L`;
      n.svg.setAttribute('aria-label', `FEV₁ ${L1(fev)} L, ${a.ad.toLocaleLowerCase('tr')} eşiği ${L1(a.esik)} L: ${uy ? 'uygun' : '2. basamak, ek ölçümler gerekir'}`);
      y.soru.innerHTML = `FEV₁ &gt; ${L1(a.esik)} L ?`;
      y.uyT.textContent = a.e;
      y.fevT.textContent = `${L1(fev)} L`;
      y.rz.classList.toggle('uygun', uy); y.rz.classList.toggle('ek', !uy);
      basSec(el, 'am', am);
      if (degisti) cap(capMetin());
    };
    const tik = (e) => {
      const b = e.target.closest('button[data-am]'); if (!b || !el.contains(b)) return;
      am = b.dataset.am; degisti = true; ciz();
    };
    const kay = (e) => { if (e.target !== rng) return; fev = Math.round(+rng.value * 10); degisti = true; ciz(); };
    el.addEventListener('click', tik); el.addEventListener('input', kay);
    ciz();
    return () => { el.removeEventListener('click', tik); el.removeEventListener('input', kay); };
  };
})();
