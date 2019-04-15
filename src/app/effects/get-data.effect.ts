import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { RequestService } from '../services/request.service';
import { GetOptions } from '../services/interfaces/request.interfaces';

import { State } from '../reducers';
import {
  DATA_REQUEST,
  DATA_REQUEST_SUCCESS,
  DATA_REQUEST_FAILURE } from '../actions/data.action';
import { OVERLAY_FINISH } from '../actions/header.action';
import { GetDataResponse } from './interfaces/data.interfaces';

@Injectable()
export class GetDataEffect {

  private options: GetOptions<GetDataResponse[]>;
  @Effect()
  public data$: Observable<any> = this.actions$
    .pipe(ofType(DATA_REQUEST))
    .pipe(
      mergeMap(action => {
        this.requestService.get<GetDataResponse[]>(this.options);
        return of({ type: 'DATA_REQUEST_PROCESSING' });
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
      url: '/users',
      handlers: {
        success: this.success.bind(this),
        error: this.error.bind(this)
      }
    };
  }
  // set data on success
  public success(data: GetDataResponse[]): void {
    this.store.dispatch({ type: OVERLAY_FINISH });
    this.store.dispatch({
      type: DATA_REQUEST_SUCCESS,
      payload: { data }
    });
  }
  // error handler
  public error(httpErrorResponse: HttpErrorResponse): void {
    this.store.dispatch({ type: OVERLAY_FINISH });
    this.store.dispatch({
      type: DATA_REQUEST_FAILURE,
      payload: {
        error: httpErrorResponse
      }
    });
  }
}
