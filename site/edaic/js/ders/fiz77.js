/* Bölüm 77 · Metabolizma — SEKIL tabanlı etkileşimli şemalar. */
(function () {
  'use strict';
  const D77_CAP = {
  "harita": "<b>Glukoz.</b> Sitoplazmada glikolizle piruvata, mitokondride asetil-KoA'ya döner; glikoliz aerobik ve anaerobik koşulda yürür. Başka bir besine dokunun. [[K1 s. 373]]",
  "glikoliz": "<b>1 · Fosforilasyon.</b> Glukoz bir ATP harcanarak glukoz-6-fosfata, glukozun \"etkin\" biçimine döner: karaciğerde glukokinaz, öteki dokularda heksokinaz. İleri düğmesine basın. [[K1 s. 373]]",
  "laktik": "<b>Normal.</b> Dokuda oluşan laktatı karaciğer alır ve glukoneogenezde kullanır: üretim ile temizlenme dengede. Bir neden seçin. [[K1 s. 375]]",
  "krebs": "<b>Giriş.</b> Piruvat (3C), KoA-SH ve NAD⁺ ile asetil-KoA'ya (2C) döner; bir CO₂ ve bir NADH çıkar. İleri düğmesine basın. [[K1 s. 375–376]]",
  "etz": "<b>Normal (eşleşmiş).</b> NADH elektronlarını kompleks I'e, FADH₂ kompleks II'ye verir; koenzim Q III'e, sitokrom c IV'e taşır; IV elektronları O₂'ye verip su yapar. Pompalanan H⁺ kompleks V'ten dönerek ATP üretir. Durumu değiştirin. [[K1 s. 376–377]]",
  "atp": "<b>Glikoliz.</b> Bir glukoz 2 ATP, 2 piruvat ve 2 NADH verir. O₂ yoksa defter burada kapanır: 2 NADH kullanılamaz, verim 2 ATP. İleri düğmesine basın. [[K1 s. 377]]",
  "yag": "<b>1 · Lipoliz.</b> Yağ dokusundaki trigliserit lipazlarla üç serbest yağ asidine ve gliserole ayrılır; yağ asitleri albümine bağlı dolaşır, gliserol karaciğere gider. İleri düğmesine basın. [[K1 s. 378–379]]",
  "yakit": "<b>Tokluk.</b> Beyin yalnız glukoz, kalp çoğunlukla yağ asidi, eritrosit yalnız glukoz (glikoliz) kullanır; keton cisimleri yok denecek kadar azdır. Durumu değiştirin. [[K1 s. 378]]",
  "protein": "<b>Oksidatif deaminasyon.</b> Karaciğerde deaminazlar amino grubunu koparır: keto asit ve amonyak (NH₃) çıkar. Yolu değiştirin. [[K1 s. 378]]",
  "depo": "<b>Tokluk (insülin).</b> Glukoz → glukoz-6-fosfat → glukoz-1-fosfat (fosfoglukomutaz) → glikojen (glikojen sentaz); insülin bu enzimi artırır. Durumu değiştirin. [[K1 s. 380–381]]",
  "glukoneo": "<b>Laktat.</b> Kastan ve eritrositten gelen laktat karaciğerde piruvata, oradan oksaloasetata ve glukoza döner: Cori döngüsü. Başka bir öncüle dokunun. [[K1 s. 374]] [[K1 s. 380]]",
  "ppp": "<b>Normal G6PD.</b> NADP⁺ yükselince G6PD etkinleşir, glukoz-6-fosfat yola girer; NADPH glutatyonu indirger, glutatyon Hb'yi Fe²⁺ durumunda tutar. Durumu değiştirin. [[K1 s. 381]]",
  "hormon": "<b>Glukoz 4,5 mmol/L.</b> Normal aralıkta iki hormon dengede. Kaydırıcıyla glukozu değiştirin. [[K1 s. 381]]",
  "dka": "<b>1 · İnsülin yetmez.</b> Hücrelere glukoz alımı azalır, hepatik glikojenoliz ve glukoneogenez artar: plazma glukozu yükselir. İleri düğmesine basın. [[K1 s. 382]]",
  "bmh": "<b>Erişkin BMH.</b> ≈ 200 kJ m⁻² sa⁻¹ (40 kcal m⁻² sa⁻¹). Bir etken seçin ya da MET merdivenine geçin. [[K1 s. 383]]"
};
  const D77_VIZ = window.VIZ;
  const D77_RM = !!window.VIZ_YARDIM.RM;
  const D77_wrap = (s, n = 32) => (Array.isArray(s) ? s : [s]).flatMap(line => {
    const out = []; let row = '';
    String(line).split(' ').forEach(word => { if (row && (row + ' ' + word).length > n) { out.push(row); row = word; } else row += (row ? ' ' : '') + word; });
    out.push(row); return out;
  });
  const D77_box = (S, x, y, w, h, text, color = 'accent', active = true) => S.kutu(x,y,w,h,{renk:active ? color : 'line',dolgu:active ? color+'-soft' : 'paper',yazi:D77_wrap(text,Math.floor(w/9)).map(S.esc),yc:'k',lh:19,w:active?2:1});
  const D77_text = (S,x,y,text,color='ink',n=34) => S.t(x,y,D77_wrap(text,n).map(S.esc),{a:'middle',c:'k',renk:color,lh:20});
  const D77_arrow = (S,pts,t,color='basic',moving=false,extra={}) => S.ok(pts,{renk:color,...extra}) + (moving ? S.akis(pts,t,{renk:color,n:2}) : '');
  const D77_ref = (s,p) => s+' [[K1 s. '+p+']]';
  const D77_options = (names,id='d') => ({id,ad:'Görünüm',liste:names.map((ad,i)=>({d:String(i),ad}))});
  function D77_scene(el,key,names,draw,texts,height=520,motion=false) {
    return SEKIL.sahne(el,{baslik:names.join(' · '),vb:[640,height],vbDar:[360,height],secenek:D77_options(names),hareket:motion,sure:6,dongu:key!=='laktik',
      ciz:(S,t,p)=>draw(S,t,+p.d),metin:p=>+p.d===0 ? D77_CAP[key] : texts[+p.d]});
  }
  // Kitin eklediği başlığı kaldırır; kaynaklı açıklama tam olarak korunur.
  // RM'de özet adımı seçilir; kullanıcı yine bütün adımlara erişebilir.
  function D77_steps(el,key,names,texts,draw,height=560,motion=false,summary=names.length-1) {
    const caps=names.map((_,i)=>i===0?D77_CAP[key]:texts[i]);
    const clean=SEKIL.adim(el,{baslik:names.join(' · '),vb:[640,height],vbDar:[360,height],hareket:motion,oto:true,sure:6,
      adimlar:names.map((ad,i)=>({ad,metin:caps[i],ciz:(S,t)=>draw(S,t,i)}))});
    const cap=el.closest('.viz')?.querySelector('.viz-cap');
    const fix=()=>{ const b=el.querySelector('[data-i][aria-pressed="true"]'); const i=b?+b.dataset.i:0; if(cap && cap.innerHTML!==caps[i]) cap.innerHTML=caps[i]; };
    const obs=cap?new MutationObserver(fix):null;
    if(obs) obs.observe(cap,{childList:true});
    if(D77_RM) el.querySelector('[data-i="'+summary+'"]').click();
    fix();
    return ()=>{if(obs)obs.disconnect();clean();};
  }
  function D77_flow(S,t,rows,{start=20,gap=88,h=60,active=rows.length-1,motion=false,color='basic'}={}) {
    const w=S.dar?300:500,x=(S.w-w)/2;
    let out='';
    rows.forEach((row,i)=>{
      if(i) out+=D77_arrow(S,[ [S.w/2,start+(i-1)*gap+h],[S.w/2,start+i*gap-5]],t,color,motion&&i<=active,{soluk:i>active});
      out+=D77_box(S,x,start+i*gap,w,h,row,color,i<=active);
    });return out;
  }

  D77_VIZ.f77_harita=el=>D77_scene(el,'harita',['Glukoz','Yağ asidi','Amino asit','Döngü + zincir'],(S,t,i)=>{
    const paths=[['Sitoplazma: glukoz','Glikoliz → piruvat','Mitokondri: asetil-KoA'],['Yağ dokusu: yağ asidi','Mitokondri: β-oksidasyon','Asetil-KoA'],['Amino asit → deaminasyon','Keto asit → döngü / glukoz / yağ','Amino grubu → üre döngüsü → üre'],['Asetil-KoA','Sitrik asit döngüsü','NADH + FADH₂ + H⁺']];
    if(i===2){
      const a=S.w*.25,b=S.w*.75,bw=S.dar?150:245;
      let q=D77_box(S,20,20,S.w-40,75,['Amino asit','Oksidatif deaminasyon'],'clin');
      q+=D77_arrow(S,[ [S.w/2,98],[a,125],[a,145]],t,'clin');
      q+=D77_arrow(S,[ [S.w/2,98],[b,125],[b,145]],t,'clin');
      q+=D77_box(S,a-bw/2,150,bw,60,'Keto asit','clin');
      q+=D77_box(S,b-bw/2,150,bw,60,'Amino grubu','clin');
      q+=D77_arrow(S,[[a,213],[a,245]],t,'basic');
      q+=D77_arrow(S,[[b,213],[b,245]],t,'clin');
      q+=D77_box(S,a-bw/2,250,bw,110,['Döngü / glukoz / yağ asidi'],'basic');
      q+=D77_box(S,b-bw/2,250,bw,110,['Üre döngüsü → üre'],'clin');
      q+=D77_text(S,S.w/2,420,['Döngü → NADH ve FADH₂','→ elektron taşıma zinciri','O₂ → H₂O · H⁺ dönüşü → ATP']);
      return q+D77_text(S,S.w/2,535,['Ara taşıyıcılar: NAD⁺ ve FAD','Son elektron alıcısı: O₂']);
    }
    let out=D77_flow(S,t,paths[i],{gap:85,color:['accent','warn','clin','basic'][i]});
    out+=D77_flow(S,t,i===3?['İç zar: elektron taşıma zinciri','H⁺ gradyanı → ATP sentaz','O₂ → H₂O · ATP üretimi']:['Sitrik asit döngüsü → NADH, FADH₂','İç zar: elektron taşıma zinciri','O₂ → H₂O · H⁺ dönüşü → ATP'],{start:285,gap:80,h:58});
    return out+D77_text(S,S.w/2,550,['Ara taşıyıcılar: NAD⁺ ve FAD','Son elektron alıcısı: O₂']);
  },[null,D77_ref('Lipolizden gelen yağ asidi mitokondride asetil-KoA olur.','373'),D77_ref('Keto asit enerjiye veya senteze; amino grubu üreye gider.','373'),D77_ref('Döngünün taşıyıcıları zincire elektron verir; H⁺ gradyanı ATP yapımını sağlar.','373')],590);

  D77_VIZ.f77_glikoliz=el=>D77_steps(el,'glikoliz',['Fosforilasyon','Gradyan','Bölünme','NADH','ATP kazancı','Aerobik','Anaerobik'],[
    null,D77_ref('Fosforilasyon serbest hücre içi glukozu düşük tutar; glukoz girişi sürer. G6P glikojenden de gelir.','373'),D77_ref('Bir ATP daha harcanır; altı karbon iki üç karbonlu parçaya ayrılır. G6P–piruvat arasında yedi ara ürün vardır.','374'),D77_ref('İki NADH oluşur. 1,3-BPG’den 2,3-DPG yolu ayrılır; 2,3-DPG Hb’den O₂ bırakılmasını kolaylaştırır.','375'),D77_ref('Dört ATP kazanılır, iki ATP harcanır: net 2 ATP, 2 NADH ve 2 piruvat. O₂ tüketilmez, CO₂ çıkmaz.','374'),D77_ref('Elektronlar mitokondriye aktarılır ve NAD⁺ yenilenir; piruvat asetil-KoA üzerinden döngüye girer.','374–375'),D77_ref('LDH piruvatı laktata indirgerken NADH → NAD⁺ olur. Laktat yeniden piruvata veya karaciğerde glukoza dönüşebilir (Cori döngüsü).','374')],(S,t,i)=>{
    const spend=i<2?1:2,gain=i<4?0:4;
    let out=D77_text(S,S.w/2,24,'Sitoplazma · glikoliz','accent');
    out+=D77_flow(S,t,['Glukoz · 6C','Glukoz-6-fosfat · 6C','2 × gliseraldehit-3-fosfat · 3C','2 × 1,3-bisfosfogliserat · 3C','2 × piruvat · 3C'],{start:45,gap:76,h:50,active:[1,1,2,3,4,4,4][i],motion:true,color:'accent'});
    out+=D77_box(S,20,430,S.w-40,62,['ATP: −'+spend+' harcanan / +'+gain+' kazanılan','Net: '+(gain-spend)+' ATP · NADH: '+(i<3?0:2)],'ok');
    const notes=[['ATP → ADP','Karaciğer: glukokinaz','Öteki dokular: heksokinaz'],['Dışarıda glukoz → hücre içine','Glukoz → G6P: gradyan korunur','Glikojen fosforilaz → G6P','G6P → pentoz fosfat yolu'],['ATP → ADP (ikinci harcama)','6C → 2 × 3C'],['2 NAD⁺ → 2 NADH + 2 H⁺','PO₂ ↓ → fosfofruktokinaz ↑','Glikoliz ↑ → 2,3-DPG ↑','1,3-BPG → 2,3-DPG','Hb’den O₂ bırakılması ↑'],['4 ADP → 4 ATP','Aerobik: mitokondriye','Anaerobik: LDH → laktat'],['Piruvat → asetil-KoA → döngü','NADH elektronları → mitokondri','Sitoplazmada NAD⁺ yenilenir'],['Piruvat → laktat (LDH)','NADH → NAD⁺ → glikoliz sürer','Laktat → piruvat / Cori → glukoz']];
    out+=D77_box(S,20,525,S.w-40,95,notes[i],i===6?'warn':'basic');
    out+=D77_arrow(S,[ [S.w/2,400],[S.w/2,420]],t,'ok',i===4);
    if(i===6)out+=D77_arrow(S,[[20,560],[10,560],[10,150],[25,150]],t,'basic',true);
    return out;
  },640,true,4);

  D77_VIZ.f77_laktik=el=>D77_scene(el,'laktik',['Normal','O₂ sunumu ↓','Temizlenme ↓','Siyanür'],(S,t,i)=>{
    let out=D77_box(S,30,20,S.w-60,85,['Dokular: glikoliz → laktat',i===1?'O₂ sunumu ↓ · mitokondri yavaş':i===3?'O₂ var · kompleks IV ×':'O₂ → çalışan mitokondri'],i===1||i===3?'crit':'accent');
    const inPath=[ [S.w/2,108],[S.w/2,155]],outPath=[ [S.w/2,270],[S.w/2,320]];
    out+=D77_arrow(S,inPath,t,'clin',true,{w:i===1||i===3?5:2});
    out+=S.kutu(S.w/2-85,165,170,100,{renk:'clin'});
    const level=i===0?22:35+45*Math.min(t/6,1);
    out+=S.kutu(S.w/2-80,260-level,160,level,{dolgu:'clin-soft',renk:'clin'});
    out+=D77_text(S,S.w/2,190,['Kan laktatı',i===0?'Dengeli':'Birikiyor']);
    out+=D77_arrow(S,outPath,t,'basic',true,{w:i===2?1:3});
    out+=D77_box(S,30,325,S.w-60,85,['Karaciğer ve böbrek','Laktat → glukoz',i===2?'İşlev kaybı / metformin → alım ↓':'Glukoneogenez → temizlenme'],'basic');
    out+=D77_text(S,S.w/2,443,i===1?['İskemi, kardiyak arrest, ağır şok']:i===3?['Siyanür: O₂ kullanılamaz']:i===2?['Üretim normal olsa da birikir']:['Üretim = temizlenme']);
    return out+D77_text(S,S.w/2,485,['Tedavi: nedeni düzelt','Cerrahi, O₂, sıvı, inotrop,','hemofiltrasyon; bikarbonat nadiren.']);
  },[null,D77_ref('İskemi, kardiyak arrest veya ağır şokta laktat üretimi temizlenmeyi aşar.','375'),D77_ref('Karaciğer/böbrek işlev kaybı veya metforminle azalan hepatik glukoneogenez laktat temizlenmesini azaltır.','375'),D77_ref('Siyanür zinciri bloke eder: O₂ sunulsa bile kullanılamaz (sitotoksik hipoksi).','375')],550,true);

  D77_VIZ.f77_krebs=el=>D77_steps(el,'krebs',['Giriş','Sitrat','6C → 5C','5C → 4C','4C yolu','Tur özeti'],[null,D77_ref('Asetil-KoA (2C) + oksaloasetat (4C) → sitrat (6C); KoA-SH serbest kalır.','375'),D77_ref('Sitrat → izositrat → α-ketoglutarat: bir NADH ve bir CO₂ oluşur.','375'),D77_ref('α-ketoglutarat + KoA-SH → süksinil-KoA: bir NADH ve bir CO₂ daha oluşur.','375'),D77_ref('Süksinil-KoA’dan oksaloasetata dek CO₂ çıkmaz; birer ATP, FADH₂ ve NADH oluşur.','375'),D77_ref('Asetil başına 3 NADH, 1 FADH₂, 1 ATP, 2 CO₂. Döngü O₂ tüketmez; taşıyıcıların yenilenmesi O₂’ye bağlıdır.','375')],(S,t,i)=>{
    // Dikdörtgen halka: sekiz tam ad için mobilde ayrı satırlar.
    const x1=S.dar?85:170,x2=S.w-x1, ys=[175,255,335,415];
    const nodes=[['Sitrat · 6C',S.w/2,100],['İzositrat · 6C',x2,175],['α-ketoglutarat','5C',x2,255],['Süksinil-KoA · 4C',x2,335],['Süksinat · 4C',S.w/2,415],['Fumarat · 4C',x1,335],['Malat · 4C',x1,255],['Oksaloasetat','4C',x1,175]];
    const pos=nodes.map(n=>n.slice(-2));
    let out=D77_text(S,S.w/2,22,['Giriş: piruvat (3C) → asetil-KoA (2C)','KoA-SH + NAD⁺ → NADH + H⁺ + CO₂']);
    const active=i===0?[]:i===1?[7,0]:i===2?[0,1,2]:i===3?[2,3]:i===4?[3,4,5,6,7]:[0,1,2,3,4,5,6,7];
    for(let k=0;k<8;k++){
      const a=pos[k],b=pos[(k+1)%8],dx=b[0]-a[0],dy=b[1]-a[1];
      const pts=[[a[0]+dx*.32,a[1]+dy*.32],[a[0]+dx*.68,a[1]+dy*.68]];
      out+=D77_arrow(S,pts,t,'basic',i>0&&active.includes(k),{soluk:!active.includes(k)});
    }
    nodes.forEach((n,k)=>out+=D77_box(S,pos[k][0]-76,pos[k][1]-26,152,52,n.slice(0,-2),'basic',active.includes(k)));
    const products=[['Giriş (döngü dışında)','1 NADH + 1 CO₂'],['2C + 4C → 6C','KoA-SH serbest'],['İzositrat → α-ketoglutarat','+ NADH + CO₂'],['α-ketoglutarat → süksinil-KoA','+ NADH + CO₂'],['Süksinil-KoA → süksinat: ATP','Süksinat → fumarat: FADH₂','Malat → oksaloasetat: NADH'],['Yalnız döngü: 3 NADH · 1 FADH₂','1 ATP · 2 CO₂']];
    out+=D77_box(S,20,465,S.w-40,88,products[i],'ok');
    const count=[[0,0,0,0],[0,0,0,0],[1,0,0,1],[2,0,0,2],[3,1,1,2],[3,1,1,2]][i];
    out+=D77_text(S,S.w/2,580,['Döngü sayacı: NADH '+count[0]+' · FADH₂ '+count[1],'ATP '+count[2]+' · CO₂ '+count[3]]);
    return out+D77_text(S,S.w/2,635,['Mitokondriyal PO₂ < 0,4 kPa','→ döngü durur'],'crit');
  },675,true);

  D77_VIZ.f77_etz=el=>D77_scene(el,'etz',['Normal','Siyanür','Ayrışma'],(S,t,i)=>{
    const W=S.w, x=[W*.13,W*.35,W*.58,W*.82];
    let out=S.cizgi([[20,36],[W-20,36]],{renk:'line'})+D77_text(S,W/2,25,'Dış zar');
    out+=D77_text(S,W/2,70,'Zarlar arası boşluk · H⁺');
    for(let k=0;k<(i===1?2:9);k++)out+=S.daire(25+k*(W-50)/9,92,3,{dolgu:'warn',renk:'warn'});
    out+=S.kutu(15,140,W-30,55,{dolgu:'accent-soft',renk:'line'});
    out+=S.kutu(15,330,W-30,55,{dolgu:'accent-soft',renk:'line'});
    out+=D77_text(S,W/2,230,'Matriks · NADH → NAD⁺ (I)');
    const ep=[[x[0]+25,165],[x[1],165],[x[2],165],[x[3],165],[W-10,165],[W-10,307],[x[1],307],[x[1],330]];
    out+=D77_arrow(S,ep,t,'basic',i!==1);
    out+=D77_arrow(S,[[x[0],257],[x[0],213],[x[1],213],[x[1],190]],t,'basic',i!==1);
    out+=D77_text(S,x[0]+20,320,'FADH₂ → FAD','basic',20);
    [[x[0],140,82],[x[2],140,82],[x[1],385,430]].forEach(([xx,yy,end])=>out+=D77_arrow(S,[[xx,yy],[xx,end]],t,'warn',i!==1,{soluk:i===1}));
    out+=D77_arrow(S,[[x[2],405],[x[2],310]],t,'warn',i===0,{soluk:i!==0});
    [[x[0],165,'I'],[x[1],165,'Q'],[x[2],165,'III'],[x[3],165,'sit. c'],[x[0],280,'II'],[x[1],355,'IV'],[x[2],355,'V']].forEach(([xx,yy,n])=>out+=D77_box(S,xx-24,yy-23,48,46,n,'basic'));
    out+=D77_text(S,x[0]+6,412,'Zarlar arası','warn',14);
    out+=S.daire(x[2],420,13,{renk:'ok',dolgu:'ok-soft'});
    const phase=D77_RM||i===1?0:t*(i===2?.3:2);
    for(let k=0;k<3;k++){const a=phase+k*Math.PI*2/3;out+=S.cizgi([[x[2],420],[x[2]+Math.cos(a)*11,420+Math.sin(a)*11]],{renk:'ok'});}
    if(i===1)out+=D77_text(S,x[1],360,'×','crit')+D77_text(S,W/2,470,['CN⁻ → hem (IV)','Elektron akışı / H⁺ pompası durur','ATP üretimi durur'],'crit');
    else if(i===2){out+=D77_arrow(S,[[x[3],410],[x[3],310]],t,'warn',true);out+=D77_text(S,W/2,470,['Ayrıştırıcı kanal: H⁺ → matriks','V atlanır → enerji ısıya döner','Kahverengi yağ · yenidoğan'],'warn');}
    else out+=D77_text(S,W/2,470,['IV: ½O₂ + 2H⁺ + 2e⁻ → H₂O','V (ATP sentaz): ADP + Pᵢ → ATP'],'ok');
    out+=D77_text(S,W/2,560,['NADH → 3 ATP · FADH₂ → 1 ATP','Kitabın dönüşüm katsayıları']);
    return out;
  },[null,D77_ref('Siyanür kompleks IV’ün hem grubuna bağlanır; elektron akışı, proton pompalama ve ATP yapımı durur.','376'),D77_ref('Kahverengi yağda H⁺ kompleks V’i atlayarak matrikse döner; oksidasyon ile fosforilasyon ayrışır, enerji ısıya dönüşür.','377')],605,true);

  D77_VIZ.f77_atp=el=>D77_steps(el,'atp',['Glikoliz','Piruvat → asetil-KoA','Döngü ×2','Zincir'],[null,D77_ref('İki piruvatın her biri bir NADH verir: toplam NADH 4 olur.','377'),D77_ref('İki tur sonunda toplam 4 ATP, 10 NADH ve 2 FADH₂ vardır.','377–378'),D77_ref('10 × 3 + 2 × 1 + 4 = 36 ATP; kitabın katsayılarıyla aerobik verim anaerobiğin 18 katıdır.','378')],(S,t,i)=>{
    let out=D77_flow(S,t,['Glikoliz: +2 ATP, +2 NADH','Piruvat → asetil-KoA: +2 NADH','Döngü ×2: +2 ATP, +6 NADH, +2 FADH₂','Zincir: 10 × 3 + 2 × 1 = 32 ATP'],{gap:80,h:58,active:i});
    const atp=[2,2,4,36][i];
    out+=D77_box(S,20,355,S.w-40,70,['Defter: '+[2,2,4,4][i]+' doğrudan ATP','NADH '+[2,4,10,10][i]+' · FADH₂ '+[0,0,2,2][i]],'basic');
    out+=D77_text(S,S.w/2,460,'Toplam ATP: '+atp,'ok');
    out+=S.kutu(30,480,S.w-60,24,{dolgu:'paper'});
    out+=S.kutu(30,480,(S.w-60)*atp/36,24,{dolgu:'ok',renk:'ok'});
    return out+D77_text(S,S.w/2,535,['Anaerobik: 2 · Aerobik: 36','Taşıyıcılar zincirde ATP’ye çevrilir.']);
  },580);

  D77_VIZ.f77_yag=el=>D77_steps(el,'yag',['Lipoliz','Gliserol','Kısa / orta zincir','Karnitin mekiği','β-oksidasyon'],[null,D77_ref('Gliserol karaciğerde glukoneogenezle glukoza döner; glukoz hücrelerde ATP için kullanılır.','378'),D77_ref('Kısa ve orta zincirli yağ asitleri mitokondriye yardımsız girer.','378'),D77_ref('Uzun zincirli yağ asidi açil-KoA olarak etkinleşir, açil-karnitin biçiminde iç zarı geçer; matrikste açil-KoA yeniden oluşur. Karnitin geri döner.','378–379'),D77_ref('12C yağ asidi beş turda 6 asetil-KoA, 5 NADH ve 5 FADH₂ verir; son 4C parçası iki asetil-KoA’ya ayrılır.','378–379')],(S,t,i)=>{
    const paths=[['Yağ dokusu: trigliserit','Lipaz → 3 yağ asidi + gliserol','Dolaşım → dokular / karaciğer'],['Gliserol → karaciğer','Glukoneogenez → glukoz','Dolaşım → hücrelerde ATP'],['Kısa / orta zincirli yağ asidi','Mitokondri zarlarından geçiş','Matriks → β-oksidasyon'],['Uzun zincir + KoA → açil-KoA','Karnitin → açil-karnitin','İç zar: özgül taşıyıcı','Matriks: yeniden açil-KoA','Karnitin → geri dönüş']];
    let out='';
    if(i<4)out=D77_flow(S,t,paths[i],{gap:82,h:58,motion:true,color:'warn'});
    else {
      const turn=D77_RM?5:Math.min(5,Math.floor(t)+1),left=12-turn*2;
      out+=D77_text(S,S.w/2,25,'12 karbonlu yağ asidi','warn');
      for(let k=0;k<12;k++) {const col=k<turn*2?'basic':'warn',xx=38+(k%6)*48,yy=75+Math.floor(k/6)*55;out+=S.daire(S.w/2-180+xx,yy,15,{renk:col,dolgu:col+'-soft'});}
      out+=D77_text(S,S.w/2,185,['Tur: '+turn+' / 5','Asetil-KoA: '+(turn===5?6:turn),'NADH: '+turn+' · FADH₂: '+turn]);
      out+=D77_box(S,25,270,S.w-50,90,turn===5?['Son 4C → iki asetil-KoA','Toplam: 6 asetil-KoA']:['Kalan zincir: '+left+'C','Her tur: FAD → FADH₂','NAD⁺ → NADH'],'basic');
      out+=D77_text(S,S.w/2,400,['Döngü + zincir: ≈ 100 ATP','Yaklaşık, klasik hesap (Atlas notu)']);
    }
    return out+D77_box(S,20,465,S.w-40,70,['Eşit kütlede yağ:','Karbonhidrat / proteinin > 2 katı ATP'],'ok');
  },555,true);

  D77_VIZ.f77_yakit=el=>D77_scene(el,'yakit',['Tokluk','Açlık','Uzun açlık','DKA'],(S,t,i)=>{
    let out=D77_box(S,20,20,S.w-40,115,['Karaciğer: asetil-KoA ×2 → ketonlar','Aseton · asetoasetik asit','β-hidroksibütirik asit',i===0?'Üretim çok az':i===3?'Patolojik keton artışı':'Keton üretimi ↑'],'basic');
    const organs=[['Beyin',i===2?['Glukoz','Keton: %70’e dek']:i===0?['Glukoz','Yağ asidi kullanmaz']:['Glukoz + keton','Yağ asidi kullanmaz']],['Kalp',i===0?['Çoğunlukla yağ asidi','Glukoz da kullanır']:['Yağ asidi + keton','Glukoz da kullanır']],['Eritrosit',['Yalnız glukoz → glikoliz','Mitokondri yok; yağ / keton yok']]];
    organs.forEach(([ad,lines],k)=>{
      const y=165+k*130;
      if(k===2){out+=D77_box(S,20,y,S.w-40,105,[ad,...lines],'crit');return;}
      out+=S.kutu(20,y,S.w-40,115,{renk:'accent'});
      out+=D77_text(S,S.w/2,y+22,ad+(k===0&&i===2?' · keton %70’e dek':''),'accent');
      const values=k===0?(i===0?[1,0,0]:i===2?[.3,0,.7]:[.6,0,.4]):(i===0?[.35,.8,.03]:[.2,.7,.4]);
      ['Glukoz','Yağ asidi','Keton'].forEach((fuel,j)=>{
        out+=S.t(30,y+45+j*26,fuel,{c:'k'});
        out+=S.kutu(130,y+32+j*26,S.w-165,12,{dolgu:'paper'});
        if(values[j])out+=S.kutu(130,y+32+j*26,(S.w-165)*values[j],12,{dolgu:['accent','warn','basic'][j],renk:['accent','warn','basic'][j]});
      });
    });
    return out+D77_text(S,S.w/2,575,i===3?['Kan glukozu ↑; GLUT-4 ile alım ↓','Karaciğer keton yapar, kullanamaz.']:['Karaciğer keton yapar, kullanamaz.']);
  },[null,D77_ref('Açlıkta β-oksidasyon ve asetil-KoA artar, keton üretimi açılır; kalp ve beyin ketona yönelir.','378'),D77_ref('Uzun açlıkta beynin enerji gereksiniminin %70’e kadarı ketonlardan karşılanabilir.','378'),D77_ref('DKA’da insüline bağımlı glukoz alımı azalır, yağ kullanımı ve keton üretimi artar.','378')],635);

  D77_VIZ.f77_protein=el=>D77_scene(el,'protein',['Deaminasyon','Transaminasyon','Böbrekte glutamat'],(S,t,i)=>{
    const rows=[['Protein → amino asitler','Karaciğer: deaminaz','Keto asit + NH₃ (toksik)','NH₃ → üre döngüsü → üre','Her üre için 3 ATP harcanır'],['Amino asit + keto asit','Aminotransferaz: NH₂ aktarılır','Yeni amino asit + yeni keto asit'],['Böbrekte glutamat','Deaminasyon → NH₃','Doğrudan idrarla atılım','Üre döngüsü için ATP harcanmaz']];
    let out='';
    if(i===0){
      out=D77_flow(S,t,rows[i].slice(0,2),{gap:80,h:55,color:'clin'});
      const a=S.w*.25,b=S.w*.75,bw=S.dar?150:245;
      out+=D77_arrow(S,[ [S.w/2,158],[a,185],[a,205]],t,'clin');
      out+=D77_arrow(S,[ [S.w/2,158],[b,185],[b,205]],t,'crit');
      out+=D77_box(S,a-bw/2,210,bw,60,'Keto asit','clin');
      out+=D77_box(S,b-bw/2,210,bw,60,'NH₃ · toksik','crit');
      out+=D77_arrow(S,[[a,273],[a,300]],t,'clin');
      out+=D77_arrow(S,[[b,273],[b,300]],t,'crit');
      out+=D77_box(S,a-bw/2,305,bw,145,['Döngü: enerji','Glukoneogenez','Amino asit / yağ asidi'],'clin');
      out+=D77_box(S,b-bw/2,305,bw,145,['Üre (ornitin) döngüsü','3 ATP / üre','→ Üre'],'crit');
    }else out=D77_flow(S,t,rows[i],{gap:75,h:52,color:'clin'});
    if(i===1)out+=D77_box(S,20,270,S.w-40,175,['9 esansiyel: besinle gelmeli','Fenilalanin · valin · treonin','Triptofan · izolösin · metiyonin','Lösin · lizin · histidin'],'clin');
    return out+D77_text(S,S.w/2,495,['Enerji eşdeğeri: 1,75 g protein','≈ 1 g karbonhidrat']);
  },[null,D77_ref('Aminotransferazlar amino grubunu aktarır. Dokuz esansiyel amino asit besinle gelmelidir.','378–380'),D77_ref('Böbrekte glutamatın deaminasyonundan gelen NH₃ doğrudan idrara atılır.','378')],540);

  D77_VIZ.f77_depo=el=>D77_scene(el,'depo',['Tokluk (insülin)','Glukoz düşük'],(S,t,i)=>{
    let out='';
    ['Karaciğer: ≈ 100 g · ≈ 24 sa','Kas: ≈ 200 g · yalnız kas içi'].forEach((title,k)=>{
      const y=20+k*260;
      out+=S.kutu(15,y,S.w-30,235,{renk:'basic',dolgu:'basic-soft'});
      out+=D77_text(S,S.w/2,y+25,title,'basic');
      const rows=i===0?['Glukoz → G6P → G1P','Glikojen sentaz → glikojen']:['Glikojen → G1P → G6P','Glikojen fosforilaz'];
      out+=D77_box(S,30,y+45,S.w-60,70,rows,'accent');
      out+=D77_arrow(S,[ [S.w/2,y+118],[S.w/2,y+145]],t,'accent',i===1,{soluk:i===0});
      if(i===1&&k===1)out+=D77_text(S,S.w/2,y+215,'Adrenalin · büyüme hormonu');
      out+=D77_text(S,S.w/2,y+165,k===0?['G6P → glukoz-6-fosfataz','→ glukoz → kan']:['G6P → glikoliz / pentoz fosfat','Glukoz-6-fosfataz yok → kana çıkış ×']);
    });
    return out+D77_text(S,S.w/2,565,['G6P ⇄ G1P: fosfoglukomutaz',i===0?'İnsülin → glikojen sentaz ↑':'Karaciğer: glukagon + adrenalin','G6P: glukoz-6-fosfat','G1P: glukoz-1-fosfat']);
  },[null,D77_ref('Glikojenoliz G6P sağlar. Karaciğer kana glukoz verir; kas, glukoz-6-fosfataz bulunmadığından kendi glikojenini yerel kullanır.','380–381')],660,true);

  D77_VIZ.f77_glukoneo=el=>D77_scene(el,'glukoneo',['Laktat','Piruvat','Gliserol','Amino asitler','Döngü ara ürünleri'],(S,t,i)=>{
    const rows=[['Kas / eritrosit → laktat','Piruvat','Oksaloasetat · 4C'],['Piruvat','Oksaloasetat · 4C'],['Yağ dokusu: lipoliz → gliserol','Yola daha aşağıdan giriş'],['Kas proteini → amino asitler','Keto asit → döngü','Oksaloasetat · 4C'],['Döngü ara ürünleri','Oksaloasetat · 4C']];
    let out=D77_text(S,S.w/2,24,'Karaciğer · böbrek az katkı sağlar');
    out+=D77_flow(S,t,[...rows[i],'Ayrı sentez yolu → glukoz','Kan → glukoz kullanan dokular'],{start:50,gap:78,h:55,color:'accent'});
    return out+D77_text(S,S.w/2,470,['Glukagon (+) · metformin (−)','Enerji harcanır; glikolizin tersi değil.','Beyin çoğunlukla, eritrosit tamamen','glukoza bağımlıdır.']);
  },[null,D77_ref('Piruvat oksaloasetata çevrilerek yola girer.','380'),D77_ref('Lipolizden gelen gliserol glukoza çevrilir; oksaloasetattan sonraki basamaklara katılır.','378–380'),D77_ref('Glukojenik amino asitlerin karbon iskeleti glukoz sentezine katılır.','378–380'),D77_ref('Sitrik asit döngüsü ara ürünleri oksaloasetat üzerinden katkı verir.','380')],570);

  D77_VIZ.f77_ppp=el=>D77_scene(el,'ppp',['Normal G6PD','G6PD eksikliği'],(S,t,i)=>{
    let out=D77_flow(S,t,['Glukoz-6-fosfat',i?'G6PD × → yolun etkinliği ↓':'G6PD · NADP⁺ ↑ → etkinlik ↑','Pentoz fosfat yolu'],{gap:80,h:55,color:i?'crit':'accent'});
    out+=D77_box(S,20,275,S.w-40,65,['Pentoz şekerler → nükleik asit','NADPH: hücrenin ≈ %60’ı'],'basic',!i);
    out+=D77_arrow(S,[ [S.w/2,342],[S.w/2,365]],t,'basic');
    out+=D77_box(S,20,370,S.w-40,65,i?['NADPH ↓ · indirgenmiş glutatyon ↓','İndirgeme gücü azalır']:['NADPH → indirgenmiş glutatyon','Reaktif oksijen hasarına karşı koruma'],'basic',!i);
    out+=D77_arrow(S,[ [S.w/2,437],[S.w/2,460]],t,'basic');
    out+=D77_box(S,20,465,S.w-40,65,i?['Hb Fe³⁺ · metHb’ye yatkınlık']:['Hb Fe²⁺ durumunun korunması'],'crit',!!i);
    return out+D77_text(S,S.w/2,565,'G6P’nin diğer yolu: glikoliz');
  },[null,D77_ref('G6PD eksikliğinde NADPH ve indirgeme gücü azalır; metHb oluşumuna yatkınlık doğar.','381')],595);

  D77_VIZ.f77_hormon=el=>SEKIL.sahne(el,{baslik:'Glukoz, insülin ve glukagon',vb:[640,800],vbDar:[360,800],param:[{id:'g',ad:'Plazma glukozu',min:2,max:12,adim:.5,deger:4.5,birim:'mmol/L'}],ciz:(S,t,p)=>{
    const w=S.w-60,X=g=>30+(g-2)/10*w,hi=p.g>5.5,lo=p.g<3.5;
    let out=D77_text(S,S.w/2,25,'Plazma glukozu (mmol/L)');
    out+=S.kutu(30,50,w,24,{dolgu:'paper'});
    out+=S.kutu(X(3.5),50,X(5.5)-X(3.5),24,{dolgu:'ok-soft',renk:'ok'});
    out+=S.cizgi([[X(p.g),42],[X(p.g),82]],{renk:'accent',w:3});
    out+=D77_text(S,S.w/2,110,'Normal aralık: 3,5–5,5','ok');
    const ins=S.clamp((p.g-3)/7,.05,1),glu=S.clamp((6-p.g)/4,.05,1);
    [['β → insülin',ins,'accent'],['α → glukagon',glu,'warn']].forEach(([ad,v,c],k)=>{let x=S.w/2-130+k*150;out+=S.kutu(x,140,110,100,{dolgu:'paper'});out+=S.kutu(x,240-v*100,110,v*100,{dolgu:c+'-soft',renk:c});out+=D77_text(S,x+55,265,ad,c);});
    out+=D77_box(S,20,295,S.w-40,100,['Kas / yağ / kalp: GLUT-4',hi?'Glukoz alımı ↑; K⁺ ve amino asit alımı ↑':lo?'İnsülin etkisi ve glukoz alımı azalır':'İnsüline bağımlı glukoz alımı',hi?'Yağ dokusunda esterleşme ↑':''],'accent');
    out+=D77_box(S,20,420,S.w-40,100,['Karaciğer: GLUT-2 (bağımsız)',hi?'Glikojenez / yağ asidi sentezi ↑':lo?'Glukoneogenez / glikojenoliz ↑':'Glukoz dengesine katkı',hi?'Glukoneogenez / glikojenoliz ↓':lo?'Hepatik glikoliz ↓':''],'basic');
    out+=D77_box(S,20,545,S.w-40,55,['Beyin: GLUT-1','İnsülinden bağımsız'],'clin');
    return out+D77_text(S,S.w/2,635,['İnsülin: proinsülin → C-peptit kesilir','İki evreli salınım','α2 (−) baskın; β2 (+) (kitap)',hi?'Lipoliz ↓':'','Glukagonu baskılar: insülin,','somatostatin, yağ asidi ve keton ↑']);
  },metin:p=>{
    const g=p.g.toFixed(1).replace('.',',');
    if(p.g>=3.5&&p.g<=5.5)return '<b>Glukoz '+g+' mmol/L.</b> Normal aralıkta iki hormon dengede. Kaydırıcıyla glukozu değiştirin. [[K1 s. 381]]';
    return D77_ref('<b>Glukoz '+g+' mmol/L.</b> '+(p.g>5.5?'İnsülin glukoz alımını ve depolamayı artırır; endojen glukoz yapımını baskılar. K⁺ ve amino asitler de hücreye girer.':'Hipoglisemi otonom etkinlik ve glukagon salınımını artırır; hepatik glukoneogenez ve glikojenoliz artar.'),'382–383');
  }});

  D77_VIZ.f77_dka=el=>D77_steps(el,'dka',['İnsülin yetmez','Ketoz','Ozmotik diürez','Asidoz','Paradoks'],[null,D77_ref('Lipoliz ve β-oksidasyon artar; karaciğerde biriken asetil-KoA keton üretimine yönelir.','382'),D77_ref('Hiperglisemi ozmotik diürezle hipovolemi ve renal elektrolit kaybı yapar; hipokalemi gelişebilir.','382'),D77_ref('Ketonlar asidemi yapar; karotis cisimleri ve solunum merkezi üzerinden soluk hacmi artar (Kussmaul). Ağır hipovolemide laktik asit de asidoza katkı verir.','382'),D77_ref('Kan glukozu yüksek olsa da insüline bağımlı GLUT-4 aracılı alım azalır.','382')],(S,t,i)=>{
    let out=D77_box(S,20,15,S.w-40,85,['İnsülin ↓ → alım ↓','Glikojenoliz + glukoneogenez ↑','→ Hiperglisemi'],'crit');
    if(i>=1)out+=D77_box(S,20,125,S.w-40,80,['Lipoliz + β-oksidasyon ↑','Asetil-KoA ↑ → ketonlar'],'warn')+D77_arrow(S,[ [S.w/2,102],[S.w/2,120]],t,'warn');
    if(i>=2)out+=D77_box(S,20,230,S.w-40,80,['Hiperglisemi → ozmotik diürez','Hipovolemi + renal elektrolit kaybı','K⁺ kaybı → hipokalemi olabilir'],'crit');
    if(i>=3)out+=D77_box(S,20,335,S.w-40,110,['Ketonlar → asidemi','Karotis cisimleri → solunum merkezi','VT ↑ → Kussmaul solunumu','Ağır hipovolemi → laktik asit ↑'],'crit');
    if(i>=4)out+=D77_box(S,20,475,S.w-40,90,['Kanda glukoz ↑','GLUT-4 ile hücreye giriş ↓','İnsüline bağımlı dokuda glukoz açlığı'],'accent');
    if(i>=2)out+=D77_arrow(S,[[20,70],[9,70],[9,270],[20,270]],t,'crit');
    if(i>=3){out+=D77_arrow(S,[ [S.w-20,165],[S.w-9,165],[S.w-9,390],[S.w-20,390]],t,'warn');out+=D77_arrow(S,[ [S.w/2,312],[S.w/2,332]],t,'crit',false,{kesik:true});}
    return out+D77_text(S,S.w/2,610,['Tip 1: β-hücresi otoimmün yıkımı','Akut hastalık / tedaviye uyumsuzluk']);
  },660);

  const D77_FACTORS=[['Erişkin BMH','Dinlenme, rahat ortam; yemekten 12 sa sonra.'],['Egzersiz','Enerji harcaması artar.'],['Katekolamin / stres','Metabolik hız artar.'],['Hipertiroidi','Tiroit hormonları bazal hızın ana düzenleyicisidir; hız artar.'],['Gebelik / emzirme','Gebelikte ≈ %20 artış; emzirirken süt yapımı enerji gerektirir.'],['Sıcaklık / ateş','Yüksek veya düşük ortam sıcaklığı ve ateş hızı artırır.'],['Yemek','Büyük yemekten sonra 6 sa artış; başlıca hepatik deaminasyon.'],['Çocukluk','Yenidoğanda erişkinin ≈ 2 katı.'],['Hipotiroidi','Bazal hız azalır.'],['Açlık','Yağ ve protein depolarını korumak için hız azalır.'],['Yaş','Her on yılda ≈ %2 azalır.'],['MET merdiveni','4 MET altı zayıf rezerv ve artmış perioperatif kardiyak riskle ilişkilidir.']];
  D77_VIZ.f77_bmh=el=>D77_scene(el,'bmh',D77_FACTORS.map(x=>x[0]),(S,t,i)=>{
    if(i===11){let out=D77_text(S,S.w/2,25,'MET = BMH’nin katı');[[10,'Ağır egzersiz'],[8,'Hafif koşu'],[4,'Durmadan iki kat merdiven'],[3,'Düz yolda orta hızda yürüme'],[1,'Uyanık dinlenme; > 12 sa aç']].forEach(([n,ad],k)=>{out+=D77_box(S,20,55+k*85,S.w-40,65,[n+' MET',ad],n<4?'crit':'basic');});return out+D77_text(S,S.w/2,510,['< 4 MET: zayıf fizyolojik rezerv','Perioperatif kardiyak olay riski ↑'],'crit');}
    let out=D77_box(S,20,20,S.w-40,130,['Erişkin BMH (kitap değerleri)','≈ 200 kJ m⁻² sa⁻¹','40 kcal m⁻² sa⁻¹','Dinlenme · yemekten 12 sa sonra'],'basic');
    out+=D77_box(S,20,180,S.w-40,105,[D77_FACTORS[i][0],D77_FACTORS[i][1]],i>7?'basic':'warn');
    out+=D77_text(S,S.w/2,330,['Artırır: egzersiz, katekolamin,','hipertiroidi, gebelik / emzirme,','ısı değişimi / ateş, yemek, çocukluk'],'warn');
    out+=D77_text(S,S.w/2,420,['Azaltır: hipotiroidi, açlık, yaş'],'basic');
    return out+D77_text(S,S.w/2,475,['Yaş ve yüzey alanına göre düzeltilir.','Yağsız kütleyle düzeltildiğinde','cinsiyet farkı yoktur.']);
  },D77_FACTORS.map((x,i)=>i?D77_ref(x[1],'383'):null),555);
})();
