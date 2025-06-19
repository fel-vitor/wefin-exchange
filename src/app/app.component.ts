import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'wefin-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {}
