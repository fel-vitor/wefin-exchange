import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { setupDefaultProviders } from '@testing/helpers/setup-test-bed';
import { TestHelper } from '@testing/helpers/test-helper';
import { FakeHomeTemplateComponent } from '@testing/mocks/fake-home-template.component';
import { DialogService } from 'primeng/dynamicdialog';
import { HomeTemplateComponent } from './home-template.component';

describe('HomeTemplateComponent', () => {
  let fixture: ComponentFixture<HomeTemplateComponent>;
  let testHelper: TestHelper<HomeTemplateComponent>;

  beforeEach(async () => {
    setupDefaultProviders();
    TestBed.configureTestingModule({
      imports: [HomeTemplateComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        DialogService,
      ],
    });

    await TestBed.compileComponents();

    TestBed.overrideComponent(HomeTemplateComponent, {
      remove: {
        imports: [HomeTemplateComponent],
      },
      add: {
        imports: [FakeHomeTemplateComponent],
      },
    });

    fixture = TestBed.createComponent(HomeTemplateComponent);
    testHelper = new TestHelper(fixture);

    fixture.detectChanges();
  });

  it('Deve renderizar o componente current-rates-display', () => {
    testHelper.checkComponentExistence('wefin-current-rates-display');
  });
});
