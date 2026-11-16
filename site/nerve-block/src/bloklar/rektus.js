// Rektus kılıf bloğu (göbek hizası; rektus abdominisin arka yüzü ile arka rektus kılıfı arası)
import * as THREE from 'three';
import { Arac, fmt, RENK, etiketKurucu, etiketler, kamera } from '../blok.js';

export default {
  id: 'rektus',
  ad: 'Rektus kılıf bloğu',
  kisa: 'Rektus kılıf',
  grup: 'Gövde',
  bolge: 'karin',
  yatis: 'sirtustu',
  katmanAdlari: { fasya: 'Transversalis fasya', kemik: 'Kemik ve linea alba' },
  kur,
};

const RA = 'Rectus_abdominis_muscler';
const EO = 'External_abdominal_oblique_muscler';
const IO = 'Internal_abdominal_oblique_muscler';
const TA = 'Transversus_abdominis_muscler';
const SINIR = 'Intercostal_nervesr';
const IEA = 'Inferior_epigastric_arteryr';
const IEV = 'Inferior_epigastric_veinr';
const SEA = 'Superior_epigastric_arteryr';
const LA = 'Linea_alba';

function kur(anat, isaretler) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, MAVI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, ORGAN, PROB, KESIT } = RENK;

  // Göbek (bölge modelinin işaret dosyasından) ve orta hat
  const gobek = new THREE.Vector3(...isaretler.gobek);
  const xOrta = gobek.x;
  // Seviye: göbek hizası (T10 dermatomu); modelde bir interkostal ön dal bu seviyede rektusun arkasına girer
  const yL = gobek.y + 0.004;
  const ra = a.verts(RA).filter((v) => Math.abs(v.y - yL) < 0.004);
  const raLat = Math.min(...ra.map((v) => v.x));
  const raMed = Math.max(...ra.map((v) => v.x));
  const xc = (raLat + raMed) / 2;
  const raMerkez = a.merkez(RA, (v) => Math.abs(v.y - yL) < 0.004 && Math.abs(v.x - xc) < 0.006);

  // Prob: göbek hizasında, rektusun ortasında transvers; iğne lateral uçtan (lateralden mediale)
  const P = a.probYerlestir(raMerkez, new THREE.Vector3(0, 0, 1), new THREE.Vector3(-1, 0, 0), { bas: 0.12, enCokDer: 15 });
  const { S, n, b, u } = P;
  const kesit = a.kesitci(P, { derinlik: 0.06 });
  const dRA = a.derinlikler(P, RA), dTA = a.derinlikler(P, TA), dIO = a.derinlikler(P, IO), dEO = a.derinlikler(P, EO);
  const derin = (d) => S.clone().addScaledVector(b, d);
  // Hedef: kasın arka yüzünün ~1 mm derini (arka kılıfın hemen üstü)
  const raAlt = dRA ? dRA.alt : 0.03;
  const kilifUst = dTA && dTA.ust > raAlt ? dTA.ust : raAlt + 0.004;
  const tD = Math.min(raAlt + 0.0012, (raAlt + kilifUst) / 2);
  const T = derin(tD);
  const ig = a.igneYolu(P, T, { aci: 45, enCok: 0.02 });
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;

  // Kesitteki yapılar
  const raK = dRA ? derin((dRA.ust + dRA.alt) / 2) : kesit(RA);
  const onKilif = dRA ? derin(Math.max(0.003, dRA.ust - 0.001)).addScaledVector(u, -0.006) : null;
  const arkaKilif = dTA ? derin((raAlt + dTA.alt) / 2).addScaledVector(u, 0.008) : null;
  const sinirK = kesit(SINIR, 0.004, (v, d) => Math.abs(d.dot(b) - tD) < 0.012);
  const arterK = kesit([IEA, SEA], 0.004, (v, d) => d.dot(b) > raAlt - 0.012);
  const bagirsakK = kesit('Jejunum', 0.004, (v, d) => d.dot(b) > kilifUst);

  // Arkuat çizgi: prob hizasında aşağı inerken TA'nın rektusun arkasından öne geçtiği ilk seviye
  let yArk = null;
  for (let y = yL; y > yL - 0.16; y -= 0.004) {
    const serit = (nm) => a.verts(nm).filter((v) => Math.abs(v.y - y) < 0.003 && Math.abs(v.x - xc) < 0.006);
    const r = serit(RA);
    if (r.length < 3) continue;
    const raArka = Math.min(...r.map((v) => v.z));
    const arkada = serit(TA).filter((v) => v.z < raArka + 0.001).length + serit(IO).filter((v) => v.z < raArka + 0.001).length;
    if (!arkada) { yArk = y; break; }
  }
  const arkuatCm = yArk === null ? null : (gobek.y - yArk) * 100;
  const arkuatNokta = yArk === null ? null : a.merkez(RA, (v) => Math.abs(v.y - yArk) < 0.003 && Math.abs(v.x - xc) < 0.006);

  // Yüzey işaretleri
  const ileri = new THREE.Vector3(0, 0, -1);
  const gobekDeri = a.deriVur(gobek.clone().add(new THREE.Vector3(0, 0, 0.1)), ileri)?.p;
  const albaDeri = a.deriVur(new THREE.Vector3(xOrta, yL + 0.07, gobek.z + 0.1), ileri)?.p;
  const semiDeri = a.deriVur(new THREE.Vector3(raLat, yL, gobek.z + 0.1), ileri)?.p;

  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.05,
    la: { merkez: T.clone(), boyut: new THREE.Vector3(0.016, 0.0024, 0.022) },
    isaretler: [[gobekDeri, 0xffe14d], [albaDeri, 0xffe14d], [semiDeri, 0xffe14d], [S, 0x35e07a]],
  });

  // ---- Kameralar: önden, hastanın sağından ----
  const genel = kamera(gobek.clone().add(new THREE.Vector3(-0.02, 0.0, 0)), new THREE.Vector3(-0.3, 0.25, 0.92), 0.5);
  const orta = kamera(T.clone().add(new THREE.Vector3(0.005, -0.015, 0)), new THREE.Vector3(-0.55, -0.2, 0.81), 0.27);
  const yakin = kamera(T.clone().lerp(S, 0.35), new THREE.Vector3(-0.3, 0.65, 0.7), 0.15);

  const probUst = S.clone().addScaledVector(n, 0.05);
  const probKam = kamera(T.clone().lerp(S, 0.35), new THREE.Vector3(-0.3, 0.65, 0.7), 0.24);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.045).addScaledVector(u, -0.019);
  const odak = [RA, EO, IO, TA, SINIR, IEA, IEV, SEA, 'Superior_epigastric_veinsr'];
  const katmanYakin = { deri: 0.25, kas: 0.55, fasya: 0.4, sinir: 1, arter: 0.9, ven: 0.8, kemik: 0.7, bag: 0.6, organ: 0.18 };
  const arkuatMetin = arkuatCm === null ? '' : ` Bu modelde arkuat çizgi göbeğin ≈ ${fmt(arkuatCm)} cm altında.`;

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: 'Hasta sırtüstü. Göbek ve orta hat (linea alba) bulunur; rektus abdominis orta hattın iki yanında, lateral kenarı (linea semilunaris) ile sınırlanır. Prob göbek hizasında, orta hattın lateralinde rektusun üzerine transvers konacak. Blok T7–T11 ön dallarını hedefler; göbek çevresi ve orta hat kesilerinde iki taraflı yapılır.',
      katman: { deri: 1, kemik: 0.3, bag: 0.7 },
      vurgu: [LA],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['Göbek', gobekDeri, SARI, 0.07, -0.03],
        ['Linea alba (orta hat)', albaDeri, SARI, 0.07, 0.04],
        ['Rektusun lateral kenarı\n(linea semilunaris)', semiDeri, SARI, -0.09, 0.04],
        ['Prob seviyesi', S, PROB, -0.08, -0.05],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Rektus kılıfı ve sinirler',
      metin: `Rektus abdominis, oblik kasların ve transversus abdominisin aponevrozlarından oluşan kılıfın içindedir. Arkuat çizginin üstünde arka kılıf internal obliğin arka yaprağı ile transversus abdominis aponevrozundan oluşur; altında bütün aponevrozlar kasın önüne geçer ve arkada yalnız transversalis fasya kalır. T7–T11 ön dalları lateralden, internal oblik ile transversus abdominis arasından gelip kılıfa girer ve kasın arka yüzü boyunca ilerleyip kası deler. Epigastrik damarlar da kasın arka yüzündedir.${arkuatMetin}`,
      katman: { deri: 0.25, kas: 0.7, fasya: 0.35, sinir: 1, arter: 1, ven: 0.8, kemik: 0.7, bag: 0.7 },
      vurgu: [SINIR, IEA],
      odak,
      goster: [],
      etiket: etiketler(orta, [
        ['Rektus abdominis', a.merkez(RA, (v) => Math.abs(v.y - yL - 0.05) < 0.01 && Math.abs(v.x - xc) < 0.01), KAS],
        ['İnterkostal sinir ön dalı\n(kasın arka yüzünde)', sinirK || a.merkez(SINIR, (v) => Math.abs(v.y - yL) < 0.006 && v.x > raLat), SARI],
        ['İnferior epigastrik arter', a.merkez(IEA, (v) => Math.abs(v.y - yL + 0.03) < 0.01), KIRMIZI],
        ['Arkuat çizgi (yaklaşık)', arkuatNokta, BEYAZ],
        ['Transversus abdominis\n(aponevrozu arka kılıfta)', a.merkez(TA, (v) => Math.abs(v.y - yL) < 0.008 && v.x < raLat && v.x > raLat - 0.03 && v.z > S.z - 0.06), KAS],
      ], { olcek: 0.65, uzaklik: 0.05 }),
      etiketOlcek: 0.65,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: 'Transvers kesitte yüzeyelden derine: deri ve cilt altı yağ, parlak ön rektus kılıfı, oval hipoekoik rektus kası, kasın arkasında parlak arka kılıf (ve transversalis fasya), en derinde periton ve hareketli bağırsak. Kasın arka yüzündeki epigastrik arter Doppler ile görülür. Hedef, rektusun arka yüzü ile arka kılıf arasıdır.',
      katman: katmanYakin,
      vurgu: [RA, TA],
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['Ön rektus kılıfı', onKilif, BEYAZ],
        ['Rektus abdominis', raK, KAS],
        ['Arka rektus kılıfı\n(İO arka yaprağı + TA aponevrozu)', arkaKilif, BEYAZ],
        ['İnferior epigastrik arter', arterK, KIRMIZI],
        ['Periton ve bağırsak', bagirsakK, ORGAN],
        ['Hedef plan', T, CAMGOBEGI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: 'Lineer prob göbek hizasında, orta hattın lateralinde rektusun üzerine transvers konur; prob işareti laterale (iğnenin gireceği uca) bakar. Kasın lateral kenarı ve arka kılıf net görülene kadar prob mediale-laterale kaydırılır.',
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit'],
      etiket: etiketler(probKam, [
        ['Lineer prob', probUst, BEYAZ],
        ['Prob işareti → lateral', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['Hedef plan', T, CAMGOBEGI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: probKam,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, lateralden mediale: iğne probun lateral ucundan girer, cilt altı, ön kılıf ve rektus kası geçilerek uç kasın arka yüzüne, arka kılıfın hemen üstüne getirilir. Küçük test dozuyla ilacın kas içinde değil kas ile arka kılıf arasında açıldığı görülür. Uç arka kılıfı geçmemelidir: derininde periton ve bağırsak vardır. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}°, hedef derinliği ≈ ${fmt(tD * 100)} cm.`,
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm lateralinde`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Hedef: rektus arka yüzü –\narka kılıf arası', T, CAMGOBEGI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'Doğru planda ilaç kasın arka yüzü ile arka kılıf arasında iğ biçiminde hipoekoik bir alan oluşturur ve kası kılıftan ayırır; kas içine verilirse lifler arasında dağılır. Her iki tarafa ayrı ayrı uygulanır. Orta hattın somatik ağrısını azaltır, viseral ağrıyı karşılamaz. Toplam lokal anestezik dozu hesaplanmalıdır.',
      katman: katmanYakin,
      vurgu: [RA],
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik\nrektus ile arka kılıf arasında', T, CAMGOBEGI],
        ['Rektus abdominis', raK, KAS],
        ['Arka rektus kılıfı', arkaKilif, BEYAZ],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, girisProbKenariCm,
    hedefDerinlikCm: tD * 100,
    rektusKalinlikCm: dRA ? (dRA.alt - dRA.ust) * 100 : null,
    arkuatCm,
    katmanlarCm: [dEO, dIO, dRA, dTA].map((d) => d && [+(d.ust * 100).toFixed(1), +(d.alt * 100).toFixed(1)]),
    metin: `hedef (rektus arka yüzü) derinliği ≈ ${fmt(tD * 100)} cm, rektus kalınlığı ≈ ${dRA ? fmt((dRA.alt - dRA.ust) * 100) : '?'} cm, giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°${arkuatCm === null ? '' : `; arkuat çizgi göbeğin ≈ ${fmt(arkuatCm)} cm altında`}`,
    kesitBulundu: { rektus: !!dRA, arkaKilif: !!dTA && dTA.ust > raAlt - 0.002, sinir: !!sinirK, arter: !!arterK, bagirsak: !!bagirsakK },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, gobek, raK } };
}
