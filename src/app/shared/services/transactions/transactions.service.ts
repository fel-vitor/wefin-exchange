import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Params } from '@angular/router';
import type {
  TransactionInterface,
  TransactionWithoutIdInterface,
} from '@shared/interfaces/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private _http = inject(HttpClient);

  private readonly baseURI = '/api/transactions';

  getAll(filter?: Params) {
    const params = new HttpParams({ fromObject: filter });
    return this._http.get<TransactionInterface[]>(this.baseURI, { params });
  }

  getById(id: string) {
    return this._http.get<TransactionInterface>(`${this.baseURI}/${id}`);
  }

  post(payload: TransactionWithoutIdInterface) {
    return this._http.post<TransactionInterface>(`${this.baseURI}/`, payload);
  }

  private addLikeJsonServer(filters?: Params): Params {
    if (!filters) return {};

    return Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[`${key}_like`] = value;
      }
      return acc;
    }, {} as Record<string, any>);
  }
}
