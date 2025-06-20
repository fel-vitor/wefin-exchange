import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { HomeComponent } from '@pages/home/home.component';

@Component({
  selector: 'wefin-home',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeHomeComponent implements HomeComponent {}
