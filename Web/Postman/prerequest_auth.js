/*******************************************************************************
* OAuth2 - Pre-request Script
********************************************************************************
This is meant to be used as a pre-request script to obtain an Access Token 
and populate a collection variable with the Access Token so it can be used with requests.
This script contanins login to only obtain an Access Token if:
    a. no token is found, or 
    b. the environment has changed since the Access Token was obtained, or 
    c. the token has expired
If you place this as the collection level pre-request script it will only run once per run 
instance consisting of requests and/or folders and/or collection.

Here is a list of variables used by this script
* Collection:
    * apiUrl:
        Used by collection as root url for all requests
        This is populated by collection pre-request script from the environment variable 
    * AppPrefix:
        Used as the key prefix when looking for Environment or Global variables
    * AuthToken:
        Then AuthToken used for each request. 
        This is populated in the pre-request script if the token cannot be found or the token has expired
        The is set as a Bearer token in the authorization tab of the collection 
        The authentication tab of each folder/request selects parents authentication settings (default)
    * AuthExpiration:
        The expiration timestamp for AuthToken
        This is populated in the pre-request script if a new AuthToken is aquired

* Environment:
    * {{AppPrefix}}Url:
        Used to populate the apiUri collection variable that is used by all requests
    * {{AppPrefix}}ApiVersion:
        Used when populating apiUrl collection variable.
        If this value exists then /v{{ApiVersion}} is appended to {{AppPrefix}}Url; 
        otherwise only {{AppPrefix}}Url is used
    * {{AppPrefix}}AuthProvider:
        The name of the current Auth provider.
        Currently Internal (ResourceOwnerPassword Flow) and Google (Implicit Flow) are supported.
        This value plus the string "Auth" is appended to the AppPrefix to rertieve AuthProvider specific configuratuon
    * {{AppPrefix}}GoogleAuthUser:
        The Client Id supplied by Google used to construct Url for implicit flow
    * {{AppPrefix}}GoogleAuthPassword:
        The Client Secret supplied by Google used to construct Url for implicit flow
    * {{AppPrefix}}GoogleAuthIssuer:
        The issuer url (https://accounts.google.com) used to communicate with Google
    * {{AppPrefix}}InternalAuthUser:
        The application user used to create the AuthToken request
    * {{AppPrefix}}InternalAuthPassword:
        The application password used to create the AuthToken request
    * {{AppPrefix}}InternalAuthIssuer:
        The issuer url (https://localhost:5001) used to communicate with IdentityServer

* Global: N/A*/

// https://joolfe.github.io/postman-util-lib/
eval(pm.globals.get('pmlib_bundle'))
class QueryStringBuilder {
    _url;
    _params;
    constructor(url) {
        if (url) me._url = url;
        this._params = {}; }
    append(key, value) {
        this._params[key] = value;
        return this; }
    build() {
        let href = "";
        if (this._url) href = this._url + "?";
        for (let param in this._params)
            href += encodeURIComponent(param) + '=' + encodeURIComponent(this._params[param]) + '&';
        return href.slice(0, -1); } }
class Configuration {
    _prefix;
    get prefix() { return this._prefix; }
    constructor(configType) {
        if (!configType) configType = "";
        this._prefix = pm.collectionVariables.get("AppPrefix") + configType; }
    set(key, value) {
        const appKey = this.prefix + key;
        if (pm.globals.has(appKey)) pm.globals.set(appKey, value);
        else if (pm.environment.has(appKey)) pm.environment.set(appKey, value);
        else pm.collectionVariables.set(key, value); }
    get(key) {
        const appKey = this.prefix + key;
        let value = pm.globals.get(appKey);
        if (!value) value = pm.environment.get(appKey);
        if (!value) value = pm.collectionVariables.get(key);
        return value; }
    get auth() {
        return JSON.parse(this.get(this.get("AuthProvider") + "Auth")); } }
class AuthManager {
    _config;
    _forceRetreiveToken;
    constructor() {
        this._config = new Configuration();
        const baseUrl = this._config.get("Url");
        const apiVersion = this._config.get("ApiVersion");
        let apiUrl = baseUrl;
        if (apiVersion) apiUrl = baseUrl + "/api/v" + apiVersion;
        else apiUrl = baseUrl + "/api";
        this._forceRetreiveToken = apiUrl != this._config.get("apiUrl");
        if (this._forceRetreiveToken) this._config.set("apiUrl", apiUrl);
    }
    get hasTokenExpired() {
        let hasExpired = true;
        const tokenExpiration = new Date(this._config.get("AuthExpiration"));
        if (tokenExpiration) hasExpired = new Date() > tokenExpiration;
        return hasExpired;
    }
    retreiveToken() {
        const me = this;
        const authConfig = this._config.auth;
        if (me._forceRetreiveToken || me.hasTokenExpired) {
            pm.sendRequest({
                url: authConfig.issuer + "/.well-known/openid-configuration",
                method: 'GET',
                header: { 'Content-Type': 'application/x-www-form-urlencoded' }
            },
                function (err, res) {
                    if (!me.hasError(err)) {
                        pm.sendRequest(me.getTokenRequest(res.json()),
                            function (err, res) {
                                if (!me.hasError(err)) {
                                    const json = res.json();
                                    if (authConfig.auth_provider == "Internal") {
                                        if (json.expires_in && json.access_token) {
                                            const date = new Date();
                                            me._config.set("AuthExpiration", new Date(date.setTime(date.getTime() + json.expires_in * 1000)));
                                            me._config.set("AuthToken", json.access_token);
                                        } else me.hasError({ details: "No expires_in or access_token in response", response: res });
                                    } else if (authConfig.auth_provider == "Google") {
                                        if (json.id_token) {
                                            const date = new Date();
                                            me._config.set("AuthExpiration", new Date(date.setMinutes(date.getMinutes() + 9)));
                                            me._config.set("AuthToken", json.id_token);
                                        } else me.hasError({ details: "No id_token in response", response: res });
                                    }
                                }
                            }
                        );
                    }
                }
            );
        }
    }
    hasError(error) {
        if (error) {
            console.error({ Title: "Pre-request Script Authentication Error", Error: error });
            return true;
        }
        return false;
    }
    getTokenRequest(discoveryDoc) {
        const request = { url: discoveryDoc.token_endpoint, method: "POST", body: {}, header: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "PostmanRuntime/7.26.8" } };
        const config = this._config.auth;
        switch (config.auth_provider) {
            case "Internal":
                request.body = new QueryStringBuilder()
                    .append("grant_type", config.grant_type)
                    .append("username", config.user)
                    .append("password", config.password)
                    .append("scope", config.scope)
                    .append("client_id", config.client_id)
                    .append("client_secret", config.client_secret)
                    .build();
                break;
            case "Google":
                // https://developers.google.com/identity/protocols/oauth2/service-account#httprest
                const date = new Date();
                const header = { "alg": "RS256", "typ": "JWT" };
                const payload = {
                    "iss": config.client_email,
                    "scope": config.scope,
                    "aud": config.token_uri,
                    "exp": Math.floor(date.setHours(date.getHours() + 1) / 1000),
                    "iat": Math.floor(date / 1000)
                };
                request.body = new QueryStringBuilder()
                    .append("grant_type", config.grant_type)
                    .append("assertion", pmlib.jwtSign(config.private_key, payload, header, 600, 'RS256'))
                    .build();
                break;
        }
        return request;
    }
}
new AuthManager().retreiveToken();