/* EDAIC Sınav Atlası · etkileşimli bileşenler.
   Her bileşen VIZ.ad(el) ile kurulur ve bir temizleme işlevi döndürür (sayfa değişince animasyonlar durur).
   Metinlerdeki [[S6 s. 7]] işaretleri REF() ile kaynak düğmesine çevrilir. */
(function () {
  'use strict';
  const VIZ = (window.VIZ = {});
  const RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* [[S6 s. 7]] → kaynak düğmesi */
  const REF = (window.REF = (html) => String(html).replace(/\[\[(S\d+)(?:\s+([^\]]+))?\]\]/g, (m, k, s) => {
    const lbl = k + (s ? ' · ' + s.replace(/^s\.\s*/, '') : '');
    return `<button type="button" class="ref" data-k="${k}"${s ? ` data-s="${esc(s)}"` : ''} aria-label="Kaynak ${esc(lbl)}">${esc(lbl)}</button>`;
  }));

  /* rAF döngüsü: görünürken çalışır, temizlenince durur */
  function ticker(el, step) {
    let raf = 0, last = 0, on = true, vis = true;
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((e) => { vis = e[0].isIntersecting; }) : null;
    if (io) io.observe(el);
    const loop = (t) => {
      if (!on) return;
      const dt = last ? Math.min(0.1, (t - last) / 1000) : 0;
      last = t;
      if (vis) step(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { on = false; cancelAnimationFrame(raf); if (io) io.disconnect(); };
  }
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* özel pencere: yalnız bu oturum */ } },
  };
  const mmss = (m) => { const s = Math.max(0, Math.round(m * 60)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  const hm = (m) => { const v = Math.max(0, Math.round(m)); return Math.floor(v / 60) + ' sa ' + String(v % 60).padStart(2, '0') + ' dk'; };

  /* ---------- Giriş: yol haritası ---------- */
  VIZ.yol = (el) => {
    const D = VERI.yol;
    el.innerHTML = `<div class="yol-w"><div class="bar"></div><ol class="yol">${D.map((n, i) => `<li><button type="button" data-i="${i}" aria-label="${i + 1}. ${esc(n.k)}"><span class="dot">${i + 1}</span><span class="lbl">${esc(n.k)}</span><span class="sub">${esc(n.s)}</span></button></li>`).join('')}</ol></div><div class="yol-panel" aria-live="polite"></div>`;
    const lis = [...el.querySelectorAll('.yol li')], bar = el.querySelector('.bar'), panel = el.querySelector('.yol-panel');
    const btn = el.closest('.viz') && el.closest('.viz').querySelector('[data-yol-play]');
    let i = 0, auto = !RM, timer = 0;
    const show = (k) => {
      i = k;
      lis.forEach((li, j) => { li.classList.toggle('on', j === k); li.classList.toggle('done', j < k); });
      bar.style.width = (k / (D.length - 1)) * 83.34 + '%';
      panel.innerHTML = `<h4>${k + 1} · ${esc(D[k].h)}</h4><p>${REF(D[k].t)}</p>`;
    };
    const sync = () => { if (btn) btn.textContent = auto ? 'Duraklat' : 'Oynat'; };
    const tick = () => { if (auto) show((i + 1) % D.length); };
    timer = setInterval(tick, 4200);
    el.addEventListener('click', (e) => { const b = e.target.closest('button[data-i]'); if (!b) return; auto = false; sync(); show(+b.dataset.i); });
    const onBtn = () => { auto = !auto; sync(); if (auto) tick(); };
    if (btn) btn.addEventListener('click', onBtn);
    show(0); sync();
    return () => { clearInterval(timer); if (btn) btn.removeEventListener('click', onBtn); };
  };

  /* ---------- Part I sınav günü ---------- */
  VIZ.gun1 = (el) => {
    const MOD = {
      kagit: [{ c: 'A', k: 'Paper A', s: 'temel bilimler', m: 120, tr: 30 }, { c: 'ara', k: 'Ara', s: '', m: 90 }, { c: 'B', k: 'Paper B', s: 'klinik', m: 120, tr: 30 }],
      pc: [{ c: 'A', k: 'Paper A', s: 'temel bilimler', m: 90 }, { c: 'ara', k: 'Ara', s: '', m: 90 }, { c: 'B', k: 'Paper B', s: 'klinik', m: 90 }],
    };
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Sınav biçimi"><button type="button" data-m="kagit" aria-pressed="true">Kâğıt üzerinde</button><button type="button" data-m="pc" aria-pressed="false">Bilgisayarda</button></div><button type="button" class="btn ghost play">Oynat</button></div>
      <div class="tl"></div>
      <div class="tl-read"><span><b class="clk">0 sa 00 dk</b> geçen süre</span><span class="ph"></span></div>
      <p class="viz-cap"></p>
      <p class="viz-foot">Kesik çizgili bölge: cevapları optik forma aktarmak için önerilen ≈30 dakika (yalnız kâğıt sınavda). [[S6 s. 6]]</p>`;
    el.querySelector('.viz-foot').innerHTML = REF(el.querySelector('.viz-foot').innerHTML);
    const tl = el.querySelector('.tl'), clk = el.querySelector('.clk'), ph = el.querySelector('.ph'), cap = el.querySelector('.viz-cap'), play = el.querySelector('.play');
    let mod = 'kagit', t = 0, run = false, segs = [], cur;
    const total = () => MOD[mod].reduce((a, s) => a + s.m, 0);
    const build = () => {
      tl.innerHTML = MOD[mod].map((s) => `<div class="seg-b ${s.c}" style="flex:${s.m} 1 0"><b>${s.k}${s.s ? ' · ' + s.s : ''}</b><span>${s.m} dk</span>${s.tr ? `<i class="tr" style="width:${(s.tr / s.m) * 100}%"></i>` : ''}</div>`).join('') + '<i class="cur"></i>';
      segs = [...tl.querySelectorAll('.seg-b')]; cur = tl.querySelector('.cur');
    };
    const draw = () => {
      let acc = 0, idx = 0;
      const S = MOD[mod];
      for (idx = 0; idx < S.length; idx++) { if (t < acc + S[idx].m || idx === S.length - 1) break; acc += S[idx].m; }
      const s = S[idx], f = Math.min(1, (t - acc) / s.m), sg = segs[idx];
      cur.style.left = sg.offsetLeft + f * sg.offsetWidth - 1 + 'px';
      clk.textContent = hm(t);
      const inTr = s.tr && t - acc >= s.m - s.tr;
      ph.textContent = s.k + (inTr ? ' · aktarma' : '');
      cap.innerHTML = s.c === 'ara' ? '<b>90 dakika ara.</b> İki kâğıt arasında. [[S6 s. 3]]'
        : inTr ? '<b>Aktarma.</b> Kitapçıkta işaretlenen cevaplar verilen kurşun kalemle optik forma geçirilir. Yalnızca form puanlanır; kitapçıktaki işaretlere bakılmaz. [[S6 s. 6]] [[S9]]'
        : mod === 'pc' ? `<b>${s.k}</b> · 60 soru, 300 önerme, 90 dakika. Bilgisayarda cevaplar doğrudan girilir, ayrı bir aktarma adımı yoktur. [[S6 s. 6]] [[S7 s. 4]]`
        : `<b>${s.k}</b> · 60 soru, 300 önerme, 120 dakika. ${s.c === 'A' ? 'Avrupa\'da sabah yapılır.' : 'Avrupa\'da öğleden sonra yapılır.'} [[S6 s. 6]]`;
      cap.innerHTML = REF(cap.innerHTML);
    };
    const set = (m) => { mod = m; t = 0; el.querySelectorAll('[data-m]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.m === m))); build(); draw(); };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-m]'); if (b) { set(b.dataset.m); run = false; play.textContent = 'Oynat'; } });
    play.addEventListener('click', () => { if (t >= total()) t = 0; run = !run; play.textContent = run ? 'Duraklat' : 'Oynat'; });
    set('kagit');
    const ro = 'ResizeObserver' in window ? new ResizeObserver(draw) : null; if (ro) ro.observe(tl);
    const stop = ticker(el, (dt) => { if (!run) return; t += dt * (total() / 14); if (t >= total()) { t = total(); run = false; play.textContent = 'Baştan'; } draw(); });
    return () => { stop(); if (ro) ro.disconnect(); };
  };

  /* ---------- Part I: MTF örneği + optik form ---------- */
  VIZ.mtf = (el) => {
    const Q = VERI.mtf, L = 'ABCDE';
    let ans = [null, null, null, null, null], scored = false, timers = [];
    el.innerHTML = `<div class="mtf">
      <div class="mtf-meta">ÖRNEK · bu atlas için yazıldı, resmi soru değildir · ${esc(Q.kagit)}</div>
      <div class="mtf-stem">1. ${esc(Q.kok)}</div>
      ${Q.onermeler.map((o, i) => `<div class="mtf-row" data-i="${i}"><span class="let">${L[i]}</span><span class="txt">${esc(o.t)}<span class="res"></span></span><span class="tf" role="group" aria-label="${L[i]} önermesi"><button type="button" data-v="1" aria-pressed="false" title="Doğru">D</button><button type="button" data-v="0" aria-pressed="false" title="Yanlış">Y</button></span><span class="why">${esc(o.n)}</span></div>`).join('')}
      <div class="btn-row" style="margin-top:14px"><button type="button" class="btn" data-a="puan">Puanla</button><button type="button" class="btn ghost" data-a="aktar">Cevap kâğıdına aktar</button><button type="button" class="btn ghost" data-a="sifir">Sıfırla</button></div>
      <div class="mtf-score" hidden></div>
      <div class="omr" aria-label="Şematik optik cevap formu"><div class="omr-h">Optik cevap formu · şematik</div><div class="omr-row"><span class="q">1</span>${[...L].map((c) => `<span class="omr-col"><span class="cl">${c}</span><span class="bb"><i data-c="${c}" data-v="1">T</i><i data-c="${c}" data-v="0">F</i></span></span>`).join('')}</div></div>
      <p class="viz-foot">${REF('İngilizce talimatta formdaki daireler T (true, doğru) ve F (false, yanlış) diye adlandırılır; HB kurşun kalemle tamamen doldurulur. [[S9]]')}</p>
    </div>`;
    const box = el.querySelector('.mtf'), sc = el.querySelector('.mtf-score');
    const paint = () => el.querySelectorAll('.mtf-row').forEach((r, i) => r.querySelectorAll('.tf button').forEach((b) => b.setAttribute('aria-pressed', String(ans[i] !== null && +b.dataset.v === (ans[i] ? 1 : 0)))));
    const score = () => {
      let ok = 0, no = 0, bos = 0;
      el.querySelectorAll('.mtf-row').forEach((r, i) => {
        const res = r.querySelector('.res');
        if (ans[i] === null) { bos++; res.className = 'res bos'; res.textContent = 'boş · 0'; }
        else if (ans[i] === Q.onermeler[i].d) { ok++; res.className = 'res ok'; res.textContent = '+1'; }
        else { no++; res.className = 'res no'; res.textContent = 'yanlış · 0'; }
      });
      scored = true; box.classList.add('scored'); sc.hidden = false;
      sc.innerHTML = `<span class="big">${ok}/5</span><span>Doğru ${ok} · yanlış ${no} · boş ${bos}</span><span class="small muted" style="flex-basis:100%">${REF('Yanlış ve boş cevap aynı şekilde 0 puandır, negatif puan yoktur [[S2]]. Boş bırakılan önermenin değeri her zaman 0, rastgele işaretlenen bir önermenin ortalama değeri 0,5 puandır. Bir kâğıtta 300 önerme vardır.')}</span>`;
    };
    const clearOmr = () => { timers.forEach(clearTimeout); timers = []; el.querySelectorAll('.omr i').forEach((i) => i.classList.remove('fill')); };
    el.addEventListener('click', (e) => {
      const tb = e.target.closest('.tf button');
      if (tb) {
        const i = +tb.closest('.mtf-row').dataset.i, v = tb.dataset.v === '1';
        ans[i] = ans[i] === v ? null : v; paint(); clearOmr();
        if (scored) score();
        return;
      }
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'puan') score();
      if (a.dataset.a === 'sifir') { ans = [null, null, null, null, null]; scored = false; box.classList.remove('scored'); sc.hidden = true; paint(); clearOmr(); }
      if (a.dataset.a === 'aktar') {
        clearOmr();
        ans.forEach((v, i) => { if (v === null) return; timers.push(setTimeout(() => { const c = el.querySelector(`.omr i[data-c="${L[i]}"][data-v="${v ? 1 : 0}"]`); if (c) c.classList.add('fill'); }, RM ? 0 : 260 * (i + 1))); });
      }
    });
    return () => timers.forEach(clearTimeout);
  };

  /* ---------- Part I: iki kâğıt, iki ayrı eşik ---------- */
  VIZ.esik = (el) => {
    const SEN = [
      { k: 'İkisi de eşiğin üstünde', A: 76, B: 71, v: true, t: 'Her iki kâğıtta da eşik aşıldı: <b>Part I geçildi.</b>' },
      { k: 'Biri eşiğin altında', A: 88, B: 52, v: false, t: 'Paper A çok iyi olsa da Paper B eşiğin altında. Kâğıtlar ayrı değerlendirilir, biri diğerini telafi etmez: <b>Part I geçilemedi.</b> [[S6 s. 7]]' },
    ];
    el.innerHTML = `<div class="viz-head"><h3>Kâğıtlar ayrı ayrı değerlendirilir</h3></div>
      <div class="seg" role="group" aria-label="Senaryo">${SEN.map((s, i) => `<button type="button" data-i="${i}" aria-pressed="${i === 0}">${s.k}</button>`).join('')}</div>
      ${['A', 'B'].map((p) => `<div class="esik-row ${p}"><span class="nm">Paper ${p}</span><div class="esik-track"><div class="esik-fill"></div><i class="esik-mark" style="left:${p === 'A' ? 62 : 60}%" data-l="eşik*"></i></div><span class="st"></span></div>`).join('')}
      <div style="margin-top:16px"><span class="verdict"></span></div>
      <p class="viz-cap"></p>
      <p class="viz-foot">Her kâğıt 0–300 puan. * Eşiğin yeri şematiktir. Geçme notu her yıl Sınav Komitesince kâğıdın zorluğuna ve referans sorulardaki performansa göre belirlenir; burada sayı verilmez. [[S7 s. 5]]</p>`;
    el.querySelector('.viz-foot').innerHTML = REF(el.querySelector('.viz-foot').innerHTML);
    const rows = { A: el.querySelector('.esik-row.A'), B: el.querySelector('.esik-row.B') };
    const show = (i) => {
      const s = SEN[i];
      el.querySelectorAll('[data-i]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === i)));
      ['A', 'B'].forEach((p) => {
        const r = rows[p], thr = parseFloat(r.querySelector('.esik-mark').style.left), ok = s[p] >= thr;
        r.querySelector('.esik-fill').style.width = '0%';
        requestAnimationFrame(() => requestAnimationFrame(() => { r.querySelector('.esik-fill').style.width = s[p] + '%'; }));
        const st = r.querySelector('.st'); st.textContent = ok ? 'üstünde' : 'altında'; st.style.color = ok ? 'var(--ok)' : 'var(--crit)';
      });
      const v = el.querySelector('.verdict'); v.className = 'verdict ' + (s.v ? 'ok' : 'no'); v.textContent = s.v ? 'Part I geçildi' : 'Part I geçilemedi';
      el.querySelector('.viz-cap').innerHTML = REF(s.t);
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) show(+b.dataset.i); });
    show(0);
    return () => {};
  };

  /* ---------- Part II: günün akışı ---------- */
  VIZ.gun2 = (el) => {
    const S = VERI.soe;
    const soe = (s) => `<button type="button" class="blok soe ${s.grup}" data-id="${s.id}" aria-pressed="false"><b>SOE ${s.id}</b><span>${esc(s.bas)}</span><span>25 dk · 2 sınavcı</span></button>`;
    const prep = '<div class="blok prep"><b>Hazırlık</b><span>10 dk</span></div>';
    el.innerHTML = `<div class="gun2-wrap"><div class="gun2-days">
      <div class="gun2-half"><h4>Sabah · temel bilim</h4><div class="gun2-pair">${prep}${soe(S[0])}${prep}${soe(S[1])}</div></div>
      <div class="gun2-sep">öğle arası</div>
      <div class="gun2-half"><h4>Öğleden sonra · klinik</h4><div class="gun2-pair">${prep}${soe(S[2])}${prep}${soe(S[3])}</div></div>
      <div class="gun2-half"><h4>Gün sonu</h4><div class="blok prep" style="height:100%"><b>Call-over → sonuç</b><span>Sınavcılar puanları birlikte gözden geçirir; sonuç aynı gün.</span></div></div>
    </div><div class="gun2-detail" aria-live="polite"></div></div>`;
    const det = el.querySelector('.gun2-detail');
    const show = (id) => {
      el.querySelectorAll('.blok.soe').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.id === id)));
      const s = S[id - 1];
      det.innerHTML = `<span class="tag ${s.grup}">${esc(s.yari)}</span><h3 style="margin-top:8px">SOE ${s.id} · ${esc(s.bas)}</h3><p>${REF(s.t)}</p>`;
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('.blok.soe'); if (b) show(+b.dataset.id); });
    show(1);
    return () => {};
  };

  /* ---------- Part II: bir SOE (animasyon) ----------
     İki yerleşim: geniş (yan yana odalar) ve dar (telefon: hazırlık odası üstte, sınav masası altta). */
  const SOE_L = {
    genis: { W: 720, H: 330, x0: 10, bw: 700, lab: ['Hazırlık · 10 dk', 'Sınavcı 1 soruyor · 12,5 dk', 'Sınavcı 2 soruyor · 12,5 dk'],
      prep: [10, 52, 200, 200], desk: [40, 150, 140], pclock: [110, 232], exam: [230, 52, 480, 200], table: [390, 132, 230, 50],
      e1: [450, 108], e2: [560, 108], ring: [300, 160], bell: [690, 72], A: [110, 118], B: [505, 215], chips: [246, 266, 84, 92], note: [18, 288, ['5 yönlendirilmiş soru,', 'her biri eşit puan değerinde']] },
    dar: { W: 360, H: 470, x0: 8, bw: 344, lab: ['Hazırlık', 'S1 soruyor', 'S2 soruyor'],
      prep: [8, 48, 344, 112], desk: [40, 120, 150], pclock: [280, 120], exam: [8, 172, 344, 212], table: [110, 262, 210, 44],
      e1: [165, 238], e2: [265, 238], ring: [58, 290], bell: [322, 196], A: [115, 98], B: [215, 352], chips: [8, 396, 64, 70], note: [8, 456, ['5 yönlendirilmiş soru · eşit puan değeri']] },
  };
  VIZ.soe = (el) => {
    const PREP = 10, SOE = 25, TOT = PREP + SOE, QEND = [6.5, 11.5, 16, 21, 25];
    el.innerHTML = `<div class="soe-svg"></div>
    <div class="soe-ctl"><button type="button" class="btn play">Oynat</button><button type="button" class="btn ghost" data-a="bas">Baştan</button><input type="range" min="0" max="${TOT}" step="0.1" value="0" aria-label="Zaman"><span class="clock"></span></div>
    <p class="viz-cap" aria-live="polite"></p>
    <p class="viz-foot">${REF('Soruların süreye dağılımı örnektir; rehber yalnızca beş sorunun 25 dakikada bitirilmesi gerektiğini ve hepsinin eşit değerde olduğunu söyler. [[S6 s. 8]]')}</p>`;
    const box = el.querySelector('.soe-svg'), range = el.querySelector('input[type=range]'), play = el.querySelector('.play'), clock = el.querySelector('.clock'), cap = el.querySelector('.viz-cap');
    const C = 2 * Math.PI * 34, MONO = 'font-family="JetBrains Mono, monospace"', DISP = 'font-family="Archivo, sans-serif"';
    let L, yer = '', R = {}, t = 0, run = false, lastCap = '';
    const px = (m) => L.x0 + (m / TOT) * L.bw;
    const kur = () => {
      const y = el.clientWidth < 560 ? 'dar' : 'genis';
      if (y === yer) return;
      yer = y; L = SOE_L[y];
      const [p0, p1, p2, p3] = L.prep, [x0e, y0e, we, he] = L.exam, [tx, ty, tw, th] = L.table;
      const bar = (a, b, fill, ink, lab) => `<rect x="${px(a) + (a ? 2 : 0)}" y="8" width="${px(b) - px(a) - (a ? 2 : 0)}" height="26" rx="6" fill="${fill}"/><text x="${(px(a) + px(b)) / 2}" y="25" text-anchor="middle" font-size="12" fill="${ink}">${lab}</text>`;
      const ex = (c, [x, yy], k) => `<g class="s-ex${k}"><circle cx="${x}" cy="${yy}" r="20" fill="var(--paper)" stroke="var(--muted)" stroke-width="2"/><text x="${x}" y="${yy + 5}" text-anchor="middle" ${MONO} font-weight="700" font-size="13" fill="var(--ink)">S${k}</text></g><text class="s-r${k}" x="${x}" y="${yy - 28}" text-anchor="middle" ${DISP} font-weight="700" font-size="12.5"></text>`;
      const [cx0, cy0, cw, cg] = L.chips;
      box.innerHTML = `<svg class="soe-stage" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Bir SOE'nin akışı: 10 dakika hazırlık, 25 dakika sınav, 12,5. dakikada sınavcıların rol değiştirmesi">
      <g ${MONO}>${bar(0, PREP, 'var(--chip)', 'var(--muted)', L.lab[0])}${bar(PREP, PREP + 12.5, 'var(--c-clin-soft)', 'var(--c-clin)', L.lab[1])}${bar(PREP + 12.5, TOT, 'var(--c-basic-soft)', 'var(--c-basic)', L.lab[2])}
        <line class="s-cur" y1="4" y2="38" stroke="var(--ink)" stroke-width="3"/></g>
      <rect x="${p0}" y="${p1}" width="${p2}" height="${p3}" rx="14" fill="var(--bg)" stroke="var(--line)"/>
      <text x="${p0 + 16}" y="${p1 + 24}" ${DISP} font-weight="700" font-size="14" fill="var(--muted)">Hazırlık odası</text>
      <rect x="${L.desk[0]}" y="${L.desk[1]}" width="${L.desk[2]}" height="14" rx="4" fill="var(--line)"/>
      <text class="s-prepclock" x="${L.pclock[0]}" y="${L.pclock[1]}" text-anchor="middle" ${MONO} font-weight="700" font-size="22" fill="var(--ink)">10:00</text>
      <rect x="${x0e}" y="${y0e}" width="${we}" height="${he}" rx="14" fill="var(--bg)" stroke="var(--line)"/>
      <text x="${x0e + 16}" y="${y0e + 24}" ${DISP} font-weight="700" font-size="14" fill="var(--muted)">Sınav masası</text>
      <rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="10" fill="var(--chip)" stroke="var(--line)"/>
      ${ex(0, L.e1, 1)}${ex(0, L.e2, 2)}
      <g class="s-wave" fill="none" stroke="var(--c-clin)" stroke-width="2.4" stroke-linecap="round"><path d="M26,-8 q6,8 0,16"/><path d="M34,-13 q9,13 0,26"/></g>
      <g class="s-bell" opacity="0" transform="translate(${L.bell[0]},${L.bell[1]})"><path d="M-14,20 c0,-12 6,-20 14,-20 s14,8 14,20 v10 l5,6 h-38 l5,-6z" fill="var(--accent)"/><circle cx="0" cy="42" r="4" fill="var(--accent)"/><text x="0" y="64" text-anchor="middle" ${DISP} font-weight="800" font-size="12" fill="var(--accent-ink)">ZİL</text></g>
      <g transform="translate(${L.ring[0]},${L.ring[1]})"><circle r="34" fill="none" stroke="var(--chip)" stroke-width="8"/><circle class="s-ring" r="34" fill="none" stroke="var(--accent)" stroke-width="8" stroke-linecap="round" transform="rotate(-90)" stroke-dasharray="0 999"/><text class="s-clock" y="6" text-anchor="middle" ${MONO} font-weight="700" font-size="15" fill="var(--ink)">00:00</text></g>
      <g class="s-paper"><rect x="-11" y="-14" width="22" height="28" rx="2" fill="#FAF7EE" stroke="#B9A97F"/><path d="M-6,-6h12M-6,0h12M-6,6h8" stroke="#8A7A55" stroke-width="1.6"/></g>
      <g class="s-cand"><circle r="18" fill="var(--accent)"/><text y="5" text-anchor="middle" ${DISP} font-weight="800" font-size="12" fill="var(--on-accent)">Aday</text></g>
      ${[0, 1, 2, 3, 4].map((i) => `<g class="s-q"><rect x="${cx0 + i * cg}" y="${cy0}" width="${cw}" height="34" rx="8" fill="var(--chip)" stroke="var(--line)"/><text x="${cx0 + i * cg + cw / 2}" y="${cy0 + 22}" text-anchor="middle" ${MONO} font-weight="700" font-size="12.5" fill="var(--muted)">Soru ${i + 1}</text></g>`).join('')}
      ${L.note[2].map((s, i) => `<text x="${L.note[0]}" y="${L.note[1] + i * 16}" ${MONO} font-size="11.5" fill="var(--muted)">${s}</text>`).join('')}
      </svg>`;
      const $ = (s) => box.querySelector(s);
      R = { cand: $('.s-cand'), paper: $('.s-paper'), ring: $('.s-ring'), sclock: $('.s-clock'), pclock: $('.s-prepclock'), cur: $('.s-cur'),
        r1: $('.s-r1'), r2: $('.s-r2'), wave: $('.s-wave'), bell: $('.s-bell'), ex1: $('.s-ex1 circle'), ex2: $('.s-ex2 circle'), q: [...box.querySelectorAll('.s-q')] };
      lastCap = '';
    };
    const lerp = (a, b, f) => a + (b - a) * f;
    const ease = (f) => (f < 0 ? 0 : f > 1 ? 1 : f * f * (3 - 2 * f));
    const draw = () => {
      const f = ease((t - (PREP - 0.6)) / 1.2);
      const cx = lerp(L.A[0], L.B[0], f), cy = lerp(L.A[1], L.B[1], f) - Math.sin(f * Math.PI) * 30;
      R.cand.setAttribute('transform', `translate(${cx},${cy})`);
      R.paper.setAttribute('transform', `translate(${cx + (f > 0.5 ? -48 : 34)},${cy + (f > 0.5 ? -8 : 10)})`);
      const sm = Math.max(0, t - PREP);
      R.ring.setAttribute('stroke-dasharray', `${(sm / SOE) * C} 999`);
      R.sclock.textContent = mmss(sm);
      R.pclock.textContent = mmss(Math.max(0, PREP - t));
      R.pclock.setAttribute('opacity', t < PREP ? 1 : 0.35);
      R.cur.setAttribute('x1', px(t)); R.cur.setAttribute('x2', px(t));
      const ask1 = t >= PREP && sm < 12.5, ask2 = sm >= 12.5 && t > PREP;
      R.r1.textContent = t < PREP ? '' : ask1 ? 'soruyor' : 'not alıyor';
      R.r2.textContent = t < PREP ? '' : ask2 ? 'soruyor' : 'not alıyor';
      R.r1.setAttribute('fill', ask1 ? 'var(--c-clin)' : 'var(--muted)'); R.r2.setAttribute('fill', ask2 ? 'var(--c-basic)' : 'var(--muted)');
      R.ex1.setAttribute('stroke', ask1 ? 'var(--c-clin)' : 'var(--muted)'); R.ex2.setAttribute('stroke', ask2 ? 'var(--c-basic)' : 'var(--muted)');
      R.ex1.setAttribute('stroke-width', ask1 ? 3.5 : 2); R.ex2.setAttribute('stroke-width', ask2 ? 3.5 : 2);
      const e = ask2 ? L.e2 : L.e1;
      R.wave.setAttribute('opacity', t >= PREP && t < TOT ? 0.45 + 0.55 * Math.abs(Math.sin(t * 7)) : 0);
      R.wave.setAttribute('transform', `translate(${e[0]},${e[1]})`);
      R.wave.setAttribute('stroke', ask2 ? 'var(--c-basic)' : 'var(--c-clin)');
      R.bell.setAttribute('opacity', sm >= 12.5 && sm < 14 ? 0.6 + 0.4 * Math.abs(Math.sin(t * 12)) : 0);
      R.q.forEach((g, i) => {
        const start = i ? QEND[i - 1] : 0, on = t > PREP && sm >= start && sm < QEND[i], done = t > PREP && sm >= QEND[i];
        const r = g.querySelector('rect'), tx = g.querySelector('text');
        r.setAttribute('fill', done ? 'var(--accent-soft)' : on ? 'var(--accent)' : 'var(--chip)');
        r.setAttribute('stroke', on || done ? 'var(--accent)' : 'var(--line)');
        tx.setAttribute('fill', on ? 'var(--on-accent)' : done ? 'var(--accent-ink)' : 'var(--muted)');
      });
      range.value = t.toFixed(1);
      clock.textContent = t < PREP ? 'Hazırlık ' + mmss(t) : 'SOE ' + mmss(sm);
      let c;
      if (t < PREP) c = '<b>Hazırlık (10 dk).</b> Giriş senaryosu ya da sorusu seçtiğiniz dilde bir kâğıtta verilir; notlarınızı bu kâğıda alırsınız. Puanlanan yalnızca sözlü cevaptır. [[S6 s. 12]]';
      else if (sm < 12.5) c = '<b>SOE başladı.</b> Önce hazırlandığınız giriş sorusu konuşulur. Bir sınavcı sorar, diğeri not alır. [[S6 s. 7–8]]';
      else if (sm < 14) c = '<b>12,5. dakika: zil.</b> İki sınavcı rol değiştirir. [[S6 s. 8]]';
      else if (sm < SOE) c = '<b>Roller değişti.</b> Şimdi ikinci sınavcı soruyor. Bir konuda ikna ettiyseniz uzatmayın: beş sorunun hepsi aynı değerde. [[S6 s. 8]]';
      else c = '<b>25 dakika doldu.</b> İki sınavcı her soru için ayrı ayrı 0, 1 ya da 2 puan verir. Sorular ve notlar masada bırakılır (çevrim içinde yırtılıp atılır). [[S6 s. 8]] [[S10 s. 2–3]]';
      if (c !== lastCap) { cap.innerHTML = REF(c); lastCap = c; }
    };
    play.addEventListener('click', () => { if (t >= TOT) t = 0; run = !run; play.textContent = run ? 'Duraklat' : 'Oynat'; });
    el.querySelector('[data-a="bas"]').addEventListener('click', () => { t = 0; draw(); });
    range.addEventListener('input', () => { t = +range.value; run = false; play.textContent = 'Oynat'; draw(); });
    kur(); draw();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => { const y = yer; kur(); if (y !== yer) draw(); }) : null;
    if (ro) ro.observe(el);
    const stop = ticker(el, (dt) => { if (!run) return; t += dt / 0.6; if (t >= TOT) { t = TOT; run = false; play.textContent = 'Baştan'; } draw(); });
    return () => { stop(); if (ro) ro.disconnect(); };
  };

  /* ---------- Part II: puan simülatörü ---------- */
  VIZ.puan = (el) => {
    const SEN = VERI.puanSenaryo;
    let p = SEN[1].p.map((r) => r.slice()), aktif = 'esik';
    const NAMES = ['SOE 1 · fizyoloji, anatomi', 'SOE 2 · farmakoloji, ölçüm', 'SOE 3 · anestezi', 'SOE 4 · yoğun bakım, acil'];
    el.innerHTML = `<div class="puan-presets" role="group" aria-label="Hazır senaryolar">${SEN.map((s) => `<button type="button" data-s="${s.id}">${esc(s.ad)}</button>`).join('')}</div>
      <div class="puan-grid">
        <div class="puan-soe hdr"><span class="nm"></span>${[1, 2, 3, 4, 5].map((i) => `<span class="puan-head">Soru ${i}</span>`).join('')}<span class="puan-head" style="text-align:right">/20</span></div>
        ${p.map((row, s) => `${s === 2 ? '<div class="puan-sep"></div>' : ''}<div class="puan-soe" data-s="${s}"><span class="nm">${NAMES[s].split(' · ')[0]}<span>${NAMES[s].split(' · ')[1]}</span></span>${[0, 1, 2, 3, 4].map((q) => `<span class="puan-q">${[0, 1].map((e) => `<button type="button" data-q="${q * 2 + e}" title="SOE ${s + 1}, soru ${q + 1}, sınavcı ${e + 1}"></button>`).join('')}</span>`).join('')}<span class="sum"></span></div>`).join('')}
      </div>
      <p class="viz-foot">Her soruda iki kutu: sol sınavcı 1, sağ sınavcı 2. Kutuya bastıkça 2 → 1 → 0. Senaryolar bu atlas için örnektir.</p>
      <div class="meters"></div>
      <div class="puan-out"><span class="verdict"></span><span class="why small"></span></div>`;
    const meters = el.querySelector('.meters'), verdict = el.querySelector('.verdict'), why = el.querySelector('.why');
    const sum = (a) => a.reduce((x, y) => x + y, 0);
    const meter = (t, v, max, thr) => {
      const ok = v >= thr;
      return `<div class="meter ${ok ? 'ok' : 'no'}"><div class="t">${t}</div><div class="v">${v}<small> / ${max}</small></div><div class="trk"><div class="fl" style="width:${(v / max) * 100}%"></div><i class="th" style="left:${(thr / max) * 100}%"></i></div><div class="ck">${ok ? '✓' : '✗'} en az ${thr} gerekir</div></div>`;
    };
    const render = () => {
      el.querySelectorAll('.puan-presets button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.s === aktif)));
      el.querySelectorAll('.puan-soe[data-s]').forEach((r) => {
        const s = +r.dataset.s;
        r.querySelectorAll('button[data-q]').forEach((b) => { const v = p[s][+b.dataset.q]; b.dataset.v = v; b.textContent = v; });
        r.querySelector('.sum').textContent = sum(p[s]);
      });
      const am = sum(p[0]) + sum(p[1]), pm = sum(p[2]) + sum(p[3]), tot = am + pm;
      meters.innerHTML = meter('Sabah · SOE 1 + 2', am, 40, 25) + meter('Öğleden sonra · SOE 3 + 4', pm, 40, 25) + meter('Toplam', tot, 80, 60);
      const fails = [];
      if (am < 25) fails.push('sabah puanı 25\'in altında');
      if (pm < 25) fails.push('öğleden sonra puanı 25\'in altında');
      if (tot < 60) fails.push('toplam 60\'ın altında');
      verdict.className = 'verdict ' + (fails.length ? 'no' : 'ok');
      verdict.textContent = fails.length ? 'Kaldı' : 'Geçti';
      why.innerHTML = REF(fails.length ? 'Neden: ' + fails.join(', ') + '. Üç koşulun hepsi gerekir. [[S6 s. 8]]'
        : 'Üç koşul da sağlandı. [[S6 s. 8]]');
    };
    el.addEventListener('click', (e) => {
      const ps = e.target.closest('.puan-presets button');
      if (ps) { const s = SEN.find((x) => x.id === ps.dataset.s); p = s.p.map((r) => r.slice()); aktif = s.id; render(); return; }
      const b = e.target.closest('button[data-q]'); if (!b) return;
      const s = +b.closest('.puan-soe').dataset.s, q = +b.dataset.q;
      p[s][q] = (p[s][q] + 2) % 3; aktif = ''; render();
    });
    render();
    return () => {};
  };

  /* ---------- Beklenen bilgi: alan haritası ---------- */
  VIZ.alanlar = (el) => {
    const A = VERI.alanlar, COLS = [['A', 'Paper A'], ['B', 'Paper B'], ['s1', 'SOE 1'], ['s2', 'SOE 2'], ['s3', 'SOE 3'], ['s4', 'SOE 4']];
    el.innerHTML = `<div class="tbl-wrap"><table class="tbl alan-tbl">
      <thead><tr><th rowspan="2">Alan</th><th colspan="2" class="c">Part I</th><th colspan="4" class="c">Part II</th></tr><tr>${COLS.map((c) => `<th class="c">${c[1]}</th>`).join('')}</tr></thead>
      <tbody>${A.map((a, i) => `<tr data-i="${i}" tabindex="0" aria-label="${esc(a.ad)}"><th>${esc(a.ad)}</th>${COLS.map(([k]) => `<td class="dot">${a.yer[k] ? `<span class="d ${a.yer[k] === 1 ? a.grup : 'part'}" aria-label="${a.yer[k] === 1 ? 'sınanır' : 'dolaylı'}"></span>` : ''}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>
    <div class="legend"><span><i style="background:var(--c-basic);border-radius:50%"></i>temel bilim, rehberde açıkça</span><span><i style="background:var(--c-clin);border-radius:50%"></i>klinik, rehberde açıkça</span><span><i style="border:2px solid var(--muted);border-radius:50%"></i>rehberde dolaylı</span></div>
    <div class="alan-detail card" aria-live="polite"></div>`;
    const det = el.querySelector('.alan-detail');
    const show = (i) => {
      el.querySelectorAll('tbody tr').forEach((r) => r.classList.toggle('on', +r.dataset.i === i));
      const a = A[i];
      det.innerHTML = `<span class="tag ${a.grup}">${a.grup === 'basic' ? 'Temel bilim' : 'Klinik'}</span><h3 style="margin-top:8px">${esc(a.ad)}</h3><h4 style="margin-top:10px">Kapsam</h4><p>${REF(a.ozet)}</p><h4 style="margin-top:12px">Part II'de</h4><p>${REF(a.p2)}</p>`;
    };
    el.addEventListener('click', (e) => { const r = e.target.closest('tbody tr'); if (r && !e.target.closest('.ref')) show(+r.dataset.i); });
    el.addEventListener('keydown', (e) => { const r = e.target.closest('tbody tr'); if (r && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); show(+r.dataset.i); } });
    show(0);
    return () => {};
  };

  /* ---------- Part I stratejileri (60 soruluk kâğıt) ---------- */
  VIZ.strateji = (el) => {
    // örnek dağılım: 30 emin, 20 düşünülmeli, 10 tahmin (sabit, sözde rastgele sıra)
    const KAT = Array.from({ length: 60 }, (_, i) => { const r = (i * 37 + 11) % 60; return r < 30 ? 'emin' : r < 50 ? 'dus' : 'tah'; });
    const STR = {
      s1: { fazlar: ['Soru 1–20 · 30 dk', 'Soru 21–40 · 30 dk', 'Soru 41–60 · 30 dk', 'Forma aktarma · 30 dk'],
        cap: ['<b>Strateji 1:</b> soruları 20\'lik üç gruba bölün ve her gruba yaklaşık 30 dakika ayırın.', 'İkinci grup: yine yaklaşık 30 dakika.', 'Üçüncü grup: yine yaklaşık 30 dakika.', 'Son yaklaşık 30 dakika: cevapları kitapçıktan optik forma aktarın.'] },
      s2: { fazlar: ['Hızlı ilk tur', 'Emin + tahmin → form', 'Düşünülecekler', 'Kalanlar → form'],
        cap: ['<b>Strateji 2:</b> bütün soruları başta hızla geçin ve cevapları ayrı işaretleyin: emin olduklarınız, biraz düşünmeniz gerekenler ve tamamen tahmin edecekleriniz.', 'Emin olduğunuz cevapları, isterseniz tamamen tahmin ettiklerinizi de hemen optik forma geçirin.', 'Kalan süreyi düşünmeniz gereken sorulara ayırın.', 'Son olarak bu cevapları da forma geçirin.'] },
    };
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Strateji"><button type="button" data-k="s1" aria-pressed="true">Strateji 1 · üç blok</button><button type="button" data-k="s2" aria-pressed="false">Strateji 2 · hızlı tur</button></div><div class="btn-row"><button type="button" class="btn play">Oynat</button><button type="button" class="btn ghost" data-a="bas">Baştan</button></div></div>
      <div class="qgrid">${KAT.map((_, i) => `<i data-i="${i}" title="Soru ${i + 1}"></i>`).join('')}</div>
      <div class="phase"></div>
      <p class="viz-cap" aria-live="polite"></p>
      <div class="legend"></div>
      <p class="viz-foot"></p>`;
    const cells = [...el.querySelectorAll('.qgrid i')], phase = el.querySelector('.phase'), cap = el.querySelector('.viz-cap'), legend = el.querySelector('.legend'), foot = el.querySelector('.viz-foot'), play = el.querySelector('.play');
    let k = 's1', t = 0, run = false, lastF = -1;
    const DUR = 16; // saniye
    const draw = () => {
      const S = STR[k], f = Math.min(3, Math.floor((t / DUR) * 4)), fr = ((t / DUR) * 4) - f;
      if (f !== lastF) { phase.innerHTML = S.fazlar.map((x, i) => `<div class="${i === f ? 'on' : i < f ? 'past' : ''}">${x}</div>`).join(''); cap.innerHTML = REF(S.cap[f] + ' [[S6 s. 6]]'); lastF = f; }
      cells.forEach((c, i) => {
        let cls = '';
        if (k === 's1') {
          const blk = Math.floor(i / 20), pos = (i % 20) / 20;
          const answered = blk < f || (blk === f && f < 3 && pos < fr) || f === 3;
          const trf = f === 3 && i / 60 < fr || t >= DUR;
          cls = (answered ? 'done' : '') + (trf ? ' trf' : '') + (blk === f && f < 3 && Math.floor(fr * 20) === i % 20 ? ' now' : '');
        } else {
          const seen = f > 0 || i / 60 < fr;
          const dusIdx = KAT.slice(0, i + 1).filter((x) => x === 'dus').length - 1;
          let col = seen ? KAT[i] : '';
          if (KAT[i] === 'dus' && (f === 3 || (f === 2 && dusIdx / 20 < fr))) col = 'done';
          const trf = (KAT[i] !== 'dus' && (f > 1 || (f === 1 && fr > 0.5))) || (KAT[i] === 'dus' && (t >= DUR || (f === 3 && dusIdx / 20 < fr)));
          cls = col + (trf ? ' trf' : '') + (f === 0 && Math.floor(fr * 60) === i ? ' now' : '');
        }
        if (c.className !== cls.trim()) c.className = cls.trim();
      });
    };
    const setK = (x) => {
      k = x; t = 0; lastF = -1; run = false; play.textContent = 'Oynat';
      el.querySelectorAll('[data-k]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.k === x)));
      legend.innerHTML = x === 's1'
        ? '<span><i style="background:var(--c-basic)"></i>kitapçıkta cevaplandı</span><span><i style="background:var(--c-basic);box-shadow:inset 0 0 0 3px var(--paper)"></i>forma aktarıldı</span>'
        : '<span><i style="background:var(--ok)"></i>emin</span><span><i style="background:var(--warn)"></i>biraz düşünmeli</span><span><i style="background:var(--muted)"></i>tahmin</span><span><i style="background:var(--c-basic)"></i>düşünülüp cevaplandı</span><span><i style="background:var(--ink);box-shadow:inset 0 0 0 3px var(--paper)"></i>forma aktarıldı</span>';
      foot.innerHTML = REF(x === 's1' ? 'Kâğıt sınav, 120 dakika. Bilgisayarda (90 dakika) cevaplar doğrudan girildiği için aktarma adımı yoktur. [[S6 s. 6]]'
        : 'Emin, düşünülmeli ve tahmin dağılımı örnektir; rehber bu strateji için süre önermez. Rehberin notu: herkesin kendi yolu vardır, ama bunu sınavdan önce düşünmek akıllıcadır. [[S6 s. 6]]');
      draw();
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (b) setK(b.dataset.k); });
    play.addEventListener('click', () => { if (t >= DUR) { t = 0; lastF = -1; } run = !run; play.textContent = run ? 'Duraklat' : 'Oynat'; });
    el.querySelector('[data-a="bas"]').addEventListener('click', () => { t = 0; lastF = -1; draw(); });
    setK('s1');
    const stop = ticker(el, (dt) => { if (!run) return; t = Math.min(DUR, t + dt); if (t >= DUR) { run = false; play.textContent = 'Baştan'; } draw(); });
    return stop;
  };

  /* ---------- adım adım anlatıcı (senaryo) ---------- */
  function stepper(el, steps, opts) {
    let i = 0, auto = false, timer = 0, sub = 0, subTimer = 0;
    el.innerHTML = `${opts.top || ''}<div class="stepper"><div><ol>${steps.map((s, j) => `<li><button type="button" data-i="${j}" aria-current="false"><span class="k">${j + 1}</span>${esc(s.k)}</button></li>`).join('')}</ol>
      <div class="btn-row" style="margin-top:10px"><button type="button" class="btn ghost play">Sırayla oynat</button></div></div>
      <div class="step-side">${opts.side || ''}<div class="step-text" aria-live="polite"></div></div></div>${opts.foot ? `<p class="viz-foot">${REF(opts.foot)}</p>` : ''}`;
    const txt = el.querySelector('.step-text'), play = el.querySelector('.play');
    const show = (j) => {
      i = j; clearInterval(subTimer); sub = 0;
      el.querySelectorAll('.stepper ol button').forEach((b) => b.setAttribute('aria-current', String(+b.dataset.i === j)));
      txt.innerHTML = `<h3>${j + 1} · ${esc(steps[j].k)}</h3><p>${REF(steps[j].t)}</p>${steps[j].ex ? `<p class="ex">${REF(steps[j].ex)}</p>` : ''}`;
      if (opts.onStep) { opts.onStep(j, 0); if (steps[j].seq && !RM) subTimer = setInterval(() => { sub = (sub + 1) % steps[j].hl.length; opts.onStep(j, sub); }, 1400); }
    };
    const sync = () => { play.textContent = auto ? 'Duraklat' : 'Sırayla oynat'; };
    const next = () => { if (!auto) return; if (i >= steps.length - 1) { auto = false; sync(); return; } show(i + 1); };
    el.addEventListener('click', (e) => { const b = e.target.closest('.stepper ol button'); if (b) { auto = false; sync(); show(+b.dataset.i); } });
    play.addEventListener('click', () => { auto = !auto; sync(); if (auto) { if (i >= steps.length - 1) show(0); clearInterval(timer); timer = setInterval(next, opts.ms || 5200); } else clearInterval(timer); });
    show(0);
    return () => { clearInterval(timer); clearInterval(subTimer); };
  }

  VIZ.senaryo = (el) => stepper(el, VERI.senaryo.adimlar, {
    top: `<h4>Rehberdeki örnek senaryo ${REF('[[S6 s. 10]]')}</h4><p class="case" style="margin-top:6px">${esc(VERI.senaryo.vaka)}</p>`,
    foot: 'Adımlar rehberin bu örnek için önerdiği yapıdan; ipuçları rehberin sınav tekniği bölümünden. VKİ, rehberdeki boy ve kilodan hesaplandı. [[S6 s. 10–11]]',
  });

  /* ---------- şematik akciğer grafisi ---------- */
  function cxrSvg() {
    const ribs = (side) => Array.from({ length: 10 }, (_, i) => { const y = 66 + i * 29; return side > 0 ? `M210,${y} C250,${y - 20} 300,${y - 10} 318,${y + 28}` : `M190,${y} C150,${y - 20} 100,${y - 10} 82,${y + 28}`; });
    const ribPaths = (cls, w, op) => [...ribs(-1), ...ribs(1)].map((d) => `<path d="${d}" class="${cls}" fill="none" stroke-width="${w}" opacity="${op}"/>`).join('');
    const verts = Array.from({ length: 20 }, (_, i) => `<rect x="188" y="${8 + i * 21}" width="24" height="17" rx="3" fill="#8d8d8d" opacity=".42"/><ellipse cx="200" cy="${16 + i * 21}" rx="4" ry="3" fill="#bcbcbc" opacity=".45"/>`).join('');
    const G = '#F2C964';
    const lbl = (x, y, t, a) => `<text x="${x}" y="${y}" fill="${G}" font-size="12.5" font-weight="700"${a ? ` text-anchor="${a}"` : ''} paint-order="stroke" stroke="#050505" stroke-width="4">${t}</text>`;
    return `<svg class="cxr" viewBox="0 0 400 440" role="img" aria-label="Şematik AP yatarak akciğer grafisi: endotrakeal tüp, santral venöz kateter, nazogastrik sonda ve EKG elektrotları">
<defs>
  <filter id="cxb" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="3.2"/></filter>
  <filter id="cxb2"><feGaussianBlur stdDeviation="1.1"/></filter>
  <radialGradient id="cxbody" cx="50%" cy="42%" r="72%"><stop offset="0" stop-color="#6d6d6d"/><stop offset="1" stop-color="#262626"/></radialGradient>
  <radialGradient id="cxlung" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#1e1e1e"/><stop offset="1" stop-color="#0d0d0d"/></radialGradient>
  <linearGradient id="cxheart" x1="0" x2="1"><stop offset="0" stop-color="#cfcfcf"/><stop offset="1" stop-color="#b4b4b4"/></linearGradient>
</defs>
<rect width="400" height="440" fill="#050505"/>
<g filter="url(#cxb)">
  <path d="M130,6 C128,48 70,62 40,104 C26,150 22,300 24,440 L376,440 C378,300 374,150 360,104 C330,62 272,48 270,6 Z" fill="url(#cxbody)"/>
  <path d="M30,380 C110,322 170,330 200,362 C232,342 300,334 370,388 L376,440 L24,440Z" fill="#8c8c8c"/>
  <path d="M188,74 C150,74 98,112 84,170 C72,230 72,320 84,372 C118,334 162,330 186,352 Z" fill="url(#cxlung)"/>
  <path d="M212,74 C250,74 302,112 316,170 C328,230 328,320 316,384 C292,350 262,344 240,348 L214,300 Z" fill="url(#cxlung)"/>
  <path d="M186,60 L214,60 L224,204 L178,204 Z" fill="#989898"/>
  <ellipse cx="228" cy="138" rx="18" ry="16" fill="#a9a9a9"/>
  <path d="M182,206 C156,222 146,292 166,342 C196,368 286,368 304,334 C318,300 286,232 238,214 C220,206 200,204 182,206 Z" fill="url(#cxheart)"/>
  <ellipse cx="272" cy="404" rx="26" ry="14" fill="#191919"/>
</g>
<g filter="url(#cxb2)">
  ${verts}
  ${ribPaths('rb', 7, 0.5).replace(/class="rb"/g, 'stroke="#a0a0a0"')}
  <path d="M188,58 C160,66 130,48 92,54" stroke="#d8d8d8" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M212,58 C240,66 270,48 308,54" stroke="#d8d8d8" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M200,6 L200,150" stroke="#2a2a2a" stroke-width="15" stroke-linecap="round"/>
  <path d="M200,150 L176,188" stroke="#2a2a2a" stroke-width="10" stroke-linecap="round"/>
  <path d="M200,150 L238,192" stroke="#2a2a2a" stroke-width="9" stroke-linecap="round"/>
</g>
<g fill="none" stroke-linecap="round">
  <path d="M200,0 L200,150" stroke="#f4f4f4" stroke-width="3.2"/>
  <path d="M150,4 C158,40 178,66 184,104 L186,176" stroke="#ececec" stroke-width="2.2"/>
  <path d="M212,0 L213,150 C216,250 220,330 248,388 C258,402 268,405 282,402" stroke="#e2e2e2" stroke-width="2.2"/>
  <circle cx="104" cy="96" r="9" fill="#8e8e8e" stroke="#e6e6e6" stroke-width="2"/><circle cx="296" cy="96" r="9" fill="#8e8e8e" stroke="#e6e6e6" stroke-width="2"/><circle cx="304" cy="318" r="9" fill="#8e8e8e" stroke="#e6e6e6" stroke-width="2"/>
  <path d="M104,87 L96,40 M296,87 L310,40 M313,318 L360,300" stroke="#bdbdbd" stroke-width="1.4"/>
</g>
<rect x="16" y="16" width="26" height="26" rx="3" fill="#e9e9e9"/><text x="29" y="35" text-anchor="middle" fill="#111" font-weight="700" font-size="18">R</text>
<text x="384" y="34" text-anchor="end" fill="#cfcfcf" font-size="13" font-weight="700">AP · SUPİN</text>
<g fill="none" stroke="${G}" stroke-width="2.2">
  <g class="hl" id="hl-mark"><rect x="10" y="10" width="38" height="38" rx="6"/><rect x="292" y="18" width="98" height="24" rx="6"/>${lbl(56, 34, 'taraf işareti')}${lbl(384, 62, 'projeksiyon', 'end')}</g>
  <g class="hl" id="hl-rot"><circle cx="186" cy="60" r="8"/><circle cx="214" cy="60" r="8"/><path d="M200,36 V86" stroke-dasharray="4 4"/>${lbl(222, 98, 'rotasyon: klavikula uçları')}</g>
  <g class="hl" id="hl-pen"><rect x="184" y="222" width="32" height="118" rx="6" stroke-dasharray="5 4"/>${lbl(222, 290, 'kalp arkası vertebralar')}</g>
  <g class="hl" id="hl-insp">${Array.from({ length: 10 }, (_, i) => lbl(64, 98 + i * 29, String(i + 1), 'end')).join('')}${lbl(40, 420, '≈10 arka kaburga')}</g>
  <g class="hl" id="hl-soft"><path d="M130,6 C128,48 70,62 40,104 C26,150 22,300 24,440 M270,6 C272,48 330,62 360,104 C374,150 378,300 376,440"/>${lbl(32, 240, 'yumuşak doku')}</g>
  <g class="hl" id="hl-bone"><path d="M188,58 C160,66 130,48 92,54 M212,58 C240,66 270,48 308,54"/>${ribs(-1).slice(2, 7).map((d) => `<path d="${d}"/>`).join('')}<rect x="186" y="8" width="28" height="420" rx="6" stroke-dasharray="4 4"/>${lbl(320, 80, 'klavikula, kaburga,', 'end')}${lbl(320, 96, 'omurga', 'end')}</g>
  <g class="hl" id="hl-lung"><path d="M188,74 C150,74 98,112 84,170 C72,230 72,320 84,372 C118,334 162,330 186,352 Z"/><path d="M212,74 C250,74 302,112 316,170 C328,230 328,320 316,384 C292,350 262,344 240,348 L214,300 Z"/>${lbl(130, 200, 'sağ', 'middle')}${lbl(284, 200, 'sol', 'middle')}</g>
  <g class="hl" id="hl-heart"><path d="M182,206 C156,222 146,292 166,342 C196,368 286,368 304,334 C318,300 286,232 238,214 C220,206 200,204 182,206 Z"/>${lbl(236, 300, 'kalp', 'middle')}</g>
  <g class="hl" id="hl-med"><path d="M186,60 L214,60 L224,204 L178,204 Z"/><ellipse cx="228" cy="138" rx="18" ry="16"/>${lbl(252, 142, 'aort topuzu')}${lbl(150, 150, 'trakea', 'end')}</g>
  <g class="hl" id="hl-dia"><path d="M84,372 C118,334 162,330 186,352 M214,360 C240,342 292,346 316,384"/><circle cx="84" cy="372" r="9"/><circle cx="316" cy="384" r="9"/>${lbl(120, 326, 'diyafram')}</g>
  <g class="hl" id="hl-abd"><ellipse cx="272" cy="404" rx="30" ry="18"/>${lbl(272, 434, 'mide gazı', 'middle')}</g>
  <g class="hl" id="hl-dev"><path d="M200,0 L200,150"/><path d="M150,4 C158,40 178,66 184,104 L186,176"/><path d="M212,0 L213,150 C216,250 220,330 248,388 C258,402 268,405 282,402"/><circle cx="104" cy="96" r="12"/><circle cx="296" cy="96" r="12"/><circle cx="304" cy="318" r="12"/>${lbl(194, 120, 'ETT', 'end')}${lbl(140, 176, 'SVK', 'end')}${lbl(226, 260, 'NG')}${lbl(118, 118, 'EKG')}</g>
  <g class="hl" id="hl-dx"><circle cx="200" cy="150" r="13" stroke-width="3"/><path d="M216,154 L260,172"/>${lbl(262, 178, 'ETT ucu')}${lbl(262, 194, 'karinada')}</g>
</g>
</svg>`;
  }
  VIZ.grafi = (el) => {
    const steps = VERI.grafi, NAMES = { 'hl-soft': 'yumuşak doku', 'hl-bone': 'kemikler', 'hl-lung': 'akciğerler', 'hl-heart': 'kalp', 'hl-med': 'mediasten', 'hl-dia': 'diyafram', 'hl-abd': 'batın' };
    let noteEl;
    const cleanup = stepper(el, steps, {
      side: cxrSvg() + '<p class="small muted now" style="margin:8px 0 12px;min-height:1.4em"></p>',
      ms: 6500,
      foot: 'Adım başlıkları rehberin önerdiği sistemden [[S6 s. 11]]. Kalite ölçütleri ve tüp ucu yorumu açıklama için eklenmiş genel bilgilerdir; grafi bu atlas için çizilmiş bir şemadır.',
      onStep: (j, sub) => {
        const s = steps[j];
        el.querySelectorAll('.cxr .hl').forEach((g) => g.classList.remove('on'));
        const ids = s.seq ? [s.hl[sub]] : s.hl;
        ids.forEach((id) => { const g = el.querySelector('#' + id); if (g) g.classList.add('on'); });
        noteEl = noteEl || el.querySelector('.now');
        noteEl.textContent = s.seq ? 'Şimdi: ' + NAMES[s.hl[sub]] : '';
      },
    });
    return cleanup;
  };

  /* ---------- oksihemoglobin dissosiyasyon eğrisi çizimi ---------- */
  VIZ.ohdc = (el) => {
    const X0 = 64, X1 = 540, Y0 = 330, Y1 = 30, n = 2.7;
    const X = (p) => X0 + (p / 100) * (X1 - X0), Y = (s) => Y0 - (s / 100) * (Y0 - Y1);
    const hill = (p, p50) => (Math.pow(p, n) / (Math.pow(p, n) + Math.pow(p50, n))) * 100;
    const curve = (p50) => { let d = ''; for (let p = 0; p <= 100.001; p += 1) d += (p ? 'L' : 'M') + X(p).toFixed(1) + ',' + Y(hill(p, p50)).toFixed(1); return d; };
    const kpa = (m) => (m / 7.50062).toFixed(1).replace('.', ',');
    const STEPS = [
      { k: 'Eksenler', t: 'Eksenleri adlandırarak başlayın: yatay eksende PO₂ (kPa ya da mmHg), dikeyde hemoglobinin oksijen satürasyonu (%).' },
      { k: 'Normal eğri', t: 'Sigmoid biçimli eğri: hemoglobinin dört alt birimi oksijeni kooperatif bağlar; bir oksijen bağlandıkça diğerlerinin afinitesi artar.' },
      { k: 'Değerler', t: 'Önemli noktaları işaretleyin: P50 ≈ 3,5 kPa (27 mmHg) → %50; karışık venöz ≈ 5,3 kPa (40 mmHg) → ≈%75; arteriyel ≈ 13,3 kPa (100 mmHg) → ≈%97.' },
      { k: 'Sağa kayma', t: 'Sağa kayma (afinite azalır, P50 artar): sıcaklık artışı, PCO₂ artışı ve pH düşüşü (Bohr etkisi), 2,3-DPG artışı. Dokuya oksijen bırakmak kolaylaşır.' },
      { k: 'Sola kayma', t: 'Sola kayma (afinite artar, P50 düşer): hipotermi, PCO₂ düşüşü ve alkaloz, 2,3-DPG azalması, fetal hemoglobin, karbonmonoksit.' },
    ];
    const ticks = [0, 20, 40, 60, 80, 100];
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Çizim adımı">${STEPS.map((s, i) => `<button type="button" data-i="${i}" aria-pressed="false">${i + 1}. ${s.k}</button>`).join('')}</div><button type="button" class="btn ghost play">Baştan çiz</button></div>
    <svg class="ohdc" viewBox="0 0 560 390" role="img" aria-label="Oksihemoglobin dissosiyasyon eğrisi: normal, sağa ve sola kaymış eğriler">
      <g class="fade" data-s="0">
        ${ticks.map((t) => `<line class="gr" x1="${X(t)}" x2="${X(t)}" y1="${Y1}" y2="${Y0}"/><line class="gr" x1="${X0}" x2="${X1}" y1="${Y(t)}" y2="${Y(t)}"/><text class="tk" x="${X(t)}" y="${Y0 + 18}" text-anchor="middle">${t}</text><text class="tk" x="${X(t)}" y="${Y0 + 33}" text-anchor="middle" opacity=".75">${kpa(t)}</text><text class="tk" x="${X0 - 8}" y="${Y(t) + 4}" text-anchor="end">${t}</text>`).join('')}
        <line class="ax" x1="${X0}" x2="${X1}" y1="${Y0}" y2="${Y0}"/><line class="ax" x1="${X0}" x2="${X0}" y1="${Y0}" y2="${Y1}"/>
        <text class="lb" x="${X1}" y="${Y0 + 52}" text-anchor="end">PO₂ · mmHg (kPa)</text>
        <text class="lb" x="${X0 + 6}" y="${Y1 + 14}">SO₂ %</text>
      </g>
      <path class="cv r fade" data-s="3" d="${curve(32)}"/>
      <path class="cv l fade" data-s="4" d="${curve(20)}"/>
      <path class="cv n" data-s="1" d="${curve(26.8)}"/>
      <g class="fade" data-s="2">
        ${[[26.8, 50, 'P50'], [40, hill(40, 26.8), 'venöz'], [100, hill(100, 26.8), 'arteriyel']].map(([p, s, l]) => `<line class="gd" x1="${X(p)}" x2="${X(p)}" y1="${Y(s)}" y2="${Y0}"/><line class="gd" x1="${X0}" x2="${X(p)}" y1="${Y(s)}" y2="${Y(s)}"/><circle class="pt" cx="${X(p)}" cy="${Y(s)}" r="5.5"/><text class="lb" x="${X(p) + (p > 90 ? -8 : 10)}" y="${Y(s) + (p > 90 ? 22 : 18)}" text-anchor="${p > 90 ? 'end' : 'start'}">${l} · %${Math.round(s)}</text>`).join('')}
      </g>
      <g class="fade" data-s="3"><text class="lb" x="${X(50)}" y="${Y(52)}" style="fill:var(--crit)">sağa kayma: P50 ↑</text></g>
      <g class="fade" data-s="4"><text class="lb" x="${X(6)}" y="${Y(88)}" style="fill:var(--c-basic)">sola kayma: P50 ↓</text></g>
    </svg>
    <p class="viz-cap" aria-live="polite"></p>
    <p class="viz-foot">Şematik çizim: Hill denklemi, n = 2,7; P50 normalde 26,8, sağa kaymada 32, sola kaymada 20 mmHg (örnek değerler).</p>`;
    const svg = el.querySelector('svg'), cap = el.querySelector('.viz-cap'), play = el.querySelector('.play');
    const curves = [...svg.querySelectorAll('.cv')];
    curves.forEach((c) => { const L = c.getTotalLength ? c.getTotalLength() : 1200; c.style.strokeDasharray = L; c.dataset.len = L; });
    let step = -1, timers = [];
    const setStep = (s, animate) => {
      step = s;
      el.querySelectorAll('.seg [data-i]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === s)));
      svg.querySelectorAll('.fade').forEach((g) => g.classList.toggle('on', +g.dataset.s <= s));
      curves.forEach((c) => {
        const vis = +c.dataset.s <= s, L = c.dataset.len;
        c.style.transition = animate && !RM && +c.dataset.s === s ? 'stroke-dashoffset 1.6s ease' : 'none';
        c.style.opacity = vis ? 1 : 0;
        c.style.strokeDashoffset = vis ? 0 : L;
      });
      cap.textContent = STEPS[s].t;
    };
    const auto = () => {
      timers.forEach(clearTimeout); timers = [];
      curves.forEach((c) => { c.style.transition = 'none'; c.style.strokeDashoffset = c.dataset.len; c.style.opacity = 0; });
      STEPS.forEach((_, i) => timers.push(setTimeout(() => setStep(i, true), RM ? 0 : 120 + i * 2300)));
    };
    el.addEventListener('click', (e) => { const b = e.target.closest('.seg [data-i]'); if (b) { timers.forEach(clearTimeout); setStep(+b.dataset.i, true); } });
    play.addEventListener('click', auto);
    let started = false;
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((en) => { if (en[0].isIntersecting && !started) { started = true; auto(); } }, { threshold: 0.35 }) : null;
    if (io) io.observe(svg); else auto();
    setStep(0, false);
    return () => { timers.forEach(clearTimeout); if (io) io.disconnect(); };
  };

  /* ---------- kontrol listeleri ---------- */
  function checklist(el, key, groups) {
    const done = store.get(key) || {};
    const all = groups.flatMap((g) => g.m);
    el.innerHTML = `<div class="chk-prog"><span class="cnt"></span><span class="trk"><span class="fl"></span></span><button type="button" class="btn ghost" data-a="sil" style="padding:7px 11px;font-size:12.5px">Temizle</button></div>
      <div class="chk">${groups.map((g) => `<div>${g.g ? `<h3>${esc(g.g)}</h3>` : ''}${g.m.map((m) => `<label class="${done[m.id] ? 'on' : ''}"><input type="checkbox" data-id="${m.id}"${done[m.id] ? ' checked' : ''}><span>${esc(m.t)} ${REF(m.r || '')}</span></label>`).join('')}</div>`).join('')}</div>`;
    const prog = () => {
      const n = all.filter((m) => done[m.id]).length;
      el.querySelector('.cnt').textContent = `${n}/${all.length}`;
      el.querySelector('.fl').style.width = (n / all.length) * 100 + '%';
    };
    el.addEventListener('change', (e) => { const c = e.target.closest('input[data-id]'); if (!c) return; done[c.dataset.id] = c.checked; if (!c.checked) delete done[c.dataset.id]; c.closest('label').classList.toggle('on', c.checked); store.set(key, done); prog(); });
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) e.preventDefault(); // kaynak düğmesi kutuyu işaretlemesin
      if (e.target.closest('[data-a="sil"]')) { Object.keys(done).forEach((k) => delete done[k]); store.set(key, done); el.querySelectorAll('input[data-id]').forEach((c) => { c.checked = false; c.closest('label').classList.remove('on'); }); prog(); }
    });
    prog();
    return () => {};
  }
  VIZ.liste = (el) => checklist(el, 'edaic-hazirlik-listesi', VERI.liste);
  VIZ.ekipman = (el) => checklist(el, 'edaic-cevrimici-donanim', [{ g: '', m: VERI.ekipman.map((m, i) => ({ id: 'e' + i, t: m.t, r: m.r })) }]);

  /* ---------- yıllık takvim ---------- */
  VIZ.takvim = (el) => {
    const AY = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    const E = VERI.takvim;
    el.innerHTML = `<div class="takvim">${AY.map((a, m) => `<div class="ay"><h4>${a}</h4>${E.map((e, i) => (e.ay === m ? `<button type="button" class="ev ${e.c}" data-i="${i}" aria-pressed="false">${esc(e.k)}</button>` : '')).join('')}</div>`).join('')}</div>
      <div class="legend"><span><i style="background:var(--c-basic)"></i>Part I</span><span><i style="background:var(--c-clin)"></i>Part II</span><span><i style="background:var(--accent)"></i>OLA/HOLA</span><span><i style="border:1.5px dashed var(--muted)"></i>kayıt</span></div>
      <p class="takvim-detail" aria-live="polite"></p>`;
    const det = el.querySelector('.takvim-detail');
    const show = (i) => { el.querySelectorAll('.ev').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === i))); det.innerHTML = `<b>${esc(E[i].k)}.</b> ${REF(E[i].t)}`; };
    el.addEventListener('click', (e) => { const b = e.target.closest('.ev'); if (b) show(+b.dataset.i); });
    show(E.findIndex((e) => e.ay === 11));
    return () => {};
  };

  /* ---------- kaynak listesi ---------- */
  VIZ.kaynaklar = (el) => {
    el.innerHTML = `<ol class="src-list">${Object.entries(KAYNAKLAR).map(([k, s]) => `<li id="kaynak-${k}"><span class="id">${k}</span><div><b>${esc(s.ad)}</b><div class="m">${esc(s.tur)} · ${esc(s.tarih)}</div><p class="small" style="margin-top:6px">${esc(s.not)}</p><a class="small" href="${s.url}" target="_blank" rel="noopener">${esc(s.url.replace(/^https:\/\//, ''))}</a></div></li>`).join('')}</ol>`;
    return () => {};
  };
})();
