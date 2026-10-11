// Internacionalização: troca dinâmica PT ↔ EN
(function () {
  var STORAGE_KEY = 'lang';
  var DEFAULT_LANG = 'pt';

  function getLang() {
    try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (e) { return DEFAULT_LANG; }
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function aplicar(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-pt][data-en]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang);
    });
    document.querySelectorAll('[data-pt-html][data-en-html]').forEach(function (el) {
      el.innerHTML = el.getAttribute('data-' + lang + '-html');
    });
    document.querySelectorAll('[data-pt-src][data-en-src]').forEach(function (el) {
      el.src = el.getAttribute('data-' + lang + '-src');
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('lang-active', btn.getAttribute('data-lang') === lang);
    });
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  function init() {
    var lang = getLang();
    aplicar(lang);

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var novoLang = btn.getAttribute('data-lang');
        setLang(novoLang);
        aplicar(novoLang);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
