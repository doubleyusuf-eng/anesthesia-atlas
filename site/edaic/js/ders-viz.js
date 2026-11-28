/* Ders bileşenleri (fizyoloji modülü). js/viz.js'ten sonra yüklenir; ortak yardımcılar window.VIZ_YARDIM'dadır.
   Sayılar ve modeller eğitim amaçlı ve yaklaşıktır; bileşen altlarında öyle belirtilir. */
(function () {
  'use strict';
  const { ticker, esc, REF, RM, store } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f * f * (3 - 2 * f));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',');

  /* ---------- Bölüm 1: germ yaprakları ---------- */
  VIZ.germ = (el) => {
    const KAT = [
      { id: 'ekto', ad: 'Ektoderm', renk: '#3B7DD8', t: ['Sinir sistemi', 'Epidermis'] },
      { id: 'mezo', ad: 'Mezoderm', renk: '#D0453F', t: ['Bağ dokusu', 'Kan hücreleri', 'Kemik ve kemik iliği', 'Kıkırdak', 'Yağ', 'Kas'] },
      { id: 'endo', ad: 'Endoderm', renk: '#C9940F', t: ['Karaciğer', 'Pankreas', 'Mesane', 'Akciğerlerin epitel örtüsü', 'Gİ sistemin epitel örtüsü'] },
    ];
    const CX = 150, CY = 116;
    const LV = [1, 2, 4, 8, 16].map((n) => Array.from({ length: n }, (_, i) => {
      if (n === 1) return [CX, CY, 34];
      if (n === 2) return [CX + (i ? 22 : -22), CY, 23];
      if (n === 4) return [CX + (i % 2 ? 17 : -17), CY + (i < 2 ? -17 : 17), 17];
      const rr = Math.sqrt((i + 0.5) / n) * 36, a = i * 2.39996 + 0.4;
      return [CX + rr * Math.cos(a), CY + rr * Math.sin(a), n === 8 ? 14 : 10.5];
    }));
    el.innerHTML = `<div class="germ">
      <div class="germ-sahne">
        <svg class="germ-svg" viewBox="0 0 300 236" role="img" aria-label="Tek totipotent hücreden bölünmelerle üç germ yaprağına">
          <g class="g-hucre">${Array.from({ length: 16 }, () => '<circle fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6"/>').join('')}</g>
          <g class="g-disk">${KAT.map((k, i) => `<g class="g-kat" data-id="${k.id}"><rect x="40" y="${72 + i * 30}" width="220" height="26" rx="13" fill="${k.renk}"/><text x="150" y="${90 + i * 30}" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="700" font-size="13" fill="#fff">${k.ad}</text></g>`).join('')}</g>
          <text class="g-lbl" x="150" y="222" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" fill="var(--muted)"></text>
        </svg>
        <div class="btn-row"><button type="button" class="btn ghost play">Baştan oynat</button></div>
      </div>
      <div class="germ-kat">${KAT.map((k) => `<button type="button" class="germ-k" data-id="${k.id}" style="--k:${k.renk}"><b>${k.ad}</b><span>${k.t.join(' · ')}</span></button>`).join('')}</div>
    </div>
    <p class="viz-cap" aria-live="polite"></p>
    <p class="viz-foot">${REF('Şematik çizim; germ yapraklarından gelişen yapılar kitaptaki listeye göredir. [[K1 s. 1]]')}</p>`;
    const cells = [...el.querySelectorAll('.g-hucre circle')], kats = [...el.querySelectorAll('.g-kat')], cards = [...el.querySelectorAll('.germ-k')];
    const lbl = el.querySelector('.g-lbl'), cap = el.querySelector('.viz-cap'), disk = el.querySelector('.g-disk'), hucre = el.querySelector('.g-hucre');
    let T = 0, run = !RM, secili = null, lastCap = '';
    const END = 10.8;
    const hl = (id) => {
      kats.forEach((k) => k.setAttribute('opacity', !id || k.dataset.id === id ? 1 : 0.25));
      cards.forEach((c) => c.classList.toggle('on', c.dataset.id === id));
    };
    const draw = () => {
      let txt, c;
      if (T < 5.2) {
        const L = T < 1.2 ? 0 : Math.min(4, 1 + Math.floor(T - 1.2)), f = T < 1.2 ? 1 : ease((T - 1.2 - (L - 1)) / 0.6);
        const cur = LV[L], prev = LV[Math.max(0, L - 1)];
        cells.forEach((ci, i) => {
          if (i >= cur.length) { ci.setAttribute('r', 0); return; }
          const p = prev[L ? Math.floor(i / 2) : 0], q = cur[i];
          ci.setAttribute('cx', lerp(p[0], q[0], f)); ci.setAttribute('cy', lerp(p[1], q[1], f)); ci.setAttribute('r', lerp(p[2] * 0.75, q[2], f));
        });
        hucre.setAttribute('opacity', 1); disk.setAttribute('opacity', 0);
        txt = L === 0 ? 'Tek totipotent hücre' : cur.length + ' hücre';
        c = L === 0 ? '<b>Tek totipotent hücre.</b> Her şey herhangi bir hücre tipine farklılaşabilen tek bir embriyonik hücreyle başlar. [[K1 s. 1]]' : '<b>Bölünmeler.</b> Hücre defalarca bölünür; sonunda vücut yaklaşık 100 trilyon hücreden oluşacaktır. [[K1 s. 1]]';
        hl(null);
      } else {
        const f = ease((T - 5.2) / 1.2);
        hucre.setAttribute('opacity', 1 - f); disk.setAttribute('opacity', f);
        kats.forEach((k, i) => k.setAttribute('transform', `translate(0,${(1 - f) * (1 - i) * 30})`));
        const k = T < 6.6 ? -1 : Math.min(2, Math.floor((T - 6.6) / 1.3));
        const id = secili || (T >= END ? null : k >= 0 ? KAT[k].id : null);
        hl(id);
        txt = 'Üç germ yaprağı';
        const K = KAT.find((x) => x.id === id);
        c = K ? `<b>${K.ad}:</b> ${K.t.join(', ')}. [[K1 s. 1]]` : '<b>Üç germ yaprağı:</b> ektoderm, mezoderm ve endoderm. Bir yaprağa basınca ondan gelişen yapılar vurgulanır. [[K1 s. 1]]';
      }
      lbl.textContent = txt;
      if (c !== lastCap) { cap.innerHTML = REF(c); lastCap = c; }
    };
    const sec = (id) => { secili = id; run = false; T = Math.max(T, 6.6); draw(); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-id]');
      if (b && !e.target.closest('.ref')) { sec(secili === b.dataset.id ? null : b.dataset.id); return; }
      if (e.target.closest('.play')) { secili = null; T = 0; run = true; }
    });
    if (RM) T = END;
    draw();
    return ticker(el, (dt) => { if (!run) return; T = Math.min(END, T + dt); if (T >= END) run = false; draw(); });
  };

  /* ---------- Bölüm 1: 11 fizyolojik sistem ---------- */
  const IKON = {
    sol: 'M12 3v8M12 11c-1.2 1.4-2.6 2-4 2M12 11c1.2 1.4 2.6 2 4 2M8.6 7.4C6 8 3.5 11.5 3.5 16.2c0 2.3 1 3.8 2.8 3.8 2 0 3.2-1.4 3.2-4.4V10M15.4 7.4C18 8 20.5 11.5 20.5 16.2c0 2.3-1 3.8-2.8 3.8-2 0-3.2-1.4-3.2-4.4V10',
    kv: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
    sin: 'M12 9.5a2.5 2.5 0 1 0 0-.01M12 12v9M10 8 6 4M14 8l4-4M12 7V2.5M12 17l-3 3M12 15l3 3',
    kas: 'M3 12c4-6 14-6 18 0-4 6-14 6-18 0zM7 12h10M8 9.6v4.8M12 9v6M16 9.6v4.8',
    isk: 'M7 4.5a2 2 0 1 0-2.6 2.8l9.4 10.2a2 2 0 1 0 2.8 2.6 2 2 0 1 0 2.6-2.8L9.8 7.1A2 2 0 1 0 7 4.5z',
    deri: 'M3 8c3-2 6 2 9 0s6-2 9 0M3 13h18M3 18h18M8 13v5M16 13v5',
    sind: 'M9 3v5c0 3-4 3-4 8a5 5 0 0 0 10 0c0-2 2-3 4-3',
    uri: 'M10 4c-3 0-5 3-5 8s2 8 5 8 3-2 3-4-2-2-2-4 2-2 2-4-1-4-3-4zM13 12h4v9',
    ure: 'M12 4a5 5 0 1 0 0 10 5 5 0 1 0 0-10zM12 14v7M9 18h6',
    end: 'M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11zM9.5 15a2.5 2.5 0 0 0 2.5 2.5',
    bag: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4',
  };
  VIZ.sistemler = (el) => {
    const S = [
      ['sol', 'Solunum', 'Akciğerler ve hava yolları.'],
      ['kv', 'Kardiyovasküler', 'Kalp ve kan damarları: arterler, arteriyoller, kapillerler, venüller ve venler. Dolaşım sistemik ve pulmoner olmak üzere iki devreye ayrılır.'],
      ['sin', 'Sinir', 'Elektriksel sinyal ileten nöronlar ve destek hücreleri (glia). Anatomik olarak merkezi (beyin, omurilik) ve periferik (periferik sinirler, gangliyonlar, duyu reseptörleri) sinir sistemi. Periferik sistem işlevsel olarak afferent (duyuyu beyne taşır) ve efferent (motor uyarıları beyinden taşır) kollara ayrılır. Somatik sistem bilinçli kontroldeki bileşenlerdir; otonom sistem iç organları düzenler ve sempatik ile parasempatik olarak ayrılır; enterik sistem sindirimi yöneten yarı otonom bir ağdır.'],
      ['kas', 'Kas', 'Üç kas tipi: iskelet, kalp ve düz kas.'],
      ['isk', 'İskelet', 'Vücudun çatısı: kemik, bağ ve kıkırdak.'],
      ['deri', 'Deri (integüment)', 'Deri ve ekleri: kıllar, tırnaklar, yağ ve ter bezleri. Mikroorganizmalara ve su kaybına karşı önemli bir bariyerdir; termoregülasyonda ve duyuda da rol oynar.'],
      ['sind', 'Sindirim', 'Ağızdan anüse kadar gastrointestinal kanal ve yardımcı organlar: tükürük bezleri, karaciğer, pankreas ve safra kesesi.'],
      ['uri', 'Üriner', 'İdrar üretimi ve atılımı: böbrekler, üreterler, mesane ve üretra.'],
      ['ure', 'Üreme', 'Yeni yaşamın oluşturulması ve beslenmesi: overler, testisler, uterus ve meme bezleri gibi birçok organ.'],
      ['end', 'Endokrin', 'Hormon üretir. Hormonlar kanla taşınan ve çoğu zaman uzaktaki hücrelerin işlevini düzenleyen kimyasal sinyal molekülleridir.'],
      ['bag', 'Bağışıklık', 'Doku onarımı; mikroorganizmalara ve kansere karşı koruma. Lenfoid organlar (kemik iliği, dalak, lenf düğümleri, timus) ve organların içindeki lenfoid doku kümeleri (ör. ince bağırsaktaki Peyer plakları). Doğal bağışıklık hızlı ama özgül olmayan, adaptif bağışıklık daha yavaş ama çok özgül yanıt verir.'],
    ];
    const KB = ['kv', 'uri', 'sin', 'end'];
    el.innerHTML = `<div class="viz-head"><span class="small muted">Bir sisteme basın</span><button type="button" class="btn ghost" data-a="kb" aria-pressed="false">Örnek: arteriyel kan basıncı</button></div>
      <div class="sis-grid">${S.map(([id, ad], i) => `<button type="button" class="sis" data-id="${id}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${IKON[id]}"/></svg><span class="no">${String(i + 1).padStart(2, '0')}</span><b>${ad}</b></button>`).join('')}</div>
      <div class="sis-detay card" aria-live="polite"></div>`;
    const det = el.querySelector('.sis-detay'), kb = el.querySelector('[data-a="kb"]');
    let mod = 'tek';
    const show = (id) => {
      mod = 'tek'; kb.setAttribute('aria-pressed', 'false');
      el.querySelectorAll('.sis').forEach((b) => { b.classList.toggle('on', b.dataset.id === id); b.classList.remove('kb'); });
      const s = S.find((x) => x[0] === id);
      det.innerHTML = `<h3>${s[1]} sistemi</h3><p>${REF(s[2] + ' [[K1 s. 1–2]]')}</p>`;
    };
    const kbShow = () => {
      mod = 'kb'; kb.setAttribute('aria-pressed', 'true');
      el.querySelectorAll('.sis').forEach((b) => { b.classList.remove('on'); b.classList.toggle('kb', KB.includes(b.dataset.id)); });
      det.innerHTML = `<h3>Sistemler birlikte çalışır</h3><p>${REF('Arteriyel kan basıncı tek bir sistemin değil, kardiyovasküler, üriner, sinir ve endokrin sistemlerin etkileşiminin sonucudur. [[K1 s. 2]]')}</p>`;
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const b = e.target.closest('.sis'); if (b) { show(b.dataset.id); return; }
      if (e.target.closest('[data-a="kb"]')) { if (mod === 'kb') show('kv'); else kbShow(); }
    });
    show('sol');
    return () => {};
  };

  /* ---------- Bölüm 1: homeostaz (iç ortam ve düzenlenen değişkenler) ---------- */
  VIZ.homeostaz = (el) => {
    const G = [
      ['O₂ ve besinler', 'Hücreler enerji üretmek için sürekli besin ve O₂ ister. Plazma glukozu sıkı kontrol edilir; doku PO₂\'sini yeterli ve kararlı tutan birçok mekanizma vardır. [[K1 s. 2]]'],
      ['CO₂ ve atıklar', 'Hücreler ATP üretirken H⁺, üre gibi atıklar ve CO₂ oluşturur. Biriktiklerinde hücresel süreçleri bozarlar; uzaklaştırılmaları gerekir. [[K1 s. 2]]'],
      ['pH', 'Enzimler ve iyon kanalları dahil bütün proteinler dar bir pH aralığında verimli çalışır. Uç pH değerleri proteinlerin ve nükleik asitlerin üçüncül ya da dördüncül yapısını bozar (denatürasyon). [[K1 s. 2]]'],
      ['Su ve elektrolitler', 'Hücre içi su hacmi sıkı kontrol edilir; şişen ya da büzüşen hücre düzgün çalışmaz. Na⁺ zardan geçemeyen, ozmotik olarak etkin başlıca iyon olduğundan suyun hareketini belirler; bu yüzden hücre dışı Na⁺ sıkı kontrol edilir. K⁺, Ca²⁺ ve Mg²⁺ da sıkı düzenlenir. [[K1 s. 2]]'],
      ['Sıcaklık', 'Enzim ve iyon kanalı kinetiklerinin optimal sıcaklık aralığı dardır; hücre zarının akışkanlığı gibi özellikler de sıcaklığa bağlıdır. Termoregülasyon bu nedenle zorunludur. [[K1 s. 3]]'],
    ];
    el.innerHTML = `<svg class="homeo-svg" viewBox="0 0 560 190" role="img" aria-label="Tek hücreli canlı dış ortama doğrudan bağımlıdır; çok hücreli canlıda hücreler hücre dışı sıvıyla çevrilidir">
      <rect x="4" y="4" width="266" height="182" rx="14" fill="var(--c-basic-soft)"/>
      <text x="18" y="26" font-family="Archivo, sans-serif" font-weight="700" font-size="13" fill="var(--c-basic)">Tek hücreli · dış ortam</text>
      <path d="M95 112c-14-26 10-50 36-42 20-14 52-4 50 22 18 14 10 44-14 46-12 18-44 16-52 0-22 0-30-14-20-26z" fill="var(--paper)" stroke="var(--c-basic)" stroke-width="2"/>
      <circle cx="140" cy="110" r="10" fill="var(--c-basic)" opacity=".35"/>
      ${['M28 66L80 94', 'M250 68L198 96', 'M100 150L46 178', 'M184 142L240 170'].map((d) => `<path d="${d}" stroke="var(--c-basic)" stroke-width="2" marker-end="url(#ok)" fill="none"/>`).join('')}
      <text x="22" y="62" font-family="JetBrains Mono, monospace" font-size="10.5" fill="var(--muted)">besin, O₂</text>
      <text x="196" y="182" font-family="JetBrains Mono, monospace" font-size="10.5" fill="var(--muted)">atık, CO₂</text><text x="180" y="62" font-family="JetBrains Mono, monospace" font-size="10.5" fill="var(--muted)">besin, O₂</text><text x="20" y="182" font-family="JetBrains Mono, monospace" font-size="10.5" fill="var(--muted)">atık, CO₂</text>
      <rect x="290" y="4" width="266" height="182" rx="14" fill="var(--chip)"/>
      <text x="304" y="26" font-family="Archivo, sans-serif" font-weight="700" font-size="13" fill="var(--muted)">Çok hücreli · dış ortam</text>
      <rect x="322" y="40" width="204" height="132" rx="22" fill="var(--c-clin-soft)" stroke="var(--c-clin)" stroke-width="2"/>
      <text x="424" y="160" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="var(--c-clin)">ECF ≈ deniz suyu</text>
      ${[[360, 78], [404, 70], [450, 82], [494, 74], [372, 120], [418, 114], [462, 124], [500, 116]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="var(--paper)" stroke="var(--c-clin)" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="4.5" fill="var(--c-clin)" opacity=".4"/>`).join('')}
      <defs><marker id="ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--c-basic)"/></marker></defs>
    </svg>
    <p class="small muted" style="margin:8px 0 14px">${REF('Solda amip besini ve atığı doğrudan dış ortamla değişir. Sağda hücrelerin dış ortamla teması yoktur; onları çevreleyen hücre dışı sıvı (ECF) düzenlenir. [[K1 s. 2]]')}</p>
    <div class="viz-head"><span class="small muted">Düzenlenen değişkenler: bir göstergeye basın</span><button type="button" class="btn ghost" data-a="boz">Bozulma ekle</button></div>
    <div class="gosterge">${G.map(([k], i) => `<button type="button" class="gst" data-i="${i}"><b>${k}</b><span class="trk"><i class="band"></i><i class="ign"></i></span><span class="dur">ayar noktasında</span></button>`).join('')}</div>
    <p class="viz-cap" aria-live="polite"></p>`;
    const gst = [...el.querySelectorAll('.gst')], cap = el.querySelector('.viz-cap');
    const d = G.map(() => 0), ph = G.map((_, i) => i * 1.7), w = G.map((_, i) => 0.9 + i * 0.23);
    let t = 0, sec = 0, son = -1;
    const show = (i) => { sec = i; gst.forEach((g, j) => g.classList.toggle('on', j === i)); cap.innerHTML = `<b>${G[i][0]}.</b> ${REF(G[i][1])}`; };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const g = e.target.closest('.gst'); if (g) { show(+g.dataset.i); return; }
      if (e.target.closest('[data-a="boz"]')) { son = (son + 1 + Math.floor(Math.random() * 3)) % G.length; d[son] = (Math.random() < 0.5 ? -1 : 1) * 34; show(son); }
    });
    show(0);
    const draw = () => gst.forEach((g, i) => {
      const x = clamp(50 + (RM ? 0 : 3.5 * Math.sin(t * w[i] + ph[i])) + d[i], 3, 97);
      g.querySelector('.ign').style.left = x + '%';
      const off = Math.abs(d[i]) > 6;
      g.classList.toggle('bozuk', off);
      g.querySelector('.dur').textContent = off ? 'düzeltiliyor…' : 'ayar noktasında';
    });
    draw();
    return ticker(el, (dt) => { t += dt; d.forEach((v, i) => { d[i] = v * Math.exp(-dt / 1.3); }); draw(); });
  };

  /* ---------- Bölüm 1: yerel (intrinsik) kontrol: çalışan kas ---------- */
  VIZ.yerel = (el) => {
    el.innerHTML = `<div class="viz-head"><h3>Çalışan kasta yerel kontrol</h3><button type="button" class="btn play">Egzersize başla</button></div>
      <div class="yerel">
        <svg class="yerel-svg" viewBox="0 0 440 220" role="img" aria-label="Arteriyol ve iskelet kası: egzersizde metabolitler birikir, arteriyol genişler, kan akımı artar">
          <text x="14" y="22" font-family="Archivo, sans-serif" font-weight="700" font-size="13" fill="var(--muted)">Arteriyol</text>
          <path class="y-ust" fill="none" stroke="var(--crit)" stroke-width="5" stroke-linecap="round"/>
          <path class="y-alt" fill="none" stroke="var(--crit)" stroke-width="5" stroke-linecap="round"/>
          <g class="y-kan"></g>
          <rect x="70" y="104" width="340" height="104" rx="14" fill="var(--crit-soft)" stroke="var(--line)"/>
          ${Array.from({ length: 16 }, (_, i) => `<line x1="${86 + i * 20}" x2="${86 + i * 20}" y1="112" y2="200" stroke="var(--crit)" stroke-opacity=".22" stroke-width="7" stroke-linecap="round"/>`).join('')}
          <text x="84" y="128" font-family="Archivo, sans-serif" font-weight="700" font-size="13" fill="var(--ink)">İskelet kası</text>
          <g class="y-met"></g>
        </svg>
        <div class="yerel-bar">${['Kas O₂', 'Metabolitler (K⁺, AMP, H⁺)', 'Arteriyol çapı', 'Kan akımı'].map((k, i) => `<div class="yb"><span>${k}</span><span class="trk"><i data-i="${i}"></i></span></div>`).join('')}</div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Model şematiktir: talep, akım ve metabolit düzeyi göreli birimlerdedir. Mekanizma kitaptaki örnektir. [[K1 s. 3]]')}</p>`;
    const ust = el.querySelector('.y-ust'), alt = el.querySelector('.y-alt'), kan = el.querySelector('.y-kan'), met = el.querySelector('.y-met'), cap = el.querySelector('.viz-cap'), play = el.querySelector('.play');
    const bars = [...el.querySelectorAll('.yb i')];
    const NK = 14, NM = 18, ETK = ['K⁺', 'AMP', 'H⁺'];
    kan.innerHTML = Array.from({ length: NK }, () => '<ellipse rx="7" ry="4" fill="var(--crit)"/>').join('');
    met.innerHTML = Array.from({ length: NM }, (_, i) => `<text font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="var(--warn)">${ETK[i % 3]}</text>`).join('');
    const kc = [...kan.children], mc = [...met.children];
    const kx = kc.map((_, i) => (i / NK) * 440), my = mc.map((_, i) => ({ x: 96 + ((i * 53) % 300), y: 172 + ((i * 29) % 28), p: (i * 0.37) % 1 }));
    let E = 0, O = 0.75, M = 0, r = 1, tE = 0, last = '';
    const draw = () => {
      const R = 10 * r, yc = 60;
      ust.setAttribute('d', `M10 ${yc - R} H430`); alt.setAttribute('d', `M10 ${yc + R} H260 Q270 ${yc + R} 270 ${yc + R + 8} V104 M290 104 V${yc + R + 8} Q290 ${yc + R} 300 ${yc + R} H430`);
      kc.forEach((c, i) => c.setAttribute('transform', `translate(${kx[i]},${yc + ((i % 3) - 1) * R * 0.45})`));
      mc.forEach((m, i) => { const v = i < Math.round(M * 10); m.setAttribute('opacity', v ? 0.95 : 0); const q = my[i]; m.setAttribute('x', q.x); m.setAttribute('y', q.y - q.p * 28); });
      const F = r * r;
      [O, clamp(M / 1.6, 0, 1), clamp((r - 1) / 1, 0, 1), clamp(F / 3, 0, 1)].forEach((v, i) => { bars[i].style.width = (v * 100).toFixed(1) + '%'; });
      let c;
      if (!E && r < 1.04) c = '<b>Dinlenme.</b> O₂ sunumu tüketimi karşılıyor; arteriyol bazal çapında.';
      else if (E && tE < 1.6) c = '<b>Egzersiz başladı.</b> Kas O₂\'yi hızla tüketir, kas içindeki O₂ basıncı düşer. [[K1 s. 3]]';
      else if (E && r < 1.3) c = '<b>Metabolitler birikir.</b> K⁺, AMP ve H⁺ kası besleyen damarlara ulaşır. [[K1 s. 3]]';
      else if (E) c = '<b>Vazodilatasyon.</b> Arteriyol genişler, kan akımı ve dolayısıyla O₂ sunumu artar; kas O₂\'si yeni bir dengeye yükselir. Bu, organın kendi içindeki (intrinsik) bir kontroldür. [[K1 s. 3]]';
      else c = '<b>Egzersiz bitti.</b> Metabolitler temizlenir, arteriyol bazal çapına döner.';
      if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    play.addEventListener('click', () => { E = E ? 0 : 1; tE = 0; play.textContent = E ? 'Egzersizi bitir' : 'Egzersize başla'; });
    draw();
    return ticker(el, (dt) => {
      tE += dt;
      const D = 1 + 2 * E, F = r * r;
      const Ot = clamp(0.75 + 0.25 * (F - D), 0.05, 1), Mt = Math.max(0, (0.75 - O) * 4), rt = 1 + 0.55 * M;
      O += (Ot - O) * (1 - Math.exp(-dt / 1.1)); M += (Mt - M) * (1 - Math.exp(-dt / 1.0)); r += (rt - r) * (1 - Math.exp(-dt / 1.4));
      const v = 40 * F * (RM ? 0 : 1);
      kx.forEach((x, i) => { kx[i] = (x + v * dt) % 440; });
      my.forEach((q) => { q.p = (q.p + dt * 0.35) % 1; });
      draw();
    });
  };

  /* ---------- Bölüm 1: negatif geri bildirim: PaCO₂ döngüsü ---------- */
  VIZ.geribildirim = (el) => {
    const SP = 5.3, K = 0.11506, V0 = (K * 200) / SP, G = 8, TP = 15, TV = 4, PEN = 120, DT = 0.25;
    const N = [
      { x: 200, y: 38, k: 'Değişken: PaCO₂', s: ['ayar noktası ' + fmt(SP) + ' kPa'] },
      { x: 312, y: 150, k: 'Algılayıcı', s: ['medulladaki merkezi', 'kemoreseptörler'] },
      { x: 200, y: 262, k: 'Kontrol merkezi', s: ['medulla: solunum merkezi', 'ayar noktasıyla kıyaslar'] },
      { x: 88, y: 150, k: 'Efektör', s: ['solunum kasları:', 'tidal hacim ve sayı ↑'] },
    ];
    const box = (n, i) => `<g class="fb-n" data-i="${i}"><rect x="${n.x - 88}" y="${n.y - 30}" width="176" height="${n.s.length > 1 ? 62 : 48}" rx="10"/><text x="${n.x}" y="${n.y - 10}" text-anchor="middle" class="fb-k">${n.k}</text>${n.s.map((s, j) => `<text x="${n.x}" y="${n.y + 7 + j * 14}" text-anchor="middle" class="fb-s">${s}</text>`).join('')}</g>`;
    const ARC = ['M282 52 Q330 80 318 112', 'M318 190 Q320 240 282 262', 'M118 262 Q78 240 82 190', 'M82 112 Q74 70 118 52'];
    el.innerHTML = `<div class="fb">
      <svg class="fb-loop" viewBox="0 0 400 310" role="img" aria-label="PaCO₂ için negatif geri bildirim döngüsü: algılayıcı, kontrol merkezi, efektör">
        <defs><marker id="fbok" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--accent)"/></marker></defs>
        ${ARC.map((d) => `<path class="fb-a" d="${d}" marker-end="url(#fbok)"/>`).join('')}
        ${N.map(box).join('')}
        <text x="200" y="162" text-anchor="middle" class="fb-mid">−</text>
      </svg>
      <div>
        <svg class="fb-chart" viewBox="0 0 420 230" role="img" aria-label="PaCO₂ ve alveoler ventilasyonun zamanla değişimi">
          <rect x="44" y="12" width="330" height="180" rx="6" fill="var(--bg)" stroke="var(--line)"/>
          <line class="fb-sp" x1="44" x2="374"/><text class="fb-spl" x="50">ayar noktası</text>
          <text class="fb-ax" x="38" y="16" text-anchor="end">8,5</text><text class="fb-ax" x="38" y="196" text-anchor="end">4</text>
          <text class="fb-ax" x="380" y="16">12</text><text class="fb-ax" x="380" y="196">0</text>
          <text class="fb-ax" x="44" y="212">−${PEN} sn</text><text class="fb-ax" x="374" y="212" text-anchor="end">şimdi</text>
          <polyline class="fb-p"/><polyline class="fb-v"/>
          <text class="fb-lp" x="50" y="226">— PaCO₂ (kPa, sol)</text><text class="fb-lv" x="230" y="226">— V̇A (L/dk, sağ)</text>
        </svg>
        <div class="fb-oku"></div>
      </div>
    </div>
    <div class="btn-row" style="margin-top:10px">
      <div class="seg" role="group" aria-label="Geri bildirim"><button type="button" data-fb="1" aria-pressed="true">Geri bildirim açık</button><button type="button" data-fb="0" aria-pressed="false">Kapalı</button></div>
      <button type="button" class="btn" data-a="co2">CO₂ üretimini artır</button>
      <button type="button" class="btn ghost" data-a="62">PaCO₂ 6,2 kPa'dan başlat</button>
      <button type="button" class="btn ghost" data-a="sif">Sıfırla</button>
    </div>
    <p class="viz-cap" aria-live="polite"></p>
    <p class="viz-foot">${REF('Model: PaCO₂ ≈ 0,115 × V̇CO₂ / V̇A (kPa; mL/dk; L/dk) ve basit oransal kontrol (kazanç 8 L/dk/kPa). Zaman sabitleri ve sayılar yaklaşık, eğitim amaçlıdır. Döngünün öğeleri ve 6,2 kPa örneği kitaptandır. [[K1 s. 3–4]]')}</p>`;
    const $ = (s) => el.querySelector(s);
    const Y = (p) => 192 - ((p - 4) / 4.5) * 180, YV = (v) => 192 - (v / 12) * 180;
    $('.fb-sp').setAttribute('y1', Y(SP)); $('.fb-sp').setAttribute('y2', Y(SP)); $('.fb-spl').setAttribute('y', Y(SP) - 5);
    const nodes = [...el.querySelectorAll('.fb-n')], arcs = [...el.querySelectorAll('.fb-a')], oku = $('.fb-oku'), cap = $('.viz-cap'), co2b = $('[data-a="co2"]');
    let P = SP, V = V0, VCO2 = 200, fb = true, acc = 0, off = 0, last = '';
    const hp = [], hv = [];
    for (let i = 0; i <= PEN / DT; i++) { hp.push(P); hv.push(V); }
    const step = (dt) => {
      const Vt = fb ? Math.max(1, V0 + G * (P - SP)) : V0;
      V += (Vt - V) * (1 - Math.exp(-dt / TV));
      const Peq = (K * VCO2) / V;
      P += (Peq - P) * (1 - Math.exp(-dt / TP));
    };
    const draw = () => {
      const pts = (arr, f) => arr.map((v, i) => (44 + (i / (arr.length - 1)) * 330).toFixed(1) + ',' + f(v).toFixed(1)).join(' ');
      $('.fb-p').setAttribute('points', pts(hp, (v) => Y(clamp(v, 4, 8.5))));
      $('.fb-v').setAttribute('points', pts(hv, (v) => YV(clamp(v, 0, 12))));
      const e = P - SP, akt = fb && Math.abs(e) > 0.06;
      nodes.forEach((n, i) => n.classList.toggle('on', i === 0 ? Math.abs(e) > 0.06 : akt));
      arcs.forEach((a) => { a.classList.toggle('on', akt); a.style.strokeDashoffset = -off; });
      oku.innerHTML = `<span><b>${fmt(P, 2)}</b> kPa PaCO₂</span><span><b>${fmt(V)}</b> L/dk V̇A</span><span><b>${VCO2}</b> mL/dk V̇CO₂</span><span><b>${e >= 0 ? '+' : '−'}${fmt(Math.abs(e), 2)}</b> kPa fark</span>`;
      let c;
      if (Math.abs(e) <= 0.06) c = VCO2 > 200 && fb ? '<b>Yeni denge.</b> CO₂ üretimi yüksek ama artan ventilasyon PaCO₂\'yi ayar noktasına yakın tutuyor (oransal kontrolde küçük bir fark kalır).' : '<b>Ayar noktasında.</b> Algılanan PaCO₂ ayar noktasına eşit; ventilasyon bazal düzeyde.';
      else if (!fb) c = e > 0 ? '<b>Geri bildirim kapalı.</b> Ventilasyon değişmiyor; PaCO₂ yalnızca CO₂ üretimi ile bazal ventilasyonun belirlediği düzeye kendiliğinden ve yavaşça gider.' : '<b>Geri bildirim kapalı.</b> Ventilasyon sabit.';
      else if (e > 0) c = '<b>PaCO₂ yüksek.</b> Merkezi kemoreseptörler artışı algılar; solunum merkezi değeri ayar noktasıyla karşılaştırır ve solunum kaslarına sinyal gönderir; tidal hacim ve solunum sayısı artar, alveoler ventilasyon artar, PaCO₂ düşer. [[K1 s. 3–4]]';
      else c = '<b>PaCO₂ düşük.</b> Aynı döngü ters yönde çalışır: ventilasyon azalır.';
      if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    el.addEventListener('click', (e) => {
      const f = e.target.closest('[data-fb]');
      if (f) { fb = f.dataset.fb === '1'; el.querySelectorAll('[data-fb]').forEach((b) => b.setAttribute('aria-pressed', String(b === f))); return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'co2') { VCO2 = VCO2 > 200 ? 200 : 300; co2b.textContent = VCO2 > 200 ? 'CO₂ üretimini normale döndür' : 'CO₂ üretimini artır'; }
      if (a.dataset.a === '62') P = 6.2;
      if (a.dataset.a === 'sif') { P = SP; V = V0; VCO2 = 200; co2b.textContent = 'CO₂ üretimini artır'; hp.fill(P); hv.fill(V); }
    });
    draw();
    return ticker(el, (dt) => {
      const sim = dt * 6; off = (off + dt * 30) % 1000; acc += sim;
      while (acc >= DT) { step(DT); hp.push(P); hv.push(V); hp.shift(); hv.shift(); acc -= DT; }
      draw();
    });
  };

  /* ---------- Bölüm 1: pozitif geri bildirim ---------- */
  VIZ.pozitif = (el) => {
    const DONGU = {
      dogum: { n: ['Bebeğin başı serviksi gerer', 'Serviksten beyne sinir uyarıları', 'Hipofizden oksitosin salınır', 'Uterus kasılmaları güçlenir'], m: 'Oksitosin', renk: 'var(--c-clin)', artan: true,
        son: '<b>Bebek doğar.</b> Serviks artık gerilmez, döngü kendiliğinden durur. [[K1 s. 4]]', cap: 'Her turda oksitosin ve kasılma gücü artar: küçük bir başlangıç büyüyerek kendini besler. [[K1 s. 4]]' },
      kanama: { n: ['Arteriyel kan basıncı düşer', 'Organ kan akımı azalır', 'Doku hipoksisi', 'Damar yatakları genişler'], m: 'Arteriyel basınç', renk: 'var(--crit)', artan: false,
        son: '<b>Kısır döngü.</b> Patolojik pozitif geri bildirim kontrolsüzdür ve ölümcül olabilir. [[K1 s. 5]]', cap: 'Dekompanse kanama: her turda basınç biraz daha düşer. [[K1 s. 5]]' },
    };
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Görünüm"><button type="button" data-g="dogum" aria-pressed="true">Doğum eylemi</button><button type="button" data-g="kanama" aria-pressed="false">Dekompanse kanama</button><button type="button" data-g="kars" aria-pressed="false">Negatif ve pozitif</button></div><button type="button" class="btn ghost play">Baştan oynat</button></div>
      <div class="pz-sahne"></div>
      <p class="viz-cap" aria-live="polite"></p>`;
    const sahne = el.querySelector('.pz-sahne'), cap = el.querySelector('.viz-cap');
    let g = 'dogum', t = 0, last = '';
    const CXc = 260, CYc = 140, RR = 104, POS = [[CXc, CYc - RR], [CXc + RR * 1.55, CYc], [CXc, CYc + RR], [CXc - RR * 1.55, CYc]];
    const kur = () => {
      t = 0; last = '';
      el.querySelectorAll('[data-g]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.g === g)));
      if (g === 'kars') {
        sahne.innerHTML = `<svg class="pz-svg" viewBox="0 0 520 280" role="img" aria-label="Negatif geri bildirim sapmayı söndürür, pozitif geri bildirim büyütür, sınırlanmış pozitif geri bildirim kısa bir patlama yapıp söner">
          <rect x="46" y="14" width="452" height="220" rx="6" fill="var(--bg)" stroke="var(--line)"/>
          <line x1="46" x2="498" y1="160" y2="160" stroke="var(--muted)" stroke-dasharray="4 4"/>
          <text x="40" y="164" text-anchor="end" class="fb-ax">ayar</text><text x="40" y="20" text-anchor="end" class="fb-ax">sapma</text>
          <polyline class="pz-c neg"/><polyline class="pz-c poz"/><polyline class="pz-c sin"/>
          <text x="54" y="256" class="pz-l neg">— negatif: söner</text><text x="210" y="256" class="pz-l poz">— pozitif: büyür</text><text x="350" y="256" class="pz-l sin">— pozitif + fren</text>
        </svg>`;
      } else {
        const D = DONGU[g];
        sahne.innerHTML = `<div class="pz-wrap"><svg class="pz-svg" viewBox="0 0 520 290" role="img" aria-label="${D.n.join(', ')}">
          <ellipse cx="${CXc}" cy="${CYc}" rx="${RR * 1.55}" ry="${RR}" fill="none" stroke="var(--line)" stroke-width="2"/>
          <circle class="pz-dot" r="9" fill="${D.renk}"/>
          ${D.n.map((s, i) => `<g class="pz-n" data-i="${i}"><rect x="${POS[i][0] - 96}" y="${POS[i][1] - 22}" width="192" height="44" rx="10"/><text x="${POS[i][0]}" y="${POS[i][1] + 5}" text-anchor="middle">${s}</text></g>`).join('')}
          <text x="${CXc}" y="${CYc + 6}" text-anchor="middle" class="pz-plus" fill="${D.renk}">+</text>
        </svg>
        <div class="pz-m"><span>${D.m}</span><span class="trk"><i></i></span><b class="pz-v"></b></div></div>`;
      }
    };
    const draw = () => {
      if (g === 'kars') {
        const T = Math.min(1, t / 5), n = 120;
        const pts = (f) => Array.from({ length: Math.max(2, Math.round(n * T)) }, (_, i) => { const x = i / n; const y = f(x); return (46 + x * 452).toFixed(1) + ',' + (160 - clamp(y, -0.25, 1.05) * 140).toFixed(1); }).join(' ');
        el.querySelector('.pz-c.neg').setAttribute('points', pts((x) => 0.5 * Math.exp(-x * 5) * Math.cos(x * 14)));
        el.querySelector('.pz-c.poz').setAttribute('points', pts((x) => 0.06 * Math.exp(x * 3.4)));
        el.querySelector('.pz-c.sin').setAttribute('points', pts((x) => (x < 0.1 ? 0 : x < 0.25 ? Math.pow((x - 0.1) / 0.15, 2) * 0.95 : 0.95 * Math.exp(-(x - 0.25) * 9) - 0.12 * Math.sin(Math.min(1, (x - 0.25) * 4) * Math.PI))));
        const c = '<b>Karşılaştırma.</b> Negatif geri bildirim sapmayı ayar noktasına doğru söndürür. Pozitif geri bildirim sapmayı giderek büyütür. Fizyolojide pozitif döngüler genellikle eşzamanlı bir negatif kontrolle sınırlanır: aksiyon potansiyelinde Na⁺ kanalları kısa sürede inaktive olur ve depolarizasyon sürmez. [[K1 s. 4–5]] (Eğriler şematiktir.)';
        if (c !== last) { cap.innerHTML = REF(c); last = c; }
        return;
      }
      const D = DONGU[g], tur = 4, sure = 2.4, T = Math.min(tur * sure, t), lap = Math.floor(T / sure), f = (T % sure) / sure, bitti = t >= tur * sure;
      const a = -Math.PI / 2 + (bitti ? 0 : f) * Math.PI * 2;
      const dot = el.querySelector('.pz-dot');
      dot.setAttribute('cx', CXc + Math.cos(a) * RR * 1.55); dot.setAttribute('cy', CYc + Math.sin(a) * RR);
      dot.setAttribute('opacity', bitti ? 0 : 1);
      const k = Math.floor(((bitti ? 0 : f) * 4 + 0.5)) % 4;
      el.querySelectorAll('.pz-n').forEach((n, i) => n.classList.toggle('on', !bitti && i === k));
      const seviye = D.artan ? clamp(0.18 + lap * 0.2 + f * 0.2, 0, 1) : clamp(0.82 - lap * 0.17 - f * 0.17, 0.08, 1);
      el.querySelector('.pz-m i').style.width = (seviye * 100).toFixed(0) + '%';
      el.querySelector('.pz-m i').style.background = D.renk;
      el.querySelector('.pz-v').textContent = D.artan ? (lap + 1) + '. tur' : '≈ ' + Math.round(40 + seviye * 60) + ' mmHg';
      const c = bitti ? D.son : D.cap + (D.artan ? '' : ' (Sayılar şematiktir.)');
      if (c !== last) { cap.innerHTML = REF(c); last = c; }
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-g]'); if (b) { g = b.dataset.g; kur(); draw(); return; }
      if (e.target.closest('.play')) { t = 0; }
    });
    kur(); if (RM) t = 99; draw();
    return ticker(el, (dt) => { if (t < 12) { t += dt; draw(); } });
  };

  /* ---------- bölüm tamamlama ---------- */
  const ANAHTAR = 'edaic-fizyoloji-tamam';
  VIZ.tamam = (el) => {
    const no = el.dataset.bolum, AN = el.dataset.modul ? `edaic-${el.dataset.modul}-tamam` : ANAHTAR, durum = store.get(AN) || {};
    const ciz = () => { el.innerHTML = `<button type="button" class="btn ${durum[no] ? '' : 'ghost'} tamam-b" aria-pressed="${!!durum[no]}">${durum[no] ? '✓ Bu bölümü tamamladım' : 'Bu bölümü tamamladım olarak işaretle'}</button>`; };
    el.addEventListener('click', (e) => { if (!e.target.closest('.tamam-b')) return; if (durum[no]) delete durum[no]; else durum[no] = true; store.set(AN, durum); ciz(); });
    ciz();
    return () => {};
  };

  /* ---------- fizyoloji içindekiler ---------- */
  VIZ.icindekiler = (el) => {
    const F = window.FIZYOLOJI, durum = store.get(ANAHTAR) || {};
    const HZ = window.FIZ_HAZIR || [], pad = (n) => String(n).padStart(2, '0');
    const hazirMi = (no) => !!SAYFALAR['dersler/fizyoloji/' + pad(no)] || HZ.includes(pad(no));
    const top = F.kisimlar.reduce((a, k) => a + k.b.length, 0), yaz = F.kisimlar.reduce((a, k) => a + k.b.filter(([no]) => hazirMi(no)).length, 0), bit = Object.keys(durum).length;
    const ek = (no) => F.ekler.filter((x) => x.sonra === no).map((x) => {
      const id = 'ek' + pad(x.sonra), hz = HZ.includes(id), tm = durum[id];
      const ic = `<span class="no">Ek</span><span class="ad">${esc(x.ad)}</span><span class="sy">K2 s. ${x.s}</span><span class="st ${hz ? (tm ? 'ok' : 'hazir') : ''}">${hz ? (tm ? '✓ tamamlandı' : 'hazır') : 'sırada'}</span>`;
      return hz ? `<li class="icd-ek icd-h"><a href="#/dersler/fizyoloji/${id}">${ic}</a></li>` : `<li class="icd-ek">${ic}</li>`;
    }).join('');
    el.innerHTML = `<div class="chk-prog"><span>${yaz}/${top} bölüm hazır · ${bit} tamamladınız</span><span class="trk"><span class="fl" style="width:${(yaz / top) * 100}%"></span></span></div>
      ${F.kisimlar.map((k, ki) => `<details class="acc icd"${ki === 0 ? ' open' : ''}><summary>Kısım ${k.no} · ${esc(k.ad)} <span class="small muted" style="margin-left:auto;margin-right:12px;font-weight:500">${k.b.length} bölüm</span></summary><div class="acc-b"><ol class="icd-l">${k.b.map(([no, ad, s]) => {
        const hazir = hazirMi(no), id = String(no).padStart(2, '0');
        const icerik = `<span class="no">${no}</span><span class="ad">${esc(ad)}</span><span class="sy">K1 s. ${s}</span><span class="st ${hazir ? (durum[no] ? 'ok' : 'hazir') : ''}">${hazir ? (durum[no] ? '✓ tamamlandı' : 'hazır') : 'sırada'}</span>`;
        return (hazir ? `<li class="icd-h"><a href="#/dersler/fizyoloji/${id}">${icerik}</a></li>` : `<li>${icerik}</li>`) + ek(no);
      }).join('')}</ol></div></details>`).join('')}
      <p class="viz-foot">${REF('Bölüm sırası ve sayfalar K1 [[K1]]; "Ek" dersler K2 [[K2]] seçkisinden, ilgili bölümün ardından.')}</p>`;
    return () => {};
  };

  /* ---------- farmakoloji içindekiler: kısım → kitap bölümü → ders (uzun bölümler birden çok derse bölünür) ---------- */
  VIZ.farIcindekiler = (el) => {
    const F = window.FARMAKOLOJI, durum = store.get('edaic-farmakoloji-tamam') || {};
    const HZ = window.FAR_HAZIR || [];
    const hazirMi = (id) => !!SAYFALAR['dersler/farmakoloji/' + id] || HZ.includes(id);
    const dersler = F.kisimlar.flatMap((k) => k.b.flatMap((b) => b[2]));
    const top = dersler.length, yaz = dersler.filter(([id]) => hazirMi(id)).length, bit = dersler.filter(([id]) => durum[id]).length;
    const satir = ([id, ad, s, e], tek) => {
      const hz = hazirMi(id), tm = durum[id];
      const ic = `<span class="no">${tek ? Number(id) : id}</span><span class="ad">${esc(ad)}</span><span class="sy">K3 s. ${s}–${e}</span><span class="st ${hz ? (tm ? 'ok' : 'hazir') : ''}">${hz ? (tm ? '✓ tamamlandı' : 'hazır') : 'sırada'}</span>`;
      return hz ? `<li class="icd-h${tek ? '' : ' icd-ek'}"><a href="#/dersler/farmakoloji/${id}">${ic}</a></li>` : `<li${tek ? '' : ' class="icd-ek"'}>${ic}</li>`;
    };
    el.innerHTML = `<div class="chk-prog"><span>${yaz}/${top} ders hazır · ${bit} tamamladınız</span><span class="trk"><span class="fl" style="width:${(yaz / top) * 100}%"></span></span></div>
      ${F.kisimlar.map((k, ki) => `<details class="acc icd"${ki === 0 ? ' open' : ''}><summary>Kısım ${k.no} · ${esc(k.ad)} <span class="small muted" style="margin-left:auto;margin-right:12px;font-weight:500">${k.b.length} bölüm · ${k.b.reduce((a, b) => a + b[2].length, 0)} ders</span></summary><div class="acc-b"><ol class="icd-l">${k.b.map(([no, ad, birim]) =>
        birim.length === 1 ? satir([birim[0][0], ad, birim[0][2], birim[0][3]], true)
          : `<li class="icd-bas"><span class="no">${no}</span><span class="ad"><b>${esc(ad)}</b></span><span class="sy">K3 s. ${birim[0][2]}–${birim[birim.length - 1][3]}</span><span class="st">${birim.length} ders</span></li>` + birim.map((x) => satir(x, false)).join('')
      ).join('')}</ol></div></details>`).join('')}
      <p class="viz-foot">${REF('Bölüm sırası K3 [[K3]]; sayfalar Türkçe çalışma çevirisine göredir (özgün baskıyla aynı değildir); uzun bölümler kitabın kendi başlıklarına göre birkaç derse bölünmüştür.')}</p>`;
    return () => {};
  };

  /* ---------- anatomi içindekiler: kitap bölümü → ders ---------- */
  VIZ.anIcindekiler = (el) => {
    const A = window.ANATOMI, durum = store.get('edaic-anatomi-tamam') || {};
    const HZ = window.AN_HAZIR || [];
    const hazirMi = (id) => !!SAYFALAR['dersler/anatomi/' + id] || HZ.includes(id);
    const dersler = A.bolumler.flatMap((b) => b[2]);
    const top = dersler.length, yaz = dersler.filter(([id]) => hazirMi(id)).length, bit = dersler.filter(([id]) => durum[id]).length;
    const satir = ([id, ad, s, e]) => {
      const hz = hazirMi(id), tm = durum[id];
      const ic = `<span class="no">${id}</span><span class="ad">${esc(ad)}</span><span class="sy">K5 s. ${s}–${e}</span><span class="st ${hz ? (tm ? 'ok' : 'hazir') : ''}">${hz ? (tm ? '✓ tamamlandı' : 'hazır') : 'sırada'}</span>`;
      return hz ? `<li class="icd-h"><a href="#/dersler/anatomi/${id}">${ic}</a></li>` : `<li>${ic}</li>`;
    };
    el.innerHTML = `<div class="chk-prog"><span>${yaz}/${top} ders hazır · ${bit} tamamladınız</span><span class="trk"><span class="fl" style="width:${(yaz / top) * 100}%"></span></span></div>
      ${A.bolumler.map(([no, ad, birim], bi) => `<details class="acc icd"${bi === 0 ? ' open' : ''}><summary>Bölüm ${no} · ${esc(ad)} <span class="small muted" style="margin-left:auto;margin-right:12px;font-weight:500">${birim.length} ders</span></summary><div class="acc-b"><ol class="icd-l">${birim.map(satir).join('')}</ol></div></details>`).join('')}
      <p class="viz-foot">${REF('Bölüm sırası K5 [[K5]]; uzun bölümler kitabın kendi başlıklarına göre birkaç derse bölünmüştür.')}</p>`;
    return () => {};
  };
  /* ---------- fizik içindekiler: kitap bölümü → ders ---------- */
  VIZ.fkIcindekiler = (el) => {
    const A = window.FIZIK, durum = store.get('edaic-fizik-tamam') || {};
    const HZ = window.FK_HAZIR || [];
    const hazirMi = (id) => !!SAYFALAR['dersler/fizik/' + id] || HZ.includes(id);
    const dersler = A.bolumler.flatMap((b) => b[2]);
    const top = dersler.length, yaz = dersler.filter(([id]) => hazirMi(id)).length, bit = dersler.filter(([id]) => durum[id]).length;
    const satir = ([id, ad, s, e]) => {
      const hz = hazirMi(id), tm = durum[id];
      const ic = `<span class="no">${id}</span><span class="ad">${esc(ad)}</span><span class="sy">K6 s. ${s}–${e}</span><span class="st ${hz ? (tm ? 'ok' : 'hazir') : ''}">${hz ? (tm ? '✓ tamamlandı' : 'hazır') : 'sırada'}</span>`;
      return hz ? `<li class="icd-h"><a href="#/dersler/fizik/${id}">${ic}</a></li>` : `<li>${ic}</li>`;
    };
    el.innerHTML = `<div class="chk-prog"><span>${yaz}/${top} ders hazır · ${bit} tamamladınız</span><span class="trk"><span class="fl" style="width:${(yaz / top) * 100}%"></span></span></div>
      ${A.bolumler.map(([no, ad, birim], bi) => `<details class="acc icd"${bi === 0 ? ' open' : ''}><summary>Bölüm ${no} · ${esc(ad)} <span class="small muted" style="margin-left:auto;margin-right:12px;font-weight:500">${birim.length} ders</span></summary><div class="acc-b"><ol class="icd-l">${birim.map(satir).join('')}</ol></div></details>`).join('')}
      <p class="viz-foot">${REF('Bölüm sırası K6 [[K6]]; uzun bölümler kitabın kendi başlıklarına göre birkaç derse bölünmüştür.')}</p>`;
    return () => {};
  };
})();
