import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyType } from '@shared/interfaces/currency.model';

@Pipe({
  name: 'currencyNameRate',
})
export class CurrencyNameRatePipe implements PipeTransform {
  transform(value: CurrencyType): string {
    const names: Record<CurrencyType, string> = {
      OURO_REAL: 'Ouro Real',
      TIBAR: 'Tibar',
    };

    return names[value] ?? value;
  }
}
