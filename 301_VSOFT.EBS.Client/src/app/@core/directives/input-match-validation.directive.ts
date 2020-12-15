import {Attribute, Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[ebsInputMatchValidation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => InputMatchValidationDirective),
    multi: true
  }]
})
export class InputMatchValidationDirective implements Validator {

  constructor(@Attribute('match') public validateEqual: string) {
  }

  validate(c: AbstractControl): { [key: string]: any } {
    const v = c.value;
    const e = c.root.get(this.validateEqual);

    if (e && e.value && c.value && e.value !== c.value && e.valid) {
      e.setErrors({match: true});
    }
    if (e && e.value && c.value && e.value === c.value && c.valid && e.invalid) {
      e.updateValueAndValidity();
    }

    // value not equal
    if (e && v !== e.value) {
      return {
        match: true
      };
    }

    return null;
  }
}
