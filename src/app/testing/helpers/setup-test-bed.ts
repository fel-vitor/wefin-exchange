// setup-test-bed.ts

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

export function setupDefaultProviders(): void {
  TestBed.configureTestingModule({
    providers: [
      MessageService,
      DialogService,
      provideHttpClient(),
      provideHttpClientTesting(),
      { provide: DynamicDialogRef, useValue: { close: jest.fn() } },
      { provide: DynamicDialogConfig, useValue: {} },
    ],
  });
}
