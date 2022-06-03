import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        switch (error.status) {
          case 400:
            break;
          case 401:
            this.toastr.error('Unothorized');
            break;
          case 404:
            this.router.navigateByUrl('/404');
            break;
          case 500:
            const navigationExtras: NavigationExtras = {
              state: { error: error.error },
            };
            this.router.navigateByUrl('/500', navigationExtras);
            break;
          default:
            break;
        }

        throw error;
      })
    );
  }
}
function errorCatching(errorCatching: any): Observable<HttpEvent<unknown>> {
  throw new Error('Function not implemented.');
}
