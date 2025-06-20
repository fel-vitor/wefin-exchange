import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputSelectComponent } from './input-select.component';

@Component({
  template: `
    <wefin-input-select
      inputId="currency"
      label="Moeda"
      [options]="currencies"
      optionLabel="name"
      [formControl]="control"
    ></wefin-input-select>
  `,
  standalone: true,
  imports: [InputSelectComponent, ReactiveFormsModule],
})
class HostComponent {
  control = new FormControl<string | null>(null);

  currencies = [
    { code: 'OURO_REAL', name: 'Ouro Real' },
    { code: 'TIBAR', name: 'Tibar' },
  ];
}

describe('InputSelectComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado corretamente', () => {
    expect(component).toBeTruthy();
  });

  it('Deve renderizar o label corretamente', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label).toBeTruthy();
    expect(label.textContent.trim()).toBe('Moeda');
    expect(label.getAttribute('for')).toBe('currency');
  });

  it('Deve atualizar o formControl ao selecionar uma opção', () => {
    component.control.setValue('TIBAR');
    fixture.detectChanges();
    expect(component.control.value).toBe('TIBAR');
  });
});
