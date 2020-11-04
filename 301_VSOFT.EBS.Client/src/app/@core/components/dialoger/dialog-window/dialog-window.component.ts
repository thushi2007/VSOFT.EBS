import {AfterViewInit, Component, ContentChild, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import {animate, group, query, style, transition, trigger} from '@angular/animations';
import {PromiseButtonComponent} from '@core/components';
import {DialogerService} from '@core/components/dialoger/dialoger.service';
import {BasedialogcompComponent} from '@core/components/dialoger/inheritance/basedialogcomp/basedialogcomp.component';

@Component({
  selector: 'ebs-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss'],
  animations: [
    trigger('showHideBg', [
      transition(':enter', [
        group([
          query('.dialog-bg', [
            style({
              opacity: '0'
            }),
            animate('300ms', style({
              opacity: '1'
            }))
          ]),
          query('.dialog-window', [
            style({
              transform: 'translateY(-100%)'
            }),
            animate('300ms', style({
              transform: 'translateY(0%)'
            }))
          ])
        ])
      ]),
      transition(':leave', [
        group([
          query('.dialog-bg', [
            style({
              opacity: '1'
            }),
            animate('300ms', style({
              opacity: '0'
            }))
          ]),
          query('.dialog-window', [
            style({
              transform: 'translateY(0%)'
            }),
            animate('300ms', style({
              transform: 'translateY(-100%)'
            }))
          ])
        ])
      ])
    ])
  ]
})
export class DialogWindowComponent {
  @ViewChild('speichern', {static: true}) speichernBtn: PromiseButtonComponent;
  @ContentChild('baseComp', {static: true}) baseDialogComp: BasedialogcompComponent;

  @HostBinding('@showHideBg') showHideBg;

  @Input() title: string;

  constructor(private dialogService: DialogerService) {
  }

  closeMe() {
    this.dialogService.hideDialog();
  }

  runPromise(): void {
    this.speichernBtn.promiseFunction = this.baseDialogComp.getSuccessPromise().then((rstl: boolean) => {
      if (rstl) {
        this.closeMe();
      }
    });
  }
}
