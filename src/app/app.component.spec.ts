import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        MessageService,
        provideHttpClient(),
        provideHttpClientTesting(),
        DialogService,
      ],
    }).compileComponents();
  });

  it('Deve renderizar o componente router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const routerOutletDebugEl = fixture.debugElement.query(
      By.css('router-outlet')
    );

    expect(routerOutletDebugEl).toBeTruthy();
  });
});
