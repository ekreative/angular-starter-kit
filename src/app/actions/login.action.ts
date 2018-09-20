import { Action } from '@ngrx/store';

export class Login {
  private username?: string;
  private password?: string;
  private token?: string;
  private data?: any;
  private error?: any;
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_PROCESSING = 'LOGIN_REQUEST_PROCESSING';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILURE = 'LOGIN_REQUEST_FAILURE';
export const LOGIN_REQUEST_CLEAN = 'LOGIN_REQUEST_CLEAN';

export class LoginAction implements Action {
  public type;

  constructor(
    public payload: Login
  ) {}
}
