import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GetDataEffect } from './app.effects';

describe('GetDataEffect', () => {
  let actions$: Observable<any>;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetDataEffect,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(GetDataEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
