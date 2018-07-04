import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BusService } from "../../services/bus.service";
import { EventsService } from "../../services/events.service";
import LoginModel from './login.model';
import LoginForm from "./login.form";

@Component({
  selector: 'app-login-component',
  templateUrl: './login.template.html',
  styleUrls: ['./login.styles.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private model: LoginModel;
  public form: LoginForm;
  public loading: boolean = false;
  public isFormErrorMessage: boolean = false;

  constructor(
    private router: Router,
    private bus: BusService,
    private events: EventsService
  ) {
    this.model = new LoginModel();
    this.form = new LoginForm(this.model);
  }

  // start form validation (to show what is wrong)
  private invalidForm(): void {
    this.form.validate();
    this.isFormErrorMessage = true;
  }

  // start validation functionality
  private submit(): void {
    // this.bus.publish(this.events.notified.validation.form.aggregation, this.form.isValid);
    // this.bus.publish(this.events.notified.validation.form.action);
  }

  // start login request
  public login(): void {
    this.bus.publish(this.events.requested.data.authentication, this.form.model);
  }

  // subscribe on validation success/failure
  public subscribe(): void {
    // this.bus.subscribe(this.events.received.validation.failure, this.invalidForm, this);
    // this.bus.subscribe(this.events.received.validation.success, this.login, this);
  }

  // unsubscribe on validation success/failure
  public unSubscribe(): void {
    // this.bus.unsubscribe(this.events.received.validation.failure, this.invalidForm);
    // this.bus.unsubscribe(this.events.received.validation.success, this.login);
  }

  // make subscribe on a component initialization
  public ngOnInit(): void {
    this.subscribe();
  }

  // make unsubscribe before destroying component
  public ngOnDestroy(): void {
    this.unSubscribe();
  }
}
