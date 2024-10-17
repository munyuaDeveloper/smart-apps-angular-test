import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { LoaderComponent } from "./components/loader/loader.component";
import { SharedService } from './services/shared.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavBarComponent,
    MatSidenavModule,
    FlexLayoutModule,
    LoaderComponent,
    RouterLink
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public auth = inject(AuthService)
  public sharedService = inject(SharedService)
}
