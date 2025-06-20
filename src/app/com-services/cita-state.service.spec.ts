import { TestBed } from '@angular/core/testing';

import { CitaStateService } from './cita-state.service';

describe('CitaStateService', () => {
  let service: CitaStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitaStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
