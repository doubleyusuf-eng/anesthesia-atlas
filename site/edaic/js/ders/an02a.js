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

  function adimlar(baslik, adimlar, ortak, boy) {
    return { baslik, adimlar, ortak, oto: false, vb: [640, boy], vbDar: [360, boy] };
  }
  const etiket = (S, x, y, ad) => S.t(x, y, ad, { a: 'middle', c: 'b' });
  const katlar = [
    { ad: 'Fibröz kese', metin: 'En dıştaki fibröz kese kalp ile büyük damar köklerini sarar. [[K5 s. 81]]' },
    { ad: 'Pariyetal yaprak', metin: 'Seröz perikardın pariyetal yaprağı fibröz kesenin iç yüzünü döşer. [[K5 s. 81]]' },
    { ad: 'Perikard boşluğu', metin: 'Perikard boşluğu seröz perikardın pariyetal ve visseral yaprakları arasındadır. [[K5 s. 81]]' },
    { ad: 'Epikard', metin: 'Visseral seröz yaprak kalbe sıkıca yapışır ve büyük damar köklerinde pariyetal yaprakla devam eder. [[K5 s. 81]]' },
  ];
  VIZ.an02a_katman = el => SEKIL.adim(el, adimlar('Perikardın katları', katlar, (S, i) => {
    let svg = etiket(S,S.w/2,23,'Dış yüz');
    katlar.forEach(({ad}, k) => {
      const y = 36 + k*39;
      svg += S.kutu(16,y,S.w-32,36,{renk:k===i?'accent':'line',dolgu:k===i?'accent-soft':'paper',kesik:k===2});
      svg += etiket(S,S.w/2,y+24,ad);
    });
    return svg + etiket(S,S.w/2,217,'Kalp yüzeyi');
  }, 236));

  // Her ok iki anatomik durağı birleştirir. Seçim, o durağın açıklamasını açar.
  function yol(baslik, duraklar) {
    return adimlar(baslik, duraklar, (S,i) => duraklar.map(({ad},k) => {
      const y = 8 + k*57, x = S.w/2;
      const ok = k ? S.ok([[x,y-18],[x,y-2]],{renk:'muted'}) : '';
      return ok + S.kutu(x-146,y,292,38,{renk:k===i?'accent':'line',dolgu:k===i?'accent-soft':'paper'})
        + etiket(S,x,y+25,ad);
    }).join(''), duraklar.length*57);
  }
  VIZ.an02a_kateter = el => SEKIL.adim(el, yol('Pulmoner arter kateteri', [
    {ad:'Superior vena kava',metin:'Kateter superior vena kavadan sağ kalbe ilerler. [[K5 s. 86]]'},
    {ad:'Sağ atriyum',metin:'Kava sağ atriyumun üst-arka bölümüne açılır. [[K5 s. 84–85]]'},
    {ad:'Triküspit kapak',metin:'Sağ atriyumla sağ ventrikül arasındaki dikey açıklıktan geçilir. [[K5 s. 85]]'},
    {ad:'Sağ ventrikül',metin:'Giriş yolundan çıkışa geçerken aradaki infundibüloventriküler krest aşılır. [[K5 s. 85]]'},
    {ad:'Pulmoner kapak ve trunkus',metin:'İnfundibulumdan pulmoner kapak yoluyla pulmoner trunkusa ulaşılır. [[K5 s. 85–86]]'},
  ]));
  VIZ.an02a_ileti = el => SEKIL.adim(el, yol('Kalp uyarısının iletimi', [
    {ad:'Sinoatriyal düğüm',metin:'Doğal uyarı merkezi, superior vena kava ağzının hemen sağında, krista terminalisin üst bölümündedir. [[K5 s. 88]]'},
    {ad:'Atriyal miyokart',metin:'Uyarı sinoatriyal düğümden atriyum kasının tamamına yayılır. [[K5 s. 88]]'},
    {ad:'Atriyoventriküler düğüm',metin:'Koroner sinüs ağzının hemen üzerinde, atriyal septumdaki düğüm iletide gecikme oluşturur. [[K5 s. 84]] [[K5 s. 88]]'},
    {ad:'His demeti ve iki dalı',metin:'His demeti interventriküler septumun membranöz ve musküler bölümlerinin birleşiminde sağ ve sol dallara ayrılır. [[K5 s. 88]]'},
    {ad:'Ventrikül miyokardı',metin:'Dallar endokardın hemen altında ilerler, uyarı ventrikül kasının tüm bölümlerine ulaşır. [[K5 s. 88]]'},
  ]));

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
        + etiket(S,x,y+26,ad);
    }).join(''),
  });

  const arterler = [
    { ad: 'Sağ koroner', kok: 'Anterior aort sinüsü', govde: 'Sağ koroner arter',
      dallar: [['Marjinal dal', 'Alt kenar'], ['İnterventriküler dal', 'İnferior oluk']],
      metin: 'Sağ atriyoventriküler oluğu izleyen arter alt kenarda marjinal dal verir, interventriküler dalı ise inferior oluktan apekse yaklaşır. [[K5 s. 89]]' },
    { ad: 'Sol koroner', kok: 'Sol posterior aort sinüsü', govde: 'Sol koroner arter',
      dallar: [['Sirkumfleks arter', 'Sol kenar'], ['Anterior', 'interventriküler arter']],
      metin: 'Sirkumfleks dal sol kenarı döner, anterior interventriküler dal iki ventrikülün ön yüzünü besler ve apeksi dolanır. [[K5 s. 89]]' },
  ];
  VIZ.an02a_arter = el => SEKIL.sahne(el, {
    baslik: 'Koroner arterlerin kökleri ve dalları', vb:[640,214], vbDar:[360,214],
    secenek: { id:'taraf', ad:'Arter', liste:arterler.map(({ad},i)=>({ad,d:String(i)})) },
    metin:p=>arterler[p.taraf].metin,
    ciz:(S,t,p)=>{
      const {kok,govde,dallar}=arterler[p.taraf], x=S.w/2, gen=S.w/2-8;
      let svg=S.kutu(x-137,8,274,37,{yazi:kok})+S.ok([[x,46],[x,64]])
        +S.kutu(x-125,66,250,38,{yazi:govde,renk:'accent',dolgu:'accent-soft'});
      dallar.forEach((ad,k)=>{
        const cx=(k+0.5)*S.w/2;
        svg+=S.ok([[x,105],[x,119],[cx,119],[cx,140]],{renk:'accent'})
          +S.kutu(cx-gen/2,142,gen,60,{yazi:ad,yc:'k b'});
      });
      return svg;
    },
  });

  const koseler = [
    {ad:'Sol üst', x:206,y:51,metin:'Sol ikinci kostal kıkırdakta, sternum kenarından 1,25 cm uzakta. [[K5 s. 90]]'},
    {ad:'Sağ üst', x:154,y:83,metin:'Sağ üçüncü kostal kıkırdakta, sternum kenarından 1,25 cm uzakta. [[K5 s. 90]]'},
    {ad:'Sağ alt', x:154,y:185,metin:'Sağ altıncı kostal kıkırdakta, sternumdan 1,25 cm uzakta. [[K5 s. 90]]'},
    {ad:'Apeks', x:278,y:166,metin:'Apeks vurusuna karşılık gelen nokta sol beşinci interkostal aralıkta, orta hattan 9 cm uzaktadır. [[K5 s. 90]]'},
  ];
  VIZ.an02a_yuzey = el => SEKIL.adim(el, adimlar('Göğüs duvarındaki kalp sınırları', koseler, (S,i)=>{
    const dx=(S.w-360)/2;
    let svg=etiket(S,dx+69,22,'Hasta sağı')+etiket(S,dx+286,22,'Hasta solu')
      + S.kutu(dx+166,34,28,166,{renk:'line',dolgu:'paper'});
    [2,3,4,5,6].forEach((n,k)=>{
      const y=51+k*33.5;
      svg+=S.cizgi([[dx+80,y-4],[dx+130,y],[dx+166,y]],{renk:'line',w:4})
        + S.cizgi([[dx+194,y],[dx+234,y],[dx+295,y-4]],{renk:'line',w:4})
        + S.t(dx+51,y+5,String(n),{a:'middle'});
    });
    const kenar=koseler.concat(koseler[0]).map(({x,y})=>[dx+x,y]);
    svg+=S.cizgi(kenar,{renk:'accent',w:3});
    koseler.forEach(({x,y},k)=>{svg+=S.daire(dx+x,y,k===i?9:5,{renk:'accent',dolgu:k===i?'accent':'paper'});});
    return svg + etiket(S,S.w/2,225,'Kostal kıkırdak düzeyleri');
  },246));
})();
