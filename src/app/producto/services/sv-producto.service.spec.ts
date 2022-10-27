import { TestBed } from '@angular/core/testing';

import { SvProductoService } from './sv-producto.service';

describe('SvProductoService', () => {
  let service: SvProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
