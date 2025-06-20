import { CurrencyRateService } from '@shared/services/currency-rate/currency-rate.service';

export class FakeCurrencyRateService extends CurrencyRateService {
  override getAll = jest.fn();
  override patch = jest.fn();
  override delete = jest.fn();
  override post = jest.fn();
}
