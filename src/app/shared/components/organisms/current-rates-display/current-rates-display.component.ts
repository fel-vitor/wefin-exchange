import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  type UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { InputNumberComponent } from '@shared/components/atoms/input-number/input-number.component';
import { InputSelectComponent } from '@shared/components/atoms/input-select/input-select.component';
import { CurrentRatesInformationCardComponent } from '@shared/components/molecules/current-rates-information-card/current-rates-information-card.component';
import { CURRENCY_OPTIONS } from '@shared/const/currency.constants';
import { BaseFormDirective } from '@shared/directives/base-form/base-form.directive';
import { notEqualValidator } from '@shared/helpers/validators';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import type { TransactionWithoutIdInterface } from '@shared/interfaces/transaction.model';
import { CurrencyRateService } from '@shared/services/currency-rate/currency-rate.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { delay, filter, finalize, first } from 'rxjs';
import { ConvertingDialogService } from '../dialogs/converting-dialog/services/converting-dialog.service';
import { CurrentRateEditDialogService } from '../dialogs/current-rate-edit-dialog/services/current-rate-edit-dialog.service';

@Component({
  selector: 'wefin-current-rates-display',
  imports: [
    CardModule,
    CurrentRatesInformationCardComponent,
    SkeletonModule,
    InputSelectComponent,
    InputNumberComponent,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './current-rates-display.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentRatesDisplayComponent
  extends BaseFormDirective
  implements OnInit
{
  private _currencyRateService = inject(CurrencyRateService);
  private _currentRateEditDialogService = inject(CurrentRateEditDialogService);
  private _formBuilder = inject(FormBuilder);
  private _convertingDialogService = inject(ConvertingDialogService);

  public isLoading = signal<boolean>(true);

  public currencyRateList = signal<CurrencyRateInterface[]>([]);

  override model: UntypedFormGroup = this._getModel();

  protected currencyOptions = signal(CURRENCY_OPTIONS);

  ngOnInit(): void {
    this.getCurrencyRates();
  }

  private _getModel() {
    return this._formBuilder.group(
      {
        fromCurrency: ['', Validators.required],
        toCurrency: ['', Validators.required],
        fromAmount: ['', [Validators.required, Validators.min(0)]],
      },
      { validators: [notEqualValidator('fromCurrency', 'toCurrency')] }
    );
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

  override submit(_params?: unknown): void {
    const modelData = this.model.getRawValue();

    const dto = {
      fromCurrency: modelData.fromCurrency.value,
      toCurrency: modelData.toCurrency.value,
      fromAmount: modelData.fromAmount,
    };

    this._convertingDialogService
      .show(dto as TransactionWithoutIdInterface, this.currencyRateList()[0])
      .pipe(first())
      .subscribe();
  }
}
