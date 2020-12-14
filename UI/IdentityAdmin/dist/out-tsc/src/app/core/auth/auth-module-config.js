import { environment } from '@env/environment';
export const authModuleConfig = {
    resourceServer: {
        allowedUrls: [environment.ResourceServer],
        sendAccessToken: true
    }
};
//# sourceMappingURL=auth-module-config.js.map