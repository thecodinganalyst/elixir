import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource } from './table-datasource';
import {ActivatedRoute} from '@angular/router';
import {first, pluck, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {TableView} from './table-view';

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

  displayedColumns: string[];

  constructor(private route: ActivatedRoute,
              private cdRef: ChangeDetectorRef,
              private httpClient: HttpClient) {
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
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.cdRef.detectChanges();
    });
  }
}
