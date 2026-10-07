'use strict';
/* Mekanik Ventilasyon Atlası · dil yardımcıları
   Sayfa dili <html lang> ile belirlenir. Türkçe sayfa kökte, İngilizce ve İspanyolca karşılıkları en/ ve es/ altındadır
   (tools/build-pages.cjs üretir). Arayüz metinleri locales/<dil>.js, klinik içerik data/content.<dil>.js içindedir. */
const MVA = (() => {
  const LANGS = ['tr', 'en', 'es'];
  const lang = LANGS.includes(document.documentElement.lang) ? document.documentElement.lang : 'tr';
  const messages = window.MVA_MESSAGES || {};
  const locale = {tr: 'tr-TR', en: 'en-US', es: 'es-ES'}[lang];
  const t = key => messages[key] ?? key;
  const fill = (str, vars) => String(str).replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);
  const root = lang === 'tr' ? '' : '../';
  /* Aynı rota başka dilde: hash korunur */
  const langHref = l => root + (l === 'tr' ? '' : l + '/') + location.hash;
  const fold = s => String(s).toLocaleLowerCase(locale).replace(/ı/g, 'i').normalize('NFD').replace(/[̀-ͯ]/g, '');
  const nf = {};
  /* Sayı biçimi: Türkçe ve İspanyolcada ondalık virgül, İngilizcede nokta */
  const num = (v, d = 0) => (nf[d] || (nf[d] = new Intl.NumberFormat(locale, {minimumFractionDigits: d, maximumFractionDigits: d}))).format(v);
  /* Birim: Türkçe "dk" (dakika) diğer dillerde "min" */
  const u = s => lang === 'tr' ? s : s.replace(/dk\b/g, 'min');
  function langSwitch(scope = document) {
    const sw = scope.querySelector('.lang-switch');
    if (sw) sw.innerHTML = LANGS.map(l => `<a href="${langHref(l)}" lang="${l}" hreflang="${l}"${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`).join('');
  }
  function applyStatic(scope = document) {
    scope.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    scope.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(pair => { const [attr, key] = pair.split(':'); if (attr && key) el.setAttribute(attr.trim(), t(key.trim())); });
    });
    langSwitch(scope);
  }
  /* Rota değişince dil bağlantıları yeni hash'i taşısın */
  addEventListener('hashchange', () => langSwitch());
  return {LANGS, lang, locale, t, fill, root, langHref, fold, num, u, applyStatic};
})();
