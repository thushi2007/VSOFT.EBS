import {Directive, HostListener, Inject} from '@angular/core';
import {StepperService} from '@core/components/stepper/services/stepper.services';
import {DOCUMENT} from '@angular/common';

@Directive({
  selector: '[stepperPrevious]'
})
export class StepperPreviousDirective {
  @HostListener('click') onClick() {
    this.stepperService.previous();
  }

  constructor(private stepperService: StepperService) {
  }
}
