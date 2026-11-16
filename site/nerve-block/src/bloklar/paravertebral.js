// Torasik paravertebral blok — T4 (T4 ile T5 transvers çıkıntıları arası), parasagital, in-plane kaudalden kraniyale
import * as THREE from 'three';
import { Arac, fmt, RENK, etiketKurucu, etiketler, kamera, centroid } from '../blok.js';
import { transversCikinti, dikenUcu } from './esp.js';

export default {
  id: 'paravertebral',
  ad: 'Torasik paravertebral blok',
  kisa: 'Paravertebral',
  grup: 'Gövde',
  bolge: 'sirt',
  yatis: 'yuzustu',
  katmanAdlari: { organ: 'Plevra' },
  kur,
};

const T4 = 'Vertebra_T4';
const T5 = 'Vertebra_T5';
const KTB = 'Costotransverse_ligamentr';
const PL = 'Pleura';
const ICN = 'Intercostal_nervesr';
const SMP = ['Sympathetic_trunkr', 'Ganglia_of_sympathetic_trunkr'];
const KOK = ['Anterior_root_of_spinal_nerver', 'Posterior_root_of_spinal_nerver'];
const PIA = 'Posterior_intercostal_arteriesr';
const ES = ['Longissimus_thoracis_muscler', 'Iliocostalis_thoracis_muscler', 'Spinalis_thoracis_muscler'];
const TRAP = ['Descending_part_of_trapezius_muscler', 'Transverse_part_of_trapezius_muscler'];
const RH = ['Rhomboid_major_muscler', 'Rhomboid_minor_muscler'];
const IIC = ['Internal_intercostal_musclesr', 'Innermost_intercostal_musclesr', 'External_intercostal_musclesr'];

function kur(anat) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, MAVI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, PROB, KESIT, ORGAN } = RENK;

  const tp4 = transversCikinti(a, T4);
  const tp5 = transversCikinti(a, T5);
  const xMid = (tp4.xMid + tp5.xMid) / 2;
  const diken4 = dikenUcu(a, T4);
  const yAra = (tp4.merkez.y + tp5.merkez.y) / 2;

  // Prob: orta hattın ~2,5 cm lateralinde, T4 ve T5 transvers çıkıntılarının arasına ortalanmış, parasagital
  const xProb = xMid - 0.025;
  const tpZ = Math.min(tp4.arka.z, tp5.arka.z);
  const hedef0 = new THREE.Vector3(xProb, yAra, tpZ);
  const P = a.probYerlestir(hedef0, new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, -1, 0), { bas: 0.12, enCokDer: 15 });
  const { S, n, b, u, mz } = P;
  const kesit = a.kesitci(P, { derinlik: 0.08, yariGenislik: 0.035 });
  const nokta = (d) => S.clone().addScaledVector(b, d);

  // Kesit düzlemindeki (|mz| < 4 mm) köşeler, prob koordinatında: [köşe, u, derinlik]
  const duzlemde = (name) => a.verts(name).map((v) => { const d = v.clone().sub(S); return [v, d.dot(u), d.dot(b), d.dot(mz)]; })
    .filter(([, , dd, m]) => Math.abs(m) < 0.004 && dd > 0);
  const t4D = duzlemde(T4).filter(([, uu]) => uu < 0 && uu > -0.035);
  const t5D = duzlemde(T5).filter(([, uu]) => uu > 0 && uu < 0.035);
  const r5D = duzlemde('Fifth_ribr').filter(([, uu]) => uu > -0.01 && uu < 0.035);
  const ust = (arr) => (arr.length ? arr.reduce((m, x) => (x[2] < m[2] ? x : m)) : null);
  const tp4K = ust(t4D), tp5K = ust(t5D);
  // T4 transvers çıkıntısının kaudal kenarı (A) ve T5'in kraniyal kenarı (C); 5. kaburga boynunun kraniyal kenarı (B)
  const A = t4D.length ? t4D.reduce((m, x) => (x[1] > m[1] ? x : m)) : null;
  const C = t5D.length ? t5D.reduce((m, x) => (x[1] < m[1] ? x : m)) : null;
  const B = r5D.length ? r5D.reduce((m, x) => (x[1] < m[1] ? x : m)) : null;
  const tpD = Math.min(tp4K?.[2] ?? 1, tp5K?.[2] ?? 1);
  const uG = A && C ? (A[1] + C[1]) / 2 : 0;

  // Plevra derinliği: deriden ışın (plevra katmanı çift yüzlü)
  const isin = new THREE.Raycaster();
  const plevraDerin = (uu) => {
    isin.set(S.clone().addScaledVector(u, uu).addScaledVector(n, 0.02), b);
    const h = isin.intersectObject(anat.parts.get(PL), false)[0];
    return h ? h.distance - 0.02 : null;
  };
  const plD = anat.parts.has(PL) ? plevraDerin(uG) : null;

  // Süperior kostotransvers bağ: kaynak veride yok → T4 transvers çıkıntısının kaudal kenarından 5. kaburga boynunun
  // kraniyal kenarına uzanan şematik bant (türetilmiş). Bağın hedef sütunundaki derinliği:
  const Ap = A ? nokta(A[2]).addScaledVector(u, A[1]) : null;
  const Bp = B ? nokta(B[2]).addScaledVector(u, B[1]) : null;
  let ktbD = tpD + 0.008;
  if (Ap && Bp && Math.abs(B[1] - A[1]) > 1e-4) {
    const t = THREE.MathUtils.clamp((uG - A[1]) / (B[1] - A[1]), 0, 1);
    ktbD = A[2] + t * (B[2] - A[2]);
  }
  // Hedef: bağın 2–3 mm derini, plevranın en az 3 mm yüzeyeli
  const hedefD = plD ? Math.min(Math.max(ktbD + 0.003, (ktbD + plD) / 2), plD - 0.003) : ktbD + 0.004;
  const T = nokta(hedefD).addScaledVector(u, uG);

  const Tp4 = tp4K ? centroid(t4D.map((x) => x[0])) : tp4.merkez;
  const Tp5 = tp5K ? centroid(t5D.map((x) => x[0])) : tp5.merkez;
  const Ktb = Ap && Bp ? Ap.clone().lerp(Bp, 0.5) : null;
  const Pl = plD ? nokta(plD + 0.001).addScaledVector(u, uG) : null;
  const Es = kesit(ES);
  const Smp = a.merkez(SMP, (v) => Math.abs(v.y - yAra) < 0.008);
  const kok = a.merkez(KOK, (v) => Math.abs(v.y - yAra) < 0.01);
  const icnPv = a.merkez(ICN, (v) => Math.abs(v.y - yAra) < 0.012 && v.x < xMid - 0.015 && v.x > xMid - 0.035);

  // İğne açısı: kaudaldeki T5 transvers çıkıntısına ve 5. kaburgaya değmeden hedefe ulaşan en sığ açı (45–70°)
  const engel = [...t5D, ...r5D, ...t4D].map((x) => x[0]);
  const temizlik = (E0) => {
    const seg = new THREE.Line3(E0, T);
    const q = new THREE.Vector3();
    let m = Infinity;
    for (const v of engel) { seg.closestPointToPoint(v, true, q); if (q.distanceTo(T) > 0.003) m = Math.min(m, q.distanceTo(v)); }
    return m;
  };
  let ig = null;
  for (let aci = 45; aci <= 70; aci += 2.5) {
    ig = a.igneYolu(P, T, { aci, enCok: 0.035 });
    if (temizlik(ig.E) > 0.0025) break;
  }
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;
  const hedefDerinlikCm = hedefD * 100;
  const tpDerinlikCm = tpD * 100;
  const plevraCm = plD ? plD * 100 : null;
  const lateralCm = (xMid - S.x) * 100;

  // Yüzey işaretleri: C7 ve T4 dikenleri, prob yeri
  const arkadan = (p) => (p ? a.deriVur(p.clone().add(new THREE.Vector3(0, 0, -0.12)), new THREE.Vector3(0, 0, 1))?.p : null);
  const c7Deri = arkadan(dikenUcu(a, 'Vertebra_C7'));
  const t4Deri = arkadan(diken4);

  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.07,
    kesitGenislik: 0.038,
    la: { merkez: T.clone(), boyut: new THREE.Vector3(0.02, 0.004, 0.009) },
    isaretler: [[c7Deri, 0xffe14d], [t4Deri, 0xffe14d], [S, 0x35e07a]],
  });

  // Şematik süperior kostotransvers bağ (türetilmiş): kesit düzleminde A→B bandı
  if (Ap && Bp) {
    const eks = Bp.clone().sub(Ap);
    eks.addScaledVector(mz, -eks.dot(mz)).normalize();
    const dik = mz.clone().cross(eks).normalize();
    const bant = new THREE.Mesh(
      new THREE.BoxGeometry(Ap.distanceTo(Bp), 0.0018, 0.016),
      new THREE.MeshBasicMaterial({ color: 0xf4f1e6, transparent: true, opacity: 0.85, depthTest: false }),
    );
    bant.applyMatrix4(new THREE.Matrix4().makeBasis(eks, dik, mz));
    bant.position.copy(Ap.clone().lerp(Bp, 0.5));
    bant.renderOrder = 16; // şematik: her zaman görünür
    objects.ktb = bant;
    grup.add(bant);
  }

  // ---- Kameralar ----
  const genel = kamera(S.clone().add(new THREE.Vector3(0.03, 0.02, 0)), new THREE.Vector3(-0.3, 0.25, -1), 0.62);
  const orta = kamera(T.clone().add(new THREE.Vector3(0.005, 0, 0)), new THREE.Vector3(-0.55, 0.35, -0.75), 0.3);
  const yakin = kamera(T.clone().lerp(S, 0.45).addScaledVector(u, -0.005), new THREE.Vector3(-0.85, 0.25, -0.45), 0.18);

  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.06).addScaledVector(u, -0.019);
  const odak = [ICN, ...SMP, ...KOK, PIA, ...ES];
  const katmanYakin = { deri: 0.25, kas: 0.35, sinir: 1, arter: 0.8, ven: 0.5, kemik: 0.6, bag: 0.9, organ: 0.4 };
  const vurguK = [T4, T5];

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: `Hasta oturur (öne eğik) ya da yüzüstü/yan yatar. Bu örnekte T4 seviyesi seçildi (meme cerrahisinde sık kullanılır; tek enjeksiyon genellikle birkaç dermatoma yayılır). C7 dikeninden aşağı sayılarak T4 dikeni bulunur; torakal dikenler aşağı eğimli olduğundan T4 transvers çıkıntıları dikenin ucundan daha kraniyaldedir. Prob orta hattın ≈ ${fmt(lateralCm)} cm lateraline, parasagital konacak.`,
      katman: { deri: 1, kemik: 0.8, bag: 0.6 },
      vurgu: ['Vertebra_C7', T4],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['C7 dikeni', c7Deri, SARI, 0.09, 0.04],
        ['T4 dikeni', t4Deri, SARI, 0.1, -0.02],
        [`Prob yeri: orta hattın\n≈ ${fmt(lateralCm)} cm lateralinde`, S, PROB, -0.1, 0.03],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Paravertebral alanın sınırları ve içeriği',
      metin: 'Paravertebral alan kama biçimlidir: arkada süperior kostotransvers bağ (ve transvers çıkıntılar), önde-yanda parietal plevra, medialde omur gövdesi, intervertebral disk ve foramen. İçinde spinal sinir (interkostal sinire devam eder), dorsal dalın çıkışı, sempatik zincir ile bağlantı dalları ve interkostal damarlar bulunur. Alan kraniyal ve kaudal komşu seviyelerle, medialde foramen yoluyla epidural alanla bağlantılıdır. Süperior kostotransvers bağ kaynak modelde olmadığından üstteki transvers çıkıntı ile alttaki kaburga boynu arasında şematik olarak çizildi.',
      katman: { deri: 0.25, kas: 0.15, sinir: 1, arter: 1, ven: 0.6, kemik: 0.7, bag: 1, organ: 0.35 },
      vurgu: [ICN, ...SMP],
      odak: [ICN, ...SMP, ...KOK, PIA],
      goster: ['ktb'],
      etiket: etiketler(orta, [
        ['Süperior kostotransvers bağ\n(şematik)', Ktb, BEYAZ],
        ['İnterkostal sinir (T4)', icnPv, SARI],
        ['Sempatik zincir', Smp, SARI],
        ['Spinal sinir kökleri', kok, SARI],
        ['Posterior interkostal arter', a.merkez(PIA, (v) => Math.abs(v.y - yAra + 0.005) < 0.008 && v.x < xMid - 0.02 && v.x > xMid - 0.05), KIRMIZI],
        ['Parietal plevra', a.merkez(PL, (v) => Math.abs(v.y - yAra) < 0.01 && v.x < xMid - 0.03 && v.x > xMid - 0.05 && v.z < S.z + 0.08), ORGAN],
      ], { olcek: 0.7, uzaklik: 0.05 }),
      etiketOlcek: 0.7,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: 'Parasagital görüntüde transvers çıkıntılar yuvarlak-köşeli hiperekoik yapılar ve arkalarında akustik gölge olarak görülür. İki transvers çıkıntı arasında, yüzeyelde hiperekoik süperior kostotransvers bağ, derinde ise solunumla kayan parlak plevra çizgisi seçilir. Bağ ile plevra arasındaki dar hipoekoik aralık paravertebral alandır. Prob laterale kayınca kaburgalar ve aralarında plevra, mediale kayınca laminalar görülür.',
      katman: katmanYakin,
      vurgu: vurguK,
      odak,
      goster: ['kesit', 'ktb'],
      etiket: etiketler(yakin, [
        ['T4 transvers çıkıntısı', Tp4, KEMIK],
        ['T5 transvers çıkıntısı', Tp5, KEMIK],
        ['Süp. kostotransvers bağ\n(şematik)', Ktb, BEYAZ],
        ['Paravertebral alan', T, CAMGOBEGI],
        ['Plevra', Pl, ORGAN],
        ['Erektör spina', Es, KAS],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: `Lineer (ince yapılı hastada) ya da konveks prob parasagital, orta hattın ≈ ${fmt(lateralCm)} cm lateraline konur; prob işareti kaudale bakar. T4 ve T5 transvers çıkıntıları görüntünün iki yanında olacak, aralarındaki bağ ve plevra ortada kalacak biçimde prob kaydırılır. Bu modelde transvers çıkıntılar ≈ ${fmt(tpDerinlikCm)} cm${plevraCm ? `, plevra ≈ ${fmt(plevraCm)} cm` : ''} derinliktedir.`,
      katman: katmanYakin,
      vurgu: vurguK,
      odak,
      goster: ['prob', 'kesit', 'ktb'],
      etiket: etiketler(yakin, [
        ['Prob (parasagital)', probUst, BEYAZ],
        ['Prob işareti → kaudal', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['Plevra', Pl, ORGAN],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, kaudalden kraniyale: iğne probun kaudal ucundan girer, iki transvers çıkıntı arasından süperior kostotransvers bağı deler (çoğu kez hafif bir "pop" hissedilir) ve uç bağın hemen derininde, plevranın üzerinde durur. İğne ucu ve plevra sürekli görülmelidir; pnömotoraks başlıca risktir. İğneyi mediale (foramene) yöneltmek epidural/intratekal yayılım riskini artırır. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°, hedef derinliği ≈ ${fmt(hedefDerinlikCm)} cm.`,
      katman: katmanYakin,
      vurgu: vurguK,
      odak,
      goster: ['prob', 'kesit', 'ktb', 'igne', 'giris', 'hedef'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm kaudali`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Hedef: bağın derini,\nplevranın üstü', T, CAMGOBEGI],
        ['Plevra', Pl, ORGAN],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'Doğru yerde enjeksiyonda plevra öne doğru itilir (plevral çöküntü) ve bu, en güvenilir yayılım işaretidir. İlaç paravertebral alanda kraniyal ve kaudal komşu seviyelere, laterale interkostal aralığa ve medialde foramen yoluyla epidural alana yayılabilir. Sonuç tek taraflı somatik ve sempatik blokajdır; hipotansiyon iki taraflı uygulamada daha olasıdır. Tek enjeksiyonla yayılım değişkendir; geniş alan için birden çok seviyeye enjeksiyon yapılabilir.',
      katman: katmanYakin,
      vurgu: [ICN],
      odak,
      goster: ['prob', 'kesit', 'ktb', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik:\nparavertebral alanda', T.clone().addScaledVector(u, 0.008), CAMGOBEGI],
        ['Plevra öne itilir', Pl, ORGAN],
        ['Süp. kostotransvers bağ', Ktb, BEYAZ],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, hedefDerinlikCm, tpDerinlikCm, plevraCm, lateralCm, girisProbKenariCm,
    ktbDerinlikCm: ktbD * 100, uGCm: uG * 100,
    metin: `paravertebral alan (hedef) ≈ ${fmt(hedefDerinlikCm)} cm${plevraCm ? `, plevra ≈ ${fmt(plevraCm)} cm` : ''} derinlikte; giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°`,
    kesitBulundu: { tp4: !!tp4K, tp5: !!tp5K, kostotransversBag: !!Ktb, plevra: !!plD },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, Tp4, Tp5, Ktb, Pl } };
}
