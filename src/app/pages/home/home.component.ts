import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeTemplateComponent } from '@shared/components/templates/home-template/home-template.component';

@Component({
  selector: 'wefin-home',
  imports: [HomeTemplateComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
