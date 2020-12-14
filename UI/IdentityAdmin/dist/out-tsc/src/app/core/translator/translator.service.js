import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let TranslatorService = class TranslatorService {
    constructor(translate) {
        this.translate = translate;
        this.defaultLanguage = "en";
        this.availablelangs = [
            { code: "en", text: "English" },
            { code: "es", text: "Spanish" },
            { code: "pt", text: "Portuguese" },
            { code: "fr", text: "French" },
            { code: "de", text: "German" },
            { code: "nl", text: "Dutch" },
            { code: "ru", text: "Russian" },
            { code: "zh-cn", text: "Chinese Simplified" },
            { code: "zh-tw", text: "Chinese Traditional" },
            { code: "el", text: "Greek" }
        ];
        if (!translate.getDefaultLang())
            translate.setDefaultLang(this.defaultLanguage);
        this.useLanguage();
    }
    useLanguage(lang = null) {
        this.translate.use(lang || this.translate.getDefaultLang());
    }
    getAvailableLanguages() {
        return this.availablelangs;
    }
};
TranslatorService = __decorate([
    Injectable()
], TranslatorService);
export { TranslatorService };
//# sourceMappingURL=translator.service.js.map