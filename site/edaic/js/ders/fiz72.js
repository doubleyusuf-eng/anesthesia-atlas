/* Bölüm 72: yalnız SEKIL kiti ayarları ve kit yardımcılarıyla özgün çizimler. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  // Dikey okuma: telefon ve masaüstünde aynı sıra, yalnız kutu genişliği değişir.
  const zincir = (S, satirlar, vurgu = -1, bagla = true) => {
    const w = S.dar ? 308 : 480, x = (S.w - w) / 2, cx = S.w / 2;
    return satirlar.map((yazi, i) => {
      const y = 18 + i * 92;
      return (i && bagla ? S.ok([[cx, y - 23], [cx, y - 4]], {renk:'accent'}) : '') +
        S.kutu(x,y,w,66,{yazi,renk:i===vurgu?'accent':'line',dolgu:i===vurgu?'accent-soft':'paper'});
    }).join('');
  };
  const sec = (liste) => ({id:'durum',ad:'Gösterilecek mekanizma',liste:liste.map(([d,ad])=>({d,ad}))});

  VIZ.f72_denge = (el) => SEKIL.sahne(el, {
    baslik:'Sağlam endotel ve hasarlı damar karşılaştırması',vb:[640,396],vbDar:[360,396],
    secenek:sec([['saglam','Sağlam endotel'],['hasar','Damar hasarı']]),
    ciz:(S,t,p)=>zincir(S,p.durum==='saglam' ? [
      ['NO + PGI₂; ADPaz','Trombosit aktivasyonu ↓'],
      ['Heparan → antitrombin','Xa ve trombin inhibisyonu'],
      ['Trombomodülin → protein C/S','Va ve VIIIa inhibisyonu'],
      ['t-PA → plazmin','Yüzeyde fibrin temizliği']
    ] : [
      ['Kollajen + vWF + TF','Yerel yanıt başlar'],
      ['Vazokonstriksiyon','Akım ve kan kaybı ↓'],
      ['Trombosit agregasyonu','Yumuşak tıkaç'],
      ['Trombin → fibrin ağı','Kararlı pıhtı']
    ],p.durum==='saglam'?0:3,p.durum!=='saglam'),
    metin:p=>p.durum==='saglam' ? 'Bunlar ardışık basamaklar değil, eşzamanlı frenlerdir: trombosit inhibisyonu, antikoagülasyon ve fibrinoliz. [[K1 s. 341]]' : 'Akım azalması → trombosit tıkacı → fibrin desteği; yanıt hasarlı bölgeyle sınırlanmalıdır. [[K1 s. 341–342]]'
  });

  const tikacCiz = (S,i) => {
    const cx=S.w/2, xs=[cx-100,cx,cx+100];
    let s=S.t(cx,28,['Damar lümeni',i===0?'Kollajen açığa çıktı':'Trombosit yanıtı'],{a:'middle',c:'b'});
    s+=S.kutu(18,280,S.w-36,52,{yazi:'Subendotelyal kollajen',dolgu:'basic-soft',renk:'basic'});
    s+=S.cizgi([[18,260],[cx-128,260]],{w:8,renk:'clin'})+S.cizgi([[cx+128,260],[S.w-18,260]],{w:8,renk:'clin'});
    xs.forEach((x,k)=>{
      if (i===0 && k!==1) return;
      s+=S.daire(x,208,27,{dolgu:i?'accent-soft':'paper',renk:'accent'});
      if(i>0) for(let n=0;n<8;n++) {const a=n*Math.PI/4;s+=S.cizgi([[x+28*Math.cos(a),208+28*Math.sin(a)],[x+36*Math.cos(a),208+36*Math.sin(a)]],{renk:'accent'});}
      s+=S.t(x,213,'T',{a:'middle',c:'b'});
      if(k===1) s+=S.cizgi([[x,240],[x,280]],{renk:'basic',w:4})+S.t(x+12,270,'vWF',{c:'b'});
    });
    if(i===0) s+=S.ok([[cx,86],[cx,168]],{renk:'accent'})+S.t(cx+12,120,['Tutunma','vWF köprüsü'],{c:'k'});
    if(i===1) s+=S.kutu(cx-140,76,280,62,{yazi:['ADP → yeni trombositler','5-HT + TXA₂ → daralma'],dolgu:'warn-soft',renk:'warn'})+S.ok([[cx,142],[cx,165]],{renk:'warn'});
    if(i>=2) {
      s+=S.cizgi([[xs[0]+30,208],[xs[1]-30,208]],{renk:'clin',w:5})+S.cizgi([[xs[1]+30,208],[xs[2]-30,208]],{renk:'clin',w:5});
      s+=S.t(cx,100,['Gp IIb/IIIa üzerinde','fibrinojen + vWF köprüleri'],{a:'middle',c:'b'});
    }
    if(i===3) {
      for(let k=0;k<4;k++) s+=S.cizgi([[cx-133,167+k*19],[cx+133,239-k*19]],{renk:'ok',w:2});
      s+=S.t(cx,363,['Trombin → fibrin','XIIIa → çapraz bağ'],{a:'middle',c:'b',renk:'ok'});
    } else s+=S.t(cx,363,i===2?'Yumuşak tıkaç':i===1?'Aktivasyon çoğalır':'İlk tabaka tutunur',{a:'middle',c:'b'});
    return s;
  };
  VIZ.f72_tikac = (el) => SEKIL.adim(el, {
    baslik:'Trombosit tıkacının dört basamağı',vb:[640,410],vbDar:[360,410],oto:false,
    adimlar:[
      {ad:'Tutunma',metin:'vWF, ilk trombositleri açığa çıkan kollajene tutundurur; reseptör düzeltmesi aşağıdadır. [[K1 s. 342–343]]',ciz:S=>tikacCiz(S,0)},
      {ad:'Aktivasyon',metin:'ADP yeni trombositleri aktive eder; yıldızsı şekil belirir, serotonin ve tromboksan damarı daraltır. [[K1 s. 342]]',ciz:S=>tikacCiz(S,1)},
      {ad:'Agregasyon',metin:'Gp IIb/IIIa üzerinden fibrinojen/vWF köprüleri komşu trombositleri bağlar: bu basamak agregasyondur. [[K1 s. 342–343]]',ciz:S=>tikacCiz(S,2)},
      {ad:'Fibrin desteği',metin:'Trombin fibrin oluşturur; XIIIa çapraz bağlarıyla yumuşak tıkaç sağlamlaştırılır. [[K1 s. 342, 345]]',ciz:S=>tikacCiz(S,3)}
    ]
  });

  const anti = {
    aspirin:{sat:[['Zar fosfolipitleri','Tromboksan sentez yolu'],['Aspirin ⊣ COX','Geri dönüşsüz inhibisyon'],['Tromboksan A₂ ↓','Aktivasyon ve daralma ↓']],metin:'Endotel COX’u saatler içinde yeniler; trombositte aspirin etkisi yaklaşık 7 gün sürer. [[K1 s. 343–344]]'},
    adp:{sat:[['Klopidogrel / tikagrelor','Prasugrel'],['ADP reseptörü engellenir','Aktivasyon sinyali azalır'],['Gp IIb/IIIa yanıtı ↓','Agregasyon ↓']],metin:'ADP bloku, yeni trombosit aktivasyonunu ve Gp IIb/IIIa yanıtını azaltır. [[K1 s. 344]]'},
    gp:{sat:[['Tirofiban / absiksimab','Gp IIb/IIIa inhibisyonu'],['Fibrinojen bağlanması ↓','Hücreler arası köprü ↓'],['Trombosit agregasyonu ↓']],metin:'Gp IIb/IIIa bloku fibrinojen köprülerini engeller. [[K1 s. 344]]'},
    pde:{sat:[['Dipiridamol ⊣ PDE','cAMP yıkımı azalır'],['Trombosit cAMP ↑','ADP salımı ↓'],['Agregasyon ↓','Tromboksan sentezi ↓']],metin:'Dipiridamolün olası mekanizmalarından biri: PDE inhibisyonu → cAMP artışı → ADP salımında azalma. [[K1 s. 344]]'}
  };
  VIZ.f72_antiagregan = (el) => SEKIL.sahne(el, {
    baslik:'Antiagreganların etki basamakları',vb:[640,302],vbDar:[360,302],secenek:sec([['aspirin','Aspirin'],['adp','ADP bloku'],['gp','Gp IIb/IIIa'],['pde','Dipiridamol']]),
    ciz:(S,t,p)=>zincir(S,anti[p.durum].sat,1),metin:p=>anti[p.durum].metin
  });

  VIZ.f72_caglayan = (el) => SEKIL.adim(el, {
    baslik:'Klasik koagülasyon yolları ve geri bildirim',vb:[640,396],vbDar:[360,396],oto:false,
    adimlar:[
      {ad:'Ekstrinsik',metin:'TF, VII aktivasyonuyla başlatır; TF–VIIa, X’u aktive eder. PT bu girişi ve ortak yolu değerlendirir. [[K1 s. 344, 346–347]]',ciz:S=>zincir(S,[['Hasar → TF teması'],['VII → VIIa','TF–VIIa kompleksi'],['X → Xa'],['Ortak yol','II → IIa → fibrin']],1)},
      {ad:'İntrinsik',metin:'Temas yolunda XII, XI ve IX ardışık aktive olur; IXa–VIIIa, Ca²⁺ ve PF3 ile X’u aktive eder. APTT bu yolu ve ortak yolu değerlendirir. [[K1 s. 344, 347]]',ciz:S=>zincir(S,[['Negatif yüzey teması','XII → XIIa'],['XI → XIa','IX → IXa'],['IXa + VIIIa + Ca²⁺ + PF3','X → Xa'],['Ortak yol','II → IIa → fibrin']],2)},
      {ad:'Ortak yol',metin:'Xa–Va kompleksi trombin üretir; trombin fibrinojeni fibrine dönüştürür ve XIII’ü aktive eder. XIIIa kovalent çapraz bağlar kurar. [[K1 s. 344–345]]',ciz:S=>zincir(S,[['Xa + Va + Ca²⁺ + PF3'],['Protrombin (II)','Trombin (IIa) oluşur'],['Fibrinojen → fibrin','Trombin ayrıca XIII → XIIIa'],['XIIIa ile çapraz bağ','Kararlı fibrin pıhtısı']],3)},
      {ad:'Geri bildirim',metin:'Üst çift çoğaltıcı, alt çift sınırlayıcıdır; trombinin sonucu bağlandığı yüzeye göre değişir. [[K1 s. 341, 345]]',ciz:S=>{
        const w=S.dar?308:480,x=(S.w-w)/2,cx=S.w/2;
        let s='';
        [['Trombin → V ve VIII aktivasyonu'],['Daha çok trombin','Pozitif geri bildirim'],['Trombin + trombomodülin','Protein C aktivasyonu'],['Aktif protein C + S','Va ve VIIIa inhibisyonu']].forEach((a,i)=>{
          const y=18+i*92;
          if(i===1||i===3)s+=S.ok([[cx,y-23],[cx,y-4]],{renk:i===1?'warn':'ok'});
          s+=S.kutu(x,y,w,66,{yazi:a,dolgu:i<2?'warn-soft':'ok-soft',renk:i<2?'warn':'ok'});
        });return s;
      }}
    ]
  });

  const hucre = (S,i) => {
    const cx=S.w/2,w=S.dar?316:520,x=(S.w-w)/2;
    let s=S.kutu(x,45,w,118,{dolgu:i===0?'accent-soft':'paper',renk:'accent',r:24});
    s+=S.t(cx,72,'TF taşıyan hücre yüzeyi',{a:'middle',c:'b'});
    s+=S.t(cx,104,['TF–VIIa → IXa ve Xa','Xa + Va → az trombin'],{a:'middle'});
    s+=S.ok([[cx,170],[cx,232]],{renk:'accent',w:3});
    s+=S.t(cx+12,194,i===0?'Az trombin':'Hazırlık sinyali',{c:'k'});
    s+=S.kutu(x,243,w,124,{dolgu:i>0?'clin-soft':'paper',renk:'clin',r:28,soluk:i===0});
    s+=S.t(cx,270,'Aktive trombosit yüzeyi',{a:'middle',c:'b'});
    s+=S.t(cx,300,i===0?['Sonraki evreye hazırlık']:i===1?['V ve VIII aktivasyonu','IXa / VIIIa / Xa / Va birikir']:['IXa–VIIIa → Xa','Xa–Va → bol trombin'],{a:'middle'});
    s+=S.t(cx,401,i===2?['Fibrin + XIIIa','Çapraz bağlı pıhtı']:i===1?['Büyük üretim için','faktörler aynı yüzeyde']:['Başlatma','Küçük trombin yanıtı'],{a:'middle',c:'b',renk:i===2?'ok':'ink'});
    return s;
  };
  VIZ.f72_hucre = (el) => SEKIL.adim(el, {
    baslik:'Hücre temelli koagülasyonun üç evresi',vb:[640,450],vbDar:[360,450],oto:false,
    adimlar:[
      {ad:'Başlatma',metin:'TF taşıyan yüzey küçük bir trombin yanıtı üretir ve trombositleri hazırlamaya başlar. [[K1 s. 345–346]]',ciz:S=>hucre(S,0)},
      {ad:'Amplifikasyon',metin:'İlk trombin, trombosit ve faktörleri aktive eder. Aktif trombosit yüzeyi bol trombin üretimi için hazırlanır. [[K1 s. 345–346]]',ciz:S=>hucre(S,1)},
      {ad:'Yayılma',metin:'Aktive trombosit yüzeyinde bol trombin oluşur; fibrin ve XIIIa pıhtıyı sağlamlaştırır. [[K1 s. 346]]',ciz:S=>hucre(S,2)}
    ]
  });

  VIZ.f72_kalitsal = (el) => SEKIL.sahne(el, {
    baslik:'Hemofili A ve von Willebrand hastalığında aksayan işlevler',vb:[640,302],vbDar:[360,302],secenek:sec([['a','Hemofili A'],['v','von Willebrand']]),
    ciz:(S,t,p)=>zincir(S,p.durum==='a' ? [['Faktör VIII eksikliği'],['Trombosit tıkacı oluşur','Fibrin desteği yetersiz'],['Kanama uzar','Eklem / beyin kanaması']] : [['vWF az veya işlevsiz'],['Kollajen–trombosit köprüsü ↓','VIII’in korunması ↓'],['Tıkaç + koagülasyon etkilenir','Mukozal kanama / morarma']],1),
    metin:p=>p.durum==='a'?'VIII eksikliği fibrin desteğini bozar; ağır olguda VIII, uygun hafif olguda DDAVP kullanılır. [[K1 s. 345]]':'vWF’nin iki görevi birlikte aksar; uygun olguda DDAVP, ağır kanamada vWF içeren VIII konsantresi kullanılabilir. [[K1 s. 345]]'
  });

  const testler={
    pt:{s:[['Plazma + doku faktörü'],['Ekstrinsik + ortak yol','VII; II, X ve fibrinojen'],['Ölçüm: pıhtılaşma süresi','PT → INR ile standardizasyon']],m:'PT: varfarin, K vitamini eksikliği, karaciğer hastalığı ve DIC ile uzayabilir; INR’nin ISI düzeltmesi aşağıdaki ilaç notunda verilmiştir. [[K1 s. 346–347]]'},
    aptt:{s:[['Plazma + fosfolipit','Silika gibi temas aktivatörü'],['İntrinsik + ortak yol','VIII, IX, XI, XII; II, X, I'],['Ölçüm: pıhtılaşma süresi','APTT']],m:'APTT: UFH, VIII/IX eksikliği, vWF eksikliğine bağlı VIII düşüklüğü ve DIC ile uzayabilir; DMAH’da çoğunlukla uzamaz. Faktör listeleri kitabın özellikle saydıklarıdır, tam envanter değildir. [[K1 s. 347]]'},
    tt:{s:[['Plazma + trombin'],['Fibrinojen → fibrin'],['Ölçüm: pıhtılaşma süresi','TT']],m:'TT fibrinojen dönüşümünü sınar; fibrinojen eksikliğinde, örneğin DIC’de uzar. [[K1 s. 347]]'},
    kanama:{s:[['Standart kesi'],['Trombosit tıkacı oluşması'],['Ölçüm: kanamanın durması','Kanama zamanı']],m:'Kanama zamanı trombosit işlevini değerlendirir; cerrahi kanamayı öngörmediği için nadiren uygulanır. [[K1 s. 347]]'}
  };
  VIZ.f72_test = (el) => SEKIL.sahne(el, {
    baslik:'Pıhtılaşma testlerinde reaktif ve ölçülen işlev',vb:[640,302],vbDar:[360,302],secenek:sec([['pt','PT'],['aptt','APTT'],['tt','TT'],['kanama','Kanama zamanı']]),
    ciz:(S,t,p)=>zincir(S,testler[p.durum].s,1),metin:p=>testler[p.durum].m
  });

  const ilac={
    v:{s:[['Varfarin','K vitamini antagonizması'],['İşlevsel II, VII, IX, X ↓','Protein C ve S ↓'],['Ağır kanamada geri döndürme','K vitamini + PCC']],m:'Varfarin PT/INR ile izlenir; mekanik kapakta kitabın belirttiği oral seçenektir. [[K1 s. 347]]'},
    d:{s:[['Dabigatran'],['Doğrudan trombin inhibisyonu'],['Geri döndürme seçenekleri','İdarusizumab / hemodiyaliz']],m:'Dabigatran trombini hedefler; idarusizumab özgül geri döndürücüdür, hemodiyaliz de kitapta belirtilir. [[K1 s. 347–348]]'},
    x:{s:[['Rivaroksaban / apiksaban','Edoksaban'],['Doğrudan Xa inhibisyonu'],['2019: andeksanet dipnotu','Rivaroksaban / apiksaban']],m:'Andeksanet dipnotu tarihseldir; güncelleme aşağıdadır, kitap edoksaban için geri döndürücü eşleştirmez. [[K1 s. 347–348]]'}
  };
  VIZ.f72_antikoagulan = (el) => SEKIL.sahne(el, {
    baslik:'Oral antikoagülanların hedefleri ve kitapta belirtilen geri döndürücüler',vb:[640,302],vbDar:[360,302],secenek:sec([['v','Varfarin'],['d','Dabigatran'],['x','Xa inhibitörleri']]),
    ciz:(S,t,p)=>zincir(S,ilac[p.durum].s,1),metin:p=>ilac[p.durum].m
  });

  const tegCiz=(S,i)=>{
    const cx=S.w/2,left=30,right=S.w-26,mid=255, end=[0.34,0.72,1][i];
    let s=S.kutu(cx-132,18,264,76,{yazi:['Dönen küvet ↔ fibrin ↔ pim','Teldeki burulma ölçülür'],renk:'basic',dolgu:'basic-soft'});
    s+=S.t(left,132,'Pıhtının mekanik gücü',{c:'b'});
    s+=S.cizgi([[left,mid],[right,mid]],{renk:'line',kesik:true});
    s+=S.ok([[left,359],[right,359]],{renk:'muted'})+S.t(right,384,'Zaman (şematik)',{a:'end'});
    const ust=[],alt=[];
    for(let k=0;k<=100;k++) {const u=k/100;if(u>end)break;const gen=u<0.18?0:u<0.6?75*(1-Math.exp(-(u-0.18)*9)):75*Math.exp(-(u-0.6)*2.2);const x=left+u*(right-left);ust.push([x,mid-gen]);alt.push([x,mid+gen]);}
    s+=S.cizgi(ust,{renk:'accent',w:3})+S.cizgi(alt,{renk:'accent',w:3});
    s+=S.t(cx,424,[['Başlama gecikmesi','İz henüz dar'],['Pıhtı güçlenir','İzin açıklığı artar'],['Fibrinoliz','İzin açıklığı azalır']][i],{a:'middle',c:'b'});
    return s;
  };
  VIZ.f72_teg=(el)=>SEKIL.adim(el,{
    baslik:'Tromboelastogramın şematik oluşumu',vb:[640,470],vbDar:[360,470],oto:false,
    adimlar:[
      {ad:'Başlangıç',metin:'Fibrin küvet ile pimi bağlayana kadar iletilen burulma düşüktür. [[K1 s. 348]]',ciz:S=>tegCiz(S,0)},
      {ad:'Güçlenme',metin:'Güçlenen fibrin bağlantıları tele daha çok burulma aktarır; iz genişler. [[K1 s. 348]]',ciz:S=>tegCiz(S,1)},
      {ad:'Çözülme',metin:'Fibrinolizde iz daralır; şematik çizimden sayısal klinik eşik çıkarılamaz. [[K1 s. 348]]',ciz:S=>tegCiz(S,2)}
    ]
  });

  VIZ.f72_fibrinoliz = (el) => SEKIL.sahne(el, {
    baslik:'Fibrinoliz yolunda trombolitik ve antifibrinolitik etkiler',vb:[640,440],vbDar:[360,440],
    secenek:sec([['dogal','Fizyolojik'],['tromboliz','Tromboliz'],['txa','Traneksamik asit']]),
    ciz:(S,t,p)=>{
      const cx=S.w/2,w=S.dar?308:480,x=(S.w-w)/2;
      let s=S.kutu(x,15,w,62,{yazi:['Karaciğer → plazminojen','Pıhtı ağına katılır'],dolgu:'basic-soft',renk:'basic'});
      s+=S.ok([[cx,82],[cx,162]],{renk:p.durum==='txa'?'line':'accent',kesik:p.durum==='txa'});
      s+=S.t(cx+13,108,p.durum==='txa'?['TXA','inhibe eder']:p.durum==='tromboliz'?['Alteplaz /','streptokinaz ↑']:['Endotel','t-PA'],{c:'b'});
      if(p.durum==='txa')s+=S.cizgi([[cx-12,124],[cx+12,124]],{renk:'crit',w:4});
      s+=S.kutu(x,172,w,55,{yazi:'Plazmin',dolgu:'accent-soft',renk:'accent'});
      s+=S.ok([[cx,232],[cx,267]],{renk:'accent'});
      const boz=p.durum==='txa'?0:p.durum==='tromboliz'?4:2;
      for(let k=0;k<5;k++) {
        s+=S.cizgi([[cx-115,282+k*13],[cx+(k<boz?-20:115),334-k*13]],{renk:'ok',w:2});
        if(k<boz)s+=S.cizgi([[cx+62,282+k*13],[cx+90,292+k*13]],{renk:'warn',w:2});
      }
      s+=S.t(cx,375,p.durum==='txa'?['Fibrin ağı daha çok korunur','Fibrinoliz ↓']:['Çapraz bağlı fibrin yıkılır','FDP → D-dimer dahil'],{a:'middle',c:'b'});
      return s;
    },
    metin:p=>p.durum==='txa'?'Traneksamik asit plazminojen aktivasyonunu engeller; oluşmuş fibrin ağının çözülmesini azaltır. [[K1 s. 348–349]]':p.durum==='tromboliz'?'Alteplaz ve streptokinaz plazmin oluşumunu artırarak mevcut fibrini çözer. [[K1 s. 348]]':'Endotel t-PA’sı plazmin oluşumunu sağlar; yavaş fibrinoliz iyileşmeye zaman bırakır. [[K1 s. 348]]'
  });
})();
