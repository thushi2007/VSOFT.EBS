import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[aimOnlyNumber]'
})
export class OnlyNumberDirective {

  constructor(private elem: ElementRef) {
  }

  @HostListener('input', ['$event']) onInputChange(event): any {
    const initalValue = this.elem.nativeElement.value;

    this.elem.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this.elem.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
