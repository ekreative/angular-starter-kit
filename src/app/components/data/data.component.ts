import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { OVERLAY_START } from '../../actions/header.action';
import { Data, DATA_REQUEST } from '../../actions/data.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.template.html',
  styleUrls: ['./data.styles.scss']
})
export class DataComponent implements OnInit {

  public data: Observable<Data>;

  constructor(
      private _store: Store<State>
  ) {
    this.data = this._store.select('data');
  }

  public ngOnInit(): void {
    this._store.dispatch({ type: OVERLAY_START });
    this._store.dispatch({ type: DATA_REQUEST });
  }

}
