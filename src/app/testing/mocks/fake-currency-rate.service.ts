import { CurrentRateEditDialogService } from '@shared/components/organisms/dialogs/current-rate-edit-dialog/services/current-rate-edit-dialog.service';

export class FakeCurrentRateEditDialogService extends CurrentRateEditDialogService {
  override show = jest.fn();
}
