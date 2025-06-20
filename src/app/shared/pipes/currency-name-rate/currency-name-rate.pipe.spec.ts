import { currencyLabel } from '@shared/constants/currency-label.constant';
import { CurrencyEnum } from '@shared/enum/currency-type.enum';
import { CurrencyNameRatePipe } from './currency-name-rate.pipe';

describe('CurrencyNameRatePipe', () => {
  let pipe: CurrencyNameRatePipe;

  beforeEach(() => {
    pipe = new CurrencyNameRatePipe();
  });

  it('Deve ser criado corretamente', () => {
    expect(pipe).toBeTruthy();
  });

  it('Deve retornar o label correto para OURO_REAL', () => {
    const result = pipe.transform(CurrencyEnum.OuroReal);
    expect(result).toBe(currencyLabel[CurrencyEnum.OuroReal]);
  });

  it('Deve retornar o label correto para TIBAR', () => {
    const result = pipe.transform(CurrencyEnum.Tibar);
    expect(result).toBe(currencyLabel[CurrencyEnum.Tibar]);
  });

  it('Deve retornar o próprio valor se não encontrar no mapeamento', () => {
    const result = pipe.transform('INVALIDO' as CurrencyEnum);
    expect(result).toBe('INVALIDO');
  });
});
