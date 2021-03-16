import {Injectable, Type} from '@angular/core';
import {Navigation} from './navigation';
import {Route, Routes} from '@angular/router';
import {MenuItem} from './menuItem';
import {ComponentMapService} from './component-map.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  // tslint:disable-next-line:variable-name
  _routes: Routes;
  get routes(): Routes {
    return this._routes;
  }
  // tslint:disable-next-line:variable-name
  private _navigation: Navigation;
  get navigation(): Navigation {
    return this._navigation;
  }
  set navigation(value: Navigation){
    this._navigation = value;
    this._routes = this.getRoutes(this._navigation);
  }

  constructor(private componentMapService: ComponentMapService) {
  }

  getDataByPath(path: string): string | null {
    if (!this._navigation) { return null; }
    for (const menuItem of this._navigation.menu){
      if (menuItem.path === path){
        return menuItem.data;
      }
    }
    for (const menuItem of this._navigation.bottomMenu){
      if (menuItem.path === path){
        return menuItem.data;
      }
    }
    return null;
  }

  getRoutes(navigation: Navigation): Routes{
    const routes: Route[] = [];
    for (const item of navigation.menu){
      routes.push({
        path: item.path,
        component: this.componentMapService.getComponent(item.component),
        data: {componentData: item.data}
      });
    }
    return routes;
  }
}
