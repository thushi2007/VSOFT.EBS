// core modules
import {Directive, forwardRef} from '@angular/core';
import {Validator, AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

// own services
import {AuthService} from '../services/auth.service';

@Directive({
  selector: '[aimUserNotExistValidation]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: forwardRef(() => UserNotExistValidationDirective),
    multi: true
  }]
})
export class UserNotExistValidationDirective implements Validator {
  constructor(private authService: AuthService) {
  }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.authService.checkIfUserExists(c.value)
      .pipe(map((data: any) => {
        if (data.UserExists === false) {
          return {notuser: true};
        }
        return null;
      }));
  }
}
