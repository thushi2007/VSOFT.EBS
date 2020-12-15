import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '@core/services/api.service';

@Component({
  selector: 'ebs-salutations',
  templateUrl: './salutations.component.html',
  styleUrls: ['./salutations.component.scss']
})
export class SalutationsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['select', 'Id', 'Name', 'Value', 'CreatedOn', 'ModifiedOn', 'menu'];
  selection = new SelectionModel(true, []);
  dataSource = new MatTableDataSource();

  paths: any;

  constructor(private apiService: ApiService) {
    this.paths = {
      Title: 'Benutzerkonto - Alle Anreden',
      Paths: [{
        Url: '/benutzerkonto/admin',
        Text: 'Benutzerkonto'
      }, {
        Url: '/benutzerkonto/admin/sprachen',
        Text: 'Alle Anreden'
      }]
    };
  }

  ngOnInit(): void {
    this.apiService.get('/enum/salutation/list').toPromise().then((rstl) => {
      this.dataSource.data = rstl;
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
