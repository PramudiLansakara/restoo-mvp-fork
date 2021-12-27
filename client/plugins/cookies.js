(function () {
  const s1 = document.createElement("script");
  s1.charset = "UTF-8";
  s1.type = "text/javascript";
  s1.src =
    "//www.freeprivacypolicy.com/public/cookie-consent/4.0.0/cookie-consent.js";

  s1.onload = function () {
    cookieconsent.run({
      notice_banner_type: "simple",
      consent_type: "express",
      palette: "light",
      language: "de",
      page_load_consent_levels: ["strictly-necessary"],
      notice_banner_reject_button_hide: false,
      preferences_center_close_button_hide: false,
      website_name: "https://mezomia-damas.de/",
      open_preferences_center_selector: "öffne_Präferenzen",
      website_privacy_policy_url:
        "https://www.freeprivacypolicy.com/live/01af0b02-1a92-41d0-a223-9ba168026caf",
    });
  };

  document.getElementsByTagName("head")[0].appendChild(s1);
})();
