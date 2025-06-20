import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { setupDefaultProviders } from '@testing/helpers/setup-test-bed';
import { CurrentRatesDisplayComponent } from './current-rates-display.component';

describe('CurrentRatesDisplayComponent', () => {
  let component: CurrentRatesDisplayComponent;
  let fixture: ComponentFixture<CurrentRatesDisplayComponent>;

  beforeEach(async () => {
    setupDefaultProviders();
    await TestBed.configureTestingModule({
      imports: [CurrentRatesDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentRatesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
