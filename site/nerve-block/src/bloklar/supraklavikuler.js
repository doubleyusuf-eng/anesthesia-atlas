// Supraklaviküler brakiyal pleksus bloğu (trunkus/divizyonlar, 1. kaburga üzerinde subklavyen arterin lateralı)
import * as THREE from 'three';
import { Arac, fmt, RENK, etiketKurucu, etiketler, kamera, centroid } from '../blok.js';

export default {
  id: 'supraklavikuler',
  ad: 'Supraklaviküler blok',
  kisa: 'Supraklaviküler',
  grup: 'Üst ekstremite',
  bolge: 'boyun',
  yatis: 'sirtustu',
  kur,
};

const PLEKSUS = [
  'Superior_trunk_of_brachial_plexusr', 'Middle_trunk_of_brachial_plexusr', 'Inferior_trunk_of_brachial_plexusr',
  'Anterior_division_of_superior_trunk_of_brachial_plexusr', 'Posterior_division_of_superior_trunk_of_brachial_plexusr',
  'Anterior_division_of_middle_trunk_of_brachial_plexusr', 'Posterior_division_of_middle_trunk_of_brachial_plexusr',
  'Anterior_division_of_inferior_trunk_of_brachial_plexusr', 'Posterior_division_of_inferior_trunk_of_brachial_plexusr',
];
const ART = 'Right_subclavian_artery';
const KAB = 'First_ribr';
const ASM = 'Scalenus_anterior_muscler';
const MSM = 'Scalenus_medius_muscler';

function kur(anat) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, MAVI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, PROB, KESIT, ORGAN } = RENK;

  // Subklavyen arterin 1. kaburgayı çaprazladığı yer (ön skalenin lateralı)
  const asm = a.merkez(ASM);
  const kab = a.verts(KAB);
  let A0 = null, enAz = Infinity;
  for (const v of a.verts(ART)) {
    if (v.x > asm.x) continue;
    for (let i = 0; i < kab.length; i += 4) {
      const d = v.distanceToSquared(kab[i]);
      if (d < enAz) { enAz = d; A0 = v; }
    }
  }
  const A = a.merkez(ART, (v) => v.distanceTo(A0) < 0.01);
  // Bu bölgedeki pleksus kümesi
  const plek = a.merkez(PLEKSUS, (v) => v.distanceTo(A) < 0.03 && v.x < A.x + 0.005);

  // Klavikula ekseni: medial uç → lateral uç
  const klav = a.verts('Clavicler');
  const medUc = centroid([...klav].sort((p, q) => q.x - p.x).slice(0, 30));
  const latUc = centroid([...klav].sort((p, q) => p.x - q.x).slice(0, 30));
  const klavYon = latUc.clone().sub(medUc).normalize();
  const klavOrta = a.merkez('Clavicler', (v) => Math.abs(v.x - (medUc.x + latUc.x) / 2) < 0.01);

  // Prob: supraklaviküler fossada, klavikulaya paralel; ışın kaudale; iğne lateralden
  // Prob ekseni klavikulaya yaklaşık paralel; arteri kısa eksende (yuvarlak) görecek şekilde hafifçe döndürülür
  let P = a.probYerlestir(A.clone().lerp(plek, 0.4), new THREE.Vector3(-0.15, 0.8, 0.55), klavYon, { bas: 0.08, enCokDer: 30 });
  const artYon = a.dogrultu([ART, 'Axillary_arteryr'], A, 0.02);
  if (artYon) {
    let uk = artYon.clone().cross(P.n).normalize();
    if (uk.dot(klavYon) < 0) uk.negate();
    // en çok 25° döndür: ders kitabındaki "klavikulaya paralel" duruştan uzaklaşmasın
    const u0 = P.u.clone();
    const aci = u0.angleTo(uk);
    const enCok = THREE.MathUtils.degToRad(25);
    if (aci > enCok) uk = u0.clone().applyAxisAngle(u0.clone().cross(uk).normalize(), enCok);
    P = a.eksenAyarla(P, uk);
  }
  const probKlavAci = Math.round(THREE.MathUtils.radToDeg(P.u.angleTo(klavYon.clone().sub(P.n.clone().multiplyScalar(klavYon.dot(P.n))).normalize())));
  const { S, n, b, u } = P;
  const kesit = a.kesitci(P, { derinlik: 0.05, yariGenislik: 0.03 });
  const yakinA = (r) => (v) => v.distanceTo(A) < r;
  const Ak = kesit(ART, 0.004, yakinA(0.012)) || A;
  const Pk = kesit(PLEKSUS, 0.004, yakinA(0.03)) || plek;
  const Kb = kesit(KAB, 0.004);
  const Pl = kesit('Pleura', 0.004);
  const Ms = kesit(MSM, 0.004);
  const As = kesit(ASM, 0.004);

  // Hedef: "köşe cebi" — arterin lateralı ile 1. kaburganın birleştiği köşe
  let T = null;
  const kabMesh = anat.parts.get(KAB);
  if (kabMesh) {
    a.ray.set(Ak.clone().addScaledVector(u, 0.006).addScaledVector(b, -0.02), b);
    const h = a.ray.intersectObject(kabMesh, false)[0];
    if (h && h.distance < 0.05) T = h.point.clone().addScaledVector(b, -0.002);
  }
  if (!T) T = Ak.clone().addScaledVector(u, 0.006).addScaledVector(b, 0.003);
  const ig = a.igneYolu(P, T, { aci: 35, enCok: 0.025 });
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;
  const pleksusDerinlikCm = Pk.clone().sub(S).dot(b) * 100;
  const arterDerinlikCm = Ak.clone().sub(S).dot(b) * 100;

  const klavDeri = klavOrta && a.deriVur(klavOrta.clone().add(new THREE.Vector3(0, 0.03, 0.08)), new THREE.Vector3(0, -0.35, -1).normalize())?.p;
  const skmKlav = a.uc('Sternocleidomastoid_muscler', new THREE.Vector3(-1, -0.6, 0).normalize(), () => true, 0.06);
  const skmDeri = skmKlav && a.deriVur(skmKlav.clone().add(new THREE.Vector3(0, 0.06, 0.06)), new THREE.Vector3(0, -0.7, -0.7).normalize())?.p;

  const { grup, objects } = a.nesneler(P, {
    E, T,
    la: { merkez: T.clone().lerp(Pk, 0.45), boyut: new THREE.Vector3(0.011, 0.007, 0.011) },
    isaretler: [[klavDeri, 0xffe14d], [skmDeri, 0xffe14d]],
  });

  // ---- Kameralar: baş tarafından, ön-üstten supraklaviküler fossaya ----
  const genel = kamera(S.clone().add(new THREE.Vector3(0.03, -0.01, 0)), new THREE.Vector3(-0.35, 0.35, 1), 0.5);
  const orta = kamera(Ak.clone().lerp(Pk, 0.5), new THREE.Vector3(-0.3, 0.55, 0.75), 0.28);
  const yakin = kamera(Ak.clone().lerp(S, 0.35), new THREE.Vector3(-0.25, 0.5, 0.82), 0.25);

  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.04).addScaledVector(u, -0.019);
  const odak = [...PLEKSUS, ART, 'Axillary_arteryr', 'Right_subclavian_vein', ASM, MSM, 'Roots_of_brachial_plexusr',
    'Transverse_cervical_arteryr', 'Suprascapular_arteryr'];

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: 'Hasta sırtüstü ya da yarı oturur, baş karşı tarafa döndürülmüş, omuz aşağı çekilmiş. Klavikulanın orta noktası ve sternokleidomastoidin klavikular başının lateral kenarı bulunur. Prob, klavikulanın hemen üstünde, supraklaviküler fossada klavikulaya paralel konacak.',
      katman: { deri: 1, kemik: 0.7 },
      vurgu: ['Clavicler', KAB],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['Klavikula orta noktası', klavDeri, SARI, -0.07, -0.04],
        ['SKM klavikular başı', skmDeri, SARI, 0.07, 0.04],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Subklavyen arter ve pleksus',
      metin: 'Subklavyen arter, ön ve orta skalen kaslar arasından çıkıp 1. kaburganın üzerinden geçer. Pleksusun trunkus ve divizyonları arterin lateral ve üst tarafında bir küme oluşturur. 1. kaburganın hemen medialinde ve derininde plevra kubbesi (akciğer apeksi) bulunur.',
      katman: { deri: 0.3, kas: 0.6, sinir: 1, arter: 1, ven: 0.6, kemik: 1, organ: 0.5 },
      vurgu: PLEKSUS,
      odak,
      goster: [],
      etiket: etiketler(orta, [
        ['Subklavyen arter', Ak, KIRMIZI],
        ['Pleksus (trunkus/divizyonlar)', Pk, SARI],
        ['1. kaburga', Kb || a.merkez(KAB), KEMIK],
        ['Plevra kubbesi', a.uc('Pleura', new THREE.Vector3(0, 1, 0), (v) => v.x < 0, 0.03), ORGAN],
        ['Ön skalen', a.merkez(ASM, (v) => v.y < Ak.y + 0.02), KAS],
      ], { olcek: 0.65, uzaklik: 0.045 }),
      etiketOlcek: 0.65,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: 'Ultrasonda arter yuvarlak, anekoik ve pulsatildir; pleksus onun lateral-yüzeyelinde "üzüm salkımı" gibi hipoekoik yuvarlaklardır. Altta 1. kaburga parlak bir çizgi ve akustik gölge verir; hemen yanında plevra solunumla kayan parlak bir hattır. Pleksusun içinden dorsal skapular / transvers servikal arter geçebilir: renkli Doppler kullan.',
      katman: { deri: 0.25, kas: 0.35, sinir: 1, arter: 1, ven: 0.7, kemik: 0.55, organ: 0.6 },
      vurgu: PLEKSUS,
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['Pleksus', Pk, SARI],
        ['Subklavyen arter', Ak, KIRMIZI],
        ['1. kaburga', Kb, KEMIK],
        ['Plevra', Pl, ORGAN],
        ['Orta skalen', Ms, KAS],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: `Lineer prob klavikulanın hemen üstünde, ona yaklaşık paralel (koronal oblik) konur; prob işareti laterale bakar. Işın kaudale, göğüs boşluğuna doğru eğilir. Arteri yuvarlak (kısa eksende) görmek için prob hafifçe döndürülebilir (bu modelde ≈ ${probKlavAci}°). Arter, altındaki 1. kaburga ve lateralindeki pleksus kümesi aynı görüntüde olmalıdır.`,
      katman: { deri: 0.3, kas: 0.35, sinir: 1, arter: 1, ven: 0.7, kemik: 0.55, organ: 0.6 },
      vurgu: [],
      odak,
      goster: ['prob', 'kesit'],
      etiket: etiketler(yakin, [
        ['Lineer prob', probUst, BEYAZ],
        ['Prob işareti → lateral', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['Pleksus', Pk, SARI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, lateralden mediale: iğne probun lateral ucundan girer ve ilk olarak arter ile 1. kaburganın oluşturduğu "köşe cebi"ne yönlendirilir. İğne ucu her an görülmeli; kaburga gölgesinin ötesine, plevraya doğru ilerletilmez. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}°, pleksus derinliği ≈ ${fmt(pleksusDerinlikCm)} cm.`,
      katman: { deri: 0.3, kas: 0.35, sinir: 1, arter: 1, ven: 0.7, kemik: 0.55, organ: 0.6 },
      vurgu: [],
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm lateralı`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Hedef: köşe cebi\n(arter–1. kaburga)', T, CAMGOBEGI],
        ['Subklavyen arter', Ak, KIRMIZI],
        ['Plevra', Pl, ORGAN],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'Köşe cebindeki enjeksiyon ilacı kümenin alt kısmına yayar; gerekirse iğne kümenin üst-yüzeyel kısmına yeniden yönlendirilir. Amaç kümenin tamamının ilaçla çevrilmesidir. Pnömotoraks ve damar içi enjeksiyon riski unutulmamalı; frenik sinir tutulumu interskalene göre daha az olsa da görülebilir. İlaç ve hacim kurum protokolüne göre belirlenir.',
      katman: { deri: 0.25, kas: 0.35, sinir: 1, arter: 1, ven: 0.7, kemik: 0.55, organ: 0.6 },
      vurgu: PLEKSUS,
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik\npleksus kümesi çevresinde', Pk, CAMGOBEGI],
        ['Subklavyen arter', Ak, KIRMIZI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, pleksusDerinlikCm, arterDerinlikCm, girisProbKenariCm,
    metin: `pleksus derinliği ≈ ${fmt(pleksusDerinlikCm)} cm, arter derinliği ≈ ${fmt(arterDerinlikCm)} cm, giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°`,
    probKlavAci,
    kesitBulundu: { pleksus: !!kesit(PLEKSUS, 0.004, yakinA(0.03)), arter: !!kesit(ART, 0.004, yakinA(0.012)), kaburga: !!Kb, plevra: !!Pl },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, A, Ak, Pk, Kb, Pl } };
}
