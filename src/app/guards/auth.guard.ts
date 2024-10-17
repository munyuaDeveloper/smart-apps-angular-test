import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated$ && this.auth.isAuthenticated$.pipe(
      tap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigate(['/']);
        }
        return isAuthenticated;
      })
    );
  }
}
