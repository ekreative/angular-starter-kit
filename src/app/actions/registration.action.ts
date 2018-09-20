import { Action } from '@ngrx/store';

export class Registration {
  private birthday: any;
  private phone: string;
  private email: string;
  private firstName: string;
  private password: string;
  private error?: any;
  private lastName: string;
}

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_REQUEST_SUCCESS = 'REGISTRATION_REQUEST_SUCCESS';
export const REGISTRATION_REQUEST_FAILURE = 'REGISTRATION_REQUEST_FAILURE';
export const REGISTRATION_REQUEST_CLEAN = 'REGISTRATION_REQUEST_CLEAN';
export const REGISTRATION_REQUEST_PROCESSING = 'REGISTRATION_REQUEST_PROCESSING';

export class RegistrationAction implements Action {
  public type;

  constructor(
    public payload: Registration
  ) {}
}
