// Prob sürücüsü: kullanıcının probu deride gezdirmesi, döndürmesi ve eğmesi.
// Masaüstü/telefon: probu (ya da kesit düzlemini) tutup sürükle; tekerlek döndürür, Shift+tekerlek eğer; çift tık probu
// oraya koyar; klavye: Q/E döndür, W/S eğ, A/D sallama (heel-toe), oklar 1 mm kaydırır. Gözlükte (XR) kumanda ile tutulur.
//
// Poz, anatomi kökünün koordinatlarında tutulur: S lens yüzünün ortası, ex probun +x ekseni (blok tanımındaki u),
// ey probun sap ekseni (deriden dışarı), ez = ex × ey. Işın yönü b = −ey. Görüntünün yanal ekseni u = ex · işaret.
import * as THREE from 'three';

const V = () => new THREE.Vector3();
const EGIM_EN_COK = THREE.MathUtils.degToRad(40);

// Konum özniteliği iç içe olabilir (konum+normal tek tamponda)
function dizi(attr) {
  const o = new Float32Array(attr.count * 3);
  for (let i = 0; i < attr.count; i++) { o[i * 3] = attr.getX(i); o[i * 3 + 1] = attr.getY(i); o[i * 3 + 2] = attr.getZ(i); }
  return o;
}

/** Deri üçgenleri için düzgün ızgara: ışın–deri kesişimi (3B DDA ile yalnız geçilen hücreler denenir) */
class DeriIzgara {
  constructor(meshes, kok) {
    kok.updateMatrixWorld(true);
    const kokTers = new THREE.Matrix4().copy(kok.matrixWorld).invert();
    const P = [], N = [];
    const v = V(), nm = new THREE.Matrix3();
    for (const m of meshes) {
      const rel = new THREE.Matrix4().multiplyMatrices(kokTers, m.matrixWorld);
      nm.getNormalMatrix(rel);
      const g = m.geometry, pos = dizi(g.attributes.position), nor = g.attributes.normal ? dizi(g.attributes.normal) : null;
      const idx = g.index ? g.index.array : null, n = idx ? idx.length : pos.length / 3;
      const tp = new Float32Array(pos.length), tn = nor ? new Float32Array(nor.length) : null;
      for (let i = 0; i < pos.length; i += 3) {
        v.set(pos[i], pos[i + 1], pos[i + 2]).applyMatrix4(rel); tp[i] = v.x; tp[i + 1] = v.y; tp[i + 2] = v.z;
        if (tn) { v.set(nor[i], nor[i + 1], nor[i + 2]).applyMatrix3(nm).normalize(); tn[i] = v.x; tn[i + 1] = v.y; tn[i + 2] = v.z; }
      }
      for (let k = 0; k < n; k += 3) {
        const a = idx ? idx[k] : k, b = idx ? idx[k + 1] : k + 1, c = idx ? idx[k + 2] : k + 2;
        for (const q of [a, b, c]) { P.push(tp[q * 3], tp[q * 3 + 1], tp[q * 3 + 2]); if (tn) N.push(tn[q * 3], tn[q * 3 + 1], tn[q * 3 + 2]); else N.push(0, 0, 0); }
      }
    }
    this.P = Float32Array.from(P);
    this.N = Float32Array.from(N);
    const T = this.P.length / 9;
    const kutu = new THREE.Box3();
    for (let i = 0; i < this.P.length; i += 3) kutu.expandByPoint(v.set(this.P[i], this.P[i + 1], this.P[i + 2]));
    kutu.expandByScalar(0.001);
    this.min = kutu.min.clone();
    this.h = 0.012; // hücre 12 mm
    const boy = kutu.getSize(V());
    this.n = [Math.ceil(boy.x / this.h), Math.ceil(boy.y / this.h), Math.ceil(boy.z / this.h)];
    const hucre = new Map();
    for (let t = 0; t < T; t++) {
      let x0 = Infinity, y0 = Infinity, z0 = Infinity, x1 = -Infinity, y1 = -Infinity, z1 = -Infinity;
      for (let k = 0; k < 3; k++) {
        const o = t * 9 + k * 3;
        x0 = Math.min(x0, this.P[o]); x1 = Math.max(x1, this.P[o]);
        y0 = Math.min(y0, this.P[o + 1]); y1 = Math.max(y1, this.P[o + 1]);
        z0 = Math.min(z0, this.P[o + 2]); z1 = Math.max(z1, this.P[o + 2]);
      }
      const [i0, j0, k0] = this.hucreNo(x0, y0, z0), [i1, j1, k1] = this.hucreNo(x1, y1, z1);
      for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) for (let k = k0; k <= k1; k++) {
        const key = (i * this.n[1] + j) * this.n[2] + k;
        let l = hucre.get(key);
        if (!l) hucre.set(key, (l = []));
        l.push(t);
      }
    }
    this.hucre = hucre;
  }

  hucreNo(x, y, z) {
    const c = (a, m, n) => Math.max(0, Math.min(n - 1, Math.floor((a - m) / this.h)));
    return [c(x, this.min.x, this.n[0]), c(y, this.min.y, this.n[1]), c(z, this.min.z, this.n[2])];
  }

  /** o: başlangıç, d: birim yön (kök koordinatı). En yakın kesişim: {t, p, n (dışa: ışına karşı)} */
  vur(o, d, tMax = 3) {
    // kutuya giriş
    const max = [this.min.x + this.n[0] * this.h, this.min.y + this.n[1] * this.h, this.min.z + this.n[2] * this.h];
    const mn = [this.min.x, this.min.y, this.min.z], oo = [o.x, o.y, o.z], dd = [d.x, d.y, d.z];
    let t0 = 0, t1 = tMax;
    for (let a = 0; a < 3; a++) {
      if (Math.abs(dd[a]) < 1e-12) { if (oo[a] < mn[a] || oo[a] > max[a]) return null; continue; }
      let ta = (mn[a] - oo[a]) / dd[a], tb = (max[a] - oo[a]) / dd[a];
      if (ta > tb) [ta, tb] = [tb, ta];
      t0 = Math.max(t0, ta); t1 = Math.min(t1, tb);
      if (t0 > t1) return null;
    }
    const bas = [oo[0] + dd[0] * (t0 + 1e-6), oo[1] + dd[1] * (t0 + 1e-6), oo[2] + dd[2] * (t0 + 1e-6)];
    let [i, j, k] = this.hucreNo(bas[0], bas[1], bas[2]);
    const ad = [Math.sign(dd[0]), Math.sign(dd[1]), Math.sign(dd[2])];
    const sonraki = (a, c) => (ad[a] > 0 ? mn[a] + (c + 1) * this.h : mn[a] + c * this.h);
    const tMaxA = [0, 1, 2].map((a) => (ad[a] === 0 ? Infinity : (sonraki(a, [i, j, k][a]) - oo[a]) / dd[a]));
    const tDelta = [0, 1, 2].map((a) => (ad[a] === 0 ? Infinity : this.h / Math.abs(dd[a])));
    let en = null;
    const denendi = new Set();
    for (let adim = 0; adim < 400; adim++) {
      const l = this.hucre.get((i * this.n[1] + j) * this.n[2] + k);
      if (l) for (const t of l) {
        if (denendi.has(t)) continue;
        denendi.add(t);
        const h = this.ucgen(t, oo, dd);
        if (h && h.t > 0 && h.t < t1 && (!en || h.t < en.t)) en = h;
      }
      const a = tMaxA[0] < tMaxA[1] ? (tMaxA[0] < tMaxA[2] ? 0 : 2) : (tMaxA[1] < tMaxA[2] ? 1 : 2);
      if (en && en.t <= tMaxA[a]) break;
      if (tMaxA[a] > t1) break;
      if (a === 0) i += ad[0]; else if (a === 1) j += ad[1]; else k += ad[2];
      if (i < 0 || j < 0 || k < 0 || i >= this.n[0] || j >= this.n[1] || k >= this.n[2]) break;
      tMaxA[a] += tDelta[a];
    }
    if (!en) return null;
    const p = new THREE.Vector3(oo[0] + dd[0] * en.t, oo[1] + dd[1] * en.t, oo[2] + dd[2] * en.t);
    const n = new THREE.Vector3(en.n[0], en.n[1], en.n[2]);
    if (n.lengthSq() < 1e-8) n.set(en.fn[0], en.fn[1], en.fn[2]);
    n.normalize();
    if (n.x * dd[0] + n.y * dd[1] + n.z * dd[2] > 0) n.negate();
    return { t: en.t, p, n };
  }

  // Möller–Trumbore; yumuşak normal: köşe normallerinin ağırlıklı toplamı
  ucgen(t, o, d) {
    const P = this.P, b = t * 9;
    const e1x = P[b + 3] - P[b], e1y = P[b + 4] - P[b + 1], e1z = P[b + 5] - P[b + 2];
    const e2x = P[b + 6] - P[b], e2y = P[b + 7] - P[b + 1], e2z = P[b + 8] - P[b + 2];
    const px = d[1] * e2z - d[2] * e2y, py = d[2] * e2x - d[0] * e2z, pz = d[0] * e2y - d[1] * e2x;
    const det = e1x * px + e1y * py + e1z * pz;
    if (Math.abs(det) < 1e-14) return null;
    const inv = 1 / det;
    const sx = o[0] - P[b], sy = o[1] - P[b + 1], sz = o[2] - P[b + 2];
    const u = (sx * px + sy * py + sz * pz) * inv;
    if (u < 0 || u > 1) return null;
    const qx = sy * e1z - sz * e1y, qy = sz * e1x - sx * e1z, qz = sx * e1y - sy * e1x;
    const v = (d[0] * qx + d[1] * qy + d[2] * qz) * inv;
    if (v < 0 || u + v > 1) return null;
    const tt = (e2x * qx + e2y * qy + e2z * qz) * inv;
    const N = this.N, w = 1 - u - v;
    return {
      t: tt,
      n: [N[b] * w + N[b + 3] * u + N[b + 6] * v, N[b + 1] * w + N[b + 4] * u + N[b + 7] * v, N[b + 2] * w + N[b + 5] * u + N[b + 8] * v],
      fn: [e1y * e2z - e1z * e2y, e1z * e2x - e1x * e2z, e1x * e2y - e1y * e2x],
    };
  }
}

export class ProbSurucu {
  constructor(app) {
    this.app = app;
    this.S = V(); this.ex = V(); this.ey = V(); this.ez = V();
    this.nDeri = V(); // son oturduğu deri noktasının normali
    this.surum = 0; // poz her değiştiğinde artar (USG önbelleği için)
    this.serbest = false; // kullanıcı oynattı mı
    this.temas = true;
    this.izgaralar = new WeakMap(); // anat → DeriIzgara
    this.surukle = null;
    this.ustunde = false;
    this.xrTutan = null;
    this.olaylar();
  }

  // ---------------------------------------------------------------- poz
  get blok() { return this.app.blok; }
  get isaret() { return this.blok?.objects.prob?.userData.isaretTers ? -1 : 1; }

  /** Blok tanımındaki önerilen poza dön */
  sifirla() {
    const P = this.blok?.P;
    if (!P) return;
    this.S.copy(P.S); this.ex.copy(P.u); this.ey.copy(P.n); this.nDeri.copy(P.n);
    this.dikle();
    this.serbest = false;
    this.temas = true;
    this.degisti();
  }

  dikle() {
    this.ey.normalize();
    this.ex.addScaledVector(this.ey, -this.ex.dot(this.ey)).normalize();
    this.ez.crossVectors(this.ex, this.ey).normalize();
  }

  degisti(kullanici = false) {
    if (kullanici) this.serbest = true;
    this.surum++;
    this.uygula();
    this.app.usg?.pozDegisti?.();
  }

  /** USG için poz: S, u (görüntünün solu = işaret tarafı), b (ışın), mz (düzlem normali) */
  poz() {
    const s = this.isaret;
    return { S: this.S, u: this.ex.clone().multiplyScalar(s), b: this.ey.clone().negate(), mz: this.ez.clone().multiplyScalar(s), ex: this.ex, ey: this.ey, ez: this.ez, surum: this.surum, temas: this.temas };
  }

  /** 3B prob ve kesit düzlemini poza getir */
  uygula() {
    const o = this.blok?.objects;
    if (!o) return;
    const m = new THREE.Matrix4().makeBasis(this.ex, this.ey, this.ez);
    const q = new THREE.Quaternion().setFromRotationMatrix(m);
    for (const k of ['prob', 'kesit']) {
      if (!o[k]) continue;
      o[k].quaternion.copy(q);
      o[k].position.copy(this.S);
    }
  }

  izgara() {
    const anat = this.app.anat;
    if (!anat) return null;
    if (!this.izgaralar.has(anat)) this.izgaralar.set(anat, new DeriIzgara(anat.byLayer.deri || [], anat.root));
    return this.izgaralar.get(anat);
  }

  /** Probu deri noktasına taşı: yön ve eğim deri normalindeki değişimle birlikte taşınır (paralel taşıma) */
  deriyeKoy(p, n) {
    const q = new THREE.Quaternion().setFromUnitVectors(this.nDeri.clone().normalize(), n.clone().normalize());
    this.ex.applyQuaternion(q); this.ey.applyQuaternion(q);
    this.nDeri.copy(n).normalize();
    this.S.copy(p);
    this.temas = true;
    this.dikle();
  }

  /** S çevresinde deriye yeniden otur (klavye kaydırma, döndürme sonrası) */
  yenidenOtur() {
    const iz = this.izgara();
    if (!iz) return;
    const bas = this.S.clone().addScaledVector(this.nDeri, 0.03);
    const h = iz.vur(bas, this.nDeri.clone().negate(), 0.08);
    if (h) {
      const nYumusak = this.nDeri.clone().lerp(h.n, 0.6).normalize();
      this.deriyeKoy(h.p, nYumusak);
    }
  }

  dondur(aci) {
    const q = new THREE.Quaternion().setFromAxisAngle(this.nDeri, aci);
    this.ex.applyQuaternion(q); this.ey.applyQuaternion(q);
    this.dikle();
    this.degisti(true);
  }

  /** Eğme (tilt): probun uzun ekseni (ex) etrafında; düzlem elevasyon yönünde süpürülür */
  eg(aci) { this.egVeSalla(this.ex.clone(), aci); }
  /** Sallama (heel-toe): düzlem normali (ez) etrafında, görüntü düzleminde */
  salla(aci) { this.egVeSalla(this.ez.clone(), aci); }
  egVeSalla(eksen, aci) {
    const q = new THREE.Quaternion().setFromAxisAngle(eksen, aci);
    const ey2 = this.ey.clone().applyQuaternion(q);
    if (ey2.angleTo(this.nDeri) > EGIM_EN_COK && ey2.angleTo(this.nDeri) > this.ey.angleTo(this.nDeri)) return;
    this.ex.applyQuaternion(q); this.ey.copy(ey2);
    this.dikle();
    this.degisti(true);
  }

  kaydir(du, dz) {
    this.S.addScaledVector(this.ex, du).addScaledVector(this.ez, dz);
    this.yenidenOtur();
    this.degisti(true);
  }

  // ---------------------------------------------------------------- masaüstü / dokunmatik
  get kullanilabilir() {
    const { app } = this;
    return !!app.blok && app.usg?.aktif && !app.renderer.xr.isPresenting && (app.blok.objects.prob?.visible || app.blok.objects.kesit?.visible);
  }

  ndc(e) {
    const r = this.app.renderer.domElement.getBoundingClientRect();
    return new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  }

  /** Ekran noktasından kök koordinatında ışın */
  isin(ndc) {
    const { camera, anat } = this.app;
    const rc = new THREE.Raycaster();
    rc.setFromCamera(ndc, camera);
    const ters = new THREE.Matrix4().copy(anat.root.matrixWorld).invert();
    const o = rc.ray.origin.clone().applyMatrix4(ters);
    const d = rc.ray.direction.clone().transformDirection(ters);
    return { rc, o, d };
  }

  probaDegiyor(ndc) {
    const o = this.blok.objects;
    const hedef = [o.prob, o.kesit].filter((x) => x?.visible);
    if (!hedef.length) return false;
    const rc = new THREE.Raycaster();
    rc.setFromCamera(ndc, this.app.camera);
    return rc.intersectObjects(hedef, true).length > 0;
  }

  ekrandaS() {
    const w = this.S.clone();
    this.app.anat.root.localToWorld(w);
    w.project(this.app.camera);
    return new THREE.Vector2(w.x, w.y);
  }

  deriyeIsin(ndc) {
    const iz = this.izgara();
    if (!iz) return null;
    const { o, d } = this.isin(ndc);
    return iz.vur(o, d, 5);
  }

  olaylar() {
    const host = this.app.renderer.domElement.parentElement;
    const tuval = this.app.renderer.domElement;
    host.addEventListener('pointerdown', (e) => {
      if (!this.kullanilabilir || (e.pointerType === 'mouse' && e.button !== 0)) return;
      const n = this.ndc(e);
      if (!this.probaDegiyor(n)) return;
      e.stopPropagation();
      e.preventDefault();
      try { host.setPointerCapture(e.pointerId); } catch (_) { /* yapay olayda kimlik yok */ }
      this.surukle = { id: e.pointerId, ofset: n.clone().sub(this.ekrandaS()) };
      tuval.style.cursor = 'grabbing';
      this.app.usg?.ipucu?.(false);
    }, true);
    host.addEventListener('pointermove', (e) => {
      if (this.surukle && e.pointerId === this.surukle.id) {
        const h = this.deriyeIsin(this.ndc(e).sub(this.surukle.ofset));
        if (h) {
          const n = this.nDeri.clone().lerp(h.n, 0.5).normalize(); // titremesin
          this.deriyeKoy(h.p, n);
          this.degisti(true);
        }
        return;
      }
      if (e.pointerType !== 'mouse' || !this.kullanilabilir) { if (this.ustunde) { this.ustunde = false; tuval.style.cursor = ''; } return; }
      if (e.buttons) return;
      // üzerine gelince el imleci (seyrek dene)
      const simdi = performance.now();
      if (simdi - (this.sonUzerine || 0) < 60) return;
      this.sonUzerine = simdi;
      this.ustunde = this.probaDegiyor(this.ndc(e));
      tuval.style.cursor = this.ustunde ? 'grab' : '';
    }, true);
    const birak = (e) => {
      if (!this.surukle || e.pointerId !== this.surukle.id) return;
      this.surukle = null;
      tuval.style.cursor = this.ustunde ? 'grab' : '';
      e.stopPropagation();
    };
    host.addEventListener('pointerup', birak, true);
    host.addEventListener('pointercancel', birak, true);
    // Tekerlek: prob üzerindeyken döndür (Shift: eğ, Alt: salla); aksi halde kamera yakınlaştırır
    host.addEventListener('wheel', (e) => {
      if (!this.kullanilabilir || !(this.ustunde || this.surukle)) return;
      e.preventDefault();
      e.stopPropagation();
      const d = Math.sign(e.deltaY || e.deltaX);
      if (e.shiftKey) this.eg(d * THREE.MathUtils.degToRad(2));
      else if (e.altKey) this.salla(d * THREE.MathUtils.degToRad(2));
      else this.dondur(d * THREE.MathUtils.degToRad(5));
    }, { capture: true, passive: false });
    // Çift tık: probu tıklanan deri noktasına koy
    tuval.addEventListener('dblclick', (e) => {
      if (!this.kullanilabilir) return;
      const h = this.deriyeIsin(this.ndc(e));
      if (!h) return;
      this.deriyeKoy(h.p, h.n);
      this.degisti(true);
    });
    window.addEventListener('keydown', (e) => {
      if (!this.kullanilabilir || e.metaKey || e.ctrlKey) return;
      if (/INPUT|SELECT|TEXTAREA/.test(document.activeElement?.tagName || '') && document.activeElement.type !== 'range') return;
      const der = THREE.MathUtils.degToRad;
      const k = e.key.toLowerCase();
      const islem = {
        q: () => this.dondur(der(-5)), e: () => this.dondur(der(5)),
        w: () => this.eg(der(-2)), s: () => this.eg(der(2)),
        a: () => this.salla(der(-2)), d: () => this.salla(der(2)),
        arrowleft: () => this.kaydir(0.001 * this.isaret, 0), arrowright: () => this.kaydir(-0.001 * this.isaret, 0),
        arrowup: () => this.kaydir(0, 0.001), arrowdown: () => this.kaydir(0, -0.001),
      }[k];
      if (!islem) return;
      e.preventDefault();
      islem();
    });
  }

  // ---------------------------------------------------------------- gözlük (XR)
  /** Kumandanın ışını probu ya da kesiti vuruyorsa tut */
  xrTut(c, rc) {
    const o = this.blok?.objects;
    if (!o || !this.app.usg?.aktif) return false;
    const hedef = [o.prob, o.kesit].filter((x) => x?.visible);
    if (!hedef.length || !rc.intersectObjects(hedef, true).length) return false;
    o.prob.updateMatrixWorld(true);
    this.xrTutan = { c, ofset: new THREE.Matrix4().copy(c.matrixWorld).invert().multiply(o.prob.matrixWorld) };
    return true;
  }
  xrBirak(c) {
    if (this.xrTutan?.c !== c) return false;
    this.xrTutan = null;
    return true;
  }
  /** Her karede: tutulan probu kumandaya göre yerleştir; lens yüzü 4 cm içinde deriye değiyorsa deriye oturt */
  xrGuncelle() {
    if (!this.xrTutan) return;
    const { anat } = this.app;
    const m = new THREE.Matrix4().multiplyMatrices(this.xrTutan.c.matrixWorld, this.xrTutan.ofset);
    const ters = new THREE.Matrix4().copy(anat.root.matrixWorld).invert();
    const yerel = new THREE.Matrix4().multiplyMatrices(ters, m);
    const p = V(), q = new THREE.Quaternion(), s = V();
    yerel.decompose(p, q, s);
    this.ex.set(1, 0, 0).applyQuaternion(q);
    this.ey.set(0, 1, 0).applyQuaternion(q);
    this.dikle();
    const iz = this.izgara();
    const h = iz?.vur(p.clone().addScaledVector(this.ey, 0.04), this.ey.clone().negate(), 0.08);
    if (h && h.t < 0.046) {
      this.S.copy(h.p); this.nDeri.copy(h.n); this.temas = true;
    } else {
      this.S.copy(p); this.nDeri.copy(this.ey); this.temas = false;
    }
    this.degisti(true);
  }
}
