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
  clientId: '3e165187-600d-4666-a483-51badf3040b3',
  clientSecret: 'not_used',
  docId: '2795884e-cff1-4a73-823f-0120373ac584',
  docSecret: 'not_used',
  apiId: '3f9d64e1-675f-43d3-be3b-fe06c01d14d3',
  apiSecret: 'not_used'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
