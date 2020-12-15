import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '@core/services/api.service';

@Component({
  selector: 'ebs-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['select', 'Id', 'Organisation', 'Firstname', 'Lastname', 'EMail', 'CreatedOn', 'ModifiedOn', 'menu'];
  selection = new SelectionModel(true, []);
  dataSource = new MatTableDataSource();

  paths: any;

  isloading = true;

  constructor(private apiService: ApiService) {
    this.paths = {
      Title: 'Benutzerkonto - Alle Kunden',
      Paths: [{
        Url: '/benutzerkonto/admin',
        Text: 'Benutzerkonto'
      }, {
        Url: '/benutzerkonto/admin/kunden',
        Text: 'Alle Kunden'
      }]
    };
  }

  ngOnInit(): void {
   this.loaddata();
  }

  loaddata(): void {
    this.isloading = true;
    this.apiService.get('/customer').toPromise().then((rstl) => {
      this.dataSource.data = rstl;
      this.isloading = false;
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): any {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
