import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiService} from '@core/services/api.service';
import {DialogerService} from '@core/components/dialoger/dialoger.service';
import {AuthService} from '@core/services';

@Component({
  selector: 'ebs-kunde-buys',
  templateUrl: './buys.component.html',
  styleUrls: ['./buys.component.scss']
})
export class KundeBuysComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['select', 'Id', 'TotalPrice', 'BuyDate', 'CreatedOn', 'ModifiedOn', 'menu'];
  selection = new SelectionModel(true, []);
  dataSource = new MatTableDataSource();

  paths: any;

  isloading = true;

  byId = null;

  constructor(private apiService: ApiService,
              private authService: AuthService,
              private dialoger: DialogerService) {
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
    this.loaddata();
  }

  openDialog(template: TemplateRef<any>, bId: number): void {
    this.byId = bId;

    this.dialoger.openDialog(template).subscribe(() => {
      this.loaddata();
    });
  }

  loaddata(): void {
    this.isloading = true;
    const uname = this.authService.getUsername();

    this.apiService.get(`/buy/user/${uname}`).toPromise().then((rstl) => {
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
