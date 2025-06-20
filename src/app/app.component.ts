import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'wefin-root',
  imports: [RouterOutlet, ToastModule],
  template: `<p-toast /> <router-outlet />`,
})
export class AppComponent {}
