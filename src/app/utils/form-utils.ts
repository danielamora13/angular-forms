import { AbstractControl, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {
  return new Promise( resolve => {
    setTimeout( () => {
      resolve(true);
    }, 2500);
    });
}

export class FormUtils {

  public static firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public static emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public static cantBeStrider = ( control: FormControl ): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if ( value === 'strider' ){
      return {
        noStrider: true
      };
    }

    return null;
  }

  public static isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  static async checkingServerResponse( control: AbstractControl ): Promise<ValidationErrors | null> {

    await sleep();

    const formValue = control.value;

    if ( formValue === 'hola@mundo.com' ) {
      return {
        emailTaken: true,
      }
    }


    return null;
  }


  public static isFieldOneEqualFieldTwo( field1: string, field2: string) {

    return ( formGroup: AbstractControl ) => {

      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null: { passwordNotEqual: true }
    }

  }
}
