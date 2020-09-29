import {Attribute, Directive, HostListener, Inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {StepperService} from '@core/components/stepper/services/stepper.services';
import {DOCUMENT} from '@angular/common';

@Directive({
  selector: '[stepperNext]'
})
export class StepperNextDirective {
  @Input() autoAction = true;

  @HostListener('click') onClick() {
    if (this.autoAction === true) {
      this.nextStep();
    }
  }

  constructor(private stepperService: StepperService, @Inject(DOCUMENT) private document: Document) {
  }

  nextStep() {
    this.stepperService.next();
  }
}
