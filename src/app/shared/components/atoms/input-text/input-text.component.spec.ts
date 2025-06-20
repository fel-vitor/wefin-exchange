import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputTextComponent } from './input-text.component';

@Component({
  selector: 'wefin-host-component',
  template: `
    <wefin-input-text
      [formControl]="control"
      [inputId]="'testInput'"
      [label]="'Test Label'"
    />
  `,
  standalone: true,
  imports: [InputTextComponent, ReactiveFormsModule, FormsModule],
})
class HostComponent {
  control = new FormControl<string | null>('', [Validators.required]);
}

describe('InputTextComponent', () => {
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

    component.control.setValue('Hello Test');
    fixture.detectChanges();

    expect(input.value).toBe('Hello Test');
  });

  it('Deve atualizar o FormControl ao alterar input', () => {
    const input = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    input.value = 'Changed';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.control.value).toBe('Changed');
  });

  it('Deve refletir estado disabled corretamente', () => {
    const input = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    component.control.disable();
    fixture.detectChanges();
    expect(input.disabled).toBe(true);

    component.control.enable();
    fixture.detectChanges();
    expect(input.disabled).toBe(false);
  });

  it('Deve possuir os atributos corretos no input', () => {
    const input = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;
    const label = fixture.debugElement.query(By.css('label'))
      .nativeElement as HTMLLabelElement;

    expect(input.getAttribute('id')).toBe('testInput');
    expect(label.getAttribute('for')).toBe('testInput');
    expect(label.textContent).toContain('Test Label');
  });
});
