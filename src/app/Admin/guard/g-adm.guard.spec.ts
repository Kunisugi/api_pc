import { TestBed } from '@angular/core/testing';

import { GAdmGuard } from './g-adm.guard';

describe('GAdmGuard', () => {
  let guard: GAdmGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GAdmGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
