import type { CurrencyType } from './currency.model';

export type TransactionType = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface TransactionInterface {
  id: string;
  fromCurrency: CurrencyType;
  toCurrency: CurrencyType;
  fromAmount: number;
  toAmount: number;
  exchangeRate: number;
  timestamp: string;
  status: TransactionType;
}

export type TransactionWithoutIdInterface = Omit<TransactionInterface, 'id'>;
