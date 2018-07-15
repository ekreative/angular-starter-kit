import { Action } from '@ngrx/store';

export class Permissions {
  private permissionOverlay: boolean = true;
  private permissionHeader: boolean = true;
}

export const OVERLAY_START = 'OVERLAY_START';
export const OVERLAY_FINISH = 'OVERLAY_FINISH';
export const SHOW_HEADER = 'SHOW_HEADER';
export const HIDE_HEADER = 'HIDE_HEADER';

export class HeaderAction implements Action {
  public type;

  constructor(
    public payload: Permissions
  ) {}
}
