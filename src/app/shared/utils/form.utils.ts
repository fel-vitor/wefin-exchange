import {
  type AbstractControl,
  type FormControl,
  UntypedFormArray,
  type UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

export function markFormAsDirty(form: UntypedFormGroup | UntypedFormArray) {
  Object.values(form.controls).forEach((control) => {
    markControlAsDirty(control);
  });
}

export function markControlAsDirty(control: AbstractControl) {
  control.markAsDirty();
  control.markAsTouched();

  if (
    control instanceof UntypedFormGroup ||
    control instanceof UntypedFormArray
  ) {
    Object.values(control.controls).forEach(markControlAsDirty);
  }
}

export function formViolationReset(form: UntypedFormGroup | UntypedFormArray) {
  Object.keys(form.controls).forEach((field) => {
    const control = form.get(field);

    if (control) {
      controlViolationReset(control);

      if (
        control instanceof UntypedFormGroup ||
        control instanceof UntypedFormArray
      ) {
        formViolationReset(control);
      }
    }
  });
}

export function controlViolationReset(
  control: UntypedFormControl | FormControl | AbstractControl
) {
  control.setErrors(null);
  control.markAsPristine();
  control.markAsUntouched();
}
