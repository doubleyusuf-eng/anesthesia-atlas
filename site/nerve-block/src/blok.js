// Blok motoru: tüm bloklarda ortak geometri (prob yerleşimi, USG kesiti, iğne yolu, LA yayılımı) ve nesneler.
// Her blok (src/bloklar/*.js) bu araçlarla kendi hedefini ve eğitim adımlarını tanımlar.
import * as THREE from 'three';
import { partVertices } from './anatomy.js';
import { makeLabel } from './labels.js';

export const V = (a) => new THREE.Vector3(a[0], a[1], a[2]);
export const fmt = (x) => x.toFixed(1).replace('.', ',');
export const RENK = {
  SARI: '#f5d02f', KIRMIZI: '#ff5a4d', MAVI: '#5b8cff', YESIL: '#4fd1b8', BEYAZ: '#e8e8e8',
  PEMBE: '#ff4fd8', CAMGOBEGI: '#3ff0ff', KAS: '#e07a5f', PROB: '#35e07a', KESIT: '#9fd8ff', KEMIK: '#f3ead6', ORGAN: '#f0a3b4',
};

export function centroid(pts) {
  if (!pts.length) return null;
  const c = new THREE.Vector3();
  for (const p of pts) c.add(p);
  return c.multiplyScalar(1 / pts.length);
}

/** Bir vektöre dik iki teğet */
function tegetler(n) {
  const yard = Math.abs(n.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const t1 = yard.clone().cross(n).normalize();
  const t2 = n.clone().cross(t1).normalize();
  return [t1, t2];
}

export class Arac {
  constructor(anat) {
    this.anat = anat;
    anat.root.updateMatrixWorld(true);
    this.ray = new THREE.Raycaster();
    this.deriler = anat.byLayer.deri || [];
    this._v = new Map();
  }

  verts(name) {
    if (!this.anat.parts.has(name)) return [];
    if (!this._v.has(name)) this._v.set(name, partVertices(this.anat.parts.get(name)));
    return this._v.get(name);
  }

  /** Birden çok parçanın, süzgeçten geçen köşelerinin merkezi */
  merkez(names, suzgec = () => true) {
    const pts = [].concat(...[].concat(names).map((n) => this.verts(n))).filter(suzgec);
    return centroid(pts);
  }

  /** Bir yöndeki en uç köşeler (ör. ön yüz): oran = alınacak dilim */
  uc(names, yon, suzgec = () => true, oran = 0.25) {
    const pts = [].concat(...[].concat(names).map((n) => this.verts(n))).filter(suzgec)
      .sort((a, b) => b.dot(yon) - a.dot(yon));
    return centroid(pts.slice(0, Math.max(1, Math.ceil(pts.length * oran))));
  }

  deriVur(from, dir) {
    this.ray.set(from, dir);
    const h = this.ray.intersectObjects(this.deriler, false)[0];
    if (!h) return null;
    const n = h.face.normal.clone();
    if (n.dot(dir) > 0) n.negate();
    return { p: h.point.clone(), n: n.normalize() };
  }

  /**
   * Prob yerleşimi: hedefin üzerindeki deri noktası, ortalama deri normali ve prob eksenleri.
   * @param hedef    probun altında kalacak derin nokta
   * @param disari   deriden dışarı bakan referans yön (ör. ön yüz için +z)
   * @param uIpucu   prob uzun ekseni için yön ipucu (iğnenin gireceği uca doğru)
   * @param enCokDer normalin referans yönden en çok sapması (derece)
   */
  probYerlestir(hedef, disari, uIpucu, { enCokDer = 20, alan = 0.015, bas = 0.2 } = {}) {
    const n0 = disari.clone().normalize();
    const sk = this.deriVur(hedef.clone().addScaledVector(n0, bas), n0.clone().negate())
      || { p: hedef.clone().addScaledVector(n0, 0.025), n: n0.clone() };
    const S = sk.p;
    const [t1, t2] = tegetler(n0);
    const acc = new THREE.Vector3();
    let k = 0;
    for (let a = -alan; a <= alan + 1e-4; a += alan / 2) {
      for (let c = -alan; c <= alan + 1e-4; c += alan / 2) {
        const from = S.clone().addScaledVector(t1, a).addScaledVector(t2, c).addScaledVector(n0, bas);
        const h = this.deriVur(from, n0.clone().negate());
        if (h) { acc.add(h.n); k++; }
      }
    }
    let n = k ? acc.normalize() : n0.clone();
    const enCok = THREE.MathUtils.degToRad(enCokDer);
    if (n.angleTo(n0) > enCok) {
      const eksen = n0.clone().cross(n).normalize();
      n = n0.clone().applyAxisAngle(eksen, enCok);
    }
    const b = n.clone().negate();
    const u = uIpucu.clone().sub(n.clone().multiplyScalar(uIpucu.dot(n))).normalize();
    const mz = u.clone().cross(n).normalize();
    return { S, n, b, u, mz };
  }

  /** Prob uzun eksenini yeniden ayarla (deri normali aynı kalır) */
  eksenAyarla(P, uIpucu) {
    const u = uIpucu.clone().sub(P.n.clone().multiplyScalar(uIpucu.dot(P.n))).normalize();
    return { ...P, u, mz: u.clone().cross(P.n).normalize() };
  }

  /** Bir tüp yapının (damar, sinir) bir nokta çevresindeki doğrultusu */
  dogrultu(names, merkez, yaricap = 0.02) {
    const pts = [].concat(...[].concat(names).map((n) => this.verts(n))).filter((v) => v.distanceTo(merkez) < yaricap);
    if (pts.length < 6) return null;
    const c = centroid(pts);
    // en uzak iki uç kümeden kaba ana eksen
    let uzak = pts[0];
    for (const p of pts) if (p.distanceToSquared(c) > uzak.distanceToSquared(c)) uzak = p;
    const e = uzak.clone().sub(c).normalize();
    const art = centroid(pts.filter((p) => p.clone().sub(c).dot(e) > 0));
    const eks = centroid(pts.filter((p) => p.clone().sub(c).dot(e) <= 0));
    return art.sub(eks).normalize();
  }

  /** USG kesit düzlemi içindeki bir yapının merkezi (görüntü alanında) */
  kesitci(P, { yariGenislik = 0.035, derinlik = 0.07 } = {}) {
    return (names, tol = 0.003, ekSuzgec = () => true) => {
      const vs = [].concat(...[].concat(names).map((n) => this.verts(n)));
      for (const t of [tol, tol * 2, tol * 4]) {
        const sel = vs.filter((v) => {
          const d = v.clone().sub(P.S);
          return Math.abs(d.dot(P.mz)) < t && Math.abs(d.dot(P.u)) < yariGenislik && d.dot(P.b) > 0 && d.dot(P.b) < derinlik && ekSuzgec(v, d);
        });
        if (sel.length >= 3) return centroid(sel);
      }
      return null;
    };
  }

  /** Kesit düzleminde, prob ortasından derine inen çizgi boyunca bir yapının yüzey derinlikleri (m) */
  derinlikler(P, name, { genislik = 0.004, tol = 0.004 } = {}) {
    const ds = this.verts(name).map((v) => v.clone().sub(P.S))
      .filter((d) => Math.abs(d.dot(P.mz)) < tol && Math.abs(d.dot(P.u)) < genislik && d.dot(P.b) > 0)
      .map((d) => d.dot(P.b));
    if (!ds.length) return null;
    return { ust: Math.min(...ds), alt: Math.max(...ds) };
  }

  /**
   * In-plane iğne: prob +u ucundan girer, kesit düzleminde hedefe ilerler.
   * Giriş, hedefe ~45° ile ulaşacak yerde; prob kenarından enAz..enCok metre uzakta.
   */
  igneYolu(P, T, { probYariBoy = 0.019, enAz = 0.005, enCok = 0.03, aci = 45, disUzaklik = 0.05 } = {}) {
    const Trel = T.clone().sub(P.S);
    const egim = 1 / Math.tan(THREE.MathUtils.degToRad(aci));
    const aGiris = THREE.MathUtils.clamp(Trel.dot(P.u) + Trel.dot(P.b) * egim, probYariBoy + enAz, probYariBoy + enCok);
    const E0 = P.S.clone().addScaledVector(P.u, aGiris);
    // deri, giriş noktasının disUzaklik kadar dışından aşağı ışınla bulunur (komşu uzuv varsa küçültün)
    const eh = this.deriVur(E0.clone().addScaledVector(P.n, disUzaklik), P.b);
    const E = eh ? eh.p : E0;
    const vek = T.clone().sub(E);
    return {
      E,
      derinlikCm: vek.length() * 100,
      aciDer: THREE.MathUtils.radToDeg(Math.asin(THREE.MathUtils.clamp(vek.clone().normalize().dot(P.b), -1, 1))),
      girisProbKenariCm: (aGiris - probYariBoy) * 100,
    };
  }

  /** Prob, kesit düzlemi, iğne, giriş halkası, hedef, LA ve yüzey işaretleri */
  nesneler(P, { E, T, la, isaretler = [], kesitDerinlik = 0.05, kesitGenislik = 0.038 }) {
    const { S, u, n, b, mz } = P;
    const objects = {};
    const basis = new THREE.Matrix4().makeBasis(u, n, mz);

    const prob = new THREE.Group();
    prob.applyMatrix4(basis);
    prob.position.copy(S);
    const gri = new THREE.MeshStandardMaterial({ color: 0xd9dde3, roughness: 0.4 });
    const koyu = new THREE.MeshStandardMaterial({ color: 0x2b2f36, roughness: 0.6 });
    const kafa = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.014, 0.012), gri);
    kafa.position.y = 0.007;
    const lens = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.0015, 0.0095), koyu);
    lens.position.y = 0.0008;
    const boyun = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.02, 0.011), gri);
    boyun.position.y = 0.024;
    const sap = new THREE.Mesh(new THREE.CylinderGeometry(0.0095, 0.011, 0.07, 24), gri);
    sap.position.y = 0.068;
    const isaret = new THREE.Mesh(new THREE.SphereGeometry(0.0022, 16, 10), new THREE.MeshBasicMaterial({ color: 0x35e07a }));
    isaret.position.set(0.0215, 0.011, 0);
    prob.add(kafa, lens, boyun, sap, isaret);
    objects.prob = prob;

    const kesitGeo = new THREE.PlaneGeometry(kesitGenislik, kesitDerinlik);
    const kesitMesh = new THREE.Mesh(kesitGeo, new THREE.MeshBasicMaterial({
      color: 0x9fd8ff, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false,
    }));
    const kesitGrup = new THREE.Group();
    kesitGrup.applyMatrix4(basis);
    kesitGrup.position.copy(S);
    kesitMesh.position.y = -kesitDerinlik / 2;
    const kenar = new THREE.LineSegments(new THREE.EdgesGeometry(kesitGeo), new THREE.LineBasicMaterial({ color: 0x9fd8ff, transparent: true, opacity: 0.7 }));
    kenar.position.y = -kesitDerinlik / 2;
    kesitGrup.add(kesitMesh, kenar);
    objects.kesit = kesitGrup;

    const dir = T.clone().sub(E).normalize();
    const bas = E.clone().sub(dir.clone().multiplyScalar(0.03));
    const L = T.distanceTo(bas);
    const igne = new THREE.Group();
    const saft = new THREE.Mesh(new THREE.CylinderGeometry(0.0007, 0.0007, L, 10), new THREE.MeshStandardMaterial({ color: 0xc8ccd2, metalness: 0.8, roughness: 0.25 }));
    saft.position.copy(bas.clone().add(T).multiplyScalar(0.5));
    saft.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    const gobek = new THREE.Mesh(new THREE.CylinderGeometry(0.0035, 0.0035, 0.018, 16), new THREE.MeshStandardMaterial({ color: 0x3fa7ff, roughness: 0.4 }));
    gobek.position.copy(bas.clone().sub(dir.clone().multiplyScalar(0.009)));
    gobek.quaternion.copy(saft.quaternion);
    igne.add(saft, gobek);
    // İğne ilerleme animasyonu için: yön ve deri girişinden hedefe uzaklık
    igne.userData.yon = dir.clone();
    igne.userData.ilerleme = T.distanceTo(E);
    objects.igne = igne;

    const giris = new THREE.Mesh(new THREE.TorusGeometry(0.004, 0.0009, 8, 32), new THREE.MeshBasicMaterial({ color: 0xff4fd8, depthTest: false, transparent: true }));
    giris.position.copy(E);
    giris.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
    giris.renderOrder = 18;
    objects.giris = giris;

    const hedef = new THREE.Mesh(new THREE.SphereGeometry(0.0026, 16, 12), new THREE.MeshBasicMaterial({ color: 0x3ff0ff, depthTest: false, transparent: true }));
    hedef.position.copy(T);
    hedef.renderOrder = 18;
    objects.hedef = hedef;

    // LA: elipsoit; eksenler [u, b, mz] boyunca yarıçaplar
    const laMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 20), new THREE.MeshStandardMaterial({
      color: 0x7fe3ff, transparent: true, opacity: 0.45, depthWrite: false, roughness: 0.2,
    }));
    const [e1, e2, e3] = la.eksenler || [u, b, mz];
    laMesh.applyMatrix4(new THREE.Matrix4().makeBasis(e1, e2, e3));
    laMesh.position.copy(la.merkez);
    laMesh.userData.tam = la.boyut.clone();
    laMesh.scale.copy(la.boyut);
    laMesh.renderOrder = 4;
    objects.la = laMesh;

    const isaretGrup = new THREE.Group();
    for (const [p, renk] of isaretler) {
      if (!p) continue;
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.004, 16, 12), new THREE.MeshBasicMaterial({ color: renk, depthTest: false, transparent: true }));
      s.position.copy(p);
      s.renderOrder = 18;
      isaretGrup.add(s);
    }
    objects.isaretler = isaretGrup;

    const grup = new THREE.Group();
    for (const o of Object.values(objects)) grup.add(o);
    return { grup, objects };
  }
}

/** Kamera: hedefe yon doğrultusundan mesafe kadar uzaktan bakış */
export function kamera(hedef, yon, mesafe) {
  const y = yon.clone().normalize();
  return { hedef: hedef.toArray(), konum: hedef.clone().addScaledVector(y, mesafe).toArray() };
}

/** Kameranın ekran düzleminde etiket ofseti: dx sağa, dy yukarı (metre), biraz da kameraya doğru */
export function ekranOfset(kam) {
  const ileri = V(kam.hedef).sub(V(kam.konum)).normalize();
  const sag = ileri.clone().cross(new THREE.Vector3(0, 1, 0)).normalize();
  const yukari = sag.clone().cross(ileri).normalize();
  return (p, dx, dy) => (p ? p.clone().addScaledVector(sag, dx).addScaledVector(yukari, dy).addScaledVector(ileri, -0.03) : null);
}

/** Adımların etiket gruplarını kuran işlev */
export function etiketKurucu(steps) {
  return (i, boy = 0.011) => {
    const g = new THREE.Group();
    for (const [metin, anchor, at, renk] of steps[i].etiket) {
      if (!anchor || !at) continue;
      g.add(makeLabel(metin, anchor, at, renk, boy * (steps[i].etiketOlcek ?? 1)));
    }
    return g;
  };
}

/**
 * Etiket listesi: [metin, bağlantı, renk, dx?, dy?]. dx/dy (metre, kameranın ekran düzleminde) verilmezse
 * etiketler bağlantı noktalarının ekrandaki merkezinin çevresine, açı sırası korunarak eşit aralıklı yelpaze
 * biçiminde dağıtılır (üst üste binmesin diye).
 */
export function etiketler(kam, liste, { uzaklik = 0.05, basAci = null, olcek = null, boy = 0.011, enBoy = 1.1, fov = 38 } = {}) {
  const ek = ekranOfset(kam);
  const ileri = V(kam.hedef).sub(V(kam.konum)).normalize();
  const sag = ileri.clone().cross(new THREE.Vector3(0, 1, 0)).normalize();
  const yukari = sag.clone().cross(ileri).normalize();
  const gecerli = liste.filter((e) => e[1]);
  const oto = gecerli.filter((e) => e[3] === undefined);
  const aci = new Map();
  if (oto.length) {
    const ekr = oto.map((e) => [e[1].dot(sag), e[1].dot(yukari)]);
    const cx = ekr.reduce((t, p) => t + p[0], 0) / ekr.length;
    const cy = ekr.reduce((t, p) => t + p[1], 0) / ekr.length;
    const ham = oto.map((e, i) => [e, Math.atan2(ekr[i][1] - cy, ekr[i][0] - cx)]).sort((x, y) => x[1] - y[1]);
    const adim = (2 * Math.PI) / ham.length;
    // eşit aralıklı açıların ham açılara en yakın olduğu başlangıç açısı
    let enIyi = 0, enAz = Infinity;
    for (let k = 0; k < 72; k++) {
      const t0 = basAci ?? (k / 72) * 2 * Math.PI;
      let top = 0;
      ham.forEach(([, a], i) => { const d = Math.atan2(Math.sin(a - (t0 + i * adim)), Math.cos(a - (t0 + i * adim))); top += d * d; });
      if (top < enAz) { enAz = top; enIyi = t0; }
      if (basAci !== null) break;
    }
    ham.forEach(([e], i) => aci.set(e, enIyi + i * adim));
  }
  return gecerli.map((e) => {
    const [metin, p, renk] = e;
    let [, , , dx, dy] = e;
    if (dx === undefined) {
      const t = aci.get(e);
      dx = Math.cos(t) * uzaklik * 1.3; // etiketler yatayda geniş: yatay aralığı biraz artır
      dy = Math.sin(t) * uzaklik;
    }
    let at = ek(p, dx, dy);
    // Masaüstü görünümünde etiket ekrandan taşmasın: kamera piramidinin içine çek
    const k0 = V(kam.konum);
    const r = at.clone().sub(k0);
    const z = r.dot(ileri);
    if (z > 0.01) {
      const yariY = z * Math.tan(THREE.MathUtils.degToRad(fov / 2));
      const yariX = yariY * enBoy;
      const satirlar = metin.split('\n');
      const harf = Math.max(...satirlar.map((l) => l.length));
      const h = boy * (0.6 + 0.4 * satirlar.length) * (olcek ?? 1);
      const w = h * (harf * 24 + 36) / (satirlar.length * 54 + 22);
      let x = r.dot(sag), y = r.dot(yukari);
      const sx = Math.max(0, yariX * 0.97 - w / 2), sy = Math.max(0, yariY * 0.95 - h / 2);
      const x2 = THREE.MathUtils.clamp(x, -sx, sx), y2 = THREE.MathUtils.clamp(y, -sy, sy);
      if (x2 !== x || y2 !== y) at = at.addScaledVector(sag, x2 - x).addScaledVector(yukari, y2 - y);
    }
    return [metin, p, at, renk];
  });
}
