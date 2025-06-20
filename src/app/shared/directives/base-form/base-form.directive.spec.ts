import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BaseFormDirective } from './base-form.directive';

@Component({
  selector: 'fake-form',
  template: '',
  standalone: true,
})
class FakeFormDirective extends BaseFormDirective {
  submit = jest.fn();
}

describe('BaseFormDirective', () => {
  let fixture: ComponentFixture<FakeFormDirective>;
  let component: FakeFormDirective;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FakeFormDirective],
      providers: [MessageService],
    });

    fixture = TestBed.createComponent(FakeFormDirective);
    component = fixture.componentInstance;
    messageService = TestBed.inject(MessageService);

    component['model'] = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
    });

    jest.spyOn(messageService, 'add');
    jest.spyOn(component, 'submit');
  });

  it('deve criar corretamente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar submit se o form for válido', () => {
    component.model.setValue({ name: 'Fake Test' });

    component.onSubmit();

    expect(component.submit).toHaveBeenCalled();
    expect(messageService.add).not.toHaveBeenCalled();
  });

  it('não deve chamar submit se o form for inválido e deve exibir o toast', () => {
    component.onSubmit();

    expect(component.submit).not.toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Preencha todos os campos corretamente.',
    });
  });
});
