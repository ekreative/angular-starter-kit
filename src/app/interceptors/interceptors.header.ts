import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

/*
  Using interceptors is all about changing outgoing requests and incoming responses
  Here we are using it for setting headers
*/
@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  // private uuid: string = localStorage.getItem('uuid') ? localStorage.getItem('uuid') : uuid();

  constructor(private router: Router) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const interceptHeaders = req.headers.set('Content-Type', 'application/json');

    if (!req.url.match('/login')) {
      // interceptHeaders = interceptHeaders.set('X-SESSION-TOKEN', localStorage.getItem('currentUserToken'));
    }
    const modifiedRequest = req.clone({headers: interceptHeaders});
    return next.handle(modifiedRequest).pipe(map(res => {
      return res;
    }));
  }
}
