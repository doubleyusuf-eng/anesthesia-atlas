// Popliteal siyatik blok (siyatik sinirin tibial ve ortak peroneal dallara ayrıldığı yer)
import * as THREE from 'three';
import { Arac, fmt, RENK, etiketKurucu, etiketler, kamera, centroid } from '../blok.js';

export default {
  id: 'popliteal',
  ad: 'Popliteal siyatik blok',
  kisa: 'Popliteal siyatik',
  grup: 'Alt ekstremite',
  bolge: 'uyluk',
  yatis: 'yuzustu',
  kur,
};

const SIY = 'Sciatic_nerver';
const TIB = 'Tibial_nerver';
const PER = 'Common_fibular_nerver';
const ART = 'Popliteal_arteryr';
const VEN = 'Popliteal_veinr';
const BFL = 'Long_head_of_biceps_femorisr';
const BFS = 'Short_head_of_biceps_femorisr';
const ST = 'Semitendinosus_muscler';
const SM = 'Semimembranosus_muscler';

function kur(anat) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, MAVI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, PROB, KESIT } = RENK;

  // Ayrılma noktası: siyatik sinirin distal ucu
  const siy = a.verts(SIY);
  const yMin = Math.min(...siy.map((v) => v.y));
  const ayrilma = centroid(siy.filter((v) => v.y < yMin + 0.008));
  // Kesit, ayrılmanın ~2 cm distalinde: iki dal ayrı ama hâlâ ortak paranöral kılıf içinde ve yan yana
  const yL = ayrilma.y - 0.02;
  // Eklem çizgisi ≈ femur kondillerinin alt ucu
  const eklemY = Math.min(...a.verts('Femurr').map((v) => v.y));

  const sinirMerkez = a.merkez([TIB, PER], (v) => Math.abs(v.y - yL) < 0.006);
  // Prob: uyluğun arka yüzünde transvers; iğne lateralden
  const P = a.probYerlestir(sinirMerkez, new THREE.Vector3(0, 0, -1), new THREE.Vector3(-1, 0, 0), { bas: 0.12, enCokDer: 10 });
  const { S, n, b, u } = P;
  const kesit = a.kesitci(P, { derinlik: 0.07 });
  const Tb = kesit(TIB, 0.004);
  const Pr = kesit(PER, 0.004);
  const Sy = kesit(SIY, 0.004);
  const Ar = kesit(ART, 0.004);
  const Vn = kesit(VEN, 0.004);
  const Bf = kesit([BFL, BFS]);
  const Sm = kesit([ST, SM]);
  const Fm = kesit('Femurr', 0.004);
  const N = Tb && Pr ? Tb.clone().lerp(Pr, 0.5) : (Sy || sinirMerkez);

  // Hedef: iki dalın arası, ortak paranöral kılıfın içi
  const T = N.clone();
  const ig = a.igneYolu(P, T, { enCok: 0.035, aci: 40 });
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;
  const sinirDerinlikCm = N.clone().sub(S).dot(b) * 100;
  const ayrilmaEklemCm = (ayrilma.y - eklemY) * 100;

  // Yüzey işaretleri: popliteal kıvrım (≈ eklem çizgisi) ve hamstring tendonları
  const kivrim = a.deriVur(new THREE.Vector3(S.x, eklemY + 0.01, S.z - 0.15), new THREE.Vector3(0, 0, 1))?.p;
  // Tendonlar, fossanın yan sınırlarında eklem çizgisinin 2–5 cm üstünde ele gelir
  const tendonBandi = (v) => v.y > eklemY + 0.02 && v.y < eklemY + 0.05;
  const bfTendon = a.uc([BFL, BFS], new THREE.Vector3(-0.7, 0, -0.7).normalize(), tendonBandi, 0.08);
  const bfDeri = bfTendon && a.deriVur(bfTendon.clone().add(new THREE.Vector3(-0.05, 0, -0.1)), new THREE.Vector3(0.45, 0, 0.9).normalize())?.p;
  const stTendon = a.uc([ST, SM], new THREE.Vector3(0.7, 0, -0.7).normalize(), tendonBandi, 0.08);
  const stDeri = stTendon && a.deriVur(stTendon.clone().add(new THREE.Vector3(0.05, 0, -0.1)), new THREE.Vector3(-0.45, 0, 0.9).normalize())?.p;

  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.06,
    la: { merkez: N.clone(), boyut: new THREE.Vector3(0.009, 0.007, 0.03) },
    isaretler: [[kivrim, 0xffe14d], [bfDeri, 0xffe14d], [stDeri, 0xffe14d]],
  });

  // ---- Kameralar: arkadan (hasta yüzüstü) ----
  const genel = kamera(S.clone().add(new THREE.Vector3(0.0, -0.03, 0)), new THREE.Vector3(-0.3, 0.3, -1), 0.6);
  const orta = kamera(N.clone().add(new THREE.Vector3(0, 0.01, 0)), new THREE.Vector3(-0.35, 0.3, -0.9), 0.34);
  const yakin = kamera(N.clone().lerp(S, 0.35), new THREE.Vector3(-0.3, 0.45, -0.85), 0.28);

  const probUst = S.clone().addScaledVector(n, 0.1);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.05).addScaledVector(u, -0.019);
  const odak = [SIY, TIB, PER, ART, VEN, BFL, BFS, ST, SM];

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: 'Hasta yüzüstü (alternatif: yan yatış ya da sırtüstü bacak yükseltilmiş). Popliteal kıvrım, lateralde biseps femoris tendonu, medialde semitendinozus ve semimembranozus tendonları bulunur. Prob kıvrımın birkaç santimetre proksimalinde, transvers konacak.',
      katman: { deri: 1, kemik: 0.8 },
      vurgu: [],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['Popliteal kıvrım', kivrim, SARI, 0.08, -0.03],
        ['Biseps femoris tendonu\n(lateral)', bfDeri, SARI, 0.09, 0.02],
        ['Semitendinozus tendonu\n(medial)', stDeri, SARI, -0.09, 0.03],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Siyatik sinirin ayrılması',
      metin: `Siyatik sinir popliteal fossanın üst köşesinde tibial (medial) ve ortak peroneal (lateral) sinirlere ayrılır; ayrılma seviyesi kişiden kişiye değişir. Bu modelde ayrılma, diz eklem çizgisinin ≈ ${fmt(ayrilmaEklemCm)} cm proksimalindedir. Popliteal arter ve ven sinirin derininde ve medialindedir.`,
      katman: { deri: 0.35, kas: 0.8, sinir: 1, arter: 1, ven: 1, kemik: 0.8 },
      vurgu: [SIY, TIB, PER],
      odak,
      goster: [],
      etiket: etiketler(orta, [
        ['Siyatik sinir', a.merkez(SIY, (v) => v.y > ayrilma.y + 0.03 && v.y < ayrilma.y + 0.05), SARI],
        ['Tibial sinir', a.merkez(TIB, (v) => v.y < ayrilma.y - 0.03 && v.y > ayrilma.y - 0.05), SARI],
        ['Ortak peroneal sinir', a.merkez(PER, (v) => v.y < ayrilma.y - 0.02 && v.y > ayrilma.y - 0.04), SARI],
        ['Popliteal arter', a.merkez(ART, (v) => Math.abs(v.y - ayrilma.y + 0.04) < 0.005), KIRMIZI],
        ['Biseps femoris', a.merkez([BFL, BFS], (v) => Math.abs(v.y - ayrilma.y - 0.04) < 0.01), KAS],
        ['Semimembranozus', a.merkez(SM, (v) => Math.abs(v.y - ayrilma.y - 0.04) < 0.01), KAS],
      ], { olcek: 0.7, uzaklik: 0.045 }),
      etiketOlcek: 0.7,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi',
      metin: 'Kıvrımın hemen üstünde popliteal arter (pulsatil) ve ven (basıyla kollabe) derindedir; tibial sinir onların yüzeyelinde, yuvarlak hiperekoik bir yapıdır. Prob proksimale kaydırılınca lateralden gelen ortak peroneal sinir tibial sinire yaklaşır ve birleşir. Probu hafif eğmek (tilt) sinirin parlaklığını artırır.',
      katman: { deri: 0.25, kas: 0.4, sinir: 1, arter: 1, ven: 1, kemik: 0.7 },
      vurgu: [TIB, PER],
      odak,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['Tibial sinir (medial)', Tb, SARI, -0.045, -0.03],
        ['Ortak peroneal sinir (lateral)', Pr, SARI, 0.05, -0.02],
        ['Popliteal arter', Ar, KIRMIZI],
        ['Popliteal ven', Vn, MAVI],
        ['Biseps femoris', Bf, KAS],
        ['Semitendinozus /\nsemimembranozus', Sm, KAS],
        ['Femur', Fm, KEMIK],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: 'Lineer prob popliteal kıvrımın üstünde transvers konur; prob işareti laterale bakar. Önce popliteal arter, sonra yüzeyelindeki tibial sinir bulunur; prob proksimale kaydırılarak iki dalın birleştiği seviye (ayrılma noktası) görüntülenir.',
      katman: { deri: 0.3, kas: 0.4, sinir: 1, arter: 1, ven: 1, kemik: 0.7 },
      vurgu: [],
      odak,
      goster: ['prob', 'kesit'],
      etiket: etiketler(yakin, [
        ['Lineer prob', probUst, BEYAZ],
        ['Prob işareti → lateral', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['Tibial + peroneal sinir', N, SARI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, lateralden: iğne probun lateral ucundan, biseps femoris ile vastus lateralis arasındaki oluktan girer. Uç, ayrılma noktasında ya da hemen distalinde tibial ve ortak peroneal sinirlerin arasına, ortak paranöral kılıfın içine yerleştirilir; sinire değmeden ve yüksek enjeksiyon basıncı olmadan. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}°, sinir derinliği ≈ ${fmt(sinirDerinlikCm)} cm.`,
      katman: { deri: 0.3, kas: 0.4, sinir: 1, arter: 1, ven: 1, kemik: 0.7 },
      vurgu: [],
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm lateralı`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Hedef: iki dalın arası,\nparanöral kılıf içi', T, CAMGOBEGI],
        ['Popliteal arter', Ar, KIRMIZI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'Paranöral kılıf içindeki enjeksiyon her iki dalı birlikte saran halka ("çörek") görünümü verir ve kılıf boyunca proksimale-distale yayılır. Blok bacak ve ayağın büyük kısmını kapsar; safen sinir bölgesi (bacağın medial yüzü) için ayrıca adduktor kanal bloğu gerekebilir. İlaç ve hacim kurum protokolüne göre belirlenir.',
      katman: { deri: 0.25, kas: 0.4, sinir: 1, arter: 1, ven: 1, kemik: 0.7 },
      vurgu: [TIB, PER, SIY],
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik\nparanöral kılıf içinde', N, CAMGOBEGI],
        ['Popliteal arter', Ar, KIRMIZI],
      ], { olcek: 0.5, uzaklik: 0.035 }),
      etiketOlcek: 0.5,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, sinirDerinlikCm, girisProbKenariCm, ayrilmaEklemCm,
    metin: `sinir derinliği ≈ ${fmt(sinirDerinlikCm)} cm, giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°; ayrılma eklem çizgisinin ≈ ${fmt(ayrilmaEklemCm)} cm üstünde`,
    kesitBulundu: { tibial: !!Tb, peroneal: !!Pr, arter: !!Ar, ven: !!Vn, biseps: !!Bf },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, N, Tb, Pr, Ar, Vn, ayrilma } };
}
