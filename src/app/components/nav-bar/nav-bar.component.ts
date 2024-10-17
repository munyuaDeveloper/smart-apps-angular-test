import { Component, inject, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, CommonModule, DOCUMENT, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { SharedService } from '../../services/shared.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule
  ],
})
export class NavBarComponent {
  public auth = inject(AuthService)
  public sharedService = inject(SharedService)
  
  isCollapsed = true;
  isOpen$ = this.sharedService.openSideMenu$.pipe(
    tap((res)=> this.isCollapsed = !res)
  )

  constructor(
    @Inject(DOCUMENT) private doc: Document
  ) {}

  loginWithRedirect() {
    this.auth.loginWithRedirect(
      {
        appState: {
          target: '/admin',
          useRefreshTokens: true,
        },
      }
    );
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }

  openSideMenu(state: boolean){
    this.sharedService.setSideMenuState(state)
  }
}
