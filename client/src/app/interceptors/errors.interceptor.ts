import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private toastr: ToastrService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          switch (err.status) {

            case 400: {
              let modelStateErrors: any[] = [];
              if (err.error.errors) {
                for (let key in err.error.errors) {
                  if (err.error.errors[key])
                    modelStateErrors.push(err.error.errors[key]);
                }
                throw modelStateErrors.flat();
              } else {
                this.toastr.error(err.error, err.status.toString());
              }
              break;
            }

            case 401: {
              this.toastr.error('Unauthorized', err.status.toString());
              break;
            }

            case 404: {
              this.router.navigateByUrl('not-found');
              this.toastr.error(err.error.title, err.status.toString());
              break;
            }

            case 500: {
              let navigationExtras: NavigationExtras = {
                state: {
                  error: err.error
                }
              };
              this.toastr.error(err.error.message, err.status.toString());
              this.router.navigateByUrl('server-error', navigationExtras);
              break;
            }

            default: {
              console.log(err);
              this.toastr.error(err.statusText, err.status.toString());
              break;
            }
            
          }
        }

        return throwError(() => err);
      })
    );
  }
}
