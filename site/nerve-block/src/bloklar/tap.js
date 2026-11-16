// Lateral TAP bloğu (orta aksiller çizgi; internal oblik ile transversus abdominis arası)
import * as THREE from 'three';
import { Arac, fmt, RENK, etiketKurucu, etiketler, kamera } from '../blok.js';

export default {
  id: 'tap',
  ad: 'TAP bloğu (lateral)',
  kisa: 'TAP',
  grup: 'Gövde',
  bolge: 'karin',
  yatis: 'sirtustu',
  katmanAdlari: { fasya: 'Transversalis fasya' },
  kur,
};

const EO = 'External_abdominal_oblique_muscler';
const IO = 'Internal_abdominal_oblique_muscler';
const TA = 'Transversus_abdominis_muscler';
const RA = 'Rectus_abdominis_muscler';
const SINIRLER = ['Intercostal_nervesr', 'Iliohypogastric_nerver', 'Ilio-inguinal_nerver'];

function kur(anat) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, PROB, KESIT } = RENK;

  // İliak krest (kalça kemiğinin en lateral 4 cm'lik kısmının tepesi) ve kosta kenarı (10. kaburga, lateral)
  const kalca = a.verts('Hip_boner');
  const kalcaMinX = Math.min(...kalca.map((v) => v.x));
  const krest = kalca.filter((v) => v.x < kalcaMinX + 0.04).reduce((m, v) => (v.y > m.y ? v : m));
  const kosta = [...a.verts('Tenth_ribr'), ...a.verts('Costal_cartilage_of_tenth_ribr')];
  const kostaMinX = Math.min(...kosta.map((v) => v.x));
  const kostaAlt = kosta.filter((v) => v.x < kostaMinX + 0.04).reduce((m, v) => (v.y < m.y ? v : m));
  const yL = (krest.y + kostaAlt.y) / 2;

  // Orta aksiller çizgi: bu seviyede derinin en lateral noktası
  const deri = a.verts('Deri').filter((v) => Math.abs(v.y - yL) < 0.005 && v.x < 0);
  const yan = deri.reduce((m, v) => (v.x < m.x ? v : m));
  const hedef0 = yan.clone().add(new THREE.Vector3(0.03, 0, 0));

  // Prob: orta aksiller çizgide transvers; iğne anterior (medial) uçtan
  const P = a.probYerlestir(hedef0, new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 0, 1), { bas: 0.1, enCokDer: 20 });
  const { S, n, b, u } = P;
  const kesit = a.kesitci(P, { derinlik: 0.05 });
  const dEO = a.derinlikler(P, EO), dIO = a.derinlikler(P, IO), dTA = a.derinlikler(P, TA);
  const derin = (d) => S.clone().addScaledVector(b, d);
  const Eo = dEO ? derin((dEO.ust + dEO.alt) / 2) : kesit(EO);
  const Io = dIO ? derin((dIO.ust + dIO.alt) / 2) : kesit(IO);
  const Ta = dTA ? derin((dTA.ust + dTA.alt) / 2) : kesit(TA);
  // Hedef: IO'nun derin yüzü ile TA'nın yüzeyel yüzü arası
  const tapD = dIO && dTA ? (dIO.alt + dTA.ust) / 2 : 0.02;
  const T = derin(tapD);
  const ig = a.igneYolu(P, T, { aci: 30, enCok: 0.035 });
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;
  const tapDerinlikCm = tapD * 100;

  const krestDeri = a.deriVur(krest.clone().add(new THREE.Vector3(-0.1, 0.0, 0)), new THREE.Vector3(1, 0, 0))?.p;
  const kostaDeri = a.deriVur(kostaAlt.clone().add(new THREE.Vector3(-0.1, 0.0, 0)), new THREE.Vector3(1, 0, 0))?.p;

  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.045,
    la: { merkez: T.clone(), boyut: new THREE.Vector3(0.022, 0.0028, 0.02) },
    isaretler: [[krestDeri, 0xffe14d], [kostaDeri, 0xffe14d], [S, 0x35e07a]],
  });

  // ---- Kameralar: hastanın sağ yanından, önden ----
  const genel = kamera(S.clone().add(new THREE.Vector3(0.06, 0.0, 0.03)), new THREE.Vector3(-0.75, 0.25, 0.6), 0.6);
  const orta = kamera(T.clone(), new THREE.Vector3(-0.7, 0.3, 0.65), 0.3);
  const yakin = kamera(T.clone().lerp(S, 0.3), new THREE.Vector3(-0.45, 0.45, 0.77), 0.24);

  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.04).addScaledVector(u, -0.019);
  const odak = [EO, IO, TA, RA, ...SINIRLER, 'Transversalis_fascia'];
  const katmanYakin = { deri: 0.25, kas: 0.55, fasya: 0.35, sinir: 1, arter: 0.6, ven: 0.6, kemik: 0.7 };

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: 'Hasta sırtüstü. Kosta kenarı ile iliak krest arasında, orta aksiller çizgide çalışılır. Prob bu iki kemik işaretin ortasına, transvers konacak. Lateral TAP esas olarak alt karın duvarını (≈ T10–T12) etkiler; göbek üstü için subkostal yaklaşım tercih edilir.',
      katman: { deri: 1, kemik: 0.8 },
      vurgu: ['Hip_boner', 'Tenth_ribr'],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['Kosta kenarı', kostaDeri, SARI, -0.06, 0.05],
        ['İliak krest', krestDeri, SARI, -0.06, -0.05],
        ['Orta aksiller çizgi:\nprob seviyesi', S, PROB, -0.09, 0.0],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Karın duvarı katmanları',
      metin: 'Lateral karın duvarı yüzeyelden derine: eksternal oblik, internal oblik ve transversus abdominis kasları; onların altında transversalis fasya ve periton. T7–L1 sinirlerinin ön dalları internal oblik ile transversus abdominis arasındaki fasyal planda (TAP) öne doğru ilerler.',
      katman: { deri: 0.3, kas: 0.9, fasya: 0.4, sinir: 1, kemik: 0.7 },
      vurgu: SINIRLER,
      odak,
      goster: [],
      etiket: etiketler(orta, [
        ['Eksternal oblik', a.merkez(EO, (v) => Math.abs(v.y - yL - 0.04) < 0.01 && v.z > S.z + 0.02), KAS],
        ['İnternal oblik', a.merkez(IO, (v) => Math.abs(v.y - yL) < 0.01 && v.z > S.z + 0.03), KAS],
        ['Transversus abdominis', a.merkez(TA, (v) => Math.abs(v.y - yL + 0.03) < 0.01 && v.z > S.z), KAS],
        ['İnterkostal sinirler (TAP planında)', a.merkez('Intercostal_nervesr', (v) => Math.abs(v.y - yL - 0.05) < 0.02 && v.x < S.x + 0.06), SARI],
        ['İliyohipogastrik sinir', a.merkez('Iliohypogastric_nerver', (v) => v.x < S.x + 0.05), SARI],
      ], { olcek: 0.7, uzaklik: 0.05 }),
      etiketOlcek: 0.7,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: 'Ultrasonda üç kas katmanı üst üste hipoekoik bantlar olarak görülür; aralarındaki fasyalar parlak çizgilerdir. En derinde transversus abdominisin altında periton ve bağırsak hareketi seçilir. Hedef, internal oblik ile transversus abdominis arasındaki parlak fasyal çizgidir.',
      katman: katmanYakin,
      vurgu: [IO, TA],
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['Eksternal oblik', Eo, KAS],
        ['İnternal oblik', Io, KAS],
        ['Transversus abdominis', Ta, KAS],
        ['TAP planı', T, CAMGOBEGI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: 'Lineer prob orta aksiller çizgide, kosta kenarı ile iliak krest arasında transvers konur; prob işareti mediale (anteriora) bakar. Üç kas katmanı net görülene kadar prob hafifçe kaydırılır ve eğilir.',
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit'],
      etiket: etiketler(yakin, [
        ['Lineer prob', probUst, BEYAZ],
        ['Prob işareti → anterior', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['TAP planı', T, CAMGOBEGI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, anteriordan: iğne probun anterior ucundan sığ bir açıyla girer, eksternal ve internal oblik geçilir; uç internal oblik ile transversus abdominis arasındaki fasyaya yerleştirilir. Küçük bir test dozuyla (hidrodiseksiyon) kas içinde olmadığı doğrulanır. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}°, TAP derinliği ≈ ${fmt(tapDerinlikCm)} cm.`,
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm anterioru`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Hedef: İO–TA arası fasya', T, CAMGOBEGI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'Doğru planda ilaç internal oblik ile transversus abdominis arasında iğ (mercek) şeklinde hipoekoik bir alan oluşturur ve kasları birbirinden ayırır. Blok somatik karın duvarı ağrısını azaltır, viseral ağrıyı karşılamaz; orta hat kesilerinde iki taraflı uygulanır. Hacim gerektiren bir plan bloğu olduğundan toplam lokal anestezik dozu hesaplanmalıdır.',
      katman: katmanYakin,
      vurgu: [IO, TA],
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik\nİO ile TA arasında', T, CAMGOBEGI],
        ['İnternal oblik', Io, KAS],
        ['Transversus abdominis', Ta, KAS],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, tapDerinlikCm, girisProbKenariCm,
    katmanlarCm: [dEO, dIO, dTA].map((d) => d && [+(d.ust * 100).toFixed(1), +(d.alt * 100).toFixed(1)]),
    metin: `TAP planı derinliği ≈ ${fmt(tapDerinlikCm)} cm, giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°`,
    kesitBulundu: { eo: !!dEO, io: !!dIO, ta: !!dTA },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, Eo, Io, Ta, krest, kostaAlt } };
}
