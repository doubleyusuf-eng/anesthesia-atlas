'use strict';
/* İleri Monitörizasyon Atlası · dil yardımcıları
   Sayfa dili <html lang> ile belirlenir. Türkçe sayfalar kökte, İngilizce ve İspanyolca karşılıkları en/ ve es/ altındadır. */
const ICA = (() => {
  const LANGS = ['tr','en','es'];
  const lang = LANGS.includes(document.documentElement.lang) ? document.documentElement.lang : 'tr';
  const messages = window.ICA_MESSAGES || {};
  const locale = {tr:'tr-TR',en:'en-US',es:'es-ES'}[lang];
  const t = key => messages[key] ?? key;
  /* {tr,en,es} nesnesinden geçerli dili seç (boşsa Türkçeye, sonra İngilizceye düş); düz metni olduğu gibi döndür. */
  const pick = v => v == null ? '' : (typeof v === 'object' && !Array.isArray(v)) ? (v[lang] || v.tr || v.en || '') : v;
  const fill = (str, vars) => String(str).replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);
  const root = lang === 'tr' ? '' : '../';
  const page = () => location.pathname.split('/').pop() || 'index.html';
  const langHref = l => root + (l === 'tr' ? '' : l + '/') + page() + location.search + location.hash;
  /* Türkçe büyük/küçük harf ve aksanlardan bağımsız arama anahtarı */
  const fold = s => String(s).toLocaleLowerCase(locale).replace(/ı/g,'i').normalize('NFD').replace(/[̀-ͯ]/g,'');

  function applyStatic(scope = document) {
    scope.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    scope.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(pair => { const [attr, key] = pair.split(':'); if (attr && key) el.setAttribute(attr.trim(), t(key.trim())); });
    });
    const sw = scope.querySelector('.lang-switch');
    if (sw) sw.innerHTML = LANGS.map(l => `<a href="${langHref(l)}" lang="${l}" hreflang="${l}"${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`).join('');
  }
  return {LANGS, lang, locale, t, pick, fill, root, langHref, fold, applyStatic};
})();
