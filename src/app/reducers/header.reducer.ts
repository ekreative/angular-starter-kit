import { ActionReducer } from '@ngrx/store';
import {
  Permissions,
  HeaderAction,
  OVERLAY_START,
  OVERLAY_FINISH,
  SHOW_HEADER,
  HIDE_HEADER
} from '../actions/header.action';
import update from 'immutability-helper';

const defaultState: Permissions = new Permissions();
// header reducer config
export const header: ActionReducer<any> = (state: Permissions = defaultState, action: HeaderAction) => {
  switch (action.type) {
    case OVERLAY_START:
      state = update(state, { $merge: { permissionOverlay: false }});
      return {
        ...state
      };
    case OVERLAY_FINISH:
      state = update(state, { $merge: { permissionOverlay: true }});
      return {
        ...state
      };
    case SHOW_HEADER:
      state = update(state, { $merge: { permissionHeader: true }});
      return {
        ...state
      };
    case HIDE_HEADER:
      state = update(state, { $merge: { permissionHeader: false }});
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
