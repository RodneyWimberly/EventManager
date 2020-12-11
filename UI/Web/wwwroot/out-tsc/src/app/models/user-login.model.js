export class UserLoginModel {
    constructor(userName, password, rememberMe) {
        this.userName = userName;
        this.password = password;
        this.rememberMe = rememberMe;
    }
}
export var AuthProviders;
(function (AuthProviders) {
    AuthProviders[AuthProviders["IdentityServer"] = 0] = "IdentityServer";
    AuthProviders[AuthProviders["Google"] = 1] = "Google";
    AuthProviders[AuthProviders["Microsoft"] = 2] = "Microsoft";
    AuthProviders[AuthProviders["Facebook"] = 3] = "Facebook";
    AuthProviders[AuthProviders["Twitter"] = 4] = "Twitter";
    AuthProviders[AuthProviders["GitHub"] = 5] = "GitHub";
})(AuthProviders || (AuthProviders = {}));
//# sourceMappingURL=user-login.model.js.map