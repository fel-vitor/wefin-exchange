import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
  signal,
} from '@angular/core';
import { DialogContentComponent } from '@shared/components/molecules/dialog-content/dialog-content.component';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import type { TransactionWithoutIdInterface } from '@shared/interfaces/transaction.model';
import { CurrencyNameRatePipe } from '@shared/pipes/currency-name-rate/currency-name-rate.pipe';
import { MoneyPipe } from '@shared/pipes/money/money.pipe';
import { TransactionsService } from '@shared/services/transactions/transactions.service';
import { getExchangeRate } from '@shared/utils/calculate.utils';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { delay, finalize, first } from 'rxjs';

@Component({
  selector: 'wefin-converting-dialog',
  standalone: true,
  imports: [
    DialogContentComponent,
    ButtonModule,
    CurrencyNameRatePipe,
    MoneyPipe,
  ],
  templateUrl: './converting-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConvertingDialogComponent implements OnInit {
  private _messageService = inject(MessageService);
  private _dialogRef = inject(DynamicDialogRef);
  private _config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private _transactionsService = inject(TransactionsService);

  protected loadingRequest = signal<boolean>(false);

  protected transaction = signal<TransactionWithoutIdInterface>(
    this._config.data?.transaction
  );

  protected currencyRate = signal<CurrencyRateInterface>(
    this._config.data?.currencyRate
  );

  public toAmount = signal<number>(0);
  public exchangeRate = signal<number>(0);

  ngOnInit(): void {
    const rate = getExchangeRate(
      this.transaction().fromCurrency,
      this.transaction().toCurrency,
      this.currencyRate()
    );

    this.exchangeRate.set(rate);

    const result = this.transaction().fromAmount * rate;
    this.toAmount.set(+result.toFixed(2));
  }

  protected closeDialog(): void {
    this._dialogRef.close();
  }

  public confirm(): void {
    this.loadingRequest.set(true);

    const payload: TransactionWithoutIdInterface = {
      fromCurrency: this.transaction().fromCurrency,
      toCurrency: this.transaction().toCurrency,
      fromAmount: this.transaction().fromAmount,
      toAmount: this.toAmount(),
      exchangeRate: this.exchangeRate(),
      timestamp: new Date().toISOString(),
      status: 'COMPLETED',
    };

    this._transactionsService
      .post(payload)
      .pipe(
        delay(500),
        first(),
        finalize(() => this.loadingRequest.set(false))
      )
      .subscribe({
        next: (res) => {
          this._messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Transação realizada com sucesso!',
          });
          this._dialogRef.close(res);
        },
        error: () => {
          this._messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao processar a transação.',
          });
        },
      });
  }
}
