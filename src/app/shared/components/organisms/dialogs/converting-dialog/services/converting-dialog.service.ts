import { Injectable, inject } from '@angular/core';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import type {
  TransactionInterface,
  TransactionWithoutIdInterface,
} from '@shared/interfaces/transaction.model';
import { DialogService } from 'primeng/dynamicdialog';
import type { Observable } from 'rxjs';
import { ConvertingDialogComponent } from '../converting-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConvertingDialogService {
  private _dialog = inject(DialogService);

  public show(
    transaction: TransactionWithoutIdInterface,
    currencyRate: CurrencyRateInterface
  ): Observable<TransactionInterface> {
    const ref = this._dialog.open(ConvertingDialogComponent, {
      data: {
        transaction,
        currencyRate,
      },
      showHeader: false,
    });

    return ref.onClose;
  }
}
