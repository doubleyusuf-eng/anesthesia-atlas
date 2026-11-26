(() => {
  const isaretler = {
    cikis: [
      [510, 133, 'Beyin sapı', 'Beyin sapı kraniyal çıkışı tanımak için başlangıç işaretidir. [[K5 s. 239–240]] Göz ve bezlere III, VII ve IX. sinirlerle giden liflerle, toraks ve karına vagusla inen lifleri ayırın. [[K5 s. 239–240]]'],
      [557, 564, 'Sempatik zincir', 'Torakal omuriliğin lateral gri sütunundan gelen lif bu zincire bir beyaz dal üzerinden girer. [[K5 s. 228]] Bu lifin ilk gangliyona girmesi, sinapsın mutlaka orada olacağı anlamına gelmez. [[K5 s. 229]] Lif zincir boyunca yukarı veya aşağı ilerleyerek giriş düzeyinden uzakta sinaps yapabilir. [[K5 s. 229–231]]'],
      [450, 1051, 'Lomber zincir', 'Lomber gangliyonlardan çıkan lifler spinal sinirlere, aortik ve hipogastrik pleksuslara dağılır. [[K5 s. 233]]'],
      [533, 1317, 'Sakral zincir', 'Sempatik trunkus ön sakral deliklerin medialinde aşağı iner. [[K5 s. 229]]'],
      [510, 1461, 'İmpar gangliyon', 'Yukarıda sağda ve solda ayrı izlenen trunkuslar burada orta hatta yaklaşır. [[K5 s. 229]] Koksiksin önünde birleştikleri tek gangliyon zincirin kaudal sınırını işaretler. [[K5 s. 229]]'],
    ],
    ramuslar: [
      [470, 309, 'Spinal sinirin ön dalı', 'T1–L2’den çıkan miyelinli pregangliyonik lifler ön primer dala, ardından beyaz bağlantı dalına geçer. [[K5 s. 228]]'],
      [695, 417, 'Bağlantı dalları', 'İki ince dal spinal sinirle gangliyon arasındaki kısa mesafeyi aşar. [[K5 s. 226]] Hareket yönünü beyaz dalda spinal sinirden zincire, gri dalda gangliyondan spinal sinire doğru izleyin. [[K5 s. 228–230]]'],
      [756, 403, 'Sempatik gangliyon', 'Lif burada sinaps yapabilir, zincirde başka bir düzeye ilerleyebilir ya da periferik gangliyona geçebilir. [[K5 s. 229–230]]'],
      [750, 568, 'Gangliyonlar arası yol', 'Başka bir düzeyde sinaps yapacak pregangliyonik lif zincir boyunca yükselir veya alçalır. [[K5 s. 229]]'],
    ],
    boyun: [
      [449, 199, 'Üst servikal gangliyon', 'C2–C3 düzeyindeki bu uzun gangliyon ilk dört servikal gangliyonun birleşmesinden oluşur. [[K5 s. 231]]'],
      [445, 392, 'Orta servikal gangliyon', 'Küçük gangliyon C6 düzeyinde bulunabilir ve tiroid bezine inferior tiroid arteri boyunca bir dal gönderir. [[K5 s. 232]]'],
      [431, 605, 'Alt servikal gangliyon bölgesi', 'Önce birinci kaburgayı bulun, sonra zinciri kaburga boynunun önünden yukarı izleyin. [[K5 s. 229]] C7–T1 disk aralığındaki alt servikal gangliyon kişilerin %80’inde ilk torakal gangliyonla birleşir ve stellat gangliyon adını alır. [[K5 s. 232]]'],
      [519, 652, 'Subklavyen arter', 'Alt ve orta gangliyonlar arasındaki subklavyen ansa arterin alt kenarını dolaşıp önünden yükselir. [[K5 s. 232]]'],
      [377, 749, 'Birinci kaburga', 'Boyundan inen zincir bu kaburganın boynunun önünden geçerek toraksa girer. [[K5 s. 229]]'],
      [603, 325, 'Karotis kılıfı bölgesi', 'Sempatik zincir kılıfın arka duvarının hemen arkasında seyreder. [[K5 s. 229]]'],
    ],
    lomber: [
      [385, 72, 'İnferior vena kava', 'Sağ gangliyonun ön komşusu inferior vena kavadır. [[K5 s. 233]]'],
      [627, 70, 'Aort', 'Sol lomber gangliyonun önünü abdominal aort örter. [[K5 s. 233]]'],
      [366, 142, 'Sağ lomber gangliyon', 'Gangliyon gevşek retroperitoneal dokuda, vertebra gövdesinin anterolateral yüzündedir. [[K5 s. 233]]'],
      [644, 145, 'Sol lomber gangliyon', 'Gangliyon ile vertebra gövdesi arasına kalın anterior bağ girer. [[K5 s. 233]]'],
      [810, 235, 'Psoas major', 'Zincirin bulunduğu oluk kas ile vertebra gövdesi arasındadır. [[K5 s. 229]]'],
      [493, 226, 'Vertebra gövdesi', 'Kitap lomber sempatik blok için L2 veya L3 gövdesinin anterolateral kenarını tarif eder. [[K5 s. 235]]'],
    ],
    kalp: [
      [501, 311, 'Aort kavsi', 'Yüzeyel pleksus kavsin konkavitesinde, derin pleksus arkasındadır. [[K5 s. 236]]'],
      [494, 506, 'Yüzeyel kardiyak ağ bölgesi', 'Sol üst kardiyak sinir ve sol vagusun alt kardiyak dalı bu bölgede birleşir. [[K5 s. 236]]'],
      [506, 424, 'Trakea bifurkasyonu', 'Derin kardiyak pleksusun yerini belirleyen arka komşu karina, ön komşu aort kavsidir. [[K5 s. 236]]'],
      [570, 561, 'Pulmoner arter', 'Yüzeyel pleksus pulmoner arterin önündedir. [[K5 s. 236]]'],
    ],
    colyak: [
      [288, 200, 'İnferior vena kava', 'Vena kava sağ çölyak gangliyonunun ön komşusudur. [[K5 s. 236]] Resimde gangliyonu seçmek için damarın mediale bakan kenarı ile çölyak arter kökü arasına bakın. [[K5 s. 236]]'],
      [451, 299, 'Sağ çölyak gangliyon', 'İki çölyak gangliyon da diyafram krusları üzerinde yer alır. [[K5 s. 236]]'],
      [568, 303, 'Sol çölyak gangliyon', 'Sol gangliyonun ön komşuları pankreas ve splenik arterdir. [[K5 s. 236]]'],
      [510, 333, 'Çölyak arter kökü', 'Çölyak pleksus L1 hizasında bu kökü kuşatır. [[K5 s. 236]]'],
      [504, 476, 'Abdominal aort', 'Çölyak pleksusun devamı aortun ön yüzünde aortik pleksus olarak aşağı iner. [[K5 s. 236]]'],
      [824, 347, 'Adrenal bez', 'Medullaya ulaşan pregangliyonik lifler çölyak gangliyondan sinaps yapmadan geçer. [[K5 s. 230]]'],
    ],
    bagirsak: [
      [353, 408, 'Meissner pleksusu', 'Bağırsak duvarındaki submukozal gangliyon ağı Meissner pleksusudur. [[K5 s. 240]]'],
      [443, 538, 'Auerbach pleksusu', 'Kesitte derinde görülen sinir ağı Auerbach’ın miyenterik pleksusudur. [[K5 s. 240]] Buraya kadar uzanan vagal efferent lifin başlangıcı alt medulladadır, ikinci nöron ise hedefiyle aynı organın duvarında yer alır. [[K5 s. 240]]'],
    ],
    pelvis: [
      [650, 212, 'Pelvik splanknik lifler', 'Çıkış S2–S3 ön dallarındandır, bazen S4 de katılır. [[K5 s. 241]]'],
      [560, 341, 'Pelvik pleksus', 'Pelvik splanknik sinirler sempatik pelvik pleksusa katılır ve lifler buradan pelvik organlara dağılır. [[K5 s. 237]]'],
      [377, 411, 'Mesane', 'Sakral parasempatik lifler mesane duvarını uyarırken iç sfinkteri inhibe eder. [[K5 s. 241]]'],
      [477, 243, 'Rektum', 'Sakral çıkış rektum kaslarına motor, iç anal sfinktere inhibitör lifler verir. [[K5 s. 241]]'],
    ],
  };
  const ciz = (el, dosya, boy, baslik, giris, kirp) => {
    const noktalar = isaretler[dosya].map(([x, y, ad, metin]) => ({ x, y, ad, metin }));
    return SEKIL.cizim(el, {
      baslik, giris,
      gorunumler: [{ ad: baslik, en: 1024, boy, resim: 'img/anatomi/05-' + dosya + '.webp', noktalar, kirp }],
    });
  };

  VIZ.an05_cikis = (el) => ciz(el, 'cikis', 1536, 'Önden beyin sapı ve sempatik zincirler', 'Beyin sapından koksikse kadar orta hattı izleyin. [[K5 s. 228–229]]', [285, 0, 455, 1536]);

  VIZ.an05_ramuslar = (el) => ciz(el, 'ramuslar', 683, 'Torakal spinal sinir ile zincirin bağlantısı', 'Bir bağlantı dalını izlerken hücre gövdesinin hangi tarafta olduğunu düşünün. [[K5 s. 228–230]]');

  VIZ.an05_boyun = (el) => ciz(el, 'boyun', 936, 'Servikal zincirin yandan görünümü', 'Karotis kılıfının arkasındaki üç gangliyonu yukarıdan aşağı izleyin. [[K5 s. 229]] [[K5 s. 231–232]]');

  VIZ.an05_lomber = (el) => ciz(el, 'lomber', 683, 'Lomber aksiyel kesit, kaudalden bakış', 'Ön taraf yukarıda, hastanın sağı resmin solundadır. [[K5 s. 233–234]]');

  VIZ.an05_kalp = (el) => ciz(el, 'kalp', 891, 'Önden mediasten ve kalp tabanı', 'Kavsi bulup konkavitesinden karina yönüne bakın. [[K5 s. 236]]');

  VIZ.an05_colyak = (el) => ciz(el, 'colyak', 683, 'Önden çölyak arter kökü ve gangliyonlar', 'Hastanın sağındaki mavi damardan arter kökünün iki yanındaki sarı gangliyonlara geçin. [[K5 s. 236]]');

  VIZ.an05_bagirsak = (el) => ciz(el, 'bagirsak', 683, 'Bağırsak duvarında vagal sonlanma', 'İki sarı sinir ağının duvar içindeki derinliklerini karşılaştırın. [[K5 s. 240]]');

  VIZ.an05_pelvis = (el) => ciz(el, 'pelvis', 683, 'Pelvik splanknik liflerin mesane ve rektumla ilişkisi', 'Sakral kökenli lifleri pelvik pleksustan hedef organa izleyin. [[K5 s. 237]] [[K5 s. 241]]');
})();
