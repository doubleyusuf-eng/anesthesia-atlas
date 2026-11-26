(function () {
  'use strict';
  const VIZ = window.VIZ;
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });
  VIZ.an02a_on = el => SEKIL.cizim(el, {
    baslik: 'Kalbin önden görünümü',
    giris: 'Ön yüzün büyük bölümünü sağ ventrikül oluşturur. [[K5 s. 83]]',
    gorunumler: [{ ad: 'Önden', en: 1024, boy: 1024, resim: 'img/anatomi/02a-kalp-on.webp',
      noktalar: [
        nokta(250,135,'Superior vena kava','Sağ atriyuma üstten ve arkadan açılır. [[K5 s. 84–85]]'),
        nokta(406,120,'Aort','Kökünün arkasında transvers perikard sinüsü yer alır. [[K5 s. 81]]'),
        nokta(510,230,'Pulmoner trunkus','Sağ ventrikülün çıkış yolu pulmoner kapak üzerinden bu damara açılır. [[K5 s. 85]]'),
        nokta(250,320,'Sağ atriyum apendiksi','Sağ atriyumun pürtüklü ön duvarı bu apendikse uzanır. [[K5 s. 85]]'),
        nokta(665,292,'Sol atriyum apendiksi','Kalbin sol kenarının küçük bir bölümünü oluşturur. [[K5 s. 82–83]]'),
        nokta(156,466,'Sağ atriyum','Kalbin sağ kenarı tümüyle bu boşluğa aittir. [[K5 s. 82]]'),
        nokta(466,620,'Sağ ventrikül','Dikey atriyoventriküler oluk bu yüzü sağ atriyumdan ayırır. [[K5 s. 83]]'),
        nokta(694,636,'Anterior interventriküler oluk','Ön yüzde sağ ve sol ventrikül arasındaki sınırı izler. [[K5 s. 83]]'),
        nokta(812,622,'Sol ventrikül','Kalbin sol kenarının büyük bölümünü oluşturur. [[K5 s. 82]]'),
        nokta(773,956,'Apeks','Sol ventrikülün apeksi alt kenara katılır. [[K5 s. 82]]'),
      ] }],
  });

  VIZ.an02a_arka = el => SEKIL.cizim(el, {
    baslik: 'Arkadan bakışta kalp tabanı ve koroner sinüs',
    giris: 'Dört pulmoner venin arasındaki sol atriyumu bulun, sonra arka atriyoventriküler oluktaki koroner sinüsü izleyin. [[K5 s. 83–85]] [[K5 s. 90]]',
    gorunumler: [{ ad: 'Arkadan', en: 1024, boy: 1064, resim: 'img/anatomi/02a-kalp-arka.webp',
      noktalar: [
        nokta(461,336,'Sol atriyum','Dörtgen kalp tabanının en geniş bölümü pulmoner venlerin açıldığı sol atriyuma aittir. [[K5 s. 83–85]]'),
        nokta(265,301,'Sol üst pulmoner ven','Soldaki üst ve alt pulmoner venler oblik perikard sinüsünü bu yandan sınırlar. [[K5 s. 81–82]]'),
        nokta(266,428,'Sol alt pulmoner ven','Sol akciğerden gelen iki pulmoner ven sol atriyumun arka duvarına açılır. [[K5 s. 81]] [[K5 s. 85]]'),
        nokta(673,305,'Sağ üst pulmoner ven','Sağdaki iki ven oblik sinüsün sağ yanındaki sınıra katılır. [[K5 s. 81–82]]'),
        nokta(678,433,'Sağ alt pulmoner ven','Sol atriyuma açılan dört pulmoner venden sağdaki alt vendir. [[K5 s. 82]] [[K5 s. 85]]'),
        nokta(777,135,'Superior vena kava','Sağ atriyuma üst-arka bölümünden girer. [[K5 s. 84–85]]'),
        nokta(836,372,'Sağ atriyum','Kavaları alan sağ atriyum tabanın daha küçük bölümünü oluşturur. [[K5 s. 83–85]]'),
        nokta(809,644,'İnferior vena kava','Koroner sinüs, bu kavanın sağ atriyumdaki ağzının hemen soluna açılır. [[K5 s. 90]]'),
        nokta(498,577,'Koroner sinüs','Arka atriyoventriküler olukta büyük, orta, küçük kardiyak venlerin ve oblik venin kanını toplar. [[K5 s. 90]]'),
      ] }],
  });

  VIZ.an02a_mitral = el => SEKIL.cizim(el, {
    baslik: 'Açılmış mitral kapak ve subvalvüler yapılar',
    giris: 'Yaprakçığın serbest kenarından ince kordu izleyerek papiller kasa ulaşın. [[K5 s. 85]]',
    gorunumler: [{ ad: 'Ventrikül içinden', en: 1024, boy: 1024, resim: 'img/anatomi/02a-mitral.webp',
      noktalar: [
        nokta(307,185,'Anterior yaprakçık','Mitral kapağın iki yaprakçığından büyük olanıdır. [[K5 s. 85]]'),
        nokta(806,189,'Posterior yaprakçık','Mitral kapağın küçük yaprakçığıdır. [[K5 s. 85]]'),
        nokta(384,490,'Tendinöz kord','Mitral yaprakçıklarla papiller kaslar arasındaki bağlantıyı kurar. [[K5 s. 85]]'),
        nokta(297,790,'Papiller kas','Mitral yaprakçıklardan gelen kordlar papiller kaslara tutunur. [[K5 s. 85]]'),
        nokta(464,919,'Etsi trabeküller','Sol ventrikülde fibröz vestibül dışındaki duvar kalın kas kabartıları taşır. [[K5 s. 85]]'),
      ] }],
  });


  VIZ.an02a_katman = el => SEKIL.cizim(el, {
    baslik: 'Perikardın katları',
    giris: 'Dış yüzden kalp yüzeyine doğru ilerleyin. [[K5 s. 81]]',
    gorunumler: [{ ad: 'Açılmış perikard', resim: 'img/anatomi/02a-perikard.webp', en: 1024, boy: 936,
      noktalar: [
        nokta(194,390,'Fibröz kese','En dıştaki fibröz kese kalbi ve büyük damar köklerini sarar. [[K5 s. 81]]'),
        nokta(428,408,'Pariyetal yaprak','Geri kaldırılan kesenin pembe iç yüzünü seröz perikardın pariyetal yaprağı döşer. [[K5 s. 81]]'),
        nokta(402,517,'Perikard boşluğu','Pariyetal ve visseral yapraklar arasındaki aralık, kesenin kaldırıldığı yerde görülür. [[K5 s. 81]]'),
        nokta(567,622,'Epikard','Kalbin parlak yüzeyi ona sıkıca yapışan visseral yapraktır. [[K5 s. 81]] Bu yaprak büyük damar köklerinde pariyetal yaprakla devam eder. [[K5 s. 81]]'),
      ] }],
  });

  VIZ.an02a_kateter = el => SEKIL.cizim(el, {
    baslik: 'Pulmoner arter kateterinin yolu',
    giris: 'Mavi kateteri sağ kalbin girişinden pulmoner trunkusa kadar izleyin. [[K5 s. 86]]',
    gorunumler: [{ ad: 'Açılmış sağ kalp', resim: 'img/anatomi/02a-sagkalp.webp', en: 1024, boy: 1064,
      noktalar: [
        nokta(239,125,'Superior vena kava','Kateter superior vena kavadan sağ kalbe ilerler. [[K5 s. 86]]'),
        nokta(254,438,'Sağ atriyum','Kava sağ atriyumun üst-arka bölümüne açılır. [[K5 s. 84–85]]'),
        nokta(360,604,'Triküspit kapak','Kateter sağ atriyumla sağ ventrikül arasındaki dikey açıklıktan geçer. [[K5 s. 85]]'),
        nokta(510,686,'Sağ ventrikül','Girişten çıkış yoluna geçerken aradaki infundibüloventriküler krest aşılır. [[K5 s. 85]]'),
        nokta(781,267,'Pulmoner kapak ve trunkus','İnfundibulumdan pulmoner kapak yoluyla pulmoner trunkusa ulaşılır. [[K5 s. 85–86]]'),
      ] }],
  });

  VIZ.an02a_ileti = el => SEKIL.cizim(el, {
    baslik: 'Kalp uyarısının iletimi',
    giris: 'Uyarının yayılışını sağ atriyumdan başlayarak izleyin. [[K5 s. 88]]',
    gorunumler: [{ ad: 'Kalbin iç yüzü', resim: 'img/anatomi/02a-ileti.webp', en: 1024, boy: 1048,
      noktalar: [
        nokta(233,302,'Sinoatriyal düğüm','Doğal uyarı merkezi, superior vena kava ağzının hemen sağında, krista terminalisin üst bölümündedir. [[K5 s. 88]]'),
        nokta(307,397,'Atriyal miyokart','Uyarı sinoatriyal düğümden atriyum kasının tamamına yayılır. [[K5 s. 88]]'),
        nokta(455,488,'Atriyoventriküler düğüm','Koroner sinüs ağzının hemen üzerinde, atriyal septumdaki düğüm iletide gecikme oluşturur. [[K5 s. 84]] [[K5 s. 88]]'),
        nokta(483,530,'His demeti ve iki dalı','Demet, interventriküler septumun membranöz ve musküler bölümlerinin birleşiminde sağ ve sol dallara ayrılır. [[K5 s. 88]]'),
        nokta(719,832,'Ventrikül miyokardı','Dallar endokardın hemen altında ilerler. [[K5 s. 88]] Uyarı ventrikül kasının tüm bölümlerine ulaşır. [[K5 s. 88]]'),
      ] }],
  });

  const donus = [
    { ad:'Koroner sinüs', yol:['Eşlikçi kardiyak venler','Koroner sinüs','Sağ atriyum'], metin:'Kalbin venöz kanının çoğu koroner arterlere eşlik eden venlerle sağ atriyuma ulaşır. [[K5 s. 89]] Koroner sinüs posterior atriyoventriküler olukta seyreder ve inferior vena kava ağzının hemen soluna açılır. [[K5 s. 90]]' },
    { ad:'Anterior kardiyak ven', yol:['Kalbin ön yüzü','Anterior kardiyak ven','Sağ atriyum'], metin:'Ön yüzün çoğunu drene eden ven, anterior atriyoventriküler oluğu ve sağ koroner arteri çaprazlayıp doğrudan sağ atriyuma açılır. [[K5 s. 90]]' },
    { ad:'Doğrudan dönüş', yol:['Miyokart','Küçük venler','Kalp boşluğu'], metin:'Geri kalan kan küçük venlerle doğrudan kalp boşluğuna döner. [[K5 s. 89]]' },
  ];
  VIZ.an02a_ven = el => SEKIL.sahne(el, {
    baslik:'Miyokardın venöz dönüş yolları', vb:[640,198], vbDar:[360,198],
    secenek:{id:'yol',ad:'Dönüş yolu',liste:donus.map(({ad},i)=>({ad,d:String(i)}))},
    metin:p=>donus[p.yol].metin,
    ciz:(S,t,p)=>donus[p.yol].yol.map((ad,k)=>{
      const x=S.w/2, y=9+k*65;
      return (k ? S.ok([[x,y-22],[x,y-2]],{renk:'accent'}) : '')
        + S.kutu(x-141,y,282,40,{renk:'accent',dolgu:k===2?'accent-soft':'paper'})
        + S.t(x,y+26,ad,{a:'middle',c:'b'});
    }).join(''),
  });

  VIZ.an02a_arter = el => SEKIL.cizim(el, {
    baslik: 'Koroner arterlerin kökleri ve dalları',
    giris: 'Damarları önden izleyin, inferior interventriküler dal için ikinci görünüme geçin. [[K5 s. 89]]',
    gorunumler: [
      { ad: 'Önden', resim: 'img/anatomi/02a-koroner.webp', en: 1024, boy: 512, kirp: [12,0,482,512],
        noktalar: [
          nokta(211,182,'Sağ koroner arter','Anterior aort sinüsünden çıkar ve pulmoner trunkus ile sağ atriyum arasından sağ atriyoventriküler oluğa geçer. [[K5 s. 89]]'),
          nokta(136,365,'Marjinal dal','Sağ koroner arterin bu dalı kalbin alt kenarını izler. [[K5 s. 89]]'),
          nokta(316,179,'Sol koroner arter','Sağdan büyük olan sol koroner arter sol posterior aort sinüsünden doğar. [[K5 s. 89]] Pulmoner trunkusun arkasından soluna geçip sol atriyoventriküler oluğa girer. [[K5 s. 89]]'),
          nokta(386,205,'Sirkumfleks arter','Sol atriyoventriküler olukta sol kenarı döner ve inferior interventriküler oluğa ulaşır. [[K5 s. 89]]'),
          nokta(314,332,'Anterior interventriküler arter','Sol koronerin bu ana dalı iki ventrikülün ön yüzünü besler. [[K5 s. 89]] Apeksi dolanıp sağ koronerin interventriküler dalıyla birleşir. [[K5 s. 89]]'),
        ] },
      { ad: 'Arkadan ve alttan', resim: 'img/anatomi/02a-koroner.webp', en: 1024, boy: 512, kirp: [515,0,497,512],
        noktalar: [
          nokta(800,223,'Sağ koroner arter','Sağ koroner arter alt kenarı döndükten sonra atriyoventriküler olukta ilerler ve inferior interventriküler olukta sol koronerle anastomoz yapar. [[K5 s. 89]]'),
          nokta(683,327,'İnferior interventriküler dal','Sağ koroner arterin dalı inferior interventriküler olukta apekse doğru seyreder. [[K5 s. 89]]'),
        ] },
    ],
  });

  VIZ.an02a_yuzey = el => SEKIL.cizim(el, {
    baslik: 'Göğüs duvarındaki kalp sınırları',
    giris: 'Önden bakışta hastanın sağı soldadır. Sternum boyunca 2., 3., 4., 5. ve 6. kostal kıkırdakları izleyin. [[K5 s. 90–91]]',
    gorunumler: [{ ad: 'Önden', resim: 'img/anatomi/02a-toraks.webp', en: 1024, boy: 936,
      noktalar: [
        nokta(614,307,'Sol üst köşe','Sol ikinci kostal kıkırdak üzerinde, sternum kenarından 1,25 cm uzaktadır. [[K5 s. 90]]'),
        nokta(412,409,'Sağ üst köşe','Sağ üçüncü kostal kıkırdak üzerinde, sternum kenarından 1,25 cm uzaktadır. [[K5 s. 90]]'),
        nokta(412,715,'Sağ alt köşe','Sağ altıncı kostal kıkırdak üzerinde, sternum kenarından 1,25 cm uzaktadır. [[K5 s. 90]]'),
        nokta(777,696,'Apeks','Apeks vurusu sol beşinci interkostal aralıkta, orta hattan 9 cm uzaktadır. [[K5 s. 90]]'),
      ] }],
  });
})();
