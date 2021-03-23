import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { TableComponent } from './table.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {DataService} from '../data.service';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const mockActivatedRoute = {data: of({componentData: 'assets/sample_table.json'})};
  const mockTable = {
    layout: 'table',
    title: 'Sample Table',
    dataHeaders: ['a', 'b'],
    headerTypes: ['number', 'number'],
    data: [{a: 1, b: 2}, {a: 2, b: 4}],
    functions: ['save']
  };
  const dataServiceSpy = jasmine.createSpyObj('DataService', ['getTable']);
  dataServiceSpy.getTable.and.returnValue(of(mockTable));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: DataService, useValue: dataServiceSpy}
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
