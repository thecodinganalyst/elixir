import { TestBed } from '@angular/core/testing';
import { NavigationService } from './navigation.service';
import {TableComponent} from '../table/table.component';
import {Type} from '@angular/core';
import {FormComponent} from '../form/form.component';

describe('NavigationService', () => {
  let service: NavigationService;
  const mockNavigation = {
    logo: 'assets/elixir-logo-inverted.svg',
    title: 'elixir test',
    menu: [
      {icon: 'table_view', name: 'sample table', path: 'sample_table', component: 'table', data: 'assets/sample_table.json'},
      {icon: 'dynamic_form', name: 'sample form', path: 'sample_form', component: 'form', data: 'assets/sample_form.json'}
    ],
    bottomMenu: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return routes', () => {
    service.initRoutes(mockNavigation).subscribe((routes) => {
      expect(routes.length).toBe(3);
      expect(routes[0].path).toEqual('sample_table');
      expect(routes[0].component).toBe(TableComponent);
      expect(routes[0].data).toEqual({componentData: 'assets/sample_table.json'});
      expect(routes[1].path).toEqual('sample_form');
      expect(routes[1].component).toBe(FormComponent);
      expect(routes[1].data).toEqual({componentData: 'assets/sample_form.json'});
      expect(routes[2].path).toEqual('');
      expect(routes[2].redirectTo).toEqual('/');
      expect(routes[2].pathMatch).toEqual('full');
    });
  });
});
