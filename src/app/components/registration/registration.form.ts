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
      firstName: new FormControl(this.model.firstName, [Validators.required]),
      lastName: new FormControl(this.model.lastName, [Validators.required]),
      birthday: new FormControl(this.model.birthday, [Validators.required]),
      phone: new FormControl(this.model.phone, [Validators.required]),
      password: new FormControl(this.model.password, [Validators.required, Validators.minLength(8)]),
      email: new FormControl(this.model.email, [Validators.email])
    });
    this.formGroup.valueChanges.subscribe(data => {
      this.model.firstName = data.firstName;
      this.model.lastName = data.lastName;
      this.model.password = data.password;
      this.model.phone = format(data.phone, 'YYYY-MM-DD');
      this.model.email = data.email;
      this.model.birthday = data.birthday;
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
