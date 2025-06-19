import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DialogContentComponent } from '@shared/components/molecules/dialog-content/dialog-content.component';

@Component({
  selector: 'wefin-dialog-content',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeDialogContentComponent extends DialogContentComponent {
  public override styleClassHeader = input('');
  public override styleClassContent = input('');
  public override styleDialog = input('');
  public override styleClassFooter = input('');
  public override displayHeader = input(true);
  public override displayContent = input(true);
  public override displayFooter = input(true);
  public override dialogWidth = input('');
  public override showCloseButton = input(true);

  protected override closeDialog(): void {}
}
