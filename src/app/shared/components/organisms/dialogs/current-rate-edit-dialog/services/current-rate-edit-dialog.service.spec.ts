import { TestBed } from '@angular/core/testing';
import { CurrencyEnum } from '@shared/enum/currency-type.enum';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import { DialogService, type DynamicDialogRef } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { CurrentRateEditDialogComponent } from '../current-rate-edit-dialog.component';
import { CurrentRateEditDialogService } from './current-rate-edit-dialog.service';

describe('CurrentRateEditDialogService', () => {
  let service: CurrentRateEditDialogService;
  let dialogService: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentRateEditDialogService,
        {
          provide: DialogService,
          useValue: {
            open: jest.fn(),
          },
        },
      ],
    });

    service = TestBed.inject(CurrentRateEditDialogService);
    dialogService = TestBed.inject(DialogService);
  });

  it('Deve ser criado corretamente', () => {
    expect(service).toBeTruthy();
  });

  it('Deve abrir o dialog corretamente', () => {
    const mockCurrencyRate: CurrencyRateInterface = {
      id: '1',
      fromCurrency: CurrencyEnum.OuroReal,
      toCurrency: CurrencyEnum.Tibar,
      rate: 5,
      lastUpdated: '2025-06-20T00:00:00Z',
    };

    const mockRef = {
      onClose: of(mockCurrencyRate),
    } as unknown as DynamicDialogRef;

    (dialogService.open as jest.Mock).mockReturnValue(mockRef);

    const result$ = service.show(mockCurrencyRate);

    expect(dialogService.open).toHaveBeenCalledWith(
      CurrentRateEditDialogComponent,
      {
        data: { currencyRate: mockCurrencyRate },
        showHeader: false,
      }
    );

    result$.subscribe((result) => {
      expect(result).toEqual(mockCurrencyRate);
    });
  });
});
