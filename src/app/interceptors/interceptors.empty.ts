import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

/*
  Using interceptors is all about changing outgoing requests and incoming responses
  Here we are using it for handling an empty response
*/
@Injectable()
export class EmptyResponseBodyErrorInterceptor implements HttpInterceptor {
  public intercept(
      req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('EmptyResponseBodyErrorInterceptor Request');
    return next.handle(req).pipe(map(res => {
          console.log('EmptyResponseBodyErrorInterceptor Response');
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status >= 200 && error.status < 300) {
            const response = new HttpResponse({
              body: null,
              headers: error.headers,
              status: error.status,
              statusText: error.statusText,
              url: error.url,
            });
            return of(response);
          } else {
            return throwError(error);
          }
        }));
  }
}
