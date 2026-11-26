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

  const meninks = { ad:'Arkadan açılmış kanal', resim:'img/anatomi/03c-meninks.webp', en:1024, boy:1229 };
  VIZ.an03c_katman = el => SEKIL.cizim(el, {
    baslik:'Vertebral kanalın arka duvarından omuriliğe',
    giris:'Arkadan açılan kanalda sarı bağdan başlayıp öne, omurilik yüzeyine doğru ilerleyin. [[K5 s. 130–132]]',
    gorunumler:[{...meninks, noktalar:[
      nokta(513,103,'Sarı bağ','Laminalarla birlikte epidural aralığın arka sınırını oluşturur. [[K5 s. 132]]'),
      nokta(516,206,'Epidural aralık','Dural keseyi dışarıdan destekleyen yağ bu aralıkta bulunur. [[K5 s. 131]]'),
      nokta(714,455,'Dura','Yana kaldırılmış fibröz kılıf, kraniyal duranın meningeal katının devamıdır. [[K5 s. 130–131]]'),
      nokta(456,437,'Araknoid','İnce zar duranın iç yüzünü döşer. [[K5 s. 131]] Birbirine bakan yüzleri yalnızca ince bir seröz sıvı tabakası ayırır. [[K5 s. 132]]'),
      nokta(540,533,'Subaraknoid aralık','Araknoid ile pia arasında BOS bulunur. [[K5 s. 131–132]]'),
      nokta(472,818,'Pia','Damar taşıyan pia omurilik yüzeyine tutunur ve oluklarına girer. [[K5 s. 131]]')
    ]}]
  });
  VIZ.an03c_epidural = el => SEKIL.cizim(el, {
    baslik:'Epidural ve intratekal hedefler',
    giris:'Arkadan öne doğru sıra sarı bağ, epidural aralık, dura, araknoid, subaraknoid aralık ve piadır. [[K5 s. 130–132]] Numaralar iki tekniğin doku hedeflerini gösterir. [[K5 s. 132–135]]',
    gorunumler:[{...meninks, noktalar:[
      nokta(513,103,'Sarı bağda direnç','Tuohy iğnesi sarı bağda ilerlerken enjektördeki serum fizyolojiğe sürekli basınç uygulanır. [[K5 s. 135]]'),
      nokta(516,206,'Epidural aralıkta direnç kaybı','İğne ağzı bağdan çıktığında direnç aniden azalır. [[K5 s. 135]] İnce epidural kateter dura dışında ilerletilir. [[K5 s. 135]]'),
      nokta(540,533,'Kombine teknikte intratekal hedef','İnce spinal iğne Tuohy içinden geçer. [[K5 s. 135]] İntratekal ilaç subaraknoid aralıktaki BOS’a ulaşır. [[K5 s. 132–135]]')
    ]}]
  });

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

  VIZ.an03c_duzey = el => SEKIL.cizim(el, {
    baslik:'Konus ucunun vertebra gövdelerine göre düzeyi',
    giris:'Solda erişkin, sağda yenidoğan görülüyor. Her iki görünümde gövdeleri yukarıdan aşağıya L1, L2, L3 olarak sayın. [[K5 s. 137–138]]',
    gorunumler:[{ad:'Sagittal karşılaştırma', resim:'img/anatomi/03c-duzey.webp', en:1024, boy:683, noktalar:[
      nokta(329,234,'Erişkinde konus ucu','Ortalama sonlanma L1–L2 diskidir. [[K5 s. 137–138]] Bireysel düzey T12 ile L3 arasında değişebilir. [[K5 s. 137–138]]'),
      nokta(735,552,'Yenidoğanda konus ucu','Konus üçüncü lomber vertebra gövdesinin alt kenarına ulaşır. [[K5 s. 137–138]]')
    ]}]
  });

  const damarLevhasi = { resim:'img/anatomi/03c-damar.webp', en:1024, boy:512 };
  const enineKesit = { ...damarLevhasi, ad:'Enine kesit', kirp:[0,0,625,512] };
  VIZ.an03c_kesit = el => SEKIL.cizim(el, {
    baslik:'Omuriliğin temel kesit planı',
    giris:'Arka yüz üstte, ön yüz alttadır. Ön median fissürden merkeze doğru bakın. [[K5 s. 139–140]]',
    gorunumler:[{...enineKesit, noktalar:[
      nokta(441,154,'Arka boynuz','İnce arka boynuzun tepesinde substantia gelatinosa yer alır. [[K5 s. 140]]'),
      nokta(441,299,'Ön boynuz','Geniş ön boynuzun büyük hücreleri motor nöronlardır. [[K5 s. 140]]'),
      nokta(323,243,'Santral kanal','Gri cevherin merkezindeki dar kanal BOS içerir. [[K5 s. 140]]'),
      nokta(134,235,'Beyaz cevher','Gri cevheri çevreler ve büyük ölçüde uzunlamasına uzanan miyelinli liflerden oluşur. [[K5 s. 140]]')
    ]}]
  });

  VIZ.an03c_yollar = el => SEKIL.cizim(el, {
    baslik:'Omurilikte inen ve çıkan yollar',
    giris:'Noktalar beyaz cevherdeki yol bölgelerini gösterir. Her yolun omuriliğe giriş veya çıkış tarafını çapraz yaptığı düzeyle ilişkilendirin. [[K5 s. 140–141]]',
    gorunumler:[{...enineKesit, noktalar:[
      nokta(495,159,'Lateral piramidal yol','Motor korteksten gelen lifler medullada piramidal çaprazı yapar, karşı omurilik yarısında iner ve ön boynuzun motor hücreleriyle sinaps kurar. [[K5 s. 140]]'),
      nokta(357,107,'Arka kolon','Arka kökten giren liflerin çoğu çaprazlaşmadan aynı tarafta medullaya yükselir ve oradaki çekirdeklerde sinaps yapar. [[K5 s. 141]] Sinapstan sonra karşıya geçen lifler talamusa ulaşır. [[K5 s. 141]]'),
      nokta(530,250,'Lateral spinotalamik yol','Arka kökten giren aferentler bir veya iki segment yükselerek arka boynuzda sinaps yapar. [[K5 s. 141]] Ardından lifler omurilikte çaprazlaşır ve karşı taraftan talamusa yükselir. [[K5 s. 141]]')
    ]}]
  });

  VIZ.an03c_damar = el => SEKIL.cizim(el, {
    baslik:'Omuriliğin arteriyel beslenmesi',
    giris:'Kesitte ön ve arka spinal arterleri, önden görünümde büyük radiküler arterin ön spinal artere katıldığı yeri bulun. [[K5 s. 142–145]]',
    gorunumler:[
      {...enineKesit, noktalar:[
        nokta(322,458,'Ön spinal arter','Foramen magnumda iki vertebral arterden gelen birer dal birleşir. [[K5 s. 142]] Oluşan arter ön median fissür boyunca iner ve arka gri kolonların önünde kalan omuriliği besler. [[K5 s. 142]]'),
        nokta(192,83,'Arka spinal arterler','Her yanda arka alt serebellar arterden çıkan bir veya iki damar arka gri ve beyaz kolonları besler. [[K5 s. 143]]')
      ]},
      {...damarLevhasi, ad:'Önden görünüm', kirp:[630,0,394,512], noktalar:[
        nokta(906,182,'Adamkiewicz arteri','Bu büyük ön radiküler arter çoğunlukla soldan gelir. [[K5 s. 144]] Ön ve arka spinal arterleri destekler ve omuriliğin alt üçte ikisinin kanlanmasının büyük bölümünü sağlayabilir. [[K5 s. 144–145]]')
      ]}
    ]
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
