(function () {
  'use strict';
  const VIZ = window.VIZ;
  const center = { a: 'middle', c: 'b' };

  // Seçenekle değişen mekanizmayı yukarıdan aşağıya okut.
  function yollar(el, baslik, ad, durumlar) {
    return SEKIL.sahne(el, {
      baslik, vb: [640, 230], vbDar: [360, 230],
      secenek: { id: 'sec', ad, liste: Object.keys(durumlar).map(d => ({ ad: d, d })) },
      ciz: (S, t, p) => durumlar[p.sec].slice(0, 3).map((yazi, i) => {
        const y = 8 + i * 80, x = S.w / 2;
        return (i ? S.ok([[x, y - 18], [x, y - 3]], { renk: 'muted' }) : '') +
          S.kutu(x - 150, y, 300, 58, { yazi, renk: i === 2 ? 'accent' : 'basic', dolgu: i === 2 ? 'accent-soft' : 'basic-soft' });
      }).join(''),
      metin: p => durumlar[p.sec][3],
    });
  }

  VIZ.a15a_potansiyel = el => {
    const egri = [[30,145],[95,145],[100,34],[119,55],[201,65],[233,140],[250,145],[324,141]];
    const dugum = [[30,145],[65,130],[108,98],[147,76],[166,35],[180,26],[202,51],[240,140],[266,146],[324,120]];
    const fazlar = [
      ['SA düğümü', 'Eşik −40 mV', 'Ön potansiyelde içe Ca²⁺ iletkenliği artar. [[K3 s. 238]] Eşikte yavaş L kanalları açılırken Na⁺ iletkenliği çok az değişir. [[K3 s. 238]] Ca²⁺ kanalları kapanıp K⁺ iletkenliği artınca hücre repolarize olur. [[K3 s. 238]]'],
      ['Faz 0', 'Hızlı yükseliş', 'Voltaj kapılı Na⁺ kanallarıyla depolarizasyon 1 milisaniyeden kısa sürer. [[K3 s. 238]] Bir miktar Ca²⁺ katkısı da olabilir. [[K3 s. 238]]'],
      ['Faz 1', 'Erken düşüş', 'Na⁺ kanalları kapanır. [[K3 s. 238]] Kitap bu evrede Cl⁻ çıkışı tarif eder. [[K3 s. 238]]'],
      ['Faz 2', 'Plato', 'L kanallarından Ca²⁺ girişi platoyu 150 milisaniyeye kadar sürdürür. [[K3 s. 238]] Mutlak refrakter dönemde yeni depolarizasyon oluşamaması miyokart tetanisini önler. [[K3 s. 238]]'],
      ['Faz 3', 'Repolarizasyon', 'Ca²⁺ kanalları inaktive olurken K⁺ iletkenliği artar ve potansiyel istirahat değerine döner. [[K3 s. 238]] Rölatif refrakter dönemde kasılma için daha güçlü uyarı gerekir. [[K3 s. 238]]'],
      ['Faz 4', 'İstirahat ≈ −80 mV', 'Na⁺/K⁺ ATPaz iyon gradyanlarını korur. [[K3 s. 238]] Kontraktil hücrede spontan diyastolik depolarizasyon değişken düzeydedir. [[K3 s. 238]]'],
    ];
    return SEKIL.adim(el, { baslik: 'Doku ve faza göre aksiyon potansiyeli', vb: [360,205], vbDar: [360,205], oto: false,
      adimlar: fazlar.map(([ad, etiket, metin], i) => ({ ad, metin, ciz: S => {
        const aralik = [[3,5],[1,2],[2,3],[3,4],[4,6],[6,7]][i];
        const yol = i ? egri : dugum;
        return S.cizgi(yol, { renk: 'muted', w: 3 }) +
          S.cizgi(yol.slice(aralik[0], aralik[1]+1), { renk: 'accent', w: 6 }) +
          (i === 0 ? S.daire(147,76,5,{renk:'accent',dolgu:'accent'}) : '') +
          S.t(180,185,etiket,center);
      }})),
    });
  };

  VIZ.a15a_devre = el => {
    const evreler = [
      ['Normal uyarı', 'İki yol da açık', 'Normal atriyal impuls iki kola ayrılır ve ortak yola önce hızlı koldan ulaşır. [[K3 s. 240]]'],
      ['Geç varış', 'Ortak yol refrakter', 'Yavaş koldan gelen uyarı ortak yolu refrakter bulur ve söner. [[K3 s. 240]] Yavaş kol hızlı koldan önce yeniden uyarılabilir. [[K3 s. 240]]'],
      ['Erken uyarı', 'Hızlı yol refrakter', 'Prematüre impuls hızlı kol hâlâ refrakterken gelirse yalnız yavaş koldan iner. [[K3 s. 240]]'],
      ['Geri dönüş', 'Hızlı yolda geri iletim', 'Geciken impuls ortak yoldan ventriküle geçebilir ve toparlanan hızlı koldan atriyuma doğru dönebilir. [[K3 s. 240]]'],
      ['Yeni tur', 'Yavaş yol yeniden açık', 'Yavaş kol kısa refrakter dönemi tamamladığında geri dönen impuls buraya yeniden girebilir ve taşikardi kendi kendini sürdürebilir. [[K3 s. 240]]'],
    ];
    return SEKIL.adim(el,{baslik:'AV düğümde impulsun yolu',vb:[360,255],vbDar:[360,255],oto:false,
      adimlar:evreler.map(([ad,etiket,metin],i)=>({ ad,metin,ciz:S=>{
        const hizli=[[180,45],[87,80],[87,137],[180,171]];
        const yavas=[[180,45],[273,80],[273,137],[180,171]];
        function kol(yol, etkin, geri) {
          if (!etkin) return S.cizgi(yol,{renk:'line',w:3,kesik:true});
          const pts=geri ? [...yol].reverse() : yol;
          return S.ok(pts,{renk:'accent',w:4});
        }
        return S.t(180,27,'Atriyal impuls',center) + kol(hizli,i===0 || i>=3,i>=3) +
          kol(yavas,true,false) + S.t(45,115,'Hızlı',center) + S.t(313,115,'Yavaş',center) +
          (i===1 ? S.t(180,195,'İleti sonlanır',center) : i===2 ? '' : S.ok([[180,171],[180,198]],{renk:'basic'})) +
          S.t(180,225,etiket,center) +
          (i===0 || i>=3 ? S.t(210,198,'Ventrikül',{c:'k'}) : '');
      }})),
    });
  };

  VIZ.a15a_sinif = el => yollar(el,'Sınıf I içinde refrakter dönem','Alt sınıf',{
    Ia:['Na⁺ kanal blokajı','Refrakter dönem uzar',['Kinidin · prokainamid','disopiramid'],'Ia ilaçları kalp kasının yeniden uyarılabilmesi için gereken süreyi uzatır. [[K3 s. 241]]'],
    Ib:['Na⁺ kanal blokajı','Refrakter dönem kısalır',['Lidokain · meksiletin','fenitoin'],'Ib ilaçlarında aynı süre kısalır. [[K3 s. 241]]'],
    Ic:['Na⁺ kanal blokajı','Refrakter dönem değişmez','Flekainid · propafenon','Ic ilaçları refrakter dönem üzerinde etkisizdir. [[K3 s. 241]]'],
  });

  VIZ.a15a_digoksin = el => yollar(el,'Digoksinin kalpteki hedefleri','Etki yolu',{
    'Miyosit':['Na⁺/K⁺ ATPaz inhibisyonu','Hücre içinde Na⁺ ↑ ve K⁺ ↓','Kullanılabilir Ca²⁺ ↑','Digoksin pompaya bağlandığında hücre içi Na⁺ artar. [[K3 s. 241]] Kitap, dışarıdaki Ca²⁺ ile değişimin arttığını ve içeride daha çok Ca²⁺ kullanılabildiğini belirtir. [[K3 s. 241]]'],
    'AV düğüm ve His':['Doğrudan etki','İleti yavaşlar','Refrakter dönem uzar','Doğrudan etki hem AV düğümde hem His demetinde görülür. [[K3 s. 241]]'],
    'Vagal etki':['Asetilkolin salınımı ↑','Kardiyak muskarinik etki','İleti daha da yavaşlar','Muskarinik reseptörlerde artan asetilkolin (ACh) salınımı AV düğüm ve His demetinin refrakter dönemini daha da uzatır. [[K3 s. 241]]'],
  });

  VIZ.a15a_adenozin = el => yollar(el,'Adenozin sonrası ritim','Başlangıç ritmi',{
    'Nodal re-entry':['Devrede AV düğüm var','AV düğümde ileti yavaşlar','Sinüs ritmi geri dönebilir','Adenozin, AV düğüme bağımlı re-entry devresini kesebilir. [[K3 s. 243]]'],
    'AF / flutter':['Devre AV düğüme bağımlı değil','Ventrikül yanıtı yavaşlar','EKG tanısı kolaylaşır','Atriyal fibrilasyon ve flutter adenozinle sinüse dönmez. [[K3 s. 243]]'],
    'VT':['Ventriküler taşikardi','Hız yavaşlamaz','SVT ile ayrım','Kitap SVT’de en azından geçici yavaşlama, VT’de ise hızın korunmasını tarif eder. [[K3 s. 243]]'],
  });
  VIZ.a15a_verapamil = el => yollar(el,'L tipi kanal blokajı','Doku',{
    'Düğüm':['SA ve AV düğüm','Yavaş Ca²⁺ girişi ↓','Otomatisite ↓','Verapamil nodal otomatisiteyi azaltır ve AV düğümde iletimi yavaşlatır. [[K3 s. 244]]'],
    'Miyokart':['Kontraktil doku','Faz 2 platosu','Ca²⁺ girişi ↓','Kontraktil dokudaki etki düğümdekinden çok daha zayıftır. [[K3 s. 244]]'],
    'Damar':['Vasküler düz kas','Gevşeme','Hipotansiyon olabilir','Koroner ve serebral arterler genişler. [[K3 s. 244]]'],
  });
  VIZ.a15a_beta = el => yollar(el,'β-blokajın etkileri','Hedef',{
    'Hız':['Katekolamin etkisi azalır','Faz 4 uzar','Bradikardi','Diyastolik depolarizasyonun uzaması hızı düşürür. [[K3 s. 245]]'],
    'İleti':['β-adrenoseptör blokajı','AV ileti süresi uzar','Ventrikül hız kontrolü','Paroksismal SVT ve AF’de amaç hız kontrolüdür. [[K3 s. 245]]'],
    'Kasılma':['β-adrenoseptör blokajı','Kontraktilite azalır','Kalp yetmezliği riski','Kitap, ventrikül işlevi bozuksa negatif inotropi nedeniyle bu ilaçlardan kaçınılmasını önerir. [[K3 s. 245]]'],
  });
  VIZ.a15a_kinidin = el => yollar(el,'Kinidinin etkileri','Etki',{
    'Na⁺ kanalı':['Sınıf Ia blokaj','Faz 0 yükselişi yavaşlar','Refrakter dönem uzar','Eşik potansiyel yükselir. [[K3 s. 246]] Kitap aksiyon potansiyeli süresini değişmemiş olarak verir. [[K3 s. 246]]'],
    'Vagal tonus':['Vagal tonus antagonize edilir','Vagolitik etki','Sinüs taşikardisi olabilir','Kitap sinüs taşikardisini vagolitik etkiye bağlar. [[K3 s. 246]]'],
    'AF / flutter':['AV ileti önceden yavaşlatılmazsa','AV iletisi artabilir','Ventrikül hızı atriyal hıza ulaşabilir','Bu yüzden önce β-bloker, Ca²⁺ kanal antagonisti veya digoksin verilir. [[K3 s. 246]]'],
  });
})();
