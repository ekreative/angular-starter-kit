import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/*
  Using interceptors is all about changing outgoing requests and incoming responses
  Here we are using it for logging
*/
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(map(res => {
        console.log({
            response: res
        });
        return res;
    }),
    catchError((httpErrorResponse: HttpErrorResponse) => {
        console.error('Error', httpErrorResponse);
        return Observable.throw(httpErrorResponse);
      }));
  }
}
