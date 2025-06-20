import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TransactionHistoryTemplateComponent } from '@shared/components/templates/transaction-history-template/transaction-history-template.component';
import type { TransactionInterface } from '@shared/interfaces/transaction.model';
import { TransactionsService } from '@shared/services/transactions/transactions.service';
import { type Observable, ReplaySubject, switchMap } from 'rxjs';

@Component({
  selector: 'wefin-transaction-history',
  imports: [TransactionHistoryTemplateComponent],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionHistoryComponent {
  private transactionsService = inject(TransactionsService);

  protected data = signal<TransactionInterface[]>([]);

  private transactionSubject$ = new ReplaySubject<void>(1);

  protected dataAsync = toSignal(this.observableTransaction(), {
    initialValue: [],
  });

  ngOnInit(): void {
    this.transactionSubject$.next();
    // this.transactionsService
    //   .getAll()
    //   .pipe(take(1))
    //   .subscribe({
    //     next: (response) => {
    //       this.data.set(response);
    //       console.log(response);
    //     },
    //   });
  }

  private observableTransaction(): Observable<TransactionInterface[]> {
    return this.transactionSubject$
      .asObservable()
      .pipe(switchMap(() => this.transactionsService.getAll()));
  }
}
