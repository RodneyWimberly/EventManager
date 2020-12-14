import { environment } from '@env/environment';
export const authConfig = {
    issuer: environment.IssuerUri,
    clientId: 'IS4-Admin',
    requireHttps: environment.RequireHttps,
    redirectUri: environment.Uri + "/login-callback",
    scope: "openid profile email jp_api.is4",
    responseType: 'code',
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
    useSilentRefresh: true,
    silentRefreshTimeout: 5000,
    timeoutFactor: 0.25,
    sessionChecksEnabled: true,
    showDebugInformation: true,
    clearHashAfterLogin: false,
    nonceStateSeparator: 'semicolon' // Real semicolon gets mangled by IdentityServer's URI encoding
};
//# sourceMappingURL=auth-config.js.map