import {
  type ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { CurrencyEnum } from '@shared/enum/currency-type.enum';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import { CurrencyRateService } from '@shared/services/currency-rate/currency-rate.service';
import { setupDefaultProviders } from '@testing/helpers/setup-test-bed';
import { TestHelper } from '@testing/helpers/test-helper';
import { of } from 'rxjs';
import { ConvertingDialogService } from '../dialogs/converting-dialog/services/converting-dialog.service';
import { CurrentRateEditDialogService } from '../dialogs/current-rate-edit-dialog/services/current-rate-edit-dialog.service';
import { CurrentRatesDisplayComponent } from './current-rates-display.component';

describe('CurrentRatesDisplayComponent', () => {
  let fixture: ComponentFixture<CurrentRatesDisplayComponent>;
  let component: CurrentRatesDisplayComponent;
  let testHelper: TestHelper<CurrentRatesDisplayComponent>;

  let currencyRateService: jest.Mocked<CurrencyRateService>;
  let currentRateEditDialogService: jest.Mocked<CurrentRateEditDialogService>;
  let convertingDialogService: jest.Mocked<ConvertingDialogService>;

  const mockCurrencyRate: CurrencyRateInterface = {
    id: '1',
    fromCurrency: CurrencyEnum.OuroReal,
    toCurrency: CurrencyEnum.Tibar,
    rate: 5,
    lastUpdated: '2024-01-01',
  };

  beforeEach(async () => {
    setupDefaultProviders();
    await TestBed.configureTestingModule({
      imports: [CurrentRatesDisplayComponent],
      providers: [
        {
          provide: CurrencyRateService,
          useValue: {
            getAll: jest.fn().mockReturnValue(of([mockCurrencyRate])),
          },
        },
        {
          provide: CurrentRateEditDialogService,
          useValue: {
            show: jest.fn().mockReturnValue(of(true)),
          },
        },
        {
          provide: ConvertingDialogService,
          useValue: {
            show: jest.fn().mockReturnValue(of(true)),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentRatesDisplayComponent);
    component = fixture.componentInstance;
    testHelper = new TestHelper(fixture);

    currencyRateService = TestBed.inject(
      CurrencyRateService
    ) as jest.Mocked<CurrencyRateService>;
    currentRateEditDialogService = TestBed.inject(
      CurrentRateEditDialogService
    ) as jest.Mocked<CurrentRateEditDialogService>;
    convertingDialogService = TestBed.inject(
      ConvertingDialogService
    ) as jest.Mocked<ConvertingDialogService>;

    fixture.detectChanges();
  });

  it('deve criar corretamente', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir o diálogo de edição e atualizar a lista', fakeAsync(() => {
    const spy = jest.spyOn(component, 'getCurrencyRates');

    tick(500);
    fixture.detectChanges();

    component.showEditDialog(mockCurrencyRate);
    tick();

    expect(currentRateEditDialogService.show).toHaveBeenCalledWith(
      mockCurrencyRate
    );
    expect(spy).toHaveBeenCalled();
  }));

  it('deve validar que moedas diferentes não disparam erro de notEqual', () => {
    component.model.setValue({
      fromCurrency: CurrencyEnum.OuroReal,
      toCurrency: CurrencyEnum.Tibar,
      fromAmount: 100,
    });

    component.model.updateValueAndValidity();

    expect(component.model.errors).toBeNull();
  });

  it('deve validar que moedas iguais disparam erro de notEqual', () => {
    component.model.setValue({
      fromCurrency: CurrencyEnum.OuroReal,
      toCurrency: CurrencyEnum.OuroReal,
      fromAmount: 100,
    });

    component.model.updateValueAndValidity();

    expect(component.model.errors).toEqual({ notEqual: true });
  });
});
