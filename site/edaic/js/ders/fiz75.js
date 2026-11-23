/* Bölüm 75 · Bağışıklık sistemi: özgün, şematik SEKIL bileşenleri. */
(function () {
  'use strict';
  const D75_TEXT = {
  "sistem": {
    "ag": "<b>Antijen, hapten, alerjen.</b> Antijen protein ya da polisakkarittir; antikorlar ona özgül olarak bağlanır. Hapten yalnız taşıyıcı proteine bağlıyken yanıt uyarır. Alerjen, çoğu zaman zararsız olduğu hâlde şiddetli yanıt doğuran çevresel antijendir. Öteki sekmeleri açın. [[K1 s. 360]]",
    "dogal": "<b>Doğal bağışıklık.</b> İlk savunma hattı: anında, özgül değil, önceki karşılaşma gerektirmez. Engeller, inflamasyon, kompleman, hücreler ve akut faz proteinlerinden oluşur. [[K1 s. 360]]",
    "kaz": "<b>Kazanılmış bağışıklık.</b> Daha yavaş ama mikroba özgül ve bellekli. Sitotoksik T hücreleri hücresel, B ve T yardımcı hücreler hümoral (antikor) bağışıklığı yürütür. [[K1 s. 360]]"
  },
  "hucreler": {
    "neu": "<b>Nötrofil.</b> Lökositlerin %60'ı; bakteri ve mantarları fagosite eder (yutar ve sindirir), ölmeden önce ≈ 5–20 bakteri. Başka bir hücre seçin. [[K1 s. 360]]",
    "mak": "<b>Makrofaj.</b> Kandan dokuya geçen monositten oluşur; mikroorganizmaları ve hücre artıklarını yutar, ölmeden önce 100 bakteriye dek. [[K1 s. 361]]",
    "eoz": "<b>Eozinofil.</b> Helmint ve parazit gibi çok hücreli canlıları öldürür; mast hücreleriyle birlikte alerji ve astımda rol alır, ikisinde de serum eozinofil sayısı artar. [[K1 s. 361]]",
    "baz": "<b>Bazofil.</b> En az bulunan lökosit; dolaşan mast hücresi gibidir, granüllerinde histamin ve heparin taşır. Alerji ve parazit savunması. [[K1 s. 361]]",
    "nk": "<b>NK hücresi.</b> Lenfosittir ama B ve T hücrelerinin tersine özgül değildir; tümör hücrelerini ve virüslü hücreleri yok eder. Gebede fetüse saldırıyı önlemek için annenin bağışıklığını baskılamaya katıldığı düşünülür. [[K1 s. 361]]",
    "mast": "<b>Mast hücresi.</b> Doku hasarında ve enfeksiyonda degranüle olup histamin ve öteki inflamatuvar aracıları salar; IgE ile tip I aşırı duyarlılığın merkezindedir. [[K1 s. 360–361, 367]]"
  },
  "inflamasyon": [
    "<b>1 · Tanıma.</b> Travmada damar yırtılır ve mast hücreleri degranüle olur; enfeksiyonda doku makrofajı mikrobu tanır, yutar ve IL-1, IL-6, TNF-α salar. Adımları ilerletin. [[K1 s. 361]]",
    "<b>2 · Vazodilatasyon.</b> Histamine yanıt olarak arteriyoller genişler; kan akımı artar ve bölgeye lökosit ve plazma proteini taşınır: kızarıklık ve ısı. [[K1 s. 361]]",
    "<b>3 · Venül sızıntısı.</b> İnce duvarlı postkapiller venüller TNF-α ve histaminle şişer, endotel aralıkları açılır; kompleman, pıhtılaşma proteinleri ve sonra antikorlarla birlikte plazma interstisyuma geçer: ödem. Kompleman mast hücresini yeniden degranüle eder ve mikrobu opsonize eder. [[K1 s. 361]]",
    "<b>4 · Transmigrasyon.</b> Geçirgenlik tek başına yetmez: endotel adezyon molekülleri gösterir, nötrofil ve makrofajlar yavaşlayıp endotel hücrelerinin arasından geçer ve kemotaktik moleküllerle odağa yönelir. [[K1 s. 361–362]]",
    "<b>5 · Sistemik yanıt.</b> Ağır inflamasyonda ya da mikrop kaçınca sitokinler dolaşıma geçer: ateş fagositozu artırır ve bakteri çoğalmasını bozar; ilikten nötrofil, karaciğerden akut faz proteinleri salınır; CRP inflamasyonun derecesiyle koreledir. [[K1 s. 362]]"
  ],
  "kompleman": [
    "<b>1 · Etkinleşme.</b> Alternatif yol: belirli türde bir bakteri hücre duvarıyla temas. Klasik yol: antikor–antijen kompleksi. Adımları ilerletin. [[K1 s. 362]]",
    "<b>2 · Hücre lizisi.</b> Birçok kompleman proteini membran atak kompleksini kurar ve zarı deler; su osmotik eğimle içeri girer, bakteri şişip patlar. [[K1 s. 363]]",
    "<b>3 · Opsonizasyon.</b> Kompleman parçaları mikrobu kaplar ve nötrofil ile makrofaja tutunma yeri olur; fagositoz daha verimli olur. [[K1 s. 363]]",
    "<b>4 · Kemotaksis.</b> Dolaşımdan dokuya geçmiş lökositleri kompleman parçaları enfeksiyon odağına yönlendirir. [[K1 s. 363]]",
    "<b>5 · Mast hücresi degranülasyonu.</b> Kompleman yerel mast hücrelerinden histamin gibi vazoaktif aracıların salınmasını tetikleyip inflamasyonu artırır. [[K1 s. 363]]"
  ],
  "timus": "<b>Seçim sürüyor.</b> Her T hücresi rastgele bir TCR ile gelir; timus epiteli vücudun bütün proteinlerini gösterir ve kendi proteinine güçlü bağlanan hücre apoptozla ölür. Yaklaşık %98 elenir, %2 olgunlaşır. [[K1 s. 363]]",
  "antikor": [
    "<b>1 · Fagositoz.</b> Makrofaj ya da dendritik hücre (birlikte: antijen sunan hücre, APC) bakteriyi yutar ve küçük parçalarını (antijen) MHC sınıf II ile yüzeyinde gösterir. Adımları ilerletin. [[K1 s. 365]]",
    "<b>2 · Arama.</b> APC yakındaki lenfoid dokuya, çoğu zaman lenf düğümüne gider; her biri farklı BCR ve TCR taşıyan sayısız B ve T yardımcı hücreye antijeni sunar ve sonunda tam eşleşenleri bulur. [[K1 s. 365]]",
    "<b>3 · T yardımcı klon.</b> TCR'si eşleşen CD4+ T yardımcı hücre (CD4, MHC sınıf II ile etkileşir) blast olur ve hızla çoğalıp aynı antijene özgül bir klon kurar; küçük bir kısmı uykuda bekleyen bellek T yardımcı hücresine dönüşür. [[K1 s. 365]]",
    "<b>4 · Güvenlik kilidi.</b> B hücresi yüzey Ig'si (BCR) eşleşince etkinleşir ama (genellikle) eşleşen T yardımcı hücrenin desteğini ister: antijen iki ayrı hücreyle tam eşleşmelidir. [[K1 s. 365]]",
    "<b>5 · Plazma ve bellek hücresi.</b> Etkin B hücresi aynı zar Ig'sini taşıyan bir klon üretir; yavruların çoğu plazma hücresine, kalanı bellek hücresine farklılaşır. [[K1 s. 365]]",
    "<b>6 · Antikor üretimi.</b> Her plazma hücresi saniyede ≈ 2000 antikor üretir; bunu kendi protein sentezi pahasına yaptığından yaklaşık bir hafta yaşar. Antikorlar dolaşımla odağa gidip antijene bağlanır. [[K1 s. 365]]"
  ],
  "yanit": {
    "p": "<b>Primer yanıt.</b> Patojen girişinden antikor üretimine ≈ 5 gün; başlıca IgM, sonra biraz IgG. Patojen yok edildikten sonraki 5 günde plazma ve T yardımcı hücrelerin çoğu ölür. \"İkinci karşılaşma\"yı seçin. [[K1 s. 365]]",
    "s": "<b>Sekonder yanıt.</b> Bellek T yardımcı ve bellek B hücreleri etkinleşir; antikor saatler içinde üretilir, çoğu IgG, azı IgM. Yanıt o kadar hızlıdır ki patojen kişiyi hasta etmeden öldürülür: aktif bağışıklık. Aşı bu yanıtı önceden kurar. [[K1 s. 365–366]]"
  },
  "tc": [
    "<b>1 · Vitrin.</b> Vücudun bütün hücreleri hücre içi proteinlerinden örnek alır, işler ve MHC sınıf I üzerinde zarında gösterir; enfekte hücrede yabancı protein de vitrine çıkar. Adımları ilerletin. [[K1 s. 366]]",
    "<b>2 · Tanıma.</b> Devriye gezen CD8+ sitotoksik T hücresi (CD8, MHC sınıf I ile etkileşir) TCR'siyle yabancı proteini tanır. Timustan yalnız kendi proteinine bağlanmayan Tc'ler çıktığı için bu hücre büyük olasılıkla enfektedir. [[K1 s. 366]]",
    "<b>3 · Apoptoz.</b> Tc konak hücrede apoptozu başlatır; patojen hücrenin içinde kalır. Doku makrofajları ölü hücreyi yutar ve hücre içi patojen de ölür. [[K1 s. 367]]",
    "<b>4 · Klon ve devriye.</b> Tc hızla bölünüp aynı TCR'yi taşıyan yavrular üretir; yavrular dolaşımda başka enfekte hücre arar. Antikor ve kompleman gerekmez. Anormal protein gösteren malign hücreler de aynı yolla apoptoza sokulur. [[K1 s. 367]]"
  ],
  "ig": {
    "yapi": "<b>Temel yapı.</b> Değişken bölge (Fab) antijeni tanıyıp bağlar; her antikorun Fab'ı farklıdır. Sabit bölge (Fc) fagositlere ve komplemana bağlanır; aynı türdeki (IgG, IgM …) bütün antikorların Fc'si aynıdır. Bir Ig türü seçin. [[K1 s. 367]]",
    "M": "<b>IgM.</b> Beş Y alt biriminden oluşan en büyük Ig; primer yanıtta ilk üretilen antikordur ve büyük antijenleri özellikle iyi bağlar. [[K1 s. 367]]",
    "G": "<b>IgG.</b> Tek Y; en bol Ig ve plasentayı geçebilen tek Ig. [[K1 s. 367]]",
    "A": "<b>IgA.</b> İki Y'nin dimeri; mukozada (solunum yolu, bağırsak), tükürükte, gözyaşında ve anne sütünde. [[K1 s. 367]]",
    "E": "<b>IgE.</b> Mast hücresi yüzeyindeki monomer; antijen bağlanınca mast hücresi degranüle olur (tip I aşırı duyarlılık). Plazmada düşüktür; atopi, parazit enfeksiyonu ve aşırı duyarlılıkta artar. [[K1 s. 367]]",
    "D": "<b>IgD.</b> Naif B hücre zarında IgM'nin yanında duran monomer; işlevi belirsizdir. B hücresi etkinleşince kaybolur ve zarı tümüyle IgM kaplar. [[K1 s. 367]]"
  },
  "hiper": {
    "1": "<b>Tip I · anında.</b> İlk karşılaşmada alerjene özgül IgE oluşur ve mast hücrelerini kaplar; yeniden karşılaşmada alerjen IgE'ye bağlanır, mast hücresi hızla degranüle olup histamin, lökotrien ve prostaglandin salar. Öteki türleri seçin. [[K1 s. 368]]",
    "2": "<b>Tip II · sitotoksik.</b> Antikorlar vücudun kendi hücre yüzey antijenlerine bağlanır; kompleks komplemanı başlatır, inflamasyon ve makrofaj fagositozu izler. [[K1 s. 369]]",
    "3": "<b>Tip III · immün kompleks.</b> Antikor (genellikle IgG) antijene bağlanır; dolaşımdaki kompleksler küçük damarlara, eklemlere ve glomerüllere takılıp inflamasyon yapar. [[K1 s. 369]]",
    "4": "<b>Tip IV · gecikmiş.</b> Antikor değil T hücreleri; 2–3 günde gelişir. T yardımcı hücreler APC'nin sunduğu antijeni tanır, çoğalır ve sitokin salar; hasarı etkinleşen makrofajlar verir. [[K1 s. 369]]"
  },
  "yetmezlik": {
    "p": "<b>Primer.</b> Bağışıklık sisteminin gelişim kusuru: T hücre (DiGeorge), birleşik B ve T (ağır kombine immün yetmezlik), B hücre (X'e bağlı agamaglobulinemi), kompleman eksikliği. Bir dala dokunun. [[K1 s. 367]]",
    "s": "<b>Sekonder.</b> En sık iyatrojeniktir (steroid, kemoterapi, radyoterapi, transplant immünosupresifleri); yaşlanma, malnütrisyon, kanser (özellikle lösemi ve miyelom) ve AIDS de yapar. [[K1 s. 367]]"
  },
  "anestezi": {
    "ale": "<b>Alerjenler (NAP6).</b> Genel anestezide anafilaksi 1/10 000, olguların %4'ü ölümcül. Nedenler: antibiyotikler %47 (özellikle penisilinler, teikoplanin), kas gevşeticiler %33 (özellikle süksametonyum), antiseptikler %9 (klorheksidin emdirilmiş santral kateterler dahil). Öteki sekmeleri açın. [[K1 s. 369]]",
    "eng": "<b>Engeller.</b> Cerrahi alanda deri ya da mukoza açılır; endotrakeal entübasyon ve kuru gaz trakeobronşiyal silya işlevini bozup pnömoniye zemin hazırlar. [[K1 s. 369]]",
    "bas": "<b>Baskılanma.</b> Stres yanıtı, opioidler, volatil anestezikler, allojenik transfüzyon ve hipotermi bağışıklığı baskılar; propofolün NK etkinliğine etkisi yoktur. [[K1 s. 369–370]]"
  }
};
  const D75_VIZ = window.VIZ;
  const D75_RM = !!window.VIZ_YARDIM.RM;
  const D75_sec = (pairs) => ({ id:'d', ad:'Görünüm', liste:pairs.map(([d,ad])=>({d,ad})) });
  const D75_u = (t, seconds=4) => D75_RM ? 1 : Math.min(1,t/seconds);
  const D75_wrap = (text, n=29) => {
    const lines=[]; let line='';
    text.split(' ').forEach(word=>{ if(line && (line+' '+word).length>n){lines.push(line);line=word;}else line+=(line?' ':'')+word; });
    if(line) lines.push(line); return lines;
  };
  const D75_box = (S,x,y,w,text,color='basic',h) => {
    const lines=Array.isArray(text)?text:D75_wrap(text,Math.floor(w/8.5));
    return S.kutu(x,y,w,h||lines.length*19+24,{renk:color,dolgu:color+'-soft',yazi:lines,lh:19,yc:''});
  };
  const D75_Y = (S,x,y,r=15,color='accent',angle=0) => '<g transform="rotate('+angle+' '+x+' '+y+')">'+S.cizgi([[x-r,y-r],[x,y],[x+r,y-r]],{renk:color,w:3})+S.cizgi([[x,y],[x,y+r]],{renk:color,w:3})+'</g>';
  const D75_cell = (S,x,y,label,r=30,color='basic',dead=false) => S.daire(x,y,r,{renk:dead?'muted':color,dolgu:dead?'paper':color+'-soft',soluk:dead})+S.t(x,y+5,label,{a:'middle',c:'b',renk:dead?'muted':color});
  const D75_bug = (S,x,y,r=12) => S.kutu(x-r,y-r/2,2*r,r,{renk:'crit',dolgu:'crit-soft',r:r/2,w:2.5});
  const D75_star = (S,x,y,r=18,color='crit') => S.cizgi(Array.from({length:17},(_,k)=>{const a=k*Math.PI/8,rr=k%2?r*.5:r;return [x+Math.cos(a)*rr,y+Math.sin(a)*rr];}),{renk:color,dolgu:color==='muted'?'paper':color+'-soft'});
  const D75_dots = (S,x,y,u,color='warn',n=10) => Array.from({length:n},(_,i)=>{const a=i*2*Math.PI/n,r=32+u*40;return S.daire(x+Math.cos(a)*r,y+Math.sin(a)*r,3,{renk:color,dolgu:color});}).join('');
  // Vertical flow on phones; paired columns on wide screens. Lines are wrapped before drawing.
  const D75_flow = (S,items,y=20,color='basic',arrows=true) => {
    let out='',yy=y; const w=S.w-48;
    items.forEach((item,i)=>{const lines=D75_wrap(item,Math.floor(w/8.5)),h=lines.length*19+24;
      if(i && arrows)out+=S.ok([ [S.w/2,yy-20],[S.w/2,yy-3]],{renk:color});
      out+=D75_box(S,24,yy,w,lines,color,h); yy+=h+26;
    });return out;
  };
  const D75_scene = (el,name,pairs,ciz,options={}) => SEKIL.sahne(el,{baslik:name,vb:[640,600],vbDar:[360,700],secenek:D75_sec(pairs),ciz,metin:p=>D75_TEXT[name][p.d],...options});
  const D75_steps = (el,name,names,ciz,options={}) => SEKIL.adim(el,{baslik:name,vb:[640,400],vbDar:[360,500],hareket:true,adimlar:names.map((ad,i)=>({ad,metin:D75_TEXT[name][i],ciz:(S,t)=>ciz(S,i,t)})),...options});

  D75_VIZ.f75_sistem = el => D75_scene(el,'sistem',[['ag','Antijen–hapten'],['dogal','Doğal'],['kaz','Kazanılmış']],(S,t,p)=>{
    if(p.d==='dogal')return D75_flow(S,[ 'Doğal bağışıklık: anında, özgül değil; önceki karşılaşma gerekmez', 'Engeller: deri; mukosiliyer yürüyen merdiven; düşük mide pH’sı; peristaltizm, safra; lizozim (tükürük, gözyaşı): bakteri duvarını eritir; mukozal transferrin: demir ↓, çoğalma ↓', 'İnflamasyon · Kompleman', 'Hücreler: nötrofil, makrofaj, NK, mast, bazofil, eozinofil', 'Akut faz proteinleri: CRP, α1-antitripsin' ],20,'basic',false);
    if(p.d==='kaz')return D75_flow(S,['Kazanılmış: daha yavaş, özgül; bellek sayesinde ikinci karşılaşmada çok daha hızlı','Hücresel: sitotoksik T (Tc) → hücre içi patojen ve anormal konak hücresi','Hümoral: B + T yardımcı → antikor → vücut sıvılarındaki patojen'],20,'accent');
    let out=''; const w=S.dar?312:192;
    ['Antijen','Hapten','Alerjen'].forEach((a,i)=>{const x=S.dar?24:16+i*208,y=S.dar?16+i*210:25,c=x+w/2;
      out+=S.kutu(x,y,w,196)+S.t(c,y+26,a,{a:'middle',c:'b'});
      if(i===0)out+=D75_star(S,c,y+84,30)+D75_Y(S,c-25,y+70)+D75_Y(S,c+25,y+70)+S.t(c,y+143,['Protein ya da','polisakkarit'],{a:'middle'});
      if(i===1)out+=D75_star(S,c-54,y+65,10,'warn')+S.t(c+10,y+70,'Yanıt yok',{c:'m'})+D75_cell(S,c-35,y+117,'',23,'basic')+D75_star(S,c-17,y+107,10,'warn')+S.ok([[c,y+116],[c+28,y+116]])+D75_Y(S,c+48,y+116)+S.t(c,y+157,['Taşıyıcıyla yanıt','Serbest haptene de bağlanır'],{a:'middle',c:'k'});
      if(i===2)out+=D75_star(S,c-40,y+82,20,'ok')+S.ok([[c-12,y+82],[c+12,y+82]],{renk:'warn'})+D75_star(S,c+45,y+82,28,'warn')+S.t(c,y+143,['Zararsız ama','şiddetli yanıt'],{a:'middle'});
    }); return out;
  },{vb:[640,570],vbDar:[360,720]});

  D75_VIZ.f75_hucreler = el => D75_scene(el,'hucreler',[['neu','Nötrofil'],['mak','Makrofaj'],['eoz','Eozinofil'],['baz','Bazofil'],['nk','NK hücresi'],['mast','Mast hücresi']],(S,t,p)=>{
    const u=D75_u(t,5),phag=['neu','mak'].includes(p.d),x=S.w/2-70,y=150;
    let out=S.t(S.w/2,28,p.d==='neu'?'Lökositlerin %60’ı':p.d==='mak'?'Monosit → doku makrofajı':'Doğal bağışıklık',{a:'middle',c:'b'});
    if(p.d==='neu')out+=S.kutu(30,44,S.w-60,9,{dolgu:'line',renk:'line'})+S.kutu(30,44,(S.w-60)*.6,9,{dolgu:'basic',renk:'basic'});
    out+=D75_cell(S,x,y,'',p.d==='mak'?55:46,'basic',phag&&u===1);
    const lobes=p.d==='neu'?3:p.d==='eoz'?2:1;
    for(let i=0;i<lobes;i++)out+=S.daire(x+(i-(lobes-1)/2)*18,y,12,{renk:'basic',dolgu:'basic',soluk:phag&&u===1});
    if(phag){ const cap=p.d==='neu'?12:100,count=Math.min(cap,Math.floor(u*cap));
      if(u<1)out+=D75_bug(S,x+60+(1-(t%1))*70,y-20);
      out+=S.t(S.w/2,240,`${count} bakteri yutuldu${u===1?' · hücre ölür':''}`,{a:'middle',c:'b'});
      out+=D75_box(S,24,275,S.w-48,p.d==='neu'?['Bakteri ve mantar fagositozu','Ölmeden önce ≈ 5–20 bakteri','Bu döngü: 12 bakteri']:['Mikroorganizma ve hücre artıkları','Ölmeden önce ≤ 100 bakteri']);
    }else if(p.d==='nk'){
      out+=D75_cell(S,x+145,y-40,'Virüslü',38,'crit',u>.5)+D75_cell(S,x+145,y+50,'Tümör',38,'clin',u>.8)+S.ok([[x+45,y],[x+107,y-30]],{renk:'accent'})+S.ok([[x+45,y],[x+107,y+45]],{renk:'accent'});
      out+=D75_box(S,24,280,S.w-48,['Özgül olmayan lenfosit','Temas → hedef hücre ölümü']);
    }else{
      out+=D75_dots(S,x,y,u,'warn');
      if(p.d==='eoz')out+=S.cizgi([[x+85,y-40],[x+130,y-25],[x+105,y],[x+145,y+25],[x+120,y+45]],{renk:'crit',w:12});
      for(let i=0;i<9;i++)out+=S.daire(x-25+(i%3)*23,y-27+Math.floor(i/3)*25,4,{dolgu:'warn',renk:'warn'});
      out+=D75_box(S,24,280,S.w-48,p.d==='eoz'?['Granüller → helmint / parazit','Alerji ve astımda eozinofil ↑']:p.d==='baz'?['Histamin + heparin','En az bulunan lökosit','Alerji ve parazit savunması']:['Histamin ve inflamatuvar aracılar','Doku hasarı / enfeksiyon','IgE → tip I aşırı duyarlılık']);
    } return out;
  },{hareket:true,sure:6,vb:[640,420],vbDar:[360,430]});

  D75_VIZ.f75_inflamasyon = el => D75_steps(el,'inflamasyon',['Tanıma','Vazodilatasyon','Venül sızıntısı','Transmigrasyon','Sistemik yanıt'],(S,i,t)=>{
    const w=S.w,u=D75_u(t),ys=70,dh=i===1?20+u*18:20;
    let out=S.t(16,28,'Arteriyol',{c:'b'})+S.t(w*.43,28,'Kapiller',{a:'middle'})+S.t(w-12,28,['Postkapiller','venül'],{a:'end'});
    out+=S.cizgi([[16,ys-dh],[w*.31,ys-dh],[w*.43,60],[w-16,60]],{renk:'line',w:4})+S.cizgi([[16,ys+dh],[w*.31,ys+dh],[w*.43,90],[w*.63,90]],{renk:'line',w:4});
    for(let k=0;k<3;k++)out+=S.cizgi([[w*.66+k*(w*.09),90],[w*.66+k*w*.09+w*.06,90]],{renk:'line',w:2});
    out+=S.akis([[20,ys],[w-20,ys]],t,{renk:'crit',n:i===1?10:5,hiz:i===1?.65:.3})+S.kutu(12,122,w-24,S.h-135,{renk:'line',dolgu:i===2?'accent-soft':'paper'})+S.t(24,147,'İnterstisyum',{c:'m'});
    const cx=w/2;
    if(i===0){out+=S.t(30,184,'Travma',{c:'b'})+S.cizgi([[30,205],[70,205],[80,220],[90,195],[105,205]],{renk:'crit'})+D75_cell(S,75,275,'Mast',27)+D75_dots(S,75,275,u)+S.t(w-24,184,'Enfeksiyon',{a:'end',c:'b'})+D75_cell(S,w-85,235,'APC',30)+D75_bug(S,w-55-u*20,230)+S.ok([[w-85,274],[cx,310]],{renk:'warn'})+S.t(cx,352,['IL-1 · IL-6 · TNF-α','→ mast hücresi'],{a:'middle'});}
    if(i===1)out+=D75_flow(S,['Histamin → arteriyol genişler','Kan akımı ↑','Kızarıklık ve ısı'],172,'warn');
    if(i===2)out+=S.akis([[w*.79,80],[w*.79,174]],t,{renk:'accent',n:5})+D75_flow(S,['Plazma → ödem','Kompleman · pıhtılaşma proteini · antikor (sonra)','Kompleman → mast degranülasyonu + mikrop opsonizasyonu'],190,'accent');
    if(i===3){ const path=[[w*.55,76],[w*.8,76],[w*.8,130],[w*.7,240],[w*.48,315]],pos=S.boyunca(path,u); out+=S.ok(path,{renk:'ok',kesik:true})+D75_cell(S,pos[0],pos[1],'',13)+S.t(26,185,['Adezyon → yavaşlama','Endotel arasından geçiş'],{})+S.t(26,263,['Kemotaktik işaret','→ odağa göç'],{});for(let k=0;k<4;k++)out+=S.cizgi([[w*.7+k*15,87],[w*.7+k*15,98]],{renk:'ok',w:3}); out+=D75_star(S,w*.48,340,20);}
    if(i===4)out+=D75_flow(S,['Ateş: fagositoz ↑, bakteri çoğalması ↓','Kemik iliği → nötrofil','Karaciğer → akut faz proteinleri; CRP ∝ inflamasyon'],170,'clin');
    return out;
  },{vb:[640,470],vbDar:[360,520]});

  const D75_sirsParams=[{id:'t',ad:'Vücut ısısı',min:34,max:41,adim:.1,deger:37,birim:'°C'},{id:'kh',ad:'Kalp hızı',min:50,max:160,adim:1,deger:80,birim:'/dk'},{id:'sh',ad:'Solunum hızı',min:8,max:40,adim:1,deger:14,birim:'/dk'},{id:'wbc',ad:'Lökosit',min:1,max:25,adim:.5,deger:8,birim:'× 10⁹/L'}];
  const D75_criteria=p=>[p.t<36||p.t>38,p.kh>90,p.sh>20,p.wbc<4||p.wbc>12];
  const D75_n=p=>D75_criteria(p).filter(Boolean).length;
  const D75_f=n=>Number(n).toFixed(1).replace('.',',');
  D75_VIZ.f75_sirs=el=>SEKIL.sahne(el,{baslik:'SIRS ölçütleri ve sistemik sonuçları',vb:[640,1040],vbDar:[360,1280],param:D75_sirsParams,ciz:(S,t,p)=>{
    const n=D75_n(p),flags=D75_criteria(p),bounds=[[36,38],[50,90],[8,20],[4,12]];let out=S.rozet(S.w/2,25,`${n}/4 ölçüt · ${n>=2?'SIRS':'SIRS yok'}`,{renk:n>=2?'crit':'ok',dolgu:n>=2?'crit-soft':'ok-soft'});
    D75_sirsParams.forEach((q,i)=>{const y=75+i*85,X=v=>30+(v-q.min)/(q.max-q.min)*(S.w-60),b=bounds[i];
      out+=S.t(24,y,`${q.ad}: ${i===0||i===3?D75_f(p[q.id]):p[q.id]} ${q.birim}${flags[i]?' ✓':''}`,{c:'b',renk:flags[i]?'warn':'ink'})+S.cizgi([[30,y+24],[S.w-30,y+24]],{renk:'line',w:9})+S.cizgi([[X(b[0]),y+24],[X(b[1]),y+24]],{renk:'ok-soft',w:9});
      b.forEach((v,j)=>{if(i===1||i===2){if(j===0)return;}out+=S.cizgi([[X(v),y+12],[X(v),y+34]],{renk:'muted',kesik:true})+S.t(X(v),y+53,String(v),{a:'middle'});});
      out+=S.daire(X(p[q.id]),y+24,6,{dolgu:flags[i]?'warn':'ok',renk:'ink'});
    });
    out+='<g opacity="'+(n>=2?1:.38)+'">'+D75_flow(S,['Yaygın vazodilatasyon → sistemik hipotansiyon; venül sızıntısı → damar içi sıvı kaybı','Uzak organlara nötrofil göçü; prokoagülan durum → mikrovasküler tromboz','Miyokart depresyonu: SR Ca²⁺ alım / salımı gecikir','Mitokondri işlev bozukluğu → oksidatif fosforilasyon yetersiz','Bu bozukluklar → dokuya O₂ sunumu ↓','→ Çoklu organ işlev bozukluğu: makro + mikrovasküler iskemi','→ En sık: akciğer → ARDS'],420,'clin',false)+'</g>';
    out+=S.t(24,S.h-65,D75_wrap('Tetikleyici: en sık ağır enfeksiyon (özellikle Gram-negatif); ayrıca akut pankreatit, ağır travma',S.dar?34:65),{c:'m'});return out;
  },metin:p=>`<b>${D75_n(p)}/4 ölçüt.</b> Ateş ${D75_f(p.t)} °C, kalp hızı ${p.kh}/dk, solunum hızı ${p.sh}/dk, lökosit ${D75_f(p.wbc)} × 10⁹/L: SIRS ${D75_n(p)>=2?'var. Yerel inflamasyonun kalıbı bütün vücuda yayılır; O₂ sunumu düşer ve çoklu organ işlev bozukluğu gelişebilir.':'yok. Sürgüleri oynatın; iki ölçüt dolunca sistemik sonuçlar yanar.'} [[K1 s. 362]]`});

  D75_VIZ.f75_kompleman=el=>D75_steps(el,'kompleman',['Etkinleşme','Membran atak kompleksi','Opsonizasyon','Kemotaksis','Mast hücresi'],(S,i,t)=>{
    const x=S.w/2,y=180,u=D75_u(t); let out=S.t(x,28,'Kompleman: 25 protein',{a:'middle',c:'b'});
    if(i===0){out+=D75_box(S,24,48,S.w-48,['Alternatif: bakteri duvarıyla temas','Klasik: antikor–antijen kompleksi'],'ok');out+=D75_bug(S,x,y+25,42)+D75_Y(S,x+27,y+6)+S.ok([[x-75,y],[x-40,y+15]],{renk:'ok'});}
    if(i===1){if(u<.85)out+=D75_bug(S,x,y,35+u*20);else for(let k=0;k<6;k++)out+=D75_bug(S,x+Math.cos(k)*65,y+Math.sin(k)*45,8);
      out+=S.daire(x-35,y,14,{renk:'ok',w:5})+S.ok([[x-110,y],[x-12,y]],{renk:'basic'})+S.akis([[x-110,y],[x-12,y]],t,{renk:'basic'})+S.t(x,290,['Membran atak kompleksi → delik','Su girişi → şişme → lizis'],{a:'middle'});}
    if(i===2){const bx=x+55-75*u;out+=D75_cell(S,x-65,y,'Makrofaj',55)+D75_bug(S,bx,y,24);for(let k=0;k<8;k++)out+=S.daire(bx+Math.cos(k*Math.PI/4)*30,y+Math.sin(k*Math.PI/4)*20,4,{renk:'ok',dolgu:'ok'});out+=S.t(x,290,['Kompleman kaplı bakteri','Tutunma → fagositoz'],{a:'middle'});}
    if(i===3){for(let k=0;k<7;k++)out+=S.daire(45+k*(S.w-90)/6,y,3+k,{renk:'ok',dolgu:'ok',soluk:k<3});out+=S.ok([[35,y+60],[S.w-40,y+60]],{renk:'ok'})+D75_cell(S,45+u*(S.w-130),y-35,'',20)+D75_star(S,S.w-45,y-30)+S.t(x,290,['İşaret yoğunluğu artar →','Lökosit enfeksiyon odağına gider'],{a:'middle'});}
    if(i===4)out+=D75_cell(S,x,y,'Mast',43)+D75_dots(S,x,y,u)+S.t(x,290,['Kompleman → degranülasyon','Histamin → inflamasyon ↑'],{a:'middle'});
    if(i===0)for(let k=0;k<12;k++)out+=S.daire(x+Math.cos(k*Math.PI/6)*90,y+25+Math.sin(k*Math.PI/6)*50,4,{renk:'ok',dolgu:'ok'});
    return out;
  },{vb:[640,360],vbDar:[360,360]});

  D75_VIZ.f75_timus=el=>SEKIL.sahne(el,{baslik:'Timus seçimi',vb:[640,680],vbDar:[360,730],hareket:true,sure:10,metin:()=>D75_TEXT.timus,ciz:(S,t)=>{
    const u=D75_u(t,9),n=Math.min(50,Math.floor(u*50)),m=n===50?1:0,x=S.w/2;
    let out=D75_box(S,24,18,S.w-48,['Kemik iliği · ortak lenfoid öncül','B: ilikte olgunlaşır, kendine tepki sınanır','→ lenfoid dokuda depolanır'],'accent')+S.ok([[x,110],[x,140]],{renk:'accent'})+S.t(x,162,'T hücreleri → Timus',{a:'middle',c:'b'});
    out+=S.kutu(24,185,S.w-48,220,{renk:'basic',dolgu:'basic-soft'});
    for(let k=0;k<3;k++){const xx=65+k*(S.w-130)/2;out+=D75_cell(S,xx,235,'Epitel',28)+D75_star(S,xx,273,8,k===1?'ok':'basic');}
    out+=S.t(x,307,'Kendi proteinleri ile karşılaşma',{a:'middle'});
    for(let k=0;k<10;k++){const cx=45+k*(S.w-90)/9;out+=D75_cell(S,cx,350,'',8,'accent',k<9&&n>k*5)+D75_star(S,cx,337,4,'accent');}
    out+=S.t(x,390,'Güçlü öz-reaktivite → apoptoz',{a:'middle'});
    out+=D75_box(S,24,428,S.w-48,[`Giren: ${n}`,`Elenen: ${n-m} (≈ %98)`,`Olgunlaşan: ${m} (≈ %2)`],'accent')+S.t(x,550,'≈ 100 milyon farklı TCR',{a:'middle',c:'b'})+D75_box(S,24,575,S.w-48,'DiGeorge: orta hat doğumsal kusur; timus aplazisi → T olgunlaşmaz → ağır immün yetmezlik','clin');return out;
  }});

  D75_VIZ.f75_antikor=el=>D75_steps(el,'antikor',['Fagositoz','Lenf düğümüne yolculuk','Th etkinleşmesi','Çift eşleşme','Klon ve farklılaşma','Antikor fabrikası'],(S,i,t)=>{
    const x=S.w/2,u=D75_u(t),y=175;let out=S.t(x,25,i===0?'Enfeksiyon odağı':i===5?'Lenf düğümü → dolaşım → odak':'Lenf düğümü',{a:'middle',c:'b'})+S.kutu(16,55,S.w-32,255,{renk:i===0?'crit':'accent',dolgu:'paper'});
    if(i===0||i===1){const ax=i===0?x:x-70+u*70;out+=D75_cell(S,ax,y,'APC',42)+D75_bug(S,ax+65-u*35,y-25)+D75_Y(S,ax+37,y-42,12)+D75_star(S,ax+37,y-57,6);out+=S.t(x,280,'Antijen parçası + MHC II',{a:'middle'});if(i===1)out+=D75_cell(S,x+95,110,'Th',25,'accent')+D75_cell(S,x+95,225,'B',25,'accent');}
    if(i===2){out+=D75_cell(S,x-85,125,'APC',30)+S.ok([[x-48,125],[x-12,125]],{renk:'accent'})+D75_cell(S,x+25,125,'CD4+',32,'accent')+S.t(x,70,'MHC II ↔ CD4 · TCR ↔ antijen',{a:'middle'});for(let k=0;k<6;k++)out+=D75_cell(S,x-110+k*44,230,k===5?'mTh':'Th',19,'accent');out+=S.t(x,282,'Özgül klon + bellek Th',{a:'middle'});}
    if(i===3)out+=D75_cell(S,x,y,'B',36,'accent')+D75_Y(S,x-35,y-30)+D75_star(S,x-48,y-48,9)+D75_cell(S,x+100,y,'Th',28,'accent')+S.ok([[x+67,y],[x+40,y]],{renk:'accent'})+S.t(x,100,'BCR + antijen ✓',{a:'middle'})+S.t(x,265,'Eşleşen Th yardımı ✓',{a:'middle'});
    if(i===4){out+=D75_cell(S,x,110,'B',28,'accent');for(let k=0;k<4;k++){const xx=x-108+k*72;out+=S.ok([[x,143],[xx,194]],{renk:'accent'})+D75_cell(S,xx,230,k===3?'mB':'P',27,'accent');}out+=S.t(x,290,'P: plazma · mB: bellek B',{a:'middle'});}
    if(i===5){out+=D75_cell(S,x-85,y,'P',40,'accent')+S.ok([[x-40,y],[x+80,y]],{renk:'accent'});for(let k=0;k<4;k++)out+=D75_Y(S,x-25+((D75_RM?k/4:(t*.2+k/4)%1))*120,y,10);out+=D75_bug(S,x+110,y,17)+S.t(x,90,'≈ 2000 antikor/sn',{a:'middle',c:'b'})+S.t(x,270,'Plazma hücresi ömrü ≈ 1 hafta',{a:'middle'});}
    out+=D75_box(S,24,340,S.w-48,[['APC: makrofaj / dendritik hücre','Fagositoz → antijen sunumu'],['Farklı BCR ve TCR’ler arasından','antijene uyan hücreler seçilir'],['CD4: MHC II ile etkileşir','TCR: sunulan antijeni tanır'],['İki ayrı hücrede eşleşme','B etkinleşmesi için güvenlik'],['Aynı özgüllükte yavrular','Çoğu plazma, bir kısmı bellek'],['Antikorlar dolaşımla odağa döner','Antijene özgül bağlanır']][i],'accent');return out;
  },{vb:[640,440],vbDar:[360,450]});

  const D75_g=(x,m,s)=>Math.exp(-Math.pow((x-m)/s,2));
  const D75_gate=(x,start,span)=>{const u=Math.max(0,Math.min(1,(x-start)/span));return u*u*(3-2*u);};
  D75_VIZ.f75_yanit=el=>SEKIL.grafik(el,{baslik:'Primer ve sekonder antikor yanıtı',vb:[640,340],vbDar:[380,380],secenek:D75_sec([['p','İlk karşılaşma'],['s','İkinci karşılaşma']]),x:{min:0,max:40,ad:'Zaman (gün)',adimlar:[0,10,20,30,40]},y:{min:0,max:100,ad:'Antikor düzeyi (göreli)',adimlar:[0,50,100]},egriler:[{renk:'accent',goster:p=>p.d==='p',f:x=>30*D75_g(x,9,3.5)*D75_gate(x,4.5,1.5)},{renk:'basic',goster:p=>p.d==='p',f:x=>12*D75_g(x,14,5)*D75_gate(x,5,2)},{renk:'accent-soft',goster:p=>p.d==='s',f:x=>30*D75_g(x,9,3.5)*D75_gate(x,4.5,1.5)},{renk:'basic-soft',goster:p=>p.d==='s',f:x=>12*D75_g(x,14,5)*D75_gate(x,5,2)},{renk:'basic',goster:p=>p.d==='s',f:x=>95*D75_g(x,25,4)*D75_gate(x,20,.5)},{renk:'accent',goster:p=>p.d==='s',f:x=>15*D75_g(x,23,2.5)*D75_gate(x,20,.5)}],dikey:p=>p.d==='s'?[{x:0},{x:20}]:[{x:0},{x:5}],bolgeler:p=>p.d==='s'?[{x1:20,x2:20.5}]:[{x1:0,x2:5}],ek:(S,p,X,Y)=>S.t(X(39),Y(88),['IgM','IgG'],{a:'end',renk:'muted'})+S.cizgi([[X(31),Y(90)],[X(34),Y(90)]],{renk:'accent',w:3})+S.cizgi([[X(31),Y(90)+17],[X(34),Y(90)+17]],{renk:'basic',w:3})+S.t(X(1),Y(94),p.d==='p'?['1. karşılaşma','≈ 5 gün gecikme']:['1. karşılaşma','20. gün: 2. karşılaşma','Yanıt: saatler içinde'],{c:'k'}),okuma:p=>D75_TEXT.yanit[p.d]});

  D75_VIZ.f75_tc=el=>D75_steps(el,'tc',['Vitrin','Devriye ve tanıma','Apoptoz ve temizlik','Klonal çoğalma'],(S,i,t)=>{
    const x=S.w/2,u=D75_u(t);let out=S.t(x,27,'MHC I ↔ CD8 · antijen ↔ TCR',{a:'middle',c:'b'});
    if(i<3){out+=D75_cell(S,x-65,170,i===2?'Ölü hücre':'Konak',i===2?48-15*u:55,'basic',i===2)+D75_star(S,x-80,145,9)+D75_star(S,x-45,190,7)+D75_Y(S,x-12,150,12,'muted',90)+D75_star(S,x,150,7,i===0&&u<.4?'ok':'crit');
      if(i===0)out+=S.ok([[x-55,130],[x-5,140]],{renk:'crit'})+S.t(x,275,['Hücre içi protein → yüzey','Kendi / yabancı protein örneği'],{a:'middle'});
      if(i===1)out+=D75_cell(S,x+115-u*65,170,'CD8+',32,'accent')+S.t(x,275,['Tc yaklaşır → TCR eşleşir','Enfekte hücre tanınır'],{a:'middle'});
      if(i===2)out+=D75_cell(S,x+95-u*40,170,'Makrofaj',47)+S.t(x,275,['Patojen ölü hücrenin içinde kalır','Makrofaj yutar → patojen ölür'],{a:'middle'});
    }else{const n=u<.25?1:u<.5?2:u<.75?4:8;for(let k=0;k<n;k++)out+=D75_cell(S,x-105+(k%4)*70,90+Math.floor(k/4)*65,'Tc',23,'accent');out+=S.ok([[x,205],[x,245]],{renk:'accent'})+D75_box(S,24,255,S.w-48,['Yeni enfekte hücre / tümör hücresi','Anormal protein → tanıma → apoptoz'],'clin');}
    out+=S.t(x,370,['Hücre içi patojen örnekleri: bazı virüsler,','parazitler, mayalar, M. tuberculosis'],{a:'middle',c:'k'});return out;
  },{vb:[640,420],vbDar:[360,420]});

  D75_VIZ.f75_ig=el=>D75_scene(el,'ig',[['yapi','Yapı'],['M','IgM'],['G','IgG'],['A','IgA'],['E','IgE'],['D','IgD']],(S,t,p)=>{
    const x=S.w/2,y=165;let out='';
    if(p.d==='yapi'){
      out+=S.t(x,25,['2 ağır + 2 hafif zincir','İki antijen bağlanma yeri'],{a:'middle',c:'b'});
      [-1,1].forEach(sign=>{out+=S.cizgi([[x+sign*8,y+85],[x+sign*8,y],[x+sign*65,y-65]],{renk:'basic',w:7})+S.cizgi([[x+sign*29,y-5],[x+sign*83,y-62]],{renk:'accent',w:5})+S.cizgi([[x+sign*52,y-50],[x+sign*65,y-65]],{renk:'accent-soft',w:9})+S.cizgi([[x+sign*70,y-49],[x+sign*83,y-62]],{renk:'accent-soft',w:7})+S.cizgi([[x+sign*31,y-25],[x+sign*44,y-20]],{renk:'warn',w:3});});
      out+=S.cizgi([[x-8,y+10],[x+8,y+10]],{renk:'warn',w:3})+S.cizgi([[x-8,y+22],[x+8,y+22]],{renk:'warn',w:3});
      out+=S.t(x,285,'Fc: kompleman ve fagosit bağlanması',{a:'middle',c:'k'})+D75_box(S,24,320,S.w-48,['Fab: kollar; antijeni bağlar','Uçlarda değişken bölgeler','Ağır zincir: mavi · hafif: vurgu rengi','Sarı bağlantılar: disülfit köprüleri'],'accent');
    }else{
      if(p.d==='M')for(let k=0;k<5;k++){const a=k*2*Math.PI/5;out+=D75_Y(S,x+Math.sin(a)*62,y-Math.cos(a)*62,28,'accent',k*72)+S.cizgi([[x,y],[x+Math.sin(a)*34,y-Math.cos(a)*34]],{renk:'line'});}
      if(p.d==='A')out+=D75_Y(S,x-60,y,34,'accent',-90)+D75_Y(S,x+60,y,34,'accent',90)+S.cizgi([[x-26,y],[x+26,y]],{renk:'line',w:3});
      if(p.d==='G')out+=D75_Y(S,x,y,62);
      if(p.d==='E'||p.d==='D'){out+=S.kutu(35,y+50,S.w-70,75,{renk:'basic',dolgu:'basic-soft'})+S.t(x,y+97,p.d==='E'?'Mast hücresi':'Naif B hücresi',{a:'middle'})+D75_Y(S,x-40,y+17,33)+S.t(x-40,y-32,p.d==='E'?'IgE':'IgD',{a:'middle'});if(p.d==='D')out+=D75_Y(S,x+45,y+17,33)+S.t(x+45,y-32,'IgM',{a:'middle'});}
      const label={M:['Pentamer · 5 Y','Primer yanıtta ilk; en büyük Ig'],G:['Monomer · en bol Ig','Plasentayı geçer'],A:['Dimer · 2 Y','Mukoza, tükürük, gözyaşı, anne sütü'],E:['Monomer · Fc ile mast hücresine bağlı','Antijen → degranülasyon'],D:['Monomer · IgM ile yan yana','Naif B hücresinin zarı']};out+=D75_box(S,24,325,S.w-48,label[p.d],'accent');
    }return out;
  },{vb:[640,470],vbDar:[360,470]});

  const D75_examples={
    '1':['Astım: solunan alerjen → bronkospazm (histamin, lökotrien)','Alerjik rinit: polen → göz kaşıntısı, mukozal inflamasyon, mukus ↑','Anafilaksi: dolaşımdaki alerjen → vazodilatasyon, bronkospazm, sıvı ekstravazasyonu; damar içi girişte en ağır'],
    '2':['İTP: IgG trombosit ve megakaryositleri kaplar → dalak / karaciğer makrofajları yutar → trombosit ↓','Goodpasture: IgG → tip IV kollajen (glomerül, alveol) → akut böbrek hasarı, akciğer kanaması'],
    '3':['SLE: antinükleer antikor + çekirdek antijeni → deri, glomerül, eklem','Çiftçi akciğeri: solunan küf sporları → akciğerde kompleks birikimi'],
    '4':['Tüberküloz: kazeifiye granülom; T yardımcısı eksik AIDS hastası M. tuberculosis’e duyarlı','Nikel → kontakt dermatit: gecikmiş deri tepkisi']
  };
  D75_VIZ.f75_hiper=el=>D75_scene(el,'hiper',[['1','Tip I'],['2','Tip II'],['3','Tip III'],['4','Tip IV']],(S,t,p)=>{
    const x=S.w/2,u=D75_u(t,5);let out='';
    if(p.d==='1')out+=D75_cell(S,x,125,'Mast',40)+D75_Y(S,x-25,86)+D75_Y(S,x+25,86)+S.cizgi([[x-25,67],[x+25,67]],{renk:'ok',w:3})+D75_star(S,x,60,12,'ok')+D75_dots(S,x,125,u)+S.t(x,225,['IgE köprülenir → degranülasyon','Histamin · lökotrien · prostaglandin'],{a:'middle'});
    if(p.d==='2')out+=D75_cell(S,x-65,125,'Trombosit',39,'basic')+D75_Y(S,x-35,90)+D75_dots(S,x-65,125,0,'ok',6)+D75_cell(S,x+100-u*40,125,'Makrofaj',43)+S.t(x,225,['Yüzey antijeni + IgG → kompleman','İnflamasyon + fagositoz'],{a:'middle'});
    if(p.d==='3'){out+=S.cizgi([[25,75],[S.w-25,75]],{renk:'line',w:3})+S.cizgi([[25,155],[S.w-25,155]],{renk:'line',w:3});for(let k=0;k<3;k++){const xx=65+k*(S.w-130)/2,yy=95+u*55;out+=D75_Y(S,xx,yy,12)+D75_star(S,xx-12,yy-13,6)+S.daire(xx,160,20,{renk:'warn',soluk:u<.7});}out+=S.t(x,225,['Antijen–IgG kompleksleri birikir','Küçük damar · eklem · glomerül'],{a:'middle'});}
    if(p.d==='4'){out+=D75_cell(S,x-105,78,'APC',25)+S.ok([[x-75,78],[x-45,78]],{renk:'accent'})+D75_cell(S,x-12,78,'Th',27,'accent')+S.ok([[x+20,78],[x+65,110]],{renk:'warn'});for(let k=0;k<6;k++)out+=D75_cell(S,x+70+Math.cos(k*Math.PI/3)*29,150+Math.sin(k*Math.PI/3)*29,'',15);out+=D75_star(S,x+70,150,10,'muted')+S.t(x,225,['Th → sitokin → makrofaj','Dev hücreler; merkezde nekroz'],{a:'middle'});}
    out+=D75_flow(S,D75_examples[p.d],275,'clin',false);
    out+=S.cizgi([[35,S.h-55],[S.w-35,S.h-55]],{renk:'line',w:4})+S.daire(p.d==='1'?40:p.d==='4'?S.w-40:S.w/2,S.h-55,6,{renk:'accent',dolgu:'accent'})+S.t(24,S.h-25,'Dakikalar',{c:'k'})+S.t(S.w-24,S.h-25,'2–3 gün',{a:'end',c:'k'});return out;
  },{hareket:true,sure:6,vb:[640,740],vbDar:[360,860]});

  D75_VIZ.f75_yetmezlik=el=>D75_scene(el,'yetmezlik',[['p','Primer'],['s','Sekonder']],(S,t,p)=>{
    let out=D75_box(S,24,15,S.w-48,'İmmün yetmezlik: bağışıklık bozuk / yok → fırsatçı enfeksiyon ve bazı kanserler ↑','clin');
    const y=S.dar?145:110;out+=S.ok([ [S.w/2,y-30],[S.w*.26,y]],{renk:'clin',soluk:p.d!=='p'})+S.ok([ [S.w/2,y-30],[S.w*.74,y]],{renk:'clin',soluk:p.d!=='s'})+S.rozet(S.w*.26,y+20,'Primer',{renk:p.d==='p'?'clin':'muted',dolgu:p.d==='p'?'clin-soft':'paper'})+S.rozet(S.w*.74,y+20,'Sekonder',{renk:p.d==='s'?'clin':'muted',dolgu:p.d==='s'?'clin-soft':'paper'});
    const rows=p.d==='p'?['T hücre: DiGeorge → timus aplazisi','B + T: ağır kombine immün yetmezlik','B hücre: X’e bağlı agamaglobulinemi → antikor sentezi yok','Kompleman: tek protein eksikliği → enfeksiyon / otoimmün hastalık']:['İyatrojenik: steroidler, kemoterapi, radyoterapi, transplant immünosupresifleri','Yaşlanma, malnütrisyon → genel işlev ↓','Hastalık: kanser (lösemi, miyelom), AIDS'];return out+D75_flow(S,rows,y+65,'clin',false);
  },{vb:[640,650],vbDar:[360,710]});

  D75_VIZ.f75_anestezi=el=>D75_scene(el,'anestezi',[['ale','Alerjenler (NAP6)'],['eng','Engeller'],['bas','Baskılanma']],(S,t,p)=>{
    const x=S.w/2;
    if(p.d==='ale'){let out=S.t(x,26,['1/10 000 genel anestezi','Olguların %4’ü ölümcül'],{a:'middle',c:'b'});
      [['Antibiyotik',47,'Penisilin, teikoplanin'],['Kas gevşetici',33,'Süksametonyum'],['Antiseptik',9,'Klorheksidin; emdirilmiş santral kateter']].forEach(([name,n,note],i)=>{const y=95+i*125,w=S.w-100;out+=S.t(25,y,name,{c:'b'})+S.kutu(25,y+14,w,18,{renk:'line',dolgu:'paper',r:3})+S.kutu(25,y+14,w*n/50,18,{renk:'clin',dolgu:'clin',r:3})+S.t(35+w*n/50,y+29,'%'+n,{c:'b'})+S.t(25,y+60,D75_wrap(note,S.dar?34:65),{c:'k'});});
      out+=S.t(25,485,'Ölçek: %0–50',{c:'m'})+D75_box(S,24,520,S.w-48,'Seyrek: lateks, kolloid, kan ürünü, amid lokal anestezik, indüksiyon ajanı','clin');return out;
    }
    if(p.d==='eng')return D75_cell(S,x,65,'',28)+S.kutu(x-55,100,110,150,{renk:'line',dolgu:'basic-soft'})+S.cizgi([[x-55,120],[x-95,210]],{renk:'line',w:9})+S.cizgi([[x+55,120],[x+95,210]],{renk:'line',w:9})+D75_star(S,x+25,175,15)+S.cizgi([[x,64],[x,143],[x-25,163]],{renk:'crit',w:4})+D75_flow(S,['Cerrahi alan: deri / mukoza açılır → mikrop giriş yolu','Endotrakeal tüp + kuru gaz → silya işlevi ↓ → pnömoni'],290,'clin');
    return D75_flow(S,['Stres yanıtı → lenfosit işlevi ve fagositoz ↓','Opioidler → makrofaj, nötrofil, NK işlevi; lenfosit çoğalması ve sitokin salınımı ↓','Volatil anestezik → NK ↓; propofol → NK etkinliğine etkisi yok','Allojenik transfüzyon (TRIM) → geçici baskılanma; böbrek naklinde greft sağkalımı ↑','Hipotermi → doğal + kazanılmış bağışıklık ↓','NK: cerrahtan kaçan tümör hücrelerini öldürür → kanser cerrahisinde önemli'],18,'clin',false);
  },{vb:[640,730],vbDar:[360,850]});
})();
