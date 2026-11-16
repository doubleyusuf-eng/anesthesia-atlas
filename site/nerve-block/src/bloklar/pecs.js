// PECS II bloğu (ön aksiller çizgiye yakın, 3.–4. kaburga: pektoralis majör–minör arası + pektoralis minör–serratus arası)
import * as THREE from 'three';
import { Arac, fmt, RENK, etiketKurucu, etiketler, kamera, centroid } from '../blok.js';

export default {
  id: 'pecs',
  ad: 'PECS II bloğu',
  kisa: 'PECS II',
  grup: 'Gövde',
  bolge: 'gogus',
  yatis: 'sirtustu',
  kur,
};

const PMJ = ['Clavicular_head_of_pectoralis_major_muscler', 'Sternocostal_head_of_pectoralis_major_muscler', '(Abdominal_part_of_pectoralis_major_muscle)r'];
const PMI = 'Pectoralis_minor_muscler';
const SA = 'Serratus_anterior_muscler';
const K3 = 'Third_ribr';
const K4 = 'Fourth_ribr';
const LPN = 'Lateral_pectoral_nerver';
const MPN = 'Medial_pectoral_nerver';
const PDAL = 'Pectoral_branches_of_thoraco-acromial_arteryr';
const SINIRLER = [LPN, MPN, 'Long_thoracic_nerver', 'Thoracodorsal_nerver', 'Intercostal_nervesr'];

/** İkinci hedef küresi ve ikinci (sabit boyutlu) LA elipsoidi */
function ikinciHedef(P, T2, boyut) {
  const hedef2 = new THREE.Mesh(new THREE.SphereGeometry(0.0022, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffb03f, depthTest: false, transparent: true }));
  hedef2.position.copy(T2);
  hedef2.renderOrder = 18;
  const la2 = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 20), new THREE.MeshStandardMaterial({
    color: 0xffd27f, transparent: true, opacity: 0.45, depthWrite: false, roughness: 0.2,
  }));
  la2.applyMatrix4(new THREE.Matrix4().makeBasis(P.u, P.b, P.mz));
  la2.position.copy(T2);
  la2.scale.copy(boyut);
  la2.renderOrder = 4;
  return { hedef2, la2 };
}

function kur(anat, isaretler) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, PROB, KESIT, ORGAN } = RENK;
  const TURUNCU = '#ffb03f';

  // Pektoralis minörün serratus anteriorun üzerine bindiği yer, 3.–4. kaburga üzerinde (ön aksiller çizgiye yakın)
  const pmi = a.verts(PMI);
  const kab = [...a.verts(K3), ...a.verts(K4)];
  const yakinMi = (v, dizi, r, adim) => { for (let i = 0; i < dizi.length; i += adim) if (dizi[i].distanceToSquared(v) < r * r) return true; return false; };
  const ortak = a.verts(SA).filter((v, i) => i % 2 === 0 && yakinMi(v, pmi, 0.012, 2) && yakinMi(v, kab, 0.015, 3));
  const H0 = centroid(ortak) || a.merkez(PMI);
  let R4 = kab[0];
  for (const k of kab) if (k.distanceToSquared(H0) < R4.distanceToSquared(H0)) R4 = k;

  // Prob: ön-yan göğüs duvarında oblik; uzun eksen kraniyal-medial ↔ kaudal-lateral (aksillaya doğru), iğne kraniyal-medial uçtan
  const uIpucu = new THREE.Vector3(0.4, 1, 0).normalize();
  const P1 = a.probYerlestir(H0, new THREE.Vector3(-0.45, 0.1, 1), uIpucu, { bas: 0.12, enCokDer: 25 });
  const P = a.probYerlestir(H0, P1.n, uIpucu, { bas: 0.12, enCokDer: 3 });
  const { S, n, b, u } = P;
  const kesit = a.kesitci(P, { derinlik: 0.07, yariGenislik: 0.03 });

  // Merkez çizgisi boyunca katman derinlikleri
  const dPmj = a.derinlikler(P, PMJ[1], { genislik: 0.006 }) || a.derinlikler(P, PMJ[0], { genislik: 0.006 });
  const dPmi = a.derinlikler(P, PMI, { genislik: 0.006 });
  const dSa = a.derinlikler(P, SA, { genislik: 0.006 }) || a.derinlikler(P, SA, { genislik: 0.012, tol: 0.007 });
  const dK4 = a.derinlikler(P, K4, { genislik: 0.01 }) || a.derinlikler(P, K3, { genislik: 0.01 });
  const derin = (d) => S.clone().addScaledVector(b, d);
  const Pmj = dPmj ? derin((dPmj.ust + dPmj.alt) / 2) : kesit(PMJ);
  const Pmi = dPmi ? derin((dPmi.ust + dPmi.alt) / 2) : kesit(PMI);
  const Sa = dSa ? derin((dSa.ust + dSa.alt) / 2) : kesit(SA);
  const Kb = kesit([K3, K4], 0.004);
  const Pl = kesit('Pleura', 0.004);
  const Pdal = kesit(PDAL, 0.006);
  const Lpn = kesit(LPN, 0.006);

  // Hedefler: 1) derin — pektoralis minör ile serratus anterior arası (4. kaburga üzerinde)
  //           2) yüzeyel — pektoralis majör ile pektoralis minör arası (PECS I planı)
  const tDerin = dPmi && dSa ? (dPmi.alt + dSa.ust) / 2 : dPmi ? dPmi.alt + 0.002 : dK4 ? dK4.ust - 0.006 : 0.025;
  const tYuz = dPmj && dPmi ? (dPmj.alt + dPmi.ust) / 2 : dPmj ? dPmj.alt + 0.001 : tDerin - 0.01;
  const T = derin(tDerin);
  const T2 = derin(tYuz);
  const ig = a.igneYolu(P, T, { aci: 45, enCok: 0.03 });
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;
  const derinCm = tDerin * 100;
  const yuzCm = tYuz * 100;

  // Yüzey işaretleri: klavikula lateral üçte biri ve korakoid (taramanın başladığı infraklaviküler bölge)
  const klav = a.verts('Clavicler');
  const klavMinX = Math.min(...klav.map((v) => v.x)), klavMaxX = Math.max(...klav.map((v) => v.x));
  const klavLat = a.merkez('Clavicler', (v) => Math.abs(v.x - (klavMinX + (klavMaxX - klavMinX) / 3)) < 0.008);
  const klavDeri = klavLat && a.deriVur(klavLat.clone().add(new THREE.Vector3(0, 0.03, 0.12)), new THREE.Vector3(0, -0.25, -1).normalize())?.p;
  const kor = isaretler?.korakoid ? new THREE.Vector3(...isaretler.korakoid) : null;
  const korDeri = kor && a.deriVur(kor.clone().add(new THREE.Vector3(0, 0.02, 0.12)), new THREE.Vector3(0, -0.15, -1).normalize())?.p;

  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.05,
    la: { merkez: T.clone(), boyut: new THREE.Vector3(0.018, 0.0028, 0.016) },
    isaretler: [[klavDeri, 0xffe14d], [korDeri, 0xffe14d], [S, 0x35e07a]],
  });
  const { hedef2, la2 } = ikinciHedef(P, T2, new THREE.Vector3(0.016, 0.0024, 0.014));
  grup.add(hedef2, la2);
  objects.hedef2 = hedef2;
  objects.la2 = la2;

  // ---- Kameralar: hastanın sağ ön-yanından ----
  const genel = kamera(S.clone().add(new THREE.Vector3(0.04, 0.02, 0)), new THREE.Vector3(-0.45, 0.3, 1), 0.55);
  const orta = kamera(T.clone(), new THREE.Vector3(-0.5, 0.3, 0.85), 0.3);
  // yakın: kesit düzlemine olabildiğince karşıdan (düzlem normali + biraz deri normali)
  const yakin = kamera(T.clone().lerp(S, 0.35), P.mz.clone().multiplyScalar(0.75).add(n.clone().multiplyScalar(0.6)), 0.24);

  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.04).addScaledVector(u, -0.019);
  const odak = [...PMJ, PMI, SA, ...SINIRLER, PDAL, 'Thoraco-acromial_arteryr', 'Lateral_thoracic_arteryr', 'Thoracodorsal_arteryr'];
  const katmanYakin = { deri: 0.25, kas: 0.45, sinir: 1, arter: 0.9, ven: 0.5, kemik: 0.6, organ: 0.1 };

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: 'Hasta sırtüstü, kol 90° abdüksiyonda. Prob önce klavikulanın lateral üçte birinin altına konur; pektoralis majör, minör ve torakoakromiyal arterin pektoral dalı bulunur. Sonra kaburgalar sayılarak ön aksiller çizgiye doğru, 3.–4. kaburga seviyesine kaydırılır. Kaynak modelde kol gövdeye yapışık olduğundan kol modelden çıkarılmıştır.',
      katman: { deri: 1, kemik: 0.8 },
      vurgu: [K3, K4, 'Clavicler'],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['Klavikula lateral üçte biri:\nbaşlangıç noktası', klavDeri, SARI, 0.02, 0.08],
        ['Korakoid', korDeri, SARI, -0.09, 0.02],
        ['Prob yeri: 3.–4. kaburga,\nön aksiller çizgiye yakın', S, PROB, 0.08, -0.06],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Göğüs duvarının kas planları',
      metin: 'Ön-yan göğüs duvarında yüzeyelden derine pektoralis majör, pektoralis minör ve serratus anterior bulunur. Lateral ve medial pektoral sinirler iki pektoral kas arasındaki planda ilerler (PECS I\'in hedefi). İnterkostal sinirlerin lateral kutanöz dalları, uzun torasik ve torakodorsal sinirler serratus anteriorun yüzeyindeki plana ulaşır (PECS II\'nin ikinci, derin enjeksiyonu). İnterkostobrakiyal sinir bu modelde ayrı çizilmemiştir.',
      katman: { deri: 0.3, kas: 0.7, sinir: 1, arter: 1, ven: 0.4, kemik: 0.8, organ: 0.1 },
      vurgu: [LPN, MPN],
      odak,
      goster: [],
      etiket: etiketler(orta, [
        ['Pektoralis majör', a.merkez(PMJ[1], (v) => v.distanceTo(T) < 0.04), KAS],
        ['Pektoralis minör', a.merkez(PMI), KAS],
        ['Serratus anterior', a.merkez(SA, (v) => v.distanceTo(T) < 0.05 && v.x < T.x), KAS],
        ['Lateral pektoral sinir', a.merkez(LPN, (v) => v.distanceTo(T) < 0.05), SARI],
        ['Torakoakromiyal arter\npektoral dalı', a.merkez(PDAL), KIRMIZI],
        ['Uzun torasik sinir', a.merkez('Long_thoracic_nerver', (v) => v.distanceTo(T) < 0.06), SARI],
      ], { olcek: 0.6, uzaklik: 0.05 }),
      etiketOlcek: 0.6,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: 'Ön aksiller çizgiye yakın oblik kesitte en üstte pektoralis majör, altında pektoralis minör, onun altında serratus anterior ve 3.–4. kaburgalar (parlak çizgi ve akustik gölge) görülür; kaburgaların arasında derinde plevra parlak, solunumla kayan bir hattır. İki pektoral kas arasındaki planda torakoakromiyal arterin pektoral dalı renkli Doppler ile bulunur.',
      katman: katmanYakin,
      vurgu: [PMI, SA],
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['Pektoralis majör', Pmj, KAS],
        ['Pektoralis minör', Pmi, KAS],
        ['Serratus anterior', Sa, KAS],
        ['Kaburga', Kb, KEMIK],
        ['Plevra', Pl, ORGAN],
        ['Pektoral dal (arter)', Pdal, KIRMIZI],
      ], { olcek: 0.45, uzaklik: 0.04 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: 'Lineer prob ön aksiller çizgiye yakın, 3.–4. kaburgalar üzerinde oblik konur: kaudal-lateral ucu aksillaya doğru bakar. Prob işareti iğnenin gireceği kraniyal-medial uca çevrilir. Üç kas katmanı, kaburgalar ve plevra aynı görüntüde olmalıdır.',
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit'],
      etiket: etiketler(yakin, [
        ['Lineer prob', probUst, BEYAZ],
        ['Prob işareti → kraniyal-medial', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['Pektoralis minör', Pmi, KAS],
      ], { olcek: 0.45, uzaklik: 0.04 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, kraniyal-medialden kaudal-laterale. İğne önce pektoralis minör ile serratus anterior arasındaki plana, 4. kaburganın üzerine ilerletilir (derin enjeksiyon). Sonra geri çekilerek pektoralis majör ile minör arasına ikinci enjeksiyon yapılır (yüzeyel enjeksiyon = PECS I planı). Kaburga, iğnenin plevraya ilerlemesine karşı dayanak olarak kullanılır. Bu modelde giriş–derin hedef ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}°; derin plan ≈ ${fmt(derinCm)} cm, yüzeyel plan ≈ ${fmt(yuzCm)} cm derinde.`,
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef', 'hedef2'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm ötesi`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['1. derin: minör–serratus arası', T, CAMGOBEGI],
        ['2. yüzeyel: majör–minör arası', T2, TURUNCU],
      ], { olcek: 0.45, uzaklik: 0.04 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'Derin enjeksiyon serratus anteriorun yüzeyinde yayılarak interkostal sinirlerin lateral kutanöz dallarını (yaklaşık T2–T6, değişken), interkostobrakiyal, uzun torasik ve torakodorsal sinirleri etkiler; yüzeyel enjeksiyon pektoral sinirleri bloke eder. Meme cerrahisi ve göğüs ön-yan duvarı girişimlerinde analjezi sağlar; sternum çevresi (ön dallar) ve viseral ağrı karşılanmaz. İki enjeksiyonun toplamı hacimli olduğundan lokal anestezik dozu hesaplanmalıdır.',
      katman: katmanYakin,
      vurgu: [LPN, MPN],
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la', 'la2'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Derin: minör ile serratus arası', T, CAMGOBEGI],
        ['Yüzeyel: majör ile minör arası', T2, TURUNCU],
        ['Serratus anterior', Sa, KAS],
      ], { olcek: 0.45, uzaklik: 0.04 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, derinCm, yuzCm, girisProbKenariCm,
    katmanlarCm: [dPmj, dPmi, dSa, dK4].map((d) => d && [+(d.ust * 100).toFixed(1), +(d.alt * 100).toFixed(1)]),
    metin: `yüzeyel plan (majör–minör) ≈ ${fmt(yuzCm)} cm, derin plan (minör–serratus) ≈ ${fmt(derinCm)} cm, giriş–derin hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°`,
    kesitBulundu: { pektoralisMajor: !!dPmj, pektoralisMinor: !!dPmi, serratus: !!dSa, kaburga: !!Kb, plevra: !!Pl },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, T2, H0, R4, Pmj, Pmi, Sa, Kb, Pl, Pdal, Lpn } };
}
