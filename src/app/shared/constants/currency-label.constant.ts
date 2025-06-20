import type { CurrencyEnum } from '@shared/enum/currency-type.enum';

export const currencyLabel: Record<CurrencyEnum, string> = {
  OURO_REAL: 'Ouro Real',
  TIBAR: 'Tibar',
};

export const currencyList = Object.entries(currencyLabel).map(
  ([key, value]) => ({
    value: key as CurrencyEnum,
    label: value,
  })
);
