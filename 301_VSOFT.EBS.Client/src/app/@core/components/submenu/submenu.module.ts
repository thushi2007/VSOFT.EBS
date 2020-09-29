import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubmenuComponent} from './submenu.component';
import {SubmenuItemComponent} from './submenu-item/submenu-item.component';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        SubmenuComponent,
        SubmenuItemComponent
    ],
    exports: [
        SubmenuComponent
    ],
    imports: [
        RouterModule,
        CommonModule
    ]
})
export class SubmenuModule {
}
