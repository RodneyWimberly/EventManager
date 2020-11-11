import { Injectable, Inject, InjectionToken } from '@angular/core';

export const environment = {
    production: false,
  baseUrl: 'https://em-webui.azurewebsites.net', // Change this to the address of your backend API if different from frontend address
  tokenUrl: 'https://em-webui.azurewebsites.net', // For IdentityServer/Authorization Server API. You can set to null if same as baseUrl
    loginUrl: '/login'
};
