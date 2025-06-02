import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  standalone: false,
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {


  fb = inject(FormBuilder);

  formUtils = FormUtils;

  public myForm: FormGroup = this.fb.group({
    gender: ['M', [ Validators.required ]],
    wantNotifications: [ true, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ],
  });

  public person = {
    gender: 'F',
    wantNotifications: false
  }

  ngOnInit(): void {
  this.myForm.reset( this.person );
  }

  isValidField( field: string ): boolean | null {
    return this.formUtils.isValidField( this.myForm, field );
  }
  
  onSave() {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;

    this.myForm.reset();
  }

}
