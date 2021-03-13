import { TestBed } from '@angular/core/testing';

import { ComponentMapService } from './component-map.service';

describe('ComponentMapService', () => {
  let service: ComponentMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
