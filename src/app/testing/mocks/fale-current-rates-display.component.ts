import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CurrentRatesDisplayComponent } from '@shared/components/organisms/current-rates-display/current-rates-display.component';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';

@Component({
  selector: 'wefin-tab-switch',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeCurrentRatesDisplayComponent extends CurrentRatesDisplayComponent {
  public override isLoading = signal<boolean>(true);

  public override currencyRateList = signal<CurrencyRateInterface[]>([]);

  public override getCurrencyRates() {}

  public override showEditDialog(currencyRate: CurrencyRateInterface) {}
}
