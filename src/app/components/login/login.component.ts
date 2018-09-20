import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import LoginModel from './login.model';
import LoginForm from './login.form';
import { State } from '../../reducers';
import { SHOW_HEADER, OVERLAY_START } from '../../actions/header.action';
import { Login, LOGIN_REQUEST } from '../../actions/login.action';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.template.html',
  styleUrls: ['./login.styles.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private model: LoginModel;
  public form: LoginForm;
  public isFormErrorMessage: boolean = false;

  constructor(
    private store: Store<State>,
    private router: Router
  ) {
    this.model = new LoginModel();
    this.form = new LoginForm(this.model);
  }

  // start form validation (to show what is wrong)
  private invalidForm(): void {
    this.form.validate();
    this.isFormErrorMessage = true;
  }

  // start login request
  public login(): void {
    this.store.dispatch({ type: OVERLAY_START });
    this.store.dispatch({
      type: LOGIN_REQUEST,
      payload: this.form.model
    });
  }

  // make subscribe on a component initialization
  public ngOnInit(): void {}

  // make unsubscribe before destroying component
  public ngOnDestroy(): void {}
}
