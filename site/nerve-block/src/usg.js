// Sanal USG: 3B modelin prob kesit düzlemindeki dilimi → B-mod benzetimi ve renkli kesit anatomisi.
// Gerçek USG görüntüsü değildir; modeldeki yapıların bu düzlemde nerede olduğunu USG diliyle gösterir.
//
// Yöntem: her karede düzlem ile tüm parçaların üçgenleri kesişir → 2B doğru parçaları. Her tarama çizgisi
// (sütun) bu parçaları keser; kapalı yüzeylerde tek-çift kuralıyla "içeride" aralıkları bulunur. Böylece her
// pikselin hangi yapıya ait olduğu (etiket haritası) çıkar; ardından sütun boyunca yukarıdan aşağı dokuya göre
// yankı, arayüz parlaklığı, kemik gölgesi, plevra A-çizgileri, sıvı arkası güçlenme, iğne yankısı hesaplanır.
import * as THREE from 'three';

// Sınıflar ve öncelik (aynı noktada birden çok yapı varsa yüksek öncelik görünür)
const S = { DERI: 0, KAS: 1, FASYA: 2, ARTER: 3, VEN: 4, SINIR: 5, KOK: 6, KEMIK: 7, KIKIRDAK: 8, BAG: 9,
  ORGAN: 10, PLEVRA: 11, HAVA: 12, BAGIRSAK: 13, LA: 14, IGNE: 15 };
const ONCELIK = [1, 3, 0, 8, 8, 7, 7, 6, 5, 4, 4, 5, 6, 5, 9, 10];
const CIZGI = new Set([S.FASYA]); // kapalı hacim değil, ince levha: geçtiği yer parlak çizgi
const SIVI = new Set([S.ARTER, S.VEN, S.LA]);
const DIS = -1; // deri yüzeyinin üstü (jel)
const GOVDE = -2; // deri içinde, ayrı yapı yok: ciltaltı / bağ dokusu

const RENK_ANAT = {
  [S.KAS]: [180, 80, 63], [S.ARTER]: [216, 53, 42], [S.VEN]: [47, 95, 216], [S.SINIR]: [245, 208, 47], [S.KOK]: [245, 208, 47],
  [S.KEMIK]: [238, 230, 210], [S.KIKIRDAK]: [207, 224, 232], [S.BAG]: [251, 247, 236], [S.ORGAN]: [200, 120, 110],
  [S.PLEVRA]: [240, 163, 180], [S.HAVA]: [120, 140, 160], [S.BAGIRSAK]: [205, 150, 130], [S.LA]: [127, 227, 255],
  [S.IGNE]: [230, 232, 236], [S.FASYA]: [79, 209, 184],
};
const GOVDE_RENK = [242, 214, 190];
const AKCIGER_RENK = [214, 186, 196];

function sinifBul(m) {
  const ad = m.name, k = m.userData.layer;
  if (k === 'deri') return S.DERI;
  if (k === 'kas') return S.KAS;
  if (k === 'fasya') return S.FASYA;
  if (k === 'arter') return S.ARTER;
  if (k === 'ven') return S.VEN;
  if (k === 'sinir') return /Roots|trunk|division/i.test(ad) ? S.KOK : S.SINIR;
  if (k === 'kemik') return /cartilage|kıkırdak/i.test(ad) ? S.KIKIRDAK : S.KEMIK;
  if (k === 'bag') return S.BAG;
  if (k === 'organ') {
    if (/Pleura|Lung/i.test(ad)) return S.PLEVRA;
    if (/Trachea/i.test(ad)) return S.HAVA;
    if (/colon|jejun|ileum|intestin|duoden|bowel/i.test(ad)) return S.BAGIRSAK;
    return S.ORGAN;
  }
  return null;
}

// Tekrarlanabilir gürültü dokuları (256×256)
function gurultuler() {
  const N = 256, rnd = mulberry(7);
  const ham = new Float32Array(N * N);
  for (let i = 0; i < ham.length; i++) ham[i] = Math.sqrt(-2 * Math.log(1 - rnd() * 0.999)); // Rayleigh
  // benek: yanal (x) yönde uzun taneler
  const benek = (kaydir) => {
    const o = new Float32Array(N * N);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      let s = 0;
      for (let k = -2; k <= 2; k++) s += ham[y * N + ((x + k + kaydir) & 255)] * (k === 0 ? 1.4 : 1);
      s += ham[((y + 1) & 255) * N + x] * 0.6;
      o[y * N + x] = s / 6.6;
    }
    let m = 0; for (const v of o) m += v; m /= o.length;
    for (let i = 0; i < o.length; i++) o[i] /= m * 2; // ortalama 0,5
    return o;
  };
  const a = benek(0);
  const b = new Float32Array(N * N);
  { const ham2 = ham.slice().reverse(); for (let i = 0; i < b.length; i++) b[i] = ham2[i]; }
  const b2 = (() => { const t = new Float32Array(N * N); for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { let s = 0; for (let k = -2; k <= 2; k++) s += b[y * N + ((x + k) & 255)]; t[y * N + x] = s / 5; } let m = 0; for (const v of t) m += v; m /= t.length; for (let i = 0; i < t.length; i++) t[i] /= m * 2; return t; })();
  // çizgiler (yağ septaları, kas lifleri): yatayda çok uzun, düşeyde ince
  const cizgi = new Float32Array(N * N);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    let s = 0;
    for (let k = -4; k <= 4; k++) s += ham[((y + (k > 1 ? 1 : k < -1 ? -1 : 0)) & 255) * N + ((x + k * 2) & 255)];
    cizgi[y * N + x] = s / 9;
  }
  { // z-skoruna çevir (ortalama 0, sd 1): eşikler dağılımdan bağımsız olsun
    let m = 0; for (const v of cizgi) m += v; m /= cizgi.length;
    let sd = 0; for (const v of cizgi) sd += (v - m) * (v - m); sd = Math.sqrt(sd / cizgi.length);
    for (let i = 0; i < cizgi.length; i++) cizgi[i] = (cizgi[i] - m) / sd;
  }
  return { N, a, b: b2, cizgi, nokta: ham };
}
// Konum özniteliği iç içe (konum+normal tek tamponda) olabilir: düz Float32Array'e çevir
function konumlar(attr) {
  if (!attr.isInterleavedBufferAttribute && attr.array.length === attr.count * 3) return attr.array;
  const o = new Float32Array(attr.count * 3);
  for (let i = 0; i < attr.count; i++) { o[i * 3] = attr.getX(i); o[i * 3 + 1] = attr.getY(i); o[i * 3 + 2] = attr.getZ(i); }
  return o;
}
function mulberry(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

export class SanalUSG {
  constructor(app) {
    this.app = app;
    this.gur = gurultuler();
    this.mod = 'usg'; // usg | anatomi | ikisi
    this.etiketAcik = true;
    this.kullaniciKapatti = false;
    this.son = 0;
    this.Nx = 200; // tarama çizgisi sayısı
    this.olcek = 2.2; // görüntü pikseli → ekran tuvali pikseli
    this.bmod = document.createElement('canvas');
    this.anat = document.createElement('canvas');
    this.tuval = document.createElement('canvas'); // ekranda ve AR dokusunda gösterilen
    this.cizildi = []; // her çizimden sonra çağrılır (AR dokusu güncellemesi)
    this.domKur();
  }

  // ---------------------------------------------------------------- arayüz
  domKur() {
    const kap = document.createElement('div');
    kap.id = 'usg';
    kap.className = 'usg';
    kap.hidden = true;
    kap.innerHTML = `
      <div class="usg-ust">
        <span class="usg-baslik">Sanal USG</span>
        <div class="usg-mod" role="group" aria-label="Görünüm">
          <button data-mod="usg" aria-pressed="true">USG</button><button data-mod="anatomi" aria-pressed="false">Anatomi</button><button data-mod="ikisi" aria-pressed="false">İkisi</button>
        </div>
        <button class="usg-etiket" aria-pressed="true" title="USG etiketleri">Etiket</button>
        <button class="usg-kapat" title="Sanal USG'yi gizle" aria-label="Gizle">✕</button>
      </div>
      <div class="usg-tuval"></div>
      <p class="usg-not">3B modelin prob düzlemindeki kesitinden üretilen benzetim; gerçek USG görüntüsü değildir. Sol üstteki ● prob işaretinin tarafıdır.</p>`;
    kap.querySelector('.usg-tuval').appendChild(this.tuval);
    for (const b of kap.querySelectorAll('[data-mod]')) b.onclick = () => this.modSec(b.dataset.mod);
    kap.querySelector('.usg-etiket').onclick = (e) => {
      this.etiketAcik = !this.etiketAcik;
      e.currentTarget.setAttribute('aria-pressed', String(this.etiketAcik));
      this.son = 0;
    };
    kap.querySelector('.usg-kapat').onclick = () => { this.kullaniciKapatti = true; this.gorunurluk(); };
    const ac = document.createElement('button');
    ac.className = 'usg-ac';
    ac.hidden = true;
    ac.innerHTML = '<span aria-hidden="true">▣</span> Sanal USG';
    ac.onclick = () => { this.kullaniciKapatti = false; this.gorunurluk(); };
    const yer = document.querySelector('.uygulama') || document.body;
    yer.appendChild(kap);
    yer.appendChild(ac);
    this.kap = kap;
    this.acDugme = ac;
  }

  modSec(m) {
    this.mod = m;
    for (const b of this.kap.querySelectorAll('[data-mod]')) b.setAttribute('aria-pressed', String(b.dataset.mod === m));
    this.kap.classList.toggle('ikili', m === 'ikisi');
    this.son = 0;
  }

  /** Bu adımda prob/kesit var mı (USG anlamlı mı) */
  get adimdaProb() {
    const st = this.app.blok?.steps[this.app.adim];
    return !!st && (st.goster.includes('kesit') || st.goster.includes('prob'));
  }
  get aktif() { return this.adimdaProb && !this.kullaniciKapatti; }

  gorunurluk() {
    const xr = this.app.renderer.xr.isPresenting;
    this.kap.hidden = xr || !this.aktif;
    this.acDugme.hidden = xr || !this.adimdaProb || !this.kullaniciKapatti;
    this.son = 0;
    if (!this.aktif) this.probSifirla();
  }

  // ---------------------------------------------------------------- blok verisi
  blokDegisti() {
    const { anat, blok } = this.app;
    this.probSifirla(true);
    // Parçalar: köşe dizisi (kök koordinatı), indeks, sınıf
    anat.root.updateMatrixWorld(true);
    const kokTers = new THREE.Matrix4().copy(anat.root.matrixWorld).invert();
    this.parcalar = [];
    for (const m of anat.parts.values()) {
      const sinif = sinifBul(m);
      if (sinif === null) continue;
      const g = m.geometry;
      let pos = konumlar(g.attributes.position);
      const rel = new THREE.Matrix4().multiplyMatrices(kokTers, m.matrixWorld);
      if (!rel.equals(new THREE.Matrix4())) {
        const p = new Float32Array(pos.length);
        const v = new THREE.Vector3();
        for (let i = 0; i < pos.length; i += 3) { v.set(pos[i], pos[i + 1], pos[i + 2]).applyMatrix4(rel); p[i] = v.x; p[i + 1] = v.y; p[i + 2] = v.z; }
        pos = p;
      }
      g.computeBoundingSphere();
      const bs = g.boundingSphere.clone().applyMatrix4(rel);
      this.parcalar.push({ ad: m.userData.ad || m.name, isim: m.name, sinif, pos, idx: g.index ? g.index.array : null,
        merkez: bs.center, r: bs.radius, d: new Float32Array(pos.length / 3), x: new Float32Array(pos.length / 3), y: new Float32Array(pos.length / 3),
        renk: m.userData.baseColor ?? null, nesne: null });
    }
    // Blok nesneleri: iğne(ler), LA, şematik bağ (ör. paravertebral süperior kostotransvers bağ)
    this.nesneler = [];
    for (const [k, o] of Object.entries(blok.objects)) {
      const sinif = /^igne/.test(k) ? S.IGNE : /^la/.test(k) ? S.LA : k === 'ktb' ? S.BAG : null;
      if (sinif === null) continue;
      o.traverse((m) => {
        if (!m.isMesh || !m.geometry?.attributes?.position) return;
        if (sinif === S.IGNE && m.geometry.type === 'CylinderGeometry' && m.geometry.parameters.radiusTop > 0.002) return; // iğne göbeği
        this.nesneler.push({ anahtar: k, kok: o, mesh: m, sinif });
      });
    }
    // Görüntü alanı: kesit düzleminin boyutu (blok tanımından)
    let W = 0.038, D = 0.05;
    blok.objects.kesit?.traverse((m) => { if (m.isMesh && m.geometry.parameters?.width) { W = m.geometry.parameters.width; D = m.geometry.parameters.height; } });
    const P = blok.P;
    if (P && blok.noktalar?.T) D = Math.max(D, (blok.noktalar.T.clone().sub(P.S).dot(P.b)) + 0.012);
    this.W = W;
    this.D = Math.ceil(D * 200) / 200; // 5 mm'ye yuvarla
    this.Ny = Math.round(this.Nx * this.D / this.W);
    this.etiketHarita = new Int16Array(this.Nx * this.Ny);
    this.cizgiHarita = new Int16Array(this.Nx * this.Ny);
    this.img = new ImageData(this.Nx, this.Ny);
    this.imgA = new ImageData(this.Nx, this.Ny);
    this.bmod.width = this.anat.width = this.Nx;
    this.bmod.height = this.anat.height = this.Ny;
    this.olay = Array.from({ length: this.Nx }, () => []);
    // Etiketler: sono-anatomi adımının (3.) ve o anki adımın etiketleri, düzlemde kalanlar
    this.son = 0;
    this.gorunurluk();
  }

  // ---------------------------------------------------------------- prob hareketi
  /** Adımlara göre prob pozu: sono-anatomi ve prob adımlarında hafif kaydırma/eğme, iğne adımlarında sabit */
  poz(t) {
    const P = this.app.blok.P;
    const st = this.app.blok.steps[this.app.adim];
    const igneVar = st.goster.includes('igne');
    const sabit = window.__laSabit || igneVar;
    const f = (t / 1000) * (2 * Math.PI / 7);
    const kay = sabit ? 0 : 0.0024 * Math.sin(f); // düzleme dik kaydırma (m)
    const egim = sabit ? 0 : THREE.MathUtils.degToRad(3) * Math.sin(f * 0.5 + 1.1); // prob uzun ekseni etrafında eğme
    const q = new THREE.Quaternion().setFromAxisAngle(P.u, egim);
    const Sx = P.S.clone().addScaledVector(P.mz, kay);
    return { S: Sx, u: P.u.clone(), b: P.b.clone().applyQuaternion(q), mz: P.mz.clone().applyQuaternion(q), q, kay };
  }

  /** 3B prob ve kesit düzlemini aynı poza getir */
  probUygula(pz) {
    for (const k of ['prob', 'kesit']) {
      const o = this.app.blok.objects[k];
      if (!o) continue;
      if (!o.userData.taban) o.userData.taban = { p: o.position.clone(), q: o.quaternion.clone() };
      const tb = o.userData.taban;
      o.quaternion.copy(pz.q).multiply(tb.q);
      o.position.copy(tb.p).sub(this.app.blok.P.S).applyQuaternion(pz.q).add(pz.S);
    }
  }
  probSifirla() {
    const blok = this.app.blok;
    if (!blok) return;
    for (const k of ['prob', 'kesit']) {
      const o = blok.objects[k];
      if (o?.userData.taban) { o.position.copy(o.userData.taban.p); o.quaternion.copy(o.userData.taban.q); }
    }
  }

  // ---------------------------------------------------------------- kare
  guncelle(t) {
    if (!this.app.blok || !this.parcalar) return;
    const xr = this.app.renderer.xr.isPresenting;
    if (!this.aktif) return;
    if (!xr && this.kap.hidden) return;
    if (t - this.son < (xr ? 100 : 55)) return; // masaüstü ≈ 18, AR ≈ 10 kare/s (gözlükte kare hızı öncelikli)
    this.son = t;
    const pz = this.poz(t);
    this.probUygula(pz);
    const t0 = performance.now();
    this.dilimle(pz, t);
    const t1 = performance.now();
    this.boya(t);
    const t2 = performance.now();
    this.tuvaleCiz(pz);
    this.sure = [t1 - t0, t2 - t1, performance.now() - t2];
    for (const f of this.cizildi) f();
  }

  dilimle(pz, t) {
    const { W, D, Nx, Ny } = this;
    const { S: O, u, b, mz } = pz;
    const olay = this.olay;
    for (const o of olay) o.length = 0;
    const dx = W / Nx;
    // sütun i'nin merkezi: x_i = W/2 − (i + 0.5)·dx  (ekranın solu = +u = prob işareti tarafı)
    const sutunEkle = (xa, ya, xb, yb, p) => {
      if (xa === xb) return;
      const xmin = Math.min(xa, xb), xmax = Math.max(xa, xb);
      if (xmax < -W / 2 || xmin > W / 2) return;
      if (Math.max(ya, yb) < -0.003 || Math.min(ya, yb) > D + 0.003) return;
      let i0 = Math.max(0, Math.ceil((W / 2 - xmax) / dx - 0.5));
      let i1 = Math.min(Nx - 1, Math.floor((W / 2 - xmin) / dx - 0.5));
      for (let i = i0; i <= i1; i++) {
        const x = W / 2 - (i + 0.5) * dx;
        if (x < xmin || x >= xmax) continue;
        olay[i].push(ya + (x - xa) * (yb - ya) / (xb - xa), p);
      }
    };
    const kes = (pos, idx, dd, xx, yy, p) => {
      const n = pos.length / 3;
      for (let v = 0; v < n; v++) {
        const px = pos[v * 3] - O.x, py = pos[v * 3 + 1] - O.y, pz2 = pos[v * 3 + 2] - O.z;
        dd[v] = px * mz.x + py * mz.y + pz2 * mz.z;
        xx[v] = px * u.x + py * u.y + pz2 * u.z;
        yy[v] = px * b.x + py * b.y + pz2 * b.z;
      }
      const tri = idx ? idx.length / 3 : n / 3;
      for (let f = 0; f < tri; f++) {
        const a = idx ? idx[f * 3] : f * 3, c1 = idx ? idx[f * 3 + 1] : f * 3 + 1, c2 = idx ? idx[f * 3 + 2] : f * 3 + 2;
        const da = dd[a], db = dd[c1], dc = dd[c2];
        const sa = da >= 0, sb = db >= 0, sc = dc >= 0;
        if (sa === sb && sb === sc) continue;
        // işareti farklı olan iki kenar
        let p1x, p1y, p2x, p2y, k = 0;
        const kenar = (i, j, di, dj) => {
          const t2 = di / (di - dj);
          const X = xx[i] + (xx[j] - xx[i]) * t2, Y = yy[i] + (yy[j] - yy[i]) * t2;
          if (k === 0) { p1x = X; p1y = Y; } else { p2x = X; p2y = Y; }
          k++;
        };
        if (sa !== sb) kenar(a, c1, da, db);
        if (sb !== sc) kenar(c1, c2, db, dc);
        if (sc !== sa) kenar(c2, a, dc, da);
        if (k === 2) sutunEkle(p1x, p1y, p2x, p2y, p);
      }
    };
    // Anatomi parçaları (yalnız düzleme ve alana yakın olanlar)
    const tmp = new THREE.Vector3();
    this.parcalar.forEach((pr, p) => {
      tmp.copy(pr.merkez).sub(O);
      if (Math.abs(tmp.dot(mz)) > pr.r + 0.002) return;
      if (Math.abs(tmp.dot(u)) > W / 2 + pr.r) return;
      const yb = tmp.dot(b);
      if (yb < -pr.r - 0.01 || yb > D + pr.r) return;
      kes(pr.pos, pr.idx, pr.d, pr.x, pr.y, p);
    });
    // Blok nesneleri (görünürse): dünya → merkez (kök) koordinatı
    const app = this.app;
    app.merkez.updateMatrixWorld(true);
    const mTers = new THREE.Matrix4().copy(app.merkez.matrixWorld).invert();
    const v = new THREE.Vector3();
    this.nesneParca = [];
    for (const n of this.nesneler) {
      if (!n.kok.visible || !n.mesh.visible) continue;
      const rel = new THREE.Matrix4().multiplyMatrices(mTers, n.mesh.matrixWorld);
      const src = n.src || (n.src = konumlar(n.mesh.geometry.attributes.position));
      if (!n.pos || n.pos.length !== src.length) { n.pos = new Float32Array(src.length); n.d = new Float32Array(src.length / 3); n.x = new Float32Array(src.length / 3); n.y = new Float32Array(src.length / 3); }
      for (let i = 0; i < src.length; i += 3) { v.set(src[i], src[i + 1], src[i + 2]).applyMatrix4(rel); n.pos[i] = v.x; n.pos[i + 1] = v.y; n.pos[i + 2] = v.z; }
      const p = this.parcalar.length + this.nesneParca.length;
      this.nesneParca.push({ sinif: n.sinif, ad: n.sinif === S.IGNE ? 'İğne' : n.sinif === S.LA ? 'Lokal anestezik' : 'Bağ' });
      kes(n.pos, n.mesh.geometry.index ? n.mesh.geometry.index.array : null, n.d, n.x, n.y, p);
    }
    const sinifOf = (p) => (p < this.parcalar.length ? this.parcalar[p].sinif : this.nesneParca[p - this.parcalar.length].sinif);
    this.sinifOf = sinifOf;
    // Atım: arter aralıkları sistolde derinlikte genişler (duvar hareketi); venler solunumla hafifçe
    const kalp = ((t / 1000) * 72 / 60) % 1;
    const atim = kalp < 0.15 ? Math.sin((kalp / 0.15) * Math.PI / 2) : Math.exp(-(kalp - 0.15) * 5);
    const dA = 0.00028 * atim, dV = 0.00012 * Math.sin((t / 1000) * 2 * Math.PI / 4.5);
    // Sütunlar: olayları sırala, etiket haritasını doldur
    const { etiketHarita: E, cizgiHarita: C } = this;
    const dy = D / Ny;
    const say = new Map();
    for (let i = 0; i < Nx; i++) {
      const o = olay[i];
      const n = o.length / 2;
      const ev = new Array(n);
      for (let k = 0; k < n; k++) ev[k] = [o[k * 2], o[k * 2 + 1]];
      ev.sort((a, c) => a[0] - c[0]);
      // arter/ven giriş-çıkışını kaydır
      say.clear();
      for (const e of ev) {
        const s = sinifOf(e[1]);
        if (s !== S.ARTER && s !== S.VEN) continue;
        const c = say.get(e[1]) || 0;
        say.set(e[1], c + 1);
        const d = s === S.ARTER ? dA : dV;
        e[0] += (c % 2 === 0 ? -d : d);
      }
      ev.sort((a, c) => a[0] - c[0]);
      const icerde = []; // içinde bulunulan kapalı parçalar
      let k = 0;
      let deriIci = false;
      for (let j = 0; j < Ny; j++) {
        const yj = (j + 0.5) * dy;
        let cizgi = -1;
        while (k < ev.length && ev[k][0] < yj) {
          const p = ev[k][1];
          const s = sinifOf(p);
          if (CIZGI.has(s)) cizgi = p;
          else if (s === S.DERI) deriIci = !deriIci;
          else {
            const ix = icerde.indexOf(p);
            if (ix >= 0) icerde.splice(ix, 1); else icerde.push(p);
          }
          k++;
        }
        let en = deriIci ? GOVDE : DIS, eo = -1;
        for (const p of icerde) { const o2 = ONCELIK[sinifOf(p)]; if (o2 > eo) { eo = o2; en = p; } }
        // deri dışındaki kapalı yapı (ör. kesik kenar) yalnız deri içindeyse sayılır; iğne ve LA her zaman
        if (!deriIci && en >= 0 && sinifOf(en) !== S.IGNE && sinifOf(en) !== S.LA) en = DIS;
        E[j * Nx + i] = en;
        C[j * Nx + i] = cizgi;
      }
    }
  }

  boya(t) {
    const { Nx, Ny, D, gur } = this;
    const E = this.etiketHarita, C = this.cizgiHarita;
    const px = this.img.data, pa = this.imgA.data;
    const dy = D / Ny; // m / piksel
    const mm = (m) => Math.max(1, Math.round(m / 1000 / dy));
    const N = gur.N;
    const w = 0.5 + 0.5 * Math.sin(t / 1000 * 1.3); // benek kaynaması
    const ox = Math.round(t / 1000 * 3) & 255; // plevra kayması
    const sinifOf = this.sinifOf;
    const dalga = this.dalga || (this.dalga = Int8Array.from({ length: Nx }, (_, i) => Math.round(2.2 * Math.sin(i * 0.09) + 1.2 * Math.sin(i * 0.23 + 1))));
    for (let i = 0; i < Nx; i++) {
      let golge = 0; // 0 yok, 1 kemik/hava, 2 akciğer
      let plevraY = -1;
      let siviSon = -1e9, onceki = DIS, deriBas = -1, igneSon = -1e9;
      let duvar = 0, duvarParlak = 0, igneBas = -1;
      for (let j = 0; j < Ny; j++) {
        const q = j * Nx + i;
        const e = E[q];
        const s = e >= 0 ? sinifOf(e) : e;
        const gi = ((j * 1) & 255) * N + ((i * 2) & 255);
        const bn = gur.a[gi] * (1 - w) + gur.b[gi] * w; // benek 0..~1.5 (ortalama 0,5)
        const cz = gur.cizgi[((j + dalga[i]) & 255) * N + ((i * 2) & 255)]; // dalgalı ince çizgiler (z-skoru)
        let v;
        // arayüz: etiket değişimi (iki doku arasında) parlak
        const degisti = e !== onceki;
        if (degisti) {
          const os = onceki >= 0 ? sinifOf(onceki) : onceki;
          if (SIVI.has(s) || SIVI.has(os)) { duvar = mm(0.45); duvarParlak = (s === S.ARTER || os === S.ARTER) ? 0.85 : 0.55; }
          else if (s === S.SINIR || os === S.SINIR || s === S.KOK || os === S.KOK) { duvar = mm(0.35); duvarParlak = 0.8; }
          else if (onceki !== DIS && e !== DIS) { duvar = mm(0.3); duvarParlak = 0.55; }
          if (os === S.LA || os === S.ARTER || os === S.VEN) siviSon = j;
          if (os === S.IGNE) igneSon = j;
        }
        if (e === DIS) v = 0.015 * bn;
        else if (golge === 1) v = 0.03 + 0.05 * bn;
        else if (golge === 2) {
          // akciğer: koyu zemin + A-çizgileri (plevra derinliğinin katlarında) + plevra hizasında kayma
          const yy = (j - plevraY) / Math.max(1, plevraY - deriBas);
          let a = 0;
          for (let n = 1; n <= 4; n++) { const z = (yy - (n - 0)) * (plevraY - deriBas) / mm(0.5); a += 0.38 * Math.pow(0.62, n - 1) * Math.exp(-z * z); }
          v = 0.05 + 0.08 * bn + a;
        } else {
          switch (s) {
            case GOVDE: v = 0.05 + 0.15 * bn + (cz > 2.0 ? 0.34 : cz > 1.5 ? 0.1 : 0); break; // yağ/bağ doku: koyu lobüller + parlak septalar
            case S.KAS: v = 0.17 + 0.24 * bn + (gur.nokta[gi] > 3.1 ? 0.34 : 0) + (cz > 1.5 ? 0.1 : 0); break; // kas: orta gri, benekli, ince parlak noktalar
            case S.SINIR: v = (gur.b[(gi + 777) & 65535] > 0.62 ? 0.62 : 0.14) + 0.16 * bn; break; // bal peteği
            case S.KOK: v = 0.07 + 0.08 * bn; break; // kökler hipoekoik
            case S.ARTER: case S.VEN: case S.LA: v = 0.012 + 0.025 * bn; break;
            case S.KEMIK: case S.HAVA: v = 1.0; if (!golge) { duvar = mm(0.6); duvarParlak = 1.0; } golge = 1; break;
            case S.KIKIRDAK: v = 0.06 + 0.06 * bn; break;
            case S.BAG: v = 0.55 + 0.3 * bn; break;
            case S.ORGAN: v = 0.3 + 0.18 * bn; break;
            case S.BAGIRSAK: v = 0.5 + 0.3 * bn; break;
            case S.PLEVRA:
              v = 0.95;
              if (plevraY < 0) { plevraY = j; duvar = mm(0.5); duvarParlak = 1.0; }
              golge = 2; break;
            case S.IGNE: if (degisti) igneBas = j; v = j - igneBas < mm(0.45) ? 1.15 : 0.22 + 0.18 * bn; break; // ince parlak üst yüz, altı soluk
            default: v = 0.2 * bn;
          }
        }
        if (e !== DIS && deriBas < 0) deriBas = j;
        // deri: ilk ≈1,2 mm parlak (dermis), en üst 2 piksel giriş yankısı
        if (deriBas >= 0 && j - deriBas < mm(1.2) && s !== S.IGNE) v = Math.max(v, 0.5 + 0.35 * bn + (j - deriBas < 2 ? 0.3 : 0));
        if (duvar > 0 && s !== S.IGNE) { v = Math.max(v, duvarParlak * (0.75 + 0.35 * bn)); duvar--; }
        // ince levhalar (fasya): parlak çizgi
        if (C[q] >= 0 && golge === 0) v = Math.max(v, 0.85 + 0.2 * bn);
        // sıvı arkası güçlenme (≈6 mm)
        if (j - siviSon < mm(4) && !SIVI.has(s)) v *= 1.15;
        // iğne yansıma artefaktı: iğnenin altında azalan tekrarlar
        if (igneSon > 0 && j - igneSon < mm(2.5) && (j - igneSon) % mm(0.6) === 0) v = Math.max(v, 0.55 - (j - igneSon) * 0.02);
        // derinlikle zayıflama (TGC sonrası kalan)
        v *= 1.04 - 0.3 * (j / Ny);
        const g = Math.max(0, Math.min(255, Math.pow(Math.max(0, v), 1.05) * 245));
        const o4 = q * 4;
        px[o4] = g; px[o4 + 1] = g; px[o4 + 2] = Math.min(255, g * 1.03 + 2); px[o4 + 3] = 255;
        // anatomi kesiti
        let r = 18, gg = 22, bb = 28;
        if (e === GOVDE) [r, gg, bb] = golge === 2 ? AKCIGER_RENK : GOVDE_RENK;
        else if (e >= 0) {
          const pr = e < this.parcalar.length ? this.parcalar[e] : null;
          const c = pr?.renk != null ? [(pr.renk >> 16) & 255, (pr.renk >> 8) & 255, pr.renk & 255] : RENK_ANAT[s] || [200, 200, 200];
          [r, gg, bb] = c;
        }
        if (C[q] >= 0) [r, gg, bb] = RENK_ANAT[S.FASYA];
        if (degisti && e !== DIS && onceki !== DIS) { r *= 0.55; gg *= 0.55; bb *= 0.55; }
        pa[o4] = r; pa[o4 + 1] = gg; pa[o4 + 2] = bb; pa[o4 + 3] = 255;
        onceki = e;
      }
    }
    // anatomi kesitinde yanal sınırlar da koyu çizgi
    for (let j = 0; j < Ny; j++) for (let i = 1; i < Nx; i++) {
      const q = j * Nx + i;
      if (E[q] !== E[q - 1] && E[q] !== DIS && E[q - 1] !== DIS) { const o4 = q * 4; pa[o4] *= 0.55; pa[o4 + 1] *= 0.55; pa[o4 + 2] *= 0.55; }
    }
    this.bmod.getContext('2d').putImageData(this.img, 0, 0);
    this.anat.getContext('2d').putImageData(this.imgA, 0, 0);
  }

  /** Etiketler: sono-anatomi adımı (3.) ve o anki adımın etiketlerinden düzlemde ve alanda kalanlar */
  etiketler(pz) {
    const blok = this.app.blok;
    const liste = [];
    const gor = new Set();
    for (const i of [this.app.adim, 2]) {
      for (const [metin, p, , renk] of blok.steps[i]?.etiket || []) {
        if (!p || metin.startsWith('≈')) continue;
        const ilk = metin.split('\n')[0].replace(/\s*\(.*?\)\s*/g, ' ').replace(/:\s*$/, '').trim();
        if (gor.has(ilk)) continue;
        const r = p.clone().sub(pz.S);
        if (Math.abs(r.dot(pz.mz)) > 0.007) continue;
        const x = r.dot(pz.u), y = r.dot(pz.b);
        if (Math.abs(x) > this.W / 2 || y < 0.001 || y > this.D) continue;
        gor.add(ilk);
        liste.push({ metin: ilk.length > 28 ? ilk.slice(0, 27) + '…' : ilk, x, y, renk });
      }
    }
    return liste;
  }

  tuvaleCiz(pz) {
    const { Nx, Ny, W, D } = this;
    const k = this.olcek;
    const pw = Math.round(Nx * k), ph = Math.round(Ny * k);
    const ust = 26;
    const ikili = this.mod === 'ikisi';
    const bosluk = ikili ? 8 : 0;
    const tw = ikili ? pw * 2 + bosluk : pw, th = ph + ust;
    if (this.tuval.width !== tw || this.tuval.height !== th) { this.tuval.width = tw; this.tuval.height = th; }
    const c = this.tuval.getContext('2d');
    c.fillStyle = '#05080b';
    c.fillRect(0, 0, tw, th);
    const paneller = this.mod === 'usg' ? [['usg', 0]] : this.mod === 'anatomi' ? [['anatomi', 0]] : [['usg', 0], ['anatomi', pw + bosluk]];
    const etk = this.etiketAcik ? this.etiketler(pz) : [];
    const hedef = this.app.blok.objects.hedef;
    for (const [tur, x0] of paneller) {
      c.imageSmoothingEnabled = true;
      c.drawImage(tur === 'usg' ? this.bmod : this.anat, x0, ust, pw, ph);
      // üst bilgi şeridi
      c.fillStyle = '#9fb3c4';
      c.font = '600 12px system-ui, -apple-system, Segoe UI, sans-serif';
      c.textBaseline = 'middle';
      c.fillText(tur === 'usg' ? `Sanal USG · ${Math.round(W * 1000)} mm · ${(D * 100).toFixed(1).replace('.', ',')} cm` : 'Aynı kesit · anatomi', x0 + 8, ust / 2);
      // prob işareti tarafı
      c.fillStyle = '#35e07a';
      c.beginPath(); c.arc(x0 + 10, ust + 10, 4, 0, Math.PI * 2); c.fill();
      // derinlik ölçeği (her 1 cm)
      c.strokeStyle = 'rgba(200,215,230,.7)'; c.fillStyle = 'rgba(200,215,230,.85)';
      c.font = '500 10px system-ui, sans-serif'; c.textAlign = 'right';
      for (let cm = 0; cm <= D * 100 + 1e-6; cm += 1) {
        const y = ust + (cm / 100) / D * ph;
        c.beginPath(); c.moveTo(x0 + pw - 7, y); c.lineTo(x0 + pw - 1, y); c.stroke();
        if (cm > 0 && y < ust + ph - 6) c.fillText(String(cm), x0 + pw - 10, y);
      }
      c.textAlign = 'left';
      const ekran = (x, y) => [x0 + (W / 2 - x) / W * pw, ust + y / D * ph];
      // hedef
      if (hedef?.visible) {
        const r = hedef.position.clone().sub(pz.S);
        const [hx, hy] = ekran(r.dot(pz.u), r.dot(pz.b));
        c.strokeStyle = '#3ff0ff'; c.lineWidth = 2;
        c.beginPath(); c.arc(hx, hy, 6, 0, Math.PI * 2); c.stroke(); c.lineWidth = 1;
      }
      // etiketler: nokta + kutu; sol yarıdakiler sağa, sağ yarıdakiler sola yazılır, dikeyde çakışma önlenir
      const yerlesik = [];
      const sirali = etk.map((e) => ({ ...e, p: ekran(e.x, e.y) })).sort((a, b2) => a.p[1] - b2.p[1]);
      c.font = '600 11.5px system-ui, -apple-system, Segoe UI, sans-serif';
      for (const e of sirali) {
        const [ax, ay] = e.p;
        const sola = ax > x0 + pw / 2;
        const tw2 = c.measureText(e.metin).width + 10;
        let bx = sola ? ax - 14 - tw2 : ax + 14;
        bx = Math.max(x0 + 2, Math.min(x0 + pw - tw2 - 14, bx));
        let by = ay - 9;
        for (const o of yerlesik) if (by < o.y + 19 && by + 18 > o.y && bx < o.x + o.w && bx + tw2 > o.x) by = o.y + 20;
        by = Math.min(ust + ph - 20, Math.max(ust + 2, by));
        yerlesik.push({ x: bx, y: by, w: tw2 });
        c.strokeStyle = e.renk; c.globalAlpha = 0.9;
        c.beginPath(); c.moveTo(ax, ay); c.lineTo(sola ? bx + tw2 : bx, by + 9); c.stroke();
        c.globalAlpha = 1;
        c.fillStyle = e.renk; c.beginPath(); c.arc(ax, ay, 2.6, 0, Math.PI * 2); c.fill();
        c.fillStyle = 'rgba(8,12,16,.82)';
        c.fillRect(bx, by, tw2, 18);
        c.fillStyle = e.renk; c.fillRect(bx, by, 3, 18);
        c.fillStyle = '#ffffff'; c.fillText(e.metin, bx + 7, by + 9.5);
      }
    }
  }
}
