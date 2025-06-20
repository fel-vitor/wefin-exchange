import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CurrencyEnum } from '@shared/enum/currency-type.enum';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import { CurrencyRateService } from './currency-rate.service';

describe('CurrencyRateService', () => {
  let service: CurrencyRateService;
  let httpTestingController: HttpTestingController;

  const fakeCurrencyRate: CurrencyRateInterface = {
    id: '1',
    fromCurrency: CurrencyEnum.OuroReal,
    toCurrency: CurrencyEnum.Tibar,
    rate: 123.45,
    lastUpdated: '2025-06-19T16:09:55.000Z',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(CurrencyRateService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getAll() deve retornar uma lista de taxas', fakeAsync(() => {
    let result: CurrencyRateInterface[] | null = null;

    service.getAll().subscribe((tasks) => {
      result = tasks;
    });

    const request = httpTestingController.expectOne('/api/exchangeRates');

    const fakeResponse: CurrencyRateInterface[] = [
      fakeCurrencyRate,
      {
        ...fakeCurrencyRate,
        id: '2',
        fromCurrency: CurrencyEnum.Tibar,
        toCurrency: CurrencyEnum.OuroReal,
      },
    ];

    request.flush(fakeResponse);

    tick();

    expect(result).toEqual(fakeResponse);
  }));

  it('getById() deve retornar uma taxa', fakeAsync(() => {
    let result: CurrencyRateInterface | null = null;

    service.getById(fakeCurrencyRate.id).subscribe((task) => {
      result = task;
    });

    const request = httpTestingController.expectOne(
      `/api/exchangeRates/${fakeCurrencyRate.id}`
    );

    request.flush(fakeCurrencyRate);

    tick();

    expect(result).toEqual(fakeCurrencyRate);
  }));

  it('post() deve criar uma taxa', fakeAsync(() => {
    let result: CurrencyRateInterface | null = null;

    service.post(fakeCurrencyRate).subscribe((response) => {
      result = response;
    });

    const request = httpTestingController.expectOne((req) => {
      return req.method === 'POST' && req.url === `/api/exchangeRates/`;
    });

    request.flush(fakeCurrencyRate);

    tick();

    expect(result).toEqual(fakeCurrencyRate);
  }));

  it('put() deve editar uma taxa', fakeAsync(() => {
    let result: CurrencyRateInterface | null = null;

    service.put(fakeCurrencyRate.id, fakeCurrencyRate).subscribe((response) => {
      result = response;
    });

    const request = httpTestingController.expectOne((req) => {
      return (
        req.method === 'PUT' &&
        req.url === `/api/exchangeRates/${fakeCurrencyRate.id}`
      );
    });

    request.flush(fakeCurrencyRate);

    tick();

    expect(result).toEqual(fakeCurrencyRate);
  }));

  it('patch() deve atualizar uma taxa', fakeAsync(() => {
    let result: CurrencyRateInterface | null = null;

    service.patch(fakeCurrencyRate.id, { rate: 100 }).subscribe((response) => {
      result = response;
    });

    const request = httpTestingController.expectOne((req) => {
      return (
        req.method === 'PATCH' &&
        req.url === `/api/exchangeRates/${fakeCurrencyRate.id}`
      );
    });

    const fakeResponse = { ...fakeCurrencyRate, rate: 100 };

    request.flush(fakeResponse);

    tick();

    expect(result).toEqual(fakeResponse);
  }));

  it('delete() deve remover uma taxa', fakeAsync(() => {
    let result: CurrencyRateInterface | null = null;

    service.delete(fakeCurrencyRate.id).subscribe((response) => {
      result = response;
    });

    const request = httpTestingController.expectOne((req) => {
      return (
        req.method === 'DELETE' &&
        req.url === `/api/exchangeRates/${fakeCurrencyRate.id}`
      );
    });

    request.flush(fakeCurrencyRate);

    tick();

    expect(result).toEqual(fakeCurrencyRate);
  }));
});
