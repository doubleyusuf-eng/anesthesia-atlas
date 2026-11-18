// Clarius L7 HD3 kablosuz lineer prob: 3B model.
// İleri Monitörizasyon Atlası'ndaki modelden (us-models.js) uyarlandı: gövde profili ve baş biçimi üreticinin ürün
// fotoğraflarından piksel ölçümüyle çıkarılmıştır (kalınlık profili yaklaşık). Ölçüler: 147 × 76 × 32 mm, 192 eleman,
// 38 mm görüş alanı, 4–13 MHz (Clarius HD3 teknik verisi).
//
// Dönen grup metre cinsindendir ve blok motorunun prob eksenlerine oturur:
//   +x = u (prob işareti tarafı), +y = n (deriden dışarı, sap yönü), +z = mz; lens yüzü y = 0'dadır.
import * as THREE from 'three';

export const L7 = { ad: 'Clarius L7 HD3', genislikMm: 38, frekans: [4, 13], derinlikEnCokCm: 11, eleman: 192, boyMm: 147 };

const std = (c, r = 0.5, m = 0, ek) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: m }, ek || {}));
const MAT = {
  kapak: () => std(0xe7e9ea, 0.34, 0.02), govde: () => std(0x111316, 0.5, 0.05),
  bas: () => std(0xeef0f1, 0.3, 0.02), lens: () => std(0x121416, 0.55, 0),
};

// Gövde profili (fotoğraf ölçümü): [üstten mm, genişlik, kalınlık, süperelips üssü]
const CAP = [[0, 56, 23, 4.6], [0.7, 62, 26.4, 4.6], [1.6, 66, 28.4, 4.6], [3, 68.8, 29.6, 4.4], [5, 70.4, 30.1, 4.2], [8, 71.3, 30.3, 4], [16, 71.6, 30.4, 3.8], [24, 71.1, 30.5, 3.6], [29.5, 70.6, 30.6, 3.5]];
const BODY = [[29.5, 70.6, 30.6, 3.5], [36, 69.7, 30.8, 3.4], [44, 67.3, 30.6, 3.4], [52, 63.5, 30.1, 3.3], [60, 59.9, 29.5, 3.3], [68, 57.3, 29.1, 3.2], [76, 55.4, 28.9, 3.2], [84, 54.9, 29.1, 3.2], [92, 56.6, 29.7, 3.3], [100, 61.4, 30.6, 3.4], [108, 69.9, 31.5, 3.5], [114, 74.4, 32, 3.6], [118, 75.6, 32, 3.6], [122, 75.3, 31.8, 3.7], [125, 73.6, 31.1, 3.9], [126.5, 72.6, 30.6, 4]];
const BODY_END = 126.5;
// L7 başı: w [baş üstünden mm, genişlik], d kalınlık profili, lens: alt siyah yüz yüksekliği
const HEAD = {
  w: [[0, 72.6], [2, 70], [4, 66.4], [6, 60.8], [8, 54.4], [9.5, 51.8], [11.3, 50.8], [13.2, 49], [15, 48], [17, 46.8], [18.3, 46.4]],
  d: [[0, 30.6], [3, 29.6], [7, 26.5], [11, 23.5], [22, 21]],
};
const L = 147;
const lerpTab = (tab, x) => {
  if (x <= tab[0][0]) return tab[0][1];
  for (let i = 1; i < tab.length; i++) if (x <= tab[i][0]) { const [a, va] = tab[i - 1], [b, vb] = tab[i]; return va + (vb - va) * (x - a) / (b - a); }
  return tab[tab.length - 1][1];
};

/** Süperelips kesitlerden gövde: secs [{y, w, d, n}] aşağıdan yukarı */
function loft(secs, mat, seg = 64) {
  const pos = [], idx = [];
  for (const s of secs) {
    const ex = 2 / (s.n || 4);
    for (let k = 0; k < seg; k++) {
      const a = (k / seg) * Math.PI * 2, c = Math.cos(a), sn = Math.sin(a);
      pos.push(Math.sign(c) * Math.pow(Math.abs(c), ex) * s.w / 2, s.y, Math.sign(sn) * Math.pow(Math.abs(sn), ex) * s.d / 2);
    }
  }
  for (let i = 0; i < secs.length - 1; i++) for (let k = 0; k < seg; k++) {
    const a = i * seg + k, b = i * seg + (k + 1) % seg, c = a + seg, d = b + seg;
    idx.push(a, d, b, a, c, d);
  }
  const kapa = (i) => { const s = secs[i], ci = pos.length / 3; pos.push(0, s.y, 0); for (let k = 0; k < seg; k++) idx.push(ci, i * seg + k, i * seg + (k + 1) % seg); };
  kapa(0); kapa(secs.length - 1);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  mat.side = THREE.DoubleSide;
  return new THREE.Mesh(g, mat);
}

function tuvalDoku(w, h, ciz) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  ciz(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Yüzeye oturan baskı (logo, panel, yazı): x–y düzleminde ızgara, z = ön yüzey + ε */
function oturt(w, h, cx, yTop, onZ, ciz, ppm = 14, eps = 0.12) {
  const tex = tuvalDoku(Math.round(w * ppm), Math.round(h * ppm), ciz);
  const g = new THREE.PlaneGeometry(w, h, Math.max(2, Math.round(w / 1.5)), Math.max(2, Math.round(h / 1.5)));
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i) + cx, y = p.getY(i) + yTop - h / 2; p.setXYZ(i, x, y, onZ(x, y) + eps); }
  g.computeVertexNormals();
  return new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: tex, transparent: true, alphaTest: 0.25, roughness: 0.55, polygonOffset: true, polygonOffsetFactor: -2 }));
}

/** Prob (mm; ayakta: lens yüzü y = 0, gövde +y, ön yüz +z, işaret üçgeni −x yanında) */
function probMm() {
  const g = new THREE.Group();
  const yUp = (yt) => L - yt;
  const kes = (r) => ({ y: yUp(r[0]), w: r[1], d: r[2], n: r[3] });
  const sap = (m) => { m.userData.sap = true; return m; }; // sap parçaları: masaüstünde yarı saydam çizilir
  g.add(sap(loft(BODY.slice().reverse().map(kes), MAT.govde())));
  g.add(sap(loft(CAP.slice().reverse().map(kes), MAT.kapak())));
  const hTop = yUp(BODY_END), yh = (v) => hTop - v;
  const lastV = HEAD.w[HEAD.w.length - 1][0];
  const basKes = HEAD.w.map(([v, w]) => ({ y: yh(v), w, d: lerpTab(HEAD.d, v), n: v < 3 ? 4 : 5 }));
  g.add(loft(basKes.slice().reverse(), MAT.bas()));
  // Alt siyah akustik yüz (lens)
  const w0 = HEAD.w[HEAD.w.length - 1][1], d0 = lerpTab(HEAD.d, lastV), lw = w0 - 1.6, ld = d0 - 2.4;
  g.add(loft([{ y: 0, w: lw - 2, d: ld - 2, n: 6 }, { y: 0.5, w: lw - 0.5, d: ld - 0.5, n: 6 }, { y: yh(lastV) + 0.3, w: lw, d: ld, n: 6 }], MAT.lens()));
  const markY = yh(lastV) + 2.2;
  // Ön yüzey: (x, y) → z
  const hepsi = BODY.concat(CAP).map(kes).concat(basKes).sort((a, b) => a.y - b.y);
  const kesitte = (y) => {
    if (y <= hepsi[0].y) return hepsi[0];
    for (let i = 1; i < hepsi.length; i++) if (y <= hepsi[i].y) {
      const a = hepsi[i - 1], b = hepsi[i], t = (y - a.y) / ((b.y - a.y) || 1);
      return { w: a.w + (b.w - a.w) * t, d: a.d + (b.d - a.d) * t, n: a.n + (b.n - a.n) * t };
    }
    return hepsi[hepsi.length - 1];
  };
  const onZ = (x, y) => { const s = kesitte(y), u = Math.min(0.999, Math.abs(x / (s.w / 2))); return s.d / 2 * Math.pow(1 - Math.pow(u, s.n), 1 / s.n); };
  const yanX = (y, z) => { const s = kesitte(y); return -s.w / 2 * Math.pow(1 - Math.pow(Math.min(0.99, 2 * Math.abs(z) / s.d), s.n), 1 / s.n); };
  // Logo (sadeleştirilmiş, iç içe yaylar)
  g.add(sap(oturt(16, 16, 0, yUp(7.5), onZ, (c, W, H) => {
    c.clearRect(0, 0, W, H); c.strokeStyle = '#8C9399'; c.lineCap = 'round';
    const cx = W * 0.52, cy = H / 2, k = W / 16;
    for (const [r, a0, a1] of [[6.3, 0.62, 5.66], [4.3, 0.7, 5.58]]) { c.lineWidth = 1.15 * k; c.beginPath(); c.arc(cx, cy, r * k, a0, a1); c.stroke(); }
    c.lineWidth = 1.1 * k; c.beginPath(); c.arc(cx + 0.6 * k, cy, 2.2 * k, Math.PI * 0.75, Math.PI * 1.25, false); c.stroke();
    c.beginPath(); c.moveTo(cx - 0.2 * k, cy); c.lineTo(cx + 2.4 * k, cy); c.stroke();
  })));
  // Ön panel (gömme, damla biçimi) ve iki tuş
  const PT = 66, PH = 52, PW = 28;
  g.add(sap(oturt(PW, PH, 0, yUp(PT), onZ, (c, W, H) => {
    const k = W / PW, hw = (v) => 10 + 3.6 * Math.pow(v / PH, 0.85);
    c.clearRect(0, 0, W, H);
    c.beginPath(); c.moveTo(W / 2 - 10 * k, 10 * k); c.arc(W / 2, 10 * k, 10 * k, Math.PI, 0);
    for (let v = 10; v <= PH - 6; v += 1) c.lineTo(W / 2 + hw(v) * k, v * k);
    c.quadraticCurveTo(W / 2 + hw(PH) * k, PH * k - 1, W / 2 + (hw(PH) - 6) * k, PH * k - 1); c.lineTo(W / 2 - (hw(PH) - 6) * k, PH * k - 1);
    c.quadraticCurveTo(W / 2 - hw(PH) * k, PH * k - 1, W / 2 - hw(PH - 6) * k, (PH - 6) * k);
    for (let v = PH - 6; v >= 10; v -= 1) c.lineTo(W / 2 - hw(v) * k, v * k);
    c.closePath();
    c.fillStyle = '#30353A'; c.fill(); c.lineWidth = 0.7 * k; c.strokeStyle = '#121416'; c.stroke();
    c.strokeStyle = '#9EA6AD'; c.lineWidth = 0.32 * k;
    const bx = W / 2 - 4.7 * k, bw = 9.4 * k;
    c.beginPath(); c.moveTo(bx, 15.6 * k); c.lineTo(bx, 10.4 * k); c.arc(W / 2, 10.4 * k, 4.7 * k, Math.PI, 0); c.lineTo(bx + bw, 15.6 * k); c.closePath(); c.stroke();
    c.beginPath(); c.moveTo(bx + 1.8 * k, 18.4 * k); c.lineTo(bx + bw, 18.4 * k); c.lineTo(bx + bw, 28.7 * k); c.lineTo(bx + 1.8 * k, 28.7 * k); c.quadraticCurveTo(bx, 28.7 * k, bx, 26.9 * k); c.lineTo(bx, 20.2 * k); c.quadraticCurveTo(bx, 18.4 * k, bx + 1.8 * k, 18.4 * k); c.stroke();
    c.lineWidth = 0.45 * k; c.beginPath(); c.arc(W / 2, 23.9 * k, 2.6 * k, -Math.PI * 0.3, Math.PI * 1.3); c.stroke(); c.beginPath(); c.moveTo(W / 2, 20.5 * k); c.lineTo(W / 2, 23.6 * k); c.stroke();
  }, 16, 0.2)));
  // Mavi durum ışığı (sol yan yüz, kapağın hemen altı)
  {
    const y = yUp(41), z = 6, x = yanX(y, z);
    const led = new THREE.Mesh(new THREE.BoxGeometry(1.6, 5.6, 2), new THREE.MeshBasicMaterial({ color: 0x4ba6ff }));
    led.position.set(x + 0.35, y, z);
    g.add(sap(led));
  }
  // Baş yazısı ve orta işaret (▾)
  g.add(oturt(14, 5, 0, hTop - 2.2, onZ, (c, W, H) => {
    c.clearRect(0, 0, W, H); c.fillStyle = '#1C1F22'; c.font = `700 ${Math.round(H * 0.78)}px Archivo, Arial, sans-serif`;
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('L7', W / 2, H / 2);
  }, 30));
  g.add(oturt(3, 2.4, 0, markY + 2.4, onZ, (c, W, H) => {
    c.clearRect(0, 0, W, H); c.fillStyle = '#1C1F22'; c.beginPath(); c.moveTo(W * 0.2, H * 0.2); c.lineTo(W * 0.8, H * 0.2); c.lineTo(W * 0.5, H * 0.85); c.fill();
  }, 30));
  // Yan yüzdeki yön üçgeni (prob işareti): atlasta ekrandaki yeşil noktayla eşleşsin diye yeşil
  {
    const y = markY + 1, x = yanX(y, 0), tri = new THREE.Shape();
    tri.moveTo(0, 2.2); tri.lineTo(0, -2.2); tri.lineTo(-3.4, 0); tri.closePath();
    const t = new THREE.Mesh(new THREE.ShapeGeometry(tri), new THREE.MeshBasicMaterial({ color: 0x35e07a, side: THREE.DoubleSide }));
    t.rotation.y = Math.PI / 2;
    t.position.set(x - 0.08, y, 0);
    g.add(t);
  }
  // Üst uç: şarj temas noktaları
  for (const x of [-9, 0, 9]) {
    const pin = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.7, 2.2), std(0xc8a24a, 0.3, 0.85));
    pin.position.set(x, L + 0.3, 0);
    g.add(sap(pin));
  }
  return g;
}

/** Atlasın prob eksenlerine oturan L7 (metre). İşaret üçgeni +x (u) yanında. */
export function clariusL7() {
  const ic = probMm();
  ic.scale.setScalar(0.001);
  ic.rotation.y = Math.PI; // modelde işaret −x yanında; atlasta +x = u = işaret tarafı
  const dis = new THREE.Group();
  dis.add(ic);
  dis.name = 'Clarius L7';
  dis.userData.prob = true;
  return dis;
}
