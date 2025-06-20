import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
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

  getAll() {
    return this._http.get<TransactionInterface[]>(this.baseURI);
  }

  getById(id: string) {
    return this._http.get<TransactionInterface>(`${this.baseURI}/${id}`);
  }

  post(payload: TransactionWithoutIdInterface) {
    return this._http.post<TransactionInterface>(`${this.baseURI}/`, payload);
  }
}
