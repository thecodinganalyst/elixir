import {LayoutModule} from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FrameComponent } from './frame.component';
import {of} from 'rxjs';
import {Router, RouterModule} from '@angular/router';
import {NavigationService} from '../navigation/navigation.service';
import {FakeMatIconRegistry, MatIconHarness} from '@angular/material/icon/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatNavListHarness} from '@angular/material/list/testing';
import {BrowserModule, By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SAMPLE} from '../testing/mock-elixir';
import {RouterTestingModule} from '@angular/router/testing';

describe('FrameComponent', () => {
  let component: FrameComponent;
  let fixture: ComponentFixture<FrameComponent>;
  let appFrameEl: HTMLElement;
  let loader: HarnessLoader;
  let sideNavLoader: HarnessLoader;
  let sideNavToolBarLoader: HarnessLoader;
  let menu: MatNavListHarness;

  const navSvcSpy = jasmine.createSpyObj('NavigationService', ['initRoutes'], {NAVIGATION_URL: 'assets/navigation.json'});
  navSvcSpy.initRoutes.and.returnValue(of(SAMPLE.MOCK_CONFIG));

  const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
  httpClientSpy.get.withArgs(SAMPLE.MOCK_NAVIGATION_URL).and.returnValue(of(SAMPLE.MOCK_NAVIGATION));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FrameComponent /*RouterLinkDirectiveStub*/],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        BrowserModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: HttpClient, useValue: httpClientSpy},
        {provide: NavigationService, useValue: navSvcSpy},
        {provide: MatIconRegistry, useClass: FakeMatIconRegistry}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(FrameComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    sideNavLoader = await loader.getChildLoader('.mat-sidenav');
    sideNavToolBarLoader = await sideNavLoader.getChildLoader('.mat-toolbar');
    menu = await sideNavLoader.getHarness(MatNavListHarness);
    fixture.detectChanges();

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
    expect(await sampleTableMenuItem.getHref()).toContain('sample_table')
  });

  it('should have icon, have text sample form, and router link to /sample_form in the 2nd menu item', async () => {
    const sampleTableMenuItem = (await menu.getItems())[1];
    expect(await sampleTableMenuItem.hasIcon()).toBeTrue();
    expect(await sampleTableMenuItem.getText()).toEqual('sample form');
    expect(await sampleTableMenuItem.getHref()).toContain('sample_form');
  });

  it('should update toolbar title when a menu item is clicked', async () => {
    component.isHandset$ = of(true);
    fixture.detectChanges();
    const sampleTableMenuItem = (await menu.getItems())[0];
    await sampleTableMenuItem.click();

    const nativeEl = fixture.nativeElement;
    const toolBarEl = nativeEl.querySelector('.mat-sidenav-content .mat-toolbar');
    const toolBarSpanEl = toolBarEl.querySelector('header');

    expect(toolBarSpanEl.innerText).toEqual('sample table');
  });

});
