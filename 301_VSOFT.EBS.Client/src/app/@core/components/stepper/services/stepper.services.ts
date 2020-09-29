// own core modules
import {Injectable, OnDestroy, OnInit, QueryList} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {AimStepperStepComponent} from '@core/components/stepper/step/step.component';

@Injectable()
export class StepperService implements OnDestroy {
  private nextOfSubscriber = new Subject<any>();
  nextStep = this.nextOfSubscriber.asObservable();

  private previousOfSubscriber = new Subject<any>();
  previousStep = this.previousOfSubscriber.asObservable();


  totalSteps = 0;
  totalStepHeaders = 0;
  selectedStep = 0;

  stepsUrls = [];

  constructor(private router: Router) {

  }

  registerStep(url: string, stepComponent: AimStepperStepComponent) {
    return new Promise<number>((resolve) => {
      this.totalSteps += 1;

      this.stepsUrls.push({
        stepIndex: (this.totalSteps - 1),
        stepUrl: url,
        stepComp: stepComponent
      });

      resolve((this.totalSteps - 1));
    });
  }

  registerStepHeader() {
    return new Promise<number>((resolve) => {
      this.totalStepHeaders += 1;
      resolve((this.totalStepHeaders - 1));
    });
  }

  next() {
    if ((this.totalSteps - 1) > this.selectedStep) {
      this.selectedStep += 1;
    }

    this.redirectToView(this.selectedStep).then(() => {
      this.nextOfSubscriber.next();
    });
  }

  previous() {
    if (0 < this.selectedStep) {
      this.selectedStep -= 1;
    }

    this.redirectToView(this.selectedStep).then(() => {
      this.previousOfSubscriber.next();
    });
  }

  redirectToViewByUrl() {
    return new Promise((resolve) => {
      const step: any = this.stepsUrls.filter((obj: any) => {
        return obj.stepUrl === this.router.url;
      });

      if (step && step[0]) {
        if (step[0].stepIndex) {
          this.selectedStep = step[0].stepIndex;
          this.nextOfSubscriber.next();
          resolve();
        }
      }
    });
  }

  redirectToView(stepIndx) {
    return new Promise((resolve) => {
      const step: any = this.stepsUrls.filter((obj: any) => {
        return obj.stepIndex === stepIndx;
      });

      if (step && step[0]) {
        if (step[0].stepUrl) {
          this.router.navigateByUrl(step[0].stepUrl).then(() => {
            resolve();
          });
        }
      }
    });
  }

  checkIfPrevStepValid(steps: QueryList<AimStepperStepComponent>) {
    if (!steps) {
      return;
    }

    setTimeout(() => {
      let currentStep = 0;
      let prevStep = 0;

      if (currentStep !== this.selectedStep) {
        currentStep = this.selectedStep;
        prevStep = currentStep - 1;

        const step: any = steps.filter((obj: any) => {
          return obj.stepIndex === prevStep;
        });

        if (step && step[0]) {
          if (step[0].stepComponent && step[0].stepComponent.stepForm && !step[0].stepComponent.ifFormValid()) {
            this.selectedStep = step[0].stepIndex;
            this.router.navigateByUrl(step[0].stepUrl).then(() => {
              this.nextOfSubscriber.next();
            });
          }
        }
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.nextOfSubscriber) {
      this.nextOfSubscriber.unsubscribe();
    }

    if (this.previousOfSubscriber) {
      this.previousOfSubscriber.unsubscribe();
    }
  }
}
