import {Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {animate, animateChild, group, query, state, style, transition, trigger} from '@angular/animations';
import {MessagerComponent} from '@core/components/messager/messager.component';
import {FormValidationDirective} from '@core/directives/form-validation.directive';
import {PromiseButtonComponent} from '@core/components/promise-button/promise-button.component';
import {AccordionService} from '@core/components/accordion/services/accordion.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ebs-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  animations: [
    trigger('selectedNot', [
      state('0', style({
        color: '#000000',
        background: '#dddddd'
      })),
      state('1', style({
        background: '#0049b1',
        color: '#ffffff'
      })),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('300ms'))
    ]),
    trigger('rotateUpDown', [
      state('0', style({
        transform: 'rotate(0)'
      })),
      state('1', style({
        transform: 'rotate(-180deg)'
      })),
      transition('1 => 0', animate('300ms ease-out')),
      transition('0 => 1', animate('300ms ease-in'))
    ]),
    trigger('slideInOut', [
      state('0', style({
        height: '65px'
      })),
      state('1', style({
        height: '*'
      })),
      transition('1 => 0', [
        group([
          query('@rotateUpDown', animateChild()),
          animate('300ms ease-out')
        ])
      ]),
      transition('0 => 1', [
        group([
          query('@rotateUpDown', animateChild()),
          animate('300ms ease-in')
        ])
      ])
    ])
  ]
})
export class AccordionItemComponent implements OnInit, OnDestroy {
  @ViewChild('itemMsg', {static: true}) msg: MessagerComponent;
  @ContentChild(FormValidationDirective, {static: true}) stepForm: FormValidationDirective;
  @ViewChild('btnNext', {static: false}) btnNext: PromiseButtonComponent;

  @Input() title: string;

  @Output() actiontorfire: EventEmitter<any> = new EventEmitter<any>();
  private isactiontorfireUsed = false;

  stateOpenClose = false;
  stateRotateUpDown = false;

  itemIndex = 0;

  nextSubscription: Subscription;
  previousSubscription: Subscription;
  updateSubscription: Subscription;
  resetSubscription: Subscription;

  get iamFirst(): boolean {
    return this.itemIndex === 0;
  }

  get iamLast(): boolean {
    return this.itemIndex === (this.accordionService.totalSteps - 1);
  }

  get iamSelected(): boolean {
    return this.accordionService.selectedStep === this.itemIndex;
  }

  constructor(private accordionService: AccordionService) {

  }

  ngOnInit(): void {
    this.accordionService.registerItem(this.stepForm).then((indx) => {
      this.itemIndex = indx;
    }).then(() => {
      this.checkIfIselected();
      this.isactiontorfireUsed = this.actiontorfire.observers.length > 0;
    });

    this.nextSubscription = this.accordionService.nextStep.subscribe(() => {
      this.checkIfIselected();
    });

    this.previousSubscription = this.accordionService.previousStep.subscribe(() => {
      this.checkIfIselected();
    });

    this.updateSubscription = this.accordionService.updateForm.subscribe((indx) => {
      this.checkIfSelectedItemFormIsValid(indx);
    });

    this.resetSubscription = this.accordionService.resetForm.subscribe(() => {
      this.reset();
    });
  }

  checkIfSelectedItemFormIsValid(indx: number): void {
    if (indx === this.itemIndex) {
      this.stepForm.isValid.then((valid) => {
        if (valid) {
          this.msg.hide();
        } else {
          this.msg.popErrorMessage('Fehler', 'Bitte füllen Sie alle nötigen Felder aus.');
        }
      });
    } else {
      this.msg.hide();
    }
  }

  checkIfIselected(): void {
    if (this.accordionService.selectedStep === this.itemIndex) {
      this.stateRotateUpDown = true;
      this.stateOpenClose = true;
    } else {
      this.stateRotateUpDown = false;
      this.stateOpenClose = false;
    }
  }

  openCloseContent(): void {
    this.accordionService.checkIfAllPrevItemsValid(this.itemIndex).then((indx) => {
      if (indx === this.itemIndex) {
        this.accordionService.select(this.itemIndex);
      }
    }, error => {
      console.log(error);
    });
  }

  reset(): void {
    this.stepForm.resetForm();
  }

  back(): void {
    this.accordionService.previous();
  }

  next(): void {
    if (this.isactiontorfireUsed) {
      this.actiontorfire.emit(this.btnNext);
      // this.btnNext.promise_function.then(() => {
      //   this.accordionService.reset();
      //   this.scrolltoTop.toTop();
      // });
    } else {
      this.btnNext.promiseFunction = this.stepForm.isValid.then((valid) => {
        if (valid) {
          this.msg.hide();
          this.accordionService.next();
        } else {
          this.msg.popErrorMessage('Fehler', 'Bitte füllen Sie alle nötigen Felder aus.');
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.nextSubscription) {
      this.nextSubscription.unsubscribe();
    }

    if (this.previousSubscription) {
      this.previousSubscription.unsubscribe();
    }

    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }

    if (this.resetSubscription) {
      this.resetSubscription.unsubscribe();
    }
  }
}
