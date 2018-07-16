import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RequestService } from '../services/request.service';
import { PostOptions } from '../services/interfaces/request.interfaces';

import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { State } from '../reducers/index';
import {
  LoginAction,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE } from '../actions/login.action';
import { OVERLAY_FINISH } from '../actions/header.action';
import { PostCredentialsRequest, PostCredentialsResponse } from './interfaces/login.interfaces'

@Injectable()
export class LoginEffect {

  private options: PostOptions<PostCredentialsRequest, PostCredentialsResponse>;
  // login request
  @Effect()
  public login$: Observable<any> = this.actions$
    .ofType(LOGIN_REQUEST)
    .pipe(
      mergeMap(action => {
        this.options.body.email = action['payload']['email'];
        this.options.body.password = action['payload']['password'];
        this.requestService.post<PostCredentialsRequest, PostCredentialsResponse>(this.options);
        return of({ type: 'LOGIN_REQUEST_PROCESSING' });
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
      url: '/login',
      body: {
        email: '',
        password: ''
      },
      handlers: {
        success: this.success.bind(this),
        error: this.error.bind(this)
      }
    };
  }
  // set data on success
  public success(data: PostCredentialsResponse): void {
    this.store.dispatch({ type: OVERLAY_FINISH });
    this.store.dispatch({
      type: LOGIN_REQUEST_SUCCESS,
      payload: {}
    });
  }
  // error handler
  public error(httpErrorResponse: HttpErrorResponse): void {
    this.store.dispatch({ type: OVERLAY_FINISH });
    this.store.dispatch({
      type: LOGIN_REQUEST_FAILURE,
      payload: {
        error: httpErrorResponse
      }
    });
  }
}
