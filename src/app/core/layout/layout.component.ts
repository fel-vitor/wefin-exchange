import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '@shared/components/organisms/header/header.component';

@Component({
  selector: 'wefin-layout',
  imports: [HeaderComponent],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
