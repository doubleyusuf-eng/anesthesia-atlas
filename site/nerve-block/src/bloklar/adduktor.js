// Adduktor kanal bloğu (safen sinir; uyluk ortası, sartorius altında femoral arterin lateralı)
import * as THREE from 'three';
import { Arac, fmt, RENK, etiketKurucu, etiketler, kamera } from '../blok.js';

export default {
  id: 'adduktor',
  ad: 'Adduktor kanal bloğu',
  kisa: 'Adduktor kanal',
  grup: 'Alt ekstremite',
  bolge: 'uyluk',
  yatis: 'sirtustu',
  kur,
};

const ART = 'Femoral_arteryr';
const VEN = 'Femoral_veinr';
const SAF = 'Saphenous_nerver';
const SAR = 'Sartorius_muscler';
const VM = 'Vastus_medialis_muscler';
const AL = 'Adductor_longusr';
const AM = 'Adductor_magnusr';

function kur(anat) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, MAVI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, PROB, KESIT } = RENK;

  // Femoral üçgen apeksi: sartoriusun medial kenarının adduktor longusun medial kenarını çaprazladığı seviye
  const ys = a.verts(ART).map((v) => v.y);
  const yUst = Math.max(...ys), yAlt = Math.min(...ys);
  const medKenar = (name, y) => {
    let m = -Infinity;
    for (const v of a.verts(name)) if (Math.abs(v.y - y) < 0.004 && v.x > m) m = v.x;
    return m;
  };
  let apeks = null;
  for (let y = yUst - 0.01; y > yAlt; y -= 0.005) {
    const s = medKenar(SAR, y), l = medKenar(AL, y);
    if (s > -Infinity && l > -Infinity && s >= l) { apeks = y; break; }
  }
  const hiatus = Math.max(...a.verts('Popliteal_arteryr').map((v) => v.y));
  if (apeks === null) apeks = hiatus + 0.12;
  const yL = Math.min(apeks - 0.025, (apeks + hiatus) / 2);
  const A = a.merkez(ART, (v) => Math.abs(v.y - yL) < 0.005);

  // Prob: uyluğun anteromedial yüzünde transvers; iğne anterolateral uçtan
  const P = a.probYerlestir(A, new THREE.Vector3(0.55, 0, 0.85), new THREE.Vector3(-0.85, 0, 0.55), { bas: 0.12, enCokDer: 25 });
  const { S, n, b, u } = P;
  const kesit = a.kesitci(P, { derinlik: 0.06 });
  const Ak = kesit(ART) || A;
  const Vk = kesit(VEN);
  const Sf = kesit(SAF, 0.004, (v) => v.distanceTo(Ak) < 0.02);
  const Sr = kesit(SAR);
  const Vm = kesit(VM);
  const Al = kesit([AL, AM]);
  const Fm = kesit('Femurr', 0.004);

  // Hedef: arterin anterolateralı, sartoriusun altında (safen sinirin bulunduğu yer)
  const T = Ak.clone().addScaledVector(u, 0.0055).addScaledVector(b, -0.002);
  const ig = a.igneYolu(P, T, { enCok: 0.03 });
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;
  const arterDerinlikCm = Ak.clone().sub(S).dot(b) * 100;

  // Yüzey: patella tabanı, uyluk ortası
  const patUst = a.uc('Patellar', new THREE.Vector3(0, 1, 0), () => true, 0.1);
  const patDeri = patUst && a.deriVur(patUst.clone().add(new THREE.Vector3(0, 0, 0.1)), new THREE.Vector3(0, 0, -1))?.p;
  const apeksNokta = a.merkez(SAR, (v) => Math.abs(v.y - apeks) < 0.005);
  const apeksDeri = apeksNokta && a.deriVur(apeksNokta.clone().addScaledVector(n, 0.12), b)?.p;

  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.055,
    la: { merkez: Ak.clone().addScaledVector(u, 0.003).addScaledVector(b, -0.001), boyut: new THREE.Vector3(0.01, 0.008, 0.03) },
    isaretler: [[patDeri, 0xffe14d], [apeksDeri, 0xffe14d], [S, 0x35e07a]],
  });

  // ---- Kameralar: önden-medialden ----
  const genel = kamera(S.clone().add(new THREE.Vector3(-0.02, 0.0, 0)), new THREE.Vector3(0.25, 0.25, 1), 0.65);
  const orta = kamera(Ak.clone(), new THREE.Vector3(0.35, 0.3, 0.9), 0.32);
  const yakin = kamera(Ak.clone().lerp(S, 0.35), new THREE.Vector3(0.3, 0.45, 0.85), 0.26);

  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.045).addScaledVector(u, -0.019);
  const odak = [ART, VEN, SAF, SAR, VM, AL, AM, 'Femoral_nerver'];
  const apeksUzaklikCm = (apeks - yL) * 100;
  const patUzaklikCm = patUst ? (yL - patUst.y) * 100 : null;

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: `Hasta sırtüstü, bacak hafif dış rotasyon ve abduksiyonda, diz hafif fleksiyonda. Prob uyluğun orta üçte birinde, anteromedial yüze konur. Bu modelde blok seviyesi patella tabanının ≈ ${patUzaklikCm ? fmt(patUzaklikCm) : '—'} cm proksimalinde, femoral üçgen apeksinin ≈ ${fmt(apeksUzaklikCm)} cm distalindedir.`,
      katman: { deri: 1, kemik: 0.8 },
      vurgu: ['Patellar'],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['Patella tabanı', patDeri, SARI, 0.07, -0.03],
        ['Femoral üçgen apeksi', apeksDeri, SARI, 0.08, 0.04],
        ['Prob seviyesi', S, PROB, 0.09, 0.0],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Kanalın sınırları',
      metin: 'Adduktor (Hunter) kanalı femoral üçgen apeksinden adduktor hiatusa uzanır. Tavanı sartorius ve altındaki vastoadduktor membran (modelde yok), lateral duvarı vastus medialis, posteromedial duvarı adduktor longus ve magnustur. İçinde femoral arter, femoral ven, safen sinir ve vastus medialis siniri bulunur.',
      katman: { deri: 0.35, kas: 1, sinir: 1, arter: 1, ven: 1, kemik: 0.8 },
      vurgu: [SAR],
      odak,
      goster: [],
      etiket: etiketler(orta, [
        ['Sartorius (tavan)', a.merkez(SAR, (v) => Math.abs(v.y - yL) < 0.02), KAS],
        ['Vastus medialis', a.merkez(VM, (v) => Math.abs(v.y - yL) < 0.02), KAS],
        ['Adduktor longus / magnus', a.merkez([AL, AM], (v) => Math.abs(v.y - yL) < 0.02), KAS],
        ['Safen sinir', a.merkez(SAF, (v) => Math.abs(v.y - yL) < 0.015), SARI],
        ['Femoral arter', a.merkez(ART, (v) => Math.abs(v.y - yL - 0.03) < 0.005), KIRMIZI],
      ], { olcek: 0.7, uzaklik: 0.05 }),
      etiketOlcek: 0.7,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: 'Sartoriusun altında femoral arter yuvarlak ve pulsatildir; femoral ven onun derininde ve medialindedir (basıyla kollabe olur). Safen sinir arterin anterolateralinde küçük hiperekoik bir yapıdır, her zaman net görülmeyebilir. Hedef, arterin lateralinde sartorius ile vastus medialis arasındaki bölmedir.',
      katman: { deri: 0.25, kas: 0.4, sinir: 1, arter: 1, ven: 1, kemik: 0.7 },
      vurgu: [SAF],
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['Femoral arter', Ak, KIRMIZI],
        ['Femoral ven', Vk, MAVI],
        ['Safen sinir', Sf, SARI],
        ['Sartorius', Sr, KAS],
        ['Vastus medialis', Vm, KAS],
        ['Adduktor kası', Al, KAS],
        ['Femur', Fm, KEMIK],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: 'Lineer prob uyluğun anteromedial yüzünde transvers konur; prob işareti laterale (anterolaterale) bakar. Femoral arter femoral üçgende bulunur ve sartoriusun altında kalana kadar distale takip edilir. Sartoriusun medial kenarının adduktor longusun medial kenarını çaprazladığı nokta kanalın başlangıcıdır; blok bunun distalinde yapılır.',
      katman: { deri: 0.3, kas: 0.4, sinir: 1, arter: 1, ven: 1, kemik: 0.7 },
      vurgu: [],
      odak,
      goster: ['prob', 'kesit'],
      etiket: etiketler(yakin, [
        ['Lineer prob', probUst, BEYAZ],
        ['Prob işareti → lateral', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['Femoral arter', Ak, KIRMIZI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, lateralden mediale: iğne probun anterolateral ucundan girer, sartoriusu geçer ve ucu arterin lateraline, sartorius altındaki bölmeye yerleştirilir. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}°, arter derinliği ≈ ${fmt(arterDerinlikCm)} cm.`,
      katman: { deri: 0.3, kas: 0.4, sinir: 1, arter: 1, ven: 1, kemik: 0.7 },
      vurgu: [],
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm lateralı`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Hedef: arterin lateralı,\nsartorius altı', T, CAMGOBEGI],
        ['Femoral arter', Ak, KIRMIZI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'Enjeksiyonla ilaç arteri çevreler ve sartoriusun altında kanal boyunca yayılır. Blok esas olarak duyusaldır (safen sinir, vastus medialis siniri); kuadriseps gücü femoral bloğa göre büyük ölçüde korunur. Yüksek hacim ya da proksimal enjeksiyon femoral üçgene yayılıp motor bloğa yol açabilir. İlaç ve hacim kurum protokolüne göre belirlenir.',
      katman: { deri: 0.25, kas: 0.4, sinir: 1, arter: 1, ven: 1, kemik: 0.7 },
      vurgu: [SAF],
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik\narterin çevresinde', Ak, CAMGOBEGI],
        ['Sartorius', Sr, KAS],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, arterDerinlikCm, girisProbKenariCm,
    metin: `arter derinliği ≈ ${fmt(arterDerinlikCm)} cm, giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°`,
    kesitBulundu: { arter: !!kesit(ART), ven: !!Vk, safen: !!Sf, sartorius: !!Sr, vastus: !!Vm },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, Ak, Vk, Sf, Sr, apeks: new THREE.Vector3(0, apeks, 0), hiatus: new THREE.Vector3(0, hiatus, 0) } };
}
