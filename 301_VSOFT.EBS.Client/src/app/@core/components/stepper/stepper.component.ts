import {AfterContentInit, AfterViewInit, Component, ContentChildren, Input, OnDestroy, OnInit, QueryList} from '@angular/core';
import {StepperService} from '@core/components/stepper/services/stepper.service';
import {NavigationEnd, Router} from '@angular/router';
import {StepComponent} from '@core/components/stepper/step/step.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ebs-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [StepperService]
})
export class StepperComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  @Input() steps: any;
  private routerSubscription: Subscription;

  @ContentChildren(StepComponent, {descendants: true}) stepsComps: QueryList<StepComponent>;

  headerWidth: number;

  constructor(private stepperService: StepperService, private router: Router) {
    this.routerSubscription = this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.stepperService.checkIfPrevStepValid(this.stepsComps);
        }
      });
  }

  ngOnInit(): void {
    this.stepperService.reset();
    this.headerWidth = 100 / this.steps.length;
  }

  ngAfterContentInit(): void {
    // this.stepperService.redirectToViewByUrl().then((indx: AimStepperStepComponent) => {
    //   //console.log(indx.isStepValide());
    // });
  }

  ngAfterViewInit(): void {
    // this.stepperService.checkIfPrevStepValid(this.stepsComps);
  }

  ngOnDestroy(): void {
    // if (this.routerSubscription) {
    //   this.routerSubscription.unsubscribe();
    // }
  }

}
