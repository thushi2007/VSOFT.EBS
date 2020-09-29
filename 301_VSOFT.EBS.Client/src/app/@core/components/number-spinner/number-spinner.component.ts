import {Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {FormControl, NgForm, NgModel} from '@angular/forms';

import {Guid} from 'guid-typescript';

@Component({
  selector: 'ebs-number-spinner',
  templateUrl: './number-spinner.component.html',
  styleUrls: ['./number-spinner.component.scss']
})
export class NumberSpinnerComponent implements OnInit {
  @ViewChild(NgModel, {static: true}) formControl: NgModel;

  formControlName = 'nbr_' +  Guid.create();

  @Input() value: number;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<number>();

  @Input() spin = 1;
  @Input() min = 1;
  @Input() max = 50;

  @Input() ngForm: NgForm;

  constructor() {

  }

  ngOnInit(): void {
    if (this.ngForm) {
      this.ngForm.addControl(this.formControl);
    }
  }

  plus(): void {
    const tmpvalue = this.value += this.spin;

    if (tmpvalue < this.max) {
      this.value = tmpvalue;
    } else {
      this.value = this.max;
    }

    this.valueChange.emit(this.value);
    this.updateInput();
  }

  minus(): void {
    const tmpvalue = this.value -= this.spin;

    if (tmpvalue > this.min) {
      this.value = tmpvalue;
    } else {
      this.value = this.min;
    }

    this.valueChange.emit(this.value);
    this.updateInput();
  }

  updateInput(): void {
    this.formControl.control.markAsTouched();
    this.formControl.control.markAsDirty();
    this.formControl.control.updateValueAndValidity();
  }
}
