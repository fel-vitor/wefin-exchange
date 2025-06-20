import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputNumberComponent } from './input-number.component';

@Component({
  selector: 'wefin-host-component',
  template: `
    <wefin-input-number
      [formControl]="control"
      [inputId]="'testInput'"
      [label]="'Test Number'"
      [min]="min()"
      [max]="max()"
    />
  `,
  standalone: true,
  imports: [InputNumberComponent, ReactiveFormsModule, FormsModule],
})
class HostComponent {
  control = new FormControl<number | null>(null, [Validators.required]);
  min = signal(10);
  max = signal(100);
}

describe('InputNumberComponent', () => {
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

  it('Deve criar o componente corretamente', () => {
    expect(component).toBeTruthy();
  });

  it('Deve refletir valor no input', () => {
    const input = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    component.control.setValue(50);
    fixture.detectChanges();

    expect(input.value).toBe('50');
  });

  it('Deve atualizar o FormControl ao alterar input', () => {
    const input = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    input.value = '25';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.control.value).toBe(25);
  });

  it('Deve aplicar os atributos min e max corretamente', () => {
    const input = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    expect(input.getAttribute('min')).toBe('10');
    expect(input.getAttribute('max')).toBe('100');
  });

  it('Deve atualizar atributos min e max quando signal mudar', () => {
    const input = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    component.min.set(20);
    component.max.set(80);
    fixture.detectChanges();

    expect(input.getAttribute('min')).toBe('20');
    expect(input.getAttribute('max')).toBe('80');
  });

  it('Deve refletir estado disabled corretamente', () => {
    component.control.disable();
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;
    expect(input.disabled).toBe(true);

    component.control.enable();
    fixture.detectChanges();
    expect(input.disabled).toBe(false);
  });
});
