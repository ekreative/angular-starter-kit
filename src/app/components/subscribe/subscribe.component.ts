import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { OVERLAY_START } from '../../actions/header.action';
import { Data, DATA_REQUEST } from '../../actions/data.action';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.template.html',
  styleUrls: ['./subscribe.styles.scss']
})
export class SubscribeComponent implements OnInit, OnDestroy {

  public data$: Observable<Data>;
  private subscription: Subscription;
  public data: any = [];

  constructor(
      private _store: Store<State>
  ) {
    this.data$ = this._store.select('data');
    this.subscription = this.data$
    .subscribe((data: Data) => {
      if (data) {
        this.data = data.data;
      }
    });
  }

  public ngOnInit(): void {
    this._store.dispatch({ type: OVERLAY_START });
    this._store.dispatch({ type: DATA_REQUEST });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
