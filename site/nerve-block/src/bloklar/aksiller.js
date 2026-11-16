// Aksiller brakiyal pleksus bloğu: aksiller kıvrımda arter çevresindeki terminal sinirler + ayrı muskulokutan enjeksiyon
import * as THREE from 'three';
import { Arac, fmt, RENK, etiketKurucu, etiketler, kamera, V } from '../blok.js';

export default {
  id: 'aksiller',
  ad: 'Aksiller blok',
  kisa: 'Aksiller',
  grup: 'Üst ekstremite',
  bolge: 'kol',
  yatis: 'kolAcik',
  katmanAdlari: { fasya: 'Brakiyal fasya' },
  kur,
};

const ART = 'Brachial_arteryr'; // kaynak modelde aksiller kıvrım seviyesindeki damarın adı (bkz. adlar/kol.js)
const MED = 'Median_nerver';
const ULN = 'Ulnar_nerver';
const RAD = 'Radial_nerver';
const MC = 'Musculocutaneous_nerver';
const BAZ = 'Basilic_veinr';
const BRV = 'Brachial_veinsr';
const BIC = ['Short_head_of_biceps_brachiir', 'Long_head_of_biceps_brachiir'];
const CB = 'Coracobrachialis_muscler';
const TRI = ['Long_head_of_triceps_brachiir', 'Medial_head_of_triceps_brachiir', 'Lateral_head_of_triceps_brachiir'];
const KON = ['Latissimus_dorsi_muscler', 'Teres_major_muscler'];
const SINIRLER = [MED, ULN, RAD, MC];

function kur(anat, isaretler) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, MAVI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, PROB, KESIT } = RENK;

  // Seviye: pektoralis majörün humerusa yapışmasının ~2,5 cm distali (aksiller kıvrım)
  const pek = V(isaretler.pektoralisYapisma);
  const epi = V(isaretler.medialEpikondil);
  const yL = pek.y - 0.025;
  const A = a.merkez(ART, (v) => Math.abs(v.y - yL) < 0.004);

  // Prob: kolun iç yüzünde, artere (humerusa) dik; ışın laterale (humerusa); iğne anterior (biseps) uçtan
  let P = a.probYerlestir(A, new THREE.Vector3(1, 0, 0.25), new THREE.Vector3(0, 0, 1), { bas: 0.1, enCokDer: 25 });
  const d = a.dogrultu(ART, A, 0.02);
  if (d) {
    if (d.y < 0) d.negate();
    const uh = P.n.clone().cross(d).normalize();
    if (uh.z < 0) uh.negate();
    P = a.eksenAyarla(P, uh);
  }
  const { S, n, b, u, mz } = P;
  const kesit = a.kesitci(P, { derinlik: 0.05, yariGenislik: 0.03 });
  const Ak = kesit(ART, 0.004, (v) => v.distanceTo(A) < 0.012) || A;
  const Me = kesit(MED, 0.004);
  const Ul = kesit(ULN, 0.004);
  const Ra = kesit(RAD, 0.004);
  const Mc = kesit(MC, 0.004);
  const Ba = kesit(BAZ, 0.004);
  const Bv = kesit(BRV, 0.004);
  const Bi = kesit(BIC, 0.004);
  const Cb = kesit(CB, 0.004);
  const Ko = kesit(KON, 0.004);
  const Hu = kesit('Humerusr', 0.004);
  const derin = (p) => (p ? p.clone().sub(S).dot(b) * 100 : null);
  const artCm = derin(Ak);
  const mcDerinCm = derin(Mc);
  const meUlFark = Me && Ul ? (derin(Me) + derin(Ul)) / 2 - artCm : null;

  // Hedef 1: arterin derin (6 saat) yüzü; hedef 2: muskulokutan sinir (aynı girişten yönlendirme)
  const T = Ak.clone().addScaledVector(b, 0.006);
  const T2 = Mc ? Mc.clone().addScaledVector(b, -0.002) : T.clone();
  const { E, derinlikCm, aciDer, girisProbKenariCm } = a.igneYolu(P, T, { aci: 35, enCok: 0.03 });
  const mcYolCm = T2.distanceTo(E) * 100;
  const mcAciDer = THREE.MathUtils.radToDeg(Math.asin(THREE.MathUtils.clamp(T2.clone().sub(E).normalize().dot(b), -1, 1)));

  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.05,
    // perivasküler LA: arteri ve çevresindeki sinirleri saran birikim
    la: { merkez: Ak.clone().addScaledVector(b, 0.003), boyut: new THREE.Vector3(0.012, 0.011, 0.018) },
    isaretler: [[S, 0x35e07a]],
  });

  // ---- İkinci hedef: muskulokutan sinire yönlendirilen iğne, hedef ve LA (ana nesnelerle eşzamanlı canlanır) ----
  const dir2 = T2.clone().sub(E).normalize();
  const bas2 = E.clone().addScaledVector(dir2, -0.03);
  const L2 = T2.distanceTo(bas2);
  const igne2 = new THREE.Mesh(new THREE.CylinderGeometry(0.0007, 0.0007, L2, 10),
    new THREE.MeshStandardMaterial({ color: 0xc8ccd2, metalness: 0.6, roughness: 0.3, transparent: true, opacity: 0.55, depthWrite: false }));
  igne2.position.copy(bas2.clone().add(T2).multiplyScalar(0.5));
  igne2.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir2);
  objects.igne2 = igne2;
  const hedef2 = new THREE.Mesh(new THREE.SphereGeometry(0.0026, 16, 12), new THREE.MeshBasicMaterial({ color: 0x3ff0ff, depthTest: false, transparent: true }));
  hedef2.position.copy(T2);
  hedef2.renderOrder = 18;
  hedef2.onBeforeRender = () => hedef2.scale.copy(objects.hedef.scale);
  objects.hedef2 = hedef2;
  const la2 = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 20), new THREE.MeshStandardMaterial({
    color: 0x7fe3ff, transparent: true, opacity: 0.45, depthWrite: false, roughness: 0.2,
  }));
  la2.applyMatrix4(new THREE.Matrix4().makeBasis(u, b, mz));
  la2.position.copy(T2);
  la2.userData.tam = new THREE.Vector3(0.006, 0.005, 0.013);
  la2.scale.copy(la2.userData.tam);
  la2.renderOrder = 4;
  la2.onBeforeRender = () => {
    const k = objects.la.scale.x / objects.la.userData.tam.x;
    la2.scale.copy(la2.userData.tam).multiplyScalar(k);
  };
  objects.la2 = la2;
  grup.add(igne2, hedef2, la2);

  // ---- Kameralar: kolun iç (medial) yüzünden ----
  const kolOrta = S.clone().lerp(epi, 0.45);
  const genel = kamera(kolOrta, new THREE.Vector3(1, 0.12, 0.42), 0.6);
  const orta = kamera(Ak.clone().add(new THREE.Vector3(0, -0.02, 0)), new THREE.Vector3(1, 0.25, 0.5), 0.3);
  const yakin = kamera(Ak.clone().lerp(S, 0.25).addScaledVector(b, 0.008), new THREE.Vector3(0.55, 0.75, 0.37), 0.21);

  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.045).addScaledVector(u, -0.017);
  const pekDeri = a.deriVur(pek.clone().add(new THREE.Vector3(0.1, 0, 0.03)), new THREE.Vector3(-1, 0, -0.3).normalize())?.p || pek;
  const epiDeri = a.deriVur(epi.clone().add(new THREE.Vector3(0.1, 0, 0)), new THREE.Vector3(-1, 0, 0))?.p || epi;
  const seviye = (name, dy) => a.merkez(name, (v) => Math.abs(v.y - (yL + dy)) < 0.004);
  const odak = [ART, BAZ, BRV, ...SINIRLER, ...BIC, CB, ...KON];
  const katmanYakin = { deri: 0.25, kas: 0.3, fasya: 0, arter: 1, ven: 0.9, sinir: 1, kemik: 0.8 };

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: 'Hasta sırtüstü; kol 90° abdüksiyonda ve dış rotasyonda, dirsek fleksiyonda. Prob aksiller kıvrıma, pektoralis majörün humerusa yapıştığı yerin hemen distaline, kolun uzun eksenine dik konur; aksiller arterin nabzı burada ele gelir. Modeldeki kol gövde yanında (addüksiyonda) duruyor; uygulamada kol 90° abdüksiyon ve dış rotasyonda olur. Bu bölge modeli yalnız kolu içerir. Kaynak veride kolun göğüs duvarına değen iç yüzünün derisi olmadığından bu yüz yeniden oluşturuldu.',
      katman: { deri: 1, kemik: 0.8 },
      vurgu: ['Humerusr'],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['Prob seviyesi:\naksiller kıvrım', S, PROB, 0.09, 0.02],
        ['Pektoralis majör yapışma\nyeri (humerus)', pekDeri, SARI, 0.09, 0.07],
        ['Medial epikondil', epiDeri, SARI, 0.08, -0.03],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Aksiller kıvrımda sinirler ve damarlar',
      metin: 'Bu seviyede brakiyal pleksusun terminal dalları aksiller arterin çevresindedir: median sinir sıklıkla arterin anterolateralinde, ulnar sinir medialinde (ikisi de yüzeyel tarafta), radial sinir arterin derin-arka tarafında, latissimus dorsi–teres majör ortak tendonunun üzerindedir. Muskulokutan sinir bu seviyede çoğunlukla kılıftan ayrılmış olarak biseps ile korakobrakiyalis arasında ilerler; ayrıca bloklanmalıdır. Sinirlerin arter çevresindeki dizilimi kişiden kişiye belirgin değişir. Kaynak modelde bu seviyedeki damar "brakiyal arter" adını taşır; klasik tanımla teres majörün alt kenarına kadar aksiller arterdir.',
      katman: { deri: 0.3, kas: 0.55, fasya: 0, arter: 1, ven: 1, sinir: 1, kemik: 0.8 },
      vurgu: SINIRLER,
      odak,
      goster: [],
      etiket: etiketler(orta, [
        ['Aksiller arter', seviye(ART, -0.03), KIRMIZI],
        ['Median sinir', seviye(MED, -0.045), SARI],
        ['Ulnar sinir', seviye(ULN, -0.06), SARI],
        ['Radial sinir', seviye(RAD, -0.02), SARI, 0.03, 0.075],
        ['Muskulokutan sinir', seviye(MC, -0.03), SARI],
        ['Bazilik ven', seviye(BAZ, -0.02), MAVI],
        ['Biseps', seviye(BIC, -0.05), KAS],
        ['Latissimus dorsi–teres majör\n(ortak tendon)', a.merkez(KON, (v) => Math.abs(v.y - yL - 0.01) < 0.006), KAS, 0.075, 0.02],
      ], { olcek: 0.75, uzaklik: 0.06 }),
      etiketOlcek: 0.75,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: `Kısa eksende aksiller arter yuvarlak, pulsatil ve anekoiktir; çevresindeki venler (bazilik ven, brakiyal venler) prob basısıyla kollabe olur. Sinirler arterin çevresinde bal peteği görünümlü yuvarlak yapılardır; derinde humerus parlak bir kemik yüzeyi olarak görülür. Muskulokutan sinir biseps ile korakobrakiyalis arasındaki düzlemde oval-üçgen bir yapıdır; prob proksimal-distal kaydırılınca arterden uzaklaşması tanıtıcıdır. Bu modelde arter ≈ ${fmt(artCm)} cm derinde; median ve ulnar sinir arterin ≈ ${fmt(meUlFark ?? 0)} cm derininde ve lateralinde, radial sinir daha derinde ve arkada, muskulokutan sinir ≈ ${fmt(mcDerinCm ?? 0)} cm derinde.`,
      katman: katmanYakin,
      vurgu: [ART, ...SINIRLER],
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['Aksiller arter', Ak, KIRMIZI],
        ['Median', Me, SARI],
        ['Ulnar', Ul, SARI],
        ['Radial', Ra, SARI],
        ['Muskulokutan', Mc, SARI],
        ['Bazilik ven', Ba, MAVI],
        ['Biseps', Bi, KAS],
        ['Korakobrakiyalis', Cb, KAS],
        ['Humerus', Hu, KEMIK],
      ], { olcek: 0.45, uzaklik: 0.032 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: 'Yüksek frekanslı lineer prob aksiller kıvrımda, kolun uzun eksenine dik (transvers) konur; ışın humerusa doğrudur, prob işareti anteriora (biseps tarafına) bakar. Arter ekranın ortasına alınır. Prob hafif basınçla tutulur: fazla bası venleri gizler ve fark edilmeyen damar içi enjeksiyon riskini artırır.',
      katman: katmanYakin,
      vurgu: [ART],
      odak,
      goster: ['prob', 'kesit'],
      etiket: etiketler(yakin, [
        ['Lineer prob', probUst, BEYAZ],
        ['Prob işareti → anterior', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['Aksiller arter', Ak, KIRMIZI],
      ], { olcek: 0.45, uzaklik: 0.032 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, probun anterior (biseps) ucundan. İğne önce arterin derin (6 saat) tarafına, radial sinirin bulunduğu bölgeye ilerletilir; ardından geri çekilip arterin yüzeyel tarafına, median ve ulnar sinirlerin çevresine yönlendirilir. Aynı girişten ayrı bir yönlendirmeyle biseps–korakobrakiyalis arasındaki muskulokutan sinire ulaşılır (soluk iğne). Sıra uygulayıcıya göre değişir. Her enjeksiyondan önce aspirasyon yapılır. Bu modelde giriş–arter derini ≈ ${fmt(derinlikCm)} cm (${Math.round(aciDer)}°), giriş–muskulokutan ≈ ${fmt(mcYolCm)} cm (${Math.round(mcAciDer)}°).`,
      katman: katmanYakin,
      vurgu: [ART, MC],
      odak,
      goster: ['prob', 'kesit', 'igne', 'igne2', 'giris', 'hedef', 'hedef2'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm anterioru`, E, PEMBE],
        ['Hedef 1: arterin derini (6 saat)', T, CAMGOBEGI],
        ['Hedef 2: muskulokutan sinir', T2, CAMGOBEGI],
        ['Aksiller arter', Ak, KIRMIZI],
      ], { olcek: 0.45, uzaklik: 0.034 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'Doğru planda ilaç arterin çevresinde anekoik bir halka oluşturur ve sinirleri arterden ayırır; median, ulnar ve radial sinirler bu perivasküler yayılımla kaplanır. Muskulokutan sinirin çevresinde ayrı bir birikim gerekir. Kolun iç yüzündeki deri (interkostobrakiyal ve medial brakiyal kutanöz sinirler) kılıfın dışındadır; turnike için arterin üzerine deri altı infiltrasyon eklenebilir. Bölge damardan zengindir: damar içi enjeksiyon ve lokal anestezik sistemik toksisitesi açısından dikkat.',
      katman: katmanYakin,
      vurgu: [ART, ...SINIRLER],
      odak,
      goster: ['prob', 'kesit', 'igne', 'igne2', 'hedef', 'hedef2', 'la', 'la2'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik:\narter çevresinde halka', T.clone().addScaledVector(u, -0.009), CAMGOBEGI],
        ['Muskulokutan sinir\nçevresinde ayrı birikim', T2, CAMGOBEGI],
        ['Aksiller arter', Ak, KIRMIZI],
      ], { olcek: 0.45, uzaklik: 0.034 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, artCm, mcDerinCm, mcYolCm, mcAciDer, girisProbKenariCm,
    metin: `arter derinliği ≈ ${fmt(artCm)} cm, giriş–arter derini ≈ ${fmt(derinlikCm)} cm (${Math.round(aciDer)}°), muskulokutan sinir ≈ ${fmt(mcDerinCm ?? 0)} cm derinde (girişten ≈ ${fmt(mcYolCm)} cm)`,
    kesitBulundu: { arter: !!Ak, median: !!Me, ulnar: !!Ul, radial: !!Ra, muskulokutan: !!Mc, bazilik: !!Ba, humerus: !!Hu },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, T2, Ak, Me, Ul, Ra, Mc, Bv, Ko } };
}
