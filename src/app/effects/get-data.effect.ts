import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RequestService } from '../services/request.service';
import { GetOptions } from '../services/interfaces/request.interfaces';

import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { State } from '../reducers';
import {
  DataAction,
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
    .ofType(DATA_REQUEST)
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
