import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '@shared/directives/control-value-accessor/control-value-accessor.directive';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'wefin-input-text',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule],
  templateUrl: './input-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent<T> extends ControlValueAccessorDirective<T> {}
