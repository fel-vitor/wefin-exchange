import { Pipe, type PipeTransform } from '@angular/core';
import { currencyLabel } from '@shared/constants/currency-label.constant';
import type { CurrencyEnum } from '@shared/enum/currency-type.enum';

@Pipe({
  name: 'currencyNameRate',
  standalone: true,
})
export class CurrencyNameRatePipe implements PipeTransform {
  transform(value: CurrencyEnum): string {
    return currencyLabel[value] ?? value;
  }
}
