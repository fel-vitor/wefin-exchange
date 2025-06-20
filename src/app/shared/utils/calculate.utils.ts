import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';

export function invertRate(rate: number): number {
  if (rate === 0) {
    throw new Error('Taxa não pode ser zero');
  }
  return +(1 / rate).toFixed(4);
}

export function getExchangeRate(
  fromCurrency: string,
  toCurrency: string,
  rate: CurrencyRateInterface
): number {
  if (rate.fromCurrency === fromCurrency && rate.toCurrency === toCurrency) {
    return rate.rate;
  }

  if (rate.fromCurrency === toCurrency && rate.toCurrency === fromCurrency) {
    return invertRate(rate.rate);
  }

  throw new Error(
    `Taxa de câmbio não compatível entre ${fromCurrency} e ${toCurrency}`
  );
}

export function convertCurrency(
  fromAmount: number,
  exchangeRate: number
): number {
  const result = fromAmount * exchangeRate;
  return +result.toFixed(2);
}

export function calculateExchangeRate(
  fromRate: number,
  toRate: number
): number {
  if (fromRate === 0) {
    throw new Error('Taxa não pode ser zero');
  }
  const result = toRate / fromRate;
  return +result.toFixed(4);
}
