// core modules
import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';

// directives
import {PromiseBtnDirective} from 'angular2-promise-buttons';

@Component({
  selector: 'ebs-promise-button',
  templateUrl: './promise-button.component.html',
  styleUrls: ['./promise-button.component.scss']
})
export class PromiseButtonComponent {
  @ViewChild(PromiseBtnDirective, {static: true}) btnPromise: PromiseBtnDirective;

  @Input() btnDisabled: boolean;
  @Output() btnAction: EventEmitter<any> = new EventEmitter();

  /* Pls do not put any default values! */
  @Input() promiseFunction: Promise<any>;

  fireAction(): void {
    if (this.btnAction != null) {
      this.btnAction.emit();
    }
  }

  constructor() {
  }
}
