var ConfigurationService_1;
import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DbKeys } from '../helpers/db-keys';
import { Utilities } from '../helpers/utilities';
import { environment } from '../../environments/environment';
import { AuthConfig } from 'angular-oauth2-oidc';
let ConfigurationService = ConfigurationService_1 = class ConfigurationService {
    constructor(localStorageService, appTranslationService, appThemeService, router) {
        this.localStorageService = localStorageService;
        this.appTranslationService = appTranslationService;
        this.appThemeService = appThemeService;
        this.router = router;
        this._authProvider = 'none';
        this.webBaseUrl = environment.webBaseUrl || Utilities.baseUrl();
        this.loginUrl = environment.loginUrl;
        this.authCallbackUrl = environment.authCallbackUrl;
        this.apiBaseUrl = environment.apiBaseUrl || this.webBaseUrl + '/api';
        this.apiVersion = environment.apiVersion.replace('.', '_') || '1_0';
        this.fallbackBaseUrl = 'http://www.wimberlytech.com';
        // ***End of defaults***
        this._language = null;
        this._homeUrl = null;
        this._themeId = null;
        this._showDashboardStatistics = null;
        this._showDashboardNotifications = null;
        this._showDashboardTodo = null;
        this._showDashboardBanner = null;
        this.onConfigurationImported = new Subject();
        this.configurationImported$ = this.onConfigurationImported.asObservable();
        this.loadLocalChanges();
    }
    set language(value) {
        this._language = value;
        this.saveToLocalStore(value, DbKeys.LANGUAGE);
        this.appTranslationService.changeLanguage(value);
    }
    get language() {
        return this._language || ConfigurationService_1.defaultLanguage;
    }
    set themeId(value) {
        value = +value;
        this._themeId = value;
        this.saveToLocalStore(value, DbKeys.THEME_ID);
        this.appThemeService.installTheme(this.appThemeService.getThemeByID(value));
    }
    get themeId() {
        return this._themeId || ConfigurationService_1.defaultThemeId;
    }
    set homeUrl(value) {
        this._homeUrl = value;
        this.saveToLocalStore(value, DbKeys.HOME_URL);
    }
    get homeUrl() {
        return this._homeUrl || ConfigurationService_1.defaultHomeUrl;
    }
    set showDashboardStatistics(value) {
        this._showDashboardStatistics = value;
        this.saveToLocalStore(value, DbKeys.SHOW_DASHBOARD_STATISTICS);
    }
    get showDashboardStatistics() {
        return this._showDashboardStatistics != null ? this._showDashboardStatistics : ConfigurationService_1.defaultShowDashboardStatistics;
    }
    set showDashboardNotifications(value) {
        this._showDashboardNotifications = value;
        this.saveToLocalStore(value, DbKeys.SHOW_DASHBOARD_NOTIFICATIONS);
    }
    get showDashboardNotifications() {
        return this._showDashboardNotifications != null ? this._showDashboardNotifications : ConfigurationService_1.defaultShowDashboardNotifications;
    }
    set showDashboardTodo(value) {
        this._showDashboardTodo = value;
        this.saveToLocalStore(value, DbKeys.SHOW_DASHBOARD_TODO);
    }
    get showDashboardTodo() {
        return this._showDashboardTodo != null ? this._showDashboardTodo : ConfigurationService_1.defaultShowDashboardTodo;
    }
    set showDashboardBanner(value) {
        this._showDashboardBanner = value;
        this.saveToLocalStore(value, DbKeys.SHOW_DASHBOARD_BANNER);
    }
    get showDashboardBanner() {
        return this._showDashboardBanner != null ? this._showDashboardBanner : ConfigurationService_1.defaultShowDashboardBanner;
    }
    get authProvider() {
        if (this._authProvider == 'none')
            this._authProvider = this.localStorageService.getDataObject(DbKeys.AUTH_PROVIDER) || 'idsvr';
        return this._authProvider;
    }
    set authProvider(value) {
        this._authProvider = value;
        this.saveToLocalStore(DbKeys.AUTH_PROVIDER, value);
    }
    get authorityBaseUrl() { return environment.authorityBaseUrl || environment.webBaseUrl || Utilities.baseUrl(); }
    get authConfig() {
        const config = new AuthConfig();
        const rootNamespace = 'urn:em';
        config.oidc = true;
        config.requestAccessToken = true;
        config.showDebugInformation = true;
        config.strictDiscoveryDocumentValidation = false;
        config.clientId = rootNamespace + ':client:' + this.authProvider;
        config.scope = 'openid email phone profile offline_access ' + rootNamespace + ':roles ' + rootNamespace + ':api';
        config.dummyClientSecret = 'eventmanagersecret';
        if (this.authProvider == 'idsvr')
            config.responseType = 'id_token token';
        config.issuer = this.authorityBaseUrl;
        config.redirectUri = this.authCallbackUrl;
        return config;
    }
    loadLocalChanges() {
        if (this.localStorageService.exists(DbKeys.LANGUAGE)) {
            this._language = this.localStorageService.getDataObject(DbKeys.LANGUAGE);
            this.appTranslationService.changeLanguage(this._language);
        }
        else {
            this.resetLanguage();
        }
        if (this.localStorageService.exists(DbKeys.THEME_ID)) {
            this._themeId = this.localStorageService.getDataObject(DbKeys.THEME_ID);
            this.appThemeService.installTheme(this.appThemeService.getThemeByID(this._themeId));
        }
        else {
            this.resetTheme();
        }
        if (this.localStorageService.exists(DbKeys.HOME_URL)) {
            this._homeUrl = this.localStorageService.getDataObject(DbKeys.HOME_URL);
        }
        if (this.localStorageService.exists(DbKeys.SHOW_DASHBOARD_STATISTICS)) {
            this._showDashboardStatistics = this.localStorageService.getDataObject(DbKeys.SHOW_DASHBOARD_STATISTICS);
        }
        if (this.localStorageService.exists(DbKeys.SHOW_DASHBOARD_NOTIFICATIONS)) {
            this._showDashboardNotifications = this.localStorageService.getDataObject(DbKeys.SHOW_DASHBOARD_NOTIFICATIONS);
        }
        if (this.localStorageService.exists(DbKeys.SHOW_DASHBOARD_TODO)) {
            this._showDashboardTodo = this.localStorageService.getDataObject(DbKeys.SHOW_DASHBOARD_TODO);
        }
        if (this.localStorageService.exists(DbKeys.SHOW_DASHBOARD_BANNER)) {
            this._showDashboardBanner = this.localStorageService.getDataObject(DbKeys.SHOW_DASHBOARD_BANNER);
        }
    }
    saveToLocalStore(data, key) {
        setTimeout(() => this.localStorageService.savePermanentData(data, key));
    }
    import(jsonValue) {
        this.clearLocalChanges();
        if (jsonValue) {
            const importValue = Utilities.JsonTryParse(jsonValue);
            if (importValue.language != null) {
                this.language = importValue.language;
            }
            if (importValue.themeId != null) {
                this.themeId = +importValue.themeId;
            }
            if (importValue.homeUrl != null) {
                this.homeUrl = importValue.homeUrl;
            }
            if (importValue.showDashboardStatistics != null) {
                this.showDashboardStatistics = importValue.showDashboardStatistics;
            }
            if (importValue.showDashboardNotifications != null) {
                this.showDashboardNotifications = importValue.showDashboardNotifications;
            }
            if (importValue.showDashboardTodo != null) {
                this.showDashboardTodo = importValue.showDashboardTodo;
            }
            if (importValue.showDashboardBanner != null) {
                this.showDashboardBanner = importValue.showDashboardBanner;
            }
        }
        this.onConfigurationImported.next();
    }
    export(changesOnly = true) {
        const exportValue = {
            language: changesOnly ? this._language : this.language,
            themeId: changesOnly ? this._themeId : this.themeId,
            homeUrl: changesOnly ? this._homeUrl : this.homeUrl,
            showDashboardStatistics: changesOnly ? this._showDashboardStatistics : this.showDashboardStatistics,
            showDashboardNotifications: changesOnly ? this._showDashboardNotifications : this.showDashboardNotifications,
            showDashboardTodo: changesOnly ? this._showDashboardTodo : this.showDashboardTodo,
            showDashboardBanner: changesOnly ? this._showDashboardBanner : this.showDashboardBanner
        };
        return JSON.stringify(exportValue);
    }
    clearLocalChanges() {
        this._language = null;
        this._themeId = null;
        this._homeUrl = null;
        this._showDashboardStatistics = null;
        this._showDashboardNotifications = null;
        this._showDashboardTodo = null;
        this._showDashboardBanner = null;
        this.localStorageService.deleteData(DbKeys.LANGUAGE);
        this.localStorageService.deleteData(DbKeys.THEME_ID);
        this.localStorageService.deleteData(DbKeys.HOME_URL);
        this.localStorageService.deleteData(DbKeys.SHOW_DASHBOARD_STATISTICS);
        this.localStorageService.deleteData(DbKeys.SHOW_DASHBOARD_NOTIFICATIONS);
        this.localStorageService.deleteData(DbKeys.SHOW_DASHBOARD_TODO);
        this.localStorageService.deleteData(DbKeys.SHOW_DASHBOARD_BANNER);
        this.resetLanguage();
        this.resetTheme();
    }
    resetLanguage() {
        const language = this.appTranslationService.useBrowserLanguage();
        if (language) {
            this._language = language;
        }
        else {
            this._language = this.appTranslationService.useDefaultLangage();
        }
    }
    resetTheme() {
        this.appThemeService.installTheme();
        this._themeId = null;
    }
};
ConfigurationService.appVersion = '3.0.0';
// ***Specify default configurations here***
ConfigurationService.defaultLanguage = 'en';
ConfigurationService.defaultHomeUrl = '/';
ConfigurationService.defaultThemeId = 1;
ConfigurationService.defaultShowDashboardStatistics = true;
ConfigurationService.defaultShowDashboardNotifications = true;
ConfigurationService.defaultShowDashboardTodo = false;
ConfigurationService.defaultShowDashboardBanner = true;
ConfigurationService = ConfigurationService_1 = __decorate([
    Injectable()
], ConfigurationService);
export { ConfigurationService };
//# sourceMappingURL=configuration.service.js.map