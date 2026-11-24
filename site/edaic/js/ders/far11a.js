(function () {
  'use strict';
  const VIZ = window.VIZ;
  const centre = {a:'middle', c:'b'};
  const steps = {vb:[600,212], vbDar:[340,212], oto:false};
  const box = (S,y,label,colour) => S.kutu(20,y,S.w-40,42,{yazi:label,renk:colour,dolgu:colour+'-soft'});

  VIZ.a11a_lif = el => SEKIL.adim(el,{
    ...steps, baslik:'Aksiyon potansiyelinin seçilen evresi',
    ortak(S,i) {
      const points = [[34,145],[S.w*.32,102],[S.w*.47,39],[S.w*.78,145],[S.w-24,145]];
      const pos = points[i];
      return S.cizgi(points,{renk:'line',w:4}) + S.cizgi(points.slice(0,i+1),{renk:'accent',w:4}) +
        S.daire(...pos,6,{dolgu:'accent',renk:'accent'}) +
        S.t(pos[0],pos[1]-15,['−80 mV','≈ −50 mV','+30 mV','−80 mV'][i],centre) +
        S.ok([[22,179],[S.w-18,179]],{renk:'muted'}) + S.t(S.w/2,204,'Zaman',centre);
    },
    adimlar:[
      {ad:'İstirahat',metin:'İstirahatte zarın iç yüzü dışa göre negatiftir. [[K3 s. 170]]'},
      {ad:'Eşik',metin:'Elektriksel veya kimyasal uyaran potansiyeli önce yavaşça yaklaşık −50 mV’a getirir. [[K3 s. 170]]'},
      {ad:'Tepe',metin:'Voltaj duyarlı Na⁺ kanalları açılır, potansiyel Na⁺ denge değerine (+67 mV) yaklaşıp +30 mV’a ulaşınca kanallar kapanır. [[K3 s. 170]]'},
      {ad:'Geri dönüş',metin:'Artan K⁺ çıkışı istirahat potansiyelini geri getirir. [[K3 s. 170]] Olay 1–2 ms sürer, geçen iyon sayısı azdır ve Na⁺/K⁺ ATPaz gradiyentleri yeniden kurar. [[K3 s. 170]]'}
    ]
  });

  VIZ.a11a_blok = el => SEKIL.adim(el,{
    ...steps, baslik:'Fosfolipit zardan kanalın iç ağzına',
    ortak(S,i) {
      const channel = S.w*.73, xpos = [S.w*.27,S.w*.27,channel][i], ypos = [45,163,144][i];
      return S.t(16,22,'Hücre dışı') + S.kutu(12,70,S.w-24,54,{renk:'line',dolgu:'basic-soft'}) +
        S.t(20,103,'Fosfolipit zar') + S.kutu(channel-38,65,76,65,{yazi:'Na⁺ kanalı',renk:'basic'}) +
        S.t(16,204,'Aksoplazma') +
        (i===0 ? S.ok([[xpos,57],[xpos,72]],{renk:'accent'}) :
         i===1 ? S.ok([[xpos+25,161],[channel-24,147]],{renk:'accent'}) : '') +
        S.rozet(xpos,ypos,i===0?'B':'BH⁺',{w:50,renk:'accent'});
    },
    adimlar:[
      {ad:'Geçiş',metin:'Lipitlerde çözünen yüksüz baz (B), fosfolipit tabakadan geçer. [[K3 s. 171]]'},
      {ad:'Protonlanma',metin:'Aksoplazmada bir proton alan baz, yüklü BH⁺ biçimine dönüşür. [[K3 s. 171–172]]'},
      {ad:'Bağlanma',metin:'BH⁺ kanalın iç yüzüne tutunur ve kanalın inaktif durumdan çıkmasını engeller. [[K3 s. 171]]'}
    ]
  });

  VIZ.a11a_ph = el => SEKIL.sahne(el,{
    vb:[600,150], vbDar:[340,150], baslik:'Lidokainin yüklü ve yüksüz fraksiyonları',
    secenek:{id:'ph',ad:'Doku pH’sı',liste:[{d:'normal',ad:'pH 7,4'},{d:'asidik',ad:'pH 7,1'}]},
    ciz(S,t,p) {
      const free = p.ph==='normal'?25:14, width=S.w-48, border=24+width*free/100;
      return S.t(24,35,'B · yüksüz', {c:'b'}) + S.t(S.w-24,35,'BH⁺ · iyonize',{a:'end',c:'b'}) +
        S.kutu(24,56,border-24,35,{r:0,dolgu:'accent',renk:'accent'}) +
        S.kutu(border,56,S.w-24-border,35,{r:0,dolgu:'basic-soft',renk:'basic'}) +
        S.t(24,121,'%'+free,{c:'b'}) + S.t(S.w-24,121,'%'+(100-free),{a:'end',c:'b'});
    },
    metin:p => p.ph==='normal'?'pH 7,4’te lidokainin yaklaşık dörtte biri sinir zarını geçebilen biçimdedir. [[K3 s. 174]]':'pH 7,1’de yüksüz pay %14’e düşer ve sinire geçebilecek ilaç azalır. [[K3 s. 174]]'
  });

  const stages = ['Eksitasyon','Konvülsiyon','Yaygın depresyon'];
  VIZ.a11a_sss = el => SEKIL.adim(el,{
    ...steps, baslik:'Santral sinir sistemi toksisitesinin ilerleyişi',
    ortak:(S,i)=>stages.map((name,k)=>box(S,8+69*k,name,k===i?'crit':'basic') +
      (k<2?S.ok([ [S.w/2,52+69*k],[S.w/2,72+69*k]],{renk:'muted'}):'')).join(''),
    adimlar:[
      {ad:'Eksitasyon',metin:'İlaç beyne hızla geçer ve bifazik yanıtın ilk evresinde inhibitör internöronları bloke eder. [[K3 s. 174]] Ağız çevresinde karıncalanma, görme bozukluğu, tremor ve baş dönmesi görülebilir. [[K3 s. 174–175]]'},
      {ad:'Konvülsiyon',metin:'Başlangıçtaki eksitatör belirtileri konvülsiyonlar izler. [[K3 s. 175]]'},
      {ad:'Depresyon',metin:'Son evrede tüm santral nöronlar baskılanır, koma ve apne gelişir. [[K3 s. 175]]'}
    ]
  });

  VIZ.a11a_emilim = el => SEKIL.sahne(el,{
    vb:[600,247],vbDar:[340,247], baslik:'Enjeksiyon bölgelerine göre en yüksekten en düşüğe sistemik konsantrasyon',
    ciz(S) {
      const x=S.w*.32;
      return S.t(x-16,28,'En yüksek',{a:'end'}) + S.ok([[x,24],[x,218]],{renk:'accent'}) +
        S.t(x-16,222,'En düşük',{a:'end'}) +
        ['İnterkostal','Kaudal','Epidural','Brakiyal pleksus','Subkütan'].map((name,i)=>
          S.daire(x,24+48*i,4,{renk:'accent',dolgu:'accent'}) + S.t(x+17,30+48*i,name,{c:'b'})).join('');
    },
    metin:()=> 'İnterkostal enjeksiyondan subkütan enjeksiyona doğru beklenen sistemik konsantrasyon azalır. [[K3 s. 175]]'
  });

  VIZ.a11a_lipit = el => SEKIL.sahne(el,{
    vb:[600,208],vbDar:[340,208], baslik:'Hedef organdan lipit havuzuna',
    ciz:S=>box(S,12,'Hedef organdaki lokal anestezik','clin') +
      S.ok([ [S.w/2,59],[S.w/2,129]],{renk:'accent'}) +
      S.t(S.w/2+13,99,'Bağlanma') + box(S,137,'Lipit havuzu','accent'),
    metin:()=> 'Emülsiyon, lokal anesteziği ve lipitte iyi çözünen başka ilaçları bağlayarak hedef organdan uzaklaştırır. [[K3 s. 176]]'
  });
})();
