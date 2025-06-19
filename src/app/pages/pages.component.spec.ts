import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LayoutComponent } from '@core/layout/layout.component';
import { FakeLayoutComponent } from '@testing/mocks/fake-layout.component';
import { PagesComponent } from './pages.component';

describe('PagesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesComponent],
    }).compileComponents();

    TestBed.overrideComponent(PagesComponent, {
      remove: {
        imports: [LayoutComponent],
      },
      add: {
        imports: [FakeLayoutComponent],
      },
    });
  });

  it('Deve renderizar o componente layout', () => {
    const fixture = TestBed.createComponent(PagesComponent);

    const headerDebugEl = fixture.debugElement.query(By.css('wefin-layout'));

    expect(headerDebugEl).toBeTruthy();
  });
});
