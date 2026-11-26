(function () {
  'use strict';
  const VIZ = window.VIZ;

  VIZ.an08_deri = el => SEKIL.cizim(el, {
    baslik: 'Deride serbest sinir uçları', giris: 'Yüzeydeki ince dalları seçip aksonu derine doğru izleyin. [[K5 s. 324–325]]',
    gorunumler: [{ ad: 'Deri kesiti', resim: 'img/anatomi/08-deri.webp', en: 1024, boy: 1121,
      noktalar: [
        { x: 453, y: 140, ad: 'Serbest uçlar', metin: 'Periferik aksonlar uçlarına yakın kılıflarını kaybederek dallanır. [[K5 s. 324]]' },
        { x: 405, y: 487, ad: 'Primer afferent akson', metin: 'Zararlı mekanik, kimyasal veya termal uyaran afferentte elektriksel etkinlik başlatabilir. [[K5 s. 323–324]]' },
        { x: 654, y: 898, ad: 'Deri altı dokusu', metin: 'Nosiseptif serbest uçlar derinin yanı sıra deri altı dokusunda da bulunur. [[K5 s. 324–325]]' },
      ] }],
  });

  VIZ.an08_vissera = el => SEKIL.cizim(el, {
    baslik: 'Sağ alt karında apandiks', giris: 'Apandiksi bulun ve pariyetal periton tutulduğunda hastanın ağrıyı nerede tarif edeceğini düşünün. [[K5 s. 326]]',
    gorunumler: [{ ad: 'Sağ alt karın', resim: 'img/anatomi/08-vissera.webp', en: 1024, boy: 1121,
      noktalar: [
        { x: 568, y: 839, ad: 'Apandiks', metin: 'Başlangıçta visseral uyarının kaynağı burada olsa da hasta ağrıyı karın ortasında ve sınırları belirsiz hissedebilir. [[K5 s. 326]]' },
        { x: 438, y: 540, ad: 'İçi boş organ duvarı', metin: 'İçi boş organda distansiyon, gerilme ve yırtılma visseral nosisepsiyon oluşturabilir. [[K5 s. 326]]' },
      ] }],
  });

  VIZ.an08_boynuz = el => SEKIL.cizim(el, {
    baslik: 'Omuriliğin gri ve beyaz maddesi', giris: 'Dorsal boynuzun ucundan merkezi kanala ve ventral boynuza ilerleyin. [[K5 s. 327]]',
    gorunumler: [{ ad: 'Enine kesit', resim: 'img/anatomi/08-boynuz.webp', en: 1024, boy: 735,
      noktalar: [
        { x: 324, y: 207, ad: 'Dorsal boynuz', metin: 'Dorsal gri madde I–VI. laminaları içerir, yüzeyde marjinal tabaka ve hemen derininde substantia gelatinoza yer alır. [[K5 s. 327]]' },
        { x: 407, y: 159, ad: 'Arka kolon', metin: 'Kalın A liflerinin çoğu ince liflere göre daha medialde arka kolonda ilerler. [[K5 s. 326–327]]' },
        { x: 512, y: 383, ad: 'Merkezi kanal', metin: 'Kanal çevresindeki hücre grubu X. laminadır. [[K5 s. 327]]' },
        { x: 720, y: 478, ad: 'Ventral boynuz', metin: 'Kitabın bölümlemesinde VII–IX. laminalar ventral boynuzu oluşturur. [[K5 s. 327]]' },
      ] }],
  });

  VIZ.an08_yol = el => SEKIL.cizim(el, {
    baslik: 'Spinotalamik projeksiyonun durakları', giris: 'İlk görünümde ikinci nöronun çaprazını, ikinci görünümde talamustan kortekse aktarımı izleyin. [[K5 s. 328]]',
    gorunumler: [
      { ad: 'Spinal çapraz', resim: 'img/anatomi/08-boynuz.webp', en: 1024, boy: 735,
        noktalar: [
          { x: 350, y: 280, ad: 'Başlangıç tarafı', metin: 'Ventrobazal ve posterior talamusa uzanan nöronlar özellikle dorsal boynuzun I ve V. laminalarında yoğunlaşır. [[K5 s. 328]]' },
          { x: 512, y: 418, ad: 'Ventral beyaz komissür', metin: 'Akson bir veya iki segment içinde bu komissürden geçer. [[K5 s. 328]]' },
          { x: 871, y: 539, ad: 'Karşı anterolateral beyaz madde', metin: 'Çaprazı tamamlayan lif lateral spinotalamik traktusta yükselir. [[K5 s. 328]]' },
        ] },
      { ad: 'Talamik aktarım', resim: 'img/anatomi/08-yol.webp', en: 1024, boy: 820,
        noktalar: [
          { x: 573, y: 424, ad: 'Talamus', metin: 'I ve V. laminalardan gelen aksonlar ventroposterolateral çekirdek ve medial posterior talamusta kortekse giden nöronlarla sinaps yapar. [[K5 s. 328]]' },
          { x: 672, y: 45, ad: 'Serebral korteks', metin: 'Lateral sistemin somatosensöriyel korteksle bağlantıları uyaranın yerini ve büyüklüğünü ayırt etmeye katkıda bulunuyor görünür. [[K5 s. 329]]' },
        ] },
    ],
  });

  VIZ.an08_matriks = el => SEKIL.cizim(el, {
    baslik: 'Ağrı matriksinin medial görünümdeki üyeleri', giris: 'Anterior singulat korteksi ve talamusu seçin. [[K5 s. 329]]',
    gorunumler: [{ ad: 'Medial yüz', resim: 'img/anatomi/08-matriks.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 313, y: 181, ad: 'Anterior singulat korteks', metin: 'Ağrıda ve sempatik uyarıda etkinleşen bu bölgede çok sayıda μ-opioid reseptörü bulunur. [[K5 s. 333]]' },
        { x: 506, y: 290, ad: 'Talamus', metin: 'Ağrılı uyarı sırasında talamik projeksiyonlar birbiriyle etkileşen birçok bölgeye dağılır. [[K5 s. 329]]' },
      ] }],
  });

  VIZ.an08_inhibisyon = el => SEKIL.cizim(el, {
    baslik: 'İnen denetimin beyin sapındaki düzeyleri', giris: 'PAG’den başlayıp ponsu, medullayı ve omuriliği seçin. [[K5 s. 331]]',
    gorunumler: [{ ad: 'Sagittal kesit', resim: 'img/anatomi/08-inhibisyon.webp', en: 1024, boy: 1536,
      noktalar: [
        { x: 451, y: 189, ad: 'Periakuaduktal gri madde', metin: 'PAG endorfinlerden ve opioid reseptörlerinden zengindir. [[K5 s. 330]]' },
        { x: 352, y: 578, ad: 'Pons', metin: 'PAG’den kaynaklanan inhibitör projeksiyonlar pons üzerinden dorsal boynuza ulaşabilir. [[K5 s. 331]]' },
        { x: 467, y: 911, ad: 'Medulla oblongata', metin: 'Nükleus rafe magnusta ara sinaps yapan yol dorsolateral funikulusta aşağı iner. [[K5 s. 331]]' },
        { x: 493, y: 1360, ad: 'Omurilik', metin: 'Beyin sapından inen yollar dorsal boynuzda özellikle I, IIo ve V. laminalarda sonlanır. [[K5 s. 331]]' },
      ] }],
  });
})();
