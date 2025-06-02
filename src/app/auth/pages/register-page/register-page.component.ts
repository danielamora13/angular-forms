import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../shared/validators/validators.helpers';
import { FormUtils } from '../../../utils/form-utils';


@Component({
  standalone: false,
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  fb = inject(FormBuilder);

  formUtils = FormUtils;

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.formUtils.firstNameAndLastnamePattern) ]],
    email: [
      '',
      [ Validators.required, Validators.pattern(this.formUtils.emailPattern) ],
      [ this.formUtils.checkingServerResponse ]
    ],
    username: ['', [ Validators.required, this.formUtils.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  },
  {
    validators: [
      FormUtils.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  isValidField( field: string ) {
    return this.formUtils.isValidField( this.myForm, field );
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
