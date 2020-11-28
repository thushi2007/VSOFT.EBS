import {Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'ebs-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss']
})
export class SubcategoriesComponent implements OnInit {
  displayedColumns: string[] = ['select', 'servicetyp', 'subtyp', 'anfragedatum', 'geaendertam', 'menu'];
  data: any[] = [];
  selection = new SelectionModel<any>(true, []);
  paths: any;

  constructor() {
    this.paths = {
      Title: 'Benutzerkonto - Alle Subkategorien',
      Paths: [{
        Url: '/benutzerkonto/admin',
        Text: 'Benutzerkonto'
      }, {
        Url: '/benutzerkonto/admin/subkategorien',
        Text: 'Alle Subkategorien'
      }]
    };
  }

  ngOnInit(): void {
  }

}
