import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CurrencyEnum } from '@shared/enum/currency-type.enum';
import type {
  TransactionInterface,
  TransactionWithoutIdInterface,
} from '@shared/interfaces/transaction.model';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TransactionsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll() deve retornar uma lista de transações', fakeAsync(() => {
    let result: TransactionInterface[] | null = null;

    service.getAll().subscribe((tasks) => {
      result = tasks;
    });

    const request = httpTestingController.expectOne('/api/transactions');

    const fakeTransactions: TransactionInterface[] = [
      {
        id: 'TXN-001',
        fromCurrency: CurrencyEnum.OuroReal,
        toCurrency: CurrencyEnum.Tibar,
        fromAmount: 100,
        toAmount: 250,
        exchangeRate: 2.5,
        timestamp: '2024-06-18T09:30:00Z',
        date: '2024-06-18',
        status: 'COMPLETED',
      },
      {
        id: 'TXN-002',
        fromCurrency: CurrencyEnum.Tibar,
        toCurrency: CurrencyEnum.OuroReal,
        fromAmount: 500,
        toAmount: 200,
        exchangeRate: 0.4,
        timestamp: '2024-06-18T08:15:00Z',
        date: '2024-06-18',
        status: 'COMPLETED',
      },
    ];

    request.flush(fakeTransactions);

    tick();

    expect(result).toEqual(fakeTransactions);
  }));

  it('getById() deve retornar uma transação', fakeAsync(() => {
    const fakeTransactions: TransactionInterface = {
      id: 'TXN-001',
      fromCurrency: CurrencyEnum.OuroReal,
      toCurrency: CurrencyEnum.Tibar,
      fromAmount: 100,
      toAmount: 250,
      exchangeRate: 2.5,
      timestamp: '2024-06-18T09:30:00Z',
      date: '2024-06-18',
      status: 'COMPLETED',
    };

    let result: TransactionInterface | null = null;

    service
      .getById(fakeTransactions.id)
      .subscribe((task: TransactionInterface) => {
        result = task;
      });

    const request = httpTestingController.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === `/api/transactions/${fakeTransactions.id}`
      );
    });

    request.flush(fakeTransactions);

    tick();

    expect(result).toEqual(fakeTransactions);
  }));

  it('post() deve criar uma transação', fakeAsync(() => {
    const fakeTransaction: TransactionWithoutIdInterface = {
      fromCurrency: CurrencyEnum.OuroReal,
      toCurrency: CurrencyEnum.Tibar,
      fromAmount: 100,
      toAmount: 250,
      exchangeRate: 2.5,
      timestamp: '2024-06-18T09:30:00Z',
      date: '2024-06-18',
      status: 'COMPLETED',
    };

    let result: TransactionInterface | null = null;

    service.post(fakeTransaction).subscribe((response) => {
      result = response;
    });

    const request = httpTestingController.expectOne((req) => {
      return req.method === 'POST' && req.url === '/api/transactions/';
    });

    const reponse: TransactionInterface = { ...fakeTransaction, id: '1' };

    request.flush(reponse);

    tick();

    expect(result).toEqual(reponse);
  }));
});
