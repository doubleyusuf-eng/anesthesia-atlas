'use strict';
const ATLAS = (() => {
  const lang = ['tr','en','es'].includes(document.documentElement.lang) ? document.documentElement.lang : 'tr';
  const messages = window.ATLAS_MESSAGES || {};
  const locale = {tr:'tr-TR',en:'en-US',es:'es-ES'}[lang];
  const t = key => messages[key] ?? key;
  const ui = key => t('ui.' + key);
  const template = key => (strings,...values) => {
    const parts = messages[key] || strings;
    return parts.reduce((text,part,i) => text + part + (i < values.length ? values[i] : ''), '');
  };
  return {lang,locale,t,ui,template,percent: value => lang === 'tr' ? '%'+value : value+(lang === 'es'?' %':'%')};
})();
