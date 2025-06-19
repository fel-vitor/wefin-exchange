import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { TabSwitchComponent } from '@shared/components/molecules/tab-switch/tab-switch.component';

@Component({
  selector: 'wefin-tab-switch',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeTabSwitchComponent implements TabSwitchComponent {
  public firstLabel = input.required<string>();
  public firstRoute = input.required<string>();
  public secondLabel = input.required<string>();
  public secondRoute = input.required<string>();

  public onTabClick(): void {}
}
