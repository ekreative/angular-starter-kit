import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/index';
import {OVERLAY_START} from '../../actions/header.action';
import {DATA_REQUEST} from '../../actions/data.action';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.template.html',
  styleUrls: ['./data.styles.scss']
})
export class DataComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public data$: Observable<any>;
  public data: any = [];

  constructor(
      private _store: Store<State>
  ) {
    this.data$ = this._store.select('data');
    this.subscription = this.data$.subscribe(data => {
      if (data) this.data = data.data;
    });
  }

  public ngOnInit(): void {
    // this.store.dispatch({ type: OVERLAY_START });
    this._store.dispatch({ type: DATA_REQUEST });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
