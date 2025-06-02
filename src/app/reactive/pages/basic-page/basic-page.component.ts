import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

const product = {
  name: '',
  price: 0,
  inStorage: 0
}

@Component({
  standalone: false,
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {


  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0, [], []),
  //   inStorage: new FormControl(0, [], []),
  // })

  fb = inject(FormBuilder);

  formUtils = FormUtils;

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    price: [0, [ Validators.required, Validators.min(0) ]],
    inStorage: [0, [ Validators.required, Validators.min(0) ]]
  });

  ngOnInit(): void {
    this.myForm.reset(product)
  }

  isValidField( field: string ): boolean | null {
    return this.formUtils.isValidField( this.myForm, field );
  }

  getFieldError( field: string ): string | null {
    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};
    for ( const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return "Este campo es Requerido";
        case 'minlength':
          return `Este campo requiere mínimo ${ errors['minlength'].requiredLength } caracteres`;
      }
    }
    return null;
  }

  onSave(): void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }


    this.myForm.reset({ price: 0, inStorage: 0 });
  };

}
