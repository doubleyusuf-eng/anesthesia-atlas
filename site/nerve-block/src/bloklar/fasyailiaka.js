// Suprainguinal fasya iliaka bloğu (Hebbard yaklaşımı): parasagital prob, iğne kaudalden, uç fasya iliaka altında
import * as THREE from 'three';
import { Arac, V, fmt, RENK, etiketKurucu, etiketler, kamera } from '../blok.js';

export default {
  id: 'fasyailiaka',
  ad: 'Suprainguinal fasya iliaka bloğu',
  kisa: 'Fasya iliaka (SI)',
  grup: 'Alt ekstremite',
  bolge: 'femoral',
  yatis: 'sirtustu',
  katmanAdlari: { fasya: 'Fasya iliaka' },
  kur,
};

const IL = 'Iliacus_muscler';
const PS = 'Psoas_majorr';
const SA = 'Sartorius_muscler';
const IO = 'Internal_abdominal_oblique_muscler';
const TA = 'Transversus_abdominis_muscler';
const EO = 'External_abdominal_oblique_muscler';
const FN = 'Femoral_nerver';
const LFCN = 'Lateral_femoral_cutaneous_nerver';
const OBT = 'Obturator_nerver';
const FAS = 'Fascia_iliaca_turetilmis';
const DCIA = 'Deep_circumflex_iliac_artery_turetilmis';
const LIG = 'Inguinal_ligament_turetilmis';
const KEMIK = 'Hip_boner';

function kur(anat, isaretler) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, BEYAZ, PEMBE, CAMGOBEGI, KAS, YESIL, PROB, KESIT } = RENK;
  const sias = V(isaretler.sias);
  const pt = V(isaretler.tuberkulumPubikum);
  const aiis = V(isaretler.sais);
  const yLig = (x) => pt.y + ((x - pt.x) / (sias.x - pt.x)) * (sias.y - pt.y);
  const fasya = anat.parts.get(FAS);
  const kemik = anat.parts.get(KEMIK);
  const vur = (mesh, from, dir) => { a.ray.set(from, dir); return a.ray.intersectObject(mesh, false)[0]?.point.clone() || null; };

  // Prob sütunu: SİAS'ın ~1,2 cm medialı; prob ortası inguinal ligament hizasında, parasagital (kaudal yarıda sartorius,
  // kraniyal yarıda internal oblik ve iliak fossa)
  const x0 = sias.x + 0.012;
  const yHedef = yLig(x0) + 0.016; // hedef: ligamentin kraniyalinde, fasya altında
  const F0 = vur(fasya, new THREE.Vector3(x0, yHedef, 0.3), new THREE.Vector3(0, 0, -1));
  const P = a.probYerlestir(new THREE.Vector3(x0, yLig(x0) + 0.004, F0.z), new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, -1, 0), { enCokDer: 10, bas: 0.15 });
  const { S, n, b, u } = P;
  const kesit = a.kesitci(P, { derinlik: 0.07 });

  // Fasya iliaka: kesit düzleminde, ligamentin kraniyalindeki hedef hizasında
  let Fk = null;
  for (let s2 = -0.03; s2 <= 0.015; s2 += 0.001) {
    const h = vur(fasya, S.clone().addScaledVector(u, s2).addScaledVector(n, 0.02), b);
    if (h && (!Fk || Math.abs(h.y - yHedef) < Math.abs(Fk.y - yHedef))) Fk = h;
  }
  Fk = Fk || F0;
  const T = Fk.clone().addScaledVector(b, 0.0025); // fasyanın 2–3 mm derini, iliakusun üzerinde
  const ig = a.igneYolu(P, T, { aci: 45, enCok: 0.03 });
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;
  const fasyaDerinlikCm = Fk.clone().sub(S).dot(b) * 100;
  // İğne yolunun derin sirkumfleks iliak artere (kesitteki merkezi) en yakın uzaklığı ve arterin hangi tarafından geçtiği
  const DcK = kesit(DCIA, 0.004);
  let dciaMm = null, dciaDerininden = null;
  if (DcK) {
    const seg = T.clone().sub(E);
    const t = THREE.MathUtils.clamp(DcK.clone().sub(E).dot(seg) / seg.lengthSq(), 0, 1);
    const q = E.clone().addScaledVector(seg, t);
    dciaMm = DcK.distanceTo(q) * 1000;
    dciaDerininden = q.clone().sub(S).dot(b) > DcK.clone().sub(S).dot(b);
  }
  const ligUstuCm = (T.y - yLig(T.x)) * 100;

  // Kesitteki yapılar
  const Il = kesit(IL, 0.003, (v, d) => d.dot(b) > fasyaDerinlikCm / 100);
  const Sa = kesit(SA);
  const Io = kesit(IO);
  const Ta = kesit(TA);
  const Dc = DcK;
  const Ke = kesit(KEMIK, 0.003);
  // Papyon (bow-tie) işareti: sartorius ve İO fasyalarının inguinal ligament hizasında birleştiği yer (kesitte)
  const ligKesit = (() => {
    const yl = yLig(S.x);
    const p = S.clone().addScaledVector(u, (S.y - yl)); // u ≈ kaudal: ligament hizasına kaydır
    const sk = a.deriVur(p.clone().addScaledVector(n, 0.1), b);
    return sk ? sk.p.addScaledVector(b, Math.max(0.008, fasyaDerinlikCm / 100 * 0.45)) : p;
  })();

  // ---- Nesneler; prob işareti kraniyale (sagital kesit geleneği): işaret küresini -u ucuna al ----
  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.07,
    la: { merkez: T.clone().addScaledVector(u, -0.009).addScaledVector(b, 0.001), boyut: new THREE.Vector3(0.024, 0.0032, 0.016) },
    isaretler: [[sias, 0xffe14d], [pt, 0xffe14d], [S, 0x35e07a]],
  });
  const isaretKure = objects.prob.children[4];
  if (isaretKure) isaretKure.position.x = -0.0215;

  // ---- Etiket noktaları ----
  const ligOrta = sias.clone().lerp(pt, 0.35).add(new THREE.Vector3(0, -0.006, 0.004));
  const siasDeri = a.deriVur(sias.clone().add(new THREE.Vector3(0, 0, 0.1)), new THREE.Vector3(0, 0, -1))?.p || sias;
  const ilFossa = a.uc(IL, new THREE.Vector3(0, 0, 1), (v) => v.y > yLig(v.x) + 0.03 && v.y < yLig(v.x) + 0.06, 0.2);
  const psoasOn = a.uc(PS, new THREE.Vector3(0, 0, 1), (v) => v.y > yLig(v.x) + 0.03 && v.y < yLig(v.x) + 0.06, 0.2);
  const fnUst = a.merkez(FN, (v) => v.y > yLig(v.x) + 0.015 && v.y < yLig(v.x) + 0.04);
  const lfcnUst = a.merkez(LFCN, (v) => v.y > yLig(v.x) + 0.0 && v.y < yLig(v.x) + 0.03);
  const obtUst = a.merkez(OBT, (v) => v.y > yLig(v.x) + 0.02 && v.y < yLig(v.x) + 0.05);
  const fasyaUst = vur(fasya, new THREE.Vector3(x0 + 0.01, yLig(x0) + 0.045, 0.3), new THREE.Vector3(0, 0, -1));
  const dciaOrta = a.merkez(DCIA, (v) => Math.abs(v.x - (sias.x + 0.025)) < 0.006);
  const ioOn = a.uc(IO, new THREE.Vector3(0, 0, 1), (v) => v.y > yLig(v.x) + 0.02 && v.y < yLig(v.x) + 0.05 && v.x < S.x + 0.01, 0.3);
  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, -0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.045).addScaledVector(u, 0.019);

  // ---- Kameralar: hastanın sağında, önden-yandan ----
  const genel = kamera(S.clone().add(new THREE.Vector3(0.005, -0.02, -0.01)), new THREE.Vector3(-0.35, 0.15, 0.92), 0.55);
  const orta = kamera(T.clone().add(new THREE.Vector3(0.012, 0.012, 0)), new THREE.Vector3(-0.3, 0.45, 0.84), 0.33);
  const yakinHedef = T.clone().lerp(S, 0.35).addScaledVector(u, 0.006);
  const yakin = kamera(yakinHedef, new THREE.Vector3(-0.93, 0.12, 0.34), 0.21);

  const odak = [IL, PS, SA, IO, TA, FN, LFCN, OBT, FAS, DCIA, 'External_iliac_arteryr', 'Femoral_arteryr', 'Femoral_veinr', 'External_iliac_veinr'];
  // 2. adımda karın duvarı ve sartorius soluk: iliak fossanın içi görünsün
  const odak2 = odak.filter((x) => ![SA, IO, TA].includes(x));
  const katmanYakin = { deri: 0.25, kas: 0.45, fasya: 0.75, arter: 1, ven: 0.8, sinir: 1, kemik: 0.45, bag: 0.8 };

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: 'Hasta sırtüstü, bacak düz. SİAS ve tüberkülum pubikum palpe edilir; aralarındaki çizgi inguinal ligamenttir. Prob, SİAS\'ın 1–2 cm medialinde, inguinal ligamente dik (parasagital) konur; bu yaklaşımda iğne ligamentin üstündeki iliak fossaya, fasya iliakanın altına yönlendirilir.',
      katman: { deri: 1, kemik: 0.8, bag: 1 },
      vurgu: [LIG],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['SİAS', siasDeri, SARI, -0.07, 0.04],
        ['Tüberkülum pubikum', pt, SARI, 0.07, -0.03],
        ['İnguinal ligament', ligOrta, BEYAZ, 0.05, 0.06],
        ['Prob yeri: SİAS\'ın medialı,\nligamente dik', S, PROB, -0.09, -0.05],
      ]),
      kamera: genel,
    },
    {
      baslik: 'İliak fossa ve fasya iliaka',
      metin: 'İliak kas iliak fossayı döşer; medialde psoas majör ile birleşir. İkisinin üzerini fasya iliaka örter. Femoral sinir psoas ile iliakusun arasındaki olukta, lateral femoral kutanöz sinir iliakusun üzerinde SİAS\'a doğru, ikisi de fasya iliakanın derininde ilerler. Obturator sinir psoasın medial kenarında, pelvis duvarında kalır; bu yüzden bu bloktan güvenilir biçimde etkilenmez. Derin sirkumfleks iliak arter ligamentin hemen kraniyalinde fasyanın yüzeyelinde laterale uzanır.',
      katman: { deri: 0.25, kas: 0.8, fasya: 0.45, arter: 1, ven: 0.6, sinir: 1, kemik: 0.7, bag: 1 },
      vurgu: [FN, LFCN],
      odak: odak2,
      goster: [],
      etiket: etiketler(orta, [
        ['İliak kas', ilFossa, KAS],
        ['Psoas majör', psoasOn, KAS],
        ['Fasya iliaka (türetilmiş)', fasyaUst, YESIL],
        ['Femoral sinir', fnUst, SARI],
        ['Lateral femoral\nkutanöz sinir', lfcnUst, SARI],
        ['Obturator sinir (medialde)', obtUst, SARI],
        ['Derin sirkumfleks iliak a.\n(türetilmiş)', dciaOrta, KIRMIZI],
      ], { olcek: 0.75, uzaklik: 0.06 }),
      etiketOlcek: 0.75,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: 'Parasagital kesitte derinde iliak kemik, kaudalden (AİİS tarafı) kraniyale derinleşen parlak bir çizgi olarak görülür; üzerinde iliak kas ve onu örten parlak fasya iliaka uzanır. Yüzeyelde kaudalde sartorius, kraniyalde internal oblik kasın fasyaları inguinal ligament hizasında birleşerek "papyon" (bow-tie) görüntüsü verir. Derin sirkumfleks iliak arter fasya iliakanın hemen yüzeyelinde küçük bir pulsatil daire olarak seçilir; Doppler ile doğrulanır.',
      katman: katmanYakin,
      vurgu: [FAS],
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['İliak kas', Il, KAS],
        ['Fasya iliaka', Fk, YESIL],
        ['Sartorius', Sa, KAS, 0.03, -0.03],
        ['İnternal oblik', Io, KAS],
        ['Papyon işareti', ligKesit, BEYAZ],
        ['Derin sirkumfleks\niliak arter', Dc, KIRMIZI],
        ['İlium', Ke, BEYAZ],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: 'Lineer prob SİAS\'ın medialinde, inguinal ligamente dik (parasagital) konur; prob işareti kraniyale bakar. İliak kemik, iliak kas, fasya iliaka ve papyon işareti aynı görüntüde görülene kadar prob medial-lateral kaydırılır ve hafifçe eğilir.',
      katman: katmanYakin,
      vurgu: [FAS],
      odak,
      goster: ['prob', 'kesit'],
      etiket: etiketler(yakin, [
        ['Lineer prob', probUst, BEYAZ],
        ['Prob işareti → kraniyal', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['Fasya iliaka', Fk, YESIL],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, kaudalden kraniyale: iğne probun kaudal ucundan girer, sartorius ve inguinal ligament hizası geçilir; uç fasya iliakayı delip iliak kasın üzerine, ligamentin kraniyalinde yerleştirilir. Derin sirkumfleks iliak arter iğne yolunun dışında tutulur${dciaMm ? ` (bu modelde iğne arterin ≈ ${Math.round(dciaMm)} mm ${dciaDerininden ? 'derininden' : 'yüzeyelinden'} geçiyor)` : ''}. Doğru plan, küçük bir test dozunun fasyayı iliakustan ayırmasıyla doğrulanır. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}°, fasya iliaka derinliği ≈ ${fmt(fasyaDerinlikCm)} cm; hedef ligamentin ≈ ${fmt(ligUstuCm)} cm kraniyalinde.`,
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm kaudali`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Hedef: fasya iliaka altı,\niliak kas üzeri', T, CAMGOBEGI],
        ['Derin sirkumfleks\niliak arter', Dc, KIRMIZI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'Doğru planda ilaç fasya iliakayı iliak kastan ayırır ve iliak fossa boyunca kraniyale yayılır. Böylece fasyanın altındaki femoral ve lateral femoral kutanöz sinirlere ulaşır; obturator sinire ulaşması tutarsızdır. Hacme dayalı bir plan bloğu olduğundan toplam lokal anestezik dozu hesaplanmalıdır; ilaç ve hacim kurum protokolüne göre belirlenir.',
      katman: { ...katmanYakin, kas: 0.4 },
      vurgu: [FN, LFCN],
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik\nfasya iliaka altında, kraniyale', T.clone().addScaledVector(u, -0.012), CAMGOBEGI],
        ['Fasya iliaka', Fk, YESIL],
        ['İliak kas', Il, KAS],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, fasyaDerinlikCm, girisProbKenariCm, ligUstuCm, dciaMm,
    siasMedialCm: (S.x - sias.x) * 100,
    metin: `fasya iliaka derinliği ≈ ${fmt(fasyaDerinlikCm)} cm, giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°`,
    kesitBulundu: { iliakus: !!Il, fasya: !!Fk, sartorius: !!Sa, ioBlik: !!Io, dcia: !!Dc, kemik: !!Ke },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, Fk, Il, Sa, Io, Ta, Dc, Ke, sias, aiis } };
}
