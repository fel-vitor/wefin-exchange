import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '@core/layout/layout.component';

@Component({
  selector: 'wefin-pages',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  template: `
    <wefin-layout>
      <router-outlet />
    </wefin-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesComponent {}
