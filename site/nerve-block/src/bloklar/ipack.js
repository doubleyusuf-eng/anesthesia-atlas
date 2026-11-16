// iPACK: popliteal arter ile diz kapsülü (femurun arka yüzü) arasına infiltrasyon — medial yaklaşım, kondillerin hemen üstü
import * as THREE from 'three';
import { Arac, fmt, RENK, etiketKurucu, etiketler, kamera, centroid } from '../blok.js';

export default {
  id: 'ipack',
  ad: 'iPACK bloğu',
  kisa: 'iPACK',
  grup: 'Alt ekstremite',
  bolge: 'uyluk',
  yatis: 'sirtustu',
  kur,
};

const ART = 'Popliteal_arteryr';
const VEN = 'Popliteal_veinr';
const TIB = 'Tibial_nerver';
const PER = 'Common_fibular_nerver';
const FEM = 'Femurr';
const SAR = 'Sartorius_muscler';
const VM = 'Vastus_medialis_muscler';
const SM = 'Semimembranosus_muscler';
const ST = 'Semitendinosus_muscler';
const GR = 'Gracilis_muscler';
const AM = 'Adductor_magnusr';
const SMG = 'Superior_medial_genicular_arteryr';

function kur(anat) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, MAVI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, PROB, KESIT } = RENK;

  // ---- Seviye: femur kondillerinin bittiği, gövdenin başladığı yer (patella tabanının hemen üstü) ----
  const fem = a.verts(FEM);
  const dilim = (vs, y, t = 0.003) => vs.filter((v) => Math.abs(v.y - y) < t);
  const zArka = (y) => { const d = dilim(fem, y); return d.length ? Math.min(...d.map((v) => v.z)) : null; };
  const patUst = Math.max(...a.verts('Patellar').map((v) => v.y));
  const femAlt = Math.min(...fem.map((v) => v.y));
  let yKon = femAlt + 0.01, zKon = Infinity;
  for (let y = femAlt + 0.005; y < patUst + 0.02; y += 0.002) { const z = zArka(y); if (z !== null && z < zKon) { zKon = z; yKon = y; } }
  const zSaft = zArka(patUst + 0.05);
  const esik = (zKon + zSaft) / 2;
  let yKonUst = patUst;
  for (let y = yKon; y < patUst + 0.05; y += 0.002) { const z = zArka(y); if (z !== null && z > esik) { yKonUst = y; break; } }
  const yL = yKonUst + 0.005;

  // ---- Hedef: arter ile femurun arka yüzü arası, arterin lateral kenarının biraz ötesi ----
  const art = dilim(a.verts(ART), yL, 0.004);
  const A = centroid(art);
  const artLatX = Math.min(...art.map((v) => v.x));
  const artOnZ = Math.max(...art.map((v) => v.z));
  const tx = artLatX - 0.006;
  const femArka = dilim(fem, yL, 0.004).filter((v) => Math.abs(v.x - tx) < 0.008);
  const femZ = femArka.length ? Math.min(...femArka.map((v) => v.z)) : artOnZ + 0.008;
  const T = new THREE.Vector3(tx, yL, (femZ + artOnZ) / 2);

  // ---- İğne yolu: hedeften mediale, femurun arka-medial köşesine ve damarlara çarpmayan en "anterior" doğrultu ----
  // (Modelde diz düz ve arter–femur aralığı dar; yol bu aralıktan geçmek zorunda.)
  const engel = [...a.verts(FEM), ...a.verts(ART), ...a.verts(VEN)].filter((v) => Math.abs(v.y - yL) < 0.008);
  const engelMesh = [FEM, ART, VEN].map((k) => anat.parts.get(k)).filter(Boolean);
  const ray = new THREE.Raycaster();
  const aciklik = (E) => {
    const d = T.clone().sub(E); const L = d.length(); d.normalize();
    ray.set(E, d);
    ray.far = L - 0.002;
    if (ray.intersectObjects(engelMesh, false).length) return 0; // yol kemiği ya da damarı kesiyor
    let m = Infinity;
    for (const v of engel) {
      const t = THREE.MathUtils.clamp(v.clone().sub(E).dot(d), 0, L - 0.003);
      m = Math.min(m, v.distanceTo(E.clone().addScaledVector(d, t)));
    }
    return m;
  };
  let E = null;
  for (let s = 0.8; s >= -0.3; s -= 0.02) {
    const h = a.deriVur(T, new THREE.Vector3(1, 0, s).normalize());
    if (h && aciklik(h.p) >= 0.003) { E = h.p; break; }
  }
  if (!E) E = a.deriVur(T, new THREE.Vector3(1, 0, 0))?.p || T.clone().add(new THREE.Vector3(0.06, 0, 0));

  // ---- Prob: uyluğun medial yüzünde transvers; anterior ucu iğne girişinin hemen arkasında ----
  const P0 = a.probYerlestir(E.clone().add(new THREE.Vector3(-0.02, 0, -0.025)), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1), { bas: 0.045, enCokDer: 20, alan: 0.012 });
  // Kesit düzlemi tam transvers kalsın (normal yatay düzlemde)
  const n = new THREE.Vector3(P0.n.x, 0, P0.n.z).normalize();
  const u = new THREE.Vector3(0, 0, 1).sub(n.clone().multiplyScalar(n.z)).normalize();
  const P = { S: P0.S.clone(), n, b: n.clone().negate(), u, mz: u.clone().cross(n).normalize() };
  // Prob merkezi: giriş noktası probun anterior ucunun ~4 mm önünde kalacak şekilde
  P.S.addScaledVector(u, E.clone().sub(P.S).dot(u) - 0.023);
  P.S = a.deriVur(P.S.clone().addScaledVector(n, 0.02), P.b)?.p || P.S;
  const { S, b, mz } = P;
  const kesit = a.kesitci(P, { yariGenislik: 0.03, derinlik: 0.09 });
  const Ak = kesit(ART, 0.004) || A;
  const Vk = kesit(VEN, 0.004);
  const Tb = kesit(TIB, 0.004);
  const Pr = kesit(PER, 0.004);
  const Fm = kesit(FEM, 0.004, (v) => v.z < femZ + 0.012);
  const Sm = kesit([SM, ST], 0.004);
  const Sr = kesit([SAR, GR], 0.004);
  const Vm = kesit(VM, 0.004);

  const igVek = T.clone().sub(E);
  const derinlikCm = igVek.length() * 100;
  const aciDer = THREE.MathUtils.radToDeg(Math.asin(THREE.MathUtils.clamp(igVek.clone().normalize().dot(b), -1, 1)));
  const girisProbKenariCm = (E.clone().sub(S).dot(u) - 0.019) * 100;
  const hedefDerinlikCm = T.clone().sub(S).dot(b) * 100;
  const arterDerinlikCm = Ak.clone().sub(S).dot(b) * 100;
  const tibUzakCm = Tb ? Tb.distanceTo(T) * 100 : null;
  const patUstKonCm = (yL - patUst) * 100;

  // Yüzey işaretleri: patella tabanı, medial femur kondili, prob
  const patTepe = a.uc('Patellar', new THREE.Vector3(0, 1, 0), () => true, 0.1);
  const patDeri = patTepe && a.deriVur(patTepe.clone().add(new THREE.Vector3(0, 0, 0.1)), new THREE.Vector3(0, 0, -1))?.p;
  const medKon = a.uc(FEM, new THREE.Vector3(1, 0, 0), (v) => Math.abs(v.y - (yKon + 0.01)) < 0.006, 0.05);
  const konDeri = medKon && a.deriVur(medKon.clone().add(new THREE.Vector3(0.03, 0, 0)), new THREE.Vector3(-1, 0, 0))?.p;

  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.085,
    kesitGenislik: 0.06,
    la: { merkez: T.clone().addScaledVector(b, -0.008), boyut: new THREE.Vector3(0.0045, 0.016, 0.014) },
    isaretler: [[patDeri, 0xffe14d], [konDeri, 0xffe14d], [S, 0x35e07a]],
  });

  // ---- Kameralar: medialden (posteromedial-üst) ----
  const genel = kamera(S.clone().add(new THREE.Vector3(-0.035, 0.03, 0.02)), new THREE.Vector3(0.3, 0.3, 0.9), 0.55);
  const orta = kamera(A.clone().lerp(S, 0.3), new THREE.Vector3(0.7, 0.45, -0.55), 0.32);
  const yakin = kamera(T.clone().lerp(S, 0.5), new THREE.Vector3(0.6, 0.6, -0.5), 0.235);

  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.07).addScaledVector(u, -0.026);
  const odak = [ART, VEN, TIB, PER, SAR, VM, SM, ST, GR, AM, SMG];
  const katmanYakin = { deri: 0.25, kas: 0.35, sinir: 1, arter: 1, ven: 1, kemik: 0.75 };

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: `Hasta sırtüstü; uygulamada diz ~90° bükülür ya da kalça dışa döndürülüp diz hafif bükülür (modelde diz düz). Patella tabanı ve medial femur kondili bulunur. Prob uyluğun medial yüzüne, kondillerin femur gövdesine geçtiği seviyeye transvers konacak — bu modelde patella tabanının ≈ ${fmt(patUstKonCm)} cm üstü.`,
      katman: { deri: 1, kemik: 0.8 },
      vurgu: [FEM, 'Patellar'],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['Patella tabanı', patDeri, SARI, -0.08, 0.05],
        ['Medial femur kondili', konDeri, SARI, 0.08, -0.05],
        ['Prob seviyesi\n(uyluk medial yüzü)', S, PROB, 0.09, 0.05],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Diz arka kapsülü ve popliteal damarlar',
      metin: 'Diz eklem kapsülünün arka yüzü, başta tibial sinirin eklem dalları ve obturator sinirin arka dalı olmak üzere popliteal pleksustan duyu alır. Bu ince dallar ve kapsül kaynak modelde yok; yerleri femurun arka yüzü ile popliteal arter arasındaki aralıktır. iPACK bu aralığa lokal anestezik bırakır; tibial ve ortak peroneal sinir gövdelerine ulaşmamak hedeflenir (motor koruyucu).',
      katman: { deri: 0.3, kas: 0.5, sinir: 1, arter: 1, ven: 1, kemik: 0.85 },
      vurgu: [ART, FEM],
      odak,
      goster: [],
      etiket: etiketler(orta, [
        ['Popliteal arter', a.merkez(ART, (v) => Math.abs(v.y - yL - 0.01) < 0.004), KIRMIZI],
        ['Popliteal ven', a.merkez(VEN, (v) => Math.abs(v.y - yL - 0.02) < 0.004), MAVI],
        ['Tibial sinir', a.merkez(TIB, (v) => Math.abs(v.y - yL + 0.01) < 0.004), SARI],
        ['Ortak peroneal sinir', a.merkez(PER, (v) => Math.abs(v.y - yL - 0.01) < 0.004), SARI],
        ['Femur (arka yüz)', a.merkez(FEM, (v) => Math.abs(v.y - yL - 0.02) < 0.004 && v.z < femZ + 0.006), KEMIK],
        ['Semimembranozus', a.merkez(SM, (v) => Math.abs(v.y - yL - 0.03) < 0.006), KAS],
      ], { olcek: 0.7, uzaklik: 0.05 }),
      etiketOlcek: 0.7,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: 'Medialden transvers kesitte önce femur kondilleri parlak bir kemik yayı olarak görülür; prob proksimale kaydırılınca kondiller femur gövdesine dönüşür. Bu seviyede popliteal arter (Doppler ile pulsatil) femurun arkasında, derindedir; ven ve tibial sinir arterin daha arkasındadır. Hedef, arter ile femurun arka yüzü arasındaki yağlı aralıktır.',
      katman: katmanYakin,
      vurgu: [ART],
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['Femur', Fm, KEMIK],
        ['Popliteal arter', Ak, KIRMIZI],
        ['Popliteal ven', Vk, MAVI],
        ['Tibial sinir', Tb, SARI],
        ['Semimembranozus /\nsemitendinozus', Sm, KAS],
        ['Sartorius / grasilis', Sr, KAS],
        ['Vastus medialis', Vm, KAS],
        ['Hedef aralık', T, CAMGOBEGI],
      ], { olcek: 0.5, uzaklik: 0.04 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: 'Lineer prob (iri hastada konveks) uyluğun medial yüzünde, kondillerin hemen proksimalinde transvers konur; prob işareti anteriora bakar. Femur gövdesi ve popliteal arter aynı görüntüde, arter femurun arkasında olacak biçimde ayarlanır.',
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit'],
      etiket: etiketler(yakin, [
        ['Lineer prob', probUst, BEYAZ],
        ['Prob işareti → anterior', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['Popliteal arter', Ak, KIRMIZI],
      ], { olcek: 0.5, uzaklik: 0.04 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, anteromedialden posterolaterale: iğne probun anterior ucundan girer, femurun arka yüzüne paralel ilerletilir ve uç arter ile femur arasından arterin lateral kenarının biraz ötesine yerleştirilir. Damarlar Doppler ve aspirasyonla korunur; uç tibial ve peroneal sinirlere yaklaştırılmaz. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}° ${tibUzakCm ? `; tibial sinir hedeften ≈ ${fmt(tibUzakCm)} cm uzakta` : ''}. Modelde diz düz ve arter–femur aralığı dar olduğundan, femurun arka-iç köşesine çarpmayan en yatık yol bile oldukça diktir.`,
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm anterioru`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Hedef: arter ile femur arası', T, CAMGOBEGI],
        ['Popliteal arter', Ak, KIRMIZI],
        ['Tibial sinir', Tb, SARI],
      ], { olcek: 0.5, uzaklik: 0.04 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'İlaç, iğne lateralden mediale geri çekilirken parça parça verilir ve arter ile femur arasındaki aralığı doldurur. Diz arka ağrısını azaltırken motor gücü büyük ölçüde korur; diz artroplastisinde çoğunlukla adduktor kanal bloğu ile birlikte kullanılır. İlacın tibial ya da ortak peroneal sinire yayılması ayak düşüklüğüne yol açabilir. İlaç ve hacim kurum protokolüne göre belirlenir.',
      katman: katmanYakin,
      vurgu: [ART],
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik\narter ile femur arasında', T, CAMGOBEGI],
        ['Popliteal arter', Ak, KIRMIZI],
        ['Tibial sinir', Tb, SARI],
      ], { olcek: 0.5, uzaklik: 0.04 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, hedefDerinlikCm, arterDerinlikCm, girisProbKenariCm, tibUzakCm, patUstKonCm,
    metin: `hedef derinliği ≈ ${fmt(hedefDerinlikCm)} cm, giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°; seviye patella tabanının ≈ ${fmt(patUstKonCm)} cm üstü`,
    kesitBulundu: { arter: !!kesit(ART, 0.004), ven: !!Vk, femur: !!Fm, tibial: !!Tb },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, A, Ak, Tb, Fm } };
}
