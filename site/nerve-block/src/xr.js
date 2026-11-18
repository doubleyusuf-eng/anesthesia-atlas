// Quest 3 karma gerçeklik (WebXR immersive-ar): yerleştirme, tutup taşıma, iki elle büyütme, 3D menü paneli.
import * as THREE from 'three';

// "Masaya yatır" pozisyonları: modelin Euler dönüşü (x, y, z). Model koordinatı: +x hastanın solu, +y kraniyal, +z anterior.
export const YATIS = {
  sirtustu: [-Math.PI / 2, 0, 0], // ön yüz yukarı
  yuzustu: [Math.PI / 2, 0, 0], // arka yüz yukarı
  solYan: [0, 0, -Math.PI / 2], // hasta sol yanına yatar: sağ yan yukarı, baş +x'e
  kolAcik: [0, 0, Math.PI / 2], // yalnız kol modeli: kolun iç (medial) yüzü yukarı (abdüksiyondaki kol gibi)
};

const PW = 1024;
const PH = 1080;

class Panel3D {
  constructor(app, eylem) {
    this.app = app;
    this.eylem = eylem;
    this.canvas = document.createElement('canvas');
    this.canvas.width = PW;
    this.canvas.height = PH;
    this.ctx = this.canvas.getContext('2d');
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    const w = 0.34;
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w, (w * PH) / PW),
      new THREE.MeshBasicMaterial({ map: this.tex, transparent: true, depthWrite: false }),
    );
    this.mesh.renderOrder = 25;
    this.dugmeler = [];
    this.uzerinde = null;
  }

  dugmeleriKur() {
    const app = this.app;
    const d = [];
    const satir = (y, h, ogeler) => {
      const bos = 16;
      const gw = (PW - 72 - bos * (ogeler.length - 1)) / ogeler.length;
      ogeler.forEach((o, i) => d.push({ ...o, x: 36 + i * (gw + bos), y, w: gw, h }));
    };
    satir(570, 92, [
      { id: 'onceki', metin: '◀  Önceki', pasif: app.adim === 0 },
      { id: 'sonraki', metin: 'Sonraki  ▶', pasif: app.adim === app.blok.steps.length - 1 },
    ]);
    const tg = app.mevcutGruplar().map(([key, ad]) => ({ id: 'k:' + key, metin: ad, acik: app.grupAcik(key) }));
    const yarim = Math.ceil(tg.length / 2);
    satir(682, 80, tg.slice(0, yarim));
    if (tg.length > yarim) satir(774, 80, tg.slice(yarim));
    satir(870, 80, [
      { id: 'etiket', metin: 'Etiketler', acik: app.etiketler },
      { id: 'yatir', metin: app.model.rotation.x !== 0 ? 'Ayağa kaldır' : 'Masaya yatır' },
      { id: 'buyut', metin: 'Büyüt +' },
      { id: 'kucult', metin: 'Küçült −' },
    ]);
    satir(966, 80, [
      { id: 'blok-', metin: '◀ Blok' },
      { id: 'sifirla', metin: 'Önüme getir' },
      { id: 'blok+', metin: 'Blok ▶' },
      { id: 'cik', metin: 'AR\'dan çık' },
    ]);
    this.dugmeler = d;
  }

  ciz() {
    const { ctx, app } = this;
    if (!app.blok) return;
    this.dugmeleriKur();
    const st = app.blok.steps[app.adim];
    ctx.clearRect(0, 0, PW, PH);
    ctx.fillStyle = 'rgba(17,21,27,0.93)';
    ctx.beginPath();
    ctx.roundRect(0, 0, PW, PH, 36);
    ctx.fill();
    ctx.fillStyle = '#8fb8ff';
    ctx.font = '600 30px system-ui, sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText(`${app.blokTanim.ad} · Adım ${app.adim + 1}/${app.blok.steps.length}`, 36, 30);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 46px system-ui, sans-serif';
    ctx.fillText(st.baslik, 36, 72);
    ctx.font = '400 29px system-ui, sans-serif';
    ctx.fillStyle = '#dfe6ee';
    const satirlar = sar(ctx, st.metin, PW - 72);
    const enCok = 11;
    satirlar.slice(0, enCok).forEach((l, i) => {
      const son = i === enCok - 1 && satirlar.length > enCok;
      ctx.fillText(son ? l.replace(/\s*\S*$/, ' …') : l, 36, 140 + i * 38);
    });
    for (const b of this.dugmeler) {
      const ust = this.uzerinde === b.id;
      ctx.fillStyle = b.pasif ? 'rgba(255,255,255,0.06)' : b.acik ? '#2f7d6d' : ust ? '#3a4658' : '#283039';
      ctx.beginPath();
      ctx.roundRect(b.x, b.y, b.w, b.h, 18);
      ctx.fill();
      if (ust && !b.pasif) {
        ctx.strokeStyle = '#8fb8ff';
        ctx.lineWidth = 4;
        ctx.stroke();
      }
      ctx.fillStyle = b.pasif ? '#6b7580' : '#ffffff';
      ctx.font = '600 32px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(b.metin, b.x + b.w / 2, b.y + b.h / 2 + 1);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
    }
    this.tex.needsUpdate = true;
  }

  bul(uv) {
    const x = uv.x * PW;
    const y = (1 - uv.y) * PH;
    return this.dugmeler.find((b) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) || null;
  }

  uzerineGel(id) {
    if (id === this.uzerinde) return;
    this.uzerinde = id;
    this.ciz();
  }

  tikla(uv) {
    const b = this.bul(uv);
    if (b && !b.pasif) this.eylem(b.id);
  }
}

function sar(ctx, metin, genislik) {
  const kelimeler = metin.split(/\s+/);
  const out = [];
  let satir = '';
  for (const k of kelimeler) {
    const dene = satir ? satir + ' ' + k : k;
    if (ctx.measureText(dene).width > genislik && satir) {
      out.push(satir);
      satir = k;
    } else satir = dene;
  }
  if (satir) out.push(satir);
  return out;
}

export async function setupXR(app, dugme, durum) {
  const { renderer, scene, rig, model, merkez } = app;

  // ---- Panel ----
  const panel = new Panel3D(app, eylem);
  panel.mesh.visible = false;
  panel.mesh.position.set(0.31, 0.0, 0.05);
  panel.mesh.rotation.y = -0.38;
  rig.add(panel.mesh);
  app.xrPanel = panel;
  app.degisti.push(() => { if (panel.mesh.visible) panel.ciz(); });

  // ---- Sanal USG ekranı: AR'da panelin üstünde, USG tuvali doku olarak ----
  const usgDoku = new THREE.CanvasTexture(app.usg.tuval);
  usgDoku.colorSpace = THREE.SRGBColorSpace;
  const usgEkran = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: usgDoku, transparent: true, depthWrite: false }));
  usgEkran.renderOrder = 25;
  usgEkran.visible = false;
  usgEkran.rotation.y = -0.38;
  rig.add(usgEkran);
  let usgBoyut = '';
  app.usg.cizildi.push(() => {
    if (!renderer.xr.isPresenting) return;
    const { width: w, height: h } = app.usg.tuval;
    if (usgBoyut !== w + 'x' + h) { usgBoyut = w + 'x' + h; usgDoku.dispose(); }
    usgDoku.needsUpdate = true;
    const yuk = 0.2;
    usgEkran.scale.set(yuk * w / h, yuk, 1);
    usgEkran.position.set(panel.mesh.position.x, panel.mesh.position.y + 0.2 + yuk / 2, panel.mesh.position.z);
  });
  if (new URLSearchParams(location.search).has('paneltest')) {
    // Masaüstünde panel çizimini ve düğmeleri sınamak için
    panel.mesh.visible = true;
    panel.mesh.position.set(0.17, -0.04, 0.12);
    panel.mesh.rotation.y = -0.3;
    panel.ciz();
  }

  function eylem(id) {
    if (id === 'onceki') app.onceki();
    else if (id === 'sonraki') app.sonraki();
    else if (id.startsWith('k:')) app.grupDegistir(id.slice(2));
    else if (id === 'etiket') app.etiketDegistir();
    else if (id === 'yatir') {
      // Bloğun yatış pozisyonu ile ayakta (dik) model arasında geçiş
      const dik = model.rotation.x === 0 && model.rotation.y === 0 && model.rotation.z === 0;
      model.rotation.set(...(dik ? (YATIS[app.blokTanim.yatis] || YATIS.sirtustu) : [0, 0, 0]));
      panel.ciz();
    }
    else if (id === 'blok-' || id === 'blok+') app.blokKaydir(id === 'blok+' ? 1 : -1);
    else if (id === 'buyut') { model.scale.setScalar(Math.min(4, model.scale.x * 1.25)); }
    else if (id === 'kucult') { model.scale.setScalar(Math.max(0.3, model.scale.x / 1.25)); }
    else if (id === 'sifirla') yerlestir();
    else if (id === 'cik') renderer.xr.getSession()?.end();
  }

  let destek = false;
  try {
    destek = !!navigator.xr && (await navigator.xr.isSessionSupported('immersive-ar'));
  } catch (_) {
    destek = false;
  }
  if (!destek) {
    dugme.disabled = true;
    durum.textContent = window.isSecureContext
      ? 'Bu tarayıcı karma gerçekliği (WebXR AR) desteklemiyor. Sayfayı Meta Quest 3 tarayıcısında açın.'
      : 'AR için sayfa HTTPS (veya localhost) üzerinden açılmalı.';
    return { guncelle() {} };
  }
  dugme.disabled = false;
  durum.textContent = 'Düğmeye basın; model önünüzde gerçek boyutta belirir. Tetik ya da çimdik: seç/tut, iki elle: büyüt-küçült.';


  // ---- Kumandalar / eller ----
  const rc = new THREE.Raycaster();
  rc.params.Line.threshold = 0.002;
  const m4 = new THREE.Matrix4();
  const kutu = new THREE.Box3();
  const kontroller = [0, 1].map((i) => {
    const c = renderer.xr.getController(i);
    const cizgi = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.65 }),
    );
    cizgi.scale.z = 0.6;
    cizgi.visible = false;
    c.add(cizgi);
    const imlec = new THREE.Mesh(new THREE.SphereGeometry(0.004, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, transparent: true }));
    imlec.visible = false;
    imlec.renderOrder = 30;
    scene.add(imlec);
    c.userData = { cizgi, imlec, aktif: false };
    c.addEventListener('connected', () => { c.userData.aktif = true; cizgi.visible = true; });
    c.addEventListener('disconnected', () => { c.userData.aktif = false; cizgi.visible = false; imlec.visible = false; });
    c.addEventListener('selectstart', () => secBasla(c));
    c.addEventListener('selectend', () => secBit(c));
    scene.add(c);
    return c;
  });

  function isin(c) {
    m4.identity().extractRotation(c.matrixWorld);
    rc.ray.origin.setFromMatrixPosition(c.matrixWorld);
    rc.ray.direction.set(0, 0, -1).applyMatrix4(m4);
  }
  const gorunur = (o) => { for (; o; o = o.parent) if (!o.visible) return false; return true; };

  // Ucuz isabet: panel + modelin sınır kutusu (her karede); tam isabet: yalnız seçimde
  const yerelKutu = new THREE.Box3();
  function kutuIsabet() {
    model.updateMatrixWorld(true);
    const ters = m4.copy(model.matrixWorld).invert();
    const r = rc.ray.clone().applyMatrix4(ters);
    const p = r.intersectBox(yerelKutu, new THREE.Vector3());
    if (!p) return null;
    p.applyMatrix4(model.matrixWorld);
    return { point: p, distance: p.distanceTo(rc.ray.origin) };
  }

  const tutan = new Map();
  let ikiEl = null;
  function tutmaOfseti(c) {
    rig.updateMatrixWorld(true);
    return new THREE.Matrix4().copy(c.matrixWorld).invert().multiply(rig.matrixWorld);
  }
  function secBasla(c) {
    isin(c);
    const hp = panel.mesh.visible ? rc.intersectObject(panel.mesh, false)[0] : null;
    const hm = rc.intersectObjects([app.anat.root, app.blok.grup], true).find((h) => gorunur(h.object))
      || kutuIsabet();
    if (hp && (!hm || hp.distance <= hm.distance)) { panel.tikla(hp.uv); return; }
    if (!hm) return;
    tutan.set(c, tutmaOfseti(c));
    if (tutan.size === 2) {
      const [a, b] = [...tutan.keys()];
      ikiEl = { d0: a.position.distanceTo(b.position), s0: model.scale.x };
    }
  }
  function secBit(c) {
    if (!tutan.delete(c)) return;
    ikiEl = null;
    for (const k of tutan.keys()) tutan.set(k, tutmaOfseti(k));
  }

  // Blok/bölge değişince: modeli yeni bölgenin merkezine al, isabet kutusunu güncelle
  app.bolgeDegisti = () => {
    if (!renderer.xr.isPresenting) return;
    merkez.position.copy(app.bolgeMerkez).negate();
    yerelKutu.copy(app.bolgeKutu).translate(merkez.position);
    model.rotation.set(0, 0, 0);
    panel.ciz();
  };

  // ---- Yerleştirme ----
  let yerlesBekle = 0;
  function yerlestir() {
    const xc = renderer.xr.getCamera();
    xc.updateMatrixWorld(true);
    const bas = new THREE.Vector3().setFromMatrixPosition(xc.matrixWorld);
    const ileri = new THREE.Vector3(0, 0, -1).applyQuaternion(new THREE.Quaternion().setFromRotationMatrix(xc.matrixWorld));
    ileri.y = 0;
    if (ileri.lengthSq() < 1e-4) ileri.set(0, 0, -1);
    ileri.normalize();
    rig.position.copy(bas).addScaledVector(ileri, 0.6);
    rig.position.y = bas.y - 0.2;
    rig.lookAt(bas.x, rig.position.y, bas.z);
  }

  // ---- Oturum ----
  dugme.onclick = async () => {
    if (renderer.xr.isPresenting) { renderer.xr.getSession().end(); return; }
    try {
      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['hand-tracking'],
      });
      renderer.xr.setReferenceSpaceType('local-floor');
      await renderer.xr.setSession(session);
      basladi(session);
    } catch (e) {
      durum.textContent = 'AR başlatılamadı: ' + e.message;
    }
  };

  function basladi(session) {
    scene.background = null;
    app.etiketBoy = 0.014;
    merkez.position.copy(app.bolgeMerkez).negate();
    yerelKutu.copy(app.bolgeKutu).translate(merkez.position);
    model.scale.setScalar(1);
    model.rotation.set(0, 0, 0);
    panel.mesh.visible = true;
    yerlesBekle = 3;
    app.adimUygula(app.adim, false);
    panel.ciz();
    session.addEventListener('end', bitti, { once: true });
  }

  function bitti() {
    scene.background = app.ARKA;
    app.etiketBoy = 0.011;
    app.boyutla?.();
    merkez.position.set(0, 0, 0);
    rig.position.set(0, 0, 0);
    rig.quaternion.identity();
    model.scale.setScalar(1);
    model.rotation.set(0, 0, 0);
    panel.mesh.visible = false;
    tutan.clear();
    ikiEl = null;
    for (const c of kontroller) c.userData.imlec.visible = false;
    app.adimUygula(app.adim, true);
    app.boyutla();
  }

  function guncelle() {
    usgEkran.visible = renderer.xr.isPresenting && app.usg.aktif && usgBoyut !== '';
    if (!renderer.xr.isPresenting) return;
    if (yerlesBekle > 0 && --yerlesBekle === 0) yerlestir();

    // Tutma ve iki elle ölçek
    if (tutan.size) {
      const [c] = tutan.keys();
      const m = new THREE.Matrix4().multiplyMatrices(c.matrixWorld, tutan.get(c));
      const s = new THREE.Vector3();
      m.decompose(rig.position, rig.quaternion, s);
      if (ikiEl && tutan.size === 2) {
        const [a, b] = [...tutan.keys()];
        const d = a.position.distanceTo(b.position);
        if (ikiEl.d0 > 0.01) model.scale.setScalar(THREE.MathUtils.clamp((ikiEl.s0 * d) / ikiEl.d0, 0.3, 4));
      }
    }

    // Işın çizgileri, imleç, panel üzerine gelme
    let uzerinde = null;
    for (const c of kontroller) {
      const { cizgi, imlec, aktif } = c.userData;
      if (!aktif) continue;
      isin(c);
      const hp = rc.intersectObject(panel.mesh, false)[0];
      const hk = tutan.has(c) ? null : kutuIsabet();
      const h = hp && (!hk || hp.distance <= hk.distance) ? hp : hk;
      cizgi.scale.z = h ? h.distance : 0.6;
      imlec.visible = !!h;
      if (h) imlec.position.copy(h.point);
      if (h === hp && hp) uzerinde = panel.bul(hp.uv)?.id || null;
    }
    panel.uzerineGel(uzerinde);
  }

  return { guncelle };
}
