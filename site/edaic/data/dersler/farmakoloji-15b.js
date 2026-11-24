VERI.sorular = VERI.sorular || {};
VERI.sorular['far15b-1'] = {
  no: 1, kok: 'Lidokain ve meksiletin', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 247–248]]',
  onermeler: [
    { t: 'Lidokain faz 3 repolarizasyonunu uzatır.', d: false, n: 'Faz 3 kısalır ve refrakter dönem de kısalır. [[K3 s. 247]]' },
    { t: 'Kalp yetmezliğinde lidokain klirensi azalır.', d: true, n: 'Karaciğer kan akımının azalması lidokain klirensini düşürür. [[K3 s. 247]]' },
    { t: 'Meksiletin belirgin ilk geçiş metabolizmasına uğrar.', d: false, n: 'İlk geçiş yaklaşık %10 ile sınırlıdır. [[K3 s. 248]]' },
    { t: 'Meksiletin sinüs bradikardisini tetikleyebilir.', d: true, n: 'Sinüs bradikardisi yanında supraventriküler ve ventriküler taşiaritmiler de görülebilir. [[K3 s. 248]]' },
    { t: 'Meksiletinin karaciğerde oluşan metabolitleri aktiftir.', d: false, n: 'Karaciğerde oluşan metabolitler inaktiftir. [[K3 s. 248]]' }
  ]
};
VERI.sorular['far15b-2'] = {
  no: 2, kok: 'Amiodaron, flekainid ve prokainamid', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 249–251]]',
  onermeler: [
    { t: 'Amiodaron T4’ün periferde T3’e dönüşümünü engeller.', d: true, n: 'Periferik dönüşüm baskılanır ve tedavide hem hipotiroidizm hem hipertiroidizm görülebilir. [[K3 s. 249]]' },
    { t: 'Amiodaronun eliminasyon yarı ömrü saatlerle ölçülür.', d: false, n: 'Yarı ömür 20–100 gündür. [[K3 s. 249]]' },
    { t: 'Flekainid pacing eşiğini yükseltir.', d: true, n: 'Flekainid altında kalbi uyarmak için gereken eşik yükselir. [[K3 s. 250]]' },
    { t: 'Flekainid aksiyon potansiyeli süresini uzatır.', d: false, n: 'Faz 0 uzar, toplam aksiyon potansiyeli süresi değişmez. [[K3 s. 250]]' },
    { t: 'Prokainamid kullanan yavaş asetilleyicilerde yan etki olasılığı artar.', d: true, n: 'Asetilasyon genetik farklılık gösterir ve yavaş asetilleyiciler yan etkilere daha yatkındır. [[K3 s. 251]]' }
  ]
};
VERI.sorular['far15b-3'] = {
  no: 3, kok: 'Disopiramid, propafenon, sotalol, fenitoin ve ivabradin', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 252–254]]',
  onermeler: [
    { t: 'Disopiramidin eliminasyon yarı ömrü böbrek yetmezliğinde kısalır.', d: false, n: 'Yaklaşık 5 saatlik yarı ömür böbrek veya kalp yetmezliğinde belirgin uzar. [[K3 s. 252]]' },
    { t: 'Propafenonun ilk geçiş enzimleri doyduğunda biyoyararlanımı artar.', d: true, n: 'Başlangıçta %50 olan oral biyoyararlanım neredeyse %100’e ulaşır. [[K3 s. 253]]' },
    { t: 'Sotalolün L-izomeri β-bloker etki gösterir.', d: true, n: 'L-izomeri sınıf III etkiye ek olarak β-blokaj sağlar. [[K3 s. 253]]' },
    { t: 'Fenitoin digoksinle baskılanmış iletimi artırabilir.', d: true, n: 'İleti sistemi üzerindeki bu etki özellikle digoksinle baskılanmış iletimde belirgindir. [[K3 s. 254]]' },
    { t: 'İvabradin kalp hızını azaltırken inotropiyi korur.', d: true, n: 'SA düğümde seçici Iƒ blokajı kalp hızını yavaşlatır, inotropi değişmez. [[K3 s. 254]]' }
  ]
};

const A15B_NAV = [['vent','Lidokain ve meksiletin'],['amio','Amiodaron'],['iletim','Flekainid ve propafenon'],['ia','Prokainamid ve disopiramid'],['sotalol','Sotalol'],['dugum','Fenitoin ve ivabradin'],['p1','Part I'],['p2','Part II'],['ozet','Özet']];
SAYFALAR['dersler/farmakoloji/15b'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 3 · Bölüm 15 · Ders 15b', baslik: 'Ventriküler ve karma etkili antiaritmikler',
  lede: 'Lidokain ve meksiletin ventriküler taşiaritmilerde kullanılırken amiodaron hem ventriküler hem supraventriküler taşiaritmilerde etkilidir. [[K3 s. 247–249]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A15B_NAV.map(([id,ad],i)=>`<button type="button" data-scroll="a15b-${id}"><span>${i+1}</span>${ad}</button>`).join('')}</nav>
<section class="wrap blk ders-sec" id="a15b-vent">
<h2>Lidokain ve meksiletin</h2>
<p class="intro">Lidokain sınıf Ib bir antiaritmiktir; analoğu meksiletin ventriküler taşiaritmilerde benzer etki gösterir. [[K3 s. 247]]</p>
<div class="viz"><div class="viz-head"><h3>Lidokain düzeyi yükselirken</h3></div><div data-viz="a15b_vent"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Bir plazma düzeyi seçin ve hangi bulguların belirginleştiğini izleyin. Şematik/nitel gösterim. [[K3 s. 247]]</p></div>
<p>Her iki ilaç Na⁺ kanallarını bloke eder, eşik potansiyeli yükseltir ve faz 0 yükselişini yavaşlatır. [[K3 s. 247–248]] Faz 3 kısalınca hem aksiyon potansiyeli hem refrakter dönem kısalır. [[K3 s. 247–248]]</p>
<h3>Lidokain</h3>
<ul class="a15b-profil">
  <li><strong>Kullanım.</strong> Sürekli ventriküler taşiaritmilerde, özellikle inaktive Na⁺ kanallarının baskın olduğu iskemide veya re-entry varlığında kullanılır. [[K3 s. 247]] Lidokain inaktive kanalları bloke eder. [[K3 s. 247]]</li>
  <li><strong>Uygulama.</strong> Aritmide yalnız intravenöz (İV) uygulanır; çözeltileri %1 veya %2’liktir (10–20 mg/ml). [[K3 s. 247]] Erişkinde 1 mg/kg İV bolusu 1–3 mg/dakika infüzyon izler. [[K3 s. 247]] Hepatik kan akımı azalınca metabolizma yavaşlar ve infüzyon hızı düşürülmelidir. [[K3 s. 247]]</li>
</ul>
<h3>Meksiletin</h3>
<ul class="a15b-profil">
  <li><strong>Sunum ve kullanım.</strong> Renksiz çözelti 10 ml’de 250 mg meksiletin hidroklorür içerir; oral modifiye salınımlı formu da vardır. [[K3 s. 248]] Endikasyonları lidokaine benzer; özellikle iskemi veya digoksinle ilişkili aritmilerde kullanılır. [[K3 s. 248]]</li>
  <li><strong>Kardiyak etkiler.</strong> Terapötik oranı düşüktür ve yan etkiler sıktır; sinüs bradikardisini, supraventriküler veya ventriküler taşiaritmileri tetikleyebilir. [[K3 s. 248]]</li>
  <li><strong>Diğer etkiler.</strong> Hastaların %40’ına kadarında tolere edilemeyen bulantı, kusma ve bağırsak alışkanlığında değişiklik görülür. [[K3 s. 248]] Konfüzyon, çift görme, nöbet, tremor ve ataksi görülebilir; trombositopeni, döküntü ve sarılık bildirilmiştir. [[K3 s. 248]]</li>
</ul>
<h3>Kinetik karşılaştırma</h3><div class="tbl-wrap"><table class="tbl a15b-tablo"><thead><tr><th>İlaç</th><th>Dağılım ve eliminasyon</th></tr></thead><tbody>
<tr><th scope="row">Lidokain</th><td>%33’ü iyonize değildir, %70’i proteine bağlıdır. [[K3 s. 247]] Hepatik amidazların oluşturduğu ürünler idrarla atılır. [[K3 s. 247]] Yarı ömür yaklaşık 90 dakikadır; karaciğer işlevi normalse yükleme yapılmadan yaklaşık 6 saatte kararlı düzeye ulaşılır. [[K3 s. 247]] Kalp yetmezliğinde azalan hepatik kan akımı klirensi düşürür. [[K3 s. 247]]</td></tr>
<tr><th scope="row">Meksiletin</th><td>Üst ince bağırsaktan iyi emilir; ilk geçiş yaklaşık %10, oral biyoyararlanım %90’dır. [[K3 s. 248]] Proteine bağlanma %65, dağılım hacmi 6–13 l/kg’dır. [[K3 s. 248]] Karaciğerde inaktif metabolitler oluşur; %20’ye kadarı değişmeden idrarla atılır. [[K3 s. 248]]</td></tr>
</tbody></table></div>
</section>
<section class="wrap blk ders-sec" id="a15b-amio">
<h2>Amiodaron</h2>
<p class="intro">Benzofuran türevi amiodaron supraventriküler taşikardi (SVT), ventriküler taşikardi (VT) ve Wolff–Parkinson–White (WPW) sendromunda kullanılır. [[K3 s. 248]]</p>
<div class="viz"><div class="viz-head"><h3>Potasyum kanalından refrakter döneme</h3></div><div data-viz="a15b_amio"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kanal, repolarizasyon ve yeniden uyarılma arasındaki ilişkiyi adım adım izleyin. Şematik/nitel gösterim. [[K3 s. 249]]</p></div>
<p>Amiodaronun klasik sınıf III etkisine sınıf I, II ve IV etkileri eşlik eder. [[K3 s. 249]]</p>
<h3>Uygulama ve kinetik</h3>
<ul class="a15b-profil">
  <li><strong>Sunum.</strong> Tabletler 100–200 mg, ampuller 150 mg içerir; İV preparat %5 dekstrozla seyreltilir. [[K3 s. 248]] İritan olduğundan santral venden verilir. [[K3 s. 249]]</li>
  <li><strong>İV başlangıç.</strong> 1 saatte 5 mg/kg yüklemeden sonra 24 saatte 15 mg/kg verilir; doz yanıta göre ayarlanır. [[K3 s. 248]]</li>
  <li><strong>Oral tedavi.</strong> İlk hafta günde üç kez 200 mg, ikinci hafta günde iki kez 200 mg, ardından günde bir kez 200 mg verilir. [[K3 s. 248]]</li>
  <li><strong>Dağılım.</strong> Bağırsaktan zayıf emilir; oral biyoyararlanım %50–70, proteine bağlanma > %95, dağılım hacmi 2–70 l/kg’dır. [[K3 s. 249]] Kas ve yağ dokusunda birikir; eliminasyon yarı ömrü 20–100 gündür. [[K3 s. 249]]</li>
  <li><strong>Metabolizma ve atılım.</strong> Karaciğerde oluşan desmetilamiodaronun bir miktar antiaritmik etkisi var gibi görünür. [[K3 s. 249]] Atılım gözyaşı bezleri, deri ve safra yoluyla olur. [[K3 s. 249]]</li>
</ul>
<h3>Yan etkiler ve izlem</h3>
<ul class="a15b-profil">
  <li><strong>Süre.</strong> Uzun tedavide hastaların çoğunda yan etki görülür; çoğu ilaç kesilince düzelir. [[K3 s. 249]]</li>
  <li><strong>Akciğer.</strong> Pnömonit, fibrozis veya plörit için bildirilen insidans 3 yılda %10, mortalite %10’dur. [[K3 s. 249]] Erken kesilirse süreç geri dönebilir; kritik hastalarda yüksek FᵢO₂ akut akciğer toksisitesine yatkınlık oluşturabilir. [[K3 s. 249]]</li>
  <li><strong>Tiroid.</strong> Periferde T4’ün T3’e dönüşümü engellenir; hipertiroidizm (%0,9) ve hipotiroidizm (%6) genellikle geri dönüşlüdür. [[K3 s. 249]]</li>
  <li><strong>Karaciğer.</strong> Siroz, hepatit ve sarılık bildirilmiştir; uzun tedaviden önce ve tedavi sırasında karaciğer fonksiyon testleri yapılır. [[K3 s. 249]]</li>
  <li><strong>Kalp.</strong> Yüksek dozun hızlı verilmesi bradikardi ve hipotansiyon yapabilir; QT uzayabilir, ancak proaritmi potansiyeli düşüktür. [[K3 s. 249]]</li>
  <li><strong>Göz.</strong> Sık görülen kornea mikrodepozitleri geri dönüşlüdür ve klinik önemleri azdır; haleler ve hafif bulanıklık yapabilirler. [[K3 s. 249]] Uzun tedavide yıllık göz muayenesi önerilir. [[K3 s. 249]]</li>
  <li><strong>Bağırsak ve sinir-kas.</strong> Yüklemede metalik tat, bazen hafif bağırsak rahatsızlığı görülür. [[K3 s. 249]] Periferik nöropati ve nadiren miyopati bildirilmiştir. [[K3 s. 249]]</li>
  <li><strong>Deri.</strong> Işığa duyarlılık tedavi bittikten sonra aylarca sürebilir; özellikle yüz arduvaz grisi renk alabilir. [[K3 s. 249]]</li>
</ul>
<h3>Etkileşimler</h3>
<ul class="a15b-profil">
  <li><strong>Plazma proteinleri.</strong> Yüksek oranda bağlı fenitoin ve varfarinin etkisi artar; dozları ayarlanmalıdır. [[K3 s. 249]] Kitap, digoksinin bağlanma yerinden ayrılmasıyla plazma düzeyinin yükselebileceğini ve toksisite gelişebileceğini belirtir. [[K3 s. 249]]</li>
  <li><strong>İleti ve QT.</strong> AV iletisini yavaşlatan β-blokerler ve verapamille dikkat gerekir. [[K3 s. 249]] Torsades de pointes riski nedeniyle QT uzatan diğer ilaçlarla (fenotiyazinler, trisiklik antidepresanlar, tiyazidler) birlikte verilmemelidir. [[K3 s. 249]]</li>
</ul>
</section>
<section class="wrap blk ders-sec" id="a15b-iletim">
<h2>Flekainid ve propafenon</h2>
<p class="intro">Her ikisi de hızlı Na⁺ girişini engelleyerek faz 0’ı uzatır; refrakter döneme etkileri farklıdır. [[K3 s. 250]] [[K3 s. 252]]</p>
<div class="viz"><div class="viz-head"><h3>İleti dokusunda aynı başlangıç, farklı sonuç</h3></div><div data-viz="a15b_iletim"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">İlacı değiştirerek hızlı Na⁺ girişinden sonra aksiyon potansiyeli süresinin ve refrakter dönemin nasıl değiştiğini karşılaştırın. Şematik/nitel gösterim. [[K3 s. 250–252]]</p></div>
<p>Flekainidin etkileri ileti yollarında özellikle belirgindir. [[K3 s. 250]] Propafenon eşik potansiyeli ve ventriküler fibrilasyon (VF) eşiğini yükseltir, uyarılabilirliği azaltır; yüksek dozda bir miktar β-blokaj gösterebilir. [[K3 s. 252]]</p>
<h3>Flekainid</h3>
<ul class="a15b-profil">
  <li><strong>Özellik ve kullanım.</strong> Amid tipi lokal anestezik ve sınıf Ic antiaritmiktir; WPW dahil atriyal ve ventriküler taşiaritmilere güçlü etki gösterir. [[K3 s. 250]]</li>
  <li><strong>Doz.</strong> Oral doz günde iki kez 100 mg, günlük üst sınır 400 mg’dır. [[K3 s. 250]] İV yükleme 10–30 dakikada 2 mg/kg’dır (en çok 150 mg). [[K3 s. 250]] Ardından infüzyon 1,5 mg/kg/saat ile başlayabilir; hız 24 saate kadar 100–250 µg/kg/saat’e düşürülür (24 saatte en çok 600 mg). [[K3 s. 250]]</li>
  <li><strong>İleti ve hız.</strong> Mevcut ileti bozukluğunu belirginleştirebilir; SA veya AV düğüm hastalığında ve dal bloğunda dikkat gerekir. [[K3 s. 250]] Atriyal fibrilasyon veya flutterda ventrikül hızı paradoksal olarak artabilir; pacing eşiği yükselir. [[K3 s. 250]]</li>
  <li><strong>Diğer riskler.</strong> İnfarktüs sonrası ventriküler ektopiyi baskılamak için kullanımı artmış mortaliteyle ilişkilidir. [[K3 s. 250]] Negatif inotropi kalp yetmezliğinde kullanımını güçleştirebilir; baş dönmesi, parestezi ve baş ağrısı görülebilir. [[K3 s. 250]]</li>
  <li><strong>Kinetik.</strong> Bağırsaktan iyi emilir; oral biyoyararlanım %90, proteine bağlanma yaklaşık %50, dağılım hacmi 6–10 l/kg’dır. [[K3 s. 250]] Karaciğerde oluşan aktif metabolitler değişmemiş ilaçla birlikte idrarla atılır. [[K3 s. 250]]</li>
</ul>
<h3>Propafenon</h3>
<ul class="a15b-profil">
  <li><strong>Sunum ve doz.</strong> Birleşik Krallık’ta yalnız film kaplı tablet bulunur; İV 1–2 mg/kg kullanılmıştır. [[K3 s. 252]] Oral başlangıç 600–900 mg, ardından günde iki veya üç kez 150–300 mg’dır. [[K3 s. 252]]</li>
  <li><strong>Kullanım.</strong> Atriyal fibrilasyon ve flutter dahil dirençli SVT’de ve ventriküler taşiaritmilerde ikinci basamak tedavidir. [[K3 s. 252]]</li>
  <li><strong>Yan etkiler.</strong> Genellikle iyi tolere edilir; zayıf β-blokaj nedeniyle kalp yetmezliğinde dikkat gerekir ve astım tetiklenebilir. [[K3 s. 252]] Hafif sinir sistemi etkileri, yüksek dozda belirginleşen gastrointestinal etkiler ve miyastenia graviste kötüleşme görülebilir. [[K3 s. 252]] Digoksin ve varfarinin plazma düzeylerini yükseltir. [[K3 s. 252]]</li>
  <li><strong>Kinetik.</strong> Emilim neredeyse tamdır; ilk geçiş enzimleri doyunca başlangıçta %50 olan biyoyararlanım orantısız artarak yaklaşık %100’e ulaşır. [[K3 s. 253]] Proteine bağlanma > %95’tir; hepatik metabolizma nedeniyle değişmeden atılan miktar çok azdır. [[K3 s. 253]] Metabolize eden enzimdeki genetik polimorfizm bazı hastalarda yanıtı artırabilir. [[K3 s. 253]]</li>
</ul>
</section>
<section class="wrap blk ders-sec" id="a15b-ia">
<h2>Prokainamid ve disopiramid</h2>
<p class="intro">Her iki sınıf Ia ilaç Na⁺ kanallarını bloke eder, faz 0 yükselişini yavaşlatır, eşik potansiyeli yükseltir ve refrakter dönemi uzatır. [[K3 s. 251–252]]</p>
<div class="viz"><div class="viz-head"><h3>Hangi risk öne çıkar?</h3></div><div data-viz="a15b_ia"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">İlaç seçerek kullanımını sınırlayan etkileri karşılaştırın. Şematik/nitel gösterim. [[K3 s. 251–252]]</p></div>
<p>Kitap prokainamidle aksiyon potansiyeli süresinin değişmediğini, disopiramidle ise refrakter dönemdeki uzamaya eşlik ederek arttığını belirtir. [[K3 s. 251–252]]</p>
<aside class="note plain"><b>Atlas notu.</b> Kitap prokainamidin aksiyon potansiyeli süresini değiştirmediğini söyler. Deneysel koşullarda bu süre uzayabilir.</aside>
<h3>Prokainamid</h3>
<ul class="a15b-profil">
  <li><strong>Kullanım.</strong> Kinidine benzer, ancak vagal tonusu daha az baskılar. [[K3 s. 250–251]] SVT ve ventriküler taşiaritmilerde kullanılmıştır; VT’yi sonlandırmada lidokain kadar etkilidir. [[K3 s. 250]]</li>
  <li><strong>Doz.</strong> Oral doz bölünerek en çok 50 mg/kg/gün verilir. [[K3 s. 250]] İV 100 mg yavaş uygulanır (toplam en çok 1 g); ardından 2–6 mg/dakika infüzyon uygulanabilir ve sonrasında oral tedaviye geçilir. [[K3 s. 250]]</li>
  <li><strong>Dolaşım.</strong> İV uygulama vazodilatasyon, hipotansiyon ve kalp debisinde azalma yapabilir. [[K3 s. 251]] Kalp bloğu, SVT’de ventriküler yanıtın hızlanması, QT uzaması ve torsades de pointes görülebilir. [[K3 s. 251]]</li>
  <li><strong>Diğer etkiler.</strong> Kronik kullanımda antinükleer faktör pozitif lupus sendromu %20–30 oranında gelişir; olguların birçoğu yavaş asetilleyicidir. [[K3 s. 251]] Hafif gastrointestinal rahatsızlık, ateş ve döküntü olabilir; para-aminobenzoik asit oluşumu sülfonamidlerin antimikrobiyal etkisini azaltır. [[K3 s. 251]]</li>
  <li><strong>Kinetik.</strong> Bağırsaktan iyi emilir, oral biyoyararlanımı %75’tir; 3 saatlik yarı ömür sık doz veya yavaş salınımlı form gerektirir. [[K3 s. 251]] Hepatik amidazlar ve asetilasyon metabolizmada rol oynar; asetilasyonla aktif N-asetilprokainamid oluşur. [[K3 s. 251]] Genetik polimorfizm hızlı ve yavaş asetilleyicileri ayırır; yavaş grupta yan etki olasılığı yüksektir. [[K3 s. 251]]</li>
</ul>
<h3>Disopiramid</h3>
<ul class="a15b-profil">
  <li><strong>Kullanım.</strong> SVT ve ventriküler taşiaritmilerde ikinci basamaktır; atriyal fibrilasyon veya flutterda önce β-bloker ya da verapamille ventriküler hız kontrol edilir. [[K3 s. 251]]</li>
  <li><strong>Sunum ve doz.</strong> Normal veya yavaş salınımlı tablet ve 10 mg/ml çözelti bulunur. [[K3 s. 251]] Oral doz bölünerek günde en çok 800 mg verilir. [[K3 s. 251]] İV yükleme 30 dakikada 2 mg/kg (en çok 150 mg), ardından infüzyon 1 mg/kg/saat’tir (en çok 800 mg/gün). [[K3 s. 251]]</li>
  <li><strong>Kalp.</strong> Düzey yükseldikçe QT uzar, bazen torsades de pointes gelişir. [[K3 s. 252]] Kontraktilite azalırken ventriküler uyarılabilirlik artar ve re-entry kolaylaşabilir; kalp yetmezliği ve kardiyojenik şok nadirdir. [[K3 s. 252]]</li>
  <li><strong>Kinetik.</strong> Emilim iyidir, oral biyoyararlanım %75’tir; kitap böbrekte kısmi metabolizma tarif eder, değişmeden idrarla atılım başlıca eliminasyon yoludur. [[K3 s. 252]] Yaklaşık 5 saatlik yarı ömür böbrek veya kalp yetmezliğinde belirgin uzar. [[K3 s. 252]]</li>
</ul>
</section>
<section class="wrap blk ders-sec" id="a15b-sotalol">
<h2>Sotalol</h2>
<p class="intro">Rasemik sotalol nonselektif bir β-blokerdir; kitap ayrıca sınıf I ve III aktivite tanımlar. [[K3 s. 253]]</p>
<div class="viz"><div class="viz-head"><h3>Sotalolün iki izomeri</h3></div><div data-viz="a15b_sotalol"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">İzomeri değiştirin ve hangi etkinin iki izomerde ortak olduğunu görün. Şematik/nitel gösterim. [[K3 s. 253]]</p></div>
<p>İleti dokusunda aksiyon potansiyeli uzadığında efektif refrakter dönem de uzar. [[K3 s. 253]]</p>
<aside class="note plain"><b>Atlas notu.</b> Kitap sotalole sınıf I etki de atfeder. Sotalolün yerleşik sınıflaması II ve III’tür.</aside>
<h3>Sotalolün klinik profili</h3>
<ul class="a15b-profil">
  <li><strong>Kullanım.</strong> Ventriküler taşiaritmilerde tedavi, paroksismal SVT’de profilaksi amacıyla kullanılır. [[K3 s. 253]] Atriyal fibrilasyonun DC kardiyoversiyonundan sonra sinüs ritmini sürdürmede diğer β-blokerlerden daha etkilidir; fibrilasyon tekrarlarsa ventrikül hızı da iyi kontrol edilir. [[K3 s. 253]]</li>
  <li><strong>Sunum ve doz.</strong> Tablet veya 4 ml’de 40 mg çözelti bulunur; oral doz günde iki kez 80–160 mg, İV doz 20 dakikada 50–100 mg’dır. [[K3 s. 253]]</li>
  <li><strong>Kardiyak risk.</strong> En ciddi yan etki torsades de pointes’tir; sürekli VT veya VF için tedavi edilenlerin %2’sinden azında görülür. [[K3 s. 253]] Yüksek doz, uzun QT ve elektrolit dengesizliği riski artırır; kalp yetmezliği de tetiklenebilir. [[K3 s. 253]]</li>
  <li><strong>Diğer riskler.</strong> Bronkospazm, hipoglisemi belirtilerinin maskelenmesi, görme ve cinsel işlev bozuklukları nadirdir. [[K3 s. 253]]</li>
  <li><strong>Kinetik.</strong> Tam emilir, oral biyoyararlanımı > %90’dır; plazma proteinlerine bağlanmaz, metabolize edilmez. [[K3 s. 253]] Yaklaşık %90’ı değişmeden idrarla, kalanı safrayla atılır; böbrek işlev bozukluğunda klirens belirgin azalır. [[K3 s. 253]]</li>
</ul>
</section>
<section class="wrap blk ders-sec" id="a15b-dugum">
<h2>Fenitoin ve ivabradin</h2>
<p class="intro">Fenitoinin digoksin aritmilerindeki rolü sınırlıdır; ivabradin ise sinüs düğümünün pacemaker akımını seçici biçimde baskılar. [[K3 s. 253–254]]</p>
<div class="viz"><div class="viz-head"><h3>İvabradin ve faz 4</h3></div><div data-viz="a15b_dugum"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Kanalın açılmasından seçici blokaja ilerleyerek kalp hızı ile inotropinin yanıtlarını ayırt edin. Şematik/nitel gösterim. [[K3 s. 254]]</p></div>
<p>“Funny” adı, keşfedildiğinde akımın diğer akımlardan farklı özellikler göstermesinden gelir. [[K3 s. 254]] HCN, hiperpolarizasyonla aktive olan siklik nükleotid kapılı kanalı belirtir. [[K3 s. 254]]</p>
<h3>Fenitoin</h3>
<ul class="a15b-profil">
  <li><strong>Kullanım ve mekanizma.</strong> Başlıca antiepileptiktir. [[K3 s. 253]] Normal pacemaker aktivitesini baskılar, özellikle digoksinle baskılanmış iletimi artırır; Na⁺ kanal blokajı sınıf I etki sağlar. [[K3 s. 253–254]]</li>
</ul>
<h3>İvabradin</h3>
<ul class="a15b-profil">
  <li><strong>Sunum ve kullanım.</strong> Benzen ve azepin halkalı bir benzazepindir; tabletleri 2,5–7,5 mg içerir. [[K3 s. 254]] Kronik stabil anjina ve hafif/ağır kalp yetmezliğinde kullanılır; etki tedavi öncesi istirahat hızı > 75 atım/dakika olanlarda en belirgin görünür. [[K3 s. 254]]</li>
  <li><strong>Doz ve birliktelik.</strong> Günde iki kez 5 mg ile başlanır, günde iki kez 7,5 mg’a çıkılır. [[K3 s. 254]] Kitap kalsiyum kanal blokerleriyle birlikte kullanımı kontrendike olarak niteler. [[K3 s. 254]]</li>
</ul>
<aside class="note plain"><b>Atlas notu.</b> Kitap kontrendikasyonu tüm kalsiyum kanal blokerlerine geneller. Kontrendike birliktelik hız düşüren verapamil veya diltiazem iledir.</aside>
<ul class="a15b-profil">
  <li><strong>Yan etkiler.</strong> Görsel parlaklık hissi, bulanık görme, birinci derece kalp bloğu, baş ağrısı, baş dönmesi ve kontrolsüz kan basıncı görülebilir. [[K3 s. 254]]</li>
  <li><strong>Kinetik.</strong> Oral biyoyararlanım %40, proteine bağlanma %70, eliminasyon yarı ömrü 2 saattir. [[K3 s. 254]] Hepatik CYP3A4 ile oluşan aktif N-desmetillenmiş türev safra ve idrarla eşit oranda atılır. [[K3 s. 254]] Güçlü CYP3A4 inhibitörleri ve greyfurt suyuyla kullanımı önerilmez. [[K3 s. 254]]</li>
</ul>
</section>
<section class="wrap blk ders-sec" id="a15b-p1">
<h2>Part I · MTF</h2><p>Her önermeyi doğru veya yanlış olarak işaretleyin.</p>
<div data-viz="mtf" data-q="far15b-1"></div>
<div data-viz="mtf" data-q="far15b-2"></div>
<div data-viz="mtf" data-q="far15b-3"></div>
</section>
<section class="wrap blk ders-sec" id="a15b-p2">
<h2>Part II · SOE 2 · Farmakoloji</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Ventriküler taşikardide lidokain ile amiodaronu hedef kanal, refrakter dönem, İV uygulama ve toksisite açısından nasıl karşılaştırırsınız?</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Lidokain özellikle iskemi veya re-entry ile ilişkili sürekli ventriküler taşiaritmilerde kullanılır. [[K3 s. 247]] Amiodaronun kullanım alanı SVT ve WPW’yi de kapsar. [[K3 s. 248]]</li>
<li>Lidokain inaktive Na⁺ kanallarını bloke eder; faz 0 yükselişi yavaşlar, faz 3 ve refrakter dönem kısalır. [[K3 s. 247]]</li>
<li>Amiodaron K⁺ kanal blokajıyla repolarizasyonu yavaşlatır; aksiyon potansiyeli ve refrakter dönem uzar. [[K3 s. 249]]</li>
<li>Lidokainde 1 mg/kg İV bolusu 1–3 mg/dakika infüzyon izler; düşük hepatik kan akımında hız azaltılır. [[K3 s. 247]]</li>
<li>Amiodaron %5 dekstrozla seyreltilir; 1 saatte 5 mg/kg, ardından 24 saatte 15 mg/kg başlangıç için verilir ve yanıta göre ayarlanır. [[K3 s. 248]] İritan preparat santral venden uygulanır. [[K3 s. 249]]</li>
<li>Lidokainde ağız çevresinde karıncalanma erken, AV blok ve dirençli hipotansiyon daha yüksek düzeylerde görülür. [[K3 s. 247]] Amiodaronda hızlı ve yüksek doz bradikardi veya hipotansiyon yapabilir; uzun tedavide akciğer, tiroid, karaciğer ve göz etkileri önem kazanır. [[K3 s. 249]]</li>
</ol>
<div class="cols"><div class="note"><b>Çizin.</b> Lidokain ve amiodaron için iki sütun açın. Hedef kanaldan repolarizasyona, oradan refrakter döneme ok çizin ve değişimin yönünü gösterin. [[K3 s. 247]] [[K3 s. 249]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Amiodaron alan kişide varfarin dozu neden gözden geçirilir? [[K3 s. 249]] Sotalolle torsades de pointes riski hangi koşullarda artar? [[K3 s. 253]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a15b-ozet">
<h2>Özet</h2><ul class="ozet">
<li>Lidokain ve meksiletin faz 3’ü kısaltır; lidokain infüzyon hızını hepatik kan akımı etkiler. [[K3 s. 247–248]]</li>
<li>Amiodaronun yarı ömrü 20–100 gündür; uzun tedavide yan etkiler birden çok organı tutar. [[K3 s. 249]]</li>
<li>Flekainidle toplam aksiyon potansiyeli süresi değişmez; propafenonla özellikle ileti dokusunda uzar. [[K3 s. 250]] [[K3 s. 252]]</li>
<li>Prokainamidde yavaş asetilasyon yan etkiye yatkınlık yaratır; disopiramidde antikolinerjik etkiler toleransı sınırlayabilir. [[K3 s. 251–252]]</li>
<li>Sotalolün klirensi böbrek işlevine bağlıdır; uzun QT torsades de pointes riskini artırır. [[K3 s. 253]]</li>
<li>Fenitoin digoksinle baskılanmış iletimi artırır; ivabradin ise SA düğümde pacemaker akımını azaltır. [[K3 s. 254]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="15b"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/15a">← 15a · Aritmiler, sınıflama ve supraventriküler taşiaritmi ilaçları</a><a href="#/dersler/farmakoloji/16a">Sonraki: 16a · Nitrovazodilatörler ve potasyum kanal aktivatörleri →</a></nav>
</section>`,
};
