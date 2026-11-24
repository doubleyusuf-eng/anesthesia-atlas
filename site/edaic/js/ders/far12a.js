(function () {
  'use strict';
  const VIZ = window.VIZ;
  const orta = {a:'middle', c:'b'};
  const boyut = {vb:[560,240], vbDar:[340,240]};
  VIZ.a12a_uc = el => SEKIL.sahne(el, {
    ...boyut, baslik:'Kas yüzeyindeki tek veya dağınık sinir terminalleri',
    secenek:{id:'tip', ad:'İnnervasyon', liste:[{d:'plaque',ad:'En plaque'},{d:'grappe',ad:'En grappe'}]},
    ciz:(S,t,p) => {
      const tek = p.tip === 'plaque', merkez = S.w/2;
      const uclar = tek ? [merkez] : [0.18,0.38,0.62,0.82].map(f => f*S.w);
      let s = S.kutu(14,148,S.w-28,66,{dolgu:'clin-soft',renk:'clin',yazi:'Kas lifi'});
      s += S.t(merkez,32,tek?'Hızlı Aα':'Daha yavaş Aγ',orta);
      uclar.forEach(x => {
        s += S.cizgi([[x-18,54],[x,90],[x,143]],{renk:'basic',w:4});
        s += S.daire(x,145,7,{dolgu:'basic',renk:'basic'});
      });
      return s;
    },
    metin:p => p.tip === 'plaque' ? 'Ortadaki tek temas noktasını bulun. [[K3 s. 182]]' : 'Kas yüzeyine dağılmış uçları izleyin. [[K3 s. 182]]'
  });

  const yol = [
    {ad:'Sentez', neden:'Asetil-koenzim A + kolin', yer:'Aksoplazma', sonuc:'Vezikülde ACh deposu', metin:'Aksoplazmada yapılan ACh, salınıma kadar vezikülde saklanır. [[K3 s. 182]]'},
    {ad:'Salınım', neden:'Sinir terminaline gelen impuls', yer:'Ca²⁺ girişi', sonuc:'Veziküler ACh salınımı', metin:'Terminale giren Ca²⁺ proteinlerle birleşerek vezikül içeriğinin salınmasını tetikler. [[K3 s. 182]]'},
    {ad:'Kanal', neden:'İki α alt birimine ACh bağlanması', yer:'Merkezi kanal açılır', sonuc:'Na⁺, K⁺ ve Ca²⁺ geçişi', metin:'Nikotinik reseptörün seçici olmayan iyon kanalından geçen akım minyatür son plak potansiyeli oluşturur. [[K3 s. 182–183]]'},
    {ad:'Eşik', neden:'Minyatür potansiyellerin toplamı', yer:'Eşik potansiyel', sonuc:'Voltaj kapılı Na⁺ kanalları açılır', metin:'Eşikte açılan Na⁺ kanalları hızlı depolarizasyona yol açar ve aksiyon potansiyeli kas yüzeyine yayılır. [[K3 s. 183]]'},
    {ad:'Kasılma', neden:'Aksiyon potansiyeli T tübülünde', yer:'Sarkoplazmik retikulum', sonuc:'Ca²⁺ salınımı → kasılma', metin:'Uyarı T tübülüne ulaştığında retikulumdan çıkan Ca²⁺ kasılmayı başlatır. [[K3 s. 183]]'}
  ];
  VIZ.a12a_dongu = el => SEKIL.adim(el,{
    ...boyut, oto:false, baslik:'Sinir impulsu ile kasılma arasındaki basamaklar',
    adimlar:yol.map(({ad,neden,yer,sonuc,metin}) => ({
      ad,metin,ciz:S => {
        const x = S.w/2;
        return S.kutu(8,8,S.w-16,50,{yazi:neden,dolgu:'basic-soft'})
          + S.ok([[x,60],[x,84]],{renk:'basic'})
          + S.kutu(22,88,S.w-44,50,{yazi:yer,dolgu:'accent-soft'})
          + S.ok([[x,140],[x,164]],{renk:'accent'})
          + S.kutu(8,168,S.w-16,50,{yazi:sonuc,dolgu:'clin-soft'});
      }
    }))
  });

  // Boyutlar çizim koordinatlarıdır. Sönme nitel gösterilir.
  function segirmeler(S, x, y, genislik, yukseklikler) {
    let s = S.cizgi([[x,y],[x+genislik,y]],{renk:'line'});
    yukseklikler.forEach((h,i) => {
      const konum = x+(i+0.5)*genislik/yukseklikler.length;
      s += S.cizgi([[konum-5,y],[konum,y-h],[konum+5,y]],{renk:'clin',w:3});
    });
    return s;
  }
  const yanit = {
    kontrol:{once:[45,45,45,45], tetani:[56,56], sonra:[45,45,45,45], metin:'Kas gevşetici verilmemiş kontrol dizisini iki kısmi blokla karşılaştırın. [[K3 s. 184]]'},
    dep:{once:[24,24,24,24], tetani:[32,32], sonra:[24,24,24,24], metin:'Kısmi depolarizan blokta seğirmeler eşit küçülür, tetanik yanıt düşük kalır ve tetani sonrası güçlenme görülmez. [[K3 s. 184–185]]'},
    non:{once:[32,26,20,14], tetani:[42,15], sonra:[48,40,32,24], metin:'Kısmi nondepolarizan blokta hem TOF hem tetani söner ve tetaniden sonraki TOF geçici olarak güçlenir. [[K3 s. 184–185]]'}
  };
  VIZ.a12a_sonme = el => SEKIL.sahne(el,{
    ...boyut, baslik:'TOF, tetani ve yeniden TOF ile kas yanıtı',
    secenek:{id:'blok',ad:'Blok türü',liste:[{d:'kontrol',ad:'Kontrol'},{d:'dep',ad:'Depolarizan'},{d:'non',ad:'Nondepolarizan'}]},
    metin:p => yanit[p.blok].metin,
    ciz:(S,t,p) => {
      const v = yanit[p.blok], w = (S.w-32)/3, y = 151, sol = 10+w;
      return S.t(S.w/2,32,'Kasılma kuvveti',orta)
        + segirmeler(S,4,y,w,v.once)
        + S.cizgi([[sol,y],[sol+w,y]],{renk:'line'})
        + S.cizgi([[sol+6,y],[sol+10,y-v.tetani[0]],[sol+w-10,y-v.tetani[1]],[sol+w-6,y]],{renk:'basic',w:3})
        + segirmeler(S,sol+w+8,y,w,v.sonra)
        + S.t(4+w/2,184,'TOF',orta) + S.t(sol+w/2,184,'Tetani',orta)
        + S.t(sol+w*1.5+8,184,['Tekrarlanan','TOF'],orta);
    }
  });

  const basamaklar = [
    {ad:'>%70', etiket:'T4 küçülmeye başlar', t1:88,t4:80,metin:'Reseptör işgali %70’i geçince ilk değişiklik dördüncü yanıtta görülür. [[K3 s. 186]]'},
    {ad:'%75–80', etiket:'T1 küçülmeye başlar',t1:88,t4:66,metin:'T4 başlangıca göre %25 azaldığında T1 küçülmeye başlar ve işgal %75–80 düzeyindedir. [[K3 s. 186]]'},
    {ad:'>%90', etiket:'T4 kaybolur',t1:22,t4:0,metin:'T4 kaybolduğunda işgal %90’ı aşmıştır ve T1 başlangıç yüksekliğinin yaklaşık %25’ine inmiştir. [[K3 s. 186]]'},
    {ad:'%95', etiket:'Yalnız T1 kalır',t1:14,t4:0,metin:'%95 işgalde dört uyarıdan yalnız ilki yanıt oluşturur ve TOF sayımı birdir. [[K3 s. 186]]'}
  ];
  VIZ.a12a_tof = el => SEKIL.adim(el,{
    ...boyut,oto:false,baslik:'Reseptör işgaline göre ilk ve dördüncü yanıt',
    adimlar:basamaklar.map(({ad,etiket,t1,t4,metin}) => ({
      ad,metin,ciz:S => {
        const x = S.w/2, taban = 173;
        let s = S.t(x,28,'Reseptör işgali '+ad,orta) + S.t(x,57,etiket,orta);
        [t1,t4].forEach((h,i) => {
          const sol = x+(i?46:-80);
          s += S.cizgi([[sol-12,taban],[sol+46,taban]],{renk:'muted'});
          if(h) s += S.kutu(sol,taban-h,34,h,{dolgu:i?'clin':'basic',r:2});
          s += S.t(sol+17,taban+30,i?'T4':'T1',orta);
        });
        return s;
      }
    }))
  });
})();
