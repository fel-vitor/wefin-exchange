import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyEnum } from '@shared/enum/currency-type.enum';
import type { CurrencyRateInterface } from '@shared/interfaces/currency.model';
import { TestHelper } from '@testing/helpers/test-helper';
import { FakeCurrentRatesInformationCardComponent } from '@testing/mocks/fake-current-rates-information-card.component';
import { CurrentRatesInformationCardComponent } from './current-rates-information-card.component';

describe('CurrentRatesInformationCardComponent', () => {
  let fixture: ComponentFixture<CurrentRatesInformationCardComponent>;
  let testHelper: TestHelper<CurrentRatesInformationCardComponent>;

  const fakeMock: CurrencyRateInterface = {
    id: '1',
    fromCurrency: CurrencyEnum.OuroReal,
    toCurrency: CurrencyEnum.Tibar,
    rate: 123.45,
    lastUpdated: '2025-06-19T16:09:55.000Z',
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CurrentRatesInformationCardComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
    });

    await TestBed.compileComponents();

    TestBed.overrideComponent(CurrentRatesInformationCardComponent, {
      remove: {
        imports: [CurrentRatesInformationCardComponent],
      },
      add: {
        imports: [FakeCurrentRatesInformationCardComponent],
      },
    });

    fixture = TestBed.createComponent(CurrentRatesInformationCardComponent);
    testHelper = new TestHelper(fixture);

    fixture.componentRef.setInput('currentRate', fakeMock);

    fixture.detectChanges();
  });

  it('Deve exibir as moedas corretamente formatadas', () => {
    const text = testHelper.getTextContentByTestId(
      'rate-from-and-to-currency-label'
    );
    expect(text).toContain('Ouro Real → Tibar');
  });

  it('Deve exibir o rate corretamente', () => {
    const rateValue = testHelper.getTextContentByTestId('rate-value');
    expect(rateValue).toBe('123.45');
  });

  it('Deve exibir a data formatada corretamente', () => {
    const datePipe = new DatePipe('pt');
    const formattedDate = datePipe.transform(fakeMock.lastUpdated, 'short');

    const rateLastUpdatedDateValue = testHelper.getTextContentByTestId(
      'rate-last-updated-date'
    );
    expect(rateLastUpdatedDateValue).toContain(`Atualizado: ${formattedDate}`);
  });

  it('Deve emitir um evento de editar taxa', () => {
    const emitSpy = jest.spyOn(fixture.componentInstance.edit, 'emit');

    testHelper.click('rate-edit-action');

    expect(emitSpy).toHaveBeenCalledWith(fakeMock);
  });
});
