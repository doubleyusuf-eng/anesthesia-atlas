(function () {
  'use strict';
  const VIZ = window.VIZ;
  const ortada = { a:'middle', c:'b' };
  const secim = (ad, adlar) => ({
    id:'durum', ad, liste:adlar.map((ad, i) => ({d:String(i), ad}))
  });
  const boyut = { vb:[480, 222], vbDar:[360, 222] };

  VIZ.fk07_bulut = el => SEKIL.adim(el, {
    ...boyut, baslik:'Buharlaşma, yükselme ve yoğuşma', oto:false,
    adimlar:[
      {ad:'Buharlaşma', metin:'Işınımla ısınan yüzey suyundan ayrılan moleküller gaz fazına geçer. [[K6 s. 122]]'},
      {ad:'Genişleme', metin:'Yükselen nemli hava daha düşük basınçta genişler ve soğur. [[K6 s. 123]]'},
      {ad:'Yoğuşma', metin:'Soğuyan doymuş havada su, asılı parçacıklar üzerinde damlacık oluşturur. [[K6 s. 123]]'}
    ],
    ortak:(S, i) => {
      const x=S.w/2;
      let s=S.kutu(12,174,S.w-24,38,{dolgu:'basic-soft',yazi:'Su yüzeyi'});
      s+=S.ok([[x-60,161],[x-60,117]],{renk:'basic',soluk:i!==0});
      s+=S.ok([[x,126],[x,62]],{renk:'clin',soluk:i!==1});
      s+=S.t(x-68,143,'Buhar',{a:'end'})+S.t(x+12,101,'Nemli hava');
      const damlalar=[[0,37],[-20,42],[21,44],[-39,49],[39,49]];
      damlalar.forEach(([dx,y])=>{
        s+=S.daire(x+dx,y,i===2?10:3,{renk:'basic',dolgu:'basic-soft',soluk:i!==2});
      });
      return s+S.t(x,16,i===2?'Bulut damlacıkları':'Soğuyan hava',ortada);
    }
  });

  VIZ.fk07_oran = el => SEKIL.grafik(el, {
    vb:[540,270],vbDar:[360,248], baslik:'Sabit sıcaklıkta bağıl nem',
    x:{min:0,max:44,ad:'Su içeriği (mg/L)',adimlar:[0,44]},
    y:{min:0,max:100,ad:'Bağıl nem (%)',adimlar:[0,100]},
    param:[{id:'su',ad:'Su içeriği',min:0,max:44,adim:1,deger:44,birim:'mg/L'}],
    egriler:[{f:x=>100*x/44,renk:'basic'}],
    noktalar:p=>[{x:p.su,y:100*p.su/44}],
    dikey:p=>[{x:p.su}], yatay:p=>[{y:100*p.su/44}],
    okuma:p=>`Doyma değeri 44 mg/L iken ${p.su} mg/L su içeren gazın bağıl nemi %${(100*p.su/44).toLocaleString('tr-TR',{maximumFractionDigits:1})} olur. [[K6 s. 123–124]] [[K6 s. 127]]`
  });

  VIZ.fk07_ciy = el => SEKIL.adim(el,{
    ...boyut,baslik:'Regnault higrometresinde ilk çiy',oto:false,
    adimlar:[
      {ad:'Hava ver',metin:'Hava gümüş tüpün içindeki eterden kabarcıklar hâlinde geçirilir. [[K6 s. 126]]'},
      {ad:'Soğut',metin:'Eter buharlaşırken gizli ısı çeker, ısıyı iyi ileten gümüş yüzey soğur. [[K6 s. 126]]'},
      {ad:'Çiyi oku',metin:'Dış yüzeyde ilk yoğuşma görüldüğünde ölçülen sıcaklık örneğin çiy noktasıdır. [[K6 s. 126]]'}
    ],
    ortak:(S,i)=>{
      const x=S.w/2-24;
      let s=S.cizgi([[x-53,42],[x-53,175],[x+53,175],[x+53,42]],{w:5,renk:'muted'});
      s+=S.kutu(x-49,106,98,64,{r:0,dolgu:'warn-soft',renk:'line',yazi:'Eter'});
      s+=S.ok([[x-77,36],[x-21,36],[x-28,152]],{renk:'basic'});
      for(const [dx,y] of [[-27,143],[-24,129],[-27,115]]) s+=S.daire(x+dx,y,4,{renk:'basic'});
      if(i>=1) s+=S.ok([[x+22,93],[x+22,37]],{renk:'warn'});
      if(i===2) for (const y of [111,125,141]) s+=S.daire(x+59,y,4,{dolgu:'basic',renk:'basic'});
      return s+S.t(x,206,'Gümüş tüp',ortada)+S.t(x+70,123,i===2?'İlk çiy':'Dış yüzey');
    }
  });

  VIZ.fk07_ter = el => SEKIL.sahne(el, {
    ...boyut,baslik:'Terin buharlaşması ve hissedilen sıcaklık',secenek:secim('24 °C’de bağıl nem',['%0','%100']),
    metin:p=>p.durum==='0'?'Kuru ortamda deriden su buharlaşabilir, kitabın örneğinde hissedilen sıcaklık 21 °C’dir. [[K6 s. 127]]':'Doymuş ortamda terleme buharlaşmayla soğutamaz, aynı oda 27 °C gibi hissedilir. [[K6 s. 127]]',
    ciz:(S,t,p)=>{
      const kuru=p.durum==='0', x=S.w/2;
      let s=S.kutu(20,157,S.w-40,44,{dolgu:'clin-soft',yazi:'Deri · ter tabakası'});
      for(const dx of [-62,0,62]){
        s+=S.daire(x+dx,151,6,{dolgu:'basic',renk:'basic'});
        if(kuru) s+=S.ok([[x+dx,136],[x+dx,82]],{renk:'basic'});
      }
      return s+S.t(x,33,kuru?'Hissedilen 21 °C':'Hissedilen 27 °C',ortada)+S.t(x,65,kuru?'Buharlaşmayla ısı kaybı':'Doymuş hava',ortada);
    }
  });

  VIZ.fk07_banyo = el => SEKIL.sahne(el, {
    vb:[480,284],vbDar:[360,284],baslik:'Banyo, su tutucu ve termostat devresi',
    secenek:secim('Düzenek',['Pasif','Aktif']),
    metin:p=>p.durum==='0'?'Banyodan geçen gaz su alır, buharlaşma banyoyu soğutur. [[K6 s. 129]]':'Termistör hasta ucundaki gaz sıcaklığını izler, sinyal termostat üzerinden banyo ısıtıcısını denetler. [[K6 s. 130]]',
    ciz:(S,t,p)=>{
      const aktif=p.durum==='1', son=S.w-22, dip=S.w*0.55;
      let s=S.kutu(14,66,107,93,{renk:'basic'})+S.kutu(17,110,101,46,{dolgu:'basic-soft',renk:'basic',yazi:'Su'});
      s+=S.t(24,31,'Kuru gaz')+S.ok([[40,40],[40,126]],{renk:'basic'});
      s+=S.ok([[83,95],[83,49],[dip-40,49],[dip,98],[dip+40,49],[son,49]],{renk:'clin'});
      s+=S.t(son,29,'Hasta',{a:'end',c:'b'});
      s+=S.cizgi([[dip,99],[dip,119]],{renk:'basic'})+S.kutu(dip-37,119,74,37,{dolgu:'basic-soft',yazi:'Tutucu'});
      if(aktif){
        s+=S.daire(son-17,49,6,{dolgu:'warn',renk:'warn'})+S.t(son,83,'Termistör',{a:'end'});
        s+=S.kutu(14,161,107,31,{dolgu:'warn-soft',yazi:'Isıtıcı'});
        s+=S.kutu(dip-55,217,110,36,{dolgu:'warn-soft',yazi:'Termostat'});
        s+=S.ok([[son-17,92],[son-17,235],[dip+56,235]],{renk:'warn',kesik:true});
        s+=S.ok([[dip-56,235],[67,235],[67,195]],{renk:'warn',kesik:true});
      }
      return s;
    }
  });

  const capSiniflari = [
    ['5–10 µm','Üst hava yolu','Bu aralıktaki parçacıklar üst hava yollarına çökelme eğilimindedir.'],
    ['3–<5 µm','Daha derin hava yolu','5 µm altında yerçekiminin etkisi ihmal edilebilir ve damlacıklar daha derine ulaşır.'],
    ['1–<3 µm','Alveol','3 µm altındaki damlacıklar alveollere ulaşabilir.'],
    ['<1 µm','Alveol','Kitap 1 µm altını ideal olarak niteler.'],
    ['1 µm’nin çok altı','Ekshalasyon','Çok küçük damlacıklar tedavi etkisi göstermeden solukla dışarı atılabilir.']
  ];
  VIZ.fk07_damla = el => SEKIL.sahne(el,{
    vb:[480,250],vbDar:[360,250],baslik:'Çapa göre damlacıkların izlediği yol',
    secenek:secim('Damlacık çapı',capSiniflari.map(s=>s[0])),
    metin:p=>capSiniflari[+p.durum][2]+' [[K6 s. 132]]',
    ciz:(S,t,p)=>{
      const i=+p.durum,x=S.w/2;
      const duraklar=['Üst hava yolu','Derin hava yolu','Alveol'];
      const secili=[0,1,2,2,-1][i];
      let s='';
      duraklar.forEach((ad,j)=>{
        const y=16+82*j;
        if(j) s+=S.ok([[x,y-38],[x,y-4]],{renk:'basic'});
        s+=S.kutu(x-83,y,166,39,{dolgu:j===secili?'clin-soft':'paper',renk:j===secili?'clin':'line',yazi:ad});
      });
      if(i===4) s+=S.ok([[x+85,199],[S.w-38,199],[S.w-38,30],[x+88,30]],{renk:'clin',kesik:true});
      return s;
    }
  });

  const yollar=[
    ['Negatif basınç',['Ortam havası','Filtre','Kullanıcının inspirasyonu'],'Sıkı oturan FFP’de filtre üzerinden akımı kullanıcının solunum işi sağlar. [[K6 s. 133–134]]'],
    ['Motorlu',['Ortam havası','Fan ve filtre','Kullanıcı'],'Motorlu respiratör fan yardımıyla filtre edilmiş hava sağlar. [[K6 s. 134]]'],
    ['Bağımsız kaynak',['Hat, tüp veya kompresör','Solunabilir hava','Kullanıcı'],'Solunum cihazı kullanıcıya ayrı bir kaynaktan solunabilir nitelikte hava verir. [[K6 s. 134]]']
  ];
  VIZ.fk07_koruma = el => SEKIL.sahne(el,{
    ...boyut, baslik:'Respiratörde ve bağımsız cihazda hava yolu',secenek:secim('Hava beslemesi',yollar.map(y=>y[0])),
    metin:p=>yollar[+p.durum][2],
    ciz:(S,t,p)=>{
      const x=S.w/2;
      return yollar[+p.durum][1].map((ad,j)=>{
        const y=10+j*78;
        return (j?S.ok([[x,y-33],[x,y-4]],{renk:'clin'}):'')+S.kutu(x-118,y,236,41,{yazi:ad,dolgu:j===1?'basic-soft':'paper'});
      }).join('');
    }
  });

  VIZ.fk07_sicaklik = el => SEKIL.sahne(el,{
    ...boyut,baslik:'Aktif banyoda iki sıcaklık seçiminin sonuçları',
    param:[{id:'banyo',ad:'Banyo sıcaklığı',min:40,max:60,adim:20,deger:40,birim:'°C'}],
    metin:p=>p.banyo===40?'Yaklaşık 40 °C’de yanık riski azalır, su mikroorganizmaların çoğalmasına elverişli olabilir. [[K6 s. 130]]':'60 °C’de bakteriyel kontaminasyon riski azalır, hastaya ulaşan gazın sıcaklığı dikkatle izlenmelidir. [[K6 s. 130]]',
    ciz:(S,t,p)=>{
      const alt=p.banyo===40,x=S.w/2;
      let s=S.kutu(x-104,15,208,48,{yazi:'Su banyosu · '+p.banyo+' °C',dolgu:'basic-soft'});
      s+=S.ok([[x,65],[x,98]],{renk:'warn'});
      return s+S.kutu(x-137,102,274,86,{
        yazi:alt?['Banyoda mikrobiyal','çoğalma riski']:['Hasta ucunda sıcak gazla','hava yolu yanığı riski'],
        dolgu:'warn-soft'
      });
    }
  });

  VIZ.fk07_cevrim = el => SEKIL.sahne(el,{
    ...boyut, baslik:'Soluk yönü ile ısı ve suyun aktarımı',
    secenek:secim('Soluk evresi',['Ekspirasyon','İnspirasyon']),
    metin:p=>p.durum==='0'?'Hastadan gelen gazdan su yoğuşur, higroskopik eleman su ve ısı kazanır. [[K6 s. 128]]':'Buharlaşan su kuru gaza geçer, elemandan çıkan gaz hastaya ısı ve nem taşır. [[K6 s. 128]]',
    ciz:(S,t,p)=>{
      const x=S.w/2,eksp=p.durum==='0';
      let s=S.kutu(8,77,70,48,{yazi:'Hasta'})+S.kutu(S.w-78,77,70,48,{yazi:'Devre'});
      s+=S.kutu(x-45,66,90,69,{yazi:['Higroskopik','eleman'],dolgu:'basic-soft'});
      const yon=(a,b)=>S.ok(eksp?[[a,101],[b,101]]:[[b,101],[a,101]],{renk:'clin'});
      s+=yon(79,x-47)+yon(x+47,S.w-79);
      return s+S.t(x,36,eksp?'Ilık ve nemli soluk':'Soğuk ve kuru gaz',ortada)
        +S.t(x,171,eksp?'Yüzeyde yoğuşma':'Yüzeyden buharlaşma',ortada);
    }
  });

  const nokta = (x,y,ad,metin) => ({x,y,ad,metin});
  VIZ.fk07_higrometre = el => SEKIL.cizim(el,{
    baslik:'Yaş ve kuru hazneli higrometre',giris:'Ortam sıcaklığı için çıplak hazneyi, buharlaşmanın etkisi için fitille sarılmış hazneyi inceleyin. [[K6 s. 124–125]]',
    gorunumler:[{ad:'Önden',resim:'img/fizik/07-higrometre.webp',en:1024,boy:1536,noktalar:[
      nokta(400,1065,'Kuru hazne','Çıplak cam termometre ortam sıcaklığını verir. [[K6 s. 124]]'),
      nokta(624,1055,'Yaş hazne','Suyla doymuş fitildeki buharlaşma bu hazneyi soğutur. [[K6 s. 124]]'),
      nokta(618,1170,'Fitil','Fitil, yaş termometrenin haznesini suyla ıslak tutar. [[K6 s. 124–125]]'),
      nokta(624,651,'Yaş sütun','Dengede kuru ve yaş hazne okumalarından psikrometrik çizelgeyle bağıl nem bulunur. [[K6 s. 124]]')
    ]}]
  });
  VIZ.fk07_hmef = el => SEKIL.cizim(el,{
    baslik:'HMEF boyuna kesiti',giris:'Kesitte gazın içinden geçtiği higroskopik elemanı ve filtreyi bulun. [[K6 s. 128–129]]',
    gorunumler:[{ad:'Kesit',resim:'img/fizik/07-hmef.webp',en:1024,boy:437,noktalar:[
      nokta(510,68,'Kapalı gövde','HMEF solunum sisteminin hasta ucuna yakın yerleştirilir. [[K6 s. 128]]'),
      nokta(418,219,'Higroskopik eleman','Ekspirasyon gazındaki su bu yüzeyde yoğuşur ve eleman ısı kazanır. [[K6 s. 128]]'),
      nokta(683,224,'Filtre','Kitap devre kontaminasyonuna karşı eklenen filtrenin boyutunu 0,2 µm olarak verir. [[K6 s. 129]]')
    ]}]
  });
  VIZ.fk07_jet = el => SEKIL.cizim(el,{
    baslik:'Jet nebülizörün çalışma kesiti',giris:'Basınçlı gazın ve sıvı ilacın yollarını kapiller ağzında buluşturun. [[K6 s. 132]]',
    gorunumler:[{ad:'Yandan kesit',resim:'img/fizik/07-jet.webp',en:1024,boy:683,noktalar:[
      nokta(379,114,'Gaz çıkış deliği','Basınçlı gaz küçük delikten geçerek kapiller ağız üzerinde hızla akar. [[K6 s. 132]]'),
      nokta(513,305,'Kapiller tüp','Tüp sıvıya dalar, ağızdaki düşük basınç sıvıyı tüpten çeker. [[K6 s. 132]]'),
      nokta(578,593,'Sıvı ilaç','Nebülize edilecek ilaç sıvı hâlde taşınır. [[K6 s. 132]]'),
      nokta(763,101,'Damlacıklar','Taşıyıcı gaz ilaç damlacıklarını aerosol olarak sürükler. [[K6 s. 131–132]]')
    ]}]
  });
})();
