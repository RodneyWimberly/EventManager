import { JpProjectWebAppPage } from "./app.po";
describe("jpproject WebApp", function () {
    let page;
    beforeEach(() => {
        page = new JpProjectWebAppPage();
    });
    it("should display sign-in page", () => {
        page.navigateTo();
        expect(page.getButtonText()).toEqual("Login");
        expect(page.getUrl()).toContain("/login");
    });
});
//# sourceMappingURL=app.e2e-spec.js.map