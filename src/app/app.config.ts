import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import {  provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { headerInterceptor } from './core/interceptors/Header/header.interceptor';
export const appConfig: ApplicationConfig = {
   providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
   provideRouter(
    routes ,
    withInMemoryScrolling({
    scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
  })
 ),
 provideClientHydration(withEventReplay()),
     provideAnimations(),
    provideToastr({
      timeOut: 3000, 
      positionClass: 'toast-bottom-right', 
      progressBar: false,
      closeButton: true, 
      
    }),
    provideHttpClient(withFetch() , withInterceptors([loadingInterceptor , headerInterceptor])) ,
     importProvidersFrom(NgxSpinnerModule )
     
  ]
};
