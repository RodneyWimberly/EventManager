import { Claim } from './claim.model';
export class ClientSecret {
    constructor() {
        this.hashType = 0;
    }
}
export class Subject {
}
export class ClientClaim extends Claim {
}
export class KeyValuePair {
}
export class ClientProperty {
}
export class NewClient {
}
export class Client {
    static isValid(client, errors) {
        errors.length = 0;
        if (client.allowedGrantTypes == null || client.allowedGrantTypes.length <= 0) {
            errors.push("Invalid Grant Types");
        }
        // spaces are not allowed in grant types
        client.allowedGrantTypes.forEach(grant => {
            if (grant.indexOf(' ') >= 0) {
                errors.push("Grant types cannot contain spaces");
            }
        });
        // single grant type, seems to be fine
        if (client.allowedGrantTypes.length == 1)
            return true;
        // would allow response_type downgrade attack from code to token
        Client.findGrantTypes('implicit', 'authorization_code', client.allowedGrantTypes, errors);
        Client.findGrantTypes('implicit', 'hybrid', client.allowedGrantTypes, errors);
        Client.findGrantTypes('authorization_code', 'hybrid', client.allowedGrantTypes, errors);
        return errors.length <= 0;
    }
    static findGrantTypes(grantA, grantB, grants, errors) {
        if (grants.find(g => g == grantA) != null && grants.find(g => g == grantB) != null)
            errors.push(`Grant types list cannot contain both ${grantA} and ${grantB}`);
    }
}
//# sourceMappingURL=client.model.js.map