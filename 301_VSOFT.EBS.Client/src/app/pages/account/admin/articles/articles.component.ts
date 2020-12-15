import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '@core/services/api.service';
import {DialogerService} from '@core/components/dialoger/dialoger.service';

@Component({
  selector: 'ebs-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['select', 'Id', 'Title', 'EAN', 'Price', 'CreatedOn', 'ModifiedOn', 'menu'];
  selection = new SelectionModel(true, []);
  dataSource = new MatTableDataSource();

  paths: any;

  isloading = true;

  constructor(private dialoger: DialogerService,
              private apiService: ApiService) {
    this.paths = {
      Title: 'Benutzerkonto - Alle Artikel',
      Paths: [{
        Url: '/benutzerkonto/admin',
        Text: 'Benutzerkonto'
      }, {
        Url: '/benutzerkonto/admin/artikeln',
        Text: 'Alle Artikel'
      }]
    };
  }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata(): void {
    this.isloading = true;
    this.apiService.get('/article/list').toPromise().then((rstl) => {
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

  openDialog(template: TemplateRef<any>): void {
    this.dialoger.openDialog(template).subscribe(() => {
      this.loaddata();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
