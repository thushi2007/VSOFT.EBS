import {Component, Input, OnInit} from '@angular/core';
import {BasedialogcompComponent} from '@core/components/dialoger/inheritance/basedialogcomp/basedialogcomp.component';
import {ApiService} from '@core/services/api.service';

@Component({
  selector: 'ebs-buy-kunde-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class KundeDetailsComponent extends BasedialogcompComponent implements OnInit {
  @Input() buyId: number;

  buyDetails: any;

  constructor(private apiService: ApiService) {
    super();
  }

  async ngOnInit(): Promise<any> {
    this.buyDetails = await this.apiService.get(`/buy/${this.buyId}`).toPromise();
  }
}
