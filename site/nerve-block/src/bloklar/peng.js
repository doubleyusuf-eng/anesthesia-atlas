// PENG bloğu (PEricapsular Nerve Group): AİİS ile iliopubik eminens arasında, psoas tendonu ile pubik ramus arası plan
import * as THREE from 'three';
import { Arac, V, fmt, RENK, etiketKurucu, etiketler, kamera } from '../blok.js';

export default {
  id: 'peng',
  ad: 'PENG bloğu (perikapsüler)',
  kisa: 'PENG',
  grup: 'Alt ekstremite',
  bolge: 'femoral',
  yatis: 'sirtustu',
  katmanAdlari: { fasya: 'Fasya iliaka' },
  kur,
};

const PS = 'Psoas_majorr';
const IL = 'Iliacus_muscler';
const FN = 'Femoral_nerver';
const FA = 'Femoral_arteryr';
const EIA = 'External_iliac_arteryr';
const FV = 'Femoral_veinr';
const EIV = 'External_iliac_veinr';
const KEMIK = 'Hip_boner';
const KAPSUL = 'Articular_capsule_of_hip_jointr';
const BAGLAR = ['Transverse_part_of_iliofemoral_ligamentr', 'Descending_part_of_iliofemoral_ligamentr', 'Pubofemoral_ligamentr'];
const OBT = 'Obturator_nerver';
const RF = 'Rectus_femoris_muscler';
const SA = 'Sartorius_muscler';

function kur(anat, isaretler) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, MAVI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK: KEMIKR, PROB, KESIT } = RENK;
  const sias = V(isaretler.sias);
  const pt = V(isaretler.tuberkulumPubikum);
  const aiis = V(isaretler.sais);
  const ipe = V(isaretler.ipe);
  const kemik = anat.parts.get(KEMIK);
  const kemikVur = (from, dir) => { a.ray.set(from, dir); return a.ray.intersectObject(kemik, false)[0]?.point.clone() || null; };

  // Prob: AİİS ile İPE arasının üzerinde; uzun ekseni AİİS–İPE hattında (pubik ramusla hizalı), işaret laterale (iğne tarafı)
  const orta = aiis.clone().lerp(ipe, 0.5);
  const P0 = a.probYerlestir(orta, new THREE.Vector3(0, 0, 1), aiis.clone().sub(ipe), { enCokDer: 15, bas: 0.15 });
  // Kesit düzlemi AİİS ve İPE'nin ikisini de içersin: u = İPE→AİİS, n = deri normalinin u'ya dik bileşeni
  const u = aiis.clone().sub(ipe).normalize();
  const n = P0.n.clone().addScaledVector(u, -P0.n.dot(u)).normalize();
  const S = a.deriVur(orta.clone().addScaledVector(n, 0.15), n.clone().negate())?.p || P0.S;
  const P = { S, n, b: n.clone().negate(), u, mz: u.clone().cross(n).normalize() };
  const { b, mz } = P;
  const kesit = a.kesitci(P, { derinlik: 0.07 });
  const transversAciDer = THREE.MathUtils.radToDeg(Math.asin(Math.min(1, Math.abs(u.y))));

  // Kesitteki yapılar
  const duzlemde = (p) => p.clone().addScaledVector(mz, -p.clone().sub(S).dot(mz));
  const aiisK = duzlemde(aiis);
  const ipeK = duzlemde(ipe);
  const Ps = kesit(PS, 0.003, (v) => v.distanceTo(ipe) < 0.02);
  const Il = kesit(IL, 0.003, (v) => v.distanceTo(aiis) < 0.025);
  const Fa = kesit([FA, EIA]);
  const Fv = kesit([FV, EIV]);
  const Fn = kesit(FN);
  const Ke = kesit(KEMIK, 0.003);

  // Hedef: psoas tendonunun altında, kemik yüzeyinin 2–3 mm önünde (AİİS ile İPE arasında, İPE'ye yakın)
  const tabanNokta = aiisK.clone().lerp(ipeK, 0.8);
  const kemikT = kemikVur(tabanNokta.clone().addScaledVector(n, 0.06), b) || ipeK;
  const T = kemikT.clone().addScaledVector(n, 0.0025);
  const ig = a.igneYolu(P, T, { aci: 40, enCok: 0.03 });
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;
  const hedefDerinlikCm = T.clone().sub(S).dot(b) * 100;
  const arterDerinlikCm = Fa ? Fa.clone().sub(S).dot(b) * 100 : null;
  const sinirDerinlikCm = Fn ? Fn.clone().sub(S).dot(b) * 100 : null;
  // Hedefin AİİS–İPE hattındaki yeri (0 = AİİS, 1 = İPE)
  const hat = ipeK.clone().sub(aiisK);
  const hatOran = T.clone().sub(aiisK).dot(hat) / hat.lengthSq();

  const nabizSk = Fa ? a.deriVur(Fa.clone().add(new THREE.Vector3(0, 0, 0.15)), new THREE.Vector3(0, 0, -1)) : null;
  const siasDeri = a.deriVur(sias.clone().add(new THREE.Vector3(0, 0, 0.1)), new THREE.Vector3(0, 0, -1))?.p || sias;
  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.065,
    la: { merkez: T.clone().addScaledVector(n, 0.001), boyut: new THREE.Vector3(0.016, 0.0028, 0.011) },
    isaretler: [[siasDeri, 0xffe14d], [pt, 0xffe14d], [nabizSk?.p, 0xff5a4d], [S, 0x35e07a]],
  });

  // ---- Etiket noktaları ----
  const kapsulOn = a.uc(KAPSUL, new THREE.Vector3(0, 0, 1), () => true, 0.15);
  const psoasTendon = a.merkez(PS, (v) => v.distanceTo(ipe) < 0.015 && v.y < ipe.y + 0.01);
  const ilOn = a.uc(IL, new THREE.Vector3(0, 0, 1), (v) => v.distanceTo(aiis) < 0.03, 0.2);
  const fnYer = a.merkez(FN, (v) => Math.abs(v.y - ipe.y) < 0.006);
  const faYer = a.merkez([FA, EIA], (v) => Math.abs(v.y - ipe.y) < 0.006);
  const obtYer = a.merkez(OBT, (v) => Math.abs(v.y - ipe.y - 0.01) < 0.008);
  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.04).addScaledVector(u, -0.019);

  // ---- Kameralar: hastanın sağında; kesit transvers-oblik olduğundan önden-kaudalden ----
  const genel = kamera(S.clone().add(new THREE.Vector3(0.02, 0.0, -0.01)), new THREE.Vector3(-0.3, -0.05, 0.95), 0.5);
  const ortaK = kamera(T.clone().add(new THREE.Vector3(0.005, 0.0, 0.0)), new THREE.Vector3(-0.35, -0.45, 0.82), 0.28);
  // yakın: kesit düzlemine kaudal taraftan, önden (düzlem normali −mz kaudale bakar)
  const kaudal = mz.y < 0 ? mz.clone() : mz.clone().negate();
  const yakinHedef = T.clone().lerp(S, 0.45).lerp(E, 0.15);
  const yakin = kamera(yakinHedef, kaudal.multiplyScalar(0.7).add(n.clone().multiplyScalar(0.7)).add(new THREE.Vector3(-0.15, 0, 0)), 0.24);

  const odak = [PS, IL, FN, FA, EIA, FV, EIV, OBT, KAPSUL, ...BAGLAR];
  const katmanYakin = { deri: 0.25, kas: 0.4, fasya: 0, arter: 1, ven: 0.8, sinir: 1, kemik: 0.85, bag: 0 };

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: 'Hasta sırtüstü, bacak düz. SİAS, tüberkülum pubikum ve femoral nabız işaretlenir. AİİS, SİAS\'ın inferomedialinde ve derindedir; palpe edilemez, ultrasonla bulunur. Prob önce inguinal ligamentin hemen distalinde, AİİS üzerinde transvers konur.',
      katman: { deri: 1, kemik: 0.85, bag: 1 },
      vurgu: [],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['SİAS', siasDeri, SARI, -0.07, 0.05],
        ['Tüberkülum pubikum', pt, SARI, 0.07, -0.03],
        ['Femoral nabız', nabizSk?.p, KIRMIZI, 0.07, 0.04],
        ['AİİS (derinde)', aiis, BEYAZ, -0.08, -0.03],
        ['Prob yeri', S, PROB, -0.02, -0.08],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Kalça ön kapsülü ve komşuları',
      metin: 'Kalça ekleminin ön kapsülü femoral, obturator ve aksesuar obturator sinirlerin eklem dallarıyla innerve edilir. Bu dallar AİİS ile iliopubik eminens (İPE) arasındaki olukta, psoas tendonunun altında kapsüle ulaşır (eklem dalları kaynak veride ayrı model olarak yok). Psoas tendonu İPE\'nin üzerinden geçer; lateralinde iliak kas, yüzeyelde ve medialde femoral sinir, arter ve ven bulunur.',
      katman: { deri: 0.2, kas: 0.55, fasya: 0, arter: 1, ven: 0.8, sinir: 1, kemik: 1, bag: 0.4 },
      vurgu: [KAPSUL, ...BAGLAR],
      odak,
      goster: [],
      etiket: etiketler(ortaK, [
        ['Kalça ön kapsülü', kapsulOn, BEYAZ],
        ['AİİS', aiis, BEYAZ],
        ['İliopubik eminens', ipe, BEYAZ],
        ['Psoas tendonu', psoasTendon, KAS],
        ['İliak kas', ilOn, KAS],
        ['Femoral sinir', fnYer, SARI],
        ['Femoral arter', faYer, KIRMIZI],
        ['Obturator sinir\n(pelvis içinde)', obtYer, SARI],
      ], { olcek: 0.65, uzaklik: 0.055 }),
      etiketOlcek: 0.65,
      kamera: ortaK,
    },
    {
      baslik: 'Sono-anatomi',
      metin: 'Kesitte derinde parlak kemik çizgisi: lateralde AİİS, medialde iliopubik eminens. İPE\'nin üzerinde ve medialinde psoas tendonu hiperekoik oval bir yapı olarak, lateralde AİİS üzerinde iliak kas görülür. Femoral arter (ve sinir) daha yüzeyelde ve medialdedir; Doppler ile tanınır.',
      katman: katmanYakin,
      vurgu: [PS],
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['AİİS', aiisK, BEYAZ],
        ['İliopubik eminens', ipeK, BEYAZ],
        ['Psoas tendonu', Ps, KAS],
        ['İliak kas', Il, KAS],
        ['Femoral arter', Fa, KIRMIZI],
        ['Femoral sinir', Fn, SARI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: `Lineer (ya da derin hastada konveks) prob AİİS üzerinde transvers konur, sonra medial ucu kaudale gelecek şekilde döndürülerek pubik ramusla hizalanır (kaynaklarda ~45°). Bu modelde AİİS–İPE hattı transvers düzlemle ≈ ${Math.round(transversAciDer)}° açı yapıyor. Prob işareti laterale bakar.`,
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lineer prob', probUst, BEYAZ],
        ['Prob işareti → lateral', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['Psoas tendonu', Ps, KAS],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, lateralden mediale: iğne probun lateral ucundan girer, AİİS'in üzerinden geçerek ucu psoas tendonu ile pubik ramus arasındaki musküloskeletal plana, kemiğe temas edecek şekilde yerleştirilir. Femoral sinir ve arter yüzeyelde ve medialde kalır${sinirDerinlikCm ? ` (bu modelde sinir hedefin ≈ ${fmt(hedefDerinlikCm - sinirDerinlikCm)} cm yüzeyelinde)` : ''}. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}°, hedef derinliği ≈ ${fmt(hedefDerinlikCm)} cm.`,
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm lateralı`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Hedef: psoas tendonu ile\npubik ramus arası', T, CAMGOBEGI],
        ['Femoral arter', Fa, KIRMIZI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'Negatif aspirasyondan sonra enjeksiyon psoas tendonunu kemikten kaldırır; ilaç tendonun altında kapsülün önünde yayılarak eklem dallarını hedefler. Amaç motor koruyucu analjezidir; ancak yüksek hacimlerde ilacın femoral sinire ulaşıp kuadriseps güçsüzlüğü yapabildiği bildirilmiştir. İlaç ve hacim kurum protokolüne göre belirlenir.',
      katman: katmanYakin,
      vurgu: [PS],
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik\npsoas tendonu altında', T, CAMGOBEGI],
        ['Psoas tendonu', Ps, KAS],
        ['İliopubik eminens', ipeK, BEYAZ],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, hedefDerinlikCm, arterDerinlikCm, sinirDerinlikCm, girisProbKenariCm, transversAciDer, hatOran,
    aiisIpeCm: aiis.distanceTo(ipe) * 100,
    metin: `hedef (psoas tendonu altı) derinliği ≈ ${fmt(hedefDerinlikCm)} cm, giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°`,
    kesitBulundu: { psoas: !!Ps, iliakus: !!Il, arter: !!Fa, sinir: !!Fn, kemik: !!Ke },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, Ps, Il, Fa, Fv, Fn, Ke, aiis, ipe, aiisK, ipeK } };
}
