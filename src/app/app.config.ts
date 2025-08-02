import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { tokenInterceptor } from './interceptor/token-interceptor';

import { routes } from './app.routes';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
    withInterceptors([tokenInterceptor])
    ),
    provideHttpClient(),
    provideAnimationsAsync()
  ]
};
