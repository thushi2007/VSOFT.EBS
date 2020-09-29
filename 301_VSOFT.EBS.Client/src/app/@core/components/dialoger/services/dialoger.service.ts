import {Injectable, OnDestroy, TemplateRef} from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DialogerService implements OnDestroy {
  private openDialogOfSubscriber = new Subject<any>();
  openDialogSub = this.openDialogOfSubscriber.asObservable();

  public openDialog(template: TemplateRef<any>): void {
    this.openDialogOfSubscriber.next(template);
  }

  ngOnDestroy(): void {
    if (this.openDialogOfSubscriber) {
      this.openDialogOfSubscriber.unsubscribe();
    }
  }
}
