/* Farmakoloji · Bölüm 18 · Ders 18c: Antikonvülzanlar (K3 s. 289–294, Türkçe çalışma çevirisi). */
VERI.sorular = VERI.sorular || {};
VERI.sorular['far18c-1'] = {
  no: 1, kok: 'Fenitoin ve karbamazepin', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 289–290]]',
  onermeler: [
    { t: 'Fenitoin %5 dekstroz çözeltisi içinde karıştırılarak güvenle infüze edilebilir.', d: false, n: 'Yanlış. Jelatinimsi hale geldiğinden %5 dekstrozla geçimsizdir. [[K3 s. 289]]' },
    { t: 'Fenitoin terapötik aralığın hemen üzerinde sıfırıncı derece kinetik gösterir.', d: true, n: 'Doğru. Doyurulabilir hepatik hidroksilasyona uğrar; normal terapötik düzeyi 10–20 μg/mL’dir. [[K3 s. 289]]' },
    { t: 'Metronidazol ve izoniazid fenitoin metabolizmasını indükleyerek plazma düzeyini düşürür.', d: false, n: 'Yanlış. Metronidazol, kloramfenikol ve izoniazid fenitoin metabolizmasını inhibe ederek toksik düzeylere yol açabilir. [[K3 s. 289]]' },
    { t: 'Karbamazepinin 10,11-epoksid metaboliti antikonvülzan aktivitesinin yaklaşık %30’unu korur.', d: true, n: 'Doğru. Karbamazepin ayrıca kendi metabolizmasını ve hepatik enzimleri güçlü biçimde indükler. [[K3 s. 290]]' },
    { t: 'Karbamazepin güçlü osmotik diürez oluşturarak hipovolemiye neden olur.', d: false, n: 'Yanlış. Tersine su retansiyonuna yol açan antidiüretik bir etki oluşturabilir. [[K3 s. 290]]' },
  ],
};
VERI.sorular['far18c-2'] = {
  no: 2, kok: 'Sodyum valproat, lamotrijin ve vigabatrin', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 290–292]]',
  onermeler: [
    { t: 'Sodyum valproat absans (petit mal) nöbetlerinin tedavisinde kullanılır.', d: true, n: 'Doğru. Ayrıca trigeminal nevralji tedavisinde de kullanılır. [[K3 s. 290]]' },
    { t: 'Sodyum valproatın teratojenik etkisi yoktur ve gebelikte nöral tüp defektleriyle ilişkili değildir.', d: false, n: 'Yanlış. Nöral tüp defektlerine neden olur. [[K3 s. 290]]' },
    { t: 'Lamotrijinin oral biyoyararlanımı %98 ve eliminasyon yarılanma ömrü 14 saattir.', d: true, n: 'Doğru. Konjuge edilerek inaktif bir metabolite dönüşür. [[K3 s. 291]]' },
    { t: 'Vigabatrinin etki süresi yaklaşık 6 saatlik eliminasyon yarılanma ömrüyle sınırlıdır.', d: false, n: 'Yanlış. Eliminasyon yarılanma ömrü 6 saattir, ancak etki süresi 24 saattir; mekanizmanın GABA-transaminazın geri dönüşümsüz inhibisyonu olduğu düşünülür. [[K3 s. 292]]' },
    { t: 'Vigabatrin bilinmeyen bir mekanizmayla fenitoin konsantrasyonunu %25’e kadar azaltır.', d: true, n: 'Doğru. İdrarla değişmeden atılır. [[K3 s. 292]]' },
  ],
};
VERI.sorular['far18c-3'] = {
  no: 3, kok: 'Gabapentin ve pregabalin', kagit: 'Paper A · Farmakoloji', kaynak: '[[K3 s. 291–292]]',
  onermeler: [
    { t: 'Gabapentin ve pregabalin plazma proteinlerine yüksek oranda (%90) bağlanır.', d: false, n: 'Yanlış. Her iki ilaç da plazma proteinlerine bağlanmaz ve metabolize edilmez. [[K3 s. 292]]' },
    { t: 'Gabapentin kortikal nöronlardaki voltaj kapılı Ca²⁺ kanallarının α₂δ alt birimine etki eder.', d: true, n: 'Doğru. Ayrıca sinaptik GABA konsantrasyonunu artırır ve bir miktar NMDA antagonisti aktivitesi olabilir. [[K3 s. 291]]' },
    { t: 'Pregabalinin oral biyoyararlanımı doz arttıkça azalır.', d: false, n: 'Yanlış. Doz arttıkça biyoyararlanımı azalan gabapentindir (~%60); pregabalinin biyoyararlanımı doza göre değişmez (%90), yalnız besinlerle gecikir. [[K3 s. 292]]' },
    { t: 'Pregabalin de gabapentin gibi sinaptik GABA konsantrasyonunu belirgin şekilde yükseltir.', d: false, n: 'Yanlış. Pregabalin Ca²⁺ kanallarının α₂δ alt birimine bağlanır ancak sinaptik GABA konsantrasyonunu değiştirmiyor gibi görünür. [[K3 s. 292]]' },
    { t: 'Gabapentinin oral biyoyararlanımı yaklaşık %60 olup yalnız böbrekler yoluyla elimine edilir.', d: true, n: 'Doğru. Eliminasyon yarılanma ömrü 6 saattir. [[K3 s. 292]]' },
  ],
};

const A18C_NAV = [
  ['klasik', 'Fenitoin & Karbamazepin'], ['valproat', 'Valproat, Fenobarbital & BDZ'],
  ['yeni', 'Lamotrijin & Vigabatrin'], ['gabapentinoid', 'Gabapentin & Pregabalin'],
  ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet'],
];

SAYFALAR['dersler/farmakoloji/18c'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 4 · Bölüm 18 · Ders 18c', baslik: 'Antikonvülzanlar',
  lede: 'İlaç etkileşimlerini önlemek ve ikinci ajanla nadiren iyileşme görüldüğü için epilepside mümkün olduğunda tek ajan kullanılır; bu ders klasik ve yeni antikonvülzanları kapsar. [[K3 s. 289–292]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A18C_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a18c-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a18c-klasik">
  <h2>Fenitoin ve karbamazepin</h2>
  <p class="intro">İkisi de muhtemelen inaktive Na⁺ kanallarını stabilize ederek yeni aksiyon potansiyellerini önler ve hepatik enzimleri indükler (Bölüm 18 girişi <a href="#/dersler/farmakoloji/18a">18a</a>’dadır). [[K3 s. 289–290]]</p>
  <div class="viz"><div class="viz-head"><h3>Fenitoinde doyurulabilir hidroksilasyon ve sıfırıncı derece kinetik</h3></div><div data-viz="a18c_fenitoin"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Eğri şematik; 10–20 μg/mL terapötik aralık ve %9 oranı kitaptan. [[K3 s. 289]]</p></div>
  <div class="cols" style="margin-top:16px">
    <div class="card"><span class="tag clin">Fenitoin</span><ul class="ozet" style="margin-top:8px">
      <li><b>Kullanım.</b> Grand mal ve parsiyel nöbetler, trigeminal nevralji, TCA doz aşımı sonrası ventriküler aritmiler. Oral veya İV; %5 dekstrozla geçimsizdir (jelatinimsi olur). ~%9 yavaş hidroksilleyici nedeniyle bireysel doz ve kan düzeyi (10–20 μg/mL) yararlıdır. [[K3 s. 289]]</li>
      <li><b>Mekanizma.</b> İnaktive Na⁺ kanalı stabilizasyonu; ayrıca Ca²⁺ girişini azaltarak transmiter salınımını bloke edebilir ve GABA etkisini artırabilir. [[K3 s. 289]]</li>
      <li><b>Etkiler.</b> İdiyosenkratik: akne, yüz kabalaşması, hirsutizm, diş eti hiperplazisi, folata bağımlı megaloblastik anemi, aplastik anemi, döküntüler, periferik nöropati. Doza bağlı: ataksi, nistagmus, parestezi, vertigo, peltek konuşma; seyreltilmeden hızlı İV hipotansiyon ve kalp bloğuyla ilişkilidir. Teratojenite: kraniyofasiyal anomali, büyüme geriliği, ekstremite/kalp defektleri, mental retardasyon. [[K3 s. 289]]</li>
      <li><b>Etkileşim.</b> Karma fonksiyonlu oksidaz indüksiyonuyla varfarin, BDZ ve oral kontraseptif metabolizmasını artırır. Metronidazol, kloramfenikol, izoniazid inhibe ederek toksisite yapar; karbamazepin ve alkol indükleyerek düzeyi düşürebilir. [[K3 s. 289]]</li>
    </ul></div>
    <div class="card"><span class="tag basic">Karbamazepin</span><ul class="ozet" style="margin-top:8px">
      <li><b>Kullanım.</b> Trigeminal nevraljide de kullanılır; etki biçimi fenitoine benzer; oral veya rektal verilir. [[K3 s. 289]]</li>
      <li><b>Etkiler.</b> Baş ağrısı, diplopi, ataksi, kusma ve uyku hali sıktır, çoğu kez kullanımı sınırlar. Antidiüretik etkiyle su retansiyonu; ilaca bağlı hepatit, %5–10 döküntü, nadiren agranülositoz görülür. [[K3 s. 290]]</li>
      <li><b>Teratojenite.</b> Yüz anomalileri, intrauterin büyüme geriliği, mikrosefali ve mental retardasyon (~1/300–2000 canlı doğum; insidans dozla artar). [[K3 s. 290]]</li>
      <li><b>Etkileşim ve kinetik.</b> Güçlü enzim indüksiyonu ve otoindüksiyon yapar; eşzamanlı fenitoin düzeyi artabilir veya azalabilir, eritromisin karbamazepini artırabilir. Aktivitesinin ~%30’unu koruyan 10,11-epokside dönüşür ve konjuge olmamış metabolitler halinde idrarla atılır. [[K3 s. 290]]</li>
    </ul></div>
  </div>
  <div class="note plain"><b>Atlas notu.</b> Kitap TCA doz aşımı kaynaklı ventriküler aritmilerde fenitoini sayar; ek Na⁺ kanalı blokajı riski nedeniyle güncel yaklaşımda fenitoinden kaçınılır, sodyum bikarbonat tercih edilir.</div>
</section>

<section class="wrap blk ders-sec" id="a18c-valproat">
  <h2>Sodyum valproat, fenobarbital ve benzodiazepinler</h2>
  <p class="intro">Sodyum valproat Na⁺ kanallarına ve santral GABA-erjik yollara, benzodiazepinler GABA’nın Cl⁻ kanalına etki eder; valproat absans (petit mal) nöbetlerinde de kullanılır. [[K3 s. 290–291]]</p>
  <div class="viz"><div class="viz-head"><h3>Antikonvülzanların başlıca etki mekanizmaları</h3></div><div data-viz="a18c_mekanizma"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel etki sınıfı haritası. [[K3 s. 289–292]]</p></div>
  <ul class="ozet">
    <li><b>Sodyum valproat.</b> Çeşitli epilepsiler (absans dahil) ve trigeminal nevraljide kullanılır; inaktif Na⁺ kanalı stabilizasyonu ve santral GABA-erjik yol uyarımıyla etki ediyor görünür. [[K3 s. 290]] Genelde iyi tolere edilir; bulantı, gastrik irritasyon, pankreatit, potansiyel ölümcül hepatotoksisite, trombositopeni, trombosit agregasyonunda azalma, geçici saç dökülmesi ve nöral tüp defektleri (teratojenite) görülür. [[K3 s. 290]]</li>
    <li><b>Fenobarbital ve BDZ.</b> Uzun etkili barbitürat fenobarbital etkilidir ancak belirgin sedasyonla sınırlıdır; enzim indüksiyonuyla varfarin, oral kontraseptif ve diğer antikonvülzanlarla etkileşir. [[K3 s. 290–291]] Benzodiazepinler status epileptikus acil tedavisinde GABA Cl⁻ kanalını güçlendirir (bkz. <a href="#/dersler/farmakoloji/18a">18a</a>). [[K3 s. 291]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a18c-yeni">
  <h2>Lamotrijin ve vigabatrin</h2>
  <p class="intro">Adjuvan antikonvülzanlardan lamotrijin eksitatör nöron Na⁺ kanallarına, vigabatrin ise GABA yıkım enzimine etki eder. [[K3 s. 291–292]]</p>
  <div class="viz"><div class="viz-head"><h3>Lamotrijin ile vigabatrin farkları</h3></div><div data-viz="a18c_yeni"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Etki süresi, t½ ve biyoyararlanım kitaptan. [[K3 s. 291–292]]</p></div>
  <ul class="ozet">
    <li><b>Lamotrijin.</b> Erişkin ve ≥2 yaş çocuklarda çeşitli nöbetlerde adjuvan, ayrıca bipolar bozuklukta duygudurum düzenleyicidir; kimyasal olarak diğerleriyle ilişkisizdir. [[K3 s. 291]] Glutamat ve aspartat üreten nöronlarda voltaja duyarlı Na⁺ kanallarını inaktive eder (başka mekanizmaları olabilir). Hepatotoksisite, pankreatit, bulantı, yaşamı tehdit eden deri reaksiyonları ve az sayıda nöroleptik malign sendrom bildirilmiştir. [[K3 s. 291]]</li>
    <li><b>Vigabatrin.</b> Kompleks parsiyel nöbetlerde adjuvan olarak günde 2 kez maks 1,5 g kullanılır. [[K3 s. 292]] GABA-transaminazı geri dönüşümsüz inhibe ettiği düşünülür; t½ 6 saat olsa da etki 24 saat sürer ve fenitoin düzeyini bilinmeyen mekanizmayla %25’e kadar azaltır. [[K3 s. 292]]</li>
  </ul>
</section>

<section class="wrap blk ders-sec" id="a18c-gabapentinoid">
  <h2>Gabapentin, pregabalin ve kinetik karşılaştırması</h2>
  <p class="intro">Gabapentin ve pregabalin kortikal voltaj kapılı Ca²⁺ kanallarının α₂δ alt birimine bağlanır, proteine bağlanmaz ve metabolize edilmeden böbrekle atılır. [[K3 s. 291–292]]</p>
  <div class="viz"><div class="viz-head"><h3>Gabapentin ve pregabalin karşılaştırması</h3></div><div data-viz="a18c_gaba_preg"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Doz ve kinetik veriler kitaptan. [[K3 s. 291–292]]</p></div>
  <ul class="ozet">
    <li><b>Gabapentin.</b> Fokal nöbette 900–1200 mg/gün, nöropatik ağrıda 1800 mg/gün (artırılarak başlanır, azaltılarak kesilir); postoperatif ağrı premedikasyonunda kullanılmıştır. [[K3 s. 291]] Presinaptik α₂δ etkisi yanında sinaptik GABA’yı artırır ve olası NMDA antagonizması taşır; sık viral enfeksiyon, ataksi, baş dönmesi, yorgunluk, ateş ve psikiyatrik belirtiler yapabilir. [[K3 s. 291]]</li>
    <li><b>Pregabalin.</b> Erişkin parsiyel nöbette adjuvan ve anksiyetede kullanılır; gabapentinin yerini almak üzere tasarlanmıştır. [[K3 s. 292]] Sinaptik GABA’yı değiştirmiyor görünür; sıklıkla baş dönmesi ve uyku hali, ayrıca kilo artışı, konfüzyon, ataksi, GİS rahatsızlık ve erektil disfonksiyon yapabilir. [[K3 s. 292]]</li>
  </ul>
  <div class="tbl-wrap" style="margin-top:16px"><table class="tbl">
    <thead><tr><th>İlaç</th><th>Oral biyoyararlanım</th><th>Proteine bağlanma</th><th>Metabolizma / Atılım</th><th>t½</th></tr></thead>
    <tbody>
      <tr><td><b>Fenitoin</b></td><td>~%90</td><td>%90</td><td>Doyurulabilir hidroksilasyon (sıfırıncı derece); otoindüksiyon; idrar</td><td>— [[K3 s. 289]]</td></tr>
      <tr><td><b>Karbamazepin</b></td><td>Yüksek (iyi emilim)</td><td>~%75</td><td>10,11-epoksid (%30 aktif); otoindüksiyon; konjuge olmayan idrar</td><td>— [[K3 s. 290]]</td></tr>
      <tr><td><b>Sodyum valproat</b></td><td>İyi emilir</td><td>~%90</td><td>Hepatik (bazıları aktif) → idrarla</td><td>— [[K3 s. 290]]</td></tr>
      <tr><td><b>Lamotrijin</b></td><td>%98</td><td>—</td><td>Konjugasyon → inaktif metabolit</td><td>14 sa [[K3 s. 291]]</td></tr>
      <tr><td><b>Gabapentin</b></td><td>~%60 (dozla ↓)</td><td>Bağlanmaz</td><td>Metabolize edilmez (birlikte kullanım kolay); yalnız böbrekle</td><td>6 sa [[K3 s. 292]]</td></tr>
      <tr><td><b>Vigabatrin</b></td><td>—</td><td>—</td><td>İdrarla değişmeden (fenitoin ↓ %25)</td><td>6 sa [[K3 s. 292]]</td></tr>
      <tr><td><b>Pregabalin</b></td><td>%90, dozla değişmez (hızlı; besinle gecikir)</td><td>Bağlanmaz</td><td>Metabolize edilmez; idrarla</td><td>— [[K3 s. 292]]</td></tr>
    </tbody>
  </table></div>
</section>

<section class="wrap blk ders-sec" id="a18c-p1">
  <h2>Part I · Çoklu doğru–yanlış</h2><p>Her önermeyi bağımsız değerlendirin, ardından gerekçenizi açıklamayla karşılaştırın.</p>
  <div class="viz"><div data-viz="mtf" data-q="far18c-1"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far18c-2"></div></div>
  <div class="viz"><div data-viz="mtf" data-q="far18c-3"></div></div>
</section>
<section class="wrap blk ders-sec" id="a18c-p2">
  <h2>Part II · SOE 2</h2>
  <div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Kronik fenitoin tedavisi altındaki hastaya nöbet kontrolü için intravenöz fenitoin eklenmesi planlanıyor. Fenitoinin etki mekanizmasını, sıfırıncı derece kinetiğini, başlıca ilaç etkileşimlerini ve İV uygulama uyarılarını anlatın.</b></p></div>
  <h3>Cevap iskeleti</h3><ol class="iskelet">
    <li>İnaktive Na⁺ kanallarını stabilize ederek yeni aksiyon potansiyelini önler; Ca²⁺ girişini azaltabilir ve GABA etkisini artırabilir. [[K3 s. 289]]</li>
    <li>Doyurulabilir hepatik hidroksilasyon nedeniyle terapötik aralığın (10–20 μg/mL) hemen üstünde sıfırıncı derece kinetik gösterir; ~%9 yavaş hidroksilleyici vardır. [[K3 s. 289]]</li>
    <li>Oral biyoyararlanım ~%90, protein %90; hepatik karma fonksiyonlu oksidazları indükleyerek varfarin, BDZ ve oral kontraseptif metabolizmasını artırır. [[K3 s. 289]]</li>
    <li>Metronidazol, kloramfenikol ve izoniazid metabolizmasını inhibe edip toksisite yapabilir; karbamazepin, alkol ve vigabatrin düzeyini azaltabilir. [[K3 s. 289–290]] [[K3 s. 292]]</li>
    <li>%5 dekstrozla geçimsizdir (jelatinimsi); seyreltilmeden hızlı İV uygulama hipotansiyon ve kalp bloğuyla ilişkilidir. [[K3 s. 289]]</li>
  </ol>
  <div class="cols"><div class="note"><b>Çizin.</b> Fenitoin için günlük doz–plazma düzeyi eğrisini çizin; 10–20 μg/mL terapötik pencereyi ve enzim doyumu sonrası dik yükselişi işaretleyin. [[K3 s. 289]]</div>
  <div class="note plain"><b>Olası ek sorular.</b> Sodyum valproatın hematolojik ve teratojenik riski nedir? Gabapentin ile pregabalinin oral biyoyararlanımı nasıl ayrılır? [[K3 s. 290]] [[K3 s. 292]]</div></div>
</section>
<section class="wrap blk ders-sec" id="a18c-ozet">
  <h2>Özet</h2><ul class="ozet">
    <li>Mümkünse tek ajan kullanılır; fenitoin (10–20 μg/mL) doyurulabilir hidroksilasyonla sıfırıncı derece kinetik gösterir ve %5 dekstrozla geçimsizdir. [[K3 s. 289]]</li>
    <li>Karbamazepin %30 aktiviteli 10,11-epokside dönüşür, enzim indükler ve antidiüretik etkiyle su retansiyonu yapabilir. [[K3 s. 290]]</li>
    <li>Sodyum valproat absans nöbetlerinde kullanılır; hepatotoksisite, trombositopeni ve nöral tüp defektleriyle ilişkilidir. [[K3 s. 290]]</li>
    <li>Lamotrijin (%98 biyoyararlanım, t½ 14 sa) eksitatör nöronların Na⁺ kanallarını inaktive eder; vigabatrin (t½ 6 sa, etki 24 sa) GABA-transaminazı inhibe eder. [[K3 s. 291–292]]</li>
    <li>Gabapentin ve pregabalin Ca²⁺ α₂δ alt birimine bağlanır, proteine bağlanmaz ve metabolize edilmeden böbrekle atılır. [[K3 s. 291–292]]</li>
  </ul>
  <div data-viz="tamam" data-modul="farmakoloji" data-bolum="18c"></div>
  <nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/18b">← 18b · Antidepresanlar</a><a href="#/dersler/farmakoloji/19a">Sonraki: 19a · Bulantı-kusma fizyolojisi ve dopamin antagonistleri →</a></nav>
</section>`,
};
