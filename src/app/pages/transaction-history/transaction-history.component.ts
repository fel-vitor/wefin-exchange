import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnDestroy,
  type OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import type { Params } from '@angular/router';
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
export class TransactionHistoryComponent implements OnInit, OnDestroy {
  private transactionsService = inject(TransactionsService);

  protected data = signal<TransactionInterface[]>([]);

  private transactionSubject$ = new ReplaySubject<void>(1);

  private filterParams = signal<Params | undefined>(undefined);

  protected dataAsync = toSignal(this.observableTransaction(), {
    initialValue: [],
  });

  ngOnInit(): void {
    this.transactionSubject$.next();
  }

  ngOnDestroy(): void {
    this.transactionSubject$.next();
    this.transactionSubject$.complete();
  }

  protected onChangeFilter(event: Params): void {
    this.filterParams.set(event);
    this.transactionSubject$.next();
  }

  private observableTransaction(): Observable<TransactionInterface[]> {
    return this.transactionSubject$
      .asObservable()
      .pipe(
        switchMap(() => this.transactionsService.getAll(this.filterParams()))
      );
  }
}
