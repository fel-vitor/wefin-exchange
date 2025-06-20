import { CurrencyEnum } from '@shared/enum/currency-type.enum';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import {
  calculateExchangeRate,
  convertCurrency,
  getExchangeRate,
  invertRate,
} from './calculate.utils';

describe('calculate.utils', () => {
  describe('invertRate', () => {
    it('deve inverter a taxa corretamente', () => {
      expect(invertRate(2)).toBe(0.5);
      expect(invertRate(0.25)).toBe(4);
    });

    it('deve lançar erro se taxa for zero', () => {
      expect(() => invertRate(0)).toThrow('Taxa não pode ser zero');
    });
  });

  describe('getExchangeRate', () => {
    const rate: CurrencyRateInterface = {
      id: '1',
      fromCurrency: CurrencyEnum.OuroReal,
      toCurrency: CurrencyEnum.Tibar,
      rate: 5,
      lastUpdated: '2024-01-01T00:00:00Z',
    };

    it('deve retornar a taxa direta correta', () => {
      expect(
        getExchangeRate(CurrencyEnum.OuroReal, CurrencyEnum.Tibar, rate)
      ).toBe(5);
    });

    it('deve retornar a taxa invertida correta', () => {
      expect(
        getExchangeRate(CurrencyEnum.Tibar, CurrencyEnum.OuroReal, rate)
      ).toBe(0.2);
    });

    it('deve lançar erro se moedas não forem compatíveis', () => {
      expect(() =>
        getExchangeRate(CurrencyEnum.OuroReal, CurrencyEnum.OuroReal, rate)
      ).toThrow('Taxa de câmbio não compatível entre OURO_REAL e OURO_REAL');
    });
  });

  describe('convertCurrency', () => {
    it('deve converter corretamente o valor', () => {
      expect(convertCurrency(100, 5)).toBe(500);
      expect(convertCurrency(50, 0.2)).toBe(10);
    });

    it('deve arredondar para 2 casas decimais', () => {
      expect(convertCurrency(10.3333, 1.5555)).toBe(16.07);
    });
  });

  describe('calculateExchangeRate', () => {
    it('deve calcular a taxa corretamente', () => {
      expect(calculateExchangeRate(2, 4)).toBe(2);
      expect(calculateExchangeRate(0.5, 2)).toBe(4);
    });

    it('deve lançar erro se fromRate for zero', () => {
      expect(() => calculateExchangeRate(0, 2)).toThrow(
        'Taxa não pode ser zero'
      );
    });
  });
});
