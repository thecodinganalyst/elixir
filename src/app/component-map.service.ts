import {Injectable, Type} from '@angular/core';
import {TableComponent} from './table/table.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentMapService {

  componentMap: Map<string, Type<any>> = new Map<string, Type<any>>();

  constructor() {
    this.componentMap.set('table', TableComponent);
  }

  getComponent(name): Type<any> {
    return this.componentMap.get(name);
  }
}
