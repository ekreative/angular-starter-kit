import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

/*
  Using interceptors is all about changing outgoing requests and incoming responses
  Here we are using it for logging
*/
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  public intercept(
      req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('LoggingInterceptor Request');
    return next.handle(req).pipe(map(res => {
          console.log('LoggingInterceptor Response');
          console.log('Response body', {response: res});
          return res;
        }),
        catchError((httpErrorResponse: HttpErrorResponse) => {
          console.error('Error', httpErrorResponse);
          return throwError(httpErrorResponse);
        }));
  }
}
