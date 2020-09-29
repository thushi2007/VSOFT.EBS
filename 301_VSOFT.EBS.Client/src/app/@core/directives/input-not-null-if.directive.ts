import {Attribute, Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[ebsInputNotNullIf]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => InputNotNullIfDirective),
    multi: true
  }]
})
export class InputNotNullIfDirective implements Validator {
  constructor(@Attribute('requiredifEmpty') public requiredifEmpty: string, @Attribute('isparent') public isParent: boolean = false) {
  }

  validate(c: AbstractControl): { [key: string]: any } {
    const hasValue = c.root.get(this.requiredifEmpty);

    if (!this.isParent) {
      // if other field has a value but the current field not
      if (hasValue && c && !hasValue.value && !c.value) {
        return {
          requiredIfNotNull: true
        };
      }
    } else {
      // If parent has a value and the slave not
      if (c && !c.value && !hasValue && (hasValue.touched || hasValue.dirty)) {
        hasValue.markAsDirty();
        hasValue.markAsTouched();
        hasValue.updateValueAndValidity();
      } else if (c && c.value && !hasValue && (hasValue.touched || hasValue.dirty)){
        // If slave has a value put not parent
        hasValue.markAsDirty();
        hasValue.markAsTouched();
        hasValue.updateValueAndValidity();
      }
    }

    return null;
  }
}
