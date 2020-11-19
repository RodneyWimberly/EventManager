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
      clients: [{
        name: 'Event Manager Web',
        clientId: '3e165187-600d-4666-a483-51badf3040b3',
        clientSecret: 'not_used',
        scopes: ['openid', 'email', 'phone', 'profile', 'offline_access', 'roles', 'api://eventmanager.org']
      }, {
        name: 'Event Manager API Documentation',
        clientId: '2795884e-cff1-4a73-823f-0120373ac584',
        clientSecret: 'not_used',
        scopes: ['openid']
      }],
      apiUri: 'api://eventmanager.org'
    },
    {
      name: 'Google',
      enabled: true,
      baseUrl: 'https://accounts.google.com',
      redirectUrl: 'https://em-web.azurewebsites.net/auth',
      clients: [{
        name: 'Event Manager Web',
        clientId: '120435867455-8f37jhdhjbakph7qgvabporq6vmn0d98.apps.googleusercontent.com',
        clientSecret: 'wEbRb42VRLz10rDPnOYvrUtA',
        scopes: ['profile',
          'email',
          'openid',
          'phone']
      }, {
        name: 'Event Manager API Documentation',
        clientId: '2795884e-cff1-4a73-823f-0120373ac584',
        clientSecret: 'not_used',
        scopes: ['openid'],
      }],
      apiUri: 'api://eventmanager.org'
    }
  ]
};
