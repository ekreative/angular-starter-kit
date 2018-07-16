import { Action } from '@ngrx/store';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_REQUEST_PROCESSING = 'LOGOUT_REQUEST_PROCESSING';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_FAILURE = 'LOGOUT_REQUEST_FAILURE';

export class LogoutAction implements Action {
  public type;

  constructor() {}
}
