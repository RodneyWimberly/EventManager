import { AppModule } from '../app/app.module';
import { Injectable, Inject, InjectionToken } from '@angular/core';


// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://localhost:5001', // Change this to the address of your backend API if different from frontend address
  tokenUrl: 'https://localhost:5001', // For IdentityServer/Authorization Server API. You can set to null if same as baseUrl
  loginUrl: '/login',
  authProviders: [
    {
      name: "IdentityServer",
      enabled: true,
      baseUrl: 'https://localhost:5001',
      redirectUrl: 'https://localhost:5001/auth',
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
      redirectUrl: 'https://localhost:5001/auth',
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
        scopes: ['openid'],
      }],
      apiKey: 'AIzaSyCYRgp-musYNVasda3WvECPKKnAW6XcCgg'
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
