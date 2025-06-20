import { TestBed } from '@angular/core/testing';
import { CurrencyEnum } from '@shared/enum/currency-type.enum';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import type {
  TransactionInterface,
  TransactionWithoutIdInterface,
} from '@shared/interfaces/transaction.model';
import { DialogService, type DynamicDialogRef } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { ConvertingDialogComponent } from '../converting-dialog.component';
import { ConvertingDialogService } from './converting-dialog.service';

describe('ConvertingDialogService', () => {
  let service: ConvertingDialogService;
  let dialogService: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConvertingDialogService,
        {
          provide: DialogService,
          useValue: {
            open: jest.fn(),
          },
        },
      ],
    });

    service = TestBed.inject(ConvertingDialogService);
    dialogService = TestBed.inject(DialogService);
  });

  it('Deve ser criado corretamente', () => {
    expect(service).toBeTruthy();
  });

  it('Deve abrir o dialog corretamente', () => {
    const mockTransaction: TransactionWithoutIdInterface = {
      fromCurrency: CurrencyEnum.OuroReal,
      toCurrency: CurrencyEnum.Tibar,
      fromAmount: 100,
      toAmount: 250,
      exchangeRate: 2.5,
      timestamp: '2025-06-20T00:00:00Z',
      status: 'COMPLETED',
    };

    const mockCurrencyRate: CurrencyRateInterface = {
      id: '1',
      fromCurrency: CurrencyEnum.OuroReal,
      toCurrency: CurrencyEnum.Tibar,
      rate: 2.5,
      lastUpdated: '2025-06-20T00:00:00Z',
    };

    const mockRef = {
      onClose: of({
        id: 'tx-1',
        ...mockTransaction,
      } as TransactionInterface),
    } as unknown as DynamicDialogRef;

    (dialogService.open as jest.Mock).mockReturnValue(mockRef);

    const result$ = service.show(mockTransaction, mockCurrencyRate);

    expect(dialogService.open).toHaveBeenCalledWith(ConvertingDialogComponent, {
      data: {
        transaction: mockTransaction,
        currencyRate: mockCurrencyRate,
      },
      showHeader: false,
    });

    result$.subscribe((result) => {
      expect(result).toEqual({
        id: 'tx-1',
        ...mockTransaction,
      });
    });
  });
});
