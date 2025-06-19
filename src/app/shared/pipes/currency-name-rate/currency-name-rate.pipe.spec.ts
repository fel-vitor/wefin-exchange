import { CurrencyType } from '@shared/interfaces/currency.model';
import { CurrencyNameRatePipe } from './currency-name-rate.pipe';

describe('CurrencyNameRatePipe', () => {
  let pipe: CurrencyNameRatePipe;

  beforeEach(() => {
    pipe = new CurrencyNameRatePipe();
  });

  it('Deve retornar "Ouro Real" quando o valor for "OURO_REAL"', () => {
    const result = pipe.transform('OURO_REAL' as CurrencyType);
    expect(result).toBe('Ouro Real');
  });

  it('Deve retornar "Tibar" quando o valor for "TIBAR"', () => {
    const result = pipe.transform('TIBAR' as CurrencyType);
    expect(result).toBe('Tibar');
  });

  it('Deve retornar o próprio valor quando não existir na lista', () => {
    const result = pipe.transform('INVALIDO' as CurrencyType);
    expect(result).toBe('INVALIDO');
  });
});
