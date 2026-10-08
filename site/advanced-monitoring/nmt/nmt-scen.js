'use strict';
/* İleri Monitörizasyon Atlası · nöromüsküler izlem (TOF) senaryoları
   Nöromüsküler blok monitörlerinin cihaz sayfalarında, ortak senaryo motoruyla (scen/scen-core.js) gösterilir. Her senaryoda:
   TOF yanıtının çizimi (dört seğirme; gerekirse tetanik yanıt ve PTC dizisi), sonuçlar (TOF sayısı, TOF oranı, T1, PTC,
   blok düzeyi, ekstübasyon ölçütü), kalitatif (göz/el) değerlendirmenin ne göstereceği, yorum ve yapılacaklar.
   Blok düzeyleri: Naguib 2018 uzlaşı bildirisi Tablo 1 ve ASA 2023 Tablo 5. Seğirme yükseklikleri ve TOF oranları örnek
   değerlerdir; kaynakta verilen sayılar (eşikler, dozlar, süreler) metinde kaynak numarasıyla gösterilir. */
const NMTSCEN = (() => {
  const T = (tr, en, es) => ({tr, en, es});
  const P = v => (typeof ICA !== 'undefined' ? ICA.pick(v) : v.tr);
  const lang = () => (typeof ICA !== 'undefined' && ICA.lang) || 'tr';
  const num = (v, d = 0) => { const s = v.toFixed(d); return lang() === 'en' ? s : s.replace('.', ','); };
  const pct = v => lang() === 'tr' ? `%${num(v)}` : lang() === 'es' ? `${num(v)} %` : `${num(v)}%`;
  const escH = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  /* [S3] → kaynakçaya bağlantı */
  const cite = s => escH(s).replace(/(?:\[S\d+\])+/g, m => `<sup class="cite">${[...m.matchAll(/S(\d+)/g)].map(x => `<a href="#sref-${x[1]}">${x[1]}</a>`).join(', ')}</sup>`);

  const UI = {
    h: T('Senaryolar: TOF yanıtı ve yorumu', 'Scenarios: the TOF response and how to read it', 'Escenarios: la respuesta TOF y su interpretación'),
    lede: T('Bir senaryo seçin: cihazın göreceği yanıt çizilir, sonuçlar hesaplanır ve ne yapılacağı kılavuzlara göre açıklanır. Blok düzeyleri ASA 2023 ve 2018 uzlaşı bildirisindeki sınıflamaya göredir [S1][S2].',
      'Choose a scenario: the response the device would record is drawn, the results are calculated, and what to do is explained from the guidelines. Depth-of-block levels follow the ASA 2023 and 2018 consensus classification [S1][S2].',
      'Elija un escenario: se dibuja la respuesta que registraría el equipo, se calculan los resultados y se explica qué hacer según las guías. Los niveles de bloqueo siguen la clasificación de la ASA 2023 y del consenso de 2018 [S1][S2].'),
    groups: {
      nd: T('Rokuronyum (nondepolarizan blok)', 'Rocuronium (nondepolarizing block)', 'Rocuronio (bloqueo no despolarizante)'),
      sux: T('Süksinilkolin', 'Succinylcholine', 'Succinilcolina'),
      rev: T('Geri döndürme', 'Reversal', 'Reversión'),
      pit: T('Ölçüm tuzağı', 'Measurement pitfall', 'Trampa de medición')
    },
    situation: T('Durum', 'Situation', 'Situación'), interp: T('Yorum', 'Interpretation', 'Interpretación'), act: T('Ne yapılır', 'What to do', 'Qué hacer'),
    tofc: T('TOF sayısı', 'TOF count', 'Recuento TOF'), tofr: T('TOF oranı (T4/T1)', 'TOF ratio (T4/T1)', 'Cociente TOF (T4/T1)'),
    t1: T('T1 (kontrolün yüzdesi)', 'T1 (% of control)', 'T1 (% del control)'), ptc: T('PTC', 'PTC', 'PTC'),
    depth: T('Blok düzeyi', 'Depth of block', 'Nivel de bloqueo'), ext: T('Nöromüsküler derlenme ölçütü (TOF oranı ≥ 0,9)', 'Neuromuscular recovery criterion (TOF ratio ≥ 0.9)', 'Criterio de recuperación neuromuscular (cociente TOF ≥ 0,9)'),
    met: T('Karşılanıyor', 'Met', 'Cumplido'), notMet: T('Karşılanmıyor', 'Not met', 'No cumplido'),
    na: T('hesaplanamaz (TOF sayısı < 4)', 'cannot be calculated (TOF count < 4)', 'no calculable (recuento TOF < 4)'),
    raw: T('ham', 'raw', 'bruto'), norm: T('normalize', 'normalized', 'normalizado'),
    qual: T('Gözle / elle (kalitatif) değerlendirme', 'By eye / by touch (qualitative)', 'Con la vista / el tacto (cualitativo)'),
    control: T('Kontrol %100', 'Control 100%', 'Control 100 %'), stim: T('TOF · 4 uyarı, 2 Hz', 'TOF · 4 stimuli, 2 Hz', 'TOF · 4 estímulos, 2 Hz'),
    tet: T('Tetanik uyarı 50 Hz · 5 s', 'Tetanus 50 Hz · 5 s', 'Tétanos 50 Hz · 5 s'), pause: T('3 s', '3 s', '3 s'), ptcRow: T('1 Hz tekli uyarılar', '1 Hz single twitches', 'Estímulos únicos a 1 Hz'),
    replay: T('Yeniden uyar', 'Stimulate again', 'Estimular de nuevo'),
    refsH: T('Senaryo kaynakları', 'Scenario references', 'Referencias de los escenarios'),
    note: T('Eğitim senaryosudur: seğirme yükseklikleri ve oranlar örnek değerlerdir, tek bir hastanın ölçümü değildir. Doz ve klinik karar için ilaç prospektüsü, kılavuzlar ve kurum protokolü esas alınır.',
      'Teaching scenario: twitch heights and ratios are example values, not measurements from one patient. Use the drug label, guidelines and local protocol for doses and clinical decisions.',
      'Escenario docente: las alturas de las respuestas y los cocientes son valores de ejemplo, no mediciones de un paciente. Para dosis y decisiones clínicas, consulte la ficha técnica, las guías y el protocolo local.'),
    q: {
      none: T('Yanıt görülmez ve hissedilmez.', 'No response is seen or felt.', 'No se ve ni se palpa ninguna respuesta.'),
      count: T('{n} yanıt sayılır; TOF oranı hesaplanamaz.', '{n} responses are counted; no TOF ratio can be calculated.', 'Se cuentan {n} respuestas; no se puede calcular el cociente TOF.'),
      fade: T('4 yanıt; sönme (fade) genellikle fark edilir (TOF oranı < 0,4).', '4 responses; fade is usually noticed (TOF ratio < 0.4).', '4 respuestas; el desvanecimiento (fade) suele percibirse (cociente TOF < 0,4).'),
      noFade: T('4 yanıt, sönme fark edilmez: TOF oranı 0,4\'ün üzerindeyken sönme güvenilir biçimde hissedilemez, derlenme gözle ya da elle belirlenemez [S2][S9].', '4 responses, no fade felt: above a TOF ratio of 0.4 fade cannot be reliably felt, so recovery cannot be judged by eye or touch [S2][S9].', '4 respuestas sin fade percibido: por encima de un cociente TOF de 0,4 el fade no se percibe con fiabilidad, así que la recuperación no puede juzgarse con la vista ni el tacto [S2][S9].'),
      equal: T('4 eşit yanıt, sönme yok; ama yanıtlar kontrolden küçüktür.', '4 equal responses with no fade, but smaller than control.', '4 respuestas iguales sin fade, pero más pequeñas que el control.')
    },
    cat: {
      none: T('Blok yok', 'No block', 'Sin bloqueo'), complete: T('Tam blok (PTC 0)', 'Complete block (PTC 0)', 'Bloqueo completo (PTC 0)'),
      deep: T('Derin blok (PTC ≥ 1, TOF sayısı 0)', 'Deep block (PTC ≥ 1, TOF count 0)', 'Bloqueo profundo (PTC ≥ 1, recuento TOF 0)'),
      moderate: T('Orta blok (TOF sayısı 1–3)', 'Moderate block (TOF count 1–3)', 'Bloqueo moderado (recuento TOF 1–3)'),
      shallow: T('Sığ blok (TOF oranı < 0,4)', 'Shallow block (TOF ratio < 0.4)', 'Bloqueo superficial (cociente TOF < 0,4)'),
      minimal: T('Minimal blok (TOF oranı 0,4–< 0,9)', 'Minimal block (TOF ratio 0.4 to < 0.9)', 'Bloqueo mínimo (cociente TOF 0,4 a < 0,9)'),
      ok: T('Yeterli derlenme (TOF oranı ≥ 0,9)', 'Acceptable recovery (TOF ratio ≥ 0.9)', 'Recuperación aceptable (cociente TOF ≥ 0,9)'),
      dep: T('Depolarizan (faz I) blok: TOF oranı derinliği göstermez', 'Depolarizing (phase I) block: the TOF ratio does not show depth', 'Bloqueo despolarizante (fase I): el cociente TOF no indica la profundidad')
    }
  };

  /* Senaryolar. steps: [{lab, T:[T1..T4 % kontrol], ptc, tet:'fade'|'hold', tetA, base (AMG başlangıç TOF oranı)}] */
  const SC = [
    {id: 'control', g: 'nd',
      title: T('Kas gevşetici verilmemiş (kontrol)', 'No relaxant given (control)', 'Sin relajante (control)'),
      steps: [{T: [100, 100, 100, 100]}],
      sit: T('İndüksiyondan sonra, kas gevşetici vermeden önce cihaz kalibre edildi ve kontrol ölçümü alındı.', 'After induction and before the relaxant, the device was calibrated and a control measurement taken.', 'Tras la inducción y antes del relajante, se calibró el equipo y se obtuvo una medición de control.'),
      interp: T('Dört yanıt eşit: TOF sayısı 4, TOF oranı %100. Sonraki yanıtlar bu kontrolle karşılaştırılır; T1 ile kontrol karşılaştırması bloğun derinliğini, T4/T1 sönmeyi gösterir [S4].', 'Four equal responses: TOF count 4, TOF ratio 100%. Later responses are compared with this control; T1 against control shows depth, T4/T1 shows fade [S4].', 'Cuatro respuestas iguales: recuento TOF 4, cociente TOF 100 %. Las respuestas posteriores se comparan con este control; T1 frente al control indica la profundidad y T4/T1 el fade [S4].'),
      act: T('TOF, 0,5 saniye arayla dört uyarıdır (2 Hz) ve genellikle 10–20 saniyede bir tekrarlanır [S1]. Akseleromiyografiyle (AMG) ölçen cihazlarda kontrol TOF oranı çoğu kez %100\'ün üstündedir; "Ölçüm tuzağı" senaryosuna bakın [S1].', 'TOF is four stimuli 0.5 s apart (2 Hz), usually repeated every 10–20 s [S1]. With acceleromyography (AMG) the control TOF ratio is often above 100%; see the "Measurement pitfall" scenario [S1].', 'El TOF son cuatro estímulos separados 0,5 s (2 Hz), que suelen repetirse cada 10–20 s [S1]. Con aceleromiografía (AMG) el cociente TOF de control suele superar el 100 %; vea el escenario "Trampa de medición" [S1].')},
    {id: 'onset', g: 'nd',
      title: T('Rokuronyum 0,6 mg/kg sonrası: entübasyon', 'After rocuronium 0.6 mg/kg: intubation', 'Tras rocuronio 0,6 mg/kg: intubación'),
      steps: [{T: [0, 0, 0, 0], ptc: 0, tet: 'fade', tetA: 0}],
      sit: T('Rokuronyum 0,6 mg/kg verildikten yaklaşık 2 dakika sonra.', 'About 2 minutes after rocuronium 0.6 mg/kg.', 'Unos 2 minutos después de rocuronio 0,6 mg/kg.'),
      interp: T('TOF uyarısına yanıt yok; tetanik uyarıdan sonra da tekli uyarılara yanıt yok (PTC 0): tam blok [S1][S2]. Prospektüste erişkinde en yüksek bloğa ulaşma süresi ortanca 1,8 dakikadır (aralık 0,6–13) [S8].', 'No response to TOF, and none to single twitches after tetanus (PTC 0): complete block [S1][S2]. The label gives a median time to maximum block of 1.8 min in adults (range 0.6–13) [S8].', 'Sin respuesta al TOF ni a los estímulos únicos tras el tétanos (PTC 0): bloqueo completo [S1][S2]. La ficha técnica da una mediana de 1,8 min hasta el bloqueo máximo en adultos (rango 0,6–13) [S8].'),
      act: T('TOF sayısı 0 iken blok derinliği yalnız PTC ile ayırt edilir. Tetanik uyarı sonraki yanıtları büyüttüğü için 2–3 dakikadan sık tekrarlanmamalıdır [S1].', 'With a TOF count of 0, depth can only be told apart with the PTC. Tetanus enlarges the responses that follow, so it should not be repeated more often than every 2–3 min [S1].', 'Con recuento TOF 0, la profundidad solo se distingue con el PTC. El tétanos aumenta las respuestas siguientes, por lo que no debe repetirse con más frecuencia que cada 2–3 min [S1].')},
    {id: 'deep', g: 'nd',
      title: T('Derin blok: cerrahi sürerken', 'Deep block during surgery', 'Bloqueo profundo durante la cirugía'),
      steps: [{T: [0, 0, 0, 0], ptc: 3, tet: 'fade', tetA: 22}],
      sit: T('Laparoskopi sürüyor; son rokuronyum dozundan sonra TOF uyarısına yanıt yok.', 'Laparoscopy is under way; no response to TOF since the last rocuronium dose.', 'Laparoscopia en curso; sin respuesta al TOF desde la última dosis de rocuronio.'),
      interp: T('TOF sayısı 0, PTC 3: derin blok [S1][S2]. PTC yükseldikçe TOF yanıtının dönüşü yaklaşır; atrakuryum ve vekuronyumda T1 genellikle PTC 9 civarında geri gelir [S4].', 'TOF count 0, PTC 3: deep block [S1][S2]. The higher the PTC, the nearer the return of the TOF response; with atracurium or vecuronium T1 generally returns at a PTC of about 9 [S4].', 'Recuento TOF 0, PTC 3: bloqueo profundo [S1][S2]. Cuanto mayor es el PTC, más cerca está el retorno del TOF; con atracurio o vecuronio T1 suele volver con un PTC de unos 9 [S4].'),
      act: T('Geri döndürme gerekirse ASA bu düzeyde neostigmin yerine sugammadeksi önerir [S2]; prospektüse göre PTC 1–2 ve TOF yanıtı yokken doz 4 mg/kg\'dır [S7]. Neostigmin için ESAIC belirgin spontan derlenmeyi (TOF oranı > 0,2) bekler [S3]. Bu düzeyde ekstübe edilmez.', 'If reversal is needed, ASA recommends sugammadex over neostigmine at this depth [S2]; the label dose at 1–2 PTC with no TOF response is 4 mg/kg [S7]. For neostigmine, ESAIC waits for advanced spontaneous recovery (TOF ratio > 0.2) [S3]. No extubation at this depth.', 'Si hace falta revertir, la ASA recomienda sugammadex en lugar de neostigmina a esta profundidad [S2]; la dosis de la ficha con 1–2 PTC y sin respuesta TOF es 4 mg/kg [S7]. Para la neostigmina, la ESAIC espera una recuperación espontánea avanzada (cociente TOF > 0,2) [S3]. No se extuba a esta profundidad.')},
    {id: 'moderate', g: 'nd',
      title: T('Orta blok', 'Moderate block', 'Bloqueo moderado'),
      steps: [{T: [12, 5, 0, 0]}],
      sit: T('Cerrahinin sonuna yaklaşılıyor; dört uyarıdan ikisine yanıt var.', 'Surgery is nearly over; two of the four stimuli produce a response.', 'La cirugía está a punto de terminar; dos de los cuatro estímulos producen respuesta.'),
      interp: T('TOF sayısı 2 (T1 ve T2): orta blok [S1][S2]. Nondepolarizan blokta önce T4, sonra T3, T2 ve T1 kaybolur; derlenmede sıra tersine döner [S4]. Dört yanıt yokken TOF oranı hesaplanamaz.', 'TOF count 2 (T1 and T2): moderate block [S1][S2]. In nondepolarizing block T4 disappears first, then T3, T2 and T1; recovery runs in reverse [S4]. Without four responses no TOF ratio can be calculated.', 'Recuento TOF 2 (T1 y T2): bloqueo moderado [S1][S2]. En el bloqueo no despolarizante desaparece primero T4, luego T3, T2 y T1; la recuperación sigue el orden inverso [S4]. Sin cuatro respuestas no se calcula el cociente TOF.'),
      act: T('ASA bu düzeyde de sugammadeksi önerir [S2]; prospektüse göre T2 yeniden görüldüğünde doz 2 mg/kg\'dır [S7]. ESAIC\'e göre neostigmin için TOF oranının 0,2\'yi geçmesi beklenir [S3].', 'ASA recommends sugammadex at this depth too [S2]; the label dose once T2 has reappeared is 2 mg/kg [S7]. ESAIC waits for a TOF ratio above 0.2 before neostigmine [S3].', 'La ASA también recomienda sugammadex a esta profundidad [S2]; la dosis de la ficha cuando reaparece T2 es 2 mg/kg [S7]. La ESAIC espera un cociente TOF superior a 0,2 antes de la neostigmina [S3].')},
    {id: 'shallow', g: 'nd',
      title: T('Sığ blok', 'Shallow block', 'Bloqueo superficial'),
      steps: [{T: [60, 44, 30, 18], tet: 'fade', tetA: 55}],
      sit: T('Dört yanıt var ama dördüncüsü belirgin küçük.', 'All four responses are present, but the fourth is clearly smaller.', 'Están las cuatro respuestas, pero la cuarta es claramente menor.'),
      interp: T('TOF sayısı 4, TOF oranı %30: sığ blok [S1][S2]. Nondepolarizan blokta tetanik yanıt da sürdürülemez ve söner [S4]. Bu düzeyde sönme gözle ya da elle genellikle fark edilir [S2][S9].', 'TOF count 4, TOF ratio 30%: shallow block [S1][S2]. In nondepolarizing block the tetanic response cannot be sustained either and fades [S4]. At this depth fade is usually noticed by eye or touch [S2][S9].', 'Recuento TOF 4, cociente TOF 30 %: bloqueo superficial [S1][S2]. En el bloqueo no despolarizante la respuesta tetánica tampoco se mantiene y se desvanece [S4]. A esta profundidad el fade suele percibirse con la vista o el tacto [S2][S9].'),
      act: T('ASA sığ blokta da sugammadeksi önerir [S2] (prospektüse göre 2 mg/kg [S7]). ESAIC\'e göre TOF oranı 0,2\'nin üzerindeyken 10–15 dakikada geri döndürme isteniyorsa neostigmin 40 µg/kg verilebilir; ölçüm TOF oranı 0,9\'u geçene dek sürer [S3].', 'ASA recommends sugammadex at shallow depth too [S2] (2 mg/kg per the label [S7]). Per ESAIC, with a TOF ratio above 0.2 and reversal wanted within 10–15 min, neostigmine 40 µg/kg can be given; monitoring continues until the TOF ratio exceeds 0.9 [S3].', 'La ASA recomienda sugammadex también en el bloqueo superficial [S2] (2 mg/kg según la ficha [S7]). Según la ESAIC, con cociente TOF superior a 0,2 y reversión deseada en 10–15 min, puede darse neostigmina 40 µg/kg; la monitorización sigue hasta que el cociente supere 0,9 [S3].')},
    {id: 'minimal', g: 'nd',
      title: T('Minimal blok: “yarı derlenmiş” hasta', 'Minimal block: the “half-recovered” patient', 'Bloqueo mínimo: el paciente “medio recuperado”'),
      steps: [{T: [92, 80, 67, 55]}],
      sit: T('Ameliyat sonu; hasta öksürüyor ve dört yanıt gözle eşit görünüyor.', 'End of surgery; the patient is coughing and the four responses look equal by eye.', 'Final de la cirugía; el paciente tose y las cuatro respuestas parecen iguales a simple vista.'),
      interp: T('TOF oranı %60: minimal blok [S1][S2]. Gözle ya da elle sönme fark edilmez: deneyimli gözlemciler bile TOF oranı 0,4\'ün üzerinde sönmeyi güvenilir biçimde hissedemez [S2][S9]. ASA yalnız klinik değerlendirmeye dayanmamayı önerir [S2].', 'TOF ratio 60%: minimal block [S1][S2]. No fade is seen or felt: even experienced observers cannot reliably feel fade above a TOF ratio of 0.4 [S2][S9]. ASA recommends against relying on clinical assessment alone [S2].', 'Cociente TOF 60 %: bloqueo mínimo [S1][S2]. No se ve ni se palpa fade: ni observadores expertos lo perciben con fiabilidad por encima de un cociente de 0,4 [S2][S9]. La ASA desaconseja basarse solo en la valoración clínica [S2].'),
      act: T('Ekstübasyondan önce TOF oranı ≥ 0,9 doğrulanmalıdır [S2][S3]. ASA bu düzeyde neostigmini sugammadeksin makul alternatifi sayar [S2]: doz 40 µg/kg\'ı geçmemeli, TOF oranı 0,6\'nın üzerindeyse 15–30 µg/kg genellikle yeterlidir; etkisi yaklaşık 10 dakikada en yükseğe ulaşır [S2].', 'Confirm a TOF ratio ≥ 0.9 before extubation [S2][S3]. ASA considers neostigmine a reasonable alternative to sugammadex at this depth [S2]: the dose should not exceed 40 µg/kg, and above a TOF ratio of 0.6, 15–30 µg/kg is usually adequate; its effect peaks in about 10 min [S2].', 'Confirme un cociente TOF ≥ 0,9 antes de extubar [S2][S3]. La ASA considera la neostigmina una alternativa razonable al sugammadex a esta profundidad [S2]: la dosis no debe superar 40 µg/kg y, por encima de un cociente de 0,6, suelen bastar 15–30 µg/kg; su efecto es máximo a los 10 min aproximadamente [S2].')},
    {id: 'recovered', g: 'nd',
      title: T('Yeterli derlenme', 'Acceptable recovery', 'Recuperación aceptable'),
      steps: [{T: [100, 98, 96, 94]}],
      sit: T('Geri döndürmeden sonra tekrarlanan ölçüm.', 'Repeat measurement after reversal.', 'Medición repetida tras la reversión.'),
      interp: T('TOF oranı %94: yeterli derlenme [S1][S2].', 'TOF ratio 94%: acceptable recovery [S1][S2].', 'Cociente TOF 94 %: recuperación aceptable [S1][S2].'),
      act: T('Bu örnekte nöromüsküler derlenme ölçütü karşılanmıştır; ekstübasyon için diğer klinik koşullar da değerlendirilir [S2]. Normalize edilmemiş AMG ölçümünde ESAIC’nin verdiği eşik 1,0’dır [S3].', 'The neuromuscular recovery criterion is met in this example; other clinical requirements for extubation still need assessment [S2]. For non-normalized AMG, ESAIC gives a threshold of 1.0 [S3].', 'En este ejemplo se cumple el criterio de recuperación neuromuscular; deben valorarse los demás requisitos clínicos para extubar [S2]. Para AMG no normalizada, la ESAIC establece un umbral de 1,0 [S3].')},

    {id: 'sux1', g: 'sux', dep: true,
      title: T('Süksinilkolin: faz I blok', 'Succinylcholine: phase I block', 'Succinilcolina: bloqueo de fase I'),
      steps: [{T: [35, 35, 35, 35], tet: 'hold', tetA: 35}],
      sit: T('Süksinilkolin 1 mg/kg ile hızlı ardışık indüksiyon; birkaç dakika sonra yanıtlar dönmeye başlıyor.', 'Rapid sequence induction with succinylcholine 1 mg/kg; a few minutes later the responses start to return.', 'Inducción de secuencia rápida con succinilcolina 1 mg/kg; unos minutos después las respuestas empiezan a volver.'),
      interp: T('Dört yanıt eşit küçülmüş: sönme yok, TOF oranı %100, ama T1 kontrolün %35\'i. Depolarizan blokta dört yanıt eşit azalır ve sönme olmaz; tetanik yanıt da düşük ama sürekli kalır [S4]. Bu yüzden TOF oranı bu blokta derinliği göstermez: T1\'i kontrol değeriyle karşılaştırın [S4].', 'All four responses are equally reduced: no fade, TOF ratio 100%, but T1 is 35% of control. In depolarizing block the four twitches fall equally without fade, and the tetanic response is smaller but sustained [S4]. So the TOF ratio does not show depth in this block: compare T1 with the control [S4].', 'Las cuatro respuestas disminuyen por igual: sin fade, cociente TOF 100 %, pero T1 es el 35 % del control. En el bloqueo despolarizante las cuatro respuestas bajan por igual sin fade, y la respuesta tetánica es menor pero se mantiene [S4]. Por eso el cociente TOF no indica la profundidad en este bloqueo: compare T1 con el control [S4].'),
      act: T('Süksinilkolin bloğundan derlenme de nicel olarak izlenmelidir [S3]. Faz I blok yaklaşık 1–3 mg/kg toplam doza kadar görülür [S5]. Sugammadeks yalnız rokuronyum ve vekuronyum bloğunu geri döndürür [S7].', 'Recovery from succinylcholine block should also be monitored quantitatively [S3]. Phase I block is seen up to a total dose of about 1–3 mg/kg [S5]. Sugammadex reverses only rocuronium and vecuronium block [S7].', 'La recuperación del bloqueo por succinilcolina también debe monitorizarse cuantitativamente [S3]. El bloqueo de fase I se observa hasta una dosis total de 1–3 mg/kg aproximadamente [S5]. El sugammadex solo revierte el bloqueo por rocuronio y vecuronio [S7].')},
    {id: 'sux2', g: 'sux',
      title: T('Süksinilkolin: faz II blok', 'Succinylcholine: phase II block', 'Succinilcolina: bloqueo de fase II'),
      steps: [{T: [45, 30, 20, 13], tet: 'fade', tetA: 45}],
      sit: T('Uzun işlemde tekrarlanan süksinilkolin dozları ya da infüzyon.', 'Repeated succinylcholine doses or an infusion during a long procedure.', 'Dosis repetidas o perfusión de succinilcolina en un procedimiento largo.'),
      interp: T('TOF oranı %29: sönme belirgin. Tekrarlanan dozlar ya da infüzyon sonrası faz II blok gelişebilir ve TOF ile sönme görülür [S4]. Lee\'nin çalışmasında faz II blok TOF oranının 0,3 ve altına düşmesiyle tanımlanmış ve toplam 3–5 mg/kg dozda ortaya çıkmıştır [S5].', 'TOF ratio 29%: clear fade. After repeated doses or an infusion a phase II block can develop, and TOF shows fade [S4]. In Lee\'s study phase II block was defined by a TOF ratio of 0.3 or less and appeared at total doses of 3–5 mg/kg [S5].', 'Cociente TOF 29 %: fade evidente. Tras dosis repetidas o perfusión puede aparecer un bloqueo de fase II, y el TOF muestra fade [S4]. En el estudio de Lee el bloqueo de fase II se definió por un cociente TOF de 0,3 o menos y apareció con dosis totales de 3–5 mg/kg [S5].'),
      act: T('Görünüm nondepolarizan bloğa benzer; blok düzeyi aynı ölçütlerle okunur. Derlenme, TOF oranı ≥ 0,9 olana dek nicel olarak izlenir [S2][S3].', 'It looks like a nondepolarizing block and is graded with the same criteria. Monitor recovery quantitatively until the TOF ratio is ≥ 0.9 [S2][S3].', 'Se parece a un bloqueo no despolarizante y se clasifica con los mismos criterios. Monitorice la recuperación cuantitativamente hasta un cociente TOF ≥ 0,9 [S2][S3].')},
    {id: 'bche', g: 'sux',
      title: T('Butirilkolinesteraz (psödokolinesteraz) eksikliği', 'Butyrylcholinesterase (pseudocholinesterase) deficiency', 'Déficit de butirilcolinesterasa (seudocolinesterasa)'),
      steps: [{T: [22, 10, 4, 0]}],
      sit: T('Süksinilkolin 1 mg/kg\'dan 45 dakika sonra spontan solunum hâlâ yok; yanıtlar yeni dönmeye başlıyor.', '45 minutes after succinylcholine 1 mg/kg there is still no spontaneous breathing; the responses are only just returning.', '45 minutos después de succinilcolina 1 mg/kg aún no hay respiración espontánea; las respuestas apenas empiezan a volver.'),
      interp: T('Blok beklenenden çok uzun ve dönen yanıtlarda sönme var. "A" varyantı heterozigotluğu süksinilkolin bloğunu 5–10 dakika uzatır; homozigotlukta blok birkaç saat uzar [S6]. Homozigot atipik enzimde kas aktivitesi dönerken sönme görülmesi sıktır ve faz II bloğu taklit eder [S2].', 'The block is far longer than expected, and the returning responses fade. Heterozygosity for the "A" variant prolongs succinylcholine block by 5–10 min; homozygosity prolongs it by several hours [S6]. With homozygous atypical enzyme, fade commonly appears as muscle activity returns, mimicking a phase II block [S2].', 'El bloqueo dura mucho más de lo esperado y las respuestas que vuelven muestran fade. La heterocigosidad para la variante "A" prolonga el bloqueo por succinilcolina 5–10 min; la homocigosidad lo prolonga varias horas [S6]. Con la enzima atípica homocigota es frecuente que aparezca fade al volver la actividad muscular, como en un bloqueo de fase II [S2].'),
      act: T('Hasta, yeterli nöromüsküler yanıt ve spontan solunum dönene dek sedasyon altında ventile edilir; ardından butirilkolinesteraz eksikliği için test yapılır [S6]. Derlenme TOF oranı ≥ 0,9 ile doğrulanır [S2][S3]. Sugammadeks bu bloğu geri döndürmez; yalnız rokuronyum ve vekuronyum içindir [S7].', 'Keep the patient sedated and ventilated until adequate neuromuscular response and spontaneous breathing return, then test for butyrylcholinesterase deficiency [S6]. Confirm recovery with a TOF ratio ≥ 0.9 [S2][S3]. Sugammadex does not reverse this block; it is only for rocuronium and vecuronium [S7].', 'Mantenga al paciente sedado y ventilado hasta que vuelvan una respuesta neuromuscular suficiente y la respiración espontánea; después, estudie el déficit de butirilcolinesterasa [S6]. Confirme la recuperación con un cociente TOF ≥ 0,9 [S2][S3]. El sugammadex no revierte este bloqueo; solo sirve para rocuronio y vecuronio [S7].')},

    {id: 'sgx4', g: 'rev',
      title: T('Derin bloktan sugammadeks 4 mg/kg', 'Sugammadex 4 mg/kg from deep block', 'Sugammadex 4 mg/kg desde bloqueo profundo'),
      steps: [{lab: T('Önce: PTC 2', 'Before: PTC 2', 'Antes: PTC 2'), T: [0, 0, 0, 0], ptc: 2, tet: 'fade', tetA: 18},
        {lab: T('Sonra: ortanca 2,7 dk', 'After: median 2.7 min', 'Después: mediana 2,7 min'), T: [100, 98, 95, 93]}],
      sit: T('Rokuronyum bloğu; cerrahi beklenenden erken bitti. TOF yanıtı yok, PTC 2.', 'Rocuronium block; surgery ended earlier than expected. No TOF response, PTC 2.', 'Bloqueo por rocuronio; la cirugía terminó antes de lo previsto. Sin respuesta TOF, PTC 2.'),
      interp: T('Prospektüse göre PTC 1–2 ve TOF yanıtı yokken önerilen doz 4 mg/kg\'dır; rokuronyum çalışmasında TOF oranı 0,9\'a ortanca 2,7 dakikada (çeyrekler arası 2,1–4,3) ulaşıldı [S7]. ASA bu düzeyde neostigmin yerine sugammadeksi önerir [S2].', 'Per the label, the dose at 1–2 PTC with no TOF response is 4 mg/kg; in the rocuronium study the TOF ratio reached 0.9 in a median of 2.7 min (interquartile range 2.1–4.3) [S7]. ASA recommends sugammadex over neostigmine at this depth [S2].', 'Según la ficha, con 1–2 PTC y sin respuesta TOF la dosis es 4 mg/kg; en el estudio con rocuronio el cociente TOF llegó a 0,9 en una mediana de 2,7 min (rango intercuartílico 2,1–4,3) [S7]. La ASA recomienda sugammadex en lugar de neostigmina a esta profundidad [S2].'),
      act: T('Ekstübasyondan önce TOF oranı ≥ 0,9 ölçümle doğrulanır [S2]. Sugammadeks yalnız rokuronyum ve vekuronyum bloğunda etkilidir [S7].', 'Confirm a TOF ratio ≥ 0.9 by measurement before extubation [S2]. Sugammadex works only on rocuronium and vecuronium block [S7].', 'Confirme con la medición un cociente TOF ≥ 0,9 antes de extubar [S2]. El sugammadex solo actúa sobre el bloqueo por rocuronio y vecuronio [S7].')},
    {id: 'sgx2', g: 'rev',
      title: T('Orta bloktan sugammadeks 2 mg/kg', 'Sugammadex 2 mg/kg from moderate block', 'Sugammadex 2 mg/kg desde bloqueo moderado'),
      steps: [{lab: T('Önce: TOF sayısı 2', 'Before: TOF count 2', 'Antes: recuento TOF 2'), T: [12, 5, 0, 0]},
        {lab: T('Sonra: ortanca 1,4 dk', 'After: median 1.4 min', 'Después: mediana 1,4 min'), T: [100, 97, 95, 93]}],
      sit: T('Rokuronyum bloğu; T2 yeniden görüldü.', 'Rocuronium block; T2 has reappeared.', 'Bloqueo por rocuronio; ha reaparecido T2.'),
      interp: T('Prospektüse göre spontan derlenme T2\'nin yeniden görülmesine ulaştığında doz 2 mg/kg\'dır; rokuronyum çalışmasında TOF oranı 0,9\'a ortanca 1,4 dakikada (çeyrekler arası 1,2–1,7) ulaşıldı, neostigmin 50 µg/kg ile 21,5 dakikada [S7].', 'Per the label, once spontaneous recovery has reached reappearance of T2 the dose is 2 mg/kg; in the rocuronium study the TOF ratio reached 0.9 in a median of 1.4 min (interquartile range 1.2–1.7), versus 21.5 min with neostigmine 50 µg/kg [S7].', 'Según la ficha, cuando la recuperación espontánea alcanza la reaparición de T2 la dosis es 2 mg/kg; en el estudio con rocuronio el cociente TOF llegó a 0,9 en una mediana de 1,4 min (rango intercuartílico 1,2–1,7), frente a 21,5 min con neostigmina 50 µg/kg [S7].'),
      act: T('Ekstübasyondan önce TOF oranı ≥ 0,9 doğrulanır [S2].', 'Confirm a TOF ratio ≥ 0.9 before extubation [S2].', 'Confirme un cociente TOF ≥ 0,9 antes de extubar [S2].')},
    {id: 'neo', g: 'rev',
      title: T('Minimal blokta neostigmin', 'Neostigmine at minimal block', 'Neostigmina en bloqueo mínimo'),
      steps: [{lab: T('Önce: TOF oranı %55', 'Before: TOF ratio 55%', 'Antes: cociente TOF 55 %'), T: [94, 82, 66, 52]},
        {lab: T('Yaklaşık 10 dk sonra', 'About 10 min later', 'Unos 10 min después'), T: [100, 98, 95, 92]}],
      sit: T('Rokuronyum bloğu; TOF oranı %55. Neostigmin verilecek.', 'Rocuronium block; TOF ratio 55%. Neostigmine is to be given.', 'Bloqueo por rocuronio; cociente TOF 55 %. Se va a administrar neostigmina.'),
      interp: T('ASA minimal blokta neostigmini sugammadeksin makul alternatifi sayar [S2]. Bu düzeyde doz 40 µg/kg\'ı geçmemelidir; TOF oranı 0,6\'nın üzerindeyse 15–30 µg/kg genellikle yeterlidir. Neostigminin etkisi yaklaşık 10 dakikada en yükseğe ulaşır [S2].', 'ASA considers neostigmine a reasonable alternative to sugammadex at minimal depth [S2]. At this depth the dose should not exceed 40 µg/kg, and above a TOF ratio of 0.6, 15–30 µg/kg is usually adequate. The effect of neostigmine peaks in about 10 min [S2].', 'La ASA considera la neostigmina una alternativa razonable al sugammadex en el bloqueo mínimo [S2]. A esta profundidad la dosis no debe superar 40 µg/kg y, por encima de un cociente TOF de 0,6, suelen bastar 15–30 µg/kg. El efecto de la neostigmina es máximo a los 10 min aproximadamente [S2].'),
      act: T('Ekstübasyondan önce adductor pollicis’te nicel ölçümle TOF oranı ≥0,9 doğrulanır [S2]. Sabit bir bekleme süresi derlenmeyi kanıtlamaz; solunum, bilinç ve hava yolu koruyucu refleksleri ayrıca değerlendirilir.', 'Before extubation, confirm a TOF ratio ≥0.9 by quantitative monitoring at the adductor pollicis [S2]. A fixed waiting period does not establish recovery; assess breathing, consciousness and airway protective reflexes separately.', 'Antes de extubar, confirme un cociente TOF ≥0,9 mediante monitorización cuantitativa en el aductor del pulgar [S2]. Un tiempo fijo de espera no demuestra recuperación; valore por separado la respiración, la consciencia y los reflejos protectores de la vía aérea.')},

    {id: 'amg', g: 'pit',
      title: T('AMG: kontrol TOF oranı %100\'ün üstünde', 'AMG: control TOF ratio above 100%', 'AMG: cociente TOF de control superior al 100 %'),
      steps: [{T: [100, 104, 100, 95], base: 1.15}],
      sit: T('Akseleromiyografiyle ölçen cihazda kontrol TOF oranı %115 bulunmuştu. Ameliyat sonunda ekranda %95 görünüyor.', 'On a device that measures by acceleromyography, the control TOF ratio was 115%. At the end of surgery the screen shows 95%.', 'En un equipo que mide por aceleromiografía, el cociente TOF de control fue 115 %. Al final de la cirugía la pantalla muestra 95 %.'),
      interp: T('AMG\'de kontrol TOF oranı çoğu kez 1\'in üzerindedir; 1,10–1,20 sıktır [S1]. Normalizasyon ölçülen değeri kontrol değerine bölmektir: 0,95 / 1,15 = 0,83 [S2]. Ekranda %95 görünse de normalize TOF oranı %83\'tür: derlenme yetersizdir.', 'With AMG the control TOF ratio is often above 1; 1.10–1.20 is common [S1]. Normalization divides the measured value by the control value: 0.95 / 1.15 = 0.83 [S2]. The screen shows 95%, but the normalized TOF ratio is 83%: recovery is not adequate.', 'Con AMG el cociente TOF de control suele ser superior a 1; 1,10–1,20 es frecuente [S1]. La normalización divide el valor medido por el de control: 0,95 / 1,15 = 0,83 [S2]. La pantalla muestra 95 %, pero el cociente normalizado es 83 %: la recuperación no es suficiente.'),
      act: T('Normalize değer 0,9\'a ulaşana dek beklenir ya da geri döndürülür. Kontrol değeri yoksa ham AMG TOF oranı için ESAIC eşiği 1,0\'dır [S3]; Claudius ve Viby-Mogensen de AMG\'de 1,0 hedeflenmesini önerir [S10].', 'Wait or reverse until the normalized value reaches 0.9. Without a control value, ESAIC sets the threshold for a raw AMG TOF ratio at 1.0 [S3]; Claudius and Viby-Mogensen also advise aiming for 1.0 with AMG [S10].', 'Espere o revierta hasta que el valor normalizado llegue a 0,9. Sin valor de control, la ESAIC fija el umbral del cociente AMG bruto en 1,0 [S3]; Claudius y Viby-Mogensen también aconsejan buscar 1,0 con AMG [S10].')}
  ];

  const REFS = [
    {n: 1, t: 'Consensus Statement on Perioperative Use of Neuromuscular Monitoring', p: 'Naguib M, Brull SJ, Kopman AF, et al. Anesth Analg 2018;127(1):71-80', doi: '10.1213/ANE.0000000000002670'},
    {n: 2, t: '2023 American Society of Anesthesiologists Practice Guidelines for Monitoring and Antagonism of Neuromuscular Blockade', p: 'Thilen SR, Weigel WA, Todd MM, et al. Anesthesiology 2023;138(1):13-41', doi: '10.1097/ALN.0000000000004379'},
    {n: 3, t: 'Peri-operative management of neuromuscular blockade: a guideline from the European Society of Anaesthesiology and Intensive Care', p: 'Fuchs-Buder T, Romero CS, Lewald H, et al. Eur J Anaesthesiol 2023;40(2):82-94', doi: '10.1097/EJA.0000000000001769'},
    {n: 4, t: 'Monitoring of neuromuscular block', p: 'McGrath CD, Hunter JM. Contin Educ Anaesth Crit Care Pain 2006;6(1):7-12', doi: '10.1093/bjaceaccp/mki067'},
    {n: 5, t: 'Dose relationships of phase II, tachyphylaxis and train-of-four fade in suxamethonium-induced dual neuromuscular block in man', p: 'Lee C. Br J Anaesth 1975;47(8):841-845', doi: '10.1093/bja/47.8.841'},
    {n: 6, t: 'Butyrylcholinesterase deficiency and its clinical importance in anaesthesia: a systematic review', p: 'Andersson ML, Møller AM, Wildgaard K. Anaesthesia 2019;74(4):518-528', doi: '10.1111/anae.14545'},
    {n: 7, t: 'BRIDION (sugammadex) injection – Prescribing Information (revised 12/2024)', p: 'Merck Sharp & Dohme / U.S. FDA', url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/022225s014lbl.pdf'},
    {n: 8, t: 'ZEMURON (rocuronium bromide) injection – Prescribing Information', p: 'U.S. FDA', url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/020214Orig1s038lbl.pdf'},
    {n: 9, t: 'Tactile and visual evaluation of the response to train-of-four nerve stimulation', p: 'Viby-Mogensen J, Jensen NH, Engbaek J, et al. Anesthesiology 1985;63(4):440-443', doi: '10.1097/00000542-198510000-00015'},
    {n: 10, t: 'Acceleromyography for use in scientific and clinical practice: a systematic review of the evidence', p: 'Claudius C, Viby-Mogensen J. Anesthesiology 2008;108(6):1117-1140', doi: '10.1097/ALN.0b013e318173f62f'}
  ];

  /* ---------- Hesap ---------- */
  function measure(sc, st) {
    const tw = st.T, tofc = tw.findIndex(v => v < 2) < 0 ? 4 : tw.findIndex(v => v < 2);
    const ratio = tofc === 4 ? tw[3] / tw[0] : null, norm = ratio != null && st.base ? ratio / st.base : null, r = norm ?? ratio;
    let cat;
    if (sc.dep) cat = 'dep';
    else if (tofc === 0) cat = st.ptc ? 'deep' : 'complete';
    else if (tofc < 4) cat = 'moderate';
    else if (tw[0] >= 98 && r >= .99 && sc.id === 'control') cat = 'none';
    else cat = r < .4 ? 'shallow' : r < .9 ? 'minimal' : 'ok';
    const ext = !sc.dep && tofc === 4 && r >= .9;
    let q;
    if (sc.dep && tofc === 4) q = UI.q.equal;
    else if (tofc === 0) q = UI.q.none;
    else if (tofc < 4) q = {tr: UI.q.count.tr.replace('{n}', tofc), en: UI.q.count.en.replace('{n}', tofc), es: UI.q.count.es.replace('{n}', tofc)};
    else q = r < .4 ? UI.q.fade : UI.q.noFade;
    return {tofc, ratio, norm, cat, ext, q, t1: tw[0]};
  }

  /* ---------- Çizim (SVG): solda TOF paneli, gerekirse sağda tetanik yanıt + PTC paneli (dar ekranda alt alta) ---------- */
  function svg(st) {
    const H = 250, y0 = 186, k = 1.4;   /* %100 = 140 px */
    const out = [];
    /* TOF paneli */
    const W1 = 392, x0 = 34, bw = 40, gap = 66;
    out.push(`<svg class="nmt-svg" viewBox="0 0 ${W1} ${H}" role="img" aria-label="TOF">`);
    out.push(`<line x1="${x0 - 14}" y1="${y0}" x2="${W1 - 8}" y2="${y0}" class="ax"/>`);
    out.push(`<line x1="${x0 - 14}" y1="${y0 - 100 * k}" x2="${W1 - 8}" y2="${y0 - 100 * k}" class="ctl"/><text x="${W1 - 8}" y="${y0 - 100 * k - 6}" class="lbl" text-anchor="end">${escH(P(UI.control))}</text>`);
    st.T.forEach((v, i) => {
      const x = x0 + i * gap, h = v * k, d = (i * .5).toFixed(1);
      if (v >= 2) out.push(`<rect class="tw" style="animation-delay:${d}s" x="${x}" y="${y0 - h}" width="${bw}" height="${h}" rx="5"/><text class="val" style="animation-delay:${d}s" x="${x + bw / 2}" y="${y0 - h - 8}" text-anchor="middle">${num(v)}</text>`);
      else out.push(`<circle class="zero" cx="${x + bw / 2}" cy="${y0 - 3}" r="3.5"/><text class="val" style="animation-delay:${d}s" x="${x + bw / 2}" y="${y0 - 14}" text-anchor="middle">0</text>`);
      out.push(`<text class="tn" x="${x + bw / 2}" y="${y0 + 19}" text-anchor="middle">T${i + 1}</text>`);
      out.push(`<path class="stim" d="M${x + bw / 2} ${y0 + 40} v-10 m-4 4 l4 -4 l4 4"/>`);
    });
    out.push(`<text class="lbl" x="${x0 + 1.5 * gap + bw / 2}" y="${y0 + 58}" text-anchor="middle">${escH(P(UI.stim))}</text></svg>`);
    /* Tetanik yanıt ve PTC paneli */
    if (st.ptc != null || st.tet) {
      const W2 = st.ptc != null ? 330 : 180, tx = 16, tw = st.ptc != null ? 100 : 148, A = (st.tetA || 0) * k * .9;
      out.push(`<svg class="nmt-svg" viewBox="0 0 ${W2} ${H}" role="img" aria-label="${escH(P(UI.tet))}">`);
      out.push(`<line x1="${tx - 6}" y1="${y0}" x2="${W2 - 6}" y2="${y0}" class="ax"/>`);
      const env = s => st.tet === 'hold' ? A : A * (1 - .75 * s);
      for (let j = 0; j <= 48; j++) { const s = j / 48, h = env(s); if (h > .5) out.push(`<line class="tet" style="animation-delay:${(.2 + s * .8).toFixed(2)}s" x1="${tx + s * tw}" y1="${y0}" x2="${tx + s * tw}" y2="${y0 - h}"/>`); }
      if (A < 1) out.push(`<line class="tetz" x1="${tx}" y1="${y0 - 1.5}" x2="${tx + tw}" y2="${y0 - 1.5}"/>`);
      out.push(st.ptc != null ? `<text class="lbl" x="${tx - 6}" y="${y0 + 19}">${escH(P(UI.tet))}</text>` : `<text class="lbl" x="${tx + tw / 2}" y="${y0 + 19}" text-anchor="middle">${escH(P(UI.tet))}</text>`);
      if (st.ptc != null) {
        const px = tx + tw + 28, step = (W2 - 12 - px) / 19;
        out.push(`<text class="lbl" x="${tx + tw + 14}" y="${y0 - 8}" text-anchor="middle">${escH(P(UI.pause))}</text>`);
        for (let j = 0; j < 20; j++) {
          const x = px + j * step, v = j < st.ptc ? 30 * (1 - j / (st.ptc + 1)) : 0, dl = (1.3 + j * .08).toFixed(2);
          if (v) out.push(`<rect class="tw sm" style="animation-delay:${dl}s" x="${x - 2.5}" y="${y0 - v * k}" width="5" height="${v * k}" rx="1.5"/>`);
          else out.push(`<circle class="zero" cx="${x}" cy="${y0 - 2}" r="2"/>`);
        }
        out.push(`<text class="lbl" x="${(px + W2 - 12) / 2}" y="${y0 + 38}" text-anchor="middle">${escH(P(UI.ptcRow))}</text>`);
        out.push(`<text class="big" x="${(px + W2 - 12) / 2}" y="${y0 - 90}" text-anchor="middle">PTC ${st.ptc}</text>`);
      }
      out.push('</svg>');
    }
    return out.join('');
  }

  /* ---------- Ortak senaryo motoruna kayıt (scen/scen-core.js) ---------- */
  const spec = {
    lede: UI.lede, groups: UI.groups, SC, refs: REFS, note: UI.note, replay: UI.replay,
    draw: st => svg(st),
    drawClass: st => (st.ptc != null || st.tet ? 'two' : '') + (st.ptc != null ? ' wide2' : ''),
    results(st, sc) {
      const m = measure(sc, st);
      const ratioTxt = m.ratio == null ? `<span class="muted">${escH(P(UI.na))}</span>`
        : m.norm != null ? `${pct(m.ratio * 100)} <span class="muted">(${escH(P(UI.raw))})</span> → <b>${pct(m.norm * 100)}</b> <span class="muted">(${escH(P(UI.norm))})</span>` : `<b>${pct(m.ratio * 100)}</b>`;
      return [
        {l: UI.tofc, v: `<b class="scn-big">${m.tofc}</b> / 4`},
        {l: UI.tofr, v: ratioTxt},
        {l: UI.t1, v: pct(m.t1)},
        ...(st.ptc != null ? [{l: UI.ptc, v: `<b>${st.ptc}</b>`}] : []),
        {l: UI.depth, v: `<span class="scn-cat c-${m.cat}">${escH(P(UI.cat[m.cat]))}</span>`, wide: true},
        {l: UI.ext, v: `<span class="scn-ext ${m.ext ? 'ok' : 'no'}">${m.ext ? '✓ ' : '✕ '}${escH(P(m.ext ? UI.met : UI.notMet))}</span>`, wide: true},
        {l: UI.qual, v: cite(P(m.q)), wide: true}
      ];
    }
  };
  if (typeof SCN !== 'undefined') SCN.reg(['tetragraph', 'twitchview', 'tofscan', 'stimpod-nms450x', 'ge-carescape-nmt'], spec);

  return {SC, measure, UI, spec};
})();
