import {Injectable, TemplateRef} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DialogerService {
    private showDialogSubscriber = new Subject<any>();
    showDialog = this.showDialogSubscriber.asObservable();

    private hideDialogSubscriber = new Subject<any>();
    closeDialog = this.hideDialogSubscriber.asObservable();

    constructor() {
    }

    openDialog(template: TemplateRef<any>) {
        if (template) {
            this.showDialogSubscriber.next(template);
        }
        return this.closeDialog;
    }

    hideDialog() {
        this.hideDialogSubscriber.next();
    }
}
