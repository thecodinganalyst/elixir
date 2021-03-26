import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Navigation} from '../navigation/navigation';
import {Router} from '@angular/router';
import {NavigationService} from '../navigation/navigation.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  navigation: Navigation;
  routeLoaded = false;
  toolbarTitle: string;

  constructor(private breakpointObserver: BreakpointObserver,
              private navigationService: NavigationService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private httpClient: HttpClient,
              private router: Router) {}

  getNavigation(): void {
    this.httpClient.get<Navigation>(this.navigationService.NAVIGATION_URL).subscribe(
      navigation => {
        this.navigation = navigation;
        this.toolbarTitle = this.navigation.title;
        this.matIconRegistry.addSvgIcon(
          'logo',
          this.domSanitizer.bypassSecurityTrustResourceUrl(this.navigation.logo)
        );
        this.navigationService.initRoutes(navigation).subscribe(routes => {
          this.router.resetConfig(routes);
          this.routeLoaded = true;
        });
      }
    );
  }

  ngOnInit(): void {
    this.getNavigation();
  }

  updateToolbarTitle(title: string): void {
    this.toolbarTitle = title;
  }
}
