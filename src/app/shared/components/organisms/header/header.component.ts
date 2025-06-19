import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabSwitchComponent } from '@shared/components/molecules/tab-switch/tab-switch.component';

@Component({
  selector: 'wefin-header',
  imports: [TabSwitchComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
