import { ActionReducer } from '@ngrx/store';
import {
  Login,
  LoginAction,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  LOGIN_REQUEST_PROCESSING,
  LOGIN_REQUEST_CLEAN } from '../actions/login.action';
import update from 'immutability-helper';

export const defaultLoginState: Login = new Login();
// login reducer config
export const login: ActionReducer<any> = (state: Login = defaultLoginState, action: LoginAction) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return action.payload;
    case LOGIN_REQUEST_PROCESSING:
      return {
        ...state
      };
    case LOGIN_REQUEST_SUCCESS:
      // localStorage.setItem('currentUser', action.payload['data']);
      // localStorage.setItem('currentUserToken', action.payload['token']);
      return {
        ...action.payload
      };
    case LOGIN_REQUEST_FAILURE:
      state = update(state, { $merge: action.payload});
      return {
        ...state
      };
    case LOGIN_REQUEST_CLEAN:
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
