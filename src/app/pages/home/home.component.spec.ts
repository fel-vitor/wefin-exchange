import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { setupDefaultProviders } from '@testing/helpers/setup-test-bed';
import { TestHelper } from '@testing/helpers/test-helper';
import { FakeHomeComponent } from '@testing/mocks/fake-home.component';
import { DialogService } from 'primeng/dynamicdialog';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let testHelper: TestHelper<HomeComponent>;

  beforeEach(async () => {
    setupDefaultProviders();
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        DialogService,
      ],
    });

    await TestBed.compileComponents();

    TestBed.overrideComponent(HomeComponent, {
      remove: {
        imports: [HomeComponent],
      },
      add: {
        imports: [FakeHomeComponent],
      },
    });

    fixture = TestBed.createComponent(HomeComponent);
    testHelper = new TestHelper(fixture);

    fixture.detectChanges();
  });

  it('Deve renderizar o home-template', () => {
    testHelper.checkComponentExistence('wefin-home-template');
  });
});
