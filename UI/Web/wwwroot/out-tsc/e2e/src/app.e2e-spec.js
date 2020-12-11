import { AppPage } from './app.po';
describe('workspace-project App', () => {
    let page;
    beforeEach(() => {
        page = new AppPage();
    });
    it('should display application title: EventManager', () => {
        page.navigateTo();
        expect(page.getAppTitle()).toEqual('EventManager');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map