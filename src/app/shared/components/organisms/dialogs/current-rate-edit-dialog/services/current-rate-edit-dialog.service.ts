import { Injectable, inject } from '@angular/core';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import { DialogService } from 'primeng/dynamicdialog';
import type { Observable } from 'rxjs';
import { CurrentRateEditDialogComponent } from '../current-rate-edit-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CurrentRateEditDialogService {
  private _dialog = inject(DialogService);

  public show(
    currencyRate: CurrencyRateInterface
  ): Observable<CurrencyRateInterface> {
    const ref = this._dialog.open(CurrentRateEditDialogComponent, {
      data: {
        currencyRate,
      },
      showHeader: false,
    });

    return ref.onClose;
  }
}
