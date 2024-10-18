import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, lastValueFrom, map, Observable, tap } from 'rxjs';
import {
  UserInterface,
  UserRegistrationPayload,
} from '../models/Post.Interface';
import { jwtDecode } from 'jwt-decode';
import { AuthService as Auth0 } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth0Domain = environment.auth.domain;
  private clientId = environment.auth.clientId;
  private apiUrl = `https://${this.auth0Domain}`;



  user$ = new BehaviorSubject<UserInterface | null>(null);

  constructor(private http: HttpClient, private auth0: Auth0) {}

  // User Registration
  register(userDetails: UserRegistrationPayload): Observable<any> {
    const url = `${this.apiUrl}/dbconnections/signup`;
    const body = {
      client_id: this.clientId,
      connection: 'Username-Password-Authentication',
      ...userDetails,
    };
    return this.http.post(url, body);
  }

  // User Login
  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/oauth/token`;
    const body = {
      grant_type: 'password',
      client_id: this.clientId,
      username: email,
      password,
    };
    return this.http.post(url, body);
  }

  // get user details
  getUserDetails() {
    let token = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('id_token');
    }

    if (token) {
      const decoded = jwtDecode<any>(token);
      this.user$.next(decoded);
    }
  }

  // Logout
  logout(): void {
    localStorage.clear();
    this.user$.next(null);
  }

  // Get the stored access token
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('access_token');
    } else {
      return null;
    }
  }

  // Set tokens to localStorage
  setToken(access_token: string, id_token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('id_token', id_token);
    }
    this.getUserDetails();
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // refresh token
  refreshToken(): Observable<any> {
    let refreshToken = null;
    lastValueFrom(
      this.auth0
        .getAccessTokenSilently()
        .pipe(tap((res: any) => (refreshToken = res?.refresh_token)))
    );

    const body = {
      grant_type: 'refresh_token',
      client_id: this.clientId,
      refresh_token: refreshToken,
    };

    return this.http.post<any>(`${this.apiUrl}/oauth/token`, body).pipe(
      map((response: any) => {
        // Store the new access token and refresh token
        localStorage.setItem('accessToken', response.access_token);
        if (response.refresh_token) {
          localStorage.setItem('refreshToken', response.refresh_token);
        }
        return response.access_token;
      })
    );
  }


  // Using SDK Integration (Using @auth0/auth0-angular)

  // login
  loginWithRedirect() {
    this.auth0.loginWithRedirect({
      appState: {
        target: '/admin',
        useRefreshTokens: true,
      },
    });
  }

  // logout
  logoutWithAuth0() {
    this.auth0.logout({ logoutParams: { returnTo: environment.auth.authorizationParams.redirect_uri}});
  }
}
