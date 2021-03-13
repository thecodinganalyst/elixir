import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Navigation} from '../navigation';
import {DataService } from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationService} from '../navigation.service';


@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
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
              private dataService: DataService,
              private navigationService: NavigationService,
              private router: Router) {}

  getNavigation(): void {
    this.dataService.getNavigation().subscribe(
      data => {
        this.navigationService.navigation = data;
        this.routeLoaded = this.navigationService.routes.length > 0 ? true : false;
        this.router.resetConfig(this.navigationService.routes);
        this.navigation = this.navigationService.navigation;
        this.toolbarTitle = this.navigation.logo;
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