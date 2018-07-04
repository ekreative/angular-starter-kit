import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

/*
  Using interceptors is all about changing outgoing requests and incoming responses
  Here we are using it for setting headers
*/
@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  // private uuid: string = localStorage.getItem('uuid') ? localStorage.getItem('uuid') : uuid();

  constructor(
    private router: Router
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this is the way to set new headers for requests
    // let interceptHeaders = req.headers.set('Content-Type', 'application/json');
    // interceptHeaders = interceptHeaders.set('X-ONLINE-BOOKING-TOKEN', this.uuid);
    // interceptHeaders = interceptHeaders.set('X-APPLICATION-ID', 'laptop');

    // if (
    //   req.url.match('/stripe') ||
    //   (req.url.match('/appointments') && !req.url.endsWith('/new')) ||
    //   req.url.match('/pay') ||
    //   req.url.endsWith('/logout')
    // ) {
    //   interceptHeaders = interceptHeaders.set('X-ONLINE-BOOKING-TOKEN', this.uuid);
    //   interceptHeaders = interceptHeaders.set('X-SESSION-TOKEN', localStorage.getItem('currentUserToken'));
    // }
    // const modifiedRequest = req.clone({headers: interceptHeaders});
    const modifiedRequest = req.clone();
    return next.handle(modifiedRequest)
        .pipe(map(res => res));
  }
}
