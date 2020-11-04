import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ebs-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @Input() steps: any;

  headerWidth: number;

  constructor() {
  }

  ngOnInit(): void {
    this.headerWidth = 100 / this.steps.length;
  }
}
