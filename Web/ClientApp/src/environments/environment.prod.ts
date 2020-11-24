import { Injectable, Inject, InjectionToken } from '@angular/core';

export const environment = {
  production: true,
  baseUrl: 'https://em-web.azurewebsites.net',
  tokenUrl: 'https://em-web.azurewebsites.net',
  loginUrl: '/login',
  authProviders: [
    {
      name: "IdentityServer",
      enabled: true,
      baseUrl: 'https://em-web.azurewebsites.net',
      redirectUrl: 'https://em-web.azurewebsites.net/auth',
      responseType: null,
      clients: [{
        key: 'spa',
        name: 'Event Manager JS Resource Owner Password Client',
        clientId: 'urn:eventmanager:client:js:resourceowner',
        clientSecret: 'eventmanagersecret',
        scopes: ['openid', 'email', 'phone', 'profile', 'offline_access', 'roles', 'urn:eventmanager:api:gateway']
      }, {
        key: 'apidoc',
        name: 'Event Manager API Documentation',
        clientId: 'urn:eventmanager:client:apidoc',
        clientSecret: 'eventmanagersecret',
        scopes: ['openid']
      }],
      apiKey: 'eventmanagersecret'
    },
    {
      name: 'Google',
      enabled: true,
      baseUrl: 'https://accounts.google.com',
      redirectUrl: 'https://em-web.azurewebsites.net/auth',
      responseType: 'id_token token',
      clients: [{
        key: 'spa',
        name: 'Event Manager JS Implicit Client',
        clientId: '120435867455-8f37jhdhjbakph7qgvabporq6vmn0d98.apps.googleusercontent.com',
        clientSecret: 'wEbRb42VRLz10rDPnOYvrUtA',
        scopes: ['profile',
          'email',
          'openid',
          'phone']
      }, {
        key: 'apidoc',
        name: 'Event Manager API Documentation',
        clientId: 'em-apidoc@event-manager-295807.iam.gserviceaccount.com',
        clientSecret: 'a741458f8005c4ed19112518658ad19f607bceab',
        scopes: ['openid']
      }],
      apiKey: 'AIzaSyCYRgp-musYNVasda3WvECPKKnAW6XcCgg'
    }
  ]
};
