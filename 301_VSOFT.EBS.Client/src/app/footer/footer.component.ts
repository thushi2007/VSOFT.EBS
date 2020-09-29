import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ebs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year = 2020;

  constructor() {
  }

  ngOnInit(): void {
  }

}
