(function () {
  'use strict';
  const VIZ = window.VIZ;

  // Aynı koordinat düzeni, seçilen yolun girdisini ve sonucunu dikey bağlar.
  function yol(S, satirlar, oklar = true) {
    const x = S.w / 2;
    return satirlar.map((satir, i) => {
      const y = 8 + i * 81;
      return (i && oklar ? S.ok([[x, y-22],[x, y-3]], {renk:'muted'}) : '')
        + S.kutu(12,y,S.w-24,55,{yazi:satir, renk:i ? 'accent' : 'basic',
          dolgu:i ? 'accent-soft' : 'basic-soft', lh:20});
    }).join('');
  }

  function secimli(el, baslik, soru, durumlar, oklar = true) {
    return SEKIL.sahne(el, {
      baslik, vb:[640,235], vbDar:[360,235],
      secenek:{id:'durum', ad:soru, liste:Object.keys(durumlar).map(ad=>({d:ad,ad}))},
      ciz:(S,t,p)=>yol(S,durumlar[p.durum].satirlar,oklar),
      metin:p=>durumlar[p.durum].metin
    });
  }

  VIZ.a09b_ideal = el => secimli(el,'İdeal intravenöz anestezik','Aşama',{
    'Hazırlık':{
      satirlar:['Suda çözünen preparat','Oda sıcaklığında uzun raf ömrü','Enjeksiyonda ağrı olmaması'],
      metin:'Hazırlanan ajan diğer ilaçlarla etkileşmemeli, yanlışlıkla arter içine verilse bile güvenli olmalıdır. [[K3 s. 109]]'
    },
    'İndüksiyon':{
      satirlar:[['Fizyolojik pH’da','çoğunlukla iyonize olmamış'], 'Lipitte yüksek çözünürlük','Hızlı etki başlangıcı'],
      metin:'İdeal ajan subanestezik konsantrasyonda analjezi sağlamalı, dolaşım ve solunumu en az düzeyde baskılamalıdır. [[K3 s. 109]]'
    },
    'Derlenme':{
      satirlar:['Uzun infüzyonda birikim yok','Hızlı derlenme',['Eksitasyon veya','uyanma fenomeni yok']],
      metin:'Emetik etki, toksisite, histamin salınımı ve aşırı duyarlılık beklenmez, çevresel etki de en az düzeyde olmalıdır. [[K3 s. 109]]'
    }
  }, false);

  VIZ.a09b_ortam = el => secimli(el,'Tiyopentalin ortamla değişen davranışı','Ortam',{
    'Flakon':{satirlar:['Sodyum karbonat + su','OH⁻ oluşumu · pH 10.5','Suda çözünen enol formu'],
      metin:'Sodyum karbonatın oluşturduğu alkali ortam %2.5’lik preparatta enol formunu destekler. [[K3 s. 110]]'},
    'Arter':{satirlar:['%2.5 çözelti · pH 10.5','Arter kanı · pH 7.4','Keto formu ↑ · kristaller çöker'],
      metin:'Suda az çözünen kristaller küçük damarları tıkayarak iskemiye ve ağrıya yol açar. [[K3 s. 112]]'},
    'Ven':{satirlar:['İntravenöz enjeksiyon','Venöz kanla sürekli seyrelme','Çökelme görülmez'],
      metin:'Damar çevresine enjeksiyon ise ağrılıdır, büyük dozun damar dışına kaçması ciddi doku nekrozu yapabilir. [[K3 s. 112]]'}
  });

  VIZ.a09b_dolasim = el => secimli(el,'İndüksiyonda dolaşım yanıtı','Ajan',{
    'Tiyopental':{satirlar:['Atım hacmi ve kardiyak debi ↓','Sistemik vasküler direnç ↓','Kompansatuvar taşikardi olabilir'],
      metin:'Dolaşımdaki düşüşler doza bağlıdır, hipovolemi, asidoz ve azalmış plazma protein bağlanmasında daha sık görülür. [[K3 s. 111]]'},
    'Propofol':{satirlar:['Sistemik vasküler direnç ↓','Arter basıncı ↓','Refleks taşikardi seyrek'],
      metin:'Sempatik aktivite ve miyokard kontraktilitesi azalır, özellikle opioidle birlikte genellikle bradikardi görülür. [[K3 s. 113]]'}
  }, false);

  VIZ.a09b_fraksiyon = el => SEKIL.adim(el,{
    baslik:'Plazmadaki tiyopentalin payları',vb:[640,156],vbDar:[360,156],oto:false,
    ortak:(S, i)=>{
      const parcalar = i ? [[80,'basic'],[8,'warn'],[12,'accent']] : [[80,'basic'],[20,'accent']];
      let x=12;
      let svg=S.t(S.w/2,25,'Toplam plazma tiyopentali',{a:'middle',c:'b'});
      for (const [pay, renk] of parcalar) {
        const genislik=(S.w-24)*pay/100;
        svg+=S.kutu(x,43,genislik,33,{renk,dolgu:renk+'-soft',r:0});
        x+=genislik;
      }
      const etiket=i ? ['Bağlı %80   ·   Serbest, iyonize %8','Serbest, iyonize olmayan %12'] : ['Proteine bağlı %80','Serbest %20'];
      return svg+S.t(S.w/2,105,etiket,{a:'middle',lh:23});
    },
    adimlar:[
      {ad:'Bağlanma',metin:'Toplam ilacın %80’i proteine bağlı, %20’si serbesttir. [[K3 s. 111–112]]'},
      {ad:'İyonizasyon',metin:'pKa 7.6 iken serbest kısmın %60’ı iyonize olmamıştır, dolayısıyla toplamın %12’si hemen kullanılabilir. [[K3 s. 111–112]]'}
    ]
  });

  VIZ.a09b_pris = el => SEKIL.adim(el,{
    baslik:'PRIS’te miyosit hasarının gelişimi',vb:[640,235],vbDar:[360,235],oto:false,
    ortak:(S,i)=>yol(S,['Mitokondride enerji üretimi',['Enerji gereksinimi ile','kullanımı arasında uyumsuzluk'],'Kas nekrozu'].slice(0,i+1)),
    adimlar:[
      {ad:'Mitokondri',metin:'Modellerde propofol miyositlerde elektron transferini, oksidatif fosforilasyonu ve mitokondriyal enerji üretimini bozar. [[K3 s. 115]]'},
      {ad:'Enerji açığı',metin:'Bu bozulma, enerji gereksinimi ile kullanımı arasında uyumsuzluğa yol açar. [[K3 s. 115]]'},
      {ad:'Kas hasarı',metin:'Enerji gereksinimi ile kullanımı arasındaki uyumsuzluk sonuçta kas nekrozuna yol açar. [[K3 s. 115]]'}
    ]
  });
})();
