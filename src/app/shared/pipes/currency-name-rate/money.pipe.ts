import { Pipe, type PipeTransform } from '@angular/core';
import { currencySymbol } from '@shared/constants/currency-symbol.constant';
import { CurrencyEnum } from '@shared/enum/currency-type.enum';

@Pipe({
  name: 'wefinMoney',
})
export class MoneyPipe implements PipeTransform {
  transform(value: number, moneyType?: CurrencyEnum): unknown {
    const symbol = moneyType
      ? currencySymbol[moneyType]
      : currencySymbol[CurrencyEnum.OuroReal];
    return `${value} ${symbol}`;
  }
}
