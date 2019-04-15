import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { RequestService } from '../services/request.service';
import { PostOptions } from '../services/interfaces/request.interfaces';

import { State } from '../reducers';
import {
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_SUCCESS,
  LOGOUT_REQUEST_FAILURE
} from '../actions/logout.action';
import { OVERLAY_FINISH } from '../actions/header.action';


@Injectable()
export class LogoutEffect {

  private options: PostOptions<object, object>;

  // logout effect
  @Effect()
  public login$: Observable<Action> = this.actions$
    .pipe(ofType(LOGOUT_REQUEST))
    .pipe(
      mergeMap(action => {
        this.requestService.post<object, object>(this.options);
        return of({ type: 'LOGOUT_REQUEST_PROCESSING' });
      })
    );

  constructor(
    private requestService: RequestService,
    private actions$: Actions,
    private router: Router,
    private store: Store<State>
  ) {
    // request config
    this.options = {
      url: '/logout',
      body: {},
      handlers: {
        success: this.success.bind(this),
        error: this.error.bind(this)
      }
    };
  }
  // success finish effect
  public success(data: object): void {
    this.router.navigate(['/login']);
    // localStorage.removeItem('currentUser');
    // localStorage.removeItem('currentUserToken');
    this.store.dispatch({ type: OVERLAY_FINISH });
    this.store.dispatch({ type: LOGOUT_REQUEST_SUCCESS });
  }
  // error handler
  public error(httpErrorResponse: HttpErrorResponse): void {
    this.store.dispatch({ type: OVERLAY_FINISH });
    this.store.dispatch({ type: LOGOUT_REQUEST_FAILURE });
  }
}
