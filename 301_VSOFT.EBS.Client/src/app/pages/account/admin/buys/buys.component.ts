import {Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'ebs-buys',
  templateUrl: './buys.component.html',
  styleUrls: ['./buys.component.scss']
})
export class BuysComponent implements OnInit {
  displayedColumns: string[] = ['select', 'servicetyp', 'subtyp', 'anfragedatum', 'geaendertam', 'menu'];
  data: any[] = [];
  selection = new SelectionModel<any>(true, []);
  paths: any;

  constructor() {
    this.paths = {
      Title: 'Benutzerkonto - Alle Bestellungen',
      Paths: [{
        Url: '/benutzerkonto/admin',
        Text: 'Benutzerkonto'
      }, {
        Url: '/benutzerkonto/admin/kaeufe',
        Text: 'Alle Bestellungen'
      }]
    };
  }

  ngOnInit(): void {
  }

}
