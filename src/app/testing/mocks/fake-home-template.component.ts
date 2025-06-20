import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { HomeTemplateComponent } from '@shared/components/templates/home-template/home-template.component';

@Component({
  selector: 'wefin-home-template',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeHomeTemplateComponent implements HomeTemplateComponent {}
