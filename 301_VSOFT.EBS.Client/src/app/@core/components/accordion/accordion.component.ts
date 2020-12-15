import {Component} from '@angular/core';
import {AccordionService} from '@core/components/accordion/services/accordion.service';

@Component({
  selector: 'ebs-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  providers: [AccordionService]
})
export class AccordionComponent {
  constructor(private accordion: AccordionService) {
  }

  resetAllSteps(): void {
    this.accordion.reset();
  }
}
