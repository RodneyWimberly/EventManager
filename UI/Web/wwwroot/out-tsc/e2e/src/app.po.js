import { browser, by, element } from 'protractor';
export class AppPage {
    navigateTo() {
        return browser.get(browser.baseUrl);
    }
    getAppTitle() {
        return element(by.css('app-root .appTitle')).getText();
    }
}
//# sourceMappingURL=app.po.js.map