// Erektör spina plan (ESP) bloğu — T5, parasagital, in-plane kraniyalden kaudale
import * as THREE from 'three';
import { Arac, fmt, RENK, etiketKurucu, etiketler, kamera, centroid } from '../blok.js';

export default {
  id: 'esp',
  ad: 'Erektör spina plan (ESP) bloğu',
  kisa: 'ESP',
  grup: 'Gövde',
  bolge: 'sirt',
  yatis: 'yuzustu',
  katmanAdlari: { organ: 'Plevra' },
  kur,
};

const TRAP = ['Descending_part_of_trapezius_muscler', 'Transverse_part_of_trapezius_muscler'];
const RMA = 'Rhomboid_major_muscler';
const RMI = 'Rhomboid_minor_muscler';
const LT = 'Longissimus_thoracis_muscler';
const IC = 'Iliocostalis_thoracis_muscler';
const SP = 'Spinalis_thoracis_muscler';
const ES = [LT, IC, SP];
const DERIN_KAS = ['Semispinalis_thoracis_muscler', 'Multifidus_thoracis_muscler', 'Rotatoresr', 'Levatores_longi_costarumr', 'Levatores_breves_costarumr'];
const T5 = 'Vertebra_T5';
const T6 = 'Vertebra_T6';
const ICN = 'Intercostal_nervesr';

/** Bir omurun sağ transvers çıkıntısı: uç, arka yüz ve merkez */
export function transversCikinti(a, omur) {
  const vs = a.verts(omur);
  const xMid = centroid(vs).x;
  const sag = vs.filter((v) => v.x < xMid - 0.018);
  const uc = sag.reduce((m, v) => (v.x < m.x ? v : m));
  // ucun 1 cm medialine kadar olan bölüm: transvers çıkıntının lateral kısmı
  const lat = sag.filter((v) => v.x < uc.x + 0.01);
  const merkez = centroid(lat);
  const arka = centroid(lat.filter((v) => v.z < merkez.z));
  return { xMid, uc, lat, merkez, arka };
}

/** Bir dikenli çıkıntının arka ucu */
export function dikenUcu(a, omur) {
  return a.verts(omur).reduce((m, v) => (v.z < m.z ? v : m));
}

function kur(anat) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, PROB, KESIT, ORGAN } = RENK;

  const tp5 = transversCikinti(a, T5);
  const tp6 = transversCikinti(a, T6);
  const xMid = tp5.xMid;
  const diken5 = dikenUcu(a, T5);
  const diken7 = dikenUcu(a, 'Vertebra_C7');

  // Hedef: T5 transvers çıkıntısının lateral kısmının arka yüzü (2 mm yüzeyelinde, kas ile kemik arası)
  const tpYuzey = tp5.lat.filter((v) => Math.abs(v.y - tp5.arka.y) < 0.006).reduce((m, v) => (v.z < m.z ? v : m));
  const hedef0 = new THREE.Vector3(tp5.uc.x + 0.006, tp5.arka.y, tpYuzey.z);

  // Prob: parasagital, işaret (ve iğne) kraniyalde
  const P = a.probYerlestir(hedef0, new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 1, 0), { bas: 0.12, enCokDer: 15 });
  const { S, n, b, u, mz } = P;
  const kesit = a.kesitci(P, { derinlik: 0.07, yariGenislik: 0.035 });
  const derin = (names) => {
    let r = null;
    for (const nm of [].concat(names)) {
      const d = a.derinlikler(P, nm, { genislik: 0.005, tol: 0.004 });
      if (!d) continue;
      r = r ? { ust: Math.min(r.ust, d.ust), alt: Math.max(r.alt, d.alt) } : d;
    }
    return r;
  };
  const dTrap = derin(TRAP), dRh = derin([RMA, RMI]), dEs = derin(ES);
  const dTp = a.derinlikler(P, T5, { genislik: 0.008, tol: 0.006 });
  const tpD = dTp ? dTp.ust : hedef0.clone().sub(S).dot(b);
  const nokta = (d) => S.clone().addScaledVector(b, d);
  const T = nokta(tpD - 0.002);
  const Tr = dTrap ? nokta((dTrap.ust + dTrap.alt) / 2) : kesit(TRAP);
  const Rh = dRh ? nokta((dRh.ust + dRh.alt) / 2) : kesit([RMA, RMI]);
  const Es = dEs ? nokta((dEs.ust + Math.min(dEs.alt, tpD)) / 2) : kesit(ES);
  const Tp = nokta(tpD + 0.003);
  const Tp6 = kesit(T6, 0.004, (v) => v.y < tp5.merkez.y - 0.01);
  const Pl = kesit('Pleura', 0.004);

  const ig = a.igneYolu(P, T, { aci: 40, enCok: 0.035 });
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;
  const tpDerinlikCm = tpD * 100;
  const lateralCm = (xMid - S.x) * 100;
  const dikenTpCm = (diken5.y - tp5.merkez.y) * 100;

  // Yüzey işaretleri
  const arkadan = (p) => (p ? a.deriVur(p.clone().add(new THREE.Vector3(0, 0, -0.12)), new THREE.Vector3(0, 0, 1))?.p : null);
  const c7Deri = arkadan(diken7);
  const t5Deri = arkadan(diken5);
  const skp = a.verts('Scapular');
  const altAci = skp.length ? skp.reduce((m, v) => (v.y < m.y ? v : m)) : null;
  const altAciDeri = arkadan(altAci);

  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.06,
    kesitGenislik: 0.038,
    la: { merkez: T.clone().addScaledVector(b, -0.001), boyut: new THREE.Vector3(0.032, 0.0035, 0.013) },
    isaretler: [[c7Deri, 0xffe14d], [t5Deri, 0xffe14d], [altAciDeri, 0xffe14d], [S, 0x35e07a]],
  });

  // ---- Kameralar: arkadan; yakın görünüm sağ-arka-üstten (parasagital kesit düzlemine yandan) ----
  const genel = kamera(S.clone().add(new THREE.Vector3(0.03, 0.02, 0)), new THREE.Vector3(-0.3, 0.25, -1), 0.62);
  const orta = kamera(T.clone().add(new THREE.Vector3(0.0, 0.005, -0.01)), new THREE.Vector3(-0.4, 0.35, -0.85), 0.33);
  const yakin = kamera(T.clone().lerp(S, 0.45), new THREE.Vector3(-0.75, 0.32, -0.58), 0.26);

  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.05).addScaledVector(u, -0.019);
  const odak = [...TRAP, RMA, RMI, ...ES, ICN, 'Posterior_intercostal_arteriesr'];
  const katmanYakin = { deri: 0.25, kas: 0.45, sinir: 1, arter: 0.6, ven: 0.5, kemik: 0.6, bag: 0.4, organ: 0 };
  const kemikVurgu = [T5];

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: `Hasta yüzüstü ya da oturur ve öne eğik. Boynun tabanında en belirgin diken C7'dir (vertebra prominens); aşağı doğru sayılarak T5 dikeni bulunur. Skapulanın alt açısı yaklaşık T7 hizasındadır. Torakal dikenler aşağı eğimli olduğundan bir dikenin ucu kendi transvers çıkıntısının altında kalır (bu modelde T5 dikeninin ucu T5 transvers çıkıntısının ≈ ${fmt(Math.abs(dikenTpCm))} cm kaudalinde); seviye ultrasonla doğrulanır. Prob orta hattın ≈ ${fmt(lateralCm)} cm lateraline, parasagital konacak.`,
      katman: { deri: 1, kemik: 0.8, bag: 0.6 },
      vurgu: ['Vertebra_C7', T5],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['C7 dikeni\n(vertebra prominens)', c7Deri, SARI, 0.09, 0.04],
        ['T5 dikeni', t5Deri, SARI, 0.1, -0.01],
        ['Skapula alt açısı (≈ T7)', altAciDeri, SARI, -0.04, -0.07],
        [`Prob yeri: orta hattın\n≈ ${fmt(lateralCm)} cm lateralinde`, S, PROB, -0.1, 0.03],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Sırt kasları ve erektör spina planı',
      metin: 'Yüzeyelden derine: trapezius, rhomboid majör ve erektör spina (bu seviyede çoğunlukla longissimus torasis; lateralinde iliokostalis, medialinde spinalis). Erektör spinanın derininde transvers çıkıntılar ve kaburgalar bulunur. ESP bloğunda ilaç, erektör spina ile transvers çıkıntı arasındaki fasyal plana verilir. Spinal sinirlerin dorsal dalları bu plandan geçer (modelde dorsal dallar yok); ventral dallar (interkostal sinirler) ve paravertebral alan transvers çıkıntıların önündedir.',
      katman: { deri: 0.3, kas: 0.85, sinir: 1, arter: 0.6, kemik: 0.75, bag: 0.4 },
      vurgu: [LT, IC, SP],
      odak,
      goster: [],
      etiket: etiketler(orta, [
        ['Trapezius', a.merkez(TRAP, (v) => Math.abs(v.y - S.y - 0.03) < 0.01 && Math.abs(v.x - S.x) < 0.02), KAS],
        ['Rhomboid majör', a.merkez(RMA, (v) => Math.abs(v.y - S.y - 0.02) < 0.01 && v.x < S.x), KAS],
        ['Longissimus torasis', a.merkez(LT, (v) => Math.abs(v.y - S.y + 0.03) < 0.01), KAS],
        ['İliokostalis torasis', a.merkez(IC, (v) => Math.abs(v.y - S.y + 0.04) < 0.01), KAS],
        ['T5 transvers çıkıntısı', tp5.merkez, KEMIK],
        ['İnterkostal sinir (ventral dal)', a.merkez(ICN, (v) => Math.abs(v.y - tp6.merkez.y + 0.01) < 0.008 && v.x < S.x - 0.01 && v.x > S.x - 0.04), SARI],
      ], { olcek: 0.7, uzaklik: 0.05 }),
      etiketOlcek: 0.7,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: 'Parasagital görüntüde yüzeyelden derine trapezius, rhomboid majör ve erektör spina kas katmanları görülür. Transvers çıkıntılar düz, köşeli ("kare") hiperekoik çizgiler ve arkalarında akustik gölge olarak seçilir. Prob laterale kayınca kaburgalar yuvarlak görünür ve aralarında kayan plevra çizgisi belirir; mediale kayınca laminalar neredeyse kesintisiz bir çizgi oluşturur. Bu ayrım transvers çıkıntıyı tanımada kullanılır.',
      katman: { ...katmanYakin, organ: 0.3 },
      vurgu: kemikVurgu,
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['Trapezius', Tr, KAS],
        ['Rhomboid majör', Rh, KAS],
        ['Erektör spina', Es, KAS],
        ['T5 transvers çıkıntısı', Tp, KEMIK],
        ['T6 transvers çıkıntısı', Tp6, KEMIK],
        ['Plevra (derinde)', Pl, ORGAN],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: `Lineer prob T5 transvers çıkıntısının üzerine parasagital (uzun ekseni kraniyo-kaudal) konur; prob işareti kraniyale bakar. Genellikle önce lateralde kaburgalar bulunur, prob mediale kaydırılarak kare transvers çıkıntı görüntüsü ortalanır. Bu modelde prob orta hattın ≈ ${fmt(lateralCm)} cm lateralinde, transvers çıkıntı ≈ ${fmt(tpDerinlikCm)} cm derinliktedir.`,
      katman: katmanYakin,
      vurgu: kemikVurgu,
      odak,
      goster: ['prob', 'kesit'],
      etiket: etiketler(yakin, [
        ['Lineer prob (parasagital)', probUst, BEYAZ],
        ['Prob işareti → kraniyal', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['T5 transvers çıkıntısı', Tp, KEMIK],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, kraniyalden kaudale: iğne probun kraniyal ucundan girer; trapezius, rhomboid majör ve erektör spina geçilir, uç transvers çıkıntının arka yüzüne değdirilir (kemik teması derinlik sınırıdır). Aspirasyondan sonra 2–3 mL ile hidrodiseksiyon yapılır: sıvı erektör spinayı transvers çıkıntıdan kaldırmalıdır. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°.`,
      katman: katmanYakin,
      vurgu: kemikVurgu,
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm kraniyali`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Hedef: transvers çıkıntının\narka yüzü (ES altı)', T, CAMGOBEGI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'Doğru planda ilaç erektör spina kasının altında kraniyo-kaudal doğrultuda yayılır ve kası transvers çıkıntıdan ayırır (genellikle 20–30 mL). Dorsal dalların blokajı tutarlıdır; ilacın kostotransvers bağlar arasından ön dallara (interkostal sinirler) ve paravertebral alana geçişi ise değişkendir, bu yüzden duyusal blok yaygınlığı hastadan hastaya farklılık gösterir. Plevra ve nöraksiyel yapılardan uzak, yüzeyel bir plan bloğu olması güvenlik avantajıdır; toplam lokal anestezik dozu hesaplanmalıdır.',
      katman: katmanYakin,
      vurgu: [...ES],
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik:\nerektör spina altında, kraniyo-kaudal', T.clone().addScaledVector(u, -0.012), CAMGOBEGI],
        ['Erektör spina', Es, KAS],
        ['T5 transvers çıkıntısı', Tp, KEMIK],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, tpDerinlikCm, lateralCm, girisProbKenariCm, dikenTpCm,
    katmanlarCm: { trapez: dTrap, rhomboid: dRh, es: dEs, tp: dTp },
    metin: `T5 transvers çıkıntısı ≈ ${fmt(tpDerinlikCm)} cm derinlikte, prob orta hattın ≈ ${fmt(lateralCm)} cm lateralinde; giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°`,
    kesitBulundu: { trapez: !!Tr, rhomboid: !!Rh, erektorSpina: !!dEs, transvers: !!dTp },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, Tr, Rh, Es, Tp, tp5: tp5.merkez } };
}
