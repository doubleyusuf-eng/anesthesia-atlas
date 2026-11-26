(function () {
  'use strict';
  const VIZ = window.VIZ;
  const sekiller = () => SAYFALAR['dersler/anatomi/07a'].sekiller;
  VIZ.an07a_giris = el => SEKIL.cizim(el, sekiller().giris);
  VIZ.an07a_servikal = el => SEKIL.cizim(el, sekiller().servikal);
  VIZ.an07a_fossa = el => SEKIL.cizim(el, sekiller().fossa);
  VIZ.an07a_ven = el => SEKIL.cizim(el, sekiller().ven);
  VIZ.an07a_arter = el => SEKIL.cizim(el, sekiller().arter);
  VIZ.an07a_kosta = el => SEKIL.cizim(el, sekiller().kosta);
})();
