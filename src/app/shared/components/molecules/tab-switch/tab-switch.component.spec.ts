import { Location } from '@angular/common';
import {
  type ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TestHelper } from '@testing/helpers/test-helper';
import { FakeHostComponent } from '@testing/mocks/fake-host.component';
import { FakeTabSwitchComponent } from '@testing/mocks/fake-tab-switch.component';
import { TabSwitchComponent } from './tab-switch.component';

describe('TabSwitchComponent', () => {
  let fixture: ComponentFixture<TabSwitchComponent>;
  let testHelper: TestHelper<TabSwitchComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TabSwitchComponent],
      providers: [
        provideRouter([
          {
            path: 'fake-first-route',
            component: FakeHostComponent,
          },
          {
            path: 'fake-second-route',
            component: FakeHostComponent,
          },
        ]),
      ],
    });

    await TestBed.compileComponents();

    TestBed.overrideComponent(TabSwitchComponent, {
      remove: {
        imports: [TabSwitchComponent],
      },
      add: {
        imports: [FakeTabSwitchComponent],
      },
    });

    fixture = TestBed.createComponent(TabSwitchComponent);
    testHelper = new TestHelper(fixture);

    fixture.componentRef.setInput('firstLabel', 'Fake First Label');
    fixture.componentRef.setInput('firstRoute', '/fake-first-route');
    fixture.componentRef.setInput('secondLabel', 'Fake Second Label');
    fixture.componentRef.setInput('secondRoute', '/fake-second-route');

    fixture.detectChanges();
  });

  it('Deve renderizar o primeiro link', () => {
    expect(testHelper.queryByTestId('link-first')).toBeTruthy();
  });

  it('Deve renderizar o segundo link', () => {
    expect(testHelper.queryByTestId('link-second')).toBeTruthy();
  });

  it('Deve renderizar o label corretamente', () => {
    const firstLabel = testHelper.getTextContentByTestId('link-first');
    const secondLabel = testHelper.getTextContentByTestId('link-second');

    expect(firstLabel).toEqual('Fake First Label');
    expect(secondLabel).toBe('Fake Second Label');
  });

  it('Deve redirecionar para a rota do primeiro link', fakeAsync(() => {
    const location = TestBed.inject(Location);

    expect(location.path()).toBe('');

    testHelper.click('link-first');

    tick();

    expect(location.path()).toBe('/fake-first-route');
  }));

  it('Deve redirecionar para a rota do segundo link', fakeAsync(() => {
    const location = TestBed.inject(Location);

    expect(location.path()).toBe('');

    testHelper.click('link-second');

    tick();

    expect(location.path()).toBe('/fake-second-route');
  }));
});
