// Sanal USG (Clarius L7 HD3 benzetimi): 3B modelin prob düzlemindeki kesitinden B-mod görüntü ve renkli kesit anatomisi.
// Gerçek USG görüntüsü değildir; modeldeki yapıların o düzlemde nerede olduğunu USG diliyle gösterir.
//
// Yöntem
//  1. Kesit: düzlem ile tüm parçaların üçgenleri kesişir → 2B doğru parçaları; her tarama çizgisi (sütun) bu parçaları
//     keser, kapalı yüzeylerde tek-çift kuralıyla her pikselin hangi yapıda olduğu bulunur (etiket haritası). Her sınırın
//     ışına göre açısı da saklanır (yatay sınır parlak, dikey sınır sönük: speküler yansıma).
//  2. Saçıcılar: dokuya sabit (dünya koordinatına bağlı) rastgele saçıcılar; prob kayınca benek dokuyla birlikte kalır.
//     Dokunun yankılılığı (ekojenite) dokuya özgü desenle çarpılır: yağda septalar, kasta lif yönünde perimizyum
//     çizgileri, sinirde lif yönünde fasiküller (bal peteği), tendon/bağda fibriler çizgiler.
//  3. Her sütunda yukarıdan aşağı: zayıflama ve güçlenme (sıvı), kemik/hava gölgesi, plevra çizgisi ve A-çizgileri,
//     iğnenin açıya bağlı parlaklığı ve yankılanma kuyruğu, deri girişi.
//  4. Nokta yayılım işlevi (yanal geniş, eksenel dar; derinlikle genişler) ile karmaşık bulanıklaştırma → zarf →
//     logaritmik sıkıştırma (kazanç, dinamik aralık).
import * as THREE from 'three';
import { L7 } from './clarius.js';

// Sınıflar ve öncelik (aynı noktada birden çok yapı varsa yüksek öncelik görünür)
const S = { DERI: 0, KAS: 1, FASYA: 2, ARTER: 3, VEN: 4, SINIR: 5, KOK: 6, KEMIK: 7, KIKIRDAK: 8, BAG: 9,
  ORGAN: 10, PLEVRA: 11, HAVA: 12, BAGIRSAK: 13, LA: 14, IGNE: 15 };
const ONCELIK = [1, 3, 0, 8, 8, 7, 7, 6, 5, 4, 4, 5, 6, 5, 9, 10];
const CIZGI = new Set([S.FASYA]); // kapalı hacim değil, ince levha: geçtiği yer parlak çizgi
const DIS = -1; // deri yüzeyinin üstü (jel / hava)
const GOVDE = -2; // deri içinde, ayrı yapı yok: ciltaltı yağ / bağ dokusu
const SN = 18; // sınıf tablosu boyu (indeks = sınıf + 2)

// Akustik özellikler (eğitim amaçlı yaklaşık değerler). Dizin: sınıf + 2.
//  ARAYUZ: sınırda speküler yansıma gücü; ZAY: TGC sonrası kalan zayıflama (dB/cm; eksi = güçlenme, sıvı)
const ARAYUZ = new Float32Array(SN), ZAY = new Float32Array(SN);
for (const [s, a, z] of [
  [GOVDE, 0.3, 0.4], [DIS, 0, 0], [S.DERI, 0.6, 0], [S.KAS, 0.32, 0], [S.FASYA, 1.5, 0],
  [S.ARTER, 1.15, -6], [S.VEN, 0.55, -6], [S.SINIR, 0.7, 0.4], [S.KOK, 0.45, -1.5], [S.KEMIK, 0, 0],
  [S.KIKIRDAK, 0.4, -1], [S.BAG, 0.9, 0.8], [S.ORGAN, 0.6, 0.6], [S.PLEVRA, 0, 0], [S.HAVA, 0, 0],
  [S.BAGIRSAK, 1.2, 1.5], [S.LA, 0.4, -6], [S.IGNE, 0, 0],
]) { ARAYUZ[s + 2] = a; ZAY[s + 2] = z; }

const RENK_ANAT = {
  [S.KAS]: [180, 80, 63], [S.ARTER]: [216, 53, 42], [S.VEN]: [47, 95, 216], [S.SINIR]: [245, 208, 47], [S.KOK]: [245, 208, 47],
  [S.KEMIK]: [238, 230, 210], [S.KIKIRDAK]: [207, 224, 232], [S.BAG]: [251, 247, 236], [S.ORGAN]: [200, 120, 110],
  [S.PLEVRA]: [240, 163, 180], [S.HAVA]: [120, 140, 160], [S.BAGIRSAK]: [205, 150, 130], [S.LA]: [127, 227, 255],
  [S.IGNE]: [230, 232, 236], [S.FASYA]: [79, 209, 184],
};
const GOVDE_RENK = [242, 214, 190];
const AKCIGER_RENK = [214, 186, 196];

// Görüntü işleme sabitleri
const DB_ALT = -40; // dinamik aralığın altı (dB)
const DB_ARALIK = 44; // dinamik aralık (dB)
const GAMA = 1.7;
const HUCRE = 0.15; // saçıcı hücresi (mm)

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

// Konum özniteliği iç içe (konum+normal tek tamponda) olabilir: düz Float32Array'e çevir
function konumlar(attr) {
  if (!attr.isInterleavedBufferAttribute && attr.array.length === attr.count * 3) return attr.array;
  const o = new Float32Array(attr.count * 3);
  for (let i = 0; i < attr.count; i++) { o[i * 3] = attr.getX(i); o[i * 3 + 1] = attr.getY(i); o[i * 3 + 2] = attr.getZ(i); }
  return o;
}

// Tamsayı karması → [0,1)
function h3(i, j, k) {
  let h = Math.imul(i, 0x27d4eb2d) ^ Math.imul(j, 0x165667b1) ^ Math.imul(k, 0x9e3779b1);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
function h3i(i, j, k) {
  let h = Math.imul(i, 0x27d4eb2d) ^ Math.imul(j, 0x165667b1) ^ Math.imul(k, 0x9e3779b1);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return (h ^ (h >>> 16)) >>> 0;
}
// 3B değer gürültüsü (0..1, ortanca 0,5)
function vn(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const fx = x - xi, fy = y - yi, fz = z - zi;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy), uz = fz * fz * (3 - 2 * fz);
  const a = h3(xi, yi, zi), b = h3(xi + 1, yi, zi), c = h3(xi, yi + 1, zi), d = h3(xi + 1, yi + 1, zi);
  const e = h3(xi, yi, zi + 1), f = h3(xi + 1, yi, zi + 1), g = h3(xi, yi + 1, zi + 1), h = h3(xi + 1, yi + 1, zi + 1);
  const x1 = a + (b - a) * ux, x2 = c + (d - c) * ux, x3 = e + (f - e) * ux, x4 = g + (h - g) * ux;
  const y1 = x1 + (x2 - x1) * uy, y2 = x3 + (x4 - x3) * uy;
  return y1 + (y2 - y1) * uz;
}
const yumusak = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/** Parçanın ana ekseni (köşelerin temel bileşeni): lif / sinir doğrultusu */
function anaEksen(pos) {
  const n = pos.length / 3, adim = Math.max(1, Math.floor(n / 3000));
  let mx = 0, my = 0, mz = 0, k = 0;
  for (let i = 0; i < n; i += adim) { mx += pos[i * 3]; my += pos[i * 3 + 1]; mz += pos[i * 3 + 2]; k++; }
  mx /= k; my /= k; mz /= k;
  let xx = 0, xy = 0, xz = 0, yy = 0, yz = 0, zz = 0;
  for (let i = 0; i < n; i += adim) {
    const x = pos[i * 3] - mx, y = pos[i * 3 + 1] - my, z = pos[i * 3 + 2] - mz;
    xx += x * x; xy += x * y; xz += x * z; yy += y * y; yz += y * z; zz += z * z;
  }
  let v = [0.57, 0.6, 0.56];
  for (let it = 0; it < 40; it++) {
    const w = [xx * v[0] + xy * v[1] + xz * v[2], xy * v[0] + yy * v[1] + yz * v[2], xz * v[0] + yz * v[1] + zz * v[2]];
    const l = Math.hypot(w[0], w[1], w[2]) || 1;
    v = [w[0] / l, w[1] / l, w[2] / l];
  }
  const f = new THREE.Vector3(...v);
  const yard = Math.abs(f.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const p1 = yard.clone().cross(f).normalize();
  const p2 = f.clone().cross(p1).normalize();
  return [f.x, f.y, f.z, p1.x, p1.y, p1.z, p2.x, p2.y, p2.z];
}

export class SanalUSG {
  constructor(app) {
    this.app = app;
    this.mod = 'usg'; // usg | anatomi | ikisi
    this.etiketAcik = true;
    this.kullaniciKapatti = false;
    this.son = 0;
    this.kare = 0;
    this.Nx = 240; // tarama çizgisi sayısı (38 mm → 0,16 mm/piksel)
    this.W = L7.genislikMm / 1000;
    this.D = 0.05;
    this.kazanc = 0; // dB
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
        <span class="usg-baslik">Clarius L7 · sanal</span>
        <div class="usg-mod" role="group" aria-label="Görünüm">
          <button data-mod="usg" aria-pressed="true">USG</button><button data-mod="anatomi" aria-pressed="false">Anatomi</button><button data-mod="ikisi" aria-pressed="false">İkisi</button>
        </div>
        <button class="usg-etiket" aria-pressed="true" title="USG etiketleri">Etiket</button>
        <button class="usg-kapat" title="Sanal USG'yi gizle" aria-label="Gizle">✕</button>
      </div>
      <div class="usg-tuval"></div>
      <div class="usg-ayar">
        <div class="usg-grup" role="group" aria-label="Prob">
          <button data-is="sol" title="Döndür (Q / tekerlek)" aria-label="Sola döndür">↺</button><button data-is="sag" title="Döndür (E / tekerlek)" aria-label="Sağa döndür">↻</button><button data-is="eg-" title="Eğ (W / Shift+tekerlek)" aria-label="Eğ">⤺</button><button data-is="eg+" title="Eğ (S / Shift+tekerlek)" aria-label="Öbür yana eğ">⤻</button>
        </div>
        <div class="usg-grup" role="group" aria-label="Derinlik">
          <button data-is="d-" title="Derinliği azalt" aria-label="Derinliği azalt">−</button><output class="usg-d">5,0 cm</output><button data-is="d+" title="Derinliği artır" aria-label="Derinliği artır">+</button>
        </div>
        <label class="usg-kazanc" title="Kazanç"><span>Kazanç</span><input type="range" min="-15" max="15" step="1" value="0" aria-label="Kazanç"></label>
        <button data-is="oneri" class="usg-oneri" title="Probu bu adımın önerilen konumuna getir">Önerilen konum</button>
      </div>
      <p class="usg-ipucu">Probu sahnede tutup deride gezdirin · tekerlek: döndür · Shift+tekerlek: eğ · çift tık: probu oraya koy · klavye: Q/E, W/S, A/D, oklar</p>
      <p class="usg-not">3B modelin prob düzlemindeki kesitinden üretilen benzetim; gerçek USG görüntüsü değildir. Sol üstteki ● prob işaretinin (yeşil üçgen) tarafıdır.</p>`;
    kap.querySelector('.usg-tuval').appendChild(this.tuval);
    if (window.matchMedia?.('(pointer: coarse)').matches) kap.querySelector('.usg-ipucu').textContent = 'Probu sahnede parmakla tutup deride gezdirin · döndürmek ve eğmek için düğmeler (basılı tutun)';
    for (const b of kap.querySelectorAll('[data-mod]')) b.onclick = () => this.modSec(b.dataset.mod);
    kap.querySelector('.usg-etiket').onclick = (e) => {
      this.etiketAcik = !this.etiketAcik;
      e.currentTarget.setAttribute('aria-pressed', String(this.etiketAcik));
      this.son = 0;
    };
    kap.querySelector('.usg-kapat').onclick = () => { this.kullaniciKapatti = true; this.gorunurluk(); };
    // Basılı tutunca yinelenen prob düğmeleri
    const der = THREE.MathUtils.degToRad;
    const islemler = {
      sol: () => this.app.prob.dondur(der(-4)), sag: () => this.app.prob.dondur(der(4)),
      'eg-': () => this.app.prob.eg(der(-1.5)), 'eg+': () => this.app.prob.eg(der(1.5)),
      'd-': () => this.derinlikAyarla(this.D - 0.005), 'd+': () => this.derinlikAyarla(this.D + 0.005),
      oneri: () => this.app.prob.sifirla(),
    };
    for (const b of kap.querySelectorAll('[data-is]')) {
      const f = islemler[b.dataset.is];
      let zaman = null;
      const dur = () => { clearTimeout(zaman); clearInterval(zaman); zaman = null; };
      b.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        f();
        if (/^(sol|sag|eg)/.test(b.dataset.is)) zaman = setTimeout(() => { zaman = setInterval(f, 70); }, 350);
      });
      for (const ev of ['pointerup', 'pointerleave', 'pointercancel']) b.addEventListener(ev, dur);
      b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f(); } });
    }
    const kz = kap.querySelector('.usg-kazanc input');
    kz.oninput = () => { this.kazanc = Number(kz.value); this.son = 0; };
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
    this.dCikti = kap.querySelector('.usg-d');
  }

  modSec(m) {
    this.mod = m;
    for (const b of this.kap.querySelectorAll('[data-mod]')) b.setAttribute('aria-pressed', String(b.dataset.mod === m));
    this.kap.classList.toggle('ikili', m === 'ikisi');
    this.son = 0;
  }

  ipucu(goster) { this.kap.querySelector('.usg-ipucu').classList.toggle('soluk', !goster); }

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
  }

  pozDegisti() { this.son = 0; }

  derinlikAyarla(d) {
    const yeni = Math.min(0.09, Math.max(0.02, Math.round(d * 200) / 200));
    if (Math.abs(yeni - this.D) < 1e-6) return;
    this.D = yeni;
    this.alanKur();
  }

  // ---------------------------------------------------------------- blok verisi
  blokDegisti() {
    const { anat, blok } = this.app;
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
      const lifli = sinif === S.KAS || sinif === S.SINIR || sinif === S.KOK || sinif === S.BAG;
      this.parcalar.push({ ad: m.userData.ad || m.name, isim: m.name, sinif, pos, idx: g.index ? g.index.array : null,
        merkez: bs.center, r: bs.radius, d: new Float32Array(pos.length / 3), x: new Float32Array(pos.length / 3), y: new Float32Array(pos.length / 3),
        renk: m.userData.baseColor ?? null, eksen: lifli ? anaEksen(pos) : null });
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
    // Varsayılan derinlik: kesit düzleminin boyu, hedef daha derinse hedef + 1,2 cm
    let D = 0.05;
    blok.objects.kesit?.traverse((m) => { if (m.isMesh && m.geometry.parameters?.height) D = m.geometry.parameters.height; });
    const P = blok.P;
    if (P && blok.noktalar?.T) D = Math.max(D, (blok.noktalar.T.clone().sub(P.S).dot(P.b)) + 0.012);
    this.D = Math.min(0.09, Math.ceil(D * 200) / 200);
    this.alanKur();
    this.gorunurluk();
  }

  /** Görüntü alanı (W × D) değişince: tamponlar, çekirdekler, 3B kesit düzleminin boyu */
  alanKur() {
    const { Nx, W, D } = this;
    this.Ny = Math.round(Nx * D / W);
    const n = Nx * this.Ny;
    this.etiketHarita = new Int16Array(n);
    this.cizgiHarita = new Int16Array(n);
    this.kosHarita = new Float32Array(n);
    this.scR = new Float32Array(n); this.scI = new Float32Array(n);
    this.PX = new Float32Array(n); this.PY = new Float32Array(n); this.PZ = new Float32Array(n);
    this.ech = new Float32Array(n); this.echE = new Int16Array(n);
    this.re = new Float32Array(n); this.im = new Float32Array(n);
    this.tR = new Float32Array(n); this.tI = new Float32Array(n);
    this.img = new ImageData(Nx, this.Ny);
    this.imgA = new ImageData(Nx, this.Ny);
    this.bmod.width = this.anat.width = Nx;
    this.bmod.height = this.anat.height = this.Ny;
    this.olayA = Array.from({ length: Nx }, () => []);
    this.olayN = Array.from({ length: Nx }, () => []);
    this.anatAnahtar = '';
    this.scAnahtar = '';
    // Yanal nokta yayılımı: odak bölgesinde ≈ 0,26 mm, derinlikle genişler; çekirdekler √Σw² ile normlu (benek düzeyi sabit)
    const dxMm = W / Nx * 1000, dyMm = D / this.Ny * 1000;
    this.cekirdek = [];
    const onbellek = new Map();
    for (let j = 0; j < this.Ny; j++) {
      const yMm = (j + 0.5) * dyMm;
      const sigma = (0.32 + 0.003 * Math.max(0, yMm - 15)) / dxMm;
      const r = Math.min(8, Math.ceil(2.3 * sigma));
      const key = Math.round(sigma * 20);
      if (!onbellek.has(key)) {
        const w = new Float32Array(2 * r + 1);
        let s2 = 0;
        for (let k = -r; k <= r; k++) { w[k + r] = Math.exp(-(k * k) / (2 * sigma * sigma)); s2 += w[k + r] * w[k + r]; }
        for (let k = 0; k < w.length; k++) w[k] /= Math.sqrt(s2);
        onbellek.set(key, w);
      }
      this.cekirdek.push(onbellek.get(key));
    }
    // Eksenel: σ ≈ 0,13 mm
    const sa = 0.13 / dyMm;
    const a1 = Math.exp(-1 / (2 * sa * sa)), a2 = Math.exp(-4 / (2 * sa * sa));
    const na = Math.sqrt(1 + 2 * a1 * a1 + 2 * a2 * a2);
    this.eks = [a2 / na, a1 / na, 1 / na];
    // 3B kesit düzlemi görüntü alanıyla aynı boyda
    const kesit = this.app.blok?.objects.kesit;
    if (kesit) for (const c of kesit.children) {
      const g = c.geometry;
      if (!c.userData.taban) {
        const p = g.parameters?.width ? g.parameters : null;
        let w0 = p?.width, h0 = p?.height;
        if (!w0) { g.computeBoundingBox(); w0 = g.boundingBox.max.x - g.boundingBox.min.x; h0 = g.boundingBox.max.y - g.boundingBox.min.y; }
        c.userData.taban = { w0, h0 };
      }
      c.scale.set(W / c.userData.taban.w0, D / c.userData.taban.h0, 1);
      c.position.y = -D / 2;
    }
    if (this.dCikti) this.dCikti.textContent = `${(D * 100).toFixed(1).replace('.', ',')} cm`;
    this.son = 0;
  }

  // ---------------------------------------------------------------- kare
  guncelle(t) {
    if (!this.app.blok || !this.parcalar) return;
    const xr = this.app.renderer.xr.isPresenting;
    if (!this.aktif) return;
    if (!xr && this.kap.hidden) return;
    if (t - this.son < (xr ? 100 : 55)) return; // masaüstü ≈ 18, AR ≈ 10 kare/s
    this.son = t;
    this.kare++;
    const pz = this.app.prob.poz();
    const t0 = performance.now();
    this.dilimle(pz, t);
    const t1 = performance.now();
    this.boya(pz, t);
    const t2 = performance.now();
    this.tuvaleCiz(pz);
    this.sure = [t1 - t0, t2 - t1, performance.now() - t2];
    for (const f of this.cizildi) f();
  }

  dilimle(pz, t) {
    const { W, D, Nx, Ny } = this;
    const { S: O, u, b, mz } = pz;
    const dx = W / Nx;
    // sütun i'nin merkezi: x_i = W/2 − (i + 0.5)·dx  (ekranın solu = +u = prob işareti tarafı)
    const sutunEkle = (olay, xa, ya, xb, yb, p) => {
      if (xa === xb) return;
      const xmin = Math.min(xa, xb), xmax = Math.max(xa, xb);
      if (xmax < -W / 2 || xmin > W / 2) return;
      if (Math.max(ya, yb) < -0.02 || Math.min(ya, yb) > D + 0.003) return;
      const kos = Math.abs(xb - xa) / Math.hypot(xb - xa, yb - ya); // sınır normalinin ışınla açısının kosinüsü
      const i0 = Math.max(0, Math.ceil((W / 2 - xmax) / dx - 0.5));
      const i1 = Math.min(Nx - 1, Math.floor((W / 2 - xmin) / dx - 0.5));
      for (let i = i0; i <= i1; i++) {
        const x = W / 2 - (i + 0.5) * dx;
        if (x < xmin || x >= xmax) continue;
        olay[i].push(ya + (x - xa) * (yb - ya) / (xb - xa), p, kos);
      }
    };
    const kes = (olay, pos, idx, dd, xx, yy, p) => {
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
        let p1x = 0, p1y = 0, p2x = 0, p2y = 0, k = 0;
        const kenar = (i, j, di, dj) => {
          const t2 = di / (di - dj);
          const X = xx[i] + (xx[j] - xx[i]) * t2, Y = yy[i] + (yy[j] - yy[i]) * t2;
          if (k === 0) { p1x = X; p1y = Y; } else { p2x = X; p2y = Y; }
          k++;
        };
        if (sa !== sb) kenar(a, c1, da, db);
        if (sb !== sc) kenar(c1, c2, db, dc);
        if (sc !== sa) kenar(c2, a, dc, da);
        if (k === 2) sutunEkle(olay, p1x, p1y, p2x, p2y, p);
      }
    };
    // Anatomi: yalnız poz ya da alan değişince yeniden kesilir
    const anahtar = `${pz.surum}|${D}|${this.app.blokTanim?.id ?? ''}`;
    if (anahtar !== this.anatAnahtar) {
      this.anatAnahtar = anahtar;
      for (const o of this.olayA) o.length = 0;
      const tmp = new THREE.Vector3();
      this.parcalar.forEach((pr, p) => {
        tmp.copy(pr.merkez).sub(O);
        if (Math.abs(tmp.dot(mz)) > pr.r + 0.002) return;
        if (Math.abs(tmp.dot(u)) > W / 2 + pr.r) return;
        const yb = tmp.dot(b);
        if (yb < -pr.r - 0.02 || yb > D + pr.r) return;
        kes(this.olayA, pr.pos, pr.idx, pr.d, pr.x, pr.y, p);
      });
    }
    // Blok nesneleri (görünürse) her karede: iğne ilerler, LA büyür
    for (const o of this.olayN) o.length = 0;
    const app = this.app;
    app.merkez.updateMatrixWorld(true);
    const mTers = new THREE.Matrix4().copy(app.anat.root.matrixWorld).invert();
    const v = new THREE.Vector3();
    this.nesneParca = [];
    for (const n of this.nesneler) {
      if (!n.kok.visible || !n.mesh.visible) continue;
      const rel = new THREE.Matrix4().multiplyMatrices(mTers, n.mesh.matrixWorld);
      const src = n.src || (n.src = konumlar(n.mesh.geometry.attributes.position));
      if (!n.pos || n.pos.length !== src.length) { n.pos = new Float32Array(src.length); n.d = new Float32Array(src.length / 3); n.x = new Float32Array(src.length / 3); n.y = new Float32Array(src.length / 3); }
      for (let i = 0; i < src.length; i += 3) { v.set(src[i], src[i + 1], src[i + 2]).applyMatrix4(rel); n.pos[i] = v.x; n.pos[i + 1] = v.y; n.pos[i + 2] = v.z; }
      const p = this.parcalar.length + this.nesneParca.length;
      // iğne parlaklığı: ışına dik iğne en parlak (speküler), dike yakın iğne sönük
      let parlak = 0;
      if (n.sinif === S.IGNE) {
        const eks = new THREE.Vector3(0, 1, 0).transformDirection(rel);
        const c = eks.dot(b);
        parlak = Math.pow(Math.max(0, 1 - c * c), 1.3);
      }
      this.nesneParca.push({ sinif: n.sinif, ad: n.sinif === S.IGNE ? 'İğne' : n.sinif === S.LA ? 'Lokal anestezik' : 'Bağ', parlak });
      kes(this.olayN, n.pos, n.mesh.geometry.index ? n.mesh.geometry.index.array : null, n.d, n.x, n.y, p);
    }
    const NP = this.parcalar.length;
    const sinifOf = (p) => (p < NP ? this.parcalar[p].sinif : this.nesneParca[p - NP].sinif);
    this.sinifOf = sinifOf;
    // Atım: arter aralıkları sistolde derinlikte genişler (duvar hareketi); venler solunumla hafifçe
    const kalp = ((t / 1000) * 72 / 60) % 1;
    const atim = kalp < 0.15 ? Math.sin((kalp / 0.15) * Math.PI / 2) : Math.exp(-(kalp - 0.15) * 5);
    const dA = 0.00028 * atim, dV = 0.00012 * Math.sin((t / 1000) * 2 * Math.PI / 4.5);
    // Sütunlar: olayları sırala, etiket / çizgi / sınır açısı haritalarını doldur
    const { etiketHarita: E, cizgiHarita: C, kosHarita: K } = this;
    K.fill(0);
    const dy = D / Ny;
    const say = new Map();
    const ev = [];
    for (let i = 0; i < Nx; i++) {
      ev.length = 0;
      for (const kaynak of [this.olayA[i], this.olayN[i]]) for (let k = 0; k < kaynak.length; k += 3) ev.push([kaynak[k], kaynak[k + 1], kaynak[k + 2]]);
      say.clear();
      ev.sort((a, c) => a[0] - c[0]);
      for (const e of ev) {
        const s = sinifOf(e[1]);
        if (s !== S.ARTER && s !== S.VEN) continue;
        const c = say.get(e[1]) || 0;
        say.set(e[1], c + 1);
        const d = s === S.ARTER ? dA : dV;
        e[0] += (c % 2 === 0 ? -d : d);
      }
      ev.sort((a, c) => a[0] - c[0]);
      const icerde = [];
      let k = 0;
      let deriIci = false;
      for (let j = 0; j < Ny; j++) {
        const yj = (j + 0.5) * dy;
        const q = j * Nx + i;
        let cizgi = -1, kos = 0;
        while (k < ev.length && ev[k][0] < yj) {
          const [y, p, c] = ev[k];
          const s = sinifOf(p);
          if (CIZGI.has(s)) cizgi = p;
          else if (s === S.DERI) deriIci = true; // ilk deri geçişinden sonrası vücut içi (bazı bölgelerde deri çift yüzlü ince kabuk)
          else {
            const ix = icerde.indexOf(p);
            if (ix >= 0) icerde.splice(ix, 1); else icerde.push(p);
          }
          if (y > yj - dy) kos = Math.max(kos, c);
          k++;
        }
        let en = deriIci ? GOVDE : DIS, eo = -1;
        for (const p of icerde) { const o2 = ONCELIK[sinifOf(p)]; if (o2 > eo) { eo = o2; en = p; } }
        // deri dışındaki kapalı yapı (ör. kesik kenar) yalnız deri içindeyse sayılır; iğne ve LA her zaman
        if (!deriIci && en >= 0 && sinifOf(en) !== S.IGNE && sinifOf(en) !== S.LA) en = DIS;
        E[q] = en;
        C[q] = cizgi;
        K[q] = kos;
      }
    }
  }

  /** Bir pikseldeki dokunun yankılılığı (saçıcı genliği), dokuya özgü desenle */
  dokuGenlik(e, X, Y, Z) {
    if (e === DIS) return 0;
    if (e === GOVDE) {
      // ciltaltı yağ: koyu lobüller, deriye kabaca paralel ince parlak septalar (desen derinlik yönünde sık, yanda seyrek)
      const P = this.pozEks, dz = X * P[3] + Y * P[4] + Z * P[5];
      const n = vn((X * P[0] + Y * P[1] + Z * P[2]) / 9 + 11.3, (X * P[6] + Y * P[7] + Z * P[8]) / 9, dz / 1.6);
      const sept = 1 - yumusak(0.003, 0.012, Math.abs(n - 0.5));
      return 0.1 + 0.04 * vn(X / 9, Y / 9 + 5, Z / 9) + 0.7 * sept;
    }
    const NP = this.parcalar.length;
    if (e >= NP) {
      const s = this.nesneParca[e - NP]?.sinif;
      return s === S.BAG ? 0.65 : s === S.LA ? 0.004 : 0;
    }
    const pr = this.parcalar[e], s = pr.sinif, ek = pr.eksen;
    const tohum = (e * 37.13) % 97;
    let a = 0, p1 = 0, p2 = 0;
    if (ek) {
      a = X * ek[0] + Y * ek[1] + Z * ek[2];
      p1 = X * ek[3] + Y * ek[4] + Z * ek[5];
      p2 = X * ek[6] + Y * ek[7] + Z * ek[8];
    }
    switch (s) {
      case S.KAS: {
        // kas: hipoekoik zemin + lif boyunca uzanan perimizyum: kesitte parlak noktalar ("yıldızlı gece"),
        // uzun eksende ince paralel çizgiler (tüy deseni)
        const n = vn(p1 / 0.75 + tohum, p2 / 0.75, a / 8);
        const per = yumusak(0.73, 0.86, n);
        return (0.19 + 0.07 * vn(X / 7 + tohum, Y / 7, Z / 7)) + 0.6 * per * this.aniz[e];
      }
      case S.SINIR: {
        // sinir: hipoekoik fasiküller, aralarında hiperekoik perinöryum/epinöryum (bal peteği); lif yönünde uzar
        const n = vn(p1 / 0.62 + tohum, p2 / 0.62, a / 5);
        const fas = yumusak(0.5, 0.6, n);
        return (0.62 - 0.52 * fas) * this.aniz[e];
      }
      case S.KOK: return 0.05 + 0.04 * vn(p1 / 0.8, p2 / 0.8, a / 4);
      case S.BAG: {
        const n = vn(p1 / 0.45 + tohum, p2 / 0.45, a / 7);
        return (0.45 + 0.45 * (1 - yumusak(0.01, 0.06, Math.abs(n - 0.5)))) * this.aniz[e];
      }
      case S.ORGAN: return 0.32 + 0.12 * vn(X / 6 + tohum, Y / 6, Z / 6);
      case S.BAGIRSAK: return 0.4;
      case S.KIKIRDAK: return 0.04;
      case S.ARTER: case S.VEN: return 0.004;
      default: return 0;
    }
  }

  boya(pz, t) {
    const { Nx, Ny, W, D } = this;
    const E = this.etiketHarita, C = this.cizgiHarita, K = this.kosHarita;
    const dyMm = D / Ny * 1000, dxMm = W / Nx * 1000;
    const sinifOf = this.sinifOf;
    const NP = this.parcalar.length;
    // 1) dokuya sabit saçıcılar ve piksel dünya konumları (poz değişince)
    const scAnahtar = `${pz.surum}|${D}`;
    if (scAnahtar !== this.scAnahtar) {
      this.scAnahtar = scAnahtar;
      const Om = pz.S.clone().multiplyScalar(1000), u = pz.u, b = pz.b, mz = pz.mz;
      const ik = 1 / HUCRE;
      for (let i = 0; i < Nx; i++) {
        const x = W * 500 - (i + 0.5) * dxMm;
        for (let j = 0; j < Ny; j++) {
          const y = (j + 0.5) * dyMm, q = j * Nx + i;
          const X = Om.x + u.x * x + b.x * y, Y = Om.y + u.y * x + b.y * y, Z = Om.z + u.z * x + b.z * y;
          this.PX[q] = X; this.PY[q] = Y; this.PZ[q] = Z;
          // ışın kalınlığı (elevasyon) boyunca üç örnek: düzlem az kayınca benek yavaşça değişir
          let r = 0, im = 0;
          for (let e = -1; e <= 1; e++) {
            const w = e === 0 ? 1 : 0.5;
            const h = h3i(Math.floor((X + mz.x * e * 0.3) * ik), Math.floor((Y + mz.y * e * 0.3) * ik), Math.floor((Z + mz.z * e * 0.3) * ik));
            r += w * ((h & 0xffff) / 65535 - 0.5);
            im += w * ((h >>> 16) / 65535 - 0.5);
          }
          this.scR[q] = r; this.scI[q] = im;
        }
      }
      this.echE.fill(-32000);
      this.pozEks = [u.x, u.y, u.z, b.x, b.y, b.z, mz.x, mz.y, mz.z];
      // anizotropi: sinir/tendon/kas lifleri ışına dik iken en parlak
      this.aniz = new Float32Array(NP);
      for (let p = 0; p < NP; p++) {
        const ek = this.parcalar[p].eksen;
        if (!ek) { this.aniz[p] = 1; continue; }
        const c = ek[0] * b.x + ek[1] * b.y + ek[2] * b.z, s2 = 1 - c * c;
        const sn = this.parcalar[p].sinif;
        this.aniz[p] = sn === S.KAS ? 0.55 + 0.45 * s2 : 0.3 + 0.7 * s2 * s2;
      }
    }
    // 2) yankılılık (etiket değişen piksellerde yeniden)
    const ech = this.ech, echE = this.echE;
    for (let q = 0; q < Nx * Ny; q++) {
      const e = E[q];
      if (echE[q] !== e) { ech[q] = this.dokuGenlik(e, this.PX[q], this.PY[q], this.PZ[q]); echE[q] = e; }
    }
    // 3) sütun sütun: zayıflama, gölge, speküler sınırlar, artefaktlar
    const re = this.re, im = this.im, scR = this.scR, scI = this.scI;
    const dyCm = dyMm / 10;
    const ZAYK = new Float32Array(SN);
    for (let s = 0; s < SN; s++) ZAYK[s] = Math.exp(-ZAY[s] * dyCm * 0.1151);
    const kare = this.kare;
    const jelPx = 10 / dyMm; // probla deri arasında ≤ 10 mm jel (anekoik bant) kabul edilir; ötesi hava (görüntü yok)
    const igneAralik = 0.8 / dyMm; // iğne yankılanma aralığı ≈ iğne çapı
    for (let i = 0; i < Nx; i++) {
      let T = 1, deriBas = -1, onceki = DIS, oncekiS = DIS;
      let mod = 0, modJ = 0, modA = 0, igneCik = -1, igneP = 0;
      for (let j = 0; j < Ny; j++) {
        const q = j * Nx + i;
        const e = E[q];
        const s = e >= 0 ? sinifOf(e) : e;
        const kosR = K[q] > 0 ? K[q] : 0.85;
        const pr = 0.8 + 0.4 * h3(q, 3, 9); // sınır parlaklığında küçük düzensizlik
        let coh = 0, sc = 1;
        if (mod === 0) {
          if (e === DIS && deriBas < 0 && j > jelPx) T = 0; // temas yok: havaya ses geçmez
          if (e !== onceki || C[q] >= 0) {
            const k2 = kosR * kosR;
            if (onceki === DIS && e !== DIS && deriBas < 0) { deriBas = j; coh += 1.4 * k2 * T; }
            else if (e !== onceki) coh += Math.max(ARAYUZ[s + 2], ARAYUZ[oncekiS + 2]) * k2 * pr * T;
            if (C[q] >= 0) coh += ARAYUZ[S.FASYA + 2] * k2 * pr * T;
            if (s === S.KEMIK) { mod = 1; modJ = j; modA = 3.4 * k2 * T; coh += modA; }
            else if (s === S.PLEVRA) { mod = 2; modJ = j; modA = 2.8 * Math.max(0.35, k2) * T; coh += modA; }
            else if (s === S.HAVA) { mod = 3; modJ = j; modA = 3.0 * k2 * T; coh += modA; }
            else if (s === S.BAGIRSAK && oncekiS !== S.BAGIRSAK) { mod = 3; modJ = j + Math.round(1.2 / dyMm); modA = 1.6 * T; }
            if (s === S.IGNE && oncekiS !== S.IGNE) coh += 6 * this.nesneParca[e - NP].parlak * T;
            if (oncekiS === S.IGNE && s !== S.IGNE) { igneCik = j; igneP = this.nesneParca[onceki - NP].parlak * T; }
          }
          let ek = ech[q];
          if (deriBas >= 0 && (j - deriBas) * dyMm < 1.7 && s !== S.IGNE && s !== S.LA) ek = Math.max(ek, 0.85); // dermis
          if (igneCik >= 0) {
            const d = (j - igneCik) / igneAralik, n = Math.round(d);
            if (n >= 1 && n <= 8 && Math.abs(d - n) * igneAralik < 0.6) coh += 2.6 * igneP * Math.pow(0.62, n);
            if (d > 9) igneCik = -1;
          }
          re[q] = scR[q] * ek * T + coh;
          im[q] = scI[q] * ek * T;
          T *= ZAYK[s + 2];
          if (oncekiS === S.IGNE && s !== S.IGNE) T *= 0.75; // iğne arkasında hafif gölge
          if (T > 2.4) T = 2.4;
        } else {
          const d = j - modJ;
          if (mod === 1) { // kemik: kalın parlak korteks, arkası gölge
            coh = d === 1 ? 0.75 * modA : d === 2 ? 0.35 * modA : d === 3 ? 0.12 * modA : 0;
            sc = 0.012;
          } else if (mod === 2) { // akciğer: plevra çizgisi, A-çizgileri, kayma (parıldama), düşük düzeyli pus
            const yp = modJ + 0.5;
            coh = d === 1 ? 0.6 * modA : 0;
            for (let n = 2; n <= 6; n++) { const jn = n * yp - 0.5; if (Math.abs(j - jn) < 0.8) coh += modA * 0.5 * Math.pow(0.62, n - 2) * (1 - Math.abs(j - jn) / 0.8); }
            sc = d * dyMm < 2 ? 0.25 : 0.07;
            if (d * dyMm < 2) { re[q] = (h3(q, kare, 5) - 0.5) * 0.5 * modA + coh; im[q] = (h3(q, kare, 6) - 0.5) * 0.5 * modA; continue; }
          } else { // hava / bağırsak gazı: parlak yüzey, arkasında "kirli" gölge (düzensiz gri çizgiler)
            if (d < 0) { re[q] = scR[q] * ech[q] * T; im[q] = scI[q] * ech[q] * T; if (d === -1) { coh = modA; re[q] += coh; } continue; }
            const per = 2.4 / dyMm, n = Math.round(d / per);
            if (n >= 1 && n <= 3 && Math.abs(d - n * per) < 0.6) coh = modA * 0.22 * Math.pow(0.5, n - 1) * (0.4 + h3(i >> 3, n, 77));
            sc = 0.06 + 0.1 * h3(i >> 2, (j / 6) | 0, 5) * Math.exp(-d * dyMm / 15);
          }
          re[q] = scR[q] * sc + coh;
          im[q] = scI[q] * sc;
        }
        onceki = e; oncekiS = s;
      }
    }
    // Yakın alan: lens yankılanması (çok soluk iki çizgi)
    for (let i = 0; i < Nx; i++) {
      const j1 = Math.round(0.35 / dyMm), j2 = Math.round(0.7 / dyMm);
      if (j1 < Ny) re[j1 * Nx + i] += 0.18;
      if (j2 < Ny) re[j2 * Nx + i] += 0.08;
    }
    // 4) nokta yayılımı: yanal (derinliğe göre), sonra eksenel; zarf; logaritmik sıkıştırma
    const tR = this.tR, tI = this.tI;
    for (let j = 0; j < Ny; j++) {
      const w = this.cekirdek[j], r = (w.length - 1) / 2, sat = j * Nx;
      for (let i = 0; i < Nx; i++) {
        let sr = 0, si = 0;
        const k0 = Math.max(-r, -i), k1 = Math.min(r, Nx - 1 - i);
        for (let k = k0; k <= k1; k++) { const ww = w[k + r]; sr += re[sat + i + k] * ww; si += im[sat + i + k] * ww; }
        tR[sat + i] = sr; tI[sat + i] = si;
      }
    }
    const [a2, a1, a0] = this.eks;
    const px = this.img.data;
    const gurultu = 0.0035;
    const kz = this.kazanc;
    for (let j = 0; j < Ny; j++) {
      const yMm = (j + 0.5) * dyMm;
      const kayip = -0.1 * yMm; // TGC sonrası kalan derinlik kaybı (−1 dB/cm)
      for (let i = 0; i < Nx; i++) {
        const q = j * Nx + i;
        let sr = tR[q] * a0, si = tI[q] * a0;
        if (j > 0) { sr += tR[q - Nx] * a1; si += tI[q - Nx] * a1; }
        if (j < Ny - 1) { sr += tR[q + Nx] * a1; si += tI[q + Nx] * a1; }
        if (j > 1) { sr += tR[q - 2 * Nx] * a2; si += tI[q - 2 * Nx] * a2; }
        if (j < Ny - 2) { sr += tR[q + 2 * Nx] * a2; si += tI[q + 2 * Nx] * a2; }
        const A = Math.sqrt(sr * sr + si * si) + gurultu * h3(q, kare, 1);
        const dB = 20 * Math.log10(A + 1e-7) + kz + kayip;
        let v = (dB - DB_ALT) / DB_ARALIK;
        v = v <= 0 ? 0 : v >= 1 ? 1 : Math.pow(v, GAMA);
        const g = v * 252;
        const o4 = q * 4;
        px[o4] = g; px[o4 + 1] = g; px[o4 + 2] = Math.min(255, g * 1.02 + 1); px[o4 + 3] = 255;
      }
    }
    this.bmod.getContext('2d').putImageData(this.img, 0, 0);
    if (this.mod !== 'usg') this.anatomiBoya();
  }

  /** Aynı kesitin renkli anatomisi */
  anatomiBoya() {
    const { Nx, Ny } = this;
    const E = this.etiketHarita, C = this.cizgiHarita;
    const pa = this.imgA.data, sinifOf = this.sinifOf, NP = this.parcalar.length;
    for (let i = 0; i < Nx; i++) {
      let onceki = DIS, akciger = false;
      for (let j = 0; j < Ny; j++) {
        const q = j * Nx + i, e = E[q];
        const s = e >= 0 ? sinifOf(e) : e;
        if (s === S.PLEVRA) akciger = true;
        let r = 18, gg = 22, bb = 28;
        if (e === GOVDE) [r, gg, bb] = akciger ? AKCIGER_RENK : GOVDE_RENK;
        else if (e >= 0) {
          const pr = e < NP ? this.parcalar[e] : null;
          const c = pr?.renk != null ? [(pr.renk >> 16) & 255, (pr.renk >> 8) & 255, pr.renk & 255] : RENK_ANAT[s] || [200, 200, 200];
          [r, gg, bb] = c;
        }
        if (C[q] >= 0) [r, gg, bb] = RENK_ANAT[S.FASYA];
        if (e !== onceki && e !== DIS && onceki !== DIS) { r *= 0.55; gg *= 0.55; bb *= 0.55; }
        const o4 = q * 4;
        pa[o4] = r; pa[o4 + 1] = gg; pa[o4 + 2] = bb; pa[o4 + 3] = 255;
        onceki = e;
      }
    }
    for (let j = 0; j < Ny; j++) for (let i = 1; i < Nx; i++) {
      const q = j * Nx + i;
      if (E[q] !== E[q - 1] && E[q] !== DIS && E[q - 1] !== DIS) { const o4 = q * 4; pa[o4] *= 0.55; pa[o4 + 1] *= 0.55; pa[o4 + 2] *= 0.55; }
    }
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
        if (Math.abs(r.dot(pz.mz)) > 0.006) continue;
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
    const ikili = this.mod === 'ikisi';
    // Ölçek: masaüstü/telefonda tuval, paneldeki gerçek boyutu × piksel oranı kadar çizilir (yazılar okunur kalsın);
    // gözlükte doku olarak sabit ölçek
    const xr = this.app.renderer.xr.isPresenting;
    let k, f;
    if (xr || !this.tuval.parentElement?.clientWidth) { k = this.olcek; f = 1.6; }
    else {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const kapW = this.tuval.parentElement.clientWidth;
      const maxH = Math.min(window.innerHeight * 0.55, 660);
      const panelW = ikili ? (kapW - 8) / 2 : kapW;
      const css = Math.max(0.8, Math.min(panelW / Nx, (maxH - 26) / Ny));
      k = css * dpr; f = dpr;
    }
    const pw = Math.round(Nx * k), ph = Math.round(Ny * k);
    const ust = Math.round(26 * f);
    const bosluk = ikili ? Math.round(8 * f) : 0;
    const tw = ikili ? pw * 2 + bosluk : pw, th = ph + ust;
    if (this.tuval.width !== tw || this.tuval.height !== th) {
      this.tuval.width = tw; this.tuval.height = th;
      if (!xr) { this.tuval.style.width = `${tw / f}px`; this.tuval.style.height = `${th / f}px`; }
    }
    const c = this.tuval.getContext('2d');
    c.fillStyle = '#000';
    c.fillRect(0, 0, tw, th);
    const paneller = this.mod === 'usg' ? [['usg', 0]] : this.mod === 'anatomi' ? [['anatomi', 0]] : [['usg', 0], ['anatomi', pw + bosluk]];
    const etk = this.etiketAcik ? this.etiketler(pz) : [];
    const hedef = this.app.blok.objects.hedef;
    // temas: sütunların çoğunda deri birkaç mm içinde mi
    let temasli = 0;
    const E = this.etiketHarita, jel = Math.min(Ny - 1, Math.round(10 / (D / Ny * 1000)));
    for (let i = 0; i < Nx; i += 8) if (E[jel * Nx + i] !== DIS) temasli++;
    const temas = temasli > Nx / 16;
    const yazi = (agirlik, boy) => `${agirlik} ${Math.round(boy * f)}px system-ui, -apple-system, Segoe UI, sans-serif`;
    for (const [tur, x0] of paneller) {
      c.imageSmoothingEnabled = true;
      c.drawImage(tur === 'usg' ? this.bmod : this.anat, x0, ust, pw, ph);
      c.textBaseline = 'middle';
      c.textAlign = 'left';
      c.fillStyle = '#c4d1dc';
      c.font = yazi(600, 12);
      if (tur === 'usg') {
        c.fillText(`L7 · 10 MHz · ${(D * 100).toFixed(1).replace('.', ',')} cm`, x0 + 8 * f, ust / 2);
        c.textAlign = 'right';
        c.fillStyle = '#8fa3b5';
        c.fillText(`G ${this.kazanc > 0 ? '+' : ''}${this.kazanc} dB`, x0 + pw - 8 * f, ust / 2);
        c.textAlign = 'left';
      } else c.fillText('Aynı kesit · anatomi', x0 + 8 * f, ust / 2);
      // prob işareti tarafı
      c.fillStyle = '#35e07a';
      c.beginPath(); c.arc(x0 + 10 * f, ust + 10 * f, 4 * f, 0, Math.PI * 2); c.fill();
      // derinlik ölçeği (5 mm ara, cm etiketli)
      c.strokeStyle = 'rgba(200,215,230,.7)'; c.fillStyle = 'rgba(200,215,230,.85)'; c.lineWidth = f;
      c.font = yazi(500, 10); c.textAlign = 'right';
      for (let mm = 0; mm <= D * 1000 + 1e-6; mm += 5) {
        const y = ust + (mm / 1000) / D * ph, buyuk = mm % 10 === 0;
        c.beginPath(); c.moveTo(x0 + pw - (buyuk ? 8 : 4) * f, y); c.lineTo(x0 + pw - f, y); c.stroke();
        if (buyuk && mm > 0 && y < ust + ph - 6 * f) c.fillText(String(mm / 10), x0 + pw - 11 * f, y);
      }
      c.textAlign = 'left';
      if (tur === 'usg' && !temas) {
        c.fillStyle = 'rgba(220,230,240,.85)'; c.font = yazi(600, 13); c.textAlign = 'center';
        c.fillText('Prob deriye değmiyor', x0 + pw / 2, ust + ph / 2);
        c.textAlign = 'left';
      }
      const ekran = (x, y) => [x0 + (W / 2 - x) / W * pw, ust + y / D * ph];
      // hedef (yalnız düzleme yakınsa)
      if (hedef?.visible) {
        const r = hedef.position.clone().sub(pz.S);
        if (Math.abs(r.dot(pz.mz)) < 0.005) {
          const [hx, hy] = ekran(r.dot(pz.u), r.dot(pz.b));
          c.strokeStyle = '#3ff0ff'; c.lineWidth = 2 * f;
          c.beginPath(); c.arc(hx, hy, 6 * f, 0, Math.PI * 2); c.stroke(); c.lineWidth = f;
        }
      }
      // etiketler: nokta + kutu; sol yarıdakiler sağa, sağ yarıdakiler sola yazılır, dikeyde çakışma önlenir
      const yerlesik = [];
      const sirali = etk.map((e) => ({ ...e, p: ekran(e.x, e.y) })).sort((a, b2) => a.p[1] - b2.p[1]);
      c.font = yazi(600, 11.5);
      const KH = 18 * f;
      for (const e of sirali) {
        const [ax, ay] = e.p;
        const sola = ax > x0 + pw / 2;
        const tw2 = c.measureText(e.metin).width + 10 * f;
        let bx = sola ? ax - 14 * f - tw2 : ax + 14 * f;
        bx = Math.max(x0 + 2 * f, Math.min(x0 + pw - tw2 - 14 * f, bx));
        let by = ay - KH / 2;
        for (const o of yerlesik) if (by < o.y + KH + f && by + KH > o.y && bx < o.x + o.w && bx + tw2 > o.x) by = o.y + KH + 2 * f;
        by = Math.min(ust + ph - KH - 2 * f, Math.max(ust + 2 * f, by));
        yerlesik.push({ x: bx, y: by, w: tw2 });
        c.strokeStyle = e.renk; c.globalAlpha = 0.9;
        c.beginPath(); c.moveTo(ax, ay); c.lineTo(sola ? bx + tw2 : bx, by + KH / 2); c.stroke();
        c.globalAlpha = 1;
        c.fillStyle = e.renk; c.beginPath(); c.arc(ax, ay, 2.6 * f, 0, Math.PI * 2); c.fill();
        c.fillStyle = 'rgba(8,12,16,.82)';
        c.fillRect(bx, by, tw2, KH);
        c.fillStyle = e.renk; c.fillRect(bx, by, 3 * f, KH);
        c.fillStyle = '#ffffff'; c.fillText(e.metin, bx + 7 * f, by + KH / 2 + 0.5 * f);
      }
    }
  }
}
