import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { formViolationReset, markFormAsDirty } from './form.utils';

describe('form.utils', () => {
  let form: UntypedFormGroup;

  beforeEach(() => {
    form = new UntypedFormGroup({
      name: new UntypedFormControl(''),
      email: new UntypedFormControl(''),
    });
  });

  it('markFormAsDirty deve deixar os campos dirty', () => {
    markFormAsDirty(form);
    expect(form.get('name')?.dirty).toBe(true);
    expect(form.get('email')?.dirty).toBe(true);
  });

  it('formViolationReset deve resetar os errors', () => {
    form.get('name')?.setErrors({ required: true });
    form.get('email')?.setErrors({ minlength: true });

    formViolationReset(form);

    expect(form.get('name')?.errors).toBeNull();
    expect(form.get('email')?.errors).toBeNull();
  });

  it('formViolationReset não deve quebrar se não houver errors', () => {
    expect(() => formViolationReset(form)).not.toThrow();
  });

  it('markFormAsDirty não deve quebrar se o form estiver vazio', () => {
    const emptyForm = new UntypedFormGroup({});
    expect(() => markFormAsDirty(emptyForm)).not.toThrow();
  });
});
