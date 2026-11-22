/* Fizyoloji Bölüm 08 · Oksijen taşınması · bileşenler.
   Modeller eğitim amaçlıdır; sayısal değerler K1 Bölüm 8'den, eğri biçimi Hill denklemiyle yaklaştırılmıştır. */
(function () {
  'use strict';
  const { ticker, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',');
  const lerp = (a, b, f) => a + (b - a) * f;
  const NH = 2.7, P50N = 3.5;                      // Hill üssü ve normal P50 (kPa) · K1 Şekil 8.2
  const sat = (p, p50 = P50N) => (100 * Math.pow(Math.max(p, 0), NH)) / (Math.pow(Math.max(p, 0), NH) + Math.pow(p50, NH));
  const mmhg = (kpa) => kpa * 7.50062;
  const HUFNER = 1.34, COZ = 0.023;                // mL/g ve mL·dL⁻¹·kPa⁻¹ · K1 s. 30
  const icerik = (hb, s, p) => HUFNER * hb * (s / 100) + COZ * p;

  /* ---------- 1 · oksijen içeriği denklemi ---------- */
  VIZ.f08_icerik = (el) => {
    const PRE = { art: [15, 13], ven: [15, 5.3], anemi: [7.5, 13] };
    const X0 = 16, X1 = 384, VMAX = 28;
    const SX = (v) => X0 + (clamp(v, 0, VMAX) / VMAX) * (X1 - X0);
    const tick = (v) => `<line x1="${SX(v)}" x2="${SX(v)}" y1="112" y2="118" stroke="var(--line)" stroke-width="1.5"/><text x="${SX(v)}" y="134" text-anchor="middle" class="f08-tk">${v}</text>`;
    el.innerHTML = `<div class="viz-head"><h3>Oksijen içeriği: Hb'ye bağlı + çözünmüş</h3>
      <div class="seg" role="group" aria-label="Örnek kan"><button type="button" data-pre="art" aria-pressed="true">Arteriyel</button><button type="button" data-pre="ven" aria-pressed="false">Venöz</button><button type="button" data-pre="anemi" aria-pressed="false">Anemi</button></div></div>
      <div class="f08-ic">
        <div class="f08-ctl">
          <label class="f08-sl"><span>Hemoglobin: <b data-o="hb"></b> g/dL</span><input type="range" min="4" max="20" step="0.5" value="15" data-s="hb" aria-label="Hemoglobin konsantrasyonu"></label>
          <label class="f08-sl"><span>Kan PO₂: <b data-o="po2"></b> kPa</span><input type="range" min="1" max="16" step="0.1" value="13" data-s="po2" aria-label="Kanın oksijen parsiyel basıncı"></label>
          <dl class="f08-oku">
            <div><dt>SaO₂ (eğriden)</dt><dd data-o="sat"></dd></div>
            <div><dt>Hb'ye bağlı</dt><dd data-o="bag"></dd></div>
            <div><dt>Çözünmüş</dt><dd data-o="coz"></dd></div>
            <div><dt>Toplam içerik</dt><dd data-o="tot"></dd></div>
          </dl>
        </div>
        <svg class="f08-barsvg" viewBox="0 0 400 160" role="img" aria-label="Kanın oksijen içeriği: hemoglobine bağlı bölüm ve plazmada çözünmüş bölüm">
          <text x="${X0}" y="18" class="f08-lb">mL O₂ / 100 mL kan</text>
          <rect x="${X0}" y="60" width="${X1 - X0}" height="48" rx="8" fill="var(--chip)"/>
          <rect class="b-bag" y="60" height="48" rx="8" fill="var(--crit)"/>
          <rect class="b-coz" y="60" height="48" fill="var(--c-basic)"/>
          <line class="b-ref" y1="52" y2="116" stroke="var(--ink)" stroke-width="2" stroke-dasharray="4 3"/>
          <text class="b-refl f08-tk" y="44" text-anchor="middle">arteriyel 19,8</text>
          <text class="b-val f08-val" y="92"></text>
          <line class="b-lead" stroke="var(--c-basic)" stroke-width="1.5"/>
          <text class="b-cozl f08-tk" y="152" fill="var(--c-basic)"></text>
          ${[0, 4, 8, 12, 16, 20, 24, 28].map(tick).join('')}
        </svg>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('İçerik = (1,34 × [Hb] × SaO₂/%100) + 0,023 × PO₂ (mL/100 mL; kPa). Hüfner sabiti, çözünürlük katsayısı ve örnek değerler kitaptandır [[K1 s. 30]]. SaO₂ burada PO₂\'den Hill denklemiyle (n = 2,7; P50 = 3,5 kPa) hesaplanır: bu şematik bir yaklaştırmadır, kitabın arteriyel (%97) ve venöz (%75) değerlerini verir [[K1 s. 30]].')}</p>`;
    const q = (s) => el.querySelector(s), oku = {};
    el.querySelectorAll('[data-o]').forEach((n) => { oku[n.dataset.o] = n; });
    let hb = 15, po2 = 13, lastCap = '';
    const ciz = () => {
      const s = sat(po2), bag = HUFNER * hb * (s / 100), coz = COZ * po2, tot = bag + coz;
      oku.hb.textContent = fmt(hb, hb % 1 ? 1 : 0); oku.po2.textContent = fmt(po2);
      oku.sat.textContent = '%' + fmt(s, 1);
      oku.bag.textContent = fmt(bag, 2) + ' mL';
      oku.coz.textContent = fmt(coz, 2) + ' mL (%' + fmt((coz / tot) * 100, 1) + ')';
      oku.tot.textContent = fmt(tot, 1) + ' mL';
      const xb = SX(bag), xt = SX(tot);
      q('.b-bag').setAttribute('x', X0); q('.b-bag').setAttribute('width', Math.max(2, xb - X0));
      q('.b-coz').setAttribute('x', xb); q('.b-coz').setAttribute('width', Math.max(2.5, xt - xb));
      q('.b-ref').setAttribute('x1', SX(19.8)); q('.b-ref').setAttribute('x2', SX(19.8));
      q('.b-refl').setAttribute('x', SX(19.8));
      const vb = q('.b-val');
      vb.setAttribute('x', xb - X0 > 112 ? X0 + 12 : xt + 10);
      vb.setAttribute('fill', xb - X0 > 112 ? 'var(--on-accent)' : 'var(--ink)');
      vb.textContent = fmt(tot, 1) + ' mL';
      q('.b-lead').setAttribute('x1', xt); q('.b-lead').setAttribute('y1', 108);
      q('.b-lead').setAttribute('x2', xt); q('.b-lead').setAttribute('y2', 142);
      const cl = q('.b-cozl');
      cl.setAttribute('x', clamp(xt, X0 + 60, X1 - 60)); cl.setAttribute('text-anchor', 'middle');
      cl.textContent = 'çözünmüş ' + fmt(coz, 2) + ' mL';
      let c;
      if (hb < 11) c = '<b>Anemi.</b> SaO₂ normal olsa bile içerik Hb ile neredeyse doğru orantılı düşer: hemoglobine bağlı bölüm oksijenin neredeyse tamamını taşıdığı için taşıma kapasitesini belirleyen esas olarak Hb konsantrasyonudur. [[K1 s. 30]]';
      else if (po2 >= 11) c = '<b>Arteriyel kan.</b> Kitabın örneği: [Hb] 15 g/dL, SaO₂ %97, PO₂ 13,0 kPa → CaO₂ ≈ 19,8 mL/100 mL. Bunun yalnızca 0,30 mL\'si plazmada çözünmüştür. [[K1 s. 30]]';
      else if (po2 < 4.5) c = '<b>Çok düşük PO₂.</b> Eğrinin dik bölümündesiniz: PO₂\'deki küçük bir azalma SaO₂\'yi ve dolayısıyla içeriği belirgin biçimde düşürür. [[K1 s. 32]]';
      else if (po2 <= 6.5) c = '<b>Venöz kan.</b> Kitabın örneği: SaO₂ %75, PO₂ 5,3 kPa → CvO₂ ≈ 15,2 mL/100 mL. Arteriyel ile fark ≈ 4,6 mL/100 mL: dokulara bırakılan oksijen budur. [[K1 s. 30]]';
      else c = '<b>Ara değerler.</b> PO₂ düştükçe eğrinin dik bölümüne yaklaşılır; orada PO₂\'deki küçük değişiklikler SaO₂\'yi ve dolayısıyla içeriği belirgin biçimde değiştirir. [[K1 s. 32]]';
      c += ' Çözünmüş bölüm çubukta neredeyse görünmez; yine de kanın PO₂\'sini belirleyen ve difüzyonu sürdüren odur. [[K1 s. 30]]';
      if (c !== lastCap) { q('.viz-cap').innerHTML = REF(c); lastCap = c; }
    };
    const pre = (k) => {
      [hb, po2] = PRE[k];
      el.querySelector('[data-s="hb"]').value = hb; el.querySelector('[data-s="po2"]').value = po2;
      el.querySelectorAll('[data-pre]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.pre === k)));
      ciz();
    };
    el.addEventListener('input', (e) => {
      const s = e.target.closest('[data-s]'); if (!s) return;
      if (s.dataset.s === 'hb') hb = +s.value; else po2 = +s.value;
      el.querySelectorAll('[data-pre]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      ciz();
    });
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-pre]'); if (b) pre(b.dataset.pre); });
    pre('art');
    return () => {};
  };

  /* ---------- 2 · oksijen depoları ve apne ---------- */
  VIZ.f08_depo = (el) => {
    const DEPO = [['Kan (plazma + Hb)', 850, 'kan'], ['Kas (miyoglobin)', 250, 'kas'], ['Akciğer (FRK içinde, hava solurken)', 450, 'akc']];
    const TOP = 1550, HIZ = 20;                    // simülasyon gerçek zamanın 20 katı
    const SEN = {
      normal: { ad: 'Normal erişkin', tuk: 250, kanK: 1 },
      cocuk: { ad: 'Tüketim artmış', tuk: 500, kanK: 1 },
      anemi: { ad: 'Kapasite azalmış', tuk: 250, kanK: 0.5 },
    };
    el.innerHTML = `<div class="viz-head"><h3>Depolar tüketimin yanında ne kadar küçük?</h3>
      <div class="seg" role="group" aria-label="Senaryo">${Object.entries(SEN).map(([k, s], i) => `<button type="button" data-sen="${k}" aria-pressed="${i === 0}">${s.ad}</button>`).join('')}</div></div>
      <div class="f08-depo">
        <div class="f08-bar3" aria-hidden="true">${DEPO.map(([, , c]) => `<i class="f08-s3 ${c}" data-c="${c}"></i>`).join('')}<span class="f08-dk"></span></div>
        <ul class="f08-dliste">${DEPO.map(([ad, , c]) => `<li><i class="${c}"></i><span>${ad}</span><b data-d="${c}"></b></li>`).join('')}</ul>
        <div class="f08-dmeter">
          <div><span>Apne süresi</span><b data-m="t">00:00</b></div>
          <div><span>Tüketilen O₂</span><b data-m="tuk">0 mL</b></div>
          <div><span>Kalan depo</span><b data-m="kal"></b></div>
        </div>
        <div class="btn-row"><button type="button" class="btn play">Apne başlat</button><button type="button" class="btn ghost" data-a="sif">Sıfırla</button></div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Depo hacimleri ve istirahat tüketimi (250 mL/dk) kitaptandır (deniz düzeyinde 70 kg\'lık erişkin): 5 L kanda ≈850 mL, miyoglobine bağlı 250 mL, hava solurken akciğerlerde 450 mL; toplam ≈1550 mL [[K1 s. 30]]. Model şematiktir: depolar gerçekte eş hızda boşalmaz; ayrıca depoların tamamı çekilemez (kitap dışı bilgi), bu yüzden anlamlı hücresel hipoksi çubuk bitmeden başlar. Kitabın vurgusu, apnenin birkaç dakikada hücresel hipoksiye yol açtığıdır [[K1 s. 30]]. Zaman 20 kat hızlandırılmıştır; "tüketim artmış" ve "kapasite azalmış" senaryolarındaki katsayılar (×2 tüketim, kan deposunun yarısı) örnek amaçlı seçilmiştir.')}</p>`;
    const q = (s) => el.querySelector(s);
    const segs = {}, lis = {}, mt = {};
    el.querySelectorAll('[data-c]').forEach((n) => { segs[n.dataset.c] = n; });
    el.querySelectorAll('[data-d]').forEach((n) => { lis[n.dataset.d] = n; });
    el.querySelectorAll('[data-m]').forEach((n) => { mt[n.dataset.m] = n; });
    let sen = 'normal', t = 0, run = false, lastCap = '';
    const bas = () => DEPO.map(([, v, c]) => (c === 'kan' ? v * SEN[sen].kanK : v));
    const ciz = () => {
      const b = bas(), top0 = b.reduce((a, v) => a + v, 0);
      const kullanilan = Math.min(top0, (SEN[sen].tuk * t) / 60);
      const f = top0 ? 1 - kullanilan / top0 : 0;
      DEPO.forEach(([ad, , c], i) => {
        const kalan = b[i] * f;
        segs[c].style.width = ((kalan / TOP) * 100).toFixed(2) + '%';
        lis[c].textContent = Math.round(kalan) + ' mL';
      });
      const dk = SEN[sen].tuk;
      q('.f08-dk').innerHTML = Array.from({ length: Math.floor(top0 / dk) }, (_, i) => [i + 1, (top0 - (i + 1) * dk) / TOP])
        .filter(([, o]) => o >= 0.05).map(([n, o]) => `<i style="left:${o * 100}%"><span>${n} dk</span></i>`).join('');
      mt.t.textContent = String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(Math.floor(t % 60)).padStart(2, '0');
      mt.tuk.textContent = Math.round(kullanilan) + ' mL';
      mt.kal.textContent = Math.round(top0 - kullanilan) + ' mL';
      let c;
      if (!run && t === 0) c = '<b>Apne öncesi.</b> Toplam depo yaklaşık 1550 mL O₂: kanda ≈850 mL, miyoglobinde 250 mL, akciğerlerde (FRK içinde, hava solurken) 450 mL. İstirahat tüketimi 250 mL/dk. [[K1 s. 30]]'
        + (sen === 'cocuk' ? ' Bu senaryoda tüketim iki katına (500 mL/dk) çıkarılmıştır.' : sen === 'anemi' ? ' Bu senaryoda kan deposu yarıya (≈425 mL; toplam ≈1125 mL) indirilmiştir.' : '');
      else if (f <= 0) c = '<b>Depo bitti.</b> Gerçekte doku PO₂\'si çubuk tükenmeden çok önce kritik düzeye iner (kitap dışı bilgi); kitabın vurgusu, vücutta çok az O₂ depolandığı için apnenin birkaç dakikada anlamlı hücresel hipoksiye yol açtığıdır. [[K1 s. 30]]';
      else if (f < 0.45) c = sen === 'anemi'
        ? '<b>Kapasite azalmış.</b> Anemi ya da karbonmonoksit zehirlenmesinde kan deposu küçüktür; aynı tüketimle hipoksik hasar daha hızlı gelişir. [[K1 s. 30]]'
        : sen === 'cocuk'
          ? '<b>Tüketim artmış.</b> O₂ tüketim hızı yüksekse (ör. çocuklarda) depolar daha çabuk tükenir. [[K1 s. 30]]'
          : '<b>Depoların büyük bölümü gitti.</b> Hipoksiye giden süre birkaç dakikadır; depo ne kadar küçükse o kadar kısa. [[K1 s. 30]]';
      else c = '<b>Apne sürüyor.</b> Her dakika O₂ tüketimi kadar (' + dk + ' mL) depo eksilir; çizgiler her dakikanın sonunda kalan depoyu gösterir. [[K1 s. 30]]';
      if (c !== lastCap) { q('.viz-cap').innerHTML = REF(c); lastCap = c; }
    };
    const play = q('.play');
    el.addEventListener('click', (e) => {
      const s = e.target.closest('[data-sen]');
      if (s) { sen = s.dataset.sen; t = 0; run = false; play.textContent = 'Apne başlat'; el.querySelectorAll('[data-sen]').forEach((b) => b.setAttribute('aria-pressed', String(b === s))); ciz(); return; }
      if (e.target.closest('.play')) { run = !run; play.textContent = run ? 'Duraklat' : 'Sürdür'; return; }
      if (e.target.closest('[data-a="sif"]')) { t = 0; run = false; play.textContent = 'Apne başlat'; ciz(); }
    });
    if (RM) { t = 240; ciz(); } else ciz();
    return ticker(el, (dt) => { if (!run) return; const top0 = bas().reduce((a, v) => a + v, 0); t = Math.min(t + dt * HIZ, (top0 / SEN[sen].tuk) * 60); if (t >= (top0 / SEN[sen].tuk) * 60) run = false; ciz(); });
  };

  /* ---------- 3 · kooperatif bağlanma ---------- */
  VIZ.f08_koop = (el) => {
    const KOLAY = ['ilk molekül: güç bağlanır', 'ikinci: daha kolay', 'üçüncü: daha da kolay', 'dördüncü: birinciden ≈300 kat kolay'];
    const ALT = [[132, 182], [268, 182]], UST = [[132, 78], [268, 78]];
    el.innerHTML = `<div class="viz-head"><h3>Kooperatif bağlanma: gergin → gevşemiş</h3>
      <div class="btn-row"><button type="button" class="btn" data-a="ekle">O₂ bağla</button><button type="button" class="btn ghost" data-a="dpg" aria-pressed="false">2,3-DPG ekle</button><button type="button" class="btn ghost" data-a="sif">Baştan</button></div></div>
      <svg class="f08-koop" viewBox="0 0 400 292" role="img" aria-label="Hemoglobinin dört globin alt birimine sırayla oksijen bağlanması; gergin ve gevşemiş konformasyon">
        <text x="200" y="20" text-anchor="middle" class="f08-kkon">gergin konformasyon</text>
        <g class="k-sub">${[...UST, ...ALT].map((p, i) => `<g class="k-u" data-i="${i}">
          <rect x="${p[0] - 50}" y="${p[1] - 34}" width="100" height="68" rx="16"/>
          <text x="${p[0]}" y="${p[1] - 14}" text-anchor="middle" class="k-ad">${i < 2 ? 'α' : 'β'}</text>
          <circle cx="${p[0]}" cy="${p[1] + 11}" r="15" class="k-hem"/>
          <text x="${p[0]}" y="${p[1] + 16}" text-anchor="middle" class="k-fe">Fe²⁺</text>
          <circle class="k-o2" cx="${p[0]}" cy="${p[1] - 44}" r="11"/>
          <text class="k-o2t" x="${p[0]}" y="${p[1] - 40}" text-anchor="middle">O₂</text>
        </g>`).join('')}</g>
        <g class="k-dpg"><rect x="166" y="226" width="68" height="26" rx="8"/><text x="200" y="244" text-anchor="middle">2,3-DPG</text></g>
        <text class="k-not" x="200" y="278" text-anchor="middle"></text>
      </svg>
      <div class="f08-kbar"><span>Bağlanan O₂</span><span class="f08-kdot">${[0, 1, 2, 3].map((i) => `<i data-k="${i}"></i>`).join('')}</span><b class="k-sayi">0 / 4</b></div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik çizim: alt birimlerin konumu ve β zincirlerinin yaklaşması simgesel, gerçek üç boyutlu yapı değildir. Kooperativite, konformasyon adları, dördüncü molekülün ≈300 kat daha kolay bağlanması ve 2,3-DPG\'nin deoksihemoglobinin β zincirlerine bağlanması kitaptandır [[K1 s. 31–33]]. Kooperatif bağlanmanın moleküler mekanizması kitapta da tartışmalı olarak verilir [[K1 s. 32]].')}</p>`;
    const q = (s) => el.querySelector(s);
    const us = [...el.querySelectorAll('.k-u')], dots = [...el.querySelectorAll('.f08-kdot i')];
    let n = 0, dpg = false, hedef = 0, yak = 0, lastCap = '';
    const ciz = () => {
      const f = yak;                              // 0 = gergin (β uzak), 1 = gevşemiş (β yakın)
      us.forEach((g, i) => {
        const bagli = i < n;
        const dx = i >= 2 ? (i === 2 ? 1 : -1) * 16 * f : 0;
        g.setAttribute('transform', `translate(${dx},0)`);
        g.classList.toggle('on', bagli);
        g.querySelector('.k-o2').setAttribute('opacity', bagli ? 1 : 0);
        g.querySelector('.k-o2t').setAttribute('opacity', bagli ? 1 : 0);
      });
      dots.forEach((d, i) => d.classList.toggle('on', i < n));
      q('.k-sayi').textContent = n + ' / 4';
      q('.f08-kkon').textContent = n === 0 ? 'gergin konformasyon · deoksihemoglobin' : n === 4 ? 'gevşemiş konformasyon · oksihemoglobin' : 'konformasyon değişiyor';
      q('.k-dpg').setAttribute('opacity', dpg && n === 0 ? 1 : 0);
      q('.k-not').textContent = n === 0 ? (dpg ? '2,3-DPG β zincirlerine bağlı: gergin yapı kararlı' : 'β zincirleri birbirinden uzak') : n === 4 ? 'β zincirleri yakın: afinite en yüksek' : KOLAY[n - 1];
      let c;
      if (n === 0 && dpg) c = '<b>2,3-DPG bağlı.</b> 2,3-DPG özgül olarak deoksihemoglobinin β zincirlerine bağlanır ve bu yapıyı kararlı kılar: Hb\'nin O₂ bağlama afinitesi azalır, yani eğri sağa kayar. Anaerobik metabolizma arttıkça 2,3-DPG de artar ve hücrelere ek O₂ bırakılır. [[K1 s. 32–33]] Atlas notu: 2,3-DPG eritrositin kendi glikolizinde yapılır ve düzeyi saatler içinde değişir (Kaymalar bölümündeki not).';
      else if (n === 0) c = '<b>Deoksihemoglobin.</b> Hiçbir hem grubuna O₂ bağlı değil; β zincirlerinin uzak olduğu bu yapı "gergin" konformasyondur. İlk molekülün bağlanabilmesi için güçlü elektrostatik yüklerin aşılması gerekir. [[K1 s. 32]]';
      else if (n === 4) c = '<b>Oksihemoglobin.</b> Dört hem grubunun hepsi doludur (Hb molekülü başına dört O₂) ve molekül "gevşemiş" konformasyondadır. Kooperativite nedeniyle Hb pratikte ya tam satüre ya da tam desatüredir; eğrinin sigmoid biçimi buradan gelir. [[K1 s. 31–32]]';
      else c = '<b>' + n + '. molekül bağlandı (' + KOLAY[n - 1] + ').</b> Bağlanan her O₂, molekülün konformasyonunu değiştirip bir sonrakinin afinitesini artırır; β zincirleri birbirine yaklaşır. Dördüncü molekül birinciden yaklaşık 300 kat daha kolay bağlanır. [[K1 s. 32]]';
      if (c !== lastCap) { q('.viz-cap').innerHTML = REF(c); lastCap = c; }
    };
    el.addEventListener('click', (e) => {
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'ekle') { if (dpg && n === 0) dpg = false; n = (n + 1) % 5; hedef = n / 4; }
      if (a.dataset.a === 'dpg') { dpg = !dpg; if (dpg) { n = 0; hedef = 0; } }
      if (a.dataset.a === 'sif') { n = 0; hedef = 0; dpg = false; }
      el.querySelector('[data-a="dpg"]').setAttribute('aria-pressed', String(dpg));
      el.querySelector('[data-a="dpg"]').textContent = dpg ? '2,3-DPG çıkar' : '2,3-DPG ekle';
      if (RM) yak = hedef;
      ciz();
    });
    ciz();
    return ticker(el, (dt) => { if (Math.abs(yak - hedef) < 0.002) return; yak = lerp(yak, hedef, 1 - Math.exp(-dt / 0.22)); ciz(); });
  };

  /* ---------- 4 · oksihemoglobin dissosiyasyon eğrisi ---------- */
  VIZ.f08_egri = (el) => {
    const SAG = ['PCO₂ ↑', 'Asidoz', '2,3-DPG ↑', 'Egzersiz', 'Sıcaklık ↑', 'HbS'];
    const SOL = ['PCO₂ ↓', 'Alkaloz', '2,3-DPG ↓', 'Hipotermi', 'COHb', 'MetHb', 'HbF'];
    const X0 = 50, X1 = 384, Y0 = 244, Y1 = 26, PMAX = 16, MYO = 0.4;
    const X = (p) => X0 + (clamp(p, 0, PMAX) / PMAX) * (X1 - X0), Y = (s) => Y0 - (clamp(s, 0, 100) / 100) * (Y0 - Y1);
    const yol = (f) => { let d = ''; for (let p = 0; p <= PMAX + 0.001; p += 0.25) d += (p ? 'L' : 'M') + X(p).toFixed(1) + ',' + Y(f(p)).toFixed(1); return d; };
    el.innerHTML = `<div class="viz-head"><h3>Eğriyi kaydıran etkenler</h3>
      <div class="btn-row"><button type="button" class="btn ghost" data-t="myo" aria-pressed="false">Miyoglobin eğrisi</button><button type="button" class="btn ghost" data-t="bolge" aria-pressed="false">Düz ve dik bölüm</button><button type="button" class="btn ghost" data-a="sif">Sıfırla</button></div></div>
      <svg class="f08-egrisvg" viewBox="0 0 400 300" role="img" aria-label="Oksihemoglobin dissosiyasyon eğrisi, kaymalar ve miyoglobin eğrisi">
        <g class="e-bolge" opacity="0"><rect x="${X(9)}" y="${Y(100)}" width="${X(PMAX) - X(9)}" height="${Y(94) - Y(100)}" fill="var(--c-basic-soft)"/><rect x="${X(2)}" y="${Y(90)}" width="${X(7) - X(2)}" height="${Y(20) - Y(90)}" fill="var(--crit-soft)"/>
          <text x="${X(12.5)}" y="${Y(88)}" text-anchor="middle" class="f08-tk" fill="var(--c-basic)">düz üst bölüm</text>
          <text x="${X(4.5)}" y="${Y(14)}" text-anchor="middle" class="f08-tk" fill="var(--crit)">dik orta bölüm</text></g>
        ${[0, 2, 4, 6, 8, 10, 12, 14, 16].map((p) => `<line x1="${X(p)}" x2="${X(p)}" y1="${Y1}" y2="${Y0}" class="e-gr"/><text x="${X(p)}" y="${Y0 + 18}" text-anchor="middle" class="f08-tk">${p}</text>`).join('')}
        ${[0, 25, 50, 75, 100].map((s) => `<line x1="${X0}" x2="${X1}" y1="${Y(s)}" y2="${Y(s)}" class="e-gr"/><text x="${X0 - 8}" y="${Y(s) + 5}" text-anchor="end" class="f08-tk">${s}</text>`).join('')}
        <line x1="${X0}" x2="${X1}" y1="${Y0}" y2="${Y0}" class="e-ax"/><line x1="${X0}" x2="${X0}" y1="${Y0}" y2="${Y1}" class="e-ax"/>
        <text x="${X1}" y="${Y0 + 36}" text-anchor="end" class="f08-lb">PO₂ · kPa</text>
        <text x="${X0 - 42}" y="${Y1 - 10}" class="f08-lb">SaO₂ %</text>
        <path class="e-ghost" d=""/><path class="e-myo" d="" opacity="0"/><path class="e-cv" d=""/>
        <g class="e-p50"><line class="e-dash" x1="${X0}" y1="${Y(50)}" y2="${Y(50)}"/><line class="e-dash" y1="${Y(50)}" y2="${Y0}"/><circle r="5.5" class="e-pt"/><text class="e-p50t" y="${Y(50) + 22}" text-anchor="end"></text></g>
        ${[['ven', 5.3], ['art', 13.3]].map(([k, p]) => `<g class="e-m" data-k="${k}"><line class="e-dash" x1="${X(p)}" x2="${X(p)}" y2="${Y0}"/><circle cx="${X(p)}" r="6" class="e-pt"/><text x="${X(p) + (k === 'art' ? -6 : 8)}" text-anchor="${k === 'art' ? 'end' : 'start'}" class="e-ml"></text></g>`).join('')}
        <g class="e-cur"><line class="e-curl" y1="${Y1}" y2="${Y0}"/><circle r="6" class="e-curp"/></g>
        <text class="e-myot f08-tk" opacity="0" x="${X(1.3)}" y="${Y(100) - 8}" fill="var(--warn)">miyoglobin</text>
      </svg>
      <label class="f08-sl f08-slw"><span>İmleç PO₂: <b data-o="cur"></b> kPa</span><input type="range" min="1" max="16" step="0.1" value="13.3" data-s="cur" aria-label="İmlecin oksijen parsiyel basıncı"></label>
      <div class="f08-chips">
        <div><h4>Sağa kaydıranlar · CADETS</h4><div class="f08-crow">${SAG.map((a, i) => `<button type="button" class="f08-chip sag" data-y="1" data-i="${i}" aria-pressed="false">${a}</button>`).join('')}</div></div>
        <div><h4>Sola kaydıranlar</h4><div class="f08-crow">${SOL.map((a, i) => `<button type="button" class="f08-chip sol" data-y="-1" data-i="${i}" aria-pressed="false">${a}</button>`).join('')}</div></div>
      </div>
      <div class="f08-eoku"><span>P50 <b data-o="p50"></b></span><span>SaO₂ 13,3 kPa'da <b data-o="sa"></b></span><span>SaO₂ 5,3 kPa'da <b data-o="sv"></b></span><span>13,3 → 5,3 kPa arası bırakılan O₂ <b data-o="off"></b></span></div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Eğri Hill denklemiyle çizilmiştir (n = 2,7); normal P50 3,5 kPa ve arteriyel/venöz noktalar kitabın şekli ve çözümlü örneğiyle uyumludur [[K1 s. 30, 32]]. Kaymaların büyüklüğü şematiktir: her etken için gerçek P50 değişimi farklıdır, burada yalnızca yön ve kabaca büyüklük gösterilir. Bırakılan O₂, 15 g/dL Hb için 1,34 × 15 × ΔSaO₂ ile hesaplanır [[K1 s. 30]]. Miyoglobin eğrisi hiperboliktir (P50\'si Hb\'den çok düşük); burada 0,4 kPa alınmıştır [[K1 s. 36]].')}</p>`;
    const q = (s) => el.querySelector(s), oku = {};
    el.querySelectorAll('[data-o]').forEach((n) => { oku[n.dataset.o] = n; });
    const sec = new Set(); let myo = false, bolge = false, cur = 13.3, lastCap = '';
    q('.e-myo').setAttribute('d', yol((p) => (100 * p) / (p + MYO)));
    q('.e-ghost').setAttribute('d', yol((p) => sat(p)));
    const p50Hesap = () => {
      let d = 0; sec.forEach((k) => { d += k[0] === '1' ? 1 : -1; });
      return clamp(P50N + Math.sign(d) * 1.05 * Math.sqrt(Math.abs(d)), 1.7, 6.2);
    };
    const ciz = () => {
      const p50 = p50Hesap(), S = (p) => sat(p, p50);
      q('.e-cv').setAttribute('d', yol(S));
      q('.e-ghost').setAttribute('opacity', Math.abs(p50 - P50N) > 0.05 ? 0.5 : 0);
      q('.e-myo').setAttribute('opacity', myo ? 1 : 0);
      q('.e-myot').setAttribute('opacity', myo ? 1 : 0);
      q('.e-bolge').setAttribute('opacity', bolge ? 1 : 0);
      const g = q('.e-p50');
      g.querySelector('.e-dash').setAttribute('x2', X(p50));
      g.querySelectorAll('.e-dash')[1].setAttribute('x1', X(p50));
      g.querySelectorAll('.e-dash')[1].setAttribute('x2', X(p50));
      g.querySelector('.e-pt').setAttribute('cx', X(p50)); g.querySelector('.e-pt').setAttribute('cy', Y(50));
      g.querySelector('.e-p50t').setAttribute('x', X(p50) - 8); g.querySelector('.e-p50t').textContent = 'P50 ' + fmt(p50) + ' kPa';
      const sa = S(13.3), sv = S(5.3);
      [['ven', 5.3, sv], ['art', 13.3, sa]].forEach(([k, p, s]) => {
        const m = el.querySelector(`.e-m[data-k="${k}"]`);
        m.querySelector('.e-dash').setAttribute('y1', Y(s));
        m.querySelector('.e-pt').setAttribute('cy', Y(s));
        const t = m.querySelector('.e-ml');
        t.setAttribute('y', Y(s) - 10); t.textContent = (k === 'art' ? 'arteriyel ' : 'venöz ') + '%' + Math.round(s);
      });
      const cs = S(cur), cl = q('.e-cur');
      cl.querySelector('.e-curl').setAttribute('x1', X(cur)); cl.querySelector('.e-curl').setAttribute('x2', X(cur));
      cl.querySelector('.e-curp').setAttribute('cx', X(cur)); cl.querySelector('.e-curp').setAttribute('cy', Y(cs));
      oku.cur.textContent = fmt(cur);
      oku.p50.textContent = fmt(p50) + ' kPa (' + Math.round(mmhg(p50)) + ' mmHg)';
      oku.sa.textContent = '%' + fmt(sa, 1); oku.sv.textContent = '%' + fmt(sv, 1);
      oku.off.textContent = fmt((HUFNER * 15 * (sa - sv)) / 100, 1) + ' mL/100 mL';
      const dus = cs - S(Math.max(0.5, cur - 1));
      let c = `<b>İmleç ${fmt(cur)} kPa.</b> SaO₂ %${fmt(cs, 1)}; PO₂ 1 kPa daha düşse SaO₂ ${fmt(dus, 1)} puan düşer. `;
      c += cur >= 9
        ? 'Eğrinin üst bölümü düzdür: PaO₂ biraz düşse bile SaO₂ hemen hemen değişmez. [[K1 s. 32]]'
        : cur >= 7
          ? 'Burası eğrinin omzudur: düz üst bölümden dik bölüme geçilir; PO₂ bunun altına indikçe aynı düşüş giderek daha büyük desatürasyon yapar. [[K1 s. 32]]'
        : cur >= 3
          ? 'Burası eğrinin dik bölümüdür: PO₂\'deki küçük bir düşüş büyük bir desatürasyon demektir; periferik dokularda ise PO₂\'de küçük bir azalmayla çok miktarda O₂ bırakılır. [[K1 s. 32]]'
          : 'Çok düşük PO₂: PaO₂ patolojik olarak düşükken hasta eğrinin dik bölümündedir, küçük düşüşler büyük desatürasyon yapar. [[K1 s. 32]]';
      if (sec.size && Math.abs(p50 - P50N) < 0.05) c += ' <b>Seçilen sağa ve sola kaydıran etkenler bu modelde birbirini dengeledi.</b>';
      else if (sec.size) {
        const yon = p50 > P50N ? 'sağa' : 'sola';
        c += ` <b>Eğri ${yon} kaydı.</b> ` + (p50 > P50N
          ? 'Afinite azaldı: belirli bir PO₂ için SaO₂ daha düşük, yani O₂ daha kolay bırakılıyor. [[K1 s. 32]]'
          : 'Afinite arttı: O₂ daha sıkı bağlanıyor, dokulara daha az O₂ bırakılıyor. [[K1 s. 33]]');
      }
      if (myo) c += ' Miyoglobin tek globin zinciri taşıdığı için kooperatif bağlanma göstermez: eğrisi hiperboliktir ve Hb eğrisinin belirgin solundadır; P50\'si çok düşük olduğundan oksihemoglobinden miyoglobine O₂ aktarılabilir. [[K1 s. 36]]';
      if (c !== lastCap) { q('.viz-cap').innerHTML = REF(c); lastCap = c; }
    };
    el.addEventListener('click', (e) => {
      const ch = e.target.closest('.f08-chip');
      if (ch) { const k = ch.dataset.y + ':' + ch.dataset.i; if (sec.has(k)) sec.delete(k); else sec.add(k); ch.setAttribute('aria-pressed', String(sec.has(k))); ciz(); return; }
      const t = e.target.closest('[data-t]');
      if (t) { if (t.dataset.t === 'myo') myo = !myo; else bolge = !bolge; t.setAttribute('aria-pressed', String(t.dataset.t === 'myo' ? myo : bolge)); ciz(); return; }
      if (e.target.closest('[data-a="sif"]')) { sec.clear(); el.querySelectorAll('.f08-chip').forEach((b) => b.setAttribute('aria-pressed', 'false')); ciz(); }
    });
    el.addEventListener('input', (e) => { const s = e.target.closest('[data-s="cur"]'); if (!s) return; cur = +s.value; ciz(); });
    ciz();
    return () => {};
  };

  /* ---------- 5 · Bohr etkisi: dokudan akciğere ---------- */
  VIZ.f08_bohr = (el) => {
    const AD = [
      { k: 'Doku kapilleri', p50: 4.6, po2: 5.3, yer: 0,
        t: '<b>1 · Doku kapilleri.</b> Metabolik olarak aktif doku CO₂, ısı ve H⁺ üretir. Kan bu kapillerlere ulaştığında eğri sağa kayar ve O₂ en çok gereksinim duyulan yerde bırakılır: Bohr etkisi. [[K1 s. 32]]' },
      { k: 'Anaerobik metabolizma', p50: 5.4, po2: 5.3, yer: 0.18,
        t: '<b>2 · Anaerobik metabolizma.</b> Hücresel PO₂ eşik değerin altına inince glikoliz baskınlaşır; ara ürünlerden biri yan yolda 2,3-DPG\'ye dönüşür. 2,3-DPG deoksihemoglobinin β zincirlerine bağlanıp bu yapıyı kararlı kılar, afinite daha da azalır ve bu hücrelere ek O₂ bırakılır. [[K1 s. 32–33]] Atlas notu: 2,3-DPG eritrositin kendi glikolizinde yapılır ve düzeyi saatler içinde değişir; bu adım tek bir kapiller geçişini değil, süregen hipokside daha sağa kaymış eğriyi gösterir.' },
      { k: 'Akciğere dönüş', p50: 3.5, po2: 9, yer: 0.6,
        t: '<b>3 · Akciğer.</b> Kan akciğerlere ulaştığında CO₂ atılır ve pH normale döner; P50 merkezi konumuna geri gider, yani O₂ bağlama afinitesi artar. [[K1 s. 33]]' },
      { k: 'Alveolde yüklenme', p50: 3.5, po2: 13.3, yer: 1,
        t: '<b>4 · Yüklenme.</b> Çözünmüş O₂ Hb\'ye bağlanır; bu, kanın O₂ parsiyel basıncını düşürerek alveol–kapiller bariyerden difüzyonu kolaylaştırır ve yüklenmeyi sürdürür. [[K1 s. 33]]' },
    ];
    const X0 = 44, X1 = 188, Y0 = 170, Y1 = 22, PMAX = 16;
    const X = (p) => X0 + (clamp(p, 0, PMAX) / PMAX) * (X1 - X0), Y = (s) => Y0 - (clamp(s, 0, 100) / 100) * (Y0 - Y1);
    const yol = (p50) => { let d = ''; for (let p = 0; p <= PMAX + 0.001; p += 0.3) d += (p ? 'L' : 'M') + X(p).toFixed(1) + ',' + Y(sat(p, p50)).toFixed(1); return d; };
    el.innerHTML = `<div class="viz-head"><h3>Bohr etkisi: aynı Hb, iki ayrı eğri</h3>
      <div class="btn-row"><div class="seg" role="group" aria-label="Adım">${AD.map((a, i) => `<button type="button" data-i="${i}" aria-pressed="${i === 0}">${i + 1}</button>`).join('')}</div><button type="button" class="btn play">Oynat</button></div></div>
      <div class="f08-bohr">
        <svg class="f08-bsvg" viewBox="0 0 232 206" role="img" aria-label="Eğrinin dokuda sağa, akciğerde merkezi konuma kayması">
          <path class="b-ghost" d="${yol(P50N)}"/>
          <path class="b-cv" d=""/>
          <line class="b-dash" x1="${X0}" x2="${X1}"/><line class="b-dashv" y1="${Y1}" y2="${Y0}"/>
          <circle class="b-pt" r="6"/>
          ${[0, 4, 8, 12, 16].map((p) => `<text x="${X(p)}" y="${Y0 + 16}" text-anchor="middle" class="f08-tk">${p}</text>`).join('')}
          ${[0, 50, 100].map((s) => `<text x="${X0 - 6}" y="${Y(s) + 5}" text-anchor="end" class="f08-tk">${s}</text>`).join('')}
          <line x1="${X0}" x2="${X1}" y1="${Y0}" y2="${Y0}" class="e-ax"/><line x1="${X0}" x2="${X0}" y1="${Y0}" y2="${Y1}" class="e-ax"/>
          <text x="${X1}" y="${Y0 + 32}" text-anchor="end" class="f08-lb">PO₂ · kPa</text>
          <text x="${X0 - 34}" y="${Y1 - 4}" class="f08-lb">SaO₂ %</text>
        </svg>
        <svg class="f08-bsvg2" viewBox="0 0 300 212" role="img" aria-label="Eritrositin doku kapilleriyle akciğer arasındaki dolaşımı">
          <rect x="10" y="16" width="120" height="78" rx="12" fill="var(--crit-soft)" stroke="var(--crit)" stroke-width="1.5"/>
          <text x="70" y="40" text-anchor="middle" class="f08-blb" fill="var(--crit)">Doku</text>
          <text x="70" y="60" text-anchor="middle" class="f08-tk">CO₂ · H⁺ · ısı</text>
          <text x="70" y="80" text-anchor="middle" class="f08-tk" style="font-size:9.5px">2,3-DPG ↑ (yavaş)</text>
          <rect x="170" y="16" width="120" height="78" rx="12" fill="var(--c-basic-soft)" stroke="var(--c-basic)" stroke-width="1.5"/>
          <text x="230" y="40" text-anchor="middle" class="f08-blb" fill="var(--c-basic)">Alveol</text>
          <text x="230" y="60" text-anchor="middle" class="f08-tk">CO₂ atılır</text>
          <text x="230" y="80" text-anchor="middle" class="f08-tk">pH normalleşir</text>
          <path d="M70 102 V142 H230 V102" fill="none" stroke="var(--line)" stroke-width="2.5"/>
          <circle class="b-rbc" r="12" fill="var(--crit)"/>
          <text class="b-rbct f08-rbct" text-anchor="middle"></text>
          <text class="b-ad f08-blb" x="150" y="180" text-anchor="middle"></text>
          <text class="b-off f08-tk" x="150" y="200" text-anchor="middle"></text>
        </svg>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Mekanizma ve sıralama kitaptandır [[K1 s. 32–33]]. Kaymanın büyüklüğü (P50 3,5 → 4,6 → 5,4 kPa) ve yol üstündeki konumlar şematiktir; 2,3-DPG adımı yavaş bir uyumdur (Atlas notu); eğri Hill denklemiyle (n = 2,7) çizilmiştir.')}</p>`;
    const q = (s) => el.querySelector(s);
    let i = 0, t = 0, oto = !RM, lastCap = '';
    const ciz = () => {
      const A = AD[i], s = sat(A.po2, A.p50);
      q('.b-cv').setAttribute('d', yol(A.p50));
      q('.b-ghost').setAttribute('opacity', A.p50 > P50N ? 0.45 : 0);
      q('.b-dash').setAttribute('y1', Y(s)); q('.b-dash').setAttribute('y2', Y(s));
      q('.b-dashv').setAttribute('x1', X(A.po2)); q('.b-dashv').setAttribute('x2', X(A.po2));
      q('.b-pt').setAttribute('cx', X(A.po2)); q('.b-pt').setAttribute('cy', Y(s));
      const px = lerp(70, 230, A.yer), py = A.yer <= 0.02 || A.yer >= 0.98 ? 106 : 142;
      q('.b-rbc').setAttribute('cx', px); q('.b-rbc').setAttribute('cy', py);
      q('.b-rbct').setAttribute('x', px); q('.b-rbct').setAttribute('y', py + 4); q('.b-rbct').textContent = '%' + Math.round(s);
      q('.b-ad').textContent = (i + 1) + ' · ' + A.k;
      q('.b-off').textContent = 'PO₂ ' + fmt(A.po2) + ' kPa · P50 ' + fmt(A.p50) + ' kPa · SaO₂ %' + Math.round(s);
      el.querySelectorAll('.seg [data-i]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === i)));
      if (A.t !== lastCap) { q('.viz-cap').innerHTML = REF(A.t); lastCap = A.t; }
    };
    const play = q('.play');
    el.addEventListener('click', (e) => {
      const b = e.target.closest('.seg [data-i]');
      if (b) { oto = false; play.textContent = 'Oynat'; i = +b.dataset.i; t = 0; ciz(); return; }
      if (e.target.closest('.play')) { oto = !oto; play.textContent = oto ? 'Duraklat' : 'Oynat'; t = 0; }
    });
    play.textContent = oto ? 'Duraklat' : 'Oynat';
    ciz();
    return ticker(el, (dt) => { if (!oto) return; t += dt; if (t > 4.6) { t = 0; i = (i + 1) % AD.length; ciz(); } });
  };

  /* ---------- 6 · anormal hemoglobinler ---------- */
  VIZ.f08_dishb = (el) => {
    const V = [
      { id: 'hba', ad: 'HbA', tur: 'fiz', z: 'α₂β₂', t: 'Erişkinde dolaşımdaki Hb\'nin %95\'inden fazlası. Dört globin alt birimi (iki α, iki β) yaklaşık tetrahedral bir düzende, zayıf elektrostatik kuvvetlerle bir arada tutulur; her zincirin kendi hem grubu vardır. [[K1 s. 31]]' },
      { id: 'hba2', ad: 'HbA₂', tur: 'fiz', z: 'α₂δ₂', t: 'Erişkindeki diğer normal varyant; toplam Hb\'nin yaklaşık %2–3\'ü. [[K1 s. 34]]' },
      { id: 'hbf', ad: 'HbF', tur: 'fiz', z: 'α₂γ₂', t: 'Fetal yaşamın normal varyantı. O₂ afinitesi HbA\'dan yüksektir, bu yüzden plasentada maternal kandan O₂ alabilir. İki mekanizma: eğriyi sola kaydırır ve 2,3-DPG yalnızca β zincirlerine bağlandığı için γ zincirine bağlanamaz. Kitaba göre üretimi 3 aylık yaşa kadar sürer, 6 aylık yaşta erişkin varyantlarıyla yer değiştirmiş olmalıdır (Atlas notu: erişkin düzeyine genellikle 1–2 yaşında inilir); β-globin sentezinin bozulduğu durumlarda (ör. β-talasemi) sürebilir. [[K1 s. 33–34]]' },
      { id: 'hbs', ad: 'HbS', tur: 'pat', z: 'anormal β', t: 'Orak hücre hastalığının hemoglobini: β-globin zincirinin altıncı konumundaki glutamat valinle yer değiştirmiştir (nokta mutasyonu). Hipoksik koşullarda moleküller kümelenir ve eritrositi orak biçimine sokar. Eğriyi sağa kaydırır. [[K1 s. 32–34]]' },
      { id: 'methb', ad: 'MetHb', tur: 'pat', z: 'Fe³⁺', t: 'Hem grubundaki ferröz demir (Fe²⁺) ferrik demire (Fe³⁺) oksitlenmiştir; Fe³⁺ O₂ bağlayamaz, dolayısıyla MetHb O₂ taşınmasına katılmaz. Normalde toplam Hb\'nin %1\'inden azdır. [[K1 s. 34–35]]' },
      { id: 'cohb', ad: 'COHb', tur: 'pat', z: 'CO bağlı', t: 'Hb solunmuş karbonmonoksiti bağlar. CO\'nun Hb\'ye afinitesi O₂\'nin 250 katıdır; Hb tercihen COHb oluşturur ve taşıma kapasitesi azalır. Normalde <%2, ağır sigara içicilerinde %9\'a kadar. [[K1 s. 34–35]]' },
      { id: 'cnhb', ad: 'SiyanoHb', tur: 'pat', z: 'CN⁻ bağlı', t: 'Hb\'nin siyanür iyonlarına maruz kalmasıyla oluşur. [[K1 s. 34]]' },
    ];
    const NIC = {
      cohb: { ad: 'COHb', ox: (p) => (p ? 'yanlış yüksek' : '≈%97'), not: 'CO zehirlenmesinde eğri sola kayar; bu, dokulara O₂ bırakılmasını azaltarak doku hipoksisini ağırlaştırır. Tedavi, yüksek PaO₂ ile (yüksek FiO₂ ya da hiperbarik oda) CO\'nun Hb\'den kompetitif olarak uzaklaştırılmasıdır. [[K1 s. 35–36]]' },
      methb: { ad: 'MetHb', ox: (p) => (p ? '%85\'e doğru kayar' : '≈%97'), not: 'MetHb O₂ bağlayamaz ("fonksiyonel anemi") ve kalan normal Hb\'nin afinitesini değiştirir: eğri sola kayar, dokulara daha az O₂ bırakılır. Nabız oksimetresi MetHb\'yi yanlış okur; kitaba göre konsantrasyondan bağımsız olarak ≈%85 gösterir (Atlas notu: bu yüksek MetHb düzeylerinde geçerlidir, düşük düzeylerde okuma %85\'e doğru iner); doğru ölçüm CO-oksimetreyle yapılır. Tedavi hafif olguda ilave O₂, ağır olguda metilen mavisidir. [[K1 s. 35]]' },
    };
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Görünüm"><button type="button" data-g="harita" aria-pressed="true">Hb biçimleri</button><button type="button" data-g="nicel" aria-pressed="false">Taşıma kapasitesi</button></div></div>
      <div class="f08-dh"></div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Sınıflama, zincir bileşimleri ve oranlar kitaptandır [[K1 s. 31–35]]. Nicel panelde hesap: işlev gören Hb = [Hb] × (1 − COHb/MetHb oranı), içerik = 1,34 × işlev gören Hb × 0,97 + 0,023 × 13 kPa [[K1 s. 30]]; siyanoz eşiği 5 g/dL deoksihemoglobindir [[K1 s. 36]]. Eğri kayması ve sola kaymanın doku hipoksisini ağırlaştırması kitaptandır; nabız oksimetresinin COHb\'yi oksihemoglobin gibi okuduğu bilgisi Atlas notudur (kitap bunu yalnızca MetHb için söyler).')}</p>`;
    const kap = el.querySelector('.f08-dh'), cap = el.querySelector('.viz-cap');
    let g = 'harita', secid = 'hba', tip = 'cohb', pay = 20, lastCap = '';
    const harita = () => {
      kap.innerHTML = `<div class="f08-vgrid">${['fiz', 'pat'].map((tur) => `<div><h4>${tur === 'fiz' ? 'Fizyolojik' : 'Patolojik'}</h4><div class="f08-vrow">${V.filter((v) => v.tur === tur).map((v) => `<button type="button" class="f08-v ${tur}" data-id="${v.id}" aria-pressed="false"><b>${v.ad}</b><span>${v.z}</span></button>`).join('')}</div></div>`).join('')}</div>`;
      sec(secid);
    };
    const sec = (id) => {
      secid = id;
      kap.querySelectorAll('.f08-v').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
      const v = V.find((x) => x.id === id);
      const c = `<b>${v.ad} · ${v.z}.</b> ${v.t}`;
      cap.innerHTML = REF(c); lastCap = c;
    };
    const nicel = () => {
      kap.innerHTML = `<div class="f08-nic">
        <div class="seg" role="group" aria-label="Hemoglobin tipi"><button type="button" data-n="cohb" aria-pressed="${tip === 'cohb'}">COHb</button><button type="button" data-n="methb" aria-pressed="${tip === 'methb'}">MetHb</button></div>
        <label class="f08-sl f08-slw"><span><b data-o="ad"></b> payı: <b data-o="pay"></b></span><input type="range" min="0" max="70" step="1" value="${pay}" data-s="pay" aria-label="Anormal hemoglobin payı"></label>
        <div class="f08-nbar"><i class="ok" data-b="ok"></i><i class="no" data-b="no"></i></div>
        <dl class="f08-oku">
          <div><dt>O₂ bağlayabilen Hb</dt><dd data-o="fhb"></dd></div>
          <div><dt>Arteriyel O₂ içeriği</dt><dd data-o="ct"></dd></div>
          <div><dt>Deoksihemoglobin</dt><dd data-o="deo"></dd></div>
          <div><dt>Nabız oksimetresi</dt><dd data-o="ox"></dd></div>
        </dl>
      </div>`;
      ciz();
    };
    const ciz = () => {
      const oku = {}; kap.querySelectorAll('[data-o]').forEach((n) => { oku[n.dataset.o] = n; });
      const f = pay / 100, hb = 15, fhb = hb * (1 - f), ct = HUFNER * fhb * 0.97 + COZ * 13, deo = fhb * 0.03;
      oku.ad.textContent = NIC[tip].ad; oku.pay.textContent = '%' + pay;
      oku.fhb.textContent = fmt(fhb) + ' g/dL (15 g/dL\'nin %' + Math.round((1 - f) * 100) + 'i)';
      oku.ct.textContent = fmt(ct) + ' mL/100 mL';
      oku.deo.textContent = fmt(deo, 2) + ' g/dL (eşik 5 g/dL)';
      oku.ox.textContent = NIC[tip].ox(pay);
      kap.querySelector('[data-b="ok"]').style.width = ((1 - f) * 100).toFixed(1) + '%';
      kap.querySelector('[data-b="no"]').style.width = (f * 100).toFixed(1) + '%';
      kap.querySelectorAll('[data-n]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.n === tip)));
      let c = `<b>%${pay} ${NIC[tip].ad}.</b> ` + (pay ? `O₂ bağlayabilen Hb ${fmt(fhb)} g/dL\'ye iner: taşıma kapasitesi bakımından bu, Hb\'nin ${fmt(fhb)} g/dL\'ye düşmesine denktir ("fonksiyonel anemi"). ` : 'Hb\'nin tamamı (15 g/dL) O₂ bağlayabilir. ') + NIC[tip].not;
      if (tip === 'cohb') {
        c += pay > 60 ? ' Bu düzeyde (>%60) konvülziyon, koma ve ölüm görülür. [[K1 s. 36]]'
          : pay > 20 ? ' Bu düzeyde güçsüzlük, baş dönmesi, bulantı ve kusma beklenir. [[K1 s. 36]]'
            : pay >= 15 ? ' %15–20 düzeyi baş ağrısı ve konfüzyon gibi hafif belirtiler yapar. [[K1 s. 36]]'
              : pay >= 8 ? ' Ağır sigara içicilerinde COHb %9\'a kadar çıkabilir. [[K1 s. 35]]' : '';
        c += ' Hesaptaki deoksihemoglobin 5 g/dL eşiğinin çok altındadır: CO bağlamamış Hb genellikle tam satüre olduğundan hasta siyanotik görünmez, nadiren kiraz kırmızısı renk değişikliği olur. [[K1 s. 36]]';
      }
      if (c !== lastCap) { cap.innerHTML = REF(c); lastCap = c; }
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-g]');
      if (b) { g = b.dataset.g; el.querySelectorAll('[data-g]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); lastCap = ''; if (g === 'harita') harita(); else nicel(); return; }
      const v = e.target.closest('.f08-v'); if (v) { sec(v.dataset.id); return; }
      const n = e.target.closest('[data-n]'); if (n) { tip = n.dataset.n; ciz(); }
    });
    el.addEventListener('input', (e) => { const s = e.target.closest('[data-s="pay"]'); if (!s) return; pay = +s.value; ciz(); });
    harita();
    return () => {};
  };
  /* ---------- ortak (yeni bileşenler): metin sarma, dar/geniş yerleşim, seçim ---------- */
  const D08_sar = (s, maxW, fs) => {
    const max = Math.max(6, Math.floor(maxW / (fs * 0.56)));
    const out = []; let cur = '';
    String(s).split(' ').forEach((w) => { if (!cur) cur = w; else if ((cur + ' ' + w).length <= max) cur += ' ' + w; else { out.push(cur); cur = w; } });
    if (cur) out.push(cur);
    return out;
  };
  /* satırlar → <text>; döner {svg, h} */
  const D08_yaz = (x, y, satir, fs, cls, anchor = 'start', lh = fs * 1.3) => {
    const sv = `<text x="${x}" y="${y}" class="${cls}" style="font-size:${fs}px" text-anchor="${anchor}">${satir.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${l}</tspan>`).join('')}</text>`;
    return { svg: sv, h: satir.length * lh };
  };
  /* genişliğe göre yerleşimi seçer; dar ↔ geniş değişince yeniden çizer */
  const D08_duzen = (el, ciz) => {
    let dar = null;
    const bak = () => { const w = el.clientWidth || (el.closest('.viz') || el).clientWidth || 800; const d = w < 540; if (d !== dar) { dar = d; ciz(d); } };
    bak();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(bak) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  };
  /* tıklanabilir <g data-k> öğeleri: tık/Enter/Boşluk; aynı öğeye yeniden basınca seçim kalkar */
  const D08_secim = (el, varsayilan, metinler, uygula) => {
    const cap = el.closest('.viz').querySelector('.viz-cap');
    const ilk = cap.innerHTML;
    let sec = null;
    const kur = (k) => {
      sec = k === sec ? null : k;
      cap.innerHTML = sec ? REF(metinler[sec]) : ilk;
      uygula(sec);
    };
    el.addEventListener('click', (e) => { const g = e.target.closest('[data-k]'); if (g && el.contains(g)) kur(g.dataset.k); });
    el.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const g = e.target.closest('[data-k]'); if (!g) return;
      e.preventDefault(); kur(g.dataset.k);
    });
    return { al: () => sec };
  };
  const D08_isaretle = (svg, sec) => {
    svg.classList.toggle('f08-has', !!sec);
    svg.querySelectorAll('[data-k]').forEach((g) => { const on = g.dataset.k === sec; g.classList.toggle('sel', on); g.setAttribute('aria-pressed', String(on)); });
  };

  /* ---------- 7 · eritrosit → HbA → hem ---------- */
  VIZ.f08_yapi = (el) => {
    const M = {
      rbc: '<b>Eritrosit.</b> 6–8 µm çaplı, esnek, bikonkav disk; ≈3 µm\'lik en küçük kapillerlerden biçim değiştirerek geçer. Çekirdeği ve mitokondrisi yoktur — işlevsel olarak bir "hemoglobin torbası". [[K1 s. 31]]',
      hba: '<b>HbA · α₂β₂.</b> Dört globin alt birimi (iki α, iki β) yaklaşık tetrahedral bir düzende, zayıf elektrostatik kuvvetlerle bir arada tutulur; her zincirin kendi hem grubu vardır. Molekül başına dört O₂ bağlanabilir. [[K1 s. 31]]',
      hem: '<b>Hem.</b> Demiri ferröz durumda (Fe²⁺) tutan, demir içeren bir porfirin halkası. O₂, Fe²⁺ iyonuna zayıf bir koordinasyon bağıyla geri dönüşümlü bağlanır; hem başına bir O₂. [[K1 s. 31]]',
    };
    const hex = (cx, cy, r, cls) => `<polygon class="${cls}" points="${[0, 1, 2, 3, 4, 5].map((k) => `${(cx + r * Math.cos(k * Math.PI / 3)).toFixed(1)},${(cy + r * Math.sin(k * Math.PI / 3)).toFixed(1)}`).join(' ')}"/>`;
    /* her panelin çizimi yerel (0,0) merkezli */
    const artA = () => {
      const dots = [[-32, -14], [-24, -21], [-25, -7], [32, -14], [24, -21], [25, -7], [-11, -14], [11, -14]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" class="f08-hbn"/>`).join('');
      return `<path class="f08-rbc f08-k" d="M-44,-14 C-44,-35 -18,-33 0,-23 C18,-33 44,-35 44,-14 C44,7 18,5 0,-5 C-18,5 -44,7 -44,-14Z"/>${dots}
        <line x1="-46" y1="18" x2="46" y2="18" class="f08-cap"/><line x1="-46" y1="29" x2="46" y2="29" class="f08-cap"/>
        <ellipse cx="8" cy="23.5" rx="26" ry="3.6" class="f08-sik"/>
        <line x1="-42" y1="23.5" x2="-24" y2="23.5" class="f08-ince" marker-end="url(#f08-y-ok)"/>`;
    };
    const artB = () => {
      const U = [['α', -28, -28, 'a'], ['α', 28, -28, 'a'], ['β', -28, 28, 'b'], ['β', 28, 28, 'b']];
      const bag = `<g class="f08-bag"><line x1="-7" y1="-28" x2="7" y2="-28"/><line x1="-7" y1="28" x2="7" y2="28"/><line x1="-28" y1="-7" x2="-28" y2="7"/><line x1="28" y1="-7" x2="28" y2="7"/></g>`;
      const alt = U.map(([g, x, y, c]) => {
        const sx = Math.sign(x), sy = Math.sign(y), hx = x + sx * 21, hy = y + sy * 21, oy = hy + sy * 15;
        return `<circle cx="${x}" cy="${y}" r="22" class="f08-su ${c} f08-k"/><text x="${x}" y="${y + 6}" class="f08-gr ${c}" text-anchor="middle">${g}</text>
          ${hex(hx, hy, 7, 'f08-hem')}<line x1="${hx}" y1="${hy + sy * 6}" x2="${hx}" y2="${oy - sy * 4}" class="f08-o2l"/><circle cx="${hx}" cy="${oy}" r="4.5" class="f08-o2"/>`;
      }).join('');
      return bag + alt;
    };
    const artC = () => {
      const spokes = [0, 1, 2, 3].map((k) => { const a = Math.PI / 4 + k * Math.PI / 2; return `<line x1="${(13 * Math.cos(a)).toFixed(1)}" y1="${(8 + 13 * Math.sin(a)).toFixed(1)}" x2="${(24 * Math.cos(a)).toFixed(1)}" y2="${(8 + 24 * Math.sin(a)).toFixed(1)}" class="f08-hemi"/>`; }).join('');
      return `${hex(0, 8, 38, 'f08-hem f08-k')}${hex(0, 8, 27, 'f08-hemic')}${spokes}
        <circle cx="0" cy="8" r="14" class="f08-fe f08-k"/><text x="0" y="12" class="f08-fet" text-anchor="middle">Fe²⁺</text>
        <line x1="0" y1="-9" x2="0" y2="-40" class="f08-kb" marker-start="url(#f08-y-ok2)" marker-end="url(#f08-y-ok2)"/>
        <circle cx="-4.5" cy="-49" r="6" class="f08-o2 big"/><circle cx="4.5" cy="-49" r="6" class="f08-o2 big"/>
        <text x="14" y="-45" class="f08-o2t">O₂</text>`;
    };
    const P = [
      { k: 'rbc', ad: 'Eritrosit', art: artA, sat: [['Eritrosit', 't'], ['6–8 µm · bikonkav', 's'], ['kapiller ≈ 3 µm', 'n']] },
      { k: 'hba', ad: 'HbA molekülü', art: artB, sat: [['HbA · α₂β₂', 't'], ['4 hem, 4 O₂', 's'], ['kesikli çizgi: zayıf', 'n'], ['elektrostatik kuvvetler', 'n']] },
      { k: 'hem', ad: 'Hem grubu', art: artC, sat: [['Hem', 't'], ['demir içeren', 's'], ['porfirin halkası', 's'], ['↕ geri dönüşümlü', 'n kr'], ['koordinasyon bağı', 'n kr']] },
    ];
    const OKLAR = ['içinde', 'yakından'];
    const defs = `<defs><marker id="f08-y-ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--muted)"/></marker><marker id="f08-y-ok2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--crit)"/></marker></defs>`;
    const satirlar = (x, y, sat, fT, fS, lh, anchor) => sat.map(([t, c], i) => `<text x="${x}" y="${y + i * lh}" class="f08-yl ${c}" style="font-size:${c === 't' ? fT : c === 's' ? fS : fS - 0.5}px" text-anchor="${anchor}">${t}</text>`).join('');
    const pg = (p, fr, ic) => `<g class="f08-p" data-k="${p.k}" role="button" tabindex="0" aria-label="${p.ad}" aria-pressed="false"><rect class="f08-fr" x="${fr[0]}" y="${fr[1]}" width="${fr[2]}" height="${fr[3]}" rx="12"/>${ic}</g>`;
    let svg;
    const ciz = (dar) => {
      let s;
      if (!dar) {
        const C = [56, 200, 356], F = [[4, 108], [136, 264], [292, 416]];
        s = `<svg class="f08-ysvg" viewBox="0 0 420 252" role="img" aria-label="Eritrosit, içindeki hemoglobin molekülü ve hem grubu şeması">${defs}`;
        P.forEach((p, i) => { s += pg(p, [F[i][0], 4, F[i][1] - F[i][0], 244], `<g transform="translate(${C[i]},92)">${p.art()}</g>${satirlar(C[i], 184, p.sat, 11.5, 9.5, 12.5, 'middle')}`); });
        [[110, 134], [266, 290]].forEach(([a, b], i) => { s += `<line x1="${a}" y1="92" x2="${b}" y2="92" class="f08-ince" marker-end="url(#f08-y-ok)"/><text x="${(a + b) / 2}" y="84" class="f08-yl n" style="font-size:9px" text-anchor="middle">${OKLAR[i]}</text>`; });
      } else {
        const RH = 160, ST = 186;
        s = `<svg class="f08-ysvg dar" viewBox="0 0 320 ${3 * RH + 2 * 26 + 8}" role="img" aria-label="Eritrosit, içindeki hemoglobin molekülü ve hem grubu şeması">${defs}`;
        P.forEach((p, i) => {
          const y0 = 4 + i * ST, n = p.sat.length, lh = 15, ys = y0 + RH / 2 - ((n - 1) * lh) / 2 + 4;
          s += pg(p, [4, y0, 312, RH], `<g transform="translate(80,${y0 + RH / 2})">${p.art()}</g>${satirlar(166, ys, p.sat, 13, 11.5, lh, 'start')}`);
          if (i < 2) s += `<line x1="80" y1="${y0 + RH + 3}" x2="80" y2="${y0 + ST - 3}" class="f08-ince" marker-end="url(#f08-y-ok)"/><text x="92" y="${y0 + RH + 17}" class="f08-yl n" style="font-size:11px">${OKLAR[i]}</text>`;
        });
      }
      el.innerHTML = s + '</svg>';
      svg = el.querySelector('svg');
      D08_isaretle(svg, S.al());
    };
    const S = D08_secim(el, null, M, (k) => { if (svg) D08_isaretle(svg, k); });
    return D08_duzen(el, ciz);
  };

  /* ---------- 8 · orak hücre: mutasyondan klinik tabloya ---------- */
  VIZ.f08_orak = (el) => {
    const M = {
      s1: '<b>Nokta mutasyonu.</b> HbS\'de β-globin zincirinin altıncı konumundaki glutamat valinle yer değiştirmiştir. Kalıtım otozomal resesiftir; kitaba göre semptomatik hastalık yalnız homozigotlarda görülür, heterozigotlar asemptomatik taşıyıcıdır ve taşıyıcılık sıtmaya direnç sağlar. [[K1 s. 34]]',
      s2: '<b>Hipoksik koşullarda kümelenme.</b> Hemoglobin molekülleri kümelenir ve eritrositi orak biçimine sokar; normal venöz kanın PO₂\'si bile, özellikle dalağın yavaş akımında, oraklaşmaya yetebilir. [[K1 s. 34]]',
      s3: '<b>Esneklik kaybı.</b> Eritrosit arteriyel ve venöz oksijen basınçları arasında gidip geldikçe yinelenen kümelenme ve dağılma, zar esnekliğini azaltır. [[K1 s. 34]]',
      s4a: '<b>Vasküler oklüzyon.</b> Esnekliği azalmış hücreler dar kapillerlerde biçim değiştiremez: viskozite artar, venöz tromboz ve iskemi gelişir, kapiller ve venöz tıkanmalar tüm organ enfarktüsüyle tehdit eder. Çocuklukta sık görülen dalak enfarktüsü kapsüllü bakteri enfeksiyonlarına (meningokok septisemisi, salmonella osteomiyeliti) yatkınlık bırakır. [[K1 s. 34]]',
      s4b: '<b>Eritrosit ömrü kısalır.</b> Normalde 100–120 gün olan ömür kronik hemolizle 10–20 güne iner; Hb 7–11 g/dL olur ve retikülositoz görülür. Parvovirüs B19 eritrosit öncüllerini yok ederek üretimi kısa süre (kitaba göre 2–3 gün) durdurur; ömür kısa olduğu için bu duraklama derin anemi yapabilir. [[K1 s. 34]]',
    };
    const orak = (cx, cy, w, h, cls) => `<path class="${cls}" d="M${cx - w / 2},${cy - h * 0.35} Q${cx},${cy + h * 0.95} ${cx + w / 2},${cy - h * 0.35} Q${cx},${cy + h * 0.22} ${cx - w / 2},${cy - h * 0.35}Z"/>`;
    const cubuk = (cx, cy, w, h) => {
      const p0 = [cx - w / 2 + 5, cy - h * 0.22], c = [cx, cy + h * 0.6], p2 = [cx + w / 2 - 5, cy - h * 0.22];
      let s = '';
      for (let i = 0; i < 6; i++) { const t = 0.12 + i * 0.152, u = 1 - t; s += `<circle cx="${(u * u * p0[0] + 2 * u * t * c[0] + t * t * p2[0]).toFixed(1)}" cy="${(u * u * p0[1] + 2 * u * t * c[1] + t * t * p2[1]).toFixed(1)}" r="2.7" class="f08-hbs"/>`; }
      return s;
    };
    const ok = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="f08-ince" marker-end="url(#f08-ok-asagi)"/>`;
    let svg;
    const ciz = (dar) => {
      const W = dar ? 320 : 420, fb = dar ? 11.5 : 10, fh = dar ? 13 : 11.5, lh = fb * 1.3;
      const kut = (k, ad, x, y, w, h, cls, ic) => `<g class="f08-p" data-k="${k}" role="button" tabindex="0" aria-label="${ad}" aria-pressed="false"><rect class="f08-box ${cls} f08-k" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>${ic}</g>`;
      const bas = (x, y, s, w) => D08_yaz(x, y, D08_sar(s, w, fh), fh, 'f08-oh', 'start', fh * 1.25);
      let y = 6, s = '';
      /* 1 · mutasyon */
      {
        const x = 6, w = W - 12, h1 = bas(x + 10, y + 18, '1 · β-globin, 6. konum: glutamat → valin', w - 20);
        const y1 = y + 18 + h1.h - 2, sq = 16, gp = 4, x0 = W / 2 - (10 * sq + 9 * gp) / 2 + (dar ? 14 : 0);
        let ic = h1.svg;
        for (let i = 0; i < 10; i++) ic += `<rect x="${x0 + i * (sq + gp)}" y="${y1 + 14}" width="${sq}" height="${sq}" rx="3" class="f08-aa${i === 5 ? ' v' : ''}"/>`;
        const cx = x0 + 5 * (sq + gp) + sq / 2;
        ic += `<text x="${cx}" y="${y1 + 9}" class="f08-glu" style="font-size:${fb}px" text-anchor="middle">Glu</text><line x1="${cx - 11}" y1="${y1 + 5.5}" x2="${cx + 11}" y2="${y1 + 5.5}" class="f08-ust"/>`;
        ic += `<text x="${cx}" y="${y1 + 14 + sq + fb + 3}" class="f08-val2" style="font-size:${fb + 1}px" text-anchor="middle">Val</text>`;
        ic += `<text x="${x0 - 6}" y="${y1 + 14 + sq - 4}" class="f08-on" style="font-size:${fb}px" text-anchor="end">β zinciri</text>`;
        const h = y1 + 14 + sq + fb + 10 - y;
        s += kut('s1', 'Adım 1 · nokta mutasyonu', x, y, w, h, 'w', ic); y += h;
      }
      s += ok(W / 2, y + 2, W / 2, y + 14); y += 16;
      /* 2 · kümelenme */
      {
        const x = 6, w = W - 12, h1 = bas(x + 10, y + 18, '2 · Hipokside HbS kümelenir, eritrosit oraklaşır', w - 20);
        const cL = W * 0.24, cR = W * 0.76, half = W / 2 - 24;
        const lL = D08_yaz(cL, y + 18 + h1.h + 4, D08_sar('arteriyel PO₂', half, fb), fb, 'f08-on', 'middle');
        const lR = D08_yaz(cR, y + 18 + h1.h + 4, D08_sar('venöz PO₂ · dalakta yavaş akım', half, fb), fb, 'f08-on', 'middle');
        const cy = y + 18 + h1.h + Math.max(lL.h, lR.h) + 24;
        let ic = h1.svg + lL.svg + lR.svg;
        ic += `<circle cx="${cL}" cy="${cy}" r="22" class="f08-rbc2"/>`;
        [[-9, -8], [7, -10], [-12, 6], [3, 2], [12, 8], [-2, 13]].forEach(([dx, dy]) => { ic += `<circle cx="${cL + dx}" cy="${cy + dy}" r="2.7" class="f08-hbs ok"/>`; });
        ic += orak(cR, cy - 4, 64, 34, 'f08-orakc') + cubuk(cR, cy - 4, 64, 34);
        const a = cL + 30, b = cR - 38;
        ic += `<line x1="${a}" y1="${cy}" x2="${b}" y2="${cy}" class="f08-ince" marker-start="url(#f08-ok-asagi)" marker-end="url(#f08-ok-asagi)"/>`;
        ic += D08_yaz((a + b) / 2, cy - 6, ['yinelenen'], fb, 'f08-on', 'middle').svg;
        ic += D08_yaz((a + b) / 2, cy + fb + 6, D08_sar('kümelenme ↔ dağılma', b - a, fb), fb, 'f08-on', 'middle').svg;
        const h = cy + 28 - y + (dar ? 10 : 0);
        s += kut('s2', 'Adım 2 · hipoksik kümelenme', x, y, w, h, 'w', ic); y += h;
      }
      s += ok(W / 2, y + 2, W / 2, y + 14); y += 16;
      /* 3 · esneklik kaybı */
      let y3b;
      {
        const x = 6, w = W - 12, h1 = bas(x + 10, y + 18, '3 · Zar esnekliği azalır', w - 20);
        const tw = W * 0.5 - 16;
        const t = D08_yaz(x + 10, y + 18 + h1.h + 2, D08_sar('Arteriyel ↔ venöz geçişlerde yinelenen kümelenme, zar esnekliğini azaltır.', tw, fb), fb, 'f08-ot', 'start', lh);
        const cy = y + 18 + h1.h - 2 + t.h / 2, a = W * 0.5 + 34, b = W - 18;
        let ic = h1.svg + t.svg;
        ic += `<line x1="${a}" y1="${cy - 8}" x2="${b}" y2="${cy - 8}" class="f08-cap"/><line x1="${a}" y1="${cy + 8}" x2="${b}" y2="${cy + 8}" class="f08-cap"/>`;
        ic += orak(a - 8, cy - 4, 40, 30, 'f08-orakc') + `<g class="f08-x"><line x1="${a + 8}" y1="${cy - 6}" x2="${a + 20}" y2="${cy + 6}"/><line x1="${a + 20}" y1="${cy - 6}" x2="${a + 8}" y2="${cy + 6}"/></g>`;
        ic += `<text x="${(a + b) / 2 + 14}" y="${cy + 8 + fb + 5}" class="f08-on" style="font-size:${fb}px" text-anchor="middle">dar kapiller</text>`;
        const h = Math.max(t.h + h1.h + 18, cy + 8 + fb + 12 - y) + 4;
        s += kut('s3', 'Adım 3 · esneklik kaybı', x, y, w, h, 'w', ic); y += h; y3b = y;
      }
      /* 4 · iki mekanizma */
      const kutu4a = (x, y, w) => {
        const h1 = bas(x + 10, y + 18, '4a · Vasküler oklüzyon', w - 20);
        const cy = y + 18 + h1.h + 10, cx0 = x + 12;
        let ic = h1.svg;
        ic += `<line x1="${cx0}" y1="${cy - 7}" x2="${cx0 + 84}" y2="${cy - 7}" class="f08-cap"/><line x1="${cx0}" y1="${cy + 7}" x2="${cx0 + 84}" y2="${cy + 7}" class="f08-cap"/>`;
        [16, 38, 60].forEach((dx) => { ic += orak(cx0 + dx, cy - 3, 24, 16, 'f08-orakc'); });
        ic += `<rect x="${cx0 + 94}" y="${cy - 13}" width="${Math.min(76, w - 118)}" height="26" rx="6" class="f08-enf"/><text x="${cx0 + 94 + Math.min(76, w - 118) / 2}" y="${cy + 4}" class="f08-enft" style="font-size:${fb}px" text-anchor="middle">enfarkt</text>`;
        let yy = cy + 13 + fb + 8;
        ['viskozite ↑, venöz tromboz, iskemi', 'organ enfarktüsü: iskemik ağrı, işlev bozukluğu', 'çocuklukta dalak enfarktüsü → kapsüllü bakteri enfeksiyonu'].forEach((m) => {
          const t = D08_yaz(x + 22, yy, D08_sar(m, w - 34, fb), fb, 'f08-ot', 'start', lh);
          ic += `<circle cx="${x + 14}" cy="${yy - fb * 0.35}" r="2" class="f08-mad"/>` + t.svg; yy += t.h + 3;
        });
        return { ic, h: yy - y - fb + 8 };
      };
      const kutu4b = (x, y, w) => {
        const h1 = bas(x + 10, y + 18, '4b · Eritrosit ömrü kısalır', w - 20);
        const bx = x + 12, bw = w - 24, d = (g) => (bw * g) / 120;
        let yy = y + 18 + h1.h + 4, ic = h1.svg;
        ic += `<text x="${bx}" y="${yy}" class="f08-ot" style="font-size:${fb}px">normal 100–120 gün</text>`; yy += 5;
        ic += `<rect x="${bx}" y="${yy}" width="${d(100)}" height="10" rx="2" class="f08-bar ok"/><rect x="${bx + d(100)}" y="${yy}" width="${d(20)}" height="10" class="f08-bar ok r"/>`; yy += 10 + fb + 8;
        ic += `<text x="${bx}" y="${yy}" class="f08-ot" style="font-size:${fb}px">orak hücre 10–20 gün</text>`; yy += 5;
        ic += `<rect x="${bx}" y="${yy}" width="${bw}" height="10" rx="2" class="f08-bar bos"/><rect x="${bx}" y="${yy}" width="${d(10)}" height="10" rx="2" class="f08-bar cb"/><rect x="${bx + d(10)}" y="${yy}" width="${d(10)}" height="10" class="f08-bar cb r"/>`; yy += 10 + fb + 10;
        ic += `<text x="${bx}" y="${yy}" class="f08-ot b" style="font-size:${fb}px">Hb 7–11 g/dL + retikülositoz</text>`; yy += lh + 6;
        ic += `<rect x="${bx}" y="${yy - fb + 1}" width="3.2" height="${fb}" class="f08-dur"/><rect x="${bx + 5.5}" y="${yy - fb + 1}" width="3.2" height="${fb}" class="f08-dur"/>`;
        const t = D08_yaz(bx + 16, yy, D08_sar('parvovirüs B19: üretim 2–3 gün durur', bw - 16, fb), fb, 'f08-ot', 'start', lh);
        ic += t.svg; yy += t.h;
        return { ic, h: yy - y - fb + 10 };
      };
      if (!dar) {
        const w = (W - 12 - 8) / 2, xa = 6, xb = 6 + w + 8, yb = y + 18;
        s += ok(W / 2 - 10, y + 2, xa + w / 2 + 20, yb - 2) + ok(W / 2 + 10, y + 2, xb + w / 2 - 20, yb - 2);
        const A = kutu4a(xa, yb, w), B = kutu4b(xb, yb, w), h = Math.max(A.h, B.h);
        s += kut('s4a', 'Mekanizma 1 · vasküler oklüzyon', xa, yb, w, h, 'w', A.ic) + kut('s4b', 'Mekanizma 2 · eritrosit ömrü kısalır', xb, yb, w, h, 'b', B.ic);
        y = yb + h;
      } else {
        const x = 28, w = W - 34, ya = y + 16;
        const A = kutu4a(x, ya, w), yb2 = ya + A.h + 12, B = kutu4b(x, yb2, w);
        s += `<path d="M${W / 2},${y3b + 1} V${y3b + 8} H14 V${yb2 + 22} " class="f08-ince" fill="none"/>` + ok(14, ya + 22, x - 2, ya + 22) + ok(14, yb2 + 22, x - 2, yb2 + 22);
        s += kut('s4a', 'Mekanizma 1 · vasküler oklüzyon', x, ya, w, A.h, 'w', A.ic) + kut('s4b', 'Mekanizma 2 · eritrosit ömrü kısalır', x, yb2, w, B.h, 'b', B.ic);
        y = yb2 + B.h;
      }
      /* klinik şerit */
      y += 10;
      const kl = D08_yaz(W / 2, y + fb + 7, D08_sar('Vazo-oklüzif kriz: hidrasyon · analjezi · kan değişimi transfüzyonu', W - 32, fb), fb, 'f08-ot b', 'middle', lh);
      s += `<rect x="6" y="${y}" width="${W - 12}" height="${kl.h + 12}" rx="8" class="f08-klin"/>` + kl.svg;
      y += kl.h + 12 + 6;
      el.innerHTML = `<svg class="f08-osvg${dar ? ' dar' : ''}" viewBox="0 0 ${W} ${Math.ceil(y)}" role="img" aria-label="Orak hücre hastalığı: mutasyondan klinik tabloya akış şeması"><defs><marker id="f08-ok-asagi" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--muted)"/></marker><pattern id="f08-tarama" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.2" style="fill:var(--warn)"/></pattern></defs>${s}</svg>`;
      svg = el.querySelector('svg');
      D08_isaretle(svg, S.al());
    };
    const S = D08_secim(el, null, M, (k) => { if (svg) D08_isaretle(svg, k); });
    return D08_duzen(el, ciz);
  };

  /* ---------- 9 · MetHb, CO, siyanür: üç duraklama noktası ---------- */
  VIZ.f08_zehir = (el) => {
    const Z = {
      normal: { ad: 'Normal', dur: [], kap: 'normal', egri: 'normal, P50 ≈ 3,5 kPa', ox: '≈%97', kay: false, cap: '<b>Normal yol.</b> O₂ alveolden kana geçer, hemoglobine bağlanır, doku kapillerinde bırakılır ve mitokondride sitokrom c oksidaz tarafından kullanılır. [[K1 s. 30, 36]]' },
      methb: { ad: 'MetHb', dur: [1, 2], kap: 'azalır ("fonksiyonel anemi")', egri: 'sola kayar', ox: 'belirgin düzeyde ≈%85', kay: true, cap: '<b>MetHb · Fe³⁺.</b> Ferrik demir O₂ bağlayamaz: toplam içerik düşer ("fonksiyonel anemi") ve kalan normal hemoglobinin eğrisi sola kayarak dokuya daha az O₂ bırakılır. Kitaba göre nabız oksimetresi (belirgin MetHb\'de) ≈%85 gösterir; doğru ölçüm CO-oksimetreyledir. Tedavi hafif olguda ilave O₂, ağır olguda metilen mavisidir. [[K1 s. 35]]' },
      cohb: { ad: 'COHb', dur: [1, 2], kap: 'azalır', egri: 'sola kayar', ox: 'yanlış yüksek (COHb, O₂Hb sayılır)', kay: true, cap: '<b>COHb.</b> Karbonmonoksit Fe²⁺\'ye O₂ gibi geri dönüşümlü ama 250 kat yüksek afiniteyle bağlanır: hemoglobin tercihen COHb oluşturur, kapasite düşer ve eğri sola kayar. Tedavi yüksek PaO₂ ile (yüksek FiO₂ ya da hiperbarik oda) CO\'nun kompetitif olarak uzaklaştırılmasıdır. [[K1 s. 35–36]]' },
      cn: { ad: 'Siyanür', dur: [1, 3], asil: 3, kap: 'azalır (geri dönüşümsüz bağlanma)', egri: '—', ox: '—', kay: false, cap: '<b>Siyanür.</b> Kitaba göre hemoglobine geri dönüşümsüz bağlanıp O₂ ile düzelmeyen bir fonksiyonel anemi yapar; asıl toksik etki ise mitokondriyal sitokrom c oksidazın (Kompleks IV) inhibisyonudur. Kan dokudan O₂ bırakmadan geçtiği için venöz kan parlak kırmızıdır (miks venöz satürasyon yüksek) ve laktik asidoz gelişir. [[K1 s. 36]]' },
    };
    const SIRA = ['normal', 'methb', 'cohb', 'cn'];
    const cap = el.closest('.viz').querySelector('.viz-cap');
    let z = 'normal', dar = null;
    el.innerHTML = `<div class="seg f08-zseg" role="group" aria-label="Durum">${SIRA.map((k) => `<button type="button" data-z="${k}" aria-pressed="${k === z}">${Z[k].ad}</button>`).join('')}</div>
      <div class="f08-zs"></div>
      <dl class="f08-zoku"><div><dt>Taşıma kapasitesi</dt><dd data-o="kap"></dd></div><div><dt>Eğri</dt><dd data-o="egri"></dd></div><div><dt>Nabız oksimetresi</dt><dd data-o="ox"></dd></div></dl>`;
    const kap = el.querySelector('.f08-zs');
    const mini = (kay) => {
      const X = (p) => -36 + (p / 10) * 40, Y = (sv) => -26 - (sv / 100) * 26;
      const yol = (p50) => { let d = ''; for (let p = 0; p <= 10.01; p += 0.25) d += (d ? ' L' : 'M') + X(p).toFixed(1) + ',' + Y(sat(p, p50)).toFixed(1); return d; };
      return `<path d="M-36,-54 V-26 H4" class="f08-zax"/>` + (kay ? `<path d="${yol(P50N)}" class="f08-zc n d"/><path d="${yol(2.2)}" class="f08-zc w"/>` : `<path d="${yol(P50N)}" class="f08-zc n"/>`);
    };
    /* durak çizimleri (yerel 0,0), s = seçili durum, kes = O₂'nin kesildiği durak dizini */
    const art = [
      () => `<circle cx="0" cy="-18" r="28" class="f08-alv"/>${[[-10, -26], [9, -22], [-2, -6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.6" class="f08-o2 z"/>`).join('')}`,
      (s) => {
        const U = [[-15, -33, 'a'], [15, -33, 'a'], [-15, -3, 'b'], [15, -3, 'b']];
        let g = '';
        U.forEach(([x, y, c], i) => {
          const sx = Math.sign(x), sy = y < -18 ? -1 : 1, hx = x + sx * 14, hy = y + sy * 13, lx = hx + sx * 9, ly = hy + sy * 6;
          const boz = (i === 0 || i === 3) && s !== 'normal';
          const hemc = boz && s === 'methb' ? 'f08-hem w' : 'f08-hem';
          const lig = boz ? (s === 'methb' ? '' : `<circle cx="${lx}" cy="${ly}" r="4" class="${s === 'cohb' ? 'f08-lco' : 'f08-lcn'}"/>`) : `<circle cx="${lx}" cy="${ly}" r="4" class="f08-o2 z"/>`;
          g += `<circle cx="${x}" cy="${y}" r="12.5" class="f08-su ${c}"/>${`<polygon class="${hemc}" points="${[0, 1, 2, 3, 4, 5].map((k) => `${(hx + 5 * Math.cos(k * Math.PI / 3)).toFixed(1)},${(hy + 5 * Math.sin(k * Math.PI / 3)).toFixed(1)}`).join(' ')}"/>`}${lig}`;
        });
        const lab = { normal: 'Fe²⁺·O₂', methb: 'Fe³⁺', cohb: 'Fe²⁺·CO', cn: 'CN⁻' }[s];
        return g + `<rect x="-29" y="-26" width="58" height="16" rx="5" class="f08-zchip${s === 'normal' ? '' : ' w'}"/><text x="0" y="-14.5" class="f08-zchipt" text-anchor="middle">${lab}</text>`;
      },
      (s, kes) => {
        const az = s === 'methb' || s === 'cohb';
        let g = mini(Z[s].kay);
        g += `<line x1="-40" y1="-14" x2="40" y2="-14" class="f08-cap"/><line x1="-40" y1="2" x2="40" y2="2" class="f08-cap"/>`;
        g += [-26, -6, 14].map((x) => `<circle cx="${x}" cy="-6" r="3.4" class="f08-o2 z"/>`).join('');
        g += [-20, 0, 20].map((x, i) => `<line x1="${x}" y1="5" x2="${x}" y2="17" class="f08-zo${az && i ? ' sonuk' : ''}" marker-end="url(#f08-z-ok2)"/>`).join('');
        g += `<rect x="-40" y="20" width="80" height="6" rx="2" class="f08-doku"/>`;
        return g;
      },
      () => `<ellipse cx="0" cy="-18" rx="40" ry="24" class="f08-mito"/><path d="M-30,-18 l6,-10 l6,18 l6,-18 l6,18 l6,-18 l6,18 l6,-18 l6,18 l6,-10" class="f08-krista"/><circle cx="-34" cy="-34" r="3.6" class="f08-o2 z"/>`,
    ];
    const ROL = ['Alım', 'Bağlanma', 'Bırakma', 'Kullanma'];
    const AD = [['Alveol', 'PO₂ 13 kPa'], ['Hemoglobin'], ['Doku kapilleri'], ['Mitokondri', 'Kompleks IV', 'sitokrom c oksidaz']];
    const ciz = () => {
      const s = z, Zs = Z[s], kes = Zs.dur.length ? Math.min(...Zs.dur) : 9;
      let W, H, pos, ws, hh = 168, fr, fn, oklar;
      if (!dar) {
        ws = [74, 90, 94, 110]; let x = 2; pos = ws.map((w) => { const c = [x + w / 2, 86]; x += w + 16; return c; });
        W = 420; H = s === 'cn' ? 200 : 172; fr = 10.5; fn = 9.5;
        oklar = [0, 1, 2].map((i) => [[pos[i][0] + ws[i] / 2 + 1, 68], [pos[i + 1][0] - ws[i + 1] / 2 - 1, 68]]);
      } else {
        ws = [146, 146, 146, 146]; pos = [[80, 86], [240, 86], [240, 290], [80, 290]];
        W = 320; H = s === 'cn' ? 420 : 380; fr = 12; fn = 11;
        oklar = [[[154, 68], [166, 68]], [[240, 171], [240, 205]], [[166, 272], [154, 272]]];
      }
      let g = `<svg class="f08-zsvg${dar ? ' dar' : ''}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Oksijenin alveolden mitokondriye yolu ve üç zehrin kestiği basamaklar"><defs><marker id="f08-z-ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--muted)"/></marker><marker id="f08-z-ok2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--crit)"/></marker></defs>`;
      oklar.forEach(([[x1, y1], [x2, y2]], i) => {
        const son = i >= kes ? ' sonuk' : '';
        g += `<g class="f08-zok${son}"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="f08-ince" marker-end="url(#f08-z-ok)"/>${dar && i === 1 ? `<circle cx="${x1}" cy="${(y1 + y2) / 2 - 3}" r="3.4" class="f08-o2 z"/>` : ''}</g>`;
      });
      pos.forEach(([cx, cy], i) => {
        const w = ws[i], vur = Zs.dur.includes(i), asil = Zs.asil === i, son = i > kes ? ' sonuk' : '';
        const adl = AD[i];
        const rol = ROL[i];
        g += `<g transform="translate(${cx},${cy})" class="f08-dk${vur ? ' kes' : ' ok'}${asil ? ' asil' : ''}${son}">
          <rect x="${-w / 2}" y="${-hh / 2 + 6}" width="${w}" height="${hh - 12}" rx="10" class="f08-dkf"/>
          <text x="0" y="${-hh / 2 + 22}" class="f08-rol" style="font-size:${fr}px" text-anchor="middle">${rol}</text>
          <g class="f08-dka">${art[i](s, kes)}</g>
          ${adl.map((t, j) => `<text x="0" y="${42 + j * (fn * 1.3)}" class="f08-dkn${j ? '' : ' b'}" style="font-size:${fn}px" text-anchor="middle">${t}</text>`).join('')}
          ${vur ? `<g class="f08-zx" transform="translate(${w / 2 - 8},${-hh / 2 + 10})"><circle r="10"/><line x1="-5" y1="-5" x2="5" y2="5"/><line x1="5" y1="-5" x2="-5" y2="5"/></g>` : ''}
        </g>`;
      });
      if (s === 'cn') {
        const [cx, cy] = pos[3], x = dar ? cx : W - 4, an = dar ? 'middle' : 'end', y0 = cy + hh / 2 + fn + 4;
        g += D08_yaz(x, y0, ['asıl toksik etki: Kompleks IV'], fn, 'f08-asilt', an).svg;
        g += D08_yaz(x, y0 + fn * 1.35, D08_sar('hidroksokobalamin mitokondriye girer', dar ? 150 : 220, fn), fn, 'f08-hk', an).svg;
      }
      kap.innerHTML = g + '</svg>';
      el.querySelector('[data-o="kap"]').textContent = Zs.kap;
      el.querySelector('[data-o="egri"]').textContent = Zs.egri;
      el.querySelector('[data-o="ox"]').textContent = Zs.ox;
      el.querySelectorAll('[data-z]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.z === s)));
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-z]'); if (!b) return;
      z = b.dataset.z; cap.innerHTML = REF(Z[z].cap); ciz();
    });
    return D08_duzen(kap, (d) => { dar = d; ciz(); });
  };
})();
