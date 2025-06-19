import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CurrentRatesInformationCardComponent } from '@shared/components/molecules/current-rates-information-card/current-rates-information-card.component';
import { CurrencyRateInterface } from '@shared/interfaces/currency.model';

@Component({
  selector: 'wefin-current-rates-information-card',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeCurrentRatesInformationCardComponent
  implements CurrentRatesInformationCardComponent
{
  public currentRate = input.required<CurrencyRateInterface>();
  public edit = output<CurrencyRateInterface>();

  onEdit(): void {}
}
