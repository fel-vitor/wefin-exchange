import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'wefin-tab-switch',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './tab-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabSwitchComponent {
  public firstLabel = input.required<string>();
  public firstRoute = input.required<string>();
  public secondLabel = input.required<string>();
  public secondRoute = input.required<string>();
}
