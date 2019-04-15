import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { RequestService } from '../services/request.service';
import { PostOptions } from '../services/interfaces/request.interfaces';

import { State } from '../reducers';
import { LOGIN_REQUEST } from '../actions/login.action';
import {
  REGISTRATION_REQUEST,
  REGISTRATION_REQUEST_SUCCESS,
  REGISTRATION_REQUEST_FAILURE } from '../actions/registration.action';
import { OVERLAY_FINISH } from '../actions/header.action';
import { PostCredentialsRequest, PostCredentialsResponse } from './interfaces/registration.interfaces';

@Injectable()
export class RegistrationEffect {

  private options: PostOptions<PostCredentialsRequest, PostCredentialsResponse>;

  // registration effect
  @Effect()
  public registration$: Observable<any> = this.actions$
  .pipe(ofType(REGISTRATION_REQUEST))
  .pipe(
    mergeMap(action => {
      Object.keys(action['payload']).forEach((key: string) => {
        this.options.body[key] = action['payload'][key];
      });
      if (this.options.body.phone[0] === '+') {
        this.options.body.phone = this.options.body.phone.slice(1);
      }
      this.requestService.post<PostCredentialsRequest, PostCredentialsResponse>(this.options);
      return of({ type: 'REGISTRATION_REQUEST_PROCESSING' });
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
      url: `/registration`,
      body: {
        firstName: null,
        lastName: null,
        password: null,
        phone: null,
        email: null,
        birthday: null
      },
      handlers: {
        success: this.success.bind(this),
        error: this.error.bind(this)
      }
    };
  }

    // finish registration effect
    public success(data: PostCredentialsResponse): void {
    this.store.dispatch({ type: OVERLAY_FINISH });
    this.store.dispatch({
      type: REGISTRATION_REQUEST_SUCCESS,
      payload: {
        data: JSON.stringify(data),
        error: null
      }
    });
  }
  // error handler
  public error(httpErrorResponse: HttpErrorResponse): void {
    this.store.dispatch({ type: OVERLAY_FINISH });
    this.store.dispatch({
      type: REGISTRATION_REQUEST_FAILURE,
      payload: {
        error: httpErrorResponse
      }
    });
  }
}
