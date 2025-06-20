import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyRateService } from '@shared/services/currency-rate/currency-rate.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { CurrentRateEditDialogComponent } from './current-rate-edit-dialog.component';

describe('CurrentRateEditDialogComponent', () => {
  let fixture: ComponentFixture<CurrentRateEditDialogComponent>;
  let component: CurrentRateEditDialogComponent;

  const mockDialogRef = {
    close: jest.fn(),
  };

  const mockDialogConfig = {
    data: {
      currencyRate: {
        id: 1,
        fromCurrency: 'OURO_REAL',
        toCurrency: 'TIBAR',
        rate: 5,
        lastUpdated: '2025-06-20T00:00:00Z',
      },
    },
  };

  const mockCurrencyRateService = {
    put: jest.fn().mockReturnValue(of(mockDialogConfig.data.currencyRate)),
  };

  const mockMessageService = {
    add: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentRateEditDialogComponent],
      providers: [
        { provide: DynamicDialogRef, useValue: mockDialogRef },
        { provide: DynamicDialogConfig, useValue: mockDialogConfig },
        { provide: CurrencyRateService, useValue: mockCurrencyRateService },
        { provide: MessageService, useValue: mockMessageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentRateEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve ser criado corretamente', () => {
    expect(component).toBeTruthy();
  });

  it('Deve fechar o dialog ao clicar em cancelar', () => {
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    component['closeDialog']();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('Deve exibir erro se tentar confirmar com form inválido', () => {
    component.reteControl.setValue(null);
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    component['confirm']();
    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'warn',
      summary: 'Preencha os campos corretamente',
    });
  });
});
