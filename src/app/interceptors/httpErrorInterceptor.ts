import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private _toastService: ToastrService, private _authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        if (
          typeof window !== 'undefined' &&
          'ErrorEvent' in window &&
          error.error instanceof ErrorEvent
        ) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 400:
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
              break;
            case 401:
                // this._authService.refreshToken()
              errorMessage = `Error Code: ${error.status}\nMessage: Your not authorized to perform this action`;
              break;
            case 403:
              errorMessage = `Error Code: ${error.status}\nMessage: You don't have permission to access this resource`;
              break;
            case 404:
              errorMessage = `Error Code: ${error.status}\nMessage: Resource not found.`;
              break;
            case 500:
              errorMessage = `Error Code: ${error.status}\nMessage: Internal Server error`;
              break;

            default:
              errorMessage = `Something went wrong`;
          }
        }

        // Show error
        this._toastService.error(errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
