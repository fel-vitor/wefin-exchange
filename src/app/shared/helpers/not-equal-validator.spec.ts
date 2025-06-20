import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { notEqualValidator } from './validators';

describe('notEqualValidator', () => {
  let form: UntypedFormGroup;

  beforeEach(() => {
    form = new UntypedFormGroup({
      fieldA: new UntypedFormControl(''),
      fieldB: new UntypedFormControl(''),
    });

    form.setValidators(notEqualValidator('fieldA', 'fieldB'));
  });

  it('não deve ter erro se os valores forem diferentes', () => {
    form.get('fieldA')?.setValue('A');
    form.get('fieldB')?.setValue('B');

    form.updateValueAndValidity();

    expect(form.errors).toBeNull();
    expect(form.get('fieldA')?.errors).toBeNull();
    expect(form.get('fieldB')?.errors).toBeNull();
  });

  it('deve retornar erro se os valores forem iguais', () => {
    form.get('fieldA')?.setValue('same');
    form.get('fieldB')?.setValue('same');

    form.updateValueAndValidity();

    expect(form.errors).toEqual({ notEqual: true });
    expect(form.get('fieldA')?.errors).toEqual({ notEqual: true });
    expect(form.get('fieldB')?.errors).toEqual({ notEqual: true });
  });

  it('deve remover o erro quando os valores se tornam diferentes', () => {
    form.get('fieldA')?.setValue('same');
    form.get('fieldB')?.setValue('same');

    form.updateValueAndValidity();

    expect(form.errors).toEqual({ notEqual: true });

    form.get('fieldB')?.setValue('different');
    form.updateValueAndValidity();

    expect(form.errors).toBeNull();
    expect(form.get('fieldA')?.errors).toBeNull();
    expect(form.get('fieldB')?.errors).toBeNull();
  });

  it('não deve lançar erro se algum dos controles não existir', () => {
    const invalidValidator = notEqualValidator('fieldX', 'fieldY');
    const invalidForm = new UntypedFormGroup({
      fieldA: new UntypedFormControl(''),
    });

    expect(() => {
      invalidForm.setValidators(invalidValidator);
      invalidForm.updateValueAndValidity();
    }).not.toThrow();

    expect(invalidForm.errors).toBeNull();
  });
});
