import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import {
  type ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { providePrimeNgConfig } from '@core/config/primeng.config';
import { DialogService } from 'primeng/dynamicdialog';
import { APP_ROUTES } from './app.routes';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideHttpClient(),
    providePrimeNgConfig(),
    provideAnimationsAsync(),
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: LOCALE_ID, useValue: 'pt' },
    DialogService,
  ],
};
