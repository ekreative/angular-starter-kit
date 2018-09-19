import { Action } from '@ngrx/store';

export class Data {
  public data?: any;
}

export const DATA_REQUEST = 'DATA_REQUEST';
export const DATA_REQUEST_PROCESSING = 'DATA_REQUEST_PROCESSING';
export const DATA_REQUEST_SUCCESS = 'DATA_REQUEST_SUCCESS';
export const DATA_REQUEST_FAILURE = 'DATA_REQUEST_FAILURE';
export const DATA_REQUEST_CLEAN = 'DATA_REQUEST_CLEAN';

export class DataAction implements Action {
  public type;

  constructor(
    public payload: Data
  ) {}
}
