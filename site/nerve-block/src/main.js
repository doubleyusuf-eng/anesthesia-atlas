// Uygulama: sahne, masaüstü arayüzü, eğitim adımları. AR kısmı xr.js'de.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { loadAnatomy, LAYERS, TOGGLES, setLayerOpacity, setHighlight } from './anatomy.js';
import { BLOKLAR } from './bloklar/index.js';
import { setupXR } from './xr.js';
import { SanalUSG } from './usg.js';

const $ = (id) => document.getElementById(id);
const host = $('sahne');

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.xr.enabled = true;
host.appendChild(renderer.domElement);

const scene = new THREE.Scene();
// Arka plan saydam: sahnenin rengi CSS'teki temaya göre (#sahne degrade); AR'da da saydam kalır
const ARKA = null;
scene.background = ARKA;
const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 30);
camera.position.set(0, 0, 0.8);
scene.add(new THREE.HemisphereLight(0xffffff, 0x3a4250, 1.5));
const d1 = new THREE.DirectionalLight(0xffffff, 1.7);
d1.position.set(0.6, 1, 1.2);
const d2 = new THREE.DirectionalLight(0xffffff, 0.5);
d2.position.set(-1, 0.2, -0.6);
scene.add(d1, d2);

// rig: AR'da elle taşınan grup → model: ölçek/yatırma → merkez: bölgeyi orijine alır
const rig = new THREE.Group();
const model = new THREE.Group();
const merkez = new THREE.Group();
rig.add(model);
model.add(merkez);
scene.add(rig);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 0.08;
controls.maxDistance = 3;

const app = {
  renderer, scene, camera, rig, model, merkez,
  anat: null, blok: null, blokTanim: null, adim: 0, etiketler: true, etiketBoy: 0.011, etiketGrup: null,
  secili: null, degisti: [], ARKA,
  bolgeMerkez: new THREE.Vector3(), bolgeKutu: new THREE.Box3(),
};
window.__app = app;
app.usg = new SanalUSG(app);

function yayinla() { for (const f of app.degisti) f(); }

// ---- Adımlar ----
function adimUygula(i, kamera = true) {
  const { anat, blok } = app;
  app.adim = i;
  const st = blok.steps[i];
  for (const layer of Object.keys(LAYERS)) setLayerOpacity(anat, layer, st.katman[layer] ?? 0);
  odakUygula();
  app.secili = null;
  setHighlight(anat, st.vurgu);
  for (const [k, o] of Object.entries(blok.objects)) o.visible = st.goster.includes(k);
  // Yakın adımlarda prob yarı saydam olabilir (sapı derindeki yapıları kapatmasın)
  const probOp = st.probSaydam ? 0.3 : 1;
  blok.objects.prob.traverse((m) => {
    if (!m.material) return;
    if (m.material.transparent !== probOp < 1) m.material.needsUpdate = true;
    m.material.transparent = probOp < 1;
    m.material.opacity = probOp;
    m.material.depthWrite = probOp >= 1;
  });
  if (app.etiketGrup) merkez.remove(app.etiketGrup);
  app.etiketGrup = blok.etiketleriKur(i, app.etiketBoy);
  app.etiketGrup.visible = app.etiketler;
  merkez.add(app.etiketGrup);
  if (kamera && !renderer.xr.isPresenting) kameraUc(st.kamera);
  app.igneBas = performance.now();
  app.usg.gorunurluk();
  arayuz();
  yayinla();
}
app.adimUygula = adimUygula;
app.sonraki = () => adimUygula(Math.min(app.adim + 1, app.blok.steps.length - 1));
app.onceki = () => adimUygula(Math.max(app.adim - 1, 0));

// Adımın odak listesi dışındaki damar/sinir/kaslar soluk
function odakUygula() {
  const st = app.blok.steps[app.adim];
  if (!st.odak) return;
  const set = new Set(st.odak);
  for (const l of ['arter', 'ven', 'sinir', 'kas']) {
    for (const m of app.anat.byLayer[l] || []) {
      if (!m.visible || set.has(m.name)) continue;
      m.material.opacity = Math.min(m.material.opacity, 0.16);
      if (!m.material.transparent) m.material.needsUpdate = true;
      m.material.transparent = true;
      m.material.depthWrite = false;
    }
  }
}

// Bu blokta bulunan katman grupları
function mevcutGruplar() {
  return TOGGLES.filter(([, , layers]) => layers.some((l) => (app.anat.byLayer[l] || []).length))
    .map(([key, ad, layers]) => [key, app.blokTanim.katmanAdlari?.[key] || ad, layers]);
}
app.mevcutGruplar = mevcutGruplar;

function grupAcik(key) {
  const layers = TOGGLES.find((t) => t[0] === key)[2];
  return layers.some((l) => (app.anat.byLayer[l] || []).some((m) => m.visible));
}
function grupAyarla(key, acik) {
  const st = app.blok.steps[app.adim];
  const layers = TOGGLES.find((t) => t[0] === key)[2];
  for (const l of layers) setLayerOpacity(app.anat, l, acik ? (st.katman[l] || 1) : 0);
  odakUygula();
  arayuz();
  yayinla();
}
app.grupAcik = grupAcik;
app.grupDegistir = (key) => grupAyarla(key, !grupAcik(key));
app.etiketDegistir = () => {
  app.etiketler = !app.etiketler;
  if (app.etiketGrup) app.etiketGrup.visible = app.etiketler;
  arayuz();
  yayinla();
};

// ---- Kamera geçişi (masaüstü) ----
let tween = null;
function kameraUc(k) {
  const hedef = new THREE.Vector3(...k.hedef).add(merkez.position);
  const konum = new THREE.Vector3(...k.konum).add(merkez.position);
  tween = { t: 0, p0: camera.position.clone(), q0: controls.target.clone(), p1: konum, q1: hedef };
}
function tweenAdim(dt) {
  if (!tween) return;
  tween.t = Math.min(1, tween.t + dt / 0.9);
  const e = tween.t < 0.5 ? 2 * tween.t * tween.t : 1 - Math.pow(-2 * tween.t + 2, 2) / 2;
  camera.position.lerpVectors(tween.p0, tween.p1, e);
  controls.target.lerpVectors(tween.q0, tween.q1, e);
  if (tween.t >= 1) tween = null;
}

// ---- Arayüz ----
function arayuz() {
  const { blok, adim } = app;
  if (!blok) return;
  const st = blok.steps[adim];
  $('adim-no').textContent = `Adım ${adim + 1} / ${blok.steps.length}`;
  $('adim-baslik').textContent = st.baslik;
  $('adim-metin').textContent = st.metin;
  $('onceki').disabled = adim === 0;
  $('sonraki').disabled = adim === blok.steps.length - 1;
  const noktalar = $('noktalar');
  noktalar.innerHTML = '';
  blok.steps.forEach((s, i) => {
    const b = document.createElement('button');
    b.className = 'nokta' + (i === adim ? ' aktif' : '');
    b.title = `${i + 1}. ${s.baslik}`;
    b.onclick = () => adimUygula(i);
    noktalar.appendChild(b);
  });
  for (const [key] of mevcutGruplar()) $('k-' + key).checked = grupAcik(key);
  $('k-etiket').checked = app.etiketler;
}

function katmanKutulari() {
  const box = $('katmanlar');
  box.innerHTML = '';
  for (const [key, ad, layers] of mevcutGruplar()) {
    const renk = '#' + LAYERS[layers[0]].renk.toString(16).padStart(6, '0');
    const l = document.createElement('label');
    l.innerHTML = `<input type="checkbox" id="k-${key}"><span class="renk" style="background:${renk}"></span>${ad}`;
    l.querySelector('input').onchange = (e) => grupAyarla(key, e.target.checked);
    box.appendChild(l);
  }
  const l = document.createElement('label');
  l.innerHTML = '<input type="checkbox" id="k-etiket"><span class="renk" style="background:#ffd84a"></span>Etiketler';
  l.querySelector('input').onchange = () => app.etiketDegistir();
  box.appendChild(l);
}

// ---- Tıklayınca yapı bilgisi ----
const ray = new THREE.Raycaster();
const fare = new THREE.Vector2();
let basla = null;
renderer.domElement.addEventListener('pointerdown', (e) => { basla = [e.clientX, e.clientY]; });
renderer.domElement.addEventListener('pointerup', (e) => {
  if (!basla || Math.hypot(e.clientX - basla[0], e.clientY - basla[1]) > 5) return;
  const r = renderer.domElement.getBoundingClientRect();
  fare.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(fare, camera);
  const hit = ray.intersectObject(app.anat.root, true).find((h) => h.object.visible);
  yapiSec(hit ? hit.object : null);
});
function yapiSec(m) {
  const st = app.blok.steps[app.adim];
  app.secili = m;
  setHighlight(app.anat, m ? [...st.vurgu, m.name] : st.vurgu);
  const kart = $('secili');
  if (!m) { kart.hidden = true; return; }
  kart.hidden = false;
  $('secili-ad').textContent = m.userData.ad;
  $('secili-metin').textContent = m.userData.aciklama || '';
  $('secili-kaynak').textContent = m.userData.source === 'türetilmiş'
    ? 'Türetilmiş yapı: kaynak veride ayrı model yok.'
    : 'Kaynak: Z-Anatomy (BodyParts3D tabanlı)';
  yayinla();
}

// ---- Boyut ----
function boyutla() {
  const w = host.clientWidth;
  const h = host.clientHeight;
  if (!w || !h || renderer.xr.isPresenting) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  // Adım kameraları ve etiketler ≈ 1,25 en/boy için kuruldu. Dar (dikey) ekranda yatay görüşü koru:
  // dikey görüş açısını büyüt ki aynı genişlik ve kenardaki etiketler sığsın (telefon).
  const TASARIM = 1.25;
  camera.fov = camera.aspect >= TASARIM ? 38
    : THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(19)) * TASARIM / camera.aspect));
  camera.updateProjectionMatrix();
  // Geniş açıda her şey küçülür: etiketleri biraz büyüt (çok değil, üst üste binmesinler)
  const boy = 0.011 * (camera.aspect >= TASARIM ? 1 : Math.min(1.35, TASARIM / camera.aspect));
  if (Math.abs(boy - app.etiketBoy) > 1e-5) {
    app.etiketBoy = boy;
    if (app.blok && app.etiketGrup) {
      merkez.remove(app.etiketGrup);
      app.etiketGrup = app.blok.etiketleriKur(app.adim, app.etiketBoy);
      app.etiketGrup.visible = app.etiketler;
      merkez.add(app.etiketGrup);
    }
  }
}
new ResizeObserver(boyutla).observe(host);
app.boyutla = boyutla;

// ---- Döngü ----
const saat = new THREE.Clock();
let xr = null;
renderer.setAnimationLoop((t, frame) => {
  const dt = Math.min(saat.getDelta(), 0.1);
  if (!renderer.xr.isPresenting) {
    tweenAdim(dt);
    controls.update();
  }
  const o = app.blok?.objects;
  if (o) {
    if (o.hedef.visible) o.hedef.scale.setScalar(1 + 0.35 * Math.sin(t / 220));
    if (o.la.visible) {
      const faz = ((t / 1000) % 5) / 3.5;
      const s = Math.max(0.06, Math.min(1, faz));
      const k = s * s * (3 - 2 * s);
      o.la.scale.copy(o.la.userData.tam).multiplyScalar(window.__laSabit ? 1 : Math.max(0.06, k));
    }
  }
  // İğne adımında iğne deriden hedefe ilerler (3 s), bekler (2,5 s), yeniden başlar
  if (o?.igne?.visible && o.igne.userData.yon) {
    const st = app.blok.steps[app.adim];
    const L = o.igne.userData.ilerleme;
    let k = 1;
    if (!window.__laSabit && !st.goster.includes('la')) {
      const f = ((performance.now() - (app.igneBas || 0)) / 1000) % 5.5;
      k = f < 3 ? f / 3 : 1;
      k = k * k * (3 - 2 * k);
    }
    o.igne.position.copy(o.igne.userData.yon).multiplyScalar(-(1 - k) * L);
  }
  app.usg.guncelle(t);
  xr?.guncelle(frame);
  renderer.render(scene, camera);
});

// ---- Yükleme ve blok değiştirme ----
const modeller = new Map(); // bölge → Promise<{anat, isaretler}>
const kurulu = new Map(); // blok id → blok
function modelYukle(bolge) {
  if (!modeller.has(bolge)) {
    modeller.set(bolge, Promise.all([
      loadAnatomy(`models/${bolge}.glb`),
      fetch(`models/${bolge}-isaretler.json`).then((r) => r.json()),
    ]).then(([anat, isaretler]) => ({ anat, isaretler: isaretler.isaretler })));
  }
  return modeller.get(bolge);
}

let yukleniyor = null;
async function blokYukle(id, ilkAdim = 0) {
  const tanim = BLOKLAR.find((b) => b.id === id) || BLOKLAR[0];
  yukleniyor = tanim.id;
  $('durum').textContent = 'Model yükleniyor…';
  const { anat, isaretler } = await modelYukle(tanim.bolge);
  if (yukleniyor !== tanim.id) return;
  if (!kurulu.has(tanim.id)) kurulu.set(tanim.id, tanim.kur(anat, isaretler));
  const blok = kurulu.get(tanim.id);
  if (app.anat) merkez.remove(app.anat.root);
  if (app.blok) merkez.remove(app.blok.grup);
  if (app.etiketGrup) { merkez.remove(app.etiketGrup); app.etiketGrup = null; }
  app.anat = anat;
  app.blok = blok;
  app.blokTanim = tanim;
  merkez.add(anat.root, blok.grup);
  for (const o of Object.values(blok.objects)) o.visible = false;
  app.bolgeKutu.setFromObject(anat.root);
  app.bolgeKutu.getCenter(app.bolgeMerkez);
  katmanKutulari();
  $('blok-ad').textContent = tanim.ad;
  $('blok-sec').value = tanim.id;
  document.title = `${tanim.ad} — AR Anatomi`;
  $('olcum').textContent = `Modelde ölçülen: ${blok.olcum.metin}.`;
  const q = new URLSearchParams(location.search);
  q.set('blok', tanim.id);
  q.delete('adim');
  history.replaceState(null, '', '?' + q.toString());
  const ilk = Math.max(0, Math.min(blok.steps.length - 1, ilkAdim));
  if (!renderer.xr.isPresenting) {
    const k = blok.steps[ilk].kamera;
    camera.position.set(...k.konum).add(merkez.position);
    controls.target.set(...k.hedef).add(merkez.position);
    tween = null;
  }
  app.bolgeDegisti?.();
  app.adim = ilk;
  app.usg.blokDegisti();
  gorselleriGoster(tanim);
  adimUygula(ilk, false);
  $('durum').textContent = '';
  $('secili').hidden = true;
}
app.blokYukle = blokYukle;
app.BLOKLAR = BLOKLAR;
app.blokKaydir = (d) => {
  const i = BLOKLAR.findIndex((b) => b.id === app.blokTanim.id);
  return blokYukle(BLOKLAR[(i + d + BLOKLAR.length) % BLOKLAR.length].id);
};

// ---- Anesthesia Briefs uygulamasındaki çizimler (yapay zekâ ile oluşturulmuş eğitim görselleri) ----
const GORSEL_NOT = 'Anesthesia Briefs uygulamasından; yapay zekâ ile oluşturulmuş açıklayıcı eğitim çizimleridir (İngilizce etiketli). '
  + 'Gerçek hasta veya gerçek ultrason görüntüsü değildir; anatomik yönelim içindir.';
const GORSEL_EK = {
  fasyailiaka: 'Not: uygulamadaki çizim infrainguinal yaklaşımı gösterir; bu atlastaki blok suprainguinaldir.',
};
let gorselSira = 0;
function gorselleriGoster(tanim) {
  const bolum = $('gorseller');
  const liste = bolum.querySelector('.gorsel-liste');
  const sira = ++gorselSira; // blok değişirse eski yüklemeler bu bölüme dokunmasın
  liste.innerHTML = '';
  bolum.hidden = true;
  $('gorsel-not').textContent = GORSEL_NOT + (GORSEL_EK[tanim.id] ? ' ' + GORSEL_EK[tanim.id] : '');
  const turler = [['sono', 'Sono-anatomi'], ['anatomi', 'Anatomi']];
  for (const [dosya, ad] of turler) {
    const src = `gorseller/${tanim.id}/${dosya}.webp`;
    const b = document.createElement('button');
    b.className = 'gorsel';
    b.hidden = true;
    b.innerHTML = `<img alt="${tanim.kisa || tanim.ad}: ${ad} çizimi" decoding="async"><span>${ad}</span>`;
    b.onclick = () => buyukAc(src, `${tanim.ad} · ${ad} (Anesthesia Briefs çizimi; yapay zekâ ile oluşturulmuştur, gerçek görüntü değildir)`);
    liste.appendChild(b);
    // Ayrı ön yükleme: gizli (display:none) bölümdeki <img> en düşük öncelikte kalır ve
    // sürekli çizim döngüsü varken yavaş bağlantıda hiç inmeyebilir (canlı sitede görüldü).
    const on = new Image();
    on.onload = () => {
      if (sira !== gorselSira) return;
      b.querySelector('img').src = src;
      b.hidden = false;
      bolum.hidden = false;
    };
    on.onerror = () => { if (sira === gorselSira) b.remove(); };
    on.src = src;
  }
}
function buyukAc(src, yazi) {
  const k = $('buyuk');
  k.querySelector('img').src = src;
  k.querySelector('figcaption').textContent = yazi;
  k.hidden = false;
  k.querySelector('.buyuk-kapat').focus();
}
$('buyuk').addEventListener('click', (e) => { if (e.target.closest('img')) return; $('buyuk').hidden = true; });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('buyuk').hidden = true; });

function blokSecici() {
  const sec = $('blok-sec');
  const gruplar = new Map();
  for (const b of BLOKLAR) {
    if (!gruplar.has(b.grup)) {
      const og = document.createElement('optgroup');
      og.label = b.grup;
      gruplar.set(b.grup, og);
      sec.appendChild(og);
    }
    const o = document.createElement('option');
    o.value = b.id;
    o.textContent = b.ad;
    gruplar.get(b.grup).appendChild(o);
  }
  sec.onchange = () => blokYukle(sec.value);
}

async function basla2() {
  const q = new URLSearchParams(location.search);
  // Geliştirme: listede olmayan blokları dene  (?dene=esp,pecs&blok=esp)
  for (const id of (q.get('dene') || '').split(',').filter(Boolean)) {
    if (BLOKLAR.some((b) => b.id === id)) continue;
    BLOKLAR.push((await import(`./bloklar/${id}.js`)).default);
  }
  blokSecici();
  await blokYukle(q.get('blok') || BLOKLAR[0].id, (parseInt(q.get('adim'), 10) || 1) - 1);
  $('onceki').onclick = app.onceki;
  $('sonraki').onclick = app.sonraki;
  xr = await setupXR(app, $('ar-dugme'), $('ar-durum'));
  document.body.dataset.hazir = '1';
}
basla2().catch((e) => {
  console.error(e);
  $('durum').textContent = 'Yükleme hatası: ' + e.message;
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') app.sonraki();
  if (e.key === 'ArrowLeft') app.onceki();
});
