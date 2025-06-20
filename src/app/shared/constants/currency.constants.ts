import type { CurrencyEnum } from '@shared/enum/currency-type.enum';

export const CURRENCY_NAMES: Record<CurrencyEnum, string> = {
  OURO_REAL: 'Ouro Real',
  TIBAR: 'Tibar',
};

export const CURRENCY_OPTIONS = [
  { label: 'Ouro Real', value: 'OURO_REAL' },
  { label: 'Tibar', value: 'TIBAR' },
];
