import { ActionReducer } from '@ngrx/store';
import {
  LogoutAction,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_FAILURE,
  LOGOUT_REQUEST_SUCCESS,
  LOGOUT_REQUEST_PROCESSING } from '../actions/logout.action';

export const defaultLogoutState: any = {};
// logout reducer config
export const logout: ActionReducer<any> = (state: any = defaultLogoutState, action: LogoutAction) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return action;
    case LOGOUT_REQUEST_PROCESSING:
      return {
        ...state
      };
    case LOGOUT_REQUEST_SUCCESS:
      return {
        ...state
      };
    case LOGOUT_REQUEST_FAILURE:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
