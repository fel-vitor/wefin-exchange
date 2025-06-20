import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyRateService {
  private _http = inject(HttpClient);

  private readonly baseURI = '/api/exchangeRates';

  getAll() {
    return this._http.get<CurrencyRateInterface[]>(this.baseURI);
  }

  getById(id: string) {
    return this._http.get<CurrencyRateInterface>(`${this.baseURI}/${id}`);
  }

  post(payload: CurrencyRateInterface) {
    return this._http.post<CurrencyRateInterface>(`${this.baseURI}/`, payload);
  }

  put(id: string, payload: CurrencyRateInterface) {
    return this._http.put<CurrencyRateInterface>(
      `${this.baseURI}/${id}`,
      payload
    );
  }

  patch(id: string, payload: Partial<CurrencyRateInterface>) {
    return this._http.patch<CurrencyRateInterface>(
      `${this.baseURI}/${id}`,
      payload
    );
  }

  delete(id: string) {
    return this._http.delete<CurrencyRateInterface>(`${this.baseURI}/${id}`);
  }
}
