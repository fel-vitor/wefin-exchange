import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import type { Params } from '@angular/router';
import { TransactionHistoryDetailComponent } from '@shared/components/organisms/dialogs/transaction-history-detail/transaction-history-detail.component';
import type { TransactionInterface } from '@shared/interfaces/transaction.model';
import { CurrencyNameRatePipe } from '@shared/pipes/currency-name-rate/currency-name-rate.pipe';
import { MoneyPipe } from '@shared/pipes/currency-name-rate/money.pipe';
import { DialogService } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'wefin-transaction-history-template',
  imports: [TableModule, DatePipe, MoneyPipe, CurrencyNameRatePipe],
  templateUrl: './transaction-history-template.component.html',
  styleUrl: './transaction-history-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionHistoryTemplateComponent {
  private dialogService = inject(DialogService);

  public transactionData = input.required<TransactionInterface[]>();

  public changeFilter = output<Params>();

  public changePage = output<Params>();

  constructor() {
    effect(() => {
      const data = this.transactionData();
      if (data.length > 0) this.onOpenDetail(data[0]);
    });
  }

  protected onOpenDetail(transaction: TransactionInterface): void {
    this.dialogService.open(TransactionHistoryDetailComponent, {
      data: transaction,
      closable: true,
    });
  }
}
