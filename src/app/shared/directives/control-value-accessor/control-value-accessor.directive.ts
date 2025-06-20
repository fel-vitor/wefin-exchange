import {
  ChangeDetectorRef,
  computed,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  model,
  type OnInit,
  Renderer2,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  type ControlValueAccessor,
  FormControl,
  type FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  NgModel,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';

@Directive({
  selector: '[wefinControlValueAccessor]',
  standalone: true,
})
export class ControlValueAccessorDirective<T>
  implements ControlValueAccessor, OnInit
{
  private _injector = inject(Injector);

  protected destroy = inject(DestroyRef);
  protected cd = inject(ChangeDetectorRef);
  protected elementRef = inject(ElementRef);
  protected renderer2 = inject(Renderer2);

  public isReadOnly = model(false);
  public inputId = input.required<string>();

  public label = input.required<string>();
  public textHelp = input<string>();
  public loading = input(false);
  public placeHolderText = input<string>('');
  public errorName = input('errorDescription');
  public optional = model(false);

  public inputIdHelp = computed(() => `${this.inputId()}-help`);

  protected control!: FormControl;
  protected onTouched!: () => T;
  protected onChange!: (val: T | null) => T;
  protected disabled = signal(false);

  constructor() {
    effect(() => {
      this._updateEnableOrDisabled(this.isReadOnly());
    });
  }

  public ngOnInit(): void {
    this._setFormControl();
  }

  writeValue(value: T): void {}

  registerOnChange(fn: (val: T | null) => T): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => T): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected getChangeValueControl() {
    return this.control.valueChanges.pipe(takeUntilDestroyed(this.destroy));
  }

  private _setFormControl(): void {
    try {
      const formControl = this._injector.get(NgControl);
      formControl.valueAccessor = this;

      switch (formControl.constructor) {
        case NgModel: {
          this._setNgModel(formControl);
          break;
        }
        case FormControlName:
          this._setFormControlName(formControl);
          break;

        default:
          this._setDefaultControl(formControl);
          break;
      }
    } catch (_) {
      this.control = new FormControl();
    }
    this._checkControlRequired();
  }

  private _updateEnableOrDisabled(enableControl: boolean): void {
    this.disabled.set(enableControl);
  }

  private _setNgModel(formControl: NgControl): void {
    const { control, update } = formControl as NgModel;

    this.control = control;

    this.control.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroy),
        tap((value: string) => update.emit(value))
      )
      .subscribe();
  }

  private _setFormControlName(formControl: NgControl): void {
    this.control = this._injector
      .get(FormGroupDirective)
      .getControl(formControl as FormControlName);
  }

  private _setDefaultControl(formControl: NgControl): void {
    this.control = (formControl as FormControlDirective).form as FormControl;
  }

  private _checkControlRequired(): void {
    this.optional.set(!this.control.hasValidator(Validators.required));
  }
}
