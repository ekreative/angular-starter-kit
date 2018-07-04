import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import LoginModel from './login.model';

/*
  ReactiveForm structure class
*/
export default class RegistrationForm {
  private formBuilder: FormBuilder;
  public formGroup: FormGroup;
  public model: LoginModel;

  constructor(model: LoginModel) {
    this.formBuilder = new FormBuilder();
    this.model = model;
    this.createForm();
  }
  // set form fields with validation rules
  public createForm() {
    this.formGroup = this.formBuilder.group({
      practitionerFirstName: new FormControl(this.model.practitionerFirstName, [Validators.required]),
      practitionerSurName: new FormControl(this.model.practitionerSurName, [Validators.required]),
      password: new FormControl(this.model.password, [Validators.required, Validators.minLength(8)]),
    });
    this.formGroup.valueChanges.subscribe(data => {
      this.model.practitionerFirstName = data.practitionerFirstName;
      this.model.practitionerSurName = data.practitionerSurName;
      this.model.password = data.password;
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
  get formData(): LoginModel {
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
