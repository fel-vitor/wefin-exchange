import { Directive, inject } from '@angular/core';
import type { UntypedFormGroup } from '@angular/forms';
import type { ToastInterface } from '@core/interfaces/toats.model';
import { formViolationReset, markFormAsDirty } from '@shared/utils/form.utils';
import { MessageService } from 'primeng/api';

@Directive({
  selector: '[wefinBaseForm]',
  standalone: true,
})
export abstract class BaseFormDirective {
  private _messageService = inject(MessageService);

  public model!: UntypedFormGroup;

  abstract submit(_params?: unknown): void;

  public onSubmit(params?: unknown) {
    if (this.model.valid) {
      this.violationReset();
      this.submit(params);
    } else {
      this.validateForm();
      this._showToastInsertInformation();
    }
  }

  protected validateForm() {
    markFormAsDirty(this.model);
  }

  protected violationReset() {
    formViolationReset(this.model);
  }

  private _showToastInsertInformation() {
    const dto: ToastInterface = {
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Preencha todos os campos corretamente.',
    };

    this.showToast(dto);
  }

  protected showToast(data: ToastInterface) {
    this._messageService.add(data);
  }
}
