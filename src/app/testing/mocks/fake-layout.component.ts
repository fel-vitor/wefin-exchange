import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { LayoutComponent } from '@core/layout/layout.component';

@Component({
  selector: 'wefin-layout',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeLayoutComponent implements LayoutComponent {}
