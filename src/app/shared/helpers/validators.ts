import type {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function notEqualValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    const areEqual = control.value === matchingControl.value;

    if (areEqual) {
      control.setErrors({ ...(control.errors ?? {}), notEqual: true });
      matchingControl.setErrors({
        ...(matchingControl.errors ?? {}),
        notEqual: true,
      });
      return { notEqual: true };
    } else {
      if (control.errors?.notEqual) {
        const { notEqual, ...rest } = control.errors;
        control.setErrors(Object.keys(rest).length ? rest : null);
      }

      if (matchingControl.errors?.notEqual) {
        const { notEqual, ...rest } = matchingControl.errors;
        matchingControl.setErrors(Object.keys(rest).length ? rest : null);
      }

      return null;
    }
  };
}
