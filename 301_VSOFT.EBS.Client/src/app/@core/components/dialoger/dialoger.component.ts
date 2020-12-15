import {Component, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {DialogerService} from '@core/components/dialoger/dialoger.service';

@Component({
  selector: 'ebs-dialoger',
  templateUrl: './dialoger.component.html',
  styleUrls: ['./dialoger.component.scss']
})
export class DialogerComponent implements OnInit, OnDestroy {
  @ViewChild('dialogerContainer', {read: ViewContainerRef, static: true}) container;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closeDialog();
  }

  openDialogSubscription: Subscription;
  closeDialogSubscription: Subscription;

  constructor(private dialogService: DialogerService) {
  }

  ngOnInit(): void {
    this.openDialogSubscription = this.dialogService.showDialog.subscribe((templateRef: TemplateRef<any>) => {
      this.openDialog(templateRef);
    });
    this.closeDialogSubscription = this.dialogService.closeDialog.subscribe(() => {
      this.closeDialog();
    });
  }

  openDialog(templateRef: TemplateRef<any>): void {
    this.container.createEmbeddedView(templateRef);
  }

  public closeDialog(): void {
    this.container.clear();
  }

  ngOnDestroy(): void {
    if (this.openDialogSubscription) {
      this.openDialogSubscription.unsubscribe();
    }
    if (this.closeDialogSubscription) {
      this.closeDialogSubscription.unsubscribe();
    }
  }
}
