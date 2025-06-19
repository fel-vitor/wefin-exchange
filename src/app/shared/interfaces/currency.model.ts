export type CurrencyType = 'OURO_REAL' | 'TIBAR';

export interface CurrencyRateInterface {
  id: string;
  fromCurrency: CurrencyType;
  toCurrency: CurrencyType;
  rate: number;
  lastUpdated: string;
}
