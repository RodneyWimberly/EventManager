export class MenuItem {
    constructor() { }
}
const Home = {
    text: "Home",
    link: "/home",
    icon: "icon-home",
    lightVersion: false
};
const Settings = {
    translate: "menu.settings",
    link: "/settings",
    icon: "icon-cup",
    lightVersion: false
};
const Clients = {
    translate: "general.clients",
    link: "/clients",
    icon: "fa fa-desktop",
    lightVersion: true,
    submenu: [
        {
            text: "List",
            translate: "general.list",
            link: "/clients"
        },
        {
            text: "Add",
            translate: "general.add",
            link: "/clients/add"
        }
    ]
};
const IdentityResource = {
    translate: "general.identity-resource",
    link: "/identity-resource",
    icon: "far fa-id-card",
    lightVersion: true,
    submenu: [
        {
            text: "List",
            translate: "general.list",
            link: "/identity-resource"
        },
        {
            text: "Add",
            translate: "general.add",
            link: "/identity-resource/add"
        }
    ]
};
const ApiResource = {
    translate: "general.api-resource",
    link: "/api-resource",
    icon: "fas fa-cloud",
    lightVersion: true,
    submenu: [
        {
            text: "List",
            translate: "general.list",
            link: "/api-resource"
        },
        {
            text: "Add",
            translate: "general.add",
            link: "/api-resource/add"
        }
    ]
};
const PersistedGrants = {
    translate: "general.persisted-grants",
    link: "/persisted-grants",
    icon: "fas fa-key",
    lightVersion: true
};
const Users = {
    translate: "menu.users",
    link: "/users",
    icon: "fas fa-users-cog",
    submenu: [
        {
            text: "List",
            translate: "general.list",
            link: "/users"
        },
        {
            text: "Add",
            translate: "general.add",
            link: "/users/add"
        }
    ],
    lightVersion: false
};
const Roles = {
    translate: "menu.roles",
    link: "/roles",
    icon: "fas fa-user-tag",
    submenu: [
        {
            text: "List",
            translate: "general.list",
            link: "/roles"
        },
        {
            text: "Add",
            translate: "general.add",
            link: "/roles/add"
        }
    ],
    lightVersion: false
};
const Emails = {
    translate: "general.emails",
    link: "/emails",
    icon: "fas fa-envelope-open-text",
    submenu: [
        {
            translate: "general.edit",
            link: "/emails"
        }
        // ,{
        //     translate: "menu.email-template",
        //     link: "/emails/templates"
        // }
    ],
    lightVersion: false
};
const Events = {
    translate: "general.events",
    link: "/events",
    icon: "far fa-save",
    lightVersion: false
};
const headingMain = {
    text: "IdentityServer4",
    heading: true,
    lightVersion: true,
};
const headingUsers = {
    translate: "menu.users",
    heading: true,
    lightVersion: false
};
const headingSettings = {
    translate: "menu.ssoSettings",
    heading: true,
    lightVersion: false
};
export const menu = [
    headingMain,
    Home,
    Clients,
    IdentityResource,
    ApiResource,
    PersistedGrants,
    headingUsers,
    Users,
    Roles,
    headingSettings,
    Events,
    Emails,
    Settings
];
//# sourceMappingURL=menu.js.map