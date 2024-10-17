import { Component, inject, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { SharedService } from '../../services/shared.service';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

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
  private router = inject(Router)
  
  isCollapsed = true;
  isOpen$ = this.sharedService.openSideMenu$.pipe(
    tap((res)=> this.isCollapsed = !res)
  )

  constructor(
    @Inject(DOCUMENT) private doc: Document
  ) {}

  // loginWithRedirect() {
  //   this.auth.loginWithRedirect(
  //     {
  //       appState: {
  //         target: '/admin',
  //         useRefreshTokens: true,
  //       },
  //     }
  //   );
  // }

  // logout() {
  //   this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  // }

  logout(){
    this.auth.logout()
    this.router.navigate(['/'])
  }

  openSideMenu(state: boolean){
    this.sharedService.setSideMenuState(state)
  }
}
