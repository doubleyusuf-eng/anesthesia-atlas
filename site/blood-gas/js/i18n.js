'use strict';
/* Kan Gazı Atlası · dil yardımcıları
   Sayfa dili <html lang> ile belirlenir. Türkçe sayfa kökte, İngilizce ve İspanyolca karşılıkları en/ ve es/ altındadır
   (tools/build-pages.cjs üretir). Arayüz iletileri locales/<dil>.js, içerik data/content.<dil>.js, görünüm metinleri js/*.<dil>.js
   dosyalarındadır (tools/i18n.cjs apply üretir; Türkçe kaynak dosyalar elle düzenlenir). */
const KGI = (() => {
  const LANGS = ['tr', 'en', 'es'];
  const lang = LANGS.includes(document.documentElement.lang) ? document.documentElement.lang : 'tr';
  const messages = window.KG_MESSAGES || {};
  const locale = {tr: 'tr-TR', en: 'en-US', es: 'es-ES'}[lang];
  const t = key => messages[key] ?? key;
  const has = key => key in messages;
  const fill = (str, vars) => String(str).replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);
  const tf = (key, vars) => fill(t(key), vars || {});
  const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const nf = {};
  /* Sayı biçimi: Türkçe ve İspanyolcada ondalık virgül, İngilizcede nokta. Gereksiz sıfırlar atılır (en çok d basamak) */
  const num = (v, d = 1) => v == null || !Number.isFinite(v) ? '–' : (nf[d] || (nf[d] = new Intl.NumberFormat(locale, {maximumFractionDigits: d}))).format(v);
  /* Forma yazılan sayı: dilin ondalık ayırıcısıyla (motor iki ayırıcıyı da okur) */
  const dec = v => lang === 'en' ? String(v) : String(v).replace('.', ',');
  const fold = s => String(s).toLocaleLowerCase(locale).replace(/ı/g, 'i').normalize('NFD').replace(/[̀-ͯ]/g, '');
  const root = lang === 'tr' ? '' : '../';
  /* Aynı rota başka dilde: hash korunur */
  const langHref = l => root + (l === 'tr' ? '' : l + '/') + location.hash;
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
  addEventListener('hashchange', () => langSwitch());
  return {LANGS, lang, locale, t, has, fill, tf, esc, num, dec, fold, root, langHref, applyStatic};
})();
