import {ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

export abstract class BaseStepComponent {
  @ViewChild('stepForm', {static: true}) stepForm: NgForm;

  ifFormValid() {
    return this.stepForm && this.stepForm.valid;
  }
}
