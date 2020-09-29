import {Directive, OnInit} from '@angular/core';
import {MatSelect} from '@angular/material/select';

@Directive({
  selector: '[ebsEnumSelection]'
})
export class EnumSelectionDirective implements OnInit {
  constructor(public enumSelect: MatSelect) {
  }

  public ngOnInit(): void {
    this.enumSelect.compareWith = this.compareObjects;
  }

  compareObjects(option1: string, option2: string): boolean {
    let ok = false;

    if (option1 && option2 && option1 === option2) {
      ok = true;
    }

    return ok;
  }
}
