import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
  signal,
} from '@angular/core';
import { CurrentRatesInformationCardComponent } from '@shared/components/molecules/current-rates-information-card/current-rates-information-card.component';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import { CurrencyRateService } from '@shared/services/currency-rate/currency-rate.service';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { delay, filter, finalize, first } from 'rxjs';
import { CurrentRateEditDialogService } from '../dialogs/current-rate-edit-dialog/services/current-rate-edit-dialog.service';

@Component({
  selector: 'wefin-current-rates-display',
  imports: [CardModule, CurrentRatesInformationCardComponent, SkeletonModule],
  templateUrl: './current-rates-display.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentRatesDisplayComponent implements OnInit {
  private _currencyRateService = inject(CurrencyRateService);
  private _currentRateEditDialogService = inject(CurrentRateEditDialogService);

  public isLoading = signal<boolean>(true);

  public currencyRateList = signal<CurrencyRateInterface[]>([]);

  ngOnInit(): void {
    this.getCurrencyRates();
  }

  public getCurrencyRates() {
    this.isLoading.set(true);
    this._currencyRateService
      .getAll()
      .pipe(
        delay(500),
        first(),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (res) => {
          this.currencyRateList.set(res);
          this.isLoading.set(false);
        },
      });
  }

  public showEditDialog(currencyRate: CurrencyRateInterface) {
    this._currentRateEditDialogService
      .show(currencyRate)
      .pipe(
        first(),
        filter((res) => !!res)
      )
      .subscribe(() => {
        this.getCurrencyRates();
      });
  }
}
