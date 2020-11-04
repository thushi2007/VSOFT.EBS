import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ebs-basedialogcomp',
  templateUrl: './basedialogcomp.component.html',
  styleUrls: ['./basedialogcomp.component.scss']
})
export class BasedialogcompComponent {
  constructor() {
  }

  getSuccessPromise(): Promise<boolean> {
    return null;
  }
}

