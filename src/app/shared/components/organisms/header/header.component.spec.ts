import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { TestHelper } from '@testing/helpers/test-helper';
import { FakeHeaderComponent } from '@testing/mocks/fake-header.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let testHelper: TestHelper<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    });

    await TestBed.compileComponents();

    TestBed.overrideComponent(HeaderComponent, {
      remove: {
        imports: [HeaderComponent],
      },
      add: {
        imports: [FakeHeaderComponent],
      },
    });

    fixture = TestBed.createComponent(HeaderComponent);
    testHelper = new TestHelper(fixture);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('Deve renderizar o componente do tab-switch', () => {
    expect(fixture.debugElement.query(By.css('wefin-tab-switch'))).toBeTruthy();
  });
});
