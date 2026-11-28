(function () {
  'use strict';
  const VIZ = window.VIZ;
  const grafik = { vb: [640, 278], vbDar: [360, 252] };
  const sayi = n => n.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
  const oran = (id, ad, min, max, deger) => ({id, ad, min, max, deger, adim: 0.1});
  const eksen = (ad, min, max, adimlar = []) => ({ad, min, max, adimlar});

  VIZ.fk16_depo = el => SEKIL.grafik(el, {
    ...grafik, baslik: 'Tam karışmış depoda göreli akım ve üstel yıkanma',
    x: eksen('Göreli zaman', 0, 5), y: eksen('C / C₀', 0, 1, [0, 0.5, 1]),
    param: [oran('q','Göreli akım',0.5,2,1)],
    egriler: [{f: (t,p) => Math.exp(-p.q*t)}],
    okuma: p => 'Başlangıç konsantrasyonu ve depo hacmi sabit tutulduğunda göreli akım ' + sayi(p.q)
      + ' için tüm yıkanma alanı başlangıçtaki alanın ' + sayi(1/p.q) + ' katıdır. [[K6 s. 276–277]]'
  });

  // Geliş gecikmesi ve yuvarlak tepe nitel, tepe sonrasındaki iniş üsteldir.
  function gecis(t) {
    if (t <= 0) return 0;
    if (t < 1) return Math.sin(Math.PI*t/2) ** 2;
    return Math.exp(-(t-1));
  }
  VIZ.fk16_gecis = el => SEKIL.grafik(el, {
    ...grafik, baslik:'Ölçülen arter eğrisi ve ilk geçiş alanı',
    x: eksen('Enjeksiyondan sonra zaman',0,8), y: eksen('Boya konsantrasyonu',0,1.12),
    secenek:{id:'kip',ad:'Eğri',liste:[{d:'kayit',ad:'Arter kaydı'},{d:'alan',ad:'İlk geçiş alanı'}]},
    egriler:[
      {f:t=>gecis(t-1)+0.38*gecis(t-4.2), renk:'muted'},
      {f:t=>gecis(t-1), renk:'accent', kesik:true, goster:p=>p.kip==='alan'}
    ],
    ek:(S,p,X,Y)=>{
      let s=S.t(X(0)+4,Y(1.01),'t₀')+S.t(X(1),Y(1.01),'t₁');
      if (p.kip==='alan') {
        const alan=Array.from({length:141},(_,i)=>{const t=1+i/20;return [X(t),Y(gecis(t-1))];});
        s+=S.cizgi([...alan,[X(8),Y(0)],[X(1),Y(0)]],{dolgu:'accent',renk:'none',soluk:true});
      }
      return s;
    },
    okuma:p=>p.kip==='alan'?'Taralı alan ilk geçişe aittir, kesikli çizgi ikinci yükselişin altında üstel inişi sürdürür. [[K6 s. 279–280]]':'t₀ anındaki enjeksiyon ile t₁ anındaki ilk saptama arasında geçiş gecikmesi vardır. [[K6 s. 278]] İkinci yükseliş yeniden dolaşan boyadan gelir. [[K6 s. 278–279]]'
  });

  const nokta=(x,y,ad,metin)=>({x,y,ad,metin});
  const kateter={resim:'img/fizik/16-kateter.webp',en:1024,boy:342};
  VIZ.fk16_kateter = el => SEKIL.cizim(el, {
    baslik:'Swan–Ganz kateteri',giris:'Proksimal bağlantılardan distal uca doğru ilerleyin. [[K6 s. 281]]',
    gorunumler:[
      {...kateter,ad:'Bütün kateter',noktalar:[
        nokta(47,122,'Lümen bağlantıları','Proksimal bağlantılar üzerinden ilaç verilebilir, kan alınabilir ve balon şişirilebilir. [[K6 s. 281]]'),
        nokta(49,224,'Elektrik bağlantısı','Termistör sinyali ayrı elektrik bağlantısıyla iletilir. [[K6 s. 281]]'),
        nokta(574,159,'Enjeksiyon portu','Soğuk bolus, distal termistörün 20–30 cm proksimalinden verilir. [[K6 s. 281]]')
      ]},
      {...kateter,ad:'Distal uç',kirp:[840,95,184,130],noktalar:[
        nokta(897,159,'Termistör','Balonun hemen gerisinde kan sıcaklığındaki düşüşü kaydeder. [[K6 s. 281]]'),
        nokta(950,159,'Balon','Havayla şişirildiğinde akım kateter ucunu pulmoner artere taşır. [[K6 s. 281]]'),
        nokta(1009,159,'Distal açıklık','Distal lümen basınç transdüserine bağlanarak damar içi basınç ölçülebilir. [[K6 s. 280–281]]')
      ]}
    ]
  });
  VIZ.fk16_soguma = el => SEKIL.grafik(el, {
    ...grafik, baslik:'Soğuk bolustan sonra termistör kaydı',
    x:eksen('Bolustan sonra zaman',0,8), y:eksen('ΔT (°C)',-2,0.18,[-2,-1,0]),
    param:[{id:'dus',ad:'En büyük düşüş',min:1,max:2,adim:0.1,deger:1,birim:'°C'}],
    egriler:[{f:(t,p)=>-p.dus*gecis(t-0.7)}],
    okuma:p=>'Seçilen kayıtta sıcaklık başlangıçtan '+sayi(p.dus)+' °C aşağı iner ve yeniden başlangıca yaklaşır. [[K6 s. 281–282]]'
  });

  function surec(el,baslik,adimlar) {
    return SEKIL.adim(el,{
      baslik, vb:[620,205], vbDar:[360,205], oto:false,
      adimlar:adimlar.map(([ad,metin],secili)=>({
        ad,metin,ciz:S=>adimlar.map(([etiket],i)=>{
          const y=8+i*68, x=S.w/2;
          return (i ? S.ok([[x,y-18],[x,y-3]],{renk:'muted'}) : '')
            +S.kutu(x-126,y,252,46,{yazi:etiket,renk:i===secili?'accent':'line',dolgu:i===secili?'accent-soft':'paper'});
        }).join('')
      }))
    });
  }
  // Şematik aç/kapa dizisi ve ısıl yanıt; zaman ya da güç için klinik ölçek yoktur.
  const darbeler = [[0.08,0.16],[0.25,0.42],[0.59,0.65],[0.72,0.82]];
  function isiIzi(S, tur) {
    const x = u => 18+(S.w-36)*u;
    const noktalar = [];
    if (tur === 0) {
      noktalar.push([x(0),120]);
      for (const [bas,son] of darbeler) {
        noktalar.push([x(bas),120],[x(bas),62],[x(son),62],[x(son),120]);
      }
      noktalar.push([x(1),120]);
    } else {
      for (let i=0;i<=180;i++) {
        const u=i/180;
        let yanit;
        if (tur===2) yanit=gecis(9*u-0.4);
        else {
          yanit=0;
          for (const [bas,son] of darbeler) {
            const yuksel=t=>t<=0?0:1-Math.exp(-20*t);
            yanit+=yuksel(u-bas-0.035)-yuksel(u-son-0.035);
          }
        }
        noktalar.push([x(u),120-60*yanit]);
      }
    }
    return S.t(18,25,['Filaman komutu','Ölçülen sıcaklık artışı','Eşdeğer ısıl yıkanma'][tur],{c:'b'})
      +S.cizgi([[x(0),124],[x(1),124]],{renk:'line'})
      +S.cizgi(noktalar,{renk:tur===0?'basic':'accent',w:3})
      +S.t(S.w-18,153,'Zaman',{a:'end',c:'k'});
  }
  VIZ.fk16_isitma = el => SEKIL.adim(el,{
    baslik:'Sürekli termodilüsyonun giriş ve çıkış sinyalleri',vb:[620,165],vbDar:[360,165],oto:false,
    adimlar:[
      {ad:'Isıtma',ciz:S=>isiIzi(S,0),metin:'İki termistör arasındaki filaman rastgele sinyalle açılır ve kapanır. [[K6 s. 283]]'},
      {ad:'Isıl yanıt',ciz:S=>isiIzi(S,1),metin:'Isıtma dönemlerinin süreleri değiştikçe küçük yıkanma eğrilerinin süreleri de değişir. [[K6 s. 283]]'},
      {ad:'Eşdeğer eğri',ciz:S=>isiIzi(S,2),metin:'Monitör giriş ve yanıtı çapraz korelasyonla ilişkilendirip tek bir teorik eğri elde eder. [[K6 s. 283]]'}
    ]
  });
  VIZ.fk16_lityum = el => surec(el,'Lityumla kalibre edilmiş basınç dalgası analizi',[
    ['Venöz bolus','Küçük lityum klorür bolusu santral veya periferik venden verilebilir. [[K6 s. 283]]'],
    ['Arteriyel lityum eğrisi','Arter hattından sensöre çekilen kan ilk geçiş konsantrasyon eğrisini verir. [[K6 s. 283]]'],
    ['Dalga biçiminin kalibrasyonu','Arter basıncı dalgasından hesaplanan sürekli debi birkaç saatte bir lityum dilüsyonuyla kalibre edilir. [[K6 s. 283]]']
  ]);

  const prob={resim:'img/fizik/16-prob.webp',en:1024,boy:342};
  VIZ.fk16_prob = el => SEKIL.cizim(el,{
    baslik:'Sürekli dalga kalem Doppler probu',giris:'Monitörden probun ucundaki kristallere geçin. [[K6 s. 284–285]]',
    gorunumler:[
      {...prob,ad:'Sistem',noktalar:[
        nokta(106,194,'Hoparlör','Gönderilen ve yansıyan frekansların farkı hoparlörden ses olarak duyulur. [[K6 s. 285]]'),
        nokta(591,171,'Kalem prob','Prob cilt üzerinde açılandırılır, araya empedans uyumu sağlayan jel uygulanır. [[K6 s. 284]]')
      ]},
      {...prob,ad:'Prob ucu',kirp:[755,80,269,180],noktalar:[
        nokta(976,142,'Verici kristal','Prob ucundaki düşük empedanslı verici kristal sürekli ultrason gönderir. [[K6 s. 283–284]]'),
        nokta(977,195,'Alıcı kristal','Aynı uçtaki alıcı, hareketli hücrelerden yansıyan sesi algılar. [[K6 s. 284]]')
      ]}
    ]
  });
  VIZ.fk16_aci = el => SEKIL.sahne(el,{
    baslik:'Demet ile akım arasındaki açı',vb:[500,225],vbDar:[360,225],
    param:[{id:'aci',ad:'Demet–akım açısı',min:0,max:90,adim:1,deger:45,birim:'°'}],
    ciz:(S,t,p)=>{
      const x=S.w/2+44, y=134, a=p.aci*Math.PI/180;
      return S.kutu(12,103,S.w-24,62,{dolgu:'clin-soft',renk:'clin'})
        +S.ok([[x,y],[S.w-24,y]],{renk:'clin',w:4})
        +S.ok([[x-108*Math.cos(a),y-108*Math.sin(a)],[x,y]],{renk:'accent',w:4})
        +S.t(16,28,'Ses demeti',{renk:'accent',c:'b'})
        +S.t(S.w-18,192,'Kan akımı',{a:'end',renk:'clin',c:'b'});
    },
    metin:p=>'Aynı hızda '+p.aci+'° için kayma, eksen boyunca ölçülebilecek en büyük kaymanın '
      +sayi(Math.abs(Math.cos(p.aci*Math.PI/180)))+' katıdır. [[K6 s. 284]]'
  });
  VIZ.fk16_derinlik = el => SEKIL.sahne(el,{
    baslik:'Atımlı Doppler yankısının derinliği', vb:[500,235],vbDar:[360,235],
    param:[oran('derin','Damar içindeki göreli derinlik',0,1,0.5)],
    ciz:(S,t,p)=>{
      const x=S.w/2, y=97+100*p.derin;
      return S.kutu(x-77,7,154,38,{yazi:'Özofagus probu',renk:'basic',dolgu:'basic-soft'})
        +S.kutu(12,97,S.w-24,100,{renk:'clin',dolgu:'clin-soft'})
        +S.cizgi([[x,45],[x,y]],{renk:'accent',kesik:true})
        +S.daire(x,y,7,{dolgu:'accent',renk:'accent'})
        +S.t(18,85,'Yakın duvar',{c:'k'})+S.t(18,220,'Uzak duvar',{c:'k'});
    },
    metin:p=>p.derin===0?'En erken seçilen damar yankısı proba yakın duvardandır. [[K6 s. 286]]':
      p.derin===1?'Karşı duvarın yankısı damarın içinden gelen yankılardan daha geç döner. [[K6 s. 286]]':
      'Örnekleme noktası iki duvar arasındadır. [[K6 s. 286]] Gecikme büyüdükçe probdan daha uzaktaki hücrelerin frekans kayması seçilir. [[K6 s. 286]]'
  });

  VIZ.fk16_lazer = el => SEKIL.cizim(el,{
    baslik:'Optik lifli yüzey probu',giris:'Işığın dokuya gidişini ve saçıldıktan sonra dönüşünü izleyin. [[K6 s. 287]]',
    gorunumler:[{ad:'Doku teması',resim:'img/fizik/16-lazer.webp',en:1024,boy:1024,noktalar:[
      nokta(469,332,'Işığı ileten lif','Lazer ışığı optik lifle dokuya gönderilir. [[K6 s. 287]]'),
      nokta(555,553,'Işığı toplayan lif','Dokudan saçılan ışık optik lifle geri taşınır. [[K6 s. 287]]'),
      nokta(445,914,'Kapiller eritrosit','Hareketli eritrosit tarafından saçılan görünür ışık frekans kayması taşır. [[K6 s. 287]]')
    ]}]
  });
  VIZ.fk16_fluks = el => SEKIL.grafik(el,{
    ...grafik, baslik:'Göreli fluksun hücre yoğunluğuna ve hızına bağımlılığı',
    x:eksen('Göreli hücre hızı',0,1,[0,0.5,1]),y:eksen('Göreli fluks',0,1,[0,0.5,1]),
    param:[oran('c','Göreli hareketli hücre konsantrasyonu',0,1,1)],
    egriler:[{f:(v,p)=>v*p.c}],
    okuma:p=>p.c===0?'Hareketli saçıcı yokken her hızda fluks sıfırdır. [[K6 s. 288]]':
      'Göreli hücre hızı 1 iken fluks '+sayi(p.c)+' olur. [[K6 s. 288]] Doğrunun eğimi hareketli eritrosit konsantrasyonudur. [[K6 s. 288]]'
  });
})();
