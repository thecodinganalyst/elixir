import {Injectable, Type} from '@angular/core';
import {Navigation} from './navigation';
import {Route, Routes} from '@angular/router';
import {Observable, of} from 'rxjs';
import {TableComponent} from '../table/table.component';
import {FormComponent} from '../form/form.component';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  componentMap: Map<string, Type<any>> = new Map<string, Type<any>>();

  constructor() {
    this.componentMap.set('table', TableComponent);
    this.componentMap.set('form', FormComponent);
  }

  initRoutes(navigation: Navigation): Observable<Routes>{
    const routes: Route[] = [];
    for (const item of navigation.menu){
      routes.push({
        path: item.path,
        component: this.componentMap.get(item.component),
        data: {componentData: item.data}
      });
    }
    routes.push({
      path: '',
      redirectTo: '/',
      pathMatch: 'full'
    });
    return of(routes);
  }
}
