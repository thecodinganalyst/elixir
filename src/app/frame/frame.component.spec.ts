import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FrameComponent } from './frame.component';
import {DataService} from '../data.service';
import {of} from 'rxjs';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {NavigationService} from '../navigation/navigation.service';
import {FakeMatIconRegistry, MatIconHarness} from '@angular/material/icon/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatNavListHarness} from '@angular/material/list/testing';
import {BrowserModule, By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {RouterLinkDirectiveStub} from '../testing/router-link-directive-stub';

describe('FrameComponent', () => {
  let component: FrameComponent;
  let fixture: ComponentFixture<FrameComponent>;
  let appFrameEl: HTMLElement;
  let loader: HarnessLoader;
  let sideNavLoader: HarnessLoader;
  let sideNavToolBarLoader: HarnessLoader;
  let menu: MatNavListHarness;

  const mockNavigation = {
    logo: 'assets/elixir-logo-inverted.svg',
    title: 'elixir test',
    menu: [
      {icon: 'table_view', name: 'sample table', path: 'sample_table', component: 'table', data: 'assets/sample_table.json'},
      {icon: 'dynamic_form', name: 'sample form', path: 'sample_form', component: 'form', data: 'assets/sample_form.json'}
    ],
    bottomMenu: []
  };
  const dataServiceSpy = jasmine.createSpyObj('DataService', ['getNavigation']);
  dataServiceSpy.getNavigation.and.returnValue(of(mockNavigation));

  const routerSpy = jasmine.createSpyObj('Router', ['resetConfig']);
  let mockRouterConfig = {};
  routerSpy.resetConfig.and.callFake((routes) => mockRouterConfig = routes);

  const mockConfig = [
    {path: 'sample_table', component: 'table', data: 'assets/sample_table.json'},
    {path: 'sample_form', component: 'form', data: 'assets/sample_form.json'},
    {path: '', redirectTo: '/', pathMatch: 'full'}];
  const navSvcSpy = jasmine.createSpyObj('NavigationService', ['initRoutes']);
  navSvcSpy.initRoutes.and.returnValue(of(mockConfig));

  let linkDes: DebugElement[];
  let routerLinks: RouterLinkDirectiveStub[];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FrameComponent, RouterLinkDirectiveStub],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        BrowserModule,
      ],
      providers: [
        {provide: DataService, useValue: dataServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: NavigationService, useValue: navSvcSpy},
        {provide: MatIconRegistry, useClass: FakeMatIconRegistry}
      ]
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(FrameComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    sideNavLoader = await loader.getChildLoader('.mat-sidenav');
    sideNavToolBarLoader = await sideNavLoader.getChildLoader('.mat-toolbar');
    menu = await sideNavLoader.getHarness(MatNavListHarness);
    fixture.detectChanges();

    // For testing of router links
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));

    component = fixture.componentInstance;
    appFrameEl = fixture.nativeElement;
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should show the logo icon', async () => {
    const logoIcon = await sideNavToolBarLoader.getHarness(MatIconHarness);
    expect(logoIcon).toBeTruthy();
  });

  it('should show the navigation title', () => {
    const navTitle = appFrameEl.querySelector('.navTitle');
    expect(navTitle.textContent).toEqual('elixir test');
  });

  it('should generate the menu nav list with 2 items', async () => {
    expect((await menu.getItems()).length).toEqual(2);
  });

  it('should have icon, have text sample table, and router link to /sample_table in the first menu item', async () => {
    const sampleTableMenuItem = (await menu.getItems())[0];
    expect(await sampleTableMenuItem.hasIcon()).toBeTrue();
    expect(await sampleTableMenuItem.getText()).toEqual('sample table');
    // TODO: Check href of MatNavListItemHarness is correct also
  });

  it('should have icon, have text sample form, and router link to /sample_form in the 2nd menu item', async () => {
    const sampleTableMenuItem = (await menu.getItems())[1];
    expect(await sampleTableMenuItem.hasIcon()).toBeTrue();
    expect(await sampleTableMenuItem.getText()).toEqual('sample form');
    // TODO: Check href of MatNavListItemHarness is correct also
  });


});
