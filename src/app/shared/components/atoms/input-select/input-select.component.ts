import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '@shared/directives/control-value-accessor/control-value-accessor.directive';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'wefin-input-select',
  imports: [ReactiveFormsModule, FormsModule, SelectModule],
  templateUrl: './input-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSelectComponent<T> extends ControlValueAccessorDirective<T> {
  public options = input<T[]>([]);
  public optionLabel = input.required<string>();
  public optionValue = input<string>();
}
