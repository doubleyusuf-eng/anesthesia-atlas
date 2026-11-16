/* Theme: the atlases open in the light theme. Dark is only a choice the reader makes with the
   top-right button; the operating system's dark mode is not followed. The choice is shared by every
   atlas on this origin. Loaded synchronously in <head> so the page never paints in the wrong theme.
   The same file ships in the hub and in each atlas. */
(function () {
  var KEY = 'atlas-theme', root = document.documentElement;
  var stored = function () { try { return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'; } catch (e) { return 'light'; } };
  root.setAttribute('data-theme', stored());

  var LABEL = { tr: 'Koyu tema', en: 'Dark theme', es: 'Tema oscuro' };
  var ICON = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path class="tt-moon" d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z"/>' +
    '<g class="tt-sun"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/></g></svg>';
  /* order:2 keeps the button last in the top bar (after progress buttons that other scripts add later) but
     ahead of the menus that wrap onto their own row (order:3) on narrow screens */
  var CSS = '.theme-toggle{order:2;flex:none;display:inline-grid;place-items:center;width:34px;height:34px;margin-left:6px;padding:0;border-radius:999px;' +
    'border:1px solid color-mix(in srgb,currentColor 22%,transparent);background:transparent;color:inherit;cursor:pointer;opacity:.85}' +
    '.theme-toggle:hover{opacity:1;border-color:color-mix(in srgb,currentColor 45%,transparent)}' +
    '.theme-toggle:focus-visible{outline:2px solid currentColor;outline-offset:2px}' +
    '.theme-toggle .tt-sun{display:none}[data-theme="dark"] .theme-toggle .tt-sun{display:inline}[data-theme="dark"] .theme-toggle .tt-moon{display:none}';

  function mount() {
    var anchor = document.querySelector('.topbar .lang-switch');
    if (!anchor || document.querySelector('.theme-toggle')) return;
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'theme-toggle'; b.innerHTML = ICON;
    var label = LABEL[(root.getAttribute('lang') || 'tr').slice(0, 2)] || LABEL.en;
    b.setAttribute('aria-label', label); b.title = label;
    var sync = function () { b.setAttribute('aria-pressed', root.getAttribute('data-theme') === 'dark' ? 'true' : 'false'); };
    b.addEventListener('click', function () {
      var t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', t);
      try { localStorage.setItem(KEY, t); } catch (e) { /* private mode: the choice lasts for this page only */ }
      sync();
    });
    anchor.insertAdjacentElement('afterend', b); sync();
    /* If the bar wraps and the button lands on a lower row, hug that row's right edge */
    var place = function () {
      b.style.marginLeft = '';
      var first = b.parentElement.firstElementChild;
      if (first && b.getBoundingClientRect().top > first.getBoundingClientRect().top + 8) b.style.marginLeft = 'auto';
    };
    place(); addEventListener('resize', place); addEventListener('load', place);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
