jQuery(function(){
    if (getCookie(languagename) != "") {
        if (getCookie(languagename) == "cn") {
            jQuery("[data-localize]").localize("text", {
                pathPrefix: "lang",
                language: "cn"
            });
            lang = cn;
            return;
        }
        if (getCookie(languagename) == "en") {
            jQuery("[data-localize]").localize("text", {
                pathPrefix: "lang",
                language: "en"
            });
            lang = en;
            return;
        }
    }
    var uulanguage = (navigator.language || navigator.browserLanguage).toLowerCase();
    
    if (uulanguage.indexOf("en") > -1) {
        jQuery("[data-localize]").localize("text", {
            pathPrefix: "lang",
            language: "en"
        });
    }
    else {
        if (uulanguage.indexOf("cn") > -1) {
            jQuery("[data-localize]").localize("text", {
                pathPrefix: "lang",
                language: "cn"
            });
        }
        else {
            jQuery("[data-localize]").localize("text", {
                pathPrefix: "lang",
                language: "en"
            });
        }
    }
});
