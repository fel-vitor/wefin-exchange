import type { CurrencyType } from '@shared/interfaces/currency.model';

export const CURRENCY_NAMES: Record<CurrencyType, string> = {
  OURO_REAL: 'Ouro Real',
  TIBAR: 'Tibar',
};

export const CURRENCY_OPTIONS = [
  { label: 'Ouro Real', value: 'OURO_REAL' },
  { label: 'Tibar', value: 'TIBAR' },
];
