import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
let AppTranslationService = class AppTranslationService {
    constructor(translate) {
        this.translate = translate;
        this.onLanguageChanged = new Subject();
        this.languageChanged$ = this.onLanguageChanged.asObservable();
        this.addLanguages(['en', 'fr', 'de', 'pt', 'ar', 'ko']);
        this.setDefaultLanguage('en');
    }
    addLanguages(lang) {
        this.translate.addLangs(lang);
    }
    setDefaultLanguage(lang) {
        this.translate.setDefaultLang(lang);
    }
    getDefaultLanguage() {
        return this.translate.defaultLang;
    }
    getBrowserLanguage() {
        return this.translate.getBrowserLang();
    }
    getCurrentLanguage() {
        return this.translate.currentLang;
    }
    getLoadedLanguages() {
        return this.translate.langs;
    }
    useBrowserLanguage() {
        const browserLang = this.getBrowserLanguage();
        if (browserLang.match(/en|fr|de|pt|ar|ko/)) {
            this.changeLanguage(browserLang);
            return browserLang;
        }
    }
    useDefaultLangage() {
        return this.changeLanguage(null);
    }
    changeLanguage(language) {
        if (!language) {
            language = this.getDefaultLanguage();
        }
        if (language != this.translate.currentLang) {
            setTimeout(() => {
                this.translate.use(language);
                this.onLanguageChanged.next(language);
            });
        }
        return language;
    }
    getTranslation(key, interpolateParams) {
        return this.translate.instant(key, interpolateParams);
    }
    getTranslationAsync(key, interpolateParams) {
        return this.translate.get(key, interpolateParams);
    }
};
AppTranslationService = __decorate([
    Injectable()
], AppTranslationService);
export { AppTranslationService };
export class TranslateLanguageLoader {
    getTranslation(lang) {
        // Note Dynamic require(variable) will not work. Require is always at compile time
        switch (lang) {
            case 'en':
                return of(require('../assets/locale/en.json'));
            case 'fr':
                return of(require('../assets/locale/fr.json'));
            case 'de':
                return of(require('../assets/locale/de.json'));
            case 'pt':
                return of(require('../assets/locale/pt.json'));
            case 'ar':
                return of(require('../assets/locale/ar.json'));
            case 'ko':
                return of(require('../assets/locale/ko.json'));
            default:
        }
    }
}
//# sourceMappingURL=app-translation.service.js.map