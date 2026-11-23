/* Fizyoloji Ek ders (Bölüm 45 ardından) · EEG, uyarılmış potansiyeller ve uyku
   (K2 = Kam & Power, Principles of Physiology for the Anaesthetist, 3. baskı, İngilizce özgün s. 63–65; K1 s. 196 çapraz).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi kaynak sayfa işaretiyle özgün sayfaya bağlıdır. Bileşen tarifleri: docs/tasarim/fizek45.md */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fizek45-1'] = {
  no: 1, kok: 'EEG\'nin oluşumu ve frekans bantları için:', kagit: 'Paper A · fizyoloji, Ek ders · Bölüm 45 ardından', kaynak: '[[K2 s. 63–64]]',
  onermeler: [
    { t: 'EEG potansiyelleri başlıca piramidal hücre aksonlarındaki aksiyon potansiyellerinden doğar.', d: false, n: 'Yanlış. EEG, korteks yüzeyine dik uzanan piramidal hücre dendritlerindeki postsinaptik potansiyellerin (EPSP ve IPSP) cebirsel toplamıdır; tek bir nöronun depolarizasyonu kafa derisinden algılanamayacak kadar küçüktür. [[K2 s. 63]] [[K1 s. 196]]' },
    { t: 'α dalgaları 8–13 Hz\'dir ve en belirgin olarak uyanık, dinlenen, gözleri kapalı kişinin parieto-oksipital bölgesinde görülür.', d: true, n: 'Doğru. Genlikleri yaklaşık 50 μV\'tur ve iki hemisferde simetriktir; zihinsel etkinlik ya da uyarı α ritmini bozar. [[K2 s. 64]]' },
    { t: 'β dalgaları gözler kapanınca kaybolur.', d: false, n: 'Yanlış. β dalgaları (> 13 Hz, 50 μV\'tan küçük) frontal bölgede, simetrik olarak bulunur ve göz kapamadan etkilenmez. [[K2 s. 64]]' },
    { t: 'Retiküler formasyondan gelen uyarılar talamusun ritmik etkinliğini keserek kortikal dalgaları desenkronize eder.', d: true, n: 'Doğru. EEG ritmi talamik çekirdeklerin ritmik deşarjlarından doğar; retiküler uyarı bu ritmi bozar ve uyanıklığın düşük voltajlı, asenkron trasesini oluşturur. [[K2 s. 63–64]]' },
    { t: 'Erişkinde θ dalgaları duygusal stres sırasında ortaya çıkabilir.', d: true, n: 'Doğru. θ dalgaları (4–8 Hz) çocuklarda parietal ve temporal bölgelerde görülür; erişkinde duygusal streste belirebilir. [[K2 s. 64]]' },
  ],
};
VERI.sorular['fizek45-2'] = {
  no: 2, kok: 'Anormal EEG ve serebral iskemi için:', kagit: 'Paper A · fizyoloji, Ek ders · Bölüm 45 ardından', kaynak: '[[K2 s. 64]]',
  onermeler: [
    { t: 'Kritik serebral kan akımı, altına inildiğinde üç dakika içinde iskemik EEG değişikliklerinin başladığı akımdır.', d: true, n: 'Doğru. Kitabın tanımı budur; normal CBF 54 mL/100 g/dk\'dır. [[K2 s. 64]]' },
    { t: 'Uyanık kişide kritik CBF yaklaşık 10 mL/100 g/dk\'dır.', d: false, n: 'Yanlış. Uyanıkta kritik CBF 18–20 mL/100 g/dk\'dır; 10 mL/100 g/dk izofluran anestezisindeki değerdir. [[K2 s. 64]]' },
    { t: 'İskeminin başında α ve β dalgaları kaybolur, yerlerini yüksek voltajlı δ dalgaları alır.', d: true, n: 'Doğru. İskemi uzarsa yavaş dalgaların voltajı düşer ve EEG izoelektrikleşebilir. [[K2 s. 64]]' },
    { t: 'Yavaş dalga etkinliğinin bölgesel artışı metabolik ensefalopatiyi düşündürür.', d: false, n: 'Yanlış. Bölgesel artış fokal bir bozukluğu düşündürür; metabolik ya da enfeksiyöz ensefalopatide yavaş dalga etkinliği yaygın olarak artar. [[K2 s. 64]]' },
    { t: 'Kritik CBF halotan anestezisinde izofluran anestezisindekinden düşüktür.', d: false, n: 'Yanlış. Tersine: kritik CBF izofluranla 10, halotanla 18 mL/100 g/dk\'dır. [[K2 s. 64]]' },
  ],
};
VERI.sorular['fizek45-3'] = {
  no: 3, kok: 'Uyarılmış potansiyeller, bilinç ve uyku için:', kagit: 'Paper A · fizyoloji, Ek ders · Bölüm 45 ardından', kaynak: '[[K2 s. 64–65]]',
  onermeler: [
    { t: 'Locus coeruleus, pontin retiküler formasyonda noradrenalin kullanan bir nöron grubudur.', d: true, n: 'Doğru. Ponsun orta hattındaki bir başka nöron grubu da rafe çekirdekleridir. [[K2 s. 64]]' },
    { t: 'Uyarılmış potansiyellerin genliği arka plan EEG\'sinin genliğinden büyüktür.', d: false, n: 'Yanlış. Uyarılmış potansiyel 1–5 μV, EEG 10–20 μV\'tur; bu yüzden sinyal ancak birçok kaydın ortalaması alınınca gürültüden ayrılır. [[K2 s. 64]]' },
    { t: 'Beyin sapı işitsel uyarılmış potansiyelinde dalga I işitme sinirini, dalga IV ve V mezensefalonu yansıtır.', d: true, n: 'Doğru. Dalga II işitsel çekirdeği, dalga III pontin yolu temsil eder; kayıt verteks (aktif) ve mastoid (referans) elektrotlarıyla yapılır. [[K2 s. 65]]' },
    { t: 'REM uykusuna paradoksal uyku denir, çünkü EEG\'de derin uykudakinden de senkron, yüksek voltajlı dalgalar görülür.', d: false, n: 'Yanlış. Paradoks, uyku sürerken beynin uyanıklığa özgü asenkron etkinlik göstermesidir. [[K2 s. 65]]' },
    { t: 'Yavaş dalga uykusunda periferik damar tonusu, kan basıncı, solunum hızı ve metabolizma hızı azalır.', d: true, n: 'Doğru. Bu derin, dinlendirici uyku sinir sisteminin olgunlaşmasıyla gelişir. [[K2 s. 65]]' },
  ],
};

const DEK45_NAV = [
  ['dek45-olusum', 'EEG nasıl oluşur'], ['dek45-bant', 'Frekans bantları'], ['dek45-iskemi', 'Anormal EEG'],
  ['dek45-up', 'Uyarılmış potansiyel'], ['dek45-uyku', 'Bilinç ve uyku'], ['dek45-p1', 'Part I'], ['dek45-p2', 'Part II'], ['dek45-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/ek45'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Ek ders · Bölüm 45 ardından', baslik: 'EEG, uyarılmış potansiyeller ve uyku',
  lede: 'Kafa derisindeki mikrovolt düzeyindeki dalgalar korteksin ne kadar eşzamanlı çalıştığını söyler. Uyanıklık, uyku, iskemi ve uyarılmış yanıtlar bu dalgaları nasıl değiştirir? [[K2 s. 63–65]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${DEK45_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="dek45-olusum">
  <h2>EEG nereden doğar: eşzamanlı sinaptik potansiyeller</h2>
  <p class="intro">EEG, beynin kendiliğinden elektriksel etkinliğinin kaydıdır; tek nöronların aksiyon potansiyellerini değil, binlerce piramidal hücrenin aynı anda oluşan postsinaptik potansiyellerini yazar. [[K2 s. 63]] [[K1 s. 196]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Eşzamanlılık genliği büyütür</h3></div>
    <div data-viz="fek45_senkron"></div>
    <p class="viz-cap" aria-live="polite">Eşzamanlılığı artırın ve kafa derisindeki toplam dalgayı izleyin; sonra retiküler uyarıyı açıp talamik ritmin bozulduğunu görün. [[K2 s. 63]]</p>
    <p class="viz-foot">Şematik model: her dendrit tek bir salınım gibi çizilir; toplam dalganın genliği ve frekansı örnektir. Kitabın aralığı: 0–200 μV, birkaç saniyede bir salınımdan saniyede 50 ve üstüne. [[K2 s. 63]]</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>Akım, korteks yüzeyine dik uzanan yüzeyel piramidal hücre dendritlerinde uyarıcı ve inhibitör postsinaptik potansiyellerin (EPSP, IPSP) cebirsel toplamından doğar. Bu potansiyeller talamik çekirdeklerin ritmik deşarjlarına yanıttır; retiküler formasyondan gelen uyarılar ritmi keser ve dalgaları desenkronize eder. [[K2 s. 63]] K1 benzetmesiyle: EKG kas hücrelerinin eşzamanlı depolarizasyonunu nasıl yazıyorsa, 19 kafa derisi elektrotlu EEG de nöron gruplarının eşzamanlı etkinliğini yazar; etkinliğin karmaşıklığı yorumu zorlaştırır. [[K1 s. 196]]</p>
    <p>EEG; frekans, genlik ve dalga örüntüsüyle çözümlenir. Üç tip etkinlik ayrılır: sürekli ve ritmik, geçici, arka plan etkinliği. Normal EEG iki hemisferde genellikle simetriktir. [[K2 s. 63–64]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek45-bant">
  <h2>Frekans bantları: uyanıklıktan derin uykuya</h2>
  <p class="intro">Uyanık ve dikkatli beyin düzensiz (asenkron), düşük voltajlı (30–80 μV), yüksek frekanslı dalgalar; derin uykudaki beyin düzenli (senkron), yüksek voltajlı, düşük frekanslı dalgalar üretir. [[K2 s. 64]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Dört bant: nerede, ne zaman?</h3></div>
    <div data-viz="fek45_bant"></div>
    <p class="viz-cap" aria-live="polite">Bir bant seçin: şeritte frekansı ve genliği, kafa haritasında en belirgin olduğu bölgeyi okuyun. [[K2 s. 64]] [[K1 s. 196]]</p>
    <p class="viz-foot">Şematik trase; frekans sınırları ve genlikler kitaptandır, dalga biçimi temsilîdir. [[K2 s. 64]]</p>
  </div>

  <div class="tbl-wrap" style="margin:14px 0 0">
    <table class="tbl">
      <thead><tr><th>Bant</th><th>Frekans</th><th>Nerede, ne zaman?</th></tr></thead>
      <tbody>
        <tr><th>β</th><td>&gt; 13 Hz</td><td>Frontal, simetrik, &lt; 50 μV; göz kapamadan etkilenmez. [[K2 s. 64]]</td></tr>
        <tr><th>α</th><td>8–13 Hz</td><td>Parieto-oksipital, simetrik, ≈ 50 μV; uyanık, dinlenen, gözleri kapalı kişide. Etkinlik ya da zihinsel uyarı bozar. [[K2 s. 64]]</td></tr>
        <tr><th>θ</th><td>4–8 Hz</td><td>Çocuklarda parietal ve temporal; erişkinde duygusal streste. [[K2 s. 64]]</td></tr>
        <tr><th>δ</th><td>&lt; 4 Hz</td><td>Derin uyku, ağır organik beyin hastalığı ve bebekler. [[K2 s. 64]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="blk-body" style="margin-top:14px">
    <p>α ve β dalgalarının kaydedilmesi için talamokortikal projeksiyonların sağlam, talamusa çıkan retiküler girdinin işlevsel olması gerekir. Kitaba göre derin uykudaki δ etkinliği büyük olasılıkla korteksin alt merkezlerin etkisinden kurtulmasından doğar. [[K2 s. 64]]</p>
  </div>
  <div class="card clin" style="margin-top:14px">
    <span class="tag clin">Klinik önem</span>
    <p style="margin-top:8px">Genel anestezide ham EEG, uyanıklığın hızlı, küçük genlikli β trasesinden yavaş, büyük genlikli δ örüntüsüne kayar; BIS bu değişimi 0–100 arası bir sayıya çevirir (Bölüm 45). [[K1 s. 196]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek45-iskemi">
  <h2>Anormal EEG ve serebral iskemi</h2>
  <p class="intro">Anormal EEG üç tip bozukluk gösterir: yaygın yavaş dalga artışı (metabolik ya da enfeksiyöz ensefalopati), bölgesel yavaş dalga artışı (fokal bozukluk) ve yüksek voltajlı anormal deşarj (epileptiform bozukluk). [[K2 s. 64]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Kan akımını düşürün: EEG ne zaman bozulur?</h3></div>
    <div data-viz="fek45_iskemi"></div>
    <p class="viz-cap" aria-live="polite">Serebral kan akımını azaltın ve anestezi durumunu değiştirin: kritik eşiğin altında trase önce yavaşlayıp büyür, iskemi uzarsa düzleşir. [[K2 s. 64]]</p>
    <p class="viz-foot">Eşik değerleri kitaptandır; eşik ile trase arasındaki geçiş ve zaman ölçeği şematiktir. Uyanık eşik modelde 19 mL/100 g/dk alınmıştır (kitap: 18–20). [[K2 s. 64]]</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>İskemide yüksek frekanslı α ve β dalgaları kaybolur, yerlerini yüksek voltajlı yavaş δ dalgaları alır. İskemi uzarsa yavaş dalgaların voltajı düşer ve EEG izoelektrikleşebilir. [[K2 s. 64]]</p>
    <p><b>Kritik serebral kan akımı (CBF)</b>, altına inildiğinde üç dakika içinde iskemik EEG değişikliklerinin başladığı akımdır. Normal CBF 54 mL/100 g/dk, uyanıkta kritik CBF 18–20 mL/100 g/dk'dır; anestezide bu eşik izofluranla 10, halotanla 18 mL/100 g/dk'dır. [[K2 s. 64]] EEG'nin klinik kullanımları (epilepsi, ensefalopati, beyin ölümü, anestezi derinliği) Bölüm 45'te işlendi. [[K1 s. 196]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek45-up">
  <h2>Uyarılmış potansiyeller: sinyali gürültüden ortalamayla ayırmak</h2>
  <p class="intro">Bir duyu reseptörünün uyarılması ilgili kortikal alanda çok küçük bir sinyal doğurur; bu sinyal ancak tekrarlanan uyarılardan sonraki kayıtların ortalaması alınınca arka plan EEG'sinden ayrılır. [[K2 s. 64]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Ortalama aldıkça dalga belirir</h3></div>
    <div data-viz="fek45_ortalama"></div>
    <p class="viz-cap" aria-live="polite">Uyarı sayısını artırın: rastgele EEG söner, uyarıya kilitli dalga kalır. Sonra bir yol seçip elektrot yerlerini ve dalga adlarını okuyun. [[K2 s. 64–65]]</p>
    <p class="viz-foot">Şematik: gürültü, ortalanan kayıt sayısının kareköküyle azalan rastgele sinyal olarak modellenmiştir; dalga biçimleri ve latanslar ölçeksizdir. Genlikler kitaptan: uyarılmış potansiyel 1–5 μV, EEG 10–20 μV. [[K2 s. 64]]</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>Uyarılmış potansiyelin genliği (1–5 μV) EEG'ninkinden (10–20 μV) küçüktür. Dalgalar latansla (uyarı ile dalganın çıkışı arasındaki gecikme) ve genlikle (tepe ile çukur arasındaki voltaj farkı) değerlendirilir; pozitif (P) ya da negatif (N) oluşlarına ve latanslarına göre adlandırılır. Uyarılan yola göre dört tip vardır: görsel, işitsel, beyin sapı işitsel ve somatosensoriyel uyarılmış potansiyel. [[K2 s. 64]]</p>
  </div>
  <div class="tbl-wrap" style="margin:14px 0 0">
    <table class="tbl">
      <thead><tr><th>Tip</th><th>Elektrotlar (aktif / referans)</th><th>Dalgalar</th></tr></thead>
      <tbody>
        <tr><th>Görsel (VEP)</th><td>Oksipital korteks / verteks</td><td>N1, P1, N2; ilk büyük pozitif dalga P1 görsel yollardaki iletimi ölçer. [[K2 s. 65]]</td></tr>
        <tr><th>Beyin sapı işitsel (BAEP)</th><td>Verteks / mastoid</td><td>I işitme siniri, II işitsel çekirdek, III pontin yol, IV–V mezensefalon. [[K2 s. 65]]</td></tr>
        <tr><th>Somatosensoriyel (SSEP)</th><td>Parietal alan / verteks</td><td>Periferik sinir uyarılır, yanıt kortekste alınır. [[K2 s. 65]]</td></tr>
      </tbody>
    </table>
  </div>
  <div class="card clin" style="margin-top:14px">
    <span class="tag clin">Klinik önem</span>
    <p style="margin-top:8px">Omurga cerrahisinde omuriliği korumak için SSEP, çoğunlukla motor uyarılmış potansiyellerle birlikte izlenir; genliğin azalması ya da latansın uzaması nörolojik hasarı düşündürür. [[K1 s. 196]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek45-uyku">
  <h2>Bilinç ve uyku: retiküler sistem talamusu ayarlar</h2>
  <p class="intro">Bilinç, kişinin çevresinin ve kendi düşünce ve duygularının farkında olmasıdır; sağlam beyin hemisferlerine ve onların beyin sapı, mezensefalon, hipotalamus ve talamustaki asendan retiküler aktive edici sistemle (ARAS) etkileşimine bağlıdır. [[K2 s. 64]]</p>

  <div class="viz">
    <div class="viz-head"><h3>Uyanıklıktan derin uykuya ve REM'e</h3></div>
    <div data-viz="fek45_uyku"></div>
    <p class="viz-cap" aria-live="polite">Bir durum seçin: EEG şeridini, öne çıkan beyin yapılarını ve dolaşım-solunum göstergelerini karşılaştırın. [[K2 s. 64–65]]</p>
    <p class="viz-foot">Şematik; yapıların yeri yaklaşıktır, göstergeler yalnız yön gösterir (kitap sayı vermez). [[K2 s. 65]]</p>
  </div>

  <div class="blk-body" style="margin-top:14px">
    <p>Retiküler formasyon pons ve medullada, lif demetleri arasına ağ gibi dağılmış küçük çekirdeklerdir. Pontin retiküler formasyondaki locus coeruleus noradrenalin kullanır; ponsun orta hattında rafe çekirdekleri bulunur. Pons ve mezensefalondaki bazı nöronlar talamusu uyaran ya da baskılayan aksonlar gönderir; talamik ritim oluşturucuları ayarlayarak korteksin uyarılabilirliğini değiştirir. [[K2 s. 64–65]]</p>
    <p>Talamusun özgül olmayan (intralaminar ve anterior) çekirdekleri korteksi uyarır; aksonları talamustaki inhibitör internöronları da uyarırsa uyuklama başlar. Bilinç düzeyini beyin sapı ve hemisferlerin etkinliği belirler; bilinçli kişinin EEG'si düzensiz, hızlı, düşük voltajlı ve asenkrondur. Hemisferleri yaygın tutan ya da ARAS'ı doğrudan etkileyen lezyonlar bilinci bozar. [[K2 s. 64–65]]</p>
    <p><b>Uyku</b>, çevreye tepkinin kaybolduğu, duyusal uyarıyla uyandırılabilen bir bilinçsizlik durumudur; iki tipi vardır: yavaş dalga (non-REM) uykusu ve REM uykusu. Derin uykuya inerken EEG desenkron, düşük voltajlı, hızlı α dalgalarından senkron, yüksek voltajlı, yavaş δ dalgalarına kayar. REM'e paradoksal uyku denir: uyku sürerken beyin uyanıklığa özgü asenkron etkinlik gösterir. [[K2 s. 65]]</p>
    <p>Yavaş dalga uykusu derin, dinlendiricidir ve sinir sisteminin olgunlaşmasıyla gelişir. Kitaba göre orta hattaki pontin ve medüller çekirdeklerin (rafe) inhibisyonuyla başlar. Oluşumunda üç subkortikal bölge rol oynar: posterior hipotalamusun bölümleri ile çevresindeki intralaminar ve anterior talamik çekirdeklerin oluşturduğu diensefalik uyku bölgesi senkron, yavaş dalgalar üretir; preoptik alandaki ön beyin uyku bölgesinin uyarılması da uyku yapar. [[K2 s. 65]]</p>
    <p>Uyku beynin birçok bölümünün etkinlik dengesini yeniler; mekanizması bilinmez. Uykusuzluk irritabilite ve yavaş düşünmeye yol açar; kan basıncını, kalp hızını, periferik damar tonusunu, kas etkinliğini ve bazal metabolizmayı düzenleyen sistemleri de etkiler, mekanizması tanımlanmamıştır. [[K2 s. 65]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Klasik deneylerde rafe çekirdeklerinin uyarılması uyku yapar, harabiyeti uykusuzluğa yol açar; kitabın "inhibisyonla başlar" ifadesi bu bulguyla çelişir. Bugün yavaş dalga uykusunun başlıca başlatıcısı preoptik alandaki GABA'erjik nöronlar kabul edilir.</div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Kitabın seçkisi üçüncü bölgeyi saymadan kesilir. Klasik kaynaklarda bu, medullada soliter çekirdek düzeyindeki retiküler formasyonda yer alan medüller senkronizasyon bölgesidir.</div>
</section>

<section class="wrap blk ders-sec" id="dek45-p1">
  <h2>Part I'de</h2>
  <p class="intro">Bu ek dersin MTF'de sorulabilecek noktaları: EEG'nin piramidal dendritlerdeki postsinaptik kökeni ve talamik ritim, retiküler desenkronizasyon, dört bandın frekansları ve yerleri (α parieto-oksipital ve gözler kapalı, β frontal ve gözden bağımsız), anormal EEG'nin üç tipi, iskemide EEG ve kritik CBF değerleri (54; 18–20; izofluran 10, halotan 18), uyarılmış potansiyellerin genliği ve BAEP dalgalarının kaynakları, retiküler formasyonun çekirdekleri, paradoksal uyku ve yavaş dalga uykusunun özellikleri. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fizek45-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fizek45-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fizek45-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="dek45-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"EEG nasıl oluşur? Uyanıklıkta, uykuda ve serebral iskemide nasıl değişir? Kritik serebral kan akımı nedir?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Tanımlayın.</b> Beynin kendiliğinden elektriksel etkinliğinin kafa derisinden kaydı; 0–200 μV, birkaç saniyede birden 50 Hz'nin üstüne. [[K2 s. 63]]</li>
    <li><b>Kaynağını açıklayın.</b> Yüzeyel piramidal hücre dendritlerinde EPSP ve IPSP'lerin cebirsel toplamı; talamik ritim oluşturucular ritmi verir, retiküler girdi desenkronize eder. Tek nöron değil, eşzamanlı nöron grupları görülür. [[K2 s. 63]] [[K1 s. 196]]</li>
    <li><b>Bantları sayın.</b> δ &lt; 4, θ 4–8, α 8–13, β &gt; 13 Hz; α parieto-oksipital, gözler kapalı, ≈ 50 μV; β frontal, gözden bağımsız; θ çocukta ve erişkinde duygusal streste; δ derin uyku, bebek, ağır organik hastalık. [[K2 s. 64]]</li>
    <li><b>Uyanıklık ve uykuyu karşılaştırın.</b> Uyanık: asenkron, 30–80 μV, hızlı. Derin uyku: senkron, yüksek voltajlı, yavaş. REM: uykuda asenkron (paradoksal) EEG. Anestezide β'dan δ'ya kayma ve BIS. [[K2 s. 64–65]] [[K1 s. 196]]</li>
    <li><b>İskemiyi anlatın.</b> α ve β kaybı → yüksek voltajlı δ → düşük voltajlı yavaş dalga → izoelektrik EEG. [[K2 s. 64]]</li>
    <li><b>Kritik CBF'yi verin.</b> Altında üç dakikada iskemik EEG değişikliği başlayan akım; normal CBF 54, kritik uyanıkta 18–20, izofluranla 10, halotanla 18 mL/100 g/dk. [[K2 s. 64]]</li>
    <li><b>İzlemeyle bitirin.</b> Uyarılmış potansiyeller (1–5 μV) ortalamayla çıkarılır; omurga cerrahisinde SSEP genlik kaybı ya da latans uzaması nörolojik hasarı düşündürür. [[K2 s. 64]] [[K1 s. 196]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Burada dört kısa EEG şeridini alt alta çizin: uyanık β (küçük, hızlı, düzensiz), gözler kapalı α (8–13 Hz), derin uyku δ (büyük, yavaş) ve izoelektrik çizgi. Yanına yatay bir CBF ekseni çizip 54 (normal), 18–20 (uyanık kritik) ve 10 (izofluran) değerlerini işaretleyin.</div>
    <div class="note plain"><b>Olası ek sorular.</b> Tek bir nöronun etkinliği EEG'de neden görülmez? Göz açınca α ritmi neden kaybolur? Retiküler formasyon EEG'yi nasıl değiştirir? Kritik CBF anestezide nasıl değişir, izofluran ile halotan nasıl farklıdır? Uyarılmış potansiyel EEG'den nasıl ayrılır, BAEP dalgaları neyi gösterir? REM uykusu neden paradoksaldır? Cevaplar yukarıdaki bölümlerde. [[K2 s. 63–65]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="dek45-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>EEG, piramidal hücre dendritlerindeki EPSP ve IPSP'lerin cebirsel toplamıdır (0–200 μV); ritmi talamus verir, retiküler girdi desenkronize eder. [[K2 s. 63]]</li>
    <li>Etkinlik sürekli-ritmik, geçici ve arka plan diye üçe ayrılır; normal EEG iki hemisferde simetriktir. [[K2 s. 63–64]]</li>
    <li>δ &lt; 4, θ 4–8, α 8–13, β &gt; 13 Hz. α (≈ 50 μV) parieto-oksipital ve gözler kapalıyken; β (&lt; 50 μV) frontal ve göz kapamadan bağımsızdır. [[K2 s. 64]]</li>
    <li>Anormal EEG: yaygın yavaş dalga (ensefalopati), bölgesel yavaş dalga (fokal bozukluk), yüksek voltajlı deşarj (epileptiform). İskemide α ve β kaybolur, δ belirir, sonra EEG düzleşir. [[K2 s. 64]]</li>
    <li>Kritik CBF, üç dakikada iskemik EEG değişikliği yapan akımdır: uyanıkta 18–20, izofluranla 10, halotanla 18 mL/100 g/dk (normal 54). [[K2 s. 64]]</li>
    <li>Uyarılmış potansiyeller (1–5 μV) ortalamayla çıkarılır, latans ve genlikle okunur; BAEP'te I işitme siniri, II işitsel çekirdek, III pons, IV–V mezensefalon. [[K2 s. 64–65]]</li>
    <li>Bilinç hemisferler ile ARAS'ın etkileşimine bağlıdır. Yavaş dalga uykusunda kan basıncı, solunum ve metabolizma azalır; REM uykusunda EEG uyanıklık gibi asenkrondur. [[K2 s. 64–65]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="ek45"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/45">← Bölüm 45 · Beyin</a>
    <a href="#/dersler/fizyoloji/46">Sonraki: Bölüm 46 · Beyin–omurilik sıvısı →</a>
  </nav>
</section>`,
};
