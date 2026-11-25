(function () {
  'use strict';
  const VIZ = window.VIZ;

  // Aynı mekanizmanın seçeneklerini sabit konumlarda karşılaştır.
  function secim(el, baslik, durumlar, ciz) {
    return SEKIL.sahne(el, {
      baslik, vb:[640,240], vbDar:[360,280],
      secenek:{id:'durum', ad:baslik, liste:Object.keys(durumlar).map(ad => ({d:ad, ad}))},
      ciz:(S, t, p) => ciz(S, durumlar[p.durum], p.durum),
      metin:p => durumlar[p.durum].metin
    });
  }

  // Yatay neden-sonuç dizisi telefonda yukarıdan aşağı okunur.
  function yol(S, etiketler) {
    const dar = S.dar, w = dar ? 306 : 190, h = 66;
    return etiketler.map((yazi, i) => {
      const x = dar ? 27 : 7 + i * 218, y = dar ? 12 + i * 94 : 80;
      const renk = ['basic','accent','clin'][i];
      const ok = i === 0 ? '' : S.ok(dar ? [[180,y-28],[180,y-2]] : [[x-28,113],[x-2,113]], {renk:'muted'});
      return ok + S.kutu(x,y,w,h,{renk,dolgu:renk+'-soft',yazi});
    }).join('');
  }

  function akisSec(el, baslik, durumlar) {
    return secim(el, baslik, durumlar, (S, durum) => yol(S, durum.yol));
  }

  VIZ.a10b_kodein = el => akisSec(el, 'CYP2D6 ile metabolizma hızı', {
    'Yavaş':{
      yol:[['Kodein','O-demetilasyon'],['Az morfin','oluşumu'],['Ağrıda çok az','hafifleme']],
      metin:'CYP2D6 indüklenemez ve genetik polimorfizm gösterir. [[K3 s. 146]] Yavaş metabolize edenlerin oranı Birleşik Krallık’ta %9, Hong Kong’daki Çinli nüfusta %30 olarak tahmin edilir. [[K3 s. 146]]'
    },
    'Hızlı':{
      yol:[['Kodein','O-demetilasyon'],['Daha fazla','morfin'],['Morfine bağlı','yan etkiler']],
      metin:'Hızlı metabolize edenler daha fazla morfin oluşturur, bu da ilişkili yan etkileri artırır. [[K3 s. 146]]'
    }
  });

  VIZ.a10b_infuzyon = el => akisSec(el, 'Uygulama biçimi ve etki süresi', {
    'Fentanil · düşük bolus':{
      yol:[['Düşük İV doz','&lt;3 µg/kg'],['Dokulara','dağılım'],['Kısa etki']],
      metin:'Fentanilin küçük intravenöz dozundan sonra kısa etki süresini yalnız dağılım belirler. [[K3 s. 147]]'
    },
    'Fentanil · uzun infüzyon':{
      yol:[['Uzun infüzyon'],['Dokular','doygun'],['Eliminasyon','belirleyici']],
      metin:'Yüksek doz veya uzun uygulama dokuları doyurur ve etkiyi uzatır. [[K3 s. 147]] Uzun süreli sürekli infüzyondan sonra eliminasyon yarı ömrü belirleyici hale gelir. [[K3 s. 147]]'
    },
    'Alfentanil · infüzyon':{
      yol:[['Alfentanil'],['Sedasyon için','infüzyon'],['Belirgin uzayan','etki süresi']],
      metin:'Kısa analjezi için bolus verilen alfentanilin etkisi, sedasyon amacıyla infüze edildiğinde belirgin uzar. [[K3 s. 148]]'
    },
    'Remifentanil · infüzyon':{
      yol:[['Uzun infüzyon'],['Plazma ve doku','esterazları'],['Hızlı yıkım','t½ 3–10 dk']],
      metin:'Bol bulunan nonspesifik esterazlar nedeniyle süreyi metabolizma belirler, eliminasyon yarı ömrü 3–10 dakikadır. [[K3 s. 149]] Diğer opioidlerin aksine infüzyon süresi bağlama duyarlı yarılanma süresini anlamlı değiştirmez. [[K3 s. 149]]'
    }
  });

  VIZ.a10b_ilkgecis = el => akisSec(el, 'Oral kombinasyonda ilaç yolu', {
    'Oksikodon':{
      yol:[['Bağırsaktan','emilim'],['Biyoyararlanım','%85'],['Sistemik','analjezi']],
      metin:'Oksikodon bağırsaktan emilir ve oral dozun %85’i sistemik dolaşıma ulaşır. [[K3 s. 149]]'
    },
    'Nalokson':{
      yol:[['Bağırsakta','yerel etki'],['Emilim ve güçlü','hepatik ilk geçiş'],['Sistemik','etki yok']],
      metin:'Emilen nalokson belirgin ilk geçiş metabolizmasına uğrar. [[K3 s. 149]] Karaciğere ulaşmadan önce bağırsaktaki yerel etkisiyle konstipasyonu azaltıyor görünür. [[K3 s. 149–150]]'
    }
  });

  VIZ.a10b_birikim = el => akisSec(el, 'Petidin ve norpetidin birikimi', {
    'Fetüs':{
      yol:[['Petidin','plasentayı geçer'],['Daha az lipofilik','norpetidin'],['Fetüste birikim','doruk ≈ 4 saat']],
      metin:'Doğum eyleminde sık kullanılan lipofilik petidin fetüse önemli miktarda geçer. [[K3 s. 150]] Fetal norpetidin, annenin ilk intramüsküler dozundan yaklaşık 4 saat sonra doruğa ulaşır. [[K3 s. 150]] Düşük fetal klirens iki ilacın da yarı ömrünü üç katına çıkarır. [[K3 s. 150]]'
    },
    'Böbrek yetmezliği':{
      yol:[['Petidin','N-demetilasyon'],['Norpetidin','birikimi'],['Halüsinasyon','grand mal nöbet']],
      metin:'Böbrek yetmezliğinde biriken norpetidin, halüsinasyon ve grand mal nöbetlerle ilişkilendirilmiştir. [[K3 s. 150]] Nalokson norpetidinin etkilerini geri döndüremez. [[K3 s. 150]]'
    }
  });

  // Paralel etki yollarını bir neden-sonuç dizisine dönüştürmeden göster.
  function satirlar(S, basliklar, degerler) {
    return basliklar.map((ad, i) => {
      const x = 12, y = (S.dar ? 10 : 16) + i * (S.dar ? 89 : 75);
      const renk = ['basic','accent','clin'][i];
      return S.kutu(x,y,S.w-2*x,S.dar ? 80 : 64,{renk,dolgu:renk+'-soft'})
        + S.t(S.dar ? S.w/2 : 32,y+(S.dar ? 24 : 38),ad,{c:'b',a:S.dar ? 'middle' : 'start'})
        + S.t(S.dar ? S.w/2 : 300,y+(S.dar ? 52 : 38),degerler[i],{a:S.dar ? 'middle' : 'start'});
    }).join('');
  }

  VIZ.a10b_ikiliyol = el => secim(el, 'Opioid ve monoamin etkileri', {
    'Tramadol':{
      etkiler:['Tümünde agonist, özellikle µ','Geri alım azalır',['Geri alım azalır,','presinaptik salım artar']],
      metin:'Tramadol opioid reseptörlerini uyarırken noradrenalin ile 5-HT geri alımını azaltır ve presinaptik 5-HT salımını artırır. [[K3 s. 151]]'
    },
    'Tapentadol':{
      etkiler:['µ agonisti','Geri alım azalır','Zayıf geri alım inhibisyonu'],
      metin:'Tapentadolün iki temel etkisi µ agonizması ve noradrenalin geri alım inhibisyonudur, serotonin geri alımına etkisi zayıftır. [[K3 s. 152]]'
    }
  }, (S, durum) => satirlar(S,['Opioid reseptörleri','Noradrenalin','Serotonin (5-HT)'],durum.etkiler));

  VIZ.a10b_reseptor = el => secim(el, 'Agonist ve antagonist etkiler', {
    'Nalokson':{etkiler:['Yok','µ, κ, δ'],metin:'Nalokson saf antagonisttir ve en yüksek afinitesi µ reseptörünedir. [[K3 s. 152]]'},
    'Nalorfin':{etkiler:['κ','µ'],metin:'Nalorfin κ reseptörünü uyarır ve µ reseptöründe antagonist etki gösterir. [[K3 s. 153]]'},
    'Pentazosin':{etkiler:['κ ve δ parsiyel','µ'],metin:'Pentazosin κ ve δ reseptörlerinde parsiyel agonist, µ reseptöründe antagonisttir. [[K3 s. 153]]'},
    'Buprenorfin':{etkiler:[['µ parsiyel','NOP parsiyel, çok zayıf'],'κ ve δ'],metin:'Buprenorfinin µ ve çok zayıf NOP parsiyel agonizmasına κ ve δ antagonizması eşlik eder. [[K3 s. 153]]'},
    'Nalbufin':{etkiler:['κ parsiyel','µ parsiyel'],metin:'Nalbufinin κ reseptöründeki agonizması da µ reseptöründeki antagonizması da parsiyeldir. [[K3 s. 153]]'}
  }, (S, durum) => satirlar(S,['Agonist etki','Antagonist etki'],durum.etkiler));
})();
