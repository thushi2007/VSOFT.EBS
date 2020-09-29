import {Directive, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[ebsInputValidation]'
})
export class InputValidationDirective implements OnChanges {
  @Input() update: boolean;

  @HostListener('focus') onFocus(): any {
    this.updateValidation();
  }

  @HostListener('change') onChange(): any {
    this.updateValidation();
  }

  @HostListener('blur') onBlur(): any {
    this.updateValidation();
  }

  updateValidation(): void {
    this.formControl.control.markAsTouched();
    this.formControl.control.markAsDirty();
    this.formControl.control.updateValueAndValidity();
  }

  constructor(public formControl: NgControl) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.update) {
      this.updateValidation();
    }
  }
}
