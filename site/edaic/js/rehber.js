/* Kitap rehberi bileşenleri (data/rehber.js). js/viz.js'ten sonra yüklenir.
   Yerel okuyucu (site/yerel/, git dışında) yalnız bu bilgisayarda vardır; yayındaki sitede bağlantısı gösterilmez. */
(function () {
  'use strict';
  const { esc, REF } = window.VIZ_YARDIM;
  const VIZ = window.VIZ;
  const YEREL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  let yerelVar = null;
  const yerelMi = () => (yerelVar ??= YEREL
    ? fetch('yerel/kitap.html', { method: 'HEAD' }).then((r) => r.ok).catch(() => false)
    : Promise.resolve(false));

  /* Kitabın kendisi yayımlanmaz; bu bilgisayarda yerel okuyucu varsa ona bağlantı verilir. */
  VIZ.yerelkitap = (el) => {
    el.innerHTML = `<div class="card"><h3>Kitabın kendisi</h3><p>${REF('Kitabın metni, soruları ve model yanıtları bu sitede yayımlanmaz. Bu rehber kitabı nasıl kullanacağınızı gösterir; kitabın kendisi için yayıncıya başvurun. [[K4]]')}</p><p class="yerel-baglanti" hidden></p></div>`;
    yerelMi().then((ok) => {
      if (!ok || !el.isConnected) return;
      const p = el.querySelector('.yerel-baglanti');
      p.hidden = false;
      p.innerHTML = '<a class="btn" href="yerel/kitap.html">Türkçe çalışma çevirisini aç</a> <span class="small muted">Yalnız bu bilgisayarda görünür; yayına gitmez.</span>';
    });
  };

  /* Bölüm haritası: data-kisim="2,3" → o kısımların bölümleri */
  VIZ.bolumharita = (el) => {
    const K = String(el.dataset.kisim || '').split(',').map(Number);
    const B = window.VERI.rehber.bolumler.filter((b) => K.includes(b.kisim));
    el.innerHTML = `<div class="bharita">${B.map((b) => `<article class="card bh-bol">
      <p class="no">Bölüm ${b.no} · ${esc(b.kagit)} · <span class="bh-s" data-s="${b.s}">s. ${b.s}–${b.son}</span></p>
      <h3>${esc(b.ad)}</h3>
      <p>${REF(b.ozet)}</p>
      ${b.odak && b.odak.length ? `<ul class="small">${b.odak.map((o) => `<li>${REF(o)}</li>`).join('')}</ul>` : ''}
      ${b.rota ? `<p class="small"><a href="#/${b.rota}">Atlastaki ders modülü →</a></p>` : ''}
    </article>`).join('')}</div>`;
    yerelMi().then((ok) => {
      if (!ok || !el.isConnected) return;
      el.querySelectorAll('.bh-s').forEach((s) => { s.outerHTML = `<a href="yerel/kitap.html#s${s.dataset.s}" title="Yerel okuyucuda aç">${s.textContent}</a>`; });
    });
  };
})();
