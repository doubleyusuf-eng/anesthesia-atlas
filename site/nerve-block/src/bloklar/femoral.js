// Femoral sinir bloğu: prob/iğne geometrisi modelin kendisinden hesaplanır.
import * as THREE from 'three';
import { Arac, V, centroid, fmt, RENK, etiketKurucu } from '../blok.js';

export default {
  id: 'femoral',
  ad: 'Femoral sinir bloğu',
  kisa: 'Femoral',
  grup: 'Alt ekstremite',
  bolge: 'femoral',
  yatis: 'sirtustu',
  katmanAdlari: { fasya: 'Fasya iliaka' },
  kur,
};

function kur(anat, isaretler) {
  const a = new Arac(anat);
  const verts = (name) => a.verts(name);
  const sias = V(isaretler.sias);
  const pt = V(isaretler.tuberkulumPubikum);
  const ligDir = sias.clone().sub(pt).normalize(); // mediale-aşağıdan laterale-yukarı
  const yLig = (x) => pt.y + ((x - pt.x) / (sias.x - pt.x)) * (sias.y - pt.y);

  // Femoral arterin ligamentin d metre altındaki merkezi
  const art = verts('Femoral_arteryr');
  const arterAltinda = (d1, d2) => centroid(art.filter((v) => {
    const dy = yLig(v.x) - v.y;
    return dy > d1 && dy < d2;
  }));
  const A2 = arterAltinda(0.015, 0.025);
  const A1 = arterAltinda(0.004, 0.012) || A2;

  // Prob: arterin üzerindeki deri; ekseni ligamente paralel, işaret laterale
  const P = a.probYerlestir(A2, new THREE.Vector3(0, 0, 1), ligDir);
  const { S, n, b, u } = P;
  const kesit = a.kesitci(P);
  const N = kesit('Femoral_nerver');
  const Ak = kesit('Femoral_arteryr') || A2;
  const Vk = kesit('Femoral_veinr');
  const fasyaMesh = anat.parts.get('Fascia_iliaca_turetilmis');
  let F = null;
  if (fasyaMesh && N) {
    a.ray.set(N.clone().add(n.clone().multiplyScalar(0.06)), b);
    const h = a.ray.intersectObject(fasyaMesh, false)[0];
    if (h) F = h.point.clone();
  }

  const T = N.clone().add(u.clone().multiplyScalar(0.005)); // sinirin 5 mm lateralı
  const ig = a.igneYolu(P, T);
  const { E, derinlikCm, aciDer, girisProbKenariCm } = ig;
  const sinirDerinlikCm = N.clone().sub(S).dot(b) * 100;
  const arterDerinlikCm = Ak.clone().sub(S).dot(b) * 100;

  const nabizSk = a.deriVur(A1.clone().add(new THREE.Vector3(0, 0, 0.2)), new THREE.Vector3(0, 0, -1));
  const nabiz = nabizSk ? nabizSk.p : A1;
  const { grup, objects } = a.nesneler(P, {
    E, T,
    la: { merkez: N.clone().add(b.clone().multiplyScalar(0.001)), boyut: new THREE.Vector3(0.016, 0.005, 0.024) },
    isaretler: [[sias, 0xffe14d], [pt, 0xffe14d], [nabiz, 0xff5a4d]],
  });

  // ---- Etiket bağlantı noktaları ----
  const merkezAralik = (name, y1, y2) => centroid(verts(name).filter((v) => v.y > y1 && v.y < y2));
  const ligOrta = sias.clone().add(pt).multiplyScalar(0.5).add(new THREE.Vector3(0, -0.008, 0.003));
  const sart = merkezAralik('Sartorius_muscler', -0.09, -0.05);
  const add = merkezAralik('Adductor_longusr', -0.09, -0.05);
  const pek = merkezAralik('Pectineus_muscler', -0.05, -0.02);
  const onYuz = (pts, y1, y2) => {
    const sel = pts.filter((v) => v.y > y1 && v.y < y2).sort((p1, p2) => p2.z - p1.z);
    return centroid(sel.slice(0, Math.max(1, Math.ceil(sel.length / 4))));
  };
  const ilio = onYuz([...verts('Iliacus_muscler'), ...verts('Psoas_majorr')], -0.04, -0.005);
  const probUst = S.clone().add(n.clone().multiplyScalar(0.1));
  const isaretNokta = S.clone().add(u.clone().multiplyScalar(0.0215)).add(n.clone().multiplyScalar(0.011));
  const kesitNokta = S.clone().add(b.clone().multiplyScalar(0.045)).add(u.clone().multiplyScalar(-0.019));

  const off = (p, x, y, z) => (p ? p.clone().add(new THREE.Vector3(x, y, z)) : null);
  const { SARI, KIRMIZI, MAVI, YESIL, BEYAZ, PEMBE, CAMGOBEGI } = RENK;

  const genel = { hedef: [-0.045, -0.04, 0.02], konum: [-0.03, -0.01, 0.72] };
  // Uygulayıcının bakışı: sağ blokta hekim hastanın sağında, kasığa önden-yandan bakar (+z ön, -x sağ/lateral)
  const h3 = S.clone().addScaledVector(b, 0.03);
  const nav = { hedef: h3.toArray(), konum: h3.clone().add(new THREE.Vector3(-0.02, -0.03, 0.30)).toArray() };
  const h4 = S.clone().addScaledVector(b, 0.02).addScaledVector(u, 0.012);
  const yakin = { hedef: h4.toArray(), konum: h4.clone().add(new THREE.Vector3(-0.13, -0.03, 0.40)).toArray() };
  // Ekran düzleminde ofset (önden bakışta x: sağ-sol, y: yukarı-aşağı) + kameraya doğru biraz
  const ek = (p, dx, dy) => (p ? p.clone().add(new THREE.Vector3(dx, dy, 0.03)) : null);
  // Bloğun asıl yapıları; diğer damar/sinir/kaslar bu adımlarda soluklaşır
  const odak = ['Femoral_nerver', 'Femoral_arteryr', 'Femoral_veinr', 'External_iliac_arteryr', 'External_iliac_veinr',
    'Fascia_iliaca_turetilmis', 'Iliacus_muscler', 'Psoas_majorr', 'Inguinal_ligament_turetilmis'];

  const steps = [
    {
      baslik: 'Yüzey işaretleri',
      metin: 'Hasta sırtüstü, bacak düz ve hafif dış rotasyonda. SİAS ile tüberkülum pubikumu palpe et; aralarındaki çizgi inguinal ligamenttir. Femoral nabız ligamentin hemen altında, orta noktasının biraz medialinde alınır. Prob bu nabzın hemen distaline, inguinal kıvrıma konacak.',
      katman: { deri: 1, kemik: 1, bag: 1 },
      vurgu: ['Inguinal_ligament_turetilmis'],
      goster: ['isaretler'],
      etiket: [
        ['SİAS', sias, off(sias, -0.05, 0.03, 0.05), SARI],
        ['Tüberkülum pubikum', pt, off(pt, 0.05, -0.02, 0.06), SARI],
        ['İnguinal ligament', ligOrta, off(ligOrta, 0.0, 0.05, 0.07), BEYAZ],
        ['Femoral nabız', nabiz, off(nabiz, 0.045, -0.05, 0.05), KIRMIZI],
      ],
      kamera: genel,
    },
    {
      baslik: 'Femoral üçgen',
      metin: 'Femoral üçgenin sınırları: yukarıda inguinal ligament, lateralde sartorius, medialde adduktor longus. Tabanı lateralde iliopsoas, medialde pektineus. Femoral sinir, arter ve ven bu üçgenin içinden uyluğa iner.',
      katman: { deri: 0.4, kas: 1, kemik: 1, bag: 1 },
      vurgu: ['Sartorius_muscler', 'Adductor_longusr'],
      goster: [],
      etiket: [
        ['Sartorius\nlateral sınır', sart, off(sart, -0.07, -0.02, 0.07), '#e07a5f'],
        ['Adduktor longus\nmedial sınır', add, off(add, 0.07, -0.03, 0.07), '#e07a5f'],
        ['İnguinal ligament\nüst sınır', ligOrta, off(ligOrta, 0.0, 0.06, 0.07), BEYAZ],
        ['İliopsoas (taban)', ilio, off(ilio, -0.07, 0.04, 0.07), '#e07a5f'],
        ['Pektineus (taban)', pek, off(pek, 0.07, 0.02, 0.07), '#e07a5f'],
      ],
      kamera: genel,
    },
    {
      baslik: 'Sinir – Arter – Ven',
      metin: 'Lateralden mediale: Sinir – Arter – Ven. Arter ve ven femoral kılıfın içindedir; sinir kılıfın dışında, fasya iliakanın derininde ve iliopsoasın üzerindedir. Bu yüzden iğne ucunun fasya iliakanın altına geçmesi bloğun anahtarıdır.',
      katman: { deri: 0.2, kas: 0.3, fasya: 1, arter: 1, ven: 1, sinir: 1, kemik: 0.6, bag: 1 },
      vurgu: ['Femoral_nerver'],
      odak,
      goster: [],
      etiket: [
        ['Femoral sinir', N, ek(N, -0.055, 0.035), SARI],
        ['Femoral arter', Ak, ek(Ak, 0.01, 0.06), KIRMIZI],
        ['Femoral ven', Vk || Ak, ek(Vk || Ak, 0.055, 0.0), MAVI],
        ...(F ? [['Fasya iliaka (türetilmiş)', F, ek(F, -0.06, -0.035), YESIL]] : []),
      ],
      etiketOlcek: 0.6,
      kamera: nav,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: 'Yüksek frekanslı lineer prob inguinal kıvrımda, ligamente paralel ve transvers yerleştirilir; prob işareti hastanın lateraline bakar. Önce femoral arteri ekranın ortasına al. Sinir arterin lateralinde, iliopsoasın üzerinde ve fasya iliakanın altında hiperekoik oval/üçgen bir yapıdır. Derin femoral arter ayrılıyorsa probu biraz kraniyale kaydır.',
      katman: { deri: 0.35, kas: 0.3, fasya: 0.8, arter: 1, ven: 1, sinir: 1, kemik: 0.5, bag: 1 },
      vurgu: [],
      odak,
      goster: ['prob', 'kesit'],
      etiket: [
        ['Lineer prob', probUst, ek(probUst, 0.03, 0.07), BEYAZ],
        ['Prob işareti → lateral', isaretNokta, ek(isaretNokta, -0.06, 0.035), '#35e07a'],
        ['USG kesit düzlemi', kesitNokta, ek(kesitNokta, 0.075, -0.06), '#9fd8ff'],
        ['Femoral sinir', N, ek(N, -0.06, -0.035), SARI],
      ],
      etiketOlcek: 0.6,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane yaklaşım: iğne probun lateral ucundan, kesit düzlemi içinde lateralden mediale ilerletilir; tüm şaft ekranda izlenir. Fasya iliaka geçilirken "pop" hissedilir. Uç, sinirin lateraline ve fasya iliakanın altına yerleştirilir; arter medialde kalır. Bu modelde giriş noktasından hedefe uzaklık ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}°, sinir derinliği ≈ ${fmt(sinirDerinlikCm)} cm.`,
      katman: { deri: 0.35, kas: 0.3, fasya: 0.8, arter: 1, ven: 1, sinir: 1, kemik: 0.5, bag: 1 },
      vurgu: [],
      odak,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef'],
      etiket: [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm lateralı`, E, ek(E, -0.05, 0.05), PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), ek(E.clone().lerp(T, 0.5), -0.085, 0.0), BEYAZ],
        ['Hedef: fasya iliaka altı,\nsinirin lateralı', T, ek(T, -0.06, -0.05), CAMGOBEGI],
        ['Femoral arter', Ak, ek(Ak, 0.055, -0.035), KIRMIZI],
      ],
      etiketOlcek: 0.6,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'Negatif aspirasyondan sonra küçük fraksiyonlarla enjekte et. İyi bir yayılımda lokal anestezik fasya iliakanın altında sinirin çevresini sarar ve siniri iliopsoastan ayırır. İlaç ve hacim kurum protokolüne göre belirlenir.',
      katman: { deri: 0.3, kas: 0.3, fasya: 0.7, arter: 1, ven: 1, sinir: 1, kemik: 0.5, bag: 1 },
      vurgu: ['Femoral_nerver'],
      odak,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      etiket: [
        ['Lokal anestezik\nfasya iliaka altında', N, ek(N, -0.065, -0.035), CAMGOBEGI],
        ['Femoral sinir', N, ek(N, -0.045, 0.05), SARI],
      ],
      etiketOlcek: 0.6,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, sinirDerinlikCm, arterDerinlikCm, girisProbKenariCm,
    metin: `sinir derinliği ≈ ${fmt(sinirDerinlikCm)} cm, giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}°`,
    kesitBulundu: { sinir: !!N, arter: !!Ak, ven: !!Vk, fasya: !!F },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, N, Ak, Vk, F, sias, pt, nabiz } };
}
