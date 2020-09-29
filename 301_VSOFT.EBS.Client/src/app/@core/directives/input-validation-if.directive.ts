import {Attribute, Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[aimInputValidationIf]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => InputValidationIfDirective),
    multi: true
  }]
})
export class InputValidationIfDirective implements Validator {
  constructor(@Attribute('requiredif') public ifHasValue: string, @Attribute('isparen') public isParent: boolean = false) {
  }

  validate(c: AbstractControl): { [key: string]: any } {
    const hasValue = c.root.get(this.ifHasValue);

    if (!this.isParent) {
      // if other field has a value but the current field not
      if (hasValue && c && hasValue.value && !c.value) {
        return {
          requiredIf: true
        };
      }
    } else {
      // If parent has a value and the slave not
      if (c && c.value && hasValue && (hasValue.touched || hasValue.dirty)) {
        hasValue.markAsDirty();
        hasValue.markAsTouched();
        hasValue.updateValueAndValidity();
      } else if (c && !c.value && hasValue && (hasValue.touched || hasValue.dirty)){
        // If slave has a value put not paren
        hasValue.markAsDirty();
        hasValue.markAsTouched();
        hasValue.updateValueAndValidity();
      }
    }

    return null;
  }
}
