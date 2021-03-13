import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource } from './table-datasource';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../navigation.service';
import {DataService} from '../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource: TableDataSource;

  displayedColumns: string[];

  constructor(private route: ActivatedRoute,
              private navigationService: NavigationService,
              private dataService: DataService) {
  }

  ngAfterViewInit(): void {
    const path: string = this.route.routeConfig.path;
    const dataPath: string = this.navigationService.getDataByPath(path);
    if (!dataPath) { return; }
    this.dataService.getTable(dataPath).subscribe(
      value => {
        this.dataSource = new TableDataSource(value);
        this.displayedColumns = this.dataSource.displayedColumns;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    );
  }
}
