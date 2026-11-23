/* Fizyoloji Bölüm 48 · Serebral kan akımı (K1 İngilizce baskı s. 202–205).
   Ders metni, sorular ve bileşen açıklamaları bu atlas için yazılmıştır; kitaptan metin, tablo ya da şekil kopyalanmaz.
   Her olgusal bilgi K1 sayfa işaretiyle İngilizce özgün sayfaya bağlıdır. */
VERI.sorular = VERI.sorular || {};
VERI.sorular['fiz48-1'] = {
  no: 1, kok: 'Serebral kan akımı (CBF) ve otoregülasyon için:', kagit: 'Paper A · fizyoloji, Bölüm 48', kaynak: '[[K1 s. 202]]',
  onermeler: [
    { t: 'Erişkinde CBF dinlenme kalp debisinin yaklaşık %25\'idir.', d: false, n: 'Yanlış. CBF dinlenme kalp debisinin yaklaşık %15\'idir (≈ 750 mL/dk). [[K1 s. 202]]' },
    { t: 'Serebral perfüzyon basıncı, ortalama arter basıncından intrakraniyal basınç çıkarılarak bulunur.', d: true, n: 'Doğru. CPP = MAP − ICP; ayrıca CPP = CBF × CVR. [[K1 s. 202]]' },
    { t: 'CPP 50–150 mmHg arasındayken CBF yaklaşık 50 mL/100 g/dk düzeyinde sabit kalır.', d: true, n: 'Doğru. Bu özelliğe otoregülasyon denir. [[K1 s. 202]]' },
    { t: 'Miyojenik mekanizmada serebral arteriyoller duvar gerimi arttığında vazodilate olur.', d: false, n: 'Yanlış. Duvar gerimi artınca arteriyoller vazokonstrikte olur ve CVR artar; gerim azalınca vazodilate olurlar. [[K1 s. 202]]' },
    { t: 'Kronik hipertansiyonlu hastada otoregülasyon eğrisi sola kayar.', d: false, n: 'Yanlış. Kronik hipertansiyonda eğri sağa, yenidoğanda sola kayar. [[K1 s. 202]]' },
  ],
};
VERI.sorular['fiz48-2'] = {
  no: 2, kok: 'Serebral iskemi, akım–metabolizma eşleşmesi ve kan gazları için:', kagit: 'Paper A · fizyoloji, Bölüm 48', kaynak: '[[K1 s. 203–204]]',
  onermeler: [
    { t: 'CBF 20 mL/100 g/dk\'nın altına inince hücre membranı iyon pompaları yetersizleşir ve transmembran elektrokimyasal gradiyentler kaybolur.', d: true, n: 'Doğru. Hücre ölümü 10 mL/100 g/dk\'nın altında görülür. [[K1 s. 203]]' },
    { t: 'Gri cevherin CBF\'si beyaz cevherinkinden düşüktür.', d: false, n: 'Yanlış. Gri cevherde CBF 70, beyaz cevherde yalnız 20 mL/100 g/dk\'dır. [[K1 s. 203]]' },
    { t: 'Status epileptikus ve ateş global CBF\'yi artırır.', d: true, n: 'Doğru. İkisi de toplam CMR\'yi artırır; global CBF toplam metabolizmaya eşleşir. [[K1 s. 203]]' },
    { t: 'PaCO₂ 8 kPa\'nın üzerindeyken PaCO₂\'nin daha da artması CBF\'yi artırmayı sürdürür.', d: false, n: 'Yanlış. 8 kPa\'nın üzerinde arterler zaten en geniş durumdadır; ek artış CVR ve CBF\'yi değiştirmez. [[K1 s. 203]]' },
    { t: 'PaO₂ 8 kPa\'nın altına düşünce serebral arteriyoller vazodilate olur ve CBF belirgin artar.', d: true, n: 'Doğru. Normal PaO₂ düzeylerinde O₂\'nin arteriyollere etkisi azdır. [[K1 s. 204]]' },
  ],
};
VERI.sorular['fiz48-3'] = {
  no: 3, kok: 'İlaçların CBF\'ye etkisi ve CBF ölçümü için:', kagit: 'Paper A · fizyoloji, Bölüm 48', kaynak: '[[K1 s. 204–205]]',
  onermeler: [
    { t: 'N₂O, CMR\'yi azaltan bir serebral vazokonstriktördür.', d: false, n: 'Yanlış. N₂O güçlü bir serebral vazodilatördür ve CMR\'yi de artırır; CBF belirgin artar. [[K1 s. 204]]' },
    { t: 'Propofol, tiyopenton ve etomidat CMR\'yi azaltarak CBF\'yi de azaltır.', d: true, n: 'Doğru. Akım–metabolizma eşleşmesi korunur; ketamin ise CMR\'yi artırıp CBF\'yi artırabilir. [[K1 s. 204]]' },
    { t: 'Juguler bulbus kateterizasyonu beynin içindeki bölgesel kan akımı hakkında bilgi verir.', d: false, n: 'Yanlış. Aynı taraf beyin yarısında CBF\'nin genel yeterliğini tahmin eder; bölgesel bilgi vermez. [[K1 s. 204]]' },
    { t: 'Yaklaşık 1 MAC\'ın üzerinde volatil ajanlar serebral arteriyolar vazodilatasyonla CBF\'yi artırır.', d: true, n: 'Doğru. Bu düzeyde CMR azalması zaten en yüksektir; 1 MAC\'ın altında iki etki dengelenir ve CBF değişmez. [[K1 s. 204]]' },
    { t: 'Kety–Schmidt tekniği Fick ilkesini kullanır ve yalnız global CBF\'yi ölçer.', d: true, n: 'Doğru. Arteriyel ve juguler venöz N₂O derişimlerinden hesaplanır; temelde araştırma yöntemidir. [[K1 s. 205]]' },
  ],
};

const D48_NAV = [
  ['d48-temel', 'CPP ve CVR'], ['d48-oto', 'Otoregülasyon'], ['d48-iskemi', 'İskemi eşikleri'], ['d48-esles', 'Akım–metabolizma'],
  ['d48-gaz', 'CO₂ ve O₂'], ['d48-hct', 'Hematokrit, otonom'], ['d48-ilac', 'İlaçlar'], ['d48-olcum', 'Ölçüm'],
  ['d48-p1', 'Part I'], ['d48-p2', 'Part II'], ['d48-ozet', 'Özet'],
];

SAYFALAR['dersler/fizyoloji/48'] = {
  grup: 'dersler', eyebrow: 'Fizyoloji · Kısım 4 · Nörofizyoloji · Bölüm 48', baslik: 'Serebral kan akımı',
  lede: 'Beyin kalp debisinin yaklaşık %15\'ini alır ve bu akımı geniş bir basınç aralığında sabit tutar; metabolizma, kan gazları ve anestezik ilaçlar ise akımı değiştirir. [[K1 s. 202–204]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu bölümde">${D48_NAV.map(([id, ad], i) => `<button type="button" data-scroll="${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="d48-temel">
  <h2>CBF'yi ne belirler: CPP ve CVR</h2>
  <p class="intro">Serebral kan akımı (CBF), serebral perfüzyon basıncının (CPP) serebral vasküler dirence (CVR) oranıdır. [[K1 s. 202]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>MAP ve ICP'den CPP'ye, CPP ve CVR'den CBF'ye</h3></div>
    <div data-viz="f48_cpp"></div>
    <p class="viz-cap" aria-live="polite"><b>MAP 90, ICP 10 mmHg.</b> CPP = 90 − 10 = 80 mmHg. MAP'i, ICP'yi ya da direnci değiştirin. [[K1 s. 202]]</p>
    <p class="viz-foot">Denklemler kitaptandır; MAP, ICP ve direnç değerleri temsilîdir. Bu panelde otoregülasyon kapalıdır (bkz. sonraki bölüm).</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Erişkinde CBF dinlenme kalp debisinin yaklaşık %15'idir (≈ 750 mL/dk). Beyin dokusunun ağırlığına göre verilir: normali 50 mL/100 g/dk. [[K1 s. 202]]</p>
    <p>CPP, beyin dolaşımında kanı ilerleten net basınç farkıdır ve hem ortalama arter basıncına (MAP) hem intrakraniyal basınca (ICP) bağlıdır: <b>CPP = MAP − ICP</b>. Dirençle ilişkisi: <b>CPP = CBF × CVR</b>. [[K1 s. 202]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d48-oto">
  <h2>Otoregülasyon</h2>
  <p class="intro">CPP 50 ile 150 mmHg arasındayken CBF yaklaşık 50 mL/100 g/dk'da sabit kalır; beynin bu özelliğine otoregülasyon denir. [[K1 s. 202]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Otoregülasyon eğrisi ve arteriyol çapı</h3></div>
    <div data-viz="f48_oto"></div>
    <p class="viz-cap" aria-live="polite"><b>CPP 80 mmHg, normotansif.</b> Plato üzerindesiniz: arteriyol çapı orta, CBF ≈ 50 mL/100 g/dk. CPP'yi kaydırın ya da hasta grubunu değiştirin. [[K1 s. 202]]</p>
    <p class="viz-foot">Şematik eğri; 50 ve 150 mmHg sınırları ile 50 mL/100 g/dk plato değeri kitaptandır, kaymanın büyüklüğü temsilîdir [[K1 s. 202]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Mekanizma büyük olasılıkla miyojeniktir: duvar gerimi artınca arteriyoller kasılır, azalınca genişler; CVR böylece artıp azalarak akımı korur (Bölüm 34). [[K1 s. 202]]</p>
    <p>Aralığın dışında koruma biter. CPP 150 mmHg'yi aşınca CBF CPP ile doğru orantılı artar; 50 mmHg'nin altında CBF normalin altına düşer ve beyin iskemisi gelişir. Eğri kronik hipertansiyonda sağa, yenidoğanda sola kayar. [[K1 s. 202]]</p>
  </div>
  <div class="note plain" style="margin-top:12px"><b>Atlas notu.</b> Güncel çalışmalara göre alt sınır kişiden kişiye çok değişir ve çoğu erişkinde 50 mmHg'den yüksektir (≈ 60–70 mmHg); plato da tam düz değildir. 50–150 mmHg sınav için klasik değerdir.</div>
</section>

<section class="wrap blk ders-sec" id="d48-iskemi">
  <h2>CBF düşünce nöronlara ne olur?</h2>
  <p class="intro">Beyin kısa süreli iskemiye bile vücuttaki bütün organlardan daha duyarlıdır: CBF düştükçe O₂ sunumu azalır ve hücre basamak basamak hasarlanır. [[K1 s. 203]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>CBF eşikleri: asidozdan hücre ölümüne</h3></div>
    <div data-viz="f48_esik"></div>
    <p class="viz-cap" aria-live="polite"><b>CBF 50 mL/100 g/dk.</b> Normal akım; nöronlar sağlam. Akımı azaltın. [[K1 s. 203]]</p>
    <p class="viz-foot">Eşikler kitaptandır [[K1 s. 203]]; nöron çizimi şematiktir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Örnek: vazovagal bir epizotta olduğu gibi CBF'nin yalnız 5 saniye 30 mL/100 g/dk'ya inmesi bilinç kaybı yapar. Eşikler: &lt; 50 hücresel asidoz, &lt; 40 protein sentezinde bozulma, &lt; 30 hücresel ödem, &lt; 20 membran iyon pompalarının yetersizliği ve transmembran elektrokimyasal gradiyentlerin kaybı, &lt; 10 mL/100 g/dk hücre ölümü. [[K1 s. 203]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d48-esles">
  <h2>Akım–metabolizma eşleşmesi</h2>
  <p class="intro">Toplam CBF ≈ 50 mL/100 g/dk'da kalsa da kan metabolik olarak en etkin bölgelere yönlendirilir; toplam CBF de toplam metabolizmaya eşleşir. [[K1 s. 203]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Yerel ve global eşleşme</h3></div>
    <div data-viz="f48_esles"></div>
    <p class="viz-cap" aria-live="polite"><b>Dinlenme.</b> Gri cevher 70, beyaz cevher 20 mL/100 g/dk alır. Bir bölgeyi etkinleştirin ya da global bir durum seçin. [[K1 s. 203]]</p>
    <p class="viz-foot">Şematik; 70, 20 ve 50 mL/100 g/dk kitaptandır, değişimin büyüklüğü temsilîdir.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Etkin bölgede vazodilatör metabolitler (CO₂, H⁺, K⁺, adenozin) birikir; yerel akım ve O₂ sunumu artar. Serebral metabolizma hızını (CMR) artıran status epileptikus ve ateş CBF'yi artırır; CMR'yi azaltan genel anestezi ve hipotermi CBF'yi azaltır. [[K1 s. 203]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d48-gaz">
  <h2>CO₂ ve O₂</h2>
  <p class="intro">Yerel metabolitlerin yanı sıra kandaki maddeler de damar tonusunu, dolayısıyla CVR'yi değiştirir: PaCO₂, PaO₂ ve hematokrit. [[K1 s. 203]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>PaCO₂ ve PaO₂'nin CBF'ye etkisi</h3></div>
    <div data-viz="f48_gaz"></div>
    <p class="viz-cap" aria-live="polite"><b>PaCO₂ 5,3 kPa, PaO₂ 13 kPa.</b> Normal CBF. PaCO₂'yi ya da PaO₂'yi değiştirin. [[K1 s. 203–204]]</p>
    <p class="viz-foot">Şematik eğriler; 3,5, 8 kPa (CO₂) ve 8 kPa (O₂) kırılma noktaları kitaptandır, eğim temsilîdir [[K1 s. 203–204]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p><b>CO₂:</b> hiperkapni arteriyolleri genişletir, CVR düşer, CBF artar; hipokapni tersini yapar. İlişki 3,5–8 kPa arasında yaklaşık doğrusaldır. 8 kPa'nın üzerinde arterler zaten en geniş, 3,5 kPa'nın altında en dar durumdadır; ek değişim damar çapını oynatmaz. Çok düşük PaCO₂'de alkaloz oksihemoglobin eğrisini sola kaydırıp beyne O₂ bırakılmasını azaltabilir; doku hipoksisi arterleri genişletir ve CBF artar. Kronik hiperkapnide eğri sağa kayar. [[K1 s. 203–204]]</p>
    <p><b>O₂:</b> normal PaO₂'de arteriyollere etkisi azdır; PaO₂ 8 kPa'nın altına inince erken vazodilatasyon CBF'yi belirgin artırır. [[K1 s. 204]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d48-hct">
  <h2>Hematokrit ve otonom sinir sistemi</h2>
  <p class="intro">Düşük hematokrit akımı artırır ama her mililitre kan daha az O₂ taşır; en iyi denge hematokrit 0,3'te kurulur. [[K1 s. 204]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Hematokrit: viskozite, CBF ve O₂ sunumu</h3></div>
    <div data-viz="f48_hct"></div>
    <p class="viz-cap" aria-live="polite"><b>Hematokrit 0,45.</b> Viskozite yüksek, CBF normal. Hematokriti azaltın. [[K1 s. 204]]</p>
    <p class="viz-foot">Model; eğriler şematiktir, yalnız 0,3 optimumu kitaptandır [[K1 s. 204]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Hagen–Poiseuille denklemine göre viskozite azaldıkça akım artar (Bölüm 34); hematokritin belirgin düşmesi viskoziteyi azaltıp CBF'yi artırabilir, ama daha az hemoglobin (Hb) daha az O₂ demektir. [[K1 s. 204]]</p>
    <p><b>Otonom sinir sistemi:</b> normal koşullarda nörojenik kontrolün otoregülasyona etkisi vazomotor, kimyasal ve metabolik mekanizmalara göre azdır. [[K1 s. 204]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d48-ilac">
  <h2>Klinik önem: ilaçların CBF'ye etkisi</h2>
  <p class="intro">Anestezik ilaçlar CBF'yi iki yoldan değiştirir: CMR üzerinden (eşleşme) ve doğrudan arteriyol tonusu üzerinden. [[K1 s. 204]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>İlaç seçin: CMR, damar tonusu ve net CBF</h3></div>
    <div data-viz="f48_ilac"></div>
    <p class="viz-cap" aria-live="polite"><b>Propofol.</b> CMR azalır; eşleşme nedeniyle CBF de azalır. Bir ilaç seçin. [[K1 s. 204]]</p>
    <p class="viz-foot">Ok boyları yalnız yönü gösterir; MAC eşiği yaklaşıktır [[K1 s. 204]].</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <p>Propofol, tiyopenton ve etomidat CMR'yi, dolayısıyla CBF'yi azaltır; ketamin CMR'yi artırır ve CBF'yi artırabilir. Volatil ajanlar CMR ile CBF'nin eşleşmesini bozan tek gruptur: CMR'yi azaltırken arteriyolleri genişletirler. Yaklaşık 1 MAC'ın altında iki etki dengelenir ve CBF değişmez; üzerinde CMR azalması en yüksektedir ve vazodilatasyonla CBF artar. Sevofluranın vazodilatör eğilimi en düşüktür. [[K1 s. 204]]</p>
    <p>N₂O güçlü bir vazodilatördür ve CMR'yi de artırır; CBF belirgin artar. Opioidlerin CMR ve CBF'ye anlamlı etkisi yoktur. [[K1 s. 204]]</p>
  </div>
</section>

<section class="wrap blk ders-sec" id="d48-olcum">
  <h2>CBF nasıl ölçülür?</h2>
  <p class="intro">Klinikte en sık iki yöntem kullanılır: transkraniyal Doppler ve juguler bulbus kateterizasyonu; geri kalanlar görüntüleme ya da araştırma yöntemleridir. [[K1 s. 204–205]]</p>
  <div class="viz" style="margin-top:14px">
    <div class="viz-head"><h3>Beş yöntem: ne ölçer, neyi söyleyemez?</h3></div>
    <div data-viz="f48_olcum"></div>
    <p class="viz-cap" aria-live="polite"><b>Transkraniyal Doppler.</b> Şakaktaki prob, Doppler ilkesiyle orta serebral arterde kan hızını ölçer; buradan bir beyin yarısının CBF'si tahmin edilir. Bir yöntem seçin. [[K1 s. 204]]</p>
    <p class="viz-foot">Şematik baş kesiti.</p>
  </div>
  <div class="blk-body" style="margin-top:16px">
    <ul>
      <li><b>Transkraniyal Doppler:</b> açık ara en sık klinik yöntem; karotis endarterektomisinde emboli saptamak ve subaraknoid kanama sonrası vazospazmı tanımak için de kullanılır. [[K1 s. 204]]</li>
      <li><b>Juguler bulbus kateterizasyonu:</b> bulbus, iç juguler venin kafa tabanının hemen altındaki genişlemesidir. Santral kateter gibi Seldinger tekniğiyle, iğne kafaya doğru yönlendirilerek girilir; O₂ basıncı, Hb O₂ satürasyonu ve laktat ölçülür. Aynı taraf yarıkürede CBF'nin genel yeterliğini gösterir, bölgesel bilgi vermez. [[K1 s. 204]]</li>
      <li><b>fMRI ve PET:</b> etkin bölgeleri akım–metabolizma eşleşmesiyle bulur; fMRI O₂'ce zengin ve fakir kanı ayırır, PET radyoaktif glukoz analoğu kullanır. [[K1 s. 204–205]]</li>
      <li><b>Araştırma yöntemleri:</b> Kety–Schmidt tekniği Fick ilkesini arteriyel ve juguler venöz N₂O derişimleriyle uygular, yalnız global CBF ölçer. Enjekte edilen radyoaktif ksenon-133'ün bozunması gama kamerayla izlenir ve bölgesel CBF verir. [[K1 s. 205]]</li>
    </ul>
  </div>
</section>

<section class="wrap blk ders-sec" id="d48-p1">
  <h2>Part I'de</h2>
  <p class="intro">MTF'de sorulanlar: %15 ve 50 mL/100 g/dk, CPP = MAP − ICP, 50–150 mmHg otoregülasyon aralığı ve eğrinin kayması, miyojenik mekanizma, iskemi eşikleri, gri/beyaz cevher akımı, PaCO₂ (3,5–8 kPa) ve PaO₂ (8 kPa) etkileri, hematokrit 0,3, ilaç etkileri ve ölçüm yöntemlerinin sınırları. Aşağıdaki sorular bu atlas için yazılmıştır.</p>
  <div class="viz"><div data-viz="mtf" data-q="fiz48-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz48-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="fiz48-3"></div></div>
</section>

<section class="wrap blk ders-sec" id="d48-p2">
  <h2>Part II'de (SOE 1)</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu · örnek</span><p style="margin-top:10px;font-size:18px"><b>"Beyin kan akımını hangi etkenler düzenler? Otoregülasyon eğrisini çizip anestezik ilaçların bu akıma etkisini anlatır mısınız?"</b></p><p class="small muted" style="margin-top:6px">Bu atlas için yazılmış, SOE 1 açılışına benzer bir soru. Hazırlık süresi 10 dakika.</p></div>
  <h3 style="margin:18px 0 10px">Cevap iskeleti</h3>
  <ol class="iskelet">
    <li><b>Sayılar ve denklemler.</b> CBF kalp debisinin %15'i (≈ 750 mL/dk), 50 mL/100 g/dk; CPP = MAP − ICP = CBF × CVR. [[K1 s. 202]]</li>
    <li><b>Otoregülasyon.</b> CPP 50–150 mmHg'de CBF sabit; miyojenik mekanizma; 150 üstünde basınca bağımlı, 50 altında iskemi; kronik hipertansiyonda sağa, yenidoğanda sola kayma. [[K1 s. 202]]</li>
    <li><b>İskemi eşikleri.</b> &lt; 50 asidoz, &lt; 40 protein sentezi, &lt; 30 ödem, &lt; 20 iyon pompası yetersizliği, &lt; 10 hücre ölümü; 5 saniye 30'da bilinç kaybı. [[K1 s. 203]]</li>
    <li><b>Akım–metabolizma eşleşmesi.</b> Gri 70, beyaz 20 mL/100 g/dk; CO₂, H⁺, K⁺, adenozin; status epileptikus ve ateş artırır, genel anestezi ve hipotermi azaltır. [[K1 s. 203]]</li>
    <li><b>Kan gazları, hematokrit, otonom sistem.</b> PaCO₂ 3,5–8 kPa'da doğrusal; PaO₂ &lt; 8 kPa'da vazodilatasyon; hematokrit 0,3 optimum; nörojenik kontrol az etkili. [[K1 s. 203–204]]</li>
    <li><b>İlaçlar.</b> Propofol, tiyopenton, etomidat CBF'yi azaltır; ketamin artırabilir; volatiller eşleşmeyi bozar (&lt; 1 MAC değişmez, &gt; 1 MAC artar; sevofluran en az); N₂O belirgin artırır; opioidler etkisiz. [[K1 s. 204]]</li>
    <li><b>Ölçüm.</b> Transkraniyal Doppler, juguler bulbus; fMRI, PET; Kety–Schmidt, ksenon-133. [[K1 s. 204–205]]</li>
  </ol>
  <div class="cols" style="margin-top:16px">
    <div class="note"><b>Çizin.</b> Rehber, cevaba bir diyagramla başlamayı önerir [[S6 s. 11]]. Yatay eksene CPP'yi (0–200 mmHg), dikey eksene CBF'yi koyun; 50–150 mmHg arasında 50 mL/100 g/dk'da düz plato çizin, kronik hipertansiyon eğrisini sağa kaydırın. Yanına PaCO₂–CBF (3,5–8 kPa arası doğrusal) ve PaO₂–CBF (8 kPa altında yükselen) eğrilerini ekleyin. [[K1 s. 202–203]]</div>
    <div class="note plain"><b>Olası ek sorular.</b> Hiperventilasyon CBF'yi neden düşürür ve aşırısı neden zararlıdır? Kronik hipertansiyonlu hastada hipotansiyon neden daha tehlikelidir? Nöroanestezide hangi volatil ajanı seçersiniz? Juguler bulbus örneği neyi söyleyemez? Cevapların hepsi yukarıdaki bölümlerde. [[K1 s. 202–204]]</div>
  </div>
</section>

<section class="wrap blk ders-sec" id="d48-ozet">
  <h2>Özet</h2>
  <ul class="ozet">
    <li>Beyin kalp debisinin ≈ %15'ini alır; normal CBF 50 mL/100 g/dk'dır ve CPP/CVR ile belirlenir (CPP = MAP − ICP). [[K1 s. 202]]</li>
    <li>Otoregülasyon CBF'yi CPP 50–150 mmHg arasında miyojenik yolla sabit tutar; eğri kronik hipertansiyonda sağa, yenidoğanda sola kayar. [[K1 s. 202]]</li>
    <li>Beyin iskemiye en duyarlı organdır: akım 50'den 10 mL/100 g/dk'ya indikçe asidoz, protein sentezi bozukluğu, ödem, pompa yetersizliği ve hücre ölümü gelir. [[K1 s. 203]]</li>
    <li>Akım hem bölgesel hem global olarak metabolizmaya eşleşir; yerel eşleşmenin aracısı vazodilatör metabolitlerdir. [[K1 s. 203]]</li>
    <li>CBF, PaCO₂ ile 3,5–8 kPa arasında doğrusal değişir; PaO₂ 8 kPa'nın altında belirgin artar; en iyi hematokrit 0,3'tür. [[K1 s. 203–204]]</li>
    <li>İV indüksiyon ajanları (ketamin dışında) CBF'yi azaltır; volatiller eşleşmeyi bozup 1 MAC üzerinde artırır, N₂O belirgin artırır, opioidler etkilemez. [[K1 s. 204]]</li>
    <li>Klinikte transkraniyal Doppler (bir yarıküre, emboli, vazospazm) ve juguler bulbus (global yeterlik) kullanılır; Kety–Schmidt globali, ksenon-133 bölgeseli ölçer. [[K1 s. 204–205]]</li>
  </ul>
  <div data-viz="tamam" data-bolum="48"></div>
  <nav class="ders-gec" aria-label="Bölümler arasında">
    <a href="#/dersler/fizyoloji/47">← Bölüm 47 · Kan–beyin bariyeri</a>
    <a href="#/dersler/fizyoloji/49">Sonraki: Bölüm 49 · İntrakraniyal basınç ve kafa travması →</a>
  </nav>
</section>`,
};
