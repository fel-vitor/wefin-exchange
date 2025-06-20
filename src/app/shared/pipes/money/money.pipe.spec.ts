import { currencySymbol } from '@shared/constants/currency-symbol.constant';
import { CurrencyEnum } from '@shared/enum/currency-type.enum';
import { MoneyPipe } from './money.pipe';

describe('MoneyPipe', () => {
  let pipe: MoneyPipe;

  beforeEach(() => {
    pipe = new MoneyPipe();
  });

  it('deve criar corretamente', () => {
    expect(pipe).toBeTruthy();
  });

  it('deve formatar valor com símbolo da moeda especificada', () => {
    const result = pipe.transform(100, CurrencyEnum.OuroReal);
    expect(result).toBe(`100 ${currencySymbol[CurrencyEnum.OuroReal]}`);

    const result2 = pipe.transform(200, CurrencyEnum.Tibar);
    expect(result2).toBe(`200 ${currencySymbol[CurrencyEnum.Tibar]}`);
  });

  it('deve usar Ouro Real como padrão se não for passada nenhuma moeda', () => {
    const result = pipe.transform(50);
    expect(result).toBe(`50 ${currencySymbol[CurrencyEnum.OuroReal]}`);
  });
});
