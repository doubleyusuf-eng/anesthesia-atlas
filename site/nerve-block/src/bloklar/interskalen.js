// İnterskalen brakiyal pleksus bloğu (C5–C6 kökleri, krikoid / C6 seviyesi)
import * as THREE from 'three';
import { Arac, fmt, RENK, etiketKurucu, etiketler, kamera } from '../blok.js';

export default {
  id: 'interskalen',
  ad: 'İnterskalen blok',
  kisa: 'İnterskalen',
  grup: 'Üst ekstremite',
  bolge: 'boyun',
  yatis: 'sirtustu',
  kur,
};

const KOK = 'Roots_of_brachial_plexusr';
const UST_TRUNKUS = 'Superior_trunk_of_brachial_plexusr';
const ASM = 'Scalenus_anterior_muscler';
const MSM = 'Scalenus_medius_muscler';
const SKM = 'Sternocleidomastoid_muscler';

function kur(anat) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, MAVI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, PROB, KESIT } = RENK;

  // C6 seviyesi: krikoid kıkırdak
  const krikoid = a.merkez('Cricoid_cartilage');
  const yC6 = krikoid.y;
  const seviye = (d) => (v) => Math.abs(v.y - yC6) < d;
  // Bu seviyede ön ve orta skalen arasındaki kökler
  const asm0 = a.merkez(ASM, seviye(0.006));
  const kok0 = a.merkez([KOK, UST_TRUNKUS], (v) => Math.abs(v.y - yC6) < 0.008 && v.x < asm0.x + 0.004) || a.merkez(KOK);

  // Prob: lateral boyunda, transvers (aksiyel); işaret/iğne ucu posteriorda
  const P = a.probYerlestir(kok0, new THREE.Vector3(-1, 0, 0.3), new THREE.Vector3(0, 0, -1), { bas: 0.07, enCokDer: 25 });
  const { S, n, b, u } = P;
  const kesit = a.kesitci(P, { derinlik: 0.045 });
  const K = kesit([KOK, UST_TRUNKUS]) || kok0;
  const As = kesit(ASM);
  const Ms = kesit(MSM);
  const Sk = kesit(SKM);
  const Kar = kesit('Right_common_carotid_artery');
  const Ij = kesit('Internal_jugular_veinr');
  const Va = kesit('Vertebral_arteryr', 0.004);
  const C6 = kesit('Vertebra_C6', 0.004);

  // Hedef: köklerin posterolateral kenarı, interskalen olukta
  const T = K.clone().addScaledVector(u, 0.004);
  const ig = a.igneYolu(P, T, { enCok: 0.02 });
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;
  const kokDerinlikCm = K.clone().sub(S).dot(b) * 100;

  // Yüzey işaretleri
  const krikoidDeri = a.deriVur(krikoid.clone().add(new THREE.Vector3(0, 0, 0.1)), new THREE.Vector3(0, 0, -1))?.p;
  const skmArka = a.uc(SKM, new THREE.Vector3(-0.6, 0, -0.8), seviye(0.005), 0.12);
  const skmKenarDeri = skmArka && a.deriVur(skmArka.clone().addScaledVector(n, 0.06), b)?.p;
  const klav = a.merkez('Clavicler');
  const klavDeri = klav && a.deriVur(klav.clone().add(new THREE.Vector3(0, 0.03, 0.08)), new THREE.Vector3(0, -0.35, -1).normalize())?.p;

  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.045,
    la: { merkez: K.clone().addScaledVector(u, 0.001), boyut: new THREE.Vector3(0.007, 0.005, 0.016) },
    isaretler: [[krikoidDeri, 0xffe14d], [skmKenarDeri, 0xffe14d]],
  });

  // ---- Kameralar ----
  // Kesit düzlemi aksiyel: iğne yolu en iyi kraniyal-lateralden (baş tarafından) görülür
  const genel = kamera(S.clone().add(new THREE.Vector3(0.02, 0.0, 0.0)), new THREE.Vector3(-0.45, 0.2, 1), 0.55);
  const orta = kamera(K.clone(), new THREE.Vector3(-0.8, 0.25, 0.55), 0.3);
  // Lateral-ön-üstten bakış; prob bu adımlarda yarı saydam gösterilir (sapı görüşü kapatmasın)
  const yakin = kamera(K.clone().lerp(S, 0.45), new THREE.Vector3(-0.55, 0.5, 0.67), 0.26);

  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.035).addScaledVector(u, -0.019);
  const odak = [KOK, UST_TRUNKUS, ASM, MSM, SKM, 'Right_common_carotid_artery', 'Internal_jugular_veinr', 'Vertebral_arteryr',
    'Middle_trunk_of_brachial_plexusr', 'Inferior_trunk_of_brachial_plexusr'];

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: 'Hasta sırtüstü ya da yarı oturur, baş karşı tarafa hafifçe döndürülmüş. Krikoid kıkırdak C6 seviyesini gösterir. Bu seviyede sternokleidomastoidin lateral (arka) kenarının hemen arkasında, ön ve orta skalen kaslar arasındaki interskalen oluk palpe edilir.',
      katman: { deri: 1, kemik: 0.7 },
      vurgu: ['Cricoid_cartilage', 'Vertebra_C6'],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['Krikoid kıkırdak (C6)', krikoidDeri, SARI, 0.07, 0.04],
        ['SKM lateral kenarı', skmKenarDeri, SARI, -0.08, 0.03],
        ['Klavikula', klavDeri, KEMIK, -0.05, -0.06],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Skalen kaslar ve kökler',
      metin: 'Brakiyal pleksusun C5–C7 kökleri, ön skalen ile orta skalen arasındaki oluktan çıkar. Ön skalen kasın ön yüzünde frenik sinir iner (bu modelde frenik sinir yok). Dorsal skapular ve uzun torasik sinirler orta skalen kasın içinden geçer.',
      katman: { deri: 0.35, kas: 1, sinir: 1, kemik: 0.8, arter: 0.5, ven: 0.5 },
      vurgu: [KOK, UST_TRUNKUS],
      odak,
      goster: [],
      etiket: etiketler(orta, [
        ['Ön skalen', As || a.merkez(ASM, seviye(0.01)), KAS],
        ['Orta skalen', Ms || a.merkez(MSM, seviye(0.01)), KAS],
        ['C5–C6 kökleri', K, SARI],
        ['SKM', Sk, KAS],
      ], { olcek: 0.75, uzaklik: 0.05 }),
      etiketOlcek: 0.75,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: 'Ultrasonda kökler, iki skalen kas arasında üst üste dizilmiş yuvarlak hipoekoik yapılardır ("trafik ışığı"). Medialde karotis arter ve internal juguler ven, derinde C6 transvers çıkıntısı ve vertebral arter bulunur. Kökleri karotisle karıştırmamak için renkli Doppler kullan.',
      katman: { deri: 0.25, kas: 0.35, sinir: 1, arter: 1, ven: 1, kemik: 0.6 },
      vurgu: [KOK, UST_TRUNKUS],
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['C5–C6 kökleri', K, SARI],
        ['Ön skalen', As, KAS],
        ['Orta skalen', Ms, KAS],
        ['Karotis arter', Kar, KIRMIZI],
        ['İnternal juguler ven', Ij, MAVI],
        ['Vertebral arter', Va, KIRMIZI],
        ['C6 transvers çıkıntı', C6, KEMIK],
      ], { olcek: 0.5, uzaklik: 0.032 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: 'Lineer prob krikoid seviyesinde, lateral boyunda transvers (aksiyel) konur; prob işareti posteriora bakar. Önce karotis ve juguler ven bulunur, prob laterale kaydırılarak skalen kaslar ve aralarındaki kökler görüntülenir. Alternatif: pleksusu supraklaviküler fossada bulup yukarı doğru takip etmek.',
      katman: { deri: 0.3, kas: 0.35, sinir: 1, arter: 1, ven: 1, kemik: 0.6 },
      vurgu: [],
      odak,
      goster: ['prob', 'kesit'],
      etiket: etiketler(yakin, [
        ['Lineer prob', probUst, BEYAZ],
        ['Prob işareti → posterior', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['C5–C6 kökleri', K, SARI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, posteriordan: iğne probun posterior ucundan girer, orta skalen kası geçerek interskalen oluğa ilerler; uç C5–C6 köklerinin hemen lateraline yerleştirilir. Köke değme ya da yüksek enjeksiyon basıncında dur. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}°, kök derinliği ≈ ${fmt(kokDerinlikCm)} cm.`,
      katman: { deri: 0.3, kas: 0.35, sinir: 1, arter: 1, ven: 1, kemik: 0.6 },
      vurgu: [],
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm posterioru`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Hedef: köklerin lateralı,\ninterskalen oluk', T, CAMGOBEGI],
        ['Karotis arter', Kar, KIRMIZI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'Negatif aspirasyondan sonra küçük fraksiyonlarla enjekte et; ilaç ön ve orta skalen arasında kökleri sarmalı. Frenik sinir tutulumuna bağlı ipsilateral hemidiyafram parezisi çok sıktır; solunum rezervi kısıtlı hastada dikkat. Horner sendromu ve ses kısıklığı görülebilir. İlaç ve hacim kurum protokolüne göre belirlenir.',
      katman: { deri: 0.25, kas: 0.35, sinir: 1, arter: 1, ven: 1, kemik: 0.6 },
      vurgu: [KOK, UST_TRUNKUS],
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik\ninterskalen olukta', K, CAMGOBEGI],
        ['Ön skalen', As, KAS],
        ['Orta skalen', Ms, KAS],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, kokDerinlikCm, girisProbKenariCm,
    metin: `kök derinliği ≈ ${fmt(kokDerinlikCm)} cm, giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°`,
    kesitBulundu: { kok: !!kesit([KOK, UST_TRUNKUS]), asm: !!As, msm: !!Ms, karotis: !!Kar, ijv: !!Ij, vertebral: !!Va },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, K, As, Ms, Kar, Ij, krikoid } };
}
