import { Component, OnInit, OnDestroy, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import RegistrationModel from './registration.model';
import RegistrationForm from './registration.form';
import { BusService } from '../../services/bus.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'registration-component',
  templateUrl: './registration.template.html',
  styleUrls: ['./registration.styles.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  private model: RegistrationModel;
  public form: RegistrationForm;
  public loading = false;
  public isFormErrorMessage: boolean = false;

  constructor(
    private router: Router,
    private bus: BusService,
    private events: EventsService
  ) {
    this.model = new RegistrationModel();
    this.form = new RegistrationForm(this.model);
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

  // start registration request
  public registration(): void {
    this.bus.publish(this.events.requested.data.registration, this.form.model);
  }

  // subscribe on validation success/failure
  public subscribe(): void {
    //  this.bus.subscribe(this.events.received.validation.failure, this.invalidForm, this);
    //  this.bus.subscribe(this.events.received.validation.success, this.registration, this);
   }

   // unsubscribe on validation success/failure
   public unSubscribe(): void {
    //  this.bus.unsubscribe(this.events.received.validation.failure, this.invalidForm);
    //  this.bus.unsubscribe(this.events.received.validation.success, this.registration);
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
