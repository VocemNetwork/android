(function () {
  if (window.__vocemNativeShell) return;
  window.__vocemNativeShell = true;

  function textOf(el) {
    return (el.textContent || "").replace(/\s+/g, " ").trim();
  }

  function hideStoreCtas() {
    document.querySelectorAll("button, a").forEach(function (el) {
      var t = textOf(el);
      if (t === "Spend $VOCEM" || t.indexOf("Spend $VOCEM") === 0) {
        el.style.display = "none";
      }
    });
  }

  var obs = new MutationObserver(hideStoreCtas);
  obs.observe(document.documentElement, { childList: true, subtree: true });
  hideStoreCtas();

  function wireBack() {
    var App = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
    if (!App || window.__vocemBackWired) return;
    window.__vocemBackWired = true;
    App.addListener("backButton", function (info) {
      if ((info && info.canGoBack) || window.history.length > 1) window.history.back();
      else App.exitApp();
    });
  }

  wireBack();
  setInterval(wireBack, 2500);
})();
