'use strict';
/* Mekanik Ventilasyon Atlası · kısaltma işaretleme
   #view içindeki metinlerde data/abbr.js sözlüğündeki kısaltmaları <abbr class="ab"> ile sarar.
   Fareyle üzerine gelince, klavyeyle odaklanınca ya da dokununca açılım balonu görünür.
   Ekran/eğri/sayı panelleri, bağlantılar, düğmeler ve kod parçaları işaretlenmez. */
const ABBR = (() => {
  const D = window.MVA_ABBR || {};
  const keys = Object.keys(D).sort((a, b) => b.length - a.length);
  const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  /* harf/rakam sınırı: Türkçe harfler ve ₂ dahil */
  const W = 'A-Za-z0-9ÇĞİÖŞÜçğıöşü₂Δ';
  const re = new RegExp(`(?<![${W}])(${keys.map(escRe).join('|')})(?![${W}])`, 'g');
  const SKIP = 'abbr,a,button,code,script,style,svg,canvas,input,select,textarea,output,.viz,.nums,.stage,.tag3d,.cites,.no-abbr,h1,.topnav,.subtabs,.sectabs,.pat-list,.chip,.vchips,.vmode,.eyebrow,.badge,.card-k,.mk';
  function run(root) {
    if (!root || !keys.length) return;
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode: n => {
      if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const p = n.parentElement; if (!p || p.closest(SKIP)) return NodeFilter.FILTER_REJECT;
      re.lastIndex = 0; return re.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }});
    const nodes = []; while (tw.nextNode()) nodes.push(tw.currentNode);
    for (const n of nodes) {
      const f = document.createDocumentFragment(), s = n.nodeValue; let last = 0; re.lastIndex = 0; let m;
      while ((m = re.exec(s))) {
        if (m.index > last) f.appendChild(document.createTextNode(s.slice(last, m.index)));
        const a = document.createElement('abbr'); a.className = 'ab'; a.tabIndex = 0; a.dataset.t = D[m[1]]; a.textContent = m[1];
        f.appendChild(a); last = m.index + m[1].length;
      }
      if (last < s.length) f.appendChild(document.createTextNode(s.slice(last)));
      n.parentNode.replaceChild(f, n);
    }
  }
  /* Görünüm içindeki her yeni içerik için (gecikmeli) çalış */
  let pending = null;
  function watch(root) {
    new MutationObserver(() => { if (pending) return; pending = setTimeout(() => { pending = null; run(root); }, 60); }).observe(root, {childList: true, subtree: true});
  }
  /* Dokunmatik: dokununca balonu aç/kapa */
  document.addEventListener('click', e => {
    const a = e.target.closest('abbr.ab');
    document.querySelectorAll('abbr.ab.open').forEach(x => { if (x !== a) x.classList.remove('open'); });
    if (a) a.classList.toggle('open');
  });
  return {run, watch, full: k => D[k]};
})();
