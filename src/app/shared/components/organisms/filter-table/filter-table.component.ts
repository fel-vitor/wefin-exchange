import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Params } from '@angular/router';
import { currencyList } from '@shared/constants/currency-label.constant';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'wefin-filter-table',
  imports: [
    InputTextModule,
    FormsModule,
    InputNumberModule,
    DatePickerModule,
    SelectModule,
    ButtonModule,
  ],
  templateUrl: './filter-table.component.html',
  styleUrl: './filter-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterTableComponent {
  public changeFilter = output<Params>();

  protected idFilter = signal<string>('');
  protected filterTax = signal<number | undefined>(undefined);
  protected filterDate = signal<Date | undefined>(undefined);
  protected filterCurrencyFrom = signal<string | undefined>(undefined);
  protected filterCurrencyTo = signal<string | undefined>(undefined);

  protected currentTypeList = signal(currencyList);

  protected filters = computed(() => {
    const date = this.filterDate();
    const raw = {
      id: this.idFilter(),
      exchangeRate: this.filterTax(),
      timestamp: date ? date.toISOString() : undefined,
      fromCurrency: this.filterCurrencyFrom(),
      toCurrency: this.filterCurrencyTo(),
    };

    const filtered = Object.entries(raw).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ''
    );

    return Object.fromEntries(filtered);
  });

  constructor() {
    effect(() => {
      const filters = this.filters();
      this.changeFilter.emit(filters);
    });
  }

  public clearFilters() {
    this.idFilter.set('');
    this.filterTax.set(undefined);
    this.filterDate.set(undefined);
    this.filterCurrencyFrom.set(undefined);
    this.filterCurrencyTo.set(undefined);
  }
}
