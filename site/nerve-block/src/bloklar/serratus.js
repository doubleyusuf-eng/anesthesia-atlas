// Serratus anterior plan bloğu (orta aksiller çizgi, 5. kaburga; derin yaklaşım: serratus ile kaburga arası)
import * as THREE from 'three';
import { Arac, fmt, RENK, etiketKurucu, etiketler, kamera } from '../blok.js';

export default {
  id: 'serratus',
  ad: 'Serratus anterior plan bloğu',
  kisa: 'Serratus',
  grup: 'Gövde',
  bolge: 'gogus',
  yatis: 'sirtustu',
  kur,
};

const SA = 'Serratus_anterior_muscler';
const LD = 'Latissimus_dorsi_muscler';
const K5 = 'Fifth_ribr';
const ICK = ['External_intercostal_musclesr', 'Internal_intercostal_musclesr'];
const TDA = 'Thoracodorsal_arteryr';
const LTA = 'Lateral_thoracic_arteryr';
const SINIRLER = ['Intercostal_nervesr', 'Long_thoracic_nerver', 'Thoracodorsal_nerver'];

function kur(anat) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, PROB, KESIT, ORGAN } = RENK;
  const TURUNCU = '#ffb03f';

  // 5. kaburganın en lateral noktası (orta aksiller çizgi) ve çevresi
  const k5 = a.verts(K5);
  const Lm = k5.reduce((m, v) => (v.x < m.x ? v : m));
  const disari0 = new THREE.Vector3(-1, 0, 0.2).normalize();
  const probKur = (H) => {
    const ry = a.dogrultu(K5, H, 0.02) || new THREE.Vector3(0, -0.6, 0.8);
    const P1 = a.probYerlestir(H, disari0, new THREE.Vector3(0, 1, 0), { bas: 0.12, enCokDer: 25 });
    // prob kaburgaya dik: uzun eksen ön-üst ↔ arka-alt; iğne ön-üst uçtan
    let uI = ry.clone().cross(P1.n).normalize();
    if (uI.y < 0) uI.negate();
    return a.probYerlestir(H, P1.n, uI, { bas: 0.12, enCokDer: 3 });
  };
  // Prob iki ucunun da deriye oturduğu (aksilla boşluğuna taşmayan) ilk aday: lateral uçtan öne doğru
  const deriVar = (Q, s) => {
    const p = Q.S.clone().addScaledVector(Q.u, s);
    const h = a.deriVur(p.clone().addScaledVector(Q.n, 0.05), Q.b);
    return !!h && h.p.distanceTo(p) < 0.012;
  };
  const adaylar = k5.filter((v) => v.x < Lm.x + 0.012 && v.z >= Lm.z - 0.005).sort((p, q) => p.z - q.z);
  let P = null, H0 = Lm;
  for (let i = 0; i < adaylar.length; i += Math.max(1, Math.floor(adaylar.length / 40))) {
    const Q = probKur(adaylar[i]);
    if (deriVar(Q, 0.024) && deriVar(Q, -0.024) && a.deriVur(Q.S.clone().addScaledVector(Q.n, 0.05), Q.b)) { P = Q; H0 = adaylar[i]; break; }
  }
  if (!P) P = probKur(Lm);
  const { S, n, b, u, mz } = P;
  const kesit = a.kesitci(P, { derinlik: 0.05, yariGenislik: 0.03 });

  const gen = { genislik: 0.012, tol: 0.006 };
  const dSa = a.derinlikler(P, SA, { genislik: 0.006 }) || a.derinlikler(P, SA, gen);
  const dLd = a.derinlikler(P, LD, gen);
  const dK5 = a.derinlikler(P, K5, { genislik: 0.008 });
  const derin = (d) => S.clone().addScaledVector(b, d);
  const Sa = dSa ? derin((dSa.ust + dSa.alt) / 2) : kesit(SA);
  const Ld = dLd ? derin((dLd.ust + dLd.alt) / 2) : kesit(LD, 0.004);
  const Kb = dK5 ? derin(dK5.ust + 0.003) : kesit(K5);
  const Ic = kesit(ICK, 0.004, (v, d) => Math.abs(d.dot(u)) > 0.008);
  const Pl = kesit('Pleura', 0.004);
  const Tda = kesit(TDA, 0.008);

  // Hedef (derin SAP): serratus anteriorun derin yüzü ile 5. kaburga arası
  const tDerin = dSa && dK5 ? (dK5.ust > dSa.alt ? (dSa.alt + dK5.ust) / 2 : dK5.ust - 0.0015) : dK5 ? dK5.ust - 0.0015 : 0.015;
  // Yüzeyel SAP: serratusun yüzeyi (latissimus varsa onunla arası)
  const tYuz = dSa ? (dLd && dLd.alt < dSa.ust ? (dLd.alt + dSa.ust) / 2 : dSa.ust - 0.0015) : tDerin - 0.006;
  const T = derin(tDerin);
  const T2 = derin(tYuz);
  const ig = a.igneYolu(P, T, { aci: 45, enCok: 0.03 });
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;
  const derinCm = tDerin * 100;
  const yuzCm = tYuz * 100;

  const hedef2 = new THREE.Mesh(new THREE.SphereGeometry(0.002, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffb03f, depthTest: false, transparent: true }));
  hedef2.position.copy(T2);
  hedef2.renderOrder = 18;

  // Yüzey işaretleri: 5. kaburganın lateral kısmı ve aksilla tepesi (orta aksiller çizginin başladığı yer)
  // 5. kaburganın H0'ın ~4 cm önündeki kısmı (kemik üzerinde etiket için)
  const k5On = k5.filter((v) => Math.abs(v.z - (H0.z + 0.04)) < 0.004);
  const k5Nokta = k5On.length ? k5On.reduce((m, v) => (v.x < m.x ? v : m)) : H0;

  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.045,
    la: { merkez: T.clone(), boyut: new THREE.Vector3(0.022, 0.0026, 0.02) },
    isaretler: [[S, 0x35e07a]],
  });
  grup.add(hedef2);
  objects.hedef2 = hedef2;

  // ---- Kameralar: hastanın sağ yanından ----
  const genel = kamera(S.clone().add(new THREE.Vector3(0.02, 0.03, 0)), new THREE.Vector3(-1, 0.2, 0.45), 0.55);
  const orta = kamera(T.clone(), new THREE.Vector3(-1, 0.15, 0.55), 0.3);
  let yy = mz.clone();
  if (yy.z < 0) yy.negate();
  const yakin = kamera(T.clone().lerp(S, 0.35), yy.multiplyScalar(0.75).add(n.clone().multiplyScalar(0.6)), 0.22);

  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.038).addScaledVector(u, -0.019);
  const odak = [SA, LD, ...ICK, ...SINIRLER, TDA, LTA, 'Thoracodorsal_veinr', 'Lateral_thoracic_veinr'];
  const katmanYakin = { deri: 0.25, kas: 0.5, sinir: 1, arter: 0.9, ven: 0.6, kemik: 0.7, organ: 0.1 };

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: 'Hasta sırtüstü (kol abdüksiyonda) ya da yan yatar. Kaburgalar önden sayılır; prob orta aksiller çizgide 5. kaburga üzerine konacak. Kaynak modelde kol gövdeye yapışık olduğundan kol modelden çıkarılmıştır (yandaki boşluk aksilladır); prob bu nedenle aksillanın hemen altında, orta aksiller çizginin biraz önündedir.',
      katman: { deri: 1, kemik: 0.8 },
      vurgu: [K5],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['5. kaburga', k5Nokta, KEMIK, 0.07, -0.05],
        ['Prob yeri: orta aksiller çizgi,\n5. kaburga', S, PROB, -0.02, 0.08],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Göğüs yan duvarının katmanları',
      metin: 'Serratus anterior üst 8–9 kaburgadan başlayıp skapulanın medial kenarına uzanır; arkada üzerini latissimus dorsi örter. İnterkostal sinirlerin (yaklaşık T2–T9) lateral kutanöz dalları orta aksiller çizgide interkostal kasları delip serratusun derininden yüzeyine geçer. Uzun torasik sinir ve lateral torasik arter serratusun yüzeyinde iner; torakodorsal sinir ve arter latissimus ile serratus arasındadır. İnterkostobrakiyal sinir modelde ayrı çizilmemiştir.',
      katman: { deri: 0.3, kas: 0.7, sinir: 1, arter: 1, ven: 0.5, kemik: 0.9, organ: 0.1 },
      vurgu: SINIRLER,
      odak,
      goster: [],
      etiket: etiketler(orta, [
        ['Serratus anterior', a.merkez(SA, (v) => v.distanceTo(T) < 0.04), KAS],
        ['Latissimus dorsi', a.merkez(LD, (v) => v.distanceTo(T) < 0.07), KAS],
        ['5. kaburga', H0, KEMIK],
        ['Uzun torasik sinir', a.merkez('Long_thoracic_nerver', (v) => v.distanceTo(T) < 0.05), SARI],
        ['Torakodorsal arter', a.merkez(TDA), KIRMIZI],
        ['İnterkostal sinirler', a.merkez('Intercostal_nervesr', (v) => v.distanceTo(T) < 0.03), SARI],
      ], { olcek: 0.6, uzaklik: 0.05 }),
      etiketOlcek: 0.6,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: 'Orta aksiller çizgide yüzeyelden derine: deri altı doku, (daha arkada) latissimus dorsi, serratus anterior, ardından kaburgalar (parlak çizgi ve akustik gölge) ile aralarındaki interkostal kaslar; en derinde plevra parlak, solunumla kayan bir hattır. Torakodorsal arter latissimus–serratus planının Doppler işaretidir.',
      katman: katmanYakin,
      vurgu: [SA],
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['Serratus anterior', Sa, KAS],
        ['5. kaburga', Kb, KEMIK],
        ['İnterkostal kaslar', Ic, KAS],
        ['Plevra', Pl, ORGAN],
        ...(Ld ? [['Latissimus dorsi', Ld, KAS]] : []),
      ], { olcek: 0.45, uzaklik: 0.035 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: 'Lineer prob orta aksiller çizgide, 5. kaburganın üzerinde, kaburgaya dik (ön-üst ↔ arka-alt doğrultusunda) konur; prob işareti iğnenin gireceği ön-üst uca bakar. Serratus anterior, kaburga ve plevra aynı görüntüde olmalıdır.',
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit'],
      etiket: etiketler(yakin, [
        ['Lineer prob', probUst, BEYAZ],
        ['Prob işareti → ön-üst', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['Serratus anterior', Sa, KAS],
      ], { olcek: 0.45, uzaklik: 0.035 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, ön-üstten arka-alta. Derin yaklaşımda iğne serratus anterioru geçip 5. kaburganın yüzeyine değene dek ilerletilir; ilaç serratus ile kaburga arasına verilir. Kaburga, iğnenin plevraya ilerlemesine karşı dayanak olur. Yüzeyel yaklaşımda hedef serratusun yüzeyi (latissimus ile arası) olur. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}°; derin plan ≈ ${fmt(derinCm)} cm, yüzeyel plan ≈ ${fmt(yuzCm)} cm derinde.`,
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef', 'hedef2'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm ötesi`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Derin: serratus–kaburga arası', T, CAMGOBEGI],
        ['Yüzeyel: serratusun yüzeyi', T2, TURUNCU],
      ], { olcek: 0.45, uzaklik: 0.035 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'İlaç serratus anteriorun derininde (ya da yüzeyinde) kraniyal-kaudal yönde yayılır ve interkostal sinirlerin lateral kutanöz dallarını (yaklaşık T2–T9, değişken) etkiler: göğüs yan duvarı için analjezi (kaburga kırıkları, meme cerrahisi, torakoskopi). Ön dallar (sternum çevresi) ve viseral ağrı genellikle karşılanmaz. Hacimli bir plan bloğu olduğundan toplam lokal anestezik dozu hesaplanmalıdır.',
      katman: katmanYakin,
      vurgu: [SA],
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik\nserratus ile kaburga arasında', T, CAMGOBEGI],
        ['Serratus anterior', Sa, KAS],
        ['5. kaburga', Kb, KEMIK],
      ], { olcek: 0.45, uzaklik: 0.035 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, derinCm, yuzCm, girisProbKenariCm,
    katmanlarCm: [dLd, dSa, dK5].map((d) => d && [+(d.ust * 100).toFixed(1), +(d.alt * 100).toFixed(1)]),
    metin: `serratus–kaburga (derin) planı ≈ ${fmt(derinCm)} cm, serratus yüzeyi ≈ ${fmt(yuzCm)} cm, giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°`,
    kesitBulundu: { serratus: !!dSa, kaburga: !!dK5, interkostal: !!Ic, plevra: !!Pl },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, T2, H0, Lm, Sa, Ld, Kb, Ic, Pl, Tda, k5Nokta } };
}
