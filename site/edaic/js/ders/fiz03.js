/* Fizyoloji Bölüm 3 · Genetik · bileşenler. Diziler ve sayılar şematiktir; bileşen altlarında belirtilir.
   Genetik kod standart tablodur (64 kodon). Kitapta olmayan bilgiler "Atlas notu" diye işaretlidir. */
(function () {
  'use strict';
  const { ticker, esc, REF, RM } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const lerp = (a, b, f) => a + (b - a) * f;
  const ease = (f) => (f <= 0 ? 0 : f >= 1 ? 1 : f * f * (3 - 2 * f));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (v, d = 1) => v.toFixed(d).replace('.', ',');

  /* standart genetik kod; kodon DNA harfleriyle (T) verilir */
  const BZ = 'TCAG', KOD1 = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
  const cevir = (k) => KOD1[BZ.indexOf(k[0]) * 16 + BZ.indexOf(k[1]) * 4 + BZ.indexOf(k[2])];
  const AA3 = { A: 'Ala', R: 'Arg', N: 'Asn', D: 'Asp', C: 'Cys', Q: 'Gln', E: 'Glu', G: 'Gly', H: 'His', I: 'Ile', L: 'Leu', K: 'Lys', M: 'Met', F: 'Phe', P: 'Pro', S: 'Ser', T: 'Thr', W: 'Trp', Y: 'Tyr', V: 'Val', '*': 'DUR' };
  const AAT = { A: 'alanin', R: 'arjinin', N: 'asparajin', D: 'aspartik asit', C: 'sistein', Q: 'glutamin', E: 'glutamik asit', G: 'glisin', H: 'histidin', I: 'izolösin', L: 'lösin', K: 'lizin', M: 'metiyonin', F: 'fenilalanin', P: 'prolin', S: 'serin', T: 'treonin', W: 'triptofan', Y: 'tirozin', V: 'valin', '*': 'durdurma' };
  const ES = { A: 'T', T: 'A', G: 'C', C: 'G' };
  const ADI = { A: 'adenin', G: 'guanin', T: 'timin', C: 'sitozin', U: 'urasil' };
  const PUR = { A: 1, G: 1 };

  /* ---------- 1. DNA çift sarmalı: tamamlayıcı eşleşme ve RNA farkları ---------- */
  VIZ.f03_dna = (el) => {
    const N = 8, HB = { A: 2, T: 2, G: 3, C: 3 };
    const XL = 58, XR = 282, LP = 130, LY = 94; // pürin + pirimidin = XR − XL
    const Y = (i) => 54 + i * 38;
    const ORNEK = ['GATCCAGT', 'ATGCGTAC', 'CGTAATGC', 'TTGACGCA'];
    const pent = (cx, cy, r) => Array.from({ length: 5 }, (_, k) => { const a = -Math.PI / 2 + (k * 2 * Math.PI) / 5; return (cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1); }).join(' ');
    const sat = (i) => `<g class="f03-sat" data-i="${i}">
        <circle class="f03-fosfat" cx="40" cy="${Y(i) - 19}" r="4.5"/>
        <polygon class="f03-seker" points="${pent(40, Y(i), 9)}"/>
        <text class="f03-oh" x="19" y="${Y(i) + 3.5}" text-anchor="middle">OH</text>
        <rect class="f03-bz-l" y="${Y(i) - 9}" height="18" rx="4"/>
        <text class="f03-harf f03-hl" x="${XL + 13}" y="${Y(i) + 4.5}" text-anchor="middle"></text>
        <g class="f03-sagz">
          <circle class="f03-fosfat" cx="300" cy="${Y(i) + 19}" r="4.5"/>
          <polygon class="f03-seker" points="${pent(300, Y(i), 9)}"/>
          <rect class="f03-yuva" y="${Y(i) - 12}" height="24" rx="6"/>
          <rect class="f03-bz-r" y="${Y(i) - 9}" height="18" rx="4"/>
          <text class="f03-harf f03-hr" y="${Y(i) + 4.5}" text-anchor="middle"></text>
          <g class="f03-hb"></g>
          <rect class="f03-tik" x="146" y="${Y(i) - 18}" width="170" height="36" fill="transparent"><title>Bu basamağı seç</title></rect>
        </g>
      </g>`;
    el.innerHTML = `<div class="viz-head"><h3>Çift sarmalı eşleştirin</h3><div class="seg" role="group" aria-label="Molekül"><button type="button" data-m="dna" aria-pressed="true">DNA</button><button type="button" data-m="rna" aria-pressed="false">RNA olsaydı</button></div></div>
      <div class="f03-dna">
        <svg class="f03-dna-svg" viewBox="0 0 340 364" role="img" aria-label="Düzleştirilmiş DNA merdiveni: iki şeker–fosfat omurgası ve aralarında baz çiftleri">
          <defs><pattern id="f03-tarama" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="6" class="f03-tarama"/></pattern></defs>
          <text class="f03-uc" x="40" y="24" text-anchor="middle">5′</text><text class="f03-uc f03-sagz" x="300" y="24" text-anchor="middle">3′</text>
          <text class="f03-uc" x="40" y="352" text-anchor="middle">3′</text><text class="f03-uc f03-sagz" x="300" y="352" text-anchor="middle">5′</text>
          <text class="f03-omz-l" x="170" y="20" text-anchor="middle">deoksiriboz–fosfat omurgaları</text>
          <line class="f03-omurga" x1="40" x2="40" y1="32" y2="334"/><line class="f03-omurga f03-sagz" x1="300" x2="300" y1="32" y2="334"/>
          ${Array.from({ length: N }, (_, i) => sat(i)).join('')}
          <text class="f03-tek" x="226" y="186" text-anchor="middle">eşleşeceği zincir yok</text>
        </svg>
        <div class="f03-dna-yan">
          <p class="small f03-secili" aria-live="polite"></p>
          <div class="f03-palet" role="group" aria-label="Eş baz seçin">${['A', 'T', 'G', 'C'].map((b) => `<button type="button" class="f03-pb f03-c${b}" data-b="${b}"><b>${b}</b><span>${ADI[b]} · ${PUR[b] ? 'pürin' : 'pirimidin'}</span></button>`).join('')}</div>
          <div class="btn-row"><button type="button" class="btn" data-a="oto">Kendiliğinden tamamla</button><button type="button" class="btn ghost" data-a="yeni">Yeni dizi</button><button type="button" class="btn ghost" data-a="sil">Temizle</button></div>
          <div class="f03-sayac"></div>
          <ul class="f03-lej">
            <li><i class="uzun"></i>uzun parça: pürin (A, G)</li>
            <li><i class="kisa"></i>kısa parça: pirimidin (T, C)</li>
            <li><i class="hbi"></i>kesik çizgiler: hidrojen bağları</li>
          </ul>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik, düzleştirilmiş çizim: gerçekte iki zincir birbirinin çevresinde sarmal yapar. Eşleşmeler kitaptaki kurala göredir [[K1 s. 9–10]]. Atlas notu: pürin–pirimidin çifti sarmalın genişliğini sabit tutar, iki pürin fazla geniş, iki pirimidin fazla dar kalır; A–T arasında 2, G–C arasında 3 hidrojen bağı vardır; RNA şekerindeki fazladan hidroksil 2′ karbondadır.')}</p>`;
    const kutu = el.querySelector('.f03-dna'), satir = [...el.querySelectorAll('.f03-sat')], cap = el.querySelector('.viz-cap');
    const secili = el.querySelector('.f03-secili'), sayac = el.querySelector('.f03-sayac'), pal = [...el.querySelectorAll('.f03-pb')];
    let oi = 0, sol = [...ORNEK[0]], sag = Array(N).fill(null), sel = 0, mod = 'dna', oto = false, acc = 0, sonCap = '';
    const durum = (l, r) => (!r ? 'bos' : ES[l] === r ? 'ok' : PUR[l] && PUR[r] ? 'genis' : !PUR[l] && !PUR[r] ? 'dar' : 'bag');
    const tur = (b) => (PUR[b] ? 'pürin' : 'pirimidin');
    const yorum = (i) => {
      const l = sol[i], r = sag[i], d = durum(l, r);
      if (d === 'ok') return `<b>${l}–${r}: doğru eşleşme.</b> Bir ${tur(l)} (${ADI[l]}) ile bir ${tur(r)} (${ADI[r]}) karşılıklı tam oturur ve aralarında hidrojen bağları kurulur (Atlas notu: bu çiftte ${HB[l]} bağ). [[K1 s. 9]]`;
      if (d === 'genis') return `<b>${l}–${r} sığmaz.</b> İki uzun parça (iki pürin) üst üste biner. Kitaptaki benzetmeyle: çıkıntılı bir yapboz parçası, çıkıntılı başka bir parçanın yanına oturmaz. [[K1 s. 9]]`;
      if (d === 'dar') return `<b>${l}–${r} sığmaz.</b> İki kısa parça (iki pirimidin) arasında boşluk kalır; zincirler kenetlenemez. [[K1 s. 9]]`;
      return `<b>${l}–${r} uymaz.</b> Genişlik doğru ama hidrojen bağları karşılıklı eşleşmez. Tamamlayıcı çiftler yalnızca A–T ve C–G'dir. [[K1 s. 9]]`;
    };
    const bildir = (c) => { if (c !== sonCap) { cap.innerHTML = REF(c); sonCap = c; } };
    const draw = () => {
      const rna = mod === 'rna';
      kutu.classList.toggle('rna', rna);
      el.querySelector('.f03-omz-l').textContent = rna ? 'riboz–fosfat omurgası' : 'deoksiriboz–fosfat omurgaları';
      let ok = 0, hb = 0;
      for (let i = 0; i < N; i++) {
        const g = satir[i], l = sol[i], L = rna && l === 'T' ? 'U' : l, Ll = PUR[l] ? LP : LY, r = sag[i], d = durum(l, r), y = Y(i);
        const lr = g.querySelector('.f03-bz-l'), lt = g.querySelector('.f03-hl');
        lr.setAttribute('x', XL); lr.setAttribute('width', d === 'genis' || d === 'dar' || rna ? Ll : Ll - 4); lr.setAttribute('class', 'f03-bz-l f03-f' + L);
        lt.textContent = L;
        const yuva = g.querySelector('.f03-yuva'), rr = g.querySelector('.f03-bz-r'), rt = g.querySelector('.f03-hr'), hbg = g.querySelector('.f03-hb');
        yuva.setAttribute('x', XL + Ll + 2); yuva.setAttribute('width', XR - XL - Ll + 2);
        yuva.setAttribute('class', 'f03-yuva' + (r ? ' dolu' : '') + (i === sel && !rna && !oto ? ' sec' : ''));
        let h = '';
        if (!r) {
          rr.setAttribute('width', 0); rt.setAttribute('x', (XL + Ll + XR) / 2 + 2); rt.setAttribute('class', 'f03-harf f03-hr f03-soru'); rt.textContent = '?';
        } else {
          const Lr = PUR[r] ? LP : LY, x0 = d === 'genis' || d === 'dar' ? XR - Lr : XR - Lr + 4;
          rr.setAttribute('x', x0); rr.setAttribute('width', XR - x0); rr.setAttribute('class', 'f03-bz-r f03-f' + r);
          rt.setAttribute('x', XR - 13); rt.setAttribute('class', 'f03-harf f03-hr'); rt.textContent = r;
          const jx = XL + Ll;
          if (d === 'ok') { ok++; hb += HB[l]; h = (HB[l] === 2 ? [-4, 4] : [-6, 0, 6]).map((o) => `<line class="f03-hbc" x1="${jx - 6}" x2="${jx + 6}" y1="${y + o}" y2="${y + o}"/>`).join(''); }
          else if (d === 'genis') h = `<rect class="f03-cakis" x="${XR - Lr}" y="${y - 9}" width="${jx - (XR - Lr)}" height="18"/>`;
          else if (d === 'dar') h = `<line class="f03-bosluk" x1="${jx + 2}" x2="${XR - Lr - 2}" y1="${y}" y2="${y}"/>`;
          else h = `<path class="f03-carpi" d="M${jx - 5} ${y - 5}L${jx + 5} ${y + 5}M${jx + 5} ${y - 5}L${jx - 5} ${y + 5}"/>`;
        }
        hbg.innerHTML = h;
      }
      pal.forEach((b) => { b.disabled = rna; });
      el.querySelectorAll('[data-a]').forEach((b) => { b.disabled = rna; });
      if (rna) {
        secili.innerHTML = 'RNA görünümü: eş zincir ve palet kapalı.';
        sayac.innerHTML = `<span><b>${sol.filter((b) => b === 'T').length}</b> T → U</span><span><b>1</b> zincir</span><span>şeker: <b>riboz</b></span>`;
      } else {
        const l = sol[sel];
        secili.innerHTML = `Seçili basamak <b>${sel + 1}</b>: sol zincirde <b>${l}</b> (${tur(l)}). Eşini seçin:`;
        sayac.innerHTML = `<span><b>${ok}</b>/${N} doğru çift</span><span><b>${hb}</b> hidrojen bağı</span><span><b>${sag.filter((r, i) => r && durum(sol[i], r) !== 'ok').length}</b> uymayan</span>`;
      }
    };
    const ilerle = () => { for (let k = 1; k <= N; k++) { const j = (sel + k) % N; if (durum(sol[j], sag[j]) !== 'ok') { sel = j; return; } } };
    const tamamMi = () => sag.every((r, i) => durum(sol[i], r) === 'ok');
    const TAMAM = '<b>Zincir tamamlandı.</b> Her basamakta bir pürin bir pirimidinle eşleşti. Bir zincirin dizisi öbürününkini tümüyle belirler: iki zincirin kenetlenmesi için bütün dizilerin birbirine karşılık gelmesi gerekir. [[K1 s. 9]]';
    const RNA = '<b>RNA olsaydı kitabın saydığı üç fark görülürdü.</b> Şeker ribozdur ve DNA\'nın şekerinde olmayan bir hidroksil (OH) grubu taşır; timin (T) yerine urasil (U) bulunur; RNA genellikle tek zincirdir, çift sarmal kuracağı antiparalel bir eşi yoktur. [[K1 s. 10]]';
    const BAS = '<b>Bir basamak seçin ve eşini paletten koyun.</b> Sol zincir yukarıdan aşağı 5′→3′ yönünde okunur, eş zincir ters yönde (3′→5′) uzanır. Boş yuvanın uzunluğu ipucudur: uzun yuvaya pürin, kısa yuvaya pirimidin sığar. [[K1 s. 9–10]]';
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const m = e.target.closest('[data-m]');
      if (m) { mod = m.dataset.m; oto = false; el.querySelectorAll('[data-m]').forEach((b) => b.setAttribute('aria-pressed', String(b === m))); bildir(mod === 'rna' ? RNA : tamamMi() ? TAMAM : BAS); draw(); return; }
      if (mod === 'rna') return;
      const t = e.target.closest('.f03-tik');
      if (t) { sel = +t.closest('.f03-sat').dataset.i; oto = false; bildir(sag[sel] ? yorum(sel) : BAS); draw(); return; }
      const p = e.target.closest('.f03-pb');
      if (p) { oto = false; sag[sel] = p.dataset.b; const ok = durum(sol[sel], sag[sel]) === 'ok'; bildir(tamamMi() ? TAMAM : yorum(sel)); if (ok) ilerle(); draw(); return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'oto') { if (RM) { sag = sol.map((b) => ES[b]); bildir(TAMAM); } else { oto = true; acc = 0.2; } }
      if (a.dataset.a === 'yeni') { oi = (oi + 1) % ORNEK.length; sol = [...ORNEK[oi]]; sag = Array(N).fill(null); sel = 0; oto = false; bildir(BAS); }
      if (a.dataset.a === 'sil') { sag = Array(N).fill(null); sel = 0; oto = false; bildir(BAS); }
      draw();
    });
    bildir(BAS); draw();
    return ticker(el, (dt) => {
      if (!oto) return;
      acc += dt;
      if (acc < 0.32) return;
      acc = 0;
      const j = sag.findIndex((r, i) => durum(sol[i], r) !== 'ok');
      if (j < 0) { oto = false; bildir(TAMAM); draw(); return; }
      sel = j; sag[j] = ES[sol[j]]; bildir(yorum(j)); draw();
    });
  };

  /* ---------- 2. Genden proteine: transkripsiyon, çekirdekten çıkış, translasyon ---------- */
  VIZ.f03_sentez = (el) => {
    const KOD = ['ATG', 'GCA', 'TTT', 'CAG', 'AAA', 'TAA'];
    const kod = KOD.join(''), kalip = [...kod].map((b) => ES[b]).join(''), mrna = kod.replace(/T/g, 'U');
    const RES = { A: 'U', U: 'A', G: 'C', C: 'G' };
    const anti = KOD.slice(0, 5).map((k) => [...k.replace(/T/g, 'U')].map((b) => RES[b]).join(''));
    const aa = KOD.map(cevir);
    const X = (j) => 34 + j * 16 + Math.floor(j / 3) * 4, CX = (k) => X(3 * k + 1);
    const FAZ = [['Gen', 0, 2.5], ['Transkripsiyon', 2.5, 8.5], ['Çıkış', 8.5, 11], ['Translasyon', 11, 21], ['Protein', 21, 24.5]];
    const END = 24.5, YC = 44, YK = 70, YM = 96, YMS = 290, YB = 222;
    const harf = (s, cls) => [...s].map((b, j) => `<text class="f03-sh f03-t${b} ${cls}" x="${X(j)}" text-anchor="middle">${b}</text>`).join('');
    el.innerHTML = `<div class="viz-head"><div class="seg f03-adim" role="group" aria-label="Adım">${FAZ.map((f, i) => `<button type="button" data-f="${i}" aria-pressed="false">${i + 1} · ${f[0]}</button>`).join('')}</div><button type="button" class="btn play">Duraklat</button></div>
      <svg class="f03-snt" viewBox="0 0 360 334" role="img" aria-label="Kısa bir gen: çekirdekte mRNA'ya kopyalanır, mRNA ribozoma gider, tRNA'lar amino asitleri getirir, zincir oluşur">
        <rect class="f03-cek" x="4" y="4" width="352" height="134" rx="18"/>
        <rect class="f03-por" x="166" y="134" width="28" height="8"/>
        <text class="f03-bolge" x="18" y="22">Çekirdek</text>
        <text class="f03-bolge" x="18" y="160">Sitoplazma · ribozom</text>
        <text class="f03-por-l" x="180" y="128" text-anchor="middle">por</text>
        <rect class="f03-imlec" y="0" width="16" height="22" rx="4"/>
        <g class="f03-dzk">${harf(kod, 'k')}</g>
        <g class="f03-dzt">${harf(kalip, 't')}</g>
        <text class="f03-uc2 f03-u1" x="14" text-anchor="middle">5′</text><text class="f03-uc2 f03-u1" x="347" text-anchor="middle">3′</text>
        <text class="f03-uc2 f03-u2" x="14" text-anchor="middle">3′</text><text class="f03-uc2 f03-u2" x="347" text-anchor="middle">5′</text>
        <g class="f03-ribo"><ellipse class="f03-rb-b" cx="0" cy="${YMS - 34}" rx="44" ry="24"/><ellipse class="f03-rb-k" cx="0" cy="${YMS + 12}" rx="40" ry="13"/></g>
        <g class="f03-bag">${[1, 2, 3, 4].map(() => '<line class="f03-pep"/>').join('')}</g>
        <g class="f03-trna">${anti.map((an, k) => `<g class="f03-tr" data-k="${k}"><line class="f03-tr-sap" x1="0" x2="0" y1="${YB + 12}" y2="${YMS - 46}"/><rect class="f03-tr-g" x="-25" y="${YMS - 46}" width="50" height="32" rx="9"/>${[...an].map((b, j) => `<text class="f03-sh f03-t${b}" x="${(j - 1) * 16}" y="${YMS - 20}" text-anchor="middle">${b}</text>`).join('')}</g>`).join('')}</g>
        <g class="f03-aa">${aa.slice(0, 5).map((a, k) => `<g class="f03-bd" data-k="${k}"><circle r="15"/><text y="4" text-anchor="middle">${AA3[a]}</text></g>`).join('')}</g>
        <g class="f03-dzm">${harf(mrna, 'm')}</g>
        <text class="f03-uc2 f03-u3" x="14" text-anchor="middle">5′</text><text class="f03-uc2 f03-u3" x="347" text-anchor="middle">3′</text>
        <text class="f03-dur" x="${CX(5)}" y="${YMS - 26}" text-anchor="middle">DUR</text>
        <text class="f03-prot" x="180" y="178" text-anchor="middle">Met–Ala–Phe–Gln–Lys</text>
      </svg>
      <ul class="f03-lej f03-snt-lej"><li><i class="s1"></i>üst: kodlayan zincir</li><li><i class="s2"></i>alt: kalıp zincir</li><li><i class="s3"></i>mRNA (T yerine U)</li></ul>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik bir gen; amino asitler standart genetik koda göredir. Antikodonlar kodonla aynı hizada (3′→5′) yazılmıştır, kitaptaki GCA–CGU örneği gibi [[K1 s. 10]]. Atlas notu: mRNA kalıp zincirin tamamlayıcısıdır; AUG başlatma kodonudur ve metiyonini kodlar; UAA, UAG ve UGA durdurma kodonlarıdır; bunlara normalde tRNA bağlanmaz, zinciri salıverme faktörleri serbest bırakır. Gerçek proteinler çoğunlukla yüzlerce amino asit uzunluğundadır.')}</p>`;
    const $ = (s) => el.querySelector(s), $$ = (s) => [...el.querySelectorAll(s)];
    const tk = $$('.f03-dzk text'), tt = $$('.f03-dzt text'), tm = $$('.f03-dzm text'), tr = $$('.f03-tr'), bd = $$('.f03-bd'), pep = $$('.f03-pep');
    const imlec = $('.f03-imlec'), ribo = $('.f03-ribo'), dur = $('.f03-dur'), prot = $('.f03-prot'), cap = $('.viz-cap'), play = $('.play');
    const adim = $$('[data-f]');
    let T = RM ? END : 0, run = !RM, sonCap = '';
    const setY = (arr, y) => arr.forEach((t) => t.setAttribute('y', y));
    const yaz = (cls, y) => $$(cls).forEach((t) => t.setAttribute('y', y));
    const draw = () => {
      const faz = Math.max(0, FAZ.findIndex((f) => T < f[2]) < 0 ? 4 : FAZ.findIndex((f) => T < f[2]));
      adim.forEach((b, i) => b.setAttribute('aria-pressed', String(i === faz)));
      // DNA zincirleri: transkripsiyonda açılır, mRNA çıkınca kapanır
      const ac = T < 2.5 ? 0 : T < 3.1 ? ease((T - 2.5) / 0.6) : T < 8.6 ? 1 : T < 9.8 ? 1 - ease((T - 8.6) / 1.2) : 0;
      const yc = YC - 8 * ac;
      setY(tk, yc); setY(tt, YK); yaz('.f03-u1', yc); yaz('.f03-u2', YK);
      // mRNA harfleri
      const ym = T < 8.6 ? YM : T < 11 ? lerp(YM, YMS, ease((T - 8.6) / 2.4)) : YMS;
      const yaziliyor = T >= 2.5 && T < 8.5, n = clamp(Math.floor((T - 2.6) / (5.8 / 18)) + 1, 0, 18);
      tm.forEach((t, j) => { t.setAttribute('y', ym); t.setAttribute('opacity', T < 2.5 ? 0 : j < n ? 1 : 0); });
      yaz('.f03-u3', ym); $$('.f03-u3').forEach((t) => t.setAttribute('opacity', T >= 2.6 ? 1 : 0));
      imlec.setAttribute('opacity', yaziliyor && n < 18 ? 1 : 0);
      if (yaziliyor) { imlec.setAttribute('x', X(Math.min(17, n)) - 8); imlec.setAttribute('y', YK - 16); imlec.setAttribute('height', YM - YK + 22); }
      $('.f03-cek').classList.toggle('on', T < 11);
      // translasyon
      const u = T - 11, k = clamp(Math.floor(u / 2), 0, 4), f = u - k * 2;
      let rx = CX(0), ro = 0;
      if (T >= 10.4) ro = ease((T - 10.4) / 0.6);
      const orta = (j) => (j <= 0 ? CX(0) : (CX(j - 1) + CX(j)) / 2); // ribozom önceki ve okunan kodonu kapsar
      if (T >= 11 && T < 21) rx = f < 1.7 ? orta(k) : lerp(orta(k), orta(k + 1), ease((f - 1.7) / 0.3));
      if (T >= 21) rx = orta(5);
      ribo.setAttribute('transform', `translate(${rx},0)`); ribo.setAttribute('opacity', ro);
      tr.forEach((g, m) => {
        let yo = 0, op = 0;
        const t0 = 11 + m * 2, v = T - t0;
        if (v >= 0 && v < 2) { yo = -84 * (1 - ease(v / 0.8)); op = ease(v / 0.5); }
        else if (v >= 2 && v < 3.4) { const w = v - 2; yo = w < 1.3 ? 0 : -70 * ease((w - 1.3) / 0.7); op = w < 1.3 ? 1 : 1 - ease((w - 1.3) / 0.5); }
        if (m === 4 && T >= 21) { const w = T - 21; yo = -70 * ease(w / 0.8); op = 1 - ease(w / 0.6); }
        g.setAttribute('transform', `translate(${CX(m)},${yo})`); g.setAttribute('opacity', op);
        g.classList.toggle('on', v >= 0.8 && v < 2);
        const lift = T >= 22 ? -22 * ease((T - 22) / 1.2) : 0;
        const b = bd[m];
        b.setAttribute('transform', `translate(${CX(m)},${YB + (v < 0.8 ? yo : 0) + lift})`);
        b.setAttribute('opacity', v < 0 ? 0 : v < 0.8 ? op : 1);
        if (m > 0) {
          const L = pep[m - 1], vis = T >= t0 + 1.3;
          L.setAttribute('x1', CX(m - 1) + 15); L.setAttribute('x2', CX(m) - 15); L.setAttribute('y1', YB + lift); L.setAttribute('y2', YB + lift);
          L.setAttribute('opacity', vis ? 1 : 0);
        }
      });
      tm.forEach((t, j) => t.classList.toggle('oku', T >= 11 && T < 21 && Math.floor(j / 3) === k && f >= 0.6));
      dur.setAttribute('opacity', T >= 21 ? 1 : 0);
      prot.setAttribute('opacity', T >= 22.8 ? ease((T - 22.8) / 0.8) : 0);
      // açıklama
      let c;
      if (faz === 0) c = '<b>1 · Gen.</b> Bir proteinin amino asit dizisi çekirdekteki DNA\'da yazılıdır. Proteini üreten aygıt sitoplazmadadır ve kod çekirdekten çıkamaz. [[K1 s. 9–10]]';
      else if (faz === 1) c = '<b>2 · Transkripsiyon.</b> DNA\'nın bu bölümü çekirdekte mRNA olarak kopyalanır; RNA\'da timin yerine urasil (U) kullanılır. [[K1 s. 10]] (Atlas notu: mRNA kalıp zincirin tamamlayıcısıdır; bu yüzden dizisi kodlayan zincirle aynıdır, yalnız T yerine U vardır.)';
      else if (faz === 2) c = '<b>3 · Çekirdekten çıkış.</b> mRNA çekirdekten çıkar ve sitoplazmadaki ribozomlara gider; kitap bunu granüllü ER\'nin ribozomları üzerinden anlatır. [[K1 s. 10]] (Atlas notu: sitozolde kalacak proteinler serbest ribozomlarda yapılır.)';
      else if (faz === 3) {
        const kd = mrna.slice(k * 3, k * 3 + 3), ek = ['(Atlas notu: AUG başlatma kodonudur ve metiyonini kodlar.)', 'Kitaptaki örnek budur: GCA alanini kodlar, antikodonu CGU\'dur.', 'UUU (DNA\'da TTT) fenilalanini kodlar; kistik fibrozisin ΔF508 mutasyonunda eksilen amino asit fenilalanindir. [[K1 s. 11]]', 'CAG glutamini kodlar; Huntington hastalığında tekrarlanan kodon budur. [[K1 s. 11]]', ''][k];
        c = `<b>4 · Kodon ${k + 1}: ${kd} → ${AA3[aa[k]]}.</b> Antikodonu ${anti[k]} olan tRNA kodona yapboz eşi gibi oturur ve ${AAT[aa[k]]} getirir. rRNA tRNA'yı mRNA boyunca doğru konuma dizer, amino asitler birbirine bağlanır. [[K1 s. 10]] ${ek}`;
      } else c = '<b>5 · Durdurma ve serbest bırakma.</b> UAA kodonunun karşılığı olan bir amino asit yoktur (Atlas notu: durdurma kodonu). Zincir tamamlanır ve ribozomdan serbest bırakılır. [[K1 s. 10]]';
      if (c !== sonCap) { cap.innerHTML = REF(c); sonCap = c; }
      play.textContent = run ? 'Duraklat' : T >= END ? 'Baştan oynat' : 'Oynat';
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const b = e.target.closest('[data-f]');
      if (b) { const F = FAZ[+b.dataset.f]; T = RM ? F[2] - 0.01 : F[1] + 0.001; run = !RM; draw(); return; }
      if (e.target.closest('.play')) { if (T >= END) { T = 0; run = !RM; if (RM) T = END; } else run = !run; draw(); }
    });
    draw();
    return ticker(el, (dt) => { if (!run) return; T = Math.min(END, T + dt); if (T >= END) run = false; draw(); });
  };

  /* ---------- 3. Mutasyon atölyesi: nokta, delesyon, insersiyon, çerçeve kayması ---------- */
  VIZ.f03_mutasyon = (el) => {
    const NORMAL = 'ATGGAGTTTCAGAAAGCAACTGAGGTAACCTAA';
    const yeni = () => [...NORMAL].map((b) => ({ b, o: b, ins: false, del: false }));
    const MOD = [['nokta', 'Bazı değiştir'], ['del', 'Sil'], ['ins', 'Önüne ekle']];
    const HAZIR = [['normal', 'Normal dizi'], ['orak', 'GAG → GTG'], ['del1', '1 nükleotit sil'], ['ins1', '1 nükleotit ekle'], ['del3', 'Bir kodonu sil'], ['cag', 'CAG tekrarı']];
    el.innerHTML = `<div class="viz-head"><h3>Mutasyon atölyesi</h3><div class="seg" role="group" aria-label="Baza basınca">${MOD.map(([k, a], i) => `<button type="button" data-m="${k}" aria-pressed="${i === 0}">${a}</button>`).join('')}</div></div>
      <div class="f03-hazir"><span class="small muted">Hazır örnekler:</span>${HAZIR.map(([k, a]) => `<button type="button" class="btn ghost" data-h="${k}">${a}</button>`).join('')}</div>
      <div class="f03-msat"><span class="f03-etk">Normal</span><div class="f03-kodonlar" data-r="n"></div></div>
      <div class="f03-msat"><span class="f03-etk">Mutant <small>baza basın</small></span><div class="f03-kodonlar" data-r="m"></div></div>
      <div class="f03-sonuc"></div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik dizi (DNA kodlayan zinciri; mRNA\'da T yerine U okunur); gerçek bir gen değildir. Amino asitler standart genetik koda göredir, okuma ATG ile başlar ve ilk durdurma kodonunda (DUR) biter. Mutasyon tipleri kitaptandır [[K1 s. 11]]. Atlas notu: sessiz değişim, erken durdurma ve durdurma kodonunun kaybı da tek baz değişikliğinin olası sonuçlarıdır.')}</p>`;
    const rn = el.querySelector('[data-r="n"]'), rm = el.querySelector('[data-r="m"]'), sonuc = el.querySelector('.f03-sonuc'), cap = el.querySelector('.viz-cap');
    let dz = yeni(), mod = 'nokta', hazir = 'normal';
    const oku = (arr) => { // kodon gruplarına ayır ve çevir
      const g = []; let cur = [], n = 0, bitti = false;
      arr.forEach((x, idx) => { cur.push({ ...x, idx }); if (!x.del) { n++; if (n % 3 === 0) { g.push(cur); cur = []; } } });
      if (cur.length) g.push(cur);
      const prot = [];
      g.forEach((gr) => {
        const s = gr.filter((x) => !x.del).map((x) => x.b).join('');
        gr.aa = null; gr.disari = bitti;
        if (!bitti && s.length === 3) { gr.aa = cevir(s); prot.push(gr.aa); if (gr.aa === '*') bitti = true; }
        else if (!bitti) gr.eksik = true;
      });
      return { g, prot, dur: bitti };
    };
    const NOR = oku(yeni());
    const kutu = (gr, tik, deg) => `<span class="f03-kd${gr.disari ? ' disari' : ''}${gr.eksik ? ' eksik' : ''}${deg ? ' deg' : ''}${gr.aa === '*' ? ' dur' : ''}"><span class="f03-bzl">${gr.map((x) => (tik ? `<button type="button" class="f03-mb f03-t${x.b}${x.del ? ' sil' : ''}${x.ins ? ' ekl' : ''}${!x.del && !x.ins && x.b !== x.o ? ' deg' : ''}" data-x="${x.idx}" aria-label="${x.del ? 'silinmiş ' + x.b + ', geri getir' : (x.idx + 1) + '. baz ' + x.b}">${x.b}</button>` : `<span class="f03-t${x.b}">${x.b}</span>`)).join('')}</span><span class="f03-aa">${gr.aa ? AA3[gr.aa] : gr.disari ? '' : '…'}</span></span>`;
    const ciz = () => {
      const M = oku(dz), N = NOR.prot, P = M.prot;
      let p = 0; while (p < N.length && p < P.length && N[p] === P[p]) p++;
      let s = 0; while (s < N.length - p && s < P.length - p && N[N.length - 1 - s] === P[P.length - 1 - s]) s++;
      const degBas = p, degSon = P.length - s; // mutantta değişen amino asitler [degBas, degSon)
      rn.innerHTML = NOR.g.map((gr) => kutu(gr, false, false)).join('');
      let ai = 0;
      rm.innerHTML = M.g.map((gr) => { let d = false; if (gr.aa) { d = ai >= degBas && ai < degSon; ai++; } return kutu(gr, true, d); }).join('');
      const fark = dz.filter((x) => !x.del).length - NORMAL.length, ayni = P.join('') === N.join('');
      const uzN = N.length - 1, uzM = M.dur ? P.length - 1 : P.length;
      const cerceve = fark % 3 === 0;
      const erken = M.dur && P.length < N.length && !ayni, kayip = !M.dur;
      const degSay = Math.max(0, degSon - degBas);
      sonuc.innerHTML = `<span class="${cerceve ? 'ok' : 'kotu'}">Okuma çerçevesi: <b>${cerceve ? 'korunuyor' : 'kaydı'}</b></span><span>Protein: <b>${uzN}</b> → <b>${uzM}</b> amino asit${kayip ? ' (DUR yok)' : ''}</span><span class="${degSay ? 'kotu' : 'ok'}">Değişen bölge: <b>${degSay}</b> amino asit</span>`;
      let c;
      const v = P[degBas], o = N[degBas];
      if (hazir === 'normal' && ayni) c = '<b>Normal dizi.</b> Okuma ATG ile başlar, üçerli gruplar hâlinde ilerler ve bir durdurma kodonunda biter; durdurma kodonuna kadar her kodon bir amino asit demektir. Bir baza basarak mutasyon oluşturun ya da hazır örneklerden birini seçin. [[K1 s. 10–11]]';
      else if (hazir === 'orak') c = '<b>Nokta mutasyonu: GAG → GTG.</b> Tek bir baz yanlış kopyalanmıştır ve glutamik asidin yerini valin alır. Orak hücre hastalığında hemoglobin β-zincirinin altıncı amino asidinde olan değişim budur: polar bir amino asit yerine polar olmayan bir amino asit gelir. Çerçeve korunur, yalnız bir amino asit değişir. [[K1 s. 11]]';
      else if (hazir === 'del3') c = '<b>Çerçeveyi koruyan delesyon.</b> Üç nükleotit, yani fenilalanini kodlayan bir kodonun tamamı silinmiştir: protein bir amino asit eksiktir, geri kalanı aynıdır. Kistik fibrozisteki ΔF508 mutasyonunda da 508. konumdaki fenilalanin eksilir. [[K1 s. 11]]';
      else if (hazir === 'cag') c = '<b>Trinükleotit tekrarı.</b> Glutamin kodonu CAG art arda eklenmiştir: çerçeve korunur ama proteine fazladan glutaminler girer. Huntington hastalığında 4. kromozomdaki gende bu tekrar çok sayıdadır ve kuşaktan kuşağa uzama eğilimindedir. [[K1 s. 11]]';
      else if (dz.filter((x) => !x.del).slice(0, 3).map((x) => x.b).join('') !== 'ATG') c = '<b>Dizi artık ATG ile başlamıyor.</b> Atlas notu: ribozom çeviriye mRNA\'daki ilk AUG\'den başlar. Başlatma kodonu bozulursa protein ya hiç yapılmaz ya da ilerideki bir AUG\'den başlayan farklı bir protein oluşur; ATG yerinde durup önüne baz eklendiyse protein genellikle değişmez. Bu şematik model okumayı her zaman ilk bazdan başlatır; yukarıdaki sayılar bu yüzden gerçeği yansıtmaz.';
      else if (ayni) c = '<b>Protein değişmedi.</b> Yeni kodon aynı amino asidi kodluyor ya da değişiklik durdurma kodonundan sonra (Atlas notu: genetik kod dejeneredir, birçok amino asidin birden fazla kodonu vardır).';
      else if (!cerceve) c = `<b>Çerçeve kayması.</b> Eklenen ya da silinen nükleotit sayısı üçün katı değil: o noktadan sonraki bütün üçlüler farklı okunur${erken ? ' ve kısa sürede bir durdurma kodonuna rastlanır; kısa ve belirgin biçimde değişmiş bir protein oluşur' : kayip ? '; durdurma kodonu da kaybolur' : ''}. Delesyon ve insersiyonların nokta mutasyonlarından çok daha ağır olabilmesinin nedeni budur. [[K1 s. 11]]`;
      else if (M.dur && P.length < N.length + fark / 3) c = '<b>Erken durdurma kodonu.</b> Değişiklik bir durdurma kodonu oluşturdu; protein o noktada kesilir ve kısa kalır (Atlas notu).';
      else if (kayip) c = '<b>Durdurma kodonu kayboldu.</b> Okuma durması gereken yerde durmaz; gerçekte sonraki bir durdurma kodonuna kadar sürer ve protein uzar (Atlas notu; şematik dizi burada bittiği için okuma da burada kesilir).';
      else if (fark === 0 && degSay === 1) c = `<b>Tek amino asit değişti: ${AA3[o]} → ${AA3[v]}.</b> Bu bir nokta mutasyonudur; okuma çerçevesi korunur, yalnızca o kodonun amino asidi değişir (${AAT[o]} yerine ${AAT[v]}). [[K1 s. 11]]`;
      else if (fark < 0) c = `<b>Çerçeveyi koruyan delesyon.</b> Silinen nükleotit sayısı üçün katı: çerçeve korunur, protein ${-fark / 3} amino asit kısalır${degSay > 0 ? ' ve silinme bölgesinde amino asit değişebilir' : ''}. [[K1 s. 11]]`;
      else if (fark > 0) c = `<b>Çerçeveyi koruyan insersiyon.</b> Eklenen nükleotit sayısı üçün katı: çerçeve korunur, proteine ${fark / 3} amino asit eklenir. [[K1 s. 11]]`;
      else c = `<b>Birden çok değişiklik.</b> Okuma çerçevesi korunuyor; ${degSay} konumda farklı amino asit var. [[K1 s. 11]]`;
      cap.innerHTML = REF(c);
    };
    const uygula = (h) => {
      dz = yeni(); hazir = h;
      if (h === 'orak') { dz[4].b = 'T'; }
      if (h === 'del1') { dz[7].del = true; }
      if (h === 'ins1') { dz.splice(7, 0, { b: 'A', o: '', ins: true, del: false }); }
      if (h === 'del3') { [6, 7, 8].forEach((i) => { dz[i].del = true; }); }
      if (h === 'cag') { const ek = []; for (let r = 0; r < 4; r++) for (const b of 'CAG') ek.push({ b, o: '', ins: true, del: false }); dz.splice(12, 0, ...ek); }
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const m = e.target.closest('[data-m]');
      if (m) { mod = m.dataset.m; el.querySelectorAll('[data-m]').forEach((b) => b.setAttribute('aria-pressed', String(b === m))); return; }
      const h = e.target.closest('[data-h]');
      if (h) { uygula(h.dataset.h); ciz(); return; }
      const b = e.target.closest('.f03-mb'); if (!b) return;
      const i = +b.dataset.x, x = dz[i];
      hazir = 'el';
      if (x.del) x.del = false;
      else if (mod === 'nokta') { const S = 'ACGT'; x.b = S[(S.indexOf(x.b) + 1) % 4]; }
      else if (mod === 'del') { if (x.ins) dz.splice(i, 1); else if (dz.filter((y) => !y.del).length > 6) x.del = true; }
      else if (mod === 'ins' && dz.filter((y) => !y.del).length < 60) dz.splice(i, 0, { b: 'A', o: '', ins: true, del: false });
      ciz();
    });
    ciz();
    return () => {};
  };

  /* ---------- 4. Huntington: kuşaktan kuşağa CAG tekrarı (antisipasyon) ---------- */
  VIZ.f03_tekrar = (el) => {
    const AILE = [37, 41, 46, 54], RK = ['I', 'II', 'III', 'IV'], LO = 10, HI = 70;
    const bolge = (n) => (n <= 26 ? ['normal', 'ok'] : n <= 35 ? ['ara', 'ara'] : n <= 39 ? ['eksik penetrans', 'warn'] : ['tam penetrans', 'crit']);
    const pc = (v) => (((v - LO) / (HI - LO)) * 100).toFixed(2) + '%';
    el.innerHTML = `<div class="viz-head"><h3>Kuşaktan kuşağa CAG tekrarı</h3><div class="btn-row"><button type="button" class="btn play" data-a="ileri">Sonraki kuşak</button><button type="button" class="btn ghost" data-a="bas">Baştan</button></div></div>
      <div class="f03-kusak">${AILE.map((n, i) => `<button type="button" class="f03-ks" data-i="${i}"><span class="r">Kuşak ${RK[i]}</span><b>${n}</b><span class="z">${bolge(n)[0]}</span></button>`).join('')}</div>
      <div class="f03-olcek" aria-hidden="true">
        <div class="f03-bant"><i class="ok" style="left:0;width:${pc(26.5)}"></i><i class="ara" style="left:${pc(26.5)};width:calc(${pc(35.5)} - ${pc(26.5)})"></i><i class="warn" style="left:${pc(35.5)};width:calc(${pc(39.5)} - ${pc(35.5)})"></i><i class="crit" style="left:${pc(39.5)};right:0"></i></div>
        <i class="f03-imc"></i>
        <div class="f03-tik-l">${[[10, '10'], [26.5, '26'], [35.5, '35'], [39.5, '39'], [70, '70']].map(([v, t]) => `<span style="left:${pc(v)}">${t}</span>`).join('')}</div>
      </div>
      <div class="f03-cag-say"><b class="n"></b> CAG tekrarı (her kare bir glutamin kodonu)</div>
      <div class="f03-cag" role="img" aria-label="CAG tekrarları"></div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Örnek aile ve tekrar sayıları şematiktir; kareler eşik aralıklarına göre renklidir. Antisipasyon kitaptandır [[K1 s. 11]]. Atlas notu: eşikler yerleşik değerlerdir (≤26 normal, 27–35 ara, 36–39 eksik penetrans, ≥40 tam penetrans); tekrar her aktarımda uzamak zorunda değildir ve babadan geçişte uzama eğilimi daha belirgindir.')}</p>`;
    const ks = [...el.querySelectorAll('.f03-ks')], cag = el.querySelector('.f03-cag'), say = el.querySelector('.f03-cag-say .n'), imc = el.querySelector('.f03-imc'), cap = el.querySelector('.viz-cap'), ileri = el.querySelector('[data-a="ileri"]');
    cag.innerHTML = Array.from({ length: HI }, (_, i) => `<i class="${bolge(i + 1)[1]}"></i>`).join('');
    const kare = [...cag.children];
    const CAP = [
      '<b>Kuşak I: 37 tekrar.</b> Huntington geninde glutamin kodonu CAG art arda tekrarlanır. Bu düzeyde hastalık hiç görülmeyebilir ya da geç başlar (Atlas notu: 36–39 eksik penetrans aralığı). [[K1 s. 11]]',
      '<b>Kuşak II: 41 tekrar.</b> Tekrar bölgesi kararsızdır; çocuğa aktarılırken uzamıştır. 40 ve üstünde hastalık beklenir (Atlas notu). [[K1 s. 11]]',
      '<b>Kuşak III: 46 tekrar.</b> Bu ailede tekrar sayısı kuşaktan kuşağa artmaya devam ediyor; hastalık daha genç yaşta ya da daha ağır başlayabilir. [[K1 s. 11]]',
      '<b>Kuşak IV: 54 tekrar.</b> Bu tabloya antisipasyon denir: aynı hastalık ailenin sonraki kuşaklarında giderek daha erken ya da daha ağır görülür. [[K1 s. 11]]',
    ];
    let k = RM ? 3 : 0, goster = AILE[k], son = '';
    const draw = () => {
      const n = Math.round(goster);
      ks.forEach((b, i) => { b.classList.toggle('on', i === k); b.classList.toggle('gec', i < k); b.dataset.z = bolge(AILE[i])[1]; });
      kare.forEach((q, i) => q.classList.toggle('var', i < n));
      say.textContent = n;
      imc.style.left = pc(clamp(n, LO, HI));
      if (CAP[k] !== son) { cap.innerHTML = REF(CAP[k]); son = CAP[k]; }
      ileri.disabled = k >= 3;
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const b = e.target.closest('.f03-ks'); if (b) { k = +b.dataset.i; if (RM) goster = AILE[k]; draw(); return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'bas') { k = 0; goster = RM ? AILE[0] : 0; }
      else if (k < 3) k++;
      if (RM) goster = AILE[k];
      draw();
    });
    draw();
    return ticker(el, (dt) => { const h = AILE[k]; if (Math.abs(goster - h) < 0.01) return; goster = goster < h ? Math.min(h, goster + dt * 26) : Math.max(h, goster - dt * 60); draw(); });
  };

  /* ---------- 5. Mayoz: çiftlerin rastgele ayrılması ve 2ⁿ gamet ---------- */
  VIZ.f03_gamet = (el) => {
    const MB = [249, 242, 198, 190, 181, 171, 159, 145, 138, 134, 135, 133, 114, 107, 102, 90, 83, 80, 59, 64, 47, 51];
    const H = (mb) => 12 + mb * 0.22, HX = H(156), HY = H(57);
    const cx = (i) => 18 + i * 14.4, YD = 100, YG = 236;
    const UST = '⁰¹²³⁴⁵⁶⁷⁸⁹', ust = (n) => String(n).split('').map((d) => UST[d]).join('');
    let cins = 'k', sec = Array(23).fill(0), T = 9, n = 3;
    const boy = (i, c) => (i < 22 ? H(MB[i]) : c === 1 && cins === 'e' ? HY : HX);
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Gameti oluşturan kişi"><button type="button" data-c="k" aria-pressed="true">Kadın (XX)</button><button type="button" data-c="e" aria-pressed="false">Erkek (XY)</button></div><button type="button" class="btn play" data-a="gamet">Gamet oluştur</button></div>
      <svg class="f03-gmt" viewBox="0 0 360 252" role="img" aria-label="23 kromozom çifti ve her çiftten rastgele birini alan bir gamet">
        <text class="f03-bolge" x="10" y="16">Diploit hücre · 46 kromozom (23 çift)</text>
        <g class="f03-dip">${Array.from({ length: 23 }, (_, i) => `<rect class="f03-kr a" x="${cx(i) - 5.6}" width="5" rx="2.5"/><rect class="f03-kr b" x="${cx(i) + 0.6}" width="5" rx="2.5"/>`).join('')}</g>
        ${[0, 4, 9, 14, 19].map((i) => `<text class="f03-kno" x="${cx(i)}" y="${YD + 12}" text-anchor="middle">${i + 1}</text>`).join('')}
        <text class="f03-kno f03-cno" x="${cx(22)}" y="${YD + 12}" text-anchor="middle">XX</text>
        <text class="f03-mayoz" x="180" y="${YD + 34}" text-anchor="middle">↓ mayoz: her çiftten rastgele biri ↓</text>
        <text class="f03-bolge" x="10" y="${YD + 58}">Gamet (haploit) · 23 kromozom</text>
        <g class="f03-gam">${Array.from({ length: 23 }, () => '<rect class="f03-kr" width="5" rx="2.5"/>').join('')}</g>
      </svg>
      <ul class="f03-lej"><li><i class="ka"></i>kişinin annesinden gelen kromozom</li><li><i class="kb"></i>babasından gelen kromozom</li></ul>
      <div class="f03-gm-oku" aria-live="polite"></div>
      <div class="f03-sayim">
        <div class="f03-say-b"><span class="small muted">Kaç farklı gamet? Çift sayısını seçin:</span><div class="seg" role="group" aria-label="Çift sayısı">${[1, 2, 3, 4, 23].map((v) => `<button type="button" data-n="${v}" aria-pressed="${v === n}">${v === 23 ? '23 çift' : v}</button>`).join('')}</div></div>
        <div class="f03-kombi"></div>
        <p class="f03-kombi-t"></p>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik çizim; kromozom boyları yaklaşık oranlıdır. Her çiftten birinin rastgele seçilmesi ve 2²³, 2⁴⁶ sayıları kitaptandır [[K1 s. 11]]. Atlas notu: kadının gametlerinin hepsi X, erkeğinkilerin yarısı X, yarısı Y taşır; mayozdaki krossing-over çeşitliliği daha da artırır ve burada gösterilmez.')}</p>`;
    const dip = [...el.querySelectorAll('.f03-dip rect')], gam = [...el.querySelectorAll('.f03-gam rect')];
    const oku = el.querySelector('.f03-gm-oku'), kombi = el.querySelector('.f03-kombi'), kt = el.querySelector('.f03-kombi-t'), cap = el.querySelector('.viz-cap'), cno = el.querySelector('.f03-cno');
    const sabit = () => {
      dip.forEach((r, j) => { const i = j >> 1, c = j & 1, h = boy(i, c); r.setAttribute('y', YD - h); r.setAttribute('height', h); });
      cno.textContent = cins === 'k' ? 'XX' : 'XY';
    };
    const draw = () => {
      gam.forEach((r, i) => {
        const c = sec[i], h = boy(i, c), f = RM ? 1 : ease(clamp((T - i * 0.035) / 0.7, 0, 1));
        const x0 = cx(i) - 5.6 + c * 6.2, x1 = cx(i) - 2.5;
        r.setAttribute('x', lerp(x0, x1, f)); r.setAttribute('y', lerp(YD, YG, f) - h); r.setAttribute('height', h);
        r.setAttribute('class', 'f03-kr ' + (c ? 'b' : 'a')); r.setAttribute('opacity', f > 0 ? 1 : 0);
      });
      dip.forEach((r, j) => r.classList.toggle('secildi', T > 0.05 && sec[j >> 1] === (j & 1)));
    };
    const yorumla = () => {
      const a = sec.filter((c) => c === 0).length, cs = cins === 'k' ? 'X' : sec[22] ? 'Y' : 'X';
      oku.innerHTML = `<span>Anneden <b>${a}</b></span><span>Babadan <b>${23 - a}</b></span><span>Cinsiyet kromozomu <b>${cs}</b></span>`;
      cap.innerHTML = REF(`<b>Bir gamet.</b> Mayozda her çiftin hangi üyesinin gamete gideceği rastlantıyla belirlenir; bu gamet 23 kromozomdan ${a} tanesini kişinin annesinden, ${23 - a} tanesini babasından almıştır. ${cins === 'e' ? `Erkekte cinsiyet çifti XY'dir; bu sperm ${cs} taşıyor.` : 'Kadında cinsiyet çifti XX olduğundan her yumurta X taşır.'} Gametler birleşince 23 çift yeniden oluşur. [[K1 s. 9]] [[K1 s. 11]]`);
    };
    const kombiCiz = () => {
      el.querySelectorAll('[data-n]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.n === n)));
      if (n <= 4) {
        kombi.innerHTML = Array.from({ length: 2 ** n }, (_, m) => `<span class="f03-km">${Array.from({ length: n }, (_, i) => `<i class="${(m >> (n - 1 - i)) & 1 ? 'b' : 'a'}" style="height:${(14 + (n - i) * 4)}px"></i>`).join('')}</span>`).join('');
        kt.innerHTML = `<b>${n}</b> çift → 2${ust(n)} = <b>${2 ** n}</b> farklı gamet. Her yeni çift olasılıkları ikiye katlar.`;
      } else {
        kombi.innerHTML = '';
        kt.innerHTML = `<b>23</b> çift → 2²³ = <b>${(2 ** 23).toLocaleString('tr-TR')}</b> farklı gamet. İki ebeveynin gametleri birleşince 2²³ × 2²³ = 2⁴⁶ ≈ <b>7,0 × 10¹³</b> (yaklaşık 70 trilyon) farklı çocuk olasıdır. ${REF('[[K1 s. 11]]')}`;
      }
    };
    const yeniGamet = () => { sec = sec.map(() => (Math.random() < 0.5 ? 0 : 1)); T = 0; yorumla(); };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const c = e.target.closest('[data-c]');
      if (c) { cins = c.dataset.c; el.querySelectorAll('[data-c]').forEach((b) => b.setAttribute('aria-pressed', String(b === c))); sabit(); yeniGamet(); draw(); return; }
      const v = e.target.closest('[data-n]'); if (v) { n = +v.dataset.n; kombiCiz(); return; }
      if (e.target.closest('[data-a="gamet"]')) { yeniGamet(); draw(); }
    });
    sec = [0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0];
    sabit(); yorumla(); kombiCiz(); draw();
    return ticker(el, (dt) => { if (T >= 2) return; T += dt; draw(); });
  };

  /* ---------- 6. Mendel kalıtımı: 2 × 2 kare ---------- */
  VIZ.f03_kalitim = (el) => {
    const AL = { // h: hastalık aleli
      ad: { ad: 'Otozomal dominant', anne: ['aa', 'Aa'], baba: ['aa', 'Aa'], kitap: ['aa', 'Aa'], h: 'A' },
      ar: { ad: 'Otozomal resesif', anne: ['AA', 'Aa', 'aa'], baba: ['AA', 'Aa', 'aa'], kitap: ['Aa', 'Aa'], h: 'a' },
      xr: { ad: 'X\'e bağlı resesif', anne: ['XX', 'Xx', 'xx'], baba: ['XY', 'xY'], kitap: ['Xx', 'XY'], h: 'x' },
    };
    const al = (c, tip) => { // alel gösterimi
      if (tip === 'xr') return c === 'Y' ? '<span class="f03-al">Y</span>' : c === 'x' ? '<span class="f03-al h">X<sup>a</sup></span>' : '<span class="f03-al">X</span>';
      return `<span class="f03-al${c === AL[tip].h ? ' h' : ''}">${c}</span>`;
    };
    const gt = (s, tip) => [...s].map((c) => al(c, tip)).join('');
    const ETK = { ad: { aa: 'sağlıklı', Aa: 'hasta' }, ar: { AA: 'sağlıklı', Aa: 'taşıyıcı', aa: 'hasta' }, xr: { XX: 'sağlıklı', Xx: 'taşıyıcı', xx: 'hasta', XY: 'sağlıklı', xY: 'hasta' } };
    const durum = (g, tip) => { // çocuğun genotipi → [etiket, sınıf, cinsiyet]
      if (tip === 'xr') { const k = g.includes('Y'); const n = k ? g : [...g].sort((p, q) => (p === 'X' ? -1 : q === 'X' ? 1 : 0)).join(''); const st = n === 'XX' || n === 'XY' ? ['sağlıklı', 'ok'] : n === 'Xx' ? ['taşıyıcı', 'warn'] : ['hasta', 'crit']; return { g: n, st, cs: k ? 'oğul' : 'kız' }; }
      const n = [...g].sort((p, q) => (p === p.toUpperCase() && q !== q.toUpperCase() ? -1 : p !== p.toUpperCase() && q === q.toUpperCase() ? 1 : 0)).join('');
      if (tip === 'ad') return { g: n, st: n.includes('A') ? ['hasta', 'crit'] : ['sağlıklı', 'ok'], cs: '' };
      return { g: n, st: n === 'aa' ? ['hasta', 'crit'] : n === 'Aa' ? ['taşıyıcı', 'warn'] : ['sağlıklı', 'ok'], cs: '' };
    };
    let tip = 'ar', anne = 'Aa', baba = 'Aa', aile = [];
    el.innerHTML = `<div class="viz-head"><div class="seg" role="group" aria-label="Kalıtım biçimi">${Object.entries(AL).map(([k, v]) => `<button type="button" data-t="${k}" aria-pressed="${k === tip}">${v.ad}</button>`).join('')}</div></div>
      <div class="f03-kal">
        <div class="f03-ebv"></div>
        <div class="f03-pun" role="table" aria-label="2 × 2 kare: ebeveyn gametleri ve çocuk genotipleri"></div>
        <div class="f03-oran"></div>
      </div>
      <div class="btn-row" style="margin-top:12px"><button type="button" class="btn" data-a="aile">Rastgele 4 çocuk</button><button type="button" class="btn ghost" data-a="kitap">Kitaptaki çaprazlama</button></div>
      <div class="f03-aile" aria-live="polite"></div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Kırmızı harf hastalık alelidir; X<sup>a</sup> hastalık alelini taşıyan X kromozomudur. Kitaptaki üç çaprazlama [[K1 s. 11–12]]; öbür ebeveyn birleşimleri aynı Mendel kurallarıyla hesaplanır (Atlas notu). Olasılıklar her gebelik için ayrı ayrı geçerlidir.')}</p>`;
    const ebv = el.querySelector('.f03-ebv'), pun = el.querySelector('.f03-pun'), oran = el.querySelector('.f03-oran'), ail = el.querySelector('.f03-aile'), cap = el.querySelector('.viz-cap');
    const hucreler = () => { const out = []; for (const m of anne) for (const p of baba) out.push(durum(m + p, tip)); return out; };
    const ciz = () => {
      const A = AL[tip];
      el.querySelectorAll('[data-t]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.t === tip)));
      const sec = (kim, liste, deger) => `<div class="f03-eb"><span class="f03-eb-k">${kim === 'anne' ? 'Anne' : 'Baba'}</span><div class="seg" role="group" aria-label="${kim}">${liste.map((g) => `<button type="button" data-${kim}="${g}" aria-pressed="${g === deger}"><span class="f03-gt">${gt(g, tip)}</span><small>${ETK[tip][g]}</small></button>`).join('')}</div></div>`;
      ebv.innerHTML = sec('anne', A.anne, anne) + sec('baba', A.baba, baba);
      const H = hucreler();
      pun.innerHTML = `<span class="f03-pk bos" role="cell"><small>anne ↓ · baba →</small></span>${[...baba].map((p) => `<span class="f03-pk bas" role="columnheader">${al(p, tip)}</span>`).join('')}
        ${[...anne].map((m, i) => `<span class="f03-pk bas" role="rowheader">${al(m, tip)}</span>${[0, 1].map((j) => { const c = H[i * 2 + j]; return `<span class="f03-pk ck ${c.st[1]}" role="cell" style="--d:${(i * 2 + j) * 0.12}s"><b>${gt(c.g, tip)}</b><small>${c.cs ? c.cs + ' · ' : ''}${c.st[0]}</small></span>`; }).join('')}`).join('')}`;
      // oranlar
      const say = { hasta: 0, taşıyıcı: 0, sağlıklı: 0 };
      H.forEach((c) => { say[c.st[0]]++; });
      const seg = [['hasta', 'crit'], ['taşıyıcı', 'warn'], ['sağlıklı', 'ok']].filter(([k]) => say[k]);
      let cins = '';
      if (tip === 'xr') {
        const kz = H.filter((c) => c.cs === 'kız'), og = H.filter((c) => c.cs === 'oğul');
        const yuz = (arr, k) => Math.round((arr.filter((c) => c.st[0] === k).length / arr.length) * 100);
        cins = `<p class="small"><b>Kızlar:</b> %${yuz(kz, 'hasta')} hasta, %${yuz(kz, 'taşıyıcı')} taşıyıcı, %${yuz(kz, 'sağlıklı')} sağlıklı<br><b>Oğullar:</b> %${yuz(og, 'hasta')} hasta, %${yuz(og, 'sağlıklı')} sağlıklı</p>`;
      }
      oran.innerHTML = `<span class="small muted">Her çocuk için olasılık</span><div class="f03-cubuk">${seg.map(([k, c]) => `<i class="${c}" style="flex:${say[k]}">%${say[k] * 25}</i>`).join('')}</div>
        <div class="f03-cubuk-l">${seg.map(([k, c]) => `<span><i class="${c}"></i>${k} %${say[k] * 25}</span>`).join('')}</div>${cins}`;
      // açıklama
      const k = `${anne}|${baba}`;
      let c;
      if (tip === 'ad' && ((anne === 'aa' && baba === 'Aa') || (anne === 'Aa' && baba === 'aa'))) c = '<b>Otozomal dominant, kitaptaki çaprazlama.</b> Hasta ebeveynin gametlerinin yarısı hastalık alelini taşır; tek alel hastalık için yeter. Her çocuk için %50 hasta (Aa), %50 sağlıklı (aa). [[K1 s. 11–12]]';
      else if (tip === 'ar' && k === 'Aa|Aa') c = '<b>Otozomal resesif, kitaptaki çaprazlama.</b> İki taşıyıcı ebeveynin her çocuğu için %25 hastalıksız (AA), %50 taşıyıcı (Aa), %25 hasta (aa, homozigot). Ebeveynlerin kendisi genellikle hasta değildir. [[K1 s. 11–12]]';
      else if (tip === 'xr' && k === 'Xx|XY') c = '<b>X\'e bağlı resesif, kitaptaki çaprazlama.</b> Taşıyıcı annenin çocuklarının %25\'i taşıyıcı kız, %25\'i sağlıklı kız, %25\'i sağlıklı oğul, %25\'i hasta oğuldur. Oğulun tek X kromozomu vardır ve onu anneden alır; kızlarda babadan gelen normal X korur. [[K1 s. 12]]';
      else if (tip === 'xr' && baba === 'xY' && anne === 'XX') c = '<b>Hasta baba, sağlıklı anne.</b> Baba X kromozomunu yalnız kızlarına, Y kromozomunu yalnız oğullarına verir: bütün kızlar taşıyıcı, bütün oğullar sağlıklıdır (Atlas notu: X\'e bağlı hastalık babadan oğula geçmez).';
      else c = `<b>${A.ad}.</b> Her ebeveyn her çocuğa iki alelinden birini rastgele verir; kare dört eşit olasılığı gösterir (Atlas notu: kitap yalnızca temel çaprazlamaları anlatır; bu birleşim aynı kurallarla hesaplanmıştır). [[K1 s. 11]]`;
      cap.innerHTML = REF(c);
      aileCiz();
    };
    const aileCiz = () => {
      if (!aile.length) { ail.innerHTML = ''; return; }
      const hs = aile.filter((c) => c.st[0] === 'hasta').length, ph = hucreler().filter((c) => c.st[0] === 'hasta').length * 25;
      ail.innerHTML = `<div class="f03-cocuk">${aile.map((c, i) => `<span class="${c.st[1]}" style="--d:${i * 0.15}s"><b>${gt(c.g, tip)}</b><small>${c.cs ? c.cs + ' · ' : ''}${c.st[0]}</small></span>`).join('')}</div><p class="small muted">Bu ailede 4 çocuktan ${hs} tanesi hasta. Hasta olma olasılığı her gebelikte yeniden %${ph}; bu olasılık, çocukların tam olarak bu oranda hasta olacağı anlamına gelmez (Atlas notu).</p>`;
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ref')) return;
      const t = e.target.closest('[data-t]');
      if (t) { tip = t.dataset.t; [anne, baba] = AL[tip].kitap; aile = []; ciz(); return; }
      const m = e.target.closest('[data-anne]'); if (m) { anne = m.dataset.anne; aile = []; ciz(); return; }
      const p = e.target.closest('[data-baba]'); if (p) { baba = p.dataset.baba; aile = []; ciz(); return; }
      const a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'kitap') { [anne, baba] = AL[tip].kitap; aile = []; ciz(); }
      if (a.dataset.a === 'aile') { const H = hucreler(); aile = Array.from({ length: 4 }, () => H[Math.floor(Math.random() * 4)]); aileCiz(); }
    });
    ciz();
    return () => {};
  };

  /* ---------- 7. Penetrans: 100 taşıyıcıdan kaçında hastalık gelişir? ---------- */
  VIZ.f03_penetrans = (el) => {
    let s = 11; const SIRA = Array.from({ length: 100 }, (_, i) => i);
    for (let i = 99; i > 0; i--) { s = (s * 1103515245 + 12345) % 2147483648; const j = s % (i + 1); [SIRA[i], SIRA[j]] = [SIRA[j], SIRA[i]]; }
    const RUT = Array(100); SIRA.forEach((k, r) => { RUT[k] = r; });
    let p = 70;
    el.innerHTML = `<div class="viz-head"><h3>Mutasyonu taşıyan 100 kişi</h3><div class="btn-row"><button type="button" class="btn ghost" data-p="100">Nörofibromatozis · %100</button><button type="button" class="btn ghost" data-p="70">Hipertrofik kardiyomiyopati · ≈%70</button></div></div>
      <div class="f03-pen">
        <div class="f03-waf" role="img" aria-label="100 kişilik ızgara: hastalık gelişenler dolu">${Array.from({ length: 100 }, (_, i) => `<i data-k="${i}"></i>`).join('')}</div>
        <div class="f03-pen-yan">
          <label class="f03-kay"><span>Penetrans: <b class="pv"></b></span><input type="range" min="0" max="100" step="5" value="${p}" aria-label="Penetrans yüzdesi"></label>
          <div class="f03-pen-oku"></div>
          <ul class="f03-lej"><li><i class="pd"></i>hastalık gelişen</li><li><i class="pb"></i>mutasyonu taşıdığı hâlde hastalık gelişmeyen</li></ul>
        </div>
      </div>
      <p class="viz-cap" aria-live="polite"></p>
      <p class="viz-foot">${REF('Şematik ızgara. Penetrans tanımı ve iki örnek kitaptandır [[K1 s. 12]]. Çocuğun hastalığı gösterme olasılığı, genotipi alma olasılığı ile penetransın çarpımıdır (hesap: Atlas notu).')}</p>`;
    const kis = [...el.querySelectorAll('.f03-waf i')], pv = el.querySelector('.pv'), okuma = el.querySelector('.f03-pen-oku'), cap = el.querySelector('.viz-cap'), kay = el.querySelector('input');
    const draw = () => {
      kis.forEach((q, i) => q.classList.toggle('on', RUT[i] < p));
      pv.textContent = '%' + p; kay.value = p;
      el.querySelectorAll('[data-p]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.p === p)));
      okuma.innerHTML = `<p>100 taşıyıcıdan <b>${p}</b> kişide hastalık gelişir, <b>${100 - p}</b> kişide gelişmez.</p><p class="small">Hasta ebeveyn (Aa) × sağlıklı ebeveyn (aa): çocuğun alel taşıma olasılığı %50, hastalığı gösterme olasılığı %50 × %${p} = <b>%${fmt(p / 2, p % 2 ? 1 : 0)}</b>.</p>`;
      const c = p === 100 ? '<b>Tam penetrans.</b> Mutasyonu alan herkeste hastalık gelişir; kitaptaki örnek nörofibromatozistir. [[K1 s. 12]]'
        : p === 0 ? '<b>Penetrans sıfır.</b> Genotip aktarılır ama hiç kimsede fenotip görülmez; bu uç değer yalnızca karşılaştırma içindir.'
          : `<b>Eksik penetrans.</b> Genotip aktarılır, ama fenotip her taşıyıcıda görülmez: burada 100 taşıyıcıdan ${p} kişide hastalık var. Hipertrofik kardiyomiyopatide bu oran yaklaşık 70'tir. Eksik penetrans çoğunlukla otozomal dominant hastalıklar için söz konusudur. [[K1 s. 12]]`;
      cap.innerHTML = REF(c);
    };
    el.addEventListener('input', (e) => { if (e.target === kay) { p = +kay.value; draw(); } });
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-p]'); if (b) { p = +b.dataset.p; draw(); } });
    draw();
    return () => {};
  };
  /* ---------- 8. Çekirdekten kromozoma: kromatin → kromozom → 23 çift (tarif: docs/tasarim/fiz03.md) ---------- */
  VIZ.f03_kromozom = (el) => {
    const MB = [249, 242, 198, 190, 181, 171, 159, 145, 138, 134, 135, 133, 114, 107, 102, 90, 83, 80, 59, 64, 47, 51];
    const H = (mb) => mb * 70 / 249;
    const ETIKET = [1, 5, 10, 15, 20, 22];
    const vizEl = el.closest('.viz'), cap = vizEl ? vizEl.querySelector('.viz-cap') : null;
    const MET = {
      vucut: 'Çekirdekteki yoğun kromatin, bölünme öncesinde iplik benzeri kromozomlara düzenlenir; her kromozom kıvrılmış tek bir DNA molekülüdür. Hücrede 46 kromozom (23 çift): 22 çift otozom ve 1 çift allozom (XX ya da XY); gamette 23. [[K1 s. 9]]',
      gamet: 'Gametler (sperm ve yumurta) her çiftten yalnız birini, toplam 23 kromozom taşır. [[K1 s. 9]] [[K1 s. 11]]',
      k: 'Kadında cinsiyet kromozomu çifti XX\'tir. İki kromozom tipi de DNA taşır; cinsiyeti yalnız allozomlar belirler. [[K1 s. 9]]',
      e: 'Erkekte cinsiyet kromozomu çifti XY\'dir. İki kromozom tipi de DNA taşır; cinsiyeti yalnız allozomlar belirler. [[K1 s. 9]]',
      A: 'Bir kişinin genetik kodu her hücrenin çekirdeğinde kromatin denen yoğun bir yapı içinde paketlenmiştir. [[K1 s. 9]]',
      B: 'Hücre bölünmeye hazırlanırken kromatin iplik benzeri kromozomlara düzenlenir; her kromozom aslında kıvrılmış tek parça bir DNA molekülüdür. [[K1 s. 9]]'
    };
    let cins = 'k', hucre = 'v', son = 'vucut', dar = null, odak = null;
    /* sabit tohumlu sözde rastgele: kromatin iplikleri her açılışta aynı */
    let tohum = 7;
    const rnd = () => { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; };
    const kromatin = (cx, cy, R) => {
      tohum = 7;
      return Array.from({ length: 8 }, () => {
        let a = rnd() * 6.283;
        const p = Array.from({ length: 8 }, () => { a += 0.7 + rnd() * 0.9; const r = R * (0.2 + 0.72 * rnd()); return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
        let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
        for (let i = 1; i < p.length - 1; i++) { const m = [(p[i][0] + p[i + 1][0]) / 2, (p[i][1] + p[i + 1][1]) / 2]; d += ` Q${p[i][0].toFixed(1)} ${p[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`; }
        return `<path class="f03-km-ip" d="${d}"/>`;
      }).join('');
    };
    const ok = (x1, y1, x2, y2) => {
      const a = Math.atan2(y2 - y1, x2 - x1), u = 7;
      const k1 = [x2 - u * Math.cos(a - 0.45), y2 - u * Math.sin(a - 0.45)], k2 = [x2 - u * Math.cos(a + 0.45), y2 - u * Math.sin(a + 0.45)];
      return `<line class="f03-km-ok" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><path class="f03-km-okb" d="M${k1[0].toFixed(1)} ${k1[1].toFixed(1)} L${x2} ${y2} L${k2[0].toFixed(1)} ${k2[1].toFixed(1)}Z"/>`;
    };
    const metin = (x, y, sat, sinif, anc = 'middle', ara = 15) => sat.map((s, i) => `<text class="${sinif}" x="${x}" y="${y + i * ara}" text-anchor="${anc}">${esc(s)}</text>`).join('');
    /* X biçimli kromozom: dört kol, iki kat çizgiyle (dış çizgi + iç dolgu), enine bantlar */
    const kromozom = (cx, cy, w, h) => {
      const c = [[cx - 6, cy], [cx + 6, cy]];
      const uc = [[cx - w, cy - h], [cx - w - 2, cy + h], [cx + w, cy - h], [cx + w + 2, cy + h]];
      const kol = uc.map((u, i) => [c[i < 2 ? 0 : 1], u]);
      const yol = kol.map(([a, b]) => `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`).join(' ');
      const bant = kol.map(([a, b]) => {
        const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L * 8, ny = dx / L * 8;
        return [0.3, 0.5, 0.68, 0.85].map((t) => { const x = a[0] + dx * t, y = a[1] + dy * t; return `M${(x - nx).toFixed(1)} ${(y - ny).toFixed(1)} L${(x + nx).toFixed(1)} ${(y + ny).toFixed(1)}`; }).join(' ');
      }).join(' ');
      return { svg: `<path class="f03-km-kd" d="${yol}"/><path class="f03-km-ki" d="${yol}"/><path class="f03-km-bant" d="${bant}"/><circle class="f03-km-sen" cx="${cx}" cy="${cy}" r="3.2"/>`, uc: uc[2] };
    };
    /* büyüteç: kıvrım açılınca görülen çift sarmal merdiveni */
    const buyutec = (mx, my, r, kim) => {
      let o1 = '', o2 = '', bas = '';
      for (let i = 0; i <= 40; i++) {
        const x = mx - r - 4 + i * (2 * r + 8) / 40, f = (x - mx) * 0.11, y1 = my + 11 * Math.sin(f), y2 = my - 11 * Math.sin(f);
        o1 += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y1.toFixed(1)} `; o2 += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y2.toFixed(1)} `;
      }
      for (let k = -2; k <= 2; k++) { const x = mx + k * 11 + 5.5, f = (x - mx) * 0.11, y = 11 * Math.sin(f); if (Math.abs(y) > 3) bas += `M${x.toFixed(1)} ${(my + y).toFixed(1)} L${x.toFixed(1)} ${(my - y).toFixed(1)} `; }
      return `<clipPath id="${kim}"><circle cx="${mx}" cy="${my}" r="${r}"/></clipPath>
        <circle class="f03-km-bz" cx="${mx}" cy="${my}" r="${r}"/>
        <g clip-path="url(#${kim})"><path class="f03-km-bas" d="${bas}"/><path class="f03-km-om" d="${o1}"/><path class="f03-km-om" d="${o2}"/></g>
        <circle class="f03-km-bc" cx="${mx}" cy="${my}" r="${r}"/>`;
    };
    /* çiftler: her çiftin iki çubuğu; gamette biri silik */
    const cift = (x, taban, i) => {
      const g = hucre === 'g', cin = i === 22;
      const h1 = cin ? H(156) : H(MB[i]), h2 = cin ? (cins === 'e' ? H(57) : H(156)) : H(MB[i]);
      const s = cin ? 'f03-km-al' : 'f03-km-ot';
      if (g && cin && cins === 'e') return `<rect class="${s}" x="${x - 2.5}" y="${(taban - h1).toFixed(1)}" width="5" height="${h1.toFixed(1)}" rx="2.5"/><text class="f03-km-xy" x="${x}" y="${(taban - h1 - 4).toFixed(1)}" text-anchor="middle">X/Y</text>`;
      return `<rect class="${s}" x="${x - 5.75}" y="${(taban - h1).toFixed(1)}" width="5" height="${h1.toFixed(1)}" rx="2.5"/><rect class="${s}${g ? ' f03-km-silik' : ''}" x="${x + 0.75}" y="${(taban - h2).toFixed(1)}" width="5" height="${h2.toFixed(1)}" rx="2.5"/>`;
    };
    const no = (x, y, i) => (ETIKET.includes(i + 1) ? `<text class="f03-km-n" x="${x}" y="${y}" text-anchor="middle">${i + 1}</text>` : '');
    const cinsAd = () => (hucre === 'g' ? (cins === 'e' ? 'X ya da Y' : 'X') : cins === 'e' ? 'XY' : 'XX');
    const sayac = () => (hucre === 'g' ? '23 kromozom (tek takım)' : '46 kromozom (23 çift)');
    const adet = (n, c) => (hucre === 'g' ? `${n}` : `${c} çift`);

    const genis = () => {
      const k = kromozom(262, 105, 23, 63);
      let C = '';
      for (let i = 0; i < 22; i++) { const r = i < 11 ? 0 : 1, x = 432 + (i % 11) * 17, t = r ? 168 : 106; C += cift(x, t, i) + no(x, t + 13, i); }
      C += cift(669, 168, 22);
      return `<svg class="f03-km-svg" viewBox="0 0 720 290" role="img" aria-label="Çekirdekteki kromatin, bölünmeye hazırlanırken kromozomlara düzenlenir; insan hücresinde 22 çift otozom ve 1 çift allozom">
        <g class="f03-km-pano" data-p="A" tabindex="0" role="button" aria-label="Pano A: çekirdekte kromatin">
          <rect class="f03-km-zemin" x="0" y="0" width="160" height="260"/>
          ${metin(80, 18, ['Çekirdek: kromatin'], 'f03-km-t')}
          <circle class="f03-km-hc" cx="80" cy="112" r="72"/><circle class="f03-km-ck" cx="80" cy="112" r="46"/>
          <clipPath id="f03-kr-clip-a"><circle cx="80" cy="112" r="44"/></clipPath><g clip-path="url(#f03-kr-clip-a)">${kromatin(80, 112, 46)}</g>
          ${metin(80, 212, ['Kromatin'], 'f03-km-l')}${metin(80, 228, ['çekirdekte yoğun', 'paketlenmiş genetik kod'], 'f03-km-s', 'middle', 14)}
        </g>
        ${ok(160, 112, 222, 112)}${metin(191, 76, ['hücre', 'bölünmeye', 'hazırlanırken'], 'f03-km-o', 'middle', 11.5)}
        <g class="f03-km-pano" data-p="B" tabindex="0" role="button" aria-label="Pano B: kromozom, kıvrılmış tek bir DNA molekülü">
          <rect class="f03-km-zemin" x="226" y="0" width="142" height="260"/>
          ${metin(280, 18, ['Kromozom'], 'f03-km-t')}
          ${k.svg}<line class="f03-km-kes" x1="${k.uc[0] + 6}" y1="${k.uc[1] + 2}" x2="314" y2="64"/>
          ${buyutec(334, 74, 22, 'f03-kr-clip')}${metin(334, 110, ['çift sarmal'], 'f03-km-s')}
          ${metin(272, 212, ['Kromozom'], 'f03-km-l')}${metin(272, 228, ['kıvrılmış tek bir', 'DNA molekülü'], 'f03-km-s', 'middle', 14)}
        </g>
        ${ok(370, 112, 414, 112)}${metin(392, 88, ['hücrede', hucre === 'g' ? '23 tane' : '46 tane'], 'f03-km-o', 'middle', 11.5)}
        <g class="f03-km-pano" data-p="C" tabindex="0" role="button" aria-label="Pano C: 22 çift otozom ve 1 çift allozom">
          <rect class="f03-km-zemin" x="418" y="0" width="302" height="290"/>
          ${metin(570, 18, [hucre === 'g' ? '23 çiftten birer' : '23 çift'], 'f03-km-t')}
          ${C}
          <rect class="f03-km-kutu" x="636" y="106" width="66" height="82" rx="8"/>
          <text class="f03-km-xx" x="669" y="182" text-anchor="middle">${cinsAd()}</text>
          ${metin(669, 44, ['Allozomlar'], 'f03-km-l f03-km-lc')}${metin(669, 59, ['(cinsiyet', 'kromozomları)', adet(1, 1)], 'f03-km-s', 'middle', 13)}
          ${metin(669, 206, ['XX ya da XY;', 'cinsiyeti yalnız', 'bunlar belirler'], 'f03-km-s', 'middle', 13)}
          <path class="f03-km-ayr" d="M424 190 v6 H610 v-6 M517 196 v5"/>
          ${metin(517, 216, [`Otozomlar · ${adet(22, 22)}`], 'f03-km-l')}${metin(517, 231, ['DNA taşır, cinsiyeti belirlemez'], 'f03-km-s')}
          ${metin(517, 268, [sayac()], 'f03-km-say')}
        </g>
      </svg>`;
    };
    const darCiz = () => {
      const k = kromozom(160, 388, 23, 52);
      let C = '';
      for (let i = 0; i < 22; i++) { const r = Math.floor(i / 8), x = 40 + (i % 8) * 40, t = [640, 705, 775][r]; C += cift(x, t, i) + no(x, t + 13, i); }
      C += cift(320, 775, 22);
      return `<svg class="f03-km-svg" viewBox="0 0 360 912" role="img" aria-label="Çekirdekteki kromatin, bölünmeye hazırlanırken kromozomlara düzenlenir; insan hücresinde 22 çift otozom ve 1 çift allozom">
        <g class="f03-km-pano" data-p="A" tabindex="0" role="button" aria-label="Pano A: çekirdekte kromatin">
          <rect class="f03-km-zemin" x="0" y="0" width="360" height="244"/>
          ${metin(180, 18, ['Çekirdek: kromatin'], 'f03-km-t')}
          <circle class="f03-km-hc" cx="180" cy="108" r="72"/><circle class="f03-km-ck" cx="180" cy="108" r="46"/>
          <clipPath id="f03-kr-clip-a"><circle cx="180" cy="108" r="44"/></clipPath><g clip-path="url(#f03-kr-clip-a)">${kromatin(180, 108, 46)}</g>
          ${metin(180, 204, ['Kromatin'], 'f03-km-l')}${metin(180, 220, ['çekirdekte yoğun paketlenmiş genetik kod'], 'f03-km-s')}
        </g>
        ${ok(180, 246, 180, 286)}${metin(194, 262, ['hücre bölünmeye', 'hazırlanırken'], 'f03-km-o', 'start', 13)}
        <g class="f03-km-pano" data-p="B" tabindex="0" role="button" aria-label="Pano B: kromozom, kıvrılmış tek bir DNA molekülü">
          <rect class="f03-km-zemin" x="0" y="290" width="360" height="206"/>
          ${metin(180, 308, ['Kromozom'], 'f03-km-t')}
          ${k.svg}<line class="f03-km-kes" x1="${k.uc[0] + 6}" y1="${k.uc[1] + 2}" x2="223" y2="348"/>
          ${buyutec(250, 360, 30, 'f03-kr-clip')}${metin(250, 406, ['çift sarmal'], 'f03-km-s')}
          ${metin(180, 468, ['Kromozom'], 'f03-km-l')}${metin(180, 484, ['kıvrılmış tek bir DNA molekülü'], 'f03-km-s')}
        </g>
        ${ok(180, 498, 180, 538)}${metin(194, 522, [hucre === 'g' ? 'hücrede 23 tane' : 'hücrede 46 tane'], 'f03-km-o', 'start')}
        <g class="f03-km-pano" data-p="C" tabindex="0" role="button" aria-label="Pano C: 22 çift otozom ve 1 çift allozom">
          <rect class="f03-km-zemin" x="0" y="542" width="360" height="370"/>
          ${metin(180, 560, [hucre === 'g' ? '23 çiftten birer' : '23 çift'], 'f03-km-t')}
          ${C}
          <rect class="f03-km-kutu" x="287" y="712" width="66" height="84" rx="8"/>
          <text class="f03-km-xx" x="320" y="790" text-anchor="middle">${cinsAd()}</text>
          <path class="f03-km-ayr" d="M22 800 v6 H262 v-6"/>
          <rect class="f03-km-sw ot" x="20" y="818" width="10" height="10" rx="2"/>${metin(36, 828, [`Otozomlar · ${adet(22, 22)}`], 'f03-km-l', 'start')}${metin(36, 843, ['DNA taşır, cinsiyeti belirlemez'], 'f03-km-s', 'start')}
          <rect class="f03-km-sw al" x="20" y="854" width="10" height="10" rx="2"/>${metin(36, 864, [`Allozomlar (cinsiyet kromozomları) · ${adet(1, 1)}`], 'f03-km-l', 'start')}${metin(36, 879, ['XX ya da XY; cinsiyeti yalnız bunlar belirler'], 'f03-km-s', 'start')}
          ${metin(180, 906, [sayac()], 'f03-km-say')}
        </g>
      </svg>`;
    };
    el.innerHTML = `<div class="f03-km-ust">
        <div class="seg" role="group" aria-label="Cinsiyet"><button type="button" data-c="k" aria-pressed="true">Kadın (XX)</button><button type="button" data-c="e" aria-pressed="false">Erkek (XY)</button></div>
        <div class="seg" role="group" aria-label="Hücre"><button type="button" data-h="v" aria-pressed="true">Vücut hücresi</button><button type="button" data-h="g" aria-pressed="false">Gamet (sperm, yumurta)</button></div>
      </div><div class="f03-km-cizim"></div>`;
    const kap = el.querySelector('.f03-km-cizim');
    const yaz = () => { if (cap) cap.innerHTML = REF(MET[odak && odak !== 'C' ? odak : son]); };
    const vurgu = () => kap.querySelectorAll('.f03-km-pano').forEach((g) => g.classList.toggle('silik', !!odak && g.dataset.p !== odak));
    const ciz = () => {
      kap.innerHTML = dar ? darCiz() : genis();
      el.querySelectorAll('[data-c]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.c === cins)));
      el.querySelectorAll('[data-h]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.h === hucre)));
      vurgu();
    };
    const bak = () => { const d = el.clientWidth < 560; if (d !== dar) { dar = d; ciz(); } };
    const odakla = (p) => { if (p === odak) return; odak = p; vurgu(); yaz(); };
    el.addEventListener('click', (e) => {
      const c = e.target.closest('[data-c]');
      if (c) { cins = c.dataset.c; son = hucre === 'g' ? 'gamet' : cins; ciz(); yaz(); return; }
      const h = e.target.closest('[data-h]');
      if (h) { hucre = h.dataset.h; son = hucre === 'g' ? 'gamet' : 'vucut'; ciz(); yaz(); return; }
      const p = e.target.closest('.f03-km-pano'); odakla(p && p.dataset.p !== odak ? p.dataset.p : null);
    });
    const uzerinde = (e) => { const p = e.target.closest('.f03-km-pano'); odakla(p ? p.dataset.p : null); };
    kap.addEventListener('mouseover', uzerinde);
    kap.addEventListener('mouseleave', () => odakla(null));
    kap.addEventListener('focusin', uzerinde);
    kap.addEventListener('focusout', () => odakla(null));
    bak();
    let ro = null;
    if ('ResizeObserver' in window) { ro = new ResizeObserver(bak); ro.observe(el); } else window.addEventListener('resize', bak);
    return () => { if (ro) ro.disconnect(); else window.removeEventListener('resize', bak); };
  };
})();
