import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import type { Params } from '@angular/router';
import type { TransactionInterface } from '@shared/interfaces/transaction.model';
import { CurrencyNameRatePipe } from '@shared/pipes/currency-name-rate/currency-name-rate.pipe';
import { MoneyPipe } from '@shared/pipes/currency-name-rate/money.pipe';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'wefin-transaction-history-template',
  imports: [TableModule, DatePipe, MoneyPipe, CurrencyNameRatePipe],
  templateUrl: './transaction-history-template.component.html',
  styleUrl: './transaction-history-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionHistoryTemplateComponent {
  public transactionData = input.required<TransactionInterface[]>();

  public changeFilter = output<Params>();

  public changePage = output<Params>();

  protected onOpenDetail(transaction: TransactionInterface): void {
    console.log(transaction);
  }
}
