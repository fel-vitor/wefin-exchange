import type { CurrencyEnum } from '@shared/enum/currency-type.enum';

export type TransactionType = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface TransactionInterface {
  id: string;
  fromCurrency: CurrencyEnum;
  toCurrency: CurrencyEnum;
  fromAmount: number;
  toAmount: number;
  exchangeRate: number;
  timestamp: string;
  date: string;
  status: TransactionType;
}

export type TransactionWithoutIdInterface = Omit<TransactionInterface, 'id'>;
