import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import { CurrencyNameRatePipe } from '@shared/pipes/currency-name-rate/currency-name-rate.pipe';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'wefin-current-rates-information-card',
  imports: [DatePipe, CurrencyNameRatePipe, ButtonModule, TooltipModule],
  providers: [DatePipe],
  templateUrl: './current-rates-information-card.component.html',
  styles: `
      :host {
        display: block;
        width: 100%;
      }
     .rate-display:hover {
      background: var(--surface-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentRatesInformationCardComponent {
  public currentRate = input.required<CurrencyRateInterface>();

  public edit = output<CurrencyRateInterface>();

  onEdit() {
    this.edit.emit(this.currentRate());
  }
}
