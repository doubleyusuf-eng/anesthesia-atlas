'use strict';
/* İş istasyonu 3B sistemi için küçük dil köprüsü: device3d.js ICA.lang / ICA.t kullanır; atlasın kendi dil sistemi ATLAS'tır. */
window.ICA = (() => {
  const lang = ['tr', 'en', 'es'].includes(document.documentElement.lang) ? document.documentElement.lang : 'tr';
  const MSG = {'dev.sim': {tr: 'Eğitim simülasyonu', en: 'Training simulation', es: 'Simulación educativa'}};
  const pick = v => v == null ? '' : (typeof v === 'object' && !Array.isArray(v)) ? (v[lang] || v.tr || v.en || '') : v;
  return {lang, pick, t: k => MSG[k] ? pick(MSG[k]) : k};
})();
