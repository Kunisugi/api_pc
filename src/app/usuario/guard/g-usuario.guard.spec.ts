import { TestBed } from '@angular/core/testing';

import { GUsuarioGuard } from './g-usuario.guard';

describe('GUsuarioGuard', () => {
  let guard: GUsuarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GUsuarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
