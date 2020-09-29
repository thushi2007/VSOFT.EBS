// own core modules
import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {FormValidationDirective} from '@core/directives/form-validation.directive';

@Injectable({
  providedIn: 'root'
})
export class AccordionService implements OnDestroy {
  private nextOfSubscriber = new Subject<any>();
  nextStep = this.nextOfSubscriber.asObservable();

  private previousOfSubscriber = new Subject<any>();
  previousStep = this.previousOfSubscriber.asObservable();

  private updateFormOfSubscriber = new Subject<any>();
  updateForm = this.updateFormOfSubscriber.asObservable();

  private resetFormOfSubscriber = new Subject<any>();
  resetForm = this.resetFormOfSubscriber.asObservable();

  totalSteps = 0;
  selectedStep = 0;
  accordionItems = [];

  constructor() {
  }

  /*
  * resetting all step settings
  * **/
  // reset() {
  //   this.totalSteps = 0;
  //   this.selectedStep = 0;
  //   this.accordionItems = [];
  // }

  /*
  * register a step on the service
  * **/
  registerItem(itemStep: FormValidationDirective): Promise<any> {
    return new Promise<number>((resolve) => {
      this.totalSteps += 1;

      this.accordionItems.push({
        index: (this.totalSteps - 1),
        form: itemStep
      });

      resolve((this.totalSteps - 1));
    });
  }

  /*
  * checking all previous steps they are valid.
  * If not then select the last invalid step.
  * **/
  checkIfAllPrevItemsValid(indx: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const subPromises = [];

      for (let cr = 0; cr <= indx; cr++) {
        subPromises.push(this.accordionItems[cr].form.isValid);
      }

      let breakout = false;

      // Check all previous form if they are valid
      Promise.all(subPromises).then((valid) => {
        valid.forEach((itm, index) => {
          if (breakout === false && itm === false) {
            breakout = true;
            // select first invalid step in the previous items list
            this.selectedStep = index;
            this.nextOfSubscriber.next();
            this.updateSelectedForm(index);

            // tell the iniziator the step id which is invalid before
            resolve(index);
          }
        }, error => {
          reject(error);
        });
      }).then(() => {
        if (breakout === false) {
          resolve(indx);
        }
      });
    });
  }

  /*
  * selecting a specific step
  * **/
  select(indx: number): void {
    this.selectedStep = indx;
    this.nextOfSubscriber.next();
  }

  reset(): void {
    this.selectedStep = 0;
    this.resetFormOfSubscriber.next();
    this.nextOfSubscriber.next();
  }

  /*
  * stepping forward to next step
  * **/
  next(): void {
    if ((this.totalSteps - 1) > this.selectedStep) {
      this.selectedStep += 1;
    }

    this.nextOfSubscriber.next();
  }

  /*
  * update the form of the current step
  * **/
  updateSelectedForm(stepIndx: number): void {
    this.updateFormOfSubscriber.next(stepIndx);
  }

  /*
  * stepping back to a previous step
  * **/
  previous(): void {
    if (0 < this.selectedStep) {
      this.selectedStep -= 1;
    }

    this.previousOfSubscriber.next();
  }

  ngOnDestroy(): void {
    if (this.updateForm) {
      this.updateFormOfSubscriber.unsubscribe();
    }

    if (this.nextOfSubscriber) {
      this.nextOfSubscriber.unsubscribe();
    }

    if (this.previousOfSubscriber) {
      this.previousOfSubscriber.unsubscribe();
    }

    if (this.resetFormOfSubscriber) {
      this.resetFormOfSubscriber.unsubscribe();
    }
  }
}
