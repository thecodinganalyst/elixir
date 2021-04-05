import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { TableComponent } from './table.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {SAMPLE} from '../testing/mock-elixir';
import {HttpClient} from '@angular/common/http';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatCellHarness, MatHeaderCellHarness, MatTableHarness} from '@angular/material/table/testing';
import {MatPaginatorHarness} from '@angular/material/paginator/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatButtonModule} from '@angular/material/button';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let loader: HarnessLoader;
  let tableHarness: MatTableHarness;

  const mockActivatedRoute = {data: of({componentData: 'assets/sample_table.json'})};

  const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
  httpClientSpy.get.withArgs(SAMPLE.MOCK_TABLE_URL).and.returnValue(of(SAMPLE.MOCK_TABLE));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule,
      ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HttpClient, useValue: httpClientSpy }
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    tableHarness = await loader.getHarness(MatTableHarness);
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should sort ascending and descending correctly', async () => {
    const headerCellsHarness = await tableHarness.getAllHarnesses(MatHeaderCellHarness);
    const headerCellEl = await headerCellsHarness[0].host();
    await headerCellEl.click();
    fixture.detectChanges();
    let cellR1C1Harness = await tableHarness.getHarness(MatCellHarness);
    expect(await cellR1C1Harness.getText()).toBe('1');
    await headerCellEl.click();
    fixture.detectChanges();
    cellR1C1Harness = await tableHarness.getHarness(MatCellHarness);
    expect(await cellR1C1Harness.getText()).toBe('6');
  });

  it('should throw error if paginator is absent', () => {
    component.dataSource.paginator = null;
    fixture.detectChanges();
    expect(component.dataSource.connect).toThrowError();
  });

  it('should throw error if sort is absent', () => {
    component.dataSource.sort = null;
    fixture.detectChanges();
    expect(component.dataSource.connect).toThrowError();
  });

  it('should page well', async () => {
    const paginatorHarness = await loader.getHarness(MatPaginatorHarness);
    await paginatorHarness.setPageSize(5);
    await paginatorHarness.goToNextPage();
    const p2CellR1C1Harness = await tableHarness.getHarness(MatCellHarness);
    expect(await p2CellR1C1Harness.getText()).toBe('5');
  });

  it('should display the buttons', async () => {
    const matCardHeaderLoader = await loader.getChildLoader('.header-buttons');
    const headerButtons = await matCardHeaderLoader.getAllHarnesses(MatButtonHarness);
    expect(headerButtons?.length).toEqual(SAMPLE.MOCK_TABLE.actions.length);
    for (let i = 0; i < SAMPLE.MOCK_TABLE.actions.length; i++){
      expect(await headerButtons[i].getText()).toEqual(SAMPLE.MOCK_TABLE.actions[i].label);
    }
  });

});
