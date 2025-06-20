import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import { CurrencyRateService } from './currency-rate.service';

describe('CurrencyRateService', () => {
  let service: CurrencyRateService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CurrencyRateService);

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('getAll() deve retornar uma lista de taxas', fakeAsync(() => {
    let result: CurrencyRateInterface[] | null = null;

    service.getAll().subscribe((tasks) => {
      result = tasks;
    });

    const request = httpTestingController.expectOne('/api/exchangeRates');

    const fakefakeCurrencyRate: CurrencyRateInterface[] = [
      {
        id: '1',
        fromCurrency: 'OURO_REAL',
        toCurrency: 'TIBAR',
        rate: 123.45,
        lastUpdated: '2025-06-19T16:09:55.000Z',
      },
      {
        id: '2',
        fromCurrency: 'TIBAR',
        toCurrency: 'OURO_REAL',
        rate: 123.45,
        lastUpdated: '2025-06-19T16:09:55.000Z',
      },
    ];

    request.flush(fakefakeCurrencyRate);

    tick();

    expect(result).toEqual(fakefakeCurrencyRate);
  }));

  it('patch() deve atualizar uma taxa', fakeAsync(() => {
    const fakefakeCurrencyRate: CurrencyRateInterface = {
      id: '1',
      fromCurrency: 'OURO_REAL',
      toCurrency: 'TIBAR',
      rate: 123.45,
      lastUpdated: '2025-06-19T16:09:55.000Z',
    };
    let result: CurrencyRateInterface | null = null;

    service
      .patch(fakefakeCurrencyRate.id, {
        rate: 100,
        lastUpdated: '2025-06-19T16:09:55.000Z',
      })
      .subscribe((response) => {
        result = response;
      });

    const request = httpTestingController.expectOne((req) => {
      return req.method === 'PATCH' && req.url === '/api/exchangeRates/1';
    });

    const fakeResponse = {
      ...fakefakeCurrencyRate,
      rate: 100,
      lastUpdated: '2025-06-19T16:09:55.000Z',
    };

    request.flush(fakeResponse);

    tick();

    expect(result).toEqual(fakeResponse);
  }));

  it('put() deve editar uma taxa', fakeAsync(() => {
    const fakefakeCurrencyRate: CurrencyRateInterface = {
      id: '1',
      fromCurrency: 'OURO_REAL',
      toCurrency: 'TIBAR',
      rate: 123.45,
      lastUpdated: '2025-06-19T16:09:55.000Z',
    };

    let result: CurrencyRateInterface | null = null;

    service
      .put(fakefakeCurrencyRate.id, fakefakeCurrencyRate)
      .subscribe((response) => {
        result = response;
      });

    const request = httpTestingController.expectOne((req) => {
      return (
        req.method === 'PUT' &&
        req.url === `/api/exchangeRates/${fakefakeCurrencyRate.id}`
      );
    });

    request.flush(fakefakeCurrencyRate);

    tick();

    expect(result).toEqual(fakefakeCurrencyRate);
  }));

  it('getById() deve retornar uma taxa', fakeAsync(() => {
    const fakefakeCurrencyRate: CurrencyRateInterface = {
      id: '1',
      fromCurrency: 'OURO_REAL',
      toCurrency: 'TIBAR',
      rate: 123.45,
      lastUpdated: '2025-06-19T16:09:55.000Z',
    };

    let result: CurrencyRateInterface | null = null;

    service
      .getById(fakefakeCurrencyRate.id)
      .subscribe((task: CurrencyRateInterface) => {
        result = task;
      });

    const request = httpTestingController.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === `/api/exchangeRates/${fakefakeCurrencyRate.id}`
      );
    });

    request.flush(fakefakeCurrencyRate);

    tick();

    expect(result).toEqual(fakefakeCurrencyRate);
  }));
});
