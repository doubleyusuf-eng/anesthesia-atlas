(function () {
  'use strict';
  const VIZ = window.VIZ;
  const boyut = { vb: [420, 195], vbDar: [360, 195] };
  const ortala = { a: 'middle', c: 'b' };
  const sayi = n => n.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
  const secim = (id, ad, adlar) => ({ id, ad, liste: adlar.map(ad => ({ d: ad, ad })) });

  VIZ.fk08b_darlik = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'Kesit ve jet hızı', param: [{ id: 'alan', ad: 'Boğaz kesiti / giriş kesiti', min: 0.25, max: 1, adim: 0.05, deger: 0.5 }],
    ciz(S, t, p) {
      const x = S.w / 2, h = 38 * Math.sqrt(p.alan);
      const duvar = yon => [[16, 85 + yon * 38], [x - 70, 85 + yon * 38], [x - 23, 85 + yon * h], [x + 23, 85 + yon * h], [x + 70, 85 + yon * 38], [S.w - 16, 85 + yon * 38]];
      const duvarlar = S.cizgi(duvar(-1)) + S.cizgi(duvar(1));
      return duvarlar + S.ok([[28, 85], [52, 85]], { renk: 'basic' }) +
        S.ok([[x - 21, 85], [x - 21 + 24 / p.alan, 85]], { renk: 'accent' }) +
        S.t(x, 26, 'Akım sabit', ortala) + S.t(x, 157, 'Boğazdaki hız / giriş hızı = ' + sayi(1 / p.alan), ortala);
    },
    metin: p => p.alan === 1 ? 'Kesitler eşitken aynı akım iki kesitten aynı hızla geçer. [[K6 s. 148]]' :
      'Akım korunur: hız oranı kesit oranının tersidir. [[K6 s. 148]] Dar kesitte hız artarken duvara uygulanan basınç düşer. [[K6 s. 146–147]]'
  });

  const valfler = { Mavi: [2,24], Beyaz: [4,28], Turuncu: [6,31], Sarı: [8,35], Kırmızı: [10,40], Yeşil: [15,60] };
  VIZ.fk08b_valf = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'HAFOE valfinin gaz yolları', secenek: secim('valf','Valf rengi',Object.keys(valfler)),
    ciz(S, t, p) {
      const [q, o2] = valfler[p.valf], x = S.w / 2;
      return S.t(x, 24, 'Oda havası', ortala) + S.ok([[x,32],[x,81]],{renk:'clin'}) +
        S.cizgi([[14,68],[x-60,68],[x-31,83],[x-18,83]]) + S.cizgi([[14,116],[x-60,116],[x-31,101],[x-18,101]]) +
        S.cizgi([[x+15,72],[S.w-12,60]]) + S.cizgi([[x+15,112],[S.w-12,124]]) +
        S.ok([[24,92],[x-12,92]],{renk:'basic'}) + S.ok([[x+8,92],[S.w-24,92]],{renk:'accent'}) +
        S.t(x/2,155,q + ' L/dk O₂', ortala) + S.t(x*1.5,155,'Karışım: %' + o2, ortala);
    },
    metin: p => p.valf + ' valfte belirtilen %' + valfler[p.valf][1] + ' oksijen için besleme akımı ' + valfler[p.valf][0] + ' L·dk⁻¹ olmalıdır. [[K6 s. 149]]'
  });

  VIZ.fk08b_coanda = el => SEKIL.sahne(el, {
    ...boyut, baslik: 'İki solunum fazında gazın yolu', secenek: secim('faz','Solunum fazı',['İnspirasyon','Ekspirasyon']),
    ciz(S,t,p) {
      const x = S.w / 2;
      const duvar = S.cizgi([[20,77],[x-50,77],[x,65],[S.w-20,65]]) + S.cizgi([[20,113],[x-45,113],[x-8,156]]) +
        S.cizgi([ [S.w-20,105],[x+40,105],[x+25,118],[x+14,155]]);
      const yol = p.faz === 'İnspirasyon' ? [[30,92],[x-50,92],[x,77],[S.w-35,77]] : [ [S.w-35,91],[x+45,91],[x+22,108],[x+4,148]];
      return duvar + S.t(19,53,'Kaynak') + S.t(S.w-19,49,'Hasta',{a:'end'}) + S.t(x,182,'Tahliye',ortala) + S.ok(yol,{renk:'accent',w:4}) +
        (p.faz === 'Ekspirasyon' ? S.ok([[28,92],[x-16,92]],{renk:'basic'}) : '');
    },
    metin: p => p.faz === 'İnspirasyon' ? 'Jet duvar boyunca hastaya ilerlerken karşısındaki tahliye ağzı açıktır. [[K6 s. 150]]' : 'Kaynak jetinin basıncı, hastadan dönen gazı karşı duvara ve tahliye ağzına yönlendirir. [[K6 s. 150]]'
  });

  VIZ.fk08b_soluk = el => SEKIL.sahne(el, {
    vb:[500,292], vbDar:[360,292], baslik:'Aynı anda hacmin eğimi ve akımın alanı',
    param:[{id:'zaman', ad:'Şematik solukta ilerleme', min:0,max:100,adim:1,deger:25,birim:'%'}],
    ciz(S,t,p) {
      const u = p.zaman / 100, X = z => 26 + (S.w-54)*z;
      // Örnek akım sinyalinin analitik integrali. İki panel kendi ölçeğinde.
      const q = z => Math.sin(2*Math.PI*z);
      const v = z => (1-Math.cos(2*Math.PI*z))/(2*Math.PI);
      const Yv = z => 109 - 210*v(z), Yq = z => 209 - 42*q(z);
      const egri = (y,son) => Array.from({length:101},(_,i) => [X(son*i/100),y(son*i/100)]);
      const alan = son => S.cizgi([[X(0),209],...egri(Yq,son),[X(son),209]],{dolgu:'accent-soft',renk:'none'});
      const y = Yv(u), bas = Math.max(0,u-.075), bit = Math.min(1,u+.075);
      return S.t(22,25,'Hacim değişimi') + S.t(22,154,'Akım') + alan(Math.min(.5,u)) +
        (u>.5 ? S.cizgi([[X(.5),209],...Array.from({length:51},(_,i)=>{const z=.5+(u-.5)*i/50;return [X(z),Yq(z)];}),[X(u),209]],{dolgu:'clin-soft',renk:'none'}) : '') +
        S.cizgi([[X(0),109],[X(1),109]],{renk:'line'}) + S.cizgi([[X(0),209],[X(1),209]],{renk:'line'}) +
        S.cizgi(egri(Yv,1),{renk:'basic'}) + S.cizgi(egri(Yq,1),{renk:'clin'}) + S.cizgi([[X(u),35],[X(u),254]],{renk:'muted',kesik:true}) +
        S.cizgi([[X(bas),y-210*q(u)*(bas-u)],[X(bit),y-210*q(u)*(bit-u)]],{renk:'accent',w:4}) +
        S.daire(X(u),y,5,{dolgu:'accent'}) + S.daire(X(u),Yq(u),5,{dolgu:'clin'}) +
        S.t(X(.25),278,'İnspirasyon',ortala) + S.t(X(.75),278,'Ekspirasyon',ortala);
    },
    metin(p) {
      if (p.zaman === 50) return 'Hacim tepedeyken teğet yataydır ve akım sıfırdan geçerek yön değiştirir. [[K6 s. 152–153]]';
      if (p.zaman === 0 || p.zaman === 100) return 'Bu örnek soluktaki yatay teğet, o anda akımın sıfır olduğunu gösterir. [[K6 s. 152]]';
      return p.zaman < 50 ? 'Yukarı eğimli teğet pozitif akıma karşılık gelir; taralı alan o ana kadar içeri giren hacimdir. [[K6 s. 152]]' :
        'Aşağı eğimli teğet negatif akıma karşılık gelir; eksen altındaki alanın büyüklüğü dışarı çıkan hacimdir. [[K6 s. 152]]';
    }
  });

  VIZ.fk08b_pitot = el => SEKIL.grafik(el, {
    vb:[520,290],vbDar:[360,290],baslik:'Pitot basınç farkının hızla değişimi',
    x:{min:0,max:2,ad:'Yerel hız / referans hız',adimlar:[0,1,2]},y:{min:0,max:4,ad:'Basınç farkı / referans fark',adimlar:[0,1,2,3,4]},
    param:[{id:'hiz',ad:'Referansa göre hız',min:0,max:2,adim:.1,deger:1}],
    egriler:[{f:x=>x*x,renk:'accent'}], noktalar:p=>[{x:p.hiz,y:p.hiz**2}],
    dikey:p=>[{x:p.hiz}],yatay:p=>[{y:p.hiz**2}],
    okuma:p=>'Yerel hız referansın '+sayi(p.hiz)+' katı olduğunda basınç farkı '+sayi(p.hiz**2)+' katıdır. [[K6 s. 155]]'
  });

  VIZ.fk08b_wright = el => SEKIL.sahne(el,{
    ...boyut,baslik:'Wright ölçerde mekanik hareket',secenek:secim('asama','Diyaframın konumu',['Başlangıç','Üfleme','Tepe']),
    ciz(S,t,p) {
      const x = {Başlangıç:75,Üfleme:125,Tepe:176}[p.asama], son=S.w-25;
      const yay = Array.from({length:15},(_,i)=>[x+8+(son-x-8)*i/14,i===0||i===14?88:88+(i%2?9:-9)]);
      return S.cizgi([[18,65],[son,65],[son,120],[176,120]])+S.cizgi([[18,120],[75,120]])+
        S.cizgi([[x,120],[176,120]],{renk:'ink'})+S.kutu(x-4,65,8,55,{r:0,dolgu:'basic',renk:'basic'})+S.cizgi([[x,61],[x,47]],{renk:'clin',w:4})+
        S.t(x,33,'İşaretçi',ortala)+S.cizgi(yay,{renk:'muted'})+S.t(son-27,148,'Yay',ortala)+
        S.ok([[18,88],[x-12,88]],{renk:'accent'})+(x>75?S.ok([[x-20,98],[x-20,145]],{renk:'clin'}):'')+
        S.t(22,179,p.asama==='Başlangıç'?'Diyafram girişte':'Açılan yarıktan gaz çıkışı');
    },
    metin:p=>({Başlangıç:'Diyafram, gelen havanın itişi ile yayın karşı kuvveti arasında hareket eder. [[K6 s. 155]]',Üfleme:'Diyafram ilerlerken işaretçiyi iter ve gazın çıkabileceği dar yarığı açar. [[K6 s. 155]]',Tepe:'Gaz yarıktan kaçtıkça diyaframdaki basınç azalır; yay itişe üstün geldiğinde işaretçi en yüksek akımı gösterir. [[K6 s. 155]]'})[p.asama]
  });

  function cihaz(el, ad, dosya, boy, giris, noktalar) {
    return SEKIL.cizim(el,{baslik:ad,giris,gorunumler:[{ad:'Kesit',resim:'img/fizik/08b-'+dosya+'.webp',en:1024,boy,noktalar:noktalar.map(([x,y,ad,metin])=>({x,y,ad,metin}))}]});
  }

  VIZ.fk08b_pnomotakograf = el => cihaz(el,'Pnömotakograf','pnomotakograf',512,'Gazın geçtiği eleği ve iki ayrı basınç yolunu bulun. [[K6 s. 153–154]]',[
    [491,341,'Metal elek','Tüpün kesitini kaplayan ince ağ, gaz geçişine küçük bir direnç oluşturur. [[K6 s. 153]]'],
    [382,229,'İlk basınç bağlantısı','Duvar deliği eleğin bir tarafındaki basıncı ince tüpe iletir. [[K6 s. 153]]'],
    [643,229,'İkinci basınç bağlantısı','Karşı taraftaki basınç ayrı bir bağlantıdan örneklenir. [[K6 s. 153]]'],
    [688,43,'Basınç sensörü','İki sensör eleğin iki yanındaki küçük basınç farkının ölçülmesini sağlar. [[K6 s. 153]]'],
    [555,354,'Isıtıcı','Eleğin çevresindeki elektrikli ısıtıcı yoğuşmayı önler. [[K6 s. 154]]']
  ]);

  VIZ.fk08b_rotametre = el => cihaz(el,'Değişken açıklıklı akımölçer','rotametre',1536,'Gaz girişinden üst çıkışa kadar yolu izleyin, ardından okuma hizasını seçin. [[K6 s. 150–151]]',[
    [118,1236,'Gaz girişi','Gaz alttan verilen akımla şamandırayı yukarı doğru iter. [[K6 s. 150–151]]'],
    [817,1222,'Ayar düğmesi','Düğme iğneli valf üzerinden akımı ayarlar. [[K6 s. 150]]'],
    [538,1237,'İğneli valf','Cam tüpe giden gaz akımı valfin açıklığıyla hassas biçimde ayarlanır. [[K6 s. 150]]'],
    [617,303,'Konik cam tüp','Tüpün yukarı doğru genişlemesi gazın yükselen şamandıra çevresinden daha kolay geçmesini sağlar. [[K6 s. 150–151]]'],
    [511,744,'Üst okuma kenarı','Düz tepeli şamandırada ölçeği üst kenar hizasından okuyun. [[K6 s. 151]]'],
    [512,819,'Yivler','Yivler şamandırayı döndürerek duvara yapışma olasılığını azaltır. [[K6 s. 151]]']
  ]);
  VIZ.fk08b_spirometre = el => cihaz(el,'Benedict–Roth spirometresi','spirometre',936,'Gazın toplandığı çanı ve çanın serbestçe hareket etmesini sağlayan parçaları bulun. [[K6 s. 156–157]]',[
    [511,306,'Hareketli çan','Rijit çanın yer değiştirmesi spirometre hacmindeki değişimle orantılıdır. [[K6 s. 156]]'],
    [932,542,'Karşı ağırlık','Statik olarak dengelenen çan serbestçe yükselip alçalabilir. [[K6 s. 156]]'],
    [293,667,'Su contası','Su, çanın hareketi sırasında çanla sabit taban arasında sızdırmazlık sağlar. [[K6 s. 156]]'],
    [769,890,'Sabit taban','Hacmi değişen haznenin tabanı sabittir. [[K6 s. 156]]'],
    [511,521,'Gaz girişi','Hava yolu ağzından gelen gaz, hacmin doğrudan ölçülmesi için haznede toplanır. [[K6 s. 156]]']
  ]);

  VIZ.fk08b_turbin = el => SEKIL.sahne(el, {
    ...boyut, baslik:'Türbinin optik olarak okunması',
    secenek:secim('konum','Kanadın konumu',['Işık geçiyor','Kanat arada']),
    ciz(S,t,p) {
      const x=S.w/2, kesik=p.konum==='Kanat arada', donus=kesik?-Math.PI/2:-Math.PI/4;
      let kanatlar='';
      for(let i=0;i<4;i++){
        const a=donus+i*Math.PI/2;
        kanatlar+=S.cizgi([[x,118],[x+51*Math.cos(a),118+51*Math.sin(a)]],{renk:'basic',w:7});
      }
      const isin=(x1,x2)=>S.cizgi([[x1,73],[x2,73]],{renk:'accent',kesik:true});
      return S.t(14,30,'Işık kaynağı')+S.t(S.w-14,30,'Algılayıcı',{a:'end'})+
        S.kutu(20,70,23,26,{dolgu:'accent-soft'})+S.kutu(S.w-43,70,23,26,{dolgu:'clin-soft'})+
        isin(44,kesik?x:S.w-45)+kanatlar+S.daire(x,118,8,{dolgu:'basic'})+S.t(x,189,'Döner kanatlar',ortala);
    },
    metin:p=>p.konum==='Kanat arada'?'Kanat demeti kestiğinde algılayıcı ışık kesintisini kaydeder. [[K6 s. 153]]':'Türbin döndükçe ışığın geçişi ve kesilmesi birbirini izler; bu sinyal akımla orantılı gerilime dönüştürülür. [[K6 s. 153]]'
  });
})();
