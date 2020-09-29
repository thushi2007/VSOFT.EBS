import {AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AccordionService} from '@core/components/accordion/services/accordion.service';

@Component({
  selector: 'ebs-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  providers: [AccordionService]
})
export class AccordionComponent implements OnInit {
  constructor() {

  }

  ngOnInit(): void {
  }
}
