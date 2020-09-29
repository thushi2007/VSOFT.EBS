import {Component, ComponentFactoryResolver, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';

import {animate, animateChild, group, query, state, style, transition, trigger} from '@angular/animations';
import {DialogerService} from '@core/components/dialoger/services/dialoger.service';

@Component({
  selector: 'ebs-dialoger',
  templateUrl: './dialoger.component.html',
  styleUrls: ['./dialoger.component.scss'],
  animations: [
    trigger('showHide', [
      state('0', style({
        'background-color': 'rgba(0, 0, 0, 0.7)',
        'z-index': '-100',
        opacity: '0'
      })),
      state('1', style({
        'background-color': 'rgba(0, 0, 0, 0.7)',
        'z-index': '100',
        opacity: '1'
      })),
      transition('1 => 0', [
        group([
          query('@heightAnim', animateChild()),
          animate('400ms')
        ])
      ]),
      transition('0 => 1', [
        group([
          query('@heightAnim', animateChild()),
          animate('400ms')
        ])
      ])
    ]),
    trigger('heightAnim', [
      state('0', style({
        transform: 'translateY(-100%)'
      })),
      state('1', style({
        transform: 'translateY(0%)'
      })),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('300ms'))
    ])
  ]
})
export class DialogerComponent implements OnInit, OnDestroy {
  @ViewChild('dialogContainer', {read: ViewContainerRef, static: false}) container;

  openDialogSubscription: Subscription;
  isOpened = false;
  interntemplate: TemplateRef<any>;

  constructor(private resolver: ComponentFactoryResolver,
              private dialogService: DialogerService) {

  }

  ngOnInit(): void {
    this.openDialogSubscription = this.dialogService.openDialogSub.subscribe((template: TemplateRef<any>) => {
      this.openDialog(template);
    });
  }

  public openDialog(template: TemplateRef<any>): void {
    this.isOpened = true;
    // this.interntemplate = template;
    this.container.clear();
    this.container.createEmbeddedView(template);
    // const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(MessageComponent);
    // componentRef = this.container.createComponent(factory);

    //this.hideContainerTimer(this.componentRef);
  }

  ngOnDestroy(): void {
    if (this.openDialogSubscription) {
      this.openDialogSubscription.unsubscribe();
    }
  }
}
