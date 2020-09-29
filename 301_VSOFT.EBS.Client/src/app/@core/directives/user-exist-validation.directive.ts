import {Directive, forwardRef} from '@angular/core';
import {Validator, AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Directive({
  selector: '[aimUserExistValidation]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: forwardRef(() => UserExistValidationDirective),
    multi: true
  }]
})
export class UserExistValidationDirective implements Validator {
  constructor(private authService: AuthService) {
  }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.authService.checkIfUserExists(c.value)
      .pipe(map((data: any) => {
        if (data.UserExists === true) {
          return {user: true};
        }
        return null;
      }));
  }
}
