import type { CurrencyEnum } from '@shared/enum/currency-type.enum';

export interface CurrencyRateInterface {
  id: string;
  fromCurrency: CurrencyEnum;
  toCurrency: CurrencyEnum;
  rate: number;
  lastUpdated: string;
}
