import {
  StoreModule,
  Store,
  ActionReducerMap,
  compose,
  combineReducers } from '@ngrx/store';
import { InjectionToken } from '@angular/core';

import * as loginReducer from './login.reducer';
import * as logoutReducer from './logout.reducer';
import * as registrationReducer from './registration.reducer';
import * as headerReducer from './header.reducer';

export class State {
  public login: any;
  public logout: any;
  public registration: any;
  public header: any;
}
// collect all reducers
export const Reducers = {
  login: loginReducer.login,
  logout: logoutReducer.logout,
  registration: registrationReducer.registration,
  header: headerReducer.header
};
