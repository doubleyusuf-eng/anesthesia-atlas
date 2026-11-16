// Kameraya dönük metin etiketleri + işaret çizgisi. Ölçüler metre (model ölçeği 1).
import * as THREE from 'three';

const cache = new Map();

function textTexture(text, renk) {
  const key = text + '|' + renk;
  if (cache.has(key)) return cache.get(key);
  const font = 600;
  const px = 44;
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  ctx.font = `${font} ${px}px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
  const lines = text.split('\n');
  const w = Math.ceil(Math.max(...lines.map((l) => ctx.measureText(l).width))) + 36;
  const h = lines.length * (px + 10) + 22;
  c.width = w;
  c.height = h;
  ctx.font = `${font} ${px}px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
  ctx.fillStyle = 'rgba(16,20,26,0.82)';
  const r = 14;
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, r);
  ctx.fill();
  ctx.fillStyle = renk;
  ctx.fillRect(0, 0, 8, h);
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'top';
  lines.forEach((l, i) => ctx.fillText(l, 20, 12 + i * (px + 10)));
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const out = { tex, aspect: w / h, lines: lines.length };
  cache.set(key, out);
  return out;
}

/**
 * @param {string} text
 * @param {THREE.Vector3} anchor  yapının üzerindeki nokta
 * @param {THREE.Vector3} at      etiketin duracağı nokta
 * @param {string} renk           sol kenar rengi (css)
 */
export function makeLabel(text, anchor, at, renk = '#ffd84a', boy = 0.011) {
  const g = new THREE.Group();
  const { tex, aspect, lines } = textTexture(text, renk);
  const mat = new THREE.SpriteMaterial({ map: tex, depthTest: false, depthWrite: false, transparent: true });
  const s = new THREE.Sprite(mat);
  const h = boy * (0.6 + 0.4 * lines);
  s.scale.set(h * aspect, h, 1);
  s.position.copy(at);
  s.renderOrder = 20;
  g.add(s);
  const lg = new THREE.BufferGeometry().setFromPoints([anchor, at]);
  const line = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: renk, depthTest: false, transparent: true, opacity: 0.9 }));
  line.renderOrder = 19;
  g.add(line);
  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.0018, 12, 8),
    new THREE.MeshBasicMaterial({ color: renk, depthTest: false, transparent: true }),
  );
  dot.position.copy(anchor);
  dot.renderOrder = 19;
  g.add(dot);
  return g;
}
