import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'wefin-dialog-content',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentComponent {
  private _dialogRef = inject(DynamicDialogRef);

  public styleClassHeader = input('py-3 px-4');
  public styleClassContent = input('py-2 px-4');
  public styleDialog = input('');
  public styleClassFooter = input('py-2 px-3');
  public displayHeader = input(true);
  public displayContent = input(true);
  public displayFooter = input(true);
  public dialogWidth = input('512px');
  public showCloseButton = input(true);

  protected closeDialog(): void {
    this._dialogRef.close();
  }
}
