// Subgluteal siyatik blok (büyük trokanter ile iskiyal tüberosite arası; gluteus maksimusun derininde)
import * as THREE from 'three';
import { Arac, V, fmt, RENK, etiketKurucu, etiketler, kamera } from '../blok.js';

export default {
  id: 'subgluteal',
  ad: 'Subgluteal siyatik blok',
  kisa: 'Subgluteal siyatik',
  grup: 'Alt ekstremite',
  bolge: 'kalca',
  yatis: 'yuzustu',
  kur,
};

const SIY = 'Sciatic_nerver';
const PFK = 'Posterior_femoral_cutaneous_nerver';
const GM = 'Gluteus_maximus_muscler';
const GMED = 'Gluteus_medius_muscler';
const QF = 'Quadratus_femoris_muscler';
const BF = 'Long_head_of_biceps_femorisr';
const ST = 'Semitendinosus_muscler';
const SM = 'Semimembranosus_muscler';
const AM = 'Adductor_magnusr';
const IGA = 'Inferior_gluteal_arteryr';
const IGV = 'Inferior_gluteal_veinsr';

function kur(anat, isaretler) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, PROB, KESIT } = RENK;

  // Kemik işaretleri (Z-Anatomy işaret çizgilerinin kemik ucu)
  const GT = isaretler.trokanterMajor ? V(isaretler.trokanterMajor) : a.uc('Femurr', new THREE.Vector3(-1, 0.3, 0), () => true, 0.02);
  const IT = isaretler.iskiyalTuber ? V(isaretler.iskiyalTuber) : a.uc('Hip_boner', new THREE.Vector3(0, -1, -0.3), () => true, 0.02);

  // Seviye: iskiyal tüberositenin hemen altı (trokanter–tüberosite hattı, gluteus maksimusun alt yarısı)
  const yL = IT.y - 0.005;
  const sinir0 = a.merkez(SIY, (v) => Math.abs(v.y - yL) < 0.004);

  // Prob: arka yüzde transvers; iğne lateral uçtan (trokanter tarafı)
  const P = a.probYerlestir(sinir0, new THREE.Vector3(0, 0, -1), new THREE.Vector3(-1, 0, 0), { bas: 0.2, enCokDer: 15, alan: 0.02 });
  const { S, n, b, u } = P;
  const kesit = a.kesitci(P, { yariGenislik: 0.035, derinlik: 0.115 });
  const Sy = kesit(SIY, 0.004) || sinir0;
  const Gm = kesit(GM, 0.004, (v) => Math.abs(v.clone().sub(Sy).dot(u)) < 0.02 && v.clone().sub(Sy).dot(b) < 0);
  const Qf = kesit(QF, 0.004);
  const Hm = kesit([BF, ST, SM], 0.004);
  const Pf = kesit(PFK, 0.004);
  const Fm = kesit('Femurr', 0.004);
  const It = kesit('Hip_boner', 0.004);

  // Hedef: sinirin lateral kenarı, gluteus maksimusun derin fasyasının altı
  const T = Sy.clone().addScaledVector(u, 0.006).addScaledVector(b, -0.002);
  const ig = a.igneYolu(P, T, { enCok: 0.035, aci: 45 });
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;
  const sinirDerinlikCm = Sy.clone().sub(S).dot(b) * 100;
  const dGM = a.derinlikler(P, GM, { genislik: 0.008 });
  const gmAltCm = dGM ? dGM.alt * 100 : null;

  // Yüzey işaretleri: büyük trokanter (lateral), iskiyal tüberosite (medial), gluteal kıvrım
  const gtDeri = a.deriVur(GT.clone().add(new THREE.Vector3(-0.15, 0, -0.08)), new THREE.Vector3(0.88, 0, 0.47).normalize())?.p;
  const itDeri = a.deriVur(IT.clone().add(new THREE.Vector3(0, -0.02, -0.2)), new THREE.Vector3(0, 0.1, 1).normalize())?.p;
  // Gluteal kıvrım: gluteus maksimusun alt kenarının hizasında, prob ekseninde arka deri
  const gmAlt = Math.min(...a.verts(GM).filter((v) => Math.abs(v.x - S.x) < 0.02).map((v) => v.y));
  const kivrim = a.deriVur(new THREE.Vector3(S.x, gmAlt + 0.01, S.z - 0.15), new THREE.Vector3(0, 0, 1))?.p;

  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.115,
    kesitGenislik: 0.07,
    la: { merkez: Sy.clone().addScaledVector(b, -0.001), boyut: new THREE.Vector3(0.012, 0.007, 0.03) },
    isaretler: [[gtDeri, 0xffe14d], [itDeri, 0xffe14d], [kivrim, 0xffe14d], [S, 0x35e07a]],
  });

  // ---- Kameralar: arkadan (hasta yüzüstü) ----
  const genel = kamera(S.clone().add(new THREE.Vector3(0.0, 0.02, 0)), new THREE.Vector3(-0.35, 0.3, -1), 0.62);
  const orta = kamera(Sy.clone().add(new THREE.Vector3(0, 0.01, 0)), new THREE.Vector3(-0.45, 0.35, -0.85), 0.4);
  const yakin = kamera(S.clone().addScaledVector(b, 0.05), new THREE.Vector3(-0.3, 0.6, -0.75), 0.36);

  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.085).addScaledVector(u, -0.032);
  const odak = [SIY, PFK, GM, QF, BF, ST, SM, AM, IGA, IGV];
  const katmanYakin = { deri: 0.25, kas: 0.45, sinir: 1, arter: 1, ven: 1, kemik: 0.8, bag: 0.8 };

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: 'Hasta yüzüstü ya da blok tarafı yukarıda yan yatış (kalça ve diz hafif bükülü). Lateralde büyük trokanter, medialde iskiyal tüberosite elle bulunur. Prob bu iki kemik çıkıntıyı birleştiren hatta, transvers konacak; gluteal kıvrım bu hattın birkaç santimetre altındadır.',
      katman: { deri: 1, kemik: 0.8 },
      vurgu: ['Femurr', 'Hip_boner'],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['Büyük trokanter', gtDeri, SARI, 0.07, 0.06],
        ['İskiyal tüberosite', itDeri, SARI, -0.11, 0.04],
        ['Gluteal kıvrım', kivrim, SARI, -0.09, -0.06],
        ['Prob seviyesi', S, PROB, 0.1, -0.06],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Subgluteal boşluk',
      metin: 'Siyatik sinir pelvisten piriformisin altından çıkar ve gluteus maksimusun derininde, gemelli–obturator internus ve kuadratus femorisin üzerinden aşağı iner. Büyük trokanter ile iskiyal tüberosite arasındaki bu yağlı fasyal aralık (subgluteal boşluk) blok bölgesidir. Arka femoral kutanöz sinir ve inferior gluteal damarlar sinirin yakınındadır; distalde sinir biseps femoris uzun başının altından geçer.',
      katman: { deri: 0.3, kas: 0.75, sinir: 1, arter: 1, ven: 1, kemik: 0.8, bag: 0.8 },
      vurgu: [SIY],
      odak,
      goster: [],
      etiket: etiketler(orta, [
        ['Siyatik sinir', a.merkez(SIY, (v) => Math.abs(v.y - yL - 0.04) < 0.006), SARI],
        ['Gluteus maksimus', a.merkez(GM, (v) => Math.abs(v.y - yL - 0.05) < 0.01 && v.x > S.x - 0.03 && v.x < S.x + 0.03), KAS],
        ['Kuadratus femoris', a.merkez(QF), KAS],
        ['Biseps femoris (uzun baş)', a.merkez(BF, (v) => Math.abs(v.y - yL + 0.06) < 0.01), KAS],
        ['Arka femoral kutanöz sinir', a.merkez(PFK, (v) => Math.abs(v.y - yL + 0.04) < 0.008), SARI],
        ['İnferior gluteal arter', a.merkez(IGA, (v) => v.y > yL + 0.03), KIRMIZI],
        ['Büyük trokanter', GT, KEMIK],
        ['İskiyal tüberosite', IT, KEMIK],
      ], { olcek: 0.75, uzaklik: 0.06 }),
      etiketOlcek: 0.75,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: `Prob hattın iki ucuna kaydırıldığında lateralde büyük trokanter, medialde iskiyal tüberosite hiperekoik kemik çizgisi ve akustik gölgesi olarak görülür (bu modelde sinir tüberositeye daha yakın; trokanter görüntü alanının lateralinde kalıyor). Aralarında, gluteus maksimusun parlak derin fasyasının hemen altında siyatik sinir yassı, oval ya da üçgen hiperekoik bir yapıdır; derininde kuadratus femoris (daha aşağıda adduktor magnus) bulunur. Bölge derin olduğundan genellikle konveks prob kullanılır. Bu modelde sinir ≈ ${fmt(sinirDerinlikCm)} cm derinde${gmAltCm ? `; gluteus maksimusun derin yüzü ≈ ${fmt(gmAltCm)} cm` : ''}.`,
      katman: katmanYakin,
      vurgu: [SIY],
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['Siyatik sinir', Sy, SARI],
        ['Gluteus maksimus', Gm, KAS],
        ['Kuadratus femoris', Qf, KAS],
        ['Hamstring başlangıcı', Hm, KAS],
        ['Büyük trokanter / femur', Fm, KEMIK],
        ['İskiyal tüberosite', It, KEMIK],
        ['Arka femoral kutanöz sinir', Pf, SARI],
      ], { olcek: 0.55, uzaklik: 0.045 }),
      etiketOlcek: 0.55,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: 'Prob büyük trokanter ile iskiyal tüberositeyi birleştiren hatta transvers konur; prob işareti laterale (trokantere) bakar. İki kemik gölgesi ekranın iki yanında görülene kadar prob kaydırılır, sinir ortalanır. Sinir proksimale (piriformis altına) ve distale (gluteal kıvrımın altına) izlenerek doğrulanabilir.',
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit'],
      etiket: etiketler(yakin, [
        ['Prob (bu derinlikte\ngenellikle konveks)', probUst, BEYAZ],
        ['Prob işareti → lateral', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['Siyatik sinir', Sy, SARI],
      ], { olcek: 0.55, uzaklik: 0.045 }),
      etiketOlcek: 0.55,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, lateralden mediale: iğne probun lateral ucundan girer, gluteus maksimus geçilir ve uç, kasın derin fasyasının altında sinirin lateral kenarına yerleştirilir; sinire değmeden ve yüksek enjeksiyon basıncı olmadan. Alternatif olarak out-of-plane yaklaşım da kullanılır. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}°.`,
      katman: katmanYakin,
      vurgu: [],
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm lateralı`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Hedef: sinirin lateral kenarı,\ngluteus maksimus fasyası altı', T, CAMGOBEGI],
      ], { olcek: 0.55, uzaklik: 0.045 }),
      etiketOlcek: 0.55,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'İlaç gluteus maksimusun derin fasyası altında sinirin çevresine yayılır; sinir hipoekoik sıvı içinde "yüzer" gibi görünür. İlaç subgluteal boşlukta proksimale ve distale ilerler. Blok diz altında bacak ve ayağın büyük kısmını (safen bölgesi hariç) ve hamstringleri kapsar; arka femoral kutanöz sinir bu seviyede her zaman bloke olmayabilir. İlaç ve hacim kurum protokolüne göre belirlenir.',
      katman: katmanYakin,
      vurgu: [SIY],
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik\nsinirin çevresinde', Sy, CAMGOBEGI],
        ['Gluteus maksimus', Gm, KAS],
      ], { olcek: 0.55, uzaklik: 0.045 }),
      etiketOlcek: 0.55,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, sinirDerinlikCm, girisProbKenariCm, gmAltCm,
    metin: `sinir derinliği ≈ ${fmt(sinirDerinlikCm)} cm, giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°`,
    kesitBulundu: { sinir: !!kesit(SIY, 0.004), gluteus: !!Gm, kuadratus: !!Qf, tuberosite: !!It },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, Sy, GT, IT } };
}
