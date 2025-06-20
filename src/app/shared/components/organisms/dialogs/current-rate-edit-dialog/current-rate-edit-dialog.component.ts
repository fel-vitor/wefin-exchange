import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { ToastInterface } from '@core/interfaces/toats.model';
import { InputNumberComponent } from '@shared/components/atoms/input-number/input-number.component';
import { InputTextComponent } from '@shared/components/atoms/input-text/input-text.component';
import { DialogContentComponent } from '@shared/components/molecules/dialog-content/dialog-content.component';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import { CurrencyNameRatePipe } from '@shared/pipes/currency-name-rate/currency-name-rate.pipe';
import { CurrencyRateService } from '@shared/services/currency-rate/currency-rate.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { delay, finalize, first } from 'rxjs';

@Component({
  selector: 'wefin-current-rate-edit-dialog',
  imports: [
    DialogContentComponent,
    ButtonModule,
    InputTextComponent,
    FormsModule,
    ReactiveFormsModule,
    CurrencyNameRatePipe,
    InputNumberComponent,
  ],
  templateUrl: './current-rate-edit-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentRateEditDialogComponent {
  private _messageService = inject(MessageService);

  private _dialogRef = inject(DynamicDialogRef);
  private _config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private _currencyRateService = inject(CurrencyRateService);

  protected loadingRequest = signal<boolean>(false);

  protected currencyRate = signal<CurrencyRateInterface>(
    this._config.data?.currencyRate
  );

  public reteControl = new FormControl<number | null>(
    this.currencyRate().rate,
    {
      nonNullable: false,
      validators: [Validators.required, Validators.min(0)],
    }
  );

  protected closeDialog(): void {
    this._dialogRef.close();
  }

  protected confirm() {
    if (this.reteControl.invalid) {
      this._showErrorToast();
    } else {
      this._editRate();
    }
  }

  private _showErrorToast() {
    const dto: ToastInterface = {
      severity: 'warn',
      summary: 'Preencha os campos corretamente',
    };

    this._messageService.add(dto);
  }

  private _editRate() {
    this.loadingRequest.set(true);

    const dto: CurrencyRateInterface = {
      ...this.currencyRate(),
      rate: this.reteControl.value as number,
      lastUpdated: `${new Date()}`,
    };

    this._currencyRateService
      .put(dto.id, dto)
      .pipe(
        delay(500),
        first(),
        finalize(() => this.loadingRequest.set(false))
      )
      .subscribe((res) => {
        this._dialogRef.close(res);
      });
  }
}
