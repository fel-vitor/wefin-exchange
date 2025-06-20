import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrentRatesDisplayComponent } from '@shared/components/organisms/current-rates-display/current-rates-display.component';

@Component({
  selector: 'wefin-home-template',
  imports: [CurrentRatesDisplayComponent],
  templateUrl: './home-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeTemplateComponent {}
