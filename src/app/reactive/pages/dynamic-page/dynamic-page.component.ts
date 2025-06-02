import { Component, inject, NgModule } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  standalone: false,
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  fb = inject(FormBuilder);

  formUtils = FormUtils;
  
  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ]),
  });

  public newFavorite: FormControl = new FormControl('', [ Validators.required ]);

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ): boolean | null {
    return this.formUtils.isValidField( this.myForm, field );
  }

  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors
      && formArray.controls[index]. touched;

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

  onAddToFavorites(): void {
    if( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();
  }

  onDeleteFavorite( index: number ): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

}
