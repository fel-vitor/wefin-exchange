import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { HeaderComponent } from '@shared/components/organisms/header/header.component';

@Component({
  selector: 'wefin-header',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeHeaderComponent implements HeaderComponent {}
