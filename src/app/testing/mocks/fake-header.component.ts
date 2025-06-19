import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '@shared/components/organisms/header/header.component';

@Component({
  selector: 'wefin-header',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeHeaderComponent extends HeaderComponent {
  public override navigateRoute(route: string): void {}
}
