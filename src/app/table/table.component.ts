import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource } from './table-datasource';
import {ActivatedRoute} from '@angular/router';
import {first, map, pluck, shareReplay, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {TableView} from './table-view';
import {Action} from '../action';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource: TableDataSource;
  actions: Action[];
  displayedColumns: string[];
  allColumns: string[];
  title: string;
  selection: SelectionModel<any>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private route: ActivatedRoute,
              private cdRef: ChangeDetectorRef,
              private httpClient: HttpClient,
              private breakpointObserver: BreakpointObserver) {
  }

  ngAfterViewInit(): void {
    const tableView$ = this.route.data.pipe(
      pluck('componentData'),
      first(),
      switchMap(dataPath => this.httpClient.get<TableView>(dataPath))
    );
    tableView$.subscribe(value => {
      this.dataSource = new TableDataSource(value);
      this.displayedColumns = this.dataSource.displayedColumns;
      const allColumns = this.displayedColumns.slice(0);
      allColumns.unshift('select');
      this.allColumns = allColumns;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel(true, []);
      this.title = value.title;
      this.actions = value.actions;
      this.table.dataSource = this.dataSource;
      this.cdRef.detectChanges();
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void{
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
