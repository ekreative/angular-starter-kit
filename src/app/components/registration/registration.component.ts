import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import RegistrationModel from './registration.model';
import RegistrationForm from './registration.form';
import { State } from '../../reducers';
import { SHOW_HEADER, OVERLAY_START } from '../../actions/header.action';
import { Registration, REGISTRATION_REQUEST } from '../../actions/registration.action';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration.template.html',
  styleUrls: ['./registration.styles.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  private model: RegistrationModel;
  public form: RegistrationForm;
  public isFormErrorMessage: boolean = false;

  constructor(
    private store: Store<State>,
    private router: Router
  ) {
    this.model = new RegistrationModel();
    this.form = new RegistrationForm(this.model);
  }

  // start form validation (to show what is wrong)
  private invalidForm(): void {
    this.form.validate();
    this.isFormErrorMessage = true;
  }

  // start registration request
  public registration(): void {
    this.store.dispatch({ type: OVERLAY_START });
    this.store.dispatch({
      type: REGISTRATION_REQUEST,
      payload: this.form.model
    });
  }

   // make subscribe on a component initialization
   public ngOnInit(): void {}

   // make unsubscribe before destroying component
   public ngOnDestroy(): void {}

}
