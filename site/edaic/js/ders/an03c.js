(function () {
  'use strict';
  const VIZ = window.VIZ;
  const middle = {a:'middle'};
  const secim = (ad, names) => ({id:'secim', ad, liste:names.map(ad => ({d:ad, ad}))});
  const nokta = (x,y,ad,metin) => ({x,y,ad,metin});

  VIZ.an03c_konus = el => SEKIL.cizim(el, {
    baslik:'Konus medullaris, filum terminale ve kauda ekuina', giris:'Arkadan görünümde ortadaki ince filumu çevresindeki sinir köklerinden ayırın. [[K5 s. 137–138]]',
    gorunumler:[{ad:'Arkadan',resim:'img/anatomi/03c-konus.webp',en:1024,boy:1536,noktalar:[
      nokta(510,420,'Konus medullaris','Omuriliğin incelen alt ucudur ve erişkinde ortalama L1–L2 diski hizasındadır. [[K5 s. 137]]'),
      nokta(510,862,'Filum terminale','Konusun ucundan aşağıya devam eden parlak iplik esas olarak piadan oluşur. [[K5 s. 137]]'),
      nokta(736,860,'Kauda ekuina','Lomber ve sakral sinir kökleri kendi intervertebral foramenlerine doğru iner. [[K5 s. 137]]')
    ]}]
  });
  VIZ.an03c_ventrikuller = el => SEKIL.cizim(el, {
    baslik:'BOS boşluklarının yandan görünümü', giris:'Lateral ventrikülden başlayarak üçüncü ventrikülü, akueduktu ve dördüncü ventrikülü izleyin. [[K5 s. 136]]',
    gorunumler:[{ad:'Sol yandan oblik',resim:'img/anatomi/03c-ventrikuller.webp',en:1024,boy:683,noktalar:[
      nokta(402,62,'Lateral ventrikül','Lateral ventrikülün koroid pleksusu BOS üretimine katılır. [[K5 s. 136]]'),
      nokta(350,276,'Üçüncü ventrikül','Lateral ventriküllerden gelen sıvı Monro foramenlerinden bu boşluğa geçer. [[K5 s. 136]]'),
      nokta(570,402,'Akuedukt','Üçüncü ventrikül ile dördüncü ventrikülü bağlayan kanaldır. [[K5 s. 136]]'),
      nokta(601,524,'Dördüncü ventrikül','BOS buradan ortada Magendie ve yanlarda Luschka açıklıklarıyla subaraknoid aralığa çıkar. [[K5 s. 136]]')
    ]}]
  });

  function katmanlar(el, klinik) {
    const adlar = ['Sarı bağ','Epidural aralık','Dura','Araknoid','Subaraknoid aralık','Pia'];
    const aciklama = [
      'Sarı bağ ve laminalar epidural aralığın arka sınırını oluşturur. [[K5 s. 132]]',
      'Epidural yağ dural keseyi destekler. [[K5 s. 131]]',
      'Spinal dura kraniyal duranın fibröz meningeal katından devam eder. [[K5 s. 130–131]]',
      'Araknoid duranın hemen iç yüzündedir, arada yalnız ince seröz sıvı bulunur. [[K5 s. 132]]',
      'BOS, araknoid ile pia arasındaki subaraknoid aralıkta bulunur. [[K5 s. 131–132]]',
      'Damar taşıyan pia omuriliğe tutunur ve oluklarına girer. [[K5 s. 131]]'
    ];
    const durak = klinik ? [0,1,4] : [1,2,3,4,5];
    const uygulama = [
      'Tuohy iğnesi sarı bağ içinde ilerlerken serum fizyolojiğe sürekli basınç uygulanır. [[K5 s. 135]]',
      'İğne ağzı bağdan çıkınca direnç aniden azalır ve ince epidural kateter dura dışında ilerletilir. [[K5 s. 135]]',
      'Kombine teknikte ince spinal iğne Tuohy içinden geçer ve intratekal ilaç BOS’a ulaşır. [[K5 s. 132–135]]'
    ];
    return SEKIL.adim(el,{baslik:'Arka yaklaşımla katman sırası',vb:[640,270],vbDar:[360,270],oto:false,
      adimlar:durak.map((d,i)=>({ad:adlar[d],metin:klinik ? uygulama[i] : aciklama[d]})),
      ortak:(S,i)=>{
        const y = [30,68,111,137,172,218], h=[38,43,26,35,46,27], hedef=durak[i];
        let svg=S.t(12,19,'Arka',{c:'k'});
        adlar.forEach((ad,j)=>{
          svg+=S.kutu(34,y[j],S.w-52,h[j],{r:0,dolgu:j===hedef?'accent-soft':'paper',renk:j===hedef?'accent':'line'});
          svg+=S.t(S.w/2+18,y[j]+h[j]/2+5,ad,middle);
        });
        svg+=S.t(12,265,'Ön',{c:'k'});
        if(klinik) svg+=S.ok([[64,14],[64,y[hedef]+h[hedef]/2]],{renk:'accent',w:4});
        return svg;
      }});
  }
  VIZ.an03c_katman = el => katmanlar(el,false);
  VIZ.an03c_epidural = el => katmanlar(el,true);

  VIZ.an03c_akis = el => SEKIL.adim(el,{
    baslik:'BOS çıkışı ve geri emilimi',vb:[640,245],vbDar:[360,245],oto:false,
    adimlar:[
      {ad:'Çıkışlar',metin:'Magendie orta hatta, Luschka açıklıkları iki yandadır. [[K5 s. 136]]'},
      {ad:'Sisternalar',metin:'Orta açıklık serebellomedüller, lateral açıklıklar pontin sisterna düzeyinde subaraknoid aralığa açılır. [[K5 s. 136]]'},
      {ad:'Emilim',metin:'BOS basıncı venöz basıncı aştığında villuslardan pasif emilim olur. [[K5 s. 136]]'}
    ],
    ortak:(S,i)=>{
      const w=S.w, x=w/2;
      let svg=S.kutu(x-95,4,190,32,{yazi:'Dördüncü ventrikül'});
      ['Magendie','Luschka'].forEach((ad,j)=>{
        const cx=w*(j?0.75:0.25);
        svg+=S.ok([[x,36],[cx,55]],{renk:'accent'});
        svg+=S.kutu(cx-w*.23,55,w*.46,37,{yazi:ad,dolgu:i===0?'accent-soft':'paper'});
        svg+=S.ok([[cx,92],[cx,111]]);
        svg+=S.kutu(cx-w*.24,112,w*.48,50,{yazi:j?['Pontin','sisterna']:['Serebellomedüller','sisterna'],dolgu:i===1?'accent-soft':'paper',yc:'k'});
        svg+=S.ok([[cx,162],[x,190]]);
      });
      return svg+S.kutu(x-140,191,280,46,{yazi:['Subaraknoid aralıktan','villuslara ve lenf yollarına'],dolgu:i===2?'accent-soft':'paper'});
    }
  });

  VIZ.an03c_duzey = el => SEKIL.sahne(el,{
    baslik:'Konus medullaris ve lomber vertebralar',vb:[640,236],vbDar:[360,236],
    secenek:secim('Yaş',['Yenidoğan','Erişkin']),
    metin:p=>p.secim==='Yenidoğan'
      ? 'Yenidoğanda konus üçüncü lomber vertebra gövdesinin alt kenarına gelir. [[K5 s. 137–138]]'
      : 'Erişkin için ortalama düzey L1 ve L2 gövdeleri arasındaki disktir, bireysel sonlanma T12 ile L3 arasında değişebilir. [[K5 s. 137–138]]',
    ciz:(S,t,p)=>{
      const cx=S.w/2, uc=p.secim==='Yenidoğan'?199:74;
      let svg='';
      ['L1','L2','L3'].forEach((ad,i)=>{
        svg+=S.kutu(cx-110,18+i*64,78,53,{yazi:ad});
      });
      svg+=S.cizgi([[cx+17,8],[cx+16,uc-39],[cx+28,uc],[cx+40,uc-39],[cx+39,8]],{renk:'basic',dolgu:'basic-soft'});
      svg+=S.cizgi([[cx+28,uc],[cx+28,221]],{renk:'basic'});
      svg+=S.cizgi([[cx-32,uc],[cx+25,uc]],{kesik:true,renk:'accent'});
      return svg+S.t(cx+45,uc+4,'Konus',{c:'k'});
    }
  });

  function kesit(S) {
    const cx=S.w/2, pts = [];
    for(let i=0;i<=64;i++){
      const a=i*Math.PI/32;
      pts.push([cx+125*Math.cos(a),127+84*Math.sin(a)]);
    }
    let svg=S.cizgi(pts,{dolgu:'paper',renk:'ink'});
    const yari=[[0,115],[24,109],[52,69],[59,76],[43,119],[46,135],[66,158],[59,174],[40,177],[21,147],[0,138]];
    const h=yari.concat(yari.slice().reverse().map(([x,y])=>[-x,y]),[yari[0]]).map(([x,y])=>[cx+x,y]);
    svg+=S.cizgi(h,{dolgu:'basic-soft',renk:'basic'});
    svg+=S.cizgi([[cx,44],[cx,100]],{renk:'line'});
    svg+=S.cizgi([[cx-4,210],[cx,163],[cx+4,210]],{renk:'ink'});
    svg+=S.daire(cx,127,3,{renk:'accent'});
    return svg+S.t(cx,25,'Arka',middle)+S.t(cx,236,'Ön',middle);
  }
  const kesitler={
    'Arka boynuz':[50,81,'İnce arka boynuzun tepesinde substantia gelatinosa yer alır. [[K5 s. 140]]'],
    'Ön boynuz':[46,159,'Ön boynuzun büyük hücreleri motor nöronlardır. [[K5 s. 140]]'],
    'Santral kanal':[0,127,'Gri cevherin ortasındaki dar kanal BOS içerir. [[K5 s. 140]]'],
    'Beyaz cevher':[-87,125,'Gri cevheri çevreleyen beyaz cevherin büyük bölümünü uzunlamasına miyelinli lifler oluşturur. [[K5 s. 140]]']
  };
  VIZ.an03c_kesit = el => SEKIL.sahne(el,{
    baslik:'Omuriliğin temel kesit planı',vb:[640,245],vbDar:[360,245],secenek:secim('Yapı',Object.keys(kesitler)),
    metin:p=>kesitler[p.secim][2],ciz:(S,t,p)=>{
      const [x,y]=kesitler[p.secim];
      return kesit(S)+S.daire(S.w/2+x,y,7,{renk:'accent',dolgu:'accent-soft',w:3});
    }
  });

  const yollar={
    'Lateral piramidal':['Motor korteks','Medulla','Ön boynuz','Medullada piramidal çaprazdan geçen lifler karşı omurilik yarısında aşağı iner. [[K5 s. 140]]'],
    'Arka kolon':['Arka kök','Medulla','Talamus','Arka kolonda aynı tarafta çıkan lifler medulladaki sinapstan sonra karşıya geçer. [[K5 s. 141]]'],
    'Spinotalamik':['Arka kök','Omurilik','Talamus','Bir veya iki segment yükselen aferentler arka boynuzda sinaps yapar ve lifler sinapstan sonra omurilikte çaprazlaşır. [[K5 s. 141]]']
  };
  VIZ.an03c_yollar = el => SEKIL.sahne(el,{
    baslik:'Başlangıçtan hedefe çaprazlaşma',vb:[640,245],vbDar:[360,245],secenek:secim('Traktus',Object.keys(yollar)),
    metin:p=>yollar[p.secim][3],ciz:(S,t,p)=>{
      const w=S.w,[start,cross,end]=yollar[p.secim],inen=p.secim==='Lateral piramidal',ilk=inen?40:195,son=235-ilk;
      let svg=S.cizgi([[w/2,9],[w/2,232]],{kesik:true,renk:'muted'});
      svg+=S.ok([[w*.25,ilk],[w*.25,inen?95:143],[w*.75,inen?143:95],[w*.75,son]],{renk:'accent',w:4});
      svg+=S.kutu(w*.25-70,ilk-16,140,32,{yazi:start});
      svg+=S.kutu(w*.75-70,son-16,140,32,{yazi:end});
      return svg+S.kutu(w/2-58,102,116,33,{yazi:cross,dolgu:'accent-soft'});
    }
  });

  const kan = {
    'Ön spinal':['Vertebral arterler','Ön median fissür','Arka gri kolonların önü','İki vertebral dal foramen magnumda birleşir. [[K5 s. 142]]'],
    'Arka spinal':['Arka alt serebellar arter','Arka spinal arterler','Arka gri ve beyaz kolonlar','Her iki yanda bir veya iki damar arka kolonları besler. [[K5 s. 143]]'],
    'Adamkiewicz':['Büyük ön radiküler arter','Ön ve arka spinal arterler','Alt omuriliğe destek','Çoğunlukla soldan gelir ve omuriliğin alt üçte ikisinin kanlanmasının büyük bölümünü sağlayabilir. [[K5 s. 144–145]]']
  };
  VIZ.an03c_damar = el => SEKIL.sahne(el,{
    baslik:'Omuriliğin arteriyel beslenmesi',vb:[640,370],vbDar:[360,370],secenek:secim('Damar',Object.keys(kan)),
    metin:p=>kan[p.secim][3],ciz:(S,t,p)=>{
      const cx=S.w/2, yol=kan[p.secim], on=p.secim==='Ön spinal', arka=p.secim==='Arka spinal';
      let svg=kesit(S);
      if(!arka) svg+=S.daire(cx,209,5,{renk:'crit',dolgu:'crit'});
      if(!on) [-1,1].forEach(k=>{svg+=S.daire(cx+k*58,52,4,{renk:'crit',dolgu:'crit'});});
      svg+=S.kutu(cx-155,248,310,31,{yazi:yol[0],yc:'k'});
      svg+=S.ok([[cx,279],[cx,294]],{renk:'crit'});
      svg+=S.kutu(cx-155,295,310,31,{yazi:yol[1],yc:'k',dolgu:'crit-soft'});
      return svg+S.t(cx,354,yol[2],{a:'middle',c:'b'});
    }
  });
  const bulgular={
    'Hareket':['Paralizi','Motor işlev korunur','Sol lateral piramidal yolun kesilmesi lezyonun altında solda paralizi yapar. [[K5 s. 146]]'],
    'Pozisyon':['Pozisyon kaybı','Pozisyon korunur','Sol arka kolon kesildiğinde sol ekstremitede hareket ve pozisyon duyusu ile dokunsal ayırt etme kaybolur. [[K5 s. 146]]'],
    'Ağrı ve sıcaklık':['Duyu korunur','Duyu kaybı','Sol spinotalamik yol sağdan gelen ve daha önce çaprazlaşmış lifleri taşır. [[K5 s. 146]]']
  };
  VIZ.an03c_lezyon = el => SEKIL.sahne(el,{
    baslik:'Sol hemiseksiyonda lezyon altındaki bulgular',vb:[640,145],vbDar:[360,145],secenek:secim('İşlev',Object.keys(bulgular)),
    metin:p=>bulgular[p.secim][2],ciz:(S,t,p)=>{
      const w=S.w,v=bulgular[p.secim],agri=p.secim==='Ağrı ve sıcaklık';
      return S.t(w/2,22,'Sol hemiseksiyon · lezyonun altı',middle)+
        [0,1].map(j=>S.t(w*(.25+.5*j),58,j?'Sağ':'Sol',middle)+S.kutu(w*(.02+.5*j),70,w*.46,52,{yazi:v[j],yc:'k',dolgu:j===Number(agri)?'crit-soft':'paper'})).join('');
    }
  });
})();
