import { ActionReducer } from '@ngrx/store';
import {
  Data,
  DataAction,
  DATA_REQUEST,
  DATA_REQUEST_SUCCESS,
  DATA_REQUEST_FAILURE,
  DATA_REQUEST_PROCESSING,
  DATA_REQUEST_CLEAN } from '../actions/data.action';
import update from 'immutability-helper';

export const defaultDataState: Data = new Data();
// data reducer config
export const data: ActionReducer<any> = (state: Data = defaultDataState, action: DataAction) => {
  switch (action.type) {
    case DATA_REQUEST:
      return action.payload;
    case DATA_REQUEST_PROCESSING:
      return {
        ...state
      };
    case DATA_REQUEST_SUCCESS:
      return action.payload;
    case DATA_REQUEST_FAILURE:
      state = update(state, { $merge: action.payload});
      return {
        ...state
      };
    case DATA_REQUEST_CLEAN:
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
