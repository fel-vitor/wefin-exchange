import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '@shared/directives/control-value-accessor/control-value-accessor.directive';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'wefin-input-number',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './input-number.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent<T> extends ControlValueAccessorDirective<T> {
  public min = input<number | null>(null);
  public max = input<number | null>(null);
}
