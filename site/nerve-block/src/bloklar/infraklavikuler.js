// İnfraklaviküler brakiyal pleksus bloğu (lateral sagital yaklaşım: korakoidin medialinde, kordlar aksiller arterin çevresinde)
import * as THREE from 'three';
import { Arac, V, fmt, RENK, etiketKurucu, etiketler, kamera } from '../blok.js';

export default {
  id: 'infraklavikuler',
  ad: 'İnfraklaviküler blok',
  kisa: 'İnfraklaviküler',
  grup: 'Üst ekstremite',
  bolge: 'gogus',
  yatis: 'sirtustu',
  kur,
};

const ART = 'Axillary_arteryr';
const VEN = 'Axillary_veinr';
const PK = 'Posterior_cord_of_brachial_plexusr';
const MED = 'Median_nerver';
const ULN = 'Ulnar_nerver';
const KORDLAR = [PK, MED, ULN, 'Radial_nerver', 'Axillary_nerver',
  'Anterior_division_of_superior_trunk_of_brachial_plexusr', 'Posterior_division_of_superior_trunk_of_brachial_plexusr',
  'Anterior_division_of_middle_trunk_of_brachial_plexusr', 'Posterior_division_of_middle_trunk_of_brachial_plexusr',
  'Anterior_division_of_inferior_trunk_of_brachial_plexusr', 'Posterior_division_of_inferior_trunk_of_brachial_plexusr'];
const PMJ = ['Clavicular_head_of_pectoralis_major_muscler', 'Sternocostal_head_of_pectoralis_major_muscler'];
const PMI = 'Pectoralis_minor_muscler';
const KLAV = 'Clavicler';

function kur(anat, isaretler) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, MAVI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, PROB, KESIT, ORGAN } = RENK;

  // Korakoid çıkıntı (kemik işareti) ve parasagital kesit seviyesi: korakoidin ~2 cm medialı
  const kor = isaretler?.korakoid ? V(isaretler.korakoid) : a.uc('Scapular', new THREE.Vector3(0, 0, 1), () => true, 0.01);
  const xP = kor.x + 0.02;
  const A0 = a.merkez(ART, (v) => Math.abs(v.x - xP) < 0.004);

  // Prob: klavikulanın altında parasagital; uzun eksen kraniyal-kaudal, iğne kraniyal uçtan.
  // Önce deri normali bulunur, sonra prob arterin tam üstüne (normal doğrultusunda) ortalanır.
  const yukari = new THREE.Vector3(0, 1, 0);
  const P1 = a.probYerlestir(A0, new THREE.Vector3(0, 0.1, 1), yukari, { bas: 0.12, enCokDer: 15 });
  let P = a.probYerlestir(A0, P1.n, yukari, { bas: 0.12, enCokDer: 3 });
  // Probun kraniyal ucu klavikulanın kaudal kenarının altında kalmalı: gerekirse prob kaudale kaydırılır
  const klavKenar = (Q) => {
    const us = a.verts(KLAV).map((v) => v.clone().sub(Q.S)).filter((d) => Math.abs(d.dot(Q.mz)) < 0.01).map((d) => d.dot(Q.u));
    return us.length ? Math.min(...us) : Infinity;
  };
  const kayma = 0.021 - (klavKenar(P) - 0.004);
  if (kayma > 0) P = a.probYerlestir(A0.clone().addScaledVector(P.u, -kayma), P.n, yukari, { bas: 0.12, enCokDer: 3 });
  const { S, n, b, u, mz } = P;
  const kesit = a.kesitci(P, { derinlik: 0.07, yariGenislik: 0.03 });
  const yakinA = (r) => (v) => v.distanceTo(A0) < r;
  const Ak = kesit(ART, 0.004) || A0;
  const Vk = kesit(VEN, 0.004, yakinA(0.03));
  const Pmj = kesit(PMJ, 0.004);
  const Pmi = kesit(PMI, 0.004);
  const Pkk = kesit(PK, 0.005, yakinA(0.03));
  const Mk = kesit(MED, 0.005, yakinA(0.03));
  const Uk = kesit(ULN, 0.005, yakinA(0.03));
  const Pl = kesit('Pleura', 0.004);
  const Kb = kesit(['Second_ribr', 'Third_ribr'], 0.004);

  // Hedef: arterin derin (posterior) kenarının ~2,5 mm ötesi ("saat 6")
  const artKesit = a.verts(ART).filter((v) => {
    const d = v.clone().sub(S);
    return Math.abs(d.dot(mz)) < 0.004 && v.distanceTo(Ak) < 0.015;
  });
  const artDerin = artKesit.length ? Math.max(...artKesit.map((v) => v.clone().sub(Ak).dot(b))) : 0.004;
  const T = Ak.clone().addScaledVector(b, artDerin + 0.0025);

  // İğne: kraniyalden in-plane; klavikulaya çarpmayan en yatık açı
  const klavMesh = anat.parts.get(KLAV);
  const klavCarpar = (E) => {
    if (!klavMesh) return false;
    const yon = T.clone().sub(E);
    const L = yon.length();
    a.ray.set(E, yon.normalize());
    const h = a.ray.intersectObject(klavMesh, false)[0];
    return !!h && h.distance < L;
  };
  let ig = null;
  for (const aci of [50, 55, 60, 65, 70, 75]) {
    ig = a.igneYolu(P, T, { aci, enAz: 0.003, enCok: 0.015 });
    if (!klavCarpar(ig.E)) break;
  }
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;
  const arterDerinlikCm = Ak.clone().sub(S).dot(b) * 100;
  const hedefDerinlikCm = T.clone().sub(S).dot(b) * 100;
  const plevraDerinlikCm = Pl ? Pl.clone().sub(S).dot(b) * 100 : null;

  // Yüzey işaretleri: korakoid ve klavikula üzerindeki deri
  const ileri = new THREE.Vector3(0, 0.2, 1).normalize();
  const korDeri = a.deriVur(kor.clone().addScaledVector(ileri, 0.12), ileri.clone().negate())?.p;
  const klavLat = a.merkez(KLAV, (v) => Math.abs(v.x - xP) < 0.006);
  const klavDeri = klavLat && a.deriVur(klavLat.clone().add(new THREE.Vector3(0, 0.04, 0.12)), new THREE.Vector3(0, -0.3, -1).normalize())?.p;

  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.065,
    la: { merkez: T.clone().lerp(Ak, 0.35), boyut: new THREE.Vector3(0.012, 0.009, 0.011) },
    isaretler: [[korDeri, 0xffe14d], [klavDeri, 0xffe14d], [S, 0x35e07a]],
  });

  // ---- Kameralar: hastanın sağ önünden; yakın görünüm parasagital kesiti yandan (lateralden) görür ----
  const genel = kamera(S.clone().add(new THREE.Vector3(0.03, -0.02, 0)), new THREE.Vector3(-0.35, 0.3, 1), 0.5);
  const orta = kamera(Ak.clone().lerp(S, 0.3), new THREE.Vector3(-0.3, 0.25, 1), 0.3);
  const yakin = kamera(Ak.clone().lerp(S, 0.4), new THREE.Vector3(-0.75, 0.2, 0.62), 0.27);

  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.055).addScaledVector(u, -0.019);
  const odak = [ART, VEN, ...KORDLAR, ...PMJ, PMI, 'Cephalic_veinr', 'Thoraco-acromial_arteryr',
    'Lateral_pectoral_nerver', 'Medial_pectoral_nerver'];
  const katmanYakin = { deri: 0.25, kas: 0.35, sinir: 1, arter: 1, ven: 0.8, kemik: 0.3, organ: 0.15 };

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: 'Hasta sırtüstü, baş karşı tarafa hafif dönük. Kol yanda kalabilir; 90° abdüksiyon pleksusu yüzeyelleştirir ve klavikuladan uzaklaştırır. Korakoid çıkıntı palpe edilir. Prob korakoidin hemen medialinde, klavikulanın altında parasagital (gövdenin uzun eksenine paralel) konacak.',
      katman: { deri: 1, kemik: 0.8 },
      vurgu: [KLAV, 'Scapular'],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['Korakoid çıkıntı', korDeri, SARI, -0.08, 0.03],
        ['Klavikula', klavDeri, SARI, -0.02, 0.07],
        ['Prob yeri: korakoidin\nmedialı, klavikulanın altı', S, PROB, 0.08, -0.03],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Kordlar ve aksiller arter',
      metin: 'İnfraklaviküler bölgede pleksus kordlar düzeyindedir. Lateral, medial ve posterior kordlar aksiller arterin 2. kısmını çevreler ve pektoralis minörün derininde yer alır; adlarını artere göre konumlarından alırlar. Aksiller ven arterin kaudal-medialindedir. Derinde kaburgalar ve plevra vardır. Bu modelde lateral ve medial kord ayrı çizilmemiştir: median ve ulnar sinirlerin başlangıç kısımları onların yerini gösterir; posterior kord modelde vardır.',
      katman: { deri: 0.3, kas: 0.5, sinir: 1, arter: 1, ven: 0.8, kemik: 0.9, organ: 0.2 },
      vurgu: [PK, MED, ULN],
      odak,
      goster: [],
      etiket: etiketler(orta, [
        ['Aksiller arter', Ak, KIRMIZI],
        ['Aksiller ven', Vk || a.merkez(VEN), MAVI],
        ['Posterior kord', a.merkez(PK), SARI],
        ['Median sinir başlangıcı\n(lateral + medial kord yerine)', a.merkez(MED, yakinA(0.03)), SARI],
        ['Pektoralis minör', a.merkez(PMI, (v) => Math.abs(v.x - xP) < 0.012), KAS],
        ['Korakoid', kor, KEMIK],
      ], { olcek: 0.6, uzaklik: 0.05 }),
      etiketOlcek: 0.6,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: 'Parasagital kesitte yüzeyelden derine pektoralis majör ve pektoralis minör görülür. Minörün altında aksiller arter kısa eksende yuvarlak ve pulsatildir; ven arterin kaudalinde, basıyla kollabe olur. Kordlar arterin çevresinde hiperekoik yapılardır: klasik olarak lateral kord arterin kraniyalinde, posterior kord derininde, medial kord arter ile ven arasındadır; bireysel farklılık sıktır. En derinde plevra solunumla kayan parlak bir hattır.',
      katman: katmanYakin,
      vurgu: [PK, MED, ULN],
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['Pektoralis majör', Pmj, KAS],
        ['Pektoralis minör', Pmi, KAS],
        ['Aksiller arter', Ak, KIRMIZI],
        ['Aksiller ven', Vk, MAVI],
        ['Posterior kord', Pkk, SARI],
        ['Ulnar sinir başlangıcı\n(medial kord yerine)', Uk, SARI],
        ['Plevra', Pl, ORGAN],
      ], { olcek: 0.45, uzaklik: 0.04 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: 'Lineer prob (iri hastada konveks gerekebilir) korakoidin hemen medialinde, klavikulanın altında parasagital konur; prob işareti kraniyale bakar. Arter kısa eksende yuvarlak görülene ve çevresindeki kordlar seçilene kadar prob hafifçe kaydırılır ve eğilir. Kordlar bu blokta derindedir; derinlik ayarı buna göre yapılır.',
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit'],
      etiket: etiketler(yakin, [
        ['Lineer prob', probUst, BEYAZ],
        ['Prob işareti → kraniyal', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['Aksiller arter', Ak, KIRMIZI],
      ], { olcek: 0.45, uzaklik: 0.04 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, kraniyalden kaudale: iğne klavikulanın hemen altından, probun kraniyal ucundan girer; derin hedef nedeniyle açı yüzeyel bloklardakinden diktir. Pektoralis majör ve minör geçilir; uç arterin arkasına ("saat 6" yönü) ilerletilir. Hedef derin olduğundan iğne ucu her an görülmeli; plevraya doğru ilerletilmez. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}°, arter derinliği ≈ ${fmt(arterDerinlikCm)} cm.`,
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm kraniyali`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Hedef: arterin arkası\n("saat 6")', T, CAMGOBEGI],
        ['Aksiller arter', Ak, KIRMIZI],
        ['Plevra', Pl, ORGAN],
      ], { olcek: 0.45, uzaklik: 0.04 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'Arterin arkasına yapılan tek enjeksiyonla ilaç çoğu zaman arterin çevresinde "U" biçiminde yayılır ve üç kordu birlikte sarar. Yayılım yetersizse iğne lateral ve medial kord çevresine yeniden yönlendirilebilir. Aspirasyon ve küçük bölünmüş dozlarla enjeksiyon; damar içi enjeksiyon ve (düşük de olsa) pnömotoraks riski unutulmamalı. Diyafram felci interskalen ve supraklavikülere göre daha seyrektir. İlaç ve hacim kurum protokolüne göre belirlenir.',
      katman: katmanYakin,
      vurgu: [PK, MED, ULN],
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik\narterin arkasında "U" biçiminde', T, CAMGOBEGI],
        ['Aksiller arter', Ak, KIRMIZI],
        ['Posterior kord', Pkk, SARI],
      ], { olcek: 0.45, uzaklik: 0.04 }),
      etiketOlcek: 0.45,
      kamera: yakin,
    },
  ];

  const olcum = {
    kaymaCm: Math.max(0, kayma) * 100,
    derinlikCm, aciDer, arterDerinlikCm, hedefDerinlikCm, plevraDerinlikCm, girisProbKenariCm,
    metin: `aksiller arter derinliği ≈ ${fmt(arterDerinlikCm)} cm, hedef (arterin arkası) ≈ ${fmt(hedefDerinlikCm)} cm, giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°`,
    kesitBulundu: { arter: !!kesit(ART, 0.004), ven: !!Vk, posteriorKord: !!Pkk, ulnar: !!Uk, pektoralisMajor: !!Pmj, pektoralisMinor: !!Pmi, plevra: !!Pl },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, A0, Ak, Vk, Pkk, Mk, Uk, Pmj, Pmi, Pl, Kb, kor } };
}
