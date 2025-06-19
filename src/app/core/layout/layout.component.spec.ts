import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TestHelper } from '@testing/helpers/test-helper';
import { FakeLayoutComponent } from '@testing/mocks/fake-layout.component';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let fixture: ComponentFixture<LayoutComponent>;
  let testHelper: TestHelper<LayoutComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    await TestBed.compileComponents();

    TestBed.overrideComponent(LayoutComponent, {
      remove: {
        imports: [LayoutComponent],
      },
      add: {
        imports: [FakeLayoutComponent],
      },
    });

    fixture = TestBed.createComponent(LayoutComponent);
    testHelper = new TestHelper(fixture);

    fixture.detectChanges();
  });

  it('Deve renderizar o componente do header', () => {
    testHelper.checkComponentExistence('wefin-header');
  });
});
