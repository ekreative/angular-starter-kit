import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import RegistrationModel from './registration.model';
import { format } from 'date-fns';

/*
  ReactiveForm structure class
*/
export default class RegistrationForm {
  private formBuilder: FormBuilder;
  public formGroup: FormGroup;
  public model: RegistrationModel;

  constructor(model: RegistrationModel) {
    this.formBuilder = new FormBuilder();
    this.model = model;
    this.createForm();
  }

  public createForm(): void {
    this.formGroup = this.formBuilder.group({
      practitionerFirstName: new FormControl(this.model.practitionerFirstName, [Validators.required]),
      practitionerLastName: new FormControl(this.model.practitionerLastName, [Validators.required]),
      practitionerSurName: new FormControl(this.model.practitionerSurName, [Validators.required]),
      practitionerDateBirth: new FormControl(this.model.practitionerDateBirth, [Validators.required]),
      practitionerSex: new FormControl(this.model.practitionerSex, [Validators.required]),
      practitionerPosition: new FormControl(this.model.practitionerPosition, [Validators.required]),
      password: new FormControl(this.model.password, [Validators.required, Validators.minLength(8)]),
      practitionerEmail: new FormControl(this.model.practitionerEmail, [Validators.email])
    });
    this.formGroup.valueChanges.subscribe(data => {
      this.model.practitionerFirstName = data.practitionerFirstName;
      this.model.practitionerLastName = data.practitionerLastName;
      this.model.practitionerSurName = data.practitionerSurName;
      this.model.practitionerDateBirth = format(data.practitionerDateBirth, 'YYYY-MM-DD');
      this.model.practitionerSex = data.practitionerSex;
      this.model.practitionerPosition = data.practitionerPosition;
      this.model.password = data.password;
      this.model.practitionerEmail = data.practitionerEmail;
    });
  }

  // form update
  public patchForm(data: any): void {
    this.formGroup.patchValue(data);
    Object.keys(data).forEach(field => {
      this.model[field] = data[field];
    });
  }

  // get form property name
  public getControl(name: string) {
    return this.formGroup.get(name);
  }

  // get form validation status
  get isValid() {
    return this.formGroup.valid;
  }

  // get group value
  get formData(): RegistrationModel {
    return this.formGroup.getRawValue();
  }

  // start form validation
  public validate(): void {
    this.validateFormFields(this.formGroup);
  }

  // form validation functionality
  public validateFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateFormFields(control);
      }
    });
  }
}
