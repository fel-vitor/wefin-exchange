import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import type { TransactionInterface } from '@shared/interfaces/transaction.model';
import { CurrencyNameRatePipe } from '@shared/pipes/currency-name-rate/currency-name-rate.pipe';
import { MoneyPipe } from '@shared/pipes/currency-name-rate/money.pipe';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'wefin-transaction-history-detail',
  imports: [MoneyPipe, CurrencyNameRatePipe, DatePipe],
  templateUrl: './transaction-history-detail.component.html',
  styleUrl: './transaction-history-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionHistoryDetailComponent {
  private dialogRef = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);

  protected get transaction(): TransactionInterface {
    return this.dialogConfig.data as TransactionInterface;
  }
}
