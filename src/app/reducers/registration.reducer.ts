import { ActionReducer } from '@ngrx/store';
import {
  Registration,
  RegistrationAction,
  REGISTRATION_REQUEST,
  REGISTRATION_REQUEST_FAILURE,
  REGISTRATION_REQUEST_SUCCESS,
  REGISTRATION_REQUEST_PROCESSING,
  REGISTRATION_REQUEST_CLEAN } from '../actions/registration.action';
import update from 'immutability-helper';

export const defaultRegistrationState: Registration = new Registration();
// registration reducer config
export const registration: ActionReducer<any> = (state: Registration = defaultRegistrationState, action: RegistrationAction) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return action.payload;
    case REGISTRATION_REQUEST_PROCESSING:
      return {
        ...state
      };
    case REGISTRATION_REQUEST_SUCCESS:
      state = update(state, { $merge: action.payload});
      return {
        ...state
      };
    case REGISTRATION_REQUEST_FAILURE:
      state = update(state, { $merge: action.payload});
      return {
        ...state
      };
    case REGISTRATION_REQUEST_CLEAN:
      state = update(state, { $merge: action.payload});
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
