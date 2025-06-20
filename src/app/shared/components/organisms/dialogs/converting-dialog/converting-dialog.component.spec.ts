import { type ComponentFixture, TestBed } from '@angular/core/testing';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import type { TransactionWithoutIdInterface } from '@shared/interfaces/transaction.model';
import { TransactionsService } from '@shared/services/transactions/transactions.service';
import { setupDefaultProviders } from '@testing/helpers/setup-test-bed';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { ConvertingDialogComponent } from './converting-dialog.component';

describe('ConvertingDialogComponent', () => {
  let component: ConvertingDialogComponent;
  let fixture: ComponentFixture<ConvertingDialogComponent>;
  let transactionsService: TransactionsService;

  const mockTransaction: TransactionWithoutIdInterface = {
    fromCurrency: 'OURO_REAL',
    toCurrency: 'TIBAR',
    fromAmount: 100,
    toAmount: 250,
    exchangeRate: 2.5,
    timestamp: '2025-06-20T00:00:00Z',
    status: 'COMPLETED',
  };

  const mockCurrencyRate: CurrencyRateInterface = {
    id: '1',
    fromCurrency: 'OURO_REAL',
    toCurrency: 'TIBAR',
    rate: 2.5,
    lastUpdated: '2025-06-20T00:00:00Z',
  };

  beforeEach(() => {
    setupDefaultProviders();

    TestBed.configureTestingModule({
      imports: [ConvertingDialogComponent],
      providers: [
        MessageService,
        {
          provide: TransactionsService,
          useValue: {
            post: jest
              .fn()
              .mockReturnValue(of({ id: 'tx-1', ...mockTransaction })),
          },
        },
        {
          provide: DynamicDialogRef,
          useValue: {
            close: jest.fn(),
          },
        },
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {
              transaction: mockTransaction,
              currencyRate: mockCurrencyRate,
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConvertingDialogComponent);
    component = fixture.componentInstance;
    transactionsService = TestBed.inject(TransactionsService);

    fixture.detectChanges();
  });

  it('Deve ser criado corretamente', () => {
    expect(component).toBeTruthy();
  });

  it('Deve calcular corretamente o toAmount e exchangeRate no ngOnInit', () => {
    expect(component.exchangeRate()).toBe(2.5);
    expect(component.toAmount()).toBe(250);
  });

  it('Deve chamar o TransactionsService.post ao confirmar', () => {
    const spy = jest.spyOn(transactionsService, 'post');

    component.confirm();

    expect(spy).toHaveBeenCalledWith({
      fromCurrency: mockTransaction.fromCurrency,
      toCurrency: mockTransaction.toCurrency,
      fromAmount: mockTransaction.fromAmount,
      toAmount: 250,
      exchangeRate: 2.5,
      timestamp: expect.any(String),
      status: 'COMPLETED',
    });
  });
});
