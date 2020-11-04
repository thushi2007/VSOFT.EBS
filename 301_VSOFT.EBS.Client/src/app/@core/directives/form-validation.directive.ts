import {Directive, HostListener} from '@angular/core';
import {combineLatest, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {NgForm} from '@angular/forms';

@Directive({
  selector: '[ebsFormValidation]'
})
export class FormValidationDirective {

  get isValid(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.submitForm().then((result) => {
        resolve(result);
      });
    });
  }

  constructor(public formGroup: NgForm) {
  }

  @HostListener('keydown.enter', ['$event'])
  onKeyDown(e): any {
    this.submitForm().then((result) => {
      return result;
    });
  }

  submitForm(): Promise<any> {
    const syncValidationErrors = Object.keys(this.formGroup.controls).map(c => {
      const control = this.formGroup.controls[c];
      return !control.validator ? null : control.validator(control);
    }).filter(errors => !!errors);
    return combineLatest(Object.keys(this.formGroup.controls).map(c => {
      const control = this.formGroup.controls[c];
      return !control.asyncValidator ? of(null) : control.asyncValidator(control);
    })).pipe(
      map(asyncValidationErrors => {
        const hasErrors = [...syncValidationErrors, ...asyncValidationErrors.filter(errors => !!errors)].length;
        Object.keys(this.formGroup.controls).forEach(key => {
          this.formGroup.controls[key].markAsDirty();
          this.formGroup.controls[key].markAsTouched();
          this.formGroup.controls[key].updateValueAndValidity();
        });
        return !hasErrors;
      })).toPromise();
  }

  resetForm(): void {
    if (this.formGroup) {
      Object.keys(this.formGroup.controls).forEach((name: string) => {
        this.formGroup.controls[name].reset();
        this.formGroup.controls[name].markAsPristine();
        this.formGroup.controls[name].markAsUntouched();
        this.formGroup.controls[name].updateValueAndValidity();
      });
    }
  }
}
